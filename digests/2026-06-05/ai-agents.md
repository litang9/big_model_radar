# OpenClaw 生态日报 2026-06-05

> Issues: 500 | PRs: 500 | 覆盖项目: 11 个 | 生成时间: 2026-06-05 03:28 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw 项目深度报告

# 📊 OpenClaw 项目动态日报 (2026-06-05)

> 数据来源: [openclaw/openclaw](https://github.com/openclaw/openclaw) | 分析周期: 过去 24 小时

## 1. 今日速览

OpenClaw 项目今日维持了**极高的活跃度**，共处理了 500 条 Issue 更新（新开/活跃 351，关闭 149）以及 500 条 PR 更新（已合并/关闭 103）。虽然今日**无新版本发布**，但社区和开发团队显然正集中精力处理 v2026.6.1 版本发布后涌向的大量用户反馈。目前的开发重心明确聚焦于**多渠道（Slack, Discord, 飞书, Matrix, Telegram, QQBot）的消息投递稳定性**、**底层运行时会话状态管理**以及**大模型（如 GPT-5.x, MiniMax-M3）的 API 兼容性适配**。大量处于 `ready for maintainer look` 和 `automerge armed` 状态的 PR 表明项目正处于密集的代码合并期，为下一个 patch 版本做准备。

## 2. 版本发布

**本日无新版本发布。**
项目当前最新版本应为近期发布的 `v2026.6.1`。今日的 Issues 中大量出现了关于该版本的升级反馈（如 Cron 状态丢失、ChatGPT Responses 传输失败等），预示着维护者可能正在积攒修复，以酝酿一个稳定的补丁版本。

## 3. 项目进展

尽管没有发版，今日共有 **103 个 PR 被合并或关闭**，以下是最具代表性和推进力的关键 PR：

*   **🛠️ 核心工具与运行时定义快照**：PR [#90411](https://github.com/openclaw/openclaw/pull/90411) 重构了运行时工具定义的快照机制，为插件命令和 Agent 状态提供了隔离保护，提升了多运行时（Codex, OpenAI, Bedrock 等）环境下的稳定性。
*   **🔥 修复 OpenAI ChatGPT Responses 传输失败**：PR [#90399](https://github.com/openclaw/openclaw/pull/90399) 修复了 SSE 流缺少 `content-type` 导致请求被误判为 `invalid_provider_content_type` 的问题，直接解决了高优 Issue [#90083](https://github.com/openclaw/openclaw/issues/90083)。
*   **🤖 修复 MiniMax-M3 思考模式异常**：PR [#90138](https://github.com/openclaw/openclaw/pull/90138) 豁免了 MiniMax-M3 模型的 `thinking: disabled` 包装器，解除了对该模型推理能力的误限制。
*   **💬 修复 Mattermost Slash 命令 503 错误**：PR [#90389](https://github.com/openclaw/openclaw/pull/90389) 重新锚定了 slash 命令的状态初始化，修复了长期导致 Mattermost 渠道不可用的回归 Bug。
*   **✍️ 修复 Agent Edit 工具的文本破坏问题 (P0)**：PR [#90060](https://github.com/openclaw/openclaw/pull/90060) 重构了 `applyEditsToNormalizedContent` 的模糊匹配逻辑，防止了 Agent 在编辑文件时静默篡改无关行的严重隐患。
*   **🧹 修复会话重置后的模型回退残留**：PR [#90514](https://github.com/openclaw/openclaw/pull/90514) 确保了在使用 `/new` 或 `/reset` 时，能够彻底清理陈旧的运行时模型和降级通知状态。

## 4. 社区热点

今日社区讨论最为热烈的问题集中在**跨平台连接稳定性**与**底层架构重构**：

*   **Slack 静默断连引发的恐慌**：[@tleyden] 报告的 [#72808](https://github.com/openclaw/openclaw/issues/72808)（💬 评论数: 20）引发了最多关注。用户抱怨在实际演示时 Bot 突然静默无响应，这暴露了长连接网关在没有明确告警情况下的状态丢失问题。
*   **底层 SQLite 迁移架构大讨论**：[@jalehman] 发起的 [#88838](https://github.com/openclaw/openclaw/issues/88838)（💬 评论数: 17）讨论了如何通过“抽象分支”策略，将核心会话/转录记录平滑迁移至 SQLite。社区对这种避免“大一统高风险重写”的谨慎态度表示认可。
*   **OpenAI GPT-5.x API 兼容性危机**：[@jimmielightner] 的 [#90083](https://github.com/openclaw/openclaw/issues/90083)（💬 评论数: 11）指出 v2026.6.1 无法正确处理 gpt-5.4/5.5 的 Responses API，该问题直接阻碍了最新模型的应用，目前已有修复 PR 排队。
*   **QQBot 频道的消息重复与刷屏**：[@qq850580483] 报告的 [#87177](https://github.com/openclaw/openclaw/issues/87177)（💬 评论数: 11）揭示了 QQBot 渠道由于心跳 session 泄漏和非标准输出导致的严重消息重复问题。

## 5. Bug 与稳定性

今日报告了大量影响深远的 Bug，特别是**会话状态丢失**和**消息投递中断**：

*   **🔴 P0/P1 破坏性 Bug: Cron 任务在升级中被静默清除**：[#90072](https://github.com/openclaw/openclaw/issues/90072) 指出升级到 2026.6.1 时，SQLite 迁移过程静默删除了 45 个 Cron 任务中的 44 个。**暂无对应 Fix PR**，升级用户需紧急自查。
*   **🔴 P1: OpenAI 加密推理内容导致会话中断**：[#90093](https://github.com/openclaw/openclaw/issues/90093) 报告在使用原生 OpenAI 运行时时，第二回合对话会因 `invalid_encrypted_content` 错误而彻底卡死。
*   **🟠 P1: 飞书流式卡片输出截断与乱码**：[#88929](https://github.com/openclaw/openclaw/issues/88929) 导致飞书渠道的打字机效果异常，且最终回复往往只剩下最后一个字符（如“？”）。**暂无对应 Fix PR**。
*   **🟠 P1: 模型降级导致会话上下文无限重置**：[#63216](https://github.com/openclaw/openclaw/issues/63216) 揭示了在特定群组中，由于 Token 预留逻辑与重试循环冲突，导致上下文不断被硬重置，Bot 陷入“失忆”死循环。
*   **🟡 P1: active-memory 插件熔断污染主会话**：[#90082](https://github.com/openclaw/openclaw/issues/90082) 指出当内存插件熔断时，错误提示被直接注入到了主会话 Prompt 中，导致模型后续行为异常。

## 6. 功能请求与路线图信号

结合用户诉求与开发动态，以下方向可能被纳入近期版本规划：

*   **敏感数据脱敏支持**：[#64046](https://github.com/openclaw/openclaw/issues/64046) 强烈要求对配置文件中的 API Key、日志中的敏感信息以及 Web UI 中的明文展示进行统一的脱敏处理。这属于安全合规的硬需求，维护者已打上 `needs-security-review` 标签。
*   **本地配置编辑器 Schema 支持**：PR [#89992](https://github.com/openclaw/openclaw/pull/90304) 正在推进自动生成 `openclaw.json` 的本地 Schema，以支持 IDE 自动补全和校验。这极大降低了用户的配置心智负担。
*   **更健壮的内存与向量化检索**：[#63990](https://github.com/openclaw/openclaw/issues/63990) 提出了支持多索引 Embedding 内存与模型感知故障转移（避免不同 Embedding 模型混用导致向量空间污染）。配合 PR [#89138](https://github.com/openclaw/openclaw/pull/89138)（内存批量嵌入优化），表明 OpenClaw 正在强化其长期记忆系统的企业级可靠性。

## 7. 用户反馈摘要

从今日 500 条动态中提炼出的真实用户痛点：

*   **升级如扫雷**：多位用户反馈升级到最新版（2026.6.x）后遇到了静默的数据丢失（如 Cron 被清空、Session 被意外重置），对平滑升级机制感到担忧。
*   **跨平台消息状态管理脆弱**：无论是 Slack 的静默断连、Telegram 的心跳吞噬消息（[#64810](https://github.com/openclaw/openclaw/issues/64810)）、还是 Mattermost 的 503 错误，用户普遍感到 OpenClaw 在处理多渠道长连接/WebSocket 消息投递时缺乏足够的健壮性。
*   **Token 消耗与上下文膨胀**

---

## 横向生态对比

以下是为您整理的 2026-06-05 开源 AI 智能体生态横向对比分析报告：

# 📊 个人 AI 助手与自主智能体开源生态横向分析报告 (2026-06-05)

## 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于**从“单体对话”向“多宿主、多模态、多智能体协作”跨越的深水区**。各项目普遍面临大模型（如 GPT-5.x）快速迭代带来的兼容性阵痛，以及长连接/流式输出带来的底层状态管理挑战。行业重心已从单纯的“功能实现”明显转向**企业级安全合规、跨平台投递稳定性及算力成本精细化管控**。

## 2. 各项目活跃度对比
*(注：统计周期为 2026-06-05 过去 24 小时)*

| 项目名称 | Issue 活跃/关闭 | PR 合并/处理 | 最新版本动态 | 核心 GMF 评估* |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 351 / 149 | 103 / 500 | 无 (积攒 Patch) | 🔥 极高活跃，处于缺陷消化期 |
| **CoPaw** | 15 / 17 | 23 / 33 | **v1.1.11-beta.1** | 🚀 高速迭代，多智能体发力期 |
| **NanoBot** | 闭环处理 / 5 | 60 / 74 | 无 | 🏗️ 密集重构，底层架构演进期 |
| **IronClaw** | 27 / 14 | 16 / 50 | 无 | ⚙️ 核心架构 "Reborn" 重构期 |
| **Zeroclaw** | 28 / 5 | 11 / 50 | 无 (筹备 v0.8.0) | 📈 体验打磨，可观测性建设期 |
| **LobsterAI**| 低 / 0 | 16 (含清理) | 无 (合并 5.28 分支)| 🛡️ 代码治理，质量收敛期 |
| **PicoClaw** | 闭环处理 / 4 | 12 / 22 | Nightly 构建 | 🩹 稳定修复，前沿模型适配期 |
| **NanoClaw** | 极低活跃 | 3 / 8 | 无 | 🔌 细分渠道 (WA/Signal) 攻坚期 |
| **EasyClaw** | 无活跃 | 0 | **v1.8.30** | 🏢 商业化沉淀，生产级维护期 |
| **Tiny/Zepto**| 无活动 | 无活动 | - | 💤 静默期 |

*(GMF = GitHub Momentum Factor，综合代码、社区互动的动能指标)*

## 3. OpenClaw 在生态中的定位
作为该垂直领域的**核心参照系与事实标准**，OpenClaw 呈现出明显的“基础设施化”特征：
*   **规模壁垒**：单日 Issue/PR 动辄数百条的吞吐量远超同类，社区规模和商业化介入程度最高。
*   **全渠道枢纽**：它是唯一一个同时满载 Slack, Discord, 飞书, Matrix, Telegram, QQBot 等全渠道消息流转的“超级网关”，技术路线侧重于异构网络下的高并发与状态机容灾。
*   **对比差异**：相比其他项目的特定切入点，OpenClaw 承担了最重的向前兼容包袱（如 SQLite 迁移、Cron 数据丢失危机），其一举一动直接牵动下游项目的兼容策略。

## 4. 共同涌现的技术方向
从多项目的 Bug 报告和 Feature Request 中，可以发现开发者社区正面临共同的工程挑战：
*   **LLM 兼容性与 Tool Call 容错**：
    *   涉及项目：*OpenClaw, NanoBot, CoPaw, PicoClaw*。
    *   具体诉求：大模型（如 GPT-5.x, DeepSeek, MiniMax）的 API 迭代极快，社区急需解决流式输出中断、Tool Call 格式不匹配（如特殊字符拦截）以及加密切片解析失败的问题。
*   **状态管理与会话保活**：
    *   涉及项目：*OpenClaw, IronClaw, Zeroclaw, EasyClaw*。
    *   具体诉求：长连接网关的断连静默重连、上下文压缩引发的内存泄漏、以及 Agent 死循环的干预机制。
*   **精细化权限与安全隔离**：
    *   涉及项目：*NanoBot, Zeroclaw, IronClaw, OpenClaw*。
    *   具体诉求：工作区越权写入拦截、敏感信息脱敏、MCP (Model Context Protocol) 端点校验及沙箱环境隔离。

## 5. 差异化定位分析
*   **底层架构范式**：**IronClaw** 和 **NanoBot** 正在押注更深度的底层重构（如 IronClaw 的 Reborn 拆分和 NanoBot 的 Lifecycle Hook），试图从编译级或运行时级别解决多智能体编排问题；而 **CoPaw** 则侧重于通过内置工具（如 `spawn_subagent`）在应用层快速落地多智能体协作。
*   **目标用户群体**：**EasyClaw** 和 **LobsterAI** 明显偏向企业级 B2B 场景（如 AI 客服长连接保活、企业 Kit 市场）；**Zeroclaw** 和 **NanoClaw** 更聚焦于极客与高阶玩家（发力本地 Ollama 适配、Web 网关协议桥接）；**CoPaw** 更侧重前端交互与开箱即用的桌面端体验。
*   **多模态切入点**：**NanoClaw** 走的是端侧隐私路线（本地 whisper.cpp 语音转录），而 **LobsterAI** 则在强化语音输入的重构与视觉载荷拦截。

## 6. 社区热度与成熟度
*   **快速迭代扩张期**：**CoPaw, IronClaw, Zeroclaw**。社区充满功能提案（如 A2A 协议、桌面端、UI 可视化），代码合入频繁，但也伴随 P0 级别的架构回归 Bug。
*   **规模治理与阵痛期**：**OpenClaw, PicoClaw**。庞大的用户群导致任何小版本升级都会引爆边缘 Bug（如 Cron 任务被清空）。此类项目当前的重心是“防守”，即通过加强自动化测试和重构状态机来稳住基本盘。
*   **高质量收敛期**：**NanoBot, LobsterAI, EasyClaw**。表现为大量低质量 PR 被清理，Issue 吞吐量不高但代码合并极具针对性，表明项目已进入相对成熟、以稳健为导向的阶段。

## 7. 值得关注的趋势信号
1.  **“上下文预算”成为一等公民**：从 CoPaw 要求 Token 消耗可视化，到 PicoClaw 的 Token 异常消耗 Bug，再到 IronClaw 的 HTTP 输出预算限制。**显式的 Token 预算管理和降级策略**已成为开发者衡量 AI Agent 框架是否具备生产可用性的核心指标。
2.

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 📊 NanoBot 项目动态日报 (2026-06-05)

> 数据来源：[HKUDS/NanoBot](https://github.com/HKUDS/nanobot) | 分析周期：过去 24 小时

## 1. 📈 今日速览

NanoBot 项目在今日保持**极高的开发活跃度与迭代速度**。过去 24 小时内，项目处理了高达 **74 次** 的 PR 更新（其中 60 个 PR 被合并或关闭，待合并 14 个），并有 5 个 Issues 顺利解决，表明核心团队正在密集进行代码审查与功能合入。项目当前的重心明显向**底层架构重构、跨平台桌面端（Desktop/WebUI）适配、安全防护增强及测试覆盖率提升**倾斜。今日虽无新版本发布，但大量高质量代码的合入预示着项目正在为下一个重要里程碑积蓄力量。

## 2. 📦 版本发布

**今日无新版本发布。** 
项目目前处于高频代码合并期，多项底层架构（如 Agent 运行生命周期、MCP 安全防护）正在重构中。预计团队在完成当前的桌面端适配与 API 兼容性打磨后，将发布包含重大改进的下一个版本。

## 3. 🚀 项目进展

今日共有 60 个 PR 被合并或关闭，项目整体在功能拓展与系统健壮性上迈出了坚实的一步：

*   **企业级身份验证支持落地**：PR [#4126](https://github.com/HKUDS/nanobot/pull/4126) 合并，正式引入了 Azure OpenAI 的 AAD（Azure Active Directory）基于身份的认证支持，满足企业级用户的安全合规需求。
*   **核心生命周期与状态管理重构**：PR [#4176](https://github.com/HKUDS/nanobot/pull/4176) 与 [#4194](https://github.com/HKUDS/nanobot/pull/4194) 合并。前者引入了 `AgentRunHookContext` 及运行级别的 Hook 生命周期，后者将捕获状态重构为运行级别的快照。这为后续更复杂的 Agent 编排打下了坚实基础。
*   **包管理与部署兼容性修复**：针对社区反馈强烈的 `uv tool` 安装环境兼容问题，PR [#4164](https://github.com/HKUDS/nanobot/pull/4164) 被合并，系统现在会在 `pip` 不可用时自动回退到 `uv pip`，大幅降低了用户的部署门槛。
*   **API 兼容性与容错增强**：PR [#3984](https://github.com/HKUDS/nanobot/pull/3984) 修复了 OpenAI 兼容 API（如 GLM-4.7, Kimi 2.6）的 Tool Call ID 不匹配问题。
*   **测试基础设施升级**：PR [#4189](https://github.com/HKUDS/nanobot/pull/4189) 合并，使用确定性时钟和事件替换了不稳定的基于时间的等待，显著提升了 CI 流水线的稳定性和单元测试的可靠性。

## 4. 🔥 社区热点

今日最受关注的讨论是长期活跃的 Issue **[#912 [OPEN] Support Task-Specific Model Configuration](https://github.com/HKUDS/nanobot/issues/912)**（👍 3，评论 4）。
*   **背后诉求**：用户强烈希望打破“全局单一模型”的限制，针对不同任务类型（如常规对话 💬、工具调用 🛠️、浏览器使用 🌐）配置专用的底层大模型。这反映了重度用户在**成本控制、延迟优化和模型特长发挥**上的精细化运营需求，是智能体框架走向成熟应用的必然要求。

## 5. 🛡️ Bug 与稳定性

今日暴露并处理的 Bug 主要集中在模型容错、渠道通信和部署环境上：

1.  **[High] Fallback 模型未按预期触发**：Issue [#1121](https://github.com/HKUDS/nanobot/issues/1121) 指出当主模型超时或返回 503 时，Fallback 模型未能生效。该问题已随底层重构关闭。
2.  **[High] 微信与 Telegram DM 配对失败**：Issue 揭示了被拒绝的私聊发送者未能正确路由到配对流程的阻断性 Bug。目前已有修复 PR [#4197](https://github.com/HKUDS/nanobot/pull/4197) 提交，等待合并。
3.  **[Medium] WebUI CLI App 安装失败**：Issue [#4158](https://github.com/HKUDS/nanobot/issues/4158) 曝光了 `uv tool` 环境下缺少 `pip` 模块导致的崩溃，已通过 PR [#4164](https://github.com/HKUDS/nanobot/pull/4164) 修复。
4.  **[Low] 终端安全性拦截**：PR [#4119](https://github.com/HKUDS/nanobot/pull/4119) 和 [#4053](https://github.com/HKUDS/nanobot/pull/4053) 正在积极修复通过相对符号链接逃逸工作区以及越权写入只读路径的安全漏洞。

## 6. 🗺️ 功能请求与路线图信号

结合今日的 Issue 与 PR 动态，可以洞察到项目下一步的发展方向：

*   **Desktop 桌面端即将到来**：PR [#4195](https://github.com/HKUDS/nanobot/pull/4195)（打磨桌面端外壳与 WebUI 共享逻辑）正在审查中。这标志着 NanoBot 正在突破纯 Web/CLI 的边界，向平台级独立应用演进。
*   **Agent 间 MCP 能力继承**：PR [#4192](https://github.com/HKUDS/nanobot/pull/4192) 提出允许子智能体继承主智能体的 MCP 工具。若此 PR 落地，将极大增强多智能体协作的深度。
*   **更严格的 Tool Call 校验**：PR [#4190](https://github.com/HKUDS/nanobot/pull/4190) 增强了工具调用的严格程度，拒绝模糊匹配和非标准参数。这表明项目正在致力于减少 LLM 幻觉导致的工具调用失败率，提升生产环境的可靠性。
*   **国产大模型生态整合呼声**：Issue [#4196](https://github.com/HKUDS/nanobot/issues/4196) 提出了对接火山引擎图片生成能力的请求，反映出社区对多模态国产模型支持的强烈渴望。

## 7. 💬 用户反馈摘要

从今日的 Issue 互动与关闭记录中，可以提炼出以下真实用户画像与痛点：

*   **企业合规成刚需**：用户 @kunalk16 反馈企业订阅限制了 API Key 的使用，必须走 Azure Identity 认证。说明 NanoBot 正在被越来越多的大型企业团队纳入内部 IT

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下是为您生成的 **Zeroclaw** 项目 2026-06-05 动态日报。作为开源项目分析师，我基于 GitHub 追踪数据为您梳理了项目的整体健康状况、社区动态及演进方向。

---

# 📊 Zeroclaw 项目动态日报 (2026-06-05)

## 1. 今日速览
过去 24 小时内，Zeroclaw 项目保持了**极高的开发活跃度与社区参与度**。共处理了 33 条 Issue 更新（28 条活跃/新增，5 条关闭）以及高达 50 条的 PR 更新（其中 39 条待合并，11 条已合并/关闭）。项目当前虽然无新版本发布，但核心开发团队正集中火力推进 **v0.8.0 及 v0.8.1 的里程碑计划**。从活跃的 PR 队列来看，近期工作重心主要围绕 **Web Gateway 体验升级（插件管理、斜杠命令）、可观测性重构、多渠道适配及 Windows 环境的底层兼容性修复**。

## 2. 版本发布
**本日无新版本发布。** 
项目目前正处在 v0.8.0 发布前的准备与阻塞问题清理阶段，相关跟进正在集中追踪于 Issue [#7112](https://github.com/zeroclaw-labs/zeroclaw/issues/7112) 与 Issue [#6970](https://github.com/zeroclaw-labs/zeroclaw/issues/6970) 中。

## 3. 项目进展
尽管缺少版本发布，但今日有 **11 个 PR 被成功合并**，大量核心修复和功能已合入主干，为下一次发版奠定了基础。当前正在审查的高优/活跃 PR（共 39 个待合并）展现了明确的推进路线：
*   **Web UI 与网关体验大幅增强**：正在积极推进 Web 端的插件生命周期管理端点及 UI 构建 ([PR #7235](https://github.com/zeroclaw-labs/zeroclaw/pull/7235))，并为 Web 聊天室引入了用户期待已久的斜杠命令支持 (`/clear`, `/help` 等，[PR #7223](https://github.com/zeroclaw-labs/zeroclaw/pull/7223))。
*   **架构与可观测性演进**：提交了结构化可观测性增强的大型 PR ([PR #7233](https://github.com/zeroclaw-labs/zeroclaw/pull/7233))，引入了 OTel Trace 关联和富事件上下文；同时完成了网关内存策略的统一迁移 ([PR #7234](https://github.com/zeroclaw-labs/zeroclaw/pull/7234))。
*   **多平台与渠道修复**：修复了 Windows 环境下 CLI 工具的发现与并发执行问题 ([PR #7210](https://github.com/zeroclaw-labs/zeroclaw/pull/7210))，并恢复了 QQ 频道的音频附件转写功能 ([PR #7109](https://github.com/zeroclaw-labs/zeroclaw/pull/7109))。

## 4. 社区热点
今日社区讨论最热烈的功能诉求和缺陷均与**生产力深化与多智能体互联**紧密相关：
*   **🔥 A2A (Agent-to-Agent) 协议支持**：Issue [#3566](https://github.com/zeroclaw-labs/zeroclaw/issues/3566) 获得了 **7 个赞和 5 条深入讨论**。社区强烈呼吁原生支持 A2A 协议，以便 Zeroclaw 实例能与外部智能体或不同框架进行 HTTP 通信。这标志着用户正在从单一 Agent 向多 Agent 协作架构迁移。
*   **💻 Computer-Use (屏幕交互) 支持**：Issue [#6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909) 有 5 条评论。用户希望 Zeroclaw 能像 OpenAI Codex 一样，具备截屏和发送鼠标/键盘事件控制本地桌面的能力。
*   **🛠️ Ollama Provider 工具调用失败**：Issue [#5962](https://github.com/zeroclaw-labs/zeroclaw/issues/5962) 引发了 6 条讨论（现已关闭）。该 S1 级别的 Bug 曾导致本地使用 Ollama 调用工具时直接阻塞工作流，侧面反映出 **Ollama 本地模型玩家在 Zeroclaw 用户群中占有极大比重**。

## 5. Bug 与稳定性
今日暴露的稳定性问题主要集中在运行时阻塞、Web UI 状态不同步和特定系统兼容性上：

*   **S1 - 工作流完全阻塞**：
    *   **TUI (zerocode) 卡死**：当 daemon 断开连接时，TUI 会完全冻结且只能强杀进程 ([Issue #7125](https://github.com/zeroclaw-labs/zeroclaw/issues/7125)，当前有修复进展)。
    *   **Quickstart 别名冲突**：TUI Quickstart 硬编码了 `default` 作为模型提供商别名，导致与已有配置冲突，直接阻断新用户上手 ([Issue #7227](https://github.com/zeroclaw-labs/zeroclaw/issues/7227))。
*   **S2 - 降级体验 / 逻辑异常**：
    *   **Web UI “清除所有”无效**：点击清除按钮仅刷新了前端，后端会话历史未被清除，刷新后消息“死而复生”（已有修复 PR [PR #7222](https://github.com/zeroclaw-labs/zeroclaw/pull/7222)）([Issue #7126](https://github.com/zeroclaw-labs/zeroclaw/issues/7126))。
    *   **Agent 工具死循环**：在 Slack 场景中，Agent 反复执行近乎重复的 shell 探测命令，直到耗尽 `max_tool_iterations` ([Issue #7143](https://github.com/zeroclaw-labs/zeroclaw/issues/7143))。
    *   **Skills 加载失败**：因 `workspace_dir` 传参错误，导致启动时无法从 `data/skills/` 正确加载技能 ([Issue #7236](https://github.com/zeroclaw-labs/zeroclaw/issues/7236))。
*   **Windows 兼容性**：再次暴露了 Windows 下 Shell 工具处理双引号导致命令损坏的严重问题（已关闭，可能已在近期代码中解决）([Issue #7083](https://github.com/zeroclaw-labs/zeroclaw/issues/7083)）。

## 6. 功能请求与路线图信号
结合 Issue 与 PR 动态，Zeroclaw 正在向 **“企业级可观测性”** 与 **“精细化权限管控”** 演进：
*   **安全与权限细粒度控制**：Issue [#7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155) 提出引入类似 Claude Code 的命令行策略机制，对高风险 Shell 命

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-06-05)

## 1. 今日速览
今日 PicoClaw 项目整体呈现**高活跃度与高维护质量**。项目在过去 24 小时内迎来了 22 项 PR 更新（其中 12 项已合并/关闭）和 7 项 Issue 更新（4 项已关闭），发布了最新的 `v0.2.9-nightly` 自动构建版本。从提交记录来看，核心开发团队及社区贡献者正集中精力**修复 v0.2.9 版本引入的回归 Bug、强化多渠道（OneBot、Codex、WhatsApp）的兼容性，并提升底层类型断言与构建系统的健壮性**。项目处于快速迭代的稳定修复期。

## 2. 版本发布
- **Nightly Build: `v0.2.9-nightly.20260605.5224b9a4`**
  - **性质**: 自动化夜间构建版本。
  - **警告**: 官方提示可能存在不稳定性，建议谨慎用于生产环境。
  - **完整变更日志**: [v0.2.9...main](https://github.com/sipeed/picoclaw/compare/v0.2.9...main)

## 3. 项目进展
今日共有 12 个 PR 被合并或关闭，项目在以下几个维度取得实质性进展：
- **核心稳定性修复**: 合并了单例 PID 校验修复 ([PR #3000](https://github.com/sipeed/picoclaw/pull/3000))，彻底解决了因 PID 复用导致的网关崩溃循环问题。
- **前沿模型支持优化**: 合并了 Codex OAuth (GPT-5.5) 流式输出工具调用的修复 ([PR #3007](https://github.com/sipeed/picoclaw/pull/3007))，修复了空响应导致工具调用丢失的严重问题。
- **构建系统修复**: 修复了特定 Go 版本（带空格的 `go1.25.10 X:nodwarf5`）导致的 Makefile 编译失败问题 ([PR #2999](https://github.com/sipeed/picoclaw/pull/2999), [PR #2976](https://github.com/sipeed/picoclaw/pull/2976))。
- **依赖项升级与适配**: 成功处理了飞书 SDK 的破坏性更新，合并了适配其 v3.9.4 的代码 ([PR #3008](https://github.com/sipeed/picoclaw/pull/3008))，并升级了 AWS Bedrock 等关键依赖 ([PR #3004](https://github.com/sipeed/picoclaw/pull/3004))。
- **工具执行健壮性**: 合并了执行工具响应中 `json.Marshal` 错误的妥善处理 ([PR #2996](https://github.com/sipeed/picoclaw/pull/2996))。

## 4. 社区热点
- **高优先级崩溃问题完美闭环 ([Issue #2720](https://github.com/sipeed/picoclaw/issues/2720))**: 此前报告的 PID 复用导致网关无限崩溃的问题引发了较多讨论（8条评论），今日随着 [PR #3000](https://github.com/sipeed/picoclaw/pull/3000) 的合并，该高优先级 Bug 被顺利关闭。这反映了社区对边缘崩溃场景的高度关注以及维护者的迅速响应。
- **上下文窗口显示争议 ([Issue #2968](https://github.com/sipeed/picoclaw/issues/2968))**: 用户对 `/context` 命令中硬编码的 76800 tokens 感到困惑。目前 [PR #2985](https://github.com/sipeed/picoclaw/pull/2985) 已提交修复，增加了软总结阈值显示，这表明用户对 AI 的 Token 消耗透明度有着极高要求。

## 5. Bug 与稳定性
按严重程度排列，今日报告或处理的 Bug 如下：
1. **[严重] Evolution 模式持续消耗 Token ([Issue #3012](https://github.com/sipeed/picoclaw/issues/3012))**: 
   - **表现**: 开启 Evolution (Draft 模式) 后，即使无用户输入，系统每分钟都在持续消耗 Token。
   - **状态**: 🟡 新开，暂无修复 PR，需重点关注是否存在死循环或无效轮询。
2. **[严重] Codex OAuth (GPT-5.5) 工具调用丢失 ([Issue #3006](https://github.com/sipeed/picoclaw/issues/3006))**: 
   - **表现**: 流式响应返回空输出时丢弃可执行的工具调用。
   - **状态**: 🟢 已通过 [PR #3007](https://github.com/sipeed/picoclaw/pull/3007) 修复。
3. **[中等] OneBot 群聊消息路由错误 ([Issue #3002](https://github.com/sipeed/picoclaw/issues/3002))**: 
   - **表现**: 群聊回复调用了 `send_private_msg`，导致 NapCat 报错。
   - **状态**: 🟡 已有修复 PR ([PR #3009](https://github.com/sipeed/picoclaw/pull/3009))，待合并。
4. **[中等] Web UI 历史消息错乱 ([Issue #2972](https://github.com/sipeed/picoclaw/issues/2972))**: 
   - **表现**: 升级 v0.2.9 后，新会话混杂旧历史记录。
   - **状态**: 🟢 Issue 已关闭。
5. **[低] 安全限制误杀无 Scheme URL ([Issue #3001](https://github.com/sipeed/picoclaw/issues/3001))**: 
   - **表现**: `restrict_to_workspace` 开启时，`curl wttr.in/Beijing` 等命令被误判为绝对路径而拦截。
   - **状态**: 🟡 已有修复 PR ([PR #3001](https://github.com/sipeed/picoclaw/pull/3001))，待合并。

## 6. 功能请求与路线图信号
- **多渠道适配深化**: 从待合并的 PR 来看，项目正在积极推进 WhatsApp 原生模式的支持 ([PR #2934](https://github.com/sipeed/picoclaw/pull/2934)) 以及飞书 SDK 的大版本跟进，预示着跨平台 Channel 是下一阶段的演进核心。
- **模型热更新支持**: 社区提交了针对 Claude Sonnet 4.6 模型 ID 的修复 ([PR #2947](https://github.com/sipeed/picoclaw/pull/2947))，表明项目需要建立更敏捷的默认模型配置更新机制，以跟上大模型厂商的迭代速度。

## 7. 用户反馈摘要
- **核心痛点**: 
  - **Token 消耗不透明与异常消耗**是高级用户最担忧的问题（如 Issue 2968 和 3012）。
  - 升级到 v0.2.9 后的**平滑过渡体验不佳**，出现了历史记录错乱、配置不兼容等 OOB 问题。
- **典型使用场景**: 数据显示，部分高阶用户正在将 PicoClaw 部署于 **FreeBSD** 系统并接入 **MiniMax** 等非标模型，同时在尝试使用 Evolution (自主智能体) 模式进行测试。前端集成方面，NapCat (QQ协议端) 和 Codex (前沿模型测试) 的结合使用频率较高。

## 8. 待处理积压
以下长期停滞或需要维护者紧急关注的 Issue/PR 提醒：
- **Anthropic SDK 升级停滞**: [PR #2962](https://github.com/sipeed/picoclaw/pull/2962) 尝试将 Anthropic SDK 从 v1.26.0 升级到 v1.46.0，但自 5 月 28 日以来缺乏进展。考虑到 Claude 3.5/4 系列的更新，建议优先推进。
- **安全策略覆盖 Channel 状态问题**: [PR #2956](https://github.com/sipeed/picoclaw/pull/2956) 指出 `.security.yml` 合并时会意外覆盖 `config.json` 中配置的 `enabled: true`，导致渠道意外失效。此 Bug 影响配置管理，建议尽快排期合并。
- **Evolution 模式 Token 消耗异常**: 今日新发的 [Issue #3012](https://github.com

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

这份日报基于您提供的 NanoClaw (AI 智能体/个人 AI 助手) 2026-06-05 的 GitHub 活动数据生成。

---

# 📊 NanoClaw 项目动态日报 (2026-06-05)

## 1. 今日速览
过去 24 小时内，NanoClaw 项目整体保持**中度偏高的活跃状态**，开发重心明显向**多渠道消息桥接的稳定性和协议兼容性**倾斜。今日共有 8 个 Pull Requests 产生更新（3 个已关闭，5 个待合并），且大多针对 WhatsApp 和 Signal 等复杂通信渠道的底层 Bug 修复。尽管没有发布新版本，但核心贡献者正集中解决 Baileys 7.x 迁移和消息投递丢失等关键痛点。Issue 板块今日相对平静，仅收到一条疑似测试或无关的内容。

## 2. 版本发布
今日**无**新版本发布。

## 3. 项目进展
今日共有 3 个 PR 被关闭，其中包含重要的架构修复和代码质量提升：
*   **修复 WhatsApp 底层认证架构**：PR [#2633](https://github.com/nanocoai/nanoclaw/pull/2633) 被关闭。该 PR 修复了在 Baileys 7.x 环境下，设置 `WHATSAPP_PHONE_NUMBER` 时会导致适配器自毁会话认证的两个结构性 Bug。此合并大幅提升了 WhatsApp 机器人的长期在线稳定性。
*   **核心类型系统优化**：PR [#104](https://github.com/nanocoai/nanoclaw/pull/104)（历史长线 PR）被关闭。用规范的 `BoomError` 接口替换了代码中 `as any` 的强制类型转换，提升了代码库的健壮性。
*   **清理无关 PR**：PR [#2687](https://github.com/nanocoai/nanoclaw/pull/2687) (Trip agent) 被关闭，保持了主分支的整洁。

## 4. 社区热点
今日虽然没有产生大量评论的 Issue/PR，但从提交的内容来看，**消息网关的可靠性**是当前开发者社区的核心发力点：
*   **Signal DMs 路由丢失问题**：由 @klingel 提交的 PR [#2689](https://github.com/nanocoai/nanoclaw/pull/2689) 引发了关注。它揭示了当前版本中 Signal 私信（DM）首条消息会被静默丢弃的严重逻辑漏洞。
*   **WhatsApp 群组发消息报错 421**：由 @mcaldas 提交的 PR [#2688](https://github.com/nanocoai/nanoclaw/pull/2688) 直击痛点，解决了在 WhatsApp 迁移到 LID 寻址机制后，机器人回复报错且无感知的难题。

## 5. Bug 与稳定性
今日报告和修复了多个影响系统稳定性的关键 Bug，主要涉及外部平台 API 变更导致的不兼容：
*   **🔴 严重**：WhatsApp LID 群组消息发送静默失败 (Ack 421)。
    *   *状态*：已提交 Fix PR [#2688](https://github.com/nanocoai/nanoclaw/pull/2688)，待合并。
*   **🔴 严重**：Signal DMs 首条消息被路由静默丢弃，未能创建 `messaging_groups`。
    *   *状态*：已提交 Fix PR [#2689](https://github.com/nanocoai/nanoclaw/pull/2689)，待合并。
*   **🟡 中等**：AI 智能体在发生上下文压缩后，容易丢弃 `<message to="…">` 的包裹格式，导致输出内容无法送达目标。
    *   *状态*：已提交 Fix PR [#2405](https://github.com/nanocoai/nanoclaw/pull/2405)，待合并。

## 6. 功能请求与路线图信号
*   **全平台端侧语音转录能力**：PR [#2459](https://github.com/nanocoai/nanoclaw/pull/2459) 提出为 Discord、Slack、Teams 等所有 Chat SDK 桥接渠道引入基于本地 `whisper.cpp` 的语音转文字功能。此方案完全在本地设备运行，无需调用 OpenAI API，反映出项目在向**隐私优先、零外部成本**的多模态 AI 助手方向演进。
*   **Signal 交互增强**：PR [#2685](https://github.com/nanocoai/nanoclaw/pull/2685) 补充了关于 Signal 群组输入状态、出站表情回应和引用回复的文档。这暗示 NanoClaw 即将（或已经）支持更富文本的 IM 交互体验。

## 7. 用户反馈摘要
从今日的 Issue #2686 ("I want to travel to Canada") 来看，Issue 跟踪器接收到了非技术相关的噪音信息。
但通过分析今日的 PR 提交，我们可以推断出**真实进阶用户的痛点**：
1.  **部署稳定性差**：在依赖库（如 Baileys）大版本升级时，现有机器人的连接和认证极其脆弱。
2.  **静默失败难以排查**：消息发不出去时系统没有显式报错，这极大增加了多平台 AI 智能体的运维难度。

## 8. 待处理积压
以下重要的 PR 处于 Open 状态较久，建议维护团队重点关注并推进 Code Review：
*   **积压逾 20 天**：PR [#2405](https://github.com/nanocoai/nanoclaw/pull/2405)（压缩后消息投递修复）和 PR [#2459](https://github.com/nanocoai/nanoclaw/pull/2459)（本地 Whisper 语音转录）。这两个 PR 对系统稳定性和功能拓展至关重要，建议尽快排期合并。
*   **新增待审**：今日新提的 3 个高质量 PR（[#2685](https://github.com/nanocoai/nanoclaw/pull/2685), [#2688](https://github.com/nanocoai/nanoclaw/pull/2688), [#2689](https://github.com/nanocoai/nanoclaw/pull/2689)）正在等待 Maintainer 的审查。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-06-05)

> 数据来源: [nearai/ironclaw](https://github.com/nearai/ironclaw) | 分析周期: 过去 24 小时

## 1. 今日速览

IronClaw 在过去 24 小时内保持着**极高的开发活跃度**。项目共处理了 41 条 Issue 动态（27 条新开/活跃，14 条关闭）以及 50 条 PR 动态（34 条待合并，16 条合并/关闭），且暂无新版本发布。

当前项目的核心重心正全面聚焦于底层架构的 **“Reborn” 重构演进**。从大量合并的 PR 和新提出的 Issue 来看，核心团队正在密集攻坚运行时解耦、Subagent 持久化机制以及触发器生命周期的完善。此外，WebUI v2 和多渠道（Slack、飞书）集成也迎来了大量代码合并，标志着项目正从底层重构向“多宿主、高可用”的产品级形态快速迈进。

## 2. 版本发布

**本日无新版本发布。**

## 3. 项目进展

今日共有 16 个 PR 被合并或关闭，涵盖了底层架构、前端交互、安全修复等多个关键领域，项目整体向前迈出了坚实的一步：

*   **WebUI v2 与 Slack 集成重大突破:**
    *   [PR #4476](https://github.com/nearai/ironclaw/pull/4476): 串联了 Reborn 下 Slack 的 actor/subject 旅程，完善了多路由通道的身份执行语义。
    *   [PR #4478](https://github.com/nearai/ironclaw/pull/4478): 在 Slack 提示中支持展示认证设置链接，打通了非 Web 端用户的 OAuth 授权闭环。
    *   [PR #4480](https://github.com/nearai/ironclaw/pull/4480) & [PR #4477](https://github.com/nearai/ironclaw/pull/4477): 重构了 WebUI v2 的 LLM 供应商设置面板，按配置状态分组展示，大幅改善了首次配置体验。
*   **Reborn 核心架构演进:**
    *   [PR #4440](https://github.com/nearai/ironclaw/pull/4440): 修复了延期压缩逻辑，引入了 `LoopCompactionOutcome`，使 Agent 循环在遇到不稳定消息时能优雅降级而不是直接报错。
    *   [PR #4466](https://github.com/nearai/ironclaw/pull/4466): 引入了 trigger-create 生命周期钩子，修复了创建配对问题。
    *   [PR #4467](https://github.com/nearai/ironclaw/pull/4467): 修复了 HTTP 工具调用对模型可见的输出预算限制，防止上下文溢出。
*   **依赖与安全性:**
    *   [PR #3719](https://github.com/nearai/ironclaw/pull/3719): 修复了多个严重的安全漏洞（包括 RUSTSEC 中的 CRL 解析 Panic 和 WebPKI 漏洞）。

## 4. 社区热点

今日讨论最活跃的 Issues 集中在架构设计规范与多渠道 API 接入上，反映了开发者对系统健壮性和外部兼容性的高度关注：

*   **[#3280](https://github.com/nearai/ironclaw/issues/3280) [6 评论]:** 讨论在 ProductAdapters 和宿主层之间引入 `ProductWorkflow` 和 `InboundTurnService` 门面模式。这标志着 Reborn 架构正在建立清晰的边界，属于 P0 级别的核心架构重构。
*   **[#4424](https://github.com/nearai/ironclaw/issues/4424) [4 评论]:** 爆出了模型提示词中声明了工具，但结构化 API `tools: []` 中缺失的严重问题，直接导致模型在循环中空转。
*   **[#4427](https://github.com/nearai/ironclaw/issues/4427) [2 评论]:** 开发者指出 Agent 循环退出时 `LoopFailureKind` 没有任何日志追踪，只能查数据库，导致本地调试极其困难。
*   **[#3283](https://github.com/nearai/ironclaw/issues/3283) [2 评论]:** 讨论将 OpenAI 兼容的 Chat 和 Responses API 迁移至 Reborn 模型，是产品实现外部标准对齐的重要前兆。

## 5. Bug 与稳定性

今日报告了多个关键 Bug，尤其是涉及 Reborn 迁移期引入的回归问题，部分已提交修复：

1.  **[P0 级] 模型工具调用失效 (Visible but Uncallable):**
    *   **问题:** [#4424](https://github.com/nearai/ironclaw/issues/4424) Reborn 本地运行时，系统提示词通知模型存在 `builtin.spawn_subagent`，但传给模型的 `tools` 数组中没有，导致模型只能“干瞪眼”无法调用。
    *   **修复状态:** 已提出针对性回归测试 [#4431](https://github.com/nearai/ironclaw/issues/4431) 以确保后续能力与定义的强一致性。
2.  **[P1 级] 预算与错误吞噬问题:**
    *   **问题:** [#4311](https://github.com/nearai/ironclaw/issues/4311) 模型网关将非上下文溢出的预算耗尽错误，错误地映射为了 `ContextOverflow`，可能导致系统误判并执行错误的恢复逻辑。目前 Open 待修复。
3.  **[P1 级] 压缩重试元数据缺失:**
    *   **问题:** [#4464](https://github.com/nearai/ironclaw/issues/4464) PR [#4440](https://github.com/nearai/ironclaw/pull/4440) 引入了压缩延期机制，但在重试时状态记录中缺少仅限状态的稳定元数据，可能导致后续循环状态不一致。

## 6. 功能请求与路线图信号

从新开的 Issues 和大型 PR 来看，项目正在规划下一阶段的重磅特性：

*   **彻底的模块拆分:** Issue [#4470](https://github.com/nearai/ironclaw/issues/4470) 提出“将 Reborn 拆分为具有 CI 强制边界的独立 crates”。这表明项目正在为支持更大规模的分布式部署和第三方模块化接入做准备。
*   **原生飞书长连接支持:** PR [#4178](https://github.com/nearai/ironclaw/pull/4178) 正在引入飞书的二进制 Protobuf 帧 WebSocket 接入。这标志着 IronClaw 正在积极扩展非西方市场的企业级通讯平台生态。
*   **WebUI 极简首次运行体验:** PR [#4481](https://github.com/nearai/ironclaw/pull/4481) 实现了全新用户引导流程（支持一键 NEAR AI / ChatGPT 登录或直接粘贴 API Key），极大地降低了个人开发者的上手门槛。
*   **更完善的 OpenAI API 兼容层:** PR [#4459](https://github.com/nearai/ironclaw/pull/4459) 正在构建独立的 OpenAI 兼容契约层，Issue [#4468](https://github.com/nearai/ironclaw/issues/4468) 要求为外部 API 延续暴露原生的 `resp_...` ID，进一步强化作为“AI 网关”的能力。

## 7. 用户反馈摘要

通过分析 Issues 中的描述与评论，可以提炼出当前用户/开发者的核心痛点：

*   **可观测性不足:** 频繁提及（如 [#4427](https://github.com/nearai/ironclaw/issues/4427)）在 `RUST_LOG=debug` 模式下依然无法看到 Loop 退出的具体原因。**诉求：** 需要更完善、对开发友好的本地日志追踪体系，而不是只能查库。
*   **后台子智能体“失联”的焦虑:** Issue [#4147](https://github.com/nearai/ironclaw/issues/4147) 与 [#4084](https://github.com/nearai/ironclaw/issues/4084) 暴露出后台 Subagent 完成后父节点无感知。**诉求：** 用户在使用多 Agent 编排时，极其需要可靠的、持久化的异步结果送达机制。
*   **定时任务配置的预期偏差:** Issue [#4473](https://github.com/nearai/ironclaw/issues/4473) 指出用户期望的“一次性执行”实际上变成了永不停止的 cron 循环。**诉求：** 触发器系统需要更符合人类直觉的策略配置模型。

## 8. 待处理积压

以下重要 PR/Issues 活跃度较高但已停留较长时间，建议维护团队评估状态：

*   **[PR #3951](https://github.com/nearai/ironclaw/pull/3951) - 第三方扩展钩子激活 (feat: hooks):** 尺寸为 XL，风险中等。涉及第三方扩展的安全隔离边界模型，已开放超过 10 天，需要核心架构师进行最终的 Review 推进。
*   **[PR #3936](https://github.com/nearai/ironclaw/pull/3936) / [PR #3937](https://github.com/nearai/ironclaw/pull/3937) - 持久化后端及对抗性测试:** 属于 Hook 基础设施的核心部分（PR 3/4 和 4/4），目前处于 Open 状态，其阻塞可能会影响后续第三方生态的发展。
*   **[PR #4379](https://github.com/nearai/ironclaw/pull/4379) - Reborn CLI 迁移:** 将 `doctor`, `status` 等只读命令迁移至 Reborn 路径，属于技术债务清理的基石工作，需要加速推进以避免双架构并存的维护成本。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

以下是为您生成的 LobsterAI 项目 2026-06-05 动态日报。报告基于客观数据分析，聚焦项目健康度、研发进展与社区生态。

---

# 📊 LobsterAI 项目动态日报 (2026-06-05)

## 1. 今日速览
今日 LobsterAI 项目呈现出**“高研发产出与集中代码清理并存”**的健康态势。过去 24 小时内，项目处理了高达 16 个 Pull Requests，其中包含将 `2026.5.28` 正式版代码合并回主干的重要操作，以及多个针对 MCP 连接稳定性和 Cowork 模块的关键修复。同时，维护者进行了严格的代码库维护，集中关闭了一批长期未更新的“陈旧”社区 PR。尽管合入量巨大，但今日仅有 1 个老 Issue 产生新评论，且无新版本发布，说明项目目前正处于大版本发布后的稳定性维护与沉淀期。

## 2. 版本发布
**今日无新版本发布。**
*注：虽然无新 Release，但今日合入了重要的 PR [#2090](https://github.com/netease-youdao/LobsterAI/pull/2090)，将 `release/2026.5.28` 分支合并回 `main`。这标志着 2026.5.28 版本的正式定稿。该版本包含 73 个提交，带来了 Kit（专家套件）市场、Cowork 会话本地分叉等重磅功能。*

## 3. 项目进展
今日共有 16 个 PR 被关闭（部分为代码库清理），项目在以下几个核心领域取得了实质性进展：

*   **主干代码同步**：[#2090](https://github.com/netease-youdao/LobsterAI/pull/2090) 成功将 5.28 版本的所有特性合入主分支，确保后续开发基于最新的稳定特性基线。
*   **MCP 链路深度优化**：MCP（模型上下文协议）的健壮性得到大幅提升。
    *   [#2091](https://github.com/netease-youdao/LobsterAI/pull/2091) 优化了 `npx` 启动解析逻辑，大幅降低首次会话启动耗时。
    *   [#2100](https://github.com/netease-youdao/LobsterAI/pull/2100) 修复了托管安装中 Node 环境丢失的问题。
    *   [#2103](https://github.com/netease-youdao/LobsterAI/pull/2103) 增加了对远程 MCP 服务器 URL 的校验拦截。
*   **Cowork 机制完善**：
    *   [#2111](https://github.com/netease-youdao/LobsterAI/pull/2111) 对语音输入模块进行了深度重构，拆分了录制、编码和 ASR 客户端模块。
    *   [#2110](https://github.com/netease-youdao/LobsterAI/pull/2110) 增加了对 OpenClaw 超大图片载荷的前置检测与拦截，防止网关报错。
*   **多模态模型支持**：[#2093](https://github.com/netease-youdao/LobsterAI/pull/2093) 修复了 MiniMax-M3 模型的图片输入被错误禁用的硬编码问题，解锁了 M3 的视觉能力。

## 4. 社区热点
今日社区整体趋于平静，热度集中在历史遗留问题的探讨：
*   **OpenClaw 网关启动超时疑问**：[#769](https://github.com/netease-youdao/LobsterAI/issues/769) 是今日唯一活跃的 Issue。作者 @15999803458-boop 对 OpenClaw 网关超时的错误截图发出疑问。这反映了**本地 AI 网关的启动稳定性及报错提示的易读性**仍是普通用户的痛点。

## 5. Bug 与稳定性
根据今日合并的修复 PR 及开放的 Issue，项目在以下模块进行了稳定性加固：

*   **🟡 中等严重度：MCP 连接与启动失败链路**
    *   *表现*：部分 stdio MCP 启动缓慢甚至失败，远程 URL 配置错误导致运行时崩溃。
    *   *状态*：已修复并合入 (见 PR [#2091](https://github.com/netease-youdao/LobsterAI/pull/2091), [#2103](https://github.com/netease-youdao/LobsterAI/pull/2103))。
*   **🟡 中等严重度：Cowork 载荷溢出**
    *   *表现*：发送超大图片导致 OpenClaw 网关 `1009` 报错。
    *   *状态*：已修复并合入，增加了前置拦截 (见 PR [#2110](https://github.com/netease-youdao/LobsterAI/pull/2110))。
*   **🟡 中等严重度：网关启动偶发超时**
    *   *表现*：Issue [#769](https://github.com/netease-youdao/LobsterAI/issues/769) 显示 OpenClaw 网关有时未能在规定时间内启动。
    *   *状态*：Open，目前尚无明确的修复 PR。

## 6. 功能请求与路线图信号
虽然今日没有新产生的功能需求 Issue，但通过合并的 PR 和对历史代码的清理，可以洞察出项目的路线图信号：
*   **Kit 专家系统成为核心战略**：随着 `2026.5.28` 版本的合入，Kit 市场的 UI 与交互正式定型，这将是 LobsterAI 下游应用生态的核心。
*   **插件系统的收敛与管控**：PR [#2096](https://github.com/netease-youdao/LobsterAI/pull/2096) 隐藏了 OpenClaw 内部的运行时插件，表明项目在走向成熟期时，开始注重内部 API 和插件边界的隔离，减少用户误操作的风险。

## 7. 用户反馈摘要
*   **痛点**：从 Issue [#769](https://github.com/netease-youdao/LobsterAI/issues/769) 的用户反馈来看，当前 AI Agent 运行时的报错信息对普通用户而言依然过于生硬（如直接抛出 Gateway 启动超时截图），缺乏“傻瓜式”的排查指引或自动修复机制。
*   **满意点**：MiniMax-M3 视觉能力的“解禁”（[#2093](https://github.com/netease-youdao/LobsterAI/pull/2093)）响应了多模态用户的需求，显示出研发团队对主流模型能力更新的跟进非常敏捷。

## 8. 待处理积压
今日维护者进行了一次**非常果断的代码库大扫除**，集中关闭了 7 个标记为 `[stale]` 的 PR。这是一个强烈的信号：项目对代码质量要求极高。以下是值得关注的积压情况：

*   **未获响应的社区特性 PR（已关闭）**：
    *   [#1538](https://github.com/netease-youdao/LobsterAI/pull/1538)（AI回复书签功能）和 [#1542](https://github.com/netease-youdao/LobsterAI/pull/1542)（会话标签分类）均因 stale 被关闭。
    *   *分析师建议*：如果有社区开发者希望贡献这两个高价值功能，建议参照最新的代码架构（特别是近期的重构规范）重新提交 PR。
*   **悬而未决的 Bug**：
    *   Issue [#769](https://github.com/netease-youdao/LobsterAI/issues/769)（网关启动超时）自 3 月份断断续续被提及，至今未彻底解决。由于 OpenClaw 是 LobsterAI 的核心底层引擎，建议核心维护团队在下一个开发周期中投入精力排查该环境兼容性问题。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下是为您生成的 **CoPaw (QwenPaw)** 项目 2026-06-05 动态日报：

---

# 📊 CoPaw (QwenPaw) 项目动态日报 (2026-06-05)

## 1. 今日速览
CoPaw (QwenPaw) 项目今日保持了**极高的开发与社区活跃度**。过去 24 小时内，项目共处理了 32 条 Issue（新增/活跃 15，关闭 17）和 33 条 PR（待合并 10，合并/关闭 23），闭合率极高，显示出维护团队强大的问题消化能力。
今日项目正式发布了 **`v1.1.11-beta.1`** 版本，主要针对模型配置兜底和定时任务逻辑进行了修复与重构。社区侧，讨论焦点高度集中于**智能体执行中断机制、上下文压缩稳定性**以及**前端 UI 交互优化（如 Token 可视化、Skill 调用）**。总体而言，项目正处于快速迭代期，多智能体架构和插件生态正在迅速完善。

## 2. 版本发布
今日发布 1 个新版本：**[v1.1.11-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.11-beta.1)**
*   **更新内容**：
    *   `fix(config)`: 增加了 `ProviderManager` 的 fallback 机制，修复了获取模型最大输入长度 (`get_model_max_input_length`) 时的异常问题 (by @szetohoyan)。
    *   `refactor(cron)`: 禁用了类型为 `'agent'` 的定时任务的推送气泡功能，优化了前端消息体验 (by @lalaliat)。
*   **破坏性变更/迁移注意**：本次为 Beta 版更新，无重大破坏性变更，建议用户重点关注 `ProviderManager` 在使用第三方模型时的兼容性表现。

## 3. 项目进展
今日共有 23 个 PR 被合并或关闭，项目在**多智能体协作、API 兼容性和前端健壮性**上迈出了重要一步：
*   **MCP 工具兼容性修复**：PR [#4958](https://github.com/agentscope-ai/QwenPaw/pull/4958) 被合并，引入了 MCP 工具名的别名重写机制，解决了包含 `.` 等特殊字符的工具名在 OpenAI/GPT 系列模型中校验失败的问题。
*   **多智能体协作模式扩展**：PR [#4806](https://github.com/agentscope-ai/QwenPaw/pull/4806) 合并，新增 `spawn_subagent` 内置工具，允许主智能体在自己的工作空间内委派临时子任务。
*   **底层稳定性修复**：修复了 Gunicorn 启动时的崩溃问题 ([#3403](https://github.com/agentscope-ai/QwenPaw/pull/3403))、Anthropic 历史工具调用的重放错误 ([#2079](https://github.com/agentscope-ai/QwenPaw/pull/2079)) 以及状态存储的防破坏加固 ([#1240](https://github.com/agentscope-ai/QwenPaw/pull/1240))。
*   **前端体验优化**：QQ 渠道新增扫码授权登录 ([#4848](https://github.com/agentscope-ai/QwenPaw/pull/4848))，飞书支持了交互式卡片的内容提取 ([#4879](https://github.com/agentscope-ai/QwenPaw/pull/4879))。

## 4. 社区热点
今日社区讨论最为热烈的功能与问题如下：
*   **前端工具调用不显示 ([#4644](https://github.com/agentscope-ai/QwenPaw/issues/4644))**：以 20 条评论位居榜首。用户反馈在 Web 控制台中，除 `read_file` 外的多数工具调用无法实时显示，需手动刷新。该缺陷严重影响前端交互体验，目前已被关闭（可能已在最新版修复）。
*   **输入框 Skill 快捷呼出 ([#4796](https://github.com/agentscope-ai/QwenPaw/issues/4796))**：6 条评论。用户建议在输入框键入 `/` 时，能像主流 Agent 产品一样自动关联并补全可调用的 Skill。
*   **记忆系统“只记录不学习” ([#4652](https://github.com/agentscope-ai/QwenPaw/issues/4652))**：4 条评论。深度用户指出当前记忆系统缺乏“总结-关联-提醒”机制，容易退化成简单的信息堆砌，建议引入状态管理和跨时域聚合能力。

## 5. Bug 与稳定性
今日报告了多个关键 Bug，部分已有修复方案：
*   **严重 (High)**：执行过程陷入死循环，无法退出 ([#4967](https://github.com/agentscope-ai/QwenPaw/issues/4967))。用户在 v1.1.10 版本中遇到智能体无法停止执行的问题，目前 Issue 为 OPEN 状态，亟待官方确认。
*   **中等**：`/compact` 命令引发崩溃，报错 `'str' object has no attribute 'get'` ([#4953](https://github.com/agentscope-ai/QwenPaw/issues/4953), [#4956](https://github.com/agentscope-ai/QwenPaw/issues/4956))。当消息内容包含混合类型列表时触发，目前均已 CLOSED。
*   **中等**：DeepSeek API 回复内容折叠在思考过程中 ([#4962](https://github.com/agentscope-ai/QwenPaw/issues/4962))，影响对话连贯性阅读。
*   **低/已修复**：MCP 工具名导致 GPT-5.5 校验失败 ([#4918](https://github.com/agentscope-ai/QwenPaw/issues/4918))，已通过 PR [#4958](https://github.com/agentscope-ai/QwenPaw/pull/4958) 修复。

## 6. 功能请求与路线图信号
结合今日的 Issues 和活跃的 PRs，可以洞察到项目近期的演进方向：
*   **执行管控干预**：用户强烈要求支持在 Agent 执行过程中“打断/中止”任务 ([#4961](https://github.com/agentscope-ai/QwenPaw/issues/4961), [#4964](https://github.com/agentscope-ai/QwenPaw/issues/4964))。配合今日关于子智能体生命周期事件提交的 PR [#4955](https://github.com/agentscope-ai/QwenPaw/pull/4955)，**“精细化任务控制”大概率是 v1.1.11 正式版的核心看点**。
*   **定时任务脚本化**：多位用户希望 Cron 任务能从单纯的文本/Agent 交互扩展到直接执行本地 Shell 脚本 ([#4950](https://github.com/agentscope-ai/QwenPaw/issues/4950), [#4963](https://github.com/agentscope-ai/QwenPaw/issues/4963))。
*   **Token 用量可视化**：PR [#4433](https://github.com/agentscope-ai/QwenPaw/pull/4433) 正在推进在 UI 底部实时显示当前会话的 Token 消耗与上下文占用比例，这直接响应了 Issue [#4767](https://github.com/agentscope-ai/QwenPaw/issues/4767) 和 [#4782](https://github.com/agentscope-ai/QwenPaw/issues/4782) 的诉求。

## 7. 用户反馈摘要
*   **上下文管理焦虑**：用户非常在意“上下文是否溢出”和“压缩是否出错”，希望能直观看到剩余上下文窗口大小，以便主动管理对话。
*   **跨盘/局域网访问痛点**：Windows 桌面版用户反馈无法在代码模式中打开其他硬盘的项目 ([#4876](https://github.com/agentscope-ai/QwenPaw/issues/4876))，以及局域网内手机无法通过 IP+端口访问控制台 ([#4960](https://github.com/agentscope-ai/QwenPaw/issues/4960))，说明 Desktop 端的网络与权限配置仍需优化。
*   **多模型高可用需求**：用户在重度使用 DeepSeek 等模型时，对前缀缓存命中率 ([#3891](https://github.com/agentscope-ai/QwenPaw/issues/3891)) 和配额耗尽后的自动降级切换 ([#4757](https://github.com/agentscope

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

以下是为您生成的 **EasyClaw** 开源项目 2026-06-05 动态日报。作为 AI 助手与智能体领域的开源项目分析师，我基于您提供的 GitHub 数据，对项目的健康度与进展进行了客观评估。

---

# 📊 EasyClaw 开源项目动态日报 (2026-06-05)

**项目仓库**：[github.com/gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw)

## 1. 📰 今日速览
2026年6月5日，EasyClaw 项目整体呈现出**“低社区噪音、高核心产出”**的稳健状态。过去 24 小时内，项目未收到新的 Issue 或 Pull Request，社区互动处于静默期。然而，核心开发团队在底层架构上进行了实质性推进，正式发布了 **v1.8.30 (RivonClaw)** 版本。此次更新高度聚焦于提升 AI 客服智能体在复杂网络环境下的鲁棒性（如重连保活、媒体代理缓存），表明项目正处于“打磨核心链路、提升生产可用性”的成熟演进阶段。

## 2. 🚀 版本发布
今日项目发布了一个重要更新版本，主要针对智能体客服场景的稳定性进行了深度优化：

- **版本号**：[v1.8.30: RivonClaw v1.8.30](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.30)
- **核心更新内容**：
  - **客服 Relay 生命周期稳定化**：优化了客服系统中店铺生命周期的处理逻辑。
  - **订阅重连上下文保留**：修复/优化了在网络波动导致订阅重连时，客服店铺上下文丢失的问题。这对于 AI 智能体的“长记忆”和“服务连续性”至关重要。
  - **媒体附件可靠加载**：远程媒体资源现已通过缓存代理进行路由，大幅提升了 AI 助手在处理多媒体内容（如图片、文件）时的加载成功率与响应速度。
- **破坏性变更与迁移注意**：当前 Release Notes 未提示存在破坏性变更（Breaking Changes）。建议依赖此项目的下游开发者关注网络层代理配置，若原有架构对媒体直连有安全策略限制，可能需要为新增的 Cached Proxy 放行相应规则。

## 3. 🛠️ 项目进展
- **PR 合并与功能推进**：今日共有 **0 条** PR 被合并或关闭（[查看 PR 列表](https://github.com/gaoyangz77/easyclaw/pulls)）。
- **进展分析**：尽管今日无可见的 PR 合并记录，但从 v1.8.30 的发布可以看出，核心代码的变更（可能是通过直接推送至主分支或内部 CI/CD 完成同步）成功推进了 AI 客服长连接稳定性和媒体代理缓存功能的落地。项目整体在“智能体会话保持”这一技术指标上向前迈进了一步。

## 4. 💬 社区热点
- 今日项目无新开或活跃的 Issue 和 PR 讨论（[查看 Issue 列表](https://github.com/gaoyangz77/easyclaw/issues)）。
- **分析**：社区目前处于消化新版本的平静期，暂未出现针对特定使用场景的集中讨论。

## 5. 🐛 Bug 与稳定性
- **今日报告缺陷**：**0 条**。
- **稳定性内参**：虽然社区今日未报告 Bug，但今日发布的 v1.8.30 版本实际上属于**“稳定性增强版本”**。它隐性修复了智能体在长周期运行中的两个痛点：重连导致上下文丢失（会话断裂）以及媒体加载不稳定。建议所有已部署 AI 客服场景的用户尽快升级至此版本以获得更高的生产稳定性。

## 6. 🗺️ 功能请求与路线图信号
- **显性需求**：今日未收到用户提交的新功能请求。
- **路线图推断**：通过分析 v1.8.30 的更新，可以洞察到项目后续的隐性路线图：
  1. **重连机制优化**：项目正在加强弱网环境下的容错能力。
  2. **基础设施增强**：引入缓存代理处理媒体，暗示项目正在为未来支持更大数据量的多模态 AI 交互（如语音、视频流处理）做底层网络架构的准备。

## 7. 📣 用户反馈摘要
- 今日无新增 Issue 评论，暂无法从互动中提取直接的用户反馈。但从本次更新的方向可以逆向推断出：此前用户在使用 AI 智能体接管客服时，可能反馈过“长时间挂机后 AI 失忆（上下文丢失）”或“图片/文件打不开”的痛点，维护者通过本次更新在底层给予了精准回应。

## 8. ⏳ 待处理积压
- 今日暂无长期未响应（Stale）的 Issue 或 PR 需要特别拉取警报。
- **给维护者的建议**：目前项目处于代码产出期，建议在闲暇时补充 v1.8.30 相关的详细技术文档或迁移指南，以降低未来新用户接入和参与社区贡献的门槛。

---
*本报告由 AI 智能体分析师基于 GitHub 数据自动生成，关注开源项目健康度与生态发展。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*