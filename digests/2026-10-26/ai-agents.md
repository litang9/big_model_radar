# OpenClaw 生态日报 2026-10-26

> Issues: 358 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-25 22:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-26

---

## 1. 今日速览

- OpenClaw 今日保持**高度活跃**：Issues 更新 358 条（新开/活跃 279，关闭 79），PR 更新 500 条（待合并 233，已合并/关闭 267），显示维护者吞吐节奏健康但积压规模可观。
- **无新版本发布**，但社区讨论大量集中在 2026.10.x beta/稳定版的升级回归问题，尤其是 Windows 平台的升级与启动性能。
- 稳定性主线仍是 **SQLite WAL 膨胀/checkpoint 受阻**、**启动耗时回归**、**插件捕获阻塞事件循环** 三大类 P0/P1 问题，多数尚无 fix PR。
- Control UI 性能与渲染稳定性是当前 PR 侧的活跃战场，@steipete 密集提交了多个 UI 性能优化与测试瘦身批次。

---

## 2. 版本发布

过去 24 小时**无新版本发布**。社区正在使用 2026.10.5（稳定）/ 2026.10.7–2026.10.10-beta.3（beta）版本，升级路径回归问题频出（详见第 5 节）。

---

## 3. 项目进展

今日已合并/关闭 PR 267 条，代表性方向：

