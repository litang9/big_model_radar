# OpenClaw 生态日报 2026-10-05

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-04 23:06 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 · 2026-10-05

## 1. 今日速览

OpenClaw 今日保持极高活跃度：24 小时内 Issues 更新 500 条（新开/活跃 349，关闭 151），PR 更新 500 条（待合并 300，已合并/关闭 200），无新版本发布。从讨论热点看，当前社区关注度集中在**升级/自更新链路（package-swap、doctor --fix）、claude-cli 运行时稳定性、memory 子系统资源泄漏**三大领域。核心维护者 @steipete 与机器人 @roboclaw-bot 持续高产输出，多个 XL 级重构与修复 PR 进入 "ready for maintainer look" 状态，整体开发节奏健康，但 P0 级发布阻塞 Bug 数量偏多，值得警惕。

## 2. 版本发布

过去 24 小时无新 Release 发布。（注：Issue 中已出现 2026.9.8 版本相关反馈，如 #164396、#164422，疑似该版本刚发布不久即暴露升级路径问题，下一版本修复压力大。）

## 3. 项目进展

今日无合并记录展示于 Top PR（多为 10-03/10-04 新开），但以下 PR 推进显著：

- **#165184 fix: resume tasks after deferred startup recovery**（roboclaw-bot）— 修复 Gateway 重启后任务停滞问题，涉及恢复义务自动重试。[链接](https://github.com/openclaw/openclaw/pull/165184)
- **#165174 fix(sessions): settle sessions left running after restart**（steipete）— 重启后遗留 `running` 状态会话的收口，产出自派生会话与归档会话的 `interrupted` 结算。[链接](https://github.com/openclaw/openclaw/pull/165174)
- **#164796 fix(agents): restore saved history for fresh Claude CLI sessions**（etzelm，XL）— 基于 #156600 的 account-fingerprint 方案，恢复 Claude CLI 原生登录新会话的历史，兼容性与安全边界均标红，需重点评审。[链接](https://github.com/openclaw/openclaw/pull/164796)
- **#164501 feat: add versioned upgrade recipes**（XL）— 带认证的离线升级方案，可恢复中断更新而不替换原 owner，直接回应近期一连串升级路径故障。[链接](https://github.com/openclaw/openclaw/pull/164501)
- **#165180 / #164592**（amir-jakoby）— 新增 `gateway.stopTimeoutMs` 与 `cron.maxConcurrentRuns` 运维配置，补齐操作员可配置项。[链接](https://github.com/openclaw/openclaw/pull/165180)
- **#165021 fix(a2a): fail closed on unresolved peer token references**（P1，安全相关）— A2A token 环境变量缺失时 fail closed，避免降级风险。[链接](https://github.com/openclaw/openclaw/pull/165021)
- **#165018 fix(irc): bound pending inbound line length** — 修复 IRC 无限行导致的内存无界增长。[链接](https://github.com/openclaw/openclaw/pull/165018)
- steipete 今日集中产出**incognito actor 组合化系列重构**（#165134、#165151）与**测试稳定性系列**（#165157、#165172、#165178，消除 macos-swift CI 墙钟轮询超时），均为长线健康度投资。

整体判断：今日在**重启恢复、升级可靠性、运维可配置性**三条线上均有实质推进，约 200 条 PR 关闭/合并显示合流速度快，但 300 条待合并也表明评审队列压力较大。

## 4. 社区热点

