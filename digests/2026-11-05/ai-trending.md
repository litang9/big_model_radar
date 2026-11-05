# AI 开源趋势日报 2026-11-05

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-05 00:53 UTC

---

# 《AI 开源趋势日报》2026-11-05

## 一、今日速览

今日 GitHub Trending 被“Agent 基础设施”全面占领：NVIDIA 的 auto-ontology（+2050）和 Vercel 的 agent-desktop（+2470）领跑榜单，说明大厂正密集押注 Agent 的“知识层”与“桌面操作层”。Agent 记忆与上下文持久化成为新战场，claude-mem 今日 +1172（总量已达 11.3 万 stars）并同时在 RAG 主题榜活跃。此外，“Agent Skills 生态”爆发，mattpocock/skills 与 gstack 代表个人化 Agent 技能配置正在形成新的分享文化。压轴的是 kimi-k3-in-c——2.78 万亿参数模型跑进 8.24GB 内存的单 CPU 推理，极简 C 实现引发轰动。

---

## 二、各维度热门项目

### 🔧 AI 基础工具

| 项目 | Stars | 说明 |
|---|---|---|
| [vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) | +2470 today | Computer use CLI，让 AI Agent 操控桌面；今日热榜第一，Vercel 正式入场 computer use 赛道 |
| [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c) | +351 today | 纯 C99、无 BLAS/无 GPU，将 2.78T 参数 Kimi K3 在 8.24GB RAM 单 CPU 上推理，极限工程示范 |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | +531 today | Rust 编写的 Git worktree 管理 CLI，专为并行多 Agent 工作流设计——Agent 时代的新型开发基建 |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | +2005 today | 高性能爬虫框架，是 Agent 数据获取链路的核心供给端 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | ⭐117,513 | 病毒式传播的 token 压缩代理，“原始人说话”砍掉 65% token，成本优化的另类解法 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | ⭐9,065 | Rust LLM 应用框架，非 Python 生态的头部选择 |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | ⭐559 | 统一 LLM 网关：一个 API 对接所有厂商，多提供商负载均衡 |

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [mattpocock/skills](https://github.com/mattpocock/skills) | +1379 today | 知名 TS 教育者 Matt Pocock 的个人 Agent Skills 集合，"Skills for Real Engineers" 引发配置分享热潮 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐112,857 / +1172 today | 跨会话持久上下文，兼容 Claude Code、Codex、Gemini 等十余个 Agent，记忆赛道事实标准之一 |
| [garrytan/gstack](https://github.com/garrytan/gstack) | +290 today | YC 掌门人公开自己的 Claude Code 配置：23 个扮演 CEO/设计师/QA 的工具集 |
| [scenario-labs/skills](https://github.com/scenario-labs/skills) | +224 today | 让 Agent 调度图像/视频/3D 模型生产的 MCP Skills，含 Blender/Maya/Unreal 专家团队 |
| [github/spec-kit](https://github.com/github/spec-kit) | +808 today | GitHub 官方规格驱动开发（SDD）工具包，与 Agent 工作流天然契合 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐297,256 | Agent harness 性能优化系统：skills、instincts、memory、安全一体化 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐260,565 | "与你一起成长的 Agent"，开源个人智能体头部项目 |

### 📦 AI 应用

| 项目 | Stars | 说明 |
|---|---|---|
| [NVIDIA/auto-ontology](https://github.com/NVIDIA/auto-ontology) | +2050 today | 语义图谱推理层框架，为 LLM/Agent 提供确定性查询与可解释性；NVIDIA 出品，今日最热 AI 项目之一 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | ⭐138,965 / +617 today | 一键生成高清短视频的 AI 工作流，双榜（Trending + LLM 主题）在列，持续火爆 |
| [Thysrael/Horizon](https://github.com/Thysrael/Horizon) | +121 today | AI 新闻雷达，中英双语每日简报，个人信息流 Agent 典型应用 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | ⭐80,202 | 开源 AI 求职 Agent：扫描岗位、按简历打分、定制 ATS 简历，本地运行 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐73,504 | 文档/主题 → 原生 PowerPoint（含动画、图表、旁白），办公场景杀手级应用 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | ⭐67,565 | LLM 多市场股票分析系统，零成本定时运行 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐185,938 | 本地推理首选，已支持 Kimi、GLM、MiniMax、DeepSeek 等国产/开源模型 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | ⭐168,546 | 模型定义框架的事实标准，生态基石 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐107,824 | PyTorch 从零实现 ChatGPT 级 LLM，教育标杆 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | ⭐7,564 | 支持 100+ 数据集的 LLM 评测平台，模型迭代必备 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | ⭐5,554 | Apple Silicon 上自建 tiny vLLM + Qwen，推理系统学习佳作 |

### 🔍 RAG/知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [pathwaycom/serviette](https://github.com/pathwaycom/serviette) | ⭐58,727 | 无代码 RAG 服务器，答案与文档实时同步，兼容 8 种向量库 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | ⭐41,544 | 火山引擎“自进化上下文数据库”：统一 Agent 记忆、RAG 与技能，新范式代表 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐39,988 | 无向量、基于推理的文档索引，反潮流的 RAG 路线 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐142,452 | 代码库→知识图谱的 Claude Code/Cursor skill，无向量存储、AST 确定性解析 |
| [LEANN](https://github.com/StarTrail-org/LEANN) | ⭐13,771 | MLSys2026 最佳论文，存储节省 97% 的本地隐私 RAG |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | ⭐33,072 | Agent 长期记忆开源平台，小模型即可免费部署 |

> 已过滤的非 AI 项目：floci（AWS 本地模拟器）、DiscImageStudio、90DaysOfDevOps、Front-End-Checklist、tesseract（经典 OCR，非当前 AI 热点语境，仅列于过滤说明）等通用工具。

---

## 三、趋势信号分析

**1. Agent 上下文与记忆层正在成为独立赛道。** claude-mem（+1172）、OpenViking、cognee、mem0 在今日双榜同时活跃，说明“Agent 会话间失忆”已被社区视为核心痛点，记忆持久化、上下文压缩（headroom、caveman）构成完整产业链。

**2. "Skills 生态”是今日最强新信号。** mattpocock/skills（+1379）、gstack、scenario-labs/skills 同日登榜——个人/团队将 Agent 配置技能打包开源分享，正在形成类似 dotfiles 文化的新社区范式，Claude Code 是事实载体。

**3. 两大模型事件直接驱动热榜：** Kimi K3 发布催生 kimi-k3-in-c（极端 CPU 推理）并推高 ollama 对 Kimi 的支持关注度；NVIDIA 则以 auto-ontology 押注“可解释、确定性推理层”，是对纯 LLM 概率推理的工程化补强。

**4. 反向量库路线抬头：** PageIndex（无向量推理式 RAG）与 graphify（AST 确定性知识图谱）共同质疑“嵌入+向量检索”的必要性，与 auto-ontology 的图谱思路呼应，值得跟踪。

---

## 四、社区关注热点

- **[vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop)**（+2470）：computer use 从演示走向 CLI 实用工具，Vercel 入场意味着 Agent 桌面操作即将标准化。
- **[NVIDIA/auto-ontology](https://github.com/NVIDIA/auto-ontology)**（+2050）：本体+图谱+确定性查询，解决 LLM 幻觉与可解释性，企业级 Agent 落地的关键拼图。
- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)**（11.3 万 stars）：跨 Agent 通用记忆层，多工具用户的刚需，生态卡位价值高。
- **[FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c)**：量化+纯 C 推理的教科书级项目，Kimi K3 热度的最佳切入点，也预示“端侧跑万亿参数”叙事回归。
- **方向：Agent Skills 分享文化** —— mattpocock/skills 与 gstack 表明“晒 Agent 配置”正在成为新的涨粉/涨星方式，建议持续观察该形态是否沉淀为包管理标准。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*