# OpenClaw 生态日报 2026-07-27

> Issues: 327 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-07-26 21:10 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

以下是 OpenClaw 项目 2026-07-27 的动态日报。作为专注于 AI 智能体与个人 AI 助手领域的开源项目，OpenClaw 今日展现了极高的社区活跃度与工程推进速度。

---

### 📊 1. 今日速览
- **整体活跃度极高**：过去 24 小时内，项目处理了 **327 条 Issue 更新**（新开/活跃 244，关闭 83）以及高达 **500 条 PR 更新**（待合并 308，已合并/关闭 192）。
- **工程节奏稳健**：尽管没有发布新版本，但核心维护者与社区贡献者正在集中精力处理系统稳定性（特别是网关事件循环阻塞、内存溢出）和多渠道（Telegram、Discord、Slack）的消息可靠性问题。
- **架构持续演进**：从今日高频提交的 PR 来看，项目正在经历一轮深度的内部重构，重点优化了工作板（Workboard）调度性能、沙盒隔离机制以及 Codex/Claude 模型的工具调用链路。

### 🚀 2. 版本发布
**无新版本发布**。当前代码库正处于 `2026.7.1` 与 `2026.7.2-beta.3` 之后的密集修复与特性迭代阶段。

### 🔧 3. 项目进展
今日共有 192 个 PR 被合并或关闭，项目在以下关键领域取得了实质性向前迈进：
- **媒体与上下文处理重构**：关闭了核心 PR #112913 `[refactor(media)]: hydrate and prune images from structured facts`，彻底删除了基于 marker-text 的媒体解析逻辑，转而采用结构化事实，大幅降低了 Agent 因解析文本导致幻觉或上下文崩溃的风险。
- **人机协作安全增强**：关闭了 PR #112918 `feat(agents): relay Claude native tool requests as Gateway approvals`，现在 Claude 的原生工具请求可以正确路由到 OpenClaw 的网关审批层，结束了之前在严格策略下非黑即白的“一刀切”阻断行为。
- **MCP 服务器管理优化**：合并了 PR #108676，修复了配置了 `disabled: true` 的 MCP 服务器依然被网关拉起的长期遗留问题。

