# OpenClaw 生态日报 2026-10-27

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-26 23:50 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-27

## 1. 今日速览

OpenClaw 今日保持高度活跃：过去 24 小时内 Issues 更新 500 条（新开/活跃 397，关闭 103），PR 更新 500 条（待合并 170，已合并/关闭 330），无新版本发布。社区贡献以核心维护者 [@steipete](https://github.com/steipete) 的密集性能优化与测试瘦身系列 PR 为主导，单日产出 20+ 个 perf/test PR。与此同时，围绕 SQLite 存储、内存泄漏和 Windows 升级链路的多个 P0 级稳定性问题持续发酵，尚未见到对应修复 PR，构成当前最大的健康度风险。整体呈现"功能迭代快、底层稳定性债待偿"的态势。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭的 PR 以**性能优化**和**测试体系瘦身**两大主线为主：

**性能优化（多为 @steipete 产出）：**
- [perf(gateway): reuse unchanged GitHub polling responses](https://github.com/openclaw/openclaw/pull/185019) — GitHub 轮询对未变更响应复用已解析结果，显著降低网络与 CPU 开销
- [perf(agents): share resident transcript strings across reloads](https://github.com/openclaw/openclaw/pull/185156) — 会话重载时共享常驻 transcript 字符串，降低活跃运行的内存驻留
- [perf(cron): reuse search text within list snapshots](https://github.com/openclaw/openclaw/pull/185026) — cron 搜索文本复用，减少重复分配
- [perf(ui): keep creation routes from loading chat early](https://github.com/openclaw/openclaw/pull/184994)（状态：ready for maintainer look）— 路由懒加载优化，避免非聊天路由过早加载 Chat 代码

**测试体系瘦身（d625–d640 系列批次）：**
- [batch d625](https://github.com/openclaw/openclaw/pull/184973)、[batch d637](https://github.com/openclaw/openclaw/pull/185139)、[batch d639](https://github.com/openclaw/openclaw/pull/185166)、[batch d640](https://github.com/openclaw/openclaw/pull/185189) 等 — 系统性移除低价值重复测试，保留边界行为覆盖，无生产代码变更

**待评审的重要修复 PR（OPEN 状态）：**
- [fix(agents): derive fsPolicy for Gateway-built tools](https://github.com/openclaw/openclaw/pull/185094)（P1，🚨 security-boundary）— 修复 workspaceOnly 文件系统策略未传导至审批与媒体工具的安全边界缺口
- [fix(cron): scheduled automations run on wrong runtime](https://github.com/openclaw/openclaw/pull/185070)（P2，🚨 auth-provider）— 定时任务的运行时绑定错误，可能导致跨账户执行
- [fix(codex): settled-turn recovery rejects media-only user turns](https://github.com/openclaw/openclaw/pull/185186) — 修复纯媒体消息导致 Codex 会话恢复反复失败
- [fix: native Codex turns fail with "settlement is closed"](https://github.com/openclaw/openclaw/pull/185180) — 修复超过 6 分钟的正常 Codex 运行被看门狗误杀

**评估**：项目在代码质量与运行时开销方面持续推进，但今日合入内容以"无用户可见变化"的内部改进为主，与社区高声量的稳定性诉求（见下文）存在错位。

## 4. 社区热点

1. **[#143524](https://github.com/openclaw/openclaw/issues/143524)（139 评论，P0，已关闭）** — Agent SQLite WAL 文件数天内膨胀至 1.4–2.8 GB 导致网关无法启动。该 issue 今日关闭，但标签中 `clawsweeper:no-new-fix-pr` 与 `needs-maintainer-review` 表明关闭原因可能并非修复落地，社区对"关闭即解决"存在疑虑，评论区持续活跃。
2. **[#160959](https://github.com/openclaw/openclaw/issues/160959)（57 评论，P0，OPEN）** — 2026.9.6 引入的回归：外部大型插件导致网关事件循环阻塞数分钟。作为已知回归且标记 `no-new-fix-pr`，用户对修复时间线的不满在评论中集中体现。
3. **[#159662](https://github.com/openclaw/openclaw/issues/159662)（26 评论，P0，OPEN）** — `prepared-model-catalog.worker.js` 无界内存泄漏（4–5 GB/小时），已冷启动复现且与 Provider 无关。今日活跃的 #185197（模型目录 speed policy 复用）可能与该 worker 相关，但无直接关联修复 PR。
4. **[#170956](https://github.com/openclaw/openclaw/issues/170956)（20 评论，P0，OPEN，ux-release-blocker）** — Windows 上启动慢、插件关停不干净、schtasks 权限错误三重叠加导致重启/更新极不可靠。
5. **[#172091](https://github.com/openclaw/openclaw/issues/172091)（16 评论，已关闭）** — 跨线程 admission 等待未应答导致 SQLite 事务永久挂起、阻断 WAL checkpoint——与 #143524 同根源，值得维护者确认两题是否真正闭环。

**诉求分析**：热点高度集中在 **存储层（SQLite/WAL）健康**、**内存治理** 与 **Windows 升级/重启可靠性** 三条主线，均为生产部署的硬阻断问题。

## 5. Bug 与稳定性

| 优先级 | 问题 | 状态 / Fix PR |
|---|---|---|
| P0 | [#160959](https://github.com/openclaw/openclaw/issues/160959) 网关捕获大型插件时事件循环阻塞数分钟（2026.9.6 回归） | OPEN，**无 fix PR** |
| P0 | [#159662](https://github.com/openclaw/openclaw/issues/159662) worker 内存泄漏 4–5 GB/h | OPEN，**无 fix PR** |
| P0 | [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows 重启/更新不可靠 | OPEN，**无 fix PR** |
| P0 | [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 agent 永久 UNAVAILABLE | OPEN，标记 not-repro-on-main |
| P0 | [#139082](https://github.com/openclaw/openclaw/issues/139082) update 后置健康检查假阴性致网关停摆 | OPEN，需信息 |
| P1 | [#181432](https://github.com/openclaw/openclaw/issues/181432) 2026.10.5 基线 RSS 从 300MB 涨至 1.9GB | OPEN，无 fix PR（与 #159662 可能相关） |
| P1 | [#182476](https://github.com/openclaw/openclaw/issues/182476) Windows update repair 失败 OPENCLAW_STATE_LEASE_LOST | OPEN，无 fix PR |
| P1 | [#183786](https://github.com/openclaw/openclaw/issues/183786) Windows beta 升级卡在查询已停止的网关 PID | OPEN，无 fix PR |
| P1 | [#177656](https://github.com/openclaw/openclaw/issues/177656) 2026.10.5 上 native host exec 出现 integrity-admission 错误（≥28 次） | OPEN，无 fix PR |
| P1 | [#178300](https://github.com/openclaw/openclaw/issues/178300) 1-token length 截断后被误报为成功 | OPEN，需 live repro |

**有修复在途的**：[#185121](https://github.com/openclaw/openclaw/pull/185180)（Codex settlement closed）、[#185079](https://github.com/openclaw/openclaw/pull/185186)（media-only turn）、[#184958](https://github.com/openclaw/openclaw/pull/185178)（updater runtime retention 中止）。

**结论**：最高优先级的存储/内存类 P0 均无修复 PR 在途，是当前最突出的风险敞口。

## 6. 功能请求与路线图信号

- **[iOS/macOS 个人身份与 Shared owner 共存](https://github.com/openclaw/openclaw/issues/162164)**（🦞 评级）— issue 内附贡献地图，首片 [#164593](https://github.com/openclaw/openclaw) 已于 10 月合并，属社区驱动、分片交付的活跃特性，大概率继续推进。
- **[内存压力感知的并发准入](https://github.com/openclaw/openclaw/issues/161050)**（P1）— 呼应 #159662/#181432 的内存问题，若被采纳将系统性缓解 OOM 类故障。
- **[主机级预执行授权守卫](https://github.com/openclaw/openclaw/issues/149024)**（含安全评审标签）— 与已开的 [#185094](https://github.com/openclaw/openclaw/pull/185094)（fsPolicy 传导，security-boundary）方向一致，安全边界收紧是明确趋势。
- **[MS Teams 动态解析 SharePoint 站点](https://github.com/openclaw/openclaw/issues/136271)** 与 **[sessions_send 延迟完成](https://github.com/openclaw/openclaw/issues/112372)** — 均有 linked-pr-open，有望进入下一版本。
- **[无头设备码登录](https://github.com/openclaw/openclaw/pull/184579)** — PR 已就绪，解决远程 VM 上的 OpenAI/Codex 认证过期问题，运维价值高。

## 7. 用户反馈摘要

- **Windows 用户痛感最强**：升级/修复流程（"试很多次才能成功"）、启动慢、断连 1006 是高频抱怨（#170956、#182476、#183786、#162899）。
- **长会话/多 Agent 生产用户受存储问题折磨**：数 GB 的 SQLite/WAL、内存以 GB/小时速度增长，导致被迫定期重启（#143524、#159662、#181432）。
- **Token 成本焦虑**：bootstrap 文件每轮重注入浪费 20–30% 上下文（[#67419](https://github.com/openclaw/openclaw/issues/67419)）、prompt-cache 前缀被五种方式反复改写、实测 2130 万 cache-write tokens 浪费（[#143017](https://github.com/openclaw/openclaw/issues/143017)）、同会话工具集漂移击穿缓存（[#146902](https://github.com/openclaw/openclaw/issues/146902)）——重度用户对成本敏感且证据扎实。
- **信任类缺陷**：拒绝 write 工具后记忆持久化被静默禁用、agent 却报告保存成功（[#126906](https://github.com/openclaw/openclaw/issues/126906)）；模型截断后虚假成功摘要（#178300）——用户强调"宁可报错，不要假成功"。
- **正面信号**：多个 issue 由外部用户提供源码级复现与本地补丁（如 [#134918](https://github.com/openclaw/openclaw/issues/134918)），社区工程质量高、参与度深。

## 8. 待处理积压

- **[#160959](https://github.com/openclaw/openclaw/issues/160959)**（P0，回归，创建近一个月，无 fix PR）— 最应优先处理的回归。
- **[#67419](https://github.com/openclaw/openclaw/issues/67419)**（4 月开立，stale）— Token 浪费问题存在超 6 个月，需产品决策。
- **[#129314](https://github.com/openclaw/openclaw/issues/129314)**（8 月，stale，needs-info）— 内部上下文泄漏为可见消息，影响 UX 信任。
- **[#144797](https://github.com/openclaw/openclaw/issues/144797)**（9 月，stale）— 复用 claude-cli 会话保留已删除的 MCP 配置致 401。
- **[#118793](https://github.com/openclaw/openclaw/issues/118793)**（8 月，linked-pr-open）— 会话限额未触发模型降级链，PR 长期未合并。
- **[#89430](https://github.com/openclaw/openclaw/issues/89430)**（6 月开立，linked-pr-open，已关闭但关联 PR 待合）— Google Chat 媒体投递 403。
- **[#101441](https://github.com/openclaw/openclaw/pull/101441)**（7 月开立的 PR，needs proof）— 社区 PR 搁置近 4 个月，建议维护者给出明确反馈以避免贡献者流失。

---
**健康度小结**：OpenClaw 开发吞吐量极高（日均 330+ PR 合并/关闭），代码质量工程（测试瘦身、性能剖析）系统化推进；但多个 P0 级存储与内存缺陷长期无修复在途，且与用户最强烈的诉求错位，建议维护者优先为 #160959、#159662、#170956 建立修复排期。

---

## 横向生态对比

# 个人 AI 智能体开源生态横向对比分析 — 2026-10-27

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**高吞吐量、深度整合期**：头部项目日均 Issue/PR 活动均达数百条，社区由“功能竞赛”转向“架构统一 + 稳定性偿债”阶段。两大代表性项目（OpenClaw、Hermes Agent）同期出现相似模式——大规模架构合并（统一网关、会话统一）后进入密集回归修复期，说明行业正从单体 Agent 工具向“网关中心化、多后端、多 profile”的平台化架构收敛。同时，**生产化硬指标**（存储健康、内存治理、升级可靠性、Token 成本）取代功能本身成为社区最强烈的诉求，标志着生态用户正从尝鲜者向生产部署者迁移。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 397，关闭 103） | 445（新开/活跃 358，关闭 87） |
| PR 更新（24h） | 500（合并/关闭 330，待合 170） | 500（待合 392，合并/关闭 108） |
| Release | 无 | 无 |
| 新增/关闭比 | ~3.9:1 | ~4.1:1 |
| 核心驱动 | 核心维护者 @steipete 密集 perf/test PR | 社区多方向修复 PR 涌入 |
| P0 级风险 | 5 项无 fix PR（存储/内存/Windows） | 1 项 P1（cron 数据丢失）+ 网关回归群 |
| 健康度评估 | ⚠️ 吞吐极高但与用户诉求错位 | ⚠️ 回归响应快但 PR 积压（392 待合）待消化 |

两个项目 Issue/PR 活动量级相当（均为头部水平），但结构不同：OpenClaw 是“维护者主导的质量工程”，Hermes 是“社区驱动的修复洪峰”。两者新增/关闭比均接近 4:1，**积压扩大是共性隐忧**。

## 3. OpenClaw 在生态中的定位

- **规模与吞吐领先**：日均 330+ PR 合并/关闭，测试瘦身已系统化到 d625–d640 批次，工程成熟度指标（代码质量、性能剖析）在同类中居首。
- **优势**：核心维护者产出密度极高（单日 20+ perf PR）；安全边界方向明确（fsPolicy 传导、预执行授权守卫）；社区工程质量深（用户可提供源码级复现与本地补丁）。
- **短板（相对 Hermes）**：最高声量的 P0（SQLite/WAL 膨胀、4–5 GB/h 内存泄漏、Windows 升级链）**全部无修复在途**，且存在“关闭即解决”的治理疑虑（#143524）；对比 Hermes 对网关回归的快速响应，OpenClaw 今日合并内容与用户诉求明显错位。
- **技术路线差异**：OpenClaw 走多运行时集成路线（Codex 原生会话、Gateway 构建、多 Provider）；Hermes 走统一网关后的插件化 + 契约化治理（Footprint Ladder、ABC 接口裁决），社区治理机制更前沿。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **上下文压缩/Token 成本** | #67419（bootstrap 重注入浪费 20–30%）、#143017（2130 万 cache-write 浪费）、#146902 | #133625（warm_handoff）、#138273（<64k 模型拒绝）、Doc-chain RFC #143379 | 压缩后延迟、prompt-cache 命中率、成本可观测 |
| **网关/多路复用架构** | Gateway 构建、事件循环阻塞 #160959 | 网关回归群 #139818/#143364/#142849 | 会话恢复、profile 隔离、跨 bot 串扰 |
| **Windows 可靠性** | #170956、#182476、#183786（升级链三重故障） | #145283（PATH 膨胀）、#68128（WinError 5） | 升级/重启/托管进程稳定性 |
| **Cron/定时任务可靠性** | #185070（运行时绑定错误） | #135487（database is locked 任务丢失）、#99988 | 任务持久化、失败分类准确性 |
| **安全边界** | #185094（fsPolicy 传导）、#149024（预执行守卫） | #145291/#145290（sudo 检测）、#143364（跨 bot 串扰） | 最小权限、工具级准入、隔离性 |

**Token 成本与上下文压缩是两项目同期最密集的共同主线**，且都从“功能”演进到“架构级方案”（cache 友好设计、压缩 handoff），是明确的行业级需求。

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多运行时（Codex 等）深度集成、内存压力感知并发、安全边界收紧 | 上下文压缩架构、语音接口标准化（RealtimeVoiceProvider）、Kanban 编排、插件目录生态 |
| 目标用户 | 长会话/多 Agent 生产部署者、重度 Token 消耗用户、Windows 运维用户 | 自托管多 bot 用户、桌面端（Linux/macOS/Windows）用户、外部贡献者 |
| 架构 | Gateway 中心 + 多 Provider 运行时，SQLite/WAL 存储 | 统一网关（#106742 后）+ LocalSessionAdapter + profile 多路复用 |
| 治理模式 | 核心维护者主导 + clawsweeper 自动化标签 | RFC 契约化（ABC 接口 + 编排器）、Footprint Ladder、风险标签体系 |
| 集成广度 | MS Teams/SharePoint、Google Chat、无头设备码登录 | Telegram、WhatsApp 桥接、ACP Registry（Zed/JetBrains/VS Code，待决策） |

## 6. 社区热度与成熟度

- **快速迭代阶段**：**Hermes Agent** —— 社区 PR 洪峰（392 待合）、插件目录扩充、RFC 活跃，处于架构统一后的扩张期；风险在于回归群未收敛前继续叠加功能。
- **质量巩固阶段（但执行偏差）**：**OpenClaw** —— 主观上在做质量工程（测试瘦身、perf 系列），但客观上 P0 债务未偿，处于“形式上巩固、实质上欠账”状态；若 #160959/#159662/#170956 两周内无修复排期，可能进入信任损耗期。
- **共同成熟度信号**：两者社区均能产出源码级复现和对照实验，报告质量高，说明用户群体已高度专业化。

## 7. 值得关注的趋势信号

1. **“宁可报错，不要假成功”**：OpenClaw #178300（截断误报成功）、#126906（静默禁用记忆持久化）反映用户对 Agent 可信性的要求超过对能力的要求——**可靠性 UX 将成为差异化竞争点**。
2. **Token 成本工程化**：cache 前缀保护、压缩 handoff、bootstrap 注入优化已成系统级课题；Agent 框架的竞争力正从“能做什么”转向“每 token 产出什么”。
3. **网关中心化成为主流架构**：两项目同期经历统一网关合并及后续回归潮，提示后来者：多后端/多 profile 的**隔离性与会话恢复**应作为一等公民提前设计。
4. **贡献者流程即生态健康**：Hermes 的 API 开 PR 权限阻塞（52 评论）与 OpenClaw 的 4 个月搁置社区 PR，都表明大规模项目中外部贡献通道的维护成本不可忽视。
5. **安全边界收紧是确定性方向**：文件系统策略传导、预执行授权守卫、sudo 检测精细化、跨 bot 串扰——Agent 获得执行权后，**准入与最小权限**是行业共识性投入。
6. **积压治理需要机制化**：两者新增/关闭比均为 ~4:1，自动化 sweep + 定期 needs-decision 裁决（Hermes 已在探索）将是可复用的治理范式。

**给开发者的建议**：选型上，追求多运行时集成与吞吐选 OpenClaw（但需自备存储/内存运维预案），追求压缩架构与契约化治理选 Hermes（但需关注网关回归收敛进度）；自建框架者应优先内建存储层健康监控、cache 友好的上下文管理和 profile 隔离。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-27

## 1. 今日速览

Hermes Agent 今日保持极高活跃度：过去 24 小时 Issues 更新 445 条（新开/活跃 358，关闭 87），PR 更新 500 条（待合并 392，合并/关闭 108）。社区贡献持续涌入，今日新开 PR 覆盖终端工具安全加固、vault 认证修复、TUI 稳定性、插件目录扩充等多个方向。无新版本发布，主干处于持续集成消化阶段。热点集中在统一网关（#106742 合并后）引发的会话恢复/多路复用回归问题，以及多 PR 竞争场景下的架构治理讨论。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日 PR 活动以修复与安全加固为主，值得关注的进展：

- **终端工具安全与可用性双修**：[#145291](https://github.com/NousResearch/hermes-agent/pull/145291) 将 sudo 提权检测限定到 sudo 自身选项段，减少误报；[#145290](https://github.com/NousResearch/hermes-agent/pull/145290) 在后端无 sudo 可执行文件时跳过密码提示；[#145271](https://github.com/NousResearch/hermes-agent/pull/145271) 暴露 `ssh_sync_files` 让回环 SSH 后端可关闭文件同步。
- **Vault/认证链路完善**：[#138191](https://github.com/NousResearch/hermes-agent/pull/138191) 修复 1Password 无 scheme URL 被静默跳过；[#143406](https://github.com/NousResearch/hermes-agent/pull/143406) 支持嵌套 shadow root 内登录控件发现（基于 #109425）。
- **上下文压缩方向深化**：[#133625](https://github.com/NousResearch/hermes-agent/pull/133625) 引入 `compression.warm_handoff`（off/on/auto），让压缩摘要在主模型缓存提示上生成，可显著降低压缩后首个请求的延迟与成本；[#138273](https://github.com/NousResearch/hermes-agent/pull/138273) 在提交前拒绝低于 64k token 上下文的模型选择，防止压缩死循环。
- **依赖安全**：[#145272](https://github.com/NousResearch/hermes-agent/pull/145272) 批量更新 undici/zod 等存在漏洞的 Node 依赖。
- **插件生态**：新增 hermes-finance 0.2.4（[#144762](https://github.com/NousResearch/hermes-agent/pull/144762)）、astro-agents 升级至 1.3.0（[#145260](https://github.com/NousResearch/hermes-agent/pull/145260)）；tide 上下文引擎目录申请经两轮迭代后关闭（#144724/#144732），流程仍在收敛。
- **Windows 稳定性**：[#145283](https://github.com/NousResearch/hermes-agent/pull/145283) 修复 PM 托管 PATH 重复累积导致 npm 无法解析 node 的问题。

整体看，项目在网关统一架构落地后进入密集修复期，社区对"合并后回归"的响应速度较快。

## 4. 社区热点

- **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（52 评论）**：贡献者 @kuehnberger 无法通过 API 向本仓库开 PR（CreatePullRequest 权限错误），标记 `cause/upstream`，影响外部贡献流入，需维护者跟进 GitHub 平台侧。
- **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（23 评论）**：统一网关 #106742 合并后遗留问题追踪帖（延续 #134889），涉及桌面会话、cron、Windows、profile 多个面，是当前最高优先级的回归汇聚点。
- **[#64231](https://github.com/NousResearch/hermes-agent/issues/64231)（31 评论）** 与 **[#77111](https://github.com/NousResearch/hermes-agent/issues/77111)（28 评论）**：两份 RFC 反映共同诉求——当同类 PR 积压（观察者钩子、双工语音 4 个竞争 PR）时，社区要求"设计 ABC 接口 + 编排器"而非逐一合并，与 `AGENTS.md` 的 Footprint Ladder 规则呼应，体现项目治理走向契约化。
- **[#143426](https://github.com/NousResearch/hermes-agent/issues/143426)（12 👍，已关闭）**：Linux 桌面 6% 透明度启动问题获快速确认与关闭，是今日用户反应最正面的一条。

## 5. Bug 与稳定性（按严重程度）

**P1**
- [#135487](https://github.com/NousResearch/hermes-agent/issues/135487)：重启安全的 cron worker 在 `adopt_claimed_execution()` 遇 `database is locked` 后退出且任务丢失——无重试逻辑，属数据可靠性缺陷，尚无 fix PR，建议优先处理。

**P2（网关统一架构回归群）**
- [#139818](https://github.com/NousResearch/hermes-agent/issues/139818)：远程后端桌面会话无法本地恢复（`session.resume` 返回 not_found），标记 `cause/fallout`。
- [#143268](https://github.com/NousResearch/hermes-agent/issues/143268)：本地 Kanban notify+wake 永远到不了会话 FIFO（LocalSessionAdapter 缺 gateway_runner）。
- [#142849](https://github.com/NousResearch/hermes-agent/issues/142849)：sharedPrimary profile 会话上所有窗口级请求超时。
- [#143364](https://github.com/NousResearch/hermes-agent/issues/143364)：多路复用 secondary profile 的流式进度经 primary bot 投递（跨 bot 串扰，安全相关）。
- [#131055](https://github.com/NousResearch/hermes-agent/issues/131055)：Linux Desktop 二次启动污染沙箱回退标记，导致粘性 `--no-sandbox` + 渲染器 SIGILL 循环。
- [#137838](https://github.com/NousResearch/hermes-agent/issues/137838)：macOS 网关反复 exit 75（liveness 探针失败），根因未定。

**P2（其他）**
- [#46303](https://github.com/NousResearch/hermes-agent/issues/46303)：并发会话交叉污染（共享 memory 注入 + git worktree），长期未解。
- [#122783](https://github.com/NousResearch/hermes-agent/issues/122783)：PM 安装未 re-exec 进 venv，网关跑在裸解释器上。
- [#99988](https://github.com/NousResearch/hermes-agent/issues/99988)：cron 失败摘要用子串匹配误判为认证错误。
- [#68128](https://github.com/NousResearch/hermes-agent/issues/68128)：Windows job object 下 WhatsApp 桥接 spawn 失败（WinError 5）。

已有对应 fix PR 的：TUI stdin 错误后不再失活（[#145288](https://github.com/NousResearch/hermes-agent/pull/145288)）、Kanban 看板关卡（[#145264](https://github.com/NousResearch/hermes-agent/pull/145264)）、Telegram album 修复（[#143647](https://github.com/NousResearch/hermes-agent/pull/143647)）。

## 6. 功能请求与路线图信号

- **压缩架构**：warm handoff PR（#133625）+ Doc-chain substrate RFC（[#143379](https://github.com/NousResearch/hermes-agent/issues/143379)）+ Codex 长任务压缩相关性（[#131743](https://github.com/NousResearch/hermes-agent/issues/131743)）——上下文压缩/溯源是下一版本最可能的重点方向。
- **语音接口标准化**：[#77111](https://github.com/NousResearch/hermes-agent/issues/77111) 的 RealtimeVoiceProvider ABC 呼声明确，4 个竞争 PR 等待接口裁决。
- **delegate_task 细粒度控制**：[#80222](https://github.com/NousResearch/hermes-agent/issues/80222)（已关闭）请求按调用覆盖 model/reasoning_effort，反映高级用户对委派灵活性的需求。
- **ACP Registry 注册**：[#47435](https://github.com/NousResearch/hermes-agent/issues/47435)——接入 Zed/JetBrains/VS Code 生态的低成本获客机会，仍处 needs-decision。
- **Kanban 可靠性**：伞形 issue [#35986](https://github.com/NousResearch/hermes-agent/issues/35986) 持续汇聚编排缺口，配合 #145264 修复，Kanban 正在系统化收敛。

## 7. 用户反馈摘要

- **桌面端 Linux/Windows 用户痛点集中**：沙箱回退状态污染（#131055）、透明度默认值（#143426）、PATH 膨胀（#145283）——桌面端质量是当前口碑短板。
- **自托管/多 bot 用户**对多路复用 profile 的隔离性强烈不满（#143364、#142849）：跨 bot 消息串扰直接影响生产可用性。
- **贡献者流程受阻**：#131859 的 API 开 PR 权限问题已持续三周，外部贡献者挫败感明显（52 条评论）。
- **正面信号**：issue 模板与风险标签（sweeper:risk-*）体系受认可，报告质量高、可复现性强；压缩类 issue 中用户主动做对照实验（#131743）显示社区技术深度高。

## 8. 待处理积压

- [#46303](https://github.com/NousResearch/hermes-agent/issues/46303)（6-14 开启）：并发会话交叉污染，P2 安全相关，长期无实质修复。
- [#68128](https://github.com/NousResearch/hermes-agent/issues/68128)（7-20 开启）：Windows WhatsApp 桥接失败，缺文档化 fallback。
- [#47954](https://github.com/NousResearch/hermes-agent/issues/47954)（6-17 开启）：honcho 内存 provider 启动竞态。
- [#47435](https://github.com/NousResearch/hermes-agent/issues/47435)（6-16 开启）：ACP Registry 注册，低投入高收益，建议尽快决策。
- [#131743](https://github.com/NousResearch/hermes-agent/issues/131743)（needs-repro）：Codex 首次进展 300s 卡顿，影响长任务用户体验，需要核心维护者复现。
- [#131859](https://github.com/NousResearch/hermes-agent/issues/131859)：blocked on upstream，建议公开进展说明。
- 开放 issue 总量管理（参见已关闭的 [#7335](https://github.com/NousResearch/hermes-agent/issues/7335)）：当前新增/关闭比约 4:1，积压仍在扩大，建议强化 sweep 机制与 needs-decision 决策节奏。

---
*数据来源：GitHub API，统计窗口 2026-10-26 至 2026-10-27。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*