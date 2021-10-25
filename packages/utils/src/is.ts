import { ToStringTypes } from '@mitojs/shared'

export const nativeToString = Object.prototype.toString
export function isType(type: string) {
  return function (value: any): boolean {
    return nativeToString.call(value) === `[object ${type}]`
  }
}

/**
 * 检测变量类型
 * @param type
 */
export const variableTypeDetection = {
  isNumber: isType(ToStringTypes.Number),
  isString: isType(ToStringTypes.String),
  isBoolean: isType(ToStringTypes.Boolean),
  isNull: isType(ToStringTypes.Null),
  isUndefined: isType(ToStringTypes.Undefined),
  isSymbol: isType(ToStringTypes.Symbol),
  isFunction: isType(ToStringTypes.Function),
  isObject: isType(ToStringTypes.Object),
  isArray: isType(ToStringTypes.Array),
  isProcess: isType(ToStringTypes.process),
  isWindow: isType(ToStringTypes.Window)
}

/**
 * Checks whether given value's type is one of a few Error or Error-like
 * {../link isError}.
 *
 * ../param wat A value to be checked.
 * ../returns A boolean representing the result.
 */
export function isError(wat: any): boolean {
  switch (nativeToString.call(wat)) {
    case '[object Error]':
      return true
    case '[object Exception]':
      return true
    case '[object DOMException]':
      return true
    default:
      return isInstanceOf(wat, Error)
  }
}

/**
 * 检查是否是空对象
 *
 * @export
 * @param {Object} obj 待检测的对象
 * @return {*}  {boolean}
 */
export function isEmptyObject(obj: Object): boolean {
  return variableTypeDetection.isObject(obj) && Object.keys(obj).length === 0
}

/**
 * 检测是否是空字符、undefined、null
 *
 * @export
 * @param {*} wat
 * @return {*}  {boolean}
 */
export function isEmpty(wat: any): boolean {
  return (variableTypeDetection.isString(wat) && wat.trim() === '') || wat === undefined || wat === null
}

/**
 * Checks whether given value's type is an instance of provided constructor.
 * {../link isInstanceOf}.
 *
 * ../param wat A value to be checked.
 * ../param base A constructor to be used in a check.
 * ../returns A boolean representing the result.
 */
export function isInstanceOf(wat: any, base: any): boolean {
  try {
    // tslint:disable-next-line:no-unsafe-any
    return wat instanceof base
  } catch (_e) {
    return false
  }
}

export function isExistProperty(obj: Object, key: string | number | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
