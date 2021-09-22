/* @mitojs/react version ' + 2.1.25 */

  var process = {
    env: {
      NODE_ENV: 'production'
    }
  }

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

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}
	return Object(val);
}
function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}
		var test1 = new String('abc');
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}
		return true;
	} catch (err) {
		return false;
	}
}
var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;
	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);
		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}
		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}
	return to;
};

var react_production_min = createCommonjsModule(function (module, exports) {
var n=60103,p=60106;exports.Fragment=60107;exports.StrictMode=60108;exports.Profiler=60114;var q=60109,r=60110,t=60112;exports.Suspense=60113;var u=60115,v=60116;
if("function"===typeof Symbol&&Symbol.for){var w=Symbol.for;n=w("react.element");p=w("react.portal");exports.Fragment=w("react.fragment");exports.StrictMode=w("react.strict_mode");exports.Profiler=w("react.profiler");q=w("react.provider");r=w("react.context");t=w("react.forward_ref");exports.Suspense=w("react.suspense");u=w("react.memo");v=w("react.lazy");}var x="function"===typeof Symbol&&Symbol.iterator;
function y(a){if(null===a||"object"!==typeof a)return null;a=x&&a[x]||a["@@iterator"];return "function"===typeof a?a:null}function z(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
var A={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B={};function C(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}C.prototype.isReactComponent={};C.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z(85));this.updater.enqueueSetState(this,a,b,"setState");};C.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};
function D(){}D.prototype=C.prototype;function E(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}var F=E.prototype=new D;F.constructor=E;objectAssign(F,C.prototype);F.isPureReactComponent=!0;var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
function J(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H.call(b,e)&&!I.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f;}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return {$$typeof:n,type:a,key:k,ref:h,props:d,_owner:G.current}}
function K(a,b){return {$$typeof:n,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L(a){return "object"===typeof a&&null!==a&&a.$$typeof===n}function escape(a){var b={"=":"=0",":":"=2"};return "$"+a.replace(/[=:]/g,function(a){return b[a]})}var M=/\/+/g;function N(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function O(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n:case p:h=!0;}}if(h)return h=a,d=d(h),a=""===e?"."+N(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M,"$&/")+"/"),O(d,b,c,"",function(a){return a})):null!=d&&(L(d)&&(d=K(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
0;g<a.length;g++){k=a[g];var f=e+N(k,g);h+=O(k,b,c,f,d);}else if(f=y(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N(k,g++),h+=O(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P(a,b,c){if(null==a)return a;var e=[],d=0;O(a,e,"","",function(a){return b.call(c,a,d++)});return e}
function Q(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b);},function(b){0===a._status&&(a._status=2,a._result=b);});}if(1===a._status)return a._result;throw a._result;}var R={current:null};function S(){var a=R.current;if(null===a)throw Error(z(321));return a}var T={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G,IsSomeRendererActing:{current:!1},assign:objectAssign};
exports.Children={map:P,forEach:function(a,b,c){P(a,function(){b.apply(this,arguments);},c);},count:function(a){var b=0;P(a,function(){b++;});return b},toArray:function(a){return P(a,function(a){return a})||[]},only:function(a){if(!L(a))throw Error(z(143));return a}};exports.Component=C;exports.PureComponent=E;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T;
exports.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z(267,a));var e=objectAssign({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H.call(b,f)&&!I.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f]);}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g;}return {$$typeof:n,type:a.type,
key:d,ref:k,props:e,_owner:h}};exports.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q,_context:a};return a.Consumer=a};exports.createElement=J;exports.createFactory=function(a){var b=J.bind(null,a);b.type=a;return b};exports.createRef=function(){return {current:null}};exports.forwardRef=function(a){return {$$typeof:t,render:a}};exports.isValidElement=L;
exports.lazy=function(a){return {$$typeof:v,_payload:{_status:-1,_result:a},_init:Q}};exports.memo=function(a,b){return {$$typeof:u,type:a,compare:void 0===b?null:b}};exports.useCallback=function(a,b){return S().useCallback(a,b)};exports.useContext=function(a,b){return S().useContext(a,b)};exports.useDebugValue=function(){};exports.useEffect=function(a,b){return S().useEffect(a,b)};exports.useImperativeHandle=function(a,b,c){return S().useImperativeHandle(a,b,c)};
exports.useLayoutEffect=function(a,b){return S().useLayoutEffect(a,b)};exports.useMemo=function(a,b){return S().useMemo(a,b)};exports.useReducer=function(a,b,c){return S().useReducer(a,b,c)};exports.useRef=function(a){return S().useRef(a)};exports.useState=function(a){return S().useState(a)};exports.version="17.0.2";
});

