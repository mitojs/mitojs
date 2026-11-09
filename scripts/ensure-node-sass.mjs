import { spawnSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { setTimeout } from 'node:timers/promises'

export async function ensureNodeSass({ project, node, cacheDirectory, attempts = 3, delayMs = 1000, env = process.env, releaseApi = 'https://api.github.com' }) {
  const sass = resolve(project, 'node_modules/node-sass')
  // Keep native artifacts separate from the user's npm cache. The installer
  // itself selects the version/platform/architecture/ABI-specific cache entry.
  const environment = { ...env, npm_config_sass_binary_cache: cacheDirectory, npm_config_cache: cacheDirectory }
  const execute = (args) => spawnSync(node, args, {
    cwd: project, env: environment, encoding: 'utf8', timeout: 90_000, maxBuffer: 4 * 1024 * 1024
  })
  const output = (result) => [result.stdout, result.stderr, result.error?.message].filter(Boolean).join('\n')
  const metadata = execute(['-e', `
    const sass = require(process.argv[1]);
    const cache = sass.getBinaryCachePath();
    console.log(JSON.stringify({
      binary: sass.getBinaryPath(), cache: cache ? require('path').join(cache, sass.getBinaryName()) : null,
      url: sass.getBinaryUrl()
    }));
  `, join(sass, 'lib/extensions.js')])
  if (metadata.status !== 0) throw new Error(`Cannot inspect node-sass using ${node}:\n${output(metadata)}`)
  const paths = JSON.parse(metadata.stdout)
  // Each check loads the installed bytes in a fresh consumer process, using
  // the consumer's native ABI rather than the SDK workspace's ABI.
  const probe = () => execute(['-e', "require(process.argv[1]).renderSync({ data: 'a { color: red; }' })", sass])
  const clean = () => { rmSync(paths.binary, { force: true }); if (paths.cache) rmSync(paths.cache, { force: true }) }
  let validation = probe()
  if (validation.status === 0) return
  const diagnostics = [`Initial binding validation:\n${output(validation)}`]
  if (existsSync(paths.binary)) rmSync(paths.binary, { force: true })
  for (let attempt = 1; attempt <= attempts; attempt++) {
    // install.js logs HTTP failures but can still exit 0. Do not run build.js
    // until renderSync proves that a usable native binding was installed.
    const installation = execute([join(sass, 'scripts/install.js')])
    validation = probe()
    if (validation.status === 0) return
    diagnostics.push(`Attempt ${attempt}:\n${output(installation)}\n${output(validation)}`)
    clean()
    console.warn(`node-sass binary validation failed (attempt ${attempt}/${attempts})`)
    if (attempt < attempts) await setTimeout(delayMs * attempt)
  }
  // The legacy browser-download endpoint can remain unavailable even when
  // GitHub's official Release API can serve exactly the same asset. Respect
  // custom SASS_BINARY_SITE values instead of silently bypassing their host.
  const source = new URL(paths.url)
  const match = source.protocol === 'https:' && source.hostname === 'github.com'
    && source.pathname.match(/^\/sass\/node-sass\/releases\/download\/([^/]+)\/([^/]+)$/)
  if (match) {
    const temporary = `${paths.binary}.download`
    try {
      const request = async (url, accept) => {
        const response = await fetch(url, { headers: { Accept: accept }, signal: AbortSignal.timeout(60_000) })
        if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`)
        return response
      }
      const releaseUrl = new URL(`/repos/sass/node-sass/releases/tags/${match[1]}`, releaseApi)
      const release = await (await request(releaseUrl, 'application/vnd.github+json')).json()
      const asset = release.assets?.find((asset) => asset.name === match[2])
      if (!asset) throw new Error(`Release ${match[1]} has no asset ${match[2]}`)
      const bytes = Buffer.from(await (await request(asset.url, 'application/octet-stream')).arrayBuffer())
      if (bytes.length !== asset.size) throw new Error(`Incomplete node-sass asset: received ${bytes.length}/${asset.size} bytes`)
      mkdirSync(dirname(paths.binary), { recursive: true })
      writeFileSync(temporary, bytes)
      renameSync(temporary, paths.binary)
      validation = probe()
      if (validation.status !== 0) throw new Error(output(validation))
      if (paths.cache) copyFileSync(paths.binary, paths.cache)
      console.log(`Verified node-sass binding from GitHub Release API: ${asset.name}`)
      return
    } catch (error) {
      diagnostics.push(`GitHub Release API: ${error.message}`)
      rmSync(temporary, { force: true })
      clean()
    }
  }
  throw new Error(`Cannot install a working node-sass binding from ${paths.url} after ${attempts} attempts; source compilation was not started.\n${diagnostics.join('\n')}`)
}
