# AI 开源趋势日报 2026-11-15

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-14 23:53 UTC

---

# 《AI 开源趋势日报》2026-11-15

---

## 一、今日速览

今日 Trending 榜几乎被 **Coding Agent 周边生态**占领：从 Chrome DevTools 官方 MCP、Google 的 agent 指导文档，到阿里巴巴的 LLM 代码审查工具，“让编码智能体更好工作”成为最强主题。**Agent 人机协作与工作流管控**（plannotator、LoopForge）首次密集登榜，标志社区焦点从“Agent 能不能干活”转向“人如何审核和决策”。同时，**Token 成本优化**（caveman、headroom）成为独立热门赛道。大厂（Google、Alibaba、Tencent、Chrome 团队）今日集体入场 Agent 工具链，竞争明显升温。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | +673 today | Chrome 官方为编码智能体打造的 DevTools MCP 服务，浏览器调试能力直接接入 Agent |
| [GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) | +1225 today（今日第一） | 谷歌官方发布，让 Coding Agent 始终遵循最新 Web 最佳实践——官方下场规范 Agent 行为 |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | +897 today | 阿里开源混合架构代码审查：确定性流水线 + LLM Agent，行级精准评论，内置 NPE/XSS/SQL 注入规则集 |
| [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | +116 today | Qwen 官方终端 AI 编码智能体，持续霸榜的开源 Claude Code 替代品 |
| [ashhart/TensorFold](https://github.com/ashhart/TensorFold) | +53 today | Zig 编写的 LLM 推理引擎，支持 Metal/CUDA/Vulkan，跨平台推理新势力 |
| [ollama/ollama](https://github.com/ollama/ollama) | 186,976 | 本地大模型运行事实标准，支持 Kimi、GLM、DeepSeek、gpt-oss、Qwen 等新模型 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 168,979 | 模型定义框架标杆，文本/视觉/多模态训练推理全覆盖 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、编排）

| 项目 | Stars | 说明 |
|---|---|---|
| [backnotprop/plannotator](https://github.com/backnotprop/plannotator) | +412 today | Agent 工作区：规划、标注、代码审查、一键反馈给 Agent——人机协作新范式，今日爆发 |
| [Tencent/LoopForge](https://github.com/Tencent/LoopForge) | +101 today | 腾讯开源的 Coding Agent 交付编排系统，支持 CodeBuddy/Codex/Claude Code + 人工审批门 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 263,400 | “与你共同成长的 Agent”，当前 Agent 类 star 总量第一 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 147,757 | 把任意代码库/文档/PDF 转为可查询知识图谱的 Agent Skill，去向量化的新思路 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 117,115 | 跨会话持久化 Agent 上下文，兼容 Claude Code、Codex、Gemini 等主流 CLI |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 303,039 | Agent Harness 性能优化系统：技能、本能、记忆与安全研究式开发 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | 121,033 | 浏览器操作 Agent 标准库 + 云端隐身浏览器 |

### 📦 AI 应用（垂直场景产品）

| 项目 | Stars | 说明 |
|---|---|---|
| [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) | +556 today | Claude Code 股票交易技能包：行情分析、技术图表、策略开发，垂直 Skills 生态典型案例 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | 120,053（+227 today） | 病毒式传播：让 Agent “说原始人语”砍掉 65% token，成本优化的 meme 化表达 |
| [dream-num/univer](https://github.com/dream-num/univer) | +495 today | 面向人类与 AI Agent 的开源 Office SDK，电子表格/文档处理基座 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 72,251 | LLM 驱动的多市场股票分析系统，零成本定时运行 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 76,839 | 文档/主题一键生成原生 PowerPoint（原生形状、动画、图表） |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 143,579 | AI 短视频自动生成，内容生产自动化长青项目 |

### 🧠 大模型/训练（模型、训练、评估）

| 项目 | Stars | 说明 |
|---|---|---|
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 108,414 | 用 PyTorch 从零实现 ChatGPT 级 LLM，AI 教育类标杆 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,594 | LLM 评测平台，覆盖 100+ 数据集，模型选型必备 |
| [FonaTech/Project_Chronos](https://github.com/FonaTech/Project_Chronos) | 207 | 零停顿 MoE 推理：前瞻预测 + 异步 DMA 预取，SSD I/O 优化，值得关注的前沿方向 |
| [acon96/home-llm](https://github.com/acon96/home-llm) | 1,497 | 本地 LLM 控制智能家居的 Home Assistant 集成 |

### 🔍 RAG/知识库（向量库、检索、记忆）

| 项目 | Stars | 说明 |
|---|---|---|
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 158,658 | 最流行的本地 AI 界面，支持 Ollama/OpenAI API |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 94,156 | Agent 原生数据库，RAG 引擎进化为上下文基础设施 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | 79,671 | 工具输出/日志/RAG 切片进入 LLM 前的压缩层：JSON 省 60-95% token——与 caveman 同属成本优化赛道 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 42,234 | 字节开源的自进化上下文数据库，统一 Agent 记忆、知识与技能 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | 40,435 | 无向量、基于推理的文档索引 RAG，反主流技术路线 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | 13,796 | MLSys2026 最佳论文：个人设备上省 97% 存储的私密 RAG |

---

## 三、趋势信号分析

1. **Coding Agent 供应链爆发**：今日 Top 5 中 4 个直接服务编码智能体（modern-web-guidance、open-code-review、chrome-devtools-mcp、plannotator）。社区注意力已从“造 Agent”转向“治理 Agent”——审查、指导、规划、审批成为新关键词，预示 Agent 工程化进入深水区。
2. **“去向量库化”暗流**：graphify（AST 知识图谱）、PageIndex（推理式检索）、LEANN（无向量 RAG）同时走高，纯 embedding 检索的技术垄断正被挑战。
3. **Token 经济学成为显学**：caveman（-65%）与 headroom（-20%~95%）南北呼应，推理成本焦虑催生独立的“上下文压缩”工具层。
4. **大厂集体下场**：Google、Alibaba、Tencent、Chrome 团队今日同时上榜，Agent 工具链从极客玩具升级为平台级战场。

---

## 四、社区关注热点

- **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)** — 确定性规则 + LLM 的混合架构是 Agent 落地生产的可行范式，企业级可借鉴
- **[backnotprop/plannotator](https://github.com/backnotprop/plannotator)** — 人类在 Agent 环路中的决策界面，“Human-in-the-loop”工具化首个爆款信号
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** — Skill 形态分发 + 无向量图谱检索，代表 Claude Code Skills 生态的扩张路径
- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)** — 上下文压缩中间件（库/代理/MCP 三形态），成本敏感团队的刚需
- **[volcengine/OpenViking](https://github.com/volcengine/OpenViking)** — 统一记忆/知识/技能的上下文数据库，Agent 基础设施的新物种

*（已过滤：uptime-kuma、sure、airgorah、Veyra-NRVideo 等 4 个非 AI 核心项目）*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*