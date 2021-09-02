import { _global } from '@mitojs/utils'
import { SDK_VERSION, SDK_NAME } from '@mitojs/shared'
import { BrowserClient } from './browserClient'
import { BrowserOptionsFieldsTypes } from './types'

function init(options: BrowserOptionsFieldsTypes = {}) {
  const browserClient = new BrowserClient(options)
  // name: EVENTTYPE
  // monitor(subscrib, hooks)
  // listener(data, breadcrumb, transport)
  //
  const plugin1 = (browserClient: BrowserClient) => {}
  const plugin2 = (browserClient: BrowserClient) => {}
  // options 是全局的
  // 根据用户配置来过滤plugins
  const finalPlugins = [plugin1, plugin2].filter(item)
  browserClient.use(finalPlugins)
  return browserClient
}

export { SDK_VERSION, SDK_NAME, init, log }
