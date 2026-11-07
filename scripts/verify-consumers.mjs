import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, copyFileSync, rmSync } from 'node:fs'
import { resolve, dirname, delimiter, join, basename } from 'node:path'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { packPackages, root } from './pack.mjs'

const repositories = {
  'react-sdk-demo': '68057a602e32f33c616762488d9a6e3f16fbf7c1',
  'vue2-sdk-demo': '1db7364f7c176702b3436eb8d82a514c94ee21b1',
  'vue3-sdk-demo': '12fb162c0cf4dbc5f6d4df8b1a5601543c3de48b'
}
const directory = process.env.SDK_CONSUMER_ROOT ?? resolve(root, '.cache/consumers')
const node = process.env.SDK_CONSUMER_NODE
if (!node) throw new Error('Set SDK_CONSUMER_NODE to a Node 14.21.3 executable for the original CRA4 / Vue CLI3 / node-sass4 projects. The SDK workspace itself uses Node 24.')
const environment = { ...process.env, PATH: `${dirname(node)}${delimiter}${process.env.PATH}` }
const packageManager = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')).packageManager
const architecture = execFileSync(node, ['-p', 'process.arch'], { encoding: 'utf8' }).trim()
function run(command, args, cwd, env = environment) {
  const result = spawnSync(command, args, { cwd, env, stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} failed: ${result.status}`)
}
function sourceHash(path) {
  const hash = createHash('sha256')
  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = join(directory, entry.name)
      if (entry.isDirectory()) visit(file)
      else hash.update(file.slice(path.length)).update(readFileSync(file))
    }
  }
  visit(path)
  return hash.digest('hex')
}
mkdirSync(directory, { recursive: true })
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex')
// A content-specific path avoids reusing another unpublished build with
// the same package name/version from its local file cache.
const archives = packPackages().map((archive) => {
  const directory = resolve(root, 'artifacts/consumer-candidates', digest(readFileSync(archive)))
  mkdirSync(directory, { recursive: true })
  const destination = resolve(directory, basename(archive))
  copyFileSync(archive, destination)
  return destination
})
const result = []
for (const [name, commit] of Object.entries(repositories)) {
  const project = resolve(directory, name)
  if (!existsSync(resolve(project, '.git'))) {
    run('git', ['clone', `https://github.com/mitojs/${name}.git`, project], root)
    run('git', ['checkout', '--detach', commit], project)
  }
  const actualCommit = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: project, encoding: 'utf8' })
  assert.equal(actualCommit.stdout.trim(), commit, `${name}: unexpected source commit`)
  run('git', ['diff', '--exit-code', 'HEAD', '--', 'src'], project)
  const before = sourceHash(resolve(project, 'src'))
  const manifest = JSON.parse(execFileSync('git', ['show', 'HEAD:package.json'], { cwd: project, encoding: 'utf8' }))
  manifest.packageManager = packageManager
  const overrides = {}
  for (const archive of archives) {
    const name = `@mitojs/${archive.match(/mitojs-(.+)-\d/)[1]}`
    manifest.dependencies[name] = `file:${archive}`
    // All local tarballs still carry their unpublished source version. Force
    // transitive SDK resolutions to the same candidate instead of npm's old
    // package with that version. Published upgrades use normal semver versions.
    overrides[name] = `file:${archive}`
  }
  writeFileSync(resolve(project, 'package.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  // Isolate each fixture from the SDK workspace and retain the flat layout
  // expected by CRA4/Vue CLI3. Convert the original lock without installing Yarn.
  writeFileSync(resolve(project, 'pnpm-workspace.yaml'), JSON.stringify({
    packages: ['.'], nodeLinker: 'hoisted', autoInstallPeers: false,
    overrides, allowBuilds: { 'node-sass': true, esbuild: true }
  }, null, 2))
  for (const file of ['package-lock.json', 'npm-shrinkwrap.json', 'pnpm-lock.yaml']) rmSync(resolve(project, file), { force: true })
  writeFileSync(resolve(project, 'yarn.lock'), execFileSync('git', ['show', 'HEAD:yarn.lock'], { cwd: project }))
  run('pnpm', ['import'], project)
  rmSync(resolve(project, 'yarn.lock'))
  run('pnpm', ['install', '--frozen-lockfile', '--ignore-scripts', '--force', `--cpu=${architecture}`], project)
  if (name === 'vue2-sdk-demo') run('pnpm', ['rebuild', 'node-sass'], project)
  if (name === 'vue3-sdk-demo') run('pnpm', ['rebuild', 'esbuild'], project)
  // Compare installed bytes to the actual packed files, not only version strings.
  for (const archive of archives) {
    const packageName = archive.match(/mitojs-(.+)-\d/)[1]
    const relative = `dist/${packageName}.js`
    const installed = resolve(project, 'node_modules/@mitojs', packageName)
    assert.equal(digest(readFileSync(resolve(installed, relative))), digest(readFileSync(resolve(root, 'artifacts/unpacked', packageName, relative))), `${name}: stale ${packageName} archive`)
    const require = createRequire(resolve(installed, 'package.json'))
    const metadata = JSON.parse(readFileSync(resolve(installed, 'package.json'), 'utf8'))
    for (const dependency of Object.keys(metadata.dependencies ?? {}).filter((name) => name.startsWith('@mitojs/'))) {
      const dependencyName = dependency.slice('@mitojs/'.length)
      const actual = require.resolve(dependency)
      assert.equal(digest(readFileSync(actual)), digest(readFileSync(resolve(root, 'artifacts/unpacked', dependencyName, `dist/${dependencyName}.js`))), `${name}: stale transitive ${dependency}`)
    }
  }
  run('pnpm', ['run', 'build'], project)
  assert.equal(sourceHash(resolve(project, 'src')), before, `${name} source was modified`)
  result.push({ repository: `mitojs/${name}`, commit, sourceSha256: before, build: 'passed', sourceChanged: false })
}
run('pnpm', ['exec', 'playwright', 'test', 'e2e/consumers.spec.ts'], root, {
  ...process.env, SDK_CONSUMER_ROOT: directory, SDK_TEST_CONSUMERS: '1'
})
const packages = Object.fromEntries(archives.map((archive) => [basename(archive), { sha256: digest(readFileSync(archive)) }]))
writeFileSync(resolve(root, 'artifacts/consumer-validation.json'), `${JSON.stringify({ repositories: result, packages, browser: 'passed' }, null, 2)}\n`)
