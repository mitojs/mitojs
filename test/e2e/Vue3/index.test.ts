import { BaseBreadcrumbTypes, BREADCRUMBCATEGORYS, ErrorTypes, SDK_NAME, SDK_VERSION } from '@mitojs/shared'
import { vue3Url } from '@/test/config'
import { TransportDataType, ReportDataType } from '@mitojs/types'
import { Severity } from '@mitojs/utils'
import puppeteer from 'puppeteer'
import { BrowserClient } from '@mitojs/browser'
import { ServerUrls } from '../../../examples/server/config'

describe('Vue3 e2e', () => {
  let page: puppeteer.Page
  beforeEach(async () => {
    const browser = (global as any).__BROWSER__ as puppeteer.Browser
    page = await browser.newPage()
    await page.goto(vue3Url)
  })
  afterEach(async () => {
    await page?.close()
  })

  it('vue code error', async () => {
    const [request] = await Promise.all([
      page.waitForRequest((request) => request.method() === 'POST' && new URL(request.url()).pathname === ServerUrls.errorsUpload),
      page.click('#vueCodeError')
    ])
    const stack = await page.evaluate(() => (window['_MITO_'] as BrowserClient).breadcrumb.getStack())
    expect(stack).toHaveLength(2)
    expect(stack[1]).toMatchObject({ category: BREADCRUMBCATEGORYS.EXCEPTION, type: BaseBreadcrumbTypes.VUE, level: Severity.Error })
    const { authInfo, data } = JSON.parse(request.postData()) as TransportDataType
    const report = data as ReportDataType
    expect(report).toMatchObject({
      type: ErrorTypes.VUE,
      level: Severity.Normal,
      name: 'TypeError',
      componentName: 'component <error-button>',
      propsData: { btnName: '点击:Vue3错误上报' }
    })
    expect(report.message).toMatch(
      /^Cannot set (?:property 'a' of undefined|properties of undefined \(setting 'a'\))\(native event handler\)$/
    )
    expect(report.stack).toBeDefined()
    expect(authInfo.sdkName).toBe(SDK_NAME)
    expect(authInfo.sdkVersion).toBe(SDK_VERSION)
  })
})
