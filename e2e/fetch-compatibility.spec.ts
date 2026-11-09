import { test, expect } from '@playwright/test'

// Load the packed CDN bundle without initializing the example's own client.
test.beforeEach(async ({ page }) => {
  await page.route('**/initMito.js', (route) => route.fulfill({ contentType: 'application/javascript', body: '' }))
  await page.goto('/JS/index.html')
})

for (const placement of ['before', 'after']) {
  test(`#28: business fetch installed ${placement} the SDK preserves Request and Response`, async ({ page }) => {
    const outgoing = page.waitForRequest((request) => request.method() === 'POST' && new URL(request.url()).pathname === '/normal/post')
    const result = await page.evaluate(async (placement) => {
      const wrap = () => {
        const previous = window.fetch
        window.fetch = async function (input, init) {
          const headers = new Headers(init?.headers ?? (input instanceof Request ? input.headers : undefined))
          headers.set('X-Business', placement)
          const response = await previous.call(this, input, { ...init, headers })
          ;(window as any).businessResponse = response
          return response
        }
      }
      if (placement === 'before') wrap()
      ;(window as any).client = (window as any).MITO.init({ silentConsole: true })
      if (placement === 'after') wrap()
      const input = new Request(new URL('/normal/post', location.href), { method: 'POST', body: 'business payload' })
      const response = await fetch(input)
      return { sameResponse: response === (window as any).businessResponse, status: response.status, body: await response.text() }
    }, placement)
    const request = await outgoing
    expect(request.postData()).toBe('business payload')
    expect(await request.headerValue('x-business')).toBe(placement)
    expect(result).toEqual({ sameResponse: true, status: 200, body: '{"data":"test response"}' })
    await expect.poll(() => page.evaluate(() => (window as any).client.breadcrumb.getStack().filter((entry: any) => entry.type === 'Fetch').length)).toBe(1)
  })
}
