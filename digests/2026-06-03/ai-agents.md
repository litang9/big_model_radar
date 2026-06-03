# OpenClaw 生态日报 2026-06-03

> Issues: 424 | PRs: 500 | 覆盖项目: 11 个 | 生成时间: 2026-06-03 03:44 UTC

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

# OpenClaw 项目动态日报 (2026-06-03)

> **数据来源**: [openclaw/openclaw](https://github.com/openclaw/openclaw) | **分析周期**: 过去 24 小时

## 1. 今日速览

OpenClaw 项目在过去 24 小时内保持了**极高的社区活跃度与开发迭代速度**。项目共处理了 **424 条 Issue 动态**（新开/活跃 271 条，关闭 153 条）以及 **500 条 PR 动态**（已合并/关闭 108 条，待合并 392 条），吞吐量巨大。

尽管今日**无新版本发布**，但开发者与社区正集中火力解决核心架构（如 SQLite 迁移、会话状态管理）和多渠道（Telegram、飞书、Slack）接入的深层次问题。当前项目处于功能快速扩张与历史债务清理并行的阶段，部分旧版本升级带来的回归问题引发了较多用户反馈。

## 2. 版本发布

**无**。今日未发布新的正式版本或 Beta 版本。

## 3. 项目进展

尽管没有发版，主分支合并了大量关键修复与架构改进，为下一次发版打下基础：

*   **防止历史数据静默丢失**: PR [#89065](https://github.com/openclaw/openclaw/pull/89065) 被合并，修复了当会话文件头部损坏时，系统会静默清空整个对话历史的严重问题。
*   **多渠道接入优化**: 
    *   飞书渠道取得重要进展，合并了初始化运行时修复 ([#89689](https://github.com/openclaw/openclaw/pull/89689))，并持续推进限流重试 ([#89659](https://github.com/openclaw/openclaw/pull/89659)) 和主题会话队列隔离 ([#89687](https://github.com/openclaw/openclaw/pull/89687))。
    *   Telegram 渠道修复了持久化会话中上下文重复注入的问题 ([#87626](https://github.com/openclaw/openclaw/pull/87626))。
*   **GitHub Copilot 兼容性**: 修复了通过 GitHub Copilot 使用 GPT/o 系列模型时，由于重放加密推理内容导致的 400 错误 ([#79176](https://github.com/openclaw/openclaw/pull/79176))。
*   **前端体验修复**: 针对 WebChat 流式文本消失的顽疾，合成了关键修复 PR [#89530](https://github.com/openclaw/openclaw/pull/89530)。

## 4. 社区热点

今日社区讨论最热烈的问题集中在**会话管理、模型调用异常**及**升级导致的回归**上：

*   **Session 找不到导致消息丢失** ([#52875](https://github.com/openclaw/openclaw/issues/52875)): 评论数高达 21 条。升级到 3.22 版本后，主 Agent 无法联系其他 Agent（`session_list` 失效），严重影响了多 Agent 协作。
*   **底层 SQLite 迁移架构讨论** ([#88838](https://github.com/openclaw/openclaw/issues/88838)): 评论 17 条。维护团队与社区正在讨论通过“抽象分支”技术，将核心会话/记录运行时状态平滑迁移至 SQLite，避免高风险的大规模重写。
*   **OpenAI gpt-5-nano 参数不支持** ([#63918](https://github.com/openclaw/openclaw/issues/63918)): 评论 17 条。Cron 任务向 `gpt-5-nano` 发送了不支持的 `thinking=none` 参数导致 400 报错，暴露了模型兼容性处理的漏洞。
*   **Windows UI 严重退化** ([#67035](https://github.com/openclaw/openclaw/issues/67035)): 评论 14 条。4.14 版本后，Windows 端 Web UI 出现输入文字被吞、流式回复不可见等严重影响体验的回归。

## 5. Bug 与稳定性

当前系统在快速迭代中暴露出部分稳定性风险，特别是状态管理和各平台客户端表现：

### 🔴 严重级别 (P1 / 核心功能受损)
*   **内存泄漏导致网关 OOM** ([#55334](https://github.com/openclaw/openclaw/openclaw/issues/55334)): `sessions.json` 无限增长导致网关崩溃。*(暂无修复 PR)*
*   **Codex Turn 完成停滞** ([#88312](https://github.com/openclaw/openclaw/issues/88312)): 5.27 版本回归，导致多工具 Agent 转向失败。
*   **Telegram 消息重复轰炸** ([#86519](https://github.com/openclaw/openclaw/issues/86519)): 5.20 版本更新后，Agent 在 Telegram 中回复重复 2-10 次。
*   **Slack 消息静默丢弃** ([#80715](https://github.com/openclaw/openclaw/issues/80715)): 运行时显示成功，Transcript 有记录，但实际消息未发送至 Slack。*(已提交初步修复 PR)*
*   **ACP 父会话死锁** ([#52249](https://github.com/openclaw/openclaw/issues/52249)): 等待子任务完成时，父会话卡死直到刷新。*(暂无修复 PR)*

### 🟠 一般级别 (P2 / 安全与体验)
*   **私有网络访问控制** ([#39604](https://github.com/openclaw/openclaw/issues/39604)): 安全相关，请求增加 `web_fetch` 允许访问私有/内部网络的配置项。
*   **Android 推送事件丢失** ([#79552](https://github.com/openclaw/openclaw/issues/79552)): WebSocket 握手完成前发送事件导致通知丢失。

## 6. 功能请求与路线图信号

从近期的 Feature 请求与 PR 进展来看，项目的演进方向如下：

*   **记忆系统 (RAG) 深度优化**: 社区希望提升记忆检索的准确度。PR [#89584](https://github.com/openclaw/openclaw/pull/89584) 正在引入可选的交叉编码器重排阶段，以替代目前仅基于词汇的 MMR 多样性排序。
*   **UI 定制化与交互改善**: 
    *   针对 WebUI 左侧面板占用空间过大的问题，请求增加折叠按钮 ([#84216](https://github.com/openclaw/openclaw/issues/84216))。
    *   针对实时语音，社区希望增加更多真实声音选项及移动端桥接支持 ([#76952](https://github.com/openclaw/openclaw/issues/76952))。
*   **底层插件与 Hook 扩展**: 正在增加模型故障转移和终端失败的 Plugin hooks ([#70990](https://github.com/openclaw/openclaw/pull/70990))，以及消息路由前的拦截 Hook ([#81061](https://github.com/openclaw/openclaw/issues/81061))。

## 7. 用户反馈摘要

通过对 Issue 提问的分析，真实用户痛点主要聚焦于以下几个方面：
1.  **升级恐惧症**: 多个高热度 Issue 反映了近期几次大版本升级（如 4.14, 5.20, 5.27）引发了严重的 UI 渲染和消息投递回归，导致部分用户不得不回退版本（如 #86047 回退至 5.12）。
2.  **静默失败极其折磨人**: 用户特别反感“看起来成功但实际没发生”的 Bug。例如 Slack 消息不发送但 transcipt 正常 ([#80715](https://github.com/openclaw/openclaw/issues/80715))，以及记忆文件被静默删除 ([#84882](https://github.com/openclaw/openclaw/issues/84882))。这大大增加了调试难度。
3.  **对多模型切换的容错期望高**: 随着用户配置复杂的 fallback chain（如 GPT-5.5 -> DeepSeek-V4），当主提供商 Quota 耗尽时不能自动平滑切换引发了强烈不满 ([#85103](https://github.com/openclaw/openclaw/issues/85103))。

## 8. 待处理积压

以下高价值/高风险 Issue 长期缺乏决定性修复或维护者介入，需提请关注：

*   🔴 **[#60841](https://github.com/openclaw/openclaw/issues/60841) [Bug]: 嵌入式 Cron 运行中核心工具被过滤**: 涉及安全策略与权限机制的冲突，标记为 `source-repro` 且长期未决。
*   🔴 **[#55334](https://github.com/openclaw/openclaw/issues/55334) [Perf]: sessions.json 导致 OOM**: 影响生产环境长期稳定性的核心问题，目前仍无针对性的 Fix PR。
*   🟡 **[#86519](https://github.com/openclaw/openclaw/issues/86519) [Bug]: Telegram 消息连续重复发送**: 该 P1 级别回归问题虽在后续版本有所缓解，但仍未彻底修复，标记为 `needs-info`，亟待开发团队复现并定位。

---

## 横向生态对比

以下是为您整理的 2026 年 6 月 3 日个人 AI 助手与自主智能体开源生态横向对比分析报告：

---

### 📊 2026-06-03 AI 智能体开源生态横向对比分析报告

#### 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于**从“单体对话”向“多模态、多端协同与复杂任务编排”跨越的深水区**。项目普遍在经历功能快速扩张后，进入了底层架构重构（如重写运行时、引入 MCP 协议）与偿还技术债务的并行期。同时，**多模型兼容（尤其是国产模型与前沿模型的适配）和本地/私有化部署的稳定性**成为决定项目能否在生产环境落地的核心分水岭。

#### 2. 各项目活跃度对比
*注：数据基于过去 24 小时的 GitHub 公开动态估算，健康度综合考量了 Issue 积压、回归Bug频率及社区响应速度。*

| 项目名称 | Issues 动态 | PRs 动态 | Release 情况 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 424 (新开/活跃 271) | 500 (待合并 392) | 无 | 🟡 **中高** (吞吐量巨大，但面临严重的升级回归和历史债务问题) |
| **CoPaw** | 36 (关闭 20) | 31 (关闭 10) | 即将发布 v1.1.11b1 | 🟢 **高** (解决率高达 55%，研发与社区诉求高度对齐) |
| **IronClaw** | 30 | 50 (关闭 31) | 无 | 🟡 **中** (处于重构深水区，底层架构变动引发大量边界 Bug) |
| **NanoBot** | 9 | 25 (关闭 17) | 无 | 🟢 **高** (社区响应极快，架构解耦稳步推进) |
| **PicoClaw** | 3 | 14 (关闭 6) | v0.2.9-nightly | 🟢 **高** (聚焦底层打磨，错误处理机制完善) |
| **LobsterAI** | 0 | 9 (关闭 6) | 无 | 🟢 **高** (内部研发高度集中，聚焦性能与多模态优化) |
| **NanoClaw** | ~1 | 4 (关闭 4) | 无 | 🟢 **高** (聚焦安全与底层插件化，工程健壮性高) |
| **EasyClaw** | 0 | 0 | v1.8.24 - v1.8.27 (4版) | 🟢 **高** (闭源式/静默高频发版，垂直场景跑得极快) |
| **TinyClaw / ZeptoClaw**| 0 | 0 | 无 | ⚪ **静默** (过去 24 小时无活动) |

#### 3. OpenClaw 在生态中的定位
作为生态的**“参照系”与“重型企业级底座”**，OpenClaw 展现出了明显的规模化特征：
*   **优势：** 生态体量与社区吞吐量断层领先（单日近千条动态），多渠道接入（Telegram/Slack/飞书）覆盖面最广，具备复杂的多 Agent 协作（ACP 父子会话）和长期记忆（RAG 重排）能力。
*   **技术路线差异：** 与其他项目轻盈的架构不同，OpenClaw 正在进行笨重但必要的“底层迁移”（如 SQLite 抽象分支），以解决海量会话状态的管理问题。
*   **对比隐忧：** 相比 NanoBot 和 CoPaw 的敏捷，OpenClaw 陷入了“大项目病”的阵痛——频繁的版本升级导致了严重的 UI 和网关回归（如内存泄漏、静默丢数据），用户甚至产生了“升级恐惧症”。

#### 4. 共同关注的技术方向
从多项目的并发演进中，可以清晰地看到当前 AI 工业界的共同技术焦点：
*   **多模型兼容与路由降级：** **[OpenClaw, PicoClaw, IronClaw, CoPaw]** 随着模型百花齐放（GPT-5.5, Claude Opus 4.7, DeepSeek-v4, MiniMax, Qwen），系统不再能硬编码 OpenAI 的参数格式。各家都在紧急修复因 `temperature`、`thinking` 或特定前缀参数不支持而导致的 400 错误，并强化模型故障转移（Fallback）机制。
*   **MCP (Model Context Protocol) 集成与稳定性：** **[NanoBot, LobsterAI, IronClaw, NanoClaw]** 将 AI 接入外部工具的 MCP 协议正在快速普及，但稳定性成为痛点。NanoBot 和 IronClaw 均报告了 MCP 会话随机断开或死循环的问题，优化 MCP 的鉴权、多实例并发和生命周期管理是当前的共同命题。
*   **多渠道与国内 IM 深度集成：** **[OpenClaw, CoPaw, NanoBot, LobsterAI]** 纯 Web 端已经无法满足需求，向微信、企微、钉钉、QQ、飞书的反向接入是刚需，且各家都在攻坚 IM 端的会话隔离、限流重试和消息防丢失机制。
*   **长上下文与记忆管理：** **[OpenClaw, NanoBot, PicoClaw, CoPaw]** 为了节省 Token 成本，智能体系统正在密集引入上下文压缩、历史记录摘要和轻量级 RAG（如 NanoBot 的本地 Embedding），以解决长对话导致的崩溃或“失忆”。

#### 5. 差异化定位分析
*   **OpenClaw：** 定位全能型企业级网关，适合需要极高定制化和多端部署的极客与团队，但需承受较高的维护成本。
*   **NanoBot：** 定位学术与极客友好的全能型框架，架构解耦优雅（如 Dream 模块重构），WebUI 交互创新（如对话分支 Fork），适合 AI 研究者和高级开发者。
*   **CoPaw (QwenPaw)：** 深度绑定国内大模型（Qwen）与国内 IM 生态（微信/企微），发力安全与本地化文件系统操作，是国内个人用户“开箱即用”的强力竞争者。
*   **IronClaw：** 走前沿创新路线（WASM 工具包、安全门控、子代理），处于激烈的 Reborn 重构期，适合关注前沿架构的开发者。
*   **PicoClaw：** 偏向底层的高性能路由引擎（从 Goroutine 泄露修复可推测其并发模型），适合作为二次开发的核心组件。
*   **LobsterAI / EasyClaw：** 具有强烈的垂直行业属性。LobsterAI 聚焦国内办公协同与客户端，而 EasyClaw 则是完全垂直于**电商客服 SaaS** 场景的特化版本。

#### 6. 社区热度与成熟度
*   **快迭代与质量巩固并行（NanoBot, CoPaw, PicoClaw）：** 这三个项目社区反馈迅速，Bug 修复往往在当天或短期内完成闭环，处于健康的上升期，正将重心从“功能添加”转向“架构优化与体验打磨”。
*   **大规模阵痛期（OpenClaw, IronClaw）：** 社区热度极高，但被底层重构拖累。IronClaw 的核心开发者甚至在单日密集提交了十余个底层审计 Issue；OpenClaw 则饱受静默 Bug 和 OOM 的困扰，面临用户信任考验。
*   **静默的高效产出（LobsterAI, EasyClaw）：** 社区看似冷清（无公开 Issue/评论），但代码提交和版本发布极为密集，表明其由核心团队强管控，主要服务于特定商业目标或内部业务线。

#### 7. 值得关注的趋势信号
1.  **“静默失败”是当前 AI Agent 最大的体验杀手：** OpenClaw 和 NanoBot 均暴露出系统“看似成功但未执行”的问题（如 Slack 消息静默丢弃、Agent 历史被静默清空）。**建议开发者：** 在构建智能体时，必须为工具调用和消息流转增加显式的回执校验和可观测性日志，摒弃“假定 API 一定成功”的思维。
2.  **长尾模型适配成本激增：** 旗舰模型（如 Claude Opus, GPT-5）的参数规格变动（如弃用 temperature）正在引发向下不兼容的雪崩。**建议开发者：** 在构建 LLM Provider 层时，应采用“Capabilities Manifest（能力清单）”的设计，根据模型动态剔除不支持的参数，而非写死全局参数。
3.  **智能体开发框架正在“数据库化”：** OpenClaw 向 SQLite 迁移、NanoBot 重构 Gateway、PicoClaw 优化会话存储，都表明单靠内存或简单文件（如 `sessions.json`）已无法支撑长时序、多并发的智能体运行。引入 WAL 日志、状态机和轻量级嵌入式数据库将是下一代 Agent 框架的标配。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

**NanoBot 项目动态日报 - 2026年06月03日**

作为 AI 智能体与个人 AI 助手领域的开源项目分析师，根据 NanoBot (github.com/HKUDS/nanobot) 过去 24 小时的 GitHub 活动数据，为您生成今日的项目动态分析。

### 1. 今日速览
NanoBot 项目在过去 24 小时内展现了**极高的社区活跃度与健康的迭代节奏**。项目共处理了 25 个 Pull Requests（其中 17 个已合并/关闭，合入率达 68%），以及 9 个 Issue 更新。从合并的 PR 来看，项目正在密集推进**多渠道支持（QQ、Email）、WebUI 交互优化以及底层架构重构（如 Dream 模块与 Gateway 解耦）**。整体而言，项目处于高速且稳健的进化期，社区贡献极为踊跃。

### 2. 版本发布
**无新版本发布。**（鉴于当前有大量高质量 PR 刚刚合入主干，推测项目正在为下一个较大版本的发布进行积蓄和稳定测试）。

### 3. 项目进展
今日共有 17 个 PR 被合并或关闭，项目在多渠道接入、记忆检索和架构健壮性上迈出了重要一步：
*   **渠道增强**：
    *   **Napcat (QQ) 渠道支持**：合并了 [#4146](https://github.com/HKUDS/nanobot/pull/4146)，正式支持基于 OneBot v11 的 QQ 私聊与群组聊天接入。
    *   **Email 附件支持**：[#4160](https://github.com/HKUDS/nanobot/pull/4160) 和 [#4162](https://github.com/HKUDS/nanobot/pull/4162) 为邮件渠道增加了发送媒体文件附件的能力，并引入了大小限制与优雅降级机制。
*   **核心与底层架构**：
    *   **轻量级 RAG 记忆检索**：[#4109](https://github.com/HKUDS/nanobot/pull/4109) 引入了基于本地 Embedding 的轻量级 RAG，大幅提升了 Agent 长期记忆的召回能力。
    *   **Dream 模块重构**：[#3990](https://github.com/HKUDS/nanobot/pull/3990) 移除了旧的两阶段 Dream 类，替换为更简洁的 cron + `process_direct` 循环。
    *   **WebUI Gateway 依赖拆分**：[#4115](https://github.com/HKUDS/nanobot/pull/4115) 将 HTTP 路由从 WebSocket 中成功剥离，提升了网关层的可维护性。
*   **Bug 修复与体验优化**：
    *   修复了 `read_file` 大文本卸载后的恢复死循环问题 ([#4155](https://github.com/HKUDS/nanobot/pull/4155))。
    *   WebUI 体验全面升级，包括修复路由刷新状态丢失 ([#4150](https://github.com/HKUDS/nanobot/pull/4150))、侧边栏排序逻辑 ([#4151](https://github.com/HKUDS/nanobot/pull/4151)) 以及启动时 Fetch 请求的死锁超时 ([#4157](https://github.com/HKUDS/nanobot/pull/4157))。

### 4. 社区热点
今日围绕 API 兼容性与配置管理的讨论最为集中，反映了用户在**多模型适配**和**部署工具链**上的强烈诉求：
*   **OpenAI 兼容 API 的图片生成限制**：[#4167](https://github.com/HKUDS/nanobot/issues/4167) 报告了使用 Agnes AI 等不完全兼容 OpenAI 所有参数的 API 时会报错的问题。结合同日提出的 [#4132](https://github.com/HKUDS/nanobot/issues/4132)，可以看出社区迫切希望 NanoBot 能解绑对特定 Provider 的硬编码依赖。
*   **`uv` 工具链兼容性风波**：由于 NanoBot 在 `uv tool` 环境下通过 WebUI 安装 pip 插件会报错（[#4158](https://github.com/HKUDS/nanobot/issues/4158)），瞬间引发了社区的关注，并迅速产生了两个修复 PR：[#4159](https://github.com/HKUDS/nanobot/pull/4159) 和更底层的 [#4164](https://github.com/HKUDS/nanobot/pull/4164)，展现了社区极快的响应速度。

### 5. Bug 与稳定性
今日报告的 Bug 主要集中在 MCP（Model Context Protocol）连接和并发处理上：
*   **高危 - MCP 服务连接随机断开**：[#4168](https://github.com/HKUDS/nanobot/issues/4168) 指出 Streamable MCP server 在运行一段时间后会报 `Session terminated`，只能通过重启解决。当前**尚在待确认阶段，暂无对应 Fix PR**。
*   **高危 - 并发写入导致 Cursor 重复分配**：[#4081](https://github.com/HKUDS/nanobot/issues/4081) 指出 `MemoryStore.append_history()` 在高并发下可能产生游标冲突，该 Issue 今日已被关闭，推测已通过底层代码提交修复。
*   **中危 - uv 环境下 WebUI pip 安装失败**：[#4158](https://github.com/HKUDS/nanobot/issues/4158)，**已有修复 PR** ([#4164](https://github.com/HKUDS/nanobot/pull/4164))。
*   **中危 - Agent 上下文丢失**：[#4169](https://github.com/HKUDS/nanobot/pull/4169) 修复了由于 `last_consolidated` 偏移量越界导致智能体会话历史被清空的严重问题。

### 6. 功能请求与路线图信号
从现有的 Open PR 和 Issue 中，可以窥见项目近期的演进路线图：
*   **子智能体能力下放**：[#4166](https://github.com/HKUDS/nanobot/issues/4166) 请求让 `spawn()` 产生的子智能体能够继承并访问父级的 MCP 工具。这是向**多智能体协同**迈进的明确信号。
*   **云平台原生部署支持**：PR [#4139](https://github.com/HKUDS/nanobot/pull/4139) 正在为 HuggingFace Spaces 和 ModelScope 添加零配置的第一方部署层，表明项目正在大幅降低用户的云端上手门槛。
*   **WebUI "Fork" 分支对话功能**：[#4163](https://github.com/HKUDS/nanobot/pull/4163) 正在增加类似 ChatGPT 的 "Fork from here" 功能，允许用户从历史消息分叉继续对话，这将极大增强 WebUI 端的调试和交互体验。

### 7. 用户反馈摘要
*   **痛点 - 连接稳定性与参数兼容**：用户在使用非官方或小众模型 API（如 Agnes AI）时，对 NanoBot 强校验特定参数（如 `response_format`）感到困扰（[#4167](https://github.com/HKUDS/nanobot/issues/4167)）。同时，MCP 作为高级功能，其连接的稳定性（容易 Session terminated）是当前用户最头疼的问题。
*   **痛点 - Token 消耗优化**：用户在 [#4142](https://github.com/HKUDS/nanobot/issues/4142) 中深入讨论了针对 DeepSeek v4 等具有缓存机制的模型，如何优化 "cache miss" Token 的成本问题。
*   **满意 - 迭代速度**：针对 #4158 的 Bug，当天就有贡献者提交修复方案，显示出社区对解决工具链兼容问题的积极态度和项目的良好氛围。

### 8. 待处理积压
*   **Notion MCP 连接问题**：[#1168](https://github.com/HKUDS/nanobot/issues/1168) 自 2026 年 2 月底被提出后，至今仍未得到有效解决或官方回复。大量用户有将 NanoBot 接入 Notion 的需求，建议维护者优先排期跟进此问题。
*   **MCP 连接断开排查**：今日新增的 [#4168](https://github.com/HKUDS/nanobot/issues/4168) 涉及底层的 SSE/WS 连接生命周期管理，若无稳定复现方案可能影响企业级长期运行的稳定性，需保持关注。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# 📊 PicoClaw 项目动态日报 (2026-06-03)

> **数据来源**: [sipeed/picoclaw](https://github.com/sipeed/picoclaw) | **分析周期**: 过去 24 小时

## 1. 📈 今日速览
PicoClaw 项目今日保持着高度活跃的开发节奏，共有 **14 个 PR 更新**和 **3 个 Issue 更新**，并发布了最新的 **v0.29 Nightly 构建**。项目核心团队与社区贡献者今天集中攻克了底层稳定性难题，包括修复会导致内存泄漏的 Goroutine 问题、完善多 LLM 提供商（如智谱、OpenAI、Claude）的兼容性，以及优化 Web UI 的会话历史加载逻辑。整体来看，项目正处于 v0.2.9 版本发布前的密集打磨阶段，代码健康度与错误处理机制得到了显著增强。

## 2. 🚀 版本发布
- **[nightly] Nightly Build `v0.2.9-nightly.20260603.a502aa7f`**
  - **详情**: 这是基于 main 分支的自动化每日构建版本。
  - **包含更新**: 涵盖了今日合并的所有 LLM 重试机制、会话管理修复及提供商错误分类代码。
  - **注意事项**: 作为 Nightly 版本，官方提示可能存在不稳定性，建议开发者和深度测试者使用，生产环境请谨慎升级。
  - **完整变更日志**: [v0.2.9...main](https://github.com/sipeed/picoclaw/compare/v0.2.9...main)

## 3. 🛠 项目进展
今日共有 6 个 PR 被合并或关闭，显著提升了系统的鲁棒性和错误处理能力：

- **核心架构与稳定性提升**:
  - [Merged] [#2991 fix(agent): retry transient LLM HTTP errors](https://github.com/sipeed/picoclaw/pull/2991): 重构了 LLM 请求的重试逻辑，统一处理超时/网络错误及 HTTP 500 暂态错误，大幅增强了 Agent 在无可用模型回退时的容错能力。
  - [Merged] [#2986 fix(tools): add Stop() to SessionManager](https://github.com/sipeed/picoclaw/pull/2986): 修复了后台清理 Goroutine 无法关闭导致内存泄漏的关键问题。
- **提供商与渠道兼容性**:
  - [Merged] [#2989 fix(providers): add Zhipu API error code 1210](https://github.com/sipeed/picoclaw/pull/2989): 识别智谱 API 特有的错误码，确保触发回退机制而非直接阻断。
- **会话与 UI 修复**:
  - [Merged] [#2992 fix(session): skip main-session alias](https://github.com/sipeed/picoclaw/pull/2992): 修复了升级 v0.2.9 后新建 Web UI 会话错误挂载旧历史记录的回归 Bug。

## 4. 🔥 社区热点
- **[最高讨论度] [#2404 Add in config to send streaming HTTP request](https://github.com/sipeed/picoclaw/issues/2404)** (👍 1, 💬 10)
  - **分析**: 该 Issue 创建于 4 月，今日再次活跃。用户强烈呼吁在配置文件中直接支持 `"streaming": true` 以控制发往后端的 HTTP 请求方式。长达 10 条的评论表明，在 AI 智能体接入不同后端时，流式请求的配置灵活性是开发者高度关注的核心痛点。
- **[最新协议增强] [#2984 Add explicit turn completion signal](https://github.com/sipeed/picoclaw/issues/2984)** (👍 1)
  - **分析**: 外部 WebSocket 客户端开发者提出，当前仅依靠 `typing.stop` 等事件无法准确判断 Agent 是否完全处理完毕，要求增加明确的回合结束信号。这反映出 PicoClaw 正在被越来越多地作为底层 Engine 集成到复杂的第三方 UI 或客户端中。

## 5. 🐛 Bug 与稳定性
今日报告并处理了大量兼容性及逻辑 Bug，整体稳定性正在修复中快速上升：

1. **[已修复] 微信渠道调用智谱 GLM-5 视觉 API 报错 (HTTP 1210)**
   - **关联 Issue**: [#2943](https://github.com/sipeed/picoclaw/issues/2943) | **修复 PR**: [#2989](https://github.com/sipeed/picoclaw/pull/2989)
   - **严重程度**: 高（阻断特定渠道的多模态交互）。
2. **[已修复] v0.2.9 版本会话历史记录错误覆盖**
   - **关联 PR**: [#2992](https://github.com/sipeed/picoclaw/pull/2992)
   - **严重程度**: 高（导致用户在 Web UI 开新会话时看到旧消息）。
3. **[待合并] Claude Opus 4-7 模型请求报 HTTP 400**
   - **关联 PR**: [#2948](https://github.com/sipeed/picoclaw/pull/2948) (状态: Open)
   - **详情**: 新版 Claude 模型弃用了 `temperature` 参数，当前版本直接发送会导致 API 报错。
4. **[待合并] Web UI 仅显示最后一条历史消息**
   - **关联 PR**: [#2990](https://github.com/sipeed/picoclaw/pull/2990) (状态: Open)
   - **详情**: `readJSONLSession()` 错误使用了 `meta.Skip` 导致多轮对话历史只显示最后一条。

## 6. 🗺 功能请求与路线图信号
- **工具链与可观测性增强**: PR [#2945 (picoclaw-tracer)](https://github.com/sipeed/picoclaw/pull/2945) 提出增加一个独立的 Web UI 调试追踪器，用于实时渲染每轮 LLM 的 System Prompt、上下文、工具调用等细节。这预示着项目正在为开发者准备更强大的 Debug 套件，可能成为下个小版本的重点特性。
- **配置与阈值透明化**: PR [#2988](https://github.com/sipeed/picoclaw/pull/2988) 与 PR [#2985](https://github.com/sipeed/picoclaw/pull/2985) 均致力于优化上下文压缩阈值的配置与显示，说明 Agent 的长文本记忆管理（上下文窗口控制）正在成为下一步优化的核心。

## 7. 🗣 用户反馈摘要
- **真实痛点 - 参数兼容性**: 用户在使用 OpenAI 兼容 API 和最新版 Claude 模型时，频繁遇到因 PicoClaw 发送了不兼容参数（如 `web_search_preview` 类型或 `temperature`）而导致的 400 错误。用户期望项目能对各家 API 的独特限制做更细致的“屏蔽”或“适配”。
- **真实痛点 - 上下文丢失**: 用户对 Web UI 会话历史的异常（如挂载旧历史、仅显示最新消息）反馈敏锐，这直接影响了多轮对话的连贯性体验。
- **使用场景**: 从数据中可以看出，大量用户正在将 PicoClaw 作为核心路由网关，同时对接微信渠道与多家国内外大模型（智谱 GLM、Claude、OpenAI 等），多模态（图片处理）的高可用性是刚需。

## 8. ⚠️ 待处理积压
以下重要 Issue/PR 被标记为 `[stale]` 或长期待合并，建议维护团队关注：

1. **[PR] [#2951 fix: use function-type web_search](https://github.com/sipeed/picoclaw/pull/2951)** - 修复 OpenAI 端点 Web 搜索工具类型兼容性，目前处于 Stale 状态，影响部分搜索插件的使用。
2. **[PR] [#2948 fix: skip temperature parameter for claude-opus-4-7](https://github.com/sipeed/picoclaw/pull/2948)** - 影响 Anthropic 最新旗舰模型的使用，亟待 Review 合并。
3. **[PR] [#2239 modify docker compose with privileged](https://github.com/sipeed/picoclaw/pull/2239)** - Docker 部署相关的改进，已停滞两个月。
4. **[Issue] [#2404 Add in config to send streaming HTTP request](https://github.com/sipeed/picoclaw/issues/2404)** - 高讨论度（10条评论）的配置功能请求，停滞较久，建议官方给出明确的规划回应。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下是为您生成的 2026 年 6 月 3 日 NanoClaw 项目动态日报：

# 📊 NanoClaw 项目动态日报 (2026-06-03)

## 1. 今日速览
过去 24 小时内，NanoClaw 项目保持了稳健的开发节奏，整体活跃度较高。团队与社区贡献者今天共处理了 **4 个 Pull Requests（已合并/关闭）**，并留下了 2 个待合并的修复 PR。项目本日的重心明显偏向于**底层安全加固、架构优化与运行时稳定性提升**，其中包括一项存在了近两个月的插件系统核心架构 PR 落地，以及一个针对容器环境的关键安全漏洞（CWE-78）修复。今日未发布新版本，项目处于功能整合与代码审查阶段。

## 2. 版本发布
**无新版本发布。** 
*(注：当前项目可能正在积累功能特性与 Bug 修复，预计待正在 Open 状态的 PR 合并后将触发新版本打包。)*

## 3. 项目进展
今日共有 4 个重要的 PR 被关闭（通常会合入主分支），标志着项目在以下方面取得实质性进展：
*   **安全防御机制增强：** PR [#2538](https://github.com/nanocoai/nanoclaw/pull/2538) 成功合入，修复了容器构建过程中的 OS 命令注入漏洞，极大提升了平台作为 AI 智能体运行时的安全性。
*   **插件化架构落地：** 存在近 3 个月之久的特性 PR [#1193](https://github.com/nanocoai/nanoclaw/pull/1193) 终于关闭。该 PR 引入了宿主侧的 `onStartup/onShutdown` 插件钩子系统，意味着 NanoClaw 向“可扩展 AI 助手平台”迈出了关键一步。
*   **渠道生态扩充：** PR [#2069](https://github.com/nanocoai/nanoclaw/pull/2069) 关闭，为系统新增了 Webchat (v1) 技能支持，丰富了智能体的接入渠道。
*   **运行时可观测性与规范性：** PR [#2674](https://github.com/nanocoai/nanoclaw/pull/2674) 合入，标准化了长时间运行的任务状态消息，增加了内部通道守卫以防止消息死循环，提升了系统在复杂任务下的鲁棒性。

## 4. 社区热点
今日社区互动数据相对平淡，Issues 与 PR 的评论数均为 0，反映出代码审查可能在其他渠道进行，或当前处于静默合并期。
*   **唯一的新增讨论：** Issue [#2673](https://github.com/nanocoai/nanoclaw/issues/2673) 提出了一个“自动化学生成绩 grading 系统”的设想。虽然该 Issue 的内容看似由 Video Prompt 生成，但它反映了社区对于将 NanoClaw 运用于**垂直教育场景**（结合移动端、数据处理）的探索意愿。

## 5. Bug 与稳定性
今日报告及修复的 Bug 主要涉及底层运行机制和兼容性，按优先级排列如下：

*   **[严重] 容器构建命令注入风险 (已修复)：** 
    *   关联 PR：[#2538](https://github.com/nanocoai/nanoclaw/pull/2538)
    *   详情：在 `container-runner` 构建镜像时，未经过滤的包名可能导致 OS 命令注入 (CWE-78)。目前已在合入的代码中增加了输入验证。
*   **[中等] Codex 提供商 MCP 兼容性与代理网络问题 (待合并)：** 
    *   关联 PR：[#2672](https://github.com/nanocoai/nanoclaw/pull/2672) [OPEN]
    *   详情：MCP 配置未对齐主干版本的 `stdio | http | sse` 联合类型，且在代理环境下仅使用 HTTP 传输时存在问题。
*   **[低] CLI 平台 ID 错误命名空间问题 (待合并)：** 
    *   关联 PR：[#2187](https://github.com/nanocoai/nanoclaw/pull/2187) [OPEN]
    *   详情：CLI 渠道被错误地应用了与其他消息渠道相同的命名空间逻辑，此 PR 对其进行了 carve-out 修复。
*   **[低] 运行时消息自我触发死循环 (已修复)：** 
    *   关联 PR：[#2674](https://github.com/nanocoai/nanoclaw/pull/2674)
    *   详情：缺少内部通道防护导致运行时状态消息可能触发自我循环，已随状态机标准化一并修复。

## 6. 功能请求与路线图信号
结合今日的动态，可以窥见 NanoClaw 接下来的演进方向：
1.  **高度可定制的宿主环境：** 插件系统 ([#1193](https://github.com/nanocoai/nanoclaw/pull/1193)) 的合并信号极其明显，下一阶段项目可能会推出插件市场或提供更详尽的 PluginContext API 文档，鼓励开发者在 AI 启动前后注入长驻服务。
2.  **对 MCP (Model Context Protocol) 的深度支持：** 修复 PR [#2672](https://github.com/nanocoai/nanoclaw/pull/2672) 表明项目正在积极适配最新的 MCP 传输协议（支持 stdio/http/sse 多通道），这是当前 AI Agent 走向工具化标准化的必经之路。

## 7. 用户反馈摘要
从今日有限的 Issue 数据 ([#2673](https://github.com/nanocoai/nanoclaw/issues/2673)) 中提炼：
*   **使用场景多样化：** 用户（或自动化测试机器人）正在尝试用极细致的场景（如巴布亚新几内亚的课堂移动端阅卷）来测试平台的视觉和多模态处理能力。
*   **痛点隐现：** 虽无直接抱怨，但 PR 中频繁出现的 "MCP config compatibility" 和 "self-loops" (死循环) 提示，当前开发者在将 NanoClaw 接入复杂的代理网络或配置多工具调用时，可能会遇到配置兼容性壁垒。

## 8. 待处理积压
*   **长期悬挂的修复 PR：** 由 @alex-shepel 提交的 PR [#2187](https://github.com/nanocoai/nanoclaw/pull/2187)（修复 CLI 平台 ID 命名空间）自 5 月 2 日创建以来已超过一个月，且无评论。虽然是一个小修补，但仍需维护者关注以避免积压。
*   **新提交的关键修复 PR：** PR [#2672](https://github.com/nanocoai/nanoclaw/pull/2672) 涉及底层 Codex 提供商的网络与配置兼容性修复，对部署在网络受限环境（如企业代理后方）的用户至关重要，建议列为近期优先 Review 事项。

--- 
*分析结论：NanoClaw 项目今日在底层架构（插件化）和安全底线（防注入）上做了极好的夯实，整体表现出良好的工程健康度。建议维护者尽快清理当前处于 Open 状态的两个 Bug fix PR，随后进行一次版本发布以沉淀最近的重大架构变更。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

以下是为您生成的 **IronClaw** 项目 2026-06-03 日报。整体来看，项目正处于“Reborn”架构的重构深水区与多模型适配的密集修复期，代码活动度极高，但也暴露出一定的稳定性挑战。

---

# 📊 IronClaw 项目动态日报 (2026-06-03)

## 1. 今日速览
过去 24 小时内，IronClaw 项目展现了**极高的研发活跃度**，共产生 50 个 PR 更新（其中 31 个已合并/关闭）和 30 个 Issue 更新。
项目当前的重心明确分为两线：一是核心团队正在密集推进 **"Reborn" 架构的重构**（涵盖安全加固、子代理、触发器与生命周期管理），修复了大量底层凭据与 OAuth 问题；二是 QA 与社区提交了大量针对 **多模型兼容性（特别是 Qwen3.6、MiniMax 和 Claude Opus）的 Bug**，暴露出 Engine v2 在处理非 OpenAI 系模型时的边界情况亟待修复。

## 2. 版本发布
**今日无新版本发布。** 考虑到目前有大量关于 `[reborn-loop]` 和 `[reborn-subagent]` 的底层重构 Issue 刚刚提出，预计核心团队正在为下一个较大版本（可能是 v0.29.0）积累底层代码。

## 3. 项目进展
今日共有 31 个 PR 被合并或关闭，项目在底层能力、OAuth 凭据安全和 UI 交互上取得了实质性进展：
*   **安全与凭据修复**：
    *   修复了 Notion 和 Gmail 的 OAuth 鉴权问题，为 Reborn WebUI 接入了 Notion DCR OAuth，并修复了 Gmail 的 scopes 缺失问题（[#4345](https://github.com/nearai/ironclaw/pull/4345), [#4346](https://github.com/nearai/ironclaw/pull/4346), [#4347](https://github.com/nearai/ironclaw/pull/4347)）。
*   **LLM 兼容性提升**：
    *   修复了 Codex ChatGPT 导致的空响应问题，优化了 SSE 解析逻辑（[#4371](https://github.com/nearai/ironclaw/pull/4371)）。
*   **数据与 UI 修复**：
    *   修复了 WebUI v2 中待处理消息的回显问题，通过基于身份的去重机制代替文本匹配（[#4336](https://github.com/nearai/ironclaw/pull/4336)）。
    *   修复了本地开发环境下 Reborn memory 挂载失效的问题（[#4357](https://github.com/nearai/ironclaw/pull/4357)）。
    *   增加了 `memory_search` 查询的别名兼容性（如 `q`, `text`）（[#4374](https://github.com/nearai/ironclaw/pull/4374)）。

## 4. 社区热点
虽然今日评论数最多的 PR 未显示具体评论数量，但从核心开发者的提交密集度来看，热点集中在**底层架构的拆解与辩论**上：
*   **核心开发者 @henrypark133 密集提交架构审计 Issue**：今天一口气提交了超过 10 个关于 `[reborn-loop]` 和 `[reborn-subagent]` 的深度架构优化 Issue（如 [#4358](https://github.com/nearai/ironclaw/issues/4358) 到 [#4368](https://github.com/nearai/ironclaw/issues/4368)）。这些 Issue 聚焦于代理循环的取消传播、预算准确性、持久化等核心挑战，是当前项目最核心的技术演进方向。
*   **QA 集中反馈特定模型兼容性**：@joe-rlo 提交了多个针对 Qwen3.6-35B 的测试报告（[#4340](https://github.com/nearai/ironclaw/issues/4340), [#4341](https://github.com/nearai/ironclaw/issues/4341) 等），引发了关于 Engine v2 对不同推理模型容错能力的关注。

## 5. Bug 与稳定性
今日新增大量 Bug 报告，主要集中在**多模型适配**和**前端状态管理**，按严重程度排序如下：

**严重 - 核心功能不可用：**
*   **Claude Opus 4.7/4.8 无法使用**：由于 IronClaw 强制发送 `temperature` 参数，导致 Anthropic 最新模型直接报 400 错误。（[#4334](https://github.com/nearai/ironclaw/issues/4334)）
*   **MCP 集成驱动失败**：使用 Qwen3.6 模型时，即使激活了 Notion/GitHub 扩展，也无法实际调用。（[#4343](https://github.com/nearai/ironclaw/issues/4343)）

**中等 - 影响用户体验与前端渲染：**
*   **思考过程暴露与卡死**：Qwen3.6-35B 模型的 `<think)` CoT 过程被直接暴露给用户，且经常卡在 "thinking" 状态无响应。（[#4341](https://github.com/nearai/ironclaw/issues/4341)）
*   **消息镜像回放**：加载期间，Agent 会将用户的消息当作自己的回复发出来（例如用户发 "hey"，机器人回复 "hey"）。（[#4344](https://github.com/nearai/ironclaw/issues/4344)）
*   **鉴权弹窗死锁**：鉴权模态框在刷新页面后依然存在，导致用户无法继续聊天。（[#4342](https://github.com/nearai/ironclaw/issues/4342)）

**较低 - 边界校验错误：**
*   **MiniMax 模型工具调用被拒**：尽管 schema 有效，但 MiniMax-M2.7 的有效工具调用被错杀为 `InvalidInvocation`。（[#4339](https://github.com/nearai/ironclaw/issues/4339)）
*   **内容为空校验误报**：提交消息时偶尔触发 `Content field blank` 验证错误。（[#4340](https://github.com/nearai/ironclaw/issues/4340)）

*(注：目前上述 Bug 暂未看到直接的 Fix PR，可能需要社区和核心团队介入诊断。)*

## 6. 功能请求与路线图信号
从今日的动态中可以解读出项目下一步的重点演进方向：
*   **深度集成 GitHub WASM 能力**：Issue [#3806](https://github.com/nearai/ironclaw/issues/3806) 重新启动，计划在 Extension-v2 基线就绪后，将 GitHub 作为首个具体的 WASM 工具包引入能力目录，这意味着 IronClaw 将具备更强大的原生代码仓库操作能力。
*   **企业级安全与审计合规**：随着 PR [#4372](https://github.com/nearai/ironclaw/pull/4372) 和 PR [#4373](https://github.com/nearai/ironclaw/pull/4373) 的推进，项目正在引入 HTTP 凭据零化清理和子代理安全门控，为商业化/企业级部署做准备。
*   **WebUI v2 视觉与多模态增强**：PR [#4315](https://github.com/nearai/ironclaw/pull/4315) 正在修复 Engine v2 的视觉附件支持，将确保图片能正确作为 `image_url` 传递给 LLM。

## 7. 用户反馈摘要
*   **模型切换的困惑**：用户 @sunglow666 反馈，在 NEAR AI provider 下，`/model` 命令返回的展示名（如 `OpenAI GPT-5`）无法直接用于切换模型，存在 UI 展示与底层 API 标识符脱节的痛点。（[#4377](https://github.com/nearai/ironclaw/issues/4377)）
*   **开源/非标模型体验较差**：用户在使用 Qwen 或 MiniMax 等开源或非主流模型时，遇到了大量由于格式适配不完善（如 CoT 解析、工具调用格式差异）导致的问题，表明长尾模型的兼容性是目前用户流失的潜在风险点。

## 8. 待处理积压
*   **持续失败的 E2E 测试**：由 GitHub Bot 提交的 Nightly E2E 测试失败问题（[#4108](https://github.com/nearai/ironclaw/issues/4108)）自 5月27日 以来一直未得到修复，持续报告 v2-engine 流水线失败，建议维护者优先

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# 📊 LobsterAI 项目动态日报 (2026-06-03)

> **数据来源**: [netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI) | **分析周期**: 过去 24 小时

## 1. 今日速览
在过去 24 小时内，LobsterAI 项目的核心开发者主要聚焦于**功能迭代与系统稳定性优化**。项目呈现出“高提交、零issue”的单向推进状态：共有 9 个 Pull Requests 发生状态变更（6 个顺利合入主干，3 个处于待合并状态），但未收到新开或关闭的 Issue，且无新版本发布。从合并的 PR 来看，团队正在重点攻坚 AI 智能体的底层通信协议（MCP）性能瓶颈、完善国内主流大模型（MiniMax）的多模态接入，并持续打磨 IM 多实例管理及前端 UI 体验。整体而言，项目处于健康且高度活跃的内部研发阶段。

## 2. 版本发布
*   **无新版本发布** (最近 24 小时内)。

## 3. 项目进展
今日共有 6 个 PR 顺利合并/关闭，显著提升了多模态支持、MCP 启动性能及前端 UI 表现：

*   **🤖 多模态能力修复**: 修复了 MiniMax-M3 模型无法发送图片的问题。此前由于沿用了旧版本的硬编码，导致图片输入被禁用。([#2093](https://github.com/netease-youdao/LobsterAI/pull/2093) - 已合并)
*   **⚡️ 核心性能优化**: 重构了 `npx` 启动 MCP (Model Context Protocol) 的解析逻辑，前置包解析与本地安装，避免了每次会话的“慢启动”冷启路径；同时增加了首次响应计时日志以便后续排查。([#2091](https://github.com/netease-youdao/LobsterAI/pull/2091) - 已合并)
*   **🗑️ 协同管理增强**: 支持在会话侧边栏批量删除 Subagent（子智能体）会话，并优化了网关清理的并发与重试限制，防止系统压力过载。([#2095](https://github.com/netease-youdao/LobsterAI/pull/2095) - 已合并)
*   **🎨 UI/UX 体验打磨**: 优化了分享成功弹窗的信息层级，移除冗余标识，统一视觉块。([#2094](https://github.com/netease-youdao/LobsterAI/pull/2094) - 已合并)
*   **📦 系统整洁度**: 隐藏了 OpenClaw 内部/运行时捆绑的插件 ID，防止用户在插件管理中误操作。([#2096](https://github.com/netease-youdao/LobsterAI/pull/2096) - 已合并)
*   **✨ Artifacts 功能演进**: 合并了 5.28 周期的大型功能分支，涉及主进程、渲染层及文档的全面更新。([#2092](https://github.com/netease-youdao/LobsterAI/pull/2092) - 已合并)

## 4. 社区热点
*   **讨论与互动冷清，静默开发中**：过去 24 小时内，所有相关的 PR 和 Issue 均未有新增评论（`comments: 0`）和表情互动（`reactions: 0`）。虽然缺乏显性的社区讨论，但核心贡献者（如 @btc69m979y-dotcom, @liugang519）保持了高密度的代码提交，显示出明确的内部研发规划。

## 5. Bug 与稳定性
今日无通过 Issue 新报告的 Bug，但核心开发者主动修复了以下隐性 Bug 与稳定性隐患：

*   **【中度】MCP 启动卡死隐患**：应用重启或中断留下的 `installing` 状态记录会导致 MCP 配置永久卡住。现已加入自动重试与恢复机制。([#2091](https://github.com/netease-youdao/LobsterAI/pull/2091) - Fix Merged)
*   **【中度】IM 多实例冲突隐患**：钉钉、飞书、QQ 等多实例 IM 机器人此前未做重名校验，可能导致同名机器人重复处理消息甚至冲突。已提交 PR 增加实例名和凭证 ID 的重复校验。([#1464](https://github.com/netease-youdao/LobsterAI/pull/1464) - Fix Pending)
*   **【轻度】模型能力配置错误**：MiniMax-M3 实际已支持图片输入，但代码中被错误配置为 `supportsImage: false`。([#2093](https://github.com/netease-youdao/LobsterAI/pull/2093) - Fix Merged)

## 6. 功能请求与路线图信号
结合目前处于 OPEN 状态的待合并 PR，可以洞察出项目接下来的演进方向：

*   **跟进最新大模型迭代**：PR [#388](https://github.com/netease-youdao/LobsterAI/pull/388) 正在将 MiniMax 默认模型升级至最新的 M3，并剔除 M2/M1 等老旧模型。表明项目在积极跟进国内外大模型的快速迭代。
*   **底层架构 Electron 升级**：自动依赖机器人开启了将 Electron 从 v40.2.1 升级至 v42.3.1 的大版本跨越 PR ([#1277](https://github.com/netease-youdao/LobsterAI/pull/1277))，这意味着客户端底层架构即将迎来一次重要更新，可能会带来性能和内存管理的提升。

## 7. 用户反馈摘要
*   由于今日 Issues 动态为 0，暂无法提取直接的终端用户反馈。
*   **研发端痛点洞察**：从 PR 提交的改动可以看出，针对国内复杂的 IM 生态（多平台、多账号并存）和本地 MCP 通信的延迟问题，是目前实际应用场景中影响用户体验的核心阻力，团队正在精准发力解决这些问题。

## 8. 待处理积压
以下长期未彻底推进的 PR 需要维护团队重点关注，以免阻碍后续功能的发布：

1.  **[长期滞留] MiniMax M3 默认模型升级**：[#388](https://github.com/netease-youdao/LobsterAI/pull/388) 创建于 **2026-03-12**，距今已近 3 个月，目前仍处于 OPEN 状态，建议结合今日已合并的 M3 多模态修复（[#2093]）尽快完成评审并合入。
2.  **[长期滞留] 底层依赖大版本升级**：[#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) (Electron 升级) 创建于 **2026-04-02**，距今 2 个月。由于涉及底层框架大版本跃迁，需要重点进行回归测试，建议社区或核心成员排期跟进。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

这份 **CoPaw (QwenPaw) 项目动态日报** 基于 2026-06-03 的 GitHub 数据生成，聚焦项目活跃度、社区诉求及研发进展。

---

### 1. 今日速览
今日 CoPaw (QwenPaw) 项目保持**极高的社区活跃度与研发迭代速度**。过去 24 小时内，项目共处理了 **36 条 Issue**（其中 20 条已关闭，解决率高达 55%）和 **31 条 PR**（10 条已合并/关闭）。项目当前的重心明显聚焦于**渠道连通性修复（特别是微信/企业微信/元宝）、系统安全加固以及上下文压缩机制的优化**。虽然今日无正式 Release 版本发布，但 `v1.1.11b1` 的版本号更新 PR 已合入，预示着新测试版即将到来。整体来看，项目处于**健康且快速演进**的阶段。

---

### 2. 版本发布
- **正式版**：过去 24 小时无新版本发布。
- **测试版信号**：PR [#4907](https://github.com/agentscope-ai/QwenPaw/pull/4907) 已将版本号提升至 `v1.1.11b1`，这意味着包含多项安全修复与渠道优件的 Beta 版即将与用户见面。

---

### 3. 项目进展
今日合并/关闭的 PR 显著提升了系统的稳定性和安全性，项目在以下方向取得了实质性推进：
- **安全漏洞大规模修补**：社区安全研究员 @YLChen-007 提交的多个高危漏洞（如 API 鉴权绕过、路径遍历等）已被确认并关闭，相关修复正在合入主线。
- **渠道连通性修复**：
  - 修复了定时任务（Cron）消息无法推送到微信/企业微信的严重问题 [PR #4883](https://github.com/agentscope-ai/QwenPaw/pull/4883)，直接回应了 Issue [#4878](https://github.com/agentscope-ai/QwenPaw/issues/4878)。
  - 修复了企业微信频道的会话隔离验证问题 [PR #4850](https://github.com/agentscope-ai/QwenPaw/pull/4850)。
- **Windows 端体验优化**：合入了 Windows 启动性能优化（懒加载与缓存）[PR #4772](https://github.com/agentscope-ai/QwenPaw/pull/4772)，以及支持在 Coding 模式下浏览所有磁盘驱动器的修复 [PR #4906](https://github.com/agentscope-ai/QwenPaw/pull/4906)。
- **底层架构升级**：处理了非标准 Provider 参数（如 DashScope 的 `enable_search`）的透传问题 [PR #4689](https://github.com/agentscope-ai/QwenPaw/pull/4689)。

---

### 4. 社区热点
今日讨论最热烈的问题集中在**消息推送失败**与**底层模型调用的兼容性**上：
- **🔥 定时任务微信推送失效**：Issue [#4878](https://github.com/agentscope-ai/QwenPaw/issues/4878)（5 条评论）。用户在配置定时任务推送到微信时遭遇拦截。这反映了用户将 Agent 深度集成到日常 IM（如微信）作为个人助理的强烈诉求。
- **🛡️ API 接口未授权访问**：Issue [#4908](https://github.com/agentscope-ai/QwenPaw/issues/4908)（4 条评论）。语言设置接口暴露导致的全局配置篡改风险引发了高度关注。
- **🧠 DeepSeek 推理长上下文崩溃**：Issue [#3985](https://github.com/agentscope-ai/QwenPaw/issues/3985)（4 条评论）。使用 DeepSeek 模型进行多轮工具调用时，因 `reasoning_content` 未回传导致 HTTP 500。这说明大量用户正将 CoPaw 用于深度复杂任务。
- **💻 Windows 客户端体验限制**：Issue [#4893](https://github.com/agentscope-ai/QwenPaw/issues/4893)（4 条评论）。关于本地文件上传不应受限的讨论，体现了用户对“本地个人助理”与“服务器部署”在架构设计上的不同期待。

---

### 5. Bug 与稳定性
按严重程度排列，今日报告的关键 Bug 如下：

**🔴 严重 (P0)**
- **上下文压缩机制崩溃**：Issue [#4924](https://github.com/agentscope-ai/QwenPaw/issues/4924)。在执行历史消息 compact 时报错 `'str' object has no attribute 'get'`，导致上下文无法正常压缩。这不仅会引发报错，还可能导致后续 Token 消耗失控。（*目前未见直接 Fix PR，需高度关注*）。
- **文件权限引发的持续性拒绝服务**：Issue [#4922](https://github.com/agentscope-ai/QwenPaw/issues/4922)。通过微信让 Agent 读取本地图片因 `PermissionError` 失败后，陷入持续报错的死循环，即使用户清空会话也无法恢复。

**🟠 高 (P1)**
- **MCP 工具名校验导致模型调用失败**：Issue [#4918](https://github.com/agentscope-ai/QwenPaw/issues/4918)。MCP 工具名包含 `.` 时（如 `pat.batch_plan`），GPT-5.5 等严格校验的模型会直接报错。
- **浏览器工具启动失败**：Issue [#4919](https://github.com/agentscope-ai/QwenPaw/issues/4919

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

以下是为您生成的 **EasyClaw** 项目 2026-06-03 动态日报。

---

# 📊 EasyClaw 项目动态日报 (2026-06-03)

**项目地址**: [github.com/gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw)

## 1. 🌟 今日速览
EasyClaw 本日呈现出“核心团队高频发版、社区端静默观望”的典型开发状态。在过去的 24 小时内，项目连续发布了 **4 个迭代版本（v1.8.24 - v1.8.27）**，展现出极高的内部开发活跃度，重点聚焦于桌面端电商体验优化与客服系统稳定性提升。与此同时，GitHub 公开的 Issues 和 Pull Requests 更新数均为 0，表明今日无新增的公开社区讨论或外部代码贡献。整体而言，项目正处于功能快速打磨和排雷阶段，工程推进速度健康。

## 2. 🚀 版本发布
今日项目迎来了密集的小版本迭代，主要针对电商平台和桌面客户端进行了重要修复与体验升级。无已知的破坏性变更，但建议依赖该项目的用户尽快升级至 `v1.8.27` 以避免潜在的脏数据问题。详细更新如下：

*   **[v1.8.27: RivonClaw v1.8.27](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.27)**
    *   **重点修复**: 将 `shop-update` 中的空字段视为无操作，防止意外清除现有的电商商店详细信息（**建议高优升级**）。
    *   **优化**: 同联调后端契约，优化了有效载荷省略可选值时的处理逻辑；放宽了客服平台的追赶资格限制。
*   **[v1.8.26: RivonClaw v1.8.26](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.26)**
    *   **体验优化**: 改进桌面端欢迎流程和身份验证入口，帮助新卖家更快进入设置路径。
    *   **国际化**: 针对支持的面板语言，本地化了电商区域和聊天示例预设。
    *   **底层强化**: 改善了中国区依赖项的配置，强化了客服升级机制。
*   **[v1.8.25: RivonClaw v1.8.25](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.25)**
    *   **OAuth 优化**: 返回完整的 OAuth 商店数据载荷，使桌面应用能够立即刷新连接状态。
    *   **并发处理**: 修复了多个商店同时完成授权时，多商店 OAuth 事件突发的可靠性问题。
*   **[v1.8.24: RivonClaw v1.8.24](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.24)**
    *   **新特性**: 增加了桌面端公告和邀请码 UI。
    *   **新手引导**: 优化新用户电商设置路径（包含默认客户端更新、预设商店技能和刷新的聊天示例）。

## 3. 🛠️ 项目进展
今日无公开的 PR 合并或关闭记录（待合并: 0，已合并/关闭: 0）。然而，结合单日发布 4 个版本的情况来看，核心开发工作主要在项目内部的保护分支或通过直接提交的方式完成。项目整体在 **多店铺 OAuth 授权状态同步**、**新用户 Onboarding（新手引导）流程** 以及 **客服调度系统容错** 等维度取得了实质性的向前迈进。

## 4. 💬 社区热点
本日无公开的活跃 Issues 或 PRs。社区讨论处于静默期。*(注：如果您在使用中有任何疑问，欢迎前往 [Issues 页面](https://github.com/gaoyangz77/easyclaw/issues) 发起讨论)*。

## 5. 🐛 Bug 与稳定性
尽管今日没有用户提交新的 Bug 报告，但开发团队在发版中主动修复了几个影响稳定性的关键问题。按严重程度评估如下：

1.  **[高危] 数据安全性修复 (v1.8.27)**：修复了空字段导致电商商店配置被误清空的隐患。
2.  **[中危] 授权与调度稳定性 (v1.8.25)**：修复了客服调度 RPC 超时时的重试机制，以及多店铺并发 OAuth 授权的突发处理。
3.  **[中危] 工作流容错 (v1.8.24)**：修复了客服 Airflow 重试调度的问题。
4.  **状态**: 以上 Bug 均已在今日的最新版本中提供修复，无需等待额外的 Fix PR。

## 6. 🗺️ 功能请求与路线图信号
今日无用户新增的功能请求。但从近期的发版信号来看，**EasyClaw 正在积极拓展其作为“电商 AI 助手/客服”的边界**：
*   **邀请码与公告系统 (v1.8.24)**：暗示项目可能在筹备闭门测试或商业化订阅模式。
*   **中国区依赖优化 (v1.8.26)**：表明团队正在大力改善国内开发者的部署体验，可能将中国市场作为重点发力方向。

## 7. 📣 用户反馈摘要
由于今日暂无活跃的 Issue 评论，暂无法提炼直接的社区声音。但 Release Notes 中多次提及“改善新用户设置路径”、“桌面端应用刷新状态”，侧面反映出前期可能收到过关于“新手配置繁琐”或“授权状态不同步”的隐性反馈，并已在今日得到全面解决。

## 8. 📂 待处理积压
截至今日，暂无明确标记为“长期未响应”的公开 Issue 或 PR。建议项目维护者在接下来的高频迭代中，持续关注 GitHub 里程碑的规划，并鼓励外部贡献者在提交 PR 前先与团队对齐发版计划。

---
*分析师注：今日数据呈现典型的“Bulid in silence（静默构建）”特征，项目健康度极高，代码产出稳定。建议持续关注其后续版本的 OAuth 及 AI 技能预设的演进。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*