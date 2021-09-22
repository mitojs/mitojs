import { ErrorTypes } from '@mitojs/shared'
import { BreadcrumbPushData } from './breadcrumb'
import { HttpTransformedType } from './http'
import { DeviceInfo } from './wx'

/**
 * SDK版本信息、apikey、trackerId
 *
 * @export
 * @interface AuthInfo
 */
export interface AuthInfo {
  apikey?: string
  sdkVersion: string
  sdkName: string
  trackerId?: string
}

export interface TransportDataType {
  authInfo?: AuthInfo
  breadcrumb?: BreadcrumbPushData[]
  data?: ReportDataType
  record?: any[]
  deviceInfo?: DeviceInfo
}

export interface BaseTransformType {
  type?: ErrorTypes
  message?: string
  time?: number
  name?: string
  level?: string
  url: string
}

export interface ReportDataType extends Partial<HttpTransformedType> {
  stack?: any
  errorId?: number
  // vue
  componentName?: string
  propsData?: any
  // logError 手动报错 MITO.log
  customTag?: string
}

// export interface TrackReportData extends ICommonDataType {
//   // uuid
//   id?: string
//   // 埋点code 一般由人为传进来，可以自定义规范
//   trackId?: string
//   // 埋点类型
//   actionType: EActionType
//   // 埋点开始时间
//   startTime?: number
//   // 埋点停留时间
//   durationTime?: number
//   // 上报时间
//   trackTime?: number
// }

// export function isReportDataType(data: ReportDataType | TrackReportData): data is ReportDataType {
//   return (<TrackReportData>data).actionType === undefined && !data.isTrackData
// }
