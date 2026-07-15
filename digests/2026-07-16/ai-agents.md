# OpenClaw 生态日报 2026-07-16

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-07-15 21:14 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

以下是 OpenClaw 项目 2026-07-16 的动态日报。作为专注于 AI 智能体与个人 AI 助理领域的开源项目，OpenClaw 目前正处于极高的开发强度和社区活跃度中，同时在架构演进期面临着严峻的稳定性考验。

---

### 📊 OpenClaw 项目动态日报 (2026-07-16)

#### 1. 今日速览
OpenClaw 在过去 24 小时内保持了极高的热度，共处理了 **500 条 Issue 更新**（166 条已关闭）和 **500 条 PR 更新**（145 条已合并/关闭），并发布了最新的 **v2026.7.2-beta.1** 版本。项目当前正经历底层数据架构迁移（向共享 SQLite）的阵痛期，大量关于旧版状态迁移导致网关崩溃的 P0 级 Bug 被报告并得到紧急修复。另一方面，社区对跨平台桌面端（Linux/Windows）、安全防提示词注入以及多模型路由调度的呼声极高。

#### 2. 版本发布
- **[v2026.7.2-beta.1](https://github.com/openclaw/openclaw/releases)** 
  - **核心亮点**：引入了**远程编码会话**功能，用户可以在云端 Worker 上运行 Control UI 会话，并在其所属主机上的终端中打开 Codex 和 Claude 目录会话，同时支持直接在终端中恢复 OpenCode 和 Pi 会话。
  - **破坏性变更与迁移提示**：版本正在深化 SQLite 状态存储的迁移。根据今日反馈，强烈建议用户在升级前备份目录，如果遇到启动网关卡死，需关注 `openclaw doctor` 的修复能力或等待补丁版本。

#### 3. 项目进展
今日共有 145 个 PR 被合并或关闭，项目在架构优化、测试覆盖和核心功能扩展上迈出了一大步：
- **架构与重构**：关闭了超 3000 行代码的巨型模块重构 [PR #108424](https://github.com/openclaw/openclaw/pull/108424)（拆分 Agent 命令编排），并合并了 [PR #108457](https://github.com/openclaw/openclaw/pull/108457) 将 node-host 配置全面迁移至共享 SQLite，统一了状态模型。
- **功能推进**：合并了 Google Meet 的全字幕保留功能 [PR #103811](https://github.com/openclaw/openclaw/pull/103811)，以及修复 Meet 无法正常挂断的 Bug [PR #103522](https://github.com/openclaw/openclaw/pull/103522)。
- **质量基建**：CI 提速 [PR #108386](https://github.com/openclaw/openclaw/pull/108386)（使用 sticky bind mount 加速 Node 测试分片），并推进了多渠道（Slack, Matrix）的 QA 测试清单对齐。

#### 4. 社区热点
今日讨论度最高的话题集中在跨平台支持和 AI 安全机制上：
- **Linux/Windows 原生客户端空缺**：创建于半年前的 [Issue #75](https://github.com/openclaw/openclaw/issues/75)（评论高达 113 条）依然活跃，大量非 macOS 用户迫切需要原生的 Clawdbot Apps。
- **Agent 记忆被毒化防范**：[Issue #7707](https://github.com/openclaw/openclaw/issues/7707)（评论 18 条）提出了基于来源（用户指令、网页抓取、第三方技能）的“记忆信任标签”，直击当前 AI 智能体极易被恶意网页提示词注入的痛点。
- **底层 API 密钥保护**：[Issue #10659](https://github.com/openclaw/openclaw/issues/10659) 呼吁实现“掩码密钥”系统，允许 Agent 调用 API 但禁止其读取原始字符，防止对话泄露凭据。

#### 5. Bug 与稳定性
今日报告了多个高危 Bug，特别是 `2026.7.1` 版本的升级引发了部分严重的启动崩溃（P0）：
- **🔴 P0 级：网关启动崩溃循环**
  - [Issue #107220](https://github.com/openclaw/openclaw/issues/107220) / [Issue #107694](https://github.com/openclaw/openclaw/issues/107694)：旧版内存 sidecar `meta`/`chunks` 冲突及严格的启动迁移警告导致网关无法启动且无限崩溃。
  - [Issue #107227](https://github.com/openclaw/openclaw/issues/107227)：指出 `openclaw doctor` 无法解决上述冲突，导致用户彻底卡死（已关闭，推测已出热修）。
- **🔴 P0 级：工具输出完全损坏**
  - [Issue #104721](https://github.com/openclaw/openclaw/issues/104721)：严重的回归 Bug，文件读取等工具返回的结果全部被占位符 `(see attached image)` 替换，导致 Agent 逻辑彻底断裂。
- **🟠 P1/P2 级：消息通道与会话状态**
  - [Issue #96834](https://github.com/openclaw/openclaw/issues/96834)：WhatsApp 收到图片时会卡死主处理队列约 3 分钟。
  - [Issue #90213](https://github.com/openclaw/openclaw/issues/90213)：`openclaw doctor --fix` 后依然不停报错遗留状态迁移警告。

#### 6. 功能请求与路线图信号
从 Issue 列表和开放 PR 中，可以洞察出项目下一步的可能走向：
- **高级多模型路由调度**：[Issue #107686](https://github.com/openclaw/openclaw/issues/107686) 提出智能多 LLM 路由器（视觉任务、推理任务、Agentic 任务分配给不同模型）；此外 [Issue #9986](https://github.com/openclaw/openclaw/issues/9986) 请求在上下文超限时自动触发后备模型，而不是直接报错卡住。
- **浏览器侧边栏协同**：长期 PR [PR #93680](https://github.com/openclaw/openclaw/pull/93680) 正在推进带按标签页划分的 Agent 会话功能，让用户能直接与浏览器中正在查看的页面进行交互。
- **Agent 执行预算**：[PR #97485](https://github.com/openclaw/openclaw/pull/97485) 引入了循环安全预算限制，防止模型在拿到结果后依然无意义地高频调用工具导致 Token 爆表。

#### 7. 用户反馈摘要
- **痛点 - 状态迁移极其痛苦**：大量用户反馈升级到 `2026.6.x` 及 `2026.7.x` 后，因为 JSONL 到 SQLite 的状态转换、插件元数据冲突（如 Codex/Discord）导致系统无法正常运转，这极大影响了长期托管部署用户的信任。
- **痛点 - 非 Anthropic 模型兼容性掉队**：使用本地 LLM（llama.cpp）或第三方模型（MiniMax, DeepSeek）的用户经常遇到工具调用降级为纯文本输出、缓存命中率骤降等问题（如 [Issue #90288](https://github.com/openclaw/openclaw/issues/90288), [Issue #94518](https://github.com/openclaw/openclaw/issues/94518)）。
- **满意点 - 高度可定制的 Hook 机制**：用户对 OpenClaw 的生命周期钩子非常认可，但希望进一步拓展，例如 [Issue #73274](https://github.com/openclaw/openclaw/issues/73274) 请求允许插件将消息持久化到其他会话的记录中。

#### 8. 待处理积压
以下重要 Issue 涉及核心安全和数据一致性，但处于未关闭/等待状态，需引起维护团队警惕：
- **[Issue #77012](https://github.com/openclaw/openclaw/issues/77012)**：WebChat 会话记录在每轮对话后被覆盖，刷新页面后历史消息全部丢失（5.2 引入的严重回归，标记为 P1，2 个月未彻底解决）。
- **[Issue #84583](https://github.com/openclaw/openclaw/issues/84583)**：Cron 定时任务主动发消息时，与用户正在聊天的状态发生冲突，抛出 `SessionTakeoverError` 异常。
- **[Issue #82548](https://github.com/openclaw/openclaw/issues/82548)**：请求增加 AI 安全和质量的观测性事件（OTEL 监控支持），对于企业级自托管用户极为关键，但进度缓慢。

---

## 横向生态对比

以下是基于 2026-07-16 开源项目动态撰写的横向对比分析报告：

### 1. 生态全景
当前（2026年中），个人 AI 助手与自主智能体开源生态正处于**从“单一对话”向“全域任务编排”跨越的深水区**。项目的竞争核心已转向**深度跨平台集成**（原生桌面端、IM 生态无缝接入）与**复杂上下文管理**（持久化状态重构、多端会话同步）。同时，随着智能体执行权限的扩展，**安全防御**（提示词注入、凭证隔离）与**成本控制**（执行预算、工具死循环熔断）成为架构设计的底层共识。生态整体在经历高速功能迭代后，正面临着严峻的状态迁移与多模型兼容性阵痛。

### 2. 各项目活跃度对比
今日两个项目均保持了极高的社区热度，单日处理工单（Issues + PRs）总更新量均突破千级，显示出智能体赛道旺盛的生命力。

| 项目名称 | Release 状态 | Issue 动态 | PR 动态 | 核心动向 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | **v2026.7.2-beta.1** | 更新 500 (关闭 166) | 更新 500 (合并/关闭 145) | 架构重构（SQLite迁移），高危P0级网关崩溃修复，远程编码会话上线。 | **承压震荡**<br>处于底层架构重构期，回归 Bug 频发，但功能推进迅猛。 |
| **Hermes Agent** | 无 (积累期) | 更新 500 (**关闭 327**) | 更新 500 (待合并 449) | Bug 高效清扫，多 IM 平台（TG/QQ/微信）适配器修复，Docker 体验优化。 | **稳健收敛**<br>Issue 关闭率高达 65.4%，处于质量攻坚与 API 接口收拢阶段。 |

### 3. OpenClaw 在生态中的定位
相比于 Hermes Agent，OpenClaw 展现出**更重端的极客属性与企业级全托管野心**。
*   **技术路线差异**：OpenClaw 正在推进极其复杂的“远程编码会话”与“共享 SQLite 状态统一”，试图打造一个横跨本地终端与云端 Worker 的超级编排中枢；而 Hermes 的重心更多在多渠道路由网关（Telegram/Discord 优先）与 TUI 轻量级看板融合。
*   **核心优势**：OpenClaw 的生命周期 Hook 机制和正在推进的浏览器侧边栏协同（PR #93680），使其在 Web 自动化和深度 OS 集成上具备领先优势。
*   **社区对比**：OpenClaw 的社区痛点集中在“重型状态迁移”和“非 Anthropic 模型掉队”，说明其深度绑定了部分高级开发范式；而 Hermes 社区更关注轻量部署（Docker）和 IM 多开控制。

### 4. 共同关注的技术方向
通过对今日动态的交叉比对，以下四个技术方向已成为 AI 智能体领域的共识：
*   **执行预算与死循环熔断**：防止 Agent 陷入无效工具调用导致 Token 爆表。（**OpenClaw**: PR #97485 引入循环安全预算；**Hermes**: Issue #25823 呼吁默认开启硬停止机制）。
*   **凭证安全与权限隔离**：防止 Agent 在执行任务时泄露敏感信息。（**OpenClaw**: Issue #10659 呼吁 API 密钥掩码系统；**Hermes**: PR #59674 紧急修复企微跨 Profile 凭证泄露漏洞）。
*   **复杂状态与会话隔离**：多任务并发时的上下文管理。（**OpenClaw**: 解决 Cron 任务与实时聊天的冲突（#84583）；**Hermes**: 重写 TurnQueue 架构解决跨标签页状态渗透（#62726））。
*   **跨终端/跨平台无缝体验**：（**OpenClaw**: 迫切需求 Linux/Windows 原生客户端；**Hermes**: 推进 CLI 与 Telegram 共享同一会话上下文）。

### 5. 差异化定位分析
*   **功能侧重**：
    *   **OpenClaw** 侧重于 **“全能型工作站”**：强调多模型智能路由调度、深度浏览器协同、记忆信任标签（防毒化）。
    *   **Hermes Agent** 侧重于 **“自动化中控台”**：强调看板任务调度、多 Agent 委派、基于 IM 平台的原生交互。
*   **目标用户**：
    *   **OpenClaw** 吸引需要长时托管、重度依赖 Web/IDE 带宽的高级极客和企业级自托管用户。
    *   **Hermes Agent** 更受偏好容器化部署、热衷利用 Telegram/Discord 进行轻量级个人助理部署的用户欢迎。
*   **架构基建**：
    *   **OpenClaw** 正在强吃“JSONL 到 SQLite 迁移”的架构苦果，试图统一全量状态。
    *   **Hermes** 则在理顺“多路复用网关”，解决不同 IM 协议（如 QQ, 微信, DeepSeek API）的异构兼容问题。

### 6. 社区热度与成熟度
*   **架构演进与阵痛期 (OpenClaw)**：正处于极速扩张后的**重构撕裂期**。合并了超 3000 行的重型拆分 PR，但也诱发了工具输出损坏（#104721）、网关崩溃（#107220）等极恶劣的 P0 级回归。其核心积压的工单多涉及“数据一致性”与“企业级可观测性”，急需企稳。
*   **质量巩固与收敛期 (Hermes Agent)**：表现出极高的**治理健康度**。单日关闭了超 65% 的 Issue，积极适配第三方提供商（如修复 DeepSeek/Ollama 兼容性）。当前的未决问题多为体验优化（如开放温度参数配置、Docker 权限错乱）。

### 7. 值得关注的趋势信号
1.  **记忆信任分级势在必行**：OpenClaw 提出的“基于来源的记忆信任标签”（#7707）精准切中了 Agent 安全痛点。未来 AI 助手必须能够区分“用户可信指令”与“未授权网页抓取内容”，以防记忆库被恶意提示词毒化。
2.  **多模型路由的工程化落地**：单一模型已无法包打天下。视觉、推理、Agentic 任务将被分发至不同模型，且在上下文超限时必须具备无感降级/后备模型机制，这将成为底层基建标配（OpenClaw #107686）。
3.  **第三方大模型兼容性仍是重灾区**：无论是 OpenClaw 中本地 LLM 降级为纯文本输出，还是 Hermes 中 DeepSeek V4 因空数组拦截请求，都暴露出当前开源智能体在针对非 OpenAI/Anthropic 严苛 API 规范时的适配脆弱性。
4.  **IM 生态与 AI 深度融合**：Hermes 在 Telegram 内嵌 WebView 实现移动端控制面板，以及 OpenClaw 赋能 Google Meet 全字幕保留，预示着 AI Agent 正在加速融入人类的日常工作流软件，而非仅仅作为独立窗口存在。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

**Hermes Agent 项目动态日报**
**日期**: 2026-07-16
**数据来源**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

### 1. 今日速览
过去 24 小时内，Hermes Agent 项目呈现出极高的活跃度与良好的维护健康度。项目处理了多达 500 条 Issue 更新与 500 条 PR 更新，其中 **Issue 关闭率高达 65.4%**（327 条被关闭），表明维护团队和自动化机器人在高效进行 Bug 搜寻与系统清扫工作。当前有 449 个 PR 处于待合并状态，社区贡献热情高涨，主要焦点集中在网关多路复用、Docker 环境适配性以及 Desktop/TUI 交互优化上。

### 2. 版本发布
**本日无新版本发布（0 个 Release）。** 
项目目前处于 v0.18.0（及 v2026.7.1 Docker 镜像）之后的密集修复与功能积累阶段。

### 3. 项目进展
今日合并/关闭的工单推动了多项核心功能的稳定，项目整体在以下方面取得实质性进展：
*   **网关与多平台适配器稳定**：修复了引发广泛关注的 QQ Bot 适配器因缺少 `is_reconnect` 参数导致启动崩溃的问题（[#53443](https://github.com/NousResearch/hermes-agent/issues/53443), [#58646](https://github.com/NousResearch/hermes-agent/issues/58646)），以及 Kanban 任务调度器并发限制失效导致资源耗尽的 Bug（[#59499](https://github.com/NousResearch/hermes-agent/issues/59499)）。
*   **安全与鉴权体系加固**：修复了 Dashboard 仅使用基础密码认证且绑定 `0.0.0.0` 时触发 500 错误的鉴权回路 Bug（[#55130](https://github.com/NousResearch/hermes-agent/issues/55130), [#58810](https://github.com/NousResearch/hermes-agent/issues/58810)）。
*   **Provider 兼容性提升**：解决了 Ollama 忽略 `reasoning_effort: none` 导致 Agent 陷入死循环消耗大量 Token 的严重 Bug（[#25758](https://github.com/NousResearch/hermes-agent/issues/25758)）。
*   **底层架构清理**：修复了插件列表无法正确显示通过 `entry-point` 注册的插件问题（[#58644](https://github.com/NousResearch/hermes-agent/issues/58644)），并修复了 Linux/WSL 下 `computer_use` 捕获屏幕时的空指针异常（[#56704](https://github.com/NousResearch/hermes-agent/issues/56704)）。

### 4. 社区热点
*   **xAI OAuth 订阅层级限制争议** ([#26847](https://github.com/NousResearch/hermes-agent/issues/26847))：**今日评论数最高（29条）**。用户反馈标准版 SuperGrok 订阅（$30/月）无法使用 `xai-oauth`，后端强制返回 403 且仅限 Heavy 订阅者使用。这引发了社区对 xAI 接口策略与文档不一致的吐槽。
*   **插件接口扩展规划** ([#64182](https://github.com/NousResearch/hermes-agent/issues/64182))：由核心成员 @teknium1 发起（11条评论），旨在收拢 Discord 社区关于插件接口的创意，为长期等待的 PR 贡献者提供稳定的 public API 开发预期。
*   **开放温度参数配置** ([#17565](https://github.com/NousResearch/hermes-agent/issues/17565))：**获得 10 个 👍**。用户反馈目前系统硬编码了温度参数，导致部分模型出现严重幻觉，强烈呼吁开放用户侧配置权限。

### 5. Bug 与稳定性
今日新报告及仍在处理的严重 Bug（按优先级排序）：
*   **[P2/安全] 企微跨 Profile 凭证泄露风险** ([PR #59674](https://github.com/NousResearch/hermes-agent/pull/59674))：多路复用模式下，`WEIXIN_TOKEN` 使用了全局环境变量而非 Profile 隔离的 `get_secret()`，存在越权风险。**已有修复 PR 等待合并**。
*   **[P2/稳定性] DeepSeek V4 API 空数组崩溃** ([#65211](https://github.com/NousResearch/hermes-agent/pull/65211))：DeepSeek V4 严格拒绝包含 `tool_calls: []` 的请求，导致去重逻辑触发 HTTP 400 错误。**已有修复 PR 提交**。
*   **[P2/体验] Docker Dashboard 严重受阻** ([#59113](https://github.com/NousResearch/hermes-agent/issues/59113))：在 Docker 部署且使用外部反向代理鉴权时，Dashboard 完全不可用。目前状态为 `needs-decision`，亟待官方给出架构决策。
*   **[P2/体验] Desktop 跨标签页会话状态渗透** ([#62726](https://github.com/NousResearch/hermes-agent/issues/62726))：多 Tab 使用 Web Dashboard 时，`/new` 命令导致会话上下文串流及挂起。**已有相关修复 PR (#65205) 提交，重写了 TurnQueue 架构**。

### 6. 功能请求与路线图信号
结合 Issue 与活跃 PR，下一版本可能演进的方向：
*   **Telegram 生态深度集成**：用户希望单 Bot 按聊天/群组路由到不同 Profile（[#40173](https://github.com/NousResearch/hermes-agent/issues/40173)）。同时，@elphamale 提交了宏大的 [PR #58282](https://github.com/NousResearch/hermes-agent/pull/58282)，拟在 Telegram 内嵌实现基于 WebView 的移动端 Dashboard 及细粒度权限控制。
*   **TUI 与看板融合**：[PR #65210](https://github.com/NousResearch/hermes-agent/pull/65210) 正在为 Hermes TUI 添加休眠状态的 Kanban 活动脊柱，预示着任务调度界面将原生集成到终端 UI 中。
*   **默认开启工具循环硬停止**：[Issue #25823](https://github.com/NousResearch/hermes-agent/issues/25823) 建议将 `tool_loop_guardrails.hard_stop_enabled` 默认设为 `true`，以防模型卡在失败 API 调用的死循环中消耗 Token。

### 7. 用户反馈摘要
从日常讨论中可以看出用户的核心痛点与使用场景：
*   **痛点 - Docker 与权限系统的割裂**：大量反馈（如 [#59113](https://github.com/NousResearch/hermes-agent/issues/59113), [#60043](https://github.com/NousResearch/hermes-agent/pull/60043)）表明用户在容器化部署时，常遭遇文件 `chown` 权限错乱（插件生成的 root 权限文件阻碍重启）和内建鉴权拦截问题。
*   **痛点 - 遗留系统的强依赖**：Desktop 端将 Custom Provider 误路由至 OpenRouter（[#58688](https://github.com/NousResearch/hermes-agent/issues/58688)），以及 CLI 对 bare hermes binary 识别失败（[#59725](https://github.com/NousResearch/hermes-agent/pull/59725)），反映出部分旧版路由逻辑未跟上多提供商架构的步伐。
*   **满意点**：Hermes 的 Kanban 自动化、多 Agent 委派机制深受进阶用户喜爱，他们正积极利用这些功能跑复杂的浏览器自动化（如 Chrome MCP）和长时任务。

### 8. 待处理积压
以下重要 Issue 长期未彻底解决或仍处于讨论状态，建议维护团队重点关注：
*   **跨平台会话共享缺失** ([#4335](https://github.com/NousResearch/hermes-agent/issues/4335))：自 3 月底提出，用户强烈希望 CLI 和 Telegram 能共享同一个会话上下文，这符合“个人 AI 助手”的无缝切换诉求。
*   **模型温度参数暴露** ([#17565](https://github.com/NousResearch/hermes-agent/issues/17565))：自 4 月底活跃至今，获得 10 个赞，是对模型生成质量控制的基础需求。
*   **Discord 按频道路由 Profile** ([#19809](https://github.com/NousResearch/hermes-agent/issues/19809))：自 5 月初提出，目前 Telegram 已有相关 PR 进展，Discord 的多开需求同样强烈，需统一规划网关层的路由架构。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*