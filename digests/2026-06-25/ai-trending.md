# AI 开源趋势日报 2026-06-25

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-06-25 04:36 UTC

---

这是一份为您定制的《AI 开源趋势日报》，基于 2026 年 6 月 25 日的 GitHub Trending 及主题搜索数据深度分析生成。

---

# 📊 2026-06-25 AI 开源趋势日报

## 1. 今日速览
今日 AI 开源生态呈现**“Agentic AI（智能体化）全面深水区”**的特征，纯对话模型或单一 Wrapper 已难登主榜，取而代之的是具备强工程化能力的“智能体集群”与“技能化底座”。视频生成、金融量化等垂直场景正被高吞吐量的多智能体架构重写；同时，围绕 Claude Code、Cursor 等 AI Coding Agent 的“外围增强生态”（如上下文记忆、多智能体调度 CLI、设计规范）正在迎来爆发式增长。

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）
*本类别重点关注为 AI 应用提供算力、上下文管理及开发环境支持的底座项目。*

- [ollama/ollama](https://github.com/ollama/ollama) [Go] ⭐174,871
  **关注理由**：本地大模型推理的绝对霸主，现已原生支持运行 GLM-5.1、DeepSeek 等最新前沿模型，是本地 AI 开发的基础设施。
- [affaan-m/ECC](https://github.com/affaan-m/ECC) [JavaScript] ⭐221,275 
  **关注理由**：Agent Harness 性能优化系统。为 Claude Code、Cursor 等主流编码助手提供技能、记忆和安全隔离，大幅提升 AI 编码效率。
- [stablyai/orca](https://github.com/stablyai/orca) [TypeScript] ⭐今日新增 +331
  **关注理由**：一个旨在调度并行 AI 智能体集群的 ADE（智能体开发环境），支持跨端运行，解决了多 Agent 并行写代码时的协作冲突问题。
- [google-labs-code/design.md](https://github.com/google-labs-code/design.md) [TypeScript] ⭐今日新增 +619
  **关注理由**：Google 团队推出的规范，旨在通过结构化的 Markdown 为 AI 编码助手提供持久化、结构化的设计系统理解能力，让 AI 写出的前端不再“没审美”。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
*本类别重点关注多智能体编排、工作流自动化及 Agent 记忆/进化机制。*

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) [Python] ⭐202,237 | 今日新增 +1178
  **关注理由**：“与你共同成长的 Agent”，主打持久记忆与自我进化。Nous Research 的这款项目今日冲上 Trending，标志着开源社区在通用个人助理方向取得重大突破。
- [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) [Python] ⭐78,264
  **关注理由**：前 OpenDevin，目前最活跃的开源 AI 软件工程师框架之一，致力于让 AI 自主完成开发、调试与部署。
- [revfactory/harness](https://github.com/revfactory/harness) [HTML] ⭐今日新增 +277
  **关注理由**：一种“元技能”框架，能够根据特定领域自动设计智能体团队，并为它们生成所需的可复用技能。
- [bytedance/deer-flow](https://github.com/bytedance/deer-flow) [Python] ⭐74,491
  **关注理由**：字节跳动开源的长线任务 SuperAgent 底座，整合了沙盒、记忆、工具和消息网关，能处理耗时数小时的复杂任务。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）
*本类别重点关注落地到具体业务场景的 AI 解决方案。*

- [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) [Python] ⭐今日新增 +3719
  **关注理由**：今日榜单第一。全球首个开源 Agentic 视频制作系统，内置 12 条流水线和 52 种工具，将 AI 视频生成推进到了工业化流水分发时代。
- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) [Python] ⭐48,811 | 今日新增 +1468
  **关注理由**：基于 LLM 的多市场股票分析系统。结合实时新闻与多源行情，且支持零成本定时运行，展现了 AI 在金融情报自动化的巨大平民化潜力。
- [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) [Python] ⭐88,387
  **关注理由**：专为金融交易设计的多智能体框架，模拟真实交易室的不同角色（分析师、风控、交易员）进行博弈决策。
- [interviewstreet/hiring-agent](https://github.com/interviewstreet/hiring-agent) [Python] ⭐今日新增 +203
  **关注理由**：专注于 HR 领域的 AI 代理，能够精准评估和打分简历，展示出垂直 SaaS 被 AI Agent 重塑的趋势。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）
*本类别重点关注底层模型库及训练评估体系。*

- [huggingface/transformers](https://github.com/huggingface/transformers) [Python] ⭐161,883
  **关注理由**：AI 界的“底层宪法”，全面支持最新的多模态、视觉、音频和文本模型定义与训练。
- [vllm-project/vllm](https://github.com/vllm-project/vllm) [Python] ⭐84,124
  **关注理由**：高吞吐量、低显存消耗的 LLM 推理引擎，是目前大模型部署上线的行业标准。
- [open-compass/opencompass](https://github.com/open-compass/opencompass) [Python] ⭐7,119
  **关注理由**：支持 Llama3、GLM、GPT 等百余个数据集的开源模型评测平台，是检验模型真实能力的试金石。
- [galilai-group/stable-pretraining](https://github.com/galilai-group/stable-pretraining) [Python] ⭐267
  **关注理由**：主打可靠、极简的基础模型与世界模型预训练库，为中小团队从头预训练模型提供了轻量级方案。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）
*本类别重点关注解决 AI 长期记忆、私有知识检索的技术。*

- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) [JavaScript] ⭐84,170
  **关注理由**：为所有 AI Agent（如 Claude Code, Gemini, Copilot）提供跨会话的持久化记忆。通过压缩历史操作，让 AI 拥有“肌肉记忆”。
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) [Go] ⭐83,566
  **关注理由**：领先的开源 RAG 引擎，深度融合了 RAG 与 Agent 能力，主打深度文档解析（如复杂表格、PDF）与高质量上下文构建。
- [safishamsi/graphify](https://github.com/safishamsi/graphify) [Python] ⭐71,699
  **关注理由**：将任意代码库、SQL、文档甚至视频转化为可查询的知识图谱，是 Coding Agent 的绝佳伴侣。
- [milvus-io/milvus](https://github.com/milvus-io/milvus) [Go] ⭐44,940
  **关注理由**：全球领先的开源云原生向量数据库，为超大规模的 AI 记忆检索提供底层支撑。

---

## 3. 趋势信号分析

1. **Agent Harness 生态的全面爆发**：从今日数据可以看出，社区的重心已从“训练大模型”转移到“如何更好地调度和使用大模型”。围绕主流编码助手（如 Claude Code, Cursor）构建的周边生态——如上下文持久化记忆、并行调度环境、代码库图谱化——正在迎来爆发。
2. **垂直领域的 Agentic 化重写**：以 [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) 和 [daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) 为代表，工具正从“单一提示词调用”演变为“多 Agent 流水线协作”。视频制作和金融量化这两个重度依赖工作流的领域，成为了今天最大的赢家。
3. **标准化协作协议的萌芽**：[google-labs-code/design.md](https://github.com/google-labs-code/design.md) 的登榜是一个强烈信号——开发者和科技巨头正在试图建立 AI Agent 与人类设计师/工程师之间的“结构化沟通标准文件”，让 AI 的产出更加可控、可复用。

## 4. 社区关注热点（开发者重点推荐）

- 💡 **[calesthio/OpenMontage](https://github.com/calesthio/OpenMontage)**：今日暴涨 3700+ Stars。如果你在做 AIGC 视频或自媒体，这是必看项目，它将复杂的 AI 视频工作流完全开源化、流水线化了。
- 💡 **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)**：来自知名开源大厂 Nous Research 的新作。如果你在研究 Agent 的自我进化、长期记忆与个性化，该项目目前的热度和技术方向最值得跟进。
- 💡 **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)**：解决 AI 编码助手“健忘”的痛点。支持市面上主流的命令行 Agent，对于重度依赖 AI 写代码的开发者来说，是即插即用的生产力倍增器。
- 💡 **[google-labs-code/design.md](https://github.com/google-labs-code/design.md)**：前端开发者和全栈工程师值得关注。通过维护一个规范文件，让 AI 真正理解并严格遵守你的项目 UI/UX 规范，告别“AI 写出来的页面需要大修”。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*