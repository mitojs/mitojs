import { TrackActionType } from '@mitojs/shared'

export interface DeviceInfo {
  //网络类型: 4g,3g,5g,wifi
  netType: string
  clientWidth: number
  clientHeight: number
  // 像素密度倍率(计算屏幕实际宽高 可使用此参数： 例 height = clientHeight * radio)
  ratio: number
}

/**
 * 埋点需要上传的类型，以下是一些预定义的类型，可自己传入
 * 配合该SDK提供的hooks可二次开发定制自己的埋点sdk
 *
 * @export
 * @interface TrackReportDataType
 */
export interface TrackReportDataType {
  // uuid
  id?: string
  // 埋点code 一般由人为传进来，可以自定义规范
  trackId?: string
  // 埋点类型，可扩展
  actionType?: TrackActionType | any
  // 埋点开始时间
  startTime?: number
  // 埋点停留时间
  durationTime?: number
  // 上报时间
  trackTime?: number
  // 不需要重写，默认为true，表示埋点类型的上报，不用进行errorId生成
  isTrack?: boolean
  // anything for developer
  [key: string]: any
}
