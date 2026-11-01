# OpenClaw 生态日报 2026-11-02

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-01 23:33 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-02

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 274，关闭 226），PR 更新 500 条（待合并 279，已合并/关闭 221），吞吐均衡，维护者响应节奏健康。今日无新版本发布，社区精力集中在 bug 修复与 PR 审查上，roboclaw-bot 集中推进了一批社区 PR 的重提与收口。整体看，项目处于"稳定打磨期"——安全类与内存/会话状态类问题成为当前最受关注的议题。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭的代表性 PR：

- **#190695** [fix(google): Gemini models ignore configured topP](https://github.com/openclaw/openclaw/pull/190695) — 修复 Gemini 路由忽略 `params.topP` 的问题，评级 🦞 diamond lobster，已关闭收口。
- **#190717** [fix(discord): avoid false failure notices for queued thread answers](https://github.com/openclaw/openclaw/pull/190717) — 取代社区 PR #183192，修复 Discord 排队消息在 thread 中成功回复后误报失败的问题。
- **#190715** [fix(active-memory): German recall questions skip deep recall](https://github.com/openclaw/openclaw/pull/190715) — 取代 #182612，修复德语召回意图识别，提升非英语用户体验。
- **#190713** [fix: account for Doctor backup receipts in mixed database test](https://github.com/openclaw/openclaw/pull/190713) — 修复 Doctor 混合数据库回归测试的阻塞。
- **#190716** [fix(ci): align cold-storage fixtures with retained navigation](https://github.com/openclaw/openclaw/pull/190716) — 对齐冷存储发布 fixture 与当前导航行保留策略。

今日 roboclaw-bot 以 supersede 方式重提了多个社区 PR（#190715/#190717/#190722/#190723），显示团队在系统性清理积压贡献。活跃待合并侧，**#190443**（Slack allowlist NFC/NFD 规范等价匹配，P1，涉及安全边界）、**#188078**（媒体失败标记携带 provider 状态码）等已就绪待维护者审阅。整体推进稳中有进。

## 4. 社区热点

- **#160959** [Gateway blocks for minutes while capturing large external plugins](https://github.com/openclaw/openclaw/issues/160959)（69 评论，P0，crash-loop）— 2026.9.6 引入的插件生成捕获功能在大型依赖树下阻塞事件循环数分钟，是今日讨论最热烈的问题，用户诉求是 Gateway 启动与运行时重发布不应卡死。尚无 fix PR。
- **#153426** [MEMORY.md/USER.md 被来源棘轮静默永久排除出 bootstrap 注入](https://github.com/openclaw/openclaw/issues/153426)（16 评论，P0，安全+UX 阻塞）— 用户对"静默失败、无诊断、无恢复路径"的设计强烈不满。
- **#42475** [Per-agent cost budget enforcement](https://github.com/openclaw/openclaw/issues/42475)（29 评论，已关闭）— 网关级预算控制的长期需求，今日关闭，可能已有替代方案落地。
- **#67413** [Per-agent dreaming configuration](https://github.com/openclaw/openclaw/issues/67413)（15 评论，5 👍）— 多 agent 同时 dreaming 导致 OOM，用户希望有逐 agent 控制；与 #138366（Dreams 页面由 memory slot owner 驱动）形成一组内存子系统路线图信号。

## 5. Bug 与稳定性（按严重程度）

