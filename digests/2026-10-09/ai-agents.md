# OpenClaw 生态日报 2026-10-09

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-09 00:20 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-10-09

---

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 406，关闭 94），PR 更新 500 条（待合并 323，已合并/关闭 177），Issue 关闭率约 18.8%，消化速度跟不上新增速度，积压呈上升趋势。今日发布 **2 个版本**：稳定版 v2026.9.9（185 commits / 112 PRs / 92 贡献者）与热修复 beta v2026.10.1-beta.2（覆盖 40 个中间 commits）。整体看，项目处于快速迭代期，核心贡献者 @steipete 密集提交性能与架构重构 PR，但**升级/更新链路（package-swap、Doctor）相关的 P0 问题集中爆发**，成为当前最大的稳定性风险点。

---

## 2. 版本发布

### v2026.9.9（稳定版）
- **规模**：185 commits、112 PRs、92 位贡献者
- 内容以 release notes / changelog 双格式发布（[docs.openclaw.ai/releases](https://docs.openclaw.ai/releases/2026)）
- ⚠️ 注意：发布当天即出现多个从 2026.9.8 → 2026.9.9 升级失败的 P0 报告（见第 5 节），建议生产环境暂缓立即升级，观察补丁版本。

### v2026.10.1-beta.2（beta 热修复）
- 相对 beta.1 的增量热修复，覆盖 40 个中间 commits，非累积性 October notes 的重复。
- 亮点为 **Updates and Doc** 相关修复，与近期 updater 链路问题高度对应，推测针对 package-swap / 更新恢复卡死类问题。

**迁移注意**：跨 2026.7.x → 2026.9.x 升级的用户普遍遭遇 Doctor 迁移阻塞（#142585、#136203），升级前建议备份 workspace 状态并预留人工干预时间。

---

## 3. 项目进展

今日合并/关闭的代表性 PR（177 条已合并/关闭中）：

| PR | 内容 | 意义 |
|---|---|---|
| [#167463](https://github.com/openclaw/openclaw/pull/167463) | fix(ollama): setup 后 pull 的模型不出现在选择器 | 本地模型用户体验修复 |
| [#165031](https://github.com/openclaw/openclaw/pull/165031) | fix: 中止的 Claude CLI 工具标记不再写入聊天历史 | 修复 #164977，防止污染上下文 |
| [#158094](https://github.com/openclaw/openclaw/pull/158094) | fix(tasks): 瞬时 SQLite I/O 错误后代理停止回复 | P1 消息丢失级修复，恢复无需重启网关 |
| [#160047](https://github.com/openclaw/openclaw/pull/160047) | fix(agents): Ollama 410 模型退役不再误判为超时 | 改善 fallback 行为 |
| [#167504](https://github.com/openclaw/openclaw/pull/167504) | refactor(sessions): 共享写入与 fork 准备移至 worker | 主线程减负，属异步持久化迁移系列 |
| [#163357](https://github.com/openclaw/openclaw/pull/163357) / [#163356](https://github.com/openclaw/openclaw/pull/163356) | Security Review 工作流健壮性修复 | CI 稳定性 |

**整体推进**：@steipete 主导的「异步持久化 / 主线程 SQLite 卸载」系列（#166804、#167535、#167526、#167533、#167476）持续落地，配合 #167535（Doctor 插件源捕获复用，实测 472s→218s）表明**性能与架构现代化是当前主线**。待合并队列中 323 个 PR，其中多个标记 `👀 ready for maintainer look`，维护者评审带宽是主要瓶颈。

---

## 4. 社区热点

**评论最多 / 讨论最热的 Issues：**

1. [#119720](https://github.com/openclaw/openclaw/issues/119720)（24 评论，P1，🦞 diamond lobster）— 同步代理持久化与 transcript 维护在大规模下阻塞 Gateway 事件循环。老牌高价值问题，已有 #140231、#138984 部分修复落地，社区持续追踪剩余瓶颈。
2. [#142585](https://github.com/openclaw/openclaw/issues/142585)（20 评论，P0）— 2026.9.3 Doctor 拒绝迁移合法的旧版 workspace。诉求：**升级路径不能要求用户重建状态**。
3. [#97616](https://github.com/openclaw/openclaw/issues/97616)（18 评论，P1）— hook/tool 子进程僵尸堆积导致运行时退化，长期未根治。
4. [#80319](https://github.com/openclaw/openclaw/issues/80319)（17 评论，已关闭）— QA 工具默认套件误报 Codex 工具丢失；结论是 harness 问题而非产品缺陷，展示了健康的复盘文化。
5. [#96834](https://github.com/openclaw/openclaw/issues/96834)（15 评论，P1）— WhatsApp 图片入站导致主 lane 卡 ~3 分钟，多模态消息处理是即时通讯场景的刚需痛点。

**热点 PR：** [#156636](https://github.com/openclaw/openclaw/pull/156636)（Copilot 128K 合成 fallback 上下文预算修复，XL，安全评审中）和 [#106998](https://github.com/openclaw/openclaw/pull/106998)（WhatsApp JID 规范化统一，核心维护者 @mcaxtr 的长期重构）。

---

## 5. Bug 与稳定性（按严重程度）

### P0 · 更新/升级链路（今日重灾区）
| Issue | 问题 | Fix PR |
|---|---|---|
| [#167376](https://github.com/openclaw/openclaw/issues/167376) ✅已关闭 | 2026.9.8→9.9 两次失败于 package-swap "recovery permissions unsafe" | 推测已入 10.1-beta.2 |
| [#167181](https://github.com/openclaw/openclaw/issues/167181) ✅已关闭 | package-swap 更新失败（2026.9.8，darwin） | 同上 |
| [#164074](https://github.com/openclaw/openclaw/issues/164074) | 原生更新恢复卡在 publication-complete（包指纹变更时） | 🔴 无 fix PR，待维护者评审 |
| [#162047](https://github.com/openclaw/openclaw/issues/162047) ✅已关闭 | Windows 升级 Doctor 硬链接校验耗时 39 分钟（82.7% CPU 在 assertPluginNativeReference） | 相关 #167535 |
| [#164113](https://github.com/openclaw/openclaw/issues/164113) ✅已关闭 | LXC 容器内 FICLONE EPERM 导致更新失败 | 已标记 queueable-fix |
| 相关待修 PR | [#167459](https://github.com/openclaw/openclaw/pull/167459)：陈旧更新回执阻塞合法更新 | 开放中 |

### P0 · 运行时稳定性
- [#156571](https://github.com/openclaw/openclaw/issues/156571)：model-catalog worker 泄漏 tmp 捕获（1-3 GB/min 填满磁盘）— 🔴 未见专项 fix PR
- [#156712](https://github.com/openclaw/openclaw/issues/156712)：`openclaw triage` 修复子进程不清退、持有 lifecycle 锁阻塞重启 — 🔴 无 fix PR
- [#157255](https://github.com/openclaw/openclaw/issues/157255)：2026.9.5 lane 超时后 turn claim 未释放，会话卡死 90+ 分钟 — 🔴 无 fix PR
- [#160959](https://github.com/openclaw/openclaw/issues/160959)：大依赖插件捕获阻塞 Gateway 数分钟 — ✅ 有 fix PR [#167531](https://github.com/openclaw/openclaw/pull/167531)
- [#70903](https://github.com/openclaw/openclaw/issues/70903)：402 计费错误后 provider 冷却持久化，充值后仍被锁数小时 — 🔴 无 fix PR

### P1 精选
- [#154572](https://github.com/openclaw/openclaw/issues/154572)：claude-cli 子代理 spawn 必现 ClaimReboundError — 无 fix PR
- [#145203](https://github.com/openclaw/openclaw/openclaw)（[#145203](https://github.com/openclaw/openclaw/issues/145203)）：SSE 流挂起 48 分钟，watchdog 被 stream_progress "喂活" — 无 fix PR
- [#156925](https://github.com/openclaw/openclaw/issues/156925)：WebChat 工具调用轮次回复渲染两次 — 无 fix PR

---

## 6. 功能请求与路线图信号

**有实现迹象、可能进入下一版本：**
- **Slack Modal 交互式工作流**（[#88154](https://github.com/openclaw/openclaw/issues/88154)，7 评论）— 与 WebChat 队列可见性改进 [#167445](https://github.com/openclaw/openclaw/pull/167445) 同属 UI 交互线，社区呼声持续。
- **A2A 单向派发模式**（[#44309](https://github.com/openclaw/openclaw/issues/44309)，12 评论）— 多代理编排的核心语义需求，但标记 stale + needs-product-decision，需产品拍板。
- **插件 SDK transcript watermark 公共 API**（PR [#167481](https://github.com/openclaw/openclaw/pull/167481)）— 上下文引擎插件生态的基础设施，ready for review。

**持续积累的需求：**
- 多 Teams bot 单网关支持（[#71058](https://github.com/openclaw/openclaw/issues/71058)）
- iOS/macOS 个人身份 + Shared owner 共存（[#162164](https://github.com/openclaw/openclaw/issues/162164)，含安全评审诉求）
- 多索引 embedding 记忆 + 模型感知 failover（[#63990](https://github.com/openclaw/openclaw/issues/63990)）
- 流式重复 safeguards（[#44965](https://github.com/openclaw/openclaw/issues/44965)）

---

## 7. 用户反馈摘要

**满意点：**
- 更新失败时 Gateway 能安全回退旧版本（#164188 明确"update aborts safely"）
- CLI 工具（如 `openclaw memory search`）体验优于网关内嵌工具（#128140 反面印证）
- Issue 复盘质量高，维护者会纠正过度声明（#80319）

**核心痛点：**
1. **升级即事故**：Windows / LXC / npm 多环境升级失败或耗时数十分钟，是最强烈的负面情绪来源（#162047、#164113、#167376）
2. **卡死后无自愈**：turn claim 不释放、watchdog 失明、memory compaction 阻塞主 lane 10+ 分钟（#157255、#145203、#53008）——生产部署用户损失最大
3. **资源泄漏**：僵尸进程（#97616）、tmp 磁盘爆炸（#156571）、macOS CPU 压力（#156674）影响长期运行
4. **渠道边缘体验**：Telegram DM 路由污染主会话（#41165）、Signal 静默丢文本（#101793）、Feishu 消息批处理失效（#54409）——多渠道用户对消息可靠性零容忍

---

## 8. 待处理积压（维护者关注提醒）

| 条目 | 状态 | 建议 |
|---|---|---|
| [#70903](https://github.com/openclaw/openclaw/issues/70903) 计费冷却锁死（P0，4/24 起） | no-new-fix-pr | 影响付费用户基本可用性，建议优先 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) 僵尸进程泄漏（P1，6/29 起） | 长期未修 | 长期运行网关的系统性退化 |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) WhatsApp 图片卡 lane（P1） | 无 fix PR | 多模态即时通讯核心场景 |
| [#164074](https://github.com/openclaw/openclaw/issues/164074) 更新恢复卡死（P0，10/3 起） | 待维护者评审 | 与 10.1-beta.2 热修主题直接相关 |
| [#156712](https://github.com/openclaw/openclaw/issues/156712) triage 锁死重启（P0） | manual-only | 自修复工具本身不可靠，风险外溢 |
| PR [#82540](https://github.com/openclaw/openclaw/pull/82540) WeChat 热重载保号（5/16 起，stale） | needs proof | 中国用户核心渠道，弃置将流失社区贡献者 |

**健康度小结**：贡献动能优秀（92 人参与单版本）、修复节奏快（多 P0 当日关闭），但 updater/Doctor 链路的 P0 密度、以及 P0-P1 存量积压（约 15+ 项无 fix PR）是下个版本必须收敛的技术债。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析 · 2026-10-09

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道进入**高速迭代与稳定性偿债并行的阶段**：头部项目（OpenClaw、Hermes Agent）日均 Issues/PR 活动量均达数百条级别，单版本贡献者近百人，表明该赛道已从实验性玩具过渡到生产级部署驱动的社区规模。两个项目的动态高度趋同——**功能创新（多渠道接入、多代理协作、插件生态）与基础设施债（更新链路、会话状态管理、资源泄漏）同步爆发**，且“升级即事故”均成为用户最强负面情绪来源，说明“自托管、常驻运行”的部署形态正在成为该品类的默认假设，而这恰恰对安装/更新/自愈能力提出了远超传统开发工具的可靠性要求。

---

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 406，关闭 94，关闭率 ~18.8%） | 339（新开/活跃 297，关闭 42，关闭率 ~12.4%） |
| PR 更新（24h） | 500（待合并 323，合并/关闭 177） | 500（待合并 386，合并/关闭 114） |
| Release | 2 个：v2026.9.9 稳定版（185 commits / 112 PRs / 92 贡献者）+ v2026.10.1-beta.2 热修复 | 1 个：v0.21.6 patch（汇总约 2,100 个已合并 PR） |
| 迭代节奏 | 快（稳定版 + beta 热修并行，核心贡献者密集提交） | 极快（v0.21.5→0.21.6 间合并约 2,100 PR，主干吞吐量更大） |
| 主要风险 | updater/Doctor 链路 P0 密集爆发；15+ 项 P0-P1 无 fix PR | v0.21.6 自身引入 2 个回归（api_server 平台丢失、Py3.11 导入破坏）；更新链路 15 Discord 线程/周 |
| 健康度评估 | **高活跃 / 快速迭代期**，评审带宽是瓶颈（323 PR 待合并） | **更高吞吐 / 质量巩固承压**，版本打标滞后于主干，回归密度偏高 |

**共性警示**：两者 Issue 消化速度均显著落后于新增速度（关闭率 12-19%），积压趋势上行；PR 待合并队列均在 320-390 量级，维护者评审带宽是共同瓶颈。

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **体量与贡献结构领先**：单稳定版本即有 92 位贡献者、185 commits，社区基础宽厚，不依赖单一维护者。
- **修复响应快**：多个 P0 当日/当周关闭（#167376、#164113 等），并有 beta 热修复通道快速止血。
- **架构现代化主线清晰**：@steipete 主导的异步持久化/SQLite worker 卸载系列（5+ PR 连续落地），且性能成果可量化（Doctor 插件源捕获 472s→218s）。
- **复盘文化健康**：如 #80319 维护者主动纠正过度声明的 QA 结论。

**技术路线差异（相对 Hermes）：**
- OpenClaw 重**多渠道消息网关**（WhatsApp/Telegram/Signal/Feishu/Teams/Slack，JID 规范化、多模态入站处理），偏“个人助手作为即时通讯中枢”。
- Hermes 重**统一会话网关 + Agent 互联**（单一 Gateway 拥有所有本地会话、跨 Gateway Bot 协作），偏“多端共享的单一个体 Agent”。
- 版本工程上，OpenClaw 稳定版+beta 双轨较成熟；Hermes 以 patch 汇总方式打标，主干领先于版本约 2,100 PR，用户实际运行内容与打标版本存在漂移风险。

**社区规模对比**：OpenClaw 单版本 92 贡献者、Issue 讨论深度高（单 issue 24 评论级别）；Hermes 社区讨论热度同样高（#127665 达 56 评论），且中文用户群体活跃度更明显（#49422 等）。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **更新/升级链路可靠性** | 两者（均为头号痛点） | OpenClaw：package-swap 失败、Doctor 迁移阻塞、Windows 硬链接校验 39 分钟；Hermes：更新留半套安装、macOS 更新锁死、venv 重建丢 extras |
| **会话状态与压缩安全** | 两者 | OpenClaw：turn claim 不释放、transcript 维护阻塞事件循环；Hermes：会话裁剪误删受保护 lineage、压缩锁缺陷 |
| **自愈与 watchdog 有效性** | 两者 | OpenClaw：watchdog 被 stream_progress “喂活”、triage 工具自身锁死；Hermes：Windows 探测超时误判诱导重装 |
| **多代理/Agent 互联** | 两者 | OpenClaw：A2A 单向派发（#44309）；Hermes：跨 Gateway Bot 协作（#97681，40 评论） |
| **插件生态与 SDK** | 两者 | OpenClaw：transcript watermark 公共 API PR；Hermes：Desktop 插件 hook 扩展 + 插件 catalog 活跃投稿 |
| **渲染/消息可靠性** | 两者 | OpenClaw：WebChat 回复渲染两次（#156925）；Hermes：Desktop 流式渲染重复（#127665，56 评论）——同类症状双向印证 |
| **本地模型（Ollama）体验** | 两者 | OpenClaw：模型选择器、410 退役误判；Hermes：本地模型 prompt 缓存失效修复 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道即时通讯网关（WhatsApp/Telegram/Signal/飞书/Teams/Slack）、多模态入站、memory 多索引 | 统一会话网关（CLI/TUI/Desktop/API/ACP/Bots/cron 共享会话）、跨 Gateway Agent 互联、Hermes Cloud |
| 目标用户 | 自托管生产部署用户、多渠道重度用户（含中国渠道 WeChat 需求） | 多端个人 Agent 用户、长时自治任务场景、中文社区占比高 |
| 技术架构 | 主线程 SQLite 卸载至 worker 的异步持久化路线；lane/turn claim 并发模型 | 单一 Gateway 拥有会话的集中式架构；systemd/launchd 服务化部署 |
| 安全面 | iOS/macOS 身份共存安全评审、Security Review CI 工作流 | 多 home 写保护、CLI 绕过审批层写保护（#59293）、scratch 数据销毁（#132401） |
| 弱项 | updater/Doctor 复杂度失控、跨版本迁移人工干预 | 版本回归密度、自动化集成合并冲突（主干漂移） |

---

## 6. 社区热度与成熟度

- **快速迭代期（OpenClaw、Hermes 均属）**：日均数百条 Issues/PR、版本节奏以天/周计、贡献者规模近百。但细分阶段不同：
  - **OpenClaw：功能扩张 + 架构重构并行**，性能主线明确、修复节奏快，但 P0 存量（15+ 无 fix PR）表明已开始进入“技术债偿付”窗口。
  - **Hermes：吞吐极高但质量巩固承压**，patch 版本自身引入回归、更新链路问题产生每周 15 个 Discord 求助线程，是典型的“速度换稳定性”状态。
- **共同的中期信号**：Issue 关闭率（12-19%）显著低于新增速度，若不扩充评审/分诊带宽，两项目都将滑向积压螺旋。OpenClaw 的 `👀 ready for maintainer look` 队列和 Hermes 的自动集成合并冲突（#125727）是同一问题的两种表现。

---

## 7. 值得关注的趋势信号

1. **“升级可靠性”将成为品类竞争的分水岭**：两个头部项目的头号用户痛点完全一致。自托管常驻 Agent 的更新不同于普通软件——涉及包交换、服务定义、workspace 状态迁移。谁先做到“更新原子化 + 自动回退 + 自愈”，谁就拿下生产部署用户。OpenClaw 已验证安全回退能力（#164188），是当前领先信号。
2. **Agent 互联是下一个架构高地**：OpenClaw 的 A2A 派发（#44309）与 Hermes 的跨 Gateway Bot 协作（#97681，高互动）指向同一趋势——个人 Agent 从单机单体走向多机、跨所有者协作，协议层语义（单向派发、身份、信任）将有先发标准机会。
3. **本地模型（Ollama）已是标配而非选配**：两项目均在本周期修复本地模型相关问题（缓存失效、模型退役 fallback），说明个人 Agent + 本地推理的组合是真实的主流部署形态。
4. **数据安全从工程问题升级为信任问题**：Hermes scratch 静默清理销毁多日工作（#132401）引发强烈反弹——长时自治 Agent 拥有磁盘写权限，其数据生命周期管理（日志、隔离区、保留标记）需要产品级设计，而非运维默认值。
5. **Watchdog/自愈机制的“假活”是共性盲区**：OpenClaw watchdog 被流式进度喂活、turn claim 锁死 90 分钟、Hermes 健康探测误判——对开发者启示：自治系统的可观测性必须区分“有输出”与“有进展”，超时语义需绑定业务级进度而非 I/O 活动。
6. **中文/国际化社区是增量用户来源**：Hermes 中文社区活跃（Enter 键行为、Kimi vision），OpenClaw 有 WeChat 渠道长期 PR（#82540 弃置将流失贡献者）——渠道本土化支持是被低估的竞争维度。

**一句话总结**：生态整体处于“功能高速扩张、可靠性债务集中到期”阶段；OpenClaw 以架构现代化和多渠道纵深领先，Hermes 以吞吐和 Agent 互联愿景见长，两者共同押注“多端统一会话 + Agent 互联”，而升级链路可靠性将是短期最值得下注的工程投入方向。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-10-09）

## 1. 今日速览

项目处于高度活跃状态：过去 24 小时 Issues 更新 339 条（新开/活跃 297、关闭 42），PR 更新 500 条（待合并 386、合并/关闭 114），并发布了一个补丁版本 **v0.21.6**。版本迭代节奏快（v0.21.5 → v0.21.6 之间合并了约 2,100 个 PR），社区参与度高，但更新/安装链路相关的 Bug 报告密集，是当前稳定性短板。总体健康度：**高活跃、快速迭代、安装与更新路径质量风险需关注**。

## 2. 版本发布

### v0.21.6（2026-10-08）
- 定位为 **patch release**，将 v0.21.5 以来约 **2,100 个已合并 PR** 汇总为稳定的打标版本，供 Docker 与 Hermes Cloud 使用。
- 完整的精选 Release Notes 将随 **v0.22.0** 发布，本版本不含破坏性变更说明。
- **迁移提示**：多项 Issue 反馈升级路径存在回归（见第 5 节），升级前建议备份 `~/.hermes`，关注 #133992（macOS Desktop 更新锁冲突）与 #135361（v0.21.6 引入的 api_server 平台丢失回归）。
- 链接：https://github.com/NousResearch/hermes-agent/releases（v0.21.6）

## 3. 项目进展

今日合并/关闭的重要 PR（114 条已合并/关闭中较关键的）：

- **#135340**（已关闭）Gateway 服务定义写入保护：阻止 scratch/test 环境的 `HERMES_HOME` 覆盖真实安装的 systemd unit / launchd plist（抢救自 #133476）。与 **#133515**（拒绝覆盖非本 CLI 生成的服务定义）一起，显著强化了多 home 场景下的安装安全边界。
- **#106742**（P1，活跃中）：单一 Gateway 拥有所有本地会话——CLI、TUI、Desktop、API、ACP、Bots、cron 全部接入同一活跃会话。这是本周期最重要的架构级 PR，正在持续推进。
- **#128819**（P0）：修复轮次间工具刷新重写已发送 schema 的问题，避免本地模型 prompt 缓存失效。
- **#129759**（P0）：会话自动裁剪保留受保护 lineage，修复压缩锁下祖先行被误删的问题。
- **#128305**（P0）：更新器请求携带共享身份标识，缓解 Cloudflare/WAF 拦截导致的更新失败。
- 整体进展：安装/服务管理链路安全性大幅收敛（三个 P1 gateway PR），会话状态（P0×2）与本地模型缓存修复到位，架构层面的“统一会话网关”持续推进。

## 4. 社区热点

- **#127665**（56 评论）：Desktop 流式渲染中同一回复被渲染两次——与 #127288 相同症状但不同代码路径，即使已修复 #127282 仍可复现。同一渲染重复问题还波及 #128468、#129993、#123985，是 Desktop 端当前最集中的用户痛点。
- **#97681**（40 评论，4 👍）：跨 Gateway 的 Bots 协作能力（先跨机器、后跨所有者），社区对个人 Agent 互联的诉求强烈。
- **#134107 / #134220**（37+7 评论，7 👍）：捆绑 solstice 插件因缺少 httpx 加载失败，警告刷屏 TUI，新装用户影响面大，👍 密度高。
- **#125727**（34 评论）：Nous 自动集成合并因大规模文件冲突受阻，反映上游自动化流程的维护负担。
- **#132401**（P0，20 评论）：scratch 目录 24h 空闲自动清理会静默销毁多天工作成果，用户对“无日志、无隔离、无保留标记”的数据安全设计强烈不满。

## 5. Bug 与稳定性（按严重度）

| 级别 | Issue | 描述 | Fix 状态 |
|---|---|---|---|
| P0 | [#132401](https://github.com/NousResearch/hermes-agent/issues/132401) | scratch 自动清理静默销毁多日 Agent 工作产物 | 待决策，未见 fix PR |
| P0 | [#135361](https://github.com/NousResearch/hermes-agent/pull/135361) | **v0.21.6 回归**：纯 API 部署在 gateway 重启后静默丢失 api_server 平台 | 已有 fix PR |
| P1 | [#135362](https://github.com/NousResearch/hermes-agent/pull/135362) | **v0.21.6 回归**：linter 改动破坏 Python 3.11 导入 | 已有 fix PR |
| P1 | [#133992](https://github.com/NousResearch/hermes-agent/issues/133992) | macOS Desktop 更新锁冲突（#78119/#87514 回归） | 待修复 |
| P1 | [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) | 更新失败留下半套安装、无产品内恢复路径（15 个 Discord 线程/周） | #128305 部分缓解 |
| P1 | [#79087](https://github.com/NousResearch/hermes-agent/issues/79087) | Windows 探测超时误判健康安装、诱导重装 | #90046 在审 |
| P2 | [#127665](https://github.com/NousResearch/hermes-agent/issues/127665) | Desktop 流式渲染重复 | 调查中 |
| P2 | [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | `hermes config set` 绕过系统配置写保护，可无门禁关闭审批层（安全） | 待决策 |
| P2 | [#96180](https://github.com/NousResearch/hermes-agent/issues/96180) | update 重建 venv 丢失 telegram extras，cron 投递静默失败 | 未修 |
| P2 | [#134029](https://github.com/NousResearch/hermes-agent/issues/134029) | `pm update node` pin 解析 404 | 未修 |

## 6. 功能请求与路线图信号

- **跨 Gateway Bot 协作**（#97681）与 **统一会话网关**（PR #106742）方向一致，v0.22.0 大概率围绕“多端共享会话 + Agent 互联”展开。
- **工具迭代耗尽后有界自动续跑**（#16004，needs-decision）：对长时自治任务是刚需，已有充分讨论，可能进入下一版本。
- **Desktop 插件 SDK hook 扩展**（#116305，已关闭）：composer 草稿、设置网关、会话列表等 hook 愿望清单，结合 plugin catalog 的活跃投稿，插件生态是明确投入方向。
- **Enter 键行为自定义**（#49422，4 👍）：中文用户社区反复提出，实现成本低，值得关注。
- **Kimi vision 能力恢复**（#18990）：上游已支持，等待摘除黑名单。

## 7. 用户反馈摘要

- **不满集中在更新链路**：升级失败无恢复路径、更新后可选 extras 丢失、Desktop 更新自我锁死——大量用户被迫手敲修复命令。
- **Desktop 渲染重复问题**持续发酵，多线程用户在已修复版本上仍能复现，削弱对修复的信心。
- **数据安全焦虑**：scratch 自动删除“多天工作一夜清零”引发强烈不安，用户期望日志、隔离区、保留标记三重保障。
- **正面信号**：单一网关统一会话、Bot 协作、插件生态等方向获得社区积极响应；中文用户群体活跃（如 #49422），国际化需求明显。

## 8. 待处理积压

- **#59293**（7 月，安全类）：CLI 绕过审批层写保护，安全相关长期未决，建议优先。
- **#79087**（8 月，P1 Windows）：虽有 #90046 在审，但已挂起 2 个月。
- **#16004**（4 月，feature）：needs-decision 状态近半年，建议给出明确取舍。
- **#18990**（5 月）：一行级别修复，长期未合并。
- **#96180**（8 月）：影响 cron 用户消息投递，属静默故障，建议提升优先级。
- **#125727**：自动集成合并冲突需人工介入，长期阻塞将加剧主干与集成分支漂移。

---
*数据来源：GitHub API（截至 2026-10-09），统计窗口为过去 24 小时。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*