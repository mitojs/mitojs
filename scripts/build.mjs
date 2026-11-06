import { spawnSync } from 'node:child_process'
import { readdirSync } from 'node:fs'

const args = process.argv.slice(2)
const packages = readdirSync(new URL('../packages/', import.meta.url), { withFileTypes: true })
  .filter((entry) => entry.isDirectory()).map((entry) => entry.name)
const selected = args.filter((arg) => !arg.startsWith('--'))
for (const name of selected) {
  if (!packages.includes(name)) throw new Error(`Unknown SDK package: ${name}`)
}
const command = args.includes('--watch') ? ['watch', '--all', '--initialRun', '--', 'pnpm', 'build'] : [
  'run-many', '-t', 'build', `--projects=${(selected.length ? selected : packages).map((name) => `@mitojs/${name}`).join(',')}`,
  '--parallel=2', '--output-style=static'
]
const result = spawnSync('pnpm', ['exec', 'nx', ...command], { stdio: 'inherit', env: { ...process.env, NX_DAEMON: 'false' } })
if (result.error) throw result.error
process.exit(result.status ?? 1)
