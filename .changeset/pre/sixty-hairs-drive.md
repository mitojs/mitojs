---
"@mitojs/browser": patch
"@mitojs/core": patch
---

fix: bind plugin callback types to the installing client under strict TypeScript
fix: 在严格 TypeScript 模式下将插件回调类型绑定到实际安装客户端

fix: accept Vue 3 and browser plugins in init and client.use while rejecting incompatible client requirements
fix: 允许 init 和 client.use 直接接入 Vue 3 及浏览器插件，同时拒绝不兼容的客户端要求
