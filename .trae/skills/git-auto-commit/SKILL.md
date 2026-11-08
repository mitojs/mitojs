---
name: git-auto-commit
description: Git 自动提交工具。当用户需要提交代码变更、commit 更改或者完成任务后需要提交时，必须调用此 skill 自动生成符合规范的 commit message 并执行提交，默认推送到远端。
---

# Git 自动提交规范

当用户明确要求“提交 / commit / 推送 / 把改动提交到仓库”时，必须遵循以下规范自动生成 commit message 并执行提交。

## 决策顺序与优先级

1. **只在用户明确要求时提交**：未被要求时，不要主动提交或推送。
2. **与 changeset 的前后顺序**：若用户同一请求里同时要求“添加 changeset + 提交”，必须先生成 changeset 文件，再执行本 skill（保证 changeset 被包含在提交中）。
3. **安全优先**：提交前必须检查暂存内容，避免把密钥、token、私钥等敏感信息提交到仓库；如发现疑似敏感信息，先停止并提示用户处理。

## 提交流程

1. 执行 `git status` 查看当前变更
2. 执行 `git add .` 暂存文件（如果用户没有特别说明，默认提交所有变更文件）
3. 执行 `git diff --cached --name-only` 获取已暂存的关键变更文件列表
4. 通过 git 命令查看关键变更文件的内容后生成符合规范的 commit message（避免凭空猜测）
5. 执行 `git commit -m "<message>"` 提交
6. 执行 `git push` 推送到远端（**默认行为**，除非用户明确说"不 push"或"不推送"）

## 推送规则

- **默认推送**：提交完成后自动执行 `git push`
- **跳过推送**：仅当用户明确表示"不 push"、"不推送"、"只 commit"等类似意图时，才跳过推送步骤
- **推送失败处理**：如果推送失败，提示用户可能的原因（如需要先 pull、无远端分支等）

## Commit Message 规范

### 规范来源优先级

1. **优先读取项目根目录下的 `.commitlint` 配置文件**
   - 如果存在该配置文件，严格遵循其中定义的规范
   - 读取可用的 commit type 列表及对应的 emoji
   - 读取 scope 的允许值及其他提交规则

2. **如果没有 `.commitlint` 配置文件**
   - 参考 [commit-message-convention.md](./commit-message-convention.md) 中的默认规范
   - 使用标准的 conventional commits 格式

## 输出要求（必须满足）

1. **提交信息可追溯**：message 必须与暂存的变更内容匹配，不允许与实际改动不一致
2. **最小惊扰**：默认提交全部变更；若用户只想提交部分文件，必须按用户指定范围暂存
3. **遵循仓库规范**：存在 commitlint 配置时必须严格遵循，否则按默认规范生成

## 使用场景

1. 用户要求提交代码
2. 任务完成后需要保存变更
3. 需要生成规范的 commit message
