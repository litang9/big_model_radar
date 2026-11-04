# AI 开源趋势日报 2026-11-04

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-04 00:35 UTC

---

# AI 开源趋势日报 · 2026-11-04

## 一、今日速览

今日 GitHub Trending 几乎被 AI Agent 生态“全包揽”：13 个热榜项目中 11 个与 AI 直接相关。**Agent 基础设施**（记忆持久化、桌面操控、并行工作流）成为最热方向，[claude-mem](#) 和 [Claude-Code-Game-Studios](#) 单日新增 stars 均破千。**本地推理**出现黑马——纯 C 编写的 MoE 分层推理引擎 colibri 引发热议，反映“消费级硬件跑前沿模型”的需求持续升温。此外，模型行为修改（去审查/去谄媚）和金融领域基础模型也进入视野，显示 AI 开源正从“通用能力”转向“可控性与垂直化”。

---

## 二、筛选结果

**Trending 榜单过滤**（排除非 AI 项目）：
- ❌ 排除：`floci-io/floci`（AWS 本地模拟器，通用云工具）、`D4Vinci/Scrapling`（通用爬虫框架，AI 相关性弱）、`spotify/portal-ai-plugins`（描述缺失且 stars 增长低，存疑，暂不纳入重点分析）

---

## 三、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) | **+3791 today** 🔥 | Rust 编写的 Computer Use CLI，让 AI Agent 直接操控桌面；今日全榜第一，Vercel 官方出品，标志 Agent 与 OS 交互层的标准化竞争开启 |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | +802 today | 纯 C 实现的 MoE 分层推理引擎：热专家驻 GPU、温专家进内存、冷专家从 NVMe 流式加载，让消费级硬件跑前沿 MoE 模型 |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | +438 today | 为并行 AI Agent 工作流设计的 Git worktree 管理 CLI，“多 Agent 并行开发”的配套工具链正在成型 |
| [anomalyco/hex](https://github.com/anomalyco/hex) | +410 today | 跨平台本地语音听写工具，本地 AI 语音输入的轻量级方案 |
| [ollama/ollama](https://github.com/ollama/ollama) | 185,817 | 本地 LLM 运行事实标准，已支持 Kimi、GLM、DeepSeek、Qwen 等国产/开源模型 |
| [thedaviddias/Front-End-Checklist](https://github.com/thedaviddias/Front-End-Checklist) | 74,643 | 老牌前端清单项目转型"for humans and AI agents"，传统工程规范资产正被改造为 Agent 可消费格式 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars | 说明 |
|---|---|---|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 111,886，**+1139 today** 🔥 | 跨会话持久记忆层：捕获 Agent 会话全程、AI 压缩、按需注入上下文，兼容 Claude Code/Codex/Gemini 等主流 Coding Agent |
| [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) | **+1182 today** 🔥 | 把 Claude Code 变成“游戏工作室”：49 个 AI Agent + 72 个技能 + 仿真实工作室层级的协调系统，多 Agent 组织化编排的典型样本 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | **+1164 today** 🔥 | TypeScript 知名教育者 Matt Pocock 的个人 Agent Skills 集合，"Skills 生态”正成为 Coding Agent 的标配扩展机制 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 260,254 | 主题搜索榜首，“与你共同成长的 Agent"，个人 Agent 赛道头部项目 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 296,559 | Agent Harness 性能优化系统：技能、本能、记忆、安全一体化，横跨 Claude Code/Codex/Cursor |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | 108,439 | 给 Agent 装上“看全互联网的眼睛”，一条 CLI 读遍 Twitter/Reddit/B站/小红书，零 API 费用 |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | 38,494 | Agent 前端框架 + AG-UI 协议制定者，Generative UI 方向的代表 |

### 📦 AI 应用（垂直场景解决方案）

| 项目 | Stars | 说明 |
|---|---|---|
| [Usagi-org/ai-goofish-monitor](https://github.com/Usagi-org/ai-goofish-monitor) | +228 today | AI + Playwright 的闲鱼多任务监控与智能分析系统，中文二手交易场景的典型 Agent 应用 |
| [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) | +503 today | 金融市场“语言”基础模型，AI 金融垂直化的代表，今日登榜 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 73,087 | 文档/主题 → 原生 PowerPoint（含动画、图表、语音旁白），AI 办公内容生成的高完成度方案 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 67,505 | LLM 驱动多市场股票分析，与 Kronos 一同印证 AI+金融的热度 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | 79,869 | AI 求职 Agent：扫岗、打分、定制简历、追踪投递，个人效率 Agent 的爆款方向 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 138,327 | 一键生成高清短视频的自动化 AI 工作流 |

### 🧠 大模型/训练（模型、训练与修改工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [p-e-w/heretic](https://github.com/p-e-w/heretic) | **+701 today** 🔥 | 免训练的模型行为修改：去审查、抑制 AI 腔、减少谄媚——"模型对齐可编辑性”话题的争议性爆款 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 107,770 | PyTorch 从零实现 ChatGPT 级 LLM，AI 教育长青项目 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,534 | 在 Apple Silicon 上自建 mini vLLM + Qwen，面向系统工程师的推理系统教学 |
| [datamllab/OpenEBFM](https://github.com/datamllab/OpenEBFM) | 248 | 能量基座模型（EBFM）开源训练代码，新范式早期项目 |

### 🔍 RAG/知识库（检索增强、向量数据库、记忆）

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 141,851 | 把整个代码库+文档变成可查询知识图谱，无向量库的确定性 AST 方案，RAG 范式之争的新变量 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 68,349 | Agent 记忆层基础设施，与今日热榜 claude-mem 呼应——记忆是本周关键词 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | 39,966 | "Vectorless"、基于推理的文档索引 RAG，去向量化的另一条路线 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 41,461 | 字节出品：Agent 自进化上下文数据库，统一记忆、知识与技能 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | 13,763 | MLSys 2026 最佳论文，个人设备上省 97% 存储的私有 RAG |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 93,447 | Agent 原生 RAG 数据库，向上下文基础设施演进 |

---

## 四、趋势信号分析

**1. Agent 记忆与上下文持久化正在爆发。** claude-mem 单日 +1139，叠加 mem0、OpenViking、headroom（token 压缩）等高星项目同场活跃，“Agent 会话间失忆”被社区视为当前最痛的工程短板，记忆层正从附加功能升级为独立基础设施赛道。

**2. Agent 工具链全面“操作系统化”。** agent-desktop（桌面操控）、worktrunk（并行 worktree）、skills 生态、ECC/ponytail 等 Harness 优化项目齐登热榜——Coding Agent 的竞争已从“谁的模型强”转移到“谁的工程环境好”，一套围绕 Agent 的类 IDE 工具栈正在成型。

**3. 反向量化的 RAG 新范式与本地推理下沉。** colibri（C 语言 MoE 分层推理）和 LEANN/PageIndex（vectorless RAG）共同指向“低成本、消费级硬件、确定性优先”的技术审美，与云端大参数路线形成对冲。

**4. 模型可控性话题出圈。** heretic（免训练去审查/去谄媚）引发关注，反映用户对模型“出厂性格”的不满与 DIY 对齐诉求，此类项目或将持续伴随监管与安全讨论升温。

---

## 五、社区关注热点

- **[vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop)**（+3791 today）— 今日现象级项目，Computer Use 标准化竞争的关键玩家，值得关注其与 Anthropic/MCP 生态的整合方式
- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** — 横跨所有主流 Coding Agent 的通用记忆层，若形成事实标准将影响整个 Agent 工具链
- **[JustVugg/colibri](https://github.com/JustVugg/colibri)** — 纯 C 的 MoE 冷热分层推理，个人开发者挑战工业级推理引擎的野心之作，技术路线值得跟踪
- **[Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios)** — “Agent 组织架构设计”的最佳参考样本，多 Agent 协调模式的实战教科书
- **方向：Agent Skills 生态**（[mattpocock/skills](https://github.com/mattpocock/skills)、graphify、ECC）— Skills 正成为 Claude Code/Codex/Cursor 之后的下一个可移植扩展格式，早期参与红利明显

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*