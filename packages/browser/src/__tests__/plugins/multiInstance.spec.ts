import { Headers, Response } from 'node-fetch'
import { BrowserClient } from '../../browserClient'
import xhrPlugin from '../../plugins/xhr'
import fetchPlugin from '../../plugins/fetch'
import { _global } from '@mitojs/utils'

class FakeXHR {
  private listeners: Record<string, Function[]> = {}
  addEventListener(name: string, handler: Function) {
    const listeners = this.listeners[name] || (this.listeners[name] = [])
    listeners.push(handler)
  }
  removeEventListener(name: string, handler: Function) {
    this.listeners[name] = (this.listeners[name] || []).filter((fn) => fn !== handler)
  }
  status = 0
  responseType = 'text'
  response = ''
  headers: Record<string, string[]> = {}
  sends = 0
  open() {
    this.headers = {}
  }
  send() {
    this.sends++
  }
  setRequestHeader(name: string, value: string) {
    const key = name.toLowerCase()
    ;(this.headers[key] || (this.headers[key] = [])).push(value)
  }
  finish(status = 200, body = 'OK') {
    this.status = status
    this.response = body
    ;(this.listeners.loadend || []).slice().forEach((fn) => fn.call(this))
  }
}

describe('multiple request monitors', () => {
  const OriginalXHR = global.XMLHttpRequest
  const originalFetch = _global.fetch
  const originalHeaders = global.Headers
  beforeEach(() => {
    // A fresh prototype prevents instrumentation leaking into another test.
    class TestXHR extends FakeXHR {}
    global.XMLHttpRequest = TestXHR as any
    ;(global as any).Headers = Headers
  })
  afterEach(() => {
    global.XMLHttpRequest = OriginalXHR
    _global.fetch = originalFetch
    global.Headers = originalHeaders
  })
  function monitor(plugin, fieldA = 'Trace-Id', fieldB = 'Trace-Id') {
    const a = new BrowserClient({ apikey: 'a', enableTraceId: true, traceIdFieldName: fieldA })
    const b = new BrowserClient({ apikey: 'b', enableTraceId: true, traceIdFieldName: fieldB })
    const notifyA = jest.fn(),
      notifyB = jest.fn()
    plugin.monitor.call(a, notifyA)
    plugin.monitor.call(b, notifyB)
    return { notifyA, notifyB }
  }
  function xhr() {
    return new XMLHttpRequest() as unknown as FakeXHR & { open(method: string, url: string): void }
  }

  it('isolates XHR data and writes a case-insensitive trace header once', () => {
    const { notifyA, notifyB } = monitor(xhrPlugin, 'Trace-Id', 'trace-id')
    const request = xhr()
    request.open('GET', '/resource')
    request.send()
    request.finish()
    const a = notifyA.mock.calls[0][1],
      b = notifyB.mock.calls[0][1]
    expect(a).not.toBe(b)
    expect(a.request).not.toBe(b.request)
    expect(a.response).not.toBe(b.response)
    expect(request.headers['trace-id']).toHaveLength(1)
    expect(a.request.traceId).toBe(request.headers['trace-id'][0])
    expect(b.request.traceId).toBe(a.request.traceId)
    expect(request.sends).toBe(1)
  })

  it('keeps differently named trace fields independent', () => {
    const { notifyA, notifyB } = monitor(xhrPlugin, 'Trace-A', 'Trace-B')
    const request = xhr()
    request.open('GET', '/resource')
    request.send()
    request.finish()
    expect(notifyA.mock.calls[0][1].request.traceId).toBe(request.headers['trace-a'][0])
    expect(notifyB.mock.calls[0][1].request.traceId).toBe(request.headers['trace-b'][0])
    expect(request.headers['trace-a']).toHaveLength(1)
    expect(request.headers['trace-b']).toHaveLength(1)
  })

  it('removes completed listeners and isolates reused and concurrent XHRs', () => {
    const { notifyA, notifyB } = monitor(xhrPlugin)
    const first = xhr(),
      second = xhr()
    first.open('GET', '/first')
    first.send()
    second.open('POST', '/second')
    second.send()
    second.finish(201, 'second')
    first.finish(200, 'first')
    const completed = notifyA.mock.calls[1][1]
    first.open('GET', '/reused')
    first.send()
    first.finish(202, 'reused')
    // A stray loadend cannot notify old callbacks again.
    first.finish()
    expect(notifyA).toHaveBeenCalledTimes(3)
    expect(notifyB).toHaveBeenCalledTimes(3)
    expect(completed.request.url).toBe('/first')
    expect(completed.response).toEqual({ status: 200, data: 'first' })
    expect(notifyA.mock.calls[2][1].response).toEqual({ status: 202, data: 'reused' })
  })

  it('passes through XHRs opened before monitor installation', () => {
    const request = xhr()
    request.open('GET', '/early')
    const { notifyA, notifyB } = monitor(xhrPlugin)
    expect(() => request.send()).not.toThrow()
    request.finish()
    expect(request.sends).toBe(1)
    expect(notifyA).not.toHaveBeenCalled()
    expect(notifyB).not.toHaveBeenCalled()
  })

  it.each([
    ['Trace-Id', 'trace-id'],
    ['Trace-A', 'Trace-B']
  ])('shares only matching fetch trace headers (%s, %s)', async (fieldA, fieldB) => {
    const native = jest.fn<Promise<Response>, any[]>(() => Promise.resolve(new Response('OK')))
    _global.fetch = native as any
    const { notifyA, notifyB } = monitor(fetchPlugin, fieldA, fieldB)
    const notifications = Promise.all([
      new Promise((resolve) => notifyA.mockImplementationOnce(resolve)),
      new Promise((resolve) => notifyB.mockImplementationOnce(resolve))
    ])
    await _global.fetch('/resource')
    await notifications
    const headers = native.mock.calls[0][1].headers
    const a = notifyA.mock.calls[0][1],
      b = notifyB.mock.calls[0][1]
    expect(a.request).not.toBe(b.request)
    expect(a.request.traceId).toBe(headers.get(fieldA))
    expect(b.request.traceId).toBe(headers.get(fieldB))
    if (fieldA.toLowerCase() === fieldB.toLowerCase()) expect(a.request.traceId).toBe(b.request.traceId)
    expect(native).toHaveBeenCalledTimes(1)
  })
})
