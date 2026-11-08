---
"@mitojs/browser": major
"@mitojs/core": major
"@mitojs/react": major
"@mitojs/shared": major
"@mitojs/types": major
"@mitojs/utils": major
"@mitojs/vue": major
"@mitojs/web": major
"@mitojs/wx-mini": major
"@mitojs/wx-mini-performance": major
---

build!: drop ES5 and Internet Explorer support; migrate applications to ES2015-capable runtimes before upgrading
build!: 移除 ES5 和 Internet Explorer 支持；升级 SDK 前需将应用迁移到支持 ES2015（ES6）的运行环境

build: use Node 24 and pnpm for workspace installation, consumer validation and releases
build: 工作区依赖安装、消费端验证与发布统一使用 Node 24 和 pnpm

build: adopt Nx and shared Vite/Rolldown builds while preserving package names, paths, CDN globals and APIs
build: 使用 Nx 与共享 Vite/Rolldown 配置构建，保留包名、产物路径、CDN 全局变量和现有 API

build: use TypeScript 7, Biome, Vitest and Playwright for SDK compilation, checks and tests
build: 使用 TypeScript 7、Biome、Vitest 和 Playwright 完成 SDK 编译、检查与测试
