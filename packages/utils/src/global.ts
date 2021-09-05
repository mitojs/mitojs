import { EventTypes } from '@mitojs/shared'
import { Logger } from './logger'
import { variableTypeDetection } from './is'
import { DeviceInfo } from '@mitojs/types'

/**
 *MITO的全局变量
 *
 * @export
 * @interface MitoSupport
 */
export interface MitoSupport {
  logger: Logger
  replaceFlag: { [key in EventTypes]?: boolean }
  record?: any[]
  deviceInfo?: DeviceInfo
  track?: any
}

interface MITOGlobal {
  console?: Console
  __MITO__?: MitoSupport
}

// export const isNodeEnv = variableTypeDetection.isProcess(typeof process !== 'undefined' ? process : 0)

// export const isWxMiniEnv =
//   variableTypeDetection.isObject(typeof wx !== 'undefined' ? wx : 0) &&
//   variableTypeDetection.isFunction(typeof App !== 'undefined' ? App : 0)

// export const isBrowserEnv = variableTypeDetection.isWindow(typeof window !== 'undefined' ? window : 0)
/**
 * 获取全局变量
 *
 * ../returns Global scope object
 */
// export function getGlobal<T>() {
//   if (isBrowserEnv) return window as unknown as MITOGlobal & T
//   if (isWxMiniEnv) return wx as unknown as MITOGlobal & T
//   if (isNodeEnv) return process as unknown as MITOGlobal & T
// }

const _global = window as unknown as MITOGlobal & Window
// const _wx = getGlobal<>()
const _support = getGlobalMitoSupport()

/**
 * 获取全部变量__MITO__的引用地址
 *
 * @return {*}  {MitoSupport}
 */
function getGlobalMitoSupport(): MitoSupport {
  _global.__MITO__ = _global.__MITO__ || ({} as MitoSupport)
  return _global.__MITO__
}

export { _global, _support }

_support.replaceFlag = _support.replaceFlag || {}
const replaceFlag = _support.replaceFlag
export function setFlag(replaceType: EventTypes, isSet: boolean): void {
  if (replaceFlag[replaceType]) return
  replaceFlag[replaceType] = isSet
}

export function getFlag(replaceType: EventTypes): boolean {
  return replaceFlag[replaceType] ? true : false
}

export function supportsHistory(): boolean {
  // borrowed from: https://github.com/angular/angular.js/pull/13945/files
  const chrome = (_global as any).chrome
  const isChromePackagedApp = chrome && chrome.app && chrome.app.runtime
  const hasHistoryApi = 'history' in _global && !!_global.history.pushState && !!_global.history.replaceState
  return !isChromePackagedApp && hasHistoryApi
}
