const instance = MITO.init({
  // debug: true,
  apikey: 'sdasda',
  silentConsole: true,
  silentXhr: true,
  maxBreadcrumbs: 10,
  dsn: 'http://localhost:2021/errors/upload',
  throttleDelayTime: 0,
  enableTraceId: true
})
window._MITO_ = instance
