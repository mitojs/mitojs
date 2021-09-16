import { ErrorTypes, HttpTypes } from '@mitojs/shared'
import { ReportDataType } from '@mitojs/types'
import { createErrorId, getFlutterRealOrigin, getFlutterRealPath, getRealPath, Severity } from '../src/index'

describe('errorId.ts', () => {
  const apikey = '13213-1231-1231'
  describe('createErrorId func', () => {
    it('两个http Error应该生成不同的errorId', () => {
      const httpError_1: ReportDataType = {
        type: ErrorTypes.HTTP,
        url: 'http://localhost:2021/JS/index.html',
        time: 1609210351040,
        elapsedTime: 948,
        level: 'low',
        message: 'http请求失败，失败原因：跨域限制或域名不存在',
        name: 'xhr--GET',
        request: { httpType: HttpTypes.XHR, method: 'GET', url: 'http://aaaa.aaa/info2', data: '' },
        response: { status: 0, data: '' }
      }

      const httpError_2: ReportDataType = {
        type: ErrorTypes.HTTP,
        url: 'http://localhost:2021/JS/index.html',
        time: 1609210351040,
        elapsedTime: 948,
        level: 'low',
        message: 'http请求失败，失败原因：跨域限制或域名不存在',
        name: 'xhr--GET',
        request: { httpType: HttpTypes.XHR, method: 'POST', url: 'http://aaaa.aaa/info2', data: '' },
        response: { status: 0, data: '' }
      }
      const errorId_1 = createErrorId(httpError_1, apikey, 2)
      const errorId_2 = createErrorId(httpError_2, apikey, 2)
      expect(errorId_1).not.toBe(errorId_2)
    })

    it('两个相同的httpError应该生成相同的id', () => {
      const httpError_3: ReportDataType = {
        type: ErrorTypes.HTTP,
        url: 'http://localhost:2021/JS/index.html',
        time: 1609210351040,
        elapsedTime: 948,
        level: 'low',
        message: 'http请求失败，失败原因：跨域限制或域名不存在',
        name: 'xhr--GET',
        request: { httpType: HttpTypes.XHR, method: 'GET', url: 'http://aaaa', data: '' },
        response: { status: 0, data: '' }
      }
      const errorId_1 = createErrorId(httpError_3, apikey, 2)
      const errorId_2 = createErrorId(httpError_3, apikey, 2)
      expect(errorId_1).toBe(errorId_2)
    })

    it('两个相同的对象，但顺序不同，但是结果应该是相同', () => {
      const logError_1: ReportDataType = {
        type: ErrorTypes.LOG,
        level: Severity.Critical,
        message: '{"one":111}',
        name: 'MITO.log',
        customTag: '测试',
        time: 1609211248523,
        url: 'http://localhost:2021/JS/index.html'
      }
      const logError_2: ReportDataType = {
        message: '{"one":111}',
        name: 'MITO.log',
        customTag: '测试',
        time: 1609211248523,
        level: Severity.Critical,
        type: ErrorTypes.LOG,
        url: 'http://localhost:2021/JS/index.html'
      }

      const errorId_1 = createErrorId(logError_1, apikey, 2)
      const errorId_2 = createErrorId(logError_2, apikey, 2)
      expect(errorId_1).toBe(errorId_2)
    })

    it('一个错误对象生成两次后，默认情况下第三次会返回null，可配置maxDuplicateCount', () => {
      const logError_1: ReportDataType = {
        type: ErrorTypes.LOG,
        level: Severity.Critical,
        message: '{"one":111}',
        name: 'MITO.log',
        customTag: '测试',
        time: 1609211248523,
        url: 'http://localhost:2021/JS/index.html'
      }
      const errorId_1 = createErrorId(logError_1, apikey, 2)
      const errorId_2 = createErrorId(logError_1, apikey, 2)
      const errorId_3 = createErrorId(logError_1, apikey, 2)
      expect(errorId_1).toBe(errorId_2)
      expect(errorId_3).toBeNull()
    })
    it('should promise error distinguish unhandledrejection or other', () => {
      const error_1: ReportDataType = {
        type: ErrorTypes.PROMISE,
        level: Severity.Low,
        message: 'a is not defined',
        name: 'unhandledrejection',
        time: 1609211248523,
        url: 'http://localhost:2021/JS/index.html'
      }
      const error_2: ReportDataType = {
        type: ErrorTypes.PROMISE,
        level: Severity.Low,
        message: 'a is not defined',
        name: 'typeError',
        time: 1609211248523,
        url: 'http://localhost:2021/JS/index.html'
      }
      const errorId_1 = createErrorId(error_1, apikey, 2)
      const errorId_2 = createErrorId(error_2, apikey, 2)
      expect(errorId_1).not.toBe(errorId_2)
    })
  })

  describe('getRealPath should work', () => {
    it('删除多余的query参数', () => {
      const url = 'http://a/b/c/project?id=1#a'
      expect(getRealPath(url)).toBe('http://a/b/c/project')
    })

    it('去掉多余{param}', () => {
      const url = 'http://a/b/c/project/info/18'
      expect(getRealPath(url)).toBe('http://a/b/c/project/info{param}')
    })
  })

  it('should getFlutterRealPath func work', () => {
    const url =
      'file:///var/mobile/Containers/Data/Application/D1A0783A-2495-41B4-8599-EC58B5B252CD/Documents/SailerBuild/36/index.html?/#/search-page'
    expect(getFlutterRealPath(url)).toBe('SailerBuild/36/index.html?/#/search-page')
  })
  it('should getFlutterRealOrigin func work', () => {
    const url =
      'file:///var/mobile/Containers/Data/Application/D1A0783A-2495-41B4-8599-EC58B5B252CD/Documents/SailerBuild/36/index.html?/#/search-page'
    expect(getFlutterRealOrigin(url)).toBe('SailerBuild/36/index.html?')
  })
})
