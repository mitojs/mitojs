import { BaseOptionsFieldsIntegrationType, IAnyObject, TransportDataType } from '@mitojs/types'

export interface WxRouteCollectType {
  from: string
  to: string
  isFail?: boolean
  message?: string
}

export interface WxOptionsFieldsTypes extends WxSilentOptionsType, WxHookOptionsType, BaseOptionsFieldsIntegrationType {}

export type IWxPageInstance = WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>

export interface WxSilentOptionsType {
  /**
   * 静默监控wx.request事件
   */
  silentRequest?: boolean
  /**
   * 静默监控wx.console事件
   */
  silentConsole?: boolean
  /**
   * 静默监控Dom事件
   */
  silentDom?: boolean
  /**
   * 静默监控Route切换事件
   */
  silentRoute?: boolean
  /**
   * 静默监控error事件
   */
  silentAppOnError?: boolean
  /**
   * 静默监控unhandledrejection事件
   */
  silentAppOnUnhandledRejection?: boolean

  /**
   * 静默监控onPageNotFound事件
   *
   * @type {boolean}
   * @memberof WxSilentOptionsType
   */
  silentAppOnPageNotFound?: boolean

  // silentAppOnLaunch?: boolean

  // slientAppOnShow?: boolean

  // slientAppOnHide?: boolean

  // silentWxOnShareAppMessage?: boolean
}

export interface WxHookOptionsType {
  /**
   * wx小程序上报时的wx.request配置
   */
  configReportWxRequest?(event: TransportDataType | any): Partial<WechatMiniprogram.RequestOption>
  /**
   * wx小程序的App下的onLaunch执行完后再执行以下hook
   */
  appOnLaunch?(options: WechatMiniprogram.App.LaunchShowOption): void
  /**
   * wx小程序的App下的OnShow执行完后再执行以下hook
   */
  appOnShow?(options: WechatMiniprogram.App.LaunchShowOption): void
  /**
   * wx小程序的App下的OnHide执行完后再执行以下hook
   */
  appOnHide?(page: IWxPageInstance): void
  /**
   * wx小程序的App下的onPageNotFound执行完后再执行以下hook
   */
  onPageNotFound?(data: WechatMiniprogram.OnPageNotFoundCallbackResult): void
  /**
   * 先执行hook:pageOnLoad再执行wx小程序的Page下的onShow
   */
  pageOnLoad?(page: IWxPageInstance): void
  /**
   * 先执行hook:pageOnShow再执行wx小程序的Page下的onShow
   */
  pageOnShow?(page: IWxPageInstance): void
  /**
   * 先执行hook:pageOnShow再执行wx小程序的Page下的onShow
   */
  pageOnReady?(page: IWxPageInstance): void
  /**
   * wx小程序的App下的pageOnUnload执行完后再执行以下hook
   */
  pageOnUnload?(page: IWxPageInstance): void
  /**
   * 先执行hook:pageOnHide再执行wx小程序的Page下的onHide
   */
  pageOnHide?(page: IWxPageInstance): void
  /**
   * 先执行hook:onShareAppMessage再执行wx小程序的Page下的onShareAppMessage
   */
  onShareAppMessage?(options: WechatMiniprogram.Page.IShareAppMessageOption & IWxPageInstance): void
  /**
   * 先执行hook:onShareTimeline再执行wx小程序的Page下的onShareTimeline
   */
  onShareTimeline?(page: IWxPageInstance): void
  /**
   * 先执行hook:onTabItemTap再执行wx小程序的Page下的onTabItemTap
   */
  onTabItemTap?(options: WechatMiniprogram.Page.ITabItemTapOption & IWxPageInstance): void
  /**
   * 重写wx.NavigateToMiniProgram将里面的参数抛出来，便于在跳转时更改query和extraData
   * @param options
   */
  wxNavigateToMiniProgram?(options: WechatMiniprogram.NavigateToMiniProgramOption): WechatMiniprogram.NavigateToMiniProgramOption
  /**
   * 代理Action中所有函数，拿到第一个参数并抛出成hook
   * @param e
   */
  triggerWxEvent?(e: WechatMiniprogram.BaseEvent): void
}

export interface WxOnShareAppMessageBreadcrumb {
  path: string
  query: IAnyObject
  options: WechatMiniprogram.Page.IShareAppMessageOption
}

export interface WxOnTabItemTapBreadcrumb {
  path: string
  query: IAnyObject
  options: WechatMiniprogram.Page.ITabItemTapOption
}

export interface WxRequestErrorBreadcrumb {
  requestOptions: WechatMiniprogram.RequestOption
  errMsg: string
}

export interface WxLifeCycleBreadcrumb {
  path: string
  query: IAnyObject
  //  是否需要更多的属性
  // referrerInfo: IAnyObject
  // scene: number
  // shareTicket: any
}
