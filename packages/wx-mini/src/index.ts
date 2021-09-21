import xhrPlugin from 'packages/browser/src/plugins/xhr'
import wxAppPlugins from './plugins/wxApp'
import wxConsolePlugin from './plugins/wxConsole'
import wxPagePlugins from './plugins/wxPage'
import wxRoutePlugin from './plugins/wxRoute'
import { WxOptionsFieldsTypes } from './types'
import { WxClient } from './wxClient'

function createWxInstance(options: WxOptionsFieldsTypes) {
  const wxClient = new WxClient(options)
  const plugins = [xhrPlugin, wxRoutePlugin, wxConsolePlugin, ...wxAppPlugins, ...wxPagePlugins]
  wxClient.use(plugins)
  return wxClient
}

const init = createWxInstance
export { init }
