# AI 开源趋势日报 2026-11-16

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-15 23:57 UTC

---

# 📰 AI 开源趋势日报 · 2026-11-16

## 一、今日速览

今日 GitHub Trending 几乎被“Coding Agent 生态”全面占领：12 个上榜项目中，围绕编码智能体的 **Skills（技能包）、MCP 工具、人机协作工作流**成为绝对主线。Google、NVIDIA、Tencent、Alibaba 等大厂同日上榜，标志着 Agent Skills 开放标准与 Agent 交付流水线正从社区实验走向企业级落地。此外，**Agent 技能评测（SkillEvaluator）、代码审查 Agent、Agent 工作区**等细分方向首次集中亮相，值得高度关注。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架 / SDK / 推理引擎 / 开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | +718 today | Chrome 官方为编码智能体提供的 DevTools MCP 服务，让 Agent 能调试真实浏览器环境，官方背书的 Agent 工具链核心组件。 |
| [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui) | +393 today | Agent-User 交互协议，把 Agent 能力标准化接入前端应用，正在成为 Generative UI 的底层协议。 |
| [GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) | +1220 today（今日榜首） | 为编码 Agent 持续注入最新 Web 最佳实践，解决“模型知识过时”痛点。 |
| [ggml-org/ggml](https://github.com/ggml-org/ggml) [C++] | +53 today | 老牌端侧推理张量库， llama.cpp 的底层引擎，边缘推理基础设施常青树。 |
| [ollama/ollama](https://github.com/ollama/ollama) | 187,097 | 本地大模型运行事实标准，已支持 Kimi、GLM、MiniMax、gpt-oss 等新一代模型。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) [Rust] | 9,154 | Rust 生态模块化 LLM 应用框架，Rust Agent 栈的代表。 |

### 🤖 AI 智能体 / 工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [backnotprop/plannotator](https://github.com/backnotprop/plannotator) | +860 today | Agent 人机协作工作区：规划、批注、审查、一键反馈，代表"Human-in-the-loop"新范式。 |
| [Tencent/LoopForge](https://github.com/Tencent/LoopForge) [Go] | +484 today | 腾讯开源的编码 Agent 交付编排系统，支持 CodeBuddy/Codex/Claude Code + 人工审批门禁，Agent 工程化落地标杆。 |
| [NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator) | +205 today | 首个系统化的 Agent 技能评测框架（质量门禁、语义重叠检测、合成评测集），补齐 Skills 生态的质量基建。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 263,637 | "与你共同成长的 Agent"，总量最高的个人 Agent 项目。 |
| [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) | 80,446 | 从零实现 nano Claude Code 式 Agent Harness，学习 Agent 架构的绝佳教材。 |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | 38,716 | Agent 前端栈 + AG-UI 协议发起方，与今日热榜 ag-ui 形成呼应。 |

### 📦 AI 应用（垂直场景）

| 项目 | Stars | 说明 |
|---|---|---|
| [dream-num/univer](https://github.com/dream-num/univer) | +1041 today | 面向“人 + AI Agent”的 Office SDK，电子表格/文档成为 Agent 操作界面的典型场景。 |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) [Go] | +688 today | 阿里规模验证的混合架构代码审查：确定性规则管线 + LLM Agent，行级精准评论。 |
| [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) | +707 today | 面向投资者的 Claude Code 交易技能包，垂直 Skills 商业化探索样本。 |
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | +221 today | 82 个技能 + 681 个公开漏洞报告模式的红队/挖洞技能包，安全领域 Agent 化。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 77,168 | 文档/主题 → 原生 PPT 生成，办公自动化爆款。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 72,497 | LLM 驱动的多市场股票分析系统，零成本定时运行。 |

### 🧠 大模型 / 训练

| 项目 | Stars | 说明 |
|---|---|---|
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 108,463 | PyTorch 从零实现 LLM 的经典教程，持续位居学习类榜首。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,743 | 在 Apple Silicon 上构建 mini vLLM + Qwen，理解推理系统的最佳入门。 |
| [FonaTech/Project_Chronos](https://github.com/FonaTech/Project_Chronos) | 207 | 零停顿 MoE 推理（前瞻预测 + 异步 DMA 预取），前沿推理系统研究。 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | 320 | 端侧 LLM 推理 + X-Bit 量化，边缘部署方向。 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) / [huggingface/transformers](https://github.com/huggingface/transformers) | 201,645 / 169,020 | 训练框架双巨头，基础设施地位稳固。 |

### 🔍 RAG / 知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 148,411 | 把代码库变成可查询知识图谱，**无向量库、AST 确定性解析**，RAG 范式转向的代表。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 158,756 | 最流行的本地 AI 界面，支持 Ollama/OpenAI。 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | 40,446 | "Vectorless"、推理式 RAG 的文档索引方案，与 graphify 共同印证去向量化的新趋势。 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 42,275 | 字节开源的自进化 Agent 上下文数据库，统一记忆、知识 RAG 与技能。 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | 13,799 | MLSys 2026 最佳论文，97% 存储节省的端侧 RAG。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 117,367 | 跨会话 Agent 持久记忆，多 Agent 通用。 |

---

## 三、趋势信号分析

**1. Agent Skills 成为今日最强主线。** 榜单上 stitch-skills、Claude-BugHunter、claude-trading-skills、graphify 均以"Skill 包"形式分发能力，且明确声明兼容 Agent Skills 开放标准——技能包正在成为 Agent 生态的"插件经济”雏形。

**2. Agent 工程化（AgentOps）首次集中登榜。** LoopForge（交付编排）、plannotator（人机协作工作区）、SkillEvaluator（技能评测）、open-code-review（混合代码审查）共同构成“规划—执行—评审—评测”的完整交付链路，说明社区焦点正从“Agent 能不能干活”转向“如何可靠地交付”。

**3. 大厂集体入场。** Google（Stitch Skills、web guidance）、NVIDIA、Tencent、Alibaba、Chrome DevTools 团队同日上榜，企业级 Agent 基建的卡位战已开启。

**4. RAG 范式悄然转向。** graphify（知识图谱 + 无向量库）与 PageIndex（推理式检索）的高热度，叠加 OpenViking、claude-mem 等记忆方案，暗示“向量检索为中心”的 RAG 正让位于“结构化知识 + 持久记忆 + 推理”的混合架构。

---

## 四、社区关注热点

- **[NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator)** — Skills 爆发后必然出现的质量基建，做 Agent 评测/治理的开发者应第一时间跟进。
- **[Tencent/LoopForge](https://github.com/Tencent/LoopForge)** — 编码 Agent 进入企业 CI/CD 流水线的参考架构，人工审批门禁设计值得关注。
- **[ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)** — 官方出品的 Agent 浏览器调试能力，做 Web Agent / 自动化测试的核心依赖。
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** — 无向量库 RAG 的新范式样本，适合评估替代传统 embedding 检索方案。
- **[GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src)** — 今日 stars 增长第一，"给 Agent 喂最新规范”这一思路可迁移到任何技术领域。

---
*数据来源：GitHub Trending（2026-11-16）+ GitHub Search API 主题检索。今日新增 stars 为实时数据，总量为 7 日内快照。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*