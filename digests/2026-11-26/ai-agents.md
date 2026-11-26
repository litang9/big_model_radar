# OpenClaw 生态日报 2026-11-26

> Issues: 337 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-26 02:49 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-11-26

---

## 1. 今日速览

- **整体活跃度：高**。过去 24 小时共 837 条动态（Issues 更新 337 条，其中新开/活跃 223、关闭 114；PR 更新 500 条，其中待合并 272、已合并/关闭 228），关闭率约 46%（Issue）/ 45.6%（PR），消化速度与流入速度基本匹配，项目处于健康的高吞吐状态。
- **发布节奏稳定**：今日窗口内有两个版本 —— 主线 **v2026.11.10**（累积 8,309 commits、7,671 PRs、349 contributors）与 extended-stable（类 LTS）**v2026.10.34**。
- **主题聚焦**：当前社区与维护者的工作重心明显集中在三条线上——**更新/升级路径可靠性（Doctor/rollback）**、**SQLite/内存资源问题**、以及 **MEMORY.md 信任链与 prompt-cache 复用**。
- **风险信号**：多个 P0 级 issue（升级部分完成、MEMORY.md 静默失效）仍处 open 状态且带 `clawsweeper:needs-maintainer-review` 标签，是当前最大的健康度隐忧。

---

## 2. 版本发布

