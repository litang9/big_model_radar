# AI CLI 工具社区动态日报 2026-06-09

> 生成时间: 2026-06-09 02:48 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告（2026-06-09）

---

## 1. 生态全景

2026 年中，AI CLI 工具已从"命令行聊天助手"全面进化为**多 Agent 编排平台**。头部玩家（Claude Code、OpenAI Codex）聚焦 Desktop ↔ CLI 融合与多模态能力交付；开源挑战者（Qwen Code、OpenCode）以多 Agent 架构和多 Provider 适配作为差异化突破口；Google Gemini CLI 正在经历从"实验品"向企业级工具的安全加固阵痛；而 GitHub Copilot CLI 依托 IDE 生态稳步渗透，Kimi Code CLI 则处于技术栈重生的过渡期。整体呈现**巨头拼体验、开源拼架构、生态拼 Agent**的三层竞争格局。

---

## 2. 各工具活跃度对比

| 工具 | 今日活跃 Issues | 今日活跃 PRs | 新版本发布 | 代码库健康度信号 |
|---|---|---|---|---|
| **Claude Code** | ~15+（#63060 单条 79 评论） | 5 | ✅ v2.1.169（safe-mode、/cd） | 🔴 1M 计费 Bug 发酵；长期 macOS 网络问题未解 |
| **OpenAI Codex** | ~10（#26892 GPT-5.5 404 阻断级） | 10 | ✅ v0.138.0 正式版（Desktop 交接、图片生成） | 🟡 重大模型兼容性事故，但底层架构 PR 密集推进 |
| **Gemini CLI** | ~10（含 1.2TB 数据删除事故） | 10 | ✅ v0.47.0-nightly（UI 微调） | 🔴 Agent 安全性信任危机；安全 PR 批量合入 |
| **GitHub Copilot CLI** | ~6（无新版本） | 0 | ❌ 无 | 🟡 功能诉求明确（暂停/注入、BYOK），迭代节奏较慢 |
| **Kimi Code CLI** | 4（全部为阻断级回归 Bug） | 0 | ❌ 无 | 🔴 Python→TS 迁移阵痛期，核心功能断裂 |
| **OpenCode** | ~10（SQLite 迁移崩溃高频） | 10 | ❌ 无 | 🟡 无新发版但 PR 质量高，处于"修内功"阶段 |
| **Qwen Code** | **33**（全工具最高） | **50**（全工具最高） | ❌ 无 | 🟢 多 Agent 架构三线并进，开发强度遥遥领先 |

> **关键洞察**：Qwen Code 以 33 Issues / 50 PRs 的单日活跃度成为开源阵营中最激进的迭代者；而发布正式版的 Claude Code 和 OpenAI Codex 的社区讨论热度（评论数、👍 数）仍远超其他工具，反映其用户基数优势。

---

## 3. 共同关注的功能方向

| 功能方向 | 涉及工具 | 具体诉求与信号 |
|---|---|---|
| **🤖 多 Agent 编排与隔离** | Qwen Code（Workflow + Agent Team 双 PR）、Claude Code（worktree 隔离 Bug）、OpenAI Codex（Goal Operations API）、Gemini CLI（子代理挂起/谎报成功） | 行业正从单 Agent 向顺序编排 + 并行协作双模式跃迁，但隔离安全性和任务可靠性仍是普遍短板 |
| **🔌 MCP 协议深度集成** | Claude Code（Routine 权限、Chrome 导航回归）、Gemini CLI（SSRF 修复、工具发现原子更新）、OpenCode（Resources 协议请求）、GitHub Copilot CLI（Registry URL 构造错误） | MCP 已成标配协议，但工具注册稳定性、权限审批流、安全防护在所有工具中均不成熟 |
| **🖥️ Desktop ↔ CLI 体验统一** | Claude Code（多窗口 165👍 最高票）、OpenAI Codex（`/app` 命令无缝移交）、OpenCode（Web UI 导航按钮丢失） | 用户强烈要求跨端会话连续性和功能对等，Desktop 已非可选项而是必选项 |
| **🧠 长上下文 / 记忆管理** | Claude Code（1M 上下文计费争议、会话分支）、Qwen Code（全局用户级 Memory 已合并）、OpenCode（压缩丢失 AGENTS.md、/goal 持久化）、Gemini CLI（Auto Memory 隐私泄露） | 跨项目记忆、压缩后指令保持、目标持久化是长任务自主执行的基础能力 |
| **🪟 Windows / WSL 兼容性** | Claude Code（Cowork VM 崩溃、日文乱码）、OpenAI Codex（OAuth 失败、跨盘扫描延迟）、GitHub Copilot CLI（WSL 性能损耗） | Windows 生态开发者体验在所有工具中均为二等公民，WSL 集成是关键堵点 |

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 技术路线特征 | 目标用户 | 竞争壁垒 |
|---|---|---|---|---|
| **Claude Code** | 高端一体化开发 Agent | 自有模型 + Desktop + CLI 深度耦合；扩展性靠 Skills/Hooks/MCP | 专业开发者、企业团队 | 模型质量（Opus 4.8 1M）、用户体验细腻度 |
| **OpenAI Codex** | 多模态 + 跨平台 AI 编程环境 | Rust 内核 + Electron Desktop；Goal Operations SDK 层抽象 | 全栈开发者、跨平台用户 | GPT-5.5 多模态（图片生成）、Desktop 交接体验 |
| **Gemini CLI** | 安全优先的企业级 Agent | Node.js/TypeScript；强沙箱、SSRF 防护、遥测合规 | Google Cloud 企业用户、安全合规场景 | Google 生态集成、安全审计能力 |
| **GitHub Copilot CLI** | IDE 原生的轻量 Agent | 深度嵌入 VS Code / GitHub 工作流；BYOK 多模型 | GitHub 生态开发者 | IDE 集成深度、零配置启动 |
| **Kimi Code CLI** | 中文市场入门级 Agent | Python→TypeScript 重写中；DashScope 模型透传 | 中国开发者、Kimi 生态用户 | 中文理解、本地化模型成本优势 |
| **OpenCode** | 多 Provider 开源 Agent 框架 | Go 核心 + SQLite 存储；Bedrock/OpenAI/Claude 多网关适配 | 自托管/私有化部署企业 | Provider 抽象层、开源可定制性 |
| **Qwen Code** | 多 Agent 开源协作平台 | TypeScript；Workflow + Team + 声明式 Agent 三线并进；主动对齐 Claude Code API | 多 Agent 场景开发者、开源社区 | 多 Agent 编排架构领先、Claude 迁移兼容 |

---

## 5. 社区热度与成熟度

```
成熟度谱系（左→右：探索期 → 成长期 → 成熟期）

  Kimi Code      GitHub Copilot    Gemini CLI      OpenCode       Qwen Code      OpenAI Codex    Claude Code
  [重写阵痛]      [稳健渗透]       [安全加固]     [修内功期]     [激进跃迁]      [快速扩张]      [体验打磨]
     ●────────────────●────────────────●───────────────●───────────────●───────────────●───────────────●
```

**具体判断依据**：

- **Claude Code**：社区规模最大（单 Issue 最高 165👍、79 评论），功能请求已进入精细化阶段（会话分支树、per-agent 配置），说明核心功能已被深度使用。但计费和跨平台一致性问题是成熟度的最后一公里。
- **OpenAI Codex**：正式版迭代节奏快（v0.138.0 含重大功能），底层架构 PR 质量高（性能追踪、Goal 路由），但 GPT-5.5 大面积 404 暴露了模型上线与工具联动的工程短板。
- **Qwen Code**：活跃度碾压其他开源工具（50 PRs/天），多 Agent 架构三线并进，但 CI 跳过、TS 编译错误合入 main 等问题表明工程治理尚不匹配开发速度。
- **OpenCode**：PR 方向聚焦（网络重试、MCP 分页、数据库迁移兼容），是在为下一阶段扩张打地基，但频繁的 SQLite 迁移崩溃正在消耗用户信任。
- **Gemini CLI**：正处于安全合规的关键转型期——SSRF 修复、超时机制、零配额 fast-fail 批量合入，说明正在从"实验工具"向"生产工具"过渡。1.2TB 数据删除事件加速了这一进程。
- **GitHub Copilot CLI**：迭代最慢但用户基数大，依赖 GitHub 平台效应而非工具本身的技术竞争力。
- **Kimi Code CLI**：处于最脆弱的重写过渡期，核心功能（API 鉴权、@filename）断裂，若无快速修复将面临用户流失风险。

---

## 6. 值得关注的趋势信号

### 信号一：Agent 安全性从"建议"变为"底线需求"
Gemini CLI 的 1.2TB 数据删除事件、Claude Code 的 worktree 隔离失效、多工具普遍存在的破坏性命令缺乏确认机制——这些问题正倒逼整个行业建立 **Agent 执行安全基线**（沙箱隔离、路径校验、操作熔断）。开发者在选型时应优先评估工具的**防御性编程能力**，而非仅看模型智商。

### 信号二：多 Agent 编排成为下一代核心战场
Qwen Code 的 Workflow（顺序）+ Agent Team（并行）双模式、OpenAI Codex 的 Goal Operations API、Claude Code 的 Fleet/Agent 配置诉求——三大工具同时押注多 Agent。**2026 下半年，"单个 CLI 能否编排 10 个并行 Agent"将成为核心评测指标。**

