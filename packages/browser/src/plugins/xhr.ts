import { BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes, BrowserEventTypes, ErrorTypes, globalVar, HttpTypes, HTTP_CODE } from '@mitojs/shared'
import {
  getTimestamp,
  generateUUID,
  replaceOld,
  Severity,
  _global,
  variableTypeDetection,
  on,
  fromHttpStatus,
  SpanStatus,
  getLocationHref,
  getRealPath
} from '@mitojs/utils'
import { BasePluginType, HttpCollectedType, HttpTransformedType, MITOXMLHttpRequest, voidFun } from '@mitojs/types'
import { BrowserClient } from '../browserClient'
import { addBreadcrumbInBrowser } from '../utils'

const xhrPlugin: BasePluginType<BrowserEventTypes, BrowserClient> = {
  name: BrowserEventTypes.XHR,
  monitor(notify) {
    monitorXhr.call(this, notify)
  },
  transform(collectedData: HttpCollectedType) {
    return httpTransform(collectedData)
  },
  consumer(transformedData: HttpTransformedType) {
    httpTransformedDataConsumer.call(this, transformedData)
  }
}

function monitorXhr(this: BrowserClient, notify: (eventName: BrowserEventTypes, data: any) => void) {
  const { options, transport } = this
  if (!('XMLHttpRequest' in _global)) {
    return
  }
  const originalXhrProto = XMLHttpRequest.prototype
  const contextKey = `__mito_xhr_${generateUUID()}`
  replaceOld(originalXhrProto, 'open', (originalOpen: voidFun): voidFun => {
    return function (this: MITOXMLHttpRequest, ...args: any[]): void {
      this.__mitoTraceHeaders = Object.create(null)
      this.httpCollect = this[contextKey] = {
        request: {
          httpType: HttpTypes.XHR,
          method: variableTypeDetection.isString(args[0]) ? args[0].toUpperCase() : args[0],
          url: args[1]
        },
        response: {},
        time: getTimestamp()
      }
      originalOpen.apply(this, args)
    }
  })
  replaceOld(originalXhrProto, 'send', (originalSend: voidFun): voidFun => {
    return function (this: MITOXMLHttpRequest, ...args: any[]): void {
      const httpCollect: HttpCollectedType = this[contextKey]
      // Requests opened before instrumentation must keep working.
      if (!httpCollect) return originalSend.apply(this, args)
      const { request } = httpCollect
      const { method, url } = request
      options.setTraceId(url, (headerFieldName: string, traceId: string) => {
        const field = headerFieldName.toLowerCase()
        const headers = this.__mitoTraceHeaders
        if (!headers[field]) {
          headers[field] = traceId
          this.setRequestHeader(headerFieldName, traceId)
        }
        request.traceId = headers[field]
      })
      options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method, url }, this)
      const onLoadEnd = function (this: MITOXMLHttpRequest) {
        this.removeEventListener('loadend', onLoadEnd)
        const isBlock = transport.isSelfDsn(url) || options.isFilterHttpUrl(url)
        if (isBlock) return
        const { responseType, response, status } = this
        request.data = args[0]
        const eTime = getTimestamp()
        if (['', 'json', 'text'].indexOf(responseType) !== -1) {
          httpCollect.response.data = typeof response === 'object' ? JSON.stringify(response) : response
        }
        httpCollect.response.status = status
        httpCollect.elapsedTime = eTime - httpCollect.time
        notify(BrowserEventTypes.XHR, httpCollect)
      }
      on(this, 'loadend', onLoadEnd)
      originalSend.apply(this, args)
    }
  })
}

export function httpTransform(httpCollectedData: HttpCollectedType): HttpTransformedType {
  let message = ''
  const {
    request: { httpType, method, url },
    response: { status },
    elapsedTime
  } = httpCollectedData
  const name = `${httpType}--${method}`
  if (status === 0) {
    message =
      elapsedTime <= globalVar.crossOriginThreshold ? 'http请求失败，失败原因：跨域限制或域名不存在' : 'http请求失败，失败原因：超时'
  } else {
    message = fromHttpStatus(status)
  }
  message = message === SpanStatus.Ok ? message : `${message} ${getRealPath(url)}`
  return {
    ...httpCollectedData,
    type: ErrorTypes.HTTP,
    url: getLocationHref(),
    level: Severity.Low,
    message,
    name
  }
}

export function httpTransformedDataConsumer(this: BrowserClient, transformedData: HttpTransformedType) {
  const type = transformedData.request.httpType === HttpTypes.FETCH ? BrowserBreadcrumbTypes.FETCH : BrowserBreadcrumbTypes.XHR
  // time 是为了保持顺序，紧跟在点击事件后面
  const {
    response: { status },
    time
  } = transformedData
  const isError = status === 0 || status === HTTP_CODE.BAD_REQUEST || status > HTTP_CODE.UNAUTHORIZED
  addBreadcrumbInBrowser.call(this, transformedData, type, Severity.Info, { time })
  if (isError) {
    const breadcrumStack = this.breadcrumb.push({
      type,
      category: BREADCRUMBCATEGORYS.EXCEPTION,
      data: transformedData,
      level: Severity.Error,
      time
    })
    this.transport.send(transformedData, breadcrumStack)
  }
}

export default xhrPlugin
