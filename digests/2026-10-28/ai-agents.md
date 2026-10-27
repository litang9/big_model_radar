# OpenClaw 生态日报 2026-10-28

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-27 23:44 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 — 2026-10-28

## 1. 今日速览

OpenClaw 今日保持**极高活跃度**：过去 24 小时 Issues 更新 500 条（新开/活跃 407，关闭 93），PR 更新 500 条（待合并 238，已合并/关闭 262），单日发布 3 个版本。社区讨论焦点集中在 **Gateway 性能与内存回归**（SQLite 争用、事件循环阻塞、RSS 涨至 ~1.9GB）以及 **memory-core 索引/存储可靠性**。同时出现一批高质量社区修复 PR（Signal 静默断连、Compaction 终态事实保留、MCP 工具过滤等），核心维护者 @steipete 今日提交多个 perf/fix PR，推进节奏明显。整体判断：项目健康度高、贡献管道充沛，但 2026.9.6–2026.10.x 系列引入的性能回归已成为当前最大债务。

## 2. 版本发布（3 个）

### v2026.10.10-beta.4
- **Fix**：Automations — 为显式的同会话定时 follow-up 保留已认证 operator 权限（含 one-shot `next_check` 重挂载），同时维持角色、会话、取消、目标与工具策略的撤销边界。属于权限/调度细节修复，无破坏性变更。

### v2026.10.8
- **Highlights — 更新可完成并自动恢复**：
  - 更新后 Doctor 常规失败现在会**重启 Gateway**，而不是留下停机状态；
  - 孤儿 maintenance worker 不再阻塞所有 CLI 命令与 Gateway 启动；
  - 更新不再在 ACL 文件系统、Windows 等环境中中止。
