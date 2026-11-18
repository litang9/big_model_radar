# OpenClaw 生态日报 2026-11-18

> Issues: 472 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-18 02:24 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 — 2026-11-18

---

## 1. 今日速览

OpenClaw 今日保持高度活跃：过去 24 小时 Issues 更新 472 条（新开/活跃 361，关闭 111），PR 更新 500 条（待合并 241，已合并/关闭 259），并发布了新版本 **v2026.11.5**。核心贡献者 @steipete 今日连发多个修复 PR，聚焦 Gateway 响应性与重启恢复。社区讨论热点集中在 **SQLite WAL 检查点阻塞、更新/回滚链路故障、prompt cache 失效**等稳定性问题。整体来看项目迭代节奏快、社区参与度高，但更新升级路径上的长期 Bug 积压值得关注。

---

## 2. 版本发布

### v2026.11.5（2026.11.5）

**Highlights：**
- **重启安全的会话**：排队消息、发送权限和最终聊天写入在 Gateway 重启后得以保留（#196923, #196540, #196493），由 @steipete 贡献，感谢 @joshavant。
- **更安全的更新**：Doctor 或 Gateway 启动失败时会自动回滚（说明更新链路的可恢复性是本轮重点方向）。

**迁移提示**：结合 #197083（11.1→11.3 升级后 Doctor WAL 校验失败导致部分未完成状态）与 #200756（Windows beta.2→beta.4 在 package-swap 阶段失败），建议升级前备份 state 目录，并在升级后运行 `openclaw doctor` 验证。

---

## 3. 项目进展

今日合并/关闭 259 个 PR，代表性方向：

