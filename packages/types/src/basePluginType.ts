import { EventTypes } from '@mitojs/shared'
import { BaseClientType } from './baseClientType'

export interface BasePluginType<T extends EventTypes = EventTypes, C extends BaseClientType = BaseClientType> {
  // 事件枚举
  name: T
  // 监控事件，并在该事件中用notify通知订阅中心
  monitor: (this: C, notify: (eventName: T, data: any) => void) => void
  // 在monitor中触发数据并将数据传入当前函数，拿到数据做数据格式转换(会将tranform放入Subscrib的handers)
  transform?: (this: C, collectedData: any) => any
  // 拿到转换后的数据进行breadcrumb、report等等操作
  consumer?: (this: C, transformedData: any) => void
}

export interface RouteChangeCollectType {
  from: string
  to: string
}

export interface ConsoleCollectType {
  args: any[]
  level: string
}
