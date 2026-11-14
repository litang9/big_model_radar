# AI 开源趋势日报 2026-11-14

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-14 00:52 UTC

---

# 📰 AI 开源趋势日报 · 2026-11-14

---

## 一、今日速览

今日热榜由**“为 Coding Agent 服务的基础设施”**强势主导：GoogleChrome 发布 modern-web-guidance-src（+1925 today），为编码智能体提供最新 Web 最佳实践上下文；OpenAI 官方下场推出 codex-security（+751 today），将安全漏洞发现与修复直接嵌入 Agent 工作流。同时，**LLM 驱动的量化交易**方向持续升温（daily_stock_analysis、Vibe-Trading、claude-trading-skills 三榜齐现），金融场景正成为 Agent 落地最活跃的垂直领域之一。搜索侧则显示 **Agent 记忆/上下文管理**（claude-mem、OpenViking、cognee）与**Token 压缩降本**（headroom、caveman）成为生态新热点。

---

## 二、Trending 榜单 AI 相关性筛选

| 项目 | 是否保留 | 理由 |
|---|---|---|
| alibaba/open-code-review | ✅ | LLM Agent 代码审查 |
| GoogleChrome/modern-web-guidance-src | ✅ | 服务于 Coding Agent |
| openai/codex-security | ✅ | AI 安全扫描 CLI |
| ZhuLinsen/daily_stock_analysis | ✅ | LLM 股票分析 |
| backnotprop/plannotator | ✅ | Agent 工作区/反馈工具 |
| tradermonty/claude-trading-skills | ✅ | Claude Code 交易技能 |
| Likely7/Veyra-NRVideo | ✅（弱相关） | AI 超分/DLSS 图像增强 |
| ChromeDevTools/chrome-devtools-mcp | ✅ | 面向 Agent 的 DevTools MCP |
| we-promise/sure（个人财务） | ❌ | 非 AI |
| louislam/uptime-kuma | ❌ | 通用监控工具 |
| block/buzz | ❌ | 通信平台，无 AI |
| tailscale/tailcat | ❌ | 网络工具 |

---

## 三、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、CLI）

