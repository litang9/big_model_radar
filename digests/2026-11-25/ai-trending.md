# AI 开源趋势日报 2026-11-25

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-25 03:31 UTC

---

# 📊 AI 开源趋势日报（2026-11-25）

## 1. 今日速览

今日 GitHub Trending 被 **Agent Skills 生态**全面占领：热榜前几名几乎全是面向 Claude Code / Codex / Cursor 等编码智能体的技能包与增强框架，"Agent Skills 开放标准"正在成为新的分发层。安全红队方向出现爆款——Claude-BugHunter 以 84 个安全技能单日斩获 1826 stars，为今日榜首。数据基础设施侧，Firecrawl、Graphify、claude-context 等“给 Agent 喂上下文”的工具持续走强；国产项目表现活跃（minimind、AutoClip、CowAgent 等）。整体信号明确：**AI 开源的竞争重心已从“模型”转移到“智能体的技能、记忆与上下文基础设施”。**

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、开发工具、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 209K (+991 today) | 550+ 数据源的搜索/抓取统一 API，是 Agent 数据接入的事实标准之一，持续霸榜 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | — (+1074 today) | 港大出品，将所有软件改造为 Agent 可调用的 CLI，"Agent-Native"理念的代表 |
| [cursor/plugins](https://github.com/cursor/plugins) | — (+360 today) | Cursor 官方插件规范发布，编码 Agent 生态平台化的重要节点 |
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | — (+185 today) | Intel 老牌推理优化部署工具箱，端侧推理部署持续被关注 |
| [ollama/ollama](https://github.com/ollama/ollama) | 188K | 本地模型运行的事实标准，支持 Kimi、GLM、DeepSeek 等国产开源模型 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、技能生态）

| 项目 | Stars | 说明 |
|---|---|---|
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | — (+1826 today) | 今日榜首！84 个渗透测试/红队技能 + 681 个公开漏洞报告模式，Agent 安全能力套件 |
| [obra/superpowers](https://github.com/obra/superpowers) | — (+1003 today) | Agent 技能框架 + 软件开发方法论，破千 stars，技能生态标杆 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 266K | "与你一起成长的 Agent"，个人智能体头部项目 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | 123K | "少 token 办大事"——编码 Agent 的 token 节省技能 + 本地代理，直击成本痛点 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 310K | Agent harness 性能优化系统：技能 + 本能 + 记忆 + 安全一体化 |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | — (+398 today) | CI/CD 可靠性 Agent，SRE 场景智能化新方向 |
| [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale) | 41K | Rust 编写的终端/Web/桌面编码 Agent，含多 Agent 编排与沙箱隔离 |

### 📦 AI 应用（垂直场景产品）

| 项目 | Stars | 说明 |
|---|---|---|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | — (+980 today) | 长视频一键剪成短视频并生成文案，适配抖音/TikTok 等平台，AI 内容再分发爆款 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 70K (+727 today) | 2 小时从零训练 64M 大模型，最佳 LLM 教学项目，持续走强 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 124K | 多 Agent 金融研究系统，Agentic Finance 的学术代表 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 80K | 文档/主题转原生 PowerPoint，办公自动化落地 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | 85K | AI 求职 Agent：简历打分 + 定制 + 跟踪，跑在本地 CLI |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 74K | LLM 多市场股票分析，零成本定时运行 |

### 🧠 大模型/训练（训练/微调/教育）

| 项目 | Stars | 说明 |
|---|---|---|
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 109K | PyTorch 从零实现 ChatGPT 级 LLM，教育类常青树 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5.8K | 在 Apple Silicon 上手写 mini-vLLM，推理系统工程学习 |
| [galilai-group/stable-pretraining](https://github.com/galilai-group/stable-pretraining) | 355 | 可靠、可扩展的基础模型预训练库，小众但方向前沿 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7.6K | LLM 评测平台，覆盖 100+ 数据集，模型评测基础设施 |

### 🔍 RAG/知识库（向量库、检索、记忆）

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 153K | 代码库转可查询知识图谱，去向量化的技能式 RAG，爆发式增长 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 43K | 火山引擎自进化上下文数据库，统一 Agent 记忆/知识/技能 |
| [ VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | 41K | “无向量、基于推理”的文档索引，挑战传统 embedding RAG 范式 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 120K | 跨会话持久记忆注入，兼容所有主流编码 Agent |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 95K | Agent 原生 RAG 引擎，正演进为上下文基础设施 |
| [zilliztech/claude-context](https://github.com/zilliztech/claude-context) | 12.7K | 把整个代码库变成编码 Agent 的上下文（MCP） |
| [LEANN](https://github.com/StarTrail-org/LEANN) | 13.8K | MLSys2026 最佳论文，97% 存储节省的个人设备 RAG |

**过滤说明**：Trending 榜单中 [nginx/nginx](https://github.com/nginx/nginx)、[toeverything/AFFiNE](https://github.com/toeverything/AFFiNE)、[XiaoYouChR/Ghost-Downloader-3](https://github.com/XiaoYouChR/Ghost-Downloader-3) 与 AI 无直接关联，已排除。其余如 superpowers、stitch-skills、last30days-skill、app-store-compliance、diagram-design、ECC、caveman 等均为 AI Agent 技能/增强工具，已归入相应类别。

---

## 3. 趋势信号分析

**① Agent Skills 生态爆发是今日最强信号。** 热榜 16 席中约 10 个是面向 Claude Code、Codex、Cursor 等编码智能体的技能包（BugHunter、superpowers、stitch-skills、diagram-design、last30days-skill、app-store-compliance）。技能包本身无复杂代码，本质是“提示词 + 知识库打包”，却动辄单日千 stars——说明 Agent 平台之上的**分发层标准之争**已打响，且 "Agent Skills open standard" 正在获得跨工具兼容（一个技能包同时声明支持 Claude Code/Cursor/Gemini CLI）。

**② 安全 + Agent 是新交叉点。** BugHunter（红队技能）与 app-store-compliance（合规技能，含 EU AI Act 期限追踪）同日上榜，预示“用 Agent 做安全/合规”正成为技能生态第一个高价值垂直。

**③ RAG 去 embedding 化。** Graphify（知识图谱）、PageIndex（无向量推理式 RAG）、LEANN 共同指向对传统向量检索的不满，"Context Engineering" 正在取代 "RAG" 成为热词，且均与编码 Agent 上下文问题绑定。

**④ Token 经济学。** caveman、headroom 等压缩工具输出/token 的项目大量出现，反映 Agent 成本压力下“省 token”成为刚需基础设施。

---

## 4. 社区关注热点

- **[Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)** — 今日 +1826 stars，验证“安全技能包”是 Agent 技能市场第一个付费级垂直方向，安全从业者值得关注
- **[superpowers](https://github.com/obra/superpowers) + Agent Skills 开放标准** — 技能包跨平台兼容（Claude Code/Cursor/Codex/Gemini CLI），提前布局可吃到生态红利
- **[CLI-Anything](https://github.com/HKUDS/CLI-Anything)** — "让所有软件 Agent-Native" 的理念与 MCP 形成互补路线，观察其能否成为 Agent 工具调用新层
- **[Graphify](https://github.com/Graphify-Labs/graphify) / [PageIndex](https://github.com/VectifyAI/PageIndex)** — 无向量 RAG 两大代表，编码 Agent 上下文管理的新范式候选
- **[minimind](https://github.com/jingyaogong/minimind)** — 双榜在榜，教育与实战结合极佳的 LLM 训练入门项目，适合系统性学习

---
*数据来源：GitHub Trending（今日实时）+ GitHub Search API（topic: ml / llm / ai-agent / rag / vector-db，7 天活跃）。Trending 项目总 stars 显示为 0 系数据源显示异常，仅今日新增数可信。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*