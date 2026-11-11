# AI 开源趋势日报 2026-11-11

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-11 00:38 UTC

---

# 📰 AI 开源趋势日报（2026-11-11）

## 一、今日速览

今日 GitHub Trending 被 **Agent Skills（智能体技能）** 生态强势占据：Anthropic 官方 skills 仓库、Addy Osmani、Matt Pocock 等个人开发者的 skills 集合集中上榜，标志着“技能包”正在成为 Agent 生态的标准化分发单元。同时，**上下文工程（Context Engineering）** 方向出现爆发信号——上下文压缩插件 billion-context 与跨会话记忆 claude-mem、headroom 等项目共同指向“token 成本与长会话”这一核心痛点。浏览器自动化（agent-browser）、智能家居 MCP（ha-mcp）等 Agent 落地工具也表现活跃。整体来看，社区重心已从“造 Agent 框架”转向“给 Agent 配技能、省 token、接现实世界”。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架 / SDK / 推理引擎 / 开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [ollama/ollama](https://github.com/ollama/ollama) [Go] | ⭐186,578 | 本地大模型运行事实标准，已支持 Kimi、GLM、DeepSeek、gpt-oss 等主流开源模型 |
| [huggingface/transformers](https://github.com/huggingface/transformers) [Python] | ⭐168,754 | 模型定义与训练/推理框架，开源 AI 生态基石 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) [Rust] | ⭐9,110 | Rust 生态模块化 LLM 应用框架，性能敏感场景的新选择 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) [Svelte] | ⭐158,325 | 最流行的自托管 AI 前端界面，兼容 Ollama/OpenAI API |
| [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale) [Rust] | ⭐41,173 | Rust 编写的终端 Agent，任意模型/Provider 皆可用 |
| [samchon/nestia](https://github.com/samchon/nestia) [TypeScript] | ⭐2,181 | NestJS 辅助库 + AI Chatbot 开发，企业级 TS 技术栈 AI 化 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) [Python] | ⭐319 | 端侧 LLM 推理，主打 X-Bit 量化，隐私场景值得关注 |

### 🤖 AI 智能体 / 工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars | 说明 |
|---|---|---|
| [anthropics/skills](https://github.com/anthropics/skills) [Python] | +1,679 today | Anthropic 官方 Agent Skills 仓库，今日热榜第二，定义技能包标准 |
| [mattpocock/skills](https://github.com/mattpocock/skills) [Shell] | +1,225 today | TypeScript 名人 Matt Pocock 的个人 Agent 技能集，“直出 .agents 目录”引发社区模仿 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) [JavaScript] | +465 today | Google Chrome 团队 Addy Osmani 出品的生产级工程技能包，工程化质量高 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) [Python] | ⭐262,450 | “与你共同成长的 Agent”，总量高居 Agent 类榜首 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) [JavaScript] | ⭐300,813 | Agent Harness 性能优化系统（技能/本能/记忆/安全），覆盖 Claude Code、Codex、Cursor |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) [TypeScript] | ⭐38,614 | Agent 前端栈 + AG-UI 协议，Generative UI 代表 |
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) [Rust] | +780 today | Vercel 出品的 Agent 浏览器自动化 CLI，Rust 实现，今日新上榜 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) [Python] | ⭐120,605 | AI 浏览器 Agent 库，与 agent-browser 共同印证 Web 操作赛道热度 |

### 📦 AI 应用（垂直场景产品）

| 项目 | Stars | 说明 |
|---|---|---|
| [homeassistant-ai/ha-mcp](https://github.com/homeassistant-ai/ha-mcp) [Python] | +790 today | 用 Claude/ChatGPT 通过 MCP 配置和自动化 Home Assistant，AI 智能家居落地标杆 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) [Python] | ⭐69,555 | LLM 驱动多市场股票分析，零成本定时运行，中文社区爆款 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) [Python] | ⭐75,638 | 文档/主题 → 原生 PowerPoint（含图表/动画/旁白），办公场景刚需 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) [JavaScript] | ⭐81,748 | AI 求职 Agent：扫描职位、CV 打分、定制简历，本地运行 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) [Python] | ⭐141,983 | AI 短视频自动生成，长盛不衰的中文流量项目 |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) [TypeScript] | ⭐112,949 | 工作场景 Agent 管理应用，面向普通用户 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) [TypeScript] | ⭐47,167 | 人机协作知识工作空间，隐私优先可自托管 |

### 🧠 大模型 / 训练

| 项目 | Stars | 说明 |
|---|---|---|
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) [Jupyter Notebook] | ⭐108,199 | PyTorch 从零实现 ChatGPT 级 LLM，学习类顶流 |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) [Python] | ⭐78,307 | AI 工程化系统学习路径，就业导向 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) [Python] | ⭐5,712 | 在 Apple Silicon 上手写 mini vLLM，系统工程师视角的推理内核教学 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) [Python] | ⭐7,583 | LLM 评测平台，覆盖 100+ 数据集，模型选型必备 |
| [acon96/home-llm](https://github.com/acon96/home-llm) [Python] | ⭐1,494 | 本地 LLM 控制智能家居，与 ha-mcp 形成端云两路线 |
| [AkaliKong/MiniOneRec](https://github.com/AkaliKong/MiniOneRec) [Python] | ⭐1,964 | 快手 OneRec 推荐大模型最小复现，推荐系统 LLM 化研究热点 |

### 🔍 RAG / 知识库 / 向量检索

| 项目 | Stars | 说明 |
|---|---|---|
| [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) [TypeScript] | +375 today | 上下文压缩插件：月级长会话、百亿 token、省 5 倍 token，今日新上榜 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) [TypeScript] | ⭐115,819 | Agent 跨会话持久记忆，兼容 Claude Code/Codex/Gemini 等全系列 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) [Python] | ⭐79,318 | 工具输出/日志/RAG 切片压缩，JSON 省 60-95% token |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) [Go] | ⭐118,891 | 病毒式传播的“原始人说话”token 压缩技能，省 65% token |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) [Go] | ⭐93,973 | Agent 原生 RAG 引擎，正演进为上下文基础设施 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) [Python] | ⭐68,772 | Agent 记忆层基础设施，生产级落地 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) [Python] | ⭐41,960 | 字节跳动自进化上下文数据库，统一记忆/知识/技能 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) [Python] | ⭐40,351 | 无向量、推理式 RAG 文档索引，“去向量数据库化”新范式 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) [Python] | ⭐13,789 | MLSys 2026 最佳论文，个人设备上省 97% 存储的私有 RAG |

