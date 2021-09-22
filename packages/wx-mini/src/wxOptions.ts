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
    // silent type
    const booleanOptions = [
      [silentRequest, 'silentRequest'],
      [silentConsole, 'silentConsole'],
      [silentDom, 'silentDom'],
      [silentRoute, 'silentRoute'],
      [silentAppOnError, 'silentAppOnError'],
      [silentAppOnUnhandledRejection, 'silentAppOnUnhandledRejection'],
      [silentAppOnPageNotFound, 'silentAppOnPageNotFound']
    ]
    validateOptionsAndSet.call(this, booleanOptions, ToStringTypes.Boolean)
    const functionOptions = [
      // mito hooks
      [beforeAppAjaxSend, 'beforeAppAjaxSend'],
      // wx-mini hooks
      [appOnLaunch, 'appOnLaunch'],
      [appOnShow, 'appOnShow'],
      [appOnHide, 'appOnHide'],
      [pageOnLoad, 'pageOnLoad'],
      [pageOnReady, 'pageOnReady'],
      [pageOnShow, 'pageOnShow'],
      [pageOnUnload, 'pageOnUnload'],
      [pageOnHide, 'pageOnHide'],
      [onPageNotFound, 'onPageNotFound'],
      [onShareAppMessage, 'onShareAppMessage'],
      [onShareTimeline, 'onShareTimeline'],
      [onTabItemTap, 'onTabItemTap'],
      [wxNavigateToMiniProgram, 'wxNavigateToMiniProgram'],
      [triggerWxEvent, 'triggerWxEvent']
    ]
    validateOptionsAndSet.call(this, functionOptions, ToStringTypes.Function)
  }
}
