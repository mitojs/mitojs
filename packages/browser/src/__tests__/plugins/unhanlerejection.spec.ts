import { vi, type Mock } from 'vitest'
import { BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes } from '@mitojs/shared'
import { ReportDataType } from '@mitojs/types'
import { Severity, sleepRun } from '@mitojs/utils'
import { BrowserClient } from '../../browserClient'
import unhandlerejectionPlugin from '../../plugins/unhandledrejection'

describe('unhandlerejectionPlugin', () => {
  const browserInstance = new BrowserClient({
    dsn: 'http://test.com/upload'
  })
  unhandlerejectionPlugin.monitor = vi.fn(unhandlerejectionPlugin.monitor)
  unhandlerejectionPlugin.transform = vi.fn(unhandlerejectionPlugin.transform)
  unhandlerejectionPlugin.consumer = vi.fn(unhandlerejectionPlugin.consumer)
  browserInstance.use([unhandlerejectionPlugin])
  it("unhandlerejectionPlugin's func should be called by browserClient", () => {
    expect((unhandlerejectionPlugin.monitor as Mock).mock.calls.length).toBe(1)
    // don't simulate code error in node,so pass in param in errorPlugin.transform
    // should test in e2e
  })
  it('mock promise reject data to test unhandlerejectionPlugin.transform and unhandlerejectionPlugin.consumer', () => new Promise<void>((done) => {
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
  }))
})
