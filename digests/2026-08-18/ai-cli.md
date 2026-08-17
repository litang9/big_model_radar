# AI CLI 工具社区动态日报 2026-08-18

> 生成时间: 2026-08-17 20:41 UTC | 覆盖工具: 7 个

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

**数据来源**：github.com/anthropics/skills · 数据截止 2026-08-18
**说明**：本轮 PR 数据中评论数字段缺失，排行综合关联 Issue 讨论量、👍 数、更新活跃度与议题重要性推断；所示 20 条 PR 截至数据截点均为 **OPEN** 状态。

---

## 一、热门 Skills 排行（PR）

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **skill-creator 评估链修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 `run_eval.py` 恒报 0% recall 的核心缺陷（对应 Issue [#556](https://github.com/anthropics/skills/issues/556)：12 评论、7 👍、10+ 独立复现），同时修复 Windows 流读取、触发检测与并行 worker。热点：描述优化循环实际在“对噪音优化”，是 skill 工具链最痛的 bug | OPEN |
| 2 | **document-typography** [#514](https://github.com/anthropics/skills/pull/514) | AI 生成文档的排版质控（孤字换行、寡段、编号错位）。热点：用户几乎不会主动要求“好排版”，但问题影响每一份输出——典型隐性刚需 skill | OPEN |
| 3 | **frontend-design 增强** [#210](https://github.com/anthropics/skills/pull/210) | 重写指令使其在单次会话内可实际执行，提升清晰度与内部一致性。热点：skill 文本“可执行性”的方法论讨论 | OPEN |
| 4 | **self-audit（v1.3.0）** [#1367](https://github.com/anthropics/skills/pull/1367) | 交付前自审计：先机械验证产出文件存在，再按损害严重度做四维推理审查。与作者提案 [#1385](https://github.com/anthropics/skills/issues/1385)（三段式质量门管线）联动，是“AI 自检”方向的代表 | OPEN |
| 5 | **skill-quality / security-analyzer** [#83](https://github.com/anthropics/skills/pull/83) | 两个 meta-skill：五维度 skill 质量分析 + 安全分析。与最热 Issue [#492](https://github.com/anthropics/skills/issues/492)（命名空间安全，43 评论）形成呼应 | OPEN |
| 6 | **ODT skill** [#486](https://github.com/anthropics/skills/pull/486) | OpenDocument 的创建、模板填充与转 HTML，补齐 docx/pdf 之外的开源标准格式生态 | OPEN |
| 7 | **ServiceNow 平台 skill** [#568](https://github.com/anthropics/skills/pull/568) | 覆盖 ITSM/ITOM/SecOps/CSDM/IntegrationHub 的全平台助手，持续更新至 8 月，是企业级集成 PR 中存活最久、最活跃的一个 | OPEN |
| 8 | **testing-patterns** [#723](https://github.com/anthropics/skills/pull/723) | 完整测试栈指导：Testing Trophy 模型、AAA 模式、React Testing Library 等，填补官方测试类 skill 空白 | OPEN |

---

## 二、社区需求趋势（从 Issues 提炼）

1. **信任与安全治理**（最热）— [#492](https://github.com/anthropics/skills/issues/492)（43 评论）：社区 skill 冒用 `anthropic/` 命名空间伪装官方，用户可能在虚假信任下授予高权限。社区强烈呼唤签名/校验/命名空间治理机制。
2. **企业级分发与管理** — [#228

---



</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>



</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-08-18** | 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 一、今日速览

过去 24 小时社区活跃度集中于**子代理可靠性**与**安全加固**两条主线：修复“子代理虚假成功上报"的 P1 级 Issue [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) 已有对应修复 PR 关闭，同时一条防范 **eval 工作流供应链 RCE** 的安全 PR（[#28740](https://github.com/google-gemini/gemini-cli/pull/28740)）引发关注。值得注意的是，仓库出现了大批 `[SSR Agent]` 前缀的自动化修复 PR，表明团队正在用 AI Agent 规模化消化 Issue 积压，这本身也是 CLI 能力的一次实战展示。Nightly 版本照常发布，包含一个 SSR 相关构建修复。

---

## 二、版本发布

**v0.56.0-nightly.20260817.g9a15c45fb**（[Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260816.g2a87e7be1...v0.56.0-nightly.20260817.g9a15c45fb)）

- [[SSR Agent] Issue Fix (21911): Add composite flag to packages/cli tsconfig](https://github.com/google-gemini/gemini-cli/pull/28813)：为 `packages/cli` 的 tsconfig 添加 `composite` 标志，修复 SSR Agent 构建问题。

> 本版本为例行 nightly，无面向用户的功能变更，主要为内部工程修复。

---

## 三、社区热点 Issues

**1. [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — 子代理撞 MAX_TURNS 后谎报 "GOAL success"**（P1 · 12 评论）
最热 Issue。`codebase_investigator` 触发最大轮次限制后仍上报 `success`/`GOAL`，掩盖了真实中断原因。状态误报直接破坏上层任务编排的决策依据，修复 PR [#28815](https://github.com/google-gemini/gemini-cli/pull/28815) 已关闭，待验证发布。

**2. [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist 代理无限挂起**（P1 · 8 评论 · 8 👍）
用户报告 CLI 移交给 generalist 代理后永久卡死，连“创建文件夹”这类简单操作也会挂起超过一小时，唯一规避方式是明令禁止子代理。高 👍 数说明影响面广，且与多个 hang 类 Issue 存在关联。

**3. [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 命令执行完毕后卡在 "Waiting input"**（P1 · 3 👍）
命令已结束后仍显示 "Awaiting user input"，对极简单的非交互命令同样复现。这是影响日常使用流畅度的高频痛点，社区持续追问修复进展。

**4. [#22093](https://github.com/google-gemini/gemini-cli/issues/22093) — v0.33.0 起子代理无视禁用配置运行**（P2）
用户在所有配置中禁用了 Agents 模式，子代理仍被自动调用，涉及**权限边界失控**，安全敏感度高于一般 bug。

**5. [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖 OS 沙箱 + 执行后意图路由**（P2 · 8 评论 · Enhancement）
高质量提案：Gemini 3 原生偏好 POSIX 工具链，建议通过 OS 级沙箱放行 bash 亲和性，再对执行结果做意图路由，兼顾能力释放与安全。讨论活跃，代表架构层面的重要探索方向。

**6. [#24353](https://github.com/google-gemini/gemini-cli/issues/24353) — 组件级评测体系（EPIC）**（P1 · 7 评论）
继行为评测引入后的延续规划：已生成 76 个行为评测用例并覆盖 6 个受支持的 Gemini 模型，正在推进组件粒度评测。是 CLI 质量工程的基石性工作。

**7. [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — 评估 AST 感知的文件读取/搜索/映射**（P2 · 7 评论）
调研用 AST 感知工具精确读取方法边界，减少错位读取导致的轮次浪费和 token 噪音，可能重构 `codebase_investigator` 的底层能力。

**8. [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) — Auto Memory 无限重试低价值会话**（P2 · 5 评论）
提取代理若判定会话“低信号”而不读取，该会话永远保持未处理状态并被反复曝光，形成死循环。Auto Memory 系列问题（见 [#26516](https://github.com/google-gemini/gemini-cli/issues/26516)）集中爆发，是新功能成熟度不足的信号。

**9. [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Auto Memory 缺乏确定性脱敏**（P2 · area/security）
当前脱敏依赖模型在上下文中事后处理，敏感内容已先进入模型上下文，且服务端可能记录既有技能内容。**隐私设计缺陷**，需改为确定性前置脱敏。

**10. [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini 几乎不主动使用 Skills 和子代理**（P2 · 6 评论）
用户配置了 gradle/git 技能后，模型仅在显式指令下才调用。反映了"能力存在但调度策略保守”的核心体验问题，是提升代理自主性的关键反馈。

---

## 四、重要 PR 进展

**1. [#28815](https://github.com/google-gemini/gemini-cli/pull/28815) ✅已关闭 — 保留子代理恢复时的原始终止原因**（P1）
修复 Issue #22323：子代理在宽限恢复轮调用 `complete_task` 时不再覆盖真实的 MAX_TURNS/TIMEOUT 终止原因，状态上报回归真实。

**2. [#28812](https://github.com/google-gemini/gemini-cli/pull/28812) ✅已关闭 — 添加执行超时防止 TUI 无限挂起**（P1）
裸 Linux 终端下 TUI 卡死在 "Initializing..." 的问题（#21477）通过为 `getProcessInfo()` 等调用加超时解决。

**3. [#28740](https://github.com/google-gemini/gemini-cli/pull/28740) 🔄开放 — 防范 eval-pr 工作流供应链 RCE**（area/security）
修复不可信 fork 代码可在特权 `pull_request_target` 上下文执行的严重漏洞（#28336），将 eval 工作流拆分为安全的 pull_request 构建步骤与可信的 workflow_run 执行步骤。**今日安全优先级最高的 PR**。

**4. [#28744](https://github.com/google-gemini/gem

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>



</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期**：2026-08-18 ｜ **数据来源**：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

## 一、今日速览

今日仓库整体活跃度处于低位：过去 24 小时无新版本发布、无 Issue 动态，仅有 1 条 PR 更新。社区贡献者 @stebbins 于今年 2 月提交的 `--starting-prompt` 功能 PR（[#864](https://github.com/MoonshotAI/kimi-cli/pull/864)）在昨日（8 月 17 日）状态变更为已关闭，该 PR 旨在支持通过命令行标志在启动时直接注入初始提示词，是社区对 CLI 自动化/脚本化能力的典型需求。

---

## 二、版本发布

过去 24 小时无新版本发布。（按约定省略本节）

---

## 三、社区热点 Issues

过去 24 小时内无 Issue 新建或更新，本日无热点可评。

以下为今日唯一动态 PR 所关联的历史 Issue，供追踪参考：

- [#887](https://github.com/MoonshotAI/kimi-cli/issues/887) — PR #864 声明 `closes` 的需求 Issue，即 `--starting-prompt` 功能的原始需求来源。该功能的落地状态（随 PR 关闭而实现，或需求仍未满足）建议关注此 Issue 的后续状态。
- [#785（相关评论）](https://github.com/MoonshotAI/kimi-cli/issues/785#issuecomment-3837789973) — 与该主题存在关联讨论的 Issue，反映了社区对启动时注入提示词这一话题的持续关注。

> ⚠️ 说明：以上 Issue 内容信息来自 PR 描述引用，本日数据中未包含其正文与评论详情。

---

## 四、重要 PR 进展

过去 24 小时仅 1 条 PR 动态：

### [#864](https://github.com/MoonshotAI/kimi-cli/pull/864) `feat: --starting-prompt flag to prompt without exit` — 已关闭（CLOSED）

- **作者**：@stebbins ｜ **创建**：2026-02-02 ｜ **最后更新**：2026-08-17
- **内容**：新增 `--starting-prompt` / `-s` 启动标志，允许用户在启动 CLI 时直接传入初始提示词并执行（从标题"without exit"推断执行后保持会话），主要面向非交互式调用与脚本化工作流。
- **关联**：声明关闭 [#887](https://github.com/MoonshotAI/kimi-cli/issues/887)，并在 [#785 的讨论](https://github.com/MoonshotAI/kimi-cli/issues/785#issuecomment-3837789973)中有延伸讨论。
- **分析**：该 PR 从提交到关闭历时约 6 个半月。状态标签为 CLOSED（非 MERGED），需进一步确认是被合入主线还是被关闭拒绝；若为后者，[#887](https://github.com/MoonshotAI/kimi-cli/issues/887) 中的需求可能仍处于开放状态，建议持续关注。

---

## 五、功能需求趋势

受限于本日样本量（0 条 Issue），无法进行可靠的趋势统计。仅从现有线索归纳一个方向供参考：

- **CLI 自动化与脚本化集成**：`--starting-prompt` 这类“启动即执行”的能力是典型的无人值守/管道式调用需求（如 CI 任务、批处理脚本、与其他工具链编排）。围绕 [#785](https://github.com/MoonshotAI/kimi-cli/issues/785) 的关联讨论也表明该方向存在多次社区提及，可作为中期观察点。

> 建议结合近 7-30 天的 Issue 数据窗口再做趋势判断，单日数据不具统计意义。

---

## 六、开发者关注点

从本日有限数据中可提炼两点：

1. **启动时注入提示词的工作流**：开发者希望在拉起 CLI 时直接下发任务提示（`-s` 标志），而非进入交互界面后再输入，常见于自动化脚本与任务编排场景，是当前可观察到的明确诉求。
2. **社区贡献的评审周期**：PR #864 从 2026-02-02 创建到 2026-08-17 关闭，周期超过半年。较长的外部贡献处理周期可能影响社区贡献者积极性，值得维护团队关注评审吞吐效率。

---

**数据说明**：本日报基于过去 24 小时的增量数据生成（1 条 PR、0 条 Issue、0 条 Release），当日信息量较小，涉及趋势与结论的部分请谨慎采信。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报

**日期**：2026-08-18 ｜ **数据来源**：[anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 一、今日速览

过去 24 小时无新版本发布。社区焦点集中在两条主线：**传统推理端点（`https://opencode.ai/inference/v1`）正式退役引发大量 410 Gone 错误反馈**，波及多个第三方 CLI 用户；同时 **Windows 平台兼容性问题持续高发**（ARM64 TUI 初始化、路径权限、ripgrep 提取等）。开发侧，MCP 增强、Gemini 适配修复和 WebSocket 大请求回退等多个 PR 取得进展。

---

## 二、社区热点 Issues

**1. [#19130](https://github.com/anomalyco/opencode/issues/19130) — Windows ARM64 原生二进制 TUI 初始化失败**（18 评论 / 12 👍）
3 月提出至今仍未解决的老问题。非交互命令正常但 TUI 无法启动，涉及 bun:ffi dlopen TinyCC 错误。Windows on Arm 用户的核心阻塞项，社区讨论热度全天最高。

**2. [#43105](https://github.com/anomalyco/opencode/issues/43105) — 传统推理端点退役引发 410 Gone**（15 评论，已关闭）
`https://opencode.ai/inference/v1` 返回 "Legacy inference endpoint retired"，影响所有硬编码旧端点的第三方 CLI。官方已确认 2.0 Beta 不受影响，但迁移沟通明显不足，同日出现多个重复反馈（[#43101](https://github.com/anomalyco/opencode/issues/43101)）。

**3. [#40243](https://github.com/anomalyco/opencode/issues/40243) — EU 数据驻留工作区 OAuth 拒绝 GPT-5.6 模型**（9 评论，已关闭）
启用了 EU 数据驻留的 OpenAI 工作区在 OpenCode 中无法使用 GPT-5.6，而官方 Codex CLI 正常。涉及 EU 合规路由问题，已修复关闭。

**4. [#42995](https://github.com/anomalyco/opencode/issues/42995) — 配额显示异常：消费 $3.02 却提示 $12/5 小时配额用尽**（4 评论 / 3 👍）
实际扣费与配额进度严重不符，计费透明度问题的典型样本，与下方 #43032 同属一类。

**5. [#43032](https://github.com/anomalyco/opencode/issues/43032) — Go 订阅月度用量百分比与实际消费不一致**（5 评论 / 2 👍）
订阅 24 小时内消费 $5.70，但月度百分比与周度百分比、实际支出三方对不上账，暴露出用量统计口径问题。

**6. [#40623](https://github.com/anomalyco/opencode/issues/40623) — Windows grep 工具失效：MSIX PowerShell 7 破坏 ripgrep 解压**（3 评论）
双重 bug：Microsoft Store 版 PowerShell 的 PSModulePath 导致 ripgrep 解压失败，且失败结果被缓存直到重启。影响 Windows 用户基础搜索能力。

**7. [#42451](https://github.com/anomalyco/opencode/issues/42451) — 旧版插件加载器未校验返回值导致启动崩溃**（3 评论）
`getLegacyPlugins` 将插件导出的所有函数返回值无差别推入 hooks 数组，导出辅助函数的插件会破坏加载流程。插件生态健壮性的重要隐患。

**8. [#43054](https://github.com/anomalyco/opencode/issues/43054) — 多模型返回 Forbidden: big-pickle**（3 评论 / 1 👍）
除 `hy3-free` 和 `deepseek flash free` 外所有模型请求失败，错误体引用未知模型名，疑似服务端路由/鉴权配置问题。

**9. [#36681](https://github.com/anomalyco/opencode/issues/36681) — Windows 外部目录路径权限配置失效**（7 评论）
`external_directory` 权限配置在 Windows 路径格式下不生效，且官方文档完全缺失 Windows 路径说明。配套问题 [#36696](https://github.com/anomalyco/opencode/issues/36696)（Cmdlet 权限失效）仍在处理中。

**10. [#36731](https://github.com/anomalyco/opencode/issues/36731) — Desktop "New Workspace" 会话永久挂起**（2 评论）
新版布局中 `worktree.ready` 监听

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>



</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*