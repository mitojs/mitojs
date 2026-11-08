# @mitojs/wx-mini-performance

## 4.0.0-beta.2

### Major Changes

- build!: drop ES5 and Internet Explorer support; migrate applications to ES2015-capable runtimes before upgrading @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
- build!: 移除 ES5 和 Internet Explorer 支持；升级 SDK 前需将应用迁移到支持 ES2015（ES6）的运行环境 @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
- build: use Node 24 and pnpm for workspace installation, consumer validation and releases @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
- build: 工作区依赖安装、消费端验证与发布统一使用 Node 24 和 pnpm @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
- build: adopt Nx and shared Vite/Rolldown builds while preserving package names, paths, CDN globals and APIs @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
- build: 使用 Nx 与共享 Vite/Rolldown 配置构建，保留包名、产物路径、CDN 全局变量和现有 API @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
- build: use TypeScript 7, Biome, Vitest and Playwright for SDK compilation, checks and tests @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
- build: 使用 TypeScript 7、Biome、Vitest 和 Playwright 完成 SDK 编译、检查与测试 @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)

### Patch Changes

- Updated By @mitojs/utils: 4.0.0-beta.1->4.0.0-beta.2
  - build!: drop ES5 and Internet Explorer support; migrate applications to ES2015-capable runtimes before upgrading @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build!: 移除 ES5 和 Internet Explorer 支持；升级 SDK 前需将应用迁移到支持 ES2015（ES6）的运行环境 @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build: use Node 24 and pnpm for workspace installation, consumer validation and releases @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build: 工作区依赖安装、消费端验证与发布统一使用 Node 24 和 pnpm @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build: adopt Nx and shared Vite/Rolldown builds while preserving package names, paths, CDN globals and APIs @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build: 使用 Nx 与共享 Vite/Rolldown 配置构建，保留包名、产物路径、CDN 全局变量和现有 API @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build: use TypeScript 7, Biome, Vitest and Playwright for SDK compilation, checks and tests @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build: 使用 TypeScript 7、Biome、Vitest 和 Playwright 完成 SDK 编译、检查与测试 @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)

## 4.0.0-beta.1

### Patch Changes

- @mitojs/utils@4.0.0-beta.1

## 4.0.0-beta.0

### Major Changes

- aad5dea: Require an ES2015 (ES6) runtime for all SDK packages and remove ES5/Internet Explorer support. Migrate the SDK workspace to pnpm, Nx, Vite/Rolldown, TypeScript 7, Biome, Vitest and Playwright while preserving package names, file paths, CDN globals and existing integration APIs. Use native Nx commands and a shared Vite configuration for package builds, and pnpm for all package installation, consumer validation and release workflows.

### Patch Changes

- Updated dependencies [aad5dea]
  - @mitojs/utils@4.0.0-beta.0
