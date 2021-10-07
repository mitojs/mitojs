import { BrowserBreadcrumbTypes } from '@mitojs/shared'
import { getBreadcrumbCategoryInBrowser, Severity, sleepRun } from '@mitojs/utils'
import { BrowserClient } from '../browserClient'
import { dsnConfig } from './config'

describe('browserClient.ts', () => {
  const browserInstance = new BrowserClient({
    dsn: dsnConfig
  })
  it('browserClient log should work', (done) => {
    const msg = 'log spec msg'
    const tag = 'log spec tag'
    const level = Severity.High
    browserInstance.log({
      message: msg,
      tag,
      level
    })
    sleepRun(() => {
      const stack = browserInstance.breadcrumb.getStack()
      const item = stack[0]
      expect(item.category).toBe(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.CUSTOMER))
      expect(item.type).toBe(BrowserBreadcrumbTypes.CUSTOMER)
      expect(item.level).toBe(Severity.fromString(level))
      expect(item.data).toBe(msg)
      done()
    })
  })
})
