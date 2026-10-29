# OpenClaw 生态日报 2026-10-29

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-28 23:59 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-29

## 1. 今日速览

OpenClaw 今日保持高度活跃：过去 24 小时内 Issues 更新 500 条（新开/活跃 404，关闭 96），PR 更新 500 条（待合并 282，已合并/关闭 218），无新版本发布。社区贡献热情旺盛，多位核心维护者（@steipete、@shakkernerd、@RomneyDa 等）今日集中提交了大量修复与性能优化 PR。但需警惕的是：多个 P0 级稳定性问题（内存泄漏、Gateway 事件循环阻塞、SQLite 状态竞争）长期挂起，标记 `clawsweeper:needs-maintainer-review` 却无对应 fix PR，Windows 平台可靠性问题持续积累。整体呈现“社区输入远超维护消化能力”的态势，积压问题有增长趋势。

## 2. 版本发布

过去 24 小时无新 Release。当前最新版本仍为稳定线 2026.10.x 与 beta 线 2026.10.10-beta.x。值得注意的是，多个已合并到 `main` 的修复（如 #164445 会话历史恢复，见 [#141474](https://github.com/openclaw/openclaw/issues/141474) 更新说明）尚未进入任何 tagged release（截至 v2026.10.8 / v2026.10.10-beta.4），下个版本可期。

## 3. 项目进展

今日 PR 活动集中在 Gateway 稳定性、Control UI 体验和安全性修复，主要亮点：