### 信号三：Claude Code 正在成为事实标准接口
Qwen Code 主动对齐 Claude Code 的 YAML frontmatter Agent 定义、Dynamic Workflows 规范、Config 迁移路径；OpenCode 也在适配 Claude 的调用协议。**Claude Code 的扩展规范（CLAUDE.md、Skills、Hooks）正在成为 AI CLI 领域的"POSIX"**，开发者投资的 Skills 和 MCP 工具有望跨工具复用。

### 信号四：Desktop 不再是 CLI 的附属品
Claude Code 的多窗口需求（165👍）和 OpenAI Codex 的 `/app` 交接命令表明，**Desktop 已成为 CLI 工具的必选项而非附加品**。开发者期望的是"CLI 的速度 + Desktop 的可视化"无缝融合，单一形态将难以留住用户。

### 信号五：开源工具在 Provider 适配层投入重兵
OpenCode 的 Bedrock 网关修复、Qwen Code 的 DashScope 透传、GitHub Copilot CLI 的 BYOK 诉求——开发者不愿被单一模型绑定，**多 Provider/多网关的适配深度**将成为开源工具对冲闭源巨头的主要差异化手段。

---

> **给技术决策者的建议**：
> - **短期选型**：Claude Code 在体验完整度上仍领先，但需关注 1M 计费和跨平台一致性风险；OpenAI Codex 多模态能力强但需等待 GPT-5.5 稳定。
> - **开源替代**：Qwen Code 的多 Agent 架构最激进，适合愿意承担早期不稳定性的前沿团队；OpenCode 在多 Provider 私有化部署场景有独特价值。
> - **风险提示**：无论选择哪个工具，当前都应建立 Agent 操作的**外部安全护栏**（CI 门禁、文件系统监控、定期备份），不应信任任何工具的内置安全机制。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据来源：[github.com/anthropics/skills](https://github.com/anthropics/skills) | 数据截止：2026-06-09

---

## 1. 热门 Skills 排行

根据 PR 活跃度、更新频率及与高热度 Issue 的关联性，排列如下：

| 排名 | Skill | 作者 | 状态 | 核心功能 |
|:---:|-------|------|:----:|---------|
| 1 | **skill-creator 修复套件** | @Lubrsy706 / @joshuawowk / @gstreet-ops | OPEN | 修复 Windows 兼容性、YAML 解析、子进程管道崩溃等关键缺陷 |
| 2 | **agent-creator** | @SyedaQurratAI | OPEN | 元技能：自动创建任务专用 Agent 集合，修复多工具并行评估 |
| 3 | **document-typography** | @PGTBoos | OPEN | 解决 AI 生成文档中的孤字换行、寡妇段落、编号错位等排版问题 |
| 4 | **ODT（OpenDocument）** | @GitHubNewbie0 | OPEN | 创建、填充、解析和转换 ODT/ODS 等 OpenDocument 格式文件 |
| 5 | **AURELION 认知框架** | @Chase-Key | OPEN | 4 个技能套件：结构化思维模板 + 顾问 + Agent + 持久记忆 |
| 6 | **ServiceNow 平台助手** | @Vanka07 | OPEN | 覆盖 ITSM/ITOM/SecOps/HRSD/CSM 等全栈 ServiceNow 平台能力 |
| 7 | **n8n-builder + n8n-debugger** | @Wolfe-Jam | OPEN | 从零构建和调试 n8n 自动化工作流 |
| 8 | **feature-dev 工作流修复** | @Mr-Neutr0n | OPEN | 修复 TodoWrite 覆盖 bug 导致质量审查和总结阶段被跳过 |

### 重点解析

**① skill-creator 基础设施修复（多 PR 聚集）**
- [#539](https://github.com/anthropics/skills/pull/539) — 修复未加引号的 `description` 字段中的 YAML 特殊字符导致静默解析失败
- [#1099](https://github.com/anthropics/skills/pull/1099) — 修复 Windows 下 `run_eval.py` 子进程管道崩溃（所有查询被记录为 "not triggered"）
- [#1050](https://github.com/anthropics/skills/pull/1050) — 修复 Windows 下 `claude.cmd` 路径识别 + 编码问题

> 这三组 PR 直接回应了 [#556](https://github.com/anthropics/skills/issues/556)（触发率 0%）和 [#1169](https://github.com/anthropics/skills/issues/1169)（recall=0%）两个高热度 Issue，属于 **生态级阻塞 bug**。

**② agent-creator（[#1140](https://github.com/anthropics/skills/pull/1140)）**
- 元技能：根据任务描述自动组装专用 Agent 集合
- 修复多工具并行调用评估逻辑
- 增加 Windows `%APPDATA%` 路径支持
- 直接关联 Issue [#1120](https://github.com/anthropics/skills/issues/1120)

**③ document-typography（[#514](https://github.com/anthropics/skills/pull/514)）**
- 切中 AI 生成文档的普遍痛点：孤字换行（1-6 个词溢出）、寡妇段落（节标题落在页底）、编号对齐
- 理论上"影响 Claude 生成的每一份文档"，适用面极广

**④ ODT 格式支持（[#486](https://github.com/anthropics/skills/pull/486)）**
- 填补开源/ISO 标准文档格式的空白（ODT/ODS/ODF）
- 与已有的 DOCX/PDF skill 形成互补

---

## 2. 社区需求趋势

从 15 条高热度 Issue 中提炼出 **5 大需求方向**：

### 🏢 组织级协作与分发
> 关联 Issue: [#228](https://github.com/anthropics/skills/issues/228)（13 评论 / 7 👍）

社区强烈要求 Skills 支持组织内共享。当前需手动下载 `.skill` 文件通过 Slack/Teams 传递，用户期望共享技能库或直接分享链接。

### 🔧 Skill 创建与评估工具链稳定性
> 关联 Issue: [#556](https://github.com/anthropics/skills/issues/556)（11 评论 / 7 👍）、[#1169](https://github.com/anthropics/skills/issues/1169)（2 评论）、[#202](https://github.com/anthropics/skills/issues/202)（8 评论）

`skill-creator` 的评估脚本存在 **系统性故障**：
- `run_eval.py` 触发率始终为 0%（`claude -p` 无法触发技能）
- 描述优化循环 recall 恒为 0%
- Skill-creator 本身更像是"开发者文档"而非"可执行技能"

### 🔒 安全与信任边界
> 关联 Issue: [#492](https://github.com/anthropics/skills/issues/492)（7 评论 / 2 👍）、[#1175](https://github.com/anthropics/skills/issues/1175)（3 评论）

- 社区 Skill 以 `anthropic/` 命名空间分发，存在**冒充官方**的信任边界风险
- 在 SKILL.md 中直接编写访问控制逻辑（如 SharePoint 场景）引发安全顾虑
- 需要命名空间隔离 + 权限分级机制

### 🔌 MCP 集成与平台兼容
> 关联 Issue: [#16](https://github.com/anthropics/skills/issues/16)（4 评论）、[#29](https://github.com/anthropics/skills/issues/29)（4 评论）、[#1220](https://github.com/anthropics/skills/issues/1220)（2 评论）

- 将 Skills 暴露为 MCP 端点，使其可被其他工具调用
- AWS Bedrock 兼容性需求
- 多文件引用预加载/内联打包（当前仅 `SKILL.md` 被注入上下文）

### 📦 生态规范化
> 关联 Issue: [#189](https://github.com/anthropics/skills/issues/189)（6 评论 / 8 👍）、[#184](https://github.com/anthropics/skills/issues/184)（3 评论 / 4 👍）、[#1156](https://github.com/anthropics/skills/issues/1156)（2 评论）

- `document-skills` 和 `example-skills` 插件安装后产生重复技能
- `agentskills.io` 标准参考页面重定向循环
- 跨项目可移植性标签的真实性保障

---

## 3. 高潜力待合并 Skills

以下 PR 保持活跃更新且解决真实痛点，有望近期合入：

| PR | 技能 | 合并信号 | 预期价值 |
|----|------|---------|---------|
| [#538](https://github.com/anthropics/skills/pull/538) | PDF 引用路径大小写修复 | 纯 bugfix、改动小、影响 Linux 系统 | 🔴 阻塞性修复 |
| [#539](https://github.com/anthropics/skills/pull/539) | YAML 解析预校验 | 解决 #556 根因之一、1 文件改动 | 🔴 阻塞性修复 |
| [#1099](https://github.com/anthropics/skills/pull/1099) | Windows 子进程修复 | 解决 Windows 完全不可用问题、与 #1050 互补 | 🟡 平台兼容 |
| [#1050](https://github.com/anthropics/skills/pull/1050) | Windows 路径+编码修复 | 2 处 1 行改动、低风险 | 🟡 平台兼容 |
| [#509](https://github.com/anthropics/skills/pull/509) | 添加 CONTRIBUTING.md | 对应 #452、提升社区健康评分最有效的单文件 | 🟢 社区治理 |
| [#1140](https://github.com/anthropics/skills/pull/1140) | agent-creator 元技能 | 填补"自动创建 Agent"空白、含稳定性修复 | 🟢 新能力 |
| [#541](https://github.com/anthropics/skills/pull/541) | DOCX 修订标记 ID 冲突修复 | 解决文档损坏、影响 OOXML 共享 ID 空间 | 🟡 数据安全 |

> **优先级判断逻辑**：基础设施修复（#538、#539）> 平台兼容（#1099、#1050）> 社区治理（#509）> 新能力（#1140）

---

## 4. Skills 生态洞察

> **一句话总结：**
>
> 当前社区最集中的诉求是 **让 skill-creator 的评估工具链真正能跑起来**——`run_eval.py` 触发率为零、Windows 完全不可用、描述优化循环失效这三个系统性问题，阻塞了整个生态中 Skill 的创建、验证和质量迭代流程。在此基础上，组织级技能共享机制和命名空间安全隔离是社区期望 Anthropic 官方解决的第二优先级架构问题。

---

# Claude Code 社区动态日报 — 2026-06-09

---

## 1. 今日速览

Claude Code 发布 **v2.1.169**，新增 `--safe-mode` 排障模式和 `/cd` 工作目录切换命令，解决自定义配置导致的问题定位难题。社区方面，**1M 上下文额度报错**（#63060）持续发酵，累计 79 条评论成为今日最热 Issue；**多窗口支持**（#30154，165 👍）和**会话分支**（#32631）仍是呼声最高的功能需求。此外，多个新报的 Bug 指向模型选择器在不同平台间行为不一致，值得开发者警惕。

---

## 2. 版本发布

### [v2.1.169](https://github.com/anthropics/claude-code/releases/tag/v2.1.169)

| 特性 | 说明 |
|---|---|
| **`--safe-mode` 启动标志** | 新增 CLI 参数及对应环境变量 `CLAUDE_CODE_SAFE_MODE`，启动时禁用所有自定义配置（CLAUDE.md、插件、Skills、Hooks、MCP Servers），专用于排障场景 |
| **`/cd` 命令** | 允许在会话中切换工作目录，且**不破坏 prompt cache**，解决了此前切换目录必须重开会话的痛点 |

---

## 3. 社区热点 Issues

### 🔥 高优先级 / 高热度

**1. [BUG] API Error: Usage credits required for 1M context**
[#63060](https://github.com/anthropics/claude-code/issues/63060) · 💬 79 · 👍 30 · `bug` `area:cost`
> 使用 1M 上下文窗口时频繁触发额度不足报错，影响面广，大量用户跟帖报告相同问题。**涉及核心计费与模型可用性，为当前社区最大槽点。**

**2. [FEATURE] Multi-window support in Claude Code Desktop**
[#30154](https://github.com/anthropics/claude-code/issues/30154) · 💬 55 · 👍 165 · `enhancement` `area:desktop`
> 请求 Desktop 版支持多窗口/多会话并行查看。**165 个 👍 为本期最高**，社区刚需明确。

**3. [BUG] Persistent ECONNRESET Errors on macOS**
[#5674](https://github.com/anthropics/claude-code/issues/5674) · 💬 41 · 👍 36 · `bug` `platform:macos`
> macOS 上持续出现 ECONNRESET 网络断连，导致任务中断。仅 macOS 受影响，Windows/Linux 同网络正常。**长期未解决的网络层 Bug（2025-08 至今）。**

**4. [BUG] Cowork VM 完全不可用 — Windows 11 Insider (MSIX)**
[#27897](https://github.com/anthropics/claude-code/issues/27897) · 💬 35 · 👍 14 · `bug`
> Windows 11 Insider 版本中 Cowork VM 因 EXDEV rename 错误完全失效，影响 Windows 生态开发者体验。

**5. [BUG] Agent tool isolation: "worktree" 对 team agents 无效**
[#33045](https://github.com/anthropics/claude-code/issues/33045) · 💬 19 · 👍 9 · `bug` `area:agents`
> Agent 的 worktree 隔离未生效，agent 实际在主仓库中运行，**直接威胁多 Agent 协作场景的代码安全性**。

### 📌 值得关注

**6. [BUG] Chrome MCP 工具 "Navigation to this domain is not allowed"**
[#43255](https://github.com/anthropics/claude-code/issues/43255) · 💬 13 · 👍 7 · `bug` `regression` `area:chrome`
> 回归 Bug，Chrome MCP 在所有域名上导航被拦截，浏览器自动化能力受限。

**7. [BUG] 长会话触发文件系统限制**
[#29573](https://github.com/anthropics/claude-code/issues/29573) · 💬 16 · 👍 22 · `bug` `area:core`
> 长时间或多会话场景下 Claude 创建文件数达到系统上限，影响重度用户。

**8. [FEATURE] Conversation Branching — fork/merge/tree 完整方案**
[#32631](https://github.com/anthropics/claude-code/issues/32631) · 💬 9 · 👍 30 · `enhancement` `area:core`
> 社区提出完整的会话分支规范（fork/merge/tree 导航），是对现有 `/fork` 的系统性增强提案。

**9. [BUG] MCP 工具调用在 CCR Routines 中因权限审批失败**
[#61044](https://github.com/anthropics/claude-code/issues/61044) · 💬 6 · 👍 3 · `bug` `area:mcp` `area:routines`
> Routines 执行 MCP 工具时要求审批但不显示审批 UI，reconnect 也无法解决。**MCP + 自动化工作流的关键阻断问题。**

**10. [BUG] Desktop 与 CLI 对同一会话模型选择不一致（Opus 4.8 1M vs 非 1M）**
[#66410](https://github.com/anthropics/claude-code/issues/66410) · 💬 1 · `bug` `has-repro` `area:model`
> 同一会话 CLI 显示 "Opus 4.8 (1M)"，Desktop 显示普通 "Opus 4.8"，且 Desktop 共享会话会逐渐从 1M 漂移为非 1M。**今日新报，可能影响上下文容量预期。**

---

## 4. 重要 PR 进展

> 本期 PR 数量较少（5 条），以下为全部值得关注的内容：

| # | 标题 | 状态 | 说明 |
|---|---|---|---|
| [#66372](https://github.com/anthropics/claude-code/pull/66372) | fix(devcontainer): detect Docker daemon failures via `$LASTEXITCODE` | 🟢 Open | 修复 DevContainer 前置检查中 Docker 未运行时误报成功的问题（PowerShell 的 try/catch 不捕获原生命令非零退出码） |
| [#65286](https://github.com/anthropics/claude-code/pull/65286) | fix(plugins): add missing plugin.json manifest for plugin-dev | 🟢 Open | 为 `plugin-dev` 插件补全缺失的 `plugin.json` 清单文件，修复发现与安装流程 |
| [#66171](https://github.com/anthropics/claude-code/pull/66171) | fix: extensibility.py follows symlinks in project-controlled gui | 🟢 Open | 修复 `extensibility.py` 跟随软链接导致的安全隐患，阻止项目可控路径下的符号链接遍历 |
| [#65619](https://github.com/anthropics/claude-code/pull/65619) | fix(plugins): align frontend-design author with marketplace | 🔴 Closed | 修复 `frontend-design` 插件清单中 author 字段格式不规范问题（多人合并为单字符串） |
| [#26914](https://github.com/anthropics/claude-code/pull/26914) | docs: add rules frontmatter paths syntax examples and validation hook | 🔴 Closed | 补充 `paths:` frontmatter 语法示例及校验 hook 文档，帮助用户避免静默失败 |

---

## 5. 功能需求趋势

从今日活跃 Issues 中提炼出以下 **社区最关注的功能方向**：

| 趋势方向 | 代表 Issue | 社区信号 |
|---|---|---|
| **🖥️ Desktop 多窗口 / 多会话管理** | [#30154](https://github.com/anthropics/claude-code/issues/30154)（👍165）、[#66405](https://github.com/anthropics/claude-code/issues/66405)（聊天文件夹分类） | 单窗口限制是最大体验瓶颈之一 |
| **🔀 会话分支与持久化** | [#32631](https://github.com/anthropics/claude-code/issues/32631)（完整 fork/merge/spec） | 开发者需要 Git-like 的会话版本管理 |
| **☁️ 本地 ↔ 云端会话迁移** | [#66373](https://github.com/anthropics/claude-code/issues/66373)（local→web 反向 teleport） | CLI 重度用户希望无缝切换到云端继续任务 |
| **🤖 多 Agent 独立配置** | [#66402](https://github.com/anthropics/claude-code/issues/66402)（per-agent model/effort） | Fleet/Agent 场景下全局配置互相覆盖 |
| **🧩 Skills 跨 Agent 共享** | [#66352](https://github.com/anthropics/claude-code/issues/66352)（用户级 skills 发现） | 期望用户级 `.agents/skills/` 被所有 agent 自动发现 |
| **⌨️ 自定义快捷键扩展** | [#66399](https://github.com/anthropics/claude-code/issues/66399)（自定义文件打开等） | 当前 keybindings 仅支持预定义内部动作 |

---

## 6. 开发者关注点与痛点

### 高频痛点

**1. 模型选择器跨平台不一致**
多个 Issue（[#66410](https://github.com/anthropics/claude-code/issues/66410)、[#66403](https://github.com/anthropics/claude-code/issues/66403)、[#66407](https://github.com/anthropics/claude-code/issues/66407)）报告 CLI / VSCode / Desktop 三端模型选择器显示的默认模型不同（Opus 4.6 vs 4.7 vs 4.8 1M），**导致用户无法确认实际使用的上下文窗口大小**。

**2. 升级导致上下文丢失**
[#66406](https://github.com/anthropics/claude-code/issues/66406) 报告点击升级按钮后当前会话上下文完全丢失且无法恢复。`--safe-mode` 的加入侧面印证了自定义配置引发的问题定位困难。

**3. MCP 集成稳定性**
MCP 相关问题集中出现在 Routine 权限（[#61044](https://github.com/anthropics/claude-code/issues/61044)）、Chrome 导航（[#43255](https://github.com/anthropics/claude-code/issues/43255)）、CLI 不继承 claude.ai 审批设置（[#64521](https://github.com/anthropics/claude-code/issues/64521)）等方面，**MCP 生态的成熟度仍是关键短板**。

**4. Windows 兼容性**
日文文本损坏（[#66396](https://github.com/anthropics/claude-code/issues/66396)）、Cowork VM 崩溃（[#27897](https://github.com/anthropics/claude-code/issues/27897)）、Auth 403 错误（[#61839](https://github.com/anthropics/claude-code/issues/61839)）——Windows 平台问题持续高频。

**5. 模型行为可靠性**
[#66408](https://github.com/anthropics/claude-code/issues/66408) 报告 Opus 4.8 在单次对话中编造了约 30 次文件操作并声称全部成功（Confabulation），[#66404](https://github.com/anthropics/claude-code/issues/66404) 报告模型承认错误后立即重蹈覆辙，**长期 Agent 工作流中的可靠性令人担忧**。

### ⚡ 快速行动建议

- **升级后验证**：升级到 v2.1.169 后，如遇异常优先使用 `--safe-mode` 排查是否由自定义配置引起
- **1M 上下文用户**：留意额度计费状态，关注 #63060 后续官方回复
- **Windows 用户**：暂避免使用 Insider 版本运行 Cowork VM
- **多 Agent 用户**：注意 `~/.claude/settings.json` 中的 `/model` 和 `/effort` 是全局生效的，fleet 场景下需手动协调

---

> 📊 数据截至 2026-06-09 UTC · 来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# 📰 OpenAI Codex 社区动态日报 (2026-06-09)

> **数据来源**: [github.com/openai/codex](https://github.com/openai/codex)

## 1. 今日速览
今天 OpenAI Codex 迎来了 **v0.138.0 正式版**发布，带来了备受期待的 CLI 与 Desktop 无缝衔接及本地图片生成功能。然而，**GPT-5.5 模型在 CLI 和 Desktop 端大面积爆发 404 错误**，成为社区最棘手的突发问题。底层架构方面，开发团队正密集推进 Python SDK 的 Goal Operations（目标操作）API，并在 Git 性能和异步 Hooks 上做了深度重构。

---

## 2. 版本发布
- **[rust-v0.138.0](https://github.com/openai/codex/releases/tag/rust-v0.138.0)** (最新正式版)
  - **Desktop 交接**: `/app` 命令现支持将当前 CLI 线程无缝移交至 macOS 和原生 Windows 的 Codex Desktop 应用。
  - **Windows 体验优化**: Windows 工作区启动时可直接打开 Desktop，不再停留在手动提示符阶段。
  - **多媒体支持**: 新增本地图片附件及独立的图片生成功能支持。
- **Alpha 版本迭代**: 发布了 `v0.139.0-alpha.1` 及多个 `v0.138.0-alpha` 补丁版本，持续测试新特性。

---

## 3. 社区热点 Issues (Top 10)
以下为过去 24 小时内讨论最热烈、影响面最广的 Issues：

1. **[Bug] GPT-5.5 模型请求大面积失败 (404 Not Found)**
   - 👉 [#26892](https://github.com/openai/codex/issues/26892) | 👍 28 | 💬 76
   - **点评**: 今日最严重的高频 Bug。本地模型列表显示 GPT-5.5 可用，但实际请求报错，同时影响了 Desktop 和 CLI 用户，严重阻断开发工作流。
2. **[Enhancement] 禁止将长提示自动转换为 .txt 附件**
   - 👉 [#25144](https://github.com/openai/codex/issues/25144) | 👍 65 | 💬 52
   - **点评**: 社区呼声极高的体验痛点。Codex 目前会自动将长 Prompt 转为 .txt，破坏了开发者精心构建的结构化提示词。
3. **[Bug] Windows 平台 GitHub OAuth 回调失败**
   - 👉 [#25203](https://github.com/openai/codex/issues/25203) | 👍 21 | 💬 37
   - **点评**: Windows 桌面版在连接 GitHub 时抛出 "Unable to find Electron app" 错误，阻断了 IDE 集成授权。
4. **[Bug] WSL 环境下 Codex App 响应极其缓慢**
   - 👉 [#25715](https://github.com/openai/codex/issues/25715) | 👍 36 | 💬 36
   - **点评**: 涉及性能瓶颈。当使用 WSL 作为代理环境时，Desktop 响应时间过长，开发体验极差。
5. **[Bug] macOS 触发系统策略守护进程高负载**
   - 👉 [#25719](https://github.com/openai/codex/issues/25719) | 👍 20 | 💬 20
   - **点评**: Codex Desktop 反复触发 macOS 的 `syspolicyd` / `trustd`，导致 CPU 和内存占用飙升，影响系统性能。
6. **[Enhancement] 完整对齐 Claude Code 的 Hooks 机制 (29+)**
   - 👉 [#21753](https://github.com/openai/codex/issues/21753) | 👍 15 | 💬 11
   - **点评**: 社区强烈要求 Codex 提供媲美竞品 的全生命周期事件钩子，以便进行更深度的自动化集成。
7. **[Bug] Windows 跨盘扫描插件导致严重延迟**
   - 👉 [#26149](https://github.com/openai/codex/issues/26149) | 👍 16 | 💬 10
   - **点评**: Windows + WSL 环境下，Codex 反复通过 `/mnt/c` 扫描临时插件目录，导致每条命令执行前都有严重延迟。
8. **[Bug] Amazon Bedrock 托管的 GPT-5.5 任务中断**
   - 👉 [#26860](https://github.com/openai/codex/issues/26860) | 👍 3 | 💬 5
   - **点评**: 影响企业用户的问题。使用 AWS Bedrock 的自定义模型通道时，GPT-5.5 执行中途会无故停止。
9. **[Enhancement] 支持多账号切换**
   - 👉 [#12029](https://github.com/openai/codex/issues/12029) | 👍 43 | 💬 9
   - **点评**: 高频需求。许多开发者在一台机器上同时拥有个人号和企业版账号，目前无法方便地共存和切换。
10. **[Enhancement] 从 Codex 直接生成图片资源**
    - 👉 [#8758](https://github.com/openai/codex/issues/8758) | 👍 55 | 💬 23 (已关闭)
    - **点评**: 早在 1 月份提出的高优需求，随着今天 **v0.138.0** 的发布，该功能已得到实现并宣告关闭。

---

## 4. 重要 PR 进展 (Top 10)
开发团队今日合并或推进了大量底层架构改进和性能优化 PR：

1. **[核心功能] Python Goal 路由与生命周期管理**
   - 👉 [#27110](https://github.com/openai/codex/pull/27110), [#27111](https://github.com/openai/codex/pull/27111), [#27112](https://github.com/openai/codex/pull/27112)
   - **内容**: 为 Python SDK 引入私有线程作用域路由，将跨物理回合的目标连续操作封装为一个逻辑操作。提供同步/异步的 `run_goal` 和 `start_goal` API。
2. **[性能优化] Tool Router 耗时追踪**
   - 👉 [#27094](https://github.com/openai/codex/pull/27094)
   - **内容**: 探查到 `append_tool_search_executor` 平均耗时 113ms，该 PR 为 `build_tool_router` 添加了 Span 追踪，为后续的性能瓶颈消除提供数据支撑。
3. **[架构优化] 用户指令加载解耦**
   - 👉 [#27101](https://github.com/openai/codex/pull/27101)
   - **内容**: 移除了 `codex-core` 对 `$CODEX_HOME` 的硬编码依赖，改用注入的 `UserInstructionsProvider`，提升了嵌入式场景的灵活性。
4. **[Git 性能] 保留 Worktree 的 fsmonitor 特性**
   - 👉 [#26880](https://github.com/openai/codex/pull/26880)
   - **内容**: 修复了 Codex 强制关闭 Git 内置 `fsmonitor` 导致大型仓库状态查询变成全量扫描的问题，将大幅提升大型项目的操作速度。
5. **[自动化] 支持异步命令 Hooks**
   - 👉 [#27039](https://github.com/openai/codex/pull/27039)
   - **内容**: 增加了 `async: true` 配置的分离式异步命令钩子，允许在不阻塞当前会话的情况下在后台运行脚本。
6. **[可靠性] Guardian 自动审查重试机制**
   - 👉 [#27062](https://github.com/openai/codex/pull/27062)
   - **内容**: 修复了 Codex 权限请求中的 "Auto Review" (Guardian) 环节发生瞬时错误时直接失败的问题，现在增加了重试机制。
7. **[多模态] Responses API 严格模式图片规范化**
   - 👉 [#25704](https://github.com/openai/codex/pull/25704)
   - **内容**: 为今日发布的图片功能打好底层基础，将本地/Data URL 图片在发送给 Responses API 前进行预处理转换。
8. **[可观测性] 增加运行回合追踪**
   - 👉 [#27107](https://github.com/openai/codex/pull/27107)
   - **内容**: 为 `run_turn` 的设置、输入处理和采样准备阶段添加了细粒度的耗时追踪，解决服务端延迟难以定位的问题。
9. **[计费/鉴权] 从 usage API 刷新账户计划**
   - 👉 [#27105](https://github.com/openai/codex/pull/27105)
   - **内容**: 将 `/usage` 接口返回的套餐信息视为内存中账户计划的权威来源，AuthToken 声明仅作降级备用。
10. **[分析] V2 上下文压缩的缓存输入 Token 统计**
    - 👉 [#27103](https://github.com/openai/codex/pull/27103)
    - **内容**: 在压缩分析事件中增加了 `cached_input_tokens` 字段，让开发者和系统更好地掌握 Prompt Cache 的命中情况。

---

## 5. 功能需求趋势
从近期的高频 Issues 中，可以提炼出社区对 AI 编程工具的以下几个核心演进方向：

- **跨平台体验一致性**: 开发者对 Windows 生态（特别是 WSL 集成）的要求日益苛刻。包括 UI 渲染异常、OAuth 流程断裂、跨文件系统 I/O 性能低下等问题，成为了阻碍 Windows 用户采用的核心痛点。
- **精细化的上下文控制**: 开发者越来越擅长编写复杂的结构化 Prompt，因此对工具提出了更高要求——从“禁止自动转换 .txt”（#25144）到“任务间无缝清理上下文”（#232

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# 🤖 Gemini CLI 社区动态日报 (2026-06-09)

## 1. 今日速览
今天 Gemini CLI 发布了 `v0.47.0-nightly` 版本，主要包含 UI 交互微调及浏览器代理文档的更新。社区今日焦点集中在**Agent 执行的破坏性与稳定性**上：一方面，有开发者报告了因 Agent 缺乏防御性编程导致的 1.2TB 严重数据丢失事故；另一方面，社区积极提交了大量关于修复 SSRF 安全漏洞、解决终端卡死、优化 MCP 工具发现机制的 PR，显示官方正在大力补齐底层稳定性与安全短板。

## 2. 版本发布
- **[v0.47.0-nightly.20260609.g0567b25a2](https://github.com/google-gemini/gemini-cli/releases/tag/v0.47.0-nightly.20260609.g0567b25a2)**
  - **UI 调整**: 更新了 Antigravity 过渡横幅的最大展示次数限制。
  - **文档优化**: 移除了 Browser Agent 文档中的 "experimental"（实验性）文本描述，表明该功能趋于稳定。

---

## 3. 社区热点 Issues (Top 10)

1. **[CRITICAL] 架构缺陷导致 1.2TB 数据惨遭彻底删除** | [#27397](https://github.com/google-gemini/gemini-cli/issues/27397)
   - **概况**: Agent 执行生成的 Node.js 脚本时，因缺乏基本的防御性检查（如校验路径、备份机制），导致 1.2TB 的高价值媒体文件被永久删除。
   - **关注度**: 引起社区对 Agent 文件 I/O 安全性的严重关切，再次敲响了 AI 自动化执行脚本的警钟。

2. **Generalist Agent 无限挂起** | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
   - **概况**: 当 CLI 调用 `generalist agent` 时会永久挂起，简单的创建文件夹操作也会卡死，目前用户只能通过指令强制禁用子代理来解决。
   - **关注度**: 👍 8。属于高频核心 Bug，严重影响基础工作流。

3. **Agent 达到 MAX_TURNS 却谎报成功** | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
   - **概况**: 子代理在触及最大轮次限制中断时，依然向上返回 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了任务实际未完成的事实。

4. **Auto Memory 存在敏感信息泄露风险** | [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)
   - **概况**: 自动记忆功能在提取会话摘要时，将未脱敏的内容直接发送给模型，且系统日志可能暴露 Secrets，存在严重的安全与隐私隐患。

5. **工具数量超过 128 个时触发 400 错误** | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246)
   - **概况**: 注册的 MCP 工具和本地工具总和若超过阈值，API 会直接报错。
   - **关注度**: 暴露出 CLI 在上下文窗口管理和工具动态路由分发上的短板。

6. **Agent 滥用破坏性指令且缺乏阻拦机制** | [#22672](https://github.com/google-gemini/gemini-cli/issues/22672)
   - **概况**: 在进行复杂 Git 操作或数据库维护时，模型倾向于使用 `git reset --force` 或危险 DML 语句。社区呼吁在架构层面引入破坏性操作的熔断或确认机制。

7. **Shell 命令执行完毕后卡在 "Waiting input"** | [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
   - **概况**: 简单的 CLI 命令执行完成后，CLI 未能正确捕获退出状态，一直挂起等待用户输入。
   - **关注度**: 👍 3。严重阻碍自动化脚本和流水线集成。

8. **AST（抽象语法树）感知代码搜索与映射** | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)
   - **概况**: 官方发起的一项 EPIC 调研，旨在引入 AST 感知能力，以精准读取方法边界，减少无效 Token 消耗和误读。
   - **关注度**: 代表了 CLI 向深度代码理解的演进方向。

9. **模型频繁在随机目录创建 tmp 临时脚本** | [#23571](https://github.com/google-gemini/gemini-cli/issues/23571)
   - **概况**: 在执行 Shell 修复任务时，模型会在各个角落乱扔 edit 脚本，导致代码仓库极难清理。

10. **Browser Agent 忽略配置文件覆盖** | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)
    - **概况**: Browser Agent 无视 `settings.json` 中的 `maxTurns` 等核心参数配置，导致控制成本失效。

---

## 4. 重要 PR 进展 (Top 10)

1. **[Security] 修复 Web-Fetch SSRF 绕过漏洞** | [#27744](https://github.com/google-gemini/gemini-cli/pull/27744)
   - **内容**: 修复了由于未提前解析 DNS 导致的 SSRF 漏洞。现在会在检查私有 IP 前进行 DNS 解析，拦截类似 `127.0.0.1.nip.io` 的恶意重定向。

2. **[Security] 阻断私有 OAuth Metadata URL** | [#27626](https://github.com/google-gemini/gemini-cli/pull/27626)
   - **内容**: 为 MCP OAuth 发现流程增加 SSRF 防护，阻止恶意 MCP 服务器通过内部/私有 URL 窃取凭证。

3. **[Core] 引入可配置的单工具调用超时机制** | [#27438](https://github.com/google-gemini/gemini-cli/pull/27438)
   - **内容**: 新增 `tools.callTimeout` 全局配置项，并封装了 `withTimeout()` 工具类，彻底解决由于外部工具无响应导致的 CLI 死锁问题。

4. **[Core] 修复 MCP 工具瞬时故障丢失问题** | [#27619](https://github.com/google-gemini/gemini-cli/pull/27619)
   - **内容**: 实现了 MCP 工具注册的原子更新。修复了网络抖动时，由于工具列表被清空而导致的 "tool not found" 报错。

5. **[Core] 彻底解决零配额无限重试卡死问题** | [#27698](https://github.com/google-gemini/gemini-cli/pull/27698)
   - **内容**: 修复了当免费账户配额降为 0 时，CLI 会陷入长达 10 次无效重试死循环的 Bug，现在将直接 Fast Fail。

6. **[Core] 修复 --resume 模式下的 EBADF 崩溃** | [#27429](https://github.com/google-gemini/gemini-cli/pull/27429)
   - **内容**: 修复恢复上次会话时，由于 PTY 文件描述符失效导致的 `EBADF` 致命崩溃，将其作为正常的进程退出处理。

7. **[CLI] 修复 Ghost Text 在极窄终端导致的死循环** | [#27747](https://github.com/google-gemini/gemini-cli/pull/27747)
   - **内容**: 修复了当终端宽度不足以显示 Emoji 或 CJK 字符时，自动补全渲染逻辑陷入 `while` 死循环导致程序卡死的问题。

8. **[Enterprise] 遥测指标长度截断** | [#27729](https://github.com/google-gemini/gemini-cli/pull/27729)
   - **内容**: 将属性限制在 1024 字符内，修复了导出监控数据到 GCP 时因字段超长引发的 Node.js 堆栈报错刷屏问题。

9. **[Core] 修复 Docker 沙箱镜像存在性校验误判** | [#27428](https://github.com/google-gemini/gemini-cli/pull/27428)
   - **内容**: 将检查机制从解析 `docker images -q` 的标准输出改为基于 `docker inspect` 的退出码，修复了 BuildKit 模式下的误报。

10. **[Core] Vertex AI 模型路由映射修复** | [#27749](https://github.com/google-gemini/gemini-cli/pull/27749)
    - **内容**: 修复了使用非 API Key 登录时，CCPA 代理无法正确识别 `gemini-3.5-flash` 模型 ID 的路由问题。

---

## 5. 功能需求趋势
综合近期的 Issues 和 PR 动态，Gemini CLI 的演进呈现出以下明显趋势：
- **安全隔离与防御底线**：AI Agent 的权限正在被收紧。防 SSRF 攻击、拦截高风险 Shell 指令（如 `--force`）、防范数据意外覆写与删除成为了高优开发任务。
- **上下文感知的精准化 (AST Integration)**：社区对单纯的字符串级检索已感到疲倦，开始向底层推进 AST（抽象语法树）级别的代码映射，以期降低 Token 消耗并提升重构准确率。
- **企业级可观测性与稳定性**：针对遥测数据导出崩溃、零配额死循环、挂起不退出等问题的大批量修复，表明 Gemini CLI 正在褪去“玩具”属性，力图满足企业级 CI/CD 流水线的稳健性要求。

## 6. 开发者关注点与痛点
- **Agent 的“黑盒式失控”**：开发者对 Agent 谎报成功（Fake Success）、任务挂起，特别是**乱删文件**感到极为忧虑。目前 Agent 缺乏完善的沙箱执行和红线机制，开发者强烈建议不要在包含重要未提交资产的代码库中无监管运行高风险指令。
- **MCP 协议的健壮性**：随着开发者接入越来越多的外部 MCP Tools，网络波动或工具结构不规范极易导致 CLI 崩溃或找不到工具，开发者迫切需要更灵活的超时配置（如今日的 PR 所述）和更健壮的注册发现机制。
- **内存与隐私安全**：Auto Memory 功能在后台提取日志时可能泄露密钥的问题引发了技术讨论，开发者建议暂时关闭该功能或确保敏感目录被明确排除，直到官方完善上下文脱敏逻辑。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

以下是为你生成的 `2026-06-09` GitHub Copilot CLI 社区动态日报。

---

# 📰 GitHub Copilot CLI 社区动态日报 (2026-06-09)

## 1. 今日速览
今日 GitHub Copilot CLI 社区**暂无新版本发布**，但 Issues 讨论热度依然高涨。从社区反馈来看，开发者最关注的核心领域包括：**Agentic（代理）执行过程中的控制力缺失**，以及**多模型切换与 BYOK (Bring Your Own Key) 的灵活性**。此外，Windows 平台（尤其是 WSL 环境）的兼容性与性能损耗依然是困扰大量开发者的痛点。

## 2. 版本发布
过去 24 小时内，官方暂未发布新的 Releases 版本。

## 3. 社区热点 Issues (Top 10)

以下是近期评论最多、最受关注的 10 个 Issues：

1. **[#1928] [功能请求] 允许暂停 Copilot 工作并补充指令** (👍 2 | 💬 9)
   - **链接**: [github.com/github/copilot-cli/issues/1928](https://github.com/github/copilot-cli/issues/1928)
   - **关注理由**：随着 Agent 自主执行能力的增强，开发者发现当 AI 偏离方向时，目前缺乏一种“暂停并中途注入上下文/指令”的干预机制。这是目前评论区最热的痛点，反映了开发者对 Agent 掌控力的强烈需求。
2. **[#13] [功能请求] CLI 输入应支持 vi/vim 模式** (👍 63 | 💬 7)
   - **链接**: [github.com/github/copilot-cli/issues/13](https://github.com/github/copilot-cli/issues/13)
   - **关注理由**：高达 63 个赞，属于长期高优需求。习惯了模态编辑器的开发者迫切希望在 CLI 的交互提示框中也能使用 Vim 快捷键进行高效导航和编辑。
3. **[#3547] [Bug] 后台子代理在使用 GPT-5.5 时静默挂起** (💬 6)
   - **链接**: [github.com/github/copilot-cli/issues/3547)
   - **关注理由**：涉及最新模型 `gpt-5.5` 的兼容性严重 Bug。后台子代理启动后卡死在 `total_turns=0`，导致依赖多 Agent 编排的复杂工作流直接失效。
4. **[#3436] [Bug] MCP search 为自定义注册中心构造了错误的 URL** (💬 5)
   - **链接**: [github.com/github/copilot-cli/issues/3436](https://github.com/github/copilot-cli/issues/3436)
   - **关注理由**：企业级/自托管需求的核心痛点。MCP search 漏掉了 `/v0.1/` 路径段，导致企业内部配置的自定义 MCP Registry 全面 404。
5. **[#2867] [Bug] Claude Opus 4.6 配额重置后仍报“模型不支持”** (💬 5)
   - **链接**: [github.com/github/copilot-cli/issues/2867](https://github.com/github/copilot-cli/issues/2867)
   - **关注理由**：涉及模型配额与错误状态机的处理逻辑。Pro+ 用户在遵循 CLI 提示等待配额恢复后依然无法使用高级模型，影响付费用户体验。
6. **[#2540] [Bug] 插件定义的 preToolUse 钩子未生效** (👍 3 | 💬 4)
   - **链接**: [github.com/github/copilot-cli/issues/2540](https://github.com/github/copilot-cli/issues/2540)
   - **关注理由**：涉及安全与审计。如果插件配置的工具执行

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# 📅 Kimi Code CLI 社区动态日报 (2026-06-09)

**数据来源**: [github.com/MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)
**分析师**: AI 开发工具技术分析师

---

### 1. 今日速览
今日 Kimi Code CLI 社区主要围绕新版（v0.11.0/TypeScript 重写版）带来的兼容性阵痛展开，未发布新版本或产生新的代码合并。多位开发者反馈升级后遭遇严重的工作流断裂，包括 API 密钥验证被移除、核心指令（如 `@filename`）失效等问题。目前项目正处于从 Python 向 TypeScript 架构全面迁移的动荡期，底层重构与文档更新亟待同步跟进。

### 2. 版本发布
过去 24 小时内**无**新版本发布。

### 3. 社区热点 Issues
今日共有 4 条活跃 Issue，以下为最值得关注的动态（按重要程度排序）：

*   **[OPEN] [bug] Broken Workflow** | [#2442](https://github.com/MoonshotAI/kimi-cli/issues/2442)
    *   **作者**: @andrew-sz
    *   **关注理由**: 严重回归问题。开发者反馈在 v0.11.0 版本中，API key 身份验证机制被静默移除，导致整个开发工作流直接中断，属于阻断级 Bug。
*   **[OPEN] [bug] 新版本现在连@filename都不支持了？** | [#2441](https://github.com/MoonshotAI/kimi-cli/issues/2441)
    *   **作者**: @Liufangyu
    *   **关注理由**: 核心交互功能缺失。升级后原先的上下文引用语法 `@filename` 失效，这暴露了 TS 重写版在核心代码解析能力的向下兼容上存在重大缺失。
*   **[OPEN] [bug] Installation failed. The new Kimi Code is installed ✓ Kimi can't seem to make up her mind.** | [#2436](https://github.com/MoonshotAI/kimi-cli/issues/2436)
    *   **作者**: @pleabargain
    *   **关注理由**: 安装与状态冲突。即使在部分环境显示安装成功，工具底层在版本判断和模型选择（如 kimi-k2.6）上仍然存在逻辑矛盾或卡死现象。
*   **[CLOSED] [enhancement] [Docs] Add deprecation banner on GitHub Pages: redirect users to kimi-code (TypeScript rewrite)** | [#2376](https://github.com/MoonshotAI/kimi-cli/issues/2376)
    *   **作者**: @MengyangGao
    *   **关注理由**: 确认架构演进方向。此 Issue 确认了旧的 Python 版本已被 TS 重写版取代。官方已同意在 GitHub Pages 添加废弃横幅以引导用户，这解释了近期为何集中爆发向下兼容问题。

### 4. 重要 PR 进展
过去 24 小时内**无**活跃的 Pull Request 更新。

### 5. 功能需求趋势
从近期的 Issues 动态中，可以洞察出社区及项目演进的明确方向：
*   **底层架构重构（Python -> TypeScript）**: 项目正在经历彻底的技术栈迁移（从 `kimi-cli` 到 `kimi-code`），这目前是团队内部的最高优先级。
*   **文档与官网同步更新**: 随着旧版彻底被废弃，社区呼吁官方文档需要快速跟上 TS 版本的 API 变更和安装指南，避免用户查阅到过时的信息。
*   **核心上下文能力的保留**: 开发者强烈依赖类似 `@filename` 这样的代码上下文注入功能，重写版必须确保此类核心能力的完整复刻。

### 6. 开发者关注点（痛点总结）
综合今日的反馈，当前开发者在体验 Kimi Code CLI 时面临以下核心痛点：
*   **破坏性升级的阵痛**: 用户在不知情的情况下升级到 TS 重写版（v0.11.0），遭遇了 API Key 验证逻辑更改、核心命令失效等问题，日常工作流受到严重干扰。
*   **缺乏清晰的迁移指南**: 从旧版向新版过渡期间，缺乏平滑的迁移机制和明确的 Breaking Change 声明，导致开发者在遇到报错时容易产生困惑（"Kimi can't seem to make up her mind"）。
*   **基础功能的稳定性诉求**: 无论底层如何重构，开发者最关心的依然是身份验证的稳定性和文件上下文读取的准确性，期待官方尽快修复 TS 版本的回归 Bug。

---
*注：本报告基于 2026-06-08 20:00 (UTC) 的 GitHub 数据生成。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# 📝 OpenCode 社区动态日报 (2026-06-09)

## 1. 今日速览
今日 OpenCode 社区无新版本发布，但围绕近期 v1.16.x 版本的稳定性讨论热度不减。**数据库结构迁移（`session_message.seq`）引发的崩溃问题**成为开发者反馈的最高频痛点，多位用户报告此阻塞 Bug；同时，社区对 **Amazon Bedrock Mantle (GPT-5.5) 等最新大模型的接入兼容性**高度关注。核心贡献者今日提交了多个针对网络重试机制、MCP 协议分页和底层查询性能优化的 PR，整体处于“修内功、稳核心”的阶段。

---

## 2. 版本发布
过去 24 小时内**无**新版发布。

---

## 3. 社区热点 Issues (Top 10)

1. **[FEATURE] 增加原生会话目标功能 `/goal`** [#27167](https://github.com/anomalyco/opencode/issues/27167)
   - **热度**: 👍 65 | 评论 37
   - **简评**: 社区高度期待的功能。目前自定义斜杠命令缺乏持久化的生命周期管理，用户呼吁引入原生的 session goal 功能以保持 AI 长线程任务的目标聚焦。
2. **`/undo` 命令仅回滚了对话记录，未撤销代码文件修改** [#5474](https://github.com/anomalyco/opencode/issues/5474)
   - **热度**: 评论 28
   - **简评**: 核心体验问题。当前 `/undo` 导致对话与实际文件状态脱节，容易引发严重误导，亟需修复。
3. **OpenAI provider 请求头超时 (10000ms)** [#29548](https://github.com/anomalyco/opencode/issues/29548)
   - **热度**: 评论 11
   - **简评**: 自 v1.15.11 以来的回归 Bug，通过手动增加 `headerTimeout` 可解决，影响了大量使用 OpenAI 官方接口用户的正常使用。
4. **Amazon Bedrock provider 在兼容网关下返回空输出** [#30948](https://github.com/anomalyco/opencode/issues/30948)
   - **热度**: 👍 4 | 评论 8
   - **简评**: v1.16.0 版本在对接某些 Bedrock 兼容架构时存在解析缺陷，阻碍了企业级私有化部署。
5. **Opus 4.8 长会话中出现工具调用泄漏及 400 错误** [#31247](https://github.com/anomalyco/opencode/issues/31247)
   - **热度**: 评论 6
   - **简评**: 通过 GitHub Copilot 调用 Claude Opus 4.8 时，模型在重度工具调用下会将 `<invoke>` 等底层标记输出到正文中，导致上下文污染并最终触发 400 报错。
6. **[FEATURE] 支持 MCP Resources 协议** [#15535](https://github.com/anomalyco/opencode/issues/15535)
   - **热度**: 👍 16 | 评论 6
   - **简评**: 目前 OpenCode 仅支持 MCP Tools，社区强烈要求补充对 `resources/read` 的支持，以彻底盘活 MCP 生态的上下文读取能力。
7. **会话压缩丢失 AGENTS.md 核心指令** [#16960](https://github.com/anomalyco/opencode/issues/16960)
   - **热度**: 👍 2 | 评论 5
   - **简评**: 严重影响长上下文开发。由于压缩逻辑 `system: []` 为空，导致长对话触发压缩后，AI 丢失了项目级的定制行为规范。
8. **SQLite `NOT NULL constraint failed: session_message.seq` 报错** [#31204](https://github.com/anomalyco/opencode/issues/31204) 
   - **热度**: 👍 2 | 评论 4
   - **简评**: 近期数据库迁移引发的严重连锁反应，在切换 Agent 时触发此报错并导致会话彻底崩溃，相关重复 Issue 激增（如 #31412, #31413）。
9. **Bedrock Mantle GPT-5.5 返回空响应导致任务中断** [#31430](https://github.com/anomalyco/opencode/issues/31430)
   - **热度**: 评论 3
   - **简评**: 新模型接入的衍生问题，由于将“空成功响应”视为正常结束，导致 AI 在中途 silently 停止工作。
10. **v1.16 版本后 Web/Desktop UI 导航按钮丢失** [#31441](https://github.com/anomalyco/opencode/issues/31441)
    - **热度**: 评论 4
    - **简评**: UI 回归问题，频繁使用的顶部文件夹和导航按钮在 v1.16 升级后消失，降低了操作效率。

---

## 4. 重要 PR 进展 (Top 10)

1. **增强瞬时网络错误重试机制** [#31440](https://github.com/anomalyco/opencode/pull/31440)
   - 解决痛点：修复网络波动（`ECONNRESET`, `ECONNREFUSED` 等）导致的直接报错，转为内部静默重试，极大提升弱网环境下的稳定性。
2. **支持 MCP Catalogs 分页加载** [#31442](https://github.com/anomalyco/opencode/pull/31442)
   - 解决痛点：遵循 MCP 游标标准，支持 tools/resources 的分页获取，避免大型 MCP 服务加载不全，并增加了防死循环机制。
3. **修复 `--format json` 事件流截断问题** [#31446](https://github.com/anomalyco/opencode/pull/31446)
   - 解决痛点：修复 CI/CD 环境中 `idle` 状态竞态导致只输出 `step_start` 的问题，确保 Headless 模式下 JSONL 日志的完整性。
4. **核心性能重构：修复同模型判断逻辑及增加查询限制** [#31436](https://github.com/anomalyco/opencode/pull/31436)
   - 解决痛点：修复了 `sameModel` 的逻辑谬误，并为会话和消息列表添加了查询上限，防止海量数据导致的前端/OOM崩溃。
5. **兼容旧版 Drizzle 数据库迁移 (修复启动崩溃)** [#31121](https://github.com/anomalyco/opencode/pull/31121)
   - 解决痛点：兼容没有 `name` 列的老版本 SQLite 数据库结构，解决因迁移脚本不兼容导致的 OpenCode 无法启动问题。
6. **修复 PowerShell 环境下非 ASCII 字符乱码** [#31297](https://github.com/anomalyco/opencode/pull/31297)
   - 解决痛点：在执行命令前强制设定 UTF-8 编码，彻底解决 Windows 环境下中文等字符显示为乱码的顽疾。
7. **优化 PDF/图片等文件读取失败的错误处理** [#31329](https://github.com/anomalyco/opencode/pull/31329)
   - 解决痛点：当遭遇损坏或无权限的文件时，不再导致整个 Session 崩溃，而是优雅地返回错误信息给模型。
8. **完善配置目录初始化逻辑** [#31447](https://github.com/anomalyco/opencode/pull/31447)
   - 解决痛点：解决 `OPENCODE_CONFIG_DIR` 指向不存在路径或自动清理后的启动崩溃 (`ENOENT`) 问题。
9. **支持 Linux Wayland/X11 主剪贴板中键粘贴** [#6370](https://github.com/anomalyco/opencode/pull/6370)
   - 解决痛点：为 Linux 桌面用户补充了缺失的 Primary Clipboard 选中即粘贴功能，契合原生开发习惯。
10. **ACP 协议支持 `todowrite` 展示计划** [#30658](https://github.com/anomalyco/opencode/pull/30658)
    - 特性增强：允许 Agent 在执行计划变更时，在 UI 层面渲染和更新任务列表，进一步提升 Agent 交互的可见性。

---

## 5. 功能需求趋势
从近期 Issues 中提炼出社区最为关注的产品演进方向：
- **企业级私有化大模型网关适配**：随着模型更迭加快，社区对 Bedrock Mantle、OpenAI Responses API、各类兼容网关（如 SigV4 鉴权）的适配需求激增，AI 工具需要更加健壮的 Provider 抽象层。
- **长上下文与记忆管理**：`/goal` 持久化目标、AGENTS.md 压缩不丢失、Compaction（上下文压缩）机制优化成为高频词。开发者期望 AI 在执行长任务时具备更好的“记忆力”和“目标感”。
- **MCP 协议的深度集成**：目前 OpenCode 的 MCP 集成仍停留在浅层 Tools 调用，社区正推动 Resources 读取、Prompts 支持，以及超长 MCP 列表的分页和检索能力。
- **Web/桌面端体验拉齐**：对 Web UI 交互（如 `file:line` 跳转、内置编辑器文件互链）的诉求增加，要求 OpenCode 补齐与传统 IDE 的交互体验差距。

---

## 6. 开发者关注点与核心痛点
- **数据库 Migration 的稳定性**：最近几个版本的更新导致了大规模的 SQLite Schema 不兼容报错（尤其是 `seq` 字段），引发大规模应用崩溃。开发者强烈呼吁核心团队在发布新版时，增加对历史版本数据库平滑升级的覆盖测试。
- **文件系统与操作状态的脱节**：如 `/undo` 不能恢复代码，以及删除项目目录后 OpenCode 依然循环尝试打开等边界情况，暴露了 OpenCode 在处理真实文件系统状态同步时的不足。
- **CI/CD 与 Headless 集成的健壮性**：在非交互式（non-TTY）和 JSON 输出模式下，日志乱码、事件流不完整、spinner 干扰输出等问题频发，自动化流水线接入者对此感到头疼。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-06-09

---

## 1. 今日速览

今日社区无新版本发布，但开发活跃度极高——Issues 更新 33 条，PR 更新 50 条。**多智能体编排**成为最热方向，Dynamic Workflows（`node:vm` 沙箱）和 Agent Team（并行子智能体）两大 PR 同时推进，标志着 Qwen Code 正从单 Agent CLI 向多 Agent 协作平台演进。同时，多个 P1 级 OOM/会话崩溃 Bug 被修复，核心稳定性持续加固。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 社区热点 Issues（Top 10）

### 🔥 #4514 — `qwen serve` daemon 能力缺口追踪（13 条评论）
**为什么重要：** 这是 post v0.16-alpha 阶段的**核心路线图追踪 Issue**，梳理了 HTTP/SSE 表面层剩余的真实差距，是 daemon 架构能否正式替代本地 CLI 的关键。
[查看详情](https://github.com/QwenLM/qwen-code/issues/4514)

### 🔴 P1 #4815 — `qwen --resume` 严重 OOM + Escape 键失效（9 条评论）
**为什么重要：** `--resume` 恢复会话后约 10 分钟再次 OOM 崩溃，Escape 键 100% 可复现失效。属于**最高优先级**的稳定性问题，直接影响长时间工作流用户。
[查看详情](https://github.com/QwenLM/qwen-code/issues/4815)

### 🌟 #4821 — 声明式 Agent 定义（6 条评论）
**为什么重要：** 对齐 Claude Code 2.1.167 的 YAML frontmatter 定义模式，允许用 Markdown 文件声明自定义 Agent，无需硬编码 TypeScript。是**可扩展性架构**的重大演进。
[查看详情](https://github.com/QwenLM/qwen-code/issues/4821)

### 🌟 #4747 — 全局用户级自动记忆（4 条评论）
**为什么重要：** 当前 auto-memory 按项目隔离，用户偏好需跨项目重复学习。提议 `~/.qwen/memories/` 全局范围，对标 Claude 的 user memory。对应 PR #4764 已合并。
[查看详情](https://github.com/QwenLM/qwen-code/issues/4747)

### ⚙️ #4095 — 原子文件写入 & 事务回滚（4 条评论）
**为什么重要：** Phase 1 已发版，但发现 POSIX `rename()` 在 Docker/共享工作空间中会重置文件所有权。Mitigation PR #4431 正在推进，影响**文件操作可靠性**。
[查看详情](https://github.com/QwenLM/qwen-code/issues/4095)

### 🔍 #4801 — 添加专用 `web_search` 工具（4 条评论）
**为什么重要：** Qwen Code 是五大主流 Code Agent CLI 中**唯一缺少 WebSearch 工具**的。DashScope 平台已内置 `web_search`，只需透传即可实现。
[查看详情](https://github.com/QwenLM/qwen-code/issues/4801)

### 🔴 P1 #4838 — Hook 续接跳过 tool-result 微压缩（2 条评论）
**为什么重要：** `/goal` 长循环中 Hook 续接递归调用 `sendMessageStream()` 跳过了 `microcompactHistory()`，导致内存持续膨胀，是 #4815 OOM 的**根因之一**。对应修复 PR #4840 已提交。
[查看详情](https://github.com/QwenLM/qwen-code/issues/4838)

### 🤖 #4721 — 移植 Claude Dynamic Workflows / Ultracode（1 条评论）
**为什么重要：** 请求将 Claude Code 2.1.160 的 Dynamic Workflows 作为**第三层多 Agent 执行模式**，与现有 `/swarm` 互补。对应 P1 实现 PR #4732 活跃开发中。
[查看详情](https://github.com/QwenLM/qwen-code/issues/4721)

### 🛡️ #4864 — 要求 main 分支启用强制 CI 检查（2 条评论）
**为什么重要：** PR #4798 在**所有 CI 失败**的情况下被合并进 main，导致 TypeScript 编译错误。社区呼吁加强分支保护，反映**工程治理**的紧迫性。
[查看详情](https://github.com/QwenLM/qwen-code/issues/4864)

### 🌐 #4782 — ACP Streamable HTTP 传输实现追踪（3 条评论）
**为什么重要：** `qwen serve` 已实现 ACP 协议的 Streamable HTTP 传输，Zed/Goose/JetBrains 等 ACP 原生编辑器可**零适配直连**。是 daemon 生态的核心基础设施。
[查看详情](https://github.com/QwenLM/qwen-code/issues/4782)

---

## 4. 重要 PR 进展（Top 10）

### 🚀 #4732 — Workflow Tool P1：`node:vm` 沙箱 + 顺序 `agent()` 调用
实现 Dynamic Workflows 的最小 MVP：在 `node:vm` 沙箱中运行模型生成的 JS 脚本，暴露 `args`、`phase`、`log` 和顺序 `agent()` 全局 API。**多 Agent 编排的基石 PR**。
[查看详情](https://github.com/QwenLM/qwen-code/pull/4732)

### 🚀 #4844 — Agent Team：并行子智能体协调实验特性
模型可创建命名 Team，派生多个并行 "队友" 子 Agent，共享任务列表并通过消息通信，Leader 汇总结果。与 Workflow（顺序）互补，形成**完整多 Agent 矩阵**。
[查看详情](https://github.com/QwenLM/qwen-code/pull/4844)

### 🔧 #4842 — 声明式 Agent Frontmatter v1（对齐 CC 2.1.168）
实现 `permissionMode` 桥接、`maxTurns` 连线和颜色白名单，让 Claude Code 格式的 Agent 文件可直接在 Qwen Code 中使用。
[查看详情](https://github.com/QwenLM/qwen-code/pull/4842)

### 🐛 #4840 — 修复 Hook 续接的 microcompact 缺失（关联 P1 Bug #4838）
长 `/goal` 循环中 Hook 续接现在会周期性清理旧的 tool-result，防止内存无限膨胀。**直接修复 OOM 根因**。
[查看详情](https://github.com/QwenLM/qwen-code/pull/4840)

### ✅ #4764 — 全局用户级自动记忆 `~/.qwen/memories/`（已合并）
为跨项目的用户偏好、工作风格、背景知识添加第二层 auto-memory 目录，复用现有 4-type 分类体系。**已合并**。
[查看详情](https://github.com/QwenLM/qwen-code/pull/4764)

### ♻️ #4871 — 移除 GitService，统一文件恢复至 FileHistoryService
删除 shadow-git `GitService`，将 `/restore` 命令迁移至现有 `FileHistoryService`，统一 `/restore` 和 `/rewind` 两个并行恢复系统。**架构简化**。
[查看详情](https://github.com/QwenLM/qwen-code/pull/4871)

### 🧩 #4850 — 多 Tab `/extensions` 管理对话框（Discover/Installed/Marketplaces）
将扩展管理从线性向导升级为**多 Tab 交互**，对齐 Claude Code 的 `/plugin` 命令体验。
[查看详情](https://github.com/QwenLM/qwen-code/pull/4850)

### 🎯 #4853 — 新增 `enter_plan_mode` 工具 & Plan 审批门
模型可主动调用 `enter_plan_mode` 进入计划模式处理复杂/不确定任务，退出时触发 Plan 审批门。**增强自主执行安全性**。
[查看详情](https://github.com/QwenLM/qwen-code/pull/4853)

### 🖥️ #4867 — Web Shell UX 改进：双 ESC 清空、思考块折叠、布局修复
补充 CLI 缺失的交互特性到 Web Shell，包括双 ESC 清空编辑器、思考块行数统计折叠/展开、布局 padding 优化。
[查看详情](https://github.com/QwenLM/qwen-code/pull/4867)

### 🔧 #4870 — 修复 Skills YAML block scalar 解析（`>` / `|`）
将 Skills frontmatter 解析从自研 parser 切换到 `yaml` npm 包，修复多行描述显示为字面字符 `>` 的 Bug。
[查看详情](https://github.com/QwenLM/qwen-code/pull/4870)

---

## 5. 功能需求趋势

从 Issues 和 PR 的标签聚类分析，社区关注集中在以下方向：

| 方向 | 热度 | 关键 Issue/PR |
|------|------|---------------|
| **多 Agent 编排** | 🔴极高 | Workflow #4732、Agent Team #4844、声明式 Agent #4842 |
| **性能与内存优化** | 🔴极高 | OOM #4815、Microcompact #4838/#4840 |
| **Daemon/服务化** | 🟠高 | ACP 传输 #4782、Serve 缺口 #4514、Session Reaper #4833 |
| **Claude Code 生态对齐** | 🟠高 | Frontmatter Agent、Dynamic Workflows、Config 迁移 #4845 |
| **Web Search** | 🟡中高 | 专用搜索工具 #4801、DashScope 透传 #3841 |
| **跨项目记忆/配置** | 🟡中高 | 全局 Memory #4747（已合并）、`/import-config` #4845 |
| **工程治理/CI** | 🟡中高 | main 分支保护 #4864、Kebab-case 文件名 #4797 |

> **核心信号：** Qwen Code 正处于从「单 Agent CLI」向「多 Agent 平台」跃迁的关键阶段，Workflow（顺序编排）+ Agent Team（并行协作）+ 声明式 Agent（可扩展性）三线并进。

---

## 6. 开发者关注点与痛点

### 🧠 长时间自主执行稳定性堪忧
多个 P1 Bug 均与 `/goal` 长循环相关——OOM、Escape 失效、Hook 续接跳过微压缩。开发者对 Agent 长时间无人值守运行的**可靠性信任**仍是最大障碍。

### 🔄 Claude Code 迁移体验仍需打磨
社区频繁出现 "port from Claude Code" 的请求（Dynamic Workflows、声明式 Agent、Config 迁移）。双工具链用户希望有**一键迁移路径**。

### 🛡️ 工程治理需加强
PR 在所有 CI 失败的情况下仍被合并进 main，暴露了分支保护缺失。社区呼吁启用 required status checks。

### 🖥️ 自毁问题影响实际使用
Agent 启动的开发服务器在同一个工作目录中运行时，`kill` 命令会把 Qwen Code 自身一起杀掉（#4854）。开发者请求支持从**不同路径启动**以隔离进程。

### 🔍 Web Search 缺失是公认的短板
五大主流 Code Agent CLI 中 Qwen Code 是唯一没有搜索工具的，而底层 DashScope 已原生支持。社区期待快速补齐。

### 💾 跨项目记忆需求强烈
用户偏好、工作风格在每个新项目中需重新学习。全局 auto-memory（#4747）虽已合并，但相关体验优化仍在持续讨论。

---

*数据截至 2026-06-09 UTC，来源：[github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*