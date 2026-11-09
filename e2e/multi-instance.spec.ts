import { test, expect } from '@playwright/test'

// Load the packed CDN bundle without initializing the example's own client.
test.beforeEach(async ({ page }) => {
  await page.route('**/initMito.js', (route) => route.fulfill({ contentType: 'application/javascript', body: '' }))
  await page.goto('/JS/index.html')
})

test('#29: two clients keep native XHR and fetch contexts separate and share the wire trace', async ({ page }) => {
  await page.evaluate(() => {
    ;(window as any).clients = ['first', 'second'].map((apikey) => (window as any).MITO.init({
      apikey, silentConsole: true, enableTraceId: true
    }))
  })
  for (const kind of ['Xhr', 'Fetch']) {
    const outgoing = page.waitForRequest((request) => new URL(request.url()).pathname === '/normal')
    await page.evaluate(async (kind) => {
      if (kind === 'Fetch') await (await fetch('/normal')).text()
      else await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '/normal')
        xhr.onload = () => resolve()
        xhr.onerror = () => reject(new Error('XHR failed'))
        xhr.send()
      })
    }, kind)
    const trace = await (await outgoing).headerValue('trace-id')
    expect(trace).toBeTruthy()
    await expect.poll(() => page.evaluate((kind) => (window as any).clients.map((client: any) => client.breadcrumb.getStack().filter((entry: any) => entry.type === kind).length), kind)).toEqual([1, 1])
    const collected = await page.evaluate((kind) => {
      const [a, b] = (window as any).clients.map((client: any) => client.breadcrumb.getStack().find((entry: any) => entry.type === kind).data)
      return { sameRequest: a.request === b.request, sameResponse: a.response === b.response, traces: [a.request.traceId, b.request.traceId], statuses: [a.response.status, b.response.status] }
    }, kind)
    expect(collected).toEqual({ sameRequest: false, sameResponse: false, traces: [trace, trace], statuses: [200, 200] })
  }
})
