# OpenClaw 生态日报 2026-11-12

> Issues: 478 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-12 01:53 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-12

## 1. 今日速览

OpenClaw 今日保持高度活跃：过去 24 小时 Issue 更新 478 条（新开/活跃 268、关闭 210），PR 更新 500 条（待合并 314、已合并/关闭 186），并发布 1 个 beta 版本 **v2026.11.5-beta.2**。从标签分布看，**稳定性仍是当前主战场**——P0/P1 级 Bug 集中在 Gateway 启动性能、SQLite 状态库、消息丢失（message-loss）三大方向。社区贡献热度高，@steipete 今日一天内连发多个 Gateway 性能修复 PR，是当前最活跃的核心维护者。整体健康度：**中上**——修复吞吐（关闭 210 条 Issue / 186 条 PR）与新增量基本匹配，但多个 P0 长期未修复形成积压。

---

## 2. 版本发布

### v2026.11.5-beta.2
- **Highlights**：
  - **大型会话分页浏览**：历史记录支持双向分页、可见历史边界、有界归档读取（#188450 #188483 #188557 #188372 #190690），由 @steipete 主导，@xydt-tanshanshan 协助。这直接回应了长期存在的会话历史加载性能问题。
  - **macOS 应用保留已保存的 secrets**（修复了升级/重启导致凭据丢失的问题）。
- **破坏性变更**：本版本说明中未明确列出。
- **迁移注意**：beta 版本，不建议生产环境直接升级；若使用 PostgreSQL 状态库，注意 #197425 提到的 "Template bootstrap 前创建的 PostgreSQL state 会被判定为 schema drift 而拒绝" 的兼容问题。

---

## 3. 项目进展

今日 PR 活动以 Gateway 事件循环稳定性与状态层修复为主，方向明确：

