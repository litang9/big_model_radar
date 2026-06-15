# OpenClaw 生态日报 2026-06-15

> Issues: 500 | PRs: 500 | 覆盖项目: 11 个 | 生成时间: 2026-06-15 03:55 UTC

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

以下是 OpenClaw 开源项目 2026-06-15 的动态日报。作为专注于 AI 智能体与个人助手领域的开源项目分析，本期报告重点聚焦了项目在多渠道接入、会话稳定性以及大模型供应商适配方面的最新进展。

---

# 🪶 OpenClaw 项目动态日报 (2026-06-15)

## 1. 今日速览
OpenClaw 今日保持着极高的社区活跃度与工程迭代速度。过去 24 小时内，项目处理了高达 500 条的 Issue 更新（其中 427 条新开或活跃）以及 500 条 PR 更新（84 个被合并或关闭），并发布了全新的 **`v2026.6.8-beta.1`** 版本。从整体数据来看，项目的核心痛点依然集中在 5 月下旬（`v2026.5.20+`）版本引入的会话状态冲突（如 `EmbeddedAttemptSessionTakeoverError`）以及 Telegram/WhatsApp 等渠道的消息重复与丢失问题上。值得注意的是，开发者对大模型 API（特别是 DeepSeek、Anthropic、MiniMax）的缓存失效和调度异常表现出高度敏感。

## 2. 版本发布
### 🚀 [v2026.6.8-beta.1](https://github.com/openclaw/openclaw/releases)
- **核心亮点**：大幅增强了 Telegram 和 WhatsApp 渠道的消息投递能力，使其支持更丰富的结构化富文本（包括表格、列表、可展开的引用块）。
- **功能改进**：
  - 引入了保留提示词的 CLI 后端投递机制。
  - 退役了原生草稿迁移逻辑。
  - 设定了更安全的富媒体投递边界，降低了消息发送时的崩溃率。

