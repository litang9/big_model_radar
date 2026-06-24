# AI 开源趋势日报 2026-06-24

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-06-24 04:39 UTC

---

这是一份为您定制的《AI 开源趋势日报》（2026-06-24）。已根据要求完成非 AI 项目（如英语学习指南、通用前端清单等）的过滤，并完成多维度分类与深度分析。

---

# 📊 AI 开源趋势日报 (2026-06-24)

## 1. 今日速览
今日 GitHub AI 领域呈现出**“Agentic Coding（智能体编码）生态”全面爆发**的态势，围绕 Claude Code、Cursor 等 CLI 工具的“外挂、技能包与性能优化器”霸榜 Trending。**基础设施层面，MCP（模型上下文协议）正在迅速演进为代码级 AI 智能体的“标准记忆中枢”**，如基于知识图谱的代码索引项目今日崛起。应用层方面，**多模态 Agent 工作流开始成熟**，基于多智能体协作的全自动视频生产系统与语音克隆工具引发了开发者的极大兴趣。字节跳动等大厂也在长周期复杂任务 Agent 编排上持续发力。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、开发工具、CLI）
*   **[DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp)** [C] ⭐ 0 (+1300 today)
    *   **关注理由：** 高性能代码图谱 MCP Server。能将整个代码库索引为持久化知识图谱，实现毫秒级查询并减少 99% 的 Token 消耗，是解决 AI 程序员“上下文失忆”的基建神器。
