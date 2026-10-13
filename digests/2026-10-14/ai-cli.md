# AI CLI 工具社区动态日报 2026-10-14

> 生成时间: 2026-10-13 23:43 UTC | 覆盖工具: 7 个

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
**数据基准日：2026-10-14**

---

## 1. 生态全景

AI CLI 工具已从单一编码助手演进为**多智能体运行时 + 桌面端 + 远程协同**的复杂平台形态，头部产品（Claude Code、Codex、Gemini CLI、Qwen Code）均在大规模投入子代理/托管代理架构。竞争重心正从“模型能力”转向**可靠性工程**——静默失败、会话恢复、成本控制成为各社区最高频的投诉主题。Windows 平台支持普遍滞后，几乎成为所有工具的质量洼地。同时，BYOK/自托管推理、企业部署合规、插件生态扩展性构成新一轮功能竞争焦点。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | PR 活动 | Release | 今日焦点 |
|---|---|---|---|---|
| **Claude Code** | 10+（含 895👍 高票） | 2（均已关闭） | 无 | Mods 插件生态讨论（256 评论）、成本控制痛点群 |
| **OpenAI Codex** | 10（8 个 Windows 相关） | ~20 已合并 | **3 个 alpha**（0.163.0-a8/9/10） | V2 能力发现、Guardian v2、TUI 优化 |
| **Gemini CLI** | 10（多数 P1） | 10（含 XL 级 UI 重构） | **v0.64.0 正式版 + preview + nightly** | Gemini 4 Argon 模型注册、终端渲染稳定性 |
| **Copilot CLI** | 10 | 0（经 release 交付） | **4 个版本**（至 v1.0.98-0） | BYOK 缺陷群、ACP 会话管理 |
| **OpenCode** | 10+ | 10+ | 无 | V2 迁移、Windows ConPTY、GUI 插件机制 |
| **Qwen Code** | 10（2 P1、5 P2） | 15+ | **v0.25.2-preview.0 + nightly** | Managed Agent 多智能体运行时（占近半活动） |
| **Kimi Code CLI** | 0 | 0 | 无 | 无活动 |

**观察**：Codex 与 Qwen Code 的 PR 合并节奏最密集（日均 15-20 个），属于工程推进最激进的两家；Claude Code 因闭源分发，活动集中在 Issues/讨论；Gemini CLI 是唯一“正式版+预览版+nightly”三通道并行的工具。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **子代理/多智能体编排** | 全部（除 Kimi） | Gemini：子 agent 挂起/误报成功（#21409/#22323）；OpenCode：环境变量不继承、压缩后工具丢失；Qwen：Managed Agent 恢复语义；Copilot：内置 agent 不用声明模型（#5126） |
| **成本控制与透明度** | Claude Code、OpenCode、Qwen | Claude：交互会话无限费、预算检查滞后（#95964/#100111）；OpenCode：prompt-cache TTL 可配置（#51109）、会话成本显示；Qwen：上下文压缩触发 |
| **会话稳定性与恢复** | 全部 | Codex：stream disconnected 不可恢复；Gemini：Ctrl-C 会话污染（已修）；OpenCode：中断后消息重复注入（#55204）；Claude：会话记录丢失（#90164，data-loss） |
| **Windows/非主流平台支持** | Codex、Gemini、OpenCode、Qwen | Codex：Top10 中 8 个 Windows 问题；Gemini：PowerShell 检测误报回归；OpenCode：ConPTY raw mode 残留、集成终端 100% 失败 |
| **BYOK/自托管推理兼容** | Copilot CLI、Qwen Code | Copilot：贪婪采样参数退化推理模型（#4950）；Qwen：vLLM/SGLang 400 阻断（#14112/#14096） |
| **插件/扩展生态** | Claude Code、Codex、OpenCode、Copilot | Claude：Mods（256 评论）；OpenCode：GUI 插件架构落地；Codex：V2 能力发现；Copilot：插件 hooks 与市场认证 |
| **企业部署与合规** | Copilot、OpenCode、Codex、Claude | 系统级安装器、managed preferences、杀软拦截（#53778）、内容排除策略 |

---

## 4. 差异化定位分析

| 工具 | 技术路线 | 目标用户 | 差异化特征 |
|---|---|---|---|
| **Claude Code** | 闭源分发、官方主导插件生态（Mods） | 专业开发者、多客户工作室 | 生态开放性讨论热度最高（895👍 多账号），但认证/成本/数据可靠性欠账明显 |
| **OpenAI Codex** | Rust 核心、Computer Use/Dots 自动化代理 | 全平台重度用户 | 功能最前沿（语音、Cyber、能力发现 v2），但 Windows 质量债务沉重 |
| **Gemini CLI** | 开源、三通道发版、AST 感知工具链探索 | 开源社区/定制化用户 | 工程最规范（A/B 评估、P1/P2 分级、EPIC 管理），模型迭代通道快（Gemini 4 Argon） |
| **Copilot CLI** | GitHub 生态深度绑定、ACP/SDK 集成 | GitHub 原生用户、企业 BYOK 用户 | 企业合规与跨端同步是主诉求，BYOK 是最大竞争变量 |
| **OpenCode** | 开源桌面端 + GUI 插件化架构 | 开源桌面用户、贡献者 | V2 迁移期阵痛明显，但架构开放度最高 |
| **Qwen Code** | 企业级托管多智能体（MySQL/RocketMQ 后端） | 自托管/多租户场景 | 唯一押注服务端 Harness 接管与租户隔离的路线，工程复杂度最高 |

---

## 5. 社区热度与成熟度

**活跃度梯队**：
- **第一梯队**：Codex、Gemini CLI、Qwen Code——日均 10-20 个 PR 合并 + 多版本发布，处于快速迭代期
- **第二梯队**：Claude Code、OpenCode、Copilot CLI——Issues 讨论活跃但工程产出节奏较缓；Claude Code 讨论深度最高（单 issue 256 评论/895👍）
- **停滞**：Kimi Code CLI（24 小时零活动）

**成熟度判断**：
- **Gemini CLI** 工程成熟度最高：分级管理、回归修复、安全加固（CWE-88）齐头并进
- **Claude Code / Codex** 功能成熟但可靠性债务重：数据丢失、静默失败、平台级缺陷集中
- **OpenCode / Qwen Code** 处于架构重构/扩张期，迁移摩擦是主要风险
- 普遍规律：**功能迭代速度 > 稳定性收敛速度**，是全行业共同的结构性风险

---

## 6. 值得关注的趋势信号

1. **“多智能体运行时”成为新护城河**：Qwen 的 Harness/takeover/租户隔离、Codex 的 Dots、Gemini 的子 agent Sprint——CLI 正在演变为轻量级 agent 平台。开发者选型时应关注代理生命周期的可观测性，而非仅看模型能力。

2. **可靠性 > 功能的拐点将至**：各社区最高频投诉均为静默失败（任务不触发无日志、误报成功、后台 agent 失控）。"fail loudly" 是用户共同呼声，率先解决此问题的工具将获得生产环境信任。

