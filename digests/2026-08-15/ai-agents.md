# OpenClaw 生态日报 2026-08-15

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-08-14 20:43 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# 📰 OpenClaw 项目日报

**报告日期：** 2026-08-15（数据窗口：2026-08-14）
**项目地址：** [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)

---

## 1️⃣ 今日速览

过去 24 小时 OpenClaw 保持了**极高活跃度**：Issue 侧 500 条更新（474 条新开/活跃，仅 26 条关闭），PR 侧 500 条更新（421 条待合并，79 条已合并/关闭），今日无新版本发布。社区讨论焦点集中在**会话状态可靠性（session-state / message-loss）与安全边界加固**两条主线上，维护者（@steipete 等）当日提交了多个网关与安装器修复 PR。需要关注的是健康度信号：Issue 关闭比约 18:1、PR 积压比约 5.3:1，大量高优先级 Issue 处于 `needs-maintainer-review` / `needs-product-decision` 状态，**维护者评审带宽是当前最大瓶颈**。

| 指标 | 数值 | 环比信号 |
|---|---|---|
| Issue 新开/活跃 | 474 | 🔴 远超关闭量 |
| Issue 关闭 | 26 | 积压持续增长 |
| PR 待合并 | 421 | 🟡 队列较长 |
| PR 合并/关闭 | 79 | 🟢 吞吐尚可 |
| 新版本发布 | 0 | — |

---

## 2️⃣ 版本发布

