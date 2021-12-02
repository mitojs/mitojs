/* @mitojs/wx-mini version ' + 3.0.0 */
'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var extendStatics = function (d, b) {
  extendStatics =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (d, b) {
        d.__proto__ = b
      }) ||
    function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
    }
  return extendStatics(d, b)
}
function __extends(d, b) {
  if (typeof b !== 'function' && b !== null) throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null')
  extendStatics(d, b)
  function __() {
    this.constructor = d
  }
  d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
}
var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i]
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
      }
      return t
    }
  return __assign.apply(this, arguments)
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value)
        })
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value))
      } catch (e) {
        reject(e)
      }
    }
    function rejected(value) {
      try {
        step(generator['throw'](value))
      } catch (e) {
        reject(e)
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1]
        return t[1]
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g
  return (
    (g = { next: verb(0), throw: verb(1), return: verb(2) }),
    typeof Symbol === 'function' &&
      (g[Symbol.iterator] = function () {
        return this
      }),
    g
  )
  function verb(n) {
    return function (v) {
      return step([n, v])
    }
  }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.')
    while (_)
      try {
        if (
          ((f = 1),
          y &&
            (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
            !(t = t.call(y, op[1])).done)
        )
          return t
        if (((y = 0), t)) op = [op[0] & 2, t.value]
        switch (op[0]) {
          case 0:
          case 1:
            t = op
            break
          case 4:
            _.label++
            return { value: op[1], done: false }
          case 5:
            _.label++
            y = op[1]
            op = [0]
            continue
          case 7:
            op = _.ops.pop()
            _.trys.pop()
            continue
          default:
            if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
              _ = 0
              continue
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1]
              break
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1]
              t = op
              break
            }
            if (t && _.label < t[2]) {
              _.label = t[2]
              _.ops.push(op)
              break
            }
            if (t[2]) _.ops.pop()
            _.trys.pop()
            continue
        }
        op = body.call(thisArg, _)
      } catch (e) {
        op = [6, e]
        y = 0
      } finally {
        f = t = 0
      }
    if (op[0] & 5) throw op[1]
    return { value: op[0] ? op[1] : void 0, done: true }
  }
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i)
        ar[i] = from[i]
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from))
}

var version = '3.0.0'

var SDK_NAME = 'mitojs'
var SDK_VERSION = version

var MitoLog = 'Mito.log'
var MitoLogEmptyMsg = 'empty.msg'
var MitoLogEmptyTag = 'empty.tag'
var globalVar = {
  isLogAddBreadcrumb: true,
  crossOriginThreshold: 1000
}
var Silent = 'silent'

var nativeToString = Object.prototype.toString
function isType(type) {
  return function (value) {
    return nativeToString.call(value) === '[object ' + type + ']'
  }
}
var variableTypeDetection = {
  isNumber: isType('Number'),
  isString: isType('String'),
  isBoolean: isType('Boolean'),
  isNull: isType('Null'),
  isUndefined: isType('Undefined'),
  isSymbol: isType('Symbol'),
  isFunction: isType('Function'),
  isObject: isType('Object'),
  isArray: isType('Array'),
  isProcess: isType('process'),
  isWindow: isType('Window')
}
function isError(wat) {
  switch (nativeToString.call(wat)) {
    case '[object Error]':
      return true
    case '[object Exception]':
      return true
    case '[object DOMException]':
      return true
    default:
      return isInstanceOf(wat, Error)
  }
}
function isEmptyObject(obj) {
  return variableTypeDetection.isObject(obj) && Object.keys(obj).length === 0
}
function isEmpty(wat) {
  return (variableTypeDetection.isString(wat) && wat.trim() === '') || wat === undefined || wat === null
}
function isInstanceOf(wat, base) {
  try {
    return wat instanceof base
  } catch (_e) {
    return false
  }
}

var isNodeEnv = variableTypeDetection.isProcess(typeof process !== 'undefined' ? process : 0)
var isWxMiniEnv =
  variableTypeDetection.isObject(typeof wx !== 'undefined' ? wx : 0) &&
  variableTypeDetection.isFunction(typeof App !== 'undefined' ? App : 0)
var isBrowserEnv = variableTypeDetection.isWindow(typeof window !== 'undefined' ? window : 0)
function getGlobal() {
  if (isBrowserEnv) return window
  if (isWxMiniEnv) return wx
  if (isNodeEnv) return process
}
var _global = getGlobal()
var _support = getGlobalMitoSupport()
function getGlobalMitoSupport() {
  _global.__MITO__ = _global.__MITO__ || {}
  return _global.__MITO__
}

var PREFIX = 'MITO Logger'
var Logger = (function () {
  function Logger() {
    var _this = this
    this.enabled = false
    this._console = {}
    _global.console = console || _global.console
    if (console || _global.console) {
      var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert']
      logType.forEach(function (level) {
        if (!(level in _global.console)) return
        _this._console[level] = _global.console[level]
      })
    }
  }
  Logger.prototype.disable = function () {
    this.enabled = false
  }
  Logger.prototype.bindOptions = function (debug) {
    this.enabled = debug ? true : false
  }
  Logger.prototype.enable = function () {
    this.enabled = true
  }
  Logger.prototype.getEnableStatus = function () {
    return this.enabled
  }
  Logger.prototype.log = function () {
    var _a
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    if (!this.enabled) {
      return
    }
    ;(_a = this._console).log.apply(_a, __spreadArray([PREFIX + '[Log]:'], args, false))
  }
  Logger.prototype.warn = function () {
    var _a
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    if (!this.enabled) {
      return
    }
    ;(_a = this._console).warn.apply(_a, __spreadArray([PREFIX + '[Warn]:'], args, false))
  }
  Logger.prototype.error = function () {
    var _a
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    ;(_a = this._console).error.apply(_a, __spreadArray([PREFIX + '[Error]:'], args, false))
  }
  return Logger
})()
var logger = _support.logger || (_support.logger = new Logger())

