import { SDK_VERSION, SDK_NAME } from '@mitojs/shared'
import { BrowserClient } from './browserClient'
import { BrowserOptionsFieldsTypes } from './types'
import fetchPlugins from './plugins/fetch'
import xhrPlugin from './plugins/xhr'
import domPlugins from './plugins/dom'

function createInstance(options: BrowserOptionsFieldsTypes = {}) {
  const browserClient = new BrowserClient(options)
  const finalPlugins = [fetchPlugins, xhrPlugin, domPlugins]
  browserClient.use(finalPlugins)
  return browserClient
}

const init = createInstance

export { SDK_VERSION, SDK_NAME, createInstance, init }
