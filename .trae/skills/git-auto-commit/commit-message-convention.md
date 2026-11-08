# Commit Message 规范

当项目中不存在 `.commitlintrc.xx` 配置文件时，使用以下默认规范生成 commit message。

## Commit Type 列表

| Type     | Emoji | 描述                                            |
| -------- | ----- | ----------------------------------------------- |
| feat     | ✨     | 新增功能 (A new feature)                        |
| fix      | 🐛     | 修复 bug (A bug fix)                            |
| docs     | 📝     | 仅文档变更 (Documentation only changes)         |
| style    | 💄     | 不影响代码含义的变更（如空格、格式化、分号等）  |
| refactor | ♻️     | 既不修复 bug 也不添加功能的代码重构             |
| perf     | ⚡️     | 提升性能的代码变更                              |
| test     | ✅     | 添加或修正测试                                  |
| build    | 📦️     | 影响构建系统或外部依赖的变更（如 webpack、npm） |
| ci       | 🎡     | CI 配置文件的变更（如 GitHub Actions、Travis）  |
| chore    | 🔨     | 其他不修改 src 或测试文件的变更                 |
| revert   | ⏪️     | 回滚之前的提交                                  |


## Type 生成规则

根据变更的文件路径和性质自动判断 type：

| 变更场景                                 | 推荐 Type  |
| ---------------------------------------- | ---------- |
| 新增功能、组件、API 端点                 | `feat`     |
| 修复 bug、解决问题                       | `fix`      |
| 仅修改文档、注释、README                 | `docs`     |
| 代码格式化、空格、分号调整（无逻辑变更） | `style`    |
| 重构代码（无功能变更）                   | `refactor` |
| 性能优化                                 | `perf`     |
| 添加/修改测试文件                        | `test`     |
| 依赖升级、构建脚本修改                   | `build`    |
| CI/CD 配置变更                           | `ci`       |
| 配置文件、工具链调整                     | `chore`    |
| 回滚提交                                 | `revert`   |

## 格式规范

```
<type>(<scope>): <emoji> <subject>
```

- **type**: 必填，从上述 Type 列表中选择
- **scope**: 可选，表示变更的范围（如模块名、组件名）
- **emoji**: 必填，与 type 对应的 emoji
- **subject**: 必填，简短描述变更内容（使用祈使句，首字母小写，结尾不加句号）


## Scope 生成规则

### Monorepo 项目（前端）

如果是 monorepo 项目，先运行脚本获取所有包名：

```bash
node .trae/skills/git-auto-commit/get-packages.js
```

然后从返回的包名列表中选择变更所在的包作为 scope。

### 单包项目

根据变更文件路径推断 scope：

| 项目类型  | 变更路径                       | 推荐 Scope       |
| --------- | ------------------------------ | ---------------- |
| **TS/JS** | `src/components/*`             | 组件名           |
|           | `src/pages/*`, `src/app/*`     | 页面/路由名      |
|           | `src/hooks/*`, `src/utils/*`   | `hooks`, `utils` |
| **Go**    | `cmd/*`, `pkg/*`, `internal/*` | 命令/包/模块名   |
| **Rust**  | `src/*.rs`, `crates/*`         | 模块/crate 名    |
| **通用**  | `README.md`                    | `docs`           |
|           | `.github/workflows/*`          | `ci`             |
|           | `Dockerfile`                   | `docker`         |

## 示例

```
feat(auth): ✨ add login functionality
fix(api): 🐛 resolve user data fetching error
docs(readme): 📝 update installation instructions
style(button): 💄 adjust padding and margin
refactor(utils): ♻️ simplify date formatting logic
perf(query): ⚡️ optimize database indexing
test(login): ✅ add unit tests for auth flow
build(deps): 📦️ upgrade react to v18
ci(actions): 🎡 add automated release workflow
chore(config): 🔨 update eslint rules
```
