import { Severity } from '@mitojs/utils'
import { HttpCollectedType } from './http'

export type voidFun = () => void

export interface IAnyObject {
  [key: string]: any
}

export interface ResourceErrorTarget {
  src?: string
  href?: string
  localName?: string
}

export interface MITOXMLHttpRequest extends XMLHttpRequest {
  [key: string]: any
  httpCollect?: HttpCollectedType
}

export interface ErrorStack {
  args: any[]
  func: string
  column: number
  line: number
  url: string
}

export interface WxParsedErrorType {
  message: string
  name: string
  stack: ErrorStack[]
}

export type TNumStrObj = number | string | object

export interface LocalStorageValue<T = any> {
  expireTime?: number
  value: T | string
}

export interface LogTypes {
  message?: TNumStrObj
  tag?: TNumStrObj
  level?: Severity
  ex?: Error | any
}