function getLocationHref() {
  if (typeof document === 'undefined' || document.location == null) return ''
  return document.location.href
}
function getUrlWithEnv() {
  if (isWxMiniEnv) return getCurrentRoute()
  if (isBrowserEnv) return getLocationHref()
  return ''
}
function replaceOld(source, name, replacement, isForced) {
  if (isForced === void 0) {
    isForced = false
  }
  if (source === undefined) return
  if (name in source || isForced) {
    var original = source[name]
    var wrapped = replacement(original)
    if (typeof wrapped === 'function') {
      source[name] = wrapped
    }
  }
}
var defaultFunctionName = '<anonymous>'
function getFunctionName(fn) {
  if (!fn || typeof fn !== 'function') {
    return defaultFunctionName
  }
  return fn.name || defaultFunctionName
}
function throttle(fn, delay) {
  var canRun = true
  return function () {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    if (!canRun) return
    fn.apply(this, args)
    canRun = false
    setTimeout(function () {
      canRun = true
    }, delay)
  }
}
function isInclude(origin, target) {
  return !!~origin.indexOf(target)
}
function getTimestamp() {
  return Date.now()
}
function toStringAny(target, type) {
  return nativeToString.call(target) === '[object ' + type + ']'
}
function toStringValidateOption(target, targetName, expectType) {
  if (toStringAny(target, expectType)) return true
  typeof target !== 'undefined' &&
    logger.error(
      targetName +
        '\u671F\u671B\u4F20\u5165:' +
        expectType +
        '\u7C7B\u578B\uFF0C\u5F53\u524D\u662F:' +
        nativeToString.call(target) +
        '\u7C7B\u578B'
    )
  return false
}
function silentConsoleScope(callback) {
  globalVar.isLogAddBreadcrumb = false
  callback()
  globalVar.isLogAddBreadcrumb = true
}
function generateUUID() {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}
function unknownToString(target) {
  if (variableTypeDetection.isString(target)) {
    return target
  }
  if (variableTypeDetection.isUndefined(target)) {
    return 'undefined'
  }
  return JSON.stringify(target)
}
function setUrlQuery(url, query) {
  var queryArr = []
  Object.keys(query).forEach(function (k) {
    queryArr.push(k + '=' + query[k])
  })
  if (url.indexOf('?') !== -1) {
    url = url + '&' + queryArr.join('&')
  } else {
    url = url + '?' + queryArr.join('&')
  }
  return url
}
function getCurrentRoute() {
  if (!variableTypeDetection.isFunction(getCurrentPages)) {
    return ''
  }
  var pages = getCurrentPages()
  if (!pages.length) {
    return 'App'
  }
  var currentPage = pages.pop()
  return setUrlQuery(currentPage.route, currentPage.options)
}
function firstStrtoUppercase(str) {
  return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
    return '' + $1.toUpperCase() + $2
  })
}
function firstStrtoLowerCase(str) {
  return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
    return '' + $1.toLowerCase() + $2
  })
}
function validateOptionsAndSet(targetArr) {
  var _this = this
  targetArr.forEach(function (_a) {
    var target = _a[0],
      targetName = _a[1],
      expectType = _a[2]
    return toStringValidateOption(target, targetName, expectType) && (_this[targetName] = target)
  })
}

function extractErrorStack(ex, level) {
  var normal = {
    time: getTimestamp(),
    url: getUrlWithEnv(),
    name: ex.name,
    level: level,
    message: ex.message
  }
  if (typeof ex.stack === 'undefined' || !ex.stack) {
    return normal
  }
  var chrome =
      /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    gecko =
      /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
    winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
    geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
    chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/,
    lines = ex.stack.split('\n'),
    stack = []
  var submatch, parts, element
  for (var i = 0, j = lines.length; i < j; ++i) {
    if ((parts = chrome.exec(lines[i]))) {
      var isNative = parts[2] && parts[2].indexOf('native') === 0
      var isEval = parts[2] && parts[2].indexOf('eval') === 0
      if (isEval && (submatch = chromeEval.exec(parts[2]))) {
        parts[2] = submatch[1]
        parts[3] = submatch[2]
        parts[4] = submatch[3]
      }
      element = {
        url: !isNative ? parts[2] : null,
        func: parts[1] || 'UNKNOWN_FUNCTION',
        args: isNative ? [parts[2]] : [],
        line: parts[3] ? +parts[3] : null,
        column: parts[4] ? +parts[4] : null
      }
    } else if ((parts = winjs.exec(lines[i]))) {
      element = {
        url: parts[2],
        func: parts[1] || 'UNKNOWN_FUNCTION',
        args: [],
        line: +parts[3],
        column: parts[4] ? +parts[4] : null
      }
    } else if ((parts = gecko.exec(lines[i]))) {
      var isEval = parts[3] && parts[3].indexOf(' > eval') > -1
      if (isEval && (submatch = geckoEval.exec(parts[3]))) {
        parts[3] = submatch[1]
        parts[4] = submatch[2]
        parts[5] = null
      } else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
        stack[0].column = ex.columnNumber + 1
      }
      element = {
        url: parts[3],
        func: parts[1] || 'UNKNOWN_FUNCTION',
        args: parts[2] ? parts[2].split(',') : [],
        line: parts[4] ? +parts[4] : null,
        column: parts[5] ? +parts[5] : null
      }
    } else {
      continue
    }
    if (!element.func && element.line) {
      element.func = 'UNKNOWN_FUNCTION'
    }
    stack.push(element)
  }
  if (!stack.length) {
    return null
  }
  return __assign(__assign({}, normal), { stack: stack })
}

function nativeTryCatch(fn, errorFn) {
  try {
    fn()
  } catch (err) {
    console.error('err', err)
    if (errorFn) {
      errorFn(err)
    }
  }
}

var Queue = (function () {
  function Queue() {
    this.stack = []
    this.isFlushing = false
    if (!('Promise' in _global)) return
    this.micro = Promise.resolve()
  }
  Queue.prototype.addTask = function (fn) {
    var _this = this
    if (typeof fn !== 'function') return
    if (!('Promise' in _global)) {
      fn()
      return
    }
    this.stack.push(fn)
    if (!this.isFlushing) {
      this.isFlushing = true
      this.micro.then(function () {
        return _this.flushStack()
      })
    }
  }
  Queue.prototype.clear = function () {
    this.stack = []
  }
  Queue.prototype.getStack = function () {
    return this.stack
  }
  Queue.prototype.flushStack = function () {
    var temp = this.stack.slice(0)
    this.stack.length = 0
    this.isFlushing = false
    for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
      var fn = temp_1[_i]
      fn()
    }
  }
  return Queue
})()

var Severity
;(function (Severity) {
  Severity['Else'] = 'else'
  Severity['Error'] = 'error'
  Severity['Warning'] = 'warning'
  Severity['Info'] = 'info'
  Severity['Debug'] = 'debug'
  Severity['Low'] = 'low'
  Severity['Normal'] = 'normal'
  Severity['High'] = 'high'
  Severity['Critical'] = 'critical'
})(Severity || (Severity = {}))
;(function (Severity) {
  function fromString(level) {
    switch (level) {
      case 'debug':
        return Severity.Debug
      case 'info':
      case 'log':
      case 'assert':
        return Severity.Info
      case 'warn':
      case 'warning':
        return Severity.Warning
      case Severity.Low:
      case Severity.Normal:
      case Severity.High:
      case Severity.Critical:
      case 'error':
        return Severity.Error
      default:
        return Severity.Else
    }
  }
  Severity.fromString = fromString
})(Severity || (Severity = {}))

function fromHttpStatus(httpStatus) {
  if (httpStatus < 400) {
    return 'ok'
  }
  if (httpStatus >= 400 && httpStatus < 500) {
    switch (httpStatus) {
      case 401:
        return 'unauthenticated'
      case 403:
        return 'permission_denied'
      case 404:
        return 'not_found'
      case 409:
        return 'already_exists'
      case 413:
        return 'failed_precondition'
      case 429:
        return 'resource_exhausted'
      default:
        return 'invalid_argument'
    }
  }
  if (httpStatus >= 500 && httpStatus < 600) {
    switch (httpStatus) {
      case 501:
        return 'unimplemented'
      case 503:
        return 'unavailable'
      case 504:
        return 'deadline_exceeded'
      default:
        return 'internal_error'
    }
  }
  return 'unknown_error'
}

