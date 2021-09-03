import { Severity } from '@mitojs/utils'
import { ReportDataType } from './transport'
import { Replace } from './replace'
import { TNumStrObj } from './common'
import { BreadcrumbTypes } from '@mitojs/shared'

export interface BreadcrumbPushData {
  /**
   * 事件类型
   */
  type: BreadcrumbTypes
  // string for click dom
  data: ReportDataType | BreadcrumbRouterItemType | BreadcrumConsoleItemType | TNumStrObj
  /**
   * 分为user action、debug、http、
   */
  category?: string
  time?: number
  level: Severity
}

export interface BreadcrumbRouterItemType {
  from: string
  to: string
}

export interface BreadcrumConsoleItemType {
  args: any[]
  level: string
}
