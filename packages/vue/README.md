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

### Usage

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
// main.js
import { init } from '@mitojs/vue'
const MitoInstance = init({
  vue: Vue,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})
```