3. **成本护栏成为刚需**：Claude Code 的预算检查滞后、OpenCode 的缓存 TTL 诉求表明，重度用户已进入成本敏感期。带预算上限和 token 可观测性的工具对企业采购更具吸引力。

4. **BYOK 与企业合规是下一个战场**：Copilot 的采样参数缺陷和 Qwen 的 vLLM 兼容问题显示，自托管推理用户群体快速壮大。系统级安装器、managed preferences、杀软兼容将成为企业落地的硬门槛。

5. **实操建议**：Windows + Computer Use/Dots 关键工作流建议暂缓依赖 Codex；依赖定时任务的生产用户需警惕 Claude Code 静默跳过；Gemini CLI 升级 0.63+ 前注意 PowerShell 检测误报；多智能体场景优先评估各工具的恢复语义文档。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-10-14，来源：anthropics/skills）

> ⚠️ 数据说明：本期 PR 数据缺少评论数字段，排行依据为 Issues 侧讨论热度与 PR 主题的社区关联度综合判断；所有 Top PR 均为 **OPEN** 状态。

---

## 一、热门 Skills / PR 动态（关注度 Top 7）

| # | PR | 主题 | 状态 | 亮点 |
|---|---|---|---|---|
| 1 | [#1742](https://github.com/anthropics/skills/pull/1742) | fix(mcp-builder)：适配 mcp>=2 的 `streamable_http_client` 导入与自定义 headers | OPEN | 对应高热度 Issue #1668，修复 MCP 生态 breaking change，是工具链基础性修复 |
| 2 | [#1298](https://github.com/anthropics/skills/pull/1298) | fix(skill-creator)：隔离 trigger evals，处理 Windows/运行时失败 | OPEN | 直接回应 #556、#1352、#1383 等多条高热度 Issues（触发率恒为 0% 的系统性 bug） |
| 3 | [#1961](https://github.com/anthropics/skills/pull/1961) | 安全加固 skill-creator eval viewer（脚本逃逸、DNS rebinding、XSS） | OPEN | 呼应 Issue #1394，社区安全审计的集中产出，最近仍在活跃更新 |
| 4 | [#1771](https://github.com/anthropics/skills/pull/1771) | 新增 proofcore-contract-auditor（Solidity/Rust 合约审计 + TON 链上存证） | OPEN | Web3 方向最受关注的新 Skill 提案，结合零存储 Merkle 协议 |
| 5 | [#1703](https://github.com/anthropics/skills/pull/1703) | 新增 md2video-audio（Markdown → MP4 视频 + 仿真配音） | OPEN | 零成本内容创作类 Skill，社区兴趣较高 |
| 6 | [#514](https://github.com/anthropics/skills/pull/514) | 新增 document-typography（AI 生成文档排版质量控制） | OPEN | 长期挂起（3 月至今），但击中"AI 文档排版普遍糟糕"的痛点 |
| 7 | [#822](https://github.com/anthropics/skills/pull/822) | 新增 AWT — AI 驱动的零代码 E2E 测试 Skill | OPEN | 赋予 Claude 视觉 + 浏览器控制，自动生成/执行 E2E 测试 |

其他值得关注的修复类 PR：[#1792](https://github.com/anthropics/skills/pull/1792)（docx LibreOffice 超时误报成功）、[#1980](https://github.com/anthropics/skills/pull/1980)（webapp-testing 命令注入风险）、[#1997](https://github.com/anthropics/skills/pull/1997)（YAML frontmatter 解析）。

---

## 二、社区需求趋势（来自 Issues）

1. **安全与信任边界（最高热度）**：[#492](https://github.com/anthropics/skills/issues/492)（46 条评论）——社区 Skill 冒用 `anthropic/` 命名空间分发，构成提权信任漏洞。配套出现多条安全审计 Issues（#1394 XSS、#1980 注入），**安全是当前第一议题**。
2. **组织级协作**：[#228](https://github.com/anthropics/skills/issues/228)（16 条评论）——企业强烈要求 Skills 组织内共享库/分享链接，替代目前 Slack 传文件的手工流程。
3. **skill-creator 评测体系可靠性**：#556、#1352、#1383 集中反映 trigger eval 触发率恒为 0%、并行 worker 串扰、Windows 兼容等系统性缺陷——**评测工具本身不可信**是贡献者最大痛点。
4. **上下文效率**：[#1487](https://github.com/anthropics/skills/issues/1487)——claude-api Skill 单次注入 ~156k tokens 耗尽上下文；配套需求如 [#1329](https://github.com/anthropics/skills/issues/1329) 的 compact-memory（紧凑符号化 agent 状态）。
5. **元技能 / 治理类 Skill 提案**：#1385（推理质量门禁流水线）、#412（agent-governance）、#83（skill 质量/安全分析器）——社区希望用 Skill 管理 Skill。

---

## 三、高潜力待合并 Skills（活跃 OPEN PR）

- **[#1742](https://github.com/anthropics/skills/pull/1742)** mcp-builder 修复 —— 阻塞大量 MCP 用户，10 月仍在更新，合并优先级高。
- **[#1961](https://github.com/anthropics/skills/pull/1961)** eval viewer 安全加固 —— 与官方 Issue #1394 直接对应，安全类修复通常快速落地。
- **[#1298](https://github.com/anthropics/skills/pull/1298)** skill-creator 触发评测修复 —— 解决多平台/多 Issues 的核心 bug，覆盖面广。
- **[#1771](https://github.com/anthropics/skills/pull/1771)** proofcore-contract-auditor —— Web3 方向差异化明显，但需注意其可能触发命名空间信任审查（呼应 #492）。
- **[#1703](https://github.com/anthropics/skills/pull/1703)** md2video-audio —— 功能完整、零依赖成本，属典型的"易采纳"型 Skill。

---

## 四、生态洞察（一句话总结）

> **社区最集中的诉求是"可信"二字**：既要官方解决 Skill 分发命名空间的信任边界与安全问题（#492 及一系列 XSS/注入修复），也要让 skill-creator 的评测体系真正可靠（触发率、并行、跨平台），否则 Skills 生态的质量与规模扩张都无从谈起。

---

# Claude Code 社区动态日报（2026-10-14）

## 1. 今日速览

过去 24 小时无新版本发布，社区焦点集中在 **Mods 扩展性系统**（#91870，256 条评论）的持续反馈和 **多账号管理**（#18435，895 👍）两大长期热点上。成本控制类问题（预算上限、自动扣费）与 Desktop 端认证/调度可靠性问题持续发酵，值得产品与平台团队关注。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues

1. **[#91870](https://github.com/anthropics/claude-code/issues/91870) — Mods：让 Claude 扩展性提升 10 倍**（256 评论 / 131 👍）
   官方团队持续响应社区反馈，Mods 已进入快速迭代阶段。作为本仓库最活跃的讨论，其走向将决定插件生态的未来形态。

2. **[#18435](https://github.com/anthropics/claude-code/issues/18435) — Desktop 多账号管理与快速切换**（200 评论 / 895 👍）
   👍 数最高的需求之一，多工作流/多客户开发者期盼已久，官方尚未给出明确时间表。

3. **[#95966](https://github.com/anthropics/claude-code/issues/95966) — 计划任务静默跳过触发窗口**（10 评论）
   5 天持续观测、主机与调度引擎均正常但任务不触发且无任何日志。静默失败对依赖定时任务的生产用户是高风险问题。

4. **[#89812](https://github.com/anthropics/claude-code/issues/89812) — Linux Desktop 每日强制重新登录 + Cowork 授权重复要求登录**（15 评论 / 有复现）
   `session_stale_relogin` 认证缺陷影响 Linux 桌面日常可用性。

5. **[#87003](https://github.com/anthropics/claude-code/issues/87003) — Remote Control 推送在 Android 端永远无法送达**（10 评论 / 有复现）
   已在 2.1.233 上跨设备复现，移动端远程控制功能实际不可用。

6. **[#95964](https://github.com/anthropics/claude-code/issues/95964) — 交互式会话缺少按会话的支出上限**
   `--max-budget-usd` 仅对 `-p` 非交互模式生效，交互会话无任何成本护栏，与 #100111 共同构成成本控制痛点。

7. **[#100111](https://github.com/anthropics/claude-code/issues/100111) — 预算上限在调用返回后才检查，$1 上限实际跑到 $1.38**（有复现）
   成本护栏的执行时机存在根本缺陷，3/3 复现。

8. **[#64968](https://github.com/anthropics/claude-code/issues/64968) — VS Code 扩展聊天面板无语法高亮**（15 评论）
   重开的经典请求，影响 VS Code 插件的基础使用体验。

9. **[#32362](https://github.com/anthropics/claude-code/issues/32362) — Zed IDE 官方集成支持**（20 评论 / 54 👍）
   `/ide` 无法检测 Zed，社区对非 VS Code/JetBrains 编辑器的集成需求明显。

10. **[#90164](https://github.com/anthropics/claude-code/issues/90164) — VS Code 扩展会话记录在 30 天保留期内丢失**（data-loss）
    有 15 个 git commit 佐证的长会话凭空消失，数据丢失类问题需最高优先级对待。

> 📌 另见：[#99213](https://github.com/anthropics/claude-code/issues/99213)（Mods 增加 WebView 面板渲染本地网页）是 Mods 生态的新兴方向；大量 stale issue 在 10-13 被批量关闭（如 #79545、#78693 等）。

---

## 4. 重要 PR 进展

过去 24 小时仅 2 个 PR 更新，且均已 CLOSED：

1. **[#44393](https://github.com/anthropics/claude-code/pull/44393) — 修复 backfill-duplicate-comments 脚本忽略 DAYS_BACK 环境变量的问题**
   使工作流传入的天数回溯参数真正生效，支持按创建日期过滤并提前终止分页。属仓库维护自动化改进。

2. **[#1](https://github.com/anthropics/claude-code/pull/1) — 创建 SECURITY.md**（bcherny，2025-02）
   仓库首个 PR，仅作历史记录更新。

> 本仓库 PR 活动极少（Claude Code 以闭源分发为主），社区贡献主要体现在 Issues 与讨论中。

---

## 5. 功能需求趋势

| 方向 | 代表 Issue | 态势 |
|---|---|---|
| **Mods / 插件扩展性** | #91870（256 评论）、#99213 | 🔥 官方主导，热度第一 |
| **多账号 / 认证体验** | #18435（895 👍）、#89812 | 长期高需求 + 活跃 bug |
| **成本控制与透明度** | #95964、#100111、#83062、#93886 | 🔥 上升趋势 |
| **IDE 集成广度** | #32362（Zed）、#64968、#91129 | 稳定需求，Zed 呼声增长 |
| **Desktop 可靠性** | #95966（调度）、#75523、#88359 | 定时任务/会话稳定性问题集中 |
| **移动端 Remote Control** | #87003 | 功能可用性存疑 |

---

## 6. 开发者关注点

- **成本护栏不完整**：交互会话无法限费、预算检查滞后于调用、余额误报、自动充值争议（#83062 曾涉及近千美元争议）——成本控制是当前最密集的痛点群。
- **静默失败问题**：计划任务不触发无日志（#95966）、会话记录丢失（#90164）、worktree 文件静默不复制（#79424）——用户普遍要求“失败要可见”。
- **认证摩擦**：Linux 桌面每日重登、Cowork 授权流程重复登录，打断自动化工作流。
- **非主流平台支持滞后**：Zed IDE、Android 推送、WSL 等场景长期缺位。
- **安全过滤器误伤**：合法网络安全/固件分析工作被 cyber 过滤器阻断的多个报告（已批量 stale 关闭，但诉求仍真实存在）。

---
*数据来源：anthropics/claude-code GitHub（截至 2026-10-14）*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-10-14）

## 一、今日速览

Codex 核心今日连发三个 alpha 版本（0.163.0-alpha.8/9/10），迭代节奏密集。社区侧，**Windows 平台问题依然占据热点榜首**——Computer Use 工具缺失、CUA MXC 启动器 HRESULT 0x80070003 错误等多个高评论 Issue 持续发酵。开发侧，团队合并了约 20 个 PR，重点推进 **V2 能力发现体系、Guardian v2 稳定性** 和 **TUI 体验优化**。

---

## 二、版本发布

| 版本 | 说明 |
|---|---|
| [rust-v0.163.0-alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.10) | 最新 alpha |
| [rust-v0.163.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.9) | 同日发布 |
| [rust-v0.163.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.8) | 同日发布 |

24 小时内连发三个 alpha，说明 0.163.0 正处于快速收敛期，预计短期内进入稳定版通道。

---

## 三、社区热点 Issues

1. **[#49458](https://github.com/openai/codex/issues/49458) | Windows dot-started 本地任务缺少 Computer Use 工具**（78 评论 / 26 👍）
   dot 启动的本地任务无法使用 Computer Use，而普通本地会话正常。存在两周仍未修复，是当前 Windows + Dots 组合的最高热度问题。

2. **[#52407](https://github.com/openai/codex/issues/52407) | Windows Dots：CUA MXC 启动器报 HRESULT 0x80070003**（78 评论）
   shell 恢复后 Computer Use 启动器失败，与 #53188 属同族问题，疑似系统性缺陷。

3. **[#50526](https://github.com/openai/codex/issues/50526) | Guardian 实验在干净的 config.toml 下仍报 deprecated thread_context**（28 评论）
   配置已清理但告警持续，提示桌面端配置注入与用户配置存在冲突，影响 Guardian 实验可信度。

4. **[#35446](https://github.com/openai/codex/issues/35446) | Win10 Computer Use 在 FrameArrived 中死锁**（27 评论，7 月至今未修）
   SoftwareBitmap 转换死锁导致截屏卡死，是 Computer Use 最顽固的老问题之一。

5. **[#41982](https://github.com/openai/codex/issues/41982) | Android 远程打开任务引发 git.exe 崩溃风暴 + 系统级 OOM**（19 评论）
   跨端 Remote 场景下的严重资源泄漏，属生产事故级别，值得远程办公用户警惕。

6. **[#52747](https://github.com/openai/codex/issues/52747) | 未知注入配置 code_mode_tool_description_first + 强制清理拒绝**（18 评论）
   桌面端向沙箱注入用户不知情的配置项，暴露了配置透明度问题。

7. **[#53188](https://github.com/openai/codex/issues/53188) | 浏览器工具初始化失败（MXC HRESULT 0x80070003）**（18 评论）
   Browser + Computer Use 双双不可用，与 #52407 互相印证。

8. **[#50771](https://github.com/openai/codex/issues/50771) | Codex 频繁提前停止、丢失任务**（12 评论 / 9 👍）
   模型行为类问题：承诺继续却提前结束回合，影响所有平台用户的工作流连续性。

9. **[#49789](https://github.com/openai/codex/issues/49789) | WSL 沙箱报 No such file or directory**（12 评论 / 9 👍）
   升级 26.928 后 WSL 沙箱失效，阻塞依赖 WSL 工作流的开发者。

10. **[#53778](https://github.com/openai/codex/issues/53778) | 守护进程每小时管道安装脚本被 McAfee 判为无文件恶意软件**（2 评论）
    今日新报：updater 通过 stdin + Invoke-Expression 执行 PowerShell，触发企业杀软拦截，凸显企业环境兼容性风险。

---

## 四、重要 PR 进展

1. **[#53797](https://github.com/openai/codex/pull/53797)** — Guardian 审查上下文变化时刷新评估，而非直接中止，提升 Guardian v2 稳定性。
2. **[#53736](https://github.com/openai/codex/pull/53736) / [#53723](https://github.com/openai/codex/pull/53723)** — V2 能力发现体系：新增 `executor_capability_discovery_v2` 特性并打通 exec-server RPC，支持获取插件/skill 元数据，为远程执行器能力协商铺路。
3. **[#53794](https://github.com/openai/codex/pull/53794)** — 修复异步迁移取消后锁提前释放导致的并发写风险，属数据安全加固。
4. **[#53790](https://github.com/openai/codex/pull/53790)** — 修复 macOS 生物识别验证弹窗无法取消的问题（Keychain 签名场景）。
5. **[#53754](https://github.com/openai/codex/pull/53754)** — TUI 快捷键支持 Command/Super 修饰键，macOS 用户福音。
6. **[#53733](https://github.com/openai/codex/pull/53733)** — Guardian v2 异步分类默认切换为 conversation 模式。
7. **[#53751](https://github.com/openai/codex/pull/53751)** — `app-server daemon restart` 正确应用命令行 feature flag 覆盖，改善调试体验。
8. **[#53784](https://github.com/openai/codex/pull/53784)** — 实时语音请求透传客户端 voiceSessionId，完善语音会话追踪。
9. **[#53717](https://github.com/openai/codex/pull/53717)** — API-key 会话默认启用 Cyber 访问程序（Daybreak），扩展 API 用户能力边界。
10. **[#53732](https://github.com/openai/codex/pull/53732)** — 压缩 rollout 搜索复用已编译的正则模式，搜索性能优化。

其他值得留意：[#53728](https://github.com/openai/codex/pull/53728)（resume picker 保留远程 cwd 过滤）、[#53747](https://github.com/openai/codex/pull/53747)（远程 Visualize 插件优先于内置版）。

---

## 五、功能需求趋势

- **Windows 平台质量**：今日 Top 10 热点 Issue 中 8 个与 Windows 相关（Computer Use、沙箱、Dots、Remote），Windows 已成质量洼地，社区呼声最集中。
- **Computer Use / 浏览器工具可靠性**：MXC 启动器错误、截屏死锁、FrameArrived 超时等问题扎堆。
- **Dots（自动化代理）授权与执行链路**：主对话授权不被委托执行器接受（#50119）、GitHub 审批恢复死循环（#53756）。
- **跨端协同（Remote/Handoff）**：Android 远程触发 OOM、Handoff 识别失败、移动端错误门控 Codex Cloud。
- **企业环境兼容**：Azure/Foundry 部署限制（#21928，25 👍）、杀软拦截（#53778）。

---

## 六、开发者关注点

1. **会话稳定性**：`stream disconnected before completion` 类问题反复出现（#4983、#52919、#53653），长会话的远程 compaction 失败导致不可恢复，是最普遍的痛点。
2. **沙箱可用性**：Windows 沙箱问题密集——WSL 路径错误（#49789）、CreateRestrictedToken 失败（#18451）、realpath EPERM（#52593）。
3. **配置透明度**：应用层注入未知配置（#52747）与幽灵 deprecated 告警（#50526）让用户难以排查。
4. **VS Code 扩展成熟度**：多窗口不可用（#15807，18 👍）、重复 onboarding（#25146）、同一会话出现在多个仓库窗口存在跨项目执行风险（#53758）。
5. **资源消耗**：git.exe 崩溃风暴与 OOM（#41982）表明远程任务对本地资源的管控仍需加强。

**小结**：功能层面（V2 能力发现、语音、Cyber 程序）推进迅速，但 Windows 端稳定性欠账明显，建议 Windows 用户暂缓依赖 Computer Use / Dots 的关键工作流，等待 0.163.0 稳定版落地。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-14）

## 1. 今日速览

Gemini CLI 发布 **v0.64.0 正式版**及 **v0.65.0-preview.0** 预览版，重点修复会话恢复时的重复工具响应及不受信任目录的安全策略问题。社区 PR 中出现重磅信号：**Gemini 4 Argon 模型（gemini-4-argon）支持已提交**（#29737）。UI/终端渲染稳定性成为本轮开发重心，多个防闪烁、防边框溢出的修复密集合入。Windows 用户注意：v0.63.0 的 PowerShell 命令检测出现误报回归（#29738）。

---

## 2. 版本发布

### v0.64.0（正式版）
- **refactor(a2a-server)**: 实现 V1 到 V2 设置迁移逻辑（#29450）
- **fix(acp)**: 桥接 `PromptResponse.usage` 并发出 `usage_update` 通知（#29389）

### v0.65.0-preview.0（预览版）
- **fix(cli)**: 在不受信任的文件夹中强制执行只读工作区设置（#29583）
- **fix(core)**: 恢复会话时避免重复的工具响应轮次（修复会话恢复污染问题）

### v0.65.0-nightly.20261013
- **fix(cli)**: 单个扩展未通过 allowlist 检查时，继续加载其他扩展，提升扩展系统容错性（#29720）

---

## 3. 社区热点 Issues

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 后误报 success | **P1**。`codebase_investigator` 撞上限却报 `GOAL` 成功，掩盖了中断事实，直接误导用户判断任务完成度。13 条评论，需重新测试 |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist agent 挂起 | **P1**，👍 8。子 agent 委派后无限挂起（即使创建文件夹也卡住 1 小时），用户只能手动禁止子 agent 规避，是子 agent 架构的严重可用性问题 |
| 3 | [#29738](https://github.com/google-gemini/gemini-cli/issues/29738) v0.63.0 Windows PowerShell 检测误报 | **昨日新增**。`detectPowerShellSubstitution` 硬编码逻辑误拦截 `git log` 等合法命令，Windows 用户升级需警惕 |
| 4 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) browser subagent 在 Wayland 下失败 | **P1**。Linux Wayland 用户浏览器子 agent 完全不可用，标记为需要重新测试 |
| 5 | [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) get-shit-done output hook 导致崩溃 | **P1**。输出摘要打印阶段反复崩溃，影响流行的社区 hook 生态 |
| 6 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 超过 128 个工具时 400 错误 | 大量扩展/MCP 场景下直接报错，工具数量管理策略需改进 |
| 7 | [#21763](https://github.com/google-gemini/gemini-cli/issues/21763) Bugreport 缺少子 agent 上下文 | **P1**。`/bug` 报告不含子 agent 内部状态，大幅增加排障成本 |
| 8 | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 覆盖 | 配置合并逻辑存在缺陷，`maxTurns` 等覆盖项不生效 |
| 9 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) 模型不主动使用 skills 和 sub-agents | 7 条评论。定制 skills/子 agent 触发率极低，反映调度提示词与工具选择机制的深层问题 |
| 10 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知文件读取/搜索/映射评估 EPIC | 方向性功能：用 AST 工具精确读取方法边界，减少 token 噪声和错位读取轮次，可能重塑 codebase_investigator |

---

## 4. 重要 PR 进展

| # | PR | 内容 |
|---|-----|------|
| 1 | [#29737](https://github.com/google-gemini/gemini-cli/pull/29737) **新增 Gemini 4 Argon 模型支持** | 🔥 注册 `gemini-4-argon` 为内置可选模型，配置基于 `chat-base-3` 扩展。下一代模型的集成信号 |
| 2 | [#29728](https://github.com/google-gemini/gemini-cli/pull/29728)（已合并）修复快速 Ctrl-C 导致会话污染 | **P1**。二次 Ctrl-C 在取消未完成前触发 `/quit`，产生损坏的会话记录，竞态条件修复 |
| 3 | [#29725](https://github.com/google-gemini/gemini-cli/pull/29725) 终端同步输出 + spinner 渲染隔离 | **XL 级 PR**，通过 synchronized output 消除 tmux 等复用器中的闪烁，直击 #21924 系列 UI 痛点 |
| 4 | [#29736](https://github.com/google-gemini/gemini-cli/pull/29736) 调度器发出工具调用组，移除 UI lookahead | 架构级重构：子 agent 调用分组逻辑从 UI 层下沉到调度器，简化渲染管线 |
| 5 | [#29678](https://github.com/google-gemini/gemini-cli/pull/29678)（已合并）先加载 .env 再解析设置占位符 | 修复加载顺序竞态：settings 中的 `${VAR}` 占位符此前在 .env 注入前就被展开 |
| 6 | [#29536](https://github.com/google-gemini/gemini-cli/pull/29536)（已合并）grep 防命令行选项注入 | 安全加固：用显式 `-e` 分隔搜索模式，修复 CWE-88 注入风险 |
| 7 | [#29718](https://github.com/google-gemini/gemini-cli/pull/29718) rootless Podman 沙箱加 `--userns=keep-id` | 修复无根 Podman 下沙箱 `EACCES` 错误，改善 Linux 沙箱兼容性 |
| 8 | [#29722](https://github.com/google-gemini/gemini-cli/pull/29722)（已合并）UTF-16/32 空白文件正确判空 | 此前空白字符按 UTF-8 解码留下 NUL 字符导致误判，编码边界修复 |
| 9 | [#29742](https://github.com/google-gemini/gemini-cli/pull/29742) 修复滚动工具容器右边框溢出 | UI 细节修复，展开的 WriteFile/Edit 视图在滚动模式下边框断裂 |
| 10 | [#29703](https://github.com/google-gemini/gemini-cli/pull/29703) 原子写临时文件名控制在 NAME_MAX 内 | 修复 215-255 字节文件名写入 `ENAMETOOLONG`，41 字节 UUID 后缀超出限制 |

---

## 5. 功能需求趋势

1. **子 Agent 体系深化**（最集中）：本地子 agent Sprint、并行协作与共享内存（#18287）、轨迹可视化 `/chat share`（#22598）、自我感知能力（#21432）——agent 框架是多条 workstream-rollup 的主线
2. **AST 感知工具链**：#22745/#22746/#22747 系列 EPIC，探索 tilth、glyph、ast-grep 用于精确代码读取与搜索
3. **沙箱与安全**：零依赖 OS 沙箱 + bash 原生能力利用（#19873）、破坏性操作防护（#22672）、per-workspace 策略（#18397）
4. **Token 效率**："Tactful Extraction" 外科手术式读取（#19561）、基于文件的持久化任务跟踪替代 WriteToDo（#18836）——降低上下文膨胀
5. **浏览器 Agent 韧性**：会话接管与锁恢复（#22232）、配置覆盖生效（#22267）
6. **新模型支持**：Gemini 4 Argon 注册 PR 显示模型迭代通道保持畅通

---

## 6. 开发者关注点

- **子 agent 可靠性是最大痛点**：挂起（#21409）、误报成功（#22323）、bugreport 无上下文（#21763）、不主动调用（#21968）——用户对委派机制信心受损，部分已改为手动禁用
- **终端渲染稳定性**：闪烁、resize 性能（#21924）、边框溢出等问题催生多个大型 UI 修复 PR，是当前工程投入最密集的方向
- **Windows/Wayland 平台回归**：v0.63.0 PowerShell 检测误报（#29738）和 Wayland 浏览器失败（#21983）提醒跨平台测试覆盖不足
- **工具数量与扩展生态**：>128 工具即 400 错误（#24246）、symlink agent 不识别（#20079）、扩展 allowlist 单点失败——重度定制用户频繁踩坑
- **中断与会话管理**：Ctrl-C 会话污染修复已合入，但快速取消、会话恢复类问题仍是高频反馈来源

---
*数据来源：github.com/google-gemini/gemini-cli | 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-14** | 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)

---

## 📰 今日速览

过去 24 小时内 copilot-cli 连发多个补丁版本（最新为 v1.0.98-0），重点修复 BYOK 场景下的网络认证、TLS 代理和 GitHub SCP 解析问题。社区讨论焦点集中在 **BYOK 自定义提供者的采样参数与模型匹配缺陷**以及 **ACP 模式的会话管理问题**。企业用户对系统级安装器和权限细化配置的需求持续升温。

---

## 🚀 版本发布

### v1.0.98-0
- 常规修复与变更（未附详细说明）

### v1.0.97
- 为自定义 Agent 新增 **agent 级声明式 hooks**
- 远程插件市场及插件拉取在 HTTPS 认证失败后，会使用已登录的 GitHub token 自动重试一次
- 流式响应在 TLS 拦截代理（省略 close_notify）下可正常完成
- 修复 GitHub SCP 风格 remote 解析

### v1.0.97-3
**修复**
- 远程插件市场认证重试（同上）
- TLS 代理下流式响应完成（同上）
- 修复含绝对路径的 SCP remote 解析，正确提取仓库 owner/name（关闭 [#5017](https://github.com/github/copilot-cli/issues/5017)）

### v1.0.97-2
**修复**
- 仓库中定义超过 100 个或深度嵌套的自定义 Agent 现在可被完整发现

---

## 🔥 社区热点 Issues

1. **[#4950](https://github.com/github/copilot-cli/issues/4950)** BYOK 强制贪婪采样（temperature=0）导致推理模型退化、上下文溢出时静默挂起
   自 1.0.81 起对自定义提供者硬编码采样参数，严重影响 vLLM 等自建模型体验，是 BYOK 用户的核心痛点。

2. **[#5115](https://github.com/github/copilot-cli/issues/5115)** ACP 模式下 `/rename` 报告成功但未实际重命名会话
   5 条评论，ACP 集成方（编辑器/IDE 开发者）最受影响的会话管理缺陷。

3. **[#4082](https://github.com/github/copilot-cli/issues/4082)** CLI 与桌面应用跨端会话同步
   13 👍，长期高票功能诉求，反映多端工作流已成主流使用模式。

4. **[#4358](https://github.com/github/copilot-cli/issues/4358)** BYOK：从 provider 的 `/models` 端点填充 `/model` 选择器
   9 👍，当前 BYOK 只能配置单一模型，无法会话内切换，限制明显。

5. **[#5133](https://github.com/github/copilot-cli/issues/5133)** ACP 模式忽略 `includeCoAuthoredBy: false`
   提交仍被加上 `Co-authored-by: Copilot`，`copilot -p` 下正常——ACP 与交互模式的配置行为不一致。

6. **[#5127](https://github.com/github/copilot-cli/issues/5127)** SDK + BYOK：短模型名无法匹配 provider 模型，报误导性 "No GitHub OAuth token" 错误
   SDK 集成路径上的 BYOK 配置体验问题，错误信息指向错误方向，排障成本高。

7. **[#5126](https://github.com/github/copilot-cli/issues/5126)** BYOK：内置 agent（explore/task/research）从不使用其声明的默认模型
   静默降级到会话模型，与 agent 定义不符，影响子 agent 效果。

8. **[#5129](https://github.com/github/copilot-cli/issues/5129)** 请求提供 Windows 系统级安装器（企业部署）
   用户级安装路径与 corporate 安全策略（禁止从用户可写目录执行）冲突，企业落地刚需。

9. **[#5134](https://github.com/github/copilot-cli/issues/5134)** Windows：MCP OAuth 初始化失控，反复打开浏览器直至手动终止
   阻断正常启动与认证，属阻断级缺陷。

10. **[#285](https://github.com/github/copilot-cli/issues/285)**（已关闭）限制 write 工具仅可写入指定文件/目录
    7 👍 的老牌权限细化诉求已关闭，与 Permissions Epic（[#316](https://github.com/github/copilot-cli/issues/316)）推进相关，值得关注后续落地情况。

---

## 🔀 重要 PR 进展

过去 24 小时内无 PR 更新，本节省略。修复内容主要通过 release 交付（见版本发布部分）。

---

## 📈 功能需求趋势

- **BYOK 深度完善**：采样参数可控、模型动态发现/切换、短名匹配、agent 默认模型——本周最高频主题，自建模型用户群快速壮大
- **会话管理**：跨端同步（#4082）、侧边栏重命名（#5128）、会话命名显示（#5132）、嵌套会话退出（#5135）
- **企业级部署与合规**：系统级安装器（#5129）、内容排除服务稳定性、托管账户策略（#5130）
- **权限精细化**：文件级写入限制（#285 已关闭）、权限打断体验优化（#5131）
- **可观测性**：prompt 执行时间追踪（#5125）

---

## 🎯 开发者关注点

1. **BYOK 一等公民化迫在眉睫**：#4950、#5126、#5127、#4358 集中爆发，核心诉求是 CLI 不应替 provider 决定采样策略，且模型配置需灵活可发现
2. **ACP/SDK 模式的功能对齐**：`/rename`、`includeCoAuthoredBy` 等在 ACP 模式失效，集成方需注意非交互模式与交互模式的行为差异
3. **稳定性与退出卫生**：崩溃后终端残留 mouse-tracking 转义序列（#5120）、OAuth 失控循环（#5134）等“小而痛”的问题影响日常体验
4. **插件系统边界问题**：多插件 `userPromptSubmitted` 的 additionalContext 只保留最后一个（#5122），插件生态扩展的前提是可靠
5. **误报与噪音**：#5130 的 "Managed account policy" 持续报错从 1.0.94 起未修，用户反馈“难以工作”

---
*本报告基于 2026-10-13 ~ 2026-10-14 的 GitHub 公开数据自动整理。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-10-14

## 📌 今日速览

今日无新版本发布，社区讨论集中在 **V2 的稳定性修复**上：Windows 平台问题集中爆发（TUI raw mode 残留、集成终端无法打开、pwsh 别名解析），多个重要修复 PR 已提交。同时，V1→V2 迁移的会话可见性问题持续发酵， contributors 推进了桌面端功能（GUI 插件机制、会话成本显示）。

---

## 🔥 社区热点 Issues

**1. V2 缺少原生 TODO 工具支持** — [#42421](https://github.com/anomalyco/opencode/issues/42421)
26 条评论，V1 中模型可用的 `todowrite`/`todoread` 工具在 V2 运行时工具目录中消失，直接影响依赖 TODO 列表的 agent 工作流，是 V2 迁移的重要功能回归。

**2. 自动压缩后 agent 丢失顶级工具** — [#51949](https://github.com/anomalyco/opencode/issues/51949)
auto-compact 后 agent 不再调用顶级工具，全部经由 code mode 路由并持续失败，最终向用户谎报“工具未注册”。核心可靠性问题，值得关注。

**3. 关闭应用后 agent 仍在运行** — [#55214](https://github.com/anomalyco/opencode/issues/55214)
用户关闭 App 数小时后重开，发现 agent 一直在后台操作电脑。安全与资源管控的重大隐患，社区反响强烈。

**4. GitHub Copilot Student 计划无法识别 provider** — [#34644](https://github.com/anomalyco/opencode/issues/34644)
OAuth 认证成功后 provider 仍不出现在模型选择器中（22 👍），学生用户群体受阻的长期遗留问题。

**5. V1→V2 迁移后非 git 目录会话不可见** — [#49827](https://github.com/anomalyco/opencode/issues/49827) / [#50551](https://github.com/anomalyco/opencode/issues/50551)
两个相关 issue 均指向 importer 保留 `project_id='global'` 导致会话在 per-directory picker 中被过滤，数据未丢但体验断裂。

**6. 子代理会话不继承 `session.environment`** — [#55228](https://github.com/anomalyco/opencode/issues/55228)
`PUT /api/session/{id}/environment` 设置的环境变量在 subagent 子会话中失效，已有对应修复 PR（见下文）。

**7. Windows ConPTY 退出后终端残留 raw mode** — [#55163](https://github.com/anomalyco/opencode/issues/55163)
`/exit` 后鼠标上报未关闭，在 Alacritty + zellij 环境下可直接搞垮整个复用器会话。

**8. Windows 集成终端打不开（opencode-pty 缺失）** — [#55189](https://github.com/anomalyco/opencode/issues/55189)
Desktop 端集成终端在 Windows 上 100% 失败，`opencode-pty` 不在 $PATH 中，503 报错。

**9. 中断后排队消息被重复注入上下文** — [#55204](https://github.com/anomalyco/opencode/issues/55204)
同一用户消息在 run 中断/恢复后被多次投递给模型，持久层正确但 prompt 组装层重复——上下文污染风险。

**10. 可配置 prompt-cache TTL** — [#51109](https://github.com/anomalyco/opencode/issues/51109)
Anthropic 默认 5 分钟缓存 TTL 成为长会话/编排场景的成本主导因素，请求按 agent/provider 粒度可配置。成本敏感用户的核心诉求。

> 其他值得一提：网络重连后的虚假 "Session location unavailable" 提示 [#55250](https://github.com/anomalyco/opencode/issues/55250)、Desktop 二次拖拽文件被静默忽略 [#55216](https://github.com/anomalyco/opencode/issues/55216)、硬编码端口 49374 锁死多客户端 [#50672](https://github.com/anomalyco/opencode/issues/50672)。

---

## 🛠 重要 PR 进展

**1. 子会话继承父会话环境变量** — [#55257](https://github.com/anomalyco/opencode/pull/55257)（OPEN）
修复 #55228，`Session.create` 补齐 environment 继承，与 location/metadata/permissions 一致。

**2. 修复重连后位置同步的瞬态失败** — [#55258](https://github.com/anomalyco/opencode/pull/55258)（OPEN）
修复 #55250 的虚假恢复提示，容忍 server/proxy 尚未就绪时的同步失败。

**3. 加载系统级托管配置目录（已合并线）** — [#54921](https://github.com/anomalyco/opencode/pull/54921) / [#51337](https://github.com/anomalyco/opencode/pull/51337)（CLOSED）
恢复 V1 的 `%ProgramData%` / `/etc/opencode` / macOS managed preferences 管理配置支持，修复 #51107，企业部署刚需。

**4. GUI 插件机制落地** — [#55246](https://github.com/anomalyco/opencode/pull/55246)（OPEN）
插件可通过 `./gui` 导出自带图形界面；桌面端内置功能也改为内置插件，统一在 Settings > Plugins 管理。架构层面的大动作。

**5. Figma 插件切换到公开 app endpoint** — [#55252](https://github.com/anomalyco/opencode/pull/55252)（OPEN）
从私有 team-only endpoint 迁移至已批准的公开 endpoint，呼应 issue #54805。

**6. Windows Store pwsh 应用执行别名解析** — [#48968](https://github.com/anomalyco/opencode/pull/48968)（OPEN）
修复 MSIX 安装的 `pwsh` 被静默回退到 PowerShell 5.1 的老问题（#41426）。

**7. 中断时保留已完成的 execute 结果** — [#54251](https://github.com/anomalyco/opencode/pull/54251)（OPEN）
中断 `execute` 后保留已完成嵌套调用的有界预览和日志，改善中断恢复体验。

**8. 会话视图显示 tokens 与成本** — [#53785](https://github.com/anomalyco/opencode/pull/53785)（CLOSED）
在上下文环旁显示 `101k · $4.55`，免费模式隐藏成本，成本可见性改进。

**9. V1 npm 配置迁移兼容内置 provider 路由** — [#55254](https://github.com/anomalyco/opencode/pull/55254)（CLOSED）
修复迁移时一律包裹 `aisdk:` 导致内置 provider（如 Vertex/Mistral）启动失败的问题。

**10. Steer 消息首帧即显示 pending 状态** — [#55251](https://github.com/anomalyco/opencode/pull/55251)（OPEN）
消除 agent 运行中插入指令时“蓝色已送达→灰色 pending”的闪烁。

> 另见：策略文档 action 名称修正 [#55259](https://github.com/anomalyco/opencode/pull/55259)、agent frontmatter 未加引号 `[` 开头值解析修复 [#55141](https://github.com/anomalyco/opencode/pull/55141)。

---

## 📈 功能需求趋势

1. **V2 迁移完整性**：TODO 工具回归、非 git 会话可见性、managed config、`/export` 路径——迁移体验是当前最大摩擦点。
2. **成本控制与可观测性**：prompt-cache TTL 可配置、会话成本展示，反映重度用户对 token 成本的关注。
3. **进程生命周期管理**：关闭 App 后 agent 不停止、长时进程不可见（#53614）、后台进程注册表，用户要求对 agent 执行有更强的管控。
4. **Windows 一等公民支持**：ConPTY、MSIX shell 别名、集成终端、`ProgramData` 配置——Windows 生态问题占比显著。
5. **企业/托管部署**：managed preferences、多用户共享 loopback、零保留数据策略标注。
6. **生态集成**：Figma MCP、Google Vertex OpenAI 兼容模型、GUI 插件化架构。

## ⚠️ 开发者关注点

- **子代理（subagent）可靠性**是高频痛点：环境变量不继承、压缩后工具丢失、排队消息重复注入，均发生在代理编排路径上。
- **错误反馈过弱**：provider 整体被静默丢弃仅留 WARN（#54973）、端口冲突只报通用超时（#50672）、拖拽失败无任何提示——用户反复要求“fail loudly"。
- **网络中断恢复**仍是顽疾：会话无法继续（#35029）、虚假位置恢复提示，说明 reconnect 路径缺乏系统性测试。
- **资源与安全边界**：`/tmp` 可读导出、`/tmp/opencode` 权限错乱、后台 agent 失控，安全默认值有待收紧。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-10-14

## 1. 今日速览

Qwen Code 发布 **v0.25.2-preview.0** 预览版，聚焦 Managed Agent（托管多智能体）的 connector/broker 健壮性修复。社区方面，Managed Agent 仍是绝对主线——@wenshao 单日提交多个 H4 阶段 PR（task cancel、team plans、persistence 合并），同时暴露两枚 **P1 级核心缺陷**：wake input 丢失（#14116）与 ACP 模式下 MCP 工具不可见（#14114）。此外，vLLM/SGLang 自建后端兼容性问题集中爆发（#14112/#14096/#14097），值得自托管用户重点关注。

---

## 2. 版本发布

### [v0.25.2-preview.0](https://github.com/QwenLM/qwen-code/releases)
- **fix(managed-agent)**: 来自 #12692 R2 评审的 connector 与 broker 健壮性修复（PR #13330）
- **feat(managed-agent)**: H4e-b2 相关功能（发布说明被截断）
- 同日还有 nightly 构建 `v0.25.1-nightly.20261013.6212189f1f`，内容与上述变更一致

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 重要性 |
|---|-------|--------|
| 1 | [#14116](https://github.com/QwenLM/qwen-code/issues/14116) **[P1]** Managed Agent：Harness 死亡前已提交的 wake input 在 Session 被无关操作加载前不会执行 | 多智能体场景下任务可能无限静默挂起，属可靠性核心缺陷 |
| 2 | [#14114](https://github.com/QwenLM/qwen-code/issues/14114) **[P1]** ACP 会话从不宣告启动后发现的 MCP 工具 | ACP 模式（`qwen --acp`）下模型完全无法使用后注册的 MCP 工具，headless 模式正常 |
| 3 | [#14112](https://github.com/QwenLM/qwen-code/issues/14112) **[P2]** vLLM 后端 OpenAI 兼容 provider 全部 400：无参数工具缺少 `parameters` 字段 + 不支持 `tool_choice:"required"` | 自建推理用户被完全阻断，影响面大 |
| 4 | [#14115](https://github.com/QwenLM/qwen-code/issues/14115) **[P2]** 无 body 的 provider 400 错误无法诊断 | CLI 只显示 `400 (no body)`，errorResponse/headers/x-request-id 均未透出，排障困难 |
| 5 | [#14062](https://github.com/QwenLM/qwen-code/issues/14062) **[P2]** Hosted `send_message` 在大小边界内仍可炸掉整个 Turn | 溢出被 throw 而非拒绝，模型无法收到“缩短重试”的可操作反馈 |
| 6 | [#14096](https://github.com/QwenLM/qwen-code/issues/14096) / [#14097](https://github.com/QwenLM/qwen-code/issues/14097) **[P2]** vLLM/SGLang 上下文溢出错误不被识别，反应式压缩永不触发 | 长会话超过 `max_model_len` 后 400 循环、无法自愈 |
| 7 | [#14110](https://github.com/QwenLM/qwen-code/issues/14110) **[P2]** 构建失败：CLI 使用了固定版本 ink@7.0.3 未导出的 API（51 个 TS 错误） | 从源码构建被阻断，需尽快给出 need-information 后的修复 |
| 8 | [#14116 之外另一枚多智能体跟踪] [#14070](https://github.com/QwenLM/qwen-code/issues/14070) **[P2]** 同一 Session 并发 takeover 加载，后者被 409 拒绝并付出完整退避代价 | Harness 重启后的控制面竞态，影响接管时延 |
| 9 | [#13787](https://github.com/QwenLM/qwen-code/issues/13787) **[P3]** XML 恢复在多 tool-call 大响应上重复前缀扫描，性能劣化 | 已有可复现基准，量化了 main 与 PR #13579 的开销 |
| 10 | [#14075](https://github.com/QwenLM/qwen-code/issues/14075) **[P3]** 静态渲染模式下行宽填满终端时 word-wrap 丢 1-2 字符 | Windows 用户可见的 UI 渲染缺陷 |

**已关闭亮点**：工具加载 A/B 评估主线 [#12333](https://github.com/QwenLM/qwen-code/issues/12333)（16 条评论）关闭，其反例分析转入 [#14065](https://github.com/QwenLM/qwen-code/issues/14065)；P1 级 [#13838](https://github.com/QwenLM/qwen-code/issues/13838)（控制面 kill 后子 Session 409）已修复关闭。

---

## 4. 重要 PR 进展（Top 10）

| # | PR | 内容 |
|---|-----|------|
| 1 | [#14069](https://github.com/QwenLM/qwen-code/pull/14069) | **持久化大整合**：Managed Agent 从 63 张业务表合并为 32 表 MySQL 8.4 基线，统一版本化 DDL |
| 2 | [#14076](https://github.com/QwenLM/qwen-code/pull/14076) | H4f：workflow 任务类型的公开取消接口，补齐 #13746 F1 最后一块 |
| 3 | [#13986](https://github.com/QwenLM/qwen-code/pull/13986) | 重启后恢复 held-Runtime 的 drain 义务，防止后台 Shell/Monitor 泄漏 |
| 4 | [#13918](https://github.com/QwenLM/qwen-code/pull/13918) | 隔离租户级 InnoDB 锁，防止 `recovery_blocked` Session 拖垮同 daemon 上其他 Session |
| 5 | [#14078](https://github.com/QwenLM/qwen-code/pull/14078) | takeover 时结算仅写 journal 的 parked Turn，修复 Harness 死亡后的任务卡停 |
| 6 | [#13188](https://github.com/QwenLM/qwen-code/pull/13188) / [#13314](https://github.com/QwenLM/qwen-code/pull/13314) | 两枚大型 takeover 修复：Hosted Turn 接管（#13083）与 Java Hosted Harness 客户端（#12654）评审 Critical 项落地 |
| 7 | [#14058](https://github.com/QwenLM/qwen-code/pull/14058) | 子 Workspace merge 删除未提交父内容时正确报告为冲突（#13905 项 1/21） |
| 8 | [#14109](https://github.com/QwenLM/qwen-code/pull/14109) | EventTransport 故障行接入真实 RocketMQ 5.5.1 集群跑测（MQ2d 路线） |
| 9 | [#14073](https://github.com/QwenLM/qwen-code/pull/14073) | `/auth` 新增 **QwenCloud** 首位登录入口，与 ModelStudio 并存不迁移 |
| 10 | [#14061](https://github.com/QwenLM/qwen-code/pull/14061) / [#14108](https://github.com/QwenLM/qwen-code/pull/14108) | 集成测试稳定性批次：member command IT 超时校准、shell lifecycle 恢复断言修复 |

其他值得留意：[#14057](https://github.com/QwenLM/qwen-code/pull/14057)（team-plan 超限拒绝信息带上具体尺寸）、[#12585](https://github.com/QwenLM/qwen-code/pull/12585)（ACP embedded text resource 持久化重放，接近合入）。

---

## 5. 功能需求趋势

1. **Managed Agent / 多智能体运行时（绝对主导）**：近半数活动围绕 Hosted Harness 的接管、恢复、租户隔离、后台 Shell/Monitor 生命周期，项目正按 H3→H4e→H4f→MQ2d 的路线图密集推进。
2. **自托管推理兼容性**：vLLM、SGLang、TheHive 等 OpenAI 兼容后端的序列化差异与错误识别是本周新增痛点集群。
3. **长上下文与 token 管理**：上下文溢出识别、反应式压缩、工具加载开销 A/B 评估（#12333/#14065）持续有结论产出。
4. **MCP 生态集成**：工具发现（ACP 模式缺陷）、stdio 长任务取消安全（#11272）、Web Search MCP 服务列表扩充（#13092）。
5. **桌面端 / Web Shell 体验**：文件拖拽（#14049）、品牌 logo 更新（#14038）、UI 渲染细节。

---

## 6. 开发者关注点

- **可观测性不足是高频抱怨**：无 body 的 400 错误不透出 request-id、SGLang/vLLM 错误措辞不被识别——错误诊断链路（#14115/#14096/#14097）成为自托管用户第一痛点。
- **崩溃恢复语义复杂**：多枚 P1/P2 均指向“Harness 死亡后已提交状态的去向”（#14116/#14047/#14070/#13838），反映托管运行时的持久化与恢复边界仍在收敛。
- **构建体验**：ink@7.0.3 API 不匹配导致源码构建失败（#14110），主分支 CI 失败（#12714，146 个失败测试）长期未解。
- **安全与权限**：shell 权限分析器评审遗留 12 项后续（#14095），多操作数 `cd` 等边界正确性问题在跟踪中。
- **A/B 评估驱动决策**：#12333 的 arm B 失败样本（#14065）为默认工具可见性/`tool_search` 设计提供了具体反例，社区以证据而非直觉推进上下文性能优化。

---
*数据来源：github.com/QwenLM/qwen-code 过去 24 小时 Releases / Issues / PRs（50+50 条快照）*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*