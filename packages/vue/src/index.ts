import { BrowserOptionsFieldsTypes, createBrowserInstance } from '@mitojs/browser'
import vuePlugin from './vuePlugin'

function init(options: BrowserOptionsFieldsTypes = {}) {
  return createBrowserInstance(options, [vuePlugin])
}
export { init }
