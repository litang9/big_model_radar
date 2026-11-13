# OpenClaw 生态日报 2026-11-13

> Issues: 433 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-13 01:03 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-13

## 1. 今日速览

今日 OpenClaw 呈现高活跃度状态：过去 24 小时内 Issues 更新 433 条（新开/活跃 266，关闭 167），PR 更新 500 条（待合并 286，已合并/关闭 214），无新版本发布。核心贡献者 @steipete、@clayton-agent、@roboclaw-bot 等持续高产，今日新开 PR 覆盖 Gateway 性能优化、Slack Socket Mode 修复、Codex 后端加固等多个方向。Issue 侧最突出的主题仍是 **SQLite 状态库稳定性**（WAL checkpoint 阻塞、启动赌博、内存膨胀）与 **claude-cli/Codex 后端的会话状态一致性**，多个 P0/P1 长期悬而未决。整体看，项目开发节奏健康，但稳定性类积压（尤其 DB 层）值得维护者优先投入。

---

## 2. 版本发布

今日无新版本发布。值得注意的是，多个 Issue 提到近期版本 **v2026.11.3 / v2026.11.5-beta.1/2**：历史状态恢复修复（#164445, commit `e02ae3ecb66`）已进入 beta 但**未进入 stable v2026.11.3**（见 [#141474](https://github.com/openclaw/openclaw/issues/141474)）；同时 v2026.11.3 升级流程本身暴露出 Doctor WAL 验证问题（[#197083](https://github.com/openclaw/openclaw/issues/197083)）。

---

## 3. 项目进展

今日已合并/关闭的 PR 以测试基建与守护修复为主，多个重要功能性 PR 处于 maintainer 审查队列：