### v2026.11.10 — openclaw 2026.11.10
- 里程碑规模：**8,309 commits · 7,671 pull requests · 349 contributors**
- Release notes 与 changelog 内容一致，发布于 [docs.openclaw.ai](https://docs.openclaw.ai/releas)
- 累积了 11 月上旬至今的全部主线变更，包含大量更新链路、会话状态与 UI 修复（详见下文 Issue/PR 关联）。

### v2026.10.34 — openclaw 2026.10.34
- **gateway-only `extended-stable`（当前 LTS 等价物）**：基于 2026 年 10 月底版本，叠加关键安全更新、可靠性与性能修复，以及新模型支持。
- **迁移注意**：LTS 用户若依赖 11 月主线新功能（如新的 update finalizer），需评估是否切换到 stable 通道；从 #185085 可见部分主线修复（#177063）尚未进入 stable/extended-stable 通道，跨通道用户应核对具体修复是否落地。

---

## 3. 项目进展

今日 PR 活动密集，方向上可归纳为四类：

**① 更新链路可靠性攻坚（本日最集中）**
- [#205669](https://github.com/openclaw/openclaw/pull/205669) 修复 Doctor 迁移前的 retired `skills.workshop` 配置校验误拒问题（refs #205485，问题在 `release/2026.11.11` 上仍存在）
- [#205666](https://github.com/openclaw/openclaw/pull/205666) Discord 插件状态迁移期间保留 typed owner，防止虚假的 requester 撤销报告
- [#205675](https://github.com/openclaw/openclaw/pull/205675) 限定迁移 finalizer 的递归清理并验证中断恢复（对应 #205547 的停顿报告）
- [#205701](https://github.com/openclaw/openclaw/pull/205701) 通过 fs-safe 以零字节读取 SQLite lock（draft，阻塞于 openclaw/fs-safe#1111）

**② 会话与子代理（subagent）语义**
- [#205482](https://github.com/openclaw/openclaw/pull/205482) 重构 subagent 完成行退休规则，将两个 handed-off 标志统一为单一规则（security-sensitive，长期方向性变更）
- [#205712](https://github.com/openclaw/openclaw/pull/205712) 修正 helper 被错误指示 "reply NO_REPLY" 导致结果丢失的问题
- [#205687](https://github.com/openclaw/openclaw/pull/205687) memory flush 期间向 reply watchdog 报告流式进度，防止长会话回复被误杀（#205566）

**③ Gateway 稳定性**
- [#205709](https://github.com/openclaw/openclaw/pull/205709)（**P1**）容器被杀后恢复启动：新 namespace 无法检查旧锁 PID 导致 `GatewayLockNamespaceError`，现可恢复（closes #203932）
- [#205688](https://github.com/openclaw/openclaw/pull/205688) 无关插件的 pending 时间戳更新不再阻塞插件启用
- [#204785](https://github.com/openclaw/openclaw/pull/204785)（**P1**）后台命令完成后保持 owner memory 受信任（对应 #204767，与 MEMORY.md 信任链主题直接相关）

**④ Control UI / Workboard 打磨**
- [#205703](https://github.com/openclaw/openclaw/pull/205703)（已关闭）流式 formatter 加载失败时消息卡在 "Not sent"，现可继续发送
- [#205707](https://github.com/openclaw/openclaw/pull/205707) / [#205711](https://github.com/openclaw/openclaw/pull/205711) / [#205710](https://github.com/openclaw/openclaw/pull/205710) 修复粘贴文本末尾字符被截断系列问题（含 UTF-16 代理对）
- [#205693](https://github.com/openclaw/openclaw/pull/205693) 大型自动化清单（201 项）下侧边栏去重排序
- [#204361](https://github.com/openclaw/openclaw/pull/204361)（已关闭）修复 "People" 在 8 个语言下被翻译成“人力资源”的经典 i18n 事故

**评估**：今日单日 PR 密度极高（272 待合并、228 已处理），更新链路与 subagent 状态机是明确的架构级投入；配合 #204775 的 prepared-release 设计文档，说明团队正在系统性重构 update 路径，而非逐个打补丁。

---

## 4. 社区热点

| 排名 | Issue | 热度 | 核心诉求 |
|---|---|---|---|
| 1 | [#164294](https://github.com/openclaw/openclaw/issues/164294) Gateway state DB WAL auto-checkpoint 永不完成（44 评论） | P2, open | SQLite WAL 被进程内 reader 长期 pin，checkpointedFrames 仅 866 / logFrames 17091，自启动以来从未成功 checkpoint——与多项内存/DB 问题同根 |
| 2 | [#197083](https://github.com/openclaw/openclaw/issues/197083) 升级 11.1→11.3 后 Doctor 失败致更新部分完成（40 评论） | **P0, open** | 升级激活新核心后验证失败，拒绝回滚（`state-migrated-no-rollback`），外部插件处于不一致状态 |
| 3 | [#182891](https://github.com/openclaw/openclaw/issues/182891) prompt cache 永不复用（28 评论，**今日关闭**） | closed | `cache read dropped N -> 0` 每请求发生，涉及 envelope 重写与 runtimeContextCarrier 变化——关闭可能意味着修复落地，值得跟进 |
| 4 | [#153426](https://github.com/openclaw/openclaw/issues/153426) MEMORY.md/USER.md 被来源 ratchet 静默永久排除（25 评论） | **P0, open** | 安全/产品决策双 pending，普通 agent 行为（一次 web 搜索）即可触发 "untrusted"，无诊断、无 CLI、无恢复手段 |
| 5 | [#148707](https://github.com/openclaw/openclaw/issues/148707) 回复丢失 "no active tool authority snapshot"（23 评论） | P1, open | 2026.9.4 回归，同一会话第二个 run 挤掉 in-flight turn，消息永久丢失 |

**诉求分析**：热点高度集中于**“用户数据/记忆不可丢”**与**“升级不可把用户置于半完成状态”**两大主题。MEMORY.md 相关两个 P0（#153426、#158912）合计 36 评论，反映社区对“信任判定不可逆且无诊断”设计的不安；升级链路热点（#197083、#200606、#200756、#204816、#203442）合计近百评论，直接推动了本日更新链路 PR 密集落地。

---

## 5. Bug 与稳定性（按严重程度）

### P0
- [#197083](https://github.com/openclaw/openclaw/issues/197083) 升级后状态部分完成，无回滚路径 — **无 fix PR，needs-maintainer-review**
- [#153426](https://github.com/openclaw/openclaw/issues/153426) MEMORY.md 被静默永久排除 — 相关方向已有 [#204785](https://github.com/openclaw/openclaw/pull/204785)（保持 owner memory trusted），但未直接 close
- [#158912](https://github.com/openclaw/openclaw/issues/158912) 2026.9.6 上 MEMORY.md 不再注入 bootstrap，文档与行为不一致 — 与上项同链
- [#190563](https://github.com/openclaw/openclaw/issues/190563) 无法恢复暂停的 Codex 会话（provider review/native thread 不匹配）— regression，无 fix PR

### P1
- [#196199](https://github.com/openclaw/openclaw/issues/196199) 2026.10.10 起 Codex helper 完成后无法 resume parent，goal 暂停、用户被锁在助手外（20 评论）— 无 fix PR
- [#148707](https://github.com/openclaw/openclaw/issues/148707) turn 被挤掉导致回复丢失 — 无 fix PR
- [#185085](https://github.com/openclaw/openclaw/issues/185085) exec completion wake 丢失，#177063 修复未进 stable 且错误不重试 — **修复已有但未发布到 stable**
- [#181432](https://github.com/openclaw/openclaw/issues/181432) baseline RSS 从 ~300MB 暴涨至 1.9GB + SQLite 事务超时 → 崩溃循环
- [#204816](https://github.com/openclaw/openclaw/issues/204816) 11.4→11.8 候选验证通过但激活期 Doctor 失败回滚 — 更新链路 PR 群（#205669/#205666/#205675）应部分覆盖
- [#203442](https://github.com/openclaw/openclaw/issues/203442) 11.4→11.10-beta.1 激活 Doctor "Plugin deepseek source must be prepared" 失败
- [#181662](https://github.com/openclaw/openclaw/issues/181662) npm 更新期间 Gateway 停机 ~19 分钟且逐版增长

### P2（资源/性能类，今日仍活跃）
- [#164294](https://github.com/openclaw/openclaw/issues/164294) WAL checkpoint 永久阻塞（44 评论，最高热度）
- [#192547](https://github.com/openclaw/openclaw/issues/192547) 1GiB ARM64 主机就绪后首响应前 OOM
- [#143017](https://github.com/openclaw/openclaw/issues/143017) 21.3M cache-write token 的五类前缀重写（生产流量实证）
- [#186683](https://github.com/openclaw/openclaw/issues/186683) claude-cli surface 切换即全量重写 prompt cache
- [#182143](https://github.com/openclaw/openclaw/issues/182143) sqlite-vec KNN 逐候选重算余弦距离（~1.1s/query）
- [#200224](https://github.com/openclaw/openclaw/issues/200224) 退役 heartbeat 配置在 beta 升级时陷入两难

**已关闭的好消息**：#182891（cache 永不复用）、#191847（SQLite worker 512MB OOM）、#160522（prepared-model-catalog worker 1.15GB）、#177094（delivery mirror 挤掉最终回复）均已关闭，资源与显示类问题消化明显。

---

## 6. 功能请求与路线图信号

**可能进入下一版本（有活跃 PR/明确维护者参与）：**
- [#204775](https://github.com/openclaw/openclaw/issues/204775) **prepared-release 更新设计文档**（17 评论，今日更新）——明确列出“已落地/进行中/归属”，是更新链路重构的总蓝图，几乎确定主导 v2026.11.11+
- [#150238](https://github.com/openclaw/openclaw/issues/150238) Skill Workshop 上下文预算/跳过策略 — `linked-pr-open`
- [#121558](https://github.com/openclaw/openclaw/issues/121558) cron claude-cli narration 融入正式消息 — `linked-pr-open`，maintainer 参与
- [#164065](https://github.com/openclaw/openclaw/issues/164065) Telegram requireMention 未拦截裸 slash 命令 — `linked-pr-open`

**仍在决策阶段（needs-product-decision）：**
- [#56349](https://github.com/openclaw/openclaw/issues/56349) 不可绕过的出站策略强制（pre-send guarantee，2026-03 老请求，security）
- [#192009](https://github.com/openclaw/openclaw/issues/192009) 显式授权跨 provider cron fallback 账户（已关闭，可能转向其他方案）
- [#140213](https://github.com/openclaw/openclaw/issues/140213) 多策略别名解析到同一模型（已有 decision packet）
- [#170562](https://github.com/openclaw/openclaw/issues/170562) Doctor 恢复卡死的 requester settle wake

**已放弃/暂缓：** [#168624](https://github.com/openclaw/openclaw/issues/168624)（Android Auto）、[#159743](https://github.com/openclaw/openclaw/issues/159743)（升级后调查）均于 11 月中明确转为 proposal-only。

---

## 7. 用户反馈摘要

- **真实痛点集中在“升级即风险”**：多条高热度 issue（#197083、#200606、#200756、#204816）来自普通 npm 全局用户，场景是托管升级后 Doctor 失败、被拒绝回滚、插件半迁移——用户被迫手工修复状态。Windows 用户在 package-swap 阶段失败尤其突出。
- **长会话/大状态用户承压最重**：1.9GB RSS（#181432）、966MB agent DB（#186683）、512MB worker OOM（#191847）、19 分钟升级停机（#181662）等报告均来自长期运行的生产部署（Telegram/WhatsApp 接入、多 agent 网关、ARM64 小主机）。资源足迹是稳定用户群流失的潜在风险点。
- **信任模型的挫败感**：MEMORY.md 被“来源 ratchet”静默除名（#153426）让用户感到“助手悄悄忘了我是谁”，且无任何日志或恢复入口——多位用户强调这是个人 AI 助手的核心价值受损。
- **成本敏感**：prompt cache 复用失败系列（#182891、#143017、#186683）的量化报告（21.3M token 实测）显示重度用户在真金白银地多付 API 费用，是 repro 质量最高的 issue 群。
- **正面信号**：社区 repro 质量极高（线缆抓包、生产流量分析、cgroup 复现脚本），PR 提交者生态多样（含 roboclaw-bot/tideclaw-bot 等自动化贡献与多位独立个人贡献者），349 contributors 的基数支撑了今日 S/XS 级 UI 修复的持续流入。

---

## 8. 待处理积压（维护者关注清单）

| Issue | 年龄 | 状态 | 关注理由 |
|---|---|---|---|
| [#112313](https://github.com/openclaw/openclaw/issues/112313) 死信投递队列永久残留 | 4 个月+ | stale, fix-shape-clear | 数据永久残留、`openclaw health` 永久计数，shape 已明确却无人接手 |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) WAL checkpoint 永久阻塞 | ~2 个月，44 评论 | needs-maintainer-review | 全站最高热度，可能是多个内存/DB 问题的共同根因 |
| [#127195](https://github.com/openclaw/openclaw/issues/127195) 16 处调用点抛出字节相同的错误，无原因码 | 3 个月+ | fix-shape-clear | 直接拖累所有生产排障效率 |
| [#123792](https://github.com/openclaw/openclaw/issues/123792) CLI 后端回复双份渲染 | 3 个月+ | stale | 稳定复现，影响 webchat 与 Android |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) 回复丢失（2026.9.4 回归） | 2 个月+，23 评论 | open | P1 消息丢失，无 fix PR |
| [#119475](https://github.com/openclaw/openclaw/issues/119475) WhatsApp LID DM 静默丢弃（24h 内 79 个唯一发送者） | 3 个月+ | P1, open | 生产消息丢失，涉及增长中的 LID 用户群 |
| [#153426](https://github.com/openclaw/openclaw/issues/153426) / [#158912](https://github.com/openclaw/openclaw/issues/158912) MEMORY.md 注入失效 | 2-3 个月 | **P0 × 2** | 双 P0 长期无决策，建议尽快给出产品/security 决议 |

**积压健康度评估**：新增 issue 消化良好（46% 关闭率），但 P0 与 stale 长尾的“决策瓶颈”明显——多数积压项卡在 needs-product-decision / needs-maintainer-review 而非修复难度。建议优先裁决：① MEMORY.md 信任链方案；② WAL/内存根因统一治理；③ 更新链路半完成状态的标准恢复路径（#204775 蓝图已在推进，宜加速落地到 stable）。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告
**数据窗口：2026-11-26（OpenClaw、Hermes Agent）**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正进入**高吞吐、深度工程化**阶段：头部项目单日动态量均达 800+ 条，讨论焦点已从功能可用性转向**状态可靠性、记忆信任链、资源足迹与升级路径安全**等生产级命题。两个头部项目（OpenClaw、Hermes Agent）均采用 gateway + 插件 + 多通道（Telegram/WhatsApp/QQ 等）的架构收敛形态，说明生态底层范式已趋同。同时差异化的战略分叉开始显现：OpenClaw 以 prepared-release 蓝图系统性重构更新链路，Hermes 则向插件平台化 + Cloud 托管方向扩张。**“助手不能悄悄忘记用户、不能在升级时弄丢用户状态”** 成为贯穿全生态的社区信任底线议题。

---

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 动态（24h） | 337（新开/活跃 223，关闭 114） | 351（新开/活跃 324，关闭 27） |
| PR 动态（24h） | 500（待合并 272，处理 228） | 500（待合并 384，处理 116） |
| Issue 关闭率 | ~46% | ~8%（27/324） |
| PR 关闭率 | ~45.6% | ~23%（116/500） |
| Release | v2026.11.10（主线）+ v2026.10.34（extended-stable/LTS），双通道 | canary v0.23.4（含 Desktop DMG），仅 canary 通道 |
| 累积规模 | 8,309 commits / 7,671 PRs / 349 contributors | 未披露可比口径 |
| 健康度评估 | **高吞吐 + 高消化**：流入与关闭基本匹配，但 P0 决策瓶颈（needs-maintainer-review）构成隐忧 | **高流入 + 低消化**：PR 涌入快（384 待合并）但 issue 关闭率仅 8%，积压压力显著上升 |

**核心差异**：OpenClaw 处于“消化与流入赛跑且暂时打平”的状态；Hermes 处于快速扩张期，动能强但收敛能力尚未跟上，日报自身也提示“需在下一稳定版周期收敛”。

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **工程成熟度与发布纪律**：双发布通道（stable + extended-stable LTS），有明确的 milestone 管理和跨通道修复追踪（如 #185085 暴露的“修复未进 stable”问题本身就是通道纪律运作的证据）；349 contributors 的贡献基数支撑 S/XS 级修复持续流入。
- **系统性架构治理**：#204775 prepared-release 设计文档表明团队以“总蓝图 + PR 群”方式重构 update 路径（#205669/#205666/#205675），而非逐个打补丁；subagent 完成语义重构（#205482）也是长期方向性投入。
- **社区诊断质量**：线缆抓包、生产流量分析、21.3M token 实测等高水准 repro，形成罕见的“用户即共同工程师”生态。

**技术路线差异：**
- OpenClaw 当前攻坚点在**更新/回滚可靠性 + MEMORY.md 信任链 + SQLite/内存治理**，偏“守”——巩固已有用户的基础信任。
- Hermes 偏“攻”——插件 API 公共化、目录平台一键安装、无 agent 主机 Webapp（Cloud 前瞻）、proactive-hermes 主动式助理，扩张产品边界。

**社区规模对比**：OpenClaw 可量化（349 contributors、里程碑 8,309 commits）；Hermes 未披露可比数据，但其单日 issue 流入量（324）甚至高于 OpenClaw（223），热度层面不落下风——两者已构成生态第一梯队。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw 证据 | Hermes 证据 | 诉求本质 |
|---|---|---|---|
| **SQLite 状态库可靠性** | #164294 WAL checkpoint 永久阻塞（44 评论，全站最高热度）、#181432 1.9GB RSS | #147938 state.db 误判损坏回滚旧快照（P0）、#144413 Unicode 孤立代理崩溃 | 本地状态库是智能体的事实“大脑”，其锁/checkpoint/损坏判定质量直接决定数据安全 |
| **更新/升级路径安全** | #197083（P0 半完成无回滚）、#204775 蓝图、#185085 修复未进 stable | #131864 更新后无法 respawn、#147938 回滚数据丢失、#102540 更新耗时 6+ 分钟 | 两个项目均采用自管理升级，升级失败 = 用户被锁在助手外 |
| **记忆/上下文持久性与成本** | #153426/#158912 MEMORY.md 静默失效（双 P0）、#182891/#143017 prompt cache 不复用 | #143379 压缩后溯源保留 RFC（56 评论）、#53347 64K 上下文下限 | 记忆不可丢 + 上下文成本可控，是个人助手两大核心资产问题 |
| **调度闭环无死锁** | #148707 turn 被挤掉消息丢失、#177094 delivery 挤掉回复 | #119070/#121281 kanban blocker_auth 死锁、#144694 cron delivery_queued | 自动化任务链上任何静默死锁都会摧毁信任 |
| **多通道接入（Telegram/WhatsApp/QQ 等）** | WhatsApp LID DM 丢失（#119475）、Telegram #164065 | 目录平台 QQ Bot/Yuanbao 一键安装（#160183）、#149979 跨机媒体下载 | 消息通道是个人助手的第一触点，可靠性即产品 |

**关键判断**：SQLite 状态治理与升级路径安全是**两项目共有的第一优先级**，且两者症状高度相似（锁竞争、误判损坏、Windows 上问题集中），值得跨项目借鉴方案。

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| **功能侧重** | 更新链路可靠性（Doctor/rollback）、subagent 状态机、gateway 稳定性、Control UI/Workboard 打磨 | 插件生态平台化、目录式渠道集成、Desktop 体验、主动式助理（proactivity）路线图 |
| **目标用户** | 重度生产部署用户：长会话、多 agent 网关、Telegram/WhatsApp 常驻、ARM64 小主机；成本敏感的重度 API 用户 | 更宽光谱：本地 Ollama/轻量用户（16GB MacBook）、Windows always-on 自动化运维用户、即将覆盖的 Cloud/hosted 用户 |
| **架构关键差异** | 双发布通道（stable + extended-stable LTS）；MEMORY.md/USER.md 显式记忆信任链（来源 ratchet 机制）；349 人的分布式贡献 + bot 辅助 | 单 canary 快速通道；插件公共 API 开放（wrap_argv、staged write 审批 API）；无 agent 主机 Webapp 为 Cloud 铺路；Python 3.15 内置解释器切换准备 |
| **安全模型** | 记忆信任链 + 出站策略强制（#56349 议题） | shell hook 字节级审批 + “用户显式批准每个主动任务”的差异化主动式安全立场 |

**战略分野**：OpenClaw 走“深度信任巩固”路线，Hermes 走“广度平台扩张”路线。前者赌的是“留住重度用户”，后者赌的是“降低门槛扩大盘子”（Cloud + 目录平台 + Desktop）。

---

## 6. 社区热度与成熟度分层

| 阶段 | 项目 | 判断依据 |
|---|---|---|
| **质量巩固期（高成熟）** | OpenClaw | 46% issue 关闭率、双发布通道、LTS 通道维护、P0 有 PR 覆盖（如 #204785→#153426 方向）；但 P0 决策瓶颈（双 P0 悬置 2-3 个月）表明巩固尚未完成 |
| **快速迭代期（高动能）** | Hermes Agent | canary 通道日更、PR 涌入 384 条、issue 关闭率仅 8%、功能面快速扩张（插件/Cloud/Desktop）；数据回滚级 P0（#147938）尚无 fix PR，是快速迭代的典型代价 |

**成熟度信号交叉验证**：
- OpenClaw 的痛点多集中在“既有机制运行不完美”（WAL、ratchet、回滚拒断）；Hermes 的痛点多集中在“机制尚在搭建”（kanban 死锁、Windows 平台契约缺失）。
- 两者共同短板：**P0/决策级 issue 的裁决速度远落后于 S/XS 级修复速度**——打补丁快，做决策慢，是本日两个项目的通病。

---

## 7. 值得关注的趋势信号（对开发者的参考价值）

1. **“记忆信任链”正在成为个人 AI 助手的独立产品命题。** OpenClaw 的 MEMORY.md 静默失效双 P0 与 Hermes 的压缩溯源 RFC（#143379，56 评论）指向同一问题：记忆的**来源可信度、压缩持久化、可诊断可恢复**。任何构建长期记忆系统的智能体团队都应预设“用户会审计助手记得什么”，并提供显式的信任状态查询与恢复入口。

2. **本地 SQLite 状态库是智能体的隐形单点。** 两项目热度最高的问题群（WAL 阻塞、state.db 误判损坏、内存暴涨）都落在这一层。智能体开发者应在早期即建立：锁持有诊断、checkpoint 监控、损坏判定与回滚的保守策略（Hermes #147938 的教训：把活锁误判为损坏导致回滚数月旧快照）。

3. **自管理升级是高危面，需要“蓝图级”治理而非补丁。** OpenClaw 以 #204775 设计文档 + 一组 PR 系统性重构，是对“升级半完成 + 拒绝回滚”类 P0 的正确响应。自更新机制的必备件：原子激活、可验证回滚、跨通道修复落地追踪、Windows 专项契约测试。

4. **成本可观测性成为重度用户的硬需求。** prompt cache 复用失败类 issue 以 21.3M token 生产实测为证据——上下文重写即真金白银。缓存前缀稳定性应作为架构约束纳入设计，而非事后优化。

5. **主动式助理的差异化竞争点在“可控性”而非“主动性”本身。** Hermes 路线图明确“用户显式批准每个任务”以对标 Hark/dots/Muse/Grok，与其字节级审批 PR 呼应。行业信号：**审批粒度与安全面完整性**（如非 shell 工具绕过 #35357）将取代“能主动”成为下一阶段卖点。

6. **托管 Cloud 与本地轻量化双极分化。** Hermes 的 Cloud dashboard 铺路与本地 Ollama 用户对 64K 下限的抗议同时出现——生态同时在向两端延伸，中间地带（半托管、混合部署）可能是尚未被占领的机会区。

---

**一句话总结**：OpenClaw 与 Hermes Agent 分别代表生态的“深度信任巩固”与“广度平台扩张”两条路线；双方共同的下一道门槛都是 SQLite 状态治理与升级安全，而率先解决“记忆不可静默丢失、升级不可半途而废”的项目，将掌握个人 AI 助手的信任制高点。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目日报 — 2026-11-26

## 1. 今日速览

Herm Agent 今日保持极高活跃度：24 小时内 Issues 更新 351 条（新开/活跃 324，关闭 27），PR 更新 500 条（待合并 384，已合并/关闭 116），昨日发布 canary 版本 v0.23.4（含 Desktop DMG 产物）。社区讨论焦点集中在上下文压缩治理 RFC（#143379）、kanban 调度器长期遗留 bug 簇，以及 Desktop/多平台体验改进。整体节奏为“新 PR 涌入快、issue 关闭速率相对偏慢”（27/351 关闭比），积压压力需关注。

## 2. 版本发布

**canary.20261125T064800Z-v0.23.4**（2026-11-25 发布）
- 提供 Hermes Desktop macOS Apple Silicon DMG 下载。
- 为 canary 通道版本，属快速迭代产物；注意 canary 不适合生产部署，常驻部署建议停留在 stable 通道。
- Release Notes 未列破坏性变更；但结合 #147938 报告的“更新后 state.db 误判损坏并回滚快照”问题，Windows 用户更新前建议手动备份状态目录。

## 3. 项目进展

今日 PR 活跃（500 条更新、116 合并/关闭），代表性进展：

- **安全加固**：[#160265](https://github.com/NousResearch/hermes-agent/pull/160265) shell hook 审批现覆盖脚本字节级内容，插件更新/编辑后需重新审批——直接封堵 #35357 披露的非 shell 工具绕过审批面的缺口方向。
- **稳定性**：[#160275](https://github.com/NousResearch/hermes-agent/pull/160275) 修复 SQLite 写入遇孤立代理字符崩溃（对应 #144413）；[#160279](https://github.com/NousResearch/hermes-agent/pull/160279) 保留 launch authority 初始化错误；[#160253](https://github.com/NousResearch/hermes-agent/pull/160253) 保住晚注册插件平台的会话路由，不再静默删除（避免 Yuanbao 等目录平台会话状态丢失）。
- **生态扩展**：[#160183](https://github.com/NousResearch/hermes-agent/pull/160183) gateway setup / Desktop / dashboard 统一展示目录平台（QQ Bot、Yuanbao 等）并一键安装；[#160274](https://github.com/NousResearch/hermes-agent/pull/160274) 新插件 front-desk 0.2.0（升级分诊）；[#160233](https://github.com/NousResearch/hermes-agent/pull/160233) 插件 proactive-hermes（主动式执行助理）。
- **Cloud 布局**：[#159876](https://github.com/NousResearch/hermes-agent/pull/159876) 支持无 agent 主机运行 Webapp，为 hosted Cloud dashboard（agent.nousresearch.com）铺路——战略级信号。
- **基础设施**：[#160273](https://github.com/NousResearch/hermes-agent/pull/160273) 允许 Python 3.15 并入 CI，为切换内置解释器做准备；[#160269](https://github.com/NousResearch/hermes-agent/pull/160269) / [#160268](https://github.com/NousResearch/hermes-agent/pull/160268) 为终端环境插件发布公共 API（wrap_argv、command context），降低插件对私有内部结构的依赖。
- **体验修复**：[#160230](https://github.com/NousResearch/hermes-agent/pull/160230) 触屏键盘弹出时模型选择器可用；[#160231](https://github.com/NousResearch/hermes-agent/pull/160231) 修复 tui_gateway 丢弃排队 prompt 的两处竞态；[#160232](https://github.com/NousResearch/hermes-agent/pull/160232) 启动时等待 webapp 迟到的 host 地址。

整体看，今日推进以**稳定性修复 + 插件生态开放 + Cloud 前瞻**三条主线并行，步伐扎实。

## 4. 社区热点

- **#143379（56 评论，安全/压缩 RFC）**：["THE DOC-CHAIN SUBSTRATE'S NETWORK"](https://github.com/NousResearch/hermes-agent/issues/143379) —— 持久记录如何在压缩后保留溯源、让 agent 重读而非让用户重复。这是对记忆/上下文压缩架构的深度设计讨论，与 #156164（工具结果修剪后续）形成同一主题带，反映社区对“压缩不丢上下文”的核心诉求。
- **#119070（29 评论）+ #121281（10 评论）**：[kanban 卡片因 `blocker_auth` 永久卡死](https://github.com/NousResearch/hermes-agent/issues/119070)——两个多月未修的调度器 bug 簇，涉及 rate-limit 重试成功、手动 promote 两条路径，用户诉求是“任务自动化闭环不能有死锁点”。
- **#158538（12 评论）**：[Proactivity 路线图](https://github.com/NousResearch/hermes-agent/issues/158538)（作者 teknium1）——对标 Hark/dots/Muse/Grok，明确 Hermes“用户显式批准每个主动任务”的差异化定位，正与 #160233 proactive-hermes 插件呼应，是下一阶段方向性讨论。
- **#53347（12 评论，👍10）**：[放开 64K 上下文下限](https://github.com/NousResearch/hermes-agent/issues/53347)——本地 Ollama/轻量部署用户的最强呼声之一，长期 open。
- **#62780**：[跨平台统一会话](https://github.com/NousResearch/hermes-agent/issues/62780)——长期愿景型 feature，持续有讨论。

## 5. Bug 与稳定性（按严重程度）

**P0**
- **#147938**：[Windows 更新后 state.db 活锁被误判为损坏 → 回滚数月旧快照](https://github.com/NousResearch/hermes-agent/issues/147938)，且误报“恢复未完成”。数据丢失级问题，暂无 fix PR，**最高优先关注**。

**P2**
- **#144413**：[Unicode 孤立代理字符导致会话卡死 `paused: unknown_execution`](https://github.com/NousResearch/hermes-agent/issues/144413) → 已有 fix PR [#160275](https://github.com/NousResearch/hermes-agent/pull/160275)。
- **#146538**：[Windows 多 profile 下 gateway 每秒 34k–99k 文件系统元数据操作](https://github.com/NousResearch/hermes-agent/issues/146538)，吃满一核并致内核池增长——性能级回归，无 fix PR。
- **#138915**：[Dashboard 批量操作恒返回 409（gateway 占用 state.db）](https://github.com/NousResearch/hermes-agent/issues/138915)。
- **#156899**：[并发首次加载 profile 插件导致 "Unknown provider" 直到重启](https://github.com/NousResearch/hermes-agent/issues/156899)。
- **#149979**：[跨机器 Bot Chat 媒体下载失败 "Session not found"](https://github.com/NousResearch/hermes-agent/issues/149979)。
- **#127942**：[MCP `lazy: true` 从不生效（ttlMs=0 缓存立即过期）](https://github.com/NousResearch/hermes-agent/issues/127942)。
- **#131864**：[Windows 更新后 unit-less serve 进程无法 respawn，每次更新退出码 1](https://github.com/NousResearch/hermes-agent/issues/131864)。

**P2/P3 其他**
- **#154275**：[nixpkgs-unstable 的 patchelf 0.15.2 导致 patch 失败](https://github.com/NousResearch/hermes-agent/issues/154275)（上游原因）。
- **#90579**：[Desktop 侧栏 Project 分组隐藏 Messaging/Cron 区](https://github.com/NousResearch/hermes-agent/issues/90579)。
- 今日已修复关闭：#156709（FooteredReply deepcopy 崩溃）、#150617 / #131786（通知尾部截断）、#146254（bot relay 参数校验）、#159067（SIGUSR1 重启挂起）——通知/交付链路修复密集落地，值得肯定。

## 6. 功能请求与路线图信号

结合 issue 与在途 PR，可预判纳入后续版本的方向：

- **主动式助理**：#158538 路线图 + proactive-hermes 插件（#160233）+ #156164 工具结果修剪，三者构成“可控主动性”主线，落地概率高。
- **插件生态平台化**：#160183（目录平台一键安装）、#160274（front-desk）、#158550（staged write 公共审批 API）、#160268/#160269（终端环境公共 API）——插件面 API 持续开放，明显是当前投入重心。
- **Cloud/hosted 交付**：#159876 无 agent 主机 Webapp，为 Hermes Cloud 托管仪表盘铺路。
- **本地/轻量部署**：#53347（<64K 上下文）呼声高但长期 `needs-decision`，暂无在途 PR，短期内落地存疑。
- **跨平台统一会话**（#62780）：宏大愿景，相关底层（session 路由 #160253、tui_gateway 修复）在推进，但完整落地仍远。

## 7. 用户反馈摘要

- **本地模型用户**（#53347，👍10）：16GB MacBook + Ollama 用户被 64K 硬下限挡住，“简单问答/轻任务 32K 完全够用”——轻量化诉求被系统低估。
- **Windows 用户痛点集中**：#147938（数据回滚）、#146538（CPU 空转）、#131864（更新后无法自启）、#138915——Windows 一线（always-on 安装）体验显著落后，用户多为重度自动化运维场景。
- **自动化可靠性信任**：kanban 死锁簇（#119070/#121281）、cron 交付永久 `delivery_queued`（#144694）让依赖调度闭环的用户失去信任——“任务卡死且无告警日志”是反复出现的抱怨。
- **多机部署用户**：远程 gateway + Desktop 组合暴露多处会话/媒体/路由断裂（#149979、#146254 已修）。
- **正面信号**：报告质量高（复现步骤、根因分析、甚至附 patch，如 #46800）；通知/交付链路的修复密集合并，社区能感知到闭环速度。

## 8. 待处理积压

| Issue | 主题 | 年龄 | 状态 |
|---|---|---|---|
| [#53347](https://github.com/NousResearch/hermes-agent/issues/53347) | 64K 上下文硬下限 | ~5 个月 | needs-decision，👍10 |
| [#35357](https://github.com/NousResearch/hermes-agent/issues/35357) | 非 shell 工具绕过审批门（安全） | ~6 个月 | open；#160265 部分覆盖，建议关联跟进 |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) | kanban blocker_auth 死锁 | ~2 个月 | open，29 评论，needs-decision |
| [#62780](https://github.com/NousResearch/hermes-agent/issues/62780) | 跨平台统一会话 | ~4.5 个月 | open，愿景级 |
| [#102540](https://github.com/NousResearch/hermes-agent/issues/102540) | hermes update 耗时 6+ 分钟且提示不清 | ~3 个月 | open |
| [#90579](https://github.com/NousResearch/hermes-agent/issues/90579) | Desktop 侧栏信息架构 | ~3 个月 | open |

**维护者提醒**：① P0 的 #147938 涉及数据丢失，建议优先排期；② kanban 死锁簇（#119070/#121281/#144694）同根因面广，值得一次系统性修复；③ Windows 专项（性能 #146538 + 更新链 #131864/#147938）应形成 platform 契约测试；④ 关闭/新增比（27/324）偏低，长期积压趋势需在下一稳定版周期收敛。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*