import { vi, type Mock } from 'vitest'
import { BrowserClient } from '../../../browser/src/browserClient'
import domPlugin from '../../../browser/src/plugins/dom'
import { BasePluginType } from '@mitojs/types'
import { BrowserEventTypes } from '@mitojs/shared'

describe('plugin installation', () => {
  it('installs the same object once, even across repeated use calls', () => {
    const client = new BrowserClient()
    const plugin: BasePluginType = { name: BrowserEventTypes.DOM, monitor: vi.fn() }
    client.use([plugin, plugin])
    client.use([plugin])
    expect(plugin.monitor).toHaveBeenCalledTimes(1)
  })

  it('subscribes before monitor emits synchronously', () => {
    const client = new BrowserClient()
    const consumer = vi.fn()
    client.use([
      {
        name: BrowserEventTypes.DOM,
        monitor(notify) {
          notify(BrowserEventTypes.DOM, 2)
        },
        transform(value) {
          return value + 1
        },
        consumer
      }
    ])
    expect(consumer).toHaveBeenCalledWith(3)
    expect(consumer.mock.instances[0]).toBe(client)
  })

  it('retains different plugin implementations subscribed to the same event', () => {
    const client = new BrowserClient()
    const first = vi.fn(),
      second = vi.fn()
    let emit: Function
    client.use([
      {
        name: BrowserEventTypes.DOM,
        monitor(notify) {
          emit = notify
        },
        transform(value) {
          return value
        },
        consumer: first
      },
      {
        name: BrowserEventTypes.DOM,
        monitor() {},
        transform(value) {
          return value
        },
        consumer: second
      }
    ])
    emit(BrowserEventTypes.DOM, 'event')
    expect(first.mock.calls).toEqual([['event']])
    expect(second.mock.calls).toEqual([['event']])
  })

  it('permits retry after monitor throws and prevents reentrant installation', () => {
    const client = new BrowserClient()
    const plugin = { name: BrowserEventTypes.DOM, monitor: vi.fn() }
    plugin.monitor.mockImplementationOnce(() => {
      throw new Error('setup failed')
    })
    expect(() => client.use([plugin])).toThrow('setup failed')
    plugin.monitor.mockImplementation(() => client.use([plugin]))
    client.use([plugin])
    expect(plugin.monitor).toHaveBeenCalledTimes(2)
  })

  it('installs independently per instance and permits a previously silent plugin', () => {
    const plugin = { name: BrowserEventTypes.DOM, monitor: vi.fn() }
    const first = new BrowserClient({ silentDom: true })
    first.use([plugin])
    expect(plugin.monitor).not.toHaveBeenCalled()
    first.options.silentDom = false
    first.use([plugin])
    new BrowserClient().use([plugin])
    expect(plugin.monitor).toHaveBeenCalledTimes(2)
  })

  it('records one breadcrumb for one click after duplicate use', async () => {
    const client = new BrowserClient()
    client.use([domPlugin, domPlugin])
    client.use([domPlugin])
    const button = document.createElement('button')
    button.innerText = 'click'
    document.body.appendChild(button)
    try {
      button.focus()
      button.click()
      await new Promise((resolve) => setTimeout(resolve, 10))
      expect(client.breadcrumb.getStack()).toHaveLength(1)
    } finally {
      button.remove()
    }
  })
})
