import { BaseOptions } from '@mitojs/core'
import { ToStringTypes } from '@mitojs/shared'
import { validateOptionsAndSet } from '@mitojs/utils'
import { WxOptionsFieldsTypes } from './types'

export class WxOptions extends BaseOptions<WxOptionsFieldsTypes> {
  // wx-mini lifecycle
  // App
  appOnLaunch: Function = () => {}
  appOnShow: Function = () => {}
  appOnHide: Function = () => {}
  //Page
  pageOnLoad: Function = () => {}
  pageOnShow: Function = () => {}
  pageOnReady: Function = () => {}
  pageOnHide: Function = () => {}
  pageOnUnload: Function = () => {}
  onPageNotFound: Function = () => {}
  onShareAppMessage: Function = () => {}
  onShareTimeline: Function = () => {}
  onTabItemTap: Function = () => {}
  // silent options
  /**
   * 静默监控wx.request事件
   */
  silentRequest: boolean
  /**
   * 静默监控wx.console事件
   */
  silentConsole: boolean
  /**
   * 静默监控Dom事件
   */
  silentDom: boolean
  /**
   * 静默监控小小程序Route切换
   */
  silentRoute: boolean
  /**
   * 静默监控error事件
   */
  silentAppOnError: boolean
  /**
   * 静默监控unhandledrejection事件
   */
  silentAppOnUnhandledRejection: boolean
  /**
   * 静默监控onPageNotFound事件
   *
   * @type {boolean}
   * @memberof WxOptions
   */
  silentAppOnPageNotFound: boolean
  // need return opitons，so defaul value is undefined
  wxNavigateToMiniProgram: Function
  triggerWxEvent: Function = () => {}
  constructor(options: WxOptionsFieldsTypes) {
    super()
    super.bindOptions(options)
    this.bindOptions(options)
  }
  bindOptions(options: WxOptionsFieldsTypes) {
    const {
      beforeAppAjaxSend,
      appOnLaunch,
      appOnShow,
      appOnHide,
      pageOnLoad,
      pageOnReady,
      pageOnShow,
      pageOnUnload,
      pageOnHide,
      onPageNotFound,
      onShareAppMessage,
      onShareTimeline,
      onTabItemTap,
      wxNavigateToMiniProgram,
      triggerWxEvent,
      silentRequest,
      silentConsole,
      silentDom,
      silentRoute,
      silentAppOnError,
      silentAppOnUnhandledRejection,
      silentAppOnPageNotFound
    } = options
    const booleanType = ToStringTypes.Boolean
    const functionType = ToStringTypes.Function
    const optionArr = [
      // silent type
      [silentRequest, 'silentRequest', booleanType],
      [silentConsole, 'silentConsole', booleanType],
      [silentDom, 'silentDom', booleanType],
      [silentRoute, 'silentRoute', booleanType],
      [silentAppOnError, 'silentAppOnError', booleanType],
      [silentAppOnUnhandledRejection, 'silentAppOnUnhandledRejection', booleanType],
      [silentAppOnPageNotFound, 'silentAppOnPageNotFound', booleanType],
      // mito hooks
      [beforeAppAjaxSend, 'beforeAppAjaxSend', functionType],
      // wx-mini hooks
      [appOnLaunch, 'appOnLaunch', functionType],
      [appOnShow, 'appOnShow', functionType],
      [appOnHide, 'appOnHide', functionType],
      [pageOnLoad, 'pageOnLoad', functionType],
      [pageOnReady, 'pageOnReady', functionType],
      [pageOnShow, 'pageOnShow', functionType],
      [pageOnUnload, 'pageOnUnload', functionType],
      [pageOnHide, 'pageOnHide', functionType],
      [onPageNotFound, 'onPageNotFound', functionType],
      [onShareAppMessage, 'onShareAppMessage', functionType],
      [onShareTimeline, 'onShareTimeline', functionType],
      [onTabItemTap, 'onTabItemTap', functionType],
      [wxNavigateToMiniProgram, 'wxNavigateToMiniProgram', functionType],
      [triggerWxEvent, 'triggerWxEvent', functionType]
    ]
    validateOptionsAndSet.call(this, optionArr)
  }
}
