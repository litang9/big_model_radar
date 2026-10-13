# OpenClaw 生态日报 2026-10-13

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-13 02:00 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# 📋 OpenClaw 项目动态日报 — 2026-10-13

## 1. 今日速览

OpenClaw 今日保持高度活跃：过去 24 小时内 Issues 更新 500 条（新开/活跃 330，关闭 170），PR 更新 500 条（待合并 304，已合并/关闭 196），并发布 2 个新版本（v2026.10.2 稳定版与 v2026.10.5-beta.2）。**版本更新/升级链路的可靠性仍是当前最大痛点**，多条 P0 级 release-blocker 集中在 Windows 更新 handoff、macOS watchdog 和包恢复卡死上。社区方面，维护者 @steipete 今日提交了多个性能与状态管理 PR，开发节奏密集。总体健康度：活跃度优秀，但稳定性债务（尤其更新路径）值得关注。

---

## 2. 版本发布

### v2026.10.2（稳定版）
- **核心内容**：修复从 2026.10.1 的首次升级无法干净完成的问题；就地更新成功后不再报错；Windows、克隆文件系统、私有 Node 更新路径能正常完成而不是卡死/回滚（关联 #168849、#169031 等）。
- **迁移注意**：从 2026.10.1 升级的用户**强烈建议**直接升级到此版本；此前版本升级卡在 `update-recovery-pending` 的用户应被此版本自动恢复。

### v2026.10.5-beta.2（Beta）
- **核心内容**：`openclaw update` 现在能妥善处理陈旧的 handoff lease、已完成 receipt 及遗留 2026.9.8 恢复记录，不再停在 `update-recovery-pending`；保留服务堆内存限制与 webhook listener；改进 Windows 短路径处理。
- **注意**：已有用户报告 beta.1 → beta.2 升级中候选配置读取失败退出码 1 的新问题（见 #170331），beta 观望者建议暂缓。

---

## 3. 项目进展

今日 PR 活动以维护者 @steipete 为核心，方向集中在**性能优化与状态管理健壮性**：

