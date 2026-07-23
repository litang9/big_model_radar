# OpenClaw 生态日报 2026-07-24

> Issues: 352 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-07-23 21:20 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

以下是 2026-07-24 OpenClaw 开源项目的动态日报。作为专注于 AI 智能体与个人助手领域的开源项目，OpenClaw 目前正处于高强度的迭代与底层架构重构期。

---

### 1. 今日速览
- **整体活跃度极高**：过去 24 小时内，项目处理了 352 条 Issue 动态（新开/活跃 257 条，关闭 95 条）以及高达 500 条 PR 动态（待合并 329 条，合并/关闭 171 条），社区交互与工程推进节奏极为紧凑。
- **底层架构重塑**：开发团队今日合并了多项重大重构 PR（尤其是 Cron 定时器和 Agent 依赖注入），这表明项目正在为更复杂的自动化和多智能体编排打地基。
- **稳定性挑战**：随着近期版本的更新（特别是 2026.7.x 系列），社区涌现了多个严重的回归问题（如网关启动失败、子任务结果静默丢失），修复工作正在密集展开。
- **无新版本发布**：今日无新版本发布，项目处于累积变更与测试阶段。

### 2. 版本发布
**无**。今日无新版本发布。

### 3. 项目进展
尽管没有新版本发布，但今日项目底层架构和功能向前迈出了一大步，核心 PR 进展如下：
- **自动化系统大统一**：合并了 [PR #113141](https://github.com/openclaw/openclaw/pull/113141)（重构超过 3000 行代码的 Cron 定时器生命周期）与 [PR #113135](https://github.com/openclaw/openclaw/pull/113135)（让 Cron 监控行接管 Heartbeat 节奏）。这标志着 OpenClaw 正式将心跳、监控和定时任务收拢为同一底层原语。
- **企业级协作与部署支持**：合并了 [PR #113127](https://github.com/openclaw/openclaw/pull/113127) 为控制台 UI 引入了会话草稿（Drafts UX）和管理员视角功能，进一步满足团队级安全部署需求。
- **安全与执行审批优化**：合并了 [PR #112946](https://github.com/openclaw/openclaw/pull/112946)（修复可重用的执行审批应用于已批准参数的问题），提升了本地工具执行的颗粒度控制。
- **修复合并阻力**：[PR #113136](https://github.com/openclaw/openclaw/pull/113136) 和 [PR #113142](https://github.com/openclaw/openclaw/pull/113142) 解决了系统 TUI 启动和 CI 依赖快照重建导致的主分支阻塞问题。

### 4. 社区热点
社区今日讨论最多的话题集中在**跨平台支持**与**多智能体/复杂任务编排的可靠性**：
1. **跨平台呼声最高**：[Issue #75](https://github.com/openclaw/openclaw/issues/75) (👍 80, 💬 115) 长期霸榜，社区强烈要求提供 Linux 和 Windows 版本的 Clawdbot 原生应用。
2. **子智能体协同失效**：[Issue #44925](https://github.com/openclaw/openclaw/issues/44925) (💬 22) 报告了子智能体完成后结果被“静默丢失”的编排漏洞，引发了关于超时重启机制的深入讨论。
3. **上下文窗口极度浪费**：[Issue #67419](https://github.com/openclaw/openclaw/issues/67419) (💬 9) 指出系统每个轮次都会重新注入大量 Bootstrap 文件，导致 Token 消耗虚高，这直接触及了 AI 助手使用者的“成本痛点”。
4. **统一的自动化构想**：维护者 @steipete 提出 [Issue #110950](https://github.com/openclaw/openclaw/issues/110950) “Everything is a cron”，意在彻底重构现有的自动化概念，此提议获得了积极的架构探讨。

### 5. Bug 与稳定性
今日报告了多个影响生产环境的严重 Bug 和回归问题，目前大部分已有对应修复 PR 正在推进：
- **P0 / 严重阻塞**：
  - [Issue #108435](https://github.com/openclaw/openclaw/issues/108435)：升级到 2026.7.1 后网关无法启动的严重回归 ( Regression / Crash-loop )，阻断了用户的正常使用。
  - [Issue #90378](https://github.com/openclaw/openclaw/issues/90378)：从 5.28 升级到 6.1 时，Cron 存储静默迁移至 SQLite 但配置丢失，导致频道报错。
- **P1 / 核心功能失效**：
  - [Issue #108580](https://github.com/openclaw/openclaw/issues/108580)：2026.7.1 版本的 Cron 工具 schema 与 `llama.cpp` 冲突，导致所有聊天请求失败（已提关联 PR）。
  - [Issue #94228](https://github.com/openclaw/openclaw/issues/94228)：使用 Anthropic 原生 API 时，长对话重放历史 `thinking` 区块导致会话永久卡死报 400 错误。
- **数据与消息丢失**：
  - [Issue #44925](https://github.com/openclaw/openclaw/issues/44925)：子智能体任务超时后无重试、无通知直接丢失。
  - [Issue #94536](https://github.com/openclaw/openclaw/issues/94536)：前序修复未彻底解决承诺标记为 'sent' 但未真正投递的问题。

### 6. 功能请求与路线图信号
结合当前的 Feature Request 与已推进的 PR，可以洞察 OpenClaw 未来的演进方向：
- **记忆与状态管理（Memory MVP）**：[Issue #42648](https://github.com/openclaw/openclaw/issues/42648) 和 [Issue #42651](https://github.com/openclaw/openclaw/issues/42651) 正在规划记忆系统的写入管道、去重和 CLI 接口，预示 OpenClaw 正在构建真正的长期记忆系统。
- **技能权限清单标准**：[Issue #12219](https://github.com/openclaw/openclaw/issues/12219) 提出建立类似 Android 的 `skill.yaml` 权限清单标准，以解决第三方技能可能带来的凭证窃取等安全风险。结合今天合并的 Exec 审批优化 PR，**安全性加固**将是下个版本的重头戏。
- **系统提示词瘦身与上下文优化**：响应 [Issue #67419](https://github.com/openclaw/openclaw/issues/67419)，[PR #113145](https://github.com/openclaw/openclaw/pull/113145) 和 [PR #113086](https://github.com/openclaw/openclaw/pull/113086) 正在努力优化压缩超时和数据库结构，降低不必要的 Token 消耗。

### 7. 用户反馈摘要
从 Issue 评论区可以提炼出当前用户的真实使用体感：
- **场景广泛**：大量用户依赖 OpenClaw 接入 Telegram、Discord、微软 Teams 甚至飞书，作为多渠道的个人或企业 AI 中心。
- **痛点：“静默失败”最败好感**：无论是 WhatsApp 图片第二次读取失败（[Issue #88362](https://github.com/openclaw/openclaw/issues/88362)），还是 Discord 消息静默丢弃（[Issue #48641](https://github.com/openclaw/openclaw/issues/48641)），用户对“没有任何报错但功能就是不工作”表现出强烈挫败感。
- **痛点：架构升级带来的阵痛**：重度用户（如配置了 4GB+ 数据库的本地部署者）在版本升级时遭遇了诸多阻碍（如 [Issue #42273](https://github.com/openclaw/openclaw/issues/42273) 备份卡死）。
- **好评点**：高级用户非常欣赏其高度的自定义能力和多模型回退机制（Fallback），并积极分享部署实践。

### 8. 待处理积压
以下标记为 `stale` 或长期需人工干预的高优 Issue/PR 提醒维护者重点关注：
- **安全问题悬而未决**：[Issue #7540](https://github.com/openclaw/openclaw/issues/7540) 订阅 WhatsApp 通话事件，长期等待维护者审查。
- **多智能体并发瓶颈**：[Issue #43374](https://github.com/openclaw/openclaw/issues/43374) 多 Agent 并发时导致 LLM API 集体超时的内部瓶颈问题，长期处于需要现场重现的状态。
- **API 阻断问题**：[Issue #94228](https://github.com/openclaw/openclaw/issues/94228) 涉及 Anthropic `thinking` 签名验证的问题由于需要较深排错，进展缓慢。
- **体验优化积压**：如 [Issue #41949](https://github.com/openclaw/openclaw/issues/41949) 浏览器工具一把梭导致上下文瞬间耗尽的问题，亟待确立截断与摘要策略。

---

## 横向生态对比

以下是基于 2026 年 7 月 24 日 OpenClaw 与 Hermes Agent 开源项目动态生成的横向对比分析报告。

---

### 1. 生态全景
当前（2026年中），个人 AI 助手与自主智能体开源生态正处于**底层架构重塑与工程化深水区**。项目的核心竞争维度已从单纯的“模型接入能力”全面转向**多智能体编排、跨平台一致性与长期记忆系统**的构建。随着生产环境实践的深入，社区的重心正在向**极致的 Token 成本优化（上下文压缩、Prompt 缓存）**与**自动化执行的安全边界**倾斜。整个生态呈现出极高的迭代活力，但也普遍面临着因架构激进演进带来的稳定性阵痛。

### 2. 各项目活跃度对比
整体来看，两个头部项目均处于极高强度的工程推进期，且均在今日选择“蓄力”而未发布新版本，侧重于底层代码的重构与 Bug 修复。

| 项目名称 | Issue 动态 (新开/活跃) | Issue 关闭 | PR 动态 (待合并) | PR 合并/关闭 | Release 状态 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 257 | 95 | 329 | 171 | 无 (累积测试) | ⚠️ 极度活跃，但面临 P0 级回归挑战 |
| **Hermes Agent**| 242 | 86 | 233 | 267 | 无 (迭代修缮) | ✅ 极度活跃，工程吞吐量极高，重心在多端适配 |

### 3. OpenClaw 在生态中的定位
相较于 Hermes Agent，**OpenClaw 的定位更偏向于“企业级与重度自动化编排基础设施”**。
*   **技术路线差异**：OpenClaw 正在进行底层的“大一统”重构（如提出 "Everything is a cron"，将心跳、监控、定时任务统一为底层原语），展现出极强的系统级抽象野心。而 Hermes Agent 更侧重于横向的生态兼容（如多模型适配、Slack/Telegram 等多渠道网关）。
*   **核心优势**：OpenClaw 拥有高度自定义的多模型回退机制（Fallback）和正在成型的细颗粒度执行审批机制，更适合作为企业内多渠道（Teams/飞书等）的统一 AI 中枢。
*   **社区规模对比**：两者的绝对活跃度（单日 Issue/PR 总量）不相上下，但 OpenClaw 的社区讨论更聚焦于**系统架构与高并发痛点**（如 4GB+ 数据库本地部署、多 Agent 并发瓶颈），重度技术玩家比例较高。

### 4. 共同关注的技术方向
从两侧的动态中，可以清晰地提取出当前 AI 智能体领域面临的四大共性挑战：
1.  **上下文窗口与 Token 极度浪费 (OpenClaw, Hermes Agent)**：
    *   *OpenClaw*：每轮次重复注入 Bootstrap 文件导致 Token 消耗虚高。
    *   *Hermes Agent*：开启 50+ 工具硬性消耗 3.5k-5k Token，正探讨“两遍式工具注入”。
2.  **长期记忆的模块化与隔离 (OpenClaw, Hermes Agent)**：
    *   *OpenClaw*：正在构建 Memory MVP（写入管道、去重机制）。
    *   *Hermes Agent*：推进按聊天源的记忆隔离，以及外部记忆提供商的模块化接入。
3.  **跨平台/多网关上下文一致性 (OpenClaw, Hermes Agent)**：
    *   *OpenClaw*：用户依赖其接入 TG/Discord/飞书，但频现静默丢消息问题。
    *   *Hermes Agent*：强烈诉求打破网关孤岛，实现 CLI ↔ Telegram 共享同一 Agent 记忆。
4.  **本地工具执行的供应链安全 (OpenClaw, Hermes Agent)**：
    *   *OpenClaw*：规划类似 Android 的 `skill.yaml` 权限清单，防范凭证窃取。
    *   *Hermes Agent*：紧急修复通过 `sh -c` 绕过命令审批的安全漏洞。

### 5. 差异化定位分析
*   **功能侧重**：
    *   **OpenClaw** 侧重于 **“系统级自动化与调度”**，致力于解决复杂任务流中的依赖注入、定时任务生命周期和子智能体超时重启。
    *   **Hermes Agent** 侧重于 **“用户体验与可观测性”**，投入大量精力在桌面端 UI 修复、本地 RAG 内置化、以及基于 NeMo Relay 的全链路 Debug 追踪上。
*   **目标用户**：
    *   **OpenClaw**：适合需要深度定制、进行大规模本地数据库部署及多渠道企业分发的**高级开发者和架构师**。
    *   **Hermes Agent**：更适合注重跨端体验（桌面端/IM端联动）、依赖多模型 API 池（如 OpenAI/小米 MiMo 等）的**个人极客和效率工具使用者**。

### 6. 社区热度与成熟度
两个项目目前均处于**快速迭代的稳态上升期**，单日交互量均突破 800+，但在成熟度阶段上略有差异：
*   **Hermes Agent（质量巩固期）**：今日 PR 的合并/关闭比（267）高于待处理比（233），显示出极强的工程收敛能力。目前的痛点集中在跨平台 UI 表现（如桌面端卡死、标签页串流）和大文件传输上，属于应用层的成熟度打磨。
*   **OpenClaw（架构阵痛期）**：面临近期激进重构带来的反噬，出现了多个阻断生产的 P0 级回归 Bug（如网关启动失败、SQLite 配置静默丢失）。社区虽然极其活跃，但用户对“静默失败”表现出强烈的挫败感，急需在下一个版本中稳固底层架构。

### 7. 值得关注的趋势信号
对于 AI 智能体开发者和决策者，本次动态释放了以下强烈的行业信号：
1.  **“Token 经济学”成为第一架构约束**：随着工具链的延长，Schema 占用 Token 过多正在实质性地拖垮本地推理的延迟和云端成本。**延迟加载**和**动态压缩上下文**将是下一阶段智能体框架的核心特性。
2.  **“静默失败”是 Agent 落地的最大体验杀手**：无论是子任务结果丢失，还是 IM 端媒体文件发送失败无反馈，Agent 缺乏“异常自省与上报”能力会严重摧毁用户信任。建立强健的 **可观测性与全链路追踪**（如 Hermes 集成 Source maps）迫在眉睫。
3.  **记忆范式从“无状态 RAG”向“有状态隔离”演进**：简单的文档挂载已不能满足需求，未来的 Agent 需要像操作系统一样，管理多进程（多 Tab/多会话）下的记忆隔离与状态持久化。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

这份报告为您梳理了开源 AI 智能体项目 **Hermes Agent** (github.com/NousResearch/hermes-agent) 在 2026-07-24 的各项动态。

---

### 👑 Hermes Agent 项目动态日报 (2026-07-24)

#### 1. 今日速览
Hermes Agent 项目在过去 24 小时内展现出极高的社区活跃度与工程推进效率。项目共处理了 **328 条** Issue 动态（242 条活跃/新开，86 条关闭）以及 **500 条** PR 动态（233 条待处理，267 条合并/关闭）。尽管今日没有发布新版本，但核心贡献者与社区开发者在底层性能优化（如 Prompt 缓存、Token 开销控制）、跨平台集成（如 Slack/Telegram）以及多智能体架构上进行了密集的代码提交与架构讨论。整体项目处于极速迭代的稳态上升期。

#### 2. 版本发布
**无新版本发布**。

#### 3. 项目进展
今日项目合并/关闭了大量 PR 和 Issue，向前迈出了坚实的一步，重点修复了底层兼容性、API 适配及桌面端体验问题：
*   **网关与平台适配器修复：** 修复了 Slack 平台不支持新版 Block Kit Markdown 导致格式错乱的问题 ([Issue #8552](https://github.com/NousResearch/hermes-agent/issues/8552))；修复了小米 MiMo 模型在思考模式下 `reasoning_content` 回显导致的 400 错误及无限重试 ([PR #24784](https://github.com/NousResearch/hermes-agent/pull/24784))。
*   **核心会话与稳定性：** 修复了 MoA（混合智能体）在静默模式下流式收集丢失 `tool_calls` 导致 `empty_response_exhausted` 崩溃的严重 Bug ([Issue #58437](https://github.com/NousResearch/hermes-agent/issues/58437))；解决了 OpenAI-codex 凭据池错误标记健康账号触发限制的问题 ([Issue #43747](https://github.com/NousResearch/hermes-agent/issues/43747))。
*   **桌面端与 UI 修复：** 解决了近期更新后助手消息重复渲染两遍的问题 ([Issue #63679](https://github.com/NousResearch/hermes-agent/issues/63679))；重构了 Slack DM 发送逻辑 ([Issue #19236](https://github.com/NousResearch/hermes-agent/issues/19236))。

#### 4. 社区热点
今日社区讨论极为热烈，核心焦点集中在**资源开销控制**与**跨平台上下文一致性**上：
*   🔥 **[最高热度] 延迟工具 Schema 加载以减少 Token 开销** ([Issue #6839](https://github.com/NousResearch/hermes-agent/issues/6839)，30 评论)：开发者指出，目前开启 50+ 工具每次调用会硬性消耗 3.5k-5k Token。社区正在热烈讨论“两遍式工具注入”方案的可行性。这反映了重度用户在成本和本地模型推理延迟上的强烈痛点。
*   🛠 **跨平台会话上下文共享 (CLI ↔ Telegram 等)** ([Issue #4335](https://github.com/NousResearch/hermes-agent/issues/4335)，9 评论)：用户希望打破网关间的信息孤岛，实现 CLI 与 Telegram 共享同一个 Agent 记忆与状态。
*   🧠 **基于知识库的 RAG 系统内置化** ([Issue #844](https://github.com/NousResearch/hermes-agent/issues/844)，8 评论)：由核心成员提出，希望将本地文档目录索引、混合检索作为原生能力内置，不再依赖外部脆弱的挂载。

#### 5. Bug 与稳定性
今日报告了多个影响生产稳定性的 Bug，按严重程度排列如下：
*   **[P0 级 / 待合并] Prompt 缓存与 GPT-5.5 兼容性：** 发现对话循环中的消息归一化破坏了 Prompt 缓存的前缀匹配，导致本地推理无法复用 KV Cache ([PR #68085](https://github.com/NousResearch/hermes-agent/pull/68085))；同时 GPT-5.5 系列模型未正确设置 24h 缓存保留策略，导致命中率极低 ([PR #70083](https://github.com/NousResearch/hermes-agent/pull/70083))。
*   **[P1 级 / 严重体验阻断] macOS 27 桌面端卡死：** 发送约 5 条消息后桌面应用完全冻结，甚至设置面板也无响应 ([Issue #63047](https://github.com/NousResearch/hermes-agent/issues/63047))。
*   **[P2 级 / 数据错乱] 桌面端多标签页会话泄漏：** 多开聊天标签页时，A 标签页的消息内容会串改进 B 标签页，严重破坏对话上下文 ([Issue #59305](https://github.com/NousResearch/hermes-agent/issues/59305))。
*   **[P2 级 / 计费与状态] 会话成本重置 Bug：** 网关重启后，SQLite 未正确恢复 `session_estimated_cost_usd`，导致计费展示归零 ([Issue #67762](https://github.com/NousResearch/hermes-agent/issues/67762))。

#### 6. 功能请求与路线图信号
结合近期提交的 PR，项目接下来的路线图信号非常清晰：
*   **可观测性与监控大升级：** 正在进行中的 [PR #67607](https://github.com/NousResearch/hermes-agent/pull/67607) 集成了 NeMo Relay 运行时，结合 [PR #70305](https://github.com/NousResearch/hermes-agent/pull/70305) 为桌面端注入 Source maps 和 Debug 追踪，表明项目正大幅强化 Agent 调试与生命周期追踪能力。
*   **记忆系统隔离与融合：** 用户强烈要求按聊天源进行**记忆隔离** ([Issue #28279](https://github.com/NousResearch/hermes-agent/issues/28279))。同时，[PR #70309](https://github.com/NousResearch/hermes-agent/pull/70309) 正在尝试将外部记忆提供商条目接入学习轨迹图，暗示“模块化记忆后端”将是未来核心发力点。
*   **安全边界强化：** 提交了修复通过 `sh -c` 等包装器绕过核心命令审批拦截的漏洞 ([PR #58742](https://github.com/NousResearch/hermes-agent/pull/58742))，说明团队在 Agent 自动化执行命令的安全性上查漏补缺。

#### 7. 用户反馈摘要
*   **痛点 - 桌面端体验割裂：** 桌面端近期引入了诸多小 Bug（如：切换模型导致用户消息重复堆叠 [#67603](https://github.com/NousResearch/hermes-agent/issues/67603)、MacBook 唤醒时强制抢占前台焦点 [#67001](https://github.com/NousResearch/hermes-agent/issues/67001)），用户对 Electron 客户端的稳定性抱怨有所增加。
*   **痛点 - IM 平台大文件传输：** Telegram 适配器在发送 15MB 以上媒体文件时必定超时 ([Issue #62936](https://github.com/NousResearch/hermes-agent/issues/62936))，且在静默模式下用户发送图片会被网关直接丢弃 ([PR #70303](https://github.com/NousResearch/hermes-agent/pull/70303))，对多模态场景造成阻碍。
*   **满意点 - 配置与备份诉求：** 用户对 Agent 数据（如 `~/.hermes/` 下的记忆与技能）非常看重，呼吁内置自动备份与版本控制功能 ([Issue #12238](https://github.com/NousResearch/hermes-agent/issues/12238)，19 👍），侧面反映了用户将 Hermes

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*