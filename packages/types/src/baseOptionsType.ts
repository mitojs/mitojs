import { BreadcrumbPushData, TransportDataType } from '@mitojs/types'
import { Breadcrumb } from '@mitojs/core'
type CANCEL = null | undefined | boolean

type TSetRequestHeader = (key: string, value: string) => {}
export interface IBeforeAppAjaxSendConfig {
  setRequestHeader: TSetRequestHeader
}

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS'

interface IRequestHeaderConfig {
  url: HttpMethod
  method: string
}
export interface BaseOptionsType<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType>
  extends BaseOptionsFieldsIntegrationType {
  bindOptions(options: O): void
}

export type BaseOptionsFieldsIntegrationType = BaseOptionsFieldsType & BaseOptionsHooksType

export interface BaseOptionsFieldsType {
  /**
   * 上报接口的地址
   */
  dsn?: string
  /**
   * 为true时，整个sdk将禁用
   */
  disabled?: boolean
  /**
   * 每个项目有一个唯一key，给监控的dsn用的
   */
  apikey?: string
  /**
   * 默认为关闭，为true是会打印一些信息：breadcrumb
   */
  debug?: boolean
  /**
   * 默认是关闭traceId，开启时，页面的所有请求都会生成一个unique id，放入请求头中
   */
  enableTraceId?: boolean
  /**
   * 如果开启了enableTraceId,也需要配置该配置项，includeHttpUrlTraceIdRegExp.test(xhr.url)为true时，才会在该请求头中添加traceId
   * 由于考虑部分接口如果随便加上多余的请求头会造成跨域，所以这边用的是包含关系的正则
   */
  includeHttpUrlTraceIdRegExp?: RegExp
  /**
   * traceId放入请求头中的key，默认是Trace-Id
   */
  traceIdFieldName?: string
  /**
   * 默认为空，所有ajax都会被监听，不为空时，filterXhrUrlRegExp.test(xhr.url)为true时过滤
   */
  filterXhrUrlRegExp?: RegExp
  /**
   * 默认20，最大100，超过100还是设置成100
   */
  maxBreadcrumbs?: number
  /**
   * 按钮点击和微信触摸事件节流时间，默认是0
   */
  throttleDelayTime?: number
  /**
   * 最多可重复上报同一个错误的次数
   */
  maxDuplicateCount?: number
}

export interface BaseOptionsHooksType {
  /**
   * 钩子函数，在每次发送事件前会调用
   *
   * ../param event 有SDK生成的错误事件
   * ../returns 如果返回 null | undefined | boolean 时，将忽略本次上传
   */
  beforeDataReport?(event: TransportDataType): Promise<TransportDataType | null | CANCEL> | TransportDataType | any | CANCEL | null
  /**
   *
   * 钩子函数，每次发送前都会调用
   * @param {TransportDataType} event 上报的数据格式
   * @param {string} url 上报到服务端的地址
   * @returns {string} 返回空时不上报
   * @memberof HooksTypes
   */
  configReportUrl?(event: TransportDataType, url: string): string
  /**
   * 钩子函数，在每次添加用户行为事件前都会调用
   *
   * ../param breadcrumb 由SDK生成的breacrumb事件栈
   * ../param hint 当次的生成的breadcrumb数据
   * ../returns 如果返回 null | undefined | boolean 时，将忽略本次的push
   */
  beforePushBreadcrumb?(breadcrumb: Breadcrumb, hint: BreadcrumbPushData): BreadcrumbPushData | CANCEL
  /**
   * 在状态小于400并且不等于0的时候回调用当前hook
   * ../param data 请求状态为200时返回的响应体
   * ../returns 如果返回 null | undefined | boolean 时，将忽略本次的上传
   */
  // afterSuccessHttp?<T>(data: T): string | CANCEL
  /**
   * 钩子函数，拦截用户页面的ajax请求，并在ajax请求发送前执行该hook，可以对用户发送的ajax请求做xhr.setRequestHeader
   * ../param config 当前请求的
   */
  beforeAppAjaxSend?(config: IRequestHeaderConfig, setRequestHeader: IBeforeAppAjaxSendConfig): void

  /**
   * 钩子函数，在beforeDataReport后面调用，在整合上报数据和本身SDK信息数据前调用，当前函数执行完后立即将数据错误信息上报至服务端
   * trackerId表示用户唯一键（可以理解成userId），需要trackerId的意义可以区分每个错误影响的用户数量
   */
  backTrackerId?(): string | number
}
