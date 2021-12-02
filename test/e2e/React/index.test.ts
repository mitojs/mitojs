import { BaseBreadcrumbTypes, BREADCRUMBCATEGORYS, ErrorTypes, SDK_NAME, SDK_VERSION } from '@mitojs/shared'
import { reactUrl } from '@/test/config'
import { TransportDataType } from '@mitojs/types'
import { Severity } from '@mitojs/utils'
import puppeteer from 'puppeteer'
import { BrowserClient } from '@mitojs/browser'

describe('React e2e', () => {
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
    await page.goto(reactUrl)
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
    'errorboundary capture react render error:breadcrumb should add one and upload this error',
    async (done) => {
      async function uploadRequestHandle(request: puppeteer.Request) {
        // breadcrumb validate
        const stack = await getStack()
        const breadcrumbItem = stack[0]
        expect(breadcrumbItem.category).toBe(BREADCRUMBCATEGORYS.EXCEPTION)
        expect(breadcrumbItem.type).toBe(BaseBreadcrumbTypes.REACT)
        expect(breadcrumbItem.level).toBe(Severity.Error)
        // upload
        const postData = JSON.parse(request.postData()) as TransportDataType
        const { authInfo, data } = postData
        expect(data.type).toBe(ErrorTypes.REACT)
        expect(data.level).toBe(Severity.Normal)
        expect(data.name).toBe('Error')
        expect(data.level).toBe(Severity.Normal)
        expect(data.message).toBe('I crashed!')
        // stack is array
        expect(Array.isArray(data.stack)).toBeTruthy()
        expect(authInfo.sdkName).toBe(SDK_NAME)
        expect(authInfo.sdkVersion).toBe(SDK_VERSION)
        done()
      }
      uploadRequestHandles.push(uploadRequestHandle)
      page.click('#numException')
      page.click('#numException')
      page.click('#numException')
    },
    timeout
  )
})