var allErrorNumber = {}
function createErrorId(data, apikey, maxDuplicateCount) {
  var id
  switch (data.type) {
    case 'HTTP':
      id = data.type + data.request.method + data.response.status + getRealPath(data.request.url) + apikey
      break
    case 'JAVASCRIPT':
    case 'VUE':
    case 'REACT':
      id = data.type + data.name + data.message + apikey
      break
    case 'LOG':
      id = data.customTag + data.type + data.name + apikey
      break
    case 'PROMISE':
      id = generatePromiseErrorId(data, apikey)
      break
    default:
      id = data.type + data.message + apikey
      break
  }
  id = hashCode(id)
  if (allErrorNumber[id] >= maxDuplicateCount) {
    return null
  }
  if (typeof allErrorNumber[id] === 'number') {
    allErrorNumber[id]++
  } else {
    allErrorNumber[id] = 1
  }
  return id
}
function generatePromiseErrorId(data, apikey) {
  var locationUrl = getRealPath(data.url)
  if (data.name === 'unhandledrejection') {
    return data.type + stringToObjAndOrder(data.message) + apikey
  }
  return data.type + data.name + stringToObjAndOrder(data.message) + locationUrl
}
function sortObjByKey(obj) {
  return Object.keys(obj)
    .sort()
    .reduce(function (total, key) {
      if (variableTypeDetection.isObject(obj[key])) {
        total[key] = sortObjByKey(obj[key])
      } else {
        total[key] = obj[key]
      }
      return total
    }, {})
}
function stringToObjAndOrder(reason) {
  try {
    if (/\{.*\}/.test(reason)) {
      var obj = JSON.parse(reason)
      obj = sortObjByKey(obj)
      return JSON.stringify(obj)
    }
    return reason
  } catch (error) {
    return reason
  }
}
function getRealPath(url) {
  return url
    .replace(/[?#].*$/, '')
    .replace(/\/(\d+)\//g, '/{param}/$1')
    .replace(/\/\d+([/]*$)/g, '/{param}$1')
}
function hashCode(str) {
  var hash = 0
  if (str.length == 0) return hash
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash
}

function parseErrorString(str) {
  var splitLine = str.split('\n')
  if (splitLine.length < 2) return null
  if (splitLine[0].indexOf('MiniProgramError') !== -1) {
    splitLine.splice(0, 1)
  }
  var message = splitLine.splice(0, 1)[0]
  var name = splitLine.splice(0, 1)[0].split(':')[0]
  var stack = []
  splitLine.forEach(function (errorLine) {
    var regexpGetFun = /at\s+([\S]+)\s+\(/
    var regexGetFile = /\(([^)]+)\)/
    var regexGetFileNoParenthese = /\s+at\s+(\S+)/
    var funcExec = regexpGetFun.exec(errorLine)
    var fileURLExec = regexGetFile.exec(errorLine)
    if (!fileURLExec) {
      fileURLExec = regexGetFileNoParenthese.exec(errorLine)
    }
    var funcNameMatch = Array.isArray(funcExec) && funcExec.length > 0 ? funcExec[1].trim() : ''
    var fileURLMatch = Array.isArray(fileURLExec) && fileURLExec.length > 0 ? fileURLExec[1] : ''
    var lineInfo = fileURLMatch.split(':')
    stack.push({
      args: [],
      func: funcNameMatch || 'UNKNOWN_FUNCTION',
      column: Number(lineInfo.pop()),
      line: Number(lineInfo.pop()),
      url: lineInfo.join(':')
    })
  })
  return {
    message: message,
    name: name,
    stack: stack
  }
}
function getBreadcrumbCategoryInWx(type) {
  switch (type) {
    case 'Xhr':
      return 'http'
    case 'Route':
    case 'UI.Tap':
    case 'UI.Touchmove':
      return 'user'
    case 'Customer':
    case 'Console':
      return 'debug'
    case 'App On Launch':
    case 'App On Show':
    case 'App On Hide':
    case 'Page On Load':
    case 'Page On Show':
    case 'Page On Ready':
    case 'Page On Hide':
    case 'Page On Share App Message':
    case 'Page On Share Timeline':
    case 'Page On Tab Item Tap':
      return 'lifecycle'
    case 'Unhandledrejection':
    case 'Code Error':
    case 'Resource':
    case 'Vue':
    case 'React':
    default:
      return 'exception'
  }
}

function getNavigateBackTargetUrl(delta) {
  if (!variableTypeDetection.isFunction(getCurrentPages)) {
    return ''
  }
  var pages = getCurrentPages()
  if (!pages.length) {
    return 'App'
  }
  delta = delta || 1
  var toPage = pages[pages.length - delta]
  return setUrlQuery(toPage.route, toPage.options)
}
function getCurrentPagesPop() {
  return getCurrentPages().pop()
}
function targetAsString(e) {
  var _a, _b
  var id = ((_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.id)
    ? ' id="' + ((_b = e.currentTarget) === null || _b === void 0 ? void 0 : _b.id) + '"'
    : ''
  var dataSets = Object.keys(e.currentTarget.dataset).map(function (key) {
    return 'data-' + key + '=' + e.currentTarget.dataset[key]
  })
  return '<element ' + id + ' ' + dataSets.join(' ') + '/>'
}
function getWxMiniDeviceInfo() {
  return __awaiter(this, void 0, void 0, function () {
    var _a, pixelRatio, screenHeight, screenWidth, netType
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          ;(_a = wx.getSystemInfoSync()), (pixelRatio = _a.pixelRatio), (screenHeight = _a.screenHeight), (screenWidth = _a.screenWidth)
          return [4, getWxMiniNetWrokType()]
        case 1:
          netType = _b.sent()
          return [
            2,
            {
              ratio: pixelRatio,
              clientHeight: screenHeight,
              clientWidth: screenWidth,
              netType: netType
            }
          ]
      }
    })
  })
}
function getWxMiniNetWrokType() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2,
        new Promise(function (resolve) {
          wx.getNetworkType({
            success: function (res) {
              resolve(res.networkType)
            },
            fail: function (err) {
              console.error('\u83B7\u53D6\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u7F51\u7EDC\u7C7B\u578B\u5931\u8D25:' + err)
              resolve('getNetWrokType failed')
            }
          })
        })
      ]
    })
  })
}
function addBreadcrumbInWx(data, type, level, params) {
  if (level === void 0) {
    level = Severity.Info
  }
  if (params === void 0) {
    params = {}
  }
  return this.breadcrumb.push(__assign({ type: type, data: data, category: getBreadcrumbCategoryInWx(type), level: level }, params))
}

