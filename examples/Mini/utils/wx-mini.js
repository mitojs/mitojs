/* @mitojs/wx-mini version ' + 2.1.25 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
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
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var version = "2.1.25";

var SDK_NAME = 'mitojs';
var SDK_VERSION = version;

var MitoLog = 'Mito.log';
var globalVar = {
    isLogAddBreadcrumb: true,
    crossOriginThreshold: 1000
};

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
    WxBreadcrumbTypes["PAGE_ON_SHOW"] = "Page On Show";
    WxBreadcrumbTypes["PAGE_ON_HIDE"] = "Page On Hide";
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
    WxBaseEventTypes["XHR"] = "xhr";
    WxBaseEventTypes["CONSOLE"] = "console";
    WxBaseEventTypes["ERROR"] = "error";
    WxBaseEventTypes["UNHANDLEDREJECTION"] = "unhandledrejection";
    WxBaseEventTypes["MINI_ROUTE"] = "miniRoute";
    WxBaseEventTypes["MINI_PERFORMANCE"] = "miniPerformance";
    WxBaseEventTypes["MINI_MEMORY_WARNING"] = "miniMemoryWarning";
    WxBaseEventTypes["MINI_NETWORK_STATUS_CHANGE"] = "miniNetworkStatusChange";
    WxBaseEventTypes["MINI_BATTERY_INFO"] = "miniBatteryInfo";
})(WxBaseEventTypes || (WxBaseEventTypes = {}));
var ELinstenerTypes;
(function (ELinstenerTypes) {
    ELinstenerTypes["Touchmove"] = "touchmove";
    ELinstenerTypes["Tap"] = "tap";
    ELinstenerTypes["Longtap"] = "longtap";
    ELinstenerTypes["Longpress"] = "longpress";
})(ELinstenerTypes || (ELinstenerTypes = {}));
Object.assign({}, WxAppEvents, WxPageEvents, WxBaseEventTypes);

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
_support.replaceFlag;

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
var defaultFunctionName = '<anonymous>';
function getFunctionName(fn) {
    if (!fn || typeof fn !== 'function') {
        return defaultFunctionName;
    }
    return fn.name || defaultFunctionName;
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
    globalVar.isLogAddBreadcrumb = false;
    callback();
    globalVar.isLogAddBreadcrumb = true;
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
        url: getLocationHref(),
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

var Severity;
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
})(Severity || (Severity = {}));
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
})(Severity || (Severity = {}));

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
        case WxBreadcrumbTypes.PAGE_ON_SHOW:
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

var xhrPlugin = {
    name: "xhr",
    monitor: function (notify) {
        monitorXhr.call(this, notify);
    },
    transform: function (collectedData) {
        return httpTransform(collectedData);
    },
    consumer: function (transformedData) {
        httpTransformedDataConsumer.call(this, transformedData);
    }
};
function monitorXhr(notify) {
    var _a = this, options = _a.options, transport = _a.transport;
    if (!('XMLHttpRequest' in _global)) {
        return;
    }
    var originalXhrProto = XMLHttpRequest.prototype;
    replaceOld(originalXhrProto, 'open', function (originalOpen) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.httpCollect = {
                request: {
                    httpType: "xhr",
                    method: variableTypeDetection.isString(args[0]) ? args[0].toUpperCase() : args[0],
                    url: args[1]
                },
                response: {},
                time: getTimestamp()
            };
            originalOpen.apply(this, args);
        };
    });
    replaceOld(originalXhrProto, 'send', function (originalSend) {
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var request = this.httpCollect.request;
            var method = request.method, url = request.url;
            options.setTraceId(url, function (headerFieldName, traceId) {
                request.traceId = traceId;
                _this.setRequestHeader(headerFieldName, traceId);
            });
            options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method: method, url: url }, this);
            on(this, 'loadend', function () {
                var isBlock = transport.isSelfDsn(url) || options.isFilterHttpUrl(url);
                if (isBlock)
                    return;
                var _a = this, responseType = _a.responseType, response = _a.response, status = _a.status;
                request.data = args[0];
                var eTime = getTimestamp();
                if (['', 'json', 'text'].indexOf(responseType) !== -1) {
                    this.httpCollect.response.data = typeof response === 'object' ? JSON.stringify(response) : response;
                }
                this.httpCollect.response.status = status;
                this.httpCollect.elapsedTime = eTime - this.httpCollect.time;
                notify("xhr", this.httpCollect);
            });
            originalSend.apply(this, args);
        };
    });
}
function httpTransform(httpCollectedData) {
    var message = '';
    var _a = httpCollectedData.request, httpType = _a.httpType, method = _a.method, url = _a.url, status = httpCollectedData.response.status, elapsedTime = httpCollectedData.elapsedTime;
    var name = httpType + "--" + method;
    if (status === 0) {
        message =
            elapsedTime <= globalVar.crossOriginThreshold ? 'http请求失败，失败原因：跨域限制或域名不存在' : 'http请求失败，失败原因：超时';
    }
    else {
        message = fromHttpStatus(status);
    }
    message = message === "ok" ? message : message + " " + getRealPath(url);
    return __assign(__assign({}, httpCollectedData), { type: "HTTP", url: getLocationHref(), level: Severity.Low, message: message, name: name });
}
function httpTransformedDataConsumer(transformedData) {
    var type = transformedData.request.httpType === "fetch" ? "Fetch" : "Xhr";
    var status = transformedData.response.status, time = transformedData.time;
    var isError = status === 0 || status === 400 || status > 401;
    this.breadcrumb.push({
        type: type,
        category: getBreadcrumbCategoryInBrowser(type),
        data: __assign({}, transformedData),
        level: Severity.Info,
        time: time
    });
    if (isError) {
        this.breadcrumb.push({
            type: type,
            category: "exception",
            data: __assign({}, transformedData),
            level: Severity.Error,
            time: time
        });
        this.transport.send(transformedData, this.breadcrumb.getStack());
    }
}

function getNavigateBackTargetUrl(delta) {
    if (!variableTypeDetection.isFunction(getCurrentPages)) {
        return '';
    }
    var pages = getCurrentPages();
    if (!pages.length) {
        return 'App';
    }
    delta = delta || 1;
    var toPage = pages[pages.length - delta];
    return setUrlQuery(toPage.route, toPage.options);
}
function addBreadcrumbInWx(data, type, level) {
    if (level === void 0) { level = Severity.Info; }
    return this.breadcrumb.push({
        type: type,
        data: data,
        category: getBreadcrumbCategoryInWx(type),
        level: level
    });
}

var wxAppPluginMap = new Map();
wxAppPluginMap.set(WxAppEvents.AppOnShow, {
    transform: function (options) {
        var sdkOptions = this.options;
        sdkOptions.appOnLaunch(options);
        var data = {
            path: options.path,
            query: options.query
        };
        return data;
    },
    consumer: function (data) {
        addBreadcrumbInWx.call(this, data, WxBreadcrumbTypes.APP_ON_LAUNCH);
    }
});
function getWxAppPlugins() {
    if (!App)
        return [];
    var wxAppPlugins = [];
    var originApp = App;
    App = function (appOptions) {
        var methodHooks = Object.values(WxAppEvents);
        methodHooks.forEach(function (method) {
            var plugin = {
                name: method,
                monitor: function (notify) {
                    replaceOld(appOptions, method.replace('AppOn', 'on'), function (originMethod) {
                        return function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            if (originMethod) {
                                originMethod.apply(this, args);
                            }
                            notify.apply(null, __spreadArray([method], args, true));
                        };
                    }, true);
                }
            };
            wxAppPlugins.push(plugin);
        });
        return originApp(appOptions);
    };
    return wxAppPlugins;
}
var wxAppPlugins = getWxAppPlugins();

var wxConsolePlugin = {
    name: WxBaseEventTypes.CONSOLE,
    monitor: function (notify) {
        if (console && variableTypeDetection.isObject(console)) {
            var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
            logType.forEach(function (level) {
                if (!(level in console))
                    return;
                replaceOld(console, level, function (originalConsole) {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        if (originalConsole) {
                            notify(WxBaseEventTypes.CONSOLE, { args: args, level: level });
                            originalConsole.apply(console, args);
                        }
                    };
                });
            });
        }
    },
    transform: function (collectedData) {
        return collectedData;
    },
    consumer: function (transformedData) {
        if (globalVar.isLogAddBreadcrumb) {
            addBreadcrumbInWx.call(this, transformedData, WxBreadcrumbTypes.CONSOLE, Severity.fromString(transformedData.level));
        }
    }
};

var wxRoutePlugin = {
    name: WxBaseEventTypes.MINI_ROUTE,
    monitor: function (notify) {
        monitorWxRoute.call(this, notify);
    },
    transform: function (collectedData) {
        var reportData = {
            type: "ROUTE",
            message: collectedData.message,
            url: collectedData.to,
            name: 'MINI_' + "ROUTE",
            level: Severity.Error
        };
        return {
            data: reportData,
            collectedData: collectedData
        };
    },
    consumer: function (transformedData) {
        var data = transformedData.data, collectedData = transformedData.collectedData;
        if (collectedData.isFail) {
            var breadcrumbStack = addBreadcrumbInWx.call(this, collectedData, WxBreadcrumbTypes.CODE_ERROR, Severity.Error);
            return this.transport.send(data, breadcrumbStack);
        }
        addBreadcrumbInWx.call(this, collectedData, WxBreadcrumbTypes.ROUTE);
    }
};
function monitorWxRoute(notify) {
    var wxOptions = this.options;
    var methods = [
        WxRouteEvents.SwitchTab,
        WxRouteEvents.ReLaunch,
        WxRouteEvents.RedirectTo,
        WxRouteEvents.NavigateTo,
        WxRouteEvents.NavigateBack,
        WxRouteEvents.NavigateToMiniProgram
    ];
    methods.forEach(function (method) {
        var originMethod = wx[method];
        Object.defineProperty(wx, method, {
            writable: true,
            enumerable: true,
            configurable: true,
            value: function (options) {
                var _a;
                var toUrl;
                if (method === WxRouteEvents.NavigateBack) {
                    toUrl = getNavigateBackTargetUrl((_a = options) === null || _a === void 0 ? void 0 : _a.delta);
                }
                else {
                    toUrl = options.url;
                }
                var data = {
                    from: getCurrentRoute(),
                    to: toUrl
                };
                notify(WxBaseEventTypes.MINI_ROUTE, data);
                if (variableTypeDetection.isFunction(options.complete) ||
                    variableTypeDetection.isFunction(options.success) ||
                    variableTypeDetection.isFunction(options.fail)) {
                    var _fail_1 = options.fail;
                    var failHandler = function (res) {
                        var failData = __assign(__assign({}, data), { isFail: true, message: res.errMsg });
                        notify(WxBaseEventTypes.MINI_ROUTE, failData);
                        if (variableTypeDetection.isFunction(_fail_1)) {
                            return _fail_1(res);
                        }
                    };
                    options.fail = failHandler;
                }
                if (method === WxRouteEvents.NavigateToMiniProgram && variableTypeDetection.isFunction(wxOptions.wxNavigateToMiniProgram)) {
                    options = wxOptions.wxNavigateToMiniProgram(options);
                }
                return originMethod.call(this, options);
            }
        });
    });
}

var Breadcrumb = (function () {
    function Breadcrumb(options) {
        if (options === void 0) { options = {}; }
        this.maxBreadcrumbs = 10;
        this.beforePushBreadcrumb = null;
        this.stack = [];
        this.bindOptions(options);
    }
    Breadcrumb.prototype.push = function (data) {
        var _this = this;
        if (typeof this.beforePushBreadcrumb === 'function') {
            var result_1 = null;
            var beforePushBreadcrumb_1 = this.beforePushBreadcrumb;
            silentConsoleScope(function () {
                result_1 = beforePushBreadcrumb_1.call(_this, _this, data);
            });
            if (!result_1)
                return this.stack;
            return this.immediatePush(result_1);
        }
        return this.immediatePush(data);
    };
    Breadcrumb.prototype.immediatePush = function (data) {
        data.time || (data.time = getTimestamp());
        if (this.stack.length >= this.maxBreadcrumbs) {
            this.shift();
        }
        this.stack.push(data);
        this.stack.sort(function (a, b) { return a.time - b.time; });
        logger.log(this.stack);
        return this.stack;
    };
    Breadcrumb.prototype.shift = function () {
        return this.stack.shift() !== undefined;
    };
    Breadcrumb.prototype.clear = function () {
        this.stack = [];
    };
    Breadcrumb.prototype.getStack = function () {
        return this.stack;
    };
    Breadcrumb.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var maxBreadcrumbs = options.maxBreadcrumbs, beforePushBreadcrumb = options.beforePushBreadcrumb;
        toStringValidateOption(maxBreadcrumbs, 'maxBreadcrumbs', "Number") && (this.maxBreadcrumbs = maxBreadcrumbs);
        toStringValidateOption(beforePushBreadcrumb, 'beforePushBreadcrumb', "Function") &&
            (this.beforePushBreadcrumb = beforePushBreadcrumb);
    };
    return Breadcrumb;
}());

var Subscrib = (function () {
    function Subscrib() {
        this.dep = new Map();
    }
    Subscrib.prototype.watch = function (eventName, callBack) {
        var fns = this.dep.get(eventName);
        if (fns) {
            this.dep.set(eventName, fns.concat(callBack));
            return;
        }
        this.dep.set(eventName, [callBack]);
    };
    Subscrib.prototype.notify = function (eventName, data) {
        var fns = this.dep.get(eventName);
        if (!eventName || !fns)
            return;
        fns.forEach(function (fn) {
            nativeTryCatch(function () {
                fn(data);
            }, function (e) {
                logger.error("Subscrib.notify\uFF1A\u76D1\u542C\u4E8B\u4EF6\u7684\u56DE\u8C03\u51FD\u6570\u53D1\u751F\u9519\u8BEF\neventName:" + eventName + "\nName: " + getFunctionName(fn) + "\nError: " + e);
            });
        });
    };
    return Subscrib;
}());

var BaseClient = (function () {
    function BaseClient(options) {
        this.SDK_VERSION = SDK_VERSION;
        this.options = options;
        logger.bindOptions(options.debug);
    }
    BaseClient.prototype.use = function (plugins) {
        var _this = this;
        var subscrib = new Subscrib();
        plugins.forEach(function (item) {
            if (!_this.isPluginEnable(item.name))
                return;
            item.monitor.call(_this, subscrib.notify.bind(subscrib));
            var wrapperTranform = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var res = item.transform.apply(_this, args);
                item.consumer.call(_this, res);
            };
            subscrib.watch(item.name, wrapperTranform);
        });
    };
    BaseClient.prototype.getOptions = function () {
        return this.options;
    };
    return BaseClient;
}());

var BaseOptions = (function () {
    function BaseOptions() {
        this.enableTraceId = false;
        this.includeHttpUrlTraceIdRegExp = /.*/;
        this.traceIdFieldName = 'Trace-Id';
        this.throttleDelayTime = 0;
        this.maxDuplicateCount = 5;
        this.beforeAppAjaxSend = null;
    }
    BaseOptions.prototype.bindOptions = function (options) {
        var enableTraceId = options.enableTraceId, filterXhrUrlRegExp = options.filterXhrUrlRegExp, traceIdFieldName = options.traceIdFieldName, throttleDelayTime = options.throttleDelayTime, includeHttpUrlTraceIdRegExp = options.includeHttpUrlTraceIdRegExp, beforeAppAjaxSend = options.beforeAppAjaxSend;
        toStringValidateOption(enableTraceId, 'enableTraceId', "Boolean") && (this.enableTraceId = enableTraceId);
        toStringValidateOption(traceIdFieldName, 'traceIdFieldName', "String") && (this.traceIdFieldName = traceIdFieldName);
        toStringValidateOption(throttleDelayTime, 'throttleDelayTime', "Number") && (this.throttleDelayTime = throttleDelayTime);
        toStringValidateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', "RegExp") && (this.filterXhrUrlRegExp = filterXhrUrlRegExp);
        toStringValidateOption(includeHttpUrlTraceIdRegExp, 'includeHttpUrlTraceIdRegExp', "RegExp") &&
            (this.includeHttpUrlTraceIdRegExp = includeHttpUrlTraceIdRegExp);
        toStringValidateOption(beforeAppAjaxSend, 'beforeAppAjaxSend', "Function") && (this.beforeAppAjaxSend = beforeAppAjaxSend);
    };
    BaseOptions.prototype.isFilterHttpUrl = function (url) {
        return this.filterXhrUrlRegExp && this.filterXhrUrlRegExp.test(url);
    };
    BaseOptions.prototype.setTraceId = function (httpUrl, callback) {
        var _a = this, includeHttpUrlTraceIdRegExp = _a.includeHttpUrlTraceIdRegExp, enableTraceId = _a.enableTraceId;
        if (enableTraceId && includeHttpUrlTraceIdRegExp && includeHttpUrlTraceIdRegExp.test(httpUrl)) {
            var traceId = generateUUID();
            callback(this.traceIdFieldName, traceId);
        }
    };
    return BaseOptions;
}());

