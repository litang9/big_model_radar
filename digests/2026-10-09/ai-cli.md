# AI CLI 工具社区动态日报 2026-10-09

> 生成时间: 2026-10-09 00:20 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告（2026-10-09）

## 1. 生态全景

AI CLI 工具已全面进入**企业级与多智能体化阶段**：各工具的演进重心从基础编码辅助转向安全控制面（hooks、沙箱、权限模型）、长会话可靠性（记忆持久化、压缩）和无人值守 Agent 架构。头部产品（Claude Code、Codex）通过高频版本迭代强化安全与可观测性，而 Gemini CLI、Qwen Code 等则在 subagent/Managed Agent 架构上展开路线竞赛。值得注意的是，**Windows 平台稳定性成为全行业共同短板**，六款活跃工具中有五款正被 Windows 特有故障困扰。

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | 活跃 PR | Release | 本日焦点 |
|---|---|---|---|---|
| **Claude Code** | 10+（Top1: 202 评论） | 2 | ✅ 2 个（v2.1.294/295） | Hooks 安全加固（`onFailure: "block"`）、HIPAA 合规 PR |
| **OpenAI Codex** | 10+（Top1: 96 评论） | 10+ | ✅ 2 个线（v0.162.0 稳定 + 3 alpha） | Windows 沙箱 error 32 回归、只读工具并行化 |
| **Gemini CLI** | 10（多为 P1/P2 标签） | 10（含多个 P1） | ✅ 1 个 nightly | Subagent 挂起/误报、命令替换防护绕过修复 |
| **Copilot CLI** | 10（多数已关闭） | 0 | ✅ 5+ 补丁（至 v1.0.95-0） | ACP 沙箱失效、JSON 输出被脱敏破坏（新报） |
| **OpenCode** | 10（Top1: 62 评论/46 👍） | 10 | ❌ 无 | Windows Bun 崩溃、v1→v2 双轨策略 |
| **Qwen Code** | 10（2 个 P1 新增） | 10 | ❌ 无 | Managed Agent Stage H 落地、heredoc 安全绕过 |
| **Kimi Code CLI** | 0 | 0 | ❌ 无 | 无活动 |

**观察**：Claude Code 和 Codex 呈现「稳定版+密集补丁」的成熟节奏；Copilot CLI Issue 关闭率高但 PR 数据缺失，透明度较低；Gemini CLI 与 Qwen Code 处于架构攻坚期；Kimi Code 社区近乎静默。

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **Windows 平台稳定性** | Claude Code、Codex、OpenCode、Qwen Code、Copilot CLI | 进程锁无法重启（CC #42776，202 评论）、沙箱 error 32（Codex #51601，96 评论）、Bun 段错误（OpenCode #33742，62 评论）、ConPTY 窗口最小化（Qwen #13662）、ARM64 ripgrep 崩溃（Copilot #4977） |
| **权限/安全控制面** | 全部 6 款 | Claude Code hooks fail-closed、Codex 凭据掩码（PR #52302）、Gemini 命令替换防护、OpenCode deny 规则非确定性生效（50-90% 绕过率）、Qwen heredoc 绕过、Copilot 沙箱文件限制 |
| **长会话与记忆可靠性** | Claude Code、Codex、Gemini CLI、OpenCode | "goes dumb"（CC #70555）、MEMORY.md 静默截断（CC #99403）、compaction 失败中断任务（Codex #50843）、缓存保持式压缩（OpenCode PR #46369）、文件 CRUD 任务追踪对抗 context rot（Gemini #18836） |
| **MCP 生态体验** | Claude Code、Copilot CLI、Gemini CLI、Qwen Code | 多账号 OAuth（CC #100544）、懒加载（Copilot #2901，17 👍）、128 工具上限（Gemini #24246）、热刷新（Qwen #13632） |
| **多智能体/A2A 协调** | Claude Code、Gemini CLI、Qwen Code | 跨会话协调原语（CC #76727）、subagent 成熟化（Gemini 60% issue）、Managed Agent 架构（Qwen #12380，50 评论） |
| **可观测性与成本** | Claude Code、Codex、Copilot CLI、Gemini CLI | OTel 计费 span（Copilot #4224）、元数据截断移除（Codex PR #52268）、冻结误扣费（Copilot #770） |

## 4. 差异化定位分析

- **Claude Code**：最强调**企业安全与合规**——hooks 可审计化、HIPAA 配置示例、多账号集成，目标用户是受监管行业的企业开发者。短板是 Windows 桌面版（#42776 六个月未修，社区信任消耗中）。
- **OpenAI Codex**：**工程效率与终端体验**见长——只读工具并行执行、Git worktree 原生管理、TUI 快捷键深度打磨；同时是唯一将 Computer Use/Dot 自动化纳入主线的工具，押注「Agent 操作整个电脑」路线。
- **Gemini CLI**：**架构实验最激进**——零依赖 OS 沙箱提案、AST 感知工具链 EPIC、token 效率专项（36.6k/回合基线），走开源社区驱动的快速演进路线，但 subagent 可靠性债务较重。
- **Copilot CLI**：**企业集成与计费治理**为核心——ACP 编辑器生态、OTel 成本核算、托管策略（fail-closed），深度绑定 GitHub 企业工作流；缺点是透明度低（PR 无公开活动）与计费公平性争议。
- **OpenCode**：**开源 + 供应商中立**定位，v2 重构表明在赌下一代架构，但 sidecar 静默丢数据（#51020）显示早期风险；免费层/Zen 模型是其获客抓手。
- **Qwen Code**：**云原生多智能体平台化**野心最大——Managed Agent、K8s 工具运行时、channel/automation runtime，更像在构建「Agent 操作系统」而非 CLI 工具。

## 5. 社区热度与成熟度

| 维度 | 排序 | 说明 |
|---|---|---|
| **讨论热度** | Claude Code > Codex > OpenCode > Gemini CLI ≈ Qwen Code > Copilot CLI | CC 单 issue 最高 263 👍/202 评论；Codex 回归问题引发近百条讨论 |
| **迭代速度** | Copilot CLI（5+ 补丁/日）≈ Codex（稳定+3 alpha）> Claude Code > Gemini CLI > Qwen Code ≈ OpenCode | |
| **Issue 解决效率** | Copilot CLI 最优（Top10 中 6 个已关闭）；Claude Code 与 Codex 均有数月积压 | |
| **成熟度** | Claude Code / Codex 处于成熟期（安全、合规、企业功能）；Gemini CLI / Qwen Code 处于架构攻坚期；OpenCode 处于 v2 过渡阵痛期 | |

## 6. 值得关注的趋势信号

