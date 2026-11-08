const instance = MITO.init(
  {
    debug: true,
    vue: RootVue,
    silentConsole: true,
    maxBreadcrumbs: 10,
    dsn: '/errors/upload'
  },
  [MITO.vuePlugin]
)

window._MITO_ = instance
