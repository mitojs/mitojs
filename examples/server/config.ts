import { resolve } from 'path'

export const port = 2021
const resolveDirname = (target: string) => resolve(__dirname, target)
const JsFilePath = resolveDirname('../JS')
const VueFilePath = resolveDirname('../Vue')
const ReactFilePath = resolveDirname('../React')
const Vue3FilePath = resolveDirname('../Vue3')
const WebPerformancePath = resolveDirname('../WebPerformance')
const browserDistFilePath = resolve('./packages/browser/dist')
const webDistFilePath = resolve('./packages/web/dist')
// const vueDistFilePath = resolve('./packages/vue/dist')
// const reactDistFilePath = resolve('./packages/react/dist')
const wxDistFilePath = resolve('./packages/wx-mini/dist')
const webPerfFilePath = resolve('./packages/web-performance/dist')
export const FilePaths = {
  '/JS': JsFilePath,
  '/Vue': VueFilePath,
  '/React': ReactFilePath,
  '/Vue3': Vue3FilePath,
  '/WebPerformance': WebPerformancePath,
  '/browserDist': browserDistFilePath,
  '/webDist': webDistFilePath,
  // '/vueDist': vueDistFilePath,
  // '/reactDist': reactDistFilePath,
  '/wxDist': wxDistFilePath,
  '/wpDist': webPerfFilePath
}

export const ServerUrls = {
  normalGet: '/normal',
  exceptionGet: '/exception',
  normalPost: '/normal/post',
  exceptionPost: '/exception/post',
  errorsUpload: '/errors/upload'
}
