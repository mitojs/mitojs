import { BrowserOptionsFieldsTypes } from '@mitojs/browser'
import { BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes } from '@mitojs/shared'
import { BreadcrumbPushData } from '@mitojs/types'
import { getBreadcrumbCategoryInBrowser, Severity } from '@mitojs/utils'
import { Breadcrumb } from '../breadcrumb'

const MaxBreadcrumbs = 16
describe('breadcrumb.ts', () => {
  const breadcrumb = new Breadcrumb<BrowserOptionsFieldsTypes>({
    maxBreadcrumbs: MaxBreadcrumbs
  })
  afterEach(() => {
    breadcrumb.clear()
  })

  const breadcrumbDemo: BreadcrumbPushData = {
    category: BREADCRUMBCATEGORYS.DEBUG,
    type: BrowserBreadcrumbTypes.CONSOLE,
    data: 'unit',
    level: Severity.Debug
  }

  it("should less than 16 of breadcrumb's max lenght", () => {
    new Array(20).fill('').forEach(() => breadcrumb.push(breadcrumbDemo))
    expect(breadcrumb.getStack().length === 16)
  })

  it('should work on beforePushBreadcrumb', () => {
    breadcrumb.bindOptions({
      beforePushBreadcrumb(breadcrumb, hint) {
        expect(hint).toEqual(breadcrumbDemo)
        if (hint.category === BREADCRUMBCATEGORYS.DEBUG) {
          return false
        }
        return hint
      }
    })
    breadcrumb.push(breadcrumbDemo)
    expect(breadcrumb.getStack().length).toBe(0)
    breadcrumbDemo.category = BREADCRUMBCATEGORYS.HTTP
    breadcrumb.push(breadcrumbDemo)
    expect(breadcrumb.getStack().length).toBe(1)
  })

  it('should work on getBreadcrumbCategoryInBrowser ', () => {
    expect(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.XHR)).toBe(BREADCRUMBCATEGORYS.HTTP)
    expect(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.FETCH)).toBe(BREADCRUMBCATEGORYS.HTTP)
    expect(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.CLICK)).toBe(BREADCRUMBCATEGORYS.USER)
    expect(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.ROUTE)).toBe(BREADCRUMBCATEGORYS.USER)
    expect(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.CUSTOMER)).toBe(BREADCRUMBCATEGORYS.DEBUG)
    expect(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.CUSTOMER)).toBe(BREADCRUMBCATEGORYS.DEBUG)
    expect(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.UNHANDLEDREJECTION)).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
    expect(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.CODE_ERROR)).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
    expect(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.UNHANDLEDREJECTION)).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
    expect(getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.RESOURCE)).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
  })
})
