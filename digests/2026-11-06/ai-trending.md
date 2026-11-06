# AI 开源趋势日报 2026-11-06

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-06 00:56 UTC

---

# 📰 AI 开源趋势日报 · 2026-11-06

## 一、今日速览

今日 GitHub Trending 被 **Agent Skills 生态**全面占领：mattpocock/skills、google/skills、scenario-labs/skills、ConardLi/garden-skills 四个 Skills 仓库同日登榜，标志着 Agent 技能包正从 Anthropic 私有规范演变为跨厂商的开源内容形态。NVIDIA 发布 [auto-ontology](https://github.com/NVIDIA/auto-ontology)，将本体论/知识图谱推理引入 LLM 工作流，首日即获 2679 stars，是今日最强新秀。Vercel 连放 [agent-desktop](https://github.com/vercel-labs/agent-desktop) 与 [agent-browser](https://github.com/vercel-labs/agent-browser) 两款 Rust 工具，Agent 的“计算机操作”基础设施竞争加剧。此外，围绕 Agent 的周边工具（git worktree 并行管理、上下文压缩、闲鱼 AI 监控）密集上榜，显示生态正从框架层向工程化细节下沉。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、CLI、开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) | +2173 today | 面向 AI Agent 的 Computer Use CLI，Rust 实现，Vercel 在 Agent 基础设施赛道的又一落子 |
| [NVIDIA/auto-ontology](https://github.com/NVIDIA/auto-ontology) | +2679 today | NVIDIA 官方开源的语义/图谱推理层框架，为 LLM 提供确定性查询生成与可解释性，今日榜首 |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | +546 today | 专为并行 AI Agent 工作流设计的 Git worktree 管理 CLI，反映多 Agent 并行开发已成刚需 |
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | +150 today | Agent 专用浏览器自动化 CLI，与 agent-desktop 组成 Agent 操控计算机的完整工具链 |
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐186k | 本地大模型运行事实标准，已支持 Kimi、GLM、DeepSeek、gpt-oss、Qwen 等主流开源模型 |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | +1655 today | 高性能爬虫框架，AI 数据采集层的强有力选手，今日热度爆发 |

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [mattpocock/skills](https://github.com/mattpocock/skills) | +2071 today | TypeScript 名人 Matt Pocock 的个人 Agent Skills 集合，"Skills for Real Engineers" 引发社区模仿潮 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐260.9k | "与你共同成长的 Agent"，ai-agent 主题下 star 最高的项目 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | ⭐47.8k | chatgpt-on-wechat 作者的新作：可自进化的个人 AI 助理与 Agent Harness，国内生态代表作 |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | ⭐109.2k | 一个 CLI 让 Agent 读取 Twitter/Reddit/YouTube/B站/小红书，零 API 费用的“Agent 之眼” |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | ⭐199k | 为 Agent 提供全网数据的抓取基础设施，持续高热度 |
| [scenario-labs/skills](https://github.com/scenario-labs/skills) | +667 today | 通过 MCP 让 Agent 驱动 Blender/Maya/Unreal/Unity 进行 3D 与多媒体生产的技能包，创意生产 Agent 化 |

### 📦 AI 应用

| 项目 | Stars | 说明 |
|---|---|---|
| [Usagi-org/ai-goofish-monitor](https://github.com/Usagi-org/ai-goofish-monitor) | +240 today | Playwright + AI 的闲鱼多任务实时监控与智能分析系统，带完整后台 UI，中文垂直场景爆款 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | ⭐67.6k | LLM 驱动的多市场股票分析系统，零成本定时运行，散户 AI 工具化典型 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | ⭐80.5k | 开源 AI 求职 Agent：CV 匹配打分、简历定制、投递追踪，本地运行 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐73.9k | AI 生成原生 PowerPoint（含动画、图表、音频旁白），办公场景 LLM 应用标杆 |
| [microsoft/VibeVoice](https://github.com/microsoft/VibeVoice) | +223 today | 微软开源的前沿语音 AI，TTS/语音生成方向的官方新作 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | ⭐139.8k | 一键生成高清短视频的 AI 工作流，内容创作自动化长青项目 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐107.9k | 用 PyTorch 从零实现 ChatGPT 式 LLM，AI 教育类第一教材 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | ⭐5.6k | 在 Apple Silicon 上从零构建 mini vLLM + Qwen，面向系统工程师的推理系统教程 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | ⭐7.6k | 支持 100+ 数据集的 LLM 评测平台，覆盖 OpenAI/Anthropic/Qwen/DeepSeek/GLM |
| [datamllab/OpenEBFM](https://github.com/datamllab/OpenEBFM) | ⭐273 | 能量基座模型（EBFM）开源训练代码，非自回归新架构方向值得跟踪 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | ⭐9.1k | Rust 生态的模块化 LLM 应用框架，Rust + AI 赛道持续升温 |

### 🔍 RAG/知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐143k | 把代码库/文档/PDF 转成可查询知识图谱的 Claude Code skill，"无向量库 RAG"的代表 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐113.5k | 跨会话持久化 Agent 上下文记忆，支持所有主流编码 Agent |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | ⭐78.9k | LLM 输入压缩层：JSON 省 60-95% token、编码 Agent 省 20%，上下文经济学代表 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | ⭐41.6k | 字节开源的自进化上下文数据库，统一 Agent 记忆、知识 RAG 与技能 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐40k | 无向量、基于推理的文档索引 RAG，与 Graphify 同属“反向量库”思潮 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐68.5k | Agent 记忆层事实标准，生产级持久化上下文基础设施 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | ⭐13.8k | MLSys 2026 最佳论文，97% 存储节省的端侧私有 RAG |

---

## 三、趋势信号分析

**① Agent Skills 成为今日最强叙事。** 四个 Skills 仓库同日登榜（mattpocock、google、scenario-labs、ConardLi），加上搜索结果中 ECC、claude-mem、Graphify 等均以 "skill" 形态分发，说明 Agent 技能包已从 Claude Code 的私有机制泛化为**跨厂商的开源内容品类**——Google 官方入场（google/skills）是关键信号，Skills 正在成为类似 "dotfiles" 的新一代开发者资产形态。

**② Agent 计算机操作基础设施加速成熟。** Vercel 一日内两款 Rust 工具（agent-desktop / agent-browser）+ worktrunk（并行 worktree）+ Scrapling（数据采集），Agent 的“手眼”层工具链在快速补齐，且几乎清一色选择 Rust 以求低延迟。

**③ “反向量库 RAG” 思潮成型。** auto-ontology（NVIDIA）、Graphify、PageIndex、LEANN 均强调确定性解析、知识图谱或推理式检索替代 embedding，可解释性与存储成本是共同卖点。

**④ 上下文经济学成新赛道。** headroom（token 压缩）、caveman（65% token 削减）、OpenViking（上下文数据库）密集出现，直接响应 API 涨价与长上下文成本压力。

**⑤ 垂直 AI 应用持续下沉中文场景**：闲鱼监控、股票分析、求职 Agent 等“个体生产力”应用 star 量级已达数万，反映 AI 消费级应用的重心向个人用户迁移。

---

## 四、社区关注热点

- **[NVIDIA/auto-ontology](https://github.com/NVIDIA/auto-ontology)**：NVIDIA 官方入场 + 当日 2679 stars，知识图谱 × LLM 的可解释推理方向，值得第一时间研究其与主流 Agent 框架的集成方式
- **[mattpocock/skills](https://github.com/mattpocock/skills)**：Skills 品类爆发的引爆点，个人品牌 + 开源技能包的新模式，开发者可直接 fork 借鉴其结构
- **[vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop)**：Rust 实现的 Computer Use CLI，与 OpenAI/Anthropic 的 computer-use 能力形成开源对垒，是 Agent 落地“最后一公里”的关键组件
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)**：14 万 star 的代码库知识图谱 skill，“无向量 RAG”路线的旗舰，对构建企业知识库团队有直接参考价值
- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)**：以 proxy/MCP/库三形态插入现有管线的 token 压缩方案，投入小、收益立竿见影，适合编码类 Agent 团队立即试用

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*