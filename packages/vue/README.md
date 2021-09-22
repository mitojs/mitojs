# @mitojs/vue

## Install

### Using npm
```bash
npm i @mitojs/vue
```

### Using yarn

```bash
yarn add @mitojs/vue
```

### Vue2.X

```typescript
// main.js
import Vue from 'vue'
import { init } from '@mitojs/browser'
import { vuePlugin } from '@mitojs/vue'

// multiple instances
const MitoInstance = init({
  vue: Vue,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
},[vuePlugin])

```

### Vue3.x
```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { init } from '@mitojs/vue'

const vue = createApp(App)
const MitoInstance = init({
  vue: Vue,
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

### Vue2.x

**main.js**

```js
import Vue from 'vue'
// mount Vue on the Window
window.Vue = Vue
```

**index.html**

```html
<header>
  <script src="https://cdn.jsdelivr.net/npm/@mitojs/vue/dist/vue.min.js"></script>
  <script>
    MITO.init({
      dsn: 'http://test.com/yourServer',
      vue:window.Vue
    });
  </script>
</header>
```

### Vue3.x

**main.ts**

```js
import {createApp} from 'vue';
import App from './App.vue';
const app = createApp(App);
window.Vue = app
app.mount('#app');
```

**index.html**

```html
<header>
  <script src="https://cdn.jsdelivr.net/npm/@mitojs/vue/dist/vue.min.js"></script>
  <script>
    MITO.init({
      dsn: 'http://test.com/yourServer',
      vue:window.Vue
    });
  </script>
</header>
```

