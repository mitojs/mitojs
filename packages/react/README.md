# @mitojs/react

## install

### yarn

``` bash
$ yarn add @mitojs/react
```

### npm

``` bash
$ npm install @mitojs/react
```

## usage


```js
import React from 'react'
import * as Mito from '@mitojs/react'

/**
 * the 'RootComponent' will report to Slardar after crash
 * the 'OtherComponent' will report to window.Slardar after crash
 */
const APP: React.FC = () => {
  return (
    <Provider Slardar={Slardar}>
      <RootComponent />
      // 多实例
      <Provider>
        <OtherComponent />
      </Provider>
    </Provider>
  )
}
```