> **已过滤的非 AI 项目**：meta/astryx（设计系统）、sherlock（社工库搜索）、tokio-rs/topcoat（Web 框架）、we-promise/sure（个人财务）、google-deepmind/mujoco（物理仿真器，具身研究工具但今日热榜语境与 AI 直接关联弱）、Developer-Y/cs-video-courses、netdata、tesseract、tensorflow/pytorch 等通用 ML 基建保留于基础/训练类。

---

## 三、趋势信号分析

**1）Agent Skills 成为今日最强叙事。** 热榜 12 席中有 3 席是 skills 仓库（anthropics/skills +1679、mattpocock/skills +1225、addyosmani/agent-skills +465），且官方与个人开发者同日爆发。这表明 Anthropic 推动的“技能包”标准正在被社区快速接受，skills 正在成为 Agent 生态的 "npm package"——可复用、可分发、可组合的 Agent 能力单元。头部开发者（Osmani、Pocock）的入场加速了标准化进程。

**2）上下文工程（Context Engineering）进入爆发期。** billion-context（+375）今日首上榜，与 caveman（118K stars）、claude-mem（115K）、headroom（79K）构成完整的“token 经济学”赛道：压缩、记忆、持久化上下文。当 Agent 会话拉长到月级、上下文膨胀到十亿 token 级，省 token 就是省钱省延迟，这是所有 coding agent 用户的真金白银需求。

**3）Agent 连接现实世界的工具层升温。** vercel-labs/agent-browser（Rust CLI，+780）与 browser-use 双雄并立；ha-mcp（+790）代表 MCP 在智能家居场景的落地，与 OpenViking、PageIndex 等“后向量数据库”方案共同指向 Agent 基础设施的重构期。

---

## 四、社区关注热点

- **[anthropics/skills](https://github.com/anthropics/skills)** — 官方 Agent Skills 标准仓库，做 Agent 开发必看，技能包生态的“宪法”级项目
- **[billion-context](https://github.com/ranxianglei/billion-context)** — 月级长会话 + 100K 小窗口跑十亿 token 上下文，上下文压缩方向的新晋代表，中文开发者出品
- **[vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)** — Rust 实现的 Agent 浏览器 CLI，Vercel 背书，Web Agent 工具层竞争加剧的信号
- **[ha-mcp](https://github.com/homeassistant-ai/ha-mcp)** — MCP + 智能家居的最佳落地样本，验证了“AI 助手操控物理世界”的产品形态
- **[PageIndex](https://github.com/VectifyAI/PageIndex) / [OpenViking](https://github.com/volcengine/OpenViking)** — “无向量推理式 RAG”与“自进化上下文数据库”，代表 RAG 基础设施的下一次范式转移，值得提前布局

---
*数据来源：GitHub Trending（今日）+ GitHub Search API（7 天活跃），stars 总量为历史累计。分析仅供参考。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*