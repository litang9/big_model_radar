# OpenClaw 生态日报 2026-11-05

> Issues: 397 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-05 00:53 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-05

---

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时内 Issues 更新 397 条（新开/活跃 230，关闭 167），PR 更新 500 条（待合并 311，已合并/关闭 189），并发布了 **v2026.11.5-beta.1** 测试版。项目重心明显转向**知识捕获（Knowledge Scribes）与 PostgreSQL 数据平面**两大新能力，同时多个安全边界相关的大 PR（OpenClaw ID 隧道传输、Notion 集成）进入评审。稳定性方面仍有压力：Windows 升级链路、Gateway 内存泄漏与插件捕获阻塞等 P0 问题持续高热讨论，积压的 P0/P1 缺陷修复节奏落后于新功能开发，值得维护者关注。

---

## 2. 版本发布

### v2026.11.5-beta.1

- **Knowledge Scribes（知识抄写员）**：为 agents、sessions 与 Control UI 提供一等公民级的知识捕获与可复用 scribe 工作流（#185583、#185637、#185974、#186270、#186455、#187659，感谢 @jalehman）。这是本版本最大亮点，意味着 OpenClaw 的 Agent 记忆/知识体系开始产品化。
- **PostgreSQL 数据平面**：新增 PostgreSQL 后端状态存储（release notes 摘要在数据处截断，建议查阅完整 release notes 确认迁移路径）。
- **迁移注意**：作为 beta 版本，从 SQLite 切换到 PostgreSQL 数据平面属于重大架构选项，建议生产环境观望；另注意 #185656 报告的大规模 transcript 归档迁移在 2026.10.5 上仍有回归，升级前需确认。

---

## 3. 项目进展

今日 PR 流量 500 条，合并/关闭 189 条，重点推进：

- **修复 Gateway 更新期间的 respawn 循环**（#187104，待合并但 ready for review）：解决 Doctor 维护期间 launchd KeepAlive 导致的 Gateway 重启循环及 SQLite source-change 拒绝问题，直接回应 Windows/macOS 更新可靠性投诉。
- **插件内存泄漏修复**（#192673，已关闭）：插件捕获关闭时释放失败加载记录，缓解 #185578 报告的堆内存只升不降问题。
- **发布工程加固**：#193089 / #193091 增加发布后容器镜像注册表回读校验，#192833 修复预发布候选缺少插件注册表字段被误拒的问题，#192830 保留 SDK 审查的 checkout 历史。
- **安装更新回归测试体系**：@vincentkoc 连续提交多个 XL 级测试 PR（#192937、#192954、#192938、#192949、#193015），围绕 #143752 系统化覆盖安装更新生命周期与 SQLite 访问。
- **Notion 集成**（#193092，新开）：对接 Notion 官方 shared-memory 与原生 Skills 工作流。

整体看，项目在“新功能（知识/身份体系）+ 工程质量（发布验证、回归测试）”双线推进，节奏健康。

