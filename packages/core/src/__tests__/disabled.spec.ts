import { BrowserClient } from '../../../browser/src/browserClient'
import { WxClient } from '../../../wx-mini/src/wxClient'
import { BaseOptions } from '../baseOptions'
import { ErrorTypes } from '@mitojs/shared'

describe('disabled clients', () => {
  it.each([BrowserClient, WxClient])('retains disabled and skips monitors, breadcrumbs and reports for %p', async (Client) => {
    const client = new Client({ disabled: true, dsn: '/upload' })
    const monitor = jest.fn()
    const breadcrumb = jest.spyOn(client.breadcrumb, 'push')
    const send = jest.spyOn(client.transport, 'sendToServer').mockImplementation(() => {})
    const beforeReport = jest.fn()
    client.transport.beforeDataReport = beforeReport
    client.use([{ name: 'disabled-test' as any, monitor }])
    // A circular log would fail before the disabled check if it were processed.
    const message: any = {}
    message.self = message
    client.log({ message })
    await client.transport.send({ type: ErrorTypes.LOG, customTag: 'disabled' })
    if (client instanceof WxClient) client.trackSend({} as any)
    await Promise.resolve()
    expect(client.getOptions().disabled).toBe(true)
    expect(monitor).not.toHaveBeenCalled()
    expect(breadcrumb).not.toHaveBeenCalled()
    expect(beforeReport).not.toHaveBeenCalled()
    expect(send).not.toHaveBeenCalled()
  })

  it('does not suppress an enabled instance beside a disabled instance', () => {
    const disabled = new BrowserClient({ disabled: true })
    const enabled = new BrowserClient({ disabled: false })
    const monitor = jest.fn()
    const plugin = { name: 'enabled-test' as any, monitor }
    disabled.use([plugin])
    enabled.use([plugin])
    expect(monitor).toHaveBeenCalledTimes(1)
    const transport = jest.spyOn(enabled.transport, 'send').mockResolvedValue()
    enabled.log({ message: 'enabled' })
    expect(enabled.breadcrumb.getStack()).toHaveLength(1)
    expect(transport).toHaveBeenCalledTimes(1)
  })

  it('defaults to enabled and validates the disabled option', () => {
    const options = new BaseOptions()
    expect(options.disabled).toBe(false)
    options.bindOptions({ disabled: 'true' as any })
    expect(options.disabled).toBe(false)
  })
})