var react_development = createCommonjsModule(function (module, exports) {
if (process.env.NODE_ENV !== "production") {
  (function() {
var _assign = objectAssign;
var ReactVersion = '17.0.2';
var REACT_ELEMENT_TYPE = 0xeac7;
var REACT_PORTAL_TYPE = 0xeaca;
exports.Fragment = 0xeacb;
exports.StrictMode = 0xeacc;
exports.Profiler = 0xead2;
var REACT_PROVIDER_TYPE = 0xeacd;
var REACT_CONTEXT_TYPE = 0xeace;
var REACT_FORWARD_REF_TYPE = 0xead0;
exports.Suspense = 0xead1;
var REACT_SUSPENSE_LIST_TYPE = 0xead8;
var REACT_MEMO_TYPE = 0xead3;
var REACT_LAZY_TYPE = 0xead4;
var REACT_BLOCK_TYPE = 0xead9;
var REACT_SERVER_BLOCK_TYPE = 0xeada;
var REACT_FUNDAMENTAL_TYPE = 0xead5;
var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;
if (typeof Symbol === 'function' && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor('react.element');
  REACT_PORTAL_TYPE = symbolFor('react.portal');
  exports.Fragment = symbolFor('react.fragment');
  exports.StrictMode = symbolFor('react.strict_mode');
  exports.Profiler = symbolFor('react.profiler');
  REACT_PROVIDER_TYPE = symbolFor('react.provider');
  REACT_CONTEXT_TYPE = symbolFor('react.context');
  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
  exports.Suspense = symbolFor('react.suspense');
  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
  REACT_MEMO_TYPE = symbolFor('react.memo');
  REACT_LAZY_TYPE = symbolFor('react.lazy');
  REACT_BLOCK_TYPE = symbolFor('react.block');
  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
  symbolFor('react.scope');
  symbolFor('react.opaque.id');
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
  symbolFor('react.offscreen');
  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
}
var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}
var ReactCurrentDispatcher = {
  current: null
};
var ReactCurrentBatchConfig = {
  transition: 0
};
var ReactCurrentOwner = {
  current: null
};
var ReactDebugCurrentFrame = {};
var currentExtraStackFrame = null;
function setExtraStackFrame(stack) {
  {
    currentExtraStackFrame = stack;
  }
}
{
  ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {
    {
      currentExtraStackFrame = stack;
    }
  };
  ReactDebugCurrentFrame.getCurrentStack = null;
  ReactDebugCurrentFrame.getStackAddendum = function () {
    var stack = '';
    if (currentExtraStackFrame) {
      stack += currentExtraStackFrame;
    }
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      stack += impl() || '';
    }
    return stack;
  };
}
var IsSomeRendererActing = {
  current: false
};
var ReactSharedInternals = {
  ReactCurrentDispatcher: ReactCurrentDispatcher,
  ReactCurrentBatchConfig: ReactCurrentBatchConfig,
  ReactCurrentOwner: ReactCurrentOwner,
  IsSomeRendererActing: IsSomeRendererActing,
  assign: _assign
};
{
  ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
}
function warn(format) {
  {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    printWarning('warn', format, args);
  }
}
function error(format) {
  {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    printWarning('error', format, args);
  }
}
function printWarning(level, format, args) {
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();
    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    }
    var argsWithFormat = args.map(function (item) {
      return '' + item;
    });
    argsWithFormat.unshift('Warning: ' + format);
    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}
var didWarnStateUpdateForUnmountedComponent = {};
function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + "." + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}
var ReactNoopUpdateQueue = {
  isMounted: function (publicInstance) {
    return false;
  },
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};
var emptyObject = {};
{
  Object.freeze(emptyObject);
}
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function (partialState, callback) {
  if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
    {
      throw Error( "setState(...): takes an object of state variables to update or a function which returns an object of state variables." );
    }
  }
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;
function createRef() {
  var refObject = {
    current: null
  };
  {
    Object.seal(refObject);
  }
  return refObject;
}
function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
}
function getContextName(type) {
  return type.displayName || 'Context';
}
function getComponentName(type) {
  if (type == null) {
    return null;
  }
  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }
  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }
  if (typeof type === 'string') {
    return type;
  }
  switch (type) {
    case exports.Fragment:
      return 'Fragment';
    case REACT_PORTAL_TYPE:
      return 'Portal';
    case exports.Profiler:
      return 'Profiler';
    case exports.StrictMode:
      return 'StrictMode';
    case exports.Suspense:
      return 'Suspense';
    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }
  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';
      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';
      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_BLOCK_TYPE:
        return getComponentName(type._render);
      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;
          try {
            return getComponentName(init(payload));
          } catch (x) {
            return null;
          }
        }
    }
  }
  return null;
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
{
  didWarnAboutStringRefs = {};
}
function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}
function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}
function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;
        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}
function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;
        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}
