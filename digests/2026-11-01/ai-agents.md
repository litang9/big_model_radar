# OpenClaw 生态日报 2026-11-01

> Issues: 496 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-31 23:21 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-11-01

---

## 1. 今日速览

今日 OpenClaw 维持高活跃度：过去 24 小时 Issues 更新 496 条（新开/活跃 395、关闭 101），PR 更新 500 条（待合并 230、已合并/关闭 270），无新版本发布。社区贡献热情高涨，@steipete 一人提交了多个 Control UI 性能优化 PR（含严谨的 A/B 实验数据），@vincentkoc 集中清理测试基建重复代码，@roboclaw-bot 接力重开了多个长期停滞的社区 PR。与此同时，稳定性隐忧仍在累积：doctor 挂起、Gateway 内存泄漏、插件捕获阻塞事件循环等多个 P0/P1 级 Bug 尚无 fix PR，维护者评审积压明显（大量 Issue 带 `clawsweeper:needs-maintainer-review` / `no-new-fix-pr` 标签）。

---

## 2. 版本发布

今日无新版本发布。（对比近期版本节奏：2026.10.x 系列仍在持续修复中，extended-stable 2026.9.34 亦有未决问题。）

---

## 3. 项目进展

今日 PR 吞吐量约 500 条，其中 270 条已合并/关闭，主要进展集中在三个方向：