## 3. 项目进展
今日共有 84 个 PR 被合并或关闭，项目在底层网关健壮性、多渠道适配以及 Agent 测试方面取得了实质性进展：
- **会话与投递健壮性修复**：合并了 [PR #93137](https://github.com/openclaw/openclaw/pull/93137)（修复 iMessage 禁用回复动作失效）、[PR #93014](https://github.com/openclaw/openclaw/pull/93014)（修复 Telegram `ERR_MODULE_NOT_FOUND` 导致的死信重试问题）以及 [PR #93117](https://github.com/openclaw/openclaw/pull/93117)（修复 Anthropic 控制面板启动事件后思考块恢复重试失效）。
- **定时任务安全性**：[PR #92318](https://github.com/openclaw/openclaw/pull/92318) 被关闭/合入，强制 Cron 任务在确认投递目标时需要提供显式的消息工具目标证据，防止模型自欺欺人地认为“已发送”。

## 4. 社区热点
今日讨论度最高的 Issue 集中在**底层网关性能**与**大模型调度异常**上：
- **[Issue #85888](https://github.com/openclaw/openclaw/issues/85888)** (👍x1, 评论x12)：Cron 任务在北京时间清晨 05:00-07:30 持续触发 MiniMax 503 过载错误，但同一时间手动触发却能成功。社区高度怀疑 OpenClaw 内部的调度与并发队列机制在面临特定时间段 API 限流时存在盲区。
- **[Issue #86508](https://github.com/openclaw/openclaw/issues/86508)** (👍x4, 评论x9)：Discord 频道运行时频发 `EmbeddedAttemptSessionTakeoverError`。多位开发者表示在 5.20+ 版本后，会话锁的释放与文件更改之间存在严重的竞态条件。
- **[Issue #84516](https://github.com/openclaw/openclaw/issues/84516)** (👍x2, 评论x11)：通过 Codex app-server (gpt-5.5) 无头模式调用的 Agent 回复会在 1000-1100 字符处被静默截断。由于缺乏明确的报错（`stop=null`），用户几乎无法察觉上下文的丢失。

## 5. Bug 与稳定性
今日报告的严重 Bug（Regression 回归与崩溃）较多，按影响面排列如下：
- **🔴 [P0] 记忆数据静默丢失**：[Issue #84882](https://github.com/openclaw/openclaw/issues/84882) 指出，`memory-core` 的 Dreaming 流水线在执行 `normalized recall artifacts` 时，会静默删除用户的每日记忆文件 (`memory/YYYY-MM-DD.md`)，属于极其严重的数据毁坏 Bug。
- **🟠 [P1] 会话状态隔离失效导致全局阻塞**：[Issue #84903](https://github.com/openclaw/openclaw/issues/84903) 暴露了一个致命缺陷——单个 Agent 会话的卡顿（由于锁竞争挂起）会阻塞整个 Gateway 的事件循环，导致其他所有 Agent 停止处理消息。
- **🟠 [P1] 消息重复大爆发**：[Issue #86519](https://github.com/openclaw/openclaw/issues/86519) 报告自 5.20 更新后，Telegram 渠道针对用户的一条消息会重复回复 2-10 次（[Issue #

---

## 横向生态对比

以下是基于 2026-06-15 各开源项目动态生成的横向对比分析报告。

# 2026-06-15 AI 智能体与个人助手开源生态横向分析报告

## 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于**从“基础功能构建”向“工程化深水区与安全合规”演进的关键阶段**。各项目不再满足于简单的 LLM 对话封装，而是全面转向多渠道通信网关、多 Provider 解耦以及复杂上下文/定时任务的管理。随着 Agent 获得越来越大的系统权限，**安全性（沙箱隔离、权限绕过）和多线程会话稳定性（防阻塞、防静默截断）已成为全行业的核心痛点**，标志着智能体生态正在经历安全与成熟度的双重考验。

## 2. 各项目活跃度对比
今日（2026-06-15）各主要项目的数据表现与健康状况呈现出明显的分层：

| 项目名称 | Issue 动态 | PR 动态 | Release 情况 | 健康度与活跃度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | ~500 | ~500 (84合并) | `v2026.6.8-beta.1` | 🟢 **极高** (流量巨大，但存在 P0 级数据丢失风险) |
| **NanoBot** | 活跃 | 46 (27合并) | 无 | 🟢 **高** (架构解耦顺利，WebUI 迭代密集) |
| **Zeroclaw** | 42 (28关闭) | 50 (4合并) | 无 | 🟢 **稳健** (收尾率极高，聚焦底层重构与安全) |
| **IronClaw** | 42 | 45 (15合并) | 无 | 🟢 **高** (开启 AI 原生自举研发，迭代快速) |
| **CoPaw** | 24 (18新开) | 16 (5合并) | 无 | 🟠 **警戒** (Tauri 迁移与内存泄漏引发广泛痛点) |
| **NanoClaw** | 7 | 10 (5合并) | 无 | 🔴 **高风险** (爆发 3 个严重安全漏洞，亟待修复) |
| **PicoClaw** | 一般 | 5 合并 | `v0.2.9-nightly`| 🟡 **平缓** (专注代码除锈与工程化清理) |
| **LobsterAI** | 2 | 5 | 无 | 🟡 **低** (功能演进缓慢，社区 PR 严重积压) |
| **TinyClaw / 等**| 0 | 0 | 无 | ⚪ **静默** (无活动) |

## 3. OpenClaw 在生态中的定位
作为生态的**流量王者与事实标准锚点**，OpenClaw 今日处理的 Issue 和 PR 数量（均达 500 量级）远超其他单一项目，展现了庞大的用户基盘与社区势能。
*   **技术路线差异**：OpenClaw 高度聚焦于**复杂环境下的通信网关健壮性**（如 Telegram 富文本边界、iMessage/WhatsApp 消息防丢失、死信重试）。而其他项目多处于“功能补齐”或“架构重构”阶段。
*   **核心优势**：拥有极强的多渠道分发能力与高度活跃的贡献者群体，版本迭代周期极短（已发布 6 月内第三个 Beta 版）。
*   **当前挑战**：伴随高并发而来的系统级故障影响巨大，如全局事件循环阻塞（#84903）和极其严重的记忆数据静默删除 Bug（#84882）。OpenClaw 正面临“大而不稳”的工程化挑战。

## 4. 共同关注的技术方向
跨项目分析显示，以下技术诉求已成为行业共识：
1.  **大模型 Provider 的动态解耦与无缝切换**：不再绑定单一模型。
    * *涉及项目*：NanoClaw（接入 Codex）、IronClaw（上下文感知渠道）、NanoBot（修复 Anthropic 参数废弃）。
2.  **IM 渠道的容错与富媒体渲染**：
    * *涉及项目*：OpenClaw（修复 Telegram/WhatsApp 重复与截断）、PicoClaw（解耦外部渠道注册）、CoPaw（集成企微/飞书）。
3.  **Agent 权限收敛与执行安全审计**：
    * *涉及项目*：NanoClaw（修复本地文件窃取）、IronClaw（修复 Shell 授权绕过）、Zeroclaw（发起气隙隔离执行模式提案）。
4.  **MCP (Model Context Protocol) 生态的深度集成**：
    * *涉及项目*：PicoClaw（探索 HTTP/SSE MCP 集成）、IronClaw（修复 MCP 授权恢复异常）、NanoBot（引入基于 MCP 的沙箱工具开关）。

## 5. 差异化定位分析
*   **OpenClaw / Zeroclaw**：定位于**重型通信网关与后端 Hub**。重点解决多端消息分发的高可用性、并发防阻塞以及企业级部署的安全（如 Zeroclaw 的全量 Docker 镜像与气隙隔离）。
*   **NanoBot / CoPaw**：定位于**轻量级 WebUI/桌面端代理中心**。重点优化本地体验，如 NanoBot 专注移动端响应式与配置解耦，CoPaw 专注本地桌面端与各种国产大模型/Kimi 等的兼容。
*   **NanoClaw / IronClaw**：定位于**前沿多智能体架构探索**。IronClaw 专注于自身代码库的 AI 自举研发（用 AI 写 AI），而 NanoClaw 则在探索本地容器化、CLI 工具链数据驱动等极客向功能。
*   **LobsterAI**：定位于**重度生产力桌面工作台**。强调 Artifact（多格式文档预览）、防系统休眠等长任务挂机体验。

## 6. 社区热度与成熟度
*   **狂飙突进期（OpenClaw, NanoBot）**：处于新功能密集上线、PR 合并率极高的阶段。社区发声热烈，但同时伴随阻塞性的严重 Bug 回归，系统处于动态平衡。
*   **质量巩固与重构期**：
    *   **Zeroclaw / PicoClaw**：今日重点均在清理技术债、重构底层 I/O 与配置系统，Issue 收尾率高，代码质量在稳步爬升。
*   **危机与挑战期**：
    *   **NanoClaw**：遭遇白帽黑客集中火力攻击，安全防线告急。
    *   **CoPaw**：因底层架构（转 Tauri）带来严重的性能退化，面临用户信任危机。
    *   **LobsterAI**：核心 PR 严重 stale（过期），社区贡献者流失风险极高。

## 7. 值得关注的趋势信号
对于 AI 智能体开发者与架构师，今日的社区动态释放了以下强烈信号：
1.  **“静默失败”是当前最大的体验杀手**：无论是 OpenClaw 的记忆流水线删库（#84882）、Codex 的字符截断，还是 NanoClaw 的预算耗尽静默掉线（#2751），行业亟需建立完善的 **LLM 可观测性与异常熔断机制**。
2.  **“AI 红队测试”成为基础设施刚需**：NanoClaw 和 IronClaw 今日爆出多个权限绕过漏洞（如通过包装器伪造危险命令、本地路径未校验）。随着 Agent 获得 `shell` 和文件写权限，传统的 Web 安全防御模型已不够用，**沙箱隔离（如气隙模式）与工具调用强校验**将成为下一阶段的核心技术壁垒。
3.  **“AI 吃自己的狗粮”进入工程化落地**：IronClaw 发起的“AI 原生工程团队”计划（自动化 PR 审查、预览部署）是一个极其强烈的行业信号。**利用自身 Agent 参与开源项目的研发流水线**，将成为验证智能体复杂任务执行能力的最佳试金石。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

这是一份基于 2026-06-15 GitHub 数据生成的 NanoBot 项目动态日报。

# NanoBot 项目动态日报 (2026-06-15)

## 1. 今日速览
NanoBot 项目在今日展现出极高的开发活跃度与系统重构趋势。过去 24 小时内项目处理了高达 46 项 PR 更新（其中 27 项被合并或关闭），表明项目正处于密集的架构优化与功能迭代阶段。核心开发者（如 @chengyongru）主导了大量关于 WebUI 适配、系统稳定性提升及配置架构解耦的改进。今日虽无新版本发布，但针对多渠道（飞书、Telegram）体验和 Agent 自动化任务执行的实质性修复，预示着项目正在为下一个大版本进行高质量的代码储备。

## 2. 版本发布
**无**。今日（0个）新版本发布。当前项目主干分支主要聚焦于 WebUI 端与底层架构配置的整合，预计在这些 PR 完全合并后将释出新的 Release。

## 3. 项目进展
今日项目合并了大量高质量 PR，整体向前迈出了坚实的一步，主要体现在以下几个维度：
*   **架构解耦与健壮性：** 合并了打破工具配置导入循环的重构 [PR #4314](https://github.com/HKUDS/nanobot/pull/4314)，并引入了无效配置文件的快速失败机制 [PR #4275](https://github.com/HKUDS/nanobot/pull/4275)，极大提升了系统的启动稳定性。
*   **Agent 核心运行机制优化：** 实现了基于会话维度的 Prompt 历史记录隔离 [PR #4274](https://github.com/HKUDS/nanobot/pull/4274)，并将定时任务成功绑定到具体的会话上下文 [PR #4299](https://github.com/HKUDS/nanobot/pull/4299)，有效防止了不同任务间的上下文污染。
*   **WebUI 与全端体验：** 大幅改善了 WebUI 的移动端响应式布局 [PR #4339](https://github.com/HKUDS/nanobot/pull/4339)，修复了 Token 使用热力图的渲染时区问题 [PR #4248](https://github.com/HKUDS/nanobot/pull/4248)，并优化了桌面端重启时的重放断层 Bug [PR #4210](https://github.com/HKUDS/nanobot/pull/4210)。
*   **渠道网关改进：** 修复了飞书 SDK 导致的启动阻塞问题，实现了懒加载 [PR #4277](https://github.com/HKUDS/nanobot/pull/4277)。

## 4. 社区热点
尽管部分数据的显式评论数缺失，但从提交频率与 Issue 主题来看，社区当前的关注焦点集中在 **API 接口标准的合规性** 与 **多模态处理的严谨性** 上：
*   **API 用量统计缺陷：** [Issue #4309](https://github.com/HKUDS/nanobot/issues/4309) 反映了 OpenAI 兼容接口 `/v1/chat/completions` 始终返回零 Token 的问题。这触及了众多将 NanoBot 作为后端推理代理、需要依赖此数据进行计费或额度控制的开发者的核心利益。
*   **多模型 Provider 兼容危机：** [Issue #4333](https://github.com/HKUDS/nanobot/issues/4333) 指出 Anthropic 新版模型废弃了 `temperature` 参数导致请求直接报 400 错误。这类问题通常会在社区引发高度讨论，因为它是阻塞性的底层模型调用故障（该 Issue 今日已被快速 Close，推测已修复）。

## 5. Bug 与稳定性
今日报告的缺陷主要集中在多模态处理与 API 底层交互层面：
*   **[严重] 多模态降级导致文件路径泄露：** [Issue #4345](https://github.com/HKUDS/nanobot/issues/4345) 指出，当模型不支持图片输入触发降级重试（strip image）时，底层代码将本地文件路径作为文本暴露给了模型，导致模型产生幻觉并造成隐私泄露。**状态：已提交修复** [PR #4346](https://github.com/HKUDS/nanobot/pull/4346)。
*   **[高] OpenAI 兼容接口 Token 统计失效：** [Issue #4309](https://github.com/HKUDS/nanobot/issues/4309) 中接口的 usage 字段被硬编码为 0。**状态：暂无对应修复 PR**，亟待社区或维护者介入。
*   **[中] 渠道消息截断 Bug：** [Issue #4250](https://github.com/HKUDS/nanobot/issues/4250) 提到 Telegram 长消息硬截断会破坏代码块结构，目前该 Issue 已被关闭。

## 6. 功能请求与路线图信号
从近期合并的 PR 及活跃的提案中，可以捕捉到 NanoBot 下一步的演进路线：
*   **精细化工具控制与安全隔离：** 合并的 [PR #4138](https://github.com/HKUDS/nanobot/pull/4138) 增加了 `tools.file.enable` 开关。结合用户希望模型**仅**通过特定 MCP 服务器执行操作的诉求，表明项目正强化在企业级沙箱环境中的安全部署能力。
*   **大模型幻觉防御机制：** 正在审核的 [PR #4343](https://github.com/HKUDS/nanobot/pull/4343) 引入了对未知内置工具参数的严格拒绝机制。这是 Agent 架构的一个关键增强，能有效防止 LLM 生成错误参数引发系统崩溃。
*   **WebUI 全功能对齐：** [PR #4313](https://github.com/HKUDS/nanobot/pull/4313) 正在抹平 WebUI 界面与底层 `config.json` 的功能代差，未来用户将能完全依赖 WebUI 进行复杂的参数调配。

## 7. 用户反馈摘要
*   **集成痛点：** 开发者高度依赖 NanoBot 的 OpenAI 兼容网关模式，任何偏离 OpenAI 标准的返回（如 Token 计数为 0）都会直接打破第三方客户端的兼容性。
*   **即时通讯体验受损：** 在接入第三方聊天软件（如 Telegram）时，用户对 Markdown 渲染失败、代码块断裂极为敏感，这决定了 NanoBot 作为“IM �

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下是 Zeroclaw 项目 2026-06-15 的项目动态日报：

# 📊 Zeroclaw 项目动态日报 (2026-06-15)

## 1. 今日速览
2026-06-15 期间，Zeroclaw 项目保持着极高的社区活跃度与代码审查效率。过去 24 小时内共有 **42 条 Issue 更新（关闭 28 条，收尾率极高）** 及 **50 条 PR 更新**。尽管本日无新版本发布，但核心团队与社区贡献者聚焦于底层架构优化（如配置系统重构、API 改进）、通信渠道完善（如 SMS 网关群集成、Matrix 房间管理）以及多智能体安全性的深度讨论。整体而言，项目正处于快速迭代、高价值 Bug 修复与生态扩展的稳健阶段。

## 2. 版本发布
**无新版本发布。**

## 3. 项目进展
今日项目虽然合并的 PR 数量不多（已合并/关闭: 4 条），但推进了诸多核心功能的落地与重构：
*   **配置系统大重构落地**：[PR #7594](https://github.com/zeroclaw-labs/zeroclaw/pull/7594) 完成了超大型（XL）重构，引入了类型驱动的别名选择器，消除了硬编码的特殊路径处理，极大增强了配置管理底层的健壮性。
*   **定时任务控制完善**：[PR #7384](https://github.com/zeroclaw-labs/zeroclaw/pull/7384) 成功为 Web 面板的定时任务增加了“暂停/恢复”开关，补齐了数据模型早已支持但前端缺失的控制能力。
*   **网关 Bug 修复**：[PR #7664](https://github.com/zeroclaw-labs/zeroclaw/pull/7664) 修复了网关 Web 端 `ask_user` 工具因通道提前关闭而导致的严重崩溃问题。
*   **频道管理 API 扩展**：[PR #7661](https://github.com/zeroclaw-labs/zeroclaw/pull/7661) 新增了 `Channel::create_room` 和 `Channel::invite_user` 接口，并在此基础之上实现了 Matrix 频道的房间创建、邀请与端到端加密支持。

## 4. 社区热点
今日社区讨论重心主要集中在部署门槛、底层安全与多智能体架构上：
*   **[Issue #3642] 提供“全量功能”的 Docker 镜像** (13条评论)：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/3642)
    *   **诉求分析**：为了降低内存消耗，部分功能（如 WhatsApp）默认关闭。但大量非技术用户在部署时面临编译门槛，强烈呼吁官方提供包含所有特性预编译的 "full" Docker 镜像。
*   **[Issue #6808] RFC: 工作流泳道与看板自动化** (11条评论)：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)
    *   **诉求分析**：维护者 @Audacity88 发起的治理提案，旨在通过轻量级的 PR 泳道和自动化标签，减少手工维护项目看板的负担，提升协作效率。
*   **[Issue #6293] RFC: 气隙隔离执行模式** (5条评论)：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6293)
    *   **诉求分析**：高级安全场景需求，提议将 Zeroclaw 拆分为离线执行容器和在线代理守护进程，仅通过 Unix Socket 通信。这反映了 Zeroclaw 正在被应用于对数据隐私要求极高的企业级环境中。
*   **[Issue #7470] Delegate 模式安全配置阻断问题** (7条评论)：[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/7470)
    *   **诉求分析**：多智能体协同场景下的高危 Bug。当目标 Agent 的 `allowed_tools` 为空时，Delegate（委派）逻辑会错误拦截，阻塞了实际的多 Agent 业务流。

## 5. Bug 与稳定性
今日报告及处理的 Bug 集中在通道兼容性与运行时安全配置上：
*   **[S0 严重] 邮箱通道配置逻辑导致数据/安全风险**：[Issue #5528](https://github.com/zeroclaw-labs/zeroclaw/issues/5528)（已修复关闭）。此 Bug 会导致 IMAP/SMTP 配置异常失效。
*   **[S1 阻断] WhatsApp 通道不显示扫码二维码**：[Issue #6847](https://github.com/zeroclaw-labs/zeroclaw/issues/6847)（已修复关闭）。直接阻断了 WhatsApp 渠道的接入。
*   **[S

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

以下是 PicoClaw 项目 2026-06-15 的动态日报。作为开源项目分析师，基于今日获取的 GitHub 数据，为您梳理项目的整体健康状况、进展及社区动态。

---

# 📊 PicoClaw 项目动态日报 (2026-06-15)

## 1. 今日速览
PicoClaw 项目今日保持极高的开发活跃度与代码质量要求。过去 24 小时内，项目合入了 5 个关键的系统级修复与重构 PR，显著提升了底层文件系统、并发处理和日志记录的健壮性。同时，社区持续贡献高质量的架构优化提案，如外部通信渠道解耦（#3120）和远程 WebSocket 模式（#3118）。项目于今日按时发布了 `v0.2.9-nightly` 自动化构建版本，整体呈现出稳步迭代、后端稳固的前进态势。

## 2. 版本发布
- **[nightly] Nightly Build (v0.2.9-nightly.20260615.13a38bd1)**: [查看详情](https://github.com/sipeed/picoclaw/releases/tag/v0.2.9-nightly.20260615.13a38bd1)
  - **性质**: 自动化构建版本，官方提示可能存在不稳定性。
  - **覆盖范围**: 此版本包含了今日合并的各项稳定性修复（如 Agent loop panic 清理、TTS 与文件系统错误处理）。
  - **迁移注意**: 开发者提到在最新版本中，API 密钥架构已迁移至 `.security.yml`，使用旧配置文件的用户需注意检查兼容性（见 Issue #3125）。

## 3. 项目进展
今日共有 5 个 PR 被合并/关闭，主要聚焦于**系统稳定性增强与代码规范治理**：
- **🟢 Agent 核心稳定性修复**：[PR #2904](https://github.com/sipeed/picoclaw/pull/2904) 修复了 `pkg/agent` 中的重载与 panic 清理问题，移除了可能导致阻塞的独立 goroutine，改用同步恢复流程，大幅降低了死锁风险。
- **🟢 I/O 错误处理优化**：贡献者 @chengzhichao-xydt 集中清理了底层文件 I/O 与网络 I/O 中被静默丢弃的错误。
  - [PR #3124](https://github.com/sipeed/picoclaw/pull/3124): 捕获 TTS API 网络截断时的 `io.ReadAll` 错误，防止诊断信息丢失。
  - [PR #3122](https://github.com/sipeed/picoclaw/pull/3122): 修复 JSONL 记录追加写入时 `Close()` 错误被忽略的问题，防范潜在的磁盘满/NFS写入失败隐患。
- **🟢 代码规范化**：[PR #3121](https://github.com/sipeed/picoclaw/pull/3121) 将 OpenAI 兼容模块中原有的标准 `log.Printf` 替换为结构化日志，提升线上日志可追溯性。[PR #3123](https://github.com/sipeed/picoclaw/pull/3123) 规范了目录描述符的错误忽略语法。

*评估：今日的代码合并标志着 PicoClaw 正在经历一次严格的“代码除锈”与技术债清理，系统正向更成熟的工程化标准迈进。*

## 4. 社区热点
今日社区讨论与互动的重点在于**架构扩展性与工具链兼容性**：
1. **打破渠道注册耦合**：[PR #3120](https://github.com/sipeed/picoclaw/pull/3120) 提出为第三方外部渠道添加 `RegisterChannelSettings` 钩子。此举旨在让开发者无需 fork 主仓库即可接入自定义通信渠道，引发了关于插件化架构的讨论。
2. **远程 Agent 控制**：[PR #3118](https://github.com/sipeed/picoclaw/pull/3118) 引入了通过 WebSocket 远程连接 `picoclaw agent` 的新模式，极大拓宽了 Agent 的部署场景。
3. **MCP 工具链配置故障**：[Issue #3041](https://github.com/sipeed/picoclaw/issues/3041) 反映了 `mcp add` 命令错误解析全局标志，导致 HTTP/SSE 类型的 MCP 服务器添加失败，此 Bug 报告获得了较高关注。

## 5. Bug 与稳定性
根据今日最新提交的 Issues，按严重程度排列如下：
- **🔴 严重 (功能性阻断)**: [Issue #3125](https://github.com/sipeed/picoclaw/issues/3125) - `web_search` (Brave API) 工具静默失效。由于 `.security.yml` 架构更新，LLM 后台直接返回 "No results" 且无实际网络请求，严重影响了依赖联网搜索的 Agent 流程。*(暂无对应 fix PR)*
- **🟡 中等 (协议解析阻断)**: [Issue #3041](https://github.com/sipeed/picoclaw/issues/3041) - MCP CLI 参数解析 Bug (`DisableFlagParsing`)。导致通过命令行添加 HTTP/SSE 类型的 MCP 服务器中断。*(暂无对应 fix PR)*
- **🟡 中等 (权限拦截)**: [Issue #3044](https://github.com/sipeed/picoclaw/issues/3044) - Matrix 协议集成 Bug。`allow_from` 无法正确处理包含冒号的标准 Matrix 用户 ID (`@localpart:domain`)，导致合法用户消息被静默拒绝。*(暂无对应 fix PR)*
- **🟠 轻微 (前端兼容性)**: [Issue #3090](https://github.com/sipeed/picoclaw/issues/3090) - 管理面板在 iOS < 16.4 的 Safari 浏览器上无法正常工作。*(暂无对应 fix PR)*

## 6. 功能请求与路线图信号
通过分析开源 Issue 与 PR，以下方向极有可能被纳入近期主干版本：
- **插件化生态**：随着 [PR #3120](https://github.com/sipeed/picoclaw/pull/3120) 的推进，PicoClaw 正在向类似 VS Code 的“外部模块扩展”架构靠拢，第三方开发者将能更自由地扩展 Bot 渠道。
- **Agent 部署模式扩展**：[PR #3118](https://github.com/sipeod/picoclaw/pull/3118) 预示着 PicoClaw 正在探索“中心服务器 + 远程分布式 Agent”的架构，这对于多机协同和边缘计算场景是一个强烈的路线图信号。

## 7. 用户反馈摘要
从今日的 Issues 与讨论中提炼出用户的真实痛点：
- **配置迁移带来的断裂感**：用户对底层配置结构（如 `.security.yml`）的快速演进感到不适，旧版本平滑过渡到新版本时存在工具（如搜索功能）突然失效的情况，缺乏显式的报错提示。
- **IM 协议适配的细节缺失**：Matrix 用户反馈反映出 PicoClaw 在对接非标准/复杂格式的 IM 账号体系时，字符串匹配逻辑不够严谨。
- **MCP 生态的强依赖**：用户大量尝试接入各类 MCP Server (如 HTTP/SSE)，目前 CLI 工具的不稳定给进阶玩家带来了较高的挫败感。

## 8. 待处理积压
以下高价值 Issue/PR 已被标记为 `[stale]` 且未解决，需要维护团队关注：
- **[PR #2975](https://github.com/sipeed/picoclaw/pull/2975) [stale]**: `feat(telegram)` 将在群组中回复机器人消息视为 @提及。这是一个能显著提升 Telegram 群聊体验的功能，自 5 月底提交后已停滞，建议审查代码并推进合并。
- **[Issue #3044](https://github.com/sipeed/picoclaw/issues/3044) & [Issue #3041](https://github.com/sipeed/picoclaw/issues/3041)**: 涉及 Matrix 鉴权与 MCP 解析的基础性 Bug，作为稳定性阻断项，不应长期处于 stale 状态，建议团队分派优先级进行 fix。

---
*数据来源: GitHub PicoClaw Repository | 分析周期: 截至 2026-06-15*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下是 NanoClaw 项目 2026-06-15 的动态日报：

# NanoClaw 项目日报 (2026-06-15)

## 1. 今日速览
过去 24 小时内，NanoClaw 项目展现了极高的开发活跃度与社区参与度。项目共处理了 10 个 PR（其中 5 个顺利合并/关闭）和 7 个 Issue 动态。今日的核心亮点是**底层架构向多 Provider 模型的重大演进**，Codex 作为新的 Agent 提供商被成功整合。然而，伴随着系统复杂度的增加，社区与安全研究人员今日集中暴露了**多个严重的安全漏洞（本地文件窃取、权限绕过）**，安全加固已成为当前项目最紧迫的任务。

## 2. 版本发布
**本日无新版本发布。**

## 3. 项目进展
今日共有 5 个 PR 被合并或关闭，项目在架构扩展性和容器化管理上迈出了一大步：
*   **多 Provider 架构落地**：合并了 [PR #2756](https://github.com/nanocoai/nanoclaw/pull/2756) 和 [PR #2757](https://github.com/nocoai/nanoclaw/pull/2757)。这标志着 NanoClaw 从单一的默认 Provider 转向了由操作员显式选择、支持无缝切换和内存迁移的插拔式架构。Codex 作为完整的 Agent Provider（通过 OneCLI 进行仅限保险库的身份验证）成功接入宿主机能力。
*   **容器 CLI 管理数据驱动化**：合并了 [PR #2758](https://github.com/nanocoai/nanoclaw/pull/2758)。废弃了 Dockerfile 中硬编码的 CLI 安装方式，改用 `cli-tools.json` 清单文件进行数据驱动安装，极大降低了后续新增技能工具的门槛。
*   **文档修复**：关闭了 [PR #2764](https://github.com/nanocoai/nanoclaw/pull/2764) 和 [PR #2769](https://github.com/nanocoai/nanoclaw/pull/2769)，修复了 `CLAUDE.md` 中失效的文件路径，并完善了 `/add-codex` 技能的交互式身份验证步骤文档。

## 4. 社区热点
今日社区与贡献者的注意力高度集中在**安全审计**与**多 Provider 支持**两件事上：
*   **安全攻防成为焦点**：安全研究员 [@YLChen-007](https://github.com/YLChen-007) 在今日集中提交了 3 个严重的安全漏洞（[#2760](https://github.com/nanocoai/nanoclaw/issues/2760), [#2761](https://github.com/nanocoai/nanoclaw/issues/2761), [#2762](https://github.com/nanocoai/nanoclaw/issues/2762)），直击 Agent 自我修改机制和本地网关的信任边界漏洞。这表明项目已受到白帽社区的严格审视，亟需建立更严密的沙箱与鉴权机制。
*   **Codex 生态推进**：以 [@Koshkoshinsk](https://github.com/Koshkoshinsk) 和 [@omri-maya](https://github.com/omri-maya) 为代表的贡献者正在围绕新加入的 Codex Provider 快速迭代，包括抛出了关于 Codex 事件分发机制修复的 [PR #2770](https://github.com/nanocoai/nanoclaw/pull/2770)，反映了社区对扩展非 Claude 模型生态的强烈诉求。

## 5. Bug 与稳定性
按严重程度排列，今日报告的关键缺陷如下：
*   **[严重/安全] 任意本地文件窃取**：[Issue #2760](https://github.com/nanocoai/nanoclaw/issues/2760) 指出内置 MCP 工具 `send_file` 接受绝对路径且未限制读取范围，导致攻击者可窃取宿主机任意文件。
*   **[严重/安全] 本地网关审批绕过**：[Issue #2761](https://github.com/nanocoai/nanoclaw/issues/2761) 指出 Chat SDK 网关桥接的本地 Webhook 缺乏身份验证，攻击者可伪造请求绕过人工审批流程。
*   **[高危/安全] 隐藏的恶意 MCP 参数**：[Issue #2762](https://github.com/nanocoai/nanoclaw/issues/2762) 指出 `add_mcp_server` 审批流未完整展示 `args` 和 `env`，可能导致恶意 Agent 注入后门环境变量。
    * *注：针对上述安全与稳定性问题，官方已有统筹加固动作，见待合并的 [PR #2732](https://github.com/nanocoai/nanoclaw/pull/2732)。*
*   **[中危/UX] 预算耗尽导致静默掉线**：[Issue #2751](https://github.com/nanocoai/nanoclaw/issues/2751)。当触及 Token 花费上限时，Agent 会静默丢弃当前回合，用户无任何反馈，严重影响使用体验。
*   **[低危/功能] Codex 文件事件丢失**：[Issue #2770](https://github.com/nanocoai/nanoclaw/pull/2770) 提到 Codex 图片生成因未定义 `ProviderEvent` 导致文件投递中断。

## 6. 功能请求与路线图信号
结合 Issue 与已合并的 PR，可以清晰看出项目近期的演进路线图：
*   **降本增效**：[Issue #2768](https://github.com/nanocoai/nanoclaw/issues/2768) 请求在 Claude provider 中默认开启 Prompt Caching。对于拥有复杂富文本系统的 NanoClaw 而言，开启缓存将大幅削减 API 成本，预计很快会被纳入排期。
*   **废弃冗余适配层**：[Issue #2767](https://github.com/nanocoai/nanoclaw/issues/2767) 指出上游 Telegram 适配器已原生支持 MarkdownV2，NanoClaw 内部的 `telegram-markdown-sanitize.ts` 已成技术债，预计将在 channels 分支被移除。
*   **预期落地下版本的内容**：修复 Token 耗尽静默 Bug 的 [PR #2759](https://github.com/nanocoai/nanoclaw/pull/2759) 目前处于开启状态，有望在下一个 Patch 版本中合并。

## 7. 用户反馈摘要
从 Issue 讨论中可以提取出当前用户的几个核心痛点：
*   **缺乏操作反馈带来恐慌**：如 Issue #2751 中，用户在使用过程中遇到报错不提示，以为 Agent 崩溃或死机，用户强烈要求在 UI 或对话流中明确感知到系统的计费/预算阻断状态。
*   **对项目本地化集成的期望**：用户 @glifocat 在 Issue #2763 中反馈，由于文件重构导致文档指引失效（甚至对 AI 编码助手也造成了干扰），说明高频迭代下文档同步的滞后影响了开发者的接入效率。
*   **安全信任危机**：安全研究员指出的漏洞揭示了 Agent 在获得“自修改”和“文件系统访问”权限后的危险性，社区呼吁在执行具有破坏性的本地操作前，必须做到“所见即所批”。

## 8. 待处理积压
维护者需优先关注以下处于 OPEN 状态、影响面广的议题与 PR：
*   🔴 **[PR #2732](https://github.com/nanocoai/nanoclaw/pull/2732) Harden host + agent-runner from health audit findings**：针对多 Agent 健康审计的安全修复 PR，包含了核心安全修复。鉴于今日集中爆发的 3 个严重安全漏洞，强烈建议维护者尽快 review 并合并此类安全加固代码。
*   🟠 **[PR #2759](https://github.com/nanocoai/nanoclaw/pull/2759) fix(agent-runner): deliver budget/billing error turns**：解决预算耗尽静默 Bug 的修复，直接影响终端用户口碑，建议尽快推进合并。
*   🟡 **[Issue #2768](https://github.com/nanocoai/nanoclaw/issues/2768) Enable prompt caching**：Claude 提供商默认开启缓存的请求，涉及核心 API 调用逻辑的改动，需团队评估兼容性后予以回应。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

以下是为您生成的 IronClaw 项目 2026-06-15 动态日报。

# 📊 IronClaw 项目动态日报 (2026-06-15)

## 1. 今日速览
2026年6月15日，IronClaw 项目继续保持高度活跃，过去 24 小时内共处理了 42 条 Issue 更新和 45 条 PR 更新。当前项目重心明显聚焦于 **"Reborn" 架构（WebUI v2 与 Runtime）的深度打磨与扩展能力建设**。值得注意的是，今日核心团队发起了一项宏大的“AI 原生工程团队”计划，要求全面使用 IronClaw 加速自身的研发、测试与代码审查。同时，安全社区披露了多个针对内置 Shell 工具的授权绕过漏洞，这将是项目近期需要紧急修复的稳定性隐患。

## 2. 版本发布
**本日无新版本发布。**

## 3. 项目进展
今日共有 15 个 PR 被合并或关闭，推进了 Reborn 架构在交互体验、可观测性和运行时上下文感知方面的重要进展：
*   **Reborn 多模态交互落地**：[PR #4738](https://github.com/nearai/ironclaw/pull/4738) 成功为 Reborn WebChat v2 SPA 接入了完整的文件上传与附件 UX 交互，大幅提升了前端的可用性。
*   **运行时上下文感知**：[PR #4836](https://github.com/nearai/ironclaw/pull/4836) 实现了运行时上下文切片，使模型在每次循环开始时都能准确感知当前连接的通信渠道和交付状态，从而做出更智能的动作决策。
*   **测试与 CI 修复**：[PR #4873](https://github.com/nearai/ironclaw/pull/4873) 重新嵌入了关于 Slack 授权到认证恢复的端到端测试，补全了之前为解绑 CI 而移除的关键测试链路。

## 4. 社区热点
今日社区与核心团队的讨论极其活跃，热点集中在自身研发效能的提升与 Reborn 本地测试：
*   **IronClaw 研发效能全面升级**：核心成员 @think-in-universe 发起了系列议题 [Issue #4878](https://github.com/nearai/ironclaw/issues/4878)，旨在让团队“吃自己的狗粮”。这套组合拳包括自动化 AI 代码审查（[#4880](https://github.com/nearai/ironclaw/issues/4880)）、为 PR 提供 Vercel 式的预览部署（[#4881](https://github.com/nearai/ironclaw/issues/4881)）、建立云端 Coding Agent 工作流（[#4882](https://github.com/nearai/ironclaw/issues/4882)）以及严密的测试覆盖率追踪（[#4883](https://github.com/nearai/ironclaw/issues/4883)）。这释放出强烈的信号：IronClaw 正在向高度自动化的自举（Bootstrapping）研发模式迈进。
*   **Reborn Dogfooding 本地测试周**：[Issue #4879](https://github.com/nearai/ironclaw/issues/4879) 开启了新一周的本地内测，重点收集 WebUI 启动、模型配置和首次运行时的可用性痛点。
*   **MCP 工具授权恢复异常**：[Issue #4887](https://github.com/nearai/ironclaw/issues/4887) 报告了在使用 NEAR AI MCP 搜索工具时，授权通过后恢复调用会失败的问题，反映了 Capability 生命周期管理中仍存在状态不一致的 Bug。

## 5. Bug 与稳定性
今日报告了多个严重程度较高的安全与稳定性 Bug：
*   🔴 **高危 - Shell 授权边界绕过系列漏洞**：今日连续报告了 4 个安全漏洞（[#4862](https://github.com/nearai/ironclaw/issues/4862), [#4863](https://github.com/nearai/ironclaw/issues/4863), [#4864](https://github.com/nearai/ironclaw/issues/4864), [#4865](https://github.com/nearai/ironclaw/issues/4865)）。攻击者（或大模型幻觉）可以通过透明的包装器（如 `env /bin/sh -c` 或 GNU 的 `sort --compress-program` 参数），将高危命令伪装成低风险命令执行，从而绕过系统配置的“每次确认”授权门限。**目前暂无对应修复 PR，需安全团队紧急介入。**
*   🟡 **中危 - 网络环境与鉴权降级**：
    *   [Issue #4874](https://github.com/nearai/ironclaw/issues/4874)：当通过局域网 IP 或纯 HTTP（非 localhost）访问 WebChat v

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

以下是为您生成的 LobsterAI 项目动态日报（2026-06-15）：

### 📈 LobsterAI 项目动态日报 (2026-06-15)

#### 1. 今日速览
2026-06-15，LobsterAI 项目整体活跃度呈现“底层功能演进与历史包袱清理并存”的态势。今日项目无新版本发布，但代码库迎来了 5 个 PR 更新和 2 个 Issue 更新。开发重点集中在深化 **Cowork（多智能体协作）** 体验以及拓展 **Artifact 文档预览** 能力上。值得注意的是，今日有数个关于核心功能优化和历史遗留 Bug 的 PR 被关闭或标记为 `[stale]`（陈旧），项目维护者需警惕社区贡献者的流失风险。

#### 2. 版本发布
*今日无新版本发布。*

#### 3. 项目进展
今日项目在文档处理能力和底层稳定性方面迈出了坚实的一步，共有 2 个重要 PR 被关闭（含合并/拒绝）：
*   **Artifact 预览能力大幅增强**：[PR #2159](https://github.com/netease-youdao/LobsterAI/pull/2159) 已关闭。该 PR 引入了 `document_file` 分享来源，使得系统支持打包、校验和大小限制。同时，实现了 DOCX、PPTX、PDF、CSV 等多种文档格式的面板分享与预览优化，并补齐了 `pdfjs` 的底层构建配置。标志着 LobsterAI 在“文档处理智能体”方向的重大补强。
*   **底层幽灵数据清理**：[PR #1465](https://github.com/netease-youdao/LobsterAI/pull/1465) 已关闭。修复了本地 SQLite 数据库与 OpenClaw 网关端数据不同步的问题，根除了“已删除定时任务在重启后作为幽灵会话重现”的严重缺陷。

#### 4. 社区热点
今日社区的关注点呈现明显的“工程化”与“长任务痛点”特征，以下是引发开发者共鸣的讨论：
*   **长耗时任务的系统级保障**：[PR #1430](https://github.com/netease-youdao/LobsterAI/pull/1430) 提出了在会话运行期间调用 Electron API 阻止操作系统休眠。这反映了真实用户经常将重度任务（如代码生成、长文档分析）交给 Agent，系统意外挂起导致任务中断是目前的核心痛点之一。
*   **沉浸式工作流的检索增强**：[PR #1429](https://github.com/netease-youdao/LobsterAI/pull/1429) 引入了基于 `mark.js` 的会话内全局搜索与高亮。随着单次 Cowork 会话产生的上下文越来越长，用户对历史消息快速检索的诉求日益强烈。

#### 5. Bug 与稳定性
今日无新增严重崩溃报告，处理的主要为影响用户体验的 UI 与数据一致性问题：
*   **[已修复-高] 幽灵会话干扰**：定时任务删除后数据残留，导致重启后反复出现空会话。（关联 [PR #1465](https://github.com/netease-youdao/LobsterAI/pull/1465)）
*   **[未修复-低] 多语言适配疏漏**：Agent 语言设定为中文时，技能 tab 页无数据时的兜底提示和按钮仍显示为英文。（详见 [Issue #1434](https://github.com/netease-youdao/LobsterAI/issues/1434)）
*   **[未修复-低] 前端样式容错不足**：新建自定义 Agent 时，名称过长直接导致弹框 UI 溢出，缺乏文本截断处理。（详见 [Issue #1435](https://github.com/netease-youdao/LobsterAI/issues/1435)）

#### 6. 功能请求与路线图信号
从近期的 PR 动态中，可以清晰地捕捉到 LobsterAI 的演进路线图信号——**打造更专业的桌面级重度 AI 工作台**：
1.  **向“重度生产力工具”靠拢**：通过 [PR #1431](https://github.com/netease-youdao/LobsterAI/pull/1431) 添加 StreamingActivityBar 秒级计时器。借鉴了 Claude Code 等专业工具的设计，增强用户对耗时任务的进度感知。
2.  **文档处理闭环**：结合今日关闭的 [PR #2159](https://github.com/netease-youdao/LobsterAI/pull/2159) 中的 Office/PDF 预览优化，推测下一个发布版本的重点将是** Artifact 资产的分享与多模态渲染**。

#### 7. 用户反馈摘要
*   **真实场景**：用户大量使用自定义 Agent 处理复杂任务，且高度依赖应用的定时执行能力（如挂机跑任务）。
*   **满意点**：对 Artifact 的多格式兼容（尤其是复杂表格自动列宽、PDF原生预览兜底）反馈良好，认为其超越了简单的文本对话。
*   **不满意点**：前端细节打磨不足。例如极端输入（超长名称）导致的样式崩坏，以及本地化语言（i18n）覆盖不全，让国内用户产生“半成品”的割裂感。

#### 8. 待处理积压 ⚠️
维护团队需特别注意，**今日活跃的 PR/Issue 绝大多数带有 `[stale]`（陈旧/不活跃）标签**。这些贡献创建于 4 月初，时隔两个多月后被重新激活（可能由机器人触发），这通常意味着代码冲突严重或贡献者已流失：
*   **[PR #1429](https://github.com/netease-youdao/LobsterAI/pull/1429)**：Cowork 会话消息搜索（作者 @noransu，待合并）
*   **[PR #1430](https://github.com/netease-youdao/LobsterAI/pull/1430)**：阻止系统休眠机制（作者 @choyuenga，待合并）
*   **[PR #1431](https://github.com/netease-youdao/LobsterAI/pull/1431)**：流式状态计时器（作者 @choyuenga，待合并）
*   **[Issue #1434](https://github.com/netease-youdao/LobsterAI/issues/1434)** / **[Issue #1435](https://github.com/netease-youdao/LobsterAI/issues/1435)**：两个 UI/i18n 细节 Bug 至今无人认领修复。

**分析师建议**：以上三个 `feat` 类型的 PR 均是极好的社区贡献（防休眠、检索、计时器），建议维护团队优先进行 Code Review，协助解决潜在冲突并予以合并，以提振社区贡献者的热情。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

这是一份为您生成的 CoPaw (QwenPaw) 项目动态日报。数据基于 2026-06-15 的 GitHub 活动，内容客观、数据驱动，旨在清晰呈现项目健康度与社区脉搏。

---

# 📊 CoPaw (QwenPaw) 项目动态日报 (2026-06-15)

## 1. 今日速览
今日 CoPaw (QwenPaw) 项目保持了高度活跃的状态，过去 24 小时内共处理了 **24 条 Issue 动态**（新开/活跃 18 条，关闭 6 条）以及 **16 条 PR 动态**（待合并 11 条，合并/关闭 5 条）。
从整体数据来看，社区参与度极高，尤其在**桌面端体验（Tauri 迁移后的性能）、上下文压缩机制、多渠道集成（企业微信/飞书）**等方面引发了大量讨论。虽然今日无新版本发布，但官方与社区贡献者合入了多项关键修复，并在桌面端自动化（Computer Use）等前沿功能上展现了明确的推进意图。

## 2. 版本发布
**今日无新版本发布。**
*(注：社区当前主要基于 `v1.1.11.post2` 版本进行测试与反馈，预计下一个迭代正在紧锣密鼓筹备中。)*

## 3. 项目进展
今日共有 5 个 PR 被合并或关闭，项目在稳定性和体验上迈出了坚实的一步：
*   **桌面端体验修复**：PR [#5051](https://github.com/agentscope-ai/QwenPaw/pull/5051) 合并，通过在重启期间持久化后端端口，成功修复了 Windows 桌面端重启后智能体重置的问题（对应 Issue [#4733](https://github.com/agentscope-ai/QwenPaw/issues/4733)）。
*   **核心引擎健壮性提升**：
    *   PR [#5038](https://github.com/agentscope-ai/QwenPaw/pull/5038) 修复了 `LightContextManager` 在处理空消息列表时引发的 `IndexError` 崩溃。
    *   PR [#5035](https://github.com/agentscope-ai/QwenPaw/pull/5035) 修复了 `llama.cpp` 版本号解析的硬编码切片错误，使其支持未来的 5 位数构建版本号。
*   **插件生态扩展**：PR [#5188](https://github.com/agentscope-ai/QwenPaw/pull/5188) 引入了请求负载转换机制，暴露了 Host SDK API，大幅增强了前端插件对请求体的干预能力。

## 4. 社区热点
今日讨论最热烈的问题集中在**桌面端性能与系统集成**：
*   **Windows 客户端资源占用异常**（[Issue #5138](https://github.com/agentscope-ai/QwenPaw/issues/5138)）：用户反馈打开客户端后进程持续暴增，内存占用高达 90% 以上，引发广泛共鸣。
*   **Tauri 桌面端启动严重卡顿**（[Issue #5047](https://github.com/agentscope-ai/QwenPaw/issues/5047)）：自桌面端从 Python 打包迁移至 Tauri 后，启动时间从 1-2 分钟激增至 10 分钟以上。这反映出底层架构调整给部分 Windows 用户带来了严重的退化痛点。
*   **Kimi 接入受限**（[Issue #5156](https://github.com/agentscope-ai/QwenPaw/issues/5156)）：已订阅 Kimi 编程套餐的用户强烈呼吁将 `kimi-for-coding` 加入 `uv` 白名单，暴露出项目在第三方 API 兼容性及商业化套餐适配上存在需求缺口。

## 5. Bug 与稳定性
根据今日报告的 Bug，按严重程度排列如下：
*   **严重**：
    *   **进程泄漏与内存溢出** ([#5138](https://github.com/agentscope-ai/QwenPaw/issues/5138))：Windows 客户端进程持续增加致系统卡死。
    *   **打包后白屏** ([#5165](https://github.com/agentscope-ai/QwenPaw/issues/5165))：打包脚本引用了不存在的模块（`qwenpaw.app.api` 等），导致打包出的 exe 启动白屏。
*   **高**：
    *   **上下文压缩导致任务中断** ([#5171](https://github.com/agentscope-ai/QwenPaw/issues/5171))：当人设文件 Token 超过保留阈值时，压缩逻辑会将上下文清零，导致 Agent 彻底失忆。
    *   **Python 3.13 兼容性报错** ([#5166](https://github.com/agentscope-ai/QwenPaw/issues/5166))：安装 TeamChat 插件时提示缺少 `imghdr` 模块（Python 3.13 已移除该库）。
    *   **长对话死循环与卡死** ([#5161](https://github.com/agentscope-ai/QwenPaw/issues/5161), [#5162](https://github.com/agentscope-ai/QwenPaw/issues/5162))：多轮长对话后，Agent 思考逻辑进入死循环或停止响应。
*   **中**：
    *   **v1.1.11.post2 回退问题** ([#5184](https://github.com/agentscope-ai/QwenPaw/issues/5184), [#5163](https://github.com/agentscope-ai/QwenPaw/issues/5163))：本地模型提供商不显示；Gemini 工具调用失效。
    *   **依赖安装无限弹窗** ([#5181

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