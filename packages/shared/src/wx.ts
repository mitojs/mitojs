export const enum WxBreadcrumbTypes {
  // platform
  VUE = 'Vue',
  REACT = 'React',
  // base
  ROUTE = 'Route',
  CONSOLE = 'Console',
  XHR = 'Xhr',
  UNHANDLEDREJECTION = 'Unhandledrejection',
  RESOURCE = 'Resource',
  CODE_ERROR = 'Code Error',
  CUSTOMER = 'Customer',
  // app life cycle
  APP_ON_SHOW = 'App On Show',
  APP_ON_LAUNCH = 'App On Launch',
  APP_ON_HIDE = 'App On Hide',
  // page life cycle
  PAGE_ON_LOAD = 'Page On Load',
  PAGE_ON_SHOW = 'Page On Show',
  PAGE_ON_READY = 'Page On Ready',
  PAGE_ON_HIDE = 'Page On Hide',
  PAGE_ON_UNLOAD = 'Page On Unload',
  PAGE_ON_SHARE_APP_MESSAGE = 'Page On Share App Message',
  PAGE_ON_SHARE_TIMELINE = 'Page On Share Timeline',
  PAGE_ON_TAB_ITEM_TAP = 'Page On Tab Item Tap',
  // wx Event
  TAP = 'UI.Tap',
  TOUCHMOVE = 'UI.Touchmove'
}

export const enum WxAppEvents {
  AppOnLaunch = 'AppOnLaunch',
  AppOnShow = 'AppOnShow',
  AppOnHide = 'AppOnHide',
  AppOnError = 'AppOnError',
  AppOnPageNotFound = 'AppOnPageNotFound',
  AppOnUnhandledRejection = 'AppOnUnhandledRejection'
}

export const enum WxPageEvents {
  PageOnLoad = 'PageOnLoad',
  PageOnShow = 'PageOnShow',
  PageOnReady = 'PageOnReady',
  PageOnUnload = 'PageOnUnload',
  PageOnHide = 'PageOnHide',
  PageOnShareAppMessage = 'PageOnShareAppMessage',
  PageOnShareTimeline = 'PageOnShareTimeline',
  PageOnTabItemTap = 'PageOnTabItemTap'
}

export const enum WxRouteEvents {
  SwitchTab = 'switchTab',
  ReLaunch = 'reLaunch',
  RedirectTo = 'redirectTo',
  NavigateTo = 'navigateTo',
  NavigateBack = 'navigateBack',
  NavigateToMiniProgram = 'navigateToMiniProgram',
  RouteFail = 'routeFail'
}

/**
 *微信小程序需要监听的事件类型
 *
 * @export
 *  const const@enum {number}
 */
export const enum WxBaseEventTypes {
  REQUEST = 'request',
  CONSOLE = 'console',
  ROUTE = 'route',
  DOM = 'dom',
  //
  MINI_PERFORMANCE = 'miniPerformance',
  MINI_MEMORY_WARNING = 'miniMemoryWarning',
  MINI_NETWORK_STATUS_CHANGE = 'miniNetworkStatusChange',
  MINI_BATTERY_INFO = 'miniBatteryInfo'
}

export const enum LinstenerTypes {
  Touchmove = 'touchmove',
  Tap = 'tap',
  Longtap = 'longtap',
  Longpress = 'longpress'
}

// merge const enum
// export const WxEventTypes = Object.assign({}, WxAppEvents, WxPageEvents, WxBaseEventTypes)
export type WxEventTypes = WxAppEvents | WxPageEvents | WxBaseEventTypes
