# OpenClaw 生态日报 2026-10-10

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-10 00:01 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-10

## 1. 今日速览

OpenClaw 今日保持高度活跃：过去 24 小时内 Issues 更新 500 条（新开/活跃 398，关闭 102），PR 更新 500 条（待合并 351，已合并/关闭 149），社区参与度与修复吞吐量均处于高位。今日无新版本发布，但 2026.9.x 线上的稳定性问题仍是焦点——升级链路（updater/Doctor）相关的 P0 报告集中出现，Windows 平台问题尤为突出。与此同时，核心贡献者（@steipete、@RomneyDa、@obviyus 等）今天提交了十余个新 PR，覆盖 SQLite 持久化加固、存储权限收据发布、Apple 平台网络重连等方向，开发节奏健康。总体判断：项目处于“高活跃 + 高债务”并行状态，9.x 系列的启动/升级性能问题需要优先收敛。

## 2. 版本发布

今日无新版本发布。最新 Issues 中已出现 **2026.9.8/2026.9.9** 版本号的使用报告（如 [#167652](https://github.com/openclaw/openclaw/issues/167652) 提到 2026.9.9），说明近期有版本迭代，但 24 小时窗口内无正式 Release 发布。

## 3. 项目进展

今日合并/关闭的重要 PR（部分为关闭未合并，已标注）：

- **#168024** [fix(apple): 网络切换后 Gateway 连接最长死锁两分钟](https://github.com/openclaw/openclaw/pull/168024)（已关闭）—— 修复 iOS/macOS 在 Wi-Fi/蜂窝/VPN 切换后连接长时间不可用的问题，移动端体验显著改善。
- **#167963** [fix(anthropic): Claude CLI 登录后未种子的模型报 missing-provider-auth](https://github.com/openclaw/openclaw/pull/167963)（已关闭）—— 修复 CLI 登录后新增 Claude 模型因缺少 API key 而失败的认证问题。
- **#166948** [fix: 交互式 doctor 与托管 Gateway 竞态](https://github.com/openclaw/openclaw/pull/166948)（已关闭）—— 修复 doctor 修复流程与托管网关的竞态，直接关联近期多起升级失败报告。
- **#168017** [fix: 减少 Windows 插件启动同步文件工作（10.1 回移植）](https://github.com/openclaw/openclaw/pull/168017)（已关闭）—— 针对性缓解 Windows 启动慢问题（关联 #159499/#160959）。

**今日新开的高价值 PR（待审）：**
- **#168018** [feat(sqlite): durable cross-store worker commit fence](https://github.com/openclaw/openclaw/pull/168018)、**#168029** [fix(sqlite): 拒绝未结算原生执行期间的 delivery](https://github.com/openclaw/openclaw/pull/168029) —— SQLite 存储一致性加固系列。
- **#168020** [fix(llama-cpp): 小型主机本地记忆索引 OOM](https://github.com/openclaw/openclaw/pull/168020)（P1）—— 承接原作者提交的修复。
- **#168027** [feat: 主题自定义 Control UI 品牌化](https://github.com/openclaw/openclaw/pull/168027) —— 品牌白标能力。
- **#167898** [fix(agents): subagent 完成时丢弃缓存会话上下文](https://github.com/openclaw/openclaw/pull/167898)。

整体进展：约 149 个 PR 合并/关闭，修复与基础设施加固（存储、测试瘦身 batch d039 #168028、测试套件合并 #168022）双线推进，方向清晰。

## 4. 社区热点

- **[#143524](https://github.com/openclaw/openclaw/issues/143524)**（115 评论，P0）— Agent SQLite WAL 文件数天内膨胀至 1.4–2.8GB 并阻塞 Gateway 启动（Windows）。讨论量远超其他条目，用户反复提供数据、手动 checkpoint 后复发，诉求明确：需要根因级修复而非运维规避。
- **[#97616](https://github.com/openclaw/openclaw/issues/97616)**（18 评论，P1）— hook/tool 子进程泄漏形成僵尸进程，长期运行退化。
- **[#161976](https://github.com/openclaw/openclaw/issues/161976)**（18 评论）— WhatsApp DM 在重启后 durable registry handoff 反复失败；已标记需安全审查与现场复现。
- **[#157325](https://github.com/openclaw/openclaw/issues/157325)**（17 评论，P0）— 单个 agent-DB 资源卡死导致**所有** agent 回复失败，直到重启 Gateway。
- **[#69208](https://github.com/openclaw/openclaw/issues/69208)**（16 评论）— 跨渠道转录重复/回放/上下文组装的 umbrella issue，长期追踪中。
- **[#51429](https://github.com/openclaw/openclaw/issues/51429)**（13 评论）— 中文社区热议的“hardcode 工作路径 `/Users/wangtao` 被合并发布”事件，暴露 CI 缺少环境隔离检查的流程问题。

背后诉求集中在三点：**消息投递可靠性**（message-loss 标签出现频率最高）、**长期运行稳定性**、**升级链路可信度**。

## 5. Bug 与稳定性（按严重程度）

**P0：**
| 问题 | 状态 |
|---|---|
| [#167771](https://github.com/openclaw/openclaw/issues/167771) 更新被 update-recovery-pending 永久阻塞，无修复路径 | 新报，待响应 |
| [#167652](https://github.com/openclaw/openclaw/issues/167652) Windows 2026.9.9 升级后 Gateway 挂起（doctor 报告正常） | 新报，待响应 |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) 2026.9.6 大型外部插件导致事件循环阻塞数分钟 | 待维护者审查；#168017 已部分缓解 |
| [#157325](https://github.com/openclaw/openclaw/issues/157325) agent-DB 卡死致全网关回复失败 | 源码复现已确认 |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) SQLite WAL 无限膨胀 | 待维护者审查，无 fix PR |
| [#153426](https://github.com/openclaw/openclaw/issues/153426) MEMORY.md/USER.md 被 provenance ratchet 静默永久排除出 bootstrap | 需安全审查 + 产品决策 |
| [#163434](https://github.com/openclaw/openclaw/issues/163434) 基于时间的转录裁剪删除会话头，无法自修复（数据丢失） | 需补充信息 |

**P1 精选：**
- [#154891](https://github.com/openclaw/openclaw/issues/154891) — 已回滚的热重载仍使无关插件永久不可用。
- [#125764](https://github.com/openclaw/openclaw/issues/125764) — Telegram 出站发送单次失败即进死信，高价值消息静默丢失。
- [#118185](https://github.com/openclaw/openclaw/issues/118185) — 单次 claude-cli 回合被两个 writer 以不同规则写两次。
- [#101929](https://github.com/openclaw/openclaw/issues/101929) — 上下文溢出预检估算偏大 2.3–2.6×，误触发截断恢复。

多数 P0 尚无 linked fix PR（clawsweeper:no-new-fix-pr 标签普遍），是当前健康度的主要风险点。

## 6. 功能请求与路线图信号

- **#168027 主题品牌化**、**#167996 Skills "Learned" 通知行 + 一键撤销** 已有实现 PR 在审，大概率进入下一版本。
- **#9986 上下文超限触发模型 fallback**（ longstanding，6 评论）与 #158898 runtime context 破坏前缀缓存的成本问题形成呼应，属于高呼声方向。
- **#16555 投递队列消息 TTL**（钻石评级）直接针对 #101814 等重启消息洪泛问题，修复动机充分。
- **#16670 Onboarding 向导纳入 Memory/Embedding 配置**（9 评论）与 #148650（memory indexer 凭据 401）同属 memory 可用性链路，存在被一并处理的信号。
- **#14785 工具 schema 约 3,500 token/会话固定开销** 长期未动，配合 token 成本类问题可能获得优先级提升。

## 7. 用户反馈摘要

- **痛点集中区**：升级失败/挂起是近期最密集的抱怨（#158231、#156986、#162047、#164214、#167771、#167652），覆盖 macOS/Windows/Linux 三平台，用户反复强调“没有修复路径”的无助感；Windows 启动耗时 3–6 分钟（#159499）严重影响生产可用性。
- **真实场景**：多 agent + 多渠道（飞书 websocket + WhatsApp）自托管、Windows 计划任务部署是典型生产形态；Claude CLI / Codex / ACP 作为 agent 后端的使用日益普遍。
- **正面信号**：用户报告质量高（带 CPU profile、SQLite 状态、精确复现步骤），说明核心用户群工程能力强、参与意愿高；#162047、#164214 等 P0 报告在一天内被关闭，显示问题在快速修复。
- **不满**：memory 子系统（索引冻结 #119411、索引器认证失败 #148650、静默排除 #153426）的“健康显示绿色但实际失效”模式最伤信任。

## 8. 待处理积压

- **[#69208](https://github.com/openclaw/openclaw/issues/69208)** — 4 月开立的跨渠道转录重复 umbrella，至今仍在积累案例。
- **[#48920](https://github.com/openclaw/openclaw/issues/48920)** — Live Docs 领先于发布版本（3 月，4 👍，P0），文档-发布同步机制未解决。
- **[#51429](https://github.com/openclaw/openclaw/issues/51429)** — hardcode 路径事件（3 月），需产品决策。
- **[#119411](https://github.com/openclaw/openclaw/issues/119411)** — memory watcher 从不重建索引（8 月，P1）。
- **[#72015](https://github.com/openclaw/openclaw/issues/72015)** — active-memory 阻塞回复 + QMD 启动过载（4 月，P2，需复现）。
- **[#74940](https://github.com/openclaw/openclaw/pull/74940)**（PR，4 月开立）与 **#132955**、**#144745**、**#151441** 等长期 open PR，建议维护者安排集中 triage。

---
*数据来源：GitHub（过去 24 小时窗口）。分析基于展示样本（Issues/PR 各 Top 按评论数排序），非全量统计。*

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告（2026-10-10）

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**高速活跃期与质量债务期并行的阶段**：头部项目单日 Issue/PR 更新均达数百条量级，社区参与度极高，但均无正式版本发布、且 P0 级稳定性问题（数据丢失、升级链路失败、存储膨胀）集中暴露。行业重心正从“功能堆叠”转向**长期运行可靠性、消息投递可信度和升级链路健壮性**。同时，“核心瘦身 + 插件 catalog”的双轨架构策略、多入口统一会话的架构重构成为共同演进方向。移动端（iOS/Android）与 Desktop 分发渠道扩展是明确的下一竞争前沿。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 398，关闭 102） | 318（新开/活跃 291，关闭 27） |
| PR 更新（24h） | 500（待合并 351，合并/关闭 149） | 500（待合并 397，合并/关闭 103） |
| Release | 无（2026.9.8/9.9 已在用户报告中出现） | 无 |
| 最大热点 Issue | #143524 SQLite WAL 膨胀（115 评论，P0） | #134107 solstice provider 加载失败（39 评论） |
| P0 积压 | 7 项，多数无 linked fix PR | 2 项，其中数据丢失级 1 项（#132401）悬置一周 |
| **健康度评估** | **高活跃 + 高债务**：修复吞吐高（102 关闭），但 9.x 升级链路 P0 集群未收敛，Windows 平台风险突出 | **高活跃 + 中等债务**：关闭率偏低（27），安装/更新问题集群化，但架构重构（#106742）方向明确 |

## 3. OpenClaw 在生态中的定位

- **规模领先**：Issue 关闭量（102 vs 27）与 PR 合并/关闭量（149 vs 103）均高于 Hermes Agent，社区修复吞吐和参与者基数明显更大（单条热点 Issue 115 评论 vs 39 评论）。
- **优势**：多渠道消息投递能力成熟（WhatsApp、Telegram、飞书 websocket）、多 agent 并发 + 多渠道自托管已是典型生产形态；核心贡献者提交节奏健康（单日十余个新 PR 覆盖存储加固、平台网络等方向）。
- **技术路线差异**：OpenClaw 走“**重运行时、全渠道 gateway**”路线（SQLite 持久化、durable registry、托管 Gateway），Hermes Agent 走“**provider 兼容 + 多入口统一会话**”路线（CLI/TUI/Desktop/ACP 统一 attach 单一 live 会话，Anthropic preserved thinking 等 provider 级深度适配）。
- **相对短板**：升级链路（updater/Doctor）P0 密集且“无修复路径”的用户无助感强烈；memory 子系统“显示健康但实际失效”的模式损害信任。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **安装/升级链路可靠性** | #167771、#167652、#158231 等（升级挂起/永久阻塞） | #125437、#133992、#134107（半安装状态、更新死锁） | 两者均形成“痛点集群”，诉求为**产品内可自愈的升级路径 + fail-safe 而非 fail-closed** |
| **会话/上下文管理** | #101929 上下文溢出误判、#9986 超限 fallback | #106742 单网关全会话、#130909 压缩缓存前缀保留 | 上下文压缩、缓存命中优化、跨入口会话统一是共同主线 |
| **存储/资源长期稳定性** | #143524 WAL 膨胀、#97616 僵尸进程 | #131444 .git 写入 180 GiB、#124794 递归 fetch | 长期运行的资源泄漏与磁盘膨胀，需根因级修复 |
| **数据安全边界** | #153426 memory 文件静默排除、#163434 转录裁剪数据丢失 | #132401 scratch 目录静默删除（P0） | 共同诉求：**删除/排除操作必须有日志、隔离区、可撤销** |
| **插件生态 + 核心瘦身** | 插件启动同步优化 #168017 | Home Assistant 迁出核心、Cloudflare 插件、catalog 扩容 | “核心瘦身 + 官方 catalog”双轨策略已成共识 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 消息投递可靠性、多渠道 gateway、白标品牌化（#168027） | Provider 深度兼容（Anthropic preserved thinking）、多 agent 后端（Claude CLI/Codex/ACP）、RFC 级架构演进 |
| 目标用户 | 多渠道自托管运维型用户（Windows 计划任务、飞书+WhatsApp 生产部署） | 开发者/高级用户（CLI/TUI/Desktop），多代理编排者 |
| 架构 | 中心化 Gateway + SQLite durable 存储 + 托管更新 | 单网关持有 live 会话 + pm 运行时 + Electron Desktop |
| 质量痛点 | 升级链路（updater/Doctor）、Windows 平台 | 安装/更新链路（pm 环境）、贡献者权限流程 |

## 6. 社区热度与成熟度

- **快速迭代期**：两个项目 Issue 新开量（398/291）均远超关闭量，功能 PR 持续涌入，处于功能扩张阶段。Hermes Agent 的 RFC 讨论（#112639）和移动端投票（#11911）显示其仍在探索产品边界。
- **质量巩固期信号**：OpenClaw 修复吞吐高（102 关闭、149 PR 处理）但 P0 多数无 fix PR，说明正从迭代期向巩固期过渡，**9.x 升级链路收敛是当前拐点**。
- **积压风险**：两者长期积压均需集中 triage——OpenClaw 的 #69208（4 月 umbrella）、#48920（文档-发布同步）；Hermes 的 #31415（Termux，5 个月）、#132401（数据丢失悬置一周）。Hermes 397 条待合并 PR 中大 PR（#106742 开放一个月）存在分叉风险。

## 7. 值得关注的趋势信号

1. **升级链路成为 AI 助手项目的“阿喀琉斯之踵”**：两个项目不约而同在 install/update 上形成痛点集群，提示自更新型 agent 运行时需将 updater 视为一等公民（事务化升级、自动回滚、产品内恢复路径）。
2. **数据安全的“静默操作”零容忍**：#132401 与 #153426 均因无日志的静默删除/排除引发信任危机，"quarantine + 审计日志 + 一键撤销”将成为 agent 记忆/文件系统的标配能力。
3. **会话统一是下一阶段架构主线**：多入口（CLI/Desktop/bot/移动端）attach 同一 live 会话的需求在两个项目中同时出现，配套的上下文压缩与缓存前缀保真（#130909、#9986）是关键配套技术。
4. **token 成本优化进入工程化阶段**：工具 schema 固定开销（约 3,500 token/会话）、前缀缓存破坏等问题开始获得优先级，成本感知的 agent 设计将成差异化因素。
5. **核心瘦身 + 插件 catalog 是可持续生态模式**：Hermes 将 Home Assistant 迁出核心的做法值得借鉴——运行时保持最小，能力通过官方目录分发，兼顾维护成本与生态扩展。
6. **对开发者的直接参考**：生产级 agent 应优先建设可观测性（用户已自发提供 CPU profile、SQLite 状态），并建立 CI 环境隔离检查（OpenClaw #51429 hardcode 路径事件的前车之鉴）。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-10

## 1. 今日速览

Hermes Agent 今日延续高活跃度：过去 24 小时共 318 条 Issue 更新（新开/活跃 291，关闭 27）、500 条 PR 更新（待合并 397，已合并/关闭 103），无新版本发布。社区讨论焦点集中在**安装/更新链路的稳定性**（占高热度 Issue 的近半数）和**网关会话状态管理**两大主题。值得注意的是 P0 级数据丢失 Issue（#132401）仍在待决策状态，同时多项 P0/P1 修复 PR（#129492、#130909）已进入收尾或关闭阶段。整体健康度良好，但更新器相关的回归问题呈现集群化趋势，值得维护团队警惕。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日关闭的重要 PR（103 条合并/关闭中精选）：

- **#129492 [P0] Anthropic preserved thinking 重放修复**（已关闭）：修复 `_manage_thinking_signatures` 在历史轮次剥离签名 thinking 块的策略——该策略早于 Claude 4.6 preserved thinking，导致缓存命中率与正确性受损。这是今日最重要的 provider 级修复落地。
- **#127032 Windows fs.watch 事件风暴修复**（已关闭）：针对 `ReadDirectoryChangesW` 在 Windows 上每秒约 18 万事件的洪泛，Desktop 预览文件监控回退到轮询模式。
- **#132663 Email 认证加固**（已关闭，行为变更）：发件人认证不再接受伪造的 `dmarc=pass`，要求 `authserv_id` pin，未配置前拒收邮件。**部署需注意：升级后需为邮件通道配置 authserv_id，否则邮件投递将 fail-closed。**
- **#132469 Home Assistant 移出核心**（已关闭）：平台与工具集迁移至官方 catalog 插件 `homeassistant` 2.0.1，旧 profile 自动安装插件，属于核心瘦身的重要一步。
- **#132851 Cloudflare Web Search 插件目录条目**（已关闭）：接入 10 月 2 日新发布的 Cloudflare Web Search API。

持续推进中的大型 PR：

- **#106742 “单一网关持有所有本地会话”**：CLI/TUI/Desktop/ACP/bot/cron 统一 attach 到同一 live 会话，是本周期最大的架构重构，仍在 needs-decision 状态。
- **#130909 [P0] 压缩摘要缓存前缀保留**：修复 compaction 后缓存前缀丢失问题，open 中，关联多个会话状态 bug。
- **#129284 / #123188 shell-hooks 与插件 hook 机制修复**：插件生态健壮性持续完善。

## 4. 社区热点

**评论最多 Issue：**

1. [#134107（39 评论）solstice provider 加载失败](https://github.com/NousResearch/hermes-agent/issues/134107) — 精简 PM 运行时缺少 httpx，警告泄漏到终端并打乱 TUI 布局，每次 `hermes update` 重复出现 6 次。反映用户对**开箱即用体验**的强烈不满。
2. [#133992（24 评论）macOS Desktop 更新死锁](https://github.com/NousResearch/hermes-agent/issues/133992) — Desktop 更新按钮触发的 `hermes update` 被自己 hand-off 持有的锁拒绝（exit 2），是 #78119/#87514 的回归。标注 needs-repro，用户复现材料充足。
3. [#132401（20 评论）P0 scratch 目录静默删除](https://github.com/NousResearch/hermes-agent/issues/132401) — 24h 空闲清理无日志、无隔离区、无保留标记，静默销毁多天工作成果。**数据安全级问题，仍处 needs-decision，强烈建议优先处理。**
4. [#131859（17 评论）CreatePullRequest 权限错误](https://github.com/NousResearch/hermes-agent/issues/131859) — 特定贡献者账号无法向上游开 PR，阻塞社区贡献，状态 blocked。
5. [#112639（16 评论）script-speed computer use RFC](https://github.com/NousResearch/hermes-agent/issues/112639) — 语义状态 + runahead 执行的愿景级提案，持续吸引架构讨论。

## 5. Bug 与稳定性（按严重程度）

| 严重度 | Issue | 问题 | Fix PR |
|---|---|---|---|
| P0 | [#132401](https://github.com/NousResearch/hermes-agent/issues/132401) | scratch prune 静默删除多日工作成果 | ❌ 无 |
| P0（PR） | [#130909](https://github.com/NousResearch/hermes-agent/pull/130909) | 网关压缩摘要缓存前缀丢失 | ✅ 该 PR 开放中 |
| P1 | [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) | 更新失败留下半安装状态，无产品内恢复路径（本周 15 个 Discord 线程） | ❌ 无系统方案 |
| P1 | [#131055](https://github.com/NousResearch/hermes-agent/issues/131055) | Linux Desktop 二次启动污染 sandbox fallback 标记 → 渲染器 SIGILL 循环 | ❌ 无 |
| P1 | [#122555](https://github.com/NousResearch/hermes-agent/issues/122555) | pm 激活错误 ABI 的依赖环境且丢弃当前 site-packages | ❌ 无 |
| P1 | [#131578](https://github.com/NousResearch/hermes-agent/issues/131578) | 网关：后台子代理完成事件重新 pin 聊天路由，卡死 30 分钟并丢失委派结果 | ❌ 无 |
| P2 | [#124794](https://github.com/NousResearch/hermes-agent/issues/124794) | partial clone + git<2.44 触发无界递归 fetch 进程树，8GB ARM 机器 swap 耗尽 | ❌ 无 |
| P2 | [#131444](https://github.com/NousResearch/hermes-agent/issues/131444) | Windows 上 .git 7 小时静默写入 180 GiB（332 packs） | ❌ 无 |
| P2 | [#124583](https://github.com/NousResearch/hermes-agent/issues/124583) | terminal 工具提示引用不存在的 process 工具名 | ❌ 无 |

**趋势警示**：`area/install-update` 标签在高热度列表中出现 7 次，更新链路问题已形成明确的“痛点集群”（#125437 的聚合分析可作为修复路线图）。

## 6. 功能请求与路线图信号

- **会话统一**：#106742（单网关全会话）+ [#103748](https://github.com/NousResearch/hermes-agent/issues/103748)（向 live session 注入消息）+ [#79198](https://github.com/NousResearch/hermes-agent/issues/79198)（跨平台会话组）同向发力，多入口统一会话是明确的下一阶段主线。
- **移动端**：[#11911](https://github.com/NousResearch/hermes-agent/issues/11911)（iOS/Android 原生 App + 语音通话，11 👍）持续获得社区投票，尚无官方回应。
- **Desktop 打磨**：[#135255](https://github.com/NousResearch/hermes-agent/issues/135255) Microsoft Store 构建追踪 issue 表明官方分发渠道扩展已在测试阶段；[#55287](https://github.com/NousResearch/hermes-agent/issues/55287)（可配置聊天宽度）、[#119120](https://github.com/NousResearch/hermes-agent/issues/119120)（Windows 最小化/托盘解耦）为低成本高感知改进。
- **插件生态扩张**：Cloudflare Web Search（已合并）、hermes-muse（#134976 评审中）、Home Assistant 独立仓库化——核心瘦身 + catalog 扩容的双轨策略清晰。

## 7. 用户反馈摘要

- **痛点集中区**：安装/更新是最大摩擦点——用户反复手敲修复命令（#125437），Windows 用户遭遇磁盘被 180 GiB 垃圾 pack 淹没（#131444），Android/Termux 安装持续失败（#31415，开放近 5 个月）。
- **信任敏感问题**：scratch 静默删除（#132401）触发对数据安全边界的质疑；用户明确要求“删除前至少进隔离区”。
- **高级用户诉求**：多代理编排者需要跨 profile/平台共享会话上下文（#103748、#79198）；运维型用户依赖 gateway + cron 自动化，对 kanban 声明误判、后台进程逃逸（#132358）等可靠性问题敏感。
- **正面信号**：插件 catalog 贡献活跃（多位外部贡献者提交 catalog PR），RFC 级讨论（#112639）质量高，显示核心社区深度参与。

## 8. 待处理积压

需维护者优先关注：

1. **#132401（P0，10-03 开，needs-decision）** — 数据丢失级，决策悬置一周，建议尽快给出 quarantine 方案。
2. **#125437（P1 痛点集群，10-27 开放已两周）** — 已有完整机制分析，缺系统性恢复方案。
3. **#31415（Termux 安装失败，5 月开至今）** — 移动端用户持续流失风险。
4. **#131859（贡献者 PR 权限，blocked）** — 阻塞外部贡献，建议联系 GitHub Support 或提供 workaround。
5. **#79357（gateway 空闲压缩永不触发，8 月开）** — 2 👍 且根因已定位（watchdog 重置时间戳），修复成本低。
6. **#48523（convert_messages 字段泄漏致 400，6 月开，2 👍）** — 长期影响严格 provider 用户。

**积压健康度**：待合并 PR 397 条 vs 24h 关闭 103 条，合并速率尚可但大 PR（#106742 已开一个月）需推进决策，避免长期分叉风险。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*