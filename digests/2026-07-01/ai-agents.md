# OpenClaw 生态日报 2026-07-01

> Issues: 316 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-07-01 04:55 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

这是一份基于 2026 年 7 月 1 日 GitHub 数据生成的 OpenClaw 项目动态日报。

# 📊 OpenClaw 项目动态日报 (2026-07-01)

## 1. 今日速览
今日 OpenClaw 保持了极高的社区与开发活跃度，单日处理 **316 条 Issue 动态**（247 条活跃/新开）以及高达 **500 条 PR 动态**（410 条待处理）。项目刚刚发布了 **v2026.6.11** 稳定性修复版本，重点打磨了导致系统不可靠的边缘场景（如消息错位、发送卡死、重连失败）。然而，从 Issue 反馈来看，随着用户对复杂 Agent 工作流（如 Subagent 调用、多模型 Fallback、长期记忆）的深入使用，会话隔离与多模型接入的底层 Bug 仍在集中爆发，项目正处于“高速迭代与深度排雷”并行的关键阶段。

---

## 2. 版本发布
### 🚀 v2026.6.11: openclaw 2026.6.11
- **发布重点**：倾听社区反馈，致力于消除让 OpenClaw 显得“不可靠”的粗糙边缘。
- **核心修复**：
  - 修复了错误放置的回复和发送卡住的问题。
  - 优化了断线重连机制。
  - 修复了部分模型设置失败的问题。
  - **⚠️ 破坏性/迁移注意**：引入了**更安全的管理员默认配置**，企业用户在升级后需检查权限与网关配置是否符合预期。
