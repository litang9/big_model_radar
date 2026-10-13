# OpenClaw 生态日报 2026-10-14

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-13 23:43 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-14

## 1. 今日速览

OpenClaw 今日保持高度活跃：过去 24 小时 Issues 更新 500 条（新开/活跃 294，关闭 206），PR 更新 500 条（待合并 295，已合并/关闭 205），整体处理吞吐量与新增量基本持平，社区健康度良好。项目于近日发布 2 个版本（`v2026.10.5-beta.3` 与 `v2026.10.3`），迭代节奏紧凑。社区讨论焦点集中在**会话状态管理、更新器可靠性、SQLite/性能问题**三大方向；同时 @steipete 等核心贡献者密集提交了多个大型性能优化 PR，显示项目正进入一轮系统性的 SQLite / 会话管线性能重构期。

## 2. 版本发布

### v2026.10.3（稳定版）
- 90 commits · 79 pull requests · 99 contributors，是一个大规模聚合版本。
- 详细 Release notes 见 [docs.openclaw.ai/releases](https://docs.openclaw.ai/releases/2026.)（链接因数据截断不完整）。

### v2026.10.5-beta.3（Beta）
- **Highlights：更新过程不再终止 Gateway** —— pnpm 12 安装在更新时保留 Gateway 服务和 `openclaw` 启动器于持久安装路径；Windows 更新接受带限定符的 Scheduled Task 账户及其自验证驱动；macOS 接受受保护的 Bun 服务配置。
- 该版本明显是针对近期大量**更新器失败反馈**（见第 5 节）的修复迭代，beta.1 → beta.2 → beta.3 一日多次滚动，说明更新链路仍是当前最活跃的修复战场。
- ⚠️ 迁移注意：beta 用户升级路径中仍有已知问题（#170331、#170332，见下文），建议生产环境暂留 2026.10.3。

## 3. 项目进展

今日 PR 活动以**性能优化系列**为主导（多为 @steipete 提交的 size L/XL 级 PR），系统性削减 SQLite 冗余读写：

- [#171405](https://github.com/openclaw/openclaw/pull/171405) `perf(sqlite): remove redundant cold validation setup` — 首轮对话窗口从 1,105 条 SQL 语句 / 163 次 worker 请求显著降低。
- [#171449](https://github.com/openclaw/openclaw/pull/171449) `perf(sessions): avoid repeated transcript backfills and cron scans` — 消除 Gateway 重启后的重复 transcript 回填。
- [#171211](https://github.com/openclaw/openclaw/pull/171211)、[#171450](https://github.com/openclaw/openclaw/pull/171450)、[#171448](https://github.com/openclaw/openclaw/pull/171448)、[#171455](https://github.com/openclaw/openclaw/pull/171455) — 会话维护、warmed turn reader、status 元数据批量读取等系列优化。
- [#171458](https://github.com/openclaw/openclaw/pull/171458) `perf(clickclack)` — 绑定消息守卫去除热路径 SQL。
- [#170657](https://github.com/openclaw/openclaw/pull/170657) `perf(sqlite): transfer lexical maintenance authority` — 为后续 admission-service 架构切换铺路，属于架构级前置。
- [#171443](https://github.com/openclaw/openclaw/pull/171443) `feat(sdk)` — 补齐 SQLite 异步迁移路径的公开 awaited API，降低插件作者迁移成本。

功能与修复方面：
- [#171412](https://github.com/openclaw/openclaw/pull/171412) Telegram Manager Bot 按用户供应 OpenClaw 实例（OP-167），含 MTProto 托管机器人创建，是今日最大的新功能 PR。
- [#171361](https://github.com/openclaw/openclaw/pull/171361) 修复长流式回复每个 delta 全量重扫描导致的主线程 CPU 占用（#167054 回归）。
- [#171417](https://github.com/openclaw/openclaw/pull/171417) 修复 Telegram 流式回复在预览可见后每 delta 重新 sanitize 整条回复。
- [#171447](https://github.com/openclaw/openclaw/pull/171447) 修复 ACP-only 会话 store 在慢启动后持续降级。
- [#171425](https://github.com/openclaw/openclaw/pull/171425)（已关闭）为隔离补全预算预留 adaptive thinking tokens，修复 `session-observer` 类小预算调用在 Claude 5.5 系列模型上的失败。

**整体评估**：今日活动显示项目在“性能基建 + 更新器稳定化 + Telegram 体验”三条线同步推进，单日 295 个待合并 PR 的处理能力表明维护力量充足。

## 4. 社区热点

| Issue | 评论 | 核心诉求 |
|---|---|---|
| [#159356](https://github.com/openclaw/openclaw/issues/159356) llama.cpp manager 误报 ready，embedding 请求 HTTP 500 | 26 | 本地 llama.cpp 集成在低内存（4GB→8GB 后恢复）下的 OOM/崩溃循环诊断，用户在 issue 中持续追加运维取证，等待维护者定性 |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) 2026.9.4 回归：同会话第二个 run 顶掉在途 turn，回复丢失 | 19 | **消息丢失**类 P1，标记 needs-product-decision，用户要求补齐重试/部分交付机制 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616)（已关闭）hook/tool 子进程僵尸累积 | 19 | 长期运行进程卫生问题，关闭说明已修复，社区持续确认中 |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) google-vertex/gemini-3.1-pro "Cannot convert undefined or null to object" | 18 | **P0 + ux-release-blocker**，3 月至今仍 OPEN，Vertex 用户持续追加复现信息，是积压最久的严重回归 |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) memory-core SQLite 无限增长填满磁盘 | 17 | 生产部署的磁盘安全诉求，与今日多个 SQLite 性能 PR 主题呼应 |

**背后诉求**：讨论最热的 issue 集中于“**长时运行的可靠性**”（进程僵尸、磁盘增长、崩溃循环）和“**消息不丢**”（turn 被顶掉、Telegram 死信），反映 OpenClaw 用户已大量进入 7×24 生产化使用阶段。

## 5. Bug 与稳定性（按严重程度）

### P0（含 ux-release-blocker）
1. [#38327](https://github.com/openclaw/openclaw/issues/38327) — 2026.3.2 起 google-vertex/gemini-3.1-pro 全量消息失败。**无 fix PR**，3 月至今。
2. [#156112](https://github.com/openclaw/openclaw/issues/156112) — `openclaw update` 在 npm 全局安装上确定性地卡在 global install swap，直接 `npm install -g` 则 13 秒成功。**无 fix PR**。
3. [#166221](https://github.com/openclaw/openclaw/issues/166221) — 2026.9.4→9.8 更新在 SQLite preflight/候选快照阶段崩溃。**无 fix PR**，#170331/#170332 显示 beta.2 仍有同族问题。
4. [#158390](https://github.com/openclaw/openclaw/issues/158390) — `plugin-captures` 临时目录永不 GC，磁盘无限增长。**无 fix PR**。
5. [#161921](https://github.com/openclaw/openclaw/issues/161921) — `doctor --fix` 与 `plugins update` 互相阻塞，插件卡在旧版本。**无 fix PR**。
6. [#160060](https://github.com/openclaw/openclaw/issues/160060) — Windows 待机恢复后 ~54 分钟 Gateway 静默死亡，supervisor 无动作。**无 fix PR**。
7. [#167557](https://github.com/openclaw/openclaw/issues/167557) — 插件数据迁移死锁不收敛（"managed handoff lease database identity changed"）。
8. [#161436](https://github.com/openclaw/openclaw/issues/161436) — **安全相关**：cloud worker 的本地工具调用绕过 `before_tool_call`，策略插件无法防护。
9. [#137085](https://github.com/openclaw/openclaw/issues/137085) — macOS App 8.2 升级后设备身份卡在 "native-importing"，握手超时。
10. [#170212](https://github.com/openclaw/openclaw/issues/170212) — Telegram /update 失败后 systemd 服务被 SIGKILL，离线至手动恢复。
11. [#170724](https://github.com/openclaw/openclaw/issues/170724)（已关闭）— macOS 2026.10.2 Retry setup 无效果，与 beta.3 的 release note 直接对应，**大概率已在 beta.3 修复**。

### P1 关键项
- [#154572](https://github.com/openclaw/openclaw/issues/154572) claude-cli 子会话 spawn 必现 `SessionTranscriptWriterClaimReboundError`。
- [#155859](https://github.com/openclaw/openclaw/issues/155859) Gateway 启动时间随插件数量线性放大（120s 预算被 discord/codex/weixin 占满）。
- [#161379](https://github.com/openclaw/openclaw/issues/161379) 模型目录刷新循环钉死一个 CPU 核。
- [#163029](https://github.com/openclaw/openclaw/issues/163029) 外部插件 mid-turn 重载导致 40–70s 主线程停顿，#160658 修复后仍复现。
- [#144291](https://github.com/openclaw/openclaw/issues/144291) 配置热重载中止所有在途 agent turn。
- [#164294](https://github.com/openclaw/openclaw/issues/164294) Gateway 状态库 WAL checkpoint 被进程内 reader 永久阻塞（17,091 frames 积压）——与 #164442 PR 直接相关，**已有 fix PR**。
- [#101929](https://github.com/openclaw/openclaw/issues/101929) 上下文预检估算偏高 2.3–2.6x —— **已由 [#168338](https://github.com/openclaw/openclaw/pull/168338) 合并修复**（10 月 13 日更新确认）。

## 6. 功能请求与路线图信号

- **Telegram Manager Bot / 按用户实例供应**（[#171412](https://github.com/openclaw/openclaw/pull/171412)）— 已有大型实现 PR，多渠道自助部署方向明确，预计进入后续版本。
- **Databricks Unity Gateway 官方 Provider**（Issue [#155633](https://github.com/openclaw/openclaw/issues/155633) + PR [#155634](https://github.com/openclaw/openclaw/pull/155634)）— issue+PR 成对、以外部分布式插件形式实现，进入审查后有望落地。
- **WebChat 自托管 STT/TTS**（[#45508](https://github.com/openclaw/openclaw/issues/45508)，已关闭）— 语音能力走网关而非浏览器 API，自托管人群长期诉求，关闭状态或意味着已有处理路径。
- **Discord 线程 AI 自动命名**（PR [#171389](https://github.com/openclaw/openclaw/pull/171389)、[#160873](https://github.com/openclaw/openclaw/pull/171873)）— 两版迭代中，接近合并。
- **沙箱代理开放 skill_workshop**（[#91676](https://github.com/openclaw/openclaw/issues/91676)）— opt-in 安全设计讨论中，needs-security-review。
- **Control UI 插件标签页固定**（[#111143](https://github.com/openclaw/openclaw/issues/111143)）— UX 打磨类，优先级 P3。

**路线图信号**：大量 `perf(sqlite)` / `perf(sessions)` XL 级 PR + SDK 异步迁移补齐（#171443），表明下一周期主线是**数据层性能与架构收敛**；beta.3 的 release note 表明**更新器可靠性**是当前发布工程的最高优先级。

## 7. 用户反馈摘要

- **满意点**：版本迭代快、issue 响应后修复扎实（如 #101929 用户主动在 issue 内确认修复已合并 main）；ClawSweeper 机器人的分级标签（P0–P3、impact 标签、issue-rating）被用户认可为高质量 triage。
- **主要痛点**：
  - **升级即事故**是最高频抱怨：npm 全局更新失败、状态库迁移死锁、`doctor --fix` 循环依赖（#156112、#166221、#161921、#169953、#170331）——多位用户表示“手动 `npm install -g` 反而能成功”。
  - **消息静默丢失**：Telegram 死信（#125764）、turn 被顶掉（#148707）、子代理结果以原始 worker 输出投递给用户（#90840）伤害信任。
  - **长时运行退化**：僵尸进程（#97616）、磁盘增长（#114612、#158390）、CPU 钉死（#161379）——多来自 7×24 部署的自托管用户。
  - **多渠道路由细节**：Telegram 流式预览截断残留（#169930）、Slack 静默配置不生效（#164877）等体验类问题持续产生。
- **典型场景**：Docker/K8s + systemd 部署、Telegram/Slack/Discord 多渠道接入、claude-cli/Codex 子代理编排、小内存主机跑本地 llama.cpp。

## 8. 待处理积压（维护者关注建议）

| Issue | 开放时长 | 状态 | 关注理由 |
|---|---|---|---|
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | 7+ 个月 | P0，无 fix PR | Vertex 用户完全不可用，最久的 release-blocker |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | ~3 个月 | P1，needs-maintainer-review | memory-core 磁盘填充，生产风险 |
| [#90840](https://github.com/openclaw/openclaw/issues/90840) | 4+ 个月 | P1 + 安全标签 | 子代理原始输出泄漏到聊天用户 |
| [#161436](https://github.com/openclaw/openclaw/issues/161436) | ~2 周 | P0 安全 | cloud worker 绕过策略钩子 |
| [#148308](https://github.com/openclaw/openclaw/issues/148308) | ~1 个月 | P1 | Tailscale serve 断连后不重新认领，远程访问静默失效 |
| [#160060](https://github.com/openclaw/openclaw/issues/160060) | ~2 周 | P0 | Windows 静默死亡无任何取证 |
| PR [#160549](https://github.com/openclaw/openclaw/pull/160549) | 2 周+ | ready for maintainer look，标 compatibility 风险 | worktree 绑定保留修复，等待审查 |
| PR [#158087](https://github.com/openclaw/openclaw/pull/158087) | 3 周 | ready for maintainer look | QA Lab 关闭竞态，安全敏感 |
| PR [#169385](https://github.com/openclaw/openclaw/pull/169385) | — | ready for maintainer look | CUA 会话过期后计算机控制失效 |

**建议**：更新器 P0 簇（#156112/#166221/#161921/#167557）建议合并追踪为单一 epic，配合 beta.3→正式版的验证窗口集中收敛；#161436 的安全旁路应优先安排 security review。

---
*数据来源：GitHub API（Issues/PR Releases），统计窗口 2026-10-13 至 2026-10-14。*

---

## 横向生态对比

# 开源个人 AI 助手/智能体生态横向对比报告
**数据窗口：2026-10-13 至 2026-10-14**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已从“Demo 阶段”全面进入**生产化部署阶段**：用户的核心诉求从“能不能跑”转向“7×24 长时运行可靠性、更新安全性、消息投递可信度”。两个头部项目（OpenClaw、Hermes Agent）日均 Issue/PR 活动均在 800+ 条量级，社区贡献涌入速度普遍快于维护者评审带宽，PR 积压成为共性挑战。技术路线上，**Gateway 统一会话架构、SQLite/数据层性能重构、多渠道消息接入（Telegram/Discord/微信/Slack）** 是当前两大项目不约而同推进的主线。部署环境的碎片化（Windows、Termux、ARM 小内存、Docker/K8s、systemd）显著扩大了兼容性测试矩阵，成为最大的 Bug 来源。

---

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 294，关闭 206） | 370（新开/活跃 302，关闭 68） |
| PR 更新（24h） | 500（待合并 295，合并/关闭 205） | 500（待合并 **419**，合并/关闭 81） |
| Issue 关闭率 | ~41% | ~18% |
| PR 消化率 | ~41% | ~16% |
| Release | 2 个（v2026.10.3 稳定版 + v2026.10.5-beta.3） | 0（近期无 Release） |
| 架构级大 PR | 多个 perf(sqlite) XL 系列（@steipete） | #106742 统一 gateway 会话（teknium1，评审中） |
| 健康度 | 活跃 ⭐⭐⭐⭐⭐ / 治理 ⭐⭐⭐⭐ | 活跃 ⭐⭐⭐⭐⭐ / 治理 ⭐⭐ |

**结论**：OpenClaw 处于“高活跃 + 高吞吐”的平衡态；Hermes Agent 社区热度极高但评审带宽明显不足，419 条待合并 PR 与 1000+ 开放 Issue 构成治理风险。

---

## 3. OpenClaw 在生态中的定位

**优势**：
- **发布工程成熟度领先**：稳定版 + beta 一日多次滚动（beta.1→beta.3），有明确的 release-blocker 分级（P0–P3 + ux-release-blocker 标签）和 ClawSweeper 自动化 triage 机器人，用户认可度高。
- **性能基建投入系统化**：单日多个 XL 级 SQLite/会话管线 PR，且含架构级前置（#170657 admission-service 铺路），显示有规划的重构而非救火式修补。
- **社区规模与贡献者基数更大**：单版本 99 contributors、90 commits 的聚合能力。
- **吞吐能力**：295 待合并 PR 与新增量基本持平，说明维护力量充足。

**相对短板**：
- **更新器是最大信誉风险**：P0 簇（#156112/#166221/#161921/#167557）长期无 fix PR，“升级即事故”是最高频抱怨，甚至出现“beta.3 仍在修同族问题”的滚动修复循环。
- 最久 release-blocker #38327（Vertex 用户全量不可用）挂起 7+ 个月。

**技术路线差异**：OpenClaw 用 pnpm/Bun/SQLite 技术栈，主打跨平台原生安装与多渠道接入；Hermes Agent 是 Python 生态（venv/py3.14），社区贡献驱动修 bug、核心团队推架构（统一 gateway）。OpenClaw 更偏“产品化平台”，Hermes 更偏“研究机构主导 + 社区共建”。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw 证据 | Hermes Agent 证据 |
|---|---|---|
| **统一 Gateway 会话架构** | admission-service 架构切换（#170657）、Gateway 生命周期系列修复 | #106742 "One gateway owns every local session"（核心团队主导） |
| **更新器/安装可靠性** | beta.3 专题修复 + 5 个 P0 无 fix PR | P1 #122529 cron worker venv 污染、#135037 Windows PATH 污染、#127387 旧 venv 遮蔽 |
| **消息投递可靠性（多渠道）** | Telegram 死信 #125764、turn 被顶掉 #148707、Slack 配置 #164877 | Telegram 话题误路由 #136567、微信限流静默丢弃 #94146 |
| **长会话/上下文保真** | transcript 回填优化 #171449、压缩与上下文预检 #101929（已修） | 压缩阈值错误 #136350、memory 上限 #5320、reasoning 回退 #138085 |
| **长时运行资源卫生** | 僵尸进程 #97616、磁盘无限增长 #114612/#158390、CPU 钉死 #161379 | browser_harness 守护进程残留 #121095 |
| **Telegram 深度集成** | Manager Bot 按用户供应实例 #171412、流式预览修复 | 论坛主题路由、Termux 移动端部署需求（38 评论） |

**共性洞察**：这六个方向几乎是两张 issue 列表的镜像，说明这是个人 AI 助手品类的**共性工程瓶颈**，而非单项目的实现缺陷。

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道接入（TG/Slack/Discord/微信/ACP）、Control UI、插件生态、CUA 计算机控制 | CLI/TUI/Desktop 多前端、MCP 工具链、远程 Agent + 本地执行（呼声最高 👍40）、subagent 编排 |
| 目标用户 | 7×24 生产化自托管用户（Docker/K8s/systemd、多渠道运营者） | 部署环境高度碎片化的个人用户与极客（Termux、Windows、ARM 小内存） |
| 技术架构 | Node/Bun + SQLite + Gateway + supervisor，插件化 + SDK 公开迁移 API | Python + gateway + cron worker + 桌面端，社区插件目录 + i18n 扩张 |
| 治理模式 | 机器人 triage + 分级标签体系，维护吞吐高 | 核心成员（teknium1）主导架构，社区修 bug，评审瓶颈明显 |
| 风险面 | 更新链路、安全旁路（#161436 策略钩子绕过） | 安装兼容性、依赖 CVE（multidict）、贡献者权限纠纷（#131859） |

---

## 6. 社区热度与成熟度

- **快速迭代 + 质量巩固并行（OpenClaw）**：双版本节奏 + 系统性性能重构，处于“规模化后收敛数据层”的巩固期；但更新器 P0 簇未收敛说明发布工程仍是短板。
- **高速增长 + 治理承压（Hermes Agent）**：新开 Issue 302/日但仅关闭 68，PR 积压 419 条含数周高价值修复（TTS #119787、CVE 升级 #135817）——典型的高热低吞吐，需机制性提升评审带宽，否则将出现贡献者流失。
- **成熟度信号对比**：OpenClaw 用户已在讨论 K8s 生产部署与磁盘安全；Hermes 用户仍在解决“能不能装上”（Termux/venv/PATH）——两者用户成熟度相差约一个阶段。

---

## 7. 值得关注的趋势信号

1. **“静默失败”是信任杀手**：两项目用户均明确表达“宁可报错也不要安静地不工作”（Langfuse key、微信丢弃、消息丢失）。对开发者的启示：**可观测性与显式失败应作为智能体系统的一级设计目标**。
2. **Gateway 统一会话成为架构共识**：两大项目独立收敛到同一方向（单 gateway 管辖所有前端会话），预示这将成为智能体运行时的标准形态——做多前端智能体应尽早对齐此模式。
3. **更新器是被低估的产品组件**：升级失败占比最高的 P0 簇。智能体应用状态重、迁移复杂，**原子化更新 + 状态库迁移安全**值得专项投入。
4. **消息投递语义需要产品级设计**：重试、部分交付、死信队列（OpenClaw #148707 明确标记 needs-product-decision）——AI 回复不应比传统消息队列的可靠性保证更弱。
5. **安全边界前移**：策略钩子被绕过（#161436）、子代理原始输出泄漏（#90840）提示：随着智能体获得工具与计算机控制能力，**策略执行点必须下沉到工具调用层**，而非依赖上层钩子。
6. **部署碎片化即市场信号**：Termux/ARM/Windows 需求旺盛表明个人智能体的真实用户画像远比“标准 Linux 开发者”宽——安装路径的兼容性投入有直接的用户增长回报。

---
*数据来源：两项目 2026-10-14 GitHub API 动态摘要；健康度评分为基于 24h 窗口吞吐数据的相对评估。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-14

## 1. 今日速览

Hermes Agent 过去 24 小时继续保持高活跃度：Issues 更新 370 条（新开/活跃 302，关闭 68），PR 更新 500 条（待合并 419，已合并/关闭 81），无新版本发布。社区贡献热度显著高于 Issue 关闭速度，待合并 PR 积压达 419 条，反映出外部贡献涌入速度快于维护者评审节奏。今日新增 PR 聚焦于工具错误语义修正、gateway 竞态修复和 Docker/Desktop 部署边界问题，整体呈现“社区驱动修 bug、核心团队推进架构级重构”的格局。安装/更新兼容性（cron worker、venv 污染、Windows PATH）仍是 Bug 重灾区。

## 2. 版本发布

过去 24 小时无新版本发布，最近无 Release 记录。

## 3. 项目进展

今日合并/关闭 PR 共 81 条，代表性进展：

- **[#98933](https://github.com/NousResearch/hermes-agent/pull/98933)（已关闭）** — Desktop 新增巴西葡萄牙语 UI locale，补齐 CLI 已有 `pt.yaml` 但桌面端缺失的国际化缺口，配合今日的 [#138058](https://github.com/NousResearch/hermes-agent/pull/138058) pt-br 语言包插件目录条目，i18n 覆盖持续推进。
- **[#52389](https://github.com/NousResearch/hermes-agent/issues/52389) / [#51399](https://github.com/NousResearch/hermes-agent/issues/51399)（已关闭，标记 duplicate）** — Langfuse 占位 API key 静默失败问题经重复报告后收敛处理，观测性插件的可诊断性得到关注。
- **进行中的大型架构 PR [#106742](https://github.com/NousResearch/hermes-agent/pull/106742)（teknium1，核心成员）** — "One gateway owns every local session"：CLI/TUI/Desktop/API/ACP/bot/cron 统一挂载到单一 gateway 活跃会话，是本周最重的架构级变更，仍在评审（ci-reviewed、needs-decision）。
- 今日新开修复 PR 密集覆盖：read_file 权限错误语义（[#138095](https://github.com/NousResearch/hermes-agent/pull/138095)、[#138096](https://github.com/NousResearch/hermes-agent/pull/138096)）、gateway 重连竞态（[#138089](https://github.com/NousResearch/hermes-agent/pull/138089)，P1）、Docker 锁定部署 cwd 边界（[#138091](https://github.com/NousResearch/hermes-agent/pull/138091)、[#138092](https://github.com/NousResearch/hermes-agent/pull/138092)）、reasoning_config 快照恢复（[#138085](https://github.com/NousResearch/hermes-agent/pull/138085)）。

## 4. 社区热点

- **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（36 评论，OPEN，blocked）** — @kuehnberger 无法通过 API 向本仓库开 PR（CreatePullRequest 权限错误），fork PR 和 issue 创建正常。贡献者权限纠纷，影响外部协作通道。
- **[#2825](https://github.com/NousResearch/hermes-agent/issues/2825)（38 评论，已关闭）** — Termux/proot Ubuntu 安装问题，移动端部署需求持续旺盛；今日 [#138087](https://github.com/NousResearch/hermes-agent/pull/138087) 补齐 Termux 包缺失的 MCP SDK。
- **[#122222](https://github.com/NousResearch/hermes-agent/issues/122222)（34 评论，已关闭）+ [#122529](https://github.com/NousResearch/hermes-agent/issues/122529)（15 评论，OPEN）** — cron 外部 worker 在自管安装上因 PYTHONPATH 缺失 venv site-packages 导致所有定时任务失败的 P1 问题，相关讨论热度高。
- **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)（27 评论，👍 40）** — "远程 Agent + 本地工具执行"是最高赞的功能诉求，多机协作场景需求强烈。
- **[#136567](https://github.com/NousResearch/hermes-agent/issues/136567)（19 评论）** — Telegram 论坛主题消息被 lobby 恢复逻辑错误路由，影响消息投递可靠性。
- **[#17565](https://github.com/NousResearch/hermes-agent/issues/17565)（12 评论，👍 17）** — 请求暴露 temperature 配置，硬编码导致幻觉问题，用户呼声高。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | Fix PR |
|---|---|---|---|
| P1 | [#122222](https://github.com/NousResearch/hermes-agent/issues/122222)（已关闭）/ [#122529](https://github.com/NousResearch/hermes-agent/issues/122529) | cron 外部 worker 依赖导入失败，自管安装定时任务全灭 | 未见明确 fix PR |
| P1 | [#135037](https://github.com/NousResearch/hermes-agent/issues/135037) | Windows 更新将沙箱/外部 checkout 的 bin 目录写入共享 HKCU Path，污染主机环境 | 无 |
| P1（PR） | [#138089](https://github.com/NousResearch/hermes-agent/pull/138089) | gateway 启动竞态：双 reconnect watcher + 残留 adapter | 该 PR 即修复，待评审 |
| P2 | [#124794](https://github.com/NousResearch/hermes-agent/issues/124794) | tree:0 partial clone + git<2.44 下 updater 递归 fetch 进程树失控，8GB ARM 机器耗尽 swap、负载 49 | 无 |
| P2 | [#131375](https://github.com/NousResearch/hermes-agent/issues/131375) | smart-approval guardian 在 event-loop 线程崩溃，Desktop 会话所有标记命令都升级到人工审批 | 无 |
| P2 | [#127387](https://github.com/NousResearch/hermes-agent/issues/127387) | 旧 py3.11 venv 遮蔽 bundled py3.14 的 rpds，所有 outputSchema MCP 工具失败且重启不愈 | 无 |
| P2 | [#94146](https://github.com/NousResearch/hermes-agent/issues/94146)（blocked） | 微信（企业微信）限流事件后实时回复静默丢弃 | 无 |
| P2 | [#122160](https://github.com/NousResearch/hermes-agent/issues/122160) | 外部进程导入 hermes_cli 触发 bootstrap re-exec，破坏 hermes-webui 启动 | 无 |
| P2 | [#136350](https://github.com/NousResearch/hermes-agent/issues/136350) | 压缩阈值实际解析为 256000 与文档 null 不符，长会话反复压缩丢失上下文 | 无 |
| P3 | [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) | browser_exec 残留 browser_harness 守护进程，永不退出 | 无 |
| P3（安全） | [#129426](https://github.com/NousResearch/hermes-agent/issues/129426) / [#135817](https://github.com/NousResearch/hermes-agent/pull/135817) | npm audit 新 advisory 超出现有修复目标；multidict CVE-2026-104874 升级 PR 待合并 | [#135817](https://github.com/NousResearch/hermes-agent/pull/135817) |

**观察**：安装/更新（area/install-update）+ 兼容性（risk-compatibility）标签的 P1/P2 Bug 数量最多，是当前稳定性最大风险面；多数尚无对应 fix PR。

## 6. 功能请求与路线图信号

- **统一 gateway 会话（[#106742](https://github.com/NousResearch/hermes-agent/pull/106742)）** — 核心团队主导，覆盖几乎全部组件标签，最可能进入下一大版本，将根本改变多前端会话模型。
- **远程 Agent + 本地工具执行（[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)，👍 40）** — 长期 OPEN、needs-decision，与 #106742 的 gateway 架构方向契合，落地可能性上升。
- **subagent_lifecycle v1.1（[#133212](https://github.com/NousResearch/hermes-agent/issues/133212)）** — 插件编排器的子代理转向/隔离传输/后续跟进，插件生态深化信号。
- **memory_char_limit 自适应（[#5320](https://github.com/NousResearch/hermes-agent/issues/5320)）** — 长会话内存压力问题反复出现（与 #136350 压缩问题同源），有望排期。
- **Desktop 会话可见性/通知（[#50718](https://github.com/NousResearch/hermes-agent/issues/50718)）** — 未读标记、需输入提示、OS badge，桌面端体验迭代方向。
- **temperature 可配置（[#17565](https://github.com/NousResearch/hermes-agent/issues/17565)，👍 17）** — 呼声高、实现成本低，值得维护者尽快决策。
- **TTS 隔离推理文本（[#119787](https://github.com/NousResearch/hermes-agent/pull/119787)）** — 已有实现 PR 待合并。

## 7. 用户反馈摘要

- **部署环境碎片化是最大痛点**：Termux、Windows job object、Docker 锁定目录、ARM 小内存机器、自管 shell 安装等场景均出现专属 Bug，说明用户群远超"标准 Linux/macOS"画像。
- **静默失败不受待见**：Langfuse 占位 key 无任何报错（#52389）、微信回复静默丢弃（#94146）、Slack 状态指示器静默消失（[#110374](https://github.com/NousResearch/hermes-agent/issues/110374)）——用户反复强调"宁可报错也不要安静地不工作"。
- **长会话/上下文管理焦虑**：压缩阈值错误（#136350）、memory 上限过低（#5320）、reasoning 配置回退不还原（#138085）共同指向长时运行的上下文保真问题。
- **多平台通道可靠性**：Telegram 话题路由、微信限流恢复、WhatsApp Windows spawn 均有问题，消息投递是 gateway 的信誉关键。
- **满意点**：社区修复响应快（同日 issue→PR 闭环，如 #138090→#138095），插件目录和 i18n 生态（pt-br、nvidia 插件）持续扩张。

## 8. 待处理积压

- **开放 Issue 总量已超 1000**（[#7335](https://github.com/NousResearch/hermes-agent/issues/7335) 曾专门讨论增长控制，本身今日仍有活动）——issue 分诊吞吐需要机制性提升。
- **419 条待合并 PR**，包括存在数周的高价值修复：[#119787](https://github.com/NousResearch/hermes-agent/pull/119787)（TTS，9-23 开）、[#118089](https://github.com/NousResearch/hermes-agent/pull/118089)（Telegram MarkdownV2 渲染，9-21 开）、[#106592](https://github.com/NousResearch/hermes-agent/issues/106592)（Remote Desktop 更新状态残留，9-09 开）。
- **blocked 状态问题**：[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（贡献者 PR 权限）、[#94146](https://github.com/NousResearch/hermes-agent/issues/94146)（微信回复丢弃）需维护者介入解锁。
- **安全依赖升级** [#135817](https://github.com/NousResearch/hermes-agent/pull/135817)（multidict CVE）建议优先评审合并。
- **P1 无 fix PR**：[#122529](https://github.com/NousResearch/hermes-agent/issues/122529)、[#135037](https://github.com/NousResearch/hermes-agent/issues/135037) 影响生产定时任务和 Windows 主机环境，建议排期。

---
*数据来源：GitHub API（截至 2026-10-14）；健康度评估：社区活跃度极高 ⭐⭐⭐⭐⭐，Bug 修复吞吐 ⭐⭐⭐，Issue/PR 积压治理 ⭐⭐，需重点关注评审带宽与安装兼容性问题收敛。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*