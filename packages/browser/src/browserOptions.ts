import { BaseOptions } from '@mitojs/core'
import { BrowserOptionsFieldsTypes } from './types'

export default class BrowserOptions extends BaseOptions<BrowserOptionsFieldsTypes> {
  configReportXhr: unknown = null
  constructor(options: BrowserOptionsFieldsTypes) {
    super()
    super.bindOptions(options)
  }
  bindOptions(options: BrowserOptionsFieldsTypes) {}
}
