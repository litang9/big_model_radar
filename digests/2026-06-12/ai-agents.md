# OpenClaw 生态日报 2026-06-12

> Issues: 500 | PRs: 500 | 覆盖项目: 11 个 | 生成时间: 2026-06-12 03:37 UTC

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

以下是为您生成的 **OpenClaw 项目动态日报 (2026-06-12)**：

---

# 📊 OpenClaw 项目动态日报 (2026-06-12)

## 1. 今日速览
OpenClaw 项目在今日保持着极高的社区热度与开发活跃度。过去 24 小时内，项目迎来了 **Issues 与 PR 双双突破 500 条更新** 的峰值，其中新开/活跃 Issues 达 471 条，PR 合并/关闭达 123 条。项目正式发布了 `v2026.6.6-beta.2` 版本，核心重点在于**全面且深度的安全边界加固**。整体来看，项目正在高速迭代多平台与多模型支持，但由于新 Issue 涌入量巨大（关闭率仅约 5.8%），维护团队面临一定的社区吞吐压力。

## 2. 版本发布
- **[v2026.6.6-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6-beta.2)**
  - **更新重点**：全面大幅度收紧安全边界。
  - **详细说明**：此次更新涉及范围极广，覆盖了 transcripts（转录）、sandbox binds（沙箱绑定）、宿主环境继承、MCP stdio、Codex HTTP 访问、原生搜索策略、发送者权限提升检查、已删除代理的 ACP 绕过、环回工具、Discord 审核以及 Teams 群组操作等多个核心执行链路。
  - **影响与迁移**：安全策略的全面升级可能会对现有的权限继承和沙箱逃逸机制产生影响。对于在 Docker 或受限环境中运行的用户，升级后需严格测试 `exec` 工具和环境变量的挂载行为，以防被新策略误杀。

