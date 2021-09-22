[中文文档](./README.zh_CN.md)

# @mitojs/wx-mini

## Install

### Using Npm
```bash
npm i @mitojs/wx-mini
```

### Using yarn

```bash
yarn add @mitojs/wx-mini
```

### usage
```typescript
// main.js
import { init } from '@mitojs/wx-mini'

// multiple instances
const MitoInstance = init({
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100,
})
```

### use log
you can call `log` function in anywhere with mito instance

```js
MitoInstance.log({
  message: 'some msg',
  tag: 'your tag',
})
```

### Using with local file
If you are developing a native WeChat miniprogram，it's recommended to download this url:(https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js)[https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js] as to a JS file.And import to app.js.Just like this:

![wx-mini-local-file](https://tva1.sinaimg.cn/large/008i3skNly1gupnrax29kj612z0u0dik02.jpg)



## uni-app
### install
```bash
npm i @mitojs/wx-mini @mitojs/vue
```

```typescript
import { init } from '@mitojs/wx-mini'
import { vuePlugin } from '@mitojs/vue'
import Vue from 'vue'
const MitoInstance = init({
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100,
  vue:Vue
},[vuePlugin])
```


more usage info of @mitojs/vue [click here](../vue/README.md)

## remax
```bash
npm i @mitojs/wx-mini @mitojs/react
```


more usage of @mitojs/react [click here](../react/README.md)

## options

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

