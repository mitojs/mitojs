import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import { createHash } from 'node:crypto'
import { after, before, test } from 'node:test'
import { root } from './pack.mjs'

export function registerVueConsumerTests(getArchives) {
  const fixture = mkdtempSync(join(tmpdir(), 'mito-sdk-vue3-consumer-'))
  before(() => {
    const packages = Object.fromEntries(getArchives().map((archive) => {
      const digest = createHash('sha256').update(readFileSync(archive)).digest('hex')
      const destination = join(fixture, digest, basename(archive))
      mkdirSync(join(fixture, digest))
      copyFileSync(archive, destination)
      return [`@mitojs/${basename(archive).match(/mitojs-(.+)-\d/)[1]}`, `file:${destination}`]
    }))
    const { packageManager } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
    writeFileSync(join(fixture, 'package.json'), JSON.stringify({
      name: 'vue3-sdk-consumer', private: true, packageManager,
      dependencies: { ...packages, vue: '3.5.45', typescript: '6.0.3' }
    }))
    writeFileSync(join(fixture, 'pnpm-workspace.yaml'), JSON.stringify({ packages: ['.'], nodeLinker: 'isolated', overrides: packages }))
    execFileSync('pnpm', ['install', '--ignore-scripts', '--no-frozen-lockfile'], { cwd: fixture, stdio: 'pipe' })
  })
  after(() => rmSync(fixture, { recursive: true, force: true }))

  test('packed Vue3 plugins accept their actual browser client under strict TypeScript 6', () => {
    writeFileSync(join(fixture, 'consumer.ts'), `import { createApp } from 'vue'
import { init, createBrowserInstance, BrowserClient } from '@mitojs/browser'
import { init as webInit } from '@mitojs/web'
import { vuePlugin } from '@mitojs/vue'
import { BasePluginType } from '@mitojs/types'
import { BrowserEventTypes, EventTypes } from '@mitojs/shared'
const app = createApp({})
const client: BrowserClient = init({ vue: app }, [vuePlugin])
const created = createBrowserInstance({ vue: app }, [vuePlugin])
client.use([vuePlugin])
created.use([vuePlugin])
webInit({ vue: app }, [vuePlugin]).use([vuePlugin])
const browserPlugin: BasePluginType<EventTypes, BrowserClient> = {
  name: BrowserEventTypes.DOM,
  monitor() { this.log({ message: 'browser client' }) }
}
init({ vue: app }, [vuePlugin, browserPlugin]).use([browserPlugin])
interface MoreSpecificClient extends BrowserClient { customOnly(): void }
const incompatible: BasePluginType<EventTypes, MoreSpecificClient> = {
  name: BrowserEventTypes.DOM,
  monitor() { this.customOnly() }
}
// @ts-expect-error BrowserClient does not supply a plugin-specific custom method.
init({}, [incompatible])
// @ts-expect-error The instance must also reject plugins requiring a more specific client.
client.use([incompatible])
`)
    writeFileSync(join(fixture, 'tsconfig.json'), JSON.stringify({
      compilerOptions: {
        noEmit: true, strict: true, target: 'ES2015', lib: ['ES2015', 'DOM'],
        module: 'ESNext', moduleResolution: 'Bundler', skipLibCheck: true, types: []
      },
      files: ['consumer.ts']
    }))
    try {
      execFileSync(process.execPath, [join(fixture, 'node_modules/typescript/bin/tsc'), '-p', fixture], { cwd: fixture, stdio: 'pipe' })
    } catch (error) {
      throw new Error(`${error.message}\n${error.stdout ?? ''}\n${error.stderr ?? ''}`)
    }
  })
}