1. **「静默失败」成为头号公敌**：MEMORY.md 静默截断、hooks 误放行、sidecar 不落库、subagent 误报成功——各社区一致要求「要么成功、要么大声失败」。开发者选型时应重点考察工具的**失败可观测性**，而非仅看功能清单。

2. **安全机制从「尽力而为」走向「fail-closed」**：Claude Code 的 `onFailure: "block"`、Qwen 的 heredoc fail-closed、Copilot 的 pre-auth fail-closed 是同一趋势的三种实现。同时各工具的安全防护仍在被持续绕过（OpenCode 90% 绕过率、Gemini 命令替换绕过），**权限规则的可审计性将成企业采购硬指标**。

3. **无人值守 Agent 是下一个战场**：Qwen 的 Managed Agent、Codex 的 Command Center、CC 的云 Agents/Routines 均指向同一方向，但 journal 永久死亡（Qwen #13650）、计划任务遗弃（CC #99596）等故障表明可靠性尚未跟上野心。**计划将 CLI Agent 纳入 CI/CD 流水线前，需评估其崩溃恢复能力。**

4. **Windows 是被集体忽视的二等公民**：五款工具同日爆发 Windows 特有故障（容器 Job 对象、ConPTY、bindfilt、MSIX）。Windows 团队选型时应优先验证沙箱与进程管理，并保留版本回滚预案（如 Codex #51668 的 26.930 回滚方案）。

5. **合规与企业功能加速落地**：HIPAA 配置（CC）、OTel 计费治理（Copilot/Codex）、凭据掩码（Codex）表明**医疗/金融等受监管行业已成为明确目标市场**，AI CLI 正从开发者工具演变为企业基础设施。

---

*数据截至 2026-10-09，基于各仓库公开 GitHub 数据整理。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

*数据来源：github.com/anthropics/skills（截至 2026-10-09）*

## 一、热门 Skills 排行（PR）

> 注：本批数据中 PR 评论数均缺失，按讨论关联度与 Issue 联动热度排序。

