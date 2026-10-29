# OpenClaw 生态日报 2026-10-30

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-29 23:55 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-10-30

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时 Issue 更新 500 条（新开/活跃 340，关闭 160），PR 更新 500 条（待合并 298，合并/关闭 202），吞吐处于健康区间。项目发布 **2 个新版本**（`v2026.10.9` 常规稳定版 + `v2026.9.36` extended-stable/LTS 通道），核心内容为运行时依赖安全补丁。社区贡献活跃，多个社区 PR 已进入 "ready for maintainer look" 状态。但需要警惕的是：**Gateway 状态管理（SQLite WAL/checkpoint/lease）和记忆提升（memory promotion）子系统持续聚集高严重度未修复 Bug**，其中多个 P0 级问题已开放数周。

---

## 2. 版本发布

### v2026.10.9（稳定版）
- **安全补丁为主**：修复存在漏洞的运行时依赖——
  - `fast-uri 4.2.3`：在 MCP schema 校验中拒绝畸形 URI scheme/host；
  - Zod：对 A2UI 与 Discord embedded app SDK 中超大集合提前拒绝；
  - `nodemailer 10.1.4`：IMAP 发件人解析修复伪造发件人问题。
- **配套追踪**：发布验证中发现的 flaky tests 已由 [#187490](https://github.com/openclaw/openclaw/issues/187490) 跟踪，按策略需在 `main` 上并行修复。
- 无明显破坏性变更，属常规升级。

### v2026.9.36（extended-stable，LTS 通道）
- 仅 Gateway 组件的 `extended-stable` 发布：基于 2026 年 9 月底代码 + 关键安全更新、可靠性/性能修复及新模型支持。
- **运维提示**：LTS 用户应关注 Gateway 单独升级路径，与完整版本节奏解耦。

---

## 3. 项目进展

今日 PR 合并/关闭 202 条，活跃 PR 覆盖网关、多渠道、macOS 客户端与基础设施：

- **安全/正确性加固**（来自 @SunnyShu0925 的高质量系列，均"ready for maintainer look"）：
  - [#186584](https://github.com/openclaw/openclaw/pull/186584) 消费已完成读取前重新校验 state read admission（关闭 #184738）
  - [#185896](https://github.com/openclaw/openclaw/pull/185896) 管理服务 handoff 截止时间改用单调时钟
  - [#186033](https://github.com/openclaw/openclaw/pull/186033) 管理更新 handoff 输出拒绝有损 UTF-8 解码
- **渠道质量**：@SunnyShu0925 集中提交三个 Unicode 规范化（NFD/NFC）搜索修复——[#187955](https://github.com/openclaw/openclaw/pull/187955)(MS Teams)、[#187954](https://github.com/openclaw/openclaw/pull/187954)(WhatsApp)、[#187953](https://github.com/openclaw/openclaw/pull/187953)(Buzz)，系统性解决多语言搜索 miss。
- **性能/内存**：[#187440](https://github.com/openclaw/openclaw/pull/187440) 限制可重载聊天历史窗口（直击长会话内存膨胀痛点）；[#187942](https://github.com/openclaw/openclaw/pull/187942) 降低 transcript stats worker 内存开销。
- **macOS**：[#186259](https://github.com/openclaw/openclaw/pull/186259)（P1）修复 New Thread 递归创建导致的内存耗尽。
- **大型功能**：[#164607](https://github.com/openclaw/openclaw/pull/164607)(XL) 在 Profile 中管理渠道身份链接，已过 canonical CI，持续推进中。

整体看，项目在**稳定性打磨和多渠道细节质量**上稳步前进，社区驱动的小粒度修复贡献占比显著。

---

## 4. 社区热点

| Issue | 评论 | 焦点 |
|---|---|---|
| [#164294](https://github.com/openclaw/openclaw/issues/164294) Gateway state DB WAL auto-checkpoint 永不完成 | 38 | 进程内 reader 持久 pin WAL，17k 帧 checkpoint 一直 blocked，涉及底层 SQLite 生命周期设计 |
| [#120385](https://github.com/openclaw/openclaw/issues/120385) Code Mode 定时/cron 任务 MCP 工具目录不完整 | 22 | 定时任务场景工具注册缺失，仅显示"Exec failed"，诉求是 cron 场景可用性 |
| [#150635](https://github.com/openclaw/openclaw/issues/150635) 短期记忆每日驱逐、dreaming deep phase 永不提升 | 22 | 512 条上限下记忆管道失效，已有 linked PR 开放 |
| [#164923](https://github.com/openclaw/openclaw/issues/164923) 兄弟 workspace 记忆提升 0/512 vs 50-90% | 19 | 原始对话片段被结构性拒绝，指向晋升过滤器缺陷 |
| [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 agent 永久 UNAVAILABLE（P0） | 18 | reclamation checkpoint 失败导致消息丢失+agent 不可用 |

**诉求分析**：讨论热度最高的集中在两块——① **记忆/dreaming 子系统的正确性**（150635、164923、157827、172547 形成问题簇），用户重度依赖长期记忆但晋升管道存在结构性缺陷；② **Gateway 状态底座可靠性**（WAL、lease、session reclamation），影响生产部署信心。

---

## 5. Bug 与稳定性（按严重度）

**P0**
- [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 checkpoint 过期 → agent 永久拒绝服务+消息丢失。状态：needs-repro，**无 fix PR**
- [#162211](https://github.com/openclaw/openclaw/issues/162211) 启动阻塞事件循环 40–200s → 健康监控误判 → 重启循环。**无 fix PR**
- [#158592](https://github.com/openclaw/openclaw/issues/158592) 睡眠唤醒后 runtime publication 超时，重启前所有入站消息失败。**无 fix PR**
- [#141413](https://github.com/openclaw/openclaw/issues/141413) macOS 应用对 SecretRef token 的 Gateway 不带认证（安全相关）。**无 fix PR**
- [#186813](https://github.com/openclaw/openclaw/issues/186813) 聊天内托管更新在 SQLite 锁竞争下死锁于 `epoll_wait` —— ✅ **已关闭**（可能是本日修复）

**P1**
- [#177656](https://github.com/openclaw/openclaw/issues/177656) 2026.10.5 上 native host exec 报 shared-state integrity-admission 错误（28+ 次失败），needs-maintainer-review
- [#172837](https://github.com/openclaw/openclaw/issues/172837) Codex 子代理 assignment 永不清理并重复重发（消息膨胀）
- [#166017](https://github.com/openclaw/openclaw/issues/166017) `mcp.sessionIdleTtlMs` 默认值未生效 → spawn broker 打满 256 子进程上限，所有 exec/MCP 失败。**已有 linked PR**
- [#159094](https://github.com/openclaw/openclaw/issues/159094) state-lifecycle lease 所有权冲突
- [#148789](https://github.com/openclaw/openclaw/issues/148789) 模型 fallback 链把 harness 错误误判为 provider 错误、耗尽全部候选（关联今日关闭的 [#178000](https://github.com/openclaw/openclaw/issues/178000) 同类问题——✅ 已有进展）
- [#178359](https://github.com/openclaw/openclaw/issues/178359) `doctor --fix` 卡在 plugin-capture 15+ 分钟无输出

**共性模式**：高严重度 Bug 集中在**非正常退出后的恢复路径**（崩溃、SIGKILL、睡眠唤醒）与 **SQLite 并发/lease 管理**，值得作为专项治理方向。

---

## 6. 功能请求与路线图信号

- [#6757](https://github.com/openclaw/openclaw/issues/6757) **Agent 自主上下文压缩（self-compact tool）**——由 OpenClaw agent 自主提交的需求，2 月提出仍活跃，与 compaction 相关 bug（158070）一起构成"上下文管理"路线信号。
- [#172547](https://github.com/openclaw/openclaw/issues/172547) 将 dreaming 输出排除出 memory-search 索引——已有 linked PR，**很可能近期落地**，与记忆子系统重构同向。
- [#140244](https://github.com/openclaw/openclaw/issues/140244) `infer model run` 支持 `--prompt-file`——自动化场景刚需，实现成本低，纳入概率高。
- [#163739](https://github.com/openclaw/openclaw/issues/163739) Control UI 快捷键可配置（Ctrl+Shift+A 冲突）——UX 打磨项。
- [#154524](https://github.com/openclaw/openclaw/issues/154524) 无障碍：聊天消息暴露为 headings——配合 [#187440](https://github.com/openclaw/openclaw/pull/187440) 的历史窗口治理，Chat UI 优化是明显方向。

---

## 7. 用户反馈摘要

**痛点**
- **生产环境稳定性不足**：多位自部署用户（macOS launchd、Linux systemd、Docker sandbox）报告崩溃/断电/睡眠唤醒后 agent 长时间不可用，需重启 Gateway 才能恢复（158592、166634、176342）。
- **资源占用**：MCP 子进程永不回收打满 256 上限（166017）、每 stdio 子进程 ~144MB 不可关闭的 wrapper 开销且重复拉起（164690）、session-resource-loader 每回合烧 100s CPU（163566）。
- **消息丢失**：Telegram mid-turn 消息直接丢失（160762）、compaction 失败 void 在途投递（158070）——用户明确表示这损害信任。
- **诊断性差**：16 处调用点抛出字节级相同的错误字符串、无法定位原因（127195）。

**正面/认可**
- 社区贡献者（@SunnyShu0925、@vincentkoc 等）产出高频、规范（proof/size/rating 标签齐全），说明贡献流程成熟。
- extended-stable（LTS）通道的存在受到生产用户欢迎。
- Agent 自主提交 feature request（#6757）展示了项目 dogfooding 特色。

**场景画像**：典型用户为多 agent + 多渠道（Telegram/Slack/Discord/WhatsApp/Teams）+ MCP 重度集成（单 session 13 个 stdio MCP server）的自托管部署，对长时运行稳定性要求极高。

---

## 8. 待处理积压

| 条目 | 状态 | 建议 |
|---|---|---|
| [#164294](https://github.com/openclaw/openclaw/issues/164294) WAL checkpoint 永久阻塞 | 38 评论，10 月初至今 | 高影响底层问题，建议维护者优先给出设计判断 |
| [#150743](https://github.com/openclaw/openclaw/issues/150743) QQ 渠道 Tencent 交接停滞 | stale，needs-product-decision | 中文用户群关切，需要官方表态长期支持计划 |
| [#112638](https://github.com/openclaw/openclaw/issues/112638) session.maintenance enforce 模式无上限 | 7 月至今 | 磁盘无界增长风险，需产品决策 |
| [#127195](https://github.com/openclaw/openclaw/issues/127195) 错误信息不可区分 | fix-shape-clear，待 review | 可观测性改进，成本低收益高 |
| [#126950](https://github.com/openclaw/openclaw/issues/126950) Telegram 回调静默丢弃 | linked PR open | PR 已挂一段时间，建议推进 review |
| [#155457](https://github.com/openclaw/openclaw/issues/155457) Anthropic 流式 JSON 畸形 | stale | 涉及 provider 侧行为，需明确缓解策略 |
| [#178405](https://github.com/openclaw/openclaw/pull/178405)（P0 PR）Host Desktop 恢复 | 10-20 开放 | P0 级 UI 修复，建议加速合并验证 |

**健康度总评**：⚠️ 社区活跃度与贡献质量优秀、发布节奏稳定（含 LTS 通道），但**恢复路径稳定性 + 记忆子系统正确性**两个问题簇中多个 P0/P1 长期无 fix PR，是当前最大的健康度风险。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告
**数据日期：2026-10-30 | 对比对象：OpenClaw、Hermes Agent**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**从功能扩张向生产可靠性攻坚的转折期**：头部项目均已覆盖多渠道（Telegram/Slack/Discord/WhatsApp/Teams）+ 多 agent + MCP 重度集成的基础能力，用户画像高度趋同——自托管、长期常驻、多平台重度用户。两个项目同时暴露出**网关/状态底座（SQLite 并发、lease、session 恢复）是当前共性最深的工程瓶颈**，说明“个人助理 7×24 长时运行”对传统应用状态管理提出了系统性挑战。同时，**插件目录生态（Hermes）与 agent 自主提交需求（OpenClaw #6757）** 代表了两种不同的生态扩展范式正在成型。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 340，关闭 160） | 344（新开/活跃 312，关闭 32） |
| PR 更新（24h） | 500（待合并 298，合并/关闭 202） | 500（待合并 445，合并/关闭 55） |
| Release | 2（v2026.10.9 稳定版 + v2026.9.36 LTS） | 0（v0.22.x 线） |
| PR 吞吐率（合并/待合并） | ~68%（202/298） | ~12%（55/445） |
| 版本策略 | 双通道（stable + extended-stable/LTS） | 单通道，v0.x 早期版本号 |
| 核心风险 | 恢复路径 + 记忆子系统 P0 长期无 fix | 统一网关重构后回归潮，PR 审阅积压严重 |
| 健康度评估 | ⚠️ 中高：发布节奏稳定、贡献质量高，但 P0 债务集中 | ⚠️ 中：社区参与度极高，但处于重构收敛期，稳定性压力明显 |

**关键差异**：OpenClaw Issue 关闭率（47%）远高于 Hermes（10%）；Hermes 的 445 条待合并 PR 与日合并 55 条形成显著审阅瓶颈，而 OpenClaw 吞吐处于健康区间。

---

## 3. OpenClaw 在生态中的定位

**优势**：
- **发布工程最成熟**：唯一提供 extended-stable/LTS 独立通道（且 Gateway 组件可单独升级），对生产自部署用户是明确差异化价值；
- **贡献流程规范化**：社区 PR 普遍带 proof/size/rating 标签（如 @SunnyShu0925 的安全加固系列），审阅效率（68% 吞吐率）显著领先；
- **dogfooding 特色**：agent 自主提交 feature request（#6757），项目本身是其产品的第一个用户。

**技术路线差异**：OpenClaw 走“稳定通道 + 细粒度质量打磨”路线（今日多为 Unicode 规范化、UTF-8 解码、内存治理类小粒度修复）；Hermes 则刚完成统一网关大重构（#106742），处于“架构跃迁后还债”阶段。

**社区规模对比**：两者 Issue/PR 绝对量级相当（均触及 500 条/日上限），但 OpenClaw 的维护者响应与闭环能力明显更强；Hermes 的插件目录生态活跃度（单日 5+ 目录 PR）则显示其第三方扩展社区更繁荣。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw 证据 | Hermes 证据 |
|---|---|---|
| **SQLite 并发/状态底座可靠性** | #164294 WAL checkpoint 永久阻塞（38 评论）、#186813 锁竞争死锁、#159094 lease 冲突 | #135487 cron worker `database is locked` 死亡、#138915 网关持 state.db 致 Dashboard 409 |
| **跨端/跨客户端 session 恢复** | #166634 崩溃恢复后 agent 永久 UNAVAILABLE（P0） | #139818/#144814 跨客户端 session.resume not_found（网关回归） |
| **cron/定时任务可用性** | #120385 定时任务 MCP 工具目录不完整 | #135487 cron 执行记录丢失、Kanban worker 稳定性系列 |
| **记忆/上下文管理** | 记忆提升问题簇（#150635、#164923）+ self-compact 需求（#6757） | qdrant-memory 插件迭代（v0.5.2） |
| **多渠道路径完整性** | Telegram 消息丢失（#160762）、Unicode 搜索修复三连 | Telegram/Discord/Slack/Feishu/Matrix 集成 bug 持续涌现 |
| **长会话资源治理** | #187440 历史窗口限制、#166017 MCP 子进程打满 256 上限 | 多 worker 并发资源问题（#145022） |

**结论**：“状态持久层 + 非正常退出恢复路径”是生态级共性难题，任何做长时运行 agent 的团队都应将其列为一等工程优先级。

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | Gateway 状态管理、记忆/dreaming 子系统、macOS 客户端、多渠道质量 | 统一网关架构、Kanban/cron 工作流、插件目录生态、skill 体系 |
| 扩展模型 | 核心 monorepo + 社区 PR | **插件目录为主要扩展通道**（安全钩子 fail-closed 设计） |
| 目标用户 | 多渠道 + MCP 重度自托管生产用户（单 session 13 个 stdio MCP server） | 全平台个人助理用户 + 插件开发者，移动端生态自发形成 |
| 架构成熟度 | 双版本通道，生产可用性诉求明确 | v0.x 早期，架构刚收敛，瘦客户端/远端执行仍在 needs-decision |
| 待决战略项 | QQ 渠道长期支持、session.maintenance 上限 | 远端 Agent 本地执行（#18715，43👍）、Windows 瘦客户端、官方移动 App |

---

## 6. 社区热度与成熟度

- **OpenClaw —— 质量巩固阶段**：高活跃 + 高闭环率 + 稳定发布节奏，但两个问题簇（恢复路径、记忆子系统）中多个 P0 数周无 fix PR，属“成熟项目的债务集中风险”。
- **Hermes Agent —— 快速迭代/重构收敛阶段**：新开 Issue 占比极高（312/344），PR 积压 445 条，反映功能与集成面快速扩张；统一网关母 issue（#134889）224 评论正式关闭并交接至 #143547，标志其进入系统化还债期。
- **共性**：两者社区贡献意愿与质量均优秀（回归测试、salvage 标注规范），是生态健康的基础信号。

---

## 7. 值得关注的趋势信号

1. **“个人助理”正在变成基础设施**：用户对 7×24 常驻、cron、跨端恢复、断电生存的诉求，意味着 agent 框架需按分布式系统标准（lease、checkpoint、幂等恢复）设计状态层——这是当前两个项目最大的痛点来源，也是新项目的差异化机会。
2. **瘦客户端 / 远端 Agent 架构呼之欲出**（Hermes #18715/#38519 合计 74👍）：计算与交互分离将是下一波架构演进方向，与网关多进程模型的成熟度直接相关。
3. **插件目录 + 安全策略钩子成为扩展范式**：Hermes 的 `pre_tool_call_final`（fail-closed）与密钥脱敏 PR 显示，插件生态的安全边界治理正在前置。
4. **记忆与上下文管理仍是未解核心命题**：OpenClaw 的 dreaming/记忆晋升缺陷簇与 self-compact 需求表明，长期记忆管道的正确性比功能丰富度更制约用户信任。
5. **多渠道消息完整性 = 用户信任底线**：消息丢失类反馈（Telegram mid-turn 丢失、compaction void 投递）被用户明确表述为“损害信任”，投递可靠性应优先于新渠道接入。
6. **对开发者的建议**：选型时评估“恢复路径测试覆盖 + SQLite 并发策略 + LTS 通道”三项；自建时将 checkpoint/lease/幂等作为 day-one 设计而非事后修补。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-30

## 1. 今日速览

Herm Agent 今日保持极高活跃度：过去 24 小时 Issues 更新 344 条（新开/活跃 312，关闭 32），PR 更新 500 条（待合并 445，已合并/关闭 55），无新版本发布。社区焦点仍集中在 **10 月 14 日合并的统一网关架构（#106742）的后续修复潮**，大量 session 状态、桌面端连接和消息投递类 bug 持续涌现。同时插件目录（plugin catalog）生态活跃，今日有多个新插件与目录更新 PR 提交。总体判断：项目处于**大规模架构重构后的收敛期**，bug 报告量高但社区参与修复的意愿同样强烈，健康度良好但稳定性压力明显。

## 2. 版本发布

今日无新版本发布。最新版本线仍为 v0.22.x 系列（Issue 中可见 v0.22.5）。

## 3. 项目进展

今日 PR 关闭/合并 55 条，代表性进展：

- **网关稳定性修复**：#144845 修复网关启动时孤儿会话清理 sweep 的自死锁问题（启动线程在自身 `_read_ctx()` 块内解析 session id）
- **生命周期守护误报持续收敛**：#114798（teknium1）修复 python heredoc 数据文件触发 gateway lifecycle guard 的误拦截，与 Issue #105758 直接相关
- **Kanban 健壮性**：#146685 拒绝 assignee 无法加载的 skill pin，修复了 #145022 中误导性的 "execution unknown; retained by owner" 报错路径
- **会话生命周期**：#146377 修复任务 pin 之前创建的会话跟随实时配置的问题；#146373 修复 CLI 在 `session.create` 超时后重试同 request_id 导致的重复会话
- **测试覆盖补全**：#94325 将 `apps/shared` 的 vitest 套件接入 CI（`skill-scaffold.test.ts` 自 2024 年起未被执行）
- **Windows 兼容**：#146362 在 profile 克隆时排除退役 skill 归档，规避 `LongPathsEnabled=0` 路径超限
- **安全加固**：#146688 补齐 `*.env`/`*.toml` 密钥、CLI secret 参数及 URL path token 的终端输出脱敏；#146368 要求托管回调必须具备绑定的 Gateway 源上下文

整体看，主库推进方向明确：消化统一网关合并后的回归、加固 Kanban/cron 子系统、收紧插件安全边界。

## 4. 社区热点

**最热讨论：**

- [#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（224 评论，已关闭）— 统一网关 #106742 的 post-merge 修复追踪 issue，是本轮所有网关相关 bug 的母 issue，今日继续承接大量讨论并正式关闭，后续追踪转移至 #143547
- [#139818](https://github.com/NousResearch/hermes-agent/issues/139818)（34 评论）— 远端后端桌面会话无法从本地桌面 resume（`session.resume` 返回 not_found），与 #144814（hermes-mobile 创建的会话在原生 Desktop 同样无法 resume）构成同一诉求集群：**跨客户端会话恢复**
- [#18715](https://github.com/NousResearch/hermes-agent/issues/18715)（43 👍，33 评论）— 远端 Agent + 本地工具执行的老牌需求，持续高热度，反映分布式部署场景的真实痛点
- [#38519](https://github.com/NousResearch/hermes-agent/issues/38519)（31 👍）— Windows 仅安装 Desktop 前端连接远端 Agent，与 #18715 同属“瘦客户端”诉求
- [#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（27 评论）— #134889 的延续追踪 issue，系统列举统一网关在 main 上的遗留问题
- [#11911](https://github.com/NousResearch/hermes-agent/issues/11911)（16 👍）— 官方移动 App + 语音通话需求，配合今日 hermes-mobile 相关 bug（#144814）可见移动端生态已自发形成

## 5. Bug 与稳定性

**P0/P1（严重）：**

| Issue | 问题 | Fix 状态 |
|---|---|---|
| [#118379](https://github.com/NousResearch/hermes-agent/issues/118379) | Anthropic 凭据池轮换被 per-request refresh 回退，两个订阅按一个计费 | 未见 fix PR |
| [#135487](https://github.com/NousResearch/hermes-agent/issues/135487) | cron worker 在 `database is locked` 时死亡且执行记录丢失（无重试） | 未见 fix PR |
| [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) | 多 Kanban worker 并发时网关卡顿导致 worker 崩溃、WIP 丢失 | 部分缓解：#146685 |
| [#127284](https://github.com/NousResearch/hermes-agent/issues/127284) | 安装状态 `source-completion-pending` 无 TTL，kill 后所有后续启动被卡死 | 未见 fix PR |

**P2（值得注意）：**

- [#139818](https://github.com/NousResearch/hermes-agent/issues/139818) / [#144814](https://github.com/NousResearch/hermes-agent/issues/144814)：跨客户端 session.resume not_found（网关架构回归类）
- [#138915](https://github.com/NousResearch/hermes-agent/issues/138915)：网关持有 state.db 时 Dashboard 批量操作一律 409（标 cause/fallout，属架构合并后果）
- [#131743](https://github.com/NousResearch/hermes-agent/issues/131743)：Codex 长任务首次实质进展停滞 300 秒（needs-repro）
- [#136486](https://github.com/NousResearch/hermes-agent/issues/136486)：OpenAI 兼容端点 `reasoning` 别名重放导致 400 duplicate field，字段拒绝学习未触发
- [#143767](https://github.com/NousResearch/hermes-agent/issues/143767)：Desktop 恢复压缩前旧会话，模型切换全部报 session_superseded
- [#110374](https://github.com/NousResearch/hermes-agent/issues/110374)：slack-sdk ≥3.44 破坏状态指示（16 👍）
- [#141861](https://github.com/NousResearch/hermes-agent/issues/141861)：Kanban worker 无视 `api_mode=codex_responses` 报 400
- [#143364](https://github.com/NousResearch/hermes-agent/issues/143364)：多路复用下副 profile 的进度流经主 bot 投递（消息串扰，安全相关）

**P3**：#105758（lifecycle guard 误报 Node CLI，对应 #114798 已关闭）、#135217（版本日期未更新）等。

## 6. 功能请求与路线图信号

- **插件目录生态加速**：今日新增 #146687（limits-monitor 用量监控面板）、#146681（hermes-tabs 真实浏览器分页操控）、#146675（Nous Girl 主题）、#146679（Provider Balances，草案求策略指导）、#146419（qdrant-memory 升至 v0.5.2）——plugin catalog 已成为主要扩展通道
- **插件策略钩子扩展**：#146684 新增 `pre_tool_call_final` 最终参数策略钩子（fail-closed），显示团队在强化插件安全模型
- **Discord 消息补全**：#146680（转发、回复转发、embed 告警、thread 起始消息可见）salvage 自社区 PR，可能较快合入
- **移动端**：#11911 长期高热度 + hermes-mobile 第三方客户端 bug 涌现，官方移动端或为潜在路线图项
- **瘦客户端/远端 Agent**（#18715、#38519，合计 74 👍）：#146364（managed worker 树固定）等 PR 显示网关多进程模型在演进，该需求的技术基础逐步成熟

## 7. 用户反馈摘要

- **痛点集中在架构切换**：大量用户反馈统一网关后桌面端/CLI/消息平台的会话恢复、消息投递出现回归（#139818、#143767、#133514 委托审批不可见、#131238 回复渲染两次）
- **常驻部署用户受影响最重**：cron 定时任务丢失（#135487）、Kanban worker 崩溃（#145022）、Dashboard 409（#138915）——生产可用性诉求强烈
- **多平台重度用户活跃**：Telegram 多 bot、Discord、Feishu、Matrix、Slack 用户均在报告集成问题，显示 Hermes 作为“全平台个人助理”的定位已被用户接受
- **正面信号**：社区 PR 贡献质量高（多个 PR 附带回归测试与 salvage 标注），插件作者提交目录条目的流程运转顺畅

## 8. 待处理积压

- [#18715](https://github.com/NousResearch/hermes-agent/issues/18715)（5 月开，43 👍，needs-decision）：远端 Agent 本地执行——高价值需求长期未决
- [#38519](https://github.com/NousResearch/hermes-agent/issues/38519)（6 月开，31 👍，needs-decision）：Windows 瘦客户端安装
- [#11911](https://github.com/NousResearch/hermes-agent/issues/11911)（4 月开，needs-decision）：官方移动 App
- [#105758](https://github.com/NousResearch/hermes-agent/issues/105758)（needs-decision）：lifecycle guard 64 字节误判 Node CLI——虽 #114798 已关闭部分场景，建议确认是否可关闭该 issue
- [#118379](https://github.com/NousResearch/hermes-agent/issues/118379)（P1，计费相关）：Anthropic 凭据池计费错误影响真实账单，建议优先排期
- [#99284](https://github.com/NousResearch/hermes-agent/issues/99284)（8 月开）：kanban assign 无校验导致卡片永久不可认领——P3 但属数据完整性问题
- PR 积压 445 条待合并，审阅吞吐（日关闭 55）与提交量之间存在压力，建议维护者关注目录类 PR（低风险可批量化处理）与网关回归类 PR（高价值应优先）的分流审阅策略。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*