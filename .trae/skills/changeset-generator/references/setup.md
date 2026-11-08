# 首次接入 Changesets 与 toolkit

仅在用户要求安装、初始化、接入或补齐配置时执行。按“识别环境 → 安装缺失依赖 → 初始化缺失配置 → 合并钩子 → 验证”的顺序操作；日常生成流程只检查，不反复安装。

## 识别环境

1. 在 Git 仓库根目录读取 `package.json`、`packageManager`、锁文件和 workspace 配置，选用仓库原有包管理器。
2. 读取现有 `.changeset/config.json` 和依赖版本，记录原有未提交改动。配置无法解析时停止，不能用模板覆盖损坏文件。
3. 确定基础分支和远端，遵循仓库已有约定及远端默认分支；不要根据当前功能分支推断基础分支，也不要默认写死 `master`、`main` 或 `origin`。
4. 检查 Node.js 和包管理器满足待安装版本的 engines；按已安装包元数据或 registry 元数据确认 toolkit 的 peerDependencies。

已验证的组合为 `@changesets/cli@3.0.0` 与 `changesets-toolkit@0.1.0`。该 toolkit 要求 `@changesets/cli@^3.0.0`，Node.js `^22.11 || ^24 || >=26`；使用 pnpm 时要求 `>=11`。npm/Yarn 还需满足 CLI 的 engines。不要把这些版本号当作目标项目已经安装的版本，也不要自行升级 Node.js 或包管理器。

## 安装项目依赖

将 CLI 和 toolkit 安装为仓库根目录的开发依赖，保持现有包管理器及锁文件。仅执行对应的一条命令：

| 项目 | 安装命令 | 本地 CLI 前缀 |
| --- | --- | --- |
| pnpm workspace | `pnpm add -Dw '@changesets/cli@^3.0.0' 'changesets-toolkit@^0.1.0'` | `pnpm exec changeset` |
| pnpm 单包 | `pnpm add -D '@changesets/cli@^3.0.0' 'changesets-toolkit@^0.1.0'` | `pnpm exec changeset` |
| npm 单包或 workspace | `npm install --save-dev '@changesets/cli@^3.0.0' 'changesets-toolkit@^0.1.0'` | `npm exec --no -- changeset` |
| Yarn 单包或 workspace | `yarn add --dev '@changesets/cli@^3.0.0' 'changesets-toolkit@^0.1.0'` | `yarn changeset` |

- 引用中的版本范围提供可复现的兼容起点；已有兼容版本时保留，只补齐缺失依赖，不每次执行 add。升级不兼容版本时检查配置迁移和 engines，将升级纳入接入结果。
- 遵循仓库已有 registry、版本固定及依赖审批约定。不要全局安装这两个 npm 包，也不要增加第二种锁文件。
- 不通过 `npx`、`dlx` 临时下载 CLI 生成记录。npm 前缀中的 `--no` 用于拒绝临时安装缺失命令。
- 安装失败时报告实际错误，不禁用安全策略、不跳过生命周期脚本或改变认证配置来绕过失败。

## 初始化 Changesets

已有 `.changeset/config.json` 时跳过 init，保留原有 `access`、`fixed`、`linked`、`ignore`、`updateInternalDependencies`、`format` 等字段。

缺少配置时用项目本地 CLI 执行 `changeset init`。Changesets 3 的 init 是交互式的，按已确认的仓库约定填写基础分支、发布访问级别等，不假设存在 `--yes` 参数；toolkit 不需要额外的 GitHub changelog 插件。

环境不支持交互时，可以从已安装 `@changesets/config` 导出的 `defaultWrittenConfig` 创建新配置；该包可通过本地 CLI 的依赖解析定位。仅创建缺失文件，根据已确认的基准设置 `baseBranch`，按仓库约定设置 `access`。不要复制其他仓库的完整 config 或旧版 schema。

初始化产生的 `package.json`、锁文件和 `.changeset` 配置作为接入改动保留，不自动提交。

## 配置 toolkit 钩子

在 `.changeset/config.json` 中合并以下两个字段：

```json
{
  "changelog": ["changesets-toolkit/dist/changelog.js", {}],
  "commit": ["changesets-toolkit/dist/commit.js", {}]
}
```

上面是需要合并的字段，不是完整配置模板。

- 缺失字段、Changesets 官方默认钩子或 `false` 可以在用户已授权接入 toolkit 时替换为以上值。
- 已指向同一 toolkit 模块时保留原有 options，不反复重写文件。
- 已配置其他第三方钩子时先检查其用途。用户明确要求替换时仅替换指定字段；授权不明确时列出冲突并询问，其他独立的接入步骤可以继续完成。
- 保留其他配置键、原有缩进及换行风格；不额外设置 `access: public`、删除 ignore、改变 fixed/linked 或更新基础分支。
- 为新配置设置已经确认的 `baseBranch`；现有配置中明确指定的基准优先保留，除非用户要求修改。
- `commit` 钩子会让后续 `changeset add` 自动提交。接入配置本身不创建提交；仅生成而未授权提交时，按主说明的临时禁用与恢复步骤执行。
- 安装完成后确认旧 changeset 的正文可以被新 changelog 钩子处理。不要未经要求改写历史文件。

## 验证接入

1. 检查根依赖声明和安装结果，确认 CLI/toolkit 均可由目标项目解析，版本与 engines、peerDependencies 兼容。
2. 用选定的本地前缀执行 `changeset --version` 和 `changeset add --help`，验证主版本为 3，且支持非交互生成所需的参数。
3. 解析 config，确认两个钩子模块均可从仓库根解析；commit 模块导出 `getAddMessage`、`getVersionMessage`，changelog 模块导出 `getReleaseLine`、`getDependencyReleaseLine`。Yarn PnP 项目通过 `yarn node` 或其本地 CLI 环境解析，不假设存在 `node_modules`。
4. 验证基础分支引用以及 Changesets 的配置读取。可执行 `changeset status --since "<base_ref>"` 检查现有发布计划；没有待发布记录是合法的接入结果，区分明确的空计划和配置错误，不为让命令通过而生成空 changeset。
5. 检查 Git diff，确认只有接入需要的依赖、对应锁文件和 Changesets 配置发生变化，原有业务改动仍然存在。
6. 报告包管理器、安装版本、配置路径、基础分支、校验结果及接入产生的文件变更。

不执行 version、publish、prerelease 或 toolkit 的发布 wrapper 来验证接入。GitHub 作者查询所用的 `CHANGESET_READ_REPO_TOKEN` 是可选项；没有 token 时 toolkit 使用提交邮箱，不要求用户配置发布凭据。