var BaseTransport = (function () {
    function BaseTransport() {
        this.apikey = '';
        this.dsn = '';
        this.beforeDataReport = null;
        this.backTrackerId = null;
        this.configReportUrl = null;
        this.maxDuplicateCount = 3;
        this.queue = new Queue();
    }
    BaseTransport.prototype.getAuthInfo = function () {
        var trackerId = this.getTrackerId();
        var result = {
            trackerId: String(trackerId),
            sdkVersion: SDK_VERSION,
            sdkName: SDK_NAME,
            apikey: this.apikey
        };
        return result;
    };
    BaseTransport.prototype.getTrackerId = function () {
        if (typeof this.backTrackerId === 'function') {
            var trackerId = this.backTrackerId();
            if (typeof trackerId === 'string' || typeof trackerId === 'number') {
                return trackerId;
            }
            else {
                logger.error("trackerId:" + trackerId + " \u671F\u671B string \u6216 number \u7C7B\u578B\uFF0C\u4F46\u662F\u4F20\u5165 " + typeof trackerId);
            }
        }
        return '';
    };
    BaseTransport.prototype.isSelfDsn = function (targetUrl) {
        return this.dsn && isInclude(targetUrl, this.dsn);
    };
    BaseTransport.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var dsn = options.dsn, beforeDataReport = options.beforeDataReport, apikey = options.apikey, maxDuplicateCount = options.maxDuplicateCount, backTrackerId = options.backTrackerId, configReportUrl = options.configReportUrl;
        toStringValidateOption(apikey, 'apikey', "String") && (this.apikey = apikey);
        toStringValidateOption(dsn, 'dsn', "String") && (this.dsn = dsn);
        toStringValidateOption(maxDuplicateCount, 'maxDuplicateCount', "Number") && (this.maxDuplicateCount = maxDuplicateCount);
        toStringValidateOption(beforeDataReport, 'beforeDataReport', "Function") && (this.beforeDataReport = beforeDataReport);
        toStringValidateOption(backTrackerId, 'backTrackerId', "Function") && (this.backTrackerId = backTrackerId);
        toStringValidateOption(configReportUrl, 'configReportUrl', "Function") && (this.configReportUrl = configReportUrl);
    };
    BaseTransport.prototype.send = function (data, breadcrumb) {
        return __awaiter(this, void 0, void 0, function () {
            var errorId, transportData, dsn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errorId = createErrorId(data, this.apikey, this.maxDuplicateCount);
                        if (!errorId)
                            return [2];
                        data.errorId = errorId;
                        transportData = __assign(__assign({}, this.getTransportData(data)), { breadcrumb: breadcrumb });
                        if (!(typeof this.beforeDataReport === 'function')) return [3, 2];
                        return [4, this.beforeDataReport(transportData)];
                    case 1:
                        transportData = _a.sent();
                        if (!transportData)
                            return [2];
                        _a.label = 2;
                    case 2:
                        dsn = this.dsn;
                        if (isEmpty(dsn)) {
                            logger.error('dsn为空，没有传入监控错误上报的dsn地址，请在init中传入');
                            return [2];
                        }
                        if (typeof this.configReportUrl === 'function') {
                            dsn = this.configReportUrl(transportData, dsn);
                            if (!dsn)
                                return [2];
                        }
                        this.sendToServer(transportData, dsn);
                        return [2];
                }
            });
        });
    };
    return BaseTransport;
}());

