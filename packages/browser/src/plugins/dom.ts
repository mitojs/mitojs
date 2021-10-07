import { BrowserBreadcrumbTypes, BrowserEventTypes } from '@mitojs/shared'
import { htmlElementAsString, on, throttle, _global } from '@mitojs/utils'
import { BasePluginType } from '@mitojs/types'
import { BrowserClient } from '../browserClient'
import { addBreadcrumbInBrowser } from '../utils'

export interface DomCollectedType {
  // maybe will add doubleClick or other in the future
  category: 'click'
  data: Document
}
const domPlugin: BasePluginType<BrowserEventTypes, BrowserClient> = {
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
    return htmlString
  },
  consumer(transformedData: string) {
    if (transformedData) {
      addBreadcrumbInBrowser.call(this, transformedData, BrowserBreadcrumbTypes.CLICK)
    }
  }
}

export default domPlugin
