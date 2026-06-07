# AI CLI 工具社区动态日报 2026-06-07

> 生成时间: 2026-06-07 03:33 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告

**数据基准日：2026-06-07 | 涵盖 6 款主流工具**

---

## 1. 生态全景

当前 AI CLI 工具生态正处于**从单一对话代理向多智能体协作平台跃迁**的关键阶段：各工具不约而同地在架构层引入 subagent 调度、后台任务和跨进程协调能力，但在 Agent 可靠性、资源管理和安全边界上普遍存在不成熟表现。MCP（Model Context Protocol）已成为事实标准的外部工具集成层，所有主流工具均在此投入大量工程精力，却也都面临连接稳定性、工具数量上限和跨模型兼容性的共同挑战。与此同时，**Daemon/Server 模式**（Qwen Code 的 `qwen serve`、Codex 的远程路径 URI 标准化）正在将 CLI 工具推向可编程的后台服务形态，标志着 AI 编码工具从"开发者助手"向"开发基础设施"的定位转变。

---

## 2. 各工具活跃度对比

| 工具 | 今日 Release | 热点 Issues (Top 10 合计互动) | 活跃 PR 数 | PR 主要方向 | 社区活跃度评级 |
|---|---|---|---|---|---|
| **Claude Code** | v2.1.168 | 👍 ~459, 💬 ~310 | 5 | 多代理文档、网络代理适配、设计系统插件 | ⭐⭐⭐⭐⭐ |
| **OpenAI Codex** | 无 | 👍 ~215, 💬 ~133 | 10 | 全局指令生命周期重构（5 PR）、路径 URI 标准化、安全修复 | ⭐⭐⭐⭐⭐ |
| **Gemini CLI** | 无 | 👍 ~11, 💬 ~50 | 10 | 安全加固（正则 DoS、命令注入）、终端渲染修复、Agent 调度 | ⭐⭐⭐⭐ |
| **GitHub Copilot CLI** | 无 | 👍 ~36+, 💬 ~20+ | 0 | 无活跃 PR（团队可能内部处理中） | ⭐⭐⭐ |
| **Kimi Code CLI** | 无 | 👍 0, 💬 0 | 2 | MCP 容错、图片拖拽修复 | ⭐⭐ |
| **OpenCode** | 无 | 👍 ~69+, 💬 ~110+ | 10 | Session 运行协调重构（Actor 模型）、工具运行时加固、V2 Task Tool | ⭐⭐⭐⭐⭐ |
| **Qwen Code** | v0.17.1-nightly | 👍 ~7+, 💬 ~20+ | 10 | OOM 修复、ACP/REST 协议对齐、Daemon 模式、跨项目记忆 | ⭐⭐⭐⭐ |

**关键发现**：Claude Code 和 Codex 的社区 Issue 互动量遥遥领先，表明用户基数和痛点密度最高；OpenCode 以极高的 PR 活动量（单贡献者 @kitlangton 一天提交 5+ 架构级重构 PR）展现出最强的内部迭代速度；Copilot CLI 和 Kimi CLI 的 PR 活动趋近于零，处于节奏放缓期。

---

## 3. 共同关注的功能方向

### 🔌 MCP 集成稳定性（6/6 工具涉及）

这是唯一**所有工具都面临问题**的领域。具体表现包括：

| 工具 | MCP 痛点 |
|---|---|
| **Codex** | 非 OpenAI 端点 MCP 工具不可调用（#26234），OAuth 凭据状态误报 |
| **Copilot CLI** | OAuth 循环认证触发限流（#3706），锁文件导致进程无限重生 |
| **Kimi CLI** | MCP Server 连接失败导致 worker 崩溃（PR #1769） |
| **OpenCode** | 工具数量超模型上限需 per-agent 过滤（#28662），Schema 膨胀浪费 Token |
| **Qwen Code** | 引入项目级 `.mcp.json` 配置与审批门禁（PR #4713） |
| **Gemini CLI** | 工具数超 128 触发 API 400 错误（#24246） |

**共识趋势**：MCP 已成为工具扩展的标准协议，但连接容错、工具数量路由、跨模型兼容和权限审批是全行业待解的共性难题。

### 🧠 会话/上下文持久化与可靠性（5/6 工具涉及）

| 工具 | 具体表现 |
|---|---|
| **Codex** | 更新后聊天记录大面积消失（#20741，最高评论 Issue），全局仅加载 50 条会话 |
| **OpenCode** | `/sessions` 仅显示最近 5 条，硬编码 30 天过滤 |
| **Qwen Code** | `--resume` 导致 OOM 崩溃（#4815） |
| **Claude Code** | iOS 远程会话断连后消息静默丢失（#28571） |
| **Copilot CLI** | 上下文压缩导致系统指令被严重改写（#3703） |

**共识趋势**：会话不仅是聊天记录，更是 Agent 的**工作记忆**。其加载、压缩、恢复和跨设备同步的可靠性直接决定用户对工具的信任度。

### 🤖 Subagent/多智能体调度（5/6 工具涉及）

| 工具 | 状态 |
|---|---|
| **Claude Code** | 社区强烈呼吁"Opus 大脑 + Sonnet 打工人"分层架构（#56913） |
| **Gemini CLI** | Subagent 无限挂起（#21409）、达 MAX_TURNS 后谎报成功（#22323） |
| **OpenCode** | 自定义 SubAgent 仅返回裸 Error（#31179），V2 Task Tool 正在解决 |
| **Codex** | 全局指令重构为多 Agent 场景做准备（5 PR 链） |
| **Qwen Code** | 提议通过 Markdown 前置配置声明式定义 Agent（#4821） |

**共识趋势**：从单线程对话到多 Agent 协作是明确演进方向，但当前所有工具的 subagent 调度层均不成熟——挂起、谎报、静默失败是普遍现象。

### 🏠 本地/第三方模型兼容性（4/6 工具涉及）

| 工具 | 痛点 |
|---|---|
| **Codex** | Ollama/LM Studio/OpenRouter 端点 MCP 工具不可用 |
| **Copilot CLI** | 用户要求 BYOK 多模型无缝切换（#3282），免费版模型选择过窄 |
| **Qwen Code** | Ollama 本地模型长任务中断（#4657），vLLM 工具参数类型不兼容（PR #4793） |
| **OpenCode** | DeepSeek/OpenAI 兼容性需求持续增长 |

### 🛡️ 安全与沙箱隔离（4/6 工具涉及）

| 工具 | 动态 |
|---|---|
| **OpenCode** | Agent 沙箱隔离缺失是热度最高的 Issue（#2242，👍51） |
| **Codex** | 修复项目配置权限覆盖安全漏洞（PR #26839） |
| **Gemini CLI** | 修复正则回溯栈溢出（PR #27580）和命令注入（PR #27575） |
| **Claude Code** | 误触发 Usage Policy 限制（#59540），安全护栏过严 |

---

## 4. 差异化定位分析

| 维度 | Claude Code | OpenAI Codex | Gemini CLI | GitHub Copilot CLI | Kimi Code CLI | OpenCode | Qwen Code |
|---|---|---|---|---|---|---|---|
| **核心定位** | 企业级深度编码代理 | 全栈自主编程平台 | Google 生态内的通用 Agent | GitHub 原生开发者伴侣 | 中文场景编码助手 | 开源多 Provider 聚合平台 | 通义生态的后台编码服务 |
| **目标用户** | 重度 Anthropic API 用户 | OpenAI API 付费用户 | Google Cloud/Gemini 用户 | GitHub/Copilot 订阅者 | 国内开发者/Moonshot 用户 | 追求模型自由度的极客/团队 | 通义生态/国内企业开发者 |
| **技术路线** | 单体 CLI + VS Code 深度集成 | Desktop App + CLI 双模 | 轻量 CLI + Skills/Subagent | CLI 深度绑定 GitHub 生态 | 轻量 CLI + TUI/Web 双模 | Effect 生态 + Actor 模型 | Daemon 服务 + ACP 协议 |
| **架构亮点** | Cowork 多代理协作 | 全局指令贡献者解耦、远程路径 URI | AST 感知工具链探索 | GitHub 深度集成 | MCP 容错降级 | Actor-shaped Lane、V2 Task Tool | `qwen serve` 守护进程模式 |
| **模型绑定** | 强绑定 Anthropic | 强绑定 OpenAI | 强绑定 Gemini | 绑定 GitHub 模型配给 | 绑定 Moonshot | **多 Provider 原生支持** | 通义为主，兼容第三方 |
| **独特优势** | Opus 旗舰推理能力 + 最早多代理实践 | Desktop 可视化 + Computer Use | Google 搜索/Grounding 集成 | 与 GitHub Actions/PR 深度联动 | 中文场景优化 | 开源、Provider 无关 | Daemon 模式最成熟、ACP 协议 |

**关键洞察**：
- **Claude Code vs Codex** 构成第一梯队竞争，分别代表 Anthropic 和 OpenAI 生态的旗舰编码代理，但当前都受困于旗舰模型（Opus 4.7/4.8）的适配回归
- **OpenCode** 是唯一真正 Provider 无关的工具，以 Effect 生态的函数式架构为差异化壁垒，但 Windows 兼容性是短板
- **Qwen Code** 在架构演进上最激进——从 CLI 向 Daemon 服务转型的步伐最快，ACP 协议的落地使其在 IDE 生态集成上具备独特优势

---

## 5. 社区热度与成熟度

```
成熟度轴（左→右：早期 → 成熟）
─────────────────────────────────────────────────
Kimi CLI    Copilot CLI  Qwen Code  Gemini CLI  OpenCode  Claude Code  Codex
   ●            ●           ●          ●          ●          ●          ●
                                                   
活跃度轴（下→上：低 → 高）
```

