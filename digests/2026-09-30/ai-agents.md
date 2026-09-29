# OpenClaw 生态日报 2026-09-30

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-29 23:41 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-30

## 1. 今日速览

OpenClaw 今日保持极高的社区活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 433、关闭 67），PR 更新 500 条（待合并 355、已合并/关闭 145），并发布了 1 个新版本。项目当前正处于 **2026.9.6 → 2026.9.7 的密集修复周期**，官方已开设 9.7 Fixes Tracker（#157531）。最突出的风险点是 **prepared-model-catalog worker 的内存泄漏集群问题**——多个独立报告指向同一组件，P0 级、且直接影响生产可用性；其次是 SQLite 状态数据库的锁/生命周期管理问题。总体来看，社区贡献管线（大量 "ready for maintainer look" PR）运转健康，但稳定性回归问题积压较多，需要维护者优先处理内存与升级路径问题。

---

## 2. 版本发布

### v2026.8.33（extended-stable / LTS 等效通道）
🔗 https://github.com/openclaw/openclaw/releases

- **性质**：仅网关（gateway-only）的 `extended-stable` 发布，相当于 LTS 通道。
- **内容**：基于 2026 年 8 月底的 OpenClaw 快照，叠加关键安全更新、可靠性与性能修复，以及新模型支持等特性。
- **注意**：当前最新主线版本为 **2026.9.6**，9.7 修复版正在准备中（prepared PR 已包含 18/21 个 P1 候选修复）。生产环境若追求稳定可留在 2026.8.33，但需注意下方多条 P0 问题影响的是 9.4–9.6 主线版本。

---

## 3. 项目进展

今日 PR 活动以修复和重构为主，355 个待合并 PR 中多个高优先级已进入维护者评审状态：

