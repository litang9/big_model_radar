# OpenClaw 生态日报 2026-09-10

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-09 22:32 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 · 2026-09-10

> 数据来源：GitHub 过去 24 小时窗口 | [openclaw/openclaw](https://github.com/openclaw/openclaw)

---

## 1. 今日速览

- **活跃度：极高。** 过去 24 小时 Issues 更新 500 条（新开/活跃 306，关闭 194，关闭占比约 38.8%），PR 更新 500 条（待合并 255，合并/关闭 245）。以单日体量衡量，OpenClaw 处于一线热门开源项目水准，且维护者响应节奏跟得上社区输入。
- **无新版本发布**，但主线正处于 **2026.9.x 快速迭代与修复期**：今日关闭了多个高热度 P0/P1（Windows 网关无法启动、npm 更新卡死、Telegram 内部上下文泄漏等），同时 2026.9.3 上又出现新的泄漏类报告（[#143278](https://github.com/openclaw/openclaw/issues/143278)），修复-回归循环仍在持续。
- **四大主线并行**：① 升级/更新可靠性（checkpoint 恢复机制）；② 长时运行网关的资源卫生（僵尸进程、磁盘增长）；③ 内部上下文泄漏到聊天渠道；④ ClawHub 插件市场与云端 Workers 复用的平台化建设。
- **维护者投入显著**：@steipete 单日提交多个 XL 级修复/特性 PR；@Patrick-Erichsen 的 ClawHub UI 系列稳步推进。
- **流程特色**：项目大量使用 "ClawSweeper" 自动化分诊体系（issue 评级、fix 排队、automerge），并有带赏金的机器人修复 PR（如 [#138679](https://github.com/openclaw/openclaw/pull/138679)），AI 辅助维护已成为项目工作流的组成部分。

---

## 2. 版本发布

过去 24 小时**无新版本发布**（Releases 为 0）。当前最新版本为 2026.9.3（由 [#143278](https://github.com/openclaw/openclaw/issues/143278) 报告环境可知），主线处于密集修复窗口，预计下一版本将以稳定性修复为主。

---

## 3. 项目进展

24 小时内 245 个 PR 合并/关闭。从高热度 PR 窗口看，项目在**稳定性修复**与**平台能力建设**两条线上同时推进：

**升级与认证可靠性（针对近期连环回归）**
- [#140339](https://github.com/openclaw/openclaw/pull/140339) `feat(update): integrate checkpoints and interrupted-update recovery`（XL, P2）：为中断/失败更新引入检查点与恢复机制，直接对症 [#141617](https://github.com/openclaw/openclaw/issues/141617)（更新永久卡在 running，已关闭）和 [#139714](https://github.com/openclaw/openclaw/issues/139714)（`update_runs` 永不终结）这一类问题。当前状态 "needs proof"，是本周期最重要的工程投入之一。
- [#143310](https://github.com/openclaw/openclaw/pull/143310) `fix(auth): scope the legacy auth-profile migration refusal to affected providers`（P1，待维护者复核）：修复升级后**所有**提供商认证被一个空的 SQLite auth store + legacy JSON 误伤的问题（[#143173](https://github.com/openclaw/openclaw/issues/143173)）。

**网关与会话性能**
- [#143434](https://github.com/openclaw/openclaw/pull/143434) `fix(sessions): keep cold prepared updates responsive`（XL，待复核）：避免在 Gateway 线程上执行全量数据库完整性校验，与 [#119720](https://github.com/openclaw/openclaw/issues/119720)（事件循环阻塞）的持续修复线呼应。
- [#143433](https://github.com/openclaw/openclaw/pull/143433) `fix(heartbeat): isolated heartbeat runs leak bundle MCP child processes`（P1，今日新开）：隔离心跳运行不再累积 MCP 子进程，是 [#97616](https://github.com/openclaw/openclaw/issues/97616) 僵尸进程大类下的具体收口。

**平台能力（路线图信号明显）**
- 云端 Workers 复用栈：[#143227](https://github.com/openclaw/openclaw/pull/143227)（跨云会话复用项目 setup，待复核）+ [#143410](https://github.com/openclaw/openclaw/pull/143410)（复用已准备的公开 GitHub 仓库）——降低云会话成本的方向已成型。
- ClawHub 插件市场系列（@Patrick-Erichsen）：[#137659](https://github.com/openclaw/openclaw/pull/137659)（目录补全）、[#137886](https://github.com/openclaw/openclaw/pull/137886)（Control UI 内一键安装插件）、[#139042](https://github.com/openclaw/openclaw/pull/139042)（发现入口）、[#142713](https://github.com/openclaw/openclaw/pull/142713)（统一详情页）、[#142712](https://github.com/openclaw/openclaw/pull/142712)（分类分组）——插件市场 UX

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告

**报告日期**：2026-09-10 | **数据范围**：GitHub 过去 24 小时窗口

> ⚠️ **数据完整性说明**：本次样本包含 2 个项目。OpenClaw 日报数据完整（活跃度、主题、PR 明细、版本状态）；Hermes Agent 日报仅有活跃度计数，**缺少主题、版本发布与维护动态**。涉及 Hermes 的定性结论已相应收敛，标注“数据不足”处不建议作为决策依据。

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道头部项目单日社区事件量已接近千级（OpenClaw 1000 条、Hermes Agent 898 条），处于高热度快速迭代期。以 OpenClaw 为代表，议题重心已从“功能可用”转向“运行可靠”——更新恢复、长时运行资源卫生、上下文安全成为主要工程投入方向。同时，插件市场与云会话复用等平台化布局显示头部项目正从单体工具向平台生态演进。值得注意的是，AI 辅助维护（自动分诊、automerge、带赏金机器人 PR）已进入核心工作流，“用智能体维护智能体项目”正在成为生态标配。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 新开/活跃 | 306 | 262 |
| Issues 关闭 | 194 | 136 |
| **Issue 关闭率** | **38.8%** | **34.2%** |
| Issue 新增：关闭比 | 1.58 : 1 | 1

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报

**日期：2026-09-10** | 数据来源：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) 过去 24 小时 GitHub 活动

---

## 1. 今日速览

过去 24 小时项目共产生 **898 条 Issue/PR 活动事件**（Issues 398 条：262 新开/活跃、136 关闭；PRs 500 条：304 待合并、196 已合并/关闭），

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*