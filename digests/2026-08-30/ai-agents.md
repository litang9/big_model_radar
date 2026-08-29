# OpenClaw 生态日报 2026-08-30

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-08-29 22:39 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-08-30

> 数据来源：GitHub openclaw/openclaw 过去 24 小时活动快照 | Issues 更新 500 条 | PRs 更新 500 条

---

## 1. 今日速览

- **活跃度极高**：过去 24 小时内 Issues 与 PR 更新各达 500 条（新增/活跃 Issue 428 条、关闭 72 条；PR 待合并 343 个、合并/关闭 157 个），社区处于高强度贡献状态，但**积压同样明显**——待合并 PR 队列已达 343 个。
- **无新版本发布**（含 beta 通道），社区讨论中仍在消化 `2026.8.1-beta.2/beta.3` 的问题反馈，beta 稳定性是当前主线。
- **最大风险点**：P0 级 Gateway 内存泄漏（[#91588](https://github.com/openclaw/openclaw/issues/91588)，RSS 从 350MB 涨至 15.5GB 导致 OOM）已开放近 3 个月、累计 23 条评论，至今**无关联修复 PR**。
- **工程流程信号**：项目大量使用 `clawsweeper` 自动化分级标签（issue-rating / merge-risk / needs-maintainer-review）与 AI 辅助 PR（如 [#120618](https://github.com/openclaw/openclaw/pull/120618) 标注 `[AI]`），自动化分诊体系成熟，但大量 Issue 同时挂有 `needs-product-decision`，**产品决策债务在累积**。
- 今日讨论焦点集中在：**长时运行网关的资源稳定性**与**消息投递可靠性（Telegram/Slack 侧静默丢消息）**。

---

## 2. 版本发布

今日无新版本发布。（Issue 中可观察到最新迭代版本为 `2026.8.1-beta.3`，正式版与 beta 通道今日均无动作。）

---

## 3. 项目进展

### 今日关闭/完成审阅的重要 PR（共 157 个合并/关闭）

| PR | 内容 | 意义 |
|---|---|---|
| [#123535](https://github.com/openclaw/openclaw/pull/123535) | fix(ui): 消除会话目录刷新风暴 | 修复侧栏在窗口聚焦/在线状态变化时触发冗余全量刷新，Control UI 可用性提升 |
| [#116489](https://github.com/openclaw/openclaw/pull/116489) | feat(security): 安装策略警告需确认 | 引入 `installPolicy` warn 机制，可疑插件/技能安装需操作员二次确认，安全边界加强 |
| [#128223](https://github.com/openclaw/openclaw/pull/128223) | fix(cli): 从写入快照解析 alias 目标 | 修复 `openclaw models aliases add` 的别名解析错误 |

### 今日新开的高价值 PR（修复推进明显）

- **[#132815](https://github.com/openclaw/openclaw/pull/132815)** fix(chat): 会话重置后保持新 turn 顺序（P1，已 ready for maintainer look）——核心维护者 @steipete 提交，紧接 #132606 二次修复压缩重置窗口泄漏。
- **[#132723](https://github.com/openclaw/openclaw/pull/132723)** fix(slack): 网关重启后显式暴露被丢弃的消息——直击 Slack DM 静默丢消息这一高频投诉。
- **[#132489](https://github.com/openclaw/openclaw/pull/132489)** / **[#132487](https://github.com/openclaw/openclaw/pull/132487)**：修复显式模型选择时 runtime 归属错配、xAI OAuth 配对 404——模型路由正确性持续收敛。
- **更新器可靠性集群**：[#132813](https://github.com/openclaw/openclaw/pull/132813)（脏回滚后禁止重启，ready for maintainer）、[#132879](https://github.com/openclaw/openclaw/pull/132879)（Gateway 启动中 Git 更新误报失败）、[#119516](https://github.com/openclaw/openclaw/pull/119516)（更新失败后恢复托管网关）——安装/更新链路修复密集投放。
- **[#132849](https://github.com/openclaw/openclaw/pull/132849)** feat(android): Android 端对齐 Web UI（XL）——移动端体验统一的大动作。
- **[#132374](https://github.com/openclaw/openclaw/pull/132374)** fix(cloud): 计算机控制绑定会话桌面——已通过完整 CI（exact-head CI 33277944363），**等待最终原生验收后合并**，是本日最接近落地的 XL PR。

### 待维护者审阅队列（status: 👀 ready for maintainer look）

[#127300](https://github.com/openclaw/openclaw/pull/127300)、[#130345](https://github.com/openclaw/openclaw/pull/130345)、[#130370](https://github.com/openclaw/openclaw/pull/130370)、[#127284](https://github.com/openclaw/openclaw/pull/127284)、[#120472](https://github.com/openclaw/openclaw/pull/120472)、[#131682](https://github.com/openclaw/openclaw/pull/131682)、[#132813](https://github.com/openclaw/openclaw/pull/132813)、[#132815](https://github.com/openclaw/openclaw/pull/132815) 等——**QA 基建（qa-lab）相关 PR 占比突出**，项目正在系统性加固自动化验收能力。

**小结**：今日无版本发布，但单日 157 个 PR 合并/关闭 + 一批高质量新修复 PR，工程节奏健康；进展重心在 **更新器可靠性、模型路由正确性、QA 自动化** 三条线。

---

## 4. 社区热点

按评论数排序的热点 Issue：

| Issue | 标题 | 评论 | 状态 |
|---|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 🔴 P0 Gateway 内存泄漏：350MB→15.5GB，反复 OOM | **23** | OPEN，无修复 PR |
| [#39476](https://github.com/openclaw/openclaw/issues/39476) | P1 A2A sessions_send 回调导致消息重复 | 12 | OPEN，有 linked PR |
| [#41744](https://github.com/openclaw/openclaw/issues/41744) | P3 飞书图片在出站前丢失 | 12 | OPEN，有 linked PR |
| [#6599](https://github.com/openclaw/openclaw/issues/6599) | P3 /models test-fallback 验证回退链 | 11 | OPEN（2 月至今） |
| [#96975](https://github.com/openclaw/openclaw/issues/96975) | P2 子代理完成内容隔离（默认只返回状态+会话链接） | 11 | OPEN |
| [#132762](https://github.com/openclaw/openclaw/issues/132762) | P1 overflow-retry 以 toolResult 结束但无最终投递 | 10 | **今日新开**，无修复 PR |

**诉求分析**：
- **#91588 一枝独秀（23 评论）**：网关需 7×24 长跑，内存泄漏直接导致 OOM→`launchd-handoff` 重启循环，是自托管用户的核心生存问题。评论量持续增长但无修复 PR，社区焦虑可见。
- **#132762 单日收获 10 条评论**：与 #128971、#96692 同属"工作全部完成、最终答案却没送达"这一模式，**消息投递完整性**是当前用户最敏感的神经。
- **#96975 / #39476** 反映多代理（subagent / A2A）编排已成为主流用法，社区在推动更干净的子代理上下文边界——这与 PR [#101665](https://github.com/openclaw/openclaw/pull/101665)（插件工具 yield turns）、[#129729](https://github.com/openclaw/openclaw/pull/129729)（settle 后允许 requester 继续）方向呼应，属**路线图级别的架构信号**。

---

## 5. Bug 与稳定性

按严重程度排列（标注是否存在修复 PR）：

| 级别 | Issue | 问题 | 修复 PR |
|---|---|---|---|
| **P0** | [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway 内存泄漏，2-3 天涨至 15.5GB，OOM 崩溃循环 | ❌ 无 |
| P0（已关闭） | [#124788](https://github.com/openclaw/openclaw/issues/124788) | beta.2 网关事件循环每 ~10 分钟阻塞 ~100s | ✅ **已关闭**（maturity:stable，本周正面进展） |
| **P1（今日新报）** | [#132762](https://github.com/openclaw/openclaw/issues/132762) | overflow-retry 成功结束但最终回复未投递 | ❌ 无 |
| P1 | [#128971](https://github.com/openclaw/openclaw/issues/128971) | Telegram 终回 `delivery_ambiguous` 被静默吞掉 | 🔶 linked PR open |
| P1 | [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程未回收，僵尸进程累积（回归） | ❌ 无 |
| P1 | [#129455](https://github.com/openclaw/openclaw/issues/129455) | requester-settle 过早终结顺序工作流 | 🔶 [#129729](https://github.com/openclaw/openclaw/pull/129729) 已开 |
| P1 | [#119884](https://github.com/openclaw/openclaw/issues/119884) | DB 迁移未 ANALYZE → 15s 会话操作 + 30-57s 事件循环饥饿 | 🔶 linked PR open |
| P1 | [#102534](https://github.com/openclaw/openclaw/issues/102534) | 重超时后 Cron 定时器永久停摆（重启也不恢复） | ❌ 无 |
| P1 | [#91144](https://github.com/openclaw/openclaw/issues/91144) | Windows 计划任务下网关无法驻留 | 🔶 linked PR open |
| P1 | [#78493](https://github.com/openclaw/openclaw/issues/78493) | sudo update 混合所有权 → doctor 覆盖用户配置（数据丢失） | ❌ 无 |
| P2 | [#102755](https://github.com/openclaw/openclaw/issues/102755) | Windows/WSL 二次构建挂死（**标记 Beta release blocker**） | ❌ 无（需现场复现） |
| P2 | [#44134](https://github.com/openclaw/openclaw/issues/44134) | 工具 schema 频繁重载触发 Google 反滥用**误封号** | ❌ 无 |

**判断**：资源泄漏类（#91588 / #97616）与静默消息丢失类（#132762 / #128971）构成当前两大稳定性主轴；好消息是上周的 P0 事件循环阻塞（#124788）已关闭，且消息丢失方向今日有 PR #132723 补位可观测性。

---

## 6. 功能请求与路线图信号

结合已有 PR 关联度，判断落地可能性：

**高概率进入下一版本（已有 PR 在途）**：
- **多 Teams 机器人支持**：[#71058](https://github.com/openclaw/openclaw/issues/71058) ↔ XL PR [#112811](https://github.com/openclaw/openclaw/pull/112811)（feature: ✨ showcase），企业多租户场景刚需。
- **单响应工具调用数上限 `maxCallsPerBlock`**：PR [#122846](https://github.com/openclaw/openclaw/pull/122846)，直击工具风暴/loopback 缓冲区溢出，与 Issue #55694（死循环刷屏）诉求一致。
- **插件工具 yield turns**：PR [#101665](https://github.com/openclaw/openclaw/pull/101665)（showcase），为外部审批/表单卡流程铺路。

**需求明确、等待排期（无 PR）**：
- 会话智能自动命名（[#99583](https://github.com/openclaw/openclaw/issues/99583)，7 评论）
- `/models test-fallback` 回退链自检（[#6599](https://github.com/openclaw/openclaw/issues/6599)，2 月提出，11 评论

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告

**数据日期：2026-08-30 ｜ 数据源：GitHub 过去 24 小时活动快照**

> ⚠️ **数据说明**：本期仅覆盖 OpenClaw 与 Hermes Agent 两个项目；其中 Hermes Agent 日报数据被截断（MCP 可靠性专项细节不完整），涉及其技术细节的结论以可见数据为准，推断部分已标注。

---

## 一、生态全景

个人 AI 助手/自主智能体开源生态正处于**高活跃度、高压力并存的规模化前夜**：头部项目单日 Issue/PR 更新动辄 350–500 条，工程节奏远超一般开源基础设施项目。竞争焦点已从功能广度转向**生产级可靠性**——长时运行稳定性、消息投递完整性、MCP/工具链路可靠性成为两个项目共同的主战场。与此同时，自托管（self-hosted）与企业多租户需求同步涌现，倒逼项目在安全边界（安装策略确认）与 QA 自动化基建上加大投入。AI 辅助工程流程（自动化分诊、AI PR）已在项目内部常态化，形成“用智能体构建智能体”的自我强化循环。

---

## 二、各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新总量 | **500** | 354 |
| — 新增/活跃 Issue | 428 | 292 |
| — 关闭 Issue | 72 | 62 |
| Issue 关闭率（关闭/更新） | 14.4% | **17.5%** |
| PR 更新总量 | 500 | 500 |
| — 待合并 PR | 343 | **409** |
| — 已合并/关闭 PR | **157** | 91 |
| PR 吞吐占比（合并/更新） | **31.4%** | 18.2% |
| PR 积压消化周期（待合并÷日合并） | **~2.2 天** | ~4.5 天 |
| Release | 无（最新 2026.8.1-beta.3） | 无（主干 v0.20.4–v0.20.5） |
| 版本策略 | CalVer + beta 通道 | SemVer pre-1.0 |

**健康度评估**：

- **OpenClaw：高吞吐、双向流动，但存在结构性债务。** 单日 157 个 PR 合并/关闭、消解周期约 2.2 天，工程节奏健康；但 P0 网关内存泄漏（#91588）挂起近 3 个月无修复 PR，且大量 Issue 挂 `needs-product-decision`，**决策吞吐滞后于贡献吞吐**。
- **Hermes Agent：活跃但积压偏重。** Issue 关闭率（17.5%）略优于 OpenClaw，说明存量问题消解效率不差；但 PR 积压消化周期约 4.5 天、是 OpenClaw 的两倍，**审阅带宽相对贡献量偏紧**。MCP 可靠性专项有实质推进（3 个高优先级缺陷处理中）。

---

## 三、OpenClaw 在生态中的定位

**核心优势：**

1. **规模与吞吐领先**：新增/活跃 Issue（428 vs 292）、日合并 PR（157 vs 91）均显著高于 Hermes Agent，社区体量与工程消化能力目前居首。
2. **全栈平台化覆盖**：从 CLI、Web UI 到 Android（#132849 对齐 Web UI），从 Slack/Telegram 到飞书/Teams 多通道，OpenClaw 走的是“个人助手操作系统”路线，而非单一智能体框架。
3. **工程自动化成熟度高**：`clawsweeper` 自动分级分诊、AI 辅助 PR、qa-lab QA 基建专项投入，工程方法论本身构成护城河。

**技术路线差异：**

- OpenClaw 采用**网关中心化架构**（7×24 常驻、launchd-handoff 托管），这是其“自主性”的来源，也是当前稳定性问题（内存泄漏、僵尸进程、事件循环阻塞）的集中点——**架构选择与风险暴露高度耦合**。
- Hermes Agent 从可见信息推断走**模型核心 + MCP 集成**的运行时路线（MCP 可靠性为其当前专项），版本停留在 0.20.x pre-1.0 阶段，成熟度声明更保守（*推断，受数据截断限制*）。

**风险面**：OpenClaw 的体量优势伴随着“大项目病”——343 个待合并 PR、产品决策债务累积、P0 修复与功能迭代争夺带宽。

---

## 四、共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **MCP / 工具调用可靠性** | 两者 | Hermes Agent 设 MCP 可靠性专项（含 OAuth 缺陷）；OpenClaw 面临工具 schema 重载误封号（#44134）、hook 子进程僵尸累积（#97616）、单响应调用数上限 `maxCallsPerBlock`（#122846） |
| **长时运行稳定性** | 两者（OpenClaw 证据充分） | 7×24 网关内存泄漏/OOM（#91588）、Cron 定时器停摆（#102534）、Windows 驻留（#91144）——自托管场景的生存性问题 |
| **更新/安装链路可靠性** | OpenClaw | 更新器脏回滚、Git 更新误报、sudo 混合所有权覆盖用户配置（#78493），单日 3+ 个相关修复 PR 密集投放 |
| **消息投递完整性** | OpenClaw | "工作完成但最终答案未送达"模式成簇出现（#132762 / #128971 / #96692），Slack/Telegram 静默丢消息 |
| **多代理编排边界** | OpenClaw | subagent 上下文隔离（#96975）、A2A 回调去重（#39476）——主流用法倒逼架构演进 |

---

## 五、差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| **产品形态** | 端到端个人 AI 助手平台（网关 + 多通道 + 多端 UI） | 智能体运行时/框架，以模型能力为核心 |
| **目标用户** | 自托管个人用户 +

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-08-30 | 数据源：GitHub (NousResearch/hermes-agent)**

---

## 一、今日速览

过去 24 小时 Hermes Agent 呈现**高强度社区活跃状态**：Issues 更新 354 条（新开/活跃 292，关闭 62），PR 更新 500 条（待合并 409，已合并/关闭 91），无新版本发布（主干版本线索为 v0.20.4–v0.20.5）。**MCP 可靠性专项取得实质进展**，三个高优先级 MCP 缺陷（OAuth �

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*