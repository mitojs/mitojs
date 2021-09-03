import { ErrorTypes } from '@mitojs/shared'
import { BreadcrumbPushData } from './breadcrumb'
import { DeviceInfo, EActionType } from './track'

export interface AuthInfo {
  apikey?: string
  trackKey?: string
  sdkVersion: string
  sdkName: string
  trackerId: string
}

export interface TransportDataType {
  authInfo?: AuthInfo
  breadcrumb?: BreadcrumbPushData[]
  data?: FinalReportType
  record?: any[]
  deviceInfo?: DeviceInfo
}

export type FinalReportType = ReportDataType

export interface BaseTranformType {
  type?: ErrorTypes
  message?: string
  url: string
  time?: number
}

export interface HttpTransformed extends BaseTranformType {
  request?: {
    httpType?: string
    traceId?: string
    method: string
    url: string
    data: any
  }
  response?: {
    status: number
    data: string
  }
}

export interface ReportDataType extends HttpTransformed {
  name?: string
  stack?: any
  errorId?: number
  level: string
  // ajax
  elapsedTime?: number

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
