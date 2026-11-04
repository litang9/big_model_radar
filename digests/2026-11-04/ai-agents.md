# OpenClaw 生态日报 2026-11-04

> Issues: 408 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-04 00:35 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-11-04

---

## 1. 今日速览

OpenClaw 今日保持**高活跃度**：过去 24 小时 Issues 更新 408 条（新开/活跃 235，关闭 173），PR 更新 500 条（待合并 347，已合并/关闭 153），Issue 关闭率约 42%，PR 吞吐率约 31%，处理节奏健康。项目刚发布 **v2026.10.10** 版本（累计 4,825 commits、3,028 PRs、454 位贡献者），社区贡献规模持续扩大。今日动态集中在三条主线：**GitHub 仓库集成插件化重构**（两个 XL 级 PR）、**稳定性修复**（crash-loop / session-state 类问题占热点 Issue 主导）、以及大量 UI/文案改进类 PR（roboclaw-bot 密集提交）。总体健康度良好，但仍有多个 P0 级 Issue 长期挂起需关注。

---

## 2. 版本发布

### v2026.10.10 · openclaw 2026.10.10
- **链接**：https://github.com/openclaw/openclaw/releases
- **规模**：4,825 commits · 3,028 pull requests · 454 contributors
- **内容**：Release notes 与 changelog 同内容双格式发布，详见官方文档（docs.openclaw.ai）
- **迁移注意**：暂无明确破坏性变更说明；建议升级前留意下文稳定性问题中涉及 `doctor --fix`、Gateway 更新流程的已知问题

---

## 3. 项目进展

今日 PR 活动以基础设施插件化与可靠性修复为主：

