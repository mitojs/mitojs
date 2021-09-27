import { logger, Queue, isInclude, createErrorId, isEmpty, validateOptionsAndSet } from '@mitojs/utils'
import { SDK_NAME, SDK_VERSION, ToStringTypes } from '@mitojs/shared'
import { AuthInfo, BaseOptionsFieldsIntegrationType, BreadcrumbPushData, ReportDataType, TransportDataType } from '@mitojs/types'

/**
 * 传输数据抽象类
 *
 * @export
 * @abstract
 * @class BaseTransport
 * @template O
 */
export abstract class BaseTransport<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> {
  apikey = ''
  dsn = ''
  queue: Queue
  beforeDataReport: Promise<TransportDataType | null | undefined | boolean> | TransportDataType | any | null | undefined | boolean = null
  backTrackerId: unknown = null
  configReportUrl: unknown = null
  maxDuplicateCount = 3
  constructor() {
    this.queue = new Queue()
  }

  /**
   * 获取当前SDK信息
   *
   * @return {*}  {AuthInfo}
   * @memberof BaseTransport
   */
  getAuthInfo(): AuthInfo {
    const trackerId = this.getTrackerId()
    const result: AuthInfo = {
      trackerId: String(trackerId),
      sdkVersion: SDK_VERSION,
      sdkName: SDK_NAME,
      apikey: this.apikey
    }
    return result
  }

  /**
   * 获取hooks中返回的trackId，没有就返回''
   *
   * @return {*}  {(string | number)}
   * @memberof BaseTransport
   */
  getTrackerId(): string | number {
    if (typeof this.backTrackerId === 'function') {
      const trackerId = this.backTrackerId()
      if (typeof trackerId === 'string' || typeof trackerId === 'number') {
        return trackerId
      } else {
        logger.error(`trackerId:${trackerId} 期望 string 或 number 类型，但是传入 ${typeof trackerId}`)
      }
    }
    return ''
  }

  /**
   * 判断当前url是不是你配置的dsn
   *
   * @param {string} targetUrl
   * @return {*}  {boolean}
   * @memberof BaseTransport
   */
  isSelfDsn(targetUrl: string): boolean {
    return this.dsn && isInclude(targetUrl, this.dsn)
  }

  /**
   * 绑定配置项
   *
   * @param {Partial<O>} [options={}]
   * @memberof BaseTransport
   */
  bindOptions(options: Partial<O> = {}): void {
    const { dsn, beforeDataReport, apikey, maxDuplicateCount, backTrackerId, configReportUrl } = options
    const functionType = ToStringTypes.Function
    const optionArr = [
      [apikey, 'apikey', ToStringTypes.String],
      [dsn, 'dsn', ToStringTypes.String],
      [maxDuplicateCount, 'maxDuplicateCount', ToStringTypes.Number],
      [beforeDataReport, 'beforeDataReport', functionType],
      [backTrackerId, 'backTrackerId', functionType],
      [configReportUrl, 'configReportUrl', functionType]
    ]
    validateOptionsAndSet.call(this, optionArr)
  }

  /**
   * 发送数据到服务端
   *
   * @param {*} data
   * @param {BreadcrumbPushData[]} breadcrumb
   * @return {*}
   * @memberof BaseTransport
   */
  async send(data: any, breadcrumb: BreadcrumbPushData[] = []): Promise<void> {
    // 如果是埋点则不需要生成errorId
    if (!data.isTrack) {
      const errorId = createErrorId(data, this.apikey, this.maxDuplicateCount)
      if (!errorId) return
      data.errorId = errorId
    }
    let transportData = {
      ...this.getTransportData(data),
      breadcrumb
    }
    if (typeof this.beforeDataReport === 'function') {
      transportData = await this.beforeDataReport(transportData)
      if (!transportData) return
    }
    let dsn = this.dsn
    if (isEmpty(dsn)) {
      logger.error('dsn is empty,pass in when initializing please')
      return
    }
    if (typeof this.configReportUrl === 'function') {
      dsn = this.configReportUrl(transportData, dsn)
      if (!dsn) return
    }
    return this.sendToServer(transportData, dsn)
  }

  /**
   * post方式，子类需要重写
   *
   * @abstract
   * @param {(TransportDataType | any)} data
   * @param {string} url
   * @memberof BaseTransport
   */
  abstract post(data: TransportDataType | any, url: string): void
  /**
   * 最终上报到服务器的方法，需要子类重写
   *
   * @abstract
   * @param {(TransportDataType | any)} data
   * @param {string} url
   * @memberof BaseTransport
   */
  abstract sendToServer(data: TransportDataType | any, url: string): void
  /**
   * 获取上报的格式
   *
   * @abstract
   * @param {ReportDataType} data
   * @return {TransportDataType}  {TransportDataType}
   * @memberof BaseTransport
   */
  abstract getTransportData(data: ReportDataType): TransportDataType
}
