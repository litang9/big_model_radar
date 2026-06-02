# OpenClaw 生态日报 2026-06-02

> Issues: 466 | PRs: 500 | 覆盖项目: 11 个 | 生成时间: 2026-06-02 13:39 UTC

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

# OpenClaw 项目动态日报 — 2026-06-02

---

## 1. 今日速览

OpenClaw 今日保持**高活跃度**运行：过去 24 小时内共处理 **466 条 Issue 更新**（新开/活跃 275 条，关闭 191 条）和 **500 条 PR 更新**（待合并 386 条，合并/关闭 114 条），社区参与度持续强劲。项目发布了 **v2026.6.1-beta.2**，聚焦于 Agent 运行时恢复能力增强和多渠道（Telegram、WhatsApp、iMe）消息投递稳定性。当前待合并 PR 积压较高（386 条），但关闭率（Issue 关闭率约 41%）表明维护团队在积极消化存量。Session 状态管理和消息丢失仍是社区反馈最密集的领域，Feishu 渠道问题尤为突出。

---

## 2. 版本发布

### v2026.6.1-beta.2

**发布时间：** 2026-06-02  
**链接：** 见 GitHub Releases 页面

**核心更新：**

- **Agent 与 CLI 运行时恢复增强**：针对中断的工具调用、过期 session 绑定、压缩交接（compaction handoffs）和媒体投递重试，Agent 恢复逻辑更加健壮。涉及修复 #88129, #88136, #88141, #88162, #88182。
- **多渠道消息投递更稳定**：Telegram、WhatsApp、iMe 等渠道的消息投递可靠性提升。

**迁移注意事项：**
- 本次为 beta 版本，建议生产环境谨慎升级，特别是依赖 Feishu 渠道的用户（当前存在多个未完全解决的 Feishu 相关 Bug）。
- 从 2026.5.x 升级的用户需注意 Codex provider/runtime 配置同步问题（详见 #87650）。

---

## 3. 项目进展

### 今日合并/关闭的重要 PR

