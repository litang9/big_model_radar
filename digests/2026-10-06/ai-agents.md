# OpenClaw 生态日报 2026-10-06

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-06 01:17 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-10-06

---

## 1. 今日速览

项目保持极高活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 416、关闭 84），PR 更新 500 条（待合并 354、合并/关闭 146），并发布了 **v2026.10.1-beta.1**。社区主线焦点集中在 **Gateway 内存泄漏（prepared-model-catalog worker）**、**SQLite WAL 无限膨胀** 和 **更新/升级链路多阶段失败** 三类 P0 稳定性问题上。同时 @steipete 等核心维护者持续推进会话持久化架构向 worker 侧迁移的大规模性能重构，工程节奏快但回归风险显著。整体健康度：活跃度优秀，稳定性承压，beta 渠道问题密度偏高。

---

## 2. 版本发布

### v2026.10.1-beta.1
**Highlights —— Sessions and memory：**
- 在 registry 变更中保留 usage 数据
- 从远程工作区投递 worker attachments
- 防止排队中的取消与 transcript 别名阻塞活跃 turn
- 保持 continuation signature 对齐
- 迁移 embedding 缓存

**注意事项：** beta 版本已暴露升级路径问题——从 2026.7.x 升级时 `openclaw doctor --fix` 会在 SQLite session import 阶段反复卡住，已有修复 PR #165866（P0）跟进，旧版本用户建议等待修复合并后再升级。

---

## 3. 项目进展

今日 PR 活动以架构级性能与稳定性重构为主，方向明确：**将 Gateway 主线程的重负载工作下沉到 worker**。

- **#165819 perf(session-entry): 将 cold/child patch 移至 worker** — 首轮 turn 与子会话原本仍需在 Gateway 线程执行 7 个原生 session-entry 事务，本 PR 消除主线程热点。
- **#165644 perf(auth): OAuth/凭据保存移至 worker 并增量发布** — 修复共享与 agent 本地认证保存阻塞 Gateway 的问题。
- **#165836 perf(sessions): 隔离 transcript worker 队列** — 防止稀疏的历史扫描独占单一 history worker 数百毫秒。
- **#165733 refactor(sessions): 仅持久化 run outcome，存活状态来自 run registry** — 解决重启后 session 长期显示 "running" 的幽灵状态。
- **#165885 / #165890 incognito actor 组合重构（P7k/P7m）** — 大型多阶段架构迁移的又两个前置步骤落地推进。
- **#165854 fix: doctor 更新可在不留停机 Gateway 的情况下恢复 archives** — 一次性关闭 4 个升级失败 issue（#165789、#164948、#161734、#161921），是今日用户影响最大的修复。
- **#165883 refactor(channels): deslop channels**（已关闭）— 覆盖 22 个 channel 插件的大型去重清理，同日开同日关，迭代速度惊人。
- **#165889 fix(crabbox): 时钟回拨下保持重试 deadline 单调** — 修复休眠唤醒后 `crabbox stop` 挂起。

**评估：** 单日推进 146 个 PR 合并/关闭，Gateway 主线程减负工程已过半，性能架构目标清晰；但多个 XL 级重构叠加，是近期回归高发的结构性原因。

