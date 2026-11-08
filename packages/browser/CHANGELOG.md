# @mitojs/browser

## 4.0.0-beta.1

### Patch Changes

- 0d55943: Bind plugin callbacks to the client that installs them so Vue 3 and browser plugins can be passed directly to init and client.use under strict TypeScript, while rejecting plugins that require a more specific client.
- Updated dependencies [0d55943]
  - @mitojs/core@4.0.0-beta.1
  - @mitojs/types@4.0.0-beta.1
  - @mitojs/utils@4.0.0-beta.1

## 4.0.0-beta.0

### Major Changes

- aad5dea: Require an ES2015 (ES6) runtime for all SDK packages and remove ES5/Internet Explorer support. Migrate the SDK workspace to pnpm, Nx, Vite/Rolldown, TypeScript 7, Biome, Vitest and Playwright while preserving package names, file paths, CDN globals and existing integration APIs. Use native Nx commands and a shared Vite configuration for package builds, and pnpm for all package installation, consumer validation and release workflows.

### Patch Changes

- Updated dependencies [aad5dea]
  - @mitojs/core@4.0.0-beta.0
  - @mitojs/shared@4.0.0-beta.0
  - @mitojs/types@4.0.0-beta.0
  - @mitojs/utils@4.0.0-beta.0
