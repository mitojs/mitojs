import { Breadcrumb, BaseClient } from '@mitojs/core'
import { BrowserEventTypes, EventTypes } from '@mitojs/shared'
import { firstStrtoUppercase } from '@mitojs/utils'
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
  /**
   * 判断当前插件是否启用，用于browser的option
   *
   * @param {BrowserEventTypes} name
   * @return {*}
   * @memberof BrowserClient
   */
  isPluginEnable(name: BrowserEventTypes): boolean {
    const silentField = `silent${firstStrtoUppercase(name)}`
    return !this.options[silentField]
  }
}
