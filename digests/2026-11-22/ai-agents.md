# OpenClaw 生态日报 2026-11-22

> Issues: 415 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-22 00:18 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-11-22

## 1. 今日速览

项目延续高热度运行态势：过去 24 小时共产生 **415 条 Issue 更新**（新开/活跃 297，关闭 118）与 **500 条 PR 更新**（待合并 292，已合并/关闭 208），关闭率健康（Issue 约 28%，PR 约 42%），表明维护者审核节奏与社区产出基本匹配。**今日无新版本发布**，社区焦点仍集中在 2026.11.5 beta 更新链路的多个阻塞问题上。稳定性方面，内存回归、Prompt 缓存失效、更新失败三大主题反复出现，是当前最突出的技术债。整体判断：项目活跃度极高、社区参与深入，但更新器（Doctor/package-swap）可靠性已成为 P0 级风险区。

---

## 2. 版本发布

今日无新版本发布。值得注意：**2026.11.5 仍在 beta 阶段**且 beta 通道暴露出多个更新失败问题（见第 5 节），正式发布前需重点收敛。

---

## 3. 项目进展

今日活跃 PR 以修复和体验打磨为主，合共关闭 208 个 PR，重点方向：

- **更新/安装链路**：[#201393](https://github.com/openclaw/openclaw/pull/201393) 修复 Funnel 引导误指向 token auth；[#201350](https://github.com/openclaw/openclaw/pull/201350) 让 `install.sh --beta` 对 git 安装真正生效。
- **模型与预算**：[#203271](https://github.com/openclaw/openclaw/pull/203271)（P1）修复未配置模型时静默将聊天发往 OpenAI 的问题——涉及面极广（全渠道 + Codex/llama-cpp 扩展）；[#203364](https://github.com/openclaw/openclaw/pull/203364) 让 Goal 预算正确计入已结算 token。
- **存储层**：[#202836](https://github.com/openclaw/openclaw/pull/202836) 修复 SQLite worker 容量耗尽；[#202834](https://github.com/openclaw/openclaw/pull/202834) 缩短冷 transcript 归档期间的 WAL pin，直击 #197083 一类 WAL 问题。
- **UX 打磨**：[#202141](https://github.com/openclaw/openclaw/pull/202141)（XL）Web 首次引导对齐 Mac 欢迎流程；[#203346](https://github.com/openclaw/openclaw/pull/203346) 加速 30 天 Usage 报表；[#202689](https://github.com/openclaw/openclaw/pull/202689)（XL，含安全审查）修复已忽略的自动化失败重新进入 Inbox。
- **平台能力**：[#202513](https://github.com/openclaw/openclaw/pull/202513)（XL，重构 + 安全敏感）重构请求者准入；[#202807](https://github.com/openclaw/openclaw/pull/202807) 让 Talk/Discord 可通过 ChatGPT 登录使用 GPT-Live-1.1；[#202813](https://github.com/openclaw/openclaw/pull/202813)（P1）修复 Discord `/codex detach` 重启后不持久化。

**评价**：更新器、存储、准入模型三条主线均有实质推进，但多条 XL 级 PR（202306/202513/202689/203271）处于等待维护者/作者状态，合并吞吐是近期瓶颈。

---

## 4. 社区热点

| Issue | 评论 | 主题 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) (P0) | 85 | 2026.9.6 起，含大型外部插件的 Gateway 在插件捕获时事件循环阻塞数分钟，启动即卡、运行时复发。自 9 月底持续至今仍无 fix PR，是社区积怨最深的问题。 |
| [#191944](https://github.com/openclaw/openclaw/issues/191944) | 38 | macOS 上 `gateway stop / stop --force` 均失败（进程族检查错误），主分支暂不可复现。 |
| [#197083](https://github.com/openclaw/openclaw/issues/197083) (P0) | 32 | npm 升级 11.1→11.3 后 Doctor WAL 校验失败，状态已迁移无法回滚，更新“半完成”。与 #202834 方向相关。 |
| [#182891](https://github.com/openclaw/openclaw/issues/182891) | 21 | Prompt cache 每次请求 `dropped N -> 0`，envelope 改写/载体变更导致缓存永不复用——成本敏感用户的直接痛点。 |
| [#200606](https://github.com/openclaw/openclaw/issues/200606) (P1) | 19 | 2026.11.5 候选 Doctor 因插件迁移冲突 + `changed=[]` 阻塞更新。 |

**诉求画像**：热议问题高度集中于「**升级可靠性**」与「**token 成本（缓存/预算）**」，反映 OpenClaw 用户已进入生产化、多渠道、长期运行阶段。

---

## 5. Bug 与稳定性（按严重程度）

**P0**
- [#160959](https://github.com/openclaw/openclaw/issues/160959) 大插件导致 Gateway 阻塞数分钟（crash-loop 级）— ❌ 无 fix PR
- [#169844](https://github.com/openclaw/openclaw/issues/169844) Windows Control UI 更新卡在 "Activating"，计划任务被禁用、网关停摆（release blocker）— ❌ 无 fix PR
- [#197083](https://github.com/openclaw/openclaw/issues/197083) 更新半完成且不可回滚 — ⚠️ 相关方向 PR #202834 进行中

**P1**
- [#200606](https://github.com/openclaw/openclaw/issues/200606) 11.5 候选 Doctor 阻塞 — ❌
- [#200756](https://github.com/openclaw/openclaw/issues/200756) Windows beta.2→beta.4 在 package-swap 失败 — ❌
- [#181432](https://github.com/openclaw/openclaw/issues/181432) 基线内存 ~1.9 GB + SQLite 事务超时、消息丢失 — ❌
- [#169797](https://github.com/openclaw/openclaw/issues/169797) 2026.9.9/10.1 内存 2.5 倍回归，启动/首答慢 3–5 倍 — ❌
- [#196199](https://github.com/openclaw/openclaw/issues/196199) 2026.10.10 回归：Codex helper 完成后无法唤醒父级，目标暂停、用户被锁在外（needs-info）
- [#191476](https://github.com/openclaw/openclaw/issues/191476) Matrix 房间因 consumer 竞争永久卡死 — ❌
- [#197515](https://github.com/openclaw/openclaw/issues/197515) 已合并修复 #186506 未随 11.3 发布，升级提示无法消除 — ⚠️ 发布流程问题

**已关闭/好转**：[#185578](https://github.com/openclaw/openclaw/issues/185578)（内存只涨不降 25 MiB/h）与 [#199155](https://github.com/openclaw/openclaw/issues/199155)（beta.2 transcript UNIQUE 冲突，标 queueable-fix）已关闭，内存/存储主线有可见改善。

**结论**：升级器相关 P0/P1 至少 5 项无修复 PR，建议作为 2026.11.5 正式版前置条件。

---

## 6. 功能请求与路线图信号

- **[#202306](https://github.com/openclaw/openclaw/pull/202306)（XL，PR 进行中）**「将无项目对话移入项目」——多项目工作流是明确路线方向。
- **[#170997](https://github.com/openclaw/openclaw/issues/170997)** memory FTS 增加 CJK bigram 分词器（中文 2 字词无法命中）——已有 linked PR，中文用户关键需求，很可能进下版本。
- **[#116052](https://github.com/openclaw/openclaw/issues/116052)** MCP OAuth 支持预注册客户端（无 DCR 的企业授权服务器）——企业落地刚需，需安全审查。
- **[#138990](https://github.com/openclaw/openclaw/issues/138990)** 前台 WebChat 长任务的强制 checkpoint/让位策略——配合 #203364 预算 PR，运行时管控是趋势信号。
- **[#200224](https://github.com/openclaw/openclaw/issues/200224)**（配置迁移两难）与 **[#203358](https://github.com/openclaw/openclaw/pull/203358)**（Settings 中选择 harness）显示模型配置体验正在系统性重构。
- **[#155137](https://github.com/openclaw/openclaw/issues/155137)** Perplexity Agent API 研究工具。

---

## 7. 用户反馈摘要

- **成本焦虑最普遍**：#182891、#202001、#177506（单晚 1670 万 token 缓存丢失）显示用户对缓存失效导致的重复计费非常敏感，且难以自行诊断。
- **升级即风险**：多名用户（#197083、#200606、#200756、#169844）描述“升级后进退两难”——不可回滚 + Doctor 失败的组合在 Windows 上尤其严重。
- **资源受限主机受挫**：单 CPU / ARM64 用户（#181432、#169797）报告内存回归导致小主机不可用。
- **正面信号**：PR 模板纪律性强（问题/影响/证据分节），社区贡献质量高；自动修复类 PR（roboclaw-bot）与国际化同步（locale refresh）运转流畅。
- **多智能体编排需求上升**：helper 唤醒失败（#196199）、非 owner 调度（#187264）、隐藏 agent（#166678）均反映组织级多 agent 使用场景成熟。

---

## 8. 待处理积压（提醒维护者）

| 条目 | 状态 | 提醒 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) (P0, 85 评论) | 开放近 2 月，needs-maintainer-review，无 fix PR | 最高优先处理 |
| [#169844](https://github.com/openclaw/openclaw/issues/169844) (P0) | 10 月至今，needs-product-decision | Windows 更新卡死 |
| [#136405](https://github.com/openclaw/openclaw/issues/136405) | 9 月至今 stale | memory_search 无超时配置 |
| [#124306](https://github.com/openclaw/openclaw/issues/124306) | 8 月至今，data-loss 相关 | exec 审批卡不显示 mount point |
| [#113159](https://github.com/openclaw/openclaw/issues/113159) | 7 月至今 | usage-limit 冷却不尊重真实重置时间 |
| [#197515](https://github.com/openclaw/openclaw/issues/197515) | 已修但未发布 | 建议纳入下个 patch 发布 |
| 大量 XL PR（202513/202689/203271/202306） | 等待维护者审查 | 审查吞吐是当前合并瓶颈 |

**健康度小结**：Issue/PR 关闭率良好、社区供给旺盛；风险集中在「升级器可靠性」「内存回归」「缓存成本」三线，建议在 2026.11.5 转正前集中清偿。

---

## 横向生态对比

# AI 智能体与个人助手开源生态横向对比分析报告
**数据日期：2026-11-22**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已全面进入**生产化深水区**：两个头部项目均维持日均 400+ Issue 更新、500 条 PR 更新的高强度运转，社区供给旺盛。用户画像明显从“尝鲜者”转向“重度生产用户”——痛点集中于升级可靠性、长期运行稳定性、token 成本控制与数据完整性，而非功能缺失本身。技术架构上，两大项目不约而同走向**网关统一化/多渠道收口**（OpenClaw Gateway、Hermes Unified Gateway），且都在为此支付短期稳定性代价。多智能体编排（Kanban 调度、helper 协作、外部 CLI worker）成为下一阶段的明确竞争焦点。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 415（新开/活跃 297，关闭 118） | 248（新开/活跃 229，关闭 **19**） |
| Issue 关闭率 | ~28%（健康） | ~8%（**明显滞后**） |
| PR 更新（24h） | 500（待合并 292，合并/关闭 208） | 500（待合并 282，合并/关闭 218） |
| Release | 无（2026.11.5 停留 beta） | 无（v0.23.2 已出，发布工程在升级中） |
| 无 fix PR 的 P0/P1 数 | ≥7 | ≥10（P1 2 项 + P2 多项） |
| 核心风险 | 升级器（Doctor/package-swap）可靠性 | Unified Gateway 重构后回归 |
| 健康度评估 | **活跃度极高、审核节奏匹配，处于质量巩固期** | **开发推进快于问题消化，处于重构收敛期，Issue 净增长需警惕** |

关键结构性差异：OpenClaw 的问题消化与社区产出基本匹配；Hermes PR 吞吐是 Issue 关闭速度的约 11 倍，技术债在累积。

---

## 3. OpenClaw 在生态中的定位

**优势**：
- **问题消化能力**：28% 的 Issue 关闭率和 42% 的 PR 关闭率，维护者审核节奏明显优于 Hermes，社区信任度更高。
- **用户成熟度**：热议问题集中于成本优化（缓存复用 #182891、预算计入 #203364）和多渠道生产部署（Discord/Matrix/Talk），表明用户已进入长期运行阶段——这是产品价值的直接佐证。
- **贡献质量**：PR 模板纪律性强（问题/影响/证据分节），roboclaw-bot 自动修复与国际化流程运转流畅。

**技术路线差异**：
- OpenClaw 的重心在**存储层工程**（SQLite worker 容量、WAL pin、transcript 归档）与**准入/更新器可靠性**，偏“单体网关 + 渠道接入”路线。
- Hermes 的重心在**统一网关架构 + Kanban 多智能体调度 + profile 生命周期**，偏“编排平台”路线，基础设施投资（RE2 迁移、签名发布流水线）更前置。

**社区规模**：两项目日活跃量级相当（PR 更新均达 500），但 OpenClaw 的讨论密度（297 活跃 Issue vs 229）和积压清偿能力更优；Hermes 面临外部贡献通道受阻（#131859 API 开 PR 权限错误），可能低估了真实社区参与意愿。

**短板**：升级器相关 P0/P1 至少 5 项无修复 PR（#160959 已积压近 2 月、85 条评论），是全项目最深的社区积怨点。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **升级/更新可靠性** | #197083（半完成不可回滚）、#200606、#200756、#169844 | #134469（venv 重建丢插件依赖）、#158078、#158714 | “升级即风险”是两个社区一致的顶级痛点：不可回滚、静默失败、依赖丢失 |
| **Prompt 缓存与 token 成本** | #182891（缓存永不复用）、#203364、#202001、#177506 | #158139（缓存写入错误计价） | 成本可观测性与计费准确性，用户难以自行诊断 |
| **多智能体编排** | #196199（helper 唤醒失败）、#187264（非 owner 调度）、#166678 | #70547（外部 CLI worker）、#62418/#148958（Kanban 生产流水线）、#158166 | 组织级多 agent 场景成熟，调度器从单机工具向通用编排层演进 |
| **网关统一架构** | Gateway 事件循环阻塞（#160959）、准入重构（#202513） | #143547/#146643（统一网关性能回归） | 双方均在做“全渠道收口单网关”，且都遭遇性能/稳定性连锁反应 |
| **静默失败可观测性** | Doctor 校验失败、模型静默回退 OpenAI（#203271） | Steer 按钮 no-op、TTS 无提示降级、DM 空回复 | “失败要可见、要可恢复”是跨项目的第一诉求 |
| **会话数据完整性** | transcript 归档/WAL 问题（#197083、#202834） | #147839（store 毒化）、#152603（转录丢序） | 长时运行场景下数据不可丢、状态不可毒化 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| **功能侧重** | 多渠道个人助手（Discord/Matrix/Talk/Web）、模型配置与预算管理、memory 检索（CJK bigram） | 桌面端体验（Electron、深链、通知联动）、Kanban 任务调度、浏览器自动化、cron/bot 模式 |
| **目标用户** | 多渠道部署、成本敏感的生产用户；企业落地信号（MCP OAuth 预注册 #116052） | 桌面为中心的重度个人用户、无人值守自动化流水线、多 agent 生产编排 |
| **技术架构** | Gateway + SQLite 存储层 + 更新器（Doctor/package-swap），渠道接入面广 | 单一 Unified Gateway 进程收口 CLI/TUI/Desktop/API/cron/Kanban，profile 子系统 + 隔离化构建 |
| **路线信号** | 多项目工作流（#202306）、运行时管控（checkpoint/预算） | 外部 CLI worker 接入（#70547）、深链与桌面为中心（#70568） |
| **风险画像** | 发布流程（已修复未发布 #197515）、XL PR 审查瓶颈 | 重构后回归集中爆发、Issue 消化滞后、平台权限问题阻塞外部贡献 |

---

## 6. 社区热度与成熟度

- **OpenClaw —— 质量巩固阶段**：高活跃 + 高关闭率，问题集中在少数明确技术债（升级器、内存、缓存三线）。内存主线已有可见改善（#185578、#199155 关闭）。核心挑战是 2026.11.5 转正前的 P0 清偿与 XL PR 审查吞吐。
- **Hermes Agent —— 快速迭代/重构收敛阶段**：基础设施投资活跃（RE2、签名发布流水线），但 Unified Gateway 合并后的性能回归（#146643）和多个会话级 P1/P2 缺陷（#147839、#144413）无 fix PR，Issue 净增长表明处于“用稳定性换架构演进”的窗口期。

分层判断：两项目同处第一梯队；OpenClaw 的**社区运营成熟度**更高，Hermes 的**架构野心与推进速度**更快。

---

## 7. 值得关注的趋势信号

1. **“升级可靠性”正在成为 AI 智能体基础设施的差异化竞争力**。两个项目同时因更新链路翻车，说明频繁迭代的 agent 运行时对原子更新、可回滚、依赖保真有硬需求——构建升级器时可参考的教训：不可回滚 + Doctor 失败的组合是最伤信任的失败模式。
2. **成本可观测性是下一个产品战场**。缓存失效导致的重复计费（单晚 1670 万 token 丢失）用户无法自诊；提供缓存命中率、token 流向的透明报表将是刚需功能。
3. **多智能体编排从需求变为采购标准**。Kanban 调度、外部 CLI worker（Claude Code/Codex 接入）、非 owner 调度等诉求在两个社区同步涌现——通用 agent 编排层是明确的空位。
4. **网关统一化是行业共识架构，但必须配套性能工程**。数千会话下的线性劣化教训表明：网关设计初期就要考虑增量状态加载与会话存储分层。
5. **“静默失败”是被一致诟病的反模式**。开发者应将“失败可见 + 状态可恢复 + 数据可找回”作为 agent 系统的一等设计目标，而非事后补丁。
6. **用户已把开源 agent 用于无人值守、高负载生产场景**（650k token 主力会话、跨机 bot-relay、自动化流水线）——稳定性 SLA 要求向传统服务端软件看齐，测试与发布工程（如 Hermes 的隔离化签名构建）值得跟进。

---

**给技术决策者的一句话总结**：当前选型 OpenClaw 更适合多渠道生产部署与成本敏感场景（需规避 beta 更新链路）；Hermes 更适合桌面为中心与多 agent 编排场景（需等待 Unified Gateway 收敛）；两者共同的教训是——agent 系统的护城河正从功能丰富度转向**可靠性、可观测性与升级安全**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-22

## 1. 今日速览

Hermes Agent 今日保持**高强度活跃**：过去 24 小时 Issue 更新 248 条（新开/活跃 229，关闭 19），PR 更新 500 条（待合并 282，已合并/关闭 218），PR 吞吐量约为 Issue 关闭速度的 11 倍，显示开发推进快于社区问题的消化速度。**无新版本发布**。讨论焦点集中在 **Unified Gateway 合并后的连锁问题**（性能、会话状态、桌面端超时），以及 Kanban 调度器的一系列可靠性缺陷。整体来看项目处于"大重构后收敛期"——架构升级红利与稳定性代价并存，Issue 净增长值得维护者警惕。

## 2. 版本发布

今日无新版本发布。（注：Issue 中提及 v0.23.2 / v0.23.1，PR #158714 的隔离化构建流程或为下一轮发布铺路。）

## 3. 项目进展

今日合并/关闭的 PR 共 218 条，代表性进展：

- **浏览器工具链修复**：[#157140](https://github.com/NousResearch/hermes-agent/pull/157140)（已关闭）修复 `browser_vault fill` 在 React/Vue/MUI 等框架受控表单上"报成功但实际为空"的问题，并增加填充后验证——提升浏览器自动化可靠性。
- **提示缓存计费修正**：[#158139](https://github.com/NousResearch/NousResearch/hermes-agent/pull/158139)（已关闭）修复 Nous 模型零价格缓存写入被错误计价、路由学习规则被单次噪声聊天覆盖、cwd 尾随空格等三处问题。
- **插件目录更新**：[#157596](https://github.com/NousResearch/hermes-agent/pull/157596)（已关闭）将 evalroute 插件重定位到 0.7.0。
- **网关 RPC 日志可观测性**：[#150535](https://github.com/NousResearch/hermes-agent/pull/150535)（已关闭）让两条静默失败的 RPC 路径（handler 异常、parse error）留下日志。
- **在途功能（待合并）**：
  - [#158424](https://github.com/NousResearch/hermes-agent/pull/158424) + [#158407](https://github.com/NousResearch/hermes-agent/pull/158407)：桌面端用户活跃状态上报，支撑"人在电脑前则手机通知静音"——通知体验的整体性改进，配套性设计良好。
  - [#158717](https://github.com/NousResearch/hermes-agent/pull/158717)：引入基于 google-re2 的 `hermes_re` 门面（分层迁移 S1），是一次有计划的正则引擎基础设施替换。
  - [#158714](https://github.com/NousResearch/hermes-agent/pull/158714)：commit 构建接入隔离缓存与签名的 Stable Release 流程，发布工程化升级。

**评估**：今日在通知体验、浏览器工具、缓存计费准确性三个方向均有实质推进；RE2 迁移和发布流水线改造属于中期投资，短期内不改变用户可见行为。

## 4. 社区热点

- **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（85 评论）**：Unified Gateway（#106742）合并后的持续跟踪帖，是全站讨论之最。CLI/TUI/Desktop/API/cron/Kanban/Group Chat 全部收口到单一网关进程后，主分支暴露一系列 post-merge 问题，延续 #134889。**诉求：用户在等待一个稳定可用的统一架构，而非持续追修。**
- **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（69 评论）**：贡献者 @kuehnberger 无法通过 API 向本仓库开 PR（CreatePullRequest 权限错误，issue 与 fork PR 正常），标记 blocked/cause/upstream。**诉求：外部贡献通道受阻，需尽快确认是否为平台侧权限配置问题。**
- **[#155595](https://github.com/NousResearch/hermes-agent/issues/155595)（17 评论）**：profile 创建/生命周期战役的官方 handoff 跟踪帖（Honcho 清理、克隆安全、provider 接缝），是 profile 子系统的路线图中枢。
- **[#146643](https://github.com/NousResearch/hermes-agent/issues/146643)（22 评论）**：网关在数千会话的 store 上每次变更全量重读历史，占用 1.5–2.5 CPU 核并导致 Desktop 30 秒超时——Unified Gateway 后**最严重的性能回归**。

## 5. Bug 与稳定性（按严重度）

**P1（高危）**
- [#147839](https://github.com/NousResearch/hermes-agent/issues/147839)：单次 20s `worker_receipt_timeout` 即污染整个 store 并摧毁回合，用户只见"No reply"，会话不可恢复。**暂无 fix PR。**
- [#134469](https://github.com/NousResearch/hermes-agent/issues/134469)：`hermes update` 重建 staged venv 时丢弃插件依赖，原生 provider 插件静默失效。**暂无明确 fix PR。**

**P2（重要）**
- [#146643](https://github.com/NousResearch/hermes-agent/issues/146643)：网关全量重读会话历史，CPU 与超时随 store 线性增长（见热点）。暂无 fix PR。
- [#141973](https://github.com/NousResearch/hermes-agent/issues/141973)：回合中途发送的 steer 消息三处不可靠（入队不送达/显示已发送但未达/Steer 按钮静默 no-op）。暂无 fix PR。
- [#147839 关联] [#144413](https://github.com/NousResearch/hermes-agent/issues/144413)：工具结果含孤立代理字符时 settlement 崩溃 `UnicodeEncodeError`，会话卡死 `paused: unknown_execution`。暂无 fix PR。
- [#156709](https://github.com/NousResearch/hermes-agent/issues/156709)：`FooteredReply` 破坏 `copy.deepcopy`（TypeError），开启 runtime footer 即触发。暂无 fix PR。
- [#156899](https://github.com/NousResearch/hermes-agent/issues/156899)：并发首次查找 profile 插件导致 "Unknown provider" 直至重启（v0.23.2 回归）。暂无 fix PR。
- [#152603](https://github.com/NousResearch/hermes-agent/issues/152603)：Desktop state.db 中被中断/取代的回合 `active=0` 且 display_order 回退，近期对话从转录中消失（数据可恢复）。暂无 fix PR。
- [#150617](https://github.com/NousResearch/hermes-agent/issues/150617)：Bot Mode DM 完成通知忽略 `completion_output_chars`，尾部可截断到 0 字符（DM 空回复）。暂无 fix PR。

**已有 fix 在途的 P2 PR**：[#158166](https://github.com/NousResearch/hermes-agent/pull/158166)（Kanban 卡片无可解析模型时先拒绝再 spawn，避免烧 worker 和 400）、[#158078](https://github.com/NousResearch/hermes-agent/pull/158078)（更新报告列出不再接收捆绑更新的技能副本）、[#158727](https://github.com/NousResearch/hermes-agent/pull/158727)（cron fire 锁文件不再泄漏）、[#158654](https://github.com/NousResearch/hermes-agent/pull/158654)（步行/骑行路线误用汽车 OSRM 图）、[#156311](https://github.com/NousResearch/hermes-agent/issues/156311) 相关的 Docker sealed runtime 误报（Issue 侧）。

**P3 / 平台特定**：[#151348](https://github.com/NousResearch/hermes-agent/issues/151348)（Windows 会话切换每次 git 调用阻塞 Electron 主进程 ~2s，标 cause/upstream）、[#123184](https://github.com/NousResearch/hermes-agent/issues/123184)（macOS Keychain 镜像截断 Claude Code 凭据导致登出）、[#144503](https://github.com/NousResearch/hermes-agent/issues/144503)（主机休眠跨过 turn lease 导致回合硬中断——笔记本用户高频踩坑）。

## 6. 功能请求与路线图信号

- **外部 CLI worker 接入 Kanban**：[#70547](https://github.com/NousResearch/hermes-agent/issues/70547)（needs-decision）请求 dispatcher 支持为非 profile assignee（Claude Code、Codex CLI 等）配置 spawn 路径——`spawn_fn` 接缝已存在，只差产品化。若被采纳，Hermes 将成为**多 agent 编排的通用看板层**，战略意义大。
- **桌面深链**：[#70568](https://github.com/NousResearch/hermes-agent/pull/70568)（`hermes://chat/new` deep link，7 月开至今）允许外部应用带 workspace/profile/prompt 打开聊天，仍处 needs-decision，但与 #158424/#158407 的"桌面为中心"方向一致。
- **终端集成**：[#140837](https://github.com/NousResearch/hermes-agent/pull/140837) OSC 7501 状态上报（idle/working/blocked/done），与 #129973 反映的 Herdr 检测回归同属"终端工作区管理器友好性"主题，社区明确想要。
- **官方路线图信号**：#155595（profile 生命周期）与 #145171（serve/remote Desktop/web 切入网关会话权威）是维护者明确的两大 fast-follow 战役，可预期为下一版本主线。

## 7. 用户反馈摘要

**痛点集中在三处**：
1. **Unified Gateway 的代价**：性能随会话量线性劣化（#146643）、steer 不可靠（#141973）、settlement 编码崩溃（#144413）——重度多会话用户受影响最深。
2. **"静默失败"是最被诟病的模式**：插件依赖丢失无声失效（#134469）、Steer 按钮 no-op（#141973）、TTS 语音降级无提示（#84102）、DM 空回复（#150617）。用户反复要求"失败要可见、要可恢复"。
3. **数据完整性与可恢复性**：会话被 receipt timeout 毒化（#147839）、转录丢序（#152603）触及信任底线，即使数据可恢复也造成恐慌。

**满意点**：#152603 报告者确认"数据完好、可恢复"；#158166 类 PR 在 spawn 前校验、#158078 透明化更新报告，反映团队正在系统性回应"可观测性"诉求。

**典型场景**：跨机 bot-relay DM（#146035）、长时运行的 Desktop 主力会话（650k tokens，#152603）、Kanban 自动化生产流水线（#62418/#148958）——用户正把 Hermes 用于高负载、无人值守场景，稳定性要求随之水涨船高。

## 8. 待处理积压（建议维护者关注）

| Issue/PR | 年龄 | 风险 |
|---|---|---|
| [#84102](https://github.com/NousResearch/hermes-agent/issues/84102) TTS Ogg/Vorbis 降级 | ~3.5 个月 | 平台语音体验持续受损，修复简单（ffmpeg 指定 codec） |
| [#62418](https://github.com/NousResearch/hermes-agent/issues/62418) Kanban active_pr 守卫阻断合法返工 | ~4.5 个月 | 自动化流水线卡死，需人工干预 |
| [#70547](https://github.com/NousResearch/hermes-agent/issues/70547) 外部 CLI worker spawn | ~4 个月 | needs-decision 悬置，涉及战略方向 |
| [#70568](https://github.com/NousResearch/hermes-agent/pull/70568) chat/new 深链 PR | ~4 个月 | 长期挂起的 feature PR，多 sweeper 风险标签 |
| [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) 云端 provider 上下文被钳到 65536 | ~3 个月 | 静默性能损失，长上下文用户实际受损 |
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) API 开 PR 权限错误（blocked/upstream） | ~7 周 | **阻塞外部贡献，建议优先升级/关闭** |

**健康度总评**：贡献吞吐强劲（24h 218 个 PR 合并/关闭）、基础设施投入（RE2、发布工程）健康；但 P1/P2 稳定性 issue 净增长、多个网关核心缺陷尚无 fix PR，建议在 Unified Gateway 战役（#143547/#145171）内优先排期 #146643、#147839、#144413 三项。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*