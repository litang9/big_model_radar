# OpenClaw 生态日报 2026-10-11

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-10 23:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-11

## 1. 今日速览

- 过去 24 小时共更新 **500 条 Issues**（新开/活跃 379，关闭 121）和 **500 条 PR**（待合并 353，已合并/关闭 147），社区互动量处于高位，项目热度旺盛。
- 无新版本发布，但 2026.9.x 系列稳定性问题持续发酵，尤其是 Windows 平台的 Gateway 启动/挂起类 P0 问题（#168307、#167652、#164396）值得重点关注。
- 核心维护者 @steipete 今日密集提交了多个 XL 级 Gateway 重构与修复 PR（#168602、#168649、#168670 等），显示大规模架构简化与健康度优化正在进行。
- 议题积压中 P0 级问题（crash-loop / ux-release-blocker）数量较多，维护者评审带宽（needs-maintainer-review 标签大量堆积）成为当前瓶颈。
- 整体健康度：**活跃度高、修复速度快，但稳定性债务与维护者响应压力并存**。

## 2. 版本发布

今日无新版本发布。当前用户广泛报告的版本为 2026.9.2 – 2026.9.9。

## 3. 项目进展

今日无正式合并记录展示，但多条高优先级 PR 处于 "ready for maintainer look" 或积极迭代状态，推进方向明确：

