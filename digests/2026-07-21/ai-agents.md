# OpenClaw 生态日报 2026-07-21

> Issues: 358 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-07-20 21:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

以下是为您生成的 OpenClaw 项目 2026-07-21 动态日报。

### 📊 1. 今日速览
OpenClaw 在过去 24 小时内保持了**极高的活跃度**，共处理了 358 条 Issue 更新（其中关闭 124 条）和 500 条 PR 更新（其中合并/关闭 108 条）。尽管今日无新版本发布，但项目正处于深度重构与功能密集演进期。当前社区讨论的焦点高度集中在**长上下文管理、子代理的稳定性以及凭证/内存安全隔离**上。贡献者提交了大量针对内存溢出边界控制和安全校验的修复 PR，项目整体呈现出向更安全的沙箱化架构迈进的态势。

---

### 🚀 2. 项目进展
虽然今日无正式版本发布，但共有 108 个 PR 被合并或关闭，项目在以下几个关键领域取得了实质性进展：

*   **生态集成拓展**：标志性的 AG-UI 协议接入 PR (#109203) 正在进行大范围重构与安全边界审查。该 PR 一旦合并，将使 OpenClaw 能够无缝对接 CopilotKit 等主流前端 UI 框架。
*   **底层状态与会话管理修复**：多位贡献者针对导致 Agent 卡死的遗留状态提交了修复，例如清理遗留沙盒工作区状态 (#111812)、修复因网关超时导致频道假死的问题，以及处理失效的会话写入锁 (#102155)。
*   **安全与边界读取限制**：合并了多个针对超大文件读取的限制 PR（如 #110450 限制 dreaming markdown 读取，#111181 限制 A2UI JSONL 读取），有效防御了因恶意或过大负载导致的 OOM（内存溢出）问题。
*   **开放生态管控（Claw 体系）**：维护者 `@giodl73-repo` 推进了一系列关于 Claw 清单、MCP 服务器所有权和本地市场监听的巨型 PR（#111391, #102406, #110438），标志着 OpenClaw 正在建立类似于浏览器插件商店的标准化技能分发与追踪机制。

---

### 🔥 3. 社区热点
今日社区讨论最热烈的问题凸显了用户对**AI 记忆可靠性与上下文丢失**的深切担忧：

*   **工具输出变为图片附件导致 Agent 失明** (#99241，23 评论)：在复杂的 ANSI 工作流中，工具的输出结果坍缩成了 `(see attached image)`。这导致 Agent 无法读取代码执行日志，直接切断了 Agent 的感知能力，引发热烈讨论。
*   **记忆信任标签机制** (#7707，18 评论)：用户强烈要求根据来源（用户指令、网页抓取、第三方插件）为 Agent 记忆打上信任标签，以防止隐藏在网页或三方服务中的“提示词注入”污染 Agent 的长期记忆。
*   **Agent “画大饼”问题** (#58450，16 评论)：Agent 经常以“我去查一下项目记忆并稍后跟进”结束对话，但实际上并未触发任何后台任务或子代理。这种“虚假承诺”严重破坏了用户的信任感。
*   **Agent 凭证脱敏** (#10659，15 评论)：用户呼吁建立“掩码密钥”系统，允许 Agent 调用 API Key 却无法读取明文，防止因模型幻觉导致密钥泄露。

---

### 🐛 4. Bug 与稳定性
今日报告的高优先级 Bug 集中在异步通信和上下文计算上，部分已有修复 PR 跟进：

*   **[P1] 异步心跳打断并吞没用户回复** (#64810)：在 Telegram 论坛会话中，系统心跳事件会强行抢占正在生成的回复，导致用户原本的提问被“吞掉”。（影响：消息丢失）
*   **[P1] Codex app-server 意外中断执行流** (#109490)：自 v2026.7.1 起，当 Agent 发送完进度消息并准备继续工作时，客户端动态工具返回 `terminate: true` 错误中断了执行流，导致承诺的工作永远不执行。
*   **[P1] 上下文统计灾难性 Bug** (#108238) *(已关闭)*：在 v2026.7.1 中，系统错误地将累计的 `cacheRead` 算入 `totalTokens`，导致很小的会话被误判为超出限制，并引发死循环式的压缩失败。
*   **[P1] 上下文容量凭空跳水** (#108215)：在一次大型工具输出后，会话上下文从 566k (57%) 神秘降至 127k (13%)，且未触发压缩机制，引发了对话状态断层。
*   **[P2] Google Chat 群组消息静默丢失** (#58514)：HTTP 返回 200 成功，但群组消息被直接忽略（私聊正常）。

---

### 🗺️ 5. 功能请求与路线图信号
结合用户诉求与活跃 PR，OpenClaw 下一阶段的功能路线图已初步显现：

*   **统一自动化调度原语** (#110950)：维护者 `@steipete` 提出将心跳、监听器和定时任务全部统一为 Cron Job 架构。这意味着未来的 Agent 将具备更强大的自调度和动态节奏控制能力。
*   **沙箱隔离与权限模型重构** (#58730)：受 Claude Code 源码泄露事件的启发，社区强烈要求引入 `exec()` 沙箱隔离机制和细粒度的工具权限模型。
*   **弃用 Google Gemini CLI，转向 Antigravity** (#84527)：为应对 Google I/O 2026 宣布的 Gemini CLI 停服，社区正推进接入 Antigravity CLI (`agy`) 作为新的后端。

---

### 💬 6. 用户反馈摘要
从海量 Issue 中提炼出当前用户的三大核心痛点：

1.  **“上下文压缩黑盒”引发恐慌**：自动压缩在关键时刻静默放弃任务 (#59618)，或者错误计算 Token 余量 (#108238)，导致用户在运行长线复杂任务（如 Deep Research、多 Agent 编排）时极度缺乏安全感。
2.  **跨平台消息必达性差**：用户在 Telegram (#64810)、Slack 多工作区 (#58523)、微信 (#79293) 和飞书 (#92076) 频繁遭遇“发送成功但用户没收到”或“回复被意外截断”的问题，Channel 层的重试与健壮性亟待提升。
3.  **对 API 密钥安全的焦虑**：随着 Agent 获得执行系统命令的权限，用户越来越担心 Prompt 注入攻击会让 Agent 偷取 `.env` 文件中的明文密钥 (#10659)。

---

### ⚠️ 7. 待处理积压
维护者团队需注意以下带有 `stale`（过期/陈旧）或长期等待决策的高优 Issue：

*   **跨进程文件读取竞态导致数据陈旧** (#71326，已标记 stale)：自 2026.4.20 版本引入的回归 Bug，同一个路径连续 `cat` 会返回不同结果，严重干扰 Agent 对文件系统的判断。
*   **网关事件循环冻结** (#56733)：在 WSL2 等环境下，Gateway 进程看似存活，但 Event Loop 冻结导致所有 HTTP 请求静默超时。
*   **Slack 多工作区路由失效** (#58523)：B 工作区的入站消息永远无法到达 OpenClaw，已等待数月未彻底解决。
*   **官方模型静态目录更新滞后** (#109017)：内置的 Anthropic 模型目录是静态的，导致用户无法在列表中选用最新的 Fable 5 / Haiku 4.5 模型，引发较多不满。

---

## 横向生态对比

作为专注于 AI 智能体与个人 AI 助手开源生态的技术分析师，基于您提供的 2026-07-21 社区动态摘要，以下是针对 **OpenClaw** 与 **Hermes Agent** 的横向对比分析报告。

---

# 📊 2026.07.21 AI 智能体开源生态横向对比分析报告

## 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正经历从“单体对话脚本”向“复杂多智能体协同与重度调度架构”的深度演进。**底层的核心痛点已发生转移**：从早期的模型能力不足，转变为如今的**长期记忆可靠性、沙箱安全隔离与跨平台通信必达性**。同时，生态正在加速标准化，MCP (Model Context Protocol) 与 ACP (Agent Client Protocol) 已成为主流Agent编排的底层共识，开源项目正分化为面向重度自动化调度与面向多端桌面交互两大阵营。

## 2. 各项目活跃度对比
今日两大项目均保持了极高的社区运转负荷，但所处的工程周期截然不同。

| 项目名称 | Issue 动态 (处理/关闭) | PR 动态 (处理/合并关闭) | 最新版本状态 | 健康度与工程状态评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 358 / 124 | 500 / 108 | 无新版 (重构期) | 🟢 **高负荷打磨期**。聚焦底层 P1 级 Bug 修复与安全边界重构，待处理积压多涉及核心运行机制。 |
| **Hermes Agent** | 300 / 87 | 500 / 164 | **v0.19.0** 发布 | 🟡 **爆发式增长期**。大版本释出，PR 积压量大(336个待合并)，工程重心在桌面端体验打磨与网关适配。 |

## 3. OpenClaw 在生态中的定位
相较于 Hermes Agent，**OpenClaw 展现出更重的“后端编排底座”与“重度自动化引擎”属性**：
*   **技术路线差异**：OpenClaw 致力于构建类似于 Cron Job 的统一自动化调度原语和类浏览器插件商店（Claw 体系）的技能分发机制；而 Hermes 更侧重于桌面端交互和多模型 CLI 编排。
*   **安全与隔离前瞻性**：受 Claude Code 泄露启发，OpenClaw 正在强推 `exec()` 沙箱、内存信任标签和凭证脱文脱敏，其在防范 Prompt 注入和 OOM（内存溢出）上的工程投入显著大于 Hermes。
*   **社区痛点反映**：其社区反馈高度集中于长上下文压缩崩溃、Agent 异步通信死锁等“硬核系统级难题”，说明其用户群体对智能体执行长线、无人值守任务的要求极高。

## 4. 共同关注的技术方向
尽管侧重点不同，两个项目今日的动态暴露出智能体生态高度重合的基础诉求：
*   **凭证安全与多租户隔离**：
    *   *OpenClaw*：呼吁建立“掩码密钥”和沙箱权限模型防泄露。
    *   *Hermes*：修复了委派子智能体跨 Provider 的凭证池安全隔离，及内存操作绕过 Hook 的多租户问题。
*   **跨平台/企业级通信深度集成**：
    *   *OpenClaw*：正攻坚 Telegram/Slack/飞书等跨平台消息必达性与异步心跳打断问题。
    *   *Hermes*：正重点优化飞书表格与卡片渲染，以及通过网关接入企业内部通讯。
*   **工具/模型协议标准化适配**：
    *   *OpenClaw*：接入 AG-UI 协议对接 CopilotKit，并适配 Antigravity CLI 替代停服的 Gemini CLI。
    *   *Hermes*：推进 ACP 客户端泛化以支持异构智能体，并攻坚 MCP 服务器重连工具失效、OAuth 鉴权等通用难题。

## 5. 差异化定位分析
| 维度 | OpenClaw (自动化底座) | Hermes Agent (多端交互编排) |
| :--- | :--- | :--- |
| **功能侧重** | 长上下文管理、沙箱安全、自调度(Cron)、多工作区路由 | 多模型路由、多智能体 CLI 编排、桌面端 UX、实时遥测(Telemetry) |
| **目标用户** | 需要执行 Deep Research、无人值守后台任务、插件生态开发者 | 重度多开会话用户、需要跨多个 LLM Provider 切换的开发者 |
| **技术焦点** | 异步网关、防 OOM 限制读取、执行流状态锁 | SSH 远程后端、流式 LLM 观察者钩子、Provider Schema 兼容 |

## 6. 社区热度与成熟度
*   **Hermes Agent（快速迭代与扩容阶段）**：昨日发布的 v0.19.0 是一个里程碑，单版本吸收了超 10 万行新增代码和 450+ 贡献者。大量待合并的 PR(336个) 和桌面端 UI 细节缺陷表明，项目正处于一边狂奔一边补课的黄金扩张期。
*   **OpenClaw（质量巩固与深度重构阶段）**：今日无版本发布但 PR 处理量巨大，且大量针对“上下文凭空跳水”、“死循环压缩”、“会话假死”等灾难性 Bug。这表明项目核心架构复杂度已经极高，当前正处于剥离技术债、强化系统鲁棒性的深水区。

## 7. 值得关注的趋势信号
对于 AI 智能体开发者和技术决策者，今日的动态释放了三个明确的行业信号：
1.  **“上下文压缩黑盒”已成为阻碍落地的最大绊脚石**：OpenClaw 频发的上下文计算 Bug 与静默放弃任务现象表明，当前的 Token 裁剪算法依然极其脆弱。开发者在设计产品时，亟需引入更透明的 Token 余量监控机制。
2.  **智能体“虚假承诺”引发信任危机**：Agent 在面对无法处理的任务时，倾向于回答“我稍后去查”却什么也不做（即“画大饼”现象）。这要求未来的智能体架构必须强制引入**执行验证闭环**，确保语言层面的承诺转化为实际的后台 Worker 触发。
3.  **“防 OOM 与防注入”将成默认标配**：无论是限制大文件读取，还是切断 `.env` 明文暴露，AI 安全已经从“理论探讨”下沉到了“日常开源修 PR”的阶段。未来 Agent 平台如果不自带细粒度的内存/文件权限隔离，将很难通过企业级安全审计。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

以下是为您生成的 **Hermes Agent** 开源项目 2026-07-21 动态日报。

---

# 📊 Hermes Agent 项目动态日报 (2026-07-21)

## 1. 今日速览
在过去 24 小时内，Hermes Agent 项目迎来了爆发式活跃，共处理了 **300 条 Issue 更新**（其中 87 条被关闭）和 **500 条 PR 更新**（其中 164 条被合并或关闭）。项目于昨日正式发布了具有里程碑意义的 **v0.19.0 "The Quicksilver Release"**，超大规模的代码合并与社区贡献（450+ 贡献者）标志着该项目在多智能体编排和插件生态上迈出了重要一步。当前仍有 336 个 PR 处于待合并状态，社区协作热度空前。

## 2. 版本发布
### 🚀 Hermes Agent v0.19.0 (v2026.7.20) — The Quicksilver Release
- **更新规模**：自 v0.18.0 以来，包含约 2,245 次 commits，合并了 1,065 个 PR，代码变更涉及 2,465 个文件（+30 万行 / -3.6 万行），并关闭了约 3,300 个 Issue。
- **核心基调**："Quicksilver"（水银/速银）寓意 Hermes 作为多智能体“信使”在消息传递、CLI 编排和网关通信上的极致流畅与高响应度。
- **详细更新日志**：[GitHub Release 页面](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.20)

## 3. 项目进展
今日项目整体向前迈进了一大步，重点关注了**桌面端体验优化**、**网关凭证安全**以及**分发方式的现代化重构**：

- **分发方式重大调整**：PR [#68217](https://github.com/NousResearch/hermes-agent/pull/68217) 正式移除了 `brew` 和 `pip/PyPI wheel` 的支持代码，未来将依赖更现代化的分发方式。
- **桌面端性能与 UX 修复**：PR [#68236](https://github.com/NousResearch/hermes-agent/pull/68236) 彻底消除了加载大型历史会话时转录界面的多次重复渲染问题；PR [#67500](https://github.com/NousResearch/hermes-agent/pull/67500) 为侧边栏图标补充了缺失的悬浮提示。
- **国际化扩展**：PR [#48070](https://github.com/NousResearch/hermes-agent/pull/48070) 引入了完整的法语 翻译，涵盖 2100+ 个字符串。
- **安全与委派机制修复**：PR [#68240](https://github.com/NousResearch/hermes-agent/pull/68240) 和 [#39862](https://github.com/NousResearch/hermes-agent/pull/39862) 修复了委派子智能体在跨 Provider 和 Endpoint 时凭证池的安全隔离问题。

## 4. 社区热点
今日讨论度最高的议题集中在**多智能体架构**和**插件系统扩展**上：

- 🔥 **多智能体 CLI 编排**：[#5257](https://github.com/NousResearch/hermes-agent/issues/5257) (17 评论)。社区强烈呼吁将 ACP (Agent Client Protocol) 客户端泛化，以支持 Hermes 统一编排 Claude、Codex 等异构智能体。
- 🔥 **插件接口扩展计划**：[#64182](https://github.com/NousResearch/hermes-agent/issues/64182) (14 评论) 和 [#64161](https://github.com/NousResearch/hermes-agent/issues/64161) (6 评论)。维护者 @teknium1 发起了关于 7 月插件接口扩展的讨论，重点包括流式 LLM 输出的观察者钩子，这反映了社区对打造高阶 Telemetry 和实时 TTS 管道的强烈诉求。
- 🔥 **多租户隔离难题**：[#34352](https://github.com/NousResearch/hermes-agent/issues/34352) (12 评论)。企业用户指出内存操作绕过了 Hook 系统，导致多租户上下文隔离极其困难。

## 5. Bug 与稳定性
今日报告的 Bug 集中在**会话状态同步**和**网关计费/连接**上，按严重程度排列如下：

- **P1/P2 级别 - 桌面端会话泄露与隔离失效**：
  - [#59305](https://github.com/NousResearch/hermes-agent/issues/59305)：多 Tab 切换时，不同聊天 Tab 的消息上下文发生交叉泄露（P1）。
  - [#67600](https://github.com/NousResearch/hermes-agent/issues/67600)：更新后桌面端侧边栏在 `default` 配置文件下显示为空白（P2）。
  - **状态**：已提交修复 PR [#68236](https://github.com/NousResearch/hermes-agent/pull/68236)。
- **P2 级别 - 网关计费重置 Bug**：
  - [#67762](https://github.com/NousResearch/hermes-agent/issues/67762)：网关重启时，`session_estimated_cost_usd` 会静默重置为 $0，导致计费严重低估。
- **P2 级别 - 模型 Provider 兼容性崩溃**：
  - [#67012](https://github.com/NousResearch/hermes-agent/issues/67012)：`keepalive_expiry=20s` 配置导致经由 Cloudflare 代理的 OpenRouter 流式输出彻底中断。
  - [#65365](https://github.com/NousResearch/hermes-agent/issues/65365)：暴露 `memory` 或 `session_search` 工具 Schema 会导致 Claude OAuth 稳定触发 HTTP 400 错误（被判定为额外计费）。

## 6. 功能请求与路线图信号
结合 Issues 和活跃 PR，以下功能极有可能在下一阶段落地：

- **SSH 远程后端模式 (Remote-SSH for Agent)**：PR [#68130](https://github.com/NousResearch/hermes-agent/pull/68130) 提议类似 VS Code 的 Remote-SSH 功能，让桌面端直接连接并管理远程主机上的 Hermes 后端。这是拓展 B2B 开发者场景的重要信号。
- **CI 智能化反馈**：PR [#65964](https://github.com/NousResearch/hermes-agent/pull/65964) 引入了动态更新的 PR Review 评论系统，集中展示 CI 状态，项目正致力于提升超大规模贡献者下的工程效率。
- **飞书 表格与卡片渲染优化**：长期跟踪的 Issue [#9549](https://github.com/NousResearch/hermes-agent/issues/9549) 和相关 PR 表明，针对中国区企业级通讯软件的集成的优先级依然很高。

## 7. 用户反馈摘要
从 Issue 评论中可以提炼出以下用户痛点与核心使用场景：
- **真实场景**：大量开发者正使用 Hermes Desktop 进行重度多开会话，并在企业内部通过网关接入 Slack 和飞书。
- **痛点 1 (桌面端打磨不足)**：桌面端 v0.18.2 / v0.15.1 版本存在诸多 UI 细节缺陷（如[#68095](https://github.com/NousResearch/hermes-agent/issues/68095) 输入框异常缩小卡死），甚至 TypeScript 编译卡壳导致构建停滞，开发者体验受到挑战。
- **痛点 2 (多账号/OAuth 墙)**：用户重度依赖多 LLM 提供商切换，但单 OAuth 限制（如[#933](https://github.com/NousResearch/hermes-agent/issues/933)）和 Provider 侧严苛的 Schema 校验（如 Kimi 的 [#66835](https://github.com/NousResearch/hermes-agent/issues/66835)）导致频繁遭遇 HTTP 400 报错。
- **满意点**：用户对项目在多 Agent 编排和 MCP (Model Context Protocol) 生态上的积极探索表示高度认可。

## 8. 待处理积压
请维护者关注以下存在较长时间、影响较大且尚未解决的积压项：

- **MCP 工具注册失效**：[#67187](https://github.com/NousResearch/hermes-agent/issues/67187) — 当 Streamable HTTP MCP 服务器重连时，工具未能重新注册，导致智能体能力静默降级（已滞留数日，需重现）。
- **Kanban Worker 静默失败**：[#46593](https://github.com/NousResearch/her

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*