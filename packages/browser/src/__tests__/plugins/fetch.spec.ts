import { BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes, BrowserEventTypes, HttpTypes, MethodTypes } from '@mitojs/shared'
import { HttpCollectedType } from '@mitojs/types'
import { getBreadcrumbCategoryInBrowser, getTimestamp, Severity } from '@mitojs/utils'
import { BrowserClient } from '../../browserClient'
import fetchPlugin from '../../plugins/fetch'
import fetch from 'node-fetch'

describe('fetchPlugin', () => {
  ;(window as any).fetch = fetch
  fetchPlugin.monitor = jest.fn(fetchPlugin.monitor)
  fetchPlugin.transform = jest.fn(fetchPlugin.transform)
  fetchPlugin.consumer = jest.fn(fetchPlugin.consumer)
  const mockData: HttpCollectedType = {
    request: {
      httpType: HttpTypes.XHR,
      method: MethodTypes.Post,
      url: 'http://localhost',
      data: {
        test: 1
      }
    },
    response: {
      status: 200,
      data: 'ok'
    },
    elapsedTime: 800
  }
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
      .then((res) => {
        setTimeout(() => {
          expect((fetchPlugin.transform as jest.Mock).mock.calls.length).toBe(1)
          expect((fetchPlugin.consumer as jest.Mock).mock.calls.length).toBe(1)
          const stack = browserInstance.breadcrumb.getStack()
          expect(stack[0].category).toBe(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.FETCH))
          expect(stack.length).toBe(1)
          done()
        }, 100)
      })
      .catch((err) => {
        setTimeout(() => {
          expect((fetchPlugin.transform as jest.Mock).mock.calls.length).toBe(1)
          expect((fetchPlugin.consumer as jest.Mock).mock.calls.length).toBe(1)
          const stack = browserInstance.breadcrumb.getStack()
          expect(stack[0].category).toBe(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.FETCH))
          expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
          expect(stack.length).toBe(2)
          done()
        }, 100)
      })
  })
})
