import { defineConfig } from 'vitest/config'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const sourceAliases = Object.fromEntries(readdirSync(new URL('./packages/', import.meta.url), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => [`@mitojs/${entry.name}`, fileURLToPath(new URL(`./packages/${entry.name}/src/index.ts`, import.meta.url))]))

export default defineConfig({
  resolve: { alias: { ...sourceAliases, packages: fileURLToPath(new URL('./packages/', import.meta.url)) } },
  test: {
    globals: true, environment: 'jsdom', include: ['packages/**/*.spec.ts'],
    clearMocks: false, mockReset: false, restoreMocks: false,
    setupFiles: ['./test/setup.ts'],
    pool: 'forks', maxWorkers: 2,
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
    coverage: { provider: 'v8', include: ['packages/*/src/**/*.{ts,tsx}'], exclude: ['**/__tests__/**'], reporter: ['text', 'lcov'] }
  }
})
