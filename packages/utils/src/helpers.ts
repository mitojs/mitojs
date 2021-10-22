import { IAnyObject } from '@mitojs/types'
import { globalVar, ToStringTypes } from '@mitojs/shared'
import { logger } from './logger'
import { nativeToString, variableTypeDetection } from './is'
import { isWxMiniEnv, isBrowserEnv } from './global'

export function getLocationHref(): string {
  if (typeof document === 'undefined' || document.location == null) return ''
  return document.location.href
}

export function getUrlWithEnv(): string {
  if (isWxMiniEnv) return getCurrentRoute()
  if (isBrowserEnv) return getLocationHref()
  return ''
}

// 用到所有事件的名称
type TotalEventName = keyof GlobalEventHandlersEventMap | keyof XMLHttpRequestEventTargetEventMap | keyof WindowEventMap

/**
 * 添加事件监听器
 *
 * @export
 * @param {{ addEventListener: Function }} target 目标对象
 * @param {TotalEventName} eventName 目标对象上的事件名
 * @param {Function} handler 回调函数
 * @param {(boolean | unknown)} [opitons=false] useCapture默认为false
 */
export function on(
  target: { addEventListener: Function },
  eventName: TotalEventName,
  handler: Function,
  opitons: boolean | unknown = false
): void {
  target.addEventListener(eventName, handler, opitons)
}

/**
 * 重写对象上面的某个属性
 *
 * @export
 * @param {IAnyObject} source 需要被重写的对象
 * @param {string} name 需要被重写对象的key
 * @param {(...args: any[]) => any} replacement 以原有的函数作为参数，执行并重写原有函数
 * @param {boolean} [isForced=false] 是否强制重写（可能原先没有该属性）
 */
export function replaceOld(source: IAnyObject, name: string, replacement: (...args: any[]) => any, isForced = false): void {
  if (source === undefined) return
  if (name in source || isForced) {
    const original = source[name]
    const wrapped = replacement(original)
    if (typeof wrapped === 'function') {
      source[name] = wrapped
    }
  }
}

/**
 * 用&分割对象，返回a=1&b=2
 * ../param obj 需要拼接的对象
 */
// export function splitObjToQuery(obj: Record<string, unknown>): string {
//   return Object.entries(obj).reduce((result, [key, value], index) => {
//     if (index !== 0) {
//       result += '&'
//     }
//     const valueStr = variableTypeDetection.isObject(value) || variableTypeDetection.isArray(value) ? JSON.stringify(value) : value
//     result += `${key}=${valueStr}`
//     return result
//   }, '')
// }

export const defaultFunctionName = '<anonymous>'
/**
 * 需要获取函数名，匿名则返回<anonymous>
 * ../param {unknown} fn 需要获取函数名的函数本体
 * ../returns 返回传入的函数的函数名
 */
export function getFunctionName(fn: unknown): string {
  if (!fn || typeof fn !== 'function') {
    return defaultFunctionName
  }
  return fn.name || defaultFunctionName
}

// 函数防抖
/**
 *
 * ../param fn 需要防抖的函数
 * ../param delay 防抖的时间间隔
 * ../param isImmediate 是否需要立即执行，默认为false，第一次是不执行的
 * ../returns 返回一个包含防抖功能的函数
 */
// export const debounce = (fn: voidFun, delay: number, isImmediate = false): voidFun => {
//   let timer = null
//   return function (...args: any) {
//     if (isImmediate) {
//       fn.apply(this, args)
//       isImmediate = false
//       return
//     }
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.apply(this, args)
//     }, delay)
//   }
// }

/**
 * 函数节流
 *
 * @export
 * @param {Function} fn 需要节流的函数
 * @param {number} delay 节流的时间间隔
 * @return {*}  {Function} 返回一个包含节流功能的函数
 */
export function throttle(fn: Function, delay: number): Function {
  let canRun = true
  return function (...args: any) {
    if (!canRun) return
    fn.apply(this, args)
    canRun = false
    setTimeout(() => {
      canRun = true
    }, delay)
  }
}

/**
 * 原子字符中是否包含目标字符
 *
 * @export
 * @param {string} origin 原字符
 * @param {string} target 目标字符
 * @return {*}  {boolean}
 */
export function isInclude(origin: string, target: string): boolean {
  return !!~origin.indexOf(target)
}

/**
 * 获取当前的时间戳
 *
 * @export
 * @return {*}  {number}
 */
export function getTimestamp(): number {
  return Date.now()
}

