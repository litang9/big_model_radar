# OpenClaw 生态日报 2026-07-09

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-07-09 04:15 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 - 2026-07-09

## 1. 今日速览
OpenClaw 项目今日保持了极高的社区活跃度，过去 24 小时内共处理了 500 条 Issue 更新（其中 460 条为新开或活跃）以及 500 条 PR 更新。项目当前整体重心处于**稳定性攻坚与架构重构阶段**，大量讨论集中在多智能体编排的可靠性、跨渠道消息交付的准确性以及底层安全隔离机制的完善。尽管今日没有发布新版本，但高达 109 个 PR 被合并或关闭，表明核心维护团队正在高负荷推进代码审查与积压清理。项目整体健康度良好，但多智能体并发场景下的“静默失败”和“状态丢失”仍是当前最大的痛点。

## 2. 版本发布
**无新版本发布 (0 个)**。
*注：虽然无新发版，但根据 Issue [#48920](https://github.com/openclaw/openclaw/issues/48920) 反馈，目前 Live Docs 中的部分功能（如 IsolatedSessions）已领先于最新稳定版 `2026.3.13`，预示着下一个大版本可能包含重大心跳机制和会话隔离功能的升级。*

## 3. 项目进展
今日共有 **109 个 PR** 被合并或关闭，虽然未展示具体合并列表，但从当前高活跃度的开放 PR 中可以看出项目正在推进以下几个关键领域的迭代：
* **安全边界加固**：PR [#102403](https://github.com/openclaw/openclaw/pull/102403) 修复了备份文件权限设置不当（0644）导致凭据可能泄露的问题；PR [#102398](https://github.com/openclaw/openclaw/pull/102398) 切断了恶意 `git:` 插件

---

## 横向生态对比

这是一份基于 2026 年 7 月 9 日 OpenClaw 与 Hermes Agent 社区动态的横向对比分析报告。

### 1. 生态全景
当前，个人 AI 助手与自主智能体开源生态正处于**从“功能可用”向“企业级生产可用”演进的关键重构期**。开发者的核心关注点已从单一的模型能力接入，转移至多智能体并发编排的可靠性、超长上下文的精细化控制以及系统级安全边界的加固。同时，端侧形态（如桌面端插件化）与异构算力部署（如本地小模型适配、云原生容器化）的落地需求激增，标志着该生态正在加速走向成熟与细分。

### 2. 各项目活跃度对比
| 项目名称 | Issues 动态 (24h) | PRs 动态 (24h) | Release 情况 | 健康度与工程评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500次更新 (460活跃) | 500次更新 (109合并/关闭) | 无 (底层蓄力中) | **良好，聚焦质量**。核心团队高负荷清积压，重点修复安全漏洞与并发状态丢失。 |
| **Hermes Agent**| 240次更新 (208新/活跃) | 500次更新 (151合并/关闭) | 无 (大版本酝酿) | **高度活跃，扩张过快**。桌面端重构取得进展，但 PR 严重积压（349待合并），旧版回归 Bug 偏多。 |

### 3. OpenClaw 在生态中的定位
在当前的横向对比中，**OpenClaw 扮演着“底层基础设施与核心基座”的领导者角色**。
* **技术路线差异**：相比于 Hermes Agent 在桌面端 UI（Dockview）和多样化网关（QQ/飞书）上的横向扩张，OpenClaw 的重心明显向**纵深发展**，高度聚焦多智能体编排的底层可靠性、跨渠道消息交付以及系统级安全隔离（如修复 0644 权限漏洞、切断恶意插件）。
* **社区规模与质量**：尽管两者每日处理的 PR 总量相当（均约 500 次），但 OpenClaw 的 Issue 活跃度（460）远高于 Hermes（208），说明其拥有更庞大或更高频使用的生产级用户基数。同时，OpenClaw 展现出更健康的代码流转率（合并关闭 109 个且未提及严重积压），工程纪律性优于当前面临 349 个 PR 积压的 Hermes。

### 4. 共同关注的技术方向
透过底层代码与讨论，两个项目均在向以下核心领域倾斜：
* **状态与会话隔离机制**：
  * **OpenClaw**：正酝酿重大心跳机制和 IsolatedSessions 升级，以解决多智能体并发时的“状态丢失”。
  * **Hermes Agent**：在重构上下文引擎（引入 `select_context()` 钩子），以解决过期上下文反复触发子代理的类似问题。
* **企业级安全与网络穿透**：
  * **OpenClaw**：直接修复了备份凭据泄露和恶意插件通道。
  * **Hermes Agent**：社区强烈呼吁支持外部 Vault（Infisical）、内网穿透（Tailscale）以及严格的反向代理主机白名单（`--allowed-hosts`）。
* **工具链调用的鲁棒性**：两者都在强化 MCP（Model Context Protocol）及代理委派时的稳定性，防止局部任务失败导致整体循环崩溃。

### 5. 差异化定位分析
* **功能侧重**：
  * **OpenClaw**：**重后端编排与安全**。致力于打造高可靠、高隔离的多智能体调度核心。
  * **Hermes Agent**：**重端侧体验与多渠道连接**。大力推进 Desktop 桌面端插件化生态，并深度适配 IM 网关（QQ、飞书），注重人机交互工作流。
* **目标用户**：
  * **OpenClaw**：面向构建复杂多智能体系统、对数据安全与系统稳定性有极高要求的**企业级架构师与后端开发者**。
  * **Hermes Agent**：面向注重 GUI 交互、有将 Agent 接入日常 IM 工具需求、以及热衷于本地开源模型（Ollama/Gemma）跑通的**个人极客开发者与前端/全栈团队**。

### 6. 社区热度与成熟度
* **质量攻坚期（OpenClaw）**：项目处于成熟的稳定性维护阶段。Issue 反馈集中于底层并发痛点（静默失败），且无新版本发布却维持高 PR 合并率，说明核心维护团队正在严格执行技术债清理与架构重构。
* **快速迭代期（Hermes Agent）**：项目处于功能高速扩张阶段，社区对新功能（如桌面看板、本地模型）反馈热烈。但**工程治理出现瓶颈**，高达 349 个待合并 PR 和升级旧版（v0.17）引发的 P1 级回归 Bug（如破坏原有 Session 工作流），表明其 CI/CD 或人工 Review 机制正承受巨大压力。

### 7. 值得关注的趋势信号
对于 AI 智能体赛道的技术决策者，今日的动态释放了三个强烈的行业信号：
1. **“静默失败”与“上下文退化”成为 Agent 持续运行的阿喀琉斯之踵**：长程任务和多 Agent 协作中，状态丢失或过期上下文卡死是当前最大的痛点（OpenClaw 与 Hermes 均受困扰）。**投资 Observability（可观测性）与上下文生命周期管理（如动态压缩 Hook）是当下的刚需。**
2. **桌面端正在走向“IDE 化”**：Hermes 基于 Dockview 和独立 SDK 看板的实践表明，未来的个人 AI 助手将告别简单的对话框，转向类似于 VS Code 的多面板、可插拔插件架构的“智能体操作环境”。
3. **云原生与本地小模型工具链的割裂**：一方面，容器化部署（cgroup 感知）和内网安全接入成为标配；另一方面，开源本地模型（如 Gemma 4）在 vLLM 等框架下的 Tool Calling（工具调用）兼容性极差。**谁能率先提供稳定、低门槛的本地模型工具调用适配层，谁就能抢占注重隐私的 Developer 市场。**

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

以下是关于 Hermes Agent 开源项目的 2026-07-09 日报分析。

# Hermes Agent 项目动态日报 (2026-07-09)

### 1. 今日速览
今日 Hermes Agent 社区保持极高的活跃度，过去 24 小时内共处理了 **240 条 Issue 更新**（新开/活跃 208 条，关闭 32 条）以及 **500 条 PR 更新**（待合并 349 条，已合并/关闭 151 条）。虽然本日无新版本发布，但项目在底层架构优化（特别是 Desktop 插件化、上下文引擎重构）和多平台网关适配方面迎来了大量代码提交。整体来看，项目处于快速迭代且高度活跃的阶段，但部分旧版本升级（如 v0.17）带来的回归 Bug 仍需关注。

### 2. 版本发布
**本日无新版本发布。** (当前代码库可能正在为下一次大版本更新积累功能，尤其是桌面端重构和网关修复)。

### 3. 项目进展
今日共有 151 个 PR 被合并或关闭，项目在以下几个核心领域取得了实质性进展：
*   **桌面端架构大步演进**：PR [#60638](https://github.com/NousResearch/hermes-agent/pull/60638) 引入了基于 Dockview 布局树的贡献驱动外壳，并在此基础上落地了首个 SDK 插件看板功能 [#61173](https://github.com/NousResearch/hermes-agent/pull/61173)，标志着 Hermes 桌面端向插件化生态迈出关键一步。同时修复了 v40 Electron 启动崩溃问题 [#61277](https://github.com/NousResearch/hermes-agent/pull/61277)。
*   **网关与异步处理稳定性提升**：修复了 QQ 机器人 [#61266](https://github.com/NousResearch/hermes-agent/pull/61266) 和飞书 [#61269](https://github.com/NousResearch/hermes-agent/pull/61269) 网关在并发上传/评论处理时因单个任务失败导致整体崩溃的问题（通过添加 `return_exceptions=True`）。
*   **性能与云原生支持优化**：PR [#60872](https://github.com/NousResearch/hermes-agent/pull/60872) 增加了对 cgroup v2/v1 的感知能力，使得 Dashboard 在容器化部署时能准确报告 CPU 和内存限制；PR [#45491](https://github.com/NousResearch/hermes-agent/pull/45491) 将 Dashboard 的定时任务扫描从 FastAPI 的事件循环中剥离，避免了大量 Profile 造成的阻塞。
*   **MCP 工具与代理委派修复**：PR [#61273](https://github.com/NousResearch/hermes-agent/pull/61273) 强化了 oneshot 模式下被禁用的 MCP 工具集的拦截；PR [#61275](https://github.com/NousResearch/hermes-agent/pull/61275) 修复了凭证轮换时子代理 BaseURL 失效的问题。

### 4. 社区热点
今日讨论最热烈的焦点集中在**企业级部署/网络配置**与**本地小模型接入**：
*   **反向代理与 Tailscale 访问限制**：Issue [#34390](https://github.com/NousResearch/hermes-agent/issues/34390)（12 评论）反映用户强烈需要 Dashboard 支持 `--allowed-hosts` 标志，以便安全地放置在 Nginx、Caddy 或 Tailscale Serve 之后。这表明 Hermes 正被更多应用于生产级内网穿透或反向代理架构中。
*   **Gemma 4 工具调用支持**：Issue [#6626](https://github.com/NousResearch/hermes-agent/issues/6626)（11 评论）讨论了在 vLLM 环境下运行 Gemma 4 模型时的解析器配置问题。结合 Issue [#523](https://github.com/NousResearch/hermes-agent/issues/523)（本地模型配置指南），说明社区对**完全离线/本地开源模型跑通 Agent 工具链**有着极高的诉求。
*   **极简安装诉求**：Issue [#19986](https://github.com/NousResearch/hermes-agent/issues/19986)（10 评论）用户建议将非核心的捆绑 Skills 设为可选，以保持默认安装的轻量化和降低维护负担。

### 5. Bug 与稳定性
按严重程度排列今日报告或活跃的关键 Bug：
*   **[P1 - 严重] 桌面端与 Session 状态异常**：
    *   Issue [#53004](https://github.com/NousResearch/hermes-agent/issues/53004)（8 评论）指出最近合并的 "first-class projects" PR 彻底破坏了原有的“文件夹 -> Session -> 侧边栏”工作流。
    *   Issue [#50688](https://github.com/NousResearch/hermes-agent/issues/50688)（4 评论）报告升级 v0.17 后，任务被静默跳过，且过时上下文会反复触发子代理。
*   **[P2 - 高] 提供商与网关连接崩溃**：
    *   Issue [#53443](https://github.com/NousResearch/hermes-agent/issues/53443) 和 [#58646](https://github.com/NousResearch/hermes-agent/issues/58646) 反映 QQ 机器人网关因缺少 `is_reconnect` 参数在每次启动时直接崩溃（目前已有修复 PR 提交）。
    *   Issue [#60821](https://github.com/NousResearch/hermes-agent/issues/60821)（5 评论）报告在使用 OpenRouter 等第三方兼容端点时，抛出 `TypeError: unexpected keyword argument 'system'`，导致对话循环崩溃。
    *   Issue [#25822](https://github.com/NousResearch/hermes-agent/issues/25822) 指出 Gemini 视觉模块返回 503 时，未触发配置好的 Fallback Provider。
*   **[P3 - 中] Windows 客户端输入截断**：
    *   Issue [#39534](https://github.com/NousResearch/hermes-agent/issues/39534)（7 评论）报告 Windows 桌面端在输入较长中文提示词时出现严重的文本截断问题，极大影响国内用户体验。

### 6. 功能请求与路线图信号
从当前的 Issues 和 PR 动态中，可以洞察出项目下一步的可能演进方向：
*   **插件化与可扩展架构**：PR [#60638](https://github.com/NousResearch/hermes-agent/pull/60638) 和 [#61173](https://github.com/NousResearch/hermes-agent/pull/61173) 预示着 Hermes Desktop 正在打造基于 SDK 的 UI 插件生态，未来看板等高级功能可能以独立插件形式存在。
*   **上下文引擎精细化控制**：PR [#51226](https://github.com/NousResearch/hermes-agent/pull/51226) 实现了 RFC #36765，引入了 `select_context()` 和 `on_turn_complete()` 钩子，这将极大改善 Agent 在处理超长对话时的上下文路由和压缩效率。Issue [#39691](https://github.com/NousResearch/hermes-agent/issues/39691) 呼吁的逐工具输出压缩也契合这一路线。
*   **云原生与企业密钥管理集成**：Issue [#22791](https://github.com/NousResearch/hermes-agent/issues/22791) 呼吁集成 Infisical 作为外部 Vault 后端。结合当前对于代理支持（Issue [#5454](https://github.com/NousResearch/hermes-agent/issues/5454)）的诉求，说明企业级用户对安全与网络配置的标准在不断提高。

### 7. 用户反馈摘要
提炼今日评论中的真实用户痛点：
*   **本地模型体验割裂**：用户尝试使用 LM-Studio / Ollama / Gemma 4 等本地模型时，频繁遭遇工具调用碎片化、无限重复调用等兼容性问题（Issue [#5254](https://github.com/NousResearch/hermes-agent/issues/5254)）。
*   **网络与代理困境**：多位企业用户反映处于公司 VPN 或代理后，LLM API 无法正常路由（Issue [#5454](https://github.com/NousResearch/hermes-agent/issues/5454)），或者自签名 HTTPS 端点直接报错（Issue [#28260](https://github.com/NousResearch/hermes-agent/issues/28260)，该问题已于今日关闭）。
*   **桌面端多状态同步混乱**：桌面端用户苦于 Session 状态不同步、过期的压缩状态卡死 UI、以及异步任务唤醒旧 Session 等问题，影响了长时间工作流的连续性。

### 8. 待处理积压
以下重要问题面临长期积压或需维护者紧急介入：
*   **PR 积压严重**：目前有高达 **349 个 PR 处于待合并状态**，包括诸如上下文引擎重构 [#51226](https://github.com/NousResearch/hermes-agent/pull/51226) 和 Cgroup 监控 [#60872](https://github.com/NousResearch/hermes-agent/pull/60872) 等高质量社区贡献。庞大的未合并 PR 数量可能挫伤贡献者积极性，建议项目组引入更高效的 PR 评审分流机制。
*   **长期未解决的 P2/P3 Bug**：如 Issue [#5454](https://github.com/NousResearch/hermes-agent/issues/5454)（自 4 月 6 日提出 LLM API 代理支持至今未实现），以及 Windows 桌面端 UI 缩放支持缺失 Issue [#37619](https://github.com/NousResearch/hermes-agent/issues/37619)（6 月 2 日提出，获 7 个点赞）。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*