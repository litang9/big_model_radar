# OpenClaw 生态日报 2026-09-27

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-26 22:47 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 — 2026-09-27

---

## 1. 今日速览

OpenClaw 今日保持极高活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 476，关闭仅 24），PR 更新 500 条（待合并 414，合并/关闭 86），无新版本发布。社区焦点明显集中在 **2026.9.5 → 2026.9.6 升级引发的更新失败与资源占用问题**（多个 P0 级 ux-release-blocker），以及 2026.9.7 修复版本的筹备工作（[#157531](https://github.com/openclaw/openclaw/issues/157531) 已纳入 18/21 个 P1 候选修复）。PR 侧以 @steipete 主导的大规模 "deslop" 重构系列和多个稳定性修复为主，整体处于"高强度修 bug + 代码清理"的版本收敛期。Issue 关闭率（24/500）偏低，反映维护者带宽承压。

---

## 2. 版本发布

今日无新版本发布。值得关注：
- **2026.9.7 Fixes Tracker**（[#157531](https://github.com/openclaw/openclaw/issues/157531)）正在跟踪 2026.9.6 → 2026.9.7 的修复内容，prepared PR 已包含 18/21 个 P1 候选（含 privacy 相关），最新 prepared source 为 `711db27`，预计短期内发布。

---

## 3. 项目进展

今日 PR 关闭/合并 86 条，代表性进展：

- **[#159065](https://github.com/openclaw/openclaw/pull/159065)** fix(ios): 稳定 iOS 原生发布资格验证 — 修复新会话中提交消息在 stale history 下消失的问题（已关注意向，P2）
- **[#120086](https://github.com/openclaw/openclaw/pull/120086)** fix(e2e): Docker 升级后 migration 收敛时重启 upgrade survivor — 关闭，提升升级路径 CI 可靠性
- **[#158984](https://github.com/openclaw/openclaw/pull/158984)** refactor(core): deslop 第二遍（system-agent/claws/security/worker）— 已关闭
- **[#158889](https://github.com/openclaw/openclaw/pull/158889)** refactor(qa-lab): deslop 第三遍 — 已关闭
- **[#159211](https://github.com/openclaw/openclaw/pull/159211)** chore(i18n): 原生 locale 刷新 — 已关闭

**新开的重要 PR（待合并，多为今日提交）：**
- **[#157413](https://github.com/openclaw/openclaw/pull/157413)**（P1）防止 SQLite 协调层耗尽临时文件 inodes — 跨平台大范围修复，含安全敏感变更
- **[#159163](https://github.com/openclaw/openclaw/pull/159163)**（P1）修复 transcript 重置/重建期间 `chat.history` 反复失败
- **[#159132](https://github.com/openclaw/openclaw/pull/159132)**（P1）恢复 iMessage/Signal/WhatsApp 的 system-agent 审批 reactions
- **[#159223](https://github.com/openclaw/openclaw/pull/159223)** CLI 在远程 Gateway 不可达时禁止回退到本地 state
- **[#136677](https://github.com/openclaw/openclaw/pull/136677)**（P1）Linux login shell 重置 PATH 时保留 node service PATH
- **[#134406](https://github.com/openclaw/openclaw/pull/134406)**（P1）Windows 安装时 PATH 缺失 openclaw 应报失败而非成功
- **[#158582](https://github.com/openclaw/openclaw/pull/158582)** Android Models 设置与 provider 连接完整化（超大范围，覆盖 40+ provider 扩展）

**整体评估**：进展以"修稳定性 + 深度重构"为主线，@steipete 今日密集提交 10+ 个 PR（多个 deslop XL 级重构 + 精准修复），显示自动化/维护者工作流全速运转。多 Agent 稳定性（session-state、message-loss 类）和升级链路是当前主战场。

---

## 4. 社区热点

| Issue | 评论 | 热点分析 |
|---|---|---|
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | 40 | 2026.9.5 将稳定环境变为"8 小时故障恢复会话"——升级质量问题的最强用户情绪宣泄，P0 crash-loop |
| [#155753](https://github.com/openclaw/openclaw/issues/155753) | 31（已关闭） | 模型目录过期/重建循环打满一个 CPU 核（`readFullModelCatalog()` 每次读取触发 `refreshExpiredCatalog()`），已标记 main 上不可复现 |
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | 23 | 网关级 per-agent 成本预算——运营者的核心诉求，长期待产品决策 |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | 20（已关闭） | 2026.9.2 回归：reply run 活跃期间发送的消息被丢弃 |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) | 19 | 混合终端 requester-settle 批次在所有权检查后无限重试 |
| [#22438](https://github.com/openclaw/openclaw/issues/22438) | 19 | Bootstrap 文件分层加载（渐进式上下文控制）——token 成本优化的长期功能诉求 |

**诉求画像**：用户最不满的是 **2026.9.x 升级带来的回归质量**（P0 crash-loop、更新失败、资源占用），多条热门 issue 直指发布流程；运营类用户持续呼吁成本控制与上下文预算管理。

---

## 5. Bug 与稳定性（按严重程度）

### P0（今日活跃）

| Issue | 问题 | Fix 状态 |
|---|---|---|
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | 2026.9.5 crash-loop，8 小时恢复会话 | 无 fix PR，需维护者审查 |
| [#157568](https://github.com/openclaw/openclaw/issues/157568) | 2026.9.6 WSL Gateway 4 分钟内再生 7.5 GB 插件捕获（忽略 60s 回收配置） | 无 fix PR |
| [#157227](https://github.com/openclaw/openclaw/pull/157227) 对应 [issue](https://github.com/openclaw/openclaw/issues/157227) | git→stable 升级后服务重验证失败，Gateway 停止 | 无 fix PR，源码可复现 |
| [#156112](https://github.com/openclaw/openclaw/issues/156112) | `openclaw update` 在 global install swap 步骤确定性失败（直接 npm install 同版本 13 秒成功） | 无 fix PR |
| [#158231](https://github.com/openclaw/openclaw/issues/158231) / [#157812](https://github.com/openclaw/openclaw/issues/157812) / [#154924](https://github.com/openclaw/openclaw/issues/154924) | 更新失败系列：managed-service-preflight、Windows 自动更新三重失败模式、global-install-failed | 无 fix PR（manual-only） |
| [#156674](https://github.com/openclaw/openclaw/issues/156674) | macOS 8 GiB 上长生命周期 Codex worker 导致 Gateway 资源压力 | 无 fix PR，待审查 |

### P1（今日活跃，部分已有 linked PR）

- [#157067](https://github.com/openclaw/openclaw/issues/157067) Windows 隔离 cron 将不可克隆的 Proxy 传给 session history worker — **有 linked PR**
- [#104719](https://github.com/openclaw/openclaw/issues/104719) memory-wiki 补充回退忽略工具 deadline — **有 linked PR**
- [#101929](https://github.com/openclaw/openclaw/issues/101929) context-overflow 预检高估 2.3–2.6× token，误触发截断恢复 — **有 linked PR**
- [#105528](https://github.com/openclaw/openclaw/issues/105528) Windows 上 exec/read 间歇性返回空输出（2026.6.x 回归）
- [#121187](https://github.com/openclaw/openclaw/issues/121187) yield 后 NO_REPLY 被重试而非静默结算 — **有 linked PR**
- [#101793](https://github.com/openclaw/openclaw/issues/101793) Signal 通道：工具调用前的助手文本被静默丢弃 — **有 linked PR**
- [#123354](https://github.com/openclaw/openclaw/issues/123354) Matrix E2EE 在 Megolm 会话轮换后停止解密
- [#102534](https://github.com/openclaw/openclaw/issues/102534) Cron 调度器在大量超时后永久停摆（重启也不恢复）

### P2 值得注意

- [#154104](https://github.com/openclaw/openclaw/issues/154104) 空闲 Gateway（4 个 Matrix E2EE 账号）消耗 ~50% CPU + 52 MB/min 磁盘写入
- [#156191](https://github.com/openclaw/openclaw/issues/156191) Gateway RSS 3.0–3.3 GiB，目录生成持续 churn
- [#153899](https://github.com/openclaw/openclaw/issues/153899) Gateway drain 等满 systemd TimeoutStopSec（5m30s）

**已关闭今日确认**：[#155753](https://github.com/openclaw/openclaw/issues/155753)（CPU 打满，main 不可复现）、[#139847](https://github.com/openclaw/openclaw/issues/139847)（消息丢失回归）——表明 9.7 修复批次已消化部分高热度问题。

---

## 6. 功能请求与路线图信号

| 需求 | 状态 | 下一版本可能性 |
|---|---|---|
| Per-agent 成本预算（[#42475](https://github.com/openclaw/openclaw/issues/42475)） | 待产品决策，评论 23 | 中——运营诉求强烈，但长期无决策 |
| Bootstrap 分层加载（[#22438](https://github.com/openclaw/openclaw/issues/22438)） | 待产品决策，**已有 linked PR** | 较高 |
| 受保护配置的 owner 审批流（[#77886](https://github.com/openclaw/openclaw/issues/77886)） | 需安全审查 + 产品决策 | 中 |
| Gateway 重启后补齐漏收消息（[#55792](https://github.com/openclaw/openclaw/issues/55792)） | 待产品决策 | 中低——解决 message-loss 大类 |
| 主题定制系统（[#28300](https://github.com/openclaw/openclaw/issues/28300)，👍5） | UI 增强，P3 | 低 |
| Android Models 设置完整化 | **PR #158582 已提交** | 高——直接落地 |
| 上下文治理（#153209 压缩上下文精选、#153793 语义轮次上下文 curation） | PR 已 ready for maintainer | 高——与 #22438 形成上下文管理主线 |

**信号解读**：PR 流（压缩 curation、语义上下文、fs-safe watch 统一、ACP 线程优化）显示维护者当前优先级为**性能/资源治理 + 上下文管理**，与 Issue 侧的 CPU/内存痛点高度对齐；成本预算类功能仍卡在产品决策。

---

## 7. 用户反馈摘要

**不满意（占主导）：**
- 升级体验是最大痛点："升级前环境稳定，升级后花 8 小时做故障恢复"（#153257，40 条评论的情绪基调）
- 更新失败率高且模式多样：npm swap 失败、Windows preflight 失败、git→stable 迁移后 Gateway 停止——用户两天内累积 5 次失败记录（#157812）
- 资源占用不可控：WSL 用户 4 分钟 7.5 GB 磁盘增长、8 GiB macOS VM 卡死、空闲 Gateway 仍烧 CPU（多平台一致反馈）
- 消息可靠性："消息发出去了但 agent 没收到/没回复"类问题横跨 Signal、Telegram、Matrix、Feishu 多个通道

**满意/认可：**
- 多通道（Discord/Telegram/Matrix/Signal/WhatsApp）+ 多 runtime（Codex/Ollama/ACP）覆盖面广，用户以生产级多 Agent 部署深度使用
- 内存/上下文系统（memory-wiki、Memory Dreaming）被认可有价值，问题在于实现质量而非方向（#105494 的"memory therapy"提案）
- Windows 原生支持在推进，但回归问题集中（exec 空输出、更新失败）

**典型场景**：多 Agent 网关长期驻留运行 + cron 定时任务 + 消息通道集成，是问题高发的核心使用形态。

---

## 8. 待处理积压

| Issue/PR | 状态 | 建议 |
|---|---|---|
| [#42475](https://github.com/openclaw/openclaw/issues/42475) 成本预算 | 3 月开，待产品决策 | 高热度长期积压，建议维护者给出 go/no-go |
| [#55792](https://github.com/openclaw/openclaw/issues/55792) 重启消息补齐 | stale + 待产品决策 | message-loss 大类的根治项 |
| [#99910](https://github.com/openclaw/openclaw/issues/99910) Memory Dreaming 打满事件循环 ~10 分钟 | 7 月报，无 fix PR，recovery-stuck | P1 长期未动，影响记忆功能可用性 |
| [#39476](https://github.com/openclaw/openclaw/issues/39476) A2A sessions_send 回环重复消息 | 待 live repro | 多 Agent 协作协议正确性 |
| [#106704](https://github.com/openclaw/openclaw/issues/106704) 首轮 sessions_yield 静默空结果 | fix-shape-clear 但无 PR | 工具描述诱导误用，文档+行为双修 |
| [#71335](https://github.com/openclaw/openclaw/issues/71335) sync.watch 网关模式默认 true 泄漏 1292 个 watcher | stale，待决策 | 低成本修复候选 |
| [#126224](https://github.com/openclaw/openclaw/pull/126224) 模型目录不匹配恢复 | 8 月开，needs proof，安全审查 | 与当前 catalog churn 热点直接相关，建议优先 |

**健康度提醒**：Issue 关闭/更新比仅 ~5%，P0 更新失败与资源占用问题多数尚无 fix PR；建议优先收敛升级链路（updater/preflight 系列）与插件捕获内存治理，为 2026.9.7 清障。

---

## 横向生态对比

# 个人 AI 助手/智能体开源生态横向对比分析 — 2026-09-27

## 1. 生态全景

个人 AI 助手/自主智能体开源生态当前处于**高强度迭代与质量收敛并行**的阶段：头部项目日均 Issue/PR 更新量均达到 500 条量级，反映生产级部署用户已大规模涌入。核心矛盾从“功能可用性”转向**升级链路可靠性、资源治理与消息可靠性**——两个项目的 P0/P1 问题高度集中在这些领域。同时，**上下文/内存管理**（memory-wiki、上下文 curation、压缩阈值）正在成为下一代核心竞争力方向。总体判断：生态已越过早期尝鲜期，进入“生产化洗礼”阶段，谁的升级路径和资源占用先稳定，谁就能留住运营者级用户。

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 476，关闭 24） | 500（新开/活跃 418，关闭 82） |
| PR 更新（24h） | 500（待合并 414，合并/关闭 86） | 500（待合并 325，合并/关闭 175） |
| Issue 关闭率 | ~5%（偏低，维护带宽承压） | ~16%（较健康） |
| PR 吞吐 | 合并 86，以重构+修复为主 | 合并/关闭 175，修复+功能并行 |
| Release | 无（2026.9.7 修复版筹备中，18/21 P1 已纳入） | 无（建议评估补丁版本） |
| 当前阶段 | 版本收敛期（bug 修复 + deslop 重构） | 功能扩张期 + 局部质量巩固 |
| 健康度评估 | ⚠️ 中——P0 多数无 fix PR，关闭率过低 | ✅ 中高——响应快，但有 3.5 个月未处理的安全 P1 |

**关键差异**：Hermes 的“消化能力”（关闭 PR 175 vs 86，关闭 Issue 82 vs 24）明显优于 OpenClaw；OpenClaw 的体感是“火力全开但入不敷出”，依赖 @steipete 式的高强度自动化工作流维持收敛。

## 3. OpenClaw 在生态中的定位

**优势**
- **多通道覆盖最广**：Discord/Telegram/Matrix/Signal/WhatsApp/iMessage/Feishu 全线支持，是同类中唯一达到此密度的项目，且用户确实在生产环境长期驻留运行。
- **多 runtime 架构**：Codex/Ollama/ACP 并存，模型中立性强。
- **内存/上下文系统方向领先**：memory-wiki、Memory Dreaming、上下文 curation PR 群，与 Hermes 相比在“长期记忆”这条线上布局更深。

**劣势/风险**
- 2026.9.x 升级链路出现系统性回归（P0 crash-loop、更新五连败、WSL 4 分钟 7.5 GB 磁盘增长），**发布质量是当前最大软肋**。
- Issue 关闭率仅 5%，长期积压项（成本预算 #42475 三个月无决策）显示产品决策带宽不足。

**技术路线差异**：OpenClaw 走“网关中心 + 多消息通道 + 多 Agent 驻留”的重基础设施路线；Hermes 走“桌面优先 + 插件 SDK + 视觉/浏览器工具链”的产品化路线。OpenClaw 社区规模更大（issue 编号已到 15 万级 vs Hermes 12 万级），但 Hermes 的单位维护效率更高。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **升级/安装链路可靠性** | #156112、#157227、#158231 系列（P0 群） | #122183、#122593、#123971、#122353（P1/P2 群） | 两侧最集中的痛点：更新成功但校验失败、旧环境残留抢占、Windows preflight 失败 |
| **上下文/内存治理** | #22438 分层加载、#153209 压缩 curation、#99910 Memory Dreaming 阻塞事件循环 | #117915 压缩阈值静默覆盖、#120582 压缩致生产数据丢失 | 长会话成本控制与上下文精选，且**两侧压缩实现都出过数据正确性问题** |
| **会话隔离与消息可靠性** | #139847 消息丢弃、#39476 A2A 回环、#55792 重启补齐 | #94778 多后端状态串扰、#124520 profile 归属 404 | 多 profile/多 Agent 场景下消息归属确定性 |
| **Windows 一等公民支持** | #134406、#136677、#105528 | #122222、#69033 | 两侧 Windows 原生支持都在推进且都是回归重灾区 |
| **自动化/cron 稳定性** | #102534 调度器永久停摆、#137332 无限重试 | #122222 cron 全量失败、#88584 cron 冲突阻塞集成 | 定时任务是核心使用形态，但两侧 cron 都有严重缺陷 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多通道消息网关、多 Agent 编排、跨平台 Gateway 驻留 | 桌面体验、视觉/浏览器工具链（computer use）、插件 SDK |
| 目标用户 | 运营者/自托管极客（7×24 网关 + cron + 多通道） | 个人桌面重度用户 + 插件开发者 |
| 架构重心 | Node.js 网关中心、ACP/Codex/Ollama 多 runtime | Python 生态、venv/PM 管理、webapp/浏览器渲染 |
| 差异化亮点 | 内存系统、通道广度、Android 完整化（#158582） | 视觉质量三连修、#112639 “脚本速度 computer use” RFC、插件目录 intake 流程 |
| 风险面 | 资源占用（CPU/内存/inode）与升级质量 | Windows venv/PM 运行时管理、1 个未处理安全 P1 |

## 6. 社区热度与成熟度

- **快速迭代/扩张阶段**：**Hermes Agent**——PR 合并 175、新功能线（webapp、Discord 转写、插件生态）多点开花，处于产品能力快速堆叠期，质量债开始局部累积（Windows 链路、数据丢失 #120582）。
- **质量巩固/收敛阶段**：**OpenClaw**——deslop 大重构 + 2026.9.7 修复版筹备，明确处于“还债+收敛”期。但收敛速度（关闭率 5%）跟不上问题产生速度，若 9.7 不能兑现，有信任流失风险。
- 成熟度信号对比：OpenClaw 用户的报告深度（state.db 证据级、生产部署细节）说明其生产渗透更深；Hermes 的插件 intake 一次过审 12+5 个，显示其生态扩展机制更顺畅。

## 7. 值得关注的趋势信号

1. **“升级即风险”成为行业性信任问题**：两个项目最热痛点都不是功能缺失，而是 update 链路。对开发者的启示：智能体产品的自动更新需要像数据库迁移一样严格的 preflight/回滚设计，“部分克隆断言崩溃”“更新成功但校验 exit 1”这类半成功状态最伤信任。
2. **上下文压缩是下一个事故高发区**：两侧压缩/裁剪逻辑都导致过数据丢失或误截断（#120582、#101929 2.3–2.6× 高估）。上下文 curation 将从优化项变为正确性关键路径。
3. **资源治理决定长驻可行性**：空闲 Gateway 烧 50% CPU、7.5 GB/4min 磁盘、RSS 3 GiB——智能体常驻化后，内存/磁盘/watcher 泄漏治理是留住自托管用户的前提。
4. **Windows 是增量最大也最难的市场**：两侧都把 Windows 原生支持当重点，也都在此栽跟头最多，先解决者获得显著增量。
5. **运营级功能（成本预算、审批流）决策滞后于需求**：per-agent 预算（#42475，23 评论）三个月无 go/no-go。多 Agent 规模化部署的成本治理是被压抑的强需求，对商业化的智能体平台是明确机会窗口。
6. **自动化维护工作流成为项目竞争力**：@steipete 的密集 PR 输出与 Hermes 的 autofix/sweever 标签体系表明，AI 辅助维护本身已是头部开源智能体项目的生存能力指标。

**一句话结论**：OpenClaw 以通道广度和内存系统领先但正为发布质量付出代价，Hermes 以维护效率和产品化速度见长但欠下安全与数据完整性债务；两者共同的胜负手在于**升级链路可靠性与上下文治理的正确性**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目日报 — 2026-09-27

## 1. 今日速览

- 过去 24 小时共 **500 条 Issue 更新**（新开/活跃 418，关闭 82）与 **500 条 PR 更新**（待合并 325，合并/关闭 175），无新版本发布。项目处于**高度活跃**状态，社区贡献与维护节奏均非常强劲。
- 讨论焦点集中在 **Windows 平台的安装/更新（install-update）链路**：PM 运行时迁移、venv 隔离、`hermes update` 网关检查等多个 P1/P2 问题集中爆发，构成当前最突出的稳定性风险面。
- 桌面端（Desktop）多 profile / 多后端会话隔离问题持续发酵，社区已有多份针对性 fix PR 提交。
- 视觉工具链（vision）成为今日 PR 热点，围绕 #124509 出现一组快速修复。

---

## 2. 版本发布

无新版本发布。鉴于 P1 级 Windows 安装/更新 bug 密集（#122222、#122593），建议维护者优先评估一次补丁版本的时机。

---

## 3. 项目进展

数据中未标注具体合并 PR 明细（已合并/关闭共 175 条），从活跃 PR 可判断的推进方向：

- **桌面多 profile 会话隔离**：[#124520](https://github.com/NousResearch/hermes-agent/pull/124520) 修复 stored-transcript 探测未按 profile 归属解析导致 404 的问题，直击 #88897 一类长期痛点。
- **视觉工具链修复三连**（围绕 #124509）：[#124522](https://github.com/NousResearch/hermes-agent/pull/124522)（尺寸预算先于字节预算减半）、[#124515](https://github.com/NousResearch/hermes-agent/pull/124515)（MPF 头误判 JPEG）、[#124512](https://github.com/NousResearch/hermes-agent/pull/124512)（缩小 ≥2x 时提示小字不可靠）——图像输入质量显著提升。
- **Web 渲染器**：[#93508](https://github.com/NousResearch/hermes-agent/pull/93508) `hermes webapp` 浏览器托管 Desktop 渲染器，是架构级功能，持续迭代中。
- **自动化基建**：[#124498](https://github.com/NousResearch/hermes-agent/pull/124498) 改进 autofix 工作流可观测性；[#124517](https://github.com/NousResearch/hermes-agent/pull/124517)、[#124514](https://github.com/NousResearch/hermes-agent/pull/124514) 为例行机器人格式化 PR（已关闭）。
- **安全/部署**：[#119255](https://github.com/NousResearch/hermes-agent/pull/119255) 反向代理路径前缀修复；[#108719](https://github.com/NousResearch/hermes-agent/pull/108719) fallback 路由 service tier 泄漏。

整体看，项目在**桌面端健壮性、视觉/工具质量、企业部署场景**三条线上同步推进。

---

## 4. 社区热点

| Issue | 热度 | 主题 |
|---|---|---|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | 147 评论 | 自动化 Nous 集成被 cron 冲突阻塞，长期未解，社区 frustration 明显 |
| [#122183](https://github.com/NousResearch/hermes-agent/issues/122183) | 24 评论（已关闭） | Windows PM 运行时旧 venv 抢占导致 `pydantic_core` 导入崩溃 |
| [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) | 22 评论 | Keet 网关 setup 向导 TypeError，阻塞第三方平台接入 |
| [#122495](https://github.com/NousResearch/hermes-agent/issues/122495) | 17 评论 | `hermes update` 因身份识别误判中止 |
| [#112639](https://github.com/NousResearch/hermes-agent/issues/112639) | 15 评论 | RFC：脚本级速度的 computer use（语义状态 + runahead 执行），高质量架构讨论 |

诉求分析：Windows 重度用户对**升级路径的可靠性**期待最高；#112639 反映进阶用户对 agent 执行性能上限的追求；#116305（已关闭，12 评论）显示插件生态 intake 流程运转顺畅。

---

## 5. Bug 与稳定性（按严重度）

**P1**

- [#122222](https://github.com/NousResearch/hermesResearch/hermes-agent/issues/122222) ⚠️ 链接修正：[实际链接](https://github.com/NousResearch/hermes-agent/issues/122222) — 自管理安装上**所有 cron 任务在 ownership ack 前失败**（外部 worker PYTHONPATH 被清洗）。暂无对应 fix PR。
- [#122593](https://github.com/NousResearch/hermes-agent/issues/122593) — PM 物化安装缺 `pm/uv.lock`，**所有 `hermes pm` 子命令不可用**。暂无 fix PR。
- [#120582](https://github.com/NousResearch/hermes-agent/issues/120582) — **生产数据丢失**：proactive prune + compression 会话中截断参数、打桩工具结果（附 state.db 证据）。needs-decision，影响可信度，需优先。
- [#44729](https://github.com/NousResearch/hermes-agent/issues/44729)（安全，P1）— SimpleX 发送方白名单可被显示名碰撞绕过。自 6 月开放至今，**建议安全审计跟进**。

**P2**

- [#123971](https://github.com/NousResearch/hermes-agent/issues/123971) — Windows Desktop 启动网关时 `hermes update` 重启后检查必报 exit 1（更新实际成功）。
- [#122299](https://github.com/NousResearch/hermes-agent/issues/122299) — kanban worker spawn argv 在父进程判定可导入性，子进程失效（👍 3）。
- [#122292](https://github.com/NousResearch/hermes-agent/issues/122292) — `browser_exec` 命中旧版 browser-use CLI 时返回 usage 文本当 success。
- [#122353](https://github.com/NousResearch/hermes-agent/issues/122353) — 更新后 tag fetch 重新应用 `--filter=tree:0`，全量克隆变回部分克隆并触发 git 断言崩溃。
- [#120545](https://github.com/NousResearch/hermes-agent/issues/120545) — macOS launchd 网关导致 Fast User Switching 卡顿 20-30s。
- [#122490](https://github.com/NousResearch/hermes-agent/issues/122490) — bot-to-bot DM runner 继承无三方依赖的 store python（`No module named 'ruamel'`）。
- [#94778](https://github.com/NousResearch/hermes-agent/issues/94778) / [#106217](https://github.com/NousResearch/hermes-agent/issues/106217) — 多后端共享 HERMES_HOME 时会话状态串扰、Desktop 死锁报错（部分由 #124520 方向缓解）。

**已关闭/已修复信号**：#122183（24 评论）、#91675（Windows 网关冷启动）、#107387（skill 斜杠命令静默丢 prompt）、#99648（/new 会话嵌套为分支）于今日关闭，显示 Windows/桌面修复批次正在落地。

---

## 6. 功能请求与路线图信号

- [#112639](https://github.com/NousResearch/hermes-agent/issues/112639) RFC：**语义状态 + runahead 执行的“脚本速度”computer use**——与现有 terminal 工具改进（#108468）方向一致，若被采纳将成为下一代核心能力。
- [#116305](https://github.com/NousResearch/hermes-agent/issues/116305)（已关闭）：Desktop 插件 SDK hook 清单（composer draft、settings gateway、typed bridge 等），配套插件生态 intake（今日 [#124519](https://github.com/NousResearch/hermes-agent/pull/124519) 新插件 `hermes-self-healing-context` 入目录申请）。
- [#93508](https://github.com/NousResearch/hermes-agent/pull/93508) webapp 模式与 [#111090](https://github.com/NousResearch/hermes-agent/pull/111090) Discord 实时转写，均活跃迭代中，可能进入下个功能版本。

---

## 7. 用户反馈摘要

- **痛点集中在升级**：Windows 用户反复报告“更新本身成功但校验失败/网关崩溃”（#123971、#122495、#122353），侵蚀信任；有用户附上完整 workflow run 与 state.db 证据（#120582），显示用户群技术深度高、投入度大。
- **多 profile / 多设备用户**是 desktop bug 的主要报告者（#94778、#106217、#88897），诉求是会话归属与隔离的确定性。
- **满意点**：插件目录 intake 高效（12+5 个插件一次过审）；维护者对 bug 报告的跟进分派（sweeper 风险标签体系）被认为清晰。
- #88584 的 147 条评论反映对**自动化集成长期挂起**的不满，需官方表态。

---

## 8. 待处理积压

| Issue | 开放时长 | 说明 |
|---|---|---|
| [#44729](https://github.com/NousResearch/hermes-agent/issues/44729) | ~3.5 个月 | **安全 P1**，SimpleX 白名单绕过，最应优先 |
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | ~1.5 个月 | 147 评论无收敛，建议维护者给出处置结论 |
| [#69033](https://github.com/NousResearch/hermes-agent/issues/69033) | ~2 个月 | Windows 终端工具孤儿进程，长期未修 |
| [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) | ~1 个月 | Keet setup 崩溃，阻塞平台接入 |
| [#117915](https://github.com/NousResearch/hermes-agent/issues/117915) | 6 天 | 压缩阈值配置静默覆盖（needs-decision），影响 1M 窗口模型成本 |
| [#120582](https://github.com/NousResearch/hermes-agent/issues/120582) | 4 天 | 生产数据丢失，needs-decision，建议升级处理优先级 |

**健康度总评**：贡献与响应活跃度优秀（175 PR 合并/关闭、82 Issue 关闭），但 Windows install-update 链路 bug 群与一个 3 个月未处理的安全 issue 是当前两大风险点，建议在下一个版本集中清理。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*