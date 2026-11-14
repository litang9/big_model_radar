# OpenClaw 生态日报 2026-11-14

> Issues: 327 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-14 00:52 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-14

## 1. 今日速览

过去 24 小时 OpenClaw 保持高强度活跃：Issues 更新 327 条（新开/活跃 211，关闭 116），PR 更新 500 条（待合并 286，已合并/关闭 214），无新版本发布。贡献者（包括核心成员 @steipete、@vincentkoc、@daniel-lxs、@etzelm 及机器人 @roboclaw-bot）持续产出修复与功能 PR，涉及 Gateway 内存优化、模板系统、Control UI 体验等多个方向。社区讨论焦点集中在稳定性议题：Windows 可靠性、Gateway 内存泄漏、SQLite worker 崩溃等多个 P0/P1 问题仍在等待维护者处理。整体健康度：开发吞吐量高，但高严重级 Bug 积压值得关注。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日 PR 活动以修复与体验优化为主，若干重要方向推进：

- **Gateway 内存优化**：#198194（XL，[链接](https://github.com/openclaw/openclaw/pull/198194)）针对内存受限 ARM64 主机降低 Gateway 常驻内存，与 Issue #192547 呼应；#198512 为轻量 transcript 读取减少约 10 MiB 堆内存。
- **模板系统修复**：@etzelm 连续提交 #198520（修复 symlink 路径下 Template Add 失败，P1）、#198521（预览失败时提示可能部分应用），均已具备充分证明等待维护者审查。
- **平台可靠性**：@steipete 的 #198513 修复委托 service cgroup 下 Gateway 无法恢复的问题，配合 #198501 的跨 schema 恢复。
- **多 Gateway 配对修复**：#198466 修复同主机多 Gateway 时 `openclaw pair` 命中错误实例的问题。
- **Control UI 持续打磨**：#198481（插件图片显示）、#198493（NFC/NFD Unicode 搜索归一化）、#198507（移除回复下方 token 计数）等一批 UI 修复关闭。
- **新功能推进**：#196951（agent 必要人工步骤交接）就绪待审；#197739（OpenClaw ID 成员角色可配置，涉及安全边界）与 #197394/#197395（cron 并发与退避策略）等待作者/证明。
- **CI 稳定性**：#198517、#198526、#198510 等修复每小时 main CI 的超时与依赖检查失败。

## 4. 社区热点

- **#170956（32 评论，P0）** [Windows 启动慢、插件关闭不干净、schtasks 权限错误导致重启/更新不可靠](https://github.com/openclaw/openclaw/issues/170956) — 长期高热度，反映 Windows 托管服务部署用户的强烈可靠性诉求。
- **#119720（26 评论，P1）** [同步 agent 持久化阻塞 Gateway 事件循环](https://github.com/openclaw/openclaw/issues/119720) — 大规模部署核心痛点，已落地部分修复（#140231、#138984），作者持续更新现状。
- **#126950（已关闭，16 评论）** [Telegram 回调数据被静默丢弃](https://github.com/openclaw/openclaw/issues/126950) — 消息丢失类问题，今日关闭，关联 PR 开放中。
- **#192009（已关闭，14 评论）** [跨 provider cron 回退账号显式授权](https://github.com/openclaw/openclaw/issues/192009) — 反映多 provider 自动化用户对配额耗尽连续性的需求。
- **#142037（已关闭，14 评论）** [Slack 顶层消息 thread 不匹配导致回复记为 mute](https://github.com/openclaw/openclaw/issues/142037)。
- **#79223（已关闭，12 评论）** [Dream Diary 语言可配置](https://github.com/openclaw/openclaw/issues/79223) — 非英语（中文）用户对本地化一致性的典型诉求。

## 5. Bug 与稳定性（按严重程度）

