# OpenClaw 生态日报 2026-11-07

> Issues: 375 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-07 00:05 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-07

## 1. 今日速览

OpenClaw 今日维持高活跃度：过去 24 小时 Issues 更新 375 条（新开/活跃 214，关闭 161），PR 更新 500 条（待合并 360，已合并/关闭 140），无新版本发布。正在推进 **2026.9.37 extended-stable** 的发布准备（#194367 已关闭、#194369 重新开起，标注为回溯安全/稳定性修复集）。社区讨论焦点集中在 Gateway 事件循环阻塞（#160959，80 条评论）、SQLite 状态库稳定性（#164294、#191847）以及多个 P0/P1 级回归问题。总体看，项目处于“高强度修 bug + 稳定线维护”阶段，360 个待合并 PR 显示贡献管道充裕但审核压力较大。

## 2. 版本发布

今日无新 Release。正在进行 **2026.9.37 extended-stable** 发布准备（[#194369](https://github.com/openclaw/openclaw/pull/194369)），内容为从共享回溯账本中选取的修复：恢复隐私边界、会话-账号连续性、有界解析、通道恢复及更安全的更新/状态处理。注意前置 PR #194367 因发布致谢 gate 与人类贡献者署名策略不一致被关闭重开（[#194364](https://github.com/openclaw/openclaw/pull/194364) 已修复该 gate）。

## 3. 项目进展

今日关闭 PR 140 条，代表性进展：

- **发布工程**：2026.9.37 extended-stable 准备 PR 推进（[#194369](https://github.com/openclaw/openclaw/pull/194369)）；attribution gate 对齐人类署名策略（[#194364](https://github.com/openclaw/openclaw/pull/194364)，已关闭/合并）。
- **测试基建清理**：HTTP disconnect 测试复用共享 deferred 工厂（[#194347](https://github.com/openclaw/openclaw/pull/194347)，已关闭）。
- **待审重点功能 PR**（未合并但在推进）：
  - 浏览器短码配对（无头 Gateway 免手动传 token，[#191513](https://github.com/openclaw/openclaw/pull/191513)）
  - 上下文压力感知的自主续跑 continuation 工具（[#129388](https://github.com/openclaw/openclaw/pull/129388)，XL 级、含 Telegram E2E 证明）
  - Control UI 实时查看运行中命令自动化输出（[#186888](https://github.com/openclaw/openclaw/pull/186888)）
  - 从 URL 导入个人技能包（[#192781](https://github.com/openclaw/openclaw/pull/192781)）

## 4. 社区热点

| Issue | 评论 | 主题 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | 80 | **P0**：2026.9.6 插件捕获导致 Gateway 事件循环阻塞数分钟。大量外部插件用户的启动/重发布卡死，与 #166641（web_fetch 同步捕获插件）同根，是当前最强烈诉求：插件加载必须移出主线程 |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) | 39 | 状态库 WAL 检查点自启动以来从未完成（被进程内 reader 钉住），暴露状态层架构隐患 |
| [#177656](https://github.com/openclaw/openclaw/issues/177656) | 29 | 2026.10.5 stable 上至少 28 次共享状态完整性准入失败且无子结果，用户对 stable 质量闸门表达不满 |
| [#150635](https://github.com/openclaw/openclaw/issues/150635) | 25 | 短期记忆召回夜间被清空，“dreaming deep phase” 永不晋升——记忆子系统（dreaming/promotion）是长期痛点簇（另见 #164923） |
| [#191944](https://github.com/openclaw/openclaw/issues/191944) | 23 | macOS 上 `gateway stop/--force` 均失败，基础可运维性问题 |

**诉求分析**：用户集中在三类——(1) 大规模/多插件部署的 Gateway 稳定性；(2) 记忆（短期召回→晋升）管线行为不透明；(3) 升级路径可靠性（见 #193962：修复无法通过 update 到达）。

## 5. Bug 与稳定性（按严重度）

**P0**
- [#160959](https://github.com/openclaw/openclaw/issues/160959) Gateway 主线程阻塞数分钟（2026.9.6 回归，crash-loop）。🦞 评级，**无 fix PR**，等待维护者复审。

**P1**
- [#191847](https://github.com/openclaw/openclaw/issues/191847) 2026.10.10 大会话反复杀死 512MB SQLite worker，该会话所有 turn 失败（回归）。无 fix PR。
- [#192959](https://github.com/openclaw/openclaw/issues/192959) K8s pod 重启后因 fsGroup remount 导致 Gateway 拒绝启动（安全+crash）。无 fix PR。
- [#185656](https://github.com/openclaw/openclaw/issues/185656) 大型 zstd 转录归档仍超 Node 字符串上限，阻塞升级（#170847 的回归，修复 #170853 已合但 2026.10.5 仍复现，需复审）。
- [#177656](https://github.com/openclaw/openclaw/issues/177656) stable 上原生 host exec 完整性准入错误，28+ 次失败。无 fix PR。
- [#166641](https://github.com/openclaw/openclaw/issues/166641) web_fetch 冷回退在主线程同步捕获无关插件导致活性停顿。有 V8 profile 证据，无 fix PR。
- [#155563](https://github.com/openclaw/openclaw/issues/155563) 2026.9.5 服务子进程 relay/anchor 生命周期泄漏（需更多信息）。
- [#182647](https://github.com/openclaw/openclaw/issues/182647) 云 worker turn 在推理前失败（fix-shape-clear、queueable-fix，有修复路径）。
- [#157182](https://github.com/openclaw/openclaw/issues/157182) Control UI 默认落地隐藏的 `/chat/main` 并无限重试（安全+可用性，需安全复审）。

**P2 关注项**
- [#193962](https://github.com/openclaw/openclaw/issues/193962) SQLite header-probe 修复无法从 2026.10.10 通过 update 到达——**升级路径死锁**，建议优先。
- [#182891](https://github.com/openclaw/openclaw/issues/182891) prompt cache 每次请求 N→0 被丢弃（成本直接受影响）。
- [#178291](https://github.com/openclaw/openclaw/issues/178291)（已关闭）10.4→10.5 升级后 Doctor 离线维护权限失败。

## 6. 功能请求与路线图信号

- **按模型成本追踪日志**（[#13219](https://github.com/openclaw/openclaw/issues/13219)，已有 linked PR）+ prompt cache 问题（#143017、#182891）→ 成本可观测性是明确方向，很可能进入下版本。
- **Dream Diary 可配置语言/prompt**（[#79223](https://github.com/openclaw/openclaw/issues/79223)）非英文用户长期诉求，需产品决策。
- **隐藏 agent 但保留可 spawn**（[#166678](https://github.com/openclaw/openclaw/issues/166678)）、**agent picker 多 agent 管理**（#103067）→ 多 agent 组织管理是活跃需求簇。
- **Control UI 快捷键可配置**（[#163739](https://github.com/openclaw/openclaw/issues/163739)，linked PR open）接近落地。
- PR 侧信号：浏览器短码配对（#191513）、URL 技能导入（#192781）、Control UI 自动化实时输出（#186888）、continuation 工具（#129388）均在审，构成下个大版本的功能骨干。
- **禁用托管插件目录 feed**（[#164620](https://github.com/openclaw/openclaw/issues/164620)）反映自托管用户对硬编码外联的隐私诉求。

## 7. 用户反馈摘要

- **痛点**：升级风险高（多个“修复了但 stable 仍复现/到不了”案例，如 #185656、#193962）；多插件/大会话场景下 Gateway 与 SQLite worker 资源瓶颈（#160959、#191847、#166017）；prompt cache 失效导致 token 成本飙升（#143017 实测 21.3M cache-write）；claude-cli 后端 stdio MCP 服务器重复拉起、每子进程 ~145MB 包装开销（#164690）。
- **场景**：K8s/systemd 生产部署、Telegram/Slack/WhatsApp 面向客户的 agent、15-agent 多租户组织、非英文（中文）工作区。
- **正面信号**：issue 报告质量极高（带 wire 抓包、V8 profile、复现脚本）；社区贡献者持续提交高质量 fix PR（SSRF punycode #193374、DeepInfra thinking #192979 等）；clawsweeper 自动分诊标签体系运转成熟。

## 8. 待处理积压

- **#160959（P0，80 评论）** 与 **#166641**：主线程插件捕获问题簇，长期无 fix PR，影响面最大。
- **#164294**：WAL checkpoint 从未完成，stale 标签但架构性问题不会自愈。
- **#150635 / #164923**：记忆晋升管线两个 diamond-lobster 级 issue，均 needs-product-decision，#164923 已被关闭但根因未闭环。
- **#143017**：prompt cache 前缀重写五路径，10 月已有生产流量复现，仍 stale。
- **#127195**：16 处调用点抛出字节级相同错误、无原因码，可诊断性债务。
- **#140277**（Discord 代码块渲染，9 月开，stale+needs proof）：小而老的社区 PR，易被遗忘。
- 建议：优先解决升级路径可达性（#193962 模式）与主线程阻塞簇，这两类问题直接侵蚀用户对 stable 线的信任。

---
*数据来源：GitHub（过去 24 小时），由开源项目分析师生成。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告
**数据日期：2026-11-07**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**从“功能扩张”向“工程化深耕”转型的关键期**：两个头部项目均维持极高社区活跃度（日均 Issue+PR 更新均接近或达到 500 条上限），但都面临“贡献涌入速度 > 审查吞吐能力”的共性瓶颈（OpenClaw 360 个待合并 PR、Hermes 404 个）。技术上，**网关/服务化架构、多 agent 协作、插件生态、本地/低配部署**成为共识性方向；同时，**大迁移回归债务、升级路径可靠性、状态存储稳定性**等工程债务集中暴露，标志着生态正从早期尝鲜期进入生产化攻坚阶段。社区参与形态也在升级——高质量 issue（带 V8 profile、wire 抓包、复现脚本）和 Hackathon 式贡献涌入，说明用户群正从爱好者向运维型/企业型用户迁移。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 375（新开/活跃 214，关闭 161） | 500（新开/活跃 470，关闭 30） |
| **Issue 关闭率** | **43%** | **6%** |
| PR 更新（24h） | 500（待合并 360，合并/关闭 140） | 500（待合并 404，合并/关闭 96） |
| **PR 合并率** | 28% | 19% |
| Release | 无（2026.9.37 extended-stable 准备中） | 无（canary v0.23.0+20261106） |
| 版本节奏 | 稳定线 + extended-stable 回溯线，双轨维护 | canary 快车道 |
| 最高严重度 bug | P0：Gateway 主线程插件捕获阻塞（#160959，80 评论，无 fix） | P0：Windows state.db 陈旧快照覆盖健康数据（#147938，无 fix） |
| **健康度评估** | **质量巩固期**：高关闭率、回溯发布线成熟、自动分诊（clawsweeper）运转良好；但 P0 积压与升级路径死锁侵蚀 stable 信任 | **快速迭代期**：生态扩张极快（Hackathon、插件目录、网关协议开放），但审查带宽与 QA 覆盖严重不足，网关大迁移回归债务高企 |

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **维护吞吐显著更健康**：Issue 关闭率 43%（Hermes 6%）、PR 合并率 28%（Hermes 19%），在同等活跃度下工程治理能力领先一个身位。
- **发布工程成熟**：extended-stable 回溯发布线（从共享回溯账本选取修复）、attribution gate 等发布基建表明其面向生产用户的长期支持承诺。
- **用户侧质量信号强**：issue 报告带 V8 profile、wire 抓包、复现脚本，说明拥有深度技术用户群（K8s/systemd 生产部署、15-agent 多租户组织）。
- **自动化分诊成熟**：clawsweeper 标签体系降低大规模 issue 管理成本。

**技术路线差异：**
- OpenClaw 走 **“稳定优先、双轨发布”** 路线，重视升级路径可达性与回溯修复分发；
- Hermes 走 **“canary 快迭代 + 协议开放平台化”** 路线，网关正演化为第三方客户端/插件的一等接入平台。

**社区规模对比：** 两者 issue 编号量级相近（OpenClaw 已达 ~19.4 万，Hermes ~15 万），OpenClaw 单 issue 讨论深度更高（80/39/29 条评论的深水区讨论），Hermes 则以广度取胜（470 条新活跃 issue）。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **网关/服务化架构稳定性** | #160959、#166641（主线程插件捕获阻塞）、#191847（SQLite worker 被杀） | #143547（统一网关迁移回归 tracker，50 评论）、#145022 | 两者都因网关化改造产生最高优先级债务；多插件/大会话资源隔离是共性难题 |
| **状态存储（SQLite）可靠性** | #164294（WAL checkpoint 永不完成）、#191847、#193962 | #147938（Windows state.db 数据覆盖）、#143150 | 状态层是两项目最集中的 P0/P1 来源 |
| **插件生态与第三方接入** | 托管插件目录、#164620（禁用外联的隐私诉求） | Hackathon 提交涌入、#150289 插件 RPC 契约化 | 插件从“附属功能”升级为“平台战略”，但加载隔离（OpenClaw 主线程问题）与噪音治理（Hermes #132741）是代价 |
| **多 agent 组织与协作** | #166678（隐藏但可 spawn）、#103067（agent picker） | #97681（跨网关 Bot 协作，40 评论） | 多租户/跨机器协作是“个人助手 → 助手网络”的关键路径 |
| **本地/低配部署** | 自托管隐私诉求（#164620） | #53347（64K 上下文下限阻碍 Ollama，9 👍）、#150359（LocalRuntime ABC 解耦） | 开源用户对摆脱云端依赖、成本可控的持续诉求 |
| **成本可观测性** | #13219（按模型成本追踪）、#182891（prompt cache 失效） | — | token 成本透明化正成为生产部署刚需 |
| **升级/迁移路径平滑性** | #193962（修复无法通过 update 到达）、#185656 | #143150（迁移后 resume 失败）、#143839 | 存量用户保护是两项目共同软肋 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| **功能侧重** | 长期运行的个人助手：记忆子系统（dreaming/promotion 晋升管线）、continuation 自主续跑、隐私边界、面向 IM（Telegram/Slack/WhatsApp）的客服型 agent | 开放平台型助手框架：网关协议化、第三方客户端一等公民、自我改进学习循环（宣称待验证 #96704）、跨网关协作 |
| **目标用户** | 生产化自托管用户：K8s/systemd 运维者、多租户组织、非英文工作区 | 更宽光谱：从 Ollama 轻量用户到 Hackathon 插件开发者、Desktop 消费级用户 |
| **技术架构** | Node 系，Gateway + SQLite 状态库 + Control UI，托管插件目录 | Python/混合栈，One-Gateway-per-Host 统一网关（大迁移中），pnpm 构建链，本地模型运行时解耦中 |
| **风险画像** | 修了但到不了 stable（发布分发问题） | 迁移后旧用户会话/权限破损（迁移质量问题） |
| **平台覆盖** | macOS/K8s 问题暴露较多 | Windows 用户处境最差（两个 P0/P1 均在 Windows），平台测试不均衡 |

---

## 6. 社区热度与成熟度

- **快速迭代阶段 —— Hermes Agent**：470 条新活跃 issue + Hackathon 生态爆发 + 网关协议快速演进，典型“上升期”特征；但 6% 关闭率、404 待审 PR、无 stable 发布线，成熟度明显滞后于热度。
- **质量巩固阶段 —— OpenClaw**：发布双轨制、回溯账本、43% 关闭率显示治理能力；但 360 待审 PR 和 P0 长期无 fix（#160959）表明其也在高负载下承压，处于“高强度修 bug + 稳定线维护”阶段。
- **共性判断**：两个项目都到了**审查带宽是第一瓶颈**的规模拐点；谁能先把 CI/QA 自动化、分诊机器人、发布工程做厚，谁就能在这个生态位建立信任护城河。

---

## 7. 值得关注的趋势信号

1. **网关化是必经之路，但回归债务是最大杀手**：两个项目最高热度 issue 都是网关架构问题。对开发者的启示——网关化重构必须配套“存量用户迁移工具 + 回归测试基线”，否则会重演 Hermes #143547 式的系统性信任损耗。
2. **插件生态进入“平台竞争”阶段**：从 OpenClaw 的插件目录到 Hermes 的 Hackathon，插件加载隔离（不阻塞主线程）、RPC 契约化、噪音治理将成为插件平台的三个基本功。
3. **状态层（SQLite/会话存储）是生产化第一道坎**：WAL checkpoint、worker 内存上限、误判损坏覆盖数据——AI agent 的“记忆可靠性”正在变成一个专门的工程学科。
4. **成本可观测性将从功能请求变为标配**：prompt cache 失效造成 21.3M token 浪费这类实测，预示 token 级成本追踪/归因将进入下版本功能主干。
5. **升级路径可达性是被低估的信任指标**：“修复存在但到不了用户”两个项目都出现，建议 agent 项目将“fix 可达性”纳入发布 gate。
6. **多 agent 协作是下一个叙事**：跨网关 Bot 协作（#97681）、agent 间交易（Valun 插件）、15-agent 多租户——个人助手正从单体走向网络，协议标准化窗口正在打开。
7. **评测自省运动兴起**：社区主动要求验证“自我改进循环”是否真实（#96704），标志着用户对 agent 能力宣称从“信营销”转向“要证据”——evals 基准建设将成差异化竞争点。

---

**一句话总结**：OpenClaw 以治理和稳定线领先，Hermes 以生态扩张和协议开放见长；生态共同课题是**把涌入的贡献和热情转化为可信赖的生产质量**——审查带宽、状态可靠性、升级可达性是未来一个季度的决定性变量。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-07

## 1. 今日速览

Hermes Agent 过去 24 小时保持**非常高的社区活跃度**：Issues 更新 500 条（新开/活跃 470，关闭仅 30），PR 更新 500 条（待合并 404，已合并/关闭 96），无新版本发布。今日主线清晰：**修复 npm→pnpm 迁移引发的 Desktop 构建问题**占据 PR 热榜，同时 #106742 统一网关合并后的善后问题（#143547，50 条评论）仍是社区最大痛点。Issue 关闭率仅 6%（30/500），待合并 PR 高达 404 个，**审查吞吐能力是当前明显瓶颈**。插件生态（Plugin Hackathon 相关提交）持续涌入，是活跃度的另一大来源。

## 2. 版本发布

过去 24 小时无新 Release。最新可用渠道为 canary `v0.23.0+canary.20261106T064428Z`（见 #150152 中的引用）。

## 3. 项目进展

今日合并/关闭 96 个 PR，重点方向：

- **pnpm 迁移修复系列**（@c2h5oh 密集提交）：[#150297](https://github.com/NousResearch/hermes-agent/pull/150297)（pnpm pin 收敛到 `pm/lock.json`）、[#150296](https://github.com/NousResearch/hermes-agent/pull/150296)（CI lockfile diff 修复，已关闭）、[#150301](https://github.com/NousResearch/hermes-agent/pull/150301)（已关闭）。待合并的后续：[#150303](https://github.com/NousResearch/hermes-agent/pull/150303)（修复 macOS/Linux 上 `get-windows` 被误删）、[#150364](https://github.com/NousResearch/hermes-agent/pull/150364)、[#150117](https://github.com/NousResearch/hermes-agent/pull/150117)（npmrc 解析统一）。这是对 #149861 构建故障的直接响应。
- **网关协议增强**（@unsupportedpastels）：[#150288](https://github.com/NousResearch/hermes-agent/pull/150288)（控制 socket 查询 profile 服务归属，免去每次 spawn Python）、[#150286](https://github.com/NousResearch/hermes-agent/pull/150286)（客户端可在 session.create 自报身份）、[#150289](https://github.com/NousResearch/hermes-agent/pull/150289)（插件 RPC 契约化）。这一系列显著改善第三方客户端接入体验。
- **误合并回滚**：[#150152](https://github.com/NousResearch/hermes-agent/pull/150152) 撤销误合的 #142006，恢复 `llm.oneshot` 的 schema/redact 行为，并给插件结构化输出另辟 RPC 通道——值得注意的流程信号。
- **插件目录扩张**（Hackathon 效应）：CrashLab [#150164](https://github.com/NousResearch/hermes-agent/pull/150164)、fal MCP [#150347](https://github.com/NousResearch/hermes-agent/pull/150347)、Valun [#150363](https://github.com/NousResearch/hermes-agent/pull/150363)、Diké [#150360](https://github.com/NousResearch/hermes-agent/pull/150360)。
- **架构解耦**：[#150359](https://github.com/NousResearch/hermes-agent/pull/150359) 引入 `LocalRuntime` ABC，是将本地模型支持从核心抽离的 3 部曲第 1 步。

整体看，项目在网关协议化、构建链修复、插件生态三条线均有实质推进，但 pnpm 迁移善后尚未收尾。

## 4. 社区热点

1. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（50 评论）** — 统一网关 #106742 合并后的主跟踪 Issue，波及 CLI/TUI/Desktop/Telegram/Discord/cron/会话/压缩等几乎所有子系统。用户诉求：大重构（One-Gateway-per-Host）落地质量不足，需要系统性回归修复而非零散补丁。
2. **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)（40 评论，4 👍）** — Bots 跨网关协作基础。这是"个人 AI 助手"愿景的关键一步（先跨机器、后跨所有者），社区参与设计讨论度高，与今日 #150288/#150286 的网关协议 PR 方向呼应。
3. **[#96704](https://github.com/NousResearch/hermes-agent/issues/96704)（14 评论）** — 为 README 宣称的"自我改进学习循环"建立评测基准（evals/skills paired-arm harness）。社区在推动"学习闭环"从营销口号变成可度量能力。
4. **[#53347](https://github.com/NousResearch/hermes-agent/issues/53347)（9 👍）** — 64K 上下文硬下限阻碍低配 Ollama 部署，轻量用户呼声强烈，尚处 needs-decision。

## 5. Bug 与稳定性（按严重度）

| 级别 | Issue | 摘要 | Fix PR |
|---|---|---|---|
| **P0** | [#147938](https://github.com/NousResearch/hermes-agent/issues/147938) | Windows 上 state.db 校验把活锁误判为损坏，**用数月前的陈旧快照覆盖健康数据**，数据丢失风险最高 | 未见 |
| P1 | [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) | 网关停顿时 Kanban worker 批量崩溃（曾一次杀 4 个），进行中工作丢失 | 未见 |
| P1 | [#127284](https://github.com/NousResearch/hermes-agent/issues/127284) | `source-completion-pending` 标记无 TTL/自愈，被杀进程后每次启动卡死 | 未见 |
| P1（构建） | [#149861](https://github.com/NousResearch/hermes-agent/issues/149861) | pnpm 12.15.0 静默丢弃 `get-windows`，**macOS Desktop 构建在 main 上持续失败** | ✅ [#150303](https://github.com/NousResearch/hermes-agent/pull/150303) |
| P2 | [#131375](https://github.com/NousResearch/hermes-agent/issues/131375) | smart-approval guardian 在事件循环线程崩溃，Desktop/serve 会话中被标记命令全部升级为人工审批 | 未见 |
| P2 | [#143839](https://github.com/NousResearch/hermes-agent/issues/143839) / [#143845](https://github.com/NousResearch/hermes-agent/issues/143845) / [#143150](https://github.com/NousResearch/hermes-agent/issues/143150) | Desktop/仪表盘会话管理故障三连：无法归档/恢复自有会话、删除 cron 会话 404、multiplex 迁移后 resume 报 storage_unavailable | 未见 |
| P2 | [#129455](https://github.com/NousResearch/hermes-agent/issues/129455) | 默认安装下测试套件大范围失败（PM 激活触发 home_io_guard），影响贡献者体验 | 未见 |
| P2 | [#138105](https://github.com/NousResearch/hermes-agent/issues/138105) | multiplex cron ticker 每分钟 O(profiles) 重解析配置，**挤占 Discord 心跳** | 未见 |
| P2 | [#143444](https://github.com/NousResearch/hermes-agent/issues/143444) | 粘贴净化把 `12:00~12:15` 改写成 `12:12:15`，静默损坏用户输入 | 未见 |

**模式观察**：高严重度 bug 高度集中在**统一网关迁移的会话/权限/存储路径**（与 #143547 吻合）和**安装更新链路**。除 pnpm 构建问题外，多数 P0/P1 尚无对应 fix PR。

## 6. 功能请求与路线图信号

- **跨网关 Bot 协作**（[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)）：今日的 #150288/#150286/#150289 正在为其铺设网关协议地基，下一版本大概率继续推进。
- **第三方客户端一等公民化**：session.create 自报身份、控制 socket 查询服务——Gateway 正在演化为开放平台，社区插件 Hackathon 提交（Valun 的 agent 间交易尤其激进）与之形成生态共振。
- **评测自省**（[#96704](https://github.com/NousResearch/hermes-agent/issues/96704)）：评估"自我学习循环"是否真实有效，处于 needs-decision，依赖维护者拍板。
- **低配本地部署**（[#53347](https://github.com/NousResearch/hermes-agent/issues/53347)，9 👍）：与 #150359 的 local-models 抽离系列相关，可能有交集。
- **桌面体验**：隐藏未使用的本机 gateway 入口（[#96532](https://github.com/NousResearch/hermes-agent/issues/96532)，10 👍）用户需求明确，实现成本低，有望近期纳入。

## 7. 用户反馈摘要

- **痛点集中在 Desktop + 多 profile 生产环境**：升级/迁移后旧会话无法恢复（#143150）、自有会话无法归档（#143839）——统一网关迁移对存量用户不够平滑。
- **Windows 用户处境最差**：P0 级 state.db 误恢复（#147938）与无 TTL 启动死锁（#127284）均针对 Windows，平台测试覆盖不均衡。
- **运维型用户**对噪音敏感：cron 留空会话（#145314）、插件加载刷警告（#132741，3 个插件 24 小时 58 条 WARN）、Slack 重复 token 告警（#86028）。
- **好评方向**：插件 Hackathon 参与踊跃；TUI 细节优化（#150126 用户消息底纹）体现对交互体验的关注；网关协议开放的讨论氛围良好。
- **安全意识用户**持续推动审计日志（#1155）与密钥脱敏落库（#39654）。

## 8. 待处理积压

- **PR 积压 404 个待合并**，其中含 #150303（修复 macOS 构建失败的紧急 PR）与多个 Hackathon 目录提交——建议优先审查构建修复链（#150297 → #150364）。
- **P0 #147938**（Windows 数据覆盖）5 天无 fix PR，需安全/数据完整性优先处理。
- **长期悬置的高价值 Issue**：
  - [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) 跨网关协作（8 月末开，仍 needs-decision）
  - [#53347](https://github.com/NousResearch/hermes-agent/issues/53347) 上下文下限（6 月末开，9 👍）
  - [#75130](https://github.com/NousResearch/hermes-agent/issues/75130) 技能提案队列无界增长（7 月末开）
  - [#1155](https://github.com/NousResearch/hermes-agent/issues/1155) 审计日志（3 月开，维护者本人提交，至今未排期）
- **#143547 网关善后 tracker** 已聚集 50 条评论，建议发布专项修复批次稳定存量用户。

**健康度小结**：社区参与度与生态扩张（插件 Hackathon、第三方客户端协议）非常健康，但统一网关大迁移的回归债务 + 404 个待审 PR 表明**审查带宽与 QA 覆盖是当前最需投入的两个短板**。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*