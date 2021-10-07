import { BREADCRUMBCATEGORYS, WxBreadcrumbTypes, ErrorTypes } from '@mitojs/shared'
import { WxParsedErrorType } from '@mitojs/types'

/**
 * 解析字符串错误信息，返回message、name、stack
 * @param str error string
 */
export function parseErrorString(str: string): WxParsedErrorType {
  const splitLine: string[] = str.split('\n')
  if (splitLine.length < 2) return null
  if (splitLine[0].indexOf('MiniProgramError') !== -1) {
    splitLine.splice(0, 1)
  }
  const message = splitLine.splice(0, 1)[0]
  const name = splitLine.splice(0, 1)[0].split(':')[0]
  const stack = []
  splitLine.forEach((errorLine: string) => {
    const regexpGetFun = /at\s+([\S]+)\s+\(/ // 获取 [ 函数名 ]
    const regexGetFile = /\(([^)]+)\)/ // 获取 [ 有括号的文件 , 没括号的文件 ]
    const regexGetFileNoParenthese = /\s+at\s+(\S+)/ // 获取 [ 有括号的文件 , 没括号的文件 ]

    const funcExec = regexpGetFun.exec(errorLine)
    let fileURLExec = regexGetFile.exec(errorLine)
    if (!fileURLExec) {
      // 假如为空尝试解析无括号的URL
      fileURLExec = regexGetFileNoParenthese.exec(errorLine)
    }

    const funcNameMatch = Array.isArray(funcExec) && funcExec.length > 0 ? funcExec[1].trim() : ''
    const fileURLMatch = Array.isArray(fileURLExec) && fileURLExec.length > 0 ? fileURLExec[1] : ''
    const lineInfo = fileURLMatch.split(':')
    stack.push({
      args: [], // 请求参数
      func: funcNameMatch || ErrorTypes.UNKNOWN_FUNCTION, // 前端分解后的报错
      column: Number(lineInfo.pop()), // 前端分解后的列
      line: Number(lineInfo.pop()), // 前端分解后的行
      url: lineInfo.join(':') // 前端分解后的URL
    })
  })
  return {
    message,
    name,
    stack
  }
}

/**
 * 根据wx行为类型返回种类
 *
 * @export
 * @param {WxBreadcrumbTypes} type
 * @return {*}  {BREADCRUMBCATEGORYS}
 */
export function getBreadcrumbCategoryInWx(type: WxBreadcrumbTypes): BREADCRUMBCATEGORYS {
  switch (type) {
    case WxBreadcrumbTypes.XHR:
      return BREADCRUMBCATEGORYS.HTTP
    case WxBreadcrumbTypes.ROUTE:
    case WxBreadcrumbTypes.TAP:
    case WxBreadcrumbTypes.TOUCHMOVE:
      return BREADCRUMBCATEGORYS.USER
    case WxBreadcrumbTypes.CUSTOMER:
    case WxBreadcrumbTypes.CONSOLE:
      return BREADCRUMBCATEGORYS.DEBUG
    case WxBreadcrumbTypes.APP_ON_LAUNCH:
    case WxBreadcrumbTypes.APP_ON_SHOW:
    case WxBreadcrumbTypes.APP_ON_HIDE:
    case WxBreadcrumbTypes.PAGE_ON_LOAD:
    case WxBreadcrumbTypes.PAGE_ON_SHOW:
    case WxBreadcrumbTypes.PAGE_ON_READY:
    case WxBreadcrumbTypes.PAGE_ON_HIDE:
    case WxBreadcrumbTypes.PAGE_ON_SHARE_APP_MESSAGE:
    case WxBreadcrumbTypes.PAGE_ON_SHARE_TIMELINE:
    case WxBreadcrumbTypes.PAGE_ON_TAB_ITEM_TAP:
      return BREADCRUMBCATEGORYS.LIFECYCLE
    case WxBreadcrumbTypes.UNHANDLEDREJECTION:
    case WxBreadcrumbTypes.CODE_ERROR:
    case WxBreadcrumbTypes.RESOURCE:
    case WxBreadcrumbTypes.VUE:
    case WxBreadcrumbTypes.REACT:
    default:
      return BREADCRUMBCATEGORYS.EXCEPTION
  }
}

export function getAppId() {
  return wx.getAccountInfoSync().miniProgram.appId
}
