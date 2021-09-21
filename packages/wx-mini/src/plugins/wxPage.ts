import { ErrorTypes, WxPageEvents, WxBreadcrumbTypes, WxEventTypes } from '@mitojs/shared'
import { BasePluginType, ReportDataType, voidFun } from '@mitojs/types'
import {
  extractErrorStack,
  getCurrentRoute,
  getTimestamp,
  isError,
  parseErrorString,
  replaceOld,
  Severity,
  unknownToString
} from '@mitojs/utils'
import { WxLifeCycleBreadcrumb } from '../types'
import { addBreadcrumbInWx } from '../utils'
import { WxClient } from '../wxClient'

type WxPagePluginMapType = Map<WxPageEvents, Partial<BasePluginType<WxEventTypes, WxClient>>>

const wxPagePluginMap: WxPagePluginMapType = new Map()
wxPagePluginMap.set(WxPageEvents.PageOnLoad, {
  transform() {},
  consumer(data: WxLifeCycleBreadcrumb) {
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.APP_ON_LAUNCH)
  }
})

wxPagePluginMap.set(WxPageEvents.PageOnShow, {
  transform(options: WechatMiniprogram.App.LaunchShowOption) {
    const { options: sdkOptions } = this
    sdkOptions.appOnShow(options)
    const data: WxLifeCycleBreadcrumb = {
      path: options.path,
      query: options.query
    }
    return data
  },
  consumer(data: WxLifeCycleBreadcrumb) {
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.APP_ON_SHOW)
  }
})

wxPagePluginMap.set(WxPageEvents.PageOnReady, {
  transform() {
    const { options: sdkOptions } = this
    sdkOptions.appOnHide()
  },
  consumer() {
    addBreadcrumbInWx.call(this, null, WxBreadcrumbTypes.APP_ON_HIDE)
  }
})

wxPagePluginMap.set(WxPageEvents.PageOnHide, {
  transform(options: WechatMiniprogram.App.LaunchShowOption) {
    const { options: sdkOptions } = this
    sdkOptions.appOnShow(options)
    const data: WxLifeCycleBreadcrumb = {
      path: options.path,
      query: options.query
    }
    return data
  },
  consumer(data: WxLifeCycleBreadcrumb) {
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.APP_ON_SHOW)
  }
})

function getWxPagePlugins() {
  if (!App) return []
  const methodHooks = Object.values(WxPageEvents)
  const plugins = methodHooks.map((method) => {
    return {
      name: method,
      monitor: function (notify) {
        const originApp = App
        App = function (appOptions: WechatMiniprogram.App.Option) {
          replaceOld(
            appOptions,
            method.replace('AppOn', 'on'),
            function (originMethod: voidFun) {
              return function (...args: any): void {
                // 让原本的函数比抛出的hooks先执行，便于埋点判断是否重复
                if (originMethod) {
                  originMethod.apply(this, args)
                }
                notify.apply(null, [method, ...args])
              }
            },
            true
          )
          return originApp(appOptions)
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
export { wxPagePluginMap }
export default wxPagePlugins