*   **[garrytan/gstack](https://github.com/garrytan/gstack)** [TypeScript] ⭐ 0 (+1011 today)
    *   **关注理由：** YC 总裁 Garry Tan 开源的私人 Claude Code 配置 stack。包含 23 个充当 CEO、设计师、工程总监的预设工具，代表了“AI 自动化高管团队”的新玩法。
*   **[affaan-m/ECC](https://github.com/affaan-m/ECC)** [JavaScript] ⭐ 220k (+593 today)
    *   **关注理由：** 针对各类 AI 编码 Agent（Claude Code, Cursor, Codex 等）的性能优化系统，赋予 Agent 技能、本能、记忆和安全防护。
*   **[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)** [Python] ⭐ 0 (+77 today)
    *   **关注理由：** Anthropic 官方维护的 Claude Code 高质量插件目录，标志着官方开始着手规范和建立 Agentic 编码插件生态。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
*   **[bytedance/deer-flow](https://github.com/bytedance/deer-flow)** [Python] ⭐ 74k (+739 today)
    *   **关注理由：** 字节跳动开源的长周期 SuperAgent 框架。能结合沙箱、记忆和子智能体，处理耗时几分钟到几小时的深度研究、编码和创作任务。
*   **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** [Python] ⭐ 201k (+936 today)
    *   **关注理由：** 著名开源团队 Nous Research 推出的“伴随你成长”的 Agent，主打个性化和持续进化能力，在 AI 搜索榜单中热度极高。
*   **[revfactory/harness](https://github.com/revfactory/harness)** [HTML] ⭐ 0 (+128 today)
    *   **关注理由：** 一种“元技能”框架，能自动设计特定领域的 Agent 团队，并为它们生成专属的技能树。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）
*   **[calesthio/OpenMontage](https://github.com/calesthio/OpenMontage)** [Python] ⭐ 0 (+3592 today)
    *   **关注理由：** 今日全网最火项目（新增 Star 最高）。全球首个开源 Agentic 视频制作系统，内置 12 条流水线和 500+ Agent 技能，直接将 AI 编码助手变成视频工作室。
*   **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)** [Python] ⭐ 47.3k (+1119 today)
    *   **关注理由：** 基于 LLM 的多市场股票智能分析系统。整合实时新闻与多源行情，支持零成本定时运行，代表了 AI 在个人量化金融场景的落地。
*   **[jamiepine/voicebox](https://github.com/jamiepine/voicebox)** [TypeScript] ⭐ 0 (+1045 today)
    *   **关注理由：** 开源的 AI 语音工作室，支持语音克隆、听写和创作，为独立开发者提供了本地化的音频生成解决方案。
*   **[koala73/worldmonitor](https://github.com/koala73/worldmonitor)** [TypeScript] ⭐ 0 (+294 today)
    *   **关注理由：** 实时全球情报监控仪表盘。利用 AI 聚合新闻、监控地缘政治和基础设施，展现了 AI 在情报 Situational Awareness（态势感知）方面的应用。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）
*   *(注：由于本日 Trending 以应用和 Agent 为主，以下选取 Topic 搜索中活跃度极高的框架)*
*   **[ollama/ollama](https://github.com/ollama/ollama)** [Go] ⭐ 174.8k
    *   **关注理由：** 本地大模型运行的事实标准，最新已火速支持 Kimi-K2.6、GLM-5.1 等前沿开源模型。
*   **[galilai-group/stable-pretraining](https://github.com/galilai-group/stable-pretraining)** [Python] ⭐ 266
    *   **关注理由：** 极简、可扩展的基座模型与世界模型预训练库，为中小型团队提供稳定的从零训练方案。
*   **[open-compass/opencompass](https://github.com/open-compass/opencompass)** [Python] ⭐ 7.1k
    *   **关注理由：** 大模型“跑分”必备工具，全面覆盖 Llama3, Qwen, GLM, Claude 等 100+ 数据集评测。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）
*   **[safishamsi/graphify](https://github.com/safishamsi/graphify)** [Python] ⭐ 71.2k
    *   **关注理由：** 将任意代码、SQL 数据库、文档甚至视频转化为 AI 可查询的知识图谱。是 Claude Code/Cursor 等 Agent 最喜欢的 RAG 技能插件之一。
*   **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)** [Python] ⭐ 83.4k
    *   **关注理由：** 专注于深度文档理解的开源 RAG 引擎，正在将 Agent 能力深度融合进检索流程中。
*   **[topoteretes/cognee](https://github.com/topoteretes/cognee)** [Python] ⭐ 20.4k
    *   **关注理由：** 面向 Agent 的开源记忆平台，通过自建知识图谱实现跨会话的长期记忆管理。

---

## 3. 趋势信号分析

今日的 GitHub 数据释放了极其强烈的**“AI 软件工程范式转移”**信号：
1. **Agentic Coding 进入“堆 Skills”与“套装化”阶段：** 开发者们不再满足于单次对话生成代码。今日爆火的 `gstack`、`ECC` 等项目表明，社区正在将 AI 编码助手（如 Claude Code）封装为带有“CEO、QA、文档工程师”等职能的完整团队，并通过注入大量结构化技能（如 `Anthropic-Cybersecurity-Skills`）来拓展其处理专业领域任务的能力。
2. **MCP 成为超级粘合剂：** 以 `codebase-memory-mcp` 为代表的项目说明，MCP（模型上下文协议）已成功超越传统的文本 RAG，开始将图谱数据库、本地环境与 AI Agent 的记忆中枢深度解耦又高效连接。MCP 正在成为 AI 读取现实世界与代码库的标准接口。
3. **大模型演进推动多模态 Agent 爆发：** `OpenMontage`（一日斩获近 4000 Stars）和 `palmier-pro` 的登榜，说明随着底层多模态模型能力的提升，纯粹基于文本的 Chatbot 正在迅速让位于由 Agent 驱动的“多智能体音视频生产线”。复杂任务编排框架（如 `deer-flow`）为这类多模态工作流提供了底层支撑。

---

## 4. 社区关注热点 (开发者必看)

*   🔥 **[calesthio/OpenMontage](https://github.com/calesthio/OpenMontage)**：如果你对 AI 视频创作感兴趣，这个项目展示了如何利用现有 AI 编码助手调用流水线和 Agent 技能来全自动生成视频，是极佳的复杂 Agent 编排参考案例。
*   🧠 **[DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp)**：任何使用 Cursor 或 Claude Code 的程序员都应该关注这个项目。它用极低的 Token 消耗实现了全代码库的图谱索引，大概率是下一代 AI IDE 的底层标配。
*   ⚙️ **[garrytan/gstack](https://github.com/garrytan/gstack)**：想体验如何让 AI 扮演你的技术主管、设计师甚至代码审查员吗？Garry Tan 的这套实战配置极具启发性，非常适合直接 Fork 调试。
*   📈 **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)**：国内开发者的佳作，展示了如何利用 LLM 结合实时抓取技术，在几乎零成本（定时触发）的情况下构建实用的个人量化投顾系统。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*