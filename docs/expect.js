// 至少要一个apikey才能初始化
const mitoClient = MITO.init({ apikey: 'sda-asda' })

mitoClient.hooks.apikey = 'asdas-asd-asd'
mitoClient.hooks.maxBreadcrumb = 20

// 如果初始化两次
// replace两种方式都是公用一块内存的，但是回调是放到数组当中
const mitoClient1 = MITO.init({ apikey: 'sda-asda', dsn: 'http://' })
const mitoClient2 = MITO.init({ apikey: 'asdasass', dsn: 'http://' })

mitoClient2.addBreadcrumb({
  message: '',
  // 默认是info 可以定义error
  level: ''
})
mitoClient.hooks.beforeDataReport = function () {}
mitoClient2.log()

// 移除trackDsn
// 多实例可以解决trackDsn的问题
