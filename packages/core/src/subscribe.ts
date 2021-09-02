import { EVENTTYPES, WxEvents } from '@mitojs/shared'
import { getFlag, getFunctionName, logger, nativeTryCatch, setFlag } from '@mitojs/utils'
export interface ReplaceHandler {
  type: EVENTTYPES | WxEvents
  callback: ReplaceCallback
}

type ReplaceCallback = (data: any) => void

const handlers: { [key in EVENTTYPES]?: ReplaceCallback[] } = {}

export function subscribeEvent(handler: ReplaceHandler): boolean {
  // remove this
  if (!handler || getFlag(handler.type)) return false
  setFlag(handler.type, true)
  handlers[handler.type] = handlers[handler.type] || []
  handlers[handler.type].push(handler.callback)
  return true
}

export function triggerHandlers(type: EVENTTYPES | WxEvents, data: any): void {
  if (!type || !handlers[type]) return
  handlers[type].forEach((callback) => {
    nativeTryCatch(
      () => {
        callback(data)
      },
      (e: Error) => {
        logger.error(`重写事件triggerHandlers的回调函数发生错误\nType:${type}\nName: ${getFunctionName(callback)}\nError: ${e}`)
      }
    )
  })
}

export default class Subscrib<T> {
  dep: Map<T, ReplaceCallback[]> = new Map()
  constructor() {}
  watch(eventName: T, callBack: (data: any) => any) {
    const fns = this.dep.get(eventName)
    if (fns) {
      this.dep.set(eventName, fns.concat(callBack))
      return
    }
    this.dep.set(eventName, [callBack])
  }
  notify<D>(eventName: T, data: D) {
    const fns = this.dep.get(eventName)
    if (!eventName || !fns) return
    fns.forEach((fn) => {
      nativeTryCatch(
        () => {
          fn(data)
        },
        (e: Error) => {
          logger.error(`重写事件triggerHandlers的回调函数发生错误\neventName:${eventName}\nName: ${getFunctionName(fn)}\nError: ${e}`)
        }
      )
    })
  }
}
