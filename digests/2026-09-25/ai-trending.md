# AI 开源趋势日报 2026-09-25

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-24 23:11 UTC

---

# AI 开源趋势日报 · 2026-09-25

## 一、今日速览

今日热榜被**Agent 基础设施**全面占领：Google 开源 agentic 编排运行时 ax（+1376）、agent 记忆系统 hindsight（+1607）双双爆发，标志着“Agent 中间件层”成为新战场。Univer 以“AI Agent 的 Office 运行时”定位斩获 +1060，Agent 与传统办公软件的融合进入落地阶段。同时，CLI-Anything（+415）和 treg（+470）聚焦“工具层标准化”，暗示 MCP 之后“Agent 调用工具”的路由协议正在成为新热点。中文社区方面，Datawhale、HKUDS 等团队持续输出，Agent 教育与个人 Agent 框架热度不减。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [google/ax](https://github.com/google/ax) | +1376 today | Google 官方开源的 agentic 编排运行时（Go），今日最强势新上榜项目，代表大厂正式入局 Agent 基础设施层 |
| [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) | +1607 today | "会学习的 Agent 记忆系统”，今日全榜第一增速，Agent Memory 赛道持续升温 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | +415 today | 让所有软件变成 Agent-Native 的 CLI 封装层，配套 CLI-Hub 生态，港大 DS 实验室新作 |
| [strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk) | +463 today | 端到端 Agent Harness 控制 SDK，Python/TS 双语言，任意模型任意云 |
| [superdesigndev/treg](https://github.com/superdesigndev/treg) | +470 today | "Agent 工具的 OpenRouter"——工具调用路由层，瞄准 MCP 之后的工具分发问题 |
| [NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer) | +22 today | NVIDIA 统一模型压缩库（量化/蒸馏/剪枝/投机解码），面向 TensorRT-LLM、vLLM 部署链路 |
| [leejet/stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp) | +69 today | 纯 C/C++ 扩散模型推理，已支持 Z-Image 等最新模型，端侧部署刚需 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars | 说明 |
|---|---|---|
| [obra/superpowers](https://github.com/obra/superpowers) | +606 today | Agent 技能框架 + 软件开发方法论，"Skills"范式在编码 Agent 领域快速扩散 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐266,864 | Agent Harness 性能优化体系（技能/本能/记忆/安全），适配 Claude Code、Cursor 等主流 CLI |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐248,708 | "与你一起成长的 Agent"，个人 Agent 持续进化的代表 |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | ⭐42,238 | 构建弹性 Agent 的事实标准图编排框架 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | ⭐116,204 | 让 Agent 操作浏览器，Web 自动化 Agent 头部方案 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐121,207 | 把任意代码库变成可查询知识图谱的 Agent Skill，"去向量库"路线代表 |

### 📦 AI 应用（具体应用产品、垂直场景）

| 项目 | Stars | 说明 |
|---|---|---|
| [dream-num/univer](https://github.com/dream-num/univer) | +1060 today | 定位"AI Agent 的 Office 运行时”——表格/文档/幻灯/PDF 一体化，Agent 操控办公文档的关键载体 |
| [anthropics/financial-services](https://github.com/anthropics/financial-services) | +510 today | Anthropic 官方金融服务解决方案库，大厂加速垂直行业落地信号 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | ⭐52,134 | AI 生产力工作室，统一接入主流大模型 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | ⭐108,466 | 多 Agent LLM 金融交易框架 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐56,290 | 文档/主题生成原生 PowerPoint，办公场景爆款应用 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | ⭐153,074 | 本地优先的 AI 界面事实标准 |

### 🧠 大模型/训练（模型、训练框架、微调）

| 项目 | Stars | 说明 |
|---|---|---|
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | ⭐56,499 (+310 today) | 从零学 AI 工程的完整路径，教育与实操结合，持续霸榜 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐105,512 | PyTorch 从零实现 ChatGPT 级 LLM，经典教学项目 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | ⭐62,481 | 2 小时训练 64M 参数 LLM，中文社区教学标杆 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | ⭐61,989 | YOLO 系列持续迭代（已至 YOLO27）， CV 训练首选 |
| [RyanLiu112/AttnRL](https://github.com/RyanLiu112/AttnRL) | ⭐14 | ICLR 2026 推理模型过程监督 RL 论文代码，前沿研究方向 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars | 说明 |
|---|---|---|
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | ⭐30,968 | 自托管知识图谱 Agent 记忆平台，与今日 hindsight 热点同赛道 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐35,844 | "无向量、推理式 RAG"的文档索引，挑战传统向量检索范式 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | ⭐12,960 | MLSys 2026 最佳论文，个人设备上省 97% 存储的 RAG |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐65,951 | Agent 记忆层基础设施的生产级标准 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | ⭐91,276 | RAG + Agent 融合引擎，国内 RAG 头部方案 |
| [lancedb/lancedb](https://github.com/lancedb/lancedb) | ⭐11,522 | 嵌入式多模态检索库，轻量级路线代表 |

---

## 三、趋势信号分析

**1. Agent 记忆成为爆发性赛道。** hindsight 今日 +1607 位居全榜第一，与 mem0、cognee、claude-mem（⭐94,625）等存量项目呼应——当 Agent 进入长期运行时代，“记忆管理”正从 RAG 中独立出来成为独立中间件层。

**2. "Agent 运行时/Harness”大战开启。** Google ax（+1376）、strands harness-sdk（+463）、superpowers（+606）同日上榜，加上 ECC（⭐266k）等巨型项目，说明编排层竞争已从创业公司延伸到大厂，Go 语言在该层出现频率明显上升。

**3. 工具调用路由是新叙事。** treg 自称“Agent 工具的 OpenRouter”，CLI-Anything 推动“所有软件 Agent-Native"，预示 MCP 协议之后，工具的发现、封装与分发是下一个标准化焦点。

**4. Agent 与办公/行业软件融合。** Univer 重定位为“Office Harness for AI Agents"、Anthropic 发布金融服务方案库，反映 Agent 正从聊天/编码向传统生产力软件和垂直行业纵深渗透。

**5. Token 成本优化成显学。** headroom（压缩工具输出）、caveman（⭐107k，省 65% token）等项目高星，呼应推理成本压力下的工程化诉求。

---

## 四、社区关注热点

- **[google/ax](https://github.com/google/ax)** — Google 正式押注 Agent 编排运行时，Go 生态首个重量级 Agent 基建，值得跟踪其对 LangGraph 生态的冲击
- **[vectorize-io/hindsight](https://github.com/vectorize-io/hindsight)** — 今日增速第一，“会学习的记忆”区别于静态向量存储，Agent Memory 赛道风向标
- **[HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)** — 把任意软件封装为 Agent 可调用 CLI，若 CLI-Hub 生态成型可能成为 Agent 工具分发的关键基础设施
- **[dream-num/univer](https://github.com/dream-num/univer)** — Agent 操控办公文档的最佳载体，"Agent + Office"落地的稀缺标的
- **[superdesigndev/treg](https://github.com/superdesigndev/treg)** — 工具调用统一路由层，早期项目但卡位精准，建议观察其与 MCP 的兼容策略

---
*数据来源：GitHub Trending（2026-09-25）及 GitHub Search API 主题检索；Trending 榜单 stars 总量字段缺失，以今日新增为准。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*