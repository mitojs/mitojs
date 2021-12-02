import { ErrorTypes, WxAppEvents, WxBreadcrumbTypes, WxEventTypes } from '@mitojs/shared'
import { BasePluginType, ReportDataType, voidFun } from '@mitojs/types'
import {
  extractErrorStack,
  getCurrentRoute,
  getTimestamp,
  isError,
  logger,
  parseErrorString,
  replaceOld,
  Severity,
  unknownToString,
  _support
} from '@mitojs/utils'
import { WxLifeCycleBreadcrumb } from '../types'
import { addBreadcrumbInWx, getWxMiniDeviceInfo } from '../utils'
import { WxClient } from '../wxClient'

type WxAppPluginMapType = Map<WxAppEvents, Partial<BasePluginType<WxEventTypes, WxClient>>>

const wxAppPluginMap: WxAppPluginMapType = new Map()
wxAppPluginMap.set(WxAppEvents.AppOnLaunch, {
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

wxAppPluginMap.set(WxAppEvents.AppOnShow, {
  transform(options: WechatMiniprogram.App.LaunchShowOption) {
    const { options: sdkOptions } = this
    sdkOptions.appOnShow(options)
    const data: WxLifeCycleBreadcrumb = {
      path: options.path,
      query: options.query
    }
    return data
  },
  async consumer(data: WxLifeCycleBreadcrumb) {
    _support.deviceInfo = await getWxMiniDeviceInfo()
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.APP_ON_SHOW)
  }
})

wxAppPluginMap.set(WxAppEvents.AppOnHide, {
  transform() {
    const { options: sdkOptions } = this
    sdkOptions.appOnHide()
  },
  consumer() {
    addBreadcrumbInWx.call(this, null, WxBreadcrumbTypes.APP_ON_HIDE)
  }
})

wxAppPluginMap.set(WxAppEvents.AppOnError, {
  transform(error: string | Error) {
    let data: Partial<ReportDataType> = {
      type: ErrorTypes.JAVASCRIPT,
      time: getTimestamp(),
      level: Severity.Normal,
      url: getCurrentRoute()
    }
    if (typeof error === 'string') {
      const parsedError = parseErrorString(error)
      data = {
        ...parsedError,
        ...data
      }
    } else if (isError(error)) {
      data = {
        ...extractErrorStack(error, Severity.Normal),
        ...data
      }
    } else {
      logger.error("AppOnError params isn't string or error")
    }
    return data
  },
  consumer(transformedData: ReportDataType) {
    const breadcrumbStack = addBreadcrumbInWx.call(this, transformedData, WxBreadcrumbTypes.CODE_ERROR, Severity.Error)
    this.transport.send(transformedData, breadcrumbStack)
  }
})

wxAppPluginMap.set(WxAppEvents.AppOnPageNotFound, {
  transform(data: WechatMiniprogram.OnPageNotFoundCallbackResult) {
    const { options: sdkOptions } = this
    sdkOptions.appOnPageNotFound(data)
    return data
  },
  consumer(data: WechatMiniprogram.OnPageNotFoundCallbackResult) {
    // 不发送，因为会被其他AppOnUnhandledRejection捕捉到
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.ROUTE, Severity.Error)
  }
})

wxAppPluginMap.set(WxAppEvents.AppOnUnhandledRejection, {
  transform(ev: WechatMiniprogram.OnUnhandledRejectionCallbackResult) {
    let data: ReportDataType = {
      type: ErrorTypes.PROMISE,
      message: unknownToString(ev.reason),
      url: getCurrentRoute(),
      name: WxBreadcrumbTypes.UNHANDLEDREJECTION,
      time: getTimestamp(),
      level: Severity.Low
    }
    if (isError(ev.reason)) {
      data = {
        ...data,
        ...extractErrorStack(ev.reason, Severity.Low),
        url: getCurrentRoute()
      }
    }
    return data
  },
  consumer(transformedData: ReportDataType) {
    const breadcrumbStack = addBreadcrumbInWx.call(this, transformedData, WxBreadcrumbTypes.UNHANDLEDREJECTION, Severity.Error)
    this.transport.send(transformedData, breadcrumbStack)
  }
})

function getWxAppPlugins() {
  if (!App) return []
  const methodHooks = [
    WxAppEvents.AppOnLaunch,
    WxAppEvents.AppOnShow,
    WxAppEvents.AppOnHide,
    WxAppEvents.AppOnPageNotFound,
    WxAppEvents.AppOnError,
    WxAppEvents.AppOnUnhandledRejection
  ]
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
  }) as BasePluginType<WxAppEvents, WxClient>[]
  return plugins.map((item) => {
    return {
      ...item,
      ...(wxAppPluginMap.has(item.name) ? wxAppPluginMap.get(item.name) : {})
    }
  })
}

const wxAppPlugins = getWxAppPlugins()
export { wxAppPluginMap }
export default wxAppPlugins
