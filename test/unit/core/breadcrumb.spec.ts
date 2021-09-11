import { Breadcrumb } from '@mitojs/core'
import { BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes } from '@mitojs/shared'
import { BreadcrumbPushData } from '@mitojs/types'
import { Severity } from '@mitojs/utils'

const maxBreadcrumbs = 16
describe('breadcrumb.ts', () => {
  const breadcrumb = new Breadcrumb({
    maxBreadcrumbs
  })
  // beforeAll(() => {
  //   breadcrumb.bindOptions({
  //     maxBreadcrumbs: 16
  //   })
  // })
  afterEach(() => {
    breadcrumb.clear()
  })

  const breadcrumbDemo: BreadcrumbPushData = {
    category: BREADCRUMBCATEGORYS.DEBUG,
    type: BrowserBreadcrumbTypes.CONSOLE,
    data: 'unit',
    level: Severity.Debug
  }

  it("should less than maxBreadcrumbs of breadcrumb's max lenght", () => {
    new Array(20).fill('').forEach(() => breadcrumb.push(breadcrumbDemo))
    expect(breadcrumb.getStack().length === maxBreadcrumbs)
  })

  it('should work on beforePushBreadcrumb', () => {
    const breadcrumb = new Breadcrumb({
      beforePushBreadcrumb(breadcrumb, hint) {
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
