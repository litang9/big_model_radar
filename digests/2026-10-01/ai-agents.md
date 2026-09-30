# OpenClaw 生态日报 2026-10-01

> Issues: 475 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-30 23:46 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-01

---

## 1. 今日速览

OpenClaw 今日整体活跃度**高位运行**：过去 24 小时 Issues 更新 475 条（新开/活跃 313，关闭 162），PR 更新 500 条（待合并 310，已合并/关闭 190），并发布了新版本 **v2026.9.7**（518 个直接提交、2,818 个 PR、334 位贡献者）。项目贡献吞吐量极强，但社区焦点明显集中在 **2026.9.4–9.6 引入的 Gateway 内存泄漏与崩溃循环（crash-loop）** 系列 P0 问题上——多起高热 Issue 涉及 `prepared-model-catalog.worker.js` 无界内存增长、SQLite WAL 失控、关机失败等，且大量仍处 `clawsweeper:needs-maintainer-review` 状态，修复滞后于发布节奏，值得维护者优先关注。

---

## 2. 版本发布

### v2026.9.7（2026-09-30 发布）
- **规模**：518 direct commits · 2,818 PRs · 334 contributors —— 本月系列版本中体量较大的一次
- **Release Notes**：https://docs.openclaw.ai/rel（以 docs-v1 格式发布，含 release notes 与 changelog 双格式）
- **⚠️ 迁移注意事项**（从 Issue #157160 可见）：
  - Schema 已从 17 → 18 迁移；有用户报告升级到 2026.9.6 后 Gateway 在 `plugin-doctor-post-session-state` 阶段崩溃循环（该 Issue 已关闭，疑似已在 9.7 修复，但升级前建议快照）
  - 升级到 2026.9.5/9.6 的用户应先评估下文 P0 内存/稳定性问题，再决定是否直接跳到 9.7

---

## 3. 项目进展

今日 PR 侧呈“量大面广”格局，重要方向包括：

