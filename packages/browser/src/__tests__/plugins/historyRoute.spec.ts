import { BREADCRUMBCATEGORYS, BrowserBreadcrumbTypes } from '@mitojs/shared'
import { RouteChangeCollectType } from '@mitojs/types'
import { sleepRun, _global } from '@mitojs/utils'
import { BrowserClient } from '../../browserClient'
import historyRoutePlugin from '../../plugins/historyRoute'

describe('historyRoutePlugin', () => {
  it('historyRoutePlugin will be invoked with pushState', (done) => {
    const browserInstance = new BrowserClient({
      dsn: 'http://test.com/upload'
    })
    historyRoutePlugin.monitor = jest.fn(historyRoutePlugin.monitor)
    historyRoutePlugin.transform = jest.fn(historyRoutePlugin.transform)
    historyRoutePlugin.consumer = jest.fn(historyRoutePlugin.consumer)
    browserInstance.use([historyRoutePlugin])
    const to = '/page'
    _global.history.pushState({}, '', to)
    sleepRun(() => {
      expect((historyRoutePlugin.monitor as jest.Mock).mock.calls.length).toBe(1)
      expect((historyRoutePlugin.transform as jest.Mock).mock.calls.length).toBe(1)
      expect((historyRoutePlugin.consumer as jest.Mock).mock.calls.length).toBe(1)
      const breadcrumStack = browserInstance.breadcrumb.getStack()
      // validate data
      expect(breadcrumStack[0].category).toBe(BREADCRUMBCATEGORYS.USER)
      expect(breadcrumStack[0].type).toBe(BrowserBreadcrumbTypes.ROUTE)
      expect((breadcrumStack[0].data as RouteChangeCollectType).to).toBe(`${to}`)
      done()
    })
  })

  it('historyRoutePlugin will be invoked with replaceState', (done) => {
    const browserInstance = new BrowserClient({
      dsn: 'http://test.com/upload'
    })
    browserInstance.use([historyRoutePlugin])
    const to = '/page'
    _global.history.replaceState({}, '', to)
    sleepRun(() => {
      const breadcrumStack = browserInstance.breadcrumb.getStack()
      // validate data
      expect(breadcrumStack[0].category).toBe(BREADCRUMBCATEGORYS.USER)
      expect(breadcrumStack[0].type).toBe(BrowserBreadcrumbTypes.ROUTE)
      expect((breadcrumStack[0].data as RouteChangeCollectType).to).toBe(`${to}`)
      done()
    })
  })

  it('historyRoutePlugin will be invoked with history.back', (done) => {
    const browserInstance = new BrowserClient({
      dsn: 'http://test.com/upload'
    })
    browserInstance.use([historyRoutePlugin])
    const one = '/one'
    const two = '/two'
    _global.history.pushState({}, '', one)
    _global.history.pushState({}, '', two)
    _global.history.back()
    sleepRun(() => {
      const breadcrumStack = browserInstance.breadcrumb.getStack()
      // validate data
      expect(breadcrumStack[0].category).toBe(BREADCRUMBCATEGORYS.USER)
      expect(breadcrumStack[0].type).toBe(BrowserBreadcrumbTypes.ROUTE)
      expect((breadcrumStack[0].data as RouteChangeCollectType).to).toBe(`${one}`)
      expect((breadcrumStack[1].data as RouteChangeCollectType).to).toBe(`${two}`)
      expect((breadcrumStack[2].data as RouteChangeCollectType).to).toBe(`${one}`)
      done()
    })
  })
})
