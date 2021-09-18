import { ErrorTypes, WxBreadcrumbTypes, WxEventTypes, WxRouteEvents } from '@mitojs/shared'
import { getBreadcrumbCategoryInWx, getCurrentRoute, Severity, variableTypeDetection } from '@mitojs/utils'
import { BasePluginType, ReportDataType } from '@mitojs/types'
import { getNavigateBackTargetUrl } from '../utils'
import { WxClient } from '../wxClient'
import { WxRouteCollectType } from '../types'
import { BREADCRUMBCATEGORYS } from '@mitojs/browser/dist/packages/shared'

interface WxRouteTransformType {
  data: ReportDataType
  collectedData: WxRouteCollectType
}

const wxRoutePlugins: BasePluginType<WxEventTypes, WxClient> = {
  name: WxEventTypes.MINI_ROUTE,
  monitor(notify) {
    monitorWxRoute.call(this, notify)
  },
  transform(collectedData: WxRouteCollectType) {
    const reportData: ReportDataType = {
      type: ErrorTypes.ROUTE,
      message: collectedData.message,
      url: collectedData.to,
      name: 'MINI_' + ErrorTypes.ROUTE,
      level: Severity.Error
    }
    return reportData
  },
  consumer(transformedData: WxRouteTransformType) {
    const { data, collectedData } = transformedData
    const breadcrumbType = WxBreadcrumbTypes.ROUTE
    if (collectedData.isFail) {
      const breadcrumbStack = this.breadcrumb.push({
        type: breadcrumbType,
        category: BREADCRUMBCATEGORYS.EXCEPTION,
        data: transformedData,
        level: Severity.Error
      })
      return this.transport.send(data, breadcrumbStack)
    }
    this.breadcrumb.push({
      type: breadcrumbType,
      category: getBreadcrumbCategoryInWx(breadcrumbType),
      data: collectedData,
      level: Severity.Info
    })
  }
}

export function monitorWxRoute(this: WxClient, notify: (eventName: WxEventTypes, data: any) => void) {
  const { options: wxOptions } = this
  const methods = [
    WxRouteEvents.SwitchTab,
    WxRouteEvents.ReLaunch,
    WxRouteEvents.RedirectTo,
    WxRouteEvents.NavigateTo,
    WxRouteEvents.NavigateBack,
    WxRouteEvents.NavigateToMiniProgram
  ]
  methods.forEach((method) => {
    const originMethod = wx[method] as Function
    Object.defineProperty(wx, method, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function (
        options:
          | WechatMiniprogram.SwitchTabOption
          | WechatMiniprogram.ReLaunchOption
          | WechatMiniprogram.RedirectToOption
          | WechatMiniprogram.NavigateToOption
          | WechatMiniprogram.NavigateBackOption
          | WechatMiniprogram.NavigateToMiniProgramOption
      ) {
        let toUrl
        if (method === WxRouteEvents.NavigateBack) {
          toUrl = getNavigateBackTargetUrl((options as WechatMiniprogram.NavigateBackOption)?.delta)
        } else {
          toUrl = (options as WechatMiniprogram.SwitchTabOption).url
        }
        const data = {
          from: getCurrentRoute(),
          to: toUrl
        }
        notify(WxEventTypes.MINI_ROUTE, data)
        // 如果complete||success||fail一个都没有，则原方法返回promise，此时sdk也不需要处理
        if (
          variableTypeDetection.isFunction(options.complete) ||
          variableTypeDetection.isFunction(options.success) ||
          variableTypeDetection.isFunction(options.fail)
        ) {
          const _fail = options.fail
          const failHandler:
            | WechatMiniprogram.SwitchTabFailCallback
            | WechatMiniprogram.ReLaunchFailCallback
            | WechatMiniprogram.RedirectToFailCallback
            | WechatMiniprogram.NavigateToFailCallback
            | WechatMiniprogram.NavigateBackFailCallback = function (res) {
            const failData: WxRouteCollectType = {
              ...data,
              isFail: true,
              message: res.errMsg
            }
            notify(WxEventTypes.MINI_ROUTE, failData)
            if (variableTypeDetection.isFunction(_fail)) {
              return _fail(res)
            }
          }
          options.fail = failHandler
        }
        if (method === WxRouteEvents.NavigateToMiniProgram && variableTypeDetection.isFunction(wxOptions.wxNavigateToMiniProgram)) {
          options = wxOptions.wxNavigateToMiniProgram(options)
        }
        return originMethod.call(this, options)
      }
    })
  })
}

export default wxRoutePlugins