function warnIfStringRefCannotBeAutoConverted(config) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
      var componentName = getComponentName(ReactCurrentOwner.current.type);
      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner
  };
  {
    element._store = {};
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }
  return element;
};
function createElement(type, config, children) {
  var propName;
  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;
  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
      {
        warnIfStringRefCannotBeAutoConverted(config);
      }
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
  return newElement;
}
function cloneElement(element, config, children) {
  if (!!(element === null || element === undefined)) {
    {
      throw Error( "React.cloneElement(...): The argument must be a React element, but you passed " + element + "." );
    }
  }
  var propName;
  var props = _assign({}, element.props);
  var key = element.key;
  var ref = element.ref;
  var self = element._self;
  var source = element._source;
  var owner = element._owner;
  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }
  return ReactElement(element.type, key, ref, self, source, owner, props);
}
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
var SEPARATOR = '.';
var SUBSEPARATOR = ':';
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = key.replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });
  return '$' + escapedString;
}
var didWarnAboutMaps = false;
var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return text.replace(userProvidedKeyEscapeRegex, '$&/');
}
function getElementKey(element, index) {
  if (typeof element === 'object' && element !== null && element.key != null) {
    return escape('' + element.key);
  }
  return index.toString(36);
}
function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  var type = typeof children;
  if (type === 'undefined' || type === 'boolean') {
    children = null;
  }
  var invokeCallback = false;
  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }
  if (invokeCallback) {
    var _child = children;
    var mappedChild = callback(_child);
    var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
    if (Array.isArray(mappedChild)) {
      var escapedChildKey = '';
      if (childKey != null) {
        escapedChildKey = escapeUserProvidedKey(childKey) + '/';
      }
      mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {
        return c;
      });
    } else if (mappedChild != null) {
      if (isValidElement(mappedChild)) {
        mappedChild = cloneAndReplaceKey(mappedChild,
        escapedPrefix + (
        mappedChild.key && (!_child || _child.key !== mappedChild.key) ?
        escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey);
      }
      array.push(mappedChild);
    }
    return 1;
  }
  var child;
  var nextName;
  var subtreeCount = 0;
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getElementKey(child, i);
      subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      var iterableChildren = children;
      {
        if (iteratorFn === iterableChildren.entries) {
          if (!didWarnAboutMaps) {
            warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
          }
          didWarnAboutMaps = true;
        }
      }
      var iterator = iteratorFn.call(iterableChildren);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getElementKey(child, ii++);
        subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
      }
    } else if (type === 'object') {
      var childrenString = '' + children;
      {
        {
          throw Error( "Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + "). If you meant to render a collection of children, use an array instead." );
        }
      }
    }
  }
  return subtreeCount;
}
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  var count = 0;
  mapIntoArray(children, result, '', '', function (child) {
    return func.call(context, child, count++);
  });
  return result;
}
function countChildren(children) {
  var n = 0;
  mapChildren(children, function () {
    n++;
  });
  return n;
}
function forEachChildren(children, forEachFunc, forEachContext) {
  mapChildren(children, function () {
    forEachFunc.apply(this, arguments);
  }, forEachContext);
}
function toArray(children) {
  return mapChildren(children, function (child) {
    return child;
  }) || [];
}
function onlyChild(children) {
  if (!isValidElement(children)) {
    {
      throw Error( "React.Children.only expected to receive a single React element child." );
    }
  }
  return children;
}
function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
        error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
      }
    }
  }
  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };
  var hasWarnedAboutUsingNestedContextConsumers = false;
  var hasWarnedAboutUsingConsumerProvider = false;
  var hasWarnedAboutDisplayNameOnConsumer = false;
  {
    var Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits
    };
    Object.defineProperties(Consumer, {
      Provider: {
        get: function () {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;
            error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
          }
          return context.Provider;
        },
        set: function (_Provider) {
          context.Provider = _Provider;
        }
      },
      _currentValue: {
        get: function () {
          return context._currentValue;
        },
        set: function (_currentValue) {
          context._currentValue = _currentValue;
        }
      },
      _currentValue2: {
        get: function () {
          return context._currentValue2;
        },
        set: function (_currentValue2) {
          context._currentValue2 = _currentValue2;
        }
      },
      _threadCount: {
        get: function () {
          return context._threadCount;
        },
        set: function (_threadCount) {
          context._threadCount = _threadCount;
        }
      },
      Consumer: {
        get: function () {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;
            error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
          }
          return context.Consumer;
        }
      },
      displayName: {
        get: function () {
          return context.displayName;
        },
        set: function (displayName) {
          if (!hasWarnedAboutDisplayNameOnConsumer) {
            warn('Setting `displayName` on Context.Consumer has no effect. ' + "You should set it directly on the context with Context.displayName = '%s'.", displayName);
            hasWarnedAboutDisplayNameOnConsumer = true;
          }
        }
      }
    });
    context.Consumer = Consumer;
  }
  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }
  return context;
}
var Uninitialized = -1;
var Pending = 0;
var Resolved = 1;
var Rejected = 2;
function lazyInitializer(payload) {
  if (payload._status === Uninitialized) {
    var ctor = payload._result;
    var thenable = ctor();
    var pending = payload;
    pending._status = Pending;
    pending._result = thenable;
    thenable.then(function (moduleObject) {
      if (payload._status === Pending) {
        var defaultExport = moduleObject.default;
        {
          if (defaultExport === undefined) {
            error('lazy: Expected the result of a dynamic import() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' +
            'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))", moduleObject);
          }
        }
        var resolved = payload;
        resolved._status = Resolved;
        resolved._result = defaultExport;
      }
    }, function (error) {
      if (payload._status === Pending) {
        var rejected = payload;
        rejected._status = Rejected;
        rejected._result = error;
      }
    });
  }
  if (payload._status === Resolved) {
    return payload._result;
  } else {
    throw payload._result;
  }
}
function lazy(ctor) {
  var payload = {
    _status: -1,
    _result: ctor
  };
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _payload: payload,
    _init: lazyInitializer
  };
  {
    var defaultProps;
    var propTypes;
    Object.defineProperties(lazyType, {
      defaultProps: {
        configurable: true,
        get: function () {
          return defaultProps;
        },
        set: function (newDefaultProps) {
          error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
          defaultProps = newDefaultProps;
          Object.defineProperty(lazyType, 'defaultProps', {
            enumerable: true
          });
        }
      },
      propTypes: {
        configurable: true,
        get: function () {
          return propTypes;
        },
        set: function (newPropTypes) {
          error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
          propTypes = newPropTypes;
          Object.defineProperty(lazyType, 'propTypes', {
            enumerable: true
          });
        }
      }
    });
  }
  return lazyType;
}
function forwardRef(render) {
  {
    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
      error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
    } else if (typeof render !== 'function') {
      error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
    } else {
      if (render.length !== 0 && render.length !== 2) {
        error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
      }
    }
    if (render != null) {
      if (render.defaultProps != null || render.propTypes != null) {
        error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
      }
    }
  }
  var elementType = {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
  {
    var ownName;
    Object.defineProperty(elementType, 'displayName', {
      enumerable: false,
      configurable: true,
      get: function () {
        return ownName;
      },
      set: function (name) {
        ownName = name;
        if (render.displayName == null) {
          render.displayName = name;
        }
      }
    });
  }
  return elementType;
}
var enableScopeAPI = false;
function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  }
  if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
    return true;
  }
  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
      return true;
    }
  }
  return false;
}
function memo(type, compare) {
  {
    if (!isValidElementType(type)) {
      error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
    }
  }
  var elementType = {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: compare === undefined ? null : compare
  };
  {
    var ownName;
    Object.defineProperty(elementType, 'displayName', {
      enumerable: false,
      configurable: true,
      get: function () {
        return ownName;
      },
      set: function (name) {
        ownName = name;
        if (type.displayName == null) {
          type.displayName = name;
        }
      }
    });
  }
  return elementType;
}
function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;
  if (!(dispatcher !== null)) {
    {
      throw Error( "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem." );
    }
  }
  return dispatcher;
}
function useContext(Context, unstable_observedBits) {
  var dispatcher = resolveDispatcher();
  {
    if (unstable_observedBits !== undefined) {
      error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://reactjs.org/link/rules-of-hooks' : '');
    }
    if (Context._context !== undefined) {
      var realContext = Context._context;
      if (realContext.Consumer === Context) {
        error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
      } else if (realContext.Provider === Context) {
        error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
      }
    }
  }
  return dispatcher.useContext(Context, unstable_observedBits);
}
function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
function useReducer(reducer, initialArg, init) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}
function useRef(initialValue) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}
function useEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, deps);
}
function useLayoutEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, deps);
}
function useCallback(callback, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, deps);
}
function useMemo(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, deps);
}
function useImperativeHandle(ref, create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, deps);
}
function useDebugValue(value, formatterFn) {
  {
    var dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;
function disabledLog() {}
disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd;
      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      };
      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
    }
    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;
    if (disabledDepth === 0) {
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      };
      Object.defineProperties(console, {
        log: _assign({}, props, {
          value: prevLog
        }),
        info: _assign({}, props, {
          value: prevInfo
        }),
        warn: _assign({}, props, {
          value: prevWarn
        }),
        error: _assign({}, props, {
          value: prevError
        }),
        group: _assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: _assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: _assign({}, props, {
          value: prevGroupEnd
        })
      });
    }
    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}
