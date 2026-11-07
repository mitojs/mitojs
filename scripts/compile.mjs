import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync, mkdirSync, symlinkSync, rmSync } from 'node:fs'
import { resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
execFileSync('pnpm', ['exec', 'tsc', '-p', 'tsconfig.build.json'], { cwd: root, stdio: 'inherit' })
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
