# SDK 开发、测试与发布

使用 `.node-version` 中的 Node 24 和 pnpm 12.16.1。

```sh
pnpm install --frozen-lockfile
pnpm verify
```

## 构建

```sh
pnpm build
pnpm build --projects=@mitojs/browser,@mitojs/web
pnpm watch
```

Nx 编排包构建，`scripts/compile.mjs` 使用 TypeScript 生成 `.cache/emit` 中的代码与声明，并保留 API Extractor 需要的包边界。各包通过根目录 `vite.config.mjs` 生成 ES2015 的 ESM、CommonJS、IIFE 和汇总声明，输出到 `packages/*/dist`。

ESM 保留 SDK 包之间的外部引用；ESM 和 CommonJS 使用消费项目的 React，IIFE 包含 CDN 所需实现。SDK 最低运行环境为 ES2015，不提供 ES5 或 Internet Explorer 产物。

## 持续检查

| 命令 | 检查内容 |
| --- | --- |
| `pnpm lint` | Biome 正确性规则 |
| `pnpm typecheck` | SDK 与测试的类型检查 |
| `pnpm unit` / `pnpm test:coverage` | SDK 单元测试与覆盖率 |
| `pnpm test:packages` | 真实安装包、入口、传递依赖字节、ES2015、小程序单文件、源码映射、React 与 Vue 类型和运行时消费 |
| `pnpm test:e2e` | 打包产物在浏览器中的错误、请求、Vue2/Vue3 和 React 集成 |
| `pnpm limit` | 压缩产物体积门槛 |

`pnpm verify` 按顺序执行这些检查并构建所有包。包消费测试位于 `test/packages`，使用工作区当前 TypeScript 和打包工具；浏览器测试位于 `e2e`。这些测试直接使用 tarball 或解包产物，避免源码别名掩盖发布包问题。

## 浏览器测试与示例

```sh
pnpm build
pnpm pack:sdks
pnpm exec playwright install chromium
pnpm test:e2e
```

`scripts/pack.mjs` 使用 pnpm 打包到 `artifacts/packages`，并解包到 `artifacts/unpacked`。Playwright 自动管理 `scripts/serve-tests.mjs` 的启动与关闭；后者提供打包 SDK、本地示例与测试接口。

默认端口为 2021，端口占用时可使用 `SDK_TEST_PORT=2023 pnpm test:e2e`。已有 Chromium 可通过 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` 指定。Linux 首次安装浏览器使用 `pnpm exec playwright install --with-deps chromium`。

手动浏览示例时，在构建、打包后运行 `node scripts/serve-tests.mjs`。小程序示例保留在 `examples/Mini` 和 `examples/MiniPerformance`，可用微信开发工具调试；包测试中的微信 API 替身不能代替真机验证。

## 版本与发布

```sh
pnpm changeset
pnpm version:packages
pnpm release
```

Changesets 通过 `.changeset/config.json` 管理独立包版本，使用 changesets-toolkit 生成双语发布记录。版本变更后需要重新构建，因为 SDK_VERSION 来自包元数据。

`pnpm release` 先执行完整 `pnpm verify`，再发布。GitHub 的 Release SDK 工作流仅手动触发，由 Changesets action 创建版本 PR 或调用该发布命令；需要配置 npm 发布凭证。

beta 发布使用 `pnpm changeset pre enter beta` 后推进版本，退出时使用 `pnpm changeset pre exit`。先验证 beta，再推进稳定标签；回退时让消费项目锁定此前版本，不覆盖已发布版本。
