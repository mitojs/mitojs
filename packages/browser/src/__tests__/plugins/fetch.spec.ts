import { BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes, BrowserEventTypes } from '@mitojs/shared'
import { getBreadcrumbCategoryInBrowser } from '@mitojs/utils'
import { BrowserClient } from '../../browserClient'
import fetchPlugin from '../../plugins/fetch'
import fetch from 'node-fetch'

describe('fetchPlugin', () => {
  // eslint-disable-next-line @typescript-eslint/no-extra-semi
  ;(window as any).fetch = fetch
  fetchPlugin.monitor = jest.fn(fetchPlugin.monitor)
  fetchPlugin.transform = jest.fn(fetchPlugin.transform)
  fetchPlugin.consumer = jest.fn(fetchPlugin.consumer)
  const browserInstance = new BrowserClient({
    dsn: 'http://test.com/upload'
  })
  browserInstance.use([fetchPlugin])
  it("fetchPlugin's func should be called by browserClient", (done) => {
    expect(fetchPlugin.name).toBe(BrowserEventTypes.FETCH)
    expect((fetchPlugin.monitor as jest.Mock).mock.calls.length).toBe(1)
    // jest is run in node, so fetch is undefined
    window
      .fetch('https://www.baidu.com')
      .then(() => {
        setTimeout(() => {
          // not work in travis
          // expect((fetchPlugin.transform as jest.Mock).mock.calls.length).toBe(1)
          // expect((fetchPlugin.consumer as jest.Mock).mock.calls.length).toBe(1)
          // const stack = browserInstance.breadcrumb.getStack()
          // expect(stack[0].category).toBe(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.FETCH))
          // expect(stack.length).toBe(1)
          done()
        }, 2000)
      })
      .catch(() => {
        setTimeout(() => {
          expect((fetchPlugin.transform as jest.Mock).mock.calls.length).toBe(1)
          expect((fetchPlugin.consumer as jest.Mock).mock.calls.length).toBe(1)
          const stack = browserInstance.breadcrumb.getStack()
          expect(stack[0].category).toBe(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.FETCH))
          expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
          expect(stack.length).toBe(2)
          done()
        }, 2000)
      })
  })
})
