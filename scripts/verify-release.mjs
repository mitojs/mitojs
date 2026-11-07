import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { resolve, join } from 'node:path'
import { promisify } from 'node:util'
import { test } from 'node:test'
import { root } from './pack.mjs'

test('Changesets preserves independent SDK versions and publishes only to the rehearsal registry', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'mito-release-'))
  const documents = new Map()
  const requests = []
  const registry = createServer(async (request, response) => {
    const name = decodeURIComponent(new URL(request.url, 'http://localhost').pathname.slice(1))
    response.setHeader('Content-Type', 'application/json')
    if (request.method === 'PUT') {
      let body = ''
      for await (const chunk of request) body += chunk
      const previous = documents.get(name) ?? {}
      const next = JSON.parse(body)
      documents.set(name, { ...previous, ...next, versions: { ...previous.versions, ...next.versions }, 'dist-tags': { ...previous['dist-tags'], ...next['dist-tags'] } })
      requests.push(name)
      response.statusCode = 201
      return response.end('{"ok":true}')
    }
    const document = documents.get(name)
    response.statusCode = document ? 200 : 404
    response.end(JSON.stringify(document ?? { error: 'not_found' }))
  })
  await new Promise((done) => registry.listen(0, '127.0.0.1', done))
  const registryUrl = `http://127.0.0.1:${registry.address().port}/`
  const execute = promisify(execFile)
  const env = { ...process.env, npm_config_registry: registryUrl, NPM_CONFIG_REGISTRY: registryUrl, npm_config_userconfig: join(directory, '.npmrc'), npm_config_ignore_scripts: 'true', CI: 'true' }
  async function run(command, args) {
    try { return await execute(command, args, { cwd: directory, env, timeout: 60_000 }) }
    catch (error) { throw new Error(`${error.message}\n${error.stdout}\n${error.stderr}`) }
  }
  const cli = resolve(root, 'node_modules/@changesets/cli/bin.js')
  const changeset = (...args) => run(process.execPath, [cli, ...args])
  try {
    await mkdir(join(directory, '.changeset'), { recursive: true })
    await writeFile(join(directory, 'package.json'), JSON.stringify({ name: 'mito-release-rehearsal', private: true, workspaces: ['packages/*'], packageManager: 'npm@11.9.0' }))
    await writeFile(join(directory, 'package-lock.json'), JSON.stringify({ name: 'mito-release-rehearsal', lockfileVersion: 3, packages: {} }))
    await writeFile(join(directory, '.npmrc'), `registry=${registryUrl}\n//127.0.0.1:${registry.address().port}/:_authToken=rehearsal-only\n`)
    await writeFile(join(directory, '.changeset/config.json'), JSON.stringify({ changelog: false, commit: false, fixed: [], linked: [], access: 'public', baseBranch: 'master', updateInternalDependencies: 'patch', ignore: [] }))
    for (const [name, version] of [['browser', '3.0.1'], ['wx-mini', '3.1.0']]) {
      await mkdir(join(directory, 'packages', name), { recursive: true })
      await writeFile(join(directory, 'packages', name, 'package.json'), JSON.stringify({ name: `@mito-rehearsal/${name}`, version, main: 'index.js', publishConfig: { registry: registryUrl, access: 'public' } }))
      await writeFile(join(directory, 'packages', name, 'index.js'), 'module.exports = { compatible: true }\n')
    }
    await run('git', ['init', '-b', 'master'])
    await run('git', ['config', 'user.email', 'rehearsal@example.invalid'])
    await run('git', ['config', 'user.name', 'Release rehearsal'])
    await run('git', ['add', '.'])
    await run('git', ['commit', '-m', 'test: release baseline'])
    await writeFile(join(directory, '.changeset/migration.md'), '---\n"@mito-rehearsal/browser": patch\n"@mito-rehearsal/wx-mini": patch\n---\nPreserve SDK integration contracts.\n')
    await changeset('version')
    for (const [name, version] of [['browser', '3.0.2'], ['wx-mini', '3.1.1']]) {
      assert.equal(JSON.parse(await readFile(join(directory, 'packages', name, 'package.json'), 'utf8')).version, version)
    }
    await changeset('publish', '--no-git-tag')
    assert.equal(documents.get('@mito-rehearsal/browser')['dist-tags'].latest, '3.0.2')
    assert.equal(documents.get('@mito-rehearsal/wx-mini')['dist-tags'].latest, '3.1.1')
    await changeset('publish', '--no-git-tag')
    assert.equal(requests.length, 2, 'Repeated publish must not publish the same package twice')
    await changeset('pre', 'enter', 'beta')
    await writeFile(join(directory, '.changeset/beta.md'), '---\n"@mito-rehearsal/browser": patch\n---\nValidate prerelease upgrades.\n')
    await changeset('version')
    await changeset('publish', '--no-git-tag')
    assert.equal(documents.get('@mito-rehearsal/browser')['dist-tags'].beta, '3.0.3-beta.0')
    assert.equal(documents.get('@mito-rehearsal/browser')['dist-tags'].latest, '3.0.2')
    await writeFile(join(directory, '.changeset/beta-again.md'), '---\n"@mito-rehearsal/browser": patch\n---\nValidate repeated prereleases.\n')
    await changeset('version')
    await changeset('publish', '--no-git-tag')
    assert.equal(documents.get('@mito-rehearsal/browser')['dist-tags'].beta, '3.0.3-beta.1')
    await changeset('pre', 'exit')
    await changeset('version')
    await changeset('publish', '--no-git-tag')
    assert.equal(documents.get('@mito-rehearsal/browser')['dist-tags'].latest, '3.0.3')
    assert.equal(requests.length, 5)
  } finally {
    await new Promise((done) => registry.close(done))
    await rm(directory, { recursive: true, force: true })
  }
})
