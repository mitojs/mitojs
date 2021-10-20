import { ErrorTypes, WxBaseEventTypes, WxBreadcrumbTypes, WxEventTypes, WxRouteEvents } from '@mitojs/shared'
import { getCurrentRoute, Severity, variableTypeDetection } from '@mitojs/utils'
import { BasePluginType, ReportDataType } from '@mitojs/types'
import { addBreadcrumbInWx, getNavigateBackTargetUrl } from '../utils'
import { WxClient } from '../wxClient'
import { WxRouteCollectType } from '../types'

interface WxRouteTransformType {
  data: ReportDataType
  collectedData: WxRouteCollectType
}

const wxRoutePlugin: BasePluginType<WxEventTypes, WxClient> = {
  name: WxBaseEventTypes.ROUTE,
  monitor(notify) {
    monitorWxRoute.call(this, notify)
  },
  transform(collectedData: WxRouteCollectType): WxRouteTransformType {
    const reportData: ReportDataType = {
      type: ErrorTypes.ROUTE,
      message: collectedData.message,
      url: collectedData.to,
      name: 'MINI_' + ErrorTypes.ROUTE,
      level: Severity.Error
    }
    return {
      data: reportData,
      collectedData
    }
  },
  consumer(transformedData: WxRouteTransformType) {
    const { data, collectedData } = transformedData
    if (collectedData.isFail) {
      const breadcrumbStack = addBreadcrumbInWx.call(this, collectedData, WxBreadcrumbTypes.CODE_ERROR, Severity.Error)
      return this.transport.send(data, breadcrumbStack)
    }
    addBreadcrumbInWx.call(this, collectedData, WxBreadcrumbTypes.ROUTE)
  }
}

export function monitorWxRoute(this: WxClient, notify: (eventName: WxBaseEventTypes, data: any) => void) {
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
        notify(WxBaseEventTypes.ROUTE, data)
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
            // 拿到跳转失败的信息
            notify(WxBaseEventTypes.ROUTE, failData)
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

export default wxRoutePlugin