今日无新 Release。近期版本线参考：stable 约为 2026.7.x，beta 通道推进至 `2026.7.2-beta.x`（参见冷启动回归 Issue [#119087](https://github.com/openclaw/openclaw/issues/119087)）。多个 Issue 引用 2026.6.x 的 SQLite 迁移行为，提示 6.x → 7.x 升级路径仍是用户摩擦集中区。

---

## 3️⃣ 项目进展

### 今日已合并/关闭的代表性 PR

- **[#116489](https://github.com/openclaw/openclaw/pull/116489)** `feat(security): require acknowledgement for install policy warnings`（XL, P2，安全边界）— 外部 `security.installPolicy` 命令现可返回 `warn`，允许操作员在安装可疑插件/技能前进行确认审查。CLI 侧落地后，配套 UI 审查界面 [#120900](https://github.com/openclaw/openclaw/pull/120900) 仍在评审中——**插件安全审查工作流正在成体系推进**。
- **[#123817](https://github.com/openclaw/openclaw/pull/123817)** `fix: Linux installer reports success after build tools fail to install`（当日提交当日关闭）— 修复 Linux 安装器在构建工具安装失败时误报成功的误导性输出，提升安装可靠性。
- **[#123742](https://github.com/openclaw/openclaw/pull/123742)** `fix(approvals): sanitize plugin titles and exec paths at the creation boundary`（当日关闭）— 在创建边界对插件审批的 title/description/exec 路径做消毒，封堵未转义内容流入渠道消息、iOS 锁屏推送与 Web 弹窗的注入面。

### 推进中的重点 PR（当日活跃）

- **[#123718](https://github.com/openclaw/openclaw/pull/123718)** `fix(ui): fork active sessions from stable history`（P1）— 修复 Agent 工作期间 fork 会话被后端拒绝的问题，引入稳定边界 + 转录复制。
- **[#123816](https://github.com/openclaw/openclaw/pull/123816)** `fix: prevent sqlite commands from opening live state`（P1）— 阻止外部 `sqlite3` 进程加入活跃 WAL 生命周期，防数据库损坏，呼应 database-first 运行时架构。
- **[#123785](https://github.com/openclaw/openclaw/pull/123785)** `fix(gateway): retire worker placements without sessions`（P1）— 清理无主 worker placement 残留行，防止隐形环境驻留。
- **[#119886](https://github.com/openclaw/openclaw/pull/119886)** `fix(slack): mention detection stays disabled forever after transient auth.test failure`（P1）— 修复 Slack 启动时一次瞬时鉴权失败导致提及检测永久失效的可用性问题。
- **[#123585](https://github.com/openclaw/openclaw/pull/123585)** `fix(acp): run session/new prompts in the requested cwd`（P1）— ACP 客户端指定工作目录将真正生效，改善 IDE/CLI 集成体验。
- 基础设施优化：[#123821](https://github.com/openclaw/openclaw/pull/123821)（测试复用 LAN 配对网关降本）、[#123819](https://github.com/openclaw/openclaw/pull/123819)（移除过时 QR 测试套件）。

**整体评估：** 今日 79 个 PR 合并/关闭，安全加固与网关会话稳定性是明确主线；配合 421 个在途 PR，项目处于**高节奏迭代但评审排队严重**的阶段。

---

## 4️⃣ 社区热点

| Issue | 评论 | 核心诉求 |
|---|---|---|
| [#7707](https://github.com/openclaw/openclaw/issues/7707) Memory Trust Tagging by Source | **50** | 按 memory 来源（用户命令/网页抓取/第三方技能）打信任标签，防御 **memory 投毒攻击** |
| [#51429](https://github.com/openclaw/openclaw/issues/51429) 工作路径被 hardcode | 14 | 用户安装最新版后发现工作区被设为 `/Users/wangtao`——有人把个人路径硬编码进代码且被合并发布，社区对**代码审查流程漏检**的担忧升温 |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) 重复转录/回放/上下文组装 Umbrella（维护者） | 14 | 官方汇总 MSTeams/webchat/Telegram/followup 队列等跨渠道的同类消息重复类 Bug，**从个案修复转向系统性治理** |
| [#79902](https://github.com/openclaw/openclaw/issues/79902) SQLite transcript/session seams | 13 | 在 database-first 运行时上提供面向高级消费者的官方 SQLite 接缝，避免抓取不透明 blob |
| [#50093](https://github.com/openclaw/openclaw/issues/50093) WhatsApp 断线后回填丢失消息 | 13 | 网关重连成功但离线窗口内的消息**静默丢失**，监控场景痛点强烈 |

**解读：** 评论量第一的安全议题（#7707）与今日合并的插件安全审查 PR（#116489）形成呼应——**"不可信内容进入 Agent 上下文"已成为社区最关切的攻击面**。#51429 的硬编码事件虽属个案，但与自动化审查标签（`clawsweeper:needs-security-review`）的普及形成微妙对照，值得维护者在流程层面回应。

---

## 5️⃣ Bug 与稳定性

### 🔴 P0 / 发布阻断

- **[#70903](https://github.com/openclaw/openclaw/issues/70903)** 供应商 402 计费错误后，文件级 `disabledUntil` 冷却时间跨重启持久化，**用户充值后仍被封锁数小时**（标记 `stale`，`impact:ux-release-blocker`，未见 fix PR）⚠️ 建议优先处理

### 🟠 P1 · 会话状态 / 数据丢失（部分已有 fix PR）

| Issue | 问题 | Fix PR |
|---|---|---|
| [#86684](https://github.com/openclaw/openclaw/issues/86684) | 回归：`sessions_yield` 子代理唤醒时，父分支在上下文占用仅 ~6% 时被误压缩 | ✅ linked PR |
| [#90944](https://github.com/openclaw/openclaw/issues/90944) | `sessions_yield` 恢复回复已记录但未投递，用户收到的是子代理原始摘要 | ✅ linked PR |
| [#80498](https://github.com/openclaw/openclaw/issues/80498) | 子代理完成通知过早/重复，任务状态不可靠 | ❌ |
| [#47975](https://github.com/openclaw/openclaw/issues/47975) | 子代理完成后会话残留，主会话无响应 | ❌ |
| [#95553](https://github.com/openclaw/openclaw/issues/95553) | preflight 压缩被硬性 ~60s 截断，忽略 `compaction.timeoutSeconds` | ❌ |

### 🟠 P1 · 渠道投递 / 集成

- [#41744](https://github.com/openclaw/openclaw/issues/41744) Feishu `read` 工具读取的图片在最终出站前丢失媒体（✅ linked PR）
- [#77685](https://github.com/openclaw/openclaw/issues/77685) Feishu 流式卡片多 Bug 叠加：最终文本丢失/陈旧内容/重复（❌）
- [#114211](https://github.com/openclaw/openclaw/issues/114211) Matrix 房间代理自维持循环 + 重启后回放陈旧会话状态（❌）
- [#85251](https://github.com/openclaw/openclaw/issues/85251) Codex app-server 发出 `turn/started` 后静默，嵌入运行卡满 360s 恢复窗口（❌；相关 PR [#106519](https://github.com/openclaw/openclaw/pull/106519) 处理 websocket 握手无界等待）

### 🟠 P1 · 升级 / 迁移 / 性能

- [#119087](https://github.com/openclaw/openclaw/issues/119087) 回归：`2026.7.1-beta.1 → 2026.7.2-beta.7` 网关冷启动耗时 **2.5x**（1-vCPU 容器）（✅ linked PR）
- [#90378](https://github.com/openclaw/openclaw/issues/90378) 5.28→6.1 升级 cron 存储静默迁至 SQLite 且新任务默认 `delivery.mode=announce` 引发渠道报错（✅ linked PR）
- [#85844](https://github.com/openclaw/openclaw/issues/85844) 自动更新后运行中网关仍引用已删除的旧哈希 bundle 文件（❌）
- [#91931](https://github.com/openclaw/openclaw/issues/91931) 预置 SOUL/IDENTITY 文件导致 bootstrap 提前完成并**删除用户提供的 BOOTSTRAP.md**（✅ linked PR）
- [#90098](https://github.com/openclaw/openclaw/issues/90098) 大附件触发 `RangeError: Maximum call stack`（✅ linked PR）

### 🟡 P2 · 值得关注

- [#91223](https://github.com/openclaw/openclaw/issues/91223) 开启 active-memory 插件后 **prompt cache 命中率 99.9% → 22%**，成本影响显著
- [#44134](https://github.com/openclaw/openclaw/issues/44134) 工具 Schema 频繁重载触发 Google Antigravity 反滥用误判**封号**——外部供应商关系风险
- [#74378](https://github.com/openclaw/openclaw/issues/74378) Windows 上 CLI 进程执行后以 `node.exe` 僵尸态驻留（回归）
- [#119796](https://github.com/openclaw/openclaw/issues/119796) Windows vitest teardown `EBUSY` 无法释放 agent SQLite 句柄（✅ linked PR）
- [#119401](https://github.com/openclaw/openclaw/issues/119401) 回归：DM 场景 `NO_REPLY` 无条件剥离，小/本地模型无法强制可见回复

**稳定性结论：** 今日活跃 Bug 高度聚集于**子代理生命周期与消息投递链路**，官方 Umbrella #69208 的建立表明团队已识别其系统性根源；多数 P1 已有 linked PR，但 P0 #70903 仍无修复动议。

---

## 6️⃣ 功能请求与路线图信号

结合 Issue 呼声与在途 PR，可识别以下路线图信号：

1. **安全信任分级（强信号）**：[#7707](https://github.com/openclaw/openclaw/issues/7707)（memory 信任标签）+ 今日落地的插件安装策略审查（#116489/#120900/#123742）+ SQLite 活跃状态防护（#123816）——"不可信输入边界"是当前最活跃的开发方向，memory 分级大概率被纳入规划。
2. **压缩自主化与精细化（中强信号）**：[#6757](https://github.com/openclaw/openclaw/issues/6757)（Agent 自触发压缩工具）、[#48238](https://github.com/openclaw/openclaw/issues/48238)（循环感知压缩守卫）与压缩相关的一批 P1 修复（#86684/#95553）同源，预计随压缩子系统重构一并解决。
3. **database-first 运行时开放接缝（中信号）**：[#79902](https://github.com/openclaw/openclaw/issues/79902)（SQLite transcript/session seams）与 cron 迁移、SQLite 安全 PR 方向一致，"可编程运行时状态"是架构演进主线。
4. **渠道能力补齐（社区驱动）**：Slack Modal 交互式工作流 [#88154](https://github.com/openclaw/openclaw/issues/88154)、Discord 消息编辑/删除事件 [#53654](https://github.com/openclaw/openclaw/issues/53654)、Telegram 引用回复一等契约 [#88032](https://github.com/openclaw/openclaw/issues/88032)、A2A 单向派发模式 [#44309](https://github.com/openclaw/openclaw/issues/44309)。
5. **发布质量流程（官方信号）**：维护者 Issue [#118785](https://github.com/openclaw/openclaw/issues/118785)（容器与外部 App SDK 的 primary QA 证明）显示团队正在为大批新集成建立发布前 QA 门禁——下一版本可能伴随较大规模渠道/SDK 阵容扩张。

---

## 7️⃣ 用户反馈摘要

**核心痛点（按出现频次与标签分布推断）：**

- **消息丢失是第一大痛点**：`impact:message-loss` 标签几乎遍布高优先级 Issue——WhatsApp 断线消息静默丢失（#50093）、Feishu 流式卡片丢最终文本（#77685）、`sessions_yield` 回复未投递（#90944），用户明确表示"丢失一条监控告警都不可接受"。
- **Token 成本焦虑**：bootstrap 文件每轮重注入浪费 20-30% 上下文（[#67419](https://github.com/openclaw/openclaw/issues/67419)）、active-memory 插件打崩 prompt cache（#91223），对长会话重度用户是真实的账单问题。
- **升级如闯关**：5.28→6.1 cron 静默迁移（#90378）、launchd stderr 被丢弃（#90711）、beta 通道冷启动翻倍（#119087），"升级前先看 Issue 区"成为社区默契。
- **本地/第三方模型用户处于二线体验**：Ollama `payloads=0`（[#101445](https://github.com/openclaw/openclaw/issues/101445)）、DeepSeek V4 Flash 不完整回合（[#88657](https://github.com/openclaw/openclaw/issues/88657)）、Google Antigravity 封号（#44134），非 Anthropic/OpenAI 官方链路的兼容性摩擦集中。
- **Windows 支持偏弱**：僵尸进程（#74378）、EBUSY 锁库（#119796）持续被报告。

**正面信号：**

- ClawSweeper 自动化分诊体系（评级、needs-review 标签、proof 要求）运转成熟，Issue 质量与可复现性显著高于同规模项目；
- 社区贡献活跃且深入（当日多个外部 P1 修复 PR），甚至出现 **Agent 自主提交的功能请求**（[#6757](https://github.com/openclaw/openclaw/issues/6757) 由 OpenClaw agent "Wyatt" 调研后自行 filing），侧面印证产品在真实 agentic 场景中的深度使用。

---

## 8️⃣ 待处理积压

### ⚠️ 高优先级长期未解 Issue（建议维护者关注）

| Issue | 创建 | 状态信号 |
|---|---|---|
| [#70903](https://github.com/openclaw/openclaw/issues/70903) **P0** 供应商冷却锁死用户 | 04-24 | `stale`，无 fix PR，影响付费用户可用性 |
| [#53540](https://github.com/openclaw/openclaw/issues/53540) P1 大参数工具调用超时误报"断网" | 03-24 | 无 fix PR，影响长输出模型 |
| [#7707](https://github.com/openclaw/openclaw/issues/7707) Memory 信任标签 | 02-03 | 50 条评论， awaiting product decision |
| [#6625](https://github.com/openclaw/openclaw/issues/6625) 子代理优雅超时 | 02-01 | 超时即杀、工作全丢，数据丢失类诉求 |
| [#6757](https://github.com/openclaw/openclaw/issues/6757) Agent 自主压缩 | 02-02 | 与压缩子系统重构强相关 |
| [#41744](https://github.com/openclaw/openclaw/issues/41744) Feishu 图片丢失 | 03-10 | linked PR 长期未合并 |
| [#30381](https://github.com/openclaw/openclaw/issues/30381) chatCompletions 忽略 agent-id 头 | 03-01 | 兼容性 API 行为争议 |

### ⚠️ 疑似搁置的 PR（`stale` / 长期 needs proof）

- [#93247](https://github.com/openclaw/openclaw/pull/93247) P1 诊断空闲状态修复（06-15 起 `stale`）
- [#109493](https://github.com/openclaw/openclaw/pull/109493) P1 XL 云 worker 工作区恢复（07-17 起）
- [#107179](https://github.com/openclaw/openclaw/pull/107179) P1 渠道流式草稿节流（07-14 起）
- [#106529](https://github.com/openclaw/openclaw/pull/106529) / [#106519](https://github.com/openclaw/openclaw/pull/106519) WhatsApp 媒体下载与 Codex 握手超时（07-13 起）

**积

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析

**报告日期：** 2026-08-15 ｜ **数据窗口：** 2026-08-14

> ⚠️ **数据完整性说明：** 本期仅收到 OpenClaw 的完整日报，Hermes Agent（NousResearch）栏目内容为空。本报告以 OpenClaw 为深度样本展开生态级分析，涉及 Hermes Agent 的量化对比项均标注“数据缺失”，不做推测性填充；待其数据补充后可迭代本报告。

---

## 1️⃣ 生态全景

个人 AI 助手/自主智能体开源生态已从“能力演示期”整体迈入“生产可靠性攻坚期”——头部项目的社区讨论焦点从“能不能跑”转向会话状态可靠性、消息投递语义与安全信任边界。多渠道接入（WhatsApp/Slack/飞书/Telegram/Matrix/IDE）成为事实上的标配战场，而渠道越多，消息丢失、重复投递、状态回放类 Bug 越是系统性爆发。与此同时，“不可信内容进入 Agent 上下文”（memory 投毒、恶意插件、注入）正在取代传统漏洞成为新的安全叙事核心。Token 成本与 prompt cache 劣化让长会话重度用户产生真实账单焦虑，压缩与上下文管理从优化项升格为架构项。所有高活跃项目共同面临的隐形天花板是**维护者评审带宽**——需求流入速度已系统性超过人工处理能力，自动化分诊与 Agent 辅助贡献开始承担基础设施角色。

---

## 2️⃣ 各项目活跃度对比

| 项目 | Issue 新开/活跃 | Issue 关闭 | PR 在途 | PR 合并/关闭 | Release | 健康度评估 |
|---|---|---|---|---|---|---|
| **OpenClaw** | 474 | 26（关闭比 ≈18:1） | 421（积压比 ≈5.3:1） | 79 | 0 | 🟡 **超高活跃 + 评审带宽告急**：需求流入远超消化能力，P0 长期未解（#70903），大量高优 Issue 停留在 needs-maintainer-review |
| **Hermes Agent** | 数据缺失 | 数据缺失 | 数据缺失 | 数据缺失 | 数据缺失 | 无法评估 |

**派生指标（OpenClaw 单日）：**
- Issue 日关闭率 ≈ 5.2%（26/500），积压净增长约 448 条/日
- PR 日合并吞吐 79 条属第一梯队，但在途队列 421 条意味着平均评审周期被显著拉长
- 修复响应能力尚可：多个 P1 Issue 已有 linked PR，当日提交的安装器/审批消毒修复当日关闭

*结论：单一数据源下无法排名，本表作为基线，供后续多项目同窗对比。*

---

## 3️⃣ OpenClaw 在生态中的定位

**核心定位：** 多渠道、网关中心、插件生态型的“个人 AI 助手运行时”，而非单一模型演示框架或极简 CLI agent。

**相对优势（对照生态典型形态）：**
1. **架构纵深** —— database-first 运行时（SQLite WAL 生命周期管理，见 #123816、#79902）领先于常见文件态/黑盒 blob 方案，正在向“可编程运行时状态”演进；
2. **安全工程体系化** —— 插件安装策略 warn/acknowledge 工作流（#116489/#120900）、创建边界消毒（#123742）与 memory 信任标签议题（#7707，50 条评论居首）形成完整的“不可信输入边界”叙事；
3. **社区质量与自组织** —— ClawSweeper 自动分诊成熟，外部贡献者当日提交 P1 级修复，甚至出现 Agent 自主 filing 功能请求（#6757），社区深度使用证据充分；
4. **渠道覆盖广度** —— MSTeams/Matrix/飞书/WhatsApp/Slack/ACP/IDE 一线通吃，并正为大規模 SDK 阵容建立 QA 门禁（#118785）。

**技术路线差异：** 以网关 + worker placement 为中心的状态管理，与模型厂商主导的 agent 框架（强调模型-智能体协同设计）和轻量 CLI 工具（强调本地单会话）形成三向分化。

**社区规模：** 单日 Issue/PR 更新各 500 条的吞吐处于生态头部区间；但规模本身已成为负担（见健康度）。

**明显短板：** 升级路径摩擦（5.28→6.1 cron 静默迁移 #90378、beta 冷启动 2.5x #119087）、Windows 二线体验、本地/第三方模型兼容性弱于官方链路。

---

## 4️⃣ 共同关注的技术方向

*本期仅 OpenClaw 数据可佐证，以下按生态级议题框架归纳（Hermes Agent 是否同样涉及待数据验证）：*

| 方向 | 证据（OpenClaw） | 生态判断 |
|---|---|---|
| **安全信任分级** | memory 来源信任标签 #7707；插件安装审查 #116489；路径/标题消毒 #123742 | "不可信内容进入上下文”是当前最活跃攻击面，信任标签大概率成标配 |
| **消息投递保证** | 跨渠道重复 Umbrella #69208；WhatsApp 断线静默丢失 #50093；`sessions_yield` 未投递 #90944 | 监控/告警场景要求 at-least-once 语义，投递保证正成为选型硬指标 |
| **压缩与上下文经济** | Agent 自触发压缩 #6757；循环感知守卫 #48238；误压缩回归 #86684 | prompt cache 命中率崩塌（#91223：99.9%→22%）证明 token 成本已是架构问题 |
| **database-first 开放接缝** | SQLite transcript/session seams #79902；活跃状态防护 #123816 | 从黑盒状态走向可编程、可查询的运行时状态 |
| **多渠道一等契约** | Slack Modal #88154；Discord 编辑/删除事件 #53654；Telegram 引用回复 #88032；A2A 单向派发 #44309 | 渠道能力补齐由社区驱动，长尾渠道是差异化来源 |
| **发布质量门禁** | 容器/SDK QA 证明 #118785；升级迁移类 P1 集中爆发 | 升级可靠性直接决定用户留存 |

---

## 5️⃣ 差异化定位分析

| 维度 | OpenClaw | Hermes Agent（待验证） |
|---|---|---|
| **功能侧重** | 常驻个人助手运行时：多渠道接入 + 插件/技能生态 + 子代理编排 | 数据缺失；按厂商背景推测偏模型-智能体协同设计，需数据验证 |
| **目标用户** | 自托管高级用户、需要 7×24 多渠道在场（含监控告警）的重度场景、IDE/CLI 集成开发者 | 数据缺失 |
| **技术架构** | 网关中心 + database-first（SQLite WAL）+ worker placement + ACP/兼容 API | 数据缺失 |
| **成熟度信号** | 快速迭代期，正通过 Umbrella 治理与 QA 门禁向质量巩固过渡 | 数据缺失 |

---

## 6️⃣ 社区热度与成熟度

- **OpenClaw：快速迭代 → 质量巩固的转型期。** 吞吐量（79 PR/日）证明迭代速度，Umbrella Issue（#69208）与 QA 门禁（#118785）的建立是治理成熟的信号；但 18:1 的 Issue 关闭比、

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>



</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*