- **[PR #170513](https://github.com/openclaw/openclaw/pull/170513)** — 重启后妥善 settle 被替换的 subagent，修复恢复 worker 反复拒绝已变更 incarnation 的死循环。
- **[PR #170520](https://github.com/openclaw/openclaw/pull/170520)** — 将 broker request custody 迁入精确的共享 slot/request generation，是 SQLite 写入路径脱离 Gateway 线程依赖的前置重构。
- **[PR #170517](https://github.com/openclaw/openclaw/pull/170517)** — 降低大 session 库存下 Gateway 内存占用（presentation row + recap 快照），直接回应多条内存泄漏类 issue。
- **[PR #170514](https://github.com/openclaw/openclaw/pull/170514)** — 源码 checkout 下缓存编译入口，缩短重启时间（关联 #168955 启动变慢问题）。
- **[PR #170404](https://github.com/openclaw/openclaw/pull/170404)** — memory-core 索引批量化：agent 空闲期后再统一索引，减少每 turn 的 embedding 开销。
- **[PR #170146](https://github.com/openclaw/openclaw/pull/170146)** — 功能性大件：允许插件 fork 会话的实时上下文用于后台旁路提问（Advisor 为首个消费者）。
- **[PR #157144](https://github.com/openclaw/openclaw/pull/157144)**（已关闭）— CLI bridge 请求作用域修复已被 #165432 吸收进 main，官方注明贡献归属。
- **[PR #165486](https://github.com/openclaw/openclaw/pull/165486)** — Windows 桌面版引入签名捆绑 Bun，含 Node Gateway 的受控迁移路径（兼容性 + 安全边界风险标记，仍在验证）。

**评估**：今日推进以“内存/启动性能 + 更新可靠性 + subagent 生命周期”三条主线为主，与当前最高频的 P0 issue 高度对齐，项目方向正确、节奏快。

---

## 4. 社区热点

| Issue | 评论 | 热点分析 |
|---|---|---|
| [#159356](https://github.com/openclaw/openclaw/issues/159356) llama.cpp manager 报 ready 但 embedding 子进程退出（HTTP 500） | 26 | 用户通过扩容 RAM（4→8GB）自证内存压力为诱因，社区在推动官方给出资源基线要求 |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) prepared-model-catalog.worker.js 无界内存泄漏 ~4-5GB/h | 22 | P0，冷重启 + provider 二分法复现，provider 无关——是最有说服力的泄漏报告之一 |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) 大型外部插件导致 Gateway 事件循环阻塞数分钟 | 20 | 2026.9.6 回归（#144252 引入），启动与 runtime republish 均触发 |
| [#50093](https://github.com/openclaw/openclaw/issues/50093) WhatsApp 重连后补齐漏收消息 | 20 | 3 月至今的长期功能诉求，消息静默丢失严重影响监控场景可信度 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) hook/tool 子进程泄漏形成僵尸进程堆积 | 18 | 运行时劣化类问题，与今日多条性能 PR 主题呼应 |
| [#78308](https://github.com/openclaw/openclaw/issues/78308) MCP 工具调用的渠道中介审批（consent envelope） | 18 | 安全性功能设计讨论，社区期望 MCP 调用纳入 `/approve` 管线 |

**诉求主线**：消息可靠性（不丢失、不静默失败）+ 资源可控性（内存/进程）+ 安全审批一致性。

---

## 5. Bug 与稳定性（按严重度）

### P0
- **[#159662](https://github.com/openclaw/openclaw/issues/159662)** 内存泄漏 4-5GB/h，provider 无关 — 尚无直接 fix PR，#170517 部分缓解
- **[#160959](https://github.com/openclaw/openclaw/issues/160959)** 插件捕获阻塞事件循环（2026.9.6 回归）— 无 fix PR，待维护者复审
- **[#158390](https://github.com/openclaw/openclaw/issues/158390)** `plugin-captures` tmp 目录不 GC，磁盘无限增长 — 无 fix PR
- **[#146860](https://github.com/openclaw/openclaw/issues/146860)** Windows Scheduled Task (InteractiveToken) 更新 handoff 永久 stall — 应由 2026.10.2 部分覆盖，待确认
- **[#153426](https://github.com/openclaw/openclaw/issues/153426)** `MEMORY.md`/`USER.md` 被 provenance ratchet 静默永久排除出 bootstrap 注入，无诊断无恢复 — 高危，无 fix PR
- **[#160060](https://github.com/openclaw/openclaw/issues/160060)** Windows 待机唤醒后 Gateway 54 分钟“假活”后静默消失 — 无 fix PR

### P1
- **[#168955](https://github.com/openclaw/openclaw/issues/168955)** 2026.10.1 Windows 启动回归：ready 从 ~410s 恶化到 ~1030s，`sidecars.control-ui-assets` 阻塞 477s — #170514 可能相关，待验证
- **[#132303](https://github.com/openclaw/openclaw/issues/132303)**（安全）`tools.deny` 对 claude-cli 后端不生效，被禁工具运行时仍可用 — 无 fix PR，需安全复审
- **[#101929](https://github.com/openclaw/openclaw/issues/101929)** 上下文预检估算器高估 2.3-2.6x，触发不必要的截断恢复
- **[#154891](https://github.com/openclaw/openclaw/issues/154891)** 失败并回滚的配置热重载仍永久“砖化”无关插件

### 已修复/关闭的亮点
- [#167506](https://github.com/openclaw/openclaw/issues/167506)（P0）已删除的临时 handoff 数据库阻塞全部后续更新 — 已关闭，对应 2026.10.5-beta.2 修复
- [#168750](https://github.com/openclaw/openclaw/issues/168750)（P0）更新激活 Doctor 24 分钟后失败 — 已关闭
- [#158936](https://github.com/openclaw/openclaw/issues/158936)（P0）macOS watchdog SIGTERM 慢启动 Gateway 导致重启循环 — 已关闭
- [#137729](https://github.com/openclaw/openclaw/issues/137729) transcript replay 未防护 `.trim()` 崩溃 — 已关闭（linked PR）

---

## 6. 功能请求与路线图信号

- **MCP 审批管线扩展（[#78308](https://github.com/openclaw/openclaw/issues/78308)）**：设计成熟、社区共识强，且与近期多个 security-boundary PR（如 #170498 app access 保留）方向一致，**很可能进入后续版本**。
- **SecretRef 支持 `mcp.servers[].env`（[#76493](https://github.com/openclaw/openclaw/issues/76493)，👍4）**：属于安全最佳实践补齐，schema 改动小，纳入概率高。
- **插件 fork 实时会话上下文（[PR #170146](https://github.com/openclaw/openclaw/pull/170146)）**：已在实现中，Advisor 是首个消费者，属于已确认的路线图项。
- **上下文超限时触发模型 fallback（[#9986](https://github.com/openclaw/openclaw/issues/9986)，已关闭）**：关闭状态可能意味着已实现或已被现有 truncation recovery 方案取代。
- **Onboarding 强制配置 Memory/Embedding（[#16670](https://github.com/openclaw/openclaw/issues/16670)）**：仍需产品决策；与 #168413（memory extraPaths 失效）显示 memory 子系统整体需要一轮打磨。
- **维护者已接受的设计记录 [#169254](https://github.com/openclaw/openclaw/issues/169254)**：JSON filter/delete 字段提升为列（PostgreSQL 可移植性）——明确的数据库层演进信号。

---

## 7. 用户反馈摘要

- **升级焦虑普遍**：多位用户报告不同平台（Windows/macOS/Linux arm64）的更新链路失败，甚至形成“手动 npm install 能成功、官方 update 失败”的信任落差（[#156112](https://github.com/openclaw/openclaw/issues/156112)）。
- **资源占用是长期抱怨**：内存泄漏、OOM、僵尸进程、磁盘 tmp 堆积、启动耗时翻倍——单用户轻负载部署也会触发。
- **静默失败最伤信任**：消息丢失不报错（WhatsApp/Telegram/Slack）、MEMORY.md 被静默排除、失败 run 无通知（[#128916](https://github.com/openclaw/openclaw/issues/128916)），用户反复强调“宁可报错也不要无声吞掉”。
- **正面信号**：issue 报告质量普遍很高（带 bisect、复现步骤、journal 分析），说明核心用户群工程能力强、参与意愿高；2026.10.2 发布后多条升级阻塞 issue 被快速关闭，社区反馈响应有效。

---

## 8. 待处理积压（建议维护者关注）

| 条目 | 状态 | 说明 |
|---|---|---|
| [#50093](https://github.com/openclaw/openclaw/issues/50093) WhatsApp 消息补齐 | 3 月至今，stale | 消息可靠性核心诉求，20 条评论无产品决策 |
| [#16670](https://github.com/openclaw/openclaw/issues/16670) Onboarding 缺 Memory 配置 | 2 月至今 | 新用户转化摩擦点，需产品决策 |
| [#160060](https://github.com/openclaw/openclaw/issues/160060) Windows 待机后 Gateway 静默死亡 | P0，stale 风险 | 无诊断手段，排查困难 |
| [#77249](https://github.com/openclaw/openclaw/issues/77249) Slack 僵尸 WSS 无事件无日志 | 5 月至今，stale | 需要维护者复审 |
| [#125826](https://github.com/openclaw/openclaw/issues/125826) Discord 语音双重播放 | 8 月至今 | 需补充信息后推进 |
| [PR #157806](https://github.com/openclaw/openclaw/pull/157806) 请求者身份保持 | XL，waiting on author | 安全边界 + 兼容性双标记，长期挂起 |
| [PR #137594](https://github.com/openclaw/openclaw/pull/137594) MCP server 不可用命名 | 9 月至今，stale | 关闭 #137398 的关键，需作者响应 |
| [PR #138406](https://github.com/openclaw/openclaw/pull/138406) cron topic 路由泄漏 | P1，stale | 含消息投递 + 安全风险，需 proof 推进 |

**积压提醒**：Dated TODO sweep（[#114414](https://github.com/openclaw/openclaw/issues/114414)）显示 CI auth 路径等 10 月初 TODO 已逾期，建议优先清理。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告 — 2026-10-13

## 1. 生态全景

个人 AI 助手类开源项目已进入“功能高速迭代与稳定性债务并存”的阶段：两大头部项目单日 Issue/PR 更新均达数百条，社区参与度接近一线基础设施项目水平。用户需求正从“能跑起来”转向生产可用性——消息可靠性、资源可控性、静默失败可观测性成为最高频诉求。更新/升级链路的可靠性是当前全生态最集中的信任痛点（两项目均出现“升级即坏”类 P0/P1 issue）。同时，安全边界（MCP 审批、secrets 管理、工具权限）和多机架构（远程 Agent + 本地执行）是明确的新一轮路线图方向。

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 330，关闭 170） | 408（新开/活跃 328，关闭 80） |
| PR 更新（24h） | 500（待合并 304，合并/关闭 196） | 500（待合并 375，合并/关闭 125） |
| Issue 关闭率 | ~34% | ~20–25% |
| Release | 2 个（v2026.10.2 稳定版 + v2026.10.5-beta.2） | 1 个（v0.21.7，2026-10-11，汇总 204 PR） |
| 核心维护者信号 | @steipete 单日多 PR，方向清晰 | 多维护者并行（onboarding / bot-delivery / kanban 分线推进） |
| 主要风险 | 升级链路 P0 集中、内存泄漏无 fix | 0.21.6 回归阻断升级、外部贡献权限受阻（#131859） |
| 健康度评估 | **活跃度优秀 + 回应快速**，稳定性债务（更新路径）待偿 | **迭代速度极快**，回归测试与升级链路是明显短板，积压更大 |

## 3. OpenClaw 在生态中的定位

- **优势**：Issue 消化速度（34% vs ~20%）与发布节奏明显更快，且 PR 主线与最高频 P0 高度对齐（内存/启动性能、更新可靠性、subagent 生命周期），工程方向感强。核心用户工程质量高——issue 普遍带 bisect、journal 分析，社区自诊断能力强。
- **技术路线差异**：OpenClaw 走“Gateway + SQLite broker + 插件化多渠道”的重架构路线，正在做底层解耦重构（#170520 写入路径脱离 Gateway 线程）与签名 Bun 迁移（#165486）；Hermes 更偏“桌面优先 + 多 profile 网关 + kanban/cron 运维型工作流”，onboarding 刚完成破坏性重做。
- **社区规模**：两者 Issue/PR 绝对量相当，但 OpenClaw 积压更小（304 待合并 vs 375）、关闭率更高；Hermes 面临贡献通道受阻（#131859），外部贡献健康度暂弱于 OpenClaw。OpenClaw 的 issue 编号量级（#170k+ vs #137k+）也暗示其累计交互规模更大。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **升级/更新链路可靠性** | #146860、#168955、#156112（官方 update 失败 vs 手动安装成功） | #134469、#124471、#136281、#107402 | 升级不应破坏插件依赖、不应卡死/静默失败，需要可回滚与可诊断 |
| **消息投递可靠性（静默丢失）** | #50093（WhatsApp 补齐）、#77249（Slack WSS）、#128916 | #115003/#115771（turn-lease/drain 系列）、#71239（Telegram 停摆）、#136567 | “宁可报错也不要无声吞掉”——监控/网关场景的信任底线 |
| **资源占用与进程泄漏** | #159662（4–5GB/h 泄漏）、#97616（僵尸进程）、#158390（tmp 不 GC） | #127647（桌面空闲资源 Tracker）、#121095（browser_exec 泄漏 daemon） | 单用户轻负载也不应 OOM；空闲态 CPU/内存需可控 |
| **安全边界与 secrets** | #78308（MCP consent envelope）、#76493（SecretRef）、#132303（tools.deny 失效） | #88608（Langfuse 脱敏，已关闭） | 工具调用纳入审批管线、密钥不落日志 |
| **Memory 子系统打磨** | #16670、#168413、#153426（MEMORY.md 静默排除） | #124471（Hindsight 迁移卡死） | 记忆是个人助手核心资产，可靠性/可配置性均待成熟 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道消息网关 + 插件生态 + memory/Advisor 等智能能力（会话 fork 上下文） | 桌面端体验 + 多 profile + kanban/cron 自主工作流运维 |
| 目标用户 | 技术型自托管用户（issue 质量高、可自诊断）、消息渠道集成场景 | 桌面个人用户为主（Windows 中文用户群体显著）、Docker/Cloud 全渠道分发 |
| 架构关键点 | Gateway 中心化 + SQLite broker + Bun/Node 迁移路径 + subagent 生命周期管理 | Electron/桌面渲染 + Python 后端（venv/插件依赖）+ turn-lease 多层投递 |
| 渠道广度 | WhatsApp/Telegram/Slack/Discord 语音等，渠道数量明显更多 | Telegram/桌面为主，渠道相对聚焦 |
| 国际化 | 未见系统性编码问题 | Windows 中文环境（cp936、中文路径）是专项短板 |

## 6. 社区热度与成熟度

- **第一梯队（快速迭代 + 质量并行巩固）**：OpenClaw。日均 500 级更新 + 单日双发布，同时主动偿还性能债（#170514/170517），方向与痛点对齐度高，处于“高速迭代中主动巩固”的最健康状态。
- **快速迭代期（质量债务待收口）**：Hermes Agent。两版间 204 PR 的速度惊人，onboarding 破坏性重做显示产品仍在塑形期；但 0.21.6 api_server 回归、插件依赖丢失、PR 权限问题表明回归测试和发布工程跟不上迭代速度，需在下个 minor 前收口 update/install 链路。
- **共同警示**：两项目的长期 stale 积压（OpenClaw #50093 三月未决、Hermes #18715 五月 40👍 未决）说明高热度功能诉求若长期无产品决策，会持续消耗社区信任。

## 7. 值得关注的趋势信号

1. **“静默失败”是个人助手的第一信任杀手**。两项目最高热 issue 均为消息丢失/静默排除/无通知失败。对开发者的启示：可观测性（报错、诊断、回执）应与功能同等优先，"fail loud" 正在成为用户硬性要求。
2. **更新链路正在成为开源桌面/自托管产品的竞争壁垒**。两个项目同时爆发升级类 P0，说明自更新、依赖保留、状态迁移（handoff lease / venv 重建）是被低估的工程难度高地，值得专项投入与回归测试基建。
3. **资源效率成为 AI 助手的采购级指标**。4–5GB/h 泄漏、空闲 CPU/GPU 占用、启动耗时翻倍——随着 agent 常驻化、长会话化，内存与进程生命周期管理将决定产品的“可日常使用性”。
4. **安全审批管线是下一轮共识功能**。MCP 工具调用纳入 consent/approve 管线（#78308 社区共识强 + 多个 security PR 佐证）预示 agent 工具权限治理将成为标配，早期布局者有先发优势。
5. **多机/远程架构是明确的下一代形态**。Hermes 的远程 Agent + 本地执行（40👍）与 hub API PR、OpenClaw 的会话 fork + Advisor 旁路提问，都指向“主 agent + 周边智能体协作”的拓扑演进。
6. **国际化（尤其中文/Windows 环境）是被低估的用户基数**。Hermes 连续三个中文编码 issue 且 fix PR 滞留未合并——对任何面向 C 端的开源助手项目，编码/路径兼容性应进入 CI 基线测试。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-13

## 1. 今日速览

Hermes Agent 今日保持**高活跃度**：过去 24 小时内 Issues 更新 408 条（新开/活跃 328，关闭 80），PR 更新 500 条（待合并 375，已合并/关闭 125），关闭率约 20–25%，消化速度健康但积压量仍然可观。项目于 10 月 11 日发布 **v0.21.7** 补丁版本，将自 v0.21.6 以来约 204 个 PR 打包为稳定发布，覆盖桌面端、Docker、Microsoft Store 及 Hermes Cloud 全渠道。当前讨论热点集中在桌面端空闲资源占用（#127647）、v0.21.6 升级引发的 api_server 回归（#135298），以及一系列 Windows 非 UTF-8 编码兼容性问题。@yoyodine-industries 的多层 bot-delivery / kanban 加固系列 PR 仍在持续推进，是本周工程主线的核心。

## 2. 版本发布

### v0.21.7（2026-10-11）
- **性质**：补丁版本，汇总 v0.21.6 → v0.21.7 期间约 **204 个已合并 PR**。
- **覆盖渠道**：桌面应用（macOS Apple Silicon、Windows）、Microsoft Store 与 MSIX、安装器、Docker、Hermes Cloud。
- **迁移注意**：
  - v0.21.6 起才引入 per-version Docker 标签，0.21.5 无法用 Docker bisect（见 #135298）。
  - 多个报告指向升级路径问题：staged venv 重建丢失插件依赖（#134469）、Hindsight 迁移卡死（#124471）、`stable.json` 404（#136281）。**建议升级前备份 `~/.hermes` 并检查插件状态。**

## 3. 项目进展

- **125 个 PR 合并/关闭**，主要进展方向：
- **Onboarding 重构系列**（@alt-glitch）：#137429（first-run 后端，含 `setup_beat` 工具）→ #137522（桌面首跑引导聊天 + `set_theme`，删除旧 `apply_layout`）→ #137420（删除旧 agentic setup 流程）。这是一次**有破坏性的完整切换**，无迁移路径，标志桌面首次体验全面重做。
- **Bot-delivery / turn-lease 四层系列**（@yoyodine-industries）：#115003 / #115013（drain 所有 profile home）/ #115771（drained turn 的 lane scope）持续推进，系统性消除静默消息丢失，对多 profile 网关可靠性是重要补强。
- **Kanban 加固**：#118546（BLOB 注入修复）、#118500（跨 board 并发上限）、#118421（拒绝重初始化已删除的 board DB）、#118290（毒行隔离）——多dispatch 稳定性显著提升。
- **安全修复关闭**：#88608 Langfuse 上传前的 secrets/邮箱完整脱敏，已关闭。
- **Solstice 模型列表更新**：#137525 增加 Gemini 3.1 Pro / 3.8 Flash / 3.5 Flash Lite。

## 4. 社区热点

| Issue | 热度 | 诉求 |
|---|---|---|
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) API 创建 PR 权限错误 | 34 评论 | 贡献者被 blocked，fork PR 无法打开，直接影响社区贡献通道，需官方优先排查权限配置 |
| [#127647](https://github.com/NousResearch/hermes-agent/issues/127647) 桌面端空闲资源消耗 Tracker | 30 评论 | 渲染器 CPU/GPU、后端 serve CPU、内存空闲占用，是桌面用户最集中的抱怨之一 |
| [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) 远程 Agent + 本地工具执行 | 25 评论 / 40 👍 | 高价值功能需求，长期开放（5 月至今），社区呼声最高的 roadmap 信号 |
| [#107402](https://github.com/NousResearch/hermes-agent/issues/107402) `hermes update` 永久 stale 警告 | 22 评论 | 升级体验问题，与多个 update 相关 issue 叠加 |
| [#136567](https://github.com/NousResearch/hermes-agent/issues/136567) Telegram 话题首消息路由错误 | 16 评论 | Telegram 新的 thread-less 投递行为变化导致路由错乱，上游协议演进型 bug |

## 5. Bug 与稳定性（按严重程度）

**P1**
- [#135298](https://github.com/NousResearch/hermes-agent/issues/135298) — 0.21.6 回归：未配置消息平台时 api_server 启动后永不连接（Docker，5+ 环境复现）。**尚无 fix PR，回归阻断升级，建议最高优先。**
- [#134469](https://github.com/NousResearch/hermes-agent/issues/134469) — `hermes update` 重建 venv 丢失插件依赖，provider 插件静默失效。无 fix PR。
- [#71239](https://github.com/NousResearch/hermes-agent/issues/71239) — Telegram dispatcher 静默停摆。开放中。

**P2**
- [#120582](https://github.com/NousResearch/hermes-agent/issues/120582) — 生产事故级：proactive prune + 压缩导致会话中工具结果被 stub、参数截断，真实数据丢失。需高度关注。
- [#136281](https://github.com/NousResearch/hermes-agent/issues/136281) — 更新检查 404（stable.json），官方资产端问题。
- [#129993](https://github.com/NousResearch/hermes-agent/issues/129993) — 桌面端回复气泡重复渲染（持久层正常）。
- [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) — `browser_exec` 泄漏 daemon 进程。
- Windows 编码系列：[#122239](https://github.com/NousResearch/hermes-agent/issues/122239)（cp936 UnicodeDecodeError）、[#131093](https://github.com/NousResearch/hermes-agent/issues/131093)（中文用户名路径）——**已有 fix PR #122594 / #126325 待合并**。
- [#58226](https://github.com/NousResearch/hermes-agent/issues/58226) — Anthropic OAuth 用量 ×100 错误缩放。

**已修复/关闭**
- [#133856](https://github.com/NousResearch/hermes-agent/issues/133856) — `sk-ant-usr-` 前缀 key 被误判为 OAuth（P1，已关闭）。

## 6. 功能请求与路线图信号

- **远程 Agent + 本地工具执行**（[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)，40 👍）：与 [#38519](https://github.com/NousResearch/hermes-agent/issues/38519)（桌面仅装前端连远程，21 👍）诉求同源，#118294 的 peer-send hub API PR 表明团队正在铺设多机架构基础，**这两个请求大概率已在内化路线图上**。
- **delegate_task 按调用覆盖 model/reasoning_effort**（[#80222](https://github.com/NousResearch/hermes-agent/issues/80222)）：无对应 PR，尚在 needs-decision。
- **多 provider 记忆路由**（[#24770](https://github.com/NousResearch/hermes-agent/issues/24770)）：维护者已明确 wontfix（单 provider 是有意设计），社区可停止等待。
- **per-job cron 超时**（#113343）已提交 PR，可能随下版落地。

## 7. 用户反馈摘要

- **痛点集中区**：升级路径（v0.21.5→0.21.6+ 多次“升级即坏”：#134469、#124471、#135298）；桌面空闲资源占用；Windows 中文环境兼容性（用户基数不小，连续三个 issue）。
- **满意度信号**：kanban/cron 的失败归因与 dispatch 修复（#115453 等）获得运维型用户好评；Langfuse trace 增加 profile 标注（#135213）解决了多 profile 观测痛点。
- **贡献者受阻**：#131859 表明 fork PR 权限问题正在影响外部贡献，是社区健康度的直接威胁。
- **中文用户群体活跃**：#137017、#131093、#122239 均为中文报告，国际化（尤其编码与安装器）值得专项投入。

## 8. 待处理积压

- [#18715](https://github.com/NousResearch/hermes-agent/issues/18715)（5 月起，40 👍）与 [#6626](https://github.com/NousResearch/hermes-agent/issues/6626)（Gemma 4 tool calling，4 月起）— 高热度长期未决。
- [#131093](https://github.com/NousResearch/hermes-agent/issues/131093) — fix PR #122594 自 9-25 开放至今未合并，用户已提供独立复现。
- [#24770](https://github.com/NousResearch/hermes-agent/issues/24770) — 已 wontfix 但仍持续收到讨论，建议官方补充 FAQ 引导。
- Kanban dispatch 卡死双 issue [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) / [#29458](https://github.com/NousResearch/hermes-agent/issues/29458) — 与 #118290 修复方向相关，可考虑关联验收。
- #122160（bootstrap re-exec 污染外部进程）— Windows 源码安装的深层架构问题，needs-decision 悬置近一个月。

**健康度小结**：项目迭代速度极快（两版间 204 PR），但升级路径可靠性与回归测试（尤其 0.21.6 的 api_server 回归、插件依赖丢失）是当前最明显的短板，建议在下一个 minor 版本前优先收口 update/install 链路。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*