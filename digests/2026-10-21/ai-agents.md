# OpenClaw 生态日报 2026-10-21

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-20 23:09 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 — 2026-10-21

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时内 Issues 更新 500 条（新开/活跃 380，关闭 120），PR 更新 500 条（待合并 317，合并/关闭 183），但**无新版本发布**。社区讨论焦点集中在 Gateway 的内存泄漏、SQLite WAL 检查点阻塞和 Windows 平台性能回退等稳定性问题，多个 P0 级 issue 长期处于 `needs-maintainer-review` 状态。PR 侧以 @steipete 为主导的大规模测试清理与重构（d33x/d34x 系列）持续推进，同时会话准入（session admission）架构迁移进入第 2/4 阶段。整体看，项目工程推进活跃，但维护者对高优先级 bug 的响应存在积压，社区对稳定性修复进度的期望与现实有落差。

## 2. 版本发布

今日无新版本发布。近期活跃版本线为 2026.10.x（10.1–10.5 beta），大量 issue 引用 2026.10.3/10.4/10.5。

## 3. 项目进展

今日合并/关闭的 PR 以测试与内部重构为主，无面向用户的大版本功能落地，但几条主线值得关注：

- **会话准入架构迁移**：[#178764](https://github.com/openclaw/openclaw/pull/178764)（refactor(automations): run scheduled conversation work through session admission，4 阶段中的 Slice 2）持续推进，将定时任务纳入统一会话准入/邮箱机制，涉及消息投递与可用性双重合并风险标记。
- **压缩机制恢复**：[#178485](https://github.com/openclaw/openclaw/pull/178485)（feat: restore task-boundary and cache-expiry compaction）在 #178425 后重新落地，针对长对话的上下文压缩痛点，直接关联 #113701 等上下文溢出问题。
- **性能修复**：[#178845](https://github.com/openclaw/openclaw/pull/178845)（fix(sessions): avoid long writer stalls during age retention）修复了万级会话场景下单次写入执行 18,533 条 SQL 的严重写停顿。
- **Doctor 修复**：[#178722](https://github.com/openclaw/openclaw/pull/178722) 修复 Doctor 迁移在无退役证据时错误改写用户选定模型（如 gpt-4.1-mini 被改为 gpt-5.4-mini）的问题。
- **UI 改进**：[#178846](https://github.com/openclaw/openclaw/pull/178846)、[#178842](https://github.com/openclaw/openclaw/pull/178842)（命令面板拖入文件建新会话）、[#178839](https://github.com/openclaw/openclaw/pull/178839) 等一批 Control UI 修复就绪待审。
- **测试清理战役**：d334/d338/d340/d341/d342/d343 多个 XL 批次 PR（#178652、#178712、#178773、#178780、#178793、#178832）系统性合并/删减低价值测试；#178806 尝试复用编译产物被 #178847 回滚——优化未达 10 秒验收目标。

综合评估：核心向后推进集中在**可靠性、状态管理和架构收敛**，进度扎实但偏内部质量，用户可感知的功能增量有限。

## 4. 社区热点

| Issue | 评论 | 主题 |
|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 41 | **Gateway 内存泄漏（P0）**：RSS 数日内从 350MB 涨至 15.5GB，OOM 循环重启，自 6 月开贴至今未修复，`no-new-fix-pr` 标签下社区持续追问 |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | 41 | **2026.9.6 回退**：大型外部插件采集时 Gateway 事件循环阻塞数分钟（#144252 引入），已被标记 source-repro 但仍无修复 PR |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) | 25 | 状态库 WAL 自动检查点自启动以来从未完成（17091 帧日志堆积，被进程内 reader 钉住） |
| [#78308](https://github.com/openclaw/openclaw/issues/78308) | 19 | **安全特性提案**：MCP 工具调用接入 `/approve` 渠道审批（consent envelope），呼声高但需产品+安全双重决策 |
| [#120385](https://github.com/openclaw/openclaw/issues/120385) | 18 | 定时/cron 任务中 MCP 工具目录构建不完整（"Unknown tool id"），作者已更新 scope 说明根因 |

诉求分析：社区核心焦虑是 **Gateway 长时运行稳定性**（内存、SQLite、更新流程）和 **MCP 安全治理**。多个高热度 issue 均挂 `clawsweeper:no-new-fix-pr`，说明自动分诊已到位但人工修复排期不足。

## 5. Bug 与稳定性（按严重程度）

**P0 — 崩溃循环 / 发布阻塞**
- [#91588](https://github.com/openclaw/openclaw/issues/91588) Gateway 内存泄漏致 OOM（无 fix PR，已 4 个月）
- [#160959](https://github.com/openclaw/openclaw/issues/160959) 大插件导致 Gateway 阻塞数分钟，2026.9.6 回退（无 fix PR）
- [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows 启动慢 + 插件不洁关闭 + schtasks 权限错误，重启/更新不可靠（无 fix PR）
- [#154950](https://github.com/openclaw/openclaw/issues/154950) 2026.7.1→2026.9.x 升级因 "legacy-workspace" 错误永久阻塞 Gateway（无 fix PR）
- [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 reclamation checkpoint 失败，agent 永久 UNAVAILABLE

**P1 — 消息丢失 / 会话状态**
- [#172837](https://github.com/openclaw/openclaw/issues/172837) Codex 子代理 assignment 永不清理，新父线程重复重发（已 source-repro）
- [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram 外发失败一次即入死信，公告/完成回复静默丢失
- [#171831](https://github.com/openclaw/openclaw/issues/171831) **Windows 2026.10.2 严重性能回退**：启动 320s（旧版 55s）、单回合事件循环阻塞 112s、pluginState.register 事务 173s
- [#157712](https://github.com/openclaw/openclaw/issues/157712) CLI 每次状态读取泄漏一个 162MB 只读快照，25 分钟刷 23GB（已有 linked PR）
- [#173764](https://github.com/openclaw/openclaw/issues/173764)（已关闭）`openclaw update` 在 doctor 步骤无限挂起，期间 Gateway 下线

**P2 — 次级问题**
- [#172091](https://github.com/openclaw/openclaw/issues/172091) 跨线程 admission 等待致 SQLite 事务永久悬挂、阻塞 WAL 检查点
- [#166133](https://github.com/openclaw/openclaw/issues/166133) MCP 工具调用将整型参数强转字符串
- [#177989](https://github.com/openclaw/openclaw/issues/177989) 2026.10.4/10.5 中 Kimi Code 重复工具调用、过度轮询（疑似回退）

**今日已关闭**：#169586（Windows Doctor EEXIST）、#170212（Telegram 更新后 systemd 失败）、#167385（手工删除归档阻塞会话修复）、#173764（update 挂起）等，Windows/更新链路修复正在见效。

## 6. 功能请求与路线图信号

- **MCP 审批信封**（[#78308](https://github.com/openclaw/openclaw/issues/78308)）与 **SecretRef 支持**（[#76493](https://github.com/openclaw/openclaw/issues/76493)，👍4）：安全治理方向呼声明确，均需产品+安全评审，是下一个版本最可能的候选。
- **任务边界压缩**：PR #178485 已在推进，呼应 #113701 上下文溢出，落地概率高。
- **SQLite 可配置化**（[#138326](https://github.com/openclaw/openclaw/issues/138326)：busy_timeout / 嵌入并发 / WAL checkpoint）：与 #164294、#172091 同根因，WAL 修复线可能顺带交付部分配置项。
- **会话搜索批量查询**（[#135679](https://github.com/openclaw/openclaw/issues/135679)）、**thinking block 修剪**（[#98298](https://github.com/openclaw/openclaw/issues/98298)，👍2）：上下文效率主题，社区持续关注。
- **iOS/macOS 个人身份 opt-in**（[#162164](https://github.com/openclaw/openclaw/issues/162164)）：多设备身份体系的产品层讨论，短期内偏讨论性质。
- Telegram 预处理钩子 PR [#171315](https://github.com/openclaw/openclaw/pull/171315) 处于 needs proof，若过审将补齐插件附件处理能力。

## 7. 用户反馈摘要

- **最大痛点：长时运行稳定性**。桌面/服务器用户（macOS launchd、Windows schtasks、Linux systemd）反复报告数天运行后 OOM、挂起、更新失败——Windows 用户群体反馈尤其密集（#170956、#171831、#162899）。
- **静默失败引发信任问题**：Telegram 消息一次失败即丢（#125764）、cron 任务工具目录缺失只显示"⚠️ Exec failed"（#120385）——用户强调"失败看起来像成功"最伤体验。
- **多 agent / 多插件重度用户**遇到资源放大问题：stdio MCP server 双份启动每份约 145MB（#164690）、active-memory 阻塞回复（#72015），说明规模化部署尚未被充分测试。
- **正面信号**：issue 报告质量高（环境信息完整、含复现与日志），社区贡献者（@Grynn、@steipete、@jalehman 等）主动整理 scope、拆分 PR；Doctor/更新链路的多个 issue 本周被关闭，用户能看到修复兑现。
- **不满点**：P0 内存泄漏开贴 4 个月无 fix PR，评论情绪偏焦虑。

## 8. 待处理积压

以下高优先级 issue 长期挂起（多数带 `clawsweeper:no-new-fix-pr` + `needs-maintainer-review`），建议维护者优先排期：

| Issue | 创建 | 优先级 | 状态 |
|---|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) 内存泄漏 | 2026-06-09 | P0 | 超 4 个月无 fix PR，41 条评论 |
| [#154950](https://github.com/openclaw/openclaw/issues/154950) 升级永久阻塞 | 2026-09-21 | P0 | 影响 stable 渠道升级路径 |
| [#113701](https://github.com/openclaw/openclaw/issues/113701) 上下文溢出失败循环 | 2026-07-25 | P1 | 需 info，PR #178485 可能部分覆盖 |
| [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram 死信 | 2026-08-18 | P1 | 消息丢失类，久拖 |
| [#148557](https://github.com/openclaw/openclaw/issues/148557) OAuth 路由不可用 | 2026-09-14 | P1 | stale + needs-info，有被机器人关闭风险 |
| [#145937](https://github.com/openclaw/openclaw/issues/145937) QQ 渠道无可用插件 | 2026-09-12 | P2 | 两大插件变体均不可用，中文用户群受影响明显 |
| [#80843](https://github.com/openclaw/openclaw/issues/80843) 搜索 provider 降级链 | 2026-05-12 | P2 | 5 个月未决，👍4 |

PR 侧：#178764、#178485 两个 XL 会话/压缩改动处于 waiting on author，是近期最关键的合并风险点，建议尽快完成验收，以回应用户对内存/压缩问题的长期诉求。

---
*数据来源：OpenClaw GitHub Issues/PRs（截至 2026-10-21）。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比报告 — 2026-10-21

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**“架构收敛 + 生态扩张”并行期**：头部项目均在推进统一网关/会话运行时这类底层架构整合，以支撑 CLI、Desktop、TUI、消息渠道（Telegram/Discord）等多表面的一致体验。与此同时，MCP 插件生态呈井喷态势，社区插件目录审核成为日常主线之一。但两个项目共同暴露出“大合并后回归修复吞吐跟不上新增 issue”的通病，长时运行稳定性（内存、SQLite、升级链路）成为用户流失的最大风险。安全治理（工具调用审批、审计日志、权限边界）从边缘诉求上升为核心议题。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 380，关闭 120） | 434（新开/活跃 372，关闭 62） |
| PR 更新（24h） | 500（待合并 317，合并/关闭 183） | 500（待合并 347，合并/关闭 153） |
| 新版本发布 | 无（活跃线 2026.10.1–10.5 beta） | 无 |
| Issue 关闭/新增比 | ~0.32 | ~0.17 |
| 主要工作重心 | 测试清理重构、会话准入迁移、稳定性修复 | 网关统一后修复战役、插件目录扩张 |
| 健康度评估 | **中**：P0 积压严重（内存泄漏 4 个月无 fix PR），但关闭率较高、Doctor/更新链路修复见效 | **中偏活跃**：生态扩张快，但修复吞吐最慢，P0 修复矩阵仍在收敛 |
| 最大风险 | 高优先级 bug 长期 `needs-maintainer-review` | #134889 网关回归波及全平台，影响用户留存 |

两者规模相当（单日 500 级 issue/PR 活动），均属生态头部。

## 3. OpenClaw 在生态中的定位

**优势**：
- 工程纪律强：系统性测试清理战役（d33x 系列 XL 批次）、分阶段架构迁移（session admission 2/4）体现成熟的工程治理。
- 修复兑现可见：本周关闭多个 Windows/更新链路 issue（#169586、#173764 等），用户能看到进展。
- 性能修复扎实：#178845 修复单次写入 18,533 条 SQL 的写停顿，直接解决规模化痛点。

**技术路线差异**：OpenClaw 以 **Gateway + SQLite 状态库** 为核心，重状态管理与可靠性；Hermes Agent 刚完成统一网关运行时大合并，处于架构落地后的收敛期，且更早推进移动端设备能力（#142277 摄像头/GPS/屏幕接入）和插件目录生态。

**社区规模**：issue 报告质量高、贡献者主动拆分 PR 是双方共性；OpenClaw 的社区焦虑更集中于 P0 响应（#91588 41 条评论、4 个月无修复），情绪偏负面。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **长会话上下文压缩** | #178485 任务边界压缩、#113701 溢出、#98298 thinking 修剪 | #79357 idle compact 网关模式失效、#2045 lazy skill 加载 | 上下文效率是跨项目第一共性痛点 |
| **长时运行稳定性** | #91588 内存泄漏、#164294 WAL 检查点、#171831 Windows 回退 | #142125 fd≥1024 stdout 静默丢失、#130797 启动缓慢 | 数天运行后 OOM/挂起，规模化部署未被充分测试 |
| **工具调用安全治理** | #78308 MCP 审批信封、#76493 SecretRef | #141346 smart 审批误删用户数据、#142284 插件 ACL | 从“能不能用”转向“敢不敢让它用” |
| **升级/安装自愈能力** | #154950 升级永久阻塞、#173764 update 挂起 | #127284 marker 无自愈、#135037 PATH 污染、#38519 Windows 安装（27👍） | 残留状态无法自愈是共性缺陷 |
| **行为可审计/可追责** | — | #487 SHA-256 哈希链审计日志 | 防篡改 Agent 行为记录诉求上升 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 网关可靠性、状态管理、定时任务/cron 准入 | 多渠道消息集成、内置技能体系（87 个）、移动设备能力 |
| 目标用户 | 桌面/服务器长时部署用户（systemd/launchd/schtasks），Windows 群体密集 | 多表面个人用户（Telegram/Discord/Desktop/TUI）+ 插件开发者 |
| 技术架构 | Gateway + SQLite 状态库，会话准入统一机制 | 统一网关运行时（新合并），会话跨表面共享 |
| 生态策略 | 以核心修复为主，插件生态未成主线 | 社区插件目录井喷，owner-submitted 审核流程成熟 |
| 短板 | 面向用户的功能增量有限 | 核心修复 PR 多为 OPEN，P0/P1 评审滞后 |

## 6. 社区热度与成熟度

- **快速迭代/扩张期：Hermes Agent**。插件目录十余个/日的新增节奏、移动端能力 PR、202 条评论的网关追踪 issue，处于生态飞轮启动阶段；但关闭/新增比仅 0.17，质量债务在累积。
- **质量巩固期：OpenClaw**。重心在测试清理、性能修复、架构收敛等内部质量工程，关闭比（0.32）优于对手；但 P0 积压（5 项无 fix PR）是最大成熟度短板。
- 共同规律：两个项目都呈现“活跃度高 ≠ 健康度高”，瓶颈都在维护者对高优先级问题的人工排期，自动化分诊（clawsweeper 等）已到位但修复排期不足。

## 7. 值得关注的趋势信号

1. **稳定性即竞争力**：社区情绪的天平正从“功能多”倒向“跑得稳”——OpenClaw P0 内存泄漏 4 个月未修引发焦虑，Hermes 网关回归直接影响留存。对开发者：长时运行（OOM、fd 泄漏、SQLite 检查点）应作为一等测试目标。
2. **静默失败是最伤信任的模式**：消息一次失败即丢、cron 只报 "Exec failed"，“失败看起来像成功”比崩溃更遭诟病。可观测性与显式重试/死信策略应优先设计。
3. **安全治理进入产品化窗口**：MCP 审批信封、SecretRef、smart 审批边界收紧、哈希链审计——用户已从尝鲜转向要求可追责。这两个项目均将安全决策挂在产品+安全双重评审上，是下一个版本的关键差异化点。
4. **上下文效率成为系统性战场**：压缩、修剪、lazy loading 在两个项目高频出现，长会话成本是个人 Agent 的经济性瓶颈。
5. **升级自愈是普遍盲区**：残留 venv/marker/PATH 污染导致的不可恢复状态，跨项目高频出现——安装器设计需内置“脏状态检测与修复”。
6. **Windows 是被低估的战场**：OpenClaw Windows 性能回退密集上报、Hermes 纯前端安装 27👍 需求最高，中文/Windows 用户群体的需求响应将影响项目增长的第二曲线。

---
*数据来源：两项目 GitHub Issues/PRs 动态（截至 2026-10-21）。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-21

## 1. 今日速览

Hermes Agent 今日保持**高活跃度**：过去 24 小时 Issues 更新 434 条（新开/活跃 372，关闭 62），PR 更新 500 条（待合并 347，已合并/关闭 153），无新版本发布。项目当前的核心工作是 **统一网关运行时（#106742）合并后的修复战役**（#134889，202 条评论），涉及会话状态、消息投递、TUI/Desktop 会话等多个高风险面。同时社区插件目录（plugin-catalog）呈现井喷式增长，今日有十余个插件新增/更新 PR 完成审核。整体看，项目处于"大合并后收敛期 + 生态扩张期"的双重节奏，Issue 关闭量（62）远低于新增活跃量（372），修复速度需跟上。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

今日合并/关闭 153 个 PR，主要集中在三条线：

**插件目录生态扩展（数量最多）**：
- 新增插件：[aave-mcp](https://github.com/NousResearch/hermes-agent/pull/142229)（Aave 官方 MCP）、[kanban-stream](https://github.com/NousResearch/hermes-agent/pull/141956)（Kanban 活动直播到 Telegram）、[llmslim](https://github.com/NousResearch/hermes-agent/pull/142212)、[draft-cards](https://github.com/NousResearch/hermes-agent/pull/142204)、[day-panel](https://github.com/NousResearch/hermes-agent/pull/141639)、[mcp-plugin-creator](https://github.com/NousResearch/hermes-agent/pull/141915)
- 更新：[RSS 0.0.4](https://github.com/NousResearch/hermes-agent/pull/142186)（修复 RSS 1.0 解析和大 feed 失败）、[browserless 0.1.2](https://github.com/NousResearch/hermes-agent/pull/142222)、[jp-egov-law 0.1.3](https://github.com/NousResearch/hermes-agent/pull/142260)、[enchanted-composer 0.2.7](https://github.com/NousResearch/hermes-agent/pull/142185)、[xmemo 1.2.1](https://github.com/NousResearch/hermes-agent/pull/142283)

**网关修复战役持续推进**：
- [#139161](https://github.com/NousResearch/hermes-agent/issues/139161) 确认 19 项 TUI/Desktop 会话、命令与实时事件问题已全部在 `main` 上修复（via #139483、#139884、#140595、#140473、#140382、#141573、#141508 等），#134889 追踪矩阵明显收敛。

**值得注意的是，今日核心修复 PR 多为 OPEN 待合并状态**（如 #142275、#142125、#142284、#142287），合并的主要是 P3 级插件目录项——P0/P1 修复仍在评审中，项目实质向前推进集中在生态层。

## 4. 社区热点

1. **[#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（202 条评论）** — 统一网关运行时合并后的总追踪 issue。"一个 gateway 拥有所有本地会话"的架构变更波及 CLI、Desktop、TUI、Docker、Windows 全平台，是当前社区注意力最集中之处，用户在持续上报合并后回归。
2. **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（47 条评论）** — 外部贡献者无法通过 API 创建 PR（`CreatePullRequest` 权限错误，标记 `cause/upstream`），被阻塞（blocked），直接影响社区贡献渠道，值得维护者向 GitHub 上游跟进。
3. **[#136567](https://github.com/NousResearch/hermes-agent/issues/136567)（32 条评论，8 👍，已关闭）** — Telegram 新话题首条消息无 `message_thread_id` 导致误路由，上游平台行为变更，已处理。
4. **[#487](https://github.com/NousResearch/hermes-agent/issues/487)（26 条评论，已关闭）** — 借鉴 OpenFang 的 SHA-256 哈希链审计日志特性请求，反映社区对**可追责、防篡改 Agent 行为记录**的强烈诉求。
5. **[#10421](https://github.com/NousResearch/hermes-agent/issues/10421)（24 条评论，9 👍）** — 回合级实时时间上下文，长期高需求特性，长期 OPEN 且 `needs-decision`。

## 5. Bug 与稳定性

| 严重度 | Issue | 状态 | Fix PR |
|---|---|---|---|
| **P0** | [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) 网关统一后会话状态/消息投递全面回归 | OPEN | 修复矩阵持续落地 |
| **P1** | [#127284](https://github.com/NousResearch/hermes-agent/issues/127284) `source-completion-pending` 无 TTL/自愈，被 kill 后所有后续启动卡死 | OPEN | 未见 |
| **P1** | [#135037](https://github.com/NousResearch/hermes-agent/issues/135037) Windows 更新把沙箱/外部 checkout 的 bin 目录写入共享 `HKCU\Environment\Path` | OPEN | 未见 |
| **安全（数据丢失）** | [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) smart 审批自动放行 osascript 命令关闭用户未保存的 PPT 并删除导出，不可恢复 | OPEN（昨日新报） | 未见 |
| **P2** | [#142101](https://github.com/NousResearch/hermes-agent/issues/142101) Desktop 选 `custom` 模型后冻结的 launch policy 丢失凭证 → AuthError | OPEN（今日新报） | 未见 |
| **P2** | [#142064](https://github.com/NousResearch/hermes-agent/issues/142064) `/api/sessions` 不暴露 `_reset_from`，REST 客户端把 /new 当 fork | OPEN（今日新报） | 未见 |
| **P2** | [#141988](https://github.com/NousResearch/hermes-agent/issues/141988) `process_manage` 分页 TypeError | OPEN（今日新报） | 未见 |
| **P2** | [#139818](https://github.com/NousResearch/hermes-agent/issues/139818) 远程 backend 桌面会话本地无法 resume | OPEN | 未见 |
| **P2** | [#130797](https://github.com/NousResearch/hermes-agent/issues/130797) v0.21.4 canary 后 CLI/多路网关启动缓慢 | OPEN | 未见 |

**已有修复 PR 待评审**：
- [#142275](https://github.com/NousResearch/hermes-agent/pull/142275)（P2）修复后台进程心跳通知乱序投递
- [#142125](https://github.com/NousResearch/hermes-agent/pull/142125)（P2）修复 fd ≥ 1024 时 `select()` 导致 stdout 静默丢失——长时运行网关的隐蔽稳定性问题
- [#142287](https://github.com/NousResearch/hermes-agent/pull/142287) 修复 Desktop 从其他 agent 启动时继承外来 session 身份
- [#142284](https://github.com/NousResearch/hermes-agent/pull/142284)（安全）修复 Windows 插件发布继承临时目录私有权限而非 `plugins\` ACL

## 6. 功能请求与路线图信号

- **移动端设备能力接入**：[#142277](https://github.com/NousResearch/hermes-agent/pull/142277) 已有 PR 实现通过网关请求手机摄像头/GPS/屏幕/通知，对应 #11911，移动端深度集成可能在推进。
- **审计日志**：#487 已关闭，暗示哈希链审计可能已排期或拒绝，需关注后续动向。
- **回合级时间上下文**（#10421）与 **lazy skill 加载**（[#2045](https://github.com/NousResearch/hermes-agent/issues/2045)，87 个内置技能撑爆 system prompt）均长期 `needs-decision`，后者有明确性能/上下文成本论据，被采纳概率较高。
- **`delegate_task` 按调用覆盖 model/reasoning_effort**（[#80222](https://github.com/NousResearch/hermes-agent/issues/80222)）：与网关重构方向一致，可能随统一网关落地。
- **Windows 纯前端安装**（[#38519](https://github.com/NousResearch/hermes-agent/issues/38519)，27 👍，需求信号最强的特性）仍无对应 PR，是路线图上的明显缺口。

## 7. 用户反馈摘要

- **痛点集中在网关重构**：多表面（CLI/TUI/Desktop/Telegram/Discord）用户均受 #134889 后续回归影响，会话丢失、消息误路由、resume 失败是高频抱怨。
- **信任问题**：#141346 的自动审批导致用户数据不可恢复丢失，直指 `smart` 审批模式的安全边界过宽——macOS `osascript` 驱动本机应用被无提示放行。
- **升级/安装体验差**：#135037、#127284、#127387（旧 venv 污染 py3.14 运行时）共同反映源码安装/升级路径脆弱，残留状态（marker 文件、旧 venv、PATH 注册）无法自愈。
- **满意面**：插件目录提交流程（rule 4/5 owner-submitted）运转顺畅，社区插件作者响应积极；Telegram 话题误路由（#136567）从上报到关闭仅 9 天，响应速度获认可。

## 8. 待处理积压

- [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) — `blocked`/`cause/upstream`：贡献者 PR 权限问题，需维护者推动 GitHub 上游，直接影响外部贡献。
- [#105758](https://github.com/NousResearch/hermes-agent/issues/105758)（P3，9 月 8 日开）— 生命周期守卫误杀良性 Node.js CLI，`needs-decision` 近 6 周。
- [#79357](https://github.com/NousResearch/hermes-agent/issues/79357)（P2，8 月 5 日开）— `idle_compact_after_seconds` 在网关模式下永远不触发，长会话上下文膨胀风险。
- [#44964](https://github.com/NousResearch/hermes-agent/issues/44964)（P2，6 月 12 日开）— `/sessions` 只显示 CLI 来源会话，跨界面用户体验割裂，积压 4 个月。
- [#38519](https://github.com/NousResearch/hermes-agent/issues/38519)（27 👍）— 高需求 Windows 纯前端安装，无 PR、无排期信号。
- [#80222](https://github.com/NousResearch/hermes-agent/issues/80222) — `needs-decision` 已逾两月。

**健康度结论**：项目活跃度极高、生态扩张迅速，但 P0/P1 修复吞吐（今日关闭 62 vs 新增活跃 372）偏慢，网关修复矩阵是决定近期用户留存的关键。建议维护者优先评审 #142275/#142125 等已就绪修复，并对积压的 `needs-decision` 项给出明确裁决。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*