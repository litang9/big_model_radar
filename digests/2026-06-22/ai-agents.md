# OpenClaw 生态日报 2026-06-22

> Issues: 500 | PRs: 500 | 覆盖项目: 11 个 | 生成时间: 2026-06-22 05:33 UTC

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

以下是 OpenClaw 项目 2026-06-22 的动态日报：

# OpenClaw 项目动态日报 (2026-06-22)

## 1. 今日速览
OpenClaw 今日保持极高的社区热度与开发活跃度，过去 24 小时内共有 500 条 Issue 更新（477 条活跃）与 500 条 PR 更新（99 条合并/关闭），并发布了 **v2026.6.10-beta.1** 测试版本。项目近期重点聚焦于修复 Agent 会话状态保留、内存压缩及跨提供商兼容性等核心稳定性问题。然而，当前社区也暴露出较多严重的回归性 Bug（如内存泄漏、内部思考泄漏等），核心维护团队正面临较大的稳定性攻坚与积压处理压力。

## 2. 版本发布
**最新 Beta 版本：[v2026.6.10-beta.1](https://github.com/openclaw/openclaw/releases)**
- **更新亮点**：重点提升了 Agent 轮次和会话状态的可靠性。主要包括：保留了待处理的子代理完成公告，确保聊天历史记录非空，维持媒体索引对齐，重启了休眠的后续处理任务，并确保压缩模型别名的解析保持一致。
- **注意事项**：这是一个 Beta 版本，主要针对近期反馈的上下文和会话状态丢失问题进行了打补丁，建议自部署用户在沙箱环境测试后再行升级。

## 3. 项目进展
今日共有 99 个 PR 被合并或关闭，项目在渠道接入、生命周期钩子及基础设施健壮性上取得了实质性进展：
- **生命周期钩子扩展**：[PR #89152](https://github.com/openclaw/openclaw/pull/89152) 添加了 ACP 运行时的 `agent:turn:end` 内部钩子，为插件开发者提供了更清晰的回合边界控制。
- **渠道能力增强**：
  - [PR #94978](https://github.com/openclaw/openclaw/pull/94978) 引入了一个超大型 PR，将 Microsoft Teams 提升为第一类的语音 (CVI)、视频和聊天原生渠道。
  - [PR #95552](https://github.com/openclaw/openclaw/pull/95552) 与 [PR #95662](https://github.com/openclaw/openclaw/pull/95662) 大幅优化了 Mattermost 的体验，支持机器人自动参与自身评论楼的回复，无需每次 @提及。
- **底层数据修复**：[PR #95631](https://github.com/openclaw/openclaw/pull/95631) 提交了针对 2026.6.9 版本导致的记忆库静默迁移（需重新 embedding）的补救与状态迁移方案。

## 4. 社区热点
今日讨论最热烈的问题集中在**资源占用、架构设计与严重的交互回归**上：
- **[Critical] 网关内存泄漏引发 OOM**：[Issue #91588](https://github.com/openclaw/openclaw/issues/91588) 报告了严重的网关内存泄漏，RAM 占用几天内从 350MB 飙升至 15.5GB，导致不断被系统强杀重启。这引发了大量自部署运维人员的担忧。
- **[Feature] 支持使用 PostgreSQL 替代 SQLite**：[Issue #90370](https://github.com/openclaw/openclaw/issues/90370) 提出了强需求，希望企业级用户能使用现有的 PostgreSQL 替代目前硬编码的 SQLite，以利用 `pgvector` 等高级功能并降低运维复杂度。
- **[Bug] Telegram 消息重复发送回归**：[Issue #86519](https://github.com/openclaw/openclaw/issues/86519) 指出 5.20 更新引入了严重 Bug，导致 Agent 对同一条消息重复回复高达 2-10 次，尽管后续版本有所缓解，但至今未彻底修复。

## 5. Bug 与稳定性
近期报告的 Bug 涉及核心调度、消息路由和鉴权，按严重程度排列如下：
- 🔴 **[P0] 网关内存泄漏**：[Issue #91588](https://github.com/openclaw/openclaw/issues/91588) - 影响所有长时间运行的实例，导致频繁崩溃重启。
- 🔴 **[P1] Agent 内部思考(Reasoning)泄露给用户**：[Issue #91804](https://github.com/openclaw/openclaw/issues/91804) - 自 2026.6.5 升级后，Agent 的内部思考链路直接作为可见消息暴露给用户，造成严重的隐私与体验危机。
- 🟠 **[P1] 记忆库存储路径静默迁移**：[Issue #95495](https://github.com/openclaw/openclaw/issues/95495) - 升级到 2026.6.9 后未报警告直接改变了底层存储路径，导致系统强制重新进行 1499 个文件的重新向量化嵌入。目前已有修复 PR #95631 提交。
- 🟠 **[P1] 跨提供商 Tool ID 清理器失效**：[Issue #95623](https://github.com/openclaw/openclaw/issues/95623) - 从 OpenAI 容错切换至 Anthropic 时，由于 ID 包含特殊字符 `|`，导致会话直接被 400 错误卡死。
- 🟡 **[P1] Telegram 轮询静默崩溃循环**：[Issue #93375](https://github.com/openclaw/openclaw/issues/93375) - 网络瞬断后，Telegram 轮询器陷入死循环且无法被健康监控自愈。目前有 [PR #95356](https://github.com/openclaw/openclaw/pull/95356) 尝试用释放死锁代替死信队列来修复。

## 6. 功能请求与路线图信号
结合 Issues 与待合并 PR，项目下一阶段的路线图信号明显指向**上下文管理与企业级集成**：
- **长会话语义级所有权管理**：[Issue #86023](https://github.com/openclaw/openclaw/issues/86023) 建议摒弃硬性 Token 轮转，引入基于语义的线程与缓存所有权机制，这有望与 [PR #85651](https://github.com/openclaw/openclaw/pull/85651)（上下文

---

## 横向生态对比

以下是基于 2026 年 6 月 22 日各开源项目动态数据，为您梳理的个人 AI 助手/自主智能体开源生态横向对比分析报告：

---

### 1. 生态全景
当前个人 AI 助手与智能体开源生态正处于**从“基础可用”向“企业级、高安全、多模态”跨越的深水区**。项目间的竞争焦点已从单纯的大模型接入，深移至**长程记忆管理、跨渠道无缝集成、底层并发调度**以及**零信任安全隔离**等硬核技术壁垒上。同时，生态呈现出明显的“分化态势”：头部项目忙于填补规模带来的稳定性与 OOM 债务，而垂直项目则在极端轻量化、边缘硬件控制和移动端体验上建立护城河。

### 2. 各项目活跃度对比
*(注：数据基于 2026-06-22 过去 24 小时的 GitHub 动态切片)*

| 项目名称 | Issues (更新/活跃) | PRs (更新/合并) | Release 情况 | 健康度与所处阶段评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 (477 活跃) | 500 (99 合并) | `v2026.6.10-beta.1` | 🟡 极度活跃，但面临严峻的稳定性攻坚与 P0 级 Bug 压力 |
| **NanoBot** | 10 | 35 (12 合并) | `v0.2.2` 筹备中 | 🟢 极佳，响应迅速。重心在安全漏洞修复与多渠道管控 |
| **Zeroclaw** | 50 (13 关闭) | 50 (4 合并) | 无 | 🟢 活跃，处于安全加固与底层重构（S1 故障修复）的冲刺期 |
| **PicoClaw** | 未详述 | 32 (29 合并) | `v0.3.0-nightly` | 🟢 极度活跃，处于大版本（v0.3.0）发布前的密集重构与清理期 |
| **NanoClaw** | 2 | 7 (3 合并) | 无 | 🟡 中低活跃，重心偏向生命周期清理与底层安全审查 |
| **IronClaw** | 7 | 31 (15 合并) | 无 | 🟢 高活跃，正全面推进 Reborn 架构与企业级云原生部署准备 |
| **LobsterAI**| 14 (清理) | 0 | 无 | 🔴 代码停滞，处于积压清理期，并暴露出未修复的高危安全漏洞 |
| **CoPaw** | 15 (11 活跃) | 29 | 无 | 🟢 高活跃，正处于移动端 UI 适配与核心链路阻断 Bug 的密集修复期 |
| **ZeptoClaw**| 0 | 1 (1 合并) | 无 | 🟢 低频高质，处于工程化门禁建设的完善期 |
| **TinyClaw / EasyClaw** | 0 | 0 | 无 | ⚪ 静默 |

### 3. OpenClaw 在生态中的定位
作为本生态的**核心参照系与流量巨头**，OpenClaw 展现出了显著的规模效应与架构沉重感：
*   **生态优势**：具有最广泛的渠道接入能力（如原生支持 Teams CVI/语音），拥有最庞大的贡献者基数与 Issue 讨论量，是当前智能体交互标准的实际引领者。
*   **技术路线差异**：高度聚焦于复杂的上下文状态机维护、跨提供商容错（OpenAI/Anthropic 切换）以及长程记忆压缩。但近期因引入过多特性，导致了严重的交互回归（如 Telegram 轮询死循环、内部思考泄露）。
*   **社区规模对比**：单日 500 级别的 Issue/PR 活跃度远超其他项目，但负面积压（如网关 OOM、SQLite 瓶颈）导致运维压力激增。相比之下，NanoBot、Zeroclaw 等追赶者目前代码更轻，能实现对高危反馈的 24 小时内 Fix PR 响应。

### 4. 共同关注的技术方向
通过多项目横向比对，以下四大技术痛点正引发全行业的共振：
1.  **零信任安全与沙箱隔离** *(涉及：NanoBot, Zeroclaw, NanoClaw, LobsterAI)*
    *   **诉求**：WASM 插件防 SSRF、MCP 工具越权（resources/prompts 泄露）、A2A 通信中的符号链接逃逸、内网元数据防探测。
2.  **MCP (Model Context Protocol) 调度与兼容性** *(涉及：NanoBot, Zeroclaw, IronClaw, NanoClaw)*
    *   **诉求**：Anthropic 与 OpenAI 兼容协议下的工具 ID 清理、MCP Server 动态加载审批机制的细化（防走私恶意环境变量）。
3.  **长会话状态与上下文管理** *(涉及：OpenClaw, NanoBot, IronClaw, CoPaw)*
    *   **诉求**：摆脱硬性 Token 轮转，引入基于语义的缓存所有权（OpenClaw）、主动检索离线 `history.jsonl` 的半自动记忆召回（NanoBot）、持久化到 SQLite 的上下文回溯（CoPaw）。
4.  **生命周期与状态机健壮性** *(涉及：OpenClaw, NanoClaw, IronClaw)*
    *   **诉求**：解决长驻进程的内存泄漏、孤儿进程与僵尸服务清理（NanoClaw的无痕卸载）、以及并发状态下的会话 Poisoning 问题。

### 5. 差异化定位分析
*   **企业级中枢派**：**OpenClaw** 主打全渠道、高复杂度任务编排，但面临沉重技术债；**IronClaw** 则押注“Reborn 架构”，通过托管级 PostgreSQL、并发调度 (`TurnRunScheduler`) 直接切入多租户云端服务市场。
*   **极客与重度自动化派**：**NanoBot** 与 **Zeroclaw** 深受喜欢将 Agent 接入内部通讯软件（钉钉、Slack）的极客喜爱。它们提供细粒度的权限管控（群聊白名单、黑名单强制执行）和静默后台异步任务调度。
*   **边缘侧与物理世界派**：**PicoClaw** 与 **ZeptoClaw** 走差异化护城河路线。PicoClaw 引入串口工具与抗审查的隐私通讯协议（SimpleX/Tox），而 ZeptoClaw 则通过强制的 CI 门禁，死守 7.5MB 二进制体积红线，专攻资源受限的 IoT/边缘算力设备。
*   **移动端与轻量化体验派**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

以下是 NanoBot 项目 2026-06-22 的动态日报：

### 1. 今日速览
NanoBot 在过去 24 小时内保持了极高的开发热度与社区活跃度，共有 35 个 PR 更新与 10 个 Issue 动态。项目当前正处于 **v0.2.2 版本的发布前夕**（见 PR #4445），开发和审核重心向核心稳定性、安全漏洞修复以及多渠道体验优化倾斜。社区贡献呈现出强劲势头，多位外部开发者提交了针对 MCP 资源越权、会话 poisoning 等关键问题的修复方案，整体项目健康度处于极佳状态。

### 2. 版本发布
今日虽无正式 Release 产出，但维护者 @Re-bin 已提交版本准备 PR（[#4445](https://github.com/HKUDS/nanobot/pull/4445)），将包版本提升至 `0.2.2`。该版本主要聚焦于底层运行时健壮性提升、MCP 安全管控以及 WebUI 交互优化，预计将在近期合并发布。

### 3. 项目进展
今日共有 12 个 PR 被合并或关闭，项目在以下方面取得实质性突破：
*   **新手引导优化落地**：[PR #4395](https://github.com/HKUDS/nanobot/pull/4395) 被合并，重构了 `nanobot onboard --wizard` 的命令行交互流程。该 PR 响应了 [Issue #4376](https://github.com/HKUDS/nanobot/issues/4376)，大幅降低了非技术用户的配置门槛。
*   **并发安全修复**：解决了 `Nanobot.run()` 中因共享 `_extra_hooks` 导致的并发覆盖问题（[Issue #4408](https://github.com/HKUDS/nanobot/issues/4408) 关闭）。
*   **消息渠道管控**：合并了钉钉群聊白名单功能的增强（[PR #4206](https://github.com/HKUDS/nanobot/pull/4206) 关闭），并初步支持了 Telegram Bot API 10.1 的富文本消息渲染（[Issue #4422](https://github.com/HKUDS/nanobot/issues/4422) 关闭）。

### 4. 社区热点
今日社区讨论与互动最密集的焦点集中在 **底层隔离机制与记忆系统**：
*   **MCP 安全隔离失效**（[Issue #4434](https://github.com/HKUDS/nanobot/issues/4434) / [Issue #4435](https://github.com/HKUDS/nanobot/issues/4435)）：多位用户和开发者指出，配置为 `enabledTools: []` 的拒绝策略未应用到 MCP 的 resources 和 prompts 上，导致越权数据有泄露给大模型的风险。这反映出企业级用户在生产环境中对工具权限细粒度管控的极度渴求。
*   **历史记忆调用诉求**：[Issue #4440](https://github.com/HKUDS/nanobot/issues/4440) 提出了增加只读 `search_history` 工具的建议，旨在让 Agent 能够主动检索脱机的 `history.jsonl`。这揭示了当前长对话记忆压缩后，上下文召回能力不足的痛点。

### 5. Bug 与稳定性
今日报告了多个影响运行时稳定性的关键 Bug，社区已迅速提供热修复：
*   **【严重】会话状态 Poisoning**：[Issue #4442](https://github.com/HKUDS/nanobot/issues/4442) 指出 Anthropic 流式响应中出现重复的 `tool_use` ID，导致 API 报 400 错误并使得整个会话永久阻塞。已有双保险修复方案提交（[PR #4443](https://github.com/HKUDS/nanobot/pull/4443) 与 [PR #4444](https://github.com/HKUDS/nanobot/pull/4444)）。
*   **【高危】安全白名单绕过**：如上文所述的 MCP 策略失效 Bug，已在 [PR #4436](https://github.com/HKUDS/nanobot/pull/4436) 中通过强制约束 resources 与 prompts 的注册逻辑完成修复。
*   **【中危】网关重连崩溃**：[PR #4441](https://github.com/HKUDS/nanobot/pull/4441) 修复了 MCP 服务断开重连时，因 anyio 任务组上下文异常导致的 `RuntimeError` 崩溃。

### 6. 功能请求与路线图信号
基于今日的 Issue 与 PR 走向，NanoBot 的下一阶段演进将更加注重**企业级控制与资源调度**：
*   **降本增效**：[Issue #4431](https://github.com/HKUDS/nanobot/issues/4431) 建议为心跳服务提供特定的模型重写配置，避免后台监控任务无谓消耗昂贵的默认大模型 Token。
*   **主动记忆召回**：配合 [PR #4439](https://github.com/HKUDS/nanobot/pull/4439) 引入的 `search_history` 工具，NanoBot 正在构建一套半自动的记忆唤醒层，这有望显著改善长时间独立运行 AI 的“记忆连贯性”。
*   **后台异步任务**：[PR #4225](https://github.com/HKUDS/nanobot/pull/4225) 为定时任务增加了静默模式和接收者锁，表明项目正在向更复杂的后台自动化监控场景拓展。

### 7. 用户反馈摘要
*   **痛点反馈**：用户对“静默失败”容忍度极低，例如流式响应 Bug 导致 Agent 突然拒接回复但无明显报错；同时，过于硬核的初始配置文件让新手感到挫败。
*   **使用场景**：重度用户正大量将 NanoBot 接入内部通讯软件（如钉钉、Slack），并广泛使用定时任务进行自动化监控。他们强烈要求群聊消息能够定向回复（[PR #4446](https://github.com/HKUDS/nanobot/pull/4446)）和禁止私聊滥用。
*   **满意度评价**：尽管存在部分边界条件触发的 Bug，但社区对项目维护者的响应速度给予了高度评价，大部分高危 Bug 在提出后的 24 小时内均有对应代码级别的 Fix PR 介入。

### 8. 待处理积压
*   **陈旧的功能请求**：[Issue #1011](https://github.com/HKUDS/nanobot/issues/1011)（请求支持 Mattermost 作为通讯通道）自 2 月份创建至今未有实质推进，但仍有用户点赞跟进，建议维护者评估是否纳入后续多渠道扩展路线图。
*   **复杂逻辑 PR 搁置**：[PR #4092](https://github.com/HKUDS/nanobot/pull/4092)（OpenAI兼容工具调用解析修复）已提交超过 3 周，涉及较深的底层消息解析重构，可能需要更多测试用例或维护者介入 Review 以防止合并引发回归。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下是为您生成的 Zeroclaw 项目 2026-06-22 动态日报：

# 📊 Zeroclaw 项目动态日报 (2026-06-22)

### 1. 今日速览
今日 Zeroclaw 项目保持了极高的活跃度，共处理了 50 条 Issue 更新（13 条已关闭）和 50 条 PR 更新（4 条已合并/关闭）。项目当前正处于 **v0.8.2（技能平台）和 v0.8.3（渠道与运行时稳定）** 两个里程碑的密集开发与重构期。今日的开发重心高度聚焦于**安全加固**（WASM 插件防 SSRF、环境变量隔离、配对码强化）以及**大模型兼容性修复**（MCP 工具调度、上下文压缩逻辑）。虽然今日无新版本发布，但大量针对 S1 级别故障的修复 PR 正在排队等待合并，项目正为下一个稳定版做全力冲刺。

### 2. 版本发布
* **今日无新版本发布 (0 个)**。
* 当前项目主线工作主要围绕 `[Tracker]: v0.8.2 skills platform` ([#7852](https://github.com/zeroclaw-labs/zeroclaw/issues/7852)) 和 `[Tracker]: v0.8.3 milestone index` ([#7320](https://github.com/zeroclaw-labs/zeroclaw/issues/7320)) 展开推进。

### 3. 项目进展
今日项目整体向前迈出了坚实的一步，共有 4 个 PR 被成功合并/关闭，且 46 个待合并 PR 正在进行最后的 Review。重点推进的功能与修复包括：
* **MCP 工具隔离与安全**：PR [#8120](https://github.com/zeroclaw-labs/zeroclaw/pull/8120) 修复了多 Agent 环境下 MCP 工具跨代理泄露的问题，强制执行了黑名单机制。
* **WASM 插件底层安全**：PR [#8128](https://github.com/zeroclaw-labs/zeroclaw/pull/8128) 为 HTTP 请求添加了 SSRF 防护，阻止了恶意插件探测内网或云服务元数据端点（如 RFC-1918）。
* **风控与执行策略修正**：PR [#7960](https://github.com/zeroclaw-labs/zeroclaw/pull/7960) 修复了 `execute_pipeline` 绕过单 Agent 工具限制的漏洞；PR [#7959](https://github.com/zeroclaw-labs/zeroclaw/pull/7959) 修复了非完全自治模式下自动批准工具失效的问题。
* **生命周期与状态同步**：PR [#8003](https://github.com/zeroclaw-labs/zeroclaw/pull/8003) 修复了长期作为“死代码”的 `session_end` 钩子，现已在 RPC 会话终止时正确触发；PR [#8126](https://github.com/zeroclaw-labs/zeroclaw/pull/8126) 确保在切换工具分发器时能动态刷新系统提示词。

### 4. 社区热点
今日社区讨论最热烈的问题集中在**治理机制的改进**与**特定渠道的强烈需求**：
* **治理与工作流自动化**：[#6808](https://github.com/zeroclaw-labs/zeroclaw/issues/6808) (11条评论) 讨论了即将在 0.8.0 引入的工作通道、看板自动化与标签清理 RFC。这表明项目维护者正在努力解决开源项目壮大后的协作效率问题。
* **NapCat / OneBot 渠道支持**：[#2503](https://github.com/zeroclaw-labs/zeroclaw/issues/2503) (9条评论) 反映了大量国内用户对于接入 NapCat (OneBot11 协议) 的强烈需求，该 Issue 已被官方标记为 `accepted`，预计将在后续渠道更新中原生支持。
* **Webhook 自定义转换**：[#2467](https://github.com/zeroclaw-labs/zeroclaw/issues/2467) (6条评论) 提出对通用 Webhook 负载进行自定义路径和检查的需求，这反映了开发者希望将 Zeroclaw 作为中枢，接入更多非标第三方服务的诉求。

### 5. Bug 与稳定性
今日暴露了多个影响工作流的 S1（阻断级）Bug，部分已有相应修复 PR：
* **[S1 - 工作流阻断] Gemini CLI OAuth 认证失效**：[#4879](https://github.com/zeroclaw-labs/zeroclaw/issues/4879) 报告了 Gemini 认证后立刻触发限频/报错的问题，严重影响使用。
* **[S1 - 工作流阻断] OpenAI兼容提供商上下文压缩导致死循环**：[#6361](https://github.com/zeroclaw-labs/zeroclaw/issues/6361) 指出 `context_compression` 会完全丢弃 MiniMax 等提供商的 `tool_calls` 和 `tool(result)`，导致 Agent 陷入死循环。
* **[S1 - 工作流阻断] 原生/MCP 工具在特定模型下不可用**：[#7756](https://github.com/zeroclaw-labs/zeroclaw/issues/7756) 反映 OpenAI 响应推理模型和 Anthropic 轮次中，模型无法接收到注册的 MCP 工具。
* **[S1 - 构建阻断] Docker / Debian 构建失败**：[#8089](https://github.com/zeroclaw-labs/zeroclaw/issues/8089) 报告由于缺失 `aardvark-sys` 构建文件导致镜像打包失败。*(注：该问题今日已伴随 PR [#8093](https://github.com/zeroclaw-labs/zeroclaw/pull/8093) 的提出得到修复跟进，并已 CLOSED)*。

### 6. 功能请求与路线图信号
结合 Issues 与活跃的 PR，可以看出项目接下来的演进方向：
* **安全零信任架构**：[#5919](https://github.com/zeroclaw-labs/zeroclaw/issues/5919) 要求对插件读取环境变量实行白名单制（如只能读自己的 API Key）；[#5918](https://github.com/zeroclaw-labs/zeroclaw/issues/5918) 和 [#6613](https://github.com/zeroclaw-labs/zeroclaw/issues/6613) 分别呼吁增强防 SSRF 和默认使用更高强度的配对码。这暗示 Zeroclaw 正在向企业级/高安全性标准靠拢。
* **本地小模型优先模式**：[#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) 获得了较多点赞（👍: 2），用户希望提供禁用工具泄漏、减少提示词冗余的“极简模式”，以适配本地算力较弱的设备（如通过 Ollama）。
* **可观测性强化**：多个由 @JordanTheJet 提交的特性（如 [#6641](https://github.com/zeroclaw-labs/zeroclaw/issues/6641), [#6642](https://github.com/zeroclaw-labs/zeroclaw/issues/6642)）正通过 PR [#7771](https://github.com/zeroclaw-labs/zeroclaw/pull/7771) 落地，未来将支持全链路 OTel trace 关联，这对于复杂 Agent 的调试是重大利好。

### 7. 用户反馈摘要
从评论和 Issue 描述中，可提炼出以下用户真实侧写：
* **痛点 1：初始化体验仍具门槛**：在 [#8094](https://github.com/zeroclaw-labs/zeroclaw/issues/8094) 中，用户抱怨在 Quickstart 添加 Anthropic 模型后，如果不重启服务就无法在聊天窗口看到模型。甚至有用户在 [#8125](https://github.com/zeroclaw-labs/zeroclaw/issues/8125) 中戏谑提出在 Quickstart 默认采用 `yolo` (无限风险) 配置，侧面反映了过严的默认安全策略让初学者感到受挫。
* **痛点 2：日志输出干扰**：[#4721](https://github.com/zeroclaw-labs/zeroclaw/issues/4721) 用户吐槽 Zeroclaw 将日志输出到 stdout 而非 stderr，导致无法干净地使用管道符（如 `zeroclaw config schema` 的输出被日志污染）。
* **痛点 3：特定渠道功能缺失**：Telegram 用户反馈 Prompt 缓存机制失效导致重复处理（[#6360](https://github.com/zeroclaw-labs/zeroclaw/issues/6360)）；群组用户希望能直接回复机器人消息，而不再强制要求 @ 机器人（已在 PR [#7958](https://github.com/zeroclaw-labs/zeroclaw/pull/7958) 中修复）。

### 8. 待处理积压
* **历史代码回滚审计（高优先级）**：[#6074](https://github.com/zeroclaw-labs/zeroclaw/issues/6074) 追踪由于一次批量回滚（`c3ff635`）而丢失的 153 个提交

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

以下是 PicoClaw 项目 2026-06-22 的开源项目动态日报。报告基于 GitHub 实时数据进行深度整理。

---

# 📊 PicoClaw 项目动态日报 (2026-06-22)

## 1. 今日速览
PicoClaw 项目今日整体保持**极高的代码合入与清理活跃度**。过去 24 小时内，项目处理了高达 32 个 PR（其中 29 个被合并或关闭），并发布了最新的 `v0.3.0-nightly` 版本。这表明项目正处于向 v0.3.0 正式版冲刺的关键重构期，前期积压的大量架构优化（如配置系统 V3 化、流式输出改进、底层稳定性修复）已被集中主干。Issue 板块报告了关于火山引擎豆包模型工具调用的偶发泄漏 Bug，值得开发者重点关注。

## 2. 版本发布
- **[nightly] Nightly Build (v0.3.0-nightly.20260622.287853ab)**
  - **发布说明**：这是针对 `v0.3.0` 大版本的自动化构建版本。官方提示该版本为自动构建，**可能存在不稳定现象，需谨慎使用**。
  - **变更范围**：对比 `v0.3.0` 分支与 `main` 分支的完整差异。结合今日大量合并的 V3 配置格式重构 PR，**强烈建议准备升级的用户提前查阅配置迁移指南**（如 `api_key` 改为 `api_keys` 数组，`channels` 改为 `channel_list`）。
  - 🔗 [查看 Release 详情](https://github.com/sipeed/picoclaw/releases)

## 3. 项目进展
今日项目的进展极其显著，核心开发者 @SiYue-ZO 集中合并和清理了大量关键改进，项目在 Web 交互、底层稳定性和跨平台支持上迈出了一大步：
*   **配置系统大版本重构 (V3 格式)**：[PR #2766](https://github.com/sipeed/picoclaw/pull/2766) 全面同步了 V3 配置格式文档，统一了前后端的配置规范。配合 [PR #2891](https://github.com/sipeed/picoclaw/pull/2891)（恢复出厂设置功能），大幅提升了版本跨级升级的容错率。
*   **Web 聊天体验重塑**：[PR #2587](https://github.com/sipeed/picoclaw/pull/2587) 实现了端到端的 Web 聊天流式输出及滚动 UX 优化；[PR #2661](https://github.com/sipeed/picoclaw/pull/2661) 和 [PR #2659](https://github.com/sipeed/picoclaw/pull/2659) 优化了思维链的独立展示与折叠状态。
*   **底层内存与并发稳定性**：[PR #2913](https://github.com/sipeed/picoclaw/pull/2913) 修复了热路径上的深拷贝性能消耗；[PR #2907](https://github.com/sipeed/picoclaw/pull/2907) 解决了 JSONL 在崩溃后的元数据漂移问题；[PR #2906](https://github.com/sipeed/picoclaw/pull/2906) 优化了消息总线的背压处理。
*   **硬件与 IoT 进阶**：[PR #2673](https://github.com/sipeed/picoclaw/pull/2673) 引入了跨平台（Linux/macOS/Windows）的内置串口硬件工具支持，进一步拓宽了 PicoClaw 作为物理世界 Agent 的能力边界。

## 4. 社区热点
今日社区的关注点集中在**特殊 LLM 提供商适配**和**隐私通讯渠道支持**上：
*   **🔥 [Issue #3153](https://github.com/sipeed/picoclaw/issues/3153)**：新报告的火山引擎豆包 Seed 模型工具调用 Bug，因模型输出格式特殊导致代码直接暴露给用户，引发关注。
*   **🗣️ [Issue #3093](https://github.com/sipeed/picoclaw/issues/3093)**：用户强烈呼吁支持 SimpleX、Tox 或 Wire 等高度抗审查和去中心化的隐私聊天协议作为 Gateway，反映了部分 PicoClaw 用户群体对隐私和自托管属性的极高诉求。
*   **💸 [Issue #3012](https://github.com/sipeed/picoclaw/issues/3012)**：Evolution（演化）功能开启时导致 Token 每分钟被持续消耗的问题引发了 5 条评论讨论，涉及后台静默消耗成本，直击用户痛点。

## 5. Bug 与稳定性
按严重程度排列今日报告或处理的缺陷：
1.  **[严重] Token 异常消耗** - [Issue #3012](https://github.com/sipeed/picoclaw/issues/3012)：开启 Evolution 功能导致每分钟持续消耗 Token，对于绑定信用卡的用户存在直接经济损失风险。（*目前仍为 OPEN 状态，亟待修复*）
2.  **[较高] 豆包模型工具调用泄漏** - [Issue #3153](https://github.com/sipeed/picoclaw/issues/3153)：使用 `doubao-seed-2.0-pro` 时，工具调用未被执行，而是将原始的 `<seed:tool_call>` XML 文本直接作为回复输出。（*今日新开，暂无修复 PR*）
3.  **[中等] MCP 命令解析错误** - [Issue #3041](https://github.com/sipeed/picoclaw/issues/3041) (已关闭)：`mcp add` 会将全局参数误解析为位置参数，导致 http/sse 模式添加失败。（*已通过关闭 Issue 处理*）
4.  **[中等] Matrix 用户 ID 兼容性** - [Issue #3044](https://github.com/sipeed/picoclaw/issues/3044) (已关闭)：`allow_from` 无法正确处理带有冒号的标准 Matrix ID（`@user:domain`）。（*已修复验证并关闭*）

## 6. 功能请求与路线图信号
结合今日的 Issues 和已合并的 PR，可以洞察出 v0.3.0 及后续版本的演进路线：
*   **多模态视觉理解优化**：从今日合并的 [PR #2915](https://github.com/sipeed/picoclaw/pull/2915)（为 MiMo 提供商添加多模态标签）可以看出，项目正在系统性地增强前端对“文生图/视觉理解”模型的智能识别。
*   **硬件网关与边缘计算**：[PR #2673](https://github.com/sipeed/picoclaw/pull/2673) 串口工具的引入，加上用户在 [Issue #3093](https://github.com/sipeed/picoclaw/issues/3093) 中对去中心化协议的呼唤，暗示 PicoClaw 未来可能会向“局域网/边缘硬件 AI 助理中枢”的方向发力。
*   **企业级配置管理**：今日合并的“真实连接性测试” ([PR #2833](https://github.com/sipeed/picoclaw/pull/2833)) 和“模型目录获取” ([PR #2832](https://github.com/sipeed/picoclaw/pull/2832))，大幅完善了 API 层面的模型生命周期管理。

## 7. 用户反馈摘要
从今日的互动中提炼出用户的真实反馈：
*   **👍 满意点**：V3 配置的全面推行以及“恢复出厂设置”功能 ([PR #2891](https://github.com/sipeed/picoclaw/pull/2891)) 大幅缓解了用户在频繁升级 PicoClaw 时的配置文件冲突焦虑；Windows 控制台闪烁问题 ([PR #2654](https://github.com/sipeed/picoclaw/pull/2654)) 的修复提升了桌面端用户的体验。
*   **👎 痛点**：用户对**不同模型提供商的适配一致性**颇有微词。如豆包模型 ([Issue #3153](https://github.com/sipeed/picoclaw/issues/3153)) 的私有标签未能被 Agent 正确拦截解析；此外，旧版 iOS Safari 用户 ([Issue #3090](https://github.com/sipeed/picoclaw/issues/3090)) 面临管理面板无法登陆使用的窘境。

## 8. 待处理积压
以下重要 Issue 缺乏及时的代码级响应或被标记为 stale，需要维护者团队关注：
*   ⚠️ **[Issue #3012](https://github.com/sipeed/picoclaw/issues/3012)**：持续消耗 Token 的 Bug 涉及资金损失风险，不应长期挂着无对应的修复 PR。
*   ⚠️ **[Issue #3090](https://github.com/sipeed/picoclaw/issues/3090)**：iOS 16.4 以下版本 Safari 兼容性问题，已标记为 `[stale]`，需决定是修补前端 polyfill 还是直接放弃对老版本 iOS 的支持。
*   ⚠️ **待合并 PR**：当前仍有 **3 个 PR 处于待合并状态**。考虑到昨日刚集中关闭了 29 个，剩余这 3 个可能存在冲突、架构分歧（如拆分自 #2752 的系列基础 PR）或亟待二次 Review，建议主仓库 maintainer 抽空清理。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

这是一份基于 2026-06-22 GitHub 数据的 NanoClaw 项目动态日报。作为专注于 AI 智能体与个人 AI 助理领域的开源项目，NanoClaw 今日的动态主要集中在安全性强化、部署健壮性以及多智能体协作（A2A）边界的完善上。

---

### 📊 NanoClaw 项目动态日报 (2026-06-22)

#### 1. 今日速览
NanoClaw 项目在过去 24 小时内保持高度活跃，社区共产生了 **2 条 Issue 更新** 和 **7 条 PR 更新**。今日的项目重心明显偏向**安全审查与系统稳定性**：安全研究员提交了 2 个关于 A2A 文件转发和 MCP 动态加载的潜在安全漏洞；同时，开发者们积极提交了多个针对部署生命周期（如套接字竞争、孤儿进程清理）的修复 PR。项目今日成功关闭了 3 个 PR，整体正朝着更安全、更底层的基础设施完善方向迈进。今日无新版本发布。

#### 2. 版本发布
**本日无新版本发布 (0 个 Release)。**

#### 3. 项目进展
今日项目共有 3 个 PR 被关闭/合并，主要清除了部分历史遗留 Bug 和无效提交，推进了系统的稳定性：
*   **[CLOSED] PR #2825**: 修复了初始化时 `first chat`（首次对话）因服务端套接字未准备就绪而失败的问题。现在系统会主动等待 host socket，大幅提升了首次安装后的用户体验。
*   **[CLOSED] PR #2168**: 关闭并处理了一个长达一个多月的遗留问题（创建于 5 月初），修复了在 Rootless Docker 环境下，容器无法正确解析 `host.docker.internal` 指向 OneCLI 桥接 IP 的网络配置问题。
*   **[CLOSED] PR #2829**: 关闭了一个无效的/测试性质的提交（标题为 "eee"），保持了代码库的整洁。

#### 4. 社区热点
今日社区的讨论与贡献焦点集中在**智能体安全边界**与**部署运维体验**上：
*   **安全防护成为重中之重**：由 @YLChen-007 提交的两个安全 Issue（#2827, #2828）揭示了在复杂的 AI 自动化流程中，文件系统（Symlink）和动态配置（MCP 参数隐藏）极易成为 Prompt 注入或权限逃逸的攻击面。这表明项目已经引起了安全研究社区的深度关注，正面临企业级安全合规的考验。
*   **开发者运维痛点得到回应**：多位贡献者（@amit-shafnir, @Koshkoshinsk）集中针对 NanoClaw 的日常更新与卸载维护提交了优化 PR（#2826, #2830），反映出用户在实际物理机部署中，深受残留服务和更新遗漏的困扰。

#### 5. Bug 与稳定性
今日报告了 2 个高危安全漏洞，以及若干稳定性修复请求。按严重程度排列如下：

*   🔴 **[严重/安全] A2A 附件符号链接逃逸 (Issue #2828)**
    *   **详情**：在多智能体（A2A）通信中，如果目标 Agent 的 `inbox/` 目录被替换为符号链接，发送方 Agent 传输文件时会导致文件被写入到目标 Session 根目录之外，造成任意文件写入。
    *   **状态**：暂无对应修复 PR。
    *   **链接**：[Issue #2828](https://github.com/nanocoai/nanoclaw/issues/2828)
*   🔴 **[严重/安全] MCP Server 审批走私 (Issue #2827)**
    *   **详情**：`add_mcp_server` 流程存在缺陷，其审批卡片仅显示 MCP 服务名称和基础信息，隐藏了运行时的 `args` 和 `env`。恶意的 Agent 可借此绕过人类审查，走私恶意环境变量。
    *   **状态**：暂无对应修复 PR。
    *   **链接**：[Issue #2827](https://github.com/nanocoai/nanoclaw/issues/2827)
*   🟡 **[中等/体验] 对话过程中的文本重复 Bug (PR #2531)**
    *   **详情**：当在单次对话回合中触发 `send_message` 时，UI 层会出现重复的文本。
    *   **状态**：已提交修复 PR，目前正在等待合并。
    *   **链接**：[PR #2531](https://github.com/nanocoai/nanoclaw/pull/2531)

#### 6. 功能请求与路线图信号
从近期的 PR 活动中，可以洞察出 NanoClaw 接下来可能的发展方向：
*   **生命周期管理增强**：PR [#2830](https://github.com/nanocoai/nanoclaw/pull/2830) 提出自动清理已失效的 peer service（如被删除目录残留的 launchd/systemd 注册项）。这暗示项目正致力于实现“无痕卸载”与“环境自清洁”，这对个人 AI 助手长期驻留系统至关重要。
*   **自动化技能迭代**：PR [#2826](https://github.com/nanocoai/nanoclaw/pull/2826) 修改了 `/update-nanoclaw` 流程，强制提醒用户更新 Skills 并重建容器。表明项目正在强化 Host 与 Skills 之间的版本绑定与同步机制，避免用户错过关键的上游修复。
*   **可观测性扩展**：PR [#2795](https://github.com/nanocoai/nanoclaw/pull/2795) 计划引入 `/add-clidash`（只读 CLI 仪表盘技能）。说明社区对 AI 助手的运行状态可视化、日志监控有着强烈需求，这可能成为后续重点扩展的 Utility 类技能。

#### 7. 用户反馈摘要
从今日的 Issue 和 PR 描述中，可以提炼出以下真实用户痛点：
*   **卸载与部署不够干净**："Deleting a NanoClaw checkout without running its uninstaller leaves... OS keeps trying to launch the missing binary forever"（PR #2830）。用户在频繁测试或升级时，残留的后台服务不断累积，消耗系统资源，引发强烈不满。
*   **初次启动体验脆弱**：系统服务（systemd/launchctl）的异步启动导致用户完成安装后第一次聊天经常直接报错（PR #2825 已修复），给新用户留下了“不稳定”的第一印象。
*   **更新机制存在盲区**：过去系统将 Skill 更新视为“可选项”，导致许多用户更新了主程序却遗漏了关键的集成代码修复（PR #2826）。

#### 8. 待处理积压
提醒维护者关注以下积压或需及时响应的条目：
*   ⚠️ **[安全警报需响应]** Issue [#2827](https://github.com/nanocoai/nanoclaw/issues/2827) 和 Issue [#2828](https://github.com/nanocoai/nanoclaw/issues/2828) 均为安全漏洞，目前尚无官方回复或关联修复分支。建议优先介入评估影响范围并提供 Patch。
*   ⚠️ **[长期未合并 PR]** PR [#2531](https://github.com/nanocoai/nanoclaw/pull/2531) 自 5 月 18 日提交，至今已逾月，今日虽有更新但仍未合并。该修复涉及核心对话 UI 体验，建议维护者跟进审查或要求贡献者补充 Context 以便合并。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-06-22

## 1. 今日速览
IronClaw 项目今日保持**高活跃度**，过去 24 小时内共处理 31 个 PR 和 7 个 Issue，其中 15 个 PR 已顺利合并或关闭。从提交内容来看，团队当前正集中火力推进 **Reborn 架构** 的基础能力建设，包括并发执行调度（TurnRunScheduler）、托管级 PostgreSQL 支持，以及对 Engine V2 的全面兼容。此外，CI/CD 流水线的稳定性维护也是今日的重头戏，通过重设 Rust 编译缓存策略和重试机制，有效缓解了大规模并行测试带来的网络抖动问题。

## 2. 版本发布
**本日无新版本发布。**
考虑到目前主干上有多个涉及 `DB MIGRATION` 和架构演进（如单租户 Postgres 配置）的超大体积 PR（标记为 XL）正在合并，项目正处于积蓄重大架构更新的阶段。

## 3. 项目进展
今日项目整体向前迈出了坚实的一步，特别是在**运行时可靠性**、**统计准确性**和**自动化触发**方面取得突破：

*   **修复 Engine V2 LLM 使用量统计**：PR [#4989](https://github.com/nearai/ironclaw/pull/4989) 已合并，解决了 Engine V2 部署模式下管理后台 API 无法获取 LLM 消耗数据的痛点，将 Engine 流量正确归因到用户。
*   **引入单次自动化触发器**：PR [#5065](https://github.com/nearai/ironclaw/pull/5065) 合并，除了支持 Cron 周期任务，现在支持设定单次执行的定时触发器。
*   **修复冷启动频道激活 Bug**：PR [#2927](https://github.com/nearai/ironclaw/pull/2927) 解决了全新安装时，用户在向导中选择的 WASM 频道未正确激活的历史遗留问题。
*   **主动刷新 Google OAuth Token**：PR [#5071](https://github.com/nearai/ironclaw/issues/5071) 提出的需求已闭环，Reborn 现在会利用 refresh token 自动续期，避免用户每小时遇到重新认证的困扰。
*   **CI 基建大幅优化**：今日合并了多个 CI 优化 PR，包括跨 Crate 共享 Rust 缓存 ([#5118](https://github.com/nearai/ironclaw/pull/5118))、解决 crates.io 网络瞬时失败的自动重试机制 ([#5115](https://github.com/nearai/ironclaw/pull/5115))，以及抽取跨平台兼容性测试工作流 ([#5113](https://github.com/nearai/ironclaw/pull/5113))。

## 4. 社区热点
今日社区与开发者关注的焦点主要围绕 Reborn 的日常使用体验与工作流优化：

*   **IronClaw Reborn 本地内部测试追踪** ([#5119](https://github.com/nearai/ironclaw/issues/5119))：核心成员 @think-in-universe 发起了针对 6/22-6/28 周的本地 Dogfooding（自我托管测试）计划。这表明团队正极其重视 Reborn WebUI 在真实配置和首次启动场景下的可用性。
*   **统一 Gate 拒绝语义** ([#5120](https://github.com/nearai/ironclaw/issues/5120))：@hanakannzashi 提出了对授权、审批等流程中状态命名的重构请求（Deny vs Canceled vs Declined）。这反映了项目在走向成熟的过程中，开发者对代码整洁度和一致性的高要求。
*   **Automations 增加 "Completed" 状态看板** ([#5117](https://github.com/nearai/ironclaw/issues/5117))：用户 @henrypark133 指出自动化面板缺乏已执行完毕任务的统计，提出了补充 UI 界面空缺的明确增强方案。

## 5. Bug 与稳定性
今日报告并处理的 Bug 均得到了快速响应，部分已完全修复：

*   **[High] NEAR AI MCP 误报 "SETUP NEEDED"**：
    *   **状态**：已修复 (Issue [#4925](https://github.com/nearai/ironclaw/issues/4925)，Fix PR [#4990](https://github.com/nearai/ironclaw/pull/4990))。
    *   **详情**：由于将运行时凭证误当作浏览器管理扩展的配置需求，导致 UI 始终提示需要配置，影响用户的首次使用体验。
*   **[High] Nightly E2E 测试失败**：
    *   **状态**：待排查 (Issue [#4108](https://github.com/nearai/ironclaw/issues/4108))。
    *   **详情**：自动化的端到端夜间定时测试任务在今晨报错，主要涉及 v2-engine，需要关注是否为新代码引入的回归。
*   **[Medium] Google OAuth 频繁失效**：已修复（详见进展中的 [#5071](https://github.com/nearai/ironclaw/issues/5071)）。

## 6. 功能请求与路线图信号
从当前的活跃 PR 和 Issue 中，我们可以清晰看到 IronClaw 接下来几个版本的演进路线：

*   **并发处理能力跃升**：PR [#5085](https://github.com/nearai/ironclaw/pull/5085) 引入了 `TurnRunScheduler`，打破之前严格串行的 LLM 推理队列，引入基于用户和类型的并发上限控制。这是迈向多用户高并发场景的关键一步。
*   **企业级托管部署准备**：PR [#5081](https://github.com/nearai/ironclaw/pull/5081) 添加了 `hosted-single-tenant` 托管单租户模式，支持基于 PostgreSQL 的持久化状态，表明 IronClaw 正式开启云端托管服务的筹备。
*   **Agent 自我学习机制**：PR [#4937](https://github.com/nearai/ironclaw/pull/4937) (WS-1) 与 [#4975](https://github.com/nearai/ironclaw/pull/4975) (WS-3) 正在落地 Reborn 学习系统。它允许将 Agent 的失败或纠正操作转化为带置信度的“记忆文档”，这是提升智能体长期交互体验的重大特性。
*   **开放外部工具生态**：PR [#5094](https://github.com/nearai/ironclaw/pull/5094) 正在构建 OpenAI 兼容的 `/v1/models` 以及外部工具接入网关的基础设施；PR [#5109](https://github.com/nearai/ironclaw/pull/5109) 则直接接入了 Composio 连接器。

## 7. 用户反馈摘要
根据 Issue 反馈和核心团队的 Dogfooding 计划，目前真实用户的痛点高度集中在：

*   **配置与凭证管理的割裂感**：如同 [#4925](https://github.com/nearai/ironclaw/issues/4925) 所示，用户期望已经内置安装的工具（如 NEAR AI MCP）能做到“开箱即用”，对于需要底层配置 OAuth Key 的行为感到困惑。
*   **运行状态的透明度**：用户强烈希望知道后台自动化的执行情况（[#5117](https://github.com/nearai/ironclaw/issues/5117) 需求），以及 Engine V2 下的资源消耗占比（[#4985](https://github.com/nearai/ironclaw/issues/4985) 需求）。
*   **交互前端与 CLI/WASM 频道的一致性**：[#2927](https://github.com/nearai/ironclaw/pull/2927) 修了一个典型问题，即 WebUI 的向导操作没有正确同步到系统底层的频道激活逻辑中。

## 8. 待处理积压
*提醒维护者关注以下长期挂起或体量较大的待合并请求：*

*   **依赖更新积压**：来自 Dependabot 的多个大批量依赖升级 PR 处于 OPEN 状态，等待 Review，如 `everything-else` 组的 44 个依赖升级 ([#5116](https://github.com/nearai/ironclaw/pull/5116))、GitHub Actions 升级 ([#4002](https://github.com/nearai/ironclaw/pull/4002)) 以及 WASM 组件升级 ([#4032](https://github.com/nearai/ironclaw/pull/4032))。
*   **体积庞大且涉及迁移的 PR**：如关于并发执行的 [#5085](https://github.com/nearai/ironclaw/pull/5085) 和单租户 PostgreSQL 数据库架构变更的 [#5081](https://github.com/nearai/ironclaw/pull/5081)，涉及高风险的数据库迁移（DB MIGRATION 标签），需要更多的测试覆盖与人工 Review 确认。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

以下是为您生成的 LobsterAI 项目动态日报（2026-06-22）：

# LobsterAI 项目动态日报 (2026-06-22)

## 1. 今日速览
过去 24 小时内，LobsterAI 项目的整体代码活跃度处于停滞状态（PR 更新为 0，无新版本发布），但 Issue 追踪页面出现了大量变动。项目维护者（或自动化机器人）集中关闭了 14 条标记为 `[stale]` 的历史遗留 Issue，主要涉及 4 月份的 Bug 反馈与功能请求，这表明项目正在进行积极的积压清理与看板瘦身。然而，今日新报告的一个严重安全漏洞（SSRF 防护削弱）目前处于待处理状态，需要维护团队立即介入评估。

## 2. 版本发布
**本日无新版本发布。**

## 3. 项目进展
今日项目在代码主干上无合并进展（0 个 PR 更新）。在 Issue 维护方面，团队/自动化系统集中处理了历史积压，关闭了 14 条长时间未推进的陈旧（Stale）Issue。被关闭的议题涵盖了前端状态同步（如 #1500, #1502）、IM 机器人配置（#1504, #1512）、CI/CD 基础设施（#1518）以及多项 UI/UX 增强建议。此举有效降低了项目的 Issue 噪音，但由于这些关闭大多未关联对应的修复 PR，部分早期暴露的底层缺陷可能仍需社区通过最新代码验证是否依然存在。

## 4. 社区热点
今日社区最核心的动态是白帽安全研究员 **@YLChen-007** 提交的重量级安全报告：
- **[Security] LobsterAI restores private-network browser access by default and weakens the bundled OpenClaw SSRF guard** ([#2181](https://github.com/netease-youdao/LobsterAI/issues/2181))
**背后诉求与风险**：该 Issue 指出 LobsterAI 在浏览器设置层默认采用了 `ProxyCompatible` 模式，在没有明确存储浏览器策略时，可能会放宽对私有网络的访问限制，并削弱了内置 OpenClaw 的 SSRF（服务器端请求伪造）防护。这暴露了潜在的网络安全边界突破风险，是今日最需要紧急响应的社区反馈。

## 5. Bug 与稳定性
- **[严重 / 安全] OpenClaw SSRF 防护削弱与内网默认访问** ([#2181](https://github.com/netease-youdao/LobsterAI/issues/2181))
  - **状态**：开启（0 评论）
  - **详情**：涉及默认配置导致的内网穿透风险。目前暂无对应的 Hotfix PR 提交，存在较高安全风险。
- *(注：以下历史 Bug 今日已被批量关闭，若无其他底层重构，可能依然存在隐患，建议用户升级时留意)*
  - **[已关闭/历史] 技能禁用状态未同步**：禁用技能后仍保留在 `activeSkillIds` 中继续被调用 ([#1500](https://github.com/netease-youdao/LobsterAI/issues/1500))。
  - **[已关闭/历史] OAuth 认证静默失败**：关闭 Settings 面板未取消 Copilot OAuth 轮询，导致 Token 丢失 ([#1516](https://github.com/netease-youdao/LobsterAI/issues/1516))。

## 6. 功能请求与路线图信号
今日批量关闭的 Issue 中包含了多项关于“信息组织与管理”的高质量功能请求。虽然它们因长期未开发被标记为 Stale 关闭，但这强烈反映了重度用户在使用 LobsterAI 时的核心痛点，可作为未来路线图的参考储备：
1. **会话颜色标注** ([#1525](https://github.com/netease-youdao/LobsterAI/issues/1525))：希望像 VS Code 标签一样为不同类型的会话赋予颜色。
2. **标签分类与筛选** ([#1541](https://github.com/netease-youdao/LobsterAI/issues/1541))：将会话从线性列表升级为多维度分类（如工作、个人、实验）。
3. **消息书签/收藏** ([#1537](https://github.com/netease-youdao/LobsterAI/issues/1537))：长对话中标记关键代码或结论，便于快速回溯。
4. **会话批量导出** ([#1528](https://github.com/netease-youdao/LobsterAI/issues/1528))：支持一次性备份选中的多个会话为 JSON。
*信号分析*：当前项目在“单次 AI 交互”上已趋于完善，但“历史数据的管理与二次检索”是阻碍其成为重度生产力工具的瓶颈，用户急需 Notion / Obsidian 式的知识库管理体验。

## 7. 用户反馈摘要
提炼自今日涉及的 Issue 描述与历史评论：
- **IM 集成体验存在静默坑**：用户在接入钉钉、飞书、QQ 甚至网易 Popo 时，频繁遭遇校验缺失问题。例如：POPO 的 AES Key 未填竟也能保存 ([#1504](https://github.com/netease-youdao/LobsterAI/issues/1504))；QQ 机器人群组白名单竟然没有 UI 输入框 ([#1512](https://github.com/netease-youdao/LobsterAI/issues/1512))；定时任务选了 IM 频道但没选会话，运行时通知静默失败 ([#1506](https://github.com/netease-youdao/LobsterAI/issues/1506))。**用户强烈呼吁在表单提交前增加强制的前置校验。**
- **复杂任务执行缺乏“过程态”感知**：在生成 skills 文件时，系统长时间阻塞且无中间思考过程展示 ([#1509](https://github.com/netease-youdao/LobsterAI/issues/1509))，导致用户不知是卡死还是在运算。对比同类模型，用户反馈理解能力也存在偏差。

## 8. 待处理积压
- **[紧急待办] 安全漏洞修复跟进**：目前 Open 状态的 Issue 仅剩安全漏洞 [#2181](https://github.com/netease-youdao/LobsterAI/issues/2181)。维护团队需尽快确认该 SSRF 防护削弱问题是由于近期代码引入，还是历史配置遗留，并尽快提交限制内网访问策略的修复 PR。
- **[代码审查积压]**：由于近期 PR 合并数持续为 0，若主分支有正在进行的大规模重构（如 IM 模块或技能模块的底层重构），建议团队通过 GitHub Announcements 或里程碑同步当前进度，以免社区误判项目已停止维护。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下是为您生成的 **CoPaw (QwenPaw)** 项目 2026-06-22 动态日报：

---

# 📊 CoPaw (QwenPaw) 项目动态日报 
**日期**: 2026-06-22 | **数据来源**: [agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw)

## 1. 今日速览
今日 CoPaw 项目保持极高的社区活跃度，单日共有 15 条 Issue 更新（11 新开/活跃）和 29 条 PR 更新。从提交方向来看，**项目当前正处于“移动端 UI 适配”和“核心链路稳定性修复”的攻坚阶段**。社区贡献者（包含多名首次贡献者）集中提交了针对控制台各模块的响应式布局优化，同时针对近期版本（v1.1.12+）引入的消息队列串台、文件预览失效等回归问题进行了密集修复。

## 2. 版本发布
**今日无新版本发布。** 
目前项目主干处于 v1.1.12.post1 之后的快速迭代期，大量修复和 UI 优化 PR 正在集结，预计近期将迎来一个新的 Patch 版本。

---

## 3. 项目进展
今日项目整体在**移动端体验、测试覆盖率和插件架构解耦**方面迈出了一大步：
*   **架构解耦里程碑**：长期悬而未决的 PR [#4900](https://github.com/agentscope-ai/QwenPaw/pull/4900) 已关闭，该 PR 将插件加载器初始化与 Agent 启动过程解耦，彻底修复了 Tauri/PyInstaller 环境下插件系统超时未就绪的致命问题（对应 Issue [#4889](https://github.com/agentscope-ai/QwenPaw/issues/4889)）。
*   **移动端全面适配**：贡献者 @lecheng2018 和 @yaozy2020 集中提交/推进了 6 个控制台页面的移动端响应式布局重构，包括：[CronJobs 页面](https://github.com/agentscope-ai/QwenPaw/pull/5362)、[Sessions 页面](https://github.com/agentscope-ai/QwenPaw/pull/5364)、[Channels 页面](https://github.com/agentscope-ai/QwenPaw/pull/5369)、[安全设置页](https://github.com/agentscope-ai/QwenPaw/pull/5367)、[技能池页](https://github.com/agentscope-ai/QwenPaw/pull/5368) 以及 [Agent Config 页](https://github.com/agentscope-ai/QwenPaw/pull/5366)。
*   **工程化与测试基建**：PR [#5372](https://github.com/agentscope-ai/QwenPaw/pull/5372) 为 6 个产品模块新增了 26 个 E2E UI 测试用例；PR [#5270](https://github.com/agentscope-ai/QwenPaw/pull/5270) 关闭并合入了覆盖 ACP、插件、安全等模块的 Sprint 3 集成测试（64个用例），项目健壮性显著提升。

---

## 4. 社区热点
今日讨论度最高的问题反映了用户在**移动端使用**和**版本升级副作用**上的痛点：
*   🔥 **[#5360](https://github.com/agentscope-ai/QwenPaw/issues/5360) 先稳定核心再增加新功能**：社区强烈呼吁官方暂停加新特性，优先解决移动端适配差、Agent 交互阻塞等基础体验问题。结合今日大量的 Mobile PR，说明官方已听取该诉求并正在行动。
*   🔥 **[#5262](https://github.com/agentscope-ai/QwenPaw/issues/5262) 每次升级后被禁用的内置技能又重新启用 (8 评论)**：这是一个多次反馈的遗留问题，升级覆盖了用户的配置，严重影响了对内置工具（docx/xlsx等）有严格管控需求的用户。
*   🔥 **[#5329](https://github.com/agentscope-ai/QwenPaw/issues/5329) 手机端无法切换 Agent (5 评论)**：用户使用手机浏览器远程控制 backend，但因 UI 布局挤出屏幕导致无法切换 Agent，催生了侧边栏简洁模式的需求。

---

## 5. Bug 与稳定性
今日报告了多个关键 Bug，部分已有对应的修复 PR 在推进：

**🚨 严重**
*   **消息队列串台与会话锁死 ([#5354](https://github.com/agentscope-ai/QwenPaw/issues/5354))**：v1.1.12 新增的发送队列在切换 Agent 时，消息会误发给新 Agent，且原对话变灰无法切回。**[修复中]**：PR [#5371](https://github.com/agentscope-ai/QwenPaw/pull/5371) 和 [#5357](https://github.com/agentscope-ai/QwenPaw/pull/5357) 正在通过绑定 Agent ID 和释放嵌入模式锁来修复。
*   **API 静默丢弃消息 ([#5344](https://github.com/agentscope-ai/QwenPaw/issues/5344))**：当 Agent 处理繁忙时，通过 API 发送的消息返回 200 但被静默丢弃，极易导致多 Agent 交互断联。

**⚠️ 中等**
*   **文件/图片发送失效 (回归)**：
    *   [#5370](https://github.com/agentscope-ai/QwenPaw/issues/5370) `send_file_to_user` 导致 404 错误。
    *   [#5320](https://github.com/agentscope-ai/QwenPaw/issues/5320) v1.1.12 升级后图片无法在聊天框显示。**[已修复]**：PR [#5324](https://github.com/agentscope-ai/QwenPaw/pull/5324) 找到了 Root Cause（`content_disposition_type` 默认导致下载而非内联显示）。
*   **Shell 命令解析失败 ([#5373](https://github.com/agentscope-ai/QwenPaw/issues/5373))**：Agent 的 `execute_shell_command` 工具无法处理包含管道符(`|`)、重定向(`>`)等标准 Shell 语法，严重削弱代码执行能力。
*   **自定义 OpenAI 兼容模型不支持 Function Calling ([#5345](https://github.com/agentscope-ai/QwenPaw/issues/5345))**：OMLX 等兼容 API 在 QwenPaw 中只能返回文本，无法触发工具调用。

**🟡 轻微**
*   Mac 端 Chrome 浏览器无法拖拽上传附件 ([#5374](https://github.com/agentscope-ai/QwenPaw/issues/5374))。

---

## 6. 功能请求与路线图信号
通过 Issue 和 PR 洞察，CoPaw 未来的演进方向集中在以下三点：
1.  **上下文管理增强**：PR [#5321](https://github.com/agentscope-ai/QwenPaw/pull/5321) 引入了 Scroll 上下文管理策略，通过持久化存储至 SQLite 结合 Python REPL，让模型能按需回溯历史对话，这或将成为长文本记忆方案的重要补充。
2.  **高可用与容灾**：Issue [#5351](https://github.com/agentscope-ai/QwenPaw/issues/5351) 请求实现 `model_factory.py` 的模型自动故障转移，社区希望配置的 `local`/`cloud` 路由能够真正生效。
3.  **桌面端体验优化**：PR [#5326](https://github.com/agentscope-ai/QwenPaw/pull/5326) 提议关闭窗口时最小化到系统托盘，符合个人助理类应用的桌面常驻标准范式。

---

## 7. 用户反馈摘要
*   **痛点**：v1.1.12 引入消息队列（虽然提高了效率）但导致严重的上下文串台问题；文件和图片渲染在版本升级后频繁崩溃或无法预览。
*   **真实使用场景**：不少用户将 QwenPaw 部署在远程

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

**ZeptoClaw 项目动态日报**
**日期**: 2026-06-22 | **分析模型**: AI 智能体与个人助手开源项目追踪

---

### 1. 今日速览
今日 ZeptoClaw 项目整体活跃度表现为“低频但高价值”，无新版本发布及新增 Issue。项目活动完全聚焦于内部工程化建设，核心维护者 @qhkm 集中处理了关于 CI 流水线与二进制体积控制的关键任务。随着相关 Issue 的关闭与对应 PR 的合并，项目成功落地了代码合并的“硬性体积门禁”，进一步巩固了其“极致轻量化”的核心产品壁垒，项目工程健康度稳步提升。

### 2. 版本发布
* **无新版本发布**。
* (当前最新代码库已包含今日合并的 CI 强化更新，预计将随下一次发版生效)

### 3. 项目进展
今日项目重点推进了 **CI 自动化拦截与体积控制机制**的落地，这是轻量级 AI 智能体项目维持其核心竞争力的关键一步：
* **PR [#611](https://github.com/qhkm/zeptoclaw/pull/611) [已合并]: chore(ci): promote binary-size to PR gate at 7.5MB**
  * **进展说明**: 维护者去除了原有 GitHub Action 中的分支限制（`if:` guard），使得 `binary-size` 任务在**每一个 PR 提交时**都会强制运行。
  * **关键变更**: 将发布版本的体积红线设定为 **7.5MB**（基于 `profile.release.strip = true` 配置）。此举将体积检查从“事后追溯”升级为“事前拦截”，有效防止了代码膨胀。项目在质量保证（QA）与自动化流水线建设上迈出了实质性的一步。

### 4. 社区热点
今日社区虽无大量互动，但核心维护者沉淀了极具战略价值的讨论，焦点集中在**“极简架构的护城河”**上：
* **Issue [#537](https://github.com/qhkm/zeptoclaw/issues/537) [已关闭]: [chore, P1-critical] chore(ci): binary size budget gate**
  * **背后诉求**: 维护者明确提出，“6MB 的二进制体积是本项目的战略护城河（Strategic Moat）”。ZeptoClaw 作为一个个人 AI 助手，其核心场景涉及资源受限的硬件（如边缘计算、机器人等）。用户的隐性诉求是：项目在迭代和增加 AI 能力的同时，绝不能因为乱引依赖而导致“软件臃肿症”。此 Issue 的关闭标志着该共识已彻底转化为工程约束。

### 5. Bug 与稳定性
* **过去 24 小时内无新增 Bug 报告、崩溃或回归问题。**
* 结合今日落地的 CI 门禁，项目未来的稳定性（特别是包体积带来的部署稳定性）将得到极高保障。

### 6. 功能请求与路线图信号
* 今日无直接的 C 端用户新功能请求。
* **路线图信号提取**: 从今日合并的 PR #611 和 Issue #537 可以清晰地看出 ZeptoClaw 的下一阶段路线图基调：**“极度克制的资源占用”**。这意味着未来即将合入的新功能（无论是本地推理、记忆引擎还是工具链集成），都必须在 7.5MB 的残余体积空间内完成拼图。任何重度或庞大的第三方依赖在未来将被 PR 系统直接拒绝。

### 7. 用户反馈摘要
* 今日 Issue/PR 评论数为 0，无直接的用户互动反馈。
* 但从维护者的动作可以推断：ZeptoClaw 的受众群体高度看重**“边缘侧可部署性”**。在众多 AI Agent 框架动辄几十上百 MB 的当下，ZeptoClaw 维持个位数 MB 体积的能力，是其用户最核心的满意度来源。

### 8. 待处理积压
* **当前积压情况良好**。基于过去 24 小时的数据切片，项目暂无明显长期未响应的关键 Issue 或停滞 PR。
* 核心维护者 @qhkm 展现了极高的项目把控力与响应速度，能够将战略层面的考量（P1-critical）迅速转化为具体的 CI 代码并合并。项目当前处于极度健康的维护状态。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*