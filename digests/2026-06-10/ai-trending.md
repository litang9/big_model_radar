# AI 开源趋势日报 2026-06-10

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-06-10 03:24 UTC

---

这份《AI 开源趋势日报》基于 2026 年 6 月 10 日的 GitHub Trending 及 Topic 搜索数据，经过非 AI 项目剔除（如 ChinaTextbook、tolaria 等非 AI 项目已排除）及数据交叉去重后生成。

---

# 📊 AI 开源趋势日报 (2026-06-10)

## 1. 今日速览
- **AI Agent 迎来“技能化”与“模块化”爆发：** 今日热榜被各类 Agent Skills（智能体技能包）霸屏，开发者正从构建单一的通用 Agent 转向为特定工种（如 PM、求职者、研究员）定制专属模块化技能。
- **底层向量检索技术向 Rust 寻求极致性能：** 随着本地 RAG 和端侧推理的普及，用 Rust 重写底层向量索引（如 turbovec）以降低内存占用并提升吞吐量，成为基础设施层的新风向。
- **实用主义与“AI 赚钱/找工作”工具备受追捧：** 能够直接产生经济效益或解决实际生存痛点（如自动化求职、本地模型精准评测选型）的项目正在获得爆发性 Star 增量。
- **智能体“长期记忆”成为核心拼图：** 为解决 AI 容易“遗忘”上下文的问题，基于知识图谱和会话压缩的长期记忆组件（如 claude-mem、graphify）在 RAG 领域持续升温。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具）
- **[RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec)** ⭐0 (+1801 today) | Python/Rust
  基于 TurboQuant 构建的高性能向量索引库。用 Rust 编写并提供 Python 绑定，为日益繁重的本地 AI 检索提供极致的内存与速度优化。