- **[GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src)** ⭐0（**+1925 today**）— 今日榜首，官方为 Coding Agent 提供最新 Web 最佳实践知识包，解决模型训练数据滞后问题。
- **[openai/codex-security](https://github.com/openai/codex-security)** ⭐0（**+751 today**）— OpenAI 官方安全扫描 CLI + SDK，可自动发现、验证、修复安全漏洞，厂商下场做 Agent 安全工具的标志性动作。
- **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)** ⭐0（**+215 today**）— 阿里规模验证的混合架构代码审查：确定性规则管线 + LLM Agent，行级精准评论。
- **[ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)** ⭐0（+67 today）— Chrome 官方将 DevTools 能力以 MCP 协议开放给编码智能体。
- **[ollama/ollama](https://github.com/ollama/ollama)** ⭐186,897 — 本地模型推理事实标准，已支持 Kimi、GLM、DeepSeek、Qwen 等国产模型。
- **[0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig)** ⭐9,142 — Rust 生态模块化 LLM 应用框架。
- **[FonaTech/Project_Chronos](https://github.com/FonaTech/Project_Chronos)** ⭐207 — 零停顿 MoE 推理：前瞻预测 + 异步 DMA 预取，值得关注的推理优化新方向。

### 🤖 AI 智能体/工作流

- **[backnotprop/plannotator](https://github.com/backnotprop/plannotator)** ⭐0（+108 today）— Agent 工作区：规划、批注、审查代码并向 Agent 一键反馈，“人机协作调度台”新形态。
- **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** ⭐263,223 — “与你共同成长的 Agent”，当前 Agent 赛道 stars 标杆。
- **[Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach)** ⭐111,573 — 给 Agent 装上“眼睛”：一条 CLI 读遍 Twitter/Reddit/YouTube/B站/小红书，零 API 费用。
- **[zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)]** ⭐47,919 — 个人 AI 助手 Agent Harness，带记忆与技能自进化（chatgpt-on-wechat 作者新作）。
- **[codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale)** ⭐41,173 — Rust 编写的终端编码 Agent，支持单任务多 Agent 并行拆分。
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** ⭐302,467 — Claude Code/Codex/Cursor 的 Agent Harness 性能优化系统（技能/直觉/记忆）。
- **[paperclipai/paperclip](https://github.com/paperclipai/paperclip)** ⭐113,704 — 工作场所 Agent 管理应用。

### 📦 AI 应用（垂直场景）

- **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)** ⭐71,596（**+256 today**）— LLM 多市场股票分析，今日热榜与主题搜索双榜齐现，零成本定时运行是亮点。
- **[tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills)** ⭐0（+69 today）— 面向投资者的 Claude Code Skills：技术图表、经济日历、选股器。
- **[Likely7/Veyra-NRVideo](https://github.com/Likely7/Veyra-NRVideo)** ⭐0（+256 today）— AI 超分 + DLSS5 画质增强播放器（GTA6 相关带动热度）。
- **[hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)** ⭐76,588 — 文档/主题生成原生 PPT（含动画、图表、语音旁白）。
- **[career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops)** ⭐82,408 — AI 求职 Agent：JD 评分、简历定制、面试准备全流程。
- **[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)** ⭐143,302 — 一键生成高清短视频的成熟 AI 工作流。
- **[HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading)** ⭐38,168 — 港大 DS 实验室出品的个人交易 Agent。

### 🧠 大模型/训练

- **[tensorflow/tensorflow](https://github.com/tensorflow/tensorflow)** ⭐201,592 — 经典训练框架基石。
- **[rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)** ⭐108,365 — 从零用 PyTorch 实现 ChatGPT 级 LLM 的最佳教程。
- **[rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch)** ⭐78,687 — AI 工程化系统学习资源。
- **[ultralytics/ultralytics](https://github.com/ultralytics/ultralytics)** ⭐63,355 — YOLO 系列目标检测（已迭代至 YOLO27）。
- **[open-compass/opencompass](https://github.com/open-compass/opencompass)** ⭐7,595 — 覆盖 100+ 数据集的 LLM 评测平台。
- **[skyzh/tiny-llm](https://github.com/skyzh/tiny-llm)** ⭐5,734 — 在 Apple Silicon 上手写 tiny vLLM，推理系统学习佳作。

### 🔍 RAG/知识库/向量数据库

- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** ⭐147,293 — 将代码库转为可查询知识图谱的 Claude Code/Cursor Skill，**“无向量库”的确定性 RAG** 新范式。
- **[Graphify 同路线] [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex)** ⭐40,408 — 无向量化、推理式 RAG 索引。
- **[volcengine/OpenViking](https://github.com/volcengine/OpenViking)** ⭐42,204 — 字节跳动出品的自进化 Agent 上下文数据库，统一记忆、RAG 与技能。
- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** ⭐116,850 — 跨会话持久记忆，支持 Claude Code/Codex/Gemini 等全阵营。
- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)** ⭐94,130 — Agent 原生 RAG 引擎，正演进为上下文基础设施。
- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)** ⭐79,605 — LLM 输入压缩代理，编码 Agent 省 20%、JSON 省 60-95% token。
- **[StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN)** ⭐13,797 — MLSys 2026 最佳论文，个人设备上省 97% 存储的隐私 RAG。
- **[zilliztech/claude-context](https://github.com/zilliztech/claude-context)** ⭐12,691 — 让整个代码库成为编码 Agent 上下文的搜索 MCP。

---

## 四、趋势信号分析

**1）Coding Agent 周边基建正在爆发。** 今日热榜前五中有三个（modern-web-guidance-src、codex-security、chrome-devtools-mcp）本质都是“给 Agent 喂上下文/给 Agent 装工具”，且全部来自 Google、OpenAI、Chrome 官方团队。大厂策略已从“做模型”转向“定义 Agent 的运行环境”，MCP 生态正快速吸纳官方级基础设施。

**2）LLM 量化交易成为现象级垂直赛道。** daily_stock_analysis、Vibe-Trading、claude-trading-skills 同日上榜，“Claude Code Skills + 金融数据”组合说明 Agent 正在向高价值决策场景纵深渗透。

**3）RAG 范式出现“去向量库”分歧。** Graphify（知识图谱 + AST 确定性解析）、PageIndex（推理式索引）与 LEANN 代表的对向量数据库的反思，正在挑战传统 embedding 检索路线；而字节 OpenViking 和 claude-mem 则押注“Agent 记忆”作为下一代上下文基础设施。

**4）Token 成本焦虑显性化。** headroom（压缩输入）与 caveman（穴居人语气省 65% token）双双高星，降本工具从工程优化走向社区 meme 化传播，反映 Agent 大规模日常化使用后的真实痛点。

---

## 五、社区关注热点

- **[modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src)** — +1925 今日榜首。官方为 Agent 提供可信赖的领域知识更新通道，“文档即 Agent 上下文”模式可能被各大平台复制。
- **[codex-security](https://github.com/openai/codex-security)** — 模型厂商亲自做安全工具链，AI 辅助安全审计（AI SAST）值得关注其与传统 SAST 的混合架构走向。
- **[OpenViking](https://github.com/volcengine/OpenViking)** — “上下文数据库”概念把记忆/RAG/技能统一为一个存储层，字节入场，赛道有望快速升温。
- **[graphify](https://github.com/Graphify-Labs/graphify)** — 以 Skill 形式分发、零向量库依赖，为 RAG 提供了工程上更可控的替代方案。
- **[headroom](https://github.com/headroomlabs-ai/headroom)** — 库/代理/MCP 三形态的 token 压缩层，任何重度 Agent 使用者的直接降本手段。

---
*数据来源：GitHub Trending（2026-11-14）+ GitHub Search API 主题搜索；Trending 榜单 stars 总量缺失为数据源展示限制。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*