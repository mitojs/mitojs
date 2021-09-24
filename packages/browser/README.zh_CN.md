# @mitojs/browser

## Install

### Using npm
```bash
npm i @mitojs/browser
```

### Using yarn

```bash
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

### use log
you can call `log` function in anywhere with mito instance

```js
interface LogTypes {
  message: string | number | Object
  tag?: string;
  level?: Severity;
  ex?: any;
}
MitoInstance.log(LogTypes)
```

```js
MitoInstance.log({
  message: 'some msg',
  tag: 'your tag',
})
```

### MITO.log
有时我们需要在某个业务代码中上报业务信息或者是埋点信息，这时可以用到`MITO.log`手动上报，下面这个例子就是在获取支付状态的接口是否异常，如果异常就上报异常信息。
```js
import * as MITO from '@mitojs/web'

$api.getPayStatus().then(res => {
  if (res.success) {
    // 支付正常
  } else {
    // 支付异常 上报异常信息
    MITO.log({
      // 错误信息
      message: res.errMsg,
      // 标签 可以理解为种类
      tag: '支付页面'
      // 错误等级：可选，默认最高等级
      // level: '',
      // 错误信息 Error对象
      // ex: ''
    })
  }
})
```
还可以统计每个功能的浏览次数（PV）、用户量（UV），比如下面代码中在活动页埋点，UV的统计需要依赖`trackerId`，[trackerId详细配置](https://github.com/mitojs/mitojs/blob/master/docs/option.md#backtrackerid)
```js
import * as MITO from '@mitojs/web'

/**
 * react hook 活动页
 */
function ActivePage() {
  useEffect(() => {
    //可统计PV、UV
    MITO.log({
      // 可选
      // message: '统计',
      // 可选
      tag: '活动页统计'
    })
  }, [])
  return <div>这是活动页</div>
}
```
**生成errorId规则**
主要是根据传入的`tag`来生成的，所以相同的`tag`加上不同的`message`生成相同的`errorId`，比如:
```js
MITO.log({
  // 可选
  message: '这是测试1',
  // 可选
  tag: '活动页统计'
})
```

```js
MITO.log({
  // 可选
  message: '这是测试2',
  // 可选
  tag: '活动页统计'
})
```
上面两个`errorId`是相同的，但只要`tag`变一下两个`errorId`就不一样了


<!-- ###  -->


