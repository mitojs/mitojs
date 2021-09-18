import { WxEventTypes, globalVar, WxBreadcrumbTypes } from '@mitojs/shared'
import { getBreadcrumbCategoryInWx, replaceOld, Severity, variableTypeDetection } from '@mitojs/utils'
import { BasePluginType, ConsoleCollectType } from '@mitojs/types'
import { WxClient } from '../wxClient'
const wxConsolePlugin: BasePluginType<WxEventTypes, WxClient> = {
  name: WxEventTypes.CONSOLE,
  monitor(notify) {
    if (console && variableTypeDetection.isObject(console)) {
      const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert']
      logType.forEach(function (level: string): void {
        if (!(level in console)) return
        replaceOld(console, level, function (originalConsole): Function {
          return function (...args: any[]): void {
            if (originalConsole) {
              notify(WxEventTypes.CONSOLE, { args, level })
              originalConsole.apply(console, args)
            }
          }
        })
      })
    }
  },
  transform(collectedData: ConsoleCollectType) {
    return collectedData
  },
  consumer(transformedData: ConsoleCollectType) {
    if (globalVar.isLogAddBreadcrumb) {
      this.breadcrumb.push({
        type: WxBreadcrumbTypes.CONSOLE,
        category: getBreadcrumbCategoryInWx(WxBreadcrumbTypes.CONSOLE),
        data: transformedData,
        level: Severity.fromString(transformedData.level)
      })
    }
  }
}

export default wxConsolePlugin
