import { test, expect } from '@playwright/test'

test.skip(!process.env.SDK_TEST_CONSUMERS, 'Run pnpm test:consumers to build and verify the original demo repositories')

test('original CRA4/React17 demo reports through unchanged Provider and ErrorBoundary', async ({ page }) => {
  await page.goto('/react-sdk-demo/')
  await expect(page.getByRole('button', { name: '手动上报MITO.log' })).toBeVisible()
  // The original demo intentionally mocks /upload with its own MSW worker.
  // Observe the SDK request and its response, including worker-handled traffic.
  const [manual] = await Promise.all([
    page.waitForRequest((request) => request.method() === 'POST' && request.url().endsWith('/upload') && request.postDataJSON()?.data?.message === 'this is message'),
    page.getByRole('button', { name: '手动上报MITO.log' }).click()
  ])
  expect(manual.postDataJSON().authInfo.sdkName).toBe('mitojs')
  expect((await manual.response()).status()).toBe(200)
  const [render] = await Promise.all([
    page.waitForRequest((request) => request.method() === 'POST' && request.url().endsWith('/upload') && request.postDataJSON()?.data?.type === 'REACT'),
    page.getByRole('button', { name: '触发render错误' }).click()
  ])
  expect((await render.response()).status()).toBe(200)
  await expect(page.getByText('Oops，触发了render error')).toBeVisible()
})

test('original Vue CLI3/Vue2 demo preserves instance, plugin and cancellation hook', async ({ page }) => {
  const reports = []
  await page.route('https://test.com/**', (route) => { reports.push(route.request().url()); return route.abort() })
  await page.goto('/vue2-sdk-demo/')
  await expect(page.getByRole('button', { name: '触发代码错误' })).toBeVisible()
  await page.getByRole('button', { name: '触发代码错误' }).click()
  await expect.poll(() => page.evaluate(() => (window as any).MitoInstance.breadcrumb.getStack().some((entry: any) => entry.type === 'Vue'))).toBe(true)
  expect(await page.evaluate(() => (window as any).MitoInstance.transport.beforeDataReport({}))).toBe(false)
  expect(reports).toHaveLength(0)
})

test('original Vite2/Vue3 demo preserves init and plugin registration', async ({ page }) => {
  await page.goto('/vue3-sdk-demo/')
  await expect.poll(() => page.evaluate(() => typeof (window as any).MitoInstance?.log)).toBe('function')
  const result = await page.evaluate(() => {
    const instance = (window as any).MitoInstance
    const app = instance.options.vue
    return { hasVueHandler: typeof app.config.errorHandler, hasPlugin: instance.options.vue === app, version: instance.SDK_VERSION }
  })
  expect(result).toMatchObject({ hasVueHandler: 'function', hasPlugin: true })
})
