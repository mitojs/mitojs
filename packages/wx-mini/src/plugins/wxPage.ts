import { WxPageEvents, WxBreadcrumbTypes, WxEventTypes } from '@mitojs/shared'
import { BasePluginType, voidFun } from '@mitojs/types'
import { firstStrtoLowerCase, isEmptyObject, replaceOld } from '@mitojs/utils'
import { WxLifeCycleBreadcrumb, WxOnShareAppMessageBreadcrumb, WxOnTabItemTapBreadcrumb } from '../types'
import { addBreadcrumbInWx, getCurrentPagesPop } from '../utils'
import { WxClient } from '../wxClient'

type WxPagePluginMapType = Map<WxPageEvents, Partial<BasePluginType<WxEventTypes, WxClient>>>

/**
 * 执行init传入的hook，没有携带参数options
 *
 * @param {WxClient} this
 * @param {WxPageEvents} hook
 * @return {*}
 */
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

/**
 * 执行init传入的hook
 *
 * @param {WxClient} this
 * @param {WxPageEvents} hook
 * @return {*}
 */
function pageHookTransformWithOptions(this: WxClient, hook: WxPageEvents, options: any) {
  const page = getCurrentPagesPop()
  const { options: sdkOptions } = this
  sdkOptions[firstStrtoLowerCase(hook)](options, page)
  return {
    path: page?.route,
    query: page?.options,
    options
  }
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
    return pageHookTransform.call(this, WxPageEvents.PageOnUnload)
  },
  consumer(data: WxLifeCycleBreadcrumb) {
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.PAGE_ON_UNLOAD)
  }
})

wxPagePluginMap.set(WxPageEvents.PageOnShareTimeline, {
  transform(options: WechatMiniprogram.Page.IShareAppMessageOption) {
    return pageHookTransformWithOptions.call(this, WxPageEvents.PageOnShareTimeline, options)
  },
  consumer(data: WxLifeCycleBreadcrumb) {
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.PAGE_ON_SHARE_TIMELINE)
  }
})

wxPagePluginMap.set(WxPageEvents.PageOnShareAppMessage, {
  transform(options: WechatMiniprogram.Page.IShareAppMessageOption) {
    return pageHookTransformWithOptions.call(this, WxPageEvents.PageOnShareAppMessage, options)
  },
  consumer(data: WxOnShareAppMessageBreadcrumb) {
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.PAGE_ON_SHARE_APP_MESSAGE)
  }
})

wxPagePluginMap.set(WxPageEvents.PageOnTabItemTap, {
  transform(options: WechatMiniprogram.Page.ITabItemTapOption) {
    return pageHookTransformWithOptions.call(this, WxPageEvents.PageOnTabItemTap, options)
  },
  consumer(data: WxOnTabItemTapBreadcrumb) {
    addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.PAGE_ON_TAB_ITEM_TAP)
  }
})

function getWxPagePlugins() {
  if (!Page) return []
  const pageHooks = [
    WxPageEvents.PageOnLoad,
    WxPageEvents.PageOnReady,
    WxPageEvents.PageOnShow,
    WxPageEvents.PageOnUnload,
    WxPageEvents.PageOnHide,
    WxPageEvents.PageOnShareAppMessage,
    WxPageEvents.PageOnShareTimeline,
    WxPageEvents.PageOnTabItemTap
  ]
  const plugins = pageHooks.map((hook) => {
    return {
      name: hook,
      monitor: function (notify) {
        function monitorPageHookWithOptions(
          options:
            | WechatMiniprogram.Page.Options<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption>
            | WechatMiniprogram.Component.MethodOption
        ) {
          replaceOld(
            options,
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
        }
        invokeCallbackInReplacePage((pageOptions) => {
          monitorPageHookWithOptions(pageOptions)
        })
        invokeCallbackInReplaceComponent((componentOptions) => {
          monitorPageHookWithOptions(componentOptions)
        })
      }
    }
  }) as BasePluginType<WxPageEvents, WxClient>[]
  return plugins.map((item) => {
    return {
      ...item,
      ...(wxPagePluginMap.has(item.name) ? wxPagePluginMap.get(item.name) : {})
    }
  })
}

export function invokeCallbackInReplacePage(
  callback: (
    pageOptions:
      | WechatMiniprogram.Page.Options<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption>
      | WechatMiniprogram.Component.MethodOption
  ) => void
) {
  const originPage = Page
  Page = function (pageOptions) {
    callback(pageOptions)
    return originPage(pageOptions)
  }
}

// 重写Component
export function invokeCallbackInReplaceComponent(
  callback: (
    pageOptions:
      | WechatMiniprogram.Page.Options<WechatMiniprogram.Page.DataOption, WechatMiniprogram.Page.CustomOption>
      | WechatMiniprogram.Component.MethodOption
  ) => void
) {
  if (!Component) {
    return
  }
  const originComponent = Component
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Component = function (componentOptions): WechatMiniprogram.Component.Constructor {
    if (!isEmptyObject(componentOptions.methods)) {
      /*
       * 兼容用Component构造页面的上报
       * 当用Component构造页面时，页面的生命周期函数应写在methods定义段中，所以重写componentOptions.methods中的对应周期函数
       */
      callback(componentOptions.methods)
    }
    return originComponent.call(this, componentOptions)
  }
}

const wxPagePlugins = getWxPagePlugins()
export default wxPagePlugins