var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    }
    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;
{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}
function describeNativeComponentFrame(fn, construct) {
  if (!fn || reentry) {
    return '';
  }
  {
    var frame = componentFrameCache.get(fn);
    if (frame !== undefined) {
      return frame;
    }
  }
  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = undefined;
  var previousDispatcher;
  {
    previousDispatcher = ReactCurrentDispatcher$1.current;
    ReactCurrentDispatcher$1.current = null;
    disableLogs();
  }
  try {
    if (construct) {
      var Fake = function () {
        throw Error();
      };
      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          throw Error();
        }
      });
      if (typeof Reflect === 'object' && Reflect.construct) {
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }
        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }
        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }
      fn();
    }
  } catch (sample) {
    if (sample && control && typeof sample.stack === 'string') {
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;
      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        c--;
      }
      for (; s >= 1 && c >= 0; s--, c--) {
        if (sampleLines[s] !== controlLines[c]) {
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--;
              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');
                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                }
                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }
          break;
        }
      }
    }
  } finally {
    reentry = false;
    {
      ReactCurrentDispatcher$1.current = previousDispatcher;
      reenableLogs();
    }
    Error.prepareStackTrace = previousPrepareStackTrace;
  }
  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';
  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }
  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}
function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}
function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
  if (type == null) {
    return '';
  }
  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }
  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }
  switch (type) {
    case exports.Suspense:
      return describeBuiltInComponentFrame('Suspense');
    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }
  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);
      case REACT_MEMO_TYPE:
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
      case REACT_BLOCK_TYPE:
        return describeFunctionComponentFrame(type._render);
      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;
          try {
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }
  return '';
}
var loggedTypeFailures = {};
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}
function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    var has = Function.call.bind(Object.prototype.hasOwnProperty);
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0;
        try {
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }
          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }
        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);
          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);
          setCurrentlyValidatingElement(null);
        }
        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);
          error('Failed %s type: %s', location, error$1.message);
          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}
function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      setExtraStackFrame(stack);
    } else {
      setExtraStackFrame(null);
    }
  }
}
var propTypesMisspellWarningShown;
{
  propTypesMisspellWarningShown = false;
}
function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current.type);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}
function getSourceInfoErrorAddendum(source) {
  if (source !== undefined) {
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}
function getSourceInfoErrorAddendumForProps(elementProps) {
  if (elementProps !== null && elementProps !== undefined) {
    return getSourceInfoErrorAddendum(elementProps.__source);
  }
  return '';
}
var ownerHasKeyUseWarning = {};
function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();
  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = "\n\nCheck the top-level render call using <" + parentName + ">.";
    }
  }
  return info;
}
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;
  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
  }
  {
    setCurrentlyValidatingElement$1(element);
    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
    setCurrentlyValidatingElement$1(null);
  }
}
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}
function validatePropTypes(element) {
  {
    var type = element.type;
    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }
    var propTypes;
    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE ||
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }
    if (propTypes) {
      var name = getComponentName(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true;
      var _name = getComponentName(type);
      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }
    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);
        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
        setCurrentlyValidatingElement$1(null);
        break;
      }
    }
    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);
      error('Invalid attribute `ref` supplied to `React.Fragment`.');
      setCurrentlyValidatingElement$1(null);
    }
  }
}
function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type);
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }
    var sourceInfo = getSourceInfoErrorAddendumForProps(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }
    var typeString;
    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }
    {
      error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }
  }
  var element = createElement.apply(this, arguments);
  if (element == null) {
    return element;
  }
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }
  if (type === exports.Fragment) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }
  return element;
}
var didWarnAboutDeprecatedCreateFactory = false;
function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;
  {
    if (!didWarnAboutDeprecatedCreateFactory) {
      didWarnAboutDeprecatedCreateFactory = true;
      warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
    }
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }
  return validatedFactory;
}
function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}
{
  try {
    var frozenObject = Object.freeze({});
    new Map([[frozenObject, null]]);
    new Set([frozenObject]);
  } catch (e) {
  }
}
var createElement$1 =  createElementWithValidation ;
var cloneElement$1 =  cloneElementWithValidation ;
var createFactory =  createFactoryWithValidation ;
var Children = {
  map: mapChildren,
  forEach: forEachChildren,
  count: countChildren,
  toArray: toArray,
  only: onlyChild
};
exports.Children = Children;
exports.Component = Component;
exports.PureComponent = PureComponent;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
exports.cloneElement = cloneElement$1;
exports.createContext = createContext;
exports.createElement = createElement$1;
exports.createFactory = createFactory;
exports.createRef = createRef;
exports.forwardRef = forwardRef;
exports.isValidElement = isValidElement;
exports.lazy = lazy;
exports.memo = memo;
exports.useCallback = useCallback;
exports.useContext = useContext;
exports.useDebugValue = useDebugValue;
exports.useEffect = useEffect;
exports.useImperativeHandle = useImperativeHandle;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;
exports.version = ReactVersion;
  })();
}
});

var react = createCommonjsModule(function (module) {
if (process.env.NODE_ENV === 'production') {
  module.exports = react_production_min;
} else {
  module.exports = react_development;
}
});

