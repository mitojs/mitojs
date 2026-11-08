# Issue 与 PR 复核（2026-11-08）

基准为 [master `12af7fdfee84e87a5519c75616b456c4d7e3d0ab`](https://github.com/mitojs/mitojs/commit/12af7fdfee84e87a5519c75616b456c4d7e3d0ab)。范围为复核发起时打开的 5 个 Issue（#15、#26、#28、#29、#34）和 7 个旧 PR（#39–#45），并记录本次交付拆分的安排。

这些旧 PR 的主要内容已经随 [#46](https://github.com/mitojs/mitojs/pull/46) 进入 master。用户要求按主题拆成独立 PR，并授权关闭 #39–#45 和本次合并版 [#49](https://github.com/mitojs/mitojs/pull/49)，由独立 PR 承接。本文是独立的复核文档，只记录分析、证据和交付安排，不包含测试实现或端口配置改动。

## 未关闭 Issue

### [#15：safeStringify 误判循环引用](https://github.com/mitojs/mitojs/issues/15)

**结论：原问题已修复。** [safeStringify](../packages/utils/src/helpers.ts) 仅沿当前祖先路径判断循环，共享对象、数组中的重复引用、null 和重复原始值均保留；真正循环仍输出 `Circular`，不修改输入。`unknownToString` 和 [小程序传输](../packages/wx-mini/src/wxTransport.ts) 也复用安全序列化。

证据：[对应提交 `2c592bd`](https://github.com/mitojs/mitojs/commit/2c592bd)、[序列化测试](../packages/utils/__tests__/serialization.spec.ts)。直接比较旧 PR 分支与当前 master，两处生产实现一致；测试已迁移至 Vitest。Browser/Wx 日志与 breadcrumb 的序列化均有覆盖。Issue 中关于捕获所有 JSON 序列化异常的讨论属于额外设计选择，不能据此扩大本次修复范围。

### [#26：点击事件重复触发](https://github.com/mitojs/mitojs/issues/26)

**结论：已修复重复安装同一插件对象的路径，原现场尚不能完整确认。** [BaseClient.use](../packages/core/src/baseClient.ts) 按实例和插件对象身份防重，先订阅再启动监控；支持安装失败重试并防止重入安装。不同插件对象仍可订阅同名事件。

证据：[对应提交 `ab0f21b`](https://github.com/mitojs/mitojs/commit/ab0f21b)、[插件安装测试](../packages/core/src/__tests__/pluginInstallation.spec.ts)。重复调用 `use([domPlugin])` 已有单测，原 Issue 只有截图，缺 SDK 版本、初始化次数和完整复现步骤，不能将所有重复点击归因于同一根因。建议保留 Issue，补充现场后再决定关闭。

### [#28：业务重写 fetch 与 SDK 冲突](https://github.com/mitojs/mitojs/issues/28)

**结论：现有包装链兼容问题已修复，业务包装需要调用它保存的旧 fetch。** [fetch 插件](../packages/browser/src/plugins/fetch.ts) 保留业务输入和调用链，支持字符串、URL、Request 及 init 覆盖；保留响应和原始拒绝原因，被过滤的请求也不会吞掉拒绝，读取响应副本失败不影响业务请求。

证据：[对应提交 `49fe5d7`](https://github.com/mitojs/mitojs/commit/49fe5d7)、[fetch 兼容性测试](../packages/browser/src/__tests__/plugins/fetchCompatibility.spec.ts)。业务若完全替换 fetch 且不调用旧函数，就会切断原包装链；SDK 不会自动恢复这个链。Issue 缺少具体业务重写代码，应按这个边界核对实际接入方式。

### [#29：同一项目创建多个实例](https://github.com/mitojs/mitojs/issues/29)

**结论：请求采集上下文已隔离，实例之间仍有明确共享行为。** [XHR 插件](../packages/browser/src/plugins/xhr.ts) 为实例分配独立上下文，每次发送保留自己的采集数据并清理完成监听；并发、复用 XHR 和旧请求场景已有测试。同名 trace header 复用实际发送值，异名 header 独立；fetch 包装采用相同原则。

证据：[对应提交 `4da1f0e`](https://github.com/mitojs/mitojs/commit/4da1f0e)、[多实例测试](../packages/browser/src/__tests__/plugins/multiInstance.spec.ts)。[错误去重计数](../packages/utils/src/errorId.ts) 仍保存在模块作用域，同 apikey 的实例可能共享去重次数，不能据请求隔离结果宣称所有状态都按实例隔离。业务应避免在渲染和路由变化时重复初始化。

### [#34：配置 CORS 后仍报跨域](https://github.com/mitojs/mitojs/issues/34)

**结论：现有证据不足以确认根因，不能宣布已修复。** [XHR 上报](../packages/browser/src/browserTransport.ts) 默认 `withCredentials = true`，随后调用 `configReportXhr`；不需要 cookie 等凭据时，可在该钩子中设置 `xhr.withCredentials = false`。[现有 CORS FAQ](./architecture.md#faq配置-cors-后仍无法上报) 已说明服务端配置与这一接入方式。

仍需实际页面与 dsn 的 Origin、OPTIONS 和 POST 的状态及响应头，以及 SDK 版本和上报钩子配置。凭据开启时需要匹配实际 Origin 的允许源和凭据响应头；关闭凭据也不能替代服务端 CORS 配置。本次浏览器验证只证明可复现配置下的 SDK 行为，不代表已验证 Issue 作者的服务端。

## 旧 PR 与 master 对应情况

下表对应提交均已在当前 master 历史中。原 PR 的旧分支与现代化后的 master 存在工具链和测试框架差异，不应直接重放旧补丁。

| 旧 PR | 内容与 master 对应提交 | 复核结果 |
| --- | --- | --- |
| [#39](https://github.com/mitojs/mitojs/pull/39) | 安全序列化：[2c592bd](https://github.com/mitojs/mitojs/commit/2c592bd) | 已包含；#15 原问题已解决。 |
| [#40](https://github.com/mitojs/mitojs/pull/40) | fetch 输入与 Promise 语义：[49fe5d7](https://github.com/mitojs/mitojs/commit/49fe5d7) | 已包含；保留上述包装链边界。旧分支 lint 提交 [ce1dfc9](https://github.com/mitojs/mitojs/commit/ce1dfc9) 对应 master 的 [9f71cc2](https://github.com/mitojs/mitojs/commit/9f71cc2)。 |
| [#41](https://github.com/mitojs/mitojs/pull/41) | disabled 配置：[c1d296a](https://github.com/mitojs/mitojs/commit/c1d296a) | 已包含；禁用实例不安装插件、不记录手动日志、不发送日志或埋点；仍是初始化配置。见 [disabled 测试](../packages/core/src/__tests__/disabled.spec.ts)。 |
| [#42](https://github.com/mitojs/mitojs/pull/42) | 插件安装防重与同步事件：[ab0f21b](https://github.com/mitojs/mitojs/commit/ab0f21b) | 已包含；对 #26 保留原现场不充分的限制。 |
| [#43](https://github.com/mitojs/mitojs/pull/43) | 多实例请求隔离：[4da1f0e](https://github.com/mitojs/mitojs/commit/4da1f0e) | 已包含；未改变同 apikey 的模块级错误去重。 |
| [#44](https://github.com/mitojs/mitojs/pull/44) | 等待具体请求、关闭测试资源：[fc82e30](https://github.com/mitojs/mitojs/commit/fc82e30) | 已进入 master；旧 Jest/Puppeteer 流程已由 [Playwright 配置](../playwright.config.ts) 和 [当前 E2E](../e2e/sdk.spec.ts) 替代，不能按旧测试数量描述现状。 |
| [#45](https://github.com/mitojs/mitojs/pull/45) | SDK 架构和接入 FAQ：[6334c35](https://github.com/mitojs/mitojs/commit/6334c35) | 已包含于 [架构文档](./architecture.md)，开发命令已更新为 pnpm；涵盖已关闭的 [#10](https://github.com/mitojs/mitojs/issues/10)、[#16](https://github.com/mitojs/mitojs/issues/16)、[#32](https://github.com/mitojs/mitojs/issues/32)、[#38](https://github.com/mitojs/mitojs/issues/38)，未承诺监控平台开源日期。 |

旧 PR #39–#45 的处理依据是「内容已由 #46 包含」；合并版 #49 的处理依据是「按主题拆分」。按用户授权关闭这些 PR 时，保留历史讨论，并由各独立 PR 说明承接关系。关闭旧 PR 不等于将缺少现场证据的 Issue 判定为已修复。

## 独立交付主题

各分支直接基于本次复核的 master，相互不依赖；本报告与测试、运行端口改动分别评审。

- [PR #51：#15 序列化](https://github.com/mitojs/mitojs/pull/51)：使用打包产物检查日志与 breadcrumb 中的共享对象和祖先循环。
- [PR #55：#26 / 旧 #42 插件安装](https://github.com/mitojs/mitojs/pull/55)：原生点击记录、重复安装防重和同步启动事件。
- [PR #52：旧 #41 disabled](https://github.com/mitojs/mitojs/pull/52)：禁用初始化时保留原生方法，行为栈与发送队列为空。
- [PR #53：#28 fetch](https://github.com/mitojs/mitojs/pull/53)：业务包装在 SDK 前后安装时，保留 Request、Response 和业务请求数据。
- [PR #54：#29 多实例](https://github.com/mitojs/mitojs/pull/54)：XHR/fetch 采集上下文独立，采集 trace 与实际请求头一致。
- [PR #56：#34 CORS](https://github.com/mitojs/mitojs/pull/56)：独立接收服务验证默认凭据、关闭凭据和通配符源的浏览器行为边界。
- [PR #50：测试运行端口](https://github.com/mitojs/mitojs/pull/50)：独立配置 PR 承接，避免与各 Issue 的回归测试形成依赖。

## 当前验证与限制

- 原合并版 [#49](https://github.com/mitojs/mitojs/pull/49) 已完成本地完整验证：lint、类型检查、29 个文件 / 109 项单测与覆盖率、全部 10 包构建、28 项安装包检查、20 项浏览器测试、本地 registry 发布演练和原体积门槛。
- #49 的远端 `verify`、`original-consumers` 均已通过。这是拆分前组合改动的证据，不能替代各独立分支的验证。
- 拆分后的六组测试已用当前打包产物和独立的测试端口联合复验，10 项新增用例与原有 10 项浏览器用例均通过；lint、typecheck 通过。端口配置分支已独立通过完整 `pnpm verify`。各独立分支的 CI 结果由对应 PR 记录。本报告分支只增加本文，不包含上述测试或端口配置功能。
- CORS 验证使用真实独立端口服务，检查 OPTIONS 和 POST：明确 Origin + 默认凭据成功且携带 cookie；关闭凭据后使用 `*` 成功且不带 cookie；默认凭据 + `*` 在预检后被浏览器阻止。拆分后的 CORS 用例通过真实同源文档加载 SDK，没有网络拦截，避免测试路由影响浏览器预检。该结果不代表已验证 #34 作者的服务端。
- 当前 master 使用 pnpm、Vitest 和 Playwright；[CI](../.github/workflows/verify.yml) 执行 `pnpm verify`。旧 PR 的 Jest 数量和历史包体大小不能沿用。历史消费项目由独立的 `original-consumers` CI 任务验证。
- 小程序仅有单测和 mock 级证据，本次没有执行微信开发工具或小程序真机 E2E；#34 的原始服务端配置仍待现场证据。
