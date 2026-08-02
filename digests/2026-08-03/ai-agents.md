# OpenClaw 生态日报 2026-08-03

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-08-02 21:09 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

以下是 OpenClaw 开源项目 2026 年 8 月 3 日的动态日报。作为专注于 AI 智能体与个人 AI 助手领域的项目，OpenClaw 目前正处于高频迭代与底层稳定性攻坚阶段。

---

### 📊 OpenClaw 项目日报 (2026-08-03)

#### 1. 今日速览
过去 24 小时内，OpenClaw 社区保持了极高的活跃度，共有 500 条 Issue 更新（441 条新开/活跃）和 500 条 PR 更新（115 条已合并/关闭）。项目刚刚发布了 `v2026.7.2-beta.7`，核心聚焦于状态数据的安全性与容灾恢复机制。然而，社区目前面临的最大挑战是**网关的内存泄漏（OOM）和多渠道（Discord/WhatsApp/Telegram）的静默消息丢失问题**。此外，团队引入的 `clawsweeper[bot]` 正在高效且大批量地自动修复边缘 Bug。

#### 2. 版本发布
- **[v2026.7.2-beta.7](https://github.com/openclaw/openclaw/releases)** 
  - **更新重点**：全面强化状态安全与恢复机制。
  - **核心特性**：引入隔离存储以在主数据库损坏时保护持久化数据；支持可崩溃恢复的 SQLite 快照、抗崩溃的文件系统发布；引入 Schema 升级防数据丢失拒绝机制，以及回滚写入器的快照恢复。
  - **影响评估**：此版本是底层数据架构的重大重构，旨在彻底解决近期频发的状态损坏问题，建议所有测试用户尽快升级以验证恢复机制的有效性。

#### 3. 项目进展
今日共有 115 个 PR 被合并或关闭，项目在多渠道支持、鉴权、性能优化和 AI 自动修复方面取得实质进展：
- **核心状态与持久化**：推进了 "Durable Core" 系列重构，其中 [PR #111278](https://github.com/openclaw/openclaw/pull/111278) (3/6) 和 [PR #111343](https://github.com/openclaw/openclaw/pull/111343) (4/6) 已就绪，大幅增强了网关的所有者优先恢复机制和智能体交互的持久化能力。
- **网关性能优化**：[PR #118207](https://github.com/openclaw/openclaw/pull/118207) 实施了针对流式负载下 `sessions.list` 读放大的性能优化，修复了高并发下延迟飙升至 9 秒的瓶颈。
- **自动化修复**：`clawsweeper[bot]` 大显身手，自动生成并提交了多个修复 PR，包括处理 WhatsApp 自聊模式入站策略 ([PR #117954](https://github.com/openclaw/openclaw/pull/117954))、修复 Google 嵌入提供程序别名 ([PR #117976](https://github.com/openclaw/openclaw/pull/117976)) 等，加速了边缘 Bug 的闭环。

#### 4. 社区热点
今日讨论最热烈的 Issues 集中在**模型调用静默失败**与**长时间运行状态膨胀**：
- 🔥 **[Issue #116277](https://github.com/openclaw/openclaw/issues/116277)** (86 评论)：DeepSeek v4 Flash 模型在 Telegram 群组中静默回复失败，仅返回降级文案。这反映了用户对“AI 无反馈罢工”的极度沮丧。
- 🔥 **[Issue #116201](https://github.com/openclaw/openclaw/issues/116201)** (47 评论)：实时语音会话在遭遇慢连接时，未限制提供商状态和预读取音频的内存保留，导致严重的资源泄漏。
- 🔥 **[Issue #91588](https://github.com/openclaw/openclaw/issues/91588)** (22 评论)：严重的网关内存泄漏，RSS 从 350MB 增长至 15.5GB，导致 OOM 循环崩溃重启。

#### 5. Bug 与稳定性
今日报告的严重 Bug 主要围绕 **网关崩溃、内存溢出与状态死锁**：
- **[P0 级严重] 网关内存泄漏 OOM**：[Issue #91588](https://github.com/openclaw/openclaw/issues/91588) 和 [Issue #115424](https://github.com/openclaw/openclaw/issues/115424) 指出网关在持续运行数天后 V8 堆内存溢出，且自动恢复机制会将单次崩溃转化为 7 核转储死循环。（暂无直接 Fix PR，处于调查阶段）。
- **[P0 级严重] Schema 降级导致数据丢失**：[Issue #115421](https://github.com/openclaw/openclaw/issues/115421) 指出低版本打开高版本 state DB 时，清理逻辑会导致 cron 任务等数据全丢。（beta.7 的隔离存储机制或旨在解决此问题）。
- **[P1 级高] 崩溃熔断器永久封锁渠道**：[Issue #115326](https://github.com/openclaw/openclaw/issues/115326) 报告 Discord/WhatsApp 被网关永久抑制，且官方文档的恢复 API (`channels.start`) 抛出 WebSocket 1006 错误失效。
- **[P1 级高] 上下文窗口死锁**：[Issue #115908](https://github.com/openclaw/openclaw/issues/115908) 指出，高负载下会话转录的重建会阻塞 Node 主线程数十秒，导致所有渠道传输停滞。

#### 6. 功能请求与路线图信号
从 Issue 和 PR 动态中，可以清晰看出 OpenClaw 下一阶段的演进路线：
- **安全与信任体系**：[Issue #7707](https://github.com/openclaw/openclaw/issues/7707) 提出按来源（网页/用户/插件）对智能体记忆进行“信任级别标记”，以防止恶意网页内容导致的记忆投毒攻击。
- **动态模型支持**：[Issue #10687](https://github.com/openclaw/openclaw/issues/10687) 要求实现完全动态的模型发现机制（首当其冲是 OpenRouter），当前内置静态模型列表导致新模型（如 Fable 5 / Haiku 4.5）无法使用。
- **UI/UX 重构**：[Issue #75947](https://github.com/openclaw/openclaw/issues/75947) 与 [Issue #113251](https://github.com/openclaw/openclaw/issues/113251) 呼吁重构 WebChat UI 和文件查看器，当前界面被用户批评“过于密集，像原始配置文件”。

#### 7. 用户反馈摘要
通过对 Issue 评论的情感与技术细节提炼，真实用户的痛点集中在以下几方面：
- **多 OAuth 凭证管理混乱**：用户在配置了多账户（如 Codex / ChatGPT）时，经常遭遇凭证静默过期或错误切换 ([Issue #58498](https://github.com/openclaw/openclaw/issues/58498))。
- **“静默截断”极其影响体验**：诸如 [Issue #84516](https://github.com/openclaw/openclaw/issues/84516) 指出，长回复在 1000 字符左右被静默截断且无任何报错，导致自动化流水中断。
- **国产模型/渠道兼容性诉求强烈**：[Issue #116691](https://github.com/openclaw/openclaw/issues/116691) 报告了使用 OpenAI-responses 调用火山引擎时在长上下文中必现的参数缺失 Bug；同时微信渠道 ([Issue #79293](https://github.com/openclaw/openclaw/issues/79293)) 的间歇性发送失败也困扰着中文用户。
- **日常高频工具缺失**：Windows 环境下的 `exec/read` 工具间歇性返回空值 ([Issue #105528](https://github.com/openclaw/openclaw/issues/105528))，严重阻碍了将 OpenClaw 作为系统级助手使用的用户。

#### 8. 待处理积压
以下高影响力且长期卡壳的 Issue 需要核心维护者关注：
- **长期记忆索引失效**：[Issue #90414](https://github.com/openclaw/openclaw/issues/90414) 报告 `agentmemory__memory_search` 持续返回 "index metadata is missing"，导致 AI 无法读取长期记忆，目前被打上 `clawsweeper-recovery-stuck` 标签。
- **子智能体流式支持缺失**：[Issue #47597](https://github.com/openclaw/openclaw/issues/47597) 请求为 `runtime="subagent"` 提供 `streamTo="parent"` 支持，该需求自 3 月提出至今未有实质推进。
- **图像批处理网关层缺失**：[Issue #39343](https://github.com/openclaw/openclaw/issues/39343) 指出多图连发会导致智能体回复刷屏，急需网关层引入“媒体组缓冲”机制。

---

## 横向生态对比

这是一份基于 2026 年 8 月 3 日 OpenClaw 与 Hermes Agent 社区动态的横向对比分析报告。

---

### 1. 生态全景
当前，个人 AI 助手与自主智能体开源生态正处于**从“功能可用”向“工业级高可用”跨越的深水区**。多模态交互、跨平台消息路由以及长程记忆管理已成为标配，但底层稳定性（如内存溢出、并发竞态）和边缘场景的打磨占据了开发团队的主要精力。同时，生态正在经历底层架构的演进，如向无状态协议（MCP 2.0）迁移、引入图数据库（PostgreSQL/知识图谱）以及强化本地执行的安全边界，预示着 AI 智能体正加速向重度生产力工具演进。

### 2. 各项目活跃度对比

| 项目名称 | Issue 动态 (新开/活跃) | PR 动态 (合并/关闭) | Release 情况 | 健康度与成熟度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 (441) | 500 (115) | `v2026.7.2-beta.7`<br>(聚焦状态与容灾恢复) | **承压/攻坚**：迭代极高，引入了 Bot 自动修复，但正面临 P0 级网关 OOM 和严重状态死锁的考验。 |
| **Hermes Agent**| 392 (319) | 500 (177) | 无新版本 | **稳健/收敛**：PR 闭环率极高，无新版本发布表明团队在集中消化 v0.19.0 遗留问题，重点修补安全边界与并发缺陷。 |

### 3. OpenClaw 在生态中的定位
*   **核心优势**：OpenClaw 展现出了极强的**全渠道分发与高并发接入能力**（深度整合 Discord/WhatsApp/Telegram/微信等）。其引入的 `clawsweeper[bot]` 自动修复机制，展示了在处理海量边缘 Bug 方面的先进 AI 工程化能力。
*   **技术路线差异**：目前 OpenClaw 极度侧重于**“网关路由与状态防丢”**（如 Durable Core 重构、隔离存储）。相比之下，Hermes Agent 更关注本地执行与安全（命令审批防绕过、TUI 交互）。
*   **生态坐标**：相比于 Hermes Agent 偏向极客个人的桌面端/终端工具定位，OpenClaw 更像是一个**重型、全天候挂机的“系统级消息中枢”**，其用户基数和交互频次带来了更复杂的流式负载和数据持久化挑战。

### 4. 共同关注的技术方向
1.  **国产大模型/自定义端点的深度兼容**：
    *   *OpenClaw*：报告了火山引擎 ARK 长上下文必现参数缺失 Bug。
    *   *Hermes Agent*：报告了强制归一化和 `base_url` 覆盖破坏了自定义 OpenAI 兼容端点。表明非 OpenAI 模型的接入依然是全行业的工程痛点。
2.  **长程记忆与上下文管理机制**：
    *   *OpenClaw*：急需解决状态膨胀与 `agentmemory` 索引失效。
    *   *Hermes Agent*：正探索 Memory 和 Context 设置解耦，以及引入知识图谱（MCP 本体上下文层）。
3.  **多渠道/多配置文件的并发与隔离**：
    *   *OpenClaw*：深受多 OAuth 凭证管理混乱和静默过期困扰。
    *   *Hermes Agent*：在多 Profile 切换时遭遇路径失效和孤儿进程问题。

### 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
| :--- | :--- | :--- |
| **功能侧重** | **多渠道通信中枢**：流式负载优化、跨平台消息防丢失、状态容灾恢复。 | **本地化生产力执行器**：TUI 桌面端交互、本地工具调用、凭证安全管理。 |
| **目标用户** | 需要将 AI 接入各类社群、进行全天候自动化消息分发的**进阶玩家/运维者**。 | 注重桌面端工作流编排、使用终端/远端服务器进行日常开发的**极客开发者**。 |
| **核心架构** | Node.js 主线程，依赖 V8 引擎，重度依赖网关层与状态快照（SQLite）。 | 兼容性广（支持 systemd/非 systemd），正在引入 PostgreSQL 17 热数据层与 MCP 无状态协议。 |
| **当前攻坚** | 解决高并发下的内存泄漏（OOM）、Schema 降级数据丢失。 | 解决本地工具执行的安全审批（Bash 注入绕过）、多线程异步任务被误杀。 |

### 6. 社区热度与成熟度
*   **OpenClaw 处于“快速迭代引发规模阵痛”阶段**：日均 500+ Issue 的极高活跃度说明其用户基数庞大。但其底层架构（如 Node 主线程阻塞、V8 堆溢出）已无法承载日益复杂的多模态交互，目前正通过高强度的底层重构（如 v2026.7.2-beta.7）来进行止血和补救。
*   **Hermes Agent 处于“质量收敛与静默蓄力”阶段**：尽管处理了 392 条 Issue 动态，但其 PR 关闭/合并数（177）与活跃数比例健康。没有急于推新版本，而是重点修补高危安全漏洞（P2 级防绕过机制失效）和底层依赖锁定，说明项目注重工程质量和内部架构升级。

### 7. 值得关注的趋势信号（开发者参考价值）
1.  **“静默失败”是当前 AI 智能体体验的头号杀手**：无论是 OpenClaw 的长回复静默截断、无反馈罢工，还是凭证静默过期。开发者需高度警惕：**AI 缺乏有效的错误抛出机制，会导致极其糟糕的用户信任危机**，必须建立完善的降级反馈与日志监控。
2.  **安全边界需从“粗粒度拦截”向“底层解析级防御”演进**：H

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

这是一份基于 2026-08-03 GitHub 数据生成的 Hermes Agent 项目动态日报。

---

# Hermes Agent 项目动态日报 (2026-08-03)

## 1. 今日速览
Hermes Agent 今日保持了极高的社区活跃度与工程迭代速度。过去 24 小时内，项目处理了 **392 条 Issue 动态**（新开/活跃 319 条，关闭 73 条）以及 **500 条 PR 动态**（包含 177 条合并/关闭），显示出维护团队在消化历史积压和推进新架构方面投入了大量精力。尽管今日没有发布新版本，但核心关注点集中在 Desktop v0.19.0 引入的 UI 回归 Bug、跨平台配置兼容性，以及多个高危安全边界的修复上。整体而言，项目正处于高频打磨与核心架构（如存储层、并发调度）升级的快车道上。

## 2. 版本发布
**本日无新版本发布 (0 个 Release)**。
项目当前主要在处理 v0.19.0 版本带来的反馈与遗留问题，预计团队正在为下一个大版本积攒核心功能（如 PostgreSQL 存储层、MCP 协议大版本升级）。

## 3. 项目进展
今日共有 177 个 PR 被合并或关闭，项目在提升运行时稳定性、多平台网关适配以及 TUI 交互体验上取得了重大进展：
*   **会话生命周期与稳定性修复：** PR [#77019](https://github.com/NousResearch/hermes-agent/pull/77019) 和原 PR [#75715](https://github.com/NousResearch/hermes-agent/pull/75715) 修复了在 Desktop 配置切换或会话清理时，意外杀死后台异步委派任务的严重问题，大幅提升了多任务并发的可靠性。
*   **依赖管理与更新机制：** PR [#77085](https://github.com/NousResearch/hermes-agent/pull/77085) 修复了安全依赖锁定在 `hermes update` 后失效的问题；PR [#73489](https://github.com/NousResearch/hermes-agent/pull/73489) 修复了非 systemd 环境下更新导致 dashboard 控制台孤儿进程的问题。
*   **网关平台兼容性：** PR [#73701](https://github.com/NousResearch/hermes-agent/pull/73701) 修复了 Telegram 竖屏视频比例失调的问题；PR [#77067](https://github.com/NousResearch/hermes-agent/pull/77067) 修复了 Gmail 搜索因 Header 大小写敏感导致的字段丢失问题。
*   **前沿架构推进：** PR [#77065](https://github.com/NousResearch/hermes-agent/pull/77065) 引入了默认关闭的 PostgreSQL 17 热数据层支持（保持 SQLite 为唯一权威源）；PR [#77076](https://github.com/NousResearch/hermes-agent/pull/77076) 加入了持久的 SMART 忙碌输入编排机制。

## 4. 社区热点
今日讨论最热烈的议题主要围绕桌面端体验降级与底层安全边界展开：
*   **桌面端状态栏丢失引发广泛关注：** Issue [#73211](https://github.com/NousResearch/hermes-agent/issues/73211) 报告了 v0.19.0 移除了上下文窗口、YOLO 模式和工具运行状态指示器。此问题获得了 **5 个点赞** 和 9 条评论，表明“运行时状态可见性”对用户的安全感和日常监控至关重要。
*   **跨平台与多配置文件更新故障：** Issue [#75598](https://github.com/NousResearch/hermes-agent/issues/75598) 和 Issue [#38053](https://github.com/NousResearch/hermes-agent/issues/38053) 反映了 Windows 和 macOS 下，多配置文件并存时更新机制导致的服务冲突与网关未重启问题。
*   **浏览器端语音模式需求高涨：** Issue [#20765](https://github.com/NousResearch/hermes-agent/issues/20765) 提议在 Web Dashboard 中通过 WebRTC 实现语音输入，获得了 **4 个点赞**，反映出用户将 Hermes 部署在远端服务器后，对于多模态交互（语音/视觉）的强烈需求。
*   **国际化呼声：** Issue [#40239](https://github.com/NousResearch/hermes-agent/issues/40239) 呼吁在桌面端 UI 补齐葡萄牙语（pt-BR）支持。

## 5. Bug 与稳定性
按严重程度及风险评估排序，今日暴露的关键缺陷如下：

*   **[P2 / 安全高危] 命令审批防绕过机制失效：**
    Issue [#76218](https://github.com/NousResearch/hermes-agent/issues/76218) 指出，Bash/Zsh 的 ANSI-C 引用（如 `$'\t'`）未被正确解码，导致 `rm -rf /` 等灾难性命令可以绕过硬性审批底线。**（暂无直接 Fix PR，需紧急关注）**
*   **[P2 / 安全边界] 凭证池存在并发竞态：**
    Issue [#8040](https://github.com/NousResearch/hermes-agent/issues/8040) 揭示了由于使用进程本地锁，多进程（CLI、网关、Agent）并发读写同一 JSON 凭证文件会导致 TOCTOU 竞态条件。
*   **[P2 / 性能] Desktop 首次加载严重卡顿：**
    Issue [#72589](https://github.com/NousResearch/hermes-agent/issues/72589) 报告 Desktop 后端首次调用 `/api/status` 时会阻塞 20-60 秒，原因是强行同步导入了飞书等所有平台适配器。（**关联修复：** PR [#77081](https://github.com/NousResearch/hermes-agent/pull/77081) 已将其移至工作线程）。
*   **[P2 / 兼容性] DeepSeek Provider 自定义端点损坏：**
    Issue [#17199](https://github.com/NousResearch/hermes-agent/issues/17199) 指出模型名称的强制归一化和 `base_url` 覆盖逻辑破坏了如火山引擎 ARK 等自定义 OpenAI 兼容端点的可用性。

## 6. 功能请求与路线图信号
从 Issues 和活跃 PRs 中，我们可以清晰看到 Hermes Agent 下一阶段的演进路线图：
*   **知识图谱与语义上下面层：** PR [#77084](https://github.com/NousResearch/hermes-agent/pull/77084) 引入了可选的本体上下文层 MCP 技能，表明项目正在探索将传统 RAG 升级为结合知识图谱与业务规则引擎的高级上下文架构。
*   **无状态 MCP 协议迁移：** Issue [#69931](https://github.com/NousResearch/hermes-agent/issues/69931) 正在跟踪将于 2026-07-28 发布的 MCP 规范候选版本（2026-07-28 stateless migration），项目正在准备向 `mcp==2.0.0b2` 升级。
*   **会话连续性与记忆管理：** 用户对上下文断连感到困扰（Issue [#31371](https://github.com/NousResearch/hermes-agent/issues/31371) 请求在自动重置后进行紧凑的会话交接）。PR [#77082](https://github.com/NousResearch/hermes-agent/pull/77082) 已经着手在桌面端将 Memory 和 Context 设置解耦，提供更细粒度的记忆预算控制。

## 7. 用户反馈摘要
通过提炼 Issue 评论区，真实用户的痛点主要集中在以下场景：
1.  **“配置文件切换”是重灾区：** 许多进阶用户在使用多 Profile（如区分工作/个人环境）时，遭遇了 SSH 路径失效（[#69551](https://github.com/NousResearch/hermes-agent/issues/69551)）、旧网关无法关闭（[#75598](https://github.com/NousResearch/hermes-agent/issues/75598)）、以及项目工作目录回落到 Home 目录（[#65274](https://github.com/NousResearch/hermes-agent/issues/65274)）等问题。用户迫切希望多环境隔离能更加健壮。
2.  **终端交互的细节摩擦：** 日文/中文输入法的预编辑文本与占位符错位（[#75960](https://github.com/NousResearch/hermes-agent/issues/75960)），以及 macOS

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*