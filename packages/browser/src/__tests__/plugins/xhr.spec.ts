import { BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes, BrowserEventTypes, HttpTypes, MethodTypes } from '@mitojs/shared'
import { HttpCollectedType } from '@mitojs/types'
import { getBreadcrumbCategoryInBrowser, Severity } from '@mitojs/utils'
import { BrowserClient } from '../../browserClient'
import xhrPlugin, { httpTransform, httpTransformedDataConsumer } from '../../plugins/xhr'

describe('xhrPlugin', () => {
  xhrPlugin.monitor = jest.fn(xhrPlugin.monitor)
  xhrPlugin.transform = jest.fn(xhrPlugin.transform)
  xhrPlugin.consumer = jest.fn(xhrPlugin.consumer)
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
  browserInstance.use([xhrPlugin])
  it("xhrPlugin's func should be called by browserClient", (done) => {
    expect(xhrPlugin.name).toBe(BrowserEventTypes.XHR)
    expect((xhrPlugin.monitor as jest.Mock).mock.calls.length).toBe(1)

    const xhr = new XMLHttpRequest()
    xhr.open('get', '/normal')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        setTimeout(() => {
          expect((xhrPlugin.transform as jest.Mock).mock.calls.length).toBe(1)
          expect((xhrPlugin.consumer as jest.Mock).mock.calls.length).toBe(1)
          const stack = browserInstance.breadcrumb.getStack()
          expect(stack[0].category).toBe(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.FETCH))
          expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
          expect(stack.length).toBe(2)
          done()
        }, 100)
      }
    }
  })

  it('should httpTransform func work', () => {
    const result = httpTransform(mockData)
    expect(result.level).toBe(Severity.Low)
    expect(result.message).toBe('ok')
  })

  it('should httpTransformedDataConsumer func work', () => {
    browserInstance.breadcrumb.clear()
    const result = httpTransform(mockData)
    httpTransformedDataConsumer.call(browserInstance, result)
    const stack = browserInstance.breadcrumb.getStack()
    expect(stack.length).toBe(1)
    expect(stack[0].category).toBe(BREADCRUMBCATEGORYS.HTTP)
  })
})
