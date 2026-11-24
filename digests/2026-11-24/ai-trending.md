# AI 开源趋势日报 2026-11-24

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-24 04:45 UTC

---

# AI 开源趋势日报 · 2026-11-24

## 一、今日速览

今日 GitHub Trending 榜单被 **AI Agent Skills（技能包）生态** 强势占领——16 个热榜项目中 AI 相关占 14 个，其中超半数是面向 Claude Code、Cursor、Codex 等编码智能体的技能包与框架。Anthropic 提出的 Agent Skills 开放标准正快速形成跨工具兼容的技能市场，连 Google 也下场发布官方 Stitch skills。与此同时，“Agent 的知识基础设施”（firecrawl、headroom、claude-mem 等）与“Agent 原生软件改造”（HKUDS/CLI-Anything）成为搜索榜单的明星方向。垂直场景（求职、股票分析、PPT 生成）的 Agent 应用持续爆发，Stars 增速惊人。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 208k（+924 today） | Agent 知识基础设施，一个 API 接入 550+ 数据源，今日双榜在榜 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | +790 today | “让所有软件 Agent 原生化”，CLI-Hub 生态，港大 HKUDS 出品 |
| [ollama/ollama](https://github.com/ollama/ollama) | 188k | 本地模型运行事实标准，支持 Kimi、GLM、DeepSeek、gpt-oss 等 |
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | +184 today | Intel 推理优化部署工具包，老牌基础设施持续活跃 |
| [Codewhale](https://github.com/codewhale-hq/Codewhale) | 41k | Rust 编写的终端编码 Agent，支持多 Agent 分工协作 |
| [cursor/plugins](https://github.com/cursor/plugins) | +397 today | Cursor 官方插件规范发布，IDE 巨头入场 Agent 插件生态 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、技能包）

| 项目 | Stars | 说明 |
|---|---|---|
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | +2029 today（今日榜首）| Claude Code 安全技能包：84 项技能、681 份披露报告模式，覆盖红队攻防 |
| [obra/superpowers](https://github.com/obra/superpowers) | +840 today | Agent 技能框架 + 软件开发方法论， Skills 生态头部项目 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 310k | Agent Harness 性能优化体系（技能/本能/记忆/安全），生态热度第一 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 266k | “与你共同成长的 Agent”，个人 Agent 方向标杆 |
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | +797 today | Agent 研究技能：跨 Reddit/X/YouTube/HN 多源检索并合成摘要 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | +422 today | Google 官方 Agent Skills 库，遵循开放标准，兼容主流编码 Agent |
| [mjmirza/app-store-compliance](https://github.com/mjmirza/app-store-compliance) | +761 today | 含 EU AI Act 合规期限追踪（112 项）+ Agent 技能，AI 监管合规工具化 |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | +436 today | CI/CD 可靠性开源 Agent， DevOps 智能化新方向 |

### 📦 AI 应用（垂直场景解决方案）

| 项目 | Stars | 说明 |
|---|---|---|
| [XiaoYouChR/Ghost-Downloader-3](https://github.com/XiaoYouChR/Ghost-Downloader-3) | +1087 today | 下载器工具，含 AI 相关能力，国产工具今日高增（弱 AI 相关，供参考）|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | +907 today | 一键将长视频剪成短视频（字幕/封面/文案），AI 内容再利用桌面工具 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 80k | 文档/主题转原生 PPT，Agent 办公场景爆款 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | 84k | AI 求职 Agent：岗位评分、简历定制、投递追踪 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 74k | LLM 多市场股票分析系统，零成本定时运行 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 145k | 关键词一键生成短视频的老牌爆款，持续迭代 |
| [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | 39k | “Vibe Trading” 个人交易 Agent，HKUDS 又一力作 |

### 🧠 大模型/训练（训练框架、微调、教学）

| 项目 | Stars | 说明 |
|---|---|---|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 70k（+828 today）| 2 小时从 0 训练 64M LLM，中文社区教育爆款，今日双榜在榜 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 109k | PyTorch 从零实现 ChatGPT 级 LLM 的经典教程 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5.8k | Apple Silicon 上构建 tiny vLLM + Qwen，推理系统工程师向 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7.6k | LLM 评测平台，覆盖 100+ 数据集 |
| [FonaTech/Project_Chronos](https://github.com/FonaTech/Project_Chronos) | 208 | 零停顿 MoE 推理（前瞻预测 + 异步 DMA 预取），前沿系统研究 |

### 🔍 RAG/知识库（向量数据库、检索增强、记忆）

| 项目 | Stars | 说明 |
|---|---|---|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 119k | Agent 跨会话持久记忆，压缩注入历史上下文，兼容所有主流编码 Agent |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 153k | 代码库转可查询知识图谱，无向量库的确定性 RAG |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 43k | 字节出品：自进化上下文数据库，统一记忆/RAG/技能 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | 41k | "Vectorless"、基于推理的文档索引 RAG |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | 34k | 开源 Agent 记忆平台，小模型实现长期记忆 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | 14k | MLSys2026 最佳论文：97% 存储节省的本地隐私 RAG |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | 114k | 给 Agent 装上“眼睛”：一个 CLI 读遍全网平台，零 API 费 |

---

## 三、趋势信号分析

**1）Agent Skills 生态迎来井喷。** 今日热榜近半数为面向编码 Agent 的技能包（BugHunter、superpowers、stitch-skills、last30days-skill、diagram-design），且普遍强调“兼容 Claude Code / Cursor / Codex / Gemini CLI”——Agent Skills 开放标准正在成为事实上的跨工具分发协议。Cursor 官方插件规范同日登场，预示 IDE 巨头与技能生态的正面竞合。

**2）“知识/上下文基础设施”成为新战场。** firecrawl（数据接入）、claude-mem（记忆）、headroom（token 压缩）、Graphify（知识图谱）、OpenViking（上下文数据库）均获超高增长，“向量库之外的 RAG”（vectorless、graph-based）明显崛起。

**3）安全与合规工具化。** BugHunter（+2029 今日第一）与 app-store-compliance（含 EU AI Act 死线追踪）同榜，AI 安全红队与监管合规正在从文档变成可执行的 Agent 技能。

**4）教育向长青。** minimind 双榜在榜，"from scratch"类项目（LLMs-from-scratch 109k）显示开发者对底层原理的持续渴求，与国产小模型（Qwen、GLM、Kimi 生态）繁荣相互印证。

---

## 四、社区关注热点

- **[Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)** — 今日 +2029 stars 登顶，AI 安全技能包的标杆之作，安全从业者与 Agent 开发者均值得研究其技能组织方式
- **[Cursor Plugins 规范](https://github.com/cursor/plugins)** — Cursor 官方入场插件生态，与 Agent Skills 标准的兼容与竞争将决定技能分发的未来格局
- **[CLI-Anything](https://github.com/HKUDS/CLI-Anything)** — “让所有软件 Agent 原生化”是 MCP 之后的又一基础设施级叙事，HKUDS 连续多个爆款（nanobot、Vibe-Trading、DeepTutor）
- **[claude-mem / OpenViking](https://github.com/volcengine/OpenViking)** — Agent 持久记忆方向：开源社区与字节等大厂同时重注，上下文管理是明年 Agent 落地的关键瓶颈
- **[minimind](https://github.com/jingyaogong/minimind)** — 2 小时训练个人 LLM，教育 + 动手实践的最佳入口，今日 +828 stars 验证长青价值

---
*数据来源：GitHub Trending（2026-11-24）+ GitHub Search API（7 日活跃，topic: ai-agent / llm / llm-model / vector-db / rag / ml）*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*