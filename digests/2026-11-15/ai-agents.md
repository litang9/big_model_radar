# OpenClaw 生态日报 2026-11-15

> Issues: 398 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-14 23:53 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-15

> 数据周期：2026-11-14 00:00 至 24:00 (UTC)

---

## 1. 今日速览

OpenClaw 今日保持**高度活跃**状态：Issues 更新 398 条（新开/活跃 330，关闭 68），PR 更新 500 条（待合并 341，已合并/关闭 159），无新版本发布。社区贡献呈"机器人驱动 + 人类维护者审核"双轨模式：@roboclaw-bot 今日集中提交了十余个 UI/文档修复 PR（多为 XS/S 尺寸、附截图验证、标记"ready for maintainer look"），@vincentkoc 推进测试覆盖率整合工作，@steipete 继续投入 Gateway 稳定性修复。议题焦点集中在**更新/升级链路可靠性（P0 级问题两个）、原生 Codex 子代理回归、以及 Prompt 缓存失效**三大主题上，与近期 2026.11.x 版本迭代节奏高度相关。

---

## 2. 版本发布

今日无新版本发布。（最近版本为 2026.11.1–2026.11.3 系列相关 Issue 中提及，但 Release 通道无更新。）

---

## 3. 项目进展

今日关闭/合并 159 条 PR，重点推进方向：

