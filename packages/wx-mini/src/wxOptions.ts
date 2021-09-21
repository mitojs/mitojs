import { BaseOptions } from '@mitojs/core'
import { ToStringTypes } from '@mitojs/shared'
import { toStringValidateOption } from '@mitojs/utils'
import { WxOptionsFieldsTypes } from './types'

export class WxOptions extends BaseOptions<WxOptionsFieldsTypes> {
  // wx-mini
  appOnLaunch: Function = () => {}
  appOnShow: Function = () => {}
  appOnHide: Function = () => {}
  onPageNotFound: Function = () => {}
  pageOnLoad: Function = () => {}
  pageOnShow: Function = () => {}
  pageOnReady: Function = () => {}
  pageOnHide: Function = () => {}
  pageOnUnload: Function = () => {}
  onShareAppMessage: Function = () => {}
  onShareTimeline: Function = () => {}
  onTabItemTap: Function = () => {}
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
      triggerWxEvent
    } = options
    toStringValidateOption(beforeAppAjaxSend, 'beforeAppAjaxSend', ToStringTypes.Function) && (this.beforeAppAjaxSend = beforeAppAjaxSend)
    // wx-mini hooks
    toStringValidateOption(appOnLaunch, 'appOnLaunch', ToStringTypes.Function) && (this.appOnLaunch = appOnLaunch)
    toStringValidateOption(appOnShow, 'appOnShow', ToStringTypes.Function) && (this.appOnShow = appOnShow)
    toStringValidateOption(appOnHide, 'appOnHide', ToStringTypes.Function) && (this.appOnHide = appOnHide)
    toStringValidateOption(pageOnLoad, 'pageOnLoad', ToStringTypes.Function) && (this.pageOnLoad = pageOnLoad)
    toStringValidateOption(pageOnReady, 'pageOnReady', ToStringTypes.Function) && (this.pageOnReady = pageOnReady)
    toStringValidateOption(pageOnShow, 'pageOnShow', ToStringTypes.Function) && (this.pageOnShow = pageOnShow)
    toStringValidateOption(pageOnUnload, 'pageOnUnload', ToStringTypes.Function) && (this.pageOnUnload = pageOnUnload)
    toStringValidateOption(pageOnHide, 'pageOnHide', ToStringTypes.Function) && (this.pageOnHide = pageOnHide)
    toStringValidateOption(onPageNotFound, 'onPageNotFound', ToStringTypes.Function) && (this.onPageNotFound = onPageNotFound)
    toStringValidateOption(onShareAppMessage, 'onShareAppMessage', ToStringTypes.Function) && (this.onShareAppMessage = onShareAppMessage)
    toStringValidateOption(onShareTimeline, 'onShareTimeline', ToStringTypes.Function) && (this.onShareTimeline = onShareTimeline)
    toStringValidateOption(onTabItemTap, 'onTabItemTap', ToStringTypes.Function) && (this.onTabItemTap = onTabItemTap)
    toStringValidateOption(wxNavigateToMiniProgram, 'wxNavigateToMiniProgram', ToStringTypes.Function) &&
      (this.wxNavigateToMiniProgram = wxNavigateToMiniProgram)
    toStringValidateOption(triggerWxEvent, 'triggerWxEvent', ToStringTypes.Function) && (this.triggerWxEvent = triggerWxEvent)
  }
}
