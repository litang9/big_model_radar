# AI CLI 工具社区动态日报 2026-10-05

> 生成时间: 2026-10-04 23:06 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告（2026-10-05）

---

## 1. 生态全景

AI CLI 工具已从单纯的“终端补全助手”演进为覆盖 CLI、桌面端、IDE 扩展、SDK/无人值守 headless 的多形态 agent 平台。头部产品（Claude Code、Codex）进入高频小版本迭代与稳定性偿还期，安全问题（权限绕过、命令注入、授权旁路）密集浮现成为本阶段标志。MCP 生态已全面渗透为各工具的事实标准集成层，但健壮性普遍不足（缓存污染、OAuth 合规、静默丢弃）。子代理/多 agent 编排、上下文与 token 效率、无人值守自动化可靠性是全行业共同攻坚的三大方向。

---

## 2. 各工具活跃度对比

| 工具 | 今日热点 Issues（条目） | PR 动态 | Release | 核心信号 |
|---|---|---|---|---|
| Claude Code | 10（含 5 条被 stale 关闭） | 3 条更新，0 合并 | v2.1.289（安全+稳定性修复） | 批量 stale 关闭引发信息流失担忧 |
| OpenAI Codex | 10 | 17 条全部关闭/合并，节奏最快 | 2 个 alpha（0.162.0-a.12/13） | 修复密集，直接回应高热 Issue |
| Gemini CLI | 10 | 10 条（3 关闭合并） | 无 | 子代理 P1 痛点集中；PR 被催审，审查带宽紧张 |
| Copilot CLI | 10 | 0 | v1.0.92-4（新增 `copilot config`） | 认证与 MCP 稳定性为主要痛点 |
| Kimi Code CLI | — | — | — | 24 小时无活动 |
| OpenCode | 10+ | 10 条（6 条为自动化批量关闭） | 无 | V2 稳定性问题密集，含阻断级缺陷 |
| Qwen Code | 10+ | 10 条 | v0.24.7-nightly | Managed Agent 运行时为核心战场，架构级投入 |

**一句话**：Codex 修复吞吐最高，Claude Code 偏维护性收敛，Qwen Code 展示最系统的架构工程化（审查流程、路线图分阶段），OpenCode 处于 V2 快速迭代阵痛期。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **Windows 平台一等公民** | Claude Code（MSIX 更新、OAuth 竞争）、Codex（近半热点带 windows-os 标签）、OpenCode（WSL UNC 路径）、Qwen Code（MCP -32000） | Windows 桌面端是全行业质量洼地；Codex 已系统性补课（junction/ACL/文件锁系列 PR） |
| **子代理可靠性** | Gemini CLI（挂起 #21409、误报成功 #22323）、Claude Code（可观测性 #85416/#85134）、OpenCode（model 覆盖越权 #51071）、Qwen Code（并发死锁 #13333） | 挂起、误报、结果可信度、模型切换授权是共性缺口 |
| **上下文/Token 效率** | Gemini CLI（Tactful Extraction、AST 感知读取）、Codex（token 双重计数）、Claude Code（MCP 缓存污染 #99513）、OpenCode（`keep.tokens` 失效致成本 5-15 倍膨胀） | “隐形上下文污染”与压缩精度成为新焦点 |
| **MCP 生态健壮性与安全** | 全部 6 个活跃工具 | OAuth RFC 合规、配置静默丢弃、权限旁路、跨审批请求泄漏（Codex PR #50781 为典型安全修复） |
| **无人值守/CI 自动化** | Claude Code（headless `--print` 无重试、看门狗缺失）、Copilot CLI（企业代理环境 headless）、Qwen Code（托管会话故障恢复） | fail-recover 语义、可重试、审批流程适配 CI 场景 |
| **本地/开源模型兼容** | OpenCode（Gemma 4 via Ollama，48 👍 全榜最高）、Qwen Code（Ollama 零参工具 400） | 流式 tool_calls 解析是共同短板 |
| **沙箱与破坏性操作防护** | Claude Code（force-push 同意流程）、Gemini CLI（零依赖 OS 沙箱提案、`git reset --force` 防护）、Qwen Code（沙箱前置校验） | 安全模型正从“提示词约束”走向“机制强制” |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 深度 agent 工作流、权限模型、企业合规 | 重度专业开发者、企业运维 | 闭源 TypeScript，agent 优先，hooks/subagent 扩展 |
| **Codex** | 桌面/移动跨设备接续、Remote Control | 全平台消费级到专业开发者 | Rust 重写，托管 daemon + app-server 架构，TUI/桌面/CLI 多端 |
| **Gemini CLI** | 开源社区驱动、AST 工具链探索、沙箱设计 | 开源贡献者、Linux/本地化用户 | 开源 TS/Node，社区 PR 为主，架构讨论前置（EPIC 式提案） |
| **Copilot CLI** | GitHub 原生集成、企业/代理环境、SDK | GitHub 生态企业用户、CI/CD 场景 | 依托 GitHub 平台，SDK headless + ACP 非交互模式 |
| **OpenCode** | 多 Provider/本地模型中立性 | 本地 LLM、开源栈用户 | 开源，V2 双端重构（TUI + Desktop），SQLite 单库存储（正暴露多进程缺陷） |
| **Qwen Code** | 托管/云端 Agent 运行时、平台化分发 | 企业托管部署、K8s 场景 | Java 技术栈，工程化程度最高（分阶段路线图、审查流程、e2e 二分定位） |
| **Kimi Code CLI** | — | — | 24 小时无公开动态，生态存在感弱 |

---

## 5. 社区热度与成熟度

- **最活跃/最成熟**：**Claude Code** 与 **Codex**。Issue 编号已达 9 万级，讨论深度高（如 #91763 根因分析、Codex #48554 Electron 信号处理分析），但也出现“批量 stale 关闭”这类成熟期治理问题。
- **修复响应最快**：**Codex**——17 条 PR 全部关闭，#50803 直接回应 63 评论的头号 Issue；但 8 月以来多轮回归正在消耗信任。
- **快速成长期**：**Qwen Code**——P1/P2 分级清晰、双语设计文档、scope fuse 审查机制，工程化投入超前于用户规模；**OpenCode** 处于 V2 快速迭代阵痛期，阻断级缺陷（#42170 桌面启动 500）尚存。
- **贡献瓶颈期**：**Gemini CLI**——方向性提案丰富（AST、沙箱、token 策略），但 PR 被 `pr-nudge-sent` 催审，合并周期偏长。
- **平台依赖型**：**Copilot CLI** 社区热度中等，问题集中于认证与企业环境，受 GitHub 平台节奏约束。
- **沉寂**：**Kimi Code CLI**。

---

## 6. 值得关注的趋势信号