**稳定性与升级链路**
- [#197510](https://github.com/openclaw/openclaw/pull/197510)（@steipete, XL, security-sensitive）"reduce Gateway stalls under filesystem pressure"——将 Gateway 请求/定时器路径中的同步路径查找迁移到异步 worker，消除主机 I/O 停顿引发的全 Gateway 暂停。这是近期最重要的架构级修复之一。
- [#198659](https://github.com/openclaw/openclaw/pull/198659) 修复备份清理与验证的并发竞争，备份 scratch 现在保持独占 custody。
- [#199312](https://github.com/openclaw/openclaw/pull/199312)（@steipete，已关闭）修复 main 分支 unused-export 检查，维护 CI 绿色。

**Control UI / 端侧体验**（@roboclaw-bot 密集提交）
- [#199315](https://github.com/openclaw/openclaw/pull/199315) 自动化时区改为可搜索选择器，免手输 zone ID
- [#199320](https://github.com/openclaw/openclaw/pull/199320) Android 端同类时区改进
- [#199311](https://github.com/openclaw/openclaw/pull/199311) 宽窗口下 composer 保持展开
- [#199313](https://github.com/openclaw/openclaw/pull/199313) 三击选择修复；[#199317](https://github.com/openclaw/openclaw/pull/199317) WhatsApp 未链接状态误报修复；[#199298](https://github.com/openclaw/openclaw/pull/199298) Scribes 历史读取失败不再伪装为空历史

**功能与测试**
- [#199197](https://github.com/openclaw/openclaw/pull/199197)（P1，已关闭）修复隔离运行的调度任务无法读写自身 scratch
- [#198961](https://github.com/openclaw/openclaw/pull/198961) / [#198957](https://github.com/openclaw/openclaw/pull/198957)（XL）测试覆盖整合系列持续推进

**整体评估**：机器人 PR 产能高但多数仍处于"待维护者审阅"状态，实际合并吞吐受维护者带宽制约；升级/稳定性方向（steipete 路线）是当前最明确的推进主线。

---

## 4. 社区热点

| Issue | 主题 | 讨论热度 |
|---|---|---|
| [#172837](https://github.com/openclaw/openclaw/issues/172837)（已关闭） | Codex 原生子代理 assignments 永不清理，父线程反复重发 | 20 评论 |
| [#44309](https://github.com/openclaw/openclaw/issues/44309)（已关闭） | A2A 交接的单向派发模式（无回环 ping-pong） | 18 评论 |
| [#143017](https://github.com/openclaw/openclaw/issues/143017) | Prompt 缓存前缀被 5 种方式重写，实测 21.3M cache-write tokens | 16 评论 |
| [#162585](https://github.com/openclaw/openclaw/issues/162585) | Windows 插件 source-capture 无限自递归，290MB→612MB+ | 16 评论 |
| [#163739](https://github.com/openclaw/openclaw/issues/163739) | Ctrl+Shift+A 与浏览器快捷键冲突，无法重映射 | 15 评论 |
| [#192632](https://github.com/openclaw/openclaw/issues/192632) | 请求 Claude 服务端 web_search provider | 15 评论 |
| [#182891](https://github.com/openclaw/openclaw/issues/182891) | 每次请求缓存 read 从 N 跌至 0 | 14 评论 |

**诉求分析**：
- **成本焦虑**是核心驱动：#143017、#182891、#177506 均围绕 prompt cache 失效导致 token 费用暴涨，用户 @abacha 提供了 949 条生产请求的抓包级证据，属于社区最高质量报告之一。
- **多智能体编排**需求强烈：#44309（单向 handoff）、#196199、#194403（子代理完成回调丢失）显示 A2A/子代理是重度用户的主要使用场景。
- **快捷键/UX 细节**（#163739）反映 Control UI 作为日常操作界面后用户对可配置性的期待。

---

## 5. Bug 与稳定性（按严重程度）

### P0（发布阻塞级）
1. **[#193094](https://github.com/openclaw/openclaw/issues/193094)** 托管更新在 validating 阶段挂起 57 分钟（3414s vs 1800s 预算），最终被 SIGKILL — 无 fix PR ⚠️
2. **[#194664](https://github.com/openclaw/openclaw/issues/194664)** (2026.11.1) Codex protected continuation 阻塞所有后续消息，而 session Stop 又显示无活跃 run — 无 fix PR ⚠️
3. **[#161800](https://github.com/openclaw/openclaw/issues/161800)** iOS 内嵌 Dashboard 每次页面加载创建新设备身份，配对请求循环（标记 needs-security-review）— 无 fix PR ⚠️

### P1（回归/功能损坏）
4. **[#196199](https://github.com/openclaw/openclaw/issues/196199)** 2026.10.10 回归：原生 Codex helper 完成后无法恢复父会话，goals 暂停、用户被锁在助手外 — 无 fix PR ⚠️
5. **[#191847](https://github.com/openclaw/openclaw/issues/191847)** 大型会话反复杀死 512MB SQLite worker（ERR_WORKER_OUT_OF_MEMORY）— 无 fix PR ⚠️
6. **[#196820](https://github.com/openclaw/openclaw/issues/196820)** 2026.11.2 回归：Control UI 陷入 `Element.getAnimations()` 100% CPU 死循环 — 无 fix PR ⚠️
7. **[#128140](https://github.com/openclaw/openclaw/issues/128140)** memory_search 工具恒定 15s 超时而 CLI 正常（长期未解）
8. **[#196656](https://github.com/openclaw/openclaw/issues/196656)** Windows 2026.11.1 子代理 announce/authority 系列失败

### 其他值得注意
- **[#197083](https://github.com/openclaw/openclaw/issues/197083)** 升级后 Doctor WAL 校验失败导致 11.3 更新半途而废
- **[#197531](https://github.com/openclaw/openclaw/issues/197531)** macOS TTS 分段 MP3 转换后音频丢失

**趋势预警**：2026.10.10–2026.11.x 引入的原生 Codex 子代理回归（#196199、#194664、#194403、#196656）形成一族相关问题，且均无 fix PR，建议维护者优先定位共同根因。

---

## 6. 功能请求与路线图信号

**有 PR 支撑、短期可能落地**：
- 时区选择器（[#199315](https://github.com/openclaw/openclaw/pull/199315) Web + [#199320](https://github.com/openclaw/openclaw/pull/199320) Android 已双端实现）
- 命令自动化实时输出查看（[#186888](https://github.com/openclaw/openclaw/pull/186888)，XL，需安全审查）
- Agent Thinking 默认值 UI 编辑（[#198399](https://github.com/openclaw/openclaw/pull/198399)）
- 运行时 skill 使用审计（[#141004](https://github.com/openclaw/openclaw/pull/141004)，9 月起持续更新）

**社区呼声高、尚无实现**：
- Claude 服务端 web_search provider（[#192632](https://github.com/openclaw/openclaw/issues/192632)）— 与现有 Gemini/Perplexity provider 形态一致，实现路径清晰
- A2A 单向派发模式（[#44309](https://github.com/openclaw/openclaw/issues/44309)）
- 隐藏 agent 但保持可 spawn（[#166678](https://github.com/openclaw/openclaw/issues/166678)）
- 运行级 turn/token 预算（[#178373](https://github.com/openclaw/openclaw/issues/178373)）— 成本治理类诉求的代表

---

## 7. 用户反馈摘要

**痛点（按提及频率）**：
1. **Token 成本失控**：缓存失效（#143017、#182891、#177506）、子代理花费不可归因（#130257，父 turn $0.04 vs 子 $14.14）——自托管重度用户最强烈的不满。
2. **升级即故障**：2026.9.7→2026.10.10→2026.11.x 的升级路径上连续出现问题（OOM、子代理回归、更新挂起），多位用户表示升级前需要观望。
3. **可诊断性差**：16 处调用点抛出字节级相同的错误串、无 reason code（#127195），生产排障靠猜。
4. **memory_search 长期不稳**：超时/挂起问题自 2026.8 起持续存在（#128140、#136405、#180978）。

**满意点**：
- Issue 回应体系（ClawSweeper 自动分诊 + issue-rating 分级）被高质量报告者认可；
- CLI 与 Gateway 的功能覆盖全面，多渠道（Telegram/WhatsApp/Teams/Mattermost/iMessage）适配是核心吸引力；
- 社区报告质量高（抓包、生产数据、VACUUM INTO 复制库验证等），说明吸引了专业运维型用户群。

---

## 8. 待处理积压

**高影响、长期无 fix PR**：
- [#178373](https://github.com/openclaw/openclaw/issues/178373) 无 run 级预算 + 工具循环检测默认关闭 + 历史重复计费（P2，2026-10 开，needs-product-decision）
- [#160719](https://github.com/openclaw/openclaw/issues/160719) sessions.delete 静默保留无效 session_windows 行，无任何 CLI/doctor/reaper 路径可清理
- [#130247](https://github.com/openclaw/openclaw/issues/130247) Cron 无终止条件（--until/--max-runs 缺失，2026-08 开）
- [#127195](https://github.com/openclaw/openclaw/issues/127195) 错误信息无判别码（2026-08 开，fix-shape-clear 但无人认领）
- [#143206](https://github.com/openclaw/openclaw/issues/143206) Dreaming 失败运行被记为成功

**长期悬置 PR**：
- [#141004](https://github.com/openclaw/openclaw/pull/141004) skill 使用审计（2026-09 开，XL，needs proof）
- [#144736](https://github.com/openclaw/openclaw/pull/144736) sandbox scp 无 deadline 泄漏（2026-09 开，waiting on author）
- [#164229](https://github.com/openclaw/openclaw/pull/164229) Talk 浏览器调用模型路由（P1，2026-10 开，ready for maintainer look）
- [#165805](https://github.com/openclaw/openclaw/pull/165805) 目录列表 32 页后停止（2026-10 开，needs proof）

**给维护者的建议优先级**：① 原生 Codex 子代理回归族（#196199/#194664/#194403）；② 托管更新 P0 双问题（#193094/#197083）；③ prompt-cache 成本族（有完整复现证据，用户信任正在流失）。

---

*本报告基于 GitHub 公开数据自动汇总，评论数为快照值，链接均指向对应 Issue/PR。*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析
**数据日期：2026-11-15 | 覆盖项目：OpenClaw、Hermes Agent**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入“生产化攻坚期”：项目不再比拼功能数量，而是比拼**可靠性、安全边界与成本可控性**。两大头部项目的动态高度同构——都在经历网关/编排层架构重构后的余波（OpenClaw Gateway 稳定性、Hermes unified gateway #106742 fallout），都以“消息不丢、任务不中断”为社区底线诉求。同时，**安全加固正在从被动响应转向主动冲刺**（Hermes sec-marathon 单日落地 8+ 安全 PR），**Token 成本治理**（缓存失效、预算控制、花费归因）成为自托管重度用户的最强付费敏感点。生态整体活跃度极高且议题质量专业化（抓包级证据、生产数据复现），表明核心用户群已从尝鲜者转向运维型/生产型用户。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（新开/活跃 / 关闭） | 398（330 / 68） | 500（298 / 202） |
| PR 更新（待合并 / 合并+关闭） | 500（341 / 159） | 500（203 / 297） |
| Release | 无（最近 2026.11.1–11.3 系列） | v0.23.1+canary（canary 通道） |
| Issue 关闭率 | ~17% | ~40% |
| PR 合并吞吐 | 偏低（受维护者审阅带宽制约） | 高 |
| 贡献模式 | 机器人（roboclaw-bot）量产 + 人类维护者审核双轨 | 个人安全贡献者集中冲刺（@c2h5oh）+ 官方维护者工作流线 |
| **健康度评估** | ⚠️ 中等偏风险：P0×3 无 fix PR，回归族（Codex 子代理）扩散，积压增长快于关闭 | ✅ 相对健康：高吞吐高关闭率，安全响应快，但 P1 worker 数据丢失类无修复 |

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **多渠道覆盖最广**（Telegram/WhatsApp/Teams/Mattermost/iMessage），是跨平台个人助手场景的差异化护城河；
- **用户报告质量与工具链成熟度高**：自动分诊（ClawSweeper）+ issue-rating 分级体系获高质量报告者认可；
- 架构级修复能力强（如 #197510 同步路径查找迁移异步 worker），存在明确的维护者技术主线（@steipete 的 Gateway 稳定性路线）。

**技术路线差异：**
- OpenClaw 走**原生子代理 + Gateway 单体稳定性**路线，但 2026.10.10–11.x 的 Codex 子代理回归族暴露出迭代节奏快于回归测试覆盖的问题；
- Hermes 走**统一网关 + 安全边界显式化**路线（MCP 信任门控、profile 越权防护），且以 RFC/ABC 接口治理（如 #77111 语音 ABC）管理贡献竞争，工程治理更制度化。

**社区规模对比：** 两者 GitHub 活动量同处第一梯队（双双触及 500 条/日的更新上限），但 Hermes 关闭率（40% vs 17%）显示其维护带宽相对议题量更充裕；OpenClaw 依赖机器人 PR 产能，实际合并受人类审阅者瓶颈制约。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目与具体诉求 |
|---|---|
| **调度任务可靠性** | OpenClaw #199197（隔离调度任务 scratch 读写）、#130247（Cron 无终止条件）；Hermes #155438（cron 5xx 后自动重跑）、#135487（DB locked 丢执行记录）——双方都在补“自动化任务不能静默失败”的底座 |
| **网关/进程编排稳定性** | OpenClaw #197510（Gateway I/O 停顿）、#193094（更新挂起）；Hermes #145022/#147839（worker 崩溃丢回合）、#139532（重启后会话 fence） |
| **MCP/子代理信任与安全边界** | Hermes #155565（MCP 默认 full 信任漏洞）、#155553（PID kill 防护）；OpenClaw #161800（设备身份循环，needs-security-review） |
| **Token 成本治理** | OpenClaw 独有但强烈：#143017（21.3M cache-write）、#178373（run 级预算缺失）、#130257（子代理花费不可归因） |
| **Codex/多后端兼容** | OpenClaw 原生 Codex 子代理回归族；Hermes #148898（Codex 后端 HTTP 400） |
| **升级链路可靠性** | OpenClaw “升级即故障”（#193094/#197083）；Hermes #46276（systemd PATH）、#140080（Termux update 崩溃） |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道消息接入、Control UI 端侧体验、子代理编排 | Desktop 体验、Kanban/cron 生产自动化、实时语音（RFC 进行中）、插件生态 |
| 目标用户 | 跨渠道重度自托管用户（多 IM 接入）、多智能体编排用户 | 生产自动化用户（任务不丢是底线）、桌面端个人用户、插件开发者 |
| 架构 | Gateway 集中式 + 机器人量产贡献流 | Unified gateway + 多 worker（Kanban/cron）+ ABC 接口治理 |
| 短板 | 成本不可观测、可诊断性差（错误无判别码）、回归测试不足 | 会话可靠性 fallout 未收尾、桌面基础体验积压（换行 5 个月未修） |

---

## 6. 社区热度与成熟度

- **同处“快速迭代期”，但阶段分化明显：**
  - **Hermes：快速迭代 + 质量收尾并行**——canary 通道、安全马拉松、40% 关闭率，处于“功能扩张中主动还债”阶段；
  - **OpenClaw：快速迭代 + 债务累积**——17% 关闭率、3 个 P0 无 fix PR、回归族扩散，积压增速快于清偿，处于需要“稳定版本肃清期”的临界点。
- 两者的成熟度信号均指向：生态已从 MVP 竞争进入**信任竞争**（升级安全性、消息可靠性、成本透明度决定用户留存）。

---

## 7. 值得关注的趋势信号

1. **成本可观测性将成为标配需求**：OpenClaw 用户的抓包级成本证据（21.3M tokens、$0.04 vs $14.14 归因失控）预示 prompt-cache 保真、run 级预算、花费归因工具是下一个竞争高地——对开发者的启示：**从第一天就把 token 计量做成一等公民**。
2. **安全从合规走向“注入防御 + 信任门控”**：Hermes 的威胁扫描器拦截 prompt 注入、MCP 信任显式化、凭据脱敏，标志着 agent 安全面从传统 CVE 扩展到 agent 特有攻击面。
3. **接口先行（ABC/RFC）治理贡献竞争**：Hermes 用 RealtimeVoiceProvider ABC 化解 4 个竞争 PR，是开源 agent 项目应对功能碎片化的可复制模式。
4. **自动化任务的“静默失败零容忍”**：cron 重跑、worker receipt、执行记录持久化在两个项目同时涌现——可靠性语义（at-least-once）正被引入 agent 调度层。
5. **升级链路是留存生命线**：“升级前观望”情绪（OpenClaw）vs canary 灰度通道（Hermes）对比显示，**发布通道设计本身就是产品能力**。

**给技术决策者的建议**：选型时 Hermes 适合生产自动化优先场景；OpenClaw 适合多渠道接入场景，但当前建议锁定稳定版本、暂避 2026.11.x 升级，直至 Codex 子代理回归族与更新挂起 P0 有 fix PR 落地。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-15

## 1. 今日速览

过去 24 小时 Hermes Agent 保持了极高的社区活跃度：Issues 更新 500 条（新开/活跃 298，关闭 202），PR 更新 500 条（待合并 203，已合并/关闭 297），并发布了 1 个 canary 版本。项目处于**高吞吐、快节奏迭代**状态，关闭速度与新开速度基本持平，积压风险可控。当日最显著的工程活动是持续到第二天的 **sec-marathon-2026-11-13 安全加固马拉松**，由 @c2h5oh 集中提交的一批安全修复 PR 多数已合并/关闭。同时，10 月合入的 unified gateway（#106742）余波仍在，相关稳定性问题（会话丢失、Kanban worker 崩溃）仍是社区讨论焦点。

## 2. 版本发布

- **v0.23.1+canary.20261114T064334Z**（发布于 2026-11-14）
  - 链接：见 [Releases](https://github.com/NousResearch/hermes-agent/releases)
  - 这是一个 canary 预发布通道版本，主要面向早期验证用户，提供 Hermes Desktop 的 macOS Apple Silicon DMG 等多平台构建。
  - 从当日活跃 Issue 的环境信息看（仍有用户报告 v0.21.x/v0.22.x），canary 与稳定线并行推进。canary 版本不建议生产环境使用；关注后续稳定版发布说明以确认是否包含 sec-marathon 系列修复与 gateway 稳定性修复。

## 3. 项目进展

当日合并/关闭的 297 条 PR 中，重点包括**安全加固集群**与**gateway/调度修复**：

**安全加固（sec-marathon-2026-11-13，SECURITY.md §3.2 系列）——贡献者 @c2h5oh：**
- [#155427](https://github.com/NousResearch/hermes-agent/pull/155427)（已关闭）：dashboard 仅 HTTPS 前缀 cookie、Kanban WebSocket host/origin 门控、media-proxy 逐跳 allowlist
- [#155566](https://github.com/NousResearch/hermes-agent/pull/155566)（已关闭）：阻止 Claude Code OAuth token 发往 Azure Foundry 端点
- [#155567](https://github.com/NousResearch/hermes-agent/pull/155567)（已关闭）：gateway 拒绝 multiplexer 未服务的命名 profile，防越权路由
- [#155565](https://github.com/NousResearch/hermes-agent/pull/155565)（已关闭）：MCP 缺失信任记录不再默认按 `full` 信任执行——修复了一个**未受门控运行不可信 MCP server** 的实质漏洞
- 仍在待合并：[#155442](https://github.com/NousResearch/hermes-agent/pull/155442)（读取 `.aws/credentials`/`.netrc` 等凭据文件时脱敏）、[#155553](https://github.com/NousResearch/hermes-agent/pull/155553)（拒绝网关内部按字面 PID kill 监管进程）、[#155230](https://github.com/NousResearch/hermes-agent/pull/155230)（威胁扫描器拦截 "forget your instructions" 类注入）、[#155360](https://github.com/NousResearch/hermes-agent/pull/155360)（插件刷新不跨越 secret scope/homes）

**功能性修复：**
- [#153568](https://github.com/NousResearch/hermes-agent/pull/153568)（已关闭，ci-reviewed）：修复 `/new` 后全部为 `/moa` 回合的会话中后台结果被丢弃的问题
- [#155438](https://github.com/NousResearch/hermes-agent/pull/155438)（待合并）：cron 任务在 provider 5xx/过载中断后按 5/15/30 分钟自动重跑，避免日报跳过整天
- [#155246](https://github.com/NousResearch/hermes-agent/pull/155246)：Desktop 外部登录卡片 UI/错误指引修复
- [#155888](https://github.com/NousResearch/hermes-agent/pull/155888)：Email adapter 发布连接状态到 `gateway_state.json`

**生态/插件目录：** 多个 plugin-catalog pin 更新（[#155004](https://github.com/NousResearch/hermes-agent/pull/155004)、[#155240](https://github.com/NousResearch/hermes-agent/pull/155240)、[#155890](https://github.com/NousResearch/hermes-agent/pull/155890)、[#155604](https://github.com/NousResearch/hermes-agent/pull/155604)），目录治理流程（rule 4/5）运转顺畅。

整体看，安全边界加固是当日最大推进，约 8+ 个安全 PR 落地；gateway 会话可靠性的外围修复也在持续跟进。

## 4. 社区热点

1. **[#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（已关闭，229 评论）** — unified gateway 合入后的 post-merge 修复追踪 issue。超高评论量反映 10 月 #106742 合入后**单网关进程接管所有本地会话**的架构迁移对存量用户冲击极大（Windows、消息投递、会话状态、兼容性多个 sweeper 风险标签）。
2. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（开放，69 评论）** — 作为 #134889 的续接，继续追踪 unified gateway 在 main 上的遗留问题。社区核心诉求：**稳定性优先于新功能**，希望网关重构的余波尽快收尾。
3. **[#77111](https://github.com/NousResearch/hermes-agent/issues/77111)（29 评论，👍 4）** — RFC：为四个竞争中的 duplex 语音 PR 设计 `RealtimeVoiceProvider` ABC。触发项目自己的 "Footprint Ladder" 规则（3+ 同类 PR 应先定接口）。这是当日最有价值的设计讨论，显示社区希望实时语音能力以**可插拔接口**形式落地。
4. **[#105758](https://github.com/NousResearch/hermes-agent/issues/105758)（30 评论）** — 生命周期守卫误杀良性 Node.js CLI 命令（64 处 token 扫描误报），影响日常工具链使用，长期 needs-decision。
5. **[#52952](https://github.com/NousResearch/hermes-agent/issues/52952)（👍 3）** — Desktop 回车即发送、不支持换行，5 个月未修的老问题，是桌面端用户体验最集中的吐槽点。

## 5. Bug 与稳定性（按严重度）

**P1：**
- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022)：多 Kanban worker 并发时网关卡顿导致 worker 崩溃（"Kanban execution unknown"），进行中工作丢失。**暂无直接 fix PR**，与 #147839 同属 worker 可靠性族。
- [#135487](https://github.com/NousResearch/hermes-agent/issues/135487)：cron worker 在 `database is locked` 时任务执行记录丢失（`adopt_claimed_execution()` 无重试）。部分缓解可能来自 [#155438](https://github.com/NousResearch/hermes-agent/pull/155438) 的重跑机制，但根因未修。
- [#147839](https://github.com/NousResearch/hermes-agent/issues/147839)：单次 20s `worker_receipt_timeout` 毒化存储并销毁整个回合（用户看到 "No reply"），同一安装上 11 次发生。**暂无 fix PR**。

**P2（部分已有修复路径）：**
- [#139532](https://github.com/NousResearch/hermes-agent/issues/139532)：网关 mid-turn 重启将会话 fence 为 unknown，后续消息永久排队，桌面端无恢复手段——unified gateway fallout。
- [#139662](https://github.com/NousResearch/hermes-agent/issues/139662)：Discord/飞书/企微会话在网关重启后 `session.resume` 返回 `not_found`，桌面端无法恢复。
- [#148898](https://github.com/NousResearch/hermes-agent/issues/148898)：#136916 引入的 zstd 请求压缩导致 Codex 后端间歇性 HTTP 400（标记 cause/upstream）。
- [#143313](https://github.com/NousResearch/hermes-agent/issues/143313)：Python 3.14 下 `pip install -e .` 依赖冲突（Pillow 13.0.0 vs browser-harness 的 pillow 12.3.0），阻塞新 Python 用户。
- [#146440](https://github.com/NousResearch/hermes-agent/issues/146440)：Windows 下 Kanban managed worker 初始化死锁（stdin 控制管道继承 + numpy 懒加载）。
- [#140080](https://github.com/NousResearch/hermes-agent/issues/140080)：Android/Termux 上 `hermes update` 因 `os.link` 不存在而崩溃（未捕获 AttributeError）。

**安全类：** [#62336](https://github.com/NousResearch/hermes-agent/issues/62336)（P3 但性质严重）：终端环境快照将含密钥的环境变量持久化到磁盘，长期开放，建议尽快处理。

**已修复/关闭（今日）：** #136486（reasoning 别名重复字段致 HTTP 400）、#122656（Desktop 空转更新器死循环）、#96180（update 丢失 telegram extras）、#68911（E.164 号码过度脱敏）、#58778（MCP form elicitation 返回空内容）。

## 6. 功能请求与路线图信号

- **实时语音接口化（[#77111](https://github.com/NousResearch/hermes-agent/issues/77111)）**：四个竞争 PR + RFC 讨论活跃，最可能按项目自身规则以 ABC + orchestrator 模式纳入近期版本。
- **ACP Registry 注册（[#47435](https://github.com/NousResearch/hermes-agent/issues/47435)）**：适配 Zed v1.5+ 弃用自定义 agent_servers 的趋势，接入成本低，社区呼声明确。
- **Vision 探测（[#131208](https://github.com/NousResearch/hermes-agent/issues/131208)）**：对未知模型 ID 用 live probe 检测视觉能力，属低成本改进。
- **cron 可靠性（[#155438](https://github.com/NousResearch/hermes-agent/pull/155438)）**：已进入 PR 阶段，大概率随下个版本发布。
- **Profile 生命周期整合（[#155595](https://github.com/NousResearch/hermes-agent/issues/155595)）**：11-14 新开的官方 handoff 追踪 issue，表明 profile 创建/生命周期是当前维护者的正式工作流线。

## 7. 用户反馈摘要

- **最大痛点是 unified gateway 迁移后的会话可靠性**：多平台用户（Telegram、Discord、飞书、企微、Desktop）反复报告重启后消息丢失/排队/会话不可恢复。用户认可统一网关的方向，但要求“消息绝不丢”这条底线被守住。
- **Kanban/cron 自动化用户**对 worker 崩溃丢工作、任务执行记录丢失、调度跳时段非常敏感——这些用户把 Hermes 当生产级自动化工具用。
- **Desktop 体验**：换行输入缺失（#52952）这类“小问题”长期不修在累积负面情绪。
- **积极面**：自动 issue 提交（#125702 等）说明 agent 自诊断工作流在被真实使用；plugin-catalog 治理流程吸引了多位外部插件作者主动提 PR，生态在健康扩张；安全马拉松响应速度快，社区对 @c2h5oh 系列加固评价正面。

## 8. 待处理积压

| Issue | 存续时间 | 状态 | 建议 |
|---|---|---|---|
| [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) 安全：环境快照泄露凭据到磁盘 | 4 个月+ | needs-decision | **高优先**，安全类不应长期挂起；sec-marathon 是处理窗口 |
| [#52952](https://github.com/NousResearch/hermes-agent/issues/52952) Desktop 换行 | 4 个月+ | 开放，👍 3 | 小改动高感知，建议安排 |
| [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) 生命周期守卫误报 | 2 个月+ | needs-decision | 与 #155553 生命周期 PR 同族，可一并处理 |
| [#46276](https://github.com/NousResearch/hermes-agent/issues/46276) systemd 用户单元 PATH 过期 | 5 个月 | 开放 | 反复出现，影响升级体验 |
| [#77111](https://github.com/NousResearch/hermes-agent/issues/77111) 语音 ABC RFC | 3 个月+ | needs-decision | 有 4 个 PR 被阻塞，等待接口决策 |
| [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) / [#147839](https://github.com/NousResearch/hermes-agent/issues/147839) worker 可靠性 | 2-3 周 | 开放，无 fix PR | P1 级数据丢失，建议优先 |

**健康度小结**：项目吞吐量与响应速度优秀（当日关闭率约 40%），安全响应是亮点；主要风险集中在 unified gateway 迁移余波的会话可靠性（P1/P2 多个无修复 PR）和少量安全/体验类长期积压。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*