import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync, existsSync, realpathSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve, join, dirname, basename } from 'node:path'
import { createRequire } from 'node:module'
import { after, before, test } from 'node:test'
import vm from 'node:vm'
import { JSDOM } from 'jsdom'
import { parse } from 'acorn'
import { TraceMap, originalPositionFor } from '@jridgewell/trace-mapping'
import { packPackages, root } from '../../scripts/pack.mjs'
import { registerReactConsumerTests } from './react.mjs'
import { registerVueConsumerTests } from './vue.mjs'

const manifests = Object.fromEntries(readdirSync(resolve(root, 'packages'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => [entry.name, JSON.parse(readFileSync(resolve(root, 'packages', entry.name, 'package.json'), 'utf8'))]))
const fixture = mkdtempSync(join(tmpdir(), 'mito-sdk-consumer-'))
const names = Object.keys(manifests)
let packages
function run(command, args, options) {
  try { return execFileSync(command, args, { encoding: 'utf8', ...options }) }
  catch (error) { throw new Error(`${error.message}\n${error.stdout ?? ''}\n${error.stderr ?? ''}`) }
}
before(() => {
  packages = packPackages()
  const dependencies = Object.fromEntries(packages.map((path) => {
    const match = basename(path).match(/mitojs-(.+)-\d/)
    return [`@mitojs/${match[1]}`, `file:${path}`]
  }))
  const overrides = { ...dependencies }
  dependencies.react = '17.0.2'
  dependencies['@types/react'] = '17.0.90'
  dependencies['@types/wechat-miniprogram'] = '3.4.8'
  const { packageManager } = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
  writeFileSync(join(fixture, 'package.json'), JSON.stringify({ name: 'sdk-consumer', private: true, packageManager, dependencies }))
  writeFileSync(join(fixture, 'pnpm-workspace.yaml'), JSON.stringify({ packages: ['.'], nodeLinker: 'isolated', overrides }))
  run('pnpm', ['install', '--ignore-scripts', '--no-frozen-lockfile'], { cwd: fixture, stdio: 'pipe' })
})
after(() => rmSync(fixture, { recursive: true, force: true }))

function evaluate(code, cjs = false, wx = false) {
  const dom = wx ? null : new JSDOM('', { url: 'http://localhost/', runScripts: 'outside-only' })
  const context = dom ? dom.getInternalVMContext() : vm.createContext({ console, setTimeout, clearTimeout })
  if (wx) {
    context.wx = { getSystemInfoSync: () => ({}) }
    context.App = () => {}
    context.Page = () => {}
    context.Behavior = (definition) => definition
    context.Component = () => {}
    context.getCurrentPages = () => []
  }
  context.exports = {}
  context.module = { exports: context.exports }
  if (cjs && !wx) context.require = (name) => {
    assert.equal(name, 'react')
    return createRequire(join(fixture, 'package.json'))(name)
  }
  vm.runInContext(cjs ? `(function (exports, module) { ${code}\n}).call(module.exports, exports, module)` : code, context)
  return { api: cjs ? context.module.exports : context.MITO ?? {}, context, close: () => dom?.window.close() }
}

for (const name of names) {
  test(`packed @mitojs/${name} preserves its manifest, loads its entries and targets ES2015`, () => {
    const directory = join(fixture, 'node_modules/@mitojs', name)
    const manifest = JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'))
    const sourceManifest = manifests[name]
    for (const key of ['main', 'module', 'types']) {
      assert.equal(manifest[key], sourceManifest[key])
      assert.ok(existsSync(join(directory, manifest[key])), `${name}: missing ${manifest[key]}`)
    }
    assert.equal(manifest.name, sourceManifest.name)
    assert.deepEqual(manifest.peerDependencies ?? {}, sourceManifest.peerDependencies ?? {})
    for (const version of Object.values(manifest.dependencies ?? {})) assert.ok(!version.startsWith('workspace:'))
    const require = createRequire(realpathSync(join(directory, 'package.json')))
    for (const dependency of Object.keys(manifest.dependencies ?? {}).filter((name) => name.startsWith('@mitojs/'))) {
      const dependencyName = dependency.slice('@mitojs/'.length)
      const expected = join(root, 'artifacts/unpacked', dependencyName, manifests[dependencyName].main)
      assert.ok(readFileSync(require.resolve(dependency)).equals(readFileSync(expected)), `${name}: stale transitive ${dependency}`)
    }
    for (const extension of ['js', 'esm.js', 'min.js']) {
      const code = readFileSync(join(directory, 'dist', `${name}.${extension}`), 'utf8')
      if (extension === 'esm.js') assert.ok(!/\b(?:__require|require)\s*\(/.test(code), 'Browser ESM must not require an external CommonJS loader')
      const program = parse(code, { ecmaVersion: 2015, sourceType: extension === 'esm.js' ? 'module' : 'script' })
      if (extension === 'min.js') assert.equal(program.body[0]?.directive, undefined, 'IIFE strict mode must not affect concatenated application scripts')
      assert.ok(!code.includes('__coverage__'))
      if (extension !== 'esm.js') {
        const result = evaluate(code, extension === 'js', name.startsWith('wx-mini'))
        if (result.api.init) assert.throws(() => result.api.init.caller, /caller|strict|restricted/i)
        assert.equal(result.context.__coverage__, undefined)
        for (const helper of ['__extends', '__awaiter', '__generator', '__spreadArray']) assert.equal(result.context[helper], undefined)
        result.close()
      }
    }
  })
}

test('installed packages load with CommonJS and legacy deep imports outside the workspace', () => {
  const script = `for (const name of ${JSON.stringify(names.filter((name) => !name.startsWith('wx-mini')))}) {
    const pkg = require('@mitojs/' + name);
    const deep = require('@mitojs/' + name + '/dist/' + name + '.js');
    if (pkg !== deep) throw new Error(name);
  }`
  run(process.execPath, ['-e', script], { cwd: fixture, stdio: 'pipe' })
})

test('downloaded wx-mini CommonJS file initializes and reports without a package manager or browser globals', async () => {
  const code = readFileSync(join(fixture, 'node_modules/@mitojs/wx-mini/dist/wx-mini.js'), 'utf8')
  const result = evaluate(code, true, true)
  const requests = []
  result.context.wx.request = (options) => { requests.push(options); return { abort() {} } }
  const client = result.api.init({
    dsn: 'https://example.invalid/report', silentConsole: true,
    configReportWxRequest: () => ({ header: { 'x-compatibility': 'single-file' } })
  })
  client.log({ message: 'wx single file', tag: 'compatibility' })
  await new Promise((done) => setTimeout(done, 10))
  assert.equal(requests.length, 1)
  assert.equal(requests[0].method, 'POST')
  assert.equal(requests[0].header['x-compatibility'], 'single-file')
  const data = JSON.parse(requests[0].data)
  assert.equal(data.authInfo.sdkName, 'mitojs')
  assert.equal(data.data.message, 'wx single file')
  assert.equal(result.context.window, undefined)
  assert.equal(result.context.require, undefined)
  result.close()
})

test('packed declarations support SDK consumer APIs with current TypeScript', () => {
  const source = `import React from 'react'
import { init, BrowserClient } from '@mitojs/browser'
import { vuePlugin } from '@mitojs/vue'
import { MitoProvider, ErrorBoundary, WithErrorBoundary } from '@mitojs/react'
import { Subscrib } from '@mitojs/core'
import { init as wxInit } from '@mitojs/wx-mini'
import { WxPerformance } from '@mitojs/wx-mini-performance'
const client: BrowserClient = init({ dsn: '/upload', vue: {} as any }, [vuePlugin])
const react = <MitoProvider MitoInstance={client}><ErrorBoundary><div /></ErrorBoundary></MitoProvider>
const mini = wxInit({ dsn: '/upload' })
const subscribe = new Subscrib()
const wrapped = WithErrorBoundary()(() => <div />)
new WxPerformance({ appId: 'test', report: () => undefined })
client.log({ message: 'compatible' })
mini.log({ message: 'compatible' })
`
  writeFileSync(join(fixture, 'consumer.tsx'), source)
  writeFileSync(join(fixture, 'tsconfig.json'), JSON.stringify({
    compilerOptions: { noEmit: true, target: 'ES2015', lib: ['ES2015', 'DOM'], module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react', esModuleInterop: true, skipLibCheck: true, types: ['react', 'wechat-miniprogram'] },
    files: ['consumer.tsx']
  }))
  run(process.execPath, [join(root, 'node_modules/typescript/bin/tsc'), '-p', fixture], { cwd: fixture, stdio: 'pipe' })
})

test('packed source maps resolve generated functions back to the original TypeScript', () => {
  const path = join(fixture, 'node_modules/@mitojs/browser/dist/browser.js')
  const code = readFileSync(path, 'utf8')
  const declaration = code.indexOf('function createBrowserInstance')
  assert.notEqual(declaration, -1)
  const offset = declaration + 'function '.length
  const prefix = code.slice(0, offset)
  const position = originalPositionFor(new TraceMap(JSON.parse(readFileSync(`${path}.map`, 'utf8'))), {
    line: prefix.split('\n').length, column: offset - prefix.lastIndexOf('\n') - 1
  })
  assert.match(resolve(dirname(path), position.source), /browser\/src\/index\.ts$/)
  const source = readFileSync(join(root, 'packages/browser/src/index.ts'), 'utf8')
  assert.equal(position.line, source.slice(0, source.indexOf('function createBrowserInstance')).split('\n').length)
})

registerReactConsumerTests(() => packages)
registerVueConsumerTests(() => packages)