var reactJsxRuntime_production_min = createCommonjsModule(function (module, exports) {
var g=60103;exports.Fragment=60107;if("function"===typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element");exports.Fragment=h("react.fragment");}var m=react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,k){var b,d={},e=null,l=null;void 0!==k&&(e=""+k);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(l=a.ref);for(b in a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q;exports.jsxs=q;
});

var reactJsxRuntime_development = createCommonjsModule(function (module, exports) {
if (process.env.NODE_ENV !== "production") {
  (function() {
var React = react;
var _assign = objectAssign;
var REACT_ELEMENT_TYPE = 0xeac7;
var REACT_PORTAL_TYPE = 0xeaca;
exports.Fragment = 0xeacb;
var REACT_STRICT_MODE_TYPE = 0xeacc;
var REACT_PROFILER_TYPE = 0xead2;
var REACT_PROVIDER_TYPE = 0xeacd;
var REACT_CONTEXT_TYPE = 0xeace;
var REACT_FORWARD_REF_TYPE = 0xead0;
var REACT_SUSPENSE_TYPE = 0xead1;
var REACT_SUSPENSE_LIST_TYPE = 0xead8;
var REACT_MEMO_TYPE = 0xead3;
var REACT_LAZY_TYPE = 0xead4;
var REACT_BLOCK_TYPE = 0xead9;
var REACT_SERVER_BLOCK_TYPE = 0xeada;
var REACT_FUNDAMENTAL_TYPE = 0xead5;
var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;
if (typeof Symbol === 'function' && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor('react.element');
  REACT_PORTAL_TYPE = symbolFor('react.portal');
  exports.Fragment = symbolFor('react.fragment');
  REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
  REACT_PROFILER_TYPE = symbolFor('react.profiler');
  REACT_PROVIDER_TYPE = symbolFor('react.provider');
  REACT_CONTEXT_TYPE = symbolFor('react.context');
  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
  REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
  REACT_MEMO_TYPE = symbolFor('react.memo');
  REACT_LAZY_TYPE = symbolFor('react.lazy');
  REACT_BLOCK_TYPE = symbolFor('react.block');
  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
  symbolFor('react.scope');
  symbolFor('react.opaque.id');
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
  symbolFor('react.offscreen');
  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
}
var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}
var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
function error(format) {
  {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    printWarning('error', format, args);
  }
}
function printWarning(level, format, args) {
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();
    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    }
    var argsWithFormat = args.map(function (item) {
      return '' + item;
    });
    argsWithFormat.unshift('Warning: ' + format);
    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}
var enableScopeAPI = false;
function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  }
  if (type === exports.Fragment || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
    return true;
  }
  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
      return true;
    }
  }
  return false;
}
function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
}
function getContextName(type) {
  return type.displayName || 'Context';
}
function getComponentName(type) {
  if (type == null) {
    return null;
  }
  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }
  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }
  if (typeof type === 'string') {
    return type;
  }
  switch (type) {
    case exports.Fragment:
      return 'Fragment';
    case REACT_PORTAL_TYPE:
      return 'Portal';
    case REACT_PROFILER_TYPE:
      return 'Profiler';
    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';
    case REACT_SUSPENSE_TYPE:
      return 'Suspense';
    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }
  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';
      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';
      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_BLOCK_TYPE:
        return getComponentName(type._render);
      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;
          try {
            return getComponentName(init(payload));
          } catch (x) {
            return null;
          }
        }
    }
  }
  return null;
}
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;
function disabledLog() {}
disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd;
      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      };
      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
    }
    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;
    if (disabledDepth === 0) {
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      };
      Object.defineProperties(console, {
        log: _assign({}, props, {
          value: prevLog
        }),
        info: _assign({}, props, {
          value: prevInfo
        }),
        warn: _assign({}, props, {
          value: prevWarn
        }),
        error: _assign({}, props, {
          value: prevError
        }),
        group: _assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: _assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: _assign({}, props, {
          value: prevGroupEnd
        })
      });
    }
    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}
var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    }
    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;
{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}
function describeNativeComponentFrame(fn, construct) {
  if (!fn || reentry) {
    return '';
  }
  {
    var frame = componentFrameCache.get(fn);
    if (frame !== undefined) {
      return frame;
    }
  }
  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = undefined;
  var previousDispatcher;
  {
    previousDispatcher = ReactCurrentDispatcher.current;
    ReactCurrentDispatcher.current = null;
    disableLogs();
  }
  try {
    if (construct) {
      var Fake = function () {
        throw Error();
      };
      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          throw Error();
        }
      });
      if (typeof Reflect === 'object' && Reflect.construct) {
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }
        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }
        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }
      fn();
    }
  } catch (sample) {
    if (sample && control && typeof sample.stack === 'string') {
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;
      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        c--;
      }
      for (; s >= 1 && c >= 0; s--, c--) {
        if (sampleLines[s] !== controlLines[c]) {
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--;
              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');
                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                }
                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }
          break;
        }
      }
    }
  } finally {
    reentry = false;
    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }
    Error.prepareStackTrace = previousPrepareStackTrace;
  }
  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';
  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }
  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}
function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}
function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
  if (type == null) {
    return '';
  }
  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }
  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }
  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');
    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }
  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);
      case REACT_MEMO_TYPE:
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
      case REACT_BLOCK_TYPE:
        return describeFunctionComponentFrame(type._render);
      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;
          try {
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }
  return '';
}
var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}
function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    var has = Function.call.bind(Object.prototype.hasOwnProperty);
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0;
        try {
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }
          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }
        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);
          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);
          setCurrentlyValidatingElement(null);
        }
        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);
          error('Failed %s type: %s', location, error$1.message);
          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}
var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;
{
  didWarnAboutStringRefs = {};
}
function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}
function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}
function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentName(ReactCurrentOwner.current.type);
      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);
        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}
function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;
        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };
    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}
function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;
        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };
    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner
  };
  {
    element._store = {};
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }
  return element;
};
function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName;
    var props = {};
    var key = null;
    var ref = null;
    if (maybeKey !== undefined) {
      key = '' + maybeKey;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }
    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;
      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}
var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}
var propTypesMisspellWarningShown;
{
  propTypesMisspellWarningShown = false;
}
function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}
function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentName(ReactCurrentOwner$1.current.type);
      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }
    return '';
  }
}
function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }
    return '';
  }
}
var ownerHasKeyUseWarning = {};
function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();
    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }
    return info;
  }
}
function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }
    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }
    ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
    var childOwner = '';
    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
    }
    setCurrentlyValidatingElement$1(element);
    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
    setCurrentlyValidatingElement$1(null);
  }
}
function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }
    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];
        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);
      if (typeof iteratorFn === 'function') {
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;
          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
function validatePropTypes(element) {
  {
    var type = element.type;
    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }
    var propTypes;
    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE ||
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }
    if (propTypes) {
      var name = getComponentName(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true;
      var _name = getComponentName(type);
      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }
    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);
        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
        setCurrentlyValidatingElement$1(null);
        break;
      }
    }
    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);
      error('Invalid attribute `ref` supplied to `React.Fragment`.');
      setCurrentlyValidatingElement$1(null);
    }
  }
}
function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type);
    if (!validType) {
      var info = '';
      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }
      var sourceInfo = getSourceInfoErrorAddendum(source);
      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }
      var typeString;
      if (type === null) {
        typeString = 'null';
      } else if (Array.isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }
      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }
    var element = jsxDEV(type, props, key, source, self);
    if (element == null) {
      return element;
    }
    if (validType) {
      var children = props.children;
      if (children !== undefined) {
        if (isStaticChildren) {
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }
            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }
    if (type === exports.Fragment) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }
    return element;
  }
}
function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}
var jsx =  jsxWithValidationDynamic ;
var jsxs =  jsxWithValidationStatic ;
exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}
});

