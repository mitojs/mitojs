import { _support, logger, Queue, isInclude, toStringValidateOption } from '@mitojs/utils'
import { SDK_NAME, SDK_VERSION, ToStringTypes } from '@mitojs/shared'
import { AuthInfo, BaseOptionsFieldsIntegrationType } from '@mitojs/types'
/**
 * 用来传输数据类，包含img标签、xhr请求
 * 功能：支持img请求和xhr请求、可以断点续存（保存在localstorage），
 * 待开发：目前不需要断点续存，因为接口不是很多，只有错误时才触发，如果接口太多可以考虑合并接口、
 *
 * ../class Transport
 */
export default abstract class BaseTransport<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> {
  apikey = ''
  dsn = ''
  queue: Queue
  beforeDataReport: unknown = null
  backTrackerId: unknown = null
  configReportUrl: unknown = null

  constructor(options: O) {
    this.queue = new Queue()
    this.bindOptions(options)
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
    const { dsn, beforeDataReport, apikey, backTrackerId, configReportUrl } = options
    toStringValidateOption(apikey, 'apikey', ToStringTypes.String) && (this.apikey = apikey)
    toStringValidateOption(dsn, 'dsn', ToStringTypes.String) && (this.dsn = dsn)
    toStringValidateOption(beforeDataReport, 'beforeDataReport', ToStringTypes.Function) && (this.beforeDataReport = beforeDataReport)
    toStringValidateOption(backTrackerId, 'backTrackerId', ToStringTypes.Function) && (this.backTrackerId = backTrackerId)
    toStringValidateOption(configReportUrl, 'configReportUrl', ToStringTypes.Function) && (this.configReportUrl = configReportUrl)
  }
  abstract post(data: any, url: string): void
}
