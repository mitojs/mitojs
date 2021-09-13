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

## Usage

### Vue2.X

```typescript
// main.js
import Vue from 'vue'
import { init } from '@mitojs/vue'

// multiple instances
const MitoInstance = init({
  vue: Vue,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})

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
you can call `log` in anywhere with mito instance

```js
MitoInstance.log({
  message: 'some msg',
  tag: 'your tag',
})
```