## 3. 项目进展
今日共有 123 个 PR 被合并或关闭，项目在系统健壮性、CLI 工具和跨平台集成上迈出了坚实的一步：
- **自动化与基础设施**：合并了 PR [#68936](https://github.com/openclaw/openclaw/pull/68936)，引入了基于 Claude Agent SDK 的 PR Review 自动修复流水线以及 Windows 后台守护进程，大幅降低了维护者的人工审查负担。
- **Cron 定时任务修复**：合并了 PR [#92304](https://github.com/openclaw/openclaw/pull/92304) 与 [#92295](https://github.com/openclaw/openclaw/pull/92295)，修复了 `cron edit` 时静默剥离时区 (`tz`) 和延迟 (`staggerMs`) 的严重回归问题。
- **前端与控制台**：合并了 PR [#92312](https://github.com/openclaw/openclaw/pull/92312)，优化了 Dashboard 历史投射逻辑，避免了仅包含 toolCall 的助手消息隐藏最近的用户上下文。

## 4. 社区热点
- **[109 评论] 跨平台桌面端需求持续爆发**：Issue [#75](https://github.com/openclaw/openclaw/issues/75)（Linux/Windows Clawdbot Apps）。目前 OpenClaw 仅支持 macOS 和移动端，大量用户表示 Linux 和 Windows 原生应用的缺失严重限制了使用场景。
- **[25 评论] AI 代理提交的 Issue**：Issue [#9443](https://github.com/openclaw/openclaw/issues/9443) 由用户的 AI 助理代为提交，请求提供预编译的 Android APK。这反映了 OpenClaw 在移动端部署的繁琐，也展示了项目在“AI 辅助开发”生态下的独特现象。
- **[12 评论] Exec 环境变量继承失效**：Issue [#31583](https://github.com/openclaw/openclaw/issues/31583)。`exec` 工具无法继承 `skills.entries` 配置的环境变量，导致涉及 API 密钥或密码注入的自动化流程中断，引发众多开发者共鸣。

## 5. Bug 与稳定性
今日报告了多个影响核心流程的严重 Bug（P1 级别），部分已有对应修复 PR：
- **🔴 [P1] 智能体会话上下文错乱**：Issue [#32296](https://github.com/openclaw/openclaw/issues/32296)。Agent 在多轮对话中会回复上一轮的旧消息。这是一个严重的会话管理回归问题。
- **🔴 [P1] 模型调用崩溃**：Issue [#38327](https://github.com/openclaw/openclaw/issues/38327)。升级到 2026.3.2 后，使用 `google-vertex/gemini-3.1-pro-preview` 时抛出 "Cannot convert undefined or null to object" 致命错误。
- **🟠 [P1] Docker 沙箱无法挂载**：Issue [#31331](https://github.com/openclaw/openclaw/issues/31331)。Docker 环境下沙箱的 `workspaceAccess` 完全失效，导致隔离环境不可用。
- **🟠 [P1] Telegram 频道消息阻塞**：Issue [#40611](https://github.com/openclaw/openclaw/issues/40611)。心跳机制修复（PR #39182）引入了副作用，导致活跃对话期间 Telegram 消息被阻塞。目前有相关修复 PR [#91921](https://github.com/openclaw/openclaw/pull/91921) 正在处理中。

## 6. 功能请求与路线图信号
结合近期的高优 PR 与 Issue，项目下一步的重点演进方向明确：
- **多模型动态发现与路由**：Issue [#10687](https://github.com/openclaw/openclaw/issues/10687) 提出了全面动态模型发现的 RFC。配合今日合并的 OpenAI embedding 修复 ([#92135](https://github.com/openclaw/openclaw/pull/92135))，项目正在积极消除不同 LLM 供应商之间的路由壁垒。
- **上下文与 Token 成本治理**：Issue [#22438](https://github.com/openclaw/openclaw/issues/22438) 提出分层加载 Bootstrap 文件以减少 Token 消耗。目前已有待合并的 PR [#85664](https://github.com/openclaw/openclaw/pull/85664) 正在重构 Gateway 级别的工具调用，这表明**“降本增效”**将是下个小版本的重点。
- **Sub-Agent 编排与并发控制**：Issue [#43367](https://github.com/openclaw/openclaw/issues/43367) 指出多智能体并行存在状态覆盖问题。关联 PR [#84758](

---

## 横向生态对比

以下是为您生成的开源 AI 智能体与个人助手生态横向对比分析报告（基于 2026-06-12 数据）：

---

# 📊 个人 AI 助手与自主智能体开源生态横向对比报告 (2026-06-12)

## 1. 生态全景
当前开源 AI 智能体生态正处于**从“单体对话”向“多智能体协同与复杂任务执行”演进的关键拐点**。安全隔离、多模型动态路由以及对底层算力的高效治理成为了各项目的核心发力点。同时，跨平台桌面端需求激增，但各项目在 Windows/Linux 环境下的适配均遭遇了不同程度的底层运行时阻力。

## 2. 各项目活跃度对比

| 项目名称 | 活跃 Issues (新开/更新) | PR 动态 (合并/待处理) | 版本发布情况 | 健康度与状态评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 471 | 123 / 严重积压 | `v2026.6.6-beta.2` (安全加固) | ⚠️ 极高负载。社区涌入海量 Issue，维护者面临吞吐量挑战。 |
| **IronClaw** | 15 | 25 / 22 | 无 (准备大版本跃升) | 🟢 高度健康。功能密集开发中，“Reborn”架构快速推进。 |
| **CoPaw** | 21 | 17 / 24 | `v1.1.11.post1/2` (紧急修复) | 🟡 承压运行。底层架构重构与表层严重 Bug 修复双线作战。 |
| **PicoClaw** | 7 | 18 / 13 | `v0.2.9-nightly` | 🟢 稳健迭代。高质量合入 MCP 与通道修复，企业级总线开发中。 |
| **Zeroclaw** | 47 | 3 / 47 | **`v0.8.0` (多智能体架构)** | 🟡 阵痛期。重量级架构更新引发大量配置迁移与阻断性 Bug 反馈。 |
| **NanoBot** | 3 | 6 / 12 | 无 | 🟢 良性健康。聚焦底层健壮性与 Python SDK 体验优化。 |
| **LobsterAI** | 2 | 14 / 1 | 无 | 🟢 极度高效。集中清理技术债，引入多模态语音交互突破。 |
| **NanoClaw** | 2 | 9 / 5 | 无 | 🟢 极速演进。底层多 Bot 实例架构落地，开启 SDLC 自动化工作流。 |
| **TinyClaw / ZeptoClaw / EasyClaw** | 0 | 0 | 无 | ⚪ 沉寂期。过去 24 小时无显著活动。 |

## 3. OpenClaw 在生态中的定位
*   **生态“锚点”与事实标准**：OpenClaw 以单日近 500 条的 Issue 活跃度稳居生态流量中心，其行为（如收紧沙箱、MCP 策略变更）直接决定了下游项目的兼容性走向（如 LobsterAI 需跟进修复其引发的 OOM）。
*   **技术路线差异**：相比于 NanoBot 的“轻量化引擎+WebUI”解耦路线，OpenClaw 呈现“大而全”的基础设施特征，在多平台原生应用、底层 Cron 调度、甚至 ACP 绕过防御上有着更重度的企业级诉求。
*   **规模与瓶颈**：虽然社区规模庞大，但 5.8% 的 Issue 关闭率暴露出其“大厂级”项目的通病——维护带宽严重跟不上用户群体的发散性需求，亟需像其刚合并的 AI PR Review 机器人来缓解人工压力。

## 4. 共同关注的技术方向
*   **多智能体协作与底层编排（Zeroclaw, PicoClaw, LobsterAI, NanoClaw）**
    *   从单 Agent 向多 Agent 过渡是今日最强烈的信号。Zeroclaw 发布了单进程多智能体架构；PicoClaw 推进 Agent Collaboration Bus；NanoClaw 实现了多 Bot 实例维度；LobsterAI 社区强烈呼吁引入 Manager 角色进行多智能体调度。
*   **安全边界与沙箱隔离加固（OpenClaw, IronClaw, CoPaw）**
    *   随着工具调用权限的扩大，安全问题频发。OpenClaw 全面收紧了 exec 和宿主环境继承；IronClaw 在解决 WASM 第三方扩展的越权拦截；CoPaw 修复了同机器多实例共享 Keychain 的隔离漏洞。
*   **桌面端跨平台与本地化适配阵痛（OpenClaw, CoPaw, PicoClaw）**
    *   跨平台桌面端目前是“重灾区”。OpenClaw 缺失 Win/Linux 原生应用引发众怒；CoPaw 在 Windows 上遭遇严重的 SSL 错误和进程无限增殖 OOM；PicoClaw 遭遇 Windows 路径分隔符不兼容问题。
*   **Token 消耗与上下文预算治理（OpenClaw, Zeroclaw, LobsterAI）**
    *   成本控制成为刚需。Zeroclaw 爆出系统提示词直接撑爆 32k 上下文预算的恶性 Bug；LobsterAI 用户投诉重复输出导致 Token 浪费；OpenClaw 正在尝试重构 Gateway 级别的工具调用以实现降本增效。

## 5. 差异化定位分析
*   **功能侧重**：
    *   **OpenClaw & Zeroclaw**：侧重于构建全面的智能体**运行时操作系统**，涵盖沙箱、MCP 路由、多智能体进程管理。
    *   **NanoBot & PicoClaw**：侧重于**通信中枢与网关**，重点打磨多渠道适配、协议解析 和开发者 SDK。
    *   **LobsterAI**：侧重于**多模态与数字员工体验**，在实时语音 (ASR) 输入、IM 办公集成上具有显著优势。
*   **目标用户**：OpenClaw / IronClaw 瞄准需要严格权限管控的**企业级私有化部署**；NanoClaw / NanoBot 则对**二次开发者与极客**更加友好。
*   **技术架构**：Zeroclaw 的 Rust 守护进程架构与 WebAssembly (WASM) 插件体系展现出极致性能追求；而 CoPaw 依托 Tauri + AgentScope 则代表了全栈 Web 技术向本地化渗透的流派。

## 6. 社区热度与成熟度
*   **快速迭代与阵痛期（Zeroclaw, OpenClaw, CoPaw）**：这三个项目今日均发布了重大更新或大量补丁，正遭遇系统级重构后的“Bug 爆发期”（如 Zeroclaw 的配置失效、CoPaw 的桌面端崩溃）。
*   **质量巩固与底层加固期**：NanoBot、PicoClaw 和 LobsterAI 处于更为稳健的阶段，今日动态多为修复内存泄漏、网关 OOM、静默丢弃消息等深层次稳定性问题，代码质量正在走向成熟。

## 7. 值得关注的趋势信号
1.  **AI 代理参与软件工程全生命周期**：AI 不仅在写代码，还在做运维。OpenClaw 引入 AI Review 自动修复流水线，NanoClaw 推出 *PR Factory* 自动拉起 Worker Agent 进行代码审查和分发分类。**“用 AI 开发 AI”已成业界标配。**
2.  **多智能体架构的“管理灾难”预警**：多智能体上线后，状态覆盖、权限错乱（Zeroclaw 的安全阻断）、消息重复推送问题集中爆发。下一步行业的竞争壁垒将从“谁能跑通多 Agent”转移到“谁能提供最直观、最稳定的多 Agent 监控与生命周期管理”。
3.  **本地运行时环境极其脆弱**：无论是 WSL2 的内存溢出、Windows 的证书错误，还是 32 位架构/路径不支持，都在

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 (2026-06-12)

## 1. 今日速览
NanoBot 项目在今日保持着**高度活跃且健康的开发势头**。过去 24 小时内，项目共处理了 18 个 Pull Requests（其中 6 个已合并/关闭）和 3 个 Issues。从活动轨迹来看，社区开发重心正显著向**提升系统稳定性（MCP 重连、会话历史异常）**、**扩展开发者工具（Python SDK 升级）**以及**架构解耦（桌面端应用外拆）**倾斜。整体而言，项目正处于功能快速迭代与底层健壮性补强并行的良性阶段。

## 2. 版本发布
**无新版本发布。** 
*(注：当前存在大量待合并的特性与修复 PR，预计项目正在为下一个 Minor 或 Major 版本做集中准备。)*

## 3. 项目进展
今日共有 6 个 PR 被合并或关闭，在多渠道适配、本地模型支持和消息处理稳定性上取得了实质性进展：
*   **多模态生态扩展**：合并了 [#4281](https://github.com/HKUDS/nanobot/pull/4281)，成功接入 SiliconFlow 作为转录提供商，复用了现有的 Whisper 适配器，降低了集成成本。
*   **即时通讯通道优化**：合并了 [#4289](https://github.com/HKUDS/nanobot/pull/4289)，为 Slack 频道引入了 `groupRequireMention` 配置，解决了白名单模式下机器人回复过于泛滥的痛点。
*   **本地大模型支持改善**：合并了 [#4020](https://github.com/HKUDS/nanobot/pull/4020)，使得流式超时配置可按 Provider 独立设置，彻底解决了本地 LLM（如 Ollama/LM Studio）在处理复杂提示词时频繁超时中断的问题。
*   **基础消息组件修复**：合并了 [#4257](https://github.com/HKUDS/nanobot/pull/4257)，修复了长消息在分割时破坏 Markdown 代码块结构的 Bug。
*   **废弃无效分支**：关闭了两个仅包含文档/Worktree 特性的测试 PR ([#4297](https://github.com/HKUDS/nanobot/pull/4297), [#4298](https://github.com/HKUDS/nanobot/pull/4298))。

## 4. 社区热点
今日最受关注的诉求是**“多自定义 Provider 支持”**。
*   用户 @smurfix 提交了 Issue [#4305](https://github.com/HKUDS/nanobot/issues/4305)，明确表达了在复杂业务场景下需要配置多个不同 OpenAI 兼容节点的强烈需求。
*   这一呼声与长期待合并的 PR [#3239](https://github.com/HKUDS/nanobot/pull/3239) 高度契合。该 PR 旨在打破系统仅支持单一 `custom` provider 的限制。这一需求的重合表明，多端点路由将是下一阶段基础设施升级的重点。

## 5. Bug 与稳定性
今日报告了数个关键性的崩溃与会话级 Bug，但社区响应极快，大部分已提交对应修复：
*   **[严重] Gateway 级别崩溃**：MCP 重连时触发 `RuntimeError` 导致网关宕机 ([#4302](https://github.com/HKUDS/nanobot/issues/4302))。**[已有修复]**：[@michaelxer] 提交了 [#4303](https://github.com/HKUDS/nanobot/pull/4303) 以关闭孤立的生成器。
*   **[严重] 孤立的工具调用结果**：会话历史中出现了不匹配的 `tool_call_id`，导致不兼容 OpenAI/Anthropic 接口的报错 ([#4006](https://github.com/HKUDS/nanobot/issues/4006))。**[已有修复]**：[@tangtaizong666] 提交了 [#4306](https://github.com/HKUDS/nanobot/pull/4306) 防止此类脏数据被持久化。
*   **[中等] Cron 子智能体生命周期异常**：Cron 任务产生的子智能体在后台异步运行，但主任务已被错误标记为完成 ([#4290](https://github.com/HKUDS/nanobot/issues/4290))。**[已有修复]**：[#4304](https://github.com/HKUDS/nanobot/pull/4304)。
*   **[已解决] Ubuntu 24.04 沙箱隔离失败**：由于新系统限制了非特权用户命名空间导致 bwrap 失效的 Bug ([#4236](https://github.com/HKUDS/nanobot/issues/4236))，已于今日正式关闭。

## 6. 功能请求与路线图信号
从最新的 PR 动态来看，项目正在酝酿几个重要的版本级特性：
*   **架构拆分与轻量化**：PR [#4294](https://github.com/HKUDS/nanobot/pull/4294) 提议将 Electron 桌面应用从核心代码库中移除，这标志着 NanoBot 可能在向“纯核心引擎+WebUI”的轻量化架构演进。
*   **自动化任务会话绑定**：PR [#4299](https://github.com/HKUDS/nanobot/pull/4299) 正在重构 Cron 定时任务，将其与特定会话绑定，表明项目在“自主规划与执行”的 Agent 场景下迈出了关键一步。
*   **开发者工具链完善**：PR [#4296](https://github.com/HKUDS/nanobot/pull/4296) 大幅扩展了 Python SDK，提供了更完善的 `RunResult` 和内存控制 API。结合 Skills 缓存优化 ([#4301](https://github.com/HKUDS/nanobot/pull/4301))，NanoBot 正在大幅提升开发者二次开发体验。

## 7. 用户反馈摘要
从 Issue 与 PR 记录中，可以提炼出当前真实用户的典型使用画像与痛点：
*   **企业级私有化部署需求剧增**：多位用户在对接内部 API 网关、不同云厂商端点时感到掣肘，亟需更灵活的 Provider 路由机制。
*   **重度依赖 RPA 与自动化调度**：用户在尝试让 NanoBot 执行后台巡检、复杂工作流时，遭遇了网关崩溃和异步子任务追踪丢失的问题，说明产品在 7x24 小时无人值守场景仍需打磨。
*   **开源生态模型接入诉求**：用户越来越频繁地将 NanoBot 接入本地模型或国内大模型（如 Moonshot/Kimi [#4295](https://github.com/HKUDS/nanobot/pull/4295)，SiliconFlow），暴露出默认超时时间和接口兼容性需要更加灵活。

## 8. 待处理积压
以下重要的长期 PR/Issue 仍处于 Open 状态，建议核心维护者关注并推进 Review：
*   **PR [#3239](https://github.com/HKUDS/nanobot/pull/3239) - 多自定义 Provider 支持**：已开启近 2 个月。随着今天同类需求 Issue ([#4305](https://github.com/HKUDS/nanobot/issues/4305)) 的再次爆发，建议优先评估并推进此 PR 合并。
*   **PR [#3538](https://github.com/HKUDS/nanobot/pull/3538) - Gateway 启停控制**：已开启 1 个多月，提供了重要的本地 runtime metadata 和 CLI daemon 化支持，是完善部署体验的关键拼图。
*   **PR [#4021](https://github.com/HKUDS/nanobot/pull/4021) - OpenAI Codex 请求去重**：修复底层 API 交互的 400 错误，对使用相关模型的用户体验影响较大，建议尽快排期合并。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下是为您生成的 **Zeroclaw** 项目 2026-06-12 动态日报。作为个人 AI 助手与智能体领域的开源项目，Zeroclaw 今日迎来了重大版本更新，社区活跃度极高。

---

# 📊 Zeroclaw 项目动态日报 (2026-06-12)

## 1. 今日速览
过去 24 小时内，Zeroclaw 项目迎来了**极高活跃度**与**重大架构演进**。项目正式发布了对标多智能体协作的重量级版本 **v0.8.0**，引入了单守护进程运行多命名智能体的全新架构。今日共有 50 条 Issues 更新（其中 47 条新开或处于活跃讨论中，3 条关闭），以及 50 条 PR 更新（目前有高达 47 条 PR 仍处于待合并状态，仅 3 条合并/关闭）。这表明 v0.8.0 的发布引发了大量新功能适配、配置迁移讨论及早期Bug反馈，社区正处于密集的提交与迭代期。

## 2. 版本发布
- **[v0.8.0 正式发布](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.0)**
  - **核心更新**：这是一个具有里程碑意义的大版本。现在，单个 Zeroclaw 守护进程可以运行**多个命名智能体**。
  - **独立沙箱**：每个智能体拥有各自独立的工作区、记忆、模型提供商、安全策略、通道配置和人格设定。
  - **架构重构**：重写了底层配置模式。
  - **迁移提示**：新版本引入了自动迁移机制，能够自动将现有的旧版配置无缝升级到新的 schema。详细破坏性变更需查阅官方迁移指南。

## 3. 项目进展
今日共合并/关闭了 3 个 PR，主要集中在修复 v0.8.0 发布过程中的关键阻断问题和多智能体架构下的路径继承：
- **PR [#7517](https://github.com/zeroclaw-labs/zeroclaw/pull/7517)**: `fix(runtime/subagent): inherit ACP session cwd into spawn_subagent and delegate` 
  - **意义**：修复了子智能体在 ACP 会话中无法正确继承当前工作目录（`cwd`）的问题，将其正确地从默认的 `~/.zeroclaw/agents/<alias>/workspace` 指向用户的实际仓库。这直接解决了 Issue [#7263](https://github.com/zeroclaw-labs/zeroclaw/issues/7263)，是多人/多智能体协作流的关键修复。
- **PR [#7519](https://github.com/zeroclaw-labs/zeroclaw/pull/7519)**: `fix(config): persist [[mcp.servers]] per-field edits via natural-key dirty-path walker` 
  - **意义**：修复了配置写入逻辑。在新增通过自然键编辑 `[[mcp.servers]]` 的功能后，底层增量写入器未正确处理数组表，导致配置无法持久化。
- **PR [#7520](https://github.com/zeroclaw-labs/zeroclaw/pull/7520)**: `fix(ci): install cross g++ for ARM glibc release builds` 
  - **意义**：修复了 CI 流水线，确保 ARM 架构的 glibc release 版本能正常编译发布。

## 4. 社区热点
今日讨论最激烈的 Issues 围绕着 v0.8.0 的 MCP 工具调用与多智能体安全策略展开：
- **Issue [#6699](https://github.com/zeroclaw-labs/zeroclaw/issues/6699) (7条评论)**：MCP 工具前缀校验存在 Bug。社区指出 `tool_filter_groups` 配置对真实的 MCP 工具无效，且未与 `deferred_loading` 集成。这是一个高风险（S1）的阻断性问题。
- **Issue [#7470](https://github.com/zeroclaw-labs/zeroclaw/issues/7470) (7条评论)**：代理模式下的安全阻断。当委托目标（delegated target）的 `risk_profile.allowed_tools` 为空时会导致失败，严格的安全策略阻止了更严苛的代理目标。社区正在探讨如何平衡多智能体委派模式下的权限颗粒度。

## 5. Bug 与稳定性
今日报备了大量高严重程度的 Bug，尤其是与 v0.8.0 升级和新特性相关的：
- **🔴 S0/S1 严重级别 (工作流阻断/系统崩溃)**：
  - **[#7523](https://github.com/zeroclaw-labs/zeroclaw/issues/7523)**：v0.8.0 发布后的即刻反馈——macOS 通过 Homebrew 安装后，Web Dashboard 无法访问。提示需要手动执行 `cargo web build`，严重阻塞了用户的图形化体验。
  - **[#5542](https://github.com/zeroclaw-labs/zeroclaw/issues/5542)**：在 WSL2 环境下运行时频繁发生连续 OOM（内存溢出）导致进程被杀。
  - **[#5808](https://github.com/zeroclaw-labs/zeroclaw/issues/5808)**：默认 32k 上下文预算在第一次 LLM 迭代（仅系统提示词+工具定义）就超标 3.3 倍，导致持续被裁剪，智能体陷入死循环。（已有修复意向 PR [#6085](https://github.com/zeroclaw-labs/zeroclaw/pull/6085) 处理默认配置裁剪逻辑）。
  - **[#6434](https://github.com/zeroclaw-labs/zeroclaw/issues/6434)**：即使配置了 `[autonomy] level = "full"`，Shell 工具调用依然会被拒绝。
- **其他稳定性问题**：
  - **[#6302](https://github.com/zeroclaw-labs/zeroclaw/issues/6302)**：调用 Gemini 模型时，因错误地将 `assistant` turn 置于首个 `user` turn 之前导致 400 报错。

## 6. 功能请求与路线图信号
- **集群化管理**：Issue [#6390](https://github.com/zeroclaw-labs/zeroclaw/issues/6390) 提出了 `zeroclaw node add <url>` CLI 命令，旨在允许将远程守护进程注册到主节点。这释放了 Zeroclaw 向**分布式多机集群 AI 智能体网络**演进的强烈信号。
- **通道扩展**：Issue [#6443](https://github.com/zeroclaw-labs/zeroclaw/issues/6443)（已关闭并接纳）提议增加 Twitch 聊天通道支持。鉴于 Twitch 基于 IRC 协议，这是扩展 AI 智能体直播互动场景的高性价比方案。
- **底层重构**：PR [#7429](https://github.com/zeroclaw-labs/zeroclaw/pull/7429) 正在引入 `wasmtime` 依赖，准备替代现有的 Extism，这预示着未来插件系统的沙箱执行效率与安全性将大幅提升。

## 7. 用户反馈摘要
- **新架构的上手阵痛**：用户对于多智能体、MCP 与权限控制（`risk_profile`）结合时的复杂度感到困惑，目前配置层面的细微遗漏（如空数组、前缀匹配错误）极易导致智能体完全停止工作。
- **本地化体验不足**：Issue [#6548](https://github.com/zeroclaw-labs/zeroclaw/issues/6548) 反映，即使在配置了 `zh-CN` 等非英语 locale 的情况下，Channel 运行时的命令回复依然硬编码为英文。
- **Docker 部署仍有门槛**：用户在更新到新版本后，发现 Docker 部署的 Gateway 与 Web UI 需要手动调整 YAML 缩进才能跑通（参考 [Issue #6760](https://github.com

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

以下是为您生成的 **PicoClaw** 项目 2026年6月12日 开源项目动态日报：

---

# 📊 PicoClaw 项目动态日报 (2026-06-12)

## 1. 今日速览
过去 24 小时内，PicoClaw 项目保持了**高度活跃**的开发状态。项目共处理了 31 个 Pull Requests（其中 18 个已合并/关闭）和 7 个 Issues。团队于今日推出了 `v0.2.9-nightly.20260612` 每日构建版本，合并了多项关键性 Bug 修复（包括流式输出丢失工具调用、模型 ID 配置错误等），并升级了大量前后端核心依赖。此外，社区正在积极讨论多智能体协作架构及视觉模型幻觉等深层次痛点，整体项目健康度良好，迭代节奏稳健。

## 2. 版本发布
- **[nightly] Nightly Build for v0.2.9-nightly.20260612.413d3749**
  - **链接**: [Releases](https://github.com/sipeed/picoclaw/compare/v0.2.9...main)
  - **概览**: 自动化发布的每日构建版本。集成了今日合并的多项修复，包括 MCP 动态 Header 透传、WhatsApp Native 模式支持、Go SDK 错误处理优化等。
  - **⚠️ 注意事项**: 官方提示该版本为自动构建，可能存在不稳定性，不建议直接用于生产环境。

## 3. 项目进展
今日共有大量高质量 PR 被合并，项目在通道兼容性、协议支持和底层稳定性上迈出坚实一步：
- **MCP 协议增强**: 合并了 PR [#2696](https://github.com/sipeed/picoclaw/pull/2696)，支持从通道上下文向 MCP 服务器按请求动态透传 HTTP Headers（如 Authorization），极大增强了多租户和鉴权场景下的可用性。
- **通道修复**: 
  - 修复了 WhatsApp 原生模式配置检测问题 ([#2934](https://github.com/sipeed/picoclaw/pull/2934))。
  - 修复了流式传输期间 `tool_calls` 消息被错误过滤的严重 Bug ([#2957](https://github.com/sipeed/picoclaw/pull/2957))。
- **配置与 UI 修复**: 修复了 UI 中“Session Scope”无法持久化保存的问题 ([#3067](https://github.com/sipeed/picoclaw/pull/3067))；修复了 Anthropic `claude-sonnet-4.6` 默认模型 ID 格式错误导致的 404 问题 ([#2947](https://github.com/sipeed/picoclaw/pull/2947))。
- **依赖大升级**: 合并了多项 Dependabot 提交，前端（Vite 8, Eslint 10, Shadcn 4.11）与后端（AWS SDK, MCP Go SDK 1.6.1）依赖均进行了大幅更新。

## 4. 社区热点
- **WebSocket 轮次完成信号需求** ([#2984](https://github.com/sipeed/picoclaw/issues/2984))：该 Issue 获得了 **2 个 👍** 且讨论活跃。开发者指出，外部客户端目前无法准确判断智能体是否已完全处理完一条消息（缺乏明确的结束信号）。这反映出社区将 PicoClaw 作为后端 Agent 引擎深度集成时的强烈诉求。
- **Windows 路径兼容性问题** ([#2472](https://github.com/sipeed/picoclaw/issues/2472))：收获了 **5 条评论和 1 个 👍**。由于 Go 语言的 `fs.FS` 严格限制路径分隔符，导致 `list_dir` 工具在 Windows 环境下直接报错。这是跨平台部署中极其典型的痛点，亟待官方修复。

## 5. Bug 与稳定性
按严重程度排序，今日新增/活跃的 Bug 如下：
- **🚨 [严重] 子代理任务重复推送到 IM 通道** ([#3094](https://github.com/sipeed/picoclaw/issues/3094))：使用 `spawn` 工具时，由于 `ForUser` 字段被双重调用，导致 Telegram/飞书等通道收到排版粗糙的原始结果和主代理汇总两条重复消息。（状态：Open，暂无关联 Fix PR）
- **⚠️ [中等] 无视觉能力模型产生幻觉** ([#3108](https://github.com/sipeed/picoclaw/pull/3108))：当使用纯文本模型（如 deepseek-v4-flash）触发图片描述时，系统不仅没有拦截，反而返回了与图片无关的幻觉内容。需在前端或工具层增加多模态能力的预检机制。（状态：Open，暂无关联 Fix PR）
- **🔒 [安全] 启动器 `allowed_cidrs` 绕过漏洞** ([#3080](https://github.com/sipeed/picoclaw/issues/3080))：在首次运行设置期间，可通过同主机环回代理绕过 CIDR 白名单限制。（状态：已 Closed，推测已在底层处理）

## 6. 功能请求与路线图信号
- **多智能体架构演进**：提交于 5 月底的巨型 PR [#2937](https://github.com/sipeed/picoclaw/pull/2937)（*Agent Collaboration Bus*，包含独立邮箱、线程隔离、权限控制等）今日仍在活跃更新中。这表明项目正致力于构建企业级的复杂 Multi-Agent 通信拓扑，极有可能是 v0.3.0 版本的核心主打功能。
- **MCP 命令行解析优化**：PR [#3048](https://github.com/sipeed/picoclaw/pull/3048) 提出修复 MCP 添加工具时，全局参数被误判为未知参数的问题。提升了 CLI 的容错率，目前正在审查中。

## 7. 用户反馈摘要
- **真实痛点 1：多端部署兼容性不足**：大量用户尝试在 Termux (Android) 或 Windows 环境部署，遭遇了 32 位架构不支持 ([#2954](https://github.com/sipeed/picoclaw/issues/2954))、路径分隔符不兼容等挫折，建议项目加强边缘环境的 CI/CD 测试。
- **真实痛点 2：智能体状态监听不透明**：通过 [#2984](https://github.com/sipeed/picoclaw/issues/2984) 可以看出，开发者希望集成 PicoClaw 时拥有更精细的生命周期钩子（如明确的 `turn.end` 事件），而不仅仅是依靠 `typing.stop` 等前端 UI 动作来推测。
- **真实痛点 3：配置持久化问题**：用户在 WebUI 中辛苦修改的会话配置，刷新后丢失 ([#3067](https://github.com/sipeed/picoclaw/pull/3067) 已修复)，暴露出前后端状态同步机制此前存在瑕疵。

## 8. 待处理积压
以下高价值 PR / Issue 长期未合并或响应，建议维护者 (@sipeed) 关注：
- **[PR] #2937 Feat/agent collaboration**: 核心架构升级，涉及大量代码，需投入精力进行 Code Review 以防阻塞后续开发。
- **[PR] #2956 保留通道 enabled 状态**: 修复 `security.yml` 加载覆盖配置的问题，状态为 Open，等待合并。
- **[Issue] #3094 与 #3108**: 今天刚爆出的严重 Bug，涉及 Multi-agent 推送逻辑和多模态校验，需尽快排期确认。

---
*本期日报由 AI 智能体基于 GitHub 公共数据分析生成，感谢 PicoClaw 开源社区贡献者的辛勤付出。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 (2026-06-12)

## 1. 今日速览
NanoClaw 项目在过去24小时内展现出极高的开发活跃度与迭代速度，共计产生 14 个 PR 更新和 2 个 Issue 更新。核心贡献者 @gavrielc 集中提交并关闭了大量底层架构与功能增强 PR，推动项目在多通道集成、容器生命周期及审批机制上取得重大进展。值得注意的是，项目重心目前正向多智能体底层架构及自动化测试、审查工作流转移，整体项目健康度优异，代码流转效率极高。

## 3. 项目进展
今日共有 9 个 PR 顺利合并或关闭，项目整体在底层架构和健壮性上迈出了重要一步：
*   **多智能体底层支持**：合并了 `feat(channels): native channel-instance dimension — multi-bot substrate` ([#2733](https://github.com/nanocoai/nanoclaw/pull/2733))，标志着 NanoClaw 正式向多 Bot 实例底层架构演进，为复杂场景下的多智能体协同打下基础。
*   **模块化解耦与拓展性提升**：关闭了关于审批回调注册 ([#2737](https://github.com/nanocoai/nanoclaw/pull/2737))、交付动作读取端 ([#2734](https://github.com/nanocoai/nanoclaw/pull/2734)) 以及原生 Webhook 路由注册 ([#2739](https://github.com/nanocoai/nanoclaw/pull/2739)) 的 PR，极大增强了模块的观察与拓展能力。
*   **容器生命周期优化**：合并了按组设置空闲超时的功能 ([#2740](https://github.com/nanocoai/nanoclaw/pull/2740))，使得临时会话能够更加优雅地退出并清理资源。

## 4. 社区热点
今日社区最受关注的讨论是关于**智能体记忆系统的重新设计**：
*   **[OPEN] Agent memory system redesign** ([#1356](https://github.com/nanocoai/nanoclaw/issues/1356))：该 Issue 获得了 **6 个 👍** 和 **2 条深度评论**。作者 @Ordinath 指出，当前基于 `MEMORY.md` 索引加上卫星 Markdown 文件的架构在达到 ~54 个文件 / 83 KB 规模时已显露扩展瓶颈。社区正在探讨如何设计一套更全面、具备高扩展性的新型记忆系统，这反映了用户在复杂长对话场景下对 AI 长期记忆的强烈需求。

## 5. Bug 与稳定性
今日修复了多个关键的静默失败和逻辑漏洞，显著提升了系统稳定性：
*   **严重 (已修复)**：`writeOutboundDirect` 以只读模式打开数据库，导致命令门禁的拒绝响应被静默丢弃。该 Bug 由 @SebTardif 在 Issue ([#2495](https://github.com/nanocoai/nanoclaw/issues/2495)) 报告，随后由 @gavrielc 提交 PR ([#2738](https://github.com/nanocoai/nanoclaw/pull/2738)) 于今日关闭并修复。
*   **严重 (待合并)**：`ncl wirings create` 命令在创建时静默跳过了 `agent_destinations` 的副作用写入，导致智能体发送到新聊天的消息直接丢失。目前已提交修复 PR ([#2743](https://github.com/nanocoai/nanoclaw/pull/2743))。
*   **中等 (待合并)**：Signal 适配器静默丢弃了智能体的 `add_reaction` 工具输出，导致表情回应功能失效。修复 PR ([#2744](https://github.com/nanocoai/nanoclaw/pull/2744)) 已提交。
*   **边缘情况 (已修复)**：解决了宿主清理机制对刚唤醒且带有陈旧处理声明的容器缺乏宽限期的问题 ([#2736](https://github.com/nanocoai/nanoclaw/pull/2736))。

## 6. 功能请求与路线图信号
*   **SDLC 流程自动化（CI/CD AI 化）**：@gavrielc 提交了 `[OPEN] feat(recipes): the PR Factory` ([#2742](https://github.com/nanocoai/nanoclaw/pull/2742))。该功能允许在开启 PR 时自动启动一个专属的 Worker Agent，在 Slack 中建立线程来进行代码分类、Diff 审查和测试计划。这释放了一个强烈的信号：**NanoClaw 正在利用自身的 AI Agent 能力来重构开发者的日常工作流**。
*   **生产级健壮性防线**：@caburi00 提交了 `[OPEN] Harden host + agent-runner` ([#2732](https://github.com/nanocoai/nanoclaw/pull/2732))，基于对抗性健康审计修复了 Docker Desktop 崩溃循环、并发生成断路器等底层核心问题。这表明项目正在为生产环境的大规模部署做最后的安全加固。

## 7. 用户反馈摘要
*   **对持久化记忆的焦虑**：从 Issue #1356 的讨论中可以看出，高级用户在将 Agent 投入长期使用时，对当前轻量级文件记忆的丢失和检索效率感到担忧，期待向量数据库或更结构化的记忆引擎引入。
*   **初始化与上下文交接的痛点**：PR ([#2741](https://github.com/nanocoai/nanoclaw/pull/2741)) 的修复背景显示，开发者在使用 Setup 流程与 Claude 进行交互时，上下文传递失败导致 AI “静默罢工”（不响应），这反映出在复杂 CLI 交互场景下，用户对智能体“状态感知”的稳定性有更高的期待。

## 8. 待处理积压
*   **[OPEN] docs(signal): group typing, outbound reactions, quote-reply fix** ([#2685](https://github.com/nanocoai/nanoclaw/pull/2685))：该文档更新 PR 自 06-04 开启至今已有一周，目前受到相关功能代码修复 PR（如 #2744）的阻塞。建议维护者在代码 PR 合并后，尽快同步审查并关闭此文档 PR，以防文档与实际代码表现产生脱节。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-06-12)

## 1. 今日速览
IronClaw 项目今日保持极高的开发活跃度，过去 24 小时内共有 30 个 Issue（新开/活跃 15 个，关闭 15 个）和 47 个 PR（待合并 22 个，合并/关闭 25 个）发生状态更新。**“Reborn”架构（特别是 WebUI v2 和本地开发环境）依然是当前绝对的核心焦点**。项目目前处于功能密集开发与早期用户集中测试的叠加期：一方面，核心团队在大力推进 Configuration-as-Code、自动化 E2E 测试等基础设施；另一方面，社区和内部测试人员（如 @sunglow663, @think-in-universe）提交了大量关于 WebUI 交互、工具调用稳定性和凭证配置的反馈，且大部分严重阻塞流程的 Bug 已经得到了迅速的响应和修复。整体来看，项目迭代速度极快，处于高度健康的向前演进状态。

## 2. 版本发布
**今日无新版本发布。**
*注：* 尽管没有正式发布，但持续更新的发布准备 PR [#3708](https://github.com/nearai/ironclaw/pull/3708) 显示，项目正在酝酿一次较大的版本跃升（如 `ironclaw` 从 0.24.0 升至 0.29.1，`ironclaw_common` 升至 0.5.0），其中包含部分 API 的破坏性变更。开发者需持续关注该 PR 的合并动态。

## 3. 项目进展
今日有大量关键 PR 被合并，主要围绕 **Reborn 生产环境就绪、WebUI v2 交互完善和扩展调度稳定性** 展开：
*   **可观测性提升**：合并了 [#4760](https://github.com/nearai/ironclaw/pull/4760)，将 WebUI v2 的日志页面连接到了真实的内存日志源，填补了此前的空壳页面。
*   **自动化任务修复**：合并了 [#4757](https://github.com/nearai/ironclaw/pull/4757)，修复了 Automations 页面中点击触发运行时出现白屏 404 的问题。
*   **Slack 集成闭环**：合并了 [#4782](https://github.com/nearai/ironclaw/pull/4782)，统一了出站状态存储，修复了 WebUI 配置 Slack 投递默认值无效的底层问题。
*   **扩展与鉴权网关**：合并了 [#4744](https://github.com/nearai/ironclaw/pull/4744)，强化了扩展激活机制并修复了 GSuite OAuth 的复用问题。
*   **错误处理优化**：合并了 [#4784](https://github.com/nearai/ironclaw/pull/4784)，将 Capability 运行时的不可用状态转换为正常的工具失败处理，而非直接中断整个 Agent 循环。

## 4. 社区热点
*   **[EPIC] 配置即代码**：[#3036 [OPEN]](https://github.com/nearai/ironclaw/issues/3036)。该 Epic 旨在让运维人员能够声明式地配置 IronClaw（取代混乱的 `.env` 和手工 JSON 编辑）。今日该议题恢复了活跃（评论数达 7 条，1 个点赞），表明 Reborn 的企业级部署需求正在被提上实质性的排期。
*   **本地测试体验反馈集**：[#4692 [OPEN]](https://github.com/nearai/ironclaw/issues/4692)。由 @think-in-universe 发起的本地 Reborn WebUI 测试汇总贴，成为当前测试阶段的焦点，孵化出了多个子 Issue。
*   **巴塞罗那黑客松分支**：[#4787 [OPEN]](https://github.com/nearai/ironclaw/pull/4787)。社区贡献者 @elliotBraem 为即将到来的黑客松维护了一个稳定派生版本，增加了提交流程等扩展，反映了社区对基于 IronClaw 构建生态的参与热情。

## 5. Bug 与稳定性
今日报告了多个与工具调用和 WebUI 路由相关的 Bug，总体集中在“异常状态未优雅处理”：
*   **严重（工具链阻断）**：
    *   [#4761 [OPEN]](https://github.com/nearai/ironclaw/issues/4761)：Agent 在经历多次工具失败后会直接停止，无法自我恢复。
    *   [#4762 [OPEN]](https://github.com/nearai/ironclaw/issues/4762)：工具执行失败导致后续的消息和活动排序混乱。
*   **中等（WASM 扩展执行拦截）**：
    *   [#4783 [OPEN]](https://github.com/nearai/ironclaw/issues/4783)：无凭证的纯计算 WASM third-party 扩展在调度时，会在执行前被错误的 `network` obligation 拦截。
*   **轻微（UI 与路径解析）**：
    *   [#4759 [OPEN]](https://github.com/nearai/ironclaw/issues/4759)：使用工作区相对路径保存文件时，路径出现重复拼接。
    *   [#4751 [OPEN]](https://github.com/nearai/ironclaw/issues/4751)：请求生成超长文本（如 3000 字）时，触发 Provider 工具参数超过 16384 bytes 的限制错误。

## 6. 功能请求与路线图信号
*   **全局工具授权机制**：[#4776 [OPEN]](https://github.com/nearai/ironclaw/issues/4776)。用户请求增加全局的 "Always Allow" 设置，以免每次调用都需要手动批准（如 `builtin.http`）。这反映了重度用户对减少交互打断的迫切需求。
*   **工作区文件可视化**：[#4750 [OPEN]](https://github.com/nearai/ironclaw/issues/4750)。当前 Agent 在工作区创建的文件无法在 WebUI 中直观发现，用户需要将此功能集成到 UI 中。
*   **Reborn 自动化 QA 体系**：[#4775 [OPEN]](https://github.com/nearai/ironclaw/issues/4775) 与 PR [#4769 [OPEN]](https://github.com/nearai/ironclaw/pull/4769)。核心团队正在大规模构建针对 Reborn 二进制文件的 E2E 测试集，目标是实现完全无需人工干预的 CI 自动化验证。

## 7. 用户反馈摘要
从近期集中反馈的本地部署问题中，可以提炼出以下用户痛点：
1.  **凭证配置割裂感**：用户（如 @sunglow666）指出，通过 UI 界面配置的 NEAR AI 或 ChatGPT 凭证，在重启后或底层模型选择时未被正确读取（[#4766](https://github.com/nearai/ironclaw/issues/4766), [#4703](https://github.com/nearai/ironclaw/issues/4703)），UI 状态与底层 Runtime 存在同步延迟。
2.  **审批流缺乏上下文**：当 Agent 请求执行 Shell 或 HTTP 操作时，弹出的审批框过于简陋，没有明确告知用户将执行什么命令或访问什么 URL（[#4764](https://github.com/nearai/ironclaw/issues/4764), [#4701](https://github.com/nearai/ironclaw/issues/4701)），引起安全顾虑。
3.  **SSO 登录障碍**：本地环境下的第三方 SSO 登录（如 GitHub/Google）出现回调配置错误（[#4705](https://github.com/nearai/ironclaw/issues/4705)），对新手入门不友好。

## 8. 待处理积压
*   **Nightly E2E 持续失败**：[#4108 [OPEN]](https://github.com/nearai/ironclaw/issues/4108)。由 GitHub Action 自动报告的 E2E 测试失败已持续数日（最新更新为 6-11），包括扩展相关的测试用例失败，需要 CI/CD 维护团队介入。
*   **大规模功能分支挂起**：[PR #4588](https://github.com/nearai/ironclaw/pull/4588)（可观测性埋点）和 [PR #4772](https://github.com/nearai/ironclaw/pull/4772)（WebChat v2 UI 批量修复）均为核心功能且体积较大（Size: L/XL），目前处于 Open 状态等待 Review，是推进下一阶段发布的关键阻碍。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

以下是为您生成的 LobsterAI 项目动态日报（2026-06-12）：

# 📊 LobsterAI 项目动态日报 (2026-06-12)

## 1. 今日速览
过去 24 小时内，LobsterAI 展现了**极高的代码合并与清理活跃度**。项目共处理了 15 个 Pull Requests，其中高达 14 个已被合并或关闭（包含大量历史遗留的 Stale PR），仅 1 个待合并，显示出维护团队在整理技术债务和推进新功能上的坚决执行力。
今日无新版本发布，但底层架构和多模态交互迎来了重要更新。社区方面保持平稳，2 个活跃 Issues 集中在多 Agent 架构演进的深度探讨以及输出 Token 消耗异常的疑问上。整体而言，项目正处于功能快速迭代与稳定性加固并重的健康阶段。

## 2. 版本发布
*   **无新版本发布**。今日虽有大量代码合入，但未触发新的 Release Tag。

## 3. 项目进展
今日项目整体向前迈进了坚实的一步，主要体现在**多模态交互、稳定性修复及历史债务清理**上：
*   **实时语音交互突破**：合入了 `feat(cowork): add realtime ASR voice input` ([#2148](https://github.com/netease-youdao/LobsterAI/pull/2148))，通过 WebSocket 流式发送麦克风 PCM 音频实现实时识别文本回填，标志着 Cowork 模块语音输入体验的重大升级。
*   **系统稳定性与内存治理**：
    *   修复了 OpenClaw 网关长时间运行多渠道并发时的 OOM 崩溃问题，显式提升了 V8 old-space 堆内存限制 ([#2149](https://github.com/netease-youdao/LobsterAI/pull/2149))。
    *   将慢速网关下的预发送模型同步超时时间从 30s 提升至 90s，减少了冷启动时的消息丢失率 ([#2152](https://github.com/netease-youdao/LobsterAI/pull/2152))。
    *   修复了用户在会话启动前停止操作导致的竞态异常发送问题 ([#2147](https://github.com/netease-youdao/LobsterAI/pull/2147))。
*   **分享与 UI 体验优化**：
    *   完善了 HTML 分享机制，支持创建和切换“分享码”与“公开访问”模式 ([#2146](https://github.com/netease-youdao/LobsterAI/pull/2146))。
    *   修复了专家套件控件在滚动时的吸顶问题 ([#2150](https://github.com/netease-youdao/LobsterAI/pull/2150))。
*   **历史债务集中清理**：集中关闭了一批 4 月份遗留下来的 Stale PR，涉及定时任务 Bug 修复 ([#1482](https://github.com/netease-youdao/LobsterAI/pull/1482))、CopyButton 内存泄漏 ([#1478](https://github.com/netease-youdao/LobsterAI/pull/1478)) 及技能安装去重 ([#1479](https://github.com/netease-youdao/LobsterAI/pull/1479)) 等。

## 4. 社区热点
*   **深度诉求：多 Agent 架构演进**：Issue [#1462](https://github.com/netease-youdao/LobsterAI/issues/1462) 迎来活跃讨论。用户高度认可 4.3 版本的“同 IM 渠道多实例”功能，但进一步提出“单 Agent 绑定独立模型”以及“引入 Manager 概念的多 Agent 协作小组”的强烈诉求。这反映出重度用户正在将 LobsterAI 应用于复杂业务流，对底层路由与调度架构提出了更高要求。
*   **成本痛点：Token 无效消耗**：Issue [#2121](https://github.com/netease-youdao/LobsterAI/issues/2121) 反映了疑似因底层 Claw 或网关问题导致的“重复输出文字”，用户担忧这种异常会造成 Token 的大量浪费。

## 5. Bug 与稳定性
*   🔴 **疑似重复输出导致 Token 浪费**（中高风险）：用户报告在特定情况下出现重复输出文本的现象，怀疑与 Claw 机制有关，并担忧大量消耗 API Token（[Issue #2121](https://github.com/netease-youdao/LobsterAI/issues/2121)）。目前尚无对应 fix PR，需重点关注其是否为底层引擎或网关层面的回归 Bug。
*   🟢 **已修复的内存与并发问题**：今日合入的 PR 集中解决了 OpenClaw 的 OOM ([#2149](https://github.com/netease-youdao/LobsterAI/pull/2149))、组件卸载后的定时器内存泄漏 ([#1478](https://github.com/netease-youdao/LobsterAI/pull/1478)) 以及 Cowork 启停并发竞态问题 ([#2147](https://github.com/netease-youdao/LobsterAI/pull/2147))，显著提升了长时间运行和复杂交互场景下的系统稳定性。

## 6. 功能请求与路线图信号
结合今日动态，项目未来的迭代路线图透露出以下信号：
*   **自动化与健壮性增强**：支持主模型失败时自动重试备用模型的 Failover 机制（[PR #1483](https://github.com/netease-youdao/LobsterAI/pull/1483)），以及 Gmail 邮件触发自动化 Agent（[PR #1484](https://github.com/netease-youdao/LobsterAI/pull/1484)）均已具备代码基础，有望在下个版本中释放。
*   **多模型绑定需求前置**：尽管目前尚未有正式的“单 Agent 绑定指定模型”功能合入，但鉴于社区呼声强烈（[Issue #1462](https://github.com/netease-youdao/LobsterAI/issues/1462)），这极有可能成为 Agent 架构重构的下一阶段目标。

## 7. 用户反馈摘要
*   **竞品对比优势明显**：用户反馈指出，相比阿里的某同类产品，LobsterAI 在交互体验上具有显著优势，这构成了用户留存的核心竞争力。
*   **成本敏感度高**：大模型应用场景下，用户对 Token 的无效消耗极其敏感（[Issue #2121](https://github.com/netease-youdao/LobsterAI/issues/2121)），任何意外的死循环或重复生成都会引发对账单的担忧。
*   **实用功能受好评**：“同 IM 渠道多实例”功能被证实切中了企业级数字员工部署的真实痛点。

## 8. 待处理积压
*   **[PR] 技能 Tooltip 展示优化** ([#1459](https://github.com/netease-youdao/LobsterAI/pull/1459))：目前状态为 Open。该 PR 改善了技能选择时的说明展示，包含智能定位防遮挡等细节，属于高优的体验优化，建议维护团队尽早安排 Review。
*   **[Issue] 模型重复输出排查** ([#2121](https://github.com/netease-youdao/LobsterAI/issues/2121))：涉及潜在的 Token 消耗和底层 Bug，建议开发团队尽快介入复现并回应。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下为您生成的 2026 年 6 月 12 日 CoPaw (QwenPaw) 项目动态日报。

---

# 📊 CoPaw (QwenPaw) 项目动态日报 (2026-06-12)

## 1. 今日速览
CoPaw (QwenPaw) 项目今日保持高度活跃，共处理了 34 条 Issue（21 新开/13 关闭）和 41 条 PR（17 合并/关闭，24 待合并）。项目组在今日连续发布了 `v1.1.11.post1` 和 `v1.1.11.post2` 两个补丁版本，重点致力于修复近期频发的 Windows 桌面端 SSL 启动失败及内存泄漏等严重稳定性问题。同时，社区围绕底层架构升级（AgentScope 2.0 迁移、Runtime 2.0 模块化）展开了深入讨论，底层能力正在酝酿重大重构。整体来看，项目处于“快速修复表层Bug”与“同步推进底层大重构”的双线并行状态。

## 2. 版本发布
今日连续发布了 2 个 Patch 版本，主要针对桌面端和打包问题进行紧急修复：
*   **v1.1.11.post2** ([Release详情](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.11.post2))
    *   **UI优化**：截断工具卡片标题为单行省略号显示，避免排版混乱 ([PR #5119](https://github.com/agentscope-ai/QwenPaw/pull/5119))。
    *   **构建修复**：提升了 Tauri 在 Windows CI 环境下拉取 crates.io 依赖的稳定性，缓解因 TLS 故障导致的构建失败 ([PR #5125](https://github.com/agentscope-ai/QwenPaw/pull/5125))。
*   **v1.1.11.post1** ([Release详情](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.11.post1))
    *   **回退操作**：回退了 `fix(pack): compile-check discord after conda-unpack` 修复，该修复反而引发了其他打包问题 ([PR #5092](https://github.com/agentscope-ai/QwenPaw/pull/5092))。

## 3. 项目进展
今日合并/关闭的核心 PR 推动了项目稳定性和安全性的显著提升：
*   **核心安全隔离 ([PR #5028](https://github.com/agentscope-ai/QwenPaw/pull/5028))**：修复了在同一机器上运行多个 QwenPaw 实例时，会错误共享操作系统级 Keychain 的问题，实现了每个独立安装包的密钥隔离。
*   **桌面端 Session 逻辑修复 ([PR #5036](https://github.com/agentscope-ai/QwenPaw/pull/5036))**：修复了 Windows 下因 Session 文件名重复溢出导致的路径错误，以及桌面模式下 Agent 间调用失败的问题。
*   **LLM 后端解析增强 ([PR #5035](https://github.com/agentscope-ai/QwenPaw/pull/5035))**：修复了 `llama.cpp` 后续版本号超过 4 位数字时（如 build 8514）版本解析静默失败的 Bug。
*   **钉钉渠道优化 ([PR #5061](https://github.com/agentscope-ai/QwenPaw/pull/5061))**：修复了当 Agent 输出为空时，钉钉 AI Card 永久卡在“处理中”状态的问题。

## 4. 社区热点
今日社区讨论最热烈的话题集中在**架构演进**与**自动化任务体验**上：
*   **[架构演进] 迁移至 AgentScope 2.0** ([Issue #4727](https://github.com/agentscope-ai/QwenPaw/issues/4727))
    *   **热度**：👍 2 | 评论：9
    *   **分析**：核心维护者提出将后端从 AgentScope 1.x 升级到 2.0。这标志着项目将采用全新的运行时和 API 架构，社区正围绕此举可能带来的破坏性变更和生态影响进行深入评估。
*   **[功能痛点] Agent 生成的定时任务无法触发** ([Issue #5064](https://github.com/agentscope-ai/QwenPaw/issues/5064))
    *   **热度**：评论：8
    *   **分析**：用户反映 Agent 虽然能在 UI 上成功创建定时任务，但到点后不会自动执行，且不支持手动编辑。这暴露出当前 Agent 工具调用与后端调度引擎之间存在断点，是自动化工作流的核心痛点。

## 5. Bug 与稳定性
今日报告了大量 Bug，尤其是 Windows 桌面端（Tauri）暴露出严重的稳定性危机：
*   **[严重 P0] Windows 进程无限增殖导致内存溢出黑屏** ([Issue #5138](https://github.com/agentscope-ai/QwenPaw/issues/5138), [Issue #5106](https://github.com/agentscope-ai/QwenPaw/issues/5106))
    *   **现象**：启动客户端后进程持续增加，内存占用飙升至 90% 以上，最终导致电脑黑屏死机。
    *   **状态**：尚无针对性 Fix PR 合并，属于最高优先级危机。
*   **[严重 P1] 桌面端 SSL 证书错误无法启动** ([Issue #5086](https://github.com/agentscope-ai/QwenPaw/issues/5086))
    *   **现象**：由于捆绑的 Python 3.10 中的 OpenSSL 3.5.7 存在回归 Bug，导致 Windows 加载 DER 格式证书失败，后端起不来。（该问题在旧版 PyInstaller 端也存在）。
*   **[中等 P2] 记忆与向量配置丢失** ([Issue #5137](https://github.com/agentscope-ai/QwenPaw/issues/5137), [Issue #5098](https://github.com/agentscope-ai/QwenPaw/issues/5098))
    *   **现象**：在配置页面保存时，如果没有手动展开特定卡片，折叠部分的表单数据（如自动记忆搜索、向量模型配置）会被清空。
    *   **修复进度**：已有 PR ([PR #5144](https://github.com/agentscope-ai/QwenPaw/pull/5144)) 通过增加 `forceRender` 修复此问题。
*   **[中等 P2] 附件下载 404 错误** ([Issue #5140](https://github.com/agentscope-ai/QwenPaw/issues/5140))
    *   **现象**：v1.1.11.post2 中纯文本 可以下载，但 docx/pdf 等文件下载报错 404。

## 6. 功能请求与路线图信号
结合用户诉求与开发者 PR，项目正在向**可观测性**、**多智能体协作**和**底层抽象**方向演进：
*   **底层能力抽象**：开发者提交了 Runtime 2.0 架构重构 ([PR #5078](https://github.com/agentscope-ai/QwenPaw/pull/5078)) 及 Agent OS Driver 统一外部协议层 ([PR #5067](https://github.com/agentscope-ai/QwenPaw/pull/5067

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