import {
  WxBreadcrumbTypes,
  ErrorTypes,
  globalVar,
  HttpTypes,
  HTTP_CODE,
  MethodTypes,
  WxEventTypes,
  BREADCRUMBCATEGORYS
} from '@mitojs/shared'
import {
  fromHttpStatus,
  getBreadcrumbCategoryInWx,
  getCurrentRoute,
  getRealPath,
  getTimestamp,
  Severity,
  SpanStatus,
  variableTypeDetection
} from '@mitojs/utils'
import { BasePluginType, HttpCollectedType, HttpTransformedType } from '@mitojs/types'
import { WxClient } from '../wxClient'
import { addBreadcrumbInWx } from '../utils'

const wxXhrPlugin: BasePluginType<WxEventTypes, WxClient> = {
  name: WxEventTypes.XHR,
  monitor(notify) {
    monitorWxXhr.call(this, notify)
  },
  transform(collectedData: HttpCollectedType) {
    return httpTransform(collectedData)
  },
  consumer(transformedData: HttpTransformedType) {
    httpTransformedDataConsumer.call(this, transformedData)
  }
}

function monitorWxXhr(this: WxClient, notify: (eventName: WxEventTypes, data: any) => void) {
  const hookMethods = ['request', 'downloadFile', 'uploadFile']
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const that = this
  const { options: wxOptions } = this
  hookMethods.forEach((hook) => {
    const originRequest = wx[hook]
    Object.defineProperty(wx, hook, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function (...args: any[]) {
        const options: WechatMiniprogram.RequestOption | WechatMiniprogram.DownloadFileOption | WechatMiniprogram.UploadFileOption = args[0]
        let method: string
        if ((options as WechatMiniprogram.RequestOption).method) {
          method = (options as WechatMiniprogram.RequestOption).method
        } else if (hook === 'downloadFile') {
          method = MethodTypes.Get
        } else {
          method = MethodTypes.Post
        }
        const { url } = options
        let header = options.header
        !header && (header = {})

        if ((method === MethodTypes.Post && that.transport.isSelfDsn(url)) || wxOptions.isFilterHttpUrl(url)) {
          return originRequest.call(this, options)
        }
        let reqData = undefined
        if (hook === 'request') {
          reqData = (options as WechatMiniprogram.RequestOption).data
        } else if (hook === 'downloadFile') {
          reqData = {
            filePath: (options as WechatMiniprogram.DownloadFileOption).filePath
          }
        } else {
          // uploadFile
          reqData = {
            filePath: (options as WechatMiniprogram.UploadFileOption).filePath,
            name: (options as WechatMiniprogram.UploadFileOption).name
          }
        }
        const httpCollect: HttpCollectedType = {
          request: {
            httpType: HttpTypes.XHR,
            url,
            method,
            data: reqData
          },
          response: {},
          time: getTimestamp()
        }
        wxOptions.setTraceId(url, (headerFieldName, traceId) => {
          httpCollect.request.traceId = traceId
          header[headerFieldName] = traceId
        })
        function setRequestHeader(key: string, value: string) {
          header[key] = value
        }
        wxOptions.beforeAppAjaxSend && wxOptions.beforeAppAjaxSend({ method, url }, { setRequestHeader })
        const successHandler:
          | WechatMiniprogram.RequestSuccessCallback
          | WechatMiniprogram.DownloadFileSuccessCallback
          | WechatMiniprogram.UploadFileFailCallback = function (res) {
          const endTime = getTimestamp()
          httpCollect.response.data = (variableTypeDetection.isString(res.data) || variableTypeDetection.isObject(res.data)) && res.data
          httpCollect.elapsedTime = endTime - httpCollect.time
          httpCollect.response.status = res.statusCode
          httpCollect.errMsg = res.errMsg
          notify(WxEventTypes.XHR, httpCollect)
          if (typeof options.success === 'function') {
            return options.success(res)
          }
        }
        const _fail = options.fail
        const failHandler:
          | WechatMiniprogram.RequestFailCallback
          | WechatMiniprogram.DownloadFileFailCallback
          | WechatMiniprogram.UploadFileFailCallback = function (err) {
          // 系统和网络层面的失败
          const endTime = getTimestamp()
          httpCollect.elapsedTime = endTime - httpCollect.time
          httpCollect.errMsg = err.errMsg
          httpCollect.response.status = 0
          notify(WxEventTypes.XHR, httpCollect)
          if (variableTypeDetection.isFunction(_fail)) {
            return _fail(err)
          }
        }
        const actOptions = {
          ...options,
          success: successHandler,
          fail: failHandler
        }
        return originRequest.call(this, actOptions)
      }
    })
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
    url: getCurrentRoute(),
    level: Severity.Low,
    message,
    name
  }
}

export function httpTransformedDataConsumer(this: WxClient, transformedData: HttpTransformedType) {
  const type = WxBreadcrumbTypes.XHR
  const {
    response: { status },
    time
  } = transformedData
  const isError = status === 0 || status === HTTP_CODE.BAD_REQUEST || status > HTTP_CODE.UNAUTHORIZED
  addBreadcrumbInWx.call(this, transformedData, type)
  if (isError) {
    const breadcrumbStack = this.breadcrumb.push({
      type,
      category: BREADCRUMBCATEGORYS.EXCEPTION,
      data: { ...transformedData },
      level: Severity.Error,
      time
    })
    this.transport.send(transformedData, breadcrumbStack)
  }
}

export default wxXhrPlugin
