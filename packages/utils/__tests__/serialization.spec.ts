import { vi, type Mock } from 'vitest'
import { safeStringify, unknownToString } from '../src'
import { BrowserClient } from '../../browser/src/browserClient'
import { WxClient } from '../../wx-mini/src/wxClient'

describe('safe serialization', () => {
  it('preserves shared objects, arrays, nulls and repeated primitives', () => {
    const shared = { value: 1 }
    const input = { first: shared, second: shared, array: [shared, shared], nulls: [null, null], strings: ['x', 'x'] }
    expect(safeStringify(input)).toBe(JSON.stringify(input))
    expect(input.first).toBe(input.second)
  })

  it('marks only ancestor cycles without mutating the input', () => {
    const shared: any = { value: 1 }
    shared.self = shared
    const input = { first: shared, second: shared }
    expect(JSON.parse(safeStringify(input))).toEqual({
      first: { value: 1, self: 'Circular' },
      second: { value: 1, self: 'Circular' }
    })
    expect(shared.self).toBe(shared)
    const array: any[] = []
    array.push(array)
    expect(safeStringify(array)).toBe('["Circular"]')
    expect(unknownToString(shared)).toBe('{"value":1,"self":"Circular"}')
  })

  it.each([BrowserClient, WxClient])('serializes circular logs and their breadcrumbs through %p', async (Client) => {
    const message: any = { value: 1 }
    message.self = message
    const client = new Client({ dsn: '/upload', apikey: Client.name })
    let uploaded: any
    const wxRequest = vi.fn((options) => {
      uploaded = JSON.parse(options.data)
    })
    const originalWx = (global as any).wx
    const originalPages = (global as any).getCurrentPages
    ;(global as any).wx = { request: wxRequest }
    ;(global as any).getCurrentPages = () => []
    const send = vi.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation(function (data) {
      uploaded = JSON.parse(data as string)
    })
    try {
      expect(() => client.log({ message })).not.toThrow()
      await Promise.resolve()
      expect(uploaded.data.message).toBe('{"value":1,"self":"Circular"}')
      expect(uploaded.breadcrumb[0].data).toEqual({ value: 1, self: 'Circular' })
      expect(message.self).toBe(message)
    } finally {
      send.mockRestore()
      ;(global as any).wx = originalWx
      ;(global as any).getCurrentPages = originalPages
    }
  })
})
