import { SDK_VERSION, SDK_NAME } from '@mitojs/shared'
import { BrowserClient } from './browserClient'
import { BrowserOptionsFieldsTypes } from './types'
import fetchPlugins from './plugins/fetch'
import xhrPlugin from './plugins/xhr'
import domPlugins from './plugins/dom'
import errorPlugins from './plugins/error'
import hashRoutePlugin from './plugins/hashRoute'
import historyRoutePlugin from './plugins/historyRoute'
import consolePlugin from './plugins/console'
import unhandlerejectionPlugin from './plugins/unhandlerejecttion'
import { BasePluginType } from '@mitojs/types'

function createBrowserInstance(options: BrowserOptionsFieldsTypes = {}, plugins: BasePluginType[] = []) {
  const browserClient = new BrowserClient(options)
  const browserPlugins = [
    fetchPlugins,
    xhrPlugin,
    domPlugins,
    errorPlugins,
    hashRoutePlugin,
    historyRoutePlugin,
    consolePlugin,
    unhandlerejectionPlugin
  ]
  browserClient.use([...browserPlugins, ...plugins])
  return browserClient
}

const init = createBrowserInstance

export { SDK_VERSION, SDK_NAME, createBrowserInstance, init, BrowserClient }
