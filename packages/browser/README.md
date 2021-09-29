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
  // set debug true to convenient debugger in dev,set false in prod
  debug:true,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})
```

more info of [@mitojs/browser](https://mitojs.github.io/mito-doc/#/sdk/guide/browser)

