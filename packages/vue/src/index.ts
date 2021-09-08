import { createBrowserInstance } from '@mitojs/browser'
import { BrowserOptionsFieldsTypes } from 'packages/browser/src/types'
import vuePlugin from './vuePlugin'

function init(options: BrowserOptionsFieldsTypes = {}) {
  return createBrowserInstance(options, [vuePlugin])
}
export { init }
