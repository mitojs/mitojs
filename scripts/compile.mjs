import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync, mkdirSync, symlinkSync, rmSync } from 'node:fs'
import { resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript-es5'
import remapping from '@jridgewell/remapping'

const root = fileURLToPath(new URL('../', import.meta.url))
execFileSync('pnpm', ['exec', 'tsc', '-p', 'tsconfig.build.json'], { cwd: root, stdio: 'inherit' })
// Lower each emitted module before bundling, sharing tslib helpers across
// modules. This retains ES5 without duplicating generator/inheritance helpers.
function lower(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) lower(path)
    else if (entry.name.endsWith('.js')) {
      const result = ts.transpileModule(readFileSync(path, 'utf8'), {
        fileName: entry.name,
        compilerOptions: { target: ts.ScriptTarget.ES5, module: ts.ModuleKind.ESNext, importHelpers: true, sourceMap: true, inlineSources: true, removeComments: true }
      })
      const map = remapping([JSON.parse(result.sourceMapText), JSON.parse(readFileSync(`${path}.map`, 'utf8'))], () => null)
      writeFileSync(path, result.outputText)
      writeFileSync(`${path}.map`, JSON.stringify(map))
    }
  }
}
lower(resolve(root, '.cache/emit/packages'))
// API Extractor needs package boundaries alongside the emitted declarations;
// otherwise it inlines private classes across packages, breaking assignability.
for (const entry of readdirSync(resolve(root, 'packages'), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const directory = resolve(root, '.cache/emit/packages', entry.name)
  mkdirSync(directory, { recursive: true })
  const manifest = JSON.parse(readFileSync(resolve(root, 'packages', entry.name, 'package.json'), 'utf8'))
  manifest.types = './src/index.d.ts'
  writeFileSync(resolve(directory, 'package.json'), JSON.stringify(manifest))
  const links = resolve(root, '.cache/emit/node_modules/@mitojs')
  mkdirSync(links, { recursive: true })
  const link = resolve(links, entry.name)
  rmSync(link, { force: true })
  symlinkSync(relative(links, directory), link, 'dir')
}
