import { Queue } from '@mitojs/utils'

interface BaseTransportType {
  /**
   *请求地址
   *
   * @type {string}
   * @memberof BaseTransportType
   */
  dsn: string
  /**
   *请求队列
   *
   * @type {Queue}
   * @memberof BaseTransportType
   */
  queue: Queue

  /**
   * 项目的唯一标识符
   *
   * @type {string}
   * @memberof BaseTransportType
   */
  apikey: string
  /**
   *
   *
   * @type {unknown}
   * @memberof BaseTransportType
   */
  backTrackerId: unknown
  beforeDataReport: unknown
  configReportUrl: unknown

  getTrackerId(): string | number

  post?<T>(data: T, url: string): void
}