var wxAppPluginMap = new Map()
wxAppPluginMap.set('AppOnLaunch', {
  transform: function (options) {
    var sdkOptions = this.options
    sdkOptions.appOnLaunch(options)
    var data = {
      path: options.path,
      query: options.query
    }
    return data
  },
  consumer: function (data) {
    addBreadcrumbInWx.call(this, data, 'App On Launch')
  }
})
wxAppPluginMap.set('AppOnShow', {
  transform: function (options) {
    var sdkOptions = this.options
    sdkOptions.appOnShow(options)
    var data = {
      path: options.path,
      query: options.query
    }
    return data
  },
  consumer: function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var _a
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = _support
            return [4, getWxMiniDeviceInfo()]
          case 1:
            _a.deviceInfo = _b.sent()
            addBreadcrumbInWx.call(this, data, 'App On Show')
            return [2]
        }
      })
    })
  }
})
wxAppPluginMap.set('AppOnHide', {
  transform: function () {
    var sdkOptions = this.options
    sdkOptions.appOnHide()
  },
  consumer: function () {
    addBreadcrumbInWx.call(this, null, 'App On Hide')
  }
})
wxAppPluginMap.set('AppOnError', {
  transform: function (error) {
    var data = {
      type: 'JAVASCRIPT',
      time: getTimestamp(),
      level: Severity.Normal,
      url: getCurrentRoute()
    }
    if (typeof error === 'string') {
      var parsedError = parseErrorString(error)
      data = __assign(__assign({}, parsedError), data)
    } else if (isError(error)) {
      data = __assign(__assign({}, extractErrorStack(error, Severity.Normal)), data)
    } else {
      logger.error("AppOnError params isn't string or error")
    }
    return data
  },
  consumer: function (transformedData) {
    var breadcrumbStack = addBreadcrumbInWx.call(this, transformedData, 'Code Error', Severity.Error)
    this.transport.send(transformedData, breadcrumbStack)
  }
})
wxAppPluginMap.set('AppOnPageNotFound', {
  transform: function (data) {
    var sdkOptions = this.options
    sdkOptions.appOnPageNotFound(data)
    return data
  },
  consumer: function (data) {
    addBreadcrumbInWx.call(this, data, 'Route', Severity.Error)
  }
})
wxAppPluginMap.set('AppOnUnhandledRejection', {
  transform: function (ev) {
    var data = {
      type: 'PROMISE',
      message: unknownToString(ev.reason),
      url: getCurrentRoute(),
      name: 'Unhandledrejection',
      time: getTimestamp(),
      level: Severity.Low
    }
    if (isError(ev.reason)) {
      data = __assign(__assign(__assign({}, data), extractErrorStack(ev.reason, Severity.Low)), { url: getCurrentRoute() })
    }
    return data
  },
  consumer: function (transformedData) {
    var breadcrumbStack = addBreadcrumbInWx.call(this, transformedData, 'Unhandledrejection', Severity.Error)
    this.transport.send(transformedData, breadcrumbStack)
  }
})
function getWxAppPlugins() {
  if (!App) return []
  var methodHooks = ['AppOnLaunch', 'AppOnShow', 'AppOnHide', 'AppOnPageNotFound', 'AppOnError', 'AppOnUnhandledRejection']
  var plugins = methodHooks.map(function (method) {
    return {
      name: method,
      monitor: function (notify) {
        var originApp = App
        App = function (appOptions) {
          replaceOld(
            appOptions,
            method.replace('AppOn', 'on'),
            function (originMethod) {
              return function () {
                var args = []
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i]
                }
                if (originMethod) {
                  originMethod.apply(this, args)
                }
                notify.apply(null, __spreadArray([method], args, true))
              }
            },
            true
          )
          return originApp(appOptions)
        }
      }
    }
  })
  return plugins.map(function (item) {
    return __assign(__assign({}, item), wxAppPluginMap.has(item.name) ? wxAppPluginMap.get(item.name) : {})
  })
}
var wxAppPlugins = getWxAppPlugins()

var wxConsolePlugin = {
  name: 'console',
  monitor: function (notify) {
    if (console && variableTypeDetection.isObject(console)) {
      var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert']
      logType.forEach(function (level) {
        if (!(level in console)) return
        replaceOld(console, level, function (originalConsole) {
          return function () {
            var args = []
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i]
            }
            if (originalConsole) {
              notify('console', { args: args, level: level })
              originalConsole.apply(console, args)
            }
          }
        })
      })
    }
  },
  transform: function (collectedData) {
    return collectedData
  },
  consumer: function (transformedData) {
    if (globalVar.isLogAddBreadcrumb) {
      addBreadcrumbInWx.call(this, transformedData, 'Console', Severity.fromString(transformedData.level))
    }
  }
}

function pageHookTransform(hook) {
  var page = getCurrentPagesPop()
  var sdkOptions = this.options
  if (page) {
    sdkOptions[firstStrtoLowerCase(hook)](page)
    return {
      path: page.route,
      query: page.options
    }
  }
  sdkOptions[firstStrtoLowerCase(hook)]()
}
function pageHookTransformWithOptions(hook, options) {
  var page = getCurrentPagesPop()
  var sdkOptions = this.options
  sdkOptions[firstStrtoLowerCase(hook)](options, page)
  return {
    path: page === null || page === void 0 ? void 0 : page.route,
    query: page === null || page === void 0 ? void 0 : page.options,
    options: options
  }
}
var wxPagePluginMap = new Map()
wxPagePluginMap.set('PageOnLoad', {
  transform: function () {
    return pageHookTransform.call(this, 'PageOnLoad')
  },
  consumer: function (data) {
    addBreadcrumbInWx.call(this, data, 'Page On Load')
  }
})
wxPagePluginMap.set('PageOnShow', {
  transform: function () {
    return pageHookTransform.call(this, 'PageOnShow')
  },
  consumer: function (data) {
    addBreadcrumbInWx.call(this, data, 'Page On Show')
  }
})
wxPagePluginMap.set('PageOnReady', {
  transform: function () {
    return pageHookTransform.call(this, 'PageOnReady')
  },
  consumer: function () {
    addBreadcrumbInWx.call(this, null, 'Page On Ready')
  }
})
wxPagePluginMap.set('PageOnHide', {
  transform: function () {
    return pageHookTransform.call(this, 'PageOnHide')
  },
  consumer: function (data) {
    addBreadcrumbInWx.call(this, data, 'Page On Hide')
  }
})
wxPagePluginMap.set('PageOnUnload', {
  transform: function () {
    return pageHookTransform.call(this, 'PageOnUnload')
  },
  consumer: function (data) {
    addBreadcrumbInWx.call(this, data, 'Page On Unload')
  }
})
wxPagePluginMap.set('PageOnShareTimeline', {
  transform: function (options) {
    return pageHookTransform.call(this, 'PageOnShareTimeline', options)
  },
  consumer: function (data) {
    addBreadcrumbInWx.call(this, data, 'Page On Share Timeline')
  }
})
wxPagePluginMap.set('PageOnShareAppMessage', {
  transform: function (options) {
    return pageHookTransformWithOptions.call(this, 'PageOnShareAppMessage', options)
  },
  consumer: function (data) {
    addBreadcrumbInWx.call(this, data, 'Page On Share App Message')
  }
})
wxPagePluginMap.set('PageOnTabItemTap', {
  transform: function (options) {
    return pageHookTransformWithOptions.call(this, 'PageOnTabItemTap', options)
  },
  consumer: function (data) {
    addBreadcrumbInWx.call(this, data, 'Page On Tab Item Tap')
  }
})
function getWxPagePlugins() {
  if (!Page) return []
  var pageHooks = [
    'PageOnLoad',
    'PageOnReady',
    'PageOnShow',
    'PageOnUnload',
    'PageOnHide',
    'PageOnShareAppMessage',
    'PageOnShareTimeline',
    'PageOnTabItemTap'
  ]
  var plugins = pageHooks.map(function (hook) {
    return {
      name: hook,
      monitor: function (notify) {
        function monitorPageHookWithOptions(options) {
          replaceOld(
            options,
            hook.replace('PageOn', 'on'),
            function (originMethod) {
              return function () {
                var args = []
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i]
                }
                notify.apply(null, __spreadArray([hook], args, true))
                if (originMethod) {
                  return originMethod.apply(this, args)
                }
              }
            },
            true
          )
        }
        invokeCallbackInReplacePage(function (pageOptions) {
          monitorPageHookWithOptions(pageOptions)
        })
        invokeCallbackInReplaceComponent(function (componentOptions) {
          monitorPageHookWithOptions(componentOptions)
        })
      }
    }
  })
  return plugins.map(function (item) {
    return __assign(__assign({}, item), wxPagePluginMap.has(item.name) ? wxPagePluginMap.get(item.name) : {})
  })
}
function invokeCallbackInReplacePage(callback) {
  var originPage = Page
  Page = function (pageOptions) {
    callback(pageOptions)
    return originPage(pageOptions)
  }
}
function invokeCallbackInReplaceComponent(callback) {
  if (!Component) {
    return
  }
  var originComponent = Component
  Component = function (componentOptions) {
    if (!isEmptyObject(componentOptions.methods)) {
      callback(componentOptions.methods)
    }
    return originComponent.call(this, componentOptions)
  }
}
var wxPagePlugins = getWxPagePlugins()

