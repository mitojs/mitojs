---
"@mitojs/browser": patch
"@mitojs/core": patch
---

Bind plugin callbacks to the client that installs them so Vue 3 and browser plugins can be passed directly to init and client.use under strict TypeScript, while rejecting plugins that require a more specific client.