- **详情链接**：[Full release notes](https://docs.openclaw.ai/releases/2026.6.11)

---

## 3. 项目进展
今日共有 90 个 PR 被合并或关闭，项目在底层稳定性和插件兼容性上迈出坚实一步：
- **架构容错优化**：[PR #98410](https://github.com/openclaw/openclaw/pull/98410) 修复了 z.ai 等服务返回 429 "overloaded" 时被误判为限流的问题。
- **会话死锁修复**：[PR #92819](https://github.com/openclaw/openclaw/pull/92819) 重构了 Subagent 的模型回退选择逻辑，解决陈旧的 auto-fallback 导致的会话状态冲突。
- **多媒体与多模态**：[PR #97742](https://github.com/openclaw/openclaw/pull/97742) 修复了结构化工具结果文本在不同 LLM Provider 之间传递时丢失或被压缩成占位符的问题。
- **UI/UX 优化**：[PR #98385](https://github.com/openclaw/openclaw/pull/98385) 为移动端加入了协议不匹配时的可操作恢复指引，而非直接抛出原始错误。

---

## 4. 社区热点
今日讨论度最高的话题集中在**移动端体验缺失**与**高级 Agent 通讯受阻**：
1. **🔥 呼声最高：预构建 Android APK** - [Issue #9443](https://github.com/openclaw/openclaw/issues/9443) (26 评论)
   - **诉求**：用户（通过 AI 助手代提）强烈要求在 GitHub Releases 中直接提供预编译的 Android APK，而不是让普通用户自行编译源码，表明 OpenClaw 的受众正向非开发者的高级极客群体扩展。
2. **Subagent 死锁与消息丢失** - [Issue #90178](https://github.com/openclaw/openclaw/issues/90178) (4 评论) / [Issue #84583](https://github.com/openclaw/openclaw/issues/84583) (9 评论)
   - **诉求**：当 Subagent 完成任务并尝试向父级 Agent 通知（Announce）时，如果父级正在处理或发生超时，会导致父子会话永久死锁或消息被静默丢弃。这直接破坏了复杂自动化工作流的可用性。

---

## 5. Bug 与稳定性
今日报告了多个影响严重的 P0/P1 级别故障，核心焦点在“数据安全”与“网关稳定性”：

- **🚨 P0 级：记忆数据被静默删除** 
  - [Issue #84882](https://github.com/openclaw/openclaw/issues/84882): `memory-core` 的 Dreaming 流程在标准化重写存储时，静默删除了用户的每日记忆文件 (`memory/YYYY-MM-DD.md`)，造成不可逆的数据丢失。
- **🚨 P1 级：网关隔离崩溃** 
  - [Issue #84903](https://github.com/openclaw/openclaw/issues/84903): 单个 Agent 会话卡死（由于锁争用）会阻塞整个 Gateway 的事件循环，导致其他所有 Agent 和会话停止处理消息。
- **🚨 P1 级：长文本回复被静默截断** 
  - [Issue #84516](https://github.com/openclaw/openclaw/issues/84516): Codex app-server (gpt-5.5) 在无任何错误抛出的情况下，将超过 1000-1100 字符的 Agent 回复直接截断，导致半截回复被送回用户。
- **🚨 P1 级：macOS 网关崩溃循环**
  - [Issue #83968](https://github.com/openclaw/openclaw/issues/83968) / [Issue #84610](https://github.com/openclaw/openclaw/issues/84610): macOS 或 WSL2 升级后，Gateway 陷入无休止的重启死循环 (SIGTERM)。

*(注：部分核心 Bug 如 Claude 的 `thinking block` 签名失效已有对应修复 PR [#98411](https://github.com/openclaw/openclaw/pull/98411) 提交)*

---

## 6. 功能请求与路线图信号
结合需求与待合并 PR，以下功能极有可能在近期版本落地：
1. **iMessage 原生投票支持** - [PR #98421](https://github.com/openclaw/openclaw/pull/98421)
   - 补齐了 iMessage 渠道的交互短板，支持 Agent 创建、读取和参与投票。
2. **MCP Server 长效 OAuth 维护** - [PR #98407](https://github.com/openclaw/openclaw/pull/98407)
   - 针对 Model Context Protocol 的改进，网关将能够为长期运行的 MCP 服务器主动刷新 OAuth 令牌，大幅提升外挂工具的可用性。
3. **单网关多 Teams 机器人支持** - [Issue #71058](https://github.com/openclaw/openclaw/issues/71058)
   - 企业级需求，要求打破目前一个网关只能绑定一个 Azure Teams 机器人的限制。

---

## 7. 用户反馈摘要
通过对评论的挖掘，提炼出当前用户的三大核心痛点：
1. **“静默失败”是最大的信任杀手**：用户反馈最多、最不满的词汇是 "silently"（静默地）。无论是消息被截断、模型调用失败、还是记忆被删除，系统往往不抛出错误（返回 200 OK），导致用户误以为 Agent 执行成功，这对依赖 OpenClaw 做生产级调度的开发者造成了极大困扰。
2. **多提供商适配的脆弱性**：从 Anthropic 的 `thinking signatures` 到 OpenAI 的 `prompt cache`，再到 xAI Grok 的 403 错误。OpenClaw 在适配各家属的独家特性时频繁出现 breaking changes，网络代理层显得过于脆弱。
3. **移动端生态渴求**：大量普通用户苦于没有开箱即用的移动端 App，高赞 Issue 集中在求 APK 和求修复 iOS 语音路由故障（[Issue #91007](https://github.com/openclaw/openclaw/issues/91007)）。

---

## 8. 待处理积压

---

## 横向生态对比

以下是为您生成的 2026 年 7 月 1 日 AI 智能体开源生态横向对比分析报告：

### 1. 生态全景
2026 年中，个人 AI 助手与自主智能体开源生态正处于从“功能验证”向“生产级可靠交付”跨越的深水区。智能体架构正在全面向多模型适配、多平台网关（Teams/Telegram/iMessage）以及基于 MCP (Model Context Protocol) 的工具生态演进。然而，随着应用场景的复杂化，**底层并发隔离、长上下文 Token 成本优化以及“静默失败”**已成为全生态共同面临的三大技术债。

### 2. 各项目活跃度对比
两大头部项目均处于极度活跃状态，单日代码与社区动态处理量均达到极高水平。

| 项目名称 | Issue 动态 (活跃/新开) | PR 动态 (合并/关闭) | Release 情况 | 健康度与阶段评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 316 条 (247条) | 500 条 (90条) | **v2026.6.11**<br>(稳定性修复) | **高速迭代/深度排雷**：面临复杂工作流引发的 P0/P1 级底层数据安全与并发崩溃问题，但修复响应极快。 |
| **Hermes Agent** | 284 条 (229条) | 500 条 (181条) | 无新版本发布<br>(主分支攻坚) | **架构加固/体验优化**：无重大版本发布，重心在于安全边界加固、Docker体验优化及多语言支持。 |

### 3. OpenClaw 在生态中的定位
*   **优势**：OpenClaw 展现出了极强的企业级与重度自动化场景适应性。其对 Subagent（子智能体）编排、iMessage 原生投票、多 Teams 机器人支持等特性的推进，表明其在**复杂交互与多渠道企业通讯**中占据领先地位。
*   **技术路线差异**：相较于其他项目，OpenClaw 更倾向于“大包大揽”的网关架构（如内置 Dreaming 记忆重写流程、多模型 Auto-fallback），这为其带来了极高的开箱即用率，但也导致了更为严峻的底层锁争用和网关隔离挑战。
*   **社区规模**：受众面最广，不仅有大量开发者，还吸引了大量非开发者的极客用户（如强烈呼吁提供预编译 Android APK），标志着其已具备破圈效应的 C 端潜力。

### 4. 共同关注的技术方向
从两大项目的动态中，可以清晰提取出当前 AI 智能体领域的共性技术焦点：
1.  **MCP (Model Context Protocol) 稳定性与安全机制**：
    *   *OpenClaw* 致力于为长效 MCP Server 引入主动刷新 OAuth 令牌机制。
    *   *Hermes Agent* 集中修复了 MCP 触发 HTTP 429 断路器误判，并增加返回结果字节上限以防止上下文撑爆。
2.  **多模型提供商适配的脆弱性**：
    *   *OpenClaw* 在努力适配 Anthropic 签名、OpenAI 截断问题和 z.ai 限流问题。
    *   *Hermes Agent* 刚修复了 OpenAI Codex 后端强制 `stream:true` 导致的解析崩溃。
3.  **长期记忆与会话状态持久化**：
    *   *OpenClaw* 在紧急修复 `memory-core` 导致的数据丢失问题。
    *   *Hermes Agent* 社区强烈呼吁跨会话持久化记忆与自动压缩机制（Issue #8457）。
4.  **桌面端与移动端下沉**：
    *   两大项目都在发力桌面端（多语言、云连通、跨架构兼容）与移动端体验。

### 5. 差异化定位分析
*   **功能侧重**：
    *   **OpenClaw**：侧重于**企业级网关集成**（Teams/iMessage）与**复杂父-子 Agent 协同**。
    *   **Hermes Agent**：侧重于**开发者体验（DX）与底层安全**（如引入远程终端沙箱的 TLS 拦截出口代理）、以及模型调用成本控制。
*   **目标用户**：
    *   **OpenClaw**：正向非开发的高级极客以及企业协同自动化场景渗透。
    *   **Hermes Agent**：更多吸引本地模型部署者、关注安全沙箱的开发者，以及对 API 开销敏感的极客。
*   **技术架构瓶颈**：
    *   **OpenClaw** 架构痛点在于网关事件循环阻塞和会话死锁。
    *   **Hermes Agent** 架构痛点在于 Docker 权限过高等工程化问题及固定 Token 消耗。

### 6. 社区热度与成熟度
*   **OpenClaw（狂飙突进与阵痛期）**：单日超 300 个 Issue 和近百个 PR 合并，说明项目处于极其火热的扩张期。但频发的“记忆静默删除”、“网关死锁”等 P0/P1 级 Bug，表明其复杂度的增速已暂时领先于其架构的承载能力。
*   **Hermes Agent（打磨与巩固期）**：虽然 PR 处理量同样高达 500（合并 181 个），但重心明显向沙箱安全、流响应脱敏、i18n 国际化倾斜，说明项目正处于从“能用”到“好用且安全”的质量巩固阶段。

### 7. 值得关注的趋势信号（开发者参考建议）
1.  **“静默失败”是生产级 Agent 的最大信任杀手**：系统在网关超时、长文本截断或模型调用失败时，常返回 `200 OK` 且不抛出异常（如 OpenClaw 的反馈）。**建议开发者在编排 Agent 时，强制引入应用级的回执校验机制**，不要盲目信任底层 API 的状态码。
2.  **Token “无效开销”优化将成为下一个突破口**：Hermes Agent 暴露的“固定 Token 开销高达 73%”问题极具代表性。**“延迟加载工具 Schema（两阶段注入）”**将成为降低复杂 Agent 使用成本的关键技术方案，值得持续关注。
3.  **沙箱与隔离成为刚需**：无论是 OpenClaw 的网关事件循环阻塞，还是 Hermes Agent 引入的 TLS 出口拦截代理，都释放了一个强烈信号：**AI 智能体不能再“裸奔”**。针对外挂工具（MCP）的执行环境，必须建立严格的字节级限制、出口网络拦截和死锁防御机制。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

这份报告为您呈现开源项目 **Hermes Agent** 在 2026-07-01 的动态汇总。从数据来看，Hermes Agent 目前处于**极度活跃**的状态，社区参与度极高，开发进度迅猛。

以下是详细的日报分析：

### 1. 今日速览
- **整体活跃度极高**：过去 24 小时内，项目处理了 284 条 Issue 动态（229 条新开/活跃）和高达 500 条 PR 动态（其中 181 条被合并或关闭），展现了极强的社区贡献意愿和维护者审查力度。
- **无新版本发布**：项目今日未发布新 Release，当前主要精力集中在主分支的缺陷修复、体验优化以及安全边界的加固上。
- **核心焦点**：社区讨论最热烈的领域集中在**Token 开销优化**与**桌面端体验**；代码层面，MCP 工具限制、沙箱安全代理以及多会话状态隔离是今日的攻坚重点。

### 2. 版本发布
**今日无新版本发布。**
*注：Issue #33439 提到当前 PyPI 上的最新版 v0.14.0 在调用 OpenAI Codex 后端时存在严重兼容性缺陷（已被标记为已关闭，且修复代码已并入 main 分支），预计下一个正式版本将很快发布。*

### 3. 项目进展
今日共有 181 个 PR 被合并或关闭，项目在以下几个关键维度取得了实质性推进：
- **安全与隔离防护**：
  - [PR #30179](https://github.com/NousResearch/hermes-agent/pull/30179) 引入了针对远程终端沙箱的 TLS 拦截出口代理，通过令牌替换机制大幅提升沙箱环境的安全性。
  - [PR #56052](https://github.com/NousResearch/hermes-agent/pull/56052) 修复了流式响应分块中未脱敏密钥的漏洞。
- **MCP (Model Context Protocol) 稳定性**：
  - [PR #56065](https://github.com/NousResearch/hermes-agent/pull/56065) 修复了因触发速率限制（HTTP 429）导致 MCP 断路器误判的问题。
  - [PR #56068](https://github.com/NousResearch/hermes-agent/pull/56068) 和 [PR #56060](https://github.com/NousResearch/hermes-agent/pull/56060) 为 MCP 工具返回结果增加了字节上限，防止恶意或错误输出撑爆上下文。
- **桌面端与多终端体验优化**：
  - [PR #56062](https://github.com/NousResearch/hermes-agent/pull/56062) 修复了用户消息气泡在打断任务时消失的竞态条件。
  - [PR #38846](https://github.com/NousResearch/hermes-agent/pull/38846) 桌面端全面引入了 15 种语言的原生 i18n 支持。

### 4. 社区热点
今日社区讨论最热烈的话题暴露了用户在成本控制和人机交互上的深层需求：
- **居高不下的 Token 开销**：[Issue #6839](https://github.com/NousResearch/hermes-agent/issues/6839)（29条评论）和 [Issue #4379](https://github.com/NousResearch/hermes-agent/issues/4379)（17条评论）深度剖析了 API 调用中固定 Token 开销高达 73% 的问题。用户强烈呼吁实现**“延迟加载工具 Schema（两阶段注入）”**，这已成为社区最期待的 P2/P3 级核心功能。
- **多平台网关与适配**：[Issue #44428](https://github.com/NousResearch/hermes-agent/issues/44428) 讨论了对 Telegram Bot API 10.1 富文本消息和草稿流的支持；[Issue #14448](https://github.com/NousResearch/hermes-agent/issues/14448) 则严厉吐槽了目前 Docker 容器化的糟糕体验（如不必要的 root 权限要求）。
- **AI 记忆机制**：[Issue #8457](https://github.com/NousResearch/hermes-agent/issues/8457) 讨论了跨会话持久化记忆与自动压缩功能，反映了重度用户希望让 Agent 具备真正的长期记忆。

### 5. Bug 与稳定性
今日报告并处理的 Bug 按严重程度划分如下：
- **严重 (P1 - 导致服务不可用)**：
  - [Issue #33932](https://github.com/NousResearch/hermes-agent/issues/33932) / [Issue #33439](https://github.com/NousResearch/hermes-agent/issues/33439)：OpenAI Codex 提供程序崩溃，因后端强制要求 `stream:true` 导致解析 `'NoneType'` 报错。（*状态：已修复/已关闭*）
  - [Issue #51587](https://github.com/NousResearch/hermes-agent/issues/51587)：配置好的 MCP 工具连接成功，但在 Agent 会话中完全不可见。（*状态：已修复/已关闭*）
- **高危 (P2 - 特定场景功能失效)**：
  - [Issue #52914](https://github.com/NousResearch/hermes-agent/issues/52914)：QQBot 网关因缺少 `is_reconnect` 参数陷入无限重试死循环。
  - [Issue #21498](https://github.com/NousResearch/hermes-agent/issues/21498)：自定义提供程序的 `max_output_tokens` 配置在底层被静默丢弃，导致模型只能输出 2048 个 Token。
- **中等 (P3 - 体验受损)**：
  - [Issue #37505](https://github.com/NousResearch/hermes-agent/issues/37505)：桌面端 macOS DMG 仅为 arm64 架构，导致 Intel Mac 无法运行。（*状态：已修复/已关闭*）
  - [Issue #38855](https://github.com/NousResearch/hermes-agent/issues/38855)：桌面端工作目录配置被旧的缓存强行覆盖。

### 6. 功能请求与路线图信号
结合用户的 Feature Request 和今日的 PR 提交，可以看出项目演进的几个明确信号：
- **平台扩充**：[PR #56054](https://github.com/NousResearch/hermes-agent/pull/56054) 添加了 W&B (Weights & Biases) 作为模型提供程序。同时，原生支持 Windows ([Issue #10359](https://github.com/NousResearch/hermes-agent/issues/10359)) 和 Brave Search ([Issue #10644](https://github.com/NousResearch/hermes-agent/issues/10644)) 的呼声极高，后续极有可能被纳入路线图。
- **桌面端“云化”与通知**：[PR #55402](https://github.com/NousResearch/hermes-agent/pull/55402) 正在实现一键连接 Hermes Cloud 的功能；[PR #56063](https://github.com/NousResearch/hermes-agent/pull/56063) 引入了操作系统原生的 Toast 通知，用于在 Agent 寻求澄清或需要授权时提醒用户。
- **运行时机制改造**：社区对 [Issue #10421](https://github.com/NousResearch/hermes-agent/issues/10421) 提出的“回合级实时时间上下文（感知当前时间）”需求强烈，这将极大提升调度类任务的成功率。

### 7. 用户反馈摘要
提炼近期评论，用户的真实体感呈现出两极分化的特征：
- **满意的点**：多网关接入能力强大（Telegram, WhatsApp, Discord 等），Agent 的工具调用编排逻辑在跑通时表现优异，插件系统（如 `hermes-companion` 零侵入插件 #28893）扩展性极强。
- **核心痛点**：
  1. **极度烧钱**：针对本地模型或按量计费模型，固定的上下文开销让部署成本高昂。
  2. **开发/部署门槛高**：Docker 体验极差（#14448），配置文件（`config.yaml`）校验逻辑不透明（如 #8430 设置了 `context_length` 但被忽略，#21498 默默丢弃 token 限制）。
  3. **多会话并发处理脆弱**：多用户共用 Session 时的权限/状态隔离不完善，`stdin EOF` 等网关崩溃问题在 macOS 上频发。

### 8. 待处理积压
以下重要 Issue/PR 悬而未决或需要核心维护者决策，建议关注：
- [Issue #8457](https://github.com/NousResearch/hermes-agent/issues/8457)：关于持久化会话记忆与自动压缩的设计提案，创建于 4 月，需要官方明确架构方向。
- [Issue #

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*