---

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) Agent SQLite WAL 膨胀至 1.4–2.8 GB（P0，108 评论） | 🔥 最高 | Windows 单网关场景下 WAL 无 checkpoint，最终阻塞 Gateway 启动；用户已自行 `wal_checkpoint(TRUNCATE)` 验证可恢复但仍复发 |
| [#149361](https://github.com/openclaw/openclaw/issues/149361) WebUI 性能与稳定性 Umbrella（50 评论，今日仍活跃） | 高 | 维护者维护的索引型 issue，汇集桌面/移动端全部 WebUI 问题，反映前端体验债集中爆发 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) 同步持久化阻塞 Gateway 事件循环（P1，23 评论） | 高 | 与今日多条 perf PR 直接对应，社区在追踪修复进度与部分落地后的残余问题 |
| [#139710](https://github.com/openclaw/openclaw/issues/139710) 插件热重载杀死系统 agent turn（P1，21 评论） | 高 | MCP 配置热加载 mid-turn supersede 杀死 planner 回退，用户被误导为“推理不可达" |

**诉求分析：** 社区情绪集中在“单用户/小规模部署也遭遇严重资源问题”——WAL 膨胀、内存泄漏、SSD 磨损类问题影响面广且复现门槛低，是评论量高的主因。

---

## 5. Bug 与稳定性（按严重度）

### P0 / 崩溃级
1. **[#159662](https://github.com/openclaw/openclaw/issues/159662)** `prepared-model-catalog.worker.js` 无界内存泄漏，~4-5 GB/h，与负载/供应商无关（冷启动复现）。⚠️ 无 fix PR。
2. **[#159596](https://github.com/openclaw/openclaw/issues/159596) / [#160548](https://github.com/openclaw/openclaw/issues/160548)** 同一 worker 的"内存锯齿"：每次内存回收 supersede runtime 发布并**杀死所有等待中的 turn**（~200 次 critical 事件/天）。⚠️ 无 fix PR，与 #159662 同根因，是当前最紧迫的技术债。
3. **[#143524](https://github.com/openclaw/openclaw/issues/143524)** SQLite WAL 无限增长阻塞启动（见上）。⚠️ 无 fix PR。
4. **[#158095](https://github.com/openclaw/openclaw/issues/158095)** worker 状态生命周期一旦 acquire 失败即持续失败直至重启（crash-loop）。
5. **[#164396](https://github.com/openclaw/openclaw/issues/164396)** Windows 11 + Node 22 LTS 干净安装后 2026.9.8 无法连接本地 Gateway——新用户上手即失败，影响获客。
6. **[#146860](https://github.com/openclaw/openclaw/issues/146860)** Windows Scheduled Task（InteractiveToken）下托管更新永久卡在 activating。
7. **升级失败系列：** [#164074](https://github.com/openclaw/openclaw/issues/164074)（更新恢复卡死）、[#146887](https://github.com/openclaw/openclaw/issues/146887)（9.3→9.4 四阶段失败）、[#157319](https://github.com/openclaw/openclaw/issues/157319)（state-migrated-no-rollback）——部分已由 **#165854** 统一修复，待合并。

### P1 / 安全与数据
- **[#142821](https://github.com/openclaw/openclaw/issues/142821)** 默认开启的 transcript 脱敏污染回放上下文（mask 泄入命令/文件/回复）——数据损坏级。
- **[#153426](https://github.com/openclaw/openclaw/issues/153426)** provenance ratchet 静默永久排除 `MEMORY.md`/`USER.md` 注入，无诊断无恢复路径。
- **[#157989](https://github.com/openclaw/openclaw/issues/157989)** 插件源捕获每条 CLI 命令重写 ~1.4 GB、每次 Gateway 启动 ~6.5 GB，SSD 严重磨损（9.5 引入的回归），相关 [#160959](https://github.com/openclaw/openclaw/issues/160959)。
- **[#161976](https://github.com/openclaw/openclaw/issues/161976)** WhatsApp DM 回复在重启后 durable registry 交接处反复失败（消息丢失）。

### 今日关闭的稳定性问题
- [#158239](https://github.com/openclaw/openclaw/issues/158239)（旧内核 Gateway 启动失败）、[#146004](https://github.com/openclaw/openclaw/issues/146004)、多个 update failure 报告（#148681、#147160、#164459、#164528）——升级链路止血见效。

---

## 6. 功能请求与路线图信号

- **Worker-local 原生推理**：#163646（Gateway 分发）+ #163647（TUI/Control UI 采纳）双 PR 已 ready for review，属于明确的下一版本主线特性。
- **[#51441](https://github.com/openclaw/openclaw/issues/51441)** 在 session_status 中暴露 LiteLLM 路由背后的真实后端模型——长期需求，多路由代理用户呼声高。
- **[#114146](https://github.com/openclaw/openclaw/issues/114146)**（已关闭）为 OpenAI Realtime 兼容供应商增加 `talk.realtime.providers.<id>.baseUrl`——语音生态扩展信号。
- **#154043 MCP 按请求 header 归因**：解决生产中 222 runs 触发 221 次 re-catalog 的痛点，ready for review，大概率进下一版本。
- **[#46058](https://github.com/openclaw/openclaw/issues/46058)** 社区独立维护的 Android chat-first 分支寻求有限上游合作——官方移动端策略的讨论入口。
- **[#165685](https://github.com/openclaw/openclaw/issues/165685)** agents_wait 结果提供机器可读 reason——多 agent 编排可观测性需求。

---

## 7. 用户反馈摘要

**痛点（高频主题）：**
- **资源失控是最普遍抱怨**：内存泄漏（#159662、#159596）、WAL 膨胀（#143524）、SSD 磨损（#157989）——即使空闲单用户部署也在发生，用户认为"idle-to-light-traffic 不该吃 10 GB"。
- **升级是高风险操作**：多阶段更新失败、无回滚（state-migrated-no-rollback）、跨版本 doctor 卡死，运维用户普遍持"延迟升级"态度。
- **静默失败缺乏诊断**：#153426（无诊断无恢复）、#87561（跨渠道最终投递语义未定义导致用户只见沉默）——用户要求可观测性优先于新功能。
- **记忆系统行为不透明**：#150635（dreaming deep phase 永不提升）、#164923（同主机兄弟 workspace 提升率 0% vs 50-90%），高级用户在调试记忆管道时缺乏工具。

**满意点：**
- 维护者（@steipete、@vyctorbrzezowski）响应迅速，umbrella issue 与路线图式追踪（P7k/P7m）透明度高。
- 渠道生态覆盖广（22 个 channel 插件参与 deslop 重构），插件体系吸引力强。
- 修复落地节奏快：#119720 的部分修复、多个 update failure 同日关闭。

---

## 8. 待处理积压（维护者关注）

| 项目 | 状态 | 提醒 |
|---|---|---|
| [#159662](https://github.com/openclaw/openclaw/issues/159662) 内存泄漏 | 无 fix PR，P0，多 issue 汇聚（#159596/#160548/#160522/#157630/#157575） | **最高优先**：worker resourceLimits 被进程级 heap flag 静默覆盖（#157630/#157575）可能是共同根因，建议统一排查 |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) WAL 膨胀 | 108 评论、标签堆积（needs-maintainer-review + needs-info 并存）| 标签冲突需维护者裁决，用户等待近一个月 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) 僵尸子进程 | 6 月底报告至今未修 | 长期运行退化的老问题 |
| [#87561](https://github.com/openclaw/openclaw/issues/87561) 投递语义定义 | 5 月底的 product-decision issue | 需要产品层决策，阻塞多个渠道消息丢失类 bug |
| [#142821](https://github.com/openclaw/openclaw/issues/142821) 脱敏污染回放 | P0 无 fix PR | 数据损坏级，影响所有默认配置用户 |
| #165854 / #165644 等 8 个 XL PR | ready for maintainer look | review 带宽可能成为瓶颈；#165733 明确要求保持 #165188 开放直至替代落地，合并顺序需谨慎 |

---

**结语：** OpenClaw 处于“高速架构演进 + 稳定性还债”并行期。worker 化重构方向正确且推进迅猛，但 prepared-model-catalog worker 泄漏群、WAL 膨胀和升级链路可靠性三大 P0 集群若不能在 beta 转正前收敛，将持续侵蚀用户信任。建议优先合并 #165854（升级止血）并集中攻坚 #159662 根因。

---

## 横向生态对比

# 开源个人 AI 助手生态横向对比分析 · 2026-10-06

*注：本报告基于 OpenClaw 与 Hermes Agent 两份当日动态快照，对比结论以这两项目为参照系。*

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入“架构成熟期”：头部项目日均 Issue/PR 活动量均达数百条，由核心维护者主导的大规模架构重构（worker 化、updater 硬化）成为主线工程。与此同时，**稳定性债务集中爆发**——内存泄漏、存储膨胀（WAL / .git pack 失控）、升级链路失败是两个项目共同的三类 P0 问题。社区诉求正从“功能覆盖”转向“可观测性与静默失败治理”，用户明确要求“先修诊断，再加功能”。本地模型配方（Qwen3.8 Flash）、语音/多渠道集成等生态扩展信号持续增强。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（活跃 416 / 关闭 84，关闭率 ~17%整体口径） | 438（活跃 312 / 关闭 126，关闭率 29%） |
| PR 更新（24h） | 500（待合并 354 / 合并关闭 146，完成率 29%） | 500（待合并 304 / 合并关闭 196，完成率 39%） |
| Release | v2026.10.1-beta.1（beta 渠道，升级路径有已知问题） | 无（基线 v0.21.4+canary） |
| 健康度 | 活跃度优秀，稳定性承压；beta 问题密度高 | 活跃度高，维护节奏更健康；updater/Windows 债务重 |

**判断**：Hermes 的 Issue/PR 关闭效率均优于 OpenClaw（29%/39% vs 17%/29%），显示更强的 review 带宽或更小的变更粒度；OpenClaw 的 354 个待合并 PR（含 8 个 XL 级）提示 review 带宽可能是瓶颈。

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **迭代速度与工程规模领先**：单日 146 个 PR 合并/关闭，XL 级架构重构（P7k/P7m 多阶段迁移）持续推进，Gateway worker 化目标清晰。
- **渠道生态最广**：22 个 channel 插件参与 deslop 重构，多渠道接入（含 WhatsApp 等消息平台）是差异化护城河。
- **路线图透明度高**：umbrella issue、stacked migration 编号追踪，社区信任维护者响应速度。

**技术路线差异 vs Hermes：**
- OpenClaw 走 **Gateway 中心化 + worker 下沉**架构，当前正处于该架构迁移中段，回归风险与收益并存；Hermes 无此类中心网关热点问题（其 Gateway 更轻），工程重心在 **updater 崩溃安全性与跨平台分发**。
- Hermes 有明确的**本地模型优先**信号（Qwen3.8 Flash IQ4_XS + MTP 配方 PR #133599、Worker-local 原生推理在 OpenClaw 侧对应 #163646/#163647），两者殊途同归地向推理下沉靠拢。

**社区规模对比**：两者活动量级相当（Issue/PR 均触顶 500 条快照上限），但 OpenClaw 单 issue 评论量更高（WAL 膨胀 108 评论），用户基数和痛点聚集度更大；Hermes 社区贡献质量突出（#95028 架构提案、#126963 供应链加固）。

**OpenClaw 的相对短板**：新用户上手即失败（#164396 干净安装无法连接）与升级不可信，直接损害获客与留存——这是相对 Hermes 更系统性的风险。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **更新/升级链路可靠性** | #165854 统一修复 4 个升级失败 issue；#164074/#146887/#157319 无回滚升级 | teknium1 的 7 个 stacked updater PR（crash-safe commit point、update marker v2、E2E CI 门禁） | 更新必须是原子、可恢复、可回滚的操作 |
| **存储资源失控** | #143524 WAL 膨胀 1.4–2.8 GB；#157989 插件日志 6.5 GB/启动 SSD 磨损 | #131444 Windows .git 180 GiB 失控写入 | 空闲/轻负载部署不应吞噬磁盘与 SSD |
| **进程生命周期管理** | #158095 worker crash-loop；#165733 幽灵 "running" 状态；#139710 热重载杀 turn | #132358 setsid 后代 PTY kill 挂起；#105758 生命周期守卫误杀 CLI | 子进程/turn 的 acquire、kill、状态收敛需明确定义 |
| **静默失败与可观测性** | #153426 无诊断排除注入；#87561 投递语义未定义；#165685 机器可读 reason | #123926 插件随机静默丢弃；#63485 Telegram 富消息静默忽略 | “没有错误提示比崩溃更糟”——诊断优先 |
| **多 agent/多实例协作** | #165685 多 agent 编排可观测性 | #97681 跨 gateway/跨所有者 Bot 联邦协作（40 评论，长期榜首） | 个人助手的联邦化与编排是共同路线图信号 |
| **本地/原生推理下沉** | #163646/#163647 worker-local 原生推理 | #133599 本地模型配方 | 降低网关依赖、边缘部署能力 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道接入（22 插件）、会话持久化架构、MCP 生态、记忆系统（embedding 缓存、dreaming） | updater 崩溃安全、跨 gateway 联邦协作、供应链加固（digest 固定）、i18n/桌面 UX |
| 目标用户 | 多渠道重度用户、插件生态开发者、Windows 单网关个人部署 | 自托管个人助手用户、本地模型社区（pt-BR 等国际化群体）、跨机器多实例运维者 |
| 技术架构 | Gateway 中心 + worker 下沉（迁移中），SQLite 持久化，LLM 路由（LiteLLM） | 轻网关 + skills/sandbox 体系，git-based 更新树，v0.21 canary 节奏 |
| 当前主要风险 | 内存泄漏群（#159662/#159596）、升级不可信、新用户上手失败 | #132401 数据丢失 P0 无响应、Windows/Linux 平台适配不均 |

---

## 6. 社区热度与成熟度

- **快速迭代/激进演进阶段 —— OpenClaw**：日合并 146 PR、XL 级重构并行、同日开同日关大 PR（#165883），典型的高速度高风险；beta 渠道问题密度高说明尚未进入质量收敛期。
- **质量巩固/定向攻坚阶段 —— Hermes Agent**：无新版本但集中投入 updater 硬化战役（含 E2E CI 门禁 #132346），关闭率优于 OpenClaw；macOS TCC 收尾（17 PR 合并）显示平台工程进入验证清理期。
- **共同未成熟域**：两者的“长尾 P2/P3 积压”均超过 1–3 个月（OpenClaw #97616 僵尸子进程、Hermes #63395 Matrix E2EE），说明长寿命会话稳定性是全生态弱项。

---

## 7. 值得关注的趋势信号

1. **“升级可靠性”成为个人助手产品的第一信任门槛**。两个项目同日最重的工程投入都在 updater/升级链路。启示：AI 智能体作为长驻系统，必须把更新当作分布式事务设计（原子 commit point + 存活检测 + 可回滚），Hermes 的 stacked PR 矩阵 + E2E crash cells 值得借鉴。
2. **资源治理（内存/磁盘/SSD）是 agent 框架的隐性核心竞争力**。空闲负载吃 10 GB 内存、180 GiB git pack、2.8 GB WAL——agent 的持久化与日志子系统需默认设限与配额，否则直接损耗用户硬件。
3. **静默失败 > 崩溃，是用户最大焦虑源**。可观测性（机器可读 reason、诊断路径、投递语义定义）应作为框架一等公民，而非附加功能。
4. **联邦化协作是下一个路线图高地**：Hermes #97681（跨所有者 Bot 协作，40 评论）与 OpenClaw 的多 agent 编排需求呼应——个人 AI 助手的“多实例/多所有者”协作将是中期差异化战场。
5. **推理下沉到 worker/本地是共同演进方向**：OpenClaw 的 worker-local 原生推理 + Hermes 的本地模型配方，预示网关从“路由中枢”向“轻协调器”转型的行业趋势。
6. **平台适配质量分化 Windows 最弱**：两个项目的 Windows 特有 P0/P1 都显著多于 macOS，Windows 支持质量是尚未被充分满足的获客机会。

**给决策者的一句话**：OpenClaw 胜在生态广度与迭代速度、险在稳定性债务；Hermes 胜在工程纪律与 updater 可靠性、险在数据丢失级缺陷无响应。选型当前应避开两者的 beta/canary 渠道，以稳定版 + 手动更新为部署基线。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-06

## 1. 今日速览

Hermes Agent 今日保持高度活跃：过去 24 小时 Issues 更新 438 条（新开/活跃 312，关闭 126），PR 更新 500 条（待合并 304，合并/关闭 196），无新版本发布。社区注意力明显集中在两条主线：**updater 可靠性攻坚**（teknium1 连续提交的 Windows/macOS 更新器 stacked PR 矩阵）和**数据丢失类 P0/P1 缺陷**（scratch 目录静默删除、Windows .git 180 GiB 失控写入）。整体关闭率（Issues 29%、PR 39%）显示维护节奏健康，但安装/更新（area/install-update）已成为最集中的痛点区域。

## 2. 版本发布

今日无新版本发布。（最新基线仍为 `v0.21.4+canary` 系列）

## 3. 项目进展

**Updater 硬化战役（本日最大工程量）**——@teknium1 于 10-03 提交的一组 stacked PR 今日持续活跃推进，系统性重构 `hermes update` 的崩溃安全性：

- [#132361](https://github.com/NousResearch/hermes-agent/pull/132361) — git/ZIP 代码替换收敛为单一 crash-safe commit point
- [#132365](https://github.com/NousResearch/hermes-agent/pull/132365) — update marker v2：pid+创建时间标识存活 owner，checkout 锁覆盖整个更新树
- [#132338](https://github.com/NousResearch/hermes-agent/pull/132338) — 被杀死的 Windows updater 不再把已暂停的 gateway 永久搁置
- [#132345](https://github.com/NousResearch/hermes-agent/pull/132345) / [#132354](https://github.com/NousResearch/hermes-agent/pull/132354) — Desktop 更新门控等待存活 updater、hand-off 脚本持锁
- [#132386](https://github.com/NousResearch/hermes-agent/pull/132386) — 契约 C3：commit point 之后 update 不再失败
- [#132346](https://github.com/NousResearch/hermes-agent/pull/132346) — real-update E2E CI 门禁 + Windows crash cells

这一系列 PR 直接针对近期多起更新失败/残留锁 issue（#122353、#123971、#131444、#132089），是本日最重要的架构级投入。

**其他修复进展**：
- [#133469](https://github.com/NousResearch/hermes-agent/pull/133469)（已关闭）— Discord 线程自身的 channel skill binding 优先于父频道
- [#133605](https://github.com/NousResearch/hermes-agent/pull/133605) — copilot-acp 多轮工具调用保留、Windows 可执行解析修复
- [#126963](https://github.com/NousResearch/hermes-agent/pull/126963) — sandbox 基础镜像/npm 工具全部按 digest 固定，修补供应链漏洞
- [#133586](https://github.com/NousResearch/hermes-agent/pull/133586) — `secure_parent_dir` 尊重 `HERMES_HOME_MODE`
- [#133599](https://github.com/NousResearch/hermes-agent/pull/133599) — 新增 Qwen3.8 Flash Next IQ4_XS + 外置 MTP 本地模型配方

## 4. 社区热点

- **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)（40 评论）跨 gateway 的 Bot 协作**（P2）— 让 Hermes Bot 跨机器、进而跨所有者协作而不放弃各自控制权。这是个人 AI 助手"联邦化"方向的核心路线图信号，讨论热度长期居首。
- **[#125727](https://github.com/NousResearch/hermes-agent/issues/125727)（26 评论）自动 Nous 集成被阻塞**— 合并冲突横跨 agent 核心十余个文件，反映自动化合入通道与主线演进的摩擦。
- **[#132401](https://github.com/NousResearch/hermes-agent/issues/132401)（17 评论）scratch 24h 静默清理销毁多天工作成果**（P0）— TMPDIR 指向的 scratch 目录无日志、无隔离、无保留标记地被删除，是当前最高优先级数据丢失缺陷。
- **[#95028](https://github.com/NousResearch/hermes-agent/issues/95028)（已关闭，13 评论）"Authority Execution Layer" 架构提案**— 将 12 个 issue 归纳为一个边界传递缺陷并提出统一架构，属高质量社区驱动架构讨论，值得跟进其落地形态。
- **[#40239](https://github.com/NousResearch/hermes-agent/issues/40239) pt-BR 桌面端本地化**（13 评论、4 👍）— 后端/TUI 已有完整 `pt.yaml`，社区要求桌面端补齐。

## 5. Bug 与稳定性（按严重程度）

| 级别 | Issue | 摘要 | Fix 状态 |
|---|---|---|---|
| P0 | [#132401](https://github.com/NousResearch/hermes-agent/issues/132401) | scratch prune 静默删除 TMPDIR 中多天工作，无日志/隔离 | 无专门 PR，需维护者决策 |
| P1 | [#131444](https://github.com/NousResearch/hermes-agent/issues/131444) | Windows .git 失控写入 332 packs / ~180 GiB / 7 小时 | 部分被 updater 系列 PR 覆盖，未完全关闭 |
| P1 | [#122529](https://github.com/NousResearch/hermes-agent/issues/122529) | cron 外部 worker 缺 venv site-packages（ModuleNotFoundError: ruamel） | 未见 fix PR |
| P1（已关闭） | [#88858](https://github.com/NousResearch/hermes-agent/issues/88858) | MCP trust gate camelCase/snake_case 不匹配导致只读工具全被拦截 | 已关闭 |
| P2 | [#123971](https://github.com/NousResearch/hermes-agent/issues/123971) | Windows `hermes update` 更新成功但 relaunch 检查恒失败 exit 1 | updater PR 系列在途 |
| P2 | [#131055](https://github.com/NousResearch/hermes-agent/issues/131055) | Linux Desktop 二次启动导致 sticky --no-sandbox → renderer SIGILL 循环 | 无 |
| P2 | [#132358](https://github.com/NousResearch/hermes-agent/issues/132358) | setsid 后代进程导致 PTY kill 挂起、后端不回收 | 无 |
| P2 | [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) | 终端生命周期守卫误杀良性 Node.js CLI | 无 |
| P2 | [#63395](https://github.com/NousResearch/hermes-agent/issues/63395) | Matrix E2EE 投递后 DB pool 崩溃断连 | 无 |
| P3 | [#123926](https://github.com/NousResearch/hermes-agent/issues/123926) / [#125746](https://github.com/NousResearch/hermes-agent/issues/125746) | `sys.modules` 迭代中变更 → 插件随机静默丢弃 | 相关：[#131411](https://github.com/NousResearch/hermes-agent/pull/131411) 测试侧修复 |
| P3 | [#95855](https://github.com/NousResearch/hermes-agent/issues/95855) | mcp 2.0 pin 与 fastmcp 不兼容，Hindsight 更新后必坏 | 无 |

**趋势判断**：安装/更新路径的 bug（Windows 尤甚）在 open P1/P2 中占比过高，updater 战役是正确押注，但 #132401 这类数据丢失 P0 尚无响应，建议优先处置。

## 6. 功能请求与路线图信号

- **Bot 跨 gateway/跨所有者协作**（[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)）— 与"personal agent"定位一致，属中期方向性功能，标签含 needs-decision。
- **桌面端浮动引用按钮**（[#52554](https://github.com/NousResearch/hermes-agent/issues/52554)，3 👍）与 **pt-BR 本地化**（[#40239](https://github.com/NousResearch/hermes-agent/issues/40239)）— Desktop UX/i18n 是稳定的需求流，低成本高感知，有望近期纳入。
- **技能去重/策展自动化**（[#67582](https://github.com/NousResearch/hermes-agent/issues/67582)）— 针对自改进循环产生的重复技能，契合 agent 自我管理主线。
- **本地模型扩展**（[#133599](https://github.com/NousResearch/hermes-agent/pull/133599)）— 已有 PR 在途，下一版本大概率包含。
- **macOS 权限/TCC 收尾追踪**（[#95598](https://github.com/NousResearch/hermes-agent/issues/95598)）— 官方跟踪 issue，17 个 PR 已合并，进入验证/清理阶段。

## 7. 用户反馈摘要

- **最大痛点：更新器不可信**。多名用户报告 `hermes update` 各阶段失败、残留 `index.lock`、Windows 上更新"成功却报失败"、极端情况下磁盘被 180 GiB pack 文件吞没——已影响对自动更新的信任，有用户转为手动更新。
- **静默失败模式引发焦虑**：插件随机不加载（仅一行 WARNING 在深埋日志中）、scratch 文件被无声删除、消息静默截断——用户反复强调"没有错误提示"比崩溃更糟。
- **平台适配不均**：Windows 与 Linux Desktop 用户的不满显著高于 macOS；Matrix/E2EE 长寿命会话稳定性是进阶用户的主要抱怨。
- **正面信号**：社区贡献质量高（如 #95028 的系统性架构分析、#126963 的供应链加固），i18n（pt-BR）和本地模型社区参与热情高。

## 8. 待处理积压

| Issue/PR | 状态 | 说明 |
|---|---|---|
| [#132401](https://github.com/NousResearch/hermes-agent/issues/132401) | P0 OPEN，10-03 提出至今无 fix | 数据丢失级缺陷，建议立即指定 owner |
| [#131444](https://github.com/NousResearch/hermes-agent/issues/131444) | P1 OPEN，10-02 提出 | 180 GiB 磁盘吞噬，需与 updater PR 系列对齐验证 |
| [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) | P2 needs-decision，9-08 起悬置近一月 | 生命周期守卫误杀，影响 CLI 类工具生态 |
| [#63395](https://github.com/NousResearch/hermes-agent/issues/63395) | P2 OPEN，7-12 起近 3 个月 | Matrix E2EE 长期稳定性 |
| [#63485](https://github.com/NousResearch/hermes-agent/issues/63485) | P3 OPEN，7-13 起 | Telegram Rich Messages 静默忽略 |
| [#62203](https://github.com/NousResearch/hermes-agent/pull/62203) | PR OPEN，7-10 起近 3 个月 | durable session 重试幂等，涉及面广，建议推进 review 或拆分 |
| [#126963](https://github.com/NousResearch/hermes-agent/pull/126963) | 安全类 PR，9-28 提出未合并 | 供应链加固，建议优先 review |

---
*数据来源：GitHub API 快照（Issues 438 / PR 500 条更新）。整体健康度：活跃度高、社区贡献质量好；主要风险集中在 updater 与 Windows 平台的可靠性债务，以及一个尚无响应的 P0 数据丢失缺陷。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*