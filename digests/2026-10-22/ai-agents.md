# OpenClaw 生态日报 2026-10-22

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-21 23:16 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-22

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时内 Issues 更新 500 条（新开/活跃 266，关闭 234），PR 更新 500 条（待合并 265，已合并/关闭 235），社区交互量与吞吐基本平衡，显示维护团队响应能力健康。今日发布 **v2026.10.10-beta.3**，聚焦 Windows 可靠性修复。`@steipete` 单日提交十余个 Web UI 重构 PR（Solid 原生 actions/JSX 迁移），是当前最活跃的贡献者。不过，围绕 SQLite WAL/内存泄漏/启动阻塞的多个 P0 稳定性问题持续发酵多周，仍是项目最大的健康隐患。

## 2. 版本发布

### v2026.10.10-beta.3
**Windows 可靠性专项**：
- 恢复全新状态初始化与 Gateway 启动流程
- 应用更新期间隐藏 SQLite 辅助窗口
- 强制 Gateway 重装时容忍启动器时间戳稳定过程
- 关联 #176194、#174969、#176174、#176945（相关 #176111、#174906）

**迁移注意**：面向 Windows 用户的可靠性修复，建议受 #154924（global-install-failed）、#179183（gateway-recovery-verification）等更新失败困扰的用户升级验证。无破坏性变更声明。

## 3. 项目进展

今日 PR 活动以 **Web UI 架构现代化** 与 **平台可靠性** 为主线：

