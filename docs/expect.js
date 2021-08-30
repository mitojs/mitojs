// 至少要一个apikey才能初始化
const mitoClient = MITO.init({ apikey: 'sda-asda' })

mitoClient.hooks.apikey = 'asdas-asd-asd'
mitoClient.hooks.maxBreadcrumb = 20
mitoClient.hooks.reportData = function () {}

// 两种方式都是公用一块内存的

// 如果初始化两次

const mitoClient1 = MITO.init({ apikey: 'sda-asda' })
const mitoClient2 = MITO.init({ apikey: 'sda-asda' })

mitoClient2.addBreadcrumb({
  message: '',
  // 默认是info 可以定义error
  level: ''
})

mitoClient2.log()

// 移除trackDsn

// 多实例可以解决trackDsn的问题

// 不管apikey是不是一样就是返回多实例
const plugins = []
new client(plugins)

// core 应该有requestClient、
// browser 应该要继承requestClient
// wx-mini 也应该要继承requestClient
