import { BrowserEventTypes, HttpTypes } from '@mitojs/shared'
import { getTimestamp, replaceOld, _global } from '@mitojs/utils'
import { BasePluginType, HttpCollectedType, HttpTransformedType, voidFun } from '@mitojs/types'
import { BrowserClient } from '../browserClient'
import { httpTransform, httpTransformedDataConsumer } from './xhr'

const fetchPlugin: BasePluginType<BrowserEventTypes, BrowserClient> = {
  name: BrowserEventTypes.FETCH,
  monitor(notify) {
    monitorFetch.call(this, notify)
  },
  transform(collectedData: HttpCollectedType) {
    return httpTransform(collectedData)
  },
  consumer(transformedData: HttpTransformedType) {
    httpTransformedDataConsumer.call(this, transformedData)
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
      const httpCollect: HttpCollectedType = {
        request: {
          httpType: HttpTypes.FETCH,
          url,
          method,
          data: config && config.body
        },
        time: sTime,
        response: {}
      }
      const headers = new Headers(config.headers || {})
      Object.assign(headers, {
        setRequestHeader: headers.set
      })
      options.setTraceId(url, (headerFieldName: string, traceId: string) => {
        httpCollect.request.traceId = traceId
        headers.set(headerFieldName, traceId)
      })
      options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method, url }, headers)
      config = {
        ...config,
        headers
      }
      const isBlock = transport.isSelfDsn(url) || options.isFilterHttpUrl(url)
      return originalFetch.apply(_global, [url, config]).then(
        (res: Response) => {
          const resClone = res.clone()
          const eTime = getTimestamp()
          httpCollect.elapsedTime = eTime - sTime
          httpCollect.response.status = resClone.status
          resClone.text().then((data) => {
            if (isBlock) return
            httpCollect.response.data = data
            notify(BrowserEventTypes.FETCH, httpCollect)
          })
          return res
        },
        (err: Error) => {
          if (isBlock) return
          const eTime = getTimestamp()
          httpCollect.elapsedTime = eTime - sTime
          httpCollect.response.status = 0
          notify(BrowserEventTypes.FETCH, httpCollect)
          throw err
        }
      )
    }
  })
}

export default fetchPlugin
