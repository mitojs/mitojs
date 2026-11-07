import { test, expect } from '@playwright/test'

test('packed CDN browser bundle preserves MITO and manual reports', async ({ page }) => {
  await page.goto('/JS/index.html')
  const report = page.waitForRequest((request) => request.method() === 'POST' && request.url().endsWith('/errors/upload'))
  await page.evaluate(() => (window as any)._MITO_.log({ message: 'packed SDK', tag: 'compatibility' }))
  expect((await report).postDataJSON().data).toMatchObject({ message: 'packed SDK', customTag: 'compatibility' })
  expect(await page.evaluate(() => Object.keys((window as any).MITO).sort())).toEqual(['BrowserClient', 'createBrowserInstance', 'init'])
})

for (const selector of ['#codeErr', '#promiseError']) {
  test(`packed browser bundle captures ${selector}`, async ({ page }) => {
    await page.goto('/JS/index.html')
    const report = page.waitForRequest((request) => request.method() === 'POST' && request.url().endsWith('/errors/upload'))
    await page.click(selector)
    expect((await report).postDataJSON().data).toHaveProperty('type')
    expect(await page.evaluate(() => (window as any)._MITO_.breadcrumb.getStack().length)).toBeGreaterThanOrEqual(2)
  })
}

for (const [selector, path] of [['#normalReq', '/normal'], ['#exceptionReq', '/exception'], ['#normalFetch', '/normal/post'], ['#exceptionFetch', '/exception/post']]) {
  test(`packed browser bundle captures ${selector} requests`, async ({ page }) => {
    await page.goto('/JS/index.html')
    await page.click(selector)
    await expect.poll(() => page.evaluate((path) => (window as any)._MITO_.breadcrumb.getStack().some((item: any) => item.data?.request?.url === path), path)).toBe(true)
  })
}

for (const framework of ['Vue', 'Vue3']) {
  test(`packed web CDN bundle preserves ${framework} plugin`, async ({ page }) => {
    await page.goto(`/${framework}/index.html`)
    const report = page.waitForRequest((request) => request.method() === 'POST' && request.url().endsWith('/errors/upload'))
    await page.click('#vueCodeError')
    expect((await report).postDataJSON().data.type).toBe('VUE')
  })
}

test('packed web CDN bundle preserves React ErrorBoundary', async ({ page }) => {
  await page.goto('/React/index.html')
  const report = page.waitForRequest((request) => request.method() === 'POST' && request.url().endsWith('/errors/upload'))
  for (let count = 0; count < 3; count++) await page.click('#numException')
  expect((await report).postDataJSON().data.type).toBe('REACT')
})
