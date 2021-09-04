import { HttpCollectedType, HttpTransformedType, IAnyObject, BaseClientType } from '@mitojs/types'
import { globalVar, HTTP_CODE, ErrorTypes, ToStringTypes, BREADCRUMBCATEGORYS } from '@mitojs/shared'
import { logger } from './logger'
import { nativeToString, variableTypeDetection } from './is'
import { fromHttpStatus, SpanStatus } from './httpStatus'
import { Severity } from './Severity'
import { getRealPath } from './errorId'
import { getLocationHref } from './helpers'
import { getBreadcrumbCategoryInBrowser } from './browser'
export function httpTransform(httpCollectedData: HttpCollectedType): HttpTransformedType {
  let message = ''
  const {
    request: { httpType, method, url },
    response: { status },
    elapsedTime
  } = httpCollectedData
  const name = `${httpType}--${method}`
  if (status === 0) {
    message =
      elapsedTime <= globalVar.crossOriginThreshold ? 'http请求失败，失败原因：跨域限制或域名不存在' : 'http请求失败，失败原因：超时'
  } else {
    message = fromHttpStatus(status)
  }
  message = message === SpanStatus.Ok ? message : `${message} ${getRealPath(url)}`
  return {
    ...httpCollectedData,
    type: ErrorTypes.HTTP,
    url: getLocationHref(),
    level: Severity.Low,
    message,
    name
  }
}

export function httpTransformedDataConsumer<T extends BaseClientType = BaseClientType>(this: T, transformedData: HttpTransformedType) {
  const type = BrowserBreadcrumbTypes.FETCH
  const {
    response: { status },
    time
  } = transformedData
  const isError = status === 0 || status === HTTP_CODE.BAD_REQUEST || status > HTTP_CODE.UNAUTHORIZED
  this.breadcrumb.push({
    type,
    category: getBreadcrumbCategoryInBrowser(type),
    data: { ...transformedData },
    level: Severity.Info,
    time
  })
  if (isError) {
    this.breadcrumb.push({
      type,
      category: BREADCRUMBCATEGORYS.EXCEPTION,
      data: { ...transformedData },
      level: Severity.Error,
      time
    })
    this.transport.send(transformedData, this.breadcrumb.getStack())
  }
}
