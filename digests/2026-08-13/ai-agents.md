# OpenClaw 生态日报 2026-08-13

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-08-12 21:01 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

Here is the project daily report for OpenClaw based on the GitHub data from 2026-08-13.

---

# 📊 OpenClaw 项目动态日报 (2026-08-13)

## 1. 今日速览
OpenClaw 在过去 24 小时内展现了**极高的开源社区活跃度与工程迭代速度**。项目处理了高达 500 条 Issues 更新（307 活跃/193 关闭）与 500 条 PR 更新（287 待合并/213 合并或关闭），显示出维护团队（特别是 `@steipete`、`@licheer-zte` 等核心成员）及自动化机器人系统的高效运转。今日虽无新版本发布，但焦点集中在**多智能体编排的健壮性、内存/上下文压缩的安全性，以及消息通道（Slack/Telegram/飞书）的防泄漏与稳定性修复**上。项目当前正处于深度架构优化与边缘场景收敛的阶段。

## 2. 版本发布
**今日无新版本发布 (0 个 Releases)。** 
*注：项目当前正通过大量针对 `session-state` 和 `compatibility` 的修复 PR 积累变更，预计近期会有新的 Patch 或 Minor 版本迭代。*

## 3. 项目进展
今日项目整体向前推进显著，特别是在**削减技术债务、增强 Gateway 稳定性及完善测试覆盖率**方面取得了重要进展。共计 213 个 PR 被合并或关闭，核心亮点包括：
*   **架构与状态管理优化**：PR [#122176](https://github.com/openclaw/openclaw/pull/122176) 正式退役了遗留的 `commitments` 数据库架构，清理了冗余的共享状态表；PR [#114388](https://github.com/openclaw/openclaw/pull/114388) 重构了多智能体所有权判定逻辑，移除了隐式的 `default: true` 标记，强制多 Agent 场景下显式声明 Owner，极大降低了路由歧义。
*   **网关与频道修复**：PR [#119576](https://github.com/openclaw/openclaw/pull/119576) 修复了配置回滚仍触发 Gateway 重启的问题；PR [#122810](https://github.com/openclaw/openclaw/pull/122810) 为 Codex 后向移植了非官方市场插件的安全授权修复。
*   **开发与测试体验**：PR [#122803](https://github.com/openclaw/openclaw/pull/122803) 与 [#122789](https://github.com/openclaw/openclaw/pull/122789) 精简了 Control UI 与 Gateway 的测试套件，移除了冗余的测试 Mock，提升了 CI 运行效率。

## 4. 社区热点
今日讨论最为激烈的 Issue 集中在**Agent 运行时的"静默失败"（Silent Failures）以及跨频道 UX 摩擦**：
*   🔥 **[Issue #121058](https://github.com/openclaw/openclaw/issues/121058) (评论: 86)**：静默回复失败复发。即使之前的 #116277 被关闭，监控定时任务依然持续捕获到无队列负载的回复失败。**背后诉求**：用户极度苦于 Agent "偶发失忆/失联"，强烈要求维护者提供根本的根因分析，而不是仅通过单点修补来关闭 Issue。
*   🔥 **[Issue #116201](https://github.com/openclaw/openclaw/issues/116201) (评论: 65)**：实时语音会话保留无界状态。**背后诉求**：在慢速或突发网络下，未清除的音频帧和咨询状态导致严重的内存膨胀与延迟。
*   🔥 **[Issue #25592](https://github.com/openclaw/openclaw/issues/25592) (评论: 47)**：工具调用间的文本泄露到消息渠道。**背后诉求**：Agent 的内心独白/报错信息直接发到了 Slack/iMessage 里，严重影响了生产环境部署的专业性，用户强烈要求分离 Agent 的"思考过程"与"对外输出"。

## 5. Bug 与稳定性
今日报告的严重 Bug 主要涉及内存泄漏、会话状态卡死以及跨端通信阻断：

*   **P0 级 (致命)**:
    *   **[Issue #91588](https://github.com/openclaw/openclaw/issues/91588)**: Gateway 严重内存泄漏，RSS 从 350MB 暴涨至 15.5GB 导致频繁 OOM 崩溃。*(状态: 等待复现，暂无 Fix PR)*
*   **P1 级 (严重)**:
    *   **[Issue #97616](https://github.com/openclaw/openclaw/issues/97616)**: Zombie 进程累积。Hook/Tool 执行后子进程未被回收，导致运行时性能衰退。*(状态: 等待 Review)*
    *   **[Issue #114234](https://github.com/openclaw/openclaw/issues/114234)**: 容器环境下 Usage-cost 刷新锁因 PID 复用导致永久死锁，缓存直接冻结。*(状态: 有关联 PR #122795 处理中)*
    *   **[Issue #103231](https://github.com/openclaw/openclaw/issues/103231)**: `claude-cli` 后端误报拥有原生压缩能力，导致上下文超过 200% 无限膨胀且恢复路径静默失败。*(状态: 等待产品决策)*
    *   **[Issue #101814](https://github.com/openclaw/openclaw/issues/101814)**: 更新至 2026.6.11 后，所有频道进入死寂状态（一问一答后永久沉默）。*(状态: 等待信息)*

## 6. 功能请求与路线图信号
结合 Issue 与 PR，可以看出 OpenClaw 正在向**企业级安全、精细化成本控制**方向演进：
*   **企业级安全管控**：[Issue #45031](https://github.com/openclaw/openclaw/issues/45031) 请求在 Skill 安装时内置安全扫描（引用了 Snyk 报告称 36% 的 Agent 技能存在漏洞），以及 [PR #119702](https://github.com/openclaw/openclaw/pull/119702) 增强正则表达式编译安全，表明项目正在加固第三方插件的防御边界。
*   **成本与预算控制**：[Issue #42475](https://github.com/openclaw/openclaw/issues/42475) 要求在 Gateway 层面强制执行针对单个 Agent 的每日/每月费用上限，防止失控消费。这是企业部署多 Agent 的核心痛点。
*   **模型与多模态扩展**：[PR #122762](https://github.com/openclaw/openclaw/pull/122762) 迅速适配了 xAI 的 Grok 4.6 模型目录；[Issue #71195](https://github.com/openclaw/openclaw/issues/71195) 提出为 macOS Talk Mode 引入 OpenAI Realtime 语音到语音路径，以实现亚秒级延迟。

## 7. 用户反馈摘要
通过对 Issue 评论的情感与技术分析，提炼出当前用户的三大核心反馈：
1.  **痛点：静默失败是最坏体验**：无论是子 Agent 完成超时（[#44925](https://github.com/openclaw/openclaw/issues/44925)）、定时任务执行中断，还是频道消息发不出，用户最无法接受的是**无报错、无重试、无通知**的静默卡死。
2.  **场景：多 Agent 场景下的资源隔离需求急迫**：用户在长时运行的 Discord/Telegram 中部署多 Agent 时，遭遇了严重的上下文交叉、JSONL 日志膨胀（[#111857](https://github.com/openclaw/openclaw/issues/111857)）和内存争抢问题。
3.  **满意度：插件生态丰富但兼容性脆弱**：用户喜欢高度可定制的插件（如 memory-wiki, emotion-governor），但核心大版本升级时，插件版本漂移（[#83337](https://github.com/openclaw/openclaw/issues/83337)）和底层 Schema 变更经常导致破坏性的回归。

## 8. 待处理积压
以下高影响力且长期未彻底解决的问题需维护者重点介入：
*   **[Issue #25592](https://github.com/openclaw/openclaw/issues/25592) (存在 5 个月，47 评论)**：工具调用文本泄露到信使渠道的 UX 灾难。标签显示 `needs-product-decision`，需尽快敲定底层消息路由的隔离机制。
*   **[Issue #44925](https://github.com/openclaw/openclaw/issues/44925) (存在 5 个月，26 评论)**：子 Agent 任务结果静默丢失。涉及复杂的 E31/E42 错误模式，严重打击编排可用性。
*   **[PR #114388](https://github.com/openclaw/openclaw/pull/114388) (等待 2 周，XL 规模)**：多 Agent 显式所有权重构。该 PR 可能会阻断后续许多兼容性修复，急需推进 Reviewer 进行合并或打回重写。
*   **[Issue #50199](https://github.com/openclaw/openclaw/issues/50199) (存在 5 个月)**：Skill 优先级配置。用户苦于 Agent 在多个相似技能中选错，急需一套优先级调度策略。

---

## 横向生态对比

以下是为您生成的针对 OpenClaw 与 Hermes Agent 的横向对比分析报告。

---

# 📊 AI 智能体开源生态横向对比与趋势分析报告 (2026-08-13)

## 1. 生态全景
2026年中，个人 AI 助手与自主智能体开源生态正经历从“单体功能验证”向“企业级高可用与多智能体编排”的深度跨越。当前生态的核心驱动力已从单纯的模型能力接入，转向对**上下文/内存管理的安全性、多智能体资源隔离以及工程级稳定性（如消除静默失败与内存泄漏）**的攻坚。此外，随着智能体在生产环境落地，**Token 成本控制与企业级安全合规（审批流、防泄漏）**正成为开源项目架构演进的新主导力量。

## 2. 各项目活跃度对比
两个项目今日均表现出极高的社区热情与工程吞吐量，处于重度迭代状态。

| 项目 | Issues 动态 | PR 动态 | Release | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 条 (307 活跃 / 193 关闭)<br>关闭率：38.6% | 500 条 (287 待合并 / 213 合并)<br>合并率：42.6% | 0 | **良好，处于质量收敛期**。修复大量底层 Bug，P0/P1 级缺陷有明确跟进，CI 测试覆盖率正在提升。 |
| **Hermes Agent** | 432 条 (347 活跃 / 85 关闭)<br>关闭率：19.6% | 500 条 (408 待合并 / 92 合并)<br>合并率：18.4% | 0 | **高活跃，处于架构重构期**。PR 积压严重，核心精力聚焦于偿还技术债务和底层架构拆解。 |

## 3. OpenClaw 在生态中的定位
OpenClaw 在当前的 AI 智能体生态中扮演着**“企业级多渠道智能体网关”**的核心角色。
*   **相比优势**：OpenClaw 具备极强的多渠道集成能力（Slack/iMessage/飞书等），且在生态中率先布局了企业级痛点——**成本管控（单 Agent 预算上限）与安全防御（Skill 安装扫描）**。其高质量关闭的 PR（213个）表明其在网关稳定性和测试体验上具有扎实工程输出。
*   **技术路线差异**：不同于偏向开发者 CLI 或单机桌面端的工具，OpenClaw 采用中心化 Gateway 架构，高度关注消息路由的安全隔离与多租户资源调度。
*   **社区规模对比**：虽然两个项目今日的数据量级相当（均为 400+ 的 Issue/PR 活跃度），但 OpenClaw 处理的已合并 PR（213个）远超 Hermes Agent（92个），说明 OpenClaw 的核心维护团队具有更强的工程收敛能力和明确的版本控制节奏。

## 4. 共同关注的技术方向
横向分析发现，两个项目在技术演进上呈现高度共振，以下痛点代表了当前 AI 智能体行业的共性挑战：
*   **长会话与上下文压缩机制（OpenClaw, Hermes Agent）**：两者都在致力解决长时运行带来的上下文膨胀。OpenClaw 正在修复因压缩导致的“死锁/静默失败”，而 Hermes 则在重构超大摘要的拒绝机制与 Token 截断计算。
*   **多智能体协同与资源隔离（OpenClaw, Hermes Agent）**：OpenClaw 通过重构多 Agent 所有权判定逻辑解决路由争抢；Hermes 则在为跨会话搜索、跨租户隔离和多 Agent CLI 编排（ACP 协议）打基础。
*   **工具链路与 Token 成本优化（OpenClaw, Hermes Agent）**：Hermes 社区爆发了严重的“Token 成本焦虑”（73% 为固定开销），呼吁两阶段工具加载；OpenClaw 则从安全防范角度，呼吁在 Skill 加载时进行漏洞扫描，两者都在反思当前“庞大且脆弱”的插件/工具架构。

## 5. 差异化定位分析
| 维度 | OpenClaw | Hermes Agent |
| :--- | :--- | :--- |
| **核心定位** | 面向生产环境的企业级多渠道通信网关 | 面向开发者的元智能体控制中心与 CLI/TUI 工具 |
| **功能侧重** | 跨平台消息防泄漏、成本预算控制、Gateway 高可用。 | 可插拔审批流、桌面端可视化面板、跨模型编排（如控制 Claude/Cursor）。 |
| **目标用户** | 需要将 Agent 接入企业通讯软件（飞书/Slack等）的 ToB 团队。 | 在本地进行重度开发、需要精细化控制 Token 与 Agent 生命周期的极客/研发者。 |
| **架构痛点** | 网关内存泄漏 (OOM)、频道静默失败、跨频道 UX 摩擦。 | 历史技术债（“上帝文件”单体架构）、Windows 平台兼容性差、并发内存压力。 |

## 6. 社区热度与成熟度
*   **快速演进与底层重构阶段：`Hermes Agent`**
    *   该项目当前承载着巨大的转型压力。关闭仅 85 个 Issue 却有 347 个活跃，以及 408 个待合并的 PR，表明社区有海量新想法涌入，但核心团队的 Review 能力遭遇瓶颈。近期完成的史诗级架构拆解表明它正在快速蜕变，但距离稳定态仍有距离。
*   **质量巩固与边缘场景收敛阶段：`OpenClaw`**
    *   OpenClaw 的数据表现更为成熟。它今天成功合并了 213 个 PR，且重点均在于“削减技术债务、增强 Gateway 稳定性及完善测试覆盖率”。它正面临严峻的 P0/P1 级稳定性考验（如 15.5GB 的 OOM 和死锁），正处于解决生产级灾难的防御性编程阶段。

## 7. 值得关注的趋势信号
对于 AI 智能体领域的开发者与技术决策者，今日的动态释放了三个极其重要的行业信号：

1.  **“静默失败”是当前 Agent 体验的头号杀手**：OpenClaw 社区对“静默回复失败”和“任务结果静默丢失”反应极其强烈。在复杂的工具调用和子 Agent 编排中，**缺乏可观测性的失败比报错本身更致命**。构建 Fail-closed 机制和完善的错误广播通道迫在眉睫。
2.  **工具调用的“Token 脱敏”与“延迟加载”将成为刚需**：Hermes 社区实测暴露出，静态注入数十个工具 Schema 会浪费超过 70% 的无意义 Token。未来，**基于意图识别的两阶段工具加载（Tool on Demand）**、以及类似 OpenClaw 正在做的**“思考过程与对外输出的物理隔离”**，将成为开源框架的标配。
3.  **企业级管控（预算与审批）正在下沉至开源底座**：不再是企业闭源软件的专属，OpenClaw（单 Agent 每日/每月费用上限阻断）和 Hermes（统一 ApprovalTransport 接口）均在底层架构上引入了人工审批干预（HITL）和预算拦截机制。这意味着 2026 年的 Agent 框架默认假设是**“不可完全信任的模型”**，必须自带刹车系统。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

以下是 `NousResearch/hermes-agent` 项目 2026-08-13 的开发与社区动态日报。本报告基于过去 24 小时的 GitHub 数据自动生成。

---

# Hermes Agent 项目动态日报 (2026-08-13)

## 1. 今日速览
Hermes Agent 今日项目活跃度**极高**，在过去 24 小时内共记录了 **432 条 Issue 更新**（347 条新开或活跃，85 条关闭）以及 **500 条 PR 更新**（408 条待合并，92 条已合并或关闭）。今日项目核心主线集中在**底层架构的大规模重构**（特别是“上帝文件”拆解计划的推进）、**Token 开销优化**以及**多租户/跨会话状态隔离的深度讨论**。开发者 @JoaoMarcos44 贡献了大量核心稳定性修复，显示核心团队正积极为下个大版本收敛 Bug。

## 2. 版本发布
**本日无新版本发布** (0 个 Release)。从 PR 活跃度和聚焦领域（架构重构、i18n 框架引入、安全面板重构）来看，项目正处于面向下一个大版本（预计为 v0.21.0 或类似里程碑）的密集功能迭代与底层强化阶段。

## 3. 项目进展
今日共有 92 个 PR 被合并或关闭，项目在性能、稳定性和架构上取得实质性进展：
*   **架构重构里程碑**：史诗级任务 [Issue #78647](https://github.com/NousResearch/hermes-agent/issues/78647) **"All Gods Must Die"** 今日正式关闭（评论高达 70 条）。这标志着全仓库“上帝文件”（动辄 7000+ 行的单体文件如 `mcp_tool.py` 和 `conversation_loop.py`）已被成功拆解为清晰的模块化架构。
*   **上下文压缩机制大修**：合并了多个关于上下文压缩的修复 PR，如 [PR #84812](https://github.com/NousResearch/hermes-agent/pull/84812)（拒绝超大压缩摘要）和 [PR #84764](https://github.com/NousResearch/hermes-agent/pull/84764)（正确计算工具参数截断的修剪量），显著提升了长会话场景下的内存管理稳健性。
*   **国际化与桌面端体验**：[PR #23243](https://github.com/NousResearch/hermes-agent/pull/23243) 引入了针对 TUI 和 Dashboard 的统一国际化框架；[PR #77263](https://github.com/NousResearch/hermes-agent/pull/77263) 为桌面端引入了用量/成本追踪面板及安全面板。

## 4. 社区热点
今日社区讨论极其热烈，核心诉求集中在**降低使用成本**和**多智能体协同**上：
*   **Token 成本焦虑**：[Issue #4379](https://github.com/NousResearch/hermes-agent/issues/4379) (评论: 22) 和 [Issue #6839](https://github.com/NousResearch/hermes-agent/issues/6839) (评论: 38) 引爆讨论。用户通过监控面板实测指出，每次 API 调用中有 **73%（约 13.9K tokens）是固定开销**，主要用于注入 50+ 个工具的 Schema。社区强烈呼吁实现“两阶段工具注入（延迟加载）”以大幅降低本地模型和 API 调用成本。
*   **插件生命周期标准制定**：核心成员 @teknium1 发起 [Issue #64182](https://github.com/NousResearch/hermes-agent/issues/64182) (评论: 32) 和 [Issue #64231](https://github.com/NousResearch/hermes-agent/issues/64231) (评论: 22)，公开征集社区意见以确立统一的插件生命周期事件目录和 Hook 分类法，旨在清理积压的插件 PR。
*   **多智能体 CLI 编排**：[Issue #5257](https://github.com/NousResearch/hermes-agent/issues/5257) (点赞: 22) 提议泛化 ACP (Agent Client Protocol) 客户端，使 Hermes 能够编排 Claude / Cursor 等外部编码智能体，反映了用户将 Hermes 打造为“元智能体控制中心”的强烈意愿。

## 5. Bug 与稳定性
今日报告并处理了多个关键 Bug，部分已提交修复 PR：
*   **🔴 P1 级 - 桌面端回归问题 (Windows)**：[Issue #83683](https://github.com/NousResearch/hermes-agent/issues/83683) 报告 Windows 桌面端每次重启会强制杀死运行中的网关，导致 WeChat/QQ/Telegram 机器人完全失声。**暂无合并的修复 PR**。
*   **🔴 P1 级 - 多租户密钥泄露**：[Issue #82936](https://github.com/NousResearch/hermes-agent/issues/82936) 指出在开启多配置复用 (`multiplex_profiles`) 时，默认配置的密钥会泄露给二级配置的终端工具。**暂无修复 PR**。
*   **🟠 P2 级 - Windows 绝对路径搜索失效**：[Issue #63177](https://github.com/NousResearch/hermes-agent/issues/63177) 和 [Issue #67629](https://github.com/NousResearch/hermes-agent/issues/67629) 揭示了在原生 Windows 环境下使用 `search_files` 时，绝对路径转换导致的报错问题。
*   **🟢 已修复 - 安全边界与并发控制**：[PR #84811](https://github.com/NousResearch/hermes-agent/pull/84811) 修复了 Dashboard 的 OIDC 退出端点可能通过非 HTTPS 明文发送 refresh token 的严重安全漏洞；[PR #84761](https://github.com/NousResearch/hermes-agent/pull/84761) 使得并发工具工作线程上限变为可配置，缓解了重度工具并发时的内存压力。

## 6. 功能请求与路线图信号
结合用户诉求与官方动作，以下功能极有可能在接下来的版本中落地：
*   **可插拔审批流**：[Issue #64162](https://github.com/NousResearch/hermes-agent/issues/64162) 提出构建 `ApprovalTransport` 接口，配合今日合并的 [PR #83100](https://github.com/NousResearch/hermes-agent/pull/83100)（明确且 Fail-closed 的一次性审批绕过机制），预示着更强大的企业级自动化审批管道正在路上。
*   **持久化跨会话记忆**：[Issue #8457](https://github.com/NousResearch/hermes-agent/issues/8457) 提出带有跨会话搜索和自动压缩的持久化内存机制。结合近期大量对上下文压缩逻辑的底层修复（如 [PR #84753](https://github.com/NousResearch/hermes-agent/pull/84753)），核心团队显然在为真正的长期记忆系统打地基。

## 7. 用户反馈摘要
从 Issues 讨论中提炼出目前用户的三大痛点与反馈：
1.  **“Token 消耗太贵了”**：尤其是接入商用闭源模型（如 GPT-4o, Claude）时，即使不使用任何工具，系统提示词和工具 Schema 也吃掉了大量 Token，用户呼吁**按需加载工具**。
2.  **“Windows 体验不如 Linux”**：路径解析冲突（`D:\` 被转译为 `/d/`）、文件锁定导致的虚拟环境更新失败、桌面端进程管理粗暴等问题频发，Windows 原生支持存在明显短板。
3.  **“长对话容易状态错乱”**：用户反映在进行长任务、多工具循环时，经常会遇到历史记录损坏、自我审查系统将记忆错误分类（[Issue #30220](https://github.com/NousResearch/hermes-agent/issues/30220)）等状态管理痼疾。

## 8. 待处理积压
提醒维护者关注以下高优但长期未彻底解决的积压项：
*   **长期多租户隔离难题**：[Issue #34352](https://github.com/NousResearch/hermes-agent/issues/34352) 提出已 2 个多月，由企业用户提交，指出当前内存操作绕过了 Hook 系统，导致多租户环境必须 Fork 核心代码才能实现隔离，严重阻碍了 ToB 场景的采用。
*   **长任务循环中的压缩死锁**：[Issue #72451](https://github.com/NousResearch/hermes-agent/issues/72451) 指出，在长工具循环中，即使每次压缩都成功，也会耗尽共享的“单次尝试预算

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*