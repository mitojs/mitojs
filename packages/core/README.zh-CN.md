# @mitojs/core
给[@mitojs](https://github.com/mitojs/mitojs)下面的库提供核心类、基础抽象类和基础配置



**以下是基础的配置，[@mitojs/browser](../browser/README.md) 和 [@mitojs/wx-mini](../wx-mini/README.md)都能传入😎**
## BaseOptionsFieldsType -


上报接口的地址
### dsn?: string

默认关闭，为true时，整个sdk将禁用
### disabled?: boolean

每个项目都应有一个唯一key
### apikey?: string

默认关闭，为true时会在控制台打印用户行为栈
### debug?: boolean

默认关闭traceId，开启时，页面的所有请求都会生成一个unique id，放入请求头中
### enableTraceId?: boolean

如果开启了enableTraceId,也需要配置该配置项，时，才会在该请求头中添加traceId
由于
当`enableTraceId`为时，考虑到接口如果随便加上多余的请求头会造成跨域，所以这边用的是包含关系的正则.当`includeHttpUrlTraceIdRegExp.test(xhr.url)`为`true`时，改url就会被添加`traceId`的请求头属性
### includeHttpUrlTraceIdRegExp?: RegExp

当`enableTraceId`为时，traceId放入请求头中的key，默认是Trace-Id，也可以手动配置
### traceIdFieldName?: string



默认为空，所有ajax都会被监听，不为空时，filterXhrUrlRegExp.test(xhr.url)为true时过滤
### filterXhrUrlRegExp?: RegExp

默认20，最大100，超过100还是设置成100
### maxBreadcrumbs?: number

默认是0，表示按钮点击和微信触摸事件节流时间
### throttleDelayTime?: number

默认为2，最多可重复上报同一个错误的次数
### maxDuplicateCount?: number

Vue根实例
### vue?: VueInstance



## BaseOptionsHooksType - 钩子函数


```js
  /**
   * 钩子函数:在每次发送事件前会调用
   *
   * @param {TransportDataType} event 上报的数据格式
   * @return {*}  {(Promise<TransportDataType | null | CANCEL> | TransportDataType | any | CANCEL | null)} 如果返回 null | undefined | boolean 时，将忽略本次上传
   * @memberof BaseOptionsHooksType
   */
```
### beforeDataReport?(event: TransportDataType): Promise<TransportDataType | null | CANCEL> | TransportDataType | any | CANCEL | null

**示例**：如果错误事件发生在`test.com/test`地址下则不上报服务端

```js
MITO.init({
  ...
  async beforeDataReport(event){
  	if (event.data.url === 'test.com/test') return false
    return event
	}
})
```



------------------------



  ```js
  /**
   *
   * 钩子函数，每次发送前都会调用
   * @param {TransportDataType} event 上报的数据格式
   * @param {string} url 上报到服务端的地址
   * @return {*}  {string} 返回空时不上报
   * @memberof BaseOptionsHooksType
   */
  ```
### configReportUrl?(event: TransportDataType, url: string): string

****

**示例**：上报时可在url后面追加时间戳字段time

```js
MITO.init({
  ...
  async configReportXhr(event, url){
    return `${url}?time=${Date.now()}`
	}
})
```



---------------------



  ```js
  /**
   * 钩子函数:在每次添加用户行为事件前都会调用
   *
   * @param {Breadcrumb} breadcrumb Breadcrumb的实例
   * @param {BreadcrumbPushData} hint 单次推入用户行为栈的数据
   * @return {*}  {(BreadcrumbPushData | CANCEL)} 如果返回 null | undefined | boolean 时，将忽略本次的push
   * @memberof BaseOptionsHooksType
   */
  ```
### beforePushBreadcrumb?(breadcrumb: Breadcrumb, hint: BreadcrumbPushData): BreadcrumbPushData | CANCEL

**示例**：如果`type`是`Console`的就过滤，不会`push`到当前用户行为栈中

```typescript
MITO.init({
  ...
  beforePushBreadcrumb(breadcrumb, hint){
  	console.log(breadcrumb, hint)
  	if (hint.type === 'Console') return false
		return hint
	}
})
```



--------------



  ```js
  /**
   * 钩子函数:拦截用户页面的ajax请求，并在ajax请求发送前执行该hook，可以对用户发送的ajax请求做xhr.setRequestHeader
   *
   * @param {IRequestHeaderConfig} config 原本的请求头信息
   * @param {IBeforeAppAjaxSendConfig} setRequestHeader 设置请求头函数
   * @memberof BaseOptionsHooksType
   */
  ```
### beforeAppAjaxSend?(config: IRequestHeaderConfig, setRequestHeader: IBeforeAppAjaxSendConfig): void

**示例**：拦截用户页面的ajax请求，并在ajax请求发送前执行该hook。在页面所有ajax请求时添加请求头，类似`axios`的request拦截器，

```typescript
MITO.init({
  ...
  beforeAppAjaxSend({method, url}, config){
  	if (method === 'GET') {
  		config.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')
  	}
	}
})
```



----------



  ```js
  /**
   *钩子函数:在beforeDataReport后面调用，在整合上报数据和本身SDK信息数据前调用，当前函数执行完后立即将数据错误信息上报至服务端
   *trackerId表示用户唯一键（可以理解成userId），需要trackerId的意义可以区分每个错误影响的用户数量
   *
   * @return {*}  {(string | number)}
   * @memberof BaseOptionsHooksType
   */
  ```
### backTrackerId?(): string | number
**示例**：trackerId表示用户唯一键（可以理解成userId），可以用uuid生成或用直接用userId，为了方便区分每个错误的用户数，会放入`authInfo`对象中

```typescript
MITO.init({
  ...
  backTrackerId(){
  	// 比如userId在localStorage中
  	return localStorage.getItem('userId')
	}
})
```


## manual reporting
you can call `log` function in anywhere with mito instance

```js
interface LogTypes {
  message?: string | number | Object
  tag?: string;
  level?: Severity;
  ex?: any;
}
MitoInstance.log(LogTypes)
```

```js
MitoInstance.log({
  message: 'some msg',
  tag: 'your tag',
})
```


Sometime we need to report business information or track information in business code,then we can use `MitoInstance.log`.The following example is that report abnormal information if the http interface is abnoraml
```js
$api.getPayStatus().then(res => {
  if (res.success) {
    // http status normal
  } else {
    // abnormal report information
    MitoInstance.log({
      // error message
      message: res.errMsg,
      // optional,can understand as category
      tag: 'payPage'
      // optional,default is Severity.Critical
      // level: '',
      // optional,Error Object
      // ex: ''
    })
  }
})
```

It's also can statistical PV and UV of uses of each function.Such as the following example is track in ActivePage function,UV statistics need to rely on `trackerId`[trackerId configuration](https://github.com/mitojs/mitojs/blob/master/docs/option.md#backtrackerid)
```js
/**
 * react hook component:ActivePage
 */
function ActivePage() {
  useEffect(() => {
    MitoInstance.log({
      // optional
      tag: 'ActivePage'
    })
  }, [])
  return <div>This Is ActivePage</div>
}
```


### generate errorId
errorId source code [click here](https://github.com/mitojs/mitojs/blob/master/packages/utils/src/errorId.ts)

It's generated according to the passed `tag` key,so will generate the same errorId when passed the same `tag` plus different `message`.Such as the follow:

```js
MitoInstance.log({
  message: 'test_1',
  tag: 'ActivePageStatistics'
})
```

```js
MitoInstance.log({
  message: 'test_2',
  tag: 'ActivePageStatistics'
})
```
The two example will generated the same errorId.But if the `tag` key changed,it will be different
