import { defineConfig } from '@playwright/test'

const baseURL = `http://localhost:${process.env.SDK_TEST_PORT ?? 2021}`

export default defineConfig({
  testDir: './e2e', testMatch: '**/*.spec.ts', fullyParallel: false, workers: 1,
  timeout: 30_000, reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL, trace: 'retain-on-failure',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: { command: 'node scripts/serve-tests.mjs', url: `${baseURL}/JS/index.html`, reuseExistingServer: false }
})
