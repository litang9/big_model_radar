# OpenClaw 生态日报 2026-11-17

> Issues: 338 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-17 02:54 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-17

## 1. 今日速览

OpenClaw 今日保持**高度活跃**：24小时内 Issues 更新 338 条（新开/活跃 238，关闭 100），PR 更新 500 条（待合并 232，已合并/关闭 268），并发布 2 个版本（v2026.11.4 稳定版 + v2026.11.5-beta.4）。社区贡献节奏密集，今天新开的修复 PR 集中在 Gateway 性能与稳定性（事件循环阻塞、启动扫描、更新器健壮性），其中 @steipete 连发多个针对 Gateway 卡顿的修复。整体看，项目处于快速迭代期，但 P0/P1 级稳定性问题（插件捕获阻塞、内存泄漏、Windows 更新链路）积压较多，值得维护者优先关注。

---

## 2. 版本发布

### v2026.11.4（稳定版）
- 规模：**220 commits · 125 PRs · 90 contributors**，社区参与度极高
- 内容：详细变更见 [Release notes](https://docs.openclaw.ai/releases/2026.11.4)
- 无明确破坏性变更声明，但下方多个 Issue 提示升级路径仍需谨慎（见第 5 节）

### v2026.11.5-beta.4
- **新功能**：Telegram widgets — 交互式组件可作为 Telegram 消息渲染（#196991，感谢 @obviyus）
- **修复**：
  - Transcripts/attachments：在并发数据库准备期间保持 transcript 读取可用，释放已完成的 SQLite reader（直接关联长期挂起的 WAL checkpoint 问题，见 #164294）

---

## 3. 项目进展

今日多个高价值 PR 合并/关闭，主要推进方向：

**Runtime/Agent 核心修复（贡献者 @ruel225 一批长期 PR 落地）：**
- [#148135](https://github.com/openclaw/openclaw/pull/148135)：context-engine recall assembly 线程化 runtime identity，修复 #148033
- [#154268](https://github.com/openclaw/openclaw/pull/154268)：config 写入链对深层嵌套文档栈安全（修复 #153668、#154264）
- [#186239](https://github.com/openclaw/openclaw/pull/186239)：Anthropic OAuth 在预过期窗口内正确轮换凭证（修复 #103846）
- [#151284](https://github.com/openclaw/openclaw/pull/151284)：memory-core recall rehydration 不再锚定到片段碎片（部分修复 #151173）
- [#196495](https://github.com/openclaw/openclaw/pull/196495)：跨 root 更新时拒绝无法重绑 drop-in 服务的更新

**今日新开的 Gateway 性能修复（待合并）：**
- [#200374](https://github.com/openclaw/openclaw/pull/200374)（@steipete）：防止插件 reload recovery 拷贝时阻塞 Gateway 事件循环 —— 直接回应 P0 Issue #160959
- [#200370](https://github.com/openclaw/openclaw/pull/200370)：防止 readiness probe 冻结主线程（关联 11月16日 8GB RSS Gateway 生产事故）
- [#200367](https://github.com/openclaw/openclaw/pull/200367) / [#200369](https://github.com/openclaw/openclaw/pull/200369)（已关闭）：消除多 Agent 启动时二次方级文件系统探测（约 470 agents 场景数百万次同步 fs 调用）

整体判断：项目在**多 Agent 大规模部署性能**和**更新器可靠性**两条线上明显提速，11.5 正式版前以稳定性收敛为主。

---

## 4. 社区热点

| Issue | 评论 | 热点分析 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) Gateway 捕获大型外部插件时阻塞数分钟（P0） | 83 | 2026.9.6 回归，crash-loop 级影响；PR #200374 已在跟进，是今日最热主线 |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) state DB WAL checkpoint 从未完成 | 41 | 长期被进程内 reader 钉住；beta.4 的 SQLite reader 释放修复可能正是响应 |
| [#191944](https://github.com/openclaw/openclaw/issues/191944) macOS `gateway stop` 全部失败 | 34 | macOS 进程 ancestry 检查问题，运维操作受阻，用户诉求强烈 |
| [#44309](https://github.com/openclaw/openclaw/issues/44309) A2A 单向 dispatch 模式 | 19 | 多 Agent 架构方向的功能诉求，等待产品决策 |
| [#197083](https://github.com/openclaw/openclaw/issues/197083) 升级后 Doctor WAL 校验失败留下半完成状态 | 18 | 更新器可靠性系列问题的又一例 |
| [#143017](https://github.com/openclaw/openclaw/issues/143017) Prompt-cache 前缀重写（实测 21.3M cache-write tokens） | 18 | 高质量生产级测量报告，直接影响成本敏感用户 |

---

## 5. Bug 与稳定性（按严重程度）

**P0**
- [#160959](https://github.com/openclaw/openclaw/issues/160959) 大型插件捕获阻塞 Gateway 数分钟（crash-loop）— **fix PR：#200374 进行中** ✅

**P1**
- [#169844](https://github.com/openclaw/openclaw/issues/169844) Windows Control UI Gateway 更新卡死在 "Activating"，Scheduled Task 被禁用 — 暂无专门 fix PR ❌
- [#185578](https://github.com/openclaw/openclaw/issues/185578) Gateway 堆内存只增不减（~25 MiB/h 直至 V8 上限 abort）— 无 fix PR ❌
- [#160762](https://github.com/openclaw/openclaw/issues/160762) claude-cli + Telegram 中途消息丢失 — 无 fix PR ❌
- [#162497](https://github.com/openclaw/openclaw/issues/162497) SQLite worker store 上限 64，多 Agent 网关每轮报 "temporary internal error" — 等产品决策 ❌
- [#194403](https://github.com/openclaw/openclaw/issues/194403) Helper 完成后续丢失执行 authority，会话阻塞 — 需维护者 review ❌
- [#196505](https://github.com/openclaw/openclaw/issues/196505) memory index 大语料（~864 MiB）因 worker 容量直接中止不重试 ❌
- [#65624](https://github.com/openclaw/openclaw/issues/65624) Mattermost slash command 明文 callback URL 暴露 token（CVSS 8.6 High）— 有 linked PR，需安全 review ⚠️

**P2 值得注意**
- [#191944](https://github.com/openclaw/openclaw/issues/191944) macOS gateway stop 失败；[#199617](https://github.com/openclaw/openclaw/issues/199617) Windows 升级 beta.3 验证 Scheduled Task 失败；[#191855](https://github.com/openclaw/openclaw/issues/191855) macOS 26.3 误报 EACCES —— **更新/停止链路在三个平台均有问题**
- [#182616](https://github.com/openclaw/openclaw/issues/182616) 3.4 GiB 状态升级耗时 63 分钟（28 分钟停机）

---

## 6. 功能请求与路线图信号

- **A2A 单向 dispatch**（[#44309](https://github.com/openclaw/openclaw/issues/44309)，已关闭/stale）：多 Agent 协作语义演进信号，需求真实
- **Telegram 交互式 widgets** 已在 beta.4 落地，说明 IM 渠道富交互是当前投入方向
- **Memory/Dreams 插件化**（[#138366](https://github.com/openclaw/openclaw/issues/138366)）：memory slot owner 驱动 Dreams 页，配合 #151284 合并，memory-core 插件化生态在推进中
- **IMAP 可靠投递扩展**（[#179685](https://github.com/openclaw/openclaw/issues/179685)）：邮件触发器的持久化处理诉求
- **Review Markdown 预览**（[#128090](https://github.com/openclaw/openclaw/issues/128090)，👍 4）：小而美的 UX 改进，实现成本低，可能较快纳入
- **Usage footer 暴露 auth profile**（[#169428](https://github.com/openclaw/openclaw/issues/169428)）：可观测性方向

---

## 7. 用户反馈摘要

- **大规模部署用户**痛点集中：470 agents 启动慢（#200369）、64 store 上限（#162497）、23 万事件 Telegram 会话上下文读取 19–25 秒（[#185111](https://github.com/openclaw/openclaw/issues/185111)）——OpenClaw 的重度多 Agent 用户群在快速增长，基础设施未跟上
- **成本敏感**：prompt-cache 前缀失效（#143017）和 transcript 中内联 base64 图片（#143973，1.3% 事件占 80% 存储）被用户用生产数据精确量化，报告质量高
- **运维体验**：升级/停止/回滚链路是差评重灾区（#197083、#199617、#191855、#169844），Windows 用户尤其受影响
- **满意点**：社区响应积极，issue 分级标签体系（clawsweeper、issue-rating）成熟，多位贡献者（@ruel225、@steipete、@RomneyDa）产出高频且高质量

---

## 8. 待处理积压（维护者关注提醒）

| 条目 | 状态 | 建议 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) P0 插件捕获阻塞 | PR #200374 待合并 | 优先合入并回port到 11.4.x |
| [#65624](https://github.com/openclaw/openclaw/issues/65624) Mattermost 安全问题（4月起） | 需安全 review | 安全体跟进，超过 7 个月 |
| [#162497](https://github.com/openclaw/openclaw/issues/162497) 64-store 硬上限 | 需产品决策 | 多 Agent 用户硬阻塞 |
| [#92473](https://github.com/openclaw/openclaw/issues/92473) 模型 fallback 通知泄漏到外部渠道（6月起） | 需产品决策 | 对外形象风险 |
| [#143017](https://github.com/openclaw/openclaw/issues/143017) prompt-cache 前缀重写 | 有 live repro，待修复 | 用户已提供完整生产级复现 |
| [#185578](https://github.com/openclaw/openclaw/issues/185578) 内存只增不减 | 标 not-repro-on-main，待确认 | 建议发布后跟踪验证 |
| [#192201](https://github.com/openclaw/openclaw/issues/192201) MiniMax M3.1 修复已合但数版未发布 | 发布流程问题 | 检查 release 分支同步机制 |

**健康度小结**：贡献 throughput 优秀（单版本 90 贡献者），但 P1 级稳定性积压与更新器可靠性问题若不在 11.5 正式版前收敛，可能开始侵蚀大用户群信任。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-11-17** | 基于 OpenClaw、Hermes Agent 两项目 24 小时社区动态

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**从单 Agent 工具向多 Agent 基础设施平台演进的关键阶段**。两大头部项目均呈现极高的社区活跃度（单日 Issue/PR 活动各超 800 条），且都面临“大规模部署场景下基础设施未跟上用户增长”的共同挑战。**统一网关/多 Profile 架构**成为主流技术选择，但随之而来的稳定性收敛期问题（事件循环阻塞、资源泄漏、更新链路可靠性）是当前生态的主要矛盾。消息平台集成（Telegram/WhatsApp）、沙箱执行、A2A 协作是三条明确的功能演进主线。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 338（新开/活跃 238，关闭 100） | 338（新开/活跃 319，关闭 19） |
| PR 更新（24h） | 500（待合并 232，合并/关闭 268） | 500（待合并 433，合并/关闭 67） |
| **关闭率 / 合并率** | **Issue 关闭率 29.6%，PR 处置比 1.16** ✅ | Issue 关闭率 5.6%，PR 待合并积压 433 ⚠️ |
| Release（24-48h） | 2 个：v2026.11.4 稳定版 + v2026.11.5-beta.4 | 2 个：v0.23.2 稳定版（含 1,989 个 PR）+ canary |
| 单版本规模 | 220 commits / 125 PRs / **90 contributors** | ~1,989 PR 滚动收拢 |
| 分发渠道 | CLI、Docker 等 | CLI/安装器、MS Store、Docker、Cloud、Desktop、Android Beta |
| 核心风险 | P0/P1 稳定性积压、更新器三平台均有故障 | 统一网关合并后回归问题集中、PR 审查积压严重 |
| **健康度评估** | **B+**：吞吐高且闭环能力强，但安全 issue 拖延 7 个月+ | **B**：迭代极快、分发完善，但收敛能力暂时跟不上合并速度 |

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **质量闭环能力突出**：Issue 关闭率 29.6%、PR 处置比大于 1，与 Hermes（关闭率 5.6%）形成鲜明对比，工程治理更成熟
- **贡献者基数大且分层清晰**：单版本 90 contributors，issue-rating/clawsweeper 等自动化分级体系成熟，头部贡献者（@steipete、@ruel225）产出高频高质量
- **性能优化纵深**：已进入 470 agents、23 万事件会话等超大规模场景的量化调优阶段（如消除二次方级 fs 探测），说明存在真实的大型生产部署用户群

**相对劣势：**
- 更新/停止/回滚链路在 **macOS、Windows、Linux 三平台均有故障**（#191944、#169844、#199617），运维可靠性落后于功能迭代
- 安全响应迟缓：Mattermost token 暴露（CVSS 8.6）悬置超 7 个月，fallback 通知外泄 5 个月+
- 分发渠道窄于 Hermes（无 Desktop 商店、无移动端）

**技术路线差异：** OpenClaw 走“插件化 + Gateway 中心化”路线（memory 插件化、Telegram widgets、drop-in 服务），Hermes 走“统一网关一体化 + 多端 Desktop/Mobile”路线。OpenClaw 的成本工程（prompt-cache 前缀优化、用户生产级 token 测量）体现更强的企业/重度用户导向。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw 证据 | Hermes 证据 |
|---|---|---|
| **统一网关/中心化运行时** | Gateway 性能修复成主线（#200374、#200370） | #106742 迁移所有会话入单一网关，回归问题为最大热点（#143547，79 评论） |
| **A2A 多 Agent 协作** | #44309 单向 dispatch 模式（需求真实，待产品决策） | #69560 多节点协调与共享项目记忆（长期路线图） |
| **多 Profile/多租户隔离与安全边界** | 插件捕获隔离、OAuth 凭证轮换（#186239） | 跨 Profile env 泄漏修复（#131550）、RBAC 需求（#3897） |
| **上下文/内存治理** | memory-core rehydration、WAL checkpoint、压缩分段 | 压缩器窗口钳制回归（#99943）、压缩后消息重复（#123985） |
| **消息平台集成质量** | Telegram widgets（已落地 beta.4）、中途消息丢失（#160762） | Telegram getFile 超时回归（#156504）、WhatsApp 格式不一致 |
| **资源泄漏与长时运行稳定性** | 堆内存 25 MiB/h 只增不减（#185578）、SQLite reader 钉住 | mnemosyne fd 泄漏修复（#155749）、Windows 内核池增长（#146538） |
| **沙箱化不可信代码执行** | — | `hermes sandbox run` + sandboxed-prototyping skill（#131588） |

**核心洞察**：两个项目独立演化却收敛到几乎相同的问题域（网关稳定性、多租户隔离、内存/上下文治理、IM 集成），说明这是该品类的**结构性需求**，而非单项目工程缺陷。

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| **功能侧重** | 插件生态、Memory/Dreams 系统、成本工程、大规模多 Agent 性能 | 多端体验（Desktop/macOS/Windows/Android）、Kanban/cron 工作流编排、沙箱执行 |
| **目标用户** | 重度自托管、大规模部署（数百 agents）、成本敏感的生产用户 | 个人用户 + homelab/多设备用户，Desktop/Mobile 优先 |
| **架构** | Gateway + 插件化（drop-in 服务、memory 插件化推进中） | 一体化统一网关（CLI/TUI/Desktop/API/bot/cron/Kanban 单进程） |
| **发布节奏** | 周级稳定版 + beta 快通道（v2026.11.x） | Patch 滚动收拢大变更 + canary 每日构建 |
| **短板** | 运维链路可靠性、安全响应、无移动端 | PR 审查瓶颈（433 积压）、大合并后回归收敛慢、上游依赖阻塞（#131859） |

---

## 6. 社区热度与成熟度

**活跃度分层（均属第一梯队，日动态 800+ 条）：**

- **OpenClaw —— “快速迭代 + 质量巩固并行”阶段**：吞吐高的同时保持正向闭环（100 issue 关闭/日），但 P0/P1 积压和安全债若不在 11.5 正式版前收敛，将开始侵蚀大用户群信任。贡献者生态最成熟。
- **Hermes Agent —— “激进架构合并后的收敛期”**：单版本收拢近 2,000 PR 显示惊人的工程吞吐，但 433 个待合并 PR 和统一网关的持续回归（79 评论的汇总帖）表明其处于**架构转型阵痛期**，距离质量巩固尚有距离。

**成熟度信号对比**：OpenClaw 的问题多为“规模化后的深层性能/内存问题”（用户能提供 21.3M token 级测量报告）；Hermes 的问题多为“合并后的功能性回归”。前者用户群更资深，后者用户基数与终端覆盖更广。

---

## 7. 值得关注的趋势信号

1. **“统一网关”成为品类标配架构，但其稳定性是下一个竞争壁垒**——两个项目都在为核心事件循环阻塞、worker 批量崩溃付出代价。谁能先解决网关长时运行可靠性，谁就能留住重度用户。开发者选型时应重点考察网关的内存曲线与故障恢复设计。

2. **多 Agent 大规模部署需求真实且爆发中**：470 agents 启动、64 store 硬上限、66 Profile 万级 fs 操作/秒——容量工程（capacity engineering）将成为 2027 年该赛道的核心战场。

3. **A2A 协作语义仍在“需求先行、实现缺位”阶段**：两项目相关 issue 均处 `needs-decision`，是标准化机会窗口。

4. **成本可观测性成为差异化能力**：用户已能用生产数据精确量化 cache 失效（21.3M tokens）和存储膨胀（1.3% 事件占 80% 存储）。token 级测量工具将成为企业选型硬指标。

5. **安全债是共同盲区**：凭证暴露（CVSS 8.6，7 个月未决）、跨 Profile 环境变量泄漏、fallback 通知外泄——多租户化提速的同时安全响应未同步，自托管多用户场景需自行评估暴露面。

6. **沙箱执行能力（Hermes `sandbox run`）预示下一阶段方向**：Agent 自主执行不可信代码的安全基础设施，可能成为平台级护城河。

---

*本报告基于 2026-11-17 两项目 24 小时社区动态数据生成；样本为生态头部项目，可代表品类前沿趋势，但不覆盖长尾项目。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报

**日期：2026-11-17** | 数据来源：github.com/NousResearch/hermes-agent

---

## 1. 今日速览

Hermes Agent 今日保持高活跃度：过去 24 小时 Issue 更新 338 条（新开/活跃 319，关闭 19），PR 更新 500 条（待合并 433，已合并/关闭 67），显示项目处于快速迭代周期。昨日连发两个版本——稳定补丁 **v0.23.2** 和 canary 构建，v0.23.2 一次性收拢了自 v0.23.1 以来约 **1,989 个已合并 PR**，合并吞吐量极为可观。社区讨论焦点集中在 **统一网关（unified gateway）架构落地后的稳定性**，多个 P1/P2 级 Bug 围绕网关、会话状态与多 Profile 场景展开。总体判断：项目健康度高、迭代速度极快，但大型架构合并后的稳定性收敛期仍在进行中。

---

## 2. 版本发布

### v0.23.2（稳定版，2026-11-16）
- **性质**：Patch 补丁版本，将 v0.23.1 以来约 1,989 个合并 PR 滚动打包为稳定发布。
- **分发渠道**：GitHub Release（CLI 与安装器）、Microsoft Store 应用、Docker、Hermes Cloud。
- **注意事项**：完整精选发布说明将随 **v0.24** 一并发布；当前窗口内变更量巨大，建议升级前关注下文 Bug 章节中尚未修复的网关相关问题。
- 链接：https://github.com/NousResearch/hermes-agent/releases

### v0.23.1+canary.20261116T070005Z（金丝雀版，2026-11-16）
- 提供 Hermes Desktop 全平台下载（含 macOS Apple Silicon DMG 等），面向早期测试用户。

---

## 3. 项目进展

今日 PR 活动以修复与质量加固为主，几个值得关注的方向：

- **网关多 Profile 隔离加固**：
  - [#131550](https://github.com/NousResearch/hermes-agent/pull/131550) — 快捷命令使用所属 Profile 自身的 `.env` 运行，修复跨 Profile 环境变量泄漏（安全边界修复）。
  - [#130414](https://github.com/NousResearch/hermes-agent/pull/130414) — 每小时媒体缓存清理现在覆盖所有被服务的 Profile。
  - [#124286](https://github.com/NousResearch/hermes-agent/pull/124286) — 防止作用域锁的双重所有权（salvage #62890）。
- **Cron 调度可靠性**：
  - [#124410](https://github.com/NousResearch/hermes-agent/pull/124410) — 周期任务被编辑为一次性任务时错误触发而非删除。
  - [#156672](https://github.com/NousResearch/hermes-agent/pull/156672) — 进度戳存储错误不再暂停仍在运行的实时任务（新 PR，11-16 提交）。
- **会话状态与压缩**：[#131115](https://github.com/NousResearch/hermes-agent/pull/131115) 压缩分段继承 lineage 的 hidden 标志，保持 Bot Chat 守卫不被绕过。
- **资源泄漏**：[#155749](https://github.com/NousResearch/hermes-agent/pull/155749) — 释放被替代的 memory provider 注册，修复长生命周期网关的文件描述符无限泄漏（mnemosyne SQLite 连接）。
- **沙箱与安全**：[#131588](https://github.com/NousResearch/hermes-agent/pull/131588) — 新增 bundled skill `sandboxed-prototyping`，通过 `hermes sandbox run` 执行不可信代码（依赖 #131458）。
- **代码结构**：[#156598](https://github.com/NousResearch/hermes-agent/pull/156598) — 浏览器 session/launcher/CDP supervisor 代码从 `tools/` 迁出至新的 `browser/` 根包，为浏览器能力模块化铺路。

**整体评估**：项目在统一网关合并后的收敛工作扎实推进，多 Profile/多租户安全边界和资源治理成为当前主线。

---

## 4. 社区热点

| Issue | 评论 | 热点分析 |
|---|---|---|
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 统一网关合并后 main 分支问题汇总（续 #134889） | **79** | **今日最大热点**。10 月 14 日 #106742 将所有本地会话迁入单一网关进程（CLI/TUI/Desktop/API/编辑器/消息 bot/cron/Kanban/Group Chat），用户持续上报合并后的回归问题，是 v0.24 稳定性的关键战场。 |
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) 通过 API 创建 PR 报权限错误 | 60 | 标记 `blocked, cause/upstream`，疑似上游平台问题，长期悬置。 |
| [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) 终端生命周期守卫误杀 Node.js CLI 命令 | 32 | 64KB 扫描预算提交引入的误报，阻塞良性命令（如 `obsidian-headless`），等待维护者决策。 |
| [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban worker 因网关卡顿批量崩溃 | 25 | **P1**。一次卡顿同时杀死 4 个 worker，进行中工作丢失，多 agent 编排用户的核心痛点。 |
| [#122609](https://github.com/NousResearch/hermes-agent/issues/122609) Skills 索引过期（bot 自动巡检） | 21 | 索引已 28.1h（上限 26h），CI 定时重建任务疑似未按时运行，影响文档站 Skills Hub。 |
| [#147269](https://github.com/NousResearch/hermes-agent/issues/147269) Android Beta 达到 Firebase 测试人数上限 | 18 👍3 | 公开入组链接已满，阻塞新用户加入移动端测试，属于运营层面需快速响应的问题。 |
| [#123985](https://github.com/NousResearch/hermes-agent/issues/123985) 压缩后 Desktop 消息重复渲染 | 17 | 已定位到数据库中存在两条 display 记录，非客户端缓存问题。 |

---

## 5. Bug 与稳定性

**P1（严重）**
1. [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban worker 网关卡顿时批量崩溃，WIP 丢失 — **暂无 fix PR**。
2. [#118379](https://github.com/NousResearch/hermes-agent/issues/118379) Anthropic 凭据池轮换被 per-request 刷新回退，两个订阅按一个计费后 failover 到其他 provider — **涉及计费正确性，暂无 fix PR**。
3. [#145314](https://github.com/NousResearch/hermes-agent/issues/145314) 静默 cron 脚本每次触发遗留永久空会话 — **暂无 fix PR**（相关改进见 #156672，但不直接对应）。

**P2（重要）**
4. [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) 压缩器上下文窗口被错误钳制到 `ollama_num_ctx`，云端 1M 窗口静默降为 65,536（v0.21.0 回归）— 暂无 fix PR。
5. [#146538](https://github.com/NousResearch/hermes-agent/issues/146538) 多 Profile（66 个）下网关每秒 3.4 万–9.9 万次文件系统元数据操作，Windows 内核池持续增长 — 部分缓解方向见 #130414/#131550。
6. [#144413](https://github.com/NousResearch/hermes-agent/issues/144413) 工具结果含孤立代理字符时 settlement 崩溃（UnicodeEncodeError），会话卡死不可恢复 — 暂无 fix PR。
7. [#146440](https://github.com/NousResearch/hermes-agent/issues/146440) Windows 下 Kanban managed worker 初始化冻结（git 子进程继承 stdin 管道 + 插件 lazy numpy import 死锁）— 用户已定位双重根因，等待官方修复。
8. [#156504](https://github.com/NousResearch/hermes-agent/issues/156504)（11-16 新报）Telegram getFile/send_voice 在陈旧连接池上全部超时，独立客户端 50ms 可达 — v0.23.1 stable 回归，暂无 fix PR。
9. [#143333](https://github.com/NousResearch/hermes-agent/issues/143333) `hermes profile rename` 使该 Profile 所有本地会话无法恢复（`profile_mismatch`），`migrate-identity` 无法修复 — 暂无 fix PR。
10. [#134092](https://github.com/NousResearch/hermes-agent/issues/134092) cron 任务投递完成后状态永卡 `delivery_queued` — 暂无 fix PR。
11. [#102540](https://github.com/NousResearch/hermes-agent/issues/102540) `hermes update` 耗时异常（>6 分钟）且进度信息不友好 — 暂无 fix PR。

**值得肯定的闭环**：[#38873](https://github.com/NousResearch/hermes-agent/issues/38873) Desktop 远程网关模式回退本地后端的问题今日关闭（sweeper 标记 implemented-on-main）；安全审计派生的 [#43666](https://github.com/NousResearch/hermes-agent/issues/43666)（持久化边界脱敏缺口）也已关闭。

---

## 6. 功能请求与路线图信号

| 需求 | 状态判断 |
|---|---|
| [#48375](https://github.com/NousResearch/hermes-agent/issues/48375) Desktop 输入框拼写检查（👍13） | 高热度、实现成本低，Desktop 设置项持续扩充中，大概率纳入近期版本 |
| [#50718](https://github.com/NousResearch/hermes-agent/issues/50718) 会话可见性：未读标记、needs-input 提示、OS 徽章（👍3） | 与统一网关后的会话治理方向契合，v0.24 候选 |
| [#41302](https://github.com/NousResearch/hermes-agent/issues/41302) 双列聊天气泡布局（👍4） | 纯 UI 偏好，社区贡献机会大 |
| [#3897](https://github.com/NousResearch/hermes-agent/issues/3897) 网关级按用户工具限制（RBAC，👍4） | `needs-decision` 状态超半年；#131550/#131283 等安全边界 PR 表明团队在收紧多租户隔离，RBAC 信号增强 |
| [#69560](https://github.com/NousResearch/hermes-agent/issues/69560) A2A 多节点协调与共享项目记忆 | 开放性架构提案，尚无对应 PR，属长期路线图讨论 |
| [#112877](https://github.com/NousResearch/hermes-agent/issues/112877) 内联 preview 帧宽度可配置（去除 640px 硬编码） | 小型配置项，易实现 |
| #131588（PR）沙箱化原型技能 | 依赖 #131458 `hermes sandbox run`，显示沙箱执行成为平台能力方向 |

---

## 7. 用户反馈摘要

- **多 agent/Kanban 重度用户**：网关卡顿导致 worker 批量崩溃（#145022）和 Windows 初始化冻结（#146440）是最大痛点——"一次卡顿杀死 4 个 worker"反映多 agent 编排在生产场景的可靠性尚未达标。
- **自托管/homelab 用户**：远程网关模式（#38873，已修复）、Tailscale 部署、多节点 A2A 协调（#69560）诉求活跃，说明存在稳定的多设备用户群体。
- **消息平台集成用户**：Telegram 语音/图片下载超时（#156504）、WhatsApp 流式编辑格式不一致（PR #131594）显示消息通道质量参差。
- **Windows 用户**反馈集中：TMPDIR 被 git-bash 覆盖（#127261）、minimize/tray 行为耦合（#119120）、内核池增长（#146538）——Windows 是稳定性反馈的主要来源平台。
- **计费敏感用户**：Anthropic 凭据池计费合并问题（#118379）直接影响成本，属高优先级隐性损失。
- **正面信号**：v0.23.2 快速收拢近 2,000 个 PR、Desktop 双平台分发完善、#38873 等长期问题闭环，社区参与修复（salvage PR、用户自行定位双重死锁根因）体现了高质量贡献者生态。

---

## 8. 待处理积压

- **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)**（10-03 起，60 评论）— API 创建 PR 权限错误，`blocked/cause/upstream`，长期悬置，建议推动与平台方沟通或给出 workaround 文档。
- **[#105758](https://github.com/NousResearch/hermes-agent/issues/105758)**（09-08 起，32 评论）— 生命周期守卫误报，`needs-decision` 超 2 个月，持续收到受影响用户反馈。
- **[#99943](https://github.com/NousResearch/hermes-agent/issues/99943)**（09-01 起）— 云端上下文窗口静默钳制，影响长上下文工作流，无 fix PR。
- **[#118379](https://github.com/NousResearch/hermes-agent/issues/118379)**（09-21 起，P1）— 计费正确性问题，应优先排期。
- **[#3897](https://github.com/NousResearch/hermes-agent/issues/3897)**（03-30 起，超 7 个月）— RBAC 需求 `needs-decision`，多租户场景日益普遍，建议正式决策。
- **[#122609](https://github.com/NousResearch/hermes-agent/issues/122609)** — Skills 索引巡检连续报 degraded，CI 定时任务需排查。
- **PR 积压提示**：待合并 PR 达 433 个，其中 jonpol01 的系列修复（#124xxx/#131xxx）等待审查时间较长，建议维护者优先处理安全边界类（#131550、#131283）与计费/状态类修复，避免与主线持续 rebase 的成本累积。

---

*本报告基于 24 小时窗口的 GitHub 数据自动分析生成，链接均指向对应 Issue/PR 原文。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*