- **升级/更新链路修复**（本周高频主题）：
  - [#161338](https://github.com/openclaw/openclaw/pull/161338)（P1）修复更新后插件迁移未完成、运行时替换时 SQLite reader 被误删的问题。
  - [#161411](https://github.com/openclaw/openclaw/pull/161411)（P1）修复旧版 updater 拒绝未变更的数据库备份导致升级回滚。
  - [#161258](https://github.com/openclaw/openclaw/pull/161258)（P1）修复 `openclaw update` 在 worker 终止卡死时挂起。
  - [#158447](https://github.com/openclaw/openclaw/pull/158447)（P0）修复 Bun 网关更新时产生**8,462 个子孙进程**的失控链。
- **消息投递**：[#159873](https://github.com/openclaw/openclaw/pull/159873)（XL）修复一次性 cron 任务在重启后重复投递；[#161116](https://github.com/openclaw/openclaw/pull/161116)（P0）修复 Control UI 多渠道顺序配置卡死 35 秒–5 分钟。
- **Agents API**：[#161312](https://github.com/openclaw/openclaw/pull/161312)、[#161315](https://github.com/openclaw/openclaw/pull/161315)、[#161340](https://github.com/openclaw/openclaw/pull/161340) 连续完善自托管附件读取、steering 后重试、service tier 透传。
- **安全边界**：[#161373](https://github.com/openclaw/openclaw/pull/161373) 为 Cloudflare Access 用户补充登出能力；[#158901](https://github.com/openclaw/openclaw/pull/158901) 实现按 runtime 隔离 transport host 策略。

**整体评估**：项目在升级可靠性和消息投递两条主线上推进明显，更新链路的系统性修复（4+ 个相关 PR）说明维护者已将该领域列为重点；但与内存泄漏相关的修复 PR 尚未出现在队列中，是当前最大缺口。

---

## 4. 社区热点

| Issue | 评论 | 主题 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 94 | **最热**：Windows 上 Agent SQLite WAL 无限增长至 1.4–2.8 GB，阻塞网关启动。P0 + ux-release-blocker，已开 20 天仍无 fix PR，社区持续追更。 |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | 21 | 632-agent 大型集群：网关 ready 后事件循环饿死，所有 /health 探测超时，RSS 持续攀升。反映大规模部署场景的诉求。 |
| [#157067](https://github.com/openclaw/openclaw/issues/157067)（已关闭） | 19 | Windows 隔离 cron 向 worker 传递不可克隆 Proxy——今日已关闭，处理效率良好。 |
| [#111897](https://github.com/openclaw/openclaw/issues/111897) | 19 | 同一 session lane 两个并发 run 都完成并投递重复回复（7 月至今未决）。 |
| [#157531](https://github.com/openclaw/openclaw/issues/157531) | 16 | **2026.9.7 修复追踪器**，官方版本节奏的公开窗口，社区高度关注。 |

**诉求分析**：热议话题集中在**资源失控（磁盘/内存）**与**并发会话状态一致性**两大方向，且多为生产部署用户，说明 OpenClaw 已进入规模化落地阶段，稳定性成为首要关切。

---

## 5. Bug 与稳定性（按严重程度）

### 🔴 P0 — 内存/资源失控集群（今日最紧迫，暂无 fix PR）

prepared-model-catalog worker 内存泄漏已被**至少 4 个独立报告**交叉确认：

- [#159662](https://github.com/openclaw/openclaw/issues/159662)：4–5 GB/h 单调增长，与负载/厂商无关，冷启动即可复现。
- [#160548](https://github.com/openclaw/openclaw/issues/160548)：每 5 分钟泄漏 ~1 GiB，且每次回收会杀死所有等待中的 turn。
- [#159596](https://github.com/openclaw/openclaw/issues/159596)：内存锯齿，~200 次/天 critical 内存压力事件。
- [#160522](https://github.com/openclaw/openclaw/issues/160522)：worker 达 1.15 GB，绕过 `maxOldGenerationSizeMb: 512` 限制。
- [#156571](https://github.com/openclaw/openclaw/issues/156571)：同 worker 每分钟泄漏 1–3 GB 临时文件填满磁盘。

### 🔴 P0 — 启动/崩溃循环
- [#157160](https://github.com/openclaw/openclaw/issues/157160)：Watchtower 自动升级到 2026.9.6 后网关迁移失败持续崩溃循环。
- [#158936](https://github.com/openclaw/openclaw/issues/158936)：macOS 就绪看门狗 SIGTERM 慢启动网关，形成重启循环。
- [#149538](https://github.com/openclaw/openclaw/issues/149538)：见上，事件循环饿死。
- [#154812](https://github.com/openclaw/openclaw/issues/154812)：V8 堆外 RSS 失控至 9.32 GiB 触发宿主 OOM。

### 🔴 P0 — 状态数据库锁
- [#157325](https://github.com/openclaw/openclaw/issues/157325)：卡死的 agent-DB 资源使**所有** agent 回复失败，须重启网关。
- [#158095](https://github.com/openclaw/openclaw/issues/158095)：worker 生命周期获取失败直到重启。
- [#159094](https://github.com/openclaw/openclaw/issues/159094)：网关持有 lease 但内部 worker 报告他人持有。
- [#161290](https://github.com/openclaw/openclaw/issues/161290)：会话 SQLite 迁移失败恢复报告（今日新开）。

### 🟠 P1 — 消息丢失
- [#97616](https://github.com/openclaw/openclaw/issues/97616)：hook/工具子进程僵尸累积（6 月至今）。
- [#152965](https://github.com/openclaw/openclaw/issues/152965)：非渠道插件热重载会断开所有渠道插件并丢消息。
- [#150132](https://github.com/openclaw/openclaw/issues/150132)：claude-cli 8 MiB stdout 上限导致长回合丢弃最终回复（工作完成但回复丢失，用户极度不满）。
- [#154572](https://github.com/openclaw/openclaw/issues/154572)：claude-cli 子代理 spawn 必定失败。

**fix PR 状态**：升级链路类问题已有多个 fix PR 待审；**内存泄漏、状态锁、消息丢失三大 P0/P1 集群均暂无对应 fix PR**，为 2026.9.7 的最大风险。

---

## 6. 功能请求与路线图信号

- [#156341](https://github.com/openclaw/openclaw/issues/156341)（RFC）：**任务级决策模型选择与可检视评估**——复用现有 Decision runtime，允许按任务指定决策模型。与已提交的 [#158901](https://github.com/openclaw/openclaw/pull/158901)（按 runtime 隔离 transport）方向一致，有望进入后续版本。
- [#16670](https://github.com/openclaw/openclaw/issues/16670)：Onboarding 向导应强制包含 Memory/Embedding 配置——存在已久的 P2，Memory 是核心卖点但首次配置体验缺失，社区 👍 支持明显，可能借 UX 改版（[#161433](https://github.com/openclaw/openclaw/pull/161433) deslop 第二轮）纳入。
- [#152839](https://github.com/openclaw/openclaw/issues/152839)：openat2 ENOSYS 兼容路径——NAS/Docker 用户的真实部署需求，属于稳定版阻断项。
- 9.7 Fixes Tracker（[#157531](https://github.com/openclaw/openclaw/issues/157531)）明确下一版本以**隐私/安全 + 21 个 P1 候选**为主，功能新增强度收敛，符合当前稳定化节奏。

---

## 7. 用户反馈摘要

**真实痛点**：
- **"干完了活但回复丢了"**（[#150132](https://github.com/openclaw/openclaw/issues/150132)）：71/107 分钟的自主构建回合完成提交部署后，最终回复被 8 MiB 上限丢弃——自治场景下最伤信任的失败模式。
- **SSD 磨损担忧**（[#157989](https://github.com/openclaw/openclaw/issues/157989)）：每次 CLI 命令重写 1.1–1.4 GB、每次网关启动 6.5 GB 的插件源码捕获，硬件级损耗引发不满。
- **自动升级即翻车**：Watchtower 自动更新导致崩溃循环（#157160）、npm 全局更新失败（#145072, #154924, #158231）——升级路径是用户流失的高危点。
- **大集群运维**：632-agent（#149538）、9 个飞书账号 + WhatsApp（#157325）等规模化场景暴露的容量瓶颈。

**满意点**：问题模板规范、自动更新失败报告机制被用户认可（"explicitly reviewed and confirmed"）；#157067、#145072 等问题处理闭环较快；9.7 修复追踪器透明度高。

---

## 8. 待处理积压（维护者关注建议）

| Issue/PR | 时间 | 状态 | 呼吁 |
|---|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) WAL 暴涨 | 09-09 开，94 评论 | 无 fix PR | **最高优先**，已阻塞 Windows 用户三周 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) 僵尸进程 | 06-29 开 | 无 fix PR | 三个月未决的回归 |
| [#111897](https://github.com/openclaw/openclaw/issues/111897) 重复回复 | 07-20 开 | 无 fix PR | 消息重复直接影响用户侧体验 |
| [#121661](https://github.com/openclaw/openclaw/issues/121661) CLI 子代理伪造工具调用 | 08-10 开 | 待产品决策 | 模型编造工具输出，涉及可信度 |
| [#126246](https://github.com/openclaw/openclaw/issues/126246) Telegram 投递丢失 | 08-19 开 | 待复现 | 重启即丢消息，需 live repro 支援 |
| prepared-model-catalog 泄漏集群（#159662/#160548/#159596/#156571） | 09-23 起 | **无 fix PR** | 建议合并归因、优先出修复，为 9.7 必修项 |
| [#123774](https://github.com/openclaw/openclaw/pull/123774) Windows 守护进程 PR | 08-14 开 | needs proof | 长期挂起，建议维护者介入推动 |

**健康度小结**：社区参与度优秀（新开/关闭比 6.5:1 反映修复速度跟不上报告速度），但 P0 级资源失控问题的修复缺口是当前最大风险，建议 2026.9.7 将 prepared-model-catalog 泄漏与 SQLite 锁治理列为发布阻断条件。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析
**数据日期：2026-09-30**

> 说明：本期样本为 OpenClaw 与 Hermes Agent 两个项目的社区动态。以下分析基于此二者。

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道已从“功能验证”进入**规模化落地与稳定性攻坚**阶段：头部项目日均 Issue/PR 活动量均达到 500 条级，社区贡献管线健康但修复速度明显落后于报告速度（新开/关闭比 6.5:1）。用户群从早期尝鲜者转向**生产部署与长期托管用户**，痛点从“能不能用”迁移到“资源失控（内存/磁盘/CPU）、升级链路可靠性、并发会话一致性”等工程化问题。桌面端（Electron）形态的资源消耗与 Windows 平台支持成为普遍短板。安全与隐私（依赖 CVE 治理、安全边界、受控发布通道）开始成为版本规划的一等公民。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 433，关闭 67） | 500（新开/活跃 405，关闭 95） |
| PR 更新（24h） | 500（待合并 355，合并/关闭 145） | 500（待合并 423，合并/关闭 77） |
| 新版本 | ✅ v2026.8.33（extended-stable/LTS 通道） | ❌ 无（v0.21.5，修复冲刺期） |
| Issue 新开/关闭比 | ~6.5 : 1（修复速度承压） | ~4.3 : 1（略好但仍积压） |
| PR 待合并/合并比 | ~2.4 : 1 | ~5.5 : 1（review 队列压力更大） |
| 核心维护活跃度 | 官方修复追踪器（#157531）运转 | 单一维护者 @OutThisLife 单日 10+ 修复 PR，高产但**集中风险** |
| 健康度评估 | 🟡 社区参与优秀，P0 修复缺口大 | 🟡 迭代速度快，但 PR 吞吐落后、维护者单一 |

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **社区规模与贡献面最广**：433 条新 Issue/活跃、355 个待合并 PR，贡献管线深度远超依赖个别维护者驱动的项目。
- **发布工程成熟**：拥有 LTS 等效通道（extended-stable v2026.8.33）+ 主线 + 修复追踪器的多通道发布体系，Hermes 尚无此分层。
- **大规模生产场景验证**：632-agent 集群、9 个飞书账号多渠道等超大规模部署是 OpenClaw 独有的压力测试场景——这既是护城河也是当前问题来源。

**劣势/风险：**
- prepared-model-catalog worker 内存泄漏（≥5 个独立报告交叉确认）与 SQLite 锁问题均**无 fix PR**，P0 修复缺口是同类中暴露最严重的。
- 新开/关闭比 6.5:1 表明问题发现速度远超消化速度，稳定性回归在积压。

**技术路线差异**：OpenClaw 走**网关中心化多渠道架构**（Telegram/飞书/WhatsApp 多渠道路由、agent 集群调度），面向“始终在线的托管智能体”；Hermes 走**桌面优先 + 网关下沉**路线（Electron Desktop、Bot Mode），近期才推动群聊能力向 Web dashboard/网关开放（#89995）。

---

## 4. 共同关注的技术方向

| 技术方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **升级/更新链路可靠性** | #157160（Watchtower 升级崩溃循环）、#158447（8462 个子孙进程）、4+ 个升级 fix PR | #122495（Windows venv shim 更新失败）、#128614（外部 update 与 Desktop 冲突）、#122656（重建-重启循环） | 自动升级是**两个项目共同的最高频故障域**，也是用户流失高危点 |
| **资源占用失控** | 内存泄漏集群（#159662 等 5 项）、WAL 涨至 2.8 GB（#143524）、RSS 9.32 GiB（#154812） | Desktop 空闲 CPU/GPU 追踪器（#127647）、Intel MacBook 降频（#88275） | 从服务端内存泄漏到客户端空闲耗电，资源治理是共性硬伤 |
| **会话/消息状态一致性** | 重复回复（#111897）、cron 重启后重复投递（#159873） | 回复双重渲染三连报（#123801/#127288/#126524，已有 fix PR #128003） | 消息恰好一次投递（exactly-once）是共同未解难题 |
| **Windows 平台支持** | #143524（Windows WAL 阻塞启动）、#123774（守护进程 PR 挂起） | #125350（全新安装完全阻断）、#68128 | Windows 二等公民问题跨项目存在 |
| **依赖/安全治理** | 9.7 以“隐私/安全”为主题 | Electron 40→44 大版本升级（#128267）、js-yaml CVE 区间（#122424） | 依赖族升级与 CVE 治理被同时提上日程 |
| **Memory 子系统质量债** | Onboarding 强制 Memory 配置（#16670） | #7718（Hindsight 依赖缺失 6 个月未修）、#58705（mem0/Qdrant 锁冲突） | Memory 作为核心卖点但工程质量普遍欠账 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| **功能侧重** | 多渠道路由、agent 集群调度、Agents API、cron 任务、生产托管 | 桌面体验、Bot Mode 群聊、技能（skills）体系、插件目录生态 |
| **目标用户** | 生产部署者、大规模集群运维者（多渠道企业场景） | 个人桌面用户（macOS/Linux 为主），企业 SSH 托管为路线图项（#118029） |
| **架构形态** | 网关中心化 + worker 隔离 + SQLite 状态库，多 runtime transport | Electron Desktop + 网关双形态，Python venv + Node 混合栈 |
| **商业/生态模式** | 开放式 PR 管线，官方版本追踪器 | Nous Portal 订阅计费绑定（出现计费公平性争议 #110912） |
| **痛点性质** | 服务端规模化稳定性（锁、泄漏、饿死） | 客户端体验与安装分发（渲染、idle 资源、安装器） |

---

## 6. 社区热度与成熟度分层

- **OpenClaw — 规模化落地期，质量攻坚不足**：社区热度最高，但 P0（内存泄漏、SQLite 锁、消息丢失）三大集群均无 fix PR，新开/关闭比 6.5:1，处于“功能已验证、稳定性跟不上规模”的典型阶段。建议将泄漏与锁治理列为 9.7 发布阻断。
- **Hermes Agent — 快速迭代冲刺期**：单日维护者提交 10+ 修复 PR，问题簇（双重渲染）从报告到 fix PR 闭环快（#128003）；但 423 个待合并 PR 的 review 吞吐瓶颈和维护者单一依赖是结构性风险。
- **共同点**：两者均不在功能扩张期——OpenClaw 9.7 明确收敛新功能，Hermes 无版本发布、纯修复迭代。**整个生态子板块当前均处于质量巩固而非功能竞赛阶段。**

---

## 7. 值得关注的趋势信号

1. **“干完了活但回复丢了”是最伤信任的失败模式**（OpenClaw #150132：71 分钟自主构建后回复被 8 MiB stdout 上限丢弃）。对智能体开发者：自治长回合场景必须保证**结果持久化与投递的最终一致性**，stdout 管道不是可靠的交付通道。
2. **升级路径即用户流失点**：两项目的最高频故障均为自动更新失败/冲突。设计智能体运行时应将“可回滚、幂等、进程树可控”的升级作为一等公民——OpenClaw 的 8,462 个子孙进程失控是反面教材。
3. **Memory 是卖点但也是质量债**：两项目 Memory/Embedding 相关配置缺失、锁冲突、依赖声明问题长期积压。自托管 Memory 系统的工程化（依赖管理、并发控制）仍是蓝海。
4. **资源治理决定口碑**：从服务端 GB 级泄漏到桌面空闲 CPU 占用，“智能体常驻”形态对资源纪律要求远高于传统 CLI 工具。Embedded runtime 的沙箱限制（如 maxOldGenerationSizeMb 被绕过）不可信赖，需宿主级兜底。
5. **多 bot 协作与企业受控部署是明确路线图信号**（Hermes #89995 群聊下沉、#118029 SSH rollout 平台；OpenClaw 632-agent 集群诉求）。个人助手 → bot 集群编排是下一阶段竞争点。
6. **决策可检视性**：OpenClaw #156341（任务级决策模型选择与可检视评估）预示“智能体决策过程审计”将从加分项变为基础设施需求。

**对开发者的核心参考**：在 2026 年的这个时点，做 AI 智能体产品的差异化不在功能数量，而在**可靠性工程**——消息投递一致性、升级健壮性、资源边界、平台覆盖（尤其 Windows）。用户社区的技术素养已高到会做 DB 层取证，糊弄不再可行。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报

**日期：2026-09-30** | 仓库：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

- 项目今日保持**高度活跃**：Issues 更新 500 条（新开/活跃 405，关闭 95），PR 更新 500 条（待合并 423，已合并/关闭 77），社区吞吐量大，维护响应节奏健康。
- **无新版本发布**，主分支处于密集修复迭代期，多个 P1/P2 修复 PR 于今日集中提交。
- 热点集中在三大主题：**Desktop 空闲资源占用（CPU/GPU）性能追踪**、**助手回复双重渲染（session-state）问题群**、**Windows 平台安装/更新链路故障**。
- 维护者 [@OutThisLife](https://github.com/OutThisLife) 今日高产，连续提交十余个针对性修复 PR，覆盖桌面端、网关、更新机制等模块。

---

## 2. 版本发布

今日无新版本发布。Desktop 当前版本为 v0.21.5（含 #126524 提及的 `+3934` 构建），主分支处于 d0288be5/485979dd 时代的持续集成修复阶段。

---

## 3. 项目进展

今日合并/关闭共 77 个 PR（其中较重要的已关闭项）：

| PR | 内容 | 意义 |
|---|---|---|
| [#124338](https://github.com/NousResearch/hermes-agent/pull/124338) (CLOSED) | Linux Desktop 在 sudo 无 TTY 时**快速失败而非挂死**，修复 `.desktop` 启动/自启动/更新器静默卡死 | 消除一类部署阻断 |
| [#118025](https://github.com/NousResearch/hermes-agent/pull/118025) (CLOSED) | Desktop host spawn gate **原子化抢占**，修复并发启动双后端破坏单实例不变量 | 核心稳定性加固 |

今日新开的高价值 PR（待合并，体现项目推进方向）：

- **[#128267](https://github.com/NousResearch/hermes-agent/pull/128267)** — Electron **40.10.2 → 44.4.5** 大版本升级 + NVIDIA SwiftShader 回退门控，整合并取代多个社区 bump PR，属于重要的安全/依赖治理动作。
- **[#128003](https://github.com/NousResearch/hermes-agent/pull/128003)** — 修复 provider 复用 tool-call id 时 Desktop 回复渲染两次（对应 NS-1029），直击当前热议的“双重渲染”问题群。
- **[#128614](https://github.com/NousResearch/hermes-agent/pull/128614)** — 修复外部触发的 `hermes update` 与活动 Desktop 冲突（#126177），缓解更新循环问题。
- **[#128557](https://github.com/NousResearch/hermes-agent/pull/128557) / [#128440](https://github.com/NousResearch/hermes-agent/pull/128440)** — 修复 reaction 事件越界污染其他会话转录、REST 投影滞后等问题，session-state 一致性持续收敛。
- **[#128313](https://github.com/NousResearch/hermes-agent/pull/128313)** — 网关 slash worker 丢弃排队 prompt 的修复，改善 Desktop/TUI 的 `/prompt`、`/compose` 体验。
- **[#128511](https://github.com/NousResearch/hermes-agent/pull/128511)** — 更新器进程祖先判定改为逐链接探测，修复 `/proc/1` 不可读时编排器被误判的问题。

**整体评估**：今日进展集中在桌面端稳定性、更新链路健壮性和会话状态一致性三个方向的系统性收敛，项目处于“修复冲刺”阶段，为下一个版本发布蓄力。

---

## 4. 社区热点

**🔴 最活跃（今日更新）**

1. **[#110912](https://github.com/NousResearch/hermes-agent/issues/110912)**（29 评论，已关闭）— Nous Portal 订阅额度有效时仍按全价计费（glm/kimi 路由折扣 bug）。**计费公平性**是最敏感的用户议题，虽已关闭但仍是口碑风险点。
2. **[#122495](https://github.com/NousResearch/hermes-agent/issues/122495)**（24 评论，已关闭）— Windows `hermes update` 因 venv redirector shim 形态识别失败而中止。Windows 更新链路是长期痛点。
3. **[#89995](https://github.com/NousResearch/hermes-agent/issues/89995)**（21 评论，开放）— 请求 Bot Mode 群聊室在 Web dashboard 与网关开放（当前桌面独占）。多 bot 群聊是明确的路线图诉求。
4. **[#127647](https://github.com/NousResearch/hermes-agent/issues/127647)**（21 评论，今日新建）— **Desktop 空闲资源消耗追踪器**，作为 #73082/#88288 的 scope 索引，社区正系统性地归因渲染循环问题。这是当前项目最集中的质量主题。
5. **[#123801](https://github.com/NousResearch/hermes-agent/issues/123801)**（18 评论）— macOS Desktop 助手回复双重渲染（存储只有一行）。与 #127288、#126524、#128003 形成**问题簇**，显示该缺陷多场景复现。

---

## 5. Bug 与稳定性

**P1（严重）**

- 🔴 **[#125350](https://github.com/NousResearch/hermes-agent/issues/125350)** — Windows 全新安装完全无法完成：Git tar.bz2 需缺失的 bzip2、ffmpeg pin 404、镜像 403、`-SkipSetup` 被拒。**安装阻断级**，暂无直接 fix PR，需优先处理。
- 🔴 [#110912](https://github.com/NousResearch/hermes-agent/issues/110912)（已关闭）— Portal 计费路由 bug，疑似已修复确认。

**P2（较高）**

- 🟠 [#123801](https://github.com/NousResearch/hermes-agent/issues/123801) / [#127288](https://github.com/NousResearch/hermes-agent/issues/127288) / [#126524](https://github.com/NousResearch/hermes-agent/issues/126524) — Desktop 回复双重渲染三连报。**已有 fix PR：[#128003](https://github.com/NousResearch/hermes-agent/pull/128003)**。
- 🟠 [#127647](https://github.com/NousResearch/hermes-agent/issues/127647)（追踪器）— Desktop 空闲 CPU/GPU/内存消耗，长期问题（#73082、#88275、#53902、#98394 均已关闭或收敛中）。
- 🟠 [#122424](https://github.com/NousResearch/hermes-agent/issues/122424) — 依赖锁定在已知 CVE 区间（js-yaml GHSA-2883-xcg3-v3hh 等）。**间接由 [#128267](https://github.com/NousResearch/hermes-agent/pull/128267) Electron 升级 PR 处理依赖族**，建议单独确认。
- 🟠 [#122490](https://github.com/NousResearch/hermes-agent/issues/122490) — bot-to-bot DM 投递 runner 继承无三方依赖的 python（ruamel 缺失），后台消息投递失败。
- 🟠 [#122656](https://github.com/NousResearch/hermes-agent/issues/122656) / [#122326](https://github.com/NousResearch/hermes-agent/issues/122326) — 源码安装下 Desktop 陷入**重建-重启循环**，杀死活动会话。**部分由 [#128614](https://github.com/NousResearch/hermes-agent/pull/128614) 覆盖**。
- 🟠 [#122402](https://github.com/NousResearch/hermesResearch/hermes-agent/issues/122402) — Ubuntu 更新构建 python-olm 时缺 clang++ 失败。

**P3（一般）**

- 🟡 [#123926](https://github.com/NousResearch/hermes-agent/issues/123926) — 启动时插件随机静默加载失败（`sys.modules` 迭代中修改字典）。
- 🟡 [#124583](https://github.com/NousResearch/hermes-agent/issues/124583) — terminal 工具提示引用不存在的 `process(...)` 工具名。
- 🟡 [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) — kanban 卡片因一次限流被永久标记 `blocker_auth`，reviewer 永不派生。
- 🟡 [#101160](https://github.com/NousResearch/hermes-agent/issues/101160) — Buzz relay 静默 300 秒即被误判死亡重连。

---

## 6. 功能请求与路线图信号

| 需求 | 状态 | 信号 |
|---|---|---|
| Web dashboard/网关开放 Bot 群聊室（[#89995](https://github.com/NousResearch/hermes-agent/issues/89995)） | 开放，needs-decision | 21 评论 + 3 👍，桌面独占功能下沉到网关符合架构方向，**下版本候选** |
| 会话标题字数上限（[#128021](https://github.com/NousResearch/hermes-agent/pull/128021)） | 已有 PR | 小型 UX 改进，合并概率高 |
| 技能外部挂载 provenance 分级（[#128387](https://github.com/NousResearch/hermes-agent/pull/128387)） | 已有 PR | 配合 skills 体系演进 |
| Plugin Catalog 社区条目 gh-ref（[#128615](https://github.com/NousResearch/hermes-agent/pull/128615)） | 已有 PR | `@gh:owner/repo#123` 引用机制，生态扩展方向明确 |
| SSH 托管安装的统一受控 rollout 平面（[#118029](https://github.com/NousResearch/hermes-agent/issues/118029)） | 开放 | 面向企业部署，绑定安全保证 #92618，长期路线图项 |

---

## 7. 用户反馈摘要

- **不满集中在 Windows**：安装阻断（#125350）与更新失败（#122495、#68128）表明 Windows 用户当前体验明显劣于 macOS/Linux，多个 issue 标注 `platform/windows`。
- **Desktop 资源消耗引发真实损失**：用户报告 Intel MacBook 发热降频（#88275）、电池续航受影响、系统报告 Hermes 为最高耗电应用——性能问题已从“抱怨”升级为影响日常使用的硬伤。
- **双重渲染损害信任**：多位用户主动做 DB 层排查（#123801、#127288 附 state.db 证据），社区技术素养高、报告质量高，但也说明该 bug 令用户困扰到愿意深度取证。
- **计费问题最伤付费用户**：#110912 的 3 倍账单异常直击 Portal 订阅者核心利益，关闭后仍需观察复发报告。
- **正面信号**：用户在 issue 中提交详尽复现与补丁级分析（如 #128511 基于 @jackulau 的 PR rebase 并保留署名），社区贡献生态良性。

---

## 8. 待处理积压

- **[#7718](https://github.com/NousResearch/hermes-agent/issues/7718)**（4 月开，5 👍，仅 8 评论）— Hindsight 插件 `local_embedded` 模式依赖声明缺失导致静默失败。**积压近 6 个月**，是当前最久的高赞未修 issue，与 #58705（mem0/Qdrant 锁冲突）同属 memory 插件质量债。
- **[#89412](https://github.com/NousResearch/hermes-agent/issues/89412)**（8 月开）— MCP OAuth 对不主动 401 挑战的服务器（如 Gmail MCP）无法触发登录，阻塞 Google 生态集成。
- **[#69889](https://github.com/NousResearch/hermes-agent/issues/69889)**（7 月开）— venv 重建后用户 pip 包丢失导致 cron Python 任务全灭，needs-decision 悬置两月。
- **[#58705](https://github.com/NousResearch/hermes-agent/issues/58705)**（7 月开）— mem0 OSS Qdrant 锁冲突，needs-decision。
- **PR 积压压力**：待合并 PR 达 **423 个**（单日更新 500 条），合并吞吐明显落后于提交量，建议维护者关注 review 队列，尤其是 Electron 升级 [#128267](https://github.com/NousResearch/hermes-agent/pull/128267) 这类长尾分支处理 PR，避免再次过期需 rebase。

---

*数据来源：GitHub API 过去 24 小时更新记录。链接均指向原始 issue/PR。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*