import { BrowserBreadcrumbTypes } from '@mitojs/shared'
import { getBreadcrumbCategoryInBrowser, Severity, sleepRun } from '@mitojs/utils'
import { BrowserClient } from '../../browserClient'
import domPlugin, { DomCollectedType } from '../../plugins/dom'

describe('domPlugin', () => {
  const browserInstance = new BrowserClient({
    dsn: 'http://test.com/upload'
  })
  domPlugin.monitor = jest.fn(domPlugin.monitor)
  domPlugin.transform = jest.fn(domPlugin.transform)
  domPlugin.consumer = jest.fn(domPlugin.consumer)
  browserInstance.use([domPlugin])
  it("domPlugin's func should be called by browserClient", (done) => {
    expect((domPlugin.monitor as jest.Mock).mock.calls.length).toBe(1)
    // don't simulate dom click in node,so pass in param in domPlugin.transform
    // should test in e2e
    const mockHtmlElement = {
      activeElement: {
        tagName: 'BUTTON',
        classList: {
          value: 'btn-class btn-class-two'
        },
        id: 'btn-id',
        innerText: 'click me'
      }
    } as unknown as Document
    const mockDomCollect: DomCollectedType = {
      category: 'click',
      data: mockHtmlElement
    }
    const htmlString = domPlugin.transform.call(browserInstance, mockDomCollect)
    domPlugin.consumer.call(browserInstance, htmlString)
    sleepRun(() => {
      const breadcrumbStack = browserInstance.breadcrumb.getStack()
      const item = breadcrumbStack[0]
      expect(item.category).toBe(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.CLICK))
      expect(item.type).toBe(BrowserBreadcrumbTypes.CLICK)
      console.log('htmlString', htmlString)
      expect(item.data).toBe(htmlString)
      expect(item.level).toBe(Severity.Info)
      done()
    })
  })
})
