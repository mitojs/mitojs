const instance = MITO.init({
  // debug: true,
  silentConsole: true,
  maxBreadcrumbs: 10,
  dsn: 'http://localhost:2021/errors/upload',
  throttleDelayTime: 0
})
window._MITO_ = instance

console.log(instance)
