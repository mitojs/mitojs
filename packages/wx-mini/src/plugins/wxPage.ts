import { ErrorTypes, WxPageEvents, WxBreadcrumbTypes, WxEventTypes } from '@mitojs/shared'
import { BasePluginType, ReportDataType, voidFun } from '@mitojs/types'
import {
  extractErrorStack,
  firstStrtoLowerCase,
  getCurrentRoute,
  getTimestamp,
  isError,
  parseErrorString,
  replaceOld,
  Severity,
  unknownToString
} from '@mitojs/utils'
import { WxLifeCycleBreadcrumb } from '../types'
import { addBreadcrumbInWx, getCurrentPagesPop } from '../utils'
import { WxClient } from '../wxClient'

type WxPagePluginMapType = Map<WxPageEvents, Partial<BasePluginType<WxEventTypes, WxClient>>>

function pageHookTransform(this: WxClient, hook: WxPageEvents) {
  const page = getCurrentPagesPop()
  const { options: sdkOptions } = this
  if (page) {
    sdkOptions[firstStrtoLowerCase(hook)](page)
    return {
      path: page.route,
      query: page.options
    }
  }
  sdkOptions[firstStrtoLowerCase(hook)]()
}

const wxPagePluginMap: WxPagePluginMapType = new Map()
wxPagePluginMap.set(WxPageEvents.PageOnLoad, {
  transform() {
    // getCurrentPagesPop is undefined
    return pageHookTransform.call(this, WxPageEvents.PageOnLoad)
  },
  consumer(data: WxLifeCycleBreadcrumb) {
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.PAGE_ON_LOAD)
  }
})

wxPagePluginMap.set(WxPageEvents.PageOnShow, {
  transform() {
    return pageHookTransform.call(this, WxPageEvents.PageOnShow)
  },
  consumer(data: WxLifeCycleBreadcrumb) {
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.PAGE_ON_SHOW)
  }
})

wxPagePluginMap.set(WxPageEvents.PageOnReady, {
  transform() {
    return pageHookTransform.call(this, WxPageEvents.PageOnReady)
  },
  consumer() {
    addBreadcrumbInWx.call(this, null, WxBreadcrumbTypes.PAGE_ON_READY)
  }
})

wxPagePluginMap.set(WxPageEvents.PageOnHide, {
  transform() {
    return pageHookTransform.call(this, WxPageEvents.PageOnHide)
  },
  consumer(data: WxLifeCycleBreadcrumb) {
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.PAGE_ON_HIDE)
  }
})

wxPagePluginMap.set(WxPageEvents.PageOnUnload, {
  transform() {
    return pageHookTransform.call(this, WxPageEvents.PageOnHide)
  },
  consumer(data: WxLifeCycleBreadcrumb) {
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.PAGE_ON_UNLOAD)
  }
})

function getWxPagePlugins() {
  if (!Page) return []
  const pageHooks = Object.values(WxPageEvents)
  const plugins = pageHooks.map((hook) => {
    return {
      name: hook,
      monitor: function (notify) {
        const originPageo = Page
        Page = function (
          pageOptions:
            | WechatMiniprogram.Page.Options<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption>
            | WechatMiniprogram.Component.MethodOption
        ) {
          replaceOld(
            pageOptions,
            hook.replace('PageOn', 'on'),
            function (originMethod: voidFun) {
              return function (...args: any): void {
                notify.apply(null, [hook, ...args])
                if (originMethod) {
                  return originMethod.apply(this, args)
                }
              }
            },
            true
          )
          return originPageo(pageOptions)
        } as WechatMiniprogram.App.Constructor
      }
    }
  }) as BasePluginType<WxPageEvents, WxClient>[]
  return plugins.map((item) => {
    if (wxPagePluginMap.get(item.name)) {
      return {
        ...item,
        ...wxPagePluginMap.get(item.name)
      }
    }
    return item
  })
}

const wxPagePlugins = getWxPagePlugins()
console.log('wxPagePlugins', wxPagePlugins)
export { wxPagePluginMap }
export default wxPagePlugins
