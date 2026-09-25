# AI 开源趋势日报 2026-09-26

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-25 23:17 UTC

---

# AI 开源趋势日报 · 2026-09-26

## 一、今日速览

今日热榜被 **Agent Skills 生态**全面占领：从 Anthropic 官方 skills 仓库到个人开发者的 skills 集合，“为 Coding Agent 编写技能/方法论”成为最强劲的新兴赛道。**Agent 基础设施层**竞争白热化——Google 开源通用 Agent 编排运行时 ax（+1386 today），paperclip（+1853 today）主打企业级 Agent 管理，hindsight（+1652 today）切入 Agent 记忆学习。与此同时，**Token 成本优化**（ECC、caveman、headroom）作为新痛点催生了一批高星项目。整体看，开源重心已从“造 Agent”转向“管 Agent、养 Agent、省 Agent”。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [google/ax](https://github.com/google/ax) | +1386 today | Google 官方开源的通用 Agent 编排运行时，今日热榜第二，Google 正式入局 Agent 基础设施 |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | +1853 today | 今日榜首，定位“工作中管理 Agent 的开源应用”，瞄准企业级 Agent 治理空白 |
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐181,728 | 本地大模型运行事实标准，已支持 Kimi、GLM、DeepSeek、gpt-oss、Qwen 全家桶 |
| [NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer) | +360 today | NVIDIA 统一模型压缩库（量化/蒸馏/剪枝/投机解码），面向 TensorRT-LLM/vLLM 部署，推理降本刚需 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐267,467 | Agent Harness 性能优化系统（skills/记忆/安全），全网星标最高的 harness 工具 |
| [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) | ⭐35,710 | DeepSeek 原生终端编码 Agent，主打 prefix-cache 稳定性长驻运行 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | ⭐8,729 | Rust 生态 LLM 应用框架，多语言开发者分流趋势的代表 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars | 说明 |
|---|---|---|
| [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) | +1652 today | “会学习的 Agent 记忆”，今日第三，Agent Memory 赛道再添重磅玩家 |
| [obra/superpowers](https://github.com/obra/superpowers) | +465 today | Agent 技能框架 + 软件开发方法论，“把工程实践变成 Agent 可执行的技能” |
| [mattpocock/skills](https://github.com/mattpocock/skills) | +588 today | TypeScript 名人 Matt Pocock 的个人 Agent Skills 集合，明星效应带动 skills 生态普及 |
| [anthropics/skills](https://github.com/anthropics/skills) + [claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | +231/+62 today | Anthropic 官方 Skills 与 Claude Code 插件目录，官方定义生态标准 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐248,968 | “与你一起成长的 Agent”，开源社区的超高人气个人 Agent |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | ⭐116,288 | 浏览器操作 Agent 的事实标准 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | ⭐47,121 | 中文生态超级助手 + Agent Harness，自带记忆与自进化能力 |

### 📦 AI 应用（垂直场景解决方案）

| 项目 | Stars | 说明 |
|---|---|---|
| [dream-num/univer](https://github.com/dream-num/univer) | +1048 today | 定位重构为"The Office Harness for AI Agents"，办公套件全面 Agent 化，转型信号值得关注 |
| [shy3130/tick-stock-panel](https://github.com/shy3130/tick-stock-panel) | +31 today | A 股自托管量化工作台，LLM 驱动选股/复盘，中文个人开源精品 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | ⭐108,629 | 多 Agent LLM 金融交易框架，量化 + Agent 融合的标杆 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | ⭐65,646 | LLM 多市场股票分析 + 零成本定时运行，实用主义代表 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐56,384 | 文档/主题 → 原生 PowerPoint，办公生产力垂直应用高星项目 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | ⭐72,797 | 本地运行的 AI 求职全流程工具（简历定制 + 投递追踪），个人效率场景爆发 |
| [androoAGI/starnet](https://github.com/androoAGI/starnet) | +118 today | 像素风桌面 Agent Harness，“看着你的 crew 干活”，BYOK 本地优先新玩法 |

### 🧠 大模型/训练（训练、微调、学习资源）

| 项目 | Stars | 说明 |
|---|---|---|
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | ⭐57,444，+1181 today | AI 工程从零学习，今日热榜第四，AI 工程化学习需求旺盛 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | ⭐62,571 | 2 小时从零训练 64M 参数 LLM，中文社区最佳教学项目 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐105,573 | PyTorch 手写 ChatGPT 级 LLM 的经典教程 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | ⭐4,726 | Apple Silicon 上手写 mini vLLM，面向系统工程师的推理底层教程 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | ⭐7,473 | LLM 评测平台，覆盖 100+ 数据集，模型选型刚需 |

### 🔍 RAG/知识库（检索增强、向量数据库、Agent 记忆）

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐121,448 | 把代码库+文档变成可查询知识图谱，主打“无向量库的确定性 AST 解析”，RAG 范式反思的代表 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐94,699 | 跨会话持久上下文，支持 Claude Code/Codex/Copilot 等全部主流 Agent |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | ⭐73,814 | LLM 输入压缩层，编码 Agent 省 20% token、JSON 省 60-95%，Token 经济学代表 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐35,854 | 无向量、推理式 RAG 文档索引，“去向量库化”新路线 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | ⭐46,255 | 云原生向量数据库标杆 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | ⭐12,966 | MLSys2026 最佳论文，97% 存储节省的本地化 RAG |

---

## 三、趋势信号分析

**1. Skills 生态成为今日最强主题。** 热榜 16 席中至少 6 席与 Agent Skills/插件直接相关（anthropics/skills、claude-plugins-official、superpowers、mattpocock/skills、impeccable、ECC），且横跨官方目录、方法论框架、个人技能集、设计语言四个层次——这标志着 Coding Agent 已进入“可编程生态”阶段，类似当年 VS Code 插件的爆发前夜。

**2. Agent 中间层（harness/编排/记忆）竞争升级。** Google ax 以官方身份下场，paperclip 押注企业 Agent 管理，hindsight 深耕记忆学习，巨厂与创业公司同时在“Agent 操作系统”层面卡位，中间件窗口期正在快速收窄。

**3. Token 成本优化成为新刚需赛道。** caveman（+107k 星，砍 65% token）、headroom、ECC 均以“少花 token”为核心卖点，反映 Agent 大规模常驻运行后推理成本痛点的爆发。

**4. RAG 范式反思暗流涌动。** graphify（无向量库知识图谱）、PageIndex（推理式检索）、LEANN（本地轻量 RAG）共同质疑传统向量 RAG，与 Agent Memory 赛道（hindsight、claude-mem、mem0）形成“上下文管理”的合流。

---

## 四、社区关注热点

- **[google/ax](https://github.com/google/ax)** — Google 正式开源的 Agent 编排运行时，首日 +1386 star，其 API 设计与生态策略将影响整个 Agent 中间层格局，建议持续跟踪
- **[anthropics/skills](https://github.com/anthropics/skills) + [claude-plugins-official](https://github.com/anthropics/claude-plugins-official)** — Anthropic 官方定义的 Skills 标准，是编写跨 harness 通用技能的权威参考
- **[vectorize-io/hindsight](https://github.com/vectorize-io/hindsight)** — “会学习的记忆”区别于静态 RAG 注入，Agent Memory 可能是下半年基础设施最热细分
- **[headroom](https://github.com/headroomlabs-ai/headroom) / [caveman](https://github.com/JuliusBrussee/caveman)** — Token 压缩已验证巨大需求，proxy + MCP 形态易集成，适合立即上手试水
- **[dream-num/univer](https://github.com/dream-num/univer)** — 办公套件全面转向 "Office Harness for AI Agents"，传统生产力软件 Agent 化改造的典型样本

---
*数据来源：GitHub Trending（2026-09-26）与主题搜索 API；今日新增 stars 为实时数据，总量为当日快照。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*