# OpenClaw 生态日报 2026-10-03

> Issues: 487 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-02 23:45 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-10-03

---

## 1. 今日速览

过去 24 小时 OpenClaw 保持**高强度活跃**：Issues 更新 487 条（新开/活跃 326、关闭 161），PR 更新 500 条（待合并 292、合并/关闭 208），并发布 2 个 extended-stable 版本（v2026.8.34 / v2026.8.35）。核心贡献者 @steipete、@vincentkoc 等持续围绕 **Gateway 主线程卸载（SQLite 读写迁移至 worker）** 进行大规模重构，这是当前最明确的工程主线。与此同时，2026.9.6/9.7 线暴露出一批围绕 `prepared-model-catalog` worker 的内存泄漏与崩溃循环问题（多个 P0/P1），稳定性压力集中在最新版而非 stable 线。整体来看：**stable 线趋稳、dev 线处于高风险重构+回归并发期**。

---

## 2. 版本发布

### v2026.8.35 与 v2026.8.34（gateway-only `extended-stable`，等效 LTS）

- **定位**：基于 2026 年 8 月底的 OpenClaw 快照，叠加关键安全更新、可靠性与性能修复、新模型支持。**仅 Gateway 组件**，无破坏性架构变更说明。
- **建议**：生产环境用户应停留或升级至 extended-stable 线；2026.9.x 线当前存在多个 P0 崩溃循环问题（见第 5 节），不建议生产采用。
- 链接：[Releases](https://github.com/openclaw/openclaw/releases)

---

## 3. 项目进展

今日 PR 活动以 **Gateway 线程模型重构** 为绝对主线（由 @steipete 领衔）：

- **主线程卸载系列**（直接回应 #117262 SQLite 事件循环卡顿问题）：
  - [#163605](https://github.com/openclaw/openclaw/pull/163605) 将 durable transcript 异步读取移出 Gateway 线程
  - [#163496](https://github.com/openclaw/openclaw/pull/163496)（已关闭）将 workspace 状态操作移入 shared-state workers
  - [#163819](https://github.com/openclaw/openclaw/pull/163819) placement 结果结算迁入 workers
- **内存/资源释放**：[#163834](https://github.com/openclaw/openclaw/pull/163834) 修复长期运行 Gateway 对已完成 chat 注册、usage 报告、prompt 文本的主线程堆保留——直接针对 OOM 类问题
- **Swarm 稳定性**：[#163558](https://github.com/openclaw/openclaw/pull/163558)（P1）修复停止 Swarm 时过早释放子代理生命周期所有权
- **插件 SDK**：[#162669](https://github.com/openclaw/openclaw/pull/162669) 引入版本化 scheduler 能力，统一插件定时器与 service/account 生命周期绑定，横跨 Discord/IMAP/browser 等十余插件
- **渠道修复**：[#163863](https://github.com/openclaw/openclaw/pull/163863)（P1）修复 CPU 高负载下 Telegram 相册被拆分为多条回复
- **ACP 重启恢复**：[#163835](https://github.com/openclaw/openclaw/pull/163835) 保留 ACP source ownership 跨重启

**评估**：今日推进幅度显著——一次系统性架构改进（主线程 SQL 卸载）+ 一批渠道/资源泄漏修复，292 个待合并 PR 显示管道充裕，但 review 带宽明显是瓶颈。

---

## 4. 社区热点

1. **[#116201](https://github.com/openclaw/openclaw/issues/116201)**（59 评论）— Realtime voice 会话无界保留 provider/consult 状态。热度最高的长期议题，涉及语音场景的资源治理设计，尚无 fix PR，属资源限制模型的设计层问题。
2. **[#102175](https://github.com/openclaw/openclaw/issues/102175)**（21 评论）— 嵌入式 prompt cache 在 room-event/policy/Responses 边界处失效。直接影响长会话成本，用户诉求集中在 token 费用浪费，需产品+安全双 review。
3. **[#97616](https://github.com/openclaw/openclaw/issues/97616)**（18 评论，P1）— hook/tool 子进程未被 reap，僵尸进程累积导致运行时劣化。
4. **[#38327](https://github.com/openclaw/openclaw/issues/38327)**（17 评论，P0 回归）— google-vertex/gemini-3.1-pro-preview 触发 "Cannot convert undefined or null to object"，自 2026.3 起未解。
5. **Dreaming 记忆系统争议**：[#150635](https://github.com/openclaw/openclaw/issues/150635)、[#65374](https://github.com/openclaw/openclaw/issues/65374)、[#67413](https://github.com/openclaw/openclaw/issues/67413)、[#121232](https://github.com/openclaw/openclaw/issues/121232) 集中反映 dreaming 阶段的晋升失败、跨 agent 记忆污染、OOM 与配置缺失——记忆子系统是用户心智中最重要的差异化功能，也是最不稳定的部分。

---

## 5. Bug 与稳定性（按严重程度）

**P0（发布阻塞级）**

| Issue | 问题 | Fix 状态 |
|---|---|---|
| [#162031](https://github.com/openclaw/openclaw/issues/162031) | 2026.9.7 运行时工具组装时 crash-loop（未处理 promise rejection） | 无 fix PR，需 maintainer review |
| [#161953](https://github.com/openclaw/openclaw/issues/161953)（已关闭）| Windows 下 sessions.create 100% 失败（win32 `\\?\` 路径泄漏进 guard）| 已关闭，疑似已修 |
| [#160548](https://github.com/openclaw/openclaw/issues/160548) | 2026.9.6 prepared-model-catalog worker 每 5 分钟泄漏 ~1 GiB，reclamation 杀死所有等待中的 turn | 相关：#163834 可能部分覆盖 |
| [#161379](https://github.com/openclaw/openclaw/issues/161379) | catalog 刷新循环打满一个 CPU 核（TTL 60s < 刷新耗时）| 无 |
| [#155859](https://github.com/openclaw/openclaw/issues/155859) | Gateway 启动耗时随插件数线性增长，120s 预算被 discord/codex/weixin 吃尽 | 无 |
| [#115424](https://github.com/openclaw/openclaw/issues/115424) | V8 heap OOM 后 restart-recovery 将单次崩溃放大为 7 次 core dump 循环 | 无 |
| [#145252](https://github.com/openclaw/openclaw/issues/145252) | 官方 2026.9.3/9.4 升级恢复可靠性追踪 issue | 协调中 |

**P1 亮点问题**

- [#160521](https://github.com/openclaw/openclaw/issues/160521)：state DB read-admission seal → unhandled rejection 崩溃
- [#161976](https://github.com/openclaw/openclaw/issues/161976)：WhatsApp DM 回复在重启后 durable registry handoff 处反复失败（消息丢失）
- [#162119](https://github.com/openclaw/openclaw/issues/162119)：Codex 模型切换后间歇 403 owner-verification（安全+消息丢失）
- [#163566](https://github.com/openclaw/openclaw/issues/163566)：2026.9.7 更新修复后每 turn `session-resource-loader` 烧 80–150s CPU
- [#91804](https://github.com/openclaw/openclaw/issues/91804)：内部推理内容泄露给用户（隐私，自 2026.6.5）

**趋势判断**：2026.9.5–9.7 引入的插件源码捕获（#157989：每条 CLI 命令重写 1.1–1.4 GB，SSD 磨损）和 catalog worker 系列问题构成一个明显的回归簇，建议团队优先处理。

---

## 6. 功能请求与路线图信号

- **Per-agent dreaming 配置**（[#67413](https://github.com/openclaw/openclaw/issues/67413)，👍5）：多 agent 用户强烈诉求，与 dreaming 系列修复同源，很可能随记忆子系统重构纳入。
- **审计面：运行时 skill 使用记录**（[#141004](https://github.com/openclaw/openclaw/pull/141004)，PR 已就绪）：运维侧可观测性增强，ready for review。
- **模型 fallback 链改进**（[#118793](https://github.com/openclaw/openclaw/issues/118793)）：Claude CLI 限额错误未触发 failover，已有 linked PR 开放中。
- **Webhook 隐式端口退役**（[#162759](https://github.com/openclaw/openclaw/pull/162759)）：兼容性迁移路径已设计好，是下版本可能的破坏性变更点。
- 官方 QA 方向：容器与外部 app SDK 的主验证（[#118785](https://github.com/openclaw/openclaw/issues/118785)）显示容器化部署是明确的路线图重点。

---

## 7. 用户反馈摘要

- **痛点集中在 2026.9.5+ 升级**：大量用户报告“升级后内存暴涨/启动极慢/SSD 写入异常”，升级体验是当前满意度最大拖累（#155859、#157989、#160548）。
- **多渠道用户（Telegram/WhatsApp/WeChat/Matrix）**反复遭遇消息丢失与投递回退类问题（#161976、#154299、#114211），即时通讯场景的可靠性是核心使用场景的底线需求。
- **多 agent / 长会话重度用户**对 dreaming 记忆系统既依赖又失望：“Ranked N, Promoted 0"（#121232）和跨 agent 记忆污染（#65374）直接打击信任。
- **Windows/macOS 桌面端用户**是二等公民感明显：Windows session 创建全挂（#161953）、Desktop app 引发 gateway boot-loop（#115256）、macOS App 反复断连（#74848）。
- 正面信号：extended-stable 线获得认可，主线程卸载重构方向在社区 issue 中被积极引用期待。

---

## 8. 待处理积压

- **[#38327](https://github.com/openclaw/openclaw/issues/38327)**（P0，2026-03 开立，7 个月未修复）：google-vertex 回归，标 no-new-fix-pr + needs-maintainer-review，建议尽快裁决。
- **[#91804](https://github.com/openclaw/openclaw/issues/91804)**（P1 安全，隐私泄露，4 个月）：needs-security-review。
- **[#116201](https://github.com/openclaw/openclaw/issues/116201)**（59 评论，2 个月）：voice 资源治理设计决策悬置。
- **[#114414](https://github.com/openclaw/openclaw/issues/114414)**：Dated TODO sweep 已有逾期项（zod/markdown-it 依赖冷却排除 removal），属可直接处理的卫生债务。
- **PR 积压**：292 个待合并中多个 `ready for maintainer look` 状态的 XL 级重构（#163819、#163834、#162669）等待 review；#138385（构建缓存）、#119055（Code Mode durability）等长期 PR 建议推进或明确去留。
- **stale 风险**：#96857、#53783 已标 stale 但涉及消息可见性与跨 agent 通信，自动关闭前建议人工确认。

---

**健康度小结**：社区参与度极高（日 issue 326 活跃），贡献管道饱满；风险点在于 2026.9.x 回归簇收敛速度与 maintainer review 带宽。建议关注 #162031/#160548 等 P0 的 fix PR 落地节奏作为下期日报主线。

---

## 横向生态对比

# 个人 AI 助手/智能体开源生态横向对比报告 · 2026-10-03

> 说明：本期日报样本包含 OpenClaw 与 Hermes Agent 两个项目，以下对比基于此二者。

---

## 1. 生态全景

个人 AI 助手开源生态已进入**高活跃度、强分化的深水区**：头部项目日均 issue/PR 活动均达数百条量级，社区贡献管道整体饱满，但 review 带宽与回归收敛速度成为共性瓶颈。项目形态上，“常驻 Gateway + 多渠道消息接入 + 本地模型支持 + 记忆系统”正在收敛为个人智能体的标准架构范式。与此同时，两类风险集中暴露：**长期驻留进程的资源治理**（内存泄漏、空闲 CPU/GPU 消耗、启动耗时）与**安装/升级链路的脆弱性**，两者直接决定用户留存。功能层面，“跨机器/跨所有者智能体协作”与“前后端分离部署”是社区讨论中反复出现的下一阶段产品方向。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（活跃/关闭） | 487（326 / 161） | 500（390 / 110） |
| PR 更新（待合并/合并关闭） | 500（292 / 208） | 500（348 / 152） |
| Release | 2 个（v2026.8.34/35 extended-stable，gateway-only LTS） | 无（主线 0.21.5+ dev） |
| 核心工程主线 | Gateway 主线程卸载（SQLite 迁 worker）+ OOM 修复 | Desktop 会话状态修复 + 插件目录生态扩张 |
| 最大风险点 | 2026.9.x 回归簇（catalog worker 泄漏 1GiB/5min、crash-loop 等多个 P0） | Desktop 重复渲染 bug 簇（4+ issue 同根因，无统一 fix） |
| 健康度评估 | **中高**：stable 线成熟，dev 线高风险重构期；P0 积压 7 项 | **中**：修复响应快、生态膨胀迅猛，但会话可靠性 bug 消耗信任、待合并 PR 偏多 |

---

## 3. OpenClaw 在生态中的定位

**优势**：
- **发布工程成熟**：拥有明确的 extended-stable（等效 LTS）双线发布策略，生产环境可用性诉求有制度化保障——这是对照项目中缺失的能力。
- **架构纵深**：主线程卸载、Swarm 子代理生命周期、ACP 重启恢复、版本化插件 scheduler 等 PR 显示其在**网关架构与运行时治理**上的投入深度显著领先。
- **差异化功能**：Dreaming 记忆系统是用户心智中最独特的卖点（尽管当前最不稳定）。

**技术路线差异**：OpenClaw 走“重量级常驻 Gateway + 多渠道 + 记忆子系统”路线，工程重心在**服务端可靠性与资源治理**；Hermes Agent 则以 Desktop 体验为中心，重心在**插件目录生态与本地模型（llama.cpp）集成**，且更贴近 Nous 的开源模型生态。

**社区规模**：两者日均 issue/PR 活动量相当（均触顶 500 条统计上限），OpenClaw 的 issue 关闭率更高（49% vs 28%），显示 triage 效率略优；Hermes 的待合并 PR 更多（348 vs 292），社区贡献意愿更强但吞吐压力更大。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw 证据 | Hermes Agent 证据 |
|---|---|---|
| **长期驻留进程资源治理** | #163834 OOM 修复、#116201 voice 无界保留、#160548 泄漏 1GiB/5min、#155859 启动 120s | #127647 空闲 CPU/GPU 追踪、#46082 Dashboard 泄漏 5.2GB |
| **消息流可靠性（多渠道 IM）** | #161976 WhatsApp 丢消息、#163863 Telegram 相册、#163566 | #127665 等重复渲染簇、消息消失、会话加载慢 |
| **本地/多模型 fallback** | #118793 fallback 链改进、#38327 vertex 回归 | #131795 llama.cpp fallback 修复、#123450 prefill 成本上限 |
| **跨机器/跨智能体协作** | Swarm 稳定性 #163558、跨 agent 记忆污染 #65374 | #97681 跨网关 Bot 协作（33 评论，路线图级） |
| **安装/升级链路可靠性** | 2026.9.5+ 升级引发回归簇（社区最大不满） | #123971 Windows 更新误报、#125375 launchd 静默失败、#84047 三分之一“卡死”实为安装器问题 |
| **前后端分离部署** | #118785 容器化 QA 重点 | #18715（👍36）远程 Agent + 本地工具执行、#38519 Desktop-only 前端 |
| **token 成本优化** | #102175 prompt cache 失效 | #2045 技能懒加载（87 个技能全量注入） |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道网关、Dreaming 记忆、Swarm 多智能体、插件 SDK | Desktop 体验、Plugin Catalog 生态、本地模型、技能系统（87 内置） |
| 目标用户 | 生产部署运维者、多渠道重度用户、多 agent 用户 | 个人桌面用户、开源模型（Nous 生态）使用者、插件作者 |
| 架构重心 | 服务端 Gateway（worker 线程模型、SQLite 卸载） | 客户端 Desktop（session-state、renderer） |
| 质量策略 | 双线发布，extended-stable 兜底生产 | 单主线 0.21.x 快速迭代 |
| 短板 | 桌面端二等公民感、2026.9.x 回归簇 | 生产级发布策略缺失、安装链路脆弱 |

---

## 6. 社区热度与成熟度

- **OpenClaw：成熟项目的高风险演进期**。稳定线趋稳、发布纪律好，但 dev 线处于“大规模重构 + 回归并发”阶段，7 个 P0 未解（含 1 个 7 个月的 #38327）。关闭率 49% 显示 triage 健康。
- **Hermes Agent：快速迭代 + 生态扩张期**。社区插件提交踊跃、修复响应快（dskwe 密集提交多方向修复），但 issue 关闭率仅 28%，且重复渲染 bug 簇（4+ issue）缺 tracking issue 与 owner，属于**成长快于治理**的典型阶段。

---

## 7. 值得关注的趋势信号

1. **“常驻”是新的可靠性战场**：两个项目的 P0/P1 高度集中在内存泄漏、空闲资源消耗、启动耗时——智能体从“按需调用”转向 7×24 驻留后，资源治理能力成为核心竞争力。
2. **升级体验决定口碑**：OpenClaw 2026.9.5+ 回归簇与 Hermes 的安装器问题均引发最大规模用户不满；**渐进式发布 + 可靠回滚**（OpenClaw 的 extended-stable 是正面样本）将是标配。
3. **本地模型 fallback 从可选变刚需**：Hermes 的 llama.cpp 修复与 prefill 成本上限、OpenClaw 的 fallback 链改进，共同印证“云端限额 → 本地降级”链路的工程化。
4. **跨智能体协作是下一个产品前沿**：#97681（跨网关 Bot 协作）与 OpenClaw 的 Swarm/跨 agent 记忆议题指向同一命题——个人智能体的社会化互操作。
5. **对开发者的建议**：选型时区分“生产 vs 个人桌面”场景——生产优先 OpenClaw extended-stable 线；关注插件生态与本地模型则 Hermes 更活跃。监控指标建议盯 OpenClaw 的 #162031/#160548 修复节奏与 Hermes 重复渲染簇的 tracking 收敛，作为各自健康度拐点信号。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-03

## 1. 今日速览

项目继续保持极高的社区活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 390，关闭 110），PR 更新 500 条（待合并 348，已合并/关闭 152），无新版本发布。**议题焦点高度集中于 Desktop 会话状态与消息流（session-state / streaming）**，"助手回复重复渲染" 相关 bug 已形成 issue 簇（#127665、#123801、#122167、#129993），是当前最紧迫的稳定性风险。PR 侧则呈现"核心修复 + 插件目录（Plugin Catalog）生态扩张"双轨并行，社区插件提交量显著。

## 2. 版本发布

无新版本发布（今日 Releases 为空）。当前主线仍为 `0.21.5+` 开发版。

## 3. 项目进展

今日关闭/合并的重要 PR：

- **[PR #131795](https://github.com/NousResearch/hermes-agent/pull/131795)**（已关闭）：修复 Desktop 管理的 llama.cpp 本地模型作为 `fallback_providers` 回退时误报 "provider not configured" 的问题（#119227），本地模型 fallback 现在真正可用。
- **[PR #131810](https://github.com/NousResearch/hermes-agent/pull/131810)**（已关闭）：修复看板工具 `kanban_show` 裸调用在 worker 外被拒的问题。
- **[PR #129250](https://github.com/NousResearch/hermes-agent/pull/129250)**（已关闭）：插件目录 provider-status 升至 1.5.11，修复插件样式越界（scope 泄漏）。
- **[PR #126726](https://github.com/NousResearch/hermes-agent/pull/126726)、[#127300](https://github.com/NousResearch/hermes-agent/pull/127300)、[#125154](https://github.com/NousResearch/hermes-agent/pull/125154)、[#125720](https://github.com/NousResearch/hermes-agent/pull/125720)、[#126062](https://github.com/NousResearch/hermes-agent/pull/126062)**：插件目录持续收编社区插件（minimax-search、groq-provider、agora 多智能体开发团队、made-shelf 等），生态扩张明显。

待合并的核心修复 PR（见第 5 节）由 @dskwe 密集提交，覆盖 Windows 更新、Discord relay、Darwin 状态扫描、安静模式会话持久化等多个方向，项目整体处于**修复节奏稳定、生态快速膨胀**的阶段。

## 4. 社区热点

1. **[#127665](https://github.com/NousResearch/hermes-agent/issues/127665)**（45 评论，OPEN）— Desktop 回复重复渲染的**又一独立触发路径**：overlay 折叠逻辑豁免了 pending live rows。社区在 #127288 线程中持续复现排查，说明该 bug 家族仍未根治。
2. **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)**（33 评论，👍4）— "Bots 跨网关协作"愿景讨论，用户强烈关注**跨机器/跨所有者的个人智能体协作**，是产品方向层面的标志性 issue。
3. **[#127647](https://github.com/NousResearch/hermes-agent/issues/127647)**（28 评论）— Desktop 空闲资源消耗（renderer CPU/GPU、后端 serve CPU、内存）的**追踪汇总 issue**，含完整 triage 计划与机制归因，社区协作诊断质量高。
4. **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)**（👍36，22 评论）— "远程 Agent + 本地工具执行"需求长期高票，反映远程部署/本地操作混合场景的刚性诉求。
5. **[#123801](https://github.com/NousResearch/hermes-agent/issues/123801)**（22 评论，P1）— macOS Desktop 重复回复的又一复现（远程 Linux gateway 场景）。

## 5. Bug 与稳定性

**P1 级：**
- **[#123801](https://github.com/NousResearch/hermes-agent/issues/123801)** Desktop 重复渲染助手回复（macOS + 远程 gateway），与 #127665、#129993、#122167 同族——数据库仅存一行但 UI 渲染两次，涉及服务端 display projection。**尚无明确 fix PR**，为当前最高优先级风险（sweeper 标记 risk-session-state）。
- **[#122529](https://github.com/NousResearch/hermes-agent/issues/122529)** cron 外部 worker 缺失 venv site-packages 导致 `ModuleNotFoundError: ruamel`。
- **[#125375](https://github.com/NousResearch/hermes-agent/issues/125375)** macOS 上 `hermes gateway start` 生成的 launchd 服务无法启动却报 "✓ Service started"——启动失败被静默掩盖。

**P2 级：**
- **[#89412](https://github.com/NousResearch/hermes-agent/issues/89412)** MCP OAuth 仅被动触发，Gmail MCP 等不做 401 挑战的服务器永远无法登录（长期未解）。
- **[#99270](https://github.com/NousResearch/hermes-agent/issues/99270)** MCP 客户端将数组参数逐元素包装为 `{item: …}`，破坏所有数组型工具调用参数——影响面广。
- **[#46082](https://github.com/NousResearch/hermes-agent/issues/46082)** Dashboard 内存泄漏至 5.2GB 被 OOM kill。
- **[#123971](https://github.com/NousResearch/hermes-agent/issues/123971)** Windows 下 `hermes update` 更新成功但后检失败报错——**已有相关修复进行中：[PR #130012](https://github.com/NousResearch/hermes-agent/pull/130012)（gateway profile 重启路由）、[PR #129347](https://github.com/NousResearch/hermes-agent/pull/129347)**。
- **[#127313](https://github.com/NousResearch/hermes-agent/issues/127313)**（已关闭）zone 右键菜单劫持 transcript 复制功能，属 `ad2d4822e1` 引入的回归。
- **[#122402](https://github.com/NousResearch/hermes-agent/issues/122402)** Ubuntu 安装时 python-olm 源码构建失败（缺 clang++），影响 Matrix 加密集成。

**其他值得注意**：#125727 自动化 Nous 集成因大量合并冲突被阻塞，提示上游分支漂移较大。

## 6. 功能请求与路线图信号

- **跨网关 Bot 协作**（[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)）：明确的路线图级目标（先跨机器、后跨所有者），与 gateway 组件近期密集修复方向一致，优先级高。
- **远程 Agent + 本地工具执行**（[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)，👍36）：长青需求，与 Desktop-only 前端安装（[#38519](https://github.com/NousResearch/hermes-agent/issues/38519)，👍16）共同指向"前后端分离部署"形态。
- **技能懒加载**（[#2045](https://github.com/NousResearch/hermes-agent/issues/2045)）：87 个内置技能全量注入 system prompt 造成显著 token 浪费，已有 needs-decision 标签，纳入下版本可能性较高。
- **本地知识库 RAG**（[#844](https://github.com/NousResearch/hermes-agent/issues/844)）：由 teknium1 提出，定位为 workspace 概念的检索管线。
- **本地模型 prefill 成本上限**（[PR #123450](https://github.com/NousResearch/hermes-agent/pull/123450)）：opt-in 压缩触发机制，配合 llama.cpp fallback 修复（#131795），显示**本地模型支持是下版本明确方向**。

## 7. 用户反馈摘要

- **满意度较高的**：插件目录机制运转顺畅，社区插件作者提交踊跃且质量意识强（scope 修复、审计可观测性修复等）；triage 类追踪 issue（#127647、#84047）的系统性归因分析获得社区认可。
- **核心痛点**：
  1. Desktop 消息流的可靠性（重复渲染、消息消失、会话加载慢/取消）是用户最直接的不满来源，涉及多个平台；
  2. 安装/更新链路脆弱（Windows 更新误报失败、macOS launchd 静默失败、Ubuntu 依赖构建失败、venv 备份误删 [#127415](https://github.com/NousResearch/hermes-agent/pull/127415)）——#84047 的 triage 指出约三分之一 "卡死" 报告实为安装器问题；
  3. MCP 生态兼容性（OAuth 触发、数组参数序列化）影响工具链可用性；
  4. 资源占用：空闲 CPU/GPU 消耗与内存泄漏对长期驻留的个人助手场景伤害大。

## 8. 待处理积压

- **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)**（5 月开，👍36，needs-decision）：远程 Agent + 本地工具执行，呼声高但 5 个月未落地决策。
- **[#844](https://github.com/NousResearch/hermes-agent/issues/844)**（3 月开）：RAG 知识库，路线图信号明确但无对应 PR。
- **[#84047](https://github.com/NousResearch/hermes-agent/issues/84047)**（8 月开）：77 个 stall/hang 报告归为 7 种机制的 triage，需逐机制推进修复。
- **[#89412](https://github.com/NousResearch/hermes-agent/issues/89412)** / **[#99270](https://github.com/NousResearch/hermes-agent/issues/99270)**：MCP OAuth 与数组序列化两个高影响 bug 长期 OPEN，建议优先分配修复。
- **重复渲染 bug 簇**（#127665 / #123801 / #122167 / #129993）：多个 P1/P2 issue 指向同一 session-state 根因但无统一修复 PR，建议维护者收敛为单一 tracking issue 并明确 owner。

---
**健康度小结**：社区参与度极高（日 500+ issue 活动、348 个待合并 PR），修复响应迅速，但积压的待合并 PR 体量偏大，且 Desktop 会话状态 bug 簇正在消耗社区信任，是当前项目最大的健康风险点。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*