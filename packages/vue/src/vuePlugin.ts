import {
  silentConsoleScope,
  Severity,
  getTimestamp,
  variableTypeDetection,
  getBigVersion,
  getBreadcrumbCategoryInBrowser,
  getUrlWithEnv
} from '@mitojs/utils'
import { vue2VmHandler, vue3VmHandler } from './helper'
import { BrowserBreadcrumbTypes, BrowserEventTypes, ErrorTypes } from '@mitojs/shared'
import { BasePluginType, ReportDataType, ViewModel } from '@mitojs/types'
import { BrowserClient } from '@mitojs/browser'

const vuePlugin: BasePluginType<BrowserEventTypes, BrowserClient> = {
  name: BrowserEventTypes.VUE,
  monitor(notify) {
    const Vue = this.options.vue
    if (Vue && Vue.config) {
      const originErrorHandle = Vue.config.errorHandler
      Vue.config.errorHandler = function (err: Error, vm: ViewModel, info: string): void {
        const data: ReportDataType = {
          type: ErrorTypes.VUE,
          message: `${err.message}(${info})`,
          level: Severity.Normal,
          url: getUrlWithEnv(),
          name: err.name,
          stack: err.stack || [],
          time: getTimestamp()
        }
        notify(BrowserEventTypes.VUE, { data, vm })
        const hasConsole = typeof console !== 'undefined'
        if (hasConsole && !Vue.config.silent) {
          silentConsoleScope(() => {
            console.error('Error in ' + info + ': "' + err.toString() + '"', vm)
            console.error(err)
          })
        }
        return originErrorHandle?.(err, vm, info)
      }
    }
  },
  transform({ data: collectedData, vm }: { data: ReportDataType; vm: ViewModel }) {
    const Vue = this.options.vue
    if (variableTypeDetection.isString(Vue?.version)) {
      switch (getBigVersion(Vue?.version)) {
        case 2:
          return { ...collectedData, ...vue2VmHandler(vm) }
        case 3:
          return { ...collectedData, ...vue3VmHandler(vm) }
        default:
          return collectedData
      }
    }
  },
  consumer(data: ReportDataType) {
    const breadcrumbStack = this.breadcrumb.push({
      type: BrowserBreadcrumbTypes.VUE,
      category: getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.VUE),
      data,
      level: Severity.Error
    })
    this.transport.send(data, breadcrumbStack)
  }
}
export default vuePlugin