**Control UI 性能与体验（@steipete 主导）**
- [#189760](https://github.com/openclaw/openclaw/pull/189760) perf: 热重载时随首次挂载接纳缓存聊天面板（XL），消除 144px 身份内容跳变
- [#189729](https://github.com/openclaw/openclaw/pull/189729) fix: 会话删除后不再反复失效侧边栏缓存（一次删除曾引发 25/5 次跨 tab 广播失效）
- [#189762](https://github.com/openclaw/openclaw/pull/189762) perf: Dashboard 冷启动经由早期 Gateway 交接，11/11 配对实验显示 hello 时间 570→468ms（中位 −96.88ms）
- [#189843](https://github.com/openclaw/openclaw/pull/189843) / [#189821](https://github.com/openclaw/openclaw/pull/189821) 大型 agent 花名册下选择器与侧边栏只挂载可见行，显著降低 CPU

**长期停滞社区 PR 被 bot 接力重启（重要信号：项目在主动消化积压）**
- [#189852](https://github.com/openclaw/openclaw/pull/189852) 取代 [#168146](https://github.com/openclaw/openclaw/pull/168146)：修复 provider 在流末重发分歧文本导致的回复尾部重复
- [#189837](https://github.com/openclaw/openclaw/pull/189837) 取代 [#141170](https://github.com/openclaw/openclaw/pull/141170)：Slack 原生流过期后进度仍可编辑、最终答案只送达一次

**新功能**
- [#189856](https://github.com/openclaw/openclaw/pull/189856) feat: 系统 agent 可读取用量与成本（closes #181148）
- [#189749](https://github.com/openclaw/openclaw/pull/189749) feat: cron 自动化支持人类 owner 管理与转移（XL，标记 🚨 security-boundary，需 proof）
- [#189850](https://github.com/openclaw/openclaw/pull/189850) fix: 受限 operator 角色不再发出被禁止的请求（安全敏感）

**测试/基建精简**：@vincentkoc 的 #189838/#189840/#189841/#189844 系列去重 fixture 构建，降低 CI 成本。

---

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) P0 · 66 评论 | 🦞 最高 | 2026.9.6 插件捕获回归：大型外部插件导致 Gateway 事件循环阻塞数分钟，启动与运行时均触发。一个月未修复，社区焦虑明显 |
| [#177656](https://github.com/openclaw/openclaw/issues/177656) P1 · 22 评论 | 稳定性 | 2026.10.5 原生 host exec 报 shared-state 完整性准入错误，至少 28 次失败且无子结果 |
| [#166634](https://github.com/openclaw/openclaw/issues/166634) P0 · 21 评论 | 崩溃恢复 | 崩溃恢复后 SQLite session 回收 checkpoint 过期，agent 永久 UNAVAILABLE |
| [#161976](https://github.com/openclaw/openclaw/issues/161976) · 19 评论 | 消息丢失 | WhatsApp DM 回复在重启后持续送达失败（P1，需安全评审） |
| [#153426](https://github.com/openclaw/openclaw/issues/153426) P0 · 15 评论 | 信任/安全 | `MEMORY.md`/`USER.md` 因 provenance ratchet 被静默永久排除出 bootstrap 注入，无诊断、无恢复路径——直击“个人 AI 助手记忆”核心价值 |
| [#76493](https://github.com/openclaw/openclaw/issues/76493) · 13 评论 | 安全最佳实践 | `mcp.servers[].env` 不接受 SecretRef 对象，用户被迫放弃密钥间接引用（5 👍，需求明确） |

**背后诉求**：用户最不满的是“静默失败 + 无诊断 + 无恢复”——多个高热 Issue 均围绕状态/记忆/消息在异常路径下的不可恢复性。

---

## 5. Bug 与稳定性（按严重度）

**P0**
- [#160959](https://github.com/openclaw/openclaw/issues/160959) 插件捕获阻塞事件循环（2026.9.6 回归，crash-loop）— ❌ 无 fix PR，已存在一个月
- [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 agent 永久不可用（session-state/message-loss）— ❌ 无 fix PR（main 上未复现，需补 repro）
- [#153426](https://github.com/openclaw/openclaw/issues/153426) 记忆根文件被静默排除 — ❌ 无 fix PR，需产品决策
- [#137177](https://github.com/openclaw/openclaw/issues/137177) 内置 wecom 插件无法安装 — ❌ 无 fix PR

**P1**
- [#177656](https://github.com/openclaw/openclaw/issues/177656) host exec 完整性准入错误（2026.10.5，28+ 次失败）— ❌ 无 fix PR
- [#182369](https://github.com/openclaw/openclaw/issues/182369) Gateway RSS 每小时泄漏 ~0.1 GiB，内部阈值监控不触发 — ❌ 无 fix PR
- [#187900](https://github.com/openclaw/openclaw/issues/187900) / [#178359](https://github.com/openclaw/openclaw/issues/178359) `doctor` 在 Linux/macOS 全模式挂起 — ❌ 无 fix PR
- [#157255](https://github.com/openclaw/openclaw/issues/157255) turn claim 超时后不释放，session 卡死 90+ 分钟 — ❌ 无 fix PR
- [#131768](https://github.com/openclaw/openclaw/issues/131768) Android Talk 语音会话在工具调用期间掉线（用户被迫用 Discord 语音兜底）
- [#177909](https://github.com/openclaw/openclaw/issues/177909) transcript 幂等冲突被误判为模型失败并走完整跨 provider 回退链

**安全相关**
- [#173058](https://github.com/openclaw/openclaw/issues/173058) `workspaceOnly: true` 不生效——agent 运行时仍以 OpenClaw 状态根为允许目录，文件工具可越界读写 — ❌ 无 fix PR，**建议优先处置**
- [#130209](https://github.com/openclaw/openclaw/issues/130209) 脱敏把错误消息内的 key 也打码，模型无法自我纠错

**今日有修复动作的**
- Slack 流过期进度冻结 → [#189837](https://github.com/openclaw/openclaw/pull/189837)（已关闭/被接力）
- 流末分歧文本重复 → [#189852](https://github.com/openclaw/openclaw/pull/189852)
- 更新中断 Git 拉取重试 → [#189818](https://github.com/openclaw/openclaw/pull/189818)（🚨 security-boundary，已关闭）

---

## 6. 功能请求与路线图信号

- **密钥间接引用**：[#76493](https://github.com/openclaw/openclaw/issues/76493)（SecretRef 进 MCP env）——高共识、schema 局部改动，落地下一个 minor 的可能性高。
- **用量/成本可观测**：[#189856](https://github.com/openclaw/openclaw/pull/189856) 已在实现系统 agent 读成本。
- **记忆插件能力扩展**：[#138366](https://github.com/openclaw/openclaw/issues/138366) 让 memory slot owner 驱动 Dreams 页——与 #153426 记忆信任问题同属“记忆子系统”主题，可能一起进入规划。
- **超大 session 的 Skill Workshop 预算策略**：[#150238](https://github.com/openclaw/openclaw/issues/150238)。
- **PDF 原生 OpenAI 文档输入 opt-in**：[#127770](https://github.com/openclaw/openclaw/pull/127770)（PR 仍 open/stale），与 #143375 扫描 PDF 死路问题互补。
- **平台事件扩展**：[#116360](https://github.com/openclaw/openclaw/issues/116360) workboard 状态变化事件。

---

## 7. 用户反馈摘要

**痛点集中点**
1. **静默失败与不可诊断**：#153426（记忆被静默丢弃）、#172969（CLI backend 缺字段零诊断）、#131877（auth profile 被跳过无日志）——用户反复强调“行为本身可以错，但不能不给解释”。
2. **投递可靠性跨渠道普遍不佳**：WhatsApp（#161976）、Telegram（#158154 子 agent 结果 30 分钟后过期）、Slack 多账号（#131150）、iMessage 回声（#135704）。
3. **doctor / update 工具链不可靠**：挂起（#187900、#178359）、幂等运行 473 秒超预算 60 秒（#166526）、update repair 被保留包恢复阻塞（#183479）。
4. **长期运行稳定性**：内存泄漏（#182369）、SQLite 快照回收每周期跳过（#175926）、死信队列永久污染健康指标（#112313）。

**正面信号**
- Control UI 性能 PR 附带的实测数据（如 dashboard hello −17%）显示团队工程严谨度获得社区认可。
- Bot 重启社区 PR 时保留原作者 commit credit（#189852、#189837），贡献者体验良好。
- 大量高质量、含源码复现路径的 Issue 报告（如 #150822、#154252），说明核心用户群技术能力强、参与度深。

---

## 8. 待处理积压（建议维护者关注）

**高严重度 + 无 fix PR + 跨多版本**
- [#160959](https://github.com/openclaw/openclaw/issues/160959)（P0，9 月底至今，66 评论）
- [#153426](https://github.com/openclaw/openclaw/issues/153426)（P0，安全 + 记忆核心，需产品决策）
- [#173058](https://github.com/openclaw/openclaw/issues/173058)（安全边界失效）
- [#166634](https://github.com/openclaw/openclaw/issues/166634)（P0 崩溃恢复）

**已标 stale 但评级高（🦞 diamond lobster）**
- [#92473](https://github.com/openclaw/openclaw/issues/92473) 模型回退通知泄漏到用户渠道
- [#114913](https://github.com/openclaw/openclaw/issues/114913) memory_search 嵌入超时无 FTS 回退
- [#131877](https://github.com/openclaw/openclaw/issues/131877) auth 顺序不可诊断

**长期停滞 PR**
- [#127770](https://github.com/openclaw/openclaw/pull/127770)（8 月起 open，PDF OpenAI opt-in）
- [#189749](https://github.com/openclaw/openclaw/pull/189749) cron owner 转移（XL + security-boundary，需 proof，可能成为下一个安全评审焦点）

**结构性风险**：近 400 条活跃 Issue 中绝大多数带 `clawsweeper:no-new-fix-pr`，维护者评审吞吐（尤其 needs-maintainer-review / needs-product-decision 队列）已成为项目当前最明显的瓶颈。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告 · 2026-11-01

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于“架构大规模重构后的收敛期”——各头部项目都完成了向统一网关/中心化运行时的架构迁移，但迁移长尾问题集中显现。社区贡献热情空前高涨（两项目合计单日 Issue/PR 更新近 1800 条），但维护者评审吞吐已成为普遍瓶颈（OpenClaw 近 400 条活跃 Issue 无 fix PR，Hermes 371 条 PR 待合并）。用户最强烈的共性诉求已从“功能有没有”转向“静默失败不可诊断、状态不可恢复”——可靠性工程正在取代功能堆叠成为核心竞争力。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 496（新开/活跃 395，关闭 101） | 295（新开/活跃 281，关闭 14） |
| PR 更新（24h） | 500（待合并 230，合并/关闭 270） | 500（待合并 371，合并/关闭 129） |
| Release | 无（2026.10.x 修复中） | 无（v0.22.5） |
| P0 未修复 Bug | 4 个（含 1 个安全边界失效 #173058） | 0 个 P0，1 个 P1 无明确 fix |
| 安全积压 | workspaceOnly 失效、记忆静默丢弃、脱敏过度 | 凭据落盘 #62336（积压 4 个月） |
| 修复/发现比 | 偏低（多数高热 Issue 无 fix PR） | 较高（问题发现与修复基本同步） |
| 健康度评估 | ⚠️ 中：贡献活跃但 P0 积压重、评审瓶颈明显 | ✅ 中高：高强度迭代中形成发现-修复正循环，PR 积压是主要风险 |

## 3. OpenClaw 在生态中的定位

- **优势**：单日社区热度显著高于 Hermes（Issue 关闭量 101 vs 14，PR 合并 270 vs 129，消化能力更强）；贡献者工程严谨度高（A/B 配对实验数据随 PR 附带）；主动用 bot（@roboclaw-bot）接力停滞 PR 且保留原作者 credit，贡献者体验佳。
- **技术路线差异**：OpenClaw 走多渠道投递（WhatsApp/Slack/Telegram/iMessage/Android Talk）+ 插件化 provider 生态路线；Hermes 则聚焦统一网关单进程架构 + Desktop/Kanban/cron 自动化闭环。OpenClaw 的痛点在渠道投递可靠性与插件质量管控；Hermes 的痛点在网关集中化带来的会话状态冲突与资源占用。
- **社区规模**：OpenClaw Issue 编号已达 18.9 万量级，体量远超 Hermes（~14.7 万但项目更年轻），但按“高热 P0 修复速度”衡量，OpenClaw 的维护带宽/规模比更紧张。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **密钥/凭据安全** | #76493（SecretRef 进 MCP env）、#173058（workspace 边界失效） | #62336（环境快照凭据落盘）、#146428（UnscopedSecretError 静默卡死） | 密钥间接引用与隔离是两项目共同的安全债 |
| **cron/自动化可靠性** | #189749（cron owner 转移）、#157255（turn claim 卡死 90min） | #147030（cron SQLite 竞态，12 并发）、#140222（空会话泄漏） | 自动化任务是稳定性问题高发区 |
| **内存/资源泄漏** | #182369（Gateway 每小时泄漏 0.1 GiB） | #127647（桌面闲置资源 tracker，34 评论）、#146643（1.5–2.5 核 CPU） | 长期常驻运行是个人助手的基本形态，资源治理成标配议题 |
| **消息投递可靠性** | #161976、#135704、#177909 | #143720（唤醒风暴 494 次）、#131786 | 投递幂等/终态收敛是共性难题 |
| **诊断可观测性** | #153426（记忆静默丢弃）、#131877 | #172969 类似 | “可以错，但不能不解释”是最高频用户诉求 |
| **用量/成本可观测** | #189856（系统 agent 读成本） | #90713（内存阈值可配置） | 运行时资源可观测性需求上升 |

## 5. 差异化定位分析

- **功能侧重**：OpenClaw 重“全渠道触达 + 记忆子系统（MEMORY.md/Dreams）+ provider 插件生态”；Hermes 重“单网关统一运行时 + Desktop 体验 + Kanban/cron 工作流自动化”。
- **目标用户**：OpenClaw 面向跨消息平台部署的重度个人助手用户（Issue 报告多含源码级复现，技术能力强）；Hermes 面向自托管桌面 + 自动化运维用户，Linux 桌面体验是其明显短板（透明度 bug 引发强烈共鸣）。
- **技术架构**：OpenClaw Gateway + 多插件捕获模型（插件可阻塞事件循环是结构性风险）；Hermes 单一 gateway 进程收敛（#106742，10/14 合并），正为此付出 7+ 个 P2 长尾代价。两者互为镜像：分布式插件 vs 集中式网关，各自踩到对面路线的坑。

## 6. 社区热度与成熟度

- **快速迭代期**：Hermes——统一网关合并仅 2 周，问题集中爆发但修复节奏跟得上（129 合并/日，回归可快速定位到 commit），tracker issue 组织清晰，处于“可控的高强度迭代”。
- **质量巩固期（偏滞后）**：OpenClaw——无架构大变动，但 P0 积压（#160959 已 66 评论、一个月无 fix）与安全边界失效表明进入“债务偿付滞后”阶段；bot 接力停滞 PR 是主动去债的积极信号。
- **共同风险**：维护者带宽是两家一致的瓶颈；Hermes 8 月 ci-reviewed 的功能 PR 积压近 3 个月，OpenClaw needs-maintainer-review 队列庞大。

## 7. 值得关注的趋势信号

1. **可诊断性 > 功能**：两项目最高热反馈均围绕“静默失败无恢复路径”（OpenClaw #153426 直击记忆核心价值；Hermes #146428 cron 静默卡死）。对开发者的启示：agent 系统的错误路径设计（诊断信息、降级、恢复）是下一阶段差异化重点。
2. **安全边界成为一级议题**：prompt injection 可视化（Hermes #81403 隐藏 Unicode 审批）、workspace 越界（OpenClaw #173058）、凭据落盘（Hermes #62336）、cron owner 权限转移（OpenClaw #189749 标 🚨 security-boundary）——个人 agent 拥有文件/密钥/自动化权限，安全债不可再积压。
3. **常驻化推动资源工程**：内存泄漏追踪、闲置 CPU 治理、SQLite 快照回收等运维型议题高频出现——agent 正从“会话工具”演变为“7×24 常驻服务”，资源可观测性（用量/成本 API）将成为标配。
4. **消息平台即 agent 界面**：多渠道投递（WhatsApp/Slack/Telegram/Discord）+ 原生移动 App + 语音通话（Hermes #11911）需求强烈，随身化是明确方向。
5. **Bot 参与维护成为新常态**：OpenClaw 的 @roboclaw-bot 重启停滞 PR、sweeper 风险标注体系，预示 AI 辅助的仓库治理（含 credit 保留的协作规范）将是大型开源 agent 项目的标配实践。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-01

## 1. 今日速览

Hermes Agent 今日保持极高活跃度：过去 24 小时内 Issues 更新 295 条（新开/活跃 281，关闭 14），PR 更新 500 条（待合并 371，已合并/关闭 129），无新版本发布。社区讨论焦点集中在 **统一网关（unified gateway, #106742）合并后的余波问题**，包括会话状态、消息投递和多路复用等多个 P2 级缺陷。性能类问题持续升温，网关全量重读会话历史导致的 CPU 飙升（#146643）与桌面端闲置资源消耗追踪器（#127647）成为最受关注的稳定性议题。今日新增多个针对性 fix PR（如 cron SQLite 竞态 #147030），修复节奏总体跟得上问题发现速度。

## 2. 版本发布

今日无新版本发布。最新版本仍为 v0.22.5。

## 3. 项目进展

今日 PR 活动量大（129 条合并/关闭），重要进展包括：

- **桌面端 profile 分组修复**：[#146416](https://github.com/NousResearch/hermes-agent/pull/146416)（已关闭/完成）修复了 #146116 引入的两个回归 — 空 profile 分组归位到正确网关，加载失败的 profile 不再误显示 "No sessions yet"。
- **Docker 测试整合**：[#147161](https://github.com/NousResearch/hermes-agent/pull/147161) 完成 #146397 的三个遗留审查点，stand-in poll 测试迁入默认 CI 车道。
- **cron SQLite 并发修复**：[#147030](https://github.com/NousResearch/hermes-agent/pull/147030)（新开）序列化 ledger 写入，解决高并发 cron 任务（实测峰值 12 并发）下 busy handler 超时杀死 worker 的问题，修复 #135487。
- **Kanban 通知降噪**：[#147022](https://github.com/NousResearch/hermes-agent/pull/147022) 抑制终态卡片的过期失败唤醒，降低无效重试。
- **CI 竞态清理**：[#147362](https://github.com/NousResearch/hermes-agent/pull/147362) 修复两个 CI flaky 测试及一个同型产品 bug。
- **待审核心 PR**：P1 级 [#138535](https://github.com/NousResearch/hermes-agent/pull/138535)（网关 pre-agent 阶段有界化 + PENDING follow-up 卡死缓解）、[#137392](https://github.com/NousResearch/hermes-agent/pull/137392)（Anthropic 凭据 origin 跨路由保持）、[#138574](https://github.com/NousResearch/hermes-agent/pull/138574)（TUI split-module NameError，Python 3.11–3.13 下 TUI/Desktop 后端无法加载）仍在推进中。

整体看，项目正围绕统一网关架构的稳定性做系统性收敛，桌面端体验与 CI 质量同步改善。

## 4. 社区热点

- **[#127647](https://github.com/NousResearch/hermes-agent/issues/127647)**（34 评论）：桌面端闲置资源消耗追踪器 — 渲染进程 CPU/GPU、backend serve CPU 及内存占用，是 #122413/#88288 的汇总统筹 issue。用户对桌面应用常驻资源开销不满，维护者用 tracker 组织修复。
- **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)**（30 评论）：统一网关合并后遗留问题清单 — 10 月 14 日 #106742 将所有本地会话收敛到单一 gateway 进程，随后暴露认证、配置、压缩、连接等一系列问题，是当前最关键的总账 issue。
- **[#143426](https://github.com/NousResearch/hermes-agent/issues/143426)**（21 评论，13 👍，已关闭）：Linux 桌面以 6% 不透明度启动，设置界面却隐藏了透明度控件 — 用户无法自救，获社区强烈共鸣，今日已关闭。
- **[#11911](https://github.com/NousResearch/hermes-agent/issues/11911)**（20 评论，15 👍）：原生移动 App（iOS/Android）+ 语音通话请求，反映用户对"随身 AI 助理"的强烈需求。
- **[#20859](https://github.com/NousResearch/hermes-agent/issues/20859)**（35 👍）：Mistral 作为 LLM provider 的支持请求，👍 数最高的功能需求之一 — 语音模型已集成，社区认为补齐 LLM 门槛不高。
- **[#105758](https://github.com/NousResearch/hermes-agent/issues/105758)**（23 评论）：生命周期守卫误杀良性 Node.js CLI，9 月 3 日 scan-budget 提交引入的回归，等待 needs-decision。

## 5. Bug 与稳定性

**P1**
- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022)：多 Kanban worker 并发时网关卡顿导致 worker 崩溃（"Kanban execution unknown"），进行中工作丢失，单次事故杀死 4 个 worker。**暂无明确 fix PR**（#147022 部分相关）。

**P2 — 网关/会话状态类（多为统一网关余波）**
- [#146643](https://github.com/NousResearch/hermes-agent/issues/146643)：网关每次变更全量重读会话历史，数千会话时消耗 1.5–2.5 核 CPU，Desktop 请求 30s 超时。无 fix PR。
- [#143720](https://github.com/NousResearch/hermes-agent/issues/143720)：Discord 线程完成唤醒每 60s 被 admission_conflict 拒绝、永不停止（单日志 494 次），attempt cap 失效。无 fix PR。
- [#143767](https://github.com/NousResearch/hermes-agent/issues/143767)：Desktop 恢复压缩前已结束的会话，消息聊天中每次切换模型被拒 `session_superseded`，致聊天窗口不可用。无 fix PR。
- [#138915](https://github.com/NousResearch/hermes-agent/issues/138915)：网关持有 state.db 时 Dashboard 批量操作全部 409。无 fix PR。
- [#140222](https://github.com/NousResearch/hermes-agent/issues/140222)：带 monitor 的 agent cron 任务每次 tick 都创建空会话。无 fix PR。
- [#146428](https://github.com/NousResearch/hermes-agent/issues/146428)：多路复用 profile 下 cron run 因 UnscopedSecretError **永久静默卡死**。无 fix PR。
- [#131786](https://github.com/NousResearch/hermes-agent/issues/131786)：长单行 JSON 输出被 completion tail 全部丢弃。无 fix PR。

**P2 — 安全**
- [#62336](https://github.com/NousResearch/hermes-agent/issues/62336)：终端环境快照（`export -p`）将含凭据的环境变量持久化到磁盘，包括 Bitwarden Secrets Manager 注入的密钥。**安全问题，需维护者优先决策**。

**P3 值得关注**
- [#96610](https://github.com/NousResearch/hermes-agent/issues/96610)：schema 受限后端上 tool_call bridge 参数始终为空；[#136486](https://github.com/NousResearch/hermes-agent/issues/136486) `reasoning` 别名重放导致 HTTP 400，每回合回退。

## 6. 功能请求与路线图信号

- **Mistral LLM 支持**（[#20859](https://github.com/NousResearch/hermes-agent/issues/20859)，35 👍）：呼声最高、实现成本最低，大概率进入下一版本。
- **原生移动 App + 语音通话**（[#11911](https://github.com/NousResearch/hermes-agent/issues/11911)）：需求真实但工程量大，目前仍处 needs-decision。
- **内存压力阈值可配置**（[#90713](https://github.com/NousResearch/hermes-agent/issues/90713)）：ZFS 等环境误报频发，配置化诉求明确。
- **已有 PR 预示的方向**：[#81434](https://github.com/NousResearch/hermes-agent/pull/81434)（pre_llm_call 阻断钩子）、[#80882](https://github.com/NousResearch/hermes-agent/pull/80882)（Slack emoji reactions 上下文）、[#82826](https://github.com/NousResearch/hermes-agent/pull/82826)（cron 提示注入运行时间）、[#80448](https://github.com/NousResearch/hermes-agent/pull/80448)（/model reset）均处 ci-reviewed 待合并状态，是下一版本的候选功能面。
- **安全方向信号**：[#81403](https://github.com/NousResearch/hermes-agent/pull/81403)（审批提示可见化隐藏 Unicode/bidi 字符）显示团队在强化 prompt injection 防线。

## 7. 用户反馈摘要

- **痛点集中**：统一网关改造后，长期在线部署用户（Desktop + cron + 消息平台）遭遇会话状态冲突、投递失败和资源占用问题，是当前负面反馈主源。
- **桌面端 Linux 体验差**：透明度 bug（#143426、#145183）让用户感到"设置在跟我作对"，且修复前无 UI 自救途径。
- **重度自动化用户受挫**：Kanban 多 worker 崩溃（#145022）导致任务进度丢失；cron 高并发下 SQLite 竞态（#147030 已提修）是自托管用户实测踩到的坑。
- **正面信号**：issue 模板规范、标签体系完善（sweeper:risk-* 风险标注）、tracker issue 组织清晰；核心维护者（@teknium1、@JoaoMarcos44、@kshitijk4poor）响应积极，回归引入后通常能快速定位到引入 commit。

## 8. 待处理积压

- [#11911](https://github.com/NousResearch/hermes-agent/issues/11911)（移动 App，4 月提出）与 [#20859](https://github.com/NousResearch/hermes-agent/issues/20859)（Mistral 支持，5 月提出）长期停留 needs-decision，建议维护者给出明确方向。
- [#62336](https://github.com/NousResearch/hermes-agent/issues/62336)（凭据落盘安全问题，7 月提出）：安全类 P3 不应积压近 4 个月，建议升级处理。
- [#105758](https://github.com/NousResearch/hermes-agent/issues/105758)：9 月 3 日提交引入的回归，needs-decision 状态已近 2 个月。
- [#14024](https://github.com/NousResearch/hermes-agent/issues/14024)（FTS5 连字符查询失败）、[#67458](https://github.com/NousResearch/hermes-agent/issues/67458)（-w/--worktree 在 -z 模式被静默忽略）等老 issue 长期无决策。
- PR 积压方面：371 条待合并 PR 中，[#81403](https://github.com/NousResearch/hermes-agent/pull/81403)、[#82826](https://github.com/NousResearch/hermes-agent/pull/82826)、[#81434](https://github.com/NousResearch/hermes-agent/pull/81434) 等 8 月即 ci-reviewed 的功能 PR 积压近 3 个月，建议排期合并或说明阻塞原因。

---

**健康度小结**：项目处于高强度迭代期，社区参与旺盛、问题发现与修复形成良性循环；主要风险在于统一网关架构迁移后的长尾稳定性问题（7+ 个 P2 会话/投递类 bug 无 fix PR）和 PR 积压规模（371 条），需要维护者投入系统性收敛。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*