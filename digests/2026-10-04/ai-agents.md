# OpenClaw 生态日报 2026-10-04

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-03 23:01 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-10-04

## 1. 今日速览

OpenClaw 过去 24 小时保持极高活跃度：Issues 更新 500 条（新开/活跃 347，关闭 153），PR 更新 500 条（待合并 303，已合并/关闭 197），并发布了新版本 **v2026.9.8**（58 commits / 43 PR / 21 位贡献者）。项目推进以 **SQLite/状态库性能治理、Gateway 关停可靠性、更新链路修复** 为三条主线，社区核心贡献者 @steipete 单日提交了多个 XL 级重构与修复 PR。但 P0 级问题积压明显，尤其 v2026.9.8 发布当天即被报告托管更新仍会回滚（#164066），升级可靠性仍是最大风险面。

## 2. 版本发布

### v2026.9.8（openclaw 2026.9.8）
- 规模：**58 commits · 43 pull requests · 21 contributors**
- Release notes: https://docs.openclaw.ai/releases/2026.9（发布于 2026-10-03，stable/latest 通道）

**⚠️ 发布后已知问题（升级前必读）：**
- [#164066](https://github.com/openclaw/openclaw/issues/164066) [P0] 报告 2026.9.5 → 2026.9.8 的托管更新仍会回滚：激活阶段 Doctor 拒绝并报 "undergoing offline maintenance"。修复 PR **#160671 和 #163803 只合入了 main，未包含在 9.8 中**。建议 2026.9.3–9.5 用户暂缓自动更新，等待 9.9 或补丁版。

**迁移注意事项：**
- [#163592](https://github.com/openclaw/openclaw/pull/163592) 正在迁移历史压缩（compaction）状态元数据至新格式，涉及 `v2026.7.1` / `v2026.9.3` 持久化的旧 checkpoint 结构，需 Doctor 备份转换。

## 3. 项目进展

今日合入/关闭的关键 PR（按主题归类）：

**更新与恢复可靠性**
- [#164578](https://github.com/openclaw/openclaw/pull/164578)（已关闭）插件 SDK 导出校验提速：wall time −70.5%、CPU −68.5%，显著缩短 CI 周期。
- [#164595](https://github.com/openclaw/openclaw/pull/164595)（已关闭）修复发布流程中 publication/source 溯源契约破坏问题。
- [#163201](https://github.com/openclaw/openclaw/pull/163201)（已关闭）TUI 断连时保留未发送的 `/` 前缀草稿。

**性能与状态层治理（待合并，量大）**
- [#164490](https://github.com/openclaw/openclaw/pull/164490) schema 事实随 DB handle 携带，消除每调用重复探测——直接回应 #160386 SQLite I/O 压力问题。
- [#164424](https://github.com/openclaw/openclaw/pull/164424)、[#164484](https://github.com/openclaw/openclaw/pull/164484)、[#164588](https://github.com/openclaw/openclaw/pull/164588) 持续将 Gateway 主线程 SQLite 写入迁移至 worker，系统性解决 #119720 事件循环阻塞。

**高优先修复（ready for maintainer look）**
- [#164594](https://github.com/openclaw/openclaw/pull/164594) [P1] 修复后台任务在非 agent 工作区启动时 Gateway 卡死数秒至数分钟。
- [#163863](https://github.com/openclaw/openclaw/pull/163863) [P1] 修复 CPU 高负载下 Telegram 相册被拆成多条回复（含 telegram-e2e 证明）。
- [#164509](https://github.com/openclaw/openclaw/pull/164509) [P0] Doctor 隔离损坏的 agent 删除日志而非阻塞更新，解决 #164316。

**功能与体验**
- [#164086](https://github.com/openclaw/openclaw/pull/164086) Code Mode 值跨 cell/reply/重启持久化。
- [#164576](https://github.com/openclaw/openclaw/pull/164576) Control UI 内联播放 YouTube 视频。
- [#164265](https://github.com/openclaw/openclaw/pull/164265) [XL] 将 heartbeat 退役为普通 Automations 任务，统一调度模型。

整体看，项目正进行一轮大规模“deslop”架构清理（#164320、#164286、#164590），状态层写入全面 worker 化，工程健康度投入显著。

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) [P0] Agent SQLite WAL 无限增长至 2.8 GB，阻塞 Gateway 启动 | 105 评论 | Windows 长期运行用户的存储/稳定性痛点，`wal_autocheckpoint=1000` 失效，已阻塞数周未出 fix PR |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) [P1] 同步持久化阻塞 Gateway 事件循环 | 22 评论 | 大规模部署用户的核心性能诉求；部分修复已落地（#140231、#138984），今天多个 worker 化 PR 与之呼应 |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) [已关闭] 混合终端 settle 批次永久重试 | 21 评论 | 子代理结果丢失类问题，已修复关闭 |
| [#139710](https://github.com/openclaw/openclaw/issues/139710) [P1] 插件热重载中途 supersede 杀死系统 agent 回合，且错误提示误导 | 20 评论 | 错误信息指向 "openclaw onboard"，掩盖真实根因，用户排障成本高 |
| [#159612](https://github.com/openclaw/openclaw/issues/159612) [P0] 子代理结算无限重试并每回合重注入结果 | 14 评论 | 需要产品决策，标签含 needs-product-decision |
| [#164394](https://github.com/openclaw/openclaw/issues/164394) WebChat 长历史滚动抖动 | 9 评论（10-03 当日新开） | Control UI 长会话体验问题，新报告 |

**背后诉求主线**：长期 7×24 运行的个人助理网关，用户最在意**存储不失控、关停可预期、子代理消息不丢**三件事。

## 5. Bug 与稳定性（按严重程度）

**P0 / Release Blocker**
1. [#164066](https://github.com/openclaw/openclaw/issues/164066) 2026.9.8 托管更新仍回滚 — **修复已在 main（#160671、#163803）但未进 9.8**，需尽快出补丁版。
2. [#143524](https://github.com/openclaw/openclaw/issues/143524) SQLite WAL 无限增长阻塞启动 — **无 fix PR**，105 评论，最严重的存量 P0。
3. [#154812](https://github.com/openclaw/openclaw/issues/154812) Gateway RSS 失控（9.32 GiB，V8 堆外）致宿主 OOM — 无 fix PR。
4. [#160386](https://github.com/openclaw/openclaw/issues/160386) 2026.9.6 回归：大会话库引发 SQLite I/O 压力 + WebUI RPC 超时 — 与 #164490 性能 PR 方向吻合，**间接修复中**。
5. [#158126](https://github.com/openclaw/openclaw/issues/158126) Gateway 关停在 gateway-server-close 步骤 ~50% 概率失败 exit 1 — 相关配置化 PR [#164592](https://github.com/openclaw/openclaw/pull/164592) 开放中。
6. [#148307](https://github.com/openclaw/openclaw/issues/148307) 会话回收超 5s busy timeout 导致 "database is locked" — 无 fix PR。
7. [#121617](https://github.com/openclaw/openclaw/issues/121617) 压缩保护误判 "nothing to compact" 为终态失败 — 有 linked PR open。
8. [#153521](https://github.com/openclaw/openclaw/issues/153521) 全局安装更新失败（2026.9.3）— needs-info，长期未推进。

**P1 重点**
- [#161953](https://github.com/openclaw/openclaw/issues/161953)（已关闭）Windows `sessions.create` 100% 失败 — 已修复，Windows 用户可关注回归。
- [#162031](https://github.com/openclaw/openclaw/issues/162031)（已关闭）2026.9.7 工具组装 crash-loop — 已修复关闭。
- [#161379](https://github.com/openclaw/openclaw/issues/161379) 模型目录刷新循环占满一核 CPU（OpenAI live catalog TTL 60s < 刷新耗时）。
- [#162119](https://github.com/openclaw/openclaw/issues/162119) Codex 模型切换后间歇性 403 owner 校验失败（含安全影响标签）。
- [#161976](https://github.com/openclaw/openclaw/issues/161976) WhatsApp DM 回复在重启后 registry 交接处反复投递失败。
- [#97616](https://github.com/openclaw/openclaw/issues/97616) hook/tool 子进程僵尸累积（存量 3 个月）。

**安全相关**
- [#157126](https://github.com/openclaw/openclaw/issues/157126) claude-cli MCP 桥继承首次启动它的请求作用域，重启恢复后 owner 回合丢失 operator.admin。
- [#142922](https://github.com/openclaw/openclaw/issues/142922) 系统代理委托丢失 active run authority。

## 6. 功能请求与路线图信号

- **Cron/调度统一**：[#120244](https://github.com/openclaw/openclaw/issues/120244)（RFC：cron 维护窗口 + 角色隔离）与 PR [#164265](https://github.com/openclaw/openclaw/pull/164265)（heartbeat 退役为普通 jobs）同向，**很可能进入下一版本**。
- **可观测性**：[#81595](https://github.com/openclaw/openclaw/issues/81595)（bundle-tools 内 per-MCP-server sub-span）配合 PR [#163995](https://github.com/openclaw/openclaw/pull/163995)（Control UI 展示 worker 生命周期与遥测），可观测性是明确的路线图方向。
- **安全增强**：[#67440](https://github.com/openclaw/openclaw/issues/67440) exec 审批增加可选 TOTP——长期开放，尚无对应 PR，但与近期 security-sensitive PR 密集的趋势契合。
- **身份体系**：iOS/Tailscale 个人身份（[#163765](https://github.com/openclaw/openclaw/pull/163765)、[#164593](https://github.com/openclaw/openclaw/pull/164593)）围绕 #162164 "native identity umbrella" 展开，是多客户端一致身份的明确路线。
- **内存/记忆**：[#150635](https://github.com/openclaw/openclaw/issues/150635)（短期记忆召回夜间全量驱逐，dreaming deep 阶段无法晋升）和 [#101422](https://github.com/openclaw/openclaw/issues/101422)（可配置召回排除路径）反映记忆子系统仍需产品决策。

## 7. 用户反馈摘要

**痛点（高频出现）**
- **大库用户被系统性忽视感**：WAL 膨胀、integrity_check 重复执行（#118885）、database is locked（#148307）集中反映多 GB 状态库下的性能塌方。
- **升级焦虑**：2026.9.3–9.8 连续多个版本出现更新回滚/迁移失败（#145252、#153521、#164066），部分用户停留在旧版不敢升级；`openclaw update status` 不提示插件兼容性与不可逆迁移风险（#122019）加剧了这一点。
- **错误信息误导**：#139710、#120600（AGENTS.md 静默丢失但报告已投递）显示用户排障时被系统提示带偏。
- **消息丢失类**（子代理结算、NO_REPLY 重试、WhatsApp 投递）是情感上最不被容忍的缺陷类别。

**满意点**
- Doctor 工具与 update-report 自动化提交（#153521）降低了报告门槛，用户报告质量普遍很高（带版本、平台、复现）。
- @steipete 的高频高质量 PR 与 telegram-e2e 证明流程获得社区认可。

## 8. 待处理积压（请维护者关注）

| 条目 | 状态 | 建议 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) WAL 无限增长（105 评论，P0） | 自 09-09 无 fix PR | 最高优先排期，Windows 用户受影响最重 |
| [#154812](https://github.com/openclaw/openclaw/issues/154812) Gateway OOM（P0，stable 标记） | needs-info | 与 #157575 堆配置问题可能同源，建议合并调查 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) 僵尸进程泄漏（06-29 起） | 3 个月未修 | 长期运行用户的慢性退化源 |
| [#110190](https://github.com/openclaw/openclaw/issues/110190) 运行时上下文 carrier 位置致模型混乱（7 月起） | needs-product-decision | 涉及 token 成本，建议尽快给产品结论 |
| [#121953](https://github.com/openclaw/openclaw/issues/121953) DeepSeek 对 `[cron:` 前缀降级 | needs-live-repro | 影响中国区模型用户的定时任务可用性 |
| [#81182](https://github.com/openclaw/openclaw/issues/81182) 溢出恢复等满 900s 超时（5 月起） | linked PR open | PR 长期未合并，请复核 |
| [#164066](https://github.com/openclaw/openclaw/issues/164066) 9.8 更新回滚 | 当日新开 | **建议尽快发布 9.8.1 并 backport #160671/#163803** |

---
*数据来源：OpenClaw GitHub Issues/PR/Releases（统计窗口 2026-10-03 至 10-04）。500 条上限截断意味着实际活动量可能更高。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比报告
**数据窗口：2026-10-03 至 2026-10-04**

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道已进入“基础设施化”阶段：两大头部项目（OpenClaw、Hermes Agent）日均 Issues/PR 更新量均触及 500 条统计上限，实际活跃度可能更高。竞争焦点已从功能堆叠转向**可靠性工程**——更新链路、状态库性能、消息不丢成为最集中的工程投入方向。两个项目都呈现“个人 7×24 助理网关 + 多客户端 + 插件生态”的趋同架构，同时都暴露出快速迭代带来的 P0 积压与升级信任危机。插件化/核心瘦身是双方共同的平台化策略信号。

---

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 347，关闭 153） | 500（新开/活跃 365，关闭 135） |
| PR 更新（24h） | 500（待合并 303，合并/关闭 197） | 500（待合并 402，合并/关闭 98） |
| Release | **v2026.9.8**（58 commits / 43 PR / 21 贡献者） | 无 |
| 关闭率（Issue） | ~30%（153/500） | ~27%（135/500） |
| PR 合并/关闭比 | ~39%（197/500） | ~20%（98/500） |
| P0 存量 | **8+ 条**（含 105 评论的 WAL 膨胀） | 1 条（scratch 静默清理销毁数据） |
| 健康度评估 | ⚠️ 发布节奏快但质量失守：新版本当天即被报 P0 回滚；deslop 治理力度大 | ⚠️ 改造方向正确（updater 崩溃安全链）但评审吞吐不足，402 条 PR 积压 + 24/30 高危漏洞未回应 |

**结论**：两者活跃度同级且可能都被 500 条上限截断；OpenClaw 治理重心在“性能与架构清理”，Hermes 重心在“安装更新可靠性重构”。

---

## 3. OpenClaw 在生态中的定位

**优势**
- **发布节奏与贡献者规模领先**：单版本 21 位贡献者、43 PR，工程吞吐显著高于 Hermes 的评审吞吐（402 待合并 PR 挂起，最长近 4 个月）。
- **核心贡献者驱动力强**：@steipete 单日多个 XL 级 PR + telegram-e2e 证明流程，社区认可度高，用户报告质量（带版本/平台/复现）成为正反馈。
- **系统化架构治理**：SQLite 写入全面 worker 化、schema 事实随 DB handle 携带、heartbeat 统一进调度模型，这是对长期运行网关根本痛点的正解。

**技术路线差异**
- OpenClaw 重心在**状态层与调度内核**（SQLite WAL、compaction 迁移、Gateway 事件循环），面向大规模/大库部署的可靠性。
- Hermes 重心在**安装更新与多 Agent 互联**（updater 崩溃安全、跨网关 Bot 协作、通用 ACP client），更早布局 Agent-to-Agent 生态。

**风险面**：OpenClaw 的升级可靠性（9.3–9.8 连续多版本更新回滚）正在消耗用户信任，部分用户停留旧版不敢升级——这是其相对 Hermes 最需要弥补的短板，且 Hermes 正好在同日系统性重构 updater。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw 证据 | Hermes 证据 |
|---|---|---|
| **更新/升级链路可靠性** | #164066（9.8 更新回滚，P0）、#153521、#145252 | @teknium1 四连 PR 崩溃安全提交点、E2E 门禁（#132361/132365/132386/132346） |
| **数据/消息不丢失** | #159612 子代理结算无限重试、#137332、WhatsApp 投递 | #132401 scratch 静默销毁（P0）、#68321 “DB 完好但 UI 不可信” |
| **插件化/核心瘦身** | 插件 SDK 校验提速（#164578） | Home Assistant 出核转 catalog 插件（#132469） |
| **调度统一（cron/jobs）** | #164265 heartbeat 退役为 Automations 任务、#120244 RFC | cron 外部 worker 修复（#122222 已关闭） |
| **安全加固** | TOTP 审批（#67440）、owner 回合权限丢失（#157126、#142922） | SSRF 修复（#128117）、但高危漏洞堆积（#107356）未回应 |
| **慢速/本地模型兼容** | DeepSeek 降级（#121953） | 45s watchdog 误报（#125306）、Ollama 上下文钳制（#99943） |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 状态库/调度内核、Control UI、记忆子系统（dreaming/recall） | 桌面端 SDK、跨网关 Bot 协作、ACP 编排、Home Assistant 等家庭集成 |
| 目标用户 | 长期 7×24 运行的重度网关用户（含 Windows）、大规模部署 | 自托管/自管安装用户、本地模型（vLLM/Ollama）用户、桌面优先用户 |
| 架构关键差异 | Gateway 主进程 + worker 化 SQLite 写入 + Doctor 自愈工具链 | shell-installer/PM 安装路径 + 插件 catalog + 多平台桥（Matrix/WhatsApp/Telegram） |
| 路线图主题 | native identity umbrella（多客户端身份统一）、可观测性 sub-span | “Hermes Bots 互联”（跨所有者协作），可能构成下一大版本 |

**关键互补信号**：OpenClaw 的痛点（升级可靠性）恰是 Hermes 当日的工程主线；Hermes 的痛点（渲染信任、依赖清洗）恰是 OpenClaw 的相对强项（e2e 证明流程、Doctor 自动化）。

---

## 6. 社区热度与成熟度分层

- **快速迭代期（OpenClaw）**：日均 347 条新开/活跃 Issue、单日 58 commits 版本发布，deslop 大清理 + 状态层 worker 化显示处于架构重塑期。但 P0 存量 8+ 条、#143524（105 评论）数周无 fix PR，说明迭代速度已超过质量收口能力。
- **质量巩固期（Hermes）**：无版本发布，维护者密集提交堆叠式重构 PR 并配 E2E 门禁，典型的“先修地基再发版”节奏；但 402 条 PR 积压与高危漏洞沉默是治理债务。
- **共同成熟度信号**：两边用户报告均带完整复现与版本信息，且出现贡献者主动 fork 修复（Hermes #131859），说明社区已越过尝鲜期，进入深度依赖生产化阶段。

---

## 7. 值得关注的趋势信号

1. **“可升级性”成为个人 Agent 的第一竞争力**。两项目同日均在更新链路上投入最高密度工程资源——用户“停留旧版不敢升级”直接决定留存。对开发者的启示：更新器需要崩溃安全设计 + 真实 E2E 门禁，而非事后热修。
2. **状态层（SQLite）是 7×24 Agent 的阿喀琉斯之踵**。WAL 无限增长、database is locked、事件循环阻塞等系统性问题在 OpenClaw 集中爆发，写入 worker 化是行业正解方向，值得所有本地 Agent 框架提前设计。
3. **Agent-to-Agent 协作是下一个平台级叙事**。Hermes 的跨网关 Bot 协作 + 通用 ACP client 呼声最高；OpenClaw 的 identity umbrella 也在为多客户端身份铺路。多 Agent 互联协议与权限模型将成为差异化高地。
4. **消息/数据不丢是情感红线**。两侧最激烈的用户反弹均来自静默数据丢失（scratch 清理、子代理结算重试），可靠性优先级应高于新功能。
5. **慢速/本地模型用户是被系统性忽视的群体**（Hermes 两例 + OpenClaw DeepSeek 案例），针对自托管模型的超时/配置假设是一个明确的差异化机会。
6. **安全债务与“Agent 持有凭证”定位的冲突**正在放大（Hermes 24/30 高危漏洞、OpenClaw owner 权限丢失类 issue），凭证作用域隔离与审批强化（如 TOTP）预计将进入双方路线图。

---
*数据局限：两项目均触及 500 条统计上限，实际活动量被截断；对比结论以结构与方向性判断为主，绝对数值仅供参考。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-04

## 1. 今日速览

Hermes Agent 过去 24 小时保持高度活跃：Issues 更新 500 条（新开/活跃 365，关闭 135），PR 更新 500 条（待合并 402，已合并/关闭 98），无新版本发布。社区讨论焦点集中在**桌面端会话渲染缺陷**（重复气泡、消息消失）与**自管安装/更新器的可靠性**两大主题；维护者（@teknium1 等）当日密集提交了一整套 updater 崩溃安全改造 PR 链，显示安装更新方向正在系统性重构。整体健康度良好，但待合并 PR 数量（402）偏大，评审吞吐存在压力。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日无明确记录的合并 PR，但多条高优先级修复 PR 处于活跃推进状态，构成清晰的工作主线：

- **Updater 崩溃安全系列（@teknium1）**——同日提交四个堆叠 PR：
  - [#132361](https://github.com/NousResearch/hermes-agent/pull/132361) git/ZIP 代码交换改为单一崩溃安全提交点
  - [#132365](https://github.com/NousResearch/hermes-agent/pull/132365) 更新标记 v2 + 整树 checkout 锁
  - [#132386](https://github.com/NousResearch/hermes-agent/pull/132386) 提交点之后 `hermes update` 不再失败（契约 C3）
  - [#132378](https://github.com/NousResearch/hermes-agent/pull/132378) 修复 partial clone 停靠分支检查导致的 180 GiB pack 失控（#131444）
- **架构瘦身**：[#132469](https://github.com/NousResearch/hermes-agent/pull/132469) 将 Home Assistant 移出核心，转为 catalog 插件并为存量 profile 自动安装——插件化拆分持续进行。
- **安全修复**：[#128117](https://github.com/NousResearch/hermes-agent/pull/128117) 将 cron `monitor_url`（模型可控输入）纳入 SSRF/website policy，修复网关主机侧任意 URL 裸抓取漏洞。
- **质量基建**：[#132346](https://github.com/NousResearch/hermes-agent/pull/132346) 为所有 updater 改动强制 real-update E2E 门禁 + Windows 崩溃注入；[#131955](https://github.com/NousResearch/hermes-agent/pull/131955) 扩大 e2e lane 触发范围。

## 4. 社区热点

- **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)（35 评论）跨网关 Bot 协作**：个人 Agent 跨机器/跨所有者协作的地基设计，是社区最关注的路线图级功能。
- **[#5257](https://github.com/NousResearch/hermes-agent/issues/5257)（24 评论，26 👍）通用 ACP 客户端**：将 ACP client 从 Copilot 专用泛化为可编排 Claude Code 等任意 ACP 兼容编码 Agent，呼声最高。
- **[#122222](https://github.com/NousResearch/hermes-agent/issues/122222)（33 评论，已关闭）cron 外部 worker 依赖导入失败**：自管安装上所有定时任务在 ownership ack 前失败，属高影响兼容性问题，已关闭（应有修复落地）。
- **[#132401](https://github.com/NousResearch/hermes-agent/issues/132401)（P0）scratch 目录 24h 静默清理销毁多日 Agent 工作成果**——无日志、无隔离、无 keep 标记，数据丢失风险引发激烈讨论。
- **[#38519](https://github.com/NousResearch/hermes-agent/issues/38519)（16 👍）桌面端仅装前端连远端 gateway** 的诉求持续升温。

## 5. Bug 与稳定性（按严重程度）

| 级别 | 问题 | 状态 |
|---|---|---|
| **P0** | [#132401](https://github.com/NousResearch/hermes-agent/issues/132401) scratch prune 静默销毁 TMPDIR 指向的多日工作 | OPEN，needs-decision，暂无 fix PR |
| **P1** | [#123347](https://github.com/NousResearch/hermes-agent/issues/123347)（已关闭）Group Chat worker 启动 `_DeadlockError` | CLOSED |
| **P1** | [#125306](https://github.com/NousResearch/hermes-agent/issues/125306)（已关闭）45s 静默 watchdog 对慢速/自托管模型误报"回复被截断"，Retry 可重复提交 prompt | CLOSED |
| **P1** | [#122490](https://github.com/NousResearch/hermes-agent/issues/122490) bot-to-bot DM runner 缺第三方依赖（ruamel）致投递全败 | OPEN，与 #122222 同根因（环境清洗过度），修复方向应一致 |
| **P2** | [#129993](https://github.com/NousResearch/hermes-agent/issues/129993) / [#128468](https://github.com/NousResearch/hermes-agent/issues/128468) / [#123801](https://github.com/NousResearch/hermes-agent/issues/123801)（已关闭）桌面端重复渲染助手回复/滚动跳动簇 | 多个相关 issue 已关闭，渲染管线修复在收敛，但仍有新报 |
| **P2** | [#101007](https://github.com/NousResearch/hermes-agent/issues/101007) MCP `lazy` 配置因 `ttl_ms: 0` 永不生效 | OPEN，无 fix PR |
| **P2** | [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) 云端 provider 上下文窗口被 `ollama_num_ctx` 钳制（1M → 65K 静默丢失） | OPEN |
| **P2** | [#122402](https://github.com/NousResearch/hermes-agent/issues/122402) Ubuntu Matrix 加密依赖 python-olm 源码构建失败（缺 clang++） | OPEN |
| **P2** | [#122425](https://github.com/NousResearch/hermes-agent/issues/122425) 托管环境 workspace 拷贝跨更新漂移、缺安装元数据 | OPEN |
| **P3** | [#107356](https://github.com/NousResearch/hermes-agent/issues/107356) npm 依赖审计：24/30 高危漏洞持续堆积 | OPEN，长期未处理，见 §8 |
| **P3** | [#123926](https://github.com/NousResearch/hermes-agent/issues/123926) 启动时 `_evict_modules` 遍历 `sys.modules` 致插件随机静默丢失 | OPEN |

## 6. 功能请求与路线图信号

- **多 Agent 协作**是明确方向：#97681（跨网关 Bot 协作）+ #5257（通用 ACP client）+ #122490（bot-to-bot DM，虽为 bug 但属协作基础设施）共同指向"Hermes Bots 互联"路线，可能构成下一大版本主题。
- **桌面体验打磨**：[#132491](https://github.com/NousResearch/hermes-agent/pull/132491)（侧栏边缘悬停偏好）、[#106732](https://github.com/NousResearch/hermes-agent/pull/106732)（SDK 窗内分屏打开会话）显示桌面 SDK 在持续成熟；#38519（仅前端安装）呼声高，值得纳入规划。
- **插件化**：Home Assistant 出核（#132469）延续"核心瘦身 + catalog 插件"策略，可预期更多平台集成走此路径。
- **性能**：[#106544](https://github.com/NousResearch/hermes-agent/pull/106544) 分支会话保留完整 tool 历史以提升 prompt-cache 命中，属于高价值优化。

## 7. 用户反馈摘要

- **自托管/自管安装用户是痛点最集中的群体**：cron、DM 投递、Matrix、Windows 更新（#124807 DLL 删除 WinError 5）等多个高热 issue 均发生在 shell-installer/PM 安装路径上，环境清洗与依赖隔离策略（PYTHONPATH 只含仓库根）被反复证明破坏可用性。
- **桌面端信任受损**：重复渲染、消息消失、慢模型被误判截断，用户明确表示"DB 数据完好但 UI 不可信"（#68321、#129993），影响日常使用信心。
- **慢速/本地模型用户被系统性忽视**：#125306、#99943 均反映为云端 API 优化的假设（45s 超时、Ollama 配置全局生效）伤及 vLLM/Ollama 用户。
- **正面信号**：用户报告质量高（带完整复现、commit hash、日志），#131859 中贡献者主动 fork 修 aux cost 溯源问题，社区参与深度可观。

## 8. 待处理积压

- **[#107356](https://github.com/NousResearch/hermes-agent/issues/107356) 安全漏洞堆积（9 月 10 日开，24/30 高危）**——最需要维护者公开回应的 issue，与项目"个人 Agent 持有凭证"的定位直接冲突。
- **[#82052](https://github.com/NousResearch/hermes-agent/issues/82052)（8 月 8 日开）** xAI OAuth token 过期后 403 被判不可重试，长会话用户持续受影响。
- **[#101007](https://github.com/NousResearch/hermes-agent/issues/101007)（9 月 2 日开）** MCP lazy 加载配置完全失效，影响所有 HTTP MCP server 用户。
- **[#99943](https://github.com/NousResearch/hermes-agent/issues/99943)（9 月 1 日开）** 上下文窗口静默钳制，长上下文场景核心回归。
- **PR 积压**：402 条待合并 PR，其中 #39595（结构化输出，6 月 5 日开）已挂近 4 个月，建议优先评审或明确关闭决策。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*