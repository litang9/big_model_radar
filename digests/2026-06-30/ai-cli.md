# AI CLI 工具社区动态日报 2026-06-30

> 生成时间: 2026-06-30 04:36 UTC | 覆盖工具: 7 个

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

基于 2026-06-30 各主流 AI CLI 工具的社区动态数据，为您生成如下横向对比与技术生态分析报告：

# 2026年 AI CLI 工具生态横向对比与技术趋势报告

## 1. 生态全景
当前 AI CLI 工具已全面跨越“尝鲜期”，**正以极快的速度向企业级生产力管线和复杂多 Agent 工作流渗透**。从各大巨头的动向来看，**企业级集中管控、跨平台深度兼容（尤其是 Windows/Linux 桌面端）以及底层安全沙箱隔离**已成为下半场竞争的核心壁垒。同时，围绕模型推理（如 Token 截断、上下文压缩死循环）和终端 UI（TUI）脆弱性的痛点，说明行业在追求功能前沿的同时，基础体验的工程化打磨依然面临巨大挑战。

## 2. 各工具活跃度对比
*(注：Qwen Code 因摘要生成失败，未纳入本次对比表)*

| 工具名称 | 今日版本发布 | 热点 Issues 数 | 活跃 PR 数 | 当前迭代焦点 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | v2.1.196 | 10 | 3 | 多会话通信、企业级模型管控、桌面端集成修复 |
| **OpenAI Codex** | v0.143.0-alpha.31 等 | 10 | 10+ | Git 沙盒安全、MCP 进程管理、GPT-5.5 Token 异常排查 |
| **Gemini CLI** | v0.51.0-nightly | 10 | 10 | 子代理稳定性、防沙箱逃逸、MCP Elicitation 能力 |
| **GitHub Copilot CLI**| v1.0.66-2 | 10 | 0 | 终端 UI 优化、企业托管配置、同名技能共存机制 |
| **OpenCode** | 无 | 10 | 10 | V2 架构重构、多模型路由适配、LLM 可观测性 Hooks |
| **Kimi Code CLI** | 无 | 1 | 0 | 移动端与桌面端跨平台输入交互优化 |

## 3. 共同关注的功能方向
通过交叉比对，当前社区高频诉求集中在以下四个维度：
*   **MCP (Model Context Protocol) 协议的深度工程化**
    *   *Codex* 与 *Gemini CLI* 正大力解决 MCP 服务器进程冗余、启动阻塞及空响应等底层健壮性问题。
    *   *OpenCode* 补齐了 MCP Prompts 支持，*Gemini CLI* 引入了更丰富的双向交互（form + url），*Copilot CLI* 则饱受 Windows 下 MCP 鉴权回归之苦。
*   **跨平台桌面端体验拉齐（特别是 Windows/Linux）**
    *   *Codex* 产生极高赞 Issue 强烈呼吁 Linux 原生桌面版；*Claude Code* 在 Windows 桌面端缺失核心标签页；*Copilot CLI* 和 *OpenCode* 均面临 v1.0.66 / v1.17.10 更新导致的 Windows 环境严重崩溃问题。
*   **企业级管控与合规要求**
    *   *Claude Code* 落地了组织级默认模型配置，并面临企业级 M365/AWS Bedrock 连接器需求；*Copilot CLI* 社区强烈呼吁打通企业本地 CLI 的集中式环境变量与配置分发。
*   **底层安全审批与沙箱隔离**
    *   *Codex* 收紧了 Git worktree 和 PowerShell 的执行白名单以防注入；*Gemini CLI* 强化文件写入护栏，防止 Agent 修改 `.gitconfig` 实现沙箱逃逸。

## 4. 差异化定位分析
*   **Claude Code**：**“深度集成与高阶工作流的首选”**。侧重于大型企业协同与多 Agent 并行开发（如 Cowork 标签、会话通信），技术路线偏向通过高阶模型（如 Opus 4.8）处理复杂推理，痛点在于大模型长会话畸变。
*   **OpenAI Codex**：**“底层重构与安全边线的守护者”**。正经历 Rust 底层架构的快速迭代，极度重视本地沙盒安全审批（文件系统、Git）。痛点聚焦在新型大模型（GPT-5.5）的 Token 消耗与推理截断异常。
*   **Gemini CLI**：**“子代理调度与前沿协议的试验田”**。高度关注 Agent 的行为可靠性与安全控制（拦截高危终端命令），同时也是 MCP 新规范（如 Elicitation）的最快跟进者。
*   **GitHub Copilot CLI**：**“开箱即用与插件生态的集大成者”**。依托 GitHub 生态，重心在同名技能共存、LSP 日志联动及企业级托管上。当前受制于终端底层渲染（TUI）脆弱的通病。
*   **OpenCode**：**“多模型聚合与开源定制引擎”**。核心价值在于支持各种自定义 Provider（OpenAI、Gemini、GLM 等），通过 V2 架构重构解决不同模型的工具调用差异，并侧重于提供全链路的 LLM 可观测性。

## 5. 社区热度与成熟度评估
*   **高频迭代与激战期**：**OpenAI Codex、Gemini CLI、OpenCode**。这三个工具的 PR 与 Issue 极度活跃，处于功能狂飙和底层剧烈重构的阶段（如 Codex 的安全白名单、OpenCode 的 V2 架构）。
*   **稳健发力期**：**Claude Code、GitHub Copilot CLI**。版本发布趋于平稳，主要精力放在解决企业级权限、跨端兼容以及 UI/交互细节的打磨上，拥有稳定且高要求的开发者基本盘。
*   **平稳维护期**：**Kimi Code CLI**。当前处于功能沉淀阶段，社区反馈聚焦于具体的交互痛点（如跨端键盘映射），等待下一波功能爆发。

