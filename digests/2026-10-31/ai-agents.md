# OpenClaw 生态日报 2026-10-31

> Issues: 496 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-30 23:43 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-31

---

## 1. 今日速览

OpenClaw 今日保持高度活跃：过去 24 小时共 **496 条 Issue 更新**（新开/活跃 337、关闭 159，关闭率约 32%）、**500 条 PR 更新**（待合并 241、已合并/关闭 259），Issue 与 PR 处理量基本持平，维护吞吐健康。今日发布 **1 个新版本 v2026.10.10-beta.5**，核心是放宽 Node.js 版本兼容性。社区讨论焦点集中在**状态生命周期/租约（state-lifecycle lease）相关的可靠性问题**和 **memory-core dreaming 记忆晋升机制缺陷**，多条 P0/P1 长期问题仍未有修复 PR。整体看，项目处于 beta 迭代冲刺期，功能演进（沙箱预热、云工作区、发布工程）与稳定性债并存。

---

## 2. 版本发布

### v2026.10.10-beta.5

- **Node 兼容性修复**：安装与更新重新支持 Node `>=24.16.0 <25 || >=26.1.0`；Node 24.22.1 / 26.12.1 由**硬性要求降级为安全建议**；修复 Node 26 worker 在 stdin 为文件时中止的问题（#186589, #187516）。
- **迁移注意**：此前因 Node 版本被硬拦截而无法安装/升级的用户，本版本后可直接升级；无其他破坏性变更。

---

## 3. 项目进展

今日关闭 PR 259 条，代表性进展：

