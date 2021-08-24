<div align="center">
    <a href="#" target="_blank">
    <img src="https://i.loli.net/2021/07/28/EvPwd4NjVH3tBfO.jpg" alt="mito-logo" height="90">
    </a>
    <p>一款轻量级的收集页面的用户点击行为、路由跳转、接口报错、代码报错、并上报服务端的SDK</p>

[![npm version](https://img.shields.io/npm/v/@mitojs/web.svg?style=flat-square)](https://www.npmjs.com/package/@mitojs/web)
[![license](https://img.shields.io/github/license/mitojs/mitojs)](https://github.com/mitojs/mitojs/blob/dev/LICENSE)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GitHub last commit](https://img.shields.io/github/last-commit/mitojs/mitojs.svg?style=flat-square)](https://github.com/mitojs/mitojs/commits/master)
[![build status](https://img.shields.io/travis/mitojs/mitojs/master.svg?style=flat-square)](https://travis-ci.com/github/mitojs/mitojs)
[![codecov](https://codecov.io/gh/mitojs/mitojs/branch/master/graph/badge.svg?token=W7JP5GDOM7)](https://codecov.io/gh/mitojs/mitojs)

<!-- [![npm downloads](https://img.shields.io/npm/dm/@zyf2e/mitojs.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@zyf2e/mitojs) -->

</div>

## 功能

- [x] 🔨监听xhr、fetch请求
- [x] 🔨监听window.console
- [x] 🔨监听路由跳转
- [x] 🔨监控代码报错、资源加载错误
- [x] 🔨监听click、wx:tab、touchmove事件
- [x] 🔨自定义上报错误
- [x] 🚀丰富的hooks与配置项支持可高定制化
- [x] 🌝支持IE8和安卓5以上
- [x] 👌持续迭代与更新
- [x] 👌完善的浏览器e2e和微信小程序e2e、完善的单元测试（77%~coding）
- [x] 👌支持原生Web [@mitojs/browser](https://github.com/mitojs/mitojs/tree/master/packages/browser)
- [x] 👌支持Web框架（Vue3、Vue2、React@Next） [@mitojs/web](https://github.com/mitojs/mitojs/tree/master/packages/web)
- [x] 👌支持原生微信小程序、支持uni-app等微信小程序框架 [@mitojs/wx-mini](https://github.com/mitojs/mitojs/tree/master/packages/wx-mini)

## 安装

### web

#### 使用npm

```bash
$ npm i @mitojs/web
```

### 使用yarn

```bash
$ yarn add @mitojs/web
```

#### 使用CDN

```javascript
<script src="https://cdn.jsdelivr.net/npm/@mitojs/web/dist/web.min.js"></script>
```

### wx-mini

#### 使用npm

```bash
$ npm i @mitojs/wx-mini
```

### 使用yarn

```bash
$ yarn add @mitojs/wx-mini
```

#### 使用CDN

```javascript
<script src="https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js"></script>
```

## SDK在线试用Demo
[react-sdk-demo](https://mitojs.github.io/react-sdk-demo)

[vue2-sdk-demo](https://mitojs.github.io/vue2-sdk-demo)

![react-sdk-demo](https://tva1.sinaimg.cn/large/008i3skNly1gtr0cdzowzg31fy0u0q4z.gif)

## 使用指南

[使用指南](https://github.com/mitojs/mitojs/blob/master/docs/guide.md)

* [vue接入指南](https://github.com/mitojs/mitojs/blob/master/docs/guide.md#Vue)
* [react接入指南](https://github.com/mitojs/mitojs/blob/master/docs/guide.md#react)
* [wx-mini接入指南](https://github.com/mitojs/mitojs/blob/master/docs/guide.md#微信小程序)
* [wx-mini-performance接入指南](https://github.com/mitojs/mitojs/blob/master/docs/wx-mini-performance.md)

## hooks与配置项

[hooks与配置项](https://github.com/mitojs/mitojs/blob/master/docs/option.md)




## 收集信息平台展示

**该SDK能收集哪些信息：下面这些例子给你一一展示：**

![react-example](https://tva1.sinaimg.cn/large/008eGmZEly1gmxggqptzwg30u00hoe84.gif)

[vue-demo](https://mitojs.github.io/mito-admin-demo/#/errors/1/info)

[react-demo](https://mitojs.github.io/mito-admin-demo/#/errors/2/info)

[js-demo](https://mitojs.github.io/mito-admin-demo/#/errors/3/info)

[wx-mini-demo](https://mitojs.github.io/mito-admin-demo/#/errors/4/info)

## issue

欢迎所有人提`issue`，如果有什么好的建议和问题可以直接联系本人微信（备注mitojs）：

<img src="https://tva1.sinaimg.cn/large/008eGmZEly1gmtfid3hrfj30kw0r2wfk.jpg" width="240px" />

## 联系我
* 微信：cjinhuo
* 邮箱：cjinhuo@qq.com
* 字节可内推：
1. [杭州岗位](https://jobs.bytedance.com/experienced/position?keywords=%E5%89%8D%E7%AB%AF&category=6704215862603155720%2C6704215862557018372%2C6704215886108035339%2C6704215888985327886%2C6704215897130666254%2C6704215956018694411%2C6704215957146962184%2C6704215958816295181%2C6704215963966900491%2C6704216109274368264%2C6704216296701036811%2C6704216635923761412%2C6704217321877014787%2C6704219452277262596%2C6704219534724696331%2C6938376045242353957&location=CT_52&project=&type=&job_hot_flag=&current=1&limit=10)（web infra、平台架构、电商、商业变现等等）
2. [上海岗位](https://jobs.bytedance.com/experienced/position?keywords=%E5%89%8D%E7%AB%AF&category=6704215862603155720%2C6704215862557018372%2C6704215886108035339%2C6704215888985327886%2C6704215897130666254%2C6704215956018694411%2C6704215957146962184%2C6704215958816295181%2C6704215963966900491%2C6704216109274368264%2C6704216296701036811%2C6704216635923761412%2C6704217321877014787%2C6704219452277262596%2C6704219534724696331%2C6938376045242353957&location=CT_125&project=&type=&job_hot_flag=&current=1&limit=10)（web infra、平台架构、电商、商业变现等等）