var wxDomPlugin = {
  name: 'dom',
  monitor: function (notify) {
    var sdkOptions = this.options
    function monitorDomWithOption(options) {
      function gestureTrigger(e) {
        e.mitoWorked = true
        notify('dom', e)
      }
      var throttleGesturetrigger = throttle(gestureTrigger, sdkOptions.throttleDelayTime)
      var linstenerTypes = ['touchmove', 'tap']
      if (options) {
        Object.keys(options).forEach(function (m) {
          if ('function' !== typeof options[m]) {
            return
          }
          replaceOld(
            options,
            m,
            function (originMethod) {
              return function () {
                var args = []
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i]
                }
                var e = args[0]
                if (e && e.type && e.currentTarget && !e.mitoWorked) {
                  sdkOptions.triggerWxEvent(e)
                  if (linstenerTypes.indexOf(e.type) > -1) {
                    throttleGesturetrigger(e)
                  }
                }
                return originMethod.apply(this, args)
              }
            },
            true
          )
        })
      }
    }
    invokeCallbackInReplacePage(function (pageOptions) {
      monitorDomWithOption(pageOptions)
    })
    invokeCallbackInReplaceBehavior(function (options) {
      monitorDomWithOption(options)
    })
    invokeCallbackInReplaceComponent(function (componentOptions) {
      monitorDomWithOption(componentOptions)
    })
  },
  transform: function (e) {
    var type = 'UI.Touchmove'
    if (e.type === 'tap') {
      type = 'UI.Tap'
    }
    var data = targetAsString(e)
    return { data: data, type: type }
  },
  consumer: function (_a) {
    var data = _a.data,
      type = _a.type
    addBreadcrumbInWx.call(this, data, type)
  }
}
function invokeCallbackInReplaceBehavior(callback) {
  if (!Behavior) {
    return
  }
  var originBehavior = Behavior
  Behavior = function (behaviorOptions) {
    if (!isEmptyObject(behaviorOptions.methods)) {
      callback(behaviorOptions.methods)
    }
    return originBehavior.call(this, behaviorOptions)
  }
}

var WxXhrTypes
;(function (WxXhrTypes) {
  WxXhrTypes['request'] = 'request'
  WxXhrTypes['downloadFile'] = 'downloadFile'
  WxXhrTypes['uploadFile'] = 'uploadFile'
})(WxXhrTypes || (WxXhrTypes = {}))
var wxRequestPlugin = {
  name: 'request',
  monitor: function (notify) {
    monitorWxXhr.call(this, notify)
  },
  transform: function (collectedData) {
    return httpTransform(collectedData)
  },
  consumer: function (transformedData) {
    httpTransformedDataConsumer.call(this, transformedData)
  }
}
function monitorWxXhr(notify) {
  var hookMethods = Object.keys(WxXhrTypes)
  var that = this
  var wxOptions = this.options
  hookMethods.forEach(function (hook) {
    var originRequest = wx[hook]
    Object.defineProperty(wx, hook, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function () {
        var args = []
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i]
        }
        var options = args[0]
        var url = options.url
        var method,
          reqData = undefined
        if (options.method) {
          method = options.method
        } else if (hook === WxXhrTypes.downloadFile) {
          method = 'GET'
        } else {
          method = 'POST'
        }
        var header = options.header
        !header && (header = {})
        if ((method === 'POST' && that.transport.isSelfDsn(url)) || wxOptions.isFilterHttpUrl(url)) {
          return originRequest.call(this, options)
        }
        switch (hook) {
          case WxXhrTypes.request:
            reqData = options.data
            break
          case WxXhrTypes.downloadFile:
            reqData = {
              filePath: options.filePath
            }
            break
          default:
            reqData = {
              filePath: options.filePath,
              name: options.name
            }
        }
        var httpCollect = {
          request: {
            httpType: 'xhr',
            url: url,
            method: method,
            data: reqData
          },
          response: {},
          time: getTimestamp()
        }
        wxOptions.setTraceId(url, function (headerFieldName, traceId) {
          httpCollect.request.traceId = traceId
          header[headerFieldName] = traceId
        })
        function setRequestHeader(key, value) {
          header[key] = value
        }
        wxOptions.beforeAppAjaxSend && wxOptions.beforeAppAjaxSend({ method: method, url: url }, { setRequestHeader: setRequestHeader })
        var successHandler = function (res) {
          var endTime = getTimestamp()
          httpCollect.response.data = (variableTypeDetection.isString(res.data) || variableTypeDetection.isObject(res.data)) && res.data
          httpCollect.elapsedTime = endTime - httpCollect.time
          httpCollect.response.status = res.statusCode
          httpCollect.errMsg = res.errMsg
          notify('request', httpCollect)
          if (variableTypeDetection.isFunction(options.success)) {
            return options.success(res)
          }
        }
        var _fail = options.fail
        var failHandler = function (err) {
          var endTime = getTimestamp()
          httpCollect.elapsedTime = endTime - httpCollect.time
          httpCollect.errMsg = err.errMsg
          httpCollect.response.status = 0
          notify('request', httpCollect)
          if (variableTypeDetection.isFunction(_fail)) {
            return _fail(err)
          }
        }
        var actOptions = __assign(__assign({}, options), { success: successHandler, fail: failHandler })
        return originRequest.call(this, actOptions)
      }
    })
  })
}
function httpTransform(httpCollectedData) {
  var message = ''
  var _a = httpCollectedData.request,
    httpType = _a.httpType,
    method = _a.method,
    url = _a.url,
    status = httpCollectedData.response.status,
    elapsedTime = httpCollectedData.elapsedTime
  var name = httpType + '--' + method
  if (status === 0) {
    message =
      elapsedTime <= globalVar.crossOriginThreshold ? 'http请求失败，失败原因：跨域限制或域名不存在' : 'http请求失败，失败原因：超时'
  } else {
    message = fromHttpStatus(status)
  }
  message = message === 'ok' ? message : message + ' ' + getRealPath(url)
  return __assign(__assign({}, httpCollectedData), {
    type: 'HTTP',
    url: getCurrentRoute(),
    level: Severity.Low,
    message: message,
    name: name
  })
}
function httpTransformedDataConsumer(transformedData) {
  var type = 'Xhr'
  var status = transformedData.response.status,
    time = transformedData.time
  var isError = status === 0 || status === 400 || status > 401
  addBreadcrumbInWx.call(this, transformedData, type, Severity.Info, { time: time })
  if (isError) {
    var breadcrumbStack = this.breadcrumb.push({
      type: type,
      category: 'exception',
      data: __assign({}, transformedData),
      level: Severity.Error,
      time: time
    })
    this.transport.send(transformedData, breadcrumbStack)
  }
}

