import { BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes, ErrorTypes } from '@mitojs/shared'
import { ReportDataType } from '@mitojs/types'
import { Severity, sleepRun } from '@mitojs/utils'
import { BrowserClient } from '../../browserClient'
import unhandlerejectionPlugin from '../../plugins/unhandlerejecttion'

describe('unhandlerejectionPlugin', () => {
  const browserInstance = new BrowserClient({
    dsn: 'http://test.com/upload'
  })
  unhandlerejectionPlugin.monitor = jest.fn(unhandlerejectionPlugin.monitor)
  unhandlerejectionPlugin.transform = jest.fn(unhandlerejectionPlugin.transform)
  unhandlerejectionPlugin.consumer = jest.fn(unhandlerejectionPlugin.consumer)
  browserInstance.use([unhandlerejectionPlugin])
  it("unhandlerejectionPlugin's func should be called by browserClient", () => {
    expect((unhandlerejectionPlugin.monitor as jest.Mock).mock.calls.length).toBe(1)
    // don't simulate code error in node,so pass in param in errorPlugin.transform
    // should test in e2e
  })
  it('mock promise reject data to test unhandlerejectionPlugin.transform and unhandlerejectionPlugin.consumer', (done) => {
    const reason = 'promise reject reason'
    const type = 'unhandledrejection'
    const mockPromiseRejectData: Partial<PromiseRejectionEvent> = {
      reason,
      type
    }
    const transformedData = unhandlerejectionPlugin.transform.call(browserInstance, mockPromiseRejectData)
    unhandlerejectionPlugin.consumer.call(browserInstance, transformedData)
    sleepRun(() => {
      const breadcrumbStack = browserInstance.breadcrumb.getStack()
      const item = breadcrumbStack.pop()
      expect(item.category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
      expect(item.type).toBe(BrowserBreadcrumbTypes.UNHANDLEDREJECTION)
      expect(item.level).toBe(Severity.Error)
      expect((item.data as ReportDataType).message).toBe(reason)
      expect((item.data as ReportDataType).name).toBe(type)
      expect((item.data as ReportDataType).level).toBe(Severity.Low)
      done()
    })
  })
})
