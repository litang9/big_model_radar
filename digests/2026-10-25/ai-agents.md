# OpenClaw 生态日报 2026-10-25

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-24 22:27 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-25

## 1. 今日速览

OpenClaw 今日维持高活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 418，关闭 82），PR 更新 500 条（待合并 237，已合并/关闭 263），并发布 2 个新版本（v2026.10.7 与 extended-stable v2026.9.34）。核心贡献者 @steipete 今日集中提交了十余个性能优化与重构 PR，显示项目正处于一轮系统性的 Gateway/会话性能打磨期。社区侧，SQLite 状态管理、插件源捕获（source capture）引发的 I/O 与阻塞问题持续占据讨论热度榜首，多个 P0/P1 问题积压待修，整体呈现“发布节奏快、性能优化密集、但稳定性债务仍在偿还”的状态。

## 2. 版本发布

### v2026.10.7（最新 stable）
- **核心更新**：**Replay-safe session recovery（可重放安全的会话恢复）**——被中断的会话现在会保留恢复来源信息与未完成的工具执行结果；已停止的会话在接收下一条消息前会清理终态恢复残留；被拒绝的 Claude CLI 草稿不再进入最终回复。
- **破坏性变更**：未见明确标注。
- **迁移注意**：建议受困于 2026.10.6 会话恢复/Codex 超时问题（见 #181619、#181660）的用户尽快升级验证。

### v2026.9.34（extended-stable / 等效 LTS）
- 仅 Gateway 组件的维护性发布：基于 2026 年 9 月底快照，叠加**关键安全更新、可靠性与性能修复、新模型支持**。
- 适合追求稳定的部署用户；注意该分支不包含 main 上的最新性能优化。

## 3. 项目进展

今日 PR 活动以 @steipete 的性能与去冗余系列为主，方向明确：

