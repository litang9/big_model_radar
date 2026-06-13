# AI 开源趋势日报 2026-06-13

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-06-13 03:24 UTC

---

这是一份为您生成的《AI 开源趋势日报》（基于 2026-06-13 数据）。

---

# 📰 AI 开源趋势日报 (2026-06-13)

## 1. 今日速览
- **AI 编码智能体生态大爆发**：今日 GitHub Trending 榜单被“AI Agent 技能、提示词与插件框架”全面占领，以 Claude Code、Codex 为代表的终端智能体正催生出庞大的周边工具生态。
- **大模型长期记忆与上下文工程成为焦点**：在主题搜索榜单中，解决 Agent 跨会话记忆（`claude-mem`）和本地知识图谱构建（`graphify`）的项目迎来了惊人的 Star 增长，表明“上下文管理”已成为 AI 应用的核心刚需。
- **垂直领域开源 AI 加速落地**：医疗（`openmed`）和金融（`daily_stock_analysis`）等与业务深度绑定的垂直 AI 解决方案受到开发者热捧，低成本、全自动的 Agent 工作流正在重塑传统行业的开发范式。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具）
- **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)** ⭐(+2656 today)
  生产级 AI 编码 Agent 工程技能库，为 Claude Code 等 CLI 智能体提供强大的标准化基础能力。
