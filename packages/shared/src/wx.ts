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
  PageOnHide = 'PageOnHide',
  PageOnReady = 'PageOnReady',
  PageOnUnload = 'PageOnUnload',
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

export const enum WxBreadcrumbTypes {
  // wx life cycle
  APP_ON_SHOW = 'App On Show',
  APP_ON_LAUNCH = 'App On Launch',
  APP_ON_HIDE = 'App On Hide',
  PAGE_ON_SHOW = 'Page On Show',
  PAGE_ON_HIDE = 'Page On Hide',
  PAGE_ON_SHARE_APP_MESSAGE = 'Page On Share App Message',
  PAGE_ON_SHARE_TIMELINE = 'Page On Share Timeline',
  PAGE_ON_TAB_ITEM_TAP = 'Page On Tab Item Tap',
  // wx BaseEvent
  TAP = 'UI.Tap',
  TOUCHMOVE = 'UI.Touchmove'
}

/**
 *微信小程序需要监听的事件类型
 *
 * @export
 *  const@enum {number}
 */
export const enum WxEventTypes {
  XHR = 'xhr',
  CONSOLE = 'console',
  UNHANDLEDREJECTION = 'unhandledrejection',
  MINI_ROUTE = 'miniRoute',
  MINI_PERFORMANCE = 'miniPerformance',
  MINI_MEMORY_WARNING = 'miniMemoryWarning',
  MINI_NETWORK_STATUS_CHANGE = 'miniNetworkStatusChange',
  MINI_BATTERY_INFO = 'miniBatteryInfo'
}
