# @mitojs/web

## 4.0.0-beta.1

### Patch Changes

- ed27a4c: Support standard Provider JSX with React 19 types and use the application's React instance in ESM and CommonJS builds. Emit classic JSX to preserve the React 16.8 peer baseline, and verify packed consumers against React 16.8, 17 and 19. Keep the existing self-contained CDN bundles.
- Updated dependencies [ed27a4c]
  - @mitojs/react@4.0.0-beta.1

## 4.0.0-beta.0

### Major Changes

- aad5dea: Require an ES2015 (ES6) runtime for all SDK packages and remove ES5/Internet Explorer support. Migrate the SDK workspace to pnpm, Nx, Vite/Rolldown, TypeScript 7, Biome, Vitest and Playwright while preserving package names, file paths, CDN globals and existing integration APIs. Use native Nx commands and a shared Vite configuration for package builds, and pnpm for all package installation, consumer validation and release workflows.

### Patch Changes

- Updated dependencies [aad5dea]
  - @mitojs/browser@4.0.0-beta.0
  - @mitojs/react@4.0.0-beta.0
  - @mitojs/vue@4.0.0-beta.0