**Gateway 性能与阻塞修复（@steipete 集中产出）**
- [#197455](https://github.com/openclaw/openclaw/pull/197455) 修复请求在锁轮询上同步阻塞的问题——直接关联 P0 Bug #160959（Gateway 捕获大型外部插件时阻塞数分钟）。
- [#197446](https://github.com/openclaw/openclaw/pull/197446) 避免 warm database borrower 的同步文件系统查询阻塞 Gateway 线程。
- [#197457](https://github.com/openclaw/openclaw/pull/197457) 缩短有活跃命令需清理时的 Gateway 重启时间。
- [#197301](https://github.com/openclaw/openclaw/pull/197301)（XL）main 推进时预热线板模板，减少新会话启动延迟——针对 #168955 反映的启动回归方向。

**状态与恢复层**
- [#197425](https://github.com/openclaw/openclaw/pull/197425)（P1）拒绝将 #196392 之前创建的 PostgreSQL 状态识别为 schema drift，等待维护者审查。
- [#196706](https://github.com/openclaw/openclaw/pull/196706)（P1）修复 K8s fsGroup remount 后的私有状态存储（SQLite 凭据 + GitHub 身份 + Codex worker 配置），已 ready for maintainer。
- [#197427](https://github.com/openclaw/openclaw/pull/197427) 修复 RPC writer claim 后最终回复丢失恢复 custody（message-loss 方向）。

**安全相关**
- [#197118](https://github.com/openclaw/openclaw/pull/197118) 发布前拒绝带顶层 union 的工具 input schema（修复 claude-cli 400 错误导致整条 fallback 链烧尽）。
- [#197456](https://github.com/openclaw/openclaw/pull/197456)（XL）防止过期回复应答被复用的 question ID——涉及重连客户端的人机回答错配。

**产品功能**
- [#197421](https://github.com/openclaw/openclaw/pull/197421)（XL）macOS 端"一次 OpenClaw ID 审批完成节点 + 聊天 + 仪表盘配置"，大幅简化 Mac 端上手流程。
- [#196203](https://github.com/openclaw/openclaw/pull/196203)（XL）支持通过运行中的 Gateway 安装本地模板项目（`openclaw templates add ./my-template`）。
- [#197453](https://github.com/openclaw/openclaw/pull/197453) 新增显式有界 Deep Research 工作流（`$deep-research`）。

**整体评估**：今日 ~186 条 PR 合并/关闭，核心方向是“消除 Gateway 同步阻塞 + 状态库健壮性”，与 Issue 区最高频的痛点高度对齐，项目正系统性偿还 2026.9.x 插件捕获机制引入的技术债。

---

## 4. 社区热点

| Issue | 评论 | 状态 | 核心诉求 |
|---|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) Gateway 捕获大型外部插件时阻塞数分钟（P0） | **81** | OPEN | 2026.9.6 回归，插件捕获阻塞事件循环，影响所有使用大型插件依赖树的用户。今日 @steipete 的 #197455/#197446 正是直接回应 |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) WAL auto-checkpoint 从未完成 | **40** | OPEN | 状态库被进程内 reader 钉死，17k 帧 WAL 无法回收，反映底层 SQLite 会话管理的系统性问题 |
| [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows 启动慢/插件非正常关闭/schtasks 权限错误 | **31** | OPEN | Windows 托管安装用户"多次重试才能更新成功"，是 Windows 可靠性的代表性反馈 |
| [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 agent 永久不可用 | **28** | CLOSED | 已在 main 上无法复现关闭，但暴露了 reclamation checkpoint 的边界缺陷 |
| [#168955](https://github.com/openclaw/openclaw/issues/168955) 2026.10.1 启动回归：1030s vs 410s | **21** | OPEN | `sidecars.control-ui-assets` 阻塞 477s，启动性能回归让重度用户难以接受 |

**分析**：热点 Issue 高度集中于 **Gateway 性能/启动/状态库**，且多为 9-10 月遗留的回归问题。社区情绪偏“耐心但焦虑”——评论区持续提供详细诊断日志，等待维护者响应；好消息是本周 @steipete 的修复批次与这些热点明显一一对应。

---

## 5. Bug 与稳定性（按严重程度）

**P0**
- 🔴 [#160959](https://github.com/openclaw/openclaw/issues/160959) Gateway 事件循环阻塞数分钟（插件捕获回归）— **有对应修复方向**：[#197455](https://github.com/openclaw/openclaw/pull/197455)、[#197446](https://github.com/openclaw/openclaw/pull/197446)
- 🔴 [#146791](https://github.com/openclaw/openclaw/issues/146791) iOS App Store 版 (2026.9.2) 无法发布 APNs relay 注册，推送不可用 — 无 fix PR
- 🔴 [#178441](https://github.com/openclaw/openclaw/issues/178441) Owner Telegram 会话被 providerReview 卡死无恢复路径 — 无 fix PR
- 🔴 [#194664](https://github.com/openclaw/openclaw/issues/194664) (2026.11.1) Codex protected continuation 阻断所有后续消息 — 无 fix PR

**P1**
- 🟠 [#181432](https://github.com/openclaw/openclaw/issues/181432) 2026.10.5 基线内存 300MB → 1.9GB + SQLite 事务超时 → 崩溃循环
- 🟠 [#144809](https://github.com/openclaw/openclaw/issues/144809) claude-cli 长回合（超过 RUN_STALE_TAKEOVER_MS）**整条生成的回复被丢弃**（message-loss，钴龙虾级）
- 🟠 [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram 外发消息单次失败即死信，**无重试**，静默丢失高价值消息
- 🟠 [#145690](https://github.com/openclaw/openclaw/issues/145690) 子代理完成后模型运行时 generation 释放竞态 → 用户消息被误判为超时丢弃 — 相关：[#197335](https://github.com/openclaw/openclaw/pull/197335)
- 🟠 [#181662](https://github.com/openclaw/openclaw/issues/181662) npm 更新期间 Gateway 停机 ~19 分钟，且随版本递增恶化
- 🟠 [#191818](https://github.com/openclaw/openclaw/issues/191818) claude-cli "no recorded inference account" 自动化失败，请求 backport #180492
- 🟠 [#168101](https://github.com/openclaw/openclaw/issues/168101) 429 Retry-After 忽略 maxRetryDelayMs 上限，占用会话通道整个 sleep 时长

**今日关闭的稳定性修复**：#166634（恢复后 agent 不可用）、#164907（cron agentTurn "attempt disposed"）、#173095（UI 侧栏空白）、#179676（粘贴文本后续回合丢失，message-loss）——显示 11 月批次修复正在落地。

---

## 6. 功能请求与路线图信号

- **显式授权跨 provider cron fallback 账号**（[#192009](https://github.com/openclaw/openclaw/issues/192009)，钴龙虾级）：允许 cron 任务为 primary/fallback 模型分别绑定账号，解决主模型限额后 fallback 使用错误凭据的问题。产品决策待定，但与 #191818 的自动化鉴权问题同源，**很可能一起进入下一版本**。
- **memory 可配置逐条分块路径**（[#179954](https://github.com/openclaw/openclaw/issues/179954)）：扩展 MEMORY.md 之外的 curated 文件使用 per-entry chunking，已有 linked PR open。
- **原生 progress-card SDK + 可信插件准入**（[#176273](https://github.com/openclaw/openclaw/issues/176273)）：社区工作流插件诉求，涉及安全边界决策。
- **macOS 一键配置**（[#197421](https://github.com/openclaw/openclaw/pull/197421)）与**本地模板安装**（[#196203](https://github.com/openclaw/openclaw/pull/196203)）：均已在 PR 阶段，是下个版本 onboarding 体验的确定性改进。
- **Android 通知 QoL**（[#143387](https://github.com/openclaw/openclaw/issues/143387)）：跨设备抑制重复通知，长期 open，尚无 PR。

---

## 7. 用户反馈摘要

**痛点（按提及频率）**
1. **启动/更新太慢且不可靠**：Windows 用户（#170956、#168955）反复描述“每次更新都要试很多次”；npm 用户报告更新停机 19 分钟（#181662）。
2. **静默消息丢失最伤信任**：Telegram 单次失败即死信（#125764）、长回合回复全丢（#144809）、粘贴文本后续回合不可见（#179676）——用户明确表示“高价值消息无声丢失”不可接受。
3. **状态库黑箱**：WAL checkpoint、reclamation、schema drift 类问题让用户被迫手工操作 SQLite（#164294、#170562 请求官方 doctor 恢复路径）。
4. **插件生态钩子不够用**：开发者希望在 tool 结果之后注入上下文（#164355），认为现有扩展点限制了插件能力。

**满意点**
- 会话历史分页（beta.2）和 macOS secrets 保留直接命中用户长期反馈，评论区反响积极。
- Issue 模板和 clawsweeper 机器人自动分级（issue-rating、impact 标签）被社区认可为高质量的triage 体验。
- 用户诊断报告质量高（含完整日志、复现路径），显示社区技术参与度深。

---

## 8. 待处理积压（提醒维护者关注）

| 项目 | 状态 | 建议 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959)（P0，81 评论，9-29 提出） | 无专属 fix PR 关联 | 今日 #197455/#197446 主题相关，建议明确关联并验证是否完全覆盖 |
| [#146791](https://github.com/openclaw/openclaw/issues/146791)（P0 iOS APNs，9-13 提出） | 无响应近 2 个月 | App Store 版推送不可用，影响 iOS 用户体验核心路径 |
| [#178441](https://github.com/openclaw/openclaw/issues/178441)（P0 providerReview 卡死） | 无 fix PR | 缺少用户侧恢复手段，属 ux-release-blocker |
| [#125764](https://github.com/openclaw/openclaw/issues/125764)（P1 Telegram 死信，8-18 提出） | 长期 open | message-loss + 钴龙虾级评级，建议纳入近期修复批次 |
| [#91931](https://github.com/openclaw/openclaw/issues/91931)（P1 预置 SOUL.md 删除用户 BOOTSTRAP.md，6-10 提出） | 5 个月未解决 | 涉及**用户数据删除**（data-loss），应提级处理 |
| [#162585](https://github.com/openclaw/openclaw/issues/162585)（stale，Windows 插件 staging 不收敛，290MB → 612MB） | stale | Windows 大插件用户被卡在健康检查，疑似与 #160959 同根因 |
| PR [#140277](https://github.com/openclaw/openclaw/pull/140277)（Discord 代码块渲染，9-06 提出） | stale，needs proof | 社区贡献被搁置 2 个月，有流失风险 |

**积压风险提示**：stale 标签 + clawsweeper:needs-maintainer-review 组合的 Issue 数量偏多，建议维护者优先处理带 impact:message-loss / impact:data-loss 标签的长期未响应项。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析 — 2026-11-12

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入“基础设施成熟化”阶段：项目活跃度均处于高位（双项目单日 Issue/PR 更新均触及 500 条量级），但工程重心已从功能扩张转向**稳定性、安全性和长时运行可靠性**。两个头部项目（OpenClaw、Hermes Agent）均在偿还大重构（插件捕获机制、统一网关）带来的技术债，回归问题成为当前最大工程焦点。同时，**消息丢失（message-loss）、凭据/密钥隔离、更新链路可靠性**是跨项目的共性痛点，说明用户已将此类系统当作生产级常驻服务使用，容错要求对标传统基础设施软件。安全意识显著抬头（Hermes 的 sec-marathon 批次），多 agent、多租户、跨 provider 场景正成为主流用法。

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 478（新开/活跃 268，关闭 210） | 500（新开/活跃 451，关闭仅 49） |
| PR 更新（24h） | 500（待合并 314，合并/关闭 186） | 500（待合并 280，合并/关闭 220） |
| Release | ✅ v2026.11.5-beta.2 | ❌ 无（安全修复汇聚中） |
| 核心维护者产出 | @steipete 单日多个 Gateway 性能 PR | @c2h5oh sec-marathon 安全集群 |
| 最大热点 | #160959 Gateway 阻塞（P0，81 评论） | #143547 统一网关回归汇总（60 评论） |
| Issue 关闭率 | ~44%（210/478） | ~10%（49/500） |
| 健康度评估 | **中上**：修复吞吐与新增匹配，但 P0 积压（iOS APNs 2 个月无响应、data-loss 类 #91931 5 个月未决） | **中等偏下（消化期）**：451 新开 vs 49 关闭，280 PR 待审，网关重构回归未收敛 |
| 风险信号 | stale + needs-maintainer-review 积压；社区贡献 PR 被搁置（#140277） | Windows/更新链路长期积压；needs-decision 项决策缓慢（ACP 注册 5 个月） |

## 3. OpenClaw 在生态中的定位

- **优势**：发布节奏稳定（beta 版本持续推进，会话分页、macOS secrets 保留直接命中用户反馈）；核心维护者响应明确——今日修复批次（#197455/#197446/#197301）与 Issue 区最高频痛点一一对应；triage 体系（issue-rating、clawsweeper 机器人）被社区认可，修复吞吐（关闭 210 Issue）显著优于对照项目（49）。
- **技术路线差异**：OpenClaw 以 **Gateway 事件循环 + SQLite/PostgreSQL 状态层**为核心架构，当前主要精力在消除同步阻塞和状态库健壮性；产品化程度高（macOS/iOS/Android 客户端、模板生态、`$deep-research` 工作流），onboarding 体验是确定性投入方向（#197421、#196203）。
- **社区规模对比**：两者 Issue/PR 活动量级相当（均为 478-500 条/日），但 OpenClaw 的关闭率（44% vs 10%）显示维护带宽更充裕；Hermes 的新开 Issue 占比更高（90%），社区扩张更快但消化能力不足。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **消息/数据不丢失** | OpenClaw（#125764 Telegram 死信无重试、#144809 长回合回复全丢、#197427 custody 恢复）、Hermes（#154190 飞书话题消息丢失、#51058 会话串扰） | 消息传递需具备 custody/重试/恢复语义，静默丢失被用户视为信任底线 |
| **凭据与密钥隔离** | OpenClaw（macOS secrets 保留、#196706 状态存储）、Hermes（#82936 profile secrets 泄露、#153845 MCP 子进程泄露、#153645 凭据劫持） | 多 agent/多 profile 场景下的 secrets 边界是共性刚需，Hermes 已系统化响应（sec-marathon） |
| **长时运行资源管理** | OpenClaw（#164294 WAL 无法回收、#181432 内存 300MB→1.9GB）、Hermes（#96027 SQLite fd 泄漏 22 天 94 个、#121095 daemon 进程泄漏） | 常驻服务模式下，SQLite/文件描述符/子进程生命周期管理成为硬需求 |
| **更新/安装链路可靠性** | OpenClaw（#181662 更新停机 19 分钟、#170956 Windows 重试多次）、Hermes（#122239 UnicodeDecodeError、#122656 无限重建循环、#69889 venv 重建丢包） | 自更新机制是跨平台最密集的痛点聚集地 |
| **记忆/持久化架构** | OpenClaw（#179954 memory 分块路径）、Hermes（#143379 doc-chain RFC、#85622 additive 契约） | 压缩后可重读的持久记忆是双方都在探索的架构方向 |
| **崩溃后的 agent 生命周期恢复** | OpenClaw（#166634 崩溃后 agent 不可用）、Hermes（#154163 delegate 子 agent 跨重启续命） | checkpoint/reclamation 边界是双方共同的工程难点 |

## 5. 差异化定位分析

- **功能侧重**：OpenClaw 偏**产品化终端用户体验**（多平台客户端、一键 onboarding、模板市场、Deep Research 工作流）；Hermes 偏**开发者/运维侧能力**（沙箱、plugin-catalog、Team Gateway、cron 自动化、ACP/编辑器集成），插件与技能生态是战略重点（Hermes Market）。
- **目标用户**：OpenClaw 覆盖个人终端用户（Mac/Windows/iOS/Android 的重度个人助手场景）；Hermes 更多面向将 agent 作为常驻服务的 power user 和多 agent/多租户团队场景（Slack 身份隔离、Team Gateway 诉求强烈）。
- **技术架构**：OpenClaw 的核心复杂度在 **Gateway 单事件循环 + 状态库**（当前债务来源）；Hermes 刚完成**统一网关大重构**（#106742），正处于回归消化期，且沙箱（rootless Podman）与安全边界投入更深。
- **国际化**：Hermes 明显短板（英文-only stall-guard #105163、cp936、csh、飞书适配），但也反映其非英语用户基数大。

## 6. 社区热度与成熟度

- **快速迭代/扩张期**：**Hermes Agent**——新开 Issue 451/日、关闭仅 49，PR 待审 280，社区贡献涌入速度远超消化能力；sec-marathon 表明正向质量投入转型，但短期内健康度承压。
- **质量巩固期**：**OpenClaw**——发布节奏与修复吞吐稳定，今日修复方向与热点 Issue 明确对齐，处于“系统性还债但可控”状态；需警惕的是 P0 长期未响应项（#146791、#178441）与社区贡献流失风险（#140277 stale 2 个月）。
- **共同成熟度信号**：用户诊断报告质量高、社区能提供详细日志与复现路径，说明两个项目的用户群体技术深度均较高，已脱离“尝鲜用户”阶段。

## 7. 值得关注的趋势信号

1. **“消息可靠性”成为 AI Agent 的信任分水岭**：两项目最高频的用户不满均为静默丢失（OpenClaw 用户直言“不可接受”）。对开发者的启示：agent 系统需要传统消息中间件级别的 delivery guarantee（custody、重试、死信可见化），这是下一步基础设施竞争点。
2. **安全从“功能”变为“前置约束”**：Hermes 的 sec-marathon 批次（凭据泄露、命令注入、bundle 逃逸）预示：随着 agent 获得凭据、执行 shell、加载第三方插件/技能，**沙箱边界与 secrets 隔离将成为准入门槛**。OpenClaw 的可信插件准入讨论（#176273）同向。
3. **Agent 即常驻服务**：fd 泄漏、内存膨胀、daemon 孤儿、崩溃恢复等传统服务端问题全面涌入 agent 项目——agent 开发者需引入运维级可观测性与资源治理（token 记账 #137149 是早期信号）。
4. **多 agent / 多租户成为主流形态**：Team Gateway、per-agent Slack 身份、profile 隔离等诉求表明单用户单 agent 假设正在失效，身份与凭据的 per-agent 粒度设计应尽早纳入架构。
5. **自更新是不可忽视的工程债高发区**：两个项目的更新链路 bug 密度最高、跨平台差异最大。对新项目建议：优先考虑外部化更新（包管理器）而非内置自更新，或至少将更新停机时间纳入 SLO。
6. **编辑器/IDE 集成是生态卡位点**：Hermes 的 ACP Registry 注册因 Zed 弃用旧接口而日趋紧迫——agent 项目的标准化接入（ACP/MCP）窗口期正在收窄，晚决策即失去分发渠道。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-12

## 1. 今日速览

- 项目处于**高活跃度状态**：过去24小时 Issues 更新 500 条（新开/活跃 451，关闭仅 49），PR 更新 500 条（待合并 280，已合并/关闭 220），吞吐量大且社区参与度极高。
- 今日无新版本发布，但一批标记 `sec-marathon` 的**安全修复 PR 集中涌现**（主要来自 @c2h5oh），覆盖 gateway、MCP、Desktop、Skills 等多个组件，显示项目正在进行一轮系统性安全加固。
- 统一网关（unified gateway，#106742）合并后的回归问题持续发酵，相关追踪 Issue #143547 评论数达 60 条，是当前最大的工程焦点。
- 待合并 PR 积压 280 个，关闭率约 44%，维护者审核压力较大。

## 2. 版本发布

今日无新版本发布。当前主线上正在汇聚安全修复与稳定性补丁，预计下一个版本将包含大量安全相关变更。

## 3. 项目进展

今日无明确记录的合并 PR（展示的 PR 均为 OPEN 状态），但从 PR 流向可判断项目在以下方向推进：

- **安全加固（sec-marathon 系列）**：一批 P1 级安全修复待合并，包括：
  - [#153813](https://github.com/NousResearch/hermes-agent/pull/153813)：`/stop`、`/new`、`/reset` 命令需等 runner 接受后才取消会话（P1）
  - [#153845](https://github.com/NousResearch/hermes-agent/pull/153845)：修复外部 secret 源（Bitwarden/1Password）将 Hermes 凭据泄露到 stdio MCP 子进程的问题（P1）
  - [#153645](https://github.com/NousResearch/hermes-agent/pull/153645)：Desktop 渲染进程 REST 路径凭据附加前先固定到后端 origin，修复凭据劫持（P1，Fixes #74649）
  - [#153723](https://github.com/NousResearch/hermes-agent/pull/153723)：Skills 扫描不再信任 bundle 自带的 ignore 文件，阻断 `curl | sh` 逃逸（P1）
  - [#153722](https://github.com/NousResearch/hermes-agent/pull/153722)：WSL 下外部 URL 改用 rundll32 打开，修复 cmd.exe 注入（P1）
- **可观测性**：[#137149](https://github.com/NousResearch/hermes-agent/pull/137149) 终于为 `messages.token_count` 填充真实的 completion tokens，为按行 token 记账铺路。
- **沙箱体验**：[#154184](https://github.com/NousResearch/hermes-agent/pull/154184)（salvage #72946）修复 rootless Podman 下文件归属 subuid 的问题，改善无 root Linux 用户的沙箱可用性。
- **平台适配**：[#154191](https://github.com/NousResearch/hermes-agent/pull/154191)（csh 登录 shell SSH 启动）、[#154190](https://github.com/NousResearch/hermes-agent/pull/154190)（飞书话题线程消息丢失）等。

## 4. 社区热点

- **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（60 评论）**：统一网关合并后的 main 分支回归问题汇总，横跨 CLI/TUI/Desktop/Discord/WeCom/cron 等十余个标签，是当前讨论最热烈的话题。用户核心诉求：大重构（#106742）后的质量回归需要快速收敛。
- **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（58 评论，blocked/upstream）**：特定账号无法通过 API 创建 PR（CreatePullRequest 权限错误），fork PR 与 issue 创建正常。属于上游/GitHub 侧问题，长期挂起。
- **[#143379](https://github.com/NousResearch/hermes-agent/issues/143379)（36 评论）**：关于 doc-chain 持久记录与压缩后可重读性的 RFC，社区在讨论记忆/溯源架构方向。
- **[#153396](https://github.com/NousResearch/hermes-agent/issues/153396)（7 👍，11-11 新开）**：Team Gateway 支持"每个 agent 自带 Slack app"，保留 bot 名称与头像。社区共鸣度高，反映云端多实例用户对身份隔离的强烈需求。

## 5. Bug 与稳定性（按严重程度）

**P1**
- [#82936](https://github.com/NousResearch/hermes-agent/issues/82936)：`gateway.multiplex_profiles` 下默认 profile 的 secrets 泄露到次要 profile 的 terminal 工具与 Kanban worker。与 sec-marathon 系列 PR（如 #153845）方向一致，**可能部分被覆盖**，建议关联确认。
- [#122529](https://github.com/NousResearch/hermes-agent/issues/122529)：cron 外部 worker 缺失 venv site-packages 导致 `ModuleNotFoundError: ruamel`，安装/更新路径问题。无明确 fix PR。

**P2（近期活跃/新报）**
- [#151351](https://github.com/NousResearch/hermes-agent/issues/151351)（11-08 新开）：Windows Desktop TicketBridge 10s/30s 定时器杀死 python helper，一次慢 ticket 触发完整重启动。无 fix PR。
- [#106592](https://github.com/NousResearch/hermes-agent/issues/106592)：Remote Desktop 更新在 systemd 重启成功后仍报失败，遗留脏状态。无 fix PR。
- [#105163](https://github.com/NousResearch/hermes-agent/issues/105163)：stall-guard 意图检测仅支持英文正则，非英文 agent 的防卡死保护失效。i18n 短板，无 fix PR。
- [#121095](https://github.com/NousResearch/hermes-agent/issues/121095)：`browser_exec` 泄漏 `browser_harness.daemon` 进程，永不退出。无 fix PR。
- [#51058](https://github.com/NousResearch/hermes-agent/issues/51058)：TUI/Desktop 在上下文压缩/重连后恢复错误会话，出现“串聊天”。无 fix PR。
- [#96027](https://github.com/NousResearch/hermes-agent/issues/96027)：gateway 泄漏 SQLite fd（22 天 94 个），可耗尽 launchd 256-fd 限制。无 fix PR。
- [#137838](https://github.com/NousResearch/hermes-agent/issues/137838)：macOS gateway 反复 exit 75，根因未定（原诊断已撤回），需持续调查。

**P3**
- [#112961](https://github.com/NousResearch/hermes-agent/issues/112961)：Windows Hermes.exe 长会话中固定偏移 `0x5281f15` 处 FAST_FAIL 崩溃，awaiting-reporter。
- [#146440](https://github.com/NousResearch/hermes-agent/issues/146440)：Windows Kanban managed worker 初始化冻结（stdin 管道继承 + 插件 numpy 懒加载死锁，双 bug 叠加）。
- [#54572](https://github.com/NousResearch/hermes-agent/issues/54572)：patch 工具 replace 模式模糊匹配可能改错区域——**数据完整性风险**，值得提升优先级。

## 6. 功能请求与路线图信号

- **[#153396](https://github.com/NousResearch/hermes-agent/issues/153396)** Team Gateway 自带 Slack app：7 👍，与现有 platform/slack 标签下的 gateway 重构方向契合，纳入概率高。
- **[#47435](https://github.com/NousResearch/hermes-agent/issues/47435)** 注册 ACP Registry（Zed/JetBrains/VS Code 集成）：Zed v1.5.0 已弃用自定义 agent_servers，属于生态适配刚需，needs-decision 状态待维护者拍板。
- **[#154163](https://github.com/NousResearch/hermes-agent/pull/154163)**：delegate 子 agent 在 gateway 重启/崩溃后可继续（salvage #145331）——可靠的子 agent 生命周期管理是明确的路线图方向。
- **[#153134](https://github.com/NousResearch/hermes-agent/pull/153134) / [#152641](https://github.com/NousResearch/hermes-agent/pull/152641)**：plugin-catalog 持续扩张（排班校验、Hermes Market 技能交易），显示插件生态是战略重点。
- **[#143379](https://github.com/NousResearch/hermes-agent/issues/143379) RFC**：压缩后持久记忆的可重读性，若被采纳将影响记忆子系统架构。

## 7. 用户反馈摘要

- **更新流程是最集中的痛点**：Windows 下 `hermes update` UnicodeDecodeError（#122239）、更新后检查误报失败（#123971）、Desktop 无限重建循环杀死活跃会话（#122656）、cron venv 重建丢用户包（#69889）——安装/更新链路跨平台问题密集，用户信任受损。
- **长时运行稳定性不足**：SQLite fd 泄漏（#96027）、browser daemon 泄漏（#121095）、macOS exit 75（#137838）、Windows 崩溃（#112961），反映相当比例用户将 Hermes 作为常驻服务使用。
- **非英语/非主流环境被忽视**：英文-only stall-guard（#105163）、cp936 编码（#122239）、csh shell（#154191）。
- **好评方向**：社区贡献修复的质量高（多个 sec-marathon PR 描述详尽、附复现）；salvage 机制（#154163、#154184、#154188）保证好补丁不因 base 演进而丢失。
- **隐私/多租户诉求强烈**：profile 隔离泄露（#82936）与 Slack 身份（#153396）表明多 agent、多用户场景已成主流用法。

## 8. 待处理积压

- **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)**（10-03 开，58 评论，blocked/upstream）：上游权限问题，建议明确绕行方案或升级渠道。
- **[#85622](https://github.com/NousResearch/hermes-agent/issues/85622)**（8-13）：外部记忆 provider 违背"additive"文档契约，抑制 MEMORY.md 注入——文档与实现不一致需决断。
- **[#105758](https://github.com/NousResearch/hermes-agent/issues/105758)**（9-08，28 评论，needs-decision）：生命周期守卫误杀 Node.js CLI，9 月 scan-budget 提交引入的回归至今未修。
- **[#74078](https://github.com/NousResearch/hermes-agent/issues/74078)**（7-29，安全）：kill 数字 PID 绕过自终止保护 + blocked-prefix 不匹配，中危安全项长期未修。
- **[#47954](https://github.com/NousResearch/hermes-agent/issues/47954)**（6-17）：honcho 记忆 provider 启动竞态，5 个月未决。
- **[#47435](https://github.com/NousResearch/hermes-agent/issues/47435)**（6-16，needs-decision）：ACP Registry 注册，5 个月未决策，随 Zed 弃用旧配置日趋紧迫。

**健康度小结**：社区贡献活跃、安全意识强（sec-marathon），但统一网关大重构的回归消化、Windows/更新链路的长期积压、以及 280 个待审 PR 的审核吞吐，是当前三大健康度风险。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*