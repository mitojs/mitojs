import { test, expect } from '@playwright/test'

// Load the packed CDN bundle without initializing the example's own client.
test.beforeEach(async ({ page }) => {
  await page.route('**/initMito.js', (route) => route.fulfill({ contentType: 'application/javascript', body: '' }))
  await page.goto('/JS/index.html')
})

test('#41: disabled initialization leaves native methods and the report queue untouched', async ({ page }) => {
  expect(await page.evaluate(() => {
    const fetch = window.fetch, open = XMLHttpRequest.prototype.open
    const client = (window as any).MITO.init({ disabled: true, dsn: '/errors/upload' })
    client.log({ message: 'disabled' })
    return {
      nativeFetch: window.fetch === fetch,
      nativeXhr: XMLHttpRequest.prototype.open === open,
      breadcrumbs: client.breadcrumb.getStack(),
      queuedReports: client.transport.queue.getStack()
    }
  })).toEqual({ nativeFetch: true, nativeXhr: true, breadcrumbs: [], queuedReports: [] })
})
