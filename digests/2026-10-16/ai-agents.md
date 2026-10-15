# OpenClaw 生态日报 2026-10-16

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-15 23:03 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-16

## 1. 今日速览

过去 24 小时 OpenClaw 保持极高活跃度：**Issues 更新 500 条**（新开/活跃 374，关闭 126），**PR 更新 500 条**（待合并 214，已合并/关闭 286），并发布 **3 个新版本**（1 个 stable beta、1 个 beta 修复版、1 个 extended-stable）。项目节奏整体围绕 10 月版（October branch）的稳定性打磨展开：主线下大量 UI 迁移（Lit → Solid）和 Gateway 性能优化 PR 持续合入，但社区侧 SQLite WAL 膨胀、插件源捕获导致的 SSD 磨损等 P0 级问题仍在等待维护者响应，稳定性债务与快速迭代并存。

## 2. 版本发布

### [v2026.10.10-beta.1](https://github.com/openclaw/openclaw/releases)
- **核心改进：Gateway 更快更稳**。chat turn、会话列表、启动和空闲 Gateway 显著减少 SQLite 与主线程工作，更多数据库操作迁移至 worker 线程——对繁忙主机和大规模 agent 集群的响应性是直接利好（#167965, #168002, #168093 等）。
- 该版本是针对近期一系列 WAL/checkpoint 问题的正面回应，建议多 agent 部署用户优先验证。

### [v2026.10.5-beta.4](https://github.com/openclaw/openclaw/releases)
- **更新可靠性修复**：macOS 更新不再在别名临时目录上超时；systemd 用户安装可回收废弃 runtime；pacman 和 FreeBSD 包安装交还给包管理器；快照失败可在早期被识别。
- 与多个更新失败类 issue（#161921, #170332, #171550）直接相关。

### [v2026.9.33](https://github.com/openclaw/openclaw/releases)
- **extended-stable（类 LTS）**，仅 Gateway，包含 9 月底代码 + 关键安全更新、可靠性/性能修复及新模型支持。生产环境用户可关注此通道。

无明确破坏性 API 变更公告，但更新失败报告在近期版本间较密集，升级前建议备份 state 目录。

## 3. 项目进展

今日 286 个 PR 合并/关闭，代表性进展：

