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
   * 静默监控Xhr事件
   */
  silentRequest: boolean
  /**
   * 静默监控console事件
   */
  silentConsole: boolean
  /**
   * 静默监控Dom事件
   */
  silentDom: boolean
  /**
   * 静默监控小小程序Route切换
   */
  silentMiniRoute: boolean
  /**
   * 静默监控error事件
   */
  silentError: boolean
  /**
   * 静默监控unhandledrejection事件
   */
  silentUnhandledrejection: boolean
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
      silentMiniRoute,
      silentError,
      silentUnhandledrejection
    } = options
    // silent type
    const booleanOptions = [
      [silentRequest, 'silentRequest'],
      [silentConsole, 'silentConsole'],
      [silentDom, 'silentDom'],
      [silentMiniRoute, 'silentMiniRoute'],
      [silentError, 'silentError'],
      [silentUnhandledrejection, 'silentUnhandledrejection']
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
