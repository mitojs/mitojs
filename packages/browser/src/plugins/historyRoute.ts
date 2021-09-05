import { BrowserEventTypes } from '@mitojs/shared'
import { getLocationHref, replaceOld, supportsHistory, _global } from '@mitojs/utils'
import { BasePluginType, RouteChangeCollectType, voidFun } from '@mitojs/types'
import { BrowserClient } from '../browserClient'
import { routeTransform, routeTransformedConsumer } from './hashRoute'

const historyRoutePlugin: BasePluginType<BrowserEventTypes, BrowserClient> = {
  name: BrowserEventTypes.HISTORY,
  monitor(notify) {
    let lastHref: string
    if (!supportsHistory()) return
    const oldOnpopstate = _global.onpopstate
    _global.onpopstate = function (this: WindowEventHandlers, ...args: any[]): any {
      const to = getLocationHref()
      const from = lastHref
      lastHref = to
      notify(BrowserEventTypes.HISTORY, {
        from,
        to
      })
      oldOnpopstate && oldOnpopstate.apply(this, args)
    }
    function historyReplaceFn(originalHistoryFn: voidFun): voidFun {
      return function (this: History, ...args: any[]): void {
        const url = args.length > 2 ? args[2] : undefined
        if (url) {
          const from = lastHref
          const to = String(url)
          lastHref = to
          notify(BrowserEventTypes.HISTORY, {
            from,
            to
          })
        }
        return originalHistoryFn.apply(this, args)
      }
    }
    // 以下两个事件是人为调用，但是不触发onpopstate
    replaceOld(_global.history, 'pushState', historyReplaceFn)
    replaceOld(_global.history, 'replaceState', historyReplaceFn)
  },
  transform(collectedData: RouteChangeCollectType) {
    return routeTransform(collectedData)
  },
  consumer(transformedData: RouteChangeCollectType) {
    routeTransformedConsumer.call(this, transformedData)
  }
}

export default historyRoutePlugin
