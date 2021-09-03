import { BrowserBreadcrumbTypes, BrowserEventTypes, HttpTypes, HTTP_CODE, MethodTypes } from '@mitojs/shared'
import { getTimestamp, httpTransform, replaceOld, Severity, _global, getBreadcrumbCategoryInBrowser } from '@mitojs/utils'
import { BasePluginType, HttpTransformed, MITOHttp, ReportDataType, voidFun } from '@mitojs/types'
import { BrowserClient } from '../browserClient'

const fetchPlugins: BasePluginType<BrowserEventTypes, BrowserClient> = {
  name: BrowserEventTypes.FETCH,
  monitor(notify) {
    monitorFetch.call(this, notify)
  },
  transform(collectedData) {
    return httpTransform(collectedData)
  },
  consumer(transformedData: HttpTransformed) {
    const type = BrowserBreadcrumbTypes.FETCH
    const isError =
      transformedData.response.status === 0 ||
      transformedData.response.status === HTTP_CODE.BAD_REQUEST ||
      transformedData.response.status > HTTP_CODE.UNAUTHORIZED
    this.breadcrumb.push({
      type,
      category: getBreadcrumbCategoryInBrowser(type),
      data: { ...transformedData },
      level: Severity.Info,
      time: transformedData.time
    })
    if (isError) {
      this.breadcrumb.push({
        type,
        category: getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.CODE_ERROR),
        data: { ...transformedData },
        level: Severity.Error,
        time: transformedData.time
      })
      this.transport.send(transformedData, this.breadcrumb.getStack())
    }
  }
}

function monitorFetch(this: BrowserClient, notify: (eventName: BrowserEventTypes, data: any) => void) {
  const { options, transport } = this
  if (!('fetch' in _global)) {
    return
  }
  replaceOld(_global, BrowserEventTypes.FETCH, (originalFetch: voidFun) => {
    return function (url: string, config: Partial<Request> = {}): void {
      const sTime = getTimestamp()
      const method = (config && config.method) || 'GET'
      let handlerData: MITOHttp = {
        type: HttpTypes.FETCH,
        method,
        reqData: config && config.body,
        url
      }
      const headers = new Headers(config.headers || {})
      Object.assign(headers, {
        setRequestHeader: headers.set
      })
      options.setTraceId(url, (headerFieldName: string, traceId: string) => {
        handlerData.traceId = traceId
        headers.set(headerFieldName, traceId)
      })
      options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method, url }, headers)
      config = {
        ...config,
        headers
      }
      return originalFetch.apply(_global, [url, config]).then(
        (res: Response) => {
          const resClone = res.clone()
          const eTime = getTimestamp()
          handlerData = {
            ...handlerData,
            elapsedTime: eTime - sTime,
            status: resClone.status,
            // statusText: resClone.statusText,
            time: sTime
          }
          resClone.text().then((data) => {
            if (method === MethodTypes.Post && transport.isSelfDsn(url)) return
            if (options.isFilterHttpUrl(url)) return
            handlerData.responseText = data
            notify(BrowserEventTypes.FETCH, handlerData)
          })
          return res
        },
        (err: Error) => {
          const eTime = getTimestamp()
          if (method === MethodTypes.Post && transport.isSelfDsn(url)) return
          if (options.isFilterHttpUrl(url)) return
          handlerData = {
            ...handlerData,
            elapsedTime: eTime - sTime,
            status: 0,
            // statusText: err.name + err.message,
            time: sTime
          }
          notify(BrowserEventTypes.FETCH, handlerData)
          throw err
        }
      )
    }
  })
}

export default fetchPlugins
