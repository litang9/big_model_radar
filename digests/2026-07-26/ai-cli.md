# AI CLI 工具社区动态日报 2026-07-26

> 生成时间: 2026-07-25 21:07 UTC | 覆盖工具: 7 个

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

这是一份基于 2026 年 7 月 26 日六大主流 AI CLI 工具社区动态的横向对比与技术生态分析报告。

### 1. 生态全景
当前 AI CLI 工具整体正从“单一对话辅助”向**“长周期、多代理的自治工程平台”**演进，跨端协同（Web/移动端/IDE）与外部协议集成（MCP）成为标配。然而，随着任务复杂度的飙升，**多代理调度失控、长会话状态管理崩溃（如 OOM、上下文污染）、以及自动化执行引发的安全审查误判/越权**构成了当前生态的三大核心痛点。同时，底层工程架构正向更高性能与强隔离演进（如 Rust 化重构、OS 级沙箱、无锁化并发），行业正式进入拼稳定性和工程化落地能力的深水区。

### 2. 各工具活跃度对比
*(注：基于本期日报公开数据整理，反映各团队近 24 小时的开发重心与社区反馈量级)*

| 工具名称 | 版本发布动态 | 社区热点 Issues 数 | 重要 PR 进展数 | 核心动态/研发重心 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | v2.1.220 (修复版) | 10 | 2 | 模型路由静默回退排查、IDE 焦点控制优化、旧代码重构。 |
| **OpenAI Codex** | 4 个 Alpha 版 (Rust高频迭代) | 10 | 6+ | Windows 平台性能与兼容性大修、底层安全加固（凭证代理/帧限制）。 |
| **Gemini CLI** | 无 | 10 | 10 | AI 内部流水线建设、沙盒化安全执行、组件级行为评估体系。 |
| **Copilot CLI** | 无 | 10 | 1 | 长会话生命周期管理（OOM/压缩修复）、跨终端交互一致性。 |
| **Kimi Code CLI** | 无 (停留 1.44.0) | 2 | 4 | 会话状态持久化、上下文截断对齐、系统提示词热更新。 |
| **OpenCode** | v1.18.5 (模型修复) | 10 | 10 | 桌面端 UI 体验重塑、PTY 安全密码输入、TUI 性能千倍优化。 |
| **Qwen Code** | v0.21.0-nightly | 10 | 10 | CI 自动化验证流程、子代理动态模型分配、防破坏性 Git 操作拦截。 |

### 3. 共同关注的功能方向
综合各社区反馈，以下三大方向已成为全行业的共性需求：

*   **多代理与任务调度的精细化（Claude Code, Gemini CLI, Qwen Code）**
    *   **诉求**：开发者迫切需要系统能智能决定“何时”调用子代理，并允许针对不同子任务动态分配算力（如 Qwen 的动态模型层级选择）。
    *   **痛点**：目前普遍存在调度失控——Gemini 子代理无限挂起或误报成功，Claude 路由失效导致成本失控。
*   **长会话状态与记忆工程（Copilot CLI, Gemini CLI, Kimi Code CLI, Qwen Code）**
    *   **诉求**：长上下文下必须保证状态的一致性与低成本。Kimi 强调会话恢复时的配置热更新；Qwen 引入防篡改记忆目录。
    *   **痛点**：历史信息错误重传污染上下文（Kimi），或超长上下文撑爆 API 限制和内存（Copilot CLI 的 5MB CAPI 限制与 OOM 回归）。
*   **交互控制权与 UI 渲染稳定性（Claude Code, Copilot CLI, OpenCode, Qwen Code）**
    *   **诉求**：开发者极度反感工作流被打断。Claude 用户呼吁禁止面板抢占焦点；OpenCode 社区为旧版 UI 布局发声。
    *   **痛点**：终端 TUI 渲染存在多处盲区（Qwen 输入法光标错位、Copilot 滚动失效）。

### 4. 差异化定位分析

*   **Claude Code / OpenAI Codex**（企业级重型机）：**核心优势在于深度 IDE/系统底层集成**。Claude 聚焦于复杂多代理架构与高价值任务路由（尽管目前有 Bug）；Codex 则致力于重写底层（Rust 化重构）以彻底解决跨端调度的性能瓶颈与企业级凭证安全（虚拟凭证代理）。
*   **OpenCode / Qwen Code**（开源与高定制的先锋）：**主打极致透明与架构创新**。OpenCode 在终端底层交互上走得最深（如引入 PTY 拦截 sudo/ssh 密码、局域网自动发现模型）；Qwen Code 则在 Agent 工具层发力（引入沙盒化验证、动态目标快照）。
*   **Gemini CLI**（前沿架构的试验田）：**专注于底层能力的“ unleashed（释放）”**。不满足于简单的 API 包装，而是试图通过 AST（抽象语法树）感知和 OS 级零依赖沙箱，彻底释放 LLM 原生执行 Bash 脚本的能力，同时内部正大举推进 AI 驳回人类提交的自动化流水线。
*   **Copilot CLI / Kimi Code**（工作流无缝缝合怪）：**聚焦于生态闭环与多端协同**。Copilot 极度侧重于适配复杂的 Git 原生工作流（如 SSH 别名、worktree 清理）；Kimi 则将重心放在打破设备物理边界的云端无缝接续体验上。

### 5. 社区热度与成熟度

*   **高热度 / 高成熟度（Claude, Codex, Copilot）**：这三个工具拥有最庞大的 Issue 数量，反馈的 Bug 多为深层架构遗留问题（如 Windows 资源调度、大型仓库 OOM、订阅限额）。它们的社区讨论极具深度，已形成稳定的重度依赖用户群。
*   **高活跃 / 快速迭代期（Gemini, OpenCode, Qwen）**：PR 提交极其频繁，单日 PR 数量高达 10 个。多涉及核心模块的大胆重构（如 Gemini 的 AI 流水线、OpenCode 的无锁化重构）。它们处于功能急剧扩张、同时快速自我修正的阶段。
*   **平稳演进期**：今日节奏放缓，核心开发者聚焦于关闭底层状态管理的 Bug，解决特定场景的死循环与上下文截断错乱。

### 6. 值得关注的趋势信号

1.  **“静默失败”是摧毁开发者信任的最大杀手**：无论是 Claude 的模型静默降级、Copilot 的 `/ask` 无输出，还是 Gemini 代理的“虚假成功”，社区对“表面成功实则产生脏数据/破坏代码库”的容忍度已降至冰点。**强一致性校验和详尽的状态日志将是下一代 CLI 的护城河。**
2.  **安全边界正从“防御提示词”转向“OS 级物理隔离”**：OpenCode 暴露的挖矿木马注入事件，以及 Gemini 提议的“零依赖 OS 沙箱”，释放了一个强烈信号——依赖 LLM 自身判断安全性已不可靠。通过底层沙箱限制写入目录、网络访问和系统调用，将成为标配。
3.  **端侧算力调度的精细化（FinOps 进 CLI）**：Claude 的配额异常消耗和 Qwen 社区对 Token 实时监控的需求表明，开发者在 AI CLI 上的花费正显著增加。未来 CLI 工具必须具备类似云服务商的细粒度账单与按需降级路由能力。

**对技术决策者和开发者的建议：**
目前在生产环境中使用 AI CLI 时，务必开启严格的代码库备份机制，并在隔离环境（如 Devcontainer 或 OS 沙箱

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下是基于 `anthropics/skills` 仓库最新数据（截至 2026-07-26）生成的 Claude Code Skills 社区热点报告：

### 1. 热门 Skills 排行
虽然部分数据的评论数未被准确抓取，但综合 PR 的工程量和生态价值，以下是近期最受社区关注的新增 Skills：

