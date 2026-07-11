# AI 开源趋势日报 2026-07-11

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-07-11 03:45 UTC

---

# AI 开源趋势日报 - 2026.07.11

## 1. 今日速览
今日 AI 开源生态呈现**“智能体工程化”与“技能化”**爆发趋势。在 GitHub Trending 榜单中，为 AI 编程助手（特别是 Claude Code 等 CLI Agent）配备标准化“技能”和本地系统级控制权限（MCP）的项目迎来极高的单日 star 涨幅。同时，从底层向量数据库到长期的 Agent 记忆管理，上下文工程相关的全链路基础设施建设依然是社区投入的重心。模型与应用层的边界日益模糊，AI 正在从“对话框”向全面接管开发者的“终端与工作流”演进。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）
- **[wonderwhy-er/DesktopCommanderMCP](https://github.com/wonderwhy-er/DesktopCommanderMCP)** [TypeScript] ⭐0 (+328 today)
  专为 Claude 打造的 MCP server，赋予 AI 终端控制、文件系统搜索和 diff 编辑能力，是 AI 编程助手落地本地实操的利器。
- **[ollama/ollama](https://github.com/ollama/ollama)** [Go] ⭐175,896
  最受欢迎的本地大模型推理与运行引擎，现已全面支持 Kimi-K2.6、GLM-5.1 等最新一代开源模型。
- **[vllm-project/vllm](https://github.com/vllm-project/vllm)** [Python] ⭐85,936
  业界标杆的高吞吐量、高显存利用率 LLM 推理与部署服务引擎。
- **[davila7/claude-code-templates](https://github.com/davila7/claude-code-templates)** [Python] ⭐0 (+118 today)
  专为配置和监控 Claude Code 设计的 CLI 工具，降低了开发者使用 AI 编程的配置门槛。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
- **[mattpocock/skills](https://github.com/mattpocock/skills)** [Shell] ⭐0 (+1712 today)
  作者直接开源了自己 `.claude` 目录下的配置，为工程师提供了实战级的 AI 智能体技能预设，今日引爆关注。
- **[obra/superpowers](https://github.com/obra/superpowers)** [Shell] ⭐0 (+1013 today)
  一套切实可用的智能体技能框架与软件开发方法论，将 AI 编程从“对话”升级为“规范化的工程执行”。
- **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)** [JavaScript] ⭐0 (+1116 today)
  为 AI 编码智能体打造的生产级工程技能库，显著提升 AI 处理复杂软件工程任务的表现。
- **[langgenius/dify](https://github.com/langgenius/dify)** [TypeScript] ⭐148,447
  全球领先的智能体工作流开发可视化平台，为构建复杂的生成式 AI 应用提供生产级支持。
- **[OpenHands/OpenHands](https://github.com/OpenHands/OpenHands)** [Python] ⭐80,389
  旨在实现“AI 驱动开发”的开源自主软件工程师框架。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）
- **[iOfficeAI/OfficeCLI](https://github.com/iOfficeAI/OfficeCLI)** [C#] ⭐0 (+1224 today)
  专供 AI agents 使用的命令行 Office 套件，能让 AI 免安装直接读写、自动化处理 Word/Excel/PPT，今日涨幅惊人。
- **[santifer/career-ops](https://github.com/santifer/career-ops)** [JavaScript] ⭐59,569
  开源的 AI 求职助手：自动扫描招聘网站、为职位打分、量身定制简历，并可完全在本地 CLI 中运行。
- **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** [Python] ⭐212,837
  定位为“与你共同成长的智能体”，是当前最受瞩目的个性化通用 AI Agent 应用之一。
- **[TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)** [Python] ⭐92,245
  专为金融交易设计的多智能体大模型框架，展现了 LLM 在高波动垂直领域的应用潜力。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）
- **[huggingface/transformers](https://github.com/huggingface/transformers)** [Python] ⭐162,461
  定义了当今机器学习模型（文本、视觉、音频、多模态）推理与训练的核心基础框架。
- **[pytorch/pytorch](https://github.com/pytorch/pytorch)** [Python] ⭐101,721
  全球最广泛使用的动态神经网络计算库，AI 底层生态的绝对基石。
- **[asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)** [JavaScript] ⭐55,875
  收集了 Claude Fable 5、GPT-5.6、Gemini 3.5 等最新一代闭源模型及 CLI 工具的系统提示词，是逆向研究大模型行为逻辑的重要资源。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）
- **[TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory)** [TypeScript] ⭐0 (+123 today)
  腾讯云开源的 4 层渐进式 Agent 记忆管线方案，提供完全本地化、零外部 API 依赖的长效记忆。
- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** [JavaScript] ⭐86,785
  捕获 AI 编程会话过程并进行 AI 压缩，将有效上下文重新注入未来会话，是解决“Agent失忆症”的利器。
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** [Python] ⭐82,003
  将任何代码库、SQL 表结构或文档转化为可查询的知识图谱，正在重塑代码级 RAG 的形态。
- **[mem0ai/mem0](https://github.com/mem0ai/mem0)** [Python] ⭐60,579
  为各类 AI Agents 提供可定制的通用记忆层，解决长期对话的上下文遗失痛点。

---

## 3. 趋势信号分析

今日热榜释放出一个极其强烈的信号：**AI 编程正全面拥抱“技能化”与“本地工具调用（MCP）”**。榜单中诸如 `agent-skills`、`skills`、`superpowers` 等项目单日新增 stars 破千，表明开发者社区已经不再满足于让 AI 生成代码片段，而是致力于为 CLI 形态的 AI Agent（特别是 Claude Code）构建标准化的工程方法论和行为准则（Skills 框架）。这意味着 AI 辅助编程正从“随机生成”向“遵循开发规范的自动化执行”过渡。

同时，以 `OfficeCLI` 和 `DesktopCommanderMCP` 为代表的工具爆发，说明**基础设施正在为“Agent 接管操作系统”铺路**。通过无需安装的底层 CLI 工具和 MCP 协议，AI 首次具备了无缝操作文件系统、原生 Office 文档的能力，打开了广阔的桌面端 RPA（机器人流程自动化）想象空间。

此外，在主题搜索维度，Agent 记忆机制（如 `TencentDB-Agent-Memory`、`claude-mem`）热度居高不下。随着 AI 执行任务的周期变长、跨度变大，如何低成本地压缩历史记录、构建知识图谱（如 `graphify`），即**“上下文工程”**，正成为继提示词工程之后最核心的技术攻关方向。这与近期 Claude、GPT 等模型支持超长上下文但仍存在“中段遗忘”的行业痛点高度契合。

---

## 4. 社区关注热点

- 🔥 **`iOfficeAI/OfficeCLI`** — 桌面自动化新突破。使 AI 能够原生读写和自动化操作 Word/Excel/PPT，传统 RPA（自动化办公）开发者必须关注的新范式。
- 🔥 **`mattpocock/skills` 与 `obra/superpowers`** — 揭秘顶级开发者如何使用 AI CLI。通过借鉴这些公开的 Skills 配置，普通开发者可以立刻拉平与资深工程师在使用 AI Agent 时的效率差距。
- 🔥 **`Graphify-Labs/graphify`** — 代码与文档知识图谱化。有别于传统的纯向量检索，将工程代码和数据库 Schema 转为图谱，极大提升了 AI 在大型遗留项目中查找上下文的准确率。
- 🔥 **`asgeirtj/system_prompts_leaks`** — 闭源大模型的“后台逻辑”。通过研究头部厂商如何编写复杂的 System Prompt，开发者可以学习到极其高级的提示词约束技巧和任务编排逻辑。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*