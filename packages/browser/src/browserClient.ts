import { Breadcrumb, options } from 'packages/core/src'
import BaseClient from 'packages/core/src/baseClient'
import { EVENTTYPES } from 'packages/shared/src'
import BrowserOptions from './browserOptions'
import BrowserTransport from './browserTransport'
import { BrowserOptionsFieldsTypes } from './types'

export class BrowserClient extends BaseClient<BrowserOptionsFieldsTypes, EVENTTYPES> {
  transport: BrowserTransport
  options: BrowserOptions
  breadcrumnb: Breadcrumb
  constructor(options: BrowserOptionsFieldsTypes) {
    super(options)
    this.options = new BrowserOptions(options)
    this.breadcrumnb = new Breadcrumb()
    this.transport = new BrowserTransport()
  }
}