- **#42475 Per-agent cost budget enforcement at the gateway level**（24 评论，P2）— 运营者希望在网关层强制每 agent 日/月成本上限，防止失控消费。诉求源于自托管多 agent 部署的商用化场景，长期活跃但卡在 product-decision。[链接](https://github.com/openclaw/openclaw/issues/42475)
- **#97616 hook/tool 僵尸进程泄漏**（17 评论，P1）— 生产环境观察到的进程累积问题，涉及 crash-loop 影响。[链接](https://github.com/openclaw/openclaw/issues/97616)
- **#150635 dreaming deep phase 永不晋升**（17 评论，P2）— memory 子系统短期记忆 512 条上限下夜间晋升逻辑失效，属行为级核心 bug。[链接](https://github.com/openclaw/openclaw/issues/150635)
- **#114612 memory SQLite 表无保留策略、磁盘无限增长**（16 评论，P1）— 生产实例实测，`memory_index_chunks` 与 `memory_embedding_cache` 无淘汰机制。[链接](https://github.com/openclaw/openclaw/issues/114612)
- **#94228 Anthropic thinking 签名导致长工具会话永久砖化**（15 评论，已关闭但相关 #145309 仍开放）— 已修复关闭，是本日少见的正面信号。[链接](https://github.com/openclaw/openclaw/issues/94228)
- **#161976 WhatsApp 回复在重启后 registry 交接失败**（14 评论，P1，needs-security-review）[链接](https://github.com/openclaw/openclaw/issues/161976)

## 5. Bug 与稳定性（按严重度）

