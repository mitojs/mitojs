import { BrowserBreadcrumbTypes } from '@mitojs/shared'
import { getBreadcrumbCategoryInBrowser, Severity, sleepRun } from '@mitojs/utils'
import { BrowserClient } from '../browserClient'
import { dsnConfig } from './config'

describe('browserClient.ts', () => {
  const browserClient = new BrowserClient({
    dsn: dsnConfig
  })
  it('browserClient log should work', () => {
    const msg = 'log spec msg'
    const tag = 'log spec tag'
    const level = Severity.High
    browserClient.log({
      message: msg,
      tag,
      level
    })
    sleepRun(() => {
      const stack = browserClient.breadcrumb.getStack()
      const item = stack[0]
      expect(item.category).toBe(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.CUSTOMER))
      expect(item.type).toBe(BrowserBreadcrumbTypes.CUSTOMER)
      expect(item.level).toBe(level)
      expect(item.data).toBe(msg)
    })
  })
})
