# AI 开源趋势日报 2026-11-13

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-13 01:03 UTC

---

# AI 开源趋势日报 · 2026-11-13

## 1. 今日速览

今日 GitHub Trending 被「AI 编码智能体生态」全面占领：OpenAI 发布的 codex-security、addyosmani 的 agent-skills、Qwen 官方 qwen-code 同日登榜，Coding Agent 的技能化、安全化、免费化成为主线。Meta 开源的 astryx（+1830 今日）打出「Agent Ready 设计系统」概念，标志前端设计系统开始主动适配 AI 生成代码的工作流。推理侧，Zig 编写的 TensorFold 首次登榜，Metal/Vulkan/CUDA 跨平台本地推理引擎竞争加剧。上下文压缩与 token 成本优化（claude-mem、headroom、caveman）已形成独立品类。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [openai/codex-security](https://github.com/openai/codex-security) | +643 today | OpenAI 官方安全扫描 CLI/SDK，用 AI 查找、验证并修复安全漏洞，代表「AI for Security」新赛道 |
| [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | +151 today | 通义千问官方终端 AI 编码智能体，开源 CLI 赛道中国力量 |
| [ashhart/TensorFold](https://github.com/ashhart/TensorFold) | +54 today | Zig 编写的 LLM 推理引擎，支持 Metal/CUDA/Vulkan，本地推理性能新玩家 |
| [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) | +176 today | C/C++ LLM 推理常青树，持续保持社区热度 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | +816 today | 面向 AI 编码智能体的生产级工程技能库，「Skills 生态」加速成型 |
| [GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) | +739 today | 让编码智能体掌握最新 Web 最佳实践，官方为 Agent 提供领域知识源 |
| [meta/astryx](https://github.com/meta/astryx) | +1830 today | Meta 开源的可定制「Agent Ready」设计系统，今日最热 |
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐186,817 | 本地模型运行事实标准，已支持 Kimi/GLM/DeepSeek/gpt-oss/Qwen |

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) | +298 today | 拥有独立浏览器、文件和工具的 AI 同事，每步动作可预审、可回放，基于 AG-UI 协议 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐302,025 | Agent Harness 性能优化系统：技能、直觉、记忆、安全一体化 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐262,973 | 「与你共同成长的智能体」，长期记忆方向头部项目 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | ⭐119,436 | 病毒式传播的省 token 神器，用「原始人语风」削减 65% token |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐146,765 | 把代码库转为可查询知识图谱的 Agent Skill，无向量库、每条边可解释 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | ⭐47,900 | 开源个人 AI 助手 + Agent Harness，自进化记忆与技能 |

### 📦 AI 应用（垂直场景）

| 项目 | Stars | 说明 |
|---|---|---|
| [Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) | +415 today | 多 Harness（Claude Code/Codex 等 11 种）+ 多模型免费使用方案，含浏览器原生会话与语音 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐76,294 | AI 生成原生 PPT（含动画、图表、语音旁白），办公场景刚需 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | ⭐71,084 | LLM 多市场股票分析系统，零成本定时运行，量化散户化代表 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | ⭐158,507 | 最流行的本地 AI 前端界面 |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | ⭐113,404 | 工作场所智能体管理应用 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐108,314 | PyTorch 从零实现 ChatGPT 式 LLM，教育向标杆 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | ⭐105,459 | 训练框架基石 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | ⭐168,927 | 模型定义事实标准，推理+训练通吃 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | ⭐5,728 | Apple Silicon 上手写迷你 vLLM，推理系统学习佳作 |

### 🔍 RAG/知识库/向量数据库

| 项目 | Stars | 说明 |
|---|---|---|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐116,576 | 跨会话持久上下文，AI 压缩并注入历史记忆，兼容所有主流 Agent |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | ⭐94,094 | Agent 原生 RAG 数据库，向上下文基础设施演进 |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | ⭐42,116 | 字节开源自进化上下文数据库，统一记忆/RAG/技能 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐40,400 | 无向量、推理式 RAG 文档索引，反向量数据库路线 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | ⭐13,795 | MLSys 2026 最佳论文，省 97% 存储的个人设备 RAG |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | ⭐79,491 | LLM 输入压缩层：JSON 省 60-95% token |

---

## 3. 趋势信号分析

**爆发性关注集中在 Coding Agent 的「上层生态」**：今日热榜前列（astryx +1830、sure 之外几乎全是 Agent 相关）显示社区焦点已从「造 Agent 框架」转向三件事——**技能库**（agent-skills、modern-web-guidance）、**安全护栏**（codex-security）、**成本压缩**（free-claude-code、caveman、headroom、claude-mem）。这标志着 AI 编码智能体进入「工程化补课」阶段。

**新兴技术方向**：① **Agent-Ready 设计系统**（astryx）首次登榜，前端资产开始为 AI 生成代码而设计；② **知识图谱式 RAG**（graphify、PageIndex）对向量数据库路线发起正面挑战；③ **Zig 推理引擎**（TensorFold）入局，本地推理工具链语言多元化。

**行业关联**：OpenAI 官方下场做安全 CLI、Google Chrome 为 Agent 维护知识源、Meta 开源 Agent 设计系统——大厂均在争夺「Agent 运行时环境」这一新平台层。中国项目（QwenLM、字节 OpenViking、JeecgBoot）在 CLI 与上下文基础设施两端同步发力。

---

## 4. 社区关注热点

- **[meta/astryx](https://github.com/meta/astryx)**（+1830 today）：今日最热，定义「Agent Ready 设计系统」新品类，前端与 AI 交叉开发者必看
- **[openai/codex-security](https://github.com/openai/codex-security)**：OpenAI 官方 AI 安全工具，可能成为 AI 辅助安全修复的标准件
- **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)**：Skills 生态正在成为 Coding Agent 的「包管理器」，早参与早受益
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** + **[VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex)**：无向量 RAG 路线崛起，值得评估是否替代现有向量库方案
- **token 压缩三件套**（[headroom](https://github.com/headroomlabs-ai/headroom)、[caveman](https://github.com/JuliusBrussee/caveman)、[claude-mem](https://github.com/thedotmack/claude-mem)）:Agent 成本优化的三条互补路径（压缩输出、压缩语言风格、压缩历史），可组合使用

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*