import * as MITO from './utils/wx-mini'
const MitoInstance = MITO.init({
  apikey: 'a1329cc0-563b-11eb-98fe-259847d73cdd',
  dsn: 'http://localhost:2021/errors/upload',
  silentConsole: true,
  debug: true,
  appOnLaunch(options) {
    console.log('mito options appOnlauch', options)
  },
  pageOnLoad(options) {
    console.log('mito page onload', options)
  },
  pageOnReady(options) {
    console.log('mito page pageOnReady', options)
  },
  configReportWxRequest() {
    console.log('configReportWxRequest')
    return {
      header: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      dataType: 'text'
    }
  }
})
wx.MitoInstance = MitoInstance

App({
  onLaunch() {
    console.log('onLaunch')
  },
  globalData: {}
})