var WxOptions = (function (_super) {
    __extends(WxOptions, _super);
    function WxOptions(options) {
        var _this = _super.call(this) || this;
        _this.appOnLaunch = function () { };
        _this.appOnShow = function () { };
        _this.onPageNotFound = function () { };
        _this.appOnHide = function () { };
        _this.pageOnUnload = function () { };
        _this.pageOnShow = function () { };
        _this.pageOnHide = function () { };
        _this.onShareAppMessage = function () { };
        _this.onShareTimeline = function () { };
        _this.onTabItemTap = function () { };
        _this.triggerWxEvent = function () { };
        _super.prototype.bindOptions.call(_this, options);
        _this.bindOptions(options);
        return _this;
    }
    WxOptions.prototype.bindOptions = function (options) {
        var beforeAppAjaxSend = options.beforeAppAjaxSend, appOnLaunch = options.appOnLaunch, appOnShow = options.appOnShow, appOnHide = options.appOnHide, pageOnUnload = options.pageOnUnload, pageOnShow = options.pageOnShow, pageOnHide = options.pageOnHide, onPageNotFound = options.onPageNotFound, onShareAppMessage = options.onShareAppMessage, onShareTimeline = options.onShareTimeline, onTabItemTap = options.onTabItemTap, wxNavigateToMiniProgram = options.wxNavigateToMiniProgram, triggerWxEvent = options.triggerWxEvent;
        toStringValidateOption(beforeAppAjaxSend, 'beforeAppAjaxSend', "Function") && (this.beforeAppAjaxSend = beforeAppAjaxSend);
        toStringValidateOption(appOnLaunch, 'appOnLaunch', "Function") && (this.appOnLaunch = appOnLaunch);
        toStringValidateOption(appOnShow, 'appOnShow', "Function") && (this.appOnShow = appOnShow);
        toStringValidateOption(appOnHide, 'appOnHide', "Function") && (this.appOnHide = appOnHide);
        toStringValidateOption(pageOnUnload, 'pageOnUnload', "Function") && (this.pageOnUnload = pageOnUnload);
        toStringValidateOption(pageOnShow, 'pageOnShow', "Function") && (this.pageOnShow = pageOnShow);
        toStringValidateOption(pageOnHide, 'pageOnHide', "Function") && (this.pageOnHide = pageOnHide);
        toStringValidateOption(onPageNotFound, 'onPageNotFound', "Function") && (this.onPageNotFound = onPageNotFound);
        toStringValidateOption(onShareAppMessage, 'onShareAppMessage', "Function") && (this.onShareAppMessage = onShareAppMessage);
        toStringValidateOption(onShareTimeline, 'onShareTimeline', "Function") && (this.onShareTimeline = onShareTimeline);
        toStringValidateOption(onTabItemTap, 'onTabItemTap', "Function") && (this.onTabItemTap = onTabItemTap);
        toStringValidateOption(wxNavigateToMiniProgram, 'wxNavigateToMiniProgram', "Function") &&
            (this.wxNavigateToMiniProgram = wxNavigateToMiniProgram);
        toStringValidateOption(triggerWxEvent, 'triggerWxEvent', "Function") && (this.triggerWxEvent = triggerWxEvent);
    };
    return WxOptions;
}(BaseOptions));

