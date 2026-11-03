# AI 开源趋势日报 2026-11-03

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-03 02:15 UTC

---

# 📰 AI 开源趋势日报 · 2026-11-03

## 1️⃣ 今日速览

今日热榜被 **Agent 生态工具** 强势占领：Vercel 的 agent-desktop（+2275）、pingdotgg 的 t3code（+3229）领跑，Claude Code 增强类项目（claude-mem、Claude-Code-Game-Studios、mattpocock/skills）形成明显集群效应。**本地推理轻量化**方向出现两个有趣的新面孔：纯 C 实现的 colibri 和桌面级 serving 引擎 FreeToken。模型层方面，Karpathy 的 nanochat 持续发酵，金融时序基础模型 Kronos 首次上榜。总体信号：社区重心正从“造 Agent”转向“给 Agent 做工具”（记忆、上下文、工作流、worktree 并行）。

---

## 2️⃣ 各维度热门项目

### 🔧 AI 基础工具（框架 / SDK / 推理引擎 / CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) | +2275 today | Computer use CLI，让 AI Agent 直接操作桌面，今日爆发式登榜 |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | +675 today | 纯 C、零依赖的 MoE 推理引擎，专家权重从磁盘流式加载，消费级硬件跑前沿模型 |
| [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) | +653 today | 数据中心级 serving 能力下放到桌面，本地高效跑超大模型 |
| [ollama/ollama](https://github.com/ollama/ollama) | 185,725 | 本地 LLM 运行事实标准，支持 Kimi/GLM/DeepSeek/gpt-oss 等主流开源模型 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 168,460 | 模型定义与训练/推理核心框架，生态基石 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 157,590 | 最流行的自托管 AI 界面，本地 AI 的前端门户 |

### 🤖 AI 智能体 / 工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 110,801（+1803 today） | 跨会话持久上下文，AI 压缩 + 注入，兼容 Claude Code/Codex/Gemini 等所有主流 Agent CLI |
| [pingdotgg/t3code](https://github.com/pingdotgg/t3code) | +3229 today | 今日榜首增量，T3 团队出品的编码 Agent 工具，关注度爆炸 |
| [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) | +1379 today | 49 个 AI Agent + 72 个工作流 skill，模拟真实游戏工作室层级，多 Agent 协作范式样本 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | +858 today | TypeScript 知名教育者的 Agent Skills 合集，"Skills 生态"正在成型 |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | +77 today | 面向并行 AI Agent 工作流的 Git worktree 管理 CLI——Agent 时代的开发者工具 |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | +412 today | 工作场所 Agent 管理应用，定位“人人都在用的 Agent 管理器" |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 295,707 | Agent harness 性能优化系统：skills + instincts + 记忆 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 259,894 | "与你一起成长"的个人 Agent，NousResearch 旗舰 |

### 📦 AI 应用（垂直场景）

| 项目 | Stars | 说明 |
|---|---|---|
| [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) | +857 today | 金融市场基础模型，金融时序 Foundation Model 首次登上热榜 |
| [p-e-w/heretic](https://github.com/p-e-w/heretic) | +420 today | 免训练修改语言模型行为（去审查、抑制 sycophancy），技术路线新颖且话题性强 |
| [karpathy/nanochat](https://github.com/karpathy/nanochat) | +321 today | "$100 能买到的最好 ChatGPT"，Karpathy 个人 AI 全栈教学的延续热度 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 137,552 | AI 一键生成短视频，国内 AI 自动化应用常青树 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 67,459 | LLM 驱动多市场股票分析，与 Kronos 呼应——AI 金融持续升温 |

### 🧠 大模型 / 训练

| 项目 | Stars | 说明 |
|---|---|---|
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 107,714 | 从零实现 ChatGPT 级 LLM，教学类标杆 |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | 76,408 | AI 工程从零学起，"from-scratch"学习系列持续走热 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,525 | 在 Apple Silicon 上手写 tiny vLLM，推理系统工程师向 |
| [datamllab/OpenEBFM](https://github.com/datamllab/OpenEBFM) | 237 | 能量基模型（EBM）规模化训练开源代码，学术前沿方向 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,561 | LLM 评测平台，覆盖 100+ 数据集 |

### 🔍 RAG / 知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 93,376 | Agent 原生数据库，RAG 引擎向“上下文基础设施”演进 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | 78,672 | 进 LLM 前先压缩：token 削减 20–95%，成本优化刚需 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 68,296 | Agent 记忆层事实标准，与 claude-mem 共同印证“记忆”是当下最热赛道 |
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | 86,797 | 面向 LLM 的爬虫，产出 LLM-ready Markdown |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | 13,757 | MLSys 2026 Best Paper，存储省 97% 的本地 RAG |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 41,398 | 字节开源的自进化上下文数据库，统一记忆/RAG/Skills |

**已过滤的非 AI 项目**：Hyprland（Wayland 合成器）、tesseract（经典 OCR，非 AI 热点语境）、Scrapling/kornia（通用爬虫/CV 库，AI 相关性弱，略）。

---

## 3️⃣ 趋势信号分析

**爆发性关注集中在“Agent 基础设施”**：今日热榜 15 席中约 9 席与 Agent 生态直接相关，且呈现明显的**工具链下沉**趋势——claude-mem（记忆）、worktrunk（并行 worktree）、mattpocock/skills（技能包）、paperclip（管理面板）都在解决“Agent 用起来之后”的工程问题，而非 Agent 框架本身。Agent 框架之争（LangChain/Dify/AutoGPT）热度趋于稳定，竞争转向周边工具。

**新兴技术栈**：① **纯 C / 极简推理引擎**（colibri）与桌面级 serving（FreeToken）同日上榜，暗示 MoE 模型流式加载 + 消费级硬件成为本地推理新解法；② **免训练模型行为修改**（heretic）代表了一条对抗式后处理的新路线；③ **Skills 生态**正在从 Claude Code 私有概念演化为跨 CLI 的开放标准。

**行业关联**：Claude Code 周边项目密集爆发，与 Anthropic 生态扩张直接相关；Agent-Reach、caveman 等高星项目均为编码 Agent 配套，预示“Coding Agent OS”是 2026 年末最确定的增量市场。

---

## 4️⃣ 社区关注热点

- **[claude-mem](https://github.com/thedotmack/claude-mem)** — “Agent 记忆”是当前最确定的需求缺口，跨 CLI 兼容设计使其成为生态级入口，今日 +1803
- **[vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop)** — Computer use 从浏览器走向完整桌面控制，Vercel 加持，可能定义新交互范式
- **[colibri](https://github.com/JustVugg/colibri)** — 纯 C 实现 MoE 流式推理，技术极简主义样本，值得追踪其性能上限
- **[Kronos](https://github.com/shiyu-coder/Kronos)** — 金融时序 Foundation Model 登榜，垂直领域基础模型化的信号
- **方向：Skills 标准化** — ECC、mattpocock/skills、Claude-Code-Game-Studios 均以 skills 为核心抽象，跨 Agent 复用层正在形成，建议提前布局兼容设计

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*