var jsxRuntime = createCommonjsModule(function (module) {
if (process.env.NODE_ENV === 'production') {
  module.exports = reactJsxRuntime_production_min;
} else {
  module.exports = reactJsxRuntime_development;
}
});

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
_support.replaceFlag;
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

var MitoContext = react.createContext({});
MitoContext.displayName = 'MitoContext';
var MitoProvider = function (_a) {
    var MitoInstance = _a.MitoInstance, children = _a.children;
    return jsxRuntime.jsx(MitoContext.Provider, __assign({ value: { MitoInstance: MitoInstance } }, { children: children }), void 0);
};

var ErrorBoundaryWrapped = (function (_super) {
    __extends(ErrorBoundaryWrapped, _super);
    function ErrorBoundaryWrapped(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hasError: false
        };
        return _this;
    }
    ErrorBoundaryWrapped.prototype.componentDidCatch = function (error, _a) {
        var componentStack = _a.componentStack;
        var _b = this.props, onError = _b.onError, MitoInstance = _b.MitoInstance;
        var reactError = extractErrorStack(error, Severity.Normal);
        reactError.type = "REACT";
        var breadcrumbStack = MitoInstance.breadcrumb.push({
            type: "React",
            data: reactError,
            category: getBreadcrumbCategoryInBrowser("React"),
            level: Severity.Error
        });
        onError === null || onError === void 0 ? void 0 : onError(error, componentStack);
        MitoInstance.transport.send(reactError, breadcrumbStack);
        this.setState({
            hasError: true
        });
    };
    ErrorBoundaryWrapped.prototype.render = function () {
        var _a;
        return (_a = (this.state.hasError ? this.props.fallback : this.props.children)) !== null && _a !== void 0 ? _a : null;
    };
    return ErrorBoundaryWrapped;
}(react.PureComponent));
var ErrorBoundary = function (props) { return (jsxRuntime.jsx(MitoContext.Consumer, { children: function (_a) {
        var MitoInstance = _a.MitoInstance;
        return (jsxRuntime.jsx(ErrorBoundaryWrapped, __assign({}, props, { MitoInstance: props.MitoInstance || MitoInstance }, { children: props.children }), void 0));
    } }, void 0)); };
var WithErrorBoundary = function (errorBoundaryProps) {
    if (errorBoundaryProps === void 0) { errorBoundaryProps = {}; }
    return function (ToWrapComponent) {
        var componentDisplayName = ToWrapComponent.displayName || ToWrapComponent.name || 'unknown';
        var wrapped = function (props) { return (jsxRuntime.jsx(ErrorBoundary, __assign({}, errorBoundaryProps, { children: jsxRuntime.jsx(ToWrapComponent, __assign({}, props), void 0) }), void 0)); };
        wrapped.displayName = "MitoErrorBoundary(" + componentDisplayName + ")";
        return wrapped;
    };
};

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
                var _a, _b;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var res = (_a = item.transform) === null || _a === void 0 ? void 0 : _a.apply(_this, args);
                (_b = item.consumer) === null || _b === void 0 ? void 0 : _b.call(_this, res);
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
        if (breadcrumb === void 0) { breadcrumb = []; }
        return __awaiter(this, void 0, void 0, function () {
            var errorId, transportData, dsn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data.isTrack) {
                            errorId = createErrorId(data, this.apikey, this.maxDuplicateCount);
                            if (!errorId)
                                return [2];
                            data.errorId = errorId;
                        }
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
                            logger.error('dsn is empty,pass in when initializing please');
                            return [2];
                        }
                        if (typeof this.configReportUrl === 'function') {
                            dsn = this.configReportUrl(transportData, dsn);
                            if (!dsn)
                                return [2];
                        }
                        return [2, this.sendToServer(transportData, dsn)];
                }
            });
        });
    };
    return BaseTransport;
}());

var BrowserOptions = (function (_super) {
    __extends(BrowserOptions, _super);
    function BrowserOptions(options) {
        var _this = _super.call(this) || this;
        _this.vue = null;
        _this.configReportXhr = null;
        _super.prototype.bindOptions.call(_this, options);
        _this.bindOptions(options);
        return _this;
    }
    BrowserOptions.prototype.bindOptions = function (options) {
        var silentXhr = options.silentXhr, silentFetch = options.silentFetch, silentConsole = options.silentConsole, silentDom = options.silentDom, silentHistory = options.silentHistory, silentError = options.silentError, silentHashchange = options.silentHashchange, silentUnhandledrejection = options.silentUnhandledrejection, useImgUpload = options.useImgUpload, configReportXhr = options.configReportXhr, vue = options.vue;
        toStringValidateOption(silentXhr, 'silentXhr', "Boolean") && (this.silentXhr = silentXhr);
        toStringValidateOption(silentFetch, 'silentFetch', "Boolean") && (this.silentFetch = silentFetch);
        toStringValidateOption(silentConsole, 'silentConsole', "Boolean") && (this.silentConsole = silentConsole);
        toStringValidateOption(silentDom, 'silentDom', "Boolean") && (this.silentDom = silentDom);
        toStringValidateOption(silentHistory, 'silentHistory', "Boolean") && (this.silentHistory = silentHistory);
        toStringValidateOption(silentError, 'silentError', "Boolean") && (this.silentError = silentError);
        toStringValidateOption(silentHashchange, 'silentHashchange', "Boolean") && (this.silentHashchange = silentXhr);
        toStringValidateOption(silentUnhandledrejection, 'silentUnhandledrejection', "Boolean") &&
            (this.silentUnhandledrejection = silentUnhandledrejection);
        toStringValidateOption(useImgUpload, 'useImgUpload', "Boolean") && (this.useImgUpload = useImgUpload);
        this.vue = vue;
        toStringValidateOption(configReportXhr, 'configReportXhr', "Function") && (this.configReportXhr = configReportXhr);
    };
    return BrowserOptions;
}(BaseOptions));

