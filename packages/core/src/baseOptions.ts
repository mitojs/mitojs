import { BaseOptionsFieldsIntegrationType, BaseOptionsType } from 'packages/types/src/baseOptionsType'

export default class BaseOptions<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> implements BaseOptionsType {
  enableTraceId = false
  filterXhrUrlRegExp: RegExp
  includeHttpUrlTraceIdRegExp = /.*/
  traceIdFieldName = 'Trace-Id'
  throttleDelayTime = 0
  maxDuplicateCount = 5
  constructor(options: O) {
    this.bindOptions(options)
  }
  bindOptions(options: O) {}
}
