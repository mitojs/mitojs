<div align="center">
    <a href="#" target="_blank">
    <img src="https://i.loli.net/2021/07/28/EvPwd4NjVH3tBfO.jpg" alt="mito-logo" height="90">
    </a>
    <p>A Lite SDK For Monitor Web</p>

[![npm version](https://img.shields.io/npm/v/@mitojs/web.svg?style=flat)](https://www.npmjs.com/package/@mitojs/web)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![GitHub last commit](https://img.shields.io/github/last-commit/mitojs/mitojs.svg?style=flat)](https://github.com/mitojs/mitojs/commits/master)
[![build status](https://img.shields.io/travis/mitojs/mitojs/master.svg?style=flat)](https://travis-ci.com/github/mitojs/mitojs)
[![codecov](https://codecov.io/gh/mitojs/mitojs/branch/master/graph/badge.svg?token=W7JP5GDOM7)](https://codecov.io/gh/mitojs/mitojs)
[![npm downloads](https://img.shields.io/npm/dm/@mitojs/core.svg?style=flat)](http://npm-stat.com/charts.html?package=@mitojs/browser)
[![license](https://img.shields.io/github/license/mitojs/mitojs?style=flat)](https://github.com/mitojs/mitojs/blob/dev/LICENSE)

</div>

[中文文档](./README.zh_CN.md)


## Features

- [x] 🔨monitor  Xhr、Fetch
- [x] 🔨monitor console
- [x] 🔨monitor route change(hashroute、browser route)
- [x] 🔨monitor code error、resource load error
- [x] 🔨monitor click、wx:tab、wx:touchmove
- [x] 🔨custom report in hooks
- [x] 🚀rich hooks and options
- [x] 👌perfect test for unit test、web e2e、wxmini e2e
- [x] 👌support web（>= IE8） [@mitojs/browser](https://github.com/mitojs/mitojs/tree/master/packages/browser)
- [x] 👌support framework with Vue3、Vue2.6、React@latest[@mitojs/web](https://github.com/mitojs/mitojs/tree/master/packages/web)
- [x] 👌support native wxmini、uni-app framework etc [@mitojs/wx-mini](https://github.com/mitojs/mitojs/tree/master/packages/wx-mini)
- [x] 👌keep iterating(oncall)

## Install

### browser
```bash
# using npm
npm i @mitojs/browser
# using yarn
yarn add @mitojs/browser
```
go to [browser usage manual](./packages/browser/README.md)
### react
```bash
# using npm
npm i @mitojs/react
# using yarn
yarn add @mitojs/react
```
go to [react usage manual](./packages/react/README.md)

### vue
```bash
# using npm
npm i @mitojs/vue
# using yarn
yarn add @mitojs/vue
```
go to [vue usage manual](./packages/vue/README.md)


### wx-mini
```bash
# using npm
npm i @mitojs/wx-mini
# using yarn
yarn add @mitojs/wx-mini
```
go to [wx-mini usage manual](./packages/wx-mini/README.md)


## hooks&&options
```js
import {init} from '@mitojs/browser'
init({
  //options and hooks
})
```

hooks and options be found [here](./docs/option.md)

## Demo for SDK

**here are some demo for sdk of collecting data**

[react-sdk-demo](https://mitojs.github.io/react-sdk-demo):Use @mitojs/react  in react@next

[vue3-sdk-demo](https://mitojs.github.io/vue3-sdk-demo):Use @mitojs/vue in Vue3.x

[vue2-sdk-demo](https://mitojs.github.io/vue2-sdk-demo):Use @mitojs/vue in Vue2.x

<!-- ![mito-在线demo](https://tva1.sinaimg.cn/large/008eGmZEly1gmxgn4y1sag315g0m2hdt.gif)： -->

## monitoring platform

**here are some examples for sdk of reporting to admin(there is mock data)**

<!-- ![react-example](https://tva1.sinaimg.cn/large/008eGmZEly1gmxggqptzwg30u00hoe84.gif) -->

[vue-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/1/info): show a HTTP_ERROR in vue platform

[react-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/2/info): show a JAVASCRIPT_ERROR in react platform

[js-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/3/info):show JAVASCRIPT_ERROR in js platform

[wx-mini-admin-demo](https://mitojs.github.io/mito-admin-demo/#/errors/4/info):show JAVASCRIPT_ERROR in wx-mini platform

## issue&&contact
### issue
welcome to raise issue, you can contact me on wx or email if you have some good advice(notes: mitojs)
### Contact
* wx：cjinhuo
* email：cjinhuo@qq.com
* bytedance introduce：(Hanghou、Beijing、Shanghai、Shenzhen、Guangzhou)
1. [hangzhou-jobs](https://jobs.bytedance.com/experienced/position?keywords=%E5%89%8D%E7%AB%AF&category=6704215862603155720%2C6704215862557018372%2C6704215886108035339%2C6704215888985327886%2C6704215897130666254%2C6704215956018694411%2C6704215957146962184%2C6704215958816295181%2C6704215963966900491%2C6704216109274368264%2C6704216296701036811%2C6704216635923761412%2C6704217321877014787%2C6704219452277262596%2C6704219534724696331%2C6938376045242353957&location=CT_52&project=&type=&job_hot_flag=&current=1&limit=10)（web infrastructure、platform architecture etc.）