- **消息可靠性**：[#187083](https://github.com/openclaw/openclaw/pull/187083)（已关闭）修复 Gateway 强杀后排队消息永久 pending 的问题，启动时通过现有分类暴露这些消息——直接回应了长期 Telegram 消息丢失类反馈。
- **插件重载会话保护**：[#187095](https://github.com/openclaw/openclaw/pull/187095)（XL，security-sensitive）修复插件重载期间根会话 `sessions_send` 丢失问题，与 P0 级 Gateway 阻塞问题同源。
- **性能优化**：[#187093](https://github.com/openclaw/openclaw/pull/187093) 跳过冗余维护调度；[#187092](https://github.com/openclaw/openclaw/pull/187092)（已关闭）跳过草稿标题的无用技能发现，降低普通消息路径的 CPU 开销。
- **安全边界修复**：[#184509](https://github.com/openclaw/openclaw/pull/184509) 将会话聚合与审批查询限定在成员范围内，防止信息越权泄露，标记 🚨 security-boundary。
- **隐私边界**：[#186856](https://github.com/openclaw/openclaw/pull/186856)（P1）修复 Draft 会话委托产生 Shared helper 导致 guest 可读结果的隐私泄漏。
- **技能系统进化**：[#186861](https://github.com/openclaw/openclaw/pull/186861)（XL）为 Skill Workshop 增加"learned skills 减肥”机制——实测一个生产 agent 上 48 个习得技能中 46 个只增不减，此 PR 引入每日维护收缩。
- **Control UI 打磨**：Unicode NFC/NFD 搜索规范化系列（[#187036](https://github.com/openclaw/openclaw/pull/187036)、[#187050](https://github.com/openclaw/openclaw/pull/187050)）、New Session 项目列表加载失败提示（[#187062](https://github.com/openclaw/openclaw/pull/187062)，P0）、Worker 生命周期与遥测可视化（[#163995](https://github.com/openclaw/openclaw/pull/163995)，XL）。

今日合计 218 个 PR 合并/关闭，节奏健康；多个 PR 已处于 "👀 ready for maintainer look" 状态等待终审。

## 4. 社区热点

**最热 Issue：Gateway 插件捕获阻塞（62 条评论）**
[#160959](https://github.com/openclaw/openclaw/issues/160959)（P0）：自 2026.9.6 引入插件生成捕获（#144252）后，含大型外部插件的 Gateway 在启动及运行时重新发布时会阻塞事件循环数分钟。此问题与 [#162211](https://github.com/openclaw/openclaw/issues/162211)（启动阻塞 40–200s 引发重启循环，14 条评论）构成同一故障族，是当前用户最强烈的诉求。

**Windows 升级可靠性（47 条评论）**
[#183786](https://github.com/openclaw/openclaw/issues/183786)（已关闭）：Windows beta 升级在 npm staging 成功后仍反复查询已停止的 Gateway PID，挂起 15 分钟以上。叠加 [#170956](https://github.com/openclaw/openclaw/issues/170956)（Windows 重启/更新"试很多次才成功"）与 [#185819](https://github.com/openclaw/openclaw/issues/185819)（Codex 快速上手激活失败），Windows 用户群体 frustration 明显。

**记忆系统设计争论（21 + 10 条评论）**
[#150635](https://github.com/openclaw/openclaw/issues/150635)（短期召回夜间驱逐导致 dreaming deep 阶段永不晋升）与 [#121232](https://github.com/openclaw/openclaw/issues/121232)（ranker 与 applier 永久分歧，"Ranked N, Promoted 0"）暴露 memory-core dreaming 管线内部逻辑不一致，社区在等待产品决策（`needs-product-decision`）。

**记忆文件被静默剔除（13 条评论，security review 待定）**
[#153426](https://github.com/openclaw/openclaw/issues/153426)：`MEMORY.md`/`USER.md` 被 provenance ratchet 静默、永久地从 bootstrap 注入中剔除，无诊断、无恢复手段。作为个人 AI 助手的核心记忆功能，此问题引发对“记忆不可信”的担忧。

## 5. Bug 与稳定性（按严重度排列）

| 严重度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| P0 | [#159662](https://github.com/openclaw/openclaw/issues/159662) `prepared-model-catalog.worker.js` 无界内存泄漏（4-5 GB/h，与提供商无关，已冷启动+provider bisect 复现） | OPEN，无 fix PR | ❌ |
| P0 | [#160959](https://github.com/openclaw/openclaw/issues/160959) 大型外部插件捕获阻塞 Gateway 数分钟（2026.9.6 回归） | OPEN，needs-maintainer-review | ❌ |
| P0 | [#162211](https://github.com/openclaw/openclaw/issues/162211) 启动阻塞 40–200s → 健康监测误判 → 重启循环 | OPEN | ❌ |
| P0 | [#126821](https://github.com/openclaw/openclaw/issues/126821) SQLite 腐坏在全新重建 DB 上 15–24h 内复发，5 天 5 次，含"瘫痪但不退出"模式 | OPEN（8 月至今） | ❌ |
| P0 | [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 reclamation checkpoint 失败，agent 永久 UNAVAILABLE | OPEN，not-repro-on-main | ⚠️ 待确认 |
| P0 | [#181459](https://github.com/openclaw/openclaw/issues/181459) 3.5 GB agent DB 使启动成为赌博（4–6 分钟，checkpoint expired，embeddings 存 3 份） | OPEN | ❌ |
| P0 | [#185819](https://github.com/openclaw/openclaw/issues/185819) Windows Codex onboarding 激活失败 | OPEN，not-repro-on-main | ❌ |
| P1 | [#159094](https://github.com/openclaw/openclaw/issues/159094) state-lifecycle 租约自冲突（`StateDatabaseCoordinatorContentionError`） | OPEN | ❌ |
| P1 | [#177656](https://github.com/openclaw/openclaw/issues/177656) 原生 exec 返回 shared-state 完整性准入错误（2026.10.5，≥28 次失败） | OPEN | ❌ |
| P1 | [#126360](https://github.com/openclaw/openclaw/issues/126360) explicit 多 agent 所有权下 `AgentSelectionRequiredError` 刷爆日志 | OPEN | ❌ |
| P2 | [#164294](https://github.com/openclaw/openclaw/issues/164294) 状态 DB WAL checkpoint 被进程内 reader 钉住，自启动以来从未完成（17091 帧） | OPEN | ❌ |

**关键警示**：P0 问题几乎全部无修复 PR，且多个 P0/P1 标记 `not-repro-on-main`——即在 main 上无法复现但用户仍在 stable 版受影响，暗示修复可能依赖未发布的变更。稳定性核心矛盾集中在：**SQLite 状态管理（checkpoint/租约/大 DB）**、**事件循环阻塞**、**Windows 平台可靠性** 三条主线。

## 6. 功能请求与路线图信号

- **DREAMS 页面插件化**：[#138366](https://github.com/openclaw/openclaw/issues/138366) 请求让 memory slot 所有者驱动 Dreams 页（`dreaming` provider in `MemoryPluginCapability`）。配合 [#186861](https://github.com/openclaw/openclaw/pull/186861)（skills 减肥）落地，记忆/技能自维护正成为明确的开发方向。
- **Feishu 流式进度**：[#131457](https://github.com/openclaw/openclaw/issues/131457) 请求飞书接入与 Slack/Discord/Telegram 等一致的 `streaming.mode: "progress"`。已有 6 个渠道支持，实现路径清晰，纳入可能性高。
- **notifyOnExit 细粒度模式**：[#141973](https://github.com/openclaw/openclaw/issues/141973) 请求 `tools.exec.notifyOnExit` 支持 failure-only 模式，避免 SIGTERM-drain 噪音唤醒。
- **取消输入的 TTL/手动清除**：[#141295](https://github.com/openclaw/openclaw/issues/141295) 指出被中断的 pending inputs 无限期残留并污染模型上下文。
- **QQ 渠道前途**：[#150743](https://github.com/openclaw/openclaw/issues/150743) 社区追问腾讯交接停滞后的长期支持计划，属于生态健康信号，维护者需公开表态。
- **Windows CI 覆盖率危机**：[#126874](https://github.com/openclaw/openclaw/issues/126874) 指出 Windows CI 仅运行 10,979 个测试文件中的 66 个（0.6%），且 skipped gate 计为通过——这可能解释了 Windows 问题为何持续高发，修复它应进入路线图优先级前列。

## 7. 用户反馈摘要

- **大 DB / 长期运行用户最痛苦**：3.5 GB agent DB、8–10 GB 内存泄漏、WAL 17k 帧不 checkpoint——重度自托管用户是 P0 报告的主力，他们的核心诉求是“能长期跑而不需要每天重启”。
- **Windows 用户体验显著差于 macOS/Linux**：升级挂起、schtasks 权限错误、启动慢、更新“试很多次才成功”，是抱怨最集中的平台。
- **消息丢失类问题破坏信任**：Telegram 单次尝试即 dead-letter（[#125764](https://github.com/openclaw/openclaw/issues/125764)）、durable 发送卡在 `send_attempt_started`（[#126246](https://github.com/openclaw/openclaw/issues/126246)）、callback 静默丢弃（[#126950](https://github.com/openclaw/openclaw/issues/126950)）。用户强调"高价值消息静默丢失，无告警”不可接受——渠道可靠性的诉求强于新渠道接入。
- **成本敏感**：[#140129](https://github.com/openclaw/openclaw/issues/140129)（Anthropic 缓存每轮重建 ~380k tokens）、[#181459](https://github.com/openclaw/openclaw/issues/181459)（embeddings 存 3 份）反映用户对 token/存储浪费的持续不满。
- **正面信号**：#141474 报告者确认历史状态恢复已在 main 通过测试（虽未发版）；多个 issue 报告者提供了高质量复现、provider bisect 和量化数据（如 workboard `accepted=327 dropped=327`），社区质量高、愿意协作。

## 8. 待处理积压

**需维护者立即关注的长期无 fix PR 的 P0/P1：**
- [#159662](https://github.com/openclaw/openclaw/issues/159662)（P0 内存泄漏，9-27 提出，已 1 个月，27 条评论）
- [#160959](https://github.com/openclaw/openclaw/issues/160959)（P0 事件循环阻塞，62 条评论，全库最热）
- [#126821](https://github.com/openclaw/openclaw/issues/126821)（P0 SQLite 腐坏，8-20 提出，两个月无解）
- [#170956](https://github.com/openclaw/openclaw/issues/170956)（P0 Windows 发布阻塞级，needs-maintainer-review）
- [#125764](https://github.com/openclaw/openclaw/issues/125764)、[#126246](https://github.com/openclaw/openclaw/issues/126246)（P1 Telegram 消息丢失，8 月中旬至今）

**被关闭但未真正解决的 PR：**
- [#125897](https://github.com/openclaw/openclaw/issues/125314)（Codex 消息工具 schema 问题）PR 因不活跃于 10-15 被关闭，技术方案悬置，建议维护者明确处置。

**stale 化的高价值 issue**：[#120385](https://github.com/openclaw/openclaw/issues/120385)（cron/MCP 工具目录缺失）、[#150635](https://github.com/openclaw/openclaw/issues/150635)、[#121232](https://github.com/openclaw/openclaw/issues/121232)（dreaming 管线）均处于 stale + needs-product-decision 状态，产品决策缺位是积压的结构性原因。

**健康度小结**：输入管道（报告质量、复现深度）为 A 级；修复吞吐集中在 UI/中低危问题，P0 稳定性主线消化偏慢。建议维护者优先发布包含 main 上已合修复的版本，并针对 SQLite/事件循环两族问题设立专项。

---

## 横向生态对比

# 开源个人 AI 助手/智能体生态横向对比报告（2026-10-29）

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**高速扩张与架构重构并行**的阶段：两个头部项目日均 Issue/PR 活动均达数百条量级，社区输入远超维护消化能力成为普遍现象。核心矛盾已从“功能有无”转向**可靠性三主线**——长期运行稳定性（内存泄漏、SQLite/状态管理、事件循环阻塞）、消息投递可信度、以及 Windows 平台支持。同时，“记忆/技能自维护”（OpenClaw dreaming/skills 减肥、Hermes 文档链 RFC）正在成为下一代差异化方向，插件/MCP 生态开始吸引厂商主动入驻。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 404 / 关闭 96） | 362（新开/活跃 328 / 关闭 34） |
| PR 更新（24h） | 500（待合并 282 / 合并关闭 218） | 500（待合并 410 / 合并关闭 90） |
| Release | 无（stable 2026.10.x / beta 2026.10.10-beta.x） | 无（main 滚动，v0.22.x 后未发版） |
| Issue 关闭率 | ~19% | ~9% |
| PR 合并/关闭比 | ~44% | ~18% |
| 健康度评估 | 输入 A 级；修复吞吐偏 UI/中低危，P0 稳定性主线积压（7 项 P0 无 fix PR） | 大重构（统一网关）后消化期，回归问题集中但修复推进活跃；review 带宽是瓶颈 |

**判断**：OpenClaw 合并吞吐更健康；Hermes 待合并积压（410）与其关闭率（9%）显示其处于更激进的扩张/重构期。

## 3. OpenClaw 在生态中的定位

- **优势**：合并吞吐率约为 Hermes 的 2.4 倍；社区报告质量极高（provider bisect、量化复现数据）；P0 问题虽积压但 triage/标签体系（clawsweeper、needs-maintainer-review）完善，问题定位清晰；渠道生态广（Telegram/Slack/Discord/飞书等 6+ 渠道）。
- **技术路线差异**：OpenClaw 更强调**记忆系统作为产品核心**（dreaming 管线、learned skills、MEMORY.md provenance），并把 Gateway 作为多渠道消息中枢；Hermes 则刚完成“全表面（CLI/TUI/Desktop/API/cron/Kanban）共用单网关进程”的统一架构重构，主打多 profile/多 bot 场景与 Webapp 化。OpenClaw 的痛点是“长期跑不崩”，Hermes 的痛点是“重构回归收敛”。
- **社区规模对比**：两者活动量级相当（日均 500 条更新），OpenClaw 热点 issue 讨论深度更高（62/47 条评论级），Hermes 单 issue 讨论量更大（223 条的网关追踪 issue），反映其架构变更引发的社区震动更强。

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **网关生命周期可靠性** | 两者 | OpenClaw：事件循环阻塞/重启循环（#160959、#162211）；Hermes：respawn 风暴刹车（#146078/#146261）、网关宕机事件重入队（#146256）。单进程网关已成双方共同的可用性单点 |
| **Windows 平台支持** | 两者 | OpenClaw：升级挂起、CI 仅覆盖 0.6% 测试文件（#126874）；Hermes：WinError 5、最小化行为。Windows 是双方共同的二等公民 |
| **消息投递可信度** | 两者 | OpenClaw：Telegram dead-letter、callback 静默丢弃；Hermes：中途插话不可达（#141973）、cron 通知卡 FIFO（#143268）。“高价值消息静默丢失不可接受”是共同底线诉求 |
| **记忆/上下文持久化与溯源** | 两者 | OpenClaw：dreaming 管线、MEMORY.md 静默剔除；Hermes：文档链溯源 RFC（#143379）、压缩后持久记录存活 |
| **成本/资源效率** | 两者 | OpenClaw：缓存 token 重建 ~380k、embeddings 存 3 份；Hermes：Desktop 空闲 CPU/GPU 消耗（#127647） |
| **凭证/计费安全** | 两者 | Hermes #118379 两订阅按一个计费（P1）；OpenClaw #184509 越权泄露修复显示同类边界意识 |

## 5. 差异化定位分析

- **功能侧重**：OpenClaw 偏“个人助理+记忆进化”（skills 自维护、dreaming、多渠道消息中枢）；Hermes 偏“多形态运行时”（Desktop/Webapp/CLI/Kanban/cron 统一网关）+ 多 bot 多路复用。
- **目标用户**：OpenClaw 重度自托管用户（3.5GB DB、长期运行）与渠道集成用户为主；Hermes 多 profile/远端 VPS/自动化（Kanban、cron）用户为主。
- **技术架构**：OpenClaw 的风险集中在 SQLite 状态层（租约/checkpoint/WAL）；Hermes 的风险集中在单网关进程重构后的会话路由与 resume。两者均采用插件/MCP 扩展模型，但 Hermes 已出现厂商主动提交插件（PageOne、Modular Cloud），生态商业化信号更早。

## 6. 社区热度与成熟度

- **OpenClaw：质量巩固期**。输入管道 A 级（高质量复现报告），合并节奏健康，但 7 项 P0 无 fix PR、多个问题挂起 1–2 个月、`needs-product-decision` 缺位，属“成熟项目积压消化”阶段。
- **Hermes：快速迭代/重构消化期**。统一网关（10-14）与 Webapp（10-25）两大变更密集落地，回归面大、PR 积压 410 条、8 月贡献者 PR 悬置 2 月+，属“扩张优先、质量追赶”阶段。
- **共同结构性风险**：两者均出现贡献者被阻塞信号（Hermes 无法开 PR #131859；OpenClaw 活跃 PR 因不活跃被关闭 #125897），维护者带宽是生态级瓶颈。

## 7. 值得关注的趋势信号

1. **单网关/单进程架构是双刃剑**：两个项目独立演化出统一网关，也都因此产生最严重的 P0（事件循环阻塞、respawn 循环）。“架构收敛 → 回归爆发 → 消化”是当前智能体框架的典型生命周期，新入局者应预留隔离/熔断设计。
2. **记忆自维护成为产品差异化方向**：skills 减肥（48→2 有效）、dreaming 晋升、文档溯源 RFC——行业正从“记忆堆积”转向“记忆治理”，对开发者意味着记忆系统需要 pruning/provenance/审计机制。
3. **消息可靠性 > 新渠道**：用户明确表达“高价值消息静默丢失不可接受”，durable delivery + dead-letter 可观测性应优先于渠道数量扩张。
4. **Windows 是被低估的市场与最弱的工程环节**：两个项目 Windows 抱怨均最集中，OpenClaw CI 仅覆盖 0.6% 测试文件的教训值得所有跨平台智能体项目警惕。
5. **成本可观测性诉求上升**：token 缓存重建、重复 embeddings、空闲资源消耗等反馈表明，用户正把智能体当作“长期运行的服务”而非一次性会话来审视资源账单。
6. **社区质量即护城河**：高质量复现报告与厂商主动入驻插件目录（Hermes）表明，issue 治理和插件生态正在成为开源智能体项目的竞争资产。

**对 OpenClaw 的建议**：优先发版携带 main 上已合修复；针对 SQLite 与事件循环两族问题设专项；补齐 Windows CI——这三项是当前与 Hermes 竞争中最可能流失用户的风险点。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-10-29）

## 1. 今日速览

Hermes Agent 今日继续保持高活跃度：24 小时内 Issues 更新 362 条（新开/活跃 328、关闭 34），PR 更新 500 条（待合并 410、已合并/关闭 90），无新版本发布。社区讨论焦点高度集中在 **10 月 14 日合并的统一网关架构（#106742）** 的后续问题上——会话状态、消息投递、多 profile 场景的回归问题持续涌现，已成为当前最大的稳定性风险面。同时，Webapp（浏览器版 Desktop，#141864）刚刚落地（10-25 合并），围绕其插件安装、会话守卫的跟进 PR 已快速跟上。整体来看，项目处于「大重构后消化期」：功能推进迅猛，但 P0/P1 级回归需要维护者优先收敛。

## 2. 版本发布

今日无新版本发布。（最新主线仍处于 v0.22.x 之后的 main 分支滚动状态）

## 3. 项目进展

今日 PR 活动量大（500 条更新，90 条合并/关闭），主要推进方向：

- **Webapp 生态补全**：[#146178](https://github.com/NousResearch/hermes-agent/pull/146178)（salvage 自 #146132）实现从 Webapp 标签页安装 desktop-only 插件，并固定到已审核的 https commit，衔接 #144648 的 post-merge 跟进清单。
- **Windows 网关稳定性**：[#146078](https://github.com/NousResearch/hermes-agent/pull/146078) 为 Windows 启动器的 respawn 风暴加入刹车（实测 69 秒内出现 3 代网关）；[#146261](https://github.com/NousResearch/hermes-agent/pull/146261) 补上「旧安装的任务模板收不到刹车」的缺口——两连发说明维护者在认真收敛 Windows 平台问题。
- **网关生命周期与可靠性**：[#146256](https://github.com/NousResearch/hermes-agent/pull/146256) 让网关宕机期间退出的后台进程完成事件可重新入队；[#146257](https://github.com/NousResearch/hermes-agent/pull/146257) 修正 unclean-exit 报告错误归因前代心跳；[#146249](https://github.com/NousResearch/hermes-agent/pull/146249) 恢复 Slack relay 转发消息的 typing/reaction 状态。
- **老牌修复 PR 持续活跃**：[#84288](https://github.com/NousResearch/hermes-agent/pull/84288)（计划重启前等待最终投递）、[#84499](https://github.com/NousResearch/hermes-agent/pull/84499)（插件发现未完成导致误报 Unknown toolsets）、[#82995](https://github.com/NousResearch/hermes-agent/pull/82995)（persist_on_release 跨中断保持）均有更新，qixuancao 的一系列 8 月 PR 在等待最终合并。

**评估**：项目在网关可靠性、Windows 支持、Webapp 三条线上均有实质推进，但 410 条待合并 PR 的积压表明 review 带宽是当前瓶颈。

## 4. 社区热点

1. **[#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（223 评论，已关闭）** — 统一网关 #106742 的 post-merge 修复追踪 issue。超高评论量反映社区对「所有本地会话归入单一网关进程」这一架构变更的高度关注与连锁问题。该 issue 已关闭，讨论延续到 →
2. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（27 评论）** — 「统一网关 main 分支遗留问题清单」，作为 #134889 的续篇，系统梳理了 CLI/TUI/Desktop/API/cron/Kanban 全表面共用一个网关进程后的问题面。
3. **[#127647](https://github.com/NousResearch/hermes-agent/issues/127647)（32 评论）** — Desktop 空闲资源消耗追踪器（渲染器 CPU/GPU、serve CPU、内存），用户对桌面端「什么都不做也在烧电」的不满集中爆发，已有 triage 索引和逐机制归因。
4. **[#143379](https://github.com/NousResearch/hermes-agent/issues/143379)（29 评论）** — RFC：文档链底层的读取/治理/压缩网络设计，属于架构级讨论，核心诉求是「持久记录应带溯源在会话压缩后存活」。
5. **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（53 评论）** — 贡献者 @kuehnberger 无法从 fork 向主仓库开 PR（CreatePullRequest 权限错误），issue 创建和 fork 内 PR 正常。被标记 `blocked/cause/upstream`，疑似 GitHub 平台侧问题，但已阻塞一位活跃贡献者的工作流，值得维护者跟进。

## 5. Bug 与稳定性（按严重程度）

| 级别 | 问题 | 状态 |
|---|---|---|
| **P0** | [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) 统一网关后续修复追踪（已关闭，由 [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 接续） | 修复进行中 |
| **P1** | [#118379](https://github.com/NousResearch/hermes-agent/issues/118379) Anthropic 每请求凭证刷新回退凭证池轮换——**两个订阅按一个计费**，涉及账单与安全边界 | 未见专门 fix PR |
| **P2** | [#139818](https://github.com/NousResearch/hermes-agent/issues/139818) 远端后端 Desktop 会话无法从本地恢复（session.resume → not_found），标注 `cause/fallout`（网关重构波及） | 待修 |
| **P2** | [#141973](https://github.com/NousResearch/hermes-agent/issues/141973) 中途插话不可靠：排队不送达 / 显示已发送但未达 harness / Steer 按钮静默无操作 | 待修 |
| **P2** | [#142144](https://github.com/NousResearch/hermes-agent/issues/142144) Desktop 将 billing-class slug `custom` 持久化进 composer 并作为 launch provider，导致首回合 AuthError | 待修 |
| **P2** | [#143268](https://github.com/NousResearch/hermes-agent/issues/143268) 本地 Kanban notify+wake 永远到不了会话 FIFO（LocalSessionAdapter 缺 gateway_runner） | 待修 |
| **P2** | [#142925](https://github.com/NousResearch/hermes-agent/issues/142925) Context-usage 弹窗对无常驻 agent 的会话永远显示「暂无上下文数据」 | 待修 |
| **P2** | [#133421](https://github.com/NousResearch/hermes-agent/issues/133421) Webapp 浏览器前台守卫误拒真正聚焦的会话（比较 primary 而非 focused 身份） | 待修 |
| **P3** | [#101160](https://github.com/NousResearch/hermes-agent/issues/101160)（已关闭）Buzz relay 静默被误判为断连，每 300s 强制重连 | 已修复 |
| **P3** | [#142239](https://github.com/NousResearch/hermes-agent/issues/142239) Ollama num_ctx 探测对任何本地网关误触发，导致中转 Gemini 模型 400 | 待修 |
| **P3** | [#133739](https://github.com/NousResearch/hermes-agent/issues/133739) 0 字节 kanban.db 导致所有工作区清理 fail-closed | 待修 |

今日活跃 fix PR 还包括：[#135979](https://github.com/NousResearch/hermes-agent/pull/135979)（cron 因非 UTF-8 输出文件崩溃）、[#141870](https://github.com/NousResearch/hermes-agent/pull/141870)（次级 profile Email 首连不发布运行状态）、[#146267](https://github.com/NousResearch/hermes-agent/pull/146267) / [#104220](https://github.com/NousResearch/hermes-agent/pull/104220)（Ollama 空 `/models` 崩溃，注意这两者是重复修复，需协调）。

## 6. 功能请求与路线图信号

- **[#45935](https://github.com/NousResearch/hermes-agent/issues/45935)（👍 8）WhatsApp Cloud API 消息模板支持**：来自真实生产用户（机械加工业务），用于突破 24 小时再互动窗口。文档已标注「等待需求信号」，该 issue 就是信号，且热度最高，有望纳入下一版本。
- **[#49422](https://github.com/NousResearch/hermes-agent/issues/49422)（👍 4）自定义 Enter/Ctrl+Enter 发送键位**：中文用户提出的桌面端 UX 需求，评论区持续有人附议，实现成本低、需求明确，适合快速采纳。
- **[#67347](https://github.com/NousResearch/hermes-agent/issues/67347) 子代理模型/Provider 引导式选择器**：将 `delegation.model`/`delegation.provider` 从自由文本改为引导选择，属体验补全。
- **[#64890](https://github.com/NousResearch/hermes-agent/issues/64890) 从 POST /v1/runs 向 MCP tools/call 传播 per-run 元数据**：企业级可观测性/审计诉求，与 [#143379](https://github.com/NousResearch/hermes-agent/issues/143379) 的溯源 RFC 方向一致，是架构路线的信号。
- 生态扩张信号：[#146268](https://github.com/NousResearch/hermes-agent/pull/146268)（PageOne Lab 托管 MCP 服务目录）、[#146262](https://github.com/NousResearch/hermes-agent/pull/146262)（Modular Cloud 模型 Provider 插件）显示插件目录正吸引厂商主动提交。

## 7. 用户反馈摘要

- **远端/VPS 用户体验差**：[#70445](https://github.com/NousResearch/hermes-agent/issues/70445) 描述远端后端会话加载 20+ 秒、切走即取消、永久转圈——自 7 月开放至今仍是痛点。
- **多 profile/多 bot 用户的路由混乱**：[#143364](https://github.com/NousResearch/hermes-agent/issues/143364)（次级 profile 的进度消息发到了主 bot）、[#141910](https://github.com/NousResearch/hermes-agent/issues/141910)（卫星 profile 的 cron 后台投递被本地会话适配器抢占）表明多路复用网关是高级用户的核心场景，也是回归重灾区。
- **Windows 用户长期被边缘化**：[#68128](https://github.com/NousResearch/hermes-agent/issues/68128)（WhatsApp 桥 WinError 5，7 月至今）、[#119120](https://github.com/NousResearch/hermes-agent/issues/119120)（最小化/托盘行为解耦）。好在今日两条 Windows respawn PR 显示近期投入在增加。
- **自动化/无人值守用户**：Kanban 派发卡死（[#119070](https://github.com/NousResearch/hermes-agent/issues/119070)）、respawn guard 误判（[#67249](https://github.com/NousResearch/hermes-agent/issues/67249)、[#105758](https://github.com/NousResearch/hermes-agent/issues/105758)）是 cron/自动化场景的反复痛点，多被标记 `needs-decision`，等待维护者拍板设计。
- **正面信号**：用户愿意写极详细的复现与归因报告（如 #118379 的计费问题、#143268 的游标分析），社区工程素养高，对统一网关的大方向总体认可，不满集中在过渡期的回归质量。

## 8. 待处理积压

需要维护者优先关注：

1. **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)** — 贡献者无法开 PR，虽标记 upstream，建议主动联系 GitHub 支持或提供 workaround，已阻塞外部贡献。
2. **[#118379](https://github.com/NousResearch/hermes-agent/issues/118379)（P1，9-21 至今）** — 涉及用户实际计费损失，无对应 fix PR，应提升优先级。
3. **[#119070](https://github.com/NousResearch/hermes-agent/issues/119070)、[#67249](https://github.com/NousResearch/hermes-agent/issues/67249)、[#105758](https://github.com/NousResearch/hermes-agent/issues/105758)** — 三个 `needs-decision` 的 Kanban/守护逻辑问题，最早已开放 9 周+，需要设计裁决而非等复现。
4. **[#68128](https://github.com/NousResearch/hermes-agent/issues/68128)（7-20 至今）** — Windows + WhatsApp 组合，文档承诺的 fallback 缺失，长期无修复。
5. **PR 积压**：410 条待合并中，[#84288](https://github.com/NousResearch/hermes-agent/pull/84288)、[#84499](https://github.com/NousResearch/hermes-agent/pull/84499)、[#83668](https://github.com/NousResearch/hermes-agent/pull/83668)、[#82995](https://github.com/NousResearch/hermes-agent/pull/82995)、[#2951](https://github.com/NousResearch/hermes-agent/pull/2951) 等已挂起 2 个月以上且质量较高（含完整归因），review 带宽不足正在消耗贡献者耐心；另需协调 #104220 与 #146267 的重复修复。

---
*数据来源：GitHub API 快照（2026-10-29）。评论数排名展示 Top 30 Issues / Top 20 PRs，全量数据见仓库。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*