# OpenClaw 生态日报 2026-06-28

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-06-28 04:54 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

**OpenClaw 项目动态日报 — 2026年6月28日**

### 1. 今日速览
今日 OpenClaw 项目保持了极高的社区热度与开发活跃度，过去 24 小时内共有 500 条 Issue 更新（486 条活跃/新开）和 500 条 PR 更新。虽然单日无新版本发布，且合并/关闭的 PR（60条）相对待处理积压（440条）比例较低，但社区在多渠道接入（飞书、WhatsApp、Telegram）、内存架构重构（SQLite 化）以及上下文状态管理方面的贡献依然强劲。当前项目正处于架构优化与深度 Bug 修复的阵痛期，尤其是 Gateway 内存泄漏和多智能体上下文污染问题成为全场关注焦点。

### 2. 版本发布
**本日无新版本发布。**

### 3. 项目进展
今日共有 60 个 PR 被合并或关闭，项目在**消息分发鲁棒性、多渠道适配和底层存储架构**上取得了重要进展：
*   **底层架构大重构：** PR [#96625](https://github.com/openclaw/openclaw/pull/96625) 推进了将会话和记录底层的存储引擎全面切换至 SQLite 的重构工作，这将极大改善 JSONL 无限增长导致的性能瓶颈。
*   **自动化基建：** PR [#68936](https://github.com/openclaw/openclaw/pull/68936) 引入了 PR 审查自动修复流水线和 Windows 守护进程，大幅提升未来开源协作的维护效率。
*   **渠道与消息分发修复：** 合并了修复 iMessage 远程媒体暂存的 PR [#91803](https://github.com/openclaw/openclaw/pull/91803)；多个针对飞书、WhatsApp 管理员控制、Telegram 题消息分发防吞的修复也推进到了待合并状态。

### 4. 社区热点
今日讨论最热烈的问题集中在**系统资源极限与复杂上下文处理**：
*   ** 🔴 Gateway 严重内存泄漏引发 OOM（最高热度）：** Issue [#91588](https://github.com/openclaw/openclaw/issues/91588) 报告 Gateway 内存从 350MB 暴增至 15.5GB 导致崩溃。结合早前的 [#54155](https://github.com/openclaw/openclaw/issues/54155)，反映出系统在长期运行下的会话快照与内存清理存在严重漏洞。
*   ** 🤡 离谱的硬编码路径：** Issue [#51429](https://github.com/openclaw/openclaw/issues/51429) 爆出有开发者将个人的本地路径（`/Users/wangtao`）硬编码入正式发布版，引发了中文社区的激烈吐槽，暴露出 CI/CD 审查环节的疏漏。
*   ** 🧠 深度思考模型流式中断：** Issue [#68596](https://github.com/openclaw/openclaw/issues/68596) 提出在使用 DeepSeek-R1 等高推理耗时模型时，30秒的看门狗阈值会误杀正常思考进程，呼吁提供可配置阈值。
*   ** 🤐 智能体“画大饼”：** Issue [#58450](https://github.com/openclaw/openclaw/issues/58450) 指出智能体会输出“我稍后会去检查并回复”的客套话，但实际上并未触发任何后台动作，引发用户体验危机。

### 5. Bug 与稳定性
按严重程度排列当前最亟需解决的系统缺陷：
*   ** [P0] Gateway 内存泄漏 / 堆内存不释放：** Issue [#91588](https://github.com/openclaw/openclaw/issues/91588) 和 Issue [#95915](https://github.com/openclaw/openclaw/issues/95915) 。暂无完全对口的修复 PR  merged，极度消耗系统资源。
*   ** [P1] 编程智能体陷入“空转”回归：** Issue [#62505](https://github.com/openclaw/openclaw/issues/62505) 指出原本能正常干活的编程 Agent 现在只会不停输出模糊的状态更新和道歉，完全不执行操作。（已有相关 PR #68986 尝试修复输出泄漏，但核心空转仍在排查）。
*   ** [P1] 上下文溢出恢复机制导致数据重复：** Issue [#66443](https://github.com/openclaw/openclaw/issues/66443) 和 [#63216](https://github.com/openclaw/openclaw/issues/63216) 显示，系统在处理上下文超限重置时，会重复注入 `role=user` 消息或陷入硬重试死循环。
*   ** [P1] 多渠道消息丢失/被吞：** Issue [#64810](https://github.com/openclaw/openclaw/issues/64810) 报告心跳异步事件会打断并“吞掉” Telegram 正在生成的回复；Issue [#58514](https://github.com/openclaw/openclaw/issues/58514) 指出 Google Chat 群消息被静默忽略。

### 6. 功能请求与路线图信号
结合 Issue 需求与当前 PR 进展，以下方向极有可能被纳入下一阶段的核心路线图：
*   **细粒度多智能体隔离：** Issue [#63829](https://github.com/openclaw/openclaw/issues/63829)（+9 👍）请求支持每个 Agent 独立的 memory-wiki 保管库；Issue [#65374](https://github.com/openclaw/openclaw/issues/65374) 报告内置的“ dreaming ”系统跨智能体污染了身份。这指明 OpenClaw 需要从全局共享向“按需隔离”的架构演进。
*   **敏感数据安全与脱敏：** Issue [#64046](https://github.com/openclaw/openclaw/issues/64046) 强烈要求对配置文件中的明文 APIKey、Token 以及 UI 展示进行脱敏处理。
*   **引导上下文（Bootstrap）分层加载：** Issue [#67419](https://github.com/openclaw/openclaw/issues/67419) 指出每次对话重注入大量 Bootstrap 文件导致 30% Token 浪费。PR [#22439](https://github.com/openclaw/openclaw/pull/22439) 已经提出分层级加载方案，有望很快落地。

### 7. 用户反馈摘要
从海量 Issue 中提炼出用户的真实痛点与使用画像：
*   **痛点 1：长对话极度脆弱。** 用户非常喜欢将其用于长周期的编程辅助或持续陪伴，但一旦遭遇上下文压缩或跨天重置，极易遭遇“失忆”甚至死循环崩溃，引发强烈挫败感。
*   **痛点 2：IM 平台接入“看起来很美”。** 大量用户试图将 OpenClaw 挂载到 Telegram、Discord、WhatsApp 作为个人助理，但提及门控、频道回复目标漂移等问题导致“发不出消息”或“回复错位”。
*   **满意点：极强的可扩展性。** 尽管有 Bug，社区依然踊跃提交针对各种 LLM 和 IM 渠道的适配 PR，证明 OpenClaw 作为“个人 AI 中枢”的市场定位极具吸引力。

### 8. 待处理积压
以下高价值、高影响的 Issue/PR 长期处于“待决策”或“需人工介入”状态，需 maintainer 团队优先分配资源：
*   **跨渠道重复/丢失追溯：** Issue [#69208](https://github.com/openclaw/openclaw/issues/69208) 作为追踪各种渠道消息重复发送/丢失的 Umbrella Issue，目前评论多但推进缓慢，需要产品层面的顶层架构重构。
*   **安全漏洞积压：** Issue [#65624](https://github.com/openclaw/openclaw/issues/65624) 报告 Mattermost 的 slash 命令默认使用明文回调 URL，可能暴露可重用命令 Token（CVSS 评分高达 8.6），急需合并修复。
*   **Safeguard 压缩配置失效：** Issue [#57901](https://github.com/openclaw/openclaw/issues/57901) 报告核心的上下文压缩模块忽略了用户自定义的 cheaper 模型，强制使用会话主模型，导致用户成本飙升，目前虽有 `linked-pr-open` 但仍未合并。

---

## 横向生态对比

以下是为您生成的 2026 年 6 月 28 日个人 AI 助手与智能体开源生态横向对比分析报告。

### 1. 生态全景
2026 年中，个人 AI 助手与自主智能体开源生态正处于**从“功能横向扩展”向“底层架构重构与深度可用性”过渡的阵痛期与爆发期**。
当前，核心项目在多渠道接入（IM 与桌面端）和工作流编排上已具备高度雏形，但**长程记忆持久化（OOM、上下文断链）与系统级鲁棒性**成为了制约其走向大规模生产环境的核心瓶颈。
同时，开发者对 AI 助手的诉求已从单纯的“对话接口测试”，演变为对**跨端协同、多模型动态路由、以及前端无障碍体验（UX）**的深度要求。

---

### 2. 各项目活跃度对比
*注：健康度评估综合考量了积压问题严重性、CI/CD 把关能力及 Bug 影响范围。*

| 项目名称 | Issues 动态 | PRs 动态 | PR 处理量 | Release | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 条 (486活跃) | 500 条 | 60 条合并/关闭 | 无 (0) | 🔴 **承压警告**：积压达 440+，存在 P0 级内存泄漏与严重 CI 漏洞，处于底层重构阵痛期。 |
| **Hermes Agent**| 375 条 | 500 条 | 195 条合并/关闭 | 无 (0) | 🟢 **稳健收敛**：PR 吞吐量大，正集中清扫跨平台 Bug 并进行代码冻结，处于质量巩固与稳定期。 |

---

### 3. OpenClaw 在生态中的定位
与侧重于全平台桌面端体验的 Hermes Agent 相比，**OpenClaw 的核心定位是“以 IM 平台为超级入口的个人 AI 中枢”**。
*   **优势与护城河：** OpenClaw 具备极强的生态吸附力，社区踊跃提交覆盖 iMessage、飞书、WhatsApp、Telegram 等全维度的适配 PR。它致力于让重度用户将 AI 无缝挂载于日常高频社交工具上。
*   **技术路线差异：** 面对记忆问题，OpenClaw 正试图进行底层引擎的大换血（从 JSONL 全面向 SQLite 化重构），并探索细粒度的多智能体隔离架构。
*   **社区规模与状态：** OpenClaw 社区呈现极高的热度与庞大的吞吐量，但当前受制于工程化审查（如出现硬编码本地路径的低级失误）和严重的积压问题，亟需提升 Maintainer 团队的梳理能力与自动化基建水平。

---

### 4. 共同关注的技术方向
深度挖掘双项目的痛点与 Feature Request，以下技术领域正成为 AI 智能体生态的共同演进方向：

1.  **长程记忆的持久化与降本（涉及项目：OpenClaw, Hermes Agent）**
    *   两项目均在向 **SQLite 及其 FTS 全文检索**靠拢，以取代低效的文件流存储。
    *   **上下文压缩机制的精细化**：OpenClaw 呼吁压缩模块支持降级到 Cheaper 模型以控制成本，并解决重置导致的数据重复；Hermes 则刚修复了上下文压缩导致的长对话断链。
2.  **IM/通讯网关的高可用性（涉及项目：OpenClaw, Hermes Agent）**
    *   异步长耗时任务与网关的冲突是通病。OpenClaw 遭遇心跳事件“吞没” Telegram 回复，Hermes 遭遇 WhatsApp 群消息路由错误。构建支持**内联交互**和**自定义前缀**的高容错网关是共识。
3.  **智能体自主模型路由（涉及项目：OpenClaw, Hermes Agent）**
    *   告别单一模型打天下。用户强烈要求将“模型切换”暴露为 Agent 的原生 Tool，让系统根据任务复杂度（如简单对话 vs 深度编程思考）自主在 GPT-4、Claude、DeepSeek-R1 间动态切换。

---

### 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
| :--- | :--- | :--- |
| **核心终端** | **IM 群组与个人社交流**（Telegram, 飞书, Discord） | **桌面端工作站与 CLI**（Linux/Win/Mac Desktop, TUI） |
| **主要受众** | 极客玩家、社群运营者、个人生活助理需求者 | 重度开发者、自动化工作流构建者、多设备办公群体 |
| **痛点与诉求** | 长周期陪伴下的跨天失忆、敏感数据脱敏、多渠道消息防丢防吞。 | 跨设备配置同步、前端 UI 无障碍体验、本地凭证池管理。 |
| **底层焦点** | 全局/局部记忆隔离，解决网关严重 OOM 与硬重试死循环。 | 突破单节点互斥，支持本地/远端多后端同时接入，修补 FTS 索引裂脑。 |

---

### 6. 社区热度与成熟度分层
*   **🚀 快速迭代与扩张期：OpenClaw**
    *   **特征：** 社区具有极强的活力，提交了大量针对新兴 LLM 和小众 IM 渠道的 PR。但系统在复杂的高频调用下触发了架构天花板（P0 级 Gateway 泄漏、Agent 陷入空转画大饼）。目前正处于“边开飞机边换引擎”的高风险重构阶段。
*   **🛠️ 质量收敛与巩固期：Hermes Agent**
    *   **特征：** 凭借高达 195 个合并/关闭的 PR，展现出核心团队极强的执行力与工程化兜底能力。社区反馈的重心已从“能否运行”转移到“好不好用”（如仪表盘对比度、VoiceOver 适配），标志着项目正迅速走向成熟，即将迎来重要的 Patch/Minor 发版。

---

### 7. 值得关注的趋势信号（开发者行动指南）
1.  **“画大饼”危机要求重构 Action Loop：** OpenClaw 暴露的 AI“只会说稍后去办，却不执行任何 Tool”问题（#58450），是当前业界 ReAct 范式的大隐患。**信号：** 智能体不能仅做“意图生成”，必须强化执行校验闭环。
2.  **深度思考模型对传统网关的冲击：** 30秒看门狗阈值误杀 DeepSeek-R1（OpenClaw #68596）。**信号：** 在 o1/R1 类推理模型普及的今天，AI 系统的全局超时机制、心跳维持策略必须重新设计，支持可配置阈值是刚需。
3.  **前端 UX 成为 Agent 落地的生死线：** Hermes 社区高度

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

以下是 2026-06-28 Hermes Agent 项目动态日报。作为开源项目分析师，基于过去 24 小时的各项数据流，为您梳理项目的最新进展与健康度。

---

### 1. 今日速览
今日 Hermes Agent 维持了极高的社区与开发活跃度，过去 24 小时内共有 375 条 Issue 更新与 500 条 PR 更新。项目当前的焦点呈现出明显的**“双轨并行”**特征：一方面，核心团队与社区贡献者正在集中精力**清扫多平台（尤其是 Windows 和 Linux 桌面端）的桌面级 Bug 与体验痛点**；另一方面，针对底层的**状态管理、会话连续性以及多模型/多网关路由**进行了深度的重构与修复。今日无新版本发布，项目正处于大量代码合并后的稳定与观察期。

### 2. 版本发布
**本日无新版本发布（0 个）。** 考虑到今日有大量针对 Desktop、CLI 和 Gateway 的 Bug 修复 PR 被合并，推测项目正在为下一次的 Patch 或 Minor 版本更新做代码冻结和测试准备。

### 3. 项目进展
今日共有 195 个 PR 被合并或关闭，项目整体在系统健壮性和多平台兼容性上迈出了一大步：
*   **桌面端体验大幅修复**：修复了长期困扰 Linux 用户的窗口控制按钮丢失问题 ([PR #53989](https://github.com/NousResearch/hermes-agent/pull/53989))，并为受限的 Linux 主机添加了 `--no-sandbox` 降级策略 ([PR #53990](https://github.com/NousResearch/hermes-agent/pull/53990))，同时引入了配置驱动的 Electron 启动参数 ([PR #53991](https://github.com/NousResearch/hermes-agent/pull/53991))。
*   **流式响应与会话状态修复**：修复了流式响应中断导致 Gateway 吞掉部分消息的静默错误 ([PR #53987](https://github.com/NousResearch/hermes-agent/pull/53987))，并解决了上下文压缩导致长对话断链的严重问题 ([PR #53992](https://github.com/NousResearch/hermes-agent/pull/53992))。
*   **模型选择器与鉴权优化**：清理了 OpenCode Zen 模型选择器中已废弃的模型，并修复了网关切换模型时的端点残留问题 ([PR #53977](https://github.com/NousResearch/hermes-agent/pull/53977), [PR #51488](https://github.com/NousResearch/hermes-agent/pull/51488))。纠正了误导用户的认证 CLI 提示 ([PR #53929](https://github.com/NousResearch/hermes-agent/pull/53929))。

### 4. 社区热点
今日社区讨论最为热烈的话题集中在**UI/UX 无障碍性与跨端协同**：
*   **仪表盘主题与无障碍性**：Issue [#18080](https://github.com/NousResearch/hermes-agent/issues/18080) 获得了 44 个赞同和 25 条评论，用户强烈要求改进现有不合理的字体搭配和低对比度主题。同时，针对盲人用户的 VoiceOver 适配请求 ([Issue #26689](https://github.com/NousResearch/hermes-agent/issues/26689)) 也获得了极高关注，表明社区希望 Hermes 不仅能干，而且要“好用”。
*   **跨设备配置云同步**：Issue [#20510](https://github.com/NousResearch/hermes-agent/issues/20510) 斩获 14 个赞，用户强烈需要一种官方的方式来跨 PC 和笔记本同步 `~/.hermes/` 下的 Profiles、Skills 和 Memory。
*   **桌面端同时连接多后端**：Issue [#37876](https://github.com/NousResearch/hermes-agent/issues/37876) 反映了进阶用户的诉求，希望 Desktop 客户端能同时连接本地和远端 Hermes 后端，打破当前互斥的单节点模式。

### 5. Bug 与稳定性
按严重程度排列，今日暴露和处理的系统级风险如下：
*   **[P1 - 状态损坏] 跨会话检索失效**：Cron 任务引发 FTS 索引与 SQLite 数据“裂脑”，导致 `session_search` 彻底失效，AI 丢失短期记忆（[Issue #19434](https://github.com/NousResearch/hermes-agent/issues/19434)，已被关闭/修复）。
*   **[P1 - 桌面端崩溃] Windows 启动断点异常**：Hermes Desktop 在 Win11 上启动即崩溃，报 `0x80000003` 底层异常（[Issue #38216](https://github.com/NousResearch/hermes-agent/issues/38216)）。
*   **[P2 - 网关与通讯] Telegram/WhatsApp 投递缺陷**：Telegram 发送文件假成功（[Issue #13356](https://github.com/NousResearch/hermes-agent/issues/13356) 已关闭），以及 WhatsApp 的 `send_message` 忽略群组目标、错误路由至主页（[Issue #18646](https://github.com/NousResearch/hermes-agent/issues/18646)）。
*   **[P2 - 桌面端编译/安装]**：Windows 路径带空格导致安装失败（[Issue #43334](https://github.com/NousResearch/hermes-agent/issues/43334)），以及 macOS/Windows 编译 Electron 失败（[Issue #40187](https://github.com/NousResearch/hermes-agent/issues/40187)）。

### 6. 功能请求与路线图信号
从 Issue 动态来看，以下几个功能具有很强的现实需求，且部分已有技术雏形，有望纳入近期路线图：
1.  **自主模型路由**：用户希望将 `model_switch` 暴露为 Agent 可调用的 Tool，让 Agent 根据任务复杂度（如 Simple vs Complex 编码）自主在 GPT-4 / Claude / Gemini 间切换路由（[Issue #16525](https://github.com/NousResearch/hermes-agent/issues/16525)）。
2.  **消息平台内联交互**：要求为 Telegram、Slack 等提供统一的 Inline Keyboard / Action Buttons 支持，免去硬编码（[Issue #15311](https://github.com/NousResearch/hermes-agent/issues/15311)）。今日合并的 Feishu 审批卡片点击状态修复 ([PR #53981](https://github.com/NousResearch/hermes-agent/pull/53981)) 证明了团队正在完善这一体系。
3.  **网关前缀自定义**：因 Matrix/Mattermost 等平台原生占用了 `/`，用户请求支持自定义 Gateway 触发前缀（[Issue #12688](https://github.com/NousResearch/hermes-agent/issues/12688)）。

### 7. 用户反馈摘要
从评论区和 Bug 报告中提炼出用户的真实体感：
*   **痛点 - 前端体验配不上后端能力**：正如一位视障开发者所言（#26689），Hermes 拥有“极其强大的后端和 agent 生态”，但 TUI 和 Dashboard 的前端表现（如 React Minified Error #301 导致白屏 [Issue #36658](https://github.com/NousResearch/hermes-agent/issues/36658)）严重拖了后腿。
*   **痛点 - 凭证与多 Profile 管理**：多 Profile 场景下的定时任务路径错乱（[Issue #4707](https://github.com/NousResearch/hermes-agent/issues/4707)）、Codex 凭证池覆盖等问题，对重度自动化用户造成了干扰。
*   **满意点 - 工作流集成**：用户正在深度将 Hermes 嵌入飞书、Telegram、VS Code (Codex) 中作为私人体检助手与日报机器人，对 MCP 工具（如 Todoist）的接入期待很高（[Issue #38945](https://github.com/NousResearch/hermes-agent/issues/38945)）。

### 8. 待处理积压
以下高价值 Issue 仍然处于 Open 状态且历经多日未彻底解决，建议核心维护者优先关注：
*   **[Issue #15895](https://github.com/NousResearch/hermes-agent/issues/15895)**：使用 Gemini CLI OAuth 请求时明明有配额却持续触发 HTTP 429 错误，阻碍了免费/订阅型大模型用户的接入。
*   **[Issue #29912](https://github.com/NousResearch/hermes-agent/issues/29912)**：系统的 Curator 在合并时存在“失败即放行”的鲁莽行为，可能会将正在运行的关键 Skills 静默归档，存在极高的生产环境隐患。
*   **[Issue #35166](https://github.com/NousResearch/hermes-agent/issues/35166)**：在 Ubuntu 上安装时卡死在 Playwright Chromium 下载环节，且无法 `Ctrl+C` 中断，极大伤害了新用户的首次上手体验。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*