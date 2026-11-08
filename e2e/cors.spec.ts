import { test, expect } from '@playwright/test'
import { createServer, type Server } from 'node:http'
import type { AddressInfo } from 'node:net'

// Load the packed CDN bundle without initializing the example's own client.
test.beforeEach(async ({ page }) => {
  await page.route('**/initMito.js', (route) => route.fulfill({ contentType: 'application/javascript', body: '' }))
  await page.goto('/JS/index.html')
})

test.describe('#34: real cross-origin XHR reports', () => {
  let server: Server
  let receiver: string
  const posts: { path: string; origin: string; cookie: string; body: any }[] = []
  const preflights: string[] = []

  test.beforeAll(async () => {
    server = createServer(async (request, response) => {
      const credentialed = request.url === '/credentialed'
      response.setHeader('Access-Control-Allow-Origin', credentialed ? request.headers.origin ?? 'null' : '*')
      if (credentialed) response.setHeader('Access-Control-Allow-Credentials', 'true')
      response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      if (request.method === 'OPTIONS') {
        preflights.push(request.url)
        response.statusCode = 204
        return response.end()
      }
      let body = ''
      for await (const chunk of request) body += chunk
      posts.push({ path: request.url, origin: request.headers.origin, cookie: request.headers.cookie ?? '', body: JSON.parse(body) })
      response.end('{"ok":true}')
    })
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
    receiver = `http://localhost:${(server.address() as AddressInfo).port}`
  })
  test.afterAll(async () => { await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())) })
  test.beforeEach(() => { posts.length = 0; preflights.length = 0 })

  for (const anonymous of [false, true]) {
    test(`uploads with ${anonymous ? 'wildcard origin after disabling credentials' : 'explicit origin and default credentials'}`, async ({ page }) => {
      const path = anonymous ? '/anonymous' : '/credentialed'
      const dsn = receiver + path
      await page.context().addCookies([{ name: 'sdk-cors', value: 'present', url: receiver }])
      const delivered = page.waitForResponse((response) => response.url() === dsn && response.request().method() === 'POST')
      await page.evaluate(({ dsn, anonymous }) => {
        new (window as any).MITO.BrowserClient({
          dsn,
          configReportXhr(xhr: XMLHttpRequest) { if (anonymous) xhr.withCredentials = false }
        }).log({ message: 'cross-origin report' })
      }, { dsn, anonymous })
      const response = await delivered
      expect(response.status()).toBe(200)
      expect(await response.finished()).toBeNull()
      expect(preflights).toEqual([path])
      expect(posts).toHaveLength(1)
      expect(posts[0]).toMatchObject({ path, origin: new URL(page.url()).origin, cookie: anonymous ? '' : 'sdk-cors=present', body: { data: { message: 'cross-origin report' } } })
    })
  }

  test('rejects wildcard origin with default credentials before delivering a report', async ({ page }) => {
    const dsn = receiver + '/wildcard'
    const failed = page.waitForEvent('requestfailed', (request) => request.url() === dsn)
    await page.evaluate((dsn) => new (window as any).MITO.BrowserClient({ dsn }).log({ message: 'blocked report' }), dsn)
    expect((await failed).failure().errorText).toBe('net::ERR_FAILED')
    expect(preflights).toEqual(['/wildcard'])
    expect(posts).toEqual([])
  })
})