- **缓冲区/内存优化**：[#182955](https://github.com/openclaw/openclaw/pull/182955) 避免保留缓冲区中 pin 住进程级 Buffer slabs（关联 #182804）。
- **会话性能**：[#182210](https://github.com/openclaw/openclaw/pull/182210) 复用已提交的不可变会话快照；[#182754](https://github.com/openclaw/openclaw/pull/182754)（XL）保持会话行读取时的对象身份，减少侧栏重建；[#182949](https://github.com/openclaw/openclaw/pull/182949) 复用会话广播的 audience 字段索引（实测 66 连接、3 个 operator audience 下减少 47.5 个投递计划/周期的开销）；[#182906](https://github.com/openclaw/openclaw/pull/182906) 共享不可变副本发布条目。
- **数据库路径瘦身**：[#182971](https://github.com/openclaw/openclaw/pull/182971) 将新消息分发前的 5 语句幂等查重精简；[#182933](https://github.com/openclaw/openclaw/pull/182933) 跳过 plugin-state 写入中的冗余过期探测。
- **内存子系统修复**：[#182968](https://github.com/openclaw/openclaw/pull/182968) 修复记忆重建时缓存 embedding 被过早驱逐导致全量回源的问题（修复 #182886）；[#182821](https://github.com/openclaw/openclaw/pull/182821)（已关闭，待重开/跟进）修复 PostgreSQL embedding 缓存写满后每次写入全表扫描。
- **功能与 UX**：[#141004](https://github.com/openclaw/openclaw/pull/141004)（XL）审计面记录运行时技能使用；[#182956](https://github.com/openclaw/openclaw/pull/182956) 语音通话支持无工具的 agent 咨询模式（兼容性/安全边界标注，需补证明）；[#182954](https://github.com/openclaw/openclaw/pull/182954) 修复限流场景下快速失败并堆叠相同错误卡片；[#182961](https://github.com/openclaw/openclaw/pull/182961) 侧栏会话状态可见化。

**评估**：今日推进以“性能与内部一致性”为主线，无重大面向用户的新功能落地，但为大规模多客户端部署（sidebar/广播/快照路径）打下了明显基础。合并 263 条对 237 条待合并，消化速度健康。

## 4. 社区热点

1. **[#160959](https://github.com/openclaw/openclaw/issues/160959)（P0，50 评论）**：Gateway 捕获大型外部插件时事件循环阻塞数分钟（2026.9.6 回归，源于 #144252）。插件源捕获机制已是连续多日的争议核心，用户要求提供 escape hatch 或复用机制。
2. **[#164294](https://github.com/openclaw/openclaw/issues/164294)（30 评论）**：Gateway 状态库 WAL 自动 checkpoint 被进程内 reader 钉住，自启动以来从未完成（logFrames 已达 17091）。反映用户对 SQLite 状态层长期健康运行的担忧。
3. **[#159356](https://github.com/openclaw/openclaw/issues/159356)（29 评论）**：llama.cpp embedding 子进程退出但 manager 报 ready，请求 HTTP 500。报告者追加运维恢复更新（4GB→8GB 内存），诉求集中在低内存环境的启动健康检查与资源边界。
4. **[#157989](https://github.com/openclaw/openclaw/issues/157989)（P1，23 评论）**：插件源捕获每次 CLI 命令重写 ~1.1–1.4 GB、每次 Gateway 启动 ~6.5 GB，造成严重 SSD 磨损——与 #160959、#162585 同根，社区对源捕获设计的负面情绪最高。
5. **[#159789](https://github.com/openclaw/openclaw/issues/159789)（13 评论）**：一次失败的 native close 永久锁死 agent 执行但健康检查仍绿色——用户强烈要求修复“健康绿灯掩盖工作级故障”的可观测性盲区。

**诉求归纳**：插件运行时（源捕获）设计、SQLite 状态层可靠性、以及“仪表盘健康但实际不可用”的可观测性是当前三大社区不满。

## 5. Bug 与稳定性（按严重度）

| 级别 | 问题 | 状态/修复 |
|---|---|---|
| P0 | [#160959](https://github.com/openclaw/openclaw/issues/160959) 大插件捕获阻塞 Gateway 数分钟 | 无 fix PR，needs-maintainer-review |
| P0 | [#181660](https://github.com/openclaw/openclaw/issues/181660) "Session read batch cannot reenter active SQLite writer admission"（2026.10.6，树莓派） | **已关闭**——推测随 2026.10.7 修复，建议用户验证 |
| P0 | [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 late reclamation checkpoint 失败导致 agent 不可用 | not-repro-on-main，需确认 |
| P1 | [#181619](https://github.com/openclaw/openclaw/issues/181619) Codex app-server 执行预算超时回归（2026.10.5→10.6），主路径全部静默回退 | 无 fix PR，needs-live-repro |
| P1 | [#150822](https://github.com/openclaw/openclaw/issues/150822) Codex 子进程声明工具但无执行 handler（安全相关） | needs-security-review |
| P1 | [#157989](https://github.com/openclaw/openclaw/issues/157989) 插件源捕获 SSD 磨损 | 无 fix PR |
| P1 | [#182476](https://github.com/openclaw/openclaw/issues/182476)（新，10 评论）Windows update repair 确定性失败 OPENCLAW_STATE_LEASE_LOST | 无 fix PR |
| P1 | [#154299](https://github.com/openclaw/openclaw/issues/154299) / [#158154](https://github.com/openclaw/openclaw/issues/158154) 子代理完成消息静默丢失 / Telegram 公告 30 分钟过期未投递 | 无 fix PR |
| P1 | [#148292](https://github.com/openclaw/openclaw/issues/148292) 自动压缩单次尝试无超时，23 分钟挂起 | 无 fix PR |
| P1 | [#178300](https://github.com/openclaw/openclaw/issues/178300) 1-token length 截断后终局化输出虚假成功 | 无 fix PR |
| 安全 | [#167876](https://github.com/openclaw/openclaw/issues/167876) Talk 咨询在 setup 完成后丢失 caller authority | needs-security-review |
| 安全 | [#158966](https://github.com/openclaw/openclaw/issues/158966) 带凭据的 CDP WebSocket URL 泄露至模型可见结果 | 待裁决 |

## 6. 功能请求与路线图信号

- **限流感知的模型回退**（[#182712](https://github.com/openclaw/openclaw/issues/182712)，今日新开）：配额耗尽时跳过同池候选、优先换 provider——与今日 [#182954](https://github.com/openclaw/openclaw/pull/182954)（限流错误卡片修复）同属限流体验线，有较大概率被纳入下一版本。
- **Databricks Unity Gateway 官方 provider**（[#155633](https://github.com/openclaw/openclaw/issues/155633)）：实现 PR #155634 已关联开启，属企业向诉求，进入主线概率较高。
- **toolSearch 生效于 CLI 后端**（[#139477](https://github.com/openclaw/openclaw/issues/139477)）：已有 linked PR，直接降低每轮 prompt 膨胀，与性能优化主线契合。
- **审计技能使用**（PR [#141004](https://github.com/openclaw/openclaw/pull/141004)，XL）持续活跃，是企业合规方向的信号。
- **Automations 送达配对节点**（[#144306](https://github.com/openclaw/openclaw/issues/144306)）：配合移动端通知场景，needs-product-decision。
- **主人签名的责任门控**（[#96675](https://github.com/openclaw/openclaw/issues/96675)，已关闭）：助手记忆/动作需显式用户确认的隐私安全设计，关闭状态或表明已有决策落地，值得关注后续。

## 7. 用户反馈摘要

- **痛点集中在 2026.9.5–9.7 的插件源捕获**：Windows/Linux 用户报告网关永不健康（#162585）、磁盘写入失控（#157989）、启动阻塞（#160959）。低配设备（树莓派、4GB 内存主机）用户受影响最重。
- **Windows 一等公民诉求强烈**：自动更新/修复链路（#157812、#182476）反复失败，同机多种失败模式并存，用户明确表达挫败感。
- **消息可靠性是核心信任点**：子代理结果静默丢失（#154299）、Telegram 公告过期（#158154）、工具参数静默丢弃（#53408）——用户用“work-stopping”形容此类问题。
- **成本敏感**：prompt cache 无法复用（#146902、#161208）导致真实美元损失（用户报告每次心跳 $0.40–0.95），是高用量用户的高优先诉求。
- **正面信号**：extended-stable（LTS）渠道的推出受到稳定型用户好评；性能类 PR 的实测数据（如 #182949 附带量化基准）获得社区信任；v2026.10.7 的会话恢复改进快速响应了 #181660 类问题。

## 8. 待处理积压

- **#160959（P0，50 评论，9/29 至今）**：最热 P0 无 fix PR，多个衍生 issue 依赖其架构决策——建议优先给出源捕获复用/禁用的产品决定。
- **#159356（9/27，29 评论）**、**#157989（P1，9/25）**、**#159789（9/27）**：均标注 needs-maintainer-review / needs-product-decision，超三周。
- **#53408（3 月创建，stale）**：工具参数静默丢弃影响数据完整性，长期无修复。
- **#144502（WhatsApp TTS 语音条无法播放）**：stale + needs-info，IM 渠道用户可见度高。
- **PR 积压**：[#141004](https://github.com/openclaw/openclaw/pull/141004)（XL，9/7 开启）与 [#164551](https://github.com/openclaw/openclaw/pull/164551)（上下文 token 计数陈旧，含 telegram-e2e 证明）长期待审，建议维护者排期 review。
- **安全双件**：#150822、#167876 均卡在 needs-security-review，建议安全团队尽快介入。

---
*数据来源：GitHub Issues/PR/Releases API 快照（过去 24 小时窗口）。ISSUE/PR 展示为评论数 Top 条目，非全量统计。*

---

## 横向生态对比

# 个人 AI 助手/智能体开源生态横向对比分析 — 2026-10-25

*对比对象：OpenClaw 与 Hermes Agent（本期纳入项目）*

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**“架构扩张后的收敛与偿债期”**：头部项目均已完成核心架构跃迁（OpenClaw 的 Gateway/会话子系统、Hermes 的统一网关 #106742），当前精力转向性能优化、稳定性修复与多平台一致性。社区活跃度极高（两项目合计单日 Issue 更新近 900 条、PR 更新 1000 条），但**Issue 消化速度普遍落后于新问题产生速度**，维护者带宽成为共同瓶颈。用户诉求正从“能不能用”转向“静默失败、可观测性、资源边界、更新可靠性”等信任级议题，标志着该品类正走向生产化成熟期。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 418，关闭 82，关闭率 ~16%） | 368（新开/活跃 338，关闭 30，关闭率 ~8%） |
| PR 更新（24h） | 500（待合并 237，合并/关闭 263） | 500（待合并 285，合并/关闭 215） |
| Release | **2 个**：v2026.10.7（stable）+ v2026.9.34（extended-stable/LTS） | 0（v0.22.3 存在未修复回归，缺补丁版本） |
| 焦点主题 | Gateway/会话性能优化、插件源捕获争议、SQLite 状态层可靠性 | 统一网关合并后回归、model/profile 崩溃族、Desktop 跨平台稳定性 |
| P0/P1 积压 | 2 个 P0 + 10 个 P1/安全项无 fix PR | 1 个 P1 + 11 个 P2 无 fix PR，2 个安全 PR 4-5 个月未合并 |
| 健康度评估 | **中高**：发布节奏快、双通道（stable+LTS）清晰、合并速度健康；但最热 P0（#160959，50 评论）近月无架构决策 | **中**：活跃度优秀、生态自增长好；但回归修复滞后、Issue 关闭率偏低、安全债积压 |

---

## 3. OpenClaw 在生态中的定位

- **规模与节奏领先**：Issue/PR 活动量、贡献者产出（如 @steipete 单日十余个性能 PR，附量化基准）、发布频率（单日 2 版本）均高于 Hermes，处于生态头部。
- **技术路线差异**：OpenClaw 走**中心化 Gateway + 多客户端广播/快照架构**，近期优化聚焦大规模多客户端部署（66 连接场景量化数据）；Hermes 则以统一网关整合 CLI/TUI/Desktop/API/cron 多入口，架构整合更晚，正处修整期。OpenClaw 提前布局 **extended-stable LTS 渠道**，对生产部署用户的吸引力明显（社区已好评）。
- **相对优势**：性能工程纪律（benchmark 附带、幂等查重精简、内存子系统修复）、企业合规方向（审计技能使用 #141004、Databricks provider）。
- **相对短板**：插件源捕获机制（单次 CLI 重写 1.1–1.4 GB、启动 6.5 GB）引发的 SSD 磨损与阻塞是 Hermes 未见的结构性设计争议；Hermes 在语音免提、IM 桥接（Discord/WhatsApp/Telegram）、垂直插件（print3d）上的消费级/创客生态更活跃。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 共同诉求 |
|---|---|---|---|
| **更新/安装可靠性** | #182476 Windows update repair 确定性失败、#157812 | #101789 swap 被第三方进程阻塞、#139091 merge-base 超时、#79087 健康安装误判重装 | 两大项目的**第一大用户摩擦点**，Windows 均为重灾区 |
| **会话恢复/消息可靠性** | #154299 子代理消息静默丢失、#158154 Telegram 过期未投递、v2026.10.7 replay-safe recovery | #139818 远程会话本地不可恢复、#139825 cron 投递失败回归、#140189 无限重试无退避 | 消息不丢不重是核心信任底线 |
| **静默降级 / 可观测性盲区** | #159789 健康绿灯掩盖故障、#178300 虚假成功 | #99943 上下文窗口静默缩水、#131321 GPU 软渲染 13 天 | 用户一致要求**显式降级告警**而非自动 fallback |
| **多会话/多 profile 隔离** | SQLite writer admission、会话广播 audience 优化 | #46303 并发会话交叉污染、#142849 sharedPrimary 超时 | 高级用户的核心留存风险 |
| **长时记忆与上下文压缩** | #182968 embedding 缓存驱逐、#182821 PostgreSQL 全表扫描 | #143379 doc-chain substrate RFC、压缩器窗口钳制 | 记忆/压缩子系统是双方技术投资重点 |
| **低资源环境支持** | 树莓派 #181660、4GB 内存 #159356 | ollama_num_ctx 本地模型场景 | 边缘/本地部署是真实增量用户群 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | Gateway 性能工程、企业合规审计、企业 provider（Databricks）、自动化（Automations） | 消费级多端体验：Desktop 三平台、免提语音、IM 桥接、垂直插件生态 |
| 目标用户 | 大规模/多客户端部署、追求稳定的生产运维用户（LTS 渠道印证） | 个人极客、创客、多渠道日常助手用户（最高票请求是远程 Agent + 本地工具执行） |
| 技术架构 | 中心化 Gateway + SQLite 状态层 + 会话快照/广播订阅模型 | 统一网关统一 CLI/TUI/Desktop/API/cron 入口 + 插件目录（AgentPlaybooks/Nexus） |
| 生态策略 | 插件源捕获（引发争议的重设计需求） | 目录化 repin + 外部维护者贡献，自增长健康 |
| 当前战略阶段 | 性能打磨 + 稳定性偿债 | 大合并后回归修复 + 桌面成熟化 |

---

## 6. 社区热度与成熟度分层

- **快速迭代层**：两者均属高热度，但 **OpenClaw 处于“性能密集优化 + 快发布”的工程深化期**——发布快、合并率健康、方向清晰；风险在于最热 P0 架构决策悬置。
- **质量巩固层**：**Hermes 处于大架构落地后的修整期**——外围修补 PR 占比高、回归族（model-switch/profile/网关 cron）集中爆发、Issue 关闭率仅 8%，显示维护带宽承压最重。
- **共同成熟度信号**：项目均出现“needs-maintainer-review / needs-decision 长期积压”（Hermes #18715 六个月无决策、OpenClaw #160959 近月无 fix PR），说明生态整体进入**决策瓶颈期**而非技术瓶颈期。

---

## 7. 值得关注的趋势信号

1. **可观测性 > 自动恢复**：两项目用户均对“仪表盘绿灯但实际不可用”强烈不满。对开发者的启示：智能体系统的健康检查必须下沉到工作级（工具执行、消息投递、资源边界），而非进程级。
2. **更新链路是留存生死线**：自动更新失败是双项目第一大抱怨。自托管智能体产品应将“更新原子性 + 失败回滚 + Windows 一等公民支持”视为 P0 工程项。
3. **限流/成本感知设计兴起**（OpenClaw #182712、#182954、#146902 prompt cache 复用，用户报告单次心跳 $0.40–0.95）：多 provider 回退与缓存复用将成为智能体框架标配能力。
4. **远程 Agent + 本地工具执行的分离架构**是最高票长期需求（Hermes #18715，42👍）且与双方网关演进方向一致——预计是下一代架构竞争焦点。
5. **记忆/压缩子系统的工程化**（embedding 缓存、doc-chain 治理、token 计数）表明长时记忆正从功能演示转向可靠性工程，是高价值投入方向。
6. **LTS/extended-stable 渠道获认可**：OpenClaw 的双通道发布模式值得同类项目借鉴，生产用户对“不含最新优化的稳定分支”有明确付费级需求。

---

*数据窗口：2026-10-25 各项目 GitHub API 快照；对比基于单日截面，趋势判断需结合多日观察。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-10-25）

## 1. 今日速览

Hermes Agent 今日继续保持高强度社区活跃：过去 24 小时 Issues 更新 368 条（新开/活跃 338，关闭 30），PR 更新 500 条（待合并 285，已合并/关闭 215），无新版本发布。活跃度评估：**非常活跃**，但 Issue 关闭率（约 8%）明显偏低，维护者响应速度成为瓶颈。今日主题集中在 **统一网关（unified gateway）合并后的回归问题**、**模型切换/profile 相关崩溃**、以及 **Desktop 跨平台稳定性**（Linux 透明度、Windows 更新、macOS venv 泄漏）。

---

## 2. 版本发布

今日无新版本发布。值得注意的是 #139825 指出 v0.22.3 引入回归（`gateway/session_local_recovery.py` 导致路由卫星 cron 投递失败），维护者可能需要尽快发布 v0.22.x 补丁版本。

---

## 3. 项目进展

今日合并/关闭 215 条 PR，部分重要进展：

- **[#114490](https://github.com/NousResearch/hermes-agent/pull/114490)（已关闭）** — V4A 多文件 patch 部分失败的变更计数修复（FMV 语义正确性），属核心文件工具可靠性改进。
- **[#142746](https://github.com/NousResearch/hermes-agent/pull/142746)（已关闭）** — AgentPlaybooks 目录数据更新（Memory 0.3.0 / Tools 0.2.0），插件生态持续演进。
- **[#141806](https://github.com/NousResearch/hermes-agent/issues/141806)（已关闭 Issue）** — Discord 流式回复 markdown 图片丢失问题关闭，说明对应修复已落地。

活跃待合并 PR 方向：

- **[#144170](https://github.com/NousResearch/hermes-agent/pull/144170)** — Desktop 长会话向上滚动的渲染窗口限界，直击桌面端性能退化痛点。
- **[#144169](https://github.com/NousResearch/hermes-agent/pull/144169)** — 免提语音对话遵循 `voice.max_recording_seconds`，修复连续语音被 60s 硬截断。
- **[#144161](https://github.com/NousResearch/hermes-agent/pull/144161)** — OIDC 登录创建的 Desktop 会话权限归属修复。
- **[#144127](https://github.com/NousResearch/hermes-agent/pull/144127)** — Nexus 目录 repin 至 0.22.31，关闭 7 个 Dependabot 安全公告（含 certifi 关键级）。
- **[#142627](https://github.com/NousResearch/hermes-agent/pull/142627)** — Context7 API key（`ctx7sk-` 前缀）脱敏修复，安全细节处理到位。
- **[#136206](https://github.com/NousResearch/hermes-agent/pull/136206) / [#136207](https://github.com/NousResearch/hermes-agent/pull/136207)** — Discord 适配器拆分重构（gate mixin + REST sender），代码结构持续清理。

整体判断：项目处于“大合并后修整期”——统一网关（#106742）架构落地后，外围修补类 PR 占比明显上升。

---

## 4. 社区热点

**最热 Issue：**

1. **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)**（30 评论 / 42 👍）— 远程 Agent + 本地工具执行的架构需求，创建于 5 月至今仍是高诉求项。反映远程部署/本地工作区分离场景的真实需求，与统一网关架构演进方向一致，长期未落地。
2. **[#131055](https://github.com/NousResearch/hermes-agent/issues/131055)**（23 评论）— Linux Desktop 二次启动污染沙箱 fallback 标记，导致 `--no-sandbox` 粘滞 + 渲染器 SIGILL 循环。桌面端启动健壮性反复被吐槽。
3. **[#124583](https://github.com/NousResearch/hermes-agent/issues/124583)**（20 评论）— terminal 工具后台提示引用不存在的 `process(action=...)`（实际是 `process_manage`）。低成本高价值修复，长期未修。
4. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)**（14 评论）— 统一网关合并后 main 分支遗留问题汇总，跨 CLI/TUI/Desktop/API/cron 的系统性回归追踪，是理解当前架构问题的核心 Issue。
5. **[#143426](https://github.com/NousResearch/hermes-agent/issues/143426)**（12 评论 / 9 👍，仅 1 天前创建）— Linux 桌面 6% 窗口透明度 bug，传播速度快，体验杀伤力大。

**诉求分析**：社区关注点呈三层——架构层（远程/本地分离、统一网关）、平台层（Desktop 三大 OS 各自的顽疾）、细节层（提示文案、配置默认值）。

---

## 5. Bug 与稳定性（按严重程度）

| 严重度 | Issue | 描述 | Fix PR |
|---|---|---|---|
| **P1** | [#79087](https://github.com/NousResearch/hermes-agent/issues/79087) | Windows 桌面运行时探测超时 → 健康安装被引导走首次安装流程，可能覆盖安装 | 未见 |
| P2（回归） | [#139825](https://github.com/NousResearch/hermes-agent/issues/139825) | v0.22.3 起路由卫星 cron 投递失败（`session_local_recovery.py` 回归） | 未见 |
| P2 | [#142017](https://github.com/NousResearch/hermes-agent/issues/142017) / [#142488](https://github.com/NousResearch/hermes-agent/issues/142488) | profile-following 会话 `/model` 切换崩溃（tuple 无 `.get` / `moved` 被 shadow），10/19-10/21 连续出现，疑似同一根源 | 未见 |
| P2 | [#131055](https://github.com/NousResearch/hermes-agent/issues/131055) | Linux 沙箱 fallback 标记污染（见上） | [#141934](https://github.com/NousResearch/hermes-agent/pull/141934) 相关重启标记修复在途 |
| P2 | [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) | v0.21.0 起压缩器上下文窗口被 `ollama_num_ctx` 钳制，云端 1M 窗口静默缩至 65,536 | 未见 |
| P2 | [#139818](https://github.com/NousResearch/hermes-agent/issues/139818) | 远程后端桌面会话本地不可恢复（`session.resume` not_found） | 未见 |
| P2 | [#139091](https://github.com/NousResearch/hermes-agent/issues/139091) | `hermes update` 稳定通道 merge-base 探测 10s 超时，更新流程完全卡死 | 未见 |
| P2 | [#46303](https://github.com/NousResearch/hermes-agent/issues/46303) | 并发会话交叉污染（共享 memory 注入 + git worktree），存在数据安全风险 | 未见 |
| P2 | [#140189](https://github.com/NousResearch/hermes-agent/issues/140189) | 网关不可投递通知每 5s 无限重试、无退避无上限 | 未见 |
| P2 | [#142849](https://github.com/NousResearch/hermes-agent/issues/142849) | sharedPrimary 非主 profile 会话的窗口级请求全部超时 | 未见 |
| P2 | [#84672](https://github.com/NousResearch/hermes-agent/issues/84672) | 内容扫描器将安全文档误判为攻击，cron + skills guard 同根源 | 未见 |

**趋势判断**：大量 P2 缺乏对应 fix PR，尤其 profile/auth/model-switch 一族（#142017、#142488、#142849）疑似 10 月中旬网关改动引入，建议优先排查。

---

## 6. 功能请求与路线图信号

- **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)** — 远程 Agent + 本地工具执行（42 👍，最高票），needs-decision 状态持续 6 个月。统一网关已为其提供架构基础，是最可能进入下个大版本的候选。
- **[#11347](https://github.com/NousResearch/hermes-agent/issues/11347)** — `/detach` 后台化运行 CLI（8 👍），与现有 `/background` 语义互补，社区讨论积极。
- **[#50718](https://github.com/NousResearch/hermes-agent/issues/50718)** — Desktop 会话可见性：未读标记、待输入提示、OS badge，属于桌面体验成熟化的自然延伸。
- **[#143604](https://github.com/NousResearch/hermes-agent/pull/143604)** — print3d 插件（照片→建模→切片），显示插件生态正向垂直领域扩展。
- **[#143379](https://github.com/NousResearch/hermes-agent/issues/143379)** — RFC：doc-chain substrate 的治理与压缩，社区对长时记忆持久化机制的深度提案。

---

## 7. 用户反馈摘要

**痛点**：
- **更新/安装是最大摩擦点**：Windows 更新最终 swap 被第三方进程阻塞（[#101789](https://github.com/NousResearch/hermes-agent/issues/101789)）、稳定通道 merge-base 超时（#139091）、健康安装被误判需重装（#79087）——用户反复表达"装得上、更不动”的挫败感。
- **静默降级令人不安**：上下文窗口静默缩水（#99943）、GPU 被错误钉在 SwiftShader 软渲染 13 天（[#131321](https://github.com/NousResearch/hermes-agent/issues/131321)），用户要求更多可观测性而非自动 fallback。
- **多会话/多 profile 场景不成熟**：交叉污染（#46303）、会话不可恢复（#139818）是高级用户的主要流失风险。
- **平台桥接细节粗糙**：WhatsApp WinError 5（[#68128](https://github.com/NousResearch/hermes-agent/issues/68128)）、Telegram Rich Messages 被忽略（[#63485](https://github.com/NousResearch/hermes-agent/issues/63485)）。

**满意点**：Issue 中出现建设性协作（#79087 作者主动撤回错误结论并致谢维护者的验证建议）；插件目录更新与外部维护者参与度高，生态自增长良好。

---

## 8. 待处理积压

| Issue/PR | 年龄 | 状态 | 呼吁 |
|---|---|---|---|
| [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) | ~6 个月 | needs-decision，42 👍 | 最高票功能请求，亟需维护者决策 |
| [#122928](https://github.com/NousResearch/hermes-agent/issues/122928) | ~1 个月 | needs-decision | macOS venv 泄漏涉及安全边界 |
| [#67249](https://github.com/NousResearch/hermes-agent/issues/67249) / [#29458](https://github.com/NousResearch/hermes-agent/issues/29458) | 4-5 个月 | open | Kanban `active_pr` respawn guard 同族两 Issue，操作员无清除路径 |
| [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) | ~3 个月 | open | 文档承诺的 `windows_detach_flags_without_breakaway()` 从未实现，属文档-代码失信 |
| [#49836](https://github.com/NousResearch/hermes-agent/pull/49836) / [#32796](https://github.com/NousResearch/hermes-agent/pull/32796) | 4-5 个月 | open PR | 两项安全相关 PR（配置内容脱敏、secret 加载竞态）长期未合并 |
| [#120368](https://github.com/NousResearch/hermes-agent/pull/120368) / [#120548](https://github.com/NousResearch/hermes-agent/pull/120548) | ~1 个月 | open PR | 纯文档/skills 文案修改，合并成本低 |

**健康度总评**：项目社区活跃度和外部贡献质量优秀，但 Issue 关闭率偏低、多个月级安全 PR 未合并、v0.22.3 回归未出补丁——建议维护者优先处理 model-switch/profile 崩溃族与 #139825 回归，并给 #18715 一个明确决策。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*