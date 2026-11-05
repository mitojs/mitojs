import { BrowserEventTypes, HttpTypes } from '@mitojs/shared'
import { getTimestamp, replaceOld, _global } from '@mitojs/utils'
import { BasePluginType, HttpCollectedType, HttpTransformedType } from '@mitojs/types'
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
  replaceOld(_global, BrowserEventTypes.FETCH, (originalFetch: typeof fetch) => {
    return function (this: Window, input: RequestInfo | URL, config: RequestInit = {}): Promise<Response> {
      config = config || {}
      const request = typeof input === 'object' && input !== null && 'url' in input ? (input as Request) : undefined
      const url = request ? request.url : String(input)
      const sTime = getTimestamp()
      const method = config.method || request?.method || 'GET'
      const httpCollect: HttpCollectedType = {
        request: {
          httpType: HttpTypes.FETCH,
          url,
          method,
          data: config.body
        },
        time: sTime,
        response: {}
      }
      const headers = new Headers(config.headers !== undefined ? config.headers : request?.headers || {})
      Object.assign(headers, {
        setRequestHeader: headers.set
      })
      options.setTraceId(url, (headerFieldName: string, traceId: string) => {
        const existing = headers.get(headerFieldName)
        httpCollect.request.traceId = existing || traceId
        if (!existing) headers.set(headerFieldName, traceId)
      })
      options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method, url }, headers)
      config = {
        ...config,
        headers
      }
      const isBlock = transport.isSelfDsn(url) || options.isFilterHttpUrl(url)
      return originalFetch.call(this, input, config).then(
        (res: Response) => {
          if (isBlock) return res
          const eTime = getTimestamp()
          httpCollect.elapsedTime = eTime - sTime
          httpCollect.response.status = res.status
          const report = (data?: string) => {
            if (data !== undefined) httpCollect.response.data = data
            notify(BrowserEventTypes.FETCH, httpCollect)
          }
          try {
            res
              .clone()
              .text()
              .then(report, () => report())
          } catch (_error) {
            report()
          }
          return res
        },
        (err: Error) => {
          if (!isBlock) {
            httpCollect.elapsedTime = getTimestamp() - sTime
            httpCollect.response.status = 0
            notify(BrowserEventTypes.FETCH, httpCollect)
          }
          throw err
        }
      )
    }
  })
}

export default fetchPlugin
