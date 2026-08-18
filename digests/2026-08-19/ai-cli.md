# AI CLI 工具社区动态日报 2026-08-19

> 生成时间: 2026-08-18 20:38 UTC | 覆盖工具: 7 个

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



---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据截止：2026-08-19 | 来源：anthropics/skills**
> 说明：本期 PR 评论数缺失，关注度评估综合关联 Issue 热度、更新活跃度、作者背景与生态影响。所列 PR 当前均为 OPEN 状态。

---

## 一、热门 Skills 排行（PR Top 8）

**1. skill-creator 评估链修复（run_eval.py recall=0%）** — [PR #1298](https://github.com/anthropics/skills/pull/1298)｜OPEN
修复评估脚本对任何描述都报 `recall=0%` 的核心缺陷，将 eval artifact 安装为真实 skill，并修复 Windows 流读取与并行 worker。关联 [Issue #556](https://github.com/anthropics/skills/issues/556)（12 条评论、10+ 独立复现）——意味着描述自动优化循环

---



</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# 📰 OpenAI Codex 社区动态日报

**日期：2026-08-19** ｜ 数据来源：[github.com/openai/codex](https://github.com/openai/codex) ｜ 统计窗口：过去 24 小时

---

## 一、今日速览

今日最突出的社区动态是 **Windows 桌面端 26.814 版本爆发浏览器插件 "Trusted RPC dependency" 初始化失败**，[#39136](https://github.com/openai/codex/issues/39136) 单帖 58 条评论，且 #39173、#39212、#39236、#39252 等多个同类 Issue 相继出现，确认为新版本回归。其次，**Windows 端会话归档集中失败**（#39150/#39270/#39275），官方已合并修复 PR #39256。开发侧发布 **rust-v0.148.0-alpha.22**，并密集合入一批安全与网络层改动，其中 Guardian v2 安全审查体系成为今日 PR 主线。

---

## 二、版本发布

- **[rust-v0.148.0-alpha.22](https://github.com/openai/codex/releases)**：Alpha 预发布版本，Changelog 仅标注版本号。据 [#39268](https://github.com/openai/codex/issues/39268) 报告，TUI 代码已处于该版本 + 后续提交水平，说明 0.148 分支正在活跃开发中。

---

## 三、社区热点 Issues

**🔴 1. Windows 内置浏览器插件初始化失败：Trusted RPC 依赖不在受信任代码路径** — [#39136](https://github.com/openai/codex/issues/39136)
今日最热 Issue（58 评论 / 16 👍）。26.814.41407 版本上浏览器插件启动即报 `Trusted RPC dependency must resolve within a configured trusted code path`，导致应用内浏览器完全不可用。同类报告 [#39173](https://github.com/openai/codex/issues/39173)（18 评论）、[#39212](https://github.com/openai/codex/issues/39212)、[#39252](https://github.com/openai/codex/issues/39252) 均指向同一根因，影响面大。

**🔴 2. Chrome 修复流程无法重建受信任 RPC 配置** — [#39236](https://github.com/openai/codex/issues/39236)
官方文档的 Chrome 修复流程（卸载重装插件/扩展）无法恢复浏览器控制，且插件卸载本身报错 `Failed to uninstall plugin`。说明信任配置损坏后用户侧无自助恢复手段，与 #39136 构成完整问题链。

**🔴 3. 桌面端反复生成 Computer Use worker 并 V8 OOM 崩溃** — [#38455](https://github.com/openai/codex/issues/38455)
macOS 26.810.41047 版本空闲 98 秒即触发，崩溃时 316 个线程中 187 个为 computer-use worker，最终 SIGABRT。上一版本正常，属明确回归（25 评论 / 11 👍），资源泄漏类问题对可用性影响严重。

**🔴 4. macOS 桌面端无法恢复 Remote Control / CLI 线程** — [#37403](https://github.com/openai/codex/issues/37403)
8 月 7 日更新后，移动端 Remote Control 与桌面端交替使用同一线程时报 `already has an active writer`（24 评论 / 18 👍，👍 数很高说明受影响用户多）。这是"手机接力电脑"核心工作流的中断。

**🟠 5. WSL 下有效仓库被误判为非 Git，提示 "Git is unavailable"** — [#35119](https://github.com/openai/codex/issues/35119)
26.721.3404 起 WSL2 ext4 仓库被标记为 non-Git，Git 集成全部失效（22 评论 / 17 👍），长期未修复，Windows/WSL 用户痛点集中体现。

**🟠 6. 定时任务成功运行后未经授权自行禁用** — [#38350](https://github.com/openai/codex/issues/38350)
Web 端 Recurring Scheduled Tasks 在调度运行后

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>



</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-08-19 | 数据来源：github.com/github/copilot-cli**

---

## 1. 今日速览

Copilot CLI 发布 **v1.0.81-1**，新增 Gemini 3.7 Flash 模型支持与按 Agent 的用量指标输出。社区热点集中在两条主线：**组织策略启用的模型（Claude Sonnet 5 / Opus 5、Kimi K3）在 CLI 中缺失**引发最多讨论（10 条评论），以及 **1.0.80 引入的 MCP OAuth RFC 8414 兼容性回归**。过去 24 小时无有效 PR 进展，唯一活跃 PR 疑似与项目无关。

---

## 2. 版本发布

### [v1.0.81-1](https://github.com/github/copilot-cli/releases)

**Added**
- 新增 **Gemini 3.7 Flash** 模型支持
- `/sandbox` 中支持 **Ctrl+E** 快捷键，直接在编辑器中打开 `settings.json`
- `--usage-output-file` 的 JSON 输出新增 **按 Agent 维度的用量指标**

**Improved**
- Schedule Manager 中可用 `x` 键删除 `/every` 与 `/after` 定时提示

**Fixed**
- 修复关闭 allow-all 后的相关问题（发布说明原文截断）

> 💡 分析：per-agent 用量指标或与近期 [#4511](https://github.com/github/copilot-cli/issues/4511)（会话 AIC 统计不准确）反映的观测性痛点直接相关；Gemini 3.7 Flash 的加入延续了快速跟进新模型的节奏。

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 状态 | 热度 | 关注理由 |
|---|-------|------|------|----------|
| 1 | [#4390 组织启用的模型缺失于目录](https://github.com/github/copilot-cli/issues/4390) | OPEN | 💬10 👍7 | 企业 Copilot Business 组织显式启用的 Claude Sonnet 5 / Opus 5 及 Kimi K3 无法在 CLI 中使用，策略配置与实际目录不一致，直接影响企业用户核心工作流，是本周讨论最多的 Issue |
| 2 | [#4490 Atlassian MCP OAuth 在 1.0.80 中损坏](https://github.com/github/copilot-cli/issues/4490) | OPEN | 💬3 | RFC 8414 §3.3 issuer 校验回归，1.0.78 正常、1.0.80 失败。与刚关闭的 [#4439](https://github.com/github/copilot-cli/issues/4439)（GitLab 同类问题）形成对照——修复引入新问题，OAuth 兼容性成为高频故障区 |
| 3 | [#2904 自定义 Agent 应支持按 Agent 配置 reasoning effort](https://github.com/github/copilot-cli/issues/2904) | OPEN | 💬7 👍20 | **本周最高赞功能请求**。`.agent.md` 已支持 `model` 字段，但推理力度仍只能全局设置，深度定制 Agent 的用户强烈需要 |
| 4 | [#4313 支持会话内滚动查看历史](https://github.com/github/copilot-cli/issues/4313) | OPEN | 💬8 | 鼠标滚轮 / PageUp 在 CLI 中无法浏览当前会话历史内容，长会话场景下体验痛点明显 |
| 5 | [#4211 MCP 响应含 BigInt 导致序列化崩溃](https://github.com/github/copilot-cli/issues/4211) | OPEN | 💬4 👍2 | MCP 服务器返回大数值时抛出 `TypeError: Do not know how to serialize a BigInt`，**中断所有进行中任务**，属高破坏性 Bug |
| 6 | [#4392 启动时 MCP 重建遗留孤儿 stdio 进程](https://github.com/github/copilot-cli/issues/4392) | OPEN | 💬2 | 认证完成后整体重建 MCP 客户端，但第一代 stdio 子进程未被回收，每次启动泄漏一批进程 |
| 7 | [#3698 stdio MCP 连接泄漏致进程无限累积](https://github.com/github/copilot-cli/issues/3698) | OPEN | 👍3 | 服务器响应慢或上游不可达时反复重生子进程且不回收，最终耗尽 CPU——与 #4392 共同指向 **MCP 进程生命周期管理** 的系统性缺陷 |
| 8 | [#4519 1.0.80 延迟搜索工具报 400 Missing namespace](https://github.com/github/copilot-cli/issues/4519) | OPEN | 💬1 | 昨日新报：通过 deferred tool search 发现的工具（如 `extensions_manage`）间歇性触发 `CAPIError: 400`，疑似 1.0.80 新引入 |
| 9 | [#3682 BYOK 凭证支持免重启刷新](https://github.com/github/copilot-cli/issues/3682) | OPEN | 💬2 👍6 | 短时效凭证（Entra ID / STS / OIDC JWT）目前需重启 CLI 才能刷新，企业 BYOK 场景的硬伤 |
| 10 | [#4438 `disable-model-invocation: true` 导致技能完全不可达](https://github.com/github/copilot-cli/issues/4438) | OPEN | 💬2 👍2 | 该语义应为“仅手动调用”，实际却令 `skill()` 工具直接报 `Skill not found`，技能发布者无法控制模型自动触发 |

**已关闭值得关注**：[#4439](https://github.com/github/copilot-cli/issues/4439)（GitLab MCP OAuth issuer 校验）、[#4096](https://github.com/github/copilot-cli/issues/4096)（OAuth token 未桥接至会话）、[#4206](https://github.com/github/copilot-cli/issues/4206)（环境页脚卡在 Loading）、[#3162](https://github.com/github/copilot-cli/issues/3162)（注册表 MCP 服务器被误报策略阻断）——MCP 相关修复正在密集落地，但 #4490 表明回归风险犹存。

---

## 4. 重要 PR 进展

过去 24 小时仅 1 个 PR 更新：[#3163 "ViewSonic monitor"](https://github.com/github/copilot-cli/pull/3163)（OPEN）。该 PR 描述为 "monitor for #2591, #3561, #3559"，内容与本项目明显无关，**疑似误提交或垃圾 PR**。

**结论：本日无实质性 PR 进展可报告。** 项目当前活跃度集中在 Releases 与 Issues 渠道，建议持续关注官方发布节奏而非社区 PR。

---

## 5. 功能需求趋势

1. **MCP 生态稳定性与兼容性（最大集群）**：OAuth RFC 8414 兼容（#4490/#4439）、子进程生命周期（#4392/#3698）、BigInt 序列化（#4211）、`content` vs `structuredContent` 处理（[#4515](https://github.com/github/copilot-cli/issues/4515)）——MCP 已是 Bug 与需求的第一来源
2. **模型配置灵活性**：按 Agent 设置 reasoning effort（#2904）、组织模型目录一致性（#4390）、BYOK 凭证热刷新（#3682）、ACP 暴露 `contextTier`（[#4275](https://github.com/github/copilot-cli/issues/4275)）、新模型快速接入
3. **会话与终端体验**：会话历史滚动（#4313）、`/rename` 持久化（[#2622](https://github.com/github/copilot-cli/issues/2622)）、AGENTS.md 热重载（[#812](https://github.com/github/copilot-cli/issues/812)）、用量统计准确性（#4511）
4. **Agent / Skill 深度定制**：内置 Agent �

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期**： 2026-08-19 ｜ **数据来源**： [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

> ⚠️ 数据说明：过去 24 小时窗口内仅 2 条 Issue、2 条 PR 更新，0 个 Release。以下第 3、4 部分已全量列出实际条目，未凑足模板要求的 10 条，亦未做任何虚构补充。

---

## 一、今日速览

今日仓库整体活跃度偏低：无新版本发布，新增/更新 Issue 2 条、PR 更新 2 条。两条核心动态分别是：Web UI 在第三方 OpenAI 兼容供应商下会话重挂载后消息逐行碎裂渲染的 bug（[#2607](https://github.com/MoonshotAI/kimi-cli/issues/2607)），以及一位量化领域内容创作者开源的 K3 + Kimi Code 样本外策略生成完整基准报告（[#2608](https://github.com/MoonshotAI/kimi-cli/issues/2608)）。此外，新提交的 "knowledge plane" 特性 PR（[#2606](https://github.com/MoonshotAI/kimi-cli/pull/2606)）值得关注。

---

## 二、版本发布

过去 24 小时无新 Release，本节省略。

---

## 三、社区热点 Issues

### 1. [#2607](https://github.com/MoonshotAI/kimi-cli/issues/2607) Web UI：非 Kimi（OpenAI 兼容）供应商的助手消息在切换标签页/刷新后逐行碎片化重渲染

**作者**： @chenxupeng1990-eng ｜ 状态： OPEN ｜ 评论 1

**为什么重要**：该 bug 暴露了 Web UI 会话重挂载（remount）路径的健壮性问题——使用自定义 OpenAI 兼容供应商时，流式输出期间渲染正常，但浏览器标签切换、页面刷新或重新打开会话后，消息被按 stream delta 逐行重渲染，形成狭窄的竖向碎片。这直接命中了“通过自建网关/第三方模型端点使用 Kimi CLI”的用户群体，说明**多供应商兼容性是真实且活跃的使用场景**，消息持久化与重建（rehydration）逻辑需要对非 Kimi 供应商做同等回归测试。

**社区反应**：已有 1 条评论、暂无 👍，尚处 triage 阶段。由于该问题可能存在于消息历史重构的通用代码路径，建议维护者优先确认影响范围。

### 2. [#2608](https://github.com/MoonshotAI/kimi-cli/issues/2608) 样本外量化策略生成基准报告开源：K3 + Kimi Code 实测

**作者**： @frank-quant ｜ 状态： OPEN ｜ 评论 0

**为什么重要**：来自 Bilibili/YouTube 中文频道的独立评测。作者以 Kimi Code CLI 为主驱动，在 Freqtrade 框架上从零生成 ETH 永续合约策略（第一期视频，7 月 26 日发布），并在**样本外（out-of-sample）数据**上验证，完整报告已开源。这类第三方独立、可复现的基准测试，对 Kimi Code 在量化交易等垂直专业领域的可信度验证和社区传播价值很高。

**社区反应**：暂无评论。属于展示/分享类 issue，适合官方纳入 case studies 或转发扩散。

---

## 四、重要 PR 进展

### 1. [#2606](https://github.com/MoonshotAI/kimi-cli/pull/2606) Dev/knowledge plane ｜ OPEN

**内容**：社区贡献者 @SoMiReMiReDo 于今日提交，分支名指向为 Kimi CLI 引入“知识平面”（knowledge plane）——即知识管理层方向的能力（如持久化知识、跨会话上下文注入）。注意仓库 PR 模板明确要求**先在 issue 中与维护者达成一致**，否则 PR 可能被关闭或忽略，该 PR 能否进入正式评审流程有待观察。

**意义**：若被采纳，将是 Agent 长期记忆/知识库方向的重要能力补充，值得持续跟踪。

### 2. [#848](https://github.com/MoonshotAI/kimi-cli/pull/848) fix(kaos): 启用时记录 SSH 失败日志 ｜ CLOSED

**内容**：修复 kaos 模块在启用状态下记录 SSH 连接失败日志。该 PR 自 2026-02-02 提交后长期悬置（约 6 个半月），今日被关闭，曾挂载 Devin 自动评审徽章。数据中未见 merged 标记，更可能是**积压贡献的清理**或被其他实现取代。

**意义**：一方面提示 kaos 相关的可观测性需求（失败日志缺失）可能仍未完全解决；另一方面反映维护团队在处理长期未决的外部贡献。

---

## 五、功能需求趋势

基于本期信号（样本量有限，趋势判断仅供参考）：

1. **多供应商一等公民支持**：[#2607](https://github.com/MoonshotAI/kimi-cli/issues/2607) 证实相当数量用户通过 Open

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-08-19

> 数据来源：github.com/anomalyco/opencode（过去 24 小时）

---

## 一、今日速览

过去 24 小时无新版本发布。社区焦点高度集中在 **OpenCode Go 订阅的配额计量与计费一致性问题**——单日至少 5 条相关 Issue 持续活跃，多与 DeepSeek V4 Flash/Pro 的缓存计费口径有关。开发侧，核心团队推进**插件包管理 CLI**、**配置状态化重构**，两条修复 PR（web 搜索授权存储、会话请求头）已合入关闭；生态侧新增飞书集成、多智能体圆桌讨论、Obsidian Copilot 等项目。

---

## 二、社区热点 Issues

1. **[#6231](https://github.com/anomalyco/opencode/issues/6231) · OpenAI 兼容端点模型自动发现**（46 评论 / 212 👍）
   本期呼声最高的功能请求，自 2025-12 持续发酵至今。用户希望 LM Studio、Ollama、llama.cpp 等本地 provider 自动列出可用模型，免去在 `opencode.json` 中手工维护，社区追更热度不减。

2. **[#42985](https://github.com/anomalyco/opencode/issues/42985) · Go 配额消耗约为显示成本的 4 倍**
   用户报告 usage 图表显示 deepseek-v4-flash 仅消耗 $3.31，但 Go 配额掉速远超预期，15 条评论，是计费问题的代表案例。

3. **[#42935](https://github.com/anomalyco/opencode/issues/42935) · 缓存读取骤降为 0 后配额约 20 分钟耗尽**
   用户从 11% 用量到 100% 仅用时 20 分钟，Usage History 中 cache reads 清零，疑似缓存失效后转为全额计费。

4. **[#43023](https://github.com/anomalyco/opencode/issues/43023) · 月度使用百分比反超周度，成本统计错位**
   配额百分比逻辑疑似存在 bug：月度 24% < 周度 48%，

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-08-19

> 数据来源：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | 统计窗口：过去 24 小时

---

## 一、今日速览

今日发布 **v0.21.11-nightly**，引入 live-session registry 与 `qwen sessions ps` 命令，标志着跨会话协调（#8724 提案）开始正式落地。**多智能体 Agent Team** 成为最活跃的主题：一批团队协作语义缺陷（#9276、#9282、#9430）被集中报告并配套修复 PR（#9401）。同时，项目在 CI/评审自动化上持续重度投入，capture-tui 渲染取证（#9273）、评审断点续跑（#9092）等工程质量工具密集推进。

---

## 二、版本发布

**[v0.21.11-nightly.20260818.259951c53e](https://github.com/QwenLM/qwen-code/releases)**
- **feat(core)**: 新增 live-session registry 与 `qwen sessions ps` 命令（[PR #8969](https://github.com/QwenLM/qwen-code/pull/8969)），为运行中会话提供统一注册与查询入口
- **feat(daemon)**: skill 切换相关能力（release notes 截断，详见发布页）

**基准验证 Releases（共 5 个，Benchmark-Qwen-Ref: v0.21.13）**
- `dsw-eas-full-20260818-r1/r2`: SWE-bench Verified 500 全量验证，状态 **QUARANTINED**（隔离待审）
- `dsw-eas-full-20260818-r3`: 全量验证（SWE-bench 500 + Terminal-Bench 2.0 89）
- `dsw-eas-tb-smoke-r1/r2`: 沙箱瞬时恢复与凭证刷新的端到端冒烟验证

> 观察：nightly 主线发布与基准流水线验证已解耦，r1/r2 被隔离后快速迭代到 r3，验证回路的自动化程度很高。

---

## 三、社区热点 Issues（Top 10）

**1. [#656](https://github.com/QwenLM/qwen-code/issues/656) · API Error 400 InternalError.Algo.InvalidParameter（P1，OPEN）**
最老的高优 Issue（2025-09 创建，11 条评论）。所有请求均返回 400 且用户未改任何配置，指向服务端算法层问题。至今仍处于 `need-retesting` 状态，是可用性层面的长期痛点。

**2. [#8718](https://github.com/QwenLM/qwen-code/issues/8718) · RFC：多 Qwen 会话原生协调（CLOSED）**
leader 派发 2-3 个独立 worker、保持交互、聚合结构化结果的多会话协调 RFC 今日关闭——结合 nightly 的 session registry 发布，该方向已从设计转入实现阶段。

**3. [#7040](https://github.com/QwenLM/qwen-code/issues/7040) · RFC：可靠的自动记忆召回（OPEN）**
记忆系统核心 RFC 更新：PR 1（召回遥测）已合并，PR 2/3（首轮流界召回 + 精度与多语言评估）在审。设计在实测后修订过一次，工程化路径清晰。

**4. [#9276](https://github.com/QwenLM/qwen-code/issues/9276) · Team 成员无法向 leader 发送普通消息（P2，OPEN）**
成员的常规汇报被误判为 shutdown 请求而失败。与 PR #9401/#9429 直接相关，是今日 Agent Team 语义清理的导火索。

**5. [#8724](https://github.com/QwenLM/qwen-code/issues/8724) · 同机跨会话消息传递（OPEN）**
`list_agents` 发现 + `send_message` 寻址 + 接收端显式 fail-closed 门控的设计提案，随 nightly 的 `qwen sessions ps` 逐步成真。

**6. [#9194](https://github.com/QwenLM/qwen-code/issues/9194) · 补齐 PR #9096 的测试加固缺口（OPEN，11 条评论）**
评审第 5-6 轮暴露的共性测试问题：变异生产代码后测试套件仍绿。社区对测试鲁棒性的自我要求很高。

**7. [#8316](https://github.com/QwenLM/qwen-code/issues/8316) · Ctrl+C 取消后 prompt 未还原输入框（CLOSED）**
高频 UX 痛点：取消执行后内容丢失需重打。今日关闭，10 条评论反映普遍受影响。

**8. [#9278](https://github.com/QwenLM/qwen-code/issues/9278) · /review 发布时收敛建议设计（OPEN）**
中文撰写的设计文档，剖析"评审→修复→diff 变大→更多评审"的**失控回路**（增益 > 1），提出遥测、诊断与运营自有发布面方案。对理解项目评审自动化哲学非常关键。

**9. [#9282](https://github.com/QwenLM/qwen-code/issues/9282) · 手动任务分配持久化但不派发（CLOSED）**
leader 设置 `owner: alice` + `in_progress` 后，空闲的 alice 永远收不到任务提示——唯一派发路径只自动认领无主 `pending` 任务。已修复关闭。

**10. [#9430](https://github.com/QwenLM/qwen-code/issues/9430) · 命名队友静默忽略 run_in_background: false（OPEN）**
实测 0.21.10 下五个命名只读队友全部并发启动，前台标志无效。同作者还报了 [#9431](https://github.com/QwenLM/qwen-code/issues/9431)（list_agents 对活跃 teammates 返回歧义空结果），Agent Team 的工具语义仍在收敛期。

---

## 四、重要 PR 进展（Top 10）

**1. [#9401](https://github.com/QwenLM/qwen-code/pull/9401) · team shutdown 改为 leader-only 专用工具**
新增 `request_shutdown` 独立工具，彻底移除 `send_message` 的 `type` 枚举参数，从根上修复 #9276 一类控制语义混用问题。（同方向的 [#9429](https://github.com/QwenLM/qwen-code/pull/9429) 已关闭让路。）

**2. [#9421](https://github.com/Q

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*