var WxTransport = (function (_super) {
    __extends(WxTransport, _super);
    function WxTransport(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.useImgUpload = false;
        _super.prototype.bindOptions.call(_this, options);
        return _this;
    }
    WxTransport.prototype.post = function (data, url) {
        var _this = this;
        var requestFun = function () {
            var requestOptions = { method: 'POST' };
            if (typeof _this.configReportWxRequest === 'function') {
                var params = _this.configReportWxRequest(data);
                requestOptions = __assign(__assign({}, requestOptions), params);
            }
            requestOptions = __assign(__assign({}, requestOptions), { data: JSON.stringify(data), url: url });
            wx.request(requestOptions);
        };
        this.queue.addTask(requestFun);
    };
    WxTransport.prototype.sendToServer = function (data, url) {
        return this.post(data, url);
    };
    WxTransport.prototype.getTransportData = function (data) {
        return {
            authInfo: this.getAuthInfo(),
            data: data
        };
    };
    WxTransport.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var configReportWxRequest = options.configReportWxRequest;
        toStringValidateOption(configReportWxRequest, 'configReportWxRequest', "Function") &&
            (this.configReportWxRequest = configReportWxRequest);
    };
    return WxTransport;
}(BaseTransport));

var WxClient = (function (_super) {
    __extends(WxClient, _super);
    function WxClient(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.options = new WxOptions(options);
        _this.transport = new WxTransport(options);
        _this.breadcrumb = new Breadcrumb(options);
        return _this;
    }
    WxClient.prototype.isPluginEnable = function (name) {
        var silentField = "silent" + firstStrtoUppercase(name);
        return !this.options[silentField];
    };
    WxClient.prototype.log = function (data) {
        var _a = data.message, message = _a === void 0 ? 'empty' : _a, _b = data.tag, tag = _b === void 0 ? '' : _b, _c = data.level, level = _c === void 0 ? Severity.Critical : _c, _d = data.ex, ex = _d === void 0 ? '' : _d;
        var errorInfo = {};
        if (isError(ex)) {
            errorInfo = extractErrorStack(ex, level);
        }
        var error = __assign({ type: "LOG", level: level, message: unknownToString(message), name: MitoLog, customTag: unknownToString(tag), time: getTimestamp(), url: getCurrentRoute() }, errorInfo);
        var breadcrumbStack = this.breadcrumb.push({
            type: "Customer",
            category: getBreadcrumbCategoryInBrowser("Customer"),
            data: message,
            level: Severity.fromString(level.toString())
        });
        this.transport.send(error, breadcrumbStack);
    };
    return WxClient;
}(BaseClient));

function createWxInstance(options) {
    var wxClient = new WxClient(options);
    var plugins = __spreadArray([xhrPlugin, wxRoutePlugin, wxConsolePlugin], wxAppPlugins, true);
    wxClient.use(plugins);
}
var init = createWxInstance;

exports.init = init;
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=wx-mini.js.map
