import { ToStringTypes } from '@mitojs/shared'
import { BaseOptionsFieldsIntegrationType, BaseOptionsType, VueInstance } from '@mitojs/types'
import { generateUUID, validateOptionsAndSet } from '@mitojs/utils'

/**
 * 公用的基础配置项绑定
 *
 * @export
 * @class BaseOptions
 * @implements {BaseOptionsType<O>}
 * @template O
 */
export class BaseOptions<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> implements BaseOptionsType<O> {
  enableTraceId = false
  filterXhrUrlRegExp: RegExp
  includeHttpUrlTraceIdRegExp = /.*/
  traceIdFieldName = 'Trace-Id'
  throttleDelayTime = 0
  beforeAppAjaxSend = null
  vue: VueInstance = null
  constructor() {}
  bindOptions(options: O) {
    const { enableTraceId, vue, filterXhrUrlRegExp, traceIdFieldName, throttleDelayTime, includeHttpUrlTraceIdRegExp, beforeAppAjaxSend } =
      options
    const optionArr = [
      [enableTraceId, 'enableTraceId', ToStringTypes.Boolean],
      [traceIdFieldName, 'traceIdFieldName', ToStringTypes.String],
      [throttleDelayTime, 'throttleDelayTime', ToStringTypes.Number],
      [filterXhrUrlRegExp, 'filterXhrUrlRegExp', ToStringTypes.RegExp],
      [includeHttpUrlTraceIdRegExp, 'includeHttpUrlTraceIdRegExp', ToStringTypes.RegExp],
      [beforeAppAjaxSend, 'beforeAppAjaxSend', ToStringTypes.Function]
    ]
    validateOptionsAndSet.call(this, optionArr)
    // for vue
    this.vue = vue
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
