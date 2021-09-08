import { BrowserEventTypes } from '@mitojs/shared'
import { BaseOptionsFieldsIntegrationType, VueInstance } from '@mitojs/types'

// silentOption 对应  browserEventType
export type silentMapToBrowserEventType = Record<silentBrowserEventType, BrowserEventTypes>

type silentBrowserEventType = keyof BrowsersilentOptionsType
export interface BrowserOptionsFieldsTypes extends BrowsersilentOptionsType, BaseOptionsFieldsIntegrationType, BrowserOptionsHooksType {
  /**
   * 使用img上报的方式，默认为false，默认是xhr的上报方式
   */
  useImgUpload?: boolean

  /**
   *
   * Vue根实例（写在 ）
   * @type {VueInstance}
   * @memberof BrowserOptionsFieldsTypes
   */
  vue?: VueInstance
}

/**
 *browser silent event types
 *
 * @interface BrowsersilentOptionsType
 */
export interface BrowsersilentOptionsType {
  /**
   * 静默监控Xhr事件
   */
  silentXhr?: boolean
  /**
   * 静默监控fetch事件
   */
  silentFetch?: boolean
  /**
   * 静默监控console事件
   */
  silentConsole?: boolean
  /**
   * 静默监控Dom事件
   */
  silentDom?: boolean
  /**
   * 静默监控history事件
   */
  silentHistory?: boolean
  /**
   * 静默监控error事件
   */
  silentError?: boolean
  /**
   * 静默监控unhandledrejection事件
   */
  silentUnhandledrejection?: boolean
  /**
   * 静默监控hashchange事件
   */
  silentHashchange?: boolean
}

export interface BrowserOptionsHooksType {
  /**
   * 钩子函数，配置发送到服务端的xhr
   * 可以对当前xhr实例做一些配置：xhr.setRequestHeader()、xhr.withCredentials
   * 会在xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')、
   * xhr.withCredentials = true,后面调用该函数
   * ../param xhr XMLHttpRequest的实例
   */
  configReportXhr?(xhr: XMLHttpRequest, reportData: any): void
}
