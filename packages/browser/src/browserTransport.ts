import BaseTransport from 'packages/core/src/baseTransport'
import { MethodTypes, ToStringTypes } from '@mitojs/shared'
import { BrowserOptionsFieldsTypes } from './types'
import { toStringValidateOption } from '@mitojs/utils'

export default class BrowserTransport extends BaseTransport<BrowserOptionsFieldsTypes> {
  configReportXhr: unknown
  constructor(options: BrowserOptionsFieldsTypes) {
    super(options)
  }
  post(data: any, url: string) {
    const requestFun = (): void => {
      const xhr = new XMLHttpRequest()
      xhr.open(MethodTypes.Post, url)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.withCredentials = true
      if (typeof this.configReportXhr === 'function') {
        this.configReportXhr(xhr, data)
      }
      xhr.send(JSON.stringify(data))
    }
    this.queue.addTask(requestFun)
  }
  bindOptions(options: BrowserOptionsFieldsTypes = {}) {
    const { configReportXhr } = options
    toStringValidateOption(configReportXhr, 'configReportXhr', ToStringTypes.Function) && (this.configReportXhr = configReportXhr)
  }
}
