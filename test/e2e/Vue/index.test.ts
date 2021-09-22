import { BaseBreadcrumbTypes, BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes, ErrorTypes, SDK_NAME, SDK_VERSION } from '@mitojs/shared'
import { vueUrl } from '@/test/config'
import { TransportDataType, ReportDataType } from '@mitojs/types'
import { Severity } from '@mitojs/utils'
import puppeteer from 'puppeteer'
import { BrowserClient } from '@mitojs/browser'

describe('Vue e2e', () => {
  const timeout = 3000
  let page: puppeteer.Page
  let browser: puppeteer.Browser
  const uploadRequestHandles = []
  const finishedRequestHandles = []
  async function getStack() {
    return await page.evaluate(() => {
      return (window['_MITO_'] as BrowserClient).breadcrumb.getStack()
    })
  }
  beforeEach(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
    // page.on('console', (msg) => {
    //   for (let i = 0; i < msg.args().length; ++i) console.log(`${i}: ${msg.args()[i]}`)
    // })
    await page.goto(vueUrl)
    page.on('request', (request) => {
      if (request.url().includes('/errors/upload') && uploadRequestHandles.length > 0) {
        uploadRequestHandles.shift()(request)
      }
    })
    page.on('requestfinished', (request) => {
      if (finishedRequestHandles.length > 0) {
        finishedRequestHandles.shift()(request)
      }
    })
  })

  afterEach(async () => {
    browser.close()
  })

  afterAll(() => {
    browser.close()
  })

  it(
    'vue code error',
    async (done) => {
      async function uploadRequestHandle(request: puppeteer.Request) {
        // breadcrumb valid
        const stack = await getStack()
        expect(stack[1].category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
        expect(stack[1].type).toBe(BaseBreadcrumbTypes.VUE)
        expect(stack[1].level).toBe(Severity.Error)
        // upload
        const { authInfo, data } = JSON.parse(request.postData()) as TransportDataType
        expect((data as ReportDataType).type).toBe(ErrorTypes.VUE)
        expect((data as ReportDataType).level).toBe(Severity.Normal)
        expect((data as ReportDataType).name).toBe('TypeError')
        expect((data as ReportDataType).level).toBe(Severity.Normal)
        expect((data as ReportDataType).message).toBe("Cannot set property 'a' of undefined(v-on handler)")
        // stack is string
        expect((data as ReportDataType).stack).toBeDefined()
        expect(authInfo.sdkName).toBe(SDK_NAME)
        expect(authInfo.sdkVersion).toBe(SDK_VERSION)
        done()
      }
      uploadRequestHandles.push(uploadRequestHandle)
      page.click('#vueCodeError')
    },
    timeout
  )
})
