import { defineConfig } from 'vitest/config'
import { sourceAliases } from './tools/vite/library.mjs'
import { fileURLToPath } from 'node:url'

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
