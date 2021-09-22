/* @mitojs/shared version ' + 2.1.25 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var version = "2.1.25";

var SDK_NAME = 'mitojs';
var SDK_VERSION = version;

var MitoLog = 'Mito.log';
var MitoLogEmptyMsg = 'empty.msg';
var MitoLogEmptyTag = 'empty.tag';
var ERROR_TYPE_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
var globalVar = {
    isLogAddBreadcrumb: true,
    crossOriginThreshold: 1000
};

exports.WxBreadcrumbTypes = void 0;
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
})(exports.WxBreadcrumbTypes || (exports.WxBreadcrumbTypes = {}));
exports.WxAppEvents = void 0;
(function (WxAppEvents) {
    WxAppEvents["AppOnLaunch"] = "AppOnLaunch";
    WxAppEvents["AppOnShow"] = "AppOnShow";
    WxAppEvents["AppOnHide"] = "AppOnHide";
    WxAppEvents["AppOnError"] = "AppOnError";
    WxAppEvents["AppOnPageNotFound"] = "AppOnPageNotFound";
    WxAppEvents["AppOnUnhandledRejection"] = "AppOnUnhandledRejection";
})(exports.WxAppEvents || (exports.WxAppEvents = {}));
exports.WxPageEvents = void 0;
(function (WxPageEvents) {
    WxPageEvents["PageOnLoad"] = "PageOnLoad";
    WxPageEvents["PageOnShow"] = "PageOnShow";
    WxPageEvents["PageOnHide"] = "PageOnHide";
    WxPageEvents["PageOnReady"] = "PageOnReady";
    WxPageEvents["PageOnUnload"] = "PageOnUnload";
    WxPageEvents["PageOnShareAppMessage"] = "PageOnShareAppMessage";
    WxPageEvents["PageOnShareTimeline"] = "PageOnShareTimeline";
    WxPageEvents["PageOnTabItemTap"] = "PageOnTabItemTap";
})(exports.WxPageEvents || (exports.WxPageEvents = {}));
exports.WxRouteEvents = void 0;
(function (WxRouteEvents) {
    WxRouteEvents["SwitchTab"] = "switchTab";
    WxRouteEvents["ReLaunch"] = "reLaunch";
    WxRouteEvents["RedirectTo"] = "redirectTo";
    WxRouteEvents["NavigateTo"] = "navigateTo";
    WxRouteEvents["NavigateBack"] = "navigateBack";
    WxRouteEvents["NavigateToMiniProgram"] = "navigateToMiniProgram";
    WxRouteEvents["RouteFail"] = "routeFail";
})(exports.WxRouteEvents || (exports.WxRouteEvents = {}));
exports.WxBaseEventTypes = void 0;
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
})(exports.WxBaseEventTypes || (exports.WxBaseEventTypes = {}));
exports.LinstenerTypes = void 0;
(function (LinstenerTypes) {
    LinstenerTypes["Touchmove"] = "touchmove";
    LinstenerTypes["Tap"] = "tap";
    LinstenerTypes["Longtap"] = "longtap";
    LinstenerTypes["Longpress"] = "longpress";
})(exports.LinstenerTypes || (exports.LinstenerTypes = {}));
var WxEventTypes = Object.assign({}, exports.WxAppEvents, exports.WxPageEvents, exports.WxBaseEventTypes);

exports.TrackActionType = void 0;
(function (TrackActionType) {
    TrackActionType["PAGE"] = "PAGE";
    TrackActionType["EVENT"] = "EVENT";
    TrackActionType["VIEW"] = "VIEW";
    TrackActionType["DURATION"] = "DURATION";
    TrackActionType["DURATION_VIEW"] = "DURATION_VIEW";
    TrackActionType["OTHER"] = "OTHER";
})(exports.TrackActionType || (exports.TrackActionType = {}));

exports.ERROR_TYPE_RE = ERROR_TYPE_RE;
exports.MitoLog = MitoLog;
exports.MitoLogEmptyMsg = MitoLogEmptyMsg;
exports.MitoLogEmptyTag = MitoLogEmptyTag;
exports.SDK_NAME = SDK_NAME;
exports.SDK_VERSION = SDK_VERSION;
exports.WxEventTypes = WxEventTypes;
exports.globalVar = globalVar;
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=shared.js.map