- **Windows 可靠性**：[#188826](https://github.com/openclaw/openclaw/pull/188826) 修复 Windows 计划任务更新中 helper 被自身杀死、Control UI 卡在 "Activating" 的问题（关联 #169844 / #170956 痛点线）。
- **性能优化（维护者 @steipete 主导）**：[#188835](https://github.com/openclaw/openclaw/pull/188835) 重启验证复用已准备上下文；[#188819](https://github.com/openclaw/openclaw/pull/188819) 生命周期信封跨接收方复用；[#188832](https://github.com/openclaw/openclaw/pull/188832) 沙箱工作区跨轮次保温；[#188807](https://github.com/openclaw/openclaw/pull/188807) worker 轮次间复用仓库 checkpoint——整体在系统性削减延迟与冗余分配。
- **消息可靠性**：[#188837](https://github.com/openclaw/openclaw/pull/188837) Feishu 瞬时发送失败恢复且不重复发消息；[#188805](https://github.com/openclaw/openclaw/pull/188805) worker 中断停止后无需重启 Gateway 即可恢复。
- **安全防御**：[#188833](https://github.com/openclaw/openclaw/pull/188833) 修复部分 agent 覆盖会静默绕过全局 exec 限制的隐患。
- **发布工程**：[#187996](https://github.com/openclaw/openclaw/pull/187996) 防止 FRV 幽灵重跑；[#180191](https://github.com/openclaw/openclaw/pull/180191)/[#180203](https://github.com/openclaw/openclaw/pull/180203) 完善 npm 恢复与插件清单校验。
- **依赖**：[#188576](https://github.com/openclaw/openclaw/pull/188576)（XL）大规模兼容性依赖升级（已关闭，可能分期落地）。

---

## 4. 社区热点

| Issue | 评论 | 核心诉求 |
|---|---|---|
| [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows 启动慢/schtasks 权限错 | 27 | P0：Windows 托管服务安装的重启/更新几乎必然失败，用户"试很多次才能成功" |
| [#150635](https://github.com/openclaw/openclaw/issues/150635) 短期记忆夜间清除 | 23 | dreaming deep phase 永远无法晋升记忆，512 条上限下夜间摄取全部归零 |
| [#120385](https://github.com/openclaw/openclaw/issues/120385) cron/内存刷轮次 MCP 工具缺失 | 23 | 定时任务中 MCP 工具目录构建不完整，报 "Unknown tool id" |
| [#177656](https://github.com/openclaw/openclaw/issues/177656) 原生 host exec 完整性准入错误 | 21 | P1：稳定版 2026.10.5 上至少 28 次失败，无 fix |
| [#172837](https://github.com/openclaw/openclaw/issues/172837) Codex 子代理分配永不清理 | 19 | 完成投递放弃后条目永久重发， Platinum 级，涉消息丢失 |

**诉求分析**：热点集中在三大主题——(1) 会话状态/租约生命周期在崩溃恢复后的正确性；(2) memory-core 记忆系统的晋升/清除逻辑；(3) Windows 与 macOS 平台的更新/发布链可靠性。用户报告质量普遍很高（含生产环境 wire-capture 数据，如 [#143017](https://github.com/openclaw/openclaw/issues/143017) 的 21.3M token 缓存写入测量）。

---

## 5. Bug 与稳定性（按严重度）

**P0 / 发布阻塞**
- [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows 更新不可靠（crash-loop + ux-release-blocker）→ 相关 PR [#188826](https://github.com/openclaw/openclaw/pull/188826) 已开，**未合并**
- [#70903](https://github.com/openclaw/openclaw/issues/70903) 计费恢复后 provider 冷却持续数小时锁死用户（stale，4 个月未修）
- [#141413](https://github.com/openclaw/openclaw/issues/141413) macOS app 使用 SecretRef 时不携带 Gateway token（认证问题）
- [#142821](https://github.com/openclaw/openclaw/issues/142821) 默认开启的 transcript 脱敏污染重放上下文，掩码渗入命令/文件/回复（数据丢失级）

**P1**
- [#177656](https://github.com/openclaw/openclaw/issues/177656) 共享状态完整性准入错误 — **无 fix PR**
- [#172837](https://github.com/openclaw/openclaw/issues/172837) 子代理分配泄漏 — **无 fix PR**
- [#182476](https://github.com/openclaw/openclaw/issues/182476) Windows update repair 确定性失败于 OPENCLAW_STATE_LEASE_LOST
- [#187900](https://github.com/openclaw/openclaw/issues/187900)（10-29 新报）Linux 上 doctor 全模式启动即挂起
- [#166017](https://github.com/openclaw/openclaw/issues/166017) MCP sessionIdleTtlMs 默认值未生效 → spawn broker 填满 256 子进程后全部 exec 失败
- [#113701](https://github.com/openclaw/openclaw/issues/113701) 大工具输出溢出上下文后压缩无法恢复，会话进入失败循环
- [#148789](https://github.com/openclaw/openclaw/issues/148789) fallback 链把 harness 级错误误归因为模型失败，耗尽所有候选模型

**已修复/关闭的好消息**
- [#164948](https://github.com/openclaw/openclaw/issues/164948) doctor 自死锁（busyTimeoutMs=0）— CLOSED
- [#167270](https://github.com/openclaw/openclaw/issues/167270) Feishu 跨会话首发 400 — CLOSED（配套 PR #188837 后续加固）
- [#119454](https://github.com/openclaw/openclaw/issues/119454) 卡死会话恢复自抑制 — CLOSED
- [#176342](https://github.com/openclaw/openclaw/issues/176342) 非正常关机后 stale-lease 串行化启动 — CLOSED

---

## 6. 功能请求与路线图信号

可能进入下一版本的信号：
- **exec denylist**（[#6615](https://github.com/openclaw/openclaw/issues/6615)，👍8，已有 linked PR）与 [#71097](https://github.com/openclaw/openclaw/issues/71097)（CLOSED，或作为重复归并）——安全策略高频诉求，进入落地窗口。
- **动态模型发现**（[#10687](https://github.com/openclaw/openclaw/issues/10687) + [#121584](https://github.com/openclaw/openclaw/issues/121584) CLOSED）——OpenRouter 等快速变动目录的自动发现，重复出现表明在路线图上。
- **A2A 单向派发模式**（[#44309](https://github.com/openclaw/openclaw/issues/44309)）——多智能体编排方向，待产品决策。
- **会话保护/保留策略**：PR [#176643](https://github.com/openclaw/openclaw/pull/176643)（XL，保护选中会话免于自动维护）持续推进但 CI 仍红。
- **设计已接受**：[#169254](https://github.com/openclaw/openclaw/issues/169254)（JSON 字段提升为列，PostgreSQL 可移植性）——数据库层演进信号。
- **记忆审计日志**（[#20935](https://github.com/openclaw/openclaw/issues/20935)）与 **Dream Diary 语言配置**（[#79223](https://github.com/openclaw/openclaw/issues/79223)）——非英文用户社区持续推动。

---

## 7. 用户反馈摘要

- **Windows/macOS 更新之痛是最大摩擦**：多条高评论 Issue 反映"重启/更新要试很多次"、doctor 卡死 15+ 分钟无输出（[#178359](https://github.com/openclaw/openclaw/issues/178359)、[#187900](https://github.com/openclaw/openclaw/issues/187900)）——运维可观测性（进度输出、失败原因）和实际修复同样被渴求。
- **记忆系统是核心卖点也是核心痛点**：用户深度依赖 dreaming/记忆，但"Ranked N, Promoted 0 forever"（[#121232](https://github.com/openclaw/openclaw/issues/121232)）、跨 agent 记忆污染（[#65374](https://github.com/openclaw/openclaw/issues/65374)）直接打击信任。
- **成本敏感**：[#143017](https://github.com/openclaw/openclaw/issues/143017) prompt-cache 前缀重写导致 2130 万 cache-write token，生产用户在用实测数据施压。
- **正面**：用户报告普遍详尽（含复现矩阵、wire 抓包），社区贡献 PR 质量高（如 #188766 非 UTF-8 修复、#188758 llm-task 模型配置修复），显示用户群体专业度高、黏性强。

---

## 8. 待处理积压（提醒维护者）

- [#70903](https://github.com/openclaw/openclaw/issues/70903) — P0，stale 状态 6 个月，billing 冷却锁死用户，**无 fix PR**
- [#142821](https://github.com/openclaw/openclaw/issues/142821) — P0，默认脱敏污染上下文，linked PR 仍 open
- [#141413](https://github.com/openclaw/openclaw/issues/141413) — P0，macOS SecretRef token 缺失，needs-maintainer-review
- [#159094](https://github.com/openclaw/openclaw/issues/159094) — P1，state-lifecycle 租约所有权冲突，needs-info 超 1 个月
- [#142116](https://github.com/openclaw/openclaw/issues/142116) — P1，stale，Telegram 通道重启恢复卡死
- [#113701](https://github.com/openclaw/openclaw/issues/113701) — P1，上下文溢出失败循环，7 月至今
- PR [#176643](https://github.com/openclaw/openclaw/pull/176643)（会话保护，XL）CI 长期红，stale 风险
- PR [#125897](https://github.com/openclaw/openclaw/issues/125314)（Codex 消息工具 schema 序列化）因不活跃被关闭未合并，原 Issue #125314 仍悬置

**健康度小结**：日吞吐强劲、修复节奏稳定（159 Issue / 259 PR 关闭），但 state-lifecycle 与记忆晋升两大缺陷簇长期未闭环，建议优先分配维护者评审资源。

---

## 横向生态对比

# 个人 AI 助手/智能体开源生态横向对比分析报告（2026-10-31）

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**“功能深化 + 稳定性偿债”并行的 beta 冲刺期**：以 OpenClaw 和 Hermes Agent 为代表的项目日均 Issue/PR 更新量均在 300–500 条级别，社区参与热情和专业度（含生产环境抓包、复现矩阵级报告）显著高于一般开源项目。共同特征是**核心卖点（记忆系统、Kanban 编排、多端会话）同时也是最集中的痛点来源**。Windows/macOS 桌面安装与更新链路的可靠性成为跨项目的系统性短板。发布节奏上，项目更倾向高频 beta 迭代而非大版本稳定承诺。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 496（新开/活跃 337，关闭 159） | 318（新开/活跃 298，关闭 20） |
| Issue 关闭率 | ~32% | ~6.3% |
| PR 更新（24h） | 500（待合并 241，关闭 259） | 500（待合并 369，关闭 131） |
| 新版本 | ✅ v2026.10.10-beta.5（Node 兼容性放宽） | ❌ 无 |
| P0 未修数 | 4（含 1 个 stale 4 个月） | 0（但 P1 计费 bug #118379 有实际账单风险） |
| 健康度评估 | **吞吐强、闭环快**；state-lifecycle 与记忆晋升两大缺陷簇长期未闭环 | **贡献热情高但评审吞吐告急**：369 待合并 PR、6.3% 关闭率显示瓶颈在评审侧而非贡献侧 |

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **维护吞吐显著领先**：Issue 关闭率 32% vs Hermes 6.3%，PR 关闭 259 vs 131，且核心维护者（@steipete）亲自主导性能优化系列（#188835/#188819/#188832/#188807 系统性削减延迟），治理带宽充足。
- **功能纵深**：memory-core dreaming 记忆晋升、沙箱预热、云工作区、发布工程——在“长期运行的个人助手”方向上功能密度最高。
- **用户群体专业度极高**：如 #143017 的 21.3M cache-write token 实测数据，反映生产级深度使用者占比高、黏性强。

**技术路线差异：** OpenClaw 押注**记忆系统 + 状态租约生命周期**（state-lifecycle lease）作为核心架构，代价是这两块正是其最大债务；Hermes 则押注 **Kanban 多 worker 编排 + 远程网关/瘦客户端**架构。

**风险：** P0 积压（#70903 stale 6 个月、#142821 数据丢失级脱敏污染）与发布工程问题若持续，将侵蚀专业用户信任。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **Windows 安装/更新可靠性** | #170956（27 评论，P0）、#182476、#188826 | #79087、#122935（DACL 硬化） | 更新/重启失败、非提权用户升级后无法运行 |
| **会话状态生命周期/崩溃恢复** | #159094、#176342、#182476（租约丢失） | #127284（pending 无 TTL 永久卡死）、#139818（resume not_found） | 崩溃/中断后状态能否正确恢复 |
| **远程部署 + 多端会话互通** | 云工作区、沙箱保温 | #38519（👍32 前端-only）、#112028、PR #147023（SSH 隧道） | “远程 agent + 瘦客户端”成为主流部署诉求 |
| **上下文/记忆管理** | #150635、#121232（记忆晋升失效）、#113701（溢出失败循环） | #143379（RFC：压缩后可重读记录） | 长期记忆与上下文压缩的正确性 |
| **成本可观测** | #143017（21.3M token cache-write）、#70903（计费冷却锁死） | #118379（凭据池错乱双倍计费） | 计费/缓存效率直接打击生产用户 |
| **安全审计与 exec 管控** | #188833、exec denylist #6615 | PR #147018（清除 21 项审计发现，3 high） | 安全策略与依赖治理同步推进 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 长期记忆、沙箱与工作区保温、发布工程 | Kanban 任务编排、插件目录生态、Desktop/远程网关 |
| 目标用户 | 重度生产用户、多平台长期运行的“个人助手”场景 | 多 worker 协作、远程部署 + 瘦客户端的开发者 |
| 架构关键 | state-lifecycle lease + memory-core dreaming | session 归属模型 + gateway + 插件 catalog |
| 生态策略 | 核心内聚、安全默认收紧 | 插件目录开放扩张，社区自增长明显 |
| 短板 | 状态/记忆两大架构性缺陷簇、P0 积压 | 评审带宽不足、多端会话互通架构缺口、Windows 体验 |

---

## 6. 社区热度与成熟度分层

- **快速迭代冲刺期：Hermes Agent** —— 贡献增量高（298 新活跃 Issue、PR 待合并 369），插件生态自扩张，但闭环能力跟不上，典型“扩张快于消化”。
- **迭代 + 质量偿债并行：OpenClaw** —— 高吞吐、有节奏的版本发布（今日 1 个 beta），修复节奏稳定，但架构级缺陷（记忆晋升、租约）需专项投入，处于“功能演进与稳定性债并存”阶段。
- 两者均未到“质量巩固期”；若以关闭率与版本节奏衡量，OpenClaw 成熟度领先约一个身位。

---

## 7. 值得关注的趋势信号

1. **“远程 agent + 瘦客户端”成为默认部署心智**：Hermes #38519（👍32）+ SSH 隧道 PR、OpenClaw 云工作区，双项目同步收敛于此，桌面端正在退化为 UI 壳。
2. **状态生命周期是自主智能体的下一个攻坚高地**：租约丢失、resume not_found、pending 卡死——从“能跑”到“崩溃后能正确恢复”是生产化的分水岭，两个项目都未解决。
3. **记忆系统从卖点变问责点**：用户开始用可量化指标（"Ranked N, Promoted 0"）审计记忆晋升，透明性与审计日志（OpenClaw #20935）需求上升。
4. **token 成本进入工程化治理时代**：21.3M cache-write 实测、双倍计费 bug 表明用户以生产数据施压，缓存前缀稳定性与计费可观测将成为选型硬指标。
5. **对开发者的启示**：做智能体基础设施时，优先投入**崩溃恢复正确性、多端会话模型、Windows 更新链路**三件事——这是社区付费意愿最强、抱怨最集中的地方；同时尽早建立 PR 评审分流机制，避免 Hermes 式积压。

---

*数据来源：各项目 2026-10-31 社区动态日报；样本为 2 个项目，结论适用于同类生态位项目参考。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-10-31）

## 1. 今日速览

Hermes Agent 今日保持高强度活跃：24 小时内 Issues 更新 318 条（新开/活跃 298，关闭 20），PR 更新 500 条（待合并 369，已合并/关闭 131），无新版本发布。社区贡献热情显著，但 Issue 关闭率偏低（约 6.3%），待合并 PR 积压达 369 个，评审吞吐能力可能成为瓶颈。从主题分布看，**Kanban 执行可靠性、会话状态（session.resume）、Windows 安装/更新** 是当前三大痛点集群，且社区已出现多个针对性 fix PR，方向收敛趋势明显。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日 PR 活动以修复和新功能提案为主（多为 OPEN 状态，数据中可见的合并/关闭明细有限）：

- **MCP 热恢复修复** [#146692](https://github.com/NousResearch/hermes-agent/pull/146692)：恢复的 MCP 服务器 30 秒内即可进入 `tool_search`/`tool_call` 与新会话，无需 `/reload-mcp`，同时保持活跃会话 `tools[]` 冻结语义——对 MCP 重连体验是实质性改进。
- **Kanban 修复系列**：[#146685](https://github.com/NousResearch/hermes-agent/pull/146685)（拒绝 assignee 无法加载的 skill pin）、[#147021](https://github.com/NousResearch/hermes-agent/pull/147021)（从历史 auth 错误中释放已恢复卡片）、[#147022](https://github.com/NousResearch/hermes-agent/pull/147022)（抑制终态卡片的过期失败唤醒），三连修直接回应下方多个 P1/P2 Kanban 崩溃 Issue。
- **Desktop SSH 隧道** [#147023](https://github.com/NousResearch/hermes-agent/pull/147023)：Remote gateway 连接支持可选 SSH 隧道，覆盖 Docker/Compose 部署场景，呼应 #38519 的“前端-only 安装”诉求。
- **安全审计修复** [#147018](https://github.com/NousResearch/hermes-agent/pull/147018)：pin filelock/msgpack，bump undici/zod，清除 5 包 21 项审计发现（3 项 high）。
- **插件生态**：mediarag 目录条目 [#145067](https://github.com/NousResearch/hermes-agent/pull/145067)、limbic 0.9.3 重 pin [#147024](https://github.com/NousResearch/hermes-agent/pull/147024)、Composer 注释 SDK [#146959](https://github.com/NousResearch/hermes-agent/pull/146959)。

整体看，项目在 Kanban/网关稳定性上持续小步快跑，插件目录（catalog）生态扩张明显。

## 4. 社区热点

| Issue | 评论 | 主题 |
|---|---|---|
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) | 54 | API 无法开 PR（CreatePullRequest 权限错误），blocked/upstream |
| [#139818](https://github.com/NousResearch/hermes-agent/issues/139818) | 35 | 远程 backend 会话无法从本地 Desktop resume（not_found） |
| [#127647](https://github.com/NousResearch/hermes-agent/issues/127647) | 33 | Desktop 空闲 CPU/GPU/内存消耗追踪（聚合 issue） |
| [#143379](https://github.com/NousResearch/hermes-agent/issues/143379) | 32 | RFC：doc-chain 压缩后可重读的持久记录 |
| [#10421](https://github.com/NousResearch/hermes-agent/issues/10421) | 27（👍10） | turn 级实时时间上下文 |
| [#38519](https://github.com/NousResearch/hermes-agent/issues/38519) | 24（👍32） | Windows 前端-only 安装 |

**诉求分析**：#131859 反映贡献者工作流受阻（upstream 依赖，54 条评论显示社区高度关注）；#139818、#144814、#112028 共同指向**多端会话互通**这一核心架构缺口；#38519 以 32 👍 成为最受欢迎的功能请求，验证了“远程 agent + 瘦客户端”的典型部署需求。

## 5. Bug 与稳定性

**P1**
- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban worker 网关停滞时批量崩溃，WIP 丢失 → 已有 fix PR 链（#146685、#147021）
- [#118379](https://github.com/NousResearch/hermes-agent/issues/118379) Anthropic 凭据池轮换被 per-request refresh 回退，**两个订阅计费为一个**，存在实际账单风险，暂无 fix PR ⚠️
- [#79087](https://github.com/NousResearch/hermes-agent/issues/79087) Windows 运行时探测超时误判健康安装、诱导重装
- [#122935](https://github.com/NousResearch/hermes-agent/issues/122935) Windows 更新后 DACL 硬化致非提权进程无法执行 python/node
- [#127284](https://github.com/NousResearch/hermes-agent/issues/127284) `source-completion-pending` 无 TTL/自愈，一次中断永久卡启动

**P2（性能/稳定性）**
- [#146643](https://github.com/NousResearch/hermes-agent/issues/146643)（昨日新报）网关每次变更全量重读会话历史，数千会话时 30s 超时——可能与 #126486 的流式渲染性能问题同根
- [#123985](https://github.com/NousResearch/hermes-agent/issues/123985) 压缩后 Desktop 重复渲染首条消息（DB 层重复行，非缓存问题）
- [#136486](https://github.com/NousResearch/hermes-agent/issues/136486) `reasoning` 别名重放致 HTTP 400，字段拒绝学习失效

## 6. 功能请求与路线图信号

- **多端同会话访问**（[#112028](https://github.com/NousResearch/hermes-agent/issues/112028)）：与 #139818/#144814 的 resume 失败相互印证，session 归属/权限模型重构可能进入路线图。
- **Desktop 前端-only 安装 + SSH 隧道**：#38519（👍32）+ 今日 PR #147023 表明“远程部署”方向已在推进，下一版本落地概率较高。
- **实时时间上下文**：#10421 + 重构提案 [#17476](https://github.com/NousResearch/hermes-agent/issues/17476)，存在收敛实现的社区共识，needs-decision 待维护者拍板。
- **Cron 声明式配置分离** [#75607](https://github.com/NousResearch/hermes-agent/issues/75607) 与 `cron cancel`（#133057 已关闭，可能随实现 PR 落地）。
- **Slack Code 频道支持** [#120618](https://github.com/NousResearch/hermes-agent/issues/120618)。

## 7. 用户反馈摘要

- **痛点集中在“多机/多端”场景**：hermes serve 远程部署 + Desktop 本地访问的用户频繁遭遇 session.resume not_found、409 冲突（#138915）、计费凭据错乱（#118379）。
- **Windows 体验最差**：安装、更新、DACL、onboarding 误判多个 P1 均来自 Windows 用户，非提权用户升级后“直接跑不起来”。
- **Kanban 多 worker 用户**报告工作丢失且不可恢复，对生产使用信心影响大。
- **正面信号**：社区修复 PR 质量高（含回归测试），聚合追踪 issue（#127647）结构化程度好；插件目录贡献活跃，生态自增长健康。

## 8. 待处理积压

- [#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（10-03 开，blocked/upstream，54 评论）：需维护者与 GitHub 侧推动。
- [#118379](https://github.com/NousResearch/hermes-agent/issues/118379)（P1 计费 bug，9-21 开，无 fix PR）：影响真实账单，建议优先。
- [#79087](https://github.com/NousResearch/hermes-agent/issues/79087)、[#122935](https://github.com/NousResearch/hermes-agent/issues/122935)：Windows P1 均超一个月未关闭。
- 老 PR 积压：[#3227](https://github.com/NousResearch/hermes-agent/pull/3227)、[#3174](https://github.com/NousResearch/hermes-agent/pull/3174)（3 月开，blast-moderate）与 Kanban 堆叠 PR 链（#105490 → #106766）待评审；369 个待合并 PR 建议维护者增加评审带宽或明确分流策略。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*