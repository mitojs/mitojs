const instance = MITO.init(
  {
    vue: Vue,
    debug: true,
    silentConsole: true,
    maxBreadcrumbs: 10,
    dsn: '/errors/upload'
  },
  [MITO.vuePlugin]
)
window._MITO_ = instance

const instance2 = MITO.init(
  {
    vue: Vue,
    silentXhr: true,
    debug: true,
    silentConsole: true,
    maxBreadcrumbs: 10,
    dsn: '/errors/upload'
  },
  [MITO.vuePlugin]
)
window._MITO_2 = instance2
