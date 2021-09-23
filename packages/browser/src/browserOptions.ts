import { BaseOptions } from '@mitojs/core'
import { ToStringTypes } from '@mitojs/shared'
import { validateOptionsAndSet } from '@mitojs/utils'
import { BrowserOptionsFieldsTypes } from './types'

export class BrowserOptions extends BaseOptions<BrowserOptionsFieldsTypes> {
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
      configReportXhr
    } = options
    const booleanType = ToStringTypes.Boolean
    const optionArr = [
      [silentXhr, 'silentXhr', booleanType],
      [silentFetch, 'silentFetch', booleanType],
      [silentConsole, 'silentConsole', booleanType],
      [silentDom, 'silentDom', booleanType],
      [silentHistory, 'silentHistory', booleanType],
      [silentError, 'silentError', booleanType],
      [silentHashchange, 'silentHashchange', booleanType],
      [silentUnhandledrejection, 'silentUnhandledrejection', booleanType],
      [useImgUpload, 'useImgUpload', booleanType],
      [configReportXhr, 'configReportXhr', ToStringTypes.Function]
    ]
    validateOptionsAndSet.call(this, optionArr)
  }
}
