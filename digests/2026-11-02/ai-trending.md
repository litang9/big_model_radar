# AI 开源趋势日报 2026-11-02

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-01 23:33 UTC

---

# 《AI 开源趋势日报》2026-11-02

## 一、筛选说明

**Trending 榜单中排除的非 AI 项目**：
- `pingdotgg/t3code`（描述缺失，无法确认 AI 相关）
- `public-apis/public-apis`（通用 API 目录）
- `Renhuai123/ziwei-doushu`（命理排盘算法，非 AI）
- `hyprwm/Hyprland`（Wayland 窗口管理器）

**保留的 AI 相关项目**：claude-mem、lightpanda、Kronos、OpenMausBot、Handy、Claude-Code-Game-Studios、kornia、AiSOC、hex、OpenBot、jailbreaks、ai-engineering-hub、FreeToken（共 13 个）。

---

## 二、今日速览

1. **Agent 记忆成为最热赛道**：[claude-mem](https://github.com/thedotmack/claude-mem) 今日 +1527 stars 冲上榜首，跨 Agent 的持久化记忆层正从概念走向标配基础设施。
2. **Agent Harness 生态全面爆发**：Claude-Code-Game-Studios（+970）、OpenBot、OpenMausBot 等项目显示“给 Agent 配电脑、配技能、配组织架构”的工具层成为社区焦点。
3. **本地语音输入双雄同日上榜**：Rust 编写的 [Handy](https://github.com/cjpais/Handy) 与 [hex](https://github.com/anomalyco/hex) 同日爆发（+383 / +1329），离线语音转写需求明确升温。
4. **AI 安全运营首次登榜**：[AiSOC](https://github.com/beenuar/AiSOC)（+436）代表 LLM-agent 驱动的 SOC 方向开始获得社区认可。

---

## 三、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [anomalyco/hex](https://github.com/anomalyco/hex) | Rust，+1329 today | 跨平台本地语音听写工具，Rust 实现，今日爆发性增长 |
| [cjpais/Handy](https://github.com/cjpais/Handy) | Rust，+383 today | 完全离线、可扩展的语音转文本应用，与 hex 形成本地 STT 双雄 |
| [lightpanda-io/browser](https://github.com/lightpanda-io/browser) | Zig，+827 today | 专为 AI 与自动化设计的无头浏览器，Agent 数据采集层的关键基建 |
| [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) | Python，+232 today | 将数据中心级模型服务带到桌面端，本地跑大模型的推理方案 |
| [ollama/ollama](https://github.com/ollama/ollama) | 185.6k | 本地模型运行事实标准，已支持 Kimi、GLM、MiniMax、gpt-oss 等 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 9.0k | Rust 生态模块化 LLM 应用框架 |

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 109.2k，**+1527 today（日榜第一）** | 跨会话持久记忆：捕获 Agent 会话、AI 压缩、按需注入，兼容 Claude Code/Codex/Gemini 等全线 Agent |
| [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) | Shell，+970 today | 把 Claude Code 变成游戏工作室：49 个 Agent + 72 个工作流技能，模拟真实工作室层级的多智能体协调系统 |
| [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) | TypeScript，+178 today | 每个给 AI 同事配一台“电脑”（浏览器+文件+工具），动作事前决策、事后记录，基于 AG-UI 协议 |
| [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | TypeScript，+919 today | 开源 Grok Bot 替代品，附带 Bot 可用的虚拟机 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 259.5k | “与你共同成长的 Agent”，智能体赛道总量最高项目之一 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 294.8k | Agent Harness 性能优化系统：技能、本能、记忆、安全一体化 |

### 📦 AI 应用（垂直场景）

| 项目 | Stars | 说明 |
|---|---|---|
| [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) | Python，+611 today | 金融市场“语言”基础模型，金融时序 Foundation Model 登榜值得关注 |
| [beenuar/AiSOC](https://github.com/beenuar/AiSOC) | Python，+436 today | 开源 AI 安全运营中心：告警融合、LLM-agent 分诊、MITRE ATT&CK 调查、可回放决策账本，自带 MCP server |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 72.1k | 文档/主题 → 原生 PowerPoint（含动画、图表、语音），文档智能方向标杆 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 137.2k | AI 短视频一键生成，内容自动化长青项目 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 119.5k | 多智能体金融交易框架，与 Kronos 同看金融 + AI 主线 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 67.4k | LLM 驱动的多市场股票分析系统，零成本定时运行 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 64.7k | 2 小时从零训练 64M 参数 LLM，AI 教育现象级项目 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 107.7k | PyTorch 从零实现 ChatGPT 级 LLM，原理学习首选 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | 63.0k | YOLO 系列（已迭代至 YOLO27），视觉模型工程化标杆 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | 319 | X-Bit 量化的端侧 LLM 推理，与今日本地化趋势呼应 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5.5k | Apple Silicon 上构建 mini vLLM 的推理系统教学项目 |

### 🔍 RAG/知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 140.5k | 代码库→可查询知识图谱，无向量库的确定性 AST 方案，RAG 范式创新代表 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | 39.9k | "Vectorless"、基于推理的文档索引 RAG，挑战传统向量检索 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | 78.6k | LLM 输入压缩：编码 Agent 省 20% token、JSON 省 60-95%，上下文经济新物种 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 41.3k | 字节开源的 Agent 自进化上下文数据库：记忆 + RAG + 技能统一 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 68.2k | Agent 记忆层基础设施，与 claude-mem 同赛道互补 |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | 40.5k | EMNLP2025，轻量快速的图结构 RAG |

---

## 四、趋势信号分析

今日热榜最突出的信号是 **Agent 基础设施“补齐拼图”阶段**的到来：记忆（claude-mem、mem0）、浏览器（lightpanda、OpenBot）、沙箱虚拟机（OpenMausBot）、技能编排（Game-Studios）、上下文压缩（headroom）分别覆盖 Agent 运行时的不同缺口，说明社区共识正从“造 Agent”转向“给 Agent 造环境”。其次，**本地/离线优先**趋势明确：hex 与 Handy 两款 Rust 本地语音听写同日上榜，叠加 FreeToken 桌面级模型服务与 picollm 端侧量化，隐私 + 零成本本地推理成为新默认。第三，**AI 安全运营（AiSOC、jailbreaks）**首次以独立品类登榜，呼应 Agent 权限扩大带来的安全审计需求，MCP 已成为安全工具的标准分发接口。金融方向 Kronos（Foundation Model）与 TradingAgents 同期活跃，显示垂直领域基础模型（而非仅 Agent 套壳）开始进入开源主流。

---

## 五、社区关注热点

- **[claude-mem](https://github.com/thedotmack/claude-mem)**：日增 1527 stars 居首，跨 Agent 通用记忆层是当前最强刚需，mem0/OpenViking 均为可比对象，值得横向评估选型。
- **[headroom](https://github.com/headroomlabs-ai/headroom)**：token 成本优化的新解法（压缩而非截断），对所有重度 Agent 用户有直接 ROI。
- **[AiSOC](https://github.com/beenuar/AiSOC)**：LLM-agent 安全分诊 + 可回放决策账本，是“Agent 安全”从理论走向工程落地的早期样本。
- **本地语音听写（[hex](https://github.com/anomalyco/hex) / [Handy](https://github.com/cjpais/Handy)）**：Rust 生态离线 STT 双雄，语音入口本地化窗口已打开。
- **Vectorless RAG（[PageIndex](https://github.com/VectifyAI/PageIndex)、[graphify](https://github.com/Graphify-Labs/graphify)）**：绕开向量库的推理式检索正在挑战默认技术栈，RAG 架构选型前必看。

---
*数据来源：GitHub Trending（2026-11-02）+ GitHub Search API 主题搜索；今日新增 stars 仅 Trending 榜单可信。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*