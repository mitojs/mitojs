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

### use log
you can call `log` function in anywhere with mito instance

```js
interface LogTypes {
  message?: string | number | Object
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

### log
Sometime we need to report business information or track information in business code,then we can use `MitoInstance.log`.The following example is that report abnormal information if the http interface is abnoraml
```js
$api.getPayStatus().then(res => {
  if (res.success) {
    // http status normal
  } else {
    // abnormal report information
    MitoInstance.log({
      // error message
      message: res.errMsg,
      // optional,can understand as category
      tag: 'payPage'
      // optional,default is Severity.Critical
      // level: '',
      // optional,Error Object
      // ex: ''
    })
  }
})
```

It's also can statistical PV and UV of uses of each function.Such as the following example is track in ActivePage function,UV statistics need to rely on `trackerId`[trackerId configuration](https://github.com/mitojs/mitojs/blob/master/docs/option.md#backtrackerid)
```js
/**
 * react hook component:ActivePage
 */
function ActivePage() {
  useEffect(() => {
    MitoInstance.log({
      // optional
      tag: 'ActivePage'
    })
  }, [])
  return <div>This Is ActivePage</div>
}
```


### generate errorId
errorId source code [click here](https://github.com/mitojs/mitojs/blob/master/packages/utils/src/errorId.ts)

It's generated according to the passed `tag` key,so will generate the same errorId when passed the same `tag` plus different `message`.Such as the follow:

```js
MitoInstance.log({
  message: 'test_1',
  tag: 'ActivePageStatistics'
})
```

```js
MitoInstance.log({
  message: 'test_2',
  tag: 'ActivePageStatistics'
})
```
The two example will generated the same errorId.But if the `tag` key changed,it will be different