- **大规模 Gateway 健康度优化**：[#168649](https://github.com/openclaw/openclaw/pull/168649)（fix: reduce Gateway health stalls in large agent fleets，P1）针对 #149538 的 632-agent 舰队 /health 超时问题，773-agent 测试中就绪时间从 377.6s 降至 168.3s，成效显著。
- **会话状态架构重构**：[#168602](https://github.com/openclaw/openclaw/pull/168602) 引入 inactive session actor 与 scoped receipts，为后续输入/转录/投递重构铺路（stacked on #168316）。
- **CLI 工具与恢复链路修复**：[#168670](https://github.com/openclaw/openclaw/pull/168670) 修复 Claude CLI 后台 exec 完成后工具丢失；[#168650](https://github.com/openclaw/openclaw/pull/168650) 修复 Gateway 更新后中断 turn 被搁置的问题。
- **ChatGPT 服务端压缩 V2**：[#168401](https://github.com/openclaw/openclaw/pull/168401) 将 ChatGPT sign-in 的自动压缩从客户端有损摘要迁移到服务端压缩，可显著节省 token 成本。
- **Memory 系统修复**：[#168692](https://github.com/openclaw/openclaw/pull/168692) 修复 recency decay 导致相关历史笔记被错误过滤的问题。
- **架构瘦身系列**：[#168690](https://github.com/openclaw/openclaw/pull/168690)（metadata/catalog 生命周期简化）、[#168656](https://github.com/openclaw/openclaw/pull/168656)（UI 刷新簿记简化）、[#168485](https://github.com/openclaw/openclaw/pull/168485)（Matrix 线程绑定移至 worker）显示项目正在系统性削减不必要的复杂度。
- **诊断系列持续推进**：[#168710](https://github.com/openclaw/openclaw/pull/168710) 为 25 部分诊断简化栈的第 18 部分。

整体看，项目正在「修稳定性 + 简化架构」双轨快速推进，单日提交密度很高。

## 4. 社区热点

1. **[#143524](https://github.com/openclaw/openclaw/issues/143524)（评论 117）** — Agent SQLite WAL 文件在数天内膨胀至 1.4–2.8 GB（尽管设置了 `wal_autocheckpoint=1000`），并阻塞 Windows Gateway 启动。累计评论量全站第一，且仍标记 `no-new-fix-pr` + `needs-maintainer-review`，是**目前最迫切需要官方回应的 P0 问题**。诉求：大仓库/长期运行用户的存储可靠性与可运维性。
2. **[#149538](https://github.com/openclaw/openclaw/issues/149538)（已关闭，评论 26）** — 632-agent 舰队 Gateway ready 后事件循环饿死、/health 全部超时。**已有对应修复 PR #168649 并取得实测改善**，今日关闭，属于积极的闭环案例。
3. **[#48003](https://github.com/openclaw/openclaw/issues/48003)（评论 20）** — steer 模式无法在 turn 中途注入消息（根因定位到 3 月的 `KeyedAsyncQueue` 引入），有 linked PR 开放但未合并，用户持续追问。
4. **[#22438](https://github.com/openclaw/openclaw/issues/22438)（评论 19）** — 分层 bootstrap 文件加载提案，与 [#67419](https://github.com/openclaw/openclaw/issues/67419)（bootstrap 每轮重注入浪费 20–30% token）构成同一主题的强需求，等待产品决策。
5. **[#97616](https://github.com/openclaw/openclaw/issues/97616)（评论 18）** — hook/tool 子进程僵尸堆积导致运行时劣化，open since 6 月底。
6. **[#87744](https://github.com/openclaw/openclaw/issues/87744) / [#85251](https://github.com/openclaw/openclaw/issues/85251)** — Codex 后端的 turn 永不 completed / 静默卡死类问题持续获得 Telegram 用户关注。

## 5. Bug 与稳定性（按严重程度）

### P0 — 崩溃/启动阻塞/发布阻碍

| Issue | 问题 | Fix PR 状态 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | WAL 无限膨胀阻塞 Windows 启动（银贝级，117 评论） | ❌ 无 fix PR |
| [#167652](https://github.com/openclaw/openclaw/issues/167652) | Windows 2026.9.9 升级后 Doctor 报告成功但 Gateway 挂起 | ❌ 待 live repro |
| [#168307](https://github.com/openclaw/openclaw/issues/168307)（已关闭） | 2026.9.9 启动后单核 CPU 空转 6 小时+，拒绝连接（附 dump） | 评审中 |
| [#160521](https://github.com/openclaw/openclaw/issues/160521) | reconcileActive 未处理 rejection 崩溃（2026.9.6） | ❌ 待 live repro |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | 大型外部插件捕获阻塞事件循环数分钟（2026.9.6 回归） | ❌ source-repro 完成但无 PR |
| [#158390](https://github.com/openclaw/openclaw/issues/158390) | `tmp/plugin-captures` 永不清理，磁盘无限增长 | ❌ 无 fix PR |
| [#164396](https://github.com/openclaw/openclaw/issues/164396) | 2026.9.8 Windows 干净安装后无法连接本地 Gateway | ❌ |
| [#91931](https://github.com/openclaw/openclaw/issues/91931) | 预置 SOUL.md 等导致首次运行前误删用户 BOOTSTRAP.md（数据丢失） | ❌ |
| [#40001](https://github.com/openclaw/openclaw/issues/40001) | write 工具无 append 模式，cron 会话覆盖共享文件（钻石龙虾级） | ❌ 需产品决策 |
| [#142821](https://github.com/openclaw/openclaw/issues/142821) | 默认开启的 transcript 脱敏污染重放上下文（安全相关） | 有 linked PR 开放 |

### P1 — 可靠性/消息丢失

- [#162119](https://github.com/openclaw/openclaw/issues/162119)：模型切换后 Codex 间歇性 403 owner-verification（安全/认证）。
- [#101929](https://github.com/openclaw/openclaw/issues/101929)：上下文预检估算高估 2.3–2.6 倍，误触发截断恢复。
- [#125764](https://github.com/openclaw/openclaw/issues/125764)：Telegram 出站发送失败一次即进死信，无重试。
- [#84516](https://github.com/openclaw/openclaw/issues/84516)：Codex 长回复在 ~1000 字符处静默截断。
- [#159094](https://github.com/openclaw/openclaw/issues/159094)：state-lifecycle lease 竞争误报。
- [#157617](https://github.com/openclaw/openclaw/issues/157617)：会话写入队列因 DB 维护等待数分钟。
- [#94939](https://github.com/openclaw/openclaw/issues/94939)：6.x 迁移后 conversation-store SQLite 为 0 字节（MS Teams 数据丢失，已关闭）。

**稳定性结论**：Windows 平台与大仓库场景是当前 bug 重灾区；2026.9.6 引入的插件捕获（#144252）回归是明确的近期回归源。

## 6. 功能请求与路线图信号

- **分层/渐进式 bootstrap 加载**（[#22438](https://github.com/openclaw/openclaw/issues/22438) + [#67419](https://github.com/openclaw/openclaw/issues/67419)）：token 成本痛点呼声最强，#168401（服务端压缩）已体现同方向优化趋势，纳入下版本概率较高。
- **内置无头浏览器**（[#53763](https://github.com/openclaw/openclaw/issues/53763)）：长期讨论，依赖体积与安全边界是阻力。
- **MCP env 支持 SecretRef**（[#76493](https://github.com/openclaw/openclaw/issues/76493)，👍 4）：安全最佳实践诉求明确，改动面小，易于纳入。
- **Gateway 重启后补偿丢失的入站消息**（[#55792](https://github.com/openclaw/openclaw/issues/55792)）：IM 渠道用户强需求，已有 linked PR。
- **chatCompletions 忽略请求 model 字段**（[#30381](https://github.com/openclaw/openclaw/issues/30381)）：提升 OpenAI 兼容生态接入体验。
- **K8s 部署文档改进**（[#91455](https://github.com/openclaw/openclaw/issues/91455)）、**诊断内存阈值可配置**（[#87441](https://github.com/openclaw/openclaw/issues/87441)）均为低成本可落地项。

## 7. 用户反馈摘要

- **痛点集中在**：① 大规模/长期运行的资源管理（WAL 膨胀、僵尸进程、tmp 目录泄漏、OOM——[#99659](https://github.com/openclaw/openclaw/issues/99659)）；② Windows 安装与升级体验（Doctor 耗时 35 分钟、升级后挂起、干净安装失败）；③ 消息可靠性（Telegram 静默丢消息、Codex turn 卡死/截断）；④ token 成本（bootstrap 重注入、上下文估算偏差、客户端压缩无缓存收益）。
- **满意点**：#168649 舰队就绪时间减半、#168401 服务端压缩获得社区认可；修复栈推进节奏快，诊断标签体系（clawsweeper/issue-rating）让问题分类透明。
- **典型场景画像**：多 agent 舰队运维者（数百 agent）、Telegram/微信长期个人助理用户、cron 自动化重度用户是报告问题最积极的三类群体。
- **不满**：核心 P0（如 #143524 的 117 条评论）长期停留在 needs-maintainer-review；「needs-info / needs-live-repro」标签的反复拉锯消耗用户耐心。

## 8. 待处理积压

| Issue/PR | 状态 | 提醒 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524)（WAL 膨胀，P0） | open since 09-09，117 评论 | **最高优先**：影响发布阻塞且无 fix PR，建议维护者尽快定级回应 |
| [#40001](https://github.com/openclaw/openclaw/issues/40001)（write 无 append，数据丢失，钻石龙虾） | open since 03-08 | 产品决策悬置 7 个月，数据丢失级 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616)（僵尸进程） | open since 06-29 | 长期运行用户的核心痛点 |
| [#48003](https://github.com/openclaw/openclaw/issues/48003)（steer 模式失效） | open since 03-16，linked PR open | 根因已定位，等待 PR 推进合并 |
| [#91931](https://github.com/openclaw/openclaw/issues/91931)（误删 BOOTSTRAP.md，P0） | open since 06-10 | 新用户首次体验受损 |
| [#142821](https://github.com/openclaw/openclaw/issues/142821)（脱敏污染上下文，P0 安全） | linked PR open | 需 security review 排期 |
| PR [#137788](https://github.com/openclaw/openclaw/pull/137788)（cli-assistant 历史聚合） | open since 09-04 | XL 级、双 merge-risk 标签，评审成本高 |
| PR [#150200](https://github.com/openclaw/openclaw/pull/150200)（exec 审批截断修复） | ready for maintainer look + security review required | 已备好 proof，等待安全评审 |

**维护者建议**：优先处理 Windows Gateway 启动/挂起三连（#167652 / #168307 / #164396）与 #143524，它们共同构成 2026.9.9 → 下一版本的实际发布阻碍；同时推动 #168649 尽快合并固化舰队健康度收益。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告（2026-10-11）

## 1. 生态全景

个人 AI 助手与自主智能体开源生态正处于**高速迭代与生态扩张并行**的阶段：核心框架均保持日均数百条 Issue/PR 的高互动量，社区参与热度已达到成熟基础软件项目的量级。与此同时，头部项目普遍进入“功能扩张后的稳定性偿债期”——长期运行资源管理（存储膨胀、进程泄漏）、安装更新链路可靠性、无人值守工作流的状态机健壮性成为共性痛点。插件化与多渠道（IM/Desktop/CLI）架构成为主流技术路线，围绕 memory、模型路由、区域化工具的第三方生态正在快速形成。总体判断：**生态繁荣、核心承压**，下一阶段的竞争焦点将从功能转向可靠性与运维体验。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（活跃 379 / 关闭 121） | 290（活跃 262 / 关闭 28） |
| PR 更新（24h） | 500（待合并 353 / 关闭 147） | 500（待合并 333 / 合并/关闭 167） |
| Release | 无（当前 2026.9.2–9.9） | 无（v0.21.6 疑似筹备中） |
| 核心活跃 PR 性质 | XL 级架构重构 / 稳定性修复（维护者主导） | 插件目录生态提交（约 1/3 流量）+ 核心修复 |
| 待办积压特征 | P0 稳定性问题堆积，needs-maintainer-review 评审带宽瓶颈 | 333 条待合并 PR 中大量低风险目录提交，批量合并压力 |
| 健康度评估 | 活跃度高、修复速度快，但稳定性债务与维护者响应压力并存 | 生态繁荣、国际化贡献旺盛，但更新链路可靠性与数据安全（P0）构成最大风险 |

## 3. OpenClaw 在生态中的定位

- **规模与热度领先**：Issue 活跃量约为 Hermes 的 1.3–1.7 倍，单条 P0 问题（#143524）可积累 117 条评论，说明用户基数与参与深度均为生态头部水平。
- **技术路线更重“架构内核”**：OpenClaw 的 PR 流以维护者主导的 XL 级 Gateway 重构、会话状态架构、诊断简化栈（25 部分）为主，走**深度架构治理**路线；Hermes 则通过插件目录快速吸纳社区生态（memory 提供方、语言包、区域化工具），走**生态开放扩张**路线。
- **优势**：核心维护者投入密度高（@steipete 单日多个 XL PR）、修复闭环快（#149538 舰队健康度问题从定位到实测减半后关闭）、面向大规模部署场景（数百 agent 舰队）有明确优化。
- **劣势**：Windows 平台与大仓库场景是 bug 重灾区；P0 积压（WAL 膨胀、误删用户数据、安全脱敏问题）长期停留 needs-maintainer-review，社区耐心正在消耗；插件生态维度上暂未见 Hermes 级别的目录化贡献流。

## 4. 共同关注的技术方向

| 方向 | OpenClaw 证据 | Hermes Agent 证据 |
|---|---|---|
| **Memory 子系统治理与插件化** | #168692 recency decay 修复；#22438/#67419 bootstrap 分层加载（token 成本） | #135039 MEMORY.md 写入预算管道；holographic 出 core、qdrant/optchat 入目录，多提供方路由 |
| **更新/升级链路可靠性** | #167652 Windows 升级后 Gateway 挂起、#168650 更新后中断 turn 搁置 | #125437 更新失败无恢复路径（周 15 Discord 线程）、PR #136343 revision 偏斜门 |
| **长期运行资源管理** | #143524 WAL 膨胀至 2.8GB、#158390 tmp 目录泄漏、#97616 僵尸进程 | #132401 scratch 24h 静默删除（P0）、#131444 .git 7 小时写 180 GiB、#124794 fetch 进程树失控 |
| **无人值守/自动化工作流可靠性** | #40001 cron 覆盖共享文件、#55792 Gateway 重启丢入站消息 | #119070 kanban 卡死 blocker_auth、#131578 子代理事件路由错误 |
| **上下文/Token 成本优化** | #168401 服务端压缩 V2、#101929 预检估算高估 2.3–2.6 倍、#67419 bootstrap 重注入浪费 20–30% | #99943 上下文窗口被钳制 65k、#96247 tool_search 耗尽 130k 上下文、#110126 截断系统性治理 |

**结论**：记忆架构、更新可靠性、长期运行资源治理、token 经济学是全生态共同的下一阶段主题。

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多 agent 舰队 Gateway、多 IM 渠道（Telegram/微信/MS Teams/Matrix）、诊断体系、OpenAI 兼容 API | 桌面端体验（Desktop/macOS/Windows/Linux）、插件目录生态、子代理工作流（kanban/cron） |
| 目标用户画像 | 舰队运维者（数百 agent）、IM 长期个人助理用户、cron 自动化重度用户 | Desktop 普通用户（👍 投票参与）、国际社区贡献者、插件作者 |
| 技术架构 | 中心化 Gateway + 会话 actor 模型，正在做架构瘦身与简化 | gateway dispatcher + 插件化核心（memory 子系统退出 core），沙箱化 Desktop |
| 治理模式 | 维护者主导、XL 重构、诊断标签体系（clawsweeper/issue-rating） | CI-reviewed 目录提交自动化，社区贡献占比更高 |

## 6. 社区热度与成熟度

- **快速迭代 / 生态扩张阶段**：**Hermes Agent** —— 版本号仍在 0.21.x，插件目录单日 15+ 新提交、意大利语 9000+ key 语言包、日本国会检索等区域化工具涌现，社区贡献意愿旺盛但核心稳定性债务（更新链路 5 种失败机制、P0 数据删除）尚未偿还。
- **规模成熟 / 质量巩固阶段**：**OpenClaw** —— 用户基数与部署规模更大（632–773 agent 舰队场景），当前主题是“修稳定性 + 简化架构”双轨推进，处于从功能扩张转向质量巩固的过渡期。
- **共同隐忧**：两者都出现维护者/评审带宽瓶颈——OpenClaw 是 needs-maintainer-review 堆积，Hermes 是 333 条待合并 PR 积压与贡献者 API 权限被阻（#131859），均在抑制社区动能。

## 7. 值得关注的趋势信号

1. **“更新器可靠性”成为新的差异化战场**：两个项目的最高热度痛点均指向更新/安装链路（OpenClaw Windows 升级三连挂、Hermes 周均 15 个自救线程）。启示：智能体作为常驻软件，升级体验正取代功能成为留存关键，“产品内自愈恢复路径”将是下一版本标配。
2. **Memory 子系统从内置走向插件化 + 治理化**：Hermes 的多提供方路由与写入预算管道、OpenClaw 的分层 bootstrap，共同指向“记忆即可插拔基础设施 + 写入需预算验收”的架构共识。
3. **长期运行的资源纪律是 P0 高发区**：WAL 膨胀、静默删除、失控进程树、磁盘泄漏——智能体框架必须把“资源生命周期管理”当作一等公民设计（配额、隔离区、可观测日志），而非事后修补。
4. **无人值守工作流暴露状态机死角**：kanban 卡死、cron 覆盖文件、子代理事件错路由，说明“自驱 agent”场景对状态机健壮性和失败可恢复性的要求远超交互式场景。
5. **Token 经济学进入工程化阶段**：服务端压缩、bootstrap 重注入浪费 20–30%、上下文估算偏差 2.3 倍——上下文成本的可测量、可预算、可治理将成为智能体框架的核心竞争力指标。
6. **国际化与生态贡献自动化**：Hermes 的语言包与区域化工具浪潮表明，低门槛的目录化贡献通道（ci-reviewed）能有效吸纳长尾社区力量，值得所有框架借鉴；但需配套解决扫描器误判（#37036）与权限阻塞（#131859）等挫伤贡献者的摩擦。

**对开发者的建议**：选型上，面向大规模舰队部署与多 IM 渠道优先考虑 OpenClaw（但需规避 Windows/大仓库场景的当前版本风险）；面向桌面体验与快速生态集成可关注 Hermes Agent（但生产环境需为更新失败准备手动恢复预案并备份 agent 工作目录）。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-11

## 1. 今日速览

Hermes Agent 今日保持**极高活跃度**：24 小时内 Issues 更新 290 条（新开/活跃 262，关闭 28），PR 更新 500 条（待合并 333，合并/关闭 167）。无新版本发布。社区讨论焦点集中在**更新/安装链路的可靠性**（多个 P1/P2 回归）、**scratch 目录 24h 静默清理导致数据丢失**（P0）以及**插件目录（Plugin Catalog）的爆发式增长**——今日 PR 流中大部分为社区插件目录新增/升级提交。总体看，项目处于快速迭代与生态扩张期，但安装更新子系统的稳定性债务正在积累，值得维护者优先关注。

---

## 2. 版本发布

过去 24 小时无新 Release。注：插件目录中 `fish-audio` v1.3.2 已声明 `requires_hermes >=0.21.6`，暗示 **v0.21.6 可能在筹备中**（见 [PR #136004](https://github.com/NousResearch/hermes-agent/pull/136004)）。

---

## 3. 项目进展

今日 PR 更新 500 条，其中约 1/3（167 条）已合并/关闭，进展显著，主要体现在两条线：

**插件目录（Plugin Catalog）生态扩张**——绝大多数活跃 PR 为 ci-reviewed 目录提交：
- 新插件：[browser-toggle 桌面标题栏按钮](https://github.com/NousResearch/hermes-agent/pull/136163)、[Windows 任务栏角标 hermes-taskbar-badge](https://github.com/NousResearch/hermes-agent/pull/136249)、[意大利语语言包 hermes-lang-it（覆盖 9000+ UI key）](https://github.com/NousResearch/hermes-agent/pull/136279)、[日本国会会议检索 jp-kokkai](https://github.com/NousResearch/hermes-agent/pull/136078)、[Jet Browser 运行时校验器](https://github.com/NousResearch/hermes-agent/pull/135955)、[Model Router v0.4.1](https://github.com/NousResearch/hermes-agent/pull/136090)
- 记忆提供方生态动作密集：[holographic 记忆提供方退出 core 转社区维护（10 月 15 日生效）](https://github.com/NousResearch/hermes-agent/pull/136196)、[qdrant-memory](https://github.com/NousResearch/hermes-agent/pull/136024)、[optchat-memory](https://github.com/NousResearch/hermes-agent/pull/132907)——**核心 memory 子系统正在向插件化架构迁移**
- 存量插件升级：Gmail v1.0.16、web-search-plus 5.0.1、stream-speed 1.2.0、aux-ledger 1.2.0、kanban-gantt 1.5.0、field-notes 1.2.4 等

**核心修复**：
- [PR #136191](https://github.com/NousResearch/hermes-agent/pull/136191)（P1）：持久化流式断连时被中断的部分回复，修复 state.db 中文本缺失问题
- [PR #136343](https://github.com/NousResearch/hermes-agent/pull/136343)：gateway dispatcher tick 增加内容级 revision 偏斜门，防止升级重写后服务冻结在混合版本上——直接针对更新链路可靠性
- [PR #136341](https://github.com/NousResearch/hermes-agent/pull/136341)：维护者对 sweep 提交的 salvage 合并，体现维护流程在处理卡住的 draft PR

---

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#133992](https://github.com/NousResearch/hermes-agent/issues/133992)（已关闭，24 评论） | 🔥最高 | macOS Desktop 更新按钮触发的更新拒绝自己持有的锁（#78119/#87514 回归），exit code 2。已关闭说明已定位/修复，但回归性质值得复盘 |
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（23 评论，blocked） | 高 | 单一贡献者账号无法通过 API 向主仓库发 PR（CreatePullRequest 权限错误），fork 与 issue 创建正常——疑似权限/token 配置问题，影响外部贡献 |
| [#132401](https://github.com/NousResearch/hermes-agent/issues/132401)（20 评论，P0） | 高 | **最严重的用户痛点**：TMPDIR 指向的 scratch 目录 24h 空闲即静默删除，无日志、无隔离区、无保留标记，多天的 agent 工作成果被销毁 |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070)（14 评论） | 中 | kanban 卡片一次限流重试成功后被永久卡在 blocker_auth，reviewer 永不派生——影响自驱动工作流可靠性 |
| [#125437](https://github.com/NousResearch/hermes-agent/issues/125437)（13 评论，P1） | 中 | 痛点聚类报告：更新失败留下半成品安装且无产品内恢复路径，一周 15 个 Discord 线程、所有修复靠手打命令——**安装更新可靠性已成为用户流失级问题** |

**诉求分析**：社区热点高度集中于“**更新/安装链路**"（#133992、#125437、#124794、#131444、#134328 均属此类）与“**无人值守 agent 的状态机健壮性**"（#132401、#119070、#131578）。

---

## 5. Bug 与稳定性（按严重程度）

**P0**
- [#132401](https://github.com/NousResearch/hermes-agent/issues/132401) scratch prune 静默销毁 agent 工作产物（needs-decision，尚无 fix PR）

**P1**
- [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) 更新失败无恢复路径（5 种机制，15 Discord 线程/周）
- [#131055](https://github.com/NousResearch/hermes-agent/issues/131055) Linux Desktop 二次实例启动毒化沙箱回退标记 → 永久 --no-sandbox → 渲染器 SIGILL 循环
- [#131578](https://github.com/NousResearch/hermes-agent/issues/131578) 子代理后台进程完成事件错误重定向聊天路由，聊天卡死 30 分钟并丢失委派结果
- [#96247](https://github.com/NousResearch/hermes-agent/issues/96247) tool_search 失控循环：1,523 次调用耗尽 130k 上下文，无 cap 生效
- ✅ [PR #136191](https://github.com/NousResearch/hermes-agent/pull/136191) 已提交 fix，覆盖流式断连中断回复丢失

**P2（精选）**
- [#131444](https://github.com/NousResearch/hermes-agent/issues/131444)：Windows 上 .git 失控增长，7 小时写入 180 GiB / 332 个 packfile（与已合并的部分克隆缓解措施并存，疑似未根治）
- [#124794](https://github.com/NousResearch/hermes-agent/issues/124794)：git < 2.44 部分克隆下更新 fetch 递归进程树失控，8GB ARM 机器 swap 耗尽、负载 49
- [#99943](https://github.com/NousResearch/hermes-agent/issues/99943)：云提供商上下文窗口被 ollama_num_ctx 钳制，1M 静默降为 65,536（v0.21.0 引入的回归）
- [#127621](https://github.com/NousResearch/hermes-agent/issues/127621)：Desktop 回复偶尔渲染重复（👍 最多，7 赞）
- [#134328](https://github.com/NousResearch/hermes-agent/issues/134328)：macOS 更新后 dashboard 重启 argv 损坏
- [#132358](https://github.com/NousResearch/hermes-agent/issues/132358)：杀 PTY 后台进程因 setsid 后代挂起，永不回收

**安全**
- [#129426](https://github.com/NousResearch/hermes-agent/issues/129426)：npm audit 字段报告，多个新 advisory 超出既有整改目标（brace-expansion、undici、vitest、yaml）

**已关闭**
- [#133992](https://github.com/NousResearch/hermes-agent/issues/133992)（macOS 更新锁回归）与 [#104803](https://github.com/NousResearch/hermes-agent/issues/104803)（tool_call 数组参数嵌套错误序列化）今日关闭，是 28 条关闭 issue 中的亮点。

---

## 6. 功能请求与路线图信号

- **记忆系统架构演进**（信号最强）：core 侧 [#135039](https://github.com/NousResearch/hermes-agent/issues/135039)（MEMORY.md 写入时预算与验收管道）+ [#24770](https://github.com/NousResearch/hermes-agent/issues/24770)（多提供方路由，已确认单提供方限制为有意设计并标记 wontfix）+ PR 侧 holographic 出 core、qdrant/optchat 入目录 → **记忆子系统插件化 + 写入治理**是明确的下一阶段方向
- **cron 记忆策略**：[#105267](https://github.com/NousResearch/hermes-agent/issues/105267) 请求 per-job 记忆策略（off/tools/full），随 cron+memory 普及，采纳概率高
- **配置体验**：[#67347](https://github.com/NousResearch/hermes-agent/issues/67347) 子代理模型/提供方的引导式选择器（12 评论），属于低成本高感知改进
- **更新器自愈**：#125437 痛点聚类 + PR #136343 revision 偏斜门，指向“产品内恢复路径”将成为下版本主题
- **截断系统性治理**：[#110126](https://github.com/NousResearch/hermes-agent/issues/110126) 主张 finish_reason='length' 是横跨 4 个子系统的失败类（35+ issue），若被接受将推动一次集中治理

---

## 7. 用户反馈摘要

- **最强烈不满**：更新/安装失败后只能靠 Discord 上手打命令自救（#125437，一周 15 线程）——用户在意的不是 bug 本身，而是**没有产品内恢复路径**
- **信任受损**：scratch 静默删除（#132401）让用户对“把工作暂存在 agent 管理的目录里”失去信心；Windows 上 180 GiB 静默写入（#131444）同样引发对资源失控的担忧
- **重度用户场景**：kanban/cron 无人值守工作流的用户（#119070、#131578、#94455）反复报告状态机死角——这是 power user 群体的核心使用场景
- **正面信号**：插件目录提交踊跃（今日 15+ 目录 PR），多语言包（意大利语 9000+ key）、区域化工具（日本国会、日本政府法规）显示**国际社区贡献意愿旺盛**；#127621 获 7 👍 说明普通 Desktop 用户参与度也在上升

---

## 8. 待处理积压

- [#131859](https://github.com/NousResearch/hermes-agent/issues/131859)：贡献者 API PR 权限被阻（blocked），直接抑制外部贡献，建议优先排查
- [#99943](https://github.com/NousResearch/hermes-agent/issues/99943)：v0.21.0 引入的上下文窗口钳制回归，9 月 1 日开至今，影响云 provider 大窗口用户
- [#62169](https://github.com/NousResearch/hermes-agent/issues/62169)：CWD 被删后终端永久 exit 126，7 月 10 日开至今（3 个月+）
- [#37036](https://github.com/NousResearch/hermes-agent/issues/37036) / [#84672](https://github.com/NousResearch/hermes-agent/issues/84672)：安全扫描器（skills_guard / cron scanner）把安全文档误判为攻击，社区技能上架被阻，挫伤插件作者
- [#79357](https://github.com/NousResearch/hermes-agent/issues/79357)：gateway 模式下 idle 压缩永不触发（watchdog 覆盖时间戳），8 月 5 日至今
- [#96247](https://github.com/NousResearch/hermes-agent/issues/96247)：P1 tool_search 失控循环，8 月 27 日至今，成本影响大
- **PR 积压提示**：待合并 PR 达 333 条，其中大量为低风险 ci-reviewed 目录提交，建议批量处理以避免挫伤插件生态贡献者

---

**健康度小结**：Hermes Agent 呈现“生态繁荣、核心承压”的双面态势——插件目录国际化扩张势头强劲，但安装更新链路（P1 痛点聚类 + 多个回归）与数据安全（P0 scratch 删除）构成当前最大风险。建议维护者在下一版本前集中治理 update 子系统并尽快裁决 #132401。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*