# AI 开源趋势日报 2026-11-19

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-19 01:51 UTC

---

# AI 开源趋势日报 · 2026-11-19

## 一、今日速览

今日 GitHub Trending 几乎被"**Agent Skills 生态**”占领：Cursor 官方插件规范、NVIDIA 的 Skill 评测框架、Google 的 Stitch Skills 库同日登榜，标志着 Agent 技能标准化竞争进入白热化。**Agent Harness 优化**成为新爆点——ECC（+1108）和 superpowers（+822）聚焦编码智能体的技能、记忆与安全工程。Google Research 的 paper-orchestra（+1524）以多智能体自动写论文拿下今日榜首增速。整体看，“给 Agent 装技能、省 token、加记忆”是当前最确定的方向。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架/SDK/推理/开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [cursor/plugins](https://github.com/cursor/plugins) | +314 today | Cursor 官方插件规范与官方插件，是 IDE 厂商切入 Agent Skills 标准的标志动作 |
| [NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator) | +312 today | 多层级 Agent 技能/插件评测框架，含质量门禁、语义重叠检测与真实 Agent 行为评测，补上 Skills 生态的质量基建空白 |
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | +24 today | 老牌推理优化部署工具包，持续稳定的边缘/生产部署选择 |
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | +53 today | MCP 服务器大全，工具生态入口级资源 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | ⭐80.1k | LLM 输入压缩库/代理/MCP 服务器，JSON 场景省 60-95% token |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | ⭐9.2k | Rust 模块化 LLM 应用框架 |

### 🤖 AI 智能体/工作流（Agent 框架/自动化/多智能体）

| 项目 | Stars | 说明 |
|---|---|---|
| [google-research/paper-orchestra](https://github.com/google-research/paper-orchestra) | +1524 today | Google 多智能体自动撰写 AI 研究论文框架，今日增速第一 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐306.5k (+1108) | Agent Harness 性能优化系统：技能、直觉、记忆、安全，覆盖 Claude Code/Codex/Cursor |
| [obra/superpowers](https://github.com/obra/superpowers) | +822 today | Agentic 技能框架 + 软件开发方法论，方法论与工具结合的代表 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | +389 today | “让所有软件 Agent 原生化”，港大出品，软件生态 Agent 化的激进尝试 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | +365 today | Google Labs 的 Agent Skills 库，遵循开放标准兼容各大编码 Agent |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | +325 today | 原生 AI 能力的可视化工作流平台，400+ 集成，Agent 落地自动化主力 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | ⭐121.5k | 浏览器 Agent 事实标准库 |

### 📦 AI 应用（垂直场景产品）

| 项目 | Stars | 说明 |
|---|---|---|
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | +1059 today | 跨 Reddit/X/YouTube/HN/Polymarket 的研究型 Agent Skill，"Skill 即产品"的典型样本 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | ⭐144.5k | AI 一键生成短视频，内容生成赛道长青项目 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | ⭐123.1k | 多智能体金融交易框架，Agent + 金融最热落地 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | ⭐73.4k | LLM 多市场股票分析系统，零成本定时运行 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | ⭐83.6k | 开源 AI 求职 Agent：简历评分、定制与追踪 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐78.3k | 文档/主题 → 原生 PPT，办公自动化刚需 |

### 🧠 大模型/训练（模型/训练框架/评测）

| 项目 | Stars | 说明 |
|---|---|---|
| [huggingface/transformers](https://github.com/huggingface/transformers) | ⭐169.2k | 模型定义框架的基石 |
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐187.6k | 本地运行 Kimi/GLM/DeepSeek/Qwen 等模型的事实标准 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | ⭐66.5k | 2 小时从 0 训 64M LLM，教学向爆款 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | ⭐7.6k | LLM 评测平台，覆盖 100+ 数据集 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | ⭐5.8k | Apple Silicon 上手写 tiny vLLM，推理系统学习佳作 |
| [FonaTech/Project_Chronos](https://github.com/FonaTech/Project_Chronos) | ⭐207 | 零停顿 MoE 推理（lookahead 预取），前沿小众方向 |

### 🔍 RAG/知识库（向量库/检索/记忆）

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐150.2k | 代码库 → 可查询知识图谱，"无向量库 RAG"路线的头部代表 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐118.3k | 跨会话 Agent 持久记忆，兼容所有主流编码 Agent |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | ⭐42.4k | 自进化上下文数据库：统一 Agent 记忆、RAG 与技能 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐40.5k | 无向量、推理式 RAG 文档索引 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | ⭐13.8k | MLSys2026 最佳论文，省 97% 存储的端侧 RAG |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐69.2k | Agent 记忆层基础设施，生产可用 |

---

## 三、趋势信号分析

**1. Agent Skills 标准化之战今日正式打响。** Cursor plugins、Google stitch-skills、NVIDIA SkillEvaluator、last30days-skill、superpowers、ECC——今日 19 个热榜中 6 个直接围绕“Agent 技能”展开，涵盖规范制定（Cursor/Google）、生态供给（Skills 库）、质量评测（NVIDIA）和消费（具体 Skill 产品）全链条。这是继 MCP 之后的下一个协议级竞争点，值得高度警惕。

**2. "Agent Harness 工程”成为独立品类。** ECC、superpowers、claude-mem、caveman、headroom 共同指向编码 Agent 的运行时优化——技能编排、持久记忆、token 压缩、安全防护。说明社区共识已从“Agent 能不能用”转向“如何跑得更省、更稳、更可控”。

**3. Token 经济学是隐性主线。** headroom（省 20-95% token）、caveman（"why use many token when few token do trick"）登榜/高星，反映 Agent 大规模落地后成本优化成为刚需。

**4. 与行业事件的关联。** Ollama 描述中 Kimi、GLM、MiniMax、DeepSeek 与 gpt-oss 并列，印证中国开源模型 + 开放权重模型已成本地部署默认选项；Google 连投 paper-orchestra 与 stitch-skills，显示大厂正以开源抢夺 Agent 生态入口。

---

## 四、社区关注热点

- **[NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator)** — Skills 生态爆发后的必然配套：没有评测就没有质量门禁，做 Agent 插件/技能的开发者应第一时间关注
- **[google-research/paper-orchestra](https://github.com/google-research/paper-orchestra)** — 今日增速第一（+1524），AI 自动化科研写作的官方背书样本，学术圈与 Agent 圈交叉热点
- **[obra/superpowers](https://github.com/obra/superpowers)** + **[affaan-m/ECC](https://github.com/affaan-m/ECC)** — 二者代表 Agent Harness 方法论的两种流派（技能驱动 vs 全能工程化），对比研读可快速建立体系认知
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** + **[VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex)** — “去向量库”的确定性/推理式 RAG 新路线，对传统 embedding 检索是有力挑战
- **[volcengine/OpenViking](https://github.com/volcengine/OpenViking)** — 把记忆、知识、技能统一为“上下文数据库”的抽象值得关注，可能是 Agent 基础设施的下一代范式

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*