/* @mitojs/utils version ' + 2.1.25 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var WxBreadcrumbTypes;
(function (WxBreadcrumbTypes) {
    WxBreadcrumbTypes["VUE"] = "Vue";
    WxBreadcrumbTypes["REACT"] = "React";
    WxBreadcrumbTypes["ROUTE"] = "Route";
    WxBreadcrumbTypes["CONSOLE"] = "Console";
    WxBreadcrumbTypes["XHR"] = "Xhr";
    WxBreadcrumbTypes["UNHANDLEDREJECTION"] = "Unhandledrejection";
    WxBreadcrumbTypes["RESOURCE"] = "Resource";
    WxBreadcrumbTypes["CODE_ERROR"] = "Code Error";
    WxBreadcrumbTypes["CUSTOMER"] = "Customer";
    WxBreadcrumbTypes["APP_ON_SHOW"] = "App On Show";
    WxBreadcrumbTypes["APP_ON_LAUNCH"] = "App On Launch";
    WxBreadcrumbTypes["APP_ON_HIDE"] = "App On Hide";
    WxBreadcrumbTypes["PAGE_ON_LOAD"] = "Page On Load";
    WxBreadcrumbTypes["PAGE_ON_SHOW"] = "Page On Show";
    WxBreadcrumbTypes["PAGE_ON_READY"] = "Page On Ready";
    WxBreadcrumbTypes["PAGE_ON_HIDE"] = "Page On Hide";
    WxBreadcrumbTypes["PAGE_ON_UNLOAD"] = "Page On Unload";
    WxBreadcrumbTypes["PAGE_ON_SHARE_APP_MESSAGE"] = "Page On Share App Message";
    WxBreadcrumbTypes["PAGE_ON_SHARE_TIMELINE"] = "Page On Share Timeline";
    WxBreadcrumbTypes["PAGE_ON_TAB_ITEM_TAP"] = "Page On Tab Item Tap";
    WxBreadcrumbTypes["TAP"] = "UI.Tap";
    WxBreadcrumbTypes["TOUCHMOVE"] = "UI.Touchmove";
})(WxBreadcrumbTypes || (WxBreadcrumbTypes = {}));
var WxAppEvents;
(function (WxAppEvents) {
    WxAppEvents["AppOnLaunch"] = "AppOnLaunch";
    WxAppEvents["AppOnShow"] = "AppOnShow";
    WxAppEvents["AppOnHide"] = "AppOnHide";
    WxAppEvents["AppOnError"] = "AppOnError";
    WxAppEvents["AppOnPageNotFound"] = "AppOnPageNotFound";
    WxAppEvents["AppOnUnhandledRejection"] = "AppOnUnhandledRejection";
})(WxAppEvents || (WxAppEvents = {}));
var WxPageEvents;
(function (WxPageEvents) {
    WxPageEvents["PageOnLoad"] = "PageOnLoad";
    WxPageEvents["PageOnShow"] = "PageOnShow";
    WxPageEvents["PageOnHide"] = "PageOnHide";
    WxPageEvents["PageOnReady"] = "PageOnReady";
    WxPageEvents["PageOnUnload"] = "PageOnUnload";
    WxPageEvents["PageOnShareAppMessage"] = "PageOnShareAppMessage";
    WxPageEvents["PageOnShareTimeline"] = "PageOnShareTimeline";
    WxPageEvents["PageOnTabItemTap"] = "PageOnTabItemTap";
})(WxPageEvents || (WxPageEvents = {}));
var WxRouteEvents;
(function (WxRouteEvents) {
    WxRouteEvents["SwitchTab"] = "switchTab";
    WxRouteEvents["ReLaunch"] = "reLaunch";
    WxRouteEvents["RedirectTo"] = "redirectTo";
    WxRouteEvents["NavigateTo"] = "navigateTo";
    WxRouteEvents["NavigateBack"] = "navigateBack";
    WxRouteEvents["NavigateToMiniProgram"] = "navigateToMiniProgram";
    WxRouteEvents["RouteFail"] = "routeFail";
})(WxRouteEvents || (WxRouteEvents = {}));
var WxBaseEventTypes;
(function (WxBaseEventTypes) {
    WxBaseEventTypes["REQUEST"] = "request";
    WxBaseEventTypes["CONSOLE"] = "console";
    WxBaseEventTypes["ERROR"] = "error";
    WxBaseEventTypes["UNHANDLEDREJECTION"] = "unhandledrejection";
    WxBaseEventTypes["MINI_ROUTE"] = "miniRoute";
    WxBaseEventTypes["DOM"] = "dom";
    WxBaseEventTypes["MINI_PERFORMANCE"] = "miniPerformance";
    WxBaseEventTypes["MINI_MEMORY_WARNING"] = "miniMemoryWarning";
    WxBaseEventTypes["MINI_NETWORK_STATUS_CHANGE"] = "miniNetworkStatusChange";
    WxBaseEventTypes["MINI_BATTERY_INFO"] = "miniBatteryInfo";
})(WxBaseEventTypes || (WxBaseEventTypes = {}));
var LinstenerTypes;
(function (LinstenerTypes) {
    LinstenerTypes["Touchmove"] = "touchmove";
    LinstenerTypes["Tap"] = "tap";
    LinstenerTypes["Longtap"] = "longtap";
    LinstenerTypes["Longpress"] = "longpress";
})(LinstenerTypes || (LinstenerTypes = {}));
Object.assign({}, WxAppEvents, WxPageEvents, WxBaseEventTypes);

var TrackActionType;
(function (TrackActionType) {
    TrackActionType["PAGE"] = "PAGE";
    TrackActionType["EVENT"] = "EVENT";
    TrackActionType["VIEW"] = "VIEW";
    TrackActionType["DURATION"] = "DURATION";
    TrackActionType["DURATION_VIEW"] = "DURATION_VIEW";
    TrackActionType["OTHER"] = "OTHER";
})(TrackActionType || (TrackActionType = {}));

var nativeToString = Object.prototype.toString;
function isType(type) {
    return function (value) {
        return nativeToString.call(value) === "[object " + type + "]";
    };
}
var variableTypeDetection = {
    isNumber: isType("Number"),
    isString: isType("String"),
    isBoolean: isType("Boolean"),
    isNull: isType("Null"),
    isUndefined: isType("Undefined"),
    isSymbol: isType("Symbol"),
    isFunction: isType("Function"),
    isObject: isType("Object"),
    isArray: isType("Array"),
    isProcess: isType("process"),
    isWindow: isType("Window")
};
function isError(wat) {
    switch (nativeToString.call(wat)) {
        case '[object Error]':
            return true;
        case '[object Exception]':
            return true;
        case '[object DOMException]':
            return true;
        default:
            return isInstanceOf(wat, Error);
    }
}
function isEmptyObject(obj) {
    return variableTypeDetection.isObject(obj) && Object.keys(obj).length === 0;
}
function isEmpty(wat) {
    return (variableTypeDetection.isString(wat) && wat.trim() === '') || wat === undefined || wat === null;
}
function isInstanceOf(wat, base) {
    try {
        return wat instanceof base;
    }
    catch (_e) {
        return false;
    }
}
function isExistProperty(obj, key) {
    return obj.hasOwnProperty(key);
}

var isNodeEnv = variableTypeDetection.isProcess(typeof process !== 'undefined' ? process : 0);
var isWxMiniEnv = variableTypeDetection.isObject(typeof wx !== 'undefined' ? wx : 0) &&
    variableTypeDetection.isFunction(typeof App !== 'undefined' ? App : 0);
var isBrowserEnv = variableTypeDetection.isWindow(typeof window !== 'undefined' ? window : 0);
function getGlobal() {
    if (isBrowserEnv)
        return window;
    if (isWxMiniEnv)
        return wx;
    if (isNodeEnv)
        return process;
}
var _global = getGlobal();
var _support = getGlobalMitoSupport();
function getGlobalMitoSupport() {
    _global.__MITO__ = _global.__MITO__ || {};
    return _global.__MITO__;
}
_support.replaceFlag = _support.replaceFlag || {};
var replaceFlag = _support.replaceFlag;
function setFlag(replaceType, isSet) {
    if (replaceFlag[replaceType])
        return;
    replaceFlag[replaceType] = isSet;
}
function getFlag(replaceType) {
    return replaceFlag[replaceType] ? true : false;
}
function supportsHistory() {
    var chrome = _global.chrome;
    var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
    var hasHistoryApi = 'history' in _global && !!_global.history.pushState && !!_global.history.replaceState;
    return !isChromePackagedApp && hasHistoryApi;
}

var PREFIX = 'MITO Logger';
var Logger = (function () {
    function Logger() {
        var _this = this;
        this.enabled = false;
        this._console = {};
        _global.console = console || _global.console;
        if (console || _global.console) {
            var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
            logType.forEach(function (level) {
                if (!(level in _global.console))
                    return;
                _this._console[level] = _global.console[level];
            });
        }
    }
    Logger.prototype.disable = function () {
        this.enabled = false;
    };
    Logger.prototype.bindOptions = function (debug) {
        this.enabled = debug ? true : false;
    };
    Logger.prototype.enable = function () {
        this.enabled = true;
    };
    Logger.prototype.getEnableStatus = function () {
        return this.enabled;
    };
    Logger.prototype.log = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        (_a = this._console).log.apply(_a, __spreadArray([PREFIX + "[Log]:"], args, false));
    };
    Logger.prototype.warn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        (_a = this._console).warn.apply(_a, __spreadArray([PREFIX + "[Warn]:"], args, false));
    };
    Logger.prototype.error = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._console).error.apply(_a, __spreadArray([PREFIX + "[Error]:"], args, false));
    };
    return Logger;
}());
var logger = _support.logger || (_support.logger = new Logger());

function getLocationHref() {
    if (typeof document === 'undefined' || document.location == null)
        return '';
    return document.location.href;
}
function getUrlWithEnv() {
    if (isWxMiniEnv)
        return getCurrentRoute();
    if (isBrowserEnv)
        return getLocationHref();
    return '';
}
function on(target, eventName, handler, opitons) {
    if (opitons === void 0) { opitons = false; }
    target.addEventListener(eventName, handler, opitons);
}
function replaceOld(source, name, replacement, isForced) {
    if (isForced === void 0) { isForced = false; }
    if (source === undefined)
        return;
    if (name in source || isForced) {
        var original = source[name];
        var wrapped = replacement(original);
        if (typeof wrapped === 'function') {
            source[name] = wrapped;
        }
    }
}
function splitObjToQuery(obj) {
    return Object.entries(obj).reduce(function (result, _a, index) {
        var key = _a[0], value = _a[1];
        if (index !== 0) {
            result += '&';
        }
        var valueStr = variableTypeDetection.isObject(value) || variableTypeDetection.isArray(value) ? JSON.stringify(value) : value;
        result += key + "=" + valueStr;
        return result;
    }, '');
}
var defaultFunctionName = '<anonymous>';
function getFunctionName(fn) {
    if (!fn || typeof fn !== 'function') {
        return defaultFunctionName;
    }
    return fn.name || defaultFunctionName;
}
function throttle(fn, delay) {
    var canRun = true;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!canRun)
            return;
        fn.apply(this, args);
        canRun = false;
        setTimeout(function () {
            canRun = true;
        }, delay);
    };
}
function isInclude(origin, target) {
    return !!~origin.indexOf(target);
}
function getTimestamp() {
    return Date.now();
}
function toStringAny(target, type) {
    return nativeToString.call(target) === "[object " + type + "]";
}
function toStringValidateOption(target, targetName, expectType) {
    if (toStringAny(target, expectType))
        return true;
    typeof target !== 'undefined' && logger.error(targetName + "\u671F\u671B\u4F20\u5165" + expectType + "\u7C7B\u578B\uFF0C\u5F53\u524D\u662F" + nativeToString.call(target) + "\u7C7B\u578B");
    return false;
}
function silentConsoleScope(callback) {
    callback();
}
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}
function unknownToString(target) {
    if (variableTypeDetection.isString(target)) {
        return target;
    }
    if (variableTypeDetection.isUndefined(target)) {
        return 'undefined';
    }
    return JSON.stringify(target);
}
function getBigVersion(version) {
    return Number(version.split('.')[0]);
}
function isHttpFail(code) {
    return code === 0 || code === 400 || code > 401;
}
function setUrlQuery(url, query) {
    var queryArr = [];
    Object.keys(query).forEach(function (k) {
        queryArr.push(k + "=" + query[k]);
    });
    if (url.indexOf('?') !== -1) {
        url = url + "&" + queryArr.join('&');
    }
    else {
        url = url + "?" + queryArr.join('&');
    }
    return url;
}
function interceptStr(str, interceptLength) {
    if (variableTypeDetection.isString(str)) {
        return str.slice(0, interceptLength) + (str.length > interceptLength ? ":\u622A\u53D6\u524D" + interceptLength + "\u4E2A\u5B57\u7B26" : '');
    }
    return '';
}
function getCurrentRoute() {
    if (!variableTypeDetection.isFunction(getCurrentPages)) {
        return '';
    }
    var pages = getCurrentPages();
    if (!pages.length) {
        return 'App';
    }
    var currentPage = pages.pop();
    return setUrlQuery(currentPage.route, currentPage.options);
}
function firstStrtoUppercase(str) {
    return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
        return "" + $1.toUpperCase() + $2;
    });
}
function firstStrtoLowerCase(str) {
    return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
        return "" + $1.toLowerCase() + $2;
    });
}
function safeStringify(obj) {
    var set = new Set();
    var str = JSON.stringify(obj, function (_key, value) {
        if (set.has(value)) {
            return 'Circular';
        }
        typeof value === 'object' && set.add(value);
        return value;
    });
    set.clear();
    return str;
}
function getObjectWithForIn(obj) {
    if (!variableTypeDetection.isObject(obj))
        ;
    var result = {};
    for (var key in obj) {
        result[key] = obj[key];
    }
    return result;
}
function validateOptionsAndSet(targetArr, expectType) {
    var _this = this;
    targetArr.forEach(function (_a) {
        var target = _a[0], targetName = _a[1];
        return toStringValidateOption(target, targetName, expectType) && (_this[targetName] = target);
    });
}

function htmlElementAsString(target) {
    var tagName = target.tagName.toLowerCase();
    if (tagName === 'body') {
        return null;
    }
    var classNames = target.classList.value;
    classNames = classNames !== '' ? " class=\"" + classNames + "\"" : '';
    var id = target.id ? " id=\"" + target.id + "\"" : '';
    var innerText = target.innerText;
    return "<" + tagName + id + (classNames !== '' ? classNames : '') + ">" + innerText + "</" + tagName + ">";
}
function parseUrlToObj(url) {
    if (!url) {
        return {};
    }
    var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) {
        return {};
    }
    var query = match[6] || '';
    var fragment = match[8] || '';
    return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        relative: match[5] + query + fragment
    };
}
function getBreadcrumbCategoryInBrowser(type) {
    switch (type) {
        case "Xhr":
        case "Fetch":
            return "http";
        case "UI.Click":
        case "Route":
            return "user";
        case "Customer":
        case "Console":
            return "debug";
        case "Unhandledrejection":
        case "Code Error":
        case "Resource":
        case "Vue":
        case "React":
        default:
            return "exception";
    }
}
function extractErrorStack(ex, level) {
    var normal = {
        time: getTimestamp(),
        url: getUrlWithEnv(),
        name: ex.name,
        level: level,
        message: ex.message
    };
    if (typeof ex.stack === 'undefined' || !ex.stack) {
        return normal;
    }
    var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/, lines = ex.stack.split('\n'), stack = [];
    var submatch, parts, element;
    for (var i = 0, j = lines.length; i < j; ++i) {
        if ((parts = chrome.exec(lines[i]))) {
            var isNative = parts[2] && parts[2].indexOf('native') === 0;
            var isEval = parts[2] && parts[2].indexOf('eval') === 0;
            if (isEval && (submatch = chromeEval.exec(parts[2]))) {
                parts[2] = submatch[1];
                parts[3] = submatch[2];
                parts[4] = submatch[3];
            }
            element = {
                url: !isNative ? parts[2] : null,
                func: parts[1] || "UNKNOWN_FUNCTION",
                args: isNative ? [parts[2]] : [],
                line: parts[3] ? +parts[3] : null,
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = winjs.exec(lines[i]))) {
            element = {
                url: parts[2],
                func: parts[1] || "UNKNOWN_FUNCTION",
                args: [],
                line: +parts[3],
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = gecko.exec(lines[i]))) {
            var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
            if (isEval && (submatch = geckoEval.exec(parts[3]))) {
                parts[3] = submatch[1];
                parts[4] = submatch[2];
                parts[5] = null;
            }
            else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
                stack[0].column = ex.columnNumber + 1;
            }
            element = {
                url: parts[3],
                func: parts[1] || "UNKNOWN_FUNCTION",
                args: parts[2] ? parts[2].split(',') : [],
                line: parts[4] ? +parts[4] : null,
                column: parts[5] ? +parts[5] : null
            };
        }
        else {
            continue;
        }
        if (!element.func && element.line) {
            element.func = "UNKNOWN_FUNCTION";
        }
        stack.push(element);
    }
    if (!stack.length) {
        return null;
    }
    return __assign(__assign({}, normal), { stack: stack });
}

function nativeTryCatch(fn, errorFn) {
    try {
        fn();
    }
    catch (err) {
        console.error('err', err);
        if (errorFn) {
            errorFn(err);
        }
    }
}

var Queue = (function () {
    function Queue() {
        this.stack = [];
        this.isFlushing = false;
        if (!('Promise' in _global))
            return;
        this.micro = Promise.resolve();
    }
    Queue.prototype.addTask = function (fn) {
        var _this = this;
        if (typeof fn !== 'function')
            return;
        if (!('Promise' in _global)) {
            fn();
            return;
        }
        this.stack.push(fn);
        if (!this.isFlushing) {
            this.isFlushing = true;
            this.micro.then(function () { return _this.flushStack(); });
        }
    };
    Queue.prototype.clear = function () {
        this.stack = [];
    };
    Queue.prototype.getStack = function () {
        return this.stack;
    };
    Queue.prototype.flushStack = function () {
        var temp = this.stack.slice(0);
        this.stack.length = 0;
        this.isFlushing = false;
        for (var i = 0; i < temp.length; i++) {
            temp[i]();
        }
    };
    return Queue;
}());

exports.Severity = void 0;
(function (Severity) {
    Severity["Else"] = "else";
    Severity["Error"] = "error";
    Severity["Warning"] = "warning";
    Severity["Info"] = "info";
    Severity["Debug"] = "debug";
    Severity["Low"] = "low";
    Severity["Normal"] = "normal";
    Severity["High"] = "high";
    Severity["Critical"] = "critical";
})(exports.Severity || (exports.Severity = {}));
(function (Severity) {
    function fromString(level) {
        switch (level) {
            case 'debug':
                return Severity.Debug;
            case 'info':
            case 'log':
            case 'assert':
                return Severity.Info;
            case 'warn':
            case 'warning':
                return Severity.Warning;
            case Severity.Low:
            case Severity.Normal:
            case Severity.High:
            case Severity.Critical:
            case 'error':
                return Severity.Error;
            default:
                return Severity.Else;
        }
    }
    Severity.fromString = fromString;
})(exports.Severity || (exports.Severity = {}));

function fromHttpStatus(httpStatus) {
    if (httpStatus < 400) {
        return "ok";
    }
    if (httpStatus >= 400 && httpStatus < 500) {
        switch (httpStatus) {
            case 401:
                return "unauthenticated";
            case 403:
                return "permission_denied";
            case 404:
                return "not_found";
            case 409:
                return "already_exists";
            case 413:
                return "failed_precondition";
            case 429:
                return "resource_exhausted";
            default:
                return "invalid_argument";
        }
    }
    if (httpStatus >= 500 && httpStatus < 600) {
        switch (httpStatus) {
            case 501:
                return "unimplemented";
            case 503:
                return "unavailable";
            case 504:
                return "deadline_exceeded";
            default:
                return "internal_error";
        }
    }
    return "unknown_error";
}

var allErrorNumber = {};
function createErrorId(data, apikey, maxDuplicateCount) {
    var id;
    switch (data.type) {
        case "HTTP":
            id = data.type + data.request.method + data.response.status + getRealPath(data.request.url) + apikey;
            break;
        case "JAVASCRIPT":
        case "VUE":
        case "REACT":
            id = data.type + data.name + data.message + apikey;
            break;
        case "LOG":
            id = data.customTag + data.type + data.name + apikey;
            break;
        case "PROMISE":
            id = generatePromiseErrorId(data, apikey);
            break;
        default:
            id = data.type + data.message + apikey;
            break;
    }
    id = hashCode(id);
    if (allErrorNumber[id] >= maxDuplicateCount) {
        return null;
    }
    if (typeof allErrorNumber[id] === 'number') {
        allErrorNumber[id]++;
    }
    else {
        allErrorNumber[id] = 1;
    }
    return id;
}
function generatePromiseErrorId(data, apikey) {
    var locationUrl = getRealPath(data.url);
    if (data.name === "unhandledrejection") {
        return data.type + objectOrder(data.message) + apikey;
    }
    return data.type + data.name + objectOrder(data.message) + locationUrl;
}
function objectOrder(reason) {
    var sortFn = function (obj) {
        return Object.keys(obj)
            .sort()
            .reduce(function (total, key) {
            if (variableTypeDetection.isObject(obj[key])) {
                total[key] = sortFn(obj[key]);
            }
            else {
                total[key] = obj[key];
            }
            return total;
        }, {});
    };
    try {
        if (/\{.*\}/.test(reason)) {
            var obj = JSON.parse(reason);
            obj = sortFn(obj);
            return JSON.stringify(obj);
        }
    }
    catch (error) {
        return reason;
    }
}
function getRealPath(url) {
    return url.replace(/[\?#].*$/, '').replace(/\/\d+([\/]*$)/, '{param}$1');
}
function getFlutterRealOrigin(url) {
    return removeHashPath(getFlutterRealPath(url));
}
function getFlutterRealPath(url) {
    return url.replace(/(\S+)(\/Documents\/)(\S*)/, "$3");
}
function removeHashPath(url) {
    return url.replace(/(\S+)(\/#\/)(\S*)/, "$1");
}
function hashCode(str) {
    var hash = 0;
    if (str.length == 0)
        return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash;
}

function parseErrorString(str) {
    var splitLine = str.split('\n');
    if (splitLine.length < 2)
        return null;
    if (splitLine[0].indexOf('MiniProgramError') !== -1) {
        splitLine.splice(0, 1);
    }
    var message = splitLine.splice(0, 1)[0];
    var name = splitLine.splice(0, 1)[0].split(':')[0];
    var stack = [];
    splitLine.forEach(function (errorLine) {
        var regexpGetFun = /at\s+([\S]+)\s+\(/;
        var regexGetFile = /\(([^)]+)\)/;
        var regexGetFileNoParenthese = /\s+at\s+(\S+)/;
        var funcExec = regexpGetFun.exec(errorLine);
        var fileURLExec = regexGetFile.exec(errorLine);
        if (!fileURLExec) {
            fileURLExec = regexGetFileNoParenthese.exec(errorLine);
        }
        var funcNameMatch = Array.isArray(funcExec) && funcExec.length > 0 ? funcExec[1].trim() : '';
        var fileURLMatch = Array.isArray(fileURLExec) && fileURLExec.length > 0 ? fileURLExec[1] : '';
        var lineInfo = fileURLMatch.split(':');
        stack.push({
            args: [],
            func: funcNameMatch || "UNKNOWN_FUNCTION",
            column: Number(lineInfo.pop()),
            line: Number(lineInfo.pop()),
            url: lineInfo.join(':')
        });
    });
    return {
        message: message,
        name: name,
        stack: stack
    };
}
function getBreadcrumbCategoryInWx(type) {
    switch (type) {
        case WxBreadcrumbTypes.XHR:
            return "http";
        case WxBreadcrumbTypes.ROUTE:
        case WxBreadcrumbTypes.TAP:
        case WxBreadcrumbTypes.TOUCHMOVE:
            return "user";
        case WxBreadcrumbTypes.CUSTOMER:
        case WxBreadcrumbTypes.CONSOLE:
            return "debug";
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
            return "lifecycle";
        case WxBreadcrumbTypes.UNHANDLEDREJECTION:
        case WxBreadcrumbTypes.CODE_ERROR:
        case WxBreadcrumbTypes.RESOURCE:
        case WxBreadcrumbTypes.VUE:
        case WxBreadcrumbTypes.REACT:
        default:
            return "exception";
    }
}
function getAppId() {
    return wx.getAccountInfoSync().miniProgram.appId;
}

exports.Logger = Logger;
exports.Queue = Queue;
exports._global = _global;
exports._support = _support;
exports.createErrorId = createErrorId;
exports.defaultFunctionName = defaultFunctionName;
exports.extractErrorStack = extractErrorStack;
exports.firstStrtoLowerCase = firstStrtoLowerCase;
exports.firstStrtoUppercase = firstStrtoUppercase;
exports.fromHttpStatus = fromHttpStatus;
exports.generateUUID = generateUUID;
exports.getAppId = getAppId;
exports.getBigVersion = getBigVersion;
exports.getBreadcrumbCategoryInBrowser = getBreadcrumbCategoryInBrowser;
exports.getBreadcrumbCategoryInWx = getBreadcrumbCategoryInWx;
exports.getCurrentRoute = getCurrentRoute;
exports.getFlag = getFlag;
exports.getFlutterRealOrigin = getFlutterRealOrigin;
exports.getFlutterRealPath = getFlutterRealPath;
exports.getFunctionName = getFunctionName;
exports.getGlobal = getGlobal;
exports.getLocationHref = getLocationHref;
exports.getObjectWithForIn = getObjectWithForIn;
exports.getRealPath = getRealPath;
exports.getTimestamp = getTimestamp;
exports.getUrlWithEnv = getUrlWithEnv;
exports.hashCode = hashCode;
exports.htmlElementAsString = htmlElementAsString;
exports.interceptStr = interceptStr;
exports.isBrowserEnv = isBrowserEnv;
exports.isEmpty = isEmpty;
exports.isEmptyObject = isEmptyObject;
exports.isError = isError;
exports.isExistProperty = isExistProperty;
exports.isHttpFail = isHttpFail;
exports.isInclude = isInclude;
exports.isInstanceOf = isInstanceOf;
exports.isNodeEnv = isNodeEnv;
exports.isType = isType;
exports.isWxMiniEnv = isWxMiniEnv;
exports.logger = logger;
exports.nativeToString = nativeToString;
exports.nativeTryCatch = nativeTryCatch;
exports.on = on;
exports.parseErrorString = parseErrorString;
exports.parseUrlToObj = parseUrlToObj;
exports.removeHashPath = removeHashPath;
exports.replaceOld = replaceOld;
exports.safeStringify = safeStringify;
exports.setFlag = setFlag;
exports.setUrlQuery = setUrlQuery;
exports.silentConsoleScope = silentConsoleScope;
exports.splitObjToQuery = splitObjToQuery;
exports.supportsHistory = supportsHistory;
exports.throttle = throttle;
exports.toStringAny = toStringAny;
exports.toStringValidateOption = toStringValidateOption;
exports.unknownToString = unknownToString;
exports.validateOptionsAndSet = validateOptionsAndSet;
exports.variableTypeDetection = variableTypeDetection;
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=utils.js.map
