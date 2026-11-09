import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import { createHash } from 'node:crypto'
import { after, before, test } from 'node:test'
import { rolldown } from 'rolldown'
import { root } from '../../scripts/pack.mjs'

function run(command, args, cwd) {
  try { return execFileSync(command, args, { cwd, encoding: 'utf8', stdio: 'pipe' }) }
  catch (error) { throw new Error(`${error.message}\n${error.stdout ?? ''}\n${error.stderr ?? ''}`) }
}

// Standard JSX is deliberately shared by the type check and both runtime consumers.
// Losing children in the public props or bundling another React must break these tests.
function consumerSource(name) {
  return `import React, { useContext } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { BrowserClient } from '@mitojs/browser'
import { MitoProvider, MitoContext, ErrorBoundary, WithErrorBoundary } from '@mitojs/${name}'
const client = new BrowserClient({ disabled: true })
const ContextChild = () => <p>{useContext(MitoContext).MitoInstance === client ? 'provider' : 'missing'}</p>
const Wrapped = WithErrorBoundary()(() => <span>wrapped</span>)
const empty = <MitoProvider MitoInstance={client} />
export function render() {
  return [
    renderToStaticMarkup(<MitoProvider MitoInstance={client}><ContextChild /></MitoProvider>),
    renderToStaticMarkup(<ErrorBoundary fallback={<p>fallback</p>}><span>boundary</span></ErrorBoundary>),
    renderToStaticMarkup(<Wrapped />)
  ]
}
`
}

export function registerReactConsumerTests(getArchives) {
  const directory = mkdtempSync(join(tmpdir(), 'mito-sdk-react-consumers-'))
  const versions = ['16.8.6', '17.0.2', '19.3.1']
  const fixtures = new Map(versions.map((version) => [version, join(directory, version)]))

  before(() => {
    // Cache each candidate by content: a rebuilt tarball can retain the same beta version.
    const dependencies = Object.fromEntries(getArchives().map((archive) => {
      const digest = createHash('sha256').update(readFileSync(archive)).digest('hex')
      const destination = join(directory, digest, basename(archive))
      mkdirSync(join(directory, digest), { recursive: true })
      copyFileSync(archive, destination)
      return [`@mitojs/${basename(archive).match(/mitojs-(.+)-\d/)[1]}`, `file:${destination}`]
    }))
    const { packageManager } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
    for (const [version, fixture] of fixtures) {
      mkdirSync(fixture)
      const consumerDependencies = { ...dependencies, react: version, 'react-dom': version }
      if (version.startsWith('19.')) {
        consumerDependencies['@types/react'] = '19.3.0'
        consumerDependencies['@types/react-dom'] = '19.3.0'
      }
      writeFileSync(join(fixture, 'package.json'), JSON.stringify({ name: 'react-sdk-consumer', private: true, packageManager, dependencies: consumerDependencies }))
      writeFileSync(join(fixture, 'pnpm-workspace.yaml'), JSON.stringify({ packages: ['.'], nodeLinker: 'isolated', overrides: dependencies }))
      run('pnpm', ['install', '--ignore-scripts', '--no-frozen-lockfile'], fixture)
      for (const name of ['react', 'web']) writeFileSync(join(fixture, `${name}.tsx`), consumerSource(name))
    }
  })
  after(() => rmSync(directory, { recursive: true, force: true }))

  test('packed React and web declarations accept standard JSX with React 19 types', () => {
    const fixture = fixtures.get('19.3.1')
    writeFileSync(join(fixture, 'tsconfig.json'), JSON.stringify({
      compilerOptions: {
        noEmit: true, strict: true, target: 'ES2015', lib: ['ES2015', 'DOM'],
        module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react-jsx',
        esModuleInterop: true, skipLibCheck: true, types: ['react']
      },
      files: ['react.tsx', 'web.tsx']
    }))
    run(process.execPath, [join(root, 'node_modules/typescript/bin/tsc'), '-p', fixture], fixture)
  })

  for (const [version, fixture] of fixtures) {
    for (const name of ['react', 'web']) {
      for (const format of ['esm', 'cjs']) {
        test(`packed @mitojs/${name} ${format} renders with host React ${version}`, async () => {
          const entry = join(fixture, `${name}-${format}.cjs`)
          // Classic JSX supports the React 16.8 peer floor. ESM consumes module
          // entries through a bundler; CJS leaves SDK imports for Node's loader.
          const bundle = await rolldown({
            input: join(fixture, `${name}.tsx`), platform: 'node',
            transform: { jsx: { runtime: 'classic' } },
            resolve: { mainFields: format === 'esm' ? ['module', 'main'] : ['main'] },
            external: (id) => id === 'react' || id.startsWith('react/') || id.startsWith('react-dom/') ||
              (format === 'cjs' && id.startsWith('@mitojs/'))
          })
          try {
            await bundle.write({ file: entry, format: 'cjs' })
          } finally {
            await bundle.close()
          }
          const output = run(process.execPath, ['-e', `const { render } = require(${JSON.stringify(entry)}); console.log(JSON.stringify(render()))`], fixture)
          assert.deepEqual(JSON.parse(output.trim()), ['<p>provider</p>', '<span>boundary</span>', '<span>wrapped</span>'])
        })
      }
    }
  }
}