| # | Skill | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** ([#1742](https://github.com/anthropics/skills/pull/1742)) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 header。修复 Issue [#1390](https://github.com/anthropics/skills/issues/1390) 中"评估对真实 MCP 服务器全部 0 分”的严重问题 | OPEN |
| 2 | **skill-creator 触发评估修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 修复 Windows 下 select() 失败、多 worker 竞争导致的假阴性触发率（对应 Issue [#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)，均为高评论 Issue） | OPEN |
| 3 | **skill-creator eval viewer 安全加固** ([#1961](https://github.com/anthropics/skills/pull/1961)) | 修复 XSS、DNS rebinding、跨站 POST 等安全问题（呼应 Issue [#1394](https://github.com/anthropics/skills/issues/1394)） | OPEN |
| 4 | **docx 修复系列** ([#1792](https://github.com/anthropics/skills/pull/1792)、[#1734](https://github.com/anthropics/skills/pull/1734)) | LibreOffice 超时误报成功、孤立批注检测，文档处理是持续高频修补领域 | OPEN |
| 5 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Markdown → MP4 视频 + 真人感配音，零成本内容创作方向 | OPEN |
| 6 | **AWT (AI Watch Tester)** ([#822](https://github.com/anthropics/skills/pull/822)) | AI 视觉 + 浏览器控制的零代码 E2E 测试 | OPEN |
| 7 | **pyxel 复古游戏开发** ([#525](https://github.com/anthropics/skills/pull/525)) | 存活 7 个月仍在更新的长尾贡献代表 | OPEN |
| 8 | **webapp-testing 安全修复** ([#1980](https://github.com/anthropics/skills/pull/1980)) | 消除 `shell=True` 命令注入风险（CWE-78） | OPEN |

## 二、社区需求趋势（Issues 提炼）

1. **Skill 质量评估与自测工具链** —— 最大痛点：`run_eval.py` 触发率为 0、并行 worker 假阴性（[#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)、[#1383](https://github.com/anthropics/skills/issues/1383)）。社区急需可靠的 Skill 触发/评测基础设施。
2. **组织级 Skill 共享与分发** —— [#228](https://github.com/anthropics/skills/issues/228)：希望原生组织内共享库，替代 Slack 传文件手动安装。
3. **命名空间与信任安全** —— 43 条评论的最热 Issue [#492](https://github.com/anthropics/skills/issues/492)：社区 Skill 冒充 `anthropic/` 官方命名空间造成信任边界滥用。
4. **上下文效率** —— `claude-api` 单次注入 ~156k token 打爆上下文（[#1487](https://github.com/anthropics/skills/issues/1487)）；插件内容重复导致 Skill 冗余（[#189](https://github.com/anthropics/skills/issues/189)）。
5. **方向性新 Skill 提案** —— compact-memory 紧凑记忆表示（[#1329](https://github.com/anthropics/skills/issues/1329)）、agent-governance 治理模式（[#412](https://github.com/anthropics/skills/issues/412)）、推理质量门禁流水线（[#1385](https://github.com/anthropics/skills/issues/1385)）。
6. **文档/办公处理** —— ODT 支持（PR [#486](https://github.com/anthropics/skills/pull/486)）、排版质量控制（PR [#514](https://github.com/anthropics/skills/pull/514)）、SharePoint 企业文档安全（[#1175](https://github.com/anthropics/skills/issues/1175)）。

## 三、高潜力待合并 Skills

- [#1742 mcp-builder 适配 mcp>=2](https://github.com/anthropics/skills/pull/1742) —— 修复被多人验证的评估失败，落地优先级最高
- [#1298 skill-creator 触发评估修复](https://github.com/anthropics/skills/pull/1298) —— 对应三个高热度 Issue，持续更新至 9 月
- [#1961 eval viewer 安全加固](https://github.com/anthropics/skills/pull/1961) + [#1980 webapp-testing 反注入](https://github.com/anthropics/skills/pull/1980) —— 安全修复类通常快速合并
- [#1792 docx 超时与结果校验](https://github.com/anthropics/skills/pull/1792) —— 小而准的正确性修复
- [#525 pyxel 游戏开发](https://github.com/anthropics/skills/pull/525) —— 长期存活且持续响应维护，是老 PR 中最可能合并的
- ⚠️ 风险提示：[#1771 proofcore-contract-auditor](https://github.com/anthropics/skills/pull/1771) 带有外部协议推广性质，在命名空间信任争议背景下合并概率低

## 四、生态洞察（一句话）

**社区最集中的诉求是“Skill 工程化基础设施”**——可靠的质量评估工具链（触发率/评测）、组织级分发机制、以及命名空间信任与上下文安全，而非单纯追求数量更多的新 Skill。

---

# Claude Code 社区动态日报 — 2026-10-09

---

## 1️⃣ 今日速览

过去 24 小时 Claude Code 连发两个版本（v2.1.294 / v2.1.295），重点强化了 **Hooks 安全模型**（新增 `onFailure: "block"` 失败即阻断）并引入 **OSC 7501 终端程序状态协议**支持。社区讨论热度最高的是 **Windows 桌面版进程锁导致的无法重启问题**（202 条评论）以及**长会话记忆退化**等核心体验议题。

---

## 2️⃣ 版本发布

### [v2.1.295](https://github.com/anthropics/claude-code/releases)
- **Hooks 安全加固**：为 command 和 HTTP hooks 新增 `onFailure: "block"` —— hook 启动失败、超时或异常退出码时将**直接阻断操作**，而非放行。这对用 hooks 做安全管控的企业用户是重要改进。
- **OSC 7501 支持**：实现 Program Status Protocol 的终端可显示 Claude Code 运行状态。

### [v2.1.294](https://github.com/anthropics/claude-code/releases)
- 修复指令式 `prompt` / `agent` hooks（如 "Block commands that..."）**误放行应阻断内容**的严重问题。
- 改进 Stop / SubagentStop 上的指令式 hooks 判定逻辑，降低 Claude 误判概率。

> 📌 分析：两个版本连续聚焦 hooks 可靠性，表明 Anthropic 正在把 hooks 从“尽力而为”机制推向**可审计的安全控制面**。

---

## 3️⃣ 社区热点 Issues（Top 10）

| # | Issue | 关注点 |
|---|-------|--------|
| 1 | [#42776](https://github.com/anthropics/claude-code/issues/42776) Windows 桌面版孤儿进程文件锁导致无法重启 | **202 评论 / 98 👍**，4 月至今未解，Windows 用户最大痛点 |
| 2 | [#24726](https://github.com/anthropics/claude-code/issues/24726) VS Code 扩展：允许禁用自动附加打开文件/选区 | **263 👍**，高赞功能请求，IDE 隐私/上下文控制需求强烈 |
| 3 | [#91763](https://github.com/anthropics/claude-code/issues/91763) Windows/MSIX: git fsmonitor--daemon 继承 AppX 容器 Job 阻止重启 | 提供根因分析 + 免重启 workaround，与 #42776 同根因家族 |
| 4 | [#76727](https://github.com/anthropics/claude-code/issues/76727) 多独立会话跨会话协调机制 | 深度分析共享工作树多会话场景下 deny hook 的“静默漏洞”，多 Agent 工作流核心诉求 |
| 5 | [#70555](https://github.com/anthropics/claude-code/issues/70555) 长会话 "goes dumb"：工作状态在压缩/`/clear` 后丢失 | 记忆连续性是高频痛点，影响所有重度用户 |
| 6 | [#99403](https://github.com/anthropics/claude-code/issues/99403) MEMORY.md 超限时静默截断、不提示丢弃了哪些条目 | 可观测性问题，静默数据丢失比报错更危险 |
| 7 | [#98159](https://github.com/anthropics/claude-code/issues/98159) claude.ai 默认权限模式设置（含 Skip all approvals） | Web 端权限体验对齐本地 CLI |
| 8 | [#96870](https://github.com/anthropics/claude-code/issues/96870) Windows MSIX: junction 路径导致内核非分页池泄漏（bindflt.sys） | 系统级内存泄漏，含复现，微软 bindflt 交互问题 |
| 9 | [#99596](https://github.com/anthropics/claude-code/issues/99596) 计划任务首次工具往返后被遗弃，session id 与 transcript 不匹配 | Routines/定时任务可靠性问题 |
| 10 | [#100606](https://github.com/anthropics/claude-code/issues/100606) Opus 模型质量疑似因量化显著下降 | 模型质量感知问题，值得官方回应澄清 |

**其他动态**：#100544（MCP 多账号认证）、#100407（Google 连接器多账号）均为昨日新提，反映多账号场景需求集中爆发；多批 7 月老 issue 因 stale 被批量关闭（#81925、#81932、#81934、#81938 等）。

---

## 4️⃣ 重要 PR 进展

过去 24 小时仅 2 个活跃 PR：

1. **[#100293](https://github.com/anthropics/claude-code/pull/100293)** — 新增 HIPAA 合规配置示例（`settings-hipaa.json`、`managed-mcp-hipaa.json`、README），面向需要限制会话内容外发场景的企业。**信号明确：医疗合规场景被正式纳入支持范围。**
2. **[#41447](https://github.com/anthropics/claude-code/pull/41447)** — 社区趣闻式 PR "open source claude code ✨"，挂了半年多，反映社区对开源的持续期待。

---

## 5️⃣ 功能需求趋势

1. **记忆与上下文持久化**（#70555、#99403）— 长会话状态连续性、MEMORY.md 透明度，是当前最强呼声。
2. **多会话 / 多 Agent 协调**（#76727）— 共享工作树下的并发管控，第一-party 协调原语缺失。
3. **权限模型灵活性**（#98159、#93377、#99820）— Web 端与云端 Agents 需要 "Skip all approvals" 及更细粒度的默认模式。
4. **多账号集成**（#100544、#100407）— MCP OAuth 与 Google 连接器均要求一服务多账号 + 身份可见。
5. **Windows 平台稳定性**（#42776、#91763、#96870、#80123）— MSIX 容器机制引发的系统性问题群。

---

## 6️⃣ 开发者关注点

- **Windows 桌面版是最大短板**：进程锁、内核内存泄漏、ConPTY 宽度问题（#80123）层层叠加，且多个 issue 数月未修（#42776 已 6 个月），社区耐心正在消耗。
- **静默失败比报错更遭痛恨**：MEMORY.md 截断（#99403）、hooks 误放行（v2.1.294 修复项）都属此类——开发者要求“要么成功、要么大声失败”，`onFailure: "block"` 正面回应了这一诉求。
- **无人值守场景可靠性**：云 Agents / 计划任务（#99596、#99820）在无人工审批轮次时的行为仍是薄弱环节。
- **配置可观测性**：`/context` 统计口径错误（#82333）等小问题虽已关闭，但反映对工具自身度量准确性的期待。

---
*数据截至 2026-10-09，来源：github.com/anthropics/claude-code*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 · 2026-10-09

## 📌 今日速览

Codex 稳定版 **rust-v0.162.0** 发布，带来 Git worktree 管理工具与 Command Center 任务固定功能；同时 **0.163.0-alpha.1** 开启下一版迭代。社区侧最大的风波是 **Windows 沙箱 "os error 32 / setup refresh had errors" 系列故障**在 26.1002 版本大面积爆发（#51601 评论已近 100 条），成为当前最 urgent 的回归问题。

---

## 🚀 版本发布

**[rust-v0.162.0](https://github.com/openai/codex/releases/tag/rust-v0.162.0)**（稳定版）
- 新增在受信任本地项目中创建/列出托管 Git worktree 的工具（启用 worktrees 特性时可用，#50148）
- Command Center 中可用 `p` 键固定任务，服务端支持时共享到 Pinned 分组（#51500）
- 终端导航与复制体验改进

**[rust-v0.163.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.1)** 等 3 个 alpha 版本同步推进，0.162 线密集迭代（alpha.17.2 / 18.1 / 20）。

---

## 🔥 社区热点 Issues（Top 10）

1. **[#51601](https://github.com/openai/codex/issues/51601)** — Windows app 26.1002.51308 沙箱自检时遭遇 sharing violation，所有命令执行失败。96 条评论、25 👍，**本日最热问题**，疑似 0.162.0-alpha.2 引入的回归。
2. **[#51634](https://github.com/openai/codex/issues/51634)** — 同一回归的补充报告：任何 runtime 文件被占用时沙箱配置即以 os error 32 中止，定位到 helper 层面。
3. **[#51668](https://github.com/openai/codex/issues/51668)** — 社区验证回滚到 26.930.7945.0 可恢复执行，为受影响用户提供临时解法。
4. **[#52033](https://github.com/openai/codex/issues/52033)** / **[#51981](https://github.com/openai/codex/issues/51981)** / **[#52324](https://github.com/openai/codex/issues/52324)** — error 32 问题的多个变体（node_repl.exe、Chrome 控制、VS Code 扩展），表明该故障影响面横跨 App 与扩展。
5. **[#47577](https://github.com/openai/codex/issues/47577)** — `@codex review` 静默忽略来自 fork 的 PR（9 月 20 日后出现），33 👍，影响开源协作工作流，值得团队用户重点关注。
6. **[#25826](https://github.com/openai/codex/issues/25826)** — Windows 多显示器下最大化窗口溢出，6 月至今未修复，长期遗留问题（51 条评论）。
7. **[#50538](https://github.com/openai/codex/issues/50538)** — VS Code 扩展 Enter 间歇性无法提交 prompt，影响日常编码流畅度。
8. **[#38348](https://github.com/openai/codex/issues/38348)** — macOS Computer Use 会误抓 Stage Manager 缩略图并"毒化" ScreenCaptureKit 流，Computer Use 可靠性代表问题。
9. **[#52091](https://github.com/openai/codex/issues/52091)** — macOS 每秒约 7,800 条 inactive-window resume 消息引发 CrBrowserMain SIGTRAP 崩溃，性能类新报告。
10. **[#50843](https://github.com/openai/codex/issues/50843)** — 长任务中连续远程上下文压缩（compaction）解码失败导致任务中断，关乎长会话稳定性。

---

## 🛠 重要 PR 进展（Top 10）

1. **[#52245](https://github.com/openai/codex/pull/52245)** — 只读工具（skill/memory/历史搜索等）支持并行执行，取消排他调度锁，**直接提升响应速度**。
2. **[#52268](https://github.com/openai/codex/pull/52268)** — 移除工具调用参数记录的 8KB/32KB 截断限制，元数据更完整。
3. **[#52302](https://github.com/openai/codex/pull/52302)** — 代理沙箱会话的可选凭据掩码（默认关闭），安全增强。
4. **[#52277](https://github.com/openai/codex/pull/52277)** — 修复网络域名通配符匹配的 UTF-8 字节语义，`?` 匹配行为回归 globset。
5. **[#52325](https://github.com/openai/codex/pull/52325)** — 在 turn 元数据中记录会话历史初始化类型（new/fork/cold_resume 等），可观测性提升。
6. **[#52235](https://github.com/openai/codex/pull/52235)** — gRPC code-mode 会话在 missing-session 错误后可自动恢复。
7. **[#52273](https://github.com/openai/codex/pull/52273)** — TUI 新增可配置 leader 快捷键前缀（默认 ctrl-x），键盘党福音。
8. **[#52270](https://github.com/openai/codex/pull/52270)** — TUI footer 支持鼠标选中文本复制，含 Unicode 处理。
9. **[#52278](https://github.com/openai/codex/pull/52278)** — 关闭 OpenAI analytics 时不再禁用自定义 OTLP metrics 导出，尊重自建监控。
10. **[#52330](https://github.com/openai/codex/pull/52330)** — 修复终端 hyperlink 重映射因换行 sentinel 越界导致的潜在 panic。

其他值得留意：[#52250](https://github.com/openai/codex/pull/52250)（Guardian 编排器连接器信任机制）、[#52241](https://github.com/openai/codex/pull/52241)（子代理能力与 fork 历史解耦）、[#52304](https://github.com/openai/codex/pull/52304)（远程控制 RPC 偏好持久化）。

---

## 📈 功能需求趋势

- **Windows 沙箱稳定性**是当前压倒性主题：30 条热门 Issue 中约 10 条与沙箱 error 32/setup refresh 相关，急需官方修复与回滚指引。
- **IDE/桌面端体验**：VS Code 扩展输入问题、窗口管理、TUI 键位/选择能力（PR 侧同步跟进）。
- **Computer Use / Dot 自动化**：macOS 屏幕捕获可靠性、Dot 的 Slack 集成（#50164）与 GitHub 集成（#52096）均有问题反馈，说明使用量在上升。
- **审批流程精细化**：项目级 "Always allow"（#44111）呼声重现。
- **可观测性/企业需求**：自定义 metrics 导出、结构化 tracing 等 PR 密集合入，企业用户占比提升。

## ⚠️ 开发者关注点

1. **Windows 用户暂缓升级 26.1002**：error 32 沙箱故障影响 App、VS Code 扩展与 CLI 全线，可参考 #51668 回滚至 26.930.x。
2. **Fork PR 审查静默失败**（#47577）尚未修复，开源维护者应留意 `@codex review` 可能漏审。
3. **长任务可靠性**：远程 compaction 失败（#50843）、gRPC 会话丢失（PR #52235 已修）是近期高频痛点，建议及时升级至包含修复的版本。
4. **误拦截**：Astra 安全检查仍会误伤防御性代码审查（#47310），影响安全相关工作流。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-09）

## 📌 今日速览

今日发布 v0.65.0 nightly 版本，重点修复 CI 工作流和核心请求内容规范化问题。Subagent（子代理）依然是社区讨论焦点，多项 P1 级 bug 集中在 subagent 挂起、状态误报等问题上。安全方面出现两个针对 shell 命令替换防护绕过（command substitution guard bypass）的修复 PR，值得关注。

---

## 🚀 版本发布

**v0.65.0-nightly.20261008.g44d764ee5**
- fix(ci): 修复 unassign-inactive-assignees 工作流中缺失的循环 ([#29609](https://github.com/google-gemini/gemini-cli/pull/29609))
- fix(core): 强制终端用户回合不变式并规范化请求内容（@luisfelipe-alt）

---

## 🔥 社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** [P1] Subagent 达到 MAX_TURNS 后误报成功 — `codebase_investigator` 触发回合上限却报告 `GOAL success`，掩盖了实际中断。13 条评论，涉及 agent 可观测性的核心信任问题。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** [P1] Generalist agent 挂起 — 委托给通用 agent 后简单操作（如建文件夹）永久卡死，8 👍，用户被迫手动禁用 subagent，影响日常可用性。

3. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** [P1] Browser subagent 在 Wayland 下失败 — Linux Wayland 用户的浏览器代理直接不可用。

4. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** [P2] Gemini 很少主动使用 skills 和 sub-agents — 用户配置了 gradle/git skills 但模型几乎不自动调用，反映 agent 调度策略与用户预期的差距。

5. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** [P2] 零依赖 OS 沙箱 + 执行后意图路由 — 利用 Gemini 3 原生 bash 能力的架构提案，社区讨论热烈的路线图级 issue。

6. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** [P2] AST 感知的文件读取/搜索/代码库映射 EPIC — 评估 ast-grep、tilth、glyph 等工具以提升 agent 精度与 token 效率。

7. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** [P2] 超过 128 个工具时触发 400 错误 — 工具数量上限管理不足，MCP 重度用户会直接撞墙。

8. **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)** [P2] 模型在随机位置创建临时脚本 — 工作区污染严重，清理成本高，影响提交整洁性。

9. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** [P2] Browser Agent 忽略 settings.json 配置（如 maxTurns）— AgentRegistry 读取并合并了配置但实际未生效。

10. **[#21924](https://github.com/google-gemini/gemini-cli/issues/21924)** [P2] 终端 resize 时的性能与闪烁问题 — 需迁移至 RenderStatic 并分批更新历史，Ink 渲染层的老大难。

---

## 🔧 重要 PR 进展

1. **[#29582](https://github.com/google-gemini/gemini-cli/pull/29582)** [P1] 性能优化：ignore 过滤与子树剪枝 — 引入目录级状态记忆化、通配符目录模式展开和 symlink/realpath 内存缓存，解决大仓库多秒级阻塞。

2. **[#29688](https://github.com/google-gemini/gemini-cli/pull/29688)** 安全修复：防止通过 shell wrapper 中间标志绕过命令替换防护 — `stripShellWrapper()` 对链式 flag + `-c` 形式识别不一致。

3. **[#29684](https://github.com/google-gemini/gemini-cli/pull/29684)**（已关闭）同类安全加固 — 加固 shell wrapper 剥离正则，与 #29688 构成双重修复路径。

4. **[#29683](https://github.com/google-gemini/gemini-cli/pull/29683)** [P1] A2A server：顺序批量调用中单次工具拒绝不再影响整批 — 修复一次拒绝导致整批文件修改中断的问题。

5. **[#29476](https://github.com/google-gemini/gemini-cli/pull/29476)** [P1] 修复 IDE 集成下交互模式 Enter 按键挂起 — 解耦确认事件发布与 IDE 通信，集成终端用户的常见痛点。

6. **[#29678](https://github.com/google-gemini/gemini-cli/pull/29678)** 修复 `.env` 加载竞态 — settings 占位符在环境变量加载前就被展开校验，导致配置失效。

7. **[#29672](https://github.com/google-gemini/gemini-cli/pull/29672)**（已关闭）消除 shell 命令安全误报 — `ls -ld`、`grep -rn` 等无害 POSIX 命令不再触发确认中断，改善安全提示信噪比。

8. **[#29643](https://github.com/google-gemini/gemini-cli/pull/29643)** 重新选择 Google 登录时清除缓存凭据 — 允许切换账号/重新认证，不再被陈旧 token 锁定。

9. **[#29673](https://github.com/google-gemini/gemini-cli/pull/29673)**（已关闭）`truncateString` 保留行终止符与 Unicode 字形簇 — 小修复大体验，避免截断输出丢换行。与 #29563 形成竞争方案。

10. **[#29457](https://github.com/google-gemini/gemini-cli/pull/29457)**（已关闭）[P1] read-many-files 中二进制文件误判为显式请求 — 模糊子串匹配导致图片/PDF 涌入上下文引发严重 context 膨胀，改用 glob 匹配。

---

## 📈 功能需求趋势

- **Subagent 体系成熟化**：今日 Issue 中约 60% 与 agent 相关——并行协作与共享内存（#18287）、本地 subagent 路线图（#20195）、轨迹可分享（#22598）、bug 报告缺上下文（#21763），表明子代理是当前最活跃的演进方向。
- **AST 感知工具链**：#22745/#22746/#22747 系列 EPIC 探索结构化代码导航，目标是减少错位读取、降低 token 消耗。
- **任务跟踪持久化**：用基于文件的 CRUD 任务追踪替换上下文内的 WriteToDo（#18836、#21000），对抗 context rot。
- **Token 效率**："Tactful Extraction" 手术式代码读取（#19561）响应每回合 ~36.6k token 的基线压力。
- **浏览器代理健壮性**：会话接管、锁恢复（#22232）与配置覆盖失效（#22267）。
- **安全与沙箱**：零依赖 OS 沙箱提案（#19873）、破坏性命令防护（#22672）持续升温。

## ⚠️ 开发者关注点（痛点总结）

1. **Agent 挂起与状态误报**：generalist/browser subagent 挂起、MAX_TURNS 误报成功，直接影响可信任度，是最高频投诉。
2. **上下文膨胀**：二进制文件误读、大文件 "firehose" 式注入，token 成本压力显著。
3. **配置不生效**：settings.json 覆盖被忽略、.env 加载竞态、symlink agent 不被识别（#20079）。
4. **安全提示误报**：无害命令频繁触发确认中断，干扰工作流。
5. **IDE 集成稳定性**：Enter 按键无响应、IdeServer 停止不 resolve 等集成终端问题。
6. **终端渲染体验**：resize 闪烁、`\n` 转义处理异常（#22466）等待修复。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-09** | 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)

---

## 📌 今日速览

Copilot CLI 昨日密集发布多个补丁版本（至 v1.0.95-0），重点修复 MCP 配置恢复、ACP 会话 `--context` 生效及托管插件重试策略。社区方面，模型冻结误扣 Premium 请求（#770）与 macOS 更新导致 CLI 不可用（#4998）等热门问题已关闭；新报的 ACP 模式沙箱失效（#5089）和 JSON 输出被密钥脱敏损坏（#5092）值得高度关注。

---

## 🚀 版本发布

### v1.0.95-0
- **改进**：托管插件的设置重试改为每小时或策略变更后触发，不再在每次消息失败时重试
- **修复**：`--context` 现在正确作用于新建和恢复的 ACP 会话，不再静默使用默认或已保存的 context tier

### v1.0.94 系列（含 v1.0.94-3 / -4 / -5）
- **新增**：模型选择和 `--model` 补全中加入 Claude Haiku 5.5
- **修复**：
  - `copilot mcp add` 在 MCP 配置初始化被中断后可干净恢复
  - MCP 启用/禁用现在可在服务器发现之前执行，无需启动 MCP 服务器
  - Assisted permissions 将可见的 shell 代码发送给权限判断器，减少不必要的人工审批
  - 当托管设置抑制启动时的 bypass-permission 标志时，显示策略警告

---

## 🔥 社区热点 Issues

1. **[#770](https://github.com/github/copilot-cli/issues/770) Claude Opus 4.5 处理提示词时冻结，且连续 3 次误扣 Premium 请求**（已关闭，16 评论 / 3 👍）
   计费与稳定性交叉的老牌痛点，用户强烈要求冻结时不扣费，长期受关注。

2. **[#1941](https://github.com/github/copilot-cli/issues/1941) 大量突发的 "CAPIError: 400 The requested model is not supported"**（已关闭，13 评论）
   模型路由/支持问题曾阻碍 agent 正常推进，影响面广。

3. **[#892](https://github.com/github/copilot-cli/issues/892) 沙箱模式：限制文件访问到指定工作目录**（已关闭，12 评论 / 49 👍）
   社区呼声最高的功能之一，安全隔离诉求强烈，现已落地。

4. **[#4998](https://github.com/github/copilot-cli/issues/4998) macOS 更新/重启后 `.mcp-writer.binding` 残留过期设备 ID 导致 CLI 完全不可用**（已关闭，10 评论 / 11 👍）
   影响所有会话的严重可用性 bug，修复备受好评。

5. **[#3709](https://github.com/github/copilot-cli/issues/3709) 支持单会话内通过 /model 切换多模型（含 BYOK/本地）**（开放，9 评论 / 34 👍）
   BYOK 用户只能通过 `COPILOT_MODEL` 钉死单一模型，灵活性缺口明显。

6. **[#4224](https://github.com/github/copilot-cli/issues/4224) OTel 子代理调用 span 缺失计费属性，外部成本核算低估**（已关闭，6 评论）
   企业可观测性与成本治理的关键问题。

7. **[#4844](https://github.com/github/copilot-cli/issues/4844) `--yolo` 启动标志被 pre-auth fail-closed 策略吞掉且不再恢复**（已关闭，4 评论）
   托管策略与本地权限标志交互的边界 bug。

8. **[#4275](https://github.com/github/copilot-cli/issues/4275) ACP 应暴露 contextTier 会话配置（与交互式 /model 对齐）**（开放，4 评论 / 3 👍）
   ACP 生态成熟度问题，编辑器集成用户的核心诉求。

9. **[#2901](https://github.com/github/copilot-cli/issues/2901) MCP 服务器懒加载**（开放，3 评论 / 17 👍）
   MCP 服务器增多导致启动缓慢，懒加载呼声高。

10. **[#5053](https://github.com/github/copilot-cli/issues/5053) 回归：1.0.89 起 ACP 会话不再索引会话历史与用量到 session-store.db**（开放，2 评论）
    1.0.88→1.0.89 的回归，影响会话追踪与用量统计。

> ⚠️ **今日新报安全/正确性问题**：[#5089](https://github.com/github/copilot-cli/issues/5089)（ACP 模式忽略 `--sandbox`，shell 命令在沙箱外运行）、[#5092](https://github.com/github/copilot-cli/issues/5092)（密钥脱敏破坏 `--output-format json` 输出）——均为昨日新开，建议优先跟进。

---

## 🔀 重要 PR 进展

过去 24 小时无活跃 PR 更新（数据源记录为 0 条），今日无 PR 进展可报告。

---

## 📈 功能需求趋势

1. **沙箱与安全隔离**：#892（已落地）、#5089（ACP 沙箱失效）——工作区级文件访问限制成为标配需求。
2. **模型灵活性与 BYOK**：#3709、#3978、#1988 —— 会话内多模型切换、BYOK 状态保持、Premium 请求预算控制。
3. **MCP 体验优化**：#2901（懒加载）、#3024（MCP 过多导致持续压缩）、#4998 —— MCP 是近期最集中的问题域。
4. **ACP / 非交互模式对齐**：#4275、#5053、#1774 —— 编辑器集成场景的配置与功能缺口。
5. **可观测性与成本核算**：#4224、#4858 —— OTel 计费属性与父子 span 正确性。
6. **新模型支持**：v1.0.94 已加入 Claude Haiku 5.5，社区对模型阵容扩充保持关注。

---

## 🛠 开发者关注点（痛点总结）

- **计费公平性**：模型冻结/报错时仍扣 Premium 请求（#770、#4802、#1988），是情绪最强烈的长期痛点。
- **启动与性能**：MCP/插件同步加载拖慢启动（#2901、#5090），大型仓库用户尤其不满。
- **状态持久化脆弱**：macOS 重启后绑定文件失效（#4998）、会话索引回归（#5053）、resume 与 session id 不一致（#4130）。
- **Windows / 跨平台兼容**：PowerShell profile 不加载（#1436）、剪贴板损坏（#3981）、ARM64 16KB 页内核上 ripgrep 崩溃（#4977）。
- **输出正确性**：JSON 输出被脱敏过滤器损坏（#5092），影响脚本化/CI 场景可靠性。
- **UI 细节**：`/skills` 拦截鼠标选择（#3741）、ask_user 前的文本被折叠隐藏（#4450）。

---
*本报告基于过去 24 小时 GitHub 公开数据自动整理，链接均指向原始 Issue/Release 页面。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-10-09

## 1. 今日速览

今日无新版本发布，社区焦点集中在 **Windows 平台稳定性**与 **v2 版本可靠性**上：v1.17.10 的 Bun 段错误崩溃 Issue 评论数已达 62 条，Windows 后台服务被反复杀死的问题持续发酵。贡献者提交了多个针对性修复 PR，包括凭据刷新协调、文件监听禁用变量（`OPENCODE_DISABLE_FILEWATCHER`）等；同时社区明确了 **v1 转入维护模式、新功能只进 v2** 的策略方向。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#33742](https://github.com/anomalyco/opencode/issues/33742) v1.17.10 在 Windows 上触发 Bun 段错误崩溃 | 62 条评论、46 👍，本日热度第一；降级到 v1.17.9 可规避，疑似回归，Windows 用户影响面大 |
| 2 | [#14273](https://github.com/anomalyco/opencode/issues/14273) Zen 免费模型误报"Free usage exceeded" | 42 条评论；有余额仍报免费额度耗尽，涉及计费体系，今日已关闭 |
| 3 | [#51343](https://github.com/anomalyco/opencode/issues/51343) 60 分钟空闲 Location 驱逐中断运行中会话 | 驻留在 `question` 上的会话不产生事件而被强制驱逐，架构层缺陷 |
| 4 | [#50627](https://github.com/anomalyco/opencode/issues/50627) `deny shell *` 策略导致免费层全部请求失败 | 权限系统与免费层鉴权交互的 bug，自定义 agent 用户易踩坑 |
| 5 | [#52049](https://github.com/anomalyco/opencode/issues/52049) Windows 45s 看门狗反复杀死后台服务 | 非崩溃而是客户端主动杀进程，所有进行中会话/子代理被中断；与 PR #53387 直接相关 |
| 6 | [#53991](https://github.com/anomalyco/opencode/issues/53991) NUL 字节项目 ID 导致目录解析永久失败（已复现） | 数据损坏无法自修复，阻塞 TUI 模型选择；已有对应 PR #54030 |
| 7 | [#39001](https://github.com/anomalyco/opencode/issues/39001) `rm/mv/cp` 权限规则非确定性生效 | 报告 `rm` 50%、`mv` 90% 绕过率，属**安全隐患**，值得优先处理 |
| 8 | [#51504](https://github.com/anomalyco/opencode/issues/51504) MCP 工具的 `ask` 规则被静默降级为 `allow` | 同为权限安全问题，确认提示偶发失效 |
| 9 | [#51020](https://github.com/anomalyco/opencode/issues/51020) v2 sidecar 接管后 message/part 静默不落库 | v2 数据持久化的严重缺陷，会话表面正常但无历史 |
| 10 | [#52341](https://github.com/anomalyco/opencode/issues/52341) / [#53978](https://github.com/anomalyco/opencode/issues/53978) LongCat 2.5 Preview Free 端点不可用 | 免费模型服务端故障，多用户报告（含 Go 订阅用户），待上游修复 |

---

## 4. 重要 PR 进展

| # | PR | 内容 |
|---|-----|------|
| 1 | [#54036](https://github.com/anomalyco/opencode/pull/54036)（已关闭） | 新增 `OPENCODE_DISABLE_FILEWATCHER` 环境变量，解决超大仓库/网络挂载下的监听开销，补齐 #53417 指出的文档缺口 |
| 2 | [#54023](https://github.com/anomalyco/opencode/pull/54023) | 跨 Location 协调凭据刷新：进程级全局服务按 credential ID 去重刷新，避免并发刷新冲突 |
| 3 | [#53387](https://github.com/anomalyco/opencode/pull/53387) | 防止后台服务 SIGKILL 循环 + 调优 SQLite WAL 并发，直接针对 Windows 服务被杀问题（#51216） |
| 4 | [#54030](https://github.com/anomalyco/opencode/pull/54030) | 忽略含控制字节的损坏项目 ID 缓存，修复 NUL 字节问题 #53991 |
| 5 | [#54017](https://github.com/anomalyco/opencode/pull/54017)（已合并） | diff 渲染性能优化：复用完整 patch 而非二次 Myers diff，消除渲染线程的二次方复杂度 |
| 6 | [#51422](https://github.com/anomalyco/opencode/pull/51422) | v2 恢复 `instructions` 配置解析器——v2 遗留未移植的功能缺口 |
| 7 | [#46369](https://github.com/anomalyco/opencode/pull/46369) | 缓存保持式压缩，压缩时保留稳定 prompt 前缀，降低长会话成本 |
| 8 | [#54024](https://github.com/anomalyco/opencode/pull/54024) | 新增 Linux DEB/RPM 系统包（amd64），改善服务器端安装体验 |
| 9 | [#54031](https://github.com/anomalyco/opencode/pull/54031) | Gemini 非字符串枚举值序列化修复（附测试），解决 #54033 |
| 10 | [#53802](https://github.com/anomalyco/opencode/pull/53802) | 保存 shell 权限规则时保留环境变量前缀，修复规则匹配失效 #52720 |

---

## 5. 功能需求趋势

- **权限与安全精细化**：MCP 工具权限规则（#53434 已实现 `mcp` 权限键）、bash 规则确定性（#39001、#51504）是持续高热方向
- **会话/项目管理**：项目目录重命名保留历史（#44256）、嵌套目录独立项目身份（#54034）、关闭会话的 slash 命令（#53414）
- **插件 API 扩展**：`shell.env` hook 上下文扩展（#21767 → PR #54032）、会话上下文暴露（PR #50644）
- **TUI/桌面体验打磨**：markdown 删除线渲染（#54037）、长问题文本滚动（#54035）、输入性能（#40225）
- **企业级部署**：Basic Auth 修复（#45856）、Linux 系统包（PR #54024）

---

## 6. 开发者关注点

1. **Windows 是最大痛点**：Bun 崩溃、看门狗杀服务、路径/挂载问题集中爆发，多个核心 PR 均针对 Windows 稳定性
2. **v2 数据可靠性**：sidecar 静默丢失消息落库（#51020）、v2 功能移植不完整（`instructions` 解析器），v2 早期采用者需谨慎
3. **权限系统可信度**：规则非确定性生效与 `ask` 静默降级直接影响安全边界，属高优先级风险
4. **v1/v2 双轨策略**：贡献者被明确告知新功能只进 v2，v1 仅维护（见 PR #54032、#53877 说明），插件作者面临迁移成本
5. **免费层/计费摩擦**：Zen 免费模型误报、LongCat 端点不可用等付费体验问题持续消耗社区信任

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-10-09

## 一、今日速览

Managed Agent 架构（#12380）仍是社区绝对焦点，Stage H 的 channel/automation/child Session runtime 多个切片 PR（#13572、#13598、#13550）持续推进。今日新增两个 **P1 级问题**：Hosted Session journal 在宕机后永久失效（#13650）和 daemon git worktree guard 的 heredoc 安全绕过（#13705）。此外 Windows 平台问题集中爆发，browser-use skill 与 Hook 子进程两大 bug 引发活跃讨论。

## 二、版本发布

过去 24 小时无新 Release。

## 三、社区热点 Issues

1. **[#12380](https://github.com/QwenLM/qwen-code/issues/12380) — Managed Agent 双路径架构提案（50 评论）**
   项目最核心的架构提案，定义 Session 持久所有权、Workspace 绑定与可恢复工具执行的分期交付方案。几乎所有近期重大 PR 都是它的落地切片。

2. **[#12867](https://github.com/QwenLM/qwen-code/issues/12867) — Stage D 后续：持久生命周期与 AgentDefinition（19 评论）**
   @wenshao 推进 Stage D 剩余部分：durable lifecycle、Turns/Actions、`java_durable` admission profile。

3. **[#13395](https://github.com/QwenLM/qwen-code/issues/13395) — Kubernetes 工具运行时进度追踪（16 评论）**
   跨平台交付门禁的跟踪 issue，10-09 更新显示 Draft #13526 已加入 assistant-batch 保留验证，进展活跃。

4. **[#13078](https://github.com/QwenLM/qwen-code/issues/13078) — 日常依赖 CVE 审计失败（14 评论）**
   CI 自动化发现问题，可能存在新的高危漏洞，连续多日未关闭，需安全侧关注。

5. **[#13650](https://github.com/QwenLM/qwen-code/issues/13650) — ⚠️ P1：Hosted Session journal 宕机后永久失效**
   跨越一次 activation renewal 的控制面宕机会导致 journal 永久死亡，所有后续操作返回 503 且无恢复路径，稳定性重大缺陷。

6. **[#13705](https://github.com/QwenLM/qwen-code/issues/13705) — ⚠️ P1：worktree guard heredoc 安全绕过**
   heredoc 被剥除后若接收方是 shell/解释器，其内容仍会被执行，攻击面与 #9417 相关，属安全类高优问题。

7. **[#13663](https://github.com/QwenLM/qwen-code/issues/13663) — browser-use skill 在 Windows 完全不可用**
   Native Messaging host 仅在 macOS/Linux 注册，Windows 用户全量受影响，配套性能问题见 #13692。

8. **[#13662](https://github.com/QwenLM/qwen-code/issues/13662) — Hook 子进程缺少 `windowsHide: true`**
   Windows Terminal (ConPTY) 下 PowerShell hook 会最小化整个终端窗口，影响所有配置了 hooks 的 Windows 用户。

9. **[#13632](https://github.com/QwenLM/qwen-code/issues/13632) — MCP 工具热刷新需求**
   支持 `notifications/tools/list_changed` 事件以在会话中动态刷新工具注册表，MCP 生态的实用增强。

10. **[#13649](https://github.com/QwenLM/qwen-code/issues/13649) — A2A 无 contextId 消息造成会话无限膨胀**
    #13583 引入的行为使每条消息创建一个不可区分的 chat session，多智能体互操作场景下的资源泄漏风险。

## 四、重要 PR 进展

1. **[#13598](https://github.com/QwenLM/qwen-code/pull/13598) — H6b/H6c automation runtime**
   落地 Managed Agent 持久化定义的自动化运行时（persistent definitions 的创建/修订/退休）。

2. **[#13572](https://github.com/QwenLM/qwen-code/pull/13572) — H5b/H5c channel runtime（email 参考适配器）**
   通道运行时 + 邮件适配器，71 条评审线程中 15 条 Critical 已全部修复，遗留 40 条建议见 #13638。

3. **[#13550](https://github.com/QwenLM/qwen-code/pull/13550) — H4b 子 Session 运行时**
   子 Session 的生命周期管理，多智能体架构的关键切片。

4. **[#13697](https://github.com/QwenLM/qwen-code/pull/13697) / [#13700](https://github.com/QwenLM/qwen-code/pull/13700) — MCP 工具确认框显示 PreToolUse ask 内容**
   修复 CI 失败 #13687，使 hook 的询问原因能正确合并到 MCP 确认对话框（bot 已并行提交，待去重）。

5. **[#13699](https://github.com/QwenLM/qwen-code/pull/13699) — browser-use 无 NM host 时快速失败**
   与 #13663/#13692 配套，将注册条件拆分为命名谓词并 fail-fast，避免 Windows 上 35 秒无效等待。

6. **[#13636](https://github.com/QwenLM/qwen-code/pull/13636) — 破坏性命令重复拒绝可升级为手动审批**
   AUTO 模式安全增强，与 classifier 拒绝策略对齐。

7. **[#13654](https://github.com/QwenLM/qwen-code/pull/13654) — 工具发布异步验证**
   发布回读与流验证移至持久化后台 worker，上传在输入就绪后返回 202，提升吞吐。

8. **[#13219](https://github.com/QwenLM/qwen-code/pull/13219) — managed-agent 重试循环绑定预算与终态**
   消除无限重试与永久卡死的 projection，健壮性专项修复。

9. **[#9417](https://github.com/QwenLM/qwen-code/pull/9417) — worktree guard 对 heredoc 展开 fail-closed**
   修复未引用分隔符下 bash 展开 heredoc 体绕过安全检查的问题，与 P1 issue #13705 直接相关。

10. **[#13673](https://github.com/QwenLM/qwen-code/pull/13673) — Workspace 退役时恢复原始 Hook sessions**
    配合 H 阶段交付的退役恢复路径修复，含最新门禁验证记录。

## 五、功能需求趋势

- **Managed Agent / 多智能体（主导）**：#12380、#12867、#13271、#13644、#13645 等大量 issue 围绕 Session 持久化、Agent Host 管理、A2A 协议展开，是当前 roadmap 的绝对重心。
- **Kubernetes / 平台分发**：工具运行时容器化（#13395）与 Desktop 下载入口自动化（#13656）。
- **MCP 生态增强**：工具热刷新（#13632）、MCP 确认对话框体验（#13697）。
- **权限与安全自动化**：AUTO 模式环境感知配置（#13691）、破坏性命令审批升级（#13636）。
- **性能优化**：auto-memory 提取冷却策略（#13004）、会话压缩正确性（#11988、#13707）。

## 六、开发者关注点

1. **Windows 平台是一等痛点**：browser-use 失效（#13663）、Hook 窗口最小化（#13662）、连接轮询浪费（#13692），Windows 用户的平台支持明显滞后。
2. **稳定性与可恢复性**：P1 级 journal 永久死亡（#13650）和 A2A 会话泄漏（#13649）反映社区对长期运行、无人值守场景的可靠性要求很高。
3. **安全边界持续被打磨**：heredoc 绕过（#13705/#9417）、deny 规则绕过（#12280）、Goal verifier 误判（#13360），安全审查密度大。
4. **CI 质量门禁承压**：多个 Main CI 失败 issue（#13687、#12714）和 CVE 审计失败（#13078）长期挂着，基础设施可靠性需关注。
5. **小众平台兼容性**：ARM64 Linux 的 ripgrep 二进制失效（#13704，树莓派 5 用户）提示分发打包需覆盖更多目标架构。

---
*数据来源：GitHub QwenLM/qwen-code · 统计窗口：过去 24 小时*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*