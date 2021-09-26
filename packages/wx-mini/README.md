# @mitojs/wx-mini

## 🛠️ 安装

```bash
# 使用Npm
npm i @mitojs/wx-mini
# 使用Yarn
yarn add @mitojs/wx-mini
```

### 🥳 使用
```typescript
// main.js
import { init } from '@mitojs/wx-mini'

// 多实例
const MitoInstance = init({
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100,
})
```



# 📁 使用本地文件

如果你是原生微信小程序的开发者，建议将这个url:[https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js](https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js)，下载下来作为一个js文件。然后导入到`app.js`，就像下面这样：
![wx-mini-local-file](https://tva1.sinaimg.cn/large/008i3skNly1gupnrax29kj612z0u0dik02.jpg)



## uni-app（Vue框架）

支持所有vue框架，例如uni-app等等

### 🛠️ 安装
```bash
npm i @mitojs/wx-mini @mitojs/vue
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
npm i @mitojs/wx-mini @mitojs/react
```

更多关于`@mitojs/react`的用法[click here](../react/README.md)




## options

[基础配置项]()

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


**示例：**在App的onLaunch中打印并输出入参`
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

  **示例：**在App的onShow中打印并输出入参`
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
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```
### appOnHide(page: IWxPageInstance): void
  ```js
  /**
   * 钩子函数：wx小程序的App下的onPageNotFound执行完后再执行以下hook
   *
   * @param {WechatMiniprogram.OnPageNotFoundCallbackResult} data
   * @memberof WxHookOptionsType
   */
  ```
### onPageNotFound(data: WechatMiniprogram.OnPageNotFoundCallbackResult): void
  ```js
  /**
   * 钩子函数：先执行hook:pageOnLoad再执行wx小程序的Page下的onShow
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```
### pageOnLoad(page: IWxPageInstance): void
  ```js
  /**
   * 钩子函数：先执行hook:pageOnShow再执行wx小程序的Page下的onShow
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```
### pageOnShow(page: IWxPageInstance): void
  ```js
  /**
   * 钩子函数：先执行hook:pageOnReady再执行wx小程序的Page下的onShow
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```
### pageOnReady(page: IWxPageInstance): void
  ```js
  /**
   *  钩子函数：先wx小程序的App下的pageOnUnload执行完后再执行以下hook
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```
### pageOnUnload(page: IWxPageInstance): void
  ```js
  /**
   * 钩子函数：先执行hook:pageOnHide再执行wx小程序的Page下的onHide
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```
### pageOnHide(page: IWxPageInstance): void
  ```js
  /**
   * 先执行hook:onShareAppMessage再执行wx小程序的Page下的onShareAppMessage
   *
   * @param {(WechatMiniprogram.Page.IShareAppMessageOption & IWxPageInstance)} options
   * @memberof WxHookOptionsType
   */
  ```
### onShareAppMessage(options: WechatMiniprogram.Page.IShareAppMessageOption & IWxPageInstance): void
  ```js
  /**
   * 先执行hook:onShareTimeline再执行wx小程序的Page下的onShareTimeline
   *
   * @param {IWxPageInstance} page
   * @memberof WxHookOptionsType
   */
  ```
### onShareTimeline(page: IWxPageInstance): void
  ```js
  /**
   * 先执行hook:onTabItemTap再执行wx小程序的Page下的onTabItemTap
   *
   * @param {(WechatMiniprogram.Page.ITabItemTapOption & IWxPageInstance)} options
   * @memberof WxHookOptionsType
   */
  ```
### onTabItemTap(options: WechatMiniprogram.Page.ITabItemTapOption & IWxPageInstance): void
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
  ```js
  /**
   * 钩子函数：代理Action中所有函数，拿到第一个参数并抛出
   *
   * 可用来判断e.target.type是否等于tap
   *
   * @param {WechatMiniprogram.BaseEvent} e 拿到事件e
   * @memberof WxHookOptionsType
   */
  ```
### triggerWxEvent(e: WechatMiniprogram.BaseEvent): void