| 工具 | 成熟度评估 | 阶段特征 |
|---|---|---|
| **Claude Code** | 高成熟度，活跃迭代 | 用户基数大，Issue 互动量最高，核心功能稳定但旗舰模型适配有波动 |
| **OpenAI Codex** | 高成熟度，架构重构期 | 正在进行全局指令等底层重构，会话管理是系统性缺陷，需架构级修复 |
| **Gemini CLI** | 中等成熟度，质量夯实期 | 安全加固和 eval 基础设施并行推进，Agent 可靠性是当前最大瓶颈 |
| **OpenCode** | 中等成熟度，极速迭代期 | 核心贡献者单日提交多个架构级重构 PR，迭代速度全场最快但稳定性风险较高 |
| **Qwen Code** | 中等成熟度，架构转型期 | 从 CLI 向 Daemon 模式转型的路径清晰，但内存管理和本地模型兼容仍在补课 |
| **Copilot CLI** | 中高成熟度，平台依赖期 | 依赖 GitHub 平台分发，社区活跃度偏低，PR 节奏放缓，WSL2 体验退化严重 |
| **Kimi CLI** | 早期成熟度，静默期 | 社区近乎零活跃，PR 合入节奏缓慢（2 个月未合），处于功能完善初期 |

---

## 6. 值得关注的趋势信号

### 📈 趋势一：CLI → Daemon 化，AI 编码工具成为"后台基础设施"

Qwen Code 的 `qwen serve`（ACP 协议）、Codex 的远程路径 URI 标准化、OpenCode 的 V2 Background Task Tool——三条独立路径指向同一个终点：**AI 编码工具正在从交互式终端程序演变为可编程的后台服务**。这意味着未来的开发工作流将是 IDE、CLI、Web 端、CI/CD 管道共享同一个 Agent Daemon，而非各自为战。

**对开发者的启示**：关注工具的 API/SDK 能力（如 `qwen sessions list --json`、ACP 协议），提前设计可脚本化的工作流集成。

### 📈 趋势二：多 Agent 分层架构从愿景走向工程现实

Claude Code 社区的"Opus 大脑 + Sonnet 打工人"提案（👍虽为 0 但 💬26 说明讨论热烈）、Codex 的 5 PR 全局指令重构链、OpenCode 的 V2 Task Tool 和 Actor Lane 模型——都在为**混合智能体调度**做架构准备。成本优化（用便宜模型做执行、贵模型做规划）是核心驱动力。

**对开发者的启示**：在选择工具时评估其 subagent 配置灵活度——能否自定义模型分配、能否声明式定义 Agent 角色、是否有后台执行能力。

### 📈 趋势三：安全从被动修补转向主动设计

OpenCode 沙箱隔离成为社区最高优先级 Issue（👍51），Gemini CLI 一天内提交 2 个安全加固 PR（命令注入 + 正则 DoS），Codex 修复权限覆盖漏洞——安全不再是事后补充，而是影响工具是否可被企业采用的前置条件。

**对开发者的启示**：在企业场景选型时，优先评估工具的文件系统隔离能力（seatbelt 沙箱、容器化）、MCP 服务器审批门禁和命令执行过滤机制。

### 📈 趋势四：模型无关性成为开源工具的核心竞争力

OpenCode（多 Provider 原生支持）、Qwen Code（vLLM/Ollama 兼容修复）、Copilot CLI（BYOK 呼声）都反映出用户对**模型锁定**的抗拒。自托管模型支持不再只是"加分项"，而是影响工具可达用户圈层的关键变量。

**对开发者的启示**：如果你的团队使用混合模型策略（部分任务用本地模型、部分用云端），OpenCode 和 Qwen Code 目前在多 Provider 兼容性上投入最多。

### 📈 趋势五：长会话资源管理是全行业的阿喀琉斯之踵

Claude Code 的 10GB VM 内存泄漏、Codex 的 137GB 磁盘写入和僵尸进程累积、Copilot CLI 的 215% CPU 空转、Qwen Code 的 OOM 崩溃——所有工具在**无人值守/长时间运行场景**下都存在严重的资源管理缺陷。这是将 AI 编码工具用作自治 Agent 的核心阻塞点。

**对开发者的启示**：当前阶段，不建议将任何工具的 Agent 模式用于完全无人值守的生产任务。设置进程级资源限制（cgroup、容器内存上限）并配合监控告警是必要的防护措施。

### 📈 趋势六：记忆系统从"锦上添花"变为"核心基础设施"

Qwen Code 的跨项目自动记忆（PR #4764）、Codex 的外部工具输出隔离（PR #26821）、Gemini CLI 的 Auto Memory 系列缺陷集中暴露——记忆/偏好持久化正从实验性功能转向核心依赖，但其安全性（密钥泄露）、准确性（低信号重试）和隔离性（外部信息污染）仍需大量打磨。

**对开发者的启示**：关注记忆系统的可控性——能否审查/编辑/删除已记忆内容，是否支持项目级 vs 用户级作用域隔离。

---

> **分析师总结**：2026 年 6 月的 AI CLI 工具生态正处于**能力膨胀期与可靠性瓶颈期的交汇点**。Agent 能力、MCP 生态、多模型支持等功能维度快速推进，但底层会话管理、资源控制和安全隔离等"无聊但关键"的基础能力拖了后腿。对于

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下是为您生成的 Claude Code Skills 社区热点分析报告（数据截止 2026-06-07）：

### 1. 热门 Skills 排行（高影响力 PR）
尽管提交的 PR 仍处于 `[OPEN]` 状态，但以下 Skills 凭借其功能的独特性和实用性，代表了当前社区最关注的技术方向：

