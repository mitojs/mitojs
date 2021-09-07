const webInstance = MITO.init({
  vue: Vue,
  debug: true,
  silentConsole: true,
  maxBreadcrumbs: 10,
  dsn: 'http://localhost:2021/errors/upload'
})
window._MITO_ = webInstance

const webInstance2 = MITO.init({
  vue: Vue,
  silentXhr: true,
  debug: true,
  silentConsole: true,
  maxBreadcrumbs: 10,
  dsn: 'http://localhost:2021/errors/upload'
})
window._MITO_2 = webInstance2