- **[#197992](https://github.com/openclaw/openclaw/pull/197992)**（已关闭）— 修复 main 分支 export guard 的 9 处失败，区分真实导出与 fixtures 传递的命名空间，守护主干绿灯。
- **[#198006](https://github.com/openclaw/openclaw/pull/198006)** / **[#197998](https://github.com/openclaw/openclaw/pull/197998)** / **[#197997](https://github.com/openclaw/openclaw/pull/197997)** / **[#197993](https://github.com/openclaw/openclaw/pull/197993)**（已关闭）— Control UI locales 同步与多个 E2E 测试时序修复，CI 稳定性持续投入。
- **待合并的重要 PR**：
  - [#197335](https://github.com/openclaw/openclaw/pull/197335)（P1，ready for maintainer）— 修复子代理在父级 yield 后丢失工具访问/结果回传，关联 #196199、#170562 等多条会话状态 issue，属于本周期最关键的架构修复之一。
  - [#197919](https://github.com/openclaw/openclaw/pull/197919)（P1，等待维护者+安全审查）— Codex 原生会话获得使用 OpenClaw OAuth 的插件 MCP 工具（如 Atlassian），打通授权链路。
  - [#197990](https://github.com/openclaw/openclaw/pull/197990)（P1，ready）— 修复 `dispatch_action` 后所有插件 `agent_end` hook 失败。
  - [#197801](https://github.com/openclaw/openclaw/pull/197801)（XL）— 内存受限 Gateway 启动压力优化，按需加载运行时，直击 #181432 报告的 1.9GB 基线内存问题。
  - [#197953](https://github.com/openclaw/openclaw/pull/197953)（XL，ready）— 空闲期预热沙箱依赖模板，消除首个沙箱会话的重建开销。
  - [#198007](https://github.com/openclaw/openclaw/pull/198007) — Slack Socket Mode 3.2 原生重连失败修复（fixes #197952）。
  - [#197551](https://github.com/openclaw/openclaw/pull/197551) — 修复认证 channel owner 查看自动化 run receipts 时丢失管理权限。

**整体评估**：本周期进展集中在“会话/子代理状态一致性 + 启动与运行时性能”两条主线，#197335 与 #197801 若合入，将同时缓解积压 issue 榜单中约 6–8 条高热度问题。

---

## 4. 社区热点

- **[#164294](https://github.com/openclaw/openclaw/issues/164294)**（40 评论，OPEN）— Gateway 状态库 WAL 自动 checkpoint 因进程内常驻 reader 永远无法完成，`logFrames` 已累计 17091 帧。这是今日讨论最多的 issue，与 #181432、#181459 共同构成“SQLite 状态层可靠性”投诉群。
- **[#166634](https://github.com/openclaw/openclaw/issues/166634)**（28 评论，CLOSED）— 崩溃恢复后 reclamation checkpoint 超时导致 agent 永久 UNAVAILABLE；虽已关闭，但其复发案例仍在 #181459 追踪。
- **[#191944](https://github.com/openclaw/openclaw/issues/191944)**（27 评论，OPEN）— macOS 上 `gateway stop` / `stop --force` 均因进程族谱检查失败，属高频运维操作阻断，UX 折损明显。
- **[#120385](https://github.com/openclaw/openclaw/issues/120385)**（26 评论，OPEN，标记 stale）— 定时/cron 与 memory-flush 轮次中 MCP 工具目录构建不完整，仅以"⚠️ Exec failed"暴露。社区诉求：**定时任务场景的可靠性长期被低估**。
- **[#67413](https://github.com/openclaw/openclaw/issues/67413)**（17 评论，CLOSED）— 按 agent 独立配置 dreaming，避免全工作区同时做梦触发 OOM（6GB MemoryMax）。诉求：多 agent 内存调度粒度。

---

## 5. Bug 与稳定性（按严重度）

| 严重度 | Issue | 状态/修复 |
|---|---|---|
| **P0** | [#190563](https://github.com/openclaw/openclaw/issues/190563) 暂停的 Codex 会话无法恢复（provider review 与 native thread 不匹配，回归） | OPEN，需安全审查，暂无 fix PR |
| **P1** | [#144291](https://github.com/openclaw/openclaw/issues/144291) 任何 config 热更新会中止所有进行中的 agent 轮次（消息丢失） | OPEN，需产品决策，无 fix PR |
| **P1** | [#144809](https://github.com/openclaw/openclaw/issues/144809) claude-cli 长轮次（>RUN_STALE_TAKEOVER_MS）整体丢失生成回复 | OPEN，无 fix PR |
| **P1** | [#181432](https://github.com/openclaw/openclaw/issues/181432) 2026.10.5 基线内存暴涨至 ~1.9GB + SQLite 事务超时 + 崩溃循环 | OPEN；**PR [#197801](https://github.com/openclaw/openclaw/pull/197801) 直接针对此类启动内存压力** |
| **P1** | [#181459](https://github.com/openclaw/openclaw/issues/181459) 3.5GB agent DB 使每次启动成为赌博，agent UNAVAILABLE | OPEN，关联 #197335 修复线 |
| **P1** | [#191841](https://github.com/openclaw/openclaw/issues/191841) 2026.10.10 回归：glibc < 2.31（RHEL 8）上所有子进程/exec 失败 | OPEN，fix-shape-clear，待 PR |
| **P1** | [#197083](https://github.com/openclaw/openclaw/issues/197083) 11.1→11.3 升级后 Doctor WAL 验证失败，更新部分未完成 | OPEN（今日新报） |
| P2 | [#197374](https://github.com/openclaw/openclaw/issues/197374) 120s 空闲超时静默压缩 compaction 预算，质量守卫不报原因 | OPEN（今日新报）；**PR [#197845](https://github.com/openclaw/openclaw/pull/197845) 处理 Talk 会话超预算压缩，方向接近** |
| P2 | [#162585](https://github.com/openclaw/openclaw/issues/162585) Windows 插件 staging 自我重物化不收敛（290→612MB/24min） | OPEN |
| P2 | [#167854](https://github.com/openclaw/openclaw/issues/167854) Home 20 条系统事件队列溢出丢弃 session 通知 | OPEN |

已修复确认：[#101929](https://github.com/openclaw/openclaw/issues/101929)（上下文预估 2.3–2.6x 高估）已由 PR #168338 合入 main。

---

## 6. 功能请求与路线图信号

- **模型/额度感知 fallback**：[#192009](https://github.com/openclaw/openclaw/issues/192009)（跨 provider cron fallback 显式授权，CLOSED）与 [#182712](https://github.com/openclaw/openclaw/issues/182712)（limit-aware fallback 跳过耗尽账号）相继提出，说明多 provider 额度调度是强需求方向。
- **Feishu 渠道对齐**：[#131457](https://github.com/openclaw/openclaw/issues/131457)（Feishu progress streaming）+ 历史 #54409、#50490 表明中文社区 Feishu 用户活跃，渠道功能差距是持续痛点。
- **Telegram 骰子**：feature [#137110](https://github.com/openclaw/openclaw/issues/137110) 已有实现 PR [#138202](https://github.com/openclaw/openclaw/pull/138202)（waiting on proof: telegram-e2e），**大概率随下版本落地**。
- **语音/Talk 体验**：PR [#197906](https://github.com/openclaw/openclaw/pull/197906)（Settings→Talk 选择 STT 模型）已带截图证明，waiting on maintainer，纳入下版本可能性高。
- **memory-core dreaming 粒度**：#67413 关闭但配套的 per-agent 配置诉求在 #121232、#180978 中反复出现，产品侧需给出统一路线。

---

## 7. 用户反馈摘要

- **痛点集中点**：① 大型/长会话场景下 SQLite 状态库成为系统性瓶颈（checkpoint 超时、启动赌博、WAL 无限增长）；② 消息丢失类问题（config 热更新中止轮次、claude-cli 长轮次回复丢失）最伤信任；③ 错误提示可诊断性差——如 #167609（guest 脚本 TypeError 与宿主 internal_error 无法区分）、#197374（compaction 静默降级无原因）。
- **典型使用场景**：多 agent + Telegram/Feishu/Matrix 多渠道常驻部署、cron 定时自动化、claude-cli 订阅认证用户、ARM64/低内存 Linux 主机——这些恰好也是问题高发场景。
- **正面信号**：社区贡献者对修复流程响应积极（#198007 明确致谢报告者的根因分析）；大量 PR 带 "proof: sufficient / ready for maintainer look"，贡献质量工具链（clawsweeper 标签体系）运转良好。
- **不满点**：多条高价值 issue 长期挂 `needs-maintainer-review` / `needs-product-decision`（如 #144291 已两月），用户在评论中表达对优先级不透明的不安。

---

## 8. 待处理积压（提醒维护者）

- **[#144291](https://github.com/openclaw/openclaw/issues/144291)**（P1，2026-09-10 起）— config 热更新中止在飞轮次，影响所有用户，已积累 5 个 clawsweeper 标签仍无决策。
- **[#144809](https://github.com/openclaw/openclaw/issues/144809)**（P1）— claude-cli 回复整体丢失，无 fix PR。
- **[#120385](https://github.com/openclaw/openclaw/issues/120385)**（P2，2026-08-08 起，标记 stale 但 26 条评论仍活跃）— cron 场景 MCP 工具缺失，建议解除 stale 复评。
- **[#190563](https://github.com/openclaw/openclaw/issues/190563)**（P0）— Codex 会话恢复回归，ux-release-blocker 标签，需尽快排期。
- **[#114067](https://github.com/openclaw/openclaw/issues/114067)** — CLI `--help` 35x 性能劣化，标记 queueable-fix 但长期未领。
- **PR 侧**：[#145650](https://github.com/openclaw/openclaw/pull/145650)（CLAUDE_CONFIG_DIR 支持，2026-09-12 起，stale）— 修复场景明确（多 Claude 登录主机），建议复核是否可推进；[#197391](https://github.com/openclaw/openclaw/pull/197391)（Knowledge scribe 更新后陈旧运行，含 590k token 会话案例）为 XL 级修复，waiting on author。

---

*数据来源：GitHub API（issues/PR/releases），统计窗口 2026-11-12 至 2026-11-13。*

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告
**数据窗口：2026-11-12 至 2026-11-13**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态当前处于**功能扩张与稳定性偿还并行的阶段**：头部项目日均 Issues/PR 更新均达数百条，社区驱动的“安全马拉松”“贡献质量工具链”等协作机制日趋成熟。两大项目不约而同地遭遇**架构合并后的回归消化期**——统一网关、多渠道会话迁入单进程后，会话状态一致性与投递可靠性成为最集中的投诉源。同时，**消息平台集成（Slack/Feishu/Telegram/WhatsApp）是用户粘性最强、也是静默失败高发的战场**，多 provider 额度调度、后台压缩、低内存部署等工程化诉求正在从 feature request 演变为竞争差异点。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 433（新开/活跃 266，关闭 167） | 500（新开/活跃 359，关闭 141） |
| PR 更新（24h） | 500（待合并 286，已合并/关闭 214） | 500（待合并 376，已合并/关闭 124） |
| Release | 无（beta 修复未进 stable 引发用户焦虑） | 无 |
| PR 合并率 | ~43%（214/500） | ~25%（124/500） |
| 议题密度 | Issues 增量/关闭 ≈ 1.59 | ≈ 2.54 |
| 核心主题 | SQLite 状态库稳定性、子代理状态一致性、启动内存 | 安全加固（sec-marathon）、统一网关回归、compression 管线 |
| 健康度 | **B+**：合并率高、修复方向明确，但 P0/P1 稳定性积压重（含 1 条 ux-release-blocker） | **B**：吞吐最高、安全投入显著，但 issue 净增长快、积压老化严重（多条 3-5 个月） |

---

## 3. OpenClaw 在生态中的定位

**优势**：
- **修复吞吐效率更高**：PR 合并率 43% vs Hermes 25%，多条关键修复（#197335 子代理状态、#197801 启动内存）已 ready 待审，路径清晰。
- **贡献质量工具链成熟**：clawsweeper 标签体系 + "proof: sufficient" 流程运转良好，贡献门槛与质量兼顾。
- **运维性能意识领先**：直接针对 1.9GB 基线内存、沙箱预热、WAL checkpoint 等常驻部署痛点投入 XL 级 PR。

**劣势/风险**：
- **P0 未闭环**：#190563（Codex 会话恢复回归，ux-release-blocker）无 fix PR；#144291 挂 needs-product-decision 两月，优先级不透明引发信任损耗。
- **DB 层是系统性技术债**：#164294/#181432/#181459 构成 SQLite 状态层投诉群，若 #197335/#197801 合入后仍不根治，将成为与竞品拉开的差距点。

**技术路线差异**：OpenClaw 走 **Gateway 中心化架构 + 多后端（claude-cli/Codex）适配**，复杂度集中在状态库与会话映射层；Hermes 走 **多 profile 多租户统一网关 + 桌面/多平台客户端**，复杂度集中在隔离性与平台集成面。社区规模上 Hermes 议论热度略高（359 vs 266 活跃 issues），但 OpenClaw 核心贡献者集中度与响应速度更优。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **会话/上下文压缩可靠性** | #197374 静默压缩预算、#197845 Talk 压缩 | #117886/#97390/#86421 三连 + PR #154681 | 压缩从同步阻塞转向 turn 边界/空闲期后台执行，且不能静默降级 |
| **消息平台集成的静默失败** | #120385 cron MCP 缺失、Feishu #131457 | #110374 Slack 状态（17👍）、#78975 Feishu 100% 失败、#146428 cron 卡死 | "不报错但不工作"比崩溃更伤，需可观测的投递失败信号 |
| **cron/定时自动化可靠性** | #120385（26 评论，被低估） | #146428 | 无人值守场景的工具构建与 secret 作用域需专门测试覆盖 |
| **多 provider/额度调度** | #192009、#182712 | —（隐含于 multiplex profiles） | 跨 provider fallback、limit-aware 调度 |
| **低资源/边缘部署** | #197801（1.9GB 内存）、#191841（RHEL 8） | #154317（Termux） | ARM64/低内存/老 glibc 主机支持 |
| **Windows 一等公民化** | #162585、#167854 | #68128、#78383 | 双方 Windows 欠账均长期未动 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | Gateway 性能、子代理编排、多 LLM 后端（claude-cli/Codex）、OAuth 插件 MCP | 多渠道消息平台（Slack/Discord/WhatsApp/Feishu/Keet）、桌面 workspace、Kanban 自动化、A2A 协议 |
| 目标用户 | 自托管常驻部署（Linux/ARM64 低内存主机）、多 agent + Telegram/Feishu/Matrix 运维型用户 | 多平台个人助手用户、多 profile/多租户场景、桌面重度用户 |
| 架构关键差异 | SQLite 单状态库 + Gateway 进程模型，痛点在 DB 层 | 单进程统一网关 multiplex 多 profile，痛点在隔离性与平台集成 |
| 安全态势 | 常规审查流程（PR 过安全审查队列） | 主动 sec-marathon，A2A 认证/SSRF/文件写入防护集中加固，安全投入更前置 |
| 治理模式 | maintainer + bots（roboclaw-bot 等），标签驱动 | 核心贡献者（@c2h5oh）+ 社区 sweeper 标签 |

---

## 6. 社区热度与成熟度

- **快速迭代阶段**：**Hermes Agent** —— issue 净增速（2.54）远超消化能力，大型功能 PR（#152168 桌面 workspace）持续推进，处于“功能扩张 > 质量收敛”区间；安全马拉松是大版本前的集中加固信号。
- **质量巩固阶段**：**OpenClaw** —— 合并率 43%、修复主线清晰（会话一致性 + 启动性能两条线），处于“架构债偿还”期；但 8 条 P0/P1 中 4 条无 fix PR，若下版本前不闭环将滑回扩张期风险。
- **分层结论**：两者均属头部高活跃项目；Hermes 的风险在**广度带来的积压老化**（5 条 3-5 个月积压、贡献者流失风险如 #71054），OpenClaw 的风险在**深度单点**（DB 层 + 优先级决策不透明）。

---

## 7. 值得关注的趋势信号

1. **“静默失败”是下一轮竞争焦点**：Slack 状态、Feishu 投递、compaction 降级、cron 卡死……两个项目最高👍/评论的 issue 均属此类。对开发者的启示：**可观测性与显式失败信号应作为智能体框架的一级公民设计**，而非事后补丁。
2. **上下文压缩从功能演进为基础设施**：双方均在重构 compression 管线（后台化、按 channel 空闲调度、压缩后 skills 重注入）。长会话时代的压缩调度器将类似数据库的 vacuum/checkpoint，成为核心组件。
3. **无人值守（cron/自动化）场景被系统性低估**：两项目各自的最热积压均涉及定时任务可靠性，且都缺专门的 e2e 覆盖——这是细分贡献机会。
4. **安全正在从“审查项”变为“战役”**：Hermes 的 sec-marathon（fail-open→fail-closed、SSRF 数字 IP 绕过、secrets 隔离）预示智能体框架安全将从注入防护扩展到**多租户 secret 隔离与回调链路验证**；OpenClaw 的 OAuth 插件 MCP（#197919）同样需安全前置审查。
5. **消息平台广度即用户基数，但也是维护负债**：Slack/Feishu/Telegram/WhatsApp 各自的上游 SDK 变更（如 slack-sdk ≥3.44 破坏性更新）要求框架建立**平台适配层的版本锁定与回归测试矩阵**。
6. **多 provider 额度调度（#192009/#182712）尚无项目完整落地**，是明确的空白机会，对订阅制 API 用户（claude-cli 等）价值直接。

---

*结论：两项目同处第一梯队但路线分化——OpenClaw 走“深而稳”（架构债偿还），Hermes 走“广而快”（平台广度 + 安全加固）。对技术选型者：重视常驻自托管与多 LLM 后端选 OpenClaw（关注其 DB 稳定性修复落地节奏）；重视消息平台覆盖与桌面体验选 Hermes（关注多 profile 隔离 P1 与积压消化）。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-13

## 1. 今日速览

项目今日保持**高活跃度**：过去 24 小时内 Issues 更新 500 条（新开/活跃 359，关闭 141），PR 更新 500 条（待合并 376，已合并/关闭 124）。无新版本发布。当前工作重心明显集中在两条线上：一是以 @c2h5oh 为核心的 **sec-marathon 安全修复系列**（A2A 认证、SSRF、dashboard 写入防护、debug paste 泄露等，今日集中提交 5+ 个安全 PR）；二是统一网关（unified gateway, #106742）合并后的遗留问题消化，相关 issue 仍是讨论最热的话题。整体节奏呈“功能合并后大扫除 + 安全加固”特征，项目健康度良好。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日 PR 关闭/合并 124 个，亮点如下：

- **安全加固批量推进（sec-marathon）**：
  - [#153701](https://github.com/NousResearch/hermes-agent/pull/153701) [P1] 修复 dashboard `POST /api/fs/write-text` 未做读取侧同等防护，认证会话可覆盖 `config.yaml`、`.env`、`authorized_keys` 等敏感文件。
  - [#154489](https://github.com/NousResearch/hermes-agent/pull/154489) [P1] `A2A_PEER_TOKENS` 解析失败时 fail-open，隧道/代理可无认证调用完整 agent turn；改为 fail-closed 并走 profile scope。
  - [#154503](https://github.com/NousResearch/hermes-agent/pull/154503) A2A push callback 未做 DNS 解析即匹配私网前缀，`http://2852039166/` 等可绕过 SSRF 防护直击云元数据端点。
  - [#154506](https://github.com/NousResearch/hermes-agent/pull/154506) CLI session-attach 握手仅回显查询参数即通过，改为证明 lease 所有权。
  - [#154637](https://github.com/NousResearch/hermes-agent/pull/154637) 公开 debug paste 上传全量日志（脱敏为减法式，IP/消息体仍可能泄露），改为白名单摘要。
- **桌面体验重构**：[#152168](https://github.com/NousResearch/hermes-agent/pull/152168) 引入全新设计的 agent workspace（保留经典界面回退开关），是近期体量最大的功能 PR，仍在待合并状态。
- **会话状态修复**：[#154681](https://github.com/NousResearch/hermes-agent/pull/154681) 压缩轮转（compression rotation）后保留桌面窗口路由，直击统一网关下 sessions 侧的一类高发问题。
- **体验改进**：[#154744](https://github.com/NousResearch/hermes-agent/pull/154744) 桌面 review pane 支持逐 hunk stage/revert；[#154754](https://github.com/NousResearch/hermes-agent/pull/154754) Hub 安装的 skills 保留可执行位，修复 #82657。
- **已关闭**：[#154317](https://github.com/NousResearch/hermes-agent/pull/154317)（Termux pnpm 按需拉取）、[#153761](https://github.com/NousResearch/hermes-agent/pull/153761)（agent 无进展探索的边界约束）。

总体判断：安全类 PR 密度异常高，预计是安全马拉松活动进行中，是下一版本发布前的重要前置工作。

## 4. 社区热点

- **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)**（64 评论）— 统一网关 #106742 合并后 main 分支上的持续性回归汇总帖，持续三周仍是讨论最热 issue。诉求：用户希望 CLI/TUI/Desktop/消息平台的会话迁入单进程网关后不要出现会话状态与投递回归。
- **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)**（59 评论，标记 blocked/upstream）— 特定账号通过 API 创建 PR 报 `CreatePullRequest` 权限错误，疑似 GitHub 侧上游问题，长期无解引发贡献者挫败感。
- **[#97065](https://github.com/NousResearch/hermes-agent/issues/97065)**（30 评论）— Keet 网关 setup 崩溃 `TypeError: _n() missing required argument 'config'`，影响第三方桌面集成用户。
- **[#110374](https://github.com/NousResearch/hermes-agent/issues/110374)**（15 评论，**17 👍**，按反应数为今日最高）— slack-sdk ≥3.44 破坏 Slack 工作状态指示（"is thinking…"），静默失败。高 👍 表明 Slack 平台用户基数大且深受影响。
- **[#105758](https://github.com/NousResearch/hermes-agent/issues/105758)**（29 评论，needs-decision）— 终端生命周期守卫误杀良性 Node.js CLI 命令，needs-decision 标签显示维护者在权衡守卫粒度。

## 5. Bug 与稳定性（按严重度）

**P1**
- [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) [安全] `gateway.multiplex_profiles` 下默认 profile 的 secrets 泄露到次级 profile 的 terminal 工具及 Kanban 子进程。**尚无直接 fix PR**，与 sec-marathon 主题高度相关，建议优先。
- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) 多 Kanban worker 并发时网关卡顿导致 worker 崩溃、进行中工作丢失。
- [#95670](https://github.com/NousResearch/hermes-agent/issues/95670) Discord handoff 直接建线程缺 `type` 参数，默认为 private_thread。

**P2**
- [#146428](https://github.com/NousResearch/hermes-agent/issues/146428) cron 投递遇 `UnscopedSecretError` 时永久静默卡死（multiplexed profiles 家族问题又一例）。
- [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) 生命周期守卫误杀（见上，needs-decision）。
- [#121095 相邻] [#121281](https://github.com/NousResearch/hermes-agent/issues/121281) 手动 promote 卡片未清 `last_failure_error`，`blocker_auth` 永久停放。
- [#108927](https://github.com/NousResearch/hermes-agent/issues/108927) Kanban 熔断器对瞬时基础设施故障永久弃卡、无重试。
- [#121095 同域] [#121095](https://github.com/NousResearch/hermes-agent/issues/121095)、[#141854](https://github.com/NousResearch/hermes-agent/issues/141854)（token-free 平台 Messaging 页永久显示 "Needs setup"）。
- [#141855](https://github.com/NousResearch/hermes-agent/issues/141855) Desktop 压缩时用户消息从 transcript 消失（渲染层问题，数据未丢）。
- [#132741](https://github.com/NousResearch/hermes-agent/issues/132741) desktop-only 插件每次启动刷 58 条/24h 的加载警告。
- [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) Windows no-breakaway job object 下 WhatsApp 桥接 WinError 5，长期未修。

**修复状态**：压缩相关 issue（#136486、#131578、#133514）已于近日关闭，配合 PR #154681 显示 sessions/compression 方向正在系统性收口。

## 6. 功能请求与路线图信号

- **后台压缩**：[#117886](https://github.com/NousResearch/hermes-agent/issues/117886)（压缩移到 turn 边界后台执行）+ [#97390](https://github.com/NousResearch/hermes-agent/issues/97390)（按 channel 空闲压缩）+ [#86421](https://github.com/NousResearch/hermes-agent/issues/86421)（压缩后重注入 skills）。三个 issue 同指 compression 管线重构，且 #154681 已在处理压缩轮转会话路由——**强烈信号：compression 是下一阶段重点**。
- **桌面新 workspace**（PR #152168）合并后将带动 desktop/chat、desktop/files 一批 UI 议题落地。
- **ACP Registry 注册**：[#47435](https://github.com/NousResearch/hermes-agent/issues/47435)（Zed/JetBrains/VS Code 集成），低成本高曝光，needs-decision 待认领。
- **模型按需升级**（#20249，per-turn expert-on-demand）已按 sweeper:not-planned 关闭，短期不纳入。
- **Kanban 可靠性**：#121281、#108927、#145022 组成的熔断/守卫/并发三连问题，配合 sweeper:risk-automation 标签，构成一个待排期的专项。

## 7. 用户反馈摘要

- **多 profile/多租户用户最痛苦**：multiplexed profiles 相关（#82936、#146428、#137080 家族）反复出现，核心诉求是隔离性——次级 profile 应真正最小权限。
- **消息平台用户在意"静默失败"**：Slack 状态指示（#110374，17 👍）、cron 静默卡死（#146428）、Feishu 投递 100% 失败（#78975）均属"不报错但不工作"，比崩溃更招怨。
- **Windows 用户持续处于二等公民感受**：#68128（WhatsApp WinError 5）、#78383（Windows 媒体重复投递）均挂 os/windows + sweeper:risk-platform-windows，长期未动。
- **Kanban 重度用户**反馈熔断机制过于激进，一次上游抖动即永久弃卡，丢失运行中工作。
- **正面信号**：Desktop 新 workspace、逐 hunk review（#154744）、skills 可执行位修复（#154754）等体验型 PR 获得社区积极响应；安全马拉松的高密度提交也被视为维护方投入度高的体现。

## 8. 待处理积压

| Issue/PR | 问题 | 状态提醒 |
|---|---|---|
| [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) P1 secrets 泄露 | 开启 3 个月+ | 安全马拉松进行中，建议纳入 |
| [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) Windows WhatsApp WinError 5 | 开启近 4 个月 | 有文档化的修复方案（`windows_detach_flags_without_breakaway()`），待实现 |
| [#78975](https://github.com/NousResearch/hermes-agent/issues/78975) Feishu cron 投递 100% 失败 | 开启 3 个月+ | 根因明确（非法 `receive_id_type`），修复成本低 |
| [#108927](https://github.com/NousResearch/hermes-agent/issues/108927) Kanban 熔断永久弃卡 | 开启 2 个月 | needs 排期决策 |
| [#47435](https://github.com/NousResearch/hermes-agent/issues/47435) ACP Registry 注册 | 开启近 5 个月 | good first issue，长期无人认领 |
| PR [#71054](https://github.com/NousResearch/hermes-agent/pull/71054) 阿拉伯语 i18n/RTL | 开启近 4 个月 | 已 rebase 但仍待 review，贡献者流失风险 |
| PR [#152168](https://github.com/NousResearch/hermes-agent/pull/152168) 桌面新 workspace | 大型功能 PR | 4 天未合并，建议尽快明确 review 时间表 |

**健康度小结**：吞吐量高、安全投入显著、压缩/会话管线正在收口；主要风险在多 profile 隔离类 P1 问题长期积压，以及 Windows 平台与小型消息平台（Feishu/QQBot）的维护欠账。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*