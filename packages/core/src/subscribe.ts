import { getFunctionName, logger, nativeTryCatch } from '@mitojs/utils'

type MonitorCallback = (data: any) => void
/**
 * 发布订阅类
 *
 * @export
 * @class Subscribe
 * @template T 事件枚举
 */
export class Subscribe<T> {
  dep: Map<T, MonitorCallback[]> = new Map()
  constructor() {}
  watch(eventName: T, callBack: (data: any) => any) {
    const fns = this.dep.get(eventName)
    if (fns) {
      this.dep.set(eventName, fns.concat(callBack))
      return
    }
    this.dep.set(eventName, [callBack])
  }
  notify<D = any>(eventName: T, data: D) {
    const fns = this.dep.get(eventName)
    if (!eventName || !fns) return
    fns.forEach((fn) => {
      nativeTryCatch(
        () => {
          fn(data)
        },
        (e: Error) => {
          logger.error(`Subscribe.notify：监听事件的回调函数发生错误\neventName:${eventName}\nName: ${getFunctionName(fn)}\nError: ${e}`)
        }
      )
    })
  }
}
