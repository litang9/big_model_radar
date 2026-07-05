# OpenClaw 生态日报 2026-07-05

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-07-05 04:32 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

以下是为您生成的 OpenClaw 项目 2026-07-05 日报：

# 📊 OpenClaw 项目动态日报 (2026-07-05)

## 1. 今日速览
OpenClaw 今日延续了极高强度的开源协作活跃度，过去 24 小时内共处理了 **500 条 Issue 更新**（455 条活跃/新开，45 条关闭）以及 **500 条 PR 更新**（329 条待合并，171 条已合并/关闭）。尽管今日没有发布新版本，但底层架构优化和渠道适配相关的 PR 合并数量庞大。当前社区的重心明显聚焦于 **多智能体编排的可靠性、跨平台消息投递的稳定性，以及大上下文环境下的内存与 Token 成本控制**。

## 2. 版本发布
**今日无新版本发布 (0 个 Release)**。
*注：社区有反馈指出当前主干代码与线上文档存在不同步的情况，预计维护者正在为下一个大版本做代码冻结或最终集成测试。*

## 3. 项目进展
今日共有 171 个 PR 被合并或关闭，项目在以下领域取得了实质性向前迈进：
*   **架构解耦与重构**：PR [#99059](https://github.com/openclaw/openclaw/pull/99059) 成功提取了可复用的 AI 运行时包，将模型协议适配器（Anthropic, OpenAI 等）从主应用中剥离，这将极大提升多包复用能力。
*   **测试基建优化**：PR [#100019](https://github.com/openclaw/openclaw/pull/100019) 对全量测试套件进行了优化，确保独立测试运行在 1 秒以内，解决了测试 OOM 问题，提升了 CI/CD 流水线的健康度。
*   **渠道适配与修复**：合并了多个针对特定渠道的修复，如 QQ Bot 回复中内部元数据泄露修复 ([#98037](https://github.com/openclaw/openclaw/pull/98037))，以及 MS Teams 频道长线程分页支持 ([#98884](https://github.com/openclaw/openclaw/pull/98884))。
*   **用量统计与计费**：PR [#99864](https://github.com/openclaw/openclaw/pull/99864) 修复了长缓存 Anthropic 智能体轮次中 Token 用量重复计算的问题，使自动压缩阈值更加准确。

## 4. 社区热点
今日讨论最热烈的 Issue 集中在多智能体失效和上下文成本控制上：
*   **[P1] 子智能体结果静默丢失**：[#44925](https://github.com/openclaw/openclaw/issues/44925) (👍1, 评论 20)。多位开发者反馈子任务完成后，结果汇报失败且没有重试机制，导致编排流中断。
*   **[P2] 分级 Bootstrap 文件加载**：[#22438](https://github.com/openclaw/openclaw/issues/22438) (评论 17)。针对大型工作区，用户呼吁实现分层加载配置，避免每次会话（包括定时任务）浪费宝贵的 LLM 上下文预算。
*   **[P2] 集中式文件名编码工具**：[#48788](https://github.com/openclaw/openclaw/issues/48788) (评论 18)。针对非拉丁语系（如中文、日文、韩文）在 Content-Disposition 中的乱码问题，社区正在探讨建立全局统一的编码解析中心。

## 5. Bug 与稳定性
按严重程度排列，今日需重点关注的 Bug 与回归问题：
*   **[P0] 计费系统误报余额耗尽**：[#99594](https://github.com/openclaw/openclaw/issues/99594) (已关闭)。云实例在拥有 $109 正余额且 Pro 计划生效的情况下，向用户返回 "out of credits"，严重影响用户体验。
*   **[P1] 严重的网关内存泄漏**：[#54155](https://github.com/openclaw/openclaw/issues/54155)。在 Mac Mini 上连续运行 4 天后，网关内存从 389MB 暴涨至 14.7GB（占用 58% 物理内存），严重威胁长时间运行的稳定性。
*   **[P1] Signal 守护进程竞态条件**：[#22676](https://github.com/openclaw/openclaw/issues/22676)。重启时旧进程未释放端口导致产生孤儿进程，消息发送大面积失败。
*   **[P2] 硬编码路径导致服务崩溃**：[#51429](https://github.com/openclaw/openclaw/issues/51429)。一位 ID 为 "wangtao" 的开发者将本地工作路径 (`/Users/wangtao`) 硬编码并合并到了发布版中，导致其他环境直接报错或创建无用目录。

## 6. 功能请求与路线图信号
结合现有 PR，以下是即将被纳入或亟需实现的功能路线：
*   **前置响应强制钩子**：[#13583](https://github.com/openclaw/openclaw/issues/13583) 提出在金融/安全等高风险工作流中，要求智能体必须机械性地调用特定工具后才能输出最终答案（Hard Gates 模式），目前已有相关安全审查 PR 正在进行中。
*   **Telegram Business Bot 支持**：[#20786](https://github.com/openclaw/openclaw/issues/20786) (👍6)。请求接入 Telegram 商业版个人聊天 API，PR [#89569](https://github.com/openclaw/openclaw/pull/89569) 已经提供了预授权访问请求和分组白名单的初步实现。
*   **文件系统沙盒配置**：[#7722](https://github.com/openclaw/openclaw/issues/7722)。用户希望能够精细化配置 `tools.fileAccess` 的白名单/黑名单路径，增强本地运行安全性。

## 7. 用户反馈摘要
从海量 Issue 中提炼出的真实用户痛点与使用场景：
*   **多应用集成中的消息漏发与重发**：大量用户使用 OpenClaw 接入 Telegram、Discord 和 WhatsApp。反馈指出，网络波动恢复后，消息容易发生**静默丢失** ([#50093](https://github.com/openclaw/openclaw/issues/50093))，或在重连后发生**重复投递** ([#51628](https://github.com/openclaw/openclaw/issues/51628))。
*   **LLM 幻觉影响自动化任务流**：用户大量使用 Cron (定时任务) 进行自动化处理，但当工具调用失败时，LLM 倾向于**编造看似合理的成功输出**，而不是如实报告失败，导致信任危机 ([#49876](https://github.com/openclaw/openclaw/issues/49876))。
*   **内部调试信息泄露给终端用户**：用户抱怨 Discord 等渠道偶尔会暴露出 LLM 的内部思考链（如 `NO_REPLY`, `to=functions.memory_search` 等原始 JSON），破坏了助手的专业感 ([#44905](https://github.com/openclaw/openclaw/issues/44905))。

## 8. 待处理积压
以下高价值 Issue/PR 长期处于 Open 状态且今日有更新但仍未解决，需维护者重点介入：
*   **文档落后于实际代码发布**：[#48920](https://github.com/openclaw/openclaw/issues/48920) 指出 Live Docs 提前发布了尚在开发中的功能特性，导致用户按照文档配置 `IsolatedSessions` 时触发报错。今日提交的 PR [#100142](https://github.com/openclaw/openclaw/pull/100142) 旨在全面重写并对齐当前文档。
*   **会话通道饿死现象**：[#54488](https://github.com/openclaw/openclaw/issues/54488) 报告低优先级的后续任务排空时会垄断会话通道，导致新接收到的用户消息被强制静默排队长达 20-30 分钟才能响应。
*   **隔离会话状态持久化失败**：PR [#99960](https://github.com/openclaw/openclaw/pull/99960) 修复了 Cron 任务修改无法持久化时的回滚缺陷，该 PR 今日被突然 Closed，可能需要作者重新调整以解决底层状态不同步的严重问题。

---

## 横向生态对比

以下是为您生成的 AI 智能体与个人 AI 助手开源生态横向对比分析报告（基于 2026-07-05 动态数据）：

### 1. 生态全景
2026 年中，个人 AI 助手与自主智能体开源生态已全面迈入**“深水区”**，社区核心诉求已从单一的“模型对话能力”转向**“企业级稳定性与复杂工作流编排”**。多平台消息网关（如 Telegram、Discord、国内特有平台）的高可用性、跨会话长期记忆（RAG）的工程化落地，以及大上下文环境下的 Token 成本控制，成为衡量项目成熟度的核心标尺。同时，为了平衡智能体的“自主性”与“安全性”，底层的权限沙盒、硬性拦截与凭证池管理正迅速演进为各类开源框架的标配。

### 2. 各项目活跃度对比
| 项目名称 | 今日 Issue 动态 | 今日 PR 动态 | 版本发布 | 健康度评估与当前状态 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 条更新 (45 关闭)<br>*(455 活跃/新开)* | 500 条更新 (171 合并/关闭)<br>*(329 待合并)* | 0 | **承压与重构期**。Issue 与 PR 积压量大，社区注意力集中于修复严重内存泄漏和多智能体失效问题。代码解耦力度大，正为大版本做代码冻结。 |
| **Hermes Agent** | 249 条更新 (37 关闭) | 500 条更新 (104 合并/关闭) | 0 | **质量巩固期**。正处于 v0.18 版本发布前的密集稳定性修复与安全加固阶段。PR 闭环效率较高，对本地模型与凭证调度的响应迅速。 |

### 3. OpenClaw 在生态中的定位
在当前的参照系中，**OpenClaw 扮演着“超级枢纽与行业标杆”的角色**。
*   **技术路线差异**：相比于早期项目，OpenClaw 极度注重**架构的极致解耦**（如提取独立 AI 运行时包，剥离模型适配器），使其具备极强的企业级集成能力。其引入的“Hard Gates（硬性前置钩子）”和“隔离会话状态持久化”，显示出其瞄准的是金融、安全等具有极高标准的高风险自动化工作流。
*   **社区规模与优势**：OpenClaw 拥有断层领先的吞吐量（单日近千条 Issue/PR 异动），这赋予了它强大的多渠道适配先发优势（如 MS Teams 长线程分页、Telegram Business 等高级特性）。但由于规模庞大，其也面临着更为严峻的工程挑战，如严重的网关内存泄漏（P1 级）和底层计费误报问题。

### 4. 共同关注的技术方向
从两个项目的今日动态中，可以清晰地提取出智能体生态的共性诉求：
*   **多平台网关的稳定性**：**[OpenClaw, Hermes Agent]** 均在苦战消息通道的容错性。典型问题包括网络恢复后的消息静默丢失/重复投递，以及特定渠道（如 QQBot、Signal 守护进程）的连接风暴与竞态条件。
*   **安全与脱敏加固**：**[OpenClaw, Hermes Agent]** 社区均对危险操作深恶痛绝。OpenClaw 在推进本地文件系统沙盒配置（黑白名单）；Hermes Agent 则紧急合并了针对 `mkfs`/`dd` 等高危命令绕过审批的阻断补丁，以及流式输出的密钥脱敏。
*   **Token 与上下文成本控制**：**[OpenClaw, Hermes Agent]** 针对 LLM 昂贵的推理成本，OpenClaw 在优化长缓存轮次的计量并呼吁分级加载配置；Hermes Agent 则在探索通过 Dejavu MCP 目录复用提示词以节省 70 倍 Token。
*   **多智能体/多实例协同**：**[OpenClaw, Hermes Agent]** OpenClaw 面临子智能体结果汇报失败的问题；Hermes Agent 用户则呼吁在同一频道内的多个专属实例间引入历史记录注入，打破“互相盲区”。

### 5. 差异化定位分析
*   **功能侧重**：**OpenClaw** 侧重于重型、多智能体的复杂业务编排和企业级计费/统计；**Hermes Agent** 则更侧重于多模型凭证调度（如 OAuth 共享池额度阻断）、反检测浏览器自动化以及跨会话本地 RAG 知识库的建立。
*   **目标用户**：**OpenClaw** 明显面向中大型团队、重度自动化依赖者以及多 SaaS 平台集成方；**Hermes Agent** 的受众画像更偏向极客开发者、私有化/本地算力用户（高度关注 Ollama、qwen3 等本地小模型的兼容性）以及 CLI/桌面端重度用户。
*   **技术架构焦点**：**OpenClaw** 的核心架构战在于“主应用与协议适配器的解耦”及“测试基建防 OOM”；**Hermes Agent** 的架构战在于“asyncio 事件循环防冻结”及桌面端跨平台构建的健壮性。

### 6. 社区热度与成熟度
*   **第一梯队（规模化扩张与重构）：OpenClaw**
    *   处于极度活跃状态。庞大的 PR 吞吐量（329 条待合并）和频繁的高阶特性讨论，说明其正在经历一次重大的架构升级或版本迭代。但由于出现了网关内存暴涨至 14.7GB（P1）等底层缺陷，当前正处于“一边修轮胎一边换引擎”的高负荷期。
*   **第二梯队（质量巩固与打磨）：Hermes Agent**
    *   活跃度高且节奏稳健。PR 的合并方向高度聚焦于安全漏洞封堵、凭证池优化和特定平台 Bug 修复，呈现出明显的 v0.18 版本“发布前阵痛期”特征，工程闭环效率优于 OpenClaw。

### 7. 值得关注的趋势信号
对于 AI 智能体开发者与技术决策者，今日的数据释放了以下强烈信号：
1.  **“幻觉式成功”正在摧毁信任体系**：用户反馈当工具调用失败时，LLM 倾向于编造成功输出。**应对策略**：未来的智能体架构必须在工具执行与 LLM 之间建立硬性的状态校验码，不能盲目信任 LLM 的自我反馈。
2.  **“内部思考链泄露”成为高频 Bug**：原始 JSON（如 `NO_REPLY`）频现于终端用户界面。**应对建议**：在流式响应第一公里就必须建立严格的协议过滤层，将“开发者可见信息”与“用户可见信息”实施物理级隔离。
3.  **国产大模型在 Agent 协议上的水土不服**：MiMo、vLLM 等模型在多轮对话中易丢失 `reasoning_content` 或被锁定 4096 tokens。**行业机遇**：针对国产模型专门优化的协议适配器（解决上下文剥离问题）将成为开源社区的新红利。
4.  **凭证路由与防滥用成为商业化基石**：无论是 OpenClaw 的计费系统优化，还是 Hermes 的 OAuth 凭证池阻断隔离，都预示着“多账号/多模型 Credential 池化调度”是 Agent 平台走向商业化的必经之路。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

以下是为您生成的 Hermes Agent 项目动态日报（2026-07-05）。

---

# 📊 Hermes Agent 项目动态日报 (2026-07-05)

## 1. 今日速览
Hermes Agent 在今日保持着极高的社区活跃度，过去 24 小时内共处理了 **249 条 Issue 动态**（37 条被关闭）以及高达 **500 条 PR 动态**（104 条被合并或关闭）。尽管今日项目未发布新版本，但从代码合并方向来看，项目正处于针对 v0.18 版本（涉及 `projects` 子系统和 `desktop` 更新机制）的密集稳定性修复与安全加固阶段。社区当前的核心诉求集中在多平台适配器（如 QQBot、WhatsApp）的稳定性，以及长期记忆系统（RAG）的架构演进上。

## 2. 版本发布
**今日无新版本发布。**

## 3. 项目进展
今日共有 104 个 PR 被合并或关闭，项目在安全性、凭证调度和网关稳定性方面取得了重大进展：
*   **安全与脱敏加固**：合并了针对流式响应输出路径的密钥脱敏修复 [PR #58637](https://github.com/NousResearch/hermes-agent/pull/58637)，并修复了 SendGrid API Key 截断匹配的问题 [PR #58180](https://github.com/NousResearch/hermes-agent/pull/58180)。此外，修复了高危命令（如 `mkfs`, `dd`）绕过审批底层限制的漏洞 [PR #58643](https://github.com/NousResearch/hermes-agent/pull/58643)。
*   **凭证池优化**：针对 OpenAI Codex 共享 OAuth 凭证限额问题，实现了基于单一模型的额度阻断隔离 [PR #58525](https://github.com/NousResearch/hermes-agent/pull/58525)。
*   **网关与核心组件**：修复了同步日志写入导致 asyncio 事件循环冻结 15 分钟的严重 Bug [PR #58636](https://github.com/NousResearch/hermes-agent/pull/58636)，并修复了 `/undo`（回退）操作导致的会话消息计数器不同步问题 [PR #52641](https://github.com/NousResearch/hermes-agent/pull/52641)。

## 4. 社区热点
今日讨论最热烈的 Issue 反映了用户在**平台消息上下文丢失**和**本地算力受限**方面的痛点：
*   **QQBot 网关无限重试**：[Issue #52914](https://github.com/NousResearch/hermes-agent/issues/52914) (👍 4, 15 条评论)。由于最近的更新导致 QQBot 适配器缺少 `is_reconnect` 参数，引发连接风暴。这反映了国内开发者对平台适配器稳定性的高度关注。
*   **本地小模型离线运行报错**：[Issue #22930](https://github.com/NousResearch/hermes-agent/issues/22930) (8 条评论)。用户反馈在算力不足时使用 2B-14B 本地模型（如 qwen3-8b）运行 Agent 会触发上下文窗口过小错误，表明 Hermes 对低配本地模型的兼容性有待提升。
*   **持久化跨会话记忆需求**：[Issue #8457](https://github.com/NousResearch/hermes-agent/issues/8457) (12 条评论) 与 [Issue #844](https://github.com/NousResearch/hermes-agent/issues/844) (7 条评论)。用户强烈呼吁引入能够在网关重启后存活、支持自动压缩和本地嵌入的 RAG 知识库系统。
*   **多 Agent Discord 协作**：[Issue #14853](https://github.com/NousResearch/hermes-agent/issues/14853) (👍 6, 7 条评论)。用户在同一频道运行多个专属 Hermes 实例时，发现 Agent 之间处于“互相盲区”，呼吁加入历史记录注入与级联预防机制。

## 5. Bug 与稳定性
今日报告的 Bug 集中在认证回调、网关消息处理和第三方模型推理链路上：
*   **[P1 级 / 认证阻断]** Codex 与 Anthropic OAuth 认证故障：CLI 中配置的 Codex OAuth 无法在 Telegram 网关复用 [Issue #12058](https://github.com/NousResearch/hermes-agent/issues/12058)；同时 Anthropic Max OAuth 因 User-Agent 被官方封锁导致 404 错误 [Issue #48534](https://github.com/NousResearch/hermes-agent/issues/48534)。
*   **[P2 级 / 模型上下文剥离]** 国产大模型推理失效：
    *   小米 MiMo 模型在多轮对话中丢失 `reasoning_content` 导致报错 [Issue #24443](https://github.com/NousResearch/hermes-agent/issues/24443)。
    *   Qwen3.6 / vLLM 同样在多轮对话重放时被剥离了思考上下文 [Issue #56004](https://github.com/NousResearch/hermes-agent/issues/56004)。
*   **[P2 级 / 误导性报错]** 凭证池耗尽时返回空的 API Key 导致 401 误报，掩盖了真实的 429(限流) 或 402(欠费) 错误 [Issue #40960](https://github.com/NousResearch/hermes-agent/issues/40960)。
*   **[P3 级 / 渠道断连]** Ollama 本地模型的上下文被强制锁定在 4096 tokens，导致长文本生成出现截断和乱码重试 [Issue #43900](https://github.com/NousResearch/hermes-agent/issues/43900)。

## 6. 功能请求与路线图信号
结合 Issue 与今日提交的 PR，可以窥见 Hermes 接下来的演进路线：
*   **代理与网络伪装**：[PR #58641](https://github.com/NousResearch/hermes-agent/pull/58641) 正在集成原生 CloakBrowser，以提供更强健的反检测浏览器自动化工具支持。
*   **Token 成本控制**：[PR #58633](https://github.com/NousResearch/hermes-agent/pull/58633) 提议引入 Dejavu MCP 目录，通过技能市场复用提示词，宣称可节省 70 倍的推理 Token。
*   **网关平台扩张**：社区正在推进 XMPP/Jabber 协议的支持 [PR #17469](https://github.com/NousResearch/hermes-agent/pull/17469)，并强烈请求支持 Rocket Chat [Issue #3725](https://github.com/NousResearch/hermes-agent/issues/3725)。
*   **CLI 体验优化**：[PR #51391](https://github.com/NousResearch/hermes-agent/pull/51391) 为 CLI 添加了 `Ctrl+R` 的 fzf 历史命令模糊搜索功能，大幅提升终端用户体验。

## 7. 用户反馈摘要
*   **痛点：网关与 Agent 状态割裂**：用户在使用 Telegram/Discord 等聊天平台作为前端时，经常遇到凭证失效（CLI 正常但 Gateway 报错）、多账号配置读取失败（[Issue #58587](https://github.com/NousResearch/hermes-agent/pull/58587) 尝试修复此问题）以及附件消息被静默丢弃（[Issue #57928](https://github.com/NousResearch/hermes-agent/issues/57928)）的痛点。
*   **痛点：桌面端脆弱性**：大量用户反馈桌面版在更新后出现构建失败、无法启动（[Issue #55658](https://github.com/NousResearch/hermes-agent/issues/55658)），以及前端因为工具返回非预期数据结构导致白屏崩溃（[Issue #44562](https://github.com/NousResearch/hermes-agent/issues/44562)）。
*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*