**Gateway / 核心运行时**
- [#183148](https://github.com/openclaw/openclaw/pull/183148) fix(gateway): 接受短会话导航提示，修复 Control UI 重载短会话 URL 返回裸 404（P0，待维护者审核）
- [#183252](https://github.com/openclaw/openclaw/pull/183252) fix(agents): 修复"形似工具调用的回复"导致 Gateway 卡顿数秒至数分钟（P1）
- [#183898](https://github.com/openclaw/openclaw/pull/183898) fix(agents): 内部会话轮次保留固定系统提示词与 prompt cache，避免长会话缓存全部失效
- [#182919](https://github.com/openclaw/openclaw/pull/182919) fix(talk): 修复 GPT-Live 中继在麦克风输入前收到输出即关闭的问题

**Control UI 性能专项**
- [#183800](https://github.com/openclaw/openclaw/pull/183800) perf(ui): 加快大型已完成会话的打开速度（滚动修复已发布，待性能验收）
- [#183601](https://github.com/openclaw/openclaw/pull/183601) perf(ui): 推迟闲置聊天引擎加载，加快冷启动
- [#183895](https://github.com/openclaw/openclaw/pull/183895) fix(ui): 初始加载时保持聊天行稳定不跳动

**测试与工程健康**
- 批量测试瘦身 d567/d569/d570（[#183879](https://github.com/openclaw/openclaw/pull/183879)、[#183896](https://github.com/openclaw/openclaw/pull/183896)、[#183903](https://github.com/openclaw/openclaw/pull/183903)）与 [#183498](https://github.com/openclaw/openclaw/pull/183498)（共享 Chromium、缩短 UI CI 时间），不改变产品行为，属系统性 CI 降本。

**判断**：项目在 UI 性能、测试基础设施和会话生命周期正确性上持续推进，但高严重度稳定性 Issue 的修复落地速度仍落后于报告速度。

---

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) Agent SQLite WAL 膨胀至 1.4–2.8 GB 阻塞 Gateway 启动（P0） | 136 评论 | Windows 用户长期受 WAL 无限增长困扰，手动 checkpoint 后复发，是当前最痛的存量问题 |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) 大型外部插件捕获导致 Gateway 阻塞数分钟（2026.9.6 回归，P0） | 54 评论 | #144252 引入的插件捕获机制成为性能回归源，与 #162585 的 staging 不收敛问题同根 |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) Gateway state DB WAL checkpoint 从未完成（被进程内 reader 钉住） | 32 评论 | 与 #143524 同族，指向 SQLite reader/checkpoint 架构性缺陷 |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) 长对话后 write/exec 工具参数被静默丢弃 | 15 评论 | 长会话可靠性问题，3 月至今未解 |
| [#67413](https://github.com/openclaw/openclaw/issues/67413) 按 Agent 配置 dreaming（5 👍） | 14 评论 | 多 Agent 用户的内存峰值/OOM 痛点，功能诉求明确 |

**背后诉求**：社区最强烈的两条主线是 **(1) SQLite 存储层的 WAL/checkpoint 稳健性** 与 **(2) Windows 平台的升级/启动体验**，二者均已在多个版本间反复回归。

---

## 5. Bug 与稳定性（按严重度排列）

**P0**
- [#143524](https://github.com/openclaw/openclaw/issues/143524) WAL 膨胀阻塞启动 — ❌ 无 fix PR（136 评论）
- [#160959](https://github.com/openclaw/openclaw/issues/160959) 插件捕获阻塞事件循环 — ❌ 无 fix PR
- [#159596](https://github.com/openclaw/openclaw/issues/159596) Gateway 内存锯齿、每日约 200 次 critical 内存压力事件（3 👍）— ❌ 无 fix PR
- [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 reclamation checkpoint 失败致 Agent 永久不可用 — ❌
- [#153426](https://github.com/openclaw/openclaw/issues/153426) MEMORY.md/USER.md 被 provenance ratchet 静默永久排除出 bootstrap 注入 — ❌

**P1**
- [#181619](https://github.com/openclaw/openclaw/issues/181619)（已关闭）Codex app-server 执行预算超时回归，2026.10.5→10.6 每个主轮次失败 — 已有处置
- [#168955](https://github.com/openclaw/openclaw/issues/168955) 2026.10.1 启动从 ~410s 退化到 ~1030s，`sidecars.control-ui-assets` 阻塞 477s — ❌
- [#182476](https://github.com/openclaw/openclaw/issues/182476) Windows 更新修复流程确定性失败（`OPENCLAW_STATE_LEASE_LOST`）— ❌
- [#183786](https://github.com/openclaw/openclaw/issues/183786) Windows beta 升级反复查询已停止的 Gateway PID，15+ 分钟未完成 — ❌
- [#181078](https://github.com/openclaw/openclaw/issues/181078) 2026.10.5 模型已回复但轮次失败（canonical session reader 失效），20 轮中 4 轮失败 — ❌
- [#148292](https://github.com/openclaw/openclaw/issues/148292) 会话自动压缩单次尝试、无超时，出现 23 分钟挂起 — ❌
- [#167876](https://github.com/openclaw/openclaw/issues/167876) Talk 咨询在 setup 完成后丢失 caller authority（安全审查中）— ❌
- [#168456](https://github.com/openclaw/openclaw/issues/168456) 模型 fallback 死于 transcript turn-key 断言（cron agentTurn）— ❌

**P2 值得关注**
- [#162585](https://github.com/openclaw/openclaw/issues/162585) 插件 staging 自我物化不收敛，290MB→612MB+/24min — ❌
- [#164948](https://github.com/openclaw/openclaw/issues/164948) `doctor --fix` 自死锁（busyTimeoutMs=0）— ❌
- [#89257](https://github.com/openclaw/openclaw/issues/89257) `backup create --verify` 退出码 13 且留下损坏归档（数据丢失风险）— ❌
- [#166137](https://github.com/openclaw/openclaw/issues/166137) Egress proxy 凭证替换间歇失效，请求带过期凭据到达上游（安全相关）— ❌

**已有关联 fix PR 的**：#183898（prompt cache 丢失）、#182919（Talk 提前关闭）、#183252（Gateway 卡顿）、#183148（短会话 404）。

---

## 6. 功能请求与路线图信号

- **Per-agent dreaming 配置** [#67413](https://github.com/openclaw/openclaw/issues/67413)（5 👍）：多 Agent 内存峰值问题真实且紧迫，与 [#159858](https://github.com/openclaw/openclaw/issues/159858)（闲置 worker 释放内存）同属资源治理主题，纳入概率较高。
- **大 transcript 冷归档** [#183827](https://github.com/openclaw/openclaw/pull/183827)：直接回应 WAL/DB 膨胀主诉，是存储层痛点的结构性方案，值得关注其合并进度。
- **Markdown 工作区记忆索引可配置排除** [#101422](https://github.com/openclaw/openclaw/issues/101422)（2 👍）：与 memory-core 方向一致，配合 [#183888](https://github.com/openclaw/openclaw/pull/183888)（PostgreSQL 关键词搜索避免全源扫描）显示记忆子系统在积极重构。
- **可配置 abort 触发词** [#164870](https://github.com/openclaw/openclaw/issues/164870)、**iOS/macOS 个人身份 opt-in** [#162164](https://github.com/openclaw/openclaw/issues/162164)：均标记 needs-product-decision，短期无落地信号。
- **审计运行时 skill 使用** [#141004](https://github.com/openclaw/openclaw/pull/141004)：长尾 PR，但契合可观测性方向。

---

## 7. 用户反馈摘要

- **Windows 用户痛苦显著**：升级卡死（#183786、#182476）、启动变慢（#168955）、WAL 膨胀（#143524）集中于 Windows，macOS/Linux 报告相对少，提示平台特定路径测试覆盖不足。
- **静默失败最招不满**：多个高热 Issue 的共同关键词是"silent"——参数静默丢弃（#53408）、消息静默滞留（#144594）、记忆静默排除（#153426）、Codex 静默回退（#181619）。用户反复要求**可观测性与恢复路径**，而不仅是修复。
- **自托管小主机用户**关注资源占用（#159858：稳态 650MB worker 堆），希望有闲置回收机制。
- **多 Agent / 自动化重度用户**受 cron agentTurn 失败链（#157986、#168456）影响，fallback 机制实际不可用。
- 正面信号：Control UI 体验持续改善（#183800、#183895），Talk 语音路径修复（#182919）获认可。

---

## 8. 待处理积压（维护者关注建议）

| Issue/PR | 状态 | 建议 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524)（136 评论，P0） | 开启已 47 天 | WAL/checkpoint 族问题（连同 #164294、#164948）应作为存储层专项统一处理 |
| [#160959](https://github.com/openclaw/openclaw/issues/160959)、[#162585](https://github.com/openclaw/openclaw/issues/162585) | needs-maintainer-review | 插件 source-capture 架构问题影响所有非内置插件用户 |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) | 7 个月未修 | 长会话静默参数丢失，needs-info 反复，建议提升排查优先级 |
| [#159596](https://github.com/openclaw/openclaw/issues/159596) | 标记 stale 但 3 👍 | 内存锯齿 P0 不应 stale |
| [#127770](https://github.com/openclaw/openclaw/pull/127770) | waiting on maintainer，8 月至今 | OpenAI 原生 PDF opt-in，兼容性风险已标记，需裁决 |
| [#141004](https://github.com/openclaw/openclaw/pull/141004) | 9 月至今未合 | 审计功能 PR 积压近 2 个月 |
| [#127195](https://github.com/openclaw/openclaw/issues/127195) | needs-product-decision | 16 处相同错误字符串无判别码，可观测性债务，修复成本低收益高 |

---

**健康度小结**：社区参与度与贡献吞吐处于高位（日均有数百条 Issues/PR 活动和大量外部贡献 PR），但 P0 级存储层稳定性问题的平均修复周期偏长（40+ 天），且 2026.10.x 连续多个版本引入启动/升级回归，建议在下一个版本前冻结功能、集中偿还 Windows 升级路径与 SQLite WAL 两笔技术债。

---

## 横向生态对比

# 开源 AI 智能体生态横向对比分析报告 — 2026-10-26

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**“架构整合后的深水期”**：头部项目均在从“功能堆叠”转向以 Gateway/统一会话运行时为核心的集中式架构，但随之而来的是大范围回归与稳定性消化。两大标杆项目（OpenClaw、Hermes Agent）日均 Issue/PR 活动均达数百条量级，社区参与度处于历史高位。共性技术债集中在三处：**本地存储层（SQLite WAL/checkpoint）稳健性、Windows 平台升级/启动路径、大架构合并后的回归长尾**。用户群体从尝鲜者转向自托管重度用户与自动化生产用户，对可观测性、静默失败恢复路径的诉求显著超过对新增功能的诉求。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（新开/活跃） | 358（279） | 363（326） |
| Issue 关闭 | 79 | 37 |
| PR 更新 | 500 | 500 |
| PR 待合并 | 233 | 381 |
| PR 合并/关闭 | 267 | 119 |
| Release | 无（2026.10.5 稳定 / 10.10-beta.3） | 无（v0.22.x） |
| 全库最热话题 | #143524 WAL 膨胀（136 评论） | #134889 统一网关追踪（219 评论） |
| 健康度评估 | **中高**：合并吞吐优于 Hermes（267 vs 119），但 P0 存储层问题平均修复周期 40+ 天，多版本连续回归 | **中高**：贡献流旺盛但 review 瓶颈明显（381 待合并 PR，积压达合并量的 3 倍以上） |

两者均呈“高活跃 + 大积压”形态；OpenClaw 吞吐更健康，Hermes 贡献增长更快但消化能力不足。

## 3. OpenClaw 在生态中的定位

**优势**
- **合并吞吐领先**：日合并/关闭 267 条，是 Hermes（119）的 2.2 倍，维护者带宽充足。
- **工程质量文化成熟**：系统性 CI 降本（测试瘦身 d567-d570、共享 Chromium）、核心贡献者（@steipete）密集推进 UI 性能专项。
- **功能纵深**：Talk 语音、dreaming、memory（MEMORY.md/USER.md bootstrap 注入）、插件生态、PostgreSQL 关键词搜索等子系统齐全，定位为“全功能个人 AI 助手平台”。

**技术路线差异**
- OpenClaw 采用 Gateway + Control UI 分层、SQLite 状态库 + 插件捕获机制——正因存储层与插件架构的复杂度，当前痛点集中在架构性缺陷（WAL 被 reader 钉住、staging 不收敛）。
- Hermes 刚于 10 月完成 Unified Gateway 大合并（#106742），将 CLI/TUI/Desktop/API/bot/cron 全部表面收归单进程——路线更激进的“大一统”，代价是全表面回归；而 OpenClaw 的网关架构已运行多版本，处于回归修复而非架构落地阶段。

**社区规模**：两者 Issue/PR 活动量级相当（Issue 358 vs 363），OpenClaw 关闭率更高（22% vs 10%），Hermes 外部贡献者单日多投（如 Adolanium 一日 4+ PR）显示贡献生态更年轻、更活跃。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **Windows 平台质量** | #143524、#182476、#183786、#168955 | #122160、#130889、#133253、#68128 | 升级卡死/失败、启动退化、进程锁死，两项目 Windows 均为质量洼地 |
| **升级/更新可靠性** | 10.x 连续升级回归 | #125437 更新失败无恢复路径（周 15 个 Discord 线程） | 自动更新需原子性 + 产品内恢复机制 |
| **资源治理** | #159596 内存锯齿、#159858 闲置 worker、#67413 per-agent dreaming | #127647 Desktop 空闲 CPU/GPU 消耗 | 闲置回收、per-agent 资源配置 |
| **会话/长对话可靠性** | #53408 参数静默丢弃、#148292 压缩挂起 | #139818 会话 resume 失败、#141973 插话不可靠 | 长会话正确性与实时交互转向 |
| **可观测性** | #127195 错误无判别码、多个 "silent" 类问题 | #62728 测试对 verifier 不可见 | 静默失败是两社区最大公约数的抱怨 |
| **分布式/远程部署** | 相对较弱 | #18715（👍42）、#38519（👍31）远程 agent + 本地工具 | Hermes 用户诉求显著更强 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 记忆系统（dreaming、markdown 工作区索引）、语音（Talk/GPT-Live）、插件捕获生态 | 多表面统一网关、Kanban/自动化、社区插件目录、agent 自评审（/review 工具） |
| 目标用户 | 个人长期陪伴型助手用户、自托管小主机用户 | 自动化/多表面重度用户（Desktop + bot + cron）、分布式部署诉求者 |
| 技术架构 | 成熟分层 Gateway + Control UI，SQLite 状态库为单点风险 | 单进程大一统 Gateway（新落地），状态库同样面临 ~1GB state.db 问题（#133253） |
| 痛点性质 | 架构性存量债（WAL、插件捕获） | 迁移性增量债（post-merge 回归长尾） |
| 安全姿态 | egress 凭证替换、caller authority 等传统安全线 | fail-closed 过度（扫描器/守卫误报）引发社区反弹 |

## 6. 社区热度与成熟度

- **OpenClaw —— 质量巩固阶段**：功能面已宽，用户对稳定性的要求超过新功能；连续多版本回归（10.1 启动退化、10.5→10.6 预算超时）表明发布节奏可能快于验证能力。P0 平均修复 40+ 天、7 个月未修的 #53408 是明显信号。建议方向：版本冻结 + 技术债专项。
- **Hermes Agent —— 快速迭代阶段**：v0.22.x 早期版本号、大架构刚落地、外部贡献爆发式增长（日新开 Issue 326 为 OpenClaw 的 1.17 倍）、review 积压 381 条。处于“用吞吐换稳定”的典型早期扩张期。
- 分层结论：OpenClaw 是**成熟度更高但债更陈旧**的项目，Hermes 是**动能更强但债更新鲜**的项目。

## 7. 值得关注的趋势信号

1. **“统一网关/单进程运行时”成为架构共识**，但两大项目同时证明其代价：全表面回归。新进入者应将 Gateway 迁移的兼容层与回归测试预算前置。
2. **SQLite 是本地 Agent 的共性阿喀琉斯之踵**：WAL 膨胀、checkpoint 被钉住、1GB state.db 阻塞更新——两项目均中招。冷归档（OpenClaw #183827）或替代存储层将成为基础设施级机会。
3. **静默失败 > 功能缺失**：用户最强烈诉求是可观测性与恢复路径（判别码、失败可见、产品内自愈）。对开发者的启示：error taxonomy 与恢复 UX 是差异化竞争点，且修复成本低。
4. **Windows 是所有桌面 AI 助手的二等公民**：两项目 Windows 问题集中度极高，专注 Windows 质量本身就是竞争优势。
5. **资源治理是下一个功能高地**：闲置回收、per-agent 资源配置（#67413）、空闲 CPU/GPU 治理（#127647）——自托管/终端设备场景的必然需求。
6. **分布式形态（远程 agent + 本地工具执行）票数最高**（Hermes #18715 👍42），预示个人助手将从“单机产品”演进为“边缘-云端混合架构”。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-26

---

## 1. 今日速览

Hermes Agent 过去 24 小时呈**高活跃度**状态：Issues 更新 363 条（新开/活跃 326，关闭 37），PR 更新 500 条（待合并 381，已合并/关闭 119），无新版本发布。项目核心焦点仍集中在 **10 月 14 日合并的 Unified Gateway（#106742）后的回归修复**，其后续追踪 issue #134889 已累计 219 条评论，为全库最热话题。社区贡献节奏稳定，大量外部贡献者（Adolanium、teknium1 等）持续提交 webapp/gateway 修复与功能 PR。整体看，项目处于“大架构合并后的消化与稳定期”，合并吞吐（119 条/日）健康，但 open issue 与待合并 PR 积压（381 条）偏大。

---

## 2. 版本发布

无新版本发布。最新版本仍为 v0.22.x 系列（issue 中可见 `v0.22.5+9-g67491b50` 安装标识）。

---

## 3. 项目进展

今日 PR 活动以**待合并修复流**为主，以下为代表性方向：

- **Webapp/网关可靠性批量修复**（作者 @Adolanium 一日多投）：
  - [#144665](https://github.com/NousResearch/hermes-agent/pull/144665) 修复主机终端 tab 在输入队列满时关闭后 shell 未分离的问题
  - [#144662](https://github.com/NousResearch/hermes-agent/pull/144662) profile 启动等待期间返回 internal error → 改为等待就绪
  - [#144663](https://github.com/NousResearch/hermes-agent/pull/144663) 非 secure context 下 Web Locks 缺失时每次发送独立重试记录
  - [#144659](https://github.com/NousResearch/hermes-agent/pull/144659) 下载重试可再次使用 ticket
- **性能与启动优化**：
  - [#144647](https://github.com/NousResearch/hermes-agent/pull/144647) 保持 commit-graph 新鲜，`git tag --merged` 版本查询从 0.39s 降至 0.05s
  - [#144625](https://github.com/NousResearch/hermes-agent/pull/144625) scratch-dir 清理移入分离子进程，启动不再阻塞
- **网关控制通道**：[#144701](https://github.com/NousResearch/hermes-agent/pull/144701) 控制 reads 移出串行通道，修复 `session.control.read` 30s 超时
- **新功能**：
  - [#144633](https://github.com/NousResearch/hermes-agent/pull/144633) ElevenLabs TTS 支持 agent 自选/检索音色
  - [#141404](https://github.com/NousResearch/hermes-agent/pull/141404) `review` 工具：agent 可自行启动 /review 独立评审器（独立模型 + 异步委托轨道）
  - [#144260](https://github.com/NousResearch/hermes-agent/pull/144260) 插件目录新增社区插件 netplane 0.2.0（Headscale 控制面）
- **安全/凭据**：[#144699](https://github.com/NousResearch/hermes-agent/pull/144699) vault 支持为已存登录授权精确 origin 别名

**评估**：每日 119 条合并/关闭，主线处于统一网关架构落地后的密集修补阶段，webapp 与 gateway 稳定性修复是当前推进主线。

---

## 4. 社区热点

1. **[#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（219 评论，CLOSED）** — Unified Gateway 合并后追踪 issue。#106742 将所有本地会话收归单一 gateway 进程，波及 CLI、TUI、Desktop、API、编辑器、消息 bot、cron、Kanban 等全部表面，后续修复量巨大，由 @unsupportedpastels 持续追踪。
2. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（23 评论）** — 接续 #134889 的 main 分支 post-merge 问题清单，@dokterdok 系统性梳理统一网关遗留问题，是当前社区关注的核心。
3. **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（51 评论，P3，blocked/upstream）** — 贡献者 @kuehnberger 无法通过 API 创建 PR（CreatePullRequest 权限错误），疑似 GitHub 平台侧问题，影响外部贡献体验。
4. **[#127647](https://github.com/NousResearch/hermes-agent/issues/127647)（31 评论，P2）** — Desktop 空闲资源消耗追踪（渲染进程 CPU/GPU、后端 serve CPU、内存），用户对桌面端耗电/发热不满。
5. **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)（31 评论，👍42）** — 远程 Agent + 本地工具执行的需求长期高票，反映分布式部署场景诉求强烈。

**背后诉求**：社区最关心的是统一网关架构迁移的稳定性，以及远程/分布式使用模式（远程后端、前端-only 安装、远程 agent）——这类 issue 普遍票数高、讨论长。

---

## 5. Bug 与稳定性（按严重度）

**P0/P1**
- [#125437](https://github.com/NousResearch/hermes-agent/issues/125437)（P1）— 更新失败留下半套安装、裸错误、无产品内恢复路径；本周 15 个 Discord 线程受影响。暂无专门 fix PR。
- [#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（P0 标签）— 单 gateway 拥有全部本地会话的追踪，post-merge 修复进行中。

**P2（重点）**
- [#139818](https://github.com/NousResearch/hermes-agent/issues/139818) — 远程后端 desktop 会话本地无法 resume（not_found），统一网关 fallout。
- [#130889](https://github.com/NousResearch/hermes-agent/issues/130889) — Windows 网关后端卡死：`ProcessRegistry._lock` 在阻塞 `stream.close()` 期间被持有，耗尽整个 RPC 池。部分相关修复见 [#129674](https://github.com/NousResearch/hermes-agent/pull/129674)。
- [#141973](https://github.com/NousResearch/hermes-agent/issues/141973) — Desktop 中途插话不可靠：排队而非转向、“已发送”但 harness 未收到、Steer 按钮静默无效。
- [#133253](https://github.com/NousResearch/hermes-agent/issues/133253) — Desktop 更新被 ~1GB state.db 预检 30s 硬超时阻塞。
- [#125695](https://github.com/NousResearch/hermes-agent/issues/125695) — 单个 model_entitlement 冷却导致智能审批/视觉/标题全禁一年（辅助路由未隔离模型作用域）。
- [#129455](https://github.com/NousResearch/hermes-agent/issues/129455) — 默认安装下导入时 PM 激活探测触发 home_io_guard，测试套件大面积失败。
- [#121954](https://github.com/NousResearch/hermes-agent/issues/121954) — Linux Desktop 启动即 SIGTRAP/SIGSEGV 崩溃（needs-repro）。

**P3**
- [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) — Windows 下 WhatsApp bridge 在 no-breakaway job object 中 spawn 失败（WinError 5）。
- [#142461](https://github.com/NousResearch/hermes-agent/issues/142461) — Discord 自动线程 automation wake 永久 admission_conflict。

**修复信号**：今日多个 PR（#144701、#144662、#144665）直接回应 gateway/session 类问题；安装更新类（#125437、#133253）修复尚不明确。

---

## 6. 功能请求与路线图信号

- **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)（👍42，needs-decision）**：远程 agent + 本地工具执行。与统一网关架构方向一致，被纳入路线图概率较高。
- **[#38519](https://github.com/NousResearch/hermes-agent/issues/38519)（👍31）**：Windows 仅安装 Desktop 前端连接远程 agent——与 #18715 同属分布式场景，社区票数持续积累。
- **[#11911](https://github.com/NousResearch/hermes-agent/issues/11911)（👍13）**：iOS/Android 原生 App + 语音通话。体量大，尚处 needs-decision。
- **[#10421](https://github.com/NousResearch/hermes-agent/issues/10421)（👍10）**：turn 级实时时间上下文，讨论成熟、实现成本低，可能近期落地。
- **[#139961](https://github.com/NousResearch/hermes-agent/issues/139961)**：既有 Desktop Group Chats 迁移到 gateway 托管房间——是 #106742 的自然延伸，优先级高。
- **PR 侧信号**：[#141404](https://github.com/NousResearch/hermes-agent/pull/141404)（review 工具）、[#144633](https://github.com/NousResearch/hermes-agent/pull/144633)（ElevenLabs 音色选择）已进入 review，有望进入下一版本。

---

## 7. 用户反馈摘要

**痛点**
- **升级路径脆弱**：更新失败无恢复，全靠手打命令（#125437），Windows 用户尤甚（#122160、#68128、#130889、#133253 集中在 os/windows）。
- **统一网关迁移阵痛**：会话恢复、连接、插话转向、profile 启动等多点回归（#139818、#141973、#143547）。
- **Desktop 资源占用**：空闲 CPU/GPU/内存消耗（#127647）、Linux 崩溃（#121954）、6% 透明度怪异默认值（#143426，👍11）。
- **误报式安全机制**：内容扫描器将安全文档判为攻击（#84672）；终端生命周期守卫误杀良性 Node CLI（#105758）——社区对“fail-closed 过度”不满。
- **可观测性缺失**：真实测试运行对 verifier 不可见，agent 重复跑 ad-hoc 测试（#62728）。

**满意/认可点**
- Kanban/自动化（自动线程、block-loop 恢复）等高级功能被真实使用且反馈细致（#79728、#142461），说明深度用户群体活跃。
- 外部贡献者修复质量高、提交描述规范（Adolanium 的 webapp 系列、#144625/#144647 的启动性能优化均有真实 A/B 数据）。

---

## 8. 待处理积压

- [#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（blocked/cause-upstream）— 贡献者 PR 创建权限问题，建议维护者主动跟进 GitHub 支持。
- [#125437](https://github.com/NousResearch/hermes-agent/issues/125437)（P1，9/27 开）— 更新失败恢复路径，一周 15 个 Discord 线程，用户痛感最强却无 fix PR。
- [#127647](https://github.com/NousResearch/hermes-agent/issues/127647)（P2，9/29 开）— Desktop 空闲资源消耗，有分类计划但需持续推进。
- [#121954](https://github.com/NousResearch/hermes-agent/issues/121954)（needs-repro）— Linux Desktop 崩溃，等待维护者复现确认。
- [#84672](https://github.com/NousResearch/hermes-agent/issues/84672)、[#105758](https://github.com/NousResearch/hermes-agent/issues/105758) — 扫描器/守卫误报类问题长期未解，影响安全研究用户与终端工作流。
- PR 积压 381 条待合并（如 [#129674](https://github.com/NousResearch/hermes-agent/pull/129674)、[#80143](https://github.com/NousResearch/hermes-agent/pull/80143)、[#135494](https://github.com/NousResearch/hermes-agent/pull/135494)），review 吞吐是当前瓶颈。

**健康度小结**：活跃度与健康度均为高位，主要风险是统一网关大合并的回归长尾与 381 条待合并 PR 的 review 积压。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*