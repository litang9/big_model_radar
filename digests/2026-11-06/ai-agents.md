# OpenClaw 生态日报 2026-11-06

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-06 00:56 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-06

## 1. 今日速览

OpenClaw 今日继续保持高活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 233，关闭 267，净关闭 34 条），PR 更新 500 条（待合并 316，已合并/关闭 184），并发布稳定版 **v2026.11.1**。社区讨论焦点集中在 Gateway 可靠性（Windows 启动/更新、macOS `gateway stop` 失败、大插件捕获阻塞事件循环）以及 SQLite worker 内存回归。贡献者生态健康，社区提交的修复 PR（如 `update cleanup` 系列修复）质量较高，多个 PR 已标记 "ready for maintainer look"。整体健康度良好，但 P0 级稳定性积压问题数量偏多，需关注。

---

## 2. 版本发布

### v2026.11.1（稳定版）

**Highlights：**
- **更安全的 Mac 设置**：配置保存失败时不再覆盖 secrets；关闭 Tailscale 暴露后 Gateway 鉴权保持完好（#187734、#187664，修复 #187600、#187597，感谢 @anmol0b）
- **更可靠的渠道回复**：Telegram、Discord 与 webhook 会话回复改进（Release note 截断，详见发布页）

**迁移注意：**
- 值得注意的是，多个 Issue 提到部分修复（如 #164445 历史状态恢复）只进入 prerelease `v2026.11.5-beta.1`，**不在稳定版 v2026.11.1 中**——从旧版本升级前建议确认目标修复是否已包含在稳定版（参见 [#141474](https://github.com/openclaw/openclaw/issues/141474) 更新说明）。

---

## 3. 项目进展

今日 PR 侧活动以修复与 CI 效率优化为主：

