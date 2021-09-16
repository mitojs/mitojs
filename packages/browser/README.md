# @mitojs/browser

## Install

### Using npm
```bash
$ npm i @mitojs/browser
```

### Using yarn

```bash
$ yarn add @mitojs/browser
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

### use log
you can call `log` function in anywhere with mito instance

```js
MitoInstance.log({
  message: 'some msg',
  tag: 'your tag',
})
```

## Using With CDN
**index.html**

```html
<header>
  <script src="https://cdn.jsdelivr.net/npm/@mitojs/browser/dist/browser.min.js"></script>
  <script>
    MITO.init({
      dsn: 'http://test.com/yourServer',
    });
  </script>
</header>
```
