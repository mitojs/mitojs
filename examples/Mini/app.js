import * as MITO from './utils/wx-mini'
const MitoInstance = MITO.init({
  apikey: 'a1329cc0-563b-11eb-98fe-259847d73cdd',
  dsn: 'http://localhost:2021/errors/upload',
  silentConsole: true,
  debug: true,
  silentPageOnShareAppMessage: true,
  silentPageOnShareTimeline: true,
  appOnLaunch(options) {
    console.log('mito options appOnlauch', options)
  },
  pageOnLoad(options) {
    console.log('mito page onload', options.route, wx.MitoInstance)
    wx.MitoInstance.trackSend({
      id: 'track-id'
    })
  },
  pageOnReady(options) {
    console.log('mito page pageOnReady', options)
  },
  pageOnShow,
  pageOnHide,
  configReportWxRequest() {
    console.log('configReportWxRequest')
    return {
      header: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      dataType: 'text'
    }
  },
  pageOnShareTimeline( options, page){
    console.log('mito pageOnShareTimeline', page,options)
  },
  pageOnShareAppMessage( options, page) {
    console.log('mito PageOnShareAppMessage', page,options)
  }
})
wx.MitoInstance = MitoInstance
const currentPage = {
  startTime: 0,
  page: null
}
function pageOnShow(page) {
  // 进入页面埋点
  wx.MitoInstance.trackSend({
    route: page.route
  })
  currentPage.startTime = Date.now()
  currentPage.page = page
}
function pageOnHide(page) {
  // 离开页面埋点
  const endTime = Date.now()
  const elapsedTime = endTime - currentPage.startTime
  // 拿到信息并上报
  console.log('currentPage', currentPage)
  wx.MitoInstance.trackSend({
    // 曝光时间
    elapsedTime,
    // 页面路由
    route: currentPage.page.route
  })
}

App({
  onLaunch() {
    console.log('onLaunch')
  },
  globalData: {}
})
