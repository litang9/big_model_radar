# OpenClaw 生态日报 2026-09-05

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-04 22:20 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# 📊 OpenClaw 项目动态日报

**报告日期：2026-09-05** ｜ 数据窗口：过去 24 小时（截至 2026-09-04） ｜ 仓库：[openclaw/openclaw](https://github.com/openclaw/openclaw)

---

## 1️⃣ 今日速览

OpenClaw 今日保持**高强度活跃**：24 小时内 Issues 更新 500 条（新开/活跃 407、关闭 93），PR 更新 500 条（待合并 333、已合并/关闭 167），无新版本发布。讨论焦点高度集中在**会话状态可靠性（session-state）与静默失败**这一主题上——评论量 Top 3 的 Issue 全部与子代理结果丢失、transcript 投影活锁、跨通道消息重复相关。维护者（尤其 @steipete）今日提交了多个网关诊断、CI 修复与发布自动化 PR，显示团队正在为下一个版本做工程准备。但需要警惕：2026.8.1/8.2 升级引入的回归（P0 级 #135171 已关闭，P1 级 #135111、#136262 仍开放）尚未有修复版本兜底，且 Issue 新增速率约为关闭速率的 4.4 倍，积压压力持续上升。

---

## 2️⃣ 版本发布

**今日无新版本发布。**

值得关注：当前 `main` 分支存在多个针对 2026.8.x 回归的开放 Issue（见第 5 节），同时 Docker `:latest` 标签曾从 2026.7.1 回退至 2026.6.33 触发降级保护（[#112391](https://github.com/openclaw/openclaw/issues/112391)），分发链路的确定性受到影响。今日合并的 Linux 发布自动化 PR（[#138643](https://github.com/openclaw/openclaw/pull/138643)）与依赖刷新（[#138199](https://github.com/openclaw/openclaw/pull/138199)）表明团队在为下一次发布做铺垫。

---

## 3️⃣ 项目进展

今日 167 个 PR 合并/关闭，重点推进如下：

| PR | 内容 | 意义 |
|---|---|---|
| [#138201](https://github.com/openclaw/openclaw/pull/138201) ✅已关闭 | 未分类运行失败不再误报为 "provider/model request failed"（修复 [#137845](https://github.com/openclaw/openclaw/issues/137845)） | 修正错误归因，避免运维排查方向错误 |
| [#127873](https://github.com/openclaw/openclaw/pull/127873) ✅已关闭 | Android 端网关不可达时重连改为电池友好策略（修复 [#127872](https://github.com/openclaw/openclaw/issues/127872)） | 移动端后台耗电问题落地修复 |
| [#138628](https://github.com/openclaw/openclaw/pull/138628) ✅已关闭 | 内存重建索引时消除冗余缓存读取 | 本地嵌入场景 I/O 性能优化 |
| [#138636](https://github.com/openclaw/openclaw/pull/138636) ✅已关闭 | Workboard 列表查询从每行 1 次 SQLite 查询合并为单次 | 数据访问层结构化优化 |
| [#138559](https://github.com/openclaw/openclaw/pull/138559) ✅已关闭 | Control UI 多语言同步刷新 | 例行 i18n 维护 |

**等待审查的重要开放 PR**（多数已标记 "ready for maintainer look"）：

- [#138556](https://github.com/openclaw/openclaw/pull/138556)（XL）：Gateway 诊断服务（OTel）配置**热重载**，无需重启网关 — 运维体验重大改进
- [#137126](https://github.com/openclaw/openclaw/pull/137126)（P1）：Linux inotify 容量耗尽时内存监视降级为轮询，修复全量 `fs.watch` 失败（[#136966](https://github.com/openclaw/openclaw/issues/136966)）
- [#137184](https://github.com/openclaw/openclaw/pull/137184)：历史记录可一次装入摘要窗口时压缩（compaction）单趟完成，修复预算计算错误（[#110564](https://github.com/openclaw/openclaw/issues/110564)）
- [#138640](https://github.com/openclaw/openclaw/pull/138640)（P1）：Control UI 仪表盘实时画廊预览，含安全边界考量
- [#138645](https://github.com/openclaw/openclaw/pull/138645)：修复消息工具型群聊中合成占位消息破坏静默语义（关联已关闭的 [#137024](https://github.com/openclaw/openclaw/issues/137024)）

**整体评估**：今日进展集中在**可观测性、资源效率、错误归因**三条线，配合 5 个 CI/发布自动化 PR（[#138651](https://github.com/openclaw/openclaw/pull/138651)、[#138665](https://github.com/openclaw/openclaw/pull/138665)、[#138612](https://github.com/openclaw/openclaw/pull/138612) 等），项目工程成熟度稳步提升。

---

## 4️⃣ 社区热点

**🔥 讨论最活跃的 Issue：**

1. **[#44925](https://github.com/openclaw/openclaw/issues/44925)（26 评论，P1）**：子代理任务完成结果**静默丢失**——无重试、无通知、超时不自动重启。自 2026-03-13 挂起至今，是全库评论最多的 Issue。诉求核心：长时运行 Agent 任务需要**可观测的完成/失败闭环**，"静默失败"直接摧毁对编排能力的信任。

2. **[#22438](https://github.com/openclaw/openclaw/issues/22438)（17 评论，P2）**：分级 Bootstrap 文件加载提案——大工作区用户不满每个会话（含子代理与 cron 任务）都为从不引用的文件支付 token。已有关联 PR 开放，落地概率高。

3. **[#115908](https://github.com/openclaw/openclaw/issues/115908)（15 评论，P1）**：持续写入负载下 transcript 投影 reconcile **活锁**，同步重建路径阻塞主线程数十秒，冻结所有通道传输。直指核心架构问题：同步状态重建与事件循环的冲突。

4. **[#69208](https://github.com/openclaw/openclaw/issues/69208)（14 评论，P1，维护者伞形 Issue）**：跨通道（MSTeams/WebChat/Telegram/followup 队列）的**消息重复、重放、上下文组装错误**统一追踪。维护者主动建立伞形 Issue 归类散点 bug，是积极的信号。

5. **[#79902](https://github.com/openclaw/openclaw/issues/79902)（14 评论，P3）**：在数据库优先运行时之上暴露**SQLite transcript/session 接缝**——生态开发者希望构建伴生应用而不必逆向内部 blob 格式。反映社区对**稳定公共数据契约**的强烈需求。

6. **[#14785](https://github.com/openclaw/openclaw/issues/14785)（11 评论，P2）**：工具 JSON Schema 每会话固定消耗约 **3,500 token** 的"固定税"，用户对成本优化的诉求明确且量化。

**热点 PR**：[#138199](https://github.com/openclaw/openclaw/pull/138199)（20 个依赖七天冷却期后刷新）与 [#138372](https://github.com/openclaw/openclaw/pull/138372)（21 种原生语言 i18n 刷新，47 个新字符串）体现项目对供应链纪律与国际化投入。

---

## 5️⃣ Bug 与稳定性

按严重程度排列（🔴 P0 / 🟠 P1 / 🟡 P2）：

### 🔴 P0 级

| Issue | 状态 | 说明 | Fix PR |
|---|---|---|---|
| [#70903](https://github.com/openclaw/openclaw/issues/70903) | ⚠️ 开放且被标 stale | 供应商 402 计费恢复后，文件级 `disabledUntil` 冷却持续数小时封锁用户，跨重启持久化 | ❌ 无（被标记 stale，**需维护者立即复核**） |
| [#135171](https://github.com/openclaw/openclaw/issues/135171) | ✅ 今日关闭 | 2026.8.1/8.2 网关崩溃循环：捆绑 Perplexity 插件要求能力同意但无法检查/启用 | 已处理 |

### 🟠 P1 级（开放中）

**今日新增：**
- [#138272](https://github.com/openclaw/openclaw/issues/138272) 🆕：Android Talk 实时语音在任务型回合稳定报 "no live response owner" 掉线，**连续三个版本复现**（2026.7.1-2 → 8.2 → 9.1），❌ 无 fix PR
- [#137613](https://github.com/openclaw/openclaw/issues/137613)：CLI 后端预压缩记忆刷新被 `ownsNativeCompaction` 门控禁用，会话记忆在压缩前永久丢失，❌ 无 fix PR

**2026.8.x 回归（升级用户集中受影响）：**
- [#135111](https://github.com/openclaw/openclaw/issues/135111)：claude-sonnet-5 间歇性 "malformed JSON arguments" 失败，非工具特定，❌ 无 fix PR
- [#136262](https://github.com/openclaw/openclaw/issues/136262

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析

**报告日期：2026-09-05 ｜ 数据窗口：2026-09-04 过去 24 小时 ｜ 样本：OpenClaw、Hermes Agent**

> ⚠️ 数据说明：两个项目的 PR 更新量均触及 500 条/日的统计上限，横向比值计算基于截断数据，仅作方向性参考。

---

## 1️⃣ 生态全景

个人 AI 助手/自主智能体赛道已成为开源世界最活跃的板块之一——抽样两个项目的 Issue+PR 日更新量合计超过 1,800 条，双双触及统计上限。需求重心正从“能力演示”迁移至**运行可靠性**：两个项目当日最突出的缺陷主题高度趋同，均指向**会话状态管理与静默失败**。同时，全行业呈现“流入远超出清”的共同压力（新开与关闭比介于 4:1 至 13:1），工程消化能力普遍滞后于社区热情。两个项目均在为版本发布做工程铺垫（OpenClaw 的发布自动化 PR、Hermes 刚于 5 天前发布 v0.21.0），整体处于**规模化扩张与质量巩固并行**的张力期。

---

## 2️⃣ 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新量（24h） | 500（新开/活跃 407，关闭 93） | 339（新开/活跃 315，关闭 24） |
| Issue 关闭率 | **18.6%**

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-09-05 | 数据来源：github.com/NousResearch/hermes-agent**

---

## 1. 今日速览

项目处于**高活跃度、高吞吐、低出清**状态：过去 24 小时 Issues 更新 339 条（新开/活跃 315，仅关闭 24）、PR 更新 500 条（待合并 454，合并/关闭 46），无新版本发布（上一个版本 v0.21.0 发布于 2026.8.31，已 5 天）。今日最突出的信号是**三条同日新报的 P1 级 Bug**（state.db 结构性损坏 #102827、Desktop SSH 全量 401 回归 #102930、systemd 249 cron 派发 fail-closed #102486），其中 #102930 已有当日修复 PR #102948 响应，响应速度值得肯定。从标签分布看，`sweeper:risk-session-state` 是贯穿绝大多数缺陷的核心风险主题——会话状态管理仍是当前最大的稳定性短板。Issue 关闭率约 7.1%、PR 积压 454 条，维护出清速度明显跟不上流入速度，需警惕积压持续膨胀。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

过去 24 小时共 46 个 PR 被合并/关闭，但数据中可见的已关闭 PR 有限，今日推进主要体现在**高价值修复与安全 PR 的集中提交**上：

**安全修复（重点）**
- [#103233](https://github.com/NousResearch/hermes-agent/pull/103233) 修复 Desktop `setWindowOpenHandler` 安全缺陷（GHSA-9f4c-93c8-jc8

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*