**P0（无 fix PR，标注 `clawsweeper:no-new-fix-pr`）：**
- [#190563](https://github.com/openclaw/openclaw/issues/190563) 暂停的 Codex 聊天无法恢复（provider review/native thread 不匹配），回归 + 需安全审查。
- [#193094](https://github.com/openclaw/openclaw/issues/193094) 托管更新在 validating 阶段挂起 57 分钟后被 SIGKILL。
- [#141413](https://github.com/openclaw/openclaw/issues/141413) macOS 应用对 SecretRef token 的本地 Gateway 连接不带认证令牌。

**P1（高影响）：**
- [#191847](https://github.com/openclaw/openclaw/issues/191847) 2026.10.10 回归：大会话反复杀死 512 MB SQLite worker，每轮报 "admission is closed"。
- [#182369](https://github.com/openclaw/openclaw/issues/182369) Gateway RSS 以 ~0.1 GiB/h 增长且内部监控不触发（与 PR #198194 方向相关）。
- [#155119](https://github.com/openclaw/openclaw/issues/155119) 子代理最终答案丢失 + deliveryStatus 卡在 pending。
- [#181120](https://github.com/openclaw/openclaw/issues/181120) macOS Gateway 主线程阻塞在关闭 worker MessagePort 时无响应。
- [#185085](https://github.com/openclaw/openclaw/issues/185085) 稳定版 2026.10.7 仍缺失 #177063 的 exec completion 修复，且不重试。

**P2 亮点：**
- [#197083](https://github.com/openclaw/openclaw/issues/197083) 11.11.3 升级后 Doctor WAL 校验失败，更新部分完成且不可回滚。
- [#197531](https://github.com/openclaw/openclaw/issues/197531) macOS TTS 音频截断 — **已有 fix PR #198525**。

## 6. 功能请求与路线图信号

- **CJK/中文搜索**是明确信号：#170997（memory FTS bigram 分词）、已关闭的 #140736（sessions_search CJK 失效）连续出现，中文用户基数明显，很可能进入近期版本。
- **Cron/自动化弹性**：PR #197394（按 agent 上限动态调整并发槽）+ #197395（provider 限流退避）成对推进，与 Issue #192009（跨 provider 回退授权）共同指向“自动化可靠性”主题。
- **权限与角色**：#197739 让 owner 可自定义 OpenClaw ID 角色权限，属安全敏感的架构演进。
- **MCP Events 订阅**（#166586）、Telegram sendDice（#137110）、禁用托管插件目录 feed（#164620）等待产品决策。
- **Active Memory 升级决策插件化**（#151178）与 **出站消息不可绕过策略**（#56349，安全向）为长线讨论。

## 7. 用户反馈摘要

- **部署可靠性是最大痛点**：Windows（#170956）、托管更新（#193094、#197083）用户反复表达“更新/重启需多次尝试才成功”的挫败感。
- **长时间大会话稳定性差**：多个 issue（#191847、#182369、#197374）来自重度用户——多 cron 任务、Discord/Telegram 长会话、大量历史记录，出现 OOM、消息丢失、压缩质量静默下降。
- **中文/非英语体验割裂**：Dream Diary 语言、CJK 搜索均不可用，工作区出现中英混杂。
- **满意点**：修复响应较快（多个 issue 有部分修复落地并在正文中更新状态）；roboclaw 机器人驱动的 UI PR 流程规范、证明充分；社区报告质量高（含复现步骤、结构化日志）。

## 8. 待处理积压

以下高价值 Issue 长期标注 `needs-maintainer-review` 或 `needs-product-decision`，且无 fix PR：

- #170956（P0 Windows 可靠性，10/13 起 32 评论）
- #119720（P1 事件循环阻塞，8/5 起，跨三个月仍部分修复）
- #155119（P1 子代理消息丢失）
- #56349（安全：出站策略不可绕过，3 月提出，需安全审查）
- #124306（exec 审批卡不提示挂载点风险，数据丢失影响）
- #113159（usage-limit 冷却不读真实重置时间）
- #166964、#172969、#163139（均 stale，影响 session/auth/插件重载）

PR 侧建议优先审查已就绪项：#198520（P1）、#196951、#198466、#198512、#198481。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告
**数据日期：2026-11-14 | 样本：OpenClaw、Hermes Agent**

## 1. 生态全景

个人 AI 助手/自主智能体赛道已从“功能扩张期”整体进入“**架构收敛 + 可靠性加固期**"：两个头部项目均出现网关/统一进程架构重构，并面临随之而来的回归阵痛。**安全纵深**成为系统性工程（Hermes 安全马拉松、OpenClaw 安全边界 PR），而非零散响应。**多平台消息集成（Telegram/Slack/WhatsApp）+ 长时自动化（cron）**是标配能力，其稳定性构成核心竞争壁垒。同时，**非英语（尤其中文/CJK）用户基数增长**正在倒逼搜索、TTS、本地化能力升级。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（新开+活跃/关闭） | 327（211/116） | 500（196/304） |
| PR 更新（待合并/合并关闭） | 500（286/214） | 500（358/142） |
| 新版本发布 | 无 | v0.23.1 canary |
| 版本节奏 | 稳定版+回滚风险（#197083） | canary 快速通道，紧跟 main |
| 核心当前主线 | 内存优化、平台可靠性修复 | 统一网关收尾、安全加固、Desktop 重设计 |
| 短板 | P0/P1 高严重级 Bug 积压（Windows、内存泄漏、SQLite worker） | Windows 兼容、凭据脱敏、网关单点故障无自愈 |
| 健康度 | 🟡 开发吞吐高，稳定性债务重 | 🟢→🟡 清理节奏健康，安全/安装痛点待解 |

注：Hermes Issue 关闭量(304) > 新开活跃量(196)，清理积极；OpenClaw 待合并 PR(286)多于合并关闭(214)，审查带宽是瓶颈。

## 3. OpenClaw 在生态中的定位

- **优势**：社区报告质量高（结构化日志、复现步骤）、机器人驱动 PR 流程规范、修复响应快（部分修复持续在 issue 正文更新状态）；面向**托管/自托管服务化部署**（Windows 服务、多 Gateway 配对、provider 回退）明显比 Hermes 更偏生产运维场景。
- **技术路线差异**：OpenClaw 采用 **Gateway + worker 多实例架构**（多 Gateway 同主机、SQLite worker、内存受限 ARM64 优化），追求部署弹性；Hermes 刚完成向 **单一统一网关进程**的收敛（#106742），入口简化但引入单点脆弱性（#107156、#144413 一条坏记录即卡死）。两者恰好走在相反方向，值得跟踪验证孰优孰劣。
- **社区规模**：Issue/PR 活动量同量级（均触达 500 条/日上限），OpenClaw 讨论更聚焦部署可靠性，Hermes 更聚焦插件生态与凭据安全。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent |
|---|---|---|
| **网关进程架构与可靠性** | Gateway 内存泄漏 #182369、事件循环阻塞 #119720、cgroup 恢复 #198513 | 统一网关 post-merge 追踪 #143547（66 评论）、会话卡死无自愈 #127284 |
| **凭据/安全边界** | 出站策略不可绕过 #56349、ID 角色权限 #197739、认证令牌缺失 #141413 | 安全马拉松 5+ PR：OAuth token 掩码、reasoning 脱敏、审批写保护 |
| **Windows/平台安装升级可靠性** | Windows 托管服务 P0 #170956、更新挂起 #193094 | Windows ACL 破坏 #138974、启动卡死 #127284 |
| **消息平台集成质量** | Telegram 回调丢失 #126950、Slack thread mute #142037 | Telegram TOOLCALL 泄漏 #155337、密码显示 #72298 |
| **cron/自动化弹性** | 并发槽 + 退避 + 跨 provider 回退 | hermes-watchdog 自愈 cron 插件 #149270 |
| **CJK/本地化** | FTS bigram #170997、Dream Diary 语言 #79223 | （信号较弱，属 OpenClaw 差异化机会） |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 部署运维（托管更新、多实例、恢复）、模板系统、Control UI | 插件目录（memorybank、rom-studio）、Desktop UI 重设计、MoA |
| 目标用户 | 自托管/重度运维用户、ARM64/低配主机、多 provider 自动化用户 | 桌面端个人用户、安全敏感用户（Bitwarden 集成）、插件开发者 |
| 架构 | 多 Gateway 分散式，正在做内存瘦身 | 单网关收敛式，正在做 post-merge 加固 |
| 安全策略 | 角色权限可配置化（架构演进） | 审批门/守卫体系化（SECURITY.md 框架 + 马拉松冲刺） |

## 6. 社区热度与成熟度分层

- **快速迭代期**：Hermes Agent —— canary 通道日更、Desktop 大改 PR（#152168）、插件目录快速扩张，处于产品形态探索阶段。
- **质量巩固期**：OpenClaw —— 无版本发布、当日 PR 几乎全为修复与打磨（内存、模板、UI、CI），但高严重级 Bug 积压（3 个 P0 无 fix PR）表明**巩固尚未完成**。
- 共性风险：两个项目的维护者审查带宽均告紧张（OpenClaw 286 待合并 PR；Hermes 多个 P2 issue 数月无 fix PR）。

## 7. 值得关注的趋势信号

1. **“网关”成为个人智能体的事实架构中枢**——但单点 vs 多点的权衡尚无定论；无论哪种，**无自愈的状态标记/卡死**是最大工程教训（#127284、#144413、#181120），自愈与 TTL 机制应作为一等设计。
2. **安全从“检测启发式”走向“存储/传输边界脱敏”**：reasoning 字段、环境快照、消息平台全链路脱敏将成为用户信任的基本盘。
3. **升级路径是新战场**：“升级即坏”（Windows ACL、WAL 校验不可回滚）造成的流失风险高于功能缺失；原子更新+回滚是刚需。
4. **长会话/重度自动化暴露真实瓶颈**：内存增长、SQLite worker OOM、消息丢失——面向 7×24 场景的资源治理（内存预算、压缩质量监控）值得提前投入。
5. **CJK 本地化是被低估的增量市场**：OpenClaw 的中文用户信号密集，率先做好 bigram 分词与本地化一致性可获得差异化用户群。
6. **安全马拉松/集中冲刺模式有效**：Hermes 一日产出 5+ hardening PR 并清掉多个陈年安全 issue，值得社区运营借鉴。

---
*注：本报告基于单日快照与两个项目的样本，PR/Issue 计数受平台 500 条上限截断，趋势判断建议结合多日数据验证。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-14

## 1. 今日速览

Hermes Agent 今日保持**高度活跃**：过去 24 小时内 Issue 更新 500 条（新开/活跃 196，关闭 304），PR 更新 500 条（待合并 358，已合并/关闭 142），关闭量超过新开量，显示维护团队清理与响应节奏健康。项目发布 1 个新版本 canary **v0.23.1**，主线正处于“统一网关（unified gateway）架构落地后的稳定收尾期”。当日最显著的动态是 **11-13 安全马拉松（sec-marathon-2026-11-13）**产出的密集安全加固 PR 簇，以及 Desktop 重设计工作区的持续推进。整体健康度：**活跃度高、修复合并速度快、但安全与 Windows 兼容性仍是持续痛点**。

---

## 2. 版本发布

### v0.23.1+canary.20261113T064447Z（2026-11-13）
- **类型**：canary 预发布通道版本，提供 macOS Apple Silicon DMG 等多平台桌面构建。
- **定位**：紧跟统一网关（#106742）合入后的快速跟进版本，主要承接 #134889/#143547 中追踪的 post-merge 修复。
- **注意**：canary 通道不建议生产环境使用；Issue #143547 明确列出 main 分支上统一网关仍有未收尾问题，升级前建议关注该追踪帖。
- 链接：https://github.com/NousResearch/hermes-agent/releases

---

## 3. 项目进展

今日合并/关闭的代表性 PR：

- **#155337**（teknium1）：修复原始 `<TOOLCALL>` 标记泄漏到聊天与 Telegram 回复预览的问题，整合并挽救了悬置 4 个月的 #61262 —— [链接](https://github.com/NousResearch/hermes-agent/pull/155337)
- **#155202**：修复删除 reply-mode 配置项后旧值残留一个加载周期的网关配置桥接缺陷 —— [链接](https://github.com/NousResearch/hermes-agent/pull/155202)
- **#155327**：为 rom-studio 插件的校验和固定的编译器下载建立 catalog 自更新白名单机制，完善插件生态安全模型 —— [链接](https://github.com/NousResearch/hermes-agent/pull/155327)
- **#148233**：平台级 `allow_silence` 配置落地（Slack/WhatsApp 共享聊天静默控制）—— [链接](https://github.com/NousResearch/hermes-agent/pull/148233)
- **#154963**：`/moa`（Mixture of Agents）在 Desktop/TUI/`chat -q` 中恢复工作 —— [链接](https://github.com/NousResearch/hermes-agent/pull/154963)

**安全马拉松簇（11-13，多为 open 待评审但推进迅速）**：
- #155249 Skills 安装信任从适配器派生而非标识符：[链接](https://github.com/NousResearch/hermes-agent/pull/155249)
- #155288 助手 reasoning 字段在存储边界脱敏：[链接](https://github.com/NousResearch/hermes-agent/pull/155288)
- #155225 掩码裸 Google OAuth refresh token：[链接](https://github.com/NousResearch/hermes-agent/pull/155225)
- #155293 单段 HOME（/root）路径折叠 + shell-rc 写入纳入审批门：[链接](https://github.com/NousResearch/hermes-agent/pull/155293)
- #155251 profile 配置文件纳入审批写保护：[链接](https://github.com/NousResearch/hermes-agent/pull/155251)

**评估**：今日进展集中在**安全纵深加固与统一网关收尾**两大主线，142 条 PR 合并/关闭表明吞吐强劲，项目正从“功能扩张”转向“架构收敛 + 加固”阶段。

---

## 4. 社区热点

| 主题 | 热度 | 链接 |
|---|---|---|
| **#143547 统一网关 post-merge 问题追踪**（66 评论，持续最热） | 用户密集汇报 CLI/TUI/Desktop/cron/Telegram 全入口迁移到单一网关进程后的会话、profile 回归 | [链接](https://github.com/NousResearch/hermes-agent/issues/143547) |
| **#129455 测试套件在默认安装下大面积失败**（28 评论） | PM 激活链路在导入时探测 manifest，触发 home_io_guard，反映 CI 与真实安装路径的偏差 | [链接](https://github.com/NousResearch/hermes-agent/issues/129455) |
| **#62336 终端环境快照把含凭据的环境变量写入磁盘**（19 评论） | 与 Bitwarden Secrets Manager 集成场景直接冲突，安全敏感用户核心诉求 | [链接](https://github.com/NousResearch/hermes-agent/issues/62336) |
| **#127284 source-completion-pending 无 TTL 无自愈（P1）**（18 评论） | Windows 用户被杀进程后每次启动卡死 | [链接](https://github.com/NousResearch/hermes-agent/issues/127284) |
| **#72298 Telegram 聊天中显示密码**（👍 8） | 已关闭但用户痛点典型：密钥管理 + 消息平台的脱敏边界 | [链接](https://github.com/NousResearch/hermes-agent/issues/72298) |
| **#55287 Desktop 聊天宽度可配置**（👍 4） | 长期开放的功能请求，社区呼声明确 | [链接](https://github.com/NousResearch/hermes-agent/issues/55287) |

**诉求分析**：讨论热度集中在三处——① 统一网关大迁移的回归阵痛；② 凭据/密钥在整个生命周期（环境变量、reasoning 存储、消息平台）中的脱敏边界；③ Windows/macOS 平台安装与升级路径可靠性。

---

## 5. Bug 与稳定性（按严重程度）

**P1**
- **#127284** `source-completion-pending` 无 TTL/自愈，进程被杀后每次启动重入卡死（Windows，awaiting-reporter）— 暂无 fix PR。[链接](https://github.com/NousResearch/hermes-agent/issues/127284)

**P2**
- **#154786** 网关平台会话不解析 `model_aliases`，原始别名直发 provider 导致 HTTP 400（昨日新报）— 无 fix PR。[链接](https://github.com/NousResearch/hermes-agent/issues/154786)
- **#148898** Codex 后端对部分 zstd 压缩 /responses 体返回 400，被分类为不可重试（上游引起，👍 3）— 无 fix PR。[链接](https://github.com/NousResearch/hermes-agent/issues/148898)
- **#144413** 工具结果含孤立代理字符时网关 settlement 崩溃（UnicodeEncodeError），会话永久 paused — 无 fix PR。[链接](https://github.com/NousResearch/hermes-agent/issues/144413)
- **#107156** 会话 cwd 记录指向已删除目录导致终端永久 exit 126，需重启进程 — 无 fix PR。[链接](https://github.com/NousResearch/hermes-agent/issues/107156)
- **#137010** 多路复用网关下插件 hook 按消息 profile 派发，但重置检查只在根 scope 运行 — 无 fix PR。[链接](https://github.com/NousResearch/hermes-agent/issues/137010)
- **#154701**（已关闭）Linux/AMD 下流式输出到最小化窗口驱动 GPU 100% 锯齿波 — 回归已确认修复路径。[链接](https://github.com/NousResearch/hermes-agent/issues/154701)

**P3 / 安全**
- #62336 终端快照泄漏凭据环境变量（open，19 评论）[链接](https://github.com/NousResearch/hermes-agent/issues/62336)
- #81828（已关闭）Steer-Marker 可被模型自伪造的提示注入风险 [链接](https://github.com/NousResearch/hermes-agent/issues/81828)
- #84551（已关闭）`timeout`/`bash -c` 包装绕过危险命令检测 [链接](https://github.com/NousResearch/hermes-agent/issues/84551)

**观察**：已关闭议题多为安全类（安全马拉松成效显现）；**仍开放的 P1/P2 多为网关会话状态与安装升级路径问题，且多数尚无对应 fix PR**，是当前稳定性短板。

---

## 6. 功能请求与路线图信号

- **Desktop 重设计**：PR #152168（重设计 agent workspace，含经典回退开关）已 open，配合 #55287 聊天宽度请求，预示下个稳定版 **Desktop UI 大改**是主线。[PR 链接](https://github.com/NousResearch/hermes-agent/pull/152168)
- **插件生态扩张**：plugin-catalog 新增 memorybank 记忆提供方（#154864）、rom-studio 游戏制作（#153798）、hermes-watchdog 自愈 cron（#149270）—— 社区插件目录正成为项目差异化能力。
- **平台消息能力**：#148233（allow_silence）已合并方向明确；#46947（自定义邮件主题）长期 open 未排期。[链接](https://github.com/NousResearch/hermes-agent/issues/46947)
- **安全边界文档化**：SECURITY.md §3.2 框架下的一批 hardening PR 表明团队正系统性地将“审批门/守卫是启发式而非边界”的立场落地，未来版本安全文档与默认策略将持续收紧。

---

## 7. 用户反馈摘要

**满意点**
- 修复合并速度快：`/moa` 修复、TOOLCALL 泄漏 salvage 等长悬问题被核心维护者亲自收尾（#155337、#154963）。
- 插件目录 + Desktop 集成体验获得社区贡献者积极投稿。

**痛点**
- **升级即坏**：Windows 上 ACL 继承破坏导致 Desktop 无法启动（#138974）、macOS LaunchAgent 显示为不透明 osascript（#123118）——用户反复表达“git 安装升级路径脆弱”。
- **密钥安全感不足**：Bitwarden 集成场景下凭据出现在快照文件（#62336）、Telegram 明文（#72298），安全敏感用户信任受损。
- **网关单点化副作用**：统一网关后，一条坏 cwd 记录、一个编码错误即可让整个会话卡死且无自愈（#107156、#144413）。
- **过度防护**：lifecycle guard 误伤无关的 LaunchAgent 维护命令（#124700），高级用户感到被束缚。

---

## 8. 待处理积压

| Issue | 状态 | 提醒 |
|---|---|---|
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 统一网关追踪（66 评论） | OPEN P2 | 最活跃主线，建议持续置顶跟进 |
| [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) 凭据落盘（7 月至今） | OPEN P3 needs-decision | 安全敏感，逾期 4 个月，建议与 #155288 一并处置 |
| [#127284](https://github.com/NousResearch/hermes-agent/issues/127284) P1 无自愈标记 | OPEN awaiting-reporter | P1 却等 reporter，建议主动复现 |
| [#46947](https://github.com/NousResearch/hermes-agent/issues/46947) 邮件主题硬编码 | OPEN P2（6 月至今） | 影响邮件 cron 报告可用性 |
| [#68911](https://github.com/NousResearch/hermes-agent/issues/68911) E.164 号码强制脱敏 | OPEN P2（7 月至今） | 缺 trusted-profile opt-in 设计决策 |
| [#107156](https://github.com/NousResearch/hermes-agent/issues/107156) 坏 cwd 卡死终端 | OPEN P2（9 月至今） | 无 fix PR，网关可靠性关键项 |
| [#89732](https://github.com/NousResearch/hermes-agent/issues/89732) Linux/AMD iGPU 持续 50-69% 占用 | OPEN P2（8 月至今） | 与已关闭的 #154701 同源，可顺带修复 |
| PR #61262 / #61390 | 悬置 4 个月后被 #155337 salvage | 建议关闭原 PR 避免重复 |

---

**健康度总结**：🔴 P1 安装自愈缺陷待修 | 🟡 安全积压与 Windows 兼容 | 🟢 合并吞吐、社区参与、版本节奏均强劲。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*