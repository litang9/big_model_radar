# OpenClaw 生态日报 2026-08-26

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-08-25 20:44 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报
**日期：2026-08-26 | 数据源：github.com/openclaw/openclaw 过去 24 小时**

---

## 1. 今日速览

- 过去 24 小时项目保持**极高水平活跃度**：Issue 更新 500 条（新开/活跃 446，关闭 54），PR 更新 500 条（待合并 350，已合并/关闭 150），无新版本发布。
- 核心维护者 [@steipete](https://github.com/steipete) 今日在 `main` 分支连续提交约 10 个修复/重构 PR（auth、UI 性能、skills、QA、Node 服务、Linux 主题等），呈现**集中式"main 分支健康治理"节奏**。
- 社区讨论焦点高度集中于四大主题：**会话状态与消息投递可靠性、Codex 集成边界、memory 子系统无界增长、认证/提供商配置健壮性**。
- Issue 关闭率仅 10.8%（54/500），大量高优先级 Issue 携带 `clawsweeper:no-new-fix-pr` + `needs-maintainer-review`/`needs-product-decision` 标签，**维护者评审与产品决策积压是当前最突出的健康度风险**。
- PR 待合并/关闭比约为 2.3:1（350:150），评审吞吐压力较大。

---

## 2. 版本发布

今日无新版本发布。（beta.7 线仍在持续接收现场可靠性报告，见 [#128067](https://github.com/openclaw/openclaw/issues/128067)，发布节奏明显以修复为主。）

---

## 3. 项目进展

> 注：数据未区分 merged 与 closed，以下"已关闭"PR 在 24 小时内 150 条合并/关闭的背景下大概率代表已落地的修复。

**已关闭的重要 PR：**

| PR | 内容 | 意义 |
|---|---|---|
| [#126424](https://github.com/openclaw/openclaw/pull/126424) (XL, P1) | 修复多 agent 运维者使用会话工具时的投递越界，覆盖 Discord/iMessage/Matrix/Mattermost/Slack/Telegram/Feishu 全渠道 | 直接回应"消息投递可靠性"这一最大痛点域 |
| [#116489](https://github.com/openclaw/openclaw/pull/116489) (XL, P2) | 新增 `security.installPolicy` 安装策略警告确认机制 | 安全边界的重要增强，插件/技能安装前可人工审查 |
| [#121380](https://github.com/openclaw/openclaw/pull/121380) (P1) | 修复 wedge 的 reply lane 在用户持续发消息时对运维者不可见的问题 | 可观测性修复，直击"日志不指名原因"的抱怨 |
| [#125471](https://github.com/openclaw/openclaw/pull/125471) | 修复 Claude CLI OAuth 在 Gateway 重启后失去刷新所有权 | auth 域持续收敛 |
| [#128694](https://github.com/openclaw/openclaw/pull/128694) | 修复重连后模型选择器显示"No models available" | UI 状态一致性 |

**今日新开的高优先级维护者 PR（待合并，代表下一波落地内容）：**

- [#129322](https://github.com/openclaw/openclaw/pull/129322) (P1)：完成 Claude CLI 凭证回归原生所有权，收编 `main` 上多个独立修复——auth 架构整合接近收尾。
- [#129513](https://github.com/openclaw/openclaw/pull/129513) (P1)：**保护 Claude 订阅用户不被 heartbeat 误计费为付费额外用量**，成本敏感用户的直接利好。
- [#129548](https://github.com/openclaw/openclaw/pull/129548)：Control UI 会话切换加速与聊天渲染平滑化，减少侧栏整行重挂载。
- [#129186](https://github.com/openclaw/openclaw/pull/129186) (P1)：绑定实时语音委派的所有权，防止新语音委派中止已接受的 consult。
- [#129537](https://github.com/openclaw/openclaw/pull/129537) (P1)：Full Access 远程节点会话真正可执行。
- [#129371](https://github.com/openclaw/openclaw/pull/129371)、[#125130](https://github.com/openclaw/openclaw/pull/125130)、[#129481](https://github.com/openclaw/openclaw/pull/129481)：均处于"ready for maintainer look"，覆盖 automations 归属、子代理投递告警、CLI 终态可诊断性。
- [#129600](https://github.com/openclaw/openclaw/pull/129600)：i18n 机器人自动刷新原生 locale，自动化流水线运转正常。

**整体评估：** 今日进展集中在**可靠性修复 + auth 所有权整合 + UI 性能**三条线，与 Issue 区暴露的痛点高度对齐，项目处于"稳定化冲刺"阶段。

---

## 4. 社区热点

按评论数排序的热点 Issue：

1. **[#80319](https://github.com/openclaw/openclaw/issues/80319)**（17 评论）— QA tool-defaults 套件混淆了 Codex 原生工具与 OpenClaw 动态工具对等性。讨论已收敛为"QA harness/mock 问题，非广泛运行时缺陷"，但对 Codex 集成测试方法论的长讨论反映出**社区对 Codex 集成质量的高度关注**。
2. **[#67777](https://github.com/openclaw/openclaw/issues/67777)**（13 评论，P1 🦞）— 子代理完成消息在 direct-announce 超时/drain/孤儿清理时可被静默丢失。多代理编排可靠性的核心诉求。
3. **[#50093](https://github.com/openclaw/openclaw/issues/50093)**（12 评论，P1）— WhatsApp 断线重连后**丢失的消息永不回填**。自 3 月开放至今，标签显示需要产品决策，是积压最久的 P1 之一。
4. **[#85251](https://github.com/openclaw/openclaw/issues/85251)**（12 评论，P1）— Codex app-server 发出 `turn/started` 后完全静默，会话卡死直至 360s 强制恢复。
5. **[#97616](https://github.com/openclaw/openclaw/issues/97616)**（9 评论，P1）— hook/工具子进程未被 reap，**僵尸进程累积导致运行时退化**。
6. **[#92633](https://github.com/openclaw/openclaw/issues/92633)**（9 评论，P1 🦞）— `memory_search corpus=all` 稳定 15s 超时而单 corpus 均成功。
7. **[#16670](https://github.com/openclaw/openclaw/issues/16670)**（9 评论，P2）— Onboarding 向导应强制包含 Memory/Embedding 配置步骤。
8. **[#108379](https://github.com/openclaw/openclaw/issues/108379)**（9 评论，P1）— Xiaomi MiMo（openai-completions）重复生成叙述文本。

**热点背后的诉求画像：** 长期运行的生产型用户（多 agent、多渠道、重 cron）最在意**"静默失败"**——消息丢失、会话卡死、进程泄漏，且普遍抱怨"日志不指名原因"。

---

## 5. Bug 与稳定性

按严重程度排列（P1 优先，标注修复 PR 状态）：

| 优先级 | Issue | 问题 | 修复状态 |
|---|---|---|---|
| P1 | [#67777](https://github.com/openclaw/openclaw/issues/67777) | 子代理完成消息可丢失（session-state/message-loss） | 无新 fix PR（同域 PR [#125130](https://github.com/openclaw/openclaw/pull/125130) 仅覆盖告警） |
| P1 | [#85251](https://github.com/openclaw/openclaw/issues/85251) | Codex app-server 静默卡死整轮 | ❌ 无 fix PR |
| P1 | [#97616](https://github.com/openclaw/openclaw/issues/97616) | 僵尸子进程累积（crash-loop 风险，6/29 开放至今） | ❌ 无 fix PR |
| P1 | [#92633](https://github.com/openclaw/openclaw/issues/92633) | memory_search 全语料超时 | ❌ 无 fix PR |
| P1 | [#108379](https://github.com/openclaw/openclaw/issues/108379) | MiMo 重复生成后中止 | ❌ 无 fix PR |
| P1 | [#126246](https://github.com/openclaw/openclaw/issues/126246) | Telegram 外发卡在 `send_attempt_started`，重启即丢 | ❌ 无 fix PR |
| P1 | [#125570](https://github.com/openclaw/openclaw/issues/125570) | Skill Workshop 更新覆盖线上技能 description，静默破坏路由（data-loss） | ❌ 无 fix PR |
| P1 | [#126900](https://github.com/openclaw/openclaw/issues/126900) | `maxActiveTranscriptBytes` 压缩死循环，channel 卡死 | 🔗 已有开放 PR |
| P1 | [#127176](https://github.com/openclaw/openclaw/issues/127176) | Windows 上 CLI 与 Node Host 交替触发设备元数据审批 | 🔗 已有开放 PR |
| P1 | [#80178](https://github.com/openclaw/openclaw/issues/80178) | `resolveCliAuthEpoch` 在凭证存储源切换时误杀全部活跃 CLI 会话 | ❌ 无 fix PR |
| P1 | [#56217](https://github.com/openclaw/openclaw/issues/56217) | 1Password secret 崩溃循环耗尽速率限制 | 🔗 已有开放 PR |
| P1 | [#128067](https://github.com/openclaw/openclaw/issues/128067) | beta.7 现场报告：6 类可靠性缺陷（持久化/投递/重启恢复） | 待逐项消化 |
| P2 | [#126631](https://github.com/openclaw/openclaw/issues/126631) | 沙箱 skills bind-mount 产生 root 属主目录锁死 uid 1000 | 🔗 已有开放 PR |
| P2 | [#114612](https://github.com/openclaw/openclaw/issues/114612) | memory SQLite 表无保留策略，磁盘终将填满 | ❌ 无 fix PR |

**积极信号：** [#128883](https://github.com/openclaw/openclaw/issues/128883)（Codex 动态 `sessions_spawn` 丢失 Gateway resolver）从 08-24 开放到 08-25 关闭，**一天内闭环**，显示高优先级新报缺陷的响应链路是通畅的；[#95553](https://github.com/openclaw/openclaw/issues/95553)（preflight 压缩 60s 硬上限）也已关闭并关联 PR。

**风险信号：** 上表中约半数 P1 无任何 fix PR，且多为 4-6 月的存量问题。

---

## 6. 功能请求与路线图信号

结合现有 PR 判断纳入可能性：

- **成本可见性（高概率近期落地）**：[#9016](https://github.com/openclaw/openclaw/issues/9016)（暴露 OpenRouter 用量成本）开放近 7 个月，而 CLI 侧 `usage-cost` 修复 PR [#127978](https://github.com/openclaw/openclaw/pull/127978) 已 ready for review、[#129513](https://github.com/openclaw/openclaw/pull/129513) 保护订阅用量——**成本域正在密集施工，全链路成本暴露是明确方向**。
- **Memory 子系统产品化（中等概率）**：[#42650](https://github.com/openclaw/openclaw/issues/42650)（review/edit/forget/冲突解决流程）、[#16670](https://github.com/openclaw/openclaw/issues/16670)（向导强制 Memory 配置）、[#44395](https://github.com/openclaw/openclaw/issues/44395)（标题感知分块）均在等产品决策；配合 [#126772](https://github.com/openclaw/openclaw/pull/126772)（插件 SDK 异步 embedding 批处理）看，memory 是下一阶段投入区。
- **多用户生产扩展**：[#96477](https://github.com/openclaw/openclaw/issues/96477)（放宽单写者会话锁）代表生产用户的规模化诉求，尚无对应 PR。
- **无障碍（稳步推进）**：[#9637](https://github.com/openclaw/openclaw/issues/9637)（TUI 禁用 emoji/unicode）与 [#95601](https://github.com/openclaw/openclaw/issues/95601)（VoiceOver 友好历史）形成正向反馈闭环。
- **多渠道体验**：[#39343](https://github.com/openclaw/openclaw/issues/39343)（网关层图片/媒体组缓冲）、[#58887](https://github.com/openclaw/openclaw/issues/58887)（语音消息即时 typing 指示）、[#51041](https://github.com/openclaw/openclaw/issues/51041)（Discord 交互响应控制开放给插件）。
- **子代理体验**：[#6625](https://github.com/openclaw/openclaw/issues/6625)（超时前预警，避免全部工作丢失）——与 #67777 同属编排可靠性域，可能被一并处理。

---

## 7. 用户反馈摘要

从 Issue 正文与评论提炼的真实用户画像：

- **生产型重度用户是主力声音**：[#128067](https://github.com/openclaw/openclaw/issues/128067) 来自单网关 + 6 agent + Telegram/WebChat + 重 cron 的 3 周生产部署，系统性地报告持久化、投递、重启恢复三类缺陷——**OpenClaw 正被当作基础设施使用，而非玩具项目**。
- **最大不满：静默失败**。Telegram 消息无回执卡死（[#126246](https://github.com/openclaw/openclaw/issues/126246)）、WhatsApp 断线丢消息（[#50093](https://github.com/openclaw/openclaw/issues/50093)）、WebChat 新会话"失忆"（[#99925](https://github.com/openclaw/openclaw/issues/99925)）、压缩死循环无日志指名（[#126900](https://github.com/openclaw/openclaw/issues/126900)）——用户反复强调"愿意提供日志，但日志里找不到原因"。
- **成本敏感**：订阅用户被误计费（[#129513](https://github.com/openclaw/openclaw/pull/129513) 背景）、OpenRouter 成本不可见（[#9016](https://github.com/openclaw/openclaw/issues/9016)）。
- **本地/小众模型用户群体显著**：LM Studio（[#95746](https://github.com/openclaw/openclaw/issues/95746)）、Xiaomi MiMo（[#108379](https://github.com/openclaw/openclaw/issues/108379)）、DeepSeek（[#127239](https://github.com/openclaw/openclaw/issues/127239)）——提供商适配长尾问题多。
- **正面反馈**：无障碍用户在 [#95601](https://github.com/openclaw/openclaw/issues/95601) 中对 v2026.6.9 的用量显示改进表达真诚感谢；[#80319](https://github.com/openclaw/openclaw/issues/80319) 的讨论显示了社区自我纠偏（原始报告被修正为 harness 问题）的成熟度。

---

## 8. 待处理积压

**维护者需优先关注的长期未解 Issue（按 P1 → 时间排序）：**

| Issue | 开放时长 | 状态信号 |
|---|---|---|
| [#50093](https://github.com/openclaw/openclaw/issues/50093) WhatsApp 消息回填 | ~5 个月 | 需产品决策，12 条评论持续发酵 |
| [#67777](https://github.com/openclaw/openclaw/issues/67777) 子代理完成丢失 | ~4.5 个月 | 无 fix PR，P1 diamond 级 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) 僵尸进程泄漏 | ~2 个月 | 无 fix PR，影响长期运行实例 |
| [#92633](https://github.com/openclaw/openclaw/issues/92633) memory_search 超时 | ~2.5 个月 | 无 fix PR |
| [#48709](https://github.com/openclaw/openclaw/issues/48709) Gemini 2.5 Pro 三重会话膨胀 | ~5 个月 | 需 live repro |
| [#37966](https://github.com/openclaw/openclaw/issues/37966) LiteLLM cache

---

## 横向生态对比

# 开源个人 AI 助手/智能体生态横向分析日报
**日期：2026-08-26**

> **数据可用性说明：** 本期仅 OpenClaw 提供有效社区数据；Hermes Agent 摘要生成失败，数据缺失。今日报告以 OpenClaw 单项目深度分析为主线，跨项目定量对比部分标记为"待数据恢复"。涉及行业层面的判断均已注明为定性推断，非当日数据支撑。

---

## 1. 生态全景

2026 年的个人 AI 助手/自主智能体开源生态已整体从"功能可用"阶段迈入"生产可靠"阶段：头部项目的社区讨论重心不再是模型能力接入，而是长时运行下的投递可靠性、进程卫生、凭证所有权与成本可见性等工程化议题。智能体正被当作基础设施部署（多 agent、多渠道、重 cron），这驱动项目竞争轴从功能广度转向运维深度。同时，本地/小众模型适配长尾、memory 生命周期管理、安装安全边界成为新涌现的产品化方向。今日样本量受限（1/2 项目有数据），上述判断以 OpenClaw 证据链为主、行业信号为辅。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | 新开/活跃 | 关闭 | PR 更新 | 待合并 | 已合并/关闭 | Release | 健康度评估 |
|---|---|---|---|---|---|---|---|---|
| **OpenClaw** | 500 | 446 | 54（关闭率 10.8%） | 500 | 350 | 150 | 无 | **高活跃 + 积压风险**：评审吞吐比 2.3:1；约半数存量 P1 无 fix PR；维护者评审与产品决策积压是最突出风险 |
| Hermes Agent | — | — | — | — | — | — | — | 数据缺失，无法评估 |

**OpenClaw 健康度细读：** 活跃度绝对值处于极高水位，且呈现"双速"特征——新增高优缺陷响应快（#128883 从开放到关闭仅 1 天），但存量 P1 消化慢（#50093 拖约 5 个月、#67777 约 4.5 个月无 fix PR）。`clawsweeper:no-new-fix-pr` 自动分流标签的广泛使用表明项目已引入机器人辅助分诊，但人力评审带宽仍是瓶颈。

---

## 3. OpenClaw 在生态中的定位

**项目定位：网关型/运行时型智能体基础设施**，而非单纯的 agent 框架。

- **优势（数据支撑）：**
  - **全渠道覆盖**：单日合并的 #126424 即覆盖 Discord/iMessage/Matrix/Mattermost/Slack/Telegram/Feishu 七渠道，渠道适配深度罕见；
  - **提供商无关性**：同时服务 Claude 订阅 OAuth、Codex 集成、Gemini、DeepSeek、LM Studio、Xiaomi MiMo 等本地/小众模型用户，长尾适配是护城河；
  - **生产级控制面**：`security.installPolicy` 安装确认（#116489）、用量保护（#129513）等安全/成本治理能力；
  - **多 agent 编排**：子代理委派、实时语音 consult、多运维者会话工具等复杂拓扑。
- **技术路线差异（定性）：** 生态中框架类项目（偏 SDK/编排逻辑抽象）关注"智能体如何推理"，OpenClaw 的 Issue 分布显示其核心治理对象是"智能体如何长期存活"——auth 所有权、消息投递、transcript 压缩、进程回收。这更接近传统消息中间件/运维系统的成熟路径。
- **社区规模：** Issue 编号已达 12.9 万量级、单日 Issue+PR 各 500 条更新，可定性判断处于生态头部梯队；与 Hermes Agent 的定量对比待数据恢复。

---

## 4. 共同关注的技术方向

今日仅单项目数据，以下为 OpenClaw 内部确认、且与行业普遍信号重合的方向（跨项目验证待 Hermes 数据）：

| 方向 | OpenClaw 证据 | 行业普适性判断 |
|---|---|---|
| **静默失败治理** | #67777（子代理消息丢失）、#126246（Telegram 外发卡死）、#50093（WhatsApp 断线不回填）、#126900（压缩死循环） | 长时运行智能体的第一痛点，"日志不指名原因"是用户最高频抱怨 |
| **长时运行资源卫生** | #97616（僵尸进程累积）、#114612（memory SQLite 无保留策略）、#92633（全语料检索超时） | 智能体基础设施化的必然命题 |
| **凭证与会话所有权** | #80178（epoch 切换误杀会话）、#125471/#129322（OAuth 刷新所有权收敛） | 多提供商聚合架构的通病 |
| **成本可见性** | #9016（OpenRouter 成本暴露，开放 7 个月）+ 3 条活跃 PR，密集施工中 | 订阅/按量混合计费下的刚需 |
| **本地/小众模型适配** | MiMo #108379、LM Studio #95746、DeepSeek #127239 | 隐私与成本驱动的确定性长尾 |

---

## 5. 差异化定位分析

因对比数据缺失，改为与生态典型类别的对照（定性）：

| 维度 | OpenClaw | 框架/SDK 类项目 | 本地优先助手类项目 |
|---|---|---|---|
| 功能侧重 | 投递可靠性、渠道适配、运行时治理 | 编排抽象、工具调用范式 | 隐私、单机体验 |
| 目标用户 | 生产型重度用户（self-hoster、多 agent 运维者，如 #128067 的"单网关+6 agent+重 cron"画像） | 开发者/构建者 | 终端个人用户 |
| 架构 | Gateway + Node Host + CLI + Control UI 多形态，插件/技能生态带安装安全层 | 库形态，运行时交给用户 | 单进程桌面应用 |

**关键差异点：** OpenClaw 的价值锚在"控制面"——它对渠道、凭证、守护进程健康的投入权重明显高于对推理能力本身的投入。

---

## 6. 社区热度与成熟度

- **OpenClaw：极高活跃 + 质量巩固期。** 无新版本发布、维护者（@steipete）单日在 main 分支连提约 10 个修复/重构 PR、beta.7 以修复为主持续消化现场报告——典型的"稳定化冲刺"特征，而非功能扩张期。
- **分层判断：** 增量响应链路通畅（高优新报 1 天闭环），存量消化能力不足（4-6 个月 P1 积压），处于"快速迭代"与"质量巩固"的过渡带，偏后者。
- **成熟度正向信号：** 无障碍（#9637/#95601）与 i18n 自动化流水线（#129600）的持续投入、社区自我纠偏能力（#80319 讨论收敛为 harness 问题）。
- Hermes Agent 无法评估，待

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*