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
  maxBreadcrumbs: 100,
  vue:Vue
},[vuePlugin])
```


更多关于`@mitojs/vue`的用法[点击这里](../vue/README.md)

## remax
```bash
npm i @mitojs/wx-mini @mitojs/react
```


更多关于`@mitojs/react`的用法[click here](../react/README.md)

