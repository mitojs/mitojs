# SDK 工具链迁移

迁移参考 `cjinhuo/mono-sdk-boilerplate@c8f10a336ca9b190ec21529c3dbc882a505726c0`。源码起点为本地组合验证提交 `9f71cc228ec64ca17e1ab57d1a9815d15e419a85`；该起点包含此前尚未发布的 SDK 修复。npm 的已发布契约另外记录在 `e2e/contracts.json`，多数包为 3.0.1，wx-mini 为 3.1.0。

## 开发环境与命令

仓库开发和 CI 使用 `.node-version` 中的 Node 24.22.1、pnpm 12.16.1；这些要求不写入发布 SDK 的 engines，也不要求消费项目升级 Node、React 或构建器。

```sh
nvm install
nvm use
corepack enable pnpm
corepack prepare pnpm@12.16.1 --activate
pnpm install --frozen-lockfile
pnpm build                 # 全部 10 个包
pnpm build --projects=@mitojs/browser,@mitojs/web  # 指定包，自动准备编译产物
pnpm watch
pnpm typecheck
pnpm unit
pnpm test:coverage
pnpm pack:sdks             # artifacts/packages/*.tgz，并解包到 artifacts/unpacked
pnpm test:packages
pnpm exec playwright install chromium
pnpm test:e2e
pnpm test:release
pnpm verify
```

Linux CI 首次运行 Playwright 使用 `playwright install --with-deps chromium`。已有 Chromium 可以设置 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`。

## 构建结构与兼容适配

- pnpm workspace + Catalog 统一版本；发布包中的 workspace 协议由 pnpm pack 转成普通版本号。
- Nx 管理编译依赖、并行和缓存。现有 core/types/utils 包存在类型循环，因此先使用一个 SDK 编译任务处理整个类型图，各包的打包任务依赖这个任务。没有把循环包直接接成 `^build` 任务循环。
- 根 `build` 和 `watch` 直接调用 Nx CLI，不再使用自定义命令包装。指定包使用原生 `--projects` 参数；watch 使用 Nx daemon 监听项目文件和根构建配置等全局文件的变化。
- TypeScript 7 负责源码检查、跨文件 const enum 内联和声明生成，输出到 `.cache/emit`；编译缓存同时提供 API Extractor 所需的真实 package 边界。
- 所有 SDK 的最低语法目标统一为 ES2015（ES6），运行环境需要具备对应的语言与标准库能力。Vite 8/Rolldown 直接构建 ESM、CommonJS 和 IIFE，IIFE 使用 Vite 默认的 Oxc 压缩；不再进行额外的 JavaScript 降级、手工压缩或 sourcemap 重写。
- 各包直接运行 `vite build --config ../../vite.config.mjs --app`，共享根配置中的三种构建环境。ESM 首先清理输出目录，随后构建 CommonJS/IIFE，最后通过同一配置汇总声明；不再保留独立的逐包构建脚本或未使用的旧 API Extractor JSON 配置。
- CommonJS 保留 __esModule 标记。所有包的文件名沿用原名，IIFE 全局名为 MITO。
- CommonJS/IIFE 显式保留旧 Rollup 产物的 strict 模式，避免 Rolldown 默认 auto 策略改变函数语义。
- ESM 的 @mitojs 包依赖和 React 保留外部引用；CommonJS/IIFE 保持自包含。ESM 内部使用的 tslib helper 也打入产物。
- ESM 使用 Rolldown 的 esmExternalRequirePlugin，将 JSX runtime 的 React require 转成静态 import，保证旧 Webpack 4 消费项目在浏览器中能运行。
- API Extractor 保留单文件声明入口。编译缓存提供真实 package 边界，避免跨包内联带私有成员的类，导致 BrowserClient 不能传给 MitoProvider。
- 保留 npm 的 Subscrib 导出，同时保留源码中的 Subscribe；types 包内部自引用改为相对类型引用，以便可靠汇总声明。wx-mini-performance 补齐已有源码实际使用的 utils 依赖。
- SDK 的 main/module/types、现有深层路径、React peer 范围保持。没有增加会封闭旧路径的 exports 条件表。小程序的 main/module 继续指向原 CommonJS 文件。
- types 的空 JavaScript 产物和仅转导出的 web ESM 文件沿用 Vite 的默认行为，不再补造没有源码映射的 `.map` 文件；实际代码的 sourcemap 继续生成和验证。

Vite 模板的 index.* 文件名、_GLOBAL_ 和 React 19 demo 不适用于现有 SDK 消费契约，未直接套入发布包。

## 验收范围

`pnpm verify` 包含 Biome、SDK/测试源码类型检查、Vitest/V8 覆盖率、全部构建、真实安装包消费、CDN 浏览器测试、本地发版演练和原体积门槛。

`test:packages` 在仓库外用 pnpm 安装 `.tgz`，验证入口、文件清单、公开 JS/类型导出、CommonJS 深层路径、ES2015 语法和 TypeScript 4.1/4.4 消费。ESM 文件直接按 ES2015 module 解析，不再剥离 import/export。旧 TypeScript 编译器仅作为声明消费兼容性基线，与 SDK 的运行时语法目标独立。`test:e2e` 从解包产物加载 CDN 脚本，验证错误、Promise、XHR、Fetch、Vue2/Vue3 插件和 React ErrorBoundary；没有用源码 alias 替代发布包。

安装包检查同时验证微信单个 CommonJS 文件可在没有 window/require 的微信 API 替身环境中初始化和上报、IIFE 没有泄漏编译 helper，以及 sourcemap 能定位回原始 TypeScript。运行测试使用正常的 ES2015 环境，不再模拟缺失 Symbol 的旧环境。

真实历史项目另用以下命令验证：

```sh
SDK_CONSUMER_NODE=/path/to/node-v14.21.3/bin/node \
  pnpm test:consumers
