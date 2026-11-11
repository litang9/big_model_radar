# OpenClaw 生态日报 2026-11-11

> Issues: 280 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-11 00:38 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-11

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时内 Issues 更新 280 条（新开/活跃 191、关闭 89，关闭率约 32%），PR 更新 500 条（待合并 347、已合并/关闭 153），并发布 2 个新版本。社区讨论焦点集中在**会话状态管理（session-state）**与**模型回退/fallback 链可靠性**两大主题，多条 P0/P1 级 Bug 与 Codex/xAI 提供商路径相关。维护者 [@steipete](https://github.com/steipete) 今日提交多个性能优化 PR，CI 与发布基础设施也在持续改进。整体看，项目处于快速迭代期，但 2026.10.x → 2026.11.x 升级路径上的回归问题值得警惕。

## 2. 版本发布

### v2026.11.3（最新稳定版）
- **Private task results**：私有子代理（subagent）的完成结果不再泄露到流式聊天回复中（#188490，感谢 @fuller-stack-dev）
- **可靠的子任务交接**：父代理取消子任务后可正常交接给替代工作，不再遗留已取消的子任务

### v2026.9.37（extended-stable 维护线）
- 这是**仅面向 Gateway** 的 `extended-stable` 版本，由维护者明确决策从已退役的 9 月维护线发布
- 内容 = 2026 年 9 月底的 OpenClaw + 关键安全更新、可靠性与性能修复、新模型支持

**迁移提示**：升级到 2026.11.x 前请先清理配置中的 retired keys（如 `agents.defaults.heartbeat`），否则升级会被 candidate admission 以 `invalid-config` 拒绝（见 [#193157](https://github.com/openclaw/openclaw/issues/193157)）。

## 3. 项目进展

今日 PR 侧亮点（多数为提交/评审中状态，合并数据含于 153 条已合并/关闭中）：

- **性能优化**（@steipete）：
  - [#196936](https://github.com/openclaw/openclaw/pull/196936)：删除单个会话后不再全量重建健康摘要，保留既有索引
  - [#196937](https://github.com/openclaw/openclaw/pull/196937)：sandbox 导入/导出后避免全量内容哈希，显著减少 IO
- **可靠性**：
  - [#196923](https://github.com/openclaw/openclaw/pull/196923)：Gateway 优雅重启时保留排队中的入站消息（security-boundary 标记，需评审）
  - [#196927](https://github.com/openclaw/openclaw/pull/196927)：suspended-run 槽位满时仍可收集已完成的后台进程结果
- **安全边界**：
  - [#196907](https://github.com/openclaw/openclaw/pull/196907)：修复 node tool 伪造 plugin owner 绕过 plugin-ID 工具策略的漏洞
- **客户端生态**：Apple/macOS ID re-bind 与 binding_seq 上限修复（[#196445](https://github.com/openclaw/openclaw/pull/196445)、[#196442](https://github.com/openclaw/openclaw/pull/196442)），Signal 消息原地编辑（[#195625](https://github.com/openclaw/openclaw/pull/195625)）
- **长期大 PR 持续推进**：技能使用审计（[#141004](https://github.com/openclaw/openclaw/pull/141004)，XL）、CLI 后端原生压缩前内存 flush（[#138129](https://github.com/openclaw/openclaw/pull/138129)）

整体评估：项目在性能、多客户端（Apple/Android/Web/Signal/Telegram）和 CI 基建三条线上并行推进，节奏健康。

## 4. 社区热点

| Issue | 评论 | 主题 |
|---|---|---|
| [#150635](https://github.com/openclaw/openclaw/issues/150635) | 27 | 🦞 记忆系统"dreaming deep phase"从未晋升条目——短期召回存储达 512 上限后，夜间 ingestion 全是零召回条目。用户对记忆分层机制的有效性提出核心质疑 |
| [#193962](https://github.com/openclaw/openclaw/issues/193962)（已关闭） | 26 | P0：SQLite header-probe 超时的修复在 2026.10.10 上无法通过 `openclaw update` 触达——"修复够不着自己"的升级死锁，社区高度共鸣 |
| [#123792](https://github.com/openclaw/openclaw/issues/123792) | 18 | claude-cli 后端下助手消息双重渲染（实时块视图 + 聚合记录），影响 WebChat 与 Android |
| [#154572](https://github.com/openclaw/openclaw/issues/154572)（已关闭） | 16 | `sessions_spawn` 到 claude-cli 子代理必然失败（SessionTranscriptWriterClaimReboundError） |
| [#151962](https://github.com/openclaw/openclaw/issues/151962) | 15 | 13 天长会话中出现"幽灵用户消息"——内部运行时字符串（心跳轮询、异步命令完成）被当作用户 prompt 提交 |

**诉求分析**：讨论最热烈的话题集中在**长时运行会话的状态完整性**与**记忆系统有效性**，反映出一批将 OpenClaw 作为长期个人助理运行的重度用户，对数据一致性和记忆可靠性有强需求。

## 5. Bug 与稳定性（按严重程度）

**P0（发布阻塞级）**
- [#194664](https://github.com/openclaw/openclaw/issues/194664)：Codex protected continuation 阻塞所有后续消息，而 Stop 又报告无活跃 run（2026.11.1）— 暂无 fix PR
- [#190563](https://github.com/openclaw/openclaw/issues/190563)：无法恢复暂停的 Codex 会话（provider review 与 native thread 不匹配，回归）— 暂无 fix PR
- [#147728](https://github.com/openclaw/openclaw/issues/147728)：xAI OAuth 推理全量 HTTP 426——OpenClaw 版本号被当作 Grok CLI 版本头发送 — 暂无 fix PR

**P1（高影响）**
- [#170928](https://github.com/openclaw/openclaw/issues/170928)：Windows 2026.10.2 Gateway 需 7–9 分钟才能就绪，就绪后仍间歇性无响应（回归）
- [#181459](https://github.com/openclaw/openclaw/issues/181459)：3.5 GB agent DB 使 2026.10.6 启动成为"赌博"（4–6 分钟启动，embeddings 存储 3 倍冗余）
- [#194403](https://github.com/openclaw/openclaw/issues/194403)：helper 完成后的续跑自我失效，会话被阻塞（2026.11.1）
- [#168101](https://github.com/openclaw/openclaw/issues/168101)：工具调用后的 429 Retry-After 无视 maxRetryDelayMs，占住整个会话 lane

**P2 精选**
- [#112313](https://github.com/openclaw/openclaw/issues/112313)：出站投递队列死信条目永久无法清除
- [#112638](https://github.com/openclaw/openclaw/issues/112638)：session.maintenance enforce 模式无法约束存储上限（thread/channel 条目豁免回收）
- [#155868](https://github.com/openclaw/openclaw/issues/155868)：agent 触发的 run 使用缩减工具清单，导致 warm session 的 prompt-cache 全量 miss

## 6. 功能请求与路线图信号

- **记忆插件可插拔化**：[#138366](https://github.com/openclaw/openclaw/issues/138366) 提议在 `MemoryPluginCapability` 中加入 `dreaming` provider，让记忆槽位所有者驱动 Dreams 页面——与 #150635 的记忆系统问题相呼应，可能成为记忆子系统重构的信号
- **回退链增强**：[#151980](https://github.com/openclaw/openclaw/issues/151980)（session model pin 继承 agent 回退链）与 [#192009](https://github.com/openclaw/openclaw/issues/192009)（cron 跨提供商回退账户显式授权）共同指向 fallback 体系是下一阶段重点
- **多策略别名**：[#140213](https://github.com/openclaw/openclaw/issues/140213)（多个 policy 别名解析到同一模型）已有决策包，接近落地
- **MCP 2.0 迁移**：[#119294](https://github.com/openclaw/openclaw/issues/119294)（已关闭）追踪 stateless MCP 规范迁移，SDK 拆包工作可能纳入后续版本
- **可能进下一版本**：WebChat 前台 run 的强制检查点（[#138990](https://github.com/openclaw/openclaw/issues/138990)）、Telegram transcript echo 控制（PR [#196932](https://github.com/openclaw/openclaw/pull/196932) / [#187312](https://github.com/openclaw/openclaw/pull/187312) 已就绪待合并）

## 7. 用户反馈摘要

**痛点**
- **升级路径脆弱**：多条 issue（#193157、#193962、#144739、#177077）反映用户被困在旧版本或升级被拒，"fix 已合并但发布包里没有"的抱怨反复出现
- **重度会话用户受损最重**：长会话（13 天、310k token）、大型 DB（3.5 GB）用户遭遇内存不召回、幽灵消息、启动超时
- **消息丢失类问题**（interrupted pendingInputs、语音通话告别语被截断 #155271、群聊空回复发错误提示 #192688）直接影响最终用户体验
- **资源占用**：空闲 CPU 100–170%（#192496）、macOS WindowServer 高占用（#138918）、base64 图片撑爆 DB（#143973：1.3% 事件占 80% 存储字节）

**满意点**
- Issue 分诊体系（clawsweeper 标签、issue-rating 海鲜分级）运转清晰，社区报告质量高
- extended-stable 维护线为保守用户提供了安全更新通道，受运维用户欢迎
- 多提供商/多渠道（Signal、Telegram、微信桥接、Teams）覆盖面被真实使用场景验证

## 8. 待处理积压

- [#112313](https://github.com/openclaw/openclaw/issues/112313)（7-21 开启）：死信队列永久堆积 — **需产品决策**，🦞 级
- [#112638](https://github.com/openclaw/openclaw/issues/112638)（7-22 开启）：存储上限不受控 — 🦞 级，需产品决策
- [#92473](https://github.com/openclaw/openclaw/issues/92473)（6-12 开启）：fallback 通知泄露到外部渠道 — 内部路由信息暴露风险
- [#151962](https://github.com/openclaw/openclaw/issues/151962)、[#138561](https://github.com/openclaw/openclaw/issues/138561)：已标 stale，但分别涉及幽灵消息与记忆回归，建议复核而非自动关闭
- 长期大 PR：[#141004](https://github.com/openclaw/openclaw/pull/141004)（XL，9-07 开启）、[#138129](https://github.com/openclaw/openclaw/pull/138129)（security-boundary，9-04 开启）、[#156393](https://github.com/openclaw/openclaw/pull/156393)（9-23 开启）等待维护者评审

**健康度小结**：吞吐量与社区参与度优秀，但 2026.10.x 升级路径回归、记忆系统有效性、以及 7 月开启的多条 🦞 级 session-state 积压，是当前最需要维护者关注的三条主线。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告
**数据日期：2026-11-11 | 样本：OpenClaw、Hermes Agent**

---

## 1. 生态全景

个人 AI 助手 / 自主智能体赛道已进入**“重度使用驱动深度工程”阶段**：两项目日均 Issue/PR 活动均达数百条量级，说明用户已从尝鲜转向 7×24 长期部署。核心矛盾集中在三处——**长会话状态完整性、记忆系统有效性、升级/更新链路可靠性**，这些是通用 LLM 应用不暴露、而“持续运行的个人智能体”必然暴露的工程深水区。同时生态正经历**入口收拢**：Hermes Marketplace 上线、OpenClaw extended-stable 维护线确立，均标志着头部项目从功能扩张转向生态治理。安全边界（工具策略绕过、审批放行、内部信息泄露）开始成为独立议题，预示行业即将进入“智能体安全”标准化讨论期。

---

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 280（新开/活跃 191，关闭 89，关闭率 ~32%） | 500（新开/活跃 416，关闭 84，关闭率 ~17%） |
| PR 更新（24h） | 500（待合并 347，合并/关闭 153） | 500（待合并 399，合并/关闭 101） |
| Release | v2026.11.3 + v2026.9.37（extended-stable） | v0.23.1（打包 618 个 PR 的 patch） |
| 最热 Issue | #150635 记忆系统（27 评论） | #143547 统一 Gateway 遗留问题（60 评论） |
| 最高危 Bug | 3 个 P0 无 fix PR（Codex 会话阻塞 ×2、xAI OAuth 426） | 1 个 P0 无 fix PR（state.db 误恢复致数据丢失） |
| 积压年龄 | 最长 4 个月（🦞 级，7 月开启） | 最长 ~8 个月（#2045 懒加载 skills） |
| 健康度评估 | **质量巩固期**：关闭率较高、双发布线治理、分诊体系（clawsweeper/海鲜分级）成熟，但升级路径回归是主要风险 | **快速迭代/扩张期**：活跃度更高但关闭率明显偏低，统一 Gateway 大重构遗留债务累积，稳定性风险敞口更大 |

---

## 3. OpenClaw 在生态中的定位

**优势**
- **发布工程成熟**：双维护线（最新稳定 + extended-stable）+ candidate admission 门控，为保守运维用户提供了 Hermes 尚不具备的发布治理能力。
- **多渠道客户端覆盖领先**：Apple/macOS、Android、WebChat、Signal、Telegram、微信桥接、Teams 均有真实使用验证，是“无处不在的个人助理”路线的最完整实现。
- **社区分诊质量高**：clawsweeper 标签、海鲜分级、issue-rating 体系运转清晰，高报告质量降低了维护者负担。

**技术路线差异**
- OpenClaw 重**运行时可靠性工程**（fallback 链、sandbox 安全边界、Gateway 优雅重启、session-state 管理），面向“长期驻留的会话代理”。
- Hermes 重**生态与本地化**：插件 Hackathon、本地模型调优（qwen3.8-27b MTP +46% 解码提速）、统一 Gateway 单进程架构，偏向“可扩展的本地优先平台”。

**社区规模对比**：Hermes 的绝对活跃量更高（416 vs 191 活跃 Issue），但相当部分由 Hackathon 插件目录 PR 驱动；OpenClaw 单 Issue 讨论深度（27 评论的记忆系统质疑）显示其重度用户黏性更强。二者处于不同量级阶段：OpenClaw 用户更“深”，Hermes 用户更“广”。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw 证据 | Hermes 证据 |
|---|---|---|
| **记忆系统有效性与治理** | #150635 短期召回 512 上限零晋升；#138366 dreaming provider 插件化提案 | #5320 记忆配额自动扩容、#35121 配额超限不可重试 |
| **长会话状态完整性** | #151962 幽灵消息、#154572 子代理失败、#194403 续跑自失效 | #131578 后台进程事件劫持路由、#148958 owner 失速误判 crash |
| **更新/升级链路可靠性** | #193157 retired keys 阻塞升级、#193962 “修复够不着自己”死锁 | #147938 误恢复旧快照、#122656 no-op 更新循环、#102540 更新耗时 6 分钟+ |
| **可观测性与资源控制** | 空闲 CPU 100–170%（#192496）、DB 膨胀（#181459、#143973） | 日志静默丢失（#142036/#141958）、browser_harness 守护进程泄漏（#121095） |
| **多模型/多提供商策略** | fallback 链继承（#151980）、跨提供商回退授权（#192009）、Codex/xAI P0 | 本地模型运行时（ornith-35b、qwen3.8-27b MTP） |
| **安全与审批边界** | #196907 plugin owner 伪造绕过、#92473 fallback 通知泄露 | #141346 smart 审批放行破坏性 AppleScript、morph API 审批门插件 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道消息接入、会话/记忆可靠性、企业级发布治理 | 插件生态、本地模型、单进程统一 Gateway、Desktop 体验 |
| 目标用户 | 将智能体作为长期个人助理运行的重度用户；需要 extended-stable 的运维型用户 | 本地优先爱好者、插件开发者（Hackathon）、多 agent/Kanban 工作流用户 |
| 架构 | Gateway + 多客户端分布式架构，security-boundary 显式标记 | 统一 Gateway 单进程收拢（CLI/TUI/Desktop/API/bot/cron），正处于重构后消化期 |
| 生态策略 | 内建能力为主，插件/技能体系谨慎演进 | Marketplace 战略收拢，插件目录爆发式增长 |
| 风险画像 | 升级路径回归、7 月遗留的 session-state 🦞 级积压 | 大重构稳定性债务、P0 数据丢失未修、测试基建大面积失败 |

---

## 6. 社区热度与成熟度

- **快速迭代阶段：Hermes Agent**。高开量（416 活跃 Issue）、低关闭率（~17%）、618 PR 打包成 patch 版本，加上统一 Gateway 重构未消化完毕——典型的高速扩张特征，质量债务与功能速度赛跑。
- **质量巩固阶段：OpenClaw**。32% 关闭率、双发布线、成熟分诊体系、维护者（@steipete 等）直接投入性能优化，工程节奏更可控；但 2026.10→11 升级回归表明其巩固期并不轻松。
- **共性短板**：两项目均有数月级积压未清（OpenClaw 🦞 级 4 个月；Hermes 最长 8 个月），且**最高危 Bug 均无 fix PR**——反映该赛道普遍“前进优先于回填”。

---

## 7. 值得关注的趋势信号

1. **“智能体操作系统”化**：记忆分层/dreaming、技能审计、fallback 链、session-state 管理正在成为标准子系统，且开始插件化（OpenClaw #138366 dreaming provider）——**记忆与策略层可插拔是下一个竞争点**。
2. **发布工程成为信任基础设施**：用户对“fix 已合并但发布包里没有”的容忍度趋零。OpenClaw 的 extended-stable 模式与 candidate admission 可能被同行效仿；自动更新链路的数据安全（Hermes #147938）将成为红线问题。
3. **安全默认值从乐观转向保守**：smart 审批放行破坏性脚本、plugin owner 伪造绕过工具策略、内部路由信息外泄——**“智能体安全边界”将从加分项变为准入门槛**，审批门类插件（如 Hermes morph）有生态机会。
4. **本地模型与 token 经济驱动性能工程**：懒加载 skills、MTP 解码提速、prompt-cache 命中优化，说明**运行成本与上下文预算已成为架构约束**而非优化项。
5. **对开发者的参考价值**：构建长驻智能体时，应优先投资——(a) 会话状态的崩溃一致性设计；(b) 可观测性（日志不可静默丢失）；(c) 更新的原子性与可回滚；(d) 审批边界的最坏情况假设。这四点恰是当前两个头部项目的共同痛点，也是后来者的差异化窗口。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-11

## 1. 今日速览

Hermes Agent 今日保持极高活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 416，关闭 84），PR 更新 500 条（待合并 399，已合并/关闭 101），显示社区贡献和问题反馈均处于旺盛状态。昨日发布 **v0.23.1 补丁版本**，将自 v0.23.0 以来约 618 个 PR 打包为稳定发布。**Plugin Hackathon 正在进行中**，今日新增大量插件目录 PR 是最大亮点。同时 Gateway 统一化改造（#106742）遗留问题、Kanban worker 稳定性、日志静默丢失等问题持续发酵，构成主要稳定性风险。

---

## 2. 版本发布

### v0.23.1（2026-11-09 发布）
- **性质**：Patch 补丁版本，非功能性发布。
- **内容**：将 v0.23.0 以来约 **618 个已合并 PR** 滚动打包为稳定 tag，覆盖 GitHub Release（CLI 与安装器）、Microsoft Store 应用、Docker 及 Hermes Cloud。
- **破坏性变更**：官方说明完整 curated notes 将随 **v0.24.0** 发布，建议升级用户留意 v0.24.0 的迁移说明。
- **链接**：https://github.com/NousResearch/hermes-agent/releases

---

## 3. 项目进展

今日 PR 流以**插件生态扩张**为主（Hackathon 驱动），核心功能推进包括：

- **插件目录新增（Hackathon 入口）**：
  - nightshift（#153009）、NousViz 数据分析（#153010）、storage-utility/Tune-up（#152350）、melange（#152343）、rainbowomma 多 agent 资源隔离（#152248）、morph API 审批门（#152243）、heats 测试裁判（#152450）、kaggle-competitions（#152233）、passkey-gate（#152214）、Tallyhand Twitch 集成（#152205）
  - 已关闭（合并或撤回）：ctx_handover（#152366）、lean-mode（#152189）、openwall-mcp（#152174）
- **核心修复**：
  - **sudo 下依赖目录解析修复**（#153011、#128426）：`sudo` 启动时 `HERMES_HOME` 被剥离导致误解析到 `/root/.hermes`，新 PR #153011 直接针对该问题，是今日最重要的核心修复候选。
- **本地模型运行时**：ornith-35b 目录条目、qwen3.8-27b MTP depth 4（实测 +46% 代码/+38% 散文解码提速）（#153008）。
- **产品清理**：移除旧版 Skills Hub / Plugins Hub，全面指向已上线的 Hermes Marketplace（#148271）——生态入口的战略性收拢。
- **Desktop**：会话全量转写搜索（Cmd/Ctrl+F，跨压缩段检索）持续推进（#134142）。

**评估**：今日核心代码改动以 sudo 修复和目录整理为主，生态扩张显著——插件目录 PR 占待合并量的相当比例。

---

## 4. 社区热点

| Issue | 评论 | 热点分析 |
|---|---|---|
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 统一 Gateway 合并后问题跟踪 | 60 | 10月14日合并的统一网关把 CLI/TUI/Desktop/API/消息 bot/cron 全部收进单一进程，属大重构，遗留问题持续高热，是多条其他 bug 的共同上游。 |
| [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) Smart 审批自动放行 osascript 导致数据丢失 | 39 | 安全类问题：agent 经 AppleScript 操作用户运行中的 PowerPoint，关闭未保存文档并删除导出。`approvals.mode=smart` 的放行边界是核心诉求，呼声指向更保守的默认策略。 |
| [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) Keet gateway setup TypeError | 28 | 安装路径崩溃，长期未修。 |
| [#129455](https://github.com/NousResearch/hermes-agent/issues/129455) 默认安装下测试套件大面积失败 | 28 | CI/测试基础设施问题，影响贡献者体验。 |
| [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) 生命周期守卫误杀良性 Node CLI 命令 | 26 | 9月 scan-budget 提交引入的回归，守卫过于激进。 |
| [#20510](https://github.com/NousResearch/hermes-agent/issues/20510) 跨设备云同步配置（👍24）| 9 | 高赞需求：`~/.hermes/` 全本地存储，多设备用户痛点。 |
| [#48375](https://github.com/NousResearch/hermes-agent/issues/48375) Desktop 拼写检查（👍13）| 11 | 高赞小需求。 |

---

## 5. Bug 与稳定性（按严重度排列）

**P0**
- [#147938](https://github.com/NousResearch/hermes-agent/issues/147938) Windows 更新后 state.db 校验把活锁误判为损坏，**用数月前的旧快照覆盖健康数据**且误报恢复失败。数据丢失级，未见 fix PR。⚠️ 最紧急。

**P1**
- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Gateway 卡顿时 Kanban worker 批量崩溃（"Kanban execution unknown"），进行中工作丢失。
- [#139029](https://github.com/NousResearch/hermes-agent/issues/139029) Kanban worker 死于 `WorkerPersistenceError: synchronous_rpc_on_event_loop`。
- [#131578](https://github.com/NousResearch/hermes-agent/issues/131578) 子 agent 后台进程完成事件劫持聊天路由，卡死 30 分钟并丢失委派结果——影响全部消息平台。
- ➕ 安全类 [#141346](https://github.com/NousResearch/hermes-agent/issues/141346)（见上，P3 标签但实际影响严重）。

**P2**
- [#142036](https://github.com/NousResearch/hermes-agent/issues/142036) / [#141958](https://github.com/NousResearch/hermes-agent/issues/141958) Gateway 重启/启用 multiplexing 后**日志静默停止写入**——两个相关报告，严重削弱可排障性。
- [#148958](https://github.com/NousResearch/hermes-agent/issues/148958) Kanban 卡片因 owner 失速被误计为 crash，两次即阻塞。
- [#137838](https://github.com/NousResearch/hermes-agent/issues/137838) macOS gateway 反复 exit 75（根因未定）。
- [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) `browser_exec` 遗留永不退出的 browser_harness 守护进程。
- [#95189](https://github.com/NousResearch/hermes-agent/issues/95189) WSL2 下 gateway 每 ~2 分钟异常退出，引发渲染端 OOM。
- [#122656](https://github.com/NousResearch/hermes-agent/issues/122656) Desktop 每次后端启动执行 no-op 更新接管，循环重建并杀死活跃聊天。

**修复状态**：多数高危项暂无对应 fix PR；sudo/HERMES_HOME 修复（#153011）是今日唯一明确的核心 fix。

---

## 6. 功能请求与路线图信号

| 需求 | 状态 | 下一版本信号 |
|---|---|---|
| 懒加载 skills（#2045，👍5）去除系统提示中的技能列表 | 无 PR | 87 个内置 skills 占用大量 token，与 #148271 生态收拢方向一致，可能性中等 |
| 记忆配额自动扩容（#5320，👍3）/ 配额超限不可重试（#35121） | 无 PR | 长会话用户强需求，两项相互关联 |
| 跨设备云同步（#20510，👍24） | 无 PR | 高赞但工程量大，需官方表态 |
| 浏览器 Dashboard 语音模式 WebRTC（#20765，👍6） | 无 PR | 远程服务器场景刚需 |
| Desktop 拼写检查（#48375，👍13） | 无 PR | 小型易实现 |
| God-file 拆分 `mcp_tool.py` 7230 行（#78642） | 无 PR | 2026-08 仓库政策已要求拆分所有 god files，属既定路线 |
| Desktop 会话全文搜索 | **PR #134142 活跃** | 最可能随 v0.24.0 落地 |

---

## 7. 用户反馈摘要

**痛点集中点：**
- **更新流程不可靠**：state.db 误恢复（#147938）、假警告（#126362）、更新耗时 6 分钟+（#102540）、no-op 更新循环（#122656）——安装/更新是投诉最密集的区域。
- **可观测性差**：日志静默丢失两个独立报告（#142036、#141958），用户"排障无从下手"。
- **审批机制信任危机**：smart 模式自动放行破坏性 AppleScript（#141346），安全默认值过于乐观。
- **Kanban 多 agent 用户受挫**：三个 P1/P2 issue 均指向 owner 失速处理不当，丢失在途工作。

**满意/正面：**
- 插件生态爆发（Hackathon 带动），插件目录 PR 提交规范、CI 审查流程成熟。
- 本地模型性能调优有实测数据支撑（#153008），社区贡献质量高。

---

## 8. 待处理积压

| Issue | 年龄 | 提醒 |
|---|---|---|
| [#2045](https://github.com/NousResearch/hermes-agent/issues/2045) 懒加载 skills | ~8 个月 | 高价值性能优化，需决策 |
| [#5320](https://github.com/NousResearch/hermes-agent/issues/5320) 记忆限额 | ~7 个月 | 有 👍，长期无进展 |
| [#67458](https://github.com/NousResearch/hermes-agent/issues/67458) `-z` 模式忽略 `-w` worktree | ~4 个月 | 静默行为不一致，易产生错误提交 |
| [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) Keet setup 崩溃 | ~2.5 个月 | 稳定复现的安装路径崩溃 |
| [#95189](https://github.com/NousResearch/hermes-agent/issues/95189) WSL2 gateway 循环退出 | ~2.5 个月 | awaiting-reporter 状态，建议主动跟进 |
| [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) browser_harness 守护进程泄漏 | ~1.5 个月 | 资源泄漏类，影响长期运行 |
| [#78642](https://github.com/NousResearch/hermes-agent/issues/78642) mcp_tool.py 拆分 | ~3 个月 | 政策已定但未执行 |

**健康度总评**：项目社区活跃度与生态扩张（尤其插件 Hackathon）表现优异，但统一 Gateway 重构后的稳定性债务（Kanban、路由、日志、更新链路）正在累积，P0 数据丢失问题 #147938 建议优先处置。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*