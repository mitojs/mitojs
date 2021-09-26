# @mitojs/browser



## Install

```bash
# using npm
npm i @mitojs/browser
# using yarn
yarn add @mitojs/browser
```


### usage

```typescript
// some.js
import { init } from '@mitojs/browser'

// multiple instances
const MitoInstance = init({
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})
```



## Using With CDN
**index.html**

```html
<header>
  <script src="https://cdn.jsdelivr.net/npm/@mitojs/browser/dist/browser.min.js"></script>
  <script>
    const MitoInstance = MITO.init({
      dsn: 'http://test.com/yourServer',
    });
  </script>
</header>
```


## opitons

### BrowserOptionsFieldsTypes

|              Name              | Type      | Default    | Description                                                  |
| :----------------------------: | --------- | ---------- | ------------------------------------------------------------ |
| `useImgUpload` | `boolean` | `false` | 为true时，则使用img上报的方式，会在dsn后面追加data=encodeURIComponent(reportData)，在服务端接受时需要decodeURIComponent，默认为false。（小程序只能用wx.request上报的方式，也就是xhr，而且走img请求的话，url是有字符长度限制的，所以推荐走xhr） |
|          `silentXhr`           | `boolean` | `false`    | 默认会监控xhr，为true时，将不再监控                          |
|         `silentFetch`          | `boolean` | `false`    | 默认会监控fetch，为true时，将不再监控                        |
|        `silentConsole`         | `boolean` | `false`    | 默认会监控console，为true时，将不再监控                      |
|          `silentDom`           | `boolean` | `false`    | 默认会监听click事件，当用户点击的标签不是body时就会被放入breadcrumb，为true，将不在监听 |
|        `silentHistory`         | `boolean` | `false`    | 默认会监控popstate、pushState、replaceState，为true时，将不再监控 |
|         `silentError`          | `boolean` | `false`    | 默认会监控error，为true时，将不在监控                        |
|   `silentUnhandledrejection`   | `boolean` | `false`    | 默认会监控unhandledrejection，为true时，将不在监控           |
|       `silentHashchange`       | `boolean` | `false`    | 默认会监控hashchange，为true时，将不在监控                   |


### BrowserOptionsHooksType

```js
  /**
   * 钩子函数，配置发送到服务端的xhr
   * 可以对当前xhr实例做一些配置：xhr.setRequestHeader()、xhr.withCredentials
   *
   * @param {XMLHttpRequest} xhr XMLHttpRequest的实例
   * @param {*} reportData 上报的数据
   * @memberof BrowserOptionsHooksType
   */
```
### configReportXhr?(xhr: XMLHttpRequest, reportData: any): void

**示例：**设置上报时的请求头为

