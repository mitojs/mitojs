---
name: changeset-generator
description: 为单包或 monorepo 项目接入 Changesets 3 和 changesets-toolkit，生成并校验变更记录。用户要求安装配置工具、添加 changeset、准备 PR 或判断版本类型时使用。不执行版本发布。
---

# 接入与生成 Changeset

始终从目标仓库读取配置，不写死仓库名、包名、目录、包管理器或基础分支。支持单包项目及 pnpm、npm、Yarn workspace；只有改动影响发布包的消费者时才创建 changeset。

## 确定任务与环境

- 使用 `git rev-parse --show-toplevel` 定位仓库根目录，并在根目录执行后续命令。
- 记录执行前的 `git status --porcelain=v1`、当前 HEAD 和已有 changeset，保留用户原有改动。
- 读取根 `package.json` 的 `packageManager`、锁文件及 workspace 配置，确定项目使用的包管理器。缺少 workspace 是合法的单包场景；包管理器证据冲突时先查仓库约定，不混用锁文件。
- 用户要求安装、初始化、接入或补齐配置时，先执行 [首次接入指南](references/setup.md)。只完成接入也是完整任务，不为工具配置本身强行创建 changeset。
- 用户只要求判断发布影响时，允许只读分析；生成 changeset 所需依赖或配置缺失时，列出缺失项。用户已授权接入时直接补齐，不重复询问。
- 用项目本地 CLI 执行 `changeset --version` 和 `changeset add --help`，确认主版本为 3，且支持 `--since`、`--message`、`--major`、`--minor`、`--patch`。命令前缀见接入指南，不通过临时下载的 CLI 操作仓库。
- 生成前确认 `.changeset/config.json` 的 `changelog`、`commit` 指向可解析的 toolkit 模块。若已有其他钩子，按接入指南处理，不能在日常生成时悄悄替换。
- 配置 commit 钩子会使 `changeset add` 自动创建 Git 提交。只有用户明确要求提交才运行自动提交路径；仅生成 changeset 或准备 PR 不自动等同于提交授权。
- 不输出凭据，不跳过 Git hooks 或签名，不放宽包管理器安全策略。

## 确定比较基准

1. 优先采用用户指定的比较基准，其次读取 `.changeset/config.json` 的 `baseBranch`；缺失时根据远端默认分支和仓库约定确定，不默认写死 `master` 或 `main`。
2. 根据用户指定远端、基础分支的 tracking 配置、当前分支 upstream 和仓库远端确定远端。只有确实存在 `origin` 且无歧义时才使用它；不将已带远端前缀的基准再次拼接。
3. 有远端时执行 `git fetch <remote> <baseBranch>`，使用确认刷新的远端引用作为 `base_ref`。仅本地仓库可使用已明确且存在的本地基础分支。获取或解析失败时停止，不使用不明确的旧引用。
4. 用 `git rev-parse --verify "<base_ref>^{commit}"` 验证基准，再用 `git merge-base` 确认可比较。记录基准，后续 diff、add 和 status 使用同一引用。

## 判断是否需要发布

1. 同时检查三类改动：
   - 已提交分支差异：`git diff --name-status "$base_ref"...HEAD`
   - 工作区差异：`git diff --name-status` 及 `git diff --cached --name-status`
   - 未跟踪文件：`git ls-files --others --exclude-standard`
2. 单包项目读取根 `package.json`；monorepo 按实际 workspace 配置枚举包，pnpm 以 `pnpm-workspace.yaml` 为准，npm/Yarn 以 `package.json` 的 workspaces 为准。仅将具备 `name`、`version`、`private` 不为 `true` 且未被 Changesets `ignore` 排除的包作为发布单元。
3. 将改动映射到最近的包。共享或私有包的变化仍需追踪是否会改变发布包的代码、资源、构建产物或运行时行为。注册表 `access: restricted` 不等同于 `private: true`，仍可能需要版本记录。
4. 检查相对基础分支新增的 changeset，以及未跟踪的 `.changeset/*.md`，确认相同包和相同行为是否已经有发布说明。
5. API、运行时行为、发布资源、兼容性、缺陷修复或性能变化会影响消费者时，生成 changeset。
6. 纯文档、纯测试、纯 CI、纯格式化、纯私有工具改动且不改变公开产物时，说明判断依据并结束；禁止使用 `--empty`。
7. 已有 changeset 完整覆盖本次变化时，不重复生成。除非用户明确要求，否则不修改已有 changeset。

## 选择版本类型

- `major`：不兼容的公开 API 或行为变化，需要消费者迁移；摘要必须说明破坏点和迁移方式。
- `minor`：向后兼容的新功能、新导出、新选项或有意义的新能力。
- `patch`：缺陷修复、性能优化、兼容性修正或改变发布行为的非破坏性重构。
- 每个发布包选择所需的最高 bump。只有证据无法排除 major 与 minor 的实质歧义时才询问用户。
- 一个逻辑变化跨多个公开包时使用一个 changeset；Changesets 3 要求同一 bump 下的多个包名使用逗号连接。

