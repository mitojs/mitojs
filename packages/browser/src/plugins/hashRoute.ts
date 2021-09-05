import { BrowserBreadcrumbTypes, BrowserEventTypes } from '@mitojs/shared'
import { getBreadcrumbCategoryInBrowser, isExistProperty, on, parseUrlToObj, Severity, _global } from '@mitojs/utils'
import { BasePluginType, RouteChangeType } from '@mitojs/types'
import { BrowserClient } from '../browserClient'

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
  transform(collectedData: RouteChangeType) {
    return routeTransform(collectedData)
  },
  consumer(transformedData: RouteChangeType) {
    routeTransformedConsumer.call(this, transformedData)
  }
}

export function routeTransform(collectedData: RouteChangeType): RouteChangeType {
  const { from, to } = collectedData
  const { relative: parsedFrom } = parseUrlToObj(from)
  const { relative: parsedTo } = parseUrlToObj(to)
  return {
    from: parsedFrom ? parsedFrom : '/',
    to: parsedTo ? parsedTo : '/'
  }
}

export function routeTransformedConsumer(this: BrowserClient, transformedData: RouteChangeType) {
  this.breadcrumb.push({
    type: BrowserBreadcrumbTypes.ROUTE,
    category: getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.ROUTE),
    data: transformedData,
    level: Severity.Info
  })
}

export default hashRoutePlugin
