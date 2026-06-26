# OpenClaw 生态日报 2026-06-26

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-06-26 04:42 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

以下是为您生成的 OpenClaw 项目 2026-06-26 动态日报。

### 1. 今日速览
今日 OpenClaw 项目保持了极高的社区热度与开发活跃度，过去 24 小时内共有近 1000 条 Issues 和 PRs 更新（474 个活跃 Issue，423 个待合并 PR）。尽管今日无新版本发布，但底层维护和 Bug 修复工作正在密集进行，共有 77 个 PR 被合并或关闭。从标签和讨论来看，项目目前正处于**“高增长、高摩擦”**的阶段：社区对多渠道接入（Telegram/Feishu等）和记忆系统（RAG）的需求激增，但随之而来的会话状态丢失、网关内存泄漏（OOM）等稳定性问题成为当前最大的痛点。

### 2. 版本发布
* **今日无新版本发布。** (0 releases)
* *注：目前项目存在大量影响网关稳定性的 P0/P1 级别 Bug，预计维护者正在为下一个大版本累积修复 PR。*

### 3. 项目进展
今日共有 77 个 PR 被合并或关闭，重点推进了以下领域的迭代：
* **生态与安全防范落地：** 维护者正在推进针对 ClawHub 插件市场的安全审查机制。[PR #81364](https://github.com/openclaw/openclaw/pull/81364) 引入了在安装社区插件和 Skills 前检查 ClawHub 信任度的机制，拦截恶意发布。
* **多渠道兼容性修复：** [PR #96912](https://github.com/openclaw/openclaw/pull/96912) 修复了 Telegram 隔离入站队列导致网关挂起的问题；[PR #96933](https://github.com/openclaw/openclaw/pull/96933) 修复了飞书多账号覆盖导致顶层 `appSecret` 失效的启动崩溃问题。
* **自动化与测试基建：** [PR #95920](https://github.com/openclaw/openclaw/pull/95920) 为 QA Lab 引入了 Crabline 虚拟 Provider 环境，[PR #68236](https://github.com/openclaw/openclaw/pull/68236) 增加了 OAuth 端到端的回归测试覆盖，表明团队在发力提升 CI 门槛。

### 4. 社区热点
今日讨论度最高的问题集中在**长会话管理**与**插件生态安全**：
* **[Issue #68596](https://github.com/openclaw/openclaw/issues/68596) (👍8, 评论 15)**：请求支持配置流式传输看门狗的超时阈值。用户在使用 Kimi、DeepSeek-R1 等长思考模型时，频繁遭遇系统误判超时并重置状态，呼声极高。
* **[Issue #50090](https://github.com/openclaw/openclaw/issues/50090) (评论 15)**：深度讨论 ClawHub 社区 Skills 生态的现状。用户反馈目前插件市场承诺与实际体验差距过大，缺乏有效的质量控制和隔离机制。
* **[Issue #69208](https://github.com/openclaw/openclaw/issues/69208) (评论 12)**：维护者发起的跨频道（Teams/Webchat/Telegram）会话记录重复和上下文组装错误的汇总追踪 Issue，引起了开发者的广泛共鸣和技术探讨。

### 5. Bug 与稳定性
今日报告了大量影响生产稳定性的严重 Bug，按优先级排列如下：
* **严重 - 网关内存泄漏与 OOM：**
  * [Issue #55334](https://github.com/openclaw/openclaw/issues/55334)：`sessions.json` 无限增长，每个条目重复包含 `skillsSnapshot` 且不清理临时会话，导致网关内存以 50-100 MB/min 泄漏直至 OOM。
  * [Issue #54155](https://github.com/openclaw/openclaw/issues/54155)：网关内存从 389MB 在 4 天内飙升至 14.7GB。
* **高 - 会话状态与消息丢失：**
  * [Issue #67777](https://github.com/openclaw/openclaw/issues/67777)：在繁忙或超时情况下，Subagent 完成信号可能被直接丢弃，导致用户永远收不到结果。（*目前已有修复提案：[PR #89039](https://github.com/openclaw/openclaw/pull/89039)*）
  * [Issue #64810](https://github.com/openclaw/openclaw/issues/64810)：心跳/异步系统事件在 Telegram 会话中会强行打断并“吞掉”正在生成的回复。
* **高危安全漏洞：**
  * [Issue #65624](https://github.com/openclaw/openclaw/issues/65624) (CVSS 评分 7.6)：Mattermost slash 命令默认使用明文回调 URL，暴露了可重用的命令 Token。
  * [Issue #45740](https://github.com/openclaw/openclaw/issues/45740)：`gh-issues` skill 将未经验证的 GitHub issue 正文直接拼接进子代理的 Prompt，存在典型的 Prompt 注入风险。

### 6. 功能请求与路线图信号
从长线需求来看，RAG 记忆架构和多模态支持是下一版本可能的演进方向：
* **高级记忆架构重塑：** [Issue #60572](https://github.com/openclaw/openclaw/issues/60572) 请求用多槽位架构替代单一 memory 插件；[Issue

---

## 横向生态对比

以下是为您生成的截至 2026-06-26 的 AI 智能体与个人 AI 助手开源生态横向对比分析报告。

> **分析师注**：由于今日 Hermes Agent 项目的摘要生成失败，本报告的横向对比将主要基于 OpenClaw 的高价值数据展开，并将其作为当前大型开源 AI 助手生态的典型样本来剖析行业共性问题。

---

### 1. 生态全景
当前（2026年中）个人 AI 助手与自主智能体开源生态正处于**从“早期功能验证”向“生产级规模商用”跃升的阵痛期**。多渠道接入（IM平台联动）与外部工具集成已成为基础设施标配，但这引发了网关稳定性（OOM、状态机异常）和安全性（Prompt 注入、恶意插件）的系列连锁反应。与此同时，大模型底层能力的演进（如长思考推理模型）正在倒逼上层智能体架构重构，特别是流式会话管理与高级记忆架构。

### 2. 各项目活跃度对比
| 项目名称 | 今日活跃 Issues | 待合并 PRs | PR 处理量 | Release | 健康度评估与状态 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 474 | 423 | 77 (合并/关闭) | 0 | **高增长、高摩擦**：社区极度过热，功能扩展迅速，但积压大量 P0/P1 级稳定性与安全漏洞，处于技术债偿还期。 |
| **Hermes Agent** | N/A | N/A | N/A | N/A | **数据缺失**：因摘要生成失败，今日无法评估其生态活跃度。 |

### 3. OpenClaw 在生态中的定位
基于今日数据，OpenClaw 展现出了作为**生态级核心枢纽**的特质：
*   **规模与体量优势**：单日近 1000 条的 Issue/PR 更新，以及高达 8 万量级的 PR 编号，表明其已具备庞大的开发者基数和极高的社区参与度，是当前个人 AI 助手赛道流量集中的“超级应用”。
*   **技术路线差异：强集成与泛渠道**：不同于专注单一深度推理或纯本地运行的开源智能体，OpenClaw 极度侧重于“万物互联”（深度集成 Telegram、飞书、Teams、Mattermost），主打成为用户的统一消息与任务分发网关。
*   **生态化壁垒：ClawHub 插件市场**：通过引入类似 AppStore 的 ClawHub 机制，OpenClaw 正在构建基于 Skills 和 Subagents 的护城河，尽管目前正经历生态初期的质量控制阵痛。

### 4. 共同关注的技术方向（行业共通诉求）
从 OpenClaw 社区的高频痛点中，可以清晰地提炼出当前 AI 智能体开发的行业级共同诉求：
*   **长会话与状态管理极限挑战**：大思考模型（如 DeepSeek-R1）的长时间推理，极易触发网关超时导致状态重置；而异步多频道的系统事件经常打断并“吞掉”正在生成的回复。
*   **下一代记忆架构（RAG 2.0）**：传统的单一记忆插件已失效，业界急需**多槽位记忆架构**来解决长文本上下文丢失问题。
*   **生产级高可用基建**：会话状态记录（如 `sessions.json`）无限膨胀导致的内存泄漏（OOM）频发，证明现有开源项目在应对高并发长会话时，仍缺乏企业级的资源回收与隔离机制。

### 5. 差异化定位分析（基于当前态势的推演）
在当前生态语境下，OpenClaw 展现出了明确的功能与架构侧重点：
*   **功能侧重：平台化 vs 单点能力**。项目重心已从“优化大模型对话体验”转移至“跨平台消息路由治理”与“插件信任度风控”（如拦截恶意发布）。
*   **目标用户：超级用户与极客开发者**。需要同时挂载飞书、Telegram、Teams 的多平台重度用户，以及愿意为其编写个性化 Skill 的插件开发者。
*   **技术架构：事件驱动与异步通信的复杂性**。多渠道接入要求极高标准的异步事件处理机制，这也是目前导致心跳冲突、Subagent 完成信号丢失的架构根因。

### 6. 社区热度与成熟度
*   **快速迭代与混乱期（以 OpenClaw 为代表）**：当前 OpenClaw 呈现典型的“高增长伴随高摩擦”特征。项目在疯狂吸收新功能（如引入 QA Lab、虚拟 Provider），但被严重的底层 Bug（内存飙升、跨频道上下文组装错误）拖累。今天没有发布新版本，说明维护者正被迫转入底层的 Bug 扫荡与架构加固（今日合并了 77 个修复 PR）。

### 7. 值得关注的趋势信号（开发者参考）
1.  **安全左移势在必行**：Issue #45740（GitHub Issue 正文导致的 Prompt 注入）和 Mattermost Token 明文暴露（CVSS 7.6）是给全行业敲响的警钟。**智能体安全隔离舱与内容清洗机制**将成为下一代项目的标配。
2.  **流式看门狗机制需重构**：针对 Kimi、DeepSeek-R1 等长思考模型，传统的固定超时阈值已完全失效。社区呼吁动态评估、心跳保活的流式看门狗机制。
3.  **生态插件市场的“Quality Collapse”风险**：随着各开源智能体插件市场的繁荣，质量失控正在反噬主项目。建立严格的沙箱隔离、代码审查机制（如 PR #81364）是目前基础设施工作的重中之重。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*