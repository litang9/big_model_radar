# AI CLI 工具社区动态日报 2026-07-13

> 生成时间: 2026-07-13 15:32 UTC | 覆盖工具: 7 个

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

以下是基于 2026-07-13 各大 AI CLI 工具社区动态为您整理的横向对比分析报告：

# 2026-07-13 AI CLI 工具生态横向对比分析报告

## 1. 生态全景
当前 AI CLI 工具已跨越单纯的“代码生成”阶段，全面演进为支持**多智能体调度（ACP）、上下文工程（MCP）与后台守护进程**的复杂自动化工作流平台。头部工具的竞争焦点正从“模型能力”转移到**架构稳定性、多平台与企业级鉴权集成、以及严密的安全沙箱机制**上。与此同时，开发者对**计费透明度、任务可观测性和长上下文精细化管理**的诉求达到了前所未有的高度，标志着 AI CLI 正在加速向企业级生产环境的核心基础设施渗透。

## 2. 各工具活跃度对比
今日各社区的工程推进力度与关注焦点呈现出明显差异，OpenAI 与 Qwen 处于高强度的功能重构与发布期，而 Anthropic 与 GitHub 则在着力解决稳定性与架构痛点。

| 工具名称 | 今日版本发布 | 热点 Issues 参与度 (Top 10) | 重要 PR 进展数 | 核心工程发力点 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | 无 | 高 (最高 68 评论) | 2 | 底层脚本修复、计费系统排障 |
| **OpenAI Codex** | **3个** (含 2 稳定版, 1 Alpha) | 高 (最高 52 评论) | 3+ | 紧急回滚 Guardian 回归、多智能体配置暴露 |
| **Gemini CLI** | **1个** (Nightly) | 极高 (多条 P1/P2 Bug) | **10+** | 核心死循环修复、AST 感知评估、依赖大规模瘦身 |
| **Copilot CLI** | 无 | 高 (聚焦系统级兼容) | 0 | (无代码合并，集中处理多 Agent 并发与鉴权断层) |
| **Kimi Code CLI** | 无 | 较低 (隐性痛点) | **9** | 跨工具(Claude)兼容、ACP/MCP 集成、Shell 容错 |
| **OpenCode** | 无 | 极高 (最高 190 👍) | **10** | 紧急适配 GPT-5.6 Luna、引入 OpenTelemetry |
| **Qwen Code** | **1个** (Desktop) | 中高 (聚焦架构 RFC) | **50+** (极高) | 多工作区守护进程架构演进、1.0 版本筹备 |

## 3. 共同关注的功能方向
透过各社区的 Issue 与 PR，以下四大方向已成为 AI CLI 工具演进的行业共识：

*   **多智能体通信与隔离 (ACP 架构)**：*涉及工具：Copilot CLI, Qwen Code, OpenAI Codex, Kimi CLI*。
    开发者已不满足于单线程对话，迫切要求子 Agent 与主 Agent 之间实现可靠的状态隔离、双向通信和模型细粒度覆盖配置（如 Codex PR #32749，Copilot #4106）。
*   **MCP 协议的健壮性与安全性**：*涉及工具：Claude Code, Copilot CLI, Gemini CLI, Kimi CLI*。
    针对 MCP 的 OAuth 令牌无法跨会话持久化、工具数量超限（如 Gemini 的 128 限制）、以及全局配置无法在 IDE 中生效等问题，各社区正在集中修复相关的上下文断层 Bug。
*   **自动化护栏与上下文安全**：*涉及工具：Claude Code, Gemini CLI, OpenCode*。
    随着 Agent 自主性提升，危险操作频发。社区强烈呼吁建立防破坏操作的沙箱（Claude Code 的删库与路径覆盖隐患），并要求解决长对话自动压缩（Compaction）引发的指令注入漏洞（OpenCode #36682）。
*   **用量追踪与可观测性**：*涉及工具：OpenCode, Copilot CLI, Claude Code*。
    企业级落地促使开发者要求精细的成本管控。多个社区在推进引入 OpenTelemetry（OpenCode #5245）以及通过 JSON 流式输出 Token 用量（Copilot CLI #4107），以接入 CI/CD 进行监控归因。

## 4. 差异化定位分析
*   **Claude Code**：**“重度工程与企业合规的探路者”**。主打超长上下文（1M Token）与高度自主的 Agent。目前正经历企业级落地的阵痛，核心解决 Bedrock SSO、多账号管理、高危指令拦截等合规与安全底线问题。
*   **OpenAI Codex**：**“模型前沿与桌面体验的融合者”**。极速跟进 GPT-5.6 等最新模型，强调 Guardian 自动审查和多智能体协同，但近期在 Windows 与 macOS 桌面端的系统级稳定性（如历史记录丢失、安全验证死循环）上面临挑战。
*   **Gemini CLI**：**“底层重构与架构治理的激进派”**。致力于解决 Agent 执行流的不稳定性（死锁、无限挂起），是今日唯一明确提出引入 AST（抽象语法树）进行代码深层理解，并对 Auto Memory 进行确定性脱敏的工具。
*   **GitHub Copilot CLI**：**“复杂多代理工作流的编排枢纽”**。深度绑定 GitHub 生态与开发者系统工具链。其痛点极具原生系统色彩，如 Linux V8 引擎并发崩溃、Snap 权限隔离、异步 Bash 轮询接管等，凸显其面向资深 Hacker 的定位。
*   **Kimi Code CLI**：**“生态包容与敏捷修复的实用主义者”**。走“拿来主义”路线（如直接兼容 `CLAUDE.md` 配置），极大降低迁移成本。将精力聚焦于打磨极致的 CLI 交互细节（如长命令智能超时、错误提示引导）。
*   **OpenCode**：**“极客驱动的通用 AI 运行时”**。社区极度活跃，焦点紧跟前沿模型（如 Luna 兼容）与泛化工具协同（如呼声极高的 Cursor CLI 集成）。强调可编程性（如 `/loop` 指令）和厂商无关的多渠道路由。

## 5. 社区热度与成熟度
*   **快速迭代与架构重塑期 (Qwen Code, Gemini CLI)**：Qwen Code 今日 PR 高达 50 余个，且正在筹备 1.0 发行计划，围绕“多工作区守护进程”进行大刀阔斧的重构；Gemini CLI 则通过 10+ 核心 PR 猛烈修复底层死锁和状态机 Bug，均处于极速狂奔阶段。
*   **高热度与痛点爆发期**：功能高度丰富引发了大量边界 Bug，社区讨论极其激烈（OpenCode 单 Issue 点赞近 200）。用户痛点已从“不好用”升级为“计费异常、安全失控、大规模重构”。
*   **维稳与架构静默期**：今日无代码合并，但关于 ACP 状态机和鉴权桥接的深度 Bug 报告频出，说明其闭源核心架构正在经历高负载下的韧性考验，开发团队可能正在内部进行大规模底层优化。

## 6. 值得关注的趋势信号（开发者参考）
1.  **“CLI 服务端化”趋势明确**：传统单次执行的 CLI 正在向后端常驻的“Daemon（守护进程）”演进（如 Qwen 的 `qwen serve`）。结合 ACP（Agent Client Protocol），未来的 AI CLI 将更多地作为后端算力大脑，同时为 VS Code, Zed, Web 甚至钉钉/飞书等多个前端提供并发服务。
2.  **长上下文压缩 是把双刃剑**：多个工具暴露了上下文压缩后的副作用——不仅是丢失关键代码信息，甚至会引发“指令注入”（模型将压缩摘要误认为新指令去执行）。**建议**：开发者在处理敏感或长周期任务时，应暂时禁用自动压缩，或手动切分会话。
3.  **配置文件大一统雏形**：Kimi CLI 兼容 Claude 配置标志着 AI 工具链正在出现“事实标准”的融合。**建议**：团队在进行 AI 工具基建时，应将提示词和规则定义抽离为独立的

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下是基于 anthropics/skills 仓库数据（截至 2026-07-13）的 Claude Code Skills 社区热点与技术生态分析报告：

