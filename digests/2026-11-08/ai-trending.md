# AI 开源趋势日报 2026-11-08

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-07 23:37 UTC

---

# AI 开源趋势日报（2026-11-08）

## 一、今日速览

今日 GitHub Trending 被「Agent Skills」生态刷屏——Cloudflare、Google、Anthropic、Matt Pocock 等多方势力同日发布或冲榜 Agent 技能仓库，coding agent 的“技能插件化”正成为新的事实标准。与此同时，上下文压缩赛道出现双雄：Trending 榜上的 billion-context 与 topic 搜索中的 caveman（65% token 削减）均获高热度，token 成本优化已是刚需。开源 Grok 替代品 OpenMausBot 单日近 2000 stars，个人 AI 助手/聊天机器人赛道竞争白热化。基础层，NVIDIA Kubernetes Engine 登榜，AI 基础设施（GPU 集群管理）开始向开源社区下沉。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、CLI、基础设施）

| 项目 | Stars | 说明 |
|---|---|---|
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | +180 today | 面向 AI agent 的浏览器自动化 CLI，agent 与 Web 交互的标准工具链正在成型 |
| [dsx-ai-factory/nvke](https://github.com/dsx-ai-factory/nvke) | +125 today | NVIDIA Kubernetes Engine，裸金属 GPU K8s 管理平面，AI 算力基础设施开源化信号 |
| [ollama/ollama](https://github.com/ollama/ollama) | 186,280 | 本地大模型运行事实标准，已支持 Kimi、GLM、DeepSeek、gpt-oss、Qwen 等国产/开源模型 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 158,035 | 本地优先的 AI 界面，兼容 Ollama/OpenAI API，自托管 LLM 入口级项目 |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | 559 | 统一 LLM 网关：一个 API 撞多供应商 + 智能负载均衡，中小团队刚需 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 9,084 | Rust 生态的模块化 LLM 应用框架，Rust + AI 工具链的代表 |

### 🤖 AI 智能体 / 工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | +2,088 today | 今日榜首。多阶段安全审计 coding-agent skill，产出可机器验证的审计结果，云厂商下场做 skill 生态 |
| [anthropics/skills](https://github.com/anthropics/skills) | +386 today | Anthropic 官方 Agent Skills 仓库，与 Cloudflare/Google 同日冲榜，标准之争开启 |
| [google/skills](https://github.com/google/skills) | +449 today | Google 面向自家产品的 Agent Skills，三大巨头同台定义 agent 能力扩展格式 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | +1,111 today | TypeScript 知名教育者 Matt Pocock 的个人 .agents 目录，开发者个人技能集合也能引爆 |
| [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | +1,986 today | 开源 Grok Bot 替代 + bot 可用的虚拟机，今日第二热 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 299,166 | Agent harness 性能优化系统：技能、本能、记忆、安全一体化，跨 Claude Code/Codex/Cursor |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 261,498 | "与你共同成长的 agent"，长期演进型个人 agent 代表 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149,176 | 定位已转为 "agent engineering platform"，框架层向工程化平台演进 |

### 📦 AI 应用（垂直场景产品）

| 项目 | Stars | 说明 |
|---|---|---|
| [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) | +185 today | 月级长会话上下文压缩插件，100K 窗口跑十亿 token、省 5 倍 token，今日登榜的新方向 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 121,185 | 多智能体 LLM 金融交易框架，agent + 金融持续高热 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 140,739 | 一键生成高清短视频的 AI 工作流，内容生成自动化标杆 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | 80,935 | 开源 AI 求职 agent：扫岗、按 CV 打分、定制简历，本地运行 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 74,533 | 文档/主题 → 原生 PowerPoint，办公场景 agent 化典型 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | 47,832 | 个人 AI 助手 + Agent Harness，一行安装、自我进化，chatbot 项目的 Agent 化转型样本 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 67,724 | LLM 驱动的多市场股票分析 + 自动推送，零成本定时运行 |

### 🧠 大模型 / 训练

| 项目 | Stars | 说明 |
|---|---|---|
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 107,976 | PyTorch 从零实现 ChatGPT 级 LLM，AI 教育第一 IP |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 168,633 | 模型定义框架事实标准，覆盖文本/视觉/音频/多模态训练与推理 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | 201,387 | 经典 ML 框架常青树，存量生态依旧庞大 |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | 77,447 | AI 工程化从零学起，印证 "AI Engineering" 已独立成学科 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,572 | LLM 评测平台，100+ 数据集覆盖推理/编码/安全，模型评测基础设施 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | 319 | X-bit 量化驱动的端侧 LLM 推理，on-device 方向值得关注 |

### 🔍 RAG / 知识库 / 记忆

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 143,985 | 将代码库/文档/PDF 转为可查询知识图谱的 /graphify skill，本地 AST 解析、无需向量库 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 114,454 | 跨会话持久上下文，兼容 Claude Code/Codex/Gemini 等全部主流 agent |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | 118,171 | 病毒式传播的省 token skill + 代理，"原始人说话"砍 65% token |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | 79,079 | 工具输出/日志/RAG chunk 进 LLM 前先压缩，JSON 省 60-95% token |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 68,582 | Agent 记忆层基础设施，生产级持久化上下文 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 93,735 | Agent 原生数据库，RAG 引擎进化为上下文基础设施 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 41,748 | 字节开源的自进化上下文数据库，统一记忆、RAG 与技能 |
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | 87,059 | 面向 AI agent 的爬取/抽取/搜索，数据供给层头部项目 |

**注**：Trending 榜中的 prometheus、sherlock、tailwindcss、ruff、zed、localthings、astryx（meta 的 "agent ready" 设计系统可视作边缘相关）等按规则判定为非 AI 核心项目，已过滤。

---

## 三、趋势信号分析

**① Agent Skills 是今日绝对主角。** Cloudflare（+2,088）、Google、Anthropic 的官方 skill 仓库同日冲榜，加上 Matt Pocock 的个人技能集合（+1,111），说明 "Agent Skills" 作为 coding agent 能力扩展格式已完成从概念到生态的跨越——这是继 MCP 之后的下一个 agent 互操作层，且巨头正在抢定义权。

**② Token 经济学成为独立赛道。** Trending 上的 billion-context（上下文压缩）、topic 榜上的 caveman（118K stars）、headroom、claude-mem 共同指向同一痛点：agent 长会话下 token 成本与上下文窗口的双重约束。"省 token" 正从技巧演化为产品类别。

**③ 基础设施下沉。** NVKE 登榜意味着 GPU 集群管理这类此前纯商业的能力开始开源，AI Infra 的开源边界在向更底层延伸；同时 Netdata 以 "AI-powered observability" 定位出现在 ml topic 中，传统运维工具全面 AI 化重构。

**④ 与行业事件关联：** skills 生态集中爆发与主流 coding agent（Claude Code 等）技能机制成熟直接相关；Ollama 描述中 Kimi、GLM、DeepSeek 排在首位，折射国产开源模型在本地推理场景的份额上升。

---

## 四、社区关注热点

- **[cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill)** — 今日 +2,088 stars 榜首，云厂商背书 + 机器可验证的安全审计 skill，是 skill 生态质量标杆，值得直接复用
- **[anthropics/skills](https://github.com/anthropics/skills) / [google/skills](https://github.com/google/skills)** — 官方技能仓库格式是未来 agent 互操作的事实候选标准，早关注早上车
- **[billion-context](https://github.com/ranxianglei/billion-context) + [caveman](https://github.com/JuliusBrussee/caveman)** — 上下文/ token 压缩是当前 agent 开发的第一痛点，两个项目代表工程化两条路径（结构化压缩 vs 激进语言压缩）
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** — 143K stars 的知识图谱 + skill 方案，“去向量库”的确定性 RAG 路线值得 RAG 从业者跟踪
- **[dsx-ai-factory/nvke](https://github.com/dsx-ai-factory/nvke)** — GPU Kubernetes 管理平面开源，自建算力集群团队的基础设施新选项

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*