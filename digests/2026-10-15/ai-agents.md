# OpenClaw 生态日报 2026-10-15

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-14 23:11 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-10-15

## 1. 今日速览

OpenClaw 今日保持高度活跃：过去 24 小时内 Issues 更新 500 条（新开/活跃 310，关闭 190），PR 更新 500 条（待合并 351，已合并/关闭 149），无新版本发布。开发主线呈现两条清晰脉络：一是核心贡献者 @steipete 推动的 **Control UI 从 Lit 向 Solid 的大规模迁移重构（wave-4）**，二是大量针对 Gateway 启动、SQLite 状态库和插件生命周期的稳定性修复。社区侧，多个 P0 级稳定性问题（WAL 无限增长、插件捕获阻塞事件循环）持续发酵仍未有对应 fix PR，是当前项目健康度的主要风险点。

---

## 2. 版本发布

过去 24 小时无新版本发布。但 PR 活动显示 2026.10.5-beta 系列正在打磨更新器（updater）相关修复（见 #170331/#170332 等 beta 更新问题），且存在大量 `status: 👀 ready for maintainer look` 的 PR 待合并，预计近期将有 beta 或稳定版发布。

---

## 3. 项目进展

今日代码推进以重构与修复并重，值得关注的合并/关闭方向：

**UI Solid 迁移（wave-4 持续推进）**
- [#171555](https://github.com/openclaw/openclaw/pull/171555) / [#171646](https://github.com/openclaw/openclaw/pull/171646) / [#172300](https://github.com/openclaw/openclaw/pull/172300)：聊天预览、转写记录、状态与建议渲染器全部移植到 Solid——迁移已接近尾声
- [#171758](https://github.com/openclaw/openclaw/pull/171758) / [#171809](https://github.com/openclaw/openclaw/pull/171809)：移除配置页桥接层、退役 23 个无用 Solid 页面桥接，Lit 依赖面进一步收缩
- [#172582](https://github.com/openclaw/openclaw/pull/172582)：wave-4 deslop 批量清理

**稳定性与安全修复（security-sensitive）**
- [#172347](https://github.com/openclaw/openclaw/pull/172347)：修复运行时替换期间 updater 观察生命周期问题，避免更新后 `ERR_MODULE_NOT_FOUND` 回滚——与近期多个更新失败 Issue 直接相关
- [#172593](https://github.com/openclaw/openclaw/pull/172593)：修复 Sign in with ChatGPT 凭据过期导致的模型误回退（Fixes #172562/#172563）
- [#172590](https://github.com/openclaw/openclaw/pull/172590)：防止 automations 在交互默认值变化时切换推理账户/认证路由
- [#172619](https://github.com/openclaw/openclaw/pull/172619)：修复 provider 凭据刷新期间 hook 请求误返回 503

**其他关闭项**
- [#172612](https://github.com/openclaw/openclaw/pull/172612)（已关闭）：避免 session catalog 交付时全量重扫 agent roster
- [#172575](https://github.com/openclaw/openclaw/pull/172575)（已关闭）：修复遗留会话参与者的 sidebar 刷新死循环
- [#172600](https://github.com/openclaw/openclaw/pull/172600)（已关闭）：CI 单元测试迁至 Bun 运行

整体看，项目在 UI 架构现代化和更新器可靠性两个方向都有实质推进。

---

## 4. 社区热点

**🔥 讨论最热 Issues**

| Issue | 评论 | 核心诉求 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) P0 | **125** | Agent SQLite WAL 增长至 1.4–2.8 GB 且从不 checkpoint，阻塞 Gateway 启动。已持续月余，评论数远超其他 Issue，用户对“手动 offline checkpoint 只能暂时清零”极度不满 |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) P0 | 22 | 2026.9.6 回归：大型外部插件捕获时 Gateway 事件循环阻塞数分钟，启动和运行时重复发生 |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) P0 | 19 | Gateway 启动挂起约 17 分钟后超时失败（sidecars.model-runtime） |

**背景分析**：热度前三全部指向同一主题——**插件生成捕获（#144252 引入）与 SQLite 状态管理导致的 Gateway 启动/运行时阻塞**。相关的 [#157989](https://github.com/openclaw/openclaw/issues/157989)（每次 CLI 命令重写 1.1–1.4 GB、每次 Gateway 启动 6.5 GB，SSD 磨损）和 [#163029](https://github.com/openclaw/openclaw/issues/163029)（#160658 修复后 2026.9.7 仍有 40–70 秒中轮重载）表明该子系统是多版本回归的源头，社区对“修复后又回归”的模式耐心正在耗尽。

---

## 5. Bug 与稳定性（按严重程度）

### P0（发布阻塞级）

1. **[#143524](https://github.com/openclaw/openclaw/issues/143524)** WAL 无限增长阻塞 Gateway 启动（Windows）— ❌ 无 fix PR（125 评论，长期未解）
2. **[#160959](https://github.com/openclaw/openclaw/issues/160959)** Gateway 因插件捕获阻塞数分钟（2026.9.6 回归）— ❌ 无 fix PR
3. **[#152981](https://github.com/openclaw/openclaw/issues/152981)** Gateway 启动挂起 17 分钟超时 — ❌ 无 fix PR
4. **[#155563](https://github.com/openclaw/openclaw/issues/155563)** service-child relay/anchor 会话残留（2026.9.5 回归，此前修复已失效）— ❌ 无 fix PR
5. **[#166221](https://github.com/openclaw/openclaw/issues/166221)** 2026.9.4→9.8 升级在 SQLite 快照阶段失败 — ❌ 无 fix PR（但 #172347 可能相关）
6. **[#161216](https://github.com/openclaw/openclaw/issues/161216)** "Sign in with ChatGPT" OAuth consent 返回 invalid_client，beta 流程硬宕 — ⚠️ 待确认（#172593 涉及 SIWC）
7. **[#160770](https://github.com/openclaw/openclaw/issues/160770)** Gateway 100% CPU 挂死于启动迁移（栈溢出）— ❌ 无 fix PR

### P1 精选

- **[#159094](https://github.com/openclaw/openclaw/issues/159094)**：Gateway 持有 state-lifecycle 租约但内部 worker 报告争用冲突（2026.9.6）
- **[#165176](https://github.com/openclaw/openclaw/issues/165176)**：2026.9.8 Telegram 发起的会话所有 gateway 工具调用失败"authority no longer active"，回复丢失（涉及安全审查）
- **[#158788](https://github.com/openclaw/openclaw/issues/158788)**：Windows 上 cron agent 任务 DataCloneError 失败（clawsweeper 标注 main 上无法复现）
- **[#167791](https://github.com/openclaw/openclaw/issues/167791)**：Android/Termux 上硬链接被拒导致 Gateway/Doctor 崩溃
- **[#128809](https://github.com/openclaw/openclaw/issues/128809)**：Slack socket-mode 重连泄漏 socket 至 10 连接上限，静默失联（已造成三次生产事故）
- **[#143274](https://github.com/openclaw/openclaw/issues/143274)**：429 Retry-After 逻辑回归禁用了 auth-profile 轮换 failover

**好消息**：今日多个修复已落地 PR——#172347（updater 生命周期）、#172593（SIWC 凭据）、#172590（automations 账户漂移）、#172513（插件清理失败静默）、#172620（UI 进度行回复图标）。

---

## 6. 功能请求与路线图信号

- **[#164304](https://github.com/openclaw/openclaw/pull/164304)** `feat: let agents create independent persistent sessions`：让 agent 创建可由用户后续访问的独立持久会话——XL 级、已 ready for maintainer look，**很可能进入下一版本**，将补齐多 agent 协作的关键契约
- **[#172611](https://github.com/openclaw/openclaw/pull/172611)** Discord 线程超过对话阈值后自动命名（opt-in `autoName`）——ready for maintainer look
- **[#101422](https://github.com/openclaw/openclaw/issues/101422)**：markdown-first 工作区的记忆召回路径可配置化——长期开放，标注 needs-product-decision
- **[#66705](https://github.com/openclaw/openclaw/issues/66705)**：向 exec 子进程注入 `OPENCLAW_SESSION_KEY`/`OPENCLAW_AGENT_ID` 环境变量——已有 linked PR open，接近落地
- **[#111143](https://github.com/openclaw/openclaw/issues/111143)**：Control UI 侧栏固定插件标签页——配合当前 Solid 迁移有望顺带实现
- **[#138245](https://github.com/openclaw/openclaw/issues/138245)**：输出守卫（捕获伪 tool-call 文本、流重复/长度守卫）——needs-product-decision

**路线图信号**：wave-4 deslop + Solid 迁移收尾、CI Bun 化（#172600）、updater 可靠性专项修复，指向下一版本的主题是**UI 架构定型 + 更新链路加固**。

---

## 7. 用户反馈摘要

**痛点集中区**
- **升级恐惧**：多个 Issue（#166221、#168895、#160770、#170331）反映跨版本升级失败、Gateway 无法启动，用户在生产环境形成“不敢升级”心态
- **消息丢失是最高频 impact 标签**：Telegram 投递丢失（#127229、#126246）、subagent 最终答案被 retention 截断（#155119）、会话间投递死循环（#158332）——聊天机器人场景的核心信任问题
- **资源消耗**：WAL 巨型化（#143524）、插件捕获 SSD 磨损（#157989）、OOM（#99659）——自托管/低配 VPS 用户体验受损
- **可诊断性差**：[#172053](https://github.com/openclaw/openclaw/issues/172053)（已关闭）"The CLI command failed" 无 Reason 行，systemd 崩溃循环无法从 journal 定位原因

**满意点**
- `openclaw doctor` 自诊断报告格式（#168895 用户主动提交结构化报告）获得正面使用反馈
- 平台覆盖广：Windows、macOS、Linux、Docker、Android/Termux、GKE 均有活跃用户，社区复现能力（source-repro 标签）强，多个 Issue 由社区完成根因定位（如 #139578 对 #134389 "无法复现”结论的反驳）

---

## 8. 待处理积压（提醒维护者关注）

| Issue | 状态 | 关注理由 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | OPEN，9/9 创建，125 评论 | **全项目最热且无 fix PR**，P0 + release blocker，needs-maintainer-review 已久 |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) / [#157989](https://github.com/openclaw/openclaw/issues/157989) / [#163029](https://github.com/openclaw/openclaw/issues/163029) | OPEN | 插件捕获子系统三个关联 P0/P1，多版本回归，需系统性架构决策而非逐个补丁 |
| [#48709](https://github.com/openclaw/openclaw/issues/48709) | OPEN，3/17 创建，标记 stale | Gemini 2.5 Pro 会话膨胀 + 静默投递失败，7 个月未解 |
| [#38091](https://github.com/openclaw/openclaw/issues/38091)（已关闭）/ [#85246](https://github.com/openclaw/openclaw/issues/85246)（已关闭） | 近期批量关闭 | 一批长期 stale Issue 被关闭，建议确认是“已解决”还是“过期清理”，避免用户问题悬空 |
| [#139578](https://github.com/openclaw/openclaw/issues/139578) | OPEN，stale | 社区已提供源码级复现反驳官方“无法复现”结论，需重新评估 |
| 待合并 PR：#164304、#162811 相关、#172513、#172458 | ready for maintainer look | 多个质量充分的 PR 停留在维护者审查队列 |

**健康度小结**：社区参与度与贡献质量优秀（复现详尽、PR 活跃），但 P0 级稳定性问题修复速度明显落后于报告速度，插件捕获/SQLite 子系统的技术债是下一版本前最需要收敛的风险。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告 · 2026-10-15

## 1. 生态全景

个人 AI 助手/自主智能体赛道已进入**架构重构深水期**：头部项目均在向“统一网关 + 多平台消息桥接 + 插件化”的形态收敛，OpenClaw 推进 Control UI 向 Solid 迁移收尾，Hermes Agent 刚落地统一网关这一巨型架构变更。生态整体呈“高活跃、高欠账”特征——单日 Issues 更新均在 300+ 条量级，但 P0 级稳定性问题（启动阻塞、消息丢失、资源泄漏）修复速度普遍落后于报告速度。用户画像已从早期尝鲜者转向**生产环境自托管重度用户**，升级可靠性与计费正确性成为信任分水岭。消息平台（Telegram/Discord/Slack/WhatsApp）桥接是事实上的核心使用场景，多 agent 协作与记忆管理成为下一阶段功能竞争焦点。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 310，关闭 190） | 321（新开/活跃 302，关闭 19） |
| Issue 关闭率 | ~38%（190/500） | **~6%（19/302）** |
| PR 更新（24h） | 500（待合并 351，已合并/关闭 149） | 500（待合并 403，合并/关闭 97） |
| PR 合并率 | ~30% | ~19% |
| Release | 无（beta 打磨中） | v0.22.0（10-13，2,050 contributors 量级巨型发布） |
| 当前阶段 | 重构收尾 + 稳定性修复期 | 大重构后的回归修复/稳定化期 |
| 主要风险 | 插件捕获/SQLite 子系统多个 P0 无 fix PR（最热 #143524 125 评论） | Issue 积压严重、贡献者权限问题（#131859）阻塞外部贡献 |
| 健康度评估 | **B+**：修复节奏健康但 P0 长期悬置 | **B**：活力极强但治理消化能力跟不上规模 |

## 3. OpenClaw 在生态中的定位

- **优势**：Issue 关闭率（38% vs 6%）和 PR 合并率（30% vs 19%）显著优于 Hermes，治理消化能力强；核心贡献者驱动明确（@steipete 的 wave-4）；`openclaw doctor` 自诊断、社区 source-repro 复现能力获得正反馈，社区工程素养高。
- **技术路线差异**：OpenClaw 采用“渐进式 UI 迁移 + 更新器加固”的稳健路线；Hermes 则是“一步到位的统一网关大爆炸式重构”（~15,600 文件、±300 万行），短期回归风险更高但架构统一更彻底。
- **社区规模**：两者单日动态量级相当（Issues+PR 均 ~1000 条更新），但 Hermes 的 v0.22.0（~2,520 contributors）显示其贡献者基数更庞大；OpenClaw 的贡献更集中、审查队列周转更快（149 vs 97 合并/关闭）。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| 网关/生命周期稳定性 | #143524/#152981/#160770（启动阻塞、WAL、挂死） | #138343/#138624（重启循环、恢复） | 进程退出/重启后的干净恢复是双方 P0 集中区 |
| 更新链路可靠性 | #172347（updater 生命周期）、升级失败系列 Issue | Windows DACL #122935、误报失败 #106592 | 用户“不敢升级”心态是共同痛点 |
| 多 agent 会话/子代理 | #164304（agent 独立持久会话） | #133212（subagent_lifecycle v1.1）、#131578 | 会话归属、委派结果可靠性、host 隔离 |
| 消息平台桥接可靠性 | Telegram 投递丢失 #127229/#126246 | Telegram 话题路由 #136567、WhatsApp #68128 | 消息丢失是双项目最高频 impact 标签 |
| 记忆/成本管理 | #101422（记忆召回路径） | #135039（MEMORY.md 写入预算）、#133999（缓存驱逐） | 每轮注入成本与凭据/计费正确性 |
| 安全审查/权限门控 | #165176（authority 失效） | #138664（allowlist 与审批门控回归） | 共享网关下的权限边界重定义 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | Control UI 桌面控制面、automations/cron、插件生命周期管理 | 多平台聊天桥接（Telegram/WhatsApp/Discord/飞书）、skills 学习机制、本地/远程多 backend |
| 目标用户 | 自托管桌面/服务器用户，重视 UI 可视化管控 | 把 AI 当“随身个人助理”的重度消息平台用户（"I use Hermes because it learns"） |
| 技术架构 | Gateway + SQLite 状态库 + Lit→Solid UI；CI Bun 化 | 统一网关接管全部 session；ACP 协议；CI blacksmith.sh |
| 秘密/凭据管理 | Sign in with ChatGPT、provider 凭据轮换 | Proton Pass 秘密源插件、Anthropic 凭据池 |
| 短板 | Windows 体验、插件捕获子系统技术债 | Windows 体验、贡献流程治理、Issue 积压 |

## 6. 社区热度与成熟度

- **快速迭代期**：Hermes Agent——v0.22.0 后单日 8+ 个网关回归修复 PR，处于典型“大合并后收敛期”；贡献者基数大（~2,520），但关闭率 6% 表明 triage 能力不足。
- **质量巩固期**：OpenClaw——Solid 迁移近尾声、updater 专项加固、大量 `ready for maintainer look` PR 待审，指向下一版本“UI 定型 + 更新链路加固”。
- 两者共同点：单日 300+ 新增/活跃 Issue 说明生态需求侧仍在爆发；差异在于 OpenClaw 债务集中在**单一子系统**（插件捕获/SQLite），Hermes 的债务是**弥散式**的（回归面广、积压多）。

## 7. 值得关注的趋势信号

1. **“统一网关”成为架构共识**：两大项目不约而同收敛到单一网关接管 session/审批/路由的模型，多进程碎片化模式被淘汰——对开发者的启示：插件/hook 系统必须为共享网关环境重新设计权限与隔离。
2. **升级可靠性 = 留存生命线**：双项目用户的“升级恐惧”反馈表明，自托管场景下 updater 和迁移脚本值得投入工程资源专项建设，而非附带产物。
3. **消息丢失是最高信任成本**：所有项目中 impact 最高频的标签均为消息投递失败——聊天机器人形态的产品中，可靠性 > 功能丰富度。
4. **成本/计费可观测性需求上升**：凭据池计费错误、缓存驱逐浪费、stale 投递烧配额（Hermes #118379/#133999/#138343）反映重度用户对 token/配额级别的细粒度账务需求。
5. **多 agent 契约与记忆预算是下一竞争高地**：OpenClaw #164304（agent 独立持久会话）与 Hermes #133212/#135039 同期涌现，暗示 2027 年的方向是从单 agent 助手走向带成本预算的多 agent 编排。
6. **贡献通道治理即社区健康**：Hermes #131859（贡献者无法开 PR）造成的实际流失是警示——在万人级贡献者生态中，权限与流程基建的重要性不亚于代码本身。

**给技术决策者的建议**：生产环境选型上，OpenClaw 当前治理质量略优但需规避 Windows + 插件捕获场景；Hermes 功能面更贴合多平台个人助理场景，但建议等 0.22.1 hotfix 后再升级。两者均不宜直接承载关键业务消息链路，需自建投递审计兜底。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目日报 — 2026-10-15

## 1. 今日速览

Hermes Agent 今日处于**高活跃度状态**：过去 24 小时 Issues 更新 321 条（新开/活跃 302，关闭 19），PR 更新 500 条（待合并 403，合并/关闭 97），显示社区参与极为旺盛但 Issue 关闭率偏低（约 6%）。核心主题是 **v0.22.0 "Threshold Release" 发布后的统一网关（unified gateway, #106742）落地**，主仓库于 10 月 14 日合并了这一巨型 PR，大量后续修复 PR 今日密集涌现。Windows 平台兼容性问题持续多发，Telegram/WhatsApp 等消息平台桥接问题仍是高频反馈点。整体看，项目处于大重构后的**收敛与修复期**，健康度良好但需关注 P0/P1 级稳定性问题。

## 2. 版本发布

### v0.22.0 — "The Threshold Release"（发布于 2026-10-13）

自 v0.21.0 以来的规模极其可观：
- **~24,200 commits / ~6,080 merged PRs / ~2,520 contributors**
- **~15,600 files changed**，+2,045,000 / -1,140,000 行
- **~7,180 issues closed**

核心内容（结合 PR 流向推断）：
- **统一网关运行时（#106742）**：一个 gateway 接管所有本地 session，取代此前的多进程/桌面驱动模式——这是本次发布最大的架构变更
- 后续追踪 Issue [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) 已列出 post-merge 修复清单

**迁移注意事项**：
- 统一网关改变了路径解析、审批门控、ACP 会话元数据等行为，已有多个修复 PR 在途（见下文）
- 0.22.1 hotfix 分支已存在（[PR #138655](https://github.com/NousResearch/hermes-agent/pull/138655) 正在回合并入 main，含网关 host-record 存活检测与本地模型笔记本修复），升级 0.22.0 的用户建议等待 0.22.1

## 3. 项目进展

今日最显著的进展是**统一网关合并后的快速补救**，由 @unsupportedpastels 一人密集提交了系列修复：

| PR | 内容 |
|---|---|
| [#138624](https://github.com/NousResearch/hermes-agent/pull/138624) (P1) | 网关重启后干净恢复：修复 `hermes gateway restart` 可能导致无网关存活、CLI 无法重连、排队 API 调用被误拒等 4 个问题 |
| [#138665](https://github.com/NousResearch/hermesResearch/hermes-agent/pull/138665) | 本地路径按 session 目录而非 daemon CWD 解析（影响所有 backend：ssh/modal/local/docker） |
| [#138664](https://github.com/NousResearch/hermes-agent/pull/138664) | 安全性回归修复：allowlist 移除与插件审批门控在共享网关下重新生效 |
| [#138667](https://github.com/NousResearch/hermes-agent/pull/138667) / [#138666](https://github.com/NousResearch/hermes-agent/pull/138666) / [#138668](https://github.com/NousResearch/hermes-agent/pull/138668) | Ink TUI / Desktop 路由补全、ACP 会话元数据恢复、经典 CLI 命令改从网关读取状态 |

其他重要进展：
- [#138669](https://github.com/NousResearch/hermes-agent/pull/138669)：恢复 hosted-room 成员身份传递，群聊成员轮次重新可用（#106742 回归）
- [#138656](https://github.com/NousResearch/hermes-agent/pull/138656)：插件 hook runner 卡死 worker 槽位老化回收，修复 fail-closed 死锁
- [#137348](https://github.com/NousResearch/hermes-agent/pull/137348)：Telegram DM 新话题首条消息路由修复（对应 Issue #136567）
- 生态扩展：[#138662](https://github.com/NousResearch/hermes-agent/pull/138662) 新增 Proton Pass 秘密源插件、[#138652](https://github.com/NousResearch/hermes-agent/pull/138652) Ando 平台升级 v0.2.1
- 基建：[#137895](https://github.com/NousResearch/hermes-agent/pull/137895) CI 全面迁移至 blacksmith.sh runners（更快更便宜）

**整体评估**：统一网关这一架构级改造正式入 main，项目向前迈出了一大步；但短期内回归修复量（今日 8+ 个 gateway 相关 PR）表明仍处稳定化阶段。

## 4. 社区热点

1. **[#127665](https://github.com/NousResearch/hermes-agent/issues/127665)**（58 评论）— Desktop 同一条回复渲染两次，与 #127288 同症状但不同代码路径，是桌面端会话流式渲染的顽固 bug，社区连续跟踪两周
2. **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)**（41 评论）— 贡献者 @kuehnberger 的账号无法对主仓库开 PR（CreatePullRequest 权限被拒），已影响外部贡献（#137348 被迫以 draft 重开）。**这是流程性问题，建议维护者优先处理**
3. **[#136567](https://github.com/NousResearch/hermes-agent/issues/136567)**（23 评论，5 👍）— Telegram 论坛话题首条消息无 thread_id 被 lobby 恢复逻辑误路由；已有 fix PR #137348 在途
4. **[#95163](https://github.com/NousResearch/hermes-agent/issues/95163)**（17 评论）— 群聊房间编排从桌面渲染器迁到网关侧 authoritative room log，与刚合并的统一网关方向契合，**很可能获得推进**
5. **[#123926](https://github.com/NousResearch/hermes-agent/issues/123926)**（19 评论）— 启动时随机插件静默加载失败（`sys.modules` 迭代中修改字典），影响可观测性

## 5. Bug 与稳定性（按严重程度）

**P0：**
- [#138343](https://github.com/NousResearch/hermes-agent/issues/138343)：网关不干净退出后**重启循环**，cron 被搁浅，stale 异步委派重复投递**烧掉 provider 配额**。部分修复已在 PR #138342（pid 回收检测），对应 #138594/#138655 的 host-record liveness 修复
- [#133999](https://github.com/NousResearch/hermes-agent/issues/133999)：出站图片 20 张阈值驱逐不必要地重写缓存前缀，造成缓存成本浪费（needs-decision）

**P1：**
- [#131578](https://github.com/NousResearch/hermes-agent/issues/131578)：后台子代理进程完成时错误抢占聊天路由，**阻塞会话 30 分钟并丢失委派结果**（跨 Telegram/Discord/Slack/飞书）
- [#122935](https://github.com/NousResearch/hermes-agent/issues/122935)：Windows `hermes update` 留下硬化 DACL，非提权进程无法执行托管 python/node
- [#118379](https://github.com/NousResearch/hermes-agent/issues/118379)：Anthropic 凭据池轮换被 per-request refresh 回滚，两个订阅按一个计费后 fallthrough 到其他 provider（**计费正确性问题**）
- [#122555](https://github.com/NousResearch/hermes-agent/issues/122555)：pm 激活依赖环境无 ABI 检查，可能加载错解释器构建的环境
- 统一网关重启恢复（PR #138624 已在途 ✅）

**P2：**
- [#121095](https://github.com/NousResearch/hermes-agent/issues/121095)：browser_exec 泄漏 browser_harness 守护进程
- [#106592](https://github.com/NousResearch/hermes-agent/issues/106592)：远程 Desktop 更新 systemd 重启成功却误报失败
- [#48523](https://github.com/NousResearch/hermes-agent/issues/48523)：网关重放会话未剥离内部元数据字段，strict provider 返回 400
- [#79021](https://github.com/NousResearch/hermes-agent/issues/79021)：`hermes doctor` 报 3 个 npm 高危漏洞且自动修复失败（4 👍）

## 6. 功能请求与路线图信号

可能纳入下一版本（已有 PR 或与统一网关方向契合）：
- **[#95163](https://github.com/NousResearch/hermes-agent/issues/95163)** 网关侧群聊房间编排 — #138669 的 hosted-room 修复暗示该方向已在活跃开发
- **[#80222](https://github.com/NousResearch/hermes-agent/issues/80222)** delegate_task 按次覆盖 model/reasoning_effort — 相关 #17685（per-task model 被忽略）今日刚关闭，**信号强烈**
- **[#135039](https://github.com/NousResearch/hermes-agent/issues/135039)** MEMORY.md 写入预算与准入管道 — 直击每轮注入的延迟/成本，属高价值优化
- **[#137258](https://github.com/NousResearch/hermes-agent/issues/137258)** 上游拥有的捆绑 skills + 用户控制学习
- **[#133212](https://github.com/NousResearch/hermes-agent/issues/133212)** subagent_lifecycle v1.1（steer / host 隔离传输 / effort 路由）
- **[#67347](https://github.com/NousResearch/hermes-agent/issues/67347)** 子代理模型/Provider 引导式选择器（UX 打磨类，易纳入）

## 7. 用户反馈摘要

- **痛点集中在 Windows 平台**：更新后 DACL 权限（#122935）、WhatsApp 桥接 WinError 5（#68128）、更新进程不可见（#123490）、Git Bash 路径附件预览失败（PR #138598）——Windows 用户群庞大且体验明显劣于 macOS/Linux
- **消息平台桥接是核心使用场景**：Telegram 话题路由、WhatsApp 换号后 self-chat 失联（PR #88742）、Buzz 静默连接被误判断线（#101160）——用户把 Hermes 当作多平台个人助理使用
- **成本/计费敏感**：图片驱逐重写缓存（#133999）、Anthropic 凭据池计费错误（#118379）、stale 投递烧配额（#138343）反映了重度用户的真实开销焦虑
- **满意度信号**：插件生态活跃（社区插件目录持续新增条目）、skills 学习机制被用户明确认可（#137258："I use Hermes because it learns"）
- **贡献流程受阻**：#131859 的 PR 权限问题已实际造成贡献流失（fork 被删重建、PR 只能以 draft 提交）

## 8. 待处理积压（建议维护者关注）

| Issue | 年龄 | 状态 | 说明 |
|---|---|---|---|
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) | 12 天 | blocked | 贡献者 PR 权限问题，直接影响社区贡献通道，**优先处理** |
| [#48523](https://github.com/NousResearch/hermes-agent/issues/48523) | ~4 个月 | OPEN | 网关模式 strict provider 400，随统一网关合并影响面扩大 |
| [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) | ~3 个月 | OPEN | Windows WhatsApp 桥接 job object 兼容，文档已承诺的 fallback 未实现 |
| [#62548](https://github.com/NousResearch/hermes-agent/issues/62548) | ~3 个月 | OPEN | ACP 后台完成通知丢失，与 #131578 同根因，建议一并处理 |
| [#79021](https://github.com/NousResearch/hermes-agent/issues/79021) | ~2 个月 | OPEN | npm 漏洞告警持续骚扰所有 `hermes doctor` 用户（4 👍） |
| [#101160](https://github.com/NousResearch/hermes-agent/issues/101160) | ~6 周 | OPEN | Buzz relay 每 300s 无谓重连，静默期死判 |
| PR [#100593](https://github.com/NousResearch/hermes-agent/pull/100593) | ~6 周 | OPEN | Windows SSH 多项修复，长期未合并 |

**健康度提示**：今日 Issue 关闭仅 19 / 302，叠加 403 个待合并 PR，建议在 0.22.x 稳定化周期内组织一次集中 triage，优先消化统一网关回归与 P0/P1 队列。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*