- **更新/清理可靠性**：@fuller-stack-dev 提交两个基于真实 Mac 环境验证的修复——中断后的 cleanup 死锁（[#193745](https://github.com/openclaw/openclaw/pull/193745)）与重启后无法回收旧回滚备份（66 GB 占用，[#193743](https://github.com/openclaw/openclaw/pull/193743)）
- **CI 测试选择优化**（#191191 系列，@vincentkoc）：按变更 owner 精确选择 Python skill 套件（[#193830](https://github.com/openclaw/openclaw/pull/193830)）、按包导出选择测试（将 2,195 个文件的调度范围大幅收窄，[#193826](https://github.com/openclaw/openclaw/pull/193826)）、Android 独立测试 owner（[#193834](https://github.com/openclaw/openclaw/pull/193834)）
- **Web UI / 性能**：@steipete 的主题颜色回读性能优化（[#193807](https://github.com/openclaw/openclaw/pull/193807)）与独立元数据查找成本降低（[#193639](https://github.com/openclaw/openclaw/pull/193639)，已关闭）
- **发布工程**：恢复 11.5 发布工具（[#193767](https://github.com/openclaw/openclaw/pull/193767)，已关闭）、修复 state worker 与发布校验 fixtures（[#193791](https://github.com/openclaw/openclaw/pull/193791)）、插件 OIDC 鉴权失败延迟化（[#193800](https://github.com/openclaw/openclaw/pull/193800)）
- **CJK 检索**：为双字符中日文查询添加 bigram 伴随 FTS 索引（[#193815](https://github.com/openclaw/openclaw/pull/193815)），解决 trigram 分词器下"設定"“台北”等常见词无法命中问题——对中文/日文用户是重要利好

**评估**：今日 184 个 PR 合并/关闭，横跨 CLI、Gateway、UI、渠道、发布工程多个层面，项目推进节奏稳健；CI 精准化系列 PR 显示维护者正在系统性压缩测试成本，为大版本迭代蓄力。

---

## 4. 社区热点

**评论最活跃的 Issues：**

1. [#160959](https://github.com/openclaw/openclaw/issues/160959)（74 评论，P0 🦞）— Gateway 捕获大型外部插件时阻塞事件循环数分钟（2026.9.6 回归）。自 9 月底持续发酵，已有源码级复现但尚无修复 PR，是当前社区不满情绪最集中的问题。
2. [#170956](https://github.com/openclaw/openclaw/issues/170956)（29 评论，P0）— Windows 托管服务安装下启动慢、插件关闭不干净、schtasks 权限错误导致重启/更新频繁失败。反映 Windows 一等公民体验仍有差距。
3. [#178359](https://github.com/openclaw/openclaw/issues/178359)（25 评论，P1）— `doctor --fix --non-interactive` 空转 15 分钟以上无输出。Doctor 作为用户"最后的救命工具"不可靠，引发较多共情讨论。
4. [#166634](https://github.com/openclaw/openclaw/issues/166634)（24 评论）— 崩溃恢复后 SQLite reclamation checkpoint 失败导致 agent 永久 UNAVAILABLE。
5. [#191944](https://github.com/openclaw/openclaw/issues/191944)（19 评论，11 月 3 日新开）— macOS 上 `gateway stop` 与 `stop --force` 均失败（进程谱系检查错误），属高频日常操作受阻。

**诉求分析**：热点问题高度集中于 **Gateway 生命周期管理**（启动、停止、更新、恢复）这一核心链路，用户期待的是"自愈式"运维体验，而现实是多个环节互相依赖（见下文 #161921 的死锁式依赖）。

---

## 5. Bug 与稳定性（按严重程度）

### P0
| 问题 | 状态 |
|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) 大插件捕获阻塞 Gateway 数分钟 | ❌ 无修复 PR，needs-maintainer-review |
| [#40001](https://github.com/openclaw/openclaw/issues/40001) Write 工具无 append 模式，隔离 cron 会话覆盖共享文件（**数据丢失**，3 月至今） | ❌ 需产品决策 |
| [#161921](https://github.com/openclaw/openclaw/issues/161921) 升级失败后 `doctor --fix` 与 `plugins update` 互相要求先运行对方（死锁） | ❌ 无修复 PR |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) 402 计费错误冷却时间持久化，充值后仍被封数小时 | ❌ 4 月至今 |
| [#142821](https://github.com/openclaw/openclaw/issues/142821) 默认开启的 transcript 脱敏污染重放的 agent 上下文（**安全**） | 有 linked PR |
| [#158912](https://github.com/openclaw/openclaw/issues/158912) MEMORY.md 不再在 bootstrap 注入，与文档不符 | 待确认 |

### P1
- [#191847](https://github.com/openclaw/openclaw/issues/191847)（11.3 新报）：2026.10.10 **回归** — 大型 Telegram 会话反复击穿 512 MB SQLite worker（ERR_WORKER_OUT_OF_MEMORY），每轮对话失败 "admission is closed"。❌ 无修复 PR
- [#178359](https://github.com/openclaw/openclaw/issues/178359) Doctor 空转。❌
- [#155563](https://github.com/openclaw/openclaw/issues/155563) service-child relay/MCP 组在回合结束后未释放（2026.9.5 回归）。❌
- [#166017](https://github.com/openclaw/openclaw/issues/166017) `mcp.sessionIdleTtlMs` 默认值未生效 → 256 子进程爆满后全部 exec 失败。有 linked PR
- [#182647](https://github.com/openclaw/openclaw/issues/182647) Cloud worker 会话在推理前失败 "Session capability metadata requires worker preparation"。标记 queueable-fix，可修复方向明确
- [#187729](https://github.com/openclaw/openclaw/pull/187729)（PR）`openclaw agent` 在模型提问时静默等待 900 秒。✅ 有修复 PR，ready for maintainer look

### P2 及其他
- [#191944](https://github.com/openclaw/openclaw/issues/191944) macOS `gateway stop` 失败（新）
- [#177094](https://github.com/openclaw/openclaw/issues/177094) Control UI 系统通知镜像将最终回答挤入折叠工具步骤
- [#193745](https://github.com/openclaw/openclaw/pull/193745) / [#193743](https://github.com/openclaw/openclaw/pull/193743) update cleanup 两个修复 ✅ 有 PR
- [#193158 相关 PR #193829](https://github.com/openclaw/openclaw/pull/193829) Telegram sent-message cache 写入失败 ✅

---

## 6. 功能请求与路线图信号

**可能纳入下一版本的（已有 PR 或讨论成熟）：**
- **CJK bigram FTS 索引**（[#193815](https://github.com/openclaw/openclaw/pull/193815)）— 直击中日文检索痛点，进度最快
- **Provider 自定义名称与图标**（[#192792](https://github.com/openclaw/openclaw/pull/193792)）— XL 规模，waiting on author
- **Gateway 重启后 pending questions 显示为过期而非丢失**（[#193837](https://github.com/openclaw/openclaw/pull/193837)）
- **Feishu 进度流式卡片**（[#131457](https://github.com/openclaw/openclaw/issues/131457)）— 与 Slack/Discord/Telegram 等已支持渠道对齐，需求明确

**尚在产品决策阶段：**
- 禁用托管插件目录 feed（[#164620](https://github.com/openclaw/openclaw/issues/164620)，隐私/离线诉求）
- Write 工具 append 模式（#40001）
- `infer model run --prompt-file`（[#140244](https://github.com/openclaw/openclaw/issues/140244)）
- QQ 渠道长期支持计划澄清（[#150743](https://github.com/openclaw/openclaw/issues/150743)，已关闭但社区疑虑未完全消解）

---

## 7. 用户反馈摘要

**痛点：**
- **更新与自愈是最大挫败来源**：多条 Issue 描述“多次重试才成功”（#170956）、doctor 空转（#178359）、升级失败后互相死锁（#161921）、18 个回滚备份占 66 GB 无法回收（#193743 背景）
- **大状态量用户受损**：大会话（#191847）、大插件（#160959）、大量 session/cron（#166526，doctor 需 473 秒 vs 60 秒预算）系统性性能问题
- **静默失败最令人沮丧**：原生应用中 dashboard 链接点击无任何反馈（#142606）、CLI 提问静默 900 秒（#187728）、无诊断信息的静默丢弃（#172969）
- **中文/日文用户**：FTS 双字查询不可用（#193815 印证）

**满意点：**
- 社区修复 PR 基于真实环境验证且描述详尽（#193743、#193745），多位高活跃贡献者（@steipete、@vincentkoc、@RomneyDa 等）持续产出
- Bot 驱动的自动化分类标签体系（clawsweeper）运转良好，Issue 分诊透明
- 多渠道支持（Telegram/Discord/Slack/Matrix/Feishu 等）生态广度受认可

---

## 8. 待处理积压（提醒维护者关注）

| Issue | 年龄 | 严重度 | 状态 |
|---|---|---|---|
| [#40001](https://github.com/openclaw/openclaw/issues/40001) Write 无 append 模式（数据丢失） | **8 个月** | P0 | 需产品决策 |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) 计费冷却锁死 | **6 个月+** | P0 | 需维护者/产品 |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) 大插件阻塞 Gateway | 1 个月+ | P0 🦞 | 已源码复现，无修复 PR |
| [#161921](https://github.com/openclaw/openclaw/issues/161921) doctor/plugins 互相死锁 | 1 个月+ | P0 | 无修复 PR |
| [#121232](https://github.com/openclaw/openclaw/issues/121232) memory-core dreaming "Ranked N, Promoted 0" 永久循环 | 3 个月 | P2 | 需产品决策 |
| [#124306](https://github.com/openclaw/openclaw/issues/124306) 审批卡不提示挂载点风险（安全） | 3 个月 | P2 | 需决策 |
| [#126874](https://github.com/openclaw/openclaw/issues/126874) Windows CI 仅覆盖 0.6% 测试套件 | 2 个月+ | P2 | 已关闭，但与 #170956 Windows 可靠性问题相关，建议关注 |

**观察**：多个 P0 问题带 `clawsweeper:needs-maintainer-review` / `needs-product-decision` 标签超过一个月，其中 2 个超过半年。建议维护者优先处理已有源码复现的 #160959 与涉及数据丢失的 #40001；同时今日多个 CI 测试选择 PR 合入后，或可重新评估 Windows CI 覆盖率问题的解法。

---

*数据来源：GitHub API（Issues/PR/Releases），统计窗口 2026-11-05 至 2026-11-06。*

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析 — 2026-11-06

## 1. 生态全景

个人 AI 助手/自主智能体开源生态当前处于**高速扩张与架构深水区并行**的阶段：头部项目日均 Issue/PR 更新均触及 500 条量级，表明用户基数已从尝鲜期进入准生产部署期。生态共同的技术主线是**统一网关化架构**（OpenClaw Gateway、Hermes unified gateway #106742）——将 CLI、桌面、消息渠道、cron 收归单进程托管，随之而来的是生命周期管理、会话状态持久化、压缩连续性等“长时运行可靠性”成为两大项目共同的痛点中心。插件/扩展目录机制均在快速繁荣，且都出现了向“可验证性与运维性”演进的信号。Windows 平台体验落后是全生态的系统性短板。

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 233，关闭 267，**净关闭 +34**） | 500（新开/活跃 443，关闭 57，**净增 +386**） |
| PR 更新（24h） | 500（待合并 316，合并/关闭 184） | 500（待合并 300，合并/关闭 200） |
| Release | v2026.11.1（稳定版） | v0.23.0 "The Hearth"（~10,080 commits、1,950 PR、666 贡献者的巨型版本） |
| 核心风险 | P0 积压 6 项，2 项超半年（#40001 数据丢失、#70903 计费锁死） | 统一网关 post-merge 回归长尾（#134889/#143547），issue 净增长失控 |
| 健康度评估 | **质量巩固期**：净关闭为正、社区修复 PR 质量高、CI 精准化降本 | **激进扩张期**：吞吐极高但回归收敛速度待验证 |

## 3. OpenClaw 在生态中的定位

- **优势**：Issue 净关闭为正（+34 vs Hermes +386 净增），分诊自动化（clawsweeper bot）运转良好；社区贡献 PR 基于真实环境验证、质量高；发布节奏稳健（稳定版 + beta 双轨）。但注意社区已对比 OpenClaw 的 **11k 开放 issue 积压**（Hermes #7335 中提及），绝对积压量远大于 Hermes。
- **技术路线差异**：OpenClaw 的 Gateway 架构更成熟稳定（问题集中在边缘场景如 macOS stop、Windows 更新）；Hermes 刚完成统一网关大迁移，处于“激进重构—回归修复”周期，但路线图更前沿（跨网关 Bot 协作 RFC #97681、doc-chain substrate #143379）。
- **社区规模**：Hermes 单版本周期 666 位贡献者，扩张速度更快；OpenClaw 贡献者画像更偏“高质量核心修复者”（@steipete、@fuller-stack-dev 等）。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent |
|---|---|---|
| **CJK 检索** | #193815 双字查询 bigram FTS 索引（PR 进行中） | #134779 短 CJK 词触发全量 LIKE 扫描超时（未修） |
| **网关生命周期可靠性**（启动/停止/更新/自愈） | #160959、#161921、#170956、#178359、#191944 | #134889/#143547 回归簇、#127284 启动卡死无自愈、#102540 update 超 6 分钟 |
| **SQLite/存储 worker 内存与稳定性** | #191847 512MB worker 击穿、#166634 checkpoint 失败 | #133739 0 字节 kanban.db fail-closed、状态落盘失真 #122813 |
| **Windows 二等公民问题** | #170956、#126874（CI 覆盖 0.6%） | stdin/NUL 死锁 #144287、WinError 5 #68128、Desktop 体验簇 |
| **会话压缩与记忆治理** | MEMORY.md 注入问题 #158912、脱敏污染 #142821 | warm handoff #133625、并发交叉污染 #46303 |
| **审批可见性** | 挂载点风险不提示 #124306 | 审批不可见丢失 #133514 |
| **多渠道消息生态** | Telegram/Discord/Feishu/QQ 等 | WhatsApp 桥接、群聊跨机器 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 渠道广度（多 IM 渠道一等支持）、自愈式运维工具（doctor）、插件托管生态 | 多 agent 编排（kanban 调度、子代理、fleet）、跨机器/跨所有者协作、记忆架构深度 |
| 目标用户 | 个人助手日常使用者、多渠道消息重度用户 | 准生产多 agent fleet 部署者、架构探索型用户 |
| 技术架构 | 稳定 Gateway + 插件体系，渐进演进 | 激进统一网关重构，RFC 驱动（doc-chain、跨网关协作） |
| 迭代策略 | 稳定版/beta 双轨，CI 成本精准化压缩 | 巨型版本（万级 commits），post-merge 快速修补 |

## 6. 社区热度与成熟度

- **快速迭代阶段**：Hermes Agent——443 新开 issue/日、巨型 release、插件 catalog 每日新增；但净增失控 + 外部贡献通道受阻（#131859 API 权限错误）是治理隐患。
- **质量巩固阶段**：OpenClaw——净关闭为正、CI 系统性降本、社区修复 PR 涌现；但 P0 长期积压（数据丢失类 #40001 拖 8 个月）与 11k 绝对积压是成熟度污点。
- 两者共同点：用户均已从报 bug 转向架构治理讨论，标志社区进入“长时运行”成熟期。

## 7. 值得关注的趋势信号

1. **网关统一是行业共识，回归长尾是必然代价**——两大项目同年完成/巩固网关化，生命周期管理（启动/停止/更新/恢复）成为新的竞争壁垒。“自愈式运维”（doctor、fallback 链、TTL 自愈）将是下一阶段核心差异化能力。
2. **CJK/本地化检索是被低估的刚需**——两项目均有未修的中文检索缺陷，率先系统性解决者将赢得中日用户群。
3. **静默失败是最大 UX 公敌**——“无输出 900 秒”“无诊断信息丢弃”引发的挫败远超功能缺失；可观测性（诊断、进度提示、状态落盘真实性）值得开发者作为一等设计目标。
4. **向“可验证 agent”演进**——Hermes 插件生态涌现进度证明熔断器、完成声明验证、阅读审计类插件；OpenClaw 的审批安全讨论同向。可信与可审计将成为插件生态的分水岭。
5. **Windows 是全生态空白地带**——CI 覆盖率低 + 平台特定 bug 簇集中，对寻求差异化的新项目是明确切入点。
6. **Issue 治理决定社区情绪**——维护者亲自复现 bug（Teknium #149448）与自动化分诊均受好评；积压超半年且涉及数据丢失的 issue（OpenClaw #40001）是信任风险的典型样本，建议任何智能体项目建立 P0 积压的硬性 SLA。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-06

## 1. 今日速览

Hermes Agent 今日处于**高活跃度状态**：过去 24 小时 Issues 更新 500 条（新开/活跃 443，关闭 57），PR 更新 500 条（待合并 300，已合并/关闭 200），并发布了重量级新版本 **v0.23.0 "The Hearth Release"**——距 v0.22.0 累计约 10,080 次提交、1,950 个合并 PR、850 个关闭 issue、666 位贡献者，是项目历史上规模最大的版本之一。社区焦点高度集中在 **统一网关（unified gateway, #106742）合并后的稳定性修复**上，多条 P1/P2 级追踪 issue 持续发酵。插件生态持续繁荣，今日新增多个 catalog 插件 PR（nurse、headway、lemma、faxforagents 等）。总体判断：项目功能扩张迅猛，但架构大迁移（统一网关）带来的回归风险仍是当前健康度的主要威胁。

---

## 2. 版本发布

### v0.23.0 — The Hearth Release（2026-11-05 发布）

**规模数据**（since v0.22.0）：
- ~10,080 commits · ~1,950 merged PRs · ~8,720 files changed
- ~725,200 insertions / ~201,400 deletions
- ~850 issues closed · 666 contributors

**核心内容**：本版本以 "The Hearth"（炉灶/门阈）为题，与统一网关架构（#106742，10 月 14 日合并至 main）的落地周期高度吻合——CLI、TUI、本地 Desktop、API server、编辑器、消息 bot、cron 任务、Kanban 卡片与群聊的全部会话轮次已收归单一网关进程托管。

**⚠️ 迁移注意事项**：
- 统一网关是深度架构变更，目前 **#134889、#143547 两条追踪 issue 仍在收尾 post-merge 修复**，升级前建议阅读；
- Windows 平台存在多处已知风险（stdin/NUL 死锁、WhatsApp 桥接 WinError 5），Windows 用户升级需谨慎；
- v0.22.x 用户注意群聊（cross-machine group chats）行为在 v0.22.x 后被破坏、v0.23 修复链路见 #148466。

链接：https://github.com/NousResearch/hermes-agent/releases（v0.23.0）

---

## 3. 项目进展

近 24 小时 200 个 PR 被合并/关闭，重点方向：

**统一网关修复线（主线）**
- [#149623](https://github.com/NousResearch/hermes-agent/pull/149623)（已关闭）：修复 Dashboard 鉴权不识别 Desktop session-token 头的问题——Desktop 远程连接 dashboard 被误拒，属统一网关整合后的直接修补。
- [#148466](https://github.com/NousResearch/hermes-agent/pull/148466)（已关闭）：恢复"无 Desktop 的跨机器群聊"能力，修复 v0.22 系列引入的回归。
- [#144701](https://github.com/NousResearch/hermes-agent/pull/144701)：网关 WebSocket 串行队列导致 `session.control.read` 错过 30 秒超时，影响 Webapp/桌面控制面。

**会话与记忆子系统**
- [#149763](https://github.com/NousResearch/hermes-agent/pull/149763)：允许子代理在 `checkpoint_required` 下压缩记忆并暂缓 prune，修补记忆一致性风险。
- [#133625](https://github.com/NousResearch/hermes-agent/pull/133625)：压缩器"warm handoff"（`compression.warm_handoff: off|on|auto`），摘要写入主模型缓存提示词，减少独立辅助请求的缓存浪费——性能向重要特性。

**调度与投递**
- [#148960](https://github.com/NousResearch/hermes-agent/pull/148960)：cron 输出失控重复时的分块防护 + per-job run limits 生效。
- [#53383](https://github.com/NousResearch/hermes-agent/pull/53383)：cron 交付输出边界（FINAL_CRON_OUTPUT）规范化，长跑 PR 终见推进。

**判断**：合并节奏约 2:3（合并:待合），社区贡献大量进入评审队列（300 待合并），核心维护者精力集中于网关收尾。

---

## 4. 社区热点

| Issue | 热度 | 主题 |
|---|---|---|
| [#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（已关闭） | 226 评论 | **统一网关 post-merge 追踪**：CLI/gateway/desktop/Windows 多面回归的母追踪 issue，是社区最大关切 |
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) | 56 评论 | 贡献者 @kuehnberger 无法通过 API 创建 PR（权限错误），blocked/on upstream，影响外部贡献链路 |
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) | 50 评论 | #134889 的续篇：统一网关在 main 上的开放问题清单（sessions/profiles/compression/bots 全覆盖） |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 40 评论，👍4 | **Bot 跨网关协作**：个人 agent 跨机器、未来跨所有者协作的基础设施 RFC，是路线图级讨论 |
| [#143379](https://github.com/NousResearch/hermes-agent/issues/143379) | 35 评论 | "Doc-chain substrate" RFC：持久记录、来源保留与压缩治理，安全/架构向深度讨论 |
| [#7335](https://github.com/NousResearch/hermes-agent/issues/7335)（已关闭） | 20 评论 | 开放 issue 超 1000 的治理讨论，社区对比 OpenClaw 的 11k 积压 |

**诉求分析**：社区讨论从"报 bug"转向"架构治理"——网关统一后，会话状态、投递语义、压缩连续性成为核心议题（#138836、#139347 均属此类），表明用户群已从早期尝鲜转向长时运行的准生产部署。

---

## 5. Bug 与稳定性（按严重度）

**P1 / 高危**
- [#127284](https://github.com/NousResearch/hermes-agent/issues/127284)：`source-completion-pending` 无 TTL 无自愈，一次被杀的安装 tail 会让**此后每次启动都卡死**。awaiting-reporter，暂无明确 fix PR。
- [#144287](https://github.com/NousResearch/hermes-agent/pull/144287)（fix PR）：Windows 上 mem0/holographic memory 配置下 **所有 kanban 卡片静默失败并泄漏进程**（stdin/NUL 死锁），作者自评"P1 级效果"。fix 已提交待合并。

**P2 / 中危**
- [#119070](https://github.com/NousResearch/hermes-agent/issues/119070)：kanban 卡片被限速一次后永远卡在 `blocker_auth`，reviewer 永不启动。
- [#133514](https://github.com/NousResearch/hermes-agent/issues/133514)：后台 delegate 子任务在父轮次结束后请求审批，`/approve` 报告"无待审批"——审批不可见且丢失。
- [#138836](https://github.com/NousResearch/hermes-agent/issues/138836)：Desktop Kanban notify/wake、压缩连续性、attention 事件生命周期缺口合集。
- [#46303](https://github.com/NousResearch/hermes-agent/issues/46303)：**并发会话交叉污染**（共享记忆注入 + 共享 git worktree），长期 P2 未修，多 agent 场景下风险高。
- [#139347](https://github.com/NousResearch/hermes-agent/issues/139347)：hosted-room 有限转录清除仍被 settlement 引用的用户，触发 planner 校验异常。
- [#122813](https://github.com/NousResearch/hermes-agent/issues/122813)：`gateway_state.json` 的 `active_agents` 在 cron/API-server 运行期间不落盘，监控/外部观测失真。
- [#133739](https://github.com/NousResearch/hermes-agent/issues/133739)：一个 0 字节 `kanban.db` 导致全部 workspace 清理 fail-closed。
- [#68128](https://github.com/NousResearch/hermes-agent/issues/68128)：Windows no-breakaway job object 下 WhatsApp 桥接 spawn 失败（WinError 5），文档承诺的 fallback 未实现。
- [#102540](https://github.com/NousResearch/hermes-agent/issues/102540)：`hermes update` 耗时超 6 分钟且提示不友好。

**性能**
- [#134779](https://github.com/NousResearch/hermes-agent/issues/134779)：短 CJK 检索词 + 时间过滤仍触发全量 LIKE 扫描，SQLite 操作可超出工具超时（420s）。

**模式提示**：P2 集中在 kanban 调度器、cron 投递、会话状态持久化三大簇，与统一网关迁移高度相关，预计是 v0.23.x 补丁版本的主战场。

---

## 6. 功能请求与路线图信号

**可能进入下一版本**（已有 PR 或强维护者参与）：
- 压缩 warm handoff（[#133625](https://github.com/NousResearch/hermes-agent/pull/133625)，PR 进行中）→ 压缩性能优化方向明确。
- 跨网关 Bot 协作（[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)，40 评论，审查队列中）→ "跨机器→跨所有者"是官方路线图语言。
- 群聊成员 gateway 中途消失时延迟其轮次（[#149775](https://github.com/NousResearch/hermes-agent/pull/149775)，11-06 新提交）。

**活跃需求信号**：
- [#68771](https://github.com/NousResearch/hermes-agent/issues/68771)：provider 503 应触发 fallback 链而非重试后失败——可靠性呼声高。
- [#5320](https://github.com/NousResearch/hermes-agent/issues/5320)：`memory_char_limit` 默认值过小（2200 字符），请求自动扩容与用量可见性。
- [#20765](https://github.com/NousResearch/hermesResearch/hermes-agent/issues/20765)：浏览器 Dashboard 语音模式（WebRTC 采集，👍6），远程服务器场景刚需。
- Windows 桌面体验簇：最小化与托盘解耦（[#119120](https://github.com/NousResearch/hermes-agent/issues/119120)）、通知音量（[#87473](https://github.com/NousResearch/hermes-agent/issues/87473)，👍8）、隐藏本地网关（[#96532](https://github.com/NousResearch/hermes-agent/issues/96532)，👍10）、Enter 换行（[#52952](https://github.com/NousResearch/hermes-agent/issues/52952)）——Windows Desktop 用户群情绪明确。

**插件生态**（今日新增 catalog PR）：nurse（pm2/systemd 服务管理 #149438）、headway（进度证明熔断器 #149777）、lemma（agent 阅读审计 #149514）、argos（Godot 4 编辑器桥 #148706）、faxforagents（#148907/#148908）、proofops 完成声明验证（#149625）——生态向"可验证性/运维性"演进。

---

## 7. 用户反馈摘要

**痛点**：
- **升级与大迁移代价高**：v0.22→v0.23 的网关统一让老用户（尤其群聊、Desktop 用户）遭遇行为回归，多条 issue 明确标注"从 v2026.8.31 起被破坏"。
- **Windows 是二等公民感受**：WinError 5、stdin 死锁、更新缓慢、Desktop 交互细节缺失集中爆发。
- **长时运行可靠性**：多 agent fleet 用户的真实事故报告（[#148761](https://github.com/NousResearch/hermes-agent/issues/148761)：2026-11-03 fleet 碰撞事故，含 parent card 双 episode 时间线）说明用户已把 Hermes 用于准生产，对状态持久化、审批可见性、隔离性要求陡增。
- **可观测性不足**：`hermes kanban diag` 看不到 worktree 冲突、`gateway_state.json` 失真、update 无进度提示。

**满意点**：
- 记忆持久化 + "agent 不需要用户重复"的设计（doc-chain RFC 的正面共鸣）。
- 插件 catalog 机制活跃，社区维护者（插件作者本人按 rule 5 提交）参与顺畅。
- Teknium 等核心维护者亲自复现用户 bug（#149448），响应质量受认可。

---

## 8. 待处理积压

- **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)**（blocked/on upstream，10-03 起）：贡献者 API 建 PR 权限错误——影响外部贡献通道，建议优先跟进 GitHub 侧排查。
- **[#46303](https://github.com/NousResearch/hermes-agent/issues/46303)**（6-14 起，P2）：并发会话交叉污染，多 agent 场景下的数据完整性隐患，近 5 个月未修。
- **[#68128](https://github.com/NousResearch/hermes-agent/issues/68128)**（7-20 起，P2，Windows）：WhatsApp 桥接 spawn 失败，文档承诺的 API 缺失。
- **[#105758](https://github.com/NousResearch/hermes-agent/issues/105758)**（9-08 起，needs-decision）：终端生命周期守卫误杀 Node CLI，波及 obsidian-headless 等工具链。
- **[#119070](https://github.com/NousResearch/hermes-agent/issues/119070)**（9-22 起，needs-decision）：kanban `blocker_auth` 永久卡死。
- **[#102540](https://github.com/NousResearch/hermes-agent/issues/102540)**（9-03 起）：update 性能体验。
- **治理层面**：开放 issue 数持续增长（#7335 讨论），配合今日 443 新开 vs 57 关闭的比率，建议加强 triage/自动关闭策略与 P1/P2 簇的专项冲刺（kanban、cron 投递、Windows）。

---

**健康度总评**：贡献吞吐极高（日均数百 PR 更新、666 贡献者版本周期），生态扩张健康；但 issue 净增长显著、统一网关迁移的回归长尾尚未收敛，**v0.23.1 的修复速度将决定未来两周的社区情绪走向**。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*