### 🌟 4. 社区热点
今日讨论最热烈的问题反映了用户对**跨端覆盖**和**长上下文可靠性**的强烈诉求：
- **[#75](https://github.com/openclaw/openclaw/issues/75) (👍 80, 评论 115)**：**Linux/Windows 客户端缺失**。作为拥有 macOS/iOS/Android 客户端的项目，桌面端 Linux/Windows 的缺失成为了社区最大的痛点。用户强烈要求提供功能对标 macOS 的原生应用。
- **[#99241](https://github.com/openclaw/openclaw/issues/99241) (评论 24)**：**工具输出被渲染成图片导致 Agent 失明**。在长会话或 ANSI 字符密集的工作流中，stdout 文本被折叠为 `(see attached image)`。这直接破坏了 Agent 的感知能力，引发了大量关于 UX 退化的抱怨。
- **[#7707](https://github.com/openclaw/openclaw/issues/7707) (评论 21)**：**基于来源的记忆信任标签**。用户对“记忆中毒”（网页抓取或第三方插件注入恶意指令）深感担忧，呼吁引入基于出处的信任分级机制。

### 🐛 5. Bug 与稳定性
今日报告的 Bug 集中在**网关性能瓶颈**与**消息流同步异常**，按严重程度排列如下：

#### 🔴 P0 / 致命级
- **[#109145](https://github.com/openclaw/openclaw/issues/109145) [Bug]**: `2026.7.1-beta.5` 版本中，网关 HTTP Server 启动并监听端口，但**拒绝所有外部 TCP 连接**，导致服务直接不可用。*(状态: 等待作者修复)*

#### 🟠 P1 / 高危级
- **[#112423](https://github.com/openclaw/openclaw/issues/112423) [Bug]**: 归档大型 SQLite 会话记录时，会阻塞网关的事件循环，导致全局卡顿。
- **[#113474](https://github.com/openclaw/openclaw/issues/113474) [Bug]**: 树莓派 5 部署陷入崩溃死循环（被 systemd 反复拉起）。*(状态: 已关闭，可能已定位)*
- **[#86996](https://github.com/openclaw/openclaw/issues/86996)**: 开启 `active-memory` 并配合 Codex 后端时，简单的 Telegram 消息会导致极长的响应延迟、Hook 超时和启动中止。
- **[#113315](https://github.com/openclaw/openclaw/issues/113315) [Bug]**: Telegram 入站消息在 Offset 持久化后静默丢失。
  - *✅ 修复进展*: 已有 PR **[#113368](https://github.com/openclaw/openclaw/pull/113368)** 提交，确保在持久化 Offset 前先完成磁盘 Spool 写入。

#### 🟡 P2 / 回归与体验问题
- **[#86519](https://github.com/openclaw/openclaw/issues/86519)**: 自 `5.20` 更新后，Agent 在 Telegram 中对单条消息重复回复 2-10 次（消息轰炸）。
- **[#108473](https://github.com/openclaw/openclaw/issues/108473)**: Cron 工具的 schema 验证使用了未锚定的正则表达式，破坏了 `llama.cpp` 的工具调用能力。

### 🗺️ 6. 功能请求与路线图信号
结合 Issue 诉求与今日高频的 Workboard 插件 PR，可以看出接下来的演进方向：
- **插件化任务板的大规模重构**：机器人账号 `@zilokki-bot` 与维护者今日提交了至少 6 个关于 Workboard 的 PR（如 **[#114160](https://github.com/openclaw/openclaw/pull/114160)** 修复调度对网关 CPU 的压力，**[#114167](https://github.com/openclaw/openclaw/pull/114167)** 增加状态流转通知）。这表明 OpenClaw 正在强化其作为**自动化任务调度中心**的能力。
- **沙盒后端扩展**：PR **[#114168](https://github.com/openclaw/openclaw/pull/114168)** 引入了 Docker 原生的 `sbx` 作为隔离后端，表明项目对代码执行沙盒的安全隔离要求越来越高。
- **Agent 执行权限细粒度控制**：PR **[#114175](https://github.com/openclaw/openclaw/pull/114175)** 阻止了利用 `bash -lc` 绕过人工审批执行未审查代码的行为，呼应了 Issue **[#6615](https://github.com/openclaw/openclaw/issues/6615)** 关于增加 exec-approvals 黑名单的诉求。

### 💬 7. 用户反馈摘要
从海量 Issue 中提炼出目前真实用户的三大核心痛点：
1. **“模型幻觉”与“伪造工具调用”频发**：如 Issue **[#45049](https://github.com/openclaw/openclaw/issues/45049)** 指出，Agent 经常在文本中“假装”调用了 `web_fetch` 并编造结果，而不是发起真实的 Tool Call。
2. **长上下文压缩机制脆弱**：用户抱怨 180s 的压缩超时时间（**[#92043](https://github.com/openclaw/openclaw/issues/92043)**）对于本地模型或长历史记录来说过于苛刻，一旦超时，所有进度丢失且每轮重复触发。
3. **UI 状态不一致**：多 Agent 场景下，Control UI 的会话列表和 Avatar 加载混乱（**[#112696](https://github.com/openclaw/openclaw/issues/112696)**），且 `/new` 和 `/reset` 命令不能真正重置会话（**[#113466](https://github.com/openclaw/openclaw/issues/113466)**）。

### ⚠️ 8. 待处理积压
以下高价值/高危 Issue 长期处于 `stale` 或缺乏实质性修复进展，需维护者重点介入：
- **[#85844](https://github.com/openclaw/openclaw/issues/85844) [Stale, P1]**: 自动更新后，运行中的网关会继续引用已被删除的旧哈希打包文件，导致严重的模块导入错误。
- **[#85251](https://github.com/openclaw/openclaw/issues/85251) [Stale, P1]**: Codex app-server 在发出 `turn/started` 后静默卡死，只能等到 360 秒超时被强制中断，严重影响使用体验。
- **[#42026](https://github.com/openclaw/openclaw/issues/42026) [Stale, RFC]**: 关于将单体网关拆分为“控制平面”与“Agent 运行时”的架构级 RFC。随着多 Agent 并发问题的增多，这个底层架构重构急需提上日程。

---
*数据统计周期：2026-07-26 至 2026-07-27 | 由 OpenClaw Insights 自动生成与深度分析*

---

## 横向生态对比

以下是基于 2026-07-27 各开源项目动态数据的横向对比与技术生态分析报告：

### 1. 生态全景
截至 2026 年下半年，个人 AI 助手与自主智能体开源生态已全面迈入**“深水区”与“工程化攻坚阶段”**。单纯的大模型接入不再是卖点，当前生态的核心矛盾已转移至**多渠道高并发下的网关稳定性、细粒度的权限与沙盒隔离，以及长上下文的可靠性**。项目架构正加速向多 Agent 协作、控制平面与数据平面解耦的方向演进，同时开发者对跨端覆盖（尤其是桌面端）和防“记忆中毒”的安全诉求达到了前所未有的高度。

---

### 2. 各项目活跃度对比
今日两个核心项目均处于极高负载的迭代状态，Issue 与 PR 活跃度均突破量级瓶颈，但闭环处理效率呈现一定差异。

| 项目名称 | Issues 动态 (新开/活跃) | Issues 关闭 | PRs 动态 (待合并) | PRs 合并/关闭 | Release 状态 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 244 | 83 | 308 | 192 | 无 (迭代期) | **优良 (85%)**<br>合并率高，工程节奏稳健，P0问题响应快 |
| **Hermes Agent** | 459 | 41 | 392 | 108 | 无 (迭代期) | **承压 (65%)**<br>社区声量极大，但积压严重，修复速度落后于反馈 |

*注：健康度评估基于当日“已关闭/合并数”占“总活跃量”的比例，以及 P0/P1 Bug 的响应速度综合得出。*

---

### 3. OpenClaw 在生态中的定位
相较于 Hermes Agent，OpenClaw 展现出**更强的底层基础设施自建能力与中枢控制定位**：
*   **技术路线差异**：OpenClaw 正在进行深度的内部重构（如废弃 marker-text 转向结构化事实，重构 Workboard 调度），其架构更偏向于“以网关为核心的任务调度中心”。而 Hermes 则更多在兼容层（如桌面端 UI、本地大模型 Prompt 处理）发力。
*   **工程执行力优势**：面对高达 500 条的 PR 动态，OpenClaw 今日成功合并/关闭了 192 个 PR，展示了成熟的开源社区治理能力与明确的工程边界把控。
*   **核心壁垒**：OpenClaw 的多渠道（Telegram、Discord、Slack）消息流转机制与正在引入的 Docker 原生 `sbx` 隔离后端，构建了较强的企业级自动化落地壁垒。

---

### 4. 共同关注的技术方向
通过对双项目动态的交叉比对，以下四个技术维度的需求正在行业内核聚变：

1.  **人机协作与执行安全**：
    *   *OpenClaw*：Claude 原生工具请求接入网关审批层；阻止 `bash -lc` 绕过审批的黑名单机制。
    *   *Hermes*：呼吁打破二元授权，引入 `Owner/Admin/User/Guest` RBAC 权限体系。
2.  **任务状态机与工作流调度**：
    *   *OpenClaw*：Workboard 插件大规模重构，解决 CPU 调度压力与状态流转通知。
    *   *Hermes*：修复看板子任务的通知继承，确保跨层级任务状态同步。
3.  **长上下文与防幻觉机制**：
    *   *OpenClaw*：解决工具输出被折叠为图片导致的 Agent 失明；呼吁基于来源的记忆信任标签。
    *   *Hermes*：解决调用本地大模型时 Prompt 爆炸导致的长时间卡顿。
4.  **跨平台客户端与触达能力**：
    *   *OpenClaw*：社区对缺失 Linux/Windows 原生桌面端反应强烈。
    *   *Hermes*：Windows 11 客户端 WebSocket 连接崩溃死循环及 macOS 签名导致的权限失效成为今日焦点。

---

### 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
| :--- | :--- | :--- |
| **功能侧重** | **自动化任务调度与多渠道消息网关**。偏向后端基础设施，强调与 Codex/Claude 工具链的深度集成与沙盒隔离。 | **桌面端体验与本地模型协同**。侧重于跨系统客户端的可用性及对接本地开源生态的优化。 |
| **目标用户** | 极客开发者、多 Agent 自动化构建者、注重系统级编排的进阶玩家。 | 个人 AI 助手偏好者、本地模型用户、注重 GUI 交互与团队协作的用户。 |
| **架构痛点** | 受到**单体网关**性能瓶颈（如 SQLite 归档阻塞事件循环），急需拆分控制平面与运行时。 | 受到**前端渲染与跨平台兼容**掣肘（Win11 崩溃、Mac 权限失效），计费与状态管理粒度粗糙。 |

---

### 6. 社区热度与成熟度
*   **【稳健收敛期】OpenClaw**：虽然收到 327 条 Issue 和 500 条 PR，但通过高频的合并动作（192个）和针对 P0/P1 问题的精准修复（如 Telegram Offset 丢失），项目正在将海量社区输入有效转化为工程产出。处于“高活跃+高质量”的双赢状态。
*   **【极速扩张期 / 承压期】Hermes Agent**：今日狂飙突进产生 459 条活跃 Issue，但仅关闭 41 条。虽然核心团队在全力修复 P0 数据丢失和桌面端崩溃，但积压的反馈表明其社区热度已超出现有维护带宽的承载极限。

---

### 7. 值得关注的趋势信号
从今日海量的问题反馈与 PR 走向中，为 AI 智能体开发者提炼以下四大不可忽视的趋势：

1.  **“上下文失真”是当前可用性的最大杀手**：无论是 OpenClaw 中“Agent 假装调用工具编造结果”，还是“长文本压缩超时导致进度丢失”，都表明 **LLM 的上下文管理与状态追踪机制极其脆弱**。开发者亟需引入可靠的 State Machine 结合结构化记忆。
2.  **沙盒与权限将取代“提示词”成为安全主轴**：面对 `bash -lc` 绕过、记忆中毒、甚至 Hermes 中出现的“人工审批任务被自动静默提升”，单纯依赖 Prompt 约束已破产。**Docker 原生沙盒、分级 RBAC、严格的黑白名单执行网关** 必须成为下一代 Agent 的标配。
3.  **单体架构走向终结**：无论是 OpenClaw 呼吁将网关拆分为控制平面与运行时（RFC #42026），还是 Hermes 中网关阻塞与计费状态污染，都证明“单体网关+全状态内存/单库 SQLite”已无法支撑多渠道并发，微服务/模块化架构势在必行。
4.  **端侧体验决定下沉深度**：尽管后端架构火热，但真实用户仍然会被“Win11 无法启动”、“缺乏 Linux 客户端”、“UI Avatar 加载错乱”等最直观的体验问题激怒。**跨平台兼容性（特别是 Windows/Linux）是决定开源项目能否实现大众化破圈的决定性因素。**

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

以下是 Hermes Agent 项目 2026-07-27 的动态日报。本报告基于过去 24 小时的 GitHub 仓库活动数据分析生成。

### 1. 今日速览
过去 24 小时内，Hermes Agent 项目保持了极高的社区活跃度与开发强度。共有 **500 条 Issue 更新**（新开/活跃 459 条，关闭 41 条）以及 **500 条 PR 更新**（待合并 392 条，已合并/关闭 108 条）。尽管今日无新版本发布，但核心团队与社区贡献者正集中精力修复跨平台桌面端（特别是 Windows 平台）的稳定性问题，重构权限控制模型，并优化本地大模型连接时的性能表现。项目整体处于高频迭代与底层架构加固阶段。

### 2. 版本发布
* **今日无新版本发布**。

### 3. 项目进展
今日共合并与关闭了 108 个 PR，项目在功能性缺陷修复、安全加固和跨平台兼容性上迈出坚实一步：
* **防止严重数据丢失 (P0)**：PR [#72216](https://github.com/NousResearch/hermes-agent/pull/72216) 修复了 `hermes skills update` 时会静默将技能替换为不同源注册表同名技能并删除原文件的致命问题。
* **UI 与交互修复**：PR [#72219](https://github.com/NousResearch/hermes-agent/pull/72219) 修复了桌面端/仪表盘 MCP 工具发现范围错误的问题；PR [#72220](https://github.com/NousResearch/hermes-agent/pull/72220) 修复了内联终端命令重复渲染的卡顿问题。
* **工作流优化**：PR [#72223](https://github.com/NousResearch/hermes-agent/pull/72223) 修复了看板子任务的通知继承，确保父任务能接收到子任务完成状态。
* **安全与依赖更新**：PR [#72209](https://github.com/NousResearch/hermes-agent/pull/72209) 全面刷新了审计过的 Python 和 Node 依赖，清理了安全警告。
* **环境隔离与兼容性**：PR [#72197](https://github.com/NousResearch/hermes-agent/pull/72197) 和 [#64849](https://github.com/NousResearch/hermes-agent/pull/64849) 彻底修复了 Docker 登录 shell 环境下 PATH 变量被重置导致虚拟环境失效的历史顽疾。

### 4. 社区热点
今日讨论最热烈的 Issue 集中在架构扩展与底层逻辑优化上：
* **[Gateway 权限分层模型]** Issue [#527](https://github.com/NousResearch/hermes-agent/issues/527)（15 评论，10 👍）：用户强烈呼吁打破当前“全有或全无”的二元授权模型，要求为 Messenger 平台引入 `Owner/Admin/User/Guest` 的 RBAC 权限体系，以满足多团队安全协作需求。
* **[集成 Buzz 平台]** Issue [#68871](https://github.com/NousResearch/hermes-agent/issues/68871)（13 评论，12 👍）：针对 Block 最新开源的人类/AI 共享通讯空间 Buzz，社区表现出极高的集成热情，希望将其作为新的 Gateway 接入。
* **[Agent 实时时间感知]** Issue [#10421](https://github.com/NousResearch/hermes-agent/issues/10421)（13 评论，9 👍）：指出 Agent 目前缺乏稳定的 Turn 级别时间感知，每次都需要额外调用工具才能确认“今天/现在”，呼吁在上下文注入实时时间。

### 5. Bug 与稳定性
今日报告的关键 Bug 集中在本地模型性能、跨平台桌面端以及任务调度状态机：
* **[P1 - Windows 桌面端启动死循环]** Issue [#71226](https://github.com/NousResearch/hermes-agent/issues/71226)：Windows 11 更新后，WebSocket 连接建立后客户端瞬间断开，触发渲染器无限重置循环，导致用户完全无法启动应用。
* **[P1 - macOS 签名导致权限反复失效]** Issue [#49110](https://github.com/NousResearch/hermes-agent/issues/49110)：因 Hermes.app 缺乏 Apple Developer ID 签名，导致每次更新后系统的 TCC（辅助功能/录屏等）隐私权限被全部撤销。
* **[P2 - 本地大模型 Prompt 爆炸]** Issue [#61265](https://github.com/NousResearch/hermes-agent/issues/61265)：Hermes 在调用本地 OpenAI 兼容 API 时发送极其庞大的 Prompts，导致即使模型已加载也会出现数分钟的长时间卡顿。
* **[P2 - 人工审批网关被绕过]** Issue [#39609](https://github.com/NousResearch/hermes-agent/issues/39609)：以 `--initial-status blocked` 创建的任务在 1 秒后被无操作者记录地自动提升为 `ready`，并被默认 worker 接管执行，严重违背审批流设计初衷。
* **[P2 - 会话级计费状态污染]** Issue [#67764](https://github.com/NousResearch/hermes-agent/issues/67764)：`cost_status` 采用“最近一次调用覆盖”逻辑，导致跨 SQL、内存和聚合洞察的成本核算数据失真。

### 6. 功能

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*