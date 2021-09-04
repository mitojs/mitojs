import { HttpTypes } from '@mitojs/shared'
import { BaseTransformType } from './transport'

export interface HttpCollectedType {
  request: {
    httpType?: HttpTypes
    traceId?: string
    method?: string
    url?: string
    data?: any
  }
  response: {
    status?: number
    data?: any
  }
  // for wx
  errMsg?: string
  elapsedTime?: number
  time?: number
}

export interface HttpTransformedType extends HttpCollectedType, BaseTransformType {}
