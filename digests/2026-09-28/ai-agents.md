# OpenClaw 生态日报 2026-09-28

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-27 23:01 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-09-28

> 数据来源：github.com/openclaw/openclaw 过去 24 小时活动（数据截至 2026-09-28）

---

## 1. 今日速览

项目处于**高活跃度冲刺状态**：过去 24 小时 Issues 更新 500 条（新开/活跃 482，仅关闭 18），PR 更新 500 条（待合并 395，已合并/关闭 105），社区产出与维护吞吐均维持极高水平。主线工作围绕 **2026.9.7 版本修复冲刺**（#157531 追踪 Issue）与 maintainer @steipete 主导的大规模"deslop"代码清理系列展开。今日**无新版本发布**，版本迭代重心仍在打磨升级链路与状态管理层稳定性。Issue 关闭率（3.7%）显著低于新增速度，P0 级更新失败与状态锁问题积压值得警惕。

---

## 2. 版本发布

今日无新 Release。2026.9.7 修复追踪器 [#157531](https://github.com/openclaw/openclaw/issues/157531) 显示已准备 18/21 个 P1 候选修复（含隐私/安全相关），源码 commit `711db27`，预计近期发布。

---

## 3. 项目进展

今日 PR 合并/关闭 105 个，重点包括：

- **[PR #159944](https://github.com/openclaw/openclaw/pull/159944)** fix(state): 在替换准入前退役陈旧 worker，修复状态迁移在数据库文件系统身份被复用时丢失租约的问题——直接回应多起 "state-lifecycle lease" P0 报告，且保留了社区贡献者 Vincent Koc 的原始提交归属。
- **[PR #159753](https://github.com/openclaw/openclaw/pull/159753)**（已关闭）perf(state): 管理式 SIGTERM 重启后保留数据库 witness，避免重复昂贵的准入扫描——回应 #157605 高 CPU 问题。
- **[PR #159905](https://github.com/openclaw/openclaw/pull/159905)**（已关闭）fix(ui): 大型模型列表搜索卡顿优化。
- **[PR #159937](https://github.com/openclaw/openclaw/pull/159937)**（已关闭）fix(ui): 模型选择器搜索文本按阅读方向对齐（RTL 支持）。
- **[PR #159723](https://github.com/openclaw/openclaw/pull/159723)**（已关闭）fix(test): 根目录直接测试运行的前置准备。
- **进行中重点 PR**：[#159347](https://github.com/openclaw/openclaw/pull/159347)（P0，Windows Gateway 重启 SQLite 共享错误恢复）、[#159935](https://github.com/openclaw/openclaw/pull/159935)（catalog worker 堆隔离，回应 #156191 内存压力）、[#159946](https://github.com/openclaw/openclaw/pull/159946)（macOS 原生聊天窗口改用 Web 会话渲染）、[#159226](https://github.com/openclaw/openclaw/pull/159226)（统一采用 fs-safe 文件监听，覆盖面极广）。
- **deslop 系列清理**：@steipete 连续推进 infra/commands/channels/gateway/plugins 四五轮去重清理（#158877、#158940、#159842、#159945、#159752），系统性降低代码冗余。

整体看，今日进展集中在**状态管理层（SQLite/租约/worker 生命周期）修复**与**代码瘦身**两条线，是 2026.9.7 发布前的关键收敛动作。

---

## 4. 社区热点

| Issue | 评论 | 主题 |
|---|---|---|
| [#159356](https://github.com/openclaw/openclaw/issues/159356) | 25 | llama.cpp manager 误报就绪、embedding 请求 HTTP 500；作者跟进称主机内存 4GB→8GB 后恢复，指向内存压力根因 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 16 | hook/tool 子进程僵尸泄漏（自 6 月悬置的 P1 回归） |
| [#157531](https://github.com/openclaw/openclaw/issues/157531) | 15 | 2026.9.7 修复追踪器，18/21 P1 候选就绪 |
| [#157067](https://github.com/openclaw/openclaw/issues/157067) | 15 | Windows 隔离 cron 向 worker 传递不可克隆 Proxy |
| [#156112](https://github.com/openclaw/openclaw/issues/156112) | 13 | `openclaw update` 在"global install swap"步骤确定性失败，而手动 npm install 13 秒成功 |

**诉求分析**：社区最强烈的诉求是**升级链路可靠性**（多条 P0 更新失败报告）和**长期运行稳定性**（租约/锁/僵尸进程）。用户报告普遍质量很高（带复现、日志、环境），但大量 issue 卡在 `needs-maintainer-review` / `needs-product-decision` 标签上。

---

## 5. Bug 与稳定性（按严重程度）

**P0 / 发布阻塞**

- [#158095](https://github.com/openclaw/openclaw/issues/158095) Gateway worker 在 `acquireSqliteWorkerLifecycle` 后保持 state-lifecycle，后续所有 acquire 失败直至重启（2026.9.6，崩溃循环）。**相关修复：PR #159944**
- [#158936](https://github.com/openclaw/openclaw/issues/158936) macOS 就绪看门狗 SIGTERM 慢启动 Gateway，导致重启循环。**fix-shape-clear，待修复 PR**
- [#156917](https://github.com/openclaw/openclaw/issues/156917) state-lifecycle 租约无心跳/强制接管，单个挂起客户端阻塞 Gateway 启动 31 分钟。
- [#159094](https://github.com/openclaw/openclaw/issues/159094) Gateway 持有租约但内部 worker 报"另一进程持有 state-lifecycle"（2026.9.6）。**与 PR #159944 方向一致**
- [#148307](https://github.com/openclaw/openclaw/issues/148307) 会话回收超过 5s busy timeout 时 `database is locked`（464 MB DB）；配套 [#157939](https://github.com/openclaw/openclaw/issues/157939) 回复路径遇锁直接丢弃整轮用户消息。
- 更新失败四连：[#157812](https://github.com/openclaw/openclaw/issues/157812)（Windows managed-service-preflight）、[#158231](https://github.com/openclaw/openclaw/issues/158231)、[#154924](https://github.com/openclaw/openclaw/issues/154924)（global-install-failed）、[#153230](https://github.com/openclaw/openclaw/issues/153230)（runtime-verification-failed）。
- [#154114](https://github.com/openclaw/openclaw/issues/154114) 更新候选演练失败："No usable, authenticated, tool-capable inference route"。

**P1 / 性能与资源**

- [#157605](https://github.com/openclaw/openclaw/issues/157605) 2026.9.6 升级后 CPU 持续 240–276%（sessions.list 卡住）。**部分由 PR #159753 缓解**
- [#157989](https://github.com/openclaw/openclaw/issues/157989) 插件源捕获每次 CLI 命令重写 ~1.1–1.4 GB、每次 Gateway 启动 ~6.5 GB，SSD 磨损严重。
- [#154104](https://github.com/openclaw/openclaw/issues/154104) 4 个 Matrix E2EE 账号空闲时 ~50% CPU + 52 MB/min 磁盘写入（回归）。
- [#158127](https://github.com/openclaw/openclaw/issues/158127) 2026.9.6 多 agent Codex 回合间歇性失败。

**P1 / 会话与消息**

- [#154572](https://github.com/openclaw/openclaw/issues/154572) claude-cli 子会话 spawn 100% 失败（TranscriptWriterClaimReboundError）。
- [#156425](https://github.com/openclaw/openclaw/issues/156425) Anthropic 路由持久上下文引擎回合永不提交。
- [#157389](https://github.com/openclaw/openclaw/issues/157389) 飞书多 lane 负载下回复丢失。
- [#113219](https://github.com/openclaw/openclaw/issues/113219) Windows GBK 编码下 exec/read 工具乱码导致空回复循环。

---

## 6. 功能请求与路线图信号

- **macOS 原生体验升级**：[PR #159946](https://github.com/openclaw/openclaw/pull/159946) 原生窗口直接渲染 Web 会话（Mermaid/宽表格/内联卡片），明确回应桌面端体验短板。
- **群聊选择性参与**：[PR #159478](https://github.com/openclaw/openclaw/pull/159478) 让 agent 在群组中识别指向自己的请求并选择性发言，已过 telegram-e2e 验证，进入下一版本概率高。
- **静默期进度监督**：[PR #159583](https://github.com/openclaw/openclaw/pull/159583) 长任务无输出时周期性状态通知，缓解"卡死还是工作中"的用户焦虑。
- **GitHub 企业 worker 凭证体系**：[PR #157500](https://github.com/openclaw/openclaw/pull/157500)、[PR #159896](https://github.com/openclaw/openclaw/pull/159896) 为一次性云 worker / Codex 原生命令提供 run 级短生命周期 `git`/`gh` 凭证，安全性设计成熟。
- **多索引 embedding 记忆与模型感知 failover**：[#63990](https://github.com/openclaw/openclaw/issues/63990)（4 月提出，长尾需求）仍待产品决策。
- **openat2 兼容**：[#152839](https://github.com/openclaw/openclaw/issues/152839) NAS/Docker 场景状态锁获取失败，安全降级路径请求。

---

## 7. 用户反馈摘要

**痛点集中点**：
1. **升级即翻车**是最大怨念——自动更新多模式失败且每次都弹用户可见通知（#157812 两天积累 5 条失败记录），用户被迫手动 npm 安装。
2. **长时运行劣化**：僵尸进程、内存膨胀（RSS 3+ GB）、数据库锁、租钥死锁，重度自托管用户（多 agent、多渠道）受影响最重。
3. **渠道侧体验**：飞书多 lane 丢消息（#157389）、移动端键盘遮挡 UI（#137508）、iOS 开启推理显示后严重卡顿（#124759）。
4. **成本焦虑**：提示缓存命中率 93%→47%（#84110）、SSD 写入磨损（#157989）直接影响账单与硬件寿命。

**正面信号**：用户报告质量高、复现详尽（甚至带 OOM 后的运维恢复复盘，如 #159356）；agent 代提交 issue 的模式（#124911）运行良好；低配主机（4GB RAM）用户也能跑通 semantic recall。

---

## 8. 待处理积压（呼吁维护者关注）

- [#97616](https://github.com/openclaw/openclaw/issues/97616) 僵尸进程泄漏 — **P1，悬置近 3 个月**，仅 18 条 issue 中关闭 1 条的高占比来自此类陈旧问题。
- [#84110](https://github.com/openclaw/openclaw/issues/84110) Codex 提示缓存击穿 — 4 个多月未修，直接增加用户 API 成本。
- [#55694](https://github.com/openclaw/openclaw/issues/55694) 中文用户工具调用死循环刷屏 — 标记 fix-shape-clear 但无修复 PR，飞书场景影响大。
- [#120415](https://github.com/openclaw/openclaw/issues/120415) / [#120449](https://github.com/openclaw/openclaw/issues/120449) 工具重复调用无防重复护栏、循环检测告警不下发 — 本地模型用户核心痛点。
- [#113306](https://github.com/openclaw/openclaw/issues/113306) SQLite 快照恢复缺端到端崩溃保障（impact:data-loss，7 月至今）。
- [#126549](https://github.com/openclaw/openclaw/pull/126549) 光标重连后恢复活动回合 — 社区 PR 挂起 1 个多月，needs proof。
- [#157531](https://github.com/openclaw/openclaw/issues/157531) 追踪器中 18/21 P1 已就绪，剩余 3 项为 2026.9.7 发布关键路径。

**健康度结论**：产出能力强、社区参与活跃，但**修复吞吐（日关闭 18 issue）远跟不上报告速度（日新增 482）**，且 P0 更新失败与状态管理问题的 fix PR 尚未落地到 stable。建议 2026.9.7 发布优先收敛 state-lifecycle/租约族问题，并考虑提升 triage 分类速度。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期：2026-09-28** | 基于 OpenClaw 与 Hermes Agent 过去 24 小时社区动态

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道已进入**高活跃度、高强度打磨阶段**：头部项目日 Issue/PR 活动量均触及 500 条量级，社区参与度和报告质量都很高。但两个项目同时暴露出**稳定性债**——状态管理、会话生命周期、升级链路成为共性故障高发区，说明这类系统（多渠道接入 + 长时运行 + 本地状态库）的工程复杂度正在超越当前迭代速度。功能创新（群聊选择性参与、记忆系统、桌面原生体验）与质量收敛并行，生态整体处于“功能扩张后被迫偿还技术债”的转折点。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 活跃（24h） | 482 新开/活跃，仅关闭 18 | 261 新开/活跃，关闭 239 |
| Issue 关闭率 | **3.7%（严重失衡）** | **91.6%（基本健康）** |
| PR 状态 | 395 待合并，105 合并/关闭 | 454 待合并，46 合并/关闭 |
| Release | 无（2026.9.7 冲刺中，18/21 P1 就绪） | 无 |
| 重心 | P0 修复冲刺 + 代码清理（deslop） | 功能密集交付（TUI/Desktop/cron/memory） |
| 数据完整性风险 | SQLite 锁、租约死锁、更新失败族 | prune 静默损坏数据（#120582）、压缩语义偏差 |
| 健康度评估 | ⚠️ 产出强但修复吞吐跟不上，积压快速膨胀 | ✅ 闭环率高，但安装/兼容性长尾在累积 |

**核心差异**：OpenClaw 是“高负载失衡”（新增远超消化），Hermes 是“高负载均衡”（闭环能力跟得上）。

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **社区规模与参与深度显著领先**：日活跃 Issue 482 vs 261，单 Issue 讨论密度高（25/16/15 条评论的热点），且用户报告普遍带完整复现、日志、环境信息，甚至有 OOM 后运维复盘——这是成熟重度用户社区的标志。
- **架构覆盖面最广**：Gateway、多渠道（Telegram/飞书/Matrix/Slack）、多 agent、本地推理（llama.cpp）、macOS 原生窗口，是当前生态中集成面最大的“个人 AI 中枢”。
- **治理信号积极**：maintainer 保留社区贡献者归属（PR #159944）、系统性 deslop 清理、agent 代提交 issue 模式运转良好。

**风险：**
- Issue 关闭率 3.7% 是明确的红色警报：日增 482 vs 日关 18，积压呈指数增长趋势，triage 能力是当前最大瓶颈。
- P0 问题（更新失败、state-lifecycle 租约）的修复 PR 尚未落地 stable，“升级即翻车”正在侵蚀用户信任。

**技术路线差异**：OpenClaw 走“全渠道 + 多 agent + 自托管重状态管理（SQLite 租约/worker 生命周期）”路线，工程重心在基础设施可靠性；Hermes 走“单一体验深度打磨”路线，重心在 TUI/Desktop 交互与 memory 系统，状态管理复杂度相对较低。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **升级/安装链路可靠性** | #157812/#158231/#154924/#153230 更新失败四连，手动 npm install 13 秒成功 | #87093（Debian）、#125657（Win11）、#69889/#122425/#86207 更新漂移族 | 两者最强烈的共性痛点：`update` 路径在不同平台/安装模式下不可靠 |
| **会话状态与数据完整性** | SQLite 锁（#148307/#157939）、快照恢复缺崩溃保障（#113306） | #120582（prune 静默损坏数据）、#123801、#109966（WAL） | 长时运行下的状态生命周期管理是共同软肋 |
| **后台任务/进程治理** | 僵尸进程泄漏 #97616（悬置 3 月）、cron Proxy 问题 #157067 | cron worker 依赖导入失败 #122222、进程组超时清理 PR #125806 | 子进程/cron 生命周期的系统性缺口 |
| **记忆系统** | #63990 多索引 embedding 记忆（待产品决策） | PR #125802 memory prefetch 解耦、#10771 Auto Dream | 记忆均为活跃改造区，Hermes 落地更快 |
| **桌面端体验** | PR #159946 macOS 原生窗口渲染 Web 会话 | PR #125800/125803 推理等级快捷键、TUI 交互 | 双方都在向原生桌面体验投入 |
| **静默失败的可观测性** | 更新失败弹通知但无自愈 | 插件随机加载失败 #123926 | 用户明确要求失败可见 + 兜底机制 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道消息中枢（飞书/Telegram/Matrix/Slack）、多 agent 编排、群聊选择性参与（PR #159478） | 个人终端体验：TUI 命令体系、Desktop 推理控制、交互打磨 |
| 目标用户 | 重度自托管用户、多渠道/多 agent 运维者（也是受长时运行劣化影响最重的群体） | 个人开发者/桌面用户，含活跃中文用户群 |
| 技术架构 | 重量级：Gateway + SQLite 租约 + worker 生命周期 + 本地推理路由 | 相对轻量：Desktop 后端 + cron + memory 组件化 |
| 安全设计 | GitHub 企业 run 级短生命周期凭证（PR #157500/#159896） | MCP trust gate（虽有 camelCase bug #88858）、skill 归属溯源（PR #125809） |
| 迭代风格 | 版本化冲刺 + 大规模代码清理 | 贡献者密集小步快跑（单日 15+ 结构化 PR） |

---

## 6. 社区热度与成熟度分层

- **OpenClaw：快速扩张期 → 质量巩固临界点**。社区规模最大、报告质量最高，但维护吞吐与社区增长明显脱节（关闭率 3.7%），处于“必须从功能扩张转向质量收敛”的关键窗口，2026.9.7 发布是检验点。
- **Hermes Agent：快速迭代期，质量基本在线**。闭环率高（261 增 / 239 关），核心贡献者交付密集，但 install-update 子系统问题交叉累积，报告自身也指出需要“系统性重构而非逐个修补”——是下一个可能爆发的债务点。
- **共同信号**：两者都在为前期快速功能扩张支付稳定性利息；差异在于 OpenClaw 已在还债（deslop、P0 冲刺），Hermes 尚在扩张中延迟还债。

---

## 7. 值得关注的趋势信号

1. **状态管理是智能体系统的下一战场**：SQLite 锁、租约、WAL、prune 损坏在两个独立项目中同时成为 P0/P1 高发区。对开发者的启示：**会话状态层需要从一开始设计崩溃恢复、租约心跳、锁超时降级**，而非事后修补。
2. **升级链路即用户信任**：两个项目用户的最大怨念都是 update。自动更新的“global install swap”式原子替换在跨平台场景下普遍脆弱——灰度回滚、dry-run 演练（如 OpenClaw #154114 的更新候选演练思路）将成为标配。
3. **静默失败是信任杀手**：数据静默损坏、插件随机丢失引发的社区情绪，比崩溃更严重。可观测性兜底（失败必须可见 + 自愈）应作为智能体系统一级需求。
4. **Agent 参与自身社区运维**：OpenClaw 的 agent 代提交 issue、Hermes 的 @vadelma-agent 主动拆分提交 PR，预示“自举式开发”将成为智能体项目的差异化效率来源。
5. **记忆与静默期监督是下一波功能热点**：Auto Dream、多索引 embedding、无输出周期性状态通知（PR #159583）反映用户对“长任务信任”的需求——agent 不只要能干活，还要能证明自己在干活。
6. **中文/多语言用户真实存在且活跃**（OpenClaw #55694、#113219；Hermes #125657），国际化（编码兼容、文档、支持）是被低估的必修课。

**给技术决策者的一句话结论**：OpenClaw 适合多渠道重度自托管场景但需等待 2026.9.7 验证状态管理修复；Hermes 适合个人桌面/终端体验优先的场景，但生产数据完整性（#120582）裁决结果值得先行确认。两者共同提示：**选型时应优先考察项目的状态管理与升级可靠性记录，而非功能清单长度**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报

**日期：2026-09-28** | 数据来源：github.com/NousResearch/hermes-agent

---

## 1. 今日速览

Hermes Agent 今日保持**高度活跃**状态：过去 24 小时 Issues 更新达 500 条（新开/活跃 261，关闭 239），PR 更新 500 条（待合并 454，合并/关闭 46），关闭率与合并节奏基本匹配，社区响应效率良好。今日无新版本发布，但新增了一批高质量的功能型 PR（主要来自 @OutThisLife、@Froraut、@vadelma-agent 等核心贡献者），集中在 TUI 交互体验、Desktop 会话管理和 cron 稳定性。需要警惕的是，**install-update 与自管环境下 cron 依赖问题**仍是 Bug 高发区，且出现多个 P1/P2 级别的数据完整性问题。整体健康度：活跃度高、修复合并节奏健康，但安装/兼容性长尾问题在累积。

---

## 2. 版本发布

今日无新版本发布，无 Release 更新。

---

## 3. 项目进展

今日 PR 活动以**新开待审为主**（454 待合并 / 46 合并关闭），呈现贡献者集中提交流的特征。重要进展：

**TUI / Desktop 体验（贡献者 @OutThisLife 一日多产）：**
- [PR #125803](https://github.com/NousResearch/hermes-agent/pull/125803)：TUI 新增 `/s` 别名（对应 `/steer`）、双 Esc 中断、PTT 打断 TTS，统一命令注册使 CLI/Telegram/Slack 自动获益
- [PR #125791](https://github.com/NousResearch/hermes-agent/pull/125791)：`notify_on_interact` 声音提醒 + 可配置 attention hook，改善无人值守终端体验
- [PR #125800](https://github.com/NousResearch/hermes-agent/pull/125800)：Desktop 推理等级（reasoning level）升降快捷键
- [PR #125801](https://github.com/NousResearch/hermes-agent/pull/125801)：本地模式拖放文件跳过 staging，避免重复磁盘拷贝
- [PR #125797](https://github.com/NousResearch/hermes-agent/pull/125797)：新增 `session.archive` RPC，补齐 TUI 会话归档能力
- [PR #125786](https://github.com/NousResearch/hermes-agent/pull/125786)（已关闭）：⌘1…⌘9 快捷键语义修复

**稳定性与核心修复：**
- [PR #125805](https://github.com/NousResearch/hermes-agent/pull/125805)：将 `sessions.auto_prune` 移入 Desktop 后端维护 tick，修复后台会话清理不执行的问题
- [PR #125806](https://github.com/NousResearch/hermes-agent/pull/125806)：修复 cron 脚本父进程已被回收时超时清理失效的进程组问题
- [PR #125808](https://github.com/NousResearch/hermes-agent/pull/125808)：worker 主动中断不再被误判为服务端断连（消除虚假错误日志）
- [PR #125809](https://github.com/NousResearch/hermes-agent/pull/125809)：子代理/cron 创建的 skill 正确归属创建者，防止后台创建伪装为用户操作
- [PR #125799](https://github.com/NousResearch/hermes-agent/pull/125799)：delegate 子进程在无凭据轮换时不再重复重建 OpenAI client（性能优化）
- [PR #125401](https://github.com/NousResearch/hermes-agent/pull/125401)：网关识别微信 CDN 图片 URL，公众号场景图片提取修复

**生态扩展：**
- [PR #125661](https://github.com/NousResearch/hermes-agent/pull/125661)：插件目录新增 Vault View v0.4.6（锁定源码版本）
- [PR #125802](https://github.com/NousResearch/hermes-agent/pull/125802)：memory prefetch 与用户消息通道解耦（Closes #8893）

**整体评估**：今日推进幅度为**中等偏上**——单日 15+ 个结构化 PR 覆盖 TUI、Desktop、cron、gateway、memory 五个组件，显示核心团队处于功能密集交付期。

---

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584)（已关闭） | 151 评论 | Nous→Enterkey 定时合并任务在 `cron/jobs.py` 持续冲突，自动化集成被阻断；长尾讨论反映社区对上游 CI 卫生的高度关注 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 30 评论，3 👍 | 跨网关 Bot 协作（gateway federation）。维护者 Teknium 已表态推迟 Desktop continuity 至 Group Chat 稳定后约一个月再评估——**这是明确的路线图信号** |
| [#87093](https://github.com/NousResearch/hermes-agent/issues/87093)（已关闭） | 31 评论，4 👍 | Debian 13 安装失败（uv.lock & npm install），P0 级安装问题终于闭环 |
| [#122222](https://github.com/NousResearch/hermes-agent/issues/122222) | 20 评论 | P1：自管安装下 cron 外部 worker 无法导入依赖，所有定时任务启动即失败——今日最严重的活跃 Bug |
| [#125657](https://github.com/NousResearch/hermes-agent/issues/125657) | 14 评论 | Windows 11 安装 Python 依赖失败，多次重装无效（附日志），处于 needs-repro 状态 |
| [#122299](https://github.com/NousResearch/hermes-agent/pull/122299) | 12 评论，5 👍 | kanban worker spawn argv 守卫在父进程检查可导入性，对裸解释器子进程不成立（`ModuleNotFoundError: hermes_cli`）——👍 最高，说明受影响用户面广 |

**诉求画像**：社区热点集中在**两条主线**——① 自管/非托管安装下的运行时兼容性（cron worker、kanban dispatch、Desktop entry）；② 会话状态完整性与生命周期管理（WAL、压缩、prune）。

---

## 5. Bug 与稳定性（按严重程度）

**P1 级：**
- [#122222](https://github.com/NousResearch/hermes-agent/issues/122222)：自管安装 cron 外部 worker 依赖导入失败，所有计划任务在 ownership ack 前失败。**暂无对应 fix PR**，与 #122299 同属 "comp/cron + sweeper:risk-compatibility" 家族
- [#120582](https://github.com/NousResearch/hermes-agent/issues/120582)：**生产事故级**——主动 prune + 压缩导致会话中工具结果被 stub、参数被截断，agent 修补过的脚本静默损坏（附 state.db 证据）。needs-decision，风险极高。相关修复方向可参考 [PR #108582](https://github.com/NousResearch/hermes-agent/pull/108582)（精确选择 prune）
- [#123801](https://github.com/NousResearch/hermes-agent/issues/123801)：macOS Desktop 重复渲染 assistant 回复（P1，sweeper:risk-session-state）

**P2 级：**
- [#122299](https://github.com/NousResearch/hermes-agent/issues/122299)：kanban dispatcher spawn argv 守卫不健全（5 👍），待修
- [#125657](https://github.com/NousResearch/hermes-agent/issues/125657)：Windows 安装依赖失败，needs-repro，建议中文用户提供日志翻译协助
- [#117915](https://github.com/NousResearch/hermes-agent/issues/117915)：默认 `compression.threshold_tokens: 256_000` 静默覆盖 1M 窗口模型的 ratio 阈值，压缩行为与用户预期不符
- [#122292](https://github.com/NousResearch/hermes-agent/issues/122292)：Windows 下 `browser_exec` 命中旧版 browser-use CLI 时返回 usage 文本当 success
- [#122425](https://github.com/NousResearch/hermes-agent/issues/122425)：managed env workspace 跨更新漂移，双运行时执行不同代码
- [#88858](https://github.com/NousResearch/hermes-agent/issues/88858)：MCP trust gate 因 camelCase/snake_case 属性名不匹配，`untrusted` 模式下所有只读工具都被要求审批
- [#99270](https://github.com/NousResearch/hermes-agent/issues/99270)：MCP client 将数组参数逐元素包成 `{item: …}`，破坏所有数组型参数传递
- [#47954](https://github.com/NousResearch/hermes-agent/issues/47954)：honcho memory provider 启动竞态（6 月至今未修）

**P3 级：**
- [#123926](https://github.com/NousResearch/hermes-agent/issues/123926)：启动时 `_evict_modules` 遍历 `sys.modules` 导致**随机子集插件静默加载失败**——影响面不可预测，值得提升优先级

**已修复/闭环：** #109966（WAL 交接阻塞，复测不复现）、#120545（macOS Fast User Switching 卡顿）、#71206（launchd 本地网络隐私）、#119661（Todoist OAuth code_challenge）、#86207（update 后 dashboard 陈旧代码）、#44729（SimpleX allowlist 绕过，安全修复）。

---

## 6. 功能请求与路线图信号

- **跨网关 Bot 协作**（[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)）：被 #106742（统一网关运行时）阻塞，维护者明确表态 Group Chat 稳定后回顾——**短期不会落地**，但已在路线图上
- **自动记忆整理 "Auto Dream"**（[#10771](https://github.com/NousResearch/hermes-agent/issues/10771)，6 👍）：定期去重、清理过期记忆。与今日 [PR #125802](https://github.com/NousResearch/hermes-agent/pull/125802)（memory prefetch 解耦）同属 memory 组件，**memory 是活跃改造区，落地概率中高**
- **评测用外部记忆旁路开关**（[#121935](https://github.com/NousResearch/hermes-agent/issues/121935)）：needs-decision，eval 场景刚需
- **响应-only 模式隐藏思考过程**（[#71870](https://github.com/NousResearch/hermes-agent/issues/71870)，已关闭）：与今日 [PR #125800](https://github.com/NousResearch/hermes-agent/pull/125800)（reasoning level 快捷键）呼应，推理控制是 Desktop 持续投入方向
- **pen.dev 实时画布协作**（[PR #88647](https://github.com/NousResearch/hermes-agent/pull/88647)）：创意型功能，已提交视频 Demo，等待 needs-decision
- **会话导入限额可配置**（[PR #125807](https://github.com/NousResearch/hermes-agent/pull/125807)）+ **精确选择 prune**（[PR #108582](https://github.com/NousResearch/hermes-agent/pull/108582)）：由 @vadelma-agent 主动拆分提交，**大概率进入下一版本**

---

## 7. 用户反馈摘要

**痛点（高频主题）：**
1. **安装是第一道门槛**：Debian (#87093)、Windows (#125657)、自管环境 (#122222) 均有安装/依赖失败报告，"curl | bash" 路径在不同平台的鲁棒性不足
2. **更新后行为漂移**：venv 重建丢用户包（[#69889](https://github.com/NousResearch/hermes-agent/issues/69889)）、workspace 不同步（#122425）、dashboard 跑旧代码（#86207）——用户对 `hermes update` 缺乏信任
3. **静默失败最伤信任**：#123926（插件随机丢失）、#120582（数据静默损坏）评论区情绪明显，生产用户要求可观测性兜底
4. **中文用户存在且活跃**（#125657 全中文报告），文档/支持国际化有需求

**满意点：** 问题响应速度快（261 新开 vs 239 关闭，闭环率高）；核心贡献者对 bug 报告的复测跟进细致（如 #109966 报告者主动复测并确认修复）；安全响应到位（#44729 SimpleX 绕过已修）。

---

## 8. 待处理积压（建议维护者关注）

| Issue | 停留时间 | 风险提示 |
|---|---|---|
| [#120582](https://github.com/NousResearch/hermes-agent/issues/120582) | 5 天，needs-decision | **生产数据丢失事故**，附完整证据，建议最高优先级裁决 |
| [#47954](https://github.com/NousResearch/hermes-agent/issues/47954) | **3 个多月** | honcho 竞态每次会话启动都打 WARNING，长期未响应 |
| [#10771](https://github.com/NousResearch/hermes-agent/issues/10771) | 5 个多月 | Auto Dream 呼声高（6 👍），缺维护者表态 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 1 个月 | 已有明确 defer 决策，建议在里程碑中标注状态 |
| [#99270](https://github.com/NousResearch/hermes-agent/issues/99270) | 近 1 个月 | MCP 数组参数包装 bug 使多工具不可用，无 fix PR |
| [#117915](https://github.com/NousResearch/hermes-agent/issues/117915) | 1 周，needs-decision | 压缩默认值语义与文档预期不符，影响 1M 窗口用户 |
| [#122222](https://github.com/NousResearch/hermes-agent/issues/122222) | 3 天 | P1 但无 fix PR，与 #122299、#69889 构成自管环境 cron 三连击，建议合并排查 |

**结构性提醒**：sweeper:risk-compatibility 标签下的 issue 数量显著偏高且多与 install-update 交叉，提示**安装与环境管理子系统需要一次系统性重构**而非逐个修补。

---

*本报告基于过去 24 小时 GitHub 公开数据自动汇总，热度以评论/点赞/优先级综合评估。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*