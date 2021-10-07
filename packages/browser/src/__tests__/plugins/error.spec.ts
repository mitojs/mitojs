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
})
