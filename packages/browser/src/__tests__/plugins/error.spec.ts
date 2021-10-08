import { BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes, ErrorTypes } from '@mitojs/shared'
import { ReportDataType } from '@mitojs/types'
import { Severity, sleepRun } from '@mitojs/utils'
import { BrowserClient } from '../../browserClient'
import errorPlugin from '../../plugins/error'

describe('errorPlugin', () => {
  const browserInstance = new BrowserClient({
    dsn: 'http://test.com/upload'
  })
  errorPlugin.monitor = jest.fn(errorPlugin.monitor)
  errorPlugin.transform = jest.fn(errorPlugin.transform)
  errorPlugin.consumer = jest.fn(errorPlugin.consumer)
  browserInstance.use([errorPlugin])
  it("errorPlugin's func should be called by browserClient", () => {
    expect((errorPlugin.monitor as jest.Mock).mock.calls.length).toBe(1)
    // don't simulate code error in node,so pass in param in errorPlugin.transform
    // should test in e2e
  })
  it('mock code error data to test errorPlugin.transform and errorPlugin.consumer', (done) => {
    const message = 'Uncaught TypeError: a.split is not a function'
    const name = 'TypeError'
    const error = new Error(message)
    error.name = name
    error.stack = `TypeError: a.split is not a function
    at codeError (http://localhost:2021/JS/index.html:27:11)
    at HTMLButtonElement.onclick (http://localhost:2021/JS/index.html:13:48)`
    const mockCodeErrorData = {
      colno: 11,
      filename: 'http://localhost:2021/JS/index.html',
      lineno: 27,
      message,
      error,
      target: {}
    }
    const transformedData = errorPlugin.transform.call(browserInstance, mockCodeErrorData)
    errorPlugin.consumer.call(browserInstance, transformedData)
    sleepRun(() => {
      const breadcrumbStack = browserInstance.breadcrumb.getStack()
      const item = breadcrumbStack.pop()
      expect(item.category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
      expect(item.type).toBe(BrowserBreadcrumbTypes.CODE_ERROR)
      expect(item.level).toBe(Severity.Error)
      expect((item.data as ReportDataType).stack.length).toBe(2)
      expect((item.data as ReportDataType).name).toBe(error.name)
      expect((item.data as ReportDataType).message).toBe(error.message)
      expect((item.data as ReportDataType).type).toBe(ErrorTypes.JAVASCRIPT)
      expect((item.data as ReportDataType).level).toBe(Severity.Normal)
      done()
    })
  })

  it('mock resource load error data to test errorPlugin.transform and errorPlugin.consumer', (done) => {
    const src = 'https://files.catbox.moe/g1xhnsssh.jpg'
    const mockResourceErrorData = {
      target: {
        localName: 'img',
        src
      } as unknown as HTMLElement
    }
    const transformedData = errorPlugin.transform.call(browserInstance, mockResourceErrorData)
    errorPlugin.consumer.call(browserInstance, transformedData)
    sleepRun(() => {
      const breadcrumbStack = browserInstance.breadcrumb.getStack()
      const item = breadcrumbStack.pop()
      expect(item.category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
      expect(item.type).toBe(BrowserBreadcrumbTypes.RESOURCE)
      expect(item.level).toBe(Severity.Error)
      expect((item.data as ReportDataType).message).toBe(`资源地址: ${src}`)
      expect((item.data as ReportDataType).name).toBe('图片加载失败')
      expect((item.data as ReportDataType).level).toBe(Severity.Low)
      done()
    })
  })
})
