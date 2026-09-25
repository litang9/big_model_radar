# OpenClaw 生态日报 2026-09-26

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-25 23:17 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-26

---

## 1. 今日速览

OpenClaw 今日保持极高活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 464，关闭仅 36），PR 更新 500 条（待合并 419，合并/关闭 81），无新版本发布。项目正处在 2026.9.6 → 2026.9.7 的密集修复窗口期，[#157531 Fixes Tracker](https://github.com/openclaw/openclaw/issues/157531) 是当前的核心协调 Issue。社区情绪整体承压：2026.9.5/9.6 版本引入的模型目录（model-catalog）相关性能与内存问题、更新器（updater）失败链、以及 claude-cli 会话状态丢失构成了三大负面反馈簇。合并吞吐（81 条）相对待合并积压（419 条）偏低，维护者评审带宽是当前瓶颈。

---

## 2. 版本发布

今日无新 Release。**2026.9.7 正在准备中**，最新候选源码为 `4fbb2c6`（含 Opus/native-policy、updater 后续修复及四项 shutdown/reload 修复），见 [Fixes Tracker #157531](https://github.com/openclaw/openclaw/issues/157531)。

---

## 3. 项目进展

今日无已确认合并记录（数据中热门 PR 均为 OPEN），但多项重要 PR 处于 "ready for maintainer look" 状态，代表 9.7 版本的主要推进方向：

- **[#157972](https://github.com/openclaw/openclaw/pull/157972) fix(release): recover stalled updates and preserve retained session data**（P1, XL）— 针对 9.6 冻结源码基线的核心恢复 PR：修复更新卡死、Gateway 离线及恢复期间保留会话数据。与 Fixes Tracker 直接关联，是本周期最重要的 PR。
- **[#158428](https://github.com/openclaw/openclaw/pull/158428) perf(agents): unblock session lanes after no-progress loops** — 解决仪表盘消息在无进展 turn 后等待 436–1,377 秒的问题，直接回应会话饥饿类反馈。
- **[#158286](https://github.com/openclaw/openclaw/pull/158286) fix: keep gateway running when native completions hit database contention**（P1）— 防止 Codex 原生子代理完成时数据库竞争导致 Gateway 退出。
- **[#156940](https://github.com/openclaw/openclaw/pull/156940) fix(codex): prevent stale native sessions from mutating successors**（P1）— 修复过期 Codex 原生会话污染后续会话的 session-state 问题。
- **steipete 系列重构**：[#158378](https://github.com/openclaw/openclaw/pull/158378)（agents core deslop 二轮）、[#158313](https://github.com/openclaw/openclaw/pull/158313)（fs-safe 共享文件系统准入/清理）、[#158272](https://github.com/openclaw/openclaw/pull/158272)（六大渠道插件 deslop）、[#158425](https://github.com/openclaw/openclaw/pull/158425)（auth 重连性能）——系统性降低代码重复，改善长期可维护性。
- **[#157956](https://github.com/openclaw/openclaw/pull/157956) feat: show declared plugin capabilities and setup guides**（XL，触及几乎所有扩展）— 插件详情页展示能力声明与安装指南，是面向用户可感知的最大功能改进。
- **[#158429](https://github.com/openclaw/openclaw/pull/158429) fix(msteams)**：Teams 拒绝格式化最终消息时流式回复重复发送的修复。

整体评估：9.7 的修复主线（更新恢复、会话数据保留、lane 解锁、gateway 存活）已成型，正等待维护者批量评审合并。

---

## 4. 社区热点

**🔥 讨论最热烈**

1. **[#153257](https://github.com/openclaw/openclaw/issues/153257)（30 评论，P0）**： "2026.9.5 把稳定环境变成 8 小时故障恢复会话" — 最强烈的负面情绪 Issue，用户明确表达后悔升级，是 9.5 质量问题的象征性反馈。
2. **[#155753](https://github.com/openclaw/openclaw/issues/155753)（28 评论，P0）**： 模型目录过期/重建死循环占满一个 CPU 核心，`readFullModelCatalog()` 每次读取都触发 `refreshExpiredCatalog()`，并关联到 #154276/#153422 一组问题——**9.6 引入的 model-catalog worker 是当前最大技术债源**。
3. **[#42475](https://github.com/openclaw/openclaw/issues/42475)（24 评论）**： 网关级 per-agent 成本预算——运营者对失控支出的长期诉求。
4. **[#22438](https://github.com/openclaw/openclaw/issues/22438)（20 评论）**： 分层 bootstrap 文件加载——大型工作区 token 浪费问题，与 [#14785](https://github.com/openclaw/openclaw/issues/14785)（工具 schema ~3,500 tok/session 固定税）同属 token 经济学热点。
5. **[#137332](https://github.com/openclaw/openclaw/issues/137332)（18 评论，P1）**： 混合终端 requester-settle 批次在所有权检查后无限重试，导致消息挂起。

---

## 5. Bug 与稳定性

### P0 / 发布阻塞级

| Issue | 问题 | Fix PR |
|---|---|---|
| [#155753](https://github.com/openclaw/openclaw/issues/155753) | model-catalog worker 打满单核（CPU 死循环） | 无直接 PR |
| [#157842](https://github.com/openclaw/openclaw/issues/157842) | **9.6 新增**：prepared-model-catalog worker 每 agent turn 泄漏 ~77 MB，超 512 MB 限制后由外部 watchdog 重启 | 无 |
| [#154812](https://github.com/openclaw/openclaw/issues/154812) | Gateway RSS 失控（实测 9.32 GiB）导致宿主 OOM + 关闭超时 | 无 |
| [#155720](https://github.com/openclaw/openclaw/issues/155720) | macOS Gateway "restart drain" 退出后 LaunchAgent 未加载，静默宕机 ~24h | 无 |
| [#152804](https://github.com/openclaw/openclaw/issues/152804) | 9.5 回归：minimax-portal 升级后丢失模型目录，心跳全部失败 | 无 |
| [#154114](https://github.com/openclaw/openclaw/issues/154114) | `openclaw update` 候选演练误报 "No usable…inference route" | 无（9.7 修复中） |

**Updater 失败簇**（P0，多为自动报告）：[#157603](https://github.com/openclaw/openclaw/issues/157603)（已关闭）、[#155094](https://github.com/openclaw/openclaw/issues/155094)、[#153049](https://github.com/openclaw/openclaw/issues/153049)、[#154924](https://github.com/openclaw/openclaw/issues/154924) 等，从 9.4→9.5 升级在 global-install-swap / rehearsal / doctor 各环节失败。⚠️ **升级链断裂意味着大量用户被锁在 9.4/9.5，放大了所有后续 bug 的影响**——PR [#157972](https://github.com/openclaw/openclaw/pull/157972) 是针对性修复。

### P1 / 数据丢失级

- [#144809](https://github.com/openclaw/openclaw/issues/144809)： claude-cli 长于 `RUN_STALE_TAKEOVER_MS` 的 turn 整条回复被丢弃——**用户损失完整生成内容**，无 fix PR。
- [#117742](https://github.com/openclaw/openclaw/issues/117742)： 多文件 `apply_patch` 失败时早期删除已提交——**数据丢失**，bulk-filed 修复卡住。
- [#154572](https://github.com/openclaw/openclaw/issues/154572)： 9.5 `sessions_spawn` 到 claude-cli 子代理必然失败（SessionTranscriptWriterClaimReboundError）。
- [#158271](https://github.com/openclaw/openclaw/pull/158271 对应 issue 同号)： chat/sessions.send 切换时 messageToolPolicyHash 翻转使 claude-cli 会话失效（fix-shape-clear，可排队）。

### P2 回归

- [#154104](https://github.com/openclaw/openclaw/issues/154104)： 4 个 Matrix E2EE 账号空闲时 ~50% CPU + 52 MB/min 磁盘写入（9.7.1 无此问题）。

---

## 6. 功能请求与路线图信号

**有 PR 支撑、可能进入近期版本：**
- Reasoning 流式展示 [#42276](https://github.com/openclaw/openclaw/issues/42276) ← [#136177](https://github.com/openclaw/openclaw/pull/136177)（telegram-e2e 已验证，待证明）
- 交付队列 TTL [#16555](https://github.com/openclaw/openclaw/issues/16555)（P1，message-loss 影响标签，动机充分）
- 渠道错误中显示上游 provider 名称 [#51336](https://github.com/openclaw/openclaw/issues/51336)（linked-pr-open）

**长期需求信号（维护者需产品决策）：**
- Per-agent 成本预算 [#42475](https://github.com/openclaw/openclaw/issues/42475) 与 per-model 用量日志 [#13219](https://github.com/openclaw/openclaw/issues/13219)——运维/成本可观测性是持续主题。
- Token 经济学：分层 bootstrap [#22438](https://github.com/openclaw/openclaw/issues/22438) + 工具 schema 瘦身 [#14785](https://github.com/openclaw/openclaw/issues/14785)。
- Memory 体系：SQLite schema MVP [#42646](https://github.com/openclaw/openclaw/issues/42646)、per-agent dreaming 配置 [#67413](https://github.com/openclaw/openclaw/issues/67413)（OOM 规避）、onboarding 强制 Memory/embedding 配置 [#16670](https://github.com/openclaw/openclaw/issues/16670)。
- 自托管 STT/TTS 接入 webchat [#45508](https://github.com/openclaw/openclaw/issues/45508)——自托管用户群体诉求明确。

---

## 7. 用户反馈摘要

**主要痛点：**
1. **升级恐惧**："我真心后悔升级到 2026.9.5"（#153257）代表了相当一部分用户心态——升级 = 破坏稳定性，且更新器本身还会失败，形成双输局面。
2. **静默故障**：macOS LaunchAgent 未加载导致 24 小时无感知宕机（#155720）；Claude Code 用户对比称"同样配置在 CC/Codex 上可靠"（#41824）——**竞品对比压力明显**。
3. **资源失控**：CPU 打满、内存泄漏、OOM kill 集中在 9.5/9.6 的 model-catalog worker，长期运行的网关用户受影响最大。
4. **内容丢失最不可接受**：长 turn 回复被丢弃（#144809）、apply_patch 半提交（#117742）引发强烈不满。

**正面信号：**
- Fixes Tracker + roboclaw-bot 自动化 issue 管理 + clawsweeper 标签体系显示维护流程高度系统化；
- 9.7 修复 PR（#157972 等）针对性强，steipete 的 deslop 系列显示核心维护者投入深度重构；
- 自动化 update-failure 报告机制（带脱敏报告文件）提升了诊断效率。

---

## 8. 待处理积压

⚠️ 值得维护者关注：

- **[#144809](https://github.com/openclaw/openclaw/issues/144809)（P1，message-loss，9-11 提出）**： 无 fix PR，仅 needs-info——长回复丢失直接影响核心信任。
- **[#117742](https://github.com/openclaw/openclaw/issues/117742)（P0，data-loss，8-02 提出）**： `clawsweeper-recovery-stuck` 标签，卡住近 2 个月。
- **[#118885](https://github.com/openclaw/openclaw/issues/118885)**： 大型 SQLite 启动时重复全量 integrity_check——recovery-stuck。
- **[#138409](https://github.com/openclaw/openclaw/issues/138409)**： gateway drain 死锁导致插件更新挂起，标记 `blocked-by-design`，需要设计层面决策。
- **[#48920](https://github.com/openclaw/openclaw/issues/48920)（P0，3 月提出，4 👍）**： 文档领先于发布版本——文档与版本对齐流程问题长期未解。
- **老 PR 积压**：[#119585](https://github.com/openclaw/openclaw/pull/119585)、[#119471](https://github.com/openclaw/openclaw/pull/119471)、[#119552](https://github.com/openclaw/openclaw/pull/119552)（8 月初，均 P1/P2 + needs proof，已 stale）——8 月社区贡献批次濒临流失。

---

**健康度小结**：项目开发动能优秀（系统性重构 + 自动化流程成熟），但 9.5/9.6 发布质量出现明显滑坡，更新器故障放大了影响面。9.7 的成败将取决于 #157972 等 P1 修复能否顺利合入并打通升级链路。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告 — 2026-09-26

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入“重度日常使用”阶段：用户不再满足于 demo，而是将项目作为长驻网关/桌面助手跑生产级工作负载（多渠道接入、cron 任务、后台进程）。随之而来的是质量诉求的系统性抬升——两大头部项目当日不约而同地被**数据丢失、静默故障、资源失控（CPU/内存）、升级链路断裂**四类问题主导社区情绪。生态的共同主题正从“功能扩张”转向**信任工程**：可恢复性、成本可观测性、升级安全性成为核心竞争力。Windows 等非主线平台的兼容性补齐是活跃的第二战场。

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 464，关闭 36） | 500（新开/活跃 330，**关闭 170**） |
| Issue 关闭率 | ~7% ⚠️ | **34%** ✅ |
| PR 更新（24h） | 500（待合并 419，合并/关闭 81） | 500（待合并 375，合并/关闭 125） |
| Release | 无（2026.9.7 准备中，候选 `4fbb2c6`） | 无（基准 v0.21.2） |
| 核心矛盾 | 维护者评审带宽瓶颈（81/419 吞吐比偏低） | Windows 迁移路径 + 2 个无 fix PR 的 P1 |
| 健康度评估 | ⚠️ 开发动能强、发布质量滑坡（9.5/9.6 回归密集） | ✅ 修复冲刺节奏健康，清理吞吐稳健 |

**关键洞察**：OpenClaw 的 464 新活跃 vs 36 关闭反映“修复窗口期”的舆情井喷；Hermes 的 34% 关闭率显示其维护闭环能力目前更优。

## 3. OpenClaw 在生态中的定位

- **体量与心智领导地位**：Issue 编号已至 158k+（Hermes 约 123k），讨论密度高（单 issue 30 评论级），是生态中事实上的参照系项目。
- **技术路线差异**：OpenClaw 走“**网关中心 + 多渠道插件化**”路线（Telegram/Teams/Matrix 六渠道、Gateway 常驻、模型目录/updater 等基础设施厚重）；Hermes 更偏“**桌面 + 多 agent runtime**”（Desktop/TUI、kanban、HRR 记忆、Nous Portal 计费绑定）。
- **优势**：维护流程自动化成熟（Fixes Tracker、roboclaw-bot、clawsweeper 标签体系、脱敏故障自动上报），系统性重构（steipete deslop 系列）显示核心维护者深度投入。
- **劣势/风险**：9.5/9.6 引入 model-catalog worker 成最大技术债源（CPU 死循环 + 每 turn 泄漏 77MB）；**升级链断裂使用户被锁在旧版**，放大所有后续 bug；竞品对比压力已显性化（用户称“同样配置在 CC/Codex 上可靠”）。相比之下 Hermes 虽然也有数据丢失级问题（kanban #119003），但未出现发布质量整体滑坡。

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **Token 经济学** | OpenClaw（#22438 分层 bootstrap、#14785 工具 schema ~3,500 tok/session）、Hermes（#2045 懒加载 skills，87 个捆绑技能） | 系统提示/技能列表的按需加载，降低每会话固定 token 税 |
| **Memory 体系** | OpenClaw（SQLite schema MVP #42646、per-agent dreaming #67413）、Hermes（HRR 检索重构 #123181、memory_char_limit 扩容 #5320） | 记忆从“够用”走向“可检索、可配置、可扩容”，且需规避 OOM |
| **成本可观测性** | OpenClaw（per-agent 预算 #42475、per-model 用量日志 #13219）、Hermes（#123179 心跳唤醒降本、#110912 计费透明度） | 运营者对失控支出/无效模型调用的控费需求 |
| **数据完整性与恢复** | 双方（OpenClaw #144809/#117742；Hermes #119003） | 生成内容/任务数据不可静默丢失，是用户信任底线 |
| **升级可靠性** | OpenClaw（updater 失败簇）、Hermes（PM runtime/venv 迁移 #122183） | 升级不应破坏既有环境，回滚/恢复路径必须存在 |
| **非主线平台兼容** | Hermes 为主（Windows cp936、自启动机制），OpenClaw（macOS LaunchAgent） | 长尾平台用户是活跃贡献者群体 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道消息网关、插件生态（能力声明/安装指南 #157956）、自托管推理 | Desktop 体验、HRR 全息记忆、后台终端/kanban 任务编排 |
| 目标用户 | 自托管网关运营者、多渠道重度用户 | 桌面个人用户、Nous Portal 订阅生态用户 |
| 架构 | Gateway 常驻 + 渠道插件 + model-catalog/updater 基础设施层 | PM runtime + 多 agent（claude-cli 等子代理）+ venv/自启动管理 |
| 商业耦合 | 较松，多 provider | 较紧（Nous Portal 计费），带来计费透明度争议 |
| 风险面 | 内存/CPU 失控、更新器 | Windows 路径、安全边界（磁盘破坏命令零拦截 #102371） |

## 6. 社区热度与成熟度分层

- **OpenClaw — 大规模快速迭代 + 质量承压期**：Issue 编号量级最大、舆情热度最高，但 9.5/9.6 发布质量滑坡 + 评审带宽瓶颈（8 月社区 PR 批次濒临流失）说明已到“规模反噬质量”的临界点。9.7 是关键节点。
- **Hermes Agent — 快速迭代 + 修复冲刺期（相对健康）**：34% 关闭率、“按根因分组一波一 PR”的修复范式获社区好评，报告者主动复测确认修复。处于质量巩固与功能扩张并行的上升期。
- 共同成熟度信号：双方都建立了自动化 issue 管理，但 Hermes 的维护闭环速度目前领先；OpenClaw 的流程体系更系统化但吞吐跟不上规模。

## 7. 值得关注的趋势信号

1. **“信任 > 功能”成为分水岭**：数据丢失类 issue（回复被丢弃、任务被销毁、patch 半提交）在两个项目都引发最强烈情绪。对开发者的启示：** Durability（WAL、事务性写入、恢复工具）应是一等公民，而非事后补丁。
2. **升级是最大的隐性风险面**：OpenClaw 的 updater 失败链证明——升级路径一旦断裂，所有后续修复都无法触达用户。原子升级 + 自动回滚 + 升级演练（rehearsal）将成为智能体基础设施标配。
3. **Token 成本是新的性能指标**：从工具 schema 固定税到技能懒加载，用户开始用“每会话 token 开销”评估框架。“省 token 的架构”（按需加载、心跳降频唤醒）有直接产品价值。
4. **安全边界从讨论走向刚需**：`--yolo` 模式下 shred/blkdiscard 零拦截（Hermes #102371）提示——agent 拥有 shell 权限后，破坏性命令的硬拦截层是必须内建的。
5. **竞品对比压力显性化**：用户以“在 Claude Code/Codex 上可靠”作为基准批评开源方案，说明开源智能体项目正与商业闭源产品在同一用户体验赛道竞争，稳定性工程不能再以“开源项目”标准自我豁免。
6. **维护带宽是规模项目的第一约束**：OpenClaw 419 待合并 PR vs 81 吞吐提示，自动化评审/分级合并流程（如 Hermes 的 auto-fix lint 闭环）是可持续运营的必要投资。

**对技术决策者的建议**：当前选型上，OpenClaw 适合多渠道网关场景但应等待 9.7 验证升级链修复；Hermes 适合桌面个人助手场景但 Windows 用户需暂缓跟进 PM runtime 迁移，并注意自行加防护措施（快照/备份）以对冲数据丢失类已知缺陷。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-09-26

## 1. 今日速览

Hermes Agent 今日保持高活跃度：过去 24 小时内 Issues 更新 500 条（新开/活跃 330，关闭 170），PR 更新 500 条（待合并 375，已合并/关闭 125），关闭率达 34%（Issues）和 25%（PR），显示维护团队清理节奏稳健。今日无新版本发布，主线工作集中在 Windows 平台兼容性修复、Desktop 体验打磨和 cron/gateway 稳定性。多位高产贡献者（@OutThisLife、@atzx、@liuhao1024 等）持续输出按根因分组的修复 PR，项目处于“修复冲刺”阶段。安全与计费类问题（磁盘破坏命令无拦截、Nous Portal 计费异常）值得关注。

## 2. 版本发布

今日无新版本发布。（近期基准版本为 v0.21.2，从 issue 环境信息推断）

## 3. 项目进展

今日合并/关闭的 PR 以自动化格式修复和桌面端修补为主：

- **#123172 / #123175**（已关闭）— bot 自动格式化 PR，`auto-fix lint` 工作流持续自合并/自回收，CI 自动化运转正常。
- **#122366**（已关闭）— 修复孤立 workspace 标签栏的 Close/+ 按钮行为，替代 #107444 并采纳社区方案（co-authored），体现良好的社区协作模式。[链接](https://github.com/NousResearch/hermes-agent/pull/122366)

在途高价值 PR（待合并，推动项目前进的方向）：

- **#121524**（P1）— 修复 `display.show_reasoning: false` 时仍输出 reasoning 与工具 UI 噪音的问题，TUI/Desktop 双端生效。[链接](https://github.com/NousResearch/hermes-agent/pull/121524)
- **#122268**（P2）— 统一 Windows gateway 只保留一种自启动机制（计划任务 vs 启动文件夹），消除双重启动冲突。[链接](https://github.com/NousResearch/hermes-agent/pull/122268)
- **#123181** — 全息记忆（HRR）检索重构：`probe/related/reason` 改用实体索引，修复候选排序退化为信任顺序的算法缺陷。[链接](https://github.com/NousResearch/hermes-agent/pull/123181)
- **#123179** — 后台进程心跳仅在产生新输出时唤醒 agent，且不再渲染为用户气泡，显著降低无效模型调用成本。[链接](https://github.com/NousResearch/hermes-agent/pull/123179)

整体判断：375 个待合并 PR 中活跃推进约 20 个高质量根因修复，Desktop/cron/Windows 三条修复线并行，前进速度健康。

## 4. 社区热点

- **#88584**（143 评论，远超其他）— 自动化 Nous 集成的 cron 合并冲突导致 pipeline 阻塞，属于自动化基础设施问题，与核心代码无关，但长期 OPEN（8/17 起）反映维护响应缺口。[链接](https://github.com/NousResearch/hermes-agent/issues/88584)
- **#119003**（30 评论，P1，OPEN，今日创建活跃）— 多路复用 gateway 下 kanban dispatch/reconcile **静默销毁真实任务行**，替换为格式错误的 `t_running` 占位符。数据丢失级缺陷，诉求明确：修复或提供恢复手段。[链接](https://github.com/NousResearch/hermes-agent/issues/119003)
- **#110912**（28 评论，已关闭）— Nous Portal 订阅积分用尽后部分模型路由按全价计费（疑似折扣路由 bug），涉及真金白银，用户敏感度极高。[链接](https://github.com/NousResearch/hermes-agent/issues/110912)
- **#97065**（21 评论，OPEN）— Keet gateway 配置向导 TypeError 崩溃，Keet 用户接入受阻。[链接](https://github.com/NousResearch/hermes-agent/issues/97065)

## 5. Bug 与稳定性（按严重程度）

**P1**
1. **#119003** — kanban 任务行被静默销毁（见上）。**暂未见对应 fix PR**，建议优先分派。
2. **#122183** — Windows PM runtime 下旧 venv 被前置到 sys.path，`hosted_room_worker` 因 `pydantic_core` 版本不匹配崩溃，`hermes update --gateway` 后必现。相关：#122268 处理自启动机制，但未直接修复 venv 隔离。[链接](https://github.com/NousResearch/hermes-agent/issues/122183)
3. **#122222** — 自管安装上**所有计划任务在运行前即失败**（外部 cron worker PYTHONPATH 只含仓库根目录，无法导入依赖）。今日新报，暂无 fix PR。[链接](https://github.com/NousResearch/hermes-agent/issues/122222)

**P2**
4. **#122239** — Windows cp936 区域下 `hermes update` 因 git 输出未指定编码而 UnicodeDecodeError 崩溃。中文用户高频场景，修复成本低，建议尽快处理。[链接](https://github.com/NousResearch/hermes-agent/issues/122239)
5. **#122861**（PR，在途）— macOS GUI 启动继承裸 PATH，`uvx` MCP server ENOENT，有 fix PR 待合并。[链接](https://github.com/NousResearch/hermes-agent/pull/122861)

**安全类（P3 但风险高）**
6. **#102371** — `shred/wipefs/blkdiscard` 对块设备**零拦截**，`--yolo` 模式下静默毁盘。open 状态近一个月，建议提升优先级。[链接](https://github.com/NousResearch/hermes-agent/issues/102371)

**已修复/关闭的稳定性问题**：#109790（macOS WAL 世代锁死，P1，已随 #109841/#110544 修复关闭）、#109966（WAL handoff，报告者确认不再复现，仍 OPEN 待正式关闭）。

## 6. 功能请求与路线图信号

- **#2045**（👍4）— 懒加载 skills，将技能列表从系统提示移至按需工具；87 个捆绑技能消耗大量 token，与成本优化方向一致，长期讨论中，有望进入下一版本规划。[链接](https://github.com/NousResearch/hermes-agent/issues/2045)
- **#5320** — memory_char_limit 自动扩容并暴露用量压力指标；与 #123181 的记忆检索重构同属 memory 领域，可能在记忆主题版本中一并解决。[链接](https://github.com/NousResearch/hermes-agent/issues/5320)
- **#50718**（👍3）— Desktop 会话可见性：未读标记、需输入提示、OS 徽章。多次被提及，是 Desktop 路线图的明确信号。[链接](https://github.com/NousResearch/hermes-agent/issues/50718)
- **#123174**（PR 在途）— PM 尊重用户 npm 镜像，利好封闭网络/国内用户，符合近期 Windows/兼容性修复浪潮，大概率近期合入。[链接](https://github.com/NousResearch/hermes-agent/pull/123174)

## 7. 用户反馈摘要

**痛点**
- **Windows 支持是最大抱怨源**：cp936 编码崩溃（#122239）、PM runtime 迁移遗留 venv 冲突（#122183）、UGit git.exe 找不到（#123099）、自启动混乱（#122268）——Windows 用户升级路径上的坑密集。
- **静默失败模式引发信任问题**：kanban 任务静默丢失（#119003）、skills 写入审批无审查入口而静默堆积（#98330）、Linux .desktop 图标静默启动失败（#51327）。用户反复强调“没有任何报错”是最糟体验。
- **计费透明度**：#110912 反映订阅积分与折扣路由的计费逻辑不透明，费用突增 3 倍但用量未变。

**满意点**
- 修复响应质量高：多个 issue（#109790、#109966）中报告者主动复测确认修复生效，社区对修复验证流程评价正面。
- 后台任务/多平台 gateway（Discord/Telegram）是核心使用场景，#41225、#52694 显示重度用户依赖 `terminal(background=true)` 长驻进程。
- @OutThisLife 的“按根因分组、一波一 PR”修复方式（wave-8 等）在评论区获得积极反馈。

## 8. 待处理积压

| Issue | 状态 | 建议 |
|---|---|---|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584)（143 评论，8/17 起） | OPEN | 自动化集成阻塞已超 1 个月，虽为 invalid/低优先级，但评论量最高，建议正式回应或关闭 |
| [#102371](https://github.com/NousResearch/hermes-agent/issues/102371) | OPEN 3 周+ | 磁盘破坏命令无硬拦截，安全边界问题不应长期积压 |
| [#98330](https://github.com/NousResearch/hermes-agent/issues/98330) | OPEN 近 1 月 | `skills.write_approval` 无审查 UI，pending 文件无限堆积，属功能半成品 |
| [#5320](https://github.com/NousResearch/hermes-agent/issues/5320) | OPEN 4 月+ | 记忆上限过小是长会话用户长期诉求，已有 👍2，需决策 |
| [#2045](https://github.com/NousResearch/hermes-agent/issues/2045) | OPEN 6 月+，needs-decision | 懒加载 skills 影响所有用户的 token 成本，建议排期决策 |
| [#47954](https://github.com/NousResearch/hermes-agent/issues/47954) | OPEN 3 月+ | honcho 记忆 provider 启动竞态，有明确复现路径，属易修 P3 |

---

**健康度小结**：Issue 关闭率 34%、PR 吞吐 125/500，修复产出稳定；主要风险集中在 Windows 升级路径（PM runtime 迁移）与两处尚无 fix PR 的 P1 数据完整性问题（#119003、#122222），建议维护者优先分派。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*