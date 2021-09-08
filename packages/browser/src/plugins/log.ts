import { BrowserBreadcrumbTypes, BrowserEventTypes } from '@mitojs/shared'
import { getBreadcrumbCategoryInBrowser, htmlElementAsString, on, Severity, throttle, _global } from '@mitojs/utils'
import { BasePluginType } from '@mitojs/types'
import { BrowserClient } from '../browserClient'

interface DomCollectedType {
  category: 'click'
  data: Document
}
const logPlugin: BasePluginType<BrowserEventTypes, BrowserClient> = {
  name: BrowserEventTypes.CUSTOMER,
  monitor(notify) {},
  transform(collectedData: DomCollectedType) {
    const htmlString = htmlElementAsString(collectedData.data.activeElement as HTMLElement)
    const { breadcrumb } = this
    if (htmlString) {
      breadcrumb.push({
        type: BrowserBreadcrumbTypes.CLICK,
        category: getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.CLICK),
        data: htmlString,
        level: Severity.Info
      })
    }
  },
  consumer() {}
}

export default logPlugin
