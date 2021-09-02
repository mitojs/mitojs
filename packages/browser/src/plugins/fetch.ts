import { BreadcrumbTypes, BrowserEventTypes, HttpTypes, HTTP_CODE, MethodTypes } from '@mitojs/shared'
import { getTimestamp, replaceOld, _global } from '@mitojs/utils'
import { BasePluginType, EMethods, MITOHttp, voidFun } from '@mitojs/types'
import { BrowserClient } from '../browserClient'

const fetchPlugins: BasePluginType<BrowserEventTypes, BrowserClient> = {
  name: BrowserEventTypes.FETCH,
  monitor(notify) {
    fetchReplace.call(this, notify)
  },
  transform(collectedData) {},
  consumer(transformedData) {}
}

function fetchReplace(this: BrowserClient, notify: (eventName: BrowserEventTypes, data: any) => void) {
  const { options } = this
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
      setTraceId(url, (headerFieldName: string, traceId: string) => {
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
          const tempRes = res.clone()
          const eTime = getTimestamp()
          handlerData = {
            ...handlerData,
            elapsedTime: eTime - sTime,
            status: tempRes.status,
            // statusText: tempRes.statusText,
            time: sTime
          }
          tempRes.text().then((data) => {
            if (method === MethodTypes.Post && transportData.isSdkTransportUrl(url)) return
            if (isFilterHttpUrl(url)) return
            handlerData.responseText = tempRes.status > HTTP_CODE.UNAUTHORIZED && data
            notify(BrowserEventTypes.FETCH, handlerData)
          })
          return res
        },
        (err: Error) => {
          const eTime = getTimestamp()
          if (method === MethodTypes.Post && transportData.isSdkTransportUrl(url)) return
          if (isFilterHttpUrl(url)) return
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
  notify(BrowserEventTypes.FETCH, [])
}

export default fetchPlugins
