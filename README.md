<div align="center">
    <a href="#" target="_blank">
    <img src="https://i.loli.net/2021/07/28/EvPwd4NjVH3tBfO.jpg" alt="mito-logo" height="90">
    </a>
    <p>A Lightweight SDK For Monitor Web</p>

[![npm version](https://img.shields.io/npm/v/@mitojs/web.svg?style=flat)](https://www.npmjs.com/package/@mitojs/web)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![GitHub last commit](https://img.shields.io/github/last-commit/mitojs/mitojs.svg?style=flat)](https://github.com/mitojs/mitojs/commits/master)
[![build status](https://img.shields.io/travis/mitojs/mitojs/master.svg?style=flat)](https://travis-ci.com/github/mitojs/mitojs)
[![codecov](https://codecov.io/gh/mitojs/mitojs/branch/master/graph/badge.svg?token=W7JP5GDOM7)](https://codecov.io/gh/mitojs/mitojs)
[![npm downloads](https://img.shields.io/npm/dm/@mitojs/core.svg?style=flat)](http://npm-stat.com/charts.html?package=@mitojs/browser)
[![license](https://img.shields.io/github/license/mitojs/mitojs?style=flat)](https://github.com/mitojs/mitojs/blob/dev/LICENSE)

</div>

[中文文档](./README.zh_CN.md)


## 👋 Features

✔️ 🔨 monitor Xhr、Fetch、wx.request

✔️ 🔨 monitor console、wx.console

✔️ 🔨 monitor route change(hashroute、browser route、wx route)

✔️ 🔨 monitor code error、resource load error

✔️ 🔨 monitor click、wx:tab、wx:touchmove

✔️ 👌 rich hooks and options [configuration doc](https://mitojs.github.io/mito-doc/#/sdk/guide/basic-configuration)

✔️ 👌 support web(>= IE8)[@mitojs/browser](https://mitojs.github.io/mito-doc/#/sdk/guide/browser)

✔️ 👌 support framework with Vue3、Vue2.6[@mitojs/vue](https://mitojs.github.io/mito-doc/#/sdk/guide/vue)、React@latest[@mitojs/react](https://mitojs.github.io/mito-doc/#/sdk/guide/react)

✔️ 👌 support native wxmini、uni-app、remax framework etc [@mitojs/wx-mini](https://mitojs.github.io/mito-doc/#/sdk/guide/wx-mini)

## 😎 Get Started

here is [document](https://mitojs.github.io/mito-doc/#/sdk/guide/introduction).Build your first demo in 2 min or less:

### browser
#### 🛠️ Install
```bash
# using npm
npm i @mitojs/browser
# using yarn
yarn add @mitojs/browser
```

#### 🥳 Usage
```typescript
import { init } from '@mitojs/browser'

const MitoInstance = init({
  // set debug true to convenient debugger in dev,set false in prod
  debug:true,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})
```

more usage info of `@mitojs/browser` [click here](https://mitojs.github.io/mito-doc/#/sdk/guide/browser)


## 🧐 Demo for SDK

**here are some demo for sdk of collecting data**

[react-sdk-demo](https://mitojs.github.io/react-sdk-demo):Use @mitojs/react  in react@next

[vue3-sdk-demo](https://mitojs.github.io/vue3-sdk-demo):Use @mitojs/vue in Vue3.x

<!-- ![mito-在线demo](https://tva1.sinaimg.cn/large/008eGmZEly1gmxgn4y1sag315g0m2hdt.gif)： -->

## 📞 issue&&contact
### issue
welcome to raise issue, you can contact me on wx or email if you have some good suggestion(notes: mitojs)
### Contact
* wx：cjinhuo

  <img src="https://tva1.sinaimg.cn/large/008i3skNly1guqs71uy5pj60u50u0ju802.jpg" width="200" height="200"></img>

* send resume to email：chenjinhuo@bytedance.com
* bytedance introduce：(Hanghou、Beijing、Shanghai、Shenzhen、Guangzhou)
1. [hangzhou-jobs](https://jobs.bytedance.com/experienced/position?keywords=%E5%89%8D%E7%AB%AF&category=6704215862603155720%2C6704215862557018372%2C6704215886108035339%2C6704215888985327886%2C6704215897130666254%2C6704215956018694411%2C6704215957146962184%2C6704215958816295181%2C6704215963966900491%2C6704216109274368264%2C6704216296701036811%2C6704216635923761412%2C6704217321877014787%2C6704219452277262596%2C6704219534724696331%2C6938376045242353957&location=CT_52&project=&type=&job_hot_flag=&current=1&limit=10)（web infrastructure、platform architecture etc.）

