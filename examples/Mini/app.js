import * as MITO from './utils/wx-mini'
const instance = MITO.init({
  apikey: 'a1329cc0-563b-11eb-98fe-259847d73cdd',
  dsn: 'http://localhost:2021/errors/upload',
  silentConsole: true,
  debug: true,
  silentDom: true,
  appOnLaunch(options) {
    console.log('mito options appOnlauch',options)
  },
  pageOnload() {
    console.log('mito page onload')
  },
  pageOnReady(options) {
    console.log('mito page pageOnReady',options)
  },
  configReportWxRequest() {
    return {
      header: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      dataType: 'text'
    }
  }
})

wx.instance = instance

function interceptRequest(params) {
  Object.assign(wx, {
    __MITO_REQUEST__: params
  })
  return params
}

let wxRequest = wx.request

function newRequest(params) {
  return wxRequest(interceptRequest(params))
}

Object.defineProperty(wx, 'request', {
  value: newRequest,
  writable: true,
  configurable: true
})

App({
  onLaunch() {
    console.log('onLaunch')
  },
  globalData: {}
})
