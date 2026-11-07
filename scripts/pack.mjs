import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { basename, resolve } from 'node:path'

export const root = fileURLToPath(new URL('../', import.meta.url))
export const artifactDirectory = resolve(root, 'artifacts/packages')
export function packPackages() {
  mkdirSync(artifactDirectory, { recursive: true })
  const paths = []
  for (const entry of readdirSync(resolve(root, 'packages'), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const output = execFileSync('pnpm', ['pack', '--pack-destination', artifactDirectory, '--json'], {
      cwd: resolve(root, 'packages', entry.name), encoding: 'utf8'
    })
    paths.push(JSON.parse(output).filename)
  }
  const archives = paths.map((path) => resolve(artifactDirectory, path))
  for (const archive of archives) {
    const name = basename(archive).match(/mitojs-(.+)-\d/)[1]
    const destination = resolve(root, 'artifacts/unpacked', name)
    mkdirSync(destination, { recursive: true })
    execFileSync('tar', ['-xzf', archive, '-C', destination, '--strip-components=1'])
  }
  return archives
}
if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(packPackages().join('\n'))
