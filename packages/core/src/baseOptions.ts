import { ToStringTypes } from '@mitojs/shared'
import { BaseOptionsFieldsIntegrationType, BaseOptionsType } from '@mitojs/types'
import { generateUUID, toStringValidateOption } from '@mitojs/utils'

export class BaseOptions<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> implements BaseOptionsType {
  enableTraceId = false
  filterXhrUrlRegExp: RegExp
  includeHttpUrlTraceIdRegExp = /.*/
  traceIdFieldName = 'Trace-Id'
  throttleDelayTime = 0
  maxDuplicateCount = 5
  beforeAppAjaxSend = null
  constructor(options: O) {
    this.bindOptions(options)
  }
  bindOptions(options: O) {
    const { enableTraceId, filterXhrUrlRegExp, traceIdFieldName, throttleDelayTime, includeHttpUrlTraceIdRegExp, beforeAppAjaxSend } =
      options
    toStringValidateOption(enableTraceId, 'enableTraceId', ToStringTypes.Boolean) && (this.enableTraceId = enableTraceId)
    toStringValidateOption(traceIdFieldName, 'traceIdFieldName', ToStringTypes.String) && (this.traceIdFieldName = traceIdFieldName)
    toStringValidateOption(throttleDelayTime, 'throttleDelayTime', ToStringTypes.Number) && (this.throttleDelayTime = throttleDelayTime)
    toStringValidateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', ToStringTypes.RegExp) && (this.filterXhrUrlRegExp = filterXhrUrlRegExp)
    toStringValidateOption(includeHttpUrlTraceIdRegExp, 'includeHttpUrlTraceIdRegExp', ToStringTypes.RegExp) &&
      (this.includeHttpUrlTraceIdRegExp = includeHttpUrlTraceIdRegExp)
    toStringValidateOption(beforeAppAjaxSend, 'beforeAppAjaxSend', ToStringTypes.Function) && (this.beforeAppAjaxSend = beforeAppAjaxSend)
  }
  isFilterHttpUrl(url: string): boolean {
    return this.filterXhrUrlRegExp && this.filterXhrUrlRegExp.test(url)
  }
  setTraceId(httpUrl: string, callback: (headerFieldName: string, traceId: string) => void) {
    const { includeHttpUrlTraceIdRegExp, enableTraceId } = this
    if (enableTraceId && includeHttpUrlTraceIdRegExp && includeHttpUrlTraceIdRegExp.test(httpUrl)) {
      const traceId = generateUUID()
      callback(this.traceIdFieldName, traceId)
    }
  }
}