| PR | 标题 | 意义 |
|---|---|---|
| [#89128](https://github.com/openclaw/openclaw/pull/89128) | fix: skip Responses item id replay without store | 修复非持久化 Responses 路由重放过期 item id 的问题，对应已关闭的 Issue [#89330](https://github.com/openclaw/openclaw/issues/89330) |
| [#89303](https://github.com/openclaw/openclaw/pull/89303) | Add reply-scoped Telegram stop commands | 为 Telegram 增加 reply 级别的 `/cancel`/`/stop` 命令，支持精确终止特定任务 |

### 今日关闭的重要 Issue（标志已修复）

| Issue | 问题 | 状态 |
|---|---|---|
| [#87646](https://github.com/openclaw/openclaw/issues/87646) | Feishu 升级后消息投递 TypeError（P1） | ✅ 已关闭 |
| [#84820](https://github.com/openclaw/openclaw/issues/84820) | 未关闭 FileHandle 导致 Node ≥24 崩溃（P1） | ✅ 已关闭 |
| [#86044](https://github.com/openclaw/openclaw/issues/86044) | Windows CLI 因 provider auth 预热而挂起（P1） | ✅ 已关闭 |
| [#69220](https://github.com/openclaw/openclaw/issues/69220) | Gemini text-tag reasoning 与 native thinking 冲突（P1） | ✅ 已关闭 |
| [#87650](https://github.com/openclaw/openclaw/issues/87650) | Codex provider/runtime 升级后不匹配（P1） | ✅ 已关闭 |
| [#88039](https://github.com/openclaw/openclaw/issues/88039) | Session 选定模型错误包含在 fallback 列表中 | ✅ 已关闭 |
| [#76654](https://github.com/openclaw/openclaw/issues/76654) | WebChat 心跳工具调用后 Agent 回复消失 | ✅ 已关闭 |
| [#84614](https://github.com/openclaw/openclaw/issues/84614) | GPT 模型通过 github-copilot provider 在隔离 session 中失败 | ✅ 已关闭 |

**整体评估：** 今日关闭了多个 P1 级别的关键 Bug，涵盖 Windows CLI 挂起、Node 24 崩溃、Feishu 投递失败等高频痛点，项目稳定性修复节奏积极。

---

## 4. 社区热点

### 讨论最活跃的 Issue（按评论数排序）

| # | Issue | 评论 | 👍 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#52875](https://github.com/openclaw/openclaw/issues/52875) Session_send gives no session found | 21 | 1 | Agent 间通信的核心能力 `session_send` 在升级后失效，用户主 Agent 无法联系其他 Agent。**长期未解决的回归问题（3月报告至今）**，标签含 `stale`、`regression`、`message-loss` |
| 2 | [#67035](https://github.com/openclaw/openclaw/issues/67035) Windows 聊天 UI 回归：输入被吞、流式回复不可见 | 14 | 0 | Windows 平台 Web UI 体验严重退化，输入文字不显示、流式回复需刷新才可见 |
| 3 | [#88838](https://github.com/openclaw/openclaw/issues/88838) Track SQLite 迁移 via accessor seam | 14 | 1 | 维护者发起的架构讨论：将 session/transcript 运行时状态从大型重写拆分为小增量 PR，降低迁移风险 |
| 4 | [#80380](https://github.com/openclaw/openclaw/issues/80380) 升级到 gemini-3.1-flash-lite GA 版 | 14 | 4 | 社区要求跟进 Google 最新 GA 模型，替换即将弃用的 preview 版本 |
| 5 | [#39604](https://github.com/openclaw/openclaw/issues/39604) 允许 web_fetch 访问私有网络 | 13 | 9 | **👍 最多的功能请求之一**：用户希望 `web_fetch` 工具能 opt-in 访问内网地址（localhost、10.x 等），涉及安全边界审查 |
| 6 | [#88312](https://github.com/openclaw/openclaw/issues/88312) Codex turn-completion stall 回归 | 10 | 2 | 2026.5.27 引入的回归，多工具 Agent turn 可靠性失败，是 #84076 的二次回归 |
| 7 | [#52249](https://github.com/openclaw/openclaw/issues/52249) ACP parent session 等待子任务时卡住 | 9 | 0 | Agent-to-Agent 流程中，父 session 在等待子完成时卡住直到手动刷新 |
| 8 | [#86519](https://github.com/openclaw/openclaw/issues/86519) Telegram 5.20 后 Agent 重复回复 2-10 次 | 9 | 1 | Telegram 渠道严重消息重复问题，升级后从 8-10x 降至 2-3x 但未根治 |

### 热点 PR

| PR | 标题 | 亮点 |
|---|---|---|
| [#85651](https://github.com/openclaw/openclaw/pull/85651) | context-pressure-aware continuation | **大型特性 PR（XL）**：Agent 自主续写/委派/请求压缩，解决长任务中 Agent 被动等待的问题 |
| [#88815](https://github.com/openclaw/openclaw/pull/88815) | channel echo / session pinning | 新增 session 消息镜像到多渠道能力，支持跨平台同步 |
| [#87072](https://github.com/openclaw/openclaw/pull/87072) | Telegram interleaved progress lane | 为 Telegram 增加可选的实时推理进度展示，匹配 CLI 体验 |

**社区诉求分析：**
- **Session 管理是最大痛点**：多个高分 Issue 都围绕 session 查找失败、状态丢失、消息不送达
- **多渠道稳定性**：Feishu、Telegram、Discord 渠道均有独立 Bug，但核心问题都指向 session routing 层
- **架构改进讨论积极**：SQLite 迁移拆分方案（#88838）获得维护者和社区建设性讨论

---

## 5. Bug 与稳定性

### 🔴 P1 级别（严重，影响核心功能）

| Issue | 问题 | 渠道/组件 | 是否有 Fix PR | 状态 |
|---|---|---|---|---|
| [#52875](https://github.com/openclaw/openclaw/issues/52875) | `session_send` 找不到 session | Agent 通信 | ⚠️ 无新 fix PR | OPEN（3月至今） |
| [#67035](https://github.com/openclaw/openclaw/issues/67035) | Windows Web UI 输入吞字/流式回复不可见 | Web UI | ⚠️ 无新 fix PR | OPEN |
| [#88312](https://github.com/openclaw/openclaw/issues/88312) | Codex turn-completion stall 回归 | Codex | ⚠️ 无新 fix PR | OPEN（二次回归） |
| [#86519](https://github.com/openclaw/openclaw/issues/86519) | Telegram Agent 重复回复 2-10 次 | Telegram | ⚠️ 无新 fix PR | OPEN |
| [#52249](https://github.com/openclaw/openclaw/issues/52249) | ACP 父 session 等待子完成时卡住 | Agent 通信 | ⚠️ 无新 fix PR | OPEN |
| [#88369](https://github.com/openclaw/openclaw/issues/88369) | Cron 专用 Agent 仍自冲突 | Cron | ⚠️ 无新 fix PR | OPEN |
| [#77467](https://github.com/openclaw/openclaw/issues/77467) | MiniMax Portal OAuth token 无法自动刷新 | Auth Provider | ⚠️ 无新 fix PR | OPEN（5月至今） |
| [#79552](https://github.com/openclaw/openclaw/issues/79552) | Android 节点 WebSocket 握手前发事件导致丢失 | Mobile | ⚠️ 无新 fix PR | OPEN |
| [#41199](https://github.com/openclaw/openclaw/issues/41199) | Agent 间通信工具参数冲突 | Agent 通信 | 有 linked PR | OPEN |

### 🟡 P2 级别（中等）

| Issue | 问题 | 状态 |
|---|---|---|
| [#85692](https://github.com/openclaw/openclaw/issues/85692) | Feishu Agent 间歇性返回空回复 | OPEN |
| [#87938](https://github.com/openclaw/openclaw/issues/87938) | Feishu DM session 重启后重复键 + 维护修剪 | OPEN |
| [#77136](https://github.com/openclaw/openclaw/issues/77136) | WebChat 部分助手消息不渲染（TUI 正常） | OPEN |
| [#86063](https://github.com/openclaw/openclaw/issues/86063) | Anthropic 1h 缓存每轮失效 | OPEN |
| [#80036](https://github.com/openclaw/openclaw/issues/80036) | Chrome MCP existing-session 页面工具超时 | OPEN |
| [#82020](https://github.com/openclaw/openclaw/issues/82020) | 自定义 provider 共享 baseUrl 回归 | OPEN |

### 🟢 今日已修复

| Issue | 修复说明 |
|---|---|
| [#87646](https://github.com/openclaw/openclaw/issues/87646) | Feishu dispatch TypeError 已修复 |
| [#84820](https://github.com/openclaw/openclaw/issues/84820) | Node ≥24 FileHandle 崩溃已修复 |
| [#86044](https://github.com/openclaw/openclaw/issues/86044) | Windows CLI provider auth 挂起已修复 |
| [#69220](https://github.com/openclaw/openclaw/issues/69220) | Gemini reasoning mode 冲突已修复 |
| [#89330](https://github.com/openclaw/openclaw/issues/89330) | Responses item id replay 已通过 [PR #89128](https://github.com/openclaw/openclaw/pull/89128) 修复 |

**稳定性评估：** Feishu 渠道是当前 Bug 密度最高的组件（4 个活跃 Issue），且多数涉及消息丢失。Session 状态管理作为底层基础设施，长期存在回归风险。建议关注 v2026.6.1 正式版的 release notes 是否纳入相关修复。

---

## 6. 功能请求与路线图信号

### 高信号功能请求

| Issue | 需求 | 👍 | 对应 PR | 落地可能性 |
|---|---|---|---|---|
| [#39604](https://github.com/openclaw/openclaw/issues/39604) | `tools.web.fetch.allowPrivateNetwork` 私有网络访问 | 9 | 有 linked PR | 🟡 中（需安全审查） |
| [#80380](https://github.com/openclaw/openclaw/issues/80380) | 升级到 gemini-3.1-flash-lite GA | 4 | 无 | 🟢 高（简单配置更新） |
| [#35203](https://github.com/openclaw/openclaw/issues/35203) | 多 Agent 协作增强（能力画像+共享黑板+分层记忆+Token 治理） | 0 | 无 | 🔴 低（大型 RFC，需产品决策） |
| [#76159](https://github.com/openclaw/openclaw/issues/76159) | Cron 任务 `acceptSilentStop` 标志 | 1 | 无 | 🟡 中 |
| [#81061](https://github.com/openclaw/openclaw/issues/81061) | `before_route_inbound_message` 预路由钩子 | 2 | 无 | 🟡 中（架构改动） |
| [#61502](https://github.com/openclaw/openclaw/issues/61502) | Slack 交互按钮可靠触达 session | 2 | 无 | 🟡 中 |

### 架构演进信号

- **Session/Transcript SQLite 迁移**（[#88838](https://github.com/openclaw/openclaw/issues/88838)）：维护者 @jalehman 提议通过 branch-by-abstraction 增量拆分，避免一次性大型重写。14 条评论显示社区对此有强烈共识

---

## 横向生态对比

这是一份基于 2026 年 6 月 2 日各大开源项目社区动态生成的横向对比分析报告，旨在为技术决策者和开发者提供全局视角。

---

# 📊 个人 AI 助手与智能体开源生态横向对比分析报告 (2026-06-02)

## 1. 生态全景
当前 AI 智能体与个人助手开源生态正处于**从“单体工具调用”向“多端协同与企业级高可用”演进**的关键期。各大项目在处理复杂 Agent 通信、多模态交互及跨平台渠道时，普遍面临**底层会话状态管理的严峻挑战**。同时，随着具备“深度思考”能力的模型（如 DeepSeek-V4、Kimi）集中爆发，底层框架在**API 兼容性与流式传输适配**上的压力剧增。整体来看，**多渠道无缝接入（IM/桌面端）成为标配，而安全隔离与 Token 降本**正在取代单纯的模型接入，成为社区最核心的诉求。

## 2. 各项目活跃度对比

| 项目名称 | 今日 Issue 动态 | 今日 PR 动态 | 今日 Release 情况 | 核心动向与健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 466 (关闭 191) | 500 (合并 114) | `v2026.6.1-beta.2` | **极高**：吞吐量惊人，重点修复底层运行时恢复与多渠道投递。积压较多，处于快速迭代期。 |
| **LobsterAI** | 0 | 50 (合并 48) | `2026.6.1` 正式版 | **极佳**：内部集中收口，代码合入效率极高，发布包含插件市场等重磅特性的正式版。 |
| **CoPaw** | 43 (关闭 24) | 34 (合并 9) | `v1.1.11b1` Beta | **高**：底层重构至 2.0 架构，社区活跃且安全响应极快，处于架构升级期。 |
| **IronClaw** | 10 | 46 (合并 30) | 无 | **高**：“Reborn”架构重塑，WASM 与 WebUI v2 密集交付，核心团队主导的极速迭代。 |
| **Zeroclaw** | 50 | 50 (合并 17) | 无 | **高**：聚焦 v0.8.0 大版本准备与思考模型兼容性修复，企业级特性（网关/隔离）稳步推进。 |
| **NanoBot** | 6 | 31 (合并 20) | 无 | **健康**：高频重构与修复并发隐患，扩展 QQ/邮件渠道，处于质量巩固期。 |
| **PicoClaw** | 8 | 16 (合并 4) | `v0.2.9-nightly` | **健康**：快速收拢边缘设备 Bug，优化 Token 开销，向多智能体总线演进。 |
| **NanoClaw** | 3 | 7 (合并 3) | 无 | **平稳**：聚焦容器安全隔离与崩溃死循环修复，向生产级容灾架构演进。 |
| **EasyClaw** | 0 | 0 | `v1.8.24-v1.8.26` | **内部驱动**：闭门开发特征明显，单日连发 3 个电商业务相关版本，开源社区呈静默状态。 |
| **TinyClaw / ZeptoClaw**| 0 | 0 | 无 | **静默**：过去 24 小时无活动。 |

## 3. OpenClaw 在生态中的定位
作为生态内的**核心参照系与“事实标准”级项目**，OpenClaw 的定位类似于移动时代的 Android 底层：
*   **规模优势与护城河**：其 Issue 和 PR 处理量级是其他单一项目的 5-10 倍以上。庞大的社区贡献者使其在多渠道覆盖（Telegram、WhatsApp、飞书等）和底层模型兼容性上具有绝对优势。
*   **技术路线差异**：不同于 PicoClaw 追求轻量级或 IronClaw 探索 WASM 前沿架构，OpenClaw 目前的核心精力投入到**复杂状态的持久化（如 SQLite 迁移）和运行时恢复**。这反映出它正在承担极其庞大复杂的企业级/高并发任务，需要解决其他轻量级项目尚未遇到的状态膨胀与路由错乱问题。
*   **痛点暴露**：作为超大archy，其架构摩擦力较大（386条 PR 待合并），且 Session 路由层的不稳定（如飞书渠道问题、消息丢失）已成为当前制约其体验的最核心瓶颈。

## 4. 共同关注的技术方向
从多项目的横向对比中，涌现出高度一致的社区共性诉求：

1.  **会话与状态持久化的重构**
    *   **涉及项目**：OpenClaw, PicoClaw, NanoBot, NanoClaw
    *   **具体诉求**：高并发下的内存泄漏、历史记录丢失、Session 路由错乱成为普遍痛点。OpenClaw 提出 SQLite 迁移，NanoBot 修复了并发写入游标冲突，PicoClaw 优化了前端历史逻辑，底层状态管理是当前全行业的攻坚重点。
2.  **“深度思考”模型的流式适配**
    *   **涉及项目**：Zeroclaw, OpenClaw
    *   **具体诉求**：DeepSeek-V4、Kimi 等模型返回的 `reasoning_content` 和 XML tool tags 常引发流式调用报错或将内部推理过程直接暴露给用户。如何优雅、稳定地剥离/处理思考过程的流式数据，是各家 Agent 框架面临的新挑战。
3.  **沙箱安全与执行隔离**
    *   **涉及项目**：NanoClaw, PicoClaw, CoPaw, Zeroclaw
    *   **具体诉求**：随着 Agent 越来越多地接管系统级操作，对命令执行、容器逃逸的关注度飙升。修复 OS 命令注入漏洞、强化设备配对码、过滤高风险正则命令等成为高频更新。

## 5. 差异化定位分析
*   **通用型重型基础设施**：**OpenClaw**。大而全，适合需要接入一切主流平台、处理海量消息流的企业级中台。
*   **企业级/IM 深度集成**：**LobsterAI** 与 **EasyClaw**。前者在钉钉/飞书等 IM 多实例管理与深度思考控制上发力；后者完全垂直聚焦于跨境电商客服场景，深入 OAuth 并发与 ERP 对接。
*   **前沿架构与高可用探索**：**IronClaw** 与 **Zeroclaw**。IronClaw 重仓 WASM 虚拟化以实现安全与多租户；Zeroclaw 则在推进 Air-gapped 隔离执行，面向金融/高合规场景。
*   **轻量级/边缘计算友好**：**PicoClaw**。专注 RISC-V 等边缘设备适配，致力于极致的 Token 消耗压缩和轻量级部署。

## 6. 社区热度与成熟度
根据活跃度与更新类型，当前生态内的项目可分为三个梯队：
*   **第一梯队（快速扩张与架构重构期）**：**OpenClaw**、**CoPaw**、**IronClaw**。面临架构跃迁（如 AgentScope 2.0、WASM Reborn），社区极度活跃，不仅有大量 Bug 修复，还有频繁的大型特性 PR，属于“痛并快乐着”的高速生长期。
*   **第二梯队（质量收口与企业级交付期）**：**LobsterAI**、**Zeroclaw**、**NanoBot**。活跃度高且非常健康，以合入稳定性修复、打磨 WebUI/UX 为主，发布正式版或准备大版本，代码质量趋于收敛稳定。
*   **第三梯队（单点突破或静默维护期）**：**EasyClaw**（闭门造车发布）、**NanoClaw**、**PicoClaw**。绝对活跃度较低，但方向明确，主要围绕特定安全漏洞或特定硬件进行精准修复。

## 7. 值得关注的趋势信号
1.  **Token 消耗优化成为显学**：随着模型上下文窗口增大，调用成本激增。**PicoClaw** 抛弃每次请求重发 Skill catalog 的做法，以及社区要求针对 DeepSeek 等模型优化“缓存未命中 Token”的呼声，表明**Agent 框架的竞争力正从“能接什么模型”转向“如何更省 Token”**。
2.  **Agent 容灾与自愈成为标配**：简单重试已无法满足需求。**NanoClaw** 引入故障恢复与回滚机制，**OpenClaw** 增强 Agent 运行时恢复，这释放出明确信号：**AI Agent 正在从“玩具”向高可用的生产级计算节点演进**。
3.  **IM 桌面端体验的“App化”**：几乎所有主流项目（LobsterAI, CoPaw, Easy

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

这份 NanoBot 项目 2026-06-02 的动态日报基于您提供的 GitHub 数据生成。

---

# 📊 NanoBot 项目动态日报 (2026-06-02)

## 1. 今日速览
NanoBot 项目今日保持**极高的开发活跃度与社区热度**。过去 24 小时内，项目处理了高达 31 条 Pull Requests（其中 20 条已合并/关闭）和 6 条 Issues。从活动轨迹来看，项目当前正处于**密集的代码重构与功能迭代期**：核心开发团队及社区贡献者集中优化了 WebUI 体验、修复了底层数据并发的稳定性隐患，并显著扩展了外部渠道（如 QQ、邮件）和搜索引擎的生态集。整体而言，项目健康度极佳，缺陷响应速度极快，部分 Bug 甚至在同一天内完成了“报告 -> 修复 -> 合并”的闭环。

## 2. 版本发布
**今日无新版本发布。**
*注：虽然无正式 Release，但鉴于今日已合并大量重要的稳定性修复与功能性 PR（包括轻量级 RAG、内存并发修复等），预计项目在短期内可能会迎来一次包含重大更新的版本发布。*

## 3. 项目进展
今日共有 20 个 PR 被合并或关闭，标志着项目在多个关键维度上取得了实质性进展：

*   **AI 记忆与检索能力升级**：合并了 PR #4109，正式引入了基于本地嵌入的轻量级 RAG（检索增强生成）用于记忆检索，这将显著提升 AI 智能体的长期记忆召回率。
*   **通讯渠道生态扩充**：PR #4146 成功合入，正式添加了对 Napcat (QQ) 渠道的支持（支持 OneBot v11 私聊与群聊）；同时，PR #4162 和 PR #4160 为 Email 渠道增加了媒体文件附件支持，完善了多模态交互体验。
*   **搜索与推理引擎优化**：PR #4141 合并，新增了火山引擎搜索 Provider；PR #3990 正在推进将原有的 `Dream` 类重构为更简单的 cron + `process_direct` 模式，以优化 AI 的深度思考与自我反思机制。
*   **WebUI 交互与架构重塑**：PR #4115 完成了 WebUI 网关依赖的拆分重构；此外，合并了多项 WebUI 的 PR，包括历史消息编辑功能 (#4148)、会话侧边栏排序优化 (#4151)、刷新路由修复 (#4150) 以及辅助阅读的 Prompt Rail 功能 (#4156)。

## 4. 社区热点
尽管今日评论数均不高，但以下 Issue/PR 揭示了社区当前最关心的核心诉求：

*   **API 成本控制诉求**：[Issue #4142](https://github.com/HKUDS/nanobot/issues/4142) 讨论了如何针对 DeepSeek v4 等热门大模型优化“缓存未命中输入 Token”的开销。这反映了用户在企业级/高频调用场景下，对**降本增效**的强烈需求。
*   **严格 API 规范兼容性问题**：[Issue #4006](https://github.com/HKUDS/nanobot/issues/4006) 报告了历史对话中存在孤立的 `tool result`。由于 OpenAI/Anthropic 等主流 API 的严格校验机制，此问题会直接导致请求被拒绝，是影响用户体验的痛点。
*   **云平台一键部署探索**：[PR #4139](https://github.com/HKUDS/nanobot/pull/4139) 试图引入对 HuggingFace Spaces 和 ModelScope 的第一方部署支持，反映了社区希望降低本地部署门槛、拥抱云原生托管平台的趋势。

## 5. Bug 与稳定性
今日报告了多个关键 Bug，但项目维护者和社区的响应极其迅速，大部分已出具修复 PR 并合并：

1.  **[严重] 核心存储并发写入导致数据损坏**：
    *   *问题*：[Issue #4081](https://github.com/HKUDS/nanobot/issues/4081) 指出 `MemoryStore.append_history()` 在并发写入时会分配重复的游标。
    *   *状态*：**已修复**。[PR #4147](https://github.com/HKUDS/nanobot/pull/4147) 通过引入线程锁序列化游标分配已解决该隐患。
2.  **[严重] 文件读取引发的死循环（OOM 风险）**：
    *   *问题*：[Issue #4153](https://github.com/HKUDS/nanobot/issues/4153) 报告 `read_file` 在结果过大被持久化到磁盘后，Agent 尝试恢复时可能陷入死循环。
    *   *状态*：**已修复**。[PR #4155](https://github.com/HKUDS/nanobot/pull/4155) 豁免了 `read_file` 的通用工具结果卸载机制，解决了此问题。
3.  **[中等] 特定安装环境下 WebUI CLI 安装失败**：
    *   *问题*：[Issue #4158](https://github.com/HKUDS/nanobot/issues/4158) 报告当使用 `uv tool` 安装并启动 NanoBot 时，由于环境中缺少 `pip` 模块导致通过 WebUI 安装 CLI App 失败。
    *   *状态*：**修复中**。目前已提交 [PR #4164](https://github.com/HKUDS/nanobot/pull/4164) 和自动修复的 [PR #4159](https://github.com/HKUDS/nanobot/pull/4159)，通过在 `pip` 不可用时自动回退到 `uv pip` 来解决。
4.  **[低] 孤立的工具调用结果**：
    *   *问题*：[Issue #4006](https://github.com/HKUDS/nanobot/issues/4006) 对话历史中依然存在未配对的 `tool result`。
    *   *状态*：**待解决**（Open）。

## 6. 功能请求与路线图信号
结合今日的 Issue 与 PR，可以洞察出项目未来版本的演进方向：

*   **自定义图像生成 Provider**：[Issue #4132](https://github.com/HKUDS/nanobot/issues/4132) 请求支持自定义图像生成 Provider（如 Agnes AI）。该 Issue 被标记为 `good first issue`，表明官方持开放态度，非常适合新贡献者介入。
*   **WebUI 高级对话管理**：[PR #4163](https://github.com/HKUDS/nanobot/pull/4163) 正在为 WebUI 添加“从当前位置分叉对话”的功能，结合已合并的“内联编辑”功能，预示着 NanoBot 正在向 ChatGPT 级别的高级对话树管理体验迈进。
*   **云原生部署支持**：如前文所述，[PR #4139](https://github.com/HKUDS/nanobot/pull/4139) 的提交表明项目正在构建统一的云端部署抽象层，未来可能原生支持一键部署到主流 Model 托管平台。

## 7. 用户反馈摘要
从今日的 Issue 和 PR 描述中，可以提炼出用户的真实使用画像：

*   **前端体验要求提升**：用户对 WebUI 的细节要求越来越高（如 [PR #4149](https://github.com/HKUDS/nanobot/pull/4149) 反映在非安全上下文或 WebView 中无法使用剪贴板复制回复，需要增加 fallback 机制），说明 NanoBot 正在被越来越多地嵌入到各种复杂的客户端环境中使用。
*   **偏好现代 Python 工具链**：从 [Issue #4158](https://github.com/HKUDS/nanobot/issues/4158) 可以看出，大量用户开始使用 `uv` 替代传统的 `pip` 管理环境，项目需要对这类现代工具链提供一等公民的支持。
*   **对大模型的 Token 消耗极度敏感**：社区正在积极探讨针对 DeepSeek v

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 (2026-06-02)

## 1. 今日速览

过去 24 小时内，Zeroclaw 项目保持**高度活跃**，共处理了 50 条 Issue 更新和 50 条 PR 更新，其中 17 个 PR 被成功合并或关闭，显示出核心团队较高的代码审查与合并效率。

当前开发重心明显集中在**v0.8.0-beta-2 版本的集成准备工作**、**多模型提供商（Provider）的兼容性修复**（特别是针对具备“思考”能力的模型如 DeepSeek-V4 和 Kimi）以及**渠道的体验优化**（如语音消息处理、WebSocket 监听模式）。

尽管今日无新版本发布，但社区对新兴大模型 API 格式的适配需求非常迫切，安全性和企业级特性（如网关、权限）也在稳步推进。

---

## 2. 版本发布

**本日无新版本发布。**

---

## 3. 项目进展

尽管没有发布新版本，但项目在代码合并和功能推进上取得了实质性进展，主要集中在渠道功能增强和底层稳定性修复：

*   **v0.8.0-beta-2 核心集成就绪**：巨型 PR [#6848](https://github.com/zeroclaw-labs/zeroclaw/pull/6848) 持续更新，引入了 Zerocode TUI、RPC socket 传输等关键特性，这是下一个大版本的基础。
*   **渠道功能增强**：
    *   **Mattermost WebSocket**：PR [#7098](https://github.com/zeroclaw-labs/zeroclaw/pull/7098) 新增了 WebSocket 监听模式，取代了原有的 REST 轮询，显著降低延迟。
    *   **语音消息优化**：PR [#7050](https://github.com/zeroclaw-labs/zeroclaw/pull/7050) 为 Telegram 和 WhatsApp 渠道增加了 OGG/Opus 转码支持，解决了语音笔记的兼容性问题。
    *   **钉钉集成修复**：PR [#7097](https://github.com/zeroclaw-labs/zeroclaw/pull/7097) 和 [#7091](https://github.com/zeroclaw-labs/zeroclaw/pull/7091) 修复了 Cron 任务中钉钉渠道的 schema 缺失问题。
*   **Windows 平台兼容性**：PR [#7084](https://github.com/zeroclaw-labs/zeroclaw/pull/7084) 修复了 Windows 下 Shell 命令双引号被错误解析导致命令执行失败的阻塞问题。
*   **代码质量与健壮性**：PR [#7092](https://github.com/zeroclaw-labs/zeroclaw/pull/7092) 和 [#7093](https://github.com/zeroclaw-labs/zeroclaw/pull/7093) 集中清理了 WeChat 模块和 Observability 模块中的 `unwrap()` 调用，替换为更具诊断性的 `expect()`，提升了系统崩溃时的可调试性。

---

## 4. 社区热点

今日社区讨论最热烈的话题集中在**模型提供商的 API 兼容性**和**安全配置**上：

1.  **DeepSeek-V4 API 格式不兼容 ([#6059](https://github.com/zeroclaw-labs/zeroclaw/issues/6059))**
    *   **热度**：15 条评论 | 👍 4
    *   **分析**：随着 DeepSeek-V4 的发布，其 Thinking 模式相关的 API 格式变化导致 Zeroclaw 出现 S2 级别的降级行为。这是一个典型的“AI 助手项目跟进上游模型更新”的痛点，该 Issue 已被关闭，可能已有临时解决方案或修复。
2.  **Kimi-Code Provider 流式调用报错 ([#5600](https://github.com/zeroclaw-labs/zeroclaw/issues/5600))**
    *   **热度**：9 条评论
    *   **分析**：同样是涉及“思考”模式的问题。Kimi 在流式传输工具调用时，缺失 `reasoning_content` 字段导致请求失败（S1 级别）。这反映出当前 AI 助手在适配各厂商具备“深度思考”能力的模型时面临普遍挑战。
3.  **强化设备配对码安全性 ([#6613](https://github.com/zeroclaw-labs/zeroclaw/issues/6613))**
    *   **热度**：2 条评论
    *   **分析**：用户指出当前的 6 位纯数字配对码过于脆弱，请求支持更长且包含大小写字母的强密码。这体现了用户对 IoT/Agent 安全性的关注。

---

## 5. Bug 与稳定性

今日报告的 Bug 多数与**运行时序列化**、**平台差异**和**历史遗留代码**有关，部分已有对应的修复 PR：

### 严重程度：S1 (阻塞工作流)
*   **Gemini 历史序列化违规** ([#6302](https://github.com/zeroclaw-labs/zeroclaw/issues/6302))：在调用 Gemini 模型时，`assistant` turn 错误地出现在 `user` turn 之前，导致 400 错误。
*   **Gateway 无法使用 Postgres** ([#6472](https://github.com/zeroclaw-labs/zeroclaw/issues/6472))：由于嵌套运行时导致 Tokio Panic。这是一个严重的后端稳定性问题，目前状态为 In-progress。
*   **Telegram 渠道泄露 Codex 草稿** ([#7068](https://github.com/zeroclaw-labs/zeroclaw/issues/7068))：Telegram Bot 将内部工具调用过程直接发送给用户，严重影响用户体验。
*   **Windows Shell 命令执行失败** ([#7083](https://github.com/zeroclaw-labs/zeroclaw/issues/7083))：路径中的双引号处理异常。**[已有修复 PR #7084]**

### 严重程度：S2 (降级行为)
*   **XML Tool Result 泄露** ([#5795](https://github.com/zeroclaw-labs/zeroclaw/issues/5795))：Gemini 等模型的原始 XML 工具标签直接暴露在聊天渠道中。**[已有修复 PR #5796]**
*   **Delegate Agents 忽略 Prompt 注入配置** ([#5155](https://github.com/zeroclaw-labs/zeroclaw/issues/5155))：Delegate 总是使用 Full mode 注入 skills，导致上下文溢出或行为不符预期。

---

## 6. 功能请求与路线图信号

从近期的 Feature Request 和 PR 动向来看，Zeroclaw 正在向**更安全、更智能、更企业级**的方向演进：

1.  **Air-gapped 隔离执行模式** ([#6293](https://github.com/zeroclaw-labs/zeroclaw/issues/6293))：
    *   **诉求**：支持将 Agent 运行在离线容器中，仅通过 Unix Socket 与在线守护进程通信，以实现物理隔离。
    *   **路线图信号**：这是一个强企业级/安全需求，目前在 RFC 阶段，表明项目正在考虑高合规性场景的应用。
2.  **Email 渠道现代化** ([#7021](https://github.com/zeroclaw-labs/zeroclaw/pull/7021))：
    *   **诉求**：支持 XOAUTH2 认证和只读 IMAP 工具。
    *   **路线图信号**：扩展非即时通讯渠道的能力，特别是针对企业邮件系统（如 Exchange、Outlook）的集成。
3.  **Skills (技能) 系统生态完善**：
    *   [#4853](https://github.com/zeroclaw-labs/zeroclaw/issues/4853) 提出支持从 `.well-known` URI 安装技能。
    *   [#6645](https://github.com/zeroclaw-labs/zeroclaw/issues/6645) 报告了技能改进器不支持 `manifest.toml` 的问题。
    *   **路线图信号**：项目正在努力建立一套类似包管理器的技能分发和管理标准。

---

## 7. 用户反馈摘要

*   **模型适配痛点**：用户普遍对“思考模型”（DeepSeek-V4, Kimi-K2.6）的 API 稳定性感到头疼。这类模型在流式传输和工具调用时的格式变动频繁，且不同厂商实现不一，是当前最大的摩擦点。
*   **Webhook/Telegram 用户体验**：多个 Issue 提到原始的 XML 标签或推理过程直接暴露给最终用户，这对于生产环境是不可接受的，用户强烈要求更干净的输出过滤。
*   **配置灵活性的渴望**：用户希望有更细粒度的控制，例如针对特定联系人的输出模态偏好设置（[#7020](https://github.com/zeroclaw-labs/zeroclaw/pull/7020)），以及针对 Windows 平台选择 Shell 类型的能力（[#7089](https://github.com/zeroclaw-labs/zeroclaw/issues/7089)）。

---

## 8. 待处理积压

以下重要 Issue 存在时间较长或处于 Blocked/Needs Maintainer Review 状态，需要核心团队关注：

1.  **[长期追踪] 153 个 Commit 丢失恢复审计** ([#6074](https://github.com/zeroclaw-labs/zeroclaw/issues/6074))：这是一个数据恢复性质的 Issue，追踪 3 月份因 bulk revert 丢失的代码，需要持续投入精力甄

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-06-02)

## 1. 今日速览
PicoClaw 项目今日保持着极高的开发活跃度与健康的迭代节奏。项目在过去 24 小时内发布了最新的 `v0.2.9` nightly 构建版本，并在底层稳定性、多模型兼容性以及客户端协议上取得了实质性进展。社区共产生了 16 项 PR 更新与 8 项 Issue 动态，其中多个关键 Bug（如历史记录丢失、微信渠道报错等）已被社区迅速响应并提交了修复 PR。总体而言，项目正处于快速收拢 Bug 并拓展高级 Agent 特性的阶段。

## 2. 版本发布
- **[nightly: Nightly Build v0.2.9-nightly.20260602.426046fc](https://github.com/sipeed/picoclaw/releases/tag/nightly)**
  - **更新说明**：自动化的 Nightly 构建版本。结合今日合并的 PR 来看，此版本预计包含了针对智谱 GLM-5 API 错误的修复、macOS 路径符号链接验证的修复，以及针对 Skill Catalog Token 消耗的深度优化。
  - **破坏性变更/迁移注意**：属于 Nightly 版本，可能存在不稳定。官方提示谨慎使用。

## 3. 项目进展
今日共有 **4 个 PR 被合并/关闭**，极大提升了系统的稳定性和资源利用率：
- **修复智谱 GLM-5 API 兼容性**：[PR #2989](https://github.com/sipeed/picoclaw/pull/2989) (已关闭)。将智谱 API 的 1210 错误码加入格式错误匹配模式，成功修复了微信渠道发送图片触发参数错误的问题。
- **新增 Server酱³ Bot 渠道支持**：[PR #2893](https://github.com/sipeed/picoclaw/pull/2893) (已关闭)。为国内流行的通知服务 Server酱³ (SC3) 添加了轮询和 Webhook 模式的支持。
- **优化 macOS 路径校验**：[PR #2890](https://github.com/sipeed/picoclaw/pull/2890) (已关闭)。解决了 macOS 下 `/var` 作为 `/private/var` 符号链接导致的路径验证失败问题。
- **大幅降低 Token 消耗**：[PR #2781](https://github.com/sipeed/picoclaw/pull/2781) (已关闭)。重构了 Skill catalog 的注入逻辑，不再于每次 LLM 请求（含工具调用折返）中重复发送完整技能目录，显著优化了 Token 开销。

## 4. 社区热点
今日社区讨论焦点集中在**底层安全机制**与**边缘硬件适配**上：
- **[Issue #1042](https://github.com/sipeed/picoclaw/issues/1042)** (15条评论，2个点赞)：`exec` 工具的 `guardCommand` 方法因正则表达式过于简单粗暴，误杀包含 URL 参数的正常命令（如查询天气），反映出用户对沙箱安全机制与实际使用便利性平衡的强烈诉求。
- **[Issue #2887](https://github.com/sipeed/picoclaw/issues/2887) & [Issue #2720](https://github.com/sipeed/picoclaw/issues/2720)**：RISC-V 架构下使用 OpenAI 模型的不可用问题，以及 PID 文件校验导致系统陷入崩溃死循环（Crash Loop）的问题，引发了开发者对跨平台稳定性的深入探讨。

## 5. Bug 与稳定性
按严重程度排列今日报告及处理的 Bug：
1. **[严重] 启动崩溃循环**：[Issue #2720](https://github.com/sipeed/picoclaw/issues/2720)。单例 PID 校验不严谨导致网关无法启动。（*已有修复 PR [PR #2813](https://github.com/sipeed/picoclaw/pull/2813)*）
2. **[较严重] Web UI 历史记录丢失**：[Issue #2796](https://github.com/sipeed/picoclaw/issues/2796)。多次对话的历史记录仅展示最后一句话。（*已有修复 PR [PR #2990](https://github.com/sipeed/picoclaw/pull/2990)*）
3. **[中等] 协程泄漏**：[PR #2986](https://github.com/sipeed/picoclaw/pull/2986)。`SessionManager` 缺少退出机制导致后台协outine 泄露。（*已提交直接修复 PR*）
4. **[低] API 兼容性报错**：[Issue #2941](https://github.com/sipeed/picoclaw/issues/2941) 与 [Issue #2939](https://github.com/sipeed/picoclaw/issues/2939)。最新版 Claude 模型 ID 格式错误及 `temperature` 参数弃用导致 400/404 报错。（*已有对应 PR [PR #2942](https://github.com/sipeed/picoclaw/pull/2942), [PR #2940](https://github.com/sipeed/picoclaw/pull/2940)*）

## 6. 功能请求与路线图信号
今日出现的重要新功能请求及底层演进信号：
- **明确的 WebSocket 轮次完成信号**：[Issue #2984](https://github.com/sipeed/picoclaw/issues/2984) 提出为 WebSocket 客户端增加确定性的 Turn 完成事件。这对于构建高可靠性的外部集成客户端至关重要，展现了 PicoClaw 向标准化 Protocol Server 演进的意图。
- **多智能体协作总线**：[PR #2937](https://github.com/sipeed/picoclaw/pull/2937) 引入了内部 Agent Collaboration Bus，包含独立信箱和权限感知机制，这是迈向多 Agent 编排架构的重大feature。
- **新型 LLM 提供商接入**：[PR #2917](https://github.com/sipeed/picoclaw/pull/2917) 提出了集成 NEAR AI Cloud 提供商的请求，表明 Web3/去中心化 AI infra 用户群的接入需求。

## 7. 用户反馈摘要
从今日 Issue 与 PR 描述中提炼的真实痛点：
- **API 热更新适配滞后**：用户对大模型厂商（如 Anthropic Claude 频繁更改 Model ID 命名规则、突然废弃 `temperature` 参数）怨声载道，PicoClaw 需要在 API 兼容性层面建立更敏捷的熔断和适配策略。
- **历史记录展示逻辑反直觉**：用户明确指出，即使在后端需要为了节省 Token 对上下文进行压缩，前端 Web UI 的历史记录展示也必须是全量的，不应混淆前后端逻辑（[Issue #2796](https://github.com/sipeed/picoclaw/issues/2796)）。
- **流式传输下的状态丢失**：用户发现在流式输出期间，工具调用消息容易被异常过滤掉（[PR #2987](https://github.com/sipeed/picoclaw/pull/2987)）。

## 8. 待处理积压
以下长期未被 Merge 或响应的重要 Issue/PR 提请维护者关注：
- **[PR #2937](https://github.com/sipeed/picoclaw/pull/2937) Agent 协作架构**：此 PR 涉及庞大的架构重构，已停留数日（状态：Stale），需核心维护者进行架构评审。
- **[PR #2940](https://github.com/sipeed/picoclaw/pull/2940) / [PR #2942](https://github.com/sipeed/picoclaw/pull/2942) Claude 适配修复**：涉及阻断官方最新模型使用的严重 Bug，目前仍为 Stale 状态，建议优先合并以改善新用户首次配置体验。
- **[Issue #1042](https://github.com/sipeed/picoclaw/issues/1042) 执行工具的安全守卫误杀问题**：长达数月未彻底解决（状态：Stale），由于缺乏好的修复 PR，已严重影响到需要执行复杂外部命令（如带 URL 参数的 curl）的工具可用性。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下是为你生成的 2026 年 6 月 2 日 NanoClaw 项目动态日报。

---

# 📊 NanoClaw 项目动态日报 (2026-06-02)

## 1. 今日速览
今日 NanoClaw 项目整体保持**高度活跃**的开发与维护状态。过去 24 小时内，项目共处理了 10 个核心动态（3 个 Issue 更新，7 个 PR 更新），其中 PR 的关闭/合并率达到 42.8%（3/7）。开发重点明显聚焦于**系统健壮性、容器安全防范以及 AI 提供商兼容性修复**。尤其值得注意的是，社区开发者对 Agent 会话崩溃死循环（Crash-loop）和容器逃逸等底层核心问题发起了集中修复，项目整体代码质量与稳定性正在稳步提升。

## 2. 版本发布
今日**无**新版本发布。

## 3. 项目进展
今日共有 3 个 Pull Request 被关闭，在安全性、通道扩展和容器运行时方面取得了实质性进展：
*   **安全漏洞修复**：PR [#2538](https://github.com/nanocoai/nanoclaw/pull/2538) 被关闭。该 PR 修复了 `container-runner` 中的 OS 命令注入漏洞（CWE-78），通过在 Dockerfile 插值前校验包名，有效防止了恶意构造的攻击，大幅提升了系统安全性。
*   **Webchat 技能纳入**：PR [#2069](https://github.com/nanocoai/nanoclaw/pull/2069)（Webchat v1）在经历一个多月的迭代后今日关闭，为项目正式引入了 Web 聊天通道的基础能力。
*   **容器抓取能力优化**：PR [#2664](https://github.com/nanocoai/nanoclaw/pull/2664) 关闭，实现了在 v2 容器中运行浏览器抓取 sidecar 的功能，增强了 AI 智能体的网页数据获取能力。

## 4. 社区热点
今日讨论最受关注的是多通道/复杂场景下的 Agent 稳定性问题：
*   **A2A 路由错乱修复落地**：高优先级 Bug Issue [#2331](https://github.com/nanocoai/nanoclaw/issues/2331) 今日正式关闭。该问题导致多通道群组中 A2A（Agent-to-Agent）回复被路由到错误的会话。这反映了社区在多智能体协同复杂场景下对精准路由的迫切需求。
*   **Agent 死循环崩溃的自救机制**：Issue [#2669](https://github.com/nanocoai/nanoclaw/issues/2669) 揭示了因为 API 400 错误导致的无限死循环，引发了开发者的关注，作者随即提交了自修复 PR。

## 5. Bug 与稳定性
按严重程度排列，今日报告及处理的 Bug 如下：

*   🔴 **严重：Agent 会话陷入永久崩溃死循环**
    *   **描述**：Issue [#2669](https://github.com/nanocoai/nanoclaw/issues/2669)。当 LLM API 返回 400 错误（提示 `thinking` 块无法修改）时，`agent-runner` 会陷入紧密的无限重试循环，导致会话永久卡死。
    *   **状态**：🟢 **已有 Fix PR**。作者同日提交了 PR [#2670](https://github.com/nanocoai/nanoclaw/pull/2670)，通过调整恢复逻辑来中断死循环。
*   🟠 **中等：容器内附件目录缺失**
    *   **描述**：PR [#2671](https://github.com/nanocoai/nanoclaw/pull/2671) 指出，由于通道适配器（Channel adapters）在容器内找不到正确的挂载路径，导致附件处理失败。
    *   **状态**：🟢 **已有 Fix PR**。通过添加只读绑定挂载 `/workspace/attachments/` 解决。
*   🟡 **低/兼容性：MCP 配置与代理传输不兼容**
    *   **描述**：PR [#2672](https://github.com/nanocoai/nanoclaw/pull/2672) 指出，Codex provider 尚未适配主干最新的 `stdio | http | sse` 联合类型，且在反向代理后强制使用 HTTP-only 传输会导致错误。
    *   **状态**：🟢 **已有 Fix PR**。

## 6. 功能请求与路线图信号
*   **企业级容灾架构构建中**：PR [#2666](https://github.com/nanocoai/nanoclaw/pull/2666) 提出了一套完整的 Provider 故障恢复机制（包括回滚、重放、轮次内确认及友好降级回退）。这释放出强烈的信号：**NanoClaw 正在从“可用”向生产环境下的“高可用”迈进**，这将是下一个大版本值得关注的核心特性。
*   **异构教育场景探索**：Issue [#2673](https://github.com/nanocoai/nanoclaw/issues/2673) 提出了一个“自动学生评分系统”的设想（结合 AI 视频/电子表格处理）。虽疑似为通用模板式提议，但也侧面反映了非技术背景用户期望利用 NanoClaw 构建自动化办公/教育流的需求。

## 7. 用户反馈摘要
从今日的 Issue 和 PR 摘要中，可以提炼出以下真实用户痛点与反馈：
1.  **痛点：容错机制不足**：用户（如 @ddaniels）反映，遇到 API 格式变动或网络错误时，Agent 容易“一根筋”地重复错误请求。用户迫切希望系统具备“自我治愈”能力，而非直接卡死。
2.  **痛点：复杂的网络与部署环境适配**：多名开发者（如 @apparentsoft, @Ari-CMC）在处理代理背后的 HTTP 传输、容器间目录挂载等底层运维细节时遇到阻碍，表明项目在“开箱即用”的部署体验上还有优化空间。
3.  **积极信号：安全意识增强**：开发者（@sebastiondev）主动审计并修复了 CWE-78 命令注入漏洞，说明开源社区对 NanoClaw 作为本地/云端 AI 助手的安全基线要求极高。

## 8. 待处理积压
以下重要待办需维护者重点关注：
*   **紧急 Review 请求**：PR [#2670](https://github.com/nanocoai/nanoclaw/pull/2670)（修复死循环崩溃）直接影响系统基础可用性，建议维护者优先进行 Code Review 并合入主干。
*   **复杂的依赖链阻塞**：PR [#2666](https://github.com/nanocoai/nanoclaw/pull/2666)（故障恢复核心功能）

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

这是一份基于 2026 年 6 月 2 日 GitHub 数据生成的 **IronClaw (nearai/ironclaw)** 项目动态日报。

---

# 📊 IronClaw 项目日报 - 2026-06-02

## 1. 今日速览
IronClaw 项目在 2026 年 6 月 2 日呈现出极高的开发活跃度，过去 24 小时内共有 46 个 PR 更新（其中 30 个已合并/关闭），以及 10 个 Issue 更新。
项目的核心焦点正全面向 **"Reborn" 架构演进**：核心开发团队及外部贡献者正在密集交付 WebUI v2 的 OAuth 授权集成、Slack 多租户接入以及底层 Agent 上下文压缩机制的完善。
整体来看，项目目前处于功能密集交付期，基础设施（如 WASM 能力扩展）和用户交互体验（如前端 UI 重构）正在同步快速迭代，项目健康度极高。

## 2. 版本发布
今日 **无** 新版本发布。

## 3. 项目进展
今日合并了大量关键 PR，极大推进了 "Reborn" 架构生态的落地，主要集中在以下几个方面：

*   **WebUI v2 交互与授权体验升级**：
    *   合并了 [#4319](https://github.com/nearai/ironclaw/pull/4319)，全面重构了 WebUIv2 的聊天界面，使得授权、工具和审批组件更加现代化。
    *   合并了 [#4325](https://github.com/nearai/ironclaw/pull/4325) 和 [#4323](https://github.com/nearai/ironclaw/pull/4323)，打通了扩展程序的凭证设置和引导消息流程。
    *   合并了 [#4322](https://github.com/nearai/ironclaw/pull/4322) 和 [#4324](https://github.com/nearai/ironclaw/pull/4324)，修复了可重用凭证查找和 PAT 重新提示的循环问题。
*   **核心 WASM 能力与外部服务集成**：
    *   合并了 [#4326](https://github.com/nearai/ironclaw/pull/4326)，将 GSuite (Drive, Docs, Sheets, Slides) 移植为 Reborn 的 WASM 能力。
    *   合并了 [#4316](https://github.com/nearai/ironclaw/pull/4316)，将 Memory 工具迁移至 Reborn 架构。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

以下是为您生成的 LobsterAI 项目动态日报（2026-06-02）。

---

# 📊 LobsterAI 项目动态日报 (2026-06-02)

## 1. 今日速览
LobsterAI 项目今日处于**高度活跃的开发与交付期**。过去 24 小时内，项目没有新增或关闭的 Issue，但迎来了高达 **50 次 PR 更新（其中 48 个 PR 被合并或关闭）**，且仅保留 2 个待合并状态。同时，项目发布了 **`2026.6.1`** 正式版本。整体来看，核心团队（及主要贡献者）正密集进行功能迭代、架构优化与 Bug 修复的“收口”工作，项目健康度极佳，代码合入效率极高，展现出强劲的向前推进势头。

## 2. 版本发布
今天项目发布了最新的里程碑版本：
- **Release: [LobsterAI 2026.6.1](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.6.1)**
  - **核心更新**：
    - 新增 Expert Kit Store 和对话集成功能 ([PR #2060](https://github.com/netease-youdao/LobsterAI/pull/2060))。
    - 引入针对 npm/clawhub 来源的插件更新检查机制 ([PR #2069](https://github.com/netease-youdao/LobsterAI/pull/2069))。
    - 修复了部分 MCP（Model Context Protocol）相关异常。
  - **升级建议**：此版本带来了新的插件生态支持与底层协议优化，建议所有开发者及用户尽快升级体验。

## 3. 项目进展
今日共有 48 个 PR 被合并或关闭，项目在多个核心模块取得了实质性进展：
- **多模态与模型能力**：修复了 MiniMax-M3 模型硬编码不支持图片的回退问题，正式启用了其图像输入支持 ([PR #2093](https://github.com/netease-youdao/LobsterAI/pull/2093))；引入了全新的会话深度思考控制功能，支持多个思考档位 ([PR #1985](https://github.com/netease-youdao/LobsterAI/pull/1985))。
- **MCP 与网关稳定性**：大幅优化了 `npx` MCP 启动解析路径，提升首次响应速度并增加计时日志 ([PR #2091](https://github.com/netease-youdao/LobsterAI/pull/2091))；修复了 Token 刷新导致网关重启的问题 ([PR #2018](https://github.com/netease-youdao/LobsterAI/pull/2018))；提升了 browser 和 webfetch 的成功率及稳定性 ([PR #2023](https://github.com/netease-youdao/LobsterAI/pull/2023))。
- **UI/UX 与 Artifacts**：重构了 HTML 预览与源码展示体验，加入懒加载与明暗主题适配，解决大文件卡顿痛点 ([PR #2022](https://github.com/netease-youdao/LobsterAI/pull/2022))；优化了分享弹窗的视觉层级 ([PR #2094](https://github.com/netease-youdao/LobsterAI/pull/2094))。
- **Agent 与协同**：支持了 subagent（子智能体）的批量删除功能，优化了侧边栏交互与并发清理机制 ([PR #2095](https://github.com/netease-youdao/LobsterAI/pull/2095))。

## 4. 社区热点
由于今日无公开的 Issue 增量，且列表中的 PR 评论数均未公开显示（标记为 `undefined`），社区讨论的显性热度较低。但考虑到今日合并了大量由核心开发者（如 @btc69m979y-dotcom, @fisherdaddy, @liugang519）提交的 PR，可以推断**目前的开发重心在于内部功能闭环与代码审查集中合并**，大量讨论可能在内部或 PR Review 过程中已完成。值得关注的近期活跃 PR 包括：
- **会话思考层级控制** ([PR #1985](https://github.com/netease-youdao/LobsterAI/pull/1985))
- **IM 机器人管理 UI 重构** ([PR #2025](https://github.com/netease-youdao/LobsterAI/pull/2025))

## 5. Bug 与稳定性
今日大量修复 PR 被合入主分支，显著提升了系统的整体稳定性（无致命 Bug 未修复的滞留报告）：
- **严重程度：高**
  - 修复了自定义模型切换时的报错问题 ([PR #2032](https://github.com/netease-youdao/LobsterAI/pull/2032))。
  - 修复了无效的浏览器配置引发的异常 ([PR #2031](https://github.com/netease-youdao/LobsterAI/pull/2031))。
  - 修复了 OpenClaw 压缩重试和工具结果间隙的问题 ([PR #2015](https://github.com/netease-youdao/LobsterAI/pull/2015))。
- **严重程度：中**
  - 修复了隐藏内部 OpenClaw 插件在配置同步时的过滤问题 ([PR #2096](https://github.com/netease-youdao/LobsterAI/pull/2096))。
- **严重程度：低（UX 层面）**
  - 解决了 macOS 语音输入权限被拒绝后无提示的体验缺陷，增加了 Toast 引导 ([PR #1952](https://github.com/netease-youdao/LobsterAI/pull/1952))。

## 6. 功能请求与路线图信号
结合已合并的 PR，项目在 2026 年下半年的路线图呈现出以下明确信号：
1. **深度企业级 IM 集成**：正在重构钉钉、飞书、QQ 等多实例 IM 平台的 UI 与底层校验逻辑 ([PR #2025](https://github.com/netease-youdao/LobsterAI/pull/2025), [PR #1464](https://github.com/netease-youdao/LobsterAI/pull/1464))，预示着将作为企业级个人助手发力多端消息触达。
2. **Agent 安全与自主可控**：新增了 `nsp-clawguard` 安全监控插件的热切换配置 ([PR #1962](https://github.com/netease-youdao/LobsterAI/pull/1962))，表明项目正在加强 AI Agent 运行时的安全防御和管控能力。
3. **模型深度推理能力**：思考级别的引入 ([PR #1985](https://github.com/netease-youdao/LobsterAI/pull/1985)) 证明 LobsterAI 正在适配类似 OpenAI o1/o3 等具备慢思考能力的模型，细化推理成本控制。

## 7. 用户反馈摘要
由于过去 24 小时内无新增 Issue 记录，暂无法从数据中直接提取新发用户的痛点反馈。但基于今日处理掉的缺陷（如“macOS 语音权限无提示”、“自定义模型切换报错”、“Artifacts 大文件预览卡顿”），可以推断此前部分用户在使用**多模态交互配置**及**前端富文本渲染**时遇到过阻碍，目前已在代码层得到全面修复。

## 8. 待处理积压
当前有 2 个处于 Open 状态的 PR 需要维护者关注，以避免依赖陈旧或功能延后：
1. **依赖更新阻塞风险**：[PR #1277](https://github.com/netease-youdao/LobsterAI/pull/1277) - `dependabot[bot]` 提议将 Electron 从 v40.2.1 升级到 v42.3.1。该 PR 自 4 月初开启至今已两月未合并，由于涉及底层框架大版本跨越，建议评估兼容性后尽快推进或关闭。
2. **IM 逻辑完善**：[PR #1464](https://github.com/netease-youdao/LobsterAI/pull/1464) - 为 IM 多实例添加重复校验逻辑，已开启近两个月，鉴于 UI 正在重构 ([PR #2025](https://github.com/netease-youdao/LobsterAI/pull/2025) 已合入)，建议梳理该校验逻辑并合入主分支以防冲突。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下是为您生成的 2026-06-02 CoPaw (QwenPaw) 项目动态日报。

---

# 📊 CoPaw (QwenPaw) 项目动态日报 (2026-06-02)

## 1. 今日速览
今日 CoPaw (QwenPaw) 项目保持了**极高的社区活跃度与健康的迭代节奏**。过去 24 小时内，项目共处理了 43 条 Issue（其中 24 条已关闭，关闭率高达 55.8%），并更新了 34 个 Pull Request（合并/关闭 9 个）。项目当前处于架构升级的关键时期，重点围绕**AgentScope 2.0 底层重构**与**插件系统生态建设**展开。同时，社区对安全漏洞的关注度显著提升，多名安全研究人员提交了身份验证与 API 防护相关的缺陷报告，均被官方迅速响应并关闭。

## 2. 版本发布
- **正式版本**：今日无新正式版本发布。
- **Beta 动态**：尽管无正式 Release，但核心维护者 @rayrayraykk 已提交并关闭了版本号提升的 PR [chore(release): bump version to v1.1.11b1 #4907](https://github.com/agentscope-ai/QwenPaw/pull/4907)。这表明 `v1.1.11` 的公测版即将发布，主要整合了近期的 Bug 修复与底层重构。

## 3. 项目进展
今日合并/关闭的 PR 主要修复了多个阻断性 Bug，并推进了新特性的落地，项目整体稳定性得到进一步提升：
- **渠道打包修复**：修复了打包时漏掉腾讯元宝频道的 proto JSON 文件导致认证失败的严重问题（[fix(yuanbao): include yuanbao proto JSON files in package-data #4899](https://github.com/agentscope-ai/QwenPaw/pull/4899)）。
- **定时任务推送修复**：解决了通过 Cron 定时任务向微信/企业微信推送消息时的阻断性 Bug（[fix(channel): cron messages fail to deliver... #4883](https://github.com/agentscope-ai/QwenPaw/pull/4883)）。
- **底层 Provider 优化**：优化了 OpenAI SDK 兼容性，使得 DashScope 等非标准参数不再被静默拒绝（[feat(providers): route non-standard generate_kwargs into extra_body #4689](https://github.com/agentscope-ai/QwenPaw/pull/4689)）。
- **Windows 进程清理**：修复了 Windows 环境下浏览器进程和锁文件在会话结束后残留的问题（[fix(browser): kill entire process tree... #4853](https://github.com/agentscope-ai/QwenPaw/pull/4853)）。

## 4. 社区热点
今日讨论最热烈、参与度最高的议题集中在**底层架构升级**与**UI/UX 体验**：
- **AgentScope 2.0 迁移计划** [[Breaking Change] #4727](https://github.com/agentscope-ai/QwenPaw/issues/4727)：获得 2 个 👍 和 5 条评论。官方正式宣布将底层依赖从 AgentScope 1.x 升级至 2.0，这引发了开发者的密切关注，相应的重构 PR [refactor: migrate agentscope... #4846](https://github.com/agentscope-ai/QwenPaw/pull/4846) 已提交。
- **模型配置页面丢失** [[Bug] #4666](https://github.com/agentscope-ai/QwenPaw/issues/4666)：评论数达 6 条。多名用户反馈新建会话后模型配置加载失败，该问题直接影响核心工作流，亟待解决。
- **侧边栏 UI 体验反馈** [[Feature] #4904](https://github.com/agentscope-ai/QwenPaw/issues/4904)：用户指出侧边栏设计过于复杂，隐藏了常用的聊天会话功能，呼吁参考 Claude Desktop 的极简设计。
- **集中爆发的安全审查**：用户 @YLChen-007 集中提交了多个安全问题（如 [Path Traversal #4913](https://github.com/agentscope-ai/QwenPaw/issues/4913)、[ToolGuard bypass #4909](https://github.com/agentscope-ai/QwenPaw/issues/4909) 等），官方均迅速确认并关闭，体现了极高的安全响应水准。

## 5. Bug 与稳定性
按严重程度排列，今日新报告或仍在活跃的关键 Bug 如下：
- **P0 (阻断性)**：v1.1.10 版本在 Windows 打包时漏掉了依赖文件，导致腾讯元宝频道无法连接（[Issue #4898](https://github.com/agentscope-ai/QwenPaw/issues/4898)）。**状态：已通过 PR #4899 修复。**
- **P1 (严重)**：新建会话后，模型的配置页面全部丢失，只能通过重启恢复（[Issue #4666](https://github.com/agentscope-ai/QwenPaw/issues/4666)）。状态：Open，等待修复。
- **P1 (严重)**：上传图片时系统进入无限压缩死循环，导致 AI 产生幻觉（[Issue #4895](https://github.com/agentscope-ai/QwenPaw/issues/4895)）。状态：Open。
- **P2 (功能缺陷)**：代码模式下切换对话触发全局网页刷新并跳回原对话（[Issue #4819](https://github.com/agentscope-ai/QwenPaw/issues/4819)）。状态：Open。
- **P2 (功能缺陷)**：Custom channel 保存设置时，逻辑冲突导致监听停止（[Issue #4877](https://github.com/agentscope-ai/QwenPaw/issues/4877)）。状态：Open。

## 6. 功能请求与路线图信号
从近期的 Issue 和 PR 走势来看，项目的下一步路线图释放了以下强烈信号：
- **多模型协作调度**：社区呼声极高（[Feature: spawn_subagent support... #4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)），要求像 Claude Code 一样支持在子任务中动态分配廉价/昂贵模型以节省 Token。目前的 PR [feat(skills): enhanced make-skill flow... #4857](https://github.com/agentscope-ai/QwenPaw/pull/4857) 已经初步具备了自演化技能分配的雏形。
- **插件系统生态增强**：本期出现了大量插件相关的 PR（如 [Prompt Section Registry #4804](https://github.com/agentscope-ai/QwenPaw/pull/4804)、[DataPaw 数据分析插件 #4622](https://github.com/agentscope-ai/QwenPaw/pull/4622)），表明项目正在大力建设第三方扩展生态。
- **Windows 桌面端体验优化**：呼声不断，包括要求支持拖拽多文件上传（[Issue #4894](https://github.com/agentscope-ai/QwenPaw/issues/4894)）、解除本地文件上传大小限制（[Issue #4893](https://github.com/agentscope-ai/QwenPaw/issues/4893)）。相关 PR [fix(coding-mode): support browsing all drives... #4906](https://github.com/agentscope-ai/QwenPaw/pull/4906) 已提交审查。

## 7. 用户反馈摘要
- **用户痛点**：桌面端用户对 UI 细节和本地化支持存在一定不满，特别是字体大小不可调节导致视觉疲劳（[Issue #4154](https://github.com/agentscope-ai/QwenPaw/issues/4154)）以及侧边栏操作繁琐。此外，长期对话中的上下文压缩导致细节丢失（[Issue #4551](https://github.com/agentscope-ai/QwenPaw/issues/4551)）也是高级用户的痛点。
- **用户期待**：用户高度期待 AgentScope 2.0 带来的性能提升，并且对数据可视化插件表现出浓厚兴趣。

## 8. 待处理积压
以下高价值或影响广泛的 Issue/PR 仍在 Open 状态，建议维护者优先排期处理：
- **架构重构**：[Migrate backend from AgentScope 1.x to 2.0 #4727](https://github.com/agentscope-ai/QwenPaw/issues/4727) 及其关联 PR [refactor: migrate agentscope... #4846](https://github.com/agentscope-ai/QwenPaw/pull/4846)。
- **核心机制改进**：[Feature Request: Lossless Context Compression #4551](https://github.com/agentscope-ai/QwenPaw/issues/4551)（涉及长期记忆的优化）。
- **桌面端基础设施**：[feat(desktop): add tauri auto updater #4669](https://github.com/agentscope-ai/QwenPaw/pull/4669)（解决桌面端更新困难的问题）。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 (2026-06-02)

**分析师洞察**：作为 AI 智能体与个人 AI 助手领域的开源项目，EasyClaw 今日展现出“重研发、轻社区互动”的单向推进特征。虽然开源社区侧的 Issues 和 PRs 呈“静默”状态，但核心团队在底层基础设施（尤其是桌面端、OAuth授权及跨国电商适配）上进行了高密度的迭代。

---

### 1. 今日速览
过去 24 小时，EasyClaw 项目在开源社区端表现为零活跃（0 新增/关闭 Issue，0 新增/合并 PR），社区互动暂时停滞。然而，项目核心代码库依然保持极高的健康度与开发动能，维护者在单日内连续发布了 3 个重要小版本（v1.8.24 至 v1.8.26）。从更新日志来看，项目当前正处于**完善桌面端用户体验、优化多店铺授权并发处理、以及深化特定区域（如中国区）本土化电商能力**的关键演进期。整体而言，项目属于“核心团队主导型”的高效推进阶段。

### 2. 版本发布
今日项目迎来密集更新，连续发布了 3 个新版本，主要聚焦于桌面客户端体验与后端鲁棒性的提升。无明确声明的破坏性变更，建议平滑升级。

*   **v1.8.26** ([查看 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.26))
    *   **更新内容**：优化了桌面端的欢迎流程与认证入口，帮助新卖家更快进入设置路径；对电子商务区域和各面板语言下的聊天示例预设进行了本地化处理；改善了中国区的依赖配置，并强化了客服升级机制。
    *   **迁移注意**：涉及中国区依赖配置的更新，国内开发者拉取新代码后可能需要清理本地缓存并重新执行依赖安装。
*   **v1.8.25** ([查看 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.25))
    *   **更新内容**：修复 OAuth 授权完成后返回完整商店负载的问题，使桌面端能立即刷新连接状态；提升了多个店铺同时完成授权时（OAuth 事件突发）的并发处理可靠性；修复了客服调度 RPC 超时的重试和恢复路径。
    *   **迁移注意**：对多店铺并发授权有显著改善，强烈建议多店铺运营环境立即升级。
*   **v1.8.24** ([查看 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.24))
    *   **更新内容**：新增桌面端公告与邀请码 UI；通过默认客户端更新、预设商店技能和刷新聊天示例，改善了新用户的电商设置路径；修复了客服 Airflow 的重试调度问题。

### 3. 项目进展
由于今日没有公开的 Pull Requests 合并记录，我们无法从开源侧量化具体的代码提交进度。但结合 Release 日志推断，**项目整体在“AI 助理与电商平台结合”的业务逻辑上向前迈进了重要一步**。尤其是 OAuth 多店铺并发控制（v1.8.25）和客服调度重试机制（v1.8.24/26）的多次修补，表明项目正在为高并发的企业级 SaaS 应用场景做底层架构的加固。

### 4. 社区热点
*   **数据反映**：今日 [Issues 列表](https://github.com/gaoyangz77/easyclaw/issues) 无活跃讨论（0 条新增/评论）。
*   **分析师推测**：由于缺乏公开的社区讨论热点，推测目前项目的主要用户反馈可能集中在闭源渠道（如内部测试团队、特定企业客户或专属反馈群），开源社区的建设和引流仍有待加强。

### 5. Bug 与稳定性
今日社区未报告任何公开的 Bug。不过，从项目发布的更新日志中可以提取出近期**内部发现并修复的关键缺陷**：
1.  **[已修复/中危]**：客服调度 RPC 超时处理缺陷。影响用户在极端情况下的重试和恢复路径（已在 v1.8.25 修复）。
2.  **[已修复/中危]**：客服 Airflow 重试调度失效问题（已在 v1.8.24 修复）。
3.  **[已修复/低危]**：多店铺同时进行 OAuth 授权时可能导致状态同步不及时的并发漏洞（已在 v1.8.25 修复）。

### 6. 功能请求与路线图信号
今日无公开的功能请求，但基于近期的发布节奏，我们可以捕捉到明确的**产品路线图信号**：
*   **商业化与 SaaS 化信号**：引入“邀请码 UI”和“桌面端公告”（v1.8.24），表明产品正在构建 B 端用户的商业化触达与访问控制能力。
*   **AI + 跨境电商场景深化**：针对“新卖家”的设置引导、多语言预设商店技能以及专门针对“中国区”的依赖适配，说明 EasyClaw 正在重点发力“AI 助理辅助跨境电商”的落地场景，这为相关领域的开发者提供了极佳的参考。

### 7. 用户反馈摘要
由于今日无活跃的 Issue 评论，暂无法提炼直接的用户情绪与痛点。但从开发团队在短短一天内连续针对“新手落地流程”和“客服系统调度”进行两次修复来看，**新用户初次配置的成功率**以及**AI 客服系统的稳定性**是目前用户使用路径上的关键卡点，需持续关注。

### 8. 待处理积压
*   目前 [Open Issues](https://github.com/gaoyangz77/easyclaw/issues) 页面为静默状态，无长期未响应的陈旧 Issue。
*   **给维护者的建议**：建议核心团队在快速迭代的同时，抽出精力将部分内部规划的 Roadmap 以 Issue 的形式公开，并鼓励开发者在 Discussion 或 Issue 中反馈升级到 v1.8.26 后中国区依赖配置的具体表现，以此激活开源社区的参与感。

---
*数据来源：[github.com/gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw) | 分析时间：2026-06-02*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*