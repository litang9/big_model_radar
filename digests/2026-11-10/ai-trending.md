# AI 开源趋势日报 2026-11-10

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-10 02:43 UTC

---

# 📰 AI 开源趋势日报 · 2026-11-10

## 一、今日速览

今日 GitHub Trending 被“Agent 生态工具”全面占领：Anthropic 官方 [skills](https://github.com/anthropics/skills) 仓库登榜（+1038），标志着 **Agent Skills 正在成为新的平台级标准**。Vercel 的 [agent-browser](https://github.com/vercel-labs/agent-browser)（+916）和 Meta 的 "agent ready" 设计系统 [astryx](https://github.com/meta/astryx)（+3278）显示主流大厂均在为 Agent 时代重造基础设施。搜索榜上，“Agent 记忆/上下文压缩/Token 优化”类项目（claude-mem、headroom、caveman、mem0）star 总量惊人，**上下文工程（Context Engineering）已成 RAG 之后的下一个主战场**。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、CLI、开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [anthropics/skills](https://github.com/anthropics/skills) | +1038 today | Anthropic 官方 Agent Skills 公共仓库，Agent 能力标准化的一手风向标 |
| [meta/astryx](https://github.com/meta/astryx) | +3278 today | Meta 开源的"agent ready"设计系统，暗示 UI 层正为 Agent 消费而设计 |
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | +916 today | Rust 编写的 Agent 浏览器自动化 CLI，补齐 Agent 操控 Web 的关键一环 |
| [anthropics/claude-quickstarts](https://github.com/anthropics/claude-quickstarts) | +551 today | Claude API 快速上手官方示例集 |
| [ollama/ollama](https://github.com/ollama/ollama) | 186k | 本地推理事实标准，已支持 gpt-oss、GLM、Kimi、MiniMax 等新一代开源模型 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 168k | 模型定义框架基石，文本/视觉/多模态训练推理全覆盖 |
| [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale) | 41k | Rust 编写的终端开源 Coding Agent，任意模型可用 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 9k | Rust 生态模块化 LLM 应用框架 |

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | +1587 today | 开源 Grok Bot 替代品，内置 Bot 可用的虚拟机，今日最热 Agent 应用 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 262k | "与你一起成长的 Agent"，Agent Harness 赛道头部项目 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 300k | Agent Harness 性能优化系统：Skills + 本能 + 记忆 + 安全 |
| [garrytan/gbrain](https://github.com/garrytan/gbrain) | +216 today | Garry Tan（YC 总裁）个人的 OpenClaw/Hermes Agent "大脑”，名人效应带动关注 |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 44k | 构建高韧性 Agent 图工作流的主流框架 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | 47k | 个人 AI 助手 + Agent Harness，带记忆自进化，一行安装 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | 120k | AI 浏览器 Agent 库的事实标准 |

### 📦 AI 应用（垂直场景）

| 项目 | Stars | 说明 |
|---|---|---|
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 68k / +506 today | LLM 驱动多市场股票分析，双榜齐热，LLM 金融分析持续火爆 |
| [homeassistant-ai/ha-mcp](https://github.com/homeassistant-ai/ha-mcp) | +31 today | 用 Claude/ChatGPT 配置和自动化 Home Assistant，MCP × 智能家居落地 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 121k | 多智能体 LLM 金融交易框架 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 75k | 文档/主题 → 原生 PowerPoint，AI 办公生产力代表 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | 81k | 本地运行的 AI 求职 Agent，简历匹配 + 自动投递辅助 |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | 110k | 一条 CLI 让 Agent 读取全网社交平台，零 API 费用 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 108k | 从零用 PyTorch 实现 LLM，AI 学习类顶流 |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | 78k | AI 工程从零学起，呼应 AI Engineer 岗位需求爆发 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | 105k | 深度学习训练框架基石 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | 63k | YOLO27/26 系列视觉模型，边缘检测持续迭代 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7.5k | LLM 评测平台，覆盖 100+ 数据集 |
| [acon96/home-llm](https://github.com/acon96/home-llm) | 1.4k | 本地 LLM 控制智能家居的模型 + 集成方案 |

### 🔍 RAG/知识库/记忆

| 项目 | Stars | 说明 |
|---|---|---|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 115k | 跨会话持久上下文，适配 Claude Code/Codex/Gemini 等全部主流 Agent |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 145k | 代码库 → 可查询知识图谱，"无向量库”的确定性 RAG 新范式 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 68k | Agent 记忆基础设施的生产级标准方案 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | 79k | 工具输出/RAG 分块预压缩，JSON 场景省 60-95% token |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 93k | Agent 原生 RAG 引擎，演进为上下文基础设施 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 41k | 字节跳动自进化上下文数据库，统一记忆/RAG/Skills |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | 33k | 开源 Agent 长期记忆平台 |

> **过滤说明**：sherlock（社工工具）、mujoco（物理仿真）、RuView（WiFi 传感）、cs-video-courses（课程列表）、netdata（监控）等与 AI/ML 无直接关联，已略去。

---

## 三、趋势信号分析

**① Agent Skills 标准化成为平台级事件。** 今日榜上 anthropics/skills（+1038）与多个 "Agent Harness" 项目（ECC、hermes-agent、gbrain）同时活跃，说明社区已从"造 Agent”转向“给 Agent 装可插拔技能”，Skills 正在复刻当年 Plugin/App Store 的生态位。

**② 上下文工程接过 RAG 的接力棒。** claude-mem（115k）、mem0、headroom、caveman（118k，用“原始人语风”砍 65% token）集体爆发，"持久记忆 + 上下文压缩 + Token 优化”三件套是当下最确定的增量赛道；同时 Graphify 的“无向量、AST 确定性知识图谱”路线对传统向量 RAG 构成挑战。

**③ 大厂全面押注 Agent 基建。** Meta（astryx，+3278）、Vercel（agent-browser）、Anthropic（双仓上榜）同日登榜，浏览器自动化、设计系统、Skills 三层同步 Agent 化，行业从模型竞争转入生态竞争。垂直应用端 LLM 金融（daily_stock_analysis、TradingAgents、Vibe-Trading）热度居高不下，与近期开源模型推理成本下降直接相关。

---

## 四、社区关注热点

- **[anthropics/skills](https://github.com/anthropics/skills)** — Agent Skills 官方标准仓库，是判断 Anthropic 生态方向的唯一一手信源，建议 Watch。
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** — “代码库 → 知识图谱、零向量库”的 RAG 新范式，可能改变企业知识检索的技术选型。
- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)** — Token 成本优化的系统性方案（库 + 代理 + MCP 三形态），Coding Agent 团队降本的直接抓手。
- **[vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)** — Rust 实现的 Agent 浏览器 CLI，与 browser-use 形成竞争，Web Agent 基建的关键拼图。
- **[volcengine/OpenViking](https://github.com/volcengine/OpenViking)** — 字节的“自进化上下文数据库”，记忆/RAG/Skill 一体化，国内大厂在 Agent 中间层最有野心的尝试。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*