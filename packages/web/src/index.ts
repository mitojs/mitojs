import { SDK_VERSION, SDK_NAME, createBrowserInstance } from '@mitojs/browser'
import { BrowserOptionsFieldsTypes } from 'packages/browser/src/types'
import vuePlugin from '@mitojs/vue'

function init(options: BrowserOptionsFieldsTypes = {}) {
  return createBrowserInstance(options, [vuePlugin])
}

export { init, SDK_NAME, SDK_VERSION }
