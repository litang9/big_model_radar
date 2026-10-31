# AI 开源趋势日报 2026-11-01

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-10-31 23:21 UTC

---

# AI 开源趋势日报（2026-11-01）

## 一、今日速览

1. **Coding Agent 周边生态全面爆发**：今日热榜 14 席中过半与 AI 编码智能体相关，claude-mem、skills、superpowers 等围绕 Claude Code / Codex 等 CLI Agent 的“外挂层”项目集中上榜，标志 Agent Harness 已成为独立品类。
2. **“Skills 框架”成为新叙事**：mattpocock/skills、obra/superpowers、ECC 等项目共同指向同一方向——为编码智能体注入可复用的工作方法论与技能库。
3. **Agent 记忆与上下文压缩赛道升温**：claude-mem（今日 +1723）、headroom、mem0、OpenViking 等跨榜单出现，上下文持久化被视作 Agent 落地的关键瓶颈。
4. **多智能体桌面化/垂直化**：Orkas（16 个内置专家 Agent 的本地桌面团队）、Claude-Code-Game-Studios（49 个游戏开发 Agent）显示多智能体正从框架走向开箱即用产品。
5. **国产/中文 AI 项目持续活跃**：紫微斗数排盘引擎、daily_stock_analysis、CowAgent、JeecgBoot 等在垂类应用层表现亮眼。

---

## 二、筛选与分类结果

> Trending 榜单剔除非 AI 项目：pingdotgg/t3code（T3 脚手架）、Renhuai123/ziwei-doushu（传统命理算法，无 ML 成分）、bregman-arie/devops-exercises（面试题库）、vorssaint/vorssaint-utils（macOS 工具集）。主题搜索剔除：Developer-Y/cs-video-courses（课程列表）、microsoft/multilspy（通用 LSP 库）、thedaviddias/Front-End-Checklist（弱相关，略）、netdata、tesseract 等泛工具（保留在 ML 基础设施中酌情列示）。

