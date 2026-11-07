import { vi, type Mock } from 'vitest'
import { Headers, Request, Response } from 'node-fetch'
import { BrowserClient } from '../../browserClient'
import fetchPlugin from '../../plugins/fetch'
import { _global } from '@mitojs/utils'

describe('fetch compatibility', () => {
  const originalFetch = _global.fetch
  const originalHeaders = global.Headers
  const response = () => new Response('response')
  let nativeFetch: Mock
  beforeEach(() => {
    global.Headers = Headers as any
    nativeFetch = vi.fn().mockImplementation(() => Promise.resolve(response()))
    _global.fetch = nativeFetch
  })
  afterEach(() => {
    _global.fetch = originalFetch
    global.Headers = originalHeaders
  })
  function install(options = {}) {
    const client = new BrowserClient(options)
    const notify = vi.fn()
    fetchPlugin.monitor.call(client, notify)
    return notify
  }

  it('preserves Request headers, method and body without consuming the body early', async () => {
    const request = new Request('https://example.com/resource', { method: 'POST', body: 'request body', headers: { 'X-App': 'yes' } })
    nativeFetch.mockImplementation((input, config) => {
      expect(input).toBe(request)
      expect(request.bodyUsed).toBe(false)
      expect(config.headers.get('X-App')).toBe('yes')
      return new Request(input, config).text().then((body) => new Response(body))
    })
    const notify = install()
    const result = await _global.fetch(request as any)
    expect(await result.text()).toBe('request body')
    await Promise.resolve()
    expect(notify.mock.calls[0][1].request).toMatchObject({ url: request.url, method: 'POST' })
    expect(nativeFetch).toHaveBeenCalledTimes(1)
  })

  it('honors init overrides without mutating the Request or init', async () => {
    const request = new Request('https://example.com/resource', { method: 'POST', body: 'old', headers: { 'X-Old': 'yes' } })
    const config = Object.freeze({ method: 'PUT', body: 'new', headers: Object.freeze({ 'X-New': 'yes' }) })
    install()
    await _global.fetch(request as any, config)
    const actual = nativeFetch.mock.calls[0][1]
    expect(actual.method).toBe('PUT')
    expect(actual.body).toBe('new')
    expect(actual.headers.get('X-New')).toBe('yes')
    expect(actual.headers.has('X-Old')).toBe(false)
    expect(request.headers.get('X-Old')).toBe('yes')
    expect(request.bodyUsed).toBe(false)
    expect(config.headers).toEqual({ 'X-New': 'yes' })
  })

  it.each(['/ignored', '/upload'])('preserves rejection for filtered/self-reporting request %s', async (url) => {
    const error = new Error('original rejection')
    nativeFetch.mockRejectedValue(error)
    const notify = install({ dsn: '/upload', filterXhrUrlRegExp: /ignored/ })
    await expect(_global.fetch(url)).rejects.toBe(error)
    expect(notify).not.toHaveBeenCalled()
  })

  it('passes through filtered responses without cloning', async () => {
    const result = response()
    const clone = vi.spyOn(result, 'clone')
    nativeFetch.mockResolvedValue(result)
    const notify = install({ filterXhrUrlRegExp: /ignored/ })
    expect(await _global.fetch('/ignored')).toBe(result)
    expect(clone).not.toHaveBeenCalled()
    expect(notify).not.toHaveBeenCalled()
  })

  it.each(['clone', 'read'])('isolates response %s failures from the original response', async (failure) => {
    const result = response()
    vi.spyOn(result, 'clone').mockImplementation(() => {
      if (failure === 'clone') throw new Error('clone failed')
      return { text: () => Promise.reject(new Error('read failed')) } as any
    })
    nativeFetch.mockResolvedValue(result)
    const notify = install()
    expect(await _global.fetch('/resource')).toBe(result)
    expect(await result.text()).toBe('response')
    await Promise.resolve()
    expect(notify).toHaveBeenCalledTimes(1)
    expect(notify.mock.calls[0][1].response.status).toBe(200)
  })

  it.each(['before', 'after'])('preserves business wrappers installed %s the SDK', async (order) => {
    let calls = 0
    const wrap = () => {
      const previous = _global.fetch
      _global.fetch = function (...args) {
        calls++
        return previous.apply(this, args)
      }
    }
    if (order === 'before') wrap()
    const notify = install()
    if (order === 'after') wrap()
    const input = new URL('https://example.com/resource')
    const result = await _global.fetch(input)
    expect(await result.text()).toBe('response')
    await Promise.resolve()
    expect(calls).toBe(1)
    expect(nativeFetch).toHaveBeenCalledTimes(1)
    expect(nativeFetch.mock.calls[0][0]).toBe(input)
    expect(notify.mock.calls[0][1].request.url).toBe(input.href)
  })
})
