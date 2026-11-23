# OpenClaw 生态日报 2026-11-23

> Issues: 392 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-23 00:49 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-23

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时共有 392 条 Issue 更新（新开/活跃 317，关闭 75）和 500 条 PR 更新（待合并 294，已合并/关闭 206），无新版本发布。PR 侧活动以大量 roboclaw-bot 自动化提交的 Web UI/ macOS 体验修复为主，今日新开 PR 密集且多为中小体量修复。Issue 侧热点集中在 session 生命周期、消息丢失和更新迁移三大主题，多个 P0 级问题（含 ux-release-blocker 标签）仍处于打开状态，稳定性债务值得关注。

## 2. 版本发布

今日无新版本发布。最近的稳定版仍为 v2026.11.6（由 #141474 关闭评论确认）。

## 3. 项目进展

今日可见的 PR 更新中，关闭/推进的代表性工作包括：

- **#203694**（已关闭）[fix: open new chats without a Home parent](https://github.com/openclaw/openclaw/pull/203694) — 修复新会话被错误挂到 Home 父节点、产生多余面包屑并回传活动的问题。
- **#203642**（已关闭）[fix: keep approval history in place while revoking a standing grant](https://github.com/openclaw/openclaw/pull/203642) — 修复移动端撤销授权时按钮变宽导致审批历史被顶下移的 UI 问题。
- **#203667 / #203670 / #203650**（均已关闭）— 一批键盘可达性与触控目标尺寸的 Web UI 可用性修复，均由 roboclaw-bot 完成并附带截图证明。
- **#191620**（已关闭）[fix(models): avoid redundant catalog normalization](https://github.com/openclaw/openclaw/pull/191620) — 分配分析显示 URL 解析占候选版本 11.4% 的分配开销，此 PR 消除了 catalog 刷新中的重复解析，属性能优化。

整体看，今日推进以**用户体验打磨 + 性能微优化 + CI/测试基础设施**（#203839 统一 gateway fixture 进程所有权，L 级）为主，无重大架构落地，但为下一版本的质量基础持续铺路。

## 4. 社区热点

按评论数排序的今日最活跃讨论：

