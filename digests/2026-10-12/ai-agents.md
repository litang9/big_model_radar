# OpenClaw 生态日报 2026-10-12

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-11 23:38 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-10-12

---

## 1. 今日速览

OpenClaw 过去 24 小时保持高度活跃：Issues 更新 500 条（新开/活跃 338，关闭 162），PR 更新 500 条（待合并 347，已合并/关闭 153），且发布了 **2 个新版本**（v2026.10.1 稳定版 + v2026.10.5-beta.1），显示出强劲的交付节奏。v2026.10.1 为一个大规模版本，包含 3,055 commits、2,425 PR、402 位贡献者。但值得警惕的是，社区讨论热度最高的仍是**网关内存泄漏、SQLite WAL 无限增长、更新流程永久阻塞**等 P0 级稳定性问题，且新版 v2026.10.1 在 Windows 上出现了明显的启动性能回归。总体判断：项目处于高速迭代期，功能面持续扩张，但稳定性债务在累积，更新器/生命周期管理是当前最集中的痛点域。

---

## 2. 版本发布

### v2026.10.1（稳定版）
- **规模**：3,055 commits · 2,425 pull requests · 402 contributors，为大型里程碑版本
- 详见[Release Notes](https://docs.openclaw.ai/release)
- ⚠️ **注意**：发布当天即有 Windows 用户报告启动性能回归（见第 5 节 #168955），建议 Windows 用户观望或保留 2026.9.9

### v2026.10.5-beta.1
- **Highlights — 更安全的更新机制**：
  - 更新可跨设备、跨文件系统完成，支持 Windows 提权场景
  - 中断的激活流程可恢复
  - 可从过期 lease 或变更的 evidence 中恢复，不再卡死安装或阻塞后续更新（修复 #164636、#164769、#165257、#165863 等）
- **迁移提示**：此 beta 版主要针对更新器可靠性问题（#167771、#167506 等用户受困场景），受更新阻塞困扰的用户可关注此版本

---

## 3. 项目进展

今日 PR 活动以性能优化、Control UI 的 Solid 2 迁移和更新器加固为主线：

- **[#169293](https://github.com/openclaw/openclaw/pull/169293)** chore(release): close out 2026.10.1 on main —— 稳定版正式收口 main 分支，绑定不可变的贡献记录
- **[#169442](https://github.com/openclaw/openclaw/pull/169442)** chat rails/header 移植到 Solid；配合 **[#169247](https://github.com/openclaw/openclaw/pull/169247)**（Solid 升级 rc.14），Control UI 框架迁移持续推进，涉及 Canvas/X/Workboard 多个面
- **[#169363](https://github.com/openclaw/openclaw/pull/169363)** 隐身（incognito）会话改为纯内存 actor，去除独立 SQLite owner，简化状态管理并提升隐私
- **[#169358](https://github.com/openclaw/openclaw/pull/169358)** 复用历史图片重编码，每轮节省 0.9–1.2s/图，多媒体对话延迟显著下降
- **[#168671](https://github.com/openclaw/openclaw/pull/168671)** 允许本地 Gateway 运行时进行 provider 登录，修复高频登录被拒问题
- **[#168632](https://github.com/openclaw/openclaw/pull/168632)** 修复 Gateway 关闭失败时遗留 agent 数据库 lease 的问题，直接缓解重启恢复链路（关联 #91588、#158126 一类 crash-loop）
- **[#169437](https://github.com/openclaw/openclaw/pull/169437)** CI 修复：Security Review 曾因每条 PR 评论触发一次运行，24 小时内产生 **30,115 次 Actions 运行**——工程效率层面的重要止损

**总体评估**：单日推进约 150+ 个 PR 合并/关闭，覆盖更新器、UI 框架、性能、安全四个方向，节奏健康。

---

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 122 评论 | **P0**：Windows 下 agent SQLite WAL 几天内膨胀至 1.4–2.8GB，阻塞网关启动；手动 checkpoint 后复发。社区长期跟进中，尚无修复 PR |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 38 评论 | **P0**：Gateway 内存泄漏，RSS 从 350MB 涨至 15.5GB，反复 OOM，自 6 月开放至今 4 个月未解 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) / [#148707](https://github.com/openclaw/openclaw/issues/148707) | 各 18 评论 | 僵尸子进程累积；2026.9.4 回归导致回复丢失（"no active tool authority snapshot"）|
| [#157989](https://github.com/openclaw/openclaw/issues/157989) | 15 评论 | 插件源捕获每条 CLI 命令重写 1.1–1.4GB、每次 Gateway 启动 6.5GB，**SSD 磨损**问题引发用户强烈不满 |
| [#160521](https://github.com/openclaw/openclaw/issues/160521) | 15 评论 | 状态库 seal → 未处理 rejection → 网关崩溃链 |

**分析**：热点集中在两类诉求——(1) 长期未修的资源泄漏类 P0（内存、WAL、进程、磁盘写入），用户耐心明显消耗；(2) 更新/生命周期管理把用户“锁死”在异常状态且无自助修复路径。大量 issue 带 `clawsweeper:needs-maintainer-review` / `needs-product-decision` 标签，表明分诊机制在运转但维护者带宽是瓶颈。

---

## 5. Bug 与稳定性（按严重程度）

**P0**
- [#143524](https://github.com/openclaw/openclaw/issues/143524) SQLite WAL 无限增长阻塞启动（Windows）— ❌ 无 fix PR
- [#91588](https://github.com/openclaw/openclaw/issues/91588) Gateway 内存泄漏致 OOM crash-loop — ❌ 无 fix PR（#168632 部分相关）
- [#160521](https://github.com/openclaw/openclaw/issues/160521) reconcileActive 未处理 rejection 崩溃 — ❌
- [#155191](https://github.com/openclaw/openclaw/issues/155191) 2026.9.5 原生内存泄漏，RSS 每 30s 涨 1GiB — ❌
- [#167771](https://github.com/openclaw/openclaw/issues/167771)（已关闭）更新被 update-recovery-pending 永久阻塞 — beta.1 针对性修复
- [#167506](https://github.com/openclaw/openclaw/issues/167506)（已关闭）已删除的 handoff 数据库阻塞所有更新 — beta.1 覆盖

**P1**
- [#168955](https://github.com/openclaw/openclaw/issues/168955) ⚠️ **新版回归**：2026.10.1 Windows 启动从 ~410s 恶化到 ~1030s，`sidecars.control-ui-assets` 阻塞 477s — ❌（今日新报）
- [#148707](https://github.com/openclaw/openclaw/issues/148707) 2026.9.4 回归：并发 turn 导致回复丢失 — ❌
- [#166665](https://github.com/openclaw/openclaw/issues/166665) 压缩失败后自我抑制，会话转录膨胀 150 倍上限 — ❌
- [#162914](https://github.com/openclaw/openclaw/pull/162914 所在 issue 162914) rootless Podman 沙箱 5–7 秒内间歇性 Abort
- [#158788](https://github.com/openclaw/openclaw/issues/158788) Windows cron 任务 DataCloneError

**已修复/有关联 PR**
- [#164113](https://github.com/openclaw/openclaw/issues/164113)（已关闭）LXC 容器内 FICLONE EPERM 更新失败
- [#87763](https://github.com/openclaw/openclaw/issues/87763)（已关闭）SSRF guard DNS dispatcher 超时
- [#169403](https://github.com/openclaw/openclaw/pull/169403)（已关闭）macOS 首次运行认证失败 + 提速

---

## 6. 功能请求与路线图信号

- [#74481](https://github.com/openclaw/openclaw/issues/74481) 从 provider `/v1/models` 动态刷新模型目录 —— 代理/自建网关用户刚需，讨论持续，有希望进入路线图
- [#77886](https://github.com/openclaw/openclaw/issues/77886) 受保护配置变更的 owner-审批流（安全+UX 双标签），信号强烈
- [#14785](https://github.com/openclaw/openclaw/issues/14785) 降低工具 schema 固定 ~3,500 token 开销 —— 与已合并的 deferred-tool 方向一致，配合 #169358 等性能 PR，token/性能优化是明确主线
- [#111143](https://github.com/openclaw/openclaw/issues/111143) Control UI 插件标签页固定到侧栏 —— 随 Solid 2 迁移（#169442）大概率一并实现
- **从 PR 侧看下一版本方向**：更新器可靠性（beta.1 已验证）、Solid 2 UI 全面迁移、隐身会话内存化、状态库性能（#169424）。

---

## 7. 用户反馈摘要

- **最强烈不满**：资源泄漏类问题长期悬而未决（#91588 达 4 个月）；[#88087](https://github.com/openclaw/openclaw/issues/88087) 用户因后台任务 UX 差 + cron 静默失败直接放弃 DigitalOcean 部署——“成本不值这个体验”
- **硬件担忧**：#157989 / #162585 反映 SSD 写入磨损，Windows 插件用户受影响最大
- **正面信号**：v2026.10.1 的 402 contributors 展示社区参与广度；更新器在 beta.1 中针对用户反馈快速迭代获得认可；#169358（图片编码复用）等性能 PR 响应了真实延迟痛点
- **典型场景**：单网关 Windows/Linux 长驻部署、WhatsApp/Telegram/LINE 多通道接入、cron 定时任务 + 子代理编排是最高频使用模式，也是 bug 集中区

---

## 8. 待处理积压（提醒维护者）

| Issue | 开放时长 | 状态 |
|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) 内存泄漏 P0 | **4 个月+** | needs-maintainer-review，无修复进展 |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) WAL 膨胀 P0 | 1 个月，122 评论 | 无 fix PR |
| [#39476](https://github.com/openclaw/openclaw/issues/39476) A2A sessions_send 回环重复消息 P1 | 7 个月 | needs-live-repro |
| [#77886](https://github.com/openclaw/openclaw/issues/77886) 安全审批流 P2 | 5 个月 | 多标签积压 |
| [#107244](https://github.com/openclaw/openclaw/issues/107244) WhatsApp 群消息不入站 P1 | 3 个月 | stale |
| [#105528](https://github.com/openclaw/openclaw/issues/105528) Windows exec/read 静默空输出 P2 | 3 个月 | 无修复 |
| PR [#142888](https://github.com/openclaw/openclaw/pull/142888) OpenAI 兼容流式文本重复修复 | 1 个月 | waiting on author，message-delivery 合并风险高 |

**健康度小结**：交付速度快、社区活跃度高，但 P0 资源泄漏问题的平均解决周期偏长，且新版回归（#168955）需在下一个 patch 中优先处理。建议维护者优先清偿 `impact:crash-loop` + `P0` 交叉标签的积压队列。

---
*数据来源：GitHub API（Issues/PR/Releases），统计窗口 2026-10-11 至 2026-10-12。*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告
**数据窗口：2026-10-11 至 2026-10-12（UTC）**

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道已进入“重运维、重可靠性”的深水区：头部项目日均 Issue/PR 更新量均达数百条，社区参与度极高（OpenClaw 单版本 402 位贡献者），但讨论热点已从功能新鲜感转向**资源泄漏、更新可靠性、数据完整性**等工程化难题。两个代表性项目（OpenClaw、Hermes Agent）呈现出相似的矛盾——交付速度快于稳定性清偿速度，P0 级问题积压成为共同痛点。多通道消息接入（Telegram/WhatsApp）、cron 任务编排、VPS 长驻部署是最高频使用模式，也构成 bug 集中区。整体生态处于**高速扩张与稳定性债务同步累积**的阶段。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 338，关闭 162） | 316（新开/活跃 286，关闭 30） |
| PR 更新（24h） | 500（待合并 347，合并/关闭 153） | 500（待合并 410，合并/关闭 90） |
| 新版本 | **2 个**（v2026.10.1 稳定版 + v2026.10.5-beta.1） | 0 |
| 贡献者规模 | 402（单版本） | 以核心维护者 + salvage 社区贡献为主 |
| 关闭率（issues） | ~32% | ~10% |
| PR 待合并积压 | 347 | 410 |
| P0 未修问题 | 4 项（内存/WAL/崩溃链） | 1 项（scratch prune 数据丢失） |
| 新版回归 | ⚠️ v2026.10.1 Windows 启动 410s→1030s | 无 |

**健康度评估**：
- **OpenClaw**：交付节奏极快（单日 150+ PR 收口、2 个版本），但 P0 资源泄漏平均解决周期 1–4 个月，Windows 平台为薄弱面。评级：**高速迭代期，稳定性债务偏高**。
- **Hermes Agent**：响应速度快（多个当日 issue 当日出 fix PR），但 Issue 关闭率仅 ~10%、410 条 PR 待审，**审阅吞吐是明显瓶颈**。评级：**快速迭代期，流程瓶颈初现**。

---

## 3. OpenClaw 在生态中的定位

**优势**：
- **社区规模与交付速度领先**：402 contributors、单版本 3,055 commits，显著大于 Hermes 的核心维护者驱动模式；分诊机制（`needs-maintainer-review`/`needs-product-decision` 标签）运转有序。
- **产品化程度高**：稳定版 + beta 双轨发布，beta.1 针对更新器可靠性快速响应社区受困场景，获得正面反馈。
- **性能优化主线明确**：图片重编码复用（每图省 0.9–1.2s）、deferred-tool 降低 token 开销，方向连贯。

**技术路线差异**：
- OpenClaw 走 **Gateway 中心化架构 + Control UI（Solid 2 迁移中）+ 多通道接入**，复杂度高（SQLite owner/lease、sidecar、状态库 seal 机制），也因此成为泄漏类 bug 的温床。
- Hermes Agent 走 **CLI/Desktop 双产品线 + Ownership Refactor 架构治理**，主动拆分 Profiles/Gateway/插件运行时归属域，架构债务管理更有前瞻性；salvage 署名保留机制降低了贡献门槛。

**相对劣势**：P0 清偿速度慢于 Hermes（#91588 内存泄漏 4 个月未修 vs Hermes 当日响应）；Windows 体验（WAL 膨胀、启动回归、cron DataCloneError）是系统性短板。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw 证据 | Hermes Agent 证据 |
|---|---|---|
| **更新/生命周期可靠性** | #167771/#167506 更新永久阻塞（beta.1 修复）；#164636 系列 | #125437 半装无恢复（P1，一周 15 个 Discord 帖）；#107427 更新器自杀式重启 |
| **长会话上下文管理** | #166665 压缩失败→转录膨胀 150 倍 | #120582 prune+compression 截断数据（生产事故）；#135039 MEMORY.md 写入预算；#86421 技能重注入 |
| **子进程/后台任务治理** | #97616 僵尸子进程；#88087 cron 静默失败 | #121095 僵尸 daemon；#131578 子代理卡死 30 分钟；#56865 子进程内存上限 |
| **消息多通道路由** | #107244 WhatsApp 群消息不入站；LINE/Telegram 接入 | #136567 Telegram topic 路由错误（当日修复 #136832） |
| **数据持久层安全** | #143524 SQLite WAL 膨胀；#160521 状态库崩溃链 | #132401 scratch 静默删除；state.db 损坏证据 |
| **本地小模型兼容** | 动态模型目录请求（#74481） | 小模型行为退化（#69777 编造结果、#56004 思考链剥离） |

结论：**更新可靠性、上下文压缩完整性、后台任务治理**是两个项目共同的三大风险域，指向行业级共性难题而非单项目实现缺陷。

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | Gateway 网关 + Web Control UI + 插件生态 + 隐私（隐身会话内存化） | CLI + Desktop 双端 + Composio 19+ SaaS OAuth 集成 |
| 目标用户 | 单网关长驻部署、Windows/Linux 桌面用户、多通道消息重度用户 | 偏运维/自动化重度用户（NixOS/Ansible/systemd、VPS 部署、Telegram forum topics 进阶用法） |
| 技术架构 | Solid 2 前端 + SQLite 状态机 + sidecar + 更新器（复杂、中心化） | Ownership Refactor 分域治理 + kanban 自动化调度 + Vault/浏览器工具链 |
| 安全路线 | SSRF guard、owner-审批流请求（#77886） | 阻止 agent 会话写配置、浏览器工具会话门控、Vault OTP |
| 平台重心 | Windows 问题密集（回归、WAL） | Linux 桌面/服务化部署更成熟 |

---

## 6. 社区热度与成熟度

- **快速迭代期（功能扩张 > 质量巩固）**：
  - **OpenClaw**——版本节奏最快，但新版即现 Windows 启动回归，稳定性债务在累积，尚未进入质量巩固阶段。
  - **Hermes Agent**——架构重构与功能并行，社区反馈响应最快，但 10% 的 Issue 关闭率与 410 条 PR 积压说明治理带宽不足。
- **质量巩固信号**：两者均有局部迹象——OpenClaw 更新器加固 beta、CI 止损（30,115 次 Actions 运行修复）；Hermes 工具参数校验、深回退兼容性修复。但都属**被动清偿**，尚无系统性 P0 清偿计划。
- **成熟度差距**：OpenClaw 社区广度领先（402 vs 核心维护者驱动），Hermes 响应深度领先（当日 issue 当日 fix）。

---

## 7. 值得关注的趋势信号

1. **“稳定性即护城河”**：两个项目热度最高的 issue 全是资源泄漏与数据丢失类，而非功能缺失。AI 智能体 7×24 长驻场景下，**内存/WAL/磁盘写入治理**（OpenClaw SSD 磨损 6.5GB/启动）将成核心竞争力。
2. **更新器是信任关键路径**：双方均因更新半装/阻塞直接流失部署用户（Hermes 的 DigitalOcean 放弃案例在 OpenClaw 同样出现）。原子更新 + 可恢复激活（OpenClaw beta.1 方向）值得全行业跟进。
3. **上下文压缩完整性是隐性风险**：prune/compaction 静默截断工具参数（#120582）属“生产事故级”新 bug 类型——**压缩必须有数据完整性校验与审计日志**，这对所有做长会话 agent 的开发者是直接警示。
4. **信任边界产品化**：agent 会话禁止写配置（Hermes #136833）、受保护配置 owner 审批流（OpenClaw #77886）、隐身会话内存化，均指向 **agent 权限最小化**成为标配设计。
5. **本地小模型兼容是未满足需求**：委派编造、思考链剥离等退化报告在双方社区均有出现，为轻量化推理优化留出生态位。
6. **贡献机制创新**：Hermes 的 salvage 署名保留机制获社区好评，可作为大 PR 积压项目的参考解法。

---
*数据来源：各项目 GitHub API 日报（2026-10-12）。样本仅含两个头部项目，结论代表头部生态态势。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-12

## 1. 今日速览

- 项目今日保持**高活跃度**：过去 24 小时 Issues 更新 316 条（新开/活跃 286，关闭 30），PR 更新 500 条（待合并 410，已合并/关闭 90），无新版本发布。
- 开发节奏以 **bug 修复与大范围架构重构并行** 为特征：`CLI Ownership Refactor` 系列（Phase 1/2/4）持续推进，同时社区贡献者大量提交针对性修复 PR。
- 社区热点集中在**会话状态安全（scratch prune 静默删除数据）、安装/更新可靠性、Telegram/网关消息路由**三大风险域。
- 关闭/合并数仅占更新量的约 10–18%，**积压待审 PR 较多（410 条）**，审阅吞吐可能成为瓶颈。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭的重要 PR（含近期活跃推进项）：

- **工具调用必需参数校验落地**：[#136836](https://github.com/NousResearch/hermes-agent/pull/136836)（salvage 自 #61550）——工具调用缺失必需参数时返回明确指名错误，而非以默认值运行并报误导性错误，提升 agent 自纠错能力。
- **Desktop 深度回退兼容性修复**：[#136572](https://github.com/NousResearch/hermes-agent/pull/136572)（#133748 后续）——深回退在旧后端上保持可用，编辑重试增加二次确认。
- **CLI Ownership Refactor 推进**：Phase 1 [#125027](https://github.com/NousResearch/hermes-agent/pull/125027)（Profiles 域抽取）、Phase 2 [#125028](https://github.com/NousResearch/hermes-agent/pull/125028)（Gateway 控制面归属迁移）、Phase 4 [#128791](https://github.com/NousResearch/hermes-agent/pull/128791)（插件运行时归属，已 rebase 到冻结 checkpoint）——多阶段架构重构稳步落地。
- **Desktop 集成 Composio**：[#136820](https://github.com/NousResearch/hermes-agent/pull/136820)——新增 Gmail、Google Calendar、Drive 等 19+ 服务 OAuth 连接与账号管理。
- 其他修复：网关恢复通知路由修复 [#136832](https://github.com/NousResearch/hermes-agent/pull/136832)、阻止 agent 会话写配置 [#136833](https://github.com/NousResearch/hermes-agent/pull/136833)、cron 中断状态修正 [#113342](https://github.com/NousResearch/hermes-agent/pull/113342)、Vault OTP 字段识别 [#136831](https://github.com/NousResearch/hermes-agent/pull/136831)、浏览器工具会话门控 [#69071](https://github.com/NousResearch/hermes-agent/pull/69071)（已关闭）等。

**整体评估**：修复覆盖网关、CLI、Desktop、cron 多条产品线，功能面（Composio 集成）与架构面（Ownership Refactor）同步推进，进展扎实。

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) API 创建 PR 权限错误（29 评论） | 🔥 | 贡献者仅其账号无法通过 API 对本仓库开 PR，属 auth 边界疑难问题，影响贡献流程 |
| [#132401](https://github.com/NousResearch/hermes-agent/issues/132401) scratch prune 24h 静默删除（22 评论，P0） | 🔥 | TMPDIR 指向的 scratch 目录被静默清理，**多天 agent 工作成果丢失**，无日志/隔离/保留标记，社区强烈要求安全网 |
| [#124583](https://github.com/NousResearch/hermes-agent/issues/124583) 终端工具提示引用不存在的工具名（17 评论） | 文档/工具提示错误，误导操作者走入死胡同 |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) kanban 卡片永久卡 blocker_auth（15 评论） | 自动化调度可靠性，reviewer 永不生成 |
| [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) 更新失败留半装状态（14 评论，P1） | 一周 15 个 Discord 帖子，用户被迫手敲修复命令，要求产品内恢复路径 |

## 5. Bug 与稳定性（按严重度）

- **P0** [#132401](https://github.com/NousResearch/hermes-agent/issues/132401)：scratch prune 数据丢失。⚠️ 相关修复 PR [#134907](https://github.com/NousResearch/hermes-agent/pull/134907)（每 profile root 单次 prune）仅部分缓解，核心安全网（隔离/keep-marker）未见完整方案。
- **P1** [#125437](https://github.com/NousResearch/hermes-agent/issues/125437)：更新失败半装无恢复。暂无 fix PR。
- **P1** [#131578](https://github.com/NousResearch/hermes-agent/issues/131578)：子代理后台进程完成时重绑聊天路由，卡死 30 分钟并丢失委派结果。暂无明确 fix PR。
- **P2** [#120582](https://github.com/NousResearch/hermes-agent/issues/120582)：**生产事故级**——prune+compression 中途截断工具参数、桩化工具结果，附 state.db 证据。
- **P2** [#131055](https://github.com/NousResearch/hermes-agent/issues/131055)：Linux Desktop 二次启动污染 sandbox 标记 → 渲染器 SIGILL 循环。
- **P2** [#136567](https://github.com/NousResearch/hermes-agent/issues/136567)（今日新开）：Telegram 新 topic 首条消息无 thread_id，被 lobby 恢复错误路由到旧 topic。
- **P2** [#121095](https://github.com/NousResearch/hermes-agent/issues/121095)：browser_exec 残留僵尸 daemon 进程。
- **P2** [#129993](https://github.com/NousResearch/hermes-agent/issues/129993)：Desktop 助手回复重复渲染（持久层正常，纯显示层）。
- **P3 安全** [#129426](https://github.com/NousResearch/hermes-agent/issues/129426)：npm audit 新增 advisory 超出已有修复目标版本，涉及三棵依赖树。

## 6. 功能请求与路线图信号

- **移动端原生 App + 语音通话**：[#11911](https://github.com/NousResearch/hermes-agent/issues/11911)（12 👍），长期需求，暂无对应 PR。
- **跨平台会话组（session groups）**：[#79198](https://github.com/NousResearch/hermes-agent/issues/79198)，与 Ownership Refactor 的 profiles 域抽取方向契合，Phase 1 落地后实现概率上升。
- **MEMORY.md 写入预算与准入管线**：[#135039](https://github.com/NousResearch/hermes-agent/issues/135039)——控制每轮注入的记忆成本，方向明确、设计讨论已较成熟。
- **自定义 Enter/Ctrl+Enter 发送键**：[#49422](https://github.com/NousResearch/hermes-agent/issues/49422)（4 👍），中文社区高频诉求，实现成本低，可能较快纳入。
- **本地终端子进程内存上限**：[#56865](https://github.com/NousResearch/hermes-agent/issues/56865)，配合 systemd 部署场景。
- **Skills 加载策略 RFC**：[#102811](https://github.com/NousResearch/hermes-agent/issues/102811) + compaction 后技能重注入 [#86421](https://github.com/NousResearch/hermes-agent/issues/86421)——上下文管理是活跃设计领域。

## 7. 用户反馈摘要

- **痛点集中区**：① 安装/更新可靠性（Windows 与 systemd 部署均报半装、PATH 污染、更新器自杀式重启 [#107427](https://github.com/NousResearch/hermes-agent/issues/107427)）；② 远程/VPS 下 Desktop 会话加载慢且易取消（[#70445](https://github.com/NousResearch/hermes-agent/issues/70445)，20+ 秒）；③ 长会话压缩/prune 造成静默数据损坏（fleet 级事故见 #120582）；④ 本地小模型行为退化：委派后编造结果（#69777）、思考链在重放中被剥离（#56004，7 👍，已关闭）。
- **满意点**：修复 PR 响应速度快（多个当日 issue 当日有 fix PR，如 #136567 → #136832）；社区贡献门槛友好，salvage 机制（保留原作者署名的接手重提）获好评。
- **使用场景信号**：Telegram forum topics、多平台消息路由、NixOS/Ansible 系统级 systemd 部署等进阶用法占相当比例，用户群偏运维/自动化重度使用者。

## 8. 待处理积压

- [#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（29 评论，blocked）——权限问题悬置 9 天，建议维护者介入与 GitHub Support 对接。
- [#132401](https://github.com/NousResearch/hermes-agent/issues/132401)（P0，needs-decision）——数据丢失级别，决策不宜再拖。
- [#120582](https://github.com/NousResearch/hermes-agent/issues/120582)（P2，生产事故）——压缩/剪枝数据完整性需系统性方案。
- [#105758](https://github.com/NousResearch/hermes-agent/issues/105758)（P2，needs-decision）——9 月 3 日 scan-budget 提交引入的回归，Node.js CLI 被误杀，属已知回归未修复。
- **PR 积压**：410 条待合并，其中 Ownership Refactor Phase 2 [#125028](https://github.com/NousResearch/hermes-agent/pull/125028)（P1，needs-decision）和 #61550（被 salvage 后原 PR 应可关闭）等长链 PR 需优先裁决，避免依赖链阻塞。

---
*数据来源：GitHub API，统计窗口 2026-10-11 至 2026-10-12（UTC）。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*