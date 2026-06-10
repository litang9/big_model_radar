# OpenClaw 生态日报 2026-06-10

> Issues: 442 | PRs: 483 | 覆盖项目: 11 个 | 生成时间: 2026-06-10 03:24 UTC

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

# OpenClaw 项目动态日报 (2026-06-10)

## 1. 今日速览
OpenClaw 项目今日保持了极高的开发与社区活跃度。过去 24 小时内，项目处理了 **442 条 Issue 动态**（新开/活跃 318 条，关闭 124 条）以及 **483 条 PR 动态**（待合并 352 条，合并/关闭 131 条），合并吞吐量表现稳健。
项目于今日发布了 `v2026.6.5` 正式版与 beta 版，核心解决了大模型思考过程在消息渠道的裸泄露问题。然而，社区当前焦点依然集中在 **多渠道消息路由稳定性**、**会话上下文错乱（回复历史消息）** 以及 **Codex 集成导致的阻塞/挂起** 等关键稳定性痛点上。整体来看，项目正在快速迭代以修补多通道通信的边缘错误，但复杂的 Agent 状态机依然面临严峻的并发挑战。

---

## 2. 版本发布
今日连续发布了 2 个新版本，主要聚焦于通道输出的安全性与规范化：
*   **v2026.6.5** 
    *   **更新亮点**：QQBot 通道现在会在原生投递前剥离模型的推理/思考脚手架（如 `<thinking>` 标签），防止原始内部逻辑泄露到用户可见的频道回复中。MCP 工具结果增强了对 `resource_link`、`audio` 及格式错误的图像等资源的强制转换处理。
    *   **关联 Issue**：直接响应了 #89913 和 #90132 的安全/体验隐患。

---

