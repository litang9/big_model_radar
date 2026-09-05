# OpenClaw 生态日报 2026-09-06

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-05 22:03 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 | 2026-09-06

> 数据周期：过去 24 小时（截至 2026-09-05 收盘数据） | 来源：github.com/openclaw/openclaw

---

## 1. 今日速览

OpenClaw 今日处于**极高活跃度**状态：Issues 更新 500 条（新开/活跃 441，关闭 59），PR 更新 500 条（待合并 307，已合并/关闭 193），并发布了新版本 **v2026.9.2**，主打 Gateway 性能与聊天响应性优化。核心维护者 [@steipete](https://github.com/steipete) 今日产出密集，一天内推进了十余个修复/重构 PR（覆盖网关可用性、任务状态、UI、测试基础设施与依赖刷新）。需要警惕的是：**session-state / message-loss 类 P0/P1 缺陷高度集中，且绝大多数仍标记 `clawsweeper:no-new-fix-pr`**——开发速度极快（近乎每日发版），但稳定性债务在同步累积，消息交付可靠性与 Gateway 事件循环性能是当前项目的两条主线战场。

**健康度速写：**
| 指标 | 数值 | 解读 |
|---|---|---|
| Issue 关闭率 | 59/500 ≈ 12% | 新增速度远超关闭速度，积压扩大 |
| PR 合并/关闭率 | 193/500 ≈ 39% | 吞吐良好，但 307 个待合并形成 review 队列 |
| P0 级未修 Issue | ≥2（#38327、#91931） | 均无 fix PR，最长者已挂起 6 个月 |
| 发版节奏 | 2026.9.x 周内两次+ | 迭代极快 |

---

## 2. 版本发布

### v2026.9.2 — [openclaw 2026.9.2](https://github.com/openclaw/openclaw/releases)

**Highlights（性能与响应性）：**
- **聊天更快更跟手**：在处理长转录与磁盘用量时，聊天、Dashboard 与会话交互保持响应；
- Dashboard 改为**直接查找**，削减冷加载工作；
- **durable history 读取移出 Gateway 事件循环**（关联 #136862、#138…，Release Note 被截断）。

**解读与迁移提示：**
- 本版本方向直接回应了长期 P1 问题 [#119720](https://github.com/openclaw/openclaw/issues/119720)（同步持久化与转录维护阻塞 Gateway 事件循环）——该 issue 中 planner-statistics 修复已通过 [#133925](https://github.com/openclaw/openclaw/pull/133925)、[#134062](https://github.com/openclaw/openclaw/pull/134062) 落地，Gateway 线程残余热点正由今日的 [#138351](https://github.com/openclaw/openclaw/pull/138351)、[#136361](https://github.com/openclaw/openclaw/pull/136361) 继续收敛，路线连贯性好。
- Release Note 未见明确破坏性变更，但**从 2026.9.1-beta 升级 + `doctor --repair` 的用户已报告 claude-cli 订阅认证损坏**（[#132720](https://github.com/openclaw/openclaw/issues/132720)，410 session_expired），建议订阅路径用户升级前备份 `~/.openclaw` 并暂缓 `--repair`。

---

## 3. 项目进展

过去 24 小时 **193 个 PR 合并/关闭**。头部 PR 多数已进入 "ready for maintainer look" 阶段，形成清晰的合入管道：

**可靠性 / 可用性修复（最接近合入）：**
- [#139397](https://github.com/openclaw/openclaw/pull/139397) **agent 任务在临时 RPM/TPM 限流后可继续执行**（关闭 #139312）——直击多渠道部署中限流导致任务中断的痛点；
- [#136639](https://github.com/openclaw/openclaw/pull/136639) 维护压力下保护可恢复会话，**默认未归档活跃会话目标从 500 提升至 5,000**——对会话保留策略是实质性放宽；
- [#139344](https://github.com/openclaw/openclaw/pull/139344)（P1）Windows 计划任务网关在普通重启后存活，修复 detached restart helper 竞态；
- [#137594](https://github.com/openclaw/openclaw/pull/137594)（P1）MCP server 不可用时 Tool Search **显式报出名称而非空候选循环**（关闭 #137398）；
- [#139437](https://github.com/openclaw/openclaw/pull/139437) Gateway 更新后正确恢复空闲云会话的放置状态；
- [#139431](https://github.com/openclaw/openclaw/pull/139431) Anthropic 路径保留工具 schema 的 `$defs` 引用与约束，修复参数校验失败；
- [#139436](https://github.com/openclaw/openclaw/pull/139436) Azure OpenAI embedding 的 `api-version` 转为 URL query（关闭 #111386，修复 404）；
- [#137713](https://github.com/openclaw/openclaw/pull/137713) 前缀恢复中断不再留下截断的 `openclaw.json`。

**性能优化（呼应今日发版主题）：**
- [#138351](https://github.com/openclaw/openclaw/pull/138351)（P1）跳过共享 provider 配置的冗余序列化/哈希——#119720 热点的直接削减；
- [#136361](https://github.com/openclaw/openclaw/pull/136361) 会话条目 patch 后复用已提交 identity，省去整段 saved-prompt 解码；
- [#138196](https://github.com/openclaw/openclaw/pull/138196) proxy 目标事实每请求只准备一次；[#139432](https://github.com/openclaw/openclaw/pull/139432) 维护期间避免全量解码 saved prompt 导致的任务暂停。

**大型特性（XL，进行中）：**
- [#135599](https://github.com/openclaw/openclaw/pull/135599) **插件安装/启用/禁用/重载全程不重启 Gateway**，含保存/应用/回滚状态语义——运维体验的重大升级；
- [#135889](https://github.com/openclaw/openclaw/pull/135889) cron 运行来源、任务类型、agentTurn token 预算、类型化完成原因——自动化可观测性补全；
- [#139429](https://github.com/openclaw/openclaw/pull/139429) 压缩目标在运行时接纳之后推导，修复配置热载/切换 provider 后的新旧配置混用。

**工程维护：** [#138199](https://github.com/openclaw/openclaw/pull/138199) 七天冷却依赖刷新（25 个包 / 34 处 manifest 绑定）；[#139403](https://github.com/openclaw/openclaw/pull/139403) 恢复 iOS release 资格测试；今日关闭的 [#139395](https://github.com/openclaw/openclaw/pull/139395)（P0）提前迁移 workspace setup 并恢复 channel 启动错误可见性。

**小结：** 一天之内，性能、可用性、运维三大方向均有实质推进，约 6-8 个修复已达到可合入状态；若维持此 review 速度，2026.9.3 可期。

---

## 4. 社区热点

今日讨论最热烈（评论数 Top 7）的 Issue：

| Issue | 评论 | 主题 | 社区诉求 |
|---|---|---|---|
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | 15 | P0 回归：2026.3.2 起 google-vertex/gemini-3.1-pro-preview 嵌入式 agent 全量报 "Cannot convert undefined or null to object" | **3 月开出的发布阻塞级回归至今未修**，用户对回归质量管理不满 |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) | 14 | Umbrella：跨渠道（MSTeams/webchat/Telegram/followup 队列）转录重复、回放、上下文组装缺陷 | 要求产品层面统一治理而非零散修补 |
| [#132762](https://github.com/openclaw/openclaw/issues/132762) | 13 | overflow-retry 以 toolResult "成功"结束但无最终交付 | 多阶段文档工作流中最终回复静默丢失 |
| [#53763](https://github.com/openclaw/openclaw/issues/53763) | 12 | 请求内置 headless Chromium 作为一等工具 | 摆脱对用户本机 Chrome 与第三方 API 的脆弱依赖 |
| [#39476](https://github.com/openclaw/openclaw/issues/39476) | 12 | A2A `sessions_send` 回呼导致请求方渠道重复消息（已有 linked PR） | 多 agent 协作语义需要防回环设计 |
| [#96975](https://github.com/openclaw/openclaw/issues/96975) | 12 | 子 agent 完成应只回传状态+会话链接，而非注入完整子上下文 | 重子 agent 负载下父会话被污染 |
| [#127229](https://github.com/openclaw/openclaw/issues/127229) | 12 | Telegram：watchdog 释放的 durable update 在 transport tracker 结算前被误标 tombstone | 消息可靠性语义（停机窗口内 DM 丢失） |

**诉求主线清晰**：社区最痛的不是功能缺失，而是**"消息到底有没有送到"这一基本可靠性**——前 7 名中有 5 个直接关乎消息丢失/重复/错序。

另值得关注：[#42840](https://github.com/openclaw/openclaw/issues/42840)（Control UI 增加 MathJax/LaTeX 渲染，10 👍，已关闭）是今日获 👍 最多的 Issue，显示 AI 输出数学/科学内容的展示需求强烈。

---

## 5. Bug 与稳定性

按严重程度排列（标注是否存在 fix PR）：

**🔴 P0（发布阻塞级）**
- [#38327](https://github.com/openclaw/openclaw/issues/38327) 回归 + auth-provider + ux-release-blocker：特定 provider 下嵌入式 agent 全量失败 | ❌ 无 fix PR（挂起 6 个月）
- [#91931](https://github.com/openclaw/openclaw/issues/91931) 预置 SOUL.md/IDENTITY.md/USER.md 导致 bootstrap 被误判完成，**并删除用户提供的 BOOTSTRAP.md**（数据丢失） | ❌ 无 fix PR

**🟠 P1 回归（升级引入）**
- [#135111](https://github.com/openclaw/openclaw/issues/135111) v2026.7.1→2026.8.1 后 claude-sonnet-5 间歇性 "malformed JSON arguments" | ❌ 无 fix PR（今日评论+10）
- [#97616](https://github.com/openclaw/openclaw/issues/97616) hook/工具子进程未 reap，僵尸进程累积致运行时退化 | ❌ 无 fix PR
- [#85027](https://github.com/openclaw/openclaw/issues/85027) 2026.5.6→2026.5.19 升级致 macOS LaunchAgent 网关不可恢复（需 Time Machine 还原） | ❌ 无 fix PR

**🟠 P1 消息丢失 / 会话状态集群**（项目最大稳定性风险面）
- [#112259](https://github.com/openclaw/openclaw/issues/112259) 可见入站消息被**静默丢弃**：零 payload 分发无重试/死信/用户可见失败，标记 `clawsweeper-recovery-stuck` | ❌
- [#54488](https://github.com/openclaw/openclaw/issues/54488) followup drain 独占会话车道，入站分发阻塞 20-30 分钟 | ❌
- [#53008](https://github.com/openclaw/openclaw/issues/53008) memoryFlush 阻塞主处理车道 10 分钟，Telegram 全部排队 | ❌
- [#78055](https://github.com/openclaw/openclaw/issues/78055) 子 agent 完成公告交付陈旧输出、子会话继承无关历史 | ❌
- [#119992](https://github.com/openclaw/openclaw/issues/119992) 单轮内 message 工具重复发送风暴 | ✅ linked PR open
- [#90098](https://github.com/openclaw/openclaw/issues/90098) Control UI 大附件栈溢出（RangeError） | ✅ linked PR open

**🟠 P1 Gateway 性能 / 调度**
- [#119720](https://github.com/openclaw/openclaw/issues/119720) 同步持久化阻塞事件循环 | 🟡 部分修复（#133925/#134062 已合，今日 #138351/#136361 续推）
- [#72015](https

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告

**报告日期：2026-09-06** | 数据源：OpenClaw、Hermes Agent 官方仓库社区动态（单日快照）

> **数据说明**：本报告仅覆盖两个样本项目的 24 小时动态；两项目 PR 更新量均触及 500 条（疑似统计上限截断），PR/Issue 绝对量解读需谨慎，比率指标参考价值更高。

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道当前处于**“高频迭代与可靠性还债并行”**的阶段：两个头部项目单日 Issue/PR 更新均达数百条、双双触及数据上限，核心维护者与社区贡献管线均保持极高产能。共性痛点高度收敛于三处——**常驻进程的状态持久化可靠性、跨渠道消息交付语义、升级路径安全性**——表明智能体正从“对话工具”演进为“常驻基础设施”，工程债务也随之从功能层转移到可靠性层。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-09-06** | 数据来源：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

过去 24 小时项目整体处于**高度活跃**状态：Issues 更新 355 条（新开/活跃 282、关闭 73，关闭率约 20.6%），PR 更新 500 条（待合并 421、已合并/关闭 79）。无新版本发布，主干持续以高频小步方式演进。值得关注的信号：**多 profile / 多进程并发写入导致的状态损坏类 Bug 集中出现**（[#103339](https://github.com/NousResearch/hermes-agent/issues/103339) 报告 4 天内 7 次 state.db 损坏），已成为当前稳定性最突出的风险面。同时，社区贡献管线保持健康，仅 9 月 5 日一天就有至少 10 个新 PR 提交，i18n（波斯语 RTL、印尼语）与远程访问能力持续推进。

---

## 2. 版本发布

**今日无新版本发布**（连续处于主干迭代周期，多个 Issue 提及版本基线为 v0.21.0 之后的 main）。

---

## 3. 项目进展

虽然无版本发布，但过去 24 小时关闭了 73 个 Issue，其中多个为重要修复落地：

- **[#102930](https://github.com/NousResearch/hermes-agent/issues/102930)（P1，SSH 401 全量回归）已关闭**：9 月 4 日报告、9 月 5 日关闭，仅用约一天处理了 `d3630f8532` 大规模简化重构引入的 Desktop SSH 模式全量 401 问题，关键回归响应速度值得肯定。
- **[#95294](https://github.com/NousResearch/hermes-agent/issues/95294)（P1，中断的 `hermes update` 永久滞留旧代码）已关闭**——但其补丁（catch-up fleet restart）被 [#98022](https://github.com/NousResearch/hermes-agent/issues/98022) 报告存在"陈旧回执导致无限重启"的新问题，修复链仍在延伸。
- **[#7237](https://github.com/NousResearch/hermes-agent/issues/7237)（59 评论、7 👍，长响应被 `output length limit` 截断）已关闭**：这是存在近 5 个月的高关注度问题，影响 CLI 与 Telegram/Discord/Slack 网关长文本生成。
- Windows 生态修复批量落地：[#46260](https://github.com/NousResearch/hermes-agent/issues/46260)（Win10 安装器 desktop 阶段失败）、[#50707](https://github.com/NousResearch/hermes-agent/issues/50707)（原生 Windows OpenSSH ControlMaster 不兼容）、[#14091](https://github.com/NousResearch/hermes-agent/issues/14091)（SSH 会话环境变量透传）均关闭。
- SSH 可靠性方向：[#84711](https://github.com/NousResearch/hermes-agent/issues/84711)（auth reset 复活陈旧 Codex cooldown）、[#29481](https://github.com/NousResearch/hermes-agent/issues/29481)（`hermes doctor` 忽

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*