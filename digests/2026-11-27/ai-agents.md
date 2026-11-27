# OpenClaw 生态日报 2026-11-27

> Issues: 370 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-27 02:49 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-27

---

## 1. 今日速览

OpenClaw 今日保持高活跃度：24 小时内 Issues 更新 370 条（新开/活跃 273，关闭 97），PR 更新 500 条（待合并 280，已合并/关闭 220），但**无新版本发布**。社区热度最高的议题依然集中在三大主题：**Gateway 内存泄漏/OOM 系列 P0/P1 问题**、**2026.11.x 更新链路（Doctor/package-swap）反复回滚**，以及 **prompt cache 复用失效**。当日新增 PR 数量可观且修复方向明确，测试维护战役（#198737 相关）持续推进，但多个核心 P0 均标注 `clawsweeper:no-new-fix-pr`，修复进展与社区诉求之间存在明显缺口。

---

## 2. 版本发布

今日无新版本发布。当前社区主要在 2026.11.x stable/beta 链路上使用和排障（2026.11.4 → 2026.11.8 / beta 通道）。

---

## 3. 项目进展

当日 PR 流转 500 条，以下为值得关注的关键动态（注：当日多个 PR 已关闭，多为作者自查或工作流修复）：

**更新/Doctor 链路修复**
- [#205011](https://github.com/openclaw/openclaw/pull/205011)（P1，OPEN）：升级时 Doctor 的 legacy 会话重导入会与 session maintenance 的冷存储归档冲突导致回滚，此 PR 修复冷归档恢复顺序，直接对应 [#204834](https://github.com/openclaw/openclaw/issues/204834)。
- [#205039](https://github.com/openclaw/openclaw/pull/205039)（P1，待维护者审）：捕获目录不可读时不再清空恢复集列表，提升更新诊断质量。
- [#206299](https://github.com/openclaw/openclaw/pull/206299)（P1，CLOSED）：更新后插件 drain 期间保持 Gateway `/readyz` 可用，避免 60 秒全局不可用。

**稳定性与资源**
- [#206308](https://github.com/openclaw/openclaw/pull/206308)（P1）：修复 Linux 委托 cgroup v2 下 Gateway 压力检测读到错误 cgroup 的问题，与 ARM64 低内存主机的 OOM 排查（#192547）直接相关。
- [#206287](https://github.com/openclaw/openclaw/pull/206287)（CLOSED）：agent completion 只深拷贝选中的模型而非整个目录，缓解目录刷新的高 CPU 问题（与 #161379 相关）。

**安全敏感变更（均需安全评审）**
- [#206241](https://github.com/openclaw/openclaw/pull/206241)（P1，XL）：Codex 原生子进程可继承选定的宿主工具处理器，涉及安全边界变更。
- [#195378](https://github.com/openclaw/openclaw/pull/195378)（P2，L）：修复子代理 settle 后父会话 prompt cache miss。
- [#206301](https://github.com/openclaw/openclaw/pull/206301)：QuickJS Code Mode 在云端 worker 上的可移植运行。

**测试与工程健康**
- [#205775](https://github.com/openclaw/openclaw/pull/205775)（XL）、[#206277](https://github.com/openclaw/openclaw/pull/206277)（XL）：测试维护战役批次，削减低价值断言与覆盖率——工程债务在系统性清理中。

**小结**：当日 PR 活动整体偏向“更新可靠性 + 资源治理 + 工程健康”三条线，功能新增较少，反映出项目处于稳定化阶段。

---

## 4. 社区热点

**讨论最活跃的 Issues：**

1. [#91588](https://github.com/openclaw/openclaw/issues/91588)（42 评论，P0，OPEN，6 月至今未修复）：Gateway RSS 从 350MB 涨到 15.5GB 导致 OOM 崩溃循环。这是内存泄漏系列中反馈最久、情绪最强烈的问题，至今无 fix PR，且 `not-repro-on-main` 标签与用户持续报告之间存在矛盾。
2. [#204775](https://github.com/openclaw/openclaw/issues/204775)（36 评论）：prepared-release 更新路径的设计总纲（状态、所有权、计划），维护者 @obviyus 试图让所有更新相关工作停止“撞文件”。大量讨论聚集说明更新问题是当前工程组织的核心痛点。
3. [#182891](https://github.com/openclaw/openclaw/issues/182891)（29 评论，已关闭）：prompt cache 每次请求都 dropped（N→0），用户实际在为全量 token 付费——成本敏感型自托管用户的直接经济损失。
4. [#153426](https://github.com/openclaw/openclaw/issues/153426)（27 评论，P0）：`MEMORY.md`/`USER.md` 被 provenance ratchet 静默永久排除出 bootstrap 注入，无诊断无恢复路径。触及“个人记忆”这一核心产品价值，用户焦虑度极高。
5. [#159662](https://github.com/openclaw/openclaw/issues/159662)（29 评论，P1）：`prepared-model-catalog.worker.js` 以 4-5 GB/小时速率泄漏，已做冷重启 + provider bisect，报告质量高但 `not-repro-on-main`。

**背后诉求**：社区最强烈的三类诉求为（a）Gateway 长期运行稳定性（自托管 7×24 场景），（b）更新链路可信赖（反复回滚直接损害生产部署信心），（c）成本可预期（cache 失效、内存翻倍）。

---

## 5. Bug 与稳定性（按严重程度）

**P0 / 紧急**

| 问题 | 状态 | Fix PR |
|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) Gateway 内存泄漏 → OOM 循环 | OPEN，6 月起 | ❌ 无 |
| [#153426](https://github.com/openclaw/openclaw/issues/153426) 记忆根文件被静默永久排除 | OPEN，安全评审中 | ❌ 无 |
| [#194664](https://github.com/openclaw/openclaw/issues/194664) Codex protected continuation 卡死所有后续消息 | OPEN，有 linked PR | ⚠️ 相关 PR 待落地 |
| [#201472](https://github.com/openclaw/openclaw/issues/201472) 死锁文件阻塞 Doctor 维护并回滚 2026.11.5 更新 | OPEN | ❌ 无 |
| [#203065](https://github.com/openclaw/openclaw/issues/203065) macOS app 捆绑 Gateway 停留在旧版 + 凭据恢复死循环 | OPEN | ❌ 无 |

**P1 / 高**

- [#196199](https://github.com/openclaw/openclaw/issues/196199)（OPEN）：2026.10.10 回归，Codex helper 完成后无法唤醒父代理，goal 挂起、用户被锁在助手外。
- [#202518](https://github.com/openclaw/openclaw/issues/202518)（OPEN）：claude-cli 死会话被复用，消息丢失风险。
- [#154812](https://github.com/openclaw/openclaw/issues/154812) / [#182369](https://github.com/openclaw/openclaw/issues/182369) / [#184843](https://github.com/openclaw/openclaw/issues/184843) / [#195497](https://github.com/openclaw/openclaw/issues/195497)：V8 堆外 RSS 持续增长系列，横跨 2026.9–2026.11 多个版本，均无 fix PR。
- [#181432](https://github.com/openclaw/openclaw/issues/181432)：2026.10.5 基线内存从 300MB 暴涨至 1.9GB + SQLite 事务超时。
- [#171831](https://github.com/openclaw/openclaw/issues/171831)：Windows 上 2026.10.2 启动从 55s 恶化到 320s。
- [#200756](https://github.com/openclaw/openclaw/issues/200756) / [#204816](https://github.com/openclaw/openclaw/issues/204816) / [#203442](https://github.com/openclaw/openclaw/issues/203442)：Windows/stable 通道更新在 package-swap / Doctor 激活阶段失败回滚。

**已关闭（有修复进展信号）**
- [#182891](https://github.com/openclaw/openclaw/issues/182891) prompt cache 复用失效（CLOSED）。
- [#157712](https://github.com/openclaw/openclaw/issues/157712) CLI 状态读取泄漏 162MB 快照（CLOSED，#183762 等落地）。
- [#170496](https://github.com/openclaw/openclaw/issues/170496) 只读 DB 快照每 tick 全量拷贝（CLOSED）。

---

## 6. 功能请求与路线图信号

- [#204775](https://github.com/openclaw/openclaw/issues/204775)：更新路径的设计主计划正在由维护者推进，是下一次版本内容的最强信号——Control UI 内 Settings 触发的 prepared-release 更新。
- [#151178](https://github.com/openclaw/openclaw/issues/151178)（OPEN，更新于今日）：Active Memory 升级决策委托给插件 provider 的 opt-in 扩展，涉及 memory-core 架构演进。
- [#103067](https://github.com/openclaw/openclaw/issues/103067)：集中化会话命名 + 子代理生命周期/跨通道持久化定义——需产品决策，是会话架构重构的前置。
- [#143387](https://github.com/openclaw/openclaw/issues/143387)：Android 通知 QoL（会话感知、来源标签、跨设备抑制）——**作者已于 11 月 16 日声明放弃实现**，若要落地需维护者接手。
- PR 侧信号：[#206241](https://github.com/openclaw/openclaw/pull/206241)（Codex 工具委托）、[#205754](https://github.com/openclaw/openclaw/pull/205754)（Knowledge 中文/日文分词搜索）若合入，将成为下一个版本对中文用户的重要改进。

---

## 7. 用户反馈摘要

- **痛点最集中：长期运行的 Gateway 不可靠。** 多位自托管用户（systemd/launchd，Discord/Telegram/Feishu 渠道，几十个 cron 任务）报告必须周期性重启，“2-3 天 OOM 一次”是常态描述。运行大 agent DB（966MB）与多插件的用户受影响最重。
- **升级恐惧情绪明显。** “候选验证全通过，激活阶段 Doctor 失败并回滚”在 Windows/macOS/npm 多安装形态上重复出现，用户正在推迟升级或手动跳版本。
- **成本敏感用户抱怨 cache 失效。** Prompt cache 每轮 dropped N→0 意味着 token 支出翻倍，本地 lmstudio 用户还发现 `estimatedPromptTokens` 与实际差 2 倍以上（[#203594](https://github.com/openclaw/openclaw/issues/203594)）。
- **正面信号**：Issue 报告质量普遍很高（冷重启复现、provider bisect、日志时间线），且不少用户主动提交诊断 PR（如 #205039、#205767）； thanked "thanks for OpenClaw" 类开场也常见，核心产品价值被认可，问题主要在工程稳定性而非方向。
- **诊断不透明是普遍抱怨**：16 处调用点抛出字节级相同错误（[#127195](https://github.com/openclaw/openclaw/issues/127195)）、EBUSY 不指明文件（#193673），用户排障成本高。

---

## 8. 待处理积压

- **#91588**（P0，2026-06-09 起，42 评论）：最长寿的内存泄漏主 issue，多次标注 `needs-maintainer-review` 无实质响应，建议优先排期。
- **#159662**（P1，2026-09-27 起）：高质量复现报告被标 `not-repro-on-main`，需要维护者与报告者对齐复现条件。
- **#153426**（P0）：涉及安全评审 + `ux-release-blocker`，静默丢失用户记忆且无恢复手段，风险等级最高。
- **#141413**（P0，9 月起）：macOS app 对 SecretRef token 的处理，已列安全评审但 11 月 27 日仍在更新未见结论。
- **#112638** / **#161379** / **#127195**：stale + `needs-product-decision` 的会话存储、CPU 钉核、错误可观测性问题，长期无人认领。
- **#204775** 的设计总纲本身是解决更新碰撞的机制，建议维护者尽快将 #200756/#204816/#201472 等 P0 更新失败 issue 映射进该计划，给社区明确的修复路线图。

**健康度小结**：贡献者吞吐与社区参与度极高（日 issue 370 / PR 500），但 P0 债务（内存泄漏、更新可靠性）持续累积、核心修复 PR 缺位，是当前项目最大的风险信号。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比日报 — 2026-11-27

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态当前处于**高活跃、深度工程化阶段**：核心项目日 Issue/PR 流转均在数百条量级，社区讨论重心已从功能 novelty 转向**长期运行可靠性、会话状态管理、记忆架构**等生产化议题。两大头部项目均无新版本发布，处于修 bug、清债务、扩生态的稳定化周期，但 fix PR 供给普遍落后于 issue 增长速度，“高吞吐 + 低关闭率”成为生态共性健康风险。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 370（新开/活跃 273，关闭 97） | 278（新开/活跃 258，关闭 20） |
| Issue 关闭率 | ~26% | ~7% |
| PR 更新（24h） | 500（待合并 280，合并/关闭 220） | 500（待合并 321，合并/关闭 179） |
| Release | 无（2026.11.4–11.8 / beta） | 无（用户环境 v0.22.5 / v0.23.2） |
| 焦点 | Gateway 内存泄漏、更新链路回滚、prompt cache | Kanban 会话可靠性、plugin-catalog 扩张、MCP 生态 |
| 风险信号 | 6 月至今的 P0 内存泄漏（#91588）无 fix PR，`clawsweeper:no-new-fix-pr` 多点标注 | P1 级 gateway/会话 Bug 普遍无 fix PR，积压最深 |
| 健康度评估 | **质量巩固期**，P0 债务累积是主要风险 | **快速迭代期**，核心推进活跃但关闭率偏低 |

两项目 PR 吞吐（均 500/日）显示贡献者基数相近；差异在 OpenClaw 关闭消化能力更强，Hermes 更靠维护者（teknium1）“salvage/port” 式集中推进（单日 5-8 个 P1/P2 修复）。

---

## 3. OpenClaw 在生态中的定位

- **优势**：社区参与深度与 issue 报告质量突出（冷重启复现、provider bisect、日志时间线），核心产品价值获广泛认可（#182891 prompt cache 修复等显示闭环能力）；日关闭 97 issue 的消化速度优于 Hermes（20）。
- **技术路线差异**：OpenClaw 重点在**更新链路可信赖（Doctor/package-swap/prepared-release）与 Gateway 资源治理**（cgroup v2 压力检测、V8 堆外内存），面向自托管 7×24 场景；Hermes 则押注**插件 catalog 架构**（core 瘦身 + 会议/记忆/连接插件外迁）与主动式助手路线图。
- **社区规模对比**：Issue 量 OpenClaw 约为 Hermes 的 1.3 倍，讨论热度议题（42/36 评论 vs 64/30 评论）同级；两者均为头部项目。
- **短板**：多个最长寿 P0（#91588 六个月、#153426 记忆静默丢失）标注 `not-repro-on-main` 却持续有用户报告，维护者响应缺口比 Hermes 更显眼。

---

## 4. 共同关注的技术方向

1. **长期记忆 / 上下文压缩架构**（两个项目）：OpenClaw 的 `MEMORY.md`/`USER.md` bootstrap 注入被静默排除（#153426）；Hermes 的 Doc-Chain RFC（#143379，64 评论）讨论压缩后保留来源、agent 重读而非用户重复。两项目均在重定义“个人记忆”的产品边界。
2. **多会话/多 profile 并发可靠性**：OpenClaw 的 V8 RSS 增长系列、插件 drain 期间 `/readyz` 不可用；Hermes 的 Kanban worker 集体崩溃（#145022）、provider 插件并发竞态（#156899）。多 agent 并行编排是共同的稳定性瓶颈。
3. **静默失败治理 / 可观测性**：OpenClaw 的 16 处字节级相同错误（#127195）、EBUSY 无文件名（#193673）；Hermes 的 Slack 状态静默失效（#110374）、skills 静默加载失败、备份静默跳过。用户一致抱怨“排障成本高于问题本身”。
4. **更新/安装链路信任**：OpenClaw 的 package-swap/Doctor 反复回滚系列；Hermes 的版本碎片化（v0.22/v0.23 并存报告）。
5. **插件生态扩张**：Hermes catalog 密集上新；OpenClaw 的 Active Memory provider 扩展（#151178）——均为“精简核心 + 插件化外围”方向。

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 本地 Gateway、更新机制、跨平台安装形态（npm/macOS app/Windows）、prompt cache 成本优化 | 多通道（Slack/Matrix/Feishu/Teams）、Desktop、Kanban 任务编排、Docker 沙箱 |
| 目标用户 | 自托管重度用户（systemd/launchd、多 cron、多插件、大型 agent DB） | 生产环境多 agent 并行用户，重视即时通讯渠道集成 |
| 架构关键差异 | Codex 原生子进程工具委托（#206241，安全边界变更）、QuickJS 云端 worker 可移植运行 | 会话 multiplex gateway、plugin-catalog 官方化迁移、主动式 job 需用户批准的设计哲学 |
| 成本敏感点 | prompt cache 复用（token 支出翻倍） | 暂无等量级成本议题 |
| 国际化 | 中文/日文分词搜索 PR（#205754） | 瑞典语 locale、但 stall-guard 仅英文（#105163） |

---

## 6. 社区热度与成熟度

- **质量巩固阶段 — OpenClaw**：功能新增少，PR 集中在更新可靠性、资源治理、工程健康（测试维护战役 XL 级批次），典型稳定化阶段特征；但 P0 债务（6 个月内存泄漏、记忆丢失）未清，属“高吞吐下的债务累积期”。
- **快速迭代阶段 — Hermes Agent**：plugin-catalog 生态周级扩张、官方 roadmap RFC 开放讨论、维护者批量 salvage 长期 PR，活力强；但 7% 的关闭率和 321 待合并 PR 表明治理节奏跟不上增长。
- 分层结论：OpenClaw 用户更深（issue 质量高、自诊断 PR 主动提交），Hermes 生态更宽（插件/渠道覆盖广）。两者共同风险是**P0/P1 修复供给不足**。

---

## 7. 值得关注的趋势信号

1. **“可靠性即新战场”**：社区情绪已从功能竞争转向“7×24 不挂、升级不回滚、消息不丢失”——OpenClaw 的升级恐惧与 Hermes 的 worker 崩溃丢工，是生产化落地的真实门槛，也是下一个版本的决胜点。
2. **记忆架构成为产品护城河**：两项目不约而同投入长期记忆设计（Doc-Chain RFC、provenance/bootstrap 注入）。个人助手“记得住”将是差异化核心，且用户对此类故障容忍度最低（记忆静默丢失引发最高焦虑）。
3. **主动式助手的信任设计**：Hermes 的 proactive 路线图（每步用户批准）vs 竞品隐式后台扫描，预示行业将在“主动性 vs 可控性”之间做出产品哲学选择。
4. **插件化与 core 瘦身是共识路径**：两项目均在将会议、记忆、渠道集成外迁，未来竞争从 core 功能转向插件生态的丰富度与治理。
5. **成本可观测性需求上升**：prompt cache 失效、token 估算偏差 2 倍——自托管用户对“为失效机制付费”零容忍，成本透明将成为工具链标配。
6. **对开发者的直接启示**：优先建设可观测性（错误去重、静默失败告警）、会话状态幂等恢复（resume 不重跑、不丢消息）、以及明确的安全边界评审流程（OpenClaw 多个 PR 因安全评审停滞的教训）。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-27

## 1. 今日速览

Hermes Agent 今日整体活跃度**高**：过去 24 小时 Issues 更新 278 条（新开/活跃 258，关闭 20），PR 更新 500 条（待合并 321，已合并/关闭 179），无新版本发布。社区讨论焦点集中在会话状态可靠性（Kanban worker 崩溃、resume/所有权守卫）、MCP 与插件生态扩展（plugin-catalog 密集新增条目）以及核心团队对多个长期积压 PR 的"salvage/port"式重启。当前未合并 PR 数量（321）与活跃 Issue 数量（258）显示项目处于快速迭代期，但关闭率偏低（Issue 关闭率约 7%），P1/P2 级 Gateway/会话类 Bug 是当前最突出的稳定性债务。

## 2. 版本发布

今日无新版本发布。当前已知用户环境版本为 v0.22.5 / v0.23.2（Issue 报告中提及）。

## 3. 项目进展

今日合并/关闭的 PR 中值得关注的进展（数据中多数 PR 仍处 OPEN 状态，以下为可见的推进信号）：

- **会话搜索与压缩修复**：[#160576](https://github.com/NousResearch/hermes-agent/pull/160576)（已关闭，整合 #157734、#156687、#147548）修复压缩后 `session_search` 返回空/无关结果的问题——压缩后模型被告知去搜索已丢弃的细节，但搜索忽略查询词只返回首尾消息。这是 P1 级会话/压缩问题的实质修复，属于核心体验修复。
- **插件体系核心化迁移**：[#159653](https://github.com/NousResearch/NousResearch/hermes-agent/pull/159653)（teknium1）将 Google Meet 与 Teams 会议管线从 core 迁出为官方 catalog 插件，配合 [#159652](https://github.com/NousResearch/hermes-agent/pull/159652) 的 catalog 条目 PR。这是 Hermes 向"精简 core + 插件生态"架构演进的关键一步，已有用户环境会自动安装并启用对应插件。
- **Provider 插件并发竞态修复**：[#157087](https://github.com/NousResearch/hermes-agent/pull/157087) 修复多个 chat 并发打开时 profile 级 provider 插件消失（"Unknown provider"，对应 #156899），采用单 chat 加载 + 其余等待的机制。
- **Skills 静默失败治理**：[#160635](https://github.com/NousResearch/hermes-agent/pull/160635)（salvage 自已关闭的 #128226）修复 frontmatter 解析失败时 skill 无描述、无日志静默加载的问题，现在会记录警告。
- **GPT-5 developer 角色兼容性**：[#160633](https://github.com/NousResearch/hermes-agent/pull/160633) 修复 OpenAI-compatible 中继上 gpt-5 系模型系统提示被丢弃/400 的问题（fixes #81278），与长期 Open 的 [#81279](https://github.com/NousResearch/hermes-agent/pull/81279)（按 provider 能力而非模型名 gate role swap）形成互补。
- **插件生态持续扩张**：今日新增/更新多个 catalog 条目 PR：Memleaf 记忆 provider（[#159873](https://github.com/NousResearch/hermes-agent/pull/159873)）、grounder 0.10.7（[#159865](https://github.com/NousResearch/hermes-agent/pull/159865)）、ChatGPT 四层连接（[#159485](https://github.com/NousResearch/hermes-agent/pull/159485)）、send-cards / order-cards / hermes-pages（kenhendricks00 系列）、Reliquary 0.3.5（[#158131](https://github.com/NousResearch/hermes-agent/pull/158131)）、瑞典语 Web locale（[#148618](https://github.com/NousResearch/hermes-agent/pull/148618)）。

**整体评估**：核心维护者（尤其 teknium1）采用"salvage 社区 PR + port pi 上游修复"模式批量重启长期停滞工作，单日推进约 5-8 个 P1/P2 级核心修复，项目向前迈进明显。

## 4. 社区热点

- **[#143379](https://github.com/NousResearch/hermes-agent/issues/143379)（64 评论）**：Doc-Chain 底层网络 RFC，讨论持久记录在压缩后保留来源、agent 重读而非让用户重复——社区对**长期记忆/上下文压缩架构**的深度设计讨论，热度最高。
- **[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)（30 评论，P1）**：Kanban 并发 worker 因 gateway 停滞集体崩溃且进行中工作丢失，一位用户单次事故损失 4 个 worker。多 worker 用户对**任务编排可靠性**的强烈诉求。
- **[#68871](https://github.com/NousResearch/hermes-agent/issues/68871)（21 评论 / 16 👍，已关闭）**：对 Block 开源 Buzz 的集成支持（16 👍 显示需求量大），该 Issue 已关闭，或已通过插件路径落地/决策。
- **[#110374](https://github.com/NousResearch/hermes-agent/issues/110374)（20 👍）**：Slack 状态指示器随 slack-sdk ≥ 3.44 静默失效，**静默降级**设计让用户难以发现，痛点集中。
- **[#158538](https://github.com/NousResearch/hermes-agent/issues/158538)（13 评论，teknium1 本人发起）**：Proactive 路线图——对比 Hark Pro / OpenAI dots / Meta Muse / Grok Bot 的主动式助手设计，Hermes 坚持"每个主动运行都是用户批准的 job"。这是**官方路线图信号**，值得关注。

## 5. Bug 与稳定性（按严重度排列）

| 级别 | Issue | 状态/修复 |
|---|---|---|
| **P1** | [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban 多 worker 并发崩溃，工作丢失 | 无直接 fix PR |
| **P1** | [#145215](https://github.com/NousResearch/hermes-agent/issues/145215) Owner 转发在 resume 快照 > 1 MiB 时丢弃用户消息（websocket max_size 默认值） | 无 fix PR |
| **P2** | [#156899](https://github.com/NousResearch/hermes-agent/issues/156899) 并发首查 provider 插件致 "Unknown provider" | ✅ fix PR [#157087](https://github.com/NousResearch/hermes-agent/pull/157087) |
| **P2** | [#159438](https://github.com/NousResearch/hermes-agent/issues/159438) Gateway 中途被杀后，resume 会话重跑终端命令（命令丢失） | 无 fix PR |
| **P2** | [#146955](https://github.com/NousResearch/hermes-agent/issues/146955) Windows v0.22.5 Kanban worker 接收不到 prompt 空转至超时 | 无 fix PR |
| **P2** | [#155638](https://github.com/NousResearch/hermes-agent/issues/155638) Matrix receipt 恢复死循环（UnscopedSecretError） | 无 fix PR |
| **P2** | [#133421](https://github.com/NousResearch/hermes-agent/issues/133421) Desktop browser 前台守卫误拒聚焦 tile | 无 fix PR |
| **P2** | [#144523](https://github.com/NousResearch/hermes-agent/issues/144523) Desktop 新会话间歇性 "provider resolved without credentials" | 无 fix PR |
| **P2** | [#127942](https://github.com/NousResearch/hermes-agent/issues/127942) MCP `lazy: true` 从不生效（ttlMs=0 立即过期） | 无 fix PR |
| **P2** | [#127731](https://github.com/NousResearch/hermes-agent/issues/127731) 频繁 cron 任务主机上自动备份永远被跳过 | 无 fix PR |

**稳定性画像**：Bug 集中在 **gateway 多会话/多 profile 并发、Kanban 编排、消息投递**三条线，多数尚无 fix PR，是当前健康度的主要风险面。

## 6. 功能请求与路线图信号

- **Proactivity 路线图**（[#158538](https://github.com/NousResearch/hermes-agent/issues/158538)，维护者发起）：明确 Hermes 的主动式助手方向——用户批准的可见 job 而非隐式后台扫描，很可能是下一版本主题。
- **Buzz 集成**（[#68871](https://github.com/NousResearch/hermes-agent/issues/68871)，已关闭 + 16👍）：结合 plugin-catalog 快速扩张的节奏，大概率以社区插件形式落地。
- **跨会话 intercom**（[#81885](https://github.com/NousResearch/hermes-agent/issues/81885)，needs-decision）：多会话协作是明确的多用户诉求，尚待决策。
- **Per-session working directory**（[#29531](https://github.com/NousResearch/hermes-agent/issues/29531)，needs-decision）：gateway 会话隔离的长期诉求，与 #145215/#144523 等 gateway 会话 bug 属同一问题域。
- **Ruby 工具调用 💎 图标**（[#156660](https://github.com/NousResearch/hermes-agent/issues/156660)）、Desktop 状态栏 token 用量（[#78997](https://github.com/NousResearch/hermes-agent/issues/78997)）：低成本 UI 改进，易被纳入。

## 7. 用户反馈摘要

- **痛点**：
  - **可靠性丢失**是最强情绪：Kanban worker 集体崩溃丢工作（#145022）、resume 丢消息（#145215）、重跑命令（#159438）——用户在生产环境中跑多 agent 并行任务，一次事故损失数小时工作。
  - **静默失败**反复出现：Slack 状态静默消失（#110374）、skills 静默加载失败（#160635）、备份静默跳过（#127731）、search_files 静默丢带空格路径的结果（#91698）。用户普遍反映"排障成本高于问题本身"。
  - **多 profile / 多会话隔离**不足：cwd 全局共享（#29531）、provider 插件竞态（#156899）、launch key 无 base_url（#144523）。
- **满意点**：插件 catalog 生态活跃（Memleaf、grounder、Send Cards 等持续上新）；官方 roadmap RFC（#158538、#143379）讨论质量高，用户愿意深度参与架构讨论。
- **使用场景画像**：重度用户以 Desktop + Slack + gateway multiplex + Kanban 多 worker 编排 + Docker 沙箱为典型生产配置，跨平台（Windows/macOS）均有深度使用。

## 8. 待处理积压

以下重要 Issue 长期未关闭且今日无修复动作，建议维护者关注：

- [#29531](https://github.com/NousResearch/hermes-agent/issues/29531)（2026-05-20 至今）— per-session cwd，多会话用户核心诉求，needs-decision
- [#17215](https://github.com/NousResearch/hermes-agent/issues/17215)（2026-04-29 至今）— shutdown/reboot 白名单开关，长期无响应
- [#78975](https://github.com/NousResearch/hermes-agent/issues/78975)（2026-08-05 至今）— Feishu cron 投递 100% 失败，仅影响特定平台但完全不可用
- [#81885](https://github.com/NousResearch/hermes-agent/issues/81885)（2026-08-08 至今）— intercom 特性，needs-decision
- [#81279](https://github.com/NousResearch/hermes-agent/pull/81279)（2026-08-07 至今）— developer role 能力化 gate，与今日 #160633 相关，建议合并处理
- [#82451](https://github.com/NousResearch/hermes-agent/pull/82451)（2026-08-09 至今）— 压缩 no-op 修复，长期挂起
- [#113578](https://github.com/NousResearch/hermes-agent/issues/113578)（2026-09-16 至今）— Teams 文档发送 400，needs-decision
- [#105163](https://github.com/NousResearch/hermes-agent/issues/105163)（2026-09-07 至今）— stall-guard 仅支持英文，非英文 agent 反卡死功能失效

**总体健康度**：开发吞吐量优秀、生态扩张迅速、官方 roadmap 透明；但 Gateway/Kanban 可靠性 Bug 积压较深、Issue 关闭率偏低（20/278），建议优先处理 P1 级 #145022 与 #145215，并系统性清理"静默失败"类问题。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*