- **UI 架构持续瘦身**：@steipete 密集提交并关闭多个 Lit → Solid 迁移 PR，包括 [#171846 订阅移除 Lit 依赖](https://github.com/openclaw/openclaw/pull/171846)、[#172597 退役 chat Web Awesome 菜单接缝](https://github.com/openclaw/openclaw/pull/172597)，以及继续推进的 [#173520（Web Awesome 主题退役）](https://github.com/openclaw/openclaw/pull/173520)、[#173510（Wizard 控件直接 Solid 渲染）](https://github.com/openclaw/openclaw/pull/173510)。Control UI 自研化基本完成在即。
- **CI 降本**：[#173519](https://github.com/openclaw/openclaw/pull/173519) 削减 macOS setup 与实时 fixture 成本（每小时 CI 可省约 5 分钟）。
- **重连风暴性能**：[#173415](https://github.com/openclaw/openclaw/pull/173415)（配对队列优化，attach p90 从 12.4s 显著改善）、[#173469](https://github.com/openclaw/openclaw/pull/173469)（profile 写者队列）针对 dashboard 刷新风暴。
- **Cron 可靠性**：[#173509](https://github.com/openclaw/openclaw/pull/173509)（旧版自动化账户绑定修复，P1）与 [#173503（已关闭）](https://github.com/openclaw/openclaw/pull/173503)。
- **记忆子系统**：[#173468](https://github.com/openclaw/openclaw/pull/173468)（P1）消除共享 memory 目录的重复扫描，降低空闲 Gateway 事件循环压力。
- **十月分支回移**：[#173526](https://github.com/openclaw/openclaw/pull/173526) Slack 排队失败去重回移。

**整体判断**：维护主力本周聚焦性能、更新可靠性和 UI 技术栈收敛，Gateway 存储层重构已进入收尾验证阶段，属于“夯实地基型”推进。

## 4. 社区热点

| Issue | 热度 | 诉求 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) Agent SQLite WAL 膨胀至 1.4–2.8 GB，阻塞 Gateway 启动 | 127 评论，P0 | Windows 单 Gateway 用户的核心痛点，`wal_autocheckpoint=1000` 失效，已阻塞发布 |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) 外部插件捕获导致 Gateway 阻塞数分钟（2026.9.6 回归） | 24 评论，P0 | 插件源捕获机制（#144252）引入的回归，启动即卡死 |
| [#68596](https://github.com/openclaw/openclaw/issues/68596) 流式 watchdog 超时可配置 | 17 评论，8 👍 | 深度推理模型（kimi-k2.5、DeepSeek-R1）用户被 30s watchdog 误杀 |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) 状态库 WAL checkpoint 被进程内 reader 永久钉住 | 17 评论 | 与 #143524 同根：长事务/读事务钉住 WAL |
| [#157989](https://github.com/openclaw/openclaw/issues/157989) 插件源捕获每次写入 1.1–6.5 GB，严重磨损 SSD | 17 评论，P1 | 用户对无复用的字节级拷贝 + SHA-256 全量哈希强烈不满 |

**背后主线**：存储层（SQLite WAL + 插件捕获目录）是当前社区愤怒值最高的领域，三个 P0/P1 均带 `needs-maintainer-review` 标签。

## 5. Bug 与稳定性

**P0（无 fix PR）**
- [#143524](https://github.com/openclaw/openclaw/issues/143524) WAL 无限增长阻塞启动（127 评论，`impact:ux-release-blocker`）— ⚠️ 无修复 PR
- [#160959](https://github.com/openclaw/openclaw/issues/160959) 大插件捕获阻塞事件循环 — ⚠️ 无修复 PR
- [#157325](https://github.com/openclaw/openclaw/issues/157325) 卡死的 agent-DB 资源导致所有 agent 回复失败直至重启 — ⚠️ 无修复 PR
- [#171918](https://github.com/openclaw/openclaw/issues/171918) Safari 27 间歇性拒绝 Control UI 入口模块图（新报，9 评论）
- [#161921](https://github.com/openclaw/openclaw/issues/161921) state 迁移后 `doctor --fix` 与 `plugins update` 互相死锁

**P1**
- [#164799](https://github.com/openclaw/openclaw/issues/164799) 版本变更后 agent 逐个 admit 数分钟，readyz 503 直至重启 — 有部分相关修复 [#173482](https://github.com/openclaw/openclaw/pull/173482)（关闭临时 SQLite reader 保持响应）
- [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows schtasks 安装的启动慢/关闭不干净/schtasks 权限错误，重启与更新极不可靠
- [#172091](https://github.com/openclaw/openclaw/issues/172091) worker 线程未应答的 admission 等待使 SQLite 事务永久打开，阻塞共享状态 WAL checkpoint — 与 #164294 构成同一故障族

**已修复/关闭**
- [#164113](https://github.com/openclaw/openclaw/issues/164113) LXC 容器内 FICLONE EPERM 更新失败（已关闭）
- [#121617](https://github.com/openclaw/openclaw/issues/121617) 压缩后 "Already compacted" 守卫误判（已关闭，有 linked PR）
- [#136262](https://github.com/openclaw/openclaw/issues/136262) openai-completions 流裸 text_delta 导致消息内容翻倍（已关闭）
- [#92516](https://github.com/openclaw/openclaw/issues/92516) 自托管容器无法信任外部 channel 插件（已关闭）

**判断**：v2026.10.10-beta.1 的 worker 线程迁移 + [#173482](https://github.com/openclaw/openclaw/pull/173482) 是 WAL 问题族的首批针对性修复，但最热的 #143524 尚无直接 fix PR。

## 6. 功能请求与路线图信号

- **内置 headless 浏览器** [#53763](https://github.com/openclaw/openclaw/issues/53763)（16 评论）：摆脱用户 Chrome/第三方 API 依赖，长期高需求，暂无 PR。
- **流式 watchdog 可配置** [#68596](https://github.com/openclaw/openclaw/issues/68596)：随深度推理模型普及，进入下一版本可能性较高。
- **上下文压力感知的继续工作** [#129388](https://github.com/openclaw/openclaw/pull/129388)（XL，open，8 月启动）：`continue_work`/`request_compaction` 设计已成型，是路线图上最重的功能 PR。
- **Per-agent dreaming 配置** [#67413](https://github.com/openclaw/openclaw/issues/67413)（5 👍）：解决全工作空间同时 dreaming 导致 OOM；配合 [#173468](https://github.com/openclaw/openclaw/pull/173468) 的共享扫描去重，记忆子系统重构正在进行中，纳入概率中等。
- **Control UI 上传限制可配置** [#71142](https://github.com/openclaw/openclaw/issues/71142)、**多 Teams bot 支持** [#71058](https://github.com/openclaw/openclaw/issues/71058)（已关闭，或有后续进展）。
- **会话引导文件膨胀 20–30% token** [#67419](https://github.com/openclaw/openclaw/issues/67419)：与 continuation PR #129388 主题重叠，方向一致。

## 7. 用户反馈摘要

**满意点**
- 新版 Gateway 性能改进方向（数据库工作移入 worker 线程）被多 agent 大规模部署用户正面期待。
- extended-stable 通道满足生产用户对“安全更新 + 少折腾”的需求。
- 自动化 issue 分类（clawsweeper）与 agent 代写 issue 流程被社区接受，报告质量高。

**痛点**
1. **Windows 体验明显二等公民**：WAL 膨胀、schtasks 不可靠、启动慢（#143524, #170956, #164799 均为 Windows）。
2. **更新链路脆弱**：state 迁移、插件更新互相阻塞（#161921）、LXC/pacman 等非常规环境支持不足。
3. **token 成本焦虑**：bootstrap 文件每轮重注入（#67419）、上下文估算偏高 2.3–2.6x（#101929，主分支已修）。
4. **深度推理模型兼容差**：watchdog 误报（#68596）、DeepSeek cron 前缀被降优先级导致任务卡顿（#121953）。
5. **静默失败类问题最伤信任**：Signal 通道丢弃工具调用前的文本（#101793）、Telegram 分离子代理无存活通知（#101656）。

## 8. 待处理积压

| 条目 | 状态 | 呼吁 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) WAL 膨胀（9/9 开启，127 评论） | `needs-maintainer-review`，无 fix PR | **最高优先**：发布阻塞级，与 #164294/#172091 同族，建议统一归因 |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) / [#157989](https://github.com/openclaw/openclaw/issues/157989) 插件捕获回归/SSD 磨损 | 均无 fix PR | 影响 2026.9.5+ 所有外部插件用户 |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) 计费恢复后冷却仍封锁数小时（4 月，P0） | `stale` + `needs-product-decision` | P0 级 UX 阻塞却标记 stale，需重新评估 |
| [#68596](https://github.com/openclaw/openclaw/issues/68596) watchdog 可配置（4 月） | `stale` | 8 👍 + 持续讨论，不应 stale |
| [#48709](https://github.com/openclaw/openclaw/issues/48709) Gemini 2.5 Pro textSignature 膨胀（3 月） | `stale` | 多重会话失败叠加 |
| [#129388](https://github.com/openclaw/openclaw/pull/129388) continuation XL PR（8/25 开启） | `needs proof`，安全审查中 | 长期悬置，建议明确 review 计划 |
| [#157806](https://github.com/openclaw/openclaw/pull/157806) 请求者身份保持（9/25，P1） | `waiting on author` | 安全边界相关，勿久拖 |

**健康度总结**：吞吐与社区参与度一流（日 500 issue + 500 PR 活动量、成熟自动化分类），但 P0 存储层问题积压时间偏长，维护带宽是当前主要瓶颈。建议优先收敛 WAL/checkpoint 问题族，并恢复对 stale P0 的定期复审。

---

## 横向生态对比

# 个人 AI 助手/智能体开源生态横向对比分析报告
**数据窗口：2026-10-16（过去 24 小时）**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**“架构重构 + 规模化质量攻坚”并行阶段**：头部项目日均 Issue/PR 活动量均达 500 条级别，社区参与度和自动化运维成熟度远超一般开源项目。同时，两大项目不约而同地在**网关/存储层架构演进**（OpenClaw 的 Gateway worker 线程化、Hermes 的统一网关运行时）上投入主力，说明“单主机多 agent”已是公认的方向。共性短板同样明显：Windows 平台二等公民化、更新链路脆弱、安全类积压，正在消耗社区信任。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新 | 500（新开/活跃 374，关闭 126） | 466（新开/活跃 416，关闭 50） |
| PR 更新 | 500（待合并 214，合并/关闭 286） | 500（待合并 377，合并/关闭 123） |
| Release | 3 个（beta.1 / beta.4 / extended-stable） | 2 个（v0.22.1 因构建事故作废 → v0.22.2） |
| Issue 净趋势 | 相对收敛 | 净增 +366，问题涌入明显 |
| Review 压力 | 中（待合并/合并比 0.75） | 高（待合并/合并比 3.06） |
| P0 状态 | 3 个无 fix PR，其中 1 个发布阻塞（#143524，127 评论） | 无发布阻塞级，但 2 项安全类积压 7 月至今 |
| 健康度评估 | ★★★★☆ 吞吐一流，存储层债务积压 | ★★★☆☆ 架构演进快，质量与 review 产能承压 |

**关键差异**：OpenClaw 关闭/合并效率显著更高（126 issue 关闭 + 286 PR 合并 vs Hermes 的 50 + 123）；Hermes 处于大合并（#106742）后的修复涌入期，属结构性波动。

## 3. OpenClaw 在生态中的定位

**优势**
- **发布工程成熟**：三通道发布（beta / beta 修复 / extended-stable 类 LTS），生产用户有平滑升级路径——Hermes 本期反而因错误 commit 构建事故连发两版补救。
- **维护吞吐更高**：同等活动量下合并/关闭率约为 Hermes 的 2.3 倍，UI 技术栈收敛（Lit → Solid）等长期工程纪律性强。
- **社区规模与议题热度更深**：单 issue 可积累 127 评论，多 agent 大规模部署用户群明确。

**技术路线差异**
- OpenClaw 走 **“自研化收敛”** 路线：UI 摆脱 Web Awesome/Lit、存储层迁 worker 线程、Control UI 自研。
- Hermes 走 **“统一架构落地”** 路线：一个 gateway 管理所有本地会话，重心在多通道（Telegram/WhatsApp）投递与插件生态扩展。

**风险面**：OpenClaw 最热的三个存储层 P0/P1（WAL 膨胀、插件捕获 SSD 磨损）均带 `needs-maintainer-review` 且无 fix PR，稳定性债务正开始反噬发布节奏。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 诉求本质 |
|---|---|---|---|
| **网关/存储层重构** | SQLite 操作迁 worker 线程、WAL checkpoint 修复族（#143524/#164294/#172091） | 统一网关运行时合并 + post-merge 修复（#134889） | 多 agent 并发下事件循环阻塞是共同瓶颈 |
| **Windows 平台质量** | WAL 膨胀、schtasks 不可靠（#170956、#164799） | DACL 权限、gateway 进程发现（#122935、#123490） | 两项目 Windows 用户均为明显二等公民 |
| **更新链路可靠性** | state 迁移死锁（#161921）、macOS/pacman 更新修复 | 0.22.1 错误构建、stable 通道超时（#137646） | 升级信任是两项目用户焦虑最集中处 |
| **多 agent 协作** | per-agent dreaming、大规模 agent 集群性能 | walkie-talkie 插件（#139479，会话间通信唤醒） | 从单 agent 向多 agent 编排演进 |
| **插件/技能生态** | 插件捕获机制回归（#160959、#157989） | 插件自定义 toolset、skills 可写目录 | 插件隔离与信任边界均在补课 |
| **深度推理模型兼容** | watchdog 误杀（#68596）、DeepSeek cron 降级 | Bedrock thinking prefix 恢复（#139482） | 慢思考模型对超时/流式机制的冲击 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多 agent 大规模部署、Gateway 性能、记忆子系统、自研 Control UI | 统一会话架构、多消息通道（Telegram/WhatsApp/Signal 类）、Desktop/TUI 体验 |
| 目标用户 | 重度自托管/多 agent 集群用户、生产环境（extended-stable 通道） | 个人助手向用户，多平台消息入口驱动 |
| 技术架构 | Gateway 中心化 + worker 线程存储 + Solid 自研 UI；成熟 CI 降本 | “一个 gateway 拥有所有本地会话”；Ink TUI + Desktop 双前端 |
| 生态策略 | 插件源捕获（机制有争议但集中管控） | Plugin Catalog + 社区插件 PR 流程，更开放 |

## 6. 社区热度与成熟度

- **OpenClaw：质量巩固期**。迭代速度不减（日 3 个 release、286 PR 合并），但主线是“夯实地基”——性能、更新可靠性、技术栈收敛；核心矛盾是维护带宽 vs P0 积压（WAL 族问题需统一归因）。
- **Hermes Agent：快速迭代/架构落地期**。统一网关合并后 issue 净增 +366、待合并 PR 377，典型的大版本后修复涌入；当日报当日关的响应速度（#137646）是亮点，但 review 产能和安全积压（凭证泄漏 #62336、#138843）需警惕。

**分层结论**：OpenClaw 属“高成熟度 + 债务显性化”，Hermes 属“高成长性 + 质量风险窗口期”。

## 7. 值得关注的趋势信号

1. **存储层是下一轮竞争焦点**：两项目同时被 SQLite/状态库问题困扰，预示“agent 原生存储引擎”（WAL 管理、checkpoint 策略、状态迁移原子性）将成为智能体基础设施的差异化能力。
2. **网关统一化成为架构共识**：OpenClaw 的 Gateway worker 化与 Hermes 的 unified gateway runtime 殊途同归——单进程单网关管理多会话/多 agent 是行业收敛方向。
3. **深度推理模型倒逼超时机制重构**：固定 30s watchdog、流式超时假设正在失效，可配置超时/心跳机制（OpenClaw #68596）是普遍需求，智能体框架需原生支持慢思考模型。
4. **多 agent 协作从愿景进入工程实现**：walkie-talkie（会话互唤）、per-agent dreaming、agent lineage 清理等 PR/issue 密集出现，跨 agent 通信与资源隔离是下一个功能高地。
5. **Windows 一致性欠账是共同机会**：两个项目的 P0/P1 中 Windows 问题占比高，率先补齐 Windows 体验的项目可获取显著用户迁移。
6. **发布工程即信任**：Hermes 的一次错误构建直接引发升级信任危机，而 OpenClaw 的 extended-stable 通道受好评——版本通道分层、可回滚更新链路是生产级智能体项目的必备能力。
7. **安全边界议题升温**：凭证误发（Hermes #138843）、env 快照落盘（#62336）、agent 自毁凭证（#70942）表明：agent 权限模型与敏感数据写保护应尽早纳入设计，而非事后修补。

---
*基于两项目 2026-10-16 GitHub 快照数据；个别链接笔误以仓库实际编号为准。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 · 2026-10-16

---

## 1. 今日速览

Hermes Agent 今日保持**高度活跃**状态：过去 24 小时共 466 条 Issue 更新（新开/活跃 416，关闭 50）、500 条 PR 更新（待合并 377，已合并/关闭 123），并发布 **2 个版本（v0.22.1、v0.22.2）**。核心事件是统一网关运行时 PR **#106742 已于 10 月 14 日合并进 main**，随之而来的 post-merge 修复（#134889，67 条评论）成为全项目最热话题。整体看，项目处于"大架构落地 + 密集修复"阶段：Issue 净增明显（+366），维护压力集中在 Windows 平台兼容性、会话状态管理和更新通道可靠性三条线上。

---

## 2. 版本发布

### v0.22.2（2026-10-15）— 当前最新
[Release Notes](https://github.com/NousResearch/hermes-agent/releases)

- **背景**：v0.22.1 因从错误 commit 构建而出问题——误带了**未发布的 gateway 改动**，且 Microsoft Store 应用可能卡在 "Connecting" 状态。v0.22.2 是 0.22.1 本应发布的版本。
- ⚠️ **已知问题（迁移注意）**：在 0.22.1 gateway 下运行过的会话存在已知问题（release notes 被截断，建议升级前完整阅读）。
- **建议**：**跳过 v0.22.1，直接升级到 v0.22.2**。

### v0.22.1（2026-10-14）
- 定位为 patch release：Windows Store 修复、插件更新等。
- 包含 `nemotron super 3.5` 默认参数等 Agent 侧改动。
- ⚠️ **因构建 commit 错误已被 0.22.2 取代**，不建议安装。

---

## 3. 项目进展

### 里程碑：统一网关运行时落地
- **PR #106742（`feat/unified-gateway-runtime`）已合并**（merge commit `eb75627f`）——目标为"一个 gateway 拥有所有本地会话"的架构重构进入主分支。这是近期最大的一次架构演进，后续跟进事项全部收敛到跟踪 Issue [#134889](https://github.com/NousResearch/hermes-agent/issues/134889)。
- 配套 PR [#87668](https://github.com/NousResearch/hermes-agent/pull/87668)：owner 启动时清理继承的 child lineage 标记，修复 delegated child 误判导致 Kanban 变更失败。

### 今日活跃的新 PR（代表性）
- [#139483](https://github.com/NousResearch/hermes-agent/pull/139483)：Ink TUI / Desktop 的 slash 命令遵循会话 checkpoints 与仓库信任 skills。
- [#139484](https://github.com/NousResearch/hermes-agent/pull/139484)：后台插件发现保持在所属 profile 上下文中（修复 ContextVars 丢失）。
- [#139482](https://github.com/NousResearch/hermes-agent/pull/139482)：Bedrock Converse thinking prefix-binding 拒绝的恢复处理。
- [#136726](https://github.com/NousResearch/hermes-agent/pull/136726)：error_classifier 对 503/529 配额墙改为 fallback 而非退避，改善多凭证网关体验。
- [#124836](https://github.com/NousResearch/hermes-agent/pull/124836)：限制后台 review 的 replay 上限、禁止与活跃 turn 重叠（源于一起 205k token 的成本事故）。
- [#138276](https://github.com/NousResearch/hermes-agent/pull/138276) / [#138285](https://github.com/NousResearch/hermes-agent/pull/138285)：允许 `model.default` 声明的模型通过切换校验（两个重复 PR，需维护者合并取舍）。

**整体评估**：123 个 PR 合并/关闭、50 个 Issue 关闭，吞吐健康；但 377 个待合并 PR 表明 review 是当前瓶颈，其中大量是长期挂起的社区 PR（见第 8 节）。

---

## 4. 社区热点

| 主题 | Issue | 热度 | 诉求分析 |
|---|---|---|---|
| 统一网关 post-merge 修复跟踪 | [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) | 67 评论 | 架构合并后大量边界修复集中涌入，是当前项目注意力中心 |
| API 无法开 PR（仅限单一账号） | [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) | 42 评论，标记 blocked | 外部贡献者被 CreatePullRequest 权限错误挡住，直接影响社区贡献渠道，需尽快解决 |
| Telegram 新建 topic 首条消息路由错乱 | [#136567](https://github.com/NousResearch/hermes-agent/issues/136567) | 25 评论 / 👍7 | Telegram 行为变更（thread-less 开场消息）导致 lobby recovery 误投递到旧 topic |
| `hermes update` 稳定通道解析失败 | [#137646](https://github.com/NousResearch/hermes-agent/issues/137646)（已关闭）、[#138716](https://github.com/NousResearch/hermes-agent/issues/138716)（duplicate） | 7+7 评论 | 同一 git merge-base 探测超时问题短时间内多人复现，今天已快速关闭，响应良好 |
| 会话级 provider 覆盖泄漏旧 base_url | [#138843](https://github.com/NousResearch/hermes-agent/issues/138843) | 今日新报，7 评论 | 新 provider 的密钥被发往旧 provider 端点导致 401——**涉及凭证安全**，需高优处理 |

---

## 5. Bug 与稳定性（按严重程度）

**P1**
- [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) 统一网关合并后跟踪修复（进行中，多个子项）。
- [#122935](https://github.com/NousResearch/hermes-agent/issues/122935) Windows `hermes update` 后 `%HERMES%\tools\*` DACL 加固，非提权进程无法执行 python/node（WinError 5）。暂无对应 fix PR。
- [#122555](https://github.com/NousResearch/hermes-agent/issues/122555) `pm` 激活依赖环境无 ABI 检查且丢弃当前解释器 site-packages。暂无 fix PR。

**P2（今日活跃）**
- [#138843](https://github.com/NousResearch/hermes-agent/issues/138843) provider 覆盖保留 stale base_url → 401（**凭证误发风险**）。无 fix PR。
- [#136557](https://github.com/NousResearch/hermes-agent/issues/136557) 未闭合 `<thinking` 标签绕过 reasoning 内容剥离，泄漏进 assistant content。无 fix PR。
- [#127288](https://github.com/NousResearch/hermes-agent/issues/127288) / [#129993](https://github.com/NousResearch/hermes-agent/issues/129993) Desktop 回复重复渲染（display-only，存储正常）。无 fix PR。
- [#131055](https://github.com/NousResearch/hermes-agent/issues/131055) Linux Desktop 二次启动污染 sandbox fallback 标记 → 永久 `--no-sandbox` → renderer SIGILL 循环。无 fix PR。
- [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) `browser_exec` 残留无超时的 daemon 进程。
- [#58226](https://github.com/NousResearch/hermes-agent/issues/58226) Anthropic OAuth 低用量被错误放大为 100% 已用（`util ≤1` 被误乘 100）。
- [#123490](https://github.com/NousResearch/hermes-agent/issues/123490) Windows 更新中途 spawn 的 gateway 对进程发现不可见。

**安全类（长期未解）**
- [#62336](https://github.com/NousResearch/hermes-agent/issues/62336)：终端环境快照把含凭证的 env var 写入磁盘。
- [#70942](https://github.com/NousResearch/hermes-agent/issues/70942)：`auth.json` 不在写拒绝路径中，agent 可自毁凭证存储。

---

## 6. 功能请求与路线图信号

- **[#139479](https://github.com/NousResearch/hermes-agent/pull/139479) walkie-talkie 插件**（今日新 PR）：允许一个 Hermes 会话向另一个既有会话（Telegram topic / 群线程 / DM）发消息并唤醒其完整历史——多 agent 协作方向的社区尝试，已进 Plugin Catalog 流程。
- **[#139481](https://github.com/NousResearch/hermes-agent/pull/139481)** `kanban.evidence_gate`：可选的完成证据门控，扩展 completion judge 覆盖面，标记 needs-decision，等待维护者表态。
- **[#123979](https://github.com/NousResearch/hermesResearch/hermes-agent/pull/123979) / [#124191](https://github.com/NousResearch/hermes-agent/pull/124191) / [#78090](https://github.com/NousResearch/hermes-agent/pull/78090)**：插件自定义 toolset、skills 可写目录、工具输出引用链——插件/技能生态扩展的一致信号，合并后可能进入下个 minor 版本。
- **[#58746](https://github.com/NousResearch/hermes-agent/issues/58746)（已关闭）** `hermes update` 默认指向 stable 而非 main：已落地，与 #137646/#138716 的 stable 通道问题呼应，说明更新通道正在持续打磨。
- **[#31584](https://github.com/NousResearch/hermes-agent/issues/31584)**：memory-context 应作为背景上下文而非权威用户消息——涉及 memory 安全边界，长期讨论中。

---

## 7. 用户反馈摘要

- **升级通道信任危机**：0.22.1 错误构建 + stable 通道 merge-base 超时（#137646、#138716）叠加，用户对"升级是否会坏"的焦虑集中在 install/update 相关 Issue（今日 30 条热点中约 1/3 涉及安装/更新）。
- **Windows 用户痛点突出**：DACL 权限、job object spawn、gateway 进程发现等多个 P1/P2 均为 Windows 独有，Windows 用户体验明显落后于 macOS/Linux。
- **Desktop 显示层问题**：回复重复渲染（两个独立 Issue 报告）、代码块不渲染（[#77253](https://github.com/NousResearch/hermes-agent/issues/77253)）、输入被打断（[#88621](https://github.com/NousResearch/hermes-agent/issues/88621)）——均为 display-only 但直接伤害日常使用手感。
- **多平台消息投递**：Telegram topic 错投（#136567）、MEDIA 路径带空格重复投递（[#78383](https://github.com/NousResearch/hermes-agent/issues/78383)）表明平台网关的边界场景仍在补课。
- **正面信号**：Issue 关闭响应快（#137646 当日报当日关）；社区贡献 PR 质量高（如 @nekwo 系列重构 PR），但合并等待期长。

---

## 8. 待处理积压（提醒维护者）

| 项 | 时间 | 状态 |
|---|---|---|
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) API 无法开 PR | 10-03 起，42 评论，标记 **blocked** | 阻塞外部贡献，优先级最高 |
| [#58226](https://github.com/NousResearch/hermes-agent/issues/58226) Anthropic 用量误报 | **7 月至今**，14 评论 | 计费展示类，长期未修 |
| [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) 终端快照泄漏凭证 | 7 月至今，needs-decision | 安全类积压 |
| [#70942](https://github.com/NousResearch/hermes-agent/issues/70942) auth.json 写保护缺失 | 7 月至今 | 安全类积压 |
| [#68128](https://github.com/NoussResearch/hermes-agent/issues/68128) WhatsApp WinError 5 | 7 月至今，13 评论 | 长期 Windows 积压 |
| [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) browser daemon 泄漏 | 9 月至今 | 资源泄漏类 |
| [#78090](https://github.com/NousResearch/hermes-agent/pull/78090) 工具输出引用 | 8 月至今，已 rebase 到最新 main | 社区功能 PR，待 review |
| [#87668](https://github.com/NousResearch/hermes-agent/pull/87668) child lineage 清理 | 8 月至今 | 或需随 #134889 统一处理 |
| [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) lifecycle guard 误杀 Node CLI | 9 月至今，needs-decision | 影响 benign 命令执行 |

**健康度小结**：吞吐与社区参与度优秀，架构演进（统一网关）节奏快；风险点在于 **Windows 平台质量、安全类 Issue 积压（2 项 7 月至今）、以及 377 个待合并 PR 的 review 产能**。建议优先解决 #131859 以恢复外部贡献通道。

---
*数据来源：GitHub API 快照（2026-10-16），统计窗口为过去 24 小时。链接中的个别笔误以仓库实际编号为准。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*