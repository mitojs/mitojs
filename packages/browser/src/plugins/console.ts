import { BrowserBreadcrumbTypes, BrowserEventTypes, globalVar } from '@mitojs/shared'
import { replaceOld, Severity, _global } from '@mitojs/utils'
import { BasePluginType, ConsoleCollectType } from '@mitojs/types'
import { BrowserClient } from '../browserClient'
import { addBreadcrumbInBrowser } from '../utils'
const consolePlugin: BasePluginType<BrowserEventTypes, BrowserClient> = {
  name: BrowserEventTypes.CONSOLE,
  monitor(notify) {
    if (!('console' in _global)) {
      return
    }
    const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert']
    logType.forEach(function (level: string): void {
      if (!(level in _global.console)) return
      replaceOld(_global.console, level, function (originalConsole: () => any): Function {
        return function (...args: any[]): void {
          if (originalConsole) {
            notify(BrowserEventTypes.CONSOLE, { args, level })
            originalConsole.apply(_global.console, args)
          }
        }
      })
    })
  },
  transform(collectedData: ConsoleCollectType) {
    return collectedData
  },
  consumer(transformedData: ConsoleCollectType) {
    if (globalVar.isLogAddBreadcrumb) {
      addBreadcrumbInBrowser.call(this, transformedData, BrowserBreadcrumbTypes.CONSOLE, Severity.fromString(transformedData.level))
    }
  }
}

export default consolePlugin