### P0（发布阻塞级）
| Issue | 摘要 | Fix PR |
|---|---|---|
| [#164396](https://github.com/openclaw/openclaw/issues/164396) | 2026.9.8 Windows 11 + Node 22 LTS 全新安装后无法连接本地网关 | ❌ 暂无 |
| [#164422](https://github.com/openclaw/openclaw/issues/164422) | macOS 更新自毒化 launcher group（wheel），阻断自身回滚并卡死所有后续更新（已关闭，可能已处理） | 待确认 |
| [#143752](https://github.com/openclaw/openclaw/issues/143752) | 包激活中断可滞留 canonical CLI，需 package-only replay | ❌ |
| [#157415](https://github.com/openclaw/openclaw/issues/157415) | doctor --fix 拒绝外部安装插件的迁移（回归） | ❌ |
| [#158390](https://github.com/openclaw/openclaw/issues/158390) | plugin-captures 临时目录不回收，磁盘无限增长 | ❌ |
| [#143334](https://github.com/openclaw/openclaw/issues/143334) | 子代理完成投递丢失导致请求者饿死、用户消息排队 | ❌ |

### P1
- [#161379](https://github.com/openclaw/openclaw/issues/161379) 网关钉死一个 CPU 核：模型目录刷新循环（回归）❌
- [#144291](https://github.com/openclaw/openclaw/issues/144291) config 热重载中断所有 in-flight agent turn ❌
- [#154572](https://github.com/openclaw/openclaw/issues/154572) `sessions_spawn` 到 claude-cli 子代理必失败 ❌
- [#162119](https://github.com/openclaw/openclaw/issues/162119) Codex 模型切换后间歇 403 owner-verification ❌
- [#157126](https://github.com/openclaw/openclaw/issues/157126) MCP 桥继承首次启动的请求 scope，重启恢复后提权（安全）❌
- [#163029](https://github.com/openclaw/openclaw/issues/163029) 外部插件 mid-turn 重载致 40-70s 主线程停顿，#160658 修复未根治 ❌
- [#143278](https://github.com/openclaw/openclaw/issues/143278) Heartbeat 内部输出泄漏到 Telegram 用户聊天 ❌
- [#145309](https://github.com/openclaw/openclaw/issues/145309) claude-cli 忽略 `CLAUDE_CONFIG_DIR`，有 linked PR ✅（与 #164796 关联）
- [#143581](https://github.com/openclaw/openclaw/issues/143581) Signal 入站消息卡 spool 重试 ~23h，回复延迟至重启 ❌

**趋势判断**：P0 集中在**升级/安装链路**，P1 集中在**claude-cli 运行时与多 agent 会话状态机**。两个方向均有对应大 PR（#164501 升级 recipes、#164796 Claude CLI 历史）在路上。

## 6. 功能请求与路线图信号

- **#42475 每 agent 成本预算**（24 评论）— 运营刚需，已有 `session-cost-usage.ts` 基础，属网关层小改造，纳入下版本可能性中高，等 product-decision。
- **#95724 memory 按源目录而非按 agent 建索引** — 多 agent 共享 workspace 场景消除重复向量库，与 memory 子系统当前修复潮（#114612、#150635）形成合力，可能作为 memory 重构一部分推进。[链接](https://github.com/openclaw/openclaw/issues/95724)
- **#156632 Swarm agents.run 有界启动契约**（已有实现 PR #155442 linked）— 实施已就绪，只差决策。[链接](https://github.com/openclaw/openclaw/issues/156632)
- **#59149 per-agent 可见性/A2A 作用域** — 长期需求，#164972（claude-cli 多 agent teams 矩阵失败）的爆发会倒逼排期。[链接](https://github.com/openclaw/openclaw/issues/59149)
- PR 侧信号：**#165153**（对话面板扩展 + 本地预览）、**#165180/#164592**（网关停止预算/cron 并发配置）已到可评审状态，大概率进入下一版本。

## 7. 用户反馈摘要

**痛点**：
- **升级即翻车**是当前最强负面情绪来源：#164422（macOS 更新自锁）、#157415（doctor 迁移拒绝）、#164188（package-swap 报错不指明对象）显示更新路径在多平台均有摩擦，且报错信息对排障不友好。
- **消息投递可靠性**反复被提及：WhatsApp (#161976)、Signal (#143581)、iMessage 重复投递 (#143632)、Slack NO_REPLY 空回复 (#141556)——IM 渠道用户对"回复延迟/丢失"容忍度极低。
- **资源泄漏类**（僵尸进程 #97616、磁盘增长 #114612/#158390、CPU 钉死 #161379）多来自长期运行的自托管 7x24 用户，这类用户正在做生产级部署，是项目走向成熟的关键人群。

**满意点**：
- 修复响应速度获得认可（#94228 关闭，#160658 快速跟进后用户持续回访验证）。
- 多渠道覆盖（WhatsApp/Signal/iMessage/Feishu/IRC 等数十渠道）持续吸引新场景用户。
- "失败但看起来成功"（#164972、#91532）这种隐蔽 bug 被用户细致复现并给出矩阵报告，说明社区存在高水平的深度参与者。

## 8. 待处理积压

以下高影响 Issue 长期（>3 周）处于 needs-maintainer-review / needs-product-decision，且标 `no-new-fix-pr`：

1. [#42475](https://github.com/openclaw/openclaw/issues/42475) 成本预算（6 个月未决，24 评论）— 建议优先给 product decision。
2. [#84037](https://github.com/openclaw/openclaw/issues/84037) Codex app-server 稳态 CPU 开销（5 个月，P1）。
3. [#97616](https://github.com/openclaw/openclaw/issues/97616) 僵尸进程泄漏（3 个月，P1，needs-info）。
4. [#114612](https://github.com/openclaw/openclaw/issues/114612) memory SQLite 无限增长（2.5 个月，P1）— 与 #158390、#150635 同属资源治理主题，建议打包为一个专项。
5. [#138775](https://github.com/openclaw/openclaw/issues/138775) memory 搜索活锁（1 个月）。
6. PR 积压：#138204（Telegram GLM 工具调用 XML 泄漏，1 个月，needs proof）、#147886（Feishu markdown.tables 配置被拒，3 周，ready for review）、#142888（OpenAI 兼容流式文本翻倍，waiting on author）。

**健康度小结**：Issue 关闭率 30%（151/500）、PR 处理率高，吞吐正常；但 P0 积压 6 项且集中在升级链路，建议在下一版本前集中清理，配合 #164501（versioned upgrade recipes）落地可望系统性收口此类问题。

---

## 横向生态对比

# 开源个人 AI 助手生态横向对比分析报告

**数据日期：2026-10-05 | 对比对象：OpenClaw、Hermes Agent**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已从“单机 demo”全面进入**生产化深水区**：两个头部项目日均 Issue/PR 更新均达数百条，且讨论焦点高度收敛于升级可靠性、多渠道消息投递、资源治理三大工程化命题。**7x24 自托管部署成为核心用户场景**，由此暴露的内存/磁盘泄漏、僵尸进程、状态机残留等长期运行问题，正在倒逼项目从“功能竞赛”转向“质量巩固”。同时，多 agent 协作（A2A、跨网关 Bot、Swarm）与成本治理（per-agent 预算）成为下一阶段路线图的共同方向。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 349，关闭 151） | 356（新开/活跃 302，关闭 54） |
| Issue 关闭率 | **30%** | 15% |
| PR 更新（24h） | 500（待合并 300，合并/关闭 200） | 500（待合并 377，合并/关闭 123） |
| Release | 无（2026.9.8 刚发布即暴露升级问题） | 无 |
| P0 积压 | **6 项**（集中在升级链路） | 1 项（scratch 静默删除） |
| 核心维护者输出 | @steipete + @roboclaw-bot 高产，XL 级重构推进 | @teknium1 密集提交，Issue→PR 闭环 <24h |
| 健康度评估 | 吞吐高但 P0 偏多，发布前需清理；评审队列压力大 | 修复响应快，但渲染 bug 多路径复发 + PR 积压 377 是瓶颈 |

**总评**：OpenClaw 规模与吞吐更大但债务集中在发布阻塞级；Hermes 处于“高吞吐消化债务”阶段，节奏更均匀。

---

## 3. OpenClaw 在生态中的定位

**优势**：
- **社区规模与深度双领先**：Issue 互动量约为 Hermes 的 1.4 倍，且存在高水平深度参与者（如 #164972 多 agent 矩阵失败报告），具备自我诊断能力。
- **多渠道覆盖最广**：WhatsApp/Signal/iMessage/Feishu/IRC 等数十渠道，是差异化护城河，持续吸引新场景用户。
- **工程化深度**：incognito actor 组合化、测试稳定性、带认证的离线升级 recipes（#164501）等 XL 级长线投资在同体量项目中少见。

**技术路线差异**：
- OpenClaw 以**网关中心架构**（gateway 级成本预算、A2A token、cron 并发控制）面向自托管商用化多 agent 部署；
- Hermes 以“桌面为壳”路线演进（远程计算/本地界面、原生移动端+语音），更偏个人终端体验。

**短板**：升级链路 P0 密集（#164396/#164422/#143752/#157415），2026.9.8 发布即翻车，“升级即翻车”是最强负面情绪来源，需 #164501 落地系统性收口。

---

## 4. 共同关注的技术方向

| 技术方向 | OpenClaw | Hermes Agent | 诉求共性 |
|---|---|---|---|
| **升级/更新可靠性** | #164422 macOS 更新自锁、#164501 versioned upgrade recipes | #125437 半更新无恢复（15 个 Discord 线程）、#132345/#132354 更新 hand-off 锁 | 两项目最强痛点，均为原子性+可回滚诉求 |
| **多 agent 协作** | #42475 网关级成本预算、#156632 Swarm 启动契约、#165021 A2A fail-closed | #97681 跨网关 Bot 协作（跨机器→跨所有者两阶段） | 从单 agent 走向协作生态的安全与治理 |
| **资源治理/长期运行稳定性** | #97616 僵尸进程、#114612 SQLite 无限增长、#158390 临时目录泄漏、#161379 CPU 钉死 | #132401 scratch 静默删除、#132966 进程清理 | 7x24 生产部署的泄漏与生命周期管理 |
| **远程/本地架构分离** | — | #18715 远程 agent+本地工具（👍38）、#38519 仅装前端 | 计算/界面解耦是共同演进方向 |
| **本地化/国际化 UX** | 中文等多语言渠道支持 | #49422 中文社区键位自定义 | 中文用户群在两个项目中均活跃 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道 IM 接入 + 多 agent 网关编排（A2A、Swarm、subagent） | 桌面端体验 + Bot 生态 + 远程执行架构 |
| 目标用户 | 自托管商用化运营者（多 agent 部署、成本管控刚需） | 个人开发者/极客用户（桌面 UX、键位、移动端诉求） |
| 技术架构 | Gateway 中心、claude-cli/Codex 多运行时、Node 生态 | Python 3.14 托管运行时迁移、venv/uv 依赖管理、桌面前端 |
| 突出风险 | 升级链路 P0 + 安全类 P1（MCP 提权 #157126、token fail-open） | 会话渲染状态机 + 运行时依赖遮蔽（py3.11 venv） |
| 安全关注度 | 高（needs-security-review、A2A fail-closed、incognito actor） | 中（#47708 copilot 凭据派生问题积压） |

---

## 6. 社区热度与成熟度

**第一梯队（规模领先，质量巩固期）— OpenClaw**：Issue 关闭率 30%、PR 合流快，但 P0 积压 6 项且 6 个月未决的产品决策（#42475）显示规模化后的决策瓶颈。整体处于“功能广度已成、可靠性收口”阶段。

**第二梯队（快速迭代期）— Hermes Agent**：Issue→PR 闭环 <24h、修复针对性强获社区认可，但关闭率仅 15%、PR 积压 377，且桌面渲染 bug 多路径复发（#127665 等 4 条 fold），说明核心状态机尚在塑形，属高速成长中的架构磨合期。

两者共同信号：**高价值长期 Issue（needs-decision 类）积压均超月级**，决策吞吐正取代编码吞吐成为新瓶颈。

---

## 7. 值得关注的趋势信号

1. **升级链路是个人 AI 助手的“阿喀琉斯之踵”**：两项目当日最高频负面反馈均指向升级/安装，原子更新、可回滚、版本化 recipes（OpenClaw #164501、Hermes hand-off 锁系列）将成为基础设施标配。**开发者启示**：agent 系统的自更新设计应从一开始引入版本化迁移与故障恢复契约。

2. **从单 agent 到协作生态的治理先行**：成本预算（#42475）、A2A fail-closed、跨所有者协作（#97681）表明多 agent 时代的安全与成本治理需求先于功能落地爆发。**对做 agent 平台的开发者，网关级计量与作用域隔离是先发机会。**

3. **7x24 长期运行暴露“资源生命周期”设计缺失**：进程泄漏、存储无界增长、静默删除数据在两个项目同时涌现——“memory/存储保留策略”应作为一等公民设计而非事后补丁。

4. **计算/界面分离架构成共识方向**：“桌面为壳、远端为脑”+ 移动端/语音入口，预示个人助手将走向多端 thin client + 云端/自托管 brain 的形态。

5. **中文用户群成为不可忽视的反馈力量**：两个项目均有高频中文社区反馈（渠道适配、UX 本地化），国际化支持质量正直接影响采用曲线。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-10-05）

## 1. 今日速览

Hermes Agent 今日保持高活跃度：过去 24 小时 Issues 更新 356 条（新开/活跃 302、关闭 54），PR 更新 500 条（待合并 377、已合并/关闭 123），无新版本发布。讨论焦点集中在**桌面端会话重复渲染**（sweeper:risk-session-state 系列多个关联 issue）、**安装/更新链路的兼容性故障**以及 **cron 外部 worker 在托管 3.14 运行时上的运行失败**。社区贡献活跃，多个修复 PR 已针对热点 bug 提交，整体处于“高吞吐消化债务”阶段。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日 123 个 PR 被合并/关闭，重点方向包括：

- **桌面端更新可靠性**（@teknium1 密集提交）：
  - [#132345](https://github.com/NousResearch/hermes-agent/pull/132345) 修复更新门控等待存活 updater，交接脚本需持有 marker
  - [#132354](https://github.com/NousResearch/hermes-agent/pull/132354) 更新 hand-off 脚本将 marker 作为真实锁，正确上报已提交更新
  - [#132912](https://github.com/NousResearch/hermes-agent/pull/132912) macOS 更新 smoke 测试接受实际附着后端
  这一组合直指 [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) 反映的“半更新安装无恢复路径”痛点。
- **cron 可观测性与正确性**：[#132835](https://github.com/NousResearch/hermes-agent/pull/132835) 修正 dead-owner sweep 写入真实原因；[#132839](https://github.com/NousResearch/hermes-agent/pull/132839) 持久化 incident reopen_count。
- **scratch 静默删除审计**：[#132455](https://github.com/NousResearch/hermes-agent/pull/132455) 为 #132401 补齐 per-entry 删除审计（不改变策略，只消除静默）。
- **网关运行控制**：[#128545](https://github.com/NousResearch/hermes-agent/pull/128545) stop 信号穿透 approval-recovery；[#126664](https://github.com/NousResearch/hermes-agent/pull/126664) 取消/准入期间保留 run 所有权。
- **进程清理**：[#132966](https://github.com/NousResearch/hermes-agent/pull/132966) Windows 超时 kill 降级时清扫快照子进程。
- **工程基础设施**：[#132646](https://github.com/NousResearch/hermes-agent/pull/132646) 引入 per-unit CC/size 棘轮与 `scripts/check`，长期看将约束代码质量只升不降。

整体判断：更新链路与会话状态两大风险域今日推进显著。

---

## 4. 社区热点

1. **[#127665](https://github.com/NousResearch/hermes-agent/issues/127665)**（47 评论）— 桌面端回复重复渲染的第二条 fold：在 #127282 修复已加载的构建上仍复现，说明该症状存在多条代码路径，社区深度排查中。
2. **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)**（38 评论，👍4）— Bot 跨网关协作愿景：个人 agent 在不交出控制权前提下跨机器/跨所有者协同，是长期路线图级讨论。
3. **[#122222](https://github.com/NousResearch/hermes-agent/issues/122222)**（33 评论，已关闭）— cron 外部 worker 在自管安装上依赖导入失败、所有计划任务开跑即死，P1。
4. **[#132401](https://github.com/NousResearch/hermes-agent/issues/132401)**（17 评论）— P0：scratch 24h 空闲静默删除摧毁多天工作，无日志无隔离。已有修复 PR [#132455](https://github.com/NousResearch/hermes-agent/pull/132455)（先补可观测性）。
5. **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)**（👍38）— 远程 agent + 本地工具执行，长期高需求功能，持续活跃。
6. **[#49422](https://github.com/NousResearch/hermes-agent/issues/49422)** — 中文社区请求自定义 Enter/Ctrl+Enter 发送键位，反映桌面端 UX 本地化诉求。

---

## 5. Bug 与稳定性

| 级别 | 问题 | 状态 |
|---|---|---|
| **P0** | [#132401](https://github.com/NousResearch/hermes-agent/issues/132401) scratch prune 静默销毁 TMPDIR 指向的多天工作 | 有 PR #132455（仅审计，非保留策略） |
| **P1** | [#127831](https://github.com/NousResearch/hermes-agent/issues/127831) cron worker 在托管 3.14 运行时缺依赖 + site-packages 自重置 | 相关 PR #132839/#115550 部分覆盖 |
| **P1** | [#122425](https://github.com/NousResearch/hermes-agent/issues/122425) 托管环境 workspace 副本更新漂移、缺元数据、pm doctor 崩溃 | 待修复 |
| **P2** | [#127665](https://github.com/NousResearch/hermes-agent/issues/127665) / [#127288](https://github.com/NousResearch/hermes-agent/issues/127288) / [#128468](https://github.com/NousResearch/hermes-agent/issues/128468) / [#127642](https://github.com/NousResearch/hermes-agent/issues/127642) — 桌面端回复重复渲染（同一症状多条 fold） | 修复持续推进，未完全收敛 |
| **P2** | [#132640](https://github.com/NousResearch/hermes-agent/issues/132640) 持久化的 gateway_runtime.base_url 熬过配置修正与重启，流量打到死端口 | 待修复 |
| **P2** | [#127387](https://github.com/NousResearch/hermes-agent/issues/127387) 遗留 py3.11 venv 遮蔽 rpds，MCP outputSchema 工具全挂 | 待修复 |
| **P2** | [#126085](https://github.com/NousResearch/hermes-agent/issues/126085) 配置 pip 镜像后 `hermes update` 因 uv.lock 失败 | 待修复 |
| **P2** | [#121954](https://github.com/NousResearch/hermes-agent/issues/121954) Linux 桌面端启动即 SIGTRAP/SIGSEGV 崩溃 | needs-repro |
| **P2** | [#58226](https://github.com/NousResearch/hermes-agent/issues/58226) Anthropic OAuth 用量 ≤1% 被错误 ×100 显示为 100% 已用 | 待修复 |
| **P2** | [#131739](https://github.com/NousResearch/hermes-agent/issues/131739) 工具错误输出中的裸文件名被链接化并替换为第三方页面标题 | 待修复 |

稳定性风险集中在：**安装/更新兼容性**（多条 P1/P2）、**会话状态与流式渲染**、**托管 Python 3.14 运行时迁移**。

---

## 6. 功能请求与路线图信号

- **跨网关 Bot 协作**（[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)）：定位为跨机器→跨所有者两阶段，属官方方向性规划。
- **远程 agent + 本地工具执行**（[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)）与**桌面端仅装前端**（[#38519](https://github.com/NousResearch/hermes-agent/issues/38519)）：同一“远程计算/本地界面”诉求的两面，合计 👍54+，结合 [#94343](https://github.com/NousResearch/hermes-agent/pull/94343)（自然语言批量建 Bot）等 PR，指向“桌面为壳、远端为脑”的架构演进，有望进入下阶段版本。
- **tps 生成速度显示**（PR [#129449](https://github.com/NousResearch/hermes-agent/pull/129449)）：小而美，opt-in 已实现，接近可合并。
- **Cloudflare Web Search 插件**（PR [#132851](https://github.com/NousResearch/hermes-agent/pull/132851)）：插件目录生态扩展。
- **键位自定义**（[#49422](https://github.com/NousResearch/hermes-agent/issues/49422)）、**原生移动端 + 语音通话**（[#11911](https://github.com/NousResearch/hermes-agent/issues/11911)）：需求明确但暂无对应 PR。

---

## 7. 用户反馈摘要

**痛点（高频出现）：**
- 更新失败后留下一半安装、报原始错误、只能手敲修复命令（本周 15 个 Discord 线程，见 [#125437](https://github.com/NousResearch/hermes-agent/issues/125437)）。
- 长会话中桌面端消息重复渲染 + 流式滚动跳动（#127288/#127665/#128468/#127642，中英文用户均有反馈）。
- 自管/git 安装用户在托管运行时迁移期频繁踩依赖遮蔽、cron worker 失效等坑（#127387/#127831/#126085）。
- 数据安全感不足：scratch 静默删除（#132401）让多天 agent 工作无告警消失。

**满意点：**
- 社区对维护者 triage 响应速度和修复 PR 的针对性评价积极（如 #132401 的“先修可观测性”分阶段方案获认可）。
- Cron、网关、桌面更新链路的修复节奏快，多个 PR 在 issue 开出 24 小时内跟进。

---

## 8. 待处理积压

- [#18715](https://github.com/NousResearch/hermes-agent/issues/18715)（5 月开，needs-decision，👍38）— 远程 agent 本地工具执行，长期最高需求之一，建议尽快给出架构决策。
- [#11911](https://github.com/NousResearch/hermes-agent/issues/11911)（4 月开）— 原生移动端 + 语音通话，无官方回应。
- [#102811](https://github.com/NousResearch/hermes-agent/issues/102811) — Skills prompt 过度加载 skill 的 RFC，needs-decision，影响 token 成本与行为。
- [#47708](https://github.com/NousResearch/hermes-agent/issues/47708)（6 月开）— GITHUB_TOKEN 自动派生 copilot 凭据形成永久失败 fallback，涉及安全边界。
- [#121954](https://github.com/NousResearch/hermes-agent/issues/121954) — Linux 崩溃仍卡在 needs-repro，桌面不可用级别，建议优先。
- 大 PR 积压：待合并 377 个（如 [#75946](https://github.com/NousResearch/hermes-agent/pull/75946) Nix 多实例、[#131009](https://github.com/NousResearch/hermes-agent/pull/131009) 多平台合并上下文修复），审阅吞吐是当前瓶颈。

---

**健康度小结**：社区参与度和修复响应速度优秀（Issue→PR 闭环快），但 session-state 渲染类 bug 多路径复发、安装/更新链路故障密集、PR 积压偏高，是当前三大健康度风险。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*