## 6. 值得关注的趋势信号（开发者参考价值）
1.  **“安全权限”正在成为压倒一切的设计前提**：AI 正在接管越来越多的 Bash/终端执行权，但“误删代码”、“生物安全误报拦截”、“沙箱逃逸”频发。**建议：** 开发者在引入 AI CLI 时，必须强制配置 Git 只读白名单，并密切关注工具的破坏性指令拦截能力。
2.  **长会话“失忆”与“静默失败”是当前最大的开发摩擦**：无论是 Codex 的自动压缩丢失任务，还是 Agent 达到 MAX_TURNS 谎报成功。**建议：** 开发者不应盲目信任 Agent 的单次长任务执行结果，应在关键工作流中拆分任务，并善用 `/undo` 或 `/fork` 功能进行上下文备份。
3.  **Windows 生态的“二等公民”待遇正在改善但陷阱依旧很多**：多个主流工具在近期更新中踩雷 Windows 环境的端口占用、OAuth 鉴权和 Bun 段错误。**建议：** Windows 开发者在升级最新版 CLI 工具时应采取保守策略，或在 WSL2/Linux 虚拟机中进行核心开发。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

一份基于 anthropics/skills 仓库数据（截至 2026-06-30）的 Claude Code Skills 社区热点分析报告。由于提供的数据中 PR 评论数显示为 undefined，本报告主要结合 PR 的更新频率、影响范围以及相关 Issues 的热度（评论数）进行深度交叉分析。

---

### 1. 热门 Skills 排行（高影响力 PR）

基于 PR 涉及的核心功能、社区 Issue 关联度及其对生态的贡献，以下是最受关注的 Skills 动态：

