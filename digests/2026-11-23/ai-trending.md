# AI 开源趋势日报 2026-11-23

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-23 00:49 UTC

---

# AI 开源趋势日报 · 2026-11-23

## 一、今日速览

今日 Trending 榜被 **Agent Skills 生态**刷屏：Claude-BugHunter、superpowers、stitch-skills、last30days-skill 等一批面向 Claude Code / Codex / Cursor 等 Coding Agent 的“技能包”集体爆发，标志着 AI 编程助手的竞争正从模型层转向**技能与上下文生态层**。同时，agent 基础设施持续走热：firecrawl（+915）领衔数据接入层，CLI-Anything（+699）试图让所有软件 Agent 原生化。教育侧 minimind（+473）继续验证“小模型从零训练”的旺盛需求。整体来看，**“Agent Harness + Skills + 记忆/上下文”** 已成为当前最清晰的开源叙事主线。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 207,036（+915 today） | Agent 的“知识基础设施”：一个 API 打通 550+ 数据源，搜索/抓取统一入口，今日热榜增量第一 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | 新仓库（+699 today） | 让所有软件 Agent 原生化，配套 CLI-Hub，代表“软件为 Agent 造 CLI”的新范式 |
| [cursor/plugins](https://github.com/cursor/plugins) | 新仓库（+294 today） | Cursor 官方插件规范与官方插件，IDE 巨头开放生态的标志性动作 |
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | —（+158 today） | 老牌推理优化部署工具包，稳定上榜，端侧推理需求持续 |
| [ollama/ollama](https://github.com/ollama/ollama) | 187,888 | 本地模型运行事实标准，已支持 Kimi、GLM、DeepSeek、gpt-oss、Qwen 等全家桶 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,624 | 覆盖 100+ 数据集的 LLM 评测平台，模型评测刚需 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars | 说明 |
|---|---|---|
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouts/Claude-BugHunter) | 新仓库（+1716 today，今日榜第一） | 82 个技能 + 681 份已披露漏洞报告模式的红队技能包，Agent 安全攻防成为热点 |
| [obra/superpowers](https://github.com/obra/superpowers) | 新仓库（+788 today） | “真正可用的” Agent 技能框架与软件开发方法论，方法论类项目获高认可 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 265,425 | “与你共同成长的 Agent”，总量最高的 Agent 项目之一 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 309,031 | Agent Harness 性能优化系统：技能、本能、记忆、安全一体化 |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | 新仓库（+399 today） | CI/CD 可靠性 Agent，SRE 场景 Agent 化的代表 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | 188,136 | 自主 Agent 鼻祖，仍是生态风向标 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | 48,044 | 国产个人 AI 助手与 Agent Harness，自我进化 + 多渠道 |

### 📦 AI 应用（垂直场景产品）

| 项目 | Stars | 说明 |
|---|---|---|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | 新仓库（+641 today） | 一键长视频转短视频，自动字幕/封面/文案，适配抖音、TikTok 等全平台 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 145,095 | 主题词一键生成短视频的自动化工作流，内容生产自动化标杆 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 123,507 | 多 Agent LLM 金融交易框架 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 73,711 | LLM 多市场股票分析 + 自动推送，零成本定时运行 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 159,285 | 最流行的自托管 AI 界面 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | 84,224 | AI 求职 Agent：扫岗位、按简历打分、定制 ATS 简历 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 68,646（+473 today） | 2 小时从零训练 64M 参数 LLM，国产 AI 教育顶流，长期霸榜 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 108,841 | PyTorch 逐步实现 ChatGPT 式 LLM，经典学习资源 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 169,399 | 模型定义框架事实标准 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,803 | 在 Apple Silicon 上构建 tiny vLLM，面向系统工程师的推理系统教学 |
| [galilai-group/stable-pretraining](https://github.com/galilai-group/stable-pretraining) | 352 | 可靠、最小化的基础模型预训练库，早期值得关注 |

### 🔍 RAG/知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 152,060 | 把任意代码库变成可查询知识图谱，AST 确定性解析、无向量库，增长迅猛 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 94,547 | Agent 原生数据库，RAG 引擎长成的“上下文基础设施” |
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | 87,677 | Agent 专用爬虫，开源核心 + 云服务双轮驱动 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | 80,506 | LLM 输入压缩：JSON 省 60-95% token，“token 经济学”赛道 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | 40,748 | 无向量、推理式 RAG 文档索引，技术路线创新 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 42,616 | 字节系自进化上下文数据库，统一记忆/RAG/技能 |
| [LEANN](https://github.com/StarTrail-org/LEANN) | 13,808 | MLSys2026 最佳论文：97% 存储节省的端侧 RAG |

### 📌 边缘交叉类（Skills 生态，值得单列观察）

- [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)（+668 today）：跨 Reddit/X/YouTube/HN 的主题研究 Skill
- [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)（+494 today）：Google 官方 Agent Skills 库，遵循开放标准
- [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design)（+518 today）：45 种编辑级图表设计 Skill
- [mjmirza/app-store-compliance](https://github.com/mjmirza/app-store-compliance)（+621 today）：应用商店合规 Skill，含 EU AI Act 等 112 项合规节点

---

## 三、趋势信号分析

1. **Agent Skills 成为爆发性品类**：今日榜 16 席中约 7 席是 Skills/Harness 类项目（BugHunter、superpowers、stitch-skills、diagram-design 等）。随着 Claude Code、Codex、Cursor 等编程 Agent 普及，社区创新已从“造 Agent”转向“给 Agent 装技能”，且出现跨客户端兼容的开放标准。
2. **Agent 安全攻防首度集中登榜**：BugHunter 以 +1716 居首，结合 MLSecOps 类资源热度和 app-store-compliance 对 EU AI Act 的合规追踪，说明“Agent 红队 + AI 合规”正从边缘走向主流。
3. **上下文/记忆基础设施竞争白热化**：graphify（知识图谱化，15 万星）、claude-mem、mem0、headroom（token 压缩）、OpenViking 均指向同一命题——Agent 的长期记忆与上下文管理。其中“去向量库”（graphify、PageIndex）是值得注意的反主流路线。
4. **教育与国产项目活跃**：minimind、CLI-Anything（HKUDS）、CowAgent、autoclip 等中文社区项目持续上榜，中文 AI 开源生态输出能力明显增强。

---

## 四、社区关注热点

- **[Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)**：今日 +1716 全榜第一，82 技能红队工具包，安全从业者与 Agent 开发者都应关注
- **[superpowers](https://github.com/obra/superpowers)**：技能框架 + 方法论双载体，代表了 Skills 生态的最佳实践范式
- **[CLI-Anything](https://github.com/HKUDS/CLI-Anything)**：'Making ALL Software Agent-Native' 若成立，将定义软件与 Agent 的交互接口层
- **[graphify](https://github.com/Graphify-Labs/graphify)**：代码库知识图谱 + 无向量库 RAG，15 万星增速罕见，检索范式可能生变
- **[cursor/plugins](https://github.com/cursor/plugins)**：Cursor 开放插件规范，IDE Agent 生态平台化的起点，做开发者工具的团队建议尽早跟进

*数据说明：Trending 今日 stars 为实时数据最可信；主题搜索 stars 为累计总量。已排除 nginx、AFFiNE、Ghost-Downloader-3 等非 AI 核心项目。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*