- **Web UI Solid 迁移加速**（@steipete 主导，多个 PR "ready for maintainer look"）：
  - [#180023](https://github.com/openclaw/openclaw/pull/180023) 共享 modal bridge JSX 化
  - [#179724](https://github.com/openclaw/openclaw/pull/179724) 手动保存时清除配置错误
  - [#179801](https://github.com/openclaw/openclaw/pull/179801)、[#179943](https://github.com/openclaw/openclaw/pull/179943)、[#179947](https://github.com/openclaw/openclaw/pull/179947) 渠道写入/记忆导入/技能写操作统一迁移到 Solid actions
  - [#179973](https://github.com/openclaw/openclaw/pull/179973) 测试瘦身批次 d411
- **架构级变更**：
  - [#179526](https://github.com/openclaw/openclaw/pull/179526) 退役 heartbeat 执行器，完成向 Automations 的迁移（XL 级、标注兼容性风险）
  - [#180007](https://github.com/openclaw/openclaw/pull/180007) 回滚企业托管 MCP 授权特性以待开放审查——治理流程值得肯定
- **修复进展**：
  - [#167027](https://github.com/openclaw/openclaw/pull/167027) 修复快照重试在复制清理失败时误判成功
  - [#179924](https://github.com/openclaw/openclaw/pull/179924) 允许只读成员编辑自己的资料（安全边界审查中）
  - Telegram 适配器修复持续推进：[#151099](https://github.com/openclaw/openclaw/pull/151099)（引用回复正文缺失）、[#155273](https://github.com/openclaw/openclaw/pull/155273)（图片重复接收）

整体看，UI 层与技术债清理节奏很快，日吞吐约 10+ 个功能性 PR，项目在"向前重构"与"向稳修复"双线并行。

## 4. 社区热点

| Issue | 热度 | 焦点 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) Agent SQLite WAL 增至 1.4–2.8GB 阻塞 Gateway 启动 | **133 评论**，P0 | Windows 用户最痛问题，9 月至今未关闭，多名用户复现；同类问题在 [#172091](https://github.com/openclaw/openclaw/issues/172091)（跨线程事务永不关闭阻塞 WAL checkpoint）中进一步定位 |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) prepared-model-catalog worker 内存泄漏 4–5GB/h | 24 评论，P0 | 与 [#159596](https://github.com/openclaw/openclaw/issues/159596)（内存锯齿、日 200 次 critical 压力事件）、[#169797](https://github.com/openclaw/openclaw/issues/169797)（内存 2.5×、启动 3–5× 慢）构成**内存/性能回归问题群** |
| [#157989](https://github.com/openclaw/openclaw/issues/157989) 插件源捕获每命令重写 1.4GB、每启动 6.5GB，SSD 磨损 | 22 评论，P1 | 2026.9.5 引入的回归，用户对设计合理性提出质疑，需产品决策 |
| [#144291](https://github.com/openclaw/openclaw/issues/144291) 配置热重载中止所有进行中的 agent 回合 | 14 评论，P1 | 消息丢失类，需产品+安全双重决策 |
| [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram 出站消息一次失败即死信、无重试 | 13 评论，P1 | 静默丢消息，8 月至今，已有 fix-shape-clear 标记 |

**诉求共性**：高热度问题集中在**数据可靠性（消息丢失）**与**资源管理（内存/磁盘）**，且多数带 `needs-maintainer-review` / `needs-product-decision` 标签——社区对"问题已被听见但缺决策"的不满在升温。

## 5. Bug 与稳定性（按严重程度）

**P0 — 无 fix PR**：
- [#143524](https://github.com/openclaw/openclaw/issues/143524) SQLite WAL 无限增长阻塞 Gateway（Windows）❗133 评论
- [#159662](https://github.com/openclaw/openclaw/issues/159662) worker 内存泄漏（provider 无关）
- [#159596](https://github.com/openclaw/openclaw/issues/159596) Gateway 内存锯齿
- [#162211](https://github.com/openclaw/openclaw/issues/162211) 启动阻塞事件循环 40–200s → 健康监控误判 → 重启循环（macOS）
- [#164854](https://github.com/openclaw/openclaw/issues/164854) Windows 启动时模型发布超时，全部模型不可用
- [#158912](https://github.com/openclaw/openclaw/issues/158912) MEMORY.md 不再注入 bootstrap（文档与行为不一致）
- [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 agent 永久不可用（主分支不可复现，待定位版本）

**P0 — 已有关联动作**：
- [#154924](https://github.com/openclaw/openclaw/issues/154924) 更新失败 global-install-failed — 或由新 beta.3 缓解
- [#179183](https://github.com/openclaw/openclaw/issues/179183) 更新失败 gateway-recovery-verification（已关闭）
- [#147728](https://github.com/openclaw/openclaw/issues/147728) xAI OAuth 全量 426（版本头错误）— 无 PR，建议优先

**P1 精选**：
- [#170928](https://github.com/openclaw/openclaw/issues/170928) Windows 2026.10.2 启动 7–9 分钟
- [#172837](https://github.com/openclaw/openclaw/issues/172837) Codex 原生子代理 assignment 永不清理、跨线程重复重发
- [#156895](https://github.com/openclaw/openclaw/issues/156895) Agent 创建的自动化任务 20ms 内 fail-closed
- [#156925](https://github.com/openclaw/openclaw/issues/156925) / [#149153](https://github.com/openclaw/openclaw/issues/149153) Webchat 工具调用回合回复重复渲染（同一问题两报）

## 6. 功能请求与路线图信号

- [#81913](https://github.com/openclaw/openclaw/issues/81913) **稳定插件 SDK 公共接口**（skill 工作流）— 已有 linked PR open，生态建设核心诉求，很可能进入近期版本
- [#14785](https://github.com/openclaw/openclaw/issues/14785) 降低工具 schema 固定 token 开销（~3,500 tok/会话）— 2 月提出，持续活跃，成本敏感用户的普遍诉求
- [#162164](https://github.com/openclaw/openclaw/issues/162164) iOS/macOS 个人身份 opt-in 登录（保留 Shared owner）— 多客户端家庭场景
- **平台信号**：#179526 heartbeat 执行器退役表明 Automations 是确定性方向；#180007 的回滚重审流程暗示企业 MCP 授权将很快以新 PR 形式落地

## 7. 用户反馈摘要

- **Windows 用户体验明显劣化**：启动慢（7–9 分钟）、更新失败、SQLite 问题集中爆发，是负面反馈最密集的平台
- **低配/单 CPU 主机用户受困于资源回归**（#169797、#157989）：内存翻倍与 SSD 写入量对自托管用户是硬伤
- **"静默失败"是被反复提及的痛点**：消息丢失（#125764、#86034）、记忆保存假成功（#126906）、hook 静默停跑（#160470）——用户要求失败必须可见
- **满意面**：issue 分诊体系（P0–P2、impact 标签、rating 体系）运转细致；自动化 bug 报告（update failure reports）降低了上报门槛；维护者对 UI PR 审查响应快
- 渠道用户（Telegram/飞书/WhatsApp/QQ）对**投递可靠性**和**渠道长期支持**（如 [#150743](https://github.com/openclaw/openclaw/issues/150743) QQ 渠道接手停滞）高度关注

## 8. 待处理积压（请维护者关注）

| Issue/PR | 状态 | 呼吁 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) WAL 增长 | OPEN，9/09 至今，133 评论 | **最高优先**：数据层根因，牵连 #172091 |
| [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram 死信 | OPEN，8/18 至今 | 已有 fix-shape-clear 标记，请落地 PR |
| [#144291](https://github.com/openclaw/openclaw/issues/144291) 热重载中止回合 | OPEN，9/10 至今，needs-product-decision | 需产品拍板 |
| [#126906](https://github.com/openclaw/openclaw/issues/126906) 拒绝写工具静默禁用记忆 | OPEN，8/21 至今 | 数据完整性问题，应至少加启动告警 |
| [#157989](https://github.com/openclaw/openclaw/issues/157989) 插件捕获 SSD 磨损 | OPEN，9/25 至今 | 需要设计层面回应 |
| [#152804](https://github.com/openclaw/openclaw/issues/152804) minimax-portal 目录丢失 | OPEN（stale），9/19 至今 | regression + release-blocker，勿让 stale 掩盖 |
| PR [#101866](https://github.com/openclaw/openclaw/pull/101866) transcript media refs 校验 | OPEN，**7/07 至今**（3.5 个月） | XL 级安全相关修复，长期未审 |

**健康度小结**：吞吐与社区活跃优秀（日 500 issue / 500 PR 更新），UI 与架构现代化进展显著；但 9 月引入的资源类回归（内存、磁盘、启动）多周未闭环，P0 积压与 `needs-maintainer-review` 队列的消化速度是下一阶段的关键观察指标。

---

## 横向生态对比

# 个人 AI 智能体开源生态横向对比分析报告
**数据日期：2026-10-22**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处在一个“架构统一化 + 稳定性还债”并行的阶段：头部项目纷纷完成大版本架构合并（OpenClaw 的 Automations 迁移、Hermes 的 unified gateway runtime），将 CLI、Desktop、多渠道消息统一到单一网关运行时。社区交互量极大（两项目合计日 Issue 更新 800+、PR 更新 1000），表明智能体基础设施已进入真实生产使用阶段，反馈深度显著提升（成本、投递可靠性、安全审批等）。与此同时，两大项目都面临共同挑战：**大规模架构重构后的回归问题集中爆发**——内存/磁盘资源回归、启动阻塞、消息静默丢失成为高热度 Issue 的主体。生态整体基调是“功能扩张放缓、质量收敛优先”。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 266，关闭 234） | 322（新开/活跃 301，关闭 21） |
| **Issue 关闭率** | **~88%（234/266）** | **~7%（21/301）** ⚠️ |
| PR 更新（24h） | 500（待合并 265，合并/关闭 235） | 500（待合并 324，合并/关闭 176） |
| Release | v2026.10.10-beta.3（Windows 可靠性专项） | v0.22.3 + v0.22.4（双版本，620 PR 汇总） |
| 最热 Issue | #143524 SQLite WAL 阻塞（133 评论，P0） | #134889 unified gateway 追踪（212 评论，已关闭） |
| 最活跃贡献线 | Web UI Solid 迁移（@steipete 单日 10+ PR） | Gateway/凭证池/fallback 路由（@MariusWladkowski） |
| **健康度评估** | 吞吐平衡、分诊体系成熟，但 P0 数据层问题多周未闭环 | 开发吞吐极强但 Issue 净增长严重失衡，处于重构后收敛期 |

**结论**：OpenClaw 处于“高吞吐 + 相对健康”状态；Hermes 处于“发布冲刺 + 债务暴露”状态，Issue 关闭率 7% 是明显的健康警示信号。

---

## 3. OpenClaw 在生态中的定位

**优势**：
- **分诊与治理成熟**：P0–P2 + impact 标签 + rating 体系，issue 管理精细度高于 Hermes；#180007 主动回滚企业特性以待开放审查，治理流程规范。
- **社区吞吐平衡**：Issue 开/关比接近 1:1，维护响应能力健康；Hermes 同期净增 280 条。
- **渠道适配广度**：Telegram/飞书/WhatsApp/QQ 多渠道适配，覆盖中国生态（QQ、飞书），这是差异化护城河。

**技术路线差异**：
- OpenClaw 主线是 **Web UI 现代化（Solid 原生 actions/JSX）+ Windows 可靠性**；Hermes 主线是 **unified gateway runtime + 多模型凭证池/fallback 路由**。
- Hermes 在多供应商凭证调度（429 限流轮换、pool-bound 账号保持）上明显领先；OpenClaw 在渠道投递与桌面配置体验上投入更深。

**社区规模对比**：两者日 PR 活动量相当（均触 500 上限），但 OpenClaw 的讨论深度集中于数据层根因（SQLite/内存），Hermes 集中于架构合并后的行为一致性——前者是“存量问题”，后者是“新引入问题”。

---

## 4. 共同关注的技术方向

| 方向 | 具体诉求 | 涉及项目 |
|---|---|---|
| **消息投递可靠性** | 反静默失败：Telegram 死信无重试（OpenClaw #125764）、Feishu cron 100% 失败（Hermes #78975）、WhatsApp 群静默告警（Hermes #120051）——跨渠道“消息必须可见失败”是共性刚需 | 两者 |
| **内存/资源治理** | OpenClaw 内存泄漏群（#159662/#159596）、SSD 磨损（#157989）；Hermes Memory 每轮注入无预算（#135039）——自托管/低配用户对资源回归零容忍 | 两者 |
| **安全审批与权限边界** | Hermes smart approval 自动放行 osascript 致数据丢失（#141346）；OpenClaw 只读成员资料编辑安全审查（#179924）——“智能审批”的默认安全策略需收紧 | 两者 |
| **成本/Token 透明度** | OpenClaw 工具 schema 固定 ~3,500 tok/会话（#14785）；Hermes cache token 丢失致成本低报 7x（#71242） | 两者 |
| **桌面端打磨** | 流式回复重复渲染（OpenClaw #156925 / Hermes #127621）、启动稳定性 | 两者 |
| **会话/状态交接** | OpenClaw 热重载中止回合（#144291）；Hermes /seal 会话交接命令（#142790）——多实例/多 surface 会话连续性 | 两者 |
| **依赖安全** | Hermes simple-git/KaTeX 升级 + ~50 条 Python OSV 通告待清 | Hermes 为主 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| **功能侧重** | 多渠道消息中枢（Telegram/飞书/QQ）、插件/技能生态、Automations 编排 | Desktop-first、多模型凭证池、delegate/cron/A2A 高级编排 |
| **目标用户** | 自托管家庭/个人多渠道用户，含中文生态 | 重度桌面用户、多 provider 成本敏感的生产用户 |
| **技术架构** | Gateway + 渠道适配器层 + Solid Web UI；heartbeat → Automations 迁移中 | Unified gateway runtime 接管所有本地会话，跨 surface 单一状态源 |
| **发布节奏** | 稳定 beta 补丁（专项修复） | 快速冲刺（单日双版、620 PR 汇总） |
| **生态策略** | 开放插件 SDK 公共接口（#81913）；企业 MCP 授权（暂停重审） | ACP Registry / Zed / JetBrains 集成；webhook 签名方案 |

---

## 6. 社区热度与成熟度

- **快速迭代/冲刺阶段**：**Hermes Agent** —— 单日 176 PR 合并、双版本发布、v0.23.0 酝酿中；但 Issue 关闭率仅 7%，unified gateway 后续修复需求井喷，典型的“架构大迁移后消化期”。
- **质量巩固阶段**：**OpenClaw** —— 开闭比平衡、UI 重构与技术债清理双线推进；但 9 月引入的资源回归（WAL 1.4–2.8GB、内存 2.5×、启动 7–9 分钟）多周未闭环，`needs-maintainer-review` / `needs-product-decision` 队列消化速度是成熟度的真正考验。老 PR 积压（#101866 安全修复悬置 3.5 个月）暴露审查带宽瓶颈。
- **分层判断**：两项目热度同级（日交互均触上限），但 OpenClaw 社区运营更成熟（自动化 bug 报告降低上报门槛），Hermes 开发动能更强但社区债务管理滞后。

---

## 7. 值得关注的趋势信号

1. **“统一网关运行时”成为事实标准**：两大项目同期完成 CLI/Desktop/多渠道的单 gateway 收编，session state 一致性是落地后的核心战场（Hermes #134889 的 212 条评论即为佐证）。智能体开发者应预期“单进程多 surface”架构成为基线。
2. **静默失败是下一代核心议题**：消息丢失、记忆保存假成功、hook 静默停跑、日志停写——用户对“失败可见性”的要求已超过对功能的要求。**任何智能体系统都应优先建设可观测的失败路径。**
3. **智能审批安全边界将收紧**：Hermes osascript 事件表明，基于命令启发式的自动放行不可接受；预期行业将转向更保守的默认策略 + 显式风险分级。
4. **资源治理是自托管分水岭**：内存 2.5×、SSD 日写 6.5GB 这类回归直接决定低配用户留存；智能体框架需内置资源预算（如 Memory 注入配额、缓存写入节流）。
5. **成本可观测性成为差异化能力**：cache token 统计、固定 schema 开销（~3,500 tok/会话）被重度用户精确追踪，计费/成本透明度将是选型硬指标。
6. **多实例协作（A2A/会话交接）进入实践**：Hermes /seal 命令与 A2A task id 需求呼应 OpenClaw 的热重载回合保护——跨实例、跨 surface 的会话连续性是明确的下一战场。

**对开发者的建议**：关注两项目的 unified gateway 后续修复清单（Hermes #134889）与 OpenClaw 数据层根因修复（#143524/#172091），它们是同类系统设计的前车之鉴；若做选型，重渠道消息场景倾向 OpenClaw，重桌面/多模型路由场景倾向 Hermes，但两者当前都应等待稳定性收敛后再上生产关键路径。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-22

## 1. 今日速览

项目处于**高强度活跃期**：过去 24 小时 Issues 更新 322 条（新开/活跃 301，关闭 21），PR 更新 500 条（待合并 324，已合并/关闭 176），单日即发布 v0.22.3 与 v0.22.4 两个补丁版本。合并节奏极快——v0.22.3 汇总了自 v0.22.2 以来约 **620 个 PR**，显示主干处于发布冲刺状态（推测 v0.23.0 正在酝酿）。与此同时，Issue 净增长明显（关闭率仅 ~7%），社区在 unified gateway 架构合并后（#106742）暴露出大量后续修复需求，稳定性收敛是当前主要挑战。

## 2. 版本发布

### v0.22.4（2026-10-21）
- 补丁版本。**Desktop 端停止在 composer 上方显示 suggestion pills**，另含小型插件与 dashboard 修复。
- 覆盖 CLI/installer、Microsoft Store 应用、Docker 与 Hermes Cloud。

### v0.22.3（2026-10-21）
- 补丁版本，**将 v0.22.2 以来约 620 个合并 PR 打包为稳定版**。
- 完整精选 changelog 将随 v0.23.0 发布。
- **迁移提示**：该窗口含 unified gateway runtime（#106742）合并（Oct 14, commit `eb75627f`），涉及 gateway/session 架构变化，升级用户应关注 #134889 中的 post-merge 修复清单。

## 3. 项目进展

今日 176 个 PR 合并/关闭，重点方向：

- **Gateway / 运行时正确性**：一批来自 @MariusWladkowski 的高质量修复密集提交——显式指定 provider 时正确处理 fallback 链（[#142794](https://github.com/NousResearch/hermes-agent/pull/142794)）、默认 runtime 按配置模型解析（[#142793](https://github.com/NousResearch/hermes-agent/pull/142793)）、429 限流时先向凭证池请求轮换目标再等待（[#142792](https://github.com/NousResearch/hermes-agent/pull/142792)）——凭证池与 fallback 路由体系持续打磨。
- **会话状态安全**：拒绝会把存活 owner fence 掉的 epoch bump（[#142787](https://github.com/NousResearch/hermes-agent/pull/142787)），修复任意进程可 brick 存活 gateway 的风险。
- **Linux Desktop 启动稳定性**：GPU 进程崩溃时自动 `--disable-gpu` 重试（[#141279](https://github.com/NousResearch/hermes-agent/pull/141279)，已关闭，修复 #97616）。
- **依赖安全**：simple-git 3.36.0 → 4.0.2（critical，[#142783](https://github.com/NousResearch/hermes-agent/pull/142783)）、KaTeX → 0.18.4（[#142781](https://github.com/NousResearch/hermes-agent/pull/142781)）。
- **新能力**：`/seal` / `/unseal` 会话交接 slash 命令（[#142790](https://github.com/NousResearch/hermes-agent/pull/142790)）、BlockVectra MCP 目录条目（[#142668](https://github.com/NousResearch/hermes-agent/pull/142668)）、webhook 可配置签名方案（[#95068](https://github.com/NousResearch/hermes-agent/pull/95068)）。
- **Anthropic 凭证池**：预请求刷新时保持 pool-bound 账号（[#123361](https://github.com/NousResearch/hermes-agent/pull/123361)，P1，持续活跃中）。

## 4. 社区热点

- **[#134889](https://github.com/NousResearch/hermes-agent/issues/134889)**（212 评论，已关闭）：unified gateway runtime（#106742）合并后的追踪 issue，是全项目讨论焦点。涉及 session state、消息投递、Windows 兼容性、desktop/gateway 多面。诉求：单 gateway 接管所有本地会话后，各 surface 的行为一致性。
- **[#141346](https://github.com/NousResearch/hermes-agent/issues/141346)**（24 评论，OPEN）：**smart approval 模式自动放行了 osascript 命令**，操纵用户正在运行的 PowerPoint 并删除导出文件，造成不可恢复数据丢失。安全类 P3 标签但实际影响严重，是本周最具警示性的反馈——智能审批的命令风险分级需要收紧。
- **[#131055](https://github.com/NousResearch/hermes-agent/issues/131055)**（20 评论）：Linux Desktop 二次启动污染 sandbox fallback 标记，导致 sticky `--no-sandbox` 与渲染进程 SIGILL 循环。
- **[#127621](https://github.com/NousResearch/hermes-agent/issues/127621)** / **[#131238](https://github.com/NousResearch/hermes-agent/issues/131238)**（13/6 评论，8 👍）：Desktop 助手回复偶发重复渲染，流式气泡未正确 settle——桌面端流式渲染是高频痛点。
- **[#38519](https://github.com/NousResearch/hermes-agent/issues/38519)**（27 👍，6 月至今）：仅安装 Desktop 前端并直连远端 agent 的需求，长期高赞未决。

## 5. Bug 与稳定性（按严重度）

| 严重度 | 问题 | 状态 |
|---|---|---|
| P1 | [Discord 异步 delegate 完成后 durable result 卡 pending，父任务不恢复](https://github.com/NousResearch/hermes-agent/issues/139135) | OPEN，暂无明确 fix PR |
| P1 | [Windows 更新将 sandbox/外部 checkout 的 bin 目录写入共享 HKCU Path](https://github.com/NousResearch/hermes-agent/issues/135037) | 已关闭（已修复） |
| 安全 | [smart approval 自动放行 osascript 致用户数据丢失](https://github.com/NousResearch/hermes-agent/issues/141346) | OPEN，需重视 |
| P2 | [Windows gateway 因 ProcessRegistry 锁跨阻塞 IO 导致后端整体 wedge](https://github.com/NousResearch/hermes-agent/issues/130889)；同类 [#108327](https://github.com/NousResearch/hermes-agent/issues/108327)（Linux 端 `_move_to_finished` 持锁做磁盘 IO） | OPEN，process_registry 锁纪律是系统性问题 |
| P2 | [gateway.log 重启后静默停写](https://github.com/NousResearch/hermes-agent/issues/142036) | OPEN（昨日新报） |
| P2 | [Anthropic usage shim 丢弃 cache token，MoA 成本低报 ~7x](https://github.com/NousResearch/hermes-agent/issues/71242) | OPEN，长期未决 |
| P2 | [Buzz relay 静默 300s 被误判死亡周期性重连](https://github.com/NousResearch/hermes-agent/issues/101160) | OPEN |
| P2 | [DeepSeek 压缩摘要因输出预算不足截断](https://github.com/NousResearch/hermes-agent/issues/126305) | OPEN，needs-repro |
| P2 | [WeCom 跨进程 session lease 每 15s 刷屏](https://github.com/NousResearch/hermes-agent/issues/89166) | OPEN |
| 安全 | [依赖 pin 含约 50 条 OSV 安全通告（PyJWT/httpx2/urllib3/oauthlib）](https://github.com/NousResearch/hermes-agent/issues/134394) | OPEN；今日已有 simple-git/KaTeX bump PR，Python 侧待跟进 |

## 6. 功能请求与路线图信号

- **Memory 写入治理**（[#135039](https://github.com/NousResearch/hermes-agent/issues/135039)）：MEMORY.md/USER.md 每轮注入但无预算与准入测试——与项目成本优化方向一致，落地可能性高。
- **delegate_task 按任务级 model/reasoning_effort 覆盖**（[#88891](https://github.com/NousResearch/hermes-agent/pull/142792) 相关的凭证池/路由工作说明多模型路由是活跃开发线，此需求契合度高）。
- **ACP Registry 注册**（[#47435](https://github.com/NousResearch/hermes-agent/issues/47435)）：Zed/JetBrains/VS Code 集成入口，投入小收益大，适合近期纳入。
- **Desktop 前端独立安装**（[#38519](https://github.com/NousResearch/hermes-agent/issues/38519)，27 👍）：呼声最高的长期需求，needs-decision 状态久拖，建议维护者优先决策。
- **A2A 长任务返回 task id**（[#91687](https://github.com/NousResearch/hermes-agent/issues/91687)）：与今日 /seal 会话交接 PR（#142790）方向呼应，多实例协作是明显路线。

## 7. 用户反馈摘要

- **审批信任危机**：smart approval 被指对 osascript 等高危命令过于宽松（#141346），用户对"智能"审批的默认安全性期待很高。
- **桌面端体验**：回复重复渲染（#127621/#131238）、模型标签陈旧（#142037）、composer suggestion pills 被移除（v0.22.4 修复）——桌面端打磨是反馈密度最高的区域。
- **多平台网关投递不可靠**：Feishu cron 100% 失败（#78975）、WhatsApp 群静默变成警告消息（#120051）、Desktop cron 无回投路径（#83904）——消息投递链路是跨平台用户共同痛点。
- **成本透明度**：Anthropic cache token 丢失致成本低报 7 倍（#71242），重度用户对计费准确性敏感。
- **满意面**：社区对补丁发布节奏（单日两版、620 PR 汇总）反应正面；delegate/cron/A2A 等高级编排功能被真实生产场景使用并产生深度反馈。

## 8. 待处理积压

- **[#71242](https://github.com/NousResearch/hermes-agent/issues/71242)**（7 月至今）：Anthropic 成本低报 7x，计费正确性问题，长期未修。
- **[#38519](https://github.com/NousResearch/hermes-agent/issues/38519)**（6 月，27 👍）：前端独立安装，最高赞需求之一，needs-decision 超 4 个月。
- **[#84207](https://github.com/NousResearch/hermes-agent/issues/84207)**（8 月）：中断 turn 无任何用户反馈，交互体验黑洞。
- **[#76795](https://github.com/NousResearch/hermes-agent/issues/76795)**（8 月）：/skills pending 无分页无限增长。
- **[#134394](https://github.com/NousResearch/hermes-agent/issues/134394)**：Python 依赖安全通告 ~50 条待批量升级。
- **老 PR 悬置**：[#19749](https://github.com/NousResearch/hermes-agent/pull/19749)、[#19856](https://github.com/NousResearch/hermes-agent/pull/19856)（5 月 Discord 修复）、[#50139](https://github.com/NousResearch/hermes-agent/pull/50139)（6 月，本地模型 max_tokens 丢弃）、[#85342](https://github.com/NousResearch/hermes-agent/pull/85342)（8 月，Docker 配置漂移防护）均超两月未合并，建议维护者集中清理。

---
**健康度小结**：开发吞吐极强（单日 176 PR 合并、双版本发布），但 Issue 关闭率偏低（21/322），unified gateway 落地后的稳定性收敛与安全审批收紧是下一阶段关键。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*