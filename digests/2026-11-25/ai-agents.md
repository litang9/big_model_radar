# OpenClaw 生态日报 2026-11-25

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-25 03:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-11-25

## 1. 今日速览

OpenClaw 今日保持高强度活跃：过去 24 小时 Issues 更新 500 条（新开/活跃 431，关闭 69），PR 更新 500 条（待合并 228，已合并/关闭 272），并发布了 2 个新版本（v2026.11.8 与 v2026.11.9）。社区反馈焦点集中在**更新/升级链路可靠性**与 **SQLite 状态库 I/O/内存问题**两大主题，多个 P0 级问题持续待修。整体节奏显示项目处于大版本快速迭代期，但稳定性债务正在累积，维护者（尤其是 @obviyus）正在推进一次系统性的「prepared-release 更新架构」重构以根治升级类问题。

---

## 2. 版本发布

### v2026.11.8（大版本）
- **规模**：314 commits · 210 PRs · 86 contributors —— 本周主力发布。
- **内容**：未在数据中给出具体条目，但从关联 PR 推断包含更新器（update owner）、Talk 设置、Control UI 等改进。
- ⚠️ **已知问题**：pnpm 安装下升级到 2026.11.8 会 `exit 1` 并导致所有 `openclaw` 命令失败、Gateway 停止（修复见 PR [#204716](https://github.com/openclaw/openclaw/pull/204716)）。**pnpm 用户建议暂缓升级或等待 2026.11.9+**。

### v2026.11.9（快速跟进补丁）
- **规模**：13 commits · 15 PRs · 14 contributors。
- **主要内容**：修复 2026.11.8 的 pnpm 升级后 `Cannot find module …/.openclaw-update-native…/openclaw.mjs` 及 Gateway 停止问题（对应 #204716）。

---

## 3. 项目进展

今日合并/关闭 272 个 PR，重点方向：

- **更新架构重构（本周主线）**：
  - [#204956](https://github.com/openclaw/openclaw/pull/204956) 允许跨兼容数据库变更回滚（Closes #204880），配套 backport [#204957](https://github.com/openclaw/openclaw/pull/204957)（P1，针对 release/2026.11.15）。
  - [#204866](https://github.com/openclaw/openclaw/pull/204866) 修复两条更新路径争抢同一安装的问题。
  - [#205042](https://github.com/openclaw/openclaw/pull/205042) 修复 release-aware 更新的 FRV 验收链路。
  - 设计总纲 Issue [#204775](https://github.com/openclaw/openclaw/issues/204775)（prepared-release 更新的状态/所有权/计划）今日新开即获 11 条评论，是协调多人不再"撞车"的共享参考。
- **Agent 会话治理**：[#205062](https://github.com/openclaw/openclaw/pull/205062) 重构 sessions_send/spawn 的准入权限判定（OA2 PR 5，安全敏感）。
- **性能优化（@vincentkoc 高产）**：lean 启动时去除多余 SQLite worker（[#205053](https://github.com/openclaw/openclaw/pull/205053)）、CLI 配置选择避免预检编排（[#205054](https://github.com/openclaw/openclaw/pull/205054)，已合并）、i18n 测试提速（[#204927](https://github.com/openclaw/openclaw/pull/204927)）。
- **UI/移动端**：Talk 设置页重构三部曲推进中（[#204683](https://github.com/openclaw/openclaw/pull/204683)、[#205068](https://github.com/openclaw/openclaw/pull/205068)）、口述与 Talk 按钮分离（[#204505](https://github.com/openclaw/openclaw/pull/204505)）。
- **CI/发布基建**：npm readback 等待延长至 1 小时（[#205069](https://github.com/openclaw/openclaw/pull/205069)）、Docker CI 瘦身（[#204971](https://github.com/openclaw/openclaw/pull/204971)）、稳定客户端对候选 Gateway 反向兼容测试（[#201151](https://github.com/openclaw/openclaw/pull/201151)）。

**评估**：更新链路重构（DB 兼容回滚 + 更新所有权）一旦落地，将系统性解决长期困扰用户的"升级半途而废、无法回滚"问题，是本周最有价值的进展。

---

## 4. 社区热点

| Issue | 评论 | 主题 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) (P0) | 87 | 2026.9.6 起 Gateway 在捕获大型外部插件时阻塞事件循环数分钟 |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) | 43 | 状态库 WAL 自动 checkpoint 被进程内 reader 永久阻塞 |
| [#197083](https://github.com/openclaw/openclaw/issues/197083) (P0) | 38 | 11.3 升级后 Doctor 校验失败导致更新半完成、无法回滚 |
| [#170956](https://github.com/openclaw/openclaw/issues/170956) (P0) | 34 | Windows 重启/更新不可靠（慢启动、插件不干净退出、schtasks 权限） |
| [#178359](https://github.com/openclaw/openclaw/pull) | 32 | `doctor --fix` 卡在修复准备阶段 15+ 分钟无输出 |
| [#150635](https://github.com/openclaw/openclaw/issues/150635) | 31 | 短期记忆每晚被驱逐，"dreaming deep"阶段从不提升（数据丢失影响） |
| [#143017](https://github.com/openclaw/openclaw/issues/143017) | 20 | 5 种路径导致 prompt 前缀重写，实测浪费 21.3M cache-write tokens |

**诉求分析**：热榜呈现清晰共性——用户多运行**多 agent、大体量（数百 MB SQLite）的生产部署**，遇到的是稳态运行与升级可靠性问题，而非功能缺失。#160959/#164294/#143017 实际上同根：主线程同步捕获插件 + 读路径架构导致 I/O 与缓存浪费，社区在用生产 wire 抓包数据（#143017 的 949 条生产请求记录）施压维护者深入架构级修复。

---

## 5. Bug 与稳定性（按严重度）

| 级别 | Issue | 问题 | Fix PR |
|---|---|---|---|
| **P0** | [#160959](https://github.com/openclaw/openclaw/issues/160959) | Gateway 插件捕获阻塞数分钟（2026.9.6 回归，crash-loop） | ❌ 无 |
| **P0** | [#197083](https://github.com/openclaw/openclaw/issues/197083) | 升级半完成 + WAL 发布校验失败 + `state-migrated-no-rollback` | ⏳ 相关：#204956 系列 |
| **P0** | [#160386](https://github.com/openclaw/openclaw/issues/160386) | 大会话库导致 SQLite I/O 压力、WebUI RPC 超时 | ❌ 无 |
| **P0** | [#137177](https://github.com/openclaw/openclaw/issues/137177) | 内置 wecom 插件无法安装 | ❌ 无 |
| **P1** | [#170956](https://github.com/openclaw/openclaw/issues/170956) | Windows 重启/更新不可靠 | ❌ 无 |
| **P1** | [#196199](https://github.com/openclaw/openclaw/issues/196199) | 2026.10.10 回归：Codex helper 完成后无法唤醒父级，用户被锁在助手外 | ❌ 无 |
| **P1** | [#190307](https://github.com/openclaw/openclaw/issues/190307) | 重启后 agent 永久 "degraded"（admission 超时） | ❌ 无 |
| **P1** | [#178359](https://github.com/openclaw/openclaw/issues/178359) | doctor --fix 卡死 15+ 分钟 | ❌ 无 |
| **P1** | [#140010](https://github.com/openclaw/openclaw/issues/140010) | Windows 睡眠唤醒后重连失败 30-60s+ | ❌ 无 |
| **P2** | [#200756](https://github.com/openclaw/openclaw/issues/200756) | Windows beta 更新 package-swap 失败 | ❌ 无 |
| **P2** | [#200224](https://github.com/openclaw/openclaw/issues/200224) | beta 升级对已废弃 heartbeat 配置的进退两难 | ❌ 无 |

**正面信号**：#160548（prepared-model-catalog worker 内存泄漏 1 GiB/5min，P0）已关闭——该 worker 是 #160959 的同源组件，值得确认修复方式是否也缓解后者。

---

## 6. 功能请求与路线图信号

- **更新/回滚架构**（#204775 + #204956/#204957/#204866）：明确是当前维护者优先级最高的产品方向，将进入 release/2026.11.15。
- **MCP Events 消费**（[#166586](https://github.com/openclaw/openclaw/issues/166586)）：让 agent 响应 MCP 服务器事件触发运行，符合 agent 生态趋势，已有讨论但尚无 PR。
- **长会话 checkpoint/让步策略**（[#138990](https://github.com/openclaw/openclaw/issues/138990)）：WebChat 前台运行的可强制检查点，社区诉求强烈。
- **重启后补收漏消息**（[#55792](https://github.com/openclaw/openclaw/issues/55792)，3 月提出，11 条评论）：message-loss 类，长期积压。
- **msteams 动态解析 SharePoint 站点**（[#136271](https://github.com/openclaw/openclaw/issues/136271)）：清晰可实现的集成改进。
- **Telegram sendDice**（[#137110](https://github.com/openclaw/openclaw/issues/137110)）：linked-pr-open，可能近期合并。
- **Google Meet 语音修复**（[#140455](https://github.com/openclaw/openclaw/issues/140455)）：Meet DOM 变更导致的循环 JSON 崩溃，无维护者响应，风险被搁置。

---

## 7. 用户反馈摘要

- **痛点集中区**：
  - *升级即赌博*：多位用户报告更新后 Gateway 停止、模块丢失、无法回滚（#200756、#197083、#183479），且拒绝回滚时的错误提示晦涩（`state-migrated-no-rollback`）。
  - *doctor 反而需要 doctor*：`doctor --fix` 本身卡死无输出（#178359），修复引导（#190307）指向的命令不可用，形成恶性循环。
  - *生产成本被隐形放大*：#143017 用户实测 21.3M tokens 的 prompt 缓存写入被浪费，直接影响账单。
  - *可观测性缺失*：#127195 指出 16 处调用点抛出字节级相同的错误串，生产排障无从下手——这是用户对日志/错误分类体系的强烈不满。
- **满意点**：ClawSweeper 自动分诊标签体系（source-repro、needs-maintainer-review 等）运作良好，Issue 报告质量普遍极高（含 V8 CPU profile、wire 抓包、schema dump）；贡献者（@vincentkoc、@tideclaw-bot、@alkor2000）持续产出高质量小颗粒 PR 并快速合入。
- **典型使用场景**：macOS LaunchAgent / Windows schtasks 托管服务、35+ agent、284 MB 单库、Telegram/WhatsApp/Discord/Teams 多通道接入——用户群已深度生产化。

---

## 8. 待处理积压（维护者关注清单）

| 项 | 状态 | 说明 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) (P0) | 87 评论，OPEN 两个月 | 最高热度，plugin 捕获阻塞，无 fix PR |
| [#190307](https://github.com/openclaw/openclaw/issues/190307) (P1) | needs-live-repro | agent 永久 degraded，需要维护者介入复现 |
| [#55792](https://github.com/openclaw/openclaw/issues/55792) (P1) | 8 个月未决 | 重启丢消息，needs-product-decision |
| [#143017](https://github.com/openclaw/openclaw/issues/143017) (P2) | stale 标签误贴（用户 10/26 已提供 live repro） | 建议移除 stale 并分配处理 |
| [#150635](https://github.com/openclaw/openclaw/issues/150635) (P2) | needs-product-decision | 记忆保留驱逐策略影响核心记忆功能 |
| [#136405](https://github.com/openclaw/openclaw/issues/136405) (P2) | 3 个月 | memory_search 远程 embedding 无超时配置 |
| [#167197](https://github.com/openclaw/openclaw/pull/167197) (PR) | OPEN 近 2 个月，security-review-required | MCP message 工具丢失修复，建议优先安全审查 |
| [#166573](https://github.com/openclaw/openclaw/pull/166573) (PR) | OPEN 近 2 个月，ready for maintainer look | CLI 配置诊断改进，质量充分可合入 |

---

**健康度总结**：OpenClaw 处于功能高速演进 + 稳定性债务爬升的典型阶段。Issue 关闭率（69/500）明显低于新开速度（431），P0 积压未消化；但维护者已识别根因（更新链路、SQLite 架构）并开始系统性重构（#204775 系列）。短期建议：优先落地 #204716/#204956 修复升级可靠性，并对 P0 热榜（#160959、#196199）给出明确时间表，以维持高价值生产用户的信任。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析
**数据日期：2026-11-25 · 覆盖项目：OpenClaw、Hermes Agent**

---

## 1. 生态全景

个人 AI 助手 / 自主智能体开源生态已进入“生产化深水区”：头部项目日均 Issue 更新 350-500 条、PR 更新 500 条，用户群从尝鲜者转变为 35+ agent、数百 MB 状态库、多 IM 通道接入的重度生产用户。两项目共同呈现出“大重构后稳定性收尾”的阶段性特征——OpenClaw 推进更新链路架构重构、Hermes 收尾统一网关合并回归，说明生态正从功能堆叠转向架构治理。托管化（Hermes Cloud）与主动性行为成为新的竞争前沿。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 431，关闭 69） | 355（新开/活跃 316，关闭 39） |
| Issue 关闭率 | ~14%（69/500） | ~11%（39/355） |
| PR 更新（24h） | 500（待合并 228，合并/关闭 272） | 500（待合并 369，合并/关闭 131） |
| PR 合并率 | ~54% | ~26% |
| Release | 2（v2026.11.8 大版本 + 2026.11.9 补丁） | 2（v0.23.4 稳定版 + canary） |
| 版本节奏 | 高频日历版本，当日发补丁修复 | 稳定版 + canary 双轨，v0.24.0 准备期 |
| P0/P1 积压 | 4 P0 + 7 P1，多数无 fix PR | 1 P1，多项 P2 |
| 健康度评估 | ⚠️ 活跃度极高但稳定性债务爬升，关闭速度跟不上新开 | ✅ 高活跃且消化较健康，处于大重构收尾期 |

**核心判断**：OpenClaw 更新量与合并吞吐更大但“入不敷出”（新开 431 vs 关闭 69）；Hermes 关闭率相近，但 PR 待合并堆至 369，评审带宽同样承压。

---

## 3. OpenClaw 在生态中的定位

**优势**
- **迭代速度**：单日 272 PR 合并、双版本发布、大版本 314 commits / 210 PRs / 86 contributors，工程吞吐为生态标杆。
- **生产级用户基础**：热榜议题均为数百 MB SQLite、35+ agent、多通道生产部署问题，说明用户深度与粘性极高，且用户报告质量极佳（V8 CPU profile、wire 抓包、schema dump）。
- **社区基建成熟**：ClawSweeper 自动分诊标签体系运作良好；贡献者梯队（@vincentkoc 等小颗粒高产 PR 快速合入）健康。

**风险**
- P0 积压两个月未修（#160959，87 评论），Issue 净增失控，升级链路信任受损（“升级即赌博”）。
- SQLite 同步 I/O + 主线程插件捕获是架构级债务，尚未根治。

**技术路线差异**：OpenClaw 走自托管重架构路线（Gateway 进程 + 本地 SQLite 状态库 + 更新所有权/回滚系统）；Hermes 兼具 CLI/Desktop 与 Hermes Cloud 托管路径，架构重心在统一网关会话收敛。社区规模上两者处于同量级第一梯队，OpenClaw 单日数据略胜，Hermes 的版本收尾纪律更好。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **网关/生命周期可靠性** | #160959 插件捕获阻塞、#170956 Windows 重启、#190307 degraded | #143547 统一网关回归（90 评论）、#145022 worker 崩溃 | 网关停顿/重启不应导致 agent 失联、WIP 丢失 |
| **升级/安装链路** | #204775 prepared-release 重构（本周主线） | #147873 重启欠账提示、#127731 备份跳过 | 升级可回滚、状态迁移可验证 |
| **长会话/记忆治理** | #164294 WAL checkpoint 阻塞、#150635 记忆驱逐、#138990 checkpoint | #143379 Doc-Chain RFC（50 评论）、#159881 空闲压缩、#28279/#11430 记忆隔离 | 持久化 + 压缩后可重读 + 记忆隔离 |
| **静默失败 vs 显式报错** | #127195 错误串不可区分 | #110374 Slack 静默失效、#99943 窗口静默钳制、#150617 DM 空回复 | 双方用户均明确要求“宁可报错，不要静默” |
| **多通道接入生态** | wecom/msteams/Telegram/Meet | Slack/Discord/Nextcloud Talk | IM 适配可靠性 + 平台 API 变更兼容 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 更新架构、多 agent 状态库、SQLite 性能、Doctor 自诊断 | Desktop UI 重设计、Cloud 托管 dashboard、Proactivity、Doc-Chain |
| 目标用户 | 重度自托管生产用户（多 agent、大库、多通道） | 从个人桌面到 Cloud 托管的多层用户，正走向多租户 |
| 技术架构 | 本地 Gateway + SQLite 状态库 + 进程级更新所有权 | 统一网关会话收敛 + CLI/Desktop/Web 三端 + Cloud |
| 安全治理 | OA2 会话准入权限重构（#205062） | 审批层门禁修复（#59293 已关闭）、可配置审批命令 |
| 战略信号 | 治理升级可靠性（回滚、DB 兼容） | 商业化路径清晰（Cloud 迁移 + 主动性对标 Hark/dots/Muse/Grok） |

---

## 6. 社区热度与成熟度分层

- **快速迭代期（功能驱动）**：OpenClaw —— 双版本/日、PR 吞吐最高，但 P0 债务持续累积，处于“高速演进 + 债务爬升”阶段。
- **质量巩固期（重构收尾驱动）**：Hermes Agent —— v0.23.x 收尾 + v0.24.0 准备，统一网关回归清理中，合并纪律更稳，但 PR 队列积压（369）暴露评审瓶颈。
- **热度标杆**：OpenClaw #160959（87 评论）、Hermes #143547（90 评论）—— 均为架构级回归，说明两社区当前最热议题高度同构：**网关可靠性**。

---

## 7. 值得关注的趋势信号

1. **“升级可回滚”成为产品能力而非运维细节**：OpenClaw 将 prepared-release 更新架构列为最高优先级并进入 release/2026.11.15；对智能体开发者而言，状态迁移 + 回滚设计应前置到 v1 之前。
2. **静默失败是用户最大容忍阈值**：两项目抱怨榜首均为静默失效（Slack 状态消失、窗口钳制、DM 空回复、字节级相同错误串）。可观测性与错误分类体系是差异化机会。
3. **记忆治理进入深水区**：Doc-Chain RFC（50 评论）、记忆隔离（7 个月高需求）、WAL/checkpoint 问题共同指向：持久化记忆 + 压缩溯源 + 多用户隔离是下一代 agent 的核心基础设施。
4. **托管与自托管分野显现**：Hermes 明确走 Cloud 商业化路线；OpenClaw 用户深度绑定自托管。agent 项目需尽早选择并清晰传达部署形态。
5. **Proactivity 是下一个竞争前沿**：Hermes 对标 Hark/dots/Muse/Grok，差异化在“用户批准的可见 job”——审批透明度将成为主动 agent 的信任货币。
6. **成本可观测性诉求上升**：#143017 实测 21.3M cache-write tokens 浪费直接冲击账单，token 效率审计工具将成刚需。

**给维护者的行动建议**：OpenClaw 应对 P0 热榜（#160959、#196199）给出时间表并落地 #204956 系列以止损升级信任；Hermes 应优先修复 #145022（唯一 P1）并在 v0.24.0 前集中清理网关通知截断同源缺陷组（#131786/#150617）。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目日报 — 2026-11-25

## 1. 今日速览

Hermes Agent 今日保持高度活跃：过去 24 小时内 Issues 更新 355 条（新开/活跃 316，关闭 39），PR 更新 500 条（待合并 369，合并/关闭 131），并发布 2 个版本。项目处于 v0.23.x 稳定收尾 + v0.24.0 准备窗口期，昨日发布的 v0.23.4 将约 229 个 PR 汇总为稳定版。活跃度评估：**非常高**，Issue 关闭率约 11%、PR 合并/关闭率约 26%，消化速度健康。社区热点集中在统一网关（unified gateway）合并后的稳定性收尾、Desktop 重设计工作流，以及 Hermes Cloud 托管 dashboard 的推进。

## 2. 版本发布

### v0.23.4（2026-11-23）
- Patch 发布，将自 v0.23.3 以来合并的 **~229 个 PR** 汇总为稳定版本，覆盖 GitHub Release（CLI 与安装器）、Microsoft Store 应用、Docker 及 Hermes Cloud。
- 完整整理后的 release notes 将随 **v0.24.0** 发布。
- 无明确破坏性变更；建议关注 v0.24.0 的 curated notes。
- 链接：https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.4

### canary.20261124T064706Z-v0.23.3（2026-11-24）
- 基于 v0.23.3 的 Canary 构建，附 macOS（Apple Silicon）DMG 等多平台下载。
- 链接：https://github.com/NousResearch/hermes-agent/releases/tag/canary.20261124T064706Z-v0.23.3

## 3. 项目进展

今日合并/关闭的 131 个 PR 中，值得关注的推进方向：

- **Desktop 重设计集成分支落地推进**：[#152168](https://github.com/NousResearch/hermes-agent/pull/152168) 全新 agent workspace 集成分支（含 12+ 层 review stack、onboarding、design system 页面）持续更新，是 Desktop 端最大的一次 UI 改版。
- **Hermes Cloud 托管 dashboard**：[#158363](https://github.com/NousResearch/hermes-agent/pull/158363)（已关闭）添加 "Your dashboard is moving" 模态框，引导 Cloud 用户迁移至 web app——配套的 [#159876](https://github.com/NousResearch/hermes-agent/pull/159876) 实现无 agent 主机上运行 Webapp，Cloud 战略路径清晰。
- **稳定性修复**：[#159524](https://github.com/NousResearch/hermes-agent/pull/159524)（已关闭）launcher 可自定义 install-state 目录（Windows 进程管理改进）；[#153055](https://github.com/NousResearch/hermes-agent/pull/153055)（已关闭）修复 afterimage catalog 触发的 repo no-/tmp 检查阻塞所有 push 的问题。
- **新提交待审**：cron 越界日期校验（[#159885](https://github.com/NousResearch/hermes-agent/pull/159885)）、MCP HTTP/SSE transport 拆卸超时上界（[#159867](https://github.com/NousResearch/hermes-agent/pull/159867)）、恢复会话的空闲压缩（[#159881](https://github.com/NousResearch/hermes-agent/pull/159881)）、macOS 退出僵尸进程（[#159883](https://github.com/NousResearch/hermes-agent/pull/159883)）。
- **生态扩展**：EXAONE provider、AgentRouter v0.2.0、Ace Data Cloud Media 2.1.0、Keystone MCP 等插件目录更新多个 PR。

整体判断：项目正以“高频小步合并 + 集成分支”模式稳步向 v0.24.0 迈进。

## 4. 社区热点

| 议题 | 评论 | 核心诉求 |
|---|---|---|
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 统一网关 #106742 合并后问题 | 90 | 10 月统一网关将所有本地会话收进单一 gateway 进程，是当前最大的回归源，波及 CLI/TUI/Desktop/cron/Kanban 全链路 |
| [#143379](https://github.com/NousResearch/hermes-agent/issues/143379) Doc-Chain RFC | 50 | 社区对“持久化记录 + 溯源 + 压缩后可重读”架构的深度讨论 |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293)（已关闭）`hermes config set` 绕过审批层 | 31 | 安全类问题：CLI 可无门禁关闭审批层，今日关闭说明已修复 |
| [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban worker 崩溃 | 29 | P1 级：网关停顿时多 worker 同时崩溃、进行中工作丢失 |
| [#122609](https://github.com/NousResearch/hermes-agent/issues/122609) Skills index 过期看门狗 | 23 | 自动化探针持续报警，文档/索引基建可靠性 |
| [#110374](https://github.com/NousResearch/hermes-agent/issues/110374) Slack 状态指示静默失效 | 16 评论 / **19 👍** | slack-sdk ≥ 3.44 兼容性问题，用户反应强烈 |
| [#127621](https://github.com/NousResearch/hermes-agent/issues/127621) Desktop 回复重复渲染 | 15 评论 / 9 👍 | 桌面端流式去重问题，影响日常体验 |
| [#158538](https://github.com/NousResearch/hermes-agent/issues/158538) 主动性（Proactivity）路线图 | 11 | 核心成员 @teknium1 发起，对标 Hark/dots/Muse/Grok，方向性信号 |

## 5. Bug 与稳定性（按严重程度）

**P1**
- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban worker 在网关停顿保存时崩溃（"Kanban execution unknown"），单次事故杀掉 4 个 worker，WIP 丢失，重复发生。暂无专门 fix PR。

**P2**
- [#147873](https://github.com/NousResearch/hermes-agent/issues/147873) 每次调用 CLI 都打印欠账的重启提示且无法清除（macOS 安装/更新）。
- [#143720](https://github.com/NousResearch/hermes-agent/issues/143720) Discord 线程每 60 秒永久触发 admission_conflict（494 次/6 小时），重试上限失效。相关：[#159887](https://github.com/NousResearch/hermes-agent/pull/159887) 拒绝不支持的通知平台。
- [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) 压缩器窗口被 `ollama_num_ctx` 钳制，云端 1M 窗口静默缩到 65K（自 v0.21.0 回归）。相关修复方向：[#159881](https://github.com/NousResearch/hermes-agent/pull/159881)（compression 模块）。
- [#156709](https://github.com/NousResearch/hermes-agent/issues/156709) `FooteredReply` 破坏 `copy.deepcopy`（TypeError: missing 'footer'）。
- [#151351](https://github.com/NousResearch/hermes-agent/issues/151351) Windows Desktop TicketBridge 定时杀掉 python helper，一个慢 ticket 触发完整重启。相关：[#159883](https://github.com/NousResearch/hermes-agent/pull/159883)（macOS 僵尸进程修复，同属生命周期问题）。
- [#150617](https://github.com/NousResearch/hermes-agent/issues/150617) / [#131786](https://github.com/NousResearch/hermes-agent/issues/131786) 网关完成通知截断：长单行 JSON 输出丢失 / Bot Mode DM 空回复。
- [#141692](https://github.com/NousResearch/hermes-agent/issues/141692) 共享 CDP Chrome 上两个并发聊天互相干扰。
- [#156899](https://github.com/NousResearch/hermes-agent/issues/156899) 并发首次加载 provider 插件导致 "Unknown provider" 直到重启。
- [#156129](https://github.com/NousResearch/hermes-agent/issues/156129) 浏览器 localStorage 满时 Webapp 中止发送。

**P3**
- [#29849](https://github.com/NousResearch/hermes-agent/issues/29849) `no_agent=True` cron 脚本忽略 `terminal.backend`，始终在调度器本地执行（安全边界，17 评论/3 👍）。
- [#127731](https://github.com/NousResearch/hermes-agent/issues/127731) 高频 cron 主机上自动备份永远被跳过（Windows）。

## 6. 功能请求与路线图信号

- **Proactivity 路线图**（[#158538](https://github.com/NousResearch/hermes-agent/issues/158538)）：明确对标 Hark Pro / OpenAI dots / Muse / Grok Bot 的“背景主动帮忙”能力，但强调 Hermes 的差异化是“每次主动运行都是用户批准的 job、prompt 可见”。很可能进入 v0.24.0 之后的规划。
- **记忆隔离**：[#28279](https://github.com/NousResearch/hermes-agent/issues/28279)（Per-Chat Memory）与 [#11430](https://github.com/NousResearch/hermes-agent/issues/11430)（群聊 Per-user 记忆隔离）长期高需求，涉及隐私，是社区持续信号。
- **Hermes Cloud / 托管 dashboard**：[#159876](https://github.com/NousResearch/hermes-agent/pull/159876)、[#158363](https://github.com/NousResearch/hermes-agent/pull/158363)、[#145171](https://github.com/NousResearch/hermes-agent/issues/145171)（入口切到网关会话权威）形成一致的 Cloud 迁移主线，已有多 PR 落地，是确定中的方向。
- **AG-UI 适配器**（[#65845](https://github.com/NousResearch/hermes-agent/pull/65845)）：AG-UI 创作者亲自提交，长期 open，等待 needs-decision。
- 小型但易纳入的：Ruby 💎 图标（[#156660](https://github.com/NousResearch/hermes-agent/issues/156660)）、可配置审批锁命令模式（[#5528](https://github.com/NousResearch/hermes-agent/issues/5528)）、Slack progress 反应模式（已有 PR [#159888](https://github.com/NousResearch/hermes-agent/pull/159888)，大概率进下版本）、本地终端内存守卫（PR #57121 配套 [#56865](https://github.com/NousResearch/hermes-agent/issues/56865)）。

## 7. 用户反馈摘要

- **痛点集中于统一网关**：#106742 大重构后，用户在多个入口（Discord、Kanban、Desktop、cron）遭遇会话/通知/生命周期回归——架构收益明显但收尾工作量大。
- **静默失败最受抱怨**：Slack 状态消失（#110374，19 👍）、压缩窗口静默缩小（#99943）、Bot Mode DM 空回复（#150617）——用户明确希望“宁可报错，不要静默”。
- **多用户/多会话场景诉求强烈**：记忆隔离、共享 Chrome 串扰、群聊身份混淆，反映用户已从个人玩具转向生产多租户使用。
- **更新/安装体验**：macOS 重启欠账提示、Windows 备份跳过、pre-push hook 阻塞 push，说明升级链路细节仍需打磨。
- **满意点**：社区贡献热情高（Nextcloud Talk 适配 [#50148](https://github.com/NousResearch/hermes-agent/issues/50148) 16 👍、AG-UI 作者直接提 PR）、自动化运维机器人（seaeye bot、skills-index watchdog）运转良好。

## 8. 待处理积压

| 议题 | 开启时长 | 说明 |
|---|---|---|
| [#11692](https://github.com/NousResearch/hermes-agent/issues/11692) 自改进 agent 的技能版本回执 | ~7 个月 | 治理层面的深度设计讨论，P4 |
| [#5528](https://github.com/NousResearch/hermes-agent/issues/5528) 可配置审批命令模式 | ~7.5 个月 | 12 👍，安全相关，硬编码问题长期未解 |
| [#11430](https://github.com/NousResearch/hermes-agent/issues/11430) 群聊记忆隔离 | ~7 个月 | 多用户隐私，长期高需求 |
| [#28279](https://github.com/NousResearch/hermes-agent/issues/28279) Per-Chat 记忆隔离 | ~6 个月 | needs-decision 状态 |
| [#29849](https://github.com/NousResearch/hermes-agent/issues/29849) cron 脚本后端绕过 | ~6 个月 | 安全边界 + 兼容风险，需决策 |
| [#65845](https://github.com/NousResearch/hermes-agent/pull/65845) AG-UI 适配器 | ~4 个月 | 外部核心维护者提交，卡在 needs-decision |
| [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) 压缩窗口钳制回归 | ~3 个月 | 自 v0.21.0 的静默回归，影响大窗口云端用户 |
| [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban worker 崩溃 | ~1 个月 | 唯一 P1，无 fix PR，建议优先处理 |

**维护者提醒**：统一网关的 post-merge 跟踪 issue #143547（90 评论）和 P1 的 #145022 是当前最应投入的两项；同时 v0.24.0 curated notes 发布前宜集中清理 gateway 通知截断（#131786 / #150617）一组同源缺陷。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*