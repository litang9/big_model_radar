# AI 开源趋势日报 2026-11-20

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-20 01:45 UTC

---

# 📰 AI 开源趋势日报 · 2026-11-20

## 一、今日速览

今日 Trending 榜几乎被 **“AI Agent Skills 生态”** 席卷：Claude Code 技能包（BugHunter、superpowers、diagram-design）霸榜前三梯队，单日新增 stars 均破千或接近千级。Cursor 官方发布 [plugins](https://github.com/cursor/plugins) 插件规范，与 Google Labs 的 stitch-skills 共同印证“Agent Skills 开放标准”正在成为跨厂商事实标准。Firecrawl 以“Agent 知识基础设施”定位单日 +825，数据供给层与技能层同步升温。HKUDS 一日三项目上榜（CLI-Anything、DeepTutor、nanobot），学术团队开源产出强势。

---

## 二、过滤说明

已排除非 AI 项目：`nginx/nginx`（通用服务器）、`AFFiNE`（通用知识库，AI 属性弱）、`Ghost-Downloader-3`（下载工具）、`cs-video-courses`、`Julia`、`paperless-ngx`、`tesseract`（传统 OCR）、`OpenBB`（数据平台）等。minimind、firecrawl 等在 Trending 与主题搜索中重复出现，已合并。

---

## 三、各维度热门项目

### 🔧 AI 基础工具（框架 / SDK / 推理 / 开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [obra/superpowers](https://github.com/obra/superpowers) | +2028 today | Agent 技能框架 + 软件开发方法论，今日榜首，"skills" 范式的标杆之作 |
| [cursor/plugins](https://github.com/cursor/plugins) | +384 today | Cursor 官方插件规范与官方插件，IDE 巨头入场定义生态接口 |
| [elementalsouks/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | +1349 today | 82 个技能、681 个已披露报告模式的红队/漏洞挖掘技能包 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | +302 today | Google 官方 Agent Skills 库，明确兼容 Antigravity/Gemini CLI/Claude Code/Cursor |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 204,271 (+825) | Agent 数据供给基础设施，550+ 数据源统一 API |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | +898 today | “让所有软件 Agent 原生化”，CLI-Hub 定位为 Agent 的通用操作层 |
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | +246 today | 老牌推理优化部署工具箱，边缘/本地推理持续有热度 |
| [ollama/ollama](https://github.com/ollama/ollama) | 187,673 | 本地模型运行事实标准，支持 Kimi/GLM/DeepSeek/gpt-oss/Qwen |

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | +954 today | 跨 Reddit/X/YouTube/HN 多源调研并生成 grounded 摘要的 Agent 技能，今日明星 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 264,765 | “与你共同成长的 Agent”，总量榜最高 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 307,308 | Agent Harness 性能优化系统：技能、本能、记忆、安全一体化 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 118,460 | 跨会话持久化上下文，兼容 Claude Code/Codex/Copilot 等全家桶 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | 48,012 | 轻量个人助理 + Agent Harness，带记忆与自我进化 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | 121,527 | 浏览器操作 Agent 标准库 |
| [trycua/cua](https://github.com/trycua/cua) | 32,686 | Computer-use 2.0：跨 OS 沙箱 + 训练评测数据生成 |

### 📦 AI 应用（垂直场景）

| 项目 | Stars | 说明 |
|---|---|---|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | +126 today | 长视频一键转短视频（字幕/封面/文案），中文内容创作者刚需 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 78,622 | 文档/主题 → 原生 PowerPoint（含动画、图表、旁白） |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | 83,801 | AI 求职 Agent：职位评分、简历定制、申请追踪 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 73,491 | LLM 驱动多市场股票分析，零成本定时运行 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 123,182 | 多智能体金融交易框架 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 159,104 | 最流行自托管 AI 界面 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 144,717 | 主题一键生成短视频的老牌王者 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 66,912 (+238) | 2 小时从 0 训 64M 模型，最佳 LLM 教学项目，长期霸榜 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 169,290 | 模型定义框架基座 |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | 79,611 | AI 工程系统性学习路径 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,789 | Apple Silicon 上手写 mini vLLM，推理系统学习利器 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,604 | 主流 LLM 评测平台，覆盖 100+ 数据集 |
| [thinkwee/AgentsMeetRL](https://github.com/thinkwee/AgentsMeetRL) | 1,885 | Agentic RL 论文清单，前沿方向风向标 |

### 🔍 RAG/知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 150,669 | 代码库 → 可查询知识图谱，无向量存储的确定性 AST 方案，增速惊人 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 94,448 | Agent 原生 RAG 数据库，从引擎进化为上下文基础设施 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 69,251 | Agent 记忆层事实标准 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | 80,173 | 进 LLM 前压缩上下文，JSON 省 60–95% token，成本敏感时代刚需 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | 40,491 | 无向量、推理式 RAG 文档索引 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 42,484 | 火山引擎自进化上下文数据库：记忆+RAG+技能统一 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | 13,805 | MLSys 2026 最佳论文，省 97% 存储的本地化 RAG |

---

## 四、趋势信号分析

**1. Agent Skills 生态全面爆发，正在形成开放标准。** 今日榜单 16 席中约 6 席是“技能包”类项目（superpowers、BugHunter、diagram-design、last30days、stitch-skills、graphify 的 /graphify skill）。关键信号是**厂商竞相兼容**：Google stitch-skills 明确声明遵循 Agent Skills 开放标准，Cursor 发布官方插件规范——技能层正在成为继 MCP 之后的第二个跨厂商接口标准，且二者正走向融合（skills + MCP 工具调用）。

**2. 安全/红队方向首次成建制登榜。** BugHunter（+1349）以 681 个真实披露报告模式构建攻击知识库，app-store-compliance 打通合规（EU AI Act 截止日期追踪）与 AI Agent，暗示“Agent 越自主、安全审计越刚需”的逻辑开始兑现。

**3. 上下文经济学成为基础设施议题。** headroom、caveman、claude-mem 三个月内崛起，核心卖点一致——压缩 token、持久化上下文，反映长任务 Agent 的成本与记忆痛点。同时 graphify、PageIndex 押注“无向量 RAG”，向量数据库范式受到挑战。

**4. 关联事件：** Cursor 插件规范发布大概率是今日 superpowers 类项目爆发的直接催化剂；HKUDS（港大数据智能实验室）一日多项目上榜显示学术开源的工业化输出能力。

---

## 五、社区关注热点

- **[obra/superpowers](https://github.com/obra/superpowers)** — 技能框架 + 方法论双载体，+2028 今日第一，理解 Agent Skills 范式的最佳入口
- **[cursor/plugins](https://github.com/cursor/plugins) + [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)** — 两大厂商同日推进开放插件/技能标准，生态接口之争开启，插件开发者应抢先布局
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** — 15 万 stars 的高速增长 + 确定性 AST/知识图谱路线，对“向量数据库唯一论”构成实质挑战
- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)** — 上下文压缩是当前 Agent 成本痛点的最直接解法，库/代理/MCP 三形态接入极低门槛
- **[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)** — AI 红队 + 真实漏洞模式库，安全从业者与 Agent 开发者双向值得研究

---
*数据来源：GitHub Trending（2026-11-20）+ GitHub Search API 主题搜索。Trending 榜 stars 总量字段缺失，以今日新增为准。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*