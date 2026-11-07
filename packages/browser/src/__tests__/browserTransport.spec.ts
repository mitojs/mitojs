import { vi, type Mock } from 'vitest'
import { Breadcrumb } from '@mitojs/core'
import { sleepRun } from '@mitojs/utils'
import { ErrorTypes } from 'packages/shared/src/constant'
import { ReportDataType } from 'packages/types/src/transport'
import { BrowserTransport } from '../browserTransport'
const breadcrumb = new Breadcrumb()
const trackId = '123-123-456-456'
const apikey = 'abc-abc'
const config = {
  dsn: '/normal',
  backTrackerId() {
    return trackId
  },
  apikey
}
const breadcrumbStack = breadcrumb.getStack()
const jsMockData: ReportDataType = {
  message: 'is javascript error',
  type: ErrorTypes.JAVASCRIPT
}
const logMockData: ReportDataType = {
  type: ErrorTypes.LOG,
  message: 'is mito.log'
}

describe('browserTransport.ts', () => {
  const browserTransport = new BrowserTransport({
    ...config
  })

  browserTransport.imgRequest = vi.fn(browserTransport.imgRequest)
  browserTransport.post = vi.fn(browserTransport.post)

  it('post should be called', () => {
    browserTransport.send(jsMockData, breadcrumbStack)
    expect((browserTransport.post as Mock).mock.calls.length).toBe(1)
  })

  it('isSelfDsn should be work', () => {
    expect(browserTransport.isSelfDsn(config.dsn)).toBeTruthy()
    expect(browserTransport.isSelfDsn('/someElse')).toBeFalsy()
  })

  it('configReportUrl should work when return string', () => new Promise<void>((done) => {
    const browserTransport_ = new BrowserTransport({
      ...config,
      configReportUrl(event, preDsn) {
        expect(event.data.message).toBe(logMockData.message)
        expect(preDsn).toBe(config.dsn)
        // can return new dsn
        return config.dsn + '/someElse'
      }
    })
    browserTransport_.post = vi.fn(browserTransport_.post)
    browserTransport_.send(logMockData, breadcrumbStack)
    sleepRun(() => {
      expect((browserTransport_.post as Mock).mock.calls.length).toBe(1)
      done()
    })
  }))

  it('is block when dsn is empty', () => new Promise<void>((done) => {
    const browserTransport_ = new BrowserTransport({
      ...config,
      dsn: ''
    })
    browserTransport_.post = vi.fn(browserTransport_.post)
    browserTransport_.send(logMockData, breadcrumbStack)
    sleepRun(() => {
      expect((browserTransport_.post as Mock).mock.calls.length).toBe(0)
      done()
    })
  }))

  it('the return value of backTrackerId should be number or string', () => new Promise<void>((done) => {
    const browserTransport_ = new BrowserTransport({
      ...config,
      backTrackerId() {
        // trackerId will be ''
        return { test: '123' } as any as number
      },
      beforeDataReport(event) {
        expect(event.authInfo.trackerId).toBe('')
        return event
      }
    })
    browserTransport_.send(logMockData, breadcrumbStack)
    sleepRun(() => {
      done()
    })
  }))

  it('beforeDataReport should work when return event', () => new Promise<void>((done) => {
    const browserTransport_normal = new BrowserTransport({
      ...config,
      beforeDataReport(event) {
        expect(event.data.type).toBe(jsMockData.type)
        return event
      }
    })
    browserTransport_normal.post = vi.fn(browserTransport_normal.post)
    browserTransport_normal.send(jsMockData, breadcrumbStack)
    sleepRun(() => {
      expect((browserTransport_normal.post as Mock).mock.calls.length).toBe(1)
      done()
    })
  }))

  it('beforeDataReport should block when return false', () => new Promise<void>((done) => {
    const browserTransport_block = new BrowserTransport({
      ...config,
      beforeDataReport(event) {
        expect(event.data.type).toBe(logMockData.type)
        return false
      }
    })
    browserTransport_block.post = vi.fn(browserTransport_block.post)
    browserTransport_block.send(logMockData, breadcrumbStack)
    sleepRun(() => {
      expect((browserTransport_block.post as Mock).mock.calls.length).toBe(0)
      done()
    })
  }))

  it('getTransportData should work', () => {
    const transportData = browserTransport.getTransportData(jsMockData)
    const authInfo = transportData.authInfo
    expect(authInfo.apikey).toBe(apikey)
    expect(authInfo.trackerId).toBe(trackId)
  })

  it('configReportUrl should block when return empty char', () => new Promise<void>((done) => {
    const browserTransport_configReportUrl = new BrowserTransport({
      ...config,
      configReportUrl(event, preDsn) {
        expect(event.data.message).toBe(logMockData.message)
        expect(preDsn).toBe(config.dsn)
        // return new dsn
        return ''
      }
    })
    browserTransport_configReportUrl.post = vi.fn(browserTransport_configReportUrl.post)
    browserTransport_configReportUrl.send(logMockData, breadcrumbStack)
    sleepRun(() => {
      expect((browserTransport_configReportUrl.post as Mock).mock.calls.length).toBe(0)
      done()
    })
  }))

  it('imgRequest should be called after configed useImgUpload', () => {
    browserTransport.bindOptions({
      useImgUpload: true
    })
    browserTransport.send(jsMockData, breadcrumbStack)
    expect((browserTransport.imgRequest as Mock).mock.calls.length).toBe(1)
  })
})
