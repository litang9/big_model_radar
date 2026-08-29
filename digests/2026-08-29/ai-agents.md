# OpenClaw 生态日报 2026-08-29

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-08-29 02:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报

**日期：2026-08-29** | 数据来源：GitHub 过去 24 小时活动

---

## 1. 今日速览

OpenClaw 今日保持**极高活跃度**：24 小时内 Issues 更新达 500 条（新开/活跃 389，关闭 111），PR 更新达 500 条（待合并 219，已合并/关闭 281），并发布了 **v2026.9.1-beta.1** 测试版本，重心明显偏向 Gateway 可靠性。维护者 [@steipete](https://github.com/steipete) 今日密集提交了至少 7 个修复 PR，覆盖 macOS UI、Codex 集成、CI 效率等方向，且多数标注为 "AI-assisted implementation with independent Codex review"，显示项目已深度采用 AI 辅助开发流程。社区侧，**消息交付可靠性（Telegram/WhatsApp 最终回复静默丢失）** 仍是讨论最集中、情绪最强烈的痛点，多条 P1 相关 Issue 长期处于 `clawsweeper:needs-product-decision` 状态。整体判断：项目处于快速迭代期，开发吞吐健康，但高优先级稳定性积压（尤其 3 月提出的 P0/P1）值得警惕。

---

## 2. 版本发布

### [v2026.9.1-beta.1](https://github.com/openclaw/openclaw/releases) — 2026-08-29

**Highlights（来自 Release Notes）**

| 特性 | 说明 |
|---|---|
| **Gateway restart recovery** | 跨多次 Gateway 重启保留已 admitted 的 turns，使 restart-safe 运行能穿过每个 checkpoint 继续执行并交付最终响应（#130491，感谢 @jalehman） |
| **Gateway config-write reliability** | 保障已提交配置的写入可靠性（摘要被截断，建议查看完整 Release Notes） |

**迁移注意事项**
- ⚠️ 此为 **beta 通道**版本，非 stable，生产环境（尤其运行 2026.5.x/2026.6.x 的部署）不建议直接跟进，可参考 #123799 中生产用户的观望诉求。
- 发布配套 PR：[#130731 chore(release): prepare 2026.9.1-beta.1](https://github.com/openclaw/openclaw/pull/130731)（XL 体量，涉及全通道/全扩展标签）、[#128371 fix(release): authorize focused beta evidence](https://github.com/openclaw/openclaw/pull/128371)（已关闭，解决发布验证阻塞）。
- 本次 release notes 未列出破坏性变更，但 Gateway 重启恢复语义变更涉及会话状态，升级前建议备份会话数据。

---

## 3. 项目进展

### 今日已关闭的重要 PR（按主题归类）

**🔐 安全管控落地（值得关注的里程碑）**
- [#116489 feat(security): require acknowledgement for install policy warnings](https://github.com/openclaw/openclaw/pull/116489) — CLI 侧：可疑插件/技能安装需操作员显式确认目标名称
- [#120900 feat(ui): review install policy warnings](https://github.com/openclaw/openclaw/pull/120900) — Control UI 侧：管理员可审查并主动放行安装策略警告

两个配套 PR 同期关闭，标志着**插件安装安全审查闭环**基本成型。

**🖥️ UI/会话体验**
- [#128995 feat: make full session actions available from chat header](https://github.com/openclaw/openclaw/pull/128995) — 聊天头部支持置顶/标记未读/复制会话 ID/分组
- [#123535 fix(ui): avoid session catalog refresh storms](https://github.com/openclaw/openclaw/pull/123535) — 消除侧栏会话目录冗余全量刷新风暴
- [#131829 fix(ui): show Codex node approvals in the controlling chat](https://github.com/openclaw/openclaw/pull/131829) — Codex 云端/配对节点审批内联显示，不再只进全局收件箱
- [#132250 fix(presence): keep colliding profiles and raw viewers separate](https://github.com/openclaw/openclaw/pull/132250) — 修复实时 presence 命名空间冲突

**⚙️ 基础设施与 CLI**
- [#123975 fix(scripts): clean up tsgo process trees on timeout or signal](https://github.com/openclaw/openclaw/pull/123975) — tsgo 卡死进程树清理 + 可选超时看门狗
- [#128223 fix(cli): resolve alias targets from the write snapshot](https://github.com/openclaw/openclaw/pull/128223) — 模型别名解析修复
- [#132279 fix(daemon): explain unsafe service publication failures](https://github.com/openclaw/openclaw/pull/132279) — 不再隐藏目录权限错误细节

### 待维护者审查的高价值 PR（👀 ready for maintainer look）

- [#130993 fix: Responses sessions compact before reaching context limit](https://github.com/openclaw/openclaw/pull/130993)（P1）— 一次性修复 OpenAI Responses 长会话压缩管线的 **6 处失败**，含上下文边界重复计算
- [#131973 fix(bug): restart-sentinel wake runs consume queued system events](https://github.com/openclaw/openclaw/pull/131973)（P1）— 与今日 beta 版的 Gateway 重启主题直接呼应
- [#130958 fix(auto-reply): preserve channel context in command prompts](https://github.com/openclaw/openclaw/pull/130958)（P2，含 telegram-e2e 证明）— 关闭 3 月老 Issue #20837
- [#132255 fix(ui): Desktop does not follow the chat session machine](https://github.com/openclaw/openclaw/pull/132255)、[#132179 fix(ui): chat stays blocked after model credentials recover](https://github.com/openclaw/openclaw/pull/132179)（P1，XL）— @steipete 今日提交的桌面端体验修复

**进展评估**：今日单日关闭 281 个 PR 更新 + 安全特性成型 + 压缩管线大修进入审查，**会话状态可靠性与 UI 完成度两条主线均有实质推进**。

---

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#42475 网关级每代理成本预算](https://github.com/openclaw/openclaw/issues/42475) | 💬 23 | 运营者要求在 Gateway 派发模型调用前强制执行日/月成本上限，防止失控开销，摆脱外部监控依赖。项目已有 `session-cost-usage.ts` 单会话成本追踪，用户要求升级为**预算硬约束** |
| [#87744 Codex-backed Telegram 轮次超时](https://github.com/openclaw/openclaw/issues/87744) | 💬 18 👍 4 | 升级 2026.5.27 后，Codex 后端的 Telegram 轮次反复工作却永不到达 `turn/completed`，用户拿不到最终答案 |
| [#68596 可配置流式看门狗超时](https://github.com/openclaw/openclaw/issues/68596) | 💬 15 👍 8 | kimi-k2.5 / DeepSeek-R1 等深度推理模型的 30s 无流警告被频繁误触发，用户要求阈值可配置。**与今日 PR [#132276 fix(codex): honor thinking off](https://github.com/openclaw/openclaw/pull/132276) 主题高度相关**，可能被纳入下一版本 |
| [#96834 WhatsApp 入站图像阻塞主通道](https://github.com/openclaw/openclaw/issues/96834) | 💬 15 | 1:1 会话发图后消息通道卡死约 3 分钟才开始处理，多模态运行滞留工作队列 |
| [#87561 跨通道持久最终回退交付语义](https://github.com/openclaw/openclaw/issues/87561) | 💬 13 | **维护者 @osolmaz 发起的顶层设计议题**：定义"兜底错误消息必须可证明送达"的语义，是多个消息丢失 Issue 的总纲 |
| [#51429 硬编码工作路径 /Users/wangtao](https://github.com/openclaw/openclaw/issues/51429) | 💬 12 | 中文用户报告新装版本自动创建 `/Users/wangtao` 并设为工作区——严重伤害信任的发布事故，且至今未关闭 |

**热点解读**：社区情绪集中在两件事——**"干了活但用户收不到答案"**（交付语义）与**"跑得太多但刹不住车"**（成本控制）。前者已有维护者顶层设计 Issue，后者尚无对应 PR，是明显的产品决策缺口。

---

## 5. Bug 与稳定性

### 🔴 P0（当前仅 1 条，且无 fix PR）
- [#39305 子代理停滞升级恢复（nudge → kill）](https://github.com/openclaw/openclaw/issues/39305) — 自 2026-03-08 开放至今，子代理可无限期卡在 "running"，现有 `runTimeoutSeconds` 无法区分活跃与停滞

### 🟠 P1 — 消息丢失/会话状态簇（本日活跃重点，多数无 fix PR）
- [#87744](https://github.com/openclaw/openclaw/issues/87744) Codex Telegram 超时 · 无 fix PR · `needs-product-decision`
- [#96834](https://github.com/openclaw/openclaw/issues/96834) WhatsApp 图像阻塞 · 无 fix PR · `needs-live-repro`
- [#128971](https://github.com/openclaw/openclaw/issues/128971) Telegram `delivery_ambiguous` 导致最终回复静默丢失 · 无 fix PR
- [#99910](https://github.com/openclaw/openclaw/issues/99910) Memory dreaming 运行卡死 Gateway 事件循环约 10 分钟 · 无 fix PR
- [#97616](https://github.com/openclaw/openclaw/issues/97616) hook/tool 僵儿子进程累积导致运行时退化 · 无 fix PR
- [#100941](https://github.com/openclaw/openclaw/issues/100941) 并行工具扇出时 WebSocket 1006 断连 + 误导性 "Gateway crashed" 报错 · 无 fix PR
- [#98435](https://github.com/openclaw/openclaw/issues/98435) Gateway 重启后 MCP loopback 不自动重连，`recovered=1` 具有误导性 · 无 fix PR
- [#89278](https://github.com/openclaw/openclaw/issues/89278) Codex OAuth 刷新 >10s 导致 cron/heartbeat 失败（回归）· 无 fix PR
- [#99586](https://github.com/openclaw/openclaw/issues/99586) 网关触碰操作后工具表面返回空白（回归）· 无 fix PR
- [#53540](https://github.com/opencl

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**日期：2026-08-29 | 样本项目：OpenClaw、Hermes Agent**

> 数据说明：本报告基于两份项目日报摘要；两份原始数据均有截断（OpenClaw 的 P1 列表、Hermes 的 PR 表未完整呈现），且两者的"PR 更新 500 条"疑似触及统计上限，解读时应视为量级参考而非精确值。

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道头部项目正处于**高速迭代与可靠性攻坚并存**的阶段：头部项目单日 Issue/PR 活动均达数百条量级，社区参与度处于第一梯队。竞争焦点已从功能堆叠转向**会话状态可靠性、消息交付语义、多网关架构**等基础设施级问题——两个项目不约而同地在此聚集 P1 级缺陷。同时，**AI 辅助开发流程已深度进入核心维护者的日常产出**（OpenClaw 维护者单日 7 个修复 PR 标注 AI-assisted），研发范式正在改变。通道侧，Telegram/WhatsApp 等消息渠道的端到端交付保障成为用户情绪最集中的战场；而评审吞吐能力开始成为新的瓶颈（Hermes 待合并 PR 积压 452 个）。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 389，关闭 111） | 377（新开/活跃 324，关闭 53） |
| Issue 关闭率 | **22.2%** | 14.1% |
| PR 更新（24h） | 500（待合并 219，合并/关闭 281） | 500（待合并 452，合并/关闭 48） |
| PR 待合并 : 已关闭 比 | 1 : 1.28 | **9.4 : 1** |
| Release | ✅ 今日发布 v2026.9.1-beta.1（Gateway 可靠性主题） | ❌ 无（最新为 8 月中旬 v0.20.x，主干已领先） |
| 里程碑事件 | 插件安装安全审查闭环成型 | Desktop 多网关持久连接 campaign 完成（29 PR 全合并） |
| 健康度评估 | 🟡 **高吞吐、发布节奏健康**；但 P0 自 3 月悬置、P1 消息丢失簇缺 fix PR，产品决策债积压 | 🟡 **架构推进快、回归响应快**（同日回归 24h 内修复）；但 PR 评审严重积压（452 待合并）、发布滞后主干，`risk-session-state` 风险标签聚集 |

**核心结论**：两项目活动量同级，但**运转效率分化明显**——OpenClaw 的评审吞吐与发布节奏显著优于 Hermes；Hermes 以 campaign 模式（29 PR 集中攻坚）换取架构推进速度，代价是评审队列失衡。

---

## 3. OpenClaw 在生态中的定位

**优势（相对 Hermes Agent）**
- **交付效率**：单日关闭 281 个 PR 更新（Hermes 仅 48），待合并/已关闭比 1:1.28，评审管线通畅；
- **发布节奏**：beta 通道持续输出（今日 v2026.9.1-beta.1 聚焦 Gateway 重启恢复），修复到用户的链路短；
- **流程现代化**：核心维护者深度采用 "AI 辅助实现 + 独立 Codex 审查" 模式，单日 7 个修复 PR 的产出强度是同类项目难以匹敌的；
- **治理成熟度**：插件安装安全审查闭环（CLI + Control UI 双侧）落地；维护者主动发起顶层设计议题（#87561 交付语义总纲），显示产品决策机制在运转。

**技术路线差异**
- OpenClaw：**Gateway 中心化调度**架构，强调多通道（Telegram/WhatsApp）消息交付、插件/技能生态、Codex 云端节点集成，面向"常驻服务型"个人助理；
- Hermes：**Desktop 优先**路线，主打多网关持久连接、skills curator、Windows 安装器/shim 链路，偏"本地桌面型"智能体。

**社区规模与风险**
- 社区声量同级（均属第一梯队），但 OpenClaw 的 Issue 关闭率（22.2% vs 14.1%）显示社区消化能力更强；
- 隐忧：#51429 硬编码 `/Users/wangtao` 路径事故至今未关闭，对中文用户群体的信任伤害是同类项目中罕见的**发布质量事故**；多条 P1 长期 `needs-product-decision` 表明社区诉求向产品决策的传导存在延迟。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与证据 |
|---|---|---|
| **会话状态可靠性** | 两者（生态最强共振） | OpenClaw：`delivery_ambiguous` 静默丢失（#128971）、Gateway 重启恢复（今日 beta 主打）；Hermes：多个 P1 携带 `risk-session-state` 标签 |
| **Gateway/多网关架构** | 两者 | OpenClaw：restart-safe checkpoint 跨重启续跑（#130491）；Hermes：29 PR 的多网关持久连接 campaign（#94724） |
| **上下文压缩管线** | 两者 | OpenClaw：Responses 长会话压缩 6 处失败一次性修复（#130993）；Hermes：压缩时剥离过期 todo 快照（#97613）——均在解决"压缩引入的状态污染" |
| **安全边界管控** | 两者 | OpenClaw：插件安装策略警告审查闭环；Hermes：阻断 curator terminal 绕过归档守卫（#97609，P1） |
| **深度推理模型适配** | OpenClaw（生态信号） | #68596 要求流式看门狗超时可配置（kimi-k2.5/DeepSeek-R1 误触发），#132276 honor thinking off——推理型模型正在倒逼 Agent 基础设施改造 |
| **成本治理** | OpenClaw（生态缺口） | #42475 要求网关级日/月预算硬约束，**尚无对应 PR**，是两项目中唯一无工程响应的高热度运营诉求 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| **功能侧重** | 多通道消息交付保障、Gateway 调度、插件/技能生态 + 安全审查、Control UI 管理面 | Desktop 持久连接、skills 管理体系、跨平台安装链路（Windows shim/更新锁） |
| **目标用户** | 通过 Telegram/WhatsApp 等通道**常驻运行**个人助理的运营者；需要成本管控、多节点审批的进阶部署者 | 以**桌面端**为主要交互界面的本地用户；重视安装/更新体验的跨平台用户

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-08-29** | 数据来源：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

Hermes Agent 今日保持**高强度活跃**：过去 24 小时 Issues 更新 377 条（新开/活跃 324，关闭 53），PR 更新 500 条（待合并 452，已合并/关闭 48），社区热度在 AI Agent 开源项目中属于第一梯队。**今日无新版本发布**（最新版本仍为 8 月中旬的 v0.20.x 系列）。最重要的里程碑是 [#94724](https://github.com/NousResearch/hermes-agent/issues/94724) **Desktop 多网关持久连接攻坚campaign 宣告完成（29 个 PR 合并）**，但伴随的两次同日回归（如启动超时）已修复。当前项目健康度的主要隐忧：**session 状态可靠性问题聚集**（多个 P1 携带 `risk-session-state` 标签）以及 **PR 积压达 452 个**，评审吞吐明显承压。

---

## 2. 版本发布

今日无新版本发布，本节省略。（注：多个 Issue 引用 v0.20.2/v0.20.4，推测主干已领先于最新发布版，存在一波未发布的修复待出。）

---

## 3. 项目进展

### 3.1 里程碑：Desktop 多网关持久连接攻坚完成
- [#94724](https://github.com/NousResearch/hermes-agent/issues/94724) **正式关闭**：**29 个 PR 全部合并**，覆盖 Desktop 持久多网关连接、会话/配置档案等子系统；campaign 期间出现 2 次同日回归均已修复，15 个待 salvage 集群全部交付。这是近期 Desktop 端最大规模的一次架构级推进。
- 但该 campaign 引入的回归余波仍在消化：[#96282](https://github.com/NousResearch/hermes-agent/issues/96282)（commit `6d4e851d8` stdout 重定向导致 Desktop 启动超时，P1）**已在 24 小时内关闭**，响应速度值得肯定。

### 3.2 今日新增 PR（2026-08-29 创建，共 9 个）
| PR | 内容 | 意义 |
|---|---|---|
| [#97609](https://github.com/NousResearch/hermes-agent/pull/97609) | fix(curator): 阻止 terminal 绕过归档守卫（P1） | 修复 skills curator 绕过 `skill_manage` 守护路径的安全边界问题 |
| [#97613](https://github.com/NousResearch/hermes-agent/pull/97613) | fix(compression): 剥离多模态消息中嵌入的过期 todo 快照 | 上下文压缩边界的静默状态累积修复 |
| [#97590](https://github.com/NousResearch/hermes-agent/pull/97590) | fix(update): Windows shim 交接期间保持更新锁 | 安装/更新链路修复 |
| [#97612](https://github.com/NousResearch/hermes-agent/pull/97612) | 新

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*