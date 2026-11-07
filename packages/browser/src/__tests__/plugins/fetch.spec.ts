import { vi } from 'vitest'
import { Response } from 'node-fetch'
import { BrowserBreadcrumbTypes, BrowserEventTypes, BREADCRUMBCATEGORYS } from '@mitojs/shared'
import { BrowserClient } from '../../browserClient'
import fetchPlugin from '../../plugins/fetch'

describe('fetchPlugin', () => {
  it('installs the monitor and collects a successful response without external network access', async () => {
    const response = new Response('OK', { status: 200 })
    const nativeFetch = vi.fn(() => Promise.resolve(response))
    ;(window as any).fetch = nativeFetch
    const monitor = vi.spyOn(fetchPlugin, 'monitor')
    const transform = vi.spyOn(fetchPlugin, 'transform')
    const consumer = vi.spyOn(fetchPlugin, 'consumer')
    const client = new BrowserClient({ dsn: 'http://localhost/upload' })
    client.use([fetchPlugin])
    expect(fetchPlugin.name).toBe(BrowserEventTypes.FETCH)
    expect(monitor).toHaveBeenCalledTimes(1)
    expect(await window.fetch('/normal')).toBe(response)
    await vi.waitFor(() => expect(consumer).toHaveBeenCalledTimes(1))
    expect(nativeFetch).toHaveBeenCalledTimes(1)
    expect(transform).toHaveBeenCalledTimes(1)
    expect(client.breadcrumb.getStack()).toHaveLength(1)
    expect(client.breadcrumb.getStack()[0]).toMatchObject({ type: BrowserBreadcrumbTypes.FETCH, category: BREADCRUMBCATEGORYS.HTTP })
  })
})