## 3. 项目进展
今日合并/关闭的 PR 显著推进了跨平台 UI、通道集成和底层状态管理的完善：
*   **跨平台控制面板大更新**：PR [#91557](https://github.com/openclaw/openclaw/pull/91557) (已合并) 大幅改进了 iPad 和 iPhone 的控制面板界面，引入了侧边栏导航和响应式控制中心，提升了移动端管理体验。
*   **通道能力补齐**：
    *   PR [#62262](https://github.com/openclaw/openclaw/pull/62262) (已合并) 为 Slack 等渠道引入了智能回复引用模式 (`replyToMode auto`)，解决了多人群聊中回复缺乏上下文的问题。
    *   PR [#89251](https://github.com/openclaw/openclaw/pull/89251) (已合并) 修复了 WhatsApp 通道中 TTS 工具音频投递失败的问题。
*   **底层状态与内存修复**：
    *   PR [#91590](https://github.com/openclaw/openclaw/pull/91590) (已合并) 修复了 Codex 会话中上下文压缩的所有权冲突问题。
    *   PR [#34244](https://github.com/openclaw/openclaw/pull/34244) (已合并) 修复了多账号通道配置下的安全警告漏报问题。

---

## 4. 社区热点
今日社区讨论最热烈的问题集中在 **Agent 内部执行细节外泄** 和 **会话上下文混乱**：
*   **[#25592](https://github.com/openclaw/openclaw/issues/25592) (29 评论, 👍 1)**：`[安全/消息泄露]` Agent 在工具调用期间生成的文本（如错误处理、内心独白）被错误路由到 Slack/iMessage 等通道，甚至泄露内部函数调用路径。
*   **[#90083](https://github.com/openclaw/openclaw/issues/90083) (16 评论, 👍 3, 已关闭)**：`[模型兼容性]` 升级后，使用 OpenAI ChatGPT Responses 传输协议调用 gpt-5.4/gpt-5.5 时触发 `invalid_provider_content_type` 错误。
*   **[#32296](https://github.com/openclaw/openclaw/issues/32296) (15 评论, 👍 1)**：`[核心状态机]` Agent 经常回复用户的上一条消息而不是当前消息，导致严重的对话错位。
*   **[#88312](https://github.com/openclaw/openclaw/issues/88312) (15 评论, 👍 3)**：`[回归]` 5 月 27 日的更新导致 Codex app-server 在多工具轮次中挂起，提示 "Codex stopped before confirming the turn was complete"。

---

## 5. Bug 与稳定性
今日报告了多个高危 Bug 和回归问题，主要集中在长时间运行和多模型并发场景：

*   **🔴 P1 严重阻塞 / 崩溃**：
    *   **[#89315](https://github.com/openclaw/openclaw/issues/89315)**：Linux 长时间运行部署中，Gateway 堆内存无限增长，最终被 cgroup OOM Killer 杀死。（*暂无 Fix PR*）
    *   **[#86508](https://github.com/openclaw/openclaw/issues/86508)** (👍 4)：Discord 运行出现回归，频繁抛出 `EmbeddedAttemptSessionTakeoverError` 导致会话接管失败。（*已有诊断，暂无明确 Fix PR*）
    *   **[#86538](https://github.com/openclaw/openclaw/issues/86538)**：Session 写锁超时阻塞了主线程、cron 嵌套和子 Agent 通道。PR [#91801](https://github.com/openclaw/openclaw/pull/91801) 正在尝试修复此类死锁问题。
*   **🟠 P2 性能与平台兼容性**：
    *   **[#54253](https://github.com/openclaw/openclaw/issues/54253) (👍 4)**：在 RISC-V64 架构系统上运行时，本地推理直接报 "LLM Request Failed"，存在平台兼容性盲区。

---

## 6. 功能请求与路线图信号
从近期的 Feature Request 和对应的 PR 活动来看，项目正在向**更细粒度的工具权限控制**和**多模态语音交互**迈进：
*   **多模态语音通话扩展**：PR [#91438](https://github.com/openclaw/openclaw/pull/91438) 正在为 Microsoft Teams 添加语音/视频通话提供商，表明项目正在积极拓展 beyond-text 的实时交互边界。
*   **安全与权限隔离**：PR [#91800](https://github.com/openclaw/openclaw/pull/91800) 引入了外部内容来源机制，为策略钩子提供结构化数据；PR [#79982](https://github.com/openclaw/openclaw/pull/79982) 重新规范了内置核心工具的 `group:core` 分组，为后续的细粒度权限下放铺路。
*   **长上下文状态管理**：用户在 [#56110](https://github.com/openclaw/openclaw/issues/56110) 中提议引入 `STATE.md` 自动记录工作状态，以对抗由于上下文压缩导致的“失忆”，这反映了重度用户对长期记忆机制的迫切需求。

---

## 7. 用户反馈摘要
综合近期的 Issue 评论，提炼出用户的三个核心反馈维度：
1.  **“工具调用泄露让 Bot 显得很蠢”**：这是目前 UX 层面最被诟病的问题。用户极度反感在 Discord/飞书/WhatsApp 中看到 `{"query":"...","maxResults":5}` 这样的底层 JSON 日志。
2.  **重度通道集成用户面临稳定性危机**：将 OpenClaw 接入 Telegram/Discord/微信 进行长期运行的用户，普遍遭遇了“会话卡死”、“重试死循环刷屏”（如 [#55694](https://github.com/openclaw/openclaw/issues/55694)）和状态上下文混乱，易用性受挫。
3.  **对 UI 和本地化模型的期待**：Control UI 的数学公式渲染需求 ([#42840](https://github.com/openclaw/openclaw/issues/42840), 👍 6) 呼声很高，说明有不少科研或教育领域的用户正在使用该框架。

---

## 8. 待处理积压
以下高影响力 Issue/PR 已经停滞较长时间，急需 Maintainer 关注或安全审查：
*   **🚨 安全与消息投递积压**：
    *   **[#44905](https://github.com/openclaw/openclaw/issues/44905)**：Discord 泄露内部工具调用痕迹（`NO_REPLY`、原始 JSON 参数等），带有 `impact:security` 标签，自 3 月开放至今仍无明确修复 PR。
    *   **[#54531](https://github.com/openclaw/openclaw/issues/54531)**

---

## 横向生态对比

以下是为您定制的 2026 年 6 月 10 日个人 AI 助手/自主智能体开源生态横向对比分析报告：

---

### 🌐 个人 AI 助手与智能体开源生态横向对比分析报告 (2026-06-10)

#### 1. 生态全景
当前 AI 智能体与个人助手开源生态正处于**从“单体对话”向“多模态、多端协同与复杂工作流编排”跃迁的关键重构期**。各项目普遍面临着长期记忆丢失、多模型并发状态机错乱以及底层工具调用泄露等共性工程挑战。同时，生态内呈现出明显的分化：部分成熟项目正在攻坚企业级的安全隔离与高并发网关，而新兴项目则在多智能体总线、插件化架构及端侧部署上寻求架构突破。整体而言，生态系统正快速吸收前沿大模型的能力，但生产环境的稳定性与精细化管控仍是各项目亟需跨越的鸿沟。

#### 2. 各项目活跃度对比

| 项目名称 | 活跃 Issues 数 | 活跃 PR 数 | 版本发布情况 | 核心聚焦/状态评估 | 健康度/效能评估 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 318 (新开/活跃) | 352 (待处理) | **v2026.6.5** (正式/beta) | 多渠道路由稳定、状态机并发修复 | ⭐⭐⭐⭐⭐ 高吞吐，核心痛点集中爆发期 |
| **IronClaw** | 40 | 50 | 无 | “Reborn”架构重构、E2E测试 | ⭐⭐⭐⭐ 底层重构深水区，PR合并滞后 |
| **CoPaw** | 23 (新开) | 38 | **v1.1.11-beta.2** | 浏览器控制、Tauri桌面端迁移 | ⭐⭐⭐⭐⭐ Issue闭环率极高(45%)，阵痛期 |
| **Zeroclaw** | 48 | 48 | 无 (冲刺 v0.8.0) | 多渠道网关、上下文预算管理 | ⭐⭐⭐ 活跃度高但严重积压，评审遇瓶颈 |
| **NanoClaw** | 1 | 43 | 无 | 插件系统、Skill市场、批量清理 | ⭐⭐⭐⭐⭐ 研发响应极快，架构扩展期 |
| **NanoBot** | 6 (新开) | 25 | 无 | WebUI交互、前沿模型兼容、上下文压缩 | ⭐⭐⭐⭐ 迭代稳健，为下个大版本蓄力 |
| **PicoClaw** | 18 (新开/活跃)| 16 | **Nightly v0.2.9** | 安全漏洞(SSRF/CSRF)防范、多智能体总线| ⭐⭐⭐⭐ 暴露-修复良性循环，安全意识强 |
| **LobsterAI** | 1 | 4 | 无 | 跨模型子任务协同、桌面端体验 | ⭐⭐⭐⭐ 稳健打磨，低频高质 |
| **其他项目** | - | - | - | (过去24小时无活动) | 无明显动态 |

#### 3. OpenClaw 在生态中的定位
*   **绝对规模领先的重度基座**：OpenClaw 单日 318 条活跃 Issue 和 352 条待处理 PR 的数据量级远超其他项目，是生态中用户基数最大、多端接入最全的“基础设施级”项目。
*   **技术路线差异**：相较于 LobsterAI 等专注桌面端 GUI 的项目，OpenClaw 是典型的**网关级/通道驱动型架构**，重度依赖消息队列与 Webhook 处理 Telegram/Discord/微信等多渠道。这也导致其当前最大的痛点集中在多路并发下的“会话上下文错乱”与“Gateway 内存溢出”。
*   **优势与挑战**：其跨平台控制面板和通道生态已极其完善，但也背负了沉重的历史包袱。相比之下，NanoBot 等项目在 WebUI 体验上更为轻量现代，而 IronClaw、PicoClaw 正在用更现代的插件化总线架构从零超越，以规避 OpenClaw 当前面临的状态机死锁难题。

#### 4. 共同关注的技术方向
*   **长期记忆与上下文预算控制**（*涉及项目：OpenClaw, NanoBot, Zeroclaw, PicoClaw*）
    *   **诉求**：简单的上下文拼接已失效。社区强烈要求解决长文本下的“上下文污染”（NanoBot #4259）、压缩过程中的“记忆失忆”（Zeroclaw #5808），以及引入预算裁剪机制来防止 Token 溢出导致的死循环。
*   **异构大模型兼容与动态路由**（*涉及项目：NanoBot, IronClaw, LobsterAI, CoPaw*）
    *   **诉求**：项目都在适配 GPT-5.x、DeepSeek 等新一代模型。企业级用户希望在同一个 Agent 内，根据隐私和延迟动态调度“本地模型”与“云端模型”（LobsterAI #2132, NanoBot #4253），且要求网关屏蔽各模型 API 严格的参数校验差异。
*   **工具调用隐蔽性与安全隔离**（*涉及项目：OpenClaw, PicoClaw, NanoClaw*）
    *   **诉求**：防范底层工具的原始 JSON 或内部错误处理逻辑直接暴露在用户聊天界面（OpenClaw #44905），并极力修补内外网通信时的 SSRF/CSRF 漏洞（PicoClaw 批量安全PR）。

#### 5. 差异化定位分析
*   **架构路线**：
    *   **微服务/插件化**：NanoClaw 正在建立 Skill Marketplace 与解耦运行时；IronClaw 进行全面“Reborn”重构，力求实现彻底的模块化。
    *   **单体/网关型**：OpenClaw 依然维持庞大而紧密的多通道网关架构。
    *   **端侧/轻量型**：LobsterAI 和 CoPaw 专注 Tauri 桌面端深度集成，强调本地系统级的控制力（如浏览器自动化、系统级通知）。
*   **目标受众**：
    *   OpenClaw、Zeroclaw：面向需要接入多方渠道（微信、企微、飞书等）的**私域运营者或企业客服系统**。
    *   NanoBot、NanoClaw：面向偏好 Web UI、喜欢折腾工作流和定制化技能的**极客开发者**。
    *   LobsterAI、CoPaw：面向希望拥有本地化个人助理、重视数据不出本的**C端/专业生产力用户**。

#### 6. 社区热度与成熟度
*   **快速迭代与重构攻坚层**：**OpenClaw** 虽处于成熟期，但当前受制于遗留架构的高并发 Bug，正处于“高耗能排雷”阶段；**IronClaw** 处于底层全面重写的深水区，PR 产出多但合并谨慎；**Zeroclaw** 面临着严重的社区评审积压，需警惕社区贡献者因等待过长而流失。
*   **功能扩展与生态繁荣层**：**NanoClaw** 与 **CoPaw** 处于功能大跃进阶段，尤其是 NanoClaw 吞吐量极高，正在快速吸收插件生态。
*   **稳健打磨与垂直深耕层**：**NanoBot** 和 **LobsterAI** 数量上不追求规模，但 Issue 质量极高（如跨模型调度、上下文注入机制），属于底层逻辑的深度优化；**PicoClaw** 借助白帽黑客的介入，正处于代码安全的快速加固期。

#### 7. 值得关注的趋势信号
1.  **“工具大脑裸奔”成为体验不可承受之重**：AI 偶尔“胡言乱语”已被接受，但在 GUI/聊天框输出底层 JSON 报错（OpenClaw）或可预测的随机数（NanoClaw）被定性为严重的安全/体验事故。**建议**：开发者需在网关层强制引入统一的输出清洗拦截器，剥离 LLM 的内部思考脚手架。
2.  **“异构模型协同”开启多智能体新范式**：从 LobsterAI 的“M3规划+DeepSeek执行”到 CoPaw 迁移至 AgentScope 2.0，表明单体 Agent 正在向“主进程负责路由与规划，子Agent负责工具执行”的 Master-Worker 架构演进。
3.  **上下文管理从“截断”走向“预算制”**：随着模型上下文窗口变大，粗暴截断会导致严重逻辑断裂。未来 AI 助手的标配将是基于 Token Budget 的智能裁剪算法（如 Zeroclaw 所尝试的），甚至引入独立的向量记忆层。
4.  **多渠道接入面临安全合规大考**：PicoClaw 集中爆出的十余个 SSRF/CSRF 漏洞为全行业敲响警钟。作为能直接调用系统级工具（执行

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

这份报告由您的 AI 智能体与个人 AI 助手项目分析师生成。以下是基于 GitHub 数据对 **NanoBot** 项目在 **2026-06-10** 的动态日报分析：

---

### 📊 NanoBot 项目动态日报 (2026-06-10)

#### 1. 今日速览
NanoBot 项目在过去 24 小时内保持了**极高的开发活跃度与社区热度**。虽然今日没有发布新版本，但产生了 **25 条 PR 更新（其中 10 条已合并/关闭）和 6 条新开的 Issue**。当前项目的迭代重心明显聚焦于三个方面：**前沿大模型（如 GPT-5.x、DeepSeek）的兼容性适配**、**长短期记忆系统（上下文压缩）的稳定性修复**，以及 **WebUI 交互体验的升级**。大量高质量的 Bugfix 和测试用例 PR 正在排队等待合并，预示着项目正在为下一个主要版本的发布夯实基础。

#### 2. 版本发布
**今日无新版本发布。**

#### 3. 项目进展
今日共有 10 个 PR 被合并或关闭，项目在功能丰富度和健壮性上取得了实质性进展：
*   **WebUI 交互增强**：合并了 `feat(webui): add assistant reply fork-from-here` ([#4208](https://github.com/HKUDS/nanobot/pull/4208))。用户现在可以从历史对话的某一条 Assistant 回复处直接“分叉”出新对话，极大改善了多分支对话的探索体验。
*   **权限与安全控制**：合并了 `feat(dream): allow users to decide whether dream can edit USER.md and SOUL.md or not` ([#3400](https://github.com/HKUDS/nanobot/pull/3400))。增加了自动化修改核心身份文件的开关，提升了用户对 AI 智能体记忆操控权的掌控力。
*   **渠道生态扩展**：合并了为飞书频道增加 LaTeX 公式渲染的功能 ([#3434](https://github.com/HKUDS/nanobot/pull/3434))。
*   **开发者体验优化**：合并了新手文档重构 ([#4177](https://github.com/HKUDS/nanobot/pull/4177))，为开源社区吸引新贡献者铺平了道路。

#### 4. 社区热点
今日讨论最活跃、受关注度最高的议题集中在**多模型切换**与**上下文污染**：
*   **对话级模型覆盖需求**：Issue [#4253](https://github.com/HKUDS/nanobot/issues/4253)（3条评论）引发了关于隐私与延迟平衡的讨论。用户 @rombert 希望能在同一个 AI 助手中，根据任务的隐私敏感度，随时在“强大的云端模型”和“本地 LlamaCpp 模型”之间无缝切换，而不仅仅是依赖全局配置。
*   **跨会话上下文污染痛点**：Issue [#4259](https://github.com/HKUDS/nanobot/issues/4259)（2条评论）深度剖析了底层架构问题。用户 @chxuan 指出 `history.jsonl` 在注入 System Prompt 时未做会话隔离，导致其他会话的摘要干扰当前对话，这揭示了 AI 助手在多会话并发处理时的核心挑战。

#### 5. Bug 与稳定性
今日报告了多个关键 Bug，但社区响应极其迅速，多数已有对应的 Fix PR：
*   **🔴 严重 [已有Fix]**：OpenAI 兼容提供商在 GPT-5.x/o 系列模型上报错，因为错误地传递了 `max_tokens` 而非 `max_completion_tokens`。对应 Fix PR: [#4268](https://github.com/HKUDS/nanobot/pull/4268), [#4263](https://github.com/HKUDS/nanobot/pull/4263)。
*   **🟠 中等 [已有Fix]**：WebUI 在高频流式输出时，存在静默丢弃整个 Assistant 回复的严重渲染 Bug。对应 Fix PR: [#4267](https://github.com/HKUDS/nanobot/pull/4267)。
*   **🟠 中等 [待认领]**：`idleCompact` 机制存在逻辑缺陷，仅总结剔除最后 8 条消息的历史记录，这导致 AI 犯错后的“纠错过程”可能无法被记入长期记忆，留下错误结论 ([#4264](https://github.com/HKUDS/nanobot/issues/4264))。
*   **🟡 低 [待认领]**：部分非标准 OpenAI 提供商会将 Tool calls 以纯文本标记输出，导致框架无法调度工具 ([#4061](https://github.com/HKUDS/nanobot/issues/4061))。

#### 6. 功能请求与路线图信号
从近期的 PR 和 Issue 中，我们可以洞察到项目正在演进的特征：
*   **多模态与国内大模型生态接入**：PR [#4260](https://github.com/HKUDS/nanobot/pull/4260) 增加了阶跃星辰 StepFun 的 ASR SSE 转录支持；PR [#3869](https://github.com/HKUDS/nanobot/pull/3869) 针对 DeepSeek 的消息格式进行了深度硬化。**信号**：NanoBot 正在扩大对非 OpenAI 标准协议及多模态（语音输入）的兼容圈层。
*   **底层工具链的安全与精细化**：PR [#4256](https://github.com/HKUDS/nanobot/pull/4256) 修复了光标单调性，以及 [#4119](https://github.com/HKUDS/nanobot/pull/4119) 阻断了工作区符号链接逃逸。**信号**：项目正在从“功能可用”向“企业级安全与稳定”迈进。

#### 7. 用户反馈摘要
通过对今日 Issue 的提炼，真实用户的痛点主要集中在：
1.  **多场景切换摩擦大**：用户希望 AI 助手能更智能地管理模型后端，而不是每次切换都要改全局配置（希望根据任务动态路由）。
2.  **长期记忆存在“幻觉与污染”**：用户对 AI 智能体如何管理历史记忆非常敏感。上下文压缩不仅不能丢失关键信息，也不能将其他不相干对话的上下文强行塞入当前会话。
3.  **UI 细节控**：用户对 WebUI 的细节要求越来越高，如分叉对话、启动时的 Icon 显示 ([#4262](https://github.com/HKUDS/nanobot/issues/4262))、长代码块的切割渲染 ([#4257](https://github.com/HKUDS/nanobot/pull/4257)) 等。

#### 8. 待处理积压
*   ⚠️ **Tool Call 解析严重边缘问题**：Issue [#4061](https://github.com/HKUDS/nanobot/issues/4061) 自 5 月 29 日提出至今仍未有 PR 完美解决。对于使用非标准 API 提供商的用户，这会导致工具调用完全失效。建议维护者 @yu-xin-c 或相关核心开发者关注。
*   ⚠️ **大量高质量测试与修复 PR 处于 Open 状态**：当前待合并的 PR 高达 15 条，包含大量由核心贡献者提交的涉及 Memory、Exec 安全和 Runner 测试的 PR（如 [#4193](https://github.com/HKUDS/nanobot/pull/4193), [#3983](https://github.com/HKUDS/nanobot/pull/3983)）。建议维护团队尽快安排 Code Review 并进行一波批量合并，以避免后续合并冲突。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下是为您生成的 **Zeroclaw (AI 智能体与个人 AI 助手) 项目动态日报**，数据截止至 2026-06-10。

---

### 📊 1. 今日速览
过去 24 小时内，Zeroclaw 项目保持了极高的社区活跃度，**新增/活跃 Issue 达 48 条，活跃 PR 达 48 条**，但评审与闭环速度出现滞后（仅关闭 2 个 Issue，合并/关闭 2 个 PR），积压趋势明显。
当前项目核心焦点集中在 **多渠道网关改进（如 Webhook、MQTT、AMQP）、Agent 记忆与上下文管理优化、以及 TUI/Web 控制台（Zerocode）的用户体验修复**。项目正处于向 `v0.8.0` 正式版过渡的阶段，开发重心偏向底层架构重构与安全/稳定性加固。

### 🚀 2. 版本发布
**无新版本发布。** 
当前社区正在围绕 `v0.8.0-beta-1` 进行密集测试（如 Issue #6876、#6862 均基于此版本反馈），预计正式版将伴随目前的 PR 积压清理后发布。

### 🛠️ 3. 项目进展
今日虽然没有合并大量 PR，但多个核心架构 PR 进入了活跃更新状态，为后续功能落地打下基础：
*   **可观测性架构升级**：PR [#7385](https://github.com/zeroclaw-labs/zeroclaw/pull/7385) 引入了 turn metadata 和 OTel spans 关联，这将极大增强生产环境中 Agent 运行链路的追踪能力。
*   **多渠道网关路由重构**：PR [#7367](https://github.com/zeroclaw-labs/zeroclaw/pull/7367) 实现了基于通道别名的入站 Webhook 路由分发，解决了多实例（如工作+个人微信/WhatsApp）仅能生效一个的痛点。
*   **Agent 并发与调度修复**：PR [#7442](https://github.com/zeroclaw-labs/zeroclaw/pull/7442) 修复了并行 SubAgents 和 Delegates 无法可靠返回结果的问题；PR [#7348](https://github.com/zeroclaw-labs/zeroclaw/pull/7348) 修复了启动时超时 Cron 任务错误追回的 Bug。
*   **上下文预算管理优化**：PR [#7440](https://github.com/zeroclaw-labs/zeroclaw/pull/7440) 智能跳过因 System Prompt 过大导致的无意义上下文裁剪，缓解了死循环崩溃。

### 🔥 4. 社区热点
*   **品牌视觉探讨**：Issue [#4710](https://github.com/zeroclaw-labs/zeroclaw/issues/4710)（评论数 20，已关闭）引发了关于 Zeroclaw 新 Logo 设计的激烈讨论，显示出社区对项目品牌形象的高关注度。
*   **Agent 自我认知缺陷**：Issue [#5862](https://github.com/zeroclaw-labs/zeroclaw/issues/5862)（评论数 12）指出 Agent 不知道自己具备执行 `cron` 任务的能力。这暴露了当前 System Prompt 注入工具集时的描述盲区，亟需优化。
*   **Provider 底层重构呼声**：Issue [#5937](https://github.com/zeroclaw-labs/zeroclaw/issues/5937)（评论数 10）提议统一 providers 架构和 reqwest 客户端管理。当前代码库中不同模型提供商的请求构造逻辑存在大量重复，这是阻碍新模型快速接入的技术债。

### 🐛 5. Bug 与稳定性
今日报告了多个 **S1 级别（阻塞工作流）** 的严重 Bug，多与上下文、工具调用相关：
1.  **消息丢失严重 Bug**：Issue [#6034](https://github.com/zeroclaw-labs/zeroclaw/issues/6034) 报告了在单轮及多轮对话中出现 User message 丢失的现象，导致直接报 400 错误。
2.  **MCP 工具静默挂起**：Issue [#6721](https://github.com/zeroclaw-labs/zeroclaw/issues/6721) 指出 `tool_search` 未加入默认自动批准列表，导致在 webhook 模式下使用 MCP deferred_loading 时会静默挂起 120 秒。（目前 PR [#7427](https://github.com/zeroclaw-labs/zeroclaw/pull/7427) 正尝试通过增加警告来缓解）。
3.  **上下文预算溢出死循环**：Issue [#5808](https://github.com/zeroclaw-labs/zeroclaw/issues/5808) 指出默认 32k 上下文在第一轮迭代时就因为工具定义过大而超限，导致被无限裁剪。（已有对应修复 PR [#7440](https://github.com/zeroclaw-labs/zeroclaw/pull/7440)）。
4.  **Cron 重复执行**：Issue [#6037](https://github.com/zeroclaw-labs/zeroclaw/issues/6037) 报告耗时较长的 Cron 任务会在调度间隔内被重复触发（已在处理中）。

### 🗺️ 6. 功能请求与路线图信号
从带有 `status:accepted` 标签的 Issue 中，可以窥见项目下一阶段的演进方向：
*   **企业级多租户与安全隔离**：Issue [#5982](https://github.com/zeroclaw-labs/zeroclaw/issues/5982) 和 [#5775](https://github.com/zeroclaw-labs/zeroclaw/issues/5775) 提出了基于 Sender 的 RBAC 权限控制和单个 Skill 级别的安全沙箱隔离。这是 Zeroclaw 从个人助手向企业级多用户平台迈进的明确信号。
*   **标准化技能发现协议**：Issue [#4853](https://github.com/zeroclaw-labs/zeroclaw/issues/4853) 提议支持从 `.well-known` URI 安装 Agent Skills，紧跟业界标准（如 Cloudflare、Vercel 的实践），生态扩展潜力巨大。
*   **Zerocode TUI 深度优化**：集中反馈了 Dashboard 状态显示错误、Mac 快捷键冲突等问题，表明团队正在重点打磨自带终端控制台的用户体验。

### 💬 7. 用户反馈摘要
*   **痛点：记忆喧宾夺主**：用户反馈（[#5844](https://github.com/zeroclaw-labs/zeroclaw/issues/5844)）Agent 在执行任务（特别是 Cron 自动任务）时，过度依赖长期记忆，反而忽略了当前指令的优先级。
*   **痛点：兼容性 Provider 适配不完善**：OpenRouter/vLLM 等兼容 API 在处理多轮对话和 Reasoning 字段时遭遇解析失败（[#6584](https://github.com/zeroclaw-labs/zeroclaw/issues/6584)），目前 PR [#7423](https://github.com/zeroclaw-labs/zeroclaw/pull/7423) 已尝试修复字段映射。
*   **痛点：Web 控制台解析崩溃**：v0.8.0-beta 的 Dashboard 因 SPA 将所有未知路由返回 index.html，导致 API 请求获取不到 JSON 而白屏（[#6862](https://github.com/zeroclaw-labs/zeroclaw/issues/6862)）。

### ⚠️ 8. 待处理积压
目前项目的 Issue 与 PR 积压情况较为严重，需维护者重点关注：
*   **PR 合并阻塞**：高达 48 个 PR 处于 Open 状态。其中大型重构 PR（如文档重构 [#7365](https://github.com/zeroclaw-labs/zeroclaw/pull/7365)、AMQP频道引入 [#7369](https://github.com/zeroclaw-labs/zeroclaw/pull/7369)）占用了大量 Review 资源，导致很多 S 级别的 Bugfix PR（如 [#7215](https://github.com/zeroclaw-labs/zeroclaw/pull/7215)）处于等待状态。
*   **高优 Issue 等待响应**：多个严重阻塞流程的 Issue（如 Telegram 频道下 Web Search 工具无法触发 [#6646](https://github.com/zeroclaw-labs/zeroclaw/issues/6646)、SOP 引擎多实例状态不共享 [#6687](https://github.com/zeroclaw-labs/zeroclaw/issues/6687)）目前仍仅停留在 `accepted` 阶段，亟待排期解决。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 PicoClaw 项目动态日报 (2026-06-10)

> **数据来源**: [sipeed/picoclaw](https://github.com/sipeed/picoclaw) | **分析周期**: 过去 24 小时

## 1. 今日速览

PicoClaw 项目在过去 24 小时内呈现出**极高的活跃度与快速迭代态势**，共产生 21 条 Issue 更新（18 新开/活跃，3 关闭）与 16 条 PR 更新。今日最大亮点是社区安全研究人员的深度介入，白帽黑客 @YLChen-007 提交了多达 15 个安全审计漏洞（涵盖 SSRF、CSRF、权限绕过等），项目团队及社区迅速响应并提交了针对性修复 PR。同时，项目成功合并了多智能体协作总线等核心架构代码，并推送了 `v0.2.9` 的最新 Nightly 构建，整体项目健康度在“暴露问题-迅速修复”的良性循环中持续向好。

---

## 2. 版本发布

- **[nightly] Nightly Build (v0.2.9-nightly.20260610.b9a8fad6)**
  - **详情**: 自动化的每日夜间构建版本，包含截至目前的最新主分支代码。
  - **稳定性提示**: 官方提醒该版本为自动化构建，可能存在不稳定情况，生产环境需谨慎使用。
  - **完整变更日志**: [v0.2.9...main](https://github.com/sipeed/picoclaw/compare/v0.2.9...main)

---

## 3. 项目进展

今日共有 **5 个 PR 被合并/关闭**，重点在底层架构升级与大模型兼容性修复，项目整体架构能力与稳定性迈上了新台阶：

- **🚀 核心架构 - 多智能体协作**: PR [#2937](https://github.com/sipeed/picoclaw/pull/2937) 已合并。引入了一流的内部 Agent Collaboration Bus（智能体协作总线），支持持久化通信、独立会话历史和权限感知机制，为 PicoClaw 迈向多 Agent 协同工作奠定了基础。
- **🛠 模型兼容性修复**: 
  - PR [#2940](https://github.com/sipeed/picoclaw/pull/2940) 合并，修复了 `claude-opus-4-7 模型`因不支持 `temperature` 参数报错 400 的问题。
  - PR [#2942](https://github.com/sipeed/picoclaw/pull/2942) 合并，修复了 Anthropic 模型默认配置 ID 格式错误（使用了点号而非连字符）导致的初始化失败。
- **🧯 稳定性提升**: PR [#3064](https://github.com/sipeed/picoclaw/pull/3064) 合并，修复了配置迁移过程中因类型断言未校验导致的 Panic 崩溃问题。

---

## 4. 社区热点

今日社区关注焦点高度集中于**安全防御与通信协议**：

- **🔥 安全审计风暴**: 用户 @YLChen-007 在今日集中提交了十余个安全问题（如 [#3068](https://github.com/sipeed/picoclaw/issues/3068), [#3072](https://github.com/sipeed/picoclaw/issues/3072), [#3078](https://github.com/sipeed/picoclaw/issues/3078) 等），极其细致地曝光了飞书/企微信道绕过、MQTT 伪造、SSRF 代理绕过等边缘边界场景漏洞。这反映了社区对 PicoClaw 作为本地个人助手接入各种外部信道时的高度安全诉求。
- **💬 流式输出与协议控制**: Issue [#2404](https://github.com/sipeed/picoclaw/issues/2404)（获赞 11 评论）持续引发关注，用户强烈希望支持通过配置文件开启 HTTP 流式请求；同时 Issue [#2984](https://github.com/sipeed/picoclaw/issues/2984) 提出了在 WebSocket 客户端增加明确的“轮次结束信号”的需求，表明开发者在将 PicoClaw 集成到第三方 UI 时，对底层通信控制粒度的要求越来越高。

---

## 5. Bug 与稳定性

今日报错了大量 Bug 及潜在崩溃风险，部分已有对应 PR 修复：

**🚨 高危/严重稳定性问题**：
1. **配置解析崩溃**: `migration.go` 中未校验的类型断言导致异常 Panic（**已修复**: [PR #3064](https://github.com/sipeed/picoclaw/pull/3064)）。
2. **命令执行工作区逃逸**: 限制工作区功能误拦截了相对路径（如包含 `skills/` 的路径），导致正常工具无法执行（**修复中**: [PR #3087](https://github.com/sipeed/picoclaw/pull/3087)）。
3. **LLM 空响应卡死**: 兼容 API 返回空 Content 时，Agent 会将其误判为最终回复导致流程卡住（**修复中**: [PR #2983](https://github.com/sipeed/picoclaw/pull/2983)）。

**🛡 安全性 Bug (SSRF / 权限绕过)**：
1. **SSRF 防护绕过**: 存在 IPv6 隧道、环回代理及特殊 IP 段 `198.18.0.0/15` 等多起绕过漏洞（**部分已提交修复**: [PR #3085](https://github.com/sipeed/picoclaw/pull/3085) 阻断 `198.18.0.0/15`）。
2. **本地控制台劫持**: Launcher 首次运行设置存在 CSRF 风险，可被恶意接管（Issue [#3072](https://github.com/sipeed/picoclaw/issues/3072)，**加固进行中**: [PR #3083](https://github.com/sipeed/picoclaw/pull/3083)）。

---

## 6. 功能请求与路线图信号

从近期的 Feature PR 与 Issue 中，可以窥见 PicoClaw 接下来版本的重点演进方向：

- **多渠道网关支持**: PR [#3063](https://github.com/sipeed/picoclaw/pull/3063) 正在增加 Delta Chat 网关，结合近日爆出的各种通信信道安全加固，说明项目正致力于打造成“全平台/全信道接入”的超级代理枢纽。
- **支持 NEAR AI Cloud**: PR [#2917](https://github.com/sipeed/picoclaw/pull/2917) 试图接入 NEAR AI 云作为原生兼容提供商，拓展去中心化/TEE 环境下的模型选择。
- **安全加密库替换**: Issue [#3088](https://github.com/sipeed/picoclaw/issues/3088) 建议将不再维护的 `libolm` 替换为官方的 `vodozemac`，预计这将是下个版本的重点重构任务。
- **流式交互与状态控制**: 结合呼声极高的流式请求 ([#2404](https://github.com/sipeed/picoclaw/issues/2404)) 与 WebSocket 完成信号 ([#2984](https://github.com/sipeed/picoclaw/issues/2984))，项目未来将进一步优化高实时性前端框架的接入体验。

---

## 7. 用户反馈摘要

从今日 Issue 和 PR 记录中，可以提炼出用户的真实应用场景与痛点：

- **痛点：Web UI 体验断档**: 用户在 Web UI 查看多轮历史对话时，只能看到最后一条消息（Issue [#2796](https://github.com/sipeed/picoclaw/issues/2796)）。原因是底层压缩逻辑不适配前端显示。目前已提交修复 PR [#2990](https://github.com/sipeed/picoclaw/pull/2990)。
- **痛点：Windows 环境兼容性差**: 工具函数 `list_dir` 在 Windows 下因路径斜杠解析问题直接报错（Issue [#2472](https://github.com/sipeed/picoclaw/issues/2472)）；同时，启动器在 Windows 下后台运行时会频繁闪现控制台黑窗，影响体验（PR [#3061](https://github.com/sipeed/picoclaw/pull/3061)）。
- **诉求：上下文管理更精细**: 用户希望自行配置上下文压缩触发比例，而不是写死硬编码的 Token 数量（PR [#2988](https://github.com/sipeed/picoclaw/pull/2988)）。

---

## 8. 待处理积压

以下重要 PR / Issue 处于 Open 状态，部分已打上 `[stale]` 标签，建议维护团队尽快排期复核：

1. **[PR] 修复上下文压缩与配置解耦**: [PR #2988](https://github.com/sipeed/picoclaw/pull/2988) - 解决 `/context` 指令配置不生效问题，等待核心团队 Review。
2. **[PR] 修复活跃流式会话中工具调用丢失**: [PR #2987](https://github.com/sipeed/picoclaw/pull/2987) - 修复流式传输时 `tool_calls` 被错误过滤的严重逻辑 Bug。
3. **[PR] NEAR AI 接入**: [PR #2917](https://github.com/sipeed/picoclaw/pull/2917) - 需维护者确认架构设计是否合入主分支。
4. **[Issue] 剩余未修复的安全漏洞**: 针对今日集中爆出的 MQTT、OneBot、企微、飞书等信道的安全漏洞（如 [Issue #3068](https://github.com/sipeed/picoclaw/issues/3068)、[#3070](https://github.com/sipeed/picoclaw/issues/3070) 等），目前仅部分提交了初步修复 PR，仍需全面的安全重构与代码审计跟进。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下是为您生成的 [NanoClaw](https://github.com/nanocoai/nanoclaw) 项目 2026-06-10 动态日报：

# 📊 NanoClaw 项目动态日报 (2026-06-10)

## 1. 今日速览
NanoClaw 项目今日在代码库维护和合并上展现出极高的活跃度。过去 24 小时内，项目处理了多达 **43 个 Pull Requests**（其中 39 个被合并或关闭），这表明核心团队正在进行一次大规模的代码清理与功能收尾工作。
尽管 PR 迭代速度惊人，但 Issues 板块相对平静，仅 1 个历史 Issue 产生了新评论，且今日无新版本发布。整体来看，项目正处于**功能整合与重大版本发布前的集中清理阶段**，健康度良好，维护者对社区贡献的响应非常迅速。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日共有 39 个 PR 被合并或关闭，项目在功能丰富度、架构扩展和开发体验上取得了重大进展。以下是具有里程碑意义的重点 PR：
*   **插件与生态架构演进**：
    *   [PR #1387](https://github.com/nanocoai/nanoclaw/pull/1387) `CLOSED` - 引入了类似 Channel 的插件系统，大幅增强了平台的可扩展性。
    *   [PR #1309](https://github.com/nanocoai/nanoclaw/pull/1309) `CLOSED` - 实现了 Skill Marketplace/Registry（技能市场/注册表）系统，为社区共享技能模块奠定了基础。
*   **运行器与底层优化**：
    *   [PR #1285](https://github.com/nanocoai/nanoclaw/pull/1285) `CLOSED` - 新增直接运行模式（无需 Docker 容器），大幅降低了本地开发门槛和资源消耗。
    *   [PR #1192](https://github.com/nanocoai/nanoclaw/pull/1192) `CLOSED` - 在代码中显式指定 Claude 模型，提升了 Agent 运行时的确定性与可追溯性。
*   **可观测性与管理面板**：
    *   [PR #212](https://github.com/nanocoai/nanoclaw/pull/212) `CLOSED` - 添加了基于 Web UI 的控制面板，提供 11 个选项卡用于聊天、仪表盘、系统日志等全方位管理。
    *   [PR #1202](https://github.com/nanocoai/nanoclaw/pull/1202) `CLOSED` - 引入了带 Web UI 的 Agent 追踪可观测性系统。
*   **生产环境 Bug 修复**：
    *   [PR #2718](https://github.com/nanocoai/nanoclaw/pull/2718) `CLOSED` - 修复了飞书交互卡在 Agent 异常退出时卡在“运行中”长达 50 分钟的僵尸进程问题。

## 4. 社区热点
今日讨论热度最高的是多运行时架构的探讨，这反映了社区对打破单一 LLM 供应商锁定的强烈诉求：
*   **[Issue #1690](https://github.com/nanocoai/nanoclaw/issues/1690) [OPEN]** `👍: 3` | `评论: 5`
    *   **热议焦点**：作者 @chiptoe-svg 提出构建一个多运行时 Agent SDK 抽象层（支持 Claude、Codex 及本地模型）。
    *   **诉求分析**：用户希望将不同的 Agent SDK 像目前的集成通道一样模块化（如 `/add-telegram`）。这表明随着项目的发展，用户群体对“跨模型兼容”和“本地化私有部署”的需求日益高涨。

## 5. Bug 与稳定性
今日暴露并修复了两个关键的安全与稳定性问题：
*   **【高危】随机数生成器安全隐患**：
    *   [PR #2722](https://github.com/nanocoai/nanoclaw/pull/2722) `OPEN` - 修复了 Telegram 配对码使用了可预测的 `Math.random` 的漏洞，目前已替换为密码学安全的 `crypto.randomInt` (CSPRNG)。**目前该修复 PR 仍处于待合并状态，建议维护者紧急评审并合并**。
*   **【中危】飞书通道僵尸状态卡顿**：
    *   [PR #2718](https://github.com/nanocoai/nanoclaw/pull/2718) `CLOSED` - 当 `agent-runner` 进程被 `PROCESS_TIMEOUT` 杀死时，由于 `deleteActiveCard` 仅在 SDK 的 `final` 事件中触发，导致 UI 持续显示运行中。现已修复并关闭。

## 6. 功能请求与路线图信号
结合今日的 Issue 动态与 PR 合并情况，可以捕捉到明确的路线图信号：
*   **多模型/多 SDK 支持**：正如 [Issue #1690](https://github.com/nanocoai/nanoclaw/issues/1690) 所示，多运行时抽象层是社区下一步的强烈诉求。考虑到今日项目已经合并了庞大的 Plugin System ([PR #1387](https://github.com/nanocoai/nanoclaw/pull/1387))，未来的多模型支持极有可能以“插件化技能”的形式整合进主分支。
*   **Skills 生态商业化/共享化**：[PR #1309](https://github.com/nanocoai/nanoclaw/pull/1309) (Marketplace System) 的合并，表明项目正在从单一工具向“平台+应用市场”模式演进。

## 7. 用户反馈摘要
从 [Issue #1690](https://github.com/nanocoai/nanoclaw/issues/1690) 的评论中提炼出当前用户的核心反馈：
*   **痛点**：目前项目深度绑定了特定模型（如 Claude），在处理复杂任务时，用户缺乏在同一个会话框架下灵活切换不同模型（如调用本地私有模型或更廉价的云端模型）的能力。
*   **满意点**：用户高度赞赏现有的“Channel 模式”（如通过简单命令添加 Slack、Telegram 等），并希望将这种低门槛、模块化的优秀体验复用到底层模型 SDK 的切换上。

## 8. 待处理积压
尽管今日处理了大量积压，但仍有以下关键项需要核心团队关注：
*   **待合并的安全修复**：[PR #2722](https://github.com/nanocoai/nanoclaw/pull/2722) 涉及严重的配对码预测漏洞，目前仍为 Open 状态，需立即安排 Code Review 并推进合并。
*   **重要架构设计讨论待定**：[Issue #1690](https://github.com/nanocoai/nanoclaw/issues/1690) 提出的 Multi-runtime 方案虽然讨论热烈，但目前缺乏官方核心成员的明确表态。建议维护者尽快介入，给出是否纳入 Roadmap 的官方回复，以免社区开发者重复造轮子。
*   **文档完善**：[PR #2721](https://github.com/nanocoai/nanoclaw/pull/2721) 提供了关于自定义介绍、技能模型和技能指南的公共文档，目前处于 Open 状态，是巩固今日庞大功能合并的重要配套文档，建议尽早合入。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

这里是为您生成的 **IronClaw** 项目 2026年6月10日 动态日报：

# 📊 IronClaw 项目动态日报 (2026-06-10)

## 1. 今日速览
IronClaw 项目今日处于**极高的活跃状态**，过去 24 小时内产生了 40 条新增/活跃 Issue 和多达 50 条 PR 更新。项目当前正处于向 **“Reborn”新架构全面迁移**的深水区，核心团队及社区开发者正密集提交底层重构代码。从提交记录来看，项目整体演进速度极快，重点聚焦在生产环境的就绪检查、WebUI v2 的全栈 E2E 测试覆盖以及多渠道能力的接入上。尽管开发活动火爆，但今日无新版本发布，表明项目仍在积累关键的架构重构代码。

## 2. 版本发布
**无新版本发布**。项目当前处于高密度的底层重构与功能积攒阶段，距离下一次正式发版仍需等待核心的 Reborn 生产环境配线及测试覆盖彻底完成。

## 3. 项目进展
今日项目的主要进展集中在后端架构重组和自动化测试体系的建立上。虽然仅有 2 个 PR 被合并/关闭，但一系列重要的 Issue 被标记为完成，标志着关键里程碑的达成：
*   **OpenAI 兼容层与流式处理就绪**：核心 Issue [#4446](https://github.com/nearai/ironclaw/issues/4446) (投影流转换) 和 [#4447](https://github.com/nearai/ironclaw/issues/4447) (兼容性迁移) 被关闭，这表明 Reborn 架构在兼容 OpenAI 标准协议及流式响应方面已达到生产级别标准。
*   **E2E 测试基础设施补齐**：[#4604](https://github.com/nearai/ironclaw/issues/4604) 和 [#4609](https://github.com/nearai/ironclaw/issues/4609) 关闭，代表 WebUI v2 补齐了真实浏览器级别的全链路 E2E 测试和鉴权对齐测试。
*   **底层能力重构稳步推进**：大量 XL 级别的 PR 处于开启待合并状态，包括 Reborn 持久化审批策略 ([#4613](https://github.com/nearai/ironclaw/pull/4613))、自动化所有权核心模型 ([#4663](https://github.com/nearai/ironclaw/pull/4663))，为后续的功能解耦打下了坚实基础。

## 4. 社区热点
今日社区与核心开发者讨论最热烈的话题围绕生产环境就绪和底层 Bug 展开前：
*   **Reborn 生产环境切入准备**：作者 @serrrfirat 提交的 Epic [#3026](https://github.com/nearai/ironclaw/issues/3026) 拥有今日最高的评论数。讨论焦点集中在：在生产环境中，如何确保配置图被正确构建和验证，以及在服务缺失时如何阻断流量。配套的诊断 PR [#4626](https://github.com/nearai/ironclaw/pull/4626) 和 [#4627](https://github.com/nearai/ironclaw/pull/4627) 正在紧锣密鼓地进行代码审查。
*   **第三方大模型兼容性痛点**：Issue [#4642](https://github.com/nearai/ironclaw/issues/4642) 和 [#4548](https://github.com/nearai/ironclaw/issues/4548) 引发了较多关注。社区反馈在接入 DeepSeek 等第三方模型或使用 Strict-mode 时遇到参数校验报错。开发者正在就如何优雅处理 `null` 参数及避免序列化重复字段进行讨论。

## 5. Bug 与稳定性
今日报告了多个影响交互体验和兼容性的关键 Bug，整体稳定性面临多模型适配的挑战：
*   **🔥 P0 级：Strict-mode 提供商工具调用失败**：[#4642](https://github.com/nearai/ironclaw/issues/4642) - Reborn 的能力端口校验错误地拒绝了 strict-mode LLM 提供商的合法调用（将未设置的可选参数传 `null` 时抛出异常），导致大部分第一方工具瘫痪。（*暂未看见修复 PR*）
*   **🔥 P1 级：DeepSeek

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

这里是为您生成的 LobsterAI 项目 2026-06-10 动态日报：

# 📊 LobsterAI 项目动态日报 (2026-06-10)

## 1. 今日速览
LobsterAI 项目今日整体保持稳健的开发与维护节奏，过去 24 小时内共产生 1 条新活跃 Issue 和 4 条 PR 更新。项目当前的核心发力点聚焦于**跨模型多智能体协作机制的深度优化**，以及**桌面端渲染层与系统通知的稳定性建设**。目前有 1 个修复导出与复制Bug的 PR 正待合并，整体项目健康度良好，社区正朝着更复杂的 AI Agent 编排场景进行技术探索。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日共有 3 个 PR 被关闭（假定含已合并），主要在系统通知、渲染层表现及数据备份方面推进了迭代：
*   **桌面端任务完成通知机制优化**：PR [#2134](https://github.com/netease-youdao/LobsterAI/pull/2134) 顺利关闭。该 PR 修复了主窗口关闭或销毁时的状态恢复问题，并优化了 macOS 通知中心的点击响应。这显著提升了多任务后台运行时的系统级交互体验。
*   **数据备份功能阶段性调整**：PR [#2136](https://github.com/netease-youdao/LobsterAI/pull/2136) (数据备份与迁移特性) 与 PR [#2135](https://github.com/netease-youdao/LobsterAI/pull/2135) (临时关闭数据备份功能) 双双被关闭。这表明项目在该功能的引入上采取了谨慎态度，可能因架构或体验问题正在进行回退或重写评估。

## 4. 社区热点
今日最受关注的议题是关于 **跨模型子任务协作** 的深度探讨：
*   **[跨模型协同调度]** Issue [#2132](https://github.com/netease-youdao/LobsterAI/issues/2132)
    *   **分析**：用户 @woxinsj 深入剖析了“M3模型(主规划) + DeepSeek模型(子执行)”的协作场景。该讨论直击当前 AI Agent 领域的痛点——**网关级函数调用与子任务生命周期管理的割裂**。用户不仅定位了根因（`call_function` 未被纳入 `subagents` 管理），还提出了极具建设性的“子任务主动汇报/通知机制”。这高度契合 LobsterAI 作为个人 AI 助手向复杂工作流演进的需求。

## 5. Bug 与稳定性
今日暴露并处理的 Bug 集中在客户端交互与多模型调度两个维度：
*   **[中等] 导出与代码复制功能缺陷**：开发者 @fisherdaddy 提交了 PR [#2133](https://github.com/netease-youdao/LobsterAI/pull/2133) 以修复导出和代码复制的 Bug。此问题影响用户基础的数据沉淀体验，目前 PR 处于 Open 状态，等待合并。
*   **[需关注] 跨模型子任务调度失效**：根据 Issue [#2132](https://github.com/netease-youdao/LobsterAI/issues/2132) 的反馈，当前系统在进行跨模型调度时，主任务无法感知子任务状态，导致自动化流程卡点。此为核心调度逻辑的盲区，目前暂无直接的修复 PR。

## 6. 功能请求与路线图信号
从今日的开发轨迹与社区讨论中，可以捕捉到以下产品路线图信号：
*   **多模型协同调度**：用户在 Issue [#2132](https://github.com/netease-youdao/LobsterAI/issues/2132) 中描绘的“异构模型主子任务协同通知机制”，极有可能是项目下一阶段完善 Agent 编排能力的重点方向。
*   **数据备份与迁移**：尽管 PR [#2136](https://github.com/netease-youdao/LobsterAI/pull/2136) 被关闭，且 PR [#2135](https://github.com/netease-youdao/LobsterAI/pull/2135) 临时移除了该功能，但这明确释放了项目正在积极研发“数据备份与多端/多实例迁移”能力的信号，预计完善后将在未来版本重新推出。

## 7. 用户反馈摘要
从 Issue 评论与摘要提炼来看，真实用户的使用场景已超出简单的单轮对话，延伸至**复杂的异构模型组合调用**（如“M3负责规划和验收，DeepSeek负责代码执行”）。用户对系统的要求正从“能用”向“稳定的企业级工作流”转变，对于子任务的状态追踪、卡点汇报机制有着强烈诉求。

## 8. 待处理积压
*   **待合并 PR**：修复渲染层导出与代码复制 Bug 的 PR [#2133](https://github.com/netease-youdao/LobsterAI/pull/2133) 仍处于 Open 状态，建议维护者 @fisherdaddy 尽快完成 Code Review 并推进合并，以恢复基础功能的稳定性。
*   **高价值未响应 Issue**：Issue [#2132](https://github.com/netease-youdao/LobsterAI/issues/2132) 包含了大量高质量的技术分析，目前尚无官方开发者（Maintainer）回复。建议项目组重点关注该 Issue，确认是否将跨模型通知机制纳入底层架构重构的计划中。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

这是一份基于 2026-06-10 数据生成的 **CoPaw (QwenPaw)** 开源项目动态日报。

---

# 📊 CoPaw (QwenPaw) 项目动态日报 (2026-06-10)

## 1. 今日速览
今日 CoPaw (QwenPaw) 项目保持**极高的研发与社区活跃度**。项目在24小时内处理了 **42 条 Issue**（新开/活跃 23，关闭 19）和 **38 条 PR**（待合并 20，合并/关闭 18），.issue 闭环率高达 45%，显示出维护者高效的需求响应与Bug修复能力。
项目今日发布了 **v1.1.11-beta.2**，重点优化了浏览器控制能力。从社区讨论来看，当前项目正处于**底层架构升级（AgentScope 2.0 迁移）**与**桌面端/前端体验重构（Tauri 迁移副作用优化）**的关键阵痛期，社区对高级记忆系统、独立视觉模型等进阶 Agent 能力的呼声日益高涨。

---

## 2. 版本发布
### 🚀 [v1.1.11-beta.2](https://github.com/agentscope-ai/QwenPaw/releases/tag/1.1.11-beta.2)
- **更新亮点**：主要增强了浏览器自动化控制能力，并修复了跨浏览器切换的稳定性问题。
- **关键变更**：
  - **新增功能**：`browser_control` 新增页面坐标点击支持 ([PR #4905](https://github.com/agentscope-ai/QwenPaw/pull/4905))。
  - **Bug修复**：新增 CDP 超时参数，并引入浏览器 Profile 隔离机制，解决了跨浏览器切换时的冲突问题 ([PR #x1n95c](https://github.com/agentscope-ai/QwenPaw/pull/xxx))。

---

## 3. 项目进展
今日共有 18 个 PR 被合并或关闭，项目在**插件系统、稳定性修复、E2E测试**方面取得实质性进展：
- **技能与插件系统完善**：
  - 合并了 [PR #4969](https://github.com/agentscope-ai/QwenPaw/pull/4969)：新增技能标签批量下载功能，推进了技能池的分类管理体验。
  - 提交了 [PR #5046](https://github.com/agentscope-ai/QwenPaw/pull/5046)：重构了前端工具卡片的插件覆盖逻辑（内置插件优先，外部插件可覆盖）。
- **核心稳定性提升**：
  - 合并了 [PR #5014](https://github.com/agentscope-ai/QwenPaw/pull/5014)：彻底修复了 Docker 重启时 MCP 子进程累积导致控制台加载缓慢的严重问题（关联 [Issue #4834](https://github.com/agentscope-ai/QwenPaw/issues/4834)）。
  - 提交了 [PR #5000](https://github.com/agentscope-ai/QwenPaw/pull/5000)：防止因 `loop_config.json` 损坏导致整个 Agent 会话崩溃。
- **测试覆盖度提升**：
  - 提交了 [PR #4973](https://github.com/agentscope-ai/QwenPaw/pull/4973)：为后端核心模块新增了 129 个单元测试，大幅增强代码健壮性。

---

## 4. 社区热点
今日讨论最热烈的话题集中在**竞品对标与底层架构重塑**：
1. **对标 Hermes Agent 的“学习循环”** ([Issue #5017](https://github.com/agentscope-ai/QwenPaw/issues/5017) | 10条评论 | 👍3)
   - **诉求分析**：用户肯定了 QwenPaw 的本地化体验，但指出近期爆火的 Hermes Agent 具备“从自身行为中自动创建并迭代技能”的优势。社区希望项目能集百家之长，强化 Agent 的自主学习与进化能力。
2. **底层架构迁移至 AgentScope 2.0** ([Issue #4727](https://github.com/agentscope-ai/QwenPaw/issues/4727) | 7条评论 | 👍2)
   - **诉求分析**：这是一项破坏性变更（Breaking Change）。官方计划将后端依赖从 1.x 升级到 2.0。该进展引发了开发者的密集关注，涉及到底层 API 和运行时模型的全面重构。
3. **记忆系统自进化需求** ([Issue #4994](https://github.com/agentscope-ai/QwenPaw/issues/4994) | 3条评论 | 👍1)
   - **诉求分析**：用户反馈当前记忆系统过于薄弱，呼吁尽快吸收主流 Agent 的分层记忆系统框架。

---

## 5. Bug 与稳定性
今日报告了多个影响体验的Bug，部分高优问题已有对应修复 PR：

### 🔴 严重
- **Windows Tauri 桌面端启动严重变慢** ([Issue #5047](https://github.com/agentscope-ai/QwenPaw/issues/5047))
  - **现象**：自桌面端从 Python 打包换为 Tauri 后，启动时间从 1-2 分钟暴增至十几分钟，且经常无响应。*(暂无修复 PR，需重点关注)*。
- **本地部署模型(vLLM)对话无响应** ([Issue #4989](https://github.com/agentscope-ai/QwenPaw/issues/4989))
  - **现象**：升级至 1.1.9/1.1.10 后，使用本地千问3.6-27B（OpenAI协议）提交问题后无限转圈，且无后台报错。属于严重回归。

### 🟠 中等
- **定时任务无法触发与编辑** ([Issue #5064](https://github.com/agentscope-ai/QwenPaw/issues/5064))
  - **现象**：Agent 在会话中生成的定时任务既无法自动触发，也无法手动编辑。
- **DeepSeek API 兼容性问题** ([Issue #5045](https://github.com/agentscope-ai/QwenPaw/issues/5045))
  - **现象**：框架内置的 PAT 工具名包含点号（如 `pat.batch_plan`），被对正则校验严格的 DeepSeek API 拒绝调用。
- **钉钉发送空卡片** ([Issue #5057](https://github.com/agentscope-ai/QwenPaw/issues/5057) | **已有修复 PR**：[PR #5061](https://github.com/agentscope-ai/QwenPaw/pull/

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*