- **GitHub 仓库集成插件化**（本日最重要架构进展）：
  - [#192349](https://github.com/openclaw/openclaw/pull/192349) `feat(plugins): extend host APIs for repository integrations`（XL，security-review-required）——为 Plugin SDK 补齐仓库选择、checkout、执行、发布、Control UI 集成所需宿主能力
  - [#192350](https://github.com/openclaw/openclaw/pull/192350) `refactor(github): migrate repository integration to a plugin`（XL，依赖上一 PR）——将 vendor 实现迁入 bundled `github-repositories` 插件
- **更新/发布流水线可靠性**：
  - [#192392](https://github.com/openclaw/openclaw/pull/192392) 拒绝不可桥接的更新兼容性清单，提前暴露 macOS 构建失败
  - [#192408](https://github.com/openclaw/openclaw/pull/192408) 修复 CI release worker 磁盘耗尽
  - [#192389](https://github.com/openclaw/openclaw/pull/192389) shallow clone 下 release-note 校验失败给出可操作提示
- **通道与运行时修复**：
  - [#191114](https://github.com/openclaw/openclaw/pull/191114)（P1）修复 Telegram webhook 带查询串/尾斜杠时入站更新全部丢弃
  - [#191118](https://github.com/openclaw/openclaw/pull/191118) Matrix DM/房间 allowlist 展开 `accessGroup:` 条目
  - [#192401](https://github.com/openclaw/openclaw/pull/192401) 修复 Code Mode 下 Gateway 路由 MCP 调用结果丢失
  - [#192376](https://github.com/openclaw/openclaw/pull/192376)（P1）修复插件创建的 automations 无推理账户记录
- **UI/UX 批量改进**：[#192374](https://github.com/openclaw/openclaw/pull/192374)（强制 toast severity）、[#192418](https://github.com/openclaw/openclaw/pull/192418)（配额摘要按账户匹配）、[#192359](https://github.com/openclaw/openclaw/pull/192359)（@mention 优先当前会话发言者）等

**整体评估**：今日 347 个待合并 PR 中包含多个 ready-for-maintainer-look 的小型修复，推进速度平稳；GitHub 集成插件化若落地将是本周期最大的架构性进展。

---

## 4. 社区热点

| Issue | 评论 | 状态 | 核心诉求 |
|---|---|---|---|
| [#159356](https://github.com/openclaw/openclaw/issues/159356) llama.cpp manager 假就绪 / 嵌入 HTTP 500 | 30 | 已关闭 | 内存压力下子进程退出但管理器仍报 ready，用户自扩容 4→8GB 缓解，要求根因修复 |
| [#178359](https://github.com/openclaw/openclaw/issues/178359) `doctor --fix --non-interactive` 空转 15+ 分钟 | 24 | OPEN · P1 | 修复工具本身不可用，macOS 用户无法完成 DB 修复；关联今日 PR [#192406](https://github.com/openclaw/openclaw/pull/192406) |
| [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 checkpoint 失败致 agent 永久不可用 | 22 | OPEN · **P0** | ux-release-blocker，主分支未复现但影响真实部署 |
| [#67419](https://github.com/openclaw/openclaw/issues/67419) Bootstrap 文件每轮重注入浪费 20-30% tokens | 15 | 已关闭（stale） | 长期成本痛点，标签含 needs-product-decision |
| [#151962](https://github.com/openclaw/openclaw/issues/151962) “幽灵用户消息”：运行时内部字符串被当作用户 prompt | 14 | OPEN | 长会话（13 天/310k tokens）中出现用户从未发送的消息，信任与安全疑虑 |

**背后诉求**：社区最强烈的两大声音是 **token 成本效率**（context 膨胀、prompt cache 失效）与 **崩溃后可恢复性**（session-state 类问题反复出现）。

---

## 5. Bug 与稳定性（按严重程度）

**P0 / Release Blocker（无 fix PR）**
- [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 agent 永久 UNAVAILABLE（session-state / message-loss）
- [#169844](https://github.com/openclaw/openclaw/issues/169844) Windows Control UI 网关更新卡在 "Activating"，计划任务被禁用（crash-loop）
- [#146791](https://github.com/openclaw/openclaw/issues/146791) iOS App Store 版无法发布 APNs relay 注册，推送链路断裂

**P1（部分有进展）**
- [#178359](https://github.com/openclaw/openclaw/issues/178359) doctor --fix 挂起 → 今日有相关 PR [#192406](https://github.com/openclaw/openclaw/pull/192406)（备份超时修复）
- [#144336](https://github.com/openclaw/openclaw/issues/144336) SIGUSR1 延迟重启关闭阶段失败（crash-loop）
- [#167557](https://github.com/openclaw/openclaw/issues/167557) 插件数据迁移永不收敛（npm/Linux）
- [#158421](https://github.com/openclaw/openclaw/issues/158421) 默认模型 @profile 被当作显式 pin，阻断跨提供商回退（需安全评审）
- [#191944](https://github.com/openclaw/openclaw/issues/191944)（11-03 新报）macOS 上 `gateway stop` 全部失败——**今日新问题**

**P2 值得关注**
- [#182891](https://github.com/openclaw/openclaw/issues/182891) prompt cache 每次请求 `read dropped N -> 0`，直接推高 API 成本
- [#154104](https://github.com/openclaw/openclaw/issues/154104) 空闲 Gateway（4 个 Matrix E2EE 账号）50% CPU + 52MB/min 磁盘写入回归
- [#136311](https://github.com/openclaw/openclaw/issues/136311) memory-core 索引不可重建，19GB 孤儿临时库

---

## 6. 功能请求与路线图信号

| 需求 | 状态 | 纳入下版可能性 |
|---|---|---|
| Databricks Unity Gateway 官方 provider（[#155633](https://github.com/openclaw/openclaw/issues/155633)） | 已关闭，实现 PR #155634 开放中 | **高** |
| Linux aarch64 companion 构建 deb+AppImage（[#138279](https://github.com/openclaw/openclaw/issues/138279)） | 已关闭（stale），需求持续 | 中 |
| Review 面板 Markdown 渲染预览（[#128090](https://github.com/openclaw/openclaw/issues/128090)，👍4） | OPEN，纯 UI，工程量小 | **高** |
| Swarm 有界启动契约（[#156632](https://github.com/openclaw/openclaw/issues/156632)） | 已关闭，PR #155442 推进中 | 高 |
| 可配置 session.abortTriggers（[#164870](https://github.com/openclaw/openclaw/issues/164870)） | 已关闭待产品决策 | 中 |
| 惰性 skill-catalog 发现降低启动上下文（[#145308](https://github.com/openclaw/openclaw/issues/145308)） | 已关闭 | 中 |

**路线图信号**：GitHub 集成插件化双 PR 表明官方正系统性推进“插件 SDK 宿主能力扩展”，未来更多 vendor 集成（Codex 已在 #192350 标签中出现）可能走同一模式。

---

## 7. 用户反馈摘要

- **成本焦虑普遍**：bootstrap 文件重复注入（#67419）、prompt cache 失效（#182891, #161208）让重度用户直接感受到账单上涨（有用户报告 heartbeat 每次多花 $0.40–0.95）。
- **自托管/自修复用户受挫**：doctor、gateway stop、更新流程（#178359, #191944, #169844）多处“修复工具本身坏了”，影响运维信心。
- **长会话可靠性**：13 天 WeChat 桥接会话（#151962）、多代理车队（#134918）等重度场景暴露边界问题，说明真实用户在将其作为长期常驻助手使用。
- **正面信号**：Issue 模板规范、clawsweeper 自动分类标签体系运转良好；外部贡献者（如 #192411 by @steipete）持续参与核心 sandbox 修复。

---

## 8. 待处理积压（建议维护者关注）

1. **[#67419](https://github.com/openclaw/openclaw/issues/67419)** 上下文膨胀 —— 4 月份提出，最高成本相关痛点，已 stale 关闭但未真正解决
2. **[#52732](https://github.com/openclaw/openclaw/issues/52732)** per-agent compaction 覆盖 —— 3 月提出，多代理用户核心配置需求
3. **[#146791](https://github.com/openclaw/openclaw/issues/146791)** iOS APNs 注册失败（P0）—— 9 月中旬至今无修复
4. **[#166634](https://github.com/openclaw/openclaw/issues/166634)** 崩溃恢复 P0 —— 需 live repro，建议优先投入复现环境
5. **[#136311](https://github.com/openclaw/openclaw/issues/136311)** memory-core 索引锁死 + 19GB 垃圾 —— 9 月初至今
6. **[#162585](https://github.com/openclaw/openclaw/issues/162585)** Windows 插件 source-capture 无限膨胀（290MB→612MB+）—— Windows 生态用户阻断级
7. **[#158966](https://github.com/openclaw/openclaw/issues/158966)**（已关闭）CDP 凭据 WebSocket URL 暴露给模型 —— 安全类，虽关闭建议确认修复完整性

---

*数据来源：GitHub API 快照（2026-11-04）· 本报告由开源项目分析自动生成*

---

## 横向生态对比

# 个人 AI 助手/智能体开源生态横向对比报告
**数据窗口：2026-11-04 · 对比对象：OpenClaw、Hermes Agent**

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道已进入“常驻化”深水区：用户不再满足于单次对话，而是将 agent 作为 7×24 小时运行的长期助手（OpenClaw 出现 13 天/310k tokens 的会话、Hermes 出现数千会话的重度用户）。两大头部项目均处于**大规模架构重构期**——OpenClaw 推进 GitHub 集成插件化，Hermes 收敛统一网关（#106742）合并后的回归，说明行业正从单体走向“插件 SDK + 统一网关”的平台化架构。与此同时，**token 成本、空闲资源占用、崩溃可恢复性**成为生态级共性痛点。移动端（iOS/Android 原生应用）与多租户团队网关是下一阶段的明确竞争高地。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 408（新开/活跃 235，关闭 173） | 380（新开/活跃 350，关闭 30） |
| Issue 关闭率 | **~42%** ✅ | ~8% ⚠️ |
| PR 更新（24h） | 500（待合并 347，合并/关闭 153） | 500（待合并 380，合并/关闭 120） |
| 单日合并 PR | ~153（吞吐率 31%） | ~120 |
| 最新 Release | v2026.10.10（10 月 10 日） | v0.22.7（11 月 3 日，打包 ~174 PR） |
| 贡献者规模 | 454 contributors / 4,825 commits | 未披露（104k+ stars） |
| P0 问题 | 3 个长期挂起（含 iOS APNs） | 无明确 P0，但统一网关回归面广（#143547，47 评论） |
| 健康度评估 | **稳健迭代 + 积压隐患**：吞吐健康、外部贡献活跃，但 P0 修复滞后 | **快速迭代 + 回归收敛期**：合并速度快，但关闭率低反映大重构后债务集中 |

**小结**：OpenClaw 呈“维护节奏成熟”特征；Hermes 呈“激进演进”特征——新开 Issue 350 vs 关闭 30 的剪刀差是 v0.23.0 收敛压力的直接体现。

---

## 3. OpenClaw 在生态中的定位

**优势**
- **插件化架构领先**：#192349/#192350 双 XL 级 PR 系统性补齐 Plugin SDK 宿主能力（仓库选择、checkout、发布、Control UI 集成），并将 vendor 实现（Codex 已在标签中出现）迁入 bundled 插件——这是本周期两个项目中最清晰的平台化路线图信号。
- **治理体系成熟**：Issue 模板规范、clawsweeper 自动分类、security-review-required 门禁流程运转良好，454 位贡献者的社区贡献规模可观。
- **渠道覆盖广**：Telegram、Matrix、WeChat 桥接等多通道运行时已实战检验（虽暴露边界问题）。

**技术路线差异**
- OpenClaw 重心在**宿主能力扩展与插件生态**，修复方向偏“运维自修复”（doctor、gateway、更新流水线）；
- Hermes 重心在**统一网关 + Desktop/移动端产品体验**（Simplified Agent Mode、Team Gateway/Nous Portal、Android beta），偏“消费级产品化”路线。

**社区规模**：Hermes 以 104k+ stars 显著领先于 OpenClaw（未披露，量级更低），但 OpenClaw 的 42% Issue 关闭率与 454 贡献者显示其工程社区更“深”而非更“广”。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **Token 成本 / 上下文膨胀** | #67419（bootstrap 重复注入浪费 20-30%）、#182891（prompt cache 失效）、#39691 类似 | #39691（工具输出压缩，👍17）、#124836（background-review 回放 token 爆炸） | 重度用户直接感受到账单上涨（heartbeat 单次多花 $0.40–0.95） |
| **网关/常驻进程稳定性与崩溃恢复** | #166634（P0 崩溃后永久 UNAVAILABLE）、#169844、#144336 crash-loop | #143547（统一网关回归追踪，47 评论）、#146676 类 | 常驻 agent 的 session-state 可恢复性是信任基石 |
| **空闲资源占用** | #154104（空闲 Gateway 50% CPU + 52MB/min 磁盘写入） | #127647（Desktop 空闲 CPU/GPU/内存三类燃烧，36 评论） | “常驻个人助手”场景下资源纪律成为核心指标 |
| **消息平台桥接可靠性** | Telegram webhook（#191114）、Matrix allowlist（#191118） | Slack SDK 上游破坏（#110374）、WhatsApp Windows（#68128）、Discord 准入（#143720） | 桥接层脆弱性普遍，上游依赖管理是共性风险 |
| **移动端** | #146791（iOS APNs 断裂，P0） | #11911（移动端 + 语音，👍15）、Android beta 已上线 | 移动端是双项目共同的高呼声方向 |
| **多代理/团队协作** | Swarm 有界启动契约（#156632） | Team Gateway/Nous Portal 整合、跨网关 Bot 协作（#97681） | 从单 agent 走向车队/团队多租户 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| **功能侧重** | 插件 SDK / 仓库集成 / 多通道桥接 / 自修复运维工具链 | Desktop UX / 统一网关 / Skills 生命周期 / 团队多租户 |
| **目标用户** | 开发者与自托管重度用户（macOS/Linux/Windows 全平台运维场景） | 消费级 + 团队用户（Desktop 优先，Windows 摩擦仍存，移动端布局早） |
| **技术架构** | Plugin host 扩展 + vendor bundled 插件（github-repositories），Control UI 独立 | 单一 gateway 进程收编所有本地会话 + Nous Portal 云端整合 |
| **商业模式信号** | docs.openclaw.ai 文档站、无强云绑定 | Microsoft Store / Docker / Hermes Cloud / Firebase 分发，云-端一体化更明显 |
| **短板** | P0 积压（iOS 推送断裂近 2 月）、修复工具自身故障（doctor、gateway stop） | 大重构回归面广（关闭率 8%）、空闲资源占用、安全裁决滞后（#59293 挂 4 个月） |

---

## 6. 社区热度与成熟度分层

- **快速迭代期**：Hermes Agent —— 单日 350 新 Issue、v0.22.7 一口气打包 174 PR、插件目录投稿自增长（今日 3 个），处于功能扩张与回归收敛并行阶段；v0.23.0 是关键收敛节点。
- **质量巩固期**：OpenClaw —— 关闭率 42%、贡献者体系稳定、架构演进（插件化）方向明确但节奏克制；主要风险在 P0 响应（#166634、#146791、#136311 均超 1.5 个月未解）。
- **共同成熟度信号**：两个项目的用户均能提交含复现步骤与机制归因的高质量 bug 报告，说明用户群已从尝鲜者转向专业重度用户——这是产品进入深水区的标志。

---

## 7. 值得关注的趋势信号

1. **“常驻化”重新定义可靠性标准**：13 天会话、数千会话、4 个 E2EE 账号等场景表明，agent 的崩溃恢复、session-state 一致性、空闲资源纪律正取代“单轮任务完成率”成为核心质量指标。开发者应优先设计 checkpoint 与可重建状态。
2. **Token 成本是第一商业约束**：prompt cache 失效、上下文重复注入、回放爆炸在两个项目均属最高热度痛点。上下文压缩、惰性加载（OpenClaw #145308 skill-catalog 惰性发现）、per-agent compaction 将成为标配能力。
3. **插件化是平台化的必经之路**：OpenClaw 的 Plugin SDK 宿主能力扩展 + Hermes 的 Skills 三方合并，殊途同归——vendor 集成不应留在核心代码里。对 agent 框架开发者的启示：尽早定义稳定的宿主 API 契约。
4. **消息桥接 = 脆弱边界层**：Slack SDK 破坏性变更、Telegram webhook 细节、Windows job object 问题表明桥接层是回归高发区，上游依赖锁定与适配层抽象值得投入。
5. **移动端与多租户是下一战场**：Hermes 的 Android beta 名额爆满 + iOS 呼声（#11911）与 OpenClaw 的 iOS APNs P0 形成对照——移动入口的推送链路可靠性直接决定增长曲线；Team Gateway/跨网关协作（#97681）预示“分布式个人 agent 生态”方向。
6. **安全债需要主动清偿**：Hermes #59293（CLI 绕过写保护，4 个月未裁决）与 OpenClaw #158966（凭据暴露，关闭但修复完整性存疑）提示：agent 拥有终端访问权限后，提权面审计应纳入例行流程而非事后响应。

---

*结论：生态整体健康、方向趋同（插件化 + 常驻化 + 移动化），竞争焦点正从功能数量转向运行时可靠性与 token 经济性。OpenClaw 宜尽快清偿 P0 积压以守住运维信任；Hermes 的关键任务是在 v0.23.0 将 8% 的关闭率拉回健康区间。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 · 2026-11-04

## 1. 今日速览

Hermes Agent 今日保持高活跃度：过去 24 小时 Issues 更新 380 条（新开/活跃 350、关闭 30），PR 更新 500 条（待合并 380、已合并/关闭 120），单日合并约 120 个 PR，吞吐量处于健康水平。昨日发布补丁版本 **v0.22.7**，将 v0.22.6 以来约 174 个 PR 汇总为稳定版。社区关注焦点集中在统一网关（#106742）合并后的遗留问题、Desktop 性能（空闲资源占用、会话读取性能）以及消息平台桥接（Slack/WhatsApp/Discord）的稳定性。整体看，项目处于“大重构后收敛 + 快速迭代”阶段，Issue 关闭率（30/380）偏低，反映统一网关落地带来的回归面较广。

## 2. 版本发布

**v0.22.7（2026-11-03）** — [Release](https://github.com/NousResearch/hermes-agent/releases)
- 定位：补丁版本，将 v0.22.6 以来 **~174 个已合并 PR** 打包为稳定发布，覆盖 GitHub Release（CLI 与安装器）、Microsoft Store 应用、Docker 及 Hermes Cloud 全渠道。
- 无破坏性变更说明；完整策划的更新日志将随 **v0.23.0** 发布。
- 迁移提示：从 v0.21.x 及更早版本升级的用户建议直接到 v0.22.7，注意 #135217 揭示的版本日期戳显示错误仍可能存在（仅显示问题，不影响功能）。

## 3. 项目进展

今日合并/关闭的代表性 PR（含近两日活跃）：

- **#95194**（已关闭）fix(desktop)：本地新会话遵循 per-profile 记住的 cwd，修复 #81492 —— Desktop 本地工作目录持久化的长期问题落地。[链接](https://github.com/NousResearch/hermes-agent/pull/95194)
- **#148673**（已关闭）`groups.lead` / `groups.handoff`：房间 lead 从客户端本地存储升级为房间级事实，bot 可感知 lead 身份、避免每轮全名单扇出 —— Group Chat 协作模型的重要一步。[链接](https://github.com/NousResearch/hermes-agent/pull/148673)
- **#148153 / #148247**（进行中）Desktop “简化 Agent 模式”侧栏 + 嵌套聊天 + Agent 设置总览，Desktop UX 重构主线持续推进。[148153](https://github.com/NousResearch/hermes-agent/pull/148153) / [148247](https://github.com/NousResearch/hermes-agent/pull/148247)
- **#148676** Skills 三路合并：用户编辑过的内置 skill 不再被冻结，`hermes update` 可与上游三方合并并支持人工冲突审查，直击 #135035 痛点。[链接](https://github.com/NousResearch/hermes-agent/pull/148676)
- **#148532** Docker 镜像升级不再用镜像自带 extras 填充数据卷，修复低磁盘托管 agent 升级后死亡的问题。[链接](https://github.com/NousResearch/hermes-agent/pull/148532)
- **#148677**（核心维护者 @teknium1）symlink 的 skills external_dirs 翻代后无需重启即可跟随 —— 修复安装器翻代后运行中 gateway 读旧代的问题。[链接](https://github.com/NousResearch/hermes-agent/pull/148677)
- **#148684 / #148685** Desktop Messaging 页与 Dashboard Channels 页在 Team Gateway 接管消息时指向 Nous Portal —— 多租户/团队网关架构整合信号。[148684](https://github.com/NousResearch/hermes-agent/pull/148684) / [148685](https://github.com/NousResearch/hermes-agent/pull/148685)
- **#148678 / #148679** Windows 凭据链修复：便携 Git 直接配 GCM 替代 helper picker；插件更新探测使用非交互 git 环境。Windows 体验持续打磨。

插件生态同样活跃：#148687（shortrizz）、#148680（smolmachines 0.1.1）、#148170（github-issues-sync，GitHub Issues ↔ Hermes Kanban 同步）。

## 4. 社区热点

- **#143547**（47 评论，持续升温）[统一网关合并后问题追踪](https://github.com/NousResearch/hermes-agent/issues/143547)：10 月 14 日 #106742 将所有本地会话收编到单一 gateway 进程后的回归大本营，波及 CLI/TUI/Desktop/API/消息 bot/cron/Kanban 全线。这是当前项目最大的稳定性风险源，也是 v0.23.0 的核心收敛目标。
- **#97681**（40 评论，👍4）[跨网关 Bot 协作](https://github.com/NousResearch/hermes-agent/issues/97681)：个人 agent 跨机器、跨所有者协作的地基设计，社区对“分布式个人 agent 生态”的诉求强烈。
- **#127647**（36 评论）[Desktop 空闲资源消耗追踪](https://github.com/NousResearch/hermes-agent/issues/127647)：renderer CPU/GPU、backend serve CPU、内存三类空闲燃烧，已有完整 triage 计划和机制归因。
- **#38519**（26 评论，**👍35 全场最高**）[Desktop 仅装前端连远程 agent](https://github.com/NousResearch/hermes-agent/issues/38519)：Windows 用户强烈要求“薄客户端”安装形态。
- **#110374**（12 评论，👍16）[Slack 状态指示静默失效](https://github.com/NousResearch/hermes-agent/issues/110374)：slack-sdk ≥3.44 破坏性变更导致，上游依赖风险管理问题。
- **#11911**（22 评论，👍15）[iOS/Android 原生应用 + 语音通话](https://github.com/NousResearch/hermes-agent/issues/11911)——移动端是最高呼声功能之一（Android beta 已存在，见 #147269）。

## 5. Bug 与稳定性

**P1 / 高严重度**
- **#68927**（已关闭 ✅）Desktop 长任务后 Enter 提交但 UI 不渲染用户气泡、文本残留输入框 —— 会话状态高风险项，已修复。[链接](https://github.com/NousResearch/hermes-agent/issues/68927)

**P2 / 中高严重度（均无明确 fix PR 关联，待确认）**
- **#146643** [Gateway 每次变更全量重读会话历史](https://github.com/NousResearch/hermes-agent/issues/146643)：数千会话时消耗 1.5-2.5 核 CPU，Desktop `session.resume`/`prompt.submit` 30s 超时 —— 性能类最紧急问题。
- **#143767** Desktop 恢复压缩前已结束的会话导致消息聊天每次切模型被拒 `session_superseded`，消息聊天窗口不可用。[链接](https://github.com/NousResearch/hermes-agent/issues/143767)
- **#143720** Discord 线程 process-completion wake 每 60s 被无限拒 `admission_conflict`（6 小时 494 次），尝试上限失效。[链接](https://github.com/NousResearch/hermes-agent/issues/143720)
- **#59293** 🔒 安全：`hermes config set` 绕过 system-config 写保护，可无门禁关闭审批层 —— agent 拥有终端访问时的提权面，needs-decision 待维护者裁决。[链接](https://github.com/NousResearch/hermes-agent/issues/59293)
- **#138915** Dashboard 批量操作在 gateway 持有 state.db 时恒 409。[链接](https://github.com/NousResearch/hermes-agent/issues/138915)
- **#68128** Windows 无 breakaway job object 下 WhatsApp 桥接 spawn WinError 5。[链接](https://github.com/NousResearch/hermes-agent/issues/68128)
- **#140222** 带 monitor 的 agent 型 cron 每次未变化 tick 仍创建空会话行，污染 state.db。[链接](https://github.com/NousResearch/hermes-agent/issues/140222)

**有 fix PR 在途的 Bug**
- #148681 → Desktop 粘贴 >3000 字符的 chip 打开后编辑器为空
- #148679 → 插件更新探测被交互式 git 环境卡死
- #148532 → Docker 升级后数据卷被镜像 extras 填满导致 agent 死亡
- #146739 → 进程 cwd 被删后 `execute_code` 崩溃
- #146536 → Desktop 连接休眠中的 Cloud agent 连接重置

**上游/运营类**
- **#147269** Android beta 的 Firebase 分发测试者名额已满，新用户无法加入 —— 增长被基础设施卡住。[链接](https://github.com/NousResearch/hermes-agent/issues/147269)

## 6. 功能请求与路线图信号

结合 Issue 热度与已有 PR，可推断路线图方向：

1. **简化 Desktop 体验**（强信号）：#148153 + #148247 已在 PR 阶段，“Simplified agent mode”大概率进 v0.23.0。
2. **Skills 生命周期管理**（强信号）：#148676 三路合并 + #148677 symlink 跟随，skill 更新体系是当前投入重点。
3. **Team Gateway / Nous Portal 整合**（强信号）：#148684/#148685 表明团队多租户消息架构正收敛到 Portal 统一管理。
4. **移动端**：#11911（22 评论）+ Android beta 存在 + #147269 名额满，iOS 与扩容是下一步。
5. **薄客户端安装**（#38519，👍35）：诉求明确但 needs-decision，尚无对应 PR。
6. **跨网关 Bot 协作**（#97681）：review queue 已在推进，属中长期架构项。
7. **上下文压缩升级**（#39691，👍17，headroom-ai 工具输出压缩）：社区高票，未见 PR。

## 7. 用户反馈摘要

**痛点**
- **统一网关重构代价**：#143547 47 条评论表明大量用户在 main 分支上遭遇合并后回归，对稳定性信任有损耗。
- **Desktop 资源占用**是长期抱怨（#127647）：空闲 CPU/GPU/内存燃烧直接影响“常驻个人助手”的核心使用场景。
- **长会话/大会话存储性能**（#146643）：重度用户（数千会话）遭遇超时，说明产品已被用于高强度日常场景。
- **Windows 体验**：#68128、#148678、#122160 等显示 Windows 源码安装/凭据/桥接仍有摩擦。
- **消息平台桥接脆弱**：Slack（上游 SDK）、WhatsApp（Windows job object）、Discord（wake 准入）、Feishu（压缩会话）各有一个未解 P2。

**满意点**
- 插件目录投稿活跃（今日 3 个），生态自增长健康。
- 维护者响应积极：核心成员（@teknium1 等）今日仍在提交修复；#68927、#143268 等 P1/P2 得到关闭。
- 社区愿意写极详尽的 bug 报告（含复现、归因、日志分析），用户粘性和专业度高（104k+ stars）。

## 8. 待处理积压

| Issue/PR | 说明 | 停留状态 |
|---|---|---|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) 跨网关 Bot 协作 | 8 月底提出，needs-decision，评论 40 | 2 个多月 |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) 安全：CLI 绕过写保护 | 7 月初提出的安全问题仍未裁决 | **4 个月，建议优先** |
| [#127647](https://github.com/NousResearch/hermes-agent/issues/127647) Desktop 空闲资源 | 9 月底 tracker，机制归因已清晰但修复未完 | 1 个多月 |
| [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) WhatsApp WinError 5 | 7 月中旬，文档化的 fallback 未实现 | 3 个多月 |
| [#67458](https://github.com/NousResearch/hermes-agent/issues/67458) `-w` 在 one-shot 模式被静默忽略 | 7 月中旬，needs-decision | 3 个多月 |
| [#62548](https://github.com/NousResearch/hermes-agent/issues/62548) ACP 丢失后台完成通知 | 7 月上旬，影响 VS Code 扩展体验 | 近 4 个月 |
| [#124836](https://github.com/NousResearch/hermes-agent/pull/124836) background-review 限制回放 | 大型修复 PR（P2，多风险标签），等待 review | 1 个多月 |

**给维护者的提醒**：#59293（安全）与 #146643（性能）建议纳入近期 triage 优先级；#124836 是缓解后台回放 token 爆炸的关键 PR，尽早 review 可降低自托管用户成本。

---
*数据来源：GitHub API（Issues/PRs/Releases），统计窗口 2026-11-03 至 2026-11-04。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*