import { test, expect } from '@playwright/test'

// Load the packed CDN bundle without initializing the example's own client.
test.beforeEach(async ({ page }) => {
  await page.route('**/initMito.js', (route) => route.fulfill({ contentType: 'application/javascript', body: '' }))
  await page.goto('/JS/index.html')
})

test('#15: uploaded logs preserve shared objects and mark only ancestor cycles', async ({ page }) => {
  const report = page.waitForRequest((request) => request.method() === 'POST' && request.url().endsWith('/errors/upload'))
  await page.evaluate(() => {
    const shared = { value: 'kept' }
    const message: any = { first: shared, second: shared }
    message.self = message
    const client = new (window as any).MITO.BrowserClient({ dsn: '/errors/upload' })
    client.log({ message })
  })
  const payload = (await report).postDataJSON()
  const expected = { first: { value: 'kept' }, second: { value: 'kept' }, self: 'Circular' }
  expect(JSON.parse(payload.data.message)).toEqual(expected)
  expect(payload.breadcrumb[0].data).toEqual(expected)
})
