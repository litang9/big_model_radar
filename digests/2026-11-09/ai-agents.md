# OpenClaw 生态日报 2026-11-09

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-08 23:41 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-09

## 1. 今日速览

OpenClaw 过去 24 小时保持极高活跃度：Issues 更新 500 条（新开/活跃 377，关闭 123），PR 更新 500 条（待合并 336，合并/关闭 164），并发布了新版本 **v2026.11.2**。社区贡献管线健康，大量新 PR（多数创建于 11-07/11-08）已标注 "ready for maintainer look"，等待维护者审阅。热点话题集中在 **Gateway 内存/稳定性（P0/P1）**、**SQLite 性能与可靠性**、以及**隐私与信任边界强化**（已随新版本落地）。

## 2. 版本发布

### v2026.11.2 ([链接](https://github.com/openclaw/openclaw/releases))
**Highlights — 隐私与信任边界：**
- 配置密钥、会话内容、工具错误、渠道 payload 不再进入诊断日志
- 强制执行所选 provider 与导航的信任边界
- CLI 热身回合结束后释放 MCP 授权（#191318、#174998）

**注意事项：** 隐私日志策略收紧可能影响依赖诊断日志定位问题的运维习惯，升级后如需排障需关注新的脱敏日志格式。另外注意 #193962 报告的升级通道问题（见下文）。

## 3. 项目进展

今日合并/关闭 PR 164 条，方向包括：

- **稳定性/内存修复**：#195418（关闭）— skills 搜索目录内存占用优化；#194902（关闭）— 避免大型原生 rollout 轮转导致的 91 秒慢跟进
- **UI 统一化推进**：@vyctorbrzezowski 密集提交系列 PR（#195469、#195468、#195467、#195466、#195465、#195463），统一 noVNC/portal/OAuth/审批等待页的 wordmark 与状态布局
- **节点体系落地**：#193993（headless 节点 owner 邀请注册）在 #193982、#194001、#194007 相继合并后继续推进多节点架构
- **待审高价值 PR**：#195459（Doctor 大 transcript 修复堆耗尽）、#195369（memory 嵌入缓存去重，XL 级、涉及兼容性）、#195447（worktrees 错误信息改进）、#195451（system-agent 救援回复 P1）

整体看，项目在稳定性、内存治理、多节点和安全边界四个方向同步前进，节奏稳健。

## 4. 社区热点

