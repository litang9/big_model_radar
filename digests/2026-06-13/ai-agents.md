# OpenClaw 生态日报 2026-06-13

> Issues: 500 | PRs: 491 | 覆盖项目: 11 个 | 生成时间: 2026-06-13 03:24 UTC

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

# OpenClaw 项目动态日报 — 2026-06-13

---

## 1. 今日速览

OpenClaw 今日维持**高活跃度运行**：过去 24 小时内 Issues 更新达 **500 条**（其中 410 条新开或活跃、90 条已关闭），PR 更新 **491 条**（346 条待合并、145 条已合并或关闭），社区参与热度处于项目高位区间。项目同时发布了 **v2026.6.6 正式版与 v2026.6.6-beta.2**，均以**大规模安全边界加固**为核心主题，横跨沙箱、MCP stdio、Codex HTTP、Discord 审核等十余个子系统。Bug 面板出现多个 **P0/P1 级别问题**——包括网关内存泄漏（RSS 增长至 15.5GB）、`memory_search` 索引元数据丢失、上下文压缩超时硬性 180s 上限等——需关注后续修复进展。功能侧，社区对多智能体协作、工具搜索目录模式、Android APK 预构建等方向的呼声持续升温。

---

## 2. 版本发布

### v2026.6.6（正式版） & v2026.6.6-beta.2

**发布链接：** [v2026.6.6](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6) · [v2026.6.6-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6-beta.2)

两个版本共享相同的核心变更说明，主题为 **"Security boundaries are substantially tighter"**，涵盖以下子系统：

| 加固范围 | 说明要点 |
|---|---|
| Transcripts | 对话转录的隔离与访问边界 |
| Sandbox binds | 沙箱挂载路径的权限约束 |
| Host environment inheritance | 宿主环境变量继承策略收紧 |
| MCP stdio | MCP 标准输入输出通道安全 |
| Codex HTTP access | Codex 扩展的 HTTP 访问控制 |
| Native search policy | 本地搜索引擎策略 |
| Elevated sender checks | 提升权限发送者校验 |
| Deleted-agent ACP bypasses | 已删除 Agent 的 ACP 绕过防护 |
| Loopback tools | 回环工具调用安全 |
| Discord moderation | Discord 频道审核策略 |
| Teams group actions | Teams 群组操作权限 |

