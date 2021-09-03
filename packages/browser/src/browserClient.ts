import { Breadcrumb, BaseClient } from '@mitojs/core'
import { EventTypes } from '@mitojs/shared'
import BrowserOptions from './browserOptions'
import BrowserTransport from './browserTransport'
import { BrowserOptionsFieldsTypes } from './types'

export class BrowserClient extends BaseClient<BrowserOptionsFieldsTypes, EventTypes> {
  transport: BrowserTransport
  options: BrowserOptions
  breadcrumb: Breadcrumb<BrowserOptionsFieldsTypes>
  constructor(options: BrowserOptionsFieldsTypes) {
    super(options)
    this.options = new BrowserOptions(options)
    this.transport = new BrowserTransport(options)
    this.breadcrumb = new Breadcrumb(options)
  }
}