| Issue | 评论 | 主题 |
|---|---|---|
| [#166634](https://github.com/openclaw/openclaw/issues/166634) | 26 | 崩溃恢复后 SQLite 会话回收 checkpoint 失败导致 agent 永久 UNAVAILABLE |
| [#191944](https://github.com/openclaw/openclaw/issues/191944) | 25 | macOS 上 `gateway stop / --force` 均失败（进程祖先检查），待维护者审阅 |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | 18 | 2026.3.2 起 google-vertex/gemini-3.1-pro-preview 回归崩溃，已有关联 PR |
| [#53408](https://github.com/openclaw/openclaw/issues/53408)（已关闭） | 17 | 长对话后 write/exec 工具参数静默丢失 |
| [#67413](https://github.com/openclaw/openclaw/issues/67413)（已关闭） | 16 | per-agent dreaming 配置（OOM 风险） |

**诉求分析：** 社区核心关切是（1）Gateway 长时运行可靠性（崩溃恢复、stop/restart 生命周期管理）；（2）多 agent / 多账号场景下的会话与消息一致性；（3）配置与密钥安全治理（#76493 SecretRef 呼声高，6 👍）。

## 5. Bug 与稳定性（按严重度）

**P0 / 发布阻塞：**
- [#193962](https://github.com/openclaw/openclaw/issues/193962) — SQLite header-probe 修复（#187197）无法从 2026.10.10 通过 `openclaw update` 到达，升级路径自锁。**尚无新 fix PR**，需维护者优先处理
- [#162211](https://github.com/openclaw/openclaw/issues/162211) — 启动阻塞事件循环 40–200s，健康监视器误判为断连并引发重启循环。无 fix PR
- [#158592](https://github.com/openclaw/openclaw/issues/158592) — 主机休眠唤醒后模型运行时发布超时，全部入站消息失败直至重启。无 fix PR

**P1 回归：**
- [#193262](https://github.com/openclaw/openclaw/issues/193262) — Docker + Windows 驱动器 bind-mount 状态目录启动失败（2026.9.3 起回归）
- [#191847](https://github.com/openclaw/openclaw/issues/191847) — 2026.10.10 大会话反复击穿 512MB SQLite worker，每回合 "admission is closed"
- [#38327](https://github.com/openclaw/openclaw/issues/38327) — Vertex 回归，**已有关联开放 PR**

**内存泄漏类（持续讨论）：**
- [#181432](https://github.com/openclaw/openclaw/issues/181432)（基线 RSS 1.9GB + SQLite 事务超时）、[#185578](https://github.com/openclaw/openclaw/issues/185578)（堆只升不降，~25MiB/h）、[#182369](https://github.com/openclaw/openclaw/issues/182369)（off-heap ~0.1GiB/h 泄漏且监控不触发）。相关缓解 PR：#195459（Doctor）、#195418（已合）

## 6. 功能请求与路线图信号

- **#76493** — `mcp.servers[].env` 支持 SecretRef（安全最佳实践受阻，已进入安全评审信号强）
- **#193993** — OpenClaw ID 邀请注册 headless 节点（配套 PR 已合并 3 个，**很可能近期落地**）
- **#194823** — backup 归档可选省略 Doctor 迁移原件（PR 已 open，等待产品决策）
- **#128090** — Review 文件 Markdown 预览（4 👍，纯 UX，实现门槛低）
- **#162164** — iOS/macOS 个人身份 opt-in（有清晰的贡献进度表，社区驱动交付中）
- **#67413**（已关闭 stale）— per-agent dreaming 配置，与内存治理方向契合，或以其他形式回归

## 7. 用户反馈摘要

- **痛点集中在自托管长期运行**：内存上涨、事件循环停顿、崩溃后恢复失败是最常见的求助场景；多 agent + 高流量群聊用户（Telegram/Discord/Slack）受影响最重
- **升级体验不佳**：更新自锁（#193962）、Windows npm 清理报错（#184658）、升级后 Gateway 挂起（#167652）反复出现
- **信任与安全敏感**：用户主动遵循 SecretRef 最佳实践却被 schema 拒绝（#76493）；通知唤醒虚构发送者（#194662）引发对 agent 行为可信度的担忧
- **正面信号**：诊断标签（clawsweeper）、Issue 质量评级体系运转良好，报告可复现性强；社区 PR 贡献（含 roboclaw-bot 等）持续产出高质量修复

## 8. 待处理积压（需维护者关注）

- **#191944**（25 评论）— gateway stop 失败，标注 needs-maintainer-review 多日
- **#162211 / #158592 / #193962** — 三个 P0 无修复 PR，且 #193962 阻塞升级通道
- **#117262** — SQLite 3 路写句柄争用（DEF-61），P1 已挂起 3 个月
- **#166526** — Doctor 幂等运行 ~473s 超预算（steipete 报告，可信度高）
- **#76493 / #162164 / #107433** — 安全/产品决策类 issue 长期待 needs-product-decision / needs-security-review
- PR 侧：#195369（XL、兼容性风险）、#193993（XL、安全边界）需尽早安排评审窗口

---

**健康度小结：** 活跃度极高、贡献管线充实、版本节奏稳定；主要风险在于 Gateway 稳定性 P0 积压与升级路径自锁，建议维护者优先释放 #193962 的升级通道并集中处理内存/生命周期类 P0。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比报告 — 2026-11-09

> 注：本期日报仅覆盖 OpenClaw 与 Hermes Agent 两个项目，以下对比基于此二者展开。

## 1. 生态全景

个人 AI 助手开源生态正处于高速平台化阶段：项目普遍从单体 CLI 向“统一网关 + 多节点/多 profile + 插件目录”架构演进，即时通讯渠道（Telegram/Discord/Slack）成为主要落地场景。两大头部项目日均 Issue/PR 更新量均达 500 条上限，显示真实用户基数庞大且工程迭代密集。与此同时，共性瓶颈开始显现：自托管长时运行的内存泄漏、SQLite 状态管理、更新通道可靠性与审批安全模型是全生态共同的“成年礼”问题。

## 2. 活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新 | 500（新开/活跃 377，关闭 123） | 500（新开/活跃 423，关闭 77） |
| PR 更新 | 500（待合并 336，合并/关闭 164） | 500（待合并 434，合并/关闭 66） |
| Release | **v2026.11.2 发布**（隐私边界强化） | 无（上次 v0.22.5，10-23） |
| Issue 关闭率 | ~33% | ~15% |
| PR 消化率 | ~33% | ~13% |
| 健康度评估 | 高活跃 + 管线消化良好；风险在 P0 积压（升级自锁） | 高活跃但积压严重（434 PR 待审）；Windows 数据安全 P0 未修 |
| 阶段判断 | 质量巩固期（版本节奏稳定、专项治理） | 快速迭代期（修复冲刺、插件扩张） |

## 3. OpenClaw 在生态中的定位

- **规模与节奏领先**：PR 消化率（164 vs 66）和 Issue 关闭率（123 vs 77）均显著高于 Hermes，且有稳定的版本发布节奏（v2026.11.2），工程管理成熟度更高。
- **技术路线差异**：OpenClaw 走“多节点体系 + 隐私信任边界”路线（headless 节点邀请注册、诊断日志脱敏、SecretRef 安全实践），偏基础设施级治理；Hermes 走“统一网关 + 插件目录”平台化路线（wearos 客户端、角色化插件、跨网关 Bot 协作愿景），偏生态扩张。
- **劣势**：OpenClaw 存在三个无 fix PR 的 P0，其中 #193962 升级通道自锁直接伤害存量用户；Hermes 虽积压更重，但贡献冲刺（如 @teknium1 的 Telegram 批量修复）显示出更强的社区修复动能。
- **社区规模**：两者活跃 issue 量级相当（377 vs 423），但 OpenClaw 的诊断标签/Issue 质量评级体系运转成熟，报告可复现性更好。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent |
|---|---|---|
| **网关长时稳定性** | #181432/#185578/#182369 内存泄漏、#162211 事件循环阻塞 | #146643 全量重读会话历史（1.5–2.5 核）、#148958 crash 误判 |
| **SQLite/状态可靠性** | #166634 崩溃恢复失败、#191847 512MB worker 击穿、#117262 写争用 | #147938 Windows state.db 误判损坏覆盖数据 |
| **更新通道可靠性** | #193962 升级自锁、#167652 升级后挂起 | #125437 半安装状态无恢复路径（15 个 Discord 线程） |
| **审批/命令安全** | 信任边界强化（已落地 v2026.11.2） | #141346 smart approval 放行危险命令致数据丢失（未修） |
| **多 agent/多账号一致性** | 多节点架构、per-agent 配置（#67413） | 多 profile 隔离（#151550）、#17254 按用户隔离记忆 |

**结论**：内存治理、状态层可靠性、更新安全、审批权限模型是生态级共性债务，任何新进入者都应前置设计。

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | Gateway 稳定性、隐私/信任边界、多节点、Doctor 诊断 | Telegram 深度集成、Kanban/cron 自动化、插件目录、桌面客户端 |
| 目标用户 | 自托管重度运维用户、多渠道群聊高流量场景 | 个人桌面自动化用户、IM Bot 运维者、插件开发者 |
| 架构关键点 | headless 节点 + SQLite 会话 + MCP 授权生命周期 | 统一网关 + Electron Desktop + api_server（Open WebUI 兼容） |
| 短板 | macOS/Windows 生命周期管理、升级路径 | Windows 体验全面落后、测试基建大面积失败（#129455） |

## 6. 社区热度与成熟度

- **快速迭代层**：Hermes Agent——Issue 新开量最高（423），插件生态周均 5+ 新增，但关闭率仅 15%、434 PR 积压，属“跑得快、消化慢”，且贡献通道本身受阻（#131859，59 评论）。
- **质量巩固层**：OpenClaw——发布节奏稳定，UI 统一化、内存专项治理推进有序，但 3 个无 fix 的 P0 与 needs-product-decision 长期积压（#76493 等）暴露治理带宽不足。
- **共同风险**：Windows 平台均为二等公民，两项目的最严重事故均发生在 Windows。

## 7. 值得关注的趋势信号

1. **安全边界从“功能”变为“红线”**：OpenClaw 已将隐私脱敏落地到版本，Hermes 则因 smart approval 真实数据丢失事故承压——审批权限模型（截断命令隐藏风险、危险命令白名单）将成为选型硬指标。
2. **SecretRef / 凭据治理**是高共识需求（OpenClaw #76493、Hermes #150958 日志泄漏修复），配置安全正标准化。
3. **状态层（SQLite）是下一个战场**：两个项目最严重的 P0 均涉及 SQLite/状态文件——崩溃恢复、写并发、大容量会话的存储引擎选型值得架构层重新评估。
4. **多 agent 互操作浮现**：Hermes #97681 跨网关 Bot 协作、OpenClaw 多节点 owner 体系，指向“个人 AI 互操作”这一路线图级方向。
5. **渠道即产品**：Telegram 群聊场景是当前最大真实需求来源，富文本渲染、群消息定向、允许名单等细粒度工程决定留存。
6. **插件/客户端目录化**：从 wearos 手表客户端到 TTS/guardrail，平台化护城河正从核心引擎转向生态目录。

**给开发者的建议**：新项目优先解决长时运行内存治理、状态恢复与更新原子性；审批默认策略宁可保守；若面向 IM 场景，Windows 支持要么做好要么明示不支持。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-09

## 1. 今日速览

Hermes Agent 今日保持高活跃度：过去 24 小时内 Issues 更新 500 条（新开/活跃 423，关闭 77），PR 更新 500 条（待合并 434，已合并/关闭 66），无新版本发布。讨论焦点集中在 **统一网关（#106742）合并后的善后问题**、**Windows 平台稳定性与更新可靠性**，以及 **Telegram 集成的大量修复 PR**（多由 @teknium1 集中提交，呈现明显的"修复冲刺"态势）。社区插件生态活跃，今日新增多个 catalog PR（含首个智能手表客户端）。总体看，项目处于快速迭代期，PR 产出与 Issue 消化速度匹配，但 P0/P1 级 Windows 数据安全问题值得警惕。

## 2. 版本发布

今日无新版本发布。（注：#146955 提到 v0.22.5 于 2026-10-23 发布，其引入的 Windows Kanban worker 回归仍在处理中。）

## 3. 项目进展

今日有 66 个 PR 合并/关闭，434 个待合并，主要推进方向：

- **Telegram 集成大扫除**（@teknium1 主导的一批 `ci-reviewed` PR）：
  - [#150997](https://github.com/NousResearch/hermes-agent/pull/150997) 修复嵌套加粗/斜体、可展开引用、表格竖线、富文本金额渲染（一次修复 6 个 issue）
  - [#151042](https://github.com/NousResearch/hermes-agent/pull/151042) `/model` 选择器显示全部 provider
  - [#151010](https://github.com/NousResearch/hermes-agent/pull/151010) 群消息定向判定四规则修复
  - [#151062](https://github.com/NousResearch/hermes-agent/pull/151062) Telegram 允许名单全量生效（安全相关）
  - [#151023](https://github.com/NousResearch/hermes-agent/pull/151023) 截断的审批卡不再提供 Approve 按钮（安全相关，防止隐藏 `&& rm -rf` 尾部）
  - [#151068](https://github.com/NousResearch/hermes-agent/pull/151068) `/restart` 先确认后重启
- **安全修复**：[#150958](https://github.com/NousResearch/hermes-agent/pull/150958) 代理 URL 凭据不再泄漏到 gateway.log
- **多进程/多 profile**：[#151550](https://github.com/NousResearch/hermes-agent/pull/151550) 为各 profile 同名 user provider 提供独立模块
- **兼容性**：[#151551](https://github.com/NousResearch/hermes-agent/pull/151551) 非 English locale 下 git 错误可正确诊断；[#151549](https://github.com/NousResearch/hermes-agent/pull/151549) api_server 支持 Open WebUI 工具型 agent 请求；[#151545](https://github.com/NousResearch/hermes-agent/pull/151545) Unicode 行分隔符不再破坏 TUI/记录
- **插件生态**：新增 5+ 个 catalog PR，包括首个智能手表客户端 [wearos](https://github.com/NousResearch/hermes-agent/pull/151546)、桌面角色化插件 [kin](https://github.com/NousResearch/hermes-agent/pull/150982)、skillens、blackbox 1.4.0 等

整体评估：Telegram 平台质量与安全加固是本周期最大推进，合计关闭关联 issue 超过 20 个。

## 4. 社区热点

| Issue | 热度 | 主题 |
|---|---|---|
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（59 评论） | 🔥 | 贡献者无法通过 API 向主仓开 PR（CreatePullRequest 权限错误，标记 `cause/upstream`）——**影响社区贡献流程本身**，建议维护者尽快跟进 |
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（56 评论） | 🔥 | 统一网关合并后主分支问题汇总（承接 #134889），横跨 15 个标签，是当前最大的工程追踪帖 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681)（40 评论，👍4） | — | 跨网关 Bot 协作架构讨论（"个人 AI 互操作"愿景帖），长期路线图信号 |
| [#141346](https://github.com/NousResearch/hermes-agent/issues/141346)（37 评论） | ⚠️ | Smart approval 自动放行 osascript 命令导致用户 PowerPoint 数据永久丢失——**安全性+数据安全的标志性案例**，直指 `approvals.mode: smart` 的风险模型缺陷 |

诉求分析：社区对统一网关的架构方向总体认可，但对合并质量与回归节奏不满；数据安全事故引发对默认审批策略的信任讨论。

## 5. Bug 与稳定性（按严重度）

1. **P0 数据丢失** [#147938](https://github.com/NousResearch/hermes-agent/issues/147938)：Windows 更新后 state.db 校验将"运行时文件占用"误判为损坏，用数月前的陈旧快照覆盖健康数据，且误报恢复失败。暂无对应 fix PR。
2. **P1 更新可靠性** [#125437](https://github.com/NousResearch/hermes-agent/issues/125437)：失败更新留下半安装状态、无产品内恢复路径（本周 15 个 Discord 线程），[#127284](https://github.com/NousResearch/hermes-agent/issues/127284) `source-completion-pending` 无 TTL 自愈。部分缓解见 PR #151551（locale 诊断）。
3. **安全/数据丢失** [#141346](https://github.com/NousResearch/hermes-agent/issues/141346)：smart approval 放行危险 osascript（未修复）。
4. **P2 网关性能** [#146643](https://github.com/NousResearch/hermes-agent/issues/146643)：网关每次变更全量重读会话历史，数千会话时占 1.5–2.5 核 CPU 并致 Desktop 30s 超时——规模化使用的硬瓶颈。
5. **P2 Windows 崩溃** [#112961](https://github.com/NousResearch/hermes-agent/issues/112961)：Electron 主进程固定偏移 `0x5281f15` FAST_FAIL 崩溃（长期未决）。
6. **P2 回归** [#146955](https://github.com/NousResearch/hermes-agent/issues/146955)：v0.22.5 Windows Kanban worker prompt 不投递；[#148958](https://github.com/NousResearch/hermes-agent/issues/148958) owner stall 被计为 crash，两次即阻塞卡片；[#147839](https://github.com/NousResearch/hermes-agent/issues/147839) 单次 20s receipt 超时毒化 store 导致 "No reply"。
7. **P2 测试基建** [#129455](https://github.com/NousResearch/hermes-agent/issues/129455)：默认安装下测试套件大面积失败。

已修复/关闭：[#141917](https://github.com/NousResearch/hermes-agent/issues/141917)（sys.modules 迭代崩溃）、[#143605](https://github.com/NousResearch/hermes-agent/issues/143605)（Telegram 文档 album 拒收）、[#38989](https://github.com/NousResearch/hermes-agent/issues/38989)（侧栏会话缺失）、[#72668](https://github.com/NousResearch/hermes-agent/issues/72668)（Telegram 错误未脱敏日志）。

## 6. 功能请求与路线图信号

- **可配置 temperature** [#17565](https://github.com/NousResearch/hermes-agent/issues/17565)（👍17，长期高票）：用户报告硬编码温度导致幻觉，呼声高、实现成本低，纳入下一版本概率大。
- **多用户偏好记忆** [#17254](https://github.com/NousResearch/hermes-agent/issues/17254)：群组场景按 user_id 隔离 memory——与 #97681 跨网关协作方向呼应，属路线图一致项。
- **可配置快捷键** [#4256](https://github.com/NousResearch/hermes-agent/issues/4256)（👍7）：tmux/screen 冲突 + 无障碍诉求。
- **跨网关 Bot 协作** [#97681](https://github.com/NousResearch/hermes-agent/issues/97681)：官方架构演进的核心信号，统一网关（#143547 善后）是前置条件。
- 生态信号：插件 catalog 持续扩容（TTS/语音、wearos、guardrail），显示平台化战略在落地。

## 7. 用户反馈摘要

- **满意点**：修复 PR 描述质量高（含 ELI5 与实测验证）；插件生态响应快；Desktop 多 profile 场景受重视。
- **痛点**：① Windows 体验明显落后（更新、崩溃、Kanban、ACP 挂起占热点 issue 近半）；② 更新失败后只能手工敲命令修复，社区互助成本高；③ smart approval 的"便利 vs 安全"权衡失衡，出现真实数据丢失案例；④ 网关在大会话量下性能退化，重度用户（数千会话）受限。
- **典型场景**：Telegram 群 Bot 运维、多 profile 网关复用、cron/Kanban 自动化流水线、macOS 桌面办公自动化（PPT 事故）。

## 8. 待处理积压（维护者关注）

- [#131859](https://github.com/NousResearch/hermes-agent/issues/131859)：贡献者开 PR 被阻（59 评论，`cause/upstream`）——阻塞外部贡献，**最高优先级跟进**。
- [#147938](https://github.com/NousResearch/hermes-agent/issues/147938)：P0 Windows 数据覆盖，11-02 报告，需尽快修复 PR。
- [#141346](https://github.com/NousResearch/hermes-agent/issues/141346)：smart approval 安全模型审查。
- [#112961](https://github.com/NousResearch/hermes-agent/issues/112961)：Windows Desktop 崩溃，9 月报告至今 `awaiting-reporter`。
- [#75444](https://github.com/NousResearch/hermes-agent/issues/75444)：Kanban 升级任务无限弹跳，7 月底报告未修。
- [#80280](https://github.com/NousResearch/hermes-agent/issues/80280)：超时 worker 进程组残留（违反 worktree 独占），8 月初报告未修。
- [#17565](https://github.com/NousResearch/hermes-agent/issues/17565)：4 月功能请求，👍17，无官方表态。

**健康度小结**：Issue 关闭率（77/500）与 PR 积压（434 待合并）显示团队在快速迭代中略感吃力；建议优先处理 P0 数据安全与贡献通道阻塞，并在下个版本前完成 Windows 回归清理。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*