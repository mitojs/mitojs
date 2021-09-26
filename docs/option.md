## options

### options.property

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



### options.hook