- 迁移建议：受 [#164800](https://github.com/openclaw/openclaw/issues/164800)（2026.9.7→2026.9.8 激活驱动死亡直至重启）影响的用户应尽快升级至此版本。

### v2026.9.35（extended-stable / LTS 等价）
- Gateway-only 发布 = 2026 年 9 月底代码 + 关键安全更新、可靠性与性能修复、新模型支持。**生产环境建议跟踪此通道**。

## 3. 项目进展

今日合并/关闭 262 个 PR，代表性进展：

- **性能优化主线**（@steipete 密集提交）：
  - [perf(gateway): reuse ancestor child contributions](https://github.com/openclaw/openclaw/pull/186389)（XL）— 500 子代理 × 20 viewer 场景下每事件 10,040 次成员读取大幅削减，直击 Gateway 主线程热点；
  - [perf(gateway): share retained membership participant projections](https://github.com/openclaw/openclaw/pull/186374) — 堆普查驱动的投影去重，与内存回归问题（#169797、#181432）直接呼应；
  - [perf(agents): move sandbox pruning off run start](https://github.com/openclaw/openclaw/pull/186121)（已关闭）— 性能证据已被维护者接受。
- **可靠性修复**：[fix(signal): 容器传输静默断网后停止接收消息](https://github.com/openclaw/openclaw/pull/186340)（P1）；[fix(agents): 最终回答避免携带超限原始历史](https://github.com/openclaw/openclaw/pull/186288)（P1，修复上下文膨胀）；[fix(mcp): probe 名称过滤导致工具被隐藏](https://github.com/openclaw/openclaw/pull/186108)（已关闭）。
- **正确性**：[fix(compaction): 保留长工具输出中的终态事实](https://github.com/openclaw/openclaw/pull/186382)；[fix: 隐藏频道预览中的待定 tool-call 文本](https://github.com/openclaw/openclaw/pull/186375)（含潜在敏感参数泄露防护意义）。
- **发布工程加固**（@RomneyDa 系列）：[保留 admission workflow pins](https://github.com/openclaw/openclaw/pull/181910)、[artifact 资格失败必须阻塞](https://github.com/openclaw/openclaw/pull/181912)、[按 artifact digest 绑定复用计划](https://github.com/openclaw/openclaw/pull/181914)。
- **Windows/时钟健壮性**：两个 monotonic clock 修复（[cost usage 刷新](https://github.com/openclaw/openclaw/pull/186388)、[共享 TPM 重试窗口](https://github.com/openclaw/openclaw/pull/186390)）消除 NTP 跳变/VM 暂停导致的预算损坏。

总体：单日在性能、可靠性、发布工程三条线均有实质推进，尤其是内存/主线程优化有望在下一个 stable 中缓解近期回归投诉。

## 4. 社区热点

| 排名 | Issue | 评论 | 热点诉求 |
|---|---|---|---|
| 1 | [#160959](https://github.com/openclaw/openclaw/issues/160959) P0 | 58 | 2026.9.6 引入的插件捕获回归：大型外部插件使 Gateway 事件循环阻塞**数分钟**（启动时+运行时重发布），已有源码级复现但**无 fix PR** |
| 2 | [#119720](https://github.com/openclaw/openclaw/issues/119720) P1 | 25 | 同步 agent 持久化/transcript 维护阻塞事件循环——部分修复已落地，社区持续追踪 |
| 3 | [#120385](https://github.com/openclaw/openclaw/issues/120385) P2 | 18 | 定时/cron 与 memory-flush 回合中 MCP 工具目录不完整（"Unknown tool id"） |
| 4 | [#114612](https://github.com/openclaw/openclaw/issues/114612) P2 | 17 | memory SQLite 表无保留策略，磁盘无限增长——长期未修 |
| 5 | [#166634](https://github.com/openclaw/openclaw/issues/166634) P0 | 15 | 崩溃恢复后 checkpoint 失败导致 agent 永久 UNAVAILABLE |

**诉求画像**：社区最大痛点是“Gateway 单点阻塞”（事件循环/SQLite 锁）与“会话状态丢失/无法恢复”——两者均属 P0/P1 且多无 fix PR。标签 `clawsweeper:needs-maintainer-review` 大量出现，反映**维护者带宽是当前瓶颈**。

## 5. Bug 与稳定性（按严重度）

**P0 / 发布阻塞级**
- [#160959](https://github.com/openclaw/openclaw/issues/160959) 大插件捕获致 Gateway 阻塞数分钟（2026.9.6 回归）— ❌ 无 fix PR
- [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 agent 永久不可用 — ❌（not-repro-on-main）
- [#158912](https://github.com/openclaw/openclaw/issues/158912) MEMORY.md 不再注入 bootstrap，文档与行为不一致 — ❌
- [#164800](https://github.com/openclaw/openclaw/issues/164800) 托管更新后激活驱动死亡直至重启 — ❌（2026.10.8 可能缓解）

**P1**
- [#181432](https://github.com/openclaw/openclaw/issues/181432) 2026.10.5 基线 RSS 300MB→1.9GB + SQLite 事务超时 — ❌（PR #186374/#186389 部分对症）
- [#169797](https://github.com/openclaw/openclaw/issues/169797) 单 CPU 主机内存 2.5×、启动慢 3–5× — ❌
- [#181078](https://github.com/openclaw/openclaw/issues/181078) "Canonical session reader continuation is no longer current" 回合失败（2026.10.5–10.8）— ❌
- [#177656](https://github.com/openclaw/openclaw/issues/177656) 原生 host exec 返回 shared-state 完整性准入错误（≥28 例）— ❌
- [#117262](https://github.com/openclaw/openclaw/issues/117262) SQLite 3 并发写句柄致 ~33s 事件循环停顿 — ❌
- [#172837](https://github.com/openclaw/openclaw/issues/172837) Codex 原生子代理 assignment 永不清除并重复重发 — ❌
- [#178359](https://github.com/openclaw/openclaw/issues/178359) `doctor --fix` 在插件捕获阶段空转 15+ 分钟 — ❌
- [#115256](https://github.com/openclaw/openclaw/issues/115256) 桌面应用 boot-loop Gateway — ❌（长期）
- [#113701](https://github.com/openclaw/openclaw/issues/113701) 大工具输出致上下文溢出且压缩无法恢复 — ⚠️ 相关 PR #186282/#186382 部分覆盖

**P2 值得注意**
- [#166133](https://github.com/openclaw/openclaw/issues/166133) MCP 整数参数被强转字符串 — ❌
- [#166017](https://github.com/openclaw/openclaw/issues/166017) `sessionIdleTtlMs` 默认值不生效，256 子进程爆满 — ⚠️ 有 linked PR
- [#169154](https://github.com/openclaw/openclaw/issues/169154) 消息含 `Authorization: Bearer` 文本即失败 — ❌

## 6. 功能请求与路线图信号

- **文件系统沙箱配置 `tools.fileAccess`**（[#7722](https://github.com/openclaw/openclaw/issues/7722)，👍4）— 安全诉求强烈，标 `needs-security-review`，符合 Agent 安全趋势，优先级高。
- **每模型用量/成本日志**（[#13219](https://github.com/openclaw/openclaw/issues/13219)）— 已有 linked PR + 今日 [#186388](https://github.com/openclaw/openclaw/pull/186388) cost usage 修复，**很可能近期落地**。
- **Per-agent compaction/contextPruning 覆盖**（[#52732](https://github.com/openclaw/openclaw/issues/52732)）— 配置表达力需求，与 compaction 修复线（#186382）同域。
- **TUI 无障碍（禁用 emoji/unicode）**（[#9637](https://github.com/openclaw/openclaw/issues/9637)）— a11y 信号，PR #186375 已在文本净化方向迈步。
- **Android 原生审批/可选问题对齐浏览器**（[#175826](https://github.com/openclaw/openclaw/issues/175826)）— 已进入设计验收阶段，后续 PR 可期。
- **本地 relay 后的托管模型看门狗**（[#183637](https://github.com/openclaw/openclaw/pull/183637)）+ cron 重试为 fallback 留时间（[#186368](https://github.com/openclaw/openclaw/pull/186368)）— 模型路由健壮性方向成型。

## 7. 用户反馈摘要

- **不满意（集中）**：升级 2026.9.6→2026.10.x 后的**性能倒退**是最强负面信号（内存 2.5×~6×、启动慢、回合失败），多用户提供了详尽的生产级取证；memory-core 的索引卡死（[#130955](https://github.com/openclaw/openclaw/issues/130955)，“恰好 2 个文件后永久停住”）和 19GB 孤儿临时库（[#136311](https://github.com/openclaw/openclaw/issues/136311)）伤害信任。
- **诊断陷阱类抱怨**：`config get` 掩码敏感值导致 4 小时故障误诊（[#173313](https://github.com/openclaw/openclaw/issues/173313)）——用户要求“可观测的诚实”。
- **满意点**：用户赞赏失败报告的结构化（OpenClaw 自动生成 update-failure report issue）、extended-stable 通道、以及社区 bot（clawsweeper）的分类效率；甚至有 agent 代用户提交的高质量 bug 报告（[#185902](https://github.com/openclaw/openclaw/issues/185902)），显示产品自举使用程度深。
- **典型场景**：Docker 沙箱 + 13 个 stdio MCP server/会话的多代理主机、Matrix/Discord/Telegram/Signal 多通道机器人、订阅制 auth 的个人助手——用户在把 OpenClaw 当**长期运行的家庭服务器**用，故对泄漏/增长/恢复类 bug 极度敏感。

## 8. 待处理积压（维护者关注）

1. [#160959](https://github.com/openclaw/openclaw/issues/160959) — P0、58 评论、源码已复现、**无任何 fix PR**，是当前最响亮的悬案。
2. [#114612](https://github.com/openclaw/openclaw/issues/114612) / [#136311](https://github.com/openclaw/openclaw/issues/136311) / [#121232](https://github.com/openclaw/openclaw/issues/121232) — memory-core 存储/索引积压群，需产品决策（保留策略、dreaming 排名/应用一致性）。
3. [#115256](https://github.com/openclaw/openclaw/issues/115256)（7 月末起）— 桌面 boot-loop，`maturity:stable` 标签但长期未修。
4. [#114211](https://github.com/openclaw/openclaw/issues/114211)（🐚 platinum hermit 评级）— Matrix 房间代理死循环 + 过期会话重放，7 月开至今。
5. [#7722](https://github.com/openclaw/openclaw/issues/7722) / [#52732](https://github.com/openclaw/openclaw/issues/52732) — 高 👍 功能请求，卡在 `needs-product-decision`。
6. PR 侧：[#173026](https://github.com/openclaw/openclaw/pull/173026)（Telegram 委派后丢回复，XL、P1）和 [#183267](https://github.com/openclaw/openclaw/pull/183267)（UI 叙述隐藏，XL）已 ready for review 多日，建议优先处理以免积压变质。

---
*数据来源：GitHub API 快照（Issues/PR 各 500 条，2026-10-27）。评论数统计以数据窗口内更新为准。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比报告
**数据窗口：2026-10-27 ~ 2026-10-28**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**“大规模部署验证期”**：头部项目日均 Issue/PR 活动量均达数百条，说明用户正从尝鲜转向长期生产使用。用户场景高度趋同——Docker/家庭服务器上 7×24 运行、多通道消息接入（Discord/WhatsApp/Matrix/Signal/Telegram）、MCP 工具生态集成——由此催生的共性诉求集中在**长时运行稳定性、资源治理（内存/磁盘）、会话状态可靠恢复与上下文压缩正确性**。同时，各项目都出现“大功能合并后的收敛期”特征：架构级合并（统一网关、Webapp）带来的回归债务成为当前生态最大质量风险。agent 自举使用（agent 代用户提交高质量 bug 报告）和社区 bot triage 的普及，标志着项目管理工具链本身也在被 AI 重塑。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 407，关闭 93，关闭比 ~19%） | 459（活跃 381，关闭 78，关闭比 ~17%） |
| PR 更新（24h） | 500（待合并 238，合并/关闭 262） | 500（待合并 363，合并/关闭 137） |
| 版本发布 | **3 个**（含 v2026.9.35 extended-stable/LTS 通道） | 0（最近大变更：Webapp 合并于 10-25） |
| 版本节奏 | 高频 beta + stable + LTS 多通道 | 主线滚动，无定期 release |
| 健康度评估 | **高活跃、贡献管道充沛**；风险：性能回归债务重（RSS 1.9GB）、P0 悬案无 fix PR、维护者带宽成瓶颈 | **高活跃、修复响应快**；风险：363 个待合并 PR 积压、Windows 质量债务、两大架构合并余波未平 |

## 3. OpenClaw 在生态中的定位

- **发布工程最成熟**：唯一提供 beta/stable/extended-stable（LTS 等价）多通道，且配套 update-failure report 自动生成、admission workflow pin、artifact digest 绑定等发布加固 PR 群（@RomneyDa 系列）——Hermes 尚无对等的 release 治理。
- **性能优化主线投入最深**：@steipete 单日多个 perf PR（#186389 削减每事件 10,040 次成员读取、#186374 投影去重），直击 Gateway 主线程热点；Hermes 今日进展以小修和 UX 打磨为主。
- **规模差异**：两项目活动量同级，但 OpenClaw 的核心维护者集中度更高（steipete 密集提交），Hermes 更依赖社区贡献（PR 积压 363 vs 238）。
- **短板**：OpenClaw 的性能回归（2026.9.6–10.x 系列，内存 2.5×~6×）已成为最响亮的负面信号，且 #160959（P0、58 评论、源码复现）无任何 fix PR——**发布速度快于质量收敛**是其主要债务。

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **上下文压缩正确性** | 两者 | OpenClaw #113701/#186382（压缩保留终态事实）；Hermes #127260（压缩损坏工具参数）、#143379 DOC-CHAIN RFC（压缩后持久记录可溯源重读）——“不希望重复告诉 agent 已说过的事”是共同最强用户诉求 |
| **会话状态/崩溃恢复** | 两者 | OpenClaw #166634（checkpoint 失败致永久 UNAVAILABLE）、#181078；Hermes #139135（delegate 后父会话不恢复）、#127284（pending 标记无自愈） |
| **磁盘/内存资源治理** | 两者 | OpenClaw #114612（SQLite 无保留策略）、#136311（19GB 孤儿库）、#181432（RSS 1.9GB）；Hermes #145527（0.5GB×N 孤儿安装回收） |
| **消息平台集成可靠性** | 两者 | OpenClaw Signal 静默断连修复、Matrix 死循环（#114211）；Hermes Discord admission_conflict、WhatsApp QR 状态误报 |
| **定时任务/cron 权限与恢复** | 两者 | OpenClaw v2026.10.10-beta.4 follow-up 权限保留、#120385 cron 工具目录不完整；Hermes cron automation 唤醒失败 |
| **企业/fleet 管理方向** | 两者 | OpenClaw `tools.fileAccess` 沙箱配置（#7722）；Hermes 远程配置插件多级锁定（#122509） |
| **Windows 平台质量** | 两者 | OpenClaw monotonic clock/NTP 跳变修复；Hermes DACL 硬化（#122935）、git-bash 截断——Windows 升级链路均为薄弱环节 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | Gateway 中枢架构：多子代理（500 子代理级并发）、memory-core 持久记忆、多通道机器人、沙箱/ACL 安全边界 | 端侧一体：CLI + Desktop + 刚合并的 Webapp，Portal/Nous 网关集成，skills 生态（如金融回测技能） |
| 目标用户 | 长期运行的家庭服务器/多代理主机运维者，对资源与恢复敏感 | Discord/WhatsApp + cron 自动化的个人用户，含明显 CJK 非英语用户群 |
| 架构路线 | 中心化 Gateway 单点（也因此承受事件循环/SQLite 争用热点） | 统一网关收敛中（#106742 刚合并，post-merge 修整） |
| 记忆路线 | memory-core + dreaming 排名 + MEMORY.md bootstrap（争议中） | 压缩持久层重构（DOC-CHAIN RFC 提案阶段） |
| 发布策略 | 多通道（beta/stable/LTS），生产建议跟踪 extended-stable | 主线滚动升级，就地升级链路较脆弱 |

## 6. 社区热度与成熟度

- **第一梯队（活跃度相当）**：两项目日均 Issue/PR 均达 459–500 条更新，关闭比 17%–19%，均属健康。
- **快速迭代阶段**：OpenClaw——单日 3 版本、262 个 PR 合并/关闭、perf 主线密集推进，节奏明显快于质量收敛。
- **质量巩固阶段**：Hermes——无新 release，处于统一网关 + Webapp 两大合并后的收口期（#143547 开放问题汇总帖），以 P2 修复和 UX 打磨为主。
- **成熟度信号对比**：OpenClaw 的 extended-stable 通道、结构化失败报告、clawsweeper bot 分类体现更成熟的运维治理；Hermes 的优势在修复响应速度（多个 P2 数日内关闭）和社区 RFC 治理（DOC-CHAIN、千 Issue triage 共识）。

## 7. 值得关注的趋势信号

1. **长时运行质量 > 新功能**：两个项目最热议题全部是泄漏、恢复、磁盘增长类问题——“个人 AI 助手当服务器跑”已成为主流用法，资源治理能力将成为选型关键指标。
2. **上下文压缩是下一个架构战场**：压缩后“不丢事实、可溯源、可重读”（OpenClaw compaction 修复线、Hermes DOC-CHAIN RFC）是共同的技术演进方向，对 agent 框架开发者有直接参考价值。
3. **维护者带宽是共同瓶颈**：OpenClaw 的 needs-maintainer-review 标签泛滥、Hermes 363 个待合并 PR——社区贡献充沛但评审跟不上，triage 自动化（bot 分类、agent 代报 bug）是缓解方向。
4. **多通道消息 + MCP 工具集成为事实标准**：Signal/WhatsApp/Discord/Matrix 集成的稳定性问题高频出现，说明此类集成已是刚需而非加分项。
5. **Agent 安全与 fleet 管理需求抬头**：沙箱文件访问配置（#7722）、审批边界、集中式多级配置锁定（#122509）均指向企业化部署场景，预示生态从个人玩具向可托管资产演进。
6. **非英语用户体验成为差异化机会**：Hermes 的 CJK IME 问题持续损害体验，a11y（emoji/unicode 可关）诉求也在出现——国际化质量是被低估的竞争维度。

---
*方法论说明：本报告基于两项目 2026-10-27 GitHub API 快照（各 500 条 Issues/PR 窗口）的社区日报交叉分析；评论数与关闭比统计受数据窗口限制，趋势判断需持续多日观察验证。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-10-28）

## 1. 今日速览

Hermes Agent 今日保持极高活跃度：过去 24 小时 Issues 更新 459 条（新开/活跃 381、关闭 78），PR 更新 500 条（待合并 363、合并/关闭 137），社区参与度在 AI 智能体开源项目中属于第一梯队。今日无新版本发布，但主线合并节奏紧凑，多个 P2 级修复落地，且刚合并的 Webapp（浏览器版 Desktop，#141864）与统一网关（#106742）正进入密集的 post-merge 修整期。整体看，项目处于“大功能合并后的收敛阶段”，Issue 涌入量大但关闭速率健康（关闭比约 17%），需重点关注 session 状态管理与 Windows 平台两大风险域。

---

## 2. 版本发布

今日无新版本发布。主线最近一次重要变更为 Webapp 功能合并（2026-10-25，`d6b868b7abd`）。

---

## 3. 项目进展

今日合并/关闭的代表性 PR（共 137 条合并/关闭）：

- **安装器孤儿状态回收**（#145527，已关闭）：`~/.hermes/installs/<key>`（每个约 0.5GB / 27k 文件）在 checkout 被删除后 14 天未用即回收，解决磁盘无限膨胀问题。紧随其后的 #145753 修复了回收过程中引入的锁竞争，说明维护者在快速跟进边缘情况。
- **Nous Portal 推荐模型改读 R2 镜像**（#141829，已关闭）：网关不再对无 Nous 账户的 profile 刷新模型推荐，降低后端负载。
- **/stop 清除 restart-recovery 标记**（#120758，已关闭）：修复 `/stop` 后 `resume_pending` 标记残留导致的恢复异常，属于 session 状态管理长期痛点的一块拼图。
- **Dashboard Channels 状态修复接力**：原 #106929 关闭后由 #145754（salvage）接续，修复 WhatsApp QR 配对显示 "Not configured" 等误报。
- **Desktop lint 修复**（#145747）：连续两次合并导致 main lint 变红，快速回绿——反映出“合并速度快于 CI 门禁覆盖”的流程性小问题。
- **CLI 重启后暂停聊天提示优化**（#145531）：将晦涩的 "Unknown admission" 提示改为明确的未发送告知与继续命令，用户体验持续打磨。

**评估**：今日进展以稳定性收尾和体验打磨为主，未出现新的架构级变更；配合 Webapp 合并后的 follow-up 跟踪（#144648），项目正在消化近期两大合并（统一网关、Webapp）的余波。

---

## 4. 社区热点

- **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（53 评论，OPEN）**：单一账户通过 API 创建 PR 报 CreatePullRequest 权限错误，issue 创建与 fork PR 正常。标记 `cause/upstream`，疑似 GitHub 平台侧问题，但长期 blocked 引发大量讨论。
- **[#143379](https://github.com/NousResearch/hermes-agent/issues/143379)（28 评论，OPEN）**：RFC "DOC-CHAIN SUBSTRATE"——社区对压缩后持久记录保留溯源（provenance）、可重读性的架构提案，反映用户对**上下文压缩不丢关键状态**的强烈诉求。
- **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（25 评论，OPEN）**：统一网关 #106742 合并后的开放问题汇总帖，覆盖 auth、sessions、install-update、Windows 等多域，是当前最重要的收口跟踪点。
- **[#7335](https://github.com/NousResearch/hermes-agent/issues/7335)（21 评论，CLOSED）**：开放 Issue 超 1000 的治理讨论，今日关闭，或表明社区已形成 triage 共识。
- **[#142461](https://github.com/NousResearch/hermes-agent/issues/142461)（14 评论，6 👍，已关闭）**：Discord 自动线程 automation 唤醒永久 `admission_conflict`——高赞高互动，说明 Discord 集成用户基数大且该问题影响实际生产自动化。

---

## 5. Bug 与稳定性

**P1（高优先级）**

| Issue | 问题 | 状态 |
|---|---|---|
| [#122935](https://github.com/NousResearch/hermes-agent/issues/122935) | Windows `hermes update` 留下硬化的 DACL，非提权进程无法执行托管 python/node（WinError 5） | OPEN，暂无定向 fix PR |
| [#139135](https://github.com/NousResearch/hermes-agent/issues/139135) | Discord 异步 delegate 完成但父会话不恢复（durable result 停留 pending） | OPEN，属网关 session 状态系统性问题 |
| [#127284](https://github.com/NousResearch/hermes-agent/issues/127284) | `source-completion-pending` 无 TTL/自愈，被 kill 后所有后续启动卡死 | OPEN，awaiting-reporter |

**P2（中优先级，今日活跃）**

- [#131055](https://github.com/NousResearch/hermes-agent/issues/131055)（已关闭）：Linux Desktop 二次启动污染沙箱回退标记 → 粘性 `--no-sandbox` → 渲染器 SIGILL 循环。
- [#139818](https://github.com/NousResearch/hermes-agent/issues/139818)：远程后端 Desktop 会话本地无法 resume（`not_found`）。
- [#127260](https://github.com/NousResearch/hermes-agent/issues/127260)：**上下文压缩在传输中损坏工具调用参数**（截断 + token 注入 + BOM），Windows git-bash 下尤甚——影响面广（terminal/write_file/execute_code），值得升级关注。
- [#123985](https://github.com/NousResearch/hermes-agent/issues/123985)：压缩后 Desktop 首批消息重复渲染（messages 表存在双份 display 行）。
- [#131375](https://github.com/NousResearch/hermes-agent/issues/131375)：smart-approval guardian 在事件循环线程崩溃，所有标记命令都被迫升级为人工审批。
- [#131321](https://github.com/NousResearch/hermes-agent/issues/131321)（已关闭）：NVIDIA SwiftShader 回退无法从过期 witness 恢复，主机被锁定软件渲染 13 天。

**关联 fix PR 动向**：#120758（resume_pending 标记）、#145371（bot relay reset 后 lineage tip 定位）、#145722（Discord 审批超时被钳制到 900s）均在推进 session/Discord 域修复，方向与上述 P1/P2 高度对应。

---

## 6. 功能请求与路线图信号

- **Hermes Cloud 远程配置插件**（[PR #122509](https://github.com/NousResearch/hermes-agent/pull/122509)，9/25 开放至今）：集中式 config 后端，支持 global/tenant/group/owner/profile 多级锁定——企业 fleet 管理方向的明确信号，长期 OPEN 说明评审周期长，可能进入下一大版本。
- **subagent_lifecycle v1.1**（[#133212](https://github.com/NousResearch/hermes-agent/issues/133212)）：插件编排器对子代理的 steer/隔离传输/effort 路由，处于 needs-decision，是插件生态路线图的核心项。
- **0xArchive 回测技能**（[PR #145670](https://github.com/NousResearch/hermes-agent/pull/145670)）：opt-in 金融研究技能，体现 skills 生态横向扩展策略。
- **DOC-CHAIN RFC**（#143379）：若被采纳，将重塑压缩与持久记忆层。
- **桌面通知音量控制**（[#87473](https://github.com/NousResearch/hermes-agent/issues/87473)，5 👍）：小而热的需求，实现成本低，可能较快纳入。

---

## 7. 用户反馈摘要

- **真实痛点集中在三处**：①**上下文压缩副作用**——消息重复（#123985）、工具参数被截断（#127260）、压缩后数据不可重读（#143379 RFC 的出发点），用户反复强调“不希望重复告诉 agent 已说过的事”；②**Windows 更新链路脆弱**——DACL 权限（#122935）、state.db 预检超时（#133253）、第三方进程占用目录（#101789），Windows 用户升级体验明显差于 Linux/macOS；③**session 生命周期可靠性**——resume 失败、delegate 父子恢复断裂等，对长期运行的 automation/消息平台用户是核心关切。
- **满意点**：修复响应速度快（多个 P2 数日内关闭）、CLI 错误提示持续人性化（#145531）、桌面渲染性能优化（#145757）获得正面反馈。
- **场景画像**：大量用户以 Discord/WhatsApp 接入 + cron automation 长期运行 Hermes，桌面端中文用户（CJK IME 问题 #106487）构成明显的非英语用户群。

---

## 8. 待处理积压

- **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)**：开放近一个月、53 评论仍 blocked（upstream），建议给出替代工作路径或引导至 GitHub Support。
- **[#122935](https://github.com/NousResearch/hermes-agent/issues/122935)**（P1，9/25 开放）：Windows DACL 问题尚无 fix PR，影响所有 Windows 就地升级用户，建议优先排期。
- **[#69033](https://github.com/NousResearch/hermes-agent/issues/69033)**：Windows 终端工具孤儿子进程问题，7/22 开放已超三个月未解决。
- **[#105758](https://github.com/NousResearch/hermes-agent/issues/105758)**：生命周期守卫误杀 Node.js CLI，9/8 开放、needs-decision，影响插件/工具生态可用性。
- **[#106487](https://github.com/NousResearch/hermes-agent/issues/106487)**：Dashboard 中文 IME 输入不可靠（9/9 开放），持续损害 CJK 用户体验。
- **PR 积压**：待合并 PR 达 363 个，其中 #122509（远程配置，9/25 起）、#83668 与 #84288（8 月起）长期未决，建议维护者明确 triage 顺序，避免社区贡献者流失。

---

**健康度小结**：Issue 关闭比 17%、PR 吞吐量大、维护者（teknium1 等）响应频繁且跟进修复迅速，整体健康。主要风险为：开放 Issue 总量持续高企、两大架构合并（统一网关/Webapp）的余波尚未平息、Windows 平台质量债务累积。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*