- **[roboflow/supervision](https://github.com/roboflow/supervision)** ⭐0 (+733 today) | Python
  提供可复用的计算机视觉（CV）底层工具库。极大地简化了目标检测、图像分割等视觉模型的后续数据处理与可视化工作。
- **[ollama/ollama](https://github.com/ollama/ollama)** ⭐173,723 | Go
  极其流行的本地大模型推理与运行引擎。今日支持了包括 Kimi-K2.6、GLM-5.1 等最新模型，是端侧 AI 的绝对基石。
- **[vllm-project/vllm](https://github.com/vllm-project/vllm)** ⭐82,365 | Python
  业界领先的高吞吐、低显存消耗 LLM 推理与服务引擎，企业级模型部署的标配。
- **[Andyyyy64/whichllm](https://github.com/Andyyyy64/whichllm)** ⭐0 (+633 today) | Python
  一款本地模型硬件评测基准工具。打破了唯参数论，通过真实测试告诉开发者哪款开源大模型能在你的特定机器上跑得最快、最好。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
- **[santifer/career-ops](https://github.com/santifer/career-ops)** ⭐51,822 (+1110 today) | JavaScript
  基于 Claude Code 构建的 AI 求职系统。提供 14 种技能模式，涵盖从简历生成到多渠道批量投递的全自动化求职工作流。
- **[aaif-goose/goose](https://github.com/aaif-goose/goose)** ⭐0 (+489 today) | Rust
  开源的扩展式 AI Agent。突破了单纯的代码补全，能够自主安装、执行、编辑和测试，可与任意 LLM 结合。
- **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)** ⭐0 (+443 today) | Shell
  专为 AI 编码智能体（如 Cursor, Copilot）设计的生产级工程技能包，显著提升 AI 编写企业级代码的架构合理性。
- **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** ⭐188,980 | Python
  新晋近 19 万 Star 的超级项目。定位为伴随用户成长的个性化智能体框架，长期霸榜 AI Agent 主题。
- **[shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code)** ⭐65,724 | Python
  教程级项目，从 0 到 1 教你构建一个类似 Claude Code 的极简 Agent 运行环境，极适合 Agent 开发者学习底层原理。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）
- **[mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)** ⭐0 (+3191 today) | Python
  跨平台深度研究技能。驱动 Agent 在 Reddit、X、YouTube、Polymarket 等全网平台进行交叉调研，并输出高质量的综合摘要。
- **[phuryn/pm-skills](https://github.com/phuryn/pm-skills)** ⭐0 (+806 today) | -
  产品经理专属的智能体技能市场。提供超过 100 个从需求发现到产品增长的全生命周期 AI 插件。
- **[maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed)** ⭐0 (+191 today) | Python
  专注于医疗领域的垂直开源 AI 系统，致力于解决医疗行业知识问答与辅助诊断的痛点。
- **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)** ⭐41,550 | Python
  LLM 驱动的 A/H/美股智能分析系统。零成本定时运行，整合实时行情与新闻，配合多数据源仪表盘。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）
- **[huggingface/transformers](https://github.com/huggingface/transformers)** ⭐161,465 | Python
  业界最权威的机器学习模型定义与训练框架，全面覆盖文本、视觉、音频及多模态的最前沿架构。
- **[hiyouga/LlamaFactory](https://github.com/hiyouga/LlamaFactory)** ⭐72,036 | Python
  统一高效的微调框架。支持 100 多种主流大模型与视觉语言模型（VLM）的零代码/低代码微调。
- **[pytorch/pytorch](https://github.com/pytorch/pytorch)** ⭐100,625 | Python
  AI 底层基石。提供强大的 GPU 加速张量计算与动态神经网络构建能力。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）
- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** ⭐81,502 | JavaScript
  Agent 跨会话的持久化记忆层。自动压缩历史操作并精准注入新上下文，完美适配 Claude Code 等主流 Agent。
- **[safishamsi/graphify](https://github.com/safishamsi/graphify)** ⭐64,321 | Python
  将任意文件夹、数据库模式甚至视频转化为“可查询的知识图谱”。大幅增强编码 Agent 对企业级复杂代码库的理解。
- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)** ⭐82,337 | Python
  最先进的深度文档理解与检索增强生成（RAG）引擎，以极高的解析精度为 Agent 提供优质的上下文。
- **[qdrant/qdrant](https://github.com/qdrant/qdrant)** ⭐31,987 | Rust
  下一代高性能、云原生向量数据库，专为海量 AI 数据的高效相似性检索而设计。

---

## 3. 趋势信号分析

今日 GitHub AI 趋势释放出三个极其明确的信号：
第一，**Agent 开发范式全面转向“技能增强”**。无论是 Addy Osmani 的 `agent-skills` 还是单日暴涨超 3000 Star 的 `last30days-skill`，都表明社区已不满足于通用的对话助手。开发者正致力于为 Claude Code、Cursor 等基础 Agent 披上专业技能的外衣，使其实体化为超级研究员（Researcher）或超级产品经理（PM）。
第二，**端侧模型的“适配性评测”成为刚需**。随着各大厂商不断推出千亿、端侧等不同规格的模型，`whichllm` 的爆发证明：用户不再轻信单纯的跑分榜单，而是需要工具去测试模型在**本地特定硬件**下的真实表现。这将推动硬件感知模型路由的发展。
第三，**Agent 记忆机制催生图谱与 RAG 新融合**。以 `claude-mem` 和 `graphify` 为代表的项目揭示了：有效的 Agent 上下文管理不能仅靠拼接向量检索（RAG），还需要引入知识图谱（GraphRAG）进行代码逻辑与业务实体的结构化映射。底层技术栈上，Rust（如 turbovec, qdrant）正在接管对延迟和吞吐量要求极高的向量检索层。

---

## 4. 社区关注热点 (值得开发者重点研究)

- 👉 **[santifer/career-ops](https://github.com/santifer/career-ops)**：今日 Star 增量极高（+1110）。作为 Claude Code 的极佳落地案例，它展示了如何利用 LLM 编排复杂的日常工作流，值得打工人和自动化开发者 Fork 研究其 Skill 编写模式。
- 👉 **[RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec)**：如果你在开发 RAG 应用，这个项目不容错过。它代表了目前向量数据库底层优化的主流趋势——用 Rust 重写核心算法，通过 Python 绑定提供易用性，兼顾了性能与生态。
- 👉 **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)**：目前 Agent 生态最大的痛点就是“金鱼记忆”。这个项目提供的“会话压缩与精准注入”机制，是构建长程交互 AI 助手的标准解法。
- 👉 **[mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)**：今日榜单最大黑马（+3191 Star）。它完美演示了如何利用 Agent 突破单一搜索引擎的局限，实现全网多维数据的 Cross-check 交叉验证，非常适合作为“AI 深度研究”技能的开发模板。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*