export function toStringAny(target: any, type: ToStringTypes): boolean {
  return nativeToString.call(target) === `[object ${type}]`
}

export function toStringValidateOption(target: any, targetName: string, expectType: ToStringTypes): boolean {
  if (toStringAny(target, expectType)) return true
  typeof target !== 'undefined' && logger.error(`${targetName}期望传入:${expectType}类型，当前是:${nativeToString.call(target)}类型`)
  return false
}

/**
 * 如果用户输入console，并且logger是打开的会造成无限递归，执行callback前，会把监听console的行为关掉
 *
 * @export
 * @param {Function} callback
 */
export function silentConsoleScope(callback: Function) {
  globalVar.isLogAddBreadcrumb = false
  callback()
  globalVar.isLogAddBreadcrumb = true
}

export function generateUUID(): string {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

export function unknownToString(target: unknown): string {
  if (variableTypeDetection.isString(target)) {
    return target as string
  }
  if (variableTypeDetection.isUndefined(target)) {
    return 'undefined'
  }
  return JSON.stringify(target)
}

export function getBigVersion(version: string) {
  return Number(version.split('.')[0])
}

/**
 * 给url添加query
 * @param url
 * @param query
 */
export function setUrlQuery(url: string, query: object) {
  const queryArr = []
  Object.keys(query).forEach((k) => {
    queryArr.push(`${k}=${query[k]}`)
  })
  if (url.indexOf('?') !== -1) {
    url = `${url}&${queryArr.join('&')}`
  } else {
    url = `${url}?${queryArr.join('&')}`
  }
  return url
}

export function interceptStr(str: string, interceptLength: number): string {
  if (variableTypeDetection.isString(str)) {
    return str.slice(0, interceptLength) + (str.length > interceptLength ? `;slice the first ${interceptLength} characters` : '')
  }
  return ''
}

/**
 * 获取wx当前route的方法
 * 必须是在进入Page或Component构造函数内部才能够获取到currentPages
 * 否则都是在注册Page和Component时执行的代码，此时url默认返回'App'
 */
export function getCurrentRoute() {
  if (!variableTypeDetection.isFunction(getCurrentPages)) {
    return ''
  }
  const pages = getCurrentPages() // 在App里调用该方法，页面还没有生成，长度为0
  if (!pages.length) {
    return 'App'
  }
  const currentPage = pages.pop()
  return setUrlQuery(currentPage.route, currentPage.options)
}

/**
 *将传入的字符串的首字母改为大写，其他不变
 *
 * @export
 * @param {string} str 原字符
 * @return {*}  {string}
 * @example xhr => Xhr
 */
export function firstStrtoUppercase(str: string): string {
  return str.replace(/\b(\w)(\w*)/g, function ($0: string, $1: string, $2: string) {
    return `${$1.toUpperCase()}${$2}`
  })
}

/**
 *将传入的字符串的首字母改为小写，其他不变
 *
 * @export
 * @param {string} str 原字符
 * @return {*}  {string}
 * @example Xhr => xhr
 */
export function firstStrtoLowerCase(str: string): string {
  return str.replace(/\b(\w)(\w*)/g, function ($0: string, $1: string, $2: string) {
    return `${$1.toLowerCase()}${$2}`
  })
}

/**
 * 安全的转换对象，包括循环引用，如果是循环引用就返回Circular
 *
 * @export
 * @param {object} obj 需要转换的对象
 * @return {*}  {string}
 */
export function safeStringify(obj: object): string {
  const set = new Set()
  const str = JSON.stringify(obj, function (_key, value) {
    if (set.has(value)) {
      return 'Circular'
    }
    typeof value === 'object' && set.add(value)
    return value
  })
  set.clear()
  return str
}

/**
 * 解决Vue3抛出的proxy对象循环引用的问题
 *
 * @export
 * @template T
 * @param {IAnyObject} obj
 * @return {*}  {T}
 */
export function getObjectWithForIn<T = IAnyObject>(obj: IAnyObject): T {
  if (!variableTypeDetection.isObject(obj)) return obj as unknown as T
  const result = {}
  for (const key in obj) {
    result[key] = obj[key]
  }
  return result as T
}

export function validateOptionsAndSet(this: any, targetArr: [any, string, ToStringTypes][]) {
  targetArr.forEach(
    ([target, targetName, expectType]) => toStringValidateOption(target, targetName, expectType) && (this[targetName] = target)
  )
}

export function sleepRun(fn: () => void, delay = 200) {
  setTimeout(() => {
    fn()
  }, delay)
}
