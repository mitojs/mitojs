# @mitojs/react

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

- fix: support Provider children with React 19 and reuse the application's React instance @cjinhuo@qq.com · 2026-11-08 · [#12af7fdf](https://github.com/mitojs/mitojs/commit/12af7fdfee84e87a5519c75616b456c4d7e3d0ab)
- fix: 支持 React 19 的 Provider 子元素并复用应用的 React 实例 @cjinhuo@qq.com · 2026-11-08 · [#12af7fdf](https://github.com/mitojs/mitojs/commit/12af7fdfee84e87a5519c75616b456c4d7e3d0ab)
- fix: retain React 16.8 compatibility with classic JSX and keep self-contained CDN bundles @cjinhuo@qq.com · 2026-11-08 · [#12af7fdf](https://github.com/mitojs/mitojs/commit/12af7fdfee84e87a5519c75616b456c4d7e3d0ab)
- fix: 使用 classic JSX 保留 React 16.8 兼容性，并保持 CDN 包独立可用 @cjinhuo@qq.com · 2026-11-08 · [#12af7fdf](https://github.com/mitojs/mitojs/commit/12af7fdfee84e87a5519c75616b456c4d7e3d0ab)
- Updated By @mitojs/core: 4.0.0-beta.1->4.0.0-beta.2
  - build!: drop ES5 and Internet Explorer support; migrate applications to ES2015-capable runtimes before upgrading @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build!: 移除 ES5 和 Internet Explorer 支持；升级 SDK 前需将应用迁移到支持 ES2015（ES6）的运行环境 @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build: use Node 24 and pnpm for workspace installation, consumer validation and releases @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build: 工作区依赖安装、消费端验证与发布统一使用 Node 24 和 pnpm @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build: adopt Nx and shared Vite/Rolldown builds while preserving package names, paths, CDN globals and APIs @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build: 使用 Nx 与共享 Vite/Rolldown 配置构建，保留包名、产物路径、CDN 全局变量和现有 API @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build: use TypeScript 7, Biome, Vitest and Playwright for SDK compilation, checks and tests @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - build: 使用 TypeScript 7、Biome、Vitest 和 Playwright 完成 SDK 编译、检查与测试 @qq1443970739@gmail.com · 2026-11-06 · [#aad5dea7](https://github.com/mitojs/mitojs/commit/aad5dea7428b4dd48ebd5e488f1065d9c4917fd5)
  - fix: bind plugin callback types to the installing client under strict TypeScript @cjinhuo@qq.com · 2026-11-08 · [#12af7fdf](https://github.com/mitojs/mitojs/commit/12af7fdfee84e87a5519c75616b456c4d7e3d0ab)
  - fix: 在严格 TypeScript 模式下将插件回调类型绑定到实际安装客户端 @cjinhuo@qq.com · 2026-11-08 · [#12af7fdf](https://github.com/mitojs/mitojs/commit/12af7fdfee84e87a5519c75616b456c4d7e3d0ab)
  - fix: accept Vue 3 and browser plugins in init and client.use while rejecting incompatible client requirements @cjinhuo@qq.com · 2026-11-08 · [#12af7fdf](https://github.com/mitojs/mitojs/commit/12af7fdfee84e87a5519c75616b456c4d7e3d0ab)
  - fix: 允许 init 和 client.use 直接接入 Vue 3 及浏览器插件，同时拒绝不兼容的客户端要求 @cjinhuo@qq.com · 2026-11-08 · [#12af7fdf](https://github.com/mitojs/mitojs/commit/12af7fdfee84e87a5519c75616b456c4d7e3d0ab)

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