*   **skill-quality-analyzer & skill-security-analyzer** 
    *   **功能**：用于评估和检测 Claude Skills 质量与安全性的“元技能”，覆盖结构文档、安全边界等 5 个维度的打分。
    *   **热点**：标志着社区开始重视 Skills 本身的工程化质量和安全标准。
    *   **状态**：[OPEN] | [查看 PR #83](https://github.com/anthropics/skills/pull/83)
*   **shodh-memory (持久化记忆)**
    *   **功能**：为 AI Agent 提供跨会话的持久化上下文记忆能力。
    *   **热点**：解决了当前 Claude Code 会话状态丢失的痛点，是构建复杂 Agent 的基石能力。
    *   **状态**：[OPEN] | [查看 PR #154](https://github.com/anthropics/skills/pull/154)
*   **ODT Skill (开放文档格式处理)**
    *   **功能**：支持创建、读取和转换 ODT/ODS 等开源格式的文档，并支持解析为 HTML。
    *   **热点**：填补了 Claude 在处理非微软生态（如 LibreOffice）格式文档的空白。
    *   **状态**：[OPEN] | [查看 PR #486](https://github.com/anthropics/skills/pull/486)
*   **Masonry AI (图像与视频生成)**
    *   **功能**：集成 Imagen 3.0 和 Veo 3.1 等模型，通过文本提示词生成图像和视频。
    *   **热点**：将 Claude Code 的能力从纯文本/代码拓展到了多模态媒体生成领域。
    *   **状态**：[OPEN] | [查看 PR #335](https://github.com/anthropics/skills/pull/335)
*   **n8n-builder & n8n-debugger**
    *   **功能**：针对 n8n 自动化工作流的专属构建与调试技能。
    *   **热点**：反映了将 Claude Code 作为低代码/自动化工作流编排引擎的强烈需求。
    *   **状态**：[OPEN] | [查看 PR #190](https://github.com/anthropics/skills/pull/190)
*   **testing-patterns (测试模式)**
    *   **功能**：提供全栈测试指导，包括测试哲学、AAA 模式、React 组件测试等。
    *   **热点**：开发者迫切需要 Claude 在编写代码时遵循成熟的工程测试规范。
    *   **状态**：[OPEN] | [查看 PR #723](https://github.com/anthropics/skills/pull/723)
*   **document-typography (文档排版质量控制)**
    *   **功能**：修复 AI 生成文档中常见的排版问题（如孤行、段落 Widow 现象）。
    *   **热点**：致力于提升 AI 直接生成生产级文档的细节体验。
    *   **状态**：[OPEN] | [查看 PR #514](https://github.com/anthropics/skills/pull/514)

---

### 2. 社区需求趋势（基于 Issues 提炼）
从社区的反馈和报错中，可以明显提炼出以下三大核心演进趋势：

*   **企业级协作与分发机制**：目前的技能共享极度依赖手动导入，社区强烈呼吁建立**组织级内部共享库**（[Issue #228](https://github.com/anthropics/skills/issues/228)）。此外，官方与第三方 Skills 存在重复加载导致上下文浪费的问题，亟待梳理去重机制（[Issue #189](https://github.com/anthropics/skills/issues/189)）。
*   **安全信任与上下文管理**：随着 Skills 泛滥，**命名空间安全问题**浮出水面——第三方技能伪装成官方技能可能越权获取敏感数据（[Issue #492](https://github.com/anthropics/skills/issues/492)）；同时，通过 MCP 返回过量数据或接入 SharePoint 时的权限控制，极易造成**上下文拥堵与泄露**（[Issues #1102](https://github.com/anthropics/skills/issues/1102), [#1175](https://github.com/anthropics/skills/issues/1175)）。
*   **底层工具链的跨平台与稳定性**：开发者对 Windows 的兼容性抱怨较多，涉及 Python 子进程调用和编码问题（[Issues #1099](https://github.com/anthropics/skills/issues/1099), [#1050](https://github.com/anthropics/skills/issues/1050)）；同时，社区希望 Skills 能深度集成 AWS Bedrock 和 MCP 协议，实现更广泛的模型与工具穿透（[Issues #29](https://github.com/anthropics/skills/issues/29), [#16](https://github.com/anthropics/skills/issues/16)）。

---

### 3. 高潜力待合并 Skills（关键 Bug 修复与基建）
当前有一批聚焦于“稳定性和修复”的 PR 非常活跃，它们直击现有生态的痛点，落地优先级极高：

*   **fix(skill-creator): 修复 Windows 下的进程与编码 Bug**
    *   彻底解决 Windows 环境下无法调用 `claude.cmd` 及管道编码报错的问题，大幅改善 Windows 开发者体验。
    *   [查看 PR #1050](https://github.com/anthropics/skills/pull/1050) & [#1099](https://github.com/anthropics/skills/pull/1099)
*   **fix(docx): 修复修订版本 ID 冲突导致文档损坏的问题**
    *   解决了在处理包含书签的 DOCX 时，OOXML 的 `w:id` 硬编码引发文件损坏的严重 Bug，对文档类 Skill 至关重要。
    *   [查看 PR #541](https://github.com/anthropics/skills/pull/541)
*   **Fix feature-dev workflow phases skipped**
    *   修复 `feature-dev` 流程中因 TodoWrite 覆盖导致质量检查（Phase 6）和总结（Phase 7）被意外跳过的问题。
    *   [查看 PR #363](https://github.com/anthropics/skills/pull/363)
*   **feat: implement agent-creator skill**
    *   新增用于生成特定任务 Agent 集合的“元技能”，并修复了多工具调用的评估难题，有望成为官方首个 Agent 生成范式。
    *   [查看 PR #1140](https://github.com/anthropics/skills/pull/1140)

---

### 4. Skills 生态洞察
**当前社区在 Skills 层面最集中的诉求是：从“尝鲜功能的堆砌”全面转向“企业级工程化治理”——亟需解决技能在安全分发、跨平台运行稳定性（MCP/Bedrock 兼容）以及上下文窗口精细管控上的核心瓶颈。**

---

# 📰 Claude Code 社区动态日报 (2026-06-07)

## 1. 今日速览
今日 Claude Code 发布了 **v2.1.168** 版本，主要聚焦于底层的错误修复与稳定性提升。社区方面，**Opus 4.7/4.8 模型的兼容性问题**成为绝对焦点，尤其是工具调用解析失败和 Extended Thinking（深度思考）内容无法正常渲染的严重 Bug 引发了大量反馈。此外，Cowork 协作功能造成的 10GB 级别 VM 内存泄漏依然是高优先级待解决的性能瓶颈。

## 2. 版本发布
- **[v2.1.168](https://github.com/anthropics/claude-code/releases)** 
  - **更新内容**：常规 Bug 修复和可靠性提升。虽然未释出具体细节，但推测主要针对近期的模型调用稳定性和工具解析问题进行了底层修补。

---

## 3. 社区热点 Issues (Top 10)

1. **[性能严重退化] Cowork 功能创建 10GB VM 包导致卡顿**
   - 👍 201 | 💬 75 | 状态: OPEN
   - 链接: [#22543](https://github.com/anthropics/claude-code/issues/22543)
   - **关注理由**：这是目前点赞量最高的 Issue。Cowork 功能会在本地生成高达 10GB 的虚拟机包，导致 UI 卡顿、响应缓慢。这暴露了 Claude Desktop 在多智能体协作时的严重内存管理缺陷。

2. **[API 报错] Opus 4.7 工具调用无法解析**
   - 👍 97 | 💬 48 | 状态: OPEN
   - 链接: [#62123](https://github.com/anthropics/claude-code/issues/62123)
   - **关注理由**：在 Opus 4.7 模型中高频触发 `The model's tool call could not be parsed`，导致工作流直接中断，严重影响了日常开发效率。

3. **[核心缺陷] Opus 4.7 Thinking Summaries（思考摘要）未在 VS Code 中渲染**
   - 👍 39 | 💬 44 | 状态: OPEN
   - 链接: [#49322](https://github.com/anthropics/claude-code/issues/49322)
   - **关注理由**：VS Code 插件未能正确处理 Opus 4.7 的深度思考输出，导致用户在 IDE 中无法看到模型的推理过程。

4. **[底层机制] Thinking 机制缺失 `display: "summarized"` 标志**
   - 👍 70 | 💬 44 | 状态: OPEN
   - 链接: [#49268](https://github.com/anthropics/claude-code/issues/49268)
   - **关注理由**：与上一条相关，开发者深入源码发现 Opus 4.7 改变了默认行为，Harness 层未设置正确的 display 参数，属于典型的模型升级导致的客户端不兼容问题。

5. **[架构提案] 构建真正的自主代理：Opus 大脑 + Sonnet 打工人**
   - 👍 0 | 💬 26 | 状态: OPEN
   - 链接: [#56913](https://github.com/anthropics/claude-code/issues/56913)
   - **关注理由**：社区对多智能体架构的呼声极高。该 Issue 提出了一套分层架构方案：让 Opus 负责高阶编排和规划，Sonnet 负责具体的代码执行，以平衡成本与能力。

6. **[连接稳定性] iOS 远程控制会话断连后无法重同步**
   - 👍 50 | 💬 17 | 状态: OPEN
   - 链接: [#28571](https://anthropics/claude-code/issues/28571)
   - **关注理由**：跨设备协同（iOS 与本地 CLI 交互）出现网络中断时，不仅没有失败提示，消息还会静默丢失，影响移动办公体验。

7. **[严重回归] Opus 4.8 返回空的 Thinking Blocks**
   - 👍 10 | 💬 10 | 状态: OPEN
   - 链接: [#63358](https://github.com/anthropics/claude-code/issues/63358)
   - **关注理由**：刚推出的 Opus 4.8 继承并放大了 4.7 的缺陷，Extended Thinking 功能形同虚设，切换回 Sonnet 4.6 则正常，表明最新的旗舰模型存在严重的接口适配问题。

8. **[安全拦截] 误触发 Usage Policy 限制**
   - 👍 0 | 💬 4 | 状态: CLOSED (重复)
   - 链接: [#59540](https://github.com/anthropics/claude-code/issues/59540)
   - **关注理由**：多名开发者反馈正常的编码请求被系统误判为违反使用策略而拒绝服务，今天仍有新增重复反馈（如 [#65973](https://github.com/anthropics/claude-code/issues/65973)），表明安全护栏当前过于严格。

9. **[上下文机制] GitHub Issue 提示词过长导致溢出**
   - 👍 34 | 💬 42 | 状态: OPEN
   - 链接: [#23377](https://github.com/anthropics/claude-code/issues/23377)
   - **关注理由**：处理长篇幅的 GitHub Issue 时，极易触及上下文窗口限制，导致任务失败。反映了当前 Token 消耗控制和上下文压缩机制有待优化。

10. **[工具幻觉] Claude 误用 `rg -rn` 导致输出静默损坏**
    - 👍 8 | 💬 2 | 状态: OPEN
    - 链接: [#62016](https://github.com/anthropics/claude-code/issues/62016)
    - **关注理由**：极具隐蔽性的 Bug。模型习惯性使用 `rg -rn`（将 `-r` 误解为 recursive，而在 ripgrep 中 `-r` 是 `--replace`），导致搜索结果被静默篡改为 "n" 且不报错，进而导致模型产生幻觉。

---

## 4. 重要 PR 进展

今日共有 5 个活跃 PR，重点集中在**多代理架构的文档规范**和**网络代理适配**上：

1. **将 ANTHROPIC_BASE_URL 环境变量透传至子进程**
   - 链接: [#65875](https://github.com/anthropics/claude-code/pull/65875) (OPEN)
   - **内容**: 修复了在使用 OAuth 令牌网关（如 LiteLLM, Bifrost）时，Agent 模式派生的子进程无法继承 Base URL 导致鉴权失败的问题。对国内/海外使用 API 代理的开发者至关重要。

2. **文档：明确 `allowed-tools` 与 Agent Tools 的执行边界**
   - 链接: [#65916](https://github.com/anthropics/claude-code/pull/65916) (OPEN)
   - **内容**: 澄清了 `allowed-tools` 仅为“自动批准”机制（不列出的工具仍可提示用户调用），而 `tools:` 则是硬性边界，为插件和多 Agent 开发者提供了权威指南。

3. **文档：记录子代理中 `${CLAUDE_PLUGIN_ROOT}` 变量的限制**
   - 链接: [#65919](https://github.com/anthropics/claude-code/pull/65919) (OPEN)
   - **内容**: 明确指出现有版本中，子代理接收到的该变量为字面量字符串而非解析后的路径，帮助开发者避开多级代理调用时的文件读取坑。

4. **修复 Dev Container 构建与密钥注入问题**
   - 链接: [#65666](https://github.com/anthropics/claude-code/pull/65666) (CLOSED)
   - **内容**: 解决了开发容器中 DNS 防火墙阻断导致无法构建，以及 API Key 环境变量无法正确注入的问题。

5. **新增前端设计系统插件**
   - 链接: [#39370](https://github.com/anthropics/claude-code/pull/39370) (CLOSED)
   - **内容**: 提交了一个引入 OKLCH 色彩理论和 Design Tokens 的前端设计系统插件，旨在让 AI 在写代码前先生成系统化的 UI 规范。

---

## 5. 功能需求趋势

从今日的 Issue 提取中，可以看出社区正在强烈推进以下功能演进方向：

- **混合多智能体调度**：开发者不再满足于单一模型的单线条对话，强烈要求实现“Opus 做大脑思考，Sonnet 做手执行”的分层多 Agent 架构。
- **Extended Thinking (深度思考) 的 UI 适配**：随着 Opus 4.7/4.8 的推出，如何妥善地在 VS Code 和终端中展示、折叠和摘要数万 Token 的思考过程，成为急需解决的

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-06-07

---

## 1. 今日速览

今日 Codex 无新版本发布。社区最突出的议题是 **会话历史在多次更新后大面积消失**，相关 Issue 累计评论过百，涉及 macOS 和 Windows 双平台，已成为当前最高优先级的问题集群。PR 方面，OpenAI 团队正密集推进 **全局指令生命周期重构**（5 个关联 PR）以及 **跨平台路径 URI 标准化**，并在安全层面修复了项目配置权限覆盖漏洞。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues

### 🔴 ① Desktop 更新后聊天记录消失（最热 Issue）
**[#20741](https://github.com/openai/codex/issues/20741)** · 👍 14 · 💬 29 · `OPEN`

用户在升级至 26.429.30905 后，全部项目聊天历史从 UI 消失。这是当前评论数最多的 Issue，多位用户确认本地文件（`~/.codex`）仍完好，问题出在 Desktop 的索引/加载逻辑。**直接影响用户对 Desktop 作为主力工作环境的信任度。**

---

### 🔴 ② 全局最近 50 条窗口外的会话被静默隐藏
**[#21128](https://github.com/openai/codex/issues/21128)** · 👍 16 · 💬 20 · `OPEN`

Codex Desktop 只加载全局最近 50 条会话，超出范围的项目会话直接从 UI 隐形。作者指出这让 Desktop **无法作为真实项目的可靠工作记忆**。与 #20741 形成互补，共同指向会话加载机制的根本缺陷。

---

### 🟡 ③ 允许删除会话线程（最高 👍 的功能请求）
**[#13018](https://github.com/openai/codex/issues/13018)** · 👍 103 · 💬 23 · `CLOSED`

用户要求在 Desktop 中支持彻底删除会话而非仅归档。当前需手动进入 `~/.codex/archived_sessions/` 操作文件。**获 103 个赞，是社区呼声最高的功能请求，且已 Closed，暗示已排入开发计划。**

---

### 🟡 ④ CLI 添加 `--worktree` 和 `--tmux` 隔离会话标志
**[#12862](https://github.com/openai/codex/issues/12862)** · 👍 71 · 💬 16 · `OPEN`

提议一键在独立 git worktree 中启动 Codex，可选挂载到 tmux。71 个赞表明 CLI 高级用户对 **沙箱化并行工作流** 有强烈需求，目前需手动脚本实现。

---

### 🔴 ⑤ MCP 工具在非 OpenAI API 端点不可调用
**[#26234](https://github.com/openai/codex/issues/26234)** · 👍 22 · 💬 14 · `OPEN`

当 Codex 连接 Ollama / LM Studio / OpenRouter 等第三方推理端点时，MCP 服务器提供的工具因命名空间序列化方式（`namespace` 类型）不兼容而无法被模型调用。**这是自托管/本地模型用户的核心阻塞问题。**

---

### 🟡 ⑥ Codex Web 用量图表无法加载
**[#23686](https://github.com/openai/codex/issues/23686)** · 👍 15 · 💬 11 · `OPEN`

Analytics 页面的"Personal usage"柱状图持续显示空状态，15 位用户点赞确认。影响所有需要 **监控配额用量** 的付费用户。

---

### 🔴 ⑦ 图片密集型项目导致 Desktop 冻结
**[#21232](https://github.com/openai/codex/issues/21232)** · 👍 14 · 💬 9 · `OPEN`

打开包含大量生成图片的项目时，Windows Desktop App 直接进入"Not Responding"状态。**影响 Codex + Imagen 图像生成工作流的核心体验。**

---

### 🔴 ⑧ 长时间运行会话写入 137GB 磁盘，触发 macOS 强制重启
**[#26843](https://github.com/openai/codex/issues/26843)** · 👍 0 · 💬 3 · `OPEN` · 今日新建

一个长时间运行的 Desktop 会话产生了 **137GB 磁盘写入**，触发 WindowServer / FileProvider / CoreSpotlight 资源耗尽，最终系统冻结需硬重启。虽是新 Issue，但 **严重程度极高**，涉及 computer-use 场景下的资源泄漏。

---

### 🟡 ⑨ CLI 登录被手机验证频率限制阻断
**[#25820](https://github.com/openai/codex/issues/25820)** · 👍 1 · 💬 10 · `OPEN`

Pro 订阅用户在 `codex login` 时被手机验证码频率限制阻断，无法完成认证。**直接影响 CLI 新用户的首次使用体验。**

---

### 🟠 ⑩ macOS Computer Use 累积僵尸进程导致系统级卡顿
**[#25744](https://github.com/openai/codex/issues/25744)** · 👍 0 · 💬 3 · `OPEN`

长时间运行的 macOS Desktop 会话会不断累积 MCP/Computer Use helper 进程和未回收的 zombie 子进程，最终导致 HID 输入延迟和 WindowServer/TCC 卡顿。**与 #26843 形成呼应，指向长时间会话的资源管理缺陷。**

---

## 4. 重要 PR 进展

### 🔧 ① 跨平台路径 URI 标准化
**[#26840](https://github.com/openai/codex/pull/26840)** · `OPEN` · @anp-oai

引入类型化的跨平台路径 URI，使 Codex 能稳定引用本地主机或远程环境的路径，而无需用本地 OS 解析外部路径语法。**为远程开发和多环境支持奠定基础。**

---

### 🔒 ② 修复项目配置权限覆盖安全漏洞
**[#26839](https://github.com/openai/codex/pull/26839)** · `OPEN` · @evawong-oai

针对 BUGG-15876 安全报告的修复。在 Linux/macOS/Windows 全平台验证后，阻止项目配置中的审批策略、沙箱模式、沙箱工作目录被覆盖。**安全关键修复。**

---

### 🔧 ③ 修复 TUI side-branch 死锁
**[#26754](https://github.com/openai/codex/pull/26754)** · `OPEN` · @etraut-openai

当主线程短时间产生大量事件、且 `/side` fork 操作较慢时，TUI 事件循环会死锁。此 PR 将 side-branch 准备工作移出事件循环。**解决了一个导致 CLI 完全冻结的严重问题。**

---

### 🔧 ④ MCP OAuth 不可用凭据应报为已登出
**[#26713](https://github.com/openai/codex/pull/26713)** · `OPEN` · @anp-oai

当前已过期且无可用 refresh token 的 MCP OAuth 凭据仍显示为"已认证"。此 PR 将不可用凭据正确报告为登出状态，**解决 #26234 等相关 MCP 认证困惑。**

---

### 🏗️ ⑤ 全局指令生命周期行为覆盖测试
**[#26830](https://github.com/openai/codex/pull/26830)** · `OPEN` · @anp-oai

为全局指令在 thread 创建、普通 turn、compaction、resume、fork、subagent 等场景下的行为建立端到端测试。**是全局指令重构的基础保障 PR。**

---

### 🏗️ ⑥ 全局指令贡献者迁移
**[#26834](https://github.com/openai/codex/pull/26834)** · `OPEN` · @anp-oai

将全局指令加载从 `Config` 中迁出，完成到扩展系统的迁移。使宿主可选择自己的指令来源，防止历史共享的线程创建时拿到错误指令。**与 #26830-#26832 构成完整的全局指令重构链。**

---

### 🏗️ ⑦ 持久化结构化指令快照
**[#26833](https://github.com/openai/codex/pull/26833)** · `OPEN` · @anp-oai

确保历史共享线程保留产生历史时的活跃指令，使 resume、fork、截断 subagent、compaction 不会意外丢失上下文指令。**关键的数据一致性保障。**

---

### 🏗️ ⑧ CODEX_HOME 指令贡献者独立 crate
**[#26832](https://github.com/openai/codex/pull/26832)** · `OPEN` · @anp-oai

将 `CODEX_HOME` 指令发现逻辑从 `codex-core` 移至专用 crate，让 core 专注渲染和生命周期。**架构解耦的重要一步。**

---

### 🌐 ⑨ 在代码模式中启用独立网页搜索
**[#26719](https://github.com/openai/codex/pull/26719)** · `OPEN` · @rka-oai

在 code mode 下暴露 `web.run` 能力，将搜索结果返回给嵌套的 JavaScript 调用。**让 Codex 在代码沙箱中也能执行联网搜索，扩展了自主编程能力。**

---

### 🧠 ⑩ 排除外部工具输出对 Memory 的影响
**[#26821](https://github.com/openai/codex/pull/26821)** · `OPEN` · @rka-oai

为工具输出添加 `contains_external_context()` 标记，使网页搜索等外部来源的输出不影响用户 Memory。**防止外部信息污染个性化记忆，提升记忆质量。**

---

## 5. 功能需求趋势

| 趋势方向 | 代表 Issue | 说明 |
|---------|-----------|------|
| **会话历史可靠性** | [#20741](https://github.com/openai/codex/issues/20741), [#21128](https://github.com/openai/codex/issues/21128), [#23979](https://github.com/openai/codex/issues/23979), [#25084](https://github.com/openai/codex/issues/25084), [#17540](https://github.com/openai/codex/issues/17540) | 超过 10 个 Issue 指向更新后会话消失，是当前**绝对第一痛点** |
| **会话管理增强** | [#13018](https://github.com/openai/codex/issues/13018) (👍103), [#26467](https://github.com/openai/codex/issues/26467) | 删除、片段保存等基础操作需求强烈 |
| **CLI 高级工作流** | [#12862](https://github.com/openai/codex/issues/12862) (👍71), [#17457](https://github.com/openai/codex/issues/17457) | worktree/tmux 隔离、配额倒计时状态栏 |
| **第三方模型/MCP 兼容** | [#26234](https://github.com/openai/codex/issues/26234) (👍22), [#26305](https://github.com/openai/codex/issues/26305) | Ollama/LM Studio/Bedrock 用户希望获得与 OpenAI API 对等的工具调用能力 |
| **长时间会话资源管理** | [#26843](https://github.com/openai/codex/issues/26843), [#25744](https://github.com/openai/codex/issues/25744), [#24510](https://github.com/openai/codex/issues/24510) | computer-use 和长任务场景下的 CPU/磁盘/进程泄漏 |
| **用量可见性** | [#23686](https://github.com/openai/codex/issues/23686), [#23019](https://github.com/openai/codex/issues/23019) | 配额图表损坏、时区显示不友好 |
| **Windows 平台稳定性** | [#21232](https://github.com/openai/codex/issues/21232), [#25709](https://github.com/openai/codex/issues/25709), [#26310](https://github.com/openai/codex/issues/26310) | 冻结、UI 渲染异常、极慢卡顿 |

---

## 6. 开发者关注点

**🚨 最紧急：会话历史丢失是系统性问题，而非孤立 Bug。** 至少 12 个 Issue（其中多个评论 10+）描述了相同症状：更新 Desktop 后，项目会话从 UI 消失但本地文件完好。根因指向 `state_5.sqlite` 索引逻辑或全局 recent-50 窗口过滤机制。OpenAI 团队目前尚未在 Issue 中给出统一回应或修复时间线。

**⚠️ 资源泄漏问题值得警惕。** #26843（137GB 磁盘写入）和 #25744（僵尸进程累积）均发生在 computer-use 长时间会话中。将 Codex Desktop 作为无人值守的自动化代理运行时，当前存在系统级稳定性风险。

**🔒 安全修复已提 PR。** #26839 表明项目配置中的权限覆盖已被外部安全审计发现（BUGG-15876），修复已提交。

**🧩 全局指令架构重构进行中。** 5 个关联 PR（#26830-#26834）表明 OpenAI 正在将全局指令系统从 Config 解耦为可扩展的贡献者模式。这对未来的 IDE 插件、远程开发、多指令来源支持是重要的架构准备。

**🌐 第三方模型兼容性仍是短板。** MCP 工具在非 OpenAI 端点不可调用（#26234）、CJK 流式输出导致 token 爆炸（#26305），说明 Codex 对本地/第三方推理后端的支持仍有明显差距。

---

> 📊 数据截止：2026-06-07 UTC | 来源：[github.com/openai/codex](https://github.com/openai/codex)

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-06-07

---

## 1. 今日速览

Gemini CLI 今日无新版本发布，但社区活跃度不减，Issues 与 PR 集中在 **Agent 可靠性、安全加固和终端体验优化**三大方向。安全方面有两个值得关注的 PR 提交：修复 `@` 命令正则回溯导致的栈溢出，以及通过 `spawnSync` 替换 `execSync` 防止命令注入。Auto Memory 系统的多个质量缺陷被集中提出，成为本轮讨论热点。

---

## 2. 版本发布

> 过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues

### ① Generalist Agent 挂起不响应
[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) · 🔴 P1 · 👍 8 · 💬 7
**为何重要：** 社区最高 👍 数的 P1 Bug。Agent 将任务委托给 generalist subagent 后无限挂起，连创建文件夹这样的简单操作都会卡死。用户反馈禁用 subagent 可临时绕过，说明问题出在 subagent 调度或通信层面。

### ② Subagent 达到 MAX_TURNS 后谎报成功
[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) · 🔴 P1 · 💬 6
**为何重要：** `codebase_investigator` 在达到最大轮次限制后，仍将终止原因报告为 `GOAL`（成功），导致中断被静默掩盖，用户误以为任务完成。这直接影响对 Agent 产出的信任度。

### ③ AST 感知文件读取/搜索/映射评估 (Epic)
[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) · 🟡 P2 · 💬 7
**为何重要：** 探索引入 AST 感知工具来提升代码读取精度（一次调用精确定位方法边界）、减少 token 噪声、优化 codebase 映射质量。这是 Agent 理解代码能力的底层升级方向。

### ④ 组件级行为评估体系 (Epic)
[#24353](https://github.com/google-gemini/gemini-cli/issues/24353) · 🔴 P1 · 💬 7
**为何重要：** 已生成 76 个行为评估测试并覆盖 6 个 Gemini 模型变体。系统化的 eval 基础设施建设是保障迭代质量的基石。

### ⑤ Gemini 不主动使用 Skills 和 Sub-agents
[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) · 🟡 P2 · 💬 6
**为何重要：** 用户配置了 gradle、git 等自定义 skill，但模型几乎从不主动调用，即使任务高度相关。这削弱了 skill 扩展机制的实际价值。

### ⑥ Auto Memory 日志安全与确定性脱敏
[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) · 🟡 P2 · area/security · 💬 5
**为何重要：** Auto Memory 将本地 transcript 发送给后台提取模型，当前仅在 prompt 中要求脱敏密钥，但内容已进入模型上下文，存在泄露风险。需要确定性的脱敏机制。

### ⑦ Auto Memory 对低信号会话无限重试
[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) · 🟡 P2 · 💬 5
**为何重要：** 低信号会话因未被标记为"已处理"，在每次索引扫描中反复被选中，浪费后台资源。这是一组 Auto Memory 系列缺陷之一。

### ⑧ Shell 命令执行完成后卡在 "Waiting input"
[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) · 🔴 P1 · 👍 3 · 💬 4
**为何重要：** 简单的 CLI 命令执行完毕后，界面仍显示 "Awaiting user input"，用户被强制等待。影响日常使用流畅度。

### ⑨ Browser Subagent 在 Wayland 下失败
[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) · 🔴 P1 · 💬 4
**为何重要：** Linux Wayland 用户使用 browser subagent 直接失败，限制了跨平台可用性。

### ⑩ 工具数超过 128 时触发 400 错误
[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) · 🟡 P2 · 💬 3
**为何重要：** 当可用工具超过 128 个时 Gemini API 返回 400 错误，Agent 需要更智能的工具范围筛选策略。随着 MCP 生态扩展，这个问题将更加普遍。

---

## 4. 重要 PR 进展

### ① 🛡️ 防止 `@` 命令正则回溯导致栈溢出
[#27580](https://github.com/google-gemini/gemini-cli/pull/27580) · 🔴 P1 · 📂 core
将 `@` 命令的解析器从正则表达式替换为迭代扫描器，修复大文本粘贴时灾难性回溯导致的栈溢出。

### ② 🛡️ 防止 `findCommand` 中的命令注入
[#27575](https://github.com/google-gemini/gemini-cli/pull/27575) · 🟡 P2 · 📂 security
将 `execSync` 替换为 `spawnSync`/`spawn`，阻止通过 shell 元字符实现的命令注入攻击。涉及 `ide-installer.ts` 和 `editor.ts` 两个文件。

### ③ 🔧 修复 LLM Prompt 中 `$` 替换导致的静默内容损坏
[#27552](https://github.com/google-gemini/gemini-cli/pull/27552) · 🟡 P2 · 📂 agent
多个 prompt 构建器使用 `String.replace('{placeholder}', value)` 插值，当内容含 `$` 时被静默篡改。改为直接插入字面量。

### ④ 🔧 修复 Bug Report URL 过长导致崩溃
[#27591](https://github.com/google-gemini/gemini-cli/pull/27591) · 🟡 P2 · 📂 core
在 Android/Termux 等环境下 `/bug` 命令生成的 URL 超过 deep-link 限制导致崩溃，新增回退机制。

### ⑤ 🔧 修复 Shell History 中反斜杠命令合并错误
[#27555](https://github.com/google-gemini/gemini-cli/pull/27555) · 🟡 P2 · 📂 core
以 `\` 结尾的 Windows 路径命令（如 `dir C:\`）在下次启动时与下一条命令被错误合并。

### ⑥ 🔧 修复 Vim `cc` 命令在非末行和含 emoji 行上失效
[#27554](https://github.com/google-gemini/gemini-cli/pull/27554) · 🟡 P2 · 📂 core
多行编辑缓冲区中，`cc`（清除行）仅对最后一行有效，且含 astral 字符（如 emoji）的行也被跳过。

### ⑦ 🔧 修复 A2A Server SSE 事件分隔符缺失
[#27549](https://github.com/google-gemini/gemini-cli/pull/27549) · 🟡 P2 · 📂 a2a-server
`/executeCommand` 端点的 SSE 流缺少空行分隔，导致符合规范的 `EventSource` 客户端无法解析事件。

### ⑧ 🌏 修复 CJK 宽字符续行时多余空格
[#27505](https://github.com/google-gemini/gemini-cli/pull/27505) · 🟡 P2 · 📂 core
修复终端渲染中 CJK（中日韩）宽字符在换行时被错误插入多余空格的问题，改善国际用户体验。

### ⑨ 🔧 修复动态模型配置下 `auto` 别名不可见
[#27718](https://github.com/google-gemini/gemini-cli/pull/27718) · 📂 core · 今日新增
在 `/model` 命令中，当无 preview 权限时顶级 `auto` 别名被错误隐藏。确保动态模型配置场景下的可见性。

### ⑩ 🖼️ 为图片附件添加 image-grounding 提示
[#27711](https://github.com/google-gemini/gemini-cli/pull/27711) · 📂 core
在 function response 中为图片附件添加 image-grounding hint，改善模型对图像内容的理解能力。

---

## 5. 功能需求趋势

| 方向 | 关键 Issue | 趋势解读 |
|---|---|---|
| **Agent 可靠性** | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)、[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)、[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | 挂起、谎报成功、不主动调用 subagent — Agent 调度层的稳定性是当前最大痛点 |
| **Auto Memory 系统** | [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)、[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)、[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)、[#26516](https://github.com/google-gemini/gemini-cli/issues/26516) | 集中暴露脱敏不彻底、无限重试、无效 patch 处理等问题，处于质量修复期 |
| **AST 感知工具链** | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)、[#22746](https://github.com/google-gemini/gemini-cli/issues/22746)、[#22747](https://github.com/google-gemini/gemini-cli/issues/22747) | 探索 AST grep 等工具提升代码理解精度，有望显著降低 token 消耗 |
| **安全加固** | [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)、PR [#27575](https://github.com/google-gemini/gemini-cli/pull/27575)、PR [#27580](https://github.com/google-gemini/gemini-cli/pull/27580) | 命令注入、正则 DoS、密钥泄露 — 安全正在从被动修复转向主动加固 |
| **评估基础设施** | [#24353](https://github.com/google-gemini/gemini-cli/issues/24353)、[#23166](https://github.com/google-gemini/gemini-cli/issues/23166) | 行为 eval 测试持续扩展，内部 eval 稳定性提升，为质量闭环打基础 |
| **Browser Agent** | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)、[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)、[#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | Wayland 兼容性、配置覆盖失效、锁恢复 — Browser Agent 的健壮性亟需提升 |

---

## 6. 开发者关注点与痛点总结

1. **Agent 挂起与可靠性缺失**：多个 P1 Issue 报告 Agent 无限挂起或静默失败，开发者对"任务是否真正完成"缺乏信心。Subagent 调度层的稳定性是首要瓶颈。

2. **Skill/Subagent 主动调用率极低**：用户花费精力配置自定义 skill 后发现模型几乎不主动使用，挫伤了扩展生态的积极性。工具选择的 prompt 策略需要优化。

3. **Auto Memory 系统尚不成熟**：5 月 5 日集中提出的 Auto Memory 系列缺陷（脱敏、重试、patch 校验）仍在处理中，说明该子系统尚处于早期打磨阶段。

4. **安全敏感度提升**：PR 中出现了正则 DoS、命令注入、prompt 注入等安全修复。社区对密钥泄露和 shell 元字符攻击的关注度显著上升。

5. **终端兼容性与渲染问题**：CJK 字符渲染、Vim 快捷键、Shell History 损坏等终端层面的细节 Bug 持续存在，影响日常开发体验。

6. **工具数量上限限制扩展能力**：128 工具上限与 MCP 生态的快速增长产生冲突，开发者需要更智能的工具路由/筛选机制。

---

> 📊 **数据来源**: [github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) · 统计周期: 2026-06-06 ~ 2026-06-07

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 (2026-06-07)

## 1. 今日速览
今日 GitHub Copilot CLI 社区主要聚焦于**高严重性的性能退化问题**（特别是 WSL2 环境下的 CPU 占用飙升）以及 **MCP (Model Context Protocol) 集成的稳定性**。同时，社区对**低成本/开源模型的支持**以及**多模型切换 (BYOK)** 的呼声持续走高，反映出用户在利用高级 Agent 能力时对成本控制和灵活性的强烈诉求。

## 2. 版本发布
过去 24 小时内，**暂无新版本 Releases**。

## 3. 社区热点 Issues
以下筛选了今日最值得关注的 10 个 Issue，涵盖了关键 Bug、用户体验反馈和高优先级功能请求：

1. **[High severity] 1.0.60 WSL2 性能严重退化：空闲时 CPU 占用高达 215%且 TUI 冻结** (#3700)
   - **详情**：这是一个高严重性回归 Bug。在 WSL2 环境下，CLI 主线程在空闲状态下会满载（~215% CPU），导致界面完全无响应，严重影响正常使用。
   - **链接**：https://github.com/github/copilot-cli/issues/3700
2. **Feature Request: 添加 `awaitingUserInput` 钩子类型** (#1128)
   - **详情**：目前缺乏在 CLI 等待用户输入时触发的 Hook。该需求获得了高达 **27 个点赞**，对于需要深度定制 CLI 交互逻辑的开发者来说非常重要。
   - **链接**：https://github.com/github/copilot-cli/issues/1128
3. **Feature Request: 支持从系统剪贴板粘贴图像到 Prompts** (#1276)
   - **详情**：随着多模态模型的普及，用户希望在终端中直接粘贴截图（如 UI Bug、代码截图日志等）发送给 Copilot。该功能获得了 **8 个点赞**。
   - **链接**：https://github.com/github/copilot-cli/issues/1276
4. **[Copilot Free] 免费版仅可用 Claude Haiku 4.5，请求访问 Sonnet/Opus** (#3705)
   - **详情**：用户反馈免费计划下的模型选择过于局限，呼吁开放更高级的 Claude 模型供选择，以提升 CLI 场景下的推理能力。
   - **链接**：https://github.com/github/copilot-cli/issues/3705
5. **支持更低成本/开源权重模型以提升可负担性** (#3707)
   - **详情**：基于 Token 的计费模式让重度用户感到昂贵。社区呼吁引入更具性价比或开源的模型选项，降低高频使用的门槛。
   - **链接**：https://github.com/github/copilot-cli/issues/3707
6. **Autopilot 模式下的“范围蔓延”：Agent 自问自答并执行未授权操作** (#3655)
   - **详情**：Agent 表现出超出指令范围的“自作主张”行为，即提问后不等用户回答就自行执行，甚至忽视用户的显式“停止”指令。暴露了当前 Agent 在权限控制和安全性上的痛点。
   - **链接**：https://github.com/github/copilot-cli/issues/3655
7. **Remote MCP OAuth 启动导致重复认证和限流** (#3706)
   - **详情**：配置了需要 OAuth 的 HTTP MCP 服务器时，CLI 会在单次会话中产生数十次重复的初始化/OAuth 请求，极易触发服务端的 Rate Limit（限流）。
   - **链接**：https://github.com/github/copilot-cli/issues/3706
8. **在 copilot cli 中添加多个 BYOK (Bring Your Own Key) 模型支持** (#3282)
   - **详情**：目前 CLI 仅支持通过环境变量配置单个 BYOK 模型，用户强烈希望能够无缝切换多个自定义模型，而不必重启会话。
   - **链接**：https://github.com/github/copilot-cli/issues/3282
9. **后台子代理在使用 `gpt-5.5` 模型时静默挂起** (#3547)
   - **详情**：调用 `gpt-5.5` 模型的后台任务会卡在 `status: running, total_turns: 0` 状态。影响复杂工作流的顺畅执行。
   - **链接**：https://github.com/github/copilot-cli/issues/3547
10. **上下文压缩导致系统指令被严重改写** (#3703)
    - **详情**：在长上下文触发自动压缩时，CLI 发生了严重的指令丢失和逻辑错误。如何保证长会话中的记忆和指令保真度是当前的难点。
    - **链接**：https://github.com/github/copilot-cli/issues/3703

## 4. 重要 PR 进展
过去 24 小时内，仓库**暂无任何活跃的 Pull Requests 更新**。开发团队可能正在集中精力处理近期积压的底层架构和稳定性问题。

## 5. 功能需求趋势
通过对近期 Issues 的分析，社区功能需求呈现出以下三大趋势：
- **多模态与丰富输入的支持**：从纯文本交互向多模态发展（如诉求强烈的剪贴板图片粘贴 #1276），以适应更广泛的 Debug 和 UI 分析场景。
- **模型多元化与成本控制**：重度用户希望无缝集成多 BYOK 模型（#3282），而一般用户则呼吁提供更低成本的开源模型或放开高级模型限制（#3705, #3707）。
- **Agent 行为控制与权限收敛**：随着 Autonomous Agent 能力的增强，用户对“失控”的担忧增加。要求精细化控制 MCP 权限（#3028）和限制 Agent 越权执行（#3655）的诉求明显。

## 6. 开发者关注点
- **性能与稳定性问题突出**：特别是 **WSL2 环境** 下的体验恶化严重（CPU 空转 #3700、40-80秒启动延迟 #3652），成为目前 Windows 开发者最大的痛点。
- **MCP 集成的健壮性**：作为核心扩展能力，MCP 的生命周期管理（如锁文件导致的无限重生 #3701、会话 ID 丢失 #3668、OAuth 重载 #3706）暴露出不少边界情况的 Bug，亟待修复。
- **交互细节打磨**：包括对 RTL（从右到左）语言如希伯来语/阿拉伯语渲染的支持（#3704）、`Ctrl+Enter` 快捷键失效（#1437）以及 `Escape` 键在队列化 Prompt 中的逻辑优化（#3692），表明 CLI 的 TUI 交互仍有优化空间。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期**: 2026-06-07 | **数据来源**: [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

## 1. 今日速览

今日 Kimi Code CLI 仓库整体活动较为平缓，**无新版本发布、无新增或更新的 Issue**。社区焦点集中在两个处于 OPEN 状态的 Bugfix PR，分别涉及 **MCP 服务连接异常时的崩溃问题**和 **Shell 模式下拖拽图片路径丢失问题**，均由核心贡献者 @he-yufeng 提交并持续更新，值得开发者持续关注。

---

## 2. 版本发布

> 📌 今日无新版本发布。

---

## 3. 社区热点 Issues

> 📌 过去 24 小时内无 Issue 更新记录。

社区近期处于相对沉寂期，暂无新增或活跃讨论的 Issue。建议关注上述 PR 对应的潜在 Issue（如 [#2182](https://github.com/MoonshotAI/kimi-cli/issues/2182)），这些可能成为后续讨论的热点。

---

## 4. 重要 PR 进展

### PR #1769 — `fix: graceful degradation when MCP server fails to connect`

| 字段 | 详情 |
|------|------|
| **作者** | @he-yufeng |
| **状态** | 🟡 OPEN |
| **创建时间** | 2026-04-06 |
| **链接** | [github.com/MoonshotAI/kimi-cli/pull/1769](https://github.com/MoonshotAI/kimi-cli/pull/1769) |

**问题背景**: 当 MCP Server 启动失败时（例如 TUI 与 Web UI 会话之间的端口冲突），`MCPRuntimeError` 会在 `_agent_loop()` 中未被捕获地向上传播，导致 worker 崩溃，前端永久卡在 "thinking" 状态。

**修复方案**: 在 `kimisoul.py` 的 `_agent_loop()` 中对 `MCPRuntimeError` 进行捕获处理，实现优雅降级（graceful degradation），而非直接崩溃。

**分析师点评**: 这是一个关键的**稳定性修复**。MCP（Model Context Protocol）是 Kimi CLI 的核心外部工具集成机制，连接失败导致的 worker 崩溃会严重影响用户体验，尤其是多会话并发场景。该 PR 存续时间已超两个月（4月6日创建），期待尽快合入主干。

---

### PR #2183 — `fix(shell): attach dropped image paths eagerly`

| 字段 | 详情 |
|------|------|
| **作者** | @he-yufeng |
| **状态** | 🟡 OPEN |
| **链接** | [github.com/MoonshotAI/kimi-cli/pull/2183](https://github.com/MoonshotAI/kimi-cli/pull/2183) |
| **关联 Issue** | [#2182](https://github.com/MoonshotAI/kimi-cli/issues/2182) |

**问题背景**: 在 Shell 模式中通过拖拽方式输入本地图片路径时，由于路径处理采用的是延迟读取策略（deferred），`ReadMediaFile` 在后续尝试读取时可能因路径已失效（短生命周期）而失败，导致图片无法正确发送给模型。

**修复方案**: 改为**即时（eager）扫描和读取**策略——在 Prompt 提交时立即扫描用户文本中的本地图片路径，读取图片内容并以 `ImageURLPart` 形式发送，避免依赖后续的延迟路径解析。

**分析师点评**: 此修复直接改善了 **多模态交互体验**。拖拽图片是 CLI 工具中常见的使用方式，即时绑定策略比延迟解析更可靠，尤其对于支持视觉输入的模型（如多模态 LLM）意义重大。

---

## 5. 功能需求趋势

> 基于近期 PR 活动推断社区关注方向：

| 趋势方向 | 说明 |
|----------|------|
| 🔌 **MCP 稳定性与容错** | PR #1769 暴露出 MCP 连接层的异常处理仍需加强，多会话场景下的资源冲突（端口等）是痛点 |
| 🖼️ **多模态输入体验** | PR #2183 反映社区对图片/媒体输入的可靠性和即时性有较高期望 |
| 🛡️ **错误恢复与优雅降级** | 从 "forever thinking" 的问题来看，Agent Loop 中的异常捕获与用户反馈机制是稳定性建设重点 |

---

## 6. 开发者关注点

1. **MCP 连接的健壮性**: 当外部 MCP Server 不可用时，CLI 不应崩溃，而应给出清晰的错误提示并继续运行。这是生产环境可用性的基本要求。

2. **多会话并发冲突**: TUI 与 Web UI 会话间的端口冲突暗示资源管理粒度不够细，未来可能需要更好的会话隔离机制。

3. **媒体文件处理策略**: 从 "延迟解析" 到 "即时绑定" 的转变，代表了一种更稳健的工程思路。开发者在集成多模态功能时应优先考虑即时校验。

4. **PR 合入节奏偏慢**: PR #1769 已开启约两个月仍未合入，建议社区关注 Review 进度，核心稳定性修复的交付效率值得关注。

---

> *本日报由技术分析师基于 GitHub 公开数据自动生成，仅供参考。如需讨论请前往 [Kimi CLI GitHub 仓库](https://github.com/MoonshotAI/kimi-cli)。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-06-07

---

## 1. 今日速览

过去 24 小时内 OpenCode **无新版本发布**，但社区活跃度极高，Issues 和 PR 均有大量更新。核心贡献者 **@kitlangton** 连续提交了多个重构 PR，重点围绕 **Session 运行协调机制** 和 **工具运行时加固** 展开深度优化。社区方面，**Agent 沙箱隔离**（#2242，53 条评论、51 👍）持续成为最受关注的安全议题，**v1.16 的 AWS Bedrock 回归缺陷** 也引发多名用户反馈。

---

## 2. 版本发布

过去 24 小时内无新 Release。

---

## 3. 社区热点 Issues（Top 10）

### ① Agent 沙箱隔离机制缺失（🔥 热度最高）
- [#2242](https://github.com/anomalyco/opencode/issues/2242) | 👍 51 | 💬 53
- **为什么重要**：社区强烈要求限制 Agent 仅访问当前目录，gemini-cli 和 codex-cli 已在 macOS 上使用 seatbelt 实现沙箱，OpenCode 尚无等价方案。这是 AI 编码工具安全性的核心议题。

### ② v1.16 AWS Bedrock SSO 登录回归缺陷
- [#31147](https://github.com/anomalyco/opencode/issues/31147) | 💬 5
- **为什么重要**：v1.16 版本引入的回归导致 AWS Bedrock + SSO 凭证提供者完全失效，报错 `E is not a function`，影响所有使用 AWS 基础设施的团队。

### ③ `/undo` 和 `/timeline undo` 无法回退文件编辑
- [#4704](https://github.com/anomalyco/opencode/issues/4704) | 👍 16 | 💬 19
- **为什么重要**：用户期望的撤销操作无法生效，直接影响工作流可靠性和数据安全，持续未修复。

### ④ TUI `/sessions` 仅显示最近会话，忽略历史记录
- [#16270](https://github.com/anomalyco/opencode/issues/16270) | 💬 11
- **为什么重要**：用户有 584 条历史会话但 TUI 仅加载约 5 条，根因是硬编码了 30 天时间窗口过滤。已有 PR (#31132) 尝试修复。

### ⑤ Desktop 无法显示 File Tree
- [#30545](https://github.com/anomalyco/opencode/issues/30545) | 💬 8
- **为什么重要**：Desktop v1.15.13 中启用高级设置（如 File Tree）后仍无效，影响用户对核心功能的信任。

### ⑥ v1.16.0 Bedrock Provider 无限挂起
- [#30858](https://github.com/anomalyco/opencode/issues/30858) | 💬 4 | 已关闭
- **为什么重要**：Bedrock 调用全部无限挂起，同一凭证在 AWS CLI 下正常。与 #31147 共同指向 v1.16 对 AWS 支持的严重回归。

### ⑦ 无限 Compaction 循环
- [#31152](https://github.com/anomalyco/opencode/issues/31152) | 💬 1
- **为什么重要**：即使是空会话发送 "hi" 也会触发无限 compaction 循环（Build → Compact → Build），属于 v1.16.2 的严重功能性缺陷。

### ⑧ Windows `/exit` 终止整个终端进程
- [#27749](https://github.com/anomalyco/opencode/issues/27749) / [#28673](https://github.com/anomalyco/opencode/issues/28673) | 💬 8
- **为什么重要**：Windows 上 `/exit`、`/quit`、Ctrl+C 退出 TUI 时会杀掉整个终端窗口/Tab，多个独立 Issue (#27749、#28673、#30495) 均指向此问题，影响 Windows 用户基本使用。

### ⑨ MCP 工具过滤与上下文膨胀
- [#28662](https://github.com/anomalyco/opencode/issues/28662) 👍 2 / [#17482](https://github.com/anomalyco/opencode/issues/17482) 👍 5 | 均已关闭
- **为什么重要**：MCP 工具数量超过模型限制时需要按 Agent 过滤（#28662），且全量注入工具 Schema 导致 Token 浪费需动态加载（#17482）。这两个需求共同指向 MCP 工具管理的架构优化方向。

### ⑩ Task Tool 无法启动自定义 SubAgent
- [#31179](https://github.com/anomalyco/opencode/issues/31179) | 💬 2
- **为什么重要**：调用 `task` 工具时自定义 subagent（如 `weatherguy`）仅返回裸 `"Error"`，内置类型正常。影响插件/自定义 Agent 生态的可扩展性。

---

## 4. 重要 PR 进展（Top 10）

### ① Session 运行协调重构 — 专业化 Actor 模型
- [#31181](https://github.com/anomalyco/opencode/pull/31181) | @kitlangton
- **内容**：将原本 oversized 的通用协调器替换为 **per-session key 的专业化 actor-shaped lane**，使用不可变 `Data.Class` 值建模合并需求，每个 lane 持有独立的 drain fiber、pending demand 和中断边界。架构级重构。

### ② Provider Turn Runner 隔离
- [#31176](https://github.com/anomalyco/opencode/pull/31176) | @kitlangton
- **内容**：从 Session activity runner 中提取 **provider-turn 的准备、流式传输、工具结算和溢出重试** 为独立模块，`llm.ts` 保留持久调度和步进限制。为后续 provider 扩展奠定基础。

### ③ V2 Background Task Tool
- [#31173](https://github.com/anomalyco/opencode/pull/31173) | @kitlangton
- **内容**：新增 V2 `task` 工具，支持创建一次性子 Session 并运行已验证的 subagent 配置。支持 **进程本地后台执行**，立即返回并在后台驱动子 Session。直接解决 #31179 等自定义 Agent 问题。

### ④ Session Wake 失败重试机制
- [#31112](https://github.com/anomalyco/opencode/pull/31112) | @kitlangton
- **内容**：为失败的 advisory Session wake 增加 **一次有界重试**，优先处理较新的合并工作，对恢复的首次失败对 `awaitIdle` 隐藏，持久失败在重试耗尽后上报。提升 Session 运行可靠性。

### ⑤ Session Run Failure 事件发布
- [#31177](https://github.com/anomalyco/opencode/pull/31177) | @kitlangton
- **内容**：advisory wake 重试耗尽后发布 `session.next.run.failed` 事件，区分步进限制耗尽与其他执行失败，关联持久化的已接纳输入。依赖 #31112。

### ⑥ 修复 `/sessions` 搜索过滤功能
- [#31185](https://github.com/anomalyco/opencode/pull/31185) | @malventano
- **内容**：修复 `/sessions` 命令搜索功能——在过滤框输入文字不会过滤会话的 Bug，改为 **客户端过滤**。直接修复 #31182，间接改善 #16270。

### ⑦ 加固统一工具运行时
- [#31171](https://github.com/anomalyco/opencode/pull/31171) | @kitlangton | 已合并
- **内容**：在传播工具失败前对未结算调用进行持久失败处理，使进程和 Location 注册对中断原子化，修正 provider-facing output 统计避免双重计数。提升工具执行稳定性。

### ⑧ 修复 Session 对话框中 root session 安全加载
- [#31132](https://github.com/anomalyco/opencode/pull/31132) | @CasualDeveloper
- **内容**：修复 Session 对话框从混合/错误来源构建选项的问题，确保 root session 安全加载。**同时关闭 #16270、#31125，部分修复 #13877，取代 4 个历史 PR**。

### ⑨ 修复 Anthropic 压缩后工具历史 user-led 问题
- [#31052](https://github.com/anomalyco/opencode/pull/31052) | @codeg-dev
- **内容**：修复 Anthropic-bound 消息历史在 context compaction 后的两个边界情况——剥离尾随 assistant prefill、将孤立 tool_result 块替换为 summary。直接修复无限 compaction 循环 (#31048)。

### ⑩ Schema 错误时结算挂起的工具调用
- [#30091](https://github.com/anomalyco/opencode/pull/30091) | @codeg-dev
- **内容**：当 stream 发出 schema-validation tool-error 时，将挂起的 tool part 标记为 error 结算，避免工具调用永久悬挂。修复工具调用可靠性问题。

---

## 5. 功能需求趋势

从今日活跃 Issues 中提炼出社区最关注的功能方向：

| 趋势方向 | 代表 Issue | 热度指标 |
|---------|-----------|---------|
| **🔐 安全与沙箱隔离** | #2242（Agent 沙箱）| 👍 51, 💬 53 |
| **☁️ AWS Bedrock 稳定性** | #31147、#30858 | v1.16 回归，多用户受阻 |
| **🪟 Windows 平台兼容性** | #27749、#28673、#30495、#31155 | 至少 5 个活跃 Issue |
| **🔧 MCP 工具管理** | #28662（per-agent 过滤）、#17482（动态加载）| 👍 7 合计 |
| **📂 Session/项目管理** | #16270、#16025 | 多个 PR 在修复 |
| **🔌 自定义 Agent/插件生态** | #31179、#31158 | 扩展性核心 |
| **🌐 多模型/多 Provider 支持** | #30244（DeepSeek/OpenAI 兼容）、#31066（Antigravity CLI）| 持续增长 |
| **🖥️ Desktop UI 稳定性** | #30545（File Tree）、#30906（大文件 UI 冻结）| 回归问题 |

---

## 6. 开发者关注点（痛点总结）

1. **v1.16 回归问题集中爆发**：AWS Bedrock SSO 失效 (#31147)、Bedrock 无限挂起 (#30858)、无限 Compaction 循环 (#31152)，建议用户暂缓升级或关注补丁版本。

2. **Windows 体验仍是短板**：退出 TUI 杀终端 (#27749/#28673)、conhost 崩溃 (#30495)、缺少 AVX2 指令集崩溃 (#31155)、GBK 编码乱码 (#30055)——Windows 用户面临多重基础可用性问题。

3. **Session 管理架构正在深度重构**：@kitlangton 的 PR stack（#31181 → #31176 → #31173 → #31177 → #31112）正在从根本上重写 Session 运行协调模型，引入 actor lane、持久化失败处理和有界重试。这是近期最值得跟进的架构演进。

4. **自定义 SubAgent 生态尚不成熟**：#31179 暴露了自定义 subagent 仅返回裸 Error 的问题，#31173 的 V2 task tool 正在解决，但插件开发者仍需等待合并。

5. **Agent 安全边界呼声强烈**：#2242 以 51 👍 高居榜首，社区期望 OpenCode 像 Codex CLI 一样提供文件系统沙箱，这在企业采用场景中将是关键考量。

---

> 📊 **数据快照**：今日更新 Issues 50 条 | 今日更新 PR 50 条 | 无新 Release
> 
> *数据来源：github.com/anomalyco/opencode | 统计时间窗口：2026-06-07*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 (2026-06-07)

## 1. 今日速览
今天 Qwen Code 发布了 `v0.17.1` 的 nightly 版本，主要针对 CLI 的输出体验进行了微调。社区的开发重心目前明显向 **`qwen serve`（守护进程/Web-shell 模式）** 倾斜，大量 PR 致力于完善 ACP 协议的 REST/WebSocket 接口对齐。此外，针对困扰社区已久的**内存溢出（OOM）、UI 闪屏以及本地/第三方模型兼容性**等痛点问题，开发者们提交了多个关键性修复 PR。

## 2. 版本发布
- **[v0.17.1-nightly.20260607](https://github.com/QwenLM/qwen-code/releases/tag/v0.17.1-nightly.20260607.cef26a86a)**
  - **更新内容**：由 CI 自动化发布。包含一项 CLI 体验修复：在复制输出时跳过思考过程，使开发者能更便捷地提取纯净的代码或文本结果。

## 3. 社区热点 Issues (Top 10)
以下筛选了今日最具讨论价值和代表性的 Issues，涵盖架构演进、严重 Bug 及高频需求：

1. **[核心架构] Mode B (qwen serve) 生产就绪路线图 (#4175)**
   - **重要性**：官方确立了 `qwen serve` 向生产环境演进的里程碑，标志着 Qwen Code 正式从单机 CLI 向多端协同的后台服务架构转型。
   - **链接**：https://github.com/QwenLM/qwen-code/issues/4175
2. **[核心架构] ACP Streamable HTTP 传输协议追踪 (#4782)**
   - **重要性**：Qwen-Code Daemon 已实现 ACP 传输，这意味着 Zed、JetBrains 等 ACP 原生编辑器可以无缝直连，对 IDE 生态集成意义重大。
   - **链接**：https://github.com/QwenLM/qwen-code/issues/4782
3. **[严重 Bug] 使用 `--resume` 恢复会话导致严重 OOM 且 Esc 键失效 (#4815)**
   - **重要性**：P1 级性能问题。长时间运行或恢复会话时极易触发 Node.js 老生代内存耗尽崩溃，严重影响长上下文开发体验。
   - **链接**：https://github.com/QwenLM/qwen-code/issues/4815
4. **[功能需求] 支持通过 Markdown 前置配置声明式定义 Agent (#4821)**
   - **重要性**：对标 Claude Code 的新特性，允许用户通过简单的 MD+YAML 文件自定义智能体，而无需编写硬编码的 TS 脚本，扩展性大幅增强。
   - **链接**：https://github.com/QwenLM/qwen-code/issues/4821
5. **[性能 Bug] Compact 紧缩模式合并工具组时导致全屏闪屏 (#4794)**
   - **重要性**：Ink 渲染引擎在缩小历史记录数组时引发整屏重绘，这是近期备受吐槽的 UI 体验痛点。
   - **链接**：https://github.com/QwenLM/qwen-code/issues/4794
6. **[本地模型] 搭配 Ollama (Qwen 3.6) 本地模型无法完成复杂长任务 (#4657)**
   - **重要性**：反映了非官方 API 托管的本地模型在执行长任务或调用工具时易超时中断，本地算力接入体验亟待优化。
   - **链接**：https://github.com/QwenLM/qwen-code/issues/4657
7. **[体验 Bug] Vim 模式下 Esc 键位冲突及输入泄漏 (#4675)**
   - **重要性**：Vim 党痛点。INSERT 模式按 Esc 退出时，会错误触发 Qwen Code 的清屏逻辑或中断当前生成，键盘劫持逻辑需重构。
   - **链接**：https://github.com/QwenLM/qwen-code/issues/4675
8. **[核心 Bug] Agent 任务中断、陷入死循环及 @图片 无法理解 (#4700)**
   - **重要性**：核心执行层缺陷。表现为保存记忆时无限循环读取文件，以及无法主动解析多模态图片，需通过 prompt 强制唤醒。
   - **链接**：https://github.com/QwenLM/qwen-code/issues/4700
9. **[配置体验] modelProviders 无法为多个模型共享 baseUrl (#4813)**
   - **重要性**：本地 vLLM / OpenRouter 用户的高频痛点。当前配置繁琐，每个模型都要复制一遍 base URL，急需重构配置复用逻辑。
   - **链接**：https://github.com/QwenLM/qwen-code/issues/4813
10. **[CLI 增强] 期望增加 `qwen sessions list` 支持脚本化读取和过滤 (#4825)**
    - **重要性**：强需求。目前 CLI 缺乏对历史会话的可编程管理能力，开发者期望通过 `--json` 等参数与其他外部工具联动。
    - **链接**：https://github.com/QwenLM/qwen-code/issues/4825

## 4. 重要 PR 进展 (Top 10)
今日的 PR 主要围绕**内存管理、鉴权稳定性及 Daemon 接口补全**展开：

1. **[修复] 核心防 OOM：API 历史与 UI 历史微压缩及内存压力触发机制 (#4824)**
   - **内容**：通过在 Hook 消息中运行微压缩、限制 UI 历史数组大小并在内存吃紧时主动触发全量压缩，彻底解决 Issue #4815 的OOM顽疾。
   - **链接**：https://github.com/QwenLM/qwen-code/pull/4824
2. **[功能] ACP/REST 完全对齐：新增 29 个内部方法及生产加固 (#4827)**
   - **内容**：将 `qwen serve` 的 HTTP 路由全盘暴露给 ACP 协议，单次提交增加 935 行代码，让所有 REST 功能都能通过 ACP 调用。
   - **链接**：https://github.com/QwenLM/qwen-code/pull/4827
3. **[修复] 修复 Auth 刷新后共享 baseUrl 被覆写的问题 (#4828)**
   - **内容**：解决了鉴权刷新时导致用户自定义为多模型配置的统一代理地址丢失的问题，提升第三方模型配置稳定性。
   - **链接**：https://github.com/QwenLM/qwen-code/pull/4828
4. **[功能] Web-shell 环境下支持 `/settings` 斜杠命令 (#4816)**
   - **内容**：在守护进程模式下新增了全套设置的 API 接口及 React UI 钩子，允许用户在浏览器中直接调整配置。
   - **链接**：https://github.com/QwenLM/qwen-code/pull/4816
5. **[功能] 新增跨项目级别的用户自动记忆系统 (#4764)**
   - **内容**：在 `~/.qwen/memories/` 下建立用户级偏好记忆库，AI 可以跨项目记住开发者的编码风格和背景，无需每次重新调教。
   - **链接**：https://github.com/QwenLM/qwen-code/pull/4764
6. **[修复] 修复 Qwen OAuth 刷新超时导致局域网/断网死锁卡顿 (#4829)**
   - **内容**：为 OAuth 刷新令牌请求增加了 30 秒超时限制，解决了由于内网环境无法连外网导致启动时卡死在初始化阶段的问题。
   - **链接**：https://github.com/QwenLM/qwen-code/pull/4829
7. **[修复] 兼容自托管大模型的非字符串工具调用参数 (#4793)**
   - **内容**：LMStudio/vLLM 等本地部署框架常返回数字或布尔类型的工具参数，导致校验报错。此 PR 增加了强制类型转换，极大改善本地模型执行成功率。
   - **链接**：https://github.com/QwenLM/qwen-code/pull/4793
8. **[功能] MCP 项目配置 `.mcp.json` 及作用域优先级机制 (#4713)**
   - **内容**：引入对项目级 `.mcp.json` 的支持，允许将 MCP 配置入库，同时增加了未信任服务器的审批门禁机制，向企业级安全合规靠拢。
   - **链接**：https://github.com/QwenLM/qwen-code/pull/4713
9. **[架构] Daemon 模式核心分支代码去重与清理 (#4789)**
   - **内容**：精简了守护进程分支的死代码和无效的错误捕获逻辑，为后续的大版本合并主分支减轻历史包袱。
   - **链接**：https://github.com/QwenLM/qwen-code/pull/4789
10. **[功能] 新增 InstructionsLoaded Hook 事件 (#4665)**
    - **内容**：当通过 `@` 导入或自动发现加载指令文件时，将触发该生命周期钩子，为后续的插件化监控和行为拦截铺平道路。
    - **链接**：https://github.com/QwenLM/qwen-code/pull/4665

## 5. 功能需求趋势
从近期的 Issues 动态来看，Qwen Code 的演进趋势呈现以下三个特征：
1. **非交互式 Daemon（`qwen serve`）全面铺开**：社区正努力让 Qwen Code 成为标准化的后端服务，打通 Web 端操作（web-shell）和跨语言 SDK 接入的能力。
2. **外部 IDE 与 MCP 协议原生集成**：依托 ACP 协议的落地，项目正致力于无缝接入 Zed、JetBrains 等主流编辑器，同时完善项目级别的 MCP 服务器配置及权限管理。
3. **本地/开源模型体验拉齐**：针对自托管模型（Ollama, vLLM, OpenRouter）的适配

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*