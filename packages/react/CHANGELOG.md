# @mitojs/react

## 4.0.0-beta.1

### Patch Changes

- ed27a4c: Support standard Provider JSX with React 19 types and use the application's React instance in ESM and CommonJS builds. Emit classic JSX to preserve the React 16.8 peer baseline, and verify packed consumers against React 16.8, 17 and 19. Keep the existing self-contained CDN bundles.
- Updated dependencies [0d55943]
  - @mitojs/core@4.0.0-beta.1
  - @mitojs/utils@4.0.0-beta.1

## 4.0.0-beta.0

### Major Changes

- aad5dea: Require an ES2015 (ES6) runtime for all SDK packages and remove ES5/Internet Explorer support. Migrate the SDK workspace to pnpm, Nx, Vite/Rolldown, TypeScript 7, Biome, Vitest and Playwright while preserving package names, file paths, CDN globals and existing integration APIs. Use native Nx commands and a shared Vite configuration for package builds, and pnpm for all package installation, consumer validation and release workflows.

### Patch Changes

- Updated dependencies [aad5dea]
  - @mitojs/core@4.0.0-beta.0
  - @mitojs/shared@4.0.0-beta.0
  - @mitojs/utils@4.0.0-beta.0
