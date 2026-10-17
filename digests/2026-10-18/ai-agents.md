# OpenClaw 生态日报 2026-10-18

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-17 22:16 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-18

## 1. 今日速览

OpenClaw 今日保持极高活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 328、关闭 172），PR 更新 500 条（待合并 250、已合并/关闭 250），Issue 关闭率约 34%，处理吞吐健康。今日无新版本发布。社区讨论焦点高度集中在 **Gateway 稳定性（事件循环阻塞、SQLite WAL/checkpoint、崩溃循环）** 与 **移动端实时语音（Android Talk）可靠性** 两大主题；同时核心维护者 @steipete 继续高频推进大规模重构与测试精简批次（d238–d241），代码质量治理节奏稳定。

## 2. 版本发布

今日无新版本发布。Issues 中提及的最新基线为 **2026.9.x / 2026.10.1（e178c39）**，多个问题已在近期版本中部分修复（如 #119720 提及的 #140231、#138984）。

## 3. 项目进展

今日合并明细数据未展示，但从 PR 流向可判断以下方向在积极推进：

- **测试精简战役持续推进**：@steipete 一日内提交 batch d238–d241 四个 XL 级测试清理 PR（[#175856](https://github.com/openclaw/openclaw/pull/175856)、[#175866](https://github.com/openclaw/openclaw/pull/175866)、[#175868](https://github.com/openclaw/openclaw/pull/175868)、[#175876](https://github.com/openclaw/openclaw/pull/175876)），均为测试-only，不改生产行为。
- **性能优化落地**：[#175863](https://github.com/openclaw/openclaw/pull/175863)（PostgreSQL turn 准备读取从 5 次降为 1 次，已关闭待合并回流）直接回应会话状态持久化性能问题（对应 #119720）。
- **Codex 集成修复**：@enki 提交两个 XL 级 PR — [#174967](https://github.com/openclaw/openclaw/pull/174967)（busy 会话转向与线程交接解阻塞）、[#174900](https://github.com/openclaw/openclaw/pull/174900)（原生工作期间延迟工具目录变更，含稳定性风险标记）。
- **流恢复**：[#175733](https://github.com/openclaw/openclaw/pull/175733) 修复 Responses 请求在 bookkeeping 事件上无限挂起。
- **节点自更新修复**：[#175860](https://github.com/openclaw/openclaw/pull/175860) 恢复已安装 headless node 的自动更新，修复 Windows `spawn EINVAL`。

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#99241](https://github.com/openclaw/openclaw/issues/99241)（26 评论，已关闭） | 🐚 platinum | 长时 ANSI 密集工具流程中，工具输出被折叠为 `(see attached image)` 附件，agent 丧失读取原始 stdout/stderr 的能力 —— 直接损害 agent 自主工作能力 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720)（24 评论） | 🦞 diamond | 同步持久化/transcript 维护在大规模场景阻塞 Gateway 事件循环；已有两轮部分修复（#140231、#138984），社区持续跟进验证 |
| [#157989](https://github.com/openclaw/openclaw/issues/157989)（19 评论） | 🐚 platinum | 2026.9.5 起插件源捕获每次 CLI 命令重写 ~1.1–1.4 GB、Gateway 启动 ~6.5 GB，SSD 磨损严重，无缓存复用 —— 回归问题，用户不满度高 |
| [#164294](https://github.com/openclaw/openclaw/issues/164294)（19 评论） | 🦪 silver | 状态 DB WAL auto-checkpoint 被进程内 reader 钉住，自启动以来从未完成，WAL 持续膨胀 |
| [#114612](https://github.com/openclaw/openclaw/issues/114612)（17 评论） | 🦞 diamond | memory-core 两张表无保留策略，无限增长最终填满磁盘 |
| [#164923](https://github.com/openclaw/openclaw/issues/164923)（16 评论） | 🦞 diamond | 短期记忆晋升在同主机不同 workspace 间 0% vs 50–90%，疑似结构性拒绝原始对话片段 |

热点背后共同诉求：**长期运行（long-running）部署下的资源纪律与状态一致性** —— 用户群已从尝鲜转向生产化运维。

## 5. Bug 与稳定性（按严重程度）

**P0**
- [#162211](https://github.com/openclaw/openclaw/issues/162211)：启动阻塞事件循环 40–200s，健康监控误判为断连升级为重启循环（release blocker，无 fix PR）。
- [#115256](https://github.com/openclaw/openclaw/issues/115256)：桌面 app 导致 Gateway boot-loop，`doctor` 建议被 app 立即回退（稳定通道 release blocker）。
- [#160521](https://github.com/openclaw/openclaw/issues/160521)（已关闭）：状态 DB read-admission seal → unhandled rejection 崩溃链。

**P1**
- [#119720](https://github.com/openclaw/openclaw/issues/119720)：大规模下 Gateway 事件循环阻塞 —— 部分修复已落地，持续跟进。
- [#117262](https://github.com/openclaw/openclaw/issues/117262)：3 个并发 SQLite 写句柄造成 ~33s 事件循环停顿（DEF-61）。
- [#164799](https://github.com/openclaw/openclaw/issues/164799)：版本变更后 agent 逐个准入数分钟，readyz 503。
- [#131768](https://github.com/openclaw/openclaw/issues/131768) / [#138272](https://github.com/openclaw/openclaw/issues/138272)：Android Talk 在工具调用回合稳定掉线（"no live response owner"），跨三个版本未修。
- [#132303](https://github.com/openclaw/openclaw/issues/132303)：**安全相关** — `tools.deny` 对 claude-cli 后端静默失效，被禁工具始终可用，需安全评审。
- [#172091](https://github.com/openclaw/openclaw/issues/172091)（10-14 新报）：worker SQLite 事务因跨线程 admission 等待永久打开，阻塞 WAL checkpoint —— 与 #164294 同族，**SQLite 生命周期管理是当前最大系统性风险**。

**值得注意的已关闭修复**：#166665（压缩失败自我抑制导致 transcript 150x 膨胀）、#138599（压缩模型上下文超限死锁）、#163434（transcript 裁剪误删会话头）。

## 6. 功能请求与路线图信号

- [#119992](https://github.com/openclaw/openclaw/issues/119992)：`message` 工具 per-turn 发送预算，遏制单回合重复刷屏（已有 linked PR，纳入可能性高）。
- [#162164](https://github.com/openclaw/openclaw/issues/162164)：iOS/macOS 个人身份登录同时保留 Shared owner（平台路由选择请求 #136686 的子项，处于产品决策阶段）。
- [#120244](https://github.com/openclaw/openclaw/issues/120244)：RFC — cron 每日维护窗口 + 角色隔离，延续 #79192/#119575 讨论线。
- [#115642](https://github.com/openclaw/openclaw/issues/115642)：订阅计费冷却期改为探针式恢复 + 手动重置命令（P0 release blocker，需求强烈）。
- [#68967](https://github.com/openclaw/openclaw/pull/68967)：Google Chat `sessionThread` 绑定（长期开放 PR，覆盖面极大 [#150373](https://github.com/openclaw/openclaw/pull/150373) 式的全渠道 PR 显示维护者在做跨渠道统一性改进）。

## 7. 用户反馈摘要

- **痛点集中**：生产/长期运行场景下的内存与磁盘纪律（WAL、memory 表、插件捕获重写）；崩溃后 restart-recovery 反而放大为循环崩溃（#115424：一次 OOM → 7 次 core dump）。
- **升级体验**：版本变更后准入缓慢、回归问题反复（#118839 在含修复的 beta.7 上复现），用户对 beta 质量出现疲劳。
- **移动端语音是高频不满点**：多位用户被迫用 Discord 语音替代 Android Talk。
- **正面信号**：Issue 报告质量极高（大量含源码级复现、量化测量如 #143017 的 21.3M cache-write token 分析），社区信任度与专业度高；维护者 @steipete 日产出十余个结构化 PR，治理可见。

## 8. 待处理积压（提醒维护者）

- **#157989**（插件捕获 SSD 磨损）：19 评论、影响硬件寿命，仍无 fix PR。
- **#132303**（tools.deny 安全失效）：需安全评审，风险敞口明确。
- **#114612**（memory 表无界增长）：7 月末提交至今，与 #164294/#172091 组成 SQLite 生命周期问题簇，建议统一规划。
- **#115256 / #162211**（两个 P0 release blocker）：均带 `no-new-fix-pr` 标签。
- 长期 PR：#68843（4 月起）、#68967（4 月起）、#121022（8 月起，P1 availability 风险）、#120889（Gemini 重复付费 batch，兼容性+安全边界标记）。

**健康度小结**：社区活跃度与贡献质量优秀，修复吞吐量可观（今日关闭 172 Issues）；但 SQLite/会话状态子系统的系统性问题簇和多个 P0 无 fix PR 状态值得维护者优先排期。

---

## 横向生态对比

# 开源个人 AI 助手/智能体生态横向对比分析报告

**数据窗口：2026-10-17 至 2026-10-18 | 对比对象：OpenClaw、Hermes Agent**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已明显从“尝鲜期”进入**生产化运维期**：两个头部项目的社区讨论焦点均从功能演示转向长期运行下的资源纪律、状态一致性与升级可靠性。架构上，“Gateway 统一运行时 + 多渠道接入（Telegram/Discord/Matrix/移动端语音）+ 本地会话归属”成为事实上的共同演进方向，OpenClaw 与 Hermes Agent 分别以不同节奏完成了 gateway 架构收敛。社区贡献质量显著提升——大量 issue 携带源码级复现与量化测量（如 21.3M token cache-write 分析、1.4GB 磁盘重写测量），用户画像正从爱好者转向自托管/生产运维工程师。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 328，关闭 172） | 500（新开/活跃 155，关闭 345） |
| Issue 关闭率 | ~34% | ~69% |
| PR 更新（24h） | 500（待合并 250 / 合并关闭 250） | 500（待合并 393 / 合并关闭 107） |
| Release | 无（基线 2026.10.1） | 无（main 处于大合并后收敛期） |
| 核心动态 | 测试精简 d238–d241、性能/流恢复 PR | unified-gateway-runtime 修复合围、kanban 系列加固 |
| 风险项 | 2 个 P0 release blocker 无 fix PR；SQLite 生命周期问题簇 | 外部贡献者 API 权限受阻（#131859）；393 PR 积压 |
| 健康度评估 | **B+**：治理节奏稳定、修复吞吐可观，但 P0 敞口与系统性 SQLite 风险待排期 | **A-**：处置效率高、批量问题收敛快，但 PR 积压与贡献通道隐患拉低分 |

**解读**：Hermes 关闭率（69%）约为 OpenClaw（34%）的两倍，处于主动收口状态；OpenClaw 新增活跃 issue（328）远高于 Hermes（155），一方面反映用户基数更大，另一方面也说明问题流入速度接近修复速度。

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **社区规模与专业度**：单日 328 条活跃 issue、多个 diamond/platinum 级讨论，issue 质量含源码级复现与量化数据，用户基数与参与深度均领先。
- **治理可见性**：核心维护者 @steipete 单日产出十余个结构化 PR（d238–d241 XL 级测试清理），代码质量治理节奏在同类项目中最为系统化。
- **平台纵深**：桌面 app、headless node 自更新、Android/iOS 实时语音、跨渠道（Google Chat 等）统一性改造，产品化覆盖面更广。

**技术路线差异：**
- OpenClaw 采用**渐进式重构**——在既有 gateway 上持续推进测试精简与性能优化（PostgreSQL turn 读取 5→1）；Hermes 则采用**大爆炸式架构合并**（#106742 unified-gateway-runtime 一次性合入后集中修复合围）。
- OpenClaw 的痛点集中在**状态子系统**（SQLite WAL、memory 表、transcript）；Hermes 痛点集中在**多 profile 会话归属与渠道路由**。

**待补短板**：两个 P0 release blocker（#162211、#115256）带 `no-new-fix-pr` 标签，以及 #132303 `tools.deny` 安全失效未评审——在安全与稳定性维度落后于 Hermes 当前“批量收敛”的节奏。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 共性诉求 |
|---|---|---|---|
| **Gateway 统一运行时 / 会话归属** | #119720 事件循环阻塞、#164799 准入缓慢 | #134889（171 评论，P0）unified-gateway-runtime 跟踪 | 单 gateway 拥有所有本地会话的架构成为共识，归属/生命周期一致性是共同战场 |
| **SQLite / 状态存储生命周期** | #164294 WAL 钉住、#172091 事务永久打开、#114612 memory 表无界增长 | #121095 browser 守护进程泄漏、#107402 更新器状态残留 | 长期运行下的存储资源纪律是第一系统性风险 |
| **Token 成本控制** | #143017（21.3M cache-write token 分析） | #4379（73% 固定开销 ~13.9K/次）、#6839 lazy tool schema | 有量化数据支撑的高优先级诉求 |
| **升级/更新可靠性** | #115424（OOM→7 次 core dump）、beta 回归疲劳（#118839） | #107402 fleet stale 警告残留、#33314 漂移检查钩子 | 自动更新机制的状态机健壮性 |
| **多 Agent 协作** | Google Chat sessionThread（#68967） | peer-send 消息 API（#118294）、共享内存池（#377，维护者本人提出） | Agent 间互联均在实际推进，Hermes 进度更靠前 |
| **渠道适配（上游变更）** | Android Talk 掉线、移动端语音可靠性 | #136567 Telegram forum topic 路由（cause/upstream） | 外部平台行为变更引发的持续适配负担 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| **功能侧重** | 桌面/移动全平台体验、Codex 等多后端集成、跨渠道统一 | kanban 自调度系统、skills 生态、Telegram/Discord/Matrix 多渠道网关、多 profile 隔离 |
| **目标用户** | 生产化运维团队与重度个人用户（关注 SSD 磨损、DB 纪律等硬件级问题） | 自托管爱好者与本地模型用户（Docker/NAS 场景占比高、对 token 成本敏感） |
| **技术架构** | 插件源捕获 + 状态 DB + transcript 维护的重状态网关；PostgreSQL/SQLite 混合 | unified-gateway-runtime 单网关集中式；kanban 调度 + skills 符号链接生态 |
| **模型策略** | 多后端（claude-cli、Codex 等）适配层 | 与 Nous 本地模型生态深度耦合，openai-codex provider 系列崩溃已收敛 |
| **成熟度信号** | 议题更“重”（release blocker、硬件寿命、安全评审） | 议题更“广”（渠道矩阵、贡献流程、PR 批量治理） |

---

## 6. 社区热度与成熟度

**活跃度分层（本窗口）：**
- **第一梯队**：两者均处 500 issue / 500 PR 量级，属生态头部。
- **OpenClaw — 快速迭代期偏后段**：问题流入速度高（328 新活跃），修复吞吐健康但关闭率仅 34%，测试精简战役表明正处于“还技术债 + 稳定性攻坚”阶段；多个 no-new-fix-pr 的 P0 说明尚未进入质量巩固期。
- **Hermes Agent — 质量巩固期**：69% 关闭率、批量重复 issue 集中关闭（openai-codex 系列、Docker 权限系列）、明确“从功能扩张转入质量收敛”的判断，处于大合并后的合围收口阶段。
- **隐患对比**：OpenClaw 的风险在产品本身（P0/安全）；Hermes 的风险在流程（393 PR 积压、外部贡献者无法开 PR）。

---

## 7. 值得关注的趋势信号

1. **“长期运行纪律”成为新的竞争力维度**。两个项目的头部 issue 全部指向 7×24 部署下的资源纪律（WAL、内存表、磁盘重写、守护进程泄漏）。对开发者的启示：智能体框架的下一轮分化点不是模型调用能力，而是**状态子系统的工程化质量**——SQLite 生命周期管理尤其值得提前投入。

2. **Gateway 统一化是架构共识，但代价高昂**。OpenClaw 与 Hermes 不约而同走向“单网关拥有所有本地会话”，且都为此付出大量回归修复。建议新项目直接以会话归属一致性为一等设计约束，而非事后收敛。

3. **Token 固定开销成为用户流失点**。73% 固定开销占比、lazy tool schema、cache-write 优化等诉求有第三方监控面板佐证——**成本可观测性工具**（token 预算、per-turn 发送预算如 OpenClaw #119992）将成为标配功能。

4. **多 Agent 互联从讨论走向落地**。Hermes 已有 peer-send API PR 与维护者本人提的共享内存池方案，OpenClaw 在做跨渠道 session 绑定——Agent 间通信协议值得早期布局。

5. **上游平台依赖是持续税负**。Telegram 行为变更、Android 语音栈掉线等“cause/upstream”问题占比上升，渠道抽象层与快速适配能力是运维稳定性的关键变量。

6. **社区贡献基础设施本身成为风险面**。Hermes 外部贡献者无法开 PR（#131859）与 OpenClaw 的 beta 回归疲劳共同提示：**贡献通道畅通与发布质量门禁**直接影响社区信任的复利效应。

---

*结论：OpenClaw 以平台纵深与社区规模领先，但需优先关闭 SQLite 问题簇与安全评审敞口；Hermes 以收敛效率与多 Agent/本地模型路线见长，需解决 PR 积压与贡献通道。两者共同验证：智能体开源生态的竞争焦点已从功能广度转向长期运行工程化。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报

**日期：2026-10-18 | 仓库：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)**

---

## 1. 今日速览

项目处于**高活跃度状态**：过去 24 小时内 Issues 更新 500 条（新开/活跃 155，关闭 345，关闭率约 69%，处置效率很高），PR 更新 500 条（待合并 393，已合并/关闭 107）。无新版本发布，但主线 `main` 正处于 **#106742 unified-gateway-runtime 合并后的修复冲刺期**（10-14 合入，跟踪 issue #134889 已累积 171 条评论），大量收敛工作正在进行。社区贡献持续涌入，以 @yoyodine-industries 的 kanban/skills 系列修复 PR 最为集中。整体健康度良好，但 gateway 会话归属、provider 兼容性等历史遗留问题仍是讨论焦点。

---

## 2. 版本发布

**今日无新版本发布。** 结合大量 P0/P1 修复仍在 main 分支收敛中（尤其 unified-gateway-runtime 后续修复），预计下一个版本将在 #134889 跟踪项关闭后推出。

---

## 3. 项目进展

今日 PR 合并/关闭 107 条，重要方向：

- **Unified Gateway Runtime 后续修复**：#106742 已于 10-14 合入 main（merge commit `eb75627f`），当前 #134889（171 条评论）作为跟踪 issue 汇总 post-merge 修复，横跨 sessions/profiles/streaming/desktop/TUI 等多个面。这是本周期最大的架构级变更。
- **Kanban 系统加固**（@yoyodine-industries 系列 PR）：包括并发上限跨板统计 [#118500](https://github.com/NousResearch/hermes-agent/pull/118500)、毒行隔离防止整轮调度中断 [#118290](https://github.com/NousResearch/hermes-agent/pull/118290)、评论 BLOB 存储 [#118546](https://github.com/NousResearch/hermes-agent/pull/118546)、板 DB 被替换时的防护 [#118421](https://github.com/NousResearch/hermes-agent/pull/118421)、card 级 `due_at` 调度唤醒 [#118559](https://github.com/NousResearch/hermes-agent/pull/118559)、review 派发隔离 [#118551](https://github.com/NousResearch/hermes-agent/pull/118551)。
- **Skills 符号链接生态修复**：skills 同步/回滚/索引遍历对 symlinked skill 的完整支持系列（[#118631](https://github.com/NousResearch/hermes-agent/pull/118631)、[#118700](https://github.com/NousResearch/hermes-agent/pull/118700)、[#118550](https://github.com/NousResearch/hermes-agent/pull/118550)）。
- **多 Profile 会话归属修复**：desktop session tiles 按 OWNING profile 分桶 [#124520](https://github.com/NousResearch/hermes-agent/pull/124520)；子进程正确命名所服务 profile [#120084](https://github.com/NousResearch/hermes-agent/pull/120084)。
- **Gateway 并发与安全**：超并发上限的 FIFO 准入队列替代 429 拒绝 [#118555](https://github.com/NousResearch/hermes-agent/pull/118555)；hub 认证的 peer-send 消息 API [#118294](https://github.com/NousResearch/hermes-agent/pull/118294)；TUI 认证条件化会话操作 [#135090](https://github.com/NousResearch/hermes-agent/pull/135090)。

**总体判断**：项目正从功能扩张期转入质量收敛期，多 profile / 多 gateway 架构的一致性缺陷被系统性清除。

---

## 4. 社区热点

1. **[#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（171 评论，P0）** — unified-gateway-runtime 合并后的跟踪 issue，"一个 gateway 拥有所有本地会话”的架构变更影响面极广（CLI/desktop/TUI/cron），是当前社区讨论的绝对中心。
2. **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（43 评论，blocked）** — 外部贡献者 @kuehnberger 无法通过 API 创建 PR（CreatePullRequest 权限错误），fork PR 与 issue 创建正常。**此项直接阻碍外部贡献流入，建议维护者优先排查**。
3. **[#136567](https://github.com/NousResearch/hermes-agent/issues/136567)（31 评论，P2）** — Telegram 论坛 DM 新建 topic 的首条消息缺失 `message_thread_id`，被 lobby recovery 误路由到旧 topic。标注 `cause/upstream`，属 Telegram 行为变更引发的适配问题。
4. **[#32892](https://github.com/NousResearch/hermes-agent/issues/32892)（38 评论，55 👍，已关闭）** — openai-codex provider `NoneType` 崩溃系列主 issue，相关重复 issue（#32903/#33237/#32956/#33932/#33041 等）均已集中关闭，表明该批次问题已修复收敛。
5. **[#4379](https://github.com/NousResearch/hermes-agent/issues/4379)（21 评论）+ [#6839](https://github.com/NousResearch/hermes-agent/issues/6839)（32 评论，21 👍）** — Token 开销优化诉求：73% 的固定开销（~13.9K tokens/次）与 Lazy Tool Schema 两段式注入方案，是**本地模型用户最强烈的功能诉求**。

---

## 5. Bug 与稳定性（按严重度）

| 严重度 | Issue | 状态/修复进展 |
|---|---|---|
| P0 | [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) gateway/session 归属回归跟踪 | 修复进行中，多个 PR 已挂靠 |
| P2 | [#136567](https://github.com/NousResearch/hermes-agent/issues/136567) Telegram topic 首消息误路由 | Open，上游原因，待适配 |
| P2 | [#107402](https://github.com/NousResearch/hermes-agent/issues/107402) `hermes update` 延迟重启后永久残留 fleet stale 警告 | Open，无明确 fix PR |
| P2 | [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) `browser_exec` 泄漏 browser_harness 守护进程（无超时） | Open，根因已定位，待修复 |
| P2 | [#99988](https://github.com/NousResearch/hermes-agent/issues/99988) Cron 失败分类器用子串匹配误判认证错误 | Open |
| P3 | [#123926](https://github.com/NousResearch/hermes-agent/issues/123926) 启动时遍历 `sys.modules` 导致插件**随机**静默加载失败 | Open，复现明确 |
| 已收敛 | openai-codex `NoneType` 系列（#32892 等）、Docker 权限系列（#23402/#20500/#15290） | 已关闭 |

---

## 6. 功能请求与路线图信号

- **Token 开销优化**（#6839 lazy tool schema、#4379 数据支撑）：呼声高、有量化数据，与计费/性能方向契合，最可能进入下一版本规划。
- **多 Agent 协作**：Discord 多实例历史注入 [#14853](https://github.com/NousResearch/hermes-agent/issues/14853)、子 Agent 共享内存池 [#377](https://github.com/NousResearch/hermes-agent/issues/377)（维护者 @teknium1 本人提出）。配合已提交的 peer-send 消息 API PR [#118294](https://github.com/NousResearch/hermes-agent/pull/118294)，**多 Agent 互联已在实际推进中**。
- **Hindsight 记忆增强**：多 bank 路由 [#31776](https://github.com/NousResearch/hermes-agent/issues/31776)（已关闭，可能已实现）。
- **运维体验**：更新后 skill/profile 漂移检查钩子 [#33314](https://github.com/NousResearch/hermes-agent/issues/33314)。
- **原生 Windows 支持** [#10359](https://github.com/NousResearch/hermes-agent/issues/10359)：已标记 implemented-on-main 并关闭。

---

## 7. 用户反馈摘要

- **满意点**：Issue 关闭速度快（69%），openai-codex 崩溃等批量问题已集中解决；kanban/gateway 修复 PR 描述详尽，社区贡献流程质量高。
- **痛点 1 — 部署与权限**：Docker/NAS 场景下 UID 权限、config 写入失败问题反复出现（#23402/#20500/#15290），说明自托管用户占比高、对镜像权限模型敏感。
- **痛点 2 — 成本**：固定 token 开销占比 73%，订阅用户和本地模型用户均强烈关注（#4379 有第三方监控面板佐证）。
- **痛点 3 — 多平台网关可靠性**：Telegram/Matrix/Discord 消息投递与会话路由是持续性抱怨点。
- **痛点 4 — 贡献受阻**：外部贡献者无法开 PR（#131859），直接影响社区参与。

---

## 8. 待处理积压（建议维护者关注）

1. **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)** — 贡献者 API 权限问题，标记 blocked 且仅影响单一账户，但长期不解决会打击核心外部贡献者积极性。
2. **[#121095](https://github.com/NousResearch/hermes-agent/issues/121095)** — browser 守护进程泄漏，长期运行部署的资源隐患，已挂起近一个月。
3. **[#107402](https://github.com/NousResearch/hermes-agent/issues/107402)** — 更新器状态机问题，影响所有自动更新用户的升级体验。
4. **[#123926](https://github.com/NousResearch/hermes-agent/issues/123926)** — 插件随机加载失败属"静默"故障，可诊断性差，建议提高优先级。
5. **PR 积压**：待合并 PR 达 393 个（其中 kanban 系列 10+ 个来自同一作者，逻辑互相关联），建议维护者按依赖顺序批量评审合入，避免长期 rebase 负担（#124520 已注明因 main 演进被迫 rebase）。

---

*数据来源：GitHub API，统计窗口 2026-10-17 至 2026-10-18。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*