1. **安全从提示词走向机制**：同日出现权限规则绕过（Claude Code v2.1.289）、grep 命令注入 CWE-88（Gemini CLI）、跨线程审批泄漏、MCP 授权旁路、subagent 未授权模型切换——agent 安全面正从“模型行为”转向“权限执行层”，选型时应评估工具是否有机制级强制而非仅靠提示词约束。

2. **Windows 质量洼地 = 机会窗口**：三家头部工具的 Windows 桌面端均被集中投诉（MSIX、daemon、WSL 路径）。Codex 的系统性补课（ACL/junction/文件锁）说明这是资源投入问题而非技术不可解；对开发者而言，Windows 深度用户短期内仍需谨慎评估桌面端。

3. **“静默失败”成为众矢之的**：OpenCode 社区“宁可报错，不要沉默”的呼声、子代理误报成功、MCP 静默丢弃，指向 agent 可观测性/可信度是下一代竞争点。构建 agent 应优先接入 usage/turn analytics（Codex 的 `tools_change_count` 是信号）。

4. **上下文经济学兴起**：`keep.tokens` 失效致 5-15 倍成本膨胀、MCP 缓存污染、每轮 36.6k 基线 token——token 效率不再是优化项而是生存项，AST 感知读取、分级检索（grep 优先）等精准上下文工程将成为标配能力。

5. **无人值守场景决定企业渗透**：headless 无重试、审批流程不适配 CI、瞬时故障永久化，是各工具共同的最后一块短板。Qwen Code 对“fail-recover 语义”的架构投入值得关注，其托管运行时路线代表了企业级方向。

6. **开源贡献带宽成为瓶颈信号**：Gemini CLI 催审 PR、Qwen Code CI flaky 阻塞外部贡献、OpenCode 自动化批量关 PR——社区治理质量正在成为影响项目长期活力的隐性变量，技术选型时应纳入考量。

---

**给决策者的行动建议**：重度自动化/企业场景优先考察 Claude Code 与 Codex 的 headless 可靠性现状（均未完全达标）；本地模型优先选 OpenCode（但需规避其压缩缺陷成本）；关注 Qwen Code 的托管运行时路线作为企业部署前瞻参考；将 Windows 桌面端成熟度暂时排除在选型权重之外。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-10-05）

## 一、热门 Skills 排行（PR）

| # | Skill | 功能 | 讨论热点 | 状态 |
|---|-------|------|---------|------|
| 1 | **skill-creator 触发评估修复**（#1298）| 修复 trigger evals 的误报/漏报、Windows 兼容性及运行时故障处理 | 对应 Issue #556（`claude -p` 零触发率）和 #1383（Windows 下评估失效），是社区工具链的核心痛点，持续讨论 3 个月 | OPEN |
| 2 | **mcp-builder 兼容性修复**（#1742）| 支持 mcp>=2 的 `streamable_http_client` 重命名及自定义 HTTP 头 | 修复 #1668；配合 Issue #1390（evaluation.py 对真实 MCP 服务器评分 0/N），mcp-builder 是近期质量焦点 | OPEN |
| 3 | **claude-api 模型退役更新**（#1607）| 标记 4 个已退役模型 ID（claude-opus-4-1 等） | 修复 #1603；关联 Issue #1487——该 skill 单次注入约 156k token 耗尽上下文，暴露“过重 Skill”设计问题 | OPEN（9 月末仍有更新）|
| 4 | **md2video-audio**（#1703）| Markdown → Marp 幻灯片 → 带 AI 配音的 MP4 视频，零成本 | 内容创作自动化的代表方向，零依赖卖点受关注 | OPEN |
| 5 | **proofcore-contract-auditor**（#1771）| Solidity/Rust 智能合约静态分析 + 审计证明上链 TON | Web3 + 区块链存证的新场景；但与 Issue #492 的命名空间仿冒担忧相关，社区对第三方上链 Skill 持审慎态度 | OPEN |
| 6 | **blast-radius**（#1776）| 批量/破坏性写操作（删数据、批量发信）前的“影响半径”检查清单 | 直击 Agent 安全操作痛点，理念讨论度高 | OPEN |
| 7 | **testing-patterns（AWT）**（#822 / #723）| AI 视觉驱动的零代码 E2E 测试；完整测试哲学与模式库 | 测试自动化是长期活跃方向，PR 从 3 月持续更新至 9 月 | OPEN |
| 8 | **pyxel**（#525）| Python 复古游戏开发 Skill，含无头运行与帧检查 | 由 Pyxel 作者本人提交，长尾讨论半年 | OPEN |

## 二、社区需求趋势（Issues 提炼）

1. **安全与信任机制**（#492, 43 条评论，最高热度）：社区 Skill 伪装 `anthropic/` 官方命名空间造成信任边界滥用，呼声集中在签名/认证机制。
2. **企业协作与分发**（#228, 16 条）：组织内 Skill 共享库，替代手动 Slack 传文件的流程。
3. **Skill 工具链质量**（#556、#1383、#1394）：skill-creator 的评估触发率、Windows 支持、eval-viewer XSS 等问题集中出现，开发者需要可靠的 Skill 开发/评测基础设施。
4. **上下文效率**（#1487）：反对“重量级” Skill，要求渐进式加载，避免一次注入 156k token。
5. **新方向提案**：agent 治理与安全模式（#412）、推理质量门禁流水线（#1385）、紧凑记忆表示（#1329）、批量操作安全检查（#1776）——安全/治理类 Skill 需求明显上升。

## 三、高潜力待合并 Skills（活跃但未合并）

- **#1742 mcp-builder 修复**：修复明确 Issue（#1668/#1390），9 月末仍在更新，合并概率最高 → [链接](https://github.com/anthropics/skills/pull/1742)
- **#1298 skill-creator trigger evals 修复**：解决最高频工具链痛点，9 月仍在迭代 → [链接](https://github.com/anthropics/skills/pull/1298)
- **#1607 / #1730 claude-api 维护类更新**：模型退役标记与死链修复，低风险文档维护，10 月初仍活跃 → [链接](https://github.com/anthropics/skills/pull/1730)
- **#1792 docx 修复**：LibreOffice 超时报错的正确错误处理，官方文档系 Skill 的小而美修复 → [链接](https://github.com/anthropics/skills/pull/1792)
- **#1734 孤立 docx 批注检测**：官方 docx Skill 功能增强 → [链接](https://github.com/anthropics/skills/pull/1734)

## 四、生态洞察（一句话总结）

**社区最集中的诉求是建立 Skills 的“信任与质量基础设施”——从命名空间安全、可靠触发评估，到上下文高效的 Skill 加载，而非单纯新增功能型 Skill。**

---

# Claude Code 社区动态日报 — 2026-10-05

## 1. 今日速览

Claude Code 发布 **v2.1.289**，修复了托管机器上权限规则失效和终端卡死两类安全/稳定性问题。社区方面，**Windows 桌面端仍是重灾区**：MSIX 容器导致更新后无法重启的高质量根因分析帖（#91763）持续发酵，评论数居首。同时，一批 8 月的老 Issue 今日被批量标记 stale 关闭，涉及 agents、desktop、MCP 等多个领域。