**P0**
- [#160959](https://github.com/openclaw/openclaw/issues/160959) Gateway 捕获大型插件阻塞数分钟（2026.9.6 回归）— 无 fix PR
- [#140161](https://github.com/openclaw/openclaw/issues/140161) Windows 计划任务模式冷启动挂起 5-7 分钟或静默退出（release blocker）— 无 fix PR
- [#153426](https://github.com/openclaw/openclaw/issues/153426) 记忆根文件被静默排除 — 无 fix PR

**P1 / 安全**
- [#173058](https://github.com/openclaw/openclaw/issues/173058) `tools.fs.workspaceOnly` 未真正限制文件工具（agent 可访问 OpenClaw 状态根目录）— security 标签，无 fix PR，需重点关注
- [#167876](https://github.com/openclaw/openclaw/issues/167876) Talk 会话建立后丢失 caller authority — 无 fix PR
- [#187900](https://github.com/openclaw/openclaw/issues/187900) `openclaw doctor` 在 Linux 全模式启动即挂起 — 无 fix PR
- [#144336](https://github.com/openclaw/openclaw/issues/144336) SIGUSR1 延迟重启在 shutdown 阶段失败（identity lost）
- [#138272](https://github.com/openclaw/openclaw/issues/138272) Android Talk "no live response owner" 跨三个版本复现

**P2 但影响面广**
- [#53408](https://github.com/openclaw/openclaw/issues/53408) 长对话后 write/exec 工具参数被静默丢弃
- [#138561](https://github.com/openclaw/openclaw/issues/138561) 2026.8.2 升级后 active-memory 完全停止召回且无日志
- [#128140](https://github.com/openclaw/openclaw/issues/128140) memory_search 工具始终 15s 超时（CLI 正常）— 相关改进提案 #114913

**已有修复动作**：#190443（Slack 名称规范化匹配）、#190723（Tailscale ingress 恢复诊断）、#190721（memory forget --json 报告准确性）今日均有 PR 在途。

## 6. 功能请求与路线图信号

- **内存子系统**：#67413（per-agent dreaming）、#138366（Dreams 页面插件化）、#114913（embedding 预算 + FTS 回退）三者叠加，指向 memory/dreaming 架构的下一步重构。
- **成本治理**：#42475（预算上限）今日关闭，结合 #139188（Prometheus 订阅配额指标，关联 PR 已开），成本可观测/管控方向正在成形。
- **可能进版本**：#190304（Git 更新进度显示，已有 #189818 重试基础）、#189857（sessions 表显示 workspace 绑定）、#189858（审批历史显示 severity）均已 proof sufficient，处于合并边缘。
- **沙箱能力**：#91676（`skills.workshop.allowSandboxedAgents`）持续有讨论，处于产品决策中。

## 7. 用户反馈摘要

- **痛点集中在"静默失败"**：多个高热 issue（#153426、#53408、#138561、#138561、#131150）的共同主题是功能失效无任何日志/诊断，运维排障成本高。
- **升级路径不稳**：#167557（插件迁移不收敛）、#144447（Git 更新卡 preflight）、#122019（update status 不评估插件兼容性），反映用户对升级安全性的焦虑。
- **多渠道可靠性**：WhatsApp TTS（#144502）、iMessage 重复投递（#143632）、Slack DM 静默丢弃（#131150）、Android Talk 掉线（#138272）——重度渠道用户是 bug 报告主力。
- **积极信号**：贡献者社区质量高，PR 普遍带完整 repro/proof 证据链；beta.7 六类可靠性缺陷报告（#128067）体现了深度生产用户的长期投入。

## 8. 待处理积压

- [#160959](https://github.com/openclaw/openclaw/issues/160959)（P0，69 评论，开放 1 个月+）— 最高优先级，需 fix PR
- [#173058](https://github.com/openclaw/openclaw/issues/173058)（security，10-15 开放）— 安全审查积压
- [#128140](https://github.com/openclaw/openclaw/issues/128140)（P1，8 月开放）— memory_search 超时仍需 live repro
- [#137613](https://github.com/openclaw/openclaw/issues/137613)、#153426 — 均标记 fix-shape-clear/source-repro，修复方案明确但未落地
- PR 侧：#141237（voice-call，9 月开放，waiting on author）、#141270（codex persona，merge-risk 兼容性标记，与 main 冲突）— 长期开放 PR 建议维护者裁定去留。

**健康度小结**：吞吐健康、triage 标签体系运转良好，但 P0/安全类 issue 的修复落地速度落后于社区讨论热度，是当前主要风险点。

---

## 横向生态对比

# 开源个人 AI 助手生态横向对比分析报告
**数据日期：2026-11-02 | 样本：OpenClaw、Hermes Agent**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**架构深耕期**：头部项目均从功能扩张转向“网关架构统一、会话生命周期管理、内存子系统重构”三大基础工程。用户构成正从尝鲜者转向 always-on 重度生产用户，痛点随之从“能不能用”演进为“长会话可信任、静默失败可诊断、多渠道可可靠”。安全治理（文件工具边界、权限模型）和成本管控（预算、可观测性）开始成为议题主线，标志着生态初步成熟但工程债普遍偏重。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 274，关闭 226） | 500（新开/活跃 476，关闭 24） |
| Issue 关闭率 | **~45%（226/500）** | ~5%（24/476）⚠️ |
| PR 更新（24h） | 500（待合并 279，合并/关闭 221） | 500（待合并 439，合并/关闭 61） |
| Release | 无 | 无（v0.22.4 后密集开发） |
| 所处阶段 | 稳定打磨期 | 大重构消化期 |
| 主要风险 | P0/安全 issue 修复落地慢 | 积压快速累积、网关 fallout 收口慢 |
| 健康度评估 | **B+**：吞吐均衡，triage 体系成熟，bot 化 PR 收口（supersede）高效 | **B-**：贡献管道充足，但关闭率严重失衡 |

**关键判读**：两者日活量级相当，但 OpenClaw 的“进/出”比例接近 1:1，Hermes 则呈明显的净积压态势（待合并 PR 439 vs 合并 61）。

---

## 3. OpenClaw 在生态中的定位

**优势**：
- **治理成熟度领先**：分级 triage（P0/P1/P2、security、fix-shape-clear 等标签）+ roboclaw-bot 系统性 supersede 社区积压 PR，工程化管理是同类中标杆。
- **功能纵深更广**：多渠道（WhatsApp/iMessage/Slack/Discord/Talk/Android）、active-memory 召回、dreaming 机制、冷存储、Doctor 诊断——覆盖远超 Hermes 当前以网关/会话为核心的范围。
- **国际化与贡献质量**：已处理德语召回等非英语问题（#190715）；社区 PR 普遍带完整 repro 证据链。

**技术路线差异**：
- OpenClaw 走**功能丰富的单体网关 + 内存/记忆子系统**路线，当前重心在安全边界（#173058）与静默失败诊断。
- Hermes 走**统一网关 + Desktop 多端会话**路线，核心是会话归属显式化（`project_id`）与跨端恢复。

**规模对比**：Issue 编号量级（OpenClaw ~19 万 vs Hermes ~14 万 PR 空间）显示 OpenClaw 历史体量和用户基数更大；但 Hermes 新增活跃 issue（476 vs 274）增速更猛，处于扩张期。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 诉求 |
|---|---|---|---|
| **会话生命周期/长会话稳定性** | #53408（长对话参数丢弃）、#144336（重启 identity lost） | #139818（会话 resume 失败）、#144839（满载排队）、#20372（fresh-session 交接） | 长会话不丢状态、可恢复、可排队 |
| **网关性能与可扩展性** | #160959（大插件捕获阻塞事件循环，P0） | #146643（数千会话占 1.5-2.5 核）、#145022（Kanban 批量崩溃） | 重资产用户突破单网关性能假设 |
| **Windows 平台可靠性** | #140161（计划任务冷启动挂起，release blocker） | #125437、#91097、#112961、#79087 | Windows 体验系统性落后，是两项目共同短板 |
| **升级/安装健壮性** | #167557、#144447、#122019 | #125437、#147277/#147256（update 中止） | 半应用状态需产品内恢复路径 |
| **静默失败可诊断性** | #153426、#138561、#131150 | #143197（session key 静默失效） | 失效必须有日志/诊断/恢复指引 |
| **安全与权限治理** | #173058（workspaceOnly 未生效）、#190443（Slack allowlist） | #131600（内存写入审查） | agent 权限边界需真实可执行 |
| **内存/记忆架构** | #67413/#138366/#114913（dreaming、embedding 预算） | #131600（写入审查） | 记忆子系统是下一轮重构焦点 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 全渠道接入 + 内存/dreaming + 成本治理（预算、Prometheus） | 网关核心 + Desktop 多端 + Kanban 调度 |
| 目标用户 | 多渠道重度个人用户（WhatsApp/iMessage/Slack/Talk 为主力报障群体） | always-on 网关 + Dashboard + API/自动化用户 |
| 架构关键差异 | 功能广度优先，插件生态大（大型插件已是性能负担） | 收敛期架构：每 tab 独立网关、显式 `project_id` 会话模型 |
| Provider 生态 | 多 provider 稳定（Gemini 参数级修复） | 诉求集中（Mistral 👍35 未决），MCP 兼容性存在硬伤（#99270） |
| 治理模式 | bot 驱动的 triage/supersede 体系 | 核心维护者（teknium1）“打捞”式收口 |

---

## 6. 社区热度与成熟度

- **快速迭代/扩张期**：Hermes Agent —— 新增 issue 势能强（476/日），Desktop 多网关架构快速收敛，但关闭率仅 5%，属于“高热度、高债务”典型。
- **质量巩固期**：OpenClaw —— 吞吐均衡、无版本发布、精力集中于 bug 修复与 PR 审查，是明确的稳定打磨信号；但 P0（#160959 开放 1 月+，69 评论）与安全项（#173058）修复速度落后于讨论热度。
- **共同观察**：两项目 alpha/beta 深度生产用户均表现出高质量反馈（OpenClaw 的 repro 证据链、Hermes 报告者自我纠错），说明核心社区已越过“尝鲜”阶段。

---

## 7. 值得关注的趋势信号

1. **“长会话可信度”是下一轮竞争核心**：两项目最热 issue 均为会话丢失/不可恢复（Hermes #139818、OpenClaw #144336/#53408）。排障、排队、交接（fresh-session handoff）机制将成为标配能力。
2. **静默失败是最大 UX 债务**：跨项目用户投诉第一主题。诊断性失败（有日志、有恢复路径）应作为智能体框架的一级设计原则。
3. **网关单点性能墙已现**：事件循环阻塞（OpenClaw）与全量重读（Hermes）说明“单网关进程”假设正被重资产用户击穿——多网关/增量加载/分级存储是明确方向。
4. **Windows 是系统性洼地**：两项目均有一组 Windows P0/P1 聚类。对开发者而言，Windows 一等公民支持仍是差异化机会。
5. **治理自动化成为开源智能体项目标配**：roboclaw-bot 的 supersede 模式值得借鉴——用自动化收口贡献积压，而非依赖人工审查带宽。
6. **成本与安全治理走向产品化**：预算上限、Prometheus 配额指标（OpenClaw）、文件工具真实隔离、内存写入审查（Hermes）——agent 权限与成本的可执行管控将从加分项变为准入门槛。

**给 AI 智能体开发者的行动建议**：优先投入会话持久化与恢复机制、可观测性（拒绝静默失败）、增量式状态管理；若做框架选型，OpenClaw 适合功能广度与多渠道场景，Hermes 适合跟随其网关/会话模型演进但需承受较高的不稳定性。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-02

## 1. 今日速览

Hermes Agent 今日保持极高活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 476，关闭 24），PR 更新 500 条（待合并 439，已合并/关闭 61），无新版本发布。**统一网关架构（unified gateway, #106742）合并后的余波仍是项目最大痛点来源**，会话状态、多网关连接、Desktop 远端会话恢复类问题集中爆发。社区贡献热情高涨，今日新增多个围绕 Desktop 网关归属、构建健壮性的修复 PR，但 Issue 关闭率（约 5%）明显偏低，积压压力持续上升。

---

## 2. 版本发布

今日无新版本发布。当前主线仍处于 v0.22.4 之后的密集开发/修复阶段。

---

## 3. 项目进展

今日 PR 活动以**修复与架构收尾**为主，61 个 PR 被合并/关闭。代表性进展：

- **Desktop 多网关架构持续落地**：[#147708](https://github.com/NousResearch/hermes-agent/pull/147708)（每个终端 tab 拥有自己的网关，salvage #143491/#85241）、[#147711](https://github.com/NousResearch/hermes-agent/pull/147711)（启动时落到远端网关实际拥有的 profile）、[#147718](https://github.com/NousResearch/hermes-agent/pull/147718)（主网关按 profile 启动）。teknium1 集中"打捞"多个此前被拒的 PR，显示统一网关后的 Desktop 连接模型正在快速收敛。
- **构建/更新健壮性**：[#147277](https://github.com/NousResearch/hermes-agent/pull/147277) 与 [#147256](https://github.com/NousResearch/hermes-agent/pull/147256) 分别修复 npm PATH 解析中条目消失导致的 `hermes update` 中止。
- **会话模型精细化**：[#147635](https://github.com/NousResearch/hermes-agent/pull/147635) 引入显式 `sessions.project_id`，运行在项目目录内执行——会话归属从 cwd 推断转向显式声明，是数据模型的实质演进。
- **调度正确性**：[#147641](https://github.com/NousResearch/hermes-agent/pull/147641) 修复 DST 回拨重复小时内 cron 通配符调度不可见的问题。
- **长会话稳定性**：P1 级 [#134274](https://github.com/NousResearch/hermes-agent/pull/134274) 让网关的上下文溢出判定对齐已分类的 provider 失败，避免内容策略 400 被误标为 overflow。

**整体评估**：项目处于统一网关大重构后的"消化期"，本周净前进主要体现在 Desktop 多网关体验与安装/更新可靠性两条线上。

---

## 4. 社区热点

| Issue | 评论 | 核心争议点 |
|---|---|---|
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) API 无法开 PR（CreatePullRequest 权限错误） | 55 | 仅特定账号 fork→上游开 PR 失败，标记 `cause/upstream`，疑似 GitHub 侧问题，但讨论极热烈 |
| [#139818](https://github.com/NousResearch/hermes-agent/issues/139818) 远端后端桌面会话无法 resume | 37 | `hermes serve` 重启后 source='desktop' 会话 `session.resume` 返回 not_found，统一网关合并副作用（`cause/fallout`） |
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 统一网关合并后问题追踪帖 | 34 | 官方 post-merge 追踪帖，承接 #134889，是理解当前架构风险的总入口 |
| [#20859](https://github.com/NousResearch/hermes-agent/issues/20859) 支持 Mistral 作为 LLM provider | 17（👍35） | 最高 👍 的功能请求，用户指出语音模型已集成、LLM 接入门槛低，长期未决 |

**诉求解读**：热点高度集中于"统一网关架构引发的会话归属/恢复断裂"，社区需要的是跨进程、跨端点的稳定会话生命周期；同时 provider 生态扩展（Mistral、MiniMax）呼声持续。

---

## 5. Bug 与稳定性（按严重度）

**P1**
- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban worker 在网关卡顿时批量崩溃（一次 4 个），WIP 丢失，可重复发生 — 暂无 fix PR
- [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) 更新失败留下半应用安装、无产品内恢复路径（一周 15 个 Discord 线程）— 相关缓解见 #147277/#147256（构建中止部分）
- [#79087](https://github.com/NousResearch/hermes-agent/issues/79087) Windows 探针超时将健康安装导入首次运行引导（报告者已更正"双后端"说法）
- [#112961](https://github.com/NousResearch/hermes-agent/issues/112961) Windows Desktop 主进程长 WS 会话中固定偏移 `0x5281f15` FAST_FAIL 崩溃 — awaiting-reporter

**P2**
- [#146643](https://github.com/NousResearch/hermes-agent/issues/146643)（新）网关每次变更重读全部会话历史，数千会话时占 1.5-2.5 核并导致 Desktop 30s 超时 — 性能问题，暂无 fix PR，**值得优先关注**
- [#143197](https://github.com/NousResearch/hermes-agent/issues/143197) v0.22.4 接受 `X-Hermes-Session-Key` 但不绑定，每次请求铸造新 `api-*` 会话
- [#138915](https://github.com/NousResearch/hermes-agent/issues/138915) 网关持有 state.db 时 Dashboard 批量操作 409
- [#99270](https://github.com/NousResearch/hermes-agent/issues/99270) MCP client 将数组参数逐项包成 `{item: …}`，破坏所有数组型工具调用 — 长期未修，影响面广
- [#91097](https://github.com/NousResearch/hermes-agent/issues/91097) Windows 计划任务无法重启网关 watchdog 退出（已有部分讨论）

---

## 6. 功能请求与路线图信号

- **会话排队机制**：[#144839](https://github.com/NousResearch/hermes-agent/pull/144839) 满载时排队而非拒绝（人优先于 cron/kanban）已提交，与 #20372（压缩风险时自动 fresh-session 交接）共同指向"长会话/多会话生命周期管理"这一路线方向。
- **显式项目模型**：[#147635](https://github.com/NousResearch/hermes-agent/pull/147635) 的 `project_id` 可能是下一版本会话模型的基础。
- **Mistral 支持**（[#20859](https://github.com/NousResearch/hermes-agent/issues/20859)，👍35）长期 `needs-decision`，尚无对应 PR，短期纳入概率低。
- **事件总线泛化**：[#49190](https://github.com/NousResearch/hermes-agent/issues/49190) 将 Kanban 通知泛化为通用事件基座——架构信号明显但决策未下。
- **内存写入审查**：[#131600](https://github.com/NousResearch/hermes-agent/pull/131600) Desktop 原生 diff 审查对话框已提交。

---

## 7. 用户反馈摘要

- **最大痛点：会话丢失/不可恢复**。远端桌面会话 resume 失败（#139818）、Kanban worker WIP 丢失（#145022）、API 会话 key 静默失效（#143197）共同指向"用户不信任长会话"。
- **Windows 体验明显落后**：更新半应用（#125437）、计划任务守护失效（#91097）、Desktop 崩溃（#112961）、引导误判（#79087）——Windows 用户挫败感集中。
- **重资产用户遇到扩展性墙**：数千会话的 store 出现 CPU/超时问题（#146643），说明重度用户（always-on 网关 + dashboard）已超出当前设计假设。
- **亮点反馈**：社区自我纠错质量高（#79087 报告者主动撤回错误结论）；AI 生成的 issue（#143918）附精确 file:line 引用与复现测试，报告质量在提升。
- **运营类小问题**：Android beta Firebase 测试名额已满（[#147269](https://github.com/NousResearch/hermes-agent/issues/147269)），影响新用户接入，建议运营侧尽快处理。

---

## 8. 待处理积压

| 项目 | 状态 | 建议 |
|---|---|---|
| [#99270](https://github.com/NousResearch/hermes-agent/issues/99270) MCP 数组参数包装 bug | 自 8/31 未修 | 影响 MCP 生态核心可用性，应优先排期 |
| [#20859](https://github.com/NousResearch/hermes-agent/issues/20859) Mistral 支持 | 5 月开，👍35，无决策 | 需要明确 accept/decline 决策 |
| [#63761](https://github.com/NousResearch/hermes-agent/issues/63761) QQ 群消息收不到 | 7 月开 | 平台事件格式变更，中国用户受影响 |
| [#67249](https://github.com/NousResearch/hermes-agent/issues/67249) `active_pr` respawn guard 无操作员覆盖 | 7 月开，needs-decision | 影响 Kanban 运维 |
| [#85117](https://github.com/NousResearch/hermes-agent/issues/85117) systemd 计时检查误报 stale unit | 8 月开 | 低成本修复候选 |
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) 上游权限错误 | blocked | 建议提交 GitHub Support 工单并置顶说明 |
| PR [#23396](https://github.com/NousResearch/hermes-agent/pull/23396) | 5 月开，无摘要 | 应关闭或要求补充说明 |

**健康度小结**：活跃度优秀、贡献管道充足，但 Issue 关闭率（24/476）与统一网关 fallout 的收口速度是当前健康度的两个关键风险指标，建议维护者优先处理 P1 稳定性聚类（Kanban 崩溃、网关性能）并加快 #143547 追踪帖中问题的批量清偿。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*