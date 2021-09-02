import { _global } from '@mitojs/utils'
import { SDK_VERSION, SDK_NAME } from '@mitojs/shared'
import { BrowserClient } from './browserClient'
import { BrowserOptionsFieldsTypes } from './types'
import fetchPlugins from './plugins/fetch'

function createInstance(options: BrowserOptionsFieldsTypes = {}) {
  const browserClient = new BrowserClient(options)
  // options 是全局的
  // 根据用户配置来过滤plugins
  const finalPlugins = [fetchPlugins]
  browserClient.use(finalPlugins)
  return browserClient
}

const init = createInstance

export { SDK_VERSION, SDK_NAME, createInstance, init }