**性能与内存**（正面回应本周 P0 风暴）
- [PR #160442](https://github.com/openclaw/openclaw/pull/160442)（@steipete，ready for maintainer look）：worker 进程按需加载能力，文本回合更快达到准入、内存更低——直接针对 Gateway 内存压力问题
- [PR #155300](https://github.com/openclaw/openclaw/pull/155300)（@azuretek，P1）：修复配置重发布导致 `sessions.list` 卡死数分钟的问题

**稳定性与升级路径**
- [PR #162206](https://github.com/openclaw/openclaw/pull/162206)：升级期间保留 legacy 投递与 Telegram 队列，防止 spool 文件不可达
- [PR #159873](https://github.com/openclaw/openclaw/pull/159873)：防止重启后 one-shot cron 重复投递
- [PR #160128](https://github.com/openclaw/openclaw/pull/160128)（已关闭）：Gateway 重启后恢复压缩中的回合

**生态扩展**
- [PR #160246](https://github.com/openclaw/openclaw/pull/160246)：opt-in 公司/产品 MCP 内置插件，目标 66 个集成——生态扩张信号明显
- [PR #162207](https://github.com/openclaw/openclaw/pull/162207)：Visitor Access 支持区分“按人吊销”与“取消单个邀请”

今日 steipete 贡献密集（至少 6 个 PR），围绕 Doctor 清理、Code Mode worker 生命周期、watch overflow 等系统性修缮。整体看，项目在**架构清理 + 升级安全 + 生态集成**三条线上稳步推进。

---

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524)（97 评论，P0） | 🔥 最高 | Windows 下 Agent SQLite WAL 无 checkpoint，数日膨胀至 1.4–2.8 GB 并阻塞 Gateway 启动；自 9 月 9 日报告至今 3 周未修复，`needs-maintainer-review` 状态引发用户强烈不满 |
| [#153257](https://github.com/openclaw/openclaw/issues/153257)（40 评论） | 🔥 | 标题即诉求："2026.9.5 把稳定环境变成 8 小时故障恢复会话”——用户对升级质量与回归测试的信任危机 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925)（30 评论，3 月至今） | 长期痛点 | Subagent 完成结果静默丢失、无重试无通知——编排可靠性问题横跨半年 |
| [#149538](https://github.com/openclaw/openclaw/issues/149538)（22 评论，P0） | 高 | 632-agent 大舰队场景下 Gateway ready 后事件循环饿死、/health 全超时 |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) / [#159596](https://github.com/openclaw/openclaw/issues/159596) / [#160548](https://github.com/openclaw/openclaw/issues/160548) | 高 | 三起独立报告指向同一根因：`prepared-model-catalog.worker.js` 内存泄漏 4–5 GB/h，且每次内存回收会**杀掉所有等待中的回合** |

**诉求画像**：社区不满集中在"发布节奏快于修复节奏”——高优先级 Issue 长期挂 `clawsweeper:no-new-fix-pr` + `needs-maintainer-review` 标签，用户希望维护者对 P0 crash-loop 类问题给出明确 SLA。

---

## 5. Bug 与稳定性（按严重程度）

### P0 — 稳定性/发布阻塞级
| 问题 | 状态 |
|---|---|
| [#159662](https://github.com/openclaw/openclaw/issues/159662) catalog worker 内存泄漏 4-5 GB/h，provider 无关 | ❌ 无 fix PR |
| [#160548](https://github.com/openclaw/openclaw/issues/160548) 9.6 每 5 分钟泄漏 1 GiB，回收时杀掉等待回合 | ❌ 无 fix PR |
| [#159596](https://github.com/openclaw/openclaw/issues/159596) 内存锯齿，~200 次/天 critical 压力事件 | ❌ 无 fix PR |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) SQLite WAL 失控（Windows） | ❌ 无 fix PR |
| [#157325](https://github.com/openclaw/openclaw/issues/157325) 卡死的 agent-DB 资源导致全部 agent 回复失败直至重启 | ❌ 无 fix PR |
| [#159612](https://github.com/openclaw/openclaw/issues/159612) subagent "owner changed before settlement" 无限重试、每回合重注入结果 | ❌ 无 fix PR |
| [#160521](https://github.com/openclaw/openclaw/issues/160521) reconcileActive 未处理 rejection 导致 Gateway 崩溃 | ❌ 无 fix PR |
| [#158126](https://github.com/openclaw/openclaw/issues/158126) 关机 ~50% 概率失败 "Worker environment inventory has closed" | ❌ 无 fix PR |
| [#158239](https://github.com/openclaw/openclaw/issues/158239) 老内核（<5.6）主机 JS fallback 下无法启动 | ❌ 无 fix PR |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) 大舰队事件循环饿死 | ❌ 无 fix PR |

### P1 — 消息丢失/会话状态
- [#148707](https://github.com/openclaw/openclaw/issues/148707)：9.4 回归——并发回合顶替导致回复丢失（"no active tool authority snapshot"），与 [#144809](https://github.com/openclaw/openclaw/issues/144809) 同族
- [#159094](https://github.com/openclaw/openclaw/issues/159094)：state-lifecycle 租约自冲突（StateDatabaseCoordinatorContentionError）
- [#97616](https://github.com/openclaw/openclaw/issues/97616)：hook/tool 子进程僵尸累积
- [已关闭 ✅] [#161654](https://github.com/openclaw/openclaw/issues/161654)：Windows DataCloneError 使 cron 任务失败——当日新报即修复，响应速度值得肯定

### 安全相关（需重视）
- [#108395](https://github.com/openclaw/openclaw/issues/108395)：模型可伪造 "Human:" 格式消息自我授权 live actions
- [#132303](https://github.com/openclaw/openclaw/issues/132303)：`tools.deny` 对 claude-cli 后端不生效
- [#157126](https://github.com/openclaw/openclaw/issues/157126)：MCP 桥继承错误请求作用域，重启恢复后丢失 operator.admin

---

## 6. 功能请求与路线图信号

- **每日 Agent 花费限额**（[#121729](https://github.com/openclaw/openclaw/issues/121729)，已关闭/stale）：共享与单 agent 日预算，消费者侧运营刚需；结合 [PR #141004](https://github.com/openclaw/openclaw/pull/141004)（运行时 skill 使用审计）可看出“运营可观测性”是明确方向，限额类功能有望回归
- **动态模型目录**（[#74481](https://github.com/openclaw/openclaw/issues/74481)）：从 provider `/v1/models` 刷新目录——伴随 [PR #160246](https://github.com/openclaw/openclaw/pull/162061) 的 66 个 MCP 内置集成，生态扩展信号强烈
- **Provider 冷却恢复机制**（[#115642](https://github.com/openclaw/openclaw/issues/115642)）：探测式恢复 + usage-limit 错误短 TTL + 手动重置——已有多个同类 Issue 汇聚（#70903），大概率进入下一版本
- **内存治理重构**：[#157630](https://github.com/openclaw/openclaw/issues/157630)、[#157575](https://github.com/openclaw/openclaw/issues/157575) 揭示 managed Gateway 堆标志覆盖 per-worker resourceLimits 的设计缺陷；PR #160442 的按需加载是第一步，后续应期待系统性内存预算修复

---

## 7. 用户反馈摘要

**痛点（按出现频率）**：
1. **不敢升级**：Watchtower 自动升级导致的崩溃循环（#157160）、“升级即 8 小时恢复会话”（#153257）造成明显的升级恐惧，部分用户被迫固定版本或依赖快照回滚
2. **无人值守场景不可靠**：subagent 结果静默丢失（#44925）、billing 冷却数小时（#70903）直接影响“AI 助手 7×24 运行”的核心用例
3. **资源占用失控**：单用户轻负载即可吃满 8–15 GB 内存（#159662、#154812），与“个人助手”定位冲突
4. **Windows 支持为二等公民**：WAL 失控、DataCloneError 等 P0 均首发于 Windows

**正面信号**：
- 多个高难 Issue 附带详尽的 source-repro 与 sanitizer 报告，社区贡献者质量高
- [#161654](https://github.com/openclaw/openclaw/issues/161654) 当日报当日关，说明核心链路的响应能力仍在线
- 长尾 PR（如 #59414 Doctor 生命周期建议、#112945 语音转写回显）显示 UX 细节也在被认真打磨

---

## 8. 待处理积压（维护者关注清单）

| Issue/PR | 积压时长 | 呼吁 |
|---|---|---|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) subagent 结果静默丢失 | **~6.5 个月**（3 月至今） | 需产品决策，用户反复顶贴 |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) billing 冷却锁死 | ~5 个月 | 已 stale，但诉求仍活跃 |
| [#108395](https://github.com/openclaw/openclaw/issues/108395) 安全自我授权 | 2.5 个月，`needs-security-review` | 安全类不应长期挂起 |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) WAL 失控 | 3 周，97 评论 | 最高热度 P0，急缺 fix PR |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) 同步持久化阻塞事件循环 | 近 2 个月 | 规模化用户的架构性瓶颈 |
| [PR #112694](https://github.com/openclaw/openclaw/pull/112694) memory_get recall 追踪 | **~2.3 个月** | 阻塞记忆 dreaming 晋升功能闭环 |
| [PR #111782](https://github.com/openclaw/openclaw/pull/111782) Bedrock Mantle 路由修复 | ~2.3 个月 | P1，仅缺 proof |
| [PR #113241](https://github.com/openclaw/openclaw/pull/113241) acpx 提示词开销优化 | ~2.2 个月 | 低风险改进长期未审 |

**健康度总评**：贡献活跃度 A / 发布节奏 A / P0 响应 C+。当前最大风险是 2026.9.x 系列内存与状态管理回归的修复速度跟不上发布速度，建议维护者在 9.7 之后安排一个专注稳定性的修复版本。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告
**数据日期：2026-10-01 | 覆盖项目：OpenClaw、Hermes Agent**

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道已进入**高吞吐、高回归风险并存**的规模化阶段：头部项目日均可处理 475–500 条 Issue 与 PR 更新，数百贡献者协同，发布节奏以“周”甚至“天”计。与此同时，两个项目都暴露出同一结构性矛盾——**功能扩张速度（MCP 集成、agent 编排、多平台接入）显著快于稳定性治理（内存管理、升级安全、状态一致性）**，“升级恐惧”成为社区最高频负面情绪。此外，计费/信任类问题（Nous Portal 计费纠纷、OpenClaw 每日花费限额诉求）表明生态正从爱好者工具向**7×24 生产级运营**过渡，运营可观测性与成本控制成为新刚需。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 475（新开/活跃 313，关闭 162） | 500（新开/活跃 426，关闭 74） |
| PR 更新（24h） | 500（待合并 310，合并/关闭 190） | 500（待合并 411，合并/关闭 89） |
| Release | v2026.9.7（518 commits / 2,818 PRs / 334 贡献者） | 无（client/backend v0.21.5 迭代中） |
| P0 问题存量 | 10+ 项无 fix PR（内存泄漏、crash-loop、WAL 失控） | 0 项挂起（4 个 P0 fix PR 推进中） |
| 关闭/新增比 | 52%（162/313） | 17%（74/426） |
| 积压时长 Top | #44925 约 6.5 个月 | #30708 >4 个月 |
| **健康度评估** | 贡献 A / 发布 A / **P0 响应 C+** | 贡献 A / **修复推进 B+** / 积压决策 B- |

**关键差异**：OpenClaw 关闭率更高但 P0 修复滞后；Hermes 新问题涌入更快（426 vs 313）而关闭率偏低，显示其仍处快速扩张期，稳定性欠账集中在更新链路与桌面端。

---

## 3. OpenClaw 在生态中的定位

**优势**：
- **规模与吞吐**：334 位贡献者、单版本 2,818 PR，工程体量为生态内标杆级；
- **架构纵深**：Gateway/subagent/catalog worker 多层架构，支持 632-agent 舰队场景（虽暴露瓶颈，但也证明目标定位是企业级大规模编排）；
- **生态扩张激进**：PR #160246 一举内置 66 个 MCP 集成，平台化意图明显；
- **核心链路响应在线**：#161654 当日报当日关。

**风险**：2026.9.4–9.6 引入的内存泄漏系列 P0 全部无 fix PR，97 评论的 WAL 失控已挂 3 周——**发布节奏快于修复节奏是当前最大软肋**。

**与 Hermes 的路线差异**：OpenClaw 走“多 agent 编排 + 企业/舰队级 Gateway”的重架构路线；Hermes 走“桌面端 + 多渠道（Slack/Telegram/Discord/iMessage）个人助手”路线，Workflows（PR #94367）是其向编排能力的补位。OpenClaw 社区规模与贡献者数量明显更大，但 Hermes 的问题响应结构更健康。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 诉求本质 |
|---|---|---|---|
| **内存/资源治理** | catalog worker 泄漏 4–5 GB/h（#159662 等 3 起）、大舰队饿死（#149538） | 桌面空闲 CPU/GPU 烧资源（#127647） | 个人助手常驻运行的资源底线 |
| **升级安全** | “升级即 8 小时恢复会话”（#153257）、schema 17→18 崩溃循环 | `hermes update` 系列：DACL、keychain、venv 丢失（#122783 为共同根因） | 更新链路是两项目**共同最大风险面** |
| **消息/结果可靠性** | subagent 结果静默丢失 6.5 个月（#44925） | 助手回复重复渲染三连报（#123801 系） | 会话状态一致性与投递确定性 |
| **记忆系统可插拔** | memory_get recall 追踪（PR #112694 积压 2.3 个月） | 可配置记忆后端（#47349，3.5 个月 needs-decision） | 社区强烈要求记忆后端解耦 |
| **运营可观测/成本** | 每日花费限额（#121729）、skill 审计（PR #141004） | Portal 计费透明（#110912） | 从“能用”到“敢托付生产”的信任基建 |
| **编排能力** | 大舰队 subagent 编排 | Workflows agent graph（PR #94367） | 多 agent 协作是下一竞争高地 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 核心形态 | 服务端 Gateway + 多 subagent 舰队 | Desktop 桌面客户端 + CLI + 多 IM 渠道 |
| 目标用户 | 重度/企业用户、7×24 无人值守场景、大规模部署 | 个人用户、桌面日常交互、多渠道消息入口 |
| 生态策略 | 自上而下内置 66 个 MCP 集成 | 自下而上社区插件目录（gh-ref/osv-ref/wiki-ref） |
| 技术债集中区 | 内存治理、状态机（租约/reconcile）、Windows 支持 | 更新链路兼容性、Electron 桌面端、cron/venv 环境 |
| 商业化耦合 | 较轻 | 较重（Nous Portal 订阅计费深度绑定） |

---

## 6. 社区热度与成熟度

- **快速迭代期：Hermes Agent**。426 条新 Issue/日、关闭率仅 17%、大型功能 PR（Workflows、跨 gateway 路由）持续滚动，处于功能扩张主导阶段；风险是 needs-decision 类积压（#47349、#91115）显示决策带宽不足。
- **规模成熟但质量巩固期：OpenClaw**。贡献与发布吞吐顶格，但正被 9.x 系列回归拖入**被动稳定性修复阶段**；若 9.7 后不出专注稳定的修复版本，P0 响应 C+ 可能继续下滑。
- 两项目报告质量均高（source-repro、sanitizer、commit hash 级分析），社区技术资产优质，是共同的核心竞争力。

---

## 7. 值得关注的趋势信号

1. **“常驻可靠性”取代“功能丰富度”成为口碑分水岭**：两项目差评均集中于内存泄漏、静默丢消息、升级破坏——AI 智能体开发者应优先投资 graceful shutdown、状态持久化确定性与升级回滚机制。
2. **无人值守（headless）场景是下一个主战场**：cron 重复投递、heartbeat 丢 pins、billing 冷却锁死等问题集中涌现，7×24 自主运行的工程配套（重试、审计、限额）缺口明显。
3. **成本可观测性将成标配**：每日预算限额、token 账单核对、模型切换缓存成本提示（Hermes #128757）——用户已在用数据审视计费，透明度即信任。
4. **记忆系统可插拔化窗口期已到**：两个项目社区均长期呼吁后端解耦（memory.md/honcho/mem0/Qdrant），先落地标准化抽象者将获得生态位。
5. **多 agent 编排（graph/workflow）与 MCP 集成是军备竞赛焦点**：OpenClaw 的 66 内置集成 vs Hermes 的 Workflows PR，代表“广度平台化”与“深度编排化”两条路线，值得开发者跟踪选型。
6. **Windows/macOS 不再是二等公民可忽视项**：WAL 失控、DACL、keychain 等 P0 均首发于桌面平台，跨平台 CI 覆盖度直接决定回归风险面。

---

**一句话结论**：OpenClaw 以规模和生态广度领先但正为发布速度付出稳定性代价；Hermes 以个人/桌面体验和修复推进见长但决策积压上升。对开发者而言，当前选型应重点考察两项目的**升级安全记录与内存治理路线图**，而非功能清单长度。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目日报 — 2026-10-01

## 1. 今日速览

Hermes Agent 今日保持**高度活跃**：过去 24 小时内 Issue 更新 500 条（新开/活跃 426，关闭 74），PR 更新 500 条（待合并 411，合并/关闭 89），无新版本发布。项目当前的核心矛盾集中在三处：**Desktop 会话状态重复渲染**（多个 P1/P2 重复报告）、**Windows/PM 托管安装更新链路的兼容性破坏**（大量 `hermes update` 相关 P1/P2），以及 **Nous Portal 计费纠纷**。总体来看，社区贡献管道畅通，多个 P0 级修复 PR（#128722、#127208、#128757、#128603）正在推进中，项目健康度良好但稳定性欠账较多。

## 2. 版本发布

今日无新版本发布。（注：Issue 中提及 client/backend v0.21.5 仍在迭代，未发布正式 Release。）

## 3. 项目进展

今日 PR 活动以修复为主，重要进展包括：

- **#129741 [P1]** `fix(desktop): compare durable rows before stale send guard` — 以持久化行身份为权威依据修正 stale-send guard，直接针对困扰多日的**助手回复重复渲染**系列 bug（#123801/#126524/#128468），是最关键的会话状态修复之一。
- **#128722 [P0]** `fix(slack): carry channel prompt and source names on slash-command turns` — Slack 斜杠命令回合现携带与普通消息一致的 channel_prompt/skill 绑定，修复消息投递一致性。
- **#127208 [P0]** `fix(gateway): preserve prompt pins across synthetic goal/heartbeat/resume turns` — 修复 goal 续跑、heartbeat 等合成事件丢失 prompt pins 的问题（Fixes #126109）。
- **#128757 [P0]** `fix(agent): say what a model switch costs on a large session` — 针对 #126068 报告的 220.7s 冷 prefill 回归（对比 8–25s 热缓存），改进大 session 模型切换的缓存成本提示。
- **#129745 / #129746** — 浏览器后端 Windows 提权启动拒绝 + 超时进程树回收；ripgrep 受保护目录剪枝作用域修复。
- **#94367 [feature]** Workflows 插件（agent graph 编排）持续迭代，是最大的新功能 PR，覆盖 agent/gate/human approval/wait/trigger 图执行，接入 cron 与 webhook。
- 插件目录生态活跃：新增 **gh-ref (#128615)、osv-ref (#128540)、wiki-ref (#128257)** 三个社区 `@引用` 插件。

整体推进幅度中等：89 个 PR 合并/关闭，会话状态与消息投递两大风险域均有针对性修复落地。

## 4. 社区热点

- **[#110912](https://github.com/NousResearch/hermes-agent/issues/110912)（30 评论，已关闭）**：Nous Portal 订阅积分用尽后被按全价/list price 计费（glm/kimi 路由），日账单暴涨 3 倍。用户诉求是**计费透明与折扣路由正确性**——这是涉及真金白银的信任问题，虽然已关闭但值得持续关注同类复发。
- **[#127647](https://github.com/NousResearch/hermes-agent/issues/127647)（23 评论）**：Desktop 空闲资源消耗追踪 issue（渲染进程 CPU/GPU、后端 serve CPU、内存），聚合了 #122413/#88288，用户对**后台空转烧资源**极为敏感，是桌面端口碑的关键。
- **[#123801](https://github.com/NousResearch/hermes-agent/issues/123801)（21 评论）** + **[#126524](https://github.com/NousResearch/hermes-agent/issues/126524)（12 评论）** + **[#128468](https://github.com/NousResearch/hermes-agent/issues/128468)（10 评论）**：**同一根因的助手回复重复渲染三连报**，DB 仅一行记录但 UI 渲染两次，macOS/Linux、新旧客户端均复现。诉求是流式渲染/会话同步的确定性。
- **[#47349](https://github.com/NousResearch/hermes-agent/issues/47349)（16 评论）**：可配置记忆后端（禁用 memory.md、接入 honcho/fact_store），长期活跃的架构级功能讨论。

## 5. Bug 与稳定性（按严重程度）

**P1**
- [#122935](https://github.com/NousResearch/hermes-agent/issues/122935)：Windows `hermes update` 后 `%HERMES%\tools\*` 带 hardened DACL，非提权进程无法执行 python/node（WinError 5）。无直接 fix PR，属 Windows 更新链路系列问题之一。
- [#122529](https://github.com/NousResearch/hermes-agent/issues/122529)：cron 外部 worker 缺 venv site-packages（ModuleNotFoundError: ruamel）。**有相关 PR #128962**（PEP 503 规范化依赖名恢复）。
- [#64392](https://github.com/NousResearch/hermes-agent/issues/64392)：重复 skill 名称在 list/prompt/skill_view 三处行为不一致，needs-decision。
- [#123801](https://github.com/NousResearch/hermes-agent/issues/123801)：桌面端回复重复渲染（见上）。**有 fix PR #129741**。

**P2 精选**
- [#127647](https://github.com/NousResearch/hermes-agent/issues/127647) 空闲资源消耗追踪；**有 PR #124898**（Linux GPU 子进程初始化失败的一次性软件回退）。
- [#91115](https://github.com/NousResearch/hermes-agent/issues/91115)：macOS 更新后 keychain 反复弹窗（Electron safeStorage 签名轮换），needs-decision。
- [#122402](https://github.com/NousResearch/hermes-agent/issues/122402)：Ubuntu 缺 clang++ 导致 python-olm 构建失败。
- [#125121](https://github.com/NousResearch/hermes-agent/issues/125121)：Kanban dispatcher worker 找不到 hermes_cli 模块。
- [#122783](https://github.com/NousResearch/hermes-agent/issues/122783)：PM 安装未 re-exec 进环境 venv，gateway 跑在裸解释器上——**多个 cron/worker 类 bug 的共同根因**，建议优先。
- [#121095](https://github.com/NousResearch/hermes-agent/issues/121095)：browser_exec 遗留永不退出的 browser_harness 守护进程。**相关 PR #129745** 覆盖进程树回收。
- [#127313](https://github.com/NousResearch/hermes-agent/issues/127313)：右键 zone 菜单劫持 transcript 右键，复制文本不可用（ad2d4822e1 回归）。

**观察**：`area/install-update` + `sweeper:risk-compatibility` 标签集群庞大（#122160、#124807、#79087 等），更新链路（尤其 Windows）已成最大稳定性风险面。

## 6. 功能请求与路线图信号

- **Workflows agent 编排（PR #94367）**：跨 agent 图执行 + cron/webhook 触发，ci-reviewed 阶段，是最接近落地的路线图级功能。
- **可配置记忆后端（#47349）**：16 评论持续发酵，配合 #58705（mem0/Qdrant 锁冲突）表明社区对**记忆系统可插拔化**有强烈需求，具备纳入下版本条件。
- **跨平台 canonical session（#62780）**：统一 CLI/Desktop/Telegram/Discord 会话身份，是长期架构方向，与 PR #100016/#111939 的跨 gateway 任务路由工作形成呼应。
- **平台 notes 可配置化（#2020）**、**隐藏本地 gateway（#96532）**：小型桌面/网关 UX 改进，落地成本低。
- **插件目录 @引用 系列（gh-ref/osv-ref/wiki-ref）**：生态化战略清晰，预计持续扩充。

## 7. 用户反馈摘要

- **付费用户敏感点**：Portal 计费 bug（#110912）引发最激烈讨论，用户能精确对比 token 用量与账单，说明重度 API 用户在用数据审视计费——信任修复需优先。
- **桌面端日常体验**：回复重复渲染、流式滚动跳跃（#128468）、右键被劫持（#127313）、空闲 CPU/GPU 烧资源（#127647）——桌面端"小毛病密度"是当前差评主要来源。
- **更新即惊魂**：Windows/macOS/Ubuntu 用户均报告 `hermes update` 后各类破坏（DACL、keychain、构建失败、venv 丢失），"不敢更新"情绪可见。
- **正面信号**：bug 报告质量极高（附复现、commit hash、根因分析，如 #79087 提交者主动撤回错误结论并验证），社区技术参与度是项目重要资产。

## 8. 待处理积压

- **[#47349](https://github.com/NousResearch/hermes-agent/issues/47349)**（6-16 开启，3.5 个月）：记忆后端可配置，needs-decision，建议维护者给出决断。
- **[#91115](https://github.com/NousResearch/hermes-agent/issues/91115)**（8-20 开启，>1 个月）：macOS keychain 弹窗，needs-decision，影响每次更新后的日常体验。
- **[#64392](https://github.com/NousResearch/hermes-agent/issues/64392)**（7-14 开启，>2.5 个月）：P1 skill 重名不一致，长期无决策。
- **[#30708](https://github.com/NousResearch/hermes-agent/issues/30708)**（5-23 开启，>4 个月）：BlueBubbles 入站去重缺失导致 iMessage 双重处理/双会话。
- **[#96731](https://github.com/NousResearch/hermes-agent/issues/96731)**（8-27 开启）：browser_exec Windows 420s 超时（独立进程 7s 完成），性能鸿沟未解。
- **[#58705](https://github.com/NousResearch/hermes-agent/issues/58705)**（7-05 开启）：mem0/Qdrant 锁冲突，needs-decision。
- **PR 侧**：**#94367**（Workflows，8-25 开启）与 **#100016**（跨 gateway 路由，9-01 开启）为大型长期 PR，且 #111939 依赖 #100016，建议尽快推进审查以免链式阻塞。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*