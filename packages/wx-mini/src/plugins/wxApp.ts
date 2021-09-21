import { WxAppEvents, WxBreadcrumbTypes, WxEventTypes } from '@mitojs/shared'
import { BasePluginType, voidFun } from '@mitojs/types'
import { replaceOld } from '@mitojs/utils'
import { WxLifeCycleBreadcrumb } from '../types'
import { addBreadcrumbInWx } from '../utils'
import { WxClient } from '../wxClient'

type WxAppPluginMapType = Map<WxAppEvents, Partial<BasePluginType<WxEventTypes, WxClient>>>

const wxAppPluginMap: WxAppPluginMapType = new Map()
wxAppPluginMap.set(WxAppEvents.AppOnShow, {
  transform(options: WechatMiniprogram.App.LaunchShowOption) {
    const { options: sdkOptions } = this
    sdkOptions.appOnLaunch(options)
    const data: WxLifeCycleBreadcrumb = {
      path: options.path,
      query: options.query
    }
    return data
  },
  consumer(data: WxLifeCycleBreadcrumb) {
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.APP_ON_LAUNCH)
  }
})

function getWxAppPlugins() {
  if (!App) return []
  const wxAppPlugins: BasePluginType<WxEventTypes, WxClient>[] = []
  const originApp = App
  App = function (appOptions: WechatMiniprogram.App.Option) {
    const methodHooks = Object.values(WxAppEvents)
    methodHooks.forEach((method) => {
      const plugin: BasePluginType<WxEventTypes, WxClient> = {
        name: method,
        monitor: function (notify) {
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
        }
      }
      wxAppPlugins.push(plugin)
    })
    return originApp(appOptions)
  } as WechatMiniprogram.App.Constructor
  return wxAppPlugins
}

const wxAppPlugins = getWxAppPlugins()
console.log('wxAppPlugins', wxAppPlugins)
export { wxAppPluginMap }
export default wxAppPlugins
