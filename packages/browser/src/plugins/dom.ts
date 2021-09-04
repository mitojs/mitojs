import { BrowserBreadcrumbTypes, BrowserEventTypes } from '@mitojs/shared'
import { getBreadcrumbCategoryInBrowser, htmlElementAsString, on, Severity, throttle, _global } from '@mitojs/utils'
import { BasePluginType } from '@mitojs/types'
import { BrowserClient } from '../browserClient'

interface DomCollectedType {
  category: 'click'
  data: Document
}
const domPlugins: BasePluginType<BrowserEventTypes, BrowserClient> = {
  name: BrowserEventTypes.DOM,
  monitor(notify) {
    if (!('document' in _global)) return
    const clickThrottle = throttle(notify, this.options.throttleDelayTime)
    on(
      _global.document,
      'click',
      function () {
        clickThrottle(BrowserEventTypes.DOM, {
          category: 'click',
          data: this
        })
      },
      true
    )
  },
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

export default domPlugins
