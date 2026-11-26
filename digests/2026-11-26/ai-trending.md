# AI 开源趋势日报 2026-11-26

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-26 02:49 UTC

---

# AI 开源趋势日报（2026-11-26）

## 第一步：AI 相关性过滤

**Trending 榜单中排除的非 AI 项目（3 个）：**
- nginx/nginx — Web 服务器基础设施
- toeverything/AFFiNE — 通用知识库/白板工具（AI 相关性弱，仅宣传语含协作概念）
- XiaoYouChR/Ghost-Downloader-3 — 通用下载器（无 AI 功能描述）

**保留 13 个 AI 相关项目**（含弱相关的 OpenVINO、AFFiNE 边缘案例已做取舍）。

---

## 第二步：分类结果

| 类别 | Trending 项目 | 主题搜索项目（补充） |
|---|---|---|
| 🤖 智能体/工作流 | superpowers、CLI-Anything、cursor/plugins、stitch-skills、opensre、app-store-compliance、diagram-design、last30days-skill | ECC、hermes-agent、AutoGPT、langgraph、atomic-agents |
| 🔧 基础工具 | Claude-BugHunter、firecrawl、openvino | ollama、langchain、open-webui、caveman、headroom |
| 🧠 大模型/训练 | minimind | transformers、LLMs-from-scratch、tiny-llm、stable-pretraining |
| 🔍 RAG/知识库 | — | ragflow、mem0、crawl4ai、PageIndex、OpenViking、Milvus、qdrant |
| 📦 AI 应用 | autoclip | claude-mem、MoneyPrinterTurbo、TradingAgents、ppt-master、daily_stock_analysis |

---

## 1. 今日速览

今日 Trending 榜单呈现出**"Agent Skills 生态大爆发"**的鲜明格局：13 个 AI 相关项目中，约半数是面向 Claude Code / Codex / Cursor 等编码智能体的技能包（skills）、插件规范或适配框架，Agent Skills 开放标准正在成为事实上的跨平台分发协议。教育侧的 minimind（2 小时训练 64M 模型）持续霸榜，中国社区“从零训练”需求旺盛。AI 视频剪辑工具 AutoClip 上榜，AI 应用层正向内容创作垂直场景纵深发展。基础设施侧，firecrawl 双榜齐名（今日 +1135），Agent 数据供给层竞争白热化。

---

## 2. 各维度热门项目

### 🤖 AI 智能体/工作流

