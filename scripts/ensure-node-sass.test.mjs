import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

function fixture(t, { downloads = ['valid'], vendor, cached, downloadUrl } = {}) {
  const project = mkdtempSync(join(tmpdir(), 'mito-node-sass-'))
  t.after(() => rmSync(project, { recursive: true, force: true }))
  const module = join(project, 'node_modules/node-sass')
  const cacheDirectory = join(project, 'binary-cache')
  const binaryName = `${process.platform}-${process.arch}-${process.versions.modules}_binding.node`
  const binding = join(module, 'vendor', binaryName.replace('_binding.node', '/binding.node'))
  const cache = join(cacheDirectory, 'node-sass/4.14.1', binaryName)
  const events = join(project, 'installs.ndjson')
  const build = join(project, 'build-triggered')
  const write = (path, value) => { mkdirSync(join(path, '..'), { recursive: true }); writeFileSync(path, value) }
  write(join(module, 'package.json'), JSON.stringify({ name: 'node-sass', version: '4.14.1', main: 'index.js' }))
  write(join(module, 'index.js'), `
    const fs = require('fs'), extensions = require('./lib/extensions');
    exports.renderSync = () => {
      const binding = extensions.getBinaryPath();
      if (!fs.existsSync(binding) || fs.readFileSync(binding, 'utf8') !== 'valid') {
        throw new Error('node-sass renderSync probe: missing or invalid binding');
      }
      return { css: Buffer.from('a { color: red; }') };
    };
  `)
  write(join(module, 'lib/extensions.js'), `
    const fs = require('fs'), path = require('path');
    const name = process.platform + '-' + process.arch + '-' + process.versions.modules + '_binding.node';
    const candidates = () => [process.env.npm_config_sass_binary_cache, process.env.npm_config_cache].filter(Boolean);
    exports.getBinaryName = () => name;
    exports.getBinaryPath = () => path.join(__dirname, '../vendor', name.replace('_binding.node', '/binding.node'));
    exports.getBinaryCachePath = () => {
      const directory = path.join(candidates()[0], 'node-sass', '4.14.1');
      fs.mkdirSync(directory, { recursive: true });
      return directory;
    };
    exports.getCachedBinary = () => candidates().map(directory => path.join(directory, 'node-sass', '4.14.1', name)).find(fs.existsSync) || '';
    exports.getBinaryUrl = () => ${JSON.stringify(downloadUrl ?? null)} || 'https://github.com/sass/node-sass/releases/download/v4.14.1/' + name;
  `)
  write(join(module, 'scripts/install.js'), `
    const fs = require('fs'), path = require('path'), extensions = require('../lib/extensions');
    const project = path.resolve(__dirname, '../../..'), events = path.join(project, 'installs.ndjson');
    const binding = extensions.getBinaryPath(), cache = path.join(extensions.getBinaryCachePath(), extensions.getBinaryName());
    const read = file => fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
    if (process.env.npm_config_sass_binary_cache !== process.env.FIXTURE_CACHE || process.env.npm_config_cache !== process.env.FIXTURE_CACHE) {
      throw new Error('installer did not receive the isolated binary and npm caches');
    }
    const attempt = fs.existsSync(events) ? fs.readFileSync(events, 'utf8').trim().split('\\n').length + 1 : 1;
    fs.appendFileSync(events, JSON.stringify({ vendor: read(binding), cached: read(cache) }) + '\\n');
    if (fs.existsSync(binding)) process.exit(0);
    fs.mkdirSync(path.dirname(binding), { recursive: true });
    if (fs.existsSync(cache)) { fs.copyFileSync(cache, binding); process.exit(0); }
    const downloads = ${JSON.stringify(downloads)};
    const result = downloads[Math.min(attempt - 1, downloads.length - 1)];
    console.log('download attempt ' + attempt);
    if (result === '504') { console.error('HTTP error 504 Gateway Time-out'); process.exit(0); }
    const contents = result === 'valid' ? 'valid' : '<html>HTTP 200 corrupt binary</html>';
    fs.writeFileSync(binding, contents); fs.writeFileSync(cache, contents);
  `)
  write(join(module, 'scripts/build.js'), `require('fs').writeFileSync(${JSON.stringify(build)}, 'node-gyp invoked'); process.exit(1)`)
  if (vendor !== undefined) write(binding, vendor)
  if (cached !== undefined) write(cache, cached)
  return {
    binding, cache, build, binaryName,
    installs: () => existsSync(events) ? readFileSync(events, 'utf8').trim().split('\n').map(JSON.parse) : [],
    async run(overrides = {}) {
      const { ensureNodeSass } = await import('./ensure-node-sass.mjs')
      await ensureNodeSass({
        project, node: process.execPath, cacheDirectory, delayMs: 0, releaseApi: 'http://127.0.0.1:1',
        env: { ...process.env, FIXTURE_CACHE: cacheDirectory, npm_config_cache: join(project, 'unrelated-cache'), npm_config_sass_binary_cache: join(project, 'unrelated-binaries') },
        ...overrides
      })
    }
  }
}

