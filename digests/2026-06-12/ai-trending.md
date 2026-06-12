# AI 开源趋势日报 2026-06-12

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-06-12 03:37 UTC

---

# 📰 AI 开源趋势日报 (2026-06-12)

## 1. 今日速览
- **“智能体技能”爆发达成社区共识**：今日 GitHub Trending 榜单被 AI Agent 的技能包、提示词框架和工作流彻底霸占，以 `agent-skills`、`pm-skills` 为代表的项目单日斩获数千 Star，标志着 AI 应用正从“通用对话”向“专业化、模块化技能执行”迈进。
- **英伟达入局 Agent 安全审查**：NVIDIA 开源了针对 AI 智能体技能的安全扫描工具 `SkillSpector`，意味着随着 Agent 自动化执行权限的扩大，AI 供应链安全与行为合规已成为大厂关注的重点基础设施。
- **端侧与本地-first 智能体分析工具兴起**：随着各类 Coding Agent（如 Claude Code, Codex）的普及，用于监控、分析本地 AI 会话与 token 消耗的配套工具（如 `agentsview`）开始受到开发者的强烈关注。
- **RAG 向知识图谱与长期记忆演化**：在 AI 主题搜索中，结合知识图谱的 RAG 引擎（如 `graphify`）和为智能体提供跨会话持久化记忆的框架（如 `claude-mem`、`mem0`）持续保持高热度，解决大模型的“遗忘症”成为当前技术攻关的核心。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具）
- **[NVIDIA/SkillSpector](https://github.com/NVIDIA/SkillSpector)** ⭐0 (+319 today)
  - **说明**：NVIDIA 出品的 AI Agent 技能安全扫描器，用于检测大模型在调用外部工具时的漏洞和恶意模式，为 Agent 生态的安全保驾护航。
- **[ollama/ollama](https://github.com/ollama/ollama)** ⭐173,912 [topic:llm]
  - **说明**：极致简化的本地大模型运行框架，已支持 Kimi-K2.6、GLM-5.1 等最新模型，是个人开发者的本地推理基础设施首选。
- **[huggingface/transformers](https://github.com/huggingface/transformers)** ⭐161,514 [topic:llm]
  - **说明**：最权威的模型定义与训练/推理框架，支持文本、视觉、音频等多模态，是 AI 领域的底层基石。
- **[kenn-io/agentsview](https://github.com/kenn-io/agentsview)** ⭐0 (+114 today)
  - **说明**：一款 Local-first 的会话智能分析 CLI 工具，专为 Claude Code、Codex 等 20 多种编程 Agent 提供性能分析与 token 监控。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
- **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)** ⭐0 (+3278 today)
  - **说明**：面向 AI 编程 Agent 的生产级工程技能库，今日狂揽数千星，反映了社区对提升 AI 写码质量与规范化的强烈需求。
- **[obra/superpowers](https://github.com/obra/superpowers)** ⭐0 (+1322 today)
  - **说明**：一套完整的智能体技能框架与软件开发方法论，旨在让 AI Agent 真正遵循工程化流程工作。
- **[phuryn/pm-skills](https://github.com/phuryn/pm-skills)** ⭐0 (+1978 today)
  - **说明**：产品经理的 AI 技能市场，提供从需求发现到产品增长的上百个 Agentic 技能插件，AI 产品经理的实战利器。
- **[msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents)** ⭐0 (+1599 today)
  - **说明**：一套全栈式 AI Agency 智能体集合，涵盖前端开发、社区运营甚至幽默感注入等细分岗位的个性化 Agent。
- **[x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)** ⭐0 (+368 today)
  - **说明**：汇总了 Cursor, Devin, Manus, Windsurf 等几乎所有主流 AI 工具的系统提示词，是逆向工程与学习 Agent 设定的宝库。
- **[bytedance/deer-flow](https://github.com/bytedance/deer-flow)** ⭐71,009 [topic:llm]
  - **说明**：字节跳动开源的长周期 SuperAgent 框架，能处理耗时从几分钟到几小时的复杂任务。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）
- **[maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed)** ⭐0 (+426 today)
  - **说明**：开源医疗保健 AI，大模型在医疗垂直领域的落地应用，关注度持续攀升。
- **[alchaincyf/zhangxuefeng-skill](https://github.com/alchaincyf/zhangxuefeng-skill)** ⭐0 (+89 today)
  - **说明**：基于女娲.skill 生成的“张雪峰认知操作系统”，将高考志愿与职业规划专家的经验转化为 AI Agent 技能，极具本土应用特色。
- **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)** ⭐42,204 [topic:ai-agent]
  - **说明**：LLM 驱动的 A/H/美股智能分析系统，结合实时新闻与行情，提供零成本的白嫖级量化决策仪表盘。
- **[hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)** ⭐26,726 [topic:ai-agent]
  - **说明**：能将任何文档转化为原生、可编辑且带配音的 PPT 的 AI 应用，直击职场痛点。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）
- **[hiyouga/LlamaFactory](https://github.com/hiyouga/LlamaFactory)** ⭐72,097 [topic:llm]
  - **说明**：统一高效的微调框架，支持 100+ 主流 LLMs 与 VLMs，是普通开发者进行模型私有化定制的主流选择。
- **[open-compass/opencompass](https://github.com/open-compass/opencompass)** ⭐7,081 [topic:llm-model]
  - **说明**：大模型评测“元工具”，全面支持 Llama、Qwen、GPT-4 等主流模型在 100+ 数据集上的性能打分。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）
- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** ⭐81,864 [topic:rag]
  - **说明**：为所有 AI Agent 提供跨会话持久化记忆，自动压缩历史行为并注入未来上下文，解决了 Agent 的“失忆”顽疾。
- **[safishamsi/graphify](https://github.com/safishamsi/graphify)** ⭐65,748 [topic:rag]
  - **说明**：将文件夹、代码库、视频等转化为可查询的知识图谱，代表了 RAG 从纯向量检索向图谱化发展的新范式。
- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)** ⭐82,499 [topic:rag]
  - **说明**：一款深度融合前沿 RAG 技术与 Agent 能力的开源引擎，致力于为 LLM 提供极致精准的上下文层。
- **[mem0ai/mem0](https://github.com/mem0ai/mem0)** ⭐58,377 [topic:rag]
  - **说明**：面向 AI Agent 的通用记忆层，为智能体提供可扩展的长期记忆管理解决方案。

---

## 3. 趋势信号分析
今日 GitHub AI 生态最显著的趋势是 **“Agentic Skills（智能体技能化）”的全面爆发与基建化**。从 Trending 榜单看，通用型大模型项目热度回落，取而代之的是 `agent-skills`、`pm-skills`、`superpowers` 等为 AI Agent 赋予特定执行能力的“技能包”项目。这表明 AI 正在从“能聊天”向“能办事”的业务流深处扎根。

同时，新兴技术栈的显现同样值得关注：一方面，**Agent 安全赛道开始觉醒**，NVIDIA 开源 `SkillSpector` 意味着当 AI 拥有执行代码、调用 API 权限时，其潜在的安全风险已成为行业痛点，相关沙箱与审计工具将成刚需；另一方面，**Agent Harness（套件）与记忆中间件崛起**，如 `claude-mem` 和 `agentsview`，开发者的关注点已从单纯调用模型 API，转移至如何构建会话监控、上下文压缩与记忆持久化的一体化开发者工具栈。这反映了在多模态与超长上下文模型普及的当下，工程化落地与降本增效成为了主旋律。

---

## 4. 社区关注热点 (推荐开发者关注)
- **💡 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)**：如果你在研发 Coding Agent 或使用 AI 辅助编程，这个库提供了生产级的技能规范，是提升 AI 写码质量的不二之选。
- **🛡️ [NVIDIA/SkillSpector](https://github.com/NVIDIA/SkillSpector)**：随着 Function Calling 和 MCP 的普及，AI 调用恶意脚本的风险剧增。做 Agent 开发的团队应高度关注此安全扫描工具，防止 Agent 被注入攻击。
- **🧠 [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)**：完美解决 Cursor、Claude Code 等 AI 工具在多轮会话中“忘记”之前设定的痛点，支持多种主流 Agent，适合重度 AI 用户立刻部署。
- **🕸️ [safishamsi/graphify](https://github.com/safishamsi/graphify)**：传统 RAG 在复杂逻辑推理上存在缺陷，该项目采用知识图谱思路重构 RAG，值得所有从事企业级知识库搭建的架构师深入研究。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*