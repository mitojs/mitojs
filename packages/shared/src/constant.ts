import { BrowserBreadcrumbTypes, BrowserEventTypes } from './browser'
import { WxAppEvents, WxBreadcrumbTypes, WxEventTypes, WxPageEvents, WxRouteEvents } from './wx'

/**
 * 上报错误类型
 */
export enum ErrorTypes {
  UNKNOWN = 'UNKNOWN',
  UNKNOWN_FUNCTION = 'UNKNOWN_FUNCTION',
  JAVASCRIPT_ERROR = 'JAVASCRIPT_ERROR',
  LOG_ERROR = 'LOG_ERROR',
  FETCH_ERROR = 'HTTP_ERROR',
  VUE_ERROR = 'VUE_ERROR',
  REACT_ERROR = 'REACT_ERROR',
  RESOURCE_ERROR = 'RESOURCE_ERROR',
  PROMISE_ERROR = 'PROMISE_ERROR',
  ROUTE_ERROR = 'ROUTE_ERROR'
}

/**
 * 微信小程序钩子重写类型整合
 */
export type WxEvents = WxAppEvents | WxPageEvents | WxRouteEvents

/**
 * 用户行为栈事件类型
 */
export type BreadcrumbTypes = BrowserBreadcrumbTypes | WxBreadcrumbTypes

export const BreadcrumbTypes = {
  ...BrowserBreadcrumbTypes,
  ...WxBreadcrumbTypes
}

/**
 * 用户行为类型
 */
export enum BREADCRUMBCATEGORYS {
  HTTP = 'http',
  USER = 'user',
  DEBUG = 'debug',
  EXCEPTION = 'exception',
  LIFECYCLE = 'lifecycle'
}

/**
 * 所有重写事件类型整合
 */
export type EventTypes = BrowserEventTypes | WxEventTypes

export enum HttpTypes {
  XHR = 'xhr',
  FETCH = 'fetch'
}

export enum MethodTypes {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE'
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_EXCEPTION = 500
}

export enum ToStringTypes {
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  RegExp = 'RegExp',
  Null = 'Null',
  Undefined = 'Undefined',
  Symbol = 'Symbol',
  Object = 'Object',
  Array = 'Array',
  process = 'process',
  Window = 'Window',
  Function = 'Function'
}

export const ERROR_TYPE_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/
const globalVar = {
  isLogAddBreadcrumb: true,
  crossOriginThreshold: 1000
}
export { globalVar }
