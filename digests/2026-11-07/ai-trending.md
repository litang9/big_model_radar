# AI 开源趋势日报 2026-11-07

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-07 00:05 UTC

---

# 📰 AI 开源趋势日报 · 2026-11-07

## 一、今日速览

今日 GitHub Trending 榜单上 AI 相关项目呈现一个鲜明主题：**Agent Skills（智能体技能包）生态大爆发**。Cloudflare 的安全审计 Skill、个人开发者 mattpocock 的 skills 合集、Google 官方 skills 仓库包揽了 AI 项目今日新增 stars 前三名，单日新增均超 500。同时 NVIDIA 的 auto-ontology（+2015）代表了另一条主线：为 LLM 构建确定性、可解释的语义推理层。结合主题搜索数据，Agent Harness（ECC 29.8万星）、Agent 记忆（claude-mem、mem0）、Token 压缩（headroom、caveman）已形成围绕编码智能体的完整“性能优化+基础设施”新赛道。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐186,143 | 本地大模型运行事实标准，一行命令跑 Kimi/GLM/DeepSeek/gpt-oss/Qwen |
| [huggingface/transformers](https://github.com/huggingface/transformers) | ⭐168,606 | 模型定义框架，训练推理全场景覆盖，生态基石 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | ⭐9,081 | Rust 生态 LLM 应用框架，模块化构建，Rust+AI 组合持续升温 |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | ⭐559 | 通用 LLM 网关：一个 API 打通所有厂商，多提供商转换+智能负载均衡 |
| [FonaTech/Project_Chronos](https://github.com/FonaTech/Project_Chronos) | ⭐207 | 零停顿 MoE 推理：前瞻预测+异步 DMA 预取，SSD I/O 优化的前沿探索 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | ⭐7,569 | LLM 评测平台，覆盖 100+ 数据集，模型选型必备 |

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐298,576 | Agent Harness 性能优化系统，Claude Code/Codex/Cursor 通吃，llm 主题中星数第一 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐261,203 | "与你共同成长的 Agent"，开源社区 Agent 旗舰 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | +2,070 today | TypeScript 知名博主直出的 .agents 目录 Skills 合集，今日最热之一 |
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | +2,548 today | 今日 AI 榜第一：多阶段安全审计编码 Agent 技能，产出机器可读、可独立验证的发现 |
| [google/skills](https://github.com/google/skills) | +534 today | Google 官方出手定义 Agent Skills 标准，大厂入场信号 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | ⭐120,215 | AI 浏览器 Agent 标准库 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | ⭐118,015 | 病毒式传播：让 Agent“说原始人语”砍掉 65% token，实用与梗文化结合 |
| [NVIDIA/auto-ontology](https://github.com/NVIDIA/auto-ontology) | +2,015 today | NVIDIA 发布的语义图推理框架，为 LLM/Agent 提供确定性查询与可解释性 |

### 📦 AI 应用

| 项目 | Stars | 说明 |
|---|---|---|
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | ⭐157,953 | 最流行自托管 AI 界面，兼容 Ollama/OpenAI |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | ⭐80,722 | AI 求职 Agent：扫职位板、按 CV 打分、定制简历，本地运行 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐74,261 | 文档/主题→原生 PowerPoint，含图表动画配音，垂直应用标杆 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | ⭐140,255 | 一键生成高清短视频的 AI 工作流，国内内容创作刚需 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | ⭐121,016 | 多智能体金融交易框架，LLM+量化交叉热点 |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | ⭐109,680 | 给 Agent 装上“眼睛”：CLI 读取 Twitter/Reddit/B站/小红书，零 API 费 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | ⭐105,218 | 深度学习训练基石框架 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐107,929 | 从零实现 ChatGPT 级 LLM，教育类天花板 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | ⭐5,678 | Apple Silicon 上的迷你 vLLM+Qwen，推理系统学习最佳路径 |
| [datamllab/OpenEBFM](https://github.com/datamllab/OpenEBFM) | ⭐281 | 能量基座模型（EBFM）开源训练代码，非 Transformer 路线值得关注 |
| [AkaliKong/MiniOneRec](https://github.com/AkaliKong/MiniOneRec) | ⭐1,955 | OneRec（生成式推荐）最小复现，LLM+推荐系统融合方向 |

### 🔍 RAG/知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | ⭐199,253 | 为 Agent 供给全网数据的抓取引擎，增长迅猛 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐114,013 | 跨会话持久上下文，AI 压缩+回注，Agent 记忆刚需 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | ⭐79,021 | 进 LLM 前先压缩：编码 Agent 省 20%、JSON 省 60-95% token |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐68,531 | Agent 记忆层基础设施，生产级方案 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐143,544 | 代码库→可查询知识图谱，本地 AST 解析、无需向量库，RAG 新范式 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | ⭐41,705 | 字节开源自进化上下文数据库，统一记忆/RAG/Skills |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | ⭐13,776 | MLSys2026 最佳论文，97% 存储节省的端侧 RAG |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐40,147 | 无向量、推理式 RAG 的文档索引，挑战传统向量检索路线 |

---

## 三、趋势信号分析

**1. Agent Skills 成为大厂与个人的共同战场。** 今日新增 stars 前三（Cloudflare +2548、mattpocock +2070、NVIDIA +2015）中有两个是 Skills 仓库，加上 Google 官方 skills（+534），“Skill 即新的插件生态”正在成型——Cloudflare 示范了企业级 Skill 的形态（机器可读、可验证结果），mattpocock 代表个人开发者直出生产实践，Google 则试图定义跨产品标准。

**2. Agent Harness 与 Token 经济学成为新叙事。** ECC（29.8万星）、caveman（118k）、headroom（79k）共同指向一个核心焦虑：Agent 时代的 token 成本。压缩工具输出、削减冗余表达、优化 Harness 结构（记忆/技能/安全）已是独立细分赛道，而非 LangChain 时代的工作流编排。

**3. RAG 范式出现“去向量库”分歧。** PageIndex（推理式索引）、Graphify（AST 知识图谱）、NVIDIA auto-ontology（本体图推理）、LEANN（存储节省 97%）不约而同绕开传统向量检索，确定性/可解释检索正在成为对 Embedding 黑盒的反思。

**4. 与行业事件关联：** Google/Microsoft/Anthropic 近期力推 Agent Skills 规范，今日榜单是这一标准之争的直接映射；ollama 描述中 Kimi/GLM/MiniMax/DeepSeek 前置，也印证国产开源模型在全球本地推理生态中的主导地位。

---

## 四、社区关注热点

- **[cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill)**（今日 +2548）：企业级 Agent Skill 的参考实现，展示了“技能包+独立验证产出”的最佳实践，值得所有做 Agent 工程的团队研究其设计模式。
- **[NVIDIA/auto-ontology](https://github.com/NVIDIA/auto-ontology)**（今日 +2015）：NVIDIA 布局 Agent 语义层的信号，图推理+LLM 结合可能是 RAG 的下一站，早期窗口期。
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)**（⭐298k）：Agent Harness 概念的集大成者，技能/记忆/安全一体，代表了从“编排框架”到“Harness 优化”的范式迁移。
- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)** + **[JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)**：Token 成本优化的两条路线（工程压缩 vs 提示词极限压缩），低成本跑 Agent 的刚需工具。
- **[volcengine/OpenViking](https://github.com/volcengine/OpenViking)**：字节入局 Agent 上下文基础设施，统一记忆/RAG/Skill 的一体化尝试，与 mem0、cognee 的竞争值得跟踪。

---
*数据来源：GitHub Trending（2026-11-07）+ GitHub Search API（7 天活跃）；今日新增 stars 仅 Trending 项目可信。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*