var wxRoutePlugin = {
  name: 'route',
  monitor: function (notify) {
    monitorWxRoute.call(this, notify)
  },
  transform: function (collectedData) {
    var reportData = {
      type: 'ROUTE',
      message: collectedData.message,
      url: collectedData.to,
      name: 'MINI_' + 'ROUTE',
      level: Severity.Error
    }
    return {
      data: reportData,
      collectedData: collectedData
    }
  },
  consumer: function (transformedData) {
    var data = transformedData.data,
      collectedData = transformedData.collectedData
    if (collectedData.isFail) {
      var breadcrumbStack = addBreadcrumbInWx.call(this, collectedData, 'Code Error', Severity.Error)
      return this.transport.send(data, breadcrumbStack)
    }
    addBreadcrumbInWx.call(this, collectedData, 'Route')
  }
}
function monitorWxRoute(notify) {
  var wxOptions = this.options
  var methods = ['switchTab', 'reLaunch', 'redirectTo', 'navigateTo', 'navigateBack', 'navigateToMiniProgram']
  methods.forEach(function (method) {
    var originMethod = wx[method]
    Object.defineProperty(wx, method, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function (options) {
        var _a
        var toUrl
        if (method === 'navigateBack') {
          toUrl = getNavigateBackTargetUrl((_a = options) === null || _a === void 0 ? void 0 : _a.delta)
        } else {
          toUrl = options.url
        }
        var data = {
          from: getCurrentRoute(),
          to: toUrl
        }
        notify('route', data)
        if (
          variableTypeDetection.isFunction(options.complete) ||
          variableTypeDetection.isFunction(options.success) ||
          variableTypeDetection.isFunction(options.fail)
        ) {
          var _fail_1 = options.fail
          var failHandler = function (res) {
            var failData = __assign(__assign({}, data), { isFail: true, message: res.errMsg })
            notify('route', failData)
            if (variableTypeDetection.isFunction(_fail_1)) {
              return _fail_1(res)
            }
          }
          options.fail = failHandler
        }
        if (method === 'navigateToMiniProgram' && variableTypeDetection.isFunction(wxOptions.wxNavigateToMiniProgram)) {
          options = wxOptions.wxNavigateToMiniProgram(options)
        }
        return originMethod.call(this, options)
      }
    })
  })
}

var Breadcrumb = (function () {
  function Breadcrumb(options) {
    if (options === void 0) {
      options = {}
    }
    this.maxBreadcrumbs = 10
    this.beforePushBreadcrumb = null
    this.stack = []
    this.bindOptions(options)
  }
  Breadcrumb.prototype.push = function (data) {
    var _this = this
    if (typeof this.beforePushBreadcrumb === 'function') {
      var result_1 = null
      var beforePushBreadcrumb_1 = this.beforePushBreadcrumb
      silentConsoleScope(function () {
        result_1 = beforePushBreadcrumb_1.call(_this, _this, data)
      })
      if (!result_1) return this.stack
      return this.immediatePush(result_1)
    }
    return this.immediatePush(data)
  }
  Breadcrumb.prototype.immediatePush = function (data) {
    data.time || (data.time = getTimestamp())
    if (this.stack.length >= this.maxBreadcrumbs) {
      this.shift()
    }
    this.stack.push(data)
    this.stack.sort(function (a, b) {
      return a.time - b.time
    })
    logger.log(this.stack)
    return this.stack
  }
  Breadcrumb.prototype.shift = function () {
    return this.stack.shift() !== undefined
  }
  Breadcrumb.prototype.clear = function () {
    this.stack = []
  }
  Breadcrumb.prototype.getStack = function () {
    return this.stack
  }
  Breadcrumb.prototype.bindOptions = function (options) {
    if (options === void 0) {
      options = {}
    }
    var maxBreadcrumbs = options.maxBreadcrumbs,
      beforePushBreadcrumb = options.beforePushBreadcrumb
    toStringValidateOption(maxBreadcrumbs, 'maxBreadcrumbs', 'Number') && (this.maxBreadcrumbs = maxBreadcrumbs)
    toStringValidateOption(beforePushBreadcrumb, 'beforePushBreadcrumb', 'Function') && (this.beforePushBreadcrumb = beforePushBreadcrumb)
  }
  return Breadcrumb
})()

var Subscrib = (function () {
  function Subscrib() {
    this.dep = new Map()
  }
  Subscrib.prototype.watch = function (eventName, callBack) {
    var fns = this.dep.get(eventName)
    if (fns) {
      this.dep.set(eventName, fns.concat(callBack))
      return
    }
    this.dep.set(eventName, [callBack])
  }
  Subscrib.prototype.notify = function (eventName, data) {
    var fns = this.dep.get(eventName)
    if (!eventName || !fns) return
    fns.forEach(function (fn) {
      nativeTryCatch(
        function () {
          fn(data)
        },
        function (e) {
          logger.error(
            'Subscrib.notify\uFF1A\u76D1\u542C\u4E8B\u4EF6\u7684\u56DE\u8C03\u51FD\u6570\u53D1\u751F\u9519\u8BEF\neventName:' +
              eventName +
              '\nName: ' +
              getFunctionName(fn) +
              '\nError: ' +
              e
          )
        }
      )
    })
  }
  return Subscrib
})()

