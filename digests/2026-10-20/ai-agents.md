# OpenClaw 生态日报 2026-10-20

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-19 23:37 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报（2026-10-20）

## 1. 今日速览

过去 24 小时 OpenClaw 保持高度活跃：Issues 更新 500 条（新开/活跃 343，关闭 157），PR 更新 500 条（待合并 26，已合并/关闭 474），并发布 1 个 Beta 版本。社区讨论焦点集中在 **Gateway 启动/更新可靠性、插件源码捕获导致的性能与 SSD 磨损、以及消息投递丢失**三大主题。整体处于高频迭代周期，但 P0 级稳定性问题积压较多，维护者评审带宽明显不足（大量 issue 标记 `needs-maintainer-review`）。

## 2. 版本发布

**v2026.10.10-beta.2**（openclaw 2026.10.10-beta.2）

- **Fixes**：Workspace 安全性改进 —— 多文件 `apply_patch` 在后续更新目标缺失或上下文不匹配时，会在修改任何文件**之前**整体拒绝执行，保持工作区原状以便重试。Commit 时的 I/O 失败仍可能导致部分写入。
- 无破坏性变更或迁移要求说明；属于小步修复型 Beta。

## 3. 项目进展

今日 PR 侧以关闭/合并为主（474 条），代表性进展：

- **#91722 Refactor HTTP egress around external proxy enforcement**（关闭）：以更小的 HTTP egress 模型替换旧 SSRF fetch guard 架构，覆盖全部渠道与扩展；维护者认为方向正确但体量过大，建议拆分。
- **#81402 refactor: move runtime state to SQLite**（关闭）：将运行时状态从散落的 JSON/JSONL/锁文件迁移到类型化 SQLite 布局——这是多起 issue（如 WAL checkpoint 阻塞）相关的底层重构。
- **#93787 WhatsApp admission 对象迁移**（关闭）：完成 WhatsApp 入站消息向 `msg.admission` 规范包络的迁移。
- **#91291/#91293 工具 schema 快照与隔离**（关闭）：在运行时归一化/执行前快照会话与插件工具定义，隔离不可读 schema，增强健壮性。
- 今日新开的活跃 PR：**#177698**（授权消息加入活动执行，security-boundary 风险标注）、**#169534**（smol microVM 本地沙箱后端）、**#177827 / #177843**（steipete 提交的设备 E2E 修复与 Doctor 打包修复）。

## 4. 社区热点