var BrowserTransport = (function (_super) {
    __extends(BrowserTransport, _super);
    function BrowserTransport(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.useImgUpload = false;
        _super.prototype.bindOptions.call(_this, options);
        return _this;
    }
    BrowserTransport.prototype.post = function (data, url) {
        var _this = this;
        var requestFun = function () {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.withCredentials = true;
            if (typeof _this.configReportXhr === 'function') {
                _this.configReportXhr(xhr, data);
            }
            xhr.send(safeStringify(data));
        };
        this.queue.addTask(requestFun);
    };
    BrowserTransport.prototype.imgRequest = function (data, url) {
        var requestFun = function () {
            var img = new Image();
            var spliceStr = url.indexOf('?') === -1 ? '?' : '&';
            img.src = "" + url + spliceStr + "data=" + encodeURIComponent(safeStringify(data));
            img = null;
        };
        this.queue.addTask(requestFun);
    };
    BrowserTransport.prototype.sendToServer = function (data, url) {
        return this.useImgUpload ? this.imgRequest(data, url) : this.post(data, url);
    };
    BrowserTransport.prototype.getTransportData = function (data) {
        return {
            authInfo: this.getAuthInfo(),
            data: data
        };
    };
    BrowserTransport.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var configReportXhr = options.configReportXhr, useImgUpload = options.useImgUpload;
        toStringValidateOption(configReportXhr, 'configReportXhr', "Function") && (this.configReportXhr = configReportXhr);
        toStringValidateOption(useImgUpload, 'useImgUpload', "Boolean") && (this.useImgUpload = useImgUpload);
    };
    return BrowserTransport;
}(BaseTransport));

var BrowserClient = (function (_super) {
    __extends(BrowserClient, _super);
    function BrowserClient(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.options = new BrowserOptions(options);
        _this.transport = new BrowserTransport(options);
        _this.breadcrumb = new Breadcrumb(options);
        return _this;
    }
    BrowserClient.prototype.isPluginEnable = function (name) {
        var silentField = "silent" + firstStrtoUppercase(name);
        return !this.options[silentField];
    };
    BrowserClient.prototype.log = function (data) {
        var _a = data.message, message = _a === void 0 ? MitoLogEmptyMsg : _a, _b = data.tag, tag = _b === void 0 ? MitoLogEmptyTag : _b, _c = data.level, level = _c === void 0 ? Severity.Critical : _c, _d = data.ex, ex = _d === void 0 ? '' : _d;
        var errorInfo = {};
        if (isError(ex)) {
            errorInfo = extractErrorStack(ex, level);
        }
        var error = __assign({ type: "LOG", level: level, message: unknownToString(message), name: MitoLog, customTag: unknownToString(tag), time: getTimestamp(), url: getLocationHref() }, errorInfo);
        var breadcrumbStack = this.breadcrumb.push({
            type: "Customer",
            category: getBreadcrumbCategoryInBrowser("Customer"),
            data: message,
            level: Severity.fromString(level.toString())
        });
        this.transport.send(error, breadcrumbStack);
    };
    return BrowserClient;
}(BaseClient));

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

var fetchPlugin = {
    name: "fetch",
    monitor: function (notify) {
        monitorFetch.call(this, notify);
    },
    transform: function (collectedData) {
        return httpTransform(collectedData);
    },
    consumer: function (transformedData) {
        httpTransformedDataConsumer.call(this, transformedData);
    }
};
function monitorFetch(notify) {
    var _a = this, options = _a.options, transport = _a.transport;
    if (!('fetch' in _global)) {
        return;
    }
    replaceOld(_global, "fetch", function (originalFetch) {
        return function (url, config) {
            if (config === void 0) { config = {}; }
            var sTime = getTimestamp();
            var method = (config && config.method) || 'GET';
            var httpCollect = {
                request: {
                    httpType: "fetch",
                    url: url,
                    method: method,
                    data: config && config.body
                },
                time: sTime,
                response: {}
            };
            var headers = new Headers(config.headers || {});
            Object.assign(headers, {
                setRequestHeader: headers.set
            });
            options.setTraceId(url, function (headerFieldName, traceId) {
                httpCollect.request.traceId = traceId;
                headers.set(headerFieldName, traceId);
            });
            options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method: method, url: url }, headers);
            config = __assign(__assign({}, config), { headers: headers });
            var isBlock = transport.isSelfDsn(url) || options.isFilterHttpUrl(url);
            return originalFetch.apply(_global, [url, config]).then(function (res) {
                var resClone = res.clone();
                var eTime = getTimestamp();
                httpCollect.elapsedTime = eTime - sTime;
                httpCollect.response.status = resClone.status;
                resClone.text().then(function (data) {
                    if (isBlock)
                        return;
                    httpCollect.response.data = data;
                    notify("fetch", httpCollect);
                });
                return res;
            }, function (err) {
                if (isBlock)
                    return;
                var eTime = getTimestamp();
                httpCollect.elapsedTime = eTime - sTime;
                httpCollect.response.status = 0;
                notify("fetch", httpCollect);
                throw err;
            });
        };
    });
}

var domPlugins = {
    name: "dom",
    monitor: function (notify) {
        if (!('document' in _global))
            return;
        var clickThrottle = throttle(notify, this.options.throttleDelayTime);
        on(_global.document, 'click', function () {
            clickThrottle("dom", {
                category: 'click',
                data: this
            });
        }, true);
    },
    transform: function (collectedData) {
        var htmlString = htmlElementAsString(collectedData.data.activeElement);
        var breadcrumb = this.breadcrumb;
        if (htmlString) {
            breadcrumb.push({
                type: "UI.Click",
                category: getBreadcrumbCategoryInBrowser("UI.Click"),
                data: htmlString,
                level: Severity.Info
            });
        }
    },
    consumer: function () { }
};

