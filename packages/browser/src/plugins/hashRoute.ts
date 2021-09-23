import { BrowserBreadcrumbTypes, BrowserEventTypes } from '@mitojs/shared'
import { isExistProperty, on, parseUrlToObj, _global } from '@mitojs/utils'
import { BasePluginType, RouteChangeCollectType } from '@mitojs/types'
import { BrowserClient } from '../browserClient'
import { addBreadcrumbInBrowser } from '../utils'

const hashRoutePlugin: BasePluginType<BrowserEventTypes, BrowserClient> = {
  name: BrowserEventTypes.HASHCHANGE,
  monitor(notify) {
    if (!isExistProperty(_global, 'onpopstate')) {
      on(_global, BrowserEventTypes.HASHCHANGE, function (e: HashChangeEvent) {
        const { oldURL: from, newURL: to } = e
        notify(BrowserEventTypes.HASHCHANGE, { from, to })
      })
    }
  },
  transform(collectedData: RouteChangeCollectType) {
    return routeTransform(collectedData)
  },
  consumer(transformedData: RouteChangeCollectType) {
    routeTransformedConsumer.call(this, transformedData)
  }
}

export function routeTransform(collectedData: RouteChangeCollectType): RouteChangeCollectType {
  const { from, to } = collectedData
  const { relative: parsedFrom } = parseUrlToObj(from)
  const { relative: parsedTo } = parseUrlToObj(to)
  return {
    from: parsedFrom ? parsedFrom : '/',
    to: parsedTo ? parsedTo : '/'
  }
}

export function routeTransformedConsumer(this: BrowserClient, transformedData: RouteChangeCollectType) {
  if (transformedData.from === transformedData.to) return
  addBreadcrumbInBrowser.call(this, transformedData, BrowserBreadcrumbTypes.ROUTE)
}

export default hashRoutePlugin