| Issue | 评论 | 热点 |
|---|---|---|
| [#149361 WebUI 性能与稳定性 Umbrella](https://github.com/openclaw/openclaw/issues/149361) | 51 | 维护者汇总桌面/移动 WebUI 性能与稳定性问题索引 |
| [#160959 Gateway 捕获大型外部插件时阻塞数分钟](https://github.com/openclaw/openclaw/issues/160959) | 35 | P0，2026.9.6 回归，事件循环被插件捕获长时间阻塞 |
| [#148707 回复丢失 "no active tool authority snapshot"](https://github.com/openclaw/openclaw/issues/148707) | 22 | P1，同会话第二个 run 顶替在途 turn 导致消息永久丢失 |
| [#164294 状态库 WAL 自动 checkpoint 永不完成](https://github.com/openclaw/openclaw/issues/164294) | 21 | 17091 帧日志从未 checkpoint，被进程内读事务持续 pin |
| [#157989 插件捕获每次重写 GB 级数据致 SSD 磨损](https://github.com/openclaw/openclaw/issues/157989) | 20 | P1，Gateway 启动写 ~6.5 GB，社区高度关注硬件损耗 |

## 5. Bug 与稳定性（按严重度）

**P0**
- [#160959](https://github.com/openclaw/openclaw/issues/160959) Gateway 阻塞数分钟（crash-loop，2026.9.6 回归）— 无 fix PR
- [#161921](https://github.com/openclaw/openclaw/issues/161921) `doctor --fix` 与 `plugins update` 互相阻塞（release blocker）— 无 fix PR
- [#167406](https://github.com/openclaw/openclaw/issues/167406) Windows MSIX Codex 插件致主线程饥饿 — 无 fix PR
- [#157255](https://github.com/openclaw/openclaw/issues/157255) turn claim 超时后不释放，会话卡死 90+ 分钟 — 无 fix PR
- [#143334](https://github.com/openclaw/openclaw/issues/143334) 子代理完成投递丢失，请求方饿死 — 无 fix PR
- [#142821](https://github.com/openclaw/openclaw/issues/142821) 默认开启的脱敏污染重放上下文（安全，data-loss）— 有 linked PR open

**P1 精选**
- [#154812](https://github.com/openclaw/openclaw/issues/154812) Gateway RSS 失控至 9+ GiB 致 OOM
- [#159094](https://github.com/openclaw/openclaw/issues/159094) 状态生命周期租约竞争误报
- [#166894](https://github.com/openclaw/openclaw/issues/166894) / [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows 重启挂起 30 分钟–2 小时 / 更新不可靠
- [#148707](https://github.com/openclaw/openclaw/issues/148707)、[#158147](https://github.com/openclaw/openclaw/issues/158147)、[#156925](https://github.com/openclaw/openclaw/issues/156925) 多渠道消息丢失/重复渲染

> 绝大多数高优 issue 标注 `no-new-fix-pr`，修复供给明显落后于问题流入。

## 6. 功能请求与路线图信号

- [#59149 Per-agent agentToAgent / 会话可见性作用域](https://github.com/openclaw/openclaw/issues/59149)：多层级多代理部署的强需求，已有 linked PR，安全评审中——纳入下版本可能性较高。
- [#60572 Multi-Slot Memory Architecture](https://github.com/openclaw/openclaw/issues/60572)：多记忆槽并行，产品决策待定；与 #73342/#88465 的 memory-host 重构方向契合。
- [#139477 尊重 `tools.toolSearch` 于 bundle-MCP CLI 后端](https://github.com/openclaw/openclaw/issues/139477)：fix-shape 清晰，有 PR 关联。
- PR #169534（本地 microVM 沙箱）表明隔离后端是明确路线方向。

## 7. 用户反馈摘要

- **痛点集中区**：更新/迁移链路（`state-migrated-no-rollback`、systemd unit 不变、package-swap 失败）、Windows 平台可靠性与杀软误报（#139468）、插件捕获的 I/O 开销。
- **信任问题**：消息静默丢失（#128916、#87561“durable fallback delivery”诉求）是用户最不能接受的行为——宁可要明确的失败提示。
- **积极信号**：issue 质量高（环境信息、复现矩阵如 #164972），agent 代写的报告（#164799）被社区接受为正常工作流，社区深度参与诊断。

## 8. 待处理积压

- [#87744](https://github.com/openclaw/openclaw/issues/87744)（5 月起）Telegram Codex turn 永不到达 `turn/completed` — 长期无修复。
- [#87561](https://github.com/openclaw/openclaw/issues/87561) 跨渠道 durable 投递语义 — 产品决策悬置 5 个月。
- [#139215](https://github.com/openclaw/openclaw/issues/139215) Cron 静默丢触发 — stale 状态。
- [#114414 Dated TODO sweep](https://github.com/openclaw/openclaw/issues/114414)：多个 9 月到期 TODO 已逾期，建议纳入清理批次。
- 大量 `needs-maintainer-review` 的 P0/P1 issue 无 fix PR，建议优先处理与 2026.9.6 插件捕获回归相关的 #160959 / #157989（同一根因簇）。

**健康度评估**：活跃度 ⭐⭐⭐⭐⭐；稳定性修复吞吐 ⭐⭐（高优 bug 积压明显）；建议维护者优先收敛插件捕获回归簇与消息投递丢失两大问题域。

---

## 横向生态对比

# 开源 AI 智能体生态横向对比分析报告（2026-10-20）

*注：本期数据源覆盖 OpenClaw 与 Hermes Agent 两个项目，对比分析基于此二者。*

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**基础设施重构深水期**：头部项目均在向“统一网关 + 插件目录 + 分层信任”的架构范式收敛。项目活跃度极高（单日 Issues/PR 均达 400-500 条量级），但普遍面临“功能迭代速度 > 稳定性修复吞吐”的结构性矛盾——P0/P1 积压与维护者评审带宽不足是共同痛点。插件/MCP 生态快速扩张，信任分层（verified 层级、审批守卫）成为新的竞争焦点。

## 2. 活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 343，关闭 157） | 443（新开/活跃 398，关闭 45） |
| PR 更新（24h） | 500（待合并 26，合并/关闭 474） | 500（待合并 408，合并/关闭 92） |
| Release | v2026.10.10-beta.2（1 个 Beta） | 无 |
| P0 问题 | ≥6 个，多数无 fix PR | 1 个总统筹 issue，修复分批落地中 |
| 安全问题 | 1（脱敏污染，有 linked PR） | 2（审批绕过 + 数据丢失事故） |
| 活跃度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 修复吞吐 | ⭐⭐（`no-new-fix-pr` 大量堆积） | ⭐⭐⭐（post-merge 修复节奏稳定） |

**关键差异**：OpenClaw 的 PR 以关闭/合并为主（474 vs 26 待合并），但高优 bug 修复供给明显落后；Hermes 待合并 PR 高达 408 条，呈现“贡献涌入快于消化”的特征，但在统一网关修复上展现了更可控的分 package 推进纪律。

## 3. OpenClaw 的生态定位

**优势**：
- 发布节奏更快（当日仍有 Beta 产出），commit 级修复（如 apply_patch 原子性）持续落地；
- 社区诊断深度高——issue 附带复现矩阵（#164972），agent 代写报告已被接受为标准工作流；
- 架构演进前沿：SQLite 运行时状态迁移、microVM 本地沙箱（#169534）、A2A 作用域（#59149）均为方向性投入。

**劣势**：
- 6+ 个 P0 无 fix PR，2026.9.6 插件捕获回归簇（#160959/#157989）长期未收敛，且引发 SSD 磨损类硬件损耗投诉；
- 消息静默丢失（#128916/#87561）悬置 5 个月，直接侵蚀用户信任。

**技术路线差异**：OpenClaw 走“先广后稳”——多渠道投递（WhatsApp/Telegram）+ 安全边界（HTTP egress 重构、工具 schema 快照）；Hermes 走“网关中心化”——统一网关接管全部会话后集中收尾修复。OpenClaw 社区规模信号更强（单 issue 评论峰值 196 vs 51 量级均在但分布不同），但 Hermes 的插件目录 verified 分层（#141742）显示其生态治理更前置。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent |
|---|---|---|
| **更新可靠性** | #161921 更新互相阻塞、#170956 Windows 更新不可靠 | #107402 stale 警告、#132820 update 整体失败、#139091 merge-base 超时 |
| **消息投递/会话生命周期** | #143334 子代理投递丢失、#157255 turn claim 卡死 | #141778 承诺后自动 re-prompt、#141777 后台进程保活、#133057 cron 取消 |
| **审批/安全边界** | #142821 脱敏污染、PR #177698 security-boundary | #59293 config 绕过写保护、#141346 审批误放行致数据丢失 |
| **插件信任分层** | 插件 schema 快照与隔离（#91291） | verified 目录层级（#141742） |
| **长任务/后台任务管理** | Cron 静默丢触发 #139215 | #141777/#133057 同主题成组演进 |

**核心共识需求**：“宁可明确失败，不要静默丢失”——两个社区用户对投递语义的最强诉求完全一致。

## 5. 差异化定位

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道消息接入（WhatsApp/Telegram）、多代理部署作用域、本地沙箱隔离 | 桌面端体验（webapp、渲染器、通知）、插件目录生态、cron/长任务 |
| 目标用户 | 自托管、多渠道重度自动化用户 | 桌面为中心的个人助手用户 + 插件开发者 |
| 架构 | Gateway + 渠道扩展 + SQLite 状态层 | 统一网关单点接管 + multiplex profile |
| 生态策略 | 插件源码捕获（正引发性能争议） | 目录分层信任（official/community/verified） |

## 6. 社区热度与成熟度

- **快速迭代期**：OpenClaw——日均 issue/PR 流入极高，但 P0 积压表明尚处“扩张优先”阶段；
- **质量巩固期**：Hermes Agent——大重构已合入 main，当前主线是分 package 的 post-merge 修复（12/19 已落地），节奏可预测性更强；
- 两者共同风险：外部贡献通道摩擦（Hermes #131859 PR 创建权限 blocked）与维护者带宽（OpenClaw 大量 `needs-maintainer-review`）。

## 7. 值得关注的趋势信号

1. **投递语义成为信任分水岭**：durable delivery / 明确失败反馈（两项目共同最高诉求）将成为智能体框架的必备能力，而非可选项。
2. **插件信任分层化**：verified 层级 + schema 快照隔离，预示插件生态从“数量竞争”转向“治理竞争”。
3. **本地沙箱回归**：microVM 后端（OpenClaw #169534）+ smart approval 事故（Hermes #141346）共同指向：执行隔离将取代纯审批模型。
4. **运行时状态数据库化**：SQLite 状态迁移（OpenClaw #81402）与 WAL checkpoint 问题表明 JSON/文件式状态管理已达规模极限。
5. **Agent 参与自身开发流**：agent 代写 issue/PR 成为社区常态工作流，开发者工具链需为此优化（如 Hermes 的贡献权限问题即是新摩擦点）。

**对开发者的建议**：选型时优先评估消息投递保证与更新通道可靠性，而非功能清单；贡献者可关注两个项目的高优无 fix PR 缺口——这是当前生态中最稀缺也最有价值的贡献方向。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-20

## 1. 今日速览

Hermes Agent 今日保持高度活跃：过去 24 小时 Issues 更新 443 条（新开/活跃 398、关闭 45），PR 更新 500 条（待合并 408、合并/关闭 92），无新版本发布。项目当前的主线工作是统一网关运行时（#106742，已于 10-14 合入 main）的**合并后修复**，围绕 #134889 展开，今日 Package 3（#139161）已有 12/19 行修复落地 main，修复节奏稳定。社区贡献侧以插件目录（catalog）类 PR 为主，今日新增多个社区插件/MCP 条目，生态扩张势头明显。整体看，项目处于"大重构收尾 + 生态繁荣"阶段，但 P0/P1 级问题（网关会话状态、macOS 网关退出 75）仍需优先关注。

## 2. 版本发布

无（今日 0 个新 Release）。

## 3. 项目进展

今日合并/关闭 92 个 PR，重点包括：

- **网关修复 Package 3 持续落地**：#139161 报告 12/19 行已修复在 main（TUI-20/7、RT-13、TUI-4/3、RT-14/15、TUI-5、RT-8/20/2 等分批通过 #139483、#139884、#140595、#140473 合入），Package 10（#140719）已关闭。统一网关的 post-merge 收尾进度约过半。
- **#141765 修复 main 红**：针对 checkpoint/rollback/diff RPC 超时导致的 CI 红测（cc6b1f299bd），改为在调用方拒绝 registry gap 而非通过 PM worker——维护主干健康。
- **插件目录生态**：#141742 引入首批 `verified` 层级条目（NVIDIA App / NVIDIA Broadcast），#141746 配套文档更新；社区插件持续涌入（world-clock #141780、unicode-ref #141774、telesec #141648、RentAHuman #141775、ibara MCP #141773）。
- **值得关注的在途功能 PR**：#93508（`hermes webapp`：在浏览器中托管 Desktop 渲染器）、#141784（集成可拒绝 update）、#141778（最终回复承诺无人触发的 follow-up 时自动 re-prompt）、#141777（后台进程通知期间保持 detached 会话存活）。

## 4. 社区热点

- **[#134889](https://github.com/NousResearch/hermes-agent/issues/134889)**（196 评论，P0）：统一网关 post-merge 修复的总统筹 issue，是当前社区注意力绝对中心，分 package 推进中。
- **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)**（46 评论）：贡献者 @kuehnberger 无法通过 API 创建 PR（`CreatePullRequest` 权限错误），被标记 blocked/upstream，影响外部贡献流程。
- **[#107402](https://github.com/NousResearch/hermes-agent/issues/107402)**（27 评论）：`hermes update` 在重启被延迟时留下永久的 stale 警告，更新体验痛点。
- **[#59293](https://github.com/NousResearch/hermes-agent/issues/59293)**（25 评论，security）：`hermes config set` 绕过系统配置写保护，可无门禁关闭审批层——安全边界问题的典型诉求。
- **[#127621](https://github.com/NousResearch/hermes-agent/issues/127621)**（12 评论，👍8）：桌面端回复偶发重复渲染，是桌面端体验类反馈中 👍 最多的。

## 5. Bug 与稳定性

按严重程度排列：

| 级别 | Issue | 说明 | Fix 状态 |
|---|---|---|---|
| P0 | [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) | 一个网关接管全部本地会话，post-merge 修复推进中 | 部分 PR 已合入（#139483/#139884/#140595/#140473） |
| P1 | [#137838](https://github.com/NousResearch/hermes-agent/issues/137838) | macOS 网关漏活度探测后反复 exit 75，根因未定 | 无 fix PR |
| P1 | [#139029](https://github.com/NousResearch/hermes-agent/issues/139029) | Kanban managed worker 死于 `WorkerPersistenceError: synchronous_rpc_on_event_loop` | 无明确 fix PR |
| P1 | [#132820](https://github.com/NousResearch/hermes-agent/issues/132820) | `matrix` extra 的 libolm 原生构建导致 Linux 上 `hermes update` 整体失败且无法退出（本周 7 起报告） | 无 fix PR |
| P2 | [#141133](https://github.com/NousResearch/hermes-agent/issues/141133) | 多路复用主机上 `gateway stop` 误停 host 网关，所有 served profile 掉线 | 无 |
| P2 | [#131375](https://github.com/NousResearch/hermes-agent/issues/131375) | smart-approval guardian 在事件循环线程崩溃，所有标记命令均升级审批 | 无 |
| P2 | [#129993](https://github.com/NousResearch/hermes-agent/issues/129993) / [#127621](https://github.com/NousResearch/hermes-agent/issues/127621) | 桌面端回复双重渲染（持久层正常，渲染层 bug） | 无 |
| P2 | [#79357](https://github.com/NousResearch/hermes-agent/issues/79357) | 网关模式下 `idle_compact_after_seconds` 永不触发（watchdog 重置时间戳） | 无 |
| P2 | [#138915](https://github.com/NousResearch/hermes-agent/issues/138915) | Dashboard 批量操作在网关持有 state.db 时一律 409 | 无 |
| P2 | [#139091](https://github.com/NousResearch/hermes-agent/issues/139091) | 稳定版更新的 merge-base 探测 10s 超时 | 无 |
| P3 | [#123926](https://github.com/NousResearch/hermes-agent/issues/123926) | 插件启动时随机子集静默加载失败 | 无 |
| Security | [#141346](https://github.com/NousResearch/hermes-agent/issues/141346)（今日新报） | smart 审批自动放行 osascript 命令导致用户未保存 PPT 丢失（不可恢复数据损失） | 无，需优先处理 |
| Security | [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | `config set` 绕过审批层写保护 | 无 |

## 6. 功能请求与路线图信号

- **#67347**：Desktop/Dashboard 中 subagent model + provider 的引导式选择器（替代裸文本框）——桌面设置 UX 改进方向明确，尚无 PR。
- **#133057**：`hermes cron cancel` 按需终止在途 cron 任务——与 #141777（后台进程保活会话）同属"长任务生命周期管理"主题，可能形成一组能力。
- **#58414**：Desktop 中暴露 MCP/skills 重载控件——配套 #93508 webapp PR 也在推进桌面能力外溢，方向一致。
- **#87473**（👍5）：桌面通知音量独立控制，小而高频的 UX 需求。
- 生态信号：`verified` 目录层级（#141742）正式启动，预示插件目录将从 official/community 二元结构走向分层信任体系。

## 7. 用户反馈摘要

- **网关化阵痛明显**：多数高热度 issue（会话重复渲染、消息不投递 #76767、multiplex 误停 #141133）都与统一网关重构后的状态归属变化相关；用户认可架构方向但对碎片化回归感到疲劳。
- **更新通道体验是持续痛点**：`hermes update` 相关 issue 密集（#107402、#132820、#139091、#58746 已关闭），诉求集中在"稳定就该真的稳定"。
- **审批/安全信任问题**：#141346（数据丢失）与 #59293（绕过保护）显示 smart approval 的信任模型尚未让用户放心。
- **生态热情高**：目录 PR 涌入（world-clock、unicode-ref、telesec 等）说明插件开发者社区活跃、贡献门槛友好。

## 8. 待处理积压

- **#37298**（6 月开，P2）：Bedrock Converse 传输默认 `max_tokens=4096` 截断长生成——4 个多月未修，AWS 用户持续受影响。
- **#113094**（9 月中旬，P3）：OTP 分格输入框识别失败。
- **#131859**：贡献者 PR 创建权限问题标记 blocked/upstream，建议维护者跟进平台侧排查。
- **#137838 / #139029**（P1，均无 fix PR）：macOS 网关 exit 75 与事件循环同步 RPC 崩溃，影响生产稳定性，建议优先排期。
- **#59293 / #141346**（security）：审批层安全缺口 + 数据丢失事故，建议尽快给出 needs-decision 结论。

---
*数据来源：GitHub API（Issues 443 条、PRs 500 条，统计窗口 2026-10-19 ~ 2026-10-20）。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*