## 2. 版本发布

**v2.1.289** 主要更新：
- 修复托管机器上，复合 shell 命令嵌套部分的 deny/ask 规则无法覆盖用户安装 mod 审批的权限漏洞（安全相关）
- 修复短代码块中大量未闭合 `<script>` 标签或深度嵌套 `${` 替换导致终端冻结的问题
- 修复 `Read` 相关问题（详情截断）

## 3. 社区热点 Issues（Top 10）

1. **#91763** — Windows/MSIX 更新后被 `git fsmonitor--daemon` 阻塞无法重启（0x80070020），作者给出根因分析与免重启 workaround，17 条评论，社区价值极高。[链接](https://github.com/anthropics/claude-code/issues/91763)
2. **#90867** — Desktop 静默重启后窗口恢复但**会话丢失**，属于 8 项互联缺陷的核心缺陷。[链接](https://github.com/anthropics/claude-code/issues/90867)
3. **#91708** — Windows/VSCode 多会话并发刷新 OAuth 凭据竞争，导致 400 强制重新登录。[链接](https://github.com/anthropics/claude-code/issues/91708)
4. **#85442** *(已关闭/stale)* — 远程 MCP 表单 elicitation 永远无法到达客户端，服务器 -32001 超时。[链接](https://github.com/anthropics/claude-code/issues/85442)
5. **#85275** *(已关闭/stale)* — claude-code-action 中 code-review 插件以后台 agent 方式做资格检查，导致 run 提前终止，CI 用户痛点。[链接](https://github.com/anthropics/claude-code/issues/85275)
6. **#87692** *(已关闭/stale)* — 无流式不活跃看门狗，无人值守会话永久挂起；headless `--print` 遇可重试 429/5xx 直接终止，运维场景核心诉求。[链接](https://github.com/anthropics/claude-code/issues/87692)
7. **#99513** — 新 Issue：`~/.claude.json` 中过期的 `claudeAiMcpEverConnected` 缓存将 16 个已断开 MCP 连接器的完整工具定义注入每个会话，浪费上下文。[链接](https://github.com/anthropics/claude-code/issues/99513)
8. **#93083** — Chrome 扩展 MCP 原生宿主二进制更新时 EBUSY，旧宿主永远 stale。[链接](https://github.com/anthropics/claude-code/issues/93083)
9. **#85450** *(已关闭/stale)* — 未经明确破坏性操作同意对有 open PR 的分支 force-push，权限/安全模型争议。[链接](https://github.com/anthropics/claude-code/issues/85450)
10. **#85104** *(已关闭/stale)* — macOS 低内存时主进程硬卡死，WarmLifecycle 无内存背压地持续派生会话子进程。[链接](https://github.com/anthropics/claude-code/issues/85104)

## 4. 重要 PR 进展

过去 24 小时仅 3 条 PR 更新，无新合并：

1. **#40572** *(OPEN)* — 支持从 `~/.claude/` 全局目录加载 Hookify 规则，实现跨项目的全局 hook 配置。[链接](https://github.com/anthropics/claude-code/pull/40572)
2. **#87077** *(OPEN)* — 修复 pr-review-toolkit 所有 agent 的无效 YAML frontmatter（描述中的对话行被解析为嵌套映射），修复后 agent 能正确加载 name/description/model。[链接](https://github.com/anthropics/claude-code/pull/87077)
3. **#1** *(CLOSED)* — 历史 PR「Create SECURITY.md」今日有活动，疑似机器人触发，无实质内容。

## 5. 功能需求趋势

- **无人值守/自动化可靠性**：headless `--print` 崩溃恢复（#87692）、CI action 插件终止（#85275）、scheduled 任务异常，是自动化用户最集中的诉求。
- **权限与安全模型**：deny/ask 规则粒度（v2.1.289 已修）、破坏性 git 操作的同意流程（#85450）、auto 模式安全分类器误杀（#85411）。
- **MCP 生态健壮性**：elicitation 失败、连接器缓存污染（#99513）、插件自带配置损坏（#85097）。
- **Subagent 可观测性**：effort level、实际生效模型均无法观测（#85416、#85134），worktree 绑定逻辑不透明（#85448）。
- **会话管理与恢复**：rewind 降级（#85455）、会话丢失（#90867）、会话列表无法区分（#85431）。

## 6. 开发者关注点

- **Windows 平台体验明显落后**：今日热度前 3 的 open issue 均为 Windows（MSIX 更新、会话丢失、OAuth 竞争），桌面端更新机制是最大痛点。
- **批量 stale 关闭引发信息流失担忧**：约 20 个含高质量复现和根因分析的 issue 今日被 stale 关闭，社区可能需要关注这些缺陷是否已实际修复。
- **长时运行稳定性**：流挂起、内存背压缺失、看门狗缺失，反映重度多会话用户与运维场景的可靠性需求未被满足。
- **上下文卫生**：过期 MCP 缓存注入（#99513）这类“隐形上下文污染”问题开始受到关注。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 · 2026-10-05

## 1. 今日速览

Codex CLI 密集发布 0.162.0-alpha.12/13 两个预发布版本，节奏持续加快。今日 17 个 PR 全部关闭，集中在 Windows 守护进程稳定性、TUI 体验和 Remote Control 链路修复，其中多项直接回应社区高热 Issue（如 `already has an active writer`）。桌面端 Windows 平台 bug 仍是社区反馈重灾区。

## 2. 版本发布

- **rust-v0.162.0-alpha.13** — [Release](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.13)
- **rust-v0.162.0-alpha.12** — [Release](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.12)

同日连续两个 alpha 版本，0.162.0 稳定版发布在即。

## 3. 社区热点 Issues

