# AI CLI 工具社区动态日报 2026-06-22

> 生成时间: 2026-06-22 05:33 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

以下是基于 2026-06-22 各主流 AI CLI 工具社区动态摘要生成的横向对比分析报告：

### 1. 生态全景
当前 AI CLI 工具生态已全面跨越“单次代码生成”的初级阶段，正加速向**多智能体编排**与**企业级复杂工作流**的深水区迈进。从底层的运行时架构解耦（如 Rust 核心重构）、上下文记忆持久化，到面向视障群体的语音原生交互，各家工具在功能边界上不断拓宽。然而，随着应用场景的复杂化，**计费透明度失控**（如静默扣费、Token 暴涨）与**极端环境下的系统级稳定性**（如沙箱隔离失效、会话进程崩溃）已成为全行业亟待解决的共性痛点。

### 2. 各工具活跃度对比
*注：因各工具开源时点与社区基数不同，数据反映的是绝对活跃量。*

| 工具名称 | 今日活跃 Issues 数 | 今日更新 PR 数 | 版本发布情况 | 当前核心特征 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | 10+ | 2 | 无稳定版 | B端企业集成诉求强烈，关注多端通信与体验。 |
| **OpenAI Codex** | 10+ | 10+ | 2个 Alpha 版 | 底层架构（Rust引擎）重度重构期，深陷计费风波。 |
| **Gemini CLI** | 10+ | 活跃 (被截断) | Nightly 失败 | 聚焦子智能体稳定性、安全护栏与代码读取 AST 化。 |
| **Copilot CLI** | 8 | 1 (垃圾PR) | 无 | 活跃度较低，主要在呼吁 Hook 鉴权与计费透明化。 |
| **Kimi Code CLI**| 2 | 0 | 无 | 处于平稳迭代期，专注长效记忆与执行模式一致性。 |
| **OpenCode** | 10+ | 10+ | 无 | 积极推进模型兼容（DeepSeek/Qwen3）与企业级基建。 |
| **Qwen Code** | 10+ | 10+ | v0.18.5 稳定版 | 功能落地迅猛（语音/Artifact），大力优化CI与防死循环。 |

### 3. 共同关注的功能方向
*   **精细化成本与配额管控**：**全工具链**的核心痛点。开发者极度反感“暗中扣费”和后台幽灵进程消耗，强烈要求提供实时的 Token 消耗进度条（**Copilot CLI, Claude Code**）、OpenTelemetry 成本指标暴露（**Copilot CLI, OpenCode**），以及修复计费异常和后台静默执行任务的问题（**OpenAI Codex, Claude Code**）。
*   **跨会话记忆与上下文生命周期管理**：从单次问答向长期项目协作演进。**Kimi Code** 呼吁跨会话持久化记忆系统；**Qwen Code** 与 **Claude Code** 正在推进可恢复的后台子代理及多会话通信；**Copilot CLI** 则迫切要求解决上下文静默压缩导致的“记忆丢失”问题。
*   **安全沙箱与高危操作拦截**：随着 AI 执行权限放开，安全兜底成为刚需。**Gemini CLI** 呼吁防范 `git reset --force` 等破坏性命令；**Copilot CLI** 反馈沙箱网络隔离和 `preToolUse` Hook 拦截形同虚设；**Qwen Code** 则推进了在 TUI 中审查外部注入内容的功能。
*   **跨平台兼容性与韧性**：特别是 Windows 及边缘计算环境。**OpenAI Codex** 与 **Copilot CLI** 均报告了严重的 Windows 沙箱冲突及 ARM64 架构进程崩溃问题；**Claude Code** 则因底层二进制打包变更导致 Android/Termux 平台彻底失效。

### 4. 差异化定位分析
*   **Claude Code**：**“企业级编排先锋”**。重点打通 B 端壁垒（如 AWS Bedrock 鉴权、Google Workspace 权限接入），以满足大型企业对内部数据资产安全对接的定制化诉求。
*   **OpenAI Codex**：**“底层基建重构者”**。正大力推进“会话运行时与传输层解耦”及环境上下文状态化，其技术路线偏向于打造一个高内聚、支持进程外协议服务的系统底座。
*   **Gemini CLI**：**“工程严谨的守门员”**。重点关注智能体执行的确定性与代码读取的精确度（探索 AST 感知），致力于在工具数量极限（>128限制）和脱敏机制上做深度的安全防护。
*   **Copilot CLI**：**“IDE 协同的追随者”**。更多聚焦于在 VS Code/IDE 生态中的无缝集成体验，但目前在将文档承诺转化为实际可用功能（如沙箱隔离）上面临挑战。
*   **Kimi Code CLI**：**“长效陪伴的辅助者”**。体量轻盈，更倾向于作为开发者的长效个人助手，主打通过本地 Memory System 沉淀项目规范，减少重复提示。
*   **OpenCode**：**“开源极客的试验田”**。强调模型生态的高度包容性（广泛接入 DeepSeek、Cohere、Qwen3 等新特性），并积极推进关系型数据库（PostgreSQL）支持，迎合私有化部署需求。
*   **Qwen Code**：**“全端交互的多模态标杆”**。率先落地原生语音听写与 HTML Artifact 可视化页面生成，并在防死循环（常驻守卫拦截相同调用）等容错机制上做到了极致。

### 5. 社区热度与成熟度
*   **高热度与爆发期**：**OpenAI Codex**（Issue 讨论最高过百）与 **Claude Code** 拥有最高的社区基数，当前正处于功能激进拓展与 Bug 频发的阵痛期，用户的容错率正在下降。
*   **高频迭代与成长期**：**Qwen Code**、**OpenCode** 和 **Gemini CLI** 均展现出极高的研发效能（日均 10+ 高质量 PR）。它们在底层架构重构、测试基建优化和多模态适配上动作迅速，属于潜力巨大的快速成长期。
*   **平稳演进期**：**Kimi Code CLI** 与 **Copilot CLI** 处于相对平稳的维护期。前者侧重于核心痛点的讨论与规划，后者则更多在应对系统稳定性与文档修复。

### 6. 值得关注的趋势信号
1.  **“信任危机”倒逼可观测

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下是基于 GitHub 数据（截至 2026-06-22）生成的 Claude Code Skills 社区热点报告：

### 1. 热门 Skills 排行（PR 精选）
目前社区贡献的 PR 集中在文档处理优化、企业级系统集成以及 Agent 底层能力增强上。以下是最具代表性的 Skills：