- **[ollama/ollama](https://github.com/ollama/ollama)** ⭐173,984
  极致简化的本地大模型运行框架，已支持 Kimi-K2.6、GLM-5.1 等最新前沿模型的一键部署。
- **[vllm-project/vllm](https://github.com/vllm-project/vllm)** ⭐82,725
  业界标杆级的高吞吐、高显存利用率 LLM 推理和服务引擎。
- **[LMCache/LMCache](https://github.com/LMCache/LMCache)** ⭐(+28 today)
  专为大模型设计的极速 KV Cache 缓存层，今日登榜，有效降低长文本和重复上下文的推理成本。
- **[shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code)** ⭐66,308
  “Bash is all you need”，从零到一教你构建一个极简的类 Claude Code Agent Harness，极具学习价值。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
- **[obra/superpowers](https://github.com/obra/superpowers)** ⭐(+1275 today)
  新兴的 Agentic 技能框架与软件开发方法论，今日斩获千星，为 AI 协作编程提供标准范式。
- **[msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents)** ⭐(+1026 today)
  提供从前端到社区运营的完整 AI 机构多智能体矩阵，每个 Agent 都拥有独特的个性和工作流。
- **[phuryn/pm-skills](https://github.com/phuryn/pm-skills)** ⭐(+827 today)
  专为产品经理打造的 100+ Agentic 技能市场，覆盖从需求发现到产品增长的全生命周期。
- **[langgenius/dify](https://github.com/langgenius/dify)** ⭐145,005
  目前 GitHub 上最活跃的生产级 Agentic 工作流开发平台之一。
- **[CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit)** ⭐34,897
  面向前端开发者的 Agent 集成框架，主打 Generative UI 与 AG-UI 协议。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）
- **[maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed)** ⭐(+515 today)
  完全开源的医疗 AI 系统，今日冲榜，预示着医疗与 AI 的结合正从模型层走向系统应用层。
- **[open-webui/open-webui](https://github.com/open-webui/open-webui)** ⭐141,289
  支持 Ollama 和 OpenAI API 的用户友好型全功能 WebUI，本地大模型的第一选择。
- **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)** ⭐42,337
  LLM 驱动的 A/H/美股智能分析系统，集成多数据源与实时新闻，主打“零成本纯白嫖”运行。
- **[hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)** ⭐27,024
  真正做到一键生成原生可编辑 PPT（非图片拼接）的 AI 办公神器。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）
- **[hiyouga/LlamaFactory](https://github.com/hiyouga/LlamaFactory)** ⭐72,122
  统一、高效的 100+ 款主流大模型/视觉模型微调框架（ACL 2024 学术加持）。
- **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** ⭐192,063
  “与你共同成长的 Agent”，顶级开源社区 Nous Research 推出的旗舰智能体模型项目。
- **[huggingface/transformers](https://github.com/huggingface/transformers)** ⭐161,548
  机器学习界的“基础设施”，全面覆盖文本、视觉、音频及多模态模型。
- **[Picovoice/picollm](https://github.com/Picovoice/picollm)** ⭐312
  基于 X-Bit 量化的设备端（端侧）大模型推理引擎，主打极致隐私和离线运行。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）
- **[safishamsi/graphify](https://github.com/safishamsi/graphify)** ⭐66,339
  将任何代码库、文档甚至视频转化为可查询的知识图谱，是 RAG 技术向 GraphRAP 演进的热门代表。
- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** ⭐82,018
  为所有 AI Agent 提供跨会话的持久化记忆，通过自动压缩和注入上下文，解决大模型“金鱼记忆”痛点。
- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)** ⭐82,585
  深度融合前沿 RAG 与 Agent 能力的下一代开源检索增强引擎。
- **[mem0ai/mem0](https://github.com/mem0ai/mem0)** ⭐58,458
  专为 AI Agent 设计的通用记忆层，极简易用。
- **[topoteretes/cognee](https://github.com/topoteretes/cognee)** ⭐17,803
  面向 AI Agent 的开源知识图谱记忆引擎，赋予 Agent 持久的长期记忆。

---

## 3. 趋势信号分析

**AI 编码 Agent 迎来“技能包”大爆发：** 
今日 Trending 榜单最大的亮点是围绕 AI Terminal Agent（特别是 Claude Code、Codex 等）的“技能/插件”项目呈现井喷（如 `agent-skills`、`superpowers`、`agency-agents` 等，均为上千日增 Star）。这标志着 AI 辅助编程正在跨越单纯的“代码补全”，全面迈入 **“可编排、带技能树的自动化开发者”** 阶段。开发者正从训练大模型，转向为现有的顶级 CLI 智能体编写 Shell 脚本和工作流提示词。

**RAG 演进为“记忆与图谱工程”：** 
在主题榜中，`claude-mem`（8.2 万 Star）和 `graphify`（6.6 万 Star）等超高星项目的涌现，反映出 RAG 技术正在发生分化：传统的文档切片检索已无法满足复杂 Agent 的需求，业界正在快速转向**“知识图谱构建”**与**“Agent 持久化长期记忆”**。如何高效压缩历史上下文、将非结构化数据图化，成为了当前开源界最热衷解决的瓶颈。

**端到端“零成本”自动化工作流普及：** 
随着大模型 API 价格战的白热化，像 `daily_stock_analysis` 这样“纯白嫖、全自动、定时触发”的端到端 AI 应用迎来了超 4 万 Star 的追捧。这预示着 2026 年下半场，结合爬虫、大模型决策、多渠道推送的轻量级 AI 自动化脚本将成为开发者的日常基建。

---

## 4. 社区关注热点

- 🔥 **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)**：今日日增 Star 超过 2600，对于致力于开发 AI Coding Agent 的工程师来说，这是目前最值得研究和借鉴的生产级技能库。
- 🔥 **[safishamsi/graphify](https://github.com/safishamsi/graphify)**：强烈推荐 RAG 开发者关注。它打破了传统 Vector DB 的局限，将代码库和文档直接图谱化，极大缓解了复杂代码库结构丢失的痛点。
- 🔥 **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)**：多 Agent 通用记忆方案。如果你的 Agent 项目经常需要跨 Session 工作，这款支持自动压缩和注入上下文的工具能显著提升 Agent 的连续推理能力。
- 🔥 **[maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed)**：开源医疗 AI 领域的一匹黑马，登顶今日热榜。对于探索 AI 在高门槛垂直行业（如医疗、法律）合规应用的团队具有极高的参考价值。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*