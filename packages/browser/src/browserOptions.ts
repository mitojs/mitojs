import BaseOptions from 'packages/core/src/baseOptions'
import { BrowserOptionsFieldsTypes } from './types'

export default class BrowserOptions extends BaseOptions<BrowserOptionsFieldsTypes> {
  constructor(options: BrowserOptionsFieldsTypes) {
    super(options)
  }
  bindOptions(options: BrowserOptionsFieldsTypes) {}
}
