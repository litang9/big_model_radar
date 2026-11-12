# AI 开源趋势日报 2026-11-12

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-12 01:53 UTC

---

# AI 开源趋势日报 · 2026-11-12

## 一、今日速览

今日热榜被“AI 编码智能体工具链”全面占领：shadcn/improve（模型分层审计）、addyosmani/agent-skills、vercel-labs/agent-browser 集中上榜，Coding Agent 生态进入“精细化分工”阶段。OpenAI 发布 codex-security 官方安全扫描 CLI，标志着大厂开始将 Agent 安全标准化。垂直场景方面，LLM 股票分析（daily_stock_analysis）和智能家居 MCP 化（ha-mcp）双双爆发，AI 正加速渗透金融与 IoT 领域。主题榜上，Agent 上下文压缩与记忆（headroom、claude-mem）成为 RAG 赛道新增长点。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、CLI、开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | +787 today | 生产级工程技能包，可直接注入 AI 编码智能体，今日热榜 Top 3 |
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | +708 today | Rust 编写的浏览器自动化 CLI，专为 Agent 设计，工具层轻量化趋势代表 |
| [openai/codex-security](https://github.com/openai/codex-security) | +52 today | OpenAI 官方安全漏洞发现/修复 CLI + TS SDK，Agent 安全新基建 |
| [shadcn/improve](https://github.com/shadcn/improve) | +361 today | 用强模型审计代码库生成计划、弱模型执行的“模型分层”编排工具 |
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐186.7k | 本地推理引擎事实标准，已全面支持 GLM、DeepSeek、Qwen、gpt-oss 等国产/开源模型 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | ⭐119.1k | 病毒式传播的 token 压缩代理，帮编码智能体省 65% token，成本优化风向标 |
| [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale) | ⭐41.2k | Rust 终端编码智能体，任意 provider/model，开源版 Claude Code 竞品 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化）

| 项目 | Stars | 说明 |
|---|---|---|
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐301.4k | Agent Harness 性能优化系统（技能/记忆/安全），横跨 Claude Code、Codex、Cursor |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐262.7k | “与你共同成长”的个人 Agent，开源社区对陪伴式 Agent 的探索 |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | ⭐113.2k | 职场 Agent 统一管理应用，Agent Ops 赛道头部产品 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | ⭐120.7k | 浏览器 Agent 标准库 + 云服务，与今日上榜的 agent-browser 形成赛道共振 |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | ⭐111.1k | 让 Agent 读取全网（Twitter/Reddit/B站/小红书）的零成本 CLI |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | ⭐149.4k | 老牌 Agent 工程平台，持续迭代 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | ⭐47.9k | 国产个人助理 Agent Harness，一行安装、自进化记忆 |

### 📦 AI 应用（垂直场景）

| 项目 | Stars | 说明 |
|---|---|---|
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | ⭐70.3k (+278 today) | LLM 多市场股票分析系统，零成本定时运行，今日上榜且总量惊人 |
| [homeassistant-ai/ha-mcp](https://github.com/homeassistant-ai/ha-mcp) | +645 today | 用 Claude/ChatGPT 配置和自动化 Home Assistant，MCP + IoT 落地标杆 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐76.0k | 文档/主题 → 原生 PowerPoint，办公生产力 Agent 化代表 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | ⭐82.0k | AI 求职智能体：JD 评分 + 简历定制 + 面试准备 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | ⭐142.6k | 关键词一键生成短视频，内容生产自动化长青项目 |
| [HKUDS/Vibe-Trading](https://github.com/HKUDs/Vibe-Trading) | ⭐38.1k | 港大出品的个人交易 Agent，与股票分析热潮呼应 |

### 🧠 大模型/训练（模型、训练框架、评测）

| 项目 | Stars | 说明 |
|---|---|---|
| [huggingface/transformers](https://github.com/huggingface/transformers) | ⭐168.9k | 模型定义框架基石，多模态训练/推理全覆盖 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐108.3k | PyTorch 从零实现 LLM，AI 工程教育标杆 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | ⭐105.4k | 深度学习训练框架基石 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | ⭐63.3k | YOLO27/26 持续迭代，CV 检测事实标准 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | ⭐7.6k | LLM 评测平台，覆盖 100+ 数据集，模型选型必备 |

### 🔍 RAG/知识库（向量库、检索增强、记忆）

| 项目 | Stars | 说明 |
|---|---|---|
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | ⭐79.4k | 工具输出/RAG 分块压缩，省 20%~95% token，上下文经济学新赛道 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐116.2k | 跨会话持久化 Agent 记忆，兼容主流编码智能体 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | ⭐94.0k | Agent 原生 RAG 数据库，向上下文基础设施演进 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | ⭐42.0k | 字节跳动自进化上下文数据库，统一记忆/知识/技能 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐40.4k | 无向量、推理式 RAG 索引，对传统向量检索的范式挑战 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐68.8k | Agent 记忆层生产级基础设施 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐146.2k | 代码库→可查询知识图谱，无向量存储的确定性方案 |

*注：Trending 榜中 meta/astryx（设计系统）、modern-web-guidance-src、sure、TheAlgorithms/Java 与 AI 关联度弱或无明确 AI 属性，已过滤或降权处理。*

---

## 三、趋势信号分析

**1. Coding Agent 工具链进入“精耕期”。** 今日热榜 10 席中 4 席（agent-skills、agent-browser、improve、codex-security）都是为编码智能体服务的配套工具，而非 Agent 本身——社区关注点正从“造 Agent”转向“让 Agent 更省、更稳、更安全”。

**2. 模型分层与成本优化成为主流叙事。** shadcn/improve（强模型规划 + 弱模型执行）与 caveman（省 65% token）、headroom（压缩进 LLM 前的数据）共同指向同一命题：在推理成本高企的背景下，“上下文/token 经济学”是新的护城河。

**3. Agent 安全首次成建制登榜。** OpenAI 官方下场推出 codex-security，配合 awesome-MLSecOps 等资源库，预示 Agent 供应链安全将成为 2027 年合规与工程焦点。

**4. MCP 向 IoT/家居场景扩散。** ha-mcp 单日 +645 stars，说明 MCP 生态正从开发工具扩展到消费级硬件自动化。

**5. 金融 Agent 持续高热。** daily_stock_analysis（+278 today）、Vibe-Trading、OpenBB 同框出现，LLM 量化分析是当前最活跃的垂直落地场景之一。

---

## 四、社区关注热点

- **[shadcn/improve](https://github.com/shadcn/improve)**：模型分层编排（强模型审计 + 弱模型执行）的极简实现，是降本思路的最佳参考样板。
- **[openai/codex-security](https://github.com/openai/codex-security)**：大厂官方 Agent 安全工具首秀，无论是否用 Codex 都值得跟踪其检测思路。
- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)** + **[claude-mem](https://github.com/thedotmack/claude-mem)**：上下文压缩与持久记忆组合，是当前 Agent 基建中增长最快的细分赛道。
- **[ha-mcp](https://github.com/homeassistant-ai/ha-mcp)**：MCP + 智能家居的落地范本，个人 IoT 自动化开发者的切入点。
- **[daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)**：零成本定时运行 + 决策看板的完整 LLM 金融工作流，中文社区现象级项目，适合学习其工程化实践。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*