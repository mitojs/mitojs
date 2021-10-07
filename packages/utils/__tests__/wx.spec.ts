import { BREADCRUMBCATEGORYS, ErrorTypes, WxBreadcrumbTypes } from '@mitojs/shared'
import { getBreadcrumbCategoryInWx, parseErrorString } from '../src/wx'

describe('wx.ts', () => {
  it('should parseErrorString func work', () => {
    const wxErrorString = `MiniProgramError
this.hah is not a function
TypeError: this.hah is not a function
    at ge.clickJsBtn (http://127.0.0.1:18351/appservice/pages/sdk/sdk.js:27:10)
    at http://127.0.0.1:18351/appservice/__dev__/WAService.js:2:3233753
    at a (http://127.0.0.1:18351/appservice/__dev__/WAService.js:2:3160801)`
    const { message, name, stack } = parseErrorString(wxErrorString)
    expect(message).toBe('this.hah is not a function')
    expect(name).toBe('TypeError')
    const expectStack = [
      {
        args: [],
        column: 10,
        line: 27,
        func: 'ge.clickJsBtn',
        url: 'http://127.0.0.1:18351/appservice/pages/sdk/sdk.js'
      },
      {
        args: [],
        column: 3233753,
        line: 2,
        func: ErrorTypes.UNKNOWN_FUNCTION,
        url: 'http://127.0.0.1:18351/appservice/__dev__/WAService.js'
      },
      {
        args: [],
        column: 3160801,
        line: 2,
        func: 'a',
        url: 'http://127.0.0.1:18351/appservice/__dev__/WAService.js'
      }
    ]
    expect(stack).toEqual(expectStack)
  })
  it('should getBreadcrumbCategoryInWx func work', () => {
    expect(BREADCRUMBCATEGORYS.HTTP).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.XHR))
    expect(BREADCRUMBCATEGORYS.USER).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.ROUTE))
    expect(BREADCRUMBCATEGORYS.USER).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.TAP))
    expect(BREADCRUMBCATEGORYS.USER).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.ROUTE))
    expect(BREADCRUMBCATEGORYS.USER).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.TOUCHMOVE))
    expect(BREADCRUMBCATEGORYS.DEBUG).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.CONSOLE))
    expect(BREADCRUMBCATEGORYS.DEBUG).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.CUSTOMER))
    expect(BREADCRUMBCATEGORYS.LIFECYCLE).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.APP_ON_LAUNCH))
    expect(BREADCRUMBCATEGORYS.LIFECYCLE).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.APP_ON_SHOW))
    expect(BREADCRUMBCATEGORYS.LIFECYCLE).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.APP_ON_HIDE))
    expect(BREADCRUMBCATEGORYS.LIFECYCLE).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.PAGE_ON_LOAD))
    expect(BREADCRUMBCATEGORYS.LIFECYCLE).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.PAGE_ON_SHOW))
    expect(BREADCRUMBCATEGORYS.LIFECYCLE).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.PAGE_ON_READY))
    expect(BREADCRUMBCATEGORYS.LIFECYCLE).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.PAGE_ON_HIDE))
    expect(BREADCRUMBCATEGORYS.LIFECYCLE).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.PAGE_ON_SHARE_APP_MESSAGE))
    expect(BREADCRUMBCATEGORYS.LIFECYCLE).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.PAGE_ON_SHARE_TIMELINE))
    expect(BREADCRUMBCATEGORYS.LIFECYCLE).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.PAGE_ON_TAB_ITEM_TAP))
    expect(BREADCRUMBCATEGORYS.EXCEPTION).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.UNHANDLEDREJECTION))
    expect(BREADCRUMBCATEGORYS.EXCEPTION).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.CODE_ERROR))
    expect(BREADCRUMBCATEGORYS.EXCEPTION).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.RESOURCE))
    expect(BREADCRUMBCATEGORYS.EXCEPTION).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.VUE))
    expect(BREADCRUMBCATEGORYS.EXCEPTION).toBe(getBreadcrumbCategoryInWx(WxBreadcrumbTypes.REACT))
  })
})
