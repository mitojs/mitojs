# @mitojs/wx-mini

## 🛠️ 安装

```bash
pnpm add @mitojs/wx-mini
```

### 🥳 使用
```typescript
// main.js
import { init } from '@mitojs/wx-mini'

// 多实例
const MitoInstance = init({
  // 开发环境可以开启debug，生成环境改为false
  debug:true,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100,
    // 配置上报时的请求头
  configReportWxRequest(data) {
    return {
      header: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      dataType: 'text'
    }
  },
})
```


更多信息关于`@mitojs/wx-mini`的使用点击[这里](https://mitojs.github.io/mito-doc/#/zh-CN/sdk/guide/wx-mini)





# 📁 使用本地文件

如果你是原生微信小程序的开发者，建议将这个url:[https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js](https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js)，下载下来作为一个js文件。然后导入到`app.js`，就像下面这样：
![wx-mini-local-file](https://tva1.sinaimg.cn/large/008i3skNly1gupnrax29kj612z0u0dik02.jpg)



## uni-app（Vue框架）

支持所有vue框架，例如uni-app等等

### 🛠️ 安装
```bash
pnpm add @mitojs/wx-mini @mitojs/vue
```



### 使用

```typescript
import { init } from '@mitojs/wx-mini'
import { vuePlugin } from '@mitojs/vue'
import Vue from 'vue'
const MitoInstance = init({
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100,
  // 配置上报时的请求头
  configReportWxRequest(data) {
    return {
      header: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      dataType: 'text'
    }
  },
  vue:Vue
},[vuePlugin])
```

更多关于`@mitojs/vue`的用法[点击这里](../vue/README.md)



## remax（react框架）

### 🛠️ 安装

```bash
pnpm add @mitojs/wx-mini @mitojs/react
```

更多关于`@mitojs/react`的用法[click here](../react/README.md)




## options

[基础配置项](../core/README.md)

### WxSilentOptionsType

|              Name              | Type      | Default    | Description                                                  |
| :----------------------------: | --------- | ---------- | ------------------------------------------------------------ |
|          `silentRequest`          | `boolean` | `false`    | 默认会监控微信小程序的wx.request（接口&下载），为true时，将不再监控                  |
|        `silentConsole`         | `boolean` | `false`    | 默认会监控微信小程序的wx.console，为true时，将不再监控，由于是重写了wx.console，所以原生的console会被覆盖，建议在测试环境设置成true，在生产环境设置成false |
|          `silentDom`           | `boolean` | `false`    | 默认会监控微信小程序的tab、touch事件，当用户touch的标签有id或者class，就会被b捕捉到放入breadcrumb，为true，将不在监听 |
| `silentRoute` | `boolean` | `false` | 默认会监控微信小程序App的路由跳转，为true时，将不在监控 |
|         `silentAppOnError`         | `boolean` | `false`    | 默认会监控微信小程序的error，为true时，将不在监控                        |
|   `silentAppOnUnhandledRejection`   | `boolean` | `false`    | 默认会监控微信小程序的unhandledrejection，为true时，将不在监控           |
|    `silentAppOnPageNotFound`    | `boolean` | `false`    | 默认会监控微信小程序的微信小程序App的onPageNotFound，为true时，将不在监控 |

### WxHookOptionsType
  ```js
  /**
   * 配置wx小程序上报时的wx.request配置
   *
   * @param {(TransportDataType | any)} event 即将上报的数据
   * @return {*}  {Partial<WechatMiniprogram.RequestOption>}
   * @memberof WxHookOptionsType
   */
  ```
### configReportWxRequest(event: TransportDataType | any): Partial<WechatMiniprogram.RequestOption>


**示例：**配置上报时的请求头的`content-type`
```js
MITO.init({
  ...
  configReportWxRequest(breadcrumb, hint){
  	return {
      header: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      dataType: 'text'
    }
  }
})
```



--------------



  ```js
  /**
   * 钩子函数：wx小程序的App下的onLaunch执行完后再执行以下hook
   *
   * @param {WechatMiniprogram.App.LaunchShowOption} options
   * @memberof WxHookOptionsType
   */
  ```
### appOnLaunch(options: WechatMiniprogram.App.LaunchShowOption): void


**示例：**在`App`的`onLaunch`中打印并输出入参`
```js
MITO.init({
  ...
  appOnLaunch(options){
  	console.log('mito appOnLaunch', options)
  }
})
```



----------



  ```js
  /**
   * 钩子函数：wx小程序的App下的OnShow执行完后再执行以下hook
   *
   * @param {WechatMiniprogram.App.LaunchShowOption} options
   * @memberof WxHookOptionsType
   */
  ```



### appOnShow(options: WechatMiniprogram.App.LaunchShowOption): void

  **示例：**在`App`的`onShow`中打印并输出入参`
```js
MITO.init({
  ...
  appOnShow(options){
  	console.log('mito appOnShow', options)
  }
})
```

--------



  ```js
  /**
   * 钩子函数：wx小程序的App下的OnHide执行完后再执行以下hook
   *
   * @memberof WxHookOptionsType
   */
  ```
### appOnHide(): void

**示例：**在`App`的`appOnHide`中打印`
```js
MITO.init({
  ...
  appOnHide(){
  	console.log('mito appOnHide', options)
  }
})
```

--------


  ```js
  /**
   * 钩子函数：先执行下的onPageNotFound执行完后再执行以下hook
   *
   * @param {WechatMiniprogram.OnPageNotFoundCallbackResult} data
   * @memberof WxHookOptionsType
   */
  ```
### appOnPageNotFound(data: WechatMiniprogram.OnPageNotFoundCallbackResult): void

**示例：**在`Page`的`appOnPageNotFound`中打印并输出入参`
```js
MITO.init({
  ...
  appOnPageNotFound(data){
  	console.log('mito appOnPageNotFound', data)
  }
})
```

-----------


  ```js
  /**
   * 钩子函数：先执行hook:pageOnLoad再执行wx小程序的Page下的pageOnLoad
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```
### pageOnLoad(page: IWxPageInstance): void

**示例：**在`Page`的`pageOnLoad`中打印并输出入参`
```js
MITO.init({
  ...
  pageOnLoad(page){
  	console.log('mito pageOnLoad', page)
  }
})
```

-----------

  ```js
  /**
   * 钩子函数：先执行hook:pageOnShow再执行wx小程序的Page下的onShow
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```
### pageOnShow(page: IWxPageInstance): void

**示例：**在`Page`的`pageOnShow`中打印并输出入参`
```js
MITO.init({
  ...
  pageOnShow(page){
  	console.log('mito pageOnShow', page)
  }
})
```

-----------

  ```js
  /**
   * 钩子函数：先执行hook:pageOnReady再执行wx小程序的Page下的pageOnReady
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```
### pageOnReady(page: IWxPageInstance): void

**示例：**在`Page`的`pageOnReady`中打印并输出入参`
```js
MITO.init({
  ...
  pageOnReady(page){
  	console.log('mito pageOnReady', page)
  }
})
```

-----------

  ```js
  /**
   *  钩子函数：先wx小程序的App下的pageOnUnload执行完后再执行以下hook
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```
### pageOnUnload(page: IWxPageInstance): void

**示例：**在`Page`的`pageOnUnload`中打印并输出入参`
```js
MITO.init({
  ...
  pageOnUnload(page){
  	console.log('mito pageOnUnload', page)
  }
})
```

-----------

  ```js
  /**
   * 钩子函数：先执行hook:pageOnHide再执行wx小程序的Page下的onHide
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```
### pageOnHide(page: IWxPageInstance): void

**示例：**在`Page`的`pageOnHide`中打印并输出入参`
```js
MITO.init({
  ...
  pageOnHide(page){
  	console.log('mito pageOnHide', page)
  }
})
```

-----------

  ```js
  /**
   * 先执行hook:onShareAppMessage再执行wx小程序的Page下的onShareAppMessage
   *
   * @param {(WechatMiniprogram.Page.IShareAppMessageOption & IWxPageInstance)} options
   * @memberof WxHookOptionsType
   */
  ```
### pageOnShareAppMessage(options: WechatMiniprogram.Page.IShareAppMessageOption & IWxPageInstance): void

**示例：**在`Page`的`pageOnShareAppMessage`中打印并输出入参`
```js
MITO.init({
  ...
  pageOnShareAppMessage(options){
  	console.log('mito pageOnShareAppMessage', options)
  }
})
```

-----------


  ```js
  /**
   * 先执行hook:onShareTimeline再执行wx小程序的Page下的onShareTimeline
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```
### pageOnShareTimeline(page: IWxPageInstance): void

**示例：**在`Page`的`pageOnShareTimeline`中打印并输出入参`
```js
MITO.init({
  ...
  pageOnShareTimeline(page){
  	console.log('mito pageOnShareTimeline', page)
  }
})
```

-----------

  ```js
  /**
   * 先执行hook:onTabItemTap再执行wx小程序的Page下的onTabItemTap
   *
   * @param {(WechatMiniprogram.Page.ITabItemTapOption & IWxPageInstance)} options
   * @memberof WxHookOptionsType
   */
  ```
### pageOnTabItemTap(options: WechatMiniprogram.Page.ITabItemTapOption & IWxPageInstance): void

**示例：**在`Page`的`pageOnTabItemTap`中打印并输出入参`
```js
MITO.init({
  ...
  pageOnTabItemTap(options){
  	console.log('mito pageOnTabItemTap', options)
  }
})
```

-----------


  ```js
  /**
   * 钩子函数：重写wx.NavigateToMiniProgram将里面的参数抛出来，便于在跳转时更改query和extraData
   *
   * @param {WechatMiniprogram.NavigateToMiniProgramOption} options
   * @return {*}  {WechatMiniprogram.NavigateToMiniProgramOption}
   * @memberof WxHookOptionsType
   */
  ```
### wxNavigateToMiniProgram(options: WechatMiniprogram.NavigateToMiniProgramOption): WechatMiniprogram.NavigateToMiniProgramOption


**示例：**在用`wxNavigateToMiniProgram`触发跳转小程序时，可以对传入的参数进行覆盖，如下面对query参数进行追加参数
```js
MITO.init({
  ...
  wxNavigateToMiniProgram(options){
    options.path = `${options.path}?time=${Date.now()}`
    return options
  }
})
```

-----------


  ```js
  /**
   * 钩子函数：代理Action中所有函数，拿到第一个参数并抛出
   *
   * 可用来判断e.type是否等于tap
   *
   * @param {WechatMiniprogram.BaseEvent} e 拿到事件e
   * @memberof WxHookOptionsType
   */
  ```
### triggerWxEvent(e: WechatMiniprogram.BaseEvent): void

**示例：**截取tap的回调函数，并输出`currentTarget`对象
```js
MITO.init({
  ...
  triggerWxEvent(e){
    // 当然也可以对touchmove等等事件做判断
    if (e.type === 'tap'){
      // 当前函数就是tap的回调函数，可拿到currentTarget的dataset，里面包含class、id等等属性
      console.log(e.currentTarget)
    }
  }
})
```
