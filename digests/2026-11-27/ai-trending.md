# AI 开源趋势日报 2026-11-27

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-27 02:49 UTC

---

# 📊 AI 开源趋势日报 · 2026-11-27

## 一、今日速览

今日 GitHub Trending 榜单被 **AI Agent 技能（Skills）生态** 强势占据：Claude-BugHunter、superpowers、stitch-skills、last30days-skill 等围绕“Agent Skills 开放标准”的项目集体爆发，标志着 Agent 技能包正成为新的分发单元。与此同时，**Agent 原生化改造**成为另一主线——HKUDS/CLI-Anything 提出“让所有软件 Agent-Native”，Tracer-Cloud/opensre 将 CI/CD 可靠性交给 Agent。开源替代品持续升温：AutoClip 对标 OpusClip、Ghost-Downloader、AFFiNE 均获数百日增星。教育侧 minimind（两小时训 64M 模型）日增 702 星，显示“小模型从零训练”热度不减。

**Trending 榜单过滤结果**：16 个项目中剔除 `nginx/nginx`（通用 Web 服务器）、`Ghost-Downloader-3`（纯下载工具）、`AFFiNE`（知识库协作工具，AI 弱相关，降级处理），其余 13 个均为 AI 相关。

---

## 二、各维度热门项目

### 🤖 AI 智能体/工作流（今日最强赛道）

| 项目 | Stars | 说明 |
|---|---|---|
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | +1597 today | Claude Code 漏洞挖掘技能包：85 个技能、681 份已披露报告模式，覆盖 24 类漏洞。安全红队 + Agent Skills 结合的标杆，今日榜首 |
| [obra/superpowers](https://github.com/obra/superpowers) | +854 today | Agent 技能框架 + 软件开发方法论，被广泛视为 Claude Code 技能生态的“最佳实践母体” |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | +746 today | “让所有软件 Agent-Native”，港大 DS 实验室新作，配套 CLI-Hub 站点，是 Agent 与传统软件交互层的关键探索 |
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | +759 today | Agent 研究技能：跨 Reddit/X/YouTube/HN/Polymarket 多源聚合研究并生成有依据的摘要 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | +309 today | Google 官方出手，遵循 Agent Skills 开放标准的技能库，兼容 Stitch MCP，大厂为技能标准背书 |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | +327 today | 开源 CI/CD 可靠性 Agent，SRE 场景 Agent 化的先行者 |

### 🔧 AI 基础工具（框架、基础设施、开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 211,016 (+1046 today) | Agent 知识基础设施：550+ 数据源统一 API，Trending 与主题榜双榜在列，Agent 数据层事实标准 |
| [cursor/plugins](https://github.com/cursor/plugins) | +270 today | Cursor 官方插件规范发布，Coding Agent 生态正式开放插件化 |
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | +176 today | Intel 推理优化工具包，端侧部署路线持续活跃 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | +955 today | 为各家 Coding Agent 设计的高质量图表（52 类）自包含 HTML/SVG 素材，“给 Agent 用的设计资产”新物种 |
| [ollama/ollama](https://github.com/ollama/ollama) | 188,248 | 本地模型运行时事实标准，支持 Kimi/GLM/DeepSeek/gpt-oss 等 |

### 🔍 RAG/知识库/记忆

| 项目 | Stars | 说明 |
|---|---|---|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 120,018 | Agent 跨会话持久记忆层，压缩历史上下文并注入未来会话，支持主流 Coding Agent |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 94,786 | Agent 原生数据库，从 RAG 引擎演进为上下文基础设施 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | 80,950 | 上下文压缩：JSON 场景省 60-95% token，直击 Agent 成本痛点 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 69,516 | Agent 记忆层基础设施，生产级 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 153,889 | 代码库→可查询知识图谱（无向量库），知识图谱路线在 Coding 场景反攻向量检索 |

### 📦 AI 应用（垂直场景产品）

| 项目 | Stars | 说明 |
|---|---|---|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | +774 today | 开源 OpusClip 替代：本地优先 AI 剪辑 + MCP 服务器，一键长视频→短视频，中文内容生态适配 |
| [mjmirza/app-store-compliance](https://github.com/mjmirza/app-store-compliance) | +562 today | 应用商店合规守卫：125 个拒审模式 + 117 个法规节点（EU AI Act/DSA），AI 深度参与应用出海合规 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 74,852 | LLM 多市场股票分析系统，零成本定时运行 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 145,879 | 主题→高清短视频自动化工作流，与 autoclip 同属内容生产赛道 |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | 115,083 | 给 Agent 装上“看全网的眼睛”，覆盖 Twitter/Reddit/B站/小红书，零 API 费 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 71,734 (+702 today) | 两小时从零训练 64M LLM，教学型训练项目长盛不衰 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 109,102 | PyTorch 逐步实现 ChatGPT 级 LLM，经典教材项目 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,814 | Apple Silicon 上实现迷你 vLLM，推理系统学习佳作 |
| [trycua/cua](https://github.com/trycua/cua) | 33,020 | Computer-use 2.0：开源驱动 + 跨 OS 沙箱 + 训练评测基准，GUI Agent 底层设施 |

---

## 三、趋势信号分析

**1. Agent Skills 成为新的分发单元。** 今日热榜前六名中五个是“技能包/技能框架”，且多家项目显式声明遵循 Agent Skills 开放标准。随着 Anthropic 推动标准、Cursor 开放插件规范、Google（stitch-skills）下场背书，Coding Agent 生态正从“单一产品”走向“可插拔技能市场”——这类似于浏览器扩展生态的早期时刻。

**2. “Agent-Native 化”浪潮启动。** CLI-Anything 代表新叙事：不是给 Agent 配工具，而是把存量软件改造为 Agent 可原生操作。opensre（CI/CD）、app-store-compliance（合规）均是垂域 Agent 化实例。

**3. 上下文经济成为基础设施赛道。** headroom（压缩）、claude-mem（记忆）、graphify（知识图谱替代向量）、firecrawl（数据接入）同时活跃——Agent 的“燃料供给”层资本与社区投入持续加码，token 成本焦虑是核心驱动。

**4. 开源替代 + 合规双线并进。** autoclip 对标 OpusClip、开源剪辑工具与法规追踪（EU AI Act 117 个节点）同时登榜，反映 AI 应用“订阅疲劳 + 监管收紧”双重背景下，本地优先与合规工具的确定性需求。

**5. 中文社区项目表现突出**：minimind、autoclip、daily_stock_analysis、思源笔记等在中英文生态双线获星，中文 AI 开源力量已成榜单常量。

---

## 四、社区关注热点

- **[Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)** — 今日 +1597 星榜首，安全红队技能化的模板级项目，研究其 681 个报告模式的组织方式对做 Skills 仓库极具参考价值
- **[HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)** — “Agent-Native 软件”新叙事首登热榜，可能是下一阶段 Agent 落地的关键接口层
- **[cursor/plugins](https://github.com/cursor/plugins) + [stitch-skills](https://github.com/google-labs-code/stitch-skills)** — Cursor 插件规范 + Google 技能库双发布，Agent Skills 开放标准进入大厂采用期，值得第一时间跟进规范文档
- **[headroom](https://github.com/headroomlabs-ai/headroom)** — 上下文压缩是当前 Agent 成本痛点的最直接解法，60-95% JSON token 节省数据值得复现验证
- **[autoclip](https://github.com/zhouxiaoka/autoclip)** — 本地优先 + MCP 服务器 + 视频剪辑组合，是“AI 应用开源替代闭源 SaaS”的典型样本，也演示了桌面应用集成 MCP 的路径

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*