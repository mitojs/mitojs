# [3.0.0](https://github.com/mitojs/mitojs/compare/2.1.19...3.0.0) (2021-10-08)


### Features
* add react [ErrorBoundary component](https://mitojs.github.io/mito-doc/#/sdk/guide/react#add-errorboundary)

* collect Vue3 prop data when code error [@mitojs/vue](https://mitojs.github.io/mito-doc/#/sdk/guide/vue#vue3x)

* multiple instances,more info  [click here](https://mitojs.github.io/mito-doc/#/sdk/guide/basic-configuration#multiple-instances)

* add wx-mini hooks:

  * pageOnLoad
  * pageOnUnload

* add wx-mini options:

  * silentRequest
  * silentRoute
  * silentAppOnError
  * silentAppOnUnhandledRejection
  * silentAppOnPageNotFound




### Documentation

* **docuemnt:** new [document](https://mitojs.github.io/mito-doc/#/) for mitojs

### BREAKING CHANGES

* **browser:** the singleton change to multiple instances,more info [click here](https://mitojs.github.io/mito-doc/#/sdk/guide/basic-configuration#multiple-instances)

* **remove MITO.log** and add [MitoInstance.log](https://mitojs.github.io/mito-doc/#/sdk/guide/basic-configuration#manual-reporting)

* **remove window.\_\_MITO\_\_** and replace to [MitoInstance](https://mitojs.github.io/mito-doc/#/sdk/guide/basic-configuration#multiple-instances)

* **ErrorTypes change:**
  JAVASCRIPT_ERROR change to JAVASCRIPT

  LOG_ERROR change to LOG

  HTTP_ERROR change to HTTP

  VUE_ERROR change to VUE

  REACT_ERROR change to REACT

  RESOURCE_ERROR change to RESOURCE

  PROMISE_ERROR change to PROMISE

  ROUTE_ERROR change to ROUTE



