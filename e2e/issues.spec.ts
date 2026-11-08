import { test, expect } from '@playwright/test'
import { createServer, type Server } from 'node:http'
import type { AddressInfo } from 'node:net'

// Load the packed CDN bundle without initializing the example's own client.
test.beforeEach(async ({ page }) => {
  await page.goto('/fixtures/issues.html')
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

test('#26: one native click produces one breadcrumb for one initialized client', async ({ page }) => {
  await page.evaluate(() => { (window as any).client = (window as any).MITO.init({ silentConsole: true }) })
  await page.getByRole('button', { name: 'Record action' }).click()
  expect(await page.evaluate(() => (window as any).client.breadcrumb.getStack().filter((entry: any) => entry.type === 'UI.Click'))).toHaveLength(1)
})

test('#42: repeated use installs a custom DOM listener once and captures startup events', async ({ page }) => {
  await page.evaluate(() => {
    const events: string[] = []
    ;(window as any).events = events
    const client = new (window as any).MITO.BrowserClient()
    const plugin = {
      name: 'dom',
      monitor(notify: Function) {
        notify('dom', 'started')
        document.addEventListener('click', () => notify('dom', 'clicked'))
      },
      transform: (event: string) => event,
      consumer: (event: string) => events.push(event)
    }
    client.use([plugin, plugin])
    client.use([plugin])
  })
  await page.getByRole('button', { name: 'Record action' }).click()
  expect(await page.evaluate(() => (window as any).events)).toEqual(['started', 'clicked'])
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
