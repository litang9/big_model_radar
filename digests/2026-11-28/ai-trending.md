# AI 开源趋势日报 2026-11-28

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-28 02:39 UTC

---

# AI 开源趋势日报（2026-11-28）

## 一、今日速览

今日 GitHub Trending 榜单几乎被「AI 编码代理技能生态」全面占领：Claude-BugHunter、superpowers、last30days-skill 等一批围绕 Claude Code / Codex / Cursor 等编码代理的 Skill 包集体爆发，Agent Skills 开放标准正在成为新的流量入口。同时，香港大学数据智能实验室（HKUDS）继续高频输出，CLI-Anything 提出「让所有软件 Agent 原生化」的 CLI-Hub 路线，与 firecrawl 一同抢占 Agent 数据基础设施层。中文社区方面，minimind 3 小时训练 64M 模型的教育项目与 AutoClip 开源视频剪辑工具双双登榜。整体信号清晰：**Agent 的「技能/上下文/工具」三层外围生态正取代模型本身成为开源创新主战场**。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | +666 today | 提出「Agent-Native」理念，为所有软件提供统一 CLI 接口层，瞄准 Agent 操纵软件的标准化入口，方向新颖。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 211.7k (+822 today) | Agent 知识基础设施，一个 API 接入 550+ 数据源，是 Agent 数据获取层的事实标准之一。 |
| [cursor/plugins](https://github.com/cursor/plugins) | +243 today | Cursor 官方插件规范与插件库，代表头部编码 IDE 正式开放扩展生态。 |
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | +151 today | Intel 推理优化与部署工具包，端侧 AI 推理长期主力。 |
| [ollama/ollama](https://github.com/ollama/ollama) | 188.3k | 本地大模型运行首选，支持 Kimi、GLM、DeepSeek、Qwen 等国产模型，是本地推理的默认入口。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 154.3k | 将代码库/文档/SQL 转为可查询知识图谱的 Claude Code 技能，本地确定性 AST 解析、无向量库，RAG 路线的有力挑战者。 |
| [zilliztech/claude-context](https://github.com/zilliztech/claude-context) | 12.7k | Zilliz 出品的代码搜索 MCP，让整个代码库成为编码代理的上下文。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars | 说明 |
|---|---|---|
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | +1608 today（今日榜首） | Claude Code 安全技能包：85 技能、681 披露报告模式，覆盖 24 类漏洞，是「安全 + Agent」交叉赛道的爆发样本。 |
| [obra/superpowers](https://github.com/obra/superpowers) | +922 today | Agent 技能框架 + 软件开发方法论，「能落地的 Agent 工程化」定位。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 311.9k | Agent Harness 性能优化系统：技能、本能、记忆、安全一体化，覆盖 Claude Code / Codex / Cursor 全家桶。 |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | +328 today | CI/CD 可靠性开源 Agent，DevOps 垂直 Agent 赛道值得关注。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 266.6k | 「与你一起成长的 Agent」，个人 Agent 交互范式的探索。 |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | 39.0k | Agent 前端栈 + AG-UI 协议作者，Generative UI 基础设施。 |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 45.5k | 构建可靠 Agent 的图编排框架，LangChain 生态核心。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars | 说明 |
|---|---|---|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | +718 today | 开源 OpusClip 平替：本地优先 AI 视频剪辑 + MCP 服务，一条链接一键出片，中文创作者场景刚需。 |
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | +675 today | Agent 研究技能：跨 Reddit/X/YouTube/HN/Polymarket 检索并合成有据摘要，AI 调研场景代表。 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | +725 today | 为各大编码代理设计的 52 类图表生成技能，自包含 HTML/SVG，「反 Mermaid slop」差异化鲜明。 |
| [XiaoYouChR/Ghost-Downloader-3](https://github.com/XiaoYouChR/Ghost-Downloader-3) | +836 today | 下载器工具，仅含 AI 增强特性，边缘相关。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 146.0k | 关键词一键生成高清短视频的 AI 工作流，自媒体自动化标杆。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 75.0k | LLM 驱动多市场股票分析系统，零成本定时运行，「AI + 炒股」持续热门。 |
| [mjmirza/app-store-compliance](https://github.com/mjmirza/app-store-compliance) | +530 today | App 合规检查 Playbook + AI 编码代理技能，含 117 项监管死线追踪，合规 × Agent 新交叉。 |
| [toeverything/AFFiNE](https://github.com/toeverything/AFFiNE) | +474 today | 知识库产品，AI 关联较弱（其 Agent 协作特性可关注），边缘入选。 |

### 🧠 大模型/训练（模型、训练框架、微调工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 72.2k (+660 today) | 2 小时从零训练 64M LLM，教学价值极高，中文社区现象级项目。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 109.2k | PyTorch 从零实现 ChatGPT 级 LLM 的经典教程，与 minimind 同属「理解优先」路线。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 169.3k | 模型定义框架事实标准，多模态训练与推理基础设施。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5.8k | 在 Apple Silicon 上构建 tiny vLLM + Qwen，面向系统工程师的推理系统教学。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7.7k | LLM 评测平台，覆盖 100+ 数据集，评测刚需。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars | 说明 |
|---|---|---|
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 42.9k | 字节跳动「自进化上下文数据库」，统一 Agent 记忆、RAG 知识与技能，上下文基础设施新范式。 |
| [claude-mem](https://github.com/thedotmack/claude-mem) | 120.2k | 跨会话持久上下文层：AI 压缩会话历史并注入未来会话，兼容所有主流编码代理。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 69.6k | Agent 记忆层事实标准，生产级持久记忆基础设施。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 94.8k | 「Agent 原生数据库」，RAG 引擎向上下文基础设施演进的代表。 |
| [thet dotmack 之外：headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | 81.0k | 工具输出/日志/RAG 块的 LLM 前置压缩，JSON 场景省 60-95% token，成本优化新物种。 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | 40.8k | 无向量、基于推理的文档索引 RAG，反主流技术路线。 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | 123.3k | 「少 token 办大事」：Skill + 本地代理压缩编码代理的响应与工具输出，token 经济学方向的爆点。 |

> 已剔除：nginx/nginx（通用 Web 服务器）、Ghost-Downloader-3（下载工具，AI 相关性弱）、AFFiNE（知识库但 AI 功能非核心）等非 AI 或弱相关项目。

---

## 三、趋势信号分析

**1. Agent Skill 生态爆发式崛起。** 今日热榜前五名中有四个（Claude-BugHunter、superpowers、diagram-design、last30days-skill）是面向 Claude Code / Codex / Cursor 的技能包，且多为近期新项目。Agent Skills 开放标准（stitch-skills 提到）正让「Skill」成为与「插件/MCP」并列的第三种扩展形态，个人开发者靠垂直技能包即可获得上千日增 star，这是典型的生态早期红利窗口。

**2. 上下文与 token 经济成为新赛道。** claude-mem（记忆持久化）、headroom 与 caveman（token 压缩）、OpenViking（上下文数据库）、graphify（知识图谱替代向量库）共同指向一个核心矛盾：Agent 跑得越多，上下文成本越高——压缩、记忆、检索的重新设计是当下最确定的创业/开源方向。

**3. 「无向量 RAG」与合规 Agent 化值得关注。** PageIndex（推理式索引）、graphify（AST 确定性解析）挑战向量检索主流；app-store-compliance 把 EU AI Act、DSA 等监管要求做成 Agent 技能，预示合规 × AI 的工具化浪潮。

**4. 与行业事件关联。** ollama 描述中 Kimi、GLM、MiniMax、DeepSeek 排在前列，国产开源模型在本地推理侧的份额持续扩大；HKUDS 一日内多个项目（CLI-Anything 等）上榜，学术实验室的「产品化输出」节奏已不逊商业公司。

---

## 四、社区关注热点

- **[Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)**（+1608 today）— 今日榜一，「安全技能包 × 编码代理」的标杆，安全从业者和红队方向必看。
- **[volcengine/OpenViking](https://github.com/volcengine/OpenViking)** — 字节出品的自进化上下文数据库，「记忆+知识+技能」三位一体，可能是 Agent 基础设施的下一代形态。
- **[caveman](https://github.com/JuliusBrussee/caveman) 与 [headroom](https://github.com/headroomlabs-ai/headroom)** — token 压缩两条路线（行为侧 vs 数据侧），重度 Agent 用户降本立竿见影。
- **[Claude-BugHunter 之外的 Skill 标准入口：google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)** — Google 跟进 Agent Skills 开放标准，跨代理兼容的 Skill 库是抢占生态卡位的机会。
- **[minimind](https://github.com/jingyaogong/minimind)** — 想真正理解 LLM 内部机制的开发者最佳起点，中文文档、2 小时可跑通，教育与工程价值兼备。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*