**迁移注意事项：**
- 本版本为**安全加固型发布**，涉及沙箱挂载、环境变量继承、MCP 通道等多项行为变更。建议升级前在测试环境验证：
  - 沙箱内工具是否仍可正常读写隔离工作区（尤其关注 Docker-in-Docker 部署，见 [#31331](https://github.com/openclaw/openclaw/issues/31331)）
  - MCP stdio 连接是否因权限收紧中断
  - Discord/Teams 频道的审核规则是否需要调整
- `exec` 工具的环境变量继承行为有变，已确认存在相关回归（[#31583](https://github.com/openclaw/openclaw/issues/31583)），若依赖 `skills.entries.*.env` 注入密钥，**暂缓升级或先行测试**。

---

## 3. 项目进展

今日共有 **145 条 PR 被合并或关闭**，以下为关键合并进展：

### 已合并 / 已关闭的重要 PR

| PR | 说明 | 推进意义 |
|---|---|---|
| [#88446](https://github.com/openclaw/openclaw/pull/88446) | **feat(codex): add bound chat plan controls** — 为 Codex 绑定对话添加原生 `/codex plan` 控件，含持久化计划模式偏好、分场景推理配置、聊天计划状态栏 | Codex 集成从"基础可用"迈入"计划-执行双模式"，对复杂工作流用户价值显著 |
| [#81954](https://github.com/openclaw/openclaw/pull/81954) | **Add Agents tab New Agent flow** — Control UI 新增"创建智能体"对话框和流程 | 降低了多智能体管理的操作门槛，是 Web UI 体验的重要一步 |
| [#80192](https://github.com/openclaw/openclaw/pull/80192) | **Surface safe native Codex activity in Control UI** — 在聊天状态区展示 Codex 计划、工具生命周期活动，推理内容保持私密 | 提升用户对 Codex 后台行为的可视性，兼顾隐私 |
| [#86988](https://github.com/openclaw/openclaw/pull/86988) | **revert: restore legacy compaction reinjection default** — 暂时恢复压缩后 AGENTS.md 重注入的旧默认行为 | 避免破坏性变更影响现有用户，体现了维护团队的审慎态度 |
| [#81726](https://github.com/openclaw/openclaw/pull/81726) | **macOS: avoid launchd startup crash loops** — 改为 `KeepAlive.SuccessfulExit=true`，仅干净退出后重启 | 修复 macOS 上网关反复崩溃重启的顽疾 |
| [#81728](https://github.com/openclaw/openclaw/pull/81728) | **macOS: retry stale launchd bootstrap** — launchd 注册冲突时自动重试一次 | 进一步提升 macOS 服务稳定性 |
| [#81725](https://github.com/openclaw/openclaw/pull/81725) | **macOS: skip CLI gateway repair when app owns launchd** — 检测到 App 模式时跳过 CLI 修复 | 避免 CLI 和 macOS App 争夺 launchd 所有权 |
| [#78807](https://github.com/openclaw/openclaw/pull/78807) | **fix(mobile): allow private LAN pairing auth** — 允许局域网/本地/模拟器明文 `ws://` 配对 | 解决了家庭/内网环境移动端配对失败的问题 |
| [#76322](https://github.com/openclaw/openclaw/pull/76322) (CLOSED) | **security: bootstrap token path DoS** — 为引导令牌认证路径添加速率限制 | 安全修复，已关闭，可能与 v2026.6.6 的安全加固相关 |
| [#92311](https://github.com/openclaw/openclaw/pull/92311) (CLOSED) | **ci: split plugin ClawHub publishing paths** — 将插件发布拆分为 OIDC 官方路径和受保护令牌引导路径 | CI/CD 管线安全加固，保障插件供应链安全 |

### 整体进展评估

今日合并内容集中在**三个方向**：(1) **macOS 平台稳定性**——3 个相关 PR 一并落地，launchd 崩溃循环问题得到系统性解决；(2) **Codex 深度集成**——计划-执行模式、活动可视化等 PR 合并，标志着 Codex 作为一等扩展的成熟度提升；(3) **安全加固**——与 v2026.6.6 发布相呼应。Control UI 的多智能体管理体验（New Agent flow）也是里程碑式进展。

---

## 4. 社区热点

### 讨论最活跃的 Issues

| 排名 | Issue | 评论数 | 👍 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#25592](https://github.com/openclaw/openclaw/issues/25592) Text between tool calls leaks to messaging channels | 32 | 1 | **P1 安全问题**：Agent 在工具调用之间产生的内部处理文本（错误处理、处理确认、叙述等）被路由到活跃消息频道（Slack、iMessage 等），对用户造成困扰。社区关注的是 Agent 内部思维泄露到外部通道的隔离机制缺失 |
| 2 | [#9443](https://github.com/openclaw/openclaw/issues/9443) Prebuilt Android APK releases | 25 | 2 | 用户希望提供预编译 Android APK 下载。值得注意的是该 Issue 由 AI 助手（QING）代用户 Lysen 提交，反映了 AI 辅助提 Issue 的新范式 |
| 3 | [#32473](https://github.com/openclaw/openclaw/issues/32473) Control UI requires device identity | 17 | 5 | Docker + VPS 部署场景下，非 HTTPS 访问 Control UI 时出现设备身份验证失败，阻碍了自托管用户的基本使用 |
| 4 | [#22438](https://github.com/openclaw/openclaw/issues/22438) Tiered bootstrap file loading | 17 | 0 | Bootstrap 文件在每个会话中消耗 LLM tokens，大型工作区浪费严重。提案引入分层加载机制控制上下文预算 |
| 5 | [#22676](https://github.com/openclaw/openclaw/issues/22676) Signal daemon race condition | 17 | 0 | **P1**：SIGUSR1 重启时信号守护进程竞态条件导致孤立进程和发送失败，影响 Signal 频道可靠性 |
| 6 | [#32296](https://github.com/openclaw/openclaw/issues/32296) Agent replies to previous message | 15 | 1 | Agent 回复上一条消息而非当前消息，会话上下文混淆导致对话错位 |
| 7 | [#18160](https://github.com/openclaw/openclaw/issues/18160) Direct Exec Mode for Cron Jobs | 13 | **11** | 👍 **今日最高赞同数**。当前 Cron 作业强制走 `agentTurn` 执行，导致超时和不可靠。用户呼吁直接执行模式以降低延迟和 API 成本 |
| 8 | [#74484](https://github.com/openclaw/openclaw/issues/74484) Gateway pairing scope deadlock | 12 | 2 | CLI 配对权限死锁：配对的 CLI 仅有 `operator.read` 权限，无法批准/拒绝自动重发的修复请求，形成权限循环 |
| 9 | [#12602](https://github.com/openclaw/openclaw/issues/12602) Slack Block Kit support | 13 | 0 | 请求 Agent 支持 Slack Block Kit 富消息格式，用于 CRM 摘要、日报、查询结果等结构化展示场景 |
| 10 | [#6615](https://github.com/openclaw/openclaw/issues/6615) Denylist support for exec-approvals | 7 | **7** | 高赞同功能请求：在 exec 审批中增加黑名单机制，实现"允许所有命令**除了**危险命令"的策略 |

### 热点分析

社区关注的核心矛盾集中在三方面：

1. **消息路由与隔离**（#25592、#12602、#33413、#88951）：Agent 内部处理文本泄露、消息重复、缺乏富格式支持，反映出消息管道在可靠性/可控性上仍有提升空间。
2. **安全与权限模型**（#74484、#57326、#13583）：配对权限死锁、CLI 路径绕过、强制工具调用硬门控等需求，表明当前安全边界设计仍在迭代中（与今日 v2026.6.6 安全加固呼应）。
3. **资源效率**（#18160、#22438、#14785）：Cron 直接执行、分层 Bootstrap 加载、工具 Schema token 开销优化——用户对 token 和 API 成本高度敏感。

---

## 5. Bug 与稳定性

### 🔴 P0 — 严重

| Issue | 症状 | Fix PR | 状态 |
|---|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) **Gateway Memory Leak** | RSS 从 ~350MB 增长至 15.5GB（2-3 天），触发 OOM Killer 反复重启 | 无 | 🟡 待修复 |
| [#91778](https://github.com/openclaw/openclaw/issues/91778) **memory_search 索引元数据丢失** | 自 v2026.6.1 起，`memory_search` 向量搜索完全不可用，所有 Agent "失忆" | 无（有 [#92583](https://github.com/openclaw/openclaw/pull/92583) 修复 `doctor` 诊断但不修复根因） | 🟡 待修复 |

### 🟠 P1 — 高优先级

| Issue | 症状 | Fix PR | 状态 |
|---|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 工具调用间文本泄露到消息频道 | 无 | 🟡 待修复 |
| [#22676](https://github.com/openclaw/openclaw/issues/22676) | Signal daemon SIGUSR1 竞态条件 → 孤立进程 | 无 | 🟡 待修复 |
| [#57326](https://github.com/openclaw/openclaw/issues/57326) | CLI-backed helper 路径绕过 CLI dispatch | 无 | 🟡 待修复 |
| [#29387](https://github.com/openclaw/openclaw/issues/29387) | agentDir 下 Bootstrap 文件被静默忽略 | 无 | 🟡 待修复 |
| [#31583](https://github.com/openclaw/openclaw/issues/31583) | `exec` 工具不继承 `skills.entries.*.env` 环境变量（**回归**） | 无 | 🟡 待修复 |
| [#92043](https://github.com/openclaw/openclaw/issues/92043) | 压缩超时 180s 无进度重用，长会话反复失败 | 无 | 🟡 待修复 |
| [#84569](https://github.com/openclaw/openclaw/issues/84569) | WhatsApp 长时间 model_call 后会话卡死 | 无 | 🟡 待修复 |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | google-vertex/gemini-3.1-pro "Cannot convert undefined" 崩溃（**回归**） | 无 | 🟡 待修复 |
| [#83184](https://github.com/openclaw/openclaw/issues/83184) | Heartbeat 驱动的回复使 `pendingFinalDelivery` 永久卡住 | [#88970](https://github.com/openclaw/openclaw/pull/88970) | 🟢 有 Fix PR（待合并） |
| [#86538](https://github.com/openclaw/openclaw/issues/86538) | Session JSONL

---

## 横向生态对比

基于您提供的 2026 年 6 月 13 日各开源项目社区动态，以下为您呈上的《AI 智能体与个人助手开源生态横向对比与趋势分析报告》。

---

# 📊 AI 智能体与个人助手开源生态横向对比与趋势分析 (2026-06-13)

## 1. 生态全景
个人 AI 助手与自主智能体开源生态正经历从“基础对话封装”向“深度工作流执行与多模态交互”的跨越。当前，头部及中腰部项目普遍进入底层架构重构与安全边界加固的深水区，多模态（语音、视觉）、多渠道（IM、WebRTC）及多智能体协同成为标配。整体生态呈现出极高的迭代频率，开发者在追求前沿模型（如 Gemini 3.5、Computer Use）敏捷适配的同时，也正着力解决内存泄漏、上下文丢失和权限越权等阻碍生产可用性的基础工程难题。

## 2. 各项目活跃度对比

| 项目名称 | Issues 动态 | PRs 动态 | 版本发布情况 | 健康度与阶段评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 条 (90 关闭) | 491 条 (145 合并) | **v2026.6.6** 正式版及 Beta | 🟢 **极优 (成熟期)**：生态庞大，安全加固与双模式引入，处理高复杂度问题。 |
| **CoPaw** | 21 条 (7 关闭) | 23 条 (10 合并) | v1.1.12-beta.1 | 🟢 **良好 (重构期)**：推进 Runtime 2.0 底层大改，积极修复 UI 与稳定性 Bug。 |
| **IronClaw** | 50 条更新 | 50 条更新 | 无 (准备中) | 🟢 **良好 (打磨期)**：重构并发机制与 WebUI v2，QA 测试基建完善。 |
| **PicoClaw** | 活跃 (多个新开) | 14 条 (3 合并) | **v0.2.9-nightly** | 🟢 **良好 (生长期)**：快速横向扩展通道，协议层逐步成熟。 |
| **NanoClaw** | 5 条 | 18 条 (10 合并) | 无 | 🟡 **中等 (演进期)**：架构重度重构，灾难恢复与多模态补齐，存在积压。 |
| **NanoBot** | 6 条 | 29 条 (9 合并) | 无 | 🟡 **中等 (停滞风险)**：功能扩展积极，但 PR 积压达 20 个，审查吞吐遇瓶颈。 |
| **Zeroclaw** | 12 条 (1 关闭) | 36 条 (4 合并) | v0.8.1 准备中 | 🟡 **中等 (修复期)**：底层引擎统一重构，新手体验存在阻断性 Bug。 |
| **LobsterAI** | 1 条 | 17 条 (11 合并) | 2026.6.12 准备中 | 🟢 **良好 (爆发期)**：多模态（视觉、语音）重磅功能落地，合并效率极高。 |
| **TinyClaw / ZeptoClaw / EasyClaw**| 0 | 0 | 无 | 🔴 **不活跃**：过去 24 小时无代码及社区动态。 |

## 3. OpenClaw 在生态中的定位
作为生态的核心参照系，**OpenClaw 担当着“企业级标准与基础设施”的角色**。
*   **规模与成熟度壁垒**：日均处理近千条 Issue/PR，其社区规模和工程复杂度远超同类。macOS 崩溃循环修复、Codex 计划-执行双模式等更新，展现出极高的工程颗粒度。
*   **技术路线差异**：相比于 LobsterAI 或 PicoClaw 在多模态通道层面的横向扩展，OpenClaw 当前更倾向于**纵向的安全加固与权限收敛**（v2026.6.6 横跨 11 个子系统的安全边界收紧），这为其进入高要求的 B 端市场铺平了道路。
*   **生态位**：如果说 NanoBot/NanoClaw 是轻量级/实验性架构的探索者，OpenClaw 则是提供全栈解决方案（从沙箱隔离到 Teams/Discord 审核策略）的“重量级守门员”。

## 4. 共同关注的技术方向
从多个项目的并发动态中，可以清晰看到智能体底层技术的几大共识方向：

1.  **安全沙箱与权限隔离 (Zero-Trust Execution)**
    *   **涉及项目**：OpenClaw, NanoClaw, IronClaw。
    *   **具体诉求**：OpenClaw 全面收紧宿主环境变量与沙箱挂载权限；NanoClaw 引入 `--cap-drop=ALL` 的零信任容器隔离，并防范 NPM 供应链投毒；IronClaw 限制 Capability dispatch 扇出上限。智能体从“随意执行代码”转向“受限环境运行”。
2.  **底层调度引擎的统一与重构**
    *   **涉及项目**：Zeroclaw, CoPaw, IronClaw。
    *   **具体诉求**：历史包袱导致执行流混乱。Zeroclaw 发起 RFC 统一三大 Agent 轮次引擎；CoPaw 引入 Runtime 2.0 及 `ToolCoordinator`；IronClaw 重构并发机制（DeferredBusy）。
3.  **上下文记忆与防丢失机制**
    *   **涉及项目**：NanoBot, OpenClaw, CoPaw, LobsterAI。
    *   **具体诉求**：包括 NanoBot 修复合并后记忆丢失、OpenClaw 讨论分层 Bootstrap 加载控制 Token 预算，以及 LobsterAI 大力修复表单和草稿静默丢失。AI 的“失忆”和前端的“状态丢失”是当前最大痛点。
4.  **多模态与富媒体交互**
    *   **涉及项目**：LobsterAI, NanoBot, NanoClaw, PicoClaw。
    *   **具体诉求**：LobsterAI 引入 Computer Use 和 ASR 实时语音；NanoBot 集成多供应商 TTS；NanoClaw 补齐 Signal 附件与 Ollama 视觉闭环。

## 5. 差异化定位分析

*   **功能侧重**：
    *   **OpenClaw / Zeroclaw**：主打全能型网关与多端部署，深度集成企业协同工具。
    *   **LobsterAI**：主打深度工作流，率先落地计算机视觉操控，倾向于成为高交互性的超级助理。
    *   **PicoClaw**：主打泛在连接与边缘探索（如 Delta Chat、NEAR AI Cloud TEE），适应力强。
    *   **NanoBot / NanoClaw**：主打架构解耦与 SDK 极客体验，适合二次开发与轻量化部署。
*   **目标用户**：
    *   **OpenClaw / IronClaw**：面向需要高安全性与多租户管理的企业级开发者和重度极客。
    *   **CoPaw / LobsterAI**：面向有本地复杂自动化需求（如 RPA、定时任务）的个人开发者或中小团队。
*   **技术架构**：
    *   **Web 生态主导**：LobsterAI (Redux/React)、CoPaw、Zeroclaw。
    *   **混合/底层主导**：OpenClaw (涉及深度的系统 launch

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

这份 NanoBot 项目动态日报基于您提供的 2026-06-13 GitHub 数据生成。报告聚焦项目健康度、社区动态及后续演进方向。

---

### 1. 今日速览
NanoBot 项目在过去 24 小时内维持了**极高的开发活跃度与社区参与度**，共处理了 29 个 Pull Requests 和 6 个 Issues。项目当前正处于**功能横向扩展与底层健壮性深度优化并行的阶段**。社区开发者不仅积极提交关于内存管理和安全沙箱的防御性修复，还推动了包括多提供商 TTS（文本转语音）、操作审计在内的多个重要功能分支。项目整体健康状况良好，核心团队对 Issue 的响应非常迅速（关闭率 50%），但目前积压的待合并 PR 数量较多（20 个），需关注代码审查的吞吐效率。

### 2. 版本发布
*今日无新版本发布。*

### 3. 项目进展
今日共有 9 个 PR 被合并或关闭，项目在**系统稳定性、内存管理及底层架构解耦**方面取得了实质性进展：
*   **架构优化与重构**：核心开发者 @bjoshuanoah 连续迭代并关闭了两个审计功能的草案 PR（[#4319](https://github.com/HKUDS/nanobot/pull/4319), [#4318](https://github.com/HKUDS/nanobot/pull/4318)），最终沉淀为目前开放的 [#4320](https://github.com/HKUDS/nanobot/pull/4320)，这表明智能体行为可观测性架构已基本定型。同时，[#4314](https://github.com/HKUDS/nanobot/pull/4314) 成功解耦了配置模式与工具运行时的依赖，提升了代码的模块化程度。
*   **关键 Bug 修复**：@michaelxer 提交的 [#4304](https://github.com/HKUDS/nanobot/pull/4304) 被合并，修复了 Cron 任务在等待衍生子智能体完成前就错误标记完成的异步调度漏洞。
*   **历史积压清理**：解决了存在已久的“孤立工具结果导致消息丢弃”系列 Bug（相关 Issue [#4203](https://github.com/HKUDS/nanobot/issues/4203), [#4006](https://github.com/HKUDS/nanobot/issues/4006) 被关闭）。

### 4. 社区热点
今日社区焦点主要集中在**多模态交互、系统配置体验及多 Provider 支持**上：
*   **TTS 语音合成系统引入**（[PR #4316](https://github.com/HKUDS/nanobot/pull/4316)）：由 @tobrien 提交，为 NanoBot 增加了支持 OpenAI、Groq 和 ElevenLabs 的多供应商 TTS 配置系统。这标志着 NanoBot 正式向语音交互场景延伸。
*   **WebUI 配置对齐**（[PR #4313](https://github.com/HKUDS/nanobot/pull/4313)）：@La-Volpe 提交了大幅增强 WebUI 设置面板与 `config.json` 同步能力的 PR，补齐了参数暴露和写入的短板，极大改善了本地部署的 UI 易用性。
*   **多自定义 Provider 需求**（[Issue #4305](https://github.com/HKUDS/nanobot/issues/4305)）：高级用户 @smurfix 提出支持配置多个“custom/openai”类型 provider 的需求（已关闭），反映出社区在复杂企业级路由和多模型网关场景下的迫切诉求。

### 5. Bug 与稳定性
今日报告的 Bug 集中在**上下文记忆截断与 API 兼容性**上，部分高危问题已有修复方案：
*   **严重**：Post-turn consolidation 抹除了 Agent 自己的消息（[Issue #4307](https://github.com/HKUDS/nanobot/issues/4307)）。当上下文设置较小时，长对话后的记忆合并会导致后续引用丢失。*目前尚无对应 fix PR，需持续关注。*
*   **中等**：短期记忆丢失（[Issue #4044](https://github.com/HKUDS/nanobot/issues/4044)）。由于系统 Prompt 压力导致 Agent 丧失主动提问的记忆，该问题在近期引发了 5 次讨论。
*   **中等**：`/v1/chat/completions` 接口 Token 用量始终返回 0（[Issue #4309](https://github.com/HKUDS/nanobot/issues/4309)）。这会严重影响基于 Token 扣费的上层应用系统的计量计费。
*   **已修复/处理中**：
    *   MCP 服务器 GC 崩溃（[Issue #4302](https://github.com/HKUDS/nanobot/pull/4303)）已有 PR 等待合并。
    *   Dream 功能禁用时的 Prompt 膨胀问题已提交修复（[PR #4321](https://github.com/HKUDS/nanobot/pull/4321)）。

### 6. 功能请求与路线图信号
通过近期的 Issue 和 PR，可以洞察到项目近期的演进路线图信号：
*   **可观测性增强**：预计 `tools.audit` 功能（[PR #4320](https://github.com/HKUDS/nanobot/pull/4320)）将在下个版本合入，提供日志、Webhook、JSONL 等多维度的工具调用审计。
*   **SDK 辅助控制能力增强**：Python SDK 正在从简单的 `bot.run(...)` 演进为具备状态会话、内存和生命周期控制能力的完整开发者 API（[PR #4296](https://github.com/HKUDS/nanobot/pull/4296)）。
*   **通讯渠道拓展**：WhatsApp 频道已支持 @ 提及用户的能力（[PR #4317](https://github.com/HKUDS/nanobot/pull/4317)），表明项目在端侧触达能力上持续发力。

### 7. 用户反馈摘要
从开发者社区的反馈中，可以提炼出以下核心痛点与赞赏点：
*   **痛点 - 内存/上下文调度**：用户对“Agent 忘记刚刚说过的话”感到困惑，深层诉求是希望系统在接近上下文边界时能有更优雅的压缩或提醒机制，而非粗暴截断。
*   **痛点 - API 规范严格对齐**：由于部分供应商（如 Anthropic/OpenAI）对历史消息格式要求严苛，NanoBot 历史记录中的“孤立工具调用”曾导致外部 API 直接报错拒绝（已修复）。
*   **满意 - 工具链扩展性**：用户对底层配置与工具运行时解耦（[PR #4314](https://github.com/HKUDS/nanobot/pull/4314)）表示认可，这使得自定义工具的注入变得更加轻量化。

### 8. 待处理积压
目前有高达 20 个待合并的 PR 处于 Open 状态，其中部分关键修复和测试存在积压风险，提醒维护者重点关注：
*   **内存与安全防御系列（@yu-xin-c 提交）**：包含内存游标单调性修复（[PR #4256](https://github.com/HKUDS/nanobot/pull/4256)）、阻止相对符号链接逃逸工作区（[PR #4119](https://github.com/HKUDS/nanobot/pull/4119)）及文件分页限制校验（[PR #4311](https://github.com/HKUDS/nanobot/pull/4311)）等 7 个 PR。这些 PR 提升了系统的底线安全，建议优先进行 Code Review。
*   **测试覆盖增强**：内存生命周期测试（[PR #4193](https://github.com/HKUDS/nanobot/pull/4193)）和运行器阻塞测试（[PR #3983](https://github.com/HKUDS/nanobot/pull/3983)）已开启近半个月，尽早合并有助于提高后续研发的合并信心。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下是为您生成的 [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw) 开源项目 2026-06-13 动态日报：

---

# 📊 Zeroclaw 项目动态日报 (2026-06-13)

## 1. 今日速览
过去 24 小时内，Zeroclaw 项目保持了**高度活跃的迭代状态**，社区共处理了 12 条 Issue 更新（11 条新开，1 条关闭）和 36 条 PR 更新（4 条合并/关闭，32 条待合并）。项目当前的重心明显聚焦于 **v0.8.1 版本前后的稳定性建设与用户体验修复**，尤其是针对 Web Dashboard、Docker 构建、本地模型适配以及底层插件架构的完善。虽然社区贡献热情高涨，但多个 S1 级别的新手入门阻断性 Bug 值得维护团队重点关注。

## 2. 版本发布
**本日无新版本发布。** 
根据 Issue #6970 的追踪动态，项目目前正在密集积攒 `v0.8.1` 的集成、通道、Provider 和工具相关的 PR 队列，预计将在队列合并完成后发布正式版。

## 3. 项目进展
今日项目整体在**Provider 兼容性、前端构建与代码重构**方面取得了实质性进展，已合并/关闭的重要 PR/Issue 包括：
*   **OpenAI Provider 超时修复落地 ([PR #7447](https://github.com/zeroclaw-labs/zeroclaw/pull/7447))**：解决了原生 OpenAI provider 将请求超时硬编码为 120 秒的问题，现在能正确读取 `timeout_secs` 配置。这极大改善了对本地 llama.cpp 或 vLLM 等慢速推理服务的兼容性。
*   **Twitch 频道支持获准 ([Issue #6443](https://github.com/zeroclaw-labs/zeroclaw/issues/6443))**：作为低风险的增强提案，基于现有 IRC 适配器添加 Twitch 聊天频道的 Feature 获得通过并被关闭，即将进入开发流程。
*   **大规模依赖与代码清理 ([PR #7548](https://github.com/zeroclaw-labs/zeroclaw/pull/7548))**：合并了涉及核心、通道、Provider 等多个模块的 Cargo 依赖清理工作，保持了代码库的健康度。

## 4. 社区热点
今日讨论度最高、对项目走向影响最深远的议题是底层执行引擎的重构：
*   **RFC: 统一三大 Agent 轮次引擎 ([Issue #7415](https://github.com/zeroclaw-labs/zeroclaw/issues/7415))**
    *   **热度**：3 条深度评论，正在执行阶段。
    *   **分析**：这是一个高风险的架构级重构 RFC。项目目前的 `run_tool_call_loop`、`turn_streamed` 和 `Agent::turn` 三套引擎逻辑即将被统一为单一合并 PR（见 PR #7540）。这表明 Zeroclaw 正在剥离早期的历史包袱，试图为多模态和复杂 Agent 交互建立一个统一的底层标准，值得架构师级别的贡献者持续关注。

## 5. Bug 与稳定性
今日报告了多个影响用户工作流的 S1 级（阻断性）Bug，但社区响应迅速，大部分已提交修复 PR：

*   **S1 - Docker 构建彻底失败 ([Issue #7533](https://github.com/zeroclaw-labs/zeroclaw/issues/7533))**
    *   **原因**：`cargo web build` 找不到 C++ 编译器 (`cc-rs`)。
    *   **状态**：✅ **已提交修复 ([PR #7534](https://github.com/zeroclaw-labs/zeroclaw/pull/7534))**：在 Dockerfile 的依赖安装层补充了 `g++`。
*   **S1 - Gateway Web 会话 `ask_user` 秒退 ([Issue #7542](https://github.com/zeroclaw-labs/zeroclaw/issues/7542))**
    *   **原因**：WebSocket 的 `WsApprovalChannel` 不支持自由格式的询问，导致通道静默关闭。
    *   **状态**：✅ **已提交修复 ([PR #7551](https://github.com/zeroclaw-labs/zeroclaw/pull/7551))**：重写逻辑使其快速失败并返回清晰的错误提示。
*   **S1 - Windows Quickstart 报错 ([Issue #7537](https://github.com/zeroclaw-labs/zeroclaw/issues/7537)) & Windows 自动更新失败 ([PR #7530](https://github.com/zeroclaw-labs/zeroclaw/pull/7530))**
    *   **分析**：Windows 平台的适配问题突出，不仅有配置解析错误导致的新建 Agent 失败，还有因

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-06-13)

## 1. 今日速览
PicoClaw 项目今日保持了极高的开发与社区活跃度。项目在过去的24小时内迎来了新的 **v0.2.9-nightly** 自动构建，标志着主分支正在快速迭代。在代码合并方面，团队和贡献者今天关闭了 3 个 PR（主要涉及底层架构重构与错误处理优化），同时有 11 个待合并 PR 正在激烈讨论与审查中，涵盖了新渠道接入、协议完善等重大特性。社区反馈方面，新增了多个与前沿大模型（如 Gemini 3.5）兼容性及复杂群组场景权限管理的 Issue。整体来看，项目正处于功能横向扩展（接入新通信协议）与纵向深挖（细化权限、优化媒体处理）并重的高速生长期。

## 2. 版本发布
- **[nightly: Nightly Build](https://github.com/sipeed/picoclaw/releases/tag/nightly)**: 发布了 `v0.2.9-nightly.20260613.c362114c` 版本。
  - **说明**：这是基于 main 分支的自动化构建版本。
  - **注意事项**：属于测试版本，官方提示可能存在不稳定情况，生产环境请谨慎更新。
  - **完整更新日志**：[v0.2.9...main](https://github.com/sipeed/picoclaw/compare/v0.2.9...main)

## 3. 项目进展
今日共有 3 个 Pull Requests 被合并或关闭，显著提升了系统的健壮性和底层架构的灵活性：

- **[PR #2551](https://github.com/sipeed/picoclaw/pull/2551) [CLOSED] refactor: standardize channel identification and decouple name from provider type**
  由 @cytown 提交。这是一次**重大架构重构**，解耦了通道名称（配置键）与通道类型（提供商 ID），使得同一 Provider（如 Telegram、Discord）可以配置多个独立实例成为可能，为后续复杂的多群组、多账号部署打下坚实基础。
- **[PR #3113](https://github.com/sipeed/picoclaw/pull/3113) [CLOSED] fix(channels): check json marshal/unmarshal errors in toChannelHashes**
  由 @chengzhichao-xydt 提交。修复了通道配置序列化/反序列化过程中错误被静默吞掉的隐患，增强了系统的可观测性。
- **[PR #3112](https://github.com/sipeed/picoclaw/pull/3112) [CLOSED] fix(tools): handle json.Marshal error in toolloop tool call arguments**
  由 @chengzhichao-xydt 提交。修复了 Tool 循环调用时参数解析失败导致历史记录丢失的 Bug，保障了 Agent 长对话的稳定性。

## 4. 社区热点
今日社区关注点集中在 **Pico 协议生命周期完善** 与 **复杂群组权限控制** 两个核心领域：

- **Pico WebSocket 客户端通信协议完善**：[Issue #2984](https://github.com/sipeed/picoclaw/issues/2984) 获得了 2 个赞。用户 @Brook-sys 提出需要明确的 `turn completion` 信号来判断 Agent 是否处理完毕。目前已有对应的修复 PR ([PR #3116](https://github.com/sipeed/picoclaw/pull/3116)) 提交，完善了 `turn.done` 生命周期，这表明项目在走向深度 Agentic 应用时的协议层正在不断成熟。
- **群组场景下的安全边界讨论**：[Issue #3114](https://github.com/sipeed/picoclaw/issues/3114) 和刚刚关闭的 [Issue #3109](https://github.com/sipeed/picoclaw/issues/3109) 引发了关于“按对话类型（私聊/群组/频道）分级控制权限”的探讨。这反映了 PicoClaw 正在被更多部署到 Telegram 等大型公开社区中，用户对“防刷量”、“防危险指令执行”的诉求日益强烈。

## 5. Bug 与稳定性
今日报告了多个与最新模型及边界场景相关的 Bug：

1. **高优 - Gemini 3.5 Flash 兼容性崩溃**：[Issue #3111](https://github.com/sipeed/picoclaw/issues/3111)
   - **现象**：使用 `gemini-3.5-flash` 执行工具时触发 Google API `400 Bad Request`。
   - **原因**：后端返回的 Schema 缺少 Gemini 要求的 `thought_signature`，无法满足 Agentic 推理要求。（目前尚无关联 Fix PR，需优先关注）。
2. **中优 - Telegram Forum 话题回复错乱**：[Issue #3110](https://github.com/sipeed/picoclaw/issues/3110)
   - **现象**：在开启 Forum 功能的 Telegram 群组中，机器人总是将消息回复到默认的 #General 而非具体的话题分支。
3. **中优 - 媒体内容误判导致会话污染**：[PR #3115](https://github.com/sipeed/picoclaw/pull/3115) 修复了相关 Bug。当 `read_file` 等工具输出包含 `data:image/...;base64` 的纯文本时，会被错误识别为媒体附件，已有 PR 等待合并。
4. **低优 - Evolution 模式持续消耗 Token**：[Issue #3012](https://github.com/sipeed/picoclaw/issues/3012) 反映开启 Evolution 后每分钟都在消耗 Token，该 Issue 目前处于 Stale 状态。

## 6. 功能请求与路线图信号
从今日的 Issue 与 PR 动向来看，项目的 Roadmap 正向以下几个方向延伸：

- **更广泛的渠道支持与多模态网关**：
  - [PR #3063](https://github.com/sipeed/picoclaw/pull/3063) 正在尝试接入 **Delta Chat** 渠道。
  - [PR #2964](https://github.com/sipeed/picoclaw/pull/2964) 旨在引入可配置的**图像输入压缩策略**，优化视觉pipeline的Token消耗。
  - [PR #3118](https://github.com/sipeed/picoclaw/pull/3118) 为 Agent 增加了远程 WebSocket 模式，脱离本地单机限制。
- **Web3 / 隐私计算场景探索**：[PR #2917](https://github.com/sipeed/picoclaw/pull/2917) 提出接入 **NEAR AI Cloud** 作为 LLM Provider，并引入了 TEE（可信执行环境）相关概念，暗示项目在隐私保护方向的拓展。
- **交互体验微调**：[PR #3097](https://github.com/sipeed/picoclaw/pull/3097) 在 Web 聊天框下方增加了 Shift+Enter 换行的视觉提示。

## 7. 用户反馈摘要
从今日的 Issue 描述和标签中可以提炼出以下真实用户痛点：
- **前沿模型跟进的阵痛**：用户非常热衷于尝试 Gemini 3.5 Flash 等最新低成本模型，但由于各家 API 的 Schema 要求（如 thought_signature）存在差异，容易在 Tool Call 时引发报错，期待官方提供更好的兼容层。
- **群组机器人的管理难题**：用户不再满足于简单的“白名单”控制，急需针对不同会话场景（私聊的完全信任 vs 群组的部分限制）的细粒度权限管理。
- **长连接状态的不确定性**：通过 WebSocket 接入的外部客户端开发者难以准确判断 Agent 是否已完成一轮思考，明确的 `turn.done` 事件成为刚需。

## 8. 待处理积压
- **[Issue #3012](https://github.com/sipeed/picoclaw/issues/3012) [stale] [BUG] Continuous consumption of tokens**：该 Bug 影响开启了 Evolution 功能的用户，可能导致意料之外的 API 开销，目前已被标记为 Stale，建议维护团队 @sipeed 及时确认其在最新 Nightly 版本中的复现情况。
- **[PR #2917](https://github.com/sipeed/picoclaw/pull/2917) [Feature] Add NEAR AI Cloud provider**：该 PR 已打开超过三周，需要官方评估其维护成本与架构契合度，避免社区贡献者流失。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

**NanoClaw 项目动态日报 (2026-06-13)**

### 1. 今日速览
过去 24 小时内，NanoClaw 项目展现出极高的开发活跃度与重构力度，共计处理了 **18 个 PR**（其中 10 个核心功能与修复 PR 已合并/关闭）和 **5 个 Issue**。
项目当前正处于架构演进的密集期：一方面在大力弥补系统级安全与稳定性短板（如容器隔离、数据库日志恢复、API 错误重试）；另一方面在为多模态、多渠道接入打下坚实基础（Signal、Discord 附件处理，Ollama 多模态支持）。整体来看，主分支代码正在向 v2 版本的更高稳定性和更严苛的安全标准快速迈进。

---

### 2. 版本发布
**无新版本发布**。
（注：虽然无正式 Release，但今日主分支合并了多个重磅特性与修复，预计在当前积压的 8 个安全/架构 PR 合并后，可能会迎来一次重要的修订版发布。）

---

### 3. 项目进展
今日共有 10 个高质量 PR 被合并或关闭，显著提升了项目的多渠道接入能力、数据安全性和运行时稳定性：

*   **Signal 渠道全链路补齐**：
    *   合并了 `#2203` 和 `#2040`，Signal 原生适配器现已全面支持**双向表情回应**及**出站文件附件**发送。
    *   合并了 `#2071` 和 `#2070`，重构了附件处理架构，支持将原生信道落盘的宿主机路径直接作为文件提取，Signal 渠道现已支持所有非音频文件类型的无缝路由。
*   **多模态与私有模型支持**：
    *   合并了 `#2072`，`ollama_generate` 工具现已支持接收本地文件路径，自动转码为 Base64 后喂给多模态模型，打通了本地视觉模型的闭环。
*   **灾难恢复与备份**：
    *   合并了 `#2084`，引入了关键的灾难恢复机制，支持每日项目状态快照（兼容本地与 S3），并可通过 CLI 进行全量或按 Agent 粒度的恢复。
*   **运行时稳定性修复**：
    *   合并了 `#2670`：修复了因脏数据导致的会话自愈死循环问题。
    *   合并了 `#2277`：修复了查询中收到 follow-up 消息时路由不刷新的问题。
    *   合并了 `#2267`：修复了多会话场景下 A2A (Agent-to-Agent) 回复路由到错误会话（脑裂）的严重 Bug。
    *   合并了 `#2692`：针对 Claude API 的瞬时 5xx 错误，在 SDK 重试耗尽时增加了显式的错误通知，取代了之前的静默丢弃。

---

### 4. 社区热点
今日社区讨论的焦点集中在**系统容错机制**与**版本迁移**上：

*   **消息静默丢弃问题 ([#2506](https://github.com/nanocoai/nanoclaw/issues/2506))**：这是今日评论数最多的 Issue（3条）。开发者 @mshirel 指出，当两轮对话在 60 秒内连续完成时，`send_message` 的去重机制会静默丢弃响应，导致客户端超时。这反映了当前流式事件处理在高频交互场景下的可靠性盲区。
*   **V1 到 V2 的迁移迷茫 ([#2632](https://github.com/nanocoai/nanoclaw/issues/2632))**：用户 @arthurkrupa 正在尝试将使用旧版 Telegram swarm 功能的分支迁移至 v2，但对当前仓库中相关代码的暧昧状态感到困惑。这暴露出 v2 架构重构期间，部分历史功能的文档和迁移指南存在缺失。

---

### 5. Bug 与稳定性
今日报告的 Bug 主要围绕**系统边界异常**和**权限控制**，部分已有对应修复方案：

*   **[严重] Agent 挂起无超时机制 ([#2668](https://github.com/nanocoai/nanoclaw/issues/2668))**：@mshirel 报告当某个 MCP 工具卡死时，由于 SDK 在执行期间不发出事件，会导致整个会话最长阻塞 30 分钟直到被冷杀。目前尚无对应修复 PR，需密切关注。
*   **[严重] 权限越权漏洞 ([#2711](https://github.com/nanocoai/nanoclaw/issues/2711))**：@jonazri 指出 `create_agent` MCP 工具虽然注释标明仅限管理员，但实际上未做任何鉴权，任何容器均可创建 Agent 组。今日提交的安全加固 PR ([#2748](https://github.com/nanocoai/nanoclaw/pull/2748)) 预计将从底层容器级别缓解此类风险。
*   **[中等] 预算耗尽时的静默失败 ([#2751](https://github.com/nanocoai/nanoclaw/issues/2751))**：@assapin 报告当云端 Org 触达共享 Key 预算上限时，网关返回的伪造 200 状态码被 SDK 当作正常成功处理，导致用户得不到任何回复。该 Issue 创建当天即被关闭，可能已在最新代码中解决。
*   **[已修复] 损坏的数据库日志恢复 ([#2750](https://github.com/nanocoai/nanoclaw/pull/2750))**：@sturdy4days 提交 PR，修复了当容器被强制杀死后，宿主机只读的 `outbound.db` 句柄因日志损坏而失效的问题。

---

### 6. 功能请求与路线图信号
从今日新开的待合并 PR 中，可以清晰看出项目近期的演进路线图正在向**纵深安全防御**和**Provider 生态**扩展：

*   **容器级零信任安全架构**：
    *   ([#2748](https://github.com/nanocoai/nanoclaw/pull/2748)) 提出使用 `--cap-drop=ALL`、禁止提权以及限制进程数（pids-limit）来硬隔离 Agent 容器。
    *   ([#2749](https://github.com/nanocoai/nanoclaw/pull/2749)) 增加对 NPM 安装包的“发布时间”检查，强制要求至少发布 3 天以上，防止供应链投毒攻击。
*   **Provider 架构解耦与能力扩展**：
    *   ([#2745](https://github.com/nanocoai/nanoclaw/pull/2745)) 引入 Provider 持久化记忆脚手架。
    *   ([#2746](https://github.com/nanocoai/nanoclaw/pull/2746)) 引入基于能力的表面对象注册机制。
    这两个 PR 表明 NanoClaw 正在构建一个类似“插件化”的 Provider 生态，允许不同模型/服务商以更标准化的方式接入宿主环境。
*   **基础设施依赖更新**：
    *   ([#2747](https://github.com/nanocoai/nanoclaw/pull/2747)) 将 OneCLI SDK 大版本升级至 2.2.1，并引入凭证存根挂载机制。

---

### 7. 用户反馈摘要
综合今日的 Issue 和 PR 描述，提炼出以下真实用户痛点：
1.  **“静默失败”是当前最大的体验杀手**：无论是 API 超时、去重机制还是预算上限，系统倾向于“吞掉消息”而不是“抛出错误提示”，这给排查带来了极大困难。
2.  **多渠道文件处理不够统一**：Discord 用户 ([#2752](https://github.com/nanocoai/nanoclaw/pull/2752)) 和 Signal 用户过去在发送文件时遇到了各种“文件丢失”、“空文件”问题。近期的一系列合并 PR 正是为了彻底根治这一痛点。
3.  **复杂 Agent 交互场景仍显脆弱**：用户越来越倾向于使用 A2A (Agent to Agent) 和多会话并行，但暴露出的路由错乱和心跳阻塞问题说明，高并发状态机管理依然是项目的薄弱环节。

---

### 8. 待处理积压
*   **[重要] 卡死的 MCP 工具导致系统挂起 ([

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# 📊 IronClaw 项目动态日报 (2026-06-13)

## 1. 今日速览
IronClaw 项目在 2026 年 6 月 13 日表现出极高的开发活跃度，过去 24 小时内共有 **100 个** Issues 和 Pull Requests 发生状态更新（Issues 50 个，PR 50 个），其中包含 30 个新开 Issue 和 33 个待合并 PR。
项目当前的重心明显分为两大主轴：一是 **Reborn 引擎及 WebUI v2 的密集 Bug 修复与交互打磨**，主要集中在多线程会话、身份验证和前端显示问题上；二是 **底层架构的深度重构**，特别是针对并发线程的 `DeferredBusy` 处理机制和即将引入的完整附件系统基础设施。整体来看，项目正处于新版本发布前的高强度功能集成与质量收敛阶段。

---

## 2. 版本发布
**今日无新版本发布。**
*(注：包含多个核心 crate 破坏性更新的 Release PR [#3708](https://github.com/nearai/ironclaw/pull/3708) 仍处于 Open 状态，预计将在近期合并。)*

---

## 3. 项目进展
今日没有合并大型功能性 PR，但关闭了大量关键架构和系统安全性相关的 PR，显著提升了系统的稳定性和可测试性：

*   **并发消息处理机制演进**：核心贡献者 @henrypark133 关闭了引入 `DeferredBusy` 排水机制的 [PR #4812](https://github.com/nearai/ironclaw/pull/4812)。紧随其后，开启了 [PR #4838](https://github.com/nearai/ironclaw/pull/4838)，将原本的“静默挂起并重试”逻辑重构为“显式拒绝并反馈”的更安全交互模式，优化了多线程运行时的并发预期。
*   **安全与 Hook 审计增强**：合并了由 @zmanian 提交的多个安全相关 PR，包括记录授权连续调度失败 ([PR #4562](https://github.com/nearai/ironclaw/pull/4562))、限制 Capability dispatch 扇出上限 ([PR #4568](https://github.com/nearai/ironclaw/pull/4568))，以及强制执行租户谓词键聚合上限 ([PR #4569](https://github.com/nearai/ironclaw/pull/4569))，大幅增强了多租户环境下的系统鲁棒性。
*   **QA 基础设施建设**：@serrrfirat 关闭了 [PR #4773](https://github.com/nearai/ironclaw/pull/4773)，为 Reborn runtime 引入了录制/回放机制，使得在 CI 中确定性回放真实 LLM 行为成为可能，大幅降低了 QA 测试成本。

---

## 4. 社区热点
今日讨论最热烈（评论数最多）的 Issues 主要围绕架构设计边界和用户体验痛点：

*   **[#4817](https://github.com/nearai/ironclaw/issues/4817) [OPEN] - 评论数: 3**
    *   *热点分析*：关于 `DeferredBusy` 排水机制的后续架构设计讨论。核心诉求是决定消息重新提交的入口点策略、陈旧意图的处理策略等。这表明核心团队在做架构决策时非常谨慎，积极在社区同步设计思路。
*   **[#4825](https://github.com/nearai/ironclaw/issues/4825) [OPEN] - 评论数: 3**
    *   *热点分析*：跨线程“总是允许”权限持久化的需求。这是一个强烈的用户痛点反馈——用户不希望在每个新对话中都重复进行权限授权。
*   **[#4703](https://github.com/nearai/ironclaw/issues/4703) [CLOSED] - 评论数: 3**
    *   *热点分析*：NEAR AI 模型选择器保存了展示名称而非模型 ID 导致的集成错误。这是典型的前后端契约不一致问题，引发了较多讨论并已被修复。

---

## 5. Bug 与稳定性
今日报告并处理的 Bug 数量较多（主要由 @sunglow666 提交），涵盖前端 UI 交互、状态管理和集成等多个层面。按严重程度排列如下：

### 严重 - 核心流程阻断
*   **[#4762](https://github.com/nearai/ironclaw/issues/4762) 工具流失败导致后续消息乱序**：当工具工作流失败时，后续的消息和活动排序会变得不一致，严重影响对话逻辑。
*   **[#4705](https://github.com/nearai/ironclaw/issues/4705) / [#4706](https://github.com/nearai/ironclaw/issues/4706) 授权流无法恢复 / SSO 失败**：本地环境中 GitHub/Google SSO 失败，且授权取消后系统无法正常恢复状态。

### 中等 - 状态持久化与配置问题
*   **[#4673](https://github.com/nearai/ironclaw/issues/4673) 配置无法保存**：NEAR AI 连接测试成功，但点击保存时静默失败。（已关闭/修复）
*   **[#4697](https://github.com/nearai/ironclaw/issues/4697) Provider 状态不一致**：Inference 设置页面的 Active Provider 展示与实际路由不符。
*   **[#4696](https://github.com/nearai/ironclaw/issues/4696) 虚假的连接成功**：Ollama 未运行时，Test connection 依然返回 `ok: true`。

### 较低 - UI/UX 交互影响
*   **[#4733](https://github.com/nearai/ironclaw/issues/4733) 点击链接跳出对话**：[已关闭] 响应中的链接在当前页打开，中断聊天工作流。
*   **[#4722](https://github.com/nearai/ironclaw/issues/4722) 缺失身份标识**：[已关闭] 对话气泡不显示用户和助手的头像/名称。
*   **[#4725](https://github.com/nearai/ironclaw/issues/4725) 工作状态交互异常**：[已关闭] 助手生成时，输入框禁用但样式仍显示为可交互。
*   **[#4720](https://github.com/nearai/ironclaw/issues/4720) / [#4724](https://github.com/nearai/ironclaw/issues/4724)**：[已关闭] 附件警告跨对话残留 / 未发送的草稿丢失。
*   **[#4719](https://github.com/nearai/ironclaw/issues/4719)**：[已关闭] 返回聊天页面时内容区闪烁。

---

## 6. 功能请求与路线图信号
今日的 Issue 和 PR 透露了项目近期的重点演进方向：

*   **全局权限与审批流**：[Issue #4825](https://github.com/nearai/ironclaw/issues/4825) 提出的跨线程权限申请已被 [PR #4835](https://github.com/nearai/ironclaw/pull/4835) 实现。将 `thread_id` 从持久化审批范围中移除，大幅优化多线程使用体验。
*   **Agent Loop 智能体兜底逻辑**：[PR #4837](https://github.com/nearai/ironclaw/pull/4837) 引入了“门控最终回答提示”，当 Agent 陷入死循环或输出为空时，强制发起一次无工具的模型调用以生成总结，增强了智能体的自愈能力。
*   **运行时上下文切片**：[Issue #4828](https://github.com/nearai/ironclaw/issues/4828) 及对应的 [PR #4836](https://github.com/nearai/ironclaw/pull/4836) 旨在让 LLM 在每次循环启动时感知当前连接的通道（如 Slack）和投递状态，这标志着 IronClaw 正在增强 LLM 的多端感知和适配能力。
*   **大型文件/附件支持体系成型**：@ilblackdragon 推进

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

一份基于您提供的 GitHub 数据生成的 LobsterAI 项目动态日报。

# 📊 LobsterAI 项目动态日报 (2026-06-13)

## 1. 今日速览
今日 LobsterAI 项目整体呈现出**高活跃度与强迭代节奏**，核心开发团队正专注于新版本的发布准备与稳定性加固。过去 24 小时内，项目共处理了 17 个 PR（其中 11 个顺利合并/关闭）和 1 个 Issue。核心进展体现在两个维度：一是正式将包含“Computer Use MVP”和“实时 ASR 语音输入”等重磅功能的 `release/2026.6.11` 分支合并入主分支；二是集中合并了一批由社区贡献的 UX 改进 PR，大幅修复了表单、草稿和设置面板中“内容静默丢失”的痛点。整体来看，项目在 AI 智能体交互（如视觉控制、语音）的探索上迈出了坚实的一步，且社区反馈处理效率较高。

## 2. 版本发布
*   **最新 Releases**: 本日无正式版本发布。
*   **版本库动态**: 距离下一个正式版（预计为 `2026.6.12`）已越来越近。维护者 @liuzhq1986 已于今日将核心发布分支合并入 `main` ([#2158](https://github.com/netease-youdao/LobsterAI/pull/2158))。

## 3. 项目进展
今日项目在功能迭代和体验优化上取得了显著突破，主要体现在以下几个领域：

*   **新版本核心功能落地**: 
    *   **发布合并** [PR #2158](https://github.com/netease-youdao/LobsterAI/pull/2158): 成功将 `release/2026.6.11` 合并至主干。引入了 Computer Use (计算机视觉控制) MVP 及内置套件、实时 ASR 语音输入、HTML artifact 公共分享模式，以及图片和 SVG 分享支持。
*   **AI 基础能力与模型调度优化**:
    *   **模型选择修正** [PR #2153](https://github.com/netease-youdao/LobsterAI/pull/2153): 修复了同名包模型在自定义模型选择时被覆盖的问题。
    *   **流式输出优化** [PR #2154](https://github.com/netease-youdao/LobsterAI/pull/2154): 确保在被手动中断的流式响应中依然能保留并显示模型元数据。
*   **多模态与交互体验修复**:
    *   **媒体保存** [PR #2157](https://github.com/netease-youdao/LobsterAI/pull/2157): 修复了文生图保存时的扩展名错误，现在会根据文件真实字节格式覆盖后缀。
    *   **语音输入** [PR #2155](https://github.com/netease-youdao/LobsterAI/pull/2155): 修复了实时 ASR 语音输入可能被重复触发的并发问题。
    *   **Computer Use 运行时** [PR #2156](https://github.com/netease-youdao/LobsterAI/pull/2156): 将 Computer Use 运行时版本升级至 1.0.7，增强了异常退出时的诊断能力。

## 4. 社区热点
*   **历史遗留 API 兼容问题结案**：今日唯一一条状态更新的 Issue 是 [#1 (CLOSED)](https://github.com/netease-youdao/LobsterAI/issues/1)。该 Issue 暴露了早期版本（2月份）中，用户在 Mac 端将特定 API（如 MiniMaxi）设置为 OpenAI 消息格式调用时出现的参数错误。该问题的关闭标志着底层 API 网关兼容性已得到有效修复。
*   **防止内容丢失的批量贡献**：开发者 @MaoQianTu 集中提交并今日被合并了 5 个 PR（[#1473](https://github.com/netease-youdao/LobsterAI/pull/1473) - [#1477](https://github.com/netease-youdao/LobsterAI/pull/1477)），针对 Agent 创建、MCP 配置、会话切换、历史消息重编辑等极易引发“内容静默丢失”的场景加入了完善的二次确认机制，极大提升了用户操作的踏实感。

## 5. Bug 与稳定性
今日报告及处理的核心 Bug 严重程度分布如下：

*   **🚨 严重 - 网关无限重启导致应用瘫痪 (已提交 Fix PR，待合并)**
    *   [PR #1446](https://github.com/netease-youdao/LobsterAI/pull/1446): OpenClaw 网关由于竞态条件（进程自行崩溃退出时仍触发重启定时器），会导致应用陷入无限重启死循环。
*   **🚨 严重 - 逻辑失效：停用技能仍被注入提示词 (已提交 Fix PR，待合并)**
    *   [PR #1453](https://github.com/netease-youdao/LobsterAI/pull/1453): 用户在前端停用技能后，由于 Redux 状态未及时同步清理 `activeSkillIds`，导致隐私或冗余提示词依然发送给大模型。
*   **🔶 中度 - 快捷键冲突无检测 (已提交 Fix PR，待合并)**
    *   [PR #1456](https://github.com/netease-youdao/LobsterAI/pull/1456): 设置中允许不同功能绑定完全相同的快捷键，导致功能静默失效。
*   **🟢 低度 - UI 无反馈 (已提交 Fix PR，待合并)**
    *   [PR #1454](https://github.com/netease-youdao/LobsterAI/pull/1454): 定时任务清空日期后点击创建无反应且无报错。

## 6. 功能请求与路线图信号
从近期的代码合并动态来看，LobsterAI 的下一步产品路线图明确指向 **“深度工作流与多模态融合”**：
1.  **Computer Use (计算机视觉操控)**：MVP 版本已随 PR [#2158](https://github.com/netease-youdao/LobsterAI/pull/2158) 和 [#2156](https://github.com/netease-youdao/LobsterAI/pull/2156) 进场，表明项目正在对标行业头部，赋予 AI 操控本地 GUI 的能力。
2.  **定时任务与自动化**：[PR #1449](https://github.com/netease-youdao/LobsterAI/pull/1449) 提出了将定时任务产生的海量会话进行“折叠分组展示”的功能。由于自动化任务是 AI Agent 的核心场景，该 PR 极有可能在完善后被纳入下个版本。

## 7. 用户反馈摘要
通过对 Issue 和 PR 记录的剖析，提炼出以下用户真实痛点：
1.  **状态同步焦虑**：用户对“配置没保存上”、“误触导致输入被清空”极度反感。@MaoQianTu 批量提交的防丢失 PR 侧面印证了**草稿恢复和脏检查机制**是目前用户的核心诉求。
2.  **异构 API 适配需求强**：用户习惯于使用 OpenAI 的消息格式标准去调用各类第三方中模型（如国内的 MiniMax），底层对非标准字段容错的容忍度要求极高。
3.  **AI 幻觉与控制力**：用户对已关闭的技能仍被调用感到担忧，反映出用户期望对发送给大模型的上下文（Context / System Prompt）拥有绝对的透明度和控制权。

## 8. 待处理积压
当前积压库中有 6 个带有 `[stale]` 标签的 PR 亟待核心团队 Review。建议优先处理以下两项可能引发严重故障的 PR：
1.  **[P0] 网关无限重启**：[PR #1446](https://github.com/netease-youdao/LobsterAI/pull/1446) 修复了网关竞态条件，直接关系到应用的基本可用性。
2.  **[P1] 技能注入穿透**：[PR #1453](https://github.com/netease-youdao/LobsterAI/pull/1453) 涉及对话上下文污染，影响 AI 输出准确性。
*(注：其余积压包括 i18n 翻译遗漏 [PR #1448](https://github.com/netease-youdao/LobsterAI/pull/1448) 及定时任务 UI 优化 [PR #1454](https://github.com/netease-youdao/LobsterAI/pull/1454) 与 [PR #1449](https://github.com/netease-youdao/LobsterAI/pull/1449)，建议维护者在发布完 v2026.6.12 正式版后安排集中清理)*。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下是为您生成的 2026-06-13 CoPaw (QwenPaw) 项目动态日报。

---

# 📊 CoPaw (QwenPaw) 项目动态日报 - 2026年06月13日

## 1. 今日速览
过去 24 小时内，CoPaw (QwenPaw) 项目保持极高的开发与社区活跃度。共处理了 **21 个 Issue**（14 个新开，7 个关闭）和 **23 个 PR**（13 个待合并，10 个已合并/关闭）。
整体来看，项目目前正处于 **v1.1.12 版本的紧锣密鼓筹备阶段**（已有版本号变更 PR），开发重心集中在**底层架构升级（Runtime 2.0）、前端 Console 体验打磨（UI 渲染、状态保持）以及渠道能力扩展**。不过，近期版本（v1.1.11）引发的稳定性问题（如宕机重启、部分模型 Tool Calling 回归错误）需要引起开发团队的高度关注。

---

## 2. 版本发布
*   **正式版发布**：今日无新版本发布。
*   **开发版动态**：已合并/创建 PR [#5157](https://github.com/agentscope-ai/QwenPaw/pull/5157) 与 [#5159](https://github.com/agentscope-ai/QwenPaw/pull/5159)，将版本号升级至 `1.1.12b1` (1.1.12 Beta 1)。这标志着下一个迭代周期已经开启，预计近期将主要进行 Bug 修复和新特性的灰度测试。

---

## 3. 项目进展
今日共有 10 个 PR 被合并或关闭，显著推进了系统稳定性和前端体验：
*   **前端交互与状态修复**：
    *   合并 [PR #5144](https://github.com/agentscope-ai/QwenPaw/pull/5144)：修复了折叠面板未展开时表单数据丢失的问题，解决了长期记忆配置无法保存的痛点。
    *   合并 [PR #5147](https://github.com/agentscope-ai/QwenPaw/pull/5147)：修复了 Coding Mode 刷新后 Session 丢失并被错误重定向的缺陷。
    *   合并 [PR #5154](https://github.com/agentscope-ai/QwenPaw/pull/5154)：重构了记忆搜索工具的前端渲染样式，解决了表格数据显示 `unknown` 的问题。
*   **底层架构与安全性**：
    *   结束审查 [PR #5078](https://github.com/agentscope-ai/QwenPaw/pull/5078)：引入 **Runtime 2.0 模块化架构** 及 `ToolCoordinator` 层，为复杂的工具调用生命周期提供精细化控制，这是迈向下一个大版本的重要基石。
    *   合并 [PR #5022](https://github.com/agentscope-ai/QwenPaw/pull/5022)：增加了 Agent 工作区路径的校验，防止恶意或误操作将工作区恢复到系统核心目录，提升了系统安全性。
*   **CI/CD 建设**：合并 [PR #5121](https://github.com/agentscope-ai/QwenPaw/pull/5121)，在构建和发布之间引入了自动化验证门禁，确保发布包的可用性。

---

## 4. 社区热点
今日社区讨论最热烈的 Issue 集中在**核心功能可用性**与**底层依赖升级**上：
*   **定时任务功能失效**：[#5064](https://github.com/agentscope-ai/QwenPaw/issues/5064) (11条评论)。用户反馈 Agent 生成的定时任务无法自动触发，且不支持手动编辑。该问题严重影响了自动化工作流，目前仍在排查中。
*   **AgentScope 2.0 迁移大计**：[#4727](https://github.com/agentscope-ai/QwenPaw/issues/4727) (10条评论)。官方计划将后端从 AgentScope 1.x 迁移至 2.0。这是一个破坏性变更（Breaking Change），引发了开发者和用户的积极讨论。
*   **飞书渠道长文本流式输出卡顿**：[#5167](https://github.com/agentscope-ai/QwenPaw/issues/5167) (1条评论，但反馈质量极高)。用户深度剖析了飞书 CardKit 流式卡片在长文本场景下“一个字一个字往外吐”的性能体验问题，呼唤底层刷新机制的优化。

---

## 5. Bug 与稳定性
今日报告了多个与 v1.1.11 版本相关的 Bug，部分涉及系统崩溃和模型调用回归，按严重程度排列如下：

🔴 **严重 (P0 - 影响系统可用性)**
*   **Docker 宕机重启**：[#5155](https://github.com/agentscope-ai/QwenPaw/issues/5155)。用户反馈升级到 1.1.11 后，Docker 环境下会出现不定时的自动宕机重启。
*   **长对话卡死无响应**：[#5161](https://github.com/agentscope-ai/QwenPaw/issues/5161)。当上下文变长时，QwenPaw 直接卡住停止响应。

🟠 **较高 (P1 - 核心功能受损/回归)**
*   **Gemini Tool Calling 失效**：[#5163](https://github.com/agentscope-ai/QwenPaw/issues/5163)。确认在 `v1.1.10` 正常，但在 `v1.1.11.post2` 中出现回归，导致 Gemini 模型的工具调用失效。
*   **Python 3.13 兼容性崩溃**：[#5166](https://github.com/agentscope-ai/QwenPaw/issues/5166)。因为 Python 3.13 移除了 `imghdr` 模块，导致安装 TeamChat 插件失败。
*   **对话逻辑死循环**：[#5162](https://github.com/agentscope-ai/QwenPaw/issues/5162)。Agent 在思考时进入无限循环。

🟡 **一般 (P2 - 影响局部体验，部分已修复)**
*   **附件下载 404**：[#5140](https://github.com/agentscope-ai/QwenPaw/issues/5140) (纯文本可下，docx/pdf 报错，已关闭)。
*   **数学公式渲染错误**：[#5148](https://github.com/agentscope-ai/QwenPaw/issues/5148), [#5143](https://github.com/agentscope-ai/QwenPaw/issues/5143) (根号显示为横线，已关闭)。
*   **打包后白屏**：[#5165](https://github.com/agentscope-ai/QwenPaw/issues/5165)。由于 PyInstaller spec 文件引用了不存在的模块，导致打包出的 exe 启动白屏。

---

## 6. 功能请求与路线图信号

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