# @mitojs/wx-mini

## 安装

### 使用Npm
```bash
npm i @mitojs/wx-mini
```

### 使用Yarn

```bash
yarn add @mitojs/wx-mini
```

### 使用方法
```typescript
// main.js
import { init } from '@mitojs/wx-mini'

// 多实例
const MitoInstance = init({
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100,
})
```

### 使用手动上报
你可以在任何地方用`mito`的实例调用`log`

```js
MitoInstance.log({
  message: 'some msg',
  tag: 'your tag',
})
```

### 使用本地文件
如果你是原生微信小程序的开发者，建议将这个url:[https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js](https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js)，下载下来作为一个js文件。然后导入到`app.js`，就像下面这样：
![wx-mini-local-file](https://tva1.sinaimg.cn/large/008i3skNly1gupnrax29kj612z0u0dik02.jpg)



## uni-app
### 安装
```bash
npm i @mitojs/wx-mini @mitojs/vue
```

```typescript
import { init } from '@mitojs/wx-mini'
import { vuePlugin } from '@mitojs/vue'
import Vue from 'vue'
const MitoInstance = init({
  dsn: 'https://test.com/yourInterface',
  // 
  maxBreadcrumbs: 100,
  // 配置上报时的请求头
  configReportWxRequest(data) {
    header: {
         'Content-Type': 'application/json; charset=UTF-8'
      }
  },
  vue:Vue
},[vuePlugin])
```


更多关于`@mitojs/vue`的用法[点击这里](../vue/README.md)

## remax
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
|        `silentConsole`         | `boolean` | `false`    | 默认会监控微信小程序的wx.console，为true时，将不再监控                   |
|          `silentDom`           | `boolean` | `false`    | 默认会监控微信小程序的tab、touch事件，当用户touch的标签有id或者class，就会被b捕捉到放入breadcrumb，为true，将不在监听 |
| `silentRoute` | `boolean` | `false` | 默认会监控微信小程序App的路由跳转，为true时，将不在监控 |
|         `silentAppOnError`         | `boolean` | `false`    | 默认会监控微信小程序的error，为true时，将不在监控                        |
|   `silentAppOnUnhandledRejection`   | `boolean` | `false`    | 默认会监控微信小程序的unhandledrejection，为true时，将不在监控           |
|    `silentAppOnPageNotFound`    | `boolean` | `false`    | 默认会监控微信小程序的微信小程序App的onPageNotFound，为true时，将不在监控 |

### WxHookOptionsType

```typescript
  /**
   * wx小程序上报时的wx.request配置
   */
  configReportWxRequest?(event: TransportDataType | any): Partial<WechatMiniprogram.RequestOption>
  /**
   * wx小程序的App下的onLaunch执行完后再执行以下hook
   */
  appOnLaunch?(options: WechatMiniprogram.App.LaunchShowOption): void
  /**
   * wx小程序的App下的OnShow执行完后再执行以下hook
   */
  appOnShow?(options: WechatMiniprogram.App.LaunchShowOption): void
  /**
   * wx小程序的App下的OnHide执行完后再执行以下hook
   */
  appOnHide?(page: IWxPageInstance): void
  /**
   * wx小程序的App下的onPageNotFound执行完后再执行以下hook
   */
  onPageNotFound?(data: WechatMiniprogram.OnPageNotFoundCallbackResult): void
  /**
   * 先执行hook:pageOnLoad再执行wx小程序的Page下的onShow
   */
  pageOnLoad?(page: IWxPageInstance): void
  /**
   * 先执行hook:pageOnShow再执行wx小程序的Page下的onShow
   */
  pageOnShow?(page: IWxPageInstance): void
  /**
   * 先执行hook:pageOnShow再执行wx小程序的Page下的onShow
   */
  pageOnReady?(page: IWxPageInstance): void
  /**
   * wx小程序的App下的pageOnUnload执行完后再执行以下hook
   */
  pageOnUnload?(page: IWxPageInstance): void
  /**
   * 先执行hook:pageOnHide再执行wx小程序的Page下的onHide
   */
  pageOnHide?(page: IWxPageInstance): void
  /**
   * 先执行hook:onShareAppMessage再执行wx小程序的Page下的onShareAppMessage
   */
  onShareAppMessage?(options: WechatMiniprogram.Page.IShareAppMessageOption & IWxPageInstance): void
  /**
   * 先执行hook:onShareTimeline再执行wx小程序的Page下的onShareTimeline
   */
  onShareTimeline?(page: IWxPageInstance): void
  /**
   * 先执行hook:onTabItemTap再执行wx小程序的Page下的onTabItemTap
   */
  onTabItemTap?(options: WechatMiniprogram.Page.ITabItemTapOption & IWxPageInstance): void
  /**
   * 重写wx.NavigateToMiniProgram将里面的参数抛出来，便于在跳转时更改query和extraData
   * @param options
   */
  wxNavigateToMiniProgram?(options: WechatMiniprogram.NavigateToMiniProgramOption): WechatMiniprogram.NavigateToMiniProgramOption
  /**
   * 代理Action中所有函数，拿到第一个参数并抛出成hook
   * @param e
   */
  triggerWxEvent?(e: WechatMiniprogram.BaseEvent): void	
```

