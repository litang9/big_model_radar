# OpenClaw 生态日报 2026-07-02

> Issues: 250 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-07-02 04:32 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

以下是为您生成的 OpenClaw 项目 2026-07-02 动态日报。

---

# 📊 OpenClaw 项目动态日报 (2026-07-02)

### 1. 今日速览
今日 OpenClaw 项目整体呈现出**极高的活跃度与社区参与度**。过去 24 小时内，项目处理了 250 条 Issue 动态（新开/活跃 147 条，关闭 103 条）以及高达 500 条 PR 动态（包含 99 个合并/关闭）。虽然今日没有发布新的稳定版，但开发重心明显倾斜于**修复近期版本（尤其是 v2026.6.11）带来的回归问题**，以及推进底层架构（如 SQLite 存储翻转、多渠道消息防丢失）的重构。当前项目处于快速迭代与高强度除虫（Bug-fixing）阶段。

### 2. 版本发布
**今日无新版本发布。** 
项目当前最新版本仍停留在 `v2026.6.11`。从今日 Issue 趋势来看，`v2026.6.11` 引入了数个严重的回归 Bug（如回复会话初始化冲突、工具输出为空等），维护团队正集中精力收尾这些稳定性问题，预计下一个版本将以稳定性修复为核心。

### 3. 项目进展
今日共有 **99 个 PR 被合并或关闭**，项目在以下几个关键领域取得了实质性推进：
*   **底层架构升级**：备受瞩目的巨型企业级 PR [#98236](https://github.com/openclaw/openclaw/pull/98236) 正在积极完善，该 PR 将会话和记录底层翻转为 SQLite 存储，这将极大提升大规模会话的并发与读取性能。
*   **会话与消息防丢失**：合并了防止 `EmbeddedAttemptSessionTakeoverError` 导致静默消息丢失的核心修复（[PR #89039](https://github.com/openclaw/openclaw/pull/89039)），以及解决事件循环阻塞 14-22 秒导致消息丢失的性能优化（[PR #89040](https://github.com/openclaw/openclaw/pull/89040)）。
*   **自动化建设**：关闭了引入 Claude Agent SDK 自动修复 PR review 的流水线（[PR #68936](https://github.com/openclaw/openclaw/pull/68936)），表明项目的自动化贡献审核能力迈上新台阶。

### 4. 社区热点
今日社区讨论最热烈的问题集中在**AI内部思维泄露**与**长期记忆安全**：
*   **🔥 内部独白泄露至通讯渠道**：[Issue #25592](https://github.com/openclaw/openclaw/issues/25592)（热度最高，33 条评论）。用户反馈 AI 在工具调用间隙生成的内部文本（如报错处理、心理活动）被错误地发送到了 Slack、iMessage 等真实聊天频道，引发严重的 UX 灾难。这表明用户对 Agent "黑盒"行为的边界控制有极高要求。
*   **🧠 记忆信任标签**：[Issue #7707](https://github.com/openclaw/openclaw/issues/7707)（13 条评论）。为了防止恶意网页或第三方指令污染 Agent 的长期记忆（Memory Poisoning），社区强烈呼吁按来源（用户指令、网页抓取、第三方插件）为记忆打上信任等级标签。
*   **🔄 重置前记忆冲刷**：[Issue #45608](https://github.com/openclaw/openclaw/issues/45608)（11 条评论）。用户希望在执行 `/new` 或每日重置销毁会话前，能像压缩机制一样自动保存重要上下文。

### 5. Bug 与稳定性
近期版本的回归问题是目前稳定性的最大威胁。以下为按严重程度排列的 Bug 监控：

*   **🚨 P1 严重回归 (v2026.6.11 引发)**
    *   [Issue #98416](https://github.com/openclaw/openclaw/issues/98416)：发布的 dist 缺失重入防护，导致回复会话初始化冲突。
    *   [Issue #98672](https://github.com/openclaw/openclaw/issues/98672)：从 6.10 升级到 6.11 后，会话频繁无故中断。
    *   [Issue #98528](https://github.com/openclaw/openclaw/issues/98528)：所有工具调用（exec, web_fetch 等）在首次成功调用后，后续返回均为空。
*   **⚠️ P1 核心提供商/渠道故障**
    *   [Issue #98740](https://github.com/openclaw/openclaw/issues/98740)：6.11 插件外部化后，Mattermost 原生斜杠命令回调全部返回 401 未授权。
    *   [Issue #38327](https://github.com/openclaw/openclaw/issues/38327)：使用 `google-vertex/gemini-3.1-pro-preview` 时报错 "Cannot convert undefined or null to object" 并陷入崩溃循环。
    *   [Issue #94228](https://github.com/openclaw/openclaw/issues/94228)：Anthropic 原生路径下，长对话重放历史 `thinking` 块导致 400 报错，会话彻底卡死。
*   *注：大多数 P1 问题目前已被标记为 `clawsweeper:needs-maintainer-review`，部分已有实验性 Fix PR 投入测试。*

### 6. 功能请求与路线图信号
结合 Issue 提议与当前开放的 PR，以下方向极有可能被纳入下一阶段路线图：
*   **多渠道 & OAuth 容错机制**：[Issue #13615](https://github.com/openclaw/openclaw/issues/13615) 呼吁为外部 API 增加速率限制和退避重试；[PR #98900](https://github.com/openclaw/openclaw/pull/98900) 已经提交了将 Prompt 阶段超时路由到故障转移模型的代码，这说明**“高可用 LLM 网关”**是接下来的开发重点。
*   **企业级 UI 状态可见性**：[Issue #70309](https://github.com/openclaw/openclaw/issues/70309)（已关闭）要求在控制台 UI 中加入 MCP 服务连接状态面板，目前有相关 UI PR 正在排队合并，说明 Web UI 的运维仪表盘正在增强。
*   **更精细的技能与记忆审计**：[Issue #20935](https://github.com/openclaw/openclaw/issues/20935) 要求 Agent 记忆增加只读审计日志。

### 7. 用户反馈摘要
*   **痛点**：许多用户反馈升级到 `2026.6.11` 后体验受挫，表现为“工具调用变哑（无返回）”和“会话假死”。同时，在接入第三方平台（如飞书、微信、WhatsApp）时，复杂流式消息的最终丢失（如 [Issue #77685](https://github.com/openclaw/openclaw/issues/77685)）依然令人头疼。
*   **真实场景**：大量用户正在将 OpenClaw 作为跨平台（Slack, Discord, iMessage, 飞书等）的个人助理运行，并通过浏览器工具执行复杂的自动化注册和抓取任务（[Issue #44431](https://github.com/openclaw/openclaw/issues/44431)）。这要求 OpenClaw 具备极高的长上下文管理能力和多模态解析稳定性。
*   **肯定点**：社区对 OpenClaw 采纳新技术（如内置 Codex 运行时、MCP 协议支持）的速度表示认可，对近期推进的 SQLite 存储重构充满期待。

### 8. 待处理积压
以下高价值 Issue/PR 长期未得到最终合并或有效解决，建议维护者重点关注：
*   **[PR #98236](https://github.com/openclaw/openclaw/pull/98236)**：SQLite 存储重构（标记为 Do not merge）。这是一个涉及几乎所有渠道和核心会话状态的超大型 PR，积压已久，亟需进行精细化回归测试后落地主分支。
*   **[Issue #49665](https://github.com/openclaw/openclaw/issues/49665)**：Control UI Channels 页面静默加载失败导致空白。该问题被标记为 `stale` 且难以在主分支复现，但严重影响部分用户的可视化配置体验。
*   **[Issue #96857](https://github.com/openclaw/openclaw/issues/96857)**：普通的工具文本输出在 Agent 上下文中退化为 `(see attached image)` 占位符，导致 AI 对常规命令“致盲”，属于底层

---

## 横向生态对比

以下是为您生成的个人 AI 助手与智能体开源生态横向对比分析报告（基于 2026-07-02 动态数据）：

---

# 📊 AI 智能体开源生态横向对比与趋势分析报告 (2026-07-02)

## 1. 生态全景
2026 年中，个人 AI 助手与自主智能体开源生态正处于**从“单体对话”向“全平台接管与深度记忆”演进的关键爆发期**。智能体不再局限于网页端，而是深度嵌入 Slack、iMessage、飞书等高频通讯渠道，扮演跨平台的个人助理角色。然而，随着应用场景的复杂化，生态正面临**底层架构重构（如存储分离）、多渠道消息稳定性、以及 Agent 行为边界控制（如记忆污染、内部思维泄露）**三大阵痛期。整体而言，项目迭代极快，但大版本带来的回归问题成为制约生产可用的核心痛点。

## 2. 各项目活跃度对比
今日两大核心项目均维持了极高的运转负荷，但所处阶段有所不同：

| 项目名称 | Issue 动态 | PR 动态 (合并/关闭) | 最新版本状态 | 健康度与阶段评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 250条 (新活147, 关闭103) | 500条 (99个落地) | 无新版 (停留 v2026.6.11) | ⚠️ **高强度除虫/重构期**。<br>近期版本存在严重回归，底层 SQLite 重构正在收尾。 |
| **Hermes Agent** | 276条 | 500条 (115个落地) | 刚发布 v0.18.0 (史诗级) | 🚀 **发布后消化期**。<br>合并了近千个 PR，导致网关与适配器边缘 Bug 激增。 |

## 3. OpenClaw 在生态中的定位
相较于 Hermes Agent，**OpenClaw 展现出更强烈的“企业级与高可用”定位**：
*   **技术路线差异**：OpenClaw 正在进行底层存储的彻底翻牌（转向 SQLite），并积极引入 MCP（Model Context Protocol）协议和可视化运维仪表盘；而 Hermes Agent 目前更侧重于多网关路由模拟和本地守护进程的轻量化。
*   **核心优势**：OpenClaw 在跨平台复杂流式消息处理、长上下文自动化（如浏览器执行）方面具备极强的先锋性，吸引大量将其作为“全天候跨平台个人助理”的重度开发者。
*   **当前劣势**：OpenClaw 当前 v2026.6.11 的稳定性堪忧（工具调用失效、会话假死），且巨型 PR 积压严重，工程质量保障面临巨大挑战。

## 4. 共同关注的技术方向
通过对两个项目的交叉分析，当前 AI 智能体生态在以下技术点上呈现出高度共识：
*   **长记忆架构的深水区探索 (OpenClaw, Hermes Agent)**：简单的文本存储已淘汰。OpenClaw 呼吁按来源打上“信任标签”防止记忆投毒，并要求重置前自动冲刷；Hermes Agent 社区则强烈要求弃用硬编码，转向向量存储与跨会话搜索。
*   **多渠道网关的容错与保活 (OpenClaw, Hermes Agent)**：原生接入第三方 IM 成为标配。两项目均饱受网关断连、静默死亡或 Oauth 鉴权失效的困扰（如 OpenClaw 的 Mattermost 401，Hermes 的 iMessage 崩溃、QQBot 死循环）。
*   **LLM 网关的高可用与解耦 (OpenClaw, Hermes Agent)**：针对单一模型供应商的依赖正在减弱。OpenClaw 正在引入 Prompt 超时故障转移模型；Hermes 社区则在呼吁原生接入 Google Vertex AI 以绕开第三方路由的高昂成本与限流。

## 5. 差异化定位分析
*   **功能侧重**：**OpenClaw** 侧重于“工具链集成与行为安全”（如内部独白防泄露、控制台 MCP 状态面板、工具调用重入防护）；**Hermes Agent** 侧重于“系统级驻留与自主执行”（如 Cron 定时任务的后台注入、单进程多智能体隔离、高级网关伪装）。
*   **用户画像**：OpenClaw 的受众更像是在搭建**企业级或极客级的中控台**，要求高度的可观测性和审计能力；Hermes Agent 的受众则更倾向于**本地化、高度定制的个人极客玩家**（例如高度关注 HiDPI 屏幕字体适配、本地化语言包甚至自主打包第三方客户端）。

## 6. 社区热度与成熟度
*   **快速迭代与扩张期（Hermes Agent）**：凭借 v0.18.0 的超大版本发布，Hermes 迎来了社区参与的热潮（俄罗斯等非英语社区甚至自行开发衍生版）。但目前处于“大开发后的大修补”状态，代码质量把控面临考验。
*   **深度重构与质量巩固期（OpenClaw）**：OpenClaw 的社区焦点集中在系统级 Bug 修复和超大型 PR（如 #98236 SQLite 重构）的合并上。虽然今日没有发布新版本，但其对自动化代码审核流水线（Claude Agent SDK 自动修复）的引入，表明其正在努力提升庞大代码库的工程成熟度。

## 7. 值得关注的趋势信号
对于 AI 智能体开发者与决策者，今日的社区动态释放了以下强烈信号：
1.  **“黑盒”行为的灾难化**：AI 的内部思维链泄露到真实聊天渠道（OpenClaw 热门 Issue）是一类新型的 UX 灾难。**未来的 Agent 必须在架构层面严格隔离“模型推理状态”与“对外输出负载”。**
2.  **Token 消耗焦虑与配置瘦身**：Hermes 用户抱怨简单对话消耗 16K Tokens，这表明随着系统提示词和工具集的无序膨胀，**“Agent 的重量级化”正在反向扼杀其实用性**。轻量化的默认配置将成为竞争优势。
3.  **记忆安全将成为核心命题**：Agent 具备长期记忆后，防范网页抓取内容或第三方插件造成的“记忆投毒”将成为标配需求，基于来源验证的读写分离架构势在必行。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

这份报告基于 Hermes Agent (NousResearch/hermes-agent) 过去 24 小时的开源数据，为您生成 2026 年 7 月 2 日的项目动态日报。

---

# 📊 Hermes Agent 项目动态日报 (2026-07-02)

## 1. 今日速览
今日项目整体保持**极高活跃度**，这主要得益于昨日（7月1日）**v0.18.0 "The Judgment Release"** 的重磅发布。庞大版本更迭引发了大量后续反馈，过去 24 小时内处理了 500 条 PR 更新（其中 115 条被合并/关闭）和 276 条 Issue 更新。社区当前的核心精力集中在：消化 v0.18.0 带来的新特性、修复版本迭代引发的网关与适配器边缘 Bug（如 QQBot 和 iMessage 网关），以及深度优化智能体记忆与多会话调度机制。

## 2. 版本发布
- **[v2026.7.1: Hermes Agent v0.18.0 — The Judgment Release](https://github.com/NousResearch/hermes-agent/releases)**
  本次更新是一个史诗级里程碑，自 v0.17.0 以来，合并了惊人的 **998 个 PR**，包含约 1,720 次代码提交，新增代码达 25.1 万行，删除 4.1 万行，共有 **370+ 社区贡献者**参与，并关闭了 949 个 Issue。
  *注：由于此版本体量巨大，引入了大量的新特性和底层重构，导致部分旧版环境（如特定 Provider 网关、鉴权逻辑）出现了兼容性回归，这也是今日 Bug 反馈激增的主要原因。*

## 3. 项目进展
今日共有 115 个 PR 被合并或关闭，项目在以下几个关键领域取得了实质性向前迈进：
- **网关与鉴权稳定性修复**：修复了 OAuth 登录跨域拦截问题（[PR #56751](https://github.com/NousResearch/hermes-agent/pull/56751)），并修复了 Windows 环境下终端命令路径错误转写 Bug（[PR #56783](https://github.com/NousResearch/hermes-agent/pull/56783)）。
- **安全与权限边界重构**：针对 `HERMES_CRON_SESSION` 环境变量泄漏导致交互式会话代码执行被拦截的严重问题，提出了多个修复方案（[PR #56796](https://github.com/NousResearch/hermes-agent/pull/56796), [PR #56788](https://github.com/NousResearch/hermes-agent/pull/56788), [PR #56784](https://github.com/NousResearch/hermes-agent/pull/56784)），正在重构审批上下文逻辑。
- **集成能力提升**：推进了 Upstage Solar 模型提供商支持（[PR #42231](https://github.com/NousResearch/hermes-agent/pull/42231)），以及阿拉伯语 RTL 完整本地化支持（[PR #44987](https://github.com/NousResearch/hermes-agent/pull/44987)）。

## 4. 社区热点
今日讨论度最高的话题集中在**多平台消息路由、Provider 支持限制**以及**长记忆架构**上：
- **[Issue #12639](https://github.com/NousResearch/hermes-agent/issues/12639) (👍10, 💬14)**：用户强烈要求原生支持 Google / Vertex AI Provider。目前强依赖 OpenRouter 路由 Gemini 模型会导致频繁遭遇 HTTP 402 收费墙和限流，社区呼吁直接对接官方 API。
- **[Issue #5712](https://github.com/NousResearch/hermes-agent/issues/5712) (👍11, 💬11)**：探讨“真正的自主性”。用户希望 Cron（定时任务）后台执行的结果能够自动注入到当前活跃的网关聊天会话中，实现真正的无缝后台智能体协作。
- **[Issue #40347](https://github.com/NousResearch/hermes-agent/issues/40347) (💬8)**：俄罗斯社区用户不仅要求支持俄语本地化，甚至已经自行开发了第三方桌面端安装包，体现了极高的社区参与热情。

## 5. Bug 与稳定性
今日报告的 Bug 多与 v0.18.0 的重构及多进程环境调度有关，按严重程度排列：
- **🔴 严重安全/执行阻断：Cron 环境变量泄漏**
  - 描述：定时任务变量 `HERMES_CRON_SESSION=1` 泄漏到交互式进程中，导致用户在正常会话中无法执行代码和危险命令。
  - 状态：**已有大量 Fix PR 待合并** ([PR #56796](https://github.com/NousResearch/hermes-agent/pull/56796), [PR #56788](https://github.com/NousResearch/hermes-agent/pull/56788))。
- **🟠 P2 阶级：多平台网关崩溃 / 无限重连**
  - [Issue #52914](https://github.com/NousResearch/hermes-agent/issues/52914): QQBot 因缺少重连参数陷入死循环。
  - [Issue #49858](https://github.com/NousResearch/hermes-agent/issues/49858): iMessage 适配器 Sidecar 崩溃后静默死亡且无法自愈。
  - [Issue #56524](https://github.com/NousResearch/hermes-agent/issues/56524): Telegram 更新后导致 macOS launchd 网关超时下线。
- **🟡 P2 阶级：OpenAI-Codex Provider 系列失效**
  - [Issue #13834](https://github.com/NousResearch/hermes-agent/issues/13834) & [Issue #33976](https://github.com/NousResearch/hermes-agent/issues/33976): 官方 Codex CLI 可用，但 Hermes Agent 调用返回空响应或直接报错，导致 Slack 和 Cron 任务连环失败。

## 6. 功能请求与路线图信号
结合 Issue 诉求和活跃 PR，下一版本极有可能在以下方向发力：
- **可配置记忆后端与跨会话搜索**：用户苦于会话重启即丢失上下文（[Issue #8457](https://github.com/NousResearch/hermes-agent/issues/8457)），并希望弃用硬编码的 `MEMORY.md`，转而使用更专业的向量存储（[Issue #47349](https://github.com/NousResearch/hermes-agent/issues/47349)）。
- **单进程多智能体架构**：用户对单守护进程下、多智能体按主题隔离工作区的需求激增（[Issue #9514](https://github.com/NousResearch/hermes-agent/issues/9514)），旨在大幅降低内存消耗。
- **高级网关路由**：通过 PR [#56795](https://github.com/NousResearch/hermes-agent/pull/56795) 和 [#56794](https://github.com/NousResearch/hermes-agent/pull/56794) 可以看出，项目正在强化 Webhook 和 API 端的伪装与分发能力，使其能更好地模拟原生 Telegram/Discord 消息流。

## 7. 用户反馈摘要
- **开发者体验 (DX) 痛点**：基于 Electron 的桌面端应用在 HiDPI 屏幕下无法调整字体大小（[Issue #40166](https://github.com/NousResearch/hermes-agent/issues/40166)），且不支持键盘缩放，影响重度用户使用体验。
- **Token 消耗焦虑**：默认配置过于臃肿，用户反馈一个简单的 "who u?" 提示词竟消耗超过 16K Tokens（[Issue #13983](https://github.com/NousResearch/hermes-agent/issues/13983)），大家对默认系统提示词的精简化呼声较高。
- **平台拓展诉求**：i18n（国际化）需求爆发，简繁中文（[Issue #12961](https://github.com/NousResearch/hermes-agent/issues/12961)）和俄

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*