import { vi, type Mock } from 'vitest'
import { BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes, BrowserEventTypes } from '@mitojs/shared'
import { RouteChangeCollectType } from '@mitojs/types'
import { on, _global } from '@mitojs/utils'
import { BrowserClient } from '../../browserClient'
import hashRoutePlugin from '../../plugins/hashRoute'

describe('hashRoutePlugin', () => {
  const browserInstance = new BrowserClient({
    dsn: 'http://test.com/upload'
  })
  hashRoutePlugin.monitor = vi.fn(hashRoutePlugin.monitor)
  hashRoutePlugin.transform = vi.fn(hashRoutePlugin.transform)
  hashRoutePlugin.consumer = vi.fn(hashRoutePlugin.consumer)
  // delete temporary for use hashRoutePlugin,because hashRoutePlugin is enabled when not has onpopstate
  delete _global.onpopstate
  browserInstance.use([hashRoutePlugin])
  it("hashRoutePlugin's func should be called by browserClient", () => new Promise<void>((done) => {
    const to = '#/three'
    location.hash = to
    on(_global, BrowserEventTypes.HASHCHANGE, function () {
      expect((hashRoutePlugin.monitor as Mock).mock.calls.length).toBe(1)
      expect((hashRoutePlugin.transform as Mock).mock.calls.length).toBe(1)
      expect((hashRoutePlugin.consumer as Mock).mock.calls.length).toBe(1)
      const breadcrumStack = browserInstance.breadcrumb.getStack()
      // validate data
      expect(breadcrumStack[0].category).toBe(BREADCRUMBCATEGORYS.USER)
      expect(breadcrumStack[0].type).toBe(BrowserBreadcrumbTypes.ROUTE)
      expect((breadcrumStack[0].data as RouteChangeCollectType).to).toBe(`/${to}`)
      done()
    })
  }))
})
