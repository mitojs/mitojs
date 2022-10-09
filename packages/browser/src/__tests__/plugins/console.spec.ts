import { BrowserClient } from '@mitojs/browser'
import { BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes } from '@mitojs/shared'
import { ConsoleCollectType } from '@mitojs/types'
import { Severity } from '@mitojs/utils'
import consolePlugin from '../../plugins/console'
describe('consolePlugin', () => {
  const browserInstance = new BrowserClient({
    dsn: 'http://test.com/upload'
  })
  consolePlugin.monitor = jest.fn(consolePlugin.monitor)
  consolePlugin.transform = jest.fn(consolePlugin.transform)
  consolePlugin.consumer = jest.fn(consolePlugin.consumer)
  browserInstance.use([consolePlugin])
  it("console's func should be called by browserClient", () => {
    const consoleLogMsg = 'this is console.log will be collected'
    console.log(consoleLogMsg)
    expect((consolePlugin.monitor as jest.Mock).mock.calls.length).toBe(1)
    expect((consolePlugin.transform as jest.Mock).mock.calls.length).toBe(1)
    expect((consolePlugin.consumer as jest.Mock).mock.calls.length).toBe(1)
    const stack = browserInstance.breadcrumb.getStack()
    expect(stack.length).toBe(1)
    expect(stack[0].category).toBe(BREADCRUMBCATEGORYS.DEBUG)
    expect(stack[0].type).toBe(BrowserBreadcrumbTypes.CONSOLE)
    expect(stack[0].level).toBe(Severity.Info)
    expect((stack[0].data as ConsoleCollectType).args[0]).toBe(consoleLogMsg)
    expect((stack[0].data as ConsoleCollectType).level).toBe('log')
    // collect console.error
    const consoleErrorMsg = 'this is console.error will be collected'
    console.error(consoleErrorMsg)
    expect((consolePlugin.transform as jest.Mock).mock.calls.length).toBe(2)
    expect((consolePlugin.consumer as jest.Mock).mock.calls.length).toBe(2)
    expect(stack.length).toBe(2)
    expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.DEBUG)
    expect(stack[1].type).toBe(BrowserBreadcrumbTypes.CONSOLE)
    expect(stack[1].level).toBe(Severity.Error)
    expect((stack[1].data as ConsoleCollectType).args[0]).toBe(consoleErrorMsg)
    expect((stack[1].data as ConsoleCollectType).level).toBe('error')
  })
})