### 1. 热门 Skills 排行（PR 篇）
由于当前提供的数据中 PR 评论数多为 `undefined`，本排行综合了 PR 的核心功能价值、底层优化深度以及对高频痛点的解决能力进行排序：

*   **1. document-typography (排版质量控制)**
    *   **功能**: 解决 AI 生成文档时的常见排版问题（如孤行、段尾遗留、编号错位）。
    *   **状态**: [OPEN]
    *   **热点解析**: 直击大模型生成长文本时的“视觉感”痛点，属于极具实用价值的细节增强 Skill。
    *   **链接**: [PR #514](https://github.com/anthropics/skills/pull/514)
*   **2. Meta-skills: quality & security analyzers (双擎分析器)**
    *   **功能**: 引入两个元技能，分别从五个维度评估 Skill 质量，以及扫描潜在安全隐患。
    *   **状态**: [OPEN]
    *   **热点解析**: 随着社区 Skill 数量激增，质量把控和安全性验证成为刚需，这两个 Skill 是天然的“基础设施”。
    *   **链接**: [PR #83](https://github.com/anthropics/skills/pull/83)
*   **3. testing-patterns (全栈测试模式)**
    *   **功能**: 提供全面的测试指导，包括测试理念、AAA 模式、单元测试及 React 组件测试。
    *   **状态**: [OPEN]
    *   **热点解析**: 补全了 Claude Code 在自动化测试生成和代码质量保障工作流上的关键一环。
    *   **链接**: [PR #723](https://github.com/anthropics/skills/pull/723)
*   **4. self-audit (四维度自审计)**
    *   **功能**: 在输出交付前进行机械文件验证和四维度的推理质量审计。
    *   **状态**: [OPEN]
    *   **热点解析**: 对应社区对于“减少大模型幻觉”的诉求，提供了一套标准化的输出质量门禁。
    *   **链接**: [PR #1367](https://github.com/anthropics/skills/pull/1367)
*   **5. color-expert (色彩专家)**
    *   **功能**: 处理各种颜色知识、命名系统（CSS, RAL等）及颜色空间转换。
    *   **状态**: [OPEN]
    *   **热点解析**: 专门强化前端设计和数据可视化任务中的颜色处理能力，具备很高的垂直专业性。
    *   **链接**: [PR #1302](https://github.com/anthropics/skills/pull/1302)
*   **6. frontend-design 翻新增强**
    *   **功能**: 优化前端设计 Skill 的清晰度和可操作性，确保指令在单次对话中能被精准执行。
    *   **状态**: [OPEN]
    *   **热点解析**: 提升基础大模型在前端 UI/UX 代码生成上的实际落地效果。
    *   **链接**: [PR #210](https://github.com/anthropics/skills/pull/210)

---

### 2. 社区需求趋势（基于 Issues 提炼）
通过分析社区讨论最热烈的 Issues，当前 Claude Code 生态的需求正向**企业级安全、跨系统协同及底层体验**演进：

*   **企业级安全与命名空间隔离**
    *   **趋势**: 开发者对 Skill 的权限滥用极度担忧。社区强烈要求解决第三方 Skill 冒充官方 `anthropic/` 命名空间的问题（[Issue #492](https://github.com/anthropics/skills/issues/492)），并呼吁引入 AI Agent 治理和审计机制（[Issue #412](https://github.com/anthropics/skills/issues/412)）。
*   **组织内共享与工作流集成**
    *   **趋势**: 个人开发转向团队协作。用户苦于目前只能通过文件手动分发 Skill，急需组织级别的 Skill 库或分享链接功能（[Issue #228](https://github.com/anthropics/skills/issues/228)）。
*   **跨平台兼容性（特别是 Windows 支持）**
    *   **趋势**: 大量 Windows 用户报告底层脚本（如 subprocess、编码处理、路径检测）存在严重兼容性问题，导致核心功能（如触发评估）完全失效（[Issue #1061](https://github.com/anthropics/skills/issues/1061)）。
*   **长文本与上下文记忆压缩**
    *   **趋势**: 面对长时运行的任务，Agent 自身笔记占用大量上下文。社区提出通过符号化标记来压缩 Agent 状态，以延长任务寿命（[Issue #1329](https://github.com/anthropics/skills/issues/1329)）。

---

### 3. 高潜力待合并 Skills（底层基建与核心 Bug 修复）
以下处于 [OPEN] 状态的 PR 解决了高优先级的系统级 Bug 或阻塞问题，极具近期落地的潜力：

*   **skill-creator 触发器与评估系统大修 ([PR #1298](https://github.com/anthropics/skills/pull/1298) / [PR #1323](https://github.com/anthropics/skills/pull/1323))**
    *   **价值**: 修复了导致所有 Skill 评估报告 `recall=0%` 的致命 Bug（[Issue #556](https://github.com/anthropics/skills/issues/556)），如果不合并此 PR，Skill 描述的自动优化循环将完全失效。
*   **Windows 兼容性底层修复 ([PR #1050](https://github.com/anthropics/skills/pull/1050) / [PR #1099](https://github.com/anthropics/skills/pull/1099))**
    *   **价值**: 解决了 Windows 平台下 Python 子进程调用（`claude.cmd`）和管道读取（`WinError`）的硬伤，直接打通了庞大的 Windows 开发者群体。
*   **YAML 解析与 UTF-8 字节长度校验修复 ([PR #362](https://github.com/anthropics/skills/pull/362) / [PR #361](https://github.com/anthropics/skills/pull/361))**
    *   **价值**: 解决了多字节字符（如中文）导致 CLI 崩溃的问题，并修复了未加引号的特殊字符导致的 YAML 静默解析错误。这对于非英语母语社区的健康发展至关重要。
*   **Eval 脚本项目污染修复 ([PR #1261](https://github.com/anthropics/skills/pull/1261))**
    *   **价值**: 修复了触发器评估在并发运行时，将大量临时测试文件写入用户活跃项目 `.claude/commands/` 目录的严重逻辑漏洞。

---

### 4. Skills 生态洞察
> **“当前社区在 Skills 层面最集中的诉求是：突破单机/英文/单次对话的初级阶段，全面构建包含跨平台兼容性（Windows 支持修补）、企业级安全信任边界（防命名空间越权）以及团队级高效分发流转的工业化 Agent 基础设施。”**

---

# Claude Code 社区动态日报 (2026-07-13)

## 1. 今日速览
过去 24 小时内，Claude Code 未发布新版本，但社区讨论依然热烈，核心焦点集中在**计费透明度争议**、**IDE 端多账号支持需求**以及**高危操作的权限控制**。此外，今日最新提交的 VSCode 扩展 v2.1.207 引发了一个 Bedrock SSO 认证失效的回归 Bug，值得开发者关注。

## 2. 版本发布
**无**。过去 24 小时内无新版本发布。

## 3. 社区热点 Issues (Top 10)
以下是近期社区讨论最为激烈、最具代表性的 10 个 Issue：

1. **[API Error: Server is temporarily limiting requests](https://github.com/anthropics/claude-code/issues/53915)** `(#53915)`
   - **动态**：评论数高达 68 条。
   - **简评**：Windows 和 VSCode 平台用户频繁遇到服务端限流（非个人额度限制）问题，导致 API 不可用。该问题已持续较长时间，严重影响开发体验，社区渴望官方给出根本解决方案。
2. **[Max plan Extra Usage charges during usage reporting outage](https://github.com/anthropics/claude-code/issues/29289)** `(#29289)`
   - **动态**：已被关闭。
   - **简评**：用户反馈在服务中断期间被静默扣除了高额的 1M 上下文额外费用。计费的不透明和潜在的系统漏洞引发了订阅用户的强烈不满。
3. **[Multi-account support in VSCode extension](https://github.com/anthropics/claude-code/issues/55621)** `(#55621)`
   - **动态**：获赞 40 次。
   - **简评**：多账号支持是高频需求，尤其是对于同时兼顾个人与企业 Anthropic 账号的开发者。该功能需求呼声极高。
4. **[Allow reordering/pinning of session groups in the sidebar](https://github.com/anthropics/claude-code/issues/70104)** `(#70104)`
   - **动态**：获赞 11 次。
   - **简评**：针对 Claude Code 桌面端 UI 的改进需求。用户希望能自由拖拽或置顶左侧边栏的会话分组，以提升多项目管理效率。
5. **[Extension 2.1.207 breaks Bedrock SSO auth](https://github.com/anthropics/claude-code/issues/77138)** `(#77138)`
   - **动态**：今日最新报告。
   - **简评**：今日刚更新的 VSCode 扩展 v2.1.207 导致了 AWS Bedrock SSO 认证的回归 Bug。目前受影响用户建议暂时回退至 v2.1.206。
6. **[Claude Code executed destructive database operation without user approval](https://github.com/anthropics/claude-code/issues/45463)** `(#45463)`
   - **动态**：已被关闭。
   - **简评**：Agent 自动执行了高危的 `dropdb` 命令且未请求用户授权，导致严重数据丢失。AI Agent 执行破坏性操作的“安全护栏”是开发者极其关注的红线问题。
7. **[Write/Edit tools silently accept relative paths](https://github.com/anthropics/claude-code/issues/38270)** `(#38270)`
   - **动态**：已被关闭。
   - **简评**：文件编辑工具静默接受相对路径（而非强制要求的绝对路径），可能导致 Agent 在无感知的情况下覆盖错误文件，涉及潜在的文件系统安全隐患。
8. **[Pro Max subscriber: quality regression cost me days of work](https://github.com/anthropics/claude-code/issues/46188)** `(#46188)`
   - **动态**：已被关闭。
   - **简评**：用户抱怨 Opus 4.6 模型在近期的代码生成质量上出现严重回退，导致额外的时间和经济损失，反映了模型版本稳定性对核心业务的直接影响。
9. **[Agent/subagent freezes indefinitely on Opus 4.6](https://github.com/anthropics/claude-code/issues/37521)** `(#37521)`
   - **动态**：已被关闭。
   - **简评**：在 Windows 平台使用 Opus 4.6 时，Agent 经常无报错地无限卡死，缺乏超时熔断机制让自动化工作流时常中断。
10. **[Cowork: custom MCP connector reports "needs authorization" on every session](https://github.com/anthropics/claude-code/issues/76453)** `(#76453)`
    - **动态**：今日仍在讨论中。
    - **简评**：自定义 MCP 连接器状态无法持久化，每次启动会话都要求重新授权，大幅削弱了 Cowork 环境下的 MCP 工具链体验。

## 4. 重要 PR 进展
过去 24 小时内仅有 2 个社区 PR 更新，均由 @AliAltivate 提交，主要聚焦于底层脚本与工具链修复：

1. **[fix(scripts): preserve existing labels when auto-closing duplicate issues](https://github.com/anthropics/claude-code/pull/76986)** `(#76986)`
   - **内容**：修复了 Issue 自动关闭脚本中，将 Issue 标记为重复时会意外覆盖并清除原有所有标签的 Bug。
2. **[fix(plugin-dev): read full multi-line description in validate-agent.sh](https://github.com/anthropics/claude-code/pull/76985)** `(#76985)`
   - **内容**：修复了 Agent 校验脚本只读取第一行描述内容的问题，现在能正确解析多行的 Frontmatter 信息。

## 5. 功能需求趋势
从近期的 Issue 动态中，可以洞察出社区对 Claude Code 下一阶段迭代的强烈期望：
* **账号与权限管理**：支持工作/个人账号无缝切换（IDE 多账号支持），以及针对破坏性指令（如删库）的严格二次确认机制。
* **云原生与容器化集成**：希望 Claude Code Web/云端会话能够直接复用仓库的 `.devcontainer` 作为执行环境（[#47856](https://github.com/anthropics/claude-code/issues/47856)），从而省去繁琐的脚本初始化。
* **MCP 协议健壮性**：改善 MCP Connector 在 Cowork 环境中的 OAuth 持久化体验，减少反复授权的摩擦。
* **界面与交互体验**：增强桌面端侧边栏（会话分组管理）的自定义能力，以及 CLI 终端环境下的鼠标点击选择支持。

## 6. 开发者关注点
综合分析开发者的高频反馈，目前的痛点集中在以下三个方面：
1. **计费与限流机制透明度**：订阅制用户（尤其是 Pro Max）对 1M 上下文的“隐藏扣费”及非自身原因导致的服务限流极其敏感，要求提升账单明细的实时性与准确度。
2. **安全防线的脆弱性**：随着 Agent 自主执行能力的提升，开发者发现其在“路径校验”和“高危指令拦截”上存在漏洞，亟需官方建立更严格的沙箱与默认拦截策略。
3. **稳定性回归**：扩展和模型更新（如 v2.1.207 和 Opus 4.6）引发的连锁反应（认证失效、无限卡死、质量下降）让重度用户感到疲惫，开发者呼吁官方加强发布前的回归测试覆盖。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

以下是 2026-07-13 的 OpenAI Codex 社区动态日报。

### 1. 今日速览
今日 OpenAI Codex 发布了 `v0.144.2` 与 `v0.144.3` 稳定版以及 `v0.145.0-alpha.7` 预览版，其中稳定版主要回滚了导致 Guardian 自动审查功能出现回归的提示词更新。社区今日高度聚焦于 Windows 桌面端的稳定性（崩溃与沙箱受阻）及模型容量限制导致的可用性下降，同时开发者在多智能体细粒度控制与跨平台 Provider 支持方面提出了明确需求。

### 2. 版本发布
*   **rust-v0.144.3**: 仅版本号更新，无合并代码变更。
*   **rust-v0.144.2**: **Bug 修复**。回滚了导致提示词回归的 Guardian 自动审查策略更新，恢复了之前的请求格式、审查策略和工具行为。([Full Changelog](https://github.com/openai/codex/compare/rust-v0.144.2...rust-v0.144.3))
*   **rust-v0.145.0-alpha.7**: 发布最新的 0.145 Alpha 预览版。

### 3. 社区热点 Issues
以下是今日最值得关注的 10 个 Issue：

1.  **[#20741](https://github.com/openai/codex/issues/20741) Codex Desktop 项目聊天记录消失 (52 评论)**: macOS 桌面端近期更新后导致历史记录丢失，影响严重，引发大量用户反馈。
2.  **[#28507](https://github.com/openai/codex/issues/28507) "Selected model is at capacity" 错误 (31 评论)**: Pro 用户频繁遭遇模型容量已满提示，反映系统承载力和限流策略存在问题。
3.  **[#1106](https://github.com/openai/codex/issues/1106) 请求实现可扩展 Provider 框架并支持 Google Vertex AI (14 👍)**: 社区强烈呼吁打破单一 API Key 限制，支持 OAuth/ADC 等复杂认证方式，接入更多第三方 LLM。
4.  **[#31984](https://github.com/openai/codex/issues/31984) 获取 Codex 手册脚本失败 (14 👍)**: 手册 URL 重定向至 `learn.chatgpt.com` 后丢失 `x-content-sha256` 头，导致内置 `openai-docs` 技能完全不可用。
5.  **[#32049](https://github.com/openai/codex/issues/32049) Windows 端 GPT-5.6 会话回退至 "Custom" (10 评论)**: Windows 桌面端出现严重回归，活动会话模型降级，新会话丢失 GPT-5.6 选项，且账号状态不一致。
6.  **[#32537](https://github.com/openai/codex/issues/32537) GPT-5.3 Codex Spark 因不支持的参数报错 (6 评论)**: Codex 错误地向 `gpt-5.3-codex-spark` 模型发送 `reasoning.summary` 参数，导致该模型完全无法使用。
7.  **[#14144](https://github.com/openai/codex/issues/14144) MCP OAuth 重新认证后旧 Token 仍被占用 (8 👍)**: 重新认证 MCP 服务器后，当前会话未刷新 Token，继续使用失效的 `invalid_grant` 报错，需重启应用。
8.  **[#32674](https://github.com/openai/codex/issues/32674) MultiAgentV2 限制子智能体模型覆盖 (5 评论)**: 原生 `spawn_agent` 工具的 schema 限制导致无法为子智能体单独指定模型和推理强度，降低了多智能体架构的灵活性。
9.  **[#26795](https://github.com/openai/codex/issues/26795) macOS 上 Codex 触发系统安全验证死循环 (4 评论)**: Codex 在 macOS 后台触发 `syspolicyd/trustd` 反复验证，导致 CPU 占用极高，严重拖慢 Xcode 和 Chrome。
10. **[#32809](https://github.com/openai/codex/issues/32809) Codex 陷入压缩循环耗尽额度 (2 评论)**: 桌面端在接收请求后反复执行“打招呼-压缩上下文”死循环，导致用户的 PLUS 额度被无效消耗。

### 4. 重要 PR 进展
以下是今日合并或更新的 10 个重要 PR：

1.  **[#32672](https://github.com/openai/codex/pull/32672) 回滚 Guardian 自动审查提示词更新**: 撤销了引发回归的提示词修改，恢复 Guardian 策略模板、请求布局和工具规范。
2.  **[#32749](https://github.com/openai/codex/pull/32749) 暴露多智能体 V2 衍生模型的覆盖配置**: 新增默认开启的设置，允许在 `spawn_agent` 工具中暴露 `model` 和 `reasoning_effort` 参数。
3.  **[#32746](https://github.com/openai/codex/pull/32746) TUI 中显式区分高级推理模式**: 为避免误触导致额度过快消耗，将 `Max` 和 `Ultra` 推理模式移至

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

这是一份为您定制的 2026-07-13 Gemini CLI 社区动态技术分析师日报。

---

# 📰 Gemini CLI 社区动态日报 (2026-07-13)

## 1. 今日速览
今日 Gemini CLI 发布了 `v0.52.0-nightly` 版本，主要修复了账户无 Code Assist 层级时的隐私提示问题。社区活跃度极高，核心讨论聚焦于 **Agent 执行死循环/挂起** 以及 **Auto Memory（自动记忆）的隐私与健壮性**。此外，开发团队今日合并了大量依赖更新，并提交了多个关键性 PR 以解决 Agent 状态死锁和配置合并崩溃等底层核心问题。

## 2. 版本发布
- **[v0.52.0-nightly.20260713.gf354eebaf](https://github.com/google-gemini/gemini-cli/releases/tag/v0.52.0-nightly.20260713.gf354eebaf)**
  - **更新亮点**：修复了一个隐私提示逻辑（`fix(privacy)`），当用户账户未配置 Code Assist 层级时，系统会显示更明确的提示信息（[PR #28304](https://github.com/google-gemini/gemini-cli/pull/28304)）。

## 3. 社区热点 Issues (Top 10)
以下为本期最值得关注的 10 个 Issue，反映了当前社区的核心痛点与期望：

1. **[P1 BUG] Subagent 达到最大轮次后伪装成功 ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323))**
   - **关注点**：`codebase_investigator` 触发 `MAX_TURNS` 后中断，却仍向主 Agent 报告 `status: "success"`。这会误导主控流程，隐藏了真实的执行失败。
2. **[P1 BUG] 通用智能体无限挂起 ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409))**
   - **关注点**：创建文件夹等简单任务导致 Agent 永久卡死（等待超 1 小时），禁用子代理才能解决。这是当前影响工作流最严重的 Bug 之一。
3. **[P1 BUG] Shell 命令执行后卡在 "Waiting input" ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166))**
   - **关注点**：执行简单的非交互式 CLI 命令后，终端挂起并误判为正在等待用户输入。
4. **[P2 FEATURE] 引入 AST 感知的代码阅读与映射 ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745))**
   - **关注点**：官方正在评估引入抽象语法树 (AST) 工具的可行性，以减少 Token 噪音，实现精准的单次调用读取方法边界。
5. **[P2 BUG] Auto Memory 陷入低信号会话无限重试 ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522))**
   - **关注点**：自动记忆系统对判定为低价值的会话无法标记为已处理，导致后台 Agent 反复提取相同的无用记录，消耗资源。
6. **[P2 BUG] 需要确定性脱敏并减少 Auto Memory 日志记录 ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525))**
   - **关注点**：安全痛点。目前 Auto Memory 会先读取本地记录（包含敏感信息）到模型上下文中后才进行脱敏，存在数据泄露风险。
7. **[P2 BUG] Gemini CLI 遇到 400 错误 (工具数量 > 128) ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246))**
   - **关注点**：当注入的 MCP 工具或本地技能超过 128 个时触发 API 限制，系统未能智能裁剪工具作用域。
8. **[P2 BUG] 浏览器 Agent 忽略 settings.json 配置 ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267))**
   - **关注点**：Browser Agent 运行时完全无视了全局或项目级别的 `maxTurns` 等关键覆盖配置。
9. **[P2 BUG] 模型频繁在随机目录创建临时编辑脚本 ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571))**
   - **关注点**：模型偏向使用 Shell 排他性执行，导致项目目录中散落大量编辑脚本，增加了代码污染和清理成本。
10. **[P2 BUG] 模型不够主动使用自定义 Skills 和 Sub-agents ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968))**
    - **关注点**：除非在 Prompt 中显式指令，模型基本不会自主调用上下文中配置好的专用技能（如 git/gradle skills）。

## 4. 重要 PR 进展 (Top 10)
开发团队与社区贡献者今日提交了多项核心修复：

1. **[P1 FIX] 防止事件驱动 Agent 状态转换陷入死循环 ([#28389](https://github.com/google-gemini/gemini-cli/pull/28389))**
   - 引入共享截止时间机制，这将直接修复令社区头疼的 Agent 挂起与无限循环问题。
2. **[P1 FIX] 限制 `tools.core` 通配符拒绝规则的作用域 ([#28388](https://github.com/google-gemini/gemini-cli/pull/28388))**
   - 修复了设置 `tools.core` 为空数组会意外禁用所有 MCP 工具的严重逻辑缺陷，引入了 `builtinOnly` 字段。
3. **[P2 FIX] 保护 `customDeepMerge` 免受循环引用攻击 ([#28387](https://github.com/google-gemini/gemini-cli/pull/28387))**
   - 修复配置文件存在循环引用（如 `obj.self = obj`）时设置管理器崩溃（`RangeError`）的问题。
4. **[P2 FIX] 修复 VS Code 插件激活资源追踪逻辑 ([#28386](https://github.com/google-gemini/gemini-cli/pull/28386))**
   - 修复了由于 JS 逗号表达式特性，导致部分插件注册的 Disposable 未被正确追踪而引发的内存泄漏。
5. **[P3 FEAT] 将直接 GCP 遥测导出器设为可选 ([#28275](https://github.com/google-gemini/gemini-cli/pull/28275))**
   - 从核心运行时依赖中移除了繁重的 GCP 监控/日志导出库，大幅精简了非 GCP 环境下的依赖体积。
6. **[P2 FIX] 为 Nix/NixOS 添加受信任的系统路径 ([#28256](https://github.com/google-gemini/gemini-cli/pull/28256))**
   - 将 `/nix/store` 加入白名单，修复 NixOS 等环境下 `rg` (Ripgrep) 等工具被误判为不受信任路径的兼容性问题。
7. **[P3 REFACTOR] 优化斜杠命令解析逻辑 ([#28262](https://github.com/google-gemini/gemini-cli/pull/28262))**
   - 使用预计算的 `WeakMap` 优化 Slash Command 的解析，实现 O(1) 查找，提升 CLI 响应速度。
8. **[FEAT] 升级 google-auth-library 至 10.9.0 ([#28385](https://github.com/google-gemini/gemini-cli/pull/28385))**
   - 修复底层鉴权与 gaxios 引发的异常问题，提升鉴权链路的稳定性。
9. **[CHORE] Nightly 版本自动化 bump ([#28384](https://github.com/google-gemini/gemini-cli/pull/28384))**
   - 推进今日的 `v0.52.0-nightly` 发布。
10. **[CHORE] 大规模依赖批量更新 (Dependabot) ([#28377](https://github.com/google-gemini/gemini-cli/pull/28377) 等)**
    - 包含 `puppeteer-core` (升级至 25.3.0)、`js-yaml` (升级至 5.2.1)、`undici` 等超过 74 个 npm 依赖的安全与版本同步更新。

## 5. 功能需求趋势
基于近期 Issue 讨论，社区对 Gemini CLI 的演进方向呈现出以下三大趋势：
- **代码理解深层化 (AST 集成)**：传统的纯文本检索与读取已无法满足复杂工程需求，社区强烈呼吁集成 AST 感知工具，让 Agent 能像 IDE 一样理解代码结构。
- **自主记忆与安全管控 (Auto Memory 增强)**：随着 Auto Memory 特性的落地，如何甄别低价值会话、如何在上下文传输前进行确定性脱敏、如何防止越界 Patch，成为官方重点攻克的方向。
- **沙盒与系统级安全隔离**：针对 Agent 偶尔触发的破坏性行为（如滥用 `git reset --force` 或乱写临时脚本），社区提议建立零依赖的 OS 沙盒环境与执行后意图路由机制。

## 6. 开发者关注点（核心痛点）
综合今日反馈，当前开发者在实际使用 Gemini CLI 时，最大的痛点集中在 **“执行流的不稳定性”

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**2026-07-13 GitHub Copilot CLI 社区动态日报**

作为专注于 AI 开发工具的技术分析师，以下是为您整理的今日 GitHub Copilot CLI 社区动态。

### 1. 今日速览
今日 GitHub Copilot CLI 仓库无新版本发布，也无代码合并活动，但社区讨论热度不减。开发者的核心焦点集中在**多代理并发调度（ACP/Subagents）**的稳定性和隔离性、**第三方 MCP 服务器及私有仓库的鉴权集成**，以及**跨平台（特别是 Linux 与 macOS）底层运行时的兼容性痛点**。

### 2. 版本发布
* **无** （过去 24 小时内无最新 Release）。

### 3. 社区热点 Issues （Top 10）
以下是今日最值得关注的 10 个 Issue，反映了当前工具链的核心痛点：

*   **[#4096] [Bug] 第三方 MCP 服务器 OAuth 令牌未桥接到 CLI 会话**
    *   **分析**：高优 Bug（👍 1）。在 UI 中通过 OAuth 连接 MCP（如 Atlassian）成功后，CLI 会话无法获取 Token 导致工具丢失。这反映了前后端会话状态同步存在严重断层。
    *   **链接**：https://github.com/github/copilot-cli/issues/4096
*   **[#4106] [Bug] ACP 丢失子代理源身份并扁平化并行输出**
    *   **分析**：核心架构问题。在 `copilot --acp` 运行多个同步子代理时，消息块的来源标识被抹除并直接混入父级流，这极大增加了开发者在复杂任务中调试和追踪 Agent 行为的难度。
    *   **链接**：https://github.com/github/copilot-cli/issues/4106
*   **[#4102] [Bug] Linux 原生 V8 在高并发工具调用和会话恢复时崩溃**
    *   **分析**：严重的平台稳定性问题。Linux x64 原生二进制文件在执行重度工具调用或恢复会话时，于 V8 引擎内部发生数组长度异常崩溃。这阻断了不少重度用户的连续工作流。
    *   **链接**：https://github.com/github/copilot-cli/issues/4102
*   **[#4024] [Bug] 语音模式 ASR 模型静默失败**
    *   **分析**：交互热度高（8 条评论）。所有内置的语音转文字（ASR）模型均路由失败导致转录内容为空。这表明多模态处理器在 Foundry Local Core 中的路由机制存在缺陷。
    *   **链接**：https://github.com/github/copilot-cli/issues/4024
*   **[#4103] [Bug] 插件市场克隆破坏 Git 凭据助手**
    *   **分析**：企业级痛点。从私有 HTTPS 仓库（如 Azure DevOps）添加插件时，CLI 会禁用系统的 Git 凭据助手导致拉取失败，这阻碍了团队内部插件的规范化分发。
    *   **链接**：https://github.com/github/copilot-cli/issues/4103
*   **[#4107] [功能请求] `--output-format json` 缺失 Token 与成本消耗**
    *   **分析**：强工程需求。目前 JSON 流式输出只有旧版字段，缺失 token 用量。开发者迫切需要与 OTel（OpenTelemetry）一致的数据以便进行 CI/CD 成本监控与归因分析。
    *   **链接**：https://github.com/github/copilot-cli/issues/4107
*   **[#4101] [Bug] `write_agent` 阻塞导致用户输入排队**
    *   **分析**：影响多 Agent 交互体验。向后台空闲 Agent 发送消息时，主进程会阻塞直到目标 Agent 真正开始处理，这违背了异步交互的预期。
    *   **链接**：https://github.com/github/copilot-cli/issues/4101
*   **[#4109] [Bug] Linux Snap 包 `/copy` 命令报错 "Connection refused"**
    *   **分析**：打包引发的生态兼容问题。Snap 沙箱未声明 x11/wayland 接口，导致剪贴板功能失效。这是 Linux 发行版分发时常见的权限边界问题。
    *   **链接**：https://github.com/github/copilot-cli/issues/4109
*   **[#4108] [Bug] macOS 下 LSP 启动导致 Python 图标常驻 Dock**
    *   **分析**：终端用户体验降级。Copilot CLI 启动 Python LSP 时将其注册为了 GUI 应用，对于追求极简的 CLI 开发者来说，这种 Dock 图标污染非常扰民。
    *   **链接**：https://github.com/github/copilot-cli/issues/4108
*   **[#1272] [Bug] Plan 模式下 AI 执行变更时 UI 不同步**
    *   **分析**：影响核心交互。在 Plan 模式确认执行后，Agent 实际已脱离计划模式，但 UI 仍停留在原态，导致开发者对当前 Agent 状态产生误判。
    *   **链接**：https://github.com/github/copilot-cli/issues/1272

### 4. 重要 PR 进展
* **无** （过去 24 小时内无更新的 Pull Request）。

### 5. 功能需求趋势
从近期 Issue 中，我们可以提炼出社区技术发展的三大核心趋势：
1.  **深度多代理编排**：开发者已不满足于单线程对话，正在大量尝试并行调度子代理（ACP）。需求已从“能用”转向“可控”，迫切需要身份隔离（[#4106](https://github.com/github/copilot-cli/issues/4106)）、非阻塞调度（[#4101](https://github.com/github/copilot-cli/issues/4101)）以及原生命令行参数化调用（[#4058](https://github.com/github/copilot-cli/issues/4058)）。
2.  **可编程性与可观测性**：随着 Copilot CLI 被更多纳入自动化流水线，社区强烈要求补齐 JSON 模式下的 Token 计费数据（[#4107](https://github.com/github/copilot-cli/issues/4107)），说明工具正在向企业级的生产监控阶段迈进。
3.  **多模态与企业生态拓展**：语音输入的底层重构需求明显（[#4024](https://github.com/github/copilot-cli/issues/4024)），同时，针对企业私有化场景（私有插件库 Git 认证、第三方企业 MCP 鉴权）的打通成为当前扩展生态的最大瓶颈。

### 6. 开发者关注点（痛点总结）
*   **状态机与生命周期的脆弱性**：无论是卡在“cancelling”状态（[#3267](https://github.com/github/copilot-cli/issues/3267)）、Plan 模式 UI 不同步（[#1272](https://github.com/github/copilot-cli/issues/1272)），还是后台 Agent 唤醒阻塞（[#4101](https://github.com/github/copilot-cli/issues/4101)），都暴露出 Copilot CLI 在处理复杂 Agent 状态流转时存在稳定性隐患。
*   **沙箱与原生系统权限冲突**：Linux Snap 的剪贴板权限缺失（[#4109](https://github.com/github/copilot-cli/issues/4109)）、macOS 后台进程意外成为 GUI 应用（[#4108](https://github.com/github/copilot-cli/issues/4108)），说明跨平台分发时的底层系统权限与进程属性管理仍需打磨。
*   **异步任务的逃生舱缺失**：开发者发现当 Agent 卡在带有 `delay` 的异步 Bash 轮询中时，用户标准的打断指令（Ctrl+x → b）失效（[#4110](https://github.com/github/copilot-cli/issues/4110)），这反映出在执行长耗时底层系统命令时，缺乏可靠的中断接管机制。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

以下是为您生成的 2026-07-13 Kimi Code CLI 社区动态日报。

# Kimi Code CLI 社区动态日报 (2026-07-13)

## 1. 今日速览
今日 Kimi Code CLI 社区无新版本发布及新增 Issue，但代码贡献非常活跃，共有 9 个核心 Pull Requests 取得了关键进展。今天的更新动态主要聚焦于**提升跨 AI 工具的兼容性**（如原生支持解析 `CLAUDE.md`）、**完善 IDE 客户端的 MCP/ACP 协议集成体验**，以及**修复多项影响开发者日常 workflow 的底层执行 Bug**（如长命令超时、状态丢失等）。

## 2. 版本发布
*本日暂无新版本发布。*

## 3. 社区热点 Issues
*过去 24 小时内无新建或更新的独立 Issue。但通过今日活跃的 PR 记录，我们可以追踪到近期社区反馈并正在被修复的几个核心隐性痛点：*

*   **跨工具配置无缝迁移需求 (#2401)**：社区希望 Kimi CLI 能够自动识别和复用项目中已有的其他 AI 配置文件，减少重复配置成本。
*   **新用户引导缺失 (#2456)**：新用户在通过 Homebrew 全新安装后，未登录直接执行命令时报错信息晦涩，缺乏下一步操作指引。
*   **复杂状态下的工具绑定冲突 (#2478)**：在使用 `/init` 等高级命令初始化实例时，会意外破坏现有 Session 的 plan-mode 状态绑定，影响正常交互。
*   **外部 IDE 集成能力受限 (#2464)**：当 Zed 或 JetBrains AI Assistant 通过 ACP 接入时，无法调用用户已配置好的全局 MCP 服务器，体验与本地终端割裂。

## 4. 重要 PR 进展
今日共有 9 个 PR 正在推进或待合并，以下是具体的功能与修复细节：

**功能增强与兼容性：**
*   [PR #2487](https://github.com/MoonshotAI/kimi-cli/pull/2487) **[feat] 兼容 Claude Code 配置文件**：新增对 `CLAUDE.md` 和 `.claude/CLAUDE.md` 的自动发现机制，方便从 Claude Code 无缝迁移至 Kimi CLI。
*   [PR #2490](https://github.com/MoonshotAI/kimi-cli/pull/2490) **[fix] ACP 服务器加载全局 MCP 配置**：修复了多会话 ACP 服务器无法加载用户全局 MCP 的问题，确保 Zed、JetBrains 等客户端能使用所有自定义工具，达到与本地交互一致的体验。

**执行逻辑与核心 Bug 修复：**
*   [PR #2200](https://github.com/MoonshotAI/kimi-cli/pull/2200) **[fix] 智能适配长耗时 Shell 命令**：针对 `git clone`、包安装、编译等常见慢命令自动延长 Shell 超时时间，默认常规命令仍保持 60s，避免长任务被误杀。
*   [PR #2489](https://github.com/MoonshotAI/kimi-cli/pull/2489) **[fix] 恢复 plan-mode 工具绑定**：修复了 `/init` 创建临时 soul 时，因共享 Agent 实例导致原有 plan-mode 核心工具（如 Write, ExitPlanMode）被错误覆盖的严重 Bug。
*   [PR #2493](https://github.com/MoonshotAI/kimi-cli/pull/2493) **[fix] 记录后台 Agent 任务启动时间**：修复了后台 AI 任务未记录 `started_at` 导致无法统计任务执行时长的问题，使运行时监控更加完善。
*   [PR #2259](https://github.com/MoonshotAI/kimi-cli/pull/2259) **[fix] 重定向 stdio MCP 标准错误流**：将 stdio MCP 子进程的 stderr 重定向至专属日志文件 (`~/.kimi/logs/mcp/`)，避免底层报错信息直接污染用户的交互终端。

**用户体验与细节打磨：**
*   [PR #2488](https://github.com/MoonshotAI/kimi-cli/pull/2488) **[fix] 优化新安装报错提示**：将晦涩的 `LLM not set` 报错改为具备可操作性的引导提示，指导用户执行 `kimi login`。
*   [PR #2492](https://github.com/MoonshotAI/kimi-cli/pull/2492) **[fix] 修复字符串截断宽度计算越界**：修正了工具链底层 `shorten_middle` 函数未将省略号 (`...`) 长度计算在内，导致 UI 显示超过目标宽度的排版问题。
*   [PR #2181](https://github.com/MoonshotAI/kimi-cli/pull/2181) **[fix] 补全 Windows 二进制版本信息**：为 Windows 构建产物注入标准 `FileVersionInfo`，满足企业环境对可执行文件版本元数据的安全审计要求。

## 5. 功能需求趋势
从近期的代码合并动向来看，Kimi CLI 社区的演进趋势呈现以下特征：
1.  **拥抱多 AI 生态融合**：工具链正在向通用型基础设施发展，兼容主流竞品（如 Claude Code）的配置文件将成为标配，降低用户迁移成本。
2.  **深化 IDE 与 Agent 协议集成**：ACP（Agent Client Protocol）与 MCP（Model Context Protocol）的结合是近期的重点，旨在让 Kimi CLI 能够更完美地作为后端 AI 大脑，赋能 Zed、JetBrains 等主流编辑器。
3.  **后台任务与多会话调度的健壮性**：随着用户将更复杂的任务交给后台 Agent 处理，精准的状态管理、时长追踪和日志隔离需求显著增加。

## 6. 开发者关注点
综合日常 PR 修复内容，当前技术开发者的核心关注点集中在：
*   **Shell 执行的边界容错**：开发者高度依赖 CLI 执行复杂工程操作，对超时机制、子进程日志接管等细节极其敏感，要求工具在处理长耗时命令和异步流时具备高稳定性。
*   **新用户上手摩擦**：社区十分看重“开箱即用”体验，对首次安装路径下的各种 Empty State（如未登录、未初始化）报错提示进行了持续的消歧和优化。
*   **状态与上下文不被污染**：在复杂操作（如初始化临时 Agent �

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**OpenCode 社区动态日报 (2026-07-13)**

### 1. 今日速览
今日 OpenCode 社区无新版本发布，但围绕**最新大模型（如 GPT-5.6 Luna）的兼容适配**以及**系统稳定性（如 TUI 卡死、内存泄漏）**产生了大量讨论。开发者对 Agent 自动化执行的安全控制（如上下文压缩导致的指令注入）表达了强烈关注，多条核心修复与 UI 体验优化的 PR 已被合并或正在积极审阅中。

---

### 2. 版本发布
* **无** （过去 24 小时内无新版 Release。）

---

### 3. 社区热点 Issues (Top 10)

*   **[#2072] Support for Cursor?** 👍 190 | 💬 75
    *   **关注点**：随着 Cursor CLI 的发布，社区强烈呼吁 OpenCode 提供原生集成支持，高居今日点赞榜首，反映了用户对多 IDE/CLI 协同工作的高需求。
*   **[#36140] GPT-5.6 Luna returns model not found with ChatGPT OAuth** 👍 99 | 💬 31
    *   **关注点**：最新内置模型 `gpt-5.6-luna` 在使用 ChatGPT OAuth 时报 404 错误。这是今日最紧急的兼容性 Bug，直接阻断了用户使用最新模型的体验。
*   **[#11112] Always stuck at “Preparing write...”** 👍 45 | 💬 75
    *   **关注点**：在部分环境下，工具执行持续卡在 "Preparing write..." 并被中断。该致命 Bug 影响了正常的工作流，讨论异常激烈。
*   **[#1302] Request to support Dynamic API keys** 👍 56 | 💬 13
    *   **关注点**：企业级安全需求。用户希望支持通过辅助脚本动态刷新 JWT Token 或 API Key，以适配企业内部的安全鉴权流转。
*   **[#18001] Implement /loop command for automated iterative task execution** 👍 39 | 💬 11
    *   **关注点**：高级自动化需求。用户希望内置 `/loop` 指令，减少冗长的自然语言提示，实现基于时间或事件的自动化循环任务。
*   **[#9281] Add unified usage tracking via /usage** 👍 31 | 💬 10
    *   **关注点**：成本管控需求。用户希望在 OAuth 登录后，能通过 `/usage` 统一查看各大模型提供商的配额和速率限制，避免超额。
*   **[#23655] Add Responses API support for Go service** 👍 18 | 💬 5
    *   **关注点**：底层架构演进。呼吁在 OpenCode 的 Go 服务中原生支持 OpenAI 最新的 Responses API。
*   **[#34215] Desktop app extremely slow/hangs at startup** 👍 6 | 💬 2
    *   **关注点**：严重的性能问题。由于历史记录中包含大量 Base64 编码的 PDF 附件，导致全局配置文件膨胀至 179MB+，使得桌面版启动时发生严重卡顿和内存泄漏。
*   **[#36682] [SECURITY]: Compaction summary injects actionable instructions** 👍 0 | 💬 2
    *   **关注点**：高危安全漏洞。在长对话自动压缩时，模型会将压缩摘要中的“下一步操作”视为用户指令，并在未经用户同意的情况下擅自执行，存在严重的指令注入风险。
*   **[#32634] System prompt 'continue or ask' text hardcoded** 👍 1 | 💬 2
    *   **关注点**：自主权控制。系统硬编码的提示词倾向于让 Agent“继续执行”，导致 Agent 采取激进的、消耗资源的自动动作，用户希望能干预此默认行为。

---

### 4. 重要 PR 进展 (Top 10)

*   **[#36685] & [#36143] fix(opencode): support Luna Responses Lite over OAuth** (已关闭/合并)
    *   **进展**：针对今日的热门 Issue #36140，该系列 PR 限定了 Responses Lite 请求契约仅应用于 `gpt-5.6-luna` 模型，并修复了基于 Codex OAuth 的兼容性问题。
*   **[#5245] feat: integrate OpenTelemetry** (开放中)
    *   **进展**：重磅功能引入。提议将 OpenTelemetry 追踪集成到 OpenCode 中，这将极大提升复杂任务链条下的可观测性，对大型项目调试意义重大。
*   **[#9545] feat(usage): unified usage tracking with auth refresh** (开放中)
    *   **进展**：针对 Issue #9281，添加了对四大 OAuth 提供商的内置使用量跟踪功能，进一步完善了成本可视化体验。
*   **[#35777] fix(core): refresh stale @latest npm package cache on load** (开放中)
    *   **进展**：核心机制修复。解决了插件配置为 `@latest` 时因本地缓存导致无法获取最新版本的问题。
*   **[#36665] fix: prevent UTF-8 corruption when stdout and stderr interleave** (开放中)
    *   **进展**：终端输出修复。解决了 Bash 工具合并 stdout 和 stderr 原始字节时，因多字节字符截断导致的 UTF-8 乱码问题。
*   **[#26861] fix(tui): Old messages disappearing during long sessions** (开放中)
    *   **进展**：TUI 体验大幅优化。引入了懒加载（滚动至顶部 5px 范围内时加载历史记录），修复了长对话中旧消息丢失的问题。
*   **[#36686] feat(app): cmd+k menu shows sessions on home page** (开放中)
    *   **进展**：桌面端 UI 优化。在主页唤起 Cmd+K 菜单时，现在会优先展示全局命令和会话记录，提高了检索效率。
*   **[#36626] fix(provider): tweak reasoning option driven max budget variants** (已关闭)
    *   **进展**：优化了基于 Token 预算的推理控制逻辑，为缺失最大值的模型默认分配 32,000 Token，提升了 Agent 推理深度的稳定性。
*   **[#36629] fix(xai): default store to false for Responses** (开放中)
    *   **进展**：修复了 xAI SDK 在多轮推理重水合时的状态丢失问题，确保其默认注入正确的上下文。
*   **[#36617] fix(opencode): support Luna with ChatGPT OAuth** (已关闭)
    *   **进展**：为 Luna 模型强制应用 Codex Responses Lite 契约，并在 Luna 会话期间保持稳定的 UUIDv7 亲和性，清理机制也得到了完善。

---

### 5. 功能需求趋势

1.  **跨工具/IDE 工作流融合**：以 Cursor CLI 集成请求（#2072）为代表，开发者不再满足于单一 AI 工具，

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Qwen Code 社区动态日报 (2026-07-13)**

### 1. 今日速览
今日 Qwen Code 发布了 `desktop-v0.0.5` 桌面端版本。社区动态高度聚焦于 `qwen serve` 守护进程架构的演进，尤其是多工作区支持与 ACP 协议的深度融合。此外，官方发起了 1.0 版本发布计划草案讨论，明确以“稳定 daemon + ACP 合规 + 流式可靠性 + 安全基线”为 1.0 核心目标。

### 2. 版本发布
*   **desktop-v0.0.5**: 桌面客户端发布更新。
    [查看更新日志](https://github.com/QwenLM/qwen-code/compare/desktop-v0.0.4...desktop-v0.0.5)

### 3. 社区热点 Issues
以下是今日最受关注的 10 个 Issues，反映了社区在架构、安全与体验上的核心诉求：

*   **[1.0 Release Plan — Draft Triage](https://github.com/QwenLM/qwen-code/issues/6821)** (1评论)
    *   **关注点**: 1.0 版本发布计划草案。目标定于 7 月底至 8 月初发布 v1.0.0，核心边界为稳定的 daemon/serve、ACP 协议合规、流式数据不丢失/不重复以及安全基线。
*   **[RFC: Support multiple workspaces in one qwen serve daemon](https://github.com/QwenLM/qwen-code/issues/6378)** (22评论)
    *   **关注点**: 核心架构演进。提议打破“1 daemon = 1 workspace”的现有模型，支持单守护进程承载多工作区，是走向多租户/多项目并发的关键一步。
*   **[Daemon mode (qwen serve): proposal & open decisions](https://github.com/QwenLM/qwen-code/issues/3803)** (25评论)
    *   **关注点**: 守护进程模式的整体设计蓝图。包含完整的 6 章节设计文档，跟踪实施进度及关键决策点。
*   **[Subagent和主会话之间的通信机制较弱](https://github.com/QwenLM/qwen-code/issues/5239)** (4评论)
    *   **关注点**: 多 Agent 架构痛点。开发者反馈子 Agent 挂掉后主会话无感知，缺乏双向通信与通知机制，亟需底层监控能力的升级。
*   **[Feature Request: Skill Context Lifecycle Management](https://github.com/QwenLM/qwen-code/issues/6762)** (4评论)
    *   **关注点**: 上下文 Token 优化。目前 SKILL.md 内容加载后常驻历史记录无法卸载，请求增加生命周期管理机制，支持压缩或卸载。
*   **[Mouse text selection broken: ScrollableList bypassVpGate forces SGR mouse tracking](https://github.com/QwenLM/qwen-code/issues/6808)** (4评论)
    *   **关注点**: 终端 UI 回归 Bug。Windows Terminal 下原生的鼠标拖拽文本选择失效，事件被 Qwen Code 截获，影响基础使用体验。
*   **[auto模式对三方api兼容异常](https://github.com/QwenLM/qwen-code/issues/6791)** (3评论)
    *   **关注点**: 模型集成兼容性。auto 权限请求分类器对 NewAPI 转发的 DeepSeek 及 MiniMax 官方模型存在兼容缺陷（如缺失 tool-choice 参数、thinking 标签透传异常）。
*   **[Feature: pinned/ memory directory - read-only files protected from /dream consolidation](https://github.com/QwenLM/qwen-code/issues/6801)** (2评论)
    *   **关注点**: 记忆管理。提议增加 `pinned/` 目录，用于存放关键只读记忆文件，防止其被 `/dream` 指令在整合记忆时意外覆盖或修改。
*   **[When using Ctrl-C to exit can end up with garbled terminal](https://github.com/QwenLM/qwen-code/issues/6776)** (3评论)
    *   **关注点**: CLI 稳定性。使用 Ctrl+C 退出时终端键位映射未正确清理，导致后续按键输出乱码（如 `9;5u`）。
*   **[Trust-status "preview" check mutates the cached trusted-folders config](https://github.com/QwenLM/qwen-code/issues/6831)** (1评论)
    *   **关注点**: 安全漏洞 (P1)。受信任文件夹的预览检查意外修改了模块级缓存配置，导致未确认的信任状态被持久化，存在安全隐患。

### 4. 重要 PR 进展
今日共有 50 个 PR 更新，以下 10 个代表了核心的功能迭代与修复：

*   **[feat(serve): support multi-workspace rewind and shell](https://github.com/QwenLM/qwen-code/pull/6826)**
    *   配合多工作区架构，使 rewind-snapshot 和 shell 会话路由能够解析对应的实际工作区运行时，而非仅依赖主运行时。
*   **[fix(review): stop dropping live blockers, and probe whether new tests actually gate new code](https://github.com/QwenLM/qwen-code/pull/6790)**
    *   修复 `/review` 技能的一个严重逻辑漏洞：防止其错误地提交“无阻断项”结论，并增加对新代码是否真正被测试覆盖的探查。
*   **[feat(serve): add extension management v2](https://github.com/QwenLM/qwen-code/pull/6825)**
    *   引入扩展管理 V2。将扩展构件保持在用户级别并跨工作区共享，激活策略变为可配置（全局默认+工作区特定覆盖）。
*   **[fix(channels): distinguish slash-command output](https://github.com/QwenLM/qwen-code/pull/6818)**
    *   优化 IM 渠道消息。将 ACP slash-command 的进度更新与模型最终输出区分开，避免将执行进度当作 AI 回复推送到钉钉等 IM 渠道。
*   **[feat(triage): add confidence score, sequence diagram, files overview, and review footer to PR comments](https://github.com/QwenLM/qwen-code/pull/6789)**
    *   增强 Triage 机器人的 PR 评论信号密度，新增置信度评分、时序图、文件概览等内容，提升 Code Review 效率。
*   **[fix(core): re-land malformed stream retry with narrower nameless detection](https://github.com/QwenLM/qwen-code/pull/6794)**
    *   重新引入针对畸形流式响应的重试机制，并收窄对“无名工具调用”的检测标准，避免合法响应被误判。
*   **[fix(cli): enable clipboard text and image paste on WSL2/Linux](https://github.com/QwenLM/qwen-code/pull/6829)**
    *   修复 WSL2/Linux 下 Ctrl+V 剪贴板粘贴失效问题，增加文本粘贴的回退逻辑，支持图文混贴。
*   **[feat(web-shell): modernize multi-workspace sidebar](https://github.com/QwenLM/qwen-code/pull/6804)** (已关闭)
    *   重构 Web Shell 侧边栏 UI，围绕项目和工作区层级优化，增加会话搜索、固定和归档分组功能。
*   **[feat(acp): expose tool-call preparation lifecycle](https://github.com/QwenLM/qwen-code/pull/6819)**
    *   为 ACP 协议增加工具调用准备生命周期。当 provider 确认工具 ID 和名称后即发出 `phase: preparing` 状态，提升流式响应的 UI 细致度。
*   **[feat(ci): add stale failure patrol](https://github.com/QwenLM/qwen-code/pull/6766)**
    *   新增定时 CI 巡逻任务（每 10 分钟一次），专门处理指向 `main` 分支的过期 PR 失败用例，提升 CI 整体流转效率。

### 5. 功能需求趋势
从近期 Issues 与 PR 中，可以清晰提炼出社区的四大关注趋势：
1.  **守护进程与多工作区架构**: 以 `qwen serve` 为核心，向单进程多工作区、多会话并发方向演进，同时完善 ACP Streamable HTTP 传输协议支持。
2.  **上下文与记忆精细化管理**: 随着任务复杂度增加，开发者对 Token 消耗愈发敏感。需求集中在 Skill 生命周期的动态卸载、`/compress` 后的 UI 状态同步，以及核心记忆的防篡改保护（`pinned/` 机制）。
3.  **多 Agent 协同与自动化工作流**: 呼吁增强主会话与 Subagent 之间的双向通信与容错监控能力；同时推进 `/goal`、`/review` 等长周期自动化原语的可靠性。
4.  **IM 渠道集成深化**: 将 Qwen Code 接入钉钉、飞书等渠道的“常驻型共享 Agent”需求增加，要求区分系统指令输出与模型输出，优化多人协作体验。

### 6. 开发者关注点
综合开发者直接反馈的痛点，以下问题最为高频：
*   **终端兼容性与渲染 Bug**: 终端环境（尤其是 Windows Terminal / WSL2）下的体验依然脆弱，鼠标选择失效、Ctrl+C 乱码、多行 Diff 预览排版错

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*