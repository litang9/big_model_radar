# AI 开源趋势日报 2026-11-22

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-22 00:18 UTC

---

# AI 开源趋势日报 · 2026-11-22

## 一、今日速览

今日 GitHub Trending 被 **"Agent Skills 生态"** 强势占据：Claude Code 技能包（安全攻防、合规检查、话题研究、图表设计）占据榜单近半席位，标志着 AI 编码代理的“技能标准化”正成为新的社区焦点。安全方向尤为亮眼——Claude-BugHunter（+1803 today）以红队攻防技能包登顶今日热榜。中文开发者生态持续活跃，minimind（从零训练 LLM）与 AutoClip（AI 视频剪辑）双双上榜。此外，Agent 基础设施层竞争加剧：上下文压缩、记忆持久化、知识图谱化等“Agent 上下文工程”工具星量暴涨。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | +200 today | Intel 老牌推理优化部署工具包，端侧/边缘 AI 推理的中坚力量，今日重回热榜 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | +769 today | "让所有软件 Agent 原生化”，为任意软件生成 CLI 接口，打通 Agent 工具调用链路，港大 HKUDS 出品 |
| [cursor/plugins](https://github.com/cursor/plugins) | +260 today | Cursor 官方插件规范与官方插件库，Cursor 开放插件生态的标志性动作 |
| [ollama/ollama](https://github.com/ollama/ollama) | 187.8k | 本地大模型运行事实标准，已支持 Kimi、GLM、DeepSeek、gpt-oss、Qwen 等主流开源模型 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 9.2k | Rust 生态 LLM 应用框架，模块化构建方案，Rust + AI 组合的代表 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5.8k | 在 Apple Silicon 上手写一个 mini vLLM，面向系统工程师的推理系统学习项目 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars | 说明 |
|---|---|---|
| [obra/superpowers](https://github.com/obra/superpowers) | +883 today | Agent 技能框架 + 软件开发方法论，"agentic skills that work"，今日技能热潮的核心基建之一 |
| [elementalsouks/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | +1803 today | 今日最热：82 个技能 + 681 个已披露漏洞报告模式，覆盖 24 类漏洞与红队攻击矩阵，安全 + Agent Skills 交叉引爆 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | +326 today | Google Labs 官方 Agent Skills 库，遵循 Agent Skills 开放标准，兼容 Gemini CLI/Claude Code/Cursor 等 |
| [mjmirza/app-store-compliance](https://github.com/mjmirza/app-store-compliance) | +720 today | 应用商店合规手册 + AI 编码代理技能，含 117 个拒审模式与 EU AI Act 等 95 个合规截止日追踪 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 265.2k | “与你共同成长的 Agent”，超高星量个人 Agent 产品 |
| [trycua/cua](https://github.com/trycua/cua) | 32.8k | Computer-use 2.0：跨 OS 沙箱 + 训练评测数据生成的开源驱动层 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | 48k | 开源个人 AI 助手 + Agent Harness，多智能体、多模型、一行安装，chatgpt 中文生态出品 |

### 📦 AI 应用（垂直场景解决方案）

| 项目 | Stars | 说明 |
|---|---|---|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | +683 today | 链接一键出片：长视频自动剪辑成短视频，生成字幕/封面/文案，适配抖音、TikTok 等全平台 |
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | +560 today | Agent 研究技能：跨 Reddit/X/YouTube/HN/Polymarket 多源调研并合成带依据的摘要 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | +583 today | 45 种编辑级图表的 HTML+SVG 素材库，专为 Claude Code/Cursor 等编码代理设计，"反 Mermaid slop" |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | +450 today | 开源 CI/CD 可靠性 Agent，AIOps 在 DevOps 领域落地 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 79.1k | 文档/主题 → 原生 PowerPoint（原生形状、动画、图表、语音旁白），办公场景爆款 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 123.4k | 多智能体 LLM 金融交易框架，Agent + 量化方向标杆 |

### 🧠 大模型/训练（模型、训练框架、微调）

| 项目 | Stars | 说明 |
|---|---|---|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 68.1k（+488 today） | "两小时从零训练 64M 大模型”，LLM 教育领域第一爆款，持续霸榜 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 108.8k | PyTorch 手写 ChatGPT 级 LLM 的配套代码库，经典学习资源 |
| [FonaTech/Project_Chronos](https://github.com/FonaTech/Project_Chronos) | 207 | 零停顿 MoE 推理：前瞻预测 + 异步 DMA 预取，面向 SSD I/O 优化，前沿小众但方向值得关注 |
| [thinkwee/AgentsMeetRL](https://github.com/thinkwee/AgentsMeetRL) | 1.9k | Agentic RL 论文合集，LLM 强化学习方向热度持续攀升 |
| [thinkwee/AwesomeOPD](https://github.com/thinkwee/AwesomeOPD) | 883 | On-Policy Distillation 论文合集，蒸馏方向新整理资源 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars | 说明 |
|---|---|---|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 206.2k（+1006 today） | Agent 知识基础设施：搜索 + 抓取 + 550 数据源统一 API，今日双榜在列，势头最猛 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 118.8k | 跨会话持久上下文：自动压缩 Agent 会话历史并注入未来会话，兼容所有主流编码代理 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 42.6k | 字节开源自进化上下文数据库，统一 Agent 记忆、知识 RAG 与技能 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 151.6k | 把代码库 + 文档 + PDF 转成可查询知识图谱的 Claude Code 技能，"无向量库"路线 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 69.3k | Agent 记忆层事实标准，生产级持久记忆基础设施 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | 13.8k | MLSys 2026 最佳论文：存储节省 97% 的本地隐私 RAG 方案 |

---

## 三、趋势信号分析

**1. Agent Skills 成为今日最强信号。** 热榜 16 席中约 7 个项目直接围绕 Claude Code / Codex / Cursor 的技能包与规范（BugHunter、superpowers、diagram-design、last30days-skill、app-store-compliance、stitch-skills、graphify）。Google Labs 推出遵循开放标准的 Stitch Skills、Cursor 开放插件规范，说明“技能/插件标准化”已从社区玩法升级为平台级竞争——Anthropic 提出的 Agent Skills 开放标准正在被多厂商采纳。

**2. 安全与合规是 Skills 爆发的第一场景。** BugHunter（红队攻防，+1803）与 app-store-compliance（含 EU AI Act 截止日追踪，+720）登榜，反映 AI 编码代理被引入安全审计与合规审查等高风险专业领域，且 EU AI Act 生效节点临近的直接拉动。

**3. 上下文工程（Context Engineering）基础设施爆发。** claude-mem（记忆持久化）、headroom（输出压缩省 token）、caveman（短回答代理）、graphify（知识图谱化）、OpenViking（上下文数据库）星量齐高——Agent 上下文的压缩、记忆与结构化成为独立赛道。

**4. 中文开发者生态与教育方向持续强势。** minimind、AutoClip、CowAgent、daily_stock_analysis 等中文项目在高星量与热榜两端均有表现，“从零训练小模型”作为学习范式生命力持久。

---

## 四、社区关注热点

- **[Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)**（+1803 today）：今日第一，"安全 + Agent Skills"交叉点，681 个真实漏洞报告模式是稀缺的实战语料，安全从业者和 Agent 开发者都值得关注
- **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)**（+1006 today）：今日净增最高，Agent 数据获取层头部项目，550+ 数据源统一 API 已成事实标准
- **[superpowers + Agent Skills 开放标准](https://github.com/obra/superpowers)**：Skills 生态的方法论源头之一，配合 Cursor plugins 与 stitch-skills 观察，可判断“编码代理插件化”是未来 6 个月的平台主战场
- **[CLI-Anything](https://github.com/HKUDS/CLI-Anything)**：HKUDS 连续爆款（nanobot、DeepTutor、Vibe-Trading）后的新尝试，“Agent 原生化所有软件”若成立将显著扩展 Agent 工具边界
- **上下文工程组合**：[claude-mem](https://github.com/thedotmack/claude-mem) + [mem0](https://github.com/mem0ai/mem0) + [OpenViking](https://github.com/volcengine/OpenViking)——三家不同路线（会话记忆 / 记忆层 / 上下文数据库）同场竞技，适合对比学习 Agent 记忆架构设计

---

*数据来源：GitHub Trending（2026-11-22）及 GitHub Search API 主题检索；星量为当日快照，Trending 榜 stars 总量缺失处以今日增量为准。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*