1. **[#150635](https://github.com/openclaw/openclaw/issues/150635)（30 评论）**：短期记忆召回存储夜间逐出已召回条目，导致 dreaming deep phase 永远无法晋升条目（512 条上限被打满零召回条目）。标记 impact:data-loss，等待产品决策。
2. **[#182891](https://github.com/openclaw/openclaw/issues/182891)（26 评论）**：P1 — prompt cache 在每次请求上都 dropped N→0，从不复用，涉及 envelope 重写与 runtimeContextCarrier 变化。直接推高用户 API 成本，是成本敏感型用户的核心痛点。
3. **[#200606](https://github.com/openclaw/openclaw/issues/200606)（21 评论）**：2026.11.5 候选 Doctor 因插件迁移义务冲突与 `changed=[]` 阻塞 2026.11.3→2026.11.5 更新。与 #200224、#187917、#144739 共同构成**更新/迁移可靠性**这一持续热点主题。
4. **[#141474](https://github.com/openclaw/openclaw/issues/141474)（19 评论，已关闭）**：collector 子进程 sessions_yield 卡死问题确认已随 v2026.11.5/11.6 修复并回归通过，是本月生命周期修复的正面信号。
5. **[#155563](https://github.com/openclaw/openclaw/issues/155563)（18 评论）**：2026.9.5 回归 — agent turn 完成后 service-child relay/anchor 与 MCP 组仍被保留，指向资源清理不彻底。
6. **[#192632](https://github.com/openclaw/openclaw/issues/192632)（16 评论）**：功能请求 — Claude 服务端 web_search 作为新的搜索 provider，社区对多搜索后端组合的需求明显。
7. **[#125764](https://github.com/openclaw/openclaw/issues/125764)（16 评论）**：Telegram 出站消息网络失败一次即永久死信，announce/完成回复静默丢失，与 #112313（死信队列永久化、无任何清理路径）呼应。

## 5. Bug 与稳定性

按严重程度排列（P0 优先）：

**P0 / release-blocker：**

| Issue | 问题 | Fix PR |
|---|---|---|
| [#158912](https://github.com/openclaw/openclaw/issues/158912) | 2026.9.6 起 MEMORY.md 不再注入 bootstrap，文档仍声称会加载；影响 session-state + security | ❌ 暂无 |
| [#190563](https://github.com/openclaw/openclaw/issues/190563) | 无法恢复暂停的 Codex 会话："Provider review no longer matches the native thread" | ❌ 暂无 |
| [#146860](https://github.com/openclaw/openclaw/issues/146860) | Windows 计划任务 InteractiveToken 模式下托管更新 handoff 永远拿不到进程身份，最终 abandoned | ❌ 暂无 |
| [#201468](https://github.com/openclaw/openclaw/issues/201468) | macOS 启动告警对 CLI 拒绝 schema 迁移给出泛化凭据恢复指引（已有 linked PR open） | 🔶 有关联 PR |

**P1 回归类：**

- [#196199](https://github.com/openclaw/openclaw/issues/196199) — 2026.10.10 起原生 Codex helper 完成后无法唤醒父会话，goals 暂停、用户被锁在助手外（约每启动一个 helper 失败一次，发生率高）。
- [#170928](https://github.com/openclaw/openclaw/issues/170928) — Windows 2026.10.2 gateway 需 7–9 分钟才就绪，且就绪后间歇无响应。
- [#166641](https://github.com/openclaw/openclaw/issues/166641) — web_fetch 冷回退在 Gateway 主线程同步加载无关插件，造成 liveness 停顿（有 V8 CPU profile 佐证，linked PR open）。

**P2 稳定性：**

- [#191476](https://github.com/openclaw/openclaw/issues/191476) — Matrix 房间因 consumer closed 竞态永久卡死。
- [#153899](https://github.com/openclaw/openclaw/issues/153899) — Gateway drain 等满 TimeoutStopSec（5m30s），定时器对已关闭资源持续触发。
- [#196505](https://github.com/openclaw/openclaw/issues/196505) — ~864 MiB 记忆语料索引因 worker 容量拒绝且不重试，永远无法完成。
- [#128140](https://github.com/openclaw/openclaw/issues/128140) — memory_search 工具固定 15s 超时，但 CLI 同功能正常。

**安全相关（需关注）：**

- [#202775](https://github.com/openclaw/openclaw/pull/202775)（PR）— Tlon 群组 DM 作者声明未认证，可能导致未批准输入进入 agent，已有修复 PR 待合并。
- [#202441](https://github.com/openclaw/openclaw/issues/202441) — 第三方 WS 通道需要公开 API 将传输权限与 post-ACK 工作解耦。

## 6. 功能请求与路线图信号

- **Claude web_search provider**（[#192632](https://github.com/openclaw/openclaw/issues/192632)）：请求量大（16 评论、diamond lobster 评级），与现有 Gemini/Perplexity provider 架构对齐，实现路径清晰，属高概率纳入项。
- **Active Memory 升级决策插件化**（[#151178](https://github.com/openclaw/openclaw/issues/151178)）：已有 linked PR open，配合 #150635 的召回/晋升问题，可能随记忆子系统重构一并落地。
- **GitHub 集成迁移为插件**（[PR #192350](https://github.com/openclaw/openclaw/pull/192350)，XL）：把 GitHub 仓库集成移入 `github-repositories` 插件，依赖 #192349 的 SDK 基础，是当前最大的架构性变更信号——项目在向"核心 + 插件化生态"方向演进。
- **sessions_send 准入边界**（[PR #194376](https://github.com/openclaw/openclaw/pull/194376)，XL）：为并发 wake 流量增加 gateway 级准入与限流，直接回应 #195279/#166964 一类权限失效导致的投递失败。
- 其他：NO_REPLY 可选静默（#195397）、Talk 语音回执开关（#184803）、Workboard 卡片操作 verb（#182463）——多为小体量产品决策项，由 roboclaw-bot 高吞吐消化的模式看，此类请求实现周期在缩短。

## 7. 用户反馈摘要

- **成本焦虑**：#182891（cache 永不复用）与 #130257（ACP 子任务花费 $14.14 完全无法归因，父任务只记 $0.04）反映重度用户对**token 成本可观测性**的强烈不满。
- **"静默失败"是最大痛点**：多条高热 Issue（#125764 Telegram 死信、#112313 死信不可清理、#144876 Dashboard 无回复、#175167 iOS 语音永不转写）共同特征是——失败无错误、无告警、无重试，用户只能靠日志考古。#175167 已关闭，说明此类问题在被逐个处理。
- **运维体验**：更新迁移（#200606、#200224、#187917、#144739）是稳定版用户升级的主要摩擦点；#190307 用户配置 35 个 agent、最大 284MB 单库，提示重度多 agent 部署场景正在出现，对 gateway 重启恢复（degraded 状态）提出更高要求。
- **正面信号**：#141474 用户在确认修复后主动更新 Issue 说明修复已随稳定版发布并验证回归通过，社区与维护者的协作闭环质量较高。

## 8. 待处理积压

以下高影响 Issue 长期未获修复 PR，建议维护者优先关注：

- **[#112313](https://github.com/openclaw/openclaw/issues/112313)**（7 月 21 日开，P2，data-loss 风险）— 死信队列永久化无任何清理/重试路径，是多个消息丢失 Issue 的根因级问题。
- **[#125764](https://github.com/openclaw/openclaw/issues/125764)**（8 月 18 日，P1，message-loss）— Telegram 单次尝试即死信，fix-shape-clear 已标注但仍无 fix PR。
- **[#158912](https://github.com/openclaw/openclaw/issues/158912)**（9 月 26 日，P0）— MEMORY.md 不注入但文档未更新，属"文档与现实背离"的信任损耗项。
- **[#146860](https://github.com/openclaw/openclaw/issues/146860)**（9 月 13 日，P0）— Windows 更新 handoff 卡死，阻塞 Windows 生产用户升级。
- **[#128140](https://github.com/openclaw/openclaw/issues/128140)**（8 月 23 日，P1）— memory_search 工具超时，needs-info 状态停滞。
- **[#130257](https://github.com/openclaw/openclaw/issues/130257)**（8 月 26 日）— 子任务成本不可归因，阻碍企业/重度用户采用。
- **PR 积压**：待合并 294 个，其中 XL 级架构 PR（#192350、#194376）已挂起两周以上，且 #194376 触及几乎所有渠道与插件标签，合并窗口与回归风险需要维护者给出明确排期。

---

**健康度小结**：项目处于高吞吐、快速迭代阶段，bug 修复节奏（75 Issue 关闭/日）与新增速度（317 活跃/日）基本匹配，但 P0 级 session-state 与更新可靠性问题的积压时长（部分超过 3 个月）是当前主要风险点；插件化架构迁移（#192350/#194376）的落地将是下一阶段的关键里程碑。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告
**报告日期：2026-11-23**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态当前处于**高吞吐、强社区驱动的快速演化期**：单项目日均 Issue/PR 活动量达数百条，外部贡献者持续涌入，社区协作闭环质量较高。技术主线正从“单体助手”向**“核心网关 + 插件化生态 + 多渠道接入”**的架构收敛，两个头部项目（OpenClaw、Hermes Agent）均在推进统一网关与插件化迁移。与此同时，**稳定性债务成为共性挑战**——session 生命周期、升级迁移链路、静默失败类问题积压时长普遍超过 3 个月，反映出迭代速度与质量保障之间的张力。记忆子系统（长期记忆治理、召回、压缩）成为新的架构竞争焦点。

---

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 392（活跃 317 / 关闭 75） | 289（活跃 282 / 关闭 **7**） |
| PR 更新（24h） | 500（待合并 294 / 合并关闭 206） | 500（待合并 331 / 合并关闭 169） |
| Issue 净流量 | 新增：关闭 ≈ **4.2 : 1** | 新增：关闭 ≈ **40 : 1** ⚠️ |
| Release | 无（稳定版 v2026.11.6） | 无 |
| P0/Release-blocker | 4 个 P0 打开（含 2 个无 fix PR） | 无显式 P0，但 P1 升级链问题高频（#132820 本周 7 起） |
| 自动化程度 | roboclaw-bot 高吞吐消化中小 PR | 堆叠 PR 栈 + 分阶段 RFC 工程模式 |
| 健康度评估 | 🟡 高吞吐快速迭代，P0 积压 3 个月+ | 🔴 社区热度极高但维护吞吐严重承压 |

**关键判断**：两者 PR 活动量相当，但 OpenClaw 的 Issue 消化能力（75 关闭/日）显著优于 Hermes（7 关闭/日），Hermes 的积压呈加速扩大趋势，是当前最突出的健康度风险。

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **吞吐闭环能力**：Issue 关闭节奏与新增基本可匹配（75/317），且存在用户主动确认修复并回归验证的正向闭环（#141474），社区信任度较高。
- **自动化修复管线**：roboclaw-bot 承担大量中小型 UI/可访问性修复并附截图证明，使小体量功能请求实现周期明显缩短。
- **性能工程深度**：具备分配分析驱动的微优化能力（#191620 定位 URL 解析占 11.4% 分配开销），工程成熟度高。

**技术路线差异：**
- OpenClaw 的插件化迁移（#192350 将 GitHub 集成移入独立插件、#194376 网关级准入限流）路径更激进，直接向“核心 + 插件生态”演进；Hermes 则聚焦**统一网关收权**（#106742 将所有本地会话收归单一 gateway）后再做插件抽取（Honcho 抽取等）。
- Hermes 在工程方法论上更重 RFC 与堆叠 PR 栈（RE2 正则迁移、Doc-chain RFC）；OpenClaw 更依赖自动化 bot + 产品决策快速落地。

**社区规模对比**：Issue 编号量级相近（均达 19 万+ PR 编号），社区体量相当；OpenClaw 讨论热点更偏用户体验与成本（prompt cache、token 归因），Hermes 更偏架构演进与多端融合。

---

## 4. 共同关注的技术方向

| 技术方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **统一网关与会话生命周期** | session 生命周期 P0（#158912、#190563）、sessions_send 准入限流（PR #194376） | #106742 统一网关合并后回归追踪（85 评论）、#143547/#145171 入口收敛 | 多渠道/多端会话收归单一网关进程的稳定性收尾 |
| **长期记忆治理** | #150635（召回条目夜间逐出致晋升失败）、#151178（记忆升级决策插件化）、#196505（索引容量拒绝） | #143379 Doc-chain RFC（压缩后持久记录治理）、#31584（记忆上下文降权防注入） | 记忆从“存储”走向“可治理、可溯源、可降权”的子系统 |
| **升级/安装链可靠性** | #200606/#200224/#187917 更新迁移阻塞、#146860 Windows handoff 卡死 | #132820（matrix 构建劫持 update）、#138974（Windows ACL）、#126913（macOS launchd） | 跨平台自更新是两项目最高频的用户摩擦点 |
| **消息投递可靠性 / 死信治理** | #125764 Telegram 死信、#112313 死信队列永久化 | #95670 Discord 投递面受损、#148531 owner-backfill 409 | “静默失败无重试无告警”是共性痛点 |
| **成本与错误可观测性** | #182891（cache 永不复用）、#130257（子任务成本不可归因） | #158061/#155305（报错误导） | 重度用户对 token 成本归因和准确诊断的强烈需求 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| **功能侧重** | 多渠道消息（Telegram/Matrix/Tlon）、Workboard、Talk 语音、记忆子系统（MEMORY.md/dreaming）等**产品化个人助手**特性 | Desktop workspace、Kanban auto-decomposer、多 Profile/多端、cron 调度等**开发者/重度用户的自主工作台**特性 |
| **目标用户** | 成本敏感的个人助手用户 + 逐步出现的企业/重度多 agent 部署（35 agent / 284MB 单库） | 贡献者生态活跃的技术型用户、多端/多 Profile 重度场景、多人共享部署诉求（RBAC） |
| **技术架构** | 核心 + 插件化（github-repositories 插件、搜索 provider 抽象）、roboclaw-bot 自动化管线 | 单一 gateway 进程权威、堆叠 PR 栈、RE2 线性时间正则等**底层工程重构**优先 |
| **风险面** | P0 session-state 与文档-现实背离（#158912）损耗信任 | 安全边界问题（#29849 cron 跨后端执行）+ 维护吞吐瓶颈 |

---

## 6. 社区热度与成熟度

- **快速迭代 + 质量并行阶段（🟡）— OpenClaw**：高吞吐迭代（317 活跃 Issue/日）但修复节奏基本跟得上；无新版本发布期间仍在为下一版本铺质量基础。部分 P0 积压超 3 个月是主要减分项。
- **高速增长 + 消化承压阶段（🔴）— Hermes Agent**：社区热度极高（85 评论级追踪帖、外部贡献持续涌入），但 282:7 的 Issue 净流入表明维护带宽已明显不足；多个 1-2 个月悬置的大 PR 存在主干漂移风险。
- 两项目均处于**架构转型深水区**（插件化 / 统一网关），转型落地质量将决定下一阶段分层。

---

## 7. 值得关注的趋势信号

1. **“网关 + 插件”成为个人助手的事实架构标准**：两项目独立收敛到同一方向（OpenClaw #192350/#194376、Hermes #106742/#143547）。对开发者的启示：渠道集成与工具能力应尽早设计为插件形态，避免核心耦合。
2. **记忆治理是下一个竞争高地**：从存储（MEMORY.md）演进到召回/晋升/压实/溯源/注入防护的完整治理栈。Doc-chain 类 RFC 与降权设计（#31584）值得 AI 记忆系统设计者跟踪。
3. **静默失败零容忍**：用户最大抱怨不是功能缺失，而是“无错误、无告警、无重试”的失败模式。投递层可观测性与死信治理应作为 AI 智能体基础设施的一级需求。
4. **成本可观测性决定企业采用**：prompt cache 复用、子任务 token 归因是重度/企业用户的硬门槛，成本透明度将成为差异化能力。
5. **自更新链路是开源桌面智能体的隐形杀手**：两项目最高频运维抱怨均集中在升级迁移，建议将更新原子性、回滚、平台差异隔离作为发布工程重点。
6. **自动化贡献管线提升社区吞吐**：roboclaw-bot 模式证明中小型修复可被自动化消化，人力可聚焦架构决策——这对资源有限的开源 AI 项目具有直接借鉴价值。

---

**总结**：OpenClaw 与 Hermes Agent 代表了个人 AI 助手生态的两条并行路线——前者以自动化管线驱动产品化快速迭代，后者以 RFC/堆叠栈驱动的架构深耕换长期工程红利。短期看 OpenClaw 健康度更优；Hermes 若不能缓解 40:1 的 Issue 净流入，高社区热度可能转化为流失风险。两者的共同课题是：在架构转型落地前，控制 P0 级稳定性债务的进一步累积。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目日报 · 2026-11-23

## 1. 今日速览

- 项目维持**高度活跃**状态：过去 24 小时 Issues 更新 289 条（新开/活跃 282，仅关闭 7），PR 更新 500 条（待合并 331，已合并/关闭 169），无新版本发布。
- 社区贡献持续涌入，今日新提交的 PR 多为外部贡献者的修复（Windows CLI、Slack 投递、Groq 推理参数等），生态活力强。
- 核心焦点仍集中在 **统一网关架构（#106742）落地后的稳定性收尾**，Desktop 会话渲染重复、会话修订冲突等衍生问题持续发酵。
- Issue 关闭数（7）远低于新增数（282），**积压呈扩大趋势**，维护者吞吐能力值得关注。

## 2. 版本发布

今日无新版本发布，无迁移注意事项。

## 3. 项目进展

今日 PR 活动以**存量大型分支的持续推进**为主，以下为关键脉络：

| 方向 | 代表 PR | 进展意义 |
|---|---|---|
| RE2 正则迁移 | [#158717](https://github.com/NousResearch/hermes-agent/pull/158717)（hermes_re 门面层 + doctor 检查）、[#158719](https://github.com/NousResearch/hermes-agent/pull/158719)（消除 import 期正则匹配，S2b 阶段） | 多阶段迁移计划正按 D24 决策稳步推进，为可预测的线性时间正则奠定基础 |
| Desktop 重设计 | [#152168](https://github.com/NousResearch/hermes-agent/pull/152168) | 9+ 分支的大型 stack 集成，包含全新 agent workspace 与经典恢复路径，11-09 开放至今持续更新 |
| 会话流修复 | [#158912](https://github.com/NousResearch/hermes-agent/pull/158912) | 通过存储行配对修复 Desktop 重复渲染（对应 issue #127665 一类），是近期最痛的 UI bug 修复之一 |
| 停止原因可视化 | [#138011](https://github.com/NousResearch/hermes-agent/pull/138011) | 统一 stop/Why 技术栈，覆盖 5 个分支主题，提升中断可解释性 |
| 错误诊断改进 | [#158061](https://github.com/NousResearch/hermes-agent/pull/158061)（provider 安全拒绝不再误报为 API key 错误）、[#155305](https://github.com/NousResearch/hermes-agent/pull/155305)（长会话压缩 400 处理） | 系统性改善报错准确性，移植自 opencode 的经验 |
| Windows/macOS 安装链 | [#159042](https://github.com/NousResearch/hermes-agent/pull/159042)、[#155810](https://github.com/NousResearch/hermes-agent/pull/155810)、[#126913](https://github.com/NousResearch/hermes-agent/pull/126913) | 三大平台的 update 安装链均有修复在途 |

**整体评估**：169 条 PR 合并/关闭表明主干推进速度尚可，但 331 条待合并（含多个堆叠 PR 栈）意味着 review 带宽是当前瓶颈。

## 4. 社区热点

1. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（85 评论）— 统一网关合并后问题追踪**：#106742 将所有本地会话收归单一 gateway 进程后的回归问题汇总帖，是全项目讨论最热烈的 issue，社区在集中反馈 CLI/TUI/Desktop/API/编辑器/消息机器人/cron/Kanban 的融合缺陷。
2. **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（71 评论）— API 创建 PR 权限被拒**：特定账号 fork→上游 PR 持续失败，issue 创建可用，疑为平台/上游权限问题（标记 `blocked` / `cause/upstream`），阻塞了贡献者的修复提交。
3. **[#127665](https://github.com/NousResearch/hermes-agent/issues/127665)（60 评论）— Desktop 回复重复渲染**：与 #127288 同症状但走不同代码路径，用户在已修复 build 上仍可复现，直接催生了 PR #158912。
4. **[#143379](https://github.com/NousResearch/hermes-agent/issues/143379)（39 评论）— Doc-chain RFC**：关于压缩后持久记录的读取、治理与压实的设计讨论，反映社区对**长期记忆与溯源**的架构关切。
5. **[#155595](https://github.com/NousResearch/hermes-agent/issues/155595)（21 评论）— Profile 生命周期战役追踪**：涵盖网关所有权恢复、共享配置、克隆安全、Honcho 抽取等，是理解项目 roadmap 的关键帖。

## 5. Bug 与稳定性

按严重程度排列：

| 级别 | Issue | 摘要 | Fix 状态 |
|---|---|---|---|
| P1 | [#95670](https://github.com/NousResearch/hermes-agent/issues/95670) | Discord handoff 线程未指定 type，默认 private_thread，消息投递面受损 | 未见对应 PR |
| P1 | [#132820](https://github.com/NousResearch/hermes-agent/issues/132820) | matrix extra 的 libolm 原生构建失败导致整个 `hermes update` 中断且无法退出，本周 7 起 | 未见对应 PR，痛点聚类 |
| P2 | [#151582](https://github.com/NousResearch/hermes-agent/issues/151582) | 会话删除/重命名永久 409 revision_conflict（内存与 DB 修订计数双源失步） | 待修 |
| P2 | [#156709](https://github.com/NousResearch/hermes-agent/issues/156709) | FooteredReply 破坏 `copy.deepcopy`，启用 runtime footer 即触发发布失败 | 待修 |
| P2 | [#127665](https://github.com/NousResearch/hermes-agent/issues/127665) | Desktop 重复渲染 | ✅ [#158912](https://github.com/NousResearch/hermes-agent/pull/158912) 在审 |
| P2 | [#29849](https://github.com/NousResearch/hermes-agent/issues/29849) | `no_agent=True` cron 忽略 terminal.backend，在调度器本地执行（安全边界风险） | 待修，标记 needs-decision |
| P2 | [#75444](https://github.com/NousResearch/hermes-agent/issues/75444) / [#79728](https://github.com/NousResearch/hermes-agent/issues/79728) | Kanban auto-decomposer 重复分解已阻塞任务，造成无限弹跳/重复工作 | [#152538](https://github.com/NousResearch/hermes-agent/pull/152538) 部分覆盖（持久化失败隔离） |
| P2 | [#41219](https://github.com/NousResearch/hermes-agent/issues/41219) | Windows 首次崩溃后 gateway 事件循环 30-60s 内确定性死锁 | 待修，长期悬置 |
| P2 | [#54572](https://github.com/NousResearch/hermes-agent/issues/54572) | patch 工具模糊匹配可改错区域 | 待修 |
| P3 | [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) | 见社区热点 | 上游阻塞 |

## 6. 功能请求与路线图信号

- **网关 RBAC（[#3897](https://github.com/NousResearch/hermes-agent/issues/3897)，👍4）**：多人共享 Telegram bot 场景下的按用户工具限制。随统一网关推进（#143547、#145171 入口收敛），实现条件日趋成熟，是最可能被纳入下一阶段的社区需求。
- **记忆上下文降权（[#31584](https://github.com/NousResearch/hermes-agent/issues/31584)）**：要求将 memory-context 作为背景而非权威用户消息，涉及提示注入安全面，与 #143379 Doc-chain RFC 同属记忆治理主题，存在合并设计空间。
- **压缩后技能重注入（[#86421](https://github.com/NousResearch/hermes-agent/issues/86421)）**：#84718 提案的最高优先级子项，等待独立 review，与 #155305（长会话压缩）同属 compression 攻坚线。
- **Profile 生命周期（[#155595](https://github.com/NousResearch/hermes-agent/issues/155595)）** 与 **入口切换到网关会话权威（[#145171](https://github.com/NousResearch/hermes-agent/issues/145171)）** 是官方 tracking issue，代表明确 roadmap。

## 7. 用户反馈摘要

**痛点**：
- **升级链脆弱**是跨平台最高频抱怨：Linux 上 matrix extra 原生构建劫持整个 update（#132820）；Windows ACL 继承破坏致 Desktop 无法启动（#138974）；macOS launchd 定义过期致 update 退出 1（#126913）。
- **报错误导性强**：安全拒绝被报成 API key 错误（#158061）、"too big" 400 被报成请求畸形（#155305），用户排障成本高——社区已自发修复，说明这是普遍体验。
- **多 Profile / 多端场景问题集中**：multiplexing 后日志停止写入（#141958）、模型切换后 resume 走旧 provider（#146345）、split 拓扑下 owner-backfill 409（#148531）。
- **Windows Desktop 性能**：会话切换阻塞主进程约 4 秒（#151348）。

**满意点**：贡献者对堆叠 PR、分阶段 RFC（RE2 迁移、Doc-chain）的工程严谨性反应积极；外部插件生态（plugin-catalog）更新频繁且流程顺畅。

## 8. 待处理积压

| 条目 | 悬置时长 | 风险提示 |
|---|---|---|
| [#3897](https://github.com/NousResearch/hermes-agent/issues/3897) RBAC | ~8 个月（2026-03 起） | 👍 最高功能请求，长期无决策将流失共享部署用户 |
| [#41219](https://github.com/NousResearch/hermes-agent/issues/41219) Windows 死锁 | ~5.5 个月 | Windows 稳定性口碑受损 |
| [#29849](https://github.com/NousResearch/hermes-agent/issues/29849) cron 脚本跨后端执行 | ~6 个月 | **安全边界**风险（标记 risk-security-boundary），建议优先 |
| [#31584](https://github.com/NousResearch/hermes-agent/issues/31584) 记忆权威性 | ~6 个月 | 潜在提示注入面 |
| [#126913](https://github.com/NousResearch/hermes-agent/pull/126913) | 开放近 2 个月的 PR | review 债务 |
| [#122988](https://github.com/NousResearch/hermes-agent/pull/122988)、[#138011](https://github.com/NousResearch/hermes-agent/pull/138011) | 开放 1 个月+ 的大 PR | 涉及会话状态核心路径，久拖易与主干漂移 |

**健康度总评**：🔴 Issue 净流入显著（282 新 vs 7 关闭），社区热度极高但维护吞吐承压；建议优先清理安全边界类（#29849）与升级链（#132820）积压，并加快堆叠 PR 栈的 review 节奏。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*