async function releaseServer(t, binaryName, binary = 'valid') {
  const requests = []
  let url
  const server = createServer((request, response) => {
    requests.push({ path: request.url, accept: request.headers.accept })
    if (request.url === '/repos/sass/node-sass/releases/tags/v4.14.1') {
      response.setHeader('Content-Type', 'application/json')
      return response.end(JSON.stringify({ assets: [
        { name: 'wrong-platform_binding.node', url: url + '/assets/decoy', size: 5 },
        { name: binaryName, url: url + '/assets/1', size: Buffer.byteLength(binary) }
      ] }))
    }
    if (request.url === '/assets/1') return response.end(binary)
    response.statusCode = 404
    response.end('unexpected asset')
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  url = `http://127.0.0.1:${server.address().port}`
  t.after(() => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())))
  return { url, requests }
}

test('retries silent HTTP 504 installer exits and validates the third download', async (t) => {
  const f = fixture(t, { downloads: ['504', '504', 'valid'] })
  await f.run()
  assert.equal(f.installs().length, 3)
  assert.equal(readFileSync(f.binding, 'utf8'), 'valid')
  assert.equal(existsSync(f.build), false)
})

test('stops after three HTTP 504 failures with installer and render diagnostics, without building', async (t) => {
  const f = fixture(t, { downloads: ['504'] })
  await assert.rejects(f.run(), (error) => {
    assert.match(error.message, /504/)
    assert.match(error.message, /download attempt 3/)
    assert.match(error.message, /renderSync probe: missing or invalid binding/)
    return true
  })
  assert.equal(f.installs().length, 3)
  assert.equal(existsSync(f.build), false)
})

test('removes an invalid vendor binding and its dedicated cached binary before downloading', async (t) => {
  const f = fixture(t, { vendor: 'damaged vendor', cached: 'damaged cache' })
  await f.run()
  assert.deepEqual(f.installs().at(-1), { vendor: null, cached: null })
  assert.equal(readFileSync(f.binding, 'utf8'), 'valid')
  assert.equal(readFileSync(f.cache, 'utf8'), 'valid')
})

test('rejects a successful HTTP response containing an invalid binary and retries cleanly', async (t) => {
  const f = fixture(t, { downloads: ['corrupt', 'valid'] })
  await f.run()
  assert.deepEqual(f.installs(), [{ vendor: null, cached: null }, { vendor: null, cached: null }])
  assert.equal(readFileSync(f.binding, 'utf8'), 'valid')
  assert.equal(readFileSync(f.cache, 'utf8'), 'valid')
})

test('keeps an already working vendor binding without starting the installer', async (t) => {
  const f = fixture(t, { vendor: 'valid', downloads: ['504'] })
  await f.run()
  assert.equal(f.installs().length, 0)
  assert.equal(readFileSync(f.binding, 'utf8'), 'valid')
  assert.equal(existsSync(f.build), false)
})

test('reuses a valid dedicated cache while the download endpoint is unavailable', async (t) => {
  const f = fixture(t, { cached: 'valid', downloads: ['504'] })
  await f.run()
  assert.deepEqual(f.installs(), [{ vendor: null, cached: 'valid' }])
  assert.equal(readFileSync(f.binding, 'utf8'), 'valid')
  assert.equal(readFileSync(f.cache, 'utf8'), 'valid')
  assert.equal(existsSync(f.build), false)
})

test('uses the exact official release asset after three silent HTTP 504 failures', async (t) => {
  const f = fixture(t, { downloads: ['504'] })
  const api = await releaseServer(t, f.binaryName)
  await f.run({ releaseApi: api.url })
  assert.equal(f.installs().length, 3)
  assert.deepEqual(api.requests.map((request) => request.path), ['/repos/sass/node-sass/releases/tags/v4.14.1', '/assets/1'])
  assert.equal(api.requests[1].accept, 'application/octet-stream')
  assert.equal(readFileSync(f.binding, 'utf8'), 'valid')
  assert.equal(readFileSync(f.cache, 'utf8'), 'valid')
  assert.equal(existsSync(f.build), false)
})

test('rejects and removes a release API asset that cannot render instead of caching it', async (t) => {
  const f = fixture(t, { downloads: ['504'] })
  const api = await releaseServer(t, f.binaryName, 'corrupt API binary')
  await assert.rejects(f.run({ releaseApi: api.url }), /renderSync probe: missing or invalid binding/)
  assert.equal(f.installs().length, 3)
  assert.equal(api.requests.at(-1)?.path, '/assets/1')
  assert.equal(existsSync(f.binding), false)
  assert.equal(existsSync(f.cache), false)
  assert.equal(existsSync(f.build), false)
})

test('recovers an invalid vendor binding from an intact cache without downloading', async (t) => {
  const f = fixture(t, { vendor: 'damaged vendor', cached: 'valid', downloads: ['504'] })
  const api = await releaseServer(t, f.binaryName)
  await f.run({ releaseApi: api.url })
  assert.deepEqual(f.installs(), [{ vendor: null, cached: 'valid' }])
  assert.equal(readFileSync(f.binding, 'utf8'), 'valid')
  assert.equal(readFileSync(f.cache, 'utf8'), 'valid')
  assert.deepEqual(api.requests, [])
})

test('does not bypass a custom binary download URL through the official release API', async (t) => {
  const f = fixture(t, { downloads: ['504'], downloadUrl: 'https://custom.example/v4.14.1/custom_binding.node' })
  const api = await releaseServer(t, f.binaryName)
  await assert.rejects(f.run({ releaseApi: api.url }), /504/)
  assert.equal(f.installs().length, 3)
  assert.deepEqual(api.requests, [])
  assert.equal(existsSync(f.build), false)
})
