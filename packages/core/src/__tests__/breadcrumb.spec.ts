import { BrowserOptionsFieldsTypes } from '@mitojs/browser'
import { BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes } from '@mitojs/shared'
import { BreadcrumbPushData } from '@mitojs/types'
import { Severity } from '@mitojs/utils'
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
})
