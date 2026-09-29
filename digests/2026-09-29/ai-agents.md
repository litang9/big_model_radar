# OpenClaw 生态日报 2026-09-29

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-29 00:21 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 — 2026-09-29

---

## 1. 今日速览

OpenClaw 今日继续保持高活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 440，关闭 60），PR 更新 500 条（待合并 340，已合并/关闭 160），无新版本发布。当前主线工作是 **2026.9.7 版本的修复冲刺**（见 #157531 修复追踪器），已纳入 21 个 P1 候选修复中的 18 个。社区关注焦点集中在 **Gateway 稳定性与资源问题**：model-catalog worker 内存泄漏、SQLite state-lifecycle 租约竞争、更新流程卡死等多个 P0 尚未闭环，修复压力较大。PR 侧以维护者 @steipete 主导的 "deslop"（代码去重清理）系列与 TTS/Slack 等功能扩展并行推进，项目整体健康度：活跃度优秀，稳定性风险偏高。

---

## 2. 版本发布

今日无新版本发布。**2026.9.7** 正在准备中，修复追踪见 [#157531](https://github.com/openclaw/openclaw/issues/157531)（最新 prepared source `711db27c`，18/21 P1 候选已进 PR）。

---

## 3. 项目进展

过去 24 小时合并/关闭 PR 约 160 个，代表性进展：

- **#145072（已关闭）**：macOS npm 更新在 "global install swap" 阶段失败的问题已解决 — [链接](https://github.com/openclaw/openclaw/issues/145072)
- **#159514（已关闭）**：model-catalog worker 每次请求重建 discovery registry、每请求泄漏约 8 MB 的问题已确认修复 — [链接](https://github.com/openclaw/openclaw/issues/159514)
- **#152284（已关闭）**：在线 Gateway 下构建 dist 导致模块被删（ERR_MODULE_NOT_FOUND）— [链接](https://github.com/openclaw/openclaw/issues/152284)
- **#120775（已关闭）**：Cerebras provider 400 空 body 问题 — [链接](https://github.com/openclaw/openclaw/issues/120775)
- **#160798（已关闭）**：仓库工具脚本 deslop 清理（XL 级）— [链接](https://github.com/openclaw/openclaw/pull/160798)

值得关注的待合并 PR（"ready for maintainer look"）：
- [#160325](https://github.com/openclaw/openclaw/pull/160325)（P1）：修复被丢弃的 subagent 流量计入父 CLI turn 预算，导致健康 claude-cli 运行被误杀
- [#134425](https://github.com/openclaw/openclaw/pull/134425)：非规范 tool-call id 的 continuation 重放修复
- [#137593](https://github.com/openclaw/openclaw/pull/137593)：memory search deadline 可配置化
- [#157007](https://github.com/openclaw/openclaw/pull/157007)：darwin 停止预算从 launchd job 派生

整体看，主分支正以“清理 + 冲刺 2026.9.7”双轨推进。

---

## 4. 社区热点

| 议题 | 评论 | 焦点 |
|---|---|---|
| [#149538](https://github.com/openclaw/openclaw/issues/149538)（P0，22 评论） | Gateway ready 后事件循环被饿死、/health 全超时、RSS 涨到 OOM（632-agent 机队） | 大规模部署的可用性硬伤，尚无修复 PR |
| [#157067](https://github.com/openclaw/openclaw/issues/157067)（17 评论） | Windows 隔离 cron 会话向 worker 传递不可克隆的 Proxy 环境 | 已有 linked PR 打开 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616)（16 评论） | hook/tool 子进程未 reap，僵尸进程累积 | 长期回归，6 月至今未修 |
| [#40001](https://github.com/openclaw/openclaw/issues/40001)（16 评论） | write 工具无 append 模式，隔离会话覆盖共享文件造成静默数据丢失 | 需要 product decision |
| [#157531](https://github.com/openclaw/openclaw/issues/157531)（15 评论） | 2026.9.7 修复追踪器 | 社区围绕发版内容集中讨论 |

诉求主线：**大规模/多 agent 部署下的 Gateway 稳定性** 与 **数据不丢失** 是用户最强烈的两类诉求。

---

## 5. Bug 与稳定性（按严重度）

**P0：**
1. [#160521](https://github.com/openclaw/openclaw/issues/160521)（今日新报）：state DB read-admission seal → unhandled rejection 崩溃 — 无 fix PR
2. [#157160](https://github.com/openclaw/openclaw/issues/157160)：Gateway 在 plugin-doctor-post-session-state 上 crash-loop（Watchtower 升级 2026.9.6 后）— 无 fix PR
3. [#159662](https://github.com/openclaw/openclaw/issues/159662) / [#156571](https://github.com/openclaw/openclaw/issues/156571)：prepared-model-catalog worker 无界内存泄漏（4–5 GB/h）/ tmp 捕获目录 1–3 GB/min 填满磁盘 — 无 fix PR
4. [#156986](https://github.com/openclaw/openclaw/issues/156986)：`openclaw update` 卡死在 update-candidate-state（233MB+ 失控输出）— 无 fix PR
5. [#158095](https://github.com/openclaw/openclaw/issues/158095)：SQLite worker 生命周期 acquire 永久失败直至重启 — 无 fix PR
6. [#158936](https://github.com/openclaw/openclaw/issues/158936)：macOS readiness watchdog 误杀慢启动 gateway 造成重启循环 — 标记 queueable-fix
7. [#152965](https://github.com/openclaw/openclaw/issues/152965)：热重载非 channel 插件时误 dispose channel 插件、丢消息 — 无 fix PR
8. [#156424](https://github.com/openclaw/openclaw/issues/156424)：audit_events 索引损坏致 Gateway 瘫痪（2 次事故）— 无 fix PR

**P1 重点：**
- [#157989](https://github.com/openclaw/openclaw/issues/157989)：插件源捕获每次 CLI 命令重写 1.1–1.4 GB、每次 Gateway 启动 6.5 GB，SSD 磨损严重
- [#159094](https://github.com/openclaw/openclaw/issues/159094)：state-lifecycle 租约"幽灵持有者"竞争
- [#158127](https://github.com/openclaw/openclaw/issues/158127)：多 agent Codex turn 间歇性失败（2026.9.6 回归）
- [#159596](https://github.com/openclaw/openclaw/issues/159596)：Gateway 内存锯齿，约 200 次/天 critical 内存压力事件
- [#156710](https://github.com/openclaw/openclaw/pull/156710)（有 PR 打开）：AsyncLocalStorage.bind 传对象致 native exec 失败

大部分 P0 标注 `clawsweeper-recovery-stuck`，即当前处于修复停滞状态，风险需关注。

---

## 6. 功能请求与路线图信号

- **Slack 生态深化**：[#159525](https://github.com/openclaw/openclaw/pull/159525)（scoped Slack reviewers）、[#159468](https://github.com/openclaw/openclaw/pull/159468)（Codex 审批绑定 app/MCP owner）、[#159879](https://github.com/openclaw/openclaw/pull/159879)（以登录用户身份加入 Slack huddles）— Slack 能力明显是当前投入方向
- **TTS/Gemini 语音**：[#157465](https://github.com/openclaw/openclaw/pull/157465)（Gemini 双声音对话）、[#159947](https://github.com/openclaw/openclaw/pull/159947)（Control UI 克隆自定义声音）— 基础已合入 main，扩展 PR 活跃
- **MCP 生态**：[#154043](https://github.com/openclaw/openclaw/pull/154043)（per-request header provider）、[#160246](https://github.com/openclaw/openclaw/pull/160246)（71 个公司 MCP built-in，opt-in）— 后者体量大，可能分批落地
- **Onboarding 完善需求**：[#16670](https://github.com/openclaw/openclaw/issues/16670) 要求 Memory/Embedding 配置纳入 setup 向导（9 评论，社区呼声高，尚无 PR）
- **Talk Mode 空闲超时**：[#46844](https://github.com/openclaw/openclaw/issues/46844)（P3，有 linked PR）
- [#155633](https://github.com/openclaw/openclaw/issues/155633)：Databricks Unity Gateway 官方 provider（实现 PR #155634 已开）

---

## 7. 用户反馈摘要

- **痛点集中在 2026.9.5/9.6 升级后**：大量用户反馈升级后出现泄漏、crash-loop、更新卡死，多条留言表达对“Watchtower 自动更新破坏生产”的不满（#157160、#154114）
- **资源消耗不可接受**：SSD 写入量（#157989）、内存泄漏（#159662、#159596）在单用户轻负载场景也会触发，社区对插件源捕获机制批评较多
- **静默失败最伤信任**：write 覆盖文件（#40001）、feishu 多 lane 丢消息（#157389）、Telegram 后台 subagent 无反馈（#101656）、claude-cli 8 MiB stdout 上限吞掉最终回复（#150132）— 用户完成工作后发现结果被丢弃，情绪最负面
- **正面信号**：修复追踪器 #157531 持续更新、clawsweeper 自动分类、多份新 PR 质量高且带充分 proof，社区对响应速度整体认可，但对 P0 积压时长有抱怨

---

## 8. 待处理积压（提醒维护者）

- **#40001**（3 月开，P0，数据丢失）：write 无 append 模式 — 7 个月未修，需 product decision
- **#97616**（6 月开，P1）：僵尸子进程泄漏 — 3 个月未修
- **#84037**（5 月开，P1）：Codex app-server 稳态 CPU 过高
- **#16670**（2 月开，9 评论 +2👍）：onboarding 缺 Memory 配置
- **#121661 / #141017**（8-9 月开，安全相关）："embedded tool authority registration does not match its attempt" 系列阻断 subagent 跨 provider 委派，100% 复现仍无修复
- **PR 侧**：[#126549](https://github.com/openclaw/openclaw/pull/126549)（UI cursor 重连修复）自 8 月 20 日开放至今待审；#154043（MCP header provider）9 月 20 日开放，需 proof

**建议优先级**：① model-catalog worker 泄漏/磁盘写入三连（#159662/#156571/#157989）② state-lifecycle 租约系列（#156917/#159094/#158095）③ 更新链路卡死（#154114/#156986）— 三者均直接影响 2026.9.7 发版可信度。

---

## 横向生态对比

# 个人 AI 助手/智能体开源生态横向对比报告 · 2026-09-29

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**高活跃、高分化**阶段：头部项目日均 Issue/PR 活动均达数百条量级，表明用户基础已从早期尝鲜转向生产化部署。当前生态的主旋律是**“可靠性补课”**——两个核心项目（OpenClaw、Hermes Agent）今日精力均集中于升级链路、内存/进程生命周期、数据不丢失等稳定性问题，而非新功能扩张。同时，**多 agent 协作、长期记忆、语音/TTS、插件/MCP 生态**构成下一轮功能竞争的四大方向。Watchtower 式自动更新在生产环境的破坏性事故，正在推动社区重新审视发版策略。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 440，关闭 60） | 500（新开/活跃 294，关闭 206） |
| PR 更新（24h） | 500（待合并 340，合并/关闭 160） | 500（待合并 392，合并/关闭 108） |
| Issue 关闭率 | 12% | 41% |
| Release | 无（2026.9.7 冲刺中，18/21 P1 已进 PR） | 无（daily-commit 累积，v0.21.5+3642） |
| P0/P1 状况 | 8 个 P0，多数 `clawsweeper-recovery-stuck` | P1 关键路径（cron、gateway 存活）已覆盖 |
| 健康度评估 | 活跃度优秀，稳定性风险偏高 | 良好，修复收敛节奏稳定 |

**关键差异**：Hermes 的 Issue 关闭率（41%）约为 OpenClaw（12%）的 3.4 倍，修复吞吐更健康；OpenClaw 的 P0 积压（含 7 个月未修的数据丢失 #40001）是主要风险敞口。

## 3. OpenClaw 在生态中的定位

- **规模与影响力领先**：单日 440 条活跃 Issue、632-agent 机队级部署场景出现，说明 OpenClaw 已承载生态内最大规模的生产负载，是事实上的“大规模部署参照系”。
- **优势**：功能面最宽（Slack 深度集成、TTS/语音克隆、71 个公司 MCP built-in）、修复流程工程化（#157531 追踪器 + clawsweeper 自动分类）、多平台 channel 支持。
- **技术路线差异**：OpenClaw 走“功能扩张 + 事后修复合同”路线，正在以 deslop 清理与发版冲刺双轨压缩风险；Hermes 走“模块化 gateway + 插件目录化（vendor 代码不进核心）”的收敛路线，架构边界更清晰。
- **短板**：Gateway 在大规模多 agent 场景的稳定性（OOM、事件循环饿死、SQLite 租约竞争）尚未闭环，且 9.5/9.6 升级事故损害了生产用户信任——这是 Hermes 相对的优势区间。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **子进程/worker 生命周期管理** | #97616 僵尸进程累积、#158095 SQLite worker 永久失败 | #126846 cgroup 自杀式收割、#122222 cron worker 依赖失败 | 子进程必须可回收、不可误杀父服务、依赖可见 |
| **升级/更新链路可靠性** | #156986 update 卡死、#157160 Watchtower crash-loop | #127072 Desktop 更新 skew 检查、#122438 launcher 自愈 | 自动更新不能破坏生产实例 |
| **静默数据丢失** | #40001 write 无 append、#152965 热重载丢消息 | #127077 checkpoints 嵌套 git 检测、#123801 消息消失 | 完成的工作不能被静默丢弃——两社区负面情绪最强点 |
| **长期记忆** | #16670 Memory/Embedding 纳入 setup 向导 | #10771 Auto Dream 记忆整合、记忆退化关注 | 记忆需可配置、可维护、不退化 |
| **多 agent 协作** | #160325 subagent 预算隔离、#121661 跨 provider 委派 | #97681 跨 gateway Bot 协作（被 #106742 阻塞） | 多实例/多 agent 是两家明确的路线图方向 |
| **依赖安全** | — | #122424 js-yaml/yaml CVE 区间 | 依赖供应链需常态化升级 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | Channel 生态（Slack/Telegram/feishu）、语音/TTS、MCP built-in 规模化 | Desktop 体验、Discord 语音 TTS、cron/Kanban 高级工作流、i18n |
| 目标用户 | 大规模自托管机队、企业 Slack 集成场景 | 个人/小团队自管安装、深度定制用户 |
| 架构 | TS/Node 为主，Gateway 单体承载多 channel，插件热重载 | Python，模块化 gateway + 插件目录仓，committed venv 隔离 |
| 数据层 | SQLite state-lifecycle 租约（竞争问题多） | SQLite + RFC 中的可插拔 SessionDB（#23717） |
| 发版模式 | 版本号冲刺 + 修复追踪器 | daily-commit 滚动累积 |

## 6. 社区热度与成熟度

- **第一梯队（OpenClaw）**：热度最高但处于**风险消化期**——P0 积压、多数标记修复停滞，2026.9.7 发版可信度取决于三大问题簇（内存/磁盘泄漏三连、租约系列、更新卡死）能否闭环。
- **第二梯队（Hermes Agent）**：处于**快速迭代 + 质量巩固并行期**——单日十余个修复 PR 密集落地，关闭率 41%，P1 关键路径已覆盖；但 392 个待合并 PR 积压偏大，评审带宽是瓶颈。
- 共同短板：**长尾 issue 处理慢**（OpenClaw #40001 七个月、#97616 三个月；Hermes #68321 两个多月无 repro），以及安全类 issue（OpenClaw #121661/#141017）长期未修。

## 7. 值得关注的趋势信号

1. **“静默失败”是信任的头号杀手**：write 覆盖文件、消息丢失、stdout 上限吞回复——用户对“结果被丢弃”的容忍度低于崩溃。AI 智能体框架设计应将**数据完整性保证（append 语义、事务性 checkpoint）**作为一等公民。
2. **多 agent 生产化倒逼资源治理**：632-agent 机队、subagent 预算隔离、跨 provider 委派——单机单 agent 架构已不够，**配额隔离、进程回收、租约机制**是刚需。
3. **自动更新的信任危机**：Watchtower 类机制在两项目均引发事故，“更新前 skew 检查 + 可回滚 + 健康检查门控”将成为标配。
4. **插件/MCP 生态化不可逆**：OpenClaw 71 个 MCP built-in、Hermes 插件目录仓策略，均指向“核心瘦、生态厚”的架构共识。
5. **记忆与 Session 持久层是下一个竞争高地**：可插拔 SessionDB（Hermes #23717，10👍）与 Memory onboarding（OpenClaw #16670）呼声同频，SQLite 单文件方案在热更新/并发场景的局限已充分暴露。
6. **语音/多模态交互加速**：Gemini 双声音、声音克隆、Discord 流式 TTS——语音正从实验特性转向个人助手的核心交互面。

**对开发者的建议**：选型时若重视大规模部署与 channel 生态，OpenClaw 能力面最全但需规避 9.x 升级风险窗口；若重视自管安装的“开箱即用”与架构可扩展性，Hermes 的收敛节奏更稳。两者共同的教训：**智能体系统的差异化竞争力正在从模型能力转向运维可靠性**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 · 2026-09-29

## 1. 今日速览

项目处于**高度活跃状态**：过去 24 小时 Issues 更新 500 条（新开/活跃 294，关闭 206），PR 更新 500 条（待合并 392，已合并/关闭 108）。今日无新版本发布，但贡献节奏密集——仅 9 月 29 日当天就有十余个新修复 PR 提交（#127066–#127083 区间），集中轰炸安装/更新、会话状态与 Desktop 可靠性三大风险域。整体健康度良好：关闭率约 41%，P1 级 cron worker 导入失败的关键 Bug 已在 #122951 中落地修复。

## 2. 版本发布

今日无新版本发布。当前主干持续以 daily-commit 形式累积修复（参考 #125375 报告的 `v0.21.5+3642.g8c9fe96`）。

## 3. 项目进展

今日已合并/关闭的重要变更：

- **[#122951](https://github.com/NousResearch/hermes-agent/pull/122951)（已关闭）** — 修复 P1 级问题：managed gateway 下 cron 外部 worker 使用裸 store 解释器导致 `No module named 'ruamel'`、所有定时任务失败。现改用 committed venv 解释器启动，直接对应用户侧最痛的 #122222。
- **Desktop 安装器/launcher 系列修复关闭**：#122438（Linux launcher 自愈到无 desktop 的 venv）、#122485（`.desktop` Exec 解析失败）、#85422（macOS 官方安装器强制本地 bootstrap）均已关闭，安装/更新风险域明显收敛。

今日新开的高质量 PR（待合并，推进方向明确）：

- [#127083](https://github.com/NousResearch/hermes-agent/pull/127083) — 尊重用户显式设置的 `compression.timeout`，含 migration 50。
- [#127082](https://github.com/NousResearch/hermes-agent/pull/127082) — 重复会话标题修复时保留用户手输标题（按 title 优先级选幸存者）。
- [#127077](https://github.com/NousResearch/hermes-agent/pull/127077) — checkpoints 回滚前检测嵌套 git 仓库并拒绝静默数据丢失。
- [#127046](https://github.com/NousResearch/hermes-agent/pull/127046) — Desktop 跨重启保留 stopped 标记与失败轮次错误卡片（修 #124373）。
- [#126846](https://github.com/NousResearch/hermes-agent/pull/126846) — **P1**：非 systemd 父进程下拒绝 cgroup_cleanup 自杀式收割，防止活 gateway 被误杀。
- [#127072](https://github.com/NousResearch/hermes-agent/pull/127072) — 打包 Desktop 更新前先做 skew 检查，防止后端与系统包 shell 脱节。

**评估**：本周修复合入节奏稳定，P1 关键路径（cron、gateway 存活）均已覆盖，项目以“每日一批修复 PR”的速度稳步推进。

## 4. 社区热点

| Issue | 评论 | 热点分析 |
|---|---|---|
| [#122222](https://github.com/NousResearch/hermes-agent/issues/122222)（已关闭，31 评论） | P1 | 自管安装下 cron 全军覆没，社区高共鸣；随 #122951 修复关闭，是本周最典型案例 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681)（30 评论） | P3 | 跨 gateway 的 Bot 协作，被 #106742（统一 gateway 运行时）阻塞，Teknium 明确表示 Group Chat 稳定后约一个月再评估——多实例协作是明确的路线图方向 |
| [#23717](https://github.com/NousResearch/hermes-agent/issues/23717)（24 评论，10 👍） | RFC | 可插拔 SessionDB（PostgreSQL/MySQL），“热更新死亡螺旋”问题引发强烈共鸣，👍 数最高的 RFC 之一 |
| [#123801](https://github.com/NousResearch/hermes-agent/issues/123801)（14 评论） | P1 | macOS Desktop 回复重复渲染，已定位到服务端 display projection，与 #122167 同根 |
| [#10771](https://github.com/NousResearch/hermes-agent/issues/10771)（12 评论，6 👍） | P3 | “Auto Dream” 自动记忆整合，用户对长期记忆退化的关注度持续上升 |

## 5. Bug 与稳定性（按严重度）

**P1**
- [#122222](https://github.com/NousResearch/hermes-agent/issues/122222) cron 外部 worker 导入依赖失败（已关闭）→ ✅ fix：#122951（已合入）
- [#126845]/[#126846](https://github.com/NousResearch/hermes-agent/pull/126846) gateway ExecStopPost 自杀收割 → ✅ fix PR 开放中

**P2**
- [#123801](https://github.com/NousResearch/hermes-agent/issues/123801) + [#122167](https://github.com/NousResearch/hermes-agent/issues/122167) Desktop 重复/消失消息（display projection 层）→ fix 方向部分覆盖于 #127046
- [#68321](https://github.com/NousResearch/hermes-agent/issues/68321) 切换会话后助手消息消失（渲染层，DB 完好），仍 needs-repro
- [#122490](https://github.com/NousResearch/hermes-agent/issues/122490) bot-to-bot DM 投递 runner 缺第三方依赖（ruamel）——与 #122222 同族，需确认 #122951 是否覆盖该路径
- [#125375](https://github.com/NousResearch/hermes-agent/issues/125375) PM venv 启动的 launchd 服务无法启动却报 ✓
- [#122239](https://github.com/NousResearch/hermes-agent/issues/122239) Windows cp936 下 `hermes update` UnicodeDecodeError → 相关修复见 #127070（Windows Git 解析）

**P3**
- [#123926](https://github.com/NousResearch/hermes-agent/issues/123926) 插件启动时随机静默加载失败（`sys.modules` 迭代中修改）
- [#122349](https://github.com/NousResearch/hermes-agent/issues/122349) 插件运行时状态文件触发无限 sync/rebuild 循环
- [#101160](https://github.com/NousResearch/hermes-agent/issues/101160) Buzz 静默即被判死的 300s 重连循环

**安全**
- [#122424](https://github.com/NousResearch/hermes-agent/issues/122424) js-yaml@4.3.1 / yaml<2.9 落在已知 CVE 区间，建议尽快随依赖 PR 升级

## 6. 功能请求与路线图信号

- **跨平台/跨网关协作**（#97681、#8366 已作为 duplicate 归并）——统一 gateway runtime（#106742）是前置，明确在核心路线图上。
- **可插拔 SessionDB**（#23717，10 👍）——RFC 成熟度高，若合并将解决 SQLite 热更新死锁这一长期痛点，建议维护者优先给出 tracking issue。
- **Discord 语音频道流式 TTS**（[PR #120180](https://github.com/NousResearch/hermes-agent/pull/120180)）——功能完整度高，接近可合入。
- **插件生态扩张**：#127068（gemini-image 入 catalog）、#127071（插件 pin 升级）——"vendor 代码不进核心、独立插件仓”的目录化策略运转良好，预示下版本能力面持续扩容。
- **记忆自动整理**（#10771）与 **skills lint**（#37352）——社区呼声稳定，暂无对应 PR，属中期候选。
- **德语 locale**（#51217 已关闭）——i18n 社区贡献通道畅通。

## 7. 用户反馈摘要

- **最大痛点：自管安装的依赖完整性**。多个独立 issue（#122222、#122490、#125375）指向同一模式：Hermes 子进程使用“裸解释器"导致第三方依赖不可见。用户强烈期望"装完即用"。
- **Desktop 渲染可靠性**是第二大抱怨源：重复回复、消息消失、切换会话异常——数据层完好但显示层不可信，严重侵蚀信任感。
- **更新体验**：launcher/Exec 自愈错误、Windows 编码崩溃、安装器劫持 npm（#18357 情绪激烈的“sabotage"投诉）表明安装路径仍是负面评价集中区。
- **正面信号**：用户对模块化架构（gateway/插件目录）、Kanban/cron 等高级工作流的深度使用反馈活跃，说明核心用户群黏性高。

## 8. 待处理积压

- [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) RFC 已 open 4 个多月（5 月创建），needs-decision，10 👍，建议维护者尽快裁定。
- [#68321](https://github.com/NousResearch/hermes-agent/issues/68321) 7 月报告的 Desktop 消息消失，仍 needs-repro，13 评论无结论。
- [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) 等待 #106742，注意 Teknium 承诺的"一个月后复查"节点已近，建议主动跟进。
- [#101160](https://github.com/NousResearch/hermes-agent/issues/101160) 9 月初报告的 Buzz 重连循环仍无 fix PR。
- PR 积压提示：**392 个待合并 PR** 规模偏大，尤其 #120180（Discord TTS）、#126846（P1 gateway 保护）值得评审优先。

---
*数据来源：GitHub API（Issues/PR 最近 24 小时窗口）。统计口径见数据概览。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*