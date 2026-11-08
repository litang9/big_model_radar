# AI 开源趋势日报 2026-11-09

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-08 23:41 UTC

---

# 📰 AI 开源趋势日报 · 2026-11-09

---

## 一、数据筛选说明

**Trending 榜单（9 个）中排除的非 AI 项目：**
- ❌ [sherlock-project/sherlock](https://github.com/sherlock-project/sherlock) — 社交账号追踪工具，非 AI 相关
- ❌ [google-deepmind/mujoco](https://github.com/google-deepmind/mujoco) — 物理仿真引擎，虽属 DeepMind 但本日趋势与 AI 无直接关联（注：具身智能场景下可作为配套工具）

**主题搜索结果中排除的项目：**
- ❌ Developer-Y/cs-video-courses — 计算机课程列表
- ❌ netdata/netdata — 可观测性平台，营销话术含 "AI-powered" 但核心非 AI

其余均保留，共约 80+ 个 AI 相关项目参与分类。

---

## 二、今日速览

1. **Agent Harness 生态全面爆发**：围绕 Claude Code / Codex / Cursor 等编码代理的“外挂层”工具（记忆、压缩、技能、知识图谱）成为增长最快的品类。
2. **上下文压缩成为本周最热主题**：Trending 上榜的 billion-context、热门的 caveman、headroom、claude-mem 共同指向“token 成本焦虑”，压缩类工具呈多点开花态势。
3. **Anthropic 双仓上榜**（claude-quickstarts、skills），配合 ECC 等技能 harness 项目，说明 Agent Skills 标准正在快速形成开发者生态。
4. **基础设施层 GPU Kubernetes**（NVKE）登榜，AI 算力调度向裸金属下沉是值得关注的信号。
5. **RAG 出现“反向量”新路线**：PageIndex（推理式 RAG）、Graphify（知识图谱）、OpenViking（自进化上下文库）正在挑战传统向量检索范式。

---

## 三、各维度热门项目

### 🔧 AI 基础工具（框架 / SDK / 推理 / CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [ollama/ollama](https://github.com/ollama/ollama) | 186,383 | 本地大模型运行事实标准，已覆盖 DeepSeek、GLM、Kimi、gpt-oss、Qwen 全系国产/开源模型 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 168,667 | 模型定义框架基石，训练推理一体的行业标准 |
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | +812 today | Rust 编写的 AI 代理浏览器自动化 CLI，与 browser-use 形成跨语言竞争 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 144,493 | 将任意代码库转为可查询知识图谱的编码代理技能，“无向量库”路线代表 |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | 560 | 统一 LLM 网关，多提供商翻译 + 智能负载均衡，轻量级替代商业网关 |
| [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale) | 41,159 | Rust 终端编码代理，任意 provider/model，开源 CLI 编码代理赛道持续升温 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | 319 | 端侧 LLM 推理 + X-Bit 量化，端侧推理值得关注的小而美项目 |

### 🤖 AI 智能体 / 工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 299,697 | 编码代理 harness 性能优化系统（技能/本能/记忆/安全），全榜第一，Agent 外挂层爆发的最佳例证 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 261,764 | “与你一起成长的代理”，开源社区版个人代理旗舰 |
| [anthropics/skills](https://github.com/anthropics/skills) | +793 today | Anthropic 官方 Agent Skills 仓库，技能标准生态的源头 |
| [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | +1437 today | 开源 Grok Bot 替代品，含供 bot 使用的虚拟机——个人 agent + 沙箱执行是新颖组合 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | 118,368 | 病毒式传播的“原始人说话”token 压缩技能+代理，省 65% token |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | 120,346 | Python 浏览器代理标准库，与今日上榜的 agent-browser 正面交锋 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149,218 | 定位已升级为"The agent engineering platform" |
| [can1357/oh-my-pi](https://github.com/can1357/oh-my-pi) | 38,261 | IDE 原生集成的编码代理，编码代理 IDE 化趋势代表 |

### 📦 AI 应用（垂直场景产品）

| 项目 | Stars | 说明 |
|---|---|---|
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | 110,301 | 一条 CLI 让 agent 读取全网（Twitter/Reddit/小红书/B站），零 API 费，增长迅猛 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | 81,193 | AI 求职代理：按 CV 打分岗位、定制简历、面试准备，本地运行 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 74,892 | 文档/主题转原生 PPT（含动画、图表、旁白），生产力场景标杆 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 121,375 | 多智能体金融交易框架，配合 Vibe-Trading、daily_stock_analysis，金融 AI 应用成集群 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 158,137 | 最流行的自托管 AI 界面 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 141,047 | 一键生成短视频的 AI 工作流，中文区明星项目 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | 47,839 | 个人 AI 助理 + Agent Harness，一行安装、多渠道部署 |
| [dsx-ai-factory/nvke](https://github.com/dsx-ai-factory/nvke) | +345 today | NVIDIA 官方 GPU Kubernetes 引擎，AI 基础设施层的重要新玩家 |

### 🧠 大模型 / 训练

| 项目 | Stars | 说明 |
|---|---|---|
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 108,031 | PyTorch 从零实现 LLM，教育类天花板 |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | 77,803 | AI 工程从零学，"AI Engineer" 角色教育的成熟标志 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,692 | Apple Silicon 上构建 tiny vLLM，推理系统学习佳作 |
| [AkaliKong/MiniOneRec](https://github.com/AkaliKong/MiniOneRec) | 1,959 | OneRec 最小复现，生成式推荐系统前沿方向 |
| [thinkwee/AgentsMeetRL](https://github.com/thinkwee/AgentsMeetRL) | 1,878 | Agentic RL 论文精选列表，Agent + RL 是当前研究热点交汇处 |
| [acon96/home-llm](https://github.com/acon96/home-llm) | 1,491 | 本地 LLM 控制智能家居，端侧模型落地场景 |

### 🔍 RAG / 知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | 144,215 | 100+ Agent/RAG 应用合集，生态风向标 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 114,885 | 编码代理跨会话持久记忆，兼容所有主流 CLI agent |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 93,781 | 定位升级为 "agent-native 数据库"，RAG 引擎向上下文基础设施演进 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 68,646 | Agent 记忆层事实标准，生产级记忆基础设施 |
| [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) | +460 today | 月级长会话上下文压缩插件，100K 窗口跑 10 亿 token，中英文社区双热 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | 40,249 | 无向量、基于推理的文档索引，“反向量 RAG”路线代表 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 41,814 | 火山引擎自进化上下文数据库，统一 Agent 记忆/知识/技能 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | 13,781 | MLSys 2026 最佳论文，97% 存储节省的端侧 RAG |

---

## 四、趋势信号分析

**1）Agent Harness 层是当前最确定性的爆发赛道。** 热榜前两名（ECC 29.9 万、hermes-agent 26.1 万）加上 caveman、claude-mem、Graphify，均不训练模型、不做应用，而是给 Claude Code / Codex 等编码代理“加装”记忆、压缩、技能、安全能力。这标志着开发者价值正从“模型层”和“应用层”向中间的“代理运营层”迁移。

**2）Token 成本焦虑催生压缩工具集群。** 今日 9 个 Trending 中有 4 个与上下文/成本直接相关（billion-context、caveman、headroom、claude-mem），压缩手段各异（插件、代理、prompt 风格、库/MCP），说明长会话成本已是普遍痛点而非单一方案可解。

**3）RAG 范式分化：向量检索 vs 推理/图检索。** PageIndex（无向量）、Graphify（AST 知识图谱）、LEANN、OpenViking 代表的“结构化/推理式检索”正在挑战 embedding+ANN 的默认路线，值得架构选型时重点关注。

**4）与行业事件关联：** Anthropic 双仓上榜与其 Agent Skills 生态推进直接相关；NVKE 登榜对应 NVIDIA 在 Kubernetes 原生 GPU 调度上的布局；Ollama 描述中 Kimi/GLM/DeepSeek 前置，反映国产开源模型在海外本地部署市场的份额提升。

---

## 五、社区关注热点

- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** — 29.9 万 stars 的代理 harness 性能系统，是理解“Agent 运营层”这一新品类的最佳样本。
- **[ranxianglei/billion-context](https://github.com/ranxianglei/billion-context)** + **[JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)** — 上下文压缩双代表，前者工程化、后者趣味化但数据惊人（11.8 万 stars），一起看可理解 token 经济学。
- **[anthropics/skills](https://github.com/anthropics/skills)** — Agent Skills 官方标准仓库，技能生态能否成为“代理时代的 npm”值得早期跟进。
- **[VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex)** — “无向量 RAG”路线头部项目，若推理式检索被验证，将冲击整个向量数据库市场。
- **[dsx-ai-factory/nvke](https://github.com/dsx-ai-factory/nvke)** — NVIDIA GPU Kubernetes 管理面，AI 基础设施向裸金属 K8s 下沉的信号，运维/平台团队应评估。

---

*数据来源：GitHub Trending（2026-11-09）+ GitHub Search API 主题搜索；今日新增 stars 仅 Trending 项目可信。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*