var BaseClient = (function () {
  function BaseClient(options) {
    this.SDK_VERSION = SDK_VERSION
    this.options = options
    logger.bindOptions(options.debug)
  }
  BaseClient.prototype.use = function (plugins) {
    var _this = this
    if (this.options.disabled) return
    var subscrib = new Subscrib()
    plugins.forEach(function (item) {
      if (!_this.isPluginEnable(item.name)) return
      item.monitor.call(_this, subscrib.notify.bind(subscrib))
      var wrapperTranform = function () {
        var _a, _b
        var args = []
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i]
        }
        var res = (_a = item.transform) === null || _a === void 0 ? void 0 : _a.apply(_this, args)
        ;(_b = item.consumer) === null || _b === void 0 ? void 0 : _b.call(_this, res)
      }
      subscrib.watch(item.name, wrapperTranform)
    })
  }
  BaseClient.prototype.getOptions = function () {
    return this.options
  }
  return BaseClient
})()

var BaseOptions = (function () {
  function BaseOptions() {
    this.enableTraceId = false
    this.includeHttpUrlTraceIdRegExp = /.*/
    this.traceIdFieldName = 'Trace-Id'
    this.throttleDelayTime = 0
    this.beforeAppAjaxSend = null
    this.vue = null
  }
  BaseOptions.prototype.bindOptions = function (options) {
    var enableTraceId = options.enableTraceId,
      vue = options.vue,
      filterXhrUrlRegExp = options.filterXhrUrlRegExp,
      traceIdFieldName = options.traceIdFieldName,
      throttleDelayTime = options.throttleDelayTime,
      includeHttpUrlTraceIdRegExp = options.includeHttpUrlTraceIdRegExp,
      beforeAppAjaxSend = options.beforeAppAjaxSend
    var optionArr = [
      [enableTraceId, 'enableTraceId', 'Boolean'],
      [traceIdFieldName, 'traceIdFieldName', 'String'],
      [throttleDelayTime, 'throttleDelayTime', 'Number'],
      [filterXhrUrlRegExp, 'filterXhrUrlRegExp', 'RegExp'],
      [includeHttpUrlTraceIdRegExp, 'includeHttpUrlTraceIdRegExp', 'RegExp'],
      [beforeAppAjaxSend, 'beforeAppAjaxSend', 'Function']
    ]
    validateOptionsAndSet.call(this, optionArr)
    this.vue = vue
  }
  BaseOptions.prototype.isFilterHttpUrl = function (url) {
    return this.filterXhrUrlRegExp && this.filterXhrUrlRegExp.test(url)
  }
  BaseOptions.prototype.setTraceId = function (httpUrl, callback) {
    var _a = this,
      includeHttpUrlTraceIdRegExp = _a.includeHttpUrlTraceIdRegExp,
      enableTraceId = _a.enableTraceId
    if (enableTraceId && includeHttpUrlTraceIdRegExp && includeHttpUrlTraceIdRegExp.test(httpUrl)) {
      var traceId = generateUUID()
      callback(this.traceIdFieldName, traceId)
    }
  }
  return BaseOptions
})()

var BaseTransport = (function () {
  function BaseTransport() {
    this.apikey = ''
    this.dsn = ''
    this.beforeDataReport = null
    this.backTrackerId = null
    this.configReportUrl = null
    this.maxDuplicateCount = 3
    this.queue = new Queue()
  }
  BaseTransport.prototype.getAuthInfo = function () {
    var trackerId = this.getTrackerId()
    var result = {
      trackerId: String(trackerId),
      sdkVersion: SDK_VERSION,
      sdkName: SDK_NAME,
      apikey: this.apikey
    }
    return result
  }
  BaseTransport.prototype.getTrackerId = function () {
    if (typeof this.backTrackerId === 'function') {
      var trackerId = this.backTrackerId()
      if (typeof trackerId === 'string' || typeof trackerId === 'number') {
        return trackerId
      } else {
        logger.error(
          'trackerId:' + trackerId + ' \u671F\u671B string \u6216 number \u7C7B\u578B\uFF0C\u4F46\u662F\u4F20\u5165 ' + typeof trackerId
        )
      }
    }
    return ''
  }
  BaseTransport.prototype.isSelfDsn = function (targetUrl) {
    return this.dsn && isInclude(targetUrl, this.dsn)
  }
  BaseTransport.prototype.bindOptions = function (options) {
    if (options === void 0) {
      options = {}
    }
    var dsn = options.dsn,
      beforeDataReport = options.beforeDataReport,
      apikey = options.apikey,
      maxDuplicateCount = options.maxDuplicateCount,
      backTrackerId = options.backTrackerId,
      configReportUrl = options.configReportUrl
    var functionType = 'Function'
    var optionArr = [
      [apikey, 'apikey', 'String'],
      [dsn, 'dsn', 'String'],
      [maxDuplicateCount, 'maxDuplicateCount', 'Number'],
      [beforeDataReport, 'beforeDataReport', functionType],
      [backTrackerId, 'backTrackerId', functionType],
      [configReportUrl, 'configReportUrl', functionType]
    ]
    validateOptionsAndSet.call(this, optionArr)
  }
  BaseTransport.prototype.send = function (data, breadcrumb) {
    if (breadcrumb === void 0) {
      breadcrumb = []
    }
    return __awaiter(this, void 0, void 0, function () {
      var errorId, transportData, dsn
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!data.isTrack) {
              errorId = createErrorId(data, this.apikey, this.maxDuplicateCount)
              if (!errorId) return [2]
              data.errorId = errorId
            }
            transportData = __assign(__assign({}, this.getTransportData(data)), { breadcrumb: breadcrumb })
            if (!(typeof this.beforeDataReport === 'function')) return [3, 2]
            return [4, this.beforeDataReport(transportData)]
          case 1:
            transportData = _a.sent()
            if (!transportData) return [2]
            _a.label = 2
          case 2:
            dsn = this.dsn
            if (isEmpty(dsn)) {
              logger.error('dsn is empty,pass in when initializing please')
              return [2]
            }
            if (typeof this.configReportUrl === 'function') {
              dsn = this.configReportUrl(transportData, dsn)
              if (!dsn) return [2]
            }
            return [2, this.sendToServer(transportData, dsn)]
        }
      })
    })
  }
  return BaseTransport
})()