---

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) P0 Gateway 捕获大型外部插件时阻塞数分钟 | 70 评论 | 2026.9.6 引入的插件生成捕获（#144252）在大型依赖树上阻塞事件循环，是 9 月以来最大回归，用户强烈要求修复 |
| [#177656](https://github.com/openclaw/openclaw/issues/177656) 原生 host exec 共享状态完整性准入错误 | 28 评论 | stable 2026.10.5 上至少 28 次失败，无修复 PR，社区对 stable 版回归缺乏响应不满 |
| [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows 启动慢/插件不干净退出/schtasks 权限错误 | 28 评论 | Windows 托管安装的更新可靠性是长期痛点 |
| [#120385](https://github.com/openclaw/openclaw/issues/120385) Code Mode 定时任务工具目录不完整 | 25 评论 | cron/memory-flush 场景 MCP 工具缺失，报错信息不友好 |
| [#150635](https://github.com/openclaw/openclaw/issues/150635) 短期记忆回收导致 dreaming 深度阶段无法晋升 | 24 评论 | 记忆架构核心缺陷，有 linked PR 但待产品决策 |
| [#151962](https://github.com/openclaw/openclaw/issues/151962) 幻影用户消息：内部运行时字符串被当作用户 prompt | 14 评论 | 长会话桥接场景下 Agent 收到“用户未发送的消息”，涉及信任与数据一致性 |

**趋势**：讨论热点集中在**插件捕获/更新可靠性**、**记忆与状态管理**、**Windows 平台体验**三大主题，与 v2026.11.5-beta.1 的 Knowledge Scribes 方向高度相关——社区在“推着”记忆与稳定性走向成熟。

---

## 5. Bug 与稳定性（按严重程度）

**P0**

- [#160959](https://github.com/openclaw/openclaw/issues/160959) Gateway 捕获大型插件阻塞数分钟（crash-loop，release-blocker）— ⚠️ 无 fix PR
- [#169844](https://github.com/openclaw/openclaw/issues/169844) Windows Control UI 更新挂在 "Activating"，计划任务被禁用、网关停止 — ⚠️ 无 fix PR

**P1**

- [#177656](https://github.com/openclaw/openclaw/issues/177656) 共享状态完整性准入错误（stable 上 ≥28 次失败）— 无 fix PR
- [#154812](https://github.com/openclaw/openclaw/issues/154812) Gateway RSS 失控导致宿主 OOM（9.32 GiB RSS）— 无 fix PR；#192673 部分缓解
- [#185578](https://github.com/openclaw/openclaw/issues/185578) 堆内存棘轮式上涨 ~25 MiB/h 直到 V8 上限 — 无 fix PR
- [#190307](https://github.com/openclaw/openclaw/issues/190307) Gateway 重启后大量 agent 永久 "degraded"（准入超时）— 无 fix PR
- [#148789](https://github.com/openclaw/openclaw/issues/148789) 模型 fallback 链耗尽所有候选并错误归因 — 已有 source-repro
- [#162087](https://github.com/openclaw/openclaw/issues/162087) 9.7 定时 announce 对旧账号模式任务失败（回归）— 待产品/安全决策
- [#185656](https://github.com/openclaw/openclaw/issues/185656)（已关闭）大 zstd transcript 归档迁移超 Node 字符串上限，#170853 修复后仍回归

**P2 值得关注**

- [#191401](https://github.com/openclaw/openclaw/issues/191401) Signal teardown 无限等待（已有 fix-shape-clear，可排队修复）
- [#191944](https://github.com/openclaw/openclaw/issues/191944) macOS 上 `gateway stop/--force` 均失败
- [#166133](https://github.com/openclaw/openclaw/issues/166133) MCP 包装器将整数参数强转字符串导致工具调用失败
- [#182891](https://github.com/openclaw/openclaw/issues/182891) / [#161208](https://github.com/openclaw/openclaw/issues/161208)（已关闭）prompt cache 从不复用，token 成本显著放大（心跳一次 $0.40–0.95）

**健康度提示**：多数 P0/P1 均带 `clawsweeper:no-new-fix-pr` 标签，修复供给明显滞后于问题发现速度。

---

## 6. 功能请求与路线图信号

- **Notion shared-memory / Skills 集成**（PR [#193092](https://github.com/openclaw/openclaw/pull/193092)）——官方账号 roboclaw-bot 当日提交，预计进入下一版本。
- **OpenClaw ID 体系**：[#192345](https://github.com/openclaw/openclaw/pull/192345)（隧道传输 + 中继设备认证）与 [#192352](https://github.com/openclaw/openclaw/pull/192352)（Control UI 账户菜单 + People 插件）两大 XL 级 PR 同步推进，远程访问/多人协作是明确的路线图方向。
- **Knowledge recall 门控**（PR [#188057](https://github.com/openclaw/openclaw/pull/188057)）：由 Decision model 决定是否注入知识上下文，与 Knowledge Scribes 形成配套，很可能随 beta 系列落地。
- **Claude 服务端 web_search provider**（[#192632](https://github.com/openclaw/openclaw/issues/192632)，昨日新开）：对齐现有 Gemini/Perplexity provider，实现成本低，纳入概率高。
- **沙箱 agent 访问 skill_workshop**（[#91676](https://github.com/openclaw/openclaw/issues/91676)）与 **reaction 触发 agent turn**（[#17840](https://github.com/openclaw/openclaw/issues/17840)）长期开放，等维护者产品决策。
- **cron 默认投递/失败目的地配置**（PR [#185848](https://github.com/openclaw/openclaw/pull/185848)）：直接回应 #121558、#162087 等定时任务投递痛点。

---

## 7. 用户反馈摘要

- **成本焦虑**：prompt cache 失效（#182891、#161208）和每 turn 重复计费历史（#178373）让重度用户实际 token 开销显著高于预期，是最直接的“钱包痛点”。
- **长会话/多 agent 稳定性**：13 天 310k token 的 WeChat 桥接会话出现幻影消息（#151962）；35 个 agent、最大 284 MB SQLite 库的用户遇到重启后批量 degraded（#190307）——重度自托管用户是问题的主要报告群体。
- **Windows 体验差距**：更新挂起、schtasks 权限、插件 staging 目录膨胀（290 MB→612 MB，#162585）反复出现，Windows 用户挫败感明显。
- **积极信号**：Knowledge Scribes、Notion 集成、Control UI 功能获得期待；@jalehman 等核心贡献者响应积极；自动化机器人（tideclaw/roboclaw）使 issue/PR 分诊高度规范化。

---

## 8. 待处理积压

| 条目 | 状态 | 提醒 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) P0 插件捕获阻塞 | 开放 1 个多月，70 评论，无 fix PR | **最高优先**，需维护者审查 |
| [#177656](https://github.com/openclaw/openclaw/issues/177656) stable 回归 | 无 fix PR，needs-maintainer-review | stable 用户体验受损 |
| [#161921](https://github.com/openclaw/openclaw/issues/161921) doctor --fix 与 plugins update 互相死锁 | P0，开放 1 个多月 | 升级链路死锁，影响大 |
| [#91676](https://github.com/openclaw/openclaw/issues/91676) 沙箱 skill_workshop | 开放近 5 个月 | 等产品+安全双重决策 |
| [#17840](https://github.com/openclaw/openclaw/issues/17840) reaction 触发 turn | 开放近 9 个月 | 社区反复催办 |
| [PR #128175](https://github.com/openclaw/openclaw/pull/128175) macOS typed gateway auth | P1，开放近 3 个月，含安全敏感变更 | 安全审查积压 |
| [#143640](https://github.com/openclaw/openclaw/issues/143640) memory-core 单事务锁库 | stale 风险 | 与记忆系统重构窗口契合，宜一并处理 |

**维护者建议**：修复供给（no-new-fix-pr 标签密集）与新功能开发速度失衡；建议下一迭代优先消化 Windows 更新链路与 Gateway 内存两组 P0/P1，避免 stable 版口碑受损。

---

*数据来源：GitHub API（过去 24 小时窗口），生成时间 2026-11-05。*

---

## 横向生态对比

# 个人 AI 助手/智能体开源生态横向对比分析报告（2026-11-05）

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**基础设施重构与记忆体系产品化**的关键阶段：头部项目都在从单机单体架构向“统一网关 + 数据平面分离 + 跨端/多人协作”演进。记忆与知识管理（OpenClaw 的 Knowledge Scribes、Hermes 的 memory 路由讨论 302 评论）成为用户最强诉求，但两个项目同时暴露出“大重构 fallout”——稳定性和性能问题集中爆发、修复供给落后于功能开发，是当前生态的普遍矛盾。插件/Provider 生态自下而上快速繁荣（Hermes 的 catalog PR、OpenClaw 的 Notion 集成），正在填补官方路线图未覆盖的空白。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 397（新开/活跃 230，关闭 167） | 370（新开/活跃 350，关闭 20） |
| Issue 关闭率 | ~42% | ~5.7% ⚠️ |
| PR 更新（24h） | 500（待合并 311，合并/关闭 189） | 500（待合并 388，合并/关闭 112） |
| PR 合并/关闭率 | ~38% | ~22% |
| Release | v2026.11.5-beta.1（Knowledge Scribes + PostgreSQL 数据平面） | 无 |
| 主要风险簇 | Windows 更新链路、Gateway 内存泄漏、插件捕获阻塞（P0 开放 1 月无 fix PR） | 统一网关 fallout（会话丢失、性能、桌面渲染）、凭据落盘安全问题悬置 4 个月 |
| 自动化治理 | tideclaw/roboclaw 分诊规范，`no-new-fix-pr` 标签密集 | 分诊能力偏弱，积压治理不足 |
| 健康度评估 | **B+**：双线推进节奏健康，但 P0/P1 积压需警惕 | **B-**：生态极活跃但关闭率失衡，重构 fallout 未收敛 |

## 3. OpenClaw 在生态中的定位

- **优势**：发布节奏更稳（有 beta 版本节律）、工程质量投入可见（发布镜像回读校验、XL 级安装更新回归测试体系）、issue 分诊高度自动化、**率先将 Agent 记忆/知识体系产品化**（Knowledge Scribes 一等公民级支持）。
- **技术路线差异**：OpenClaw 走“平台化数据平面”路线（SQLite→PostgreSQL 可选后端、OpenClaw ID 身份体系、Notion shared-memory），偏重自托管生产环境；Hermes 走“统一进程网关 + 插件生态”路线，偏重单机轻量入口与社区扩张（移动端 beta、Discord/Slack 等渠道）。
- **社区规模**：两项目日流量相当（Issues ~400、PR 500），但 OpenClaw 的处理吞吐（关闭率 42% vs 5.7%）显示更成熟的维护者带宽。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent |
|---|---|---|
| **记忆/知识体系** | Knowledge Scribes + knowledge recall 门控（#188057）、记忆回收缺陷（#150635） | #24770 多 provider memory 路由（302 评论，wontfix 但社区不散）、第三方 memory 插件 |
| **多 agent / 多人协作** | OpenClaw ID、People 插件、Control UI 账户体系 | #97681 跨网关 Bot 协作、clack 端到端加密 A2A、Kanban fleet 守卫 |
| **网关/会话可靠性** | Gateway respawn 循环、重启后批量 degraded（#190307） | 统一网关 fallout：session `not_found`、multiplex 迁移 |
| **性能与规模化** | transcript 归档超上限（#185656）、OOM（#154812） | 网关全量重读致 CPU 飙升（#146643）、cron ticker 配置重解析 |
| **安全边界** | ID 隧道传输、macOS typed gateway auth 积压 3 个月 | 凭据落盘（#62336）、A2A token 无鉴权降级、shell 管道绕过审批 |
| **集成生态** | Notion、Claude web_search provider | 插件 catalog（wazoo、clack 等）、移动端分发 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 知识捕获、身份/远程访问、生产级数据平面 | 统一网关、多渠道接入、移动端、插件目录 |
| 目标用户 | 重度自托管用户（35 agent / 284 MB SQLite 级别的生产部署）、多端/多人场景 | 个人桌面用户、插件开发者、移动端早期采用者 |
| 架构关键点 | Gateway + 可选 PostgreSQL、Control UI、scribe 工作流 | 单进程统一网关、multiplex profiles、Git 驱动 Skills 生命周期 |
| 平台重心 | Windows 是最大痛点也是投入重点（schtasks、升级链路） | 桌面端（transcript 渲染）+ 移动端（iOS/Android beta） |

## 6. 社区热度与成熟度

- **快速迭代/扩张期：Hermes Agent** —— 日新增 issue 350、插件生态爆发、移动端 beta 名额爆满，但关闭率仅 5.7%，处于“增长快于治理”的典型扩张期阵痛。
- **质量巩固期：OpenClaw** —— 发布工程与回归测试体系成型、分诊自动化成熟，但 P0 积压（#160959 开放 1 月、#161921 死锁）提示其正在为前期功能速度还债。
- 两者共同点：**大架构重构（数据平面/统一网关）的稳定性 fallout 是当前最集中的风险簇**。

## 7. 值得关注的趋势信号

1. **记忆产品化是下一战场**：两个社区最强诉求都指向 Agent 记忆（OpenClaw 产品化落地、Hermes 社区 302 评论倒逼插件化）。开发者启示：记忆召回门控、知识生命周期管理值得提前布局。
2. **数据平面从 SQLite 走向 PostgreSQL**：重度用户规模化部署正在突破嵌入式数据库边界（284 MB 库、数千会话），可插拔存储后端将成为自托管产品标配。
3. **安全边界问题系统性浮现**：凭据落盘、token 降级、幻影消息、管道绕过审批——Agent 拥有 shell/网络权限后，输入完整性与凭据隔离是生态级欠账。
4. **成本可观测性成为刚需**：prompt cache 从不复用（单心跳 $0.40–0.95）、余额面板 PR 均获高关注，token 成本透明化直接影响留存。
5. **跨端/多 agent 协作从 roadmap 走向实现**：身份体系、A2A 加密、跨网关协作在两个项目同步推进，“个人 AI 互联”是 2027 年前可预期的能力基线。
6. **治理能力决定口碑**：关闭率、fix-PR 挂钩、安全 issue 响应速度，正在成为用户选择同类项目的隐性门槛——技术之外，运维与分诊自动化同等重要。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-11-05）

## 1. 今日速览

Hermes Agent 今日保持高活跃度：过去 24 小时 Issues 更新 370 条（新开/活跃 350，关闭 20），PR 更新 500 条（待合并 388，已合并/关闭 112），无新版本发布。社区讨论焦点高度集中在 10 月中旬合入的统一网关架构（#106742）的后续问题上——会话状态、桌面端 resume 失败、性能退化成为最高频痛点。同时插件生态持续繁荣，今日新增多个 catalog PR（clack、custody、wazoo、gogogoogle 等）。关闭率偏低（Issues 关闭仅约 5.7%），积压治理仍待加强。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日无大型 feature PR 合并信息展示，但从已合并/关闭 112 条 PR 的体量看，项目以持续小步快跑方式推进。值得关注的在途进展：

- **余额面板**：[#149184](https://github.com/NousResearch/hermes-agent/pull/149184) 在模型页为 DeepSeek/OpenRouter/AMD 等已配置提供商展示真实接口返回的剩余余额。
- **安全审批加固**：[#87362](https://github.com/NousResearch/hermes-agent/pull/87362) 修复 `curl | sudo bash`、`source <(curl …)` 等绕过审批的管道 shell 变体（ci-reviewed，由 @teknium1 推进）。
- **桌面体验**：[#85775](https://github.com/NousResearch/hermes-agent/pull/85775) MCP 授权卡片展示将执行的命令/将连接的 URL；[#86628](https://github.com/NousResearch/hermes-agent/pull/86628) 仪表盘 Skills 页支持归档删除，与桌面端后端统一。
- **可靠性修复**：[#85031](https://github.com/NousResearch/hermes-agent/pull/85031) Gemini 安全拦截不再静默返回空回合，改为报错并切到 fallback 模型；[#85005](https://github.com/NousResearch/hermes-agent/pull/85005) 文本模型收到图片时自动降级继续而非失败；[#149177](https://github.com/NousResearch/hermes-agent/pull/149177) 修复 systemd 环境下 A2A 启动 token 静默降级为无鉴权的安全隐患；[#148972](https://github.com/NousResearch/hermes-agent/pull/148972) 清理 kanban worker 留下的孤儿 systemd scope。
- **Skills 生命周期**：[#148971](https://github.com/NousResearch/hermes-agent/pull/148971) 引入 proposed→active 的 Git 驱动技能生命周期。

## 4. 社区热点

1. **[#24770](https://github.com/NousResearch/hermes-agent/issues/24770)（302 评论）** — 多提供商 memory 路由讨论。维护者已定性为 `wontfix`（单外部 provider 是有意设计：避免 tool-schema 膨胀与近重复召回），但社区持续追问，说明 memory 是核心诉求。配套的第三方 provider 插件（如 [#149129](https://github.com/NousResearch/hermes-agent/pull/149129) wazoo）正在通过插件通道解决。
2. **[#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（225 评论，已关闭）** — 统一网关（#106742，10-14 合入）的 post-merge 修复追踪 issue，涉及 Windows、会话状态、消息投递等多重风险标签，社区跟进极热烈。
3. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（47 评论）** — 承接 #134889，继续汇总统一网关在 main 上的遗留问题，是目前最活跃的 OPEN 追踪 issue。
4. **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)（40 评论，👍4）** — 跨网关 Bot 协作（先跨机器、后跨所有者），代表项目"个人 AI 互联"的路线图方向。
5. **[#139818](https://github.com/NousResearch/hermes-agent/issues/139818)（40 评论）** — 远程后端桌面会话 resume 返回 `not_found`，属网关统一的直接 fallout。

**诉求解读**：热点几乎全部围绕"统一网关架构迁移阵痛"与"多 agent 协作/memory 架构"，用户既认可统一方向，又对迁移期数据/会话完整性受损不满。

## 5. Bug 与稳定性

按严重程度排列：

| 级别 | Issue | 摘要 | Fix 状态 |
|---|---|---|---|
| P1 | [#135487](https://github.com/NousResearch/hermes-agent/issues/135487) | cron worker 在 `database is locked` 时死亡且任务丢失，无重试 | 未见 fix PR |
| P0 | [#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（已关闭，追踪中） | 统一网关 post-merge 修复追踪 | 持续修复中 |
| P2 | [#139818](https://github.com/NousResearch/hermes-agent/issues/139818) | 远程后端桌面会话 `session.resume` 报 `not_found` | 未见明确 fix PR |
| P2 | [#143839](https://github.com/NousResearch/hermes-agent/issues/143839) | Desktop 0.22.5 无法归档/删除/恢复自己的会话（`permission_denied`/`not_found`） | 未标注 |
| P2 | [#146643](https://github.com/NousResearch/hermes-agent/issues/146643) | 网关每次变更全量重读会话历史，数千会话时 CPU 飙升、桌面 30s 超时——**架构性性能问题** | 未见 fix PR |
| P2 | [#137287](https://github.com/NousResearch/hermes-agent/issues/137287) / [#129993](https://github.com/NousResearch/hermes-agent/issues/129993) | 桌面 transcript 消息重复/乱序/丢失（渲染层与持久层不一致） | 未标注 |
| P2 | [#136486](https://github.com/NousResearch/hermes-agent/issues/136486) | `reasoning` 字段别名重放导致 HTTP 400，字段拒绝学习永不触发，每回合降级 | 未标注 |
| P2 | [#143720](https://github.com/NousResearch/hermes-agent/issues/143720) | Discord 线程 `admission_conflict` 每 60s 无限重试，attempt cap 失效 | 未标注 |
| P2 | [#143150](https://github.com/NousResearch/hermes-agent/issues/143150) | multiplex 迁移后旧路由未迁移致 `storage_unavailable` | 未标注 |
| P2 | [#138105](https://github.com/NousResearch/hermes-agent/issues/138105) | multiplex cron ticker 每 60s O(profiles) 重解析配置，饿死 Discord 心跳 | 未标注 |
| 安全 | [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) | 终端环境快照将含凭据的环境变量（Bitwarden 注入）落盘 | 未标注；相关 [#149177](https://github.com/NousResearch/hermes-agent/pull/149177) 修复另一处 A2A token 问题 |

**结论**：统一网关 fallout（会话状态、消息投递）是最集中的稳定性风险簇，且多数尚无对应 fix PR，值得维护者优先排期。

## 6. 功能请求与路线图信号

- **移动端**：[#11911](https://github.com/NousResearch/hermes-agent/issues/11911)（👍15）原生 iOS/Android 语音通话——结合 [#147269](https://github.com/NousResearch/hermes-agent/issues/147269) Android beta 已达 Firebase 测试上限、[#147556](https://github.com/NousResearch/hermes-agent/issues/147556) iOS TestFlight 链接失效，**移动端已在实际推进中**，主要是分发渠道问题。
- **多 agent 协作**：[#97681](https://github.com/NousResearch/hermes-agent/issues/97681) 跨网关 Bot 协作；今日插件 PR [#149183](https://github.com/NousResearch/hermes-agent/pull/149183)（clack，端到端加密 A2A 消息）印证生态正在自下而上补齐。
- **低资源部署**：[#53347](https://github.com/NousResearch/hermes-agent/issues/53347)（👍9）允许 context_length 低于 64K，`needs-decision` 状态，落地可能性中等。
- **审计日志**：[#1155](https://github.com/NousResearch/hermes-agent/issues/1155) Agent 操作完整审计历史，由维护者本人提出，属长期路线图项。
- **内存/资源守卫**：[#56865](https://github.com/NousResearch/hermes-agent/issues/56865) 终端子进程内存守卫，已有配套 PR #57121，接近落地。
- **Kanban 多 agent 队列**：[#148761](https://github.com/NousResearch/hermes-agent/issues/148761) 提出 stranded_running 心跳规则与 worktree 独占守卫，来自真实 fleet 事故，可能被纳入。

## 7. 用户反馈摘要

- **痛点 1：网关统一后的会话丢失/不可恢复**。远程后端、multiplex 迁移、跨端 resume 多场景报 `not_found`/`storage_unavailable`，用户实际丢失了历史对话，情绪偏负面。
- **痛点 2：桌面端 transcript 渲染不可信**。消息重复、乱序、消失，虽多为渲染层问题（持久层数据完整），但直接打击日常使用信任感。
- **痛点 3：大规模部署性能**。数千会话时 CPU 与超时线性恶化，重度用户（自建 host + 多 profile）受影响明显。
- **满意点**：插件目录机制受到欢迎，第三方开发者活跃（memory provider、A2A 加密消息、语音网关等持续涌入）；统一网关"一个进程管所有本地对话"的方向本身获得认可，问题集中在执行细节；移动端 beta 前供不应求（Android 测试名额爆满），需求旺盛。
- **安全敏感用户**持续关注凭据落盘、A2A token 降级等边界问题，反馈质量高（含复现与日志）。

## 8. 待处理积压

- **[#24770](https://github.com/NousResearch/hermes-agent/issues/24770)**：302 评论、5 月创建，虽已 wontfix 但社区仍在大量讨论，建议官方给出插件化 memory provider 的正式对接指引以收敛讨论。
- **[#62336](https://github.com/NousResearch/hermes-agent/issues/62336)**：7 月报告的安全问题（凭据落盘），`needs-decision`，长期未修，建议优先。
- **[#85614](https://github.com/NousResearch/hermes-agent/issues/85614)**：8 月的 Slack bot 鉴权身份不一致问题，涉及消息投递与安全边界双重风险标签。
- **[#53347](https://github.com/NousResearch/hermes-agent/issues/53347)**：6 月提出，👍9，轻量部署强需求，`needs-decision` 悬置 4 个月。
- **[#7335](https://github.com/NousResearch/hermes-agent/issues/7335)**（已关闭）：社区曾就"开放 issue 超 1000 如何治理"发问——当前 350 新增/日 vs 20 关闭/日的比例表明该问题依然现实，建议维护者加强 triage 自动化与 fix-PR 挂钩。
- **长期在途 PR**：#87362、#85775、#85031、#86628 等 8 月提交的 ci-reviewed PR 尚未合入，建议批量推进 review 收尾。

---

**健康度小结**：项目社区活跃度极高、插件生态扩张迅速、移动端进入 beta 分发阶段；但统一网关大重构的 fallout（会话状态、性能、桌面稳定性）形成明显风险簇，且 Issue 关闭率偏低、部分安全 issue 长期悬置。短期内建议优先处理 P1 cron 丢任务、网关全量重读性能问题及桌面 transcript 渲染缺陷。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*