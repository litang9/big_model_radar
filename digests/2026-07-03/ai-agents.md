# OpenClaw 生态日报 2026-07-03

> Issues: 198 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-07-03 04:11 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

以下是 OpenClaw 项目 2026-07-03 的动态日报。作为专注于 AI 智能体与个人 AI 助手领域的开源项目，OpenClaw 目前正处于高强度迭代与底层架构重构的关键阶段。

---

### 📊 OpenClaw 项目动态日报 (2026-07-03)

#### 1. 今日速览
OpenClaw 今日维持了极高的社区活跃度与工程推进速度。过去 24 小时内，项目处理了 **198 条 Issue 更新**（新开/活跃 125 条，关闭 73 条）以及高达 **500 条 PR 更新**（合并/关闭 71 条，待处理 429 条）。项目正式发布了 **`v2026.7.1-beta.1`** 版本，宣布全面支持 OpenAI GPT-5.6 模型。当前的工程重心明显聚焦于多智能体会话状态管理、底层运行时的稳定性修复，以及向 SQLite 持久化存储架构的全面迁移。

#### 2. 版本发布
- **[v2026.7.1-beta.1](https://github.com/openclaw/openclaw/releases)** 
  - **核心亮点**：
    1. **OpenAI GPT-5.6 模型支持**：在目录、能力和运行时选择路径中全面适配最新的 GPT-5.6 模型族。
    2. **外部测试框架挂载 (`openclaw attach`)**：支持针对现有的 Gateway 会话启动外部 harness 进行调试与评估。
  - **分析与警告**：虽然 beta 版本已发布，但根据今日报告的多个严重回归问题（见下文 Bug 部分），建议生产环境暂缓升级至 `2026.6.11` 及以上版本，等待稳定性补丁释出。

#### 3. 项目进展
今日合并/关闭及推进的重要 PR 反映了项目在健壮性和架构升级上的重大迈进：
- **架构演进**：PR [#98236](https://github.com/openclaw/openclaw/pull/98236) 正在推进将 Session 和 Transcript 底层翻转为 SQLite 存储的巨大重构，这将彻底改变目前基于 JSONL 和 `sessions.json` 的存储逻辑。
- **性能优化**：PR [#99154](https://github.com/openclaw/openclaw/pull/99154) 修复了诊断模块在模型调用热路径上的对象拷贝开销问题；PR [#99335](https://github.com/openclaw/openclaw/pull/99335) 减少了会话启动时的重复扫描。
- **生态融合**：PR [#99234](https://github.com/openclaw/openclaw/pull/99234) 引入了自动发现并连接桌面端/服务器端节点上的 Ollama 本地推理能力。
- **工程化与重构**：PR [#98749](https://github.com/openclaw/openclaw/pull/98749) 完成了针对各类大厂 Provider（如 Anthropic, Google, Minimax 等）延迟加载器的共享模块大合并。

#### 4. 社区热点
今日讨论最激烈的问题集中在多智能体协同与跨平台消息投送上：
- **[#25592](https://github.com/openclaw/openclaw/issues/25592) (33 评论)**：Agent 在执行工具调用期间产生的“内心独白”（如错误处理、过程说明）被错误路由到 Slack/iMessage 等消息渠道。这引发了社区对 UI/UX 泄露底层逻辑的强烈不满。
- **[#88312](https://github.com/openclaw/openclaw/issues/88312) (19 评论)**：关于 Codex app-server 回合完成停滞的回归问题，导致多工具 Agent 流程无法正常结束。
- **[#92201](https://github.com/openclaw/openclaw/issues/92201) (18 评论)**：嵌入式 Runner 在处理 Anthropic 流式 thinking 签名时出现间歇性失效，因错误文本被泛化导致恢复包装器无法触发。
- **[#73148](https://github.com/openclaw/openclaw/issues/73148) (14 评论)**：因缺少原生依赖 `sharp` 导致图像工具直接失效且无降级策略。

#### 5. Bug 与稳定性
今日报告的 Bug 涉及严重的会话状态损坏与安全风险，按严重程度排列：
- **🚨 P0 安全与幻觉风险**：[#99253](https://github.com/openclaw/openclaw/issues/99253) 报告了 Assistant 在回复中**自行伪造了一条带时间戳的用户输入**，并自行回答了这条假消息。这不仅是 UI 渲染问题，而是严重的上下文污染。
- **🔴 P1 会话状态与上下文损坏**：
  - [#98416](https://github.com/openclaw/openclaw/issues/98416)：`v2026.6.11` 的构建缺失了重入防护，导致回复会话初始化冲突。
  - [#98790](https://github.com/openclaw/openclaw/issues/98790)：并发的 Agent-to-Agent 调用导致会话树分叉，压缩重建后被 Anthropic API 拒绝，引发死循环并永久毒化历史记录。
- **🟠 P1 严重回归问题**：
  - [#38327](https://github.com/openclaw/openclaw/issues/38327)：使用 `google-vertex/gemini-3.1-pro-preview` 时直接崩溃 (Cannot convert undefined or null to object)。
  - [#98614](https://github.com/openclaw/openclaw/issues/98614)：`sessions_spawn` 缺少 `operator.write` 权限，导致多智能体生成失败（6.1至6.11引入的回归）。
- **🟡 工具输出渲染异常 (已有缓解趋势)**：[#99168](https://github.com/openclaw/openclaw/issues/99168) 与 [#99241](https://github.com/openclaw/openclaw/issues/99241) 指出，超长输出或包含特殊字符（如西里尔字母 UTF-8）的工具结果被折叠成了不可读的“图片附件”，导致 Agent 自身无法读取证据从而中断推理。

#### 6. 功能请求与路线图信号
从 Issue 和 PR 中可以捕捉到项目下一阶段的演进方向：
- **多智能体治理体系**：Issue [#35203](https://github.com/openclaw/openclaw/issues/35203) 提出了一套完善的 RFC，要求加入能力画像、共享黑板、分层记忆边界以及 Token 成本治理，以解决当前多智能体信息孤岛和消耗失控的问题。
- **更智能的 Provider 降级机制**：Issue [#47910](https://github.com/openclaw/openclaw/issues/47910) 建议根据失败类型（Auth 失败、限流等）对 Provider 进行隔离和隔离降级，而不是目前的盲目无差别重试。
- **移动端 UX 增强**：Issue [#11623](https://github.com/openclaw/openclaw/issues/11623) 提议在 macOS 上引入悬浮球指示器；PR [#99350](https://github.com/openclaw/openclaw/pull/99350) 正在修复 iOS 端的受限照片权限读取。

#### 7. 用户反馈摘要
- **痛点 1：跨渠道消息可靠性极差**：用户反映在 iOS、WebChat、Telegram 和 Android 端，经常出现消息“发了但没回复”、“卡在完成前一刻”或“因附件过大(>10MB)被 HTTP 413 静默丢弃”的情况 ([#97983](https://github.com/openclaw/openclaw/issues/97983), [#877

---

## 横向生态对比

基于 2026-07-03 OpenClaw 与 Hermes Agent 的开源社区动态，以下是针对当前 AI 智能体与个人 AI 助手生态的横向对比分析报告：

### 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于**从“单体可用”向“复杂多智能体协同与跨平台可靠分发”跨越的关键拐点**。底层架构正在经历高强度重构，以解决高并发下的竞态破坏与上下文毒化问题；同时，大语言模型（LLM）路由策略正从简单的容错重试，演进为基于成本治理和动态降级的精细化调度。随着 AI 智能体深度介入人类工作流（如 IDE 集成、多渠道消息分发），**状态持久化隔离、记忆解耦以及执行过程防泄漏**已成为全行业共同面临的工程攻坚核心。

### 2. 各项目活跃度对比

| 项目名称 | Issues 动态 | PRs 动态 | 版本发布状态 | 健康度与工程阶段评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | **198** 条更新<br>(新开/活跃 125, 关闭 73) | **500** 条更新<br>(合并 71, **待处理 429**) | 发布 `v2026.7.1-beta.1` | **高压迭代/架构重构期**：推进迅猛但积压大量 PR，存在 P0 级上下文污染与状态死循环等严重稳定性隐患。 |
| **Hermes Agent** | **302** 条更新<br>(新开/活跃 257, 关闭 45) | **500** 条更新<br>(合并 **148**) | 无 (积蓄中) | **高健康度/质量巩固期**：代码吞吐效率高，重心在底层竞态消除与合规化适配，迭代稳健。 |

### 3. OpenClaw 在生态中的定位
- **技术路线与优势**：OpenClaw 是**多智能体协同计算与模型前沿探索的激进派**。它在生态中率先全面适配 GPT-5.6，并推出了独创的 `openclaw attach` 外部测试框架。其正在进行将底层翻转为 SQLite 的巨大重构，意在构建更为硬核的复杂会话状态树管理能力。
- **与同类差异**：相比于 Hermes Agent 注重代码级稳定性和 UI 打磨，OpenClaw 的功能边界拓展更为激进（如引入共享黑板、分层记忆边界）。但也因此承受了巨大的稳定性反噬，如多 Agent 调用引发的上下文永久毒化。
- **社区规模对比**：OpenClaw 拥有极其庞大的长尾社区贡献度（单日新增 125 个活跃 Issue，积压高达 429 个待处理 PR），这表明其关注度极高，但工程审查与维护 bottleneck（瓶颈）已初步显现。

### 4. 共同关注的技术方向
- **跨平台/网关消息分发可靠性** *(OpenClaw, Hermes Agent)*：两者均在多渠道适配上遇到挑战。OpenClaw 遭遇大附件静默丢弃及内心独白错误路由至 iMessage/Slack；Hermes Agent 则在 QQBot 重试崩溃和 iMessage 侧车进程死亡螺旋中挣扎。
- **状态持久化与记忆解耦** *(OpenClaw, Hermes Agent)*：针对 JSONL/静态文件的局限性正在打破。OpenClaw 正全面向 SQLite 迁移；Hermes Agent 社区则强烈呼吁通过 `honcho` 或 `fact_store` 等动态后端替代硬编码的 `MEMORY.md`。
- **大模型路由精细化** *(OpenClaw, Hermes Agent)*：盲目重试已被视为落后机制。OpenClaw 社区请求按 Auth 失败、限流进行隔离降级；Hermes Agent 则呼吁提供统一的插件路由选择器，支持按频道覆盖模型。

### 5. 差异化定位分析
- **功能侧重**：
  - **OpenClaw**：侧重于**多智能体治理体系**（Token 成本管控、Agent-to-Agent 并发防分叉）与前沿模型适配。
  - **Hermes Agent**：侧重于**开发者工作流深度集成**（如 Zed 编辑器 ACP v1 合规化、本地 Runtime 懒加载），以及高并发下的 TOCTOU 竞态消除。
- **目标用户**：
  - **OpenClaw**：适合需要编排复杂 Agent 协同、追求最新大模型（如 GPT-5.6、Gemini 3.1）能力的极客团队与前沿实验室。
  - **Hermes Agent**：更偏向需要高稳定性跨平台挂载（Discord/Telegram 等）、长时间运行的终端用户及独立开发者，强调“瘦客户端”模式。
- **架构痛点差异**：OpenClaw 正在对抗“幻觉伪造”与“会话树压缩死循环”等深度 AI 逻辑层问题；Hermes Agent 则聚焦于屏蔽环境变量明文泄漏等传统系统级安全合规问题。

### 6. 社区热度与成熟度
- **快速激进期（OpenClaw）**：处于 v2026.7.x beta 测试的阵痛期。社区讨论极为热烈（单 Issue 达 33 评论），但因严重回归问题（如多工具流程无法结束）频发，目前处于“边重度重构，边修严重 P0/P1 漏洞”的高压状态。
- **质量收敛期（Hermes Agent）**：虽然没有发布新版本，但单日合并 PR 高达 148 个，说明核心维护者对代码库拥有极强的掌控力。通过集中清理历史竞态漏洞和完善协议合规，项目正处于蓄力下一版 Minor Release 的稳健成熟期。

### 7. 值得关注的趋势信号
对于 AI 智能体开发与技术决策者，今日的动态释放了以下强烈的行业信号：
1. **“多智能体”必须走向“治理”**：单纯生成多个 Agent 已经引发乱象（如互相调用死循环、Token 消耗失控）。建立**能力画像、共享黑板、成本熔断机制**（如 OpenClaw RFC #35203）将是下一步基建重点。
2. **Agent 通讯隐私与 UX 隔离成为刚需**：Agent 的“内心独白”（如错误处理过程）绝不能暴露到 IM 对话流中（OpenClaw #25592）。未来 Agent 架构必须严格分离“底层思维链”与“对外输出层”。
3. **AI 状态机向数据库化回归**：早期的扁平文件（Markdown/JSONL）无法解决并发分叉和压缩重建问题。向 SQLite 等关系型数据库迁移，以确保状态原子性和防孤儿数据，是 Agent 持久化的必然路径。
4. **IDE 与 AI Agent 的深度协议化**：Hermes Agent 对 Zed ACP 适配器的大规模升级表明，AI 助手正在从“对话框”深度嵌入到“开发者代码编辑器”的生命周期中，标准化的资源块和技能预加载将成为新范式。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

以下是 2026-07-03 Hermes Agent (NousResearch/hermes-agent) 的项目动态日报。

### 1. 今日速览
今日 Hermes Agent 项目保持了极高的活跃度，过去 24 小时内共处理了 302 条 Issue 更新（257 条活跃/新开）和高达 500 条 PR 更新（包含 148 个已合并/关闭）。项目当前的工程推进十分迅猛，重心集中在**底层并发竞态修复、平台网关适配器健壮性提升，以及 ACP（Zed 编辑器）集成合规化**上。虽然今天没有发布新版本，但社区在 UI/UX 优化和多平台消息分发可靠性方面提出了高质量的反馈，项目整体处于高健康度、快速迭代的阶段。

### 2. 版本发布
**本日无新版本发布。**
*(注：当前项目代码库正在密集合并针对网关和多平台适配器的修复 PR，预计正在为下一个 Minor 版本进行积蓄。)*

### 3. 项目进展
今日项目合并/关闭了 148 个 PR，整体代码库向前迈进了坚实的一步，重点推进了以下领域：
*   **ACP/Zed 编辑器适配器大升级**：合并了 [PR #56742](https://github.com/NousResearch/hermes-agent/pull/56742) 以指导模型正确读取 ACP 附加文件作为上下文。推进了 [PR #57510](https://github.com/NousResearch/hermes-agent/pull/57510) （全面实现适配器 v1 合规：支持资源块、配置模式和技能预加载）及 [PR #57511](https://github.com/NousResearch/hermes-agent/pull/57511)（传递 `--skills` 标志）。
*   **大批量并发竞态 修复**：开发者 @wesleysimplicio 集中关闭了多个历史 TOCTOU 漏洞，包括 [PR #24696](https://github.com/NousResearch/hermes-agent/pull/24696) (providers 发现机制)、[PR #24692](https://github.com/NousResearch/hermes-agent/pull/24692) (transports 发现机制) 和 [PR #24671](https://github.com/NousResearch/hermes-agent/pull/24671) (browser_tool 懒加载单例)。这大幅提升了高并发场景下的核心稳定性。
*   **状态管理与持久化修复**：合并了 [PR #22530](https://github.com/NousResearch/hermes-agent/pull/22530) 修复了 npm 包版本解析错误；推进了 [PR #57501](https://github.com/NousResearch/hermes-agent/pull/57501) 修复了会话删除时压缩子会话未能级联删除导致的孤儿数据问题；推进了 [PR #57508](https://github.com/NousResearch/hermes-agent/pull/57508) 解决轮转压缩记录的持久化间隙。

### 4. 社区热点
今日讨论最热烈的议题集中在 UI 体验和特定平台的连接可靠性上：
*   **仪表盘主题可读性极差**：[Issue #18080](https://github.com/NousResearch/hermes-agent/issues/18080) (👍45, 评论 26)。用户集中吐槽当前的 Web 仪表盘主题（如 Midnight, Cyberpunk 等）字体非标准、衬线体使用不当且对比度低，导致难以阅读。强烈呼吁重构前端 UI 设计。
*   **纯客户端模式需求**：[Issue #38602](https://github.com/NousResearch/hermes-agent/issues/38602) (👍37, 评论 8)。大量用户强烈希望 Hermes Desktop 能作为“瘦客户端”运行，仅连接远程网关，而不是每次启动都在本地强制引导部署完整 Runtime。
*   **QQBot 网关无限重试崩溃**：[Issue #52914](https://github.com/NousResearch/hermes-agent/issues/52914) (评论 12)。自最新提交以来，QQ 机器人适配器由于参数缺失陷入死循环，引发了中文社区的强烈关注。

### 5. Bug 与稳定性
按严重程度排列今日报告的关键 Bug 及其修复状态：
*   **[P1/安全] 终端快照泄漏明文环境变量**：[Issue #48441](https://github.com/NousResearch/hermes-agent/issues/48441) (已关闭)。持久化 Shell 会将包含 `.env` 密钥的环境变量以明文 dump 到本地缓存文件中。
    *   *修复进度*：已有安全修复 [PR #57507](https://github.com/NousResearch/hermes-agent/pull/57507) 待合并，该 PR 在仪表盘文件管理 API 中直接屏蔽了 `.env` 相关文件的读取。
*   **[P2/网关] QQBot 适配器引发 TypeError 无限重试**：[Issue #52914](https://github.com/NousResearch/hermes-agent/issues/52914) & [Issue #53443](https://github.com/NousResearch/hermes-agent/issues/53443)。`QQAdapter.connect()` 缺少 `is_reconnect` 关键字参数。
    *   *修复进度*：已提交 [PR #57514](https://github.com/NousResearch/hermes-agent/pull/57514) 显式接受该参数以匹配基础契约。
*   **[P2/状态] 网关自动重置丢弃上下文**：[Issue #12857](https://github.com/NousResearch/hermes-agent/issues/12857)。会话空闲超时触发 reset 后，父会话 ID 未被持久化，导致新会话上下文记忆完全丢失。
*   **[P3/网关] iMessage 侧车进程死亡螺旋**：[Issue #49858](https://github.com/NousResearch/hermes-agent/issues/49858) & [Issue #55416](https://github.com/NousResearch/hermes-agent/issues/55416)。Photon Node.js 子进程崩溃后不自动重启，且免费共享线路频遭 `RST_STREAM code 2` 断流，导致 iMessage 彻底失联。

### 6. 功能请求与路线图信号
结合社区诉求与现有 PR，以下是可能被纳入下个版本路线图的功能：
*   **可配置的内存后端**：[Issue #47349](https://github.com/NousResearch/hermes-agent/issues/47349)。用户希望摆脱硬编码的 `MEMORY.md` 和 `USER.md`，转而使用 `honcho` 或 `fact_store` 等动态后端，并将 `memory.md` 重命名为 `rules.md`。这反映了用户对 Agent 长期记忆精准度与解耦的强烈需求。
*   **按频道/渠道覆盖模型和系统提示词**：[Issue #1955](https://github.com/NousResearch/hermes-agent/issues/1955) (已关闭，重复)。针对 Discord/Telegram 等多渠道场景，希望在不同频道挂载不同成本的模型（如日常闲聊用低配模型，编程频道用 Opus 4.8）。
*   **统一的插件路由选择器**：[Issue #41190](https://github.com/NousResearch/hermes-agent/issues/41190)。当前大模型调用路由分散在配置和各类启发式逻辑中，社区呼吁提供单一稳定的插件钩子来拦截并覆盖 `provider/model`。

### 7.

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*