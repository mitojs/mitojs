import { Severity } from '@mitojs/utils'
import { ReportDataType } from './transport'
import { TNumStrObj } from './common'
import { BreadcrumbTypes } from '@mitojs/shared'
import { ConsoleCollectType, RouteChangeCollectType } from './basePluginType'

export interface BreadcrumbPushData {
  /**
   * 事件类型
   */
  type: BreadcrumbTypes
  // string for click dom
  data: ReportDataType | RouteChangeCollectType | ConsoleCollectType | TNumStrObj
  /**
   * 分为user action、debug、http、
   */
  category?: string
  time?: number
  level: Severity
}
