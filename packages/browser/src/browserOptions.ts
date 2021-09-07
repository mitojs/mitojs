import { BaseOptions } from '@mitojs/core'
import { ToStringTypes } from '@mitojs/shared'
import { toStringValidateOption } from '@mitojs/utils'
import { VueInstance } from 'packages/types/src'
import { BrowserOptionsFieldsTypes } from './types'

export default class BrowserOptions extends BaseOptions<BrowserOptionsFieldsTypes> {
  /**
   * 静默监控xhr事件
   */
  silentXhr: boolean
  /**
   * 静默监控fetch事件
   */
  silentFetch: boolean
  /**
   * 静默监控console事件
   */
  silentConsole: boolean
  /**
   * 静默监控Dom事件
   */
  silentDom: boolean
  /**
   * 静默监控history事件
   */
  silentHistory: boolean
  /**
   * 静默监控error事件
   */
  silentError: boolean
  /**
   * 静默监控unhandledrejection事件
   */
  silentUnhandledrejection: boolean
  /**
   * 静默监控hashchange事件
   */
  silentHashchange: boolean

  /**
   * 传入Vue根实例
   *
   * @type {VueInstance}
   * @memberof BrowserOptions
   */
  vue: VueInstance = null
  useImgUpload: boolean
  configReportXhr: unknown = null
  constructor(options: BrowserOptionsFieldsTypes) {
    super()
    super.bindOptions(options)
    this.bindOptions(options)
  }
  bindOptions(options: BrowserOptionsFieldsTypes) {
    const {
      silentXhr,
      silentFetch,
      silentConsole,
      silentDom,
      silentHistory,
      silentError,
      silentHashchange,
      silentUnhandledrejection,
      useImgUpload,
      configReportXhr,
      vue
    } = options
    toStringValidateOption(silentXhr, 'silentXhr', ToStringTypes.Boolean) && (this.silentXhr = silentXhr)
    toStringValidateOption(silentFetch, 'silentFetch', ToStringTypes.Boolean) && (this.silentFetch = silentFetch)
    toStringValidateOption(silentConsole, 'silentConsole', ToStringTypes.Boolean) && (this.silentConsole = silentConsole)
    toStringValidateOption(silentDom, 'silentDom', ToStringTypes.Boolean) && (this.silentDom = silentDom)
    toStringValidateOption(silentHistory, 'silentHistory', ToStringTypes.Boolean) && (this.silentHistory = silentHistory)
    toStringValidateOption(silentError, 'silentError', ToStringTypes.Boolean) && (this.silentError = silentError)
    toStringValidateOption(silentHashchange, 'silentHashchange', ToStringTypes.Boolean) && (this.silentHashchange = silentXhr)
    toStringValidateOption(silentUnhandledrejection, 'silentUnhandledrejection', ToStringTypes.Boolean) &&
      (this.silentUnhandledrejection = silentUnhandledrejection)
    toStringValidateOption(useImgUpload, 'useImgUpload', ToStringTypes.Boolean) && (this.useImgUpload = useImgUpload)
    this.vue = vue
    toStringValidateOption(configReportXhr, 'configReportXhr', ToStringTypes.Function) && (this.configReportXhr = configReportXhr)
  }
}
