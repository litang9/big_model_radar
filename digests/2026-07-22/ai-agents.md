# OpenClaw 生态日报 2026-07-22

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-07-21 21:32 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

以下是 OpenClaw 开源项目 2026-07-22 的项目动态日报：

### 1. 今日速览
OpenClaw 今日保持极高的活跃度，过去 24 小时内共处理了 **500 条 Issues 更新**（其中 110 条被关闭）和 **500 条 PR 更新**（其中 158 条被合并或关闭），且无新版本发布。项目当前的重心明显集中在**跨端体验深度优化（Web/Android/iOS/MacOS）**、**底层状态与内存管理重构**以及**安全沙箱隔离机制**的完善上。庞大的 PR 吞吐量和细致的 Bug 追踪表明项目正处于健康且快速迭代的阶段，但用户对长会话稳定性和 API 密钥安全的呼声正在急剧上升。

### 2. 版本发布
**今日无新版本发布。** 当前社区主要围绕 `2026.7.1` 版本进行兼容性修复、安全补丁更新与功能蓄水。

### 3. 项目进展
今日共有 158 个 PR 被合并或关闭，项目在多端体验和底层健壮性上迈出了一大步：
*   **跨端交互大幅补齐**：合并了 Android 端的聊天回溯/分叉功能及分支切换器 ([PR #112284](https://github.com/openclaw/openclaw/pull/112284))，大幅提升了移动端的多线索工作流体验。
*   **UI 与任务流重构**：优化了 Web 端 Coding Agent 的会话展示 ([PR #112354](https://github.com/openclaw/openclaw/pull/112354))，并合入了受信任的 TaskFlow 审查编排功能 ([PR #112422](https://github.com/openclaw/openclaw/pull/112422))，增强了 Agent 任务流的可靠性。
*   **安全与依赖修复**：快速响应并修复了上游依赖的安全漏洞（如 `fast-uri` 主机混淆和 `jaeger` 拒绝服务漏洞）([PR #112403](https://github.com/openclaw/openclaw/pull/112403))。

### 4. 社区热点
今日讨论最为激烈的 Issue 集中在**安全隐私**与**底层状态损坏**：
*   **API 密钥防泄漏机制** ([Issue #10659](https://github.com/openclaw/openclaw/issues/10659)，15 评论)：用户强烈要求引入 "Masked Secrets" 机制。当前 Agent 极易通过提示词注入读取到 `.env` 中的明文 API 密钥，社区呼吁允许 Agent "调用但不查看"密钥。
*   **macOS SQLite 状态库损坏** ([Issue #101290](https://github.com/openclaw/openclaw/issues/101290)，13 评论)：这是一个 P0 级严重回归 Bug。在 macOS 环境下，网关运行期间执行 CLI 健康检查会导致 `openclaw.sqlite` 数据库损坏（"database disk image is malformed"），引发严重的数据丢失恐慌。
*   **子代理 MCP 工具丢失** ([Issue #85030](https://github.com/openclaw/openclaw/issues/85030)，11 评论)：用户反馈通过 `sessions_spawn` 生成的子代理无法继承 MCP 工具，导致子代理处于"裸奔"状态。

### 5. Bug 与稳定性
按严重程度排列今日报告的关键 Bug：
*   **[P0] 状态库致命损坏**：macOS 上 CLI 预检破坏运行中的 SQLite 数据库， vanilla SQLite 无法复现，属于 OpenClaw 特有的回归问题 ([Issue #101290](https://github.com/openclaw/openclaw/issues/101290))。
*   **[P1] Active Memory 导致网关阻塞**：开启 `active-memory` 并使用 Codex 后端时，导致严重的响应延迟、Hook 超时和事件循环停滞 ([Issue #86996](https://github.com/openclaw/openclaw/issues/86996))。
*   **[P1] 长对话工具参数静默丢弃**：在进行 15+ 轮深度对话后，`write` 和 `exec` 工具会静默丢弃所有参数，导致 Agent 执行动作直接失败 ([Issue #53408](https://github.com/openclaw/openclaw/issues/53408))。
*   **[P1] 本地 llama.cpp 解析失败**：2026.7.1 版本下，任何本地 llama.cpp 提供商均报 400 自动解析生成错误 ([Issue #106779](https://github.com/openclaw/openclaw/issues/106779))。

### 6. 功能请求与路线图信号
结合社区需求与当前已打开的 PR，以下方向极有可能被纳入下一阶段路线图：
*   **系统级安全与隔离防线**：用户对沙箱需求爆发，包括文件系统沙箱配置 ([Issue #7722](https://github.com/openclaw/openclaw/issues/7722)) 和基于能力的工具权限默认拒绝机制 ([Issue #12678](https://github.com/openclaw/openclaw/issues/12678))。目前已有相关安全重构 PR 正在进行审核。
*   **上下文成本优化**：由于每次会话加载完整工具 JSON Schema 会额外消耗约 3,500 Token，用户呼吁缩减 Schema 体积 ([Issue #14785](https://github.com/openclaw/openclaw/issues/14785))。
*   **多渠道协议跟进**：Telegram Business Bot 接入请求 ([Issue #20786](https://github.com/openclaw/openclaw/issues/20786)) 及 WhatsApp 消息撤回功能 ([Issue #14344](https://github.com/openclaw/openclaw/issues/14344))，已有相关 Linked PR 开启。

### 7. 用户反馈摘要
*   **痛点（状态易失与级联故障）**：用户反馈在进行复杂多代理编排时极其脆弱，子代理任务完成后的原始输出被错误地直接发给用户 ([Issue #90840](https://github.com/openclaw/openclaw/issues/90840))，且子代理广播抑制机制不完善，极易造成消息轰炸。
*   **痛点（配置与迁移难）**：初始化向导缺乏关键引导，用户经常漏配 Memory/Embedding 导致跨会话记忆失效 ([Issue #16670](https://github.com/openclaw/openclaw/issues/16670))；同时缺乏有效的备份/恢复工具，灾难恢复极难操作 ([Issue #13616](https://github.com/openclaw/openclaw/issues/13616))。
*   **肯定（平台广度）**：用户对 OpenClaw 能够广泛接入各种 LLM 和几乎所有的通讯渠道（Slack, Discord, 飞书, Telegram 等）表示高度认可，并正积极尝试将其部署到企业级生产环境（如请求提供 AWS 部署指南 [Issue #13597](https://github.com/openclaw/openclaw/issues/13597)）。

### 8. 待处理积压
以下重要内容已长时间未得到有效代码合并，需维护者重点关注：
*   **[超大型重构 PR 待审] 架构精简第三期** ([PR #111527](https://github.com/openclaw/openclaw/pull/111527))：涉及全频道、全扩展（数十个模块）的配置表面缩减重构，标记为 XL 规模及兼容性风险，目前正等待维护者审查批准，此 PR 将极大影响后续架构走向。
*   **[高优修复 PR 积压] Slack 记忆断层** ([PR #102594](https://github.com/openclaw/openclaw/pull/102594))：解决 Agent 在 Slack 中会遗忘近期回复的上下文问题，虽已标记为 P1 且 Ready for Review，但已停滞多日未合并。
*   **[安全问题积压] 飞书插件权限越权** ([Issue #13751](https://github.com/openclaw/openclaw/issues/13751))：飞书插件当前强行要求读取全公司通讯录的敏感权限（`contact:contact.base:readonly`）才能解析发件人名字，用户呼吁使用替代方案以降低企业部署的安全阻力。

---

## 横向生态对比

以下是基于 2026 年 7 月 22 日 OpenClaw 与 Hermes Agent 开源项目动态的横向对比分析报告：

### 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于**从“单体功能验证”向“企业级多平台生产部署”跨越的关键拐点**。生态内的核心矛盾已从早期的“模型能力接入”转变为**“安全隔离、复杂状态持久化与跨端体验割裂”**。开发者对智能体的诉求不再局限于对话流畅度，而是向高并发下的数据完整性（防数据库损坏）、系统级安全防线（API密钥防注入）以及极简的部署运维倾斜。此外，随着智能体编排日益复杂，**“Token 成本工程”**（如精简工具 Schema）正在成为底层架构设计的核心考量。

### 2. 各项目活跃度对比
两个项目均表现出极高的社区热度，单日处理的总动态量（Issue+PR）均突破 800 大关，但当前的生命周期侧重点略有不同。

| 项目名称 | Issue 动态 (活跃/关闭) | PR 动态 (合并/关闭) | Release 发布 | 健康度与迭代特征评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 条 (约 390/110) | 500 条 (158/合并关闭) | 无 (停留在 2026.7.1) | **快速扩张期**：重心在跨端交互补齐（特别是移动端）与严重 P0 级数据安全 Bug 修复，PR 吞吐量极大。 |
| **Hermes Agent** | 312 条 (262/50) | 500 条 (123/合并关闭) | 无 (无新版本) | **架构重构期**：正经历底层架构与插件系统重构，清偿技术债务（并发竞态、状态机修复），为 V1.0 大版本蓄水。 |

### 3. OpenClaw 在生态中的定位
*   **核心优势（全渠道与企业级就绪）**：OpenClaw 展现出了极强的“通讯中枢”特质，支持几乎所有的主流通讯渠道（Slack, Discord, 飞书, Telegram 等）。相比同类项目，其更早地直面并尝试解决企业级部署的痛点（如接入 AWS 指南、飞书权限合规）。
*   **技术路线差异（重编排与移动优先）**：OpenClaw 是目前少有的将 Android/iOS 端的“多线索工作流（聊天回溯/分叉）”推进到深度优化阶段的项目。它侧重于复杂多代理编排下的前端表现（TaskFlow 审查），而不仅仅是一个后端开发框架。
*   **社区规模对比**：虽然两者活跃度处于同一量级，但 OpenClaw 的社区讨论更偏向于**终端使用者与运维者**（如灾难恢复、状态损坏恐慌），而 Hermes 则更多聚焦于**平台开发者与极客**。

### 4. 共同关注的技术方向
底层技术的趋同正在两个项目中同时上演，主要集中在以下三大领域：
*   **Token 消耗极致优化**：由于大模型上下文窗口的固有成本，过大的工具 JSON Schema 正在拖垮智能体。
    *   *OpenClaw*：用户呼吁缩减每次加载消耗约 3,500 Token 的完整 Schema 体积。
    *   *Hermes Agent*：面临 30+ 工具消耗约 14,000 Tokens 的严重痛点，社区提出“混合工具预选”（基于 RAG 动态注入 Schema）。
*   **底层持久化与并发稳定性**：SQLite 等轻量级数据库在智能体高频读写下面临巨大挑战。
    *   *OpenClaw*：遭遇 P0 级 CLI 健康检查导致数据库损坏的致命回归。
    *   *Hermes Agent*：正紧急修复上下文压缩时的父节点 WAL 竞态，以及多进程访问导致的索引损坏。
*   **系统级安全与数据隐私防线**：防止 Agent “越权”或“泄密”成为共识。
    *   *OpenClaw*：强烈要求引入 API 密钥脱敏（"调用但不查看"）和文件系统沙箱。
    *   *Hermes Agent*：推进日志与缓冲区的强制信息脱敏，并呼吁“不可变技能”以防 Agent 篡改安全规则。

### 5. 差异化定位分析
| 维度 | OpenClaw | Hermes Agent |
| :--- | :--- | :--- |
| **功能侧重** | **多渠道集成与跨端工作流**：侧重于将 Agent 无缝接入各类 IM（飞书/WhatsApp），并实现在 Web/移动端的一致体验。 | **插件生态与网关解耦**：侧重于向“平台型 Agent”演进，通过标准化的 Gateway 和 Plugin 支撑复杂工作流。 |
| **目标用户** | 面向**企业级部署者与重度多端用户**，解决业务流自动化与消息接入问题。 | 面向**平台开发者与极客玩家**，解决定制化工作流、加密通讯对接（如 Matrix, X Chat）需求。 |
| **技术架构** | 状态机高度集成，强依赖 SQLite 本地化状态，通过子代理进行任务分发。 | 架构高度模块化，推行“瘦客户端”+ 远程运行时，后台采用复杂的并发控制（如 `BEGIN IMMEDIATE`）。 |

### 6. 社区热度与成熟度
*   **处于快速迭代与功能蓄水阶段（OpenClaw）**：日均合并 158 个 PR，说明项目像一块海绵，正在迅速吸收社区功能并缝合各端体验。但由于架构极速扩张，已暴露出长会话静默丢弃参数、子代理广播抑制失败等**级联故障**，质量处于“边跑边换轮子”的状态。
*   **处于质量巩固与债务清理阶段**：合并了 123 个 PR，高度聚焦于修复底层竞态、计费模块修复和提供商兼容性。其积压的巨型架构 PR（如 CI 迁移至 GKE）表明项目正在进行大版本发布前的基础设施加固。

### 7. 值得关注的趋势信号
对于 AI 智能体开发者与技术决策者，今日的社区动态释放了强烈的行业演进信号：
1.  **“瘦客户端”将成为桌面端标配**：用户对强制在本地引导庞大 Agent 运行时（如 Hermes 当前现状）感到厌倦。将重计算和长记忆放归云端/服务器，客户端仅作展示与加密通讯入口，是下一步的必然设计。
2.  **安全机制需从“被动防御”转向“底层隔离”**：单纯的 Prompt 约束已无法阻止注入攻击。未来的智能体必须原生支持“密钥盲调”机制以及文件系统级的沙箱隔离（OS-level Sandboxing）。
3.  **端到端加密（E2EE）社交平台接入需求爆发**：随着 Agent 处理的数据越来越私密，类似 X Chat 加密私信、Matrix E2EE 等强加密通讯协议的插件化接入，将成为高端 Agent 项目的分水岭。
4.  **多代理记忆孤岛亟待打破**：无论是 OpenClaw 的状态库损坏，还是 Hermes 的“跨平台会话上下文共享（CLI ↔ Telegram）”长期积压，都表明**实现跨设备、跨渠道的连续性上下文记忆**是明年智能体基础设施攻坚的核心高地。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

以下是 **Hermes Agent** 项目 2026-07-22 的动态日报。本期报告基于过去 24 小时的 312 条 Issue 更新（262 活跃/50 关闭）与 500 条 PR 更新（377 待合并/123 已合并关闭）进行深度分析。

---

### 1. 今日速览
Hermes Agent 项目今日维持着极高的热度与活跃度，Issue 与 PR 更新总量突破 800 大关，社区贡献热情空前。项目当前正处于**底层架构与插件生态大重构的关键阶段**，核心团队（如 @teknium1）正集中梳理 Plugin 生命周期与多平台网关扩展。在稳定性方面，大量关注点集中在**桌面端会话状态管理（Session State）、内存数据库并发（WAL）以及提供商 API 兼容性（如 xAI, Ollama）**上。今日共有 123 个 PR 被合并或关闭，证明维护团队在推进新功能的同时，正强力清偿技术债务。

### 2. 版本发布
**本日无新版本发布（0 个 Release）。** 
*注：结合近期高频的底层架构调整（如压缩机制重构、计费模块修复），推测项目正在为下一个大版本（可能是 v0.19.x 或 v1.0 候选版）进行代码冻结前的密集测试与修整。*

### 3. 项目进展
今日共有 123 个 PR 被合并或关闭，项目在以下几个核心模块取得了实质性向前迈进：

*   **底层持久化与状态机修复（高危并发漏洞）**：
    *   [PR #68929](https://github.com/NousResearch/hermes-agent/pull/68929) 合并：修复了上下文压缩时父节点关闭与子节点创建之间的并发竞态（WAL race），现采用 `BEGIN IMMEDIATE` 事务确保原子化轮转。
    *   [PR #41795](https://github.com/NousResearch/hermes-agent/pull/41795) 合并：修复了看板数据库健康防护机制引发的“腐败放大”和虚假隔离问题，大幅提升了多进程并发下的稳定性。
*   **提供商兼容性与容错能力提升**：
    *   [PR #68910](https://github.com/NousResearch/hermes-agent/pull/68910) 关闭：针对 xAI Web Search 严格的 RPS 限制，加入了 429/503 错误的指数退避重试机制。
    *   [PR #68931](https://github.com/NousResearch/hermes-agent/pull/68931) 开启：优化了 OpenRouter 辅助客户端，能够正确处理免费模型下线返回的 404 错误。
*   **安全与数据隐私**：
    *   [PR #68932](https://github.com/NousResearch/hermes-agent/pull/68932) 开启：加强了后台进程输出的敏感信息脱敏机制，确保日志、缓冲区和 API 响应中不泄露明文隐私。
*   **平台网关与多渠道集成**：
    *   [PR #68925](https://github.com/NousResearch/hermes-agent/pull/68925) 开启：修复了 Slack 网关中非 DM 会话未按工作区隔离的严重漏洞，避免了消息串台。

### 4. 社区热点
今日讨论度最高的话题集中在**“生态系统扩展”**与**“底层架构解耦”**上，真实反映了重度用户对 Hermes 的进阶需求：

*   **[Issue #64182](https://github.com/NousResearch/hermes-agent/issues/64182) (评论: 15)**：**插件接口扩展追踪（7 月计划）**。这是核心维护者 @teknium1 发起的统筹帖，旨在将社区里积压的大量插件 PR 进行标准化整合。这标志着 Hermes 正在从“单体应用”向“平台型 Agent”演进。
*   **[Issue #47349](https://github.com/NousResearch/hermes-agent/issues/47349) (评论: 13)**：**可配置记忆后端**。用户强烈要求打破硬编码的 `MEMORY.md` 和 `USER.md` 限制，呼吁将 `memory.md` 重命名为 `rules.md`，并允许对接外部专属记忆库。这反映了用户对 Agent 长期记忆精细化的迫切需求。
*   **[Issue #38602](https://github.com/NousResearch/hermes-agent/issues/38602) (评论: 13, 👍: 50 全场最高)**：**桌面端纯客户端模式**。用户强烈呼吁桌面应用应支持作为“瘦客户端”连接远程后端，而不是强制在本地引导并运行庞大的 Agent 运行时。

### 5. Bug 与稳定性
今日报告了多个影响生产环境稳定性的关键 Bug，部分已产生对应的修复 PR：

*   **P1 致命级**：
    *   [Issue #63078](https://github.com/NousResearch/hermes-agent/issues/63078)：桌面端新建会话首条消息变“空会话”。用户发送消息后侧边栏生成会话，但点击进去无任何内容，且无报错。目前仍在排查中（状态：OPEN）。
*   **P2 高危级**：
    *   [Issue #67762](https://github.com/NousResearch/hermes-agent/issues/67762)：**计费数据静默丢失**。网关重启后，`session_estimated_cost_usd` 重置为 $0。这对任何依赖成本展示/限额的功能是阻断性的。
    *   [Issue #68358](https://github.com/NousResearch/hermes-agent/issues/68358)：TTFB（首字节时间）超时后，桌面端的新消息被错误路由到了过期的 TUI 会话中，导致消息错乱。
    *   [Issue #56776](https://github.com/NousResearch/hermes-agent/issues/56776)：通过兼容 OpenAI 的网关使用 Claude 模型时，Prompt Cache 命中率为 0%，导致成本剧增（已 CLOSED，推测已在主干修复）。
*   **P3 中危级**：
    *   [Issue #34385](https://github.com/NousResearch/hermes-agent/issues/34385)：在 WAL 模式下，多进程并发访问 `kanban.db` 导致索引损坏。

### 6. 功能请求与路线图信号
综合 Issues 与活跃 PR，可以看出 Hermes 下一阶段的演进路线图：

*   **信号一：全面拥抱端到端加密 (E2EE) 通讯平台**
    *   [Issue #6174](https://github.com/NousResearch/hermes-agent/issues/6174) 反映了 Matrix E2EE 验证的痛点。
    *   [PR #68930](https://github.com/NousResearch/hermes-agent/pull/68930) 顺势推出了 **X Chat (加密私信) 平台插件**，允许 Hermes 作为机器人在 X 上进行端到端加密对话，密文仅在本地解密。预计这将是下个版本的重点宣发功能。
*   **信号二：Token 开销极致优化**
    *   [Issue #13332](https://github.com/NousResearch/hermes-agent/issues/13332) 提出“混合工具预选”。当前 30+ 工具的 Schema 会疯狂吃掉 Token（约 14,000 tokens）。社区提议用 RAG 方式按需动态注入 Schema，这极有可能在近期被纳入核心主线。
*   **信号三：自治与安全边界确立**
    *   [Issue #25083](https://github.com/NousResearch/hermes-agent/issues/25083) 呼吁“不可变技能”，防止 Agent 自行修改或删除安全底线规则。结合今日合入的多个安全脱敏 PR，项目的安全围栏正在加固。

### 7. 用户反馈摘要
通过提炼今日的讨论，真实用户的使用画像与痛点如下：
*   **痛点 1：桌面端的不稳定体验**。大量 👍 和评论集中在桌面端的架构重构上（如 [Issue #68095](https://github.com/NousResearch/hermes-agent/issues/68095) 输入框乱码缩小，[Issue #68358](https://github.com/NousResearch/hermes-agent/issues/68358) 路由错乱）。用户苦于“在终端表现完美，但在桌面端体验割裂”。
*   **痛点 2：定时任务的脆弱性**。多个 Issue（如 [#2788](https://github.com/NousResearch/hermes-agent/issues/2788), [#66868](https://github.com/NousResearch/hermes-agent/issues/66868)）指出 Cron 定时任务存在鉴定失败（401）、多进程锁死、不执行且无日志等顽疾。
*   **满意点：极高的扩展潜力**。尽管有 Bug，但开发者对 Hermes 的 `Gateway` 网关架构和 `Plugin` 插件设计表达了高度认可，认为它比传统的硬编码 Agent 框架更适合构建复杂的多平台自动化工作流。

### 8. 待处理积压
以下重要 Issue 长期悬而未决或需要核心团队介入决策，需提醒关注：

1.  **[Issue #4335](https://github.com/NousResearch/hermes-agent/issues/4335) - 跨平台会话上下文共享 (CLI ↔ Telegram)**
    *   *创建于 2026-03-31*。目前各消息平台会话彼此成为孤岛，用户迫切需要“无缝接续对话”。这是一个底层架构变更，需要维护者给出决策方向。
2.  **[Issue #3944](https://github.com/NousResearch/hermes-agent/issues/3944) - Slack 网关开箱即用失败**
    *   *创建于 2026-03-30*。默认 curl 安装后 Slack 集成必定报错，提示缺少 `slack-bolt`。对于一个标榜“开箱即用”的项目，长达数月未彻底闭环严重影响新手体验。
3.  **[PR #66520](https://github.com/NousResearch/hermes-agent/pull/66520) - CI 工作流迁移至 GKE 自托管 Runner**
    *   *创建于 2026-07-17*。这是一个重大的基础设施 PR，将影响整个项目的测试流水线，目前状态为 `needs-decision`，等待核心架构师审核批准。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*