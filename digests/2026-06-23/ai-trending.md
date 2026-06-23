# AI 开源趋势日报 2026-06-23

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-06-23 04:32 UTC

---

这份《AI 开源趋势日报》基于 2026 年 6 月 23 日的 GitHub Trending 及主题搜索数据，经过 AI 相关性筛选、去杂与深度分析后为您生成。

---

# 📊 2026-06-23 AI 开源趋势日报

## 1. 今日速览
今日 GitHub AI 生态呈现**“多模态内容生成”**与**“Agent 级开发工具链”**双核爆发态势。一方面，以视频、语音为代表的垂直 AI 工作流迎来了爆发期，[calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) 等项目将 AI 视频制作直接提升到了 Agentic 系统级别；另一方面，**“Agent Skills（智能体技能）”与“MCP（模型上下文协议）”生态**正在迅速成熟，开发者极度关注如何为 Claude Code、Cursor 等编程智能体扩展外部记忆与专业领域能力。此外，针对长周期复杂任务的 SuperAgent 框架（如 [bytedance/deer-flow](https://github.com/bytedance/deer-flow)）继续巩固其在开源社区的统治级地位。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）
*   [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) [C] ⭐0 (+1185 today)
    *高能代码智能 MCP 服务器，将代码库转化为知识图谱，大幅降低大模型处理上下文的 Token 消耗，是今日备受瞩目的 AI 编程基础设施。*
*   [lyogavin/airllm](https://github.com/lyogavin/airllm) [Jupyter Notebook] ⭐0 (+193 today)
    *极具突破性的推理加速项目，支持在单张 4GB 显存的消费级 GPU 上运行 70B 参数大模型，打破了端侧大算力限制。*
*   [ollama/ollama](https://github.com/ollama/ollama) [Go] ⭐174,758
    *端侧大模型运行的事实标准，已无缝支持 Kimi-K2.6、GLM-5.1 等最新一代开源模型，依然是本地化 AI 部署的基石。*
*   [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) [TypeScript] ⭐137,509 (+615 today)
    *专为 AI Agent 打造的大规模网络数据清洗与抓取 API，是构建 RAG 和外部数据驱动的智能体不可或缺的数据层引擎。*
*   [garrytan/gstack](https://github.com/garrytan/gstack) [TypeScript] ⭐0 (+573 today)
    *一套高度提炼的 Claude Code 赋能工具栈，通过模拟企业内 CEO、产品、研发等多重职能角色，重新定义了 AI 结对编程的范式。*

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
*   [bytedance/deer-flow](https://github.com/bytedance/deer-flow) [Python] ⭐73,393 (+738 today)
    *字节跳动开源的长周期 SuperAgent 框架，融合沙箱、记忆与子智能体，能够处理需要数分钟甚至数小时的深度研究、编码与创作任务。*
*   [mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) [Python] ⭐0 (+956 today)
    *包含 817 个结构化网络安全技能库，映射主流安全框架，让 Claude Code、Cursor 等 AI Agent 瞬间拥有专业级白帽黑客能力。*
*   [mattpocock/skills](https://github.com/mattpocock/skills) [Shell] ⭐0 (+2051 today)
    *直击痛点：直接开源大神的 `.claude` 目录配置，提供经过实战检验的 Agent 技能集，今日新增 Star 极为迅猛。*
*   [langgenius/dify](https://github.com/langgenius/dify) [TypeScript] ⭐146,196
    *面向生产环境的 Agentic 工作流开发平台，长期霸榜，是目前企业级落地 LLM 应用最稳健的基座。*

### 📦 AI 应用（具体应用产品、垂直场景解决方案）
*   [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) [Python] ⭐0 (+2938 today)
    *全球首个开源 Agentic 视频制作系统，内置 12 条流水线和 500+ 技能，直接将 AI 编程助手转化为完整的视频制片厂。*
*   [palmier-io/palmier-pro](https://github.com/palmier-io/palmier-pro) [Swift] ⭐0 (+2463 today)
    *专为 macOS 原生设计的 AI 视频编辑器，大幅降低了普通人使用 AI 进行影视后期剪辑的门槛。*
*   [jamiepine/voicebox](https://github.com/jamiepine/voicebox) [TypeScript] ⭐0 (+529 today)
    *开源的 AI 语音工作站，提供声音克隆、听写与创作一体化服务，填补了开源生态中高质量音频应用工具的空白。*
*   [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) [Python] ⭐46,066 (+1557 today)
    *LLM 驱动的多市场股票分析系统，聚合多源行情与实时新闻，实现零成本部署的自动化智能投研看板。*
*   [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) [Python] ⭐30,438
    *能够将任意文档一键转化为带原生动画与 AI 配音的真实可编辑 PPT 文件，实用性极强。*

### 🧠 大模型/训练（模型权重、训练框架、微调工具）
*   [pytorch/pytorch](https://github.com/pytorch/pytorch) [Python] ⭐100,963
    *深度学习界的绝对霸主，依然是大模型底层的核心依赖。*
*   [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) [JavaScript] ⭐45,096
    *集合了 Claude Fable 5、GPT 5.5、Gemini 3.5 等最新闭源巨头模型系统提示词的逆向工程泄露库，是研究大模型对齐与控制的珍贵资料。*
*   [galilai-group/stable-pretraining](https://github.com/galilai-group/stable-pretraining) [Python] ⭐266
    *提供可靠、极简的基础与世界模型预训练库，为下一代模型的高稳定性训练提供支持。*

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）
*   [infiniflow/ragflow](https://github.com/infiniflow/ragflow) [Python] ⭐83,386
    *结合深度文档理解与 Agent 能力的领先开源 RAG 引擎，正在重新定义 LLM 的上下文质量标准。*
*   [mem0ai/mem0](https://github.com/mem0ai/mem0) [Python] ⭐59,163
    *为 AI Agent 提供通用且持久化的记忆层，解决了 Agent 跨会话遗忘的历史痛点。*
*   [safishamsi/graphify](https://github.com/safishamsi/graphify) [Python] ⭐70,788
    *将杂乱无章的代码库、文档和媒体文件转化为可查询的知识图谱，是 AI 编程领域 Graph RAG 的先锋应用。*
*   [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) [Python] ⭐47,282
    *在将数据送入大模型前进行 Token 压缩的代理库，可节省高达 95% 的 Token 消耗，兼顾隐私与成本。*

---

## 3. 趋势信号分析

今日的 Trending 榜单释放出极其强烈的行业信号：**“Agentic Skills（智能体技能）与 MCP（模型上下文协议）”正在接管 AI 编码生态。** 以 `codebase-memory-mcp` 为代表的底层上下文工具，和以 `Anthropic-Cybersecurity-Skills`、`mattpocock/skills` 为代表的技能库集中爆发，说明开源社区的焦点已从“训练基础大模型”转向“为大模型构建高质量的外挂大脑与专业工具箱”。开发者正通过标准化协议，将杂乱的代码库转化为图谱，或将垂直行业经验封装为即插即用的 Prompt 库。

其次，**多模态 Agent 应用迎来了真正的破圈时刻。** 以 `calesthio/OpenMontage`（日增近 3000 Star）和 `palmier-pro` 为首的视频/音频处理系统，不再是简单的模型套壳，而是构建了包含 12 条流水线、数百个技能的复杂工程链路。这标志着 LLM 正式从“聊天助手”演进为能够操作复杂生产软件的“数字员工”。

此外，榜单中大量出现基于 Claude Code、Cursor 或 Gemini CLI 构建的 Web 应用与脚本，这与近期大厂闭源模型（如 GPT 5.5 Instant、Claude Opus 4.8）在编码和 Agent 稳定性上的大幅提升直接相关。开源界正在围绕这些前沿闭源巨头的 API，构建极其繁荣的开源配套生态。

---

## 4. 社区关注热点
*   🎬 **[calesthio/OpenMontage](https://github.com/calesthio/OpenMontage)**：视频生成赛道的新星。它证明了复杂的多模态视频剪辑完全可以被拆解为 AI Agent 可执行的工作流，值得所有内容创作者和 Multimedia Agent 开发者深入研究。
*   🧠 **[DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp)**：解决 AI 编程核心痛点。它将代码转为知识图谱并支持亚毫秒级查询，大幅减少 Token 浪费，代表了未来 AI 编程辅助工具与 MCP 结合的主流形态。
*   🛡️ **[mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)**：安全行业的颠覆者。将极其庞杂的网安框架转化为机器可读的 Skill 库，是研究如何为 Agent 赋予“专家级领域知识”的教科书级开源项目。
*   📈 **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)**：金融 AI 落地的优秀样板。将实时新闻、行情数据与 LLM 决策完美结合，同时支持零成本定时运行，具备极高的个人实际应用价值。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*