1. **[#37403](https://github.com/openai/codex/issues/37403)** macOS 桌面端升级后无法恢复 Remote Control/CLI 线程（`already has an active writer`）。63 条评论、45 👍，8 月至今未解，是最受关注的回归问题，与今日 PR #50803（托管 daemon 启动）直接相关。
2. **[#49988](https://github.com/openai/codex/issues/49988)** VS Code 扩展更新后间歇性丢失提交消息。47 👍，已关闭——高影响且快速响应的代表案例。
3. **[#48554](https://github.com/openai/codex/issues/48554)** Linux 桌面端 Electron 覆盖 libuv 的 SIGCHLD handler，导致子进程无法回收（Git 不可用、线程加载失败）。已关闭，技术分析极为深入。
4. **[#49532](https://github.com/openai/codex/issues/49532)** 要求恢复桌面端分支选择功能。69 👍 居全榜之首，UI 简化引发的社区强烈反弹。
5. **[#29639](https://github.com/openai/codex/issues/29639)** Windows 桌面 + WSL 工作区下 Browser Use/Node REPL 因 sandboxCwd 未映射而失败，长期未修的跨平台路径问题。
6. **[#43347](https://github.com/openai/codex/issues/43347)** 关闭最后一个 Browser Use 标签页会导致 Windows 桌面应用整体崩溃。
7. **[#50428](https://github.com/openai/codex/issues/50428)** Windows 桌面端持久化对话提交失败（`AbsolutePathBuf deserialized without a base path`），10 月 2 日新报，17 条评论增长快。
8. **[#49264](https://github.com/openai/codex/issues/49264)** Windows CLI 每条命令闪烁终端窗口（app-server daemon 回归），已关闭。
9. **[#40885](https://github.com/openai/codex/issues/40885)** MCP OAuth issuer 解析不符合 RFC 9728，拒绝合规授权服务器，生态兼容性问题。
10. **[#50451](https://github.com/openai/codex/issues/50451)** 10 月 2 日全球配额重置未覆盖部分付费账户，涉及计费公平性，官方公告与实际状态存在偏差。

## 4. 重要 PR 进展（均已关闭/合并）

1. **[#50803](https://github.com/openai/codex/pull/50803)** 合格环境下 Remote Control 启动复用托管 daemon——直接针对 #37403 热点问题。
2. **[#50940](https://github.com/openai/codex/pull/50940)** 安全恢复畸形 Windows deny-read ACL 状态，不破坏未知既有限制。
3. **[#50802](https://github.com/openai/codex/pull/50802)** Windows junction 更新被策略拒绝时回退 `mklink /J`；配套 [#50782](https://github.com/openai/codex/pull/50782) 在文件锁冲突时重试 daemon 发布。
4. **[#50913](https://github.com/openai/codex/pull/50913)** 连接 app-server 的 TUI 新启动改用服务端模型默认值，避免过期客户端配置。
5. **[#50811](https://github.com/openai/codex/pull/50811)** 新 TUI 线程尊重服务端 reasoning summary 默认值。
6. **[#50962](https://github.com/openai/codex/pull/50962)** 新增 `stable_environment_tools` 功能开关，保持环境就绪变化时工具列表稳定。
7. **[#50943](https://github.com/openai/codex/pull/50943) / [#50964](https://github.com/openai/codex/pull/50964)** turn analytics 增加 `tools_change_count`，追踪会话中工具列表变化。
8. **[#50781](https://github.com/openai/codex/pull/50781)** 限制 MCP 启动通知仅限自有线程，防止跨线程审批请求泄漏到当前会话——安全相关修复。
9. **[#50764](https://github.com/openai/codex/pull/50764) / [#50786](https://github.com/openai/codex/pull/50786) / [#50788](https://github.com/openai/codex/pull/50788)** TUI 体验三连：turn 运行中允许 `/archive`、记住 Command Center 分组、Vim Normal 模式空草稿直接打开斜杠命令。
10. **[#50804](https://github.com/openai/codex/pull/50804)** review 失败时保持生命周期事件顺序，修复运行指示器状态错误。

## 5. 功能需求趋势

- **Windows 平台稳定性**：50 条热点 Issue 中近半带 `windows-os` 标签，覆盖 WSL 集成、daemon 管理、渲染进程崩溃等，是当前最集中的痛点方向。
- **Remote Control / 跨设备体验**：桌面与移动端线程接续（#37403、#44449、#50481）持续高热，官方今日已通过 PR 响应。
- **上下文与配额管理**：token 双重计数导致提前压缩（#39767、#49961、#32483）、配额重置透明度（#50451、#32726），用户强烈要求更准确的用量可见性。
- **UI 可配置性回归**：桌面端功能简化（如移除分支选择 #49532）引发反弹，社区希望保留专业工作流所需的细粒度控制。
- **MCP 生态兼容性**：OAuth 规范合规（#40885）、跨平台工具调用路径映射。

## 6. 开发者关注点

- **回归频发**：8 月以来的多个更新（桌面客户端、VS Code 扩展、CLI daemon）都引入了破坏性回归，社区对发布质量保障的信任度在下降。
- **Windows 一等公民诉求**：守护进程 junction/文件锁/ACL 系列修复说明官方在补课，但新 Windows bug（#50428、#50969）仍在出现。
- **token 计量准确性**：reasoning token 双计/内部计数超出报告用量的问题跨多个模型版本存在，影响长会话可用性。
- **沙箱与权限模型**：只读沙箱下 `installation_id` 写入失败（#42398）、Dots 授权状态不持久（#50769）表明沙箱边界设计需要更清晰的例外机制。
- **计费与状态透明**：配额重置执行与官方公告不一致，用户呼吁更实时的账户状态同步。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-10-05

## 1. 今日速览

今日无新版本发布，社区活跃度集中在 Issue 讨论与 PR 审查上。**子代理（Subagent）相关问题仍是最大痛点**——包括挂起、结果误报成功、配置失效等多个 P1 级 Bug 持续发酵。PR 方面，安全加固（命令注入防护）与核心性能优化（历史截断、快照查找线性化）成为贡献主线，另有 3 个 PR 完成关闭合并。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues

1. **#22323 — 子代理达到 MAX_TURNS 后误报 "GOAL success"**（P1，评论 13）
   `codebase_investigator` 子代理即使因轮次上限被中断、未做任何分析，仍上报 `status: success`，掩盖了真实失败。这是观测性/可信度层面的核心缺陷，是今日讨论最多的 Issue。
   https://github.com/google-gemini/gemini-cli/issues/22323

2. **#21409 — 通用代理挂起**（P1，评论 8，👍 8）
   主代理委派给 generalist agent 后永久挂起，连建目录这类简单操作也会卡死（用户等待长达 1 小时），需显式禁止子代理才能规避。👍 数最高的用户痛点之一。
   https://github.com/google-gemini/gemini-cli/issues/21409

3. **#19873 — 零依赖 OS 沙箱 + 事后意图路由**（P2，评论 9）
   针对 Gemini 3 原生 bash 亲和性的大型设计提案：在不牺牲安全的前提下让模型自由使用 `grep`/`sed`/`awk` 等 POSIX 工具链。方向性架构讨论，值得跟踪。
   https://github.com/google-gemini/gemini-cli/issues/19873

4. **#22745 — AST 感知的文件读取/搜索/代码库映射 EPIC**（P2，评论 7）
   评估 AST 工具能否减少错位读取、降低 token 噪音，是 agent 质量与效率提升的重点探索方向（配套 #22746、#22747）。
   https://github.com/google-gemini/gemini-cli/issues/22745

5. **#21968 — Gemini 几乎不主动使用 skills 和子代理**（P2，评论 7）
   即便任务高度相关，模型也不会自主调用自定义 skill/子代理，需要用户显式指令。反映编排（orchestration）触发机制存在缺陷。
   https://github.com/google-gemini/gemini-cli/issues/21968

6. **#21983 — 浏览器子代理在 Wayland 下失败**（P1，评论 4）
   Linux Wayland 环境中 browser agent 无法工作，同样误报 GOAL 终止。影响 Linux 桌面用户。
   https://github.com/google-gemini/gemini-cli/issues/21983

7. **#22267 — Browser Agent 忽略 settings.json 配置（如 maxTurns）**（P2，评论 4）
   `AgentRegistry` 正确读取了配置但浏览器代理未应用，配置链路断裂。
   https://github.com/google-gemini/gemini-cli/issues/22267

8. **#24246 — 工具数超过 128 触发 400 错误**（P2，评论 3）
   大量 MCP 工具接入后直接报错，暴露了工具作用域管理的局限，对重度集成用户影响大。
   https://github.com/google-gemini/gemini-cli/issues/24246

9. **#22672 — 代理应阻止/劝阻破坏性操作**（P2，评论 3）
   模型在复杂 git 操作中偏好 `git reset --force` 等危险命令，社区呼吁内置安全防护与更安全的替代方案引导。
   https://github.com/google-gemini/gemini-cli/issues/22672

10. **#19561 — "Tactful Extraction" 节省 token 的精准读取策略**（P3，评论 2）
    当前每轮基线约 36.6k token，大文件读取导致上下文膨胀（+15k/轮）。提案建立 grep 优先的分级代码发现策略，是 token 效率的重要优化方向。
    https://github.com/google-gemini/gemini-cli/issues/19561

## 4. 重要 PR 进展

1. **#29432 — 调度器销毁时结算排队工具调用**（OPEN）：批量拒绝已排队工具、取消未启动工具、避免为无法执行的工作请求审批，修复资源泄漏与挂起。
   https://github.com/google-gemini/gemini-cli/pull/29432

2. **#29505 — 支持 rootless Podman keep-id 沙箱**（P1，OPEN）：修复无根 Podman 下沙箱启动失败，正确保留宿主 UID/GID 映射。
   https://github.com/google-gemini/gemini-cli/pull/29505

3. **#29536 — 修复 grep 命令行选项注入（CWE-88）**（OPEN）：通过显式 `-e` 分隔符加固搜索模式传参，安全加固类重点 PR。
   https://github.com/google-gemini/gemini-cli/pull/29536

4. **#29510 — 加固 Windows 子进程参数引用**（P2，OPEN）：新增 `quoteCmdArg` 引用助手，修复 Windows 下 diff 命令的注入风险。
   https://github.com/google-gemini/gemini-cli/pull/29510

5. **#29629 — 限制流式纯文本高度消除闪烁**（OPEN，10-04 新提交）：限制待渲染流式文本高度，避免整屏清除重绘，改善终端渲染体验。
   https://github.com/google-gemini/gemini-cli/pull/29629

6. **#29626 — 修复 JSON 序列化误判循环引用**（P2，OPEN，10-04 新提交）：仅将递归路径上的对象视为循环，修复 OTel 指标共享引用被错误替换为 `[Circular]`。
   https://github.com/google-gemini/gemini-cli/pull/29626

7. **#29517 — 历史截断算法线性化**（OPEN）：`truncateHistoryToBudget` 中重复 `unshift()` 改为 `push()` + 反转，配合 #29512/#29515/#29516，形成一组系统性性能优化（基准提升最高 28 倍）。
   https://github.com/google-gemini/gemini-cli/pull/29517

8. **#29411 — `--resume` 恢复最近活跃会话**（已关闭）：修复裸 `--resume` 选中“最新创建”而非“最近活跃”会话的问题，修复 #29410。
   https://github.com/google-gemini/gemini-cli/pull/29411

9. **#29407 — JSON 循环引用误判修复（另一实现）**（已关闭）：与 #29626 同领域，采用祖先路径追踪方案，修复 #29406，OTel 文件导出不再丢失数据。
   https://github.com/google-gemini/gemini-cli/pull/29407

10. **#29404 — 新增 `gemini models list` JSON 输出**（已关闭）：为外部集成提供模型发现能力，避免硬编码模型 ID 过期。
    https://github.com/google-gemini/gemini-cli/pull/29404

## 5. 功能需求趋势

- **子代理体系深化**（最显著）：涉及可靠性（挂起、误报成功）、编排触发（不主动使用）、并行协作与共享内存（#18287）、轨迹可分享（#22598）、symlink 识别（#20079）等全链路需求。
- **AST 感知工具链**：#22745/#22746/#22747 系列 EPIC，探索更精准的代码读取与搜索以提升质量、降低 token 消耗。
- **安全与沙箱**：零依赖 OS 沙箱（#19873）、破坏性操作防护（#22672）、per-workspace 策略（#18397）。
- **上下文/Token 效率**：Tactful Extraction（#19561）、文件化任务跟踪替代 WriteToDo（#18836、#21000）。
- **可观测性与评估**：子代理上下文纳入 bugreport（#21763）、内部 eval 稳定化（#23166）、steering eval（#23313）。

## 6. 开发者关注点

- **子代理可靠性是最大痛点**：挂起（#21409）、结果误报（#22323）、Wayland 失败（#21983）均为 P1 且长期未解，多个 Issue 处于 `need-retesting` 状态，用户对子代理信任度受挫。
- **配置不生效问题**：Browser Agent 忽略 `settings.json`（#22267）反映配置合并链路存在系统性缺口。
- **工具规模上限**：>128 工具即 400 报错（#24246），重度 MCP 集成用户的硬性阻塞。
- **工作区卫生**：模型在随机位置生成临时脚本（#23571），增加提交前清理成本。
- **终端渲染体验**：resize 闪烁（#21924）与流式输出闪烁（#29629 修复中）持续被吐槽。
- **贡献侧信号**：多个 PR 被标记 `pr-nudge-sent`（催促审查/更新），显示维护者审查带宽紧张，社区贡献合并周期偏长。

---
*数据来源：github.com/google-gemini/gemini-cli · 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期：2026-10-05** | 数据来源：github.com/github/copilot-cli

---

## 一、今日速览

Copilot CLI 发布 **v1.0.92-4**，新增 `copilot config` 配置管理子命令，并在启动性能与 MCP 连接并发方面有显著优化。社区侧，macOS 更新后 `.mcp-writer.binding` 残留导致 CLI 完全不可用的问题（#4998）持续发酵，值得 macOS 用户重点关注。过去 24 小时共 23 条 Issue 更新，认证、MCP 稳定性和会话模型路由是讨论焦点。

---

## 二、版本发布

### v1.0.92-4
**Added**
- 新增 `copilot config` 子命令，支持列出、读取、设置和删除配置项

**Improved**
- 通过子进程解包内置 CLI 包，改善首次运行的启动体验
- 同时连接多个 MCP 服务器时的启动响应速度提升
- Canvas 操作现在可以返回图片

---

## 三、社区热点 Issues（精选 10 条）

1. **[#640](https://github.com/github/copilot-cli/issues/640)** `[CLOSED]` [sessions/tools]
   最热门问题（24 评论 / 10 👍）：`Invalid session ID: read_sql_files` 错误持续干扰会话工具调用。运行时间最长的遗留问题之一，现已关闭，可关注修复版本。

2. **[#4998](https://github.com/github/copilot-cli/issues/4998)** `[OPEN]` [mcp]
   macOS 安全更新/重启后，`.mcp-writer.binding` 残留过期的文件系统设备 ID，导致所有会话（含新建与恢复）均无法处理提示。影响面广且需手动清理，8 评论 / 7 👍，建议 macOS 用户临时规避。

3. **[#5008](https://github.com/github/copilot-cli/issues/5008)** `[CLOSED]` [authentication/models]
   1.0.89 起启动时报 "Not authenticated" 错误，疑似启动时序竞争（sign-in 约 3 秒后完成）。已关闭，关注后续版本验证。

4. **[#4946](https://github.com/github/copilot-cli/issues/4946)** `[OPEN]` [sessions/models]
   后台 Shell 命令完成通知注入新回合时触发 HTTP 400 `content[].thinking` 错误，影响长时运行工作流。

5. **[#4971](https://github.com/github/copilot-cli/issues/4971)** `[OPEN]` [authentication]
   每小时出现一次 "credentials may be expired" 授权错误，`/login` 与 `mcp reload` 均无法根治，token 刷新机制疑似存在缺陷。

6. **[#5042](https://github.com/github/copilot-cli/issues/5042)** `[OPEN]` [context-memory/models/tools]
   HydraFusion 模式下 400 错误后，会话被重路由到小上下文模型（mai-code-1.1-flash），无法加载静态提示词，且工具集中途变更——模型路由降级策略存在设计隐患。

7. **[#2978](https://github.com/github/copilot-cli/issues/2978)** `[OPEN]` [enterprise/networking]
   企业代理环境下 SDK headless 模式 `session.create` 报 "fetch failed"，代理环境变量传递正常但请求失败，影响企业 CI/CD 场景。

8. **[#4966](https://github.com/github/copilot-cli/issues/4966)** `[CLOSED]` 
   1.0.88 回归：扩展启动期间 `joinSession()` 无响应，引发 30 秒超时循环。SDK 集成方升级需注意。

9. **[#4969](https://github.com/github/copilot-cli/issues/4969)** `[OPEN]` [plugins]
   `plugin marketplace add` 因单个插件描述超过 1024 字符而整体拒绝加载 marketplace，缺少部分加载容错。

10. **[#5010](https://github.com/github/copilot-cli/issues/5010)** `[OPEN]`
    `--attachment` 传入 HEIC 图片时助手不可见（PNG 正常），且无格式不支持报错——静默失败体验较差。

---

## 四、重要 PR 进展

过去 24 小时无 PR 更新，本节省略。（可关注 v1.0.92-4 Release 中的改进项对应的后续修复验证。）

---

## 五、功能需求趋势

- **配置管理**：`copilot config` 子命令落地，回应了社区对免编辑文件配置的诉求
- **多仓库工作流**：单会话加载多仓库自定义指令（#5011），fullstack 开发者呼声明显
- **输入体验**：`/agent`、`/model` 自动补全（#1634 已关闭，或已实现）；`/mcp` 大小写不敏感匹配（#5050）
- **多模态支持**：HEIC 附件支持（#5010）、Canvas 返回图片能力已发布
- **ACP/非交互模式**：Computer Use 插件在 ACP 会话中的可用性（#5049）
- **可观测性**：OTel span 中模型归因准确性（#4970）

---

## 六、开发者关注点

1. **认证稳定性是当前最大痛点**：启动时序竞争（#5008）、每小时凭证过期（#4971）、Cloudflare MCP OAuth 后订阅限制（#4991）集中出现
2. **MCP 生态健壮性**：连接残留状态（#4998）、Windows 下 MCP worker 进程泄漏（#4972）、服务器名匹配过严（#5050）
3. **模型路由与会话连续性**：HydraFusion 降级路由破坏会话上下文（#5042）、自定义 agent 忽略配置模型（#2950）
4. **企业/代理环境兼容性**：长周期未解的企业代理问题（#2978）
5. **长会话稳定性**：约 20 分钟超时（#5051）、37 分钟会话后模型切换失败（#5042），提示长时间 agent 工作流仍是薄弱环节

---

*本日报基于过去 24 小时 GitHub 公开数据自动生成，如有出入以官方仓库为准。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-10-05

## 📌 今日速览

今日无新版本发布，社区活跃度集中在 Issue 讨论与 PR 维护上。**核心关注点是 V2/2.0 版本的稳定性问题**：桌面端会话加载失败（#42170）、上下文压缩不遵守 `keep.tokens` 上限（#43250）以及多进程共享数据库导致的 seq 冲突（#53146）等多个高严重性 Bug 持续发酵。此外，`@kitlangton` 提交了两个客户端架构重构 PR，值得贡献者关注。

---

## 🔥 社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#20995](https://github.com/anomalyco/opencode/issues/20995) Gemma 4 (e4b) 经 Ollama OpenAI 兼容 API 的 tool calling 失败（流式 tool_calls 未识别） | **48 👍 / 37 评论**，本地模型社区呼声最高的问题，涉及流式响应解析兼容性 |
| 2 | [#42170](https://github.com/anomalyco/opencode/issues/42170) Desktop 启动即 500：`no such column: project_id` | 桌面端完全不可用的启动崩溃，源于数据库 schema 迁移不一致（`workspace` 表被替换但 `project_id` 残留引用），属阻断级缺陷 |
| 3 | [#50650](https://github.com/anomalyco/opencode/issues/50650) Desktop 自定义 Provider 保存必报 "unavailable on this server" | 自定义 OpenAI 兼容 Provider 入口形同虚设，save handler 无条件抛错，功能性完全失效 |
| 4 | [#43250](https://github.com/anomalyco/opencode/issues/43250) [2.0] `keep.tokens` 不生效：压缩回溯无界，实际保留 234K tokens（设定仅 15K） | 上下文压缩核心逻辑缺陷，直接导致 token 成本 5-15 倍膨胀，影响所有 agent 驱动会话 |
| 5 | [#51466](https://github.com/anomalyco/opencode/issues/51466) 单响应收到多个 `reasoning_opaque`，仅支持一个 thinking part | GitHub provider + Opus 5.5 高频触发，涉及新版推理模型的流式处理兼容性 |
| 6 | [#43311](https://github.com/anomalyco/opencode/issues/43311) 批量 MCP 工具调用在 SSE 传输下参数损坏（"JSON Parse error: Unexpected EOF"） | 首个调用成功、后续调用参数损坏，指向 batching + SSE 的序列化 Bug |
| 7 | [#52205](https://github.com/anomalyco/opencode/issues/52205) Windows Desktop 将 WSL UNC 路径传给 Linux server，导致 HTTP 500 与启动崩溃 | Windows + WSL2 是主流开发环境组合，路径转换缺失影响面大 |
| 8 | [#51346](https://github.com/anomalyco/opencode/issues/51346) 附件超过上下文限制时触发无限压缩-重发循环 | 缺乏“请求仍超限”的终止检查，造成死循环与资源浪费 |
| 9 | [#51071](https://github.com/anomalyco/opencode/issues/51071) v2: subagent 的 `model` 参数覆盖未被用户授权（仅靠提示词约束） | **安全相关**：父模型可绕过用户意图切换模型，属权限执行层面缺陷 |
| 10 | [#53146](https://github.com/anomalyco/opencode/issues/53146) 两个 server 进程共享 `opencode.db` 时 `session_message.seq` 冲突 | 长驻 `opencode serve` + TUI 嵌入 server 的常见部署形态，暴露分布式 ID 分配缺陷 |

> 其他值得留意：[#50807](https://github.com/anomalyco/opencode/issues/50807)（MCP 配置含 `timeout` 字段会导致整个 server 被静默丢弃）、[#53184](https://github.com/anomalyco/opencode/issues/53184)（失败 turn 重试时重复执行副作用工具调用，已关闭）。

---

## 🔀 重要 PR 进展（Top 10）

### 活跃 PR

1. **[#53241](https://github.com/anomalyco/opencode/pull/53241)** refactor(client): 统一 registered service 决策逻辑
   将两个客户端中重复的 `matchesVersion`/`compatible`/`state` 判断链合并为单一函数，降低双份维护成本。
2. **[#53240](https://github.com/anomalyco/opencode/pull/53240)** refactor(client): 统一启动尝试簿记
   抽取 `contenders`/`failure`/`spawnDelay`/`lastSpawn` 四变量的重复逻辑，使规则可集中测试。
3. **[#53238](https://github.com/anomalyco/opencode/pull/53238)** fix(core): 空闲清理时保留活跃会话
   修复 #51343——长时间等待的活跃会话被 inactivity 机制误杀。
4. **[#28050](https://github.com/anomalyco/opencode/pull/28050)** docs: 生态列表新增 opencode-telegram-bot
   Telegram Bot 集成进入官方生态文档，等待合并月余。

### 清理关闭的 PR（automated-pr-cleanup 批量处理）

5. **[#47357](https://github.com/anomalyco/opencode/pull/47357)** fix: 省略仅含签名的空 reasoning 消息 — 防止空消息在模型历史中累积。
6. **[#47353](https://github.com/anomalyco/opencode/pull/47353)** feat: 托管 OTLP exporter 设置 — 企业部署的可观测性增强。
7. **[#47341](https://github.com/anomalyco/opencode/pull/47341)** fix: 拖拽附件路径以显式文本暴露给 agent — 提升多 provider 下附件可用性。
8. **[#47339](https://github.com/anomalyco/opencode/pull/47339)** fix: 停止对免费/Go 配额重试 — `FreeUsageLimitError` 的长 retry-after 不应触发正常重试。
9. **[#47337](https://github.com/anomalyco/opencode/pull/47337)** fix(core): 隐藏规则全量拒绝的工具 — 修复 `whollyDisabled` 只看最后一条规则的判断缺陷。
10. **[#47320](https://github.com/anomalyco/opencode/pull/47320)** fix(app): auto-accept 权限提升为应用级设置 — 会话开始前即可在主屏幕开启。

---

## 📈 功能需求趋势

从近期 Issues 提炼出五大方向：

1. **本地/开源模型兼容性**：Gemma 4 via Ollama 的 tool calling（#20995，48 👍）反映社区对本地推理栈的强烈需求，流式 tool_calls 解析是关键短板。
2. **上下文管理与压缩精度**：`keep.tokens` 失效（#43250）、超限死循环（#51346）、摘要生成可关闭（#6228）——token 成本控制是持续痛点。
3. **MCP 生态健壮性**：SSE batching 参数损坏（#43311）、`timeout` 字段静默丢弃（#50807）、崩溃后不重启（#53226）——MCP 集成质量呼声集中。
4. **Desktop/多平台体验**：Windows+WSL 路径（#52205）、会话加载崩溃（#42170）、自定义 Provider 表单（#50650）——桌面端进入快速迭代期，回归问题多。
5. **消息队列与会话控制**：消息取消排队（#4821，105 👍 历史高票）、选择性复制消息（#22871）、粘性提示词（#53239）——细粒度的会话操作需求旺盛。

---

## 🛠️ 开发者关注点（痛点总结）

- **数据一致性与多进程安全**：#53146（seq 冲突）与 #53184（重试重复执行副作用工具调用）表明，多 server 共享 SQLite 的场景缺乏并发控制，**可能造成重复外部写入等实际损害**，是当前最需优先修复的架构级问题。
- **Provider 兼容性长尾**：Gemma 4、GitHub Opus 5.5（多 thinking part）、OpenAI 兼容端点（context 上限需手动填写，#53235）——各 provider 行为差异持续产生适配问题。
- **静默失败模式**：MCP server 被静默丢弃（#50807）、重启后消息静默丢失（#52566）、工具静默消失（#53226）——社区反复呼吁“宁可报错，不要沉默”。
- **资源泄漏**：每次进程启动泄漏 13.7MB 原生库到 `/tmp`（#52555，已关闭）与 EMFILE 文件句柄耗尽（#50566）——长时间运行场景的稳定性仍需关注。

---

*数据来源：github.com/anomalyco/opencode · 统计窗口：2026-10-04 至 2026-10-05*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-10-05

## 1. 今日速览

Qwen Code 发布 v0.24.7-nightly 版本，重点修复 Code Mode 懒加载工具发现的文本对齐与权限批准问题。Managed Agent 运行时仍是社区最活跃的战场——并发会话死锁、Session Store 瞬时故障导致永久卡死等 P1/P2 级稳定性问题密集上报。同时 Hooks 体系（H2.5 加固阶段）、Kubernetes 工具运行时和 models.dev 目录化等中长期路线图稳步推进。

---

## 2. 版本发布

**v0.24.7-nightly.20261004.9915c7ff8f**
- [fix(core)](https://github.com/QwenLM/qwen-code/pull/12990)：Code Mode 文本与懒加载工具发现（lazy tool discovery）对齐
- fix(permissions)：honor approved（权限批准持久化相关修复）

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 亮点 |
|---|---|---|
| 1 | [#13333](https://github.com/QwenLM/qwen-code/issues/13333) **[P1]** ≥8 并发 Turn 在中等硬件上于模型应答后卡死 | 存储路径 lock convoy（锁 convoy），通过 e2e 二分定位，7 条评论，Managed Agent 并发性能的核心痛点 |
| 2 | [#13413](https://github.com/QwenLM/qwen-code/issues/13413) **[P1]** Session Store 瞬时故障导致 Turn 永久楔死 | 一次瞬时不可达变为永久不可完成/不可取消，云端托管可靠性关键缺陷 |
| 3 | [#13374](https://github.com/QwenLM/qwen-code/issues/13374) **[P2]** 共享命令索引上残留的 admission gap-lock 死锁 | #13365 已消除主要形态，InnoDB gap-lock 家族更窄窗口仍存活 |
| 4 | [#13392](https://github.com/QwenLM/qwen-code/issues/13392) **[P2]** PreToolUse 的 updatedInput 在 Desktop/ACP 0.24.7 中被忽略 | 阻断 MCP 集成通过 Hook 传递参数，#12922 回归的跟进 |
| 5 | [#13280](https://github.com/QwenLM/qwen-code/issues/13280) **[P2]** Memory 发现加载 git root 上一级目录的 QWEN.md/AGENTS.md | 边界越权读取，对 monorepo/嵌套仓库用户有直接影响 |
| 6 | [#13387](https://github.com/QwenLM/qwen-code/issues/13387) **[P2]** 自定义命令将 `@{file}` 引用的文件内容重新解释为模板语法 | 文件内容中字面量 `{{args}}` 被意外替换，命令组合场景的正确性问题 |
| 7 | [#13395](https://github.com/QwenLM/qwen-code/issues/13395) **[P2]** Kubernetes 工具运行时进度追踪 | 提案 #12380 + PR #13289 的落地门禁，平台化分发路线关键节点 |
| 8 | [#13255](https://github.com/QwenLM/qwen-code/issues/13255) **[P2]** CI flaky：集成测试间歇性 409 | 必须检查项（MySQL/Java 21 lane）不稳定红，阻塞无关 PR 合并 |
| 9 | [#13238](https://github.com/QwenLM/qwen-code/issues/13238) **[P2·已关闭]** 终局结算后的迟到结果被误判为已应用，丢弃 usage | 多 Agent 计费/用量统计正确性，#12582 后续 |
| 10 | [#12878](https://github.com/QwenLM/qwen-code/issues/12878) **[P2]** Ollama 拒绝零参数工具（parameters 字段被省略） | 本地模型用户全量 400 报错，local LLM 生态兼容性硬伤 |

其他值得留意：[#13369](https://github.com/QwenLM/qwen-code/issues/13369)（Hooks H2.5 加固阶段规划）、[#13130](https://github.com/QwenLM/qwen-code/issues/13130)（Desktop 全部工作区突然变 untrusted，已关闭）、[#13393](https://github.com/QwenLM/qwen-code/issues/13393)（Reasoning effort 档位目录化需求）。

---

## 4. 重要 PR 进展（Top 10）

1. [#13291](https://github.com/QwenLM/qwen-code/pull/13291) — **本地 Runtime 工具结果持久化（M5b）**：本地 Managed 会话的每次工具调用结果落入同一权威存储。
2. [#13174](https://github.com/QwenLM/qwen-code/pull/13174) — **Hosted Harness G3 代际接管**：Harness 重启后自动采用下一代而非整体失败，服务可用性大幅提升。
3. [#13265](https://github.com/QwenLM/qwen-code/pull/13265) — **H3 后台 Shell 与 Monitor 运行时**：双语设计文档先行，Managed 路径的后台执行能力。
4. [#13168](https://github.com/QwenLM/qwen-code/pull/13168) — **Hosted Turn 注入工作区项目上下文**：Hosted 会话读取其工作目录的 QWEN.md/AGENTS.md。
5. [#13402](https://github.com/QwenLM/qwen-code/pull/13402) — **SSE 事件缓冲改用 Condition**：消除虚拟线程中 synchronized/Object.wait 热点。
6. [#13325](https://github.com/QwenLM/qwen-code/pull/13325) — **关闭 #12692 R2 审查的 8 个 Critical**：含 InnoDB 锁序反转、keyset 分页等核心修复。
7. [#13332](https://github.com/QwenLM/qwen-code/pull/13332) — **Durable Managed Session 合并后正确性缺口关闭**：R1/R2 两轮审查遗留项清零。
8. [#12531](https://github.com/QwenLM/qwen-code/pull/12531) — **MCP 权限规则遵循生产者原始身份**：防止 `foo.bar` 的授权旁路给 `foo_bar` 冲突服务器。
9. [#13400](https://github.com/QwenLM/qwen-code/pull/13400) — **Hosted 审批输入预览**：文件/Shell 审批可返回 8192 字节上限的输入预览。
10. [#13406](https://github.com/QwenLM/qwen-code/pull/13406) — **越界 Host 工具在权限处理前拒绝**：原生沙箱（confinement）前置校验。

---

## 5. 功能需求趋势

- **Managed Agent 稳定性与并发**：占绝对主导。锁死锁、会话排队（[#13328](https://github.com/QwenLM/qwen-code/issues/13328)）、瞬时故障恢复、重试一致性等托管运行时问题集中爆发。
- **Hooks / 扩展生态**：H2.5 加固（#13369）、H3 后台 Shell/Monitor（PR #13265）、PreToolUse updatedInput 失效（#13392）表明扩展 API 已是第一优先级。
- **模型目录化（models.dev）**：上下文窗口/输出上限已落地，reasoning effort 档位（#13393）、版本别名（#13414）为下一步。
- **平台化分发**：Kubernetes 工具运行时（#13395）+ 跨平台交付门禁。
- **本地/第三方模型兼容**：Ollama 零参工具（#12878）、本地 LLM token 浪费（#12579）。
- **Web Shell / Desktop 体验**：auto-memory 面板（#13396）、自适应导航栏（PR #12943）、工作区信任机制。

---

## 6. 开发者关注点

- **可靠性 > 功能**：P1 级问题全部指向托管路径的“瞬时故障永久化”模式（#13413、#13374），社区对 fail-recover 语义要求极高。
- **CI 稳定性拖累协作**：flaky 必须检查项（#13255、#13386）+ `review-pr` 检查超时导致外部 PR 卡死（[#13205](https://github.com/QwenLM/qwen-code/issues/13205)），外部贡献者流失风险值得维护者关注。
- **审查流程工程化**：大量 PR 采用“Critical-only + follow-up 拆分 issue”模式（#13343、#13412、#13394），scope fuse（1500 行）机制在严格执行。
- **上下文/token 效率**：重复调查已读内容（#12579）对本地模型用户成本敏感，是高频复现痛点。
- **Windows 桌面体验**：MCP -32000 连接失败（#9693，已关闭待复测）、信任机制锁死（#13130）显示 Desktop on Windows 仍是薄弱环节。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*