### 🔧 AI 基础工具（框架、SDK、推理引擎、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐185.5k | 本地大模型运行事实标准，支持 Kimi、GLM、DeepSeek、gpt-oss、Qwen 等 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | ⭐168.4k | 模型定义与训练/推理框架，生态基石 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | ⭐148.8k | Agent 工程平台，LLM 应用开发核心框架 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | ⭐157.4k | 最流行的自托管 AI 界面，兼容 Ollama/OpenAI API |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | ⭐0（**今日 +1339**） | 给编码 Agent 的“设计词汇表”，用规范约束 Agent 产出、审查 AI slop，Rust 编写，今日爆发 |
| [can1357/oh-my-pi](https://github.com/can1357/oh-my-pi) | ⭐37.3k | IDE 深度集成的终端编码 Agent |
| [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale) | ⭐41.2k | Rust 编写的开源终端 Agent，任意模型/提供商 |
| [lightpanda-io/browser](https://github.com/lightpanda-io/browser) | ⭐0（**今日 +929**） | 专为 AI 与自动化设计的无头浏览器（Zig），Agent 浏览基础设施 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | ⭐9.0k | Rust 生态模块化 LLM 应用框架 |

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐107.8k（**今日 +1723**） | 跨会话持久上下文层，AI 压缩会话记录并注入未来会话，兼容所有主流编码 Agent，今日热榜第一 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | ⭐0（**今日 +882**） | TS 名师 Matt Pocock 的 .agents 技能目录开源，“Skills for Real Engineers” 引发方法论讨论 |
| [obra/superpowers](https://github.com/obra/superpowers) | ⭐0（**今日 +663**） | Agent 技能框架 + 软件开发方法论，Skills 生态另一核心玩家 |
| [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) | ⭐0（**今日 +724**） | 49 个 AI Agent + 72 个工作流技能，模拟真实游戏工作室层级，垂直多智能体编排样板 |
| [Orkas-AI/Orkas](https://github.com/Orkas-AI/Orkas) | ⭐0（**今日 +1118**） | 本地优先的开源桌面 AI 团队：Commander 拆解目标，调度 16 个专家 Agent 及外部 CLI |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐294.0k | Agent Harness 性能优化系统：技能、直觉、记忆、安全，覆盖 Claude Code/Codex/Cursor |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐259.2k | “与你一起成长的 Agent”，通用个人智能体标杆 |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | ⭐44.2k | 构建高鲁棒性 Agent 的图编排框架 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | ⭐197.4k | 面向 Agent 的网页数据获取层 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | ⭐119.7k | AI 浏览器 Agent 库事实标准 |

### 📦 AI 应用（垂直场景）

| 项目 | Stars | 说明 |
|---|---|---|
| [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | ⭐0（**今日 +1304**） | 开源 Grok Bot 替代品，含供 Bot 使用的虚拟机，今日新增超 1300 星 |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | ⭐52.8k（**今日 +1035**） | 港大开源终身个性化 AI 导师，教育与 RAG 双热榜 |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | ⭐0（**今日 +115**） | 清华多智能体交互课堂，一键沉浸式多 Agent 学习体验 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐71.6k | 文档/主题 → 原生 PowerPoint（含动画、图表、语音旁白） |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | ⭐136.9k | AI 一键生成高清短视频，内容自动化长青项目 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | ⭐79.1k | AI 求职 Agent：扫描岗位、简历打分、定制 ATS 简历 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | ⭐67.3k | LLM 多市场股票分析，零成本定时运行 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | ⭐119.0k | 多智能体 LLM 金融交易框架 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | ⭐105.0k | 深度学习训练基石框架 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | ⭐201.3k | 老牌 ML 框架 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐107.6k | PyTorch 从零实现 ChatGPT 级 LLM，教育类顶流 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | ⭐64.7k | 2 小时训练 64M 参数 LLM，中文社区训练入门首选 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | ⭐63.0k | YOLO 系列目标检测，CV 工业标准 |
| [labmlai/annotated_deep_learning_paper_implementations](https://github.com/labmlai/annotated_deep_learning_paper_implementations) | ⭐67.6k | 60+ 论文带注释实现 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | ⭐7.6k | LLM 评测平台，覆盖 100+ 数据集 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | ⭐5.5k | Apple Silicon 上构建 tiny vLLM，推理系统学习佳作 |

### 🔍 RAG/知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [langgenius/dify](https://github.com/langgenius/dify) | ⭐160.1k | Agentic 工作流 + RAG 一体化协作平台 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | ⭐93.3k | RAG 引擎 + Agent 能力的 LLM 上下文层 |
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | ⭐86.7k | 面向 LLM 的爬虫，任意网站转干净 Markdown |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | ⭐78.5k | LLM 输入压缩库：编码 Agent 省 20%、JSON 省 60-95% token |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐68.2k | Agent 记忆基础设施，生产级 drop-in 方案 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | ⭐41.2k | 字节开源自进化上下文数据库：记忆 + RAG + 技能统一 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐39.9k | 无向量、推理式 RAG 文档索引，挑战向量范式 |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | ⭐40.5k | 轻量快速 RAG（EMNLP2025），港大系列 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | ⭐13.7k | MLSys2026 最佳论文：省 97% 存储的本地隐私 RAG |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | ⭐33.0k | 开源 Agent 长期记忆平台 |

---

## 三、趋势信号分析

**1. Agent Harness 生态是绝对主线。** 今日热榜近 2/3 项目服务于编码智能体，且高度集中在三类外挂能力：**记忆**（claude-mem）、**技能**（skills、superpowers、Claude-Code-Game-Studios）、**产出质量约束**（impeccable 反 AI slop）。这表明社区共识从“用什么 Agent”转向“如何让 Agent 可持续、可控地工作”。

**2. Skills 成为新兴技术栈。** 多个项目（ECC、superpowers、mattpocock/skills、Graphify）不约而同采用 `.agents` 技能目录 + Shell 描述的形态，一个跨 CLI Agent 通用的“技能包”事实标准正在自发形成，值得类比早期的 Dockerfile/MCP 时刻。

**3. 上下文经济驱动新基建。** headroom（token 压缩）、claude-mem（会话压缩）、OpenViking（上下文数据库）、PageIndex（无向量 RAG）共同指向“上下文是最贵资源”这一前提，压缩与持久化是 Token 成本高企下的直接对策，与主流模型长上下文定价策略密切相关。

**4. 多智能体从框架走向产品化。** Orkas（桌面 16 Agent 团队）、OpenMAIC（多 Agent 课堂）、Game-Studios（49 Agent 工作室）说明编排层已封装到“开箱即用”阶段，垂直行业模板是下一竞争点。

**5. 无关项目（命理排盘、DevOps 题库）混入热榜**，提醒 Trending 数据需持续做 AI 相关性过滤。

---

## 四、社区关注热点

- **[claude-mem](https://github.com/thedotmack/claude-mem)**：今日 +1723 星登顶，跨所有主流编码 Agent 的记忆层，Agent 记忆赛道的风向标。
- **[mattpocock/skills](https://github.com/mattpocock/skills) + [superpowers](https://github.com/obra/superpowers)**：Skills 生态双子星，关注其是否演化为 Agent 技能的事实标准格式。
- **[impeccable](https://github.com/pbakaus/impeccable)**：Rust 编写的 Agent 设计规范与 AI slop 审计工具，+1339 星，“约束 Agent 审美”是差异化新角度。
- **[headroom](https://github.com/headroomlabs-ai/headroom)**：LLM 输入压缩（JSON 场景省 60-95% token），降本刚需，工程师可直接集成（库/代理/MCP 三形态）。
- **[OpenViking](https://github.com/volcengine/OpenViking)**：字节开源的自进化上下文数据库，统一记忆、RAG 与技能，大厂入场 Agent 记忆赛道的信号。

---
*数据来源：GitHub Trending（2026-11-01）+ GitHub Search API 主题搜索；总 stars 为搜索接口快照，Trending 新增为当日实时数据。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*