**Gateway 稳定性与性能**
- [PR #200899](https://github.com/openclaw/openclaw/pull/200899)（perf）：避免流式会话反复触发全量 session-list 失效扫描，降低 Gateway CPU 消耗。
- [PR #200925](https://github.com/openclaw/openclaw/pull/200925)：将 Readability 网页提取移入 worker 线程，修复大页面解析阻塞 Gateway 主线程——直击 #166641 一类 liveness stall。
- [PR #200917](https://github.com/openclaw/openclaw/pull/200917)：workspace reconciliation 失败时输出可诊断的失败原因，替代裸 `outcome=aborted`。

**多智能体编排修复**
- [PR #200918](https://github.com/openclaw/openclaw/pull/200918)：requester worktree 被移除后停止子代理结果无限重试。
- [PR #200924](https://github.com/openclaw/openclaw/pull/200924)：Gateway 重启后恢复"已读取子代理结果但未回复"的会话，避免最终答复丢失（与 11.5 重启安全主题呼应）。
- [PR #200927](https://github.com/openclaw/openclaw/pull/200927)：Code Mode 中卡住的 GitHub 请求 10 分钟后返回可捕获的超时。

**安全与插件生态**
- [PR #193550](https://github.com/openclaw/openclaw/pull/193550)（XL，needs proof）：新增 `before_model_request` fail-closed 插件钩子，允许插件审查/修改发往模型提供商的最终请求体——安全边界变更，标记兼容性风险。
- [PR #198455](https://github.com/openclaw/openclaw/pull/198455)：插件可向统一 Prometheus scrape 路由注册指标族。
- [PR #196203](https://github.com/openclaw/openclaw/pull/196203)：模板作者可经运行中 Gateway 直接安装本地未发布项目。

**评估**：今日进展集中在"长尾卡死/无限重试收敛"和"可观测性"，v2026.11.5 的重启安全主线正在快速补齐周边场景（重启后子代理回复、worktree 清理等）。

---

## 4. 社区热点（评论最多 Issues）

1. [#164294](https://github.com/openclaw/openclaw/issues/164294)（42 评论，P2）— Gateway state DB 的 WAL auto-checkpoint 被进程内 reader 永久阻塞（17091 帧 WAL 无法收敛），与 #117262 的 SQLite 写竞争问题同根。诉求：状态库并发架构需要系统性改造。
2. [#191944](https://github.com/openclaw/openclaw/issues/191944)（35 评论，P2）— macOS 上 `gateway stop` / `stop --force` 均因"进程族谱无法检查"失败，用户连停止服务都做不到，属高摩擦 UX 问题。
3. [#150635](https://github.com/openclaw/openclaw/issues/150635)（29 评论，标记 data-loss）— 短期记忆召回每晚被清空导致 dreaming deep 阶段永无法晋升；用户对记忆系统可靠性期望很高。
4. [#178359](https://github.com/openclaw/openclaw/issues/178359)（26 评论，P1）— `doctor --fix --non-interactive` 空转 15+ 分钟无输出，"修复工具本身坏掉"引发大量吐槽。
5. [#168955](https://github.com/openclaw/openclaw/issues/168955)（22 评论，P1 回归）— Windows 启动从 ~410s 恶化到 ~1030s，`control-ui-assets` sidecar 阻塞 477s。
6. [#182891](https://github.com/openclaw/openclaw/issues/182891)（17 评论）— prompt cache 每次请求都被丢弃（`cache read dropped N -> 0`），直接推高用户 API 成本，与 #155868（agent 触发的 run 工具清单不同导致缓存失效）同属成本敏感热点。

---

## 5. Bug 与稳定性（按严重度）

**P0**
- [#161921](https://github.com/openclaw/openclaw/issues/161921) — `state-migrated-no-rollback` 后 doctor --fix 与 plugins update 互为前置，死锁（无 fix PR）。
- [#153426](https://github.com/openclaw/openclaw/issues/153426) — 安全 review 中：provenance ratchet 静默永久排除 `MEMORY.md`/`USER.md` 注入，无诊断无恢复（无 fix PR）。
- [#89278](https://github.com/openclaw/openclaw/issues/89278) — Codex OAuth 刷新成功但 cron/heartbeat 因 10s 超时失败（有 linked PR 开启中）。
- [#167406](https://github.com/openclaw/openclaw/issues/167406) — Windows MSIX + Codex 启动饿死主线程（无 fix PR）。

**P1**
- [#178359](https://github.com/openclaw/openclaw/issues/178359) doctor 卡死（无 fix PR）
- [#168955](https://github.com/openclaw/openclaw/issues/168955) Windows 启动 2.5x 回归（无 fix PR）
- [#185578](https://github.com/openclaw/openclaw/issues/185578) Gateway 堆内存只涨不降（~25 MiB/h 直至 V8 上限崩溃）；今日相关改进 PR #200925/#200899 有望缓解
- [#181120](https://github.com/openclaw/openclaw/issues/181120) macOS 主线程阻塞于 MessagePort 关闭导致 Gateway 无响应
- [#117262](https://github.com/openclaw/openclaw/issues/117262) 3 个并发写句柄造成 ~33s 事件循环停顿
- [#194451](https://github.com/openclaw/openclaw/issues/194451) turn 进行中发送 `/think` 触发 SQLite 转录冲突，杀死当前 turn（有 linked PR）

**今日新报告（2026-11-17/18）**
- [#200756](https://github.com/openclaw/openclaw/issues/200756) Windows beta 通道 package-swap 失败 + rollback tree 变更，更新链路在高优修复中。

---

## 6. 功能请求与路线图信号

- [#150238](https://github.com/openclaw/openclaw/issues/150238)：Skill Workshop Experience Review 需要超大 session 的上下文预算/跳过策略——linked PR 已开，可能进下一版本。
- [#138990](https://github.com/openclaw/openclaw/issues/138990)：前台 WebChat 长任务的可执行 checkpoint 与有界 yield 策略。
- [#16670](https://github.com/openclaw/openclaw/issues/16670)（2 👍）：Onboarding Wizard 应包含 Memory/Embedding 必配步骤，与 PR #200901（小主机从密钥到首聊的引导文档）、PR #200923（阻止 setup 通过过小上下文模型）方向一致——**onboarding 打磨是明确的下一版重点**。
- PR #193550 的 `before_model_request` 钩子如合并，将显著扩展插件安全审计能力。

---

## 7. 用户反馈摘要

- **升级焦虑普遍**：多条高评论 Issue 围绕 npm/MSIX 升级失败、`state-migrated-no-rollback`、plugin migration 不收敛（#167557, #183479），用户希望"升级永远不把实例弄坏"。
- **成本敏感**：prompt cache 失效（#182891）、context 估算器 2.3–2.6x 超算（#101929，主分支已修）是付费 API 用户最直接痛点。
- **记忆功能期待高**：active-memory 停止召回（#138561 已关闭）、sessions 源不索引（#137265 已关闭）表明记忆链路修复在被持续消化。
- **正面信号**：#192667 报告者确认 macOS 27.3 beta 后暗色主题输入框问题自愈；#141474 更新显示历史状态恢复修复已进入 2026.11.5-beta 并通过 30/30 测试。
- **长会话体验**：用户依赖 7-agent、多渠道（Telegram/Lark/Discord/微信）生产部署，任何"会话楔死 90 分钟"（#157255）都是不可接受的。

---

## 8. 待处理积压（维护者关注）

| Issue | 状态 | 说明 |
|---|---|---|
| [#164294](https://github.com/openclaw/openclaw/issues/164294) | 10/03 开启，needs-maintainer-review | WAL checkpoint 从未完成，42 评论，数据库架构级问题 |
| [#48003](https://github.com/openclaw/openclaw/issues/48003) | 3/16 开启，linked PR open | steer 模式从不注入，核心消息队列语义缺陷，4 👍 |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | 3/06 开启，linked PR open | gemini-3.1-pro 回归，8 个月未关闭 |
| [#39476](https://github.com/openclaw/openclaw/issues/39476) | 3/08 开启 | A2A sessions_send 回环造成重复消息 |
| [#126360](https://github.com/openclaw/openclaw/issues/126360) | 8/19 开启 | explicit 多代理模式下 AgentSelectionRequiredError 刷日志 |
| [#92473](https://github.com/openclaw/openclaw/issues/92473) | 6/12 开启 | 模型 fallback 内部通知泄漏到用户渠道 |
| [#161921](https://github.com/openclaw/openclaw/issues/161921) | P0 | doctor/plugins 互锁死锁，无任何 fix PR |
| PR [#193550](https://github.com/openclaw/openclaw/pull/193550)、[#198455](https://github.com/openclaw/openclaw/pull/198455)、[#196203](https://github.com/openclaw/openclaw/pull/196203) | XL，等待 review | 多个大型功能 PR 长期在队列中，需维护者带宽 |

**健康度小结**：吞吐量与社区参与度优秀（日关闭 111 Issue / 259 PR），但 P0 更新链路 Bug 平均存活超 1 个月，且大量高评论 Issue 标记 `clawsweeper:no-new-fix-pr`，说明修复产能略落后于报告速度。

---

## 横向生态对比

# 个人 AI 智能体开源生态横向对比分析 — 2026-11-18

> 本期样本：OpenClaw、Hermes Agent（两项目日更数据）

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**生产化深水区**：核心项目日均 Issue/PR 活动均在 300–500 条量级，说明用户基数与工程投入均已规模化。社区讨论焦点正从“功能有没有”转向**长期运行可靠性、升级安全性、成本控制与安全边界**——这是项目从玩具走向基础设施的典型信号。两个头部项目都在与 SQLite 状态存储、Windows 平台兼容、多渠道部署（Telegram/Teams/Discord 等）搏斗，这些是个人 AI 助手落地的共性工程瓶颈。与此同时，插件生态安全治理（fail-closed 钩子、权限审批层）和多端形态（桌面/移动/语音）成为下一轮竞争焦点。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 472（新开/活跃 361，关闭 111） | 292（新开/活跃 278，关闭 14） |
| PR 更新（24h） | 500（待合并 241，合并/关闭 259） | 500（待合并 402，合并/关闭 98） |
| Release | v2026.11.5 稳定版 + 自动回滚机制 | v0.23.2 canary 预发布 |
| Issue 收口比 | 关闭/新增 ≈ 1:3.3 | 关闭/新增 ≈ 1:20 ⚠️ |
| PR 收口比 | 收口 > 新增（健康） | 积压严重（402 待合并） |
| 健康度评估 | 高吞吐、快速收口，但 P0 更新链路 Bug 平均存活 >1 月 | 活跃度极高，审核带宽是最大瓶颈，积压净增长 |

**一句话**：OpenClaw 处于“快迭代 + 能收口”状态；Hermes 处于“爆发式增长但消化不良”状态。

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **吞吐与收口能力领先**：日关闭 111 Issue / 259 PR，闭环能力显著优于 Hermes（14/98）；PR 待合并队列仅为其约 60%。
- **架构深度与可观测性投入**：Gateway worker 线程化、Prometheus 统一指标路由、workspace reconciliation 可诊断化（#200917/#200925/#198455），工程成熟度高。
- **核心贡献者驱动明确**：@steipete 主导的“重启安全会话”主线形成系统性主题（v2026.11.5 + 多个补充 PR），版本叙事清晰。

**风险：**
- 更新/回滚链路 P0 长期积压（#161921 doctor 死锁、#153426 静默排除文件），多个高评论 Issue 标记 `no-new-fix-pr`，修复产能略落后于报告速度。
- WAL checkpoint 阻塞（#164294，17091 帧无法收敛）暴露状态库并发架构需系统性重构——与 Hermes 的 SQLite 热更新锁死是**同类根因**。

**技术路线差异**：OpenClaw 以 Gateway 常驻服务 + 多渠道接入（Telegram/Lark/Discord/微信 7-agent 生产部署）为核心，偏向“个人持久助理”；Hermes 以 Kanban 规划调度 + 多 profile + 桌面/移动端为重心，偏向“自动化工作流智能体”。

**社区规模对比**：OpenClaw 单 Issue 评论峰值 42 条、日活跃 Issue 数约为 Hermes 1.6 倍，用户基数和讨论热度领先；Hermes 社区 RFC 质量高（SessionDB 可插拔 25 评论、移动 App 16 👍），但外部贡献被 #131859 上游权限问题阻断，贡献流入受阻。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **SQLite 状态库瓶颈** | #164294 WAL checkpoint 永久阻塞、#117262 并发写句柄 33s 停顿 | RFC #23717 可插拔 SessionDB（PG/MySQL）、热更新 SQLite 锁死 | 单文件嵌入式 DB 已撑不住常驻多智能体并发，数据库层重构是双方共同信号 |
| **升级路径可靠性** | #197083/#200756 升级失败、v2026.11.5 专设自动回滚 | #134469 venv 重建丢插件依赖 | “升级永不弄坏实例”是用户最强共识诉求 |
| **Windows 二等公民问题** | #168955 启动 410s→1030s 回归、#167406 MSIX 饿死主线程 | #146538（34k–99k 元数据操作/秒）、#126622 write_file 永久拒绝、#41219 gateway 死锁 | 文件系统语义差异（WAL、st_ctime、保留名）是共性硬伤 |
| **长会话/重启状态安全** | 重启后排队消息/子代理回复恢复（11.5 主线） | #147839 会话存储毒化整轮丢失、#144413 settlement 崩溃 | 生产级持久会话要求"任何崩溃可恢复" |
| **安全边界治理** | #193550 fail-closed 插件钩子、#153426 provenance ratchet | #59293 配置写保护绕过、#125747/#127262 worker 委派范围收敛 | 插件/多租户场景下权限与提示注入防护成为架构议题 |
| **成本/性能可观测性** | #182891 prompt cache 失效推高 API 成本 | #6642 遥测、#153070 LoAF 长帧指标 | 付费 API 用户对成本透明度要求急剧上升 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | Gateway 常驻、多渠道消息接入、记忆系统（dreaming/active-memory）、prompt cache 成本优化 | Kanban 任务规划调度、多 profile/tenant 隔离、桌面端体验（流式渲染/性能栈）、移动+语音 |
| 目标用户 | 多渠道生产部署的高级用户（7-agent、Telegram/微信等），API 成本敏感型 | 自动化工作流用户、桌面端个人用户、企业多租户场景 |
| 技术架构 | Node/V8 Gateway 单体 + 插件钩子体系 + SQLite 状态库 | Python venv runtime + gateway launcher + Kanban worker 编排，桌面端独立性能优化线 |
| 生态策略 | 插件安全审计扩展（before_model_request）、模板作者直装、Prometheus 指标开放 | 模型接入响应快（GPT-6.2 已接入）、平台桥接扩展（WhatsApp/Teams）、SessionDB RFC |
| 发布节奏 | 稳定版快速迭代（11.5）+ 自动回滚兜底 | canary 预发布通道，稳定性让位于功能速度 |

---

## 6. 社区热度与成熟度

- **OpenClaw — 快速迭代 + 质量巩固并行**：收口能力强（PR 关闭 > 新开），但 P0 更新链路 Bug 存活超 1 月、`no-new-fix-pr` 标签密集，说明已进入“规模与稳定性赛跑”阶段。记忆系统、context 估算等修复在持续消化中，正面信号明确（30/30 测试通过、暗色主题自愈确认）。
- **Hermes Agent — 快速迭代早期**：Issue 关闭比 1:20、PR 积压 402，审核带宽严重不足；外部贡献通道被上游权限问题阻断，雪上加霜。安全类决策（#59293 悬置 4.5 月）与一线投入（桌面性能六连发、Kanban 安全加固）形成反差——工程执行力强但治理节奏滞后。

**分层结论**：OpenClaw 处于成熟度曲线中段（规模化验证期），Hermes 处于早期高增长段（需补治理与收口能力）。

---

## 7. 值得关注的趋势信号

1. **嵌入式状态存储的极限已现**：两个头部项目同时撞上 SQLite 并发/热更新墙，可插拔数据库后端（PG/MySQL）与状态库架构重构将是 2027 年个人智能体基础设施的关键分水岭。**对开发者：选型时评估状态层可替换性。**
2. **“升级安全”成为一等公民需求**：自动回滚（OpenClaw 11.5）、依赖保留（Hermes venv）都在回应同一诉求——常驻智能体的升级停机成本极高，fail-safe 更新链路是产品竞争力而非工程细节。
3. **插件生态的安全治理拐点**：fail-closed 钩子、worker 委派范围收敛、审批层设计在两个项目同步涌现，预示插件/多租户权限模型将成为下一个标准化的架构组件。
4. **成本可观测性崛起**：prompt cache 失效、上下文超算、遥测指标等成本类 Issue 评论热度高，说明用户已从"用得起"进入“算得清”阶段——成本面板/缓存命中率分析工具是明确的开发者机会。
5. **Windows 是被低估的竞争壁垒**：两项目 Windows 问题均密集且长期悬置，谁先系统性解决 Windows 文件系统/进程语义差异，谁就能吃下这一大块不满用户群。
6. **多端形态（移动+语音）与长会话恢复**：移动端需求 👍 最高、语音 PR 持续推进，配合“重启安全会话”主线，指向智能体从桌面工具向“随身持久助理”演进的产品终局。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-18

---

## 1. 今日速览

Herm Agent 今日保持高度活跃：过去 24 小时 Issue 更新 292 条（新开/活跃 278，关闭 14），PR 更新 500 条（待合并 402，合并/关闭 98），并于昨日发布 canary 版本 **v0.23.2+canary.20261117T064624Z**。Issue 关闭数（14）远低于新增数，积压呈净增长趋势，社区压力集中在 Windows 平台稳定性、会话持久化和多 profile 场景。桌面端（Desktop/Webapp）性能优化 PR 栈（#153065–#153070 六连发）是今日最系统的工程投入。整体健康度：**活跃度极高，但收口速度需关注**。

---

## 2. 版本发布

### v0.23.2+canary.20261117T064624Z（2026-11-17）

- 渠道：canary 预发布，非稳定版
- 提供 Hermes Desktop 各平台构建（macOS Apple Silicon DMG 等，见 [Releases](https://github.com/NousResearch/hermes-agent/releases)）
- 未列出破坏性变更说明；建议生产环境继续停留稳定通道
- 注意：canary 版本配合 staged runtime venv 机制，升级可能触发 [#134469](https://github.com/NousResearch/hermes-agent/issues/134469) 中插件依赖丢失的问题，插件重度用户升级前请备份

---

## 3. 项目进展

今日合并/关闭 98 个 PR，代表性成果：

**Kanban 安全与调度加固（@MGiotto 系列）**
- [#125747](https://github.com/NousResearch/hermes-agent/pull/125747)（已关闭）：禁止规划 worker 接收可外呼的 URL 附件，收敛攻击面
- [#127262](https://github.com/NousResearch/hermes-agent/pull/127262)（已关闭）：限定 Argos worker 委派范围（绑定 profile/board/tenant），强化安全边界
- [#122579](https://github.com/NousResearch/hermes-agent/pull/122579)（已关闭）：Kanban worker 重启、gateway 更新改走持久化 launcher，修复 CWD 相对路径自重启问题

**桌面端性能栈（@ghgoodreau，Stack 1-6/6，审核中）**
- [#153065](https://github.com/NousResearch/hermes-agent/pull/153065)：隔离性能测试 harness 的消息平台，修复 Wayland attach
- [#153066](https://github.com/NousResearch/hermes-agent/pull/153066)：profile 路由失败正确传播，消除双重拨号
- [#153067](https://github.com/NousResearch/hermes-agent/pull/153067)–[#153070](https://github.com/NousResearch/hermes-agent/pull/153070)：流式渲染热路径优化、markdown 预处理延迟化、长帧指标（LoAF）采集

**其他关闭项**
- [#43887](https://github.com/NousResearch/hermes-agent/pull/43887)：gateway 生命周期通知文案按平台自定义（最终关闭）
- [#156454](https://github.com/NousResearch/hermes-agent/pull/156454)：工具层去重复代码重构

**新提交待审亮点**
- [#157202](https://github.com/NousResearch/hermes-agent/pull/157202)：修复多 profile 下 completion ledger 归属串扰
- [#157204](https://github.com/NousResearch/hermes-agent/pull/157204)：Teams 超链接目标恢复
- [#157200](https://github.com/NousResearch/hermes-agent/pull/157200)：CLI/TUI 语音模式可选麦克风/扬声器（salvage #81695）
- [#157141](https://github.com/NousResearch/hermes-agent/pull/157141)：接入 GPT-6.2 Astra/Sol 模型

**评估**：Kanban 安全边界与运行时自管理两条线明显收敛，桌面端体验优化形成系统化推进，整体向前迈进扎实。

---

## 4. 社区热点

| Issue | 评论 | 核心诉求 |
|---|---|---|
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) | 61 | 外部贡献者无法通过 API 对本仓库开 PR（上游权限问题，blocked）——直接阻碍社区贡献流入 |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | 29 | `hermes config set` 可绕过系统配置写保护、无门禁关闭审批层——**安全设计缺口**，仍在等 needs-decision |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) | 27 | Kanban 卡片限流重试成功后永久卡在 `blocker_auth`，reviewer 不生成——自动化流水线可靠性 |
| [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) | 25（👍11） | RFC：可插拔 SessionDB（PostgreSQL/MySQL）——解决 SQLite 热更新冲突，最高认同度 RFC 之一 |
| [#11911](https://github.com/NousResearch/hermes-agent/issues/11911) | 23（👍16） | 原生移动 App + 语音通话——👍最多，移动端需求强烈；Android beta 已因满员暴露容量问题（[#147269](https://github.com/NousResearch/hermes-agent/issues/147269)） |

**解读**：社区关切集中在三轴——**安全边界完整性**、**长期运行可靠性**（Kanban/会话）、**多端形态扩展**（移动端、数据库后端）。

---

## 5. Bug 与稳定性（按严重度）

**P1**
- [#147839](https://github.com/NousResearch/hermes-agent/issues/147839)：单次 20s `worker_receipt_timeout` 毒化会话存储，整轮对话丢失（"No reply"）。暂无 fix PR ⚠️
- [#134469](https://github.com/NousResearch/hermes-agent/issues/134469)：`hermes update` 重建 venv 丢失插件依赖，provider 插件静默失效。暂无 fix PR ⚠️

**P2**
- [#137287](https://github.com/NousResearch/hermes-agent/issues/137287)：桌面端 transcript 随机重复/乱序/丢消息（needs-repro）——今日仍在活跃更新
- [#146538](https://github.com/NousResearch/hermes-agent/issues/146538)：66 profiles 下 Windows gateway 空闲时 34k–99k 文件系统元数据操作/秒，内核池增长——性能+稳定性双杀
- [#126622](https://github.com/NousResearch/hermes-agent/issues/126622)：Windows 上 `write_file` 因 st_ctime_ns 源不一致永久拒绝写入
- [#144413](https://github.com/NousResearch/hermes-agent/issues/144413)：工具结果含孤立代理字符时 settlement 崩溃，会话不可恢复
- [#99943](https://github.com/NousResearch/hermes-agent/issues/99943)：压缩器上下文窗口被 `ollama_num_ctx` 错误钳制，云端 1M 窗口静默缩水至 65k
- [#148898](https://github.com/NousResearch/hermes-agent/issues/148898)（已关闭✅）：Codex 后端对 zstd 压缩 body 返回 400
- [#62169](https://github.com/NousResearch/hermes-agent/issues/62169)（已关闭✅）：CWD 被删除后终端永久 exit 126

**趋势**：Windows 平台问题占比显著，多与文件系统语义差异相关；两个 P1 尚无对应 fix PR，建议优先排期。

---

## 6. 功能请求与路线图信号

- **SessionDB 可插拔化**（[#23717](https://github.com/NousResearch/hermes-agent/issues/23717)）：长期 RFC，持续活跃，结合 [#146706](https://github.com/NousResearch/hermes-agent/pull/146706) 对 state.db 读放大的优化，数据库层重构信号明显，很可能进入下个大版本
- **移动端 + 语音通话**（[#11911](https://github.com/NousResearch/hermes-agent/issues/11911)）：Android beta 已上线（虽因 Firebase 满员受阻 [#147269](https://github.com/NousResearch/hermes-agent/issues/147269)），语音相关 PR #157200、#81695 持续推进——路线图明确
- **遥测/成本可观测性**（[#6642](https://github.com/NousResearch/hermes-agent/issues/6642)）+ 桌面长帧指标（#153070）：观测性方向多线并进
- **多用户隔离与身份权限**（[#21574](https://github.com/NousResearch/hermes-agent/issues/21574)）：与 #59293 审批层绕过问题同源，安全架构重构诉求强烈
- **WhatsApp 桥接 API**（[#69659](https://github.com/NousResearch/hermes-agent/issues/69659)）：平台扩展持续补齐

---

## 7. 用户反馈摘要

- **痛点集中在长时运行与多 profile**：kanban 调度卡死、会话状态毒化、profile 切换路由失败——核心用户已将 Hermes 用于生产级自动化
- **Windows 是二等公民观感**：文件写入、gateway 死锁（[#41219](https://github.com/NousResearch/hermes-agent/issues/41219)）、保留名崩溃（[#141599](https://github.com/NousResearch/hermes-agent/issues/141599)）、桥接 spawn 失败（[#68128](https://github.com/NousResearch/hermes-agent/issues/68128)），Windows 用户抱怨密集
- **升级路径不信任**：venv 重建丢插件依赖、热更新 SQLite 锁死，用户对 `hermes update` 存在戒备
- **正面信号**：用户深度参与安全讨论（#21574 的 prompt injection 案例）、RFC 质量高、新模型（GPT-6.2）接入响应快、桌面端体验优化有感知

---

## 8. 待处理积压

| Issue | 年龄 | 状态 | 建议 |
|---|---|---|---|
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) | ~6 周 | blocked/upstream | 影响外部贡献，建议联系 GitHub 支持或提供替代流程 |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | ~4.5 月 | needs-decision | 安全类问题长期未决，应提升优先级 |
| [#41219](https://github.com/NousResearch/hermes-agent/issues/41219) | ~5 月 | OPEN | Windows gateway 死锁，复现确定性强 |
| [#98634](https://github.com/NousResearch/hermes-agent/issues/98634) | ~2.5 月 | OPEN | `file.attach` 引用永远被拒绝，功能实质不可用 |
| [#122609](https://github.com/NousResearch/hermes-agent/issues/122609) | ~2 月 | OPEN（bot） | Skills 索引持续降级 28h+，影响文档站，CI 修复应很快 |
| [#18990](https://github.com/NousResearch/hermes-agent/issues/18990) | ~6.5 月 | OPEN | Kimi 视觉支持已上游恢复，一行修复级改动长期悬置 |

**结构性提醒**：今日关闭/新增 Issue 比约 1:20，待合并 PR 高达 402 个，审核带宽可能是当前最大瓶颈。

---

*数据来源：GitHub API（过去 24 小时窗口）。本报告由开源项目分析生成。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*