1. **shodh-memory (持久化上下文记忆 Skill)**
   - **功能**：为 AI Agent 提供跨对话的持久化记忆管理，主动调取历史上下文。
   - **状态**：[OPEN] | 链接：[PR #154](https://github.com/anthropics/skills/pull/154)
   - **社区热点**：解决长对话中 Agent “失忆”的痛点，与社区高度探讨的 Agent 状态管理需求（如 Issue #1329）高度契合。
2. **skill-quality-analyzer & skill-security-analyzer (元技能)**
   - **功能**：对现有 Skills 进行五维度质量评估和安全审计。
   - **状态**：[OPEN] | 链接：[PR #83](https://github.com/anthropics/skills/pull/83)
   - **社区热点**：直接回应了社区对第三方 Skill 安全性的严重担忧（如 Issue #492 提到的命名空间信任漏洞）。
3. **self-audit (交付前四维自审 Skill)**
   - **功能**：在 AI 输出最终结果前，从完整性、一致性等四个维度进行自我审查。
   - **状态**：[OPEN] | 链接：[PR #1367](https://github.com/anthropics/skills/pull/1367)
   - **社区热点**：属于通用的推理质量门控，不受具体技术栈限制，旨在提升 Claude Code 生成代码的可靠性。
4. **document-typography (文档排版质量控制 Skill)**
   - **功能**：自动修复 AI 生成文档中的孤行、寡行、编号错位等排版瑕疵。
   - **状态**：[OPEN] | 链接：[PR #514](https://github.com/anthropics/skills/pull/514)
   - **社区热点**：补齐了 AI 生成 Word/PDF 等文档时最缺乏的“最后一公里”排版能力。
5. **ODT Skill (开放文档格式支持)**
   - **功能**：支持创建、解析和转换 ODT/ODS 等 OpenDocument 格式文件。
   - **状态**：[OPEN] | 链接：[PR #486](https://github.com/anthropics/skills/pull/486)
   - **社区热点**：补足了 Claude Code 在开源/ISO 标准办公软件生态中的操作能力。

### 2. 社区需求趋势

从高赞和高评论的 Issues 中，可以提炼出社区未来最期待的 4 个发展方向：

- **安全与信任隔离机制**：社区对 `anthropic/` 官方命名空间被滥用高度敏感（[Issue #492](https://github.com/anthropics/skills/issues/492)，32 评论），急需官方建立防止恶意 Skill 提权的安全沙箱或签名验真机制。
- **Agent 记忆与上下文压缩**：长程任务中的状态维护需求爆发，多位用户呼吁推出如 `compact-memory` 这样能将冗长笔记转化为紧凑符号表示的 Skill（[Issue #1329](https://github.com/anthropics/skills/issues/1329)）。
- **企业级与团队协作集成**：用户不再满足于单机使用，强烈要求实现组织架构内的 Skill 安全共享库，以及与 SharePoint Online (SPO) 等企业内网的权限对齐（[Issue #228](https://github.com/anthropics/skills/issues/228), [Issue #1175](https://github.com/anthropics/skills/issues/1175)）。
- **跨平台兼容性（特别是 Windows 支持）**：大量非 Unix 用户报告底层脚本（如 `subprocess.Popen` 调用、UTF-8 编码、YAML 解析）在 Windows 上严重水土不服（[Issue #1061](https://github.com/anthropics/skills/issues/1061)），呼唤更好的跨平台体验。

### 3. 高潜力待合并 Skills（近期有望落地）

以下处于 OPEN 状态的 PR 解决了系统级的阻断性 Bug，活跃度高且与官方核心工具链强相关，极有可能在近期合并：

1. **Skill 评估器阻断性修复 (run_eval.py 核心修复)**
   - **PR**：[#1298](https://github.com/anthropics/skills/pull/1298), [#1323](https://github.com/anthropics/skills/pull/1323)
   - **落地理由**：修复了 Skill 创建器在评估描述准确率时永远报 `recall=0%` 的致命 Bug（关联 [Issue #556](https://github.com/anthropics/skills/issues/556)）。这是官方工具链能正常迭代的前提，属于最高优先级。
2. **Windows 平台兼容性大修**
   - **PR**：[#1050](https://github.com/anthropics/skills/pull/1050), [#362](https://github.com/anthropics/skills/pull/362)
   - **落地理由**：系统性修复了 Windows 下的 `WinError 2` (PATHEXT 忽略)、管道读取崩溃以及 UTF-8 多字节字符引发的 Rust Panic。
3. **DOCX 书签 ID 冲突修复**
   - **PR**：[#541](https://github.com/anthropics/skills/pull/541)
   - **落地理由**：修复了使用官方 DOCX skill 添加修订记录时，因硬编码低级 ID 导致文档损坏的严重问题，属于关键 Bug 修复。
4. **Skill 校验器健壮性提升**
   - **PR**：[#539](https://github.com/anthropics/skills/pull/539), [#361](https://github.com/anthropics/skills/pull/361)
   - **落地理由**：解决了 YAML 描述中包含特殊符号（如 `:`, `#`）未加引号导致的解析静默失败问题，极大优化开发体验。

### 4. Skills 生态洞察

**一句话总结**：当前社区的核心诉求已从“增加单一功能型 Skill”全面转向**“构建企业级安全信任链、实现跨会话的长效记忆，以及解决 Windows 等异构环境的工程化顽疾”**。

---

一份为您定制的 Claude Code 社区动态日报（2026-06-30）。

# Claude Code 社区动态日报 (2026-06-30)

## 1. 今日速览
今日 Claude Code 发布了 v2.1.196 版本，重点引入了组织默认模型配置与更易读的会话默认命名。社区方面，多 Agent/多会话协同工作流成为高频讨论话题，同时模型（尤其是 Opus 4.8）在长会话中偶发的工具调用格式畸变引发了多处 Bug 反馈。此外，Chrome 浏览器扩展在跨平台（Windows/macOS/Linux）集成中的表现仍是开发者痛点。

## 2. 版本发布
**[v2.1.196](https://github.com/anthropics/claude-code/releases)** 
- **组织级默认模型支持**：管理员可在组织控制台设置默认模型。若用户未自定义，将在 `/model` 中显示为 "Org default" 或 "Role default"。
- **优化会话命名**：为初始会话添加了可读性更强的默认名称，方便用户在多会话并行时进行区分与管理。

## 3. 社区热点 Issues (Top 10)
以下为本期最值得关注的 10 个 Issue，反映了当前社区的核心诉求与痛点：

1. **[#20469](https://github.com/anthropics/claude-code/issues/20469) [增强] 个人版 Max 计划请求开放 M365 Connector**
   - **热度**: 58 评论 | 62 👍
   - **简析**: 个人高阶用户（Max 计划）强烈要求开放 Microsoft 365 连接器权限。目前该功能仅限团队和企业版，引发了关于定价与权限墙的激烈讨论。
2. **[#24798](https://github.com/anthropics/claude-code/issues/24798) [增强] 多 Claude 工作流会话间通信**
   - **热度**: 48 评论 | 18 👍
   - **简析**: 核心诉求。开发者在大型项目中并行运行多个 Claude Code 实例，急需这些“孤岛”会话能够实现直接通信与依赖排序，以构建高级的自动化工作流。
3. **[#48407](https://github.com/anthropics/claude-code/issues/48407) [Bug] Windows 11 桌面版 v1.2581.0 缺失 Cowork 标签页**
   - **热度**: 35 评论 | 16 👍
   - **简析**: 严重的平台特异性 Bug，Windows 用户在最新桌面版中无法看到 Cowork 标签，直接阻断了协同开发工作流。
4. **[#69238](https://github.com/anthropics/claude-code/issues/69238) [Bug] 触发 Advisor 时报 API 无响应**
   - **热度**: 30 评论 | 47 👍
   - **简析**: 当使用 Sonnet 作为基座触发 Advisor（通常调用 Opus 4.8）时，频繁报错 "No response from API"。影响高阶推理任务，受关注度极高。
5. **[#16128](https://github.com/anthropics/claude-code/issues/16128) [增强] Chrome 扩展支持 AWS Bedrock 认证**
   - **热度**: 26 评论 | 109 👍
   - **简析**: 企业级需求（获百赞）。大量基于 AWS 架构的组织要求 Chrome 扩展支持 Bedrock 身份验证，以符合内部安全与合规要求。
6. **[#63870](https://github.com/anthropics/claude-code/issues/63870) [Bug] Bash 工具调用以原始文本输出而非执行**
   - **热度**: 23 评论 | 36 👍
   - **简析**: 致命 Bug。在部分会话中，Bash 工具调用被错误地以 `<invoke>` 原始文本形式输出，导致命令未执行且被模型误认为“执行成功”，引发连锁错误。
7. **[#50423](https://github.com/anthropics/claude-code/issues/50423) [Bug] Linux VS Code 扩展无法加载 Chrome 浏览器工具**
   - **热度**: 16 评论 | 15 👍
   - **简析**: 文档与实际行为脱节。Linux 环境下 VS Code 扩展无法在聊天面板加载 Chrome 浏览器工具，尽管官方文档标明支持。
8. **[#69272](https://github.com/anthropics/claude-code/issues/69272) [增强] VS Code 扩展请求支持 `/fork` (对话分支)**
   - **热度**: 6 评论 | 1 👍
   - **简析**: 功能对齐需求。用户希望 VS Code 插件能像 CLI 一样，支持对话分支功能，以便在不丢失原上下文的情况下测试不同方案。
9. **[#66358](https://github.com/anthropics/claude-code/issues/66358) [Bug] 自动更新导致后台守护进程版本撕裂 (EAUTH)**
   - **热度**: 4 评论 | 3 👍
   - **简析**: 自动更新机制的隐患。后台 Agent 守护进程在会话中途自动升级，导致控制密钥版本不一致，拒绝附加（attach rejected）。
10. **[#71948](https://github.com/anthropics/claude-code/issues/71948) [Bug] 插件市场重载清空目录且无法重新克隆**
    - **热度**: 2 评论 | 0 👍
    - **简析**: 破坏性 Bug。由于内置加载器与 CLI 路径不一致，执行 `/reload-plugins` 会清空插件目录并报错，导致所有插件及 MCP 服务器加载失败。

## 4. 重要 PR 进展
*(注：过去 24 小时内更新的 PR 共 3 条，以下为详细解析)*

1. **[PR #72361](https://github.com/anthropics/claude-code/pull/72361) [已关闭/合并] 新增 Claude Gateway on GCP 部署资产

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

这是一份为您准备的 OpenAI Codex 社区动态日报（2026-06-30）。

### 1. 今日速览
今日 Codex 发布了 `rust-v0.143.0-alpha.31` 及常规维护版本 `rust-v0.142.4`。社区侧，**GPT-5.5 推理 Token 异常聚集**、**上下文压缩 失效**及**跨平台支持（尤其是 Linux/Windows）**引发了大量讨论。官方今日合并/推进了多达十余个针对 **Git 沙盒安全**和 **MCP 进程生命周期管理** 的 PR，显示出在工具链安全性与后台性能优化上的持续推进。

---

### 2. 版本发布
*   **[rust-v0.143.0-alpha.31](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.31)**：最新 Alpha 测试版，正在为下一个大版本迭代做准备。
*   **[rust-v0.142.4](https://github.com/openai/codex/releases/tag/rust-v0.142.4)**：稳定版小更新，无面向用户的新特性，主要为底层的常规维护。

---

### 3. 社区热点 Issues (Top 10)
以下为本期最受关注、反馈最强烈的 10 个问题：

1.  **[Linux 桌面端应用强烈需求]** | [#11023](https://github.com/openai/codex/issues/11023) | 👍 660 | 💬 133
    *   **动态**：社区强烈呼吁推出官方 Linux 桌面版应用。因 macOS 版存在高功耗问题，大量开发者希望能在 Linux 台式机上获得原生体验。
2.  **[GPT-5.5 推理 Token 异常聚集可能导致性能下降]** | [#30364](https://github.com/openai/codex/issues/30364) | 👍 29 | 💬 21
    *   **动态**：开发者发现 GPT-5.5 的 `reasoning_output_tokens` 离奇地高度集中在 516/1034/1552 等固定边界，疑似触发了长度截断，导致复杂任务推理能力下降。
3.  **[请求恢复 TUI 的 `/undo` 指令]** | [#9203](https://github.com/openai/codex/issues/9203) | 👍 307 | 💬 52
    *   **动态**：在 CLI 环境中，Codex 误删未纳入 Git 的新文件或修改内容后无法撤销。大量用户呼吁恢复 `/undo` 功能以防 micronation 数据丢失。
4.  **[使用内部模型 Lite 时报错不支持]** | [#30224](https://github.com/openai/codex/issues/30224) | 👍 20 | 💬 60
    *   **动态**：使用特定 Header (`X-OpenAI-Internal-Codex-Responses-Lite`) 请求 API 时频遭拒，影响自定义模型接入。
5.  **[macOS 端 SQLite 日志疯狂增长]** | [#29532](https://github.com/openai/codex/issues/29532) | 👍 7 | 💬 26
    *   **动态**：升级到 `v0.142.0` 后，高频的 TRACE 日志仍导致 `logs_2.sqlite` 及 WAL 文件疯狂增长，对 SSD 造成巨大写入压力。（Windows 端同样存在此问题：[#29674](https://github.com/openai/codex/issues/29674)）
6.  **[Windows 桌面端更新后持续崩溃/报错]** | [#29320](https://github.com/openai/codex/issues/29320) | 💬 26
    *   **动态**：Windows Insider Beta 用户更新后，应用只能显示 "Something went wrong…"，完全无法使用。
7.  **[长上下文压缩 丢失任务连续性]** | [#29356](https://github.com/openai/codex/issues/29356) | 💬 15
    *   **动态**：自动上下文压缩在摘要时丢失了关键操作步骤。开发者建议必须完整保留最近 5 步操作，否则长任务容易“失忆”跑偏。
8.  **[MCP Server 进程冗余堆积]** | [#21984](https://github.com/openai/codex/issues/21984) | 👍 4 | 💬 10
    *   **动态**：Codex CLI 每个 session 都会拉起配置的 MCP Server（如无头浏览器），即使不使用该工具也不会释放，导致内存和进程暴增。
9.  **[Windows 沙盒 helper 报错阻断写入]** | [#29200](https://github.com/openai/codex/issues/29200) | 👍 8 | 💬 20
    *   **动态**：Windows 桌面端每次调用 `apply_patch` 都会触发 `codex-windows-sandbox-setup.exe` 的错误弹窗，影响正常开发。
10. **[本地代码被误判为“生物安全风险”拦截]** | [#30634](https://github.com/openai/codex/issues/30634) | 💬 2
    *   **动态**：Codex 桌面端的安全审查机制过于敏感，对常规的本地软件开发任务频繁触发“生物安全”误报并强制阻断。

---

### 4. 重要 PR 进展 (Top 10)
官方近期在安全边界、网络通信和后台进程管理上提交了大量修复：

1.  **[安全] 对可执行 Git worktree 辅助程序执行失败关闭** | [#27914](https://github.com/openai/codex/pull/27914)
    *   修复了内部 Git worktree 操作可能执行恶意仓库配置的过滤器和合并驱动程序的漏洞。
2.  **[性能/日志] 避免将 WebSocket 请求体写入日志** | [#30651](https://github.com/openai/codex/pull/30651)
    *   专门解决 Issue #29532 的痛点，将 TRACE 日志中的大体积 WebSocket 请求体替换为字节长度，极大减少数据库写入。
3.  **[安全] 仅信任 Windows 系统自带的 PowerShell 解析器** | [#30628](https://github.com/openai/codex/pull/30628)
    *   防止恶意仓库通过伪造 `pwsh.exe` 路径在沙盒审批前执行恶意代码。
4.  **[体验] 允许在 MCP 初始化时进行 Review** | [#30509](https://github.com/openai/codex/pull/30509)
    *   解耦了 MCP Server 启动阻塞，允许用户在前台 MCP 服务还在启动时，就能开启或提交 `/review`。
5.  **[健壮性] 防止 tool-search rollout 中毒** | [#30618](https://github.com/openai/codex/pull/30618)
    *   修复了畸形的 `tool_search_call` 参数被持久化后，导致冷恢复时 Session 永久性卡死崩溃的问题。
6.  **[网络] 为 app-server WebSocket 添加 Token 认证** | [#30315](https://github.com/openai/codex/pull/30315)
    *   为本地 WebSocket 监听器强制添加 256 位安全 Token 验证，防止本地恶意脚本劫持。
7.  **[网络] 优化 Rendezvous WebSocket 活跃度检测** | [#30643](https://github.com/openai/codex/pull/30643)
    *   为 Noise 加密中继连接增加了 60 秒的 Pong 心跳上限，防止连接假死。
8.  **[安全] 要求对通用 Git 命令进行批准** | [#28714](https://github.com/openai/codex/pull/28714)
    *   取消了基于 `argv` 的“只读 Git”白名单，因为 `git status` 等命令仍可能被利用执行外部脚本。
9.  **[协议] 接受单向 MCP 消息的空 HTTP 响应** | [#30642](https://github.com/openai/codex/pull/30642)
    *   对于 JSON-RPC 通知或错误消息，允许将空的 `application/json` 视为成功，提高 MCP 通信兼容性。
10. **[体验] 统一 MCP ElicitationService** | [#30627](https://github.com/openai/codex/p

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

这是一份为您定制的 2026-06-30 Gemini CLI 社区动态技术分析日报。

# 🛠️ Gemini CLI 社区动态日报 (2026-06-30)

## 1. 今日速览
今日 Gemini CLI 发布了最新的 v0.51.0-nightly 每日构建版本。从社区动态来看，**子代理的稳定性与控制力**是今日的核心焦点，多个高优先级 Bug 集中反映了 Agent 挂起、执行破坏性操作以及忽略配置的问题。此外，PR 区在安全性加固（沙箱逃逸防护）和 MCP 协议扩展（Elicitation 能力）方面取得了重要进展。

## 2. 版本发布
*   **v0.51.0-nightly.20260630.gae0a3aa7b** 
    *   **类型**: 自动化每日构建版本
    *   **详情**: [查看 Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.51.0-nightly.20260629.gae0a3aa7b...v0.51.0-nightly.20260630.gae0a3aa7b)

## 3. 社区热点 Issues (Top 10)
今日 Issues 主要聚焦于 Agent 执行逻辑的边界缺陷及内存/日志管理的安全性。

1.  **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) [P1] Subagent 达到 MAX_TURNS 却谎报成功**
    *   *关注点*: `codebase_investigator` 子代理在达到最大轮次限制而中断时，依然向主代理返回 `status: "success"`，掩盖了失败事实，严重影响任务编排的可靠性。
2.  **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) [P1] 通用代理 无故挂起**
    *   *关注点*: 在执行如创建文件夹等简单任务时，通用代理经常无限期挂起，开发者被迫等待甚至重启，严重影响开发体验。
3.  **[#24353](https://github.com/google-gemini/gemini-cli/issues/24353) [P1] 强化组件级评估**
    *   *关注点*: 维护者提出了一个史诗级任务，旨在为当前支持的 6 个 Gemini 模型构建更健壮的行为评估测试，以从底层解决 Agent 行为不稳定的问题。
4.  **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) [P2] 探索 AST 感知文件读取与映射的影响**
    *   *关注点*: 社区探讨引入抽象语法树 (AST) 感知工具。这将极大减少 Token 消耗并提高代码分析的精准度，是未来底层能力升级的重要方向。
5.  **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) [P2] 模型极少主动使用自定义 Skills 和 Sub-agents**
    *   *关注点*: 用户反馈 Gemini 倾向于“亲力亲为”，除非明确指示，否则几乎不会主动调用配置好的子代理或特定技能，路由逻辑亟待优化。
6.  **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) [P1] Shell 命令执行完成后卡在 "Waiting input"**
    *   *关注点*: 执行极其简单的 CLI 命令后，终端状态未正确更新，导致系统死锁般的假死现象。
7.  **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) [P2] Auto Memory 的安全性与日志精简**
    *   *关注点*: Auto Memory 会读取本地记录并发送给后台模型，存在潜在的敏感信息泄漏风险。要求实现确定性的脱敏机制。
8.  **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) [P1] Browser subagent 在 Wayland 环境下失败**
    *   *关注点*: Linux 桌面用户报告浏览器代理在 Wayland 显示服务器协议下无法正常工作，跨平台兼容性受损。
9.  **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) [P2] 代理应当停止或阻止破坏性行为**
    *   *关注点*: 模型在处理 Git 分支或数据库维护时，有时会倾向于使用 `git reset --force` 等高危命令。呼吁引入安全护栏。
10. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) [P2] Browser Agent 忽略 settings.json 中的覆盖配置**
    *   *关注点*: `AgentRegistry` 虽然读取了全局或项目级别的配置（如 `maxTurns`），但运行时并未生效，导致配置隔离失效。

## 4. 重要 PR 进展 (Top 10)
今日 PR 主要围绕资源死循环控制、MCP 协议增强以及 IDE 集成展开。

1.  **[#28089](https://github.com/google-gemini/gemini-cli/pull/28089) [feat] 实现 MCP Elicitation (form + url) 能力**
    *   *进展*: 核心功能突破！为 MCP 客户端实现了 `form` 和 `url` 模式的主动提供能力，支持更丰富的双向交互规范。
2.  **[#28164](https://github.com/google-gemini/gemini-cli/pull/28164) [fix] 限制单次用户请求的递归推理轮次**
    *   *进展*: 强制限制单次请求最多进行 15 次递归推理，有效防止陷入死循环，保护本地 CPU 和 API 配额。
3.  **[#27971](https://github.com/google-gemini/gemini-cli/pull/27971) [fix] 解决 Thought Leakage (思考泄漏) 问题**
    *   *进展*: 修复了 Gemini 模型的内心独白/推理过程泄漏到纯文本历史记录中，导致后续上下文被污染的严重逻辑缺陷。
4.  **[#28215](https://github.com/google-gemini/gemini-cli/pull/28215) [security] 强化文件写入范围，防止沙箱逃逸**
    *   *进展*: 安全性修复！禁止在开启 auto-accept 时向工作区的 `.gemini/` 或 `.gitconfig` 写入文件，防止代理通过修改配置实现沙箱逃逸。
5.  **[#28096](https://github.com/google-gemini/gemini-cli/pull/28096) [fix] 在 SIGINT 取消后丢弃延迟的工具调用**
    *   *进展*: 用户按下 Ctrl+C 中断任务后，系统将丢弃流中后续到达的工具调用数据块，防止取消后仍有副作用发生。
6.  **[#28015](https://github.com/google-gemini/gemini-cli/pull/28015) [feat] 实现 Cloud Run Webhook 摄入服务**
    *   *进展*: 为 Caretaker Agent 引入 GitHub Webhook 入口，后续将实现 Issue 的自动化分类与处理。
7.  **[#28126](https://github.com/google-gemini/gemini-cli/pull/28126) [fix] 多行编辑摘要显示省略号**
    *   *进展*: 优化交互体验，当代码编辑跨越多行时，在 UI 展示中添加 `...`，避免用户将其误判为单行修改。
8.  **[#28099](https://github.com/google-gemini/gemini-cli/pull/28099) [fix] 修复底部沙箱标签显示问题**
    *   *进展*: 在 macOS 中应用 seatbelt 配置文件后，底部状态栏不再硬编码显示 "current process"，而是显示具体的沙箱执行标签。
9.  **[#28202](https://github.com/google-gemini/gemini-cli/pull/28202) [fix] 在应用重启期间转发 SIGINT/SIGTERM 信号**
    *   *进展*: 修复了 CLI 更新/重启时，子进程未能接收到终止信号而沦为孤儿进程的问题。
10. **[#28216](https://github.com/google-gemini/gemini-cli/pull/28216) [refactor] 从工作区上下文中排除临时的 CI 配置文件**
    *   *关注点*: 防止动态生成的 GitHub Actions 凭

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

这是一份为您生成的 2026-06-30 GitHub Copilot CLI 社区动态日报。

# 📰 GitHub Copilot CLI 社区动态日报 (2026-06-30)

## 1. 今日速览
今日 GitHub Copilot CLI 发布了 **v1.0.66-2** 版本，重点优化了插件生态（允许同名技能共存）与集成配置能力。社区活跃度较高，过去 24 小时内共更新了 29 条 Issues。当前社区的核心讨论焦点集中在 **终端 UI 渲染异常（alt-screen 与鼠标轨迹追踪）**、**Windows 平台下 MCP 服务器的启动与鉴权回归问题**，以及**企业级托管配置**的强烈需求。

---

## 2. 版本发布
### 🚀 [v1.0.66-2](https://github.com/github/copilot-cli/releases)
本次更新带来了多项实用功能增强：
*   **插件生态**：允许来自不同插件的同名技能共存，大幅减少插件冲突。
*   **集成拓展**：集成了读写 CLI 用户设置的功能，方便外部工具进行更深度的定制。
*   **调试体验**：现在可以在 `/lsp logs` 和 `read_agent` 中直接查看 LSP（语言服务器协议）日志。
*   **环境联动**：在 GitHub 仓库中检测到未安装 `gh` CLI 时，会主动提示用户安装。
*   **提示词渲染**：新增了 GitHub 附件变体支持。

---

## 3. 社区热点 Issues (Top 10)
以下是近期最值得关注的 10 个 Issue：

1.  **[OPEN] [#1799](https://github.com/github/copilot-cli/issues/1799) - 如何关闭 alt-screen 视图？**
    *   **关注点**：近期推出的 alt-screen 全屏视图引发了诸多适配问题，社区强烈要求能切回原始模式。该贴获得 7 个点赞和 10 条讨论，是当前的痛点之一。
2.  **[OPEN] [#3958](https://github.com/github/copilot-cli/issues/3958) - Windows: v1.0.66 启动 stdio MCP 服务器失败 (从 1.0.65 引入的回归)**
    *   **关注点**：严重回归 Bug。在 Windows 下，如果 MCP 命令是 `.bat`/`.cmd` 且带有参数，v1.0.66 会直接导致子进程崩溃，阻碍了 MCP 用户升级。
3.  **[OPEN] [#3909](https://github.com/github/copilot-cli/issues/3909) - 功能需求：企业/组织级服务器托管设置 (针对本地 CLI)**
    *   **关注点**：企业级管理需求。组织管理员目前无法集中向开发者的本地 CLI 推送配置（尤其是环境变量），这限制了大型团队的统一化管理。
4.  **[OPEN] [#3972](https://github.com/github/copilot-cli/issues/3972) - UI 经常显示代表鼠标移动的连续字符流**
    *   **关注点**：UI 渲染异常。首次加载时，界面会将鼠标的移动轨迹渲染为乱码字符流，严重影响首屏体验。
5.  **[OPEN] [#3948](https://github.com/github/copilot-cli/issues/3948) - web_fetch 工具报错: TypeError: fetch failed**
    *   **关注点**：核心工具失效。用户反映在没有代理或环境变量配置问题的前提下，所有的 `web_fetch` 请求均会失败，阻断联网查询工作流。
6.  **[OPEN] [#3973](https://github.com/github/copilot-cli/issues/3973) - Windows 下缓存保留端口导致 MCP OAuth 反复重试失败**
    *   **关注点**：Windows 平台兼容性问题。动态注册的 OAuth 环回端口若落入系统排除范围，会导致 MCP 鉴权陷入死循环。
7.  **[OPEN] [#2654](https://github.com/github/copilot-cli/issues/2654) - 本地同步模式下 `session_store_sql` 静默返回空值**
    *   **关注点**：逻辑漏洞。当用户设置“仅保留在本地设备”时，Agent 仍会调用云端查询工具但不提示本地存储为空，容易导致 AI 产生幻觉。
8.  **[OPEN] [#3936](https://github.com/github/copilot-cli/issues/3936) - Ctrl+G 应该在 `$EDITOR` 中展开粘贴的 token**
    *   **关注点**：交互体验优化。用户呼吁对齐 Claude Code 的行为，将压缩的粘贴块在编辑器中完整展开，而不是只显示 token。
9.  **[CLOSED] [#2364](https://github.com/github/copilot-cli/issues/2364) - [严重]: Copilot Agent 会话无限运行且无法停止**
    *   **关注点**：影响企业级仓库的严重 Bug，Agent 会卡在初始计划阶段无法推进，现已被关闭（可能已在近期修复）。
10. **[OPEN] [#3971](https://github.com/github/copilot-cli/issues/3971) - 功能需求：为仓库级会话提供完整的文件树浏览器**
    *   **关注点**：UI 功能增强。目前仓库级会话只能看到 Git Changes，社区希望像文件夹会话一样拥有侧边栏文件树，方便直接导航。

---

## 4. 重要 PR 进展
*过去 24 小时内，本仓库暂无活跃的 Pull Request 更新。推测目前核心团队的代码合并工作正处于 v1.0.66-2 发布后的缓冲期，或正集中精力对上述社区反馈的 Issue 进行分类（triage）与修复。*

---

## 5. 功能需求趋势
通过对近期 Issue 的提炼，社区当前最关注的功能演进方向如下：
*   **会话管理体验深化**：随着多会话场景增加，用户迫切需要**会话状态指示器**（[#3969](https://github.com/github/copilot-cli/issues/3969)）、**自定义标签过滤**（[#3970](https://github.com/github/copilot-cli/issues/3970)）以及明确的**会话过期策略展示**（[#3963](https://github.com/github/copilot-cli/issues/3963)）。
*   **企业级管控与合规**：企业用户强呼唤“本地 CLI 端的集中式配置分发”（#3909），希望打通云端与本地的环境变量与策略同步。
*   **插件与 MCP 生态容错**：随着插件数量增加，社区要求针对“同名 MCP/插件冲突”提供更明确的警告机制（[#3893](https://github.com/github/copilot-cli/issues/3893)），这与今日发布的 v1.0.66-2 解决同名技能共存的思路高度一致。
*   **跨工具兼容与对齐**：开发者在对比竞品（如 Claude Code），要求提升如外部编辑器（`$EDITOR`）交互（#3936）等基础体验的完整性。

---

## 6. 开发者关注点（痛点总结）
1.  **Windows 平台兼容性掉队**：近期关于 Windows 的负面反馈激增，尤其是针对 `.bat/.cmd` 启动 MCP 服务器的回归 Bug（#3958）以及保留端口导致的 OAuth 死循环（#3973）。Windows 开发者的尝鲜体验受阻。
2.  **终端 UI 渲染（TUI）脆弱性**：终端渲染问题频发，包括饱受诟病的 alt-screen 劫持（#1799）、触控板滑动选择异常（[#3957](https://github.com/github/copilot-cli/issues/3957)）、删除文本时的“幽灵字符”残留（[#3959](https://github.com/github/copilot-cli/issues/3959)），以及鼠标轨迹被渲染为乱码（#3972）。TUI 的稳定性已成为当前最大的用户痛点。
3.  **Agent 运行时的“静默失败”**：无论是本地同步设置导致数据库静默返回空值（#2654），还是 `web_fetch` 工具静默崩溃（#3948），都表明 Agent 在处理底层工具异常时缺乏向用户暴露错误的机制，容易造成“AI装死”或幻觉。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

**Kimi Code CLI 社区动态日报**
**日期**: 2026-06-30
**数据来源**: [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

### 1. 今日速览
在过去 24 小时内，Kimi Code CLI 仓库整体节奏平稳，无新增代码提交（PR）与版本发布。社区唯一的动态集中在交互体验的优化探讨上，一位开发者针对当前 CLI 在移动端和桌面端的“回车/换行”键位映射逻辑提出了优化建议，反映出社区对跨终端无缝使用 CLI 工具的高要求。

### 2. 版本发布
*过去 24 小时内无新版本发布。*

### 3. 社区热点 Issues
由于今日数据源仅更新了 1 条 Issue，该 Issue 即为今日的核心关注点：

*   **[#2479] [enhancement] Bad usage of return and enter for desktop and mobile** 
    *   **链接**: [https://github.com/MoonshotAI/kimi-cli/issues/2479](https://github.com/MoonshotAI/kimi-cli/issues/2479)
    *   **为何重要**: 跨平台兼容性与交互体验是开发者工具口碑的核心。该 Issue 指出当前版本的键位设计严重影响了移动端的可用性（Enter 直接发送导致无法换行），并增加了桌面端的操作门槛（需 Shift+Enter 换行）。这类基础输入交互问题如果得不到解决，会大幅增加开发者在多场景下的使用摩擦。
    *   **社区反应**: Issue 由 @Dealazer 于昨日创建，目前尚处于 OPEN 状态，暂无官方回复及其他开发者讨论，亟待维护团队评估并纳入后续的交互优化计划。

### 4. 重要 PR 进展
*过去 24 小时内无活跃的 Pull Request 更新。*

### 5. 功能需求趋势
从今日的 Issue 反馈中，可以提炼出以下社区功能关注方向：

*   **跨终端适配与移动端易用性**：开发者不再局限于在桌面终端使用 CLI 工具。当通过移动设备（如手机平板）进行 SSH 连接或直接操作时，传统的 CLI 交互逻辑（依赖电脑键盘组合键）往往会出现水土不服。**构建自适应不同物理键盘/虚拟键盘的输入机制**正在成为新的需求趋势。
*   **精细化键位映射**：社区期望能够拥有更灵活、更符合直觉的快捷键设置，例如区分“发送指令”与“文本内换行”的按键行为，或者支持用户自定义键位映射。

### 6. 开发者关注点
根据近期反馈，开发者在日常使用 Kimi Code CLI 时的主要痛点集中在以下方面：

*   **多行文本输入的门槛**：在编写复杂的 Prompt 或粘贴多行代码片段时，现有的换行快捷键逻辑（Shift+Enter）在部分场景下显得过于繁琐；而在移动端，这一操作更是几乎无法完成。
*   **移动端工作流受限**：随着移动办公需求的增加，开发者高度关注工具在移动端的可用性。任何导致“无法在手机上顺畅输入”的设计都会直接阻断移动端的使用场景。

---
*注：本日报基于 GitHub 过去 24 小时的数据生成。当前阶段项目处于相对平稳的维护期，期待后续在交互优化及跨平台支持方面有新的 PR 落地。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

这里是 2026 年 6 月 30 日的 OpenCode 社区动态日报。

# 📰 OpenCode 社区动态日报 (2026-06-30)

## 1. 今日速览
今日 OpenCode 社区未发布新版本，但围绕**系统稳定性、V2 架构重构及多模型适配**的讨论与代码合并异常活跃。Issue 端，`v1.17.10` 在 Windows 上的崩溃问题与底层的 Token 异常消耗引发了大量关注；PR 端，官方团队集中处理了 V2 版本的底层重构、MCP 协议支持，并引入了备受期待的 LLM 可观测性 Hooks。

## 2. 版本发布
*过去 24 小时内无新版本发布。*

## 3. 社区热点 Issues (Top 10)
以下是近期评论最多、社区关注度最高的 Issues，反映出用户在**模型调用延迟、版本稳定性和 Token 消耗**方面遇到较大挑战：

*   **[#29079](https://github.com/anomalyco/opencode/issues/29079) | GPT 模型响应耗时过长** (👍50, 💬118)
    *   **核心诉求**：用户反馈使用 GPT 5.4 (xhigh) 执行简单指令时，偶尔需要等待数分钟，严重影响开发体验。
*   **[#33742](https://github.com/anomalyco/opencode/issues/33742) | v1.17.10 在 Windows 上引发 Bun 段错误** (👍46, 💬48)
    *   **核心诉求**：`v1.17.10` 存在严重的退化问题，导致 Windows 环境下频繁崩溃，降级至 `v1.17.9` 可暂时缓解。此为高优 Bug。
*   **[#5674](https://github.com/anomalyco/opencode/issues/5674) | 自定义 OpenAI 兼容提供商配置丢失** (💬24)
    *   **核心诉求**：在 `opencode.json` 中为自定义 Provider 配置的 `baseURL` 和 `apiKey` 未能正确传递给底层 API 调用。
*   **[#10058](https://github.com/anomalyco/opencode/issues/10058) | Gemini 模型报错 "way too hot"** (💬15)
    *   **核心诉求**：切换上下文时 Gemini 频繁报错并中断请求，引发了对模型网关稳定性的讨论。
*   **[#30680](https://github.com/anomalyco/opencode/issues/30680) | 无限自动压缩循环并停止响应** (💬10)
    *   **核心诉求**：即使在空目录下，系统也会陷入死循环式的上下文压缩，耗尽 Token 且最终停止输出。
*   **[#34537](https://github.com/anomalyco/opencode/issues/34537) | 疑似 Bug 导致夜间异常消耗 80% Token** (💬3)
    *   **核心诉求**：用户反映由于后台请求持续报错并触发重试，一夜之间耗尽了大量配额，引发强烈痛感。
*   **[#33998](https://github.com/anomalyco/opencode/issues/33998) / [#31348](https://github.com/anomalyco/opencode/issues/31348) | GLM 系列模型 Prompt Cache 随机失效** (💬11)
    *   **核心诉求**：在 `opencode-go` 长会话中，GLM-5.1 和 5.2 的缓存 Token 随机掉底，导致成本骤增。
*   **[#11655](https://github.com/anomalyco/opencode/issues/11655) | [FEATURE] TUI 支持 LaTeX 渲染** (👍27, 💬4)
    *   **核心诉求**：社区强烈希望在终端界面（TUI）中原生渲染 LaTeX 数学公式。
*   **[#33696](https://github.com/anomalyco/opencode/issues/33696) | GitHub Copilot Provider 接入失效** (👍4, 💬5)
    *   **核心诉求**：授权完成后无法获取模型列表，Copilot 集成彻底罢工。
*   **[#31500](https://github.com/anomalyco/opencode/issues/31500) | 文档与 VS Code 插件安装指引问题** (💬4)
    *   **核心诉求**：在 VS Code 终端运行 `opencode` 无法自动安装扩展，且缺乏手动安装指引。

## 4. 重要 PR 进展 (Top 10)
当前 PR 活动重心集中在 **V2 架构打磨、模型差异化适配与 UI 细节优化**：

*   **[#33523](https://github.com/anomalyco/opencode/pull/33523) | feat: 新增 LLM 与 Session 可观测性 Hooks**
    *   **进展**：为插件 SDK 引入 4 个观测 Hooks，允许插件监听真实的 LLM 流、工具执行和 Agent 运行状态。极大增强了生态插件的可调试性。
*   **[#34531](https://github.com/anomalyco/opencode/pull/34531) | feat(core): 支持 MCP Prompts**
    *   **进展**：核心层实现对 MCP（Model Context Protocol）Prompt 定义和获取的解析支持。
*   **[#34204](https://github.com/anomalyco/opencode/pull/34204) | feat(tui): 支持折叠用户与助手消息**
    *   **进展**：在 TUI 会话视图中新增点击折叠功能，缓解长对话带来的屏幕空间占用。
*   **[#34558](https://github.com/anomalyco/opencode/pull/34558) | fix(core): 基于模型差异化网关 V2 编辑工具**
    *   **进展**：V2 架构开始根据模型 ID 智能选择工具：GPT 模型走 `apply_patch`，其他模型走 `edit/write`。
*   **[#34555](https://github.com/anomalyco/opencode/pull/34555) | fix(provider): 透传自定义模型的 Agent Temperature**
    *   **进展**：修复了自定义模型配置中 `temperature` 参数被意外丢弃的 Bug（对应 Issue #34554）。
*   **[#34552](https://github.com/anomalyco/opencode/pull/34552) | fix(core): 让 stderr Logger 识别 OPENCODE_LOG_LEVEL**
    *   **进展**：修复了日志系统无视环境变量直接输出所有级别日志的性能隐患。
*   **[#34547](https://github.com/anomalyco/opencode/pull/34547) | fix(ui): 修复工具状态切换时的空白帧**
    *   **进展**：优化了状态切换时的 DOM 测量与渲染时序，消除 UI 闪烁。
*   **[#34559](https://github.com/anomalyco/opencode/pull/34559) | refactor(core): 替换后台任务服务架构**
    *   **进展**：废弃原有的进程级后台任务 API，转向通用的 Job Service，将通知渲染

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*