var WxOptions = (function (_super) {
  __extends(WxOptions, _super)
  function WxOptions(options) {
    var _this = _super.call(this) || this
    _this.appOnLaunch = function () {}
    _this.appOnShow = function () {}
    _this.appOnHide = function () {}
    _this.pageOnLoad = function () {}
    _this.pageOnShow = function () {}
    _this.pageOnReady = function () {}
    _this.pageOnHide = function () {}
    _this.pageOnUnload = function () {}
    _this.appOnPageNotFound = function () {}
    _this.pageOnShareAppMessage = function () {}
    _this.pageOnShareTimeline = function () {}
    _this.pageOnTabItemTap = function () {}
    _this.triggerWxEvent = function () {}
    _super.prototype.bindOptions.call(_this, options)
    _this.bindOptions(options)
    return _this
  }
  WxOptions.prototype.bindOptions = function (options) {
    var beforeAppAjaxSend = options.beforeAppAjaxSend,
      appOnLaunch = options.appOnLaunch,
      appOnShow = options.appOnShow,
      appOnHide = options.appOnHide,
      appOnPageNotFound = options.appOnPageNotFound,
      pageOnLoad = options.pageOnLoad,
      pageOnReady = options.pageOnReady,
      pageOnShow = options.pageOnShow,
      pageOnUnload = options.pageOnUnload,
      pageOnHide = options.pageOnHide,
      pageOnShareAppMessage = options.pageOnShareAppMessage,
      pageOnShareTimeline = options.pageOnShareTimeline,
      pageOnTabItemTap = options.pageOnTabItemTap,
      wxNavigateToMiniProgram = options.wxNavigateToMiniProgram,
      triggerWxEvent = options.triggerWxEvent,
      silentRequest = options.silentRequest,
      silentConsole = options.silentConsole,
      silentDom = options.silentDom,
      silentRoute = options.silentRoute,
      silentAppOnError = options.silentAppOnError,
      silentAppOnUnhandledRejection = options.silentAppOnUnhandledRejection,
      silentAppOnPageNotFound = options.silentAppOnPageNotFound,
      silentPageOnShareAppMessage = options.silentPageOnShareAppMessage,
      silentPageOnShareTimeline = options.silentPageOnShareTimeline
    var booleanType = 'Boolean'
    var functionType = 'Function'
    var optionArr = [
      [silentRequest, 'silentRequest', booleanType],
      [silentConsole, 'silentConsole', booleanType],
      [silentDom, 'silentDom', booleanType],
      [silentRoute, 'silentRoute', booleanType],
      [silentAppOnError, 'silentAppOnError', booleanType],
      [silentAppOnUnhandledRejection, 'silentAppOnUnhandledRejection', booleanType],
      [silentAppOnPageNotFound, 'silentAppOnPageNotFound', booleanType],
      [silentPageOnShareAppMessage, 'silentPageOnShareAppMessage', booleanType],
      [silentPageOnShareTimeline, 'silentPageOnShareTimeline', booleanType],
      [beforeAppAjaxSend, 'beforeAppAjaxSend', functionType],
      [appOnLaunch, 'appOnLaunch', functionType],
      [appOnShow, 'appOnShow', functionType],
      [appOnHide, 'appOnHide', functionType],
      [appOnPageNotFound, 'appOnPageNotFound', functionType],
      [pageOnLoad, 'pageOnLoad', functionType],
      [pageOnReady, 'pageOnReady', functionType],
      [pageOnShow, 'pageOnShow', functionType],
      [pageOnUnload, 'pageOnUnload', functionType],
      [pageOnHide, 'pageOnHide', functionType],
      [pageOnShareAppMessage, 'pageOnShareAppMessage', functionType],
      [pageOnShareTimeline, 'pageOnShareTimeline', functionType],
      [pageOnTabItemTap, 'pageOnTabItemTap', functionType],
      [wxNavigateToMiniProgram, 'wxNavigateToMiniProgram', functionType],
      [triggerWxEvent, 'triggerWxEvent', functionType]
    ]
    validateOptionsAndSet.call(this, optionArr)
  }
  return WxOptions
})(BaseOptions)

var WxTransport = (function (_super) {
  __extends(WxTransport, _super)
  function WxTransport(options) {
    if (options === void 0) {
      options = {}
    }
    var _this = _super.call(this) || this
    _this.useImgUpload = false
    _super.prototype.bindOptions.call(_this, options)
    _this.bindOptions(options)
    return _this
  }
  WxTransport.prototype.post = function (data, url) {
    var _this = this
    var requestFun = function () {
      var requestOptions = { method: 'POST' }
      if (typeof _this.configReportWxRequest === 'function') {
        var params = _this.configReportWxRequest(data)
        requestOptions = __assign(__assign({}, requestOptions), params)
      }
      requestOptions = __assign(__assign({}, requestOptions), { data: JSON.stringify(data), url: url })
      wx.request(requestOptions)
    }
    this.queue.addTask(requestFun)
  }
  WxTransport.prototype.sendToServer = function (data, url) {
    return this.post(data, url)
  }
  WxTransport.prototype.getTransportData = function (data) {
    return {
      authInfo: this.getAuthInfo(),
      data: data,
      deviceInfo: _support.deviceInfo
    }
  }
  WxTransport.prototype.bindOptions = function (options) {
    if (options === void 0) {
      options = {}
    }
    var configReportWxRequest = options.configReportWxRequest
    toStringValidateOption(configReportWxRequest, 'configReportWxRequest', 'Function') &&
      (this.configReportWxRequest = configReportWxRequest)
  }
  return WxTransport
})(BaseTransport)

var WxClient = (function (_super) {
  __extends(WxClient, _super)
  function WxClient(options) {
    if (options === void 0) {
      options = {}
    }
    var _this = _super.call(this, options) || this
    _this.options = new WxOptions(options)
    _this.transport = new WxTransport(options)
    _this.breadcrumb = new Breadcrumb(options)
    return _this
  }
  WxClient.prototype.isPluginEnable = function (name) {
    var silentField = '' + Silent + firstStrtoUppercase(name)
    return !this.options[silentField]
  }
  WxClient.prototype.log = function (data) {
    var _a = data.message,
      message = _a === void 0 ? MitoLogEmptyMsg : _a,
      _b = data.tag,
      tag = _b === void 0 ? MitoLogEmptyTag : _b,
      _c = data.level,
      level = _c === void 0 ? Severity.Critical : _c,
      _d = data.ex,
      ex = _d === void 0 ? '' : _d
    var errorInfo = {}
    if (isError(ex)) {
      errorInfo = extractErrorStack(ex, level)
    }
    var reportData = __assign(
      {
        type: 'LOG',
        level: level,
        message: unknownToString(message),
        name: MitoLog,
        customTag: unknownToString(tag),
        time: getTimestamp(),
        url: getCurrentRoute()
      },
      errorInfo
    )
    var breadcrumbStack = addBreadcrumbInWx.call(this, message, 'Customer', Severity.fromString(level.toString()))
    this.transport.send(reportData, breadcrumbStack)
  }
  WxClient.prototype.trackSend = function (trackData) {
    this.transport.send(__assign({ isTrack: true }, trackData), this.breadcrumb.getStack())
  }
  return WxClient
})(BaseClient)

function createWxInstance(options, plugins) {
  if (plugins === void 0) {
    plugins = []
  }
  var wxClient = new WxClient(options)
  var wxPlugins = __spreadArray(
    __spreadArray(__spreadArray([wxRequestPlugin, wxRoutePlugin, wxConsolePlugin, wxDomPlugin], wxAppPlugins, true), wxPagePlugins, true),
    plugins,
    true
  )
  wxClient.use(wxPlugins)
  return wxClient
}
var init = createWxInstance

exports.WxClient = WxClient
exports.init = init
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=wx-mini.js.map