*   **document-typography (PR [#514](https://github.com/anthropics/skills/pull/514))**
    *   **功能**：解决 AI 生成文档时的常见排版痛点（如孤行、寡行、编号错位）。
    *   **讨论热点**：开发者指出这些排版瑕疵严重影响了 Claude 输出文档的专业度，而用户往往不知道如何主动要求“好的排版”，因此需要一个底层默认介入的 Skill。
    *   **状态**：Open
*   **self-audit (PR [#1367](https://github.com/anthropics/skills/pull/1367))**
    *   **功能**：在 AI 交付输出前进行自审计，包含机械文件验证和四维推理质量门禁。
    *   **讨论热点**：迎合了社区对提升 AI 代码/项目交付可靠性的强烈诉求，将“事后检查”前置为“交付前拦截”。
    *   **状态**：Open
*   **testing-patterns (PR [#723](https://github.com/anthropics/skills/pull/723))**
    *   **功能**：提供全面的代码测试指南，涵盖测试哲学、单元测试、React 组件测试等。
    *   **讨论热点**：补齐了 Claude Code 在自动化测试生成与测试用例规范上的短板。
    *   **状态**：Open
*   **color-expert (PR [#1302](https://github.com/anthropics/skills/pull/1302))**
    *   **功能**：为前端设计和 UI 开发提供专业的颜色命名系统、色彩空间选择（OKLCH, OKLAB）及配色方案。
    *   **讨论热点**：受到前端开发者的欢迎，弥补了 LLM 在精确颜色控制上的不足。
    *   **状态**：Open
*   **ODT Skill (PR [#486](https://github.com/anthropics/skills/pull/486))**
    *   **功能**：支持创建、读取、解析和转换 OpenDocument 格式文件（.odt, .ods）。
    *   **讨论热点**：填补了 Claude Code 对开源/ISO标准文档格式支持空白，对企业级欧洲市场用户尤为重要。
    *   **状态**：Open

### 2. 社区需求趋势
从高互动的 Issues 中可以看出，社区的需求已从“单一功能实现”向“企业级安全、协作与可靠性”演进：

*   **安全信任边界与防伪 (Issue [#492](https://github.com/anthropics/skills/issues/492))**
    *   社区强烈反映第三方 Skills 滥用 `anthropic/` 命名空间，伪装成官方 Skill 以获取高权限。用户呼吁建立数字签名或严格的命名空间隔离机制。
*   **组织级共享与权限管理 (Issue [#228](https://github.com/anthropics/skills/issues/228))**
    *   用户苦于目前只能通过文件手动分发 Skills。社区期待在 Claude.ai 平台原生支持组织内部的“共享 Skill 库”及一键分发链接。
*   **上下文窗口优化与去重 (Issue [#189](https://github.com/anthropics/skills/issues/189))**
    *   安装不同官方插件包导致同名 Skills 重复注入，浪费宝贵的 Context Window。社区期待更智能的依赖管理和去重机制。
*   **Skill 开发者工具链可用性修复 (Issue [#556](https://github.com/anthropics/skills/issues/556))**
    *   Skill 优化工具 `run_eval.py` 因无法触发检测导致一直报告 `recall=0%`，大量开发者反馈这导致自动化优化脚本沦为“盲调”。

### 3. 高潜力待合并 Skills
以下处于 OPEN 状态的 PR 主要针对当前核心痛点的 Bug 修复，落地优先级极高：

*   **修复 Skill 优化器核心逻辑 (PR [#1298](https://github.com/anthropics/skills/pull/1298))**
    *   彻底修复 `run_eval.py` 始终报告 0% 召回率的问题，解决 Windows 下的流读取与并发问题。此 PR 若合并，将大幅提升所有开发者编写高质量 Skill 的效率。
*   **修复 DOCX 追踪修订导致文件损坏 (PR [#541](https://github.com/anthropics/skills/pull/541))**
    *   修复因 `w:id` 冲突导致带有书签的 DOCX 文档在修订时损坏的严重 Bug，提升了 Office 自动化的稳定性。
*   **修复多字节字符导致的底层崩溃 (PR [#362](https://github.com/anthropics/skills/pull/362))**
    *   用 UTF-8 字节长度校验替换原有的字符长度检查，解决了非英语（如中文）开发者在编写 SKILL.md 时引发的 Rust 底层 Panic 问题。
*   **PDF 引用大小写敏感修复 (PR [#538](https://github.com/anthropics/skills/pull/538))**
    *   修复 PDF Skill 中文件引用的大小写不匹配问题，保障在 Linux 等大小写敏感系统上的正常运行。

### 4. Skills 生态洞察
**当前社区在 Skills 层面最集中的诉求是：建立企业级的“安全信任边界”，并提升开发者侧“评估与优化工具链（skill-creator）”的可用性。**

---

以下是 2026-07-26 的 Claude Code 社区动态日报。

### 1. 今日速览
昨日 Claude Code 发布了 **v2.1.220** 版本，主要进行了 Bug 修复与稳定性提升。社区今日焦点集中在**模型路由静默回退**、**开发环境（IDE/桌面端）焦点抢占**以及**云端上下文压缩导致的崩溃问题**上。此外，部分开发者反馈 Max 订阅配额消耗异常及常规代码任务被误判拦截。

### 2. 版本发布
*   **[v2.1.220](https://github.com/anthropics/claude-code/releases)** 
    *   **更新内容**：常规 Bug 修复与可靠性提升。

### 3. 社区热点 Issues (Top 10)
以下是过去 24 小时内互动最密集、最受关注的问题：

1.  **[Issue #22931](https://github.com/anthropics/claude-code/issues/22931) [Bug] macOS 端 Cowork 聊天记录归档后丢失**
    *   **动态**：用户反馈将聊天归档后无法找到记录，该问题自 2 月份持续至今，依然是痛点。
2.  **[Issue #30873](https://github.com/anthropics/claude-code/issues/30873) [Bug] Edge 浏览器切换标签页导致 Chrome 扩展侧边栏关闭**
    *   **动态**：跨浏览器扩展兼容性问题，在 macOS 上有稳定的复现步骤，影响多任务工作流。
3.  **[Issue #43869](https://github.com/anthropics/claude-code/issues/43869) [Bug] Subagent 模型路由失效，静默回退至 Opus**
    *   **动态**：严重影响成本与多代理架构的问题。所有配置的路由机制均被忽略，子代理强制使用父级模型。
4.  **[Issue #73568](https://github.com/anthropics/claude-code/issues/73568) [Bug] Linux Cowork 构建版误报 yukonSilver 不受支持**
    *   **动态**：即使确认 KVM 和 vsock 工作正常，官方 Linux 构建版依然报错拦截。
5.  **[Issue #32726](https://github.com/anthropics/claude-code/issues/32726) [Enhancement] VS Code 扩展面板抢占焦点**
    *   **动态**：高赞（45 👍）需求。用户呼吁增加选项，阻止 Claude Code 在输出时自动弹出并打断用户当前的代码编写。
6.  **[Issue #74325](https://github.com/anthropics/claude-code/issues/74325) [Bug] `opusplan` 在 Plan 模式下静默回退 Sonnet**
    *   **动态**：与 #43869 类似的模型降级问题，全局配置的模型在特定模式下未生效且无提示。
7.  **[Issue #81222](https://github.com/anthropics/claude-code/issues/81222) [Bug] 空目录绑定导致 Windows CPU 占用 100%**
    *   **动态**：严重性能 Bug。当工作区绑定未注册的 git 空目录时，会陷入无限重试，每秒产生 40 万次 `CreateFile` 调用。
8.  **[Issue #81234](https://github.com/anthropics/claude-code/issues/81234) [Bug] Max 20x 订阅配额异常消耗**
    *   **动态**：用户反馈在机器闲置的两天内消耗了 53% 的周配额，怀疑与 `cache_read` 计量有关。
9.  **[Issue #81233](https://github.com/anthropics/claude-code/issues/81233) [Bug] 上下文压缩破坏消息结构导致会话 400 报错崩溃**
    *   **动态**：核心稳定性问题。上下文压缩时非原子性地切分了 API 消息对，导致后续请求直接报错且无法重试。
10. **[Issue #81221](https://github.com/anthropics/claude-code/issues/81221) [Bug] 桌面端加载 Cloudflare Turnstile 组件导致整个应用退出**
    *   **动态**：浏览器面板加载带有验证组件的生产页面时，引发无日志的应用级崩溃。

### 4. 重要 PR 进展
近期 PR 活动较少，昨日更新主要围绕旧代码的清理与重构：

1.  **[PR #15727](https://github.com/anthropics/claude-code/pull/15727) [Closed] 修复 hookify 插件 Python 导入路径**
    *   **内容**：修复了 hook 脚本无法正确导入 `hookify.core.config_loader` 的问题，调整了 `CLAUDE_PLUGIN_ROOT` 的相对路径解析逻辑。
2.  **[PR #49596](https://github.com/anthropics/claude-code/pull/49596) [Closed] 重构：提取共享的 GitHub API 客户端**
    *   **内容**将 GitHub API 调用逻辑抽象为独立的 `github-api.ts` 模块并添加了测试，提升代码复用率。

### 5. 功能需求趋势
综合近期 Issues，社区对以下功能方向提出了迫切需求：
*   **UI / 交互控制权下放**：用户强烈要求能够控制 IDE 面板和权限弹窗的行为（如禁止自动获取焦点、支持快捷键直接切换特定权限模式 #69450），减少工作流被打断。
*   **模型路由与调度透明化**：针对频繁出现的“静默降级”或“路由失效”，社区要求 Claude Code 在发生模型变更（如 Opus 降级 Sonnet，或因安全策略强制切回 Opus）时提供明确的 UI/Console 提示。
*   **组件渲染优化**：针对 UI 组件提出更灵活的需求，例如 `AskUserQuestion` 支持内联渲染而非总是全屏模态弹窗（#81226）。

### 6. 开发者关注点
*   **安全策略误判频发**：多名开发者反馈常规的编程任务（如编写 fable 相关代码）被系统误判为网络安全风险，导致 API 拒绝服务或强制切换模型，极大影响了开发效率（#81232, #81229）。
*   **缓存机制与 Prompt 重置**：Hook 或工具产生的 `additionalContext` 在回合间被重新序列化，导致 Prompt Cache 失效，不仅拖慢响应，还可能引起巨额的账单消耗（#81077, #81234）。
*   **移动端与远程控制的断连问题**：移动端 App 在处理子代理权限批准时存在缺失（#81237），同时 Remote Control 模式频繁陷入“断开连接失败”的死循环（#81155, #81228）。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

以下是 2026 年 7 月 26 日的 OpenAI Codex 社区动态日报。

# OpenAI Codex 社区动态日报 (2026-07-26)

## 1. 今日速览
今日 OpenAI Codex CLI 迎来了密集的 Alpha 版本迭代，连续发布了 4 个 `v0.146.0-alpha` 更新。从社区反馈来看，**Windows 平台的稳定性与连接问题**是目前的重灾区，占据了绝大多数高热度 Bug 报告。此外，官方今日合并了多项涉及底层性能优化、网络凭证安全以及技能/插件系统重构的关键 PR，显示出团队正在为更深度的企业级集成与跨平台执行做准备。

## 2. 版本发布
今日 Codex 主要在 Rust CLI 端进行了高频迭代，主要聚焦在底层问题修复与调优：
*   **rust-v0.146.0-alpha.10.1** ([Release Notes](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.10.1))
*   **rust-v0.146.0-alpha.10** ([Release Notes](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.10))
*   **rust-v0.146.0-alpha.9** ([Release Notes](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.9))
*   **rust-v0.146.0-alpha.8** ([Release Notes](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.8))

## 3. 社区热点 Issues (Top 10)
社区今日的讨论焦点集中在 Windows 桌面端崩溃、远程连接失效以及速率限制策略上：

1.  **[#20214](https://github.com/openai/codex/issues/20214) | Codex App 在 Windows 11 上频繁卡顿/冻结** (👍73, 💬77)
    *   **关注点：** 尽管系统资源充足，Windows 11 Pro 用户仍面临严重的性能问题。这是目前关注度最高的 Bug，反应了桌面端在 Windows 资源调度上的缺陷。
2.  **[#4003](https://github.com/openai/codex/issues/4003) | Windows 上修补的文件出现混合换行符** (👍72, 💬29)
    *   **关注点：** Codex 在 Windows 中修改文件时未遵循原有换行符格式，破坏了代码库的一致性，这是底层文件系统交互的顽疾。
3.  **[#9508](https://github.com/openai/codex/issues/9508) | 要求每周限额重置机制透明化/确定性化** (👍32, 💬47)
    *   **关注点：** Pro 用户对当前不可预测的“每周限额重置”感到沮丧，希望能有确定的重置时间表以规划开发任务。
4.  **[#16423](https://github.com/openai/codex/issues/16423) | 武断的每周限额重置让人感到挫败** (👍36, 💬12)
    *   **关注点：** 与 #9508 呼应，高级订阅用户呼吁 OpenAI 重新审视并改进当前的 Rate Limits 逻辑。
5.  **[#35058](https://github.com/openai/codex/issues/35058) | macOS 上 VS Code Codex Diff 功能崩溃** (👍10, 💬11)
    *   **关注点：** IDE 扩展核心功能受阻。在苹果芯片 macOS 的 VS Code 中，Codex 编辑文件后打开 Diff 标签页会报错，严重影响代码审查工作流。
6.  **[#31786](https://github.com/openai/codex/issues/31786) & [#31973](https://github.com/openai/codex/issues/31973) | Windows 远程控制 Android/iPhone 失败/卡死** (💬11/11)
    *   **关注点：** Windows 端通过手机进行远程配对控制（QR Pairing）出现连接瓶颈，手机端一直显示 "connecting" 或卡在 "Reconnecting"，跨端协同功能亟待修复。
7.  **[#29593](https://github.com/openai/codex/issues/29593) | Windows 桌面端因本地状态损坏无限重启** (💬5)
    *   **关注点：** `chat_processes.json` 变为全 NUL 字节导致应用陷入崩溃与重启的死循环。极端但致命的本地状态管理 Bug。
8.  **[#32655](https://github.com/openai/codex/issues/32655) | Windows 独立版沙箱执行辅助程序失效** (💬7)
    *   **关注点：** Windows 上独立安装版的沙箱辅助二进制文件无法正确定位，导致所有受沙箱保护的 `codex exec` 命令执行失败。
9.  **[#34676](https://github.com/openai/codex/issues/34676) | iOS 版回归：项目侧边栏移除与智能选择失效** (💬2)
    *   **关注点：** iOS 移动端的 UI/UX 更新引发了负面反馈，项目列表折叠功能消失，且在项目聊天中无法正常选择模型（Intelligence）。
10. **[#35005](https://github.com/openai/codex/issues/35005) | CLI 诉求：支持就地编辑历史提示词，而非强制分叉** (💬3)
    *   **关注点：** 0.145.0 版本强制将修改早期 Prompt 的操作转为会话分叉，开发者呼吁增加配置项允许直接覆盖修改，以简化工作流。

## 4. 重要 PR 进展 (Top 10)
官方合并了大量底层架构优化和安全性提升的 PR：

1.  **[#31810] 核心性能：流水线化祖先节点发现**
    *   **进展：** 大幅优化远程项目启动速度。将根标记检查、AGENTS 候选目录等串行检查改为流水线并发处理，显著减少启动延迟。
2.  **[#31782] 安全：限制 stdio JSON-RPC 帧大小**
    *   **进展：** 修复了 `BufReader::lines()` 导致的内存无限增长漏洞，设置了 64 MiB 的硬性上限，防止恶意 exec-server 导致客户端 OOM。
3.  **[#29845] 平台兼容：梳理 Windows 启动器的应用程序路径**
    *   **进展：** 为 Windows 统一执行可执行文件的解析铺平道路，引入 `WindowsProcessLaunch` 耦合 argv 与已解析路径，有望缓解近期频发的 Windows 启动 Bug。
4.  **[#29752] 架构集成：实验性凭证代理**
    *   **进展：** 将代理拥有的凭证代理集成到 Codex 核心中，允许使用虚拟凭证代替真实凭证传递给子进程，大幅提升命令生命周期的安全性。
5.  **[#35264] 安全：对捆绑的 macOS 辅助二进制文件进行签名**
    *   **进展：** 修复了发布工作流中 `rg` 和 `zsh` 未在签名阶段获取的问题，确保 macOS 分发包完全通过公证。
6.  **[#35359] 安全：在客户端处理 exec-server 网络策略**
    *   **进展：** 增加了客户端对网络

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

以下是 2026 年 7 月 26 日的 Gemini CLI 社区动态日报。

### 1. 今日速览
今日 Gemini CLI 无新版本发布，社区活跃度主要集中在问题排查与底层架构优化。核心痛点集中在**子代理的稳定性与权限控制**（如挂起、绕过权限执行），同时官方正大力推进内存系统的安全性与组件级评估基建。此外，多个关于自动化代码生成与智能分流的基础设施 PR 被提交，预示着内部自动化运维能力的重大升级。

### 2. 版本发布
*过去 24 小时内无新版本发布。*

### 3. 社区热点 Issues (Top 10)
以下为本期最值得关注的社区问题，反映了当前 CLI 运行中的核心痛点及未来的优化方向：

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) [Bug] 子代理达到 MAX_TURNS 后误报成功**
   * **简评**: 高优先级 (P1) Bug。子代理在达到最大轮次限制被中断时，仍向主代理返回 `"success"` 状态。这会导致主代理基于“虚假成功”继续执行错误的后续流程，严重影响任务链路的可靠性。
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) [Bug] 通用代理频繁挂起**
   * **简评**: P1 级严重问题，获得了 8 个赞。当 CLI 调用通用代理（Generalist agent）时（哪怕是创建文件夹等简单任务），会无限期挂起，开发者只能强制终止，迫使目前用户只能通过指令禁用子代理来规避。
3. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) [Bug] Shell 命令执行完成后卡在 "Waiting input"**
   * **简评**: P1 核心交互 Bug。执行简单的 CLI 指令后，界面卡死并提示等待用户输入。这破坏了命令行环境下的基本使用体验。
4. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) [Enhancement] 利用零依赖 OS 沙箱与执行后意图路由增强 Bash 亲和度**
   * **简评**: 高价值架构提案。Gemini 3 天生习惯使用 `grep`, `sed` 等 POSIX 工具。此需求提议通过 OS 级沙箱来安全释放模型执行原生 Bash 指令的能力，而无需妥协安全性。
5. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) [Bug] 自动内存机制缺乏确定性脱敏与日志冗余**
   * **简评**: 安全方向重点 Issue。Auto Memory 在读取本地记录并传给后台提取模型前，未做强制的敏感信息脱敏，存在数据泄露风险。
6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) [Bug] 模型不够积极使用自定义技能和子代理**
   * **简评**: 反映了当前路由调度的短板。即便开发者配置了高度相关的 `skills`，模型在相关任务中依然倾向于自己处理而不去调用工具。
7. **[#22093](https://github.com/google-gemini/gemini-cli/issues/22093) [Bug] 自 v0.33.0 起，(子)代理绕过权限运行**
   * **简评**: 严重的信任安全问题。升级到 v0.33.0 后，即使在配置中明确禁用了代理模式，子代理仍在后台被调用并绕过了用户的执行权限审查。
8. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) [Feature] 评估 AST 感知（抽象语法树）的文件读取与映射**
   * **简评**: 探索提升代码库理解能力的重要方向。通过 AST 感知工具，可以一次性精准读取方法边界，减少模型因盲目读取导致的 Token 浪费和轮次损耗。
9. **[#24353](https://github.com/google-gemini/gemini-cli/issues/24353) [Enhancement] 稳健的组件级评估**
   * **简评**: 官方正在推进的重点 EPIC。旨在为 6 个支持的 Gemini 模型建立全面的“行为评估”测试，以更科学地量化代理的组件级能力。
10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) [Feature] 代理应阻止/劝阻破坏性行为**
    * **简评**: 针对复杂 Git 操作或 DB 维护时，模型可能会盲目使用 `git reset --force` 等高危命令。社区呼吁在底层逻辑中加入对不可逆操作的防御机制。

---

### 4. 重要 PR 进展 (Top 10)
本日 PR 动态展示了 Gemini 团队在工程化、内部 AI 流水线以及安全性方面的投入：

1. **[#28401](https://github.com/google-gemini/gemini-cli/pull/28401) [P1] 限制发送给模型的 Shell 命令输出大小**
   * **进展**: 修复核心痛点。为 Shell 工具增加了输出上限（如防止 `find /` 产生上百 KB 的文本），防止 Context 被塞满导致 Token 消耗剧增和回复质量下降。
2. **[#28481](https://github.com/google-gemini/gemini-cli/pull/28481) [P1] 修复 MCP OAuth Token 刷新逻辑**
   * **进展**: 解决了配置了 OAuth 发现机制的 MCP 服务器在刷新凭证时失败，甚至错误删除已存凭证导致需要反复鉴权的问题。
3. **[#28534](https://github.com/google-gemini/gemini-cli/pull/28534) [P1] 修复 CI 发布时 npm dist-tag 移除失败的重试逻辑**
   * **进展**: 修复了由于 npm 网络延迟导致的 Nightly 发布流水线失败的痛点，加入了健壮的重试机制。
4. **[#28348](https://github.com/google-gemini/gemini-cli/pull/28348) [已关闭] 修复 MaxListenersExceededWarning 与无限认证循环**
   * **进展**: 尝试解决重试 API 调用时导致的内存泄漏警告，以及 Windows 上的 OAuth 死循环问题。
5. **[#28435](https://github.com/google-gemini/gemini-cli/pull/28435) 引入 Issue 转 PR 的代码生成管线核心基建**
   * **进展**: 一个非常庞大的基础设施 PR，引入了配置解析、子进程执行和 GitHub REST API 客户端集成，为实现由 AI 驱动的全自动 Bug 修复闭环铺路。
6. **[#28433](https://github.com/google-gemini/gemini-cli/pull/28433) 实现 Bug 修复状态机与容器 Worker 编排器**
   * **进展**: 配合上述基建，实现了通过 Firestore 并发锁、迭代 AI 编码与评估循环（结合 ESLint 分析与 Diff 验证）的核心业务逻辑。
7. **[#28530](https://github.com/google-gemini/gemini-cli/pull/28530) 引入 Triage 评估框架与 LLM-as-a-Judge 运行器**
   * **进展**: 为 Caretaker Agent（负责 Issue 分流的机器人）引入了基于大模型打分机制（LLM-as-a-Judge）的分类评估框架。
8. **[#28531](https://github.com/google-gemini/gemini-cli/pull/28531) [Bugfix] 将 CRLF 换行符规范化为 LF**
   * **进展**: 解决了 Windows 环境下，因换行符不匹配导致 GCA 中的 `a2a-server` 无法正确高亮并发生 Diff 视图的问题。
9. **[#28353](https://github.com/google-gemini/gemini-cli/pull/28353) [已关闭] 防止 restore 命令中的路径遍历攻击 (Defense-in-depth)**
   * **进展**: 安全防御加固。拦截了类似 `../../../etc/passwd` 的恶意输入，防止通过 `a2a-server` 的 restore 指令越权读取受保护目录外的文件。
10. **[#28442](https://github.com/google-gemini/gemini-cli/pull/28442) Main 分支超大体积合并**
    * **进展**: 标记为 `size/xl` 的主分支更新，通常包含大量底层依赖升级或架构合并。

---

### 5. 功能需求趋势
通过对近期 Issue 的分析，社区需求目前高度聚焦于以下方向：
* **子代理调度与健壮性**: 模型需要更智能地决定**何时**调用子代理（避免不调用或过度调用），并在子代理达到轮数限制、发生异常时，具备完善的**熔断与状态准确上报**机制。
* **命令执行安全与沙箱化**: 鉴于模型极其喜欢生成原生 Bash 脚本，社区强烈呼唤“零依赖 OS 沙箱”和“输出体积限制”。核心诉求是在享受模型原生 POSIX 能力的同时，防止模型执行高危命令或撑爆上下文窗口。
* **代码库结构化解析**: 突破传统的 `grep` 读取模式，探索 AST（抽象语法树）感知工具，以更少的 Token 更精准地理解代码逻辑结构。
* **内存系统隐私化**: 要求 Auto Memory 在提取本地上下文前，实现确定性的、基于规则的脱敏，避免将敏感信息发送给后台模型。

---

### 6. 开发者关注点（痛点总结）
1. **幻觉状态导致任务失败**: 子代理无限挂起，或者明明达到了 `MAX_TURNS` 却向主线程返回“任务成功”，这是导致开发者失控的目前最大痛点。
2. **权限突破引发信任危机**: v0.33.0 版本暴露出的“子代理无视全局禁用配置并在后台静默运行”问题，引发了社区对自动化代理失控的担忧。
3. **UI 终端交互冲突**: 在执行创建 Vite 应用、或简单 Shell 指令后，终端卡在“等待输入”死锁，极大降低了 CLI 的可用性。
4. **文件系统污染**: 模型倾向于在任意目录生成临时的执行脚本，导致项目目录变脏，开发者呼吁需要约束代理的文件写入行为。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

以下是为您生成的 GitHub Copilot CLI 社区动态日报（2026-07-26）：

### 1. 今日速览
今日 GitHub Copilot CLI 无新版本发布，社区焦点高度集中于**会话状态管理**与**核心命令的稳定性**。开发者反馈了多个影响日常开发的阻断性问题，尤其是 1.0.74 版本引入的大型会话恢复 OOM 回归，以及 `/ask` 命令频繁静默失效。此外，长上下文场景下的 CAPI 体积超限和僵尸进程等底层资源管理问题也引发了热烈讨论。

### 2. 版本发布
* 过去 24 小时内无新版本发布。

### 3. 社区热点 Issues (Top 10)
以下是筛选出的最具技术讨论价值或影响范围最广的 10 个 Issue：

*   **[#4183](https://github.com/github/copilot-cli/issues/4183) [OPEN] Auto-compaction does not prevent CAPI 5 MB failure...** 👍 10
    *   **关注点**：在长时间、多工具调用的会话中，即使未达到模型的 Token 上限，底层的 CAPI API 请求体也会超过 5MB 的硬性限制，且自动压缩机制未能解决此问题。这是阻碍长上下文 Agent 运行的高频痛点。
*   **[#2205](https://github.com/github/copilot-cli/issues/2205) [OPEN] Usability issue - scroll in terminal (Terminator)** 👍 14
    *   **关注点**：终端渲染层面的交互回归。鼠标滚动不再用于查看 Agent 历史输出，而是变为切换历史输入命令，严重破坏了终端用户的审查体验。
*   **[#4251](https://github.com/github/copilot-cli/issues/4251) [OPEN] Resume of a large session OOMs / grinds one CPU core...** 
    *   **关注点**：**严重性能回归**。1.0.74 版本在恢复长会话时导致单核 CPU 占用率满载及内存占用飙升（3-4倍），导致日常重度用户无法正常恢复上下文。
*   **[#4252](https://github.com/github/copilot-cli/issues/4252) [OPEN] Session exit writes launch-time `model` back to settings.json...**
    *   **关注点**：配置管理缺陷。会话退出时会将启动时内存中的模型配置覆盖写回本地文件，导致用户在会话期间或通过其他终端修改的配置被静默还原。
*   **[#4235](https://github.com/github/copilot-cli/issues/4235) [CLOSED] Ctrl+C no longer cancels/interrupts an active agent run (regression)**
    *   **关注点**：**核心交互回归**。在 Agent 运行期间按下 Ctrl+C 无法再中断任务。此问题已被官方关闭，推测已在最新代码中修复。
*   **[#4253](https://github.com/github/copilot-cli/issues/4253) [OPEN] /ask frequently returns no result**
    *   **关注点**：核心指令失效。`/ask` 命令经常执行后没有任何输出和报错，对依赖该命令进行快速查询的开发者造成困扰。
*   **[#4248](https://github.com/github/copilot-cli/issues/4248) [OPEN] `/pr` does not recognize GitHub repositories that use SSH host aliases**
    *   **关注点**：工作流兼容性。使用 SSH 别名（`~/.ssh/config`）配置的 Git 仓库无法被 `/pr` 命令识别为有效的 GitHub 仓库，影响了高级 Git 用户的 PR 自动化流程。
*   **[#4241](https://github.com/github/copilot-cli/issues/4241) [OPEN] Password masking feature fails to mask passwords...**
    *   **关注点**：安全与 Token 浪费。密码掩码机制存在漏洞，Agent 读取到掩码后，会强行使用 Python 读取底层字节来破解掩码，不仅暴露了潜在的安全风险，还额外消耗了大量 Token。
*   **[#4246](https://github.com/github/copilot-cli/issues/4246) [OPEN] archive_session times out after 60 seconds and leaves large worktrees orphaned**
    *   **关注点**：资源清理机制。在处理大型仓库的 worktree 时，`archive_session` 容易超时，导致产生孤立的会话分支和无用的磁盘占用。
*   **[#4163](https://github.com/github/copilot-cli/issues/4163) [CLOSED] copilot CLI 1.0.71 does not reap child processes — zombies accumulate...**
    *   **关注点**：Linux 环境下的系统级 Bug。CLI 未正确回收子进程，导致以每分钟约 2 个的速度产生僵尸进程（状态为 Z）。该问题已被关闭并标记为已修复。

### 4. 重要 PR 进展
*注：过去 24 小时内仅更新了 1 个 PR。*

*   **[#4228](https://github.com/github/copilot-cli/pull/4228) [CLOSED] Withdrawn: incorrect scope for #3534** 👍 0
    *   **动态**：作者 (@TheDr1ver) 主动撤销了该 PR。原因是该 PR 错误地修改了文档，而不是针对 issue #3534 修复底层的剪贴板运行时实现，相关源分支已被删除。这表明社区贡献者在处理底层实现时正与维护者进行严谨的拉扯与对齐。

### 5. 功能需求趋势
从最新提交的 Issue 中，可以看出社区对 Copilot CLI 的演进有以下明确期望：
1.  **稳健的长会话生命周期管理**：高频需求集中在“上下文压缩”、“大体积会话恢复”以及“会话归档/清理”。开发者正将 CLI 用于更长、更复杂的 Agent 任务，要求底层具备更强的内存管控和 IO 处理能力。
2.  **跨平台与跨终端的交互一致性**：从终端滚动失效（Terminator）到 VS Code Agent 内部缺乏指令支持（如 `/rename`），反映出现有的多前端适配存在回归测试盲区。
3.  **细粒度的工作流兼容**：开发者希望 CLI 能无缝接入高级 Git 习惯（如 SSH Host 别名配置）和更复杂的插件生态（如 Marketplace 状态持久化）。

### 6. 开发者关注点
基于近期反馈，目前 CLI 版本给开发者带来的主要痛点集中在以下三个方面：
*   **静默失败与状态错乱**：诸如 `/ask` 无输出、配置文件静默覆盖、Headless 模式下 Plan 指示器泄露等问题。开发者极度排斥“看似成功实则失败或产生脏数据”的行为，这会严重破坏对 AI Agent 的信任。
*   **资源消耗与底层性能**：Token 浪费（因掩码机制引起）、内存泄漏/OOM（1.0.74 版本回归）、以及 Linux 僵尸进程。AI 辅助工具作为常驻后台进程，其资源开销必须受到严格控制。
*   **热更新与版本回归频率**：近期多次出现新版本引入严重回归（如 1.0.71 的僵尸进程，1.0.74 的 OOM，以及 Ctrl+C 失效）。开发者呼吁官方在推进快速迭代的同时，加强针对大型仓库和长周期会话的自动化测试覆盖。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

这是为您生成的 2026-07-26 Kimi Code CLI 社区动态日报。

---

# 📰 Kimi Code CLI 社区动态日报 (2026-07-26)

### 1. 今日速览
今日 Kimi Code CLI 无新版本发布，社区整体节奏平稳。核心开发者 @Nas01010101 集中关闭了多个与会话状态管理相关的底层修复 PR，大幅优化了上下文截断和会话恢复机制的稳定性。同时，社区对“跨设备远程接续本地会话”的功能呼声持续高涨，且需关注 v1.44.0 版本中出现的死循环 Bug 反馈。

### 2. 版本发布
**无**。（注：据社区反馈，当前最新版本停留在 `1.44.0`）

### 3. 社区热点 Issues
*(注：基于过去 24 小时数据更新，精选核心 Issue)*

*   **[#1282] [需求] 远程控制：支持从任何设备接续本地会话** 
    *   👍 16 赞 | 💬 8 评论
    *   **动态解析**：这是一个创建于 2 月的高票需求，昨日再引关注。用户希望能在离开工位时，通过手机、平板等浏览器设备无缝接管并继续本地的 Kimi CLI 会话。这反映了重度用户对打破设备物理限制、实现多端协同的强烈诉求。
    *   🔗 [查看链接](https://github.com/MoonshotAI/kimi-cli/issues/1282)
*   **[#2557] [Bug] 命令行陷入死循环** 
    *   👍 0 赞 | 💬 0 评论
    *   **动态解析**：由 @zxpdemonio 在 v1.44.0 版本中发现的新 Bug。CLI 在特定触发条件下会陷入死循环，直接影响开发体验，需研发团队优先排查介入。
    *   🔗 [查看链接](https://github.com/MoonshotAI/kimi-cli/issues/2557)

### 4. 重要 PR 进展
*(注：过去 24 小时内共有 4 个 PR 更新，其中 3 个重要修复被关闭/合并)*

*   **[#2520] 修复：对齐会话分叉/撤销时的上下文截断机制 [CLOSED]**
    *   **内容**：解决了底层的 wire turns 映射问题，修复了由于 slash 命令偏移导致的撤销截断错误，以及会话分叉后的历史记录不匹配问题。提升了复杂会话流的上下文连贯性。
    *   🔗 [查看链接](https://github.com/MoonshotAI/kimi-cli/pull/2520)
*   **[#2519] 修复：会话恢复时刷新过期的系统提示词 [CLOSED]**
    *   **内容**：此前会话恢复时会硬编码读取旧版本的 `_system_prompt`，导致新添加的 Skills（`~/.kimi/skills/`）或修改的 `AGENTS.md` 无法生效。此 PR 修复了该阻塞问题，确保会话恢复后能加载最新环境配置。
    *   🔗 [查看链接](https://github.com/MoonshotAI/kimi-cli/pull/2519)
*   **[#2518] 修复：持久化文件上传标记，防止重启后重复发送 [CLOSED]**
    *   **内容**：修复了 `kimi web` 模式下的顽疾：每次服务重启或会话恢复后，之前上传的文件（特别是大体积图片）会被当作新内容重新发送给大模型，导致 Token 浪费和上下文污染。
    *   🔗 [查看链接](https://github.com/MoonshotAI/kimi-cli/pull/2518)
*   **[#2558] 修复：改善 Windows 跨平台测试兼容性 [OPEN]**
    *   **内容**：由社区贡献者提交，修复了 Windows 环境下由于 `\n` 和 `\r\n` 换行符差异导致的测试失败问题，有助于提升项目在 Windows 生态的健壮性。
    *   🔗 [查看链接](https://github.com/MoonshotAI/kimi-cli/pull/2558)

### 5. 功能需求趋势
从近期的 Issue 与核心 PR 走向可以总结出以下两大趋势：
1.  **无缝的多端与多会话协同**：用户不再满足于单一的终端交互，向云端/移动端延伸（如 #1282 的远程接管）是未来的明确痛点。
2.  **状态持久化与上下文精准还原**：随着 CLI 处理的任务变复杂，会话中断、恢复、分叉时的状态一致性变得极具挑战。系统提示词实时更新、历史文件去重等底层机制成为了研发攻坚的重点。

### 6. 开发者关注点（痛点）
*   **长会话状态污染**：开发者极度反感历史信息的错误重传（如重复上传图片），这极易撑爆模型的上下文窗口并导致幻觉。
*   **Agent 配置热更新失效**：会话中途修改 `AGENTS.md` 或导入新 Skills 如果不能即时生效，会严重打断开发者的编程心流。
*   **执行稳定性**：类似死循环（#2557）等阻塞性 Bug 是开发者的底线红线，对 CLI 的鲁棒性提出了更高要求。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

这里是 2026 年 7 月 26 日的 OpenCode 社区动态日报。

### 1. 今日速览
OpenCode 昨日发布了 **v1.18.5** 版本，重点修复了 Claude 和 Mistral 模型的推理稳定性问题。然而，新版的桌面端 UI 遭遇了大量用户的反馈与吐槽，要求保留旧版布局；同时社区曝光了由于默认配置不安全导致主机被植入挖矿木马的严重安全事件（#38857），值得所有自部署用户警惕。

---

### 2. 版本发布
**v1.18.5** (发布于过去24小时内)
本次更新主要集中在核心模型的 Bugfixes：
*   改进了 Claude 自适应思考的处理机制，以兼容更多响应格式。
*   移除了可能导致部分对话中断的 OpenAI Responses 阶段处理逻辑。
*   修复了搜索结果中 grep 符号链接路径丢失的问题（由 @remixz 贡献）。
*   跨对话轮次保留了 Mistral 的推理历史，并提升了其整体稳定性。

---

### 3. 社区热点 Issues (Top 10)
以下为本期最值得关注的 Issue，涵盖了安全隐患、UI 争议及核心 Bug：

1. **[#37012](https://github.com/anomalyco/opencode/issues/37012) [FEATURE]: keep legacy layout option (👍31 / 💬33)**
   * **关注点**：桌面版新 UI 界面导致原有功能难以访问，社区强烈要求保留或提供切换回旧版布局的选项。
2. **[#38857](https://github.com/anomalyco/opencode/issues/38857) [SECURITY] Cryptominer deployed via unsecured opencode web server**
   * **关注点**：高危安全事件！用户因未设置 `OPENCODE_SERVER_PASSWORD` 且监听 `0.0.0.0`，导致未授权的终端暴露，被植入门罗币挖矿脚本。
3. **[#38837](https://github.com/anomalyco/opencode/issues/38837) [CLOSED] perf: CLI commands hang on startup — full AppLayer init on 430MB database**
   * **关注点**：核心性能瓶颈。所有 CLI 命令（哪怕是最轻量的）都在启动时强行加载完整的 430MB 数据库上下文，导致启动延迟高达数十秒。
4. **[#32747](https://github.com/anomalyco/opencode/issues/32747) @ file mentions do not include files created after startup**
   * **关注点**：影响日常开发的体验 Bug。应用启动后新建的文件无法通过 `@` 提及，必须重启应用才能刷新索引。
5. **[#38791](https://github.com/anomalyco/opencode/issues/38791) Run loop can never exit when message ids are not time-sortable**
   * **关注点**：底层逻辑 Bug。第三方导入的会话由于 ID 不具备时间排序特性，导致 `runLoop` 陷入死循环并触发 API 400 报错。
6. **[#38789](https://github.com/anomalyco/opencode/issues/38789) [Bug] Desktop v1.18.5: UnsupportedContentType error on project reload**
   * **关注点**：v1.18.5 引入的新回归 Bug，升级后客户端 SDK 在重载项目时抛出 `UnsupportedContentType` 错误。
7. **[#36677](https://github.com/anomalyco/opencode/issues/36677) [2.0] core: long-lived V2 server enters persistent allocation loop**
   * **关注点**：V2 服务器内存泄漏 / CPU 飙升。空闲状态下服务器进入高频 JS 内存分配循环，单核 CPU 占用率拉满。
8. **[#34442](https://github.com/anomalyco/opencode/issues/34442) Windows Desktop installer is broken offline: ripgrep not bundled**
   * **关注点**：Windows 离线环境完全不可用。内置工具严重依赖 `ripgrep`，但离线安装包并未将其打包。
9. **[#37534](https://github.com/anomalyco/opencode/issues/37534) [Desktop] Main content occasionally doesn't refresh when switching projects**
   * **关注点**：桌面端多项目切换时，主内容区偶发性停留在上一个项目的 Session 中，影响开发连贯性。
10. **[#38874](https://github.com/anomalyco/opencode/issues/38874) [CLOSED] Multiple opencode-managed models failing with Internal Server Error**
    * **关注点**：官方托管模型（包含免费版和 Go 付费版）在 7 月 25 日出现大面积 500 / 超时宕机事件。

---

### 4. 重要 PR 进展 (Top 10)
展示了社区在性能优化、安全输入和 LLM 适配上的最新代码贡献：

1. **[#38880](https://github.com/anomalyco/opencode/pull/38880) fix(tui): ~1800x times image pasting performance improvement**
   * **亮点**：重写了 TUI 图片粘贴逻辑，弃用耗时的外部 Shell 脚本，性能暴击提升约 1800 倍。
2. **[#38882](https://github.com/anomalyco/opencode/pull/38882) feat(tui): polish fastboot mode and make default**
   * **亮点**：重构并默认开启了 TUI 快速引导模式，大幅缩短用户首次输入等待时间。
3. **[#38894](https://github.com/anomalyco/opencode/pull/38894) fix(native-llm): replace hardcoded provider gate with shared support set**
   * **亮点**：移除了硬编码的提供商黑名单，允许 Google、Bedrock、Azure 等服务原生使用 Native LLM 路径。
4. **[#38878](https://github.com/anomalyco/opencode/pull/38878) feat(opencode): add --resume session picker**
   * **亮点**：为 CLI 新增了 `--resume` 参数，提供优雅的交互式会话选择器，解决恢复历史会话的痛点。
5. **[#38877](https://github.com/anomalyco/opencode/pull/38877) feat: PTY-based interactive secure input for sudo/ssh password prompts**
   * **亮点**：核心痛点修复！引入 PTY 拦截 shell 中的 `sudo` / `ssh` 密码提示，允许用户直接在 UI 中安全输入密码。
6. **[#38889](https://github.com/anomalyco/opencode/pull/38889) feat(desktop): add OPENCODE_PROJECT_DIR env var for CWD override**
   * **亮点**：允许桌面端通过环境变量覆盖当前工作目录，解决 macOS 下 ripgrep 兼容性导致的工作目录强制更改问题。
7. **[#38892](https://github.com/anomalyco/opencode/pull/38892) fix(ai): reconcile responses snapshots**
   * **亮点**：修复 OpenAI 流式响应中的快照对齐问题，确保函数调用参数的准确性。
8. **[#38896](https://github.com/anomalyco/opencode/pull/38896) feat(opencode): expose POST /question/ask for plugins and SDK**
   * **亮点**：扩展了插件和 SDK 的能力边界，现在第三方程序不仅能回复提问，还可以主动向 OpenCode 发起提问。
9. **[#38743](https://github.com/anomalyco/opencode/pull/38743) [CLOSED] refactor(core): settle steps lock-free by joining tool fibers first**
   * **亮点**：核心运行时的无锁化重构，删除了 12 个信号量锁，将执行步骤转变为无争用的线性结构，大幅降低并发冲突。
10. **[#27554](https://github.com/anomalyco/opencode/pull/27554) feat(opencode): local LAN provider discovery + auto-discover models**
    * **亮点**：基于 mDNS 自动发现局域网内的 OpenAI 兼容服务器（如 Ollama），解决手动配置 IP 的繁琐步骤。

---

### 5. 功能需求趋势
综合近期的 Issues，社区最关注的功能演进方向如下：
*   **UI 布局与自定义**：新 UI 的可用性遭到

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

Here is the Qwen Code community daily report for July 26, 2026, structured for technical developers:

# 📰 Qwen Code 社区动态日报 (2026-07-26)

## 1. 今日速览
今日 Qwen Code 发布了最新的 `v0.21.0-nightly` 版本，核心团队将重心放在了提升 CI/CD 稳定性与 Triage（分类审查）自动化流程上，引入了沙盒化的深度验证机制。社区方面，关于子代理的精细化调度、终端 UI 渲染细节（如多行输入法与数学公式）以及 MCP 跨端兼容性的讨论热度居高不下。

## 2. 版本发布
- **v0.21.0-nightly.20260725.1183a4c82**
  - **CLI 修复**：全面统一了本地时间下洞察天数和小时的测量方式 ([PR #7670](https://github.com/QwenLM/qwen-code/pull/7670))。
  - **重构**：对 autofix（自动修复）扩展进行了内部重构。

## 3. 社区热点 Issues (Top 10)
以下是过去 24 小时内最受关注的 Issue，反映了当前的痛点与高优需求：

1. **[#7721](https://github.com/QwenLM/qwen-code/issues/7721) [P1/Bug] QQ Bot 会话恢复失败**
   - **关注点**：`AcpBridge.loadSession()` 导致桥接重启后无法恢复会话，影响长期任务的连续性，属于阻塞性高优 Bug。
2. **[#5800](https://github.com/QwenLM/qwen-code/issues/5800) [P2/Bug] 超高终端回复覆盖最后一行 (TUI Static 模式)**
   - **关注点**：在默认静态渲染下，当 AI 回复长度超过终端高度时，最后一行内容会在完成时消失，影响复制和阅读。
3. **[#7684](https://github.com/QwenLM/qwen-code/issues/7684) [P2/Bug] Mac 下多行状态栏导致输入法候选框错位**
   - **关注点**：macOS 用户的痛点，Command 模式下多行显示会导致系统输入法光标定位偏移。
4. **[#7697](https://github.com/QwenLM/qwen-code/issues/7697) [P3/Bug] VS Code 插件无法连接 Unity MCP**
   - **关注点**：开发者反馈 Claude Code 可以正常使用，但 Qwen Code 出现连接断层，MCP 集成的兼容性亟待排查。
5. **[#7717](https://github.com/QwenLM/qwen-code/issues/7717) [P2/Bug] 连续输入多个 Skill 时自动补全失效**
   - **关注点**：日常交互体验问题，一行内输入多个 `/skill` 时，仅有首个触发补全，降低操作效率。
6. **[#7685](https://github.com/QwenLM/qwen-code/issues/7685) [P3/Feature] 生成子代理时动态指定模型层级**
   - **关注点**：开发者希望 AI 能在调用 Subagent 时自主选择模型算力（如 small/high），以平衡成本与延迟。
7. **[#7719](https://github.com/QwenLM/qwen-code/issues/7719) [P3/Feature] CLI 缺乏 Token 使用量/百分比展示**
   - **关注点**：基础的可见性需求，用户呼吁在界面中直观展示当前 Session 消耗的 Token 数。
8. **[#6801](https://github.com/QwenLM/qwen-code/issues/6801) [P2/Feature] 引入 `pinned/` 防清除记忆目录**
   - **关注点**：核心记忆机制优化，希望提供只读目录，防止关键上下文在 `/dream`（记忆整合）时被意外篡改或删除。
9. **[#7699](https://github.com/QwenLM/qwen-code/issues/7699) [P2/Bug] Markdown 行内数学公式渲染与复制不一致**
   - **关注点**：针对 CLI 下的数学公式（LaTeX），解析器漏判 `$x$` 等单字符公式，且渲染、表格切片和流式输出规则不统一。
10. **[#7585](https://github.com/QwenLM/qwen-code/issues/7585) [P3/Feature] 提议增加直接外部上下文提供者**
    - **关注点**：企业级/团队协作需求，希望 CLI 能够直接从外部管理员配置的知识库中拉取共享上下文。

## 4. 重要 PR 进展 (Top 10)
今日的 PR 侧重重塑系统稳定性、强化安全边界以及优化 Web 端体验：

1. **[PR #7710](https://github.com/QwenLM/qwen-code/pull/7710) feat: 新增沙盒化 `/verify` 深度验证通道**
   - 引入维护者级别的 A/B 测试与空值检查，通过 `@qwen-code /verify` 指令对 PR 进行严密的举证验证。
2. **[PR #7729](https://github.com/QwenLM/qwen-code/pull/7729) feat: 添加 Goal v3 worker 工具**
   - 为 Agent 引入目标（Goal）只读快照与更新工具，强化子任务的上下文跟踪与状态流转。
3. **[PR #7725](https://github.com/QwenLM/qwen-code/pull/7725) fix: 解决 CI E2E Flaky 问题并加入 autofix 预检**
   - 将 5 个不可控的真实模型 E2E 测试迁移至 mock server，同时增加对 CI 假阳性失败的识别。
4. **[PR #7702](https://github.com/QwenLM/qwen-code/pull/7702) feat: 子代理生成时支持动态选择模型**
   - 响应 [Issue #7685](https://github.com/QwenLM/qwen-code/issues/7685)，在 Agent 工具中增加 `model` 参数，允许模型自主选择配置好的算力档位。
5. **[PR #7531](https://github.com/QwenLM/qwen-code/pull/7531) fix: 强化 AUTO 危险 Git 命令拦截**
   - 扩充了 `DESTRUCTIVE_GIT_PATTERNS`（如 `git clean` / `git checkout`）的拦截规则，修补了部分能绕过安全校验的拼写变体。
6. **[PR #7724](https://github.com/QwenLM/qwen-code/pull/7724) fix: Web Shell 支持无会话直接执行命令**
   - 在 Web Shell 新建任务时，输入 `!` 执行本地命令不再卡死，会自动懒加载创建会话。
7. **[PR #7197](https://github.com/QwenLM/qwen-code/pull/7197) fix: 退出计划模式后脱敏历史记录中的 plan 参数**
   - 在批准 `exit_plan_mode` 后，系统会将冗长的计划文本替换为简短的指针，从而节省后续交互的 Context 占用。
8. **[PR #7726](https://github.com/QwenLM/qwen-code/pull/7726) fix: 修复微信渠道凭据存储权限漏洞**
   - 修复了保存微信账号 Token 时，先写文件后改权限的时间差漏洞，确保凭据第一时间就是 `0600` 私有权限。
9. **[PR #7730](https://github.com/QwenLM/qwen-code/pull/7730) fix: 明确上下文文件覆盖系统默认提示词的优先级**
   - 在 System Prompt 中显式声明 `QWEN.md` 的规则优先级高于内置 Base Prompt，避免模型在指令冲突时产生幻觉。
10. **[PR #7620](https://github.com/QwenLM/qwen-code/pull/7620) fix: Web Shell 正确解析 256 色与真彩色 SGR 序列**
    - 修复 Web 端命令行输出颜色解析逻辑，将 `38;5;x` 等序列作为完整的单一颜色代码处理，解决终端乱码高亮问题。

## 5. 功能需求趋势
从近期 Issues 与 PR 中，可以清晰看出 Qwen Code 演进的四大核心趋势：
- **智能体精细化调度**：社区强烈要求对 Subagent 拥有更细粒度的控制，如按需分配不同规格的模型、带有状态快照的 Goal 导向执行。
- **外部集成与 MCP 生态扩充**：集成重点正从单纯的 Chat 转向 IDE（VS Code）深度联动、跨平台桥接（微信、QQ Bot）以及标准的 MCP（如 Unity）无缝接入。
- **记忆与上下文工程**：开发者需要更透明、可控的记忆管理机制。诸如防止误删的 `pinned/` 目录、外部共享上下文注入、以及通过上下文优先级声明来优化 Prompt 效果。
- **性能与成本可观测性**：对 Token 消耗的实时监控需求（如 TPS、TTFT、Session 配额）显著增加，用户希望工具更具「解释性」。

## 6. 开发者关注点 (痛点总结)
- **CLI/TUI 渲染稳定性仍是重灾区**：大量 P2/P3 Bug 集中在终端 UI 层面，包括多行状态栏导致终端向上滚动、输入法光标偏移、数学公式流式渲染断层等。由于终端环境差异，这些问题极大地影响了交互体验。
- **MCP 与网关兼容性参差不齐**：开发者反馈在切换不同的 LLM Provider（如从 Qwen 切换至 Claude）或连接特定 MCP Server 时，存在回调端口冲突、Auth 失败等问题，跨端体验需要拉齐。
- **自动化 CI 的脆弱性**：核心团队花费了大量精力去处理 E2E 测试的 Flaky 问题以及重构 Triage 工作流，说明在快速迭代中，如何保障 Agent 自动化介入时的稳定性与准确性依然是个挑战。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*