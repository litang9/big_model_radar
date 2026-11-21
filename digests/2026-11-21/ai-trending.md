# AI 开源趋势日报 2026-11-21

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-21 01:29 UTC

---

# 《AI 开源趋势日报》2026-11-21

## 一、今日速览

今日 GitHub Trending 被 **Agent Skills 生态**强势占领：Claude-BugHunter、superpowers、stitch-skills、diagram-design 等"技能包"项目集体上榜，标志着 Agent Skills 开放标准正快速成为跨编码代理的通用格式。中文开发者社区活跃度显著提升，minimind（从 0 训练小模型）、AutoClip（AI 剪辑）、CLI-Anything（Agent 化 CLI）等项目同时登榜。检索与上下文基础设施持续火热：Firecrawl 单日 +1241 stars，RAG/记忆/向量数据库赛道在主题搜索中占据近 20 席。整体看，社区重心已从“造模型”转向“给 Agent 装装备”——技能、记忆、上下文压缩、知识供给成为最拥挤的赛道。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | ⭐205,294（+1241 today） | Agent 知识基础设施，统一 API 接入 550+ 数据源，今日热榜 AI 类第一，社区爆发式增长 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | +773 today | “让所有软件 Agent 原生化”，港大 DS 实验室出品，代表 Agent 与传统软件交互界面的新方向 |
| [cursor/plugins](https://github.com/cursor/plugins) | +299 today | Cursor 官方插件规范发布，编码 IDE 生态走向开放标准化 |
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐187,766 | 本地模型运行事实标准，支持 Kimi、GLM、DeepSeek、gpt-oss、Qwen 等主流开源模型 |
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | +217 today | Intel 推理优化工具包，端侧部署推理的长期标杆 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | ⭐169,331 | 模型定义框架基石，文本/视觉/多模态训练与推理全覆盖 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | +636 today | 面向 Claude Code/Codex/Cursor 的图表设计资产（45 种图型、自包含 SVG），AI 生成视觉资产的新品类 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化）

| 项目 | Stars | 说明 |
|---|---|---|
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouts/Claude-BugHunter) | +1622 today | 今日榜第一。82 个技能 + 681 个已披露漏洞报告模式的外部红队技能包，安全向 Agent Skills 的代表作 |
| [obra/superpowers](https://github.com/obra/superpowers) | +890 today | Agentic 技能框架 + 软件开发方法论，“可落地的 Agent 工作流”范本 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | +315 today | Google 官方出手，遵循 Agent Skills 开放标准的技能库，兼容 Antigravity/Gemini CLI/Claude Code/Cursor |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐307,864 | Agent harness 性能优化系统：技能、直觉、记忆、安全一体化，多编码代理通用 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐265,000 | “与你共同成长的 Agent”，个人 Agent 伴侣方向的高星代表 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | ⭐121,623 | 浏览器 Agent 标准库 + 云服务，Web 自动化刚需 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | ⭐188,121 | 自主 Agent 先驱，仍在持续演进 |

### 📦 AI 应用（垂直场景产品）

| 项目 | Stars | 说明 |
|---|---|---|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | +979 today | 开源 AI 视频剪辑桌面工具，长视频一键转短视频 + 字幕封面文案，中文社区今日爆款 |
| [mjmirza/app-store-compliance](https://github.com/mjmirza/app-store-compliance) | +869 today | 应用商店合规手册：117 个拒审模式 + EU AI Act 等 95 个合规截止日期追踪，含 AI Agent 技能 |
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | +681 today | 跨 Reddit/X/YouTube/HN/Polymarket 的主题研究 Agent 技能，AI 信息综合工具 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | ⭐144,840 | 一键生成短视频的 AI 工作流，与 AutoClip 同赛道印证内容再利用需求旺盛 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐78,869 | 文档/主题转原生 PPT（含图表、动画、语音），办公场景 Agent 应用 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | ⭐73,568 | LLM 多市场股票分析系统，金融垂直应用持续走热 |
| [XiaoYouChR/Ghost-Downloader-3](https://github.com/XiaoYouChR/Ghost-Downloader-3) | +1082 today | ⚠️ 边缘项目：下载器本体非 AI，排除建议为主，仅作记录 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | ⭐67,698（+847 today） | “两小时从 0 训出 64M 大模型”，最佳 LLM 教育类项目，长期霸榜 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐108,719 | PyTorch 从零实现 ChatGPT 级模型，与 minimind 构成“原理学习”双子星 |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | ⭐79,694 | AI 工程全栈教程，学习型项目热度持续高位 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | ⭐7,609 | LLM 评测平台，覆盖 100+ 数据集，模型评估刚需 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | ⭐5,797 | 在 Apple Silicon 上构建 mini vLLM，推理系统学习佳品 |

### 🔍 RAG/知识库（向量库、检索、记忆）

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐151,192 | 代码库转可查询知识图谱的 Claude Code/Cursor 技能，无向量库的确定性 AST 方案，增长迅猛 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐118,651 | 跨会话持久记忆，覆盖 Claude Code/Codex/Gemini 等几乎所有主流 Agent |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | ⭐121,796 | Token 压缩代理：“few token do trick”，编码 Agent 降本工具 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | ⭐80,221 | 工具输出/RAG 分块压缩库，JSON 场景省 60-95% token |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | ⭐94,486 | Agent 原生数据库，RAG 引擎演进为上下文基础设施 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐69,285 | Agent 记忆层标准方案，生产级持久上下文 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | ⭐42,543 | 字节出品：自进化上下文数据库，统一记忆/RAG/技能 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐40,509 | 无向量、基于推理的文档索引 RAG，“vectorless RAG”新范式 |

---

## 三、趋势信号分析

**1. Agent Skills 成为今日最强叙事。** 热榜 16 席中至少 6 个是“技能包”类项目（BugHunter、superpowers、stitch-skills、diagram-design、last30days-skill、app-store-compliance），且 Google Labs 官方入场推出遵循 Agent Skills 开放标准的技能库。这表明编码 Agent 的竞争已从“谁的模型强”转向“谁的生态装备多”，技能格式正走向类似 MCP 的跨平台标准化。

**2. 上下文经济学崛起。** caveman、headroom、claude-mem、Graphify 等项目共同指向同一痛点：Agent 时代 token 是最贵的资源，压缩、记忆管理、确定性解析（AST/知识图谱替代向量检索）是三大解法。PageIndex 的 vectorless RAG 和 LEANN 的 97% 存储节省代表“去向量库化”的技术新方向。

**3. 中英文社区双引擎。** minimind、AutoClip、CLI-Anything、daily_stock_analysis 等中文项目持续登榜，内容创作（视频剪辑）与金融分析是中文社区最活跃的两大垂直方向。

**4. 安全与合规成为 Agent 应用新分支。** BugHunter（红队技能包）与 app-store-compliance（EU AI Act 合规追踪）同时上榜，反映 AI 安全/合规工具正从企业专属走向开源社区。

---

## 四、社区关注热点

- **[Claude-BugHunter](https://github.com/elementalsoufs/Claude-BugHunter)**（+1622）：今日全榜第一，AI 安全红队 + 技能包范式结合体，是观察 Agent Skills 标准落地的最佳样本
- **[CLI-Anything](https://github.com/HKUDS/CLI-Anything)**（+773）：“让所有软件 Agent 原生化”——MCP 之后，CLI 可能成为 Agent 接入存量软件的第二条路径
- **[cursor/plugins](https://github.com/cursor/plugins) + [stitch-skills](https://github.com/google-labs-code/stitch-skills)**：Cursor 与 Google 双双开放插件/技能规范，编码 Agent 生态标准化竞赛开启，开发者应尽早跟进 Agent Skills 规范
- **[headroom](https://github.com/headroomlabs-ai/headroom) / [caveman](https://github.com/JuliusBrussee/caveman)**：token 压缩是 Agent 成本的直接杠杆，20%~95% 的节省对重度 Agent 用户是硬需求
- **[PageIndex](https://github.com/VectifyAI/PageIndex)**：用推理替代向量检索的 RAG 新范式，若验证成功可能改变 RAG 基础设施格局

---
*数据来源：GitHub Trending（2026-11-21）+ GitHub Search API 主题搜索，共 97 个仓库，筛除 nginx、AFFiNE、Ghost-Downloader-3 等 4 个非 AI 项目。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*