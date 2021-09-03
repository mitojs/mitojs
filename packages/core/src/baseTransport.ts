import { _support, logger, Queue, isInclude, toStringValidateOption, createErrorId, isEmpty } from '@mitojs/utils'
import { SDK_NAME, SDK_VERSION, ToStringTypes } from '@mitojs/shared'
import { AuthInfo, BaseOptionsFieldsIntegrationType, BreadcrumbPushData, ReportDataType, TransportDataType } from '@mitojs/types'
/**
 * 用来传输数据类，包含img标签、xhr请求
 * 功能：支持img请求和xhr请求、可以断点续存（保存在localstorage），
 * 待开发：目前不需要断点续存，因为接口不是很多，只有错误时才触发，如果接口太多可以考虑合并接口、
 *
 * ../class Transport
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
  isSelfDsn(targetUrl: string): boolean {
    return this.dsn && isInclude(targetUrl, this.dsn)
  }
  bindOptions(options: Partial<O> = {}): void {
    const { dsn, beforeDataReport, apikey, maxDuplicateCount, backTrackerId, configReportUrl } = options
    toStringValidateOption(apikey, 'apikey', ToStringTypes.String) && (this.apikey = apikey)
    toStringValidateOption(dsn, 'dsn', ToStringTypes.String) && (this.dsn = dsn)
    toStringValidateOption(maxDuplicateCount, 'maxDuplicateCount', ToStringTypes.Number) && (this.maxDuplicateCount = maxDuplicateCount)
    toStringValidateOption(beforeDataReport, 'beforeDataReport', ToStringTypes.Function) && (this.beforeDataReport = beforeDataReport)
    toStringValidateOption(backTrackerId, 'backTrackerId', ToStringTypes.Function) && (this.backTrackerId = backTrackerId)
    toStringValidateOption(configReportUrl, 'configReportUrl', ToStringTypes.Function) && (this.configReportUrl = configReportUrl)
  }
  async send(data: any, breadcrumb: BreadcrumbPushData[]) {
    const errorId = createErrorId(data, this.apikey, this.maxDuplicateCount)
    if (!errorId) return false
    data.errorId = errorId
    let transportData = {
      ...this.getTransportData(data),
      breadcrumb
    }
    if (typeof this.beforeDataReport === 'function') {
      transportData = await this.beforeDataReport(transportData)
      if (!transportData) return false
    }
    let dsn = this.dsn
    if (isEmpty(dsn)) {
      logger.error('dsn为空，没有传入监控错误上报的dsn地址，请在init中传入')
      return
    }
    if (typeof this.configReportUrl === 'function') {
      dsn = this.configReportUrl(transportData, dsn)
      if (!dsn) return
    }
    this.sendToServer(data, dsn)
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
   * 最终上报到服务器的方法
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