```

脚本固定 react-sdk-demo、vue2-sdk-demo、vue3-sdk-demo 的提交，将原锁文件导入 pnpm 后统一安装；保留 CRA4/Vue CLI3/Vite2 工具链，把 SDK 依赖换成本次 `.tgz`。旧项目的 node-sass4 使用 Node 14；这与 SDK 仓库使用 Node 24 分开。每个项目都校验 src 相对原提交没有修改，并比较安装的 SDK 字节与打包文件；随后构建并验证 React Provider/ErrorBoundary、Vue2 错误处理与取消上报 hook、Vue3 插件注册。证据写入 `artifacts/consumer-validation.json`。

可设置 SDK_CONSUMER_ROOT 复用测试检出目录。不要把它指向有未提交源码修改的工作目录。仓库及消费项目的安装、打包、构建和发布演练均使用 pnpm。

本地候选包沿用尚未发布的新版本前的版本号，所以测试脚本使用内容哈希路径和仅用于测试的 pnpm overrides，确保全部直接/传递 SDK 依赖都来自本次候选包，避免 registry 同号包或文件缓存造成假通过。正式发布采用新的 semver 版本，消费项目无需这些本地测试设置。

微信开发者工具/真机运行仍需要对应环境，现代 Chromium 与语法检查不能代替真机验证。不再支持 Internet Explorer 或仅具备 ES5 能力的运行环境。原 test/e2e/Mini* 历史用例未接入本次浏览器门禁；安装包检查覆盖全部小程序包的文件和公开导出，单文件微信环境检查使用明确的 API 替身。

Biome 首轮只启用有限的正确性规则，沿用现有源码风格；未把全库严格化和业务重构混入迁移。类型消费检查沿用真实示例的 skipLibCheck 设置，微信 ambient console 与 DOM 声明的既有冲突不作为本次新的消费要求。

## 版本与发布

```sh
pnpm changeset            # 记录变更
pnpm version:packages     # 根据各包自己的版本推进，wx-mini 保持独立版本历史
pnpm release              # 先验收，再发布
```

beta 流程使用 `pnpm changeset pre enter beta`、`pnpm version:packages`，验收候选后执行 release；退出 beta 使用 `pnpm changeset pre exit` 后再次 version。Git 对比基准使用 origin/master，支持 feature 分支检出而没有本地 master 分支的环境。

`.changeset/modern-sdk-toolchain.md` 已记录全部 SDK 的 major 变更：最低运行环境提高到 ES2015，属于破坏性兼容范围调整。参考模板采用 Changesets 3 的工作流，使用标准 CLI 进行版本与发布，未引入模板中另一个需要维护/发布的 toolkit 包。

release 工作流仅手动触发，由 Changesets action 创建版本 PR/发布；需要配置 npm 发布凭证。本次实现不执行正式 npm 发布。版本变更后必须重新构建，因为 SDK_VERSION 来源于包元数据。`test:release` 的真实发布仅写入 127.0.0.1 上的临时 registry，并验证独立版本和重复发布行为。

## 回退

工程配置可回退迁移提交；消费者可锁回此前 npm 版本。正式发布使用新版本号，不覆盖已存在版本。各包先发布到 beta tag 并完成消费验证，再推进 latest；保留上一个稳定版本以便消费项目回退。

## 本次验收记录

[当前 ES2015 构建的本地验收结果](./toolchain-validation.json)。
