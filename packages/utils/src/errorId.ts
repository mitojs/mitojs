import { ReportDataType } from '@mitojs/types'
import { BrowserEventTypes, ErrorTypes } from '@mitojs/shared'
import { variableTypeDetection } from './is'
const allErrorNumber: unknown = {}
/**
 * generate error unique Id
 * @param data
 */
export function createErrorId(data: ReportDataType, apikey: string, maxDuplicateCount: number): number | null {
  let id: any
  switch (data.type) {
    case ErrorTypes.HTTP:
      id = data.type + data.request.method + data.response.status + getRealPath(data.request.url) + apikey
      break
    case ErrorTypes.JAVASCRIPT:
    case ErrorTypes.VUE:
    case ErrorTypes.REACT:
      id = data.type + data.name + data.message + apikey
      break
    case ErrorTypes.LOG:
      id = data.customTag + data.type + data.name + apikey
      break
    case ErrorTypes.PROMISE:
      id = generatePromiseErrorId(data, apikey)
      break
    default:
      id = data.type + data.message + apikey
      break
  }
  id = hashCode(id)
  if (allErrorNumber[id] >= maxDuplicateCount) {
    return null
  }
  if (typeof allErrorNumber[id] === 'number') {
    allErrorNumber[id]++
  } else {
    allErrorNumber[id] = 1
  }

  return id
}
/**
 * 如果是UNHANDLEDREJECTION，则按照项目主域名来生成
 * 如果是其他的，按照当前页面来生成
 * @param data
 * @param originUrl
 */
function generatePromiseErrorId(data: ReportDataType, apikey: string) {
  const locationUrl = getRealPath(data.url)
  if (data.name === BrowserEventTypes.UNHANDLEDREJECTION) {
    return data.type + objectOrder(data.message) + apikey
  }
  return data.type + data.name + objectOrder(data.message) + locationUrl
}

/**
 * sort object keys
 * ../param reason promise.reject
 */
function objectOrder(reason: any) {
  const sortFn = (obj: any) => {
    return Object.keys(obj)
      .sort()
      .reduce((total, key) => {
        if (variableTypeDetection.isObject(obj[key])) {
          total[key] = sortFn(obj[key])
        } else {
          total[key] = obj[key]
        }
        return total
      }, {})
  }
  try {
    if (/\{.*\}/.test(reason)) {
      let obj = JSON.parse(reason)
      obj = sortFn(obj)
      return JSON.stringify(obj)
    }
  } catch (error) {
    return reason
  }
}

/**
 * http://.../project?id=1#a => http://.../project
 * http://.../id/123=> http://.../id/{param}
 *
 * @param url
 */
export function getRealPath(url: string): string {
  return url.replace(/[\?#].*$/, '').replace(/\/\d+([\/]*$)/, '{param}$1')
}

/**
 *
 * @param url
 */
export function getFlutterRealOrigin(url: string): string {
  // for apple
  return removeHashPath(getFlutterRealPath(url))
}

/**
 * 获取flutter的原始地址：每个用户的文件夹hash不同
 * @param url
 */
export function getFlutterRealPath(url: string): string {
  // for apple
  return url.replace(/(\S+)(\/Documents\/)(\S*)/, `$3`)
}

export function removeHashPath(url: string): string {
  return url.replace(/(\S+)(\/#\/)(\S*)/, `$1`)
}

export function hashCode(str: string): number {
  let hash = 0
  if (str.length == 0) return hash
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash
}