## 编写摘要

摘要描述消费者能感知的变化。先遵循用户要求、仓库约定和已有 changeset 格式；没有明确约定时，默认采用 Conventional Commit 风格的英文、中文各一行。

双语格式中每个变化按英文在前、中文在后的顺序写两行：

```text
fix: handle non-string values without throwing
fix: 修复处理非字符串值时抛错的问题
```

- 两行必须使用相同的 type，并表达相同语义。
- 仓库使用 commitlint 时读取其有效配置，包括 extends 和 package.json 内的配置；type、scope、长度服从实际启用的规则。没有 commitlint 时按变化性质选择 `feat`、`fix`、`perf` 等常规 type，不要求安装 commitlint。
- 默认使用 `type: subject`，因为 changeset frontmatter 已标明包名。确需 scope 时使用 `type(scope): subject`；仅当 `scope-enum` 规则启用时才检查允许列表，中英文两行的 scope 必须一致。
- major 破坏性变化在 type 或 scope 后加 `!`，例如 `feat!: remove the legacy API`。
- 英文 subject 使用简短祈使语气，中文 subject 使用对应的简洁说明；不要以句号结尾，不添加与历史不一致的 emoji。
- 每行最多 120 个字符；若当前 commitlint 启用了更严格的 `header-max-length`，使用更严格的值。
- type 描述变化性质，bump 描述 SemVer 影响，两者分别判断。不要仅凭 `feat`、`fix` 字样机械决定 bump。
- 一个 changeset 包含多个独立变化时，为每个变化写一组中英文行，并用空行分隔；不要把中英文拆成两个 changeset。
- `--message` 是 changeset 正文，不是 Git 提交标题。toolkit 的新增 changeset 提交标题形如 `chore(changeset): 🦋 package:patch`；`package:old->new` 是后续 version 阶段的标题，本 skill 不执行该阶段。

## 使用 Changesets 3 生成

用接入指南中匹配包管理器的命令前缀，只加入非空的 bump 参数，构造一条非交互命令。下例使用 pnpm，包名必须替换为实际发布包名：

```sh
pnpm exec changeset add \
  --since "$base_ref" \
  --major "pkg-a,pkg-b" \
  --minor "pkg-c" \
  --patch "pkg-d" \
  --message "$summary"
```

示例中的某组包为空时，必须省略对应整项参数。将完整摘要作为一个经过安全引用的参数传入，保留真实换行；禁止插入命令替换、反引号、凭据或不受信任的 shell 片段。不要使用 `--empty` 或 `--open`。

- 用户已明确要求提交时，执行 `git diff --cached --quiet --` 要求暂存区为空；已有暂存文件时列出并停止，避免被自动提交夹带。保持 toolkit commit 钩子启用，成功输出应包含 `Changeset added and committed!`，不要再手动创建第二个提交。
- 用户只要求生成时，先备份 config 的完整原始字节，在临时配置中仅将 `commit` 设为 `false`；通过带 `finally` 恢复步骤的调用运行同一 CLI 命令，随后原样恢复 config。即使命令失败也恢复配置，不将临时配置留在仓库或暂存区。成功输出应包含 `Changeset added - you can now commit it!`，HEAD 和原有暂存区必须不变。
- 分辨命令是否实际创建提交，不凭提交钩子存在推断成功。Git hook 失败时保留新文件并报告，不再次运行 add 制造重复记录，也不 amend 前一个提交。

## 校验结果

1. 要求命令成功退出，并从输出中取得新生成的 `.changeset/*.md` 路径。
2. 检查文件 frontmatter、发布包名、bump、摘要格式、type、scope、单行长度和语义一致性。
3. 自动提交路径执行 `git diff-tree --no-commit-id --name-status -r HEAD`，要求新提交只包含一个新增的 `.changeset/*.md`，不得包含其他路径；仅生成路径要求 HEAD、原有暂存区以及 config 原始字节不变。
4. 使用对应包管理器执行 `changeset status --since "$base_ref"`，确认目标包进入发布计划。fixed、linked 和依赖传播可能增加发布包或提高 bump，按配置解释实际计划。
5. 对照执行前状态，确认原有改动仍然存在，没有夹带文件；自动提交路径暂存区应为空。
6. 报告生成或跳过结论、涉及包、bump、摘要、文件路径和校验结果；实际创建了提交才报告提交哈希。

安装、生成、自动提交或校验任一步失败时，完成临时配置的恢复后停止并报告错误，保留现场用于诊断，不手写替代 changeset。不要运行 `changeset version`、prerelease、publish、toolkit 的 version/publish wrapper、push 或发布 workflow。
