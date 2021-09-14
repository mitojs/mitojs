const instance = MITO.init({
  debug: true,
  vue: RootVue,
  silentConsole: true,
  maxBreadcrumbs: 10,
  dsn: 'http://localhost:2021/errors/upload'
})

window._MITO_ = instance