- **[obra/superpowers](https://github.com/obra/superpowers)** ⭐ 今日 +903 — Agent Skills 框架 + 软件开发方法论，技能市场化的代表，今日新增近千星。
- **[HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)** ⭐ 今日 +1106 — “让所有软件 Agent-Native”，为存量软件生成 CLI 接口，HKUDS 又一爆款。
- **[cursor/plugins](https://github.com/cursor/plugins)** ⭐ 今日 +416 — Cursor 官方插件规范落地，IDE 巨头正式开放扩展生态。
- **[google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)** ⭐ 今日 +355 — Google Labs 出品，明确宣称遵循 Agent Skills 开放标准，多智能体平台兼容。
- **[Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre)** ⭐ 今日 +348 — CI/CD 可靠性开源 Agent，SRE 场景 agent 化新方向。
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** ⭐ 310,772 — Agent harness 性能优化系统（技能/本能/记忆），主题榜 llm 类第一。
- **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** ⭐ 266,139 — “与你共同成长的 Agent”，强调持续陪伴与演化。

### 🔧 AI 基础工具

- **[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)** ⭐ 今日 +1652（今日榜首）— 85 个技能、681 个披露报告模式的 Claude Code 安全测试技能包，红队 + Agent 结合的爆款。
- **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)** ⭐ 210,126，今日 +1135 — 550+ 数据源统一 API，Agent 的“知识基础设施”，双榜齐飞。
- **[mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)** ⭐ 今日 +945 — 跨 Reddit/X/YouTube/HN/Polymarket 的研究技能 + 事实合成。
- **[openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino)** ⭐ 今日 +191 — Intel 推理优化工具包，端侧部署长期主力。
- **[ollama/ollama](https://github.com/ollama/ollama)** ⭐ 188,143 — 本地模型运行事实标准，新增 Kimi/GLM/MiniMax 等国产模型支持。
- **[JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)** ⭐ 122,889 — 本地代理压缩 Agent token 消耗，“few token do trick”。

### 📦 AI 应用

- **[zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip)** ⭐ 今日 +880 — 长视频一键转短视频（字幕/封面/文案），适配抖音/TikTok/Reels，AI 内容工业化。
- **[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)** ⭐ 145,733 — 关键词生成短视频，AI 内容变现标杆。
- **[TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)** ⭐ 123,780 — 多智能体金融研究框架。
- **[hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)** ⭐ 80,235 — 生成原生 PowerPoint（含动画与图表）。
- **[mjmirza/app-store-compliance](https://github.com/mjmirza/app-store-compliance)** ⭐ 今日 +858 — 应用商店合规守卫，含 EU AI Act 期限跟踪，垂直合规 + Agent 技能结合。

### 🧠 大模型/训练

- **[jingyaogong/minimind](https://github.com/jingyaogong/minimind)** ⭐ 71,047，今日 +826 — 2 小时从 0 训练 64M LLM，中文社区最佳教育项目，长期霸榜。
- **[rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)** ⭐ 109,059 — PyTorch 逐步实现 ChatGPT 级模型，全球经典教材。
- **[skyzh/tiny-llm](https://github.com/skyzh/tiny-llm)** ⭐ 5,812 — Apple Silicon 上手写 tiny vLLM，理解推理系统的最佳路径。
- **[galilai-group/stable-pretraining](https://github.com/galilai-group/stable-pretraining)** ⭐ 354 — 基础模型预训练库，工程可靠性导向。

### 🔍 RAG/知识库

- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)** ⭐ 94,721 — Agent 原生数据库，RAG 引擎向上下文基础设施演进。
- **[mem0ai/mem0](https://github.com/mem0ai/mem0)** ⭐ 69,482 — Agent 记忆层事实标准。
- **[unclecode/crawl4ai](https://github.com/unclecode/crawl4ai)** ⭐ 87,926 — 开源爬虫 + 托管云双模式，与 firecrawl 正面竞争。
- **[VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex)** ⭐ 40,790 — “无向量、基于推理”的文档索引，反主流路线值得关注。
- **[volcengine/OpenViking](https://github.com/volcengine/OpenViking)** ⭐ 42,796 — 字节出品，记忆/RAG/技能统一的自演化上下文数据库。

---

## 3. 趋势信号分析

**信号一：Agent Skills 已成为新的分发协议。** 今日热榜上 superpowers、Claude-BugHunter、stitch-skills、app-store-compliance、last30days-skill 均为“技能包”形态，且多家明确宣称兼容 Agent Skills 开放标准（跨 Claude Code、Codex、Cursor、Gemini CLI）。cursor/plugins 官方规范的上榜印证：IDE 巨头正主动拥抱这一标准，技能生态与 2023-2024 年的 MCP 热潮高度同构，且竞争焦点从“工具协议”上移到“知识/流程复用层”。

**信号二：安全 + Agent 交叉赛道出现爆发信号。** Claude-BugHunter 单日 +1652 star 居全榜第一，红队技能包（漏洞模式库 + 企业身份攻击矩阵）表明社区对 Agent 执行安全测试的需求快速成熟。

**信号三：中国社区双线发力。** 一侧是教育向（minimind 持续高热度），一侧是内容创作工业化（autoclip、ppt-master、daily_stock_analysis），呈“学习 + 变现”双轮驱动格局；HKUDS 连续产出 CLI-Anything、Vibe-Trading 等爆款。

**信号四：Token 经济学成为显学。** caveman、headroom、claude-mem 均聚焦上下文压缩/持久化，说明 Agent 成本优化已从技巧演进为独立基础设施赛道。

---

## 4. 社区关注热点

- **[Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)** — 今日 star 增速第一；观察技能包如何结构化封装专业知识（681 个真实披露漏洞模式）。
- **[CLI-Anything](https://github.com/HKUDS/CLI-Anything)** — "Agent-Native 软件"是存量工具智能化的重要路线，HKUDS 系产品命中率极高。
- **Agent Skills 开放标准生态（superpowers / stitch-skills / cursor/plugins）** — 跨 Agent 平台的技能分发标准正在成型，提前布局兼容可获得生态红利。
- **[PageIndex](https://github.com/VectifyAI/PageIndex)** — 无向量、推理式 RAG 的反主流路线，可能代表 RAG 架构的下一轮范式争论。
- **[OpenViking](https://github.com/volcengine/OpenViking)** — 字节入场上下文数据库，记忆 + RAG + 技能统一化值得与企业级选型一起评估。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*