*   **Shodh-memory: Agent 持久化上下文记忆**
    *   **功能**: 为 AI Agent 提供跨对话的持久化记忆系统，结构化存储记忆并主动唤醒相关上下文。
    *   **社区动态**: 解决了 Agent 长期记忆的核心痛点，被视为扩展 Claude Code 能力边界的重要基石。
    *   **状态**: [OPEN](https://github.com/anthropics/skills/pull/154)
*   **ServiceNow 企业级平台助手**
    *   **功能**: 涵盖 ServiceNow 的脚本编写、架构设计、ITAM/SAM、SecOps 及集成开发等全方位辅助。
    *   **社区动态**: 标志着 Skills 正在深入大型企业 IT 运维与工作流场景，极具商业价值。
    *   **状态**: [OPEN](https://github.com/anthropics/skills/pull/568)
*   **Document-typography (文档排版质量控制)**
    *   **功能**: 自动修复 AI 生成文档中的常见排版问题（如孤行、寡行、页底标题滞留、序号错位）。
    *   **社区动态**: 直击大模型生成长文本时的格式痛点，补齐了“最后一公里”的文档美学问题。
    *   **状态**: [OPEN](https://github.com/anthropics/skills/pull/514)
*   **ODT (OpenDocument) 生成与解析**
    *   **功能**: 支持创建、填充、读取或转换开放文档格式文件（.odt, .ods），并可转为 HTML。
    *   **社区动态**: 为开源/ISO标准办公文档提供了强力支持，受到非微软生态用户的欢迎。
    *   **状态**: [OPEN](https://github.com/anthropics/skills/pull/486)
*   **Testing-patterns (全栈测试模式)**
    *   **功能**: 提供全面的测试指导，包括测试理念（Testing Trophy）、单元测试、React 组件测试等。
    *   **社区动态**: 完善了 Claude Code 在软件工程侧的闭环能力，推动 AI 写出更健壮的代码。
    *   **状态**: [OPEN](https://github.com/anthropics/skills/pull/723)
*   **Meta-skills: 质量与安全分析器**
    *   **功能**: 从结构、文档、安全性等 5 个维度全面分析 Claude Skill 的质量。
    *   **社区动态**: “用魔法打败魔法”，用 Skill 审查 Skill，回应了社区对 Skill 自身安全与规范的担忧。
    *   **状态**: [OPEN](https://github.com/anthropics/skills/pull/83)

### 2. 社区需求趋势
通过对 Issues 的分析，当前社区对 Skills 生态的期待主要集中在以下四个方向：

*   **跨平台与团队协作共享**：用户强烈呼吁打通组织内的 Skill 分享壁垒（[Issue #228](https://github.com/anthropics/skills/issues/228)），希望摒弃目前手动分发 `.skill` 文件的原始模式。
*   **Skill 资产安全与信任机制**：社区对第三方 Skill 的安全性高度关注，例如有开发者指出非官方 Skill 冒用 `anthropic/` 命名空间会导致越权风险（[Issue #492](https://github.com/anthropics/skills/issues/492)），以及对 SharePoint 文档处理时的权限边界感到担忧（[Issue #1175](https://github.com/anthropics/skills/issues/1175)）。
*   **底层基础设施兼容性（尤其是 Windows）**：大量用户反馈官方的 `skill-creator` 脚本在 Windows 上存在严重的编码（UTF-8/CP1252）和子进程调用阻塞问题（[Issue #1061](https://github.com/anthropics/skills/issues/1061)），亟需跨平台体验对齐。
*   **与底层 API/云服务的深度集成**：开发者希望 Skills 能更好地解耦并对接外部生态，如通过 MCP（模型上下文协议）标准化暴露 Skills API（[Issue #16](https://github.com/anthropics/skills/issues/16)），以及对 AWS Bedrock 的原生支持（[Issue #29](https://github.com/anthropics/skills/issues/29)）。

### 3. 高潜力待合并 Skills（活跃 Bugfix/Enhancement）
当前有几个修复核心痛点且讨论度极高的 PR，一旦合并将大幅改善 Skill 开发者体验：

*   **[PR #1298](https://github.com/anthropics/skills/pull/1298): 修复 run_eval.py 召回率为 0% 及 Windows 兼容性问题**
    *   *理由*: 直接解决了目前 Skill 描述自动优化闭环完全失效的致命 Bug（对应 [Issue #556](https://github.com/anthropics/skills/issues/556) 和 #1169），属于优先级极高的底层修复。
*   **[PR #539](https://github.com/anthropics/skills/pull/539) / [PR #361](https://github.com/anthropics/skills/pull/361): YAML frontmatter 特殊字符解析预警**
    *   *理由*: 解决了因未加引号导致的 YAML 静默解析错误，能防止大量初级开发者编写 Skill 时的隐藏陷阱。
*   **[PR #541](https://github.com/anthropics/skills/pull/541): 修复 DOCX 追踪修订导致的文档损坏**
    *   *理由*: 修复了 OOXML 中由于 ID 碰撞导致的文档损坏，大幅提升企业用户使用 Claude 处理 Word 文档的安全性。

### 4. Skills 生态洞察
**一句话总结**：当前社区在 Skills 层面最集中的诉求是——**突破单机脚本限制，实现企业级/团队间的安全共享，并彻底解决 Windows 平台及核心脚本（如 run_eval）的跨平台兼容性痛点。**

---

**Claude Code 社区动态日报 (2026-06-22)**

### 1. 今日速览
今日 Claude Code 社区无新版本发布，焦点主要集中在**多智能体工作流编排**、**精细化成本控制**以及**跨平台兼容性（尤其是 Android/Termux 与 Windows 平台）**的讨论上。开发者对 MCP（Model Context Protocol）生态的权限管理与稳定性提出了更高的要求，同时社区也贡献了实用的 Shell 自动补全功能 PR。

### 2. 社区热点 Issues (Top 10)
以下是今日社区评论最多、最具代表性的 10 个 Issue，反映了当前工具的痛点与核心诉求：

*   **[#895](https://github.com/anthropics/claude-code/issues/895) [bug] Write 工具偶发 `content` 参数丢失报错**
    *   **动态**：评论数高达 54。
    *   **分析**：模型在调用内部工具（如 `Write`）时偶发性遗漏必需参数，导致工作流中断。这是 LLM 工具调用稳定性的经典挑战，引发了开发者对工具兜底机制的讨论。
*   **[#50270](https://github.com/anthropics/claude-code/issues/50270) [bug] v2.1.113+ 版本在 Termux/Android 上彻底失效**
    *   **动态**：评论数 53，点赞 51。
    *   **分析**：近期打包方式的变更（从 JS 切换为依赖 glibc 的原生二进制）导致 Android 环境被完全破坏。这反映了边缘平台开发者的强需求，官方的打包降级策略亟待修复。
*   **[#24798](https://github.com/anthropics/claude-code/issues/24798) [enhancement] 支持多 Claude 会话间的通信**
    *   **动态**：评论数 38。
    *   **分析**：随着开发者频繁在大型项目中并行运行多个 Claude Code 实例，解决会话间的"信息孤岛"问题、实现跨会话的任务依赖编排，已成为社区最迫切的高级架构需求。
*   **[#16128](https://github.com/anthropics/claude-code/issues/16128) [feature] Chrome 扩展支持 AWS Bedrock 认证**
    *   **动态**：评论数 25，点赞高达 108。
    *   **分析**：企业级用户强烈希望桌面端及浏览器扩展能够接入 AWS Bedrock 的内部鉴权体系，这是 B 端市场打通的关键一环。
*   **[#11008](https://github.com/anthropics/claude-code/issues/11008) [feature] 在 Hook 输入中暴露 Token 用量和成本**
    *   **动态**：评论数 23。
    *   **分析**：开发者需要构建自定义的仪表盘来监控消耗。目前 Hooks 无法获取底层成本数据，限制了企业对 AI 编码支出的精细化管控。
*   **[#53442](https://github.com/anthropics/claude-code/issues/53442) [bug] Cowork Google Drive MCP 无法读取共享云盘内容**
    *   **动态**：评论数 19。
    *   **分析**：MCP 在接入复杂权限体系（如 Google Workspace）时存在可见性盲区，直接影响了企业数据资产的接入体验。
*   **[#58429](https://github.com/anthropics/claude-code/issues/58429) [feature] 内置语音朗读功能**
    *   **动态**：评论数 19。
    *   **分析**：无障碍访问需求。开发者为视障群体或需要解放双手的场景提出了原生 TTS 集成的请求。
*   **[#63634](https://github.com/anthropics/claude-code/issues/63634) [bug] `/compact` 压缩上下文时强制要求 1M 上下文额度**
    *   **动态**：评论数 9。
    *   **分析**：即使用户将模型切换为 Sonnet 4.6，压缩指令仍在后台请求 1M 上下文模型，导致非高级额度用户无法使用自动压缩功能，影响长会话连贯性。
*   **[#65995](https://github.com/anthropics/claude-code/issues/65995) [bug] Claude Desktop 泄漏 pty 文件描述符导致系统级终端崩溃**
    *   **动态**：评论数 4。
    *   **分析**：macOS 桌面端存在严重的底层资源泄漏问题（长达 2 小时耗尽系统 pty），导致其他终端应用集体死亡，属于高优阻断级 Bug。
*   **[#68325](https://github.com/anthropics/claude-code/issues/68325) [bug] 孤立的 UTF-16 代理对彻底卡死会话**
    *   **动态**：评论数 3。
    *   **分析**：模型在输出 JSON 工具调用参数时生成了不合法的 UTF-16 字符，导致后续所有的 API 请求被 400 拦截，长耗时任务被迫作废。

### 3. 重要 PR 进展
今日仅有 2 个活跃的 PR，但质量颇高，集中在提升工作流健壮性与开发者体验：

*   **[#4943](https://github.com/anthropics/claude-code/pull/4943) feat: 添加主流 Shell 自动补全脚本**
    *   **内容**：为 `bash`、`zsh` 和 `fish` 引入了静态命令补全脚本。
    *   **意义**：大幅提升终端用户的 CLI 体验，减少记忆参数的成本。
*   **[#69916](https://github.com/anthropics/claude-code/pull/69916) fix: 修复 Triage 脚本静默退出问题**
    *   **内容**：修复了 `edit-issue-labels.sh` 脚本在未提供标签参数时直接静默 `exit 1` 的问题。
    *   **意义**：改善官方 Issue 自动化分类工作流的调试体验，防止机器人静默失败。

### 4. 功能需求趋势
通过对近期 Issues 的聚类分析，当前社区的需求方向呈现出明显的**企业级演进**和**资源管控**特征：
1.  **精细化成本管控**：开发者不满足于事后的 `/cost` 查看，要求将 Token 消耗、模型计费实时暴露给 Hooks 和状态栏（#11008, #59709, #50926, #69526），甚至在触发多智能体消耗前增加"确认提示"（#68703）。
2.  **MCP 权限与安全性**：随着模型连接的外部工具增多，权限管理与沙盒隔离成为痛点。例如 Windows 上 Cowork 虚拟机服务难以关闭（#57371），以及 macOS 上更新导致的局域网/SSH 被沙盒彻底阻断（#37994）。
3.  **企业云与生态认证集成**：AWS Bedrock 和 Azure Foundry 等企业级后端的深度适配仍是重点，包含扩展认证支持（#16128）和可观测性对接（OTEL 发射异常 #55984）。

### 5. 开发者关注点与痛点总结
*   **多智能体协同缺位**：目前的 Claude Code 倾向于单兵作战，社区迫切需要官方提供一种原生、低延迟的机制，让不同终端中运行的 Claude 互相同步上下文和派发任务（#24798）。
*   **跨平台打包健壮性**：官方对于主流环境的倾斜（如替换为原生 C 二进制）导致非标准 Linux 环境（如 Android/Termux）直接崩溃，同时 Windows 下映射盘符和残留进程清理（#63527, #53247）依然是顽疾。
*   **会话韧性不足**：开发者对"一次错误毁掉整个长会话"感到沮丧。无论是 API 鉴权问题、解析图片失败（#47391），还是今天暴露的 UTF-16 字符错误（#68325），都在呼吁 Claude Code 引入更具弹性的错误恢复与上下文自修复机制。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

这是一份为您生成的 2026-06-22 OpenAI Codex 社区动态日报。

# OpenAI Codex 社区动态日报 (2026-06-22)

## 1. 今日速览
今日 OpenAI 连续发布了两个 Rust 核心引擎的 Alpha 版本（v0.142.0-alpha.9/10）。社区方面，**gpt-5.5 模型在 Codex 中的 Token 消耗异常激增**引发了大量用户的强烈反馈，成为全场最热话题；同时，Windows 环境下“沙箱回归”及“后台静默消耗配额”的问题持续发酵。底层架构重构是今日 PR 的主旋律，开发团队正在大力推进会话运行时解耦、轻量化数据读取以及系统级代理架构的升级。

---

## 2. 版本发布
过去 24 小时内，Codex 核心组件发布了两个连续的迭代版本：
*   **rust-v0.142.0-alpha.9** ([Release Notes](https://github.com/openai/codex/releases/tag/rust-v0.142.0-alpha.9))
*   **rust-v0.142.0-alpha.10** ([Release Notes](https://github.com/openai/codex/releases/tag/rust-v0.142.0-alpha.10))
*(注：发布说明暂未附带详细 Changelog，预计主要为核心引擎的例行修复与底层优化。)*

---

## 3. 社区热点 Issues (Top 10)
以下是近期讨论最为激烈、最值得关注的社区问题：

1.  **[计费异常] gpt-5.5 Token 消耗暴增 10-20 倍** (👍197, 💬102)
    自 6 月 16 日起，Plus 计划用户发现 gpt-5.5 的单次 Token 扣费暴增，原本可支撑 20+ 次对话的 5 小时预算在 2-3 次交互后即耗尽。这是今日最严重的线上事故。
    🔗 [#28879](https://github.com/openai/codex/issues/28879)
2.  **[身份验证] 旧手机号死锁导致无法使用 Codex** (👍34, 💬57)
    遗留的验证机制要求用户提供已废弃的旧手机号验证码，且没有更改手机号的恢复途径，导致账号功能被锁死。
    🔗 [#25749](https://github.com/openai/codex/issues/25749)
3.  **[Windows 沙箱回归] 桌面端代理环境导致 apply_patch 失败** (💬12)
    在 Codex Desktop 26.616 版本中，当系统配置了全局代理时，`apply_patch` / `fs-helper` 等文件操作工具失效，用户被迫回退版本。
    🔗 [#29178](https://github.com/openai/codex/issues/29178)
4.  **[资源泄漏] macOS 桌面端持续生成 Crashpad 崩溃转储** (💬13)
    Codex Desktop 在后台以每天 5GB+ 的速度无限制生成 `.dmp` 崩溃文件，快速吞噬用户磁盘空间。
    🔗 [#25921](https://github.com/openai/codex/issues/25921)
5.  **[后台扣费] 空闲状态下额度持续下降** (💬16)
    用户观察到即使不主动使用 Codex，使用配额仍在缓慢减少。这可能与后台挂起的任务或“Chronicle 记忆生成”进程有关。
    🔗 [#26600](https://github.com/openai/codex/issues/26600) & [#28908](https://github.com/openai/codex/issues/28908)
6.  **[Git 污染] Codex 后台反复静默执行 `git add -A`** (💬3)
    桌面端应用在未请求用户的情况下重复执行 Git 暂存命令，导致 `.git/objects/pack` 体积异常膨胀。
    🔗 [#28750](https://github.com/openai/codex/issues/28750)
7.  **[性能优化提案] 将 RTK 集成入 CLI 以过滤终端噪音** (👍13, 💬12)
    开发者提议通过在 CLI 层面过滤 Shell 命令的冗余输出，从而减少传递给模型的上下文，预计可节省 60-90% 的 Token 消耗。
    🔗 [#19001](https://github.com/openai/codex/issues/19001)
8.  **[macOS 性能] Computer Use 触发系统进程 CPU 占用狂飙** (💬3)
    当启用 Computer Use 功能时，macOS 系统的 `syspolicyd` 和 `trustd` 进程 CPU 占用率飙升至 100%+，严重影响系统流畅度。
    🔗 [#28545](https://github.com/openai/codex/issues/28545)
9.  **[任务计费] 目标任务耗时统计存在严重偏差** (💬3)
    实际物理时间运行 15 小时的任务，系统却报告耗时 27 小时，并因此过度扣除了用户的 Credits/配额。
    🔗 [#28492](https://github.com/openai/codex/issues/28492)
10. **[插件生态] Canva MCP 成功执行但无预览渲染** (💬4)
    MCP 工具执行成功，但 Codex 桌面端无法正确渲染返回的 HTML 预览，仅显示空内容或报错。
    🔗 [#29210](https://github.com/openai/codex/issues/29210)

---

## 4. 重要 PR 进展 (Top 10)
今日的 PR 集中在底层架构解耦、配置优化与性能提升上：

1.  **[架构/环境] 迁移环境上下文至模型世界状态** ([#29249](https://github.com/openai/codex/pull/29249))
    引入了强类型的、可重放的环境状态表示法，以便更好地处理初始上下文和设置差异。
2.  **[架构/环境] 采样前刷新环境上下文** ([#29073](https://github.com/openai/codex/pull/29073))
    解决了远程环境启动较慢时，模型在当前回合收到“环境仍在加载”过期快照的问题。
3.  **[插件系统] 支持 npm marketplace 插件源** ([#29375](https://github.com/openai/codex/pull/29375))
    允许通过 `npm install` 从 npm 仓库拉取并实例化插件，极大扩展了 Codex 的工具生态接入能力。
4.  **[性能优化] 轻量级 SQLite 行加速 `thread/list`** ([#29355](https://github.com/openai/codex/pull/29355))
    将本地的会话列表请求路由至轻量级的 SQLite 投影，避免全量文件系统扫描，大幅提升长列表加载速度。
5.  **[性能优化] 无需延迟修复即可加速 `thread/resume`** ([#29357](https://github.com/openai/codex/pull/29357))
    通过在阻塞工作线程中解析 rollout 文件并复用历史记录，优化了会话恢复的速度。
6.  **[核心重构] Code-mode：将会话运行时与传输层解耦** ([#29292](https://github.com/openai/codex/pull/29292))
    提取了与传输无关的会话运行时，为后续将运行时托管于进程外协议服务铺平道路。
7.  **[核心重构] Code-mode：解耦单元创建与观察** ([#29290](https://github.com/openai/codex/pull/29290))
    确保在取消或终止单元时，挂起的会话写入不会被错误地后续可见，提升并发安全性。
8.  **[安全机制] 向客户端传播安全缓冲事件** ([#29371](https://github.com/openai/codex/pull/29371))
    打通 Responses API 的安全审查元数据，使得 app-server 客户端现在能够渲染“正在进行安全审查”的中间状态。
9.  **[配置管理] 激活通用托管层优先级配置** ([#28979](https://github.com/openai/codex/pull/28979))
    重构了配置优先级体系，支持系统级 Overlay 覆盖，并保留企业管理配置作为兜底。
10. **[网络代理] 添加共享认证系统代理契约** ([#26707](https://github.com/openai/codex/pull/26707))
    为后续的 Windows/macOS 原生系统代理解析奠定基础，统一了路由感知的鉴权边界。

---

## 5. 功能需求趋势
综合近期 Issue，社区最关注的功能演进方向如下：
*   **精细化的成本与配额控制**：随着 gpt-5.5 及基于使用量计费的推广，开发者强烈要求恢复 `/cost` 命令的可见性，并呼吁对后台任务（如记忆生成）进行成本上限限制。
*   **Token 降本增效机制**：用户自发寻找压缩上下文的方法（如 Issue #19001 提出的 RTK 命令行过滤方案），期望官方在 CLI 侧提供更智能的长输出截断与压缩。
*   **跨平台兼容性与沙箱稳定性**：Windows 环境依然是 Bug 重灾区（沙箱提权报错、补丁应用失败）；macOS 端则急需解决后台资源（文件句柄、CPU）的无序占用。
*   **工作空间与项目管理升级**：针对桌面端，社区希望能提供更原生的项目管理体验（如注册本地目录、跨项目转移会话线程）。

---

## 6. 开发者关注点（痛点总结）
1.  **计费与度量指标的信任危机**：gpt-5.5 的 Token 消耗异动以及“15小时任务被记为27小时”的 Bug，让重度订阅用户（Plus/Pro）对当前的计量体系产生了严重的信任担忧。
2.  **“幽灵进程”与静默资源消耗**：应用在后台不知疲倦地执行 `git add`、生成 Crash 日志、运行 Chronicle 模型，这不仅消耗网络 Token，还吃满磁盘和 CPU。开发者期望 Codex 更加“安静”和“克制”。
3.  **Windows 沙箱的脆弱性**：每次桌面端迭代，Windows 的沙箱机制（`CreateProcessAsUserW`、`apply_patch`）极易出现破坏性回归，导致核心编码流中断。这部分已经成为影响 Windows 开发者体验的最大绊脚石。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Gemini CLI 社区动态日报 (2026-06-22)**

### 1. 今日速览
今日 Gemini CLI 无新的稳定版发布，且 Nightly 构建遭遇失败。社区今日的焦点高度集中在**子智能体的稳定性与安全管控**上，多位开发者反馈了智能体挂起、误报执行成功以及未经授权执行破坏性命令的问题。此外，官方及社区贡献者今日提交了大量关于**会话恢复机制增强、GCP 权限校验和安全脱敏**的 PR，显示核心底层基础能力的加固是当前的重中之重。

### 2. 版本发布
* **无稳定版发布**。
* ⚠️ **构建异常**: [Issue #28087](https://github.com/google-gemini/gemini-cli/issues/28087) 报告了今日 `v0.49.0-nightly.20260622` 的 Nightly Release 工作流失败，官方已介入人工排查。

---

### 3. 社区热点 Issues (Top 10)
以下为本日最值得关注的 Issue，反映了当前系统的瓶颈与用户核心痛点：

1. **[P1] 通用智能体卡死无响应** | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
   * **关注点**: 当 Gemini CLI 调用通用智能体时，会无限期挂起（如简单的创建文件夹操作也会卡死）。这是严重影响体验的阻塞性 Bug。
2. **[P1] 子智能体达到最大轮次后伪装成“成功”** | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
   * **关注点**: `codebase_investigator` 触发 `MAX_TURNS` 限制中断后，仍报告 `status: "success"`，导致后续主智能体基于错误前提继续工作。
3. **[P1] Shell 执行卡在 "Waiting input"** | [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
   * **关注点**: 命令行工具执行完毕后，CLI 依然显示“等待用户输入”并卡死，暴露了核心 I/O 状态管理的缺陷。
4. **[P2] 防范智能体的破坏性行为 (如 Git reset)** | [#22672](https://github.com/google-gemini/gemini-cli/issues/22672)
   * **关注点**: 社区呼吁智能体在进行复杂的 Git 分支管理或 DB 维护时，应内置安全护栏，避免直接使用 `--force` 或 `reset` 等高危命令。
5. **[P2] Gemini 极少主动调用自定义 Skills 和 Sub-agents** | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)
   * **关注点**: 开发者反馈，即使上下文高度相关，模型也不会自动调用配置好的工具，这限制了 Agent 生态的可扩展性。
6. **[P2] 探索 AST 感知的代码读取与映射** | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)
   * **关注点**: 维护者发起讨论，评估引入 AST（抽象语法树）感知工具的可行性。这将大幅减少 Token 噪声并提升代码定位精度，是未来架构演进的重要方向。
7. **[P2] Auto Memory 存在泄露敏感信息的风险** | [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)
   * **关注点**: 后台提取代理在脱敏前，已将本地记录置于模型上下文中，可能导致密钥泄露。要求增加确定性脱敏机制。
8. **[P2] 工具数量 >128 时触发 400 错误** | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246)
   * **关注点**: 随着 MCP 生态扩展，用户加载的工具极易超过限制，系统需要更智能的工具作用域裁剪机制。
9. **[P2] GeminiCLI.com 登录鉴权失败** | [#28072](https://github.com/google-gemini/gemini-cli/issues/28072)
   * **关注点**: OAuth Token 交换失败导致大面积登录受阻，属于高优先级的入口可用性问题。
10. **[P2] ACP 模式下成本计算偏高** | [#27985](https://github.com/google-gemini/gemini-cli/issues/27985)
    * **关注点**: 在作为 ACP 服务器运行时，Usage 统计遗漏了 `cached` 和 `thought` tokens，导致客户端预估成本虚高。

---

### 4. 重要 PR 进展 (Top 10)
今日有多个针对系统健壮性和安全修复的 PR 推进：

1. **[Merged] 限制 Web 搜索

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

这份日报基于 2026 年 6 月 22 日的 GitHub Copilot CLI 社区数据生成。

### 1. 今日速览
今日 GitHub Copilot CLI 无新版本发布，社区焦点高度集中在**配额计费机制**与**安全沙箱/Hook 的实际可用性**上。多名开发者反馈官方文档与实际功能存在偏差，并在可观测性（如上下文耗尽提示、OpenTelemetry 成本指标）方面提出了强烈的优化诉求。

### 2. 版本发布
*过去 24 小时内无新版本发布。*

### 3. 社区热点 Issues
今日共有 8 个 Issue 更新，以下为最值得关注的动态：

*   **[#3881] 模型乘数与配额扣除计算异常** (NEW)
    *   **动态**: 开发者反馈在使用 6x 乘数的模型（Claude Sonnet 4.5）时，单次请求扣除了 5% 的配额而非预期的 2%。此类计费透明度问题直接影响用户的核心权益，需官方尽快核实修正。
    *   **链接**: [github.com/github/copilot-cli/issues/3881](https://github.com/github/copilot-cli/issues/3881)
*   **[#3687] Windows ARM64 高负载下进程崩溃 (BEX64)** 
    *   **动态**: 在 Windows Terminal 恢复多个标签页引发内存压力时，`copilot.exe` 会直接触发致命退出（0xc0000409）而非优雅关闭。稳定性 Bug 影响了重度 Windows 用户。
    *   **链接**: [github.com/github/copilot-cli/issues/3687](https://github.com/github/copilot-cli/issues/3687)
*   **[#3861] 沙箱网络隔离功能形同虚设且文档过度宣传** 
    *   **动态**: 官方 UI 和文档宣传支持基于主机的网络过滤（`allowedHosts` 等），但实际并不起作用。开发者呼吁官方“言行一致”，修正文档或修复功能。
    *   **链接**: [github.com/github/copilot-cli/issues/3861](https://github.com/github/copilot-cli/issues/3861)
*   **[#3874] VS Code 中 `preToolUse` Hook 拒绝指令失效** 
    *   **动态**: 试图通过 Hook 拦截特定危险命令在 VS Code 环境中无效。对于 AI 代理而言，权限拦截机制的失效是一个严重的安全隐患。
    *   **链接**: [github.com/github/copilot-cli/issues/3874](https://github.com/github/copilot-cli/issues/3874)
*   **[#3778] 请求通过 OpenTelemetry 暴露成本/计费指标** 
    *   **动态**: 开发者希望能像 Claude Code 一样，通过 OTel 追踪 Premium 请求的消耗情况。目前的指标仅包含 Token 数和延迟，缺乏直接的账单成本映射。
    *   **链接**: [github.com/github/copilot-cli/issues/3778](https://github.com/github/copilot-cli/issues/3778)
*   **[#3867] 缺乏上下文窗口使用量及压缩通知** 
    *   **动态**: 长会话中，Copilot 会静默进行上下文压缩，导致开发者对 AI 记忆丢失感到困惑。社区要求增加 Token 用量进度条。
    *   **链接**: [github.com/github/copilot-cli/issues/3867](https://github.com/github/copilot-cli/issues/3867)
*   **[#3871] 缺少列出已安装 Hooks 的管理命令** (已关闭)
    *   **动态**: 目前 MCP 服务器可通过 `copilot mcp list` 查看，但 Hook 却没有对应的管理入口。该问题已被官方关闭，可能已收录或修复。
    *   **链接**: [github.com/github/copilot-cli/issues/3871](https://github.com/github/copilot-cli/issues/3871)

### 4. 重要 PR 进展
今日仅有 1 个 PR 更新，且为无效内容：

*   **[#3880] beyond the streets of amaerica** (OPEN)
    *   **动态**: 这是一个无关的/疑似垃圾 PR，提交者 (@4tha588) 推送了一段不相关的 React 前端组件代码（`ArtistCard` 等），预计将被维护者迅速关闭。
    *   **链接**: [github.com/github/copilot-cli/pull/3880](https://github.com/github/copilot-cli/pull/3880)

### 5. 功能需求趋势
结合近期的 Issue 动态，社区需求呈现出以下三大趋势：
1.  **可观测性与计费透明化**：开发者迫切需要知道“我的请求花了多少钱”以及“上下文还剩多少空间”。对 OpenTelemetry 成本指标（[#3778](https://github.com/github/copilot-cli/issues/3778)）和 Token UI 指示器（[#3867](https://github.com/github/copilot-cli/issues/3867)）的呼声极高。
2.  **Agent 安全管控的闭环**：随着 Copilot 自动化执行能力的增强，开发者对沙箱网络隔离（[#3861](https://github.com/github/copilot-cli/issues/3861)）和工具调用拦截 Hook（[#3874](https://github.com/github/copilot-cli/issues/3874)）的依赖加深，但目前底层拦截能力的兑现度不足。
3.  **生态系统管理的对齐**：插件系统日趋复杂，但管理 CLI 命令不对等（如 MCP 有列表命令，Hooks 没有 [#3871](https://github.com/github/copilot-cli/issues/3871)），暴露出扩展机制设计上的短板。

### 6. 开发者关注点
*   **高级请求配额的计算逻辑**：针对多倍乘数模型（如 Claude Sonnet 4.5），单次请求扣除比例与理论计算值不符（[#3881](https://github.com/github/copilot-cli/issues/3881)），引发开发者对“暗中扣费”的担忧。
*   **文档与实际功能的严重割裂**：开发者指出官方将处于 Beta 或尚未生效的功能（如本地沙箱跨平台隔离）包装为生产可用，导致在构建安全防护时出现预期落差（[#3861](https://github.com/github/copilot-cli/issues/3861)）。
*   **极端环境下的内存管理**：在 ARM64 架构及并发开启多会话时，底层进程的抗压能力不足，直接导致工作流被迫中断（[#3687](https://github.com/github/copilot-cli/issues/3687)）。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

以下是为您生成的 2026-06-22 Kimi Code CLI 社区动态日报。

# Kimi Code CLI 社区动态日报 (2026-06-22)

### 1. 今日速览
今日 Kimi Code CLI 社区无新版本发布或代码合并，整体处于平稳迭代期。社区活跃度主要集中在功能规划与 Bug 暴露上：一方面，关于“跨会话持久化记忆系统”的长效功能需求继续引发开发者讨论；另一方面，有用户报告了在 ACP 模式下 MCP 服务器加载失效的阻塞性问题，需引起研发团队关注。

### 2. 版本发布
*今日过去 24 小时内无新版本发布。*

### 3. 社区热点 Issues
今日共有 2 条值得关注的 Issue 动态：

*   **[#1283] [需求] 跨会话的持久化记忆系统**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/issues/1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)
    *   **为何重要:** 这是一个自 2 月份提出至今仍在被持续讨论的长效需求。用户（@CatKang）希望 CLI 能够具备跨会话的上下文记忆能力，包括 AI 自动管理的笔记和用户自定义指令。这反映了开发者对 AI 编码助手从“单次问答”向“长期项目协作”进化的核心诉求。
*   **[#2464] [Bug] ACP 模式下无法加载 MCP 服务器**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/issues/2464](https://github.com/MoonshotAI/kimi-cli/issues/2464)
    *   **为何重要:** 此问题导致了在 macOS 环境下，Kimi Code CLI (v1.47.0) 的 ACP 模式与 MCP 工具生态发生断裂。参数 `--mcp-config-file` 在该模式下失效，直接阻断了依赖外部 MCP 工具的自动化工作流，属于影响范围较广的功能性缺陷。

### 4. 重要 PR 进展
*今日过去 24 小时内无新的 Pull Request 更新。*

### 5. 功能需求趋势
综合近期的 Issue 动态，社区当前最关注的功能演进方向如下：
*   **状态与记忆管理:** 开发者迫切需要 CLI 能够“记住”项目特征、历史偏好和上下文，以减少跨会话工作时的重复提示成本。
*   **MCP (Model Context Protocol) 生态兼容性:** 随着开发工作流日益复杂，开发者重度依赖 MCP 来扩展模型能力（如数据库查询、API 调用等）。确保 MCP 在各种执行模式（交互式、ACP 等）下的稳定运行和配置无缝衔接，已成为社区的刚需。

### 6. 开发者关注点
从今日反馈提炼，目前技术开发者在使用 Kimi Code CLI 时的核心痛点集中在：
*   **多模式运行的一致性体验:** 开发者期望无论是交互式终端、ACP 还是其他执行模式，CLI 的核心参数（如环境加载、工具注入）都能保持高度一致。环境差异导致的工具失效（如 Issue #2464）极大地影响了自动化体验。
*   **长期项目上下文的维护成本:** 在处理中大型项目时，频繁丢失上下文导致“AI 失忆”是核心痛点。开发者希望通过本地化的 Memory System 沉淀项目级规范和代码模式，从而提升 AI 生成代码的准确度和连贯性。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

这里是 2026 年 6 月 22 日的 OpenCode 社区动态日报。

### 1. 今日速览
今日 OpenCode 社区虽然没有发布新版本，但围绕**模型提供商兼容性**（如 DeepSeek、Qwen3 及 Zen 服务）、**API 用量监控**以及** TUI/客户端稳定性**的讨论非常热烈。开发团队合并了多个关键性修复，重点优化了 TUI 交互体验、无障碍访问（a11y）以及基础设施的代码重构。

### 2. 社区热点 Issues (Top 10)

*   **[FEATURE]: Go plan usage/balance API endpoint** [#16017](https://github.com/anomalyco/opencode/issues/16017)
    *   **关注点**: 强烈的需求（73 👍）。社区希望能通过公共 API 暴露 Go 计划的订阅使用数据，以便在仪表盘之外进行程序化监控。
*   **[UX] Ctrl+C should not exit OpenCode** [#7957](https://github.com/anomalyco/opencode/issues/7957)
    *   **关注点**: 痛点 UX 问题（37 👍）。在 Windows/Linux 下，用户习惯按 Ctrl+C 复制文本，但这会直接导致应用意外退出，社区呼吁修改此默认行为。
*   **Zen API "no provider available" 报错** [#30192](https://github.com/anomalyco/opencode/issues/30192)
    *   **关注点**: 影响核心功能的故障。用户在使用 OpenCode Zen 提供的 Claude Opus 4.6 模型时频繁报错，而其他模型正常。
*   **[FEATURE]: Support more DBMS' for OpenCode state storage** [#14212](https://github.com/anomalyco/opencode/issues/14212)
    *   **关注点**: 基础设施扩展（20 👍）。随着迁移到 Drizzle 进行会话存储，社区希望能支持 PostgreSQL 等更多关系型数据库。
*   **Zen API endpoints return 404 on CORS preflight** [#31041](https://github.com/anomalyco/opencode/issues/31041)
    *   **关注点**: 严重阻碍浏览器端调用的 Bug。所有 Zen API 接口在处理 OPTIONS 预检请求时返回 404 HTML 页面，导致前端客户端无法直连。
*   **Render process freezes/crashes when opening session with large diffs** [#33195](https://github.com/anomalyco/opencode/issues/33195)
    *   **关注点**: 桌面版（Electron）性能问题。处理大体积文件 diff（如 20KB+ 的乱码补丁）时，渲染进程直接卡死。
*   **Massive token spike causing quota exhaustion** [#26184](https://github.com/anomalyco/opencode/issues/26184)
    *   **关注点**: 成本与性能问题。在超长上下文（500k tokens）下使用 Deepseek V4 Pro 时，响应极慢且导致 Token 配额瞬间耗尽。
*   **@ file mentions do not include files created after startup** [#32747](https://github.com/anomalyco/opencode/issues/32747)
    *   **关注点**: TUI 文件检索 Bug。启动后新建的文件无法通过 `@` 提及，需要重启应用才能解决。
*   **DeepSeek provider: $ref/$defs in MCP tool schemas causes AttributeError** [#32829](https://github.com/anomalyco/opencode/issues/32829)
    *   **关注点**: 模型兼容性。DeepSeek 模型在处理 Asana 或 Notion 等 MCP 工具复杂的 Schema 定义时触发属性错误。
*   **Agents silently invoke premium-cost models without cost disclosure** [#30320](https://github.com/anomalyco/opencode/issues/30320)
    *   **关注点**: 隐形消耗。Agent 会静默调用 `gpt-5.4` 等高级计费模型，且无明确成本提示，极易耗尽维护者资助额度。

### 3. 重要 PR 进展 (Top 10)

*   **feat(server): runtime base path support for reverse proxy** [#28326](https://github.com/anomalyco/opencode/pull/28326)
    *   **进展**: 新增 `--base-path` 标志，使得 OpenCode Web 可以无缝部署在 Nginx 等反向代理之后。
*   **fix(a11y): remove aria-hidden from streaming assistant content** [#33139](https://github.com/anomalyco/opencode/pull/33139)
    *   **进展**: 无障碍优化。修复了流式输出时，屏幕阅读器（如 NVDA）无法读取助手内容的问题。
*   **fix(docker): handle sigterm & sigint** [#31624](https://github.com/anomalyco/opencode/pull/31624)
    *   **进展**: 修复了 Docker 环境下无法正确处理终止信号的问题，提升容器健壮性。
*   **feat(app): add server-keyed session routes** [#32570](https://github.com/anomalyco/opencode/pull/32570)
    *   **进展**: 引入 `/server/:serverKey/session/:id` 路由结构，优化多服务器环境下的会话管理。
*   **fix(core): fix mentions for files in hidden folders** [#32193](https://github.com/anomalyco/opencode/pull/32193)
    *   **进展**: 解决了 Issue #32126，允许在 `@` 提及中搜索和引用以 `.` 开隐藏文件夹中的文件。
*   **refactor(core): simplify integration test fixtures** [#33292](https://github.com/anomalyco/opencode/pull/33292)
    *   **进展**: 重大测试重构。将核心测试默认指向内存数据库（通过 Bun preload），提升 CI 执行效率。
*   **fix(tui): render skill load errors inline** [#33298](https://github.com/anomalyco/opencode/pull/33298)
    *   **进展**: 改进 TUI 错误提示。当 `/skills` 加载失败时，不再静默显示空列表，而是内联暴露错误信息。
*   **feat(core): port V1 fuzzy edit matching to V2 core edit tool** [#32761](https://github.com/anomalyco/opencode/pull/32761)
    *   **进展**: 将 V1 版本 9 种优秀的模糊替换策略移植到 V2 核心编辑工具中，增强 AI 修改代码的容错率。
*   **fix(opencode): set finish and time.completed in halt error handler** [#33056](https://github.com/anomalyco/opencode/pull/33056)
    *   **进展**: 修复了 ACP 服务器遇到 API 报错时，未正确设置终止状态导致前端 hang 住的问题。
*   **fix(tui): correct duration() days/hours calculation past 24h** [#33095](https://github.com/anomalyco/opencode/pull/33095)
    *   **进展**: 修复了计时工具在超过 24 小时后显示错误的 Bug。

### 4. 功能需求趋势

从近期的 Issue 和 PR 中，可以明显看出社区对 OpenCode 的演进有以下几个重点方向：
1.  **精细化 API 与可观测性**：开发者越来越关注底层状态的可获取性（如获取 Subscription 使用量的 API），以及 OTEL 链路追踪的自定义控制。
2.  **模型兼容与高级特性支持**：随着模型迭代加快，社区迫切要求 OpenCode 及时适配新模型特性（如 Cohere Command-A-Plus 更新、Qwen3.x 的 `thinking_budget` 思考深度参数支持）。
3.  **企业级部署与存储扩展**：向关系型数据库的迁移以及反向代理的支持，表明 OpenCode 正在被部署到更

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# 📰 Qwen Code 社区动态日报 (2026-06-22)

## 1. 今日速览
今日 Qwen Code 正式发布了 **v0.18.5 稳定版**及对应的 nightly 版本，重点修复了长程任务中由于重复调用工具导致的会话崩溃问题，并优化了安全审查机制。当前社区讨论热度最高的是**语音听写功能**的跨平台兼容性及**后台子代理**的生命周期管理。此外，多项关于 CI 集成测试基建和 UI 渲染体验的改进正密集合入。

## 2. 版本发布
**v0.18.5 稳定版** 已于今日发布：
- **核心修复**：强化了 Plan 模式（计划模式）的安全机制，现在需要用户显式 opt-in 才能执行特定 Prompt ([PR #5433](https://github.com/QwenLM/qwen-code/pull/5433))。
- **工程化**：实现了 VSCode 伴生插件在稳定版发布后的自动化发布流程。

---

## 3. 社区热点 Issues (Top 10)
以下是过去 24 小时内社区讨论最热烈的 Issues：

1. **[#4888](https://github.com/QwenLM/qwen-code/issues/4888) [Bug] IDEA 插件交互问答框失效 (👍0, 评论 10)**
   - **关注点**：在 IntelliJ IDEA 中，模型向用户提问时不显示问题文本，用户也无法输入，仅保留提交/取消按钮。该 UI 阻塞问题严重影响了 IDE 插件用户的正常交互。
2. **[#5019](https://github.com/QwenLM/qwen-code/issues/5019) [Bug] 长程任务中大量工具重复调用导致报错中断 (👍0, 评论 4)**
   - **关注点**：在处理复杂的长程代码任务时，模型陷入连续发起相同工具调用的死循环，最终触发 API 400 报错导致会话强制终止。
3. **[#5540](https://github.com/QwenLM/qwen-code/issues/5540) [Feature] 允许“复活”已完成的后台子代理 (👍0, 评论 3)**
   - **关注点**：当前后台子代理一旦完成或中断，就无法继续发送消息。社区希望能通过 `send_message` 唤醒已完成的 Agent，继续派发任务，这对长流程自动化至关重要。
4. **[#5431](https://github.com/QwenLM/qwen-code/issues/5431) [Feature] 为交互式提示添加可选的语音输入模式 (P1) (👍0, 评论 3)**
   - **关注点**：建议在终端 UI 中加入原生的语音听写模式，方便开发者在梳理复杂逻辑时通过说话代替大量键盘输入。
5. **[#5580](https://github.com/QwenLM/qwen-code/issues/5580) [Enhancement] 补齐语音输入缺失的原生预构建架构目标 (👍0, 评论 3)**
   - **关注点**：作为刚合入的语音听写功能的补充，指出当前 `audio-capture-prebuilds` 缺少对 `win32-arm64`、`musl/Alpine` 等环境的支持。
6. **[#5424](https://github.com/QwenLM/qwen-code/issues/5424) [Feature] 允许在 TUI 中审查外部注入的内容 (👍0, 评论 3)**
   - **关注点**：针对外部系统（如 CI 或 Hooks）向 Qwen 会话推送指令的情况，希望在 Agent 执行前增加一层 TUI 人工审查拦截机制，提升自动化安全性。
7. **[#5559](https://github.com/QwenLM/qwen-code/issues/5559) [Feature] 为无 Access Key 的集成测试提供假模型响应 (👍0, 评论 3)**
   - **关注点**：核心测试痛点。希望在 PR CI 阶段通过本地的 OpenAI 兼容假服务器重放固定的模型响应，以避免强依赖真实 API Key 导致的测试覆盖率低下。
8. **[#5562](https://github.com/QwenLM/qwen-code/issues/5562) [Bug] CLI 输入框换行时背景色渲染截断 (👍0, 评论 3)**
   - **关注点**：终端交互界面的 UI 细节 Bug，输入长文本换行时背景色无法自适应铺满，造成视觉割裂。目前已被关闭（已修复）。
9. **[#5555](https://github.com/QwenLM/qwen-code/issues/5555) [Bug] `--resume` 恢复会话后思考过程 预览截断 (👍0, 评论 3)**
   - **关注点**：使用 `qwen --resume` 恢复历史会话时，JSONL 中的思考数据明明完整，但在 CLI 中按空格预览时却发生渲染截断。
10. **[#5552](https://github.com/QwenLM/qwen-code/issues/5552) [Bug] OpenAI 鉴权模式下触发千问 OAuth 穿透 (👍0, 评论 2)**
    - **关注点**：配置为第三方 OpenAI 鉴权时，遗留的 `fastModel` 配置项可能会错误解析到硬编码的 Qwen OAuth 模型上，引发鉴权混乱。

---

## 4. 重要 PR 进展 (Top 10)

1. **[PR #5573](https://github.com/QwenLM/qwen-code/pull/5573) - fix(core): 常驻拦截连续相同的工具调用**
   - **内容**：完美对应 Issue #5019。将“连续相同工具调用”的检查从可选级别提升为**常驻守卫级别**，无论用户是否关闭了 loop detection，只要出现字节级相同的连续死循环调用就会被强制拦截。
2. **[PR #5502](https://github.com/QwenLM/qwen-code/pull/5502) - feat(voice): 集成原生捕获、流式传输和偏置的语音听写功能**
   - **内容**：重磅功能落地。支持长按或点击空格键进行语音录制与转写提交，底层采用了原生捕获和流式 WebSocket 传输。伴随该 PR，还产生了约 100 个针对跨平台和原生构建优化的 Review 意见。
3. **[PR #5557](https://github.com/QwenLM/qwen-code/pull/5557) - feat(core): 添加 Artifact 工具以发布交互式 HTML 页面**
   - **内容**：引入实验性的 `artifact` 工具，允许模型直接生成自包含的交互式 HTML 页面（如数据图表、小型网页），并自动在本地通过 `file://` 协议为用户打开。
4. **[PR #5126](https://github.com/QwenLM/qwen-code/pull/5126) - feat(vision-bridge): 针对纯文本模型自动进行图像到文本的转写**
   - **内容**：兼容性增强。当用户为纯文本模型（如部分旧版 Coder 模型）粘贴或 `@` 图片时，Qwen 会自动路由到一个具备视觉能力的模型转写为文字描述，再喂给纯文本模型，实现无缝向下兼容。
5. **[PR #5556](https://github.com/QwenLM/qwen-code/pull/5556) - feat: 可恢复的后台子代理及记录 TTL 机制**
   - **内容**：允许向已完成的后台子代理发送消息，系统会恢复其上下文并追加新指令；同时为不再活跃的后台代理记录引入了 TTL 自动清理机制。
6. **[PR #4943](https://github.com/QwenLM/qwen-code/pull/4943) - feat(cli): 新增 `--safe-mode` 标志**
   - **内容**：用于故障排查的利器。开启该标志将禁用所有的自定义配置（包括 Hooks、MCP Servers、Extensions、`QWEN.md` 上下文），提供一个绝对干净的基准测试环境。
7. **[PR #5560](https://github.com/QwenLM/qwen-code/pull/5560) - test(integration): 为无 AK 守护进程测试添加假 OpenAI 服务器**
   - **内容**：建立了轻量级的 Mock Server，支持流式、非流式响应及 `tool_calls` 重放，大幅降低 CI 阶段对真实 OpenAI/DashScope API Key 的依赖。
8. **[PR #5089](https://github.com/QwenLM/qwen-code/pull/5089) - refactor(core): 提取 Protocol 枚举并解耦模型身份与鉴权类型**
   - **内容**：底层架构重构。将 `AuthType` 从固定的 5 个枚举值改为 `string`，从而允许接入任意第三方提供商的 ID，不再将“模型协议”与“鉴权方式”强绑定。
9. **[PR #5030](https://github.com/QwenLM/qwen-code/pull/5030) - feat

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*