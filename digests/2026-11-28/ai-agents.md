# OpenClaw 生态日报 2026-11-28

> Issues: 354 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-28 02:39 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-11-28

---

## 1. 今日速览

- **总体活跃度：极高**。过去 24 小时 Issues 更新 354 条（新开/活跃 215，关闭 139），PR 更新 500 条（待合并 272，已合并/关闭 228），Issue 关闭率约 39%，PR 消化率约 46%，维护吞吐量处于健康区间。
- 今日发布 **v2026.12.1-beta.1**，核心方向是更新机制（prepared releases + resident launcher）与提示缓存复用。
- 社区讨论焦点集中在 **更新/升级路径设计**（#204775，56 条评论）与 **网关内存问题**（多个 P0/P1 长期议题持续活跃）。
- PR 流以测试重构、QA 收紧和小型 UX 修复为主，机器人贡献者 @roboclaw-bot 与维护者 @obviyus、@vincentkoc 保持高频产出。

---

## 2. 版本发布

### v2026.12.1-beta.1 ([Release](https://github.com/openclaw/openclaw/releases))

**Highlights：**
- **更新机制改造**：Git 安装改用预构建发布版本（prepared releases）+ 常驻启动器（resident launcher）；包更新在**不停止运行中 Gateway** 的情况下完成准备（#203194, #203497，感谢 @obviyus）。
- **提示缓存**：压缩（compaction）流程跨路由复用暖提示缓存，降低 token 成本与延迟。

**迁移注意事项：**
- 新更新路径仍在设计中（见 [#204775](https://github.com/openclaw/openclaw/issues/204775)），beta 用户升级前建议阅读该设计文档。
- 从 2026-11-17 期间跟踪 `main` 的 Git checkout 升级可能因旧 updater 无法完成数据库迁移而失败，[#207062](https://github.com/openclaw/openclaw/pull/207062) 提供自动修复，建议等待其合入后再升级。

---

## 3. 项目进展

**今日关闭/合并的重要 PR：**

| PR | 内容 | 意义 |
|---|---|---|
| [#205443](https://github.com/openclaw/openclaw/pull/205443) (P1, 已关闭) | 修复 Gateway 使用 Tailscale Serve/Funnel 时 `openclaw update` 在 `candidate-gateway-startup` 检查必然失败的问题 | 解锁一类自托管用户的升级阻塞 |
| [#207091](https://github.com/openclaw/openclaw/pull/207091) (已关闭) | cron 任务在提供商声明限速重置时间前不再重跑（生产环境 7 天 126 次无效运行） | 定时任务可靠性显著改进 |
| [#206999](https://github.com/openclaw/openclaw/pull/206999) | 增加手动核心替换后插件收敛的升级幸存测试场景 | 加固升级路径 |
| [#207016](https://github.com/openclaw/openclaw/pull/207016) / [#207023](https://github.com/openclaw/openclaw/pull/207023) | 子代理注册恢复与 ACP spawn 中继的简化重构 | 降低核心复杂度 |
| [#207017](https://github.com/openclaw/openclaw/pull/207017) | Android 端正确报告设备本地听写可用性 | 移动端 UX 修复 |

**进行中的大型工作：**
- [#207062](https://github.com/openclaw/openclaw/pull/207062) (XL, P1)：自动完成 2026-11-17 main checkout 的迁移更新
- [#206971](https://github.com/openclaw/openclaw/pull/206971) (XL)：SQLite 命令不再加载 PostgreSQL schema 数据，CLI 启动提速
- [#201275](https://github.com/openclaw/openclaw/pull/201275) / [#201277](https://github.com/openclaw/openclaw/pull/201277)：调度提醒改为任务提示统一模型，移除 automation reasoning 选项——自动化配置面正在系统性收敛

整体判断：项目处于**发布前收敛期**（beta.1 已出），重心在更新机制稳定性、测试瘦身与自动化子系统重构。

---

## 4. 社区热点

1. **[#204775](https://github.com/openclaw/openclaw/issues/204775)（56 评论）**：prepared-release 更新的总体设计文档，收集已落地/进行中/归属划分，作为所有更新相关工作者的共享参考，避免“不同设计碰撞同一批文件”。诉求：更新路径需要明确的所有权与规划。
2. **[#192547](https://github.com/openclaw/openclaw/issues/192547)（30 评论）**：1 GiB 内存限制下 ARM64 网关启动后 OOM 崩溃循环。诉求：边缘设备/小内存主机可用性。
3. **[#153426](https://github.com/openclaw/openclaw/issues/153426)（已关闭，28 评论）**：P0 安全问题——`MEMORY.md`/`USER.md` 因溯源棘轮被静默永久排除出 bootstrap 注入，无诊断无恢复路径。
4. **[#200606](https://github.com/openclaw/openclaw/issues/200606)（已关闭，21 评论）**：2026.11.5 升级被 Candidate Doctor 的插件迁移冲突与 `changed=[]` 阻塞，已标记 not-repro-on-main。
5. **[#205007](https://github.com/openclaw/openclaw/issues/205007)（10 评论）**：疑似外部账号入侵的用户求助帖（内容与 Go 标准库混淆），需要安全团队甄别——社区安全沟通流程的一次压力测试。

---

## 5. Bug 与稳定性（按严重程度）

**P0：**
- [#126821](https://github.com/openclaw/openclaw/issues/126821)：SQLite 在全新重建库上 15–24 小时内复现损坏（WSL2，5 天 5 次），含“瘫痪网关”模式——**无 fix PR**
- [#152275](https://github.com/openclaw/openclaw/issues/152275)：插件激活失败后模型目录与回复分发不可用直至重启——**无 fix PR**
- [#194664](https://github.com/openclaw/openclaw/issues/194664)：Codex protected continuation 阻塞所有后续对话——**无 fix PR**
- [#202518](https://github.com/openclaw/openclaw/issues/202518)：claude-cli 死会话被复用——**无 fix PR**
- [#206030](https://github.com/openclaw/openclaw/issues/206030)：迁移后 reclamation 无法排空积压，频道消息被拒——**无 fix PR**（新近报告）

**P1：**
- [#181432](https://github.com/openclaw/openclaw/issues/181432) / [#195497](https://github.com/openclaw/openclaw/issues/195497)：Gateway 基线 RSS ~1.9 GB / 17 小时增长至 ~3 GB——**无 fix PR**
- [#206669](https://github.com/openclaw/openclaw/issues/206669)：Windows SQLite integrity worker 启动时每库强制等满 300s（新报，回归）
- [#196820](https://github.com/openclaw/openclaw/issues/196820)：Control UI 在 `getAnimations()` 忙循环中锁死 100% CPU
- [#205566](https://github.com/openclaw/openclaw/issues/205566)：360s 回复看门狗中止长会话的预压缩（新报）
- [#205443](https://github.com/openclaw/openclaw/pull/205443) 已关闭：Tailscale 用户更新失败——**已修复**

观察：P0 级会话状态/SQLite 稳定性问题普遍缺乏 fix PR，是当前健康度的主要短板。

---

## 6. 功能请求与路线图信号

- **更新路径可配置化**（#204775 设计文档 + #207062/#207146 实现）→ 明确纳入 2026.12 系列
- **cron 限速感知**（#207091 已关闭）→ 已完成
- [#204701](https://github.com/openclaw/openclaw/issues/204701)：backup git create 的可配置 git 超时与表级排除——硬编码 120s 导致计划备份反复失败，诉求明确，可能排期
- [#198830](https://github.com/openclaw/openclaw/issues/198830)：LM Studio embedding 预加载请求满 context（32768）导致 16GB 主机 OOM——本地模型用户刚需
- [#151766](https://github.com/openclaw/openclaw/issues/151766)：active-memory 召回意图模式缺德语，`escalate` 模式对德语用户永不触发——国际化补齐，成本低，有望采纳
- [#113159](https://github.com/openclaw/openclaw/issues/113159)：usage-limit 冷却应使用各提供商真实重置时间——#207091（cron 路径）已修，通用路径可能跟进

---

## 7. 用户反馈摘要

- **痛点集中区**：① 升级路径（Doctor/canary/migration 冲突是最高频挫败来源）；② 资源占用（ARM64 小内存主机、长期运行内存增长）；③ 会话卡死类问题（protected continuation、dead live session）影响“对话可用性”这一核心体验。
- **好评点**：自动化/提醒功能被广泛使用（生产环境 13 个 cron job、7 天 126 次运行的报告显示重度依赖）；错误信息分类化（billing/rate_limit/auth）被评为相对原始 provider 文本的显著进步。
- **典型场景**：自托管 Linux/Podman、macOS LaunchAgent、Telegram/Feishu 多渠道、多 agent 共享群组——用户群体偏向 homelab 与小规模生产部署。
- 多条长期 issue 出现“诊断改善但根因未解决”的用户更新（如 #158373），反映用户对部分修复持审慎态度。

---

## 8. 待处理积压（提醒维护者关注）

- **[#112638](https://github.com/openclaw/openclaw/issues/112638)**（7 月至今）：session maintenance enforce 模式下 thread/channel 条目豁免回收，maxEntries/maxDiskBytes 静默超限——已标记 fix-shape-clear，待排期
- **[#127195](https://github.com/openclaw/openclaw/issues/127195)**：16 处调用点抛出字节级相同错误串、无原因码，生产排障不可能——fix-shape-clear
- **[#58289](https://github.com/openclaw/openclaw/issues/58289)**（3 月，platinum hermit）：非 main agent 缺 models.json 报 "Unknown model"——linked PR 仍 open
- **[#79223](https://github.com/openclaw/openclaw/issues/79223)**：Dream Diary 输出语言不可配置（中文用户混合语言工作区）
- **[#163107](https://github.com/openclaw/openclaw/issues/163107)**：HEIC view_image 失败后每次泄漏 250–400 MB RSS
- 多个 stale + needs-maintainer-review 的长期 memory-core 议题（#193150 每晚误报 abort、#155908 wiki 编译缓存超时）建议在 2026.12 稳定版前集中清理。

---

**健康度小结**：交付节奏与响应吞吐优秀（PR 消化率 46%），但 P0 级稳定性积压（SQLite/会话状态）与升级路径摩擦是当前最需投入的两个方向；2026.12.1-beta.1 的更新机制改造正是对后者的回应。

---

## 横向生态对比

# 个人 AI 助手/智能体开源生态横向对比日报 · 2026-11-28

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道已进入“架构重构期”：核心项目普遍在做插件化/平台解耦、更新机制加固与会话持久化演进。重度自托管用户（homelab、小规模生产、多渠道多 agent）成为生态主力画像，其诉求正从“功能可用”转向“数据不丢、升级不炸、长期可运维”。两大头部项目均面临 PR 审查吞吐瓶颈与稳定性积压，但方向上均在向 MCP 生态和插件目录靠拢。SQLite 单库持久化在长会话+并发场景下的局限，已从工程细节上升为生态级架构议题。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 354（新开/活跃 215，关闭 139） | 285（新开/活跃 267，关闭 18） |
| PR 更新（24h） | 500（待合并 272，合并/关闭 228） | 500（待合并 403，合并/关闭 97） |
| Issue 关闭率 | ~39% | ~6.3% |
| PR 消化率 | ~46% | ~19% |
| Release | v2026.12.1-beta.1（更新机制+提示缓存） | 无（仍为 v0.22.5，回归积压） |
| 核心维护力量 | @obviyus、@vincentkoc、@roboclaw-bot | teknium1 主导解耦重构 |
| 健康度 | **中上**：吞吐健康，P0 积压是短板 | **中**：投入活跃但修复闭环率低、issue 膨胀 |

**关键差异**：OpenClaw 的关闭/合并吞吐是 Hermes 的 2–2.4 倍，处于“发布收敛期”；Hermes 处于“修复欠债期”——v0.22.5 回归未消化，403 个待合并 PR 中包括三个 XL 级解耦重构，审查能力跟不上贡献流入。

---

## 3. OpenClaw 在生态中的定位

**优势**：
- **升级机制工程化程度领先**：prepared releases + resident launcher + 不停机更新（#203194/#203497），并配套设计文档（#204775）协调多方贡献——Hermes 同期仍被"Mac DMG 更新只退出不安装”（#158049）和升级死亡螺旋（#23717）困扰。
- **成本工程**：压缩流程复用暖提示缓存，是两个项目中唯一明确的 token 成本优化落地项。
- **国际化与多渠道基础**：Telegram/Feishu/Tailscale 等场景均有针对性修复。

**技术路线差异**：OpenClaw 的平台适配尚在核心内（修复驱动），Hermes 已系统性将 WeCom/Weixin/DingTalk 移出核心为插件（#159649/#159644/#159638）——Hermes 在**架构解耦上先行一步**，OpenClaw 在**更新与运维可靠性上先行一步**。Hermes 同时在 MCP 生态（Tasks 协议、skills 发布）上布局更深。

**短板**：5 个 P0 无 fix PR（SQLite 损坏、会话卡死类），ARM64 OOM 与 1.9–3 GB RSS 内存问题与 Hermes 的 53.7 GB shell hook 泄漏同属资源管理债，但 OpenClaw 的 P0 积压更久、更核心。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 信号强度 |
|---|---|---|---|
| **压缩/长会话记忆** | 压缩缓存复用（beta.1）；#205566 看门狗中断预压缩 | #143379（72 评论）压缩溯源 RFC、#117886、#97390 | 🔥🔥🔥 两侧最高讨论热度 |
| **SQLite 持久化极限** | #126821 全新库 15–24h 损坏（P0） | #23717 SessionDB 插件化 RFC（11 👍，5 月未决）；`database is locked` 杀死 cron worker | 🔥🔥🔥 均为无 fix PR 的最痛问题 |
| **更新/升级可靠性** | #204775 设计文档 + #207062 迁移自动修复 | #158049 已修；升级死亡螺旋仍在 | 🔥🔥 双方最高频用户挫败来源 |
| **内存/资源泄漏** | Gateway RSS 增长（P1）、#163107 每次泄漏 250–400 MB | #160972 1 MiB 截断（53.7 GB→已修） | 🔥🔥 |
| **MCP 生态** | — | #160974 MCP Tasks、#160962 MCP skills 发布 | 🔥 Hermes 独占但为行业方向 |
| **多渠道投递可靠性** | #206030 reclamation 拒消息 | #145215 websocket 丢消息、Feishu cron 100% 失败 | 🔥🔥 |

**核心结论**：长会话压缩语义 + SQLite 持久化瓶颈，是整个生态共同逼近的架构天花板——这预示下一阶段竞争点在**可插拔会话存储与不破坏会话的压缩**。

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 运维可靠性：更新、调度提醒收敛、备份 | 生态扩展：MCP、插件目录、skill 自改进 |
| 目标用户 | 自托管 Linux/Podman、macOS LaunchAgent、Telegram/Feishu 多渠道 homelab | Windows + 多 profile + gateway 多 worker 重度生产用户 |
| 架构趋势 | 自动化配置面系统性收敛（#201275） | 平台核心解耦、Labs 插件化（WeCom/Weixin/DingTalk） |
| 质量焦点 | 升级路径测试加固（#206999） | 内存/调度竞态修复 |
| 风险画像 | P0 无 fix PR 积压 | 版本回归簇（Windows Kanban）+ 数据丢失信任损伤 |

值得注意：两者用户群高度重叠（自托管长期资产型用户），但失败模式不同——OpenClaw 伤在“升级”，Hermes 伤在“丢数据”（worker WIP 丢失、消息丢失），后者对信任损害更大。

---

## 6. 社区热度与成熟度分层

- **快速迭代期：Hermes Agent**——285 issue 中 267 为新开/活跃，功能 PR（MCP/插件）密集涌入，但 issue 治理元问题（#7335，open issue 超 1000）说明社区规模增长快于治理能力。
- **质量巩固期：OpenClaw**——beta.1 发布后的典型收敛行为：测试重构、QA 收紧、UX 小修；issue 关闭率 39% 显示维护带宽充足。
- **共同债务**：两侧均存在“诊断改善但根因未解决”的模式（OpenClaw #158373、Hermes #135487），长期 RFC 停留在 needs-decision（Hermes #23717/#28279 五个月未决是显著信号）。

---

## 7. 值得关注的趋势信号

1. **持久化层将成下一轮架构分水岭**：SQLite 在“运行中升级 + 并发 worker + 长会话”下的失败模式（损坏、锁死、死亡螺旋）在两个项目同步爆发。SessionDB 插件化（Hermes #23717）与迁移加固（OpenClaw #207062）是两种应对，开发者应关注可插拔存储接口的标准化机会。
2. **压缩（compaction）是长会话 Agent 的核心战场**：OpenClaw 做缓存复用降本，Hermes 讨论溯源保留与治理（72 评论 RFC）。任何做长记忆 Agent 的团队都需要回答：压缩后哪些记录必须可重读、谁拥有裁决权。
3. **核心瘦身 + 平台插件化已成共识**：Hermes 将 IM 适配移出核心、OpenClaw 自动化配置收敛，均指向“薄核心 + 插件目录”架构；MCP（Tasks、skills 发布）正在成为插件的统一分发协议。
4. **升级体验=留存体验**：两个项目中升级摩擦都是最高频挫败来源。不停机更新（OpenClaw beta.1）和迁移自动修复值得所有自托管软件借鉴。
5. **信任由数据安全定义**：WIP 丢失、“agent 学到的状态没有备份”（Hermes #12238，29 👍）表明用户把 Agent 当长期资产——自动备份/版本控制是尚未被满足的高赞刚需，对开发者是明确的产品机会。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-28

## 1. 今日速览

Hermes Agent 今日保持高度活跃：过去 24 小时共 285 条 Issue 更新（267 新开/活跃，18 关闭）与 500 条 PR 更新（403 待合并，97 已合并/关闭）。无新版本发布，社区精力集中在 v0.22.5 之后的稳定性修复——尤其是 **Kanban worker 在 Windows 上的多起冻结/崩溃**、**gateway 并发与消息投递可靠性**两大问题簇，以及一项大规模的**中国即时通讯平台（WeCom/Weixin/DingTalk）核心解耦重构**。开源贡献者提交的修复 PR 流入速度可观（当日即有十余个新 PR），但 403 个待合并 PR 表明审查吞吐仍是瓶颈。

---

## 2. 版本发布

无新版本发布。当前用户侧仍普遍运行 v0.22.5（2026-10-23 发布），多个 Issue 指出该版本引入的 Kanban/cron 回归（见第 5 节），下一版本预计将承载大量修复。

---

## 3. 项目进展

今日关闭/合并 97 个 PR，代表性方向包括：

**平台解耦重构（进行中，teknium1 主导）**
- [#159649](https://github.com/NousResearch/hermes-agent/pull/159649)：WeCom 移出核心，成为 Hermes Labs 插件（自动迁移、opt-in），已迭代至 Round 18，修复 env-only 误迁移问题。
- [#159644](https://github.com/NousResearch/hermes-agent/pull/159644)：Weixin（个人微信，腾讯 iLink Bot API）移出核心为官方插件，默认安装。
- [#159638](https://github.com/NousResearch/hermes-agent/pull/159638)：DingTalk 同样迁移至 Labs 插件。
- 意义：核心持续瘦身，平台适配转向插件生态，属于架构层面的重要推进。

**稳定性与安全修复**
- [#160972](https://github.com/NousResearch/hermes-agent/pull/160972)：无终止输出的 shell hook 现在在 1 MiB 截断——此前一个 6 秒 hook 可把进程推到 53.7 GB 内存（堆叠 #131857）。高价值内存安全修复。
- [#159241](https://github.com/NousResearch/hermes-agent/pull/159241)：`key_cmd` provider 下 gateway 跨 turn 复用缓存 agent，修复每 turn 重建的认证开销（Fixes #159167）。
- [#160959](https://github.com/NousResearch/hermes-agent/pull/160959)：cron ticker 在收集到期任务后重查 drain gate，缓解高负载下的调度竞态。
- [#160973](https://github.com/NousResearch/hermes-agent/pull/160973)：延迟 hygiene adoption 后重置 `last_prompt_tokens`（Closes #160944）。
- [#158049](https://github.com/NousResearch/hermes-agent/pull/158049)（已关闭）：Mac 从 DMG/Downloads 运行时"Update & Restart"只退出不安装的问题。

**新功能**
- [#160974](https://github.com/NousResearch/hermes-agent/pull/160974)：支持 MCP Tasks 协议，长任务不再占用打开的 tool call。
- [#160962](https://github.com/NousResearch/hermes-agent/pull/160962)：MCP 服务器可向 Hermes 发布 skills，含列表、用户确认、校验加载（挽救 #148240）。
- [#160976](https://github.com/NousResearch/hermes-agent/pull/160976)：Desktop 丢弃未保存文件编辑前先询问。
- [#160969](https://github.com/NousResearch/hermes-agent/pull/160969)：CLI consent 提示框显示自身标题而非一律"Dangerous Command"。
- [#160975](https://github.com/NousResearch/hermes-agent/pull/160975)：Termux bionic Python 加载自有 libpython（fixes #158261）。

**评价**：MCP 生态能力（Tasks、skills 发布）+ 核心解耦 + 内存/调度安全修复，项目在功能广度与工程健壮性上均有实质前进；但多数关键 PR 仍处 OPEN 状态，落地节奏取决于审查速度。

---

## 4. 社区热点

- **[#143379](https://github.com/NousResearch/hermes-agent/issues/143379)（72 评论）**：RFC "DOC-CHAIN SUBSTRATE'S NETWORK"——关于压缩后持久记录的溯源保留、治理与可重读性。压缩（compaction）话题连续多日占据讨论榜首，说明长会话记忆管理是当前最大的架构争议点。
- **[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)（32 评论，P1）**：Kanban worker 在 gateway 停顿时批量崩溃，一次事故杀死 4 个 worker 且进行中工作丢失。多 worker 用户的核心稳定性诉求。
- **[#23717](https://github.com/NousResearch/hermes-agent/issues/23717)（26 评论，11 👍）**：Pluggable SessionDB Provider RFC（PostgreSQL/MySQL），直指 SQLite 在"运行中升级"下的 death spiral。5 月提出至今未决，是长期积压的最高赞功能诉求之一。
- **[#7335](https://github.com/NousResearch/hermes-agent/issues/7335)（已关闭）**：open issue 超 1000 条如何治理——项目 issue 负担问题本身的元讨论持续发酵。

**诉求归纳**：用户集中在"长会话 + 多 profile + gateway 多 worker"的重度生产场景，压缩语义、会话持久化与投递可靠性是三大痛点主题。

---

## 5. Bug 与稳定性（按严重程度）

**P1**
- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022)：gateway 停顿导致 Kanban worker 批量崩溃，WIP 丢失。暂无对应 fix PR。
- [#135487](https://github.com/NousResearch/hermes-agent/issues/135487)：重启安全的 cron worker 因 `database is locked` 死于 `adopt_claimed_execution()`，单次重试即丢任务。暂无 fix PR。

**P2**
- [#145215](https://github.com/NousResearch/hermes-agent/issues/145215)：会话 resume 快照超 1 MiB 时 websocket `max_size` 默认值导致 owner 转发丢消息。暂无 fix PR。
- [#146955](https://github.com/NousResearch/hermes-agent/issues/146955)：v0.22.5 Windows 多 profile 下 Kanban worker 收到绑定但 prompt 不投递直到超时——明确的版本回归。
- [#146440](https://github.com/NousResearch/hermes-agent/issues/146440) / [#145156](https://github.com/NousResearch/hermes-agent/issues/145156)：Windows 上 Kanban worker 初始化冻结（stdin 管道继承 + numpy 懒加载死锁 / holographic memory provider 触发）。Windows 平台 worker 可靠性问题成簇，均无 fix PR，**建议优先投入**。
- [#156978](https://github.com/NousResearch/hermes-agent/issues/156978)：gateway 路由全量重写在 GIL 争用下持有 state.db 写锁 20–35 秒。性能类 P2。
- [#131848](https://github.com/NousResearch/hermes-agent/issues/131848)：Desktop 约 1/5 的发送出现最后一条对话重复渲染（temp-id→server-id 竞态）。
- [#144570](https://github.com/NousResearch/hermes-agent/issues/144570)：review lane 强制加载 `sdlc-review` skill 在 profile skill root 缺失时预模型崩溃。
- [#149979](https://github.com/NousResearch/hermes-agent/issues/149979)：Desktop 远程 gateway 下 Bot Chat 媒体下载报 "Session not found"。
- [#78975](https://github.com/NousResearch/hermes-agent/issues/78975)：Feishu cron 投递 100% 失败（`receive_id_type="thread_id"` 非法值）。

**P3**
- [#89732](https://github.com/NousResearch/hermes-agent/issues/89732)：Linux+AMD 下 Desktop 环境动画使 iGPU 持续 50–69% 占用。

**已修复/关闭**：#79357（idle compaction 永不触发）、#155638（Matrix UnscopedSecretError 死循环）、#158049（Mac DMG 更新失败）。

---

## 6. 功能请求与路线图信号

- **压缩架构演进**：#143379（72 评论 RFC）、#117886（post-turn 后台压缩）、#97390（per-channel 空闲压缩）共同指向"压缩不再阻塞/破坏会话"的下一代设计，与已提交的 #160973（hygiene adoption 后 token 重置）呼应——**大概率是下一版本主线**。
- **MCP 生态扩展**：#160974（MCP Tasks）与 #160962（MCP skills 发布）均已 ci-reviewed，纳入近期版本确定性高。
- **插件目录扩张**：#160738（社区插件 CTT 入目录）、#159865（grounder 升 0.10.10）表明 plugin-catalog 流程运转正常。
- **待决策（needs-decision）**：#23717（SessionDB 插件化，11 👍）、#28279（per-chat 记忆隔离）、#136931（skill 自改进的质量控制）——长期 RFC，尚无跟踪 PR。
- **#48375**（Desktop 拼写检查，13 👍）用户呼声明确但技术决策悬置。

---

## 7. 用户反馈摘要

- **痛点集中在 Windows + 多 worker 生产环境**：多个用户报告 v0.22.5 升级后 Kanban/cron worker 不可用（#146955、#146440、#145156），且往往是"两个 bug 叠加，修一个暴露另一个"（#146440 作者原话），修复路径艰难。
- **数据丢失最伤信任**：worker 崩溃丢 WIP（#145022）、转发丢用户消息（#145215）、`/memory approve all` 反复失败（#109215）直接损害"可信赖的个人助手"定位。
- **重度自托管用户的运维焦虑**：SQLite 锁、升级死亡螺旋（#23717）、"agent 学到的状态没有备份"（#12238，29 👍）反映用户把 Hermes 当长期资产看待——粘性强的信号，但对持久化可靠性要求极高。
- **正面信号**：Reddit/issue 侧对 skill 自改进能力评价积极（#136931 承认"自主改进是最好的功能之一"）；MCP 长任务与 skills 新 PR 获社区期待。

---

## 8. 待处理积压（建议维护者关注）

- **#23717** SessionDB 插件化 RFC（5 月开，26 评论，11 👍，needs-decision）——最高赞长期诉求，无跟踪 PR。
- **#48375** Desktop 拼写检查（6 月开，13 👍）。
- **#12238** agent 数据自动备份/版本控制（4 月开，29 👍）。
- **#28279** per-chat 记忆隔离（5 月开，needs-decision）。
- **P1 无 fix PR**：#145022、#135487；Windows Kanban 冻结簇 #146440 / #146955 / #145156 同样无对应修复。
- **PR 积压**：403 个待合并（含 #159649/#159644/#159638 三个大型平台解耦重构、#144701 网关控制读队列修复），审查吞吐需提升以避免回归修复延迟落地。

**整体健康度**：中上。活跃度与社区投入优秀，功能演进（MCP、插件化）方向清晰；风险在于 Windows 回归簇未闭环、open issue 规模持续膨胀（#7335 的元问题仍在），以及压缩/持久化架构债务正在用户侧累积摩擦。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*