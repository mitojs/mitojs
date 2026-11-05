import {
  BREADCRUMBCATEGORYS,
  BrowserBreadcrumbTypes,
  ErrorTypes,
  HttpTypes,
  MethodTypes,
  MitoLog,
  SDK_NAME,
  SDK_VERSION
} from '@mitojs/shared'
import puppeteer from 'puppeteer'
import { ReportDataType, TransportDataType } from '@mitojs/types'
import { SpanStatus, Severity } from '@mitojs/utils'
import { ServerUrls } from '../../../examples/server/config'
import { jsUrl } from '@/test/config'
import { BrowserClient } from '@mitojs/browser'

describe('Native JS e2e:', () => {
  let page: puppeteer.Page
  beforeEach(async () => {
    const browser = (global as any).__BROWSER__ as puppeteer.Browser
    page = await browser.newPage()
    await page.goto(jsUrl)
  })
  afterEach(async () => {
    await page?.close()
  })

  function getStack() {
    return page.evaluate(() => (window['_MITO_'] as BrowserClient).breadcrumb.getStack())
  }
  async function clickAndUpload(selector: string): Promise<ReportDataType> {
    const [request] = await Promise.all([
      page.waitForRequest((request) => request.method() === 'POST' && new URL(request.url()).pathname === ServerUrls.errorsUpload),
      page.click(selector)
    ])
    const { authInfo, data } = JSON.parse(request.postData()) as TransportDataType
    expect(authInfo.sdkName).toBe(SDK_NAME)
    expect(authInfo.sdkVersion).toBe(SDK_VERSION)
    return data as ReportDataType
  }

  it('Code Error btn click，breadcrumb stack should add two and upload this error', async () => {
    const data = await clickAndUpload('#codeErr')
    expect(data.type).toBe(ErrorTypes.JAVASCRIPT)
    expect(data.level).toBe(Severity.Normal)
    expect(Array.isArray(data.stack)).toBe(true)
    const stack = await getStack()
    expect(stack).toHaveLength(2)
    expect(stack[0]).toMatchObject({ type: BrowserBreadcrumbTypes.CLICK, category: BREADCRUMBCATEGORYS.USER, level: Severity.Info })
    expect(stack[1]).toMatchObject({
      type: BrowserBreadcrumbTypes.CODE_ERROR,
      category: BREADCRUMBCATEGORYS.EXCEPTION,
      level: Severity.Error
    })
  })

  it.each([
    ['#normalReq', ServerUrls.normalGet, MethodTypes.Get, HttpTypes.XHR, BrowserBreadcrumbTypes.XHR, 200],
    ['#exceptionReq', ServerUrls.exceptionGet, MethodTypes.Get, HttpTypes.XHR, BrowserBreadcrumbTypes.XHR, 500],
    ['#normalFetch', ServerUrls.normalPost, MethodTypes.Post, HttpTypes.FETCH, BrowserBreadcrumbTypes.FETCH, 200],
    ['#exceptionFetch', ServerUrls.exceptionPost, MethodTypes.Post, HttpTypes.FETCH, BrowserBreadcrumbTypes.FETCH, 500]
  ])('%s captures the intended request and its breadcrumbs', async (selector, url, method, httpType, type, status) => {
    const upload = status === 500 ? clickAndUpload(selector as string) : null
    if (status !== 500) {
      await Promise.all([
        page.waitForResponse((response) => new URL(response.url()).pathname === url && response.request().method() === method),
        page.click(selector as string)
      ])
    }
    if (status === 500) {
      const data = await upload
      expect(data).toMatchObject({ type: ErrorTypes.HTTP, level: Severity.Low })
    }
    // A response event precedes fetch's asynchronous body collection.
    await page.waitForFunction(
      (targetUrl, targetType) => {
        return (window['_MITO_'] as BrowserClient).breadcrumb.getStack().some((item) => {
          return item.type === targetType && (item.data as ReportDataType)?.request?.url === targetUrl
        })
      },
      {},
      url,
      type
    )
    const stack = await getStack()
    expect(stack).toHaveLength(status === 500 ? 3 : 2)
    expect(stack[0]).toMatchObject({ type: BrowserBreadcrumbTypes.CLICK, category: BREADCRUMBCATEGORYS.USER })
    const message = status === 200 ? SpanStatus.Ok : `${SpanStatus.InternalError} ${url}`
    const httpData = { message, request: { httpType, method, url }, response: { status } }
    expect(stack[1]).toMatchObject({ category: BREADCRUMBCATEGORYS.HTTP, type, level: Severity.Info, data: httpData })
    if (status === 500) {
      expect(stack[2]).toMatchObject({ category: BREADCRUMBCATEGORYS.EXCEPTION, type, level: Severity.Error, data: httpData })
      if (httpType === HttpTypes.FETCH) {
        expect((stack[2].data as ReportDataType).request.data).toBe(JSON.stringify({ test: '测试请求体' }))
      }
    }
  })

  it('manual report，breadcrumb should add one and upload this error', async () => {
    const data = await clickAndUpload('#logUpload')
    expect(data).toMatchObject({
      customTag: '测试',
      name: MitoLog,
      type: ErrorTypes.LOG,
      level: Severity.Critical,
      message: JSON.stringify({ one: 111 })
    })
    const stack = await getStack()
    expect(stack).toHaveLength(2)
    expect(stack[1]).toMatchObject({ category: BREADCRUMBCATEGORYS.DEBUG, type: BrowserBreadcrumbTypes.CUSTOMER, level: Severity.Error })
  })

  it('promiseError，breadcrumb should add one and upload this error', async () => {
    const data = await clickAndUpload('#promiseError')
    expect(data).toMatchObject({ name: 'unhandledrejection', type: ErrorTypes.PROMISE, level: Severity.Low, message: 'promise reject' })
    const stack = await getStack()
    expect(stack).toHaveLength(2)
    expect(stack[1]).toMatchObject({
      category: BREADCRUMBCATEGORYS.EXCEPTION,
      type: BrowserBreadcrumbTypes.UNHANDLEDREJECTION,
      level: Severity.Error
    })
  })
})