var errorPlugin = {
    name: "error",
    monitor: function (notify) {
        on(_global, 'error', function (e) {
            notify("error", e);
        }, true);
    },
    transform: function (errorEvent) {
        var target = errorEvent.target;
        if (target.localName) {
            return resourceTransform(errorEvent.target);
        }
        return codeErrorTransform(errorEvent);
    },
    consumer: function (transformedData) {
        var type = transformedData.type === "RESOURCE" ? "Resource" : "Code Error";
        var breadcrumbStack = this.breadcrumb.push({
            type: type,
            category: "exception",
            data: transformedData,
            level: Severity.Error
        });
        this.transport.send(transformedData, breadcrumbStack);
    }
};
var resourceMap = {
    img: '图片',
    script: 'js脚本'
};
function resourceTransform(target) {
    return {
        type: "RESOURCE",
        url: getLocationHref(),
        message: '资源地址: ' + (interceptStr(target.src, 120) || interceptStr(target.href, 120)),
        level: Severity.Low,
        time: getTimestamp(),
        name: (resourceMap[target.localName] || target.localName) + "\u52A0\u8F7D\u5931\u8D25"
    };
}
function codeErrorTransform(errorEvent) {
    var message = errorEvent.message, filename = errorEvent.filename, lineno = errorEvent.lineno, colno = errorEvent.colno, error = errorEvent.error;
    var result;
    if (error && isError(error)) {
        result = extractErrorStack(error, Severity.Normal);
    }
    result || (result = handleNotErrorInstance(message, filename, lineno, colno));
    result.type = "JAVASCRIPT";
    return result;
}
function handleNotErrorInstance(message, filename, lineno, colno) {
    var name = "UNKNOWN";
    var url = filename || getLocationHref();
    var msg = message;
    var matches = message.match(ERROR_TYPE_RE);
    if (matches[1]) {
        name = matches[1];
        msg = matches[2];
    }
    var element = {
        url: url,
        func: "UNKNOWN_FUNCTION",
        args: "UNKNOWN",
        line: lineno,
        col: colno
    };
    return {
        url: url,
        name: name,
        message: msg,
        level: Severity.Normal,
        time: getTimestamp(),
        stack: [element]
    };
}

var hashRoutePlugin = {
    name: "hashchange",
    monitor: function (notify) {
        if (!isExistProperty(_global, 'onpopstate')) {
            on(_global, "hashchange", function (e) {
                var from = e.oldURL, to = e.newURL;
                notify("hashchange", { from: from, to: to });
            });
        }
    },
    transform: function (collectedData) {
        return routeTransform(collectedData);
    },
    consumer: function (transformedData) {
        routeTransformedConsumer.call(this, transformedData);
    }
};
function routeTransform(collectedData) {
    var from = collectedData.from, to = collectedData.to;
    var parsedFrom = parseUrlToObj(from).relative;
    var parsedTo = parseUrlToObj(to).relative;
    return {
        from: parsedFrom ? parsedFrom : '/',
        to: parsedTo ? parsedTo : '/'
    };
}
function routeTransformedConsumer(transformedData) {
    if (transformedData.from === transformedData.to)
        return;
    this.breadcrumb.push({
        type: "Route",
        category: getBreadcrumbCategoryInBrowser("Route"),
        data: transformedData,
        level: Severity.Info
    });
}

var historyRoutePlugin = {
    name: "history",
    monitor: function (notify) {
        var lastHref;
        if (!supportsHistory())
            return;
        var oldOnpopstate = _global.onpopstate;
        _global.onpopstate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var to = getLocationHref();
            var from = lastHref;
            lastHref = to;
            notify("history", {
                from: from,
                to: to
            });
            oldOnpopstate && oldOnpopstate.apply(this, args);
        };
        function historyReplaceFn(originalHistoryFn) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var url = args.length > 2 ? args[2] : undefined;
                if (url) {
                    var from = lastHref;
                    var to = String(url);
                    lastHref = to;
                    notify("history", {
                        from: from,
                        to: to
                    });
                }
                return originalHistoryFn.apply(this, args);
            };
        }
        replaceOld(_global.history, 'pushState', historyReplaceFn);
        replaceOld(_global.history, 'replaceState', historyReplaceFn);
    },
    transform: function (collectedData) {
        return routeTransform(collectedData);
    },
    consumer: function (transformedData) {
        routeTransformedConsumer.call(this, transformedData);
    }
};

var consolePlugin = {
    name: "console",
    monitor: function (notify) {
        if (!('console' in _global)) {
            return;
        }
        var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
        logType.forEach(function (level) {
            if (!(level in _global.console))
                return;
            replaceOld(_global.console, level, function (originalConsole) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (originalConsole) {
                        notify("console", { args: args, level: level });
                        originalConsole.apply(_global.console, args);
                    }
                };
            });
        });
    },
    transform: function (collectedData) {
        return collectedData;
    },
    consumer: function (transformedData) {
        if (globalVar.isLogAddBreadcrumb) {
            this.breadcrumb.push({
                type: "Console",
                category: getBreadcrumbCategoryInBrowser("Console"),
                data: transformedData,
                level: Severity.fromString(transformedData.level)
            });
        }
    }
};

var name = "unhandledrejection";
var unhandlerejectionPlugin = {
    name: name,
    monitor: function (notify) {
        on(_global, name, function (ev) {
            notify(name, ev);
        });
    },
    transform: function (collectedData) {
        var data = {
            type: "PROMISE",
            message: unknownToString(collectedData.reason),
            url: getLocationHref(),
            name: collectedData.type,
            time: getTimestamp(),
            level: Severity.Low
        };
        if (isError(collectedData.reason)) {
            data = __assign(__assign({}, data), extractErrorStack(collectedData.reason, Severity.Low));
        }
        return data;
    },
    consumer: function (transformedData) {
        var breadcrumbStack = this.breadcrumb.push({
            type: "Unhandledrejection",
            category: getBreadcrumbCategoryInBrowser("Unhandledrejection"),
            data: transformedData,
            level: Severity.Error
        });
        this.transport.send(transformedData, breadcrumbStack);
    }
};

function createBrowserInstance(options, plugins) {
    if (options === void 0) { options = {}; }
    if (plugins === void 0) { plugins = []; }
    var browserClient = new BrowserClient(options);
    var browserPlugins = [
        fetchPlugin,
        xhrPlugin,
        domPlugins,
        errorPlugin,
        hashRoutePlugin,
        historyRoutePlugin,
        consolePlugin,
        unhandlerejectionPlugin
    ];
    browserClient.use(__spreadArray(__spreadArray([], browserPlugins, true), plugins, true));
    return browserClient;
}

exports.BrowserClient = BrowserClient;
exports.ErrorBoundary = ErrorBoundary;
exports.MitoContext = MitoContext;
exports.MitoProvider = MitoProvider;
exports.WithErrorBoundary = WithErrorBoundary;
exports.init = createBrowserInstance;
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=react.js.map
