# AI 开源趋势日报 2026-06-11

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-06-11 03:37 UTC

---

这份《AI 开源趋势日报（2026-06-11）》已为您整理完毕。基于今日的 GitHub Trending 榜单与 AI 主题搜索数据，我进行了严格的数据过滤、去重和分类分析。

以下是今日报告的核心内容：

---

# 📊 AI 开源趋势日报 (2026-06-11)

## 1. 今日速览
*   **AI Agent 迎来“技能模块化”爆发**：今日 Trending 榜单被各类“Agent Skills（智能体技能）”项目霸榜，从工程开发、产品经理到联网调研，AI 智能体正从“通用大脑”向“专业技能市场”演进。
*   **“逆向工程”与“系统提示词”成为显学**：收录各大主流 AI 工具内部提示词的项目热度居高不下，开发者正通过拆解成熟产品（如 Cursor, Devin, Manus 等）来反哺自身 Agent 的构建。
*   **Claude Code 生态圈初步成型**：无论是针对 Claude Code 的性能优化（ECC）、记忆增强（claude-mem），还是可视化教程与学习框架，围绕特定头部 AI 编程助手的二次开发生态正成为开源红利区。
*   **端侧与空间计算 AI 展露头角**：利用商用 WiFi 信号进行无摄像头空间感知与体征监测的项目表明，AI 正加速向物理世界的底层感知渗透。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具）
*   **[affaan-m/ECC](https://github.com/affaan-m/ECC)** ⭐212,827 | The agent harness performance optimization system. 针对 Claude Code 等编程 Agent 的性能优化系统，集成了技能、记忆与安全机制。
*   **[huggingface/transformers](https://github.com/huggingface/transformers)** ⭐161,487 | 业界最核心的模型定义与训练推理框架，全面支持文本、视觉、音频等多模态。
*   **[vllm-project/vllm](https://github.com/vllm-project/vllm)** ⭐82,476 | 高吞吐、低显存的 LLM 推理与服务引擎，生产环境部署的基石。
*   **[ollama/ollama](https://github.com/ollama/ollama)** ⭐173,809 | 最流行的本地大模型一键部署与运行 CLI 工具，支持最新主流模型。
*   **[roboflow/supervision](https://github.com/roboflow/supervision)** ⭐0 (+695 today) | 提供开箱即用的计算机视觉（CV）可复用工具，大幅简化视觉 AI 应用的开发流程。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
*   **[obra/superpowers](https://github.com/obra/superpowers)** ⭐0 (+1104 today) | 一个全新的 Agentic 技能框架与软件开发方法论，今日热度极高，为 Agent 提供底层工作流范式。
*   **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)** ⭐0 (+821 today) | 专为 AI 编程 Agent 打造的生产级工程技能库，直接提升 AI 写代码的工程化能力。
*   **[mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)** ⭐0 (+2535 today) | 能够全网（Reddit, X, YouTube 等）深度调研并生成结构化总结的 Agent 技能，今日增速惊人。
*   **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** ⭐190,127 | 开源社区极具潜力的通用 Agent 框架，主打伴随用户成长的个性化智能体。
*   **[bytedance/deer-flow](https://github.com/bytedance/deer-flow)** ⭐70,925 | 字节跳动开源的长周期 SuperAgent 框架，擅长处理需耗时数分钟到数小时的复杂研究与创作任务。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）
*   **[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)** ⭐0 (+1389 today) | 借助大模型一键生成高清短视频的 Web 应用，今日登榜，反映 AIGC 视频创作需求依然极其旺盛。
*   **[x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)** ⭐0 (+393 today) | 全面收集了 Cursor、Devin、Manus 等全球顶尖 AI 应用的系统提示词和内部工具调用方式，研究 AI 产品设计的最佳实战库。
*   **[maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed)** ⭐0 (+527 today) | 开源医疗 AI 解决方案，大模型在垂直医疗领域的落地探索。
*   **[ruvnet/RuView](https://github.com/ruvnet/RuView)** ⭐0 (+420 today) | 创新性应用：将商用 WiFi 信号转化为实时空间智能与生命体征监测，无需任何摄像头，极具前瞻性。
*   **[santifer/career-ops](https://github.com/santifer/career-ops)** ⭐52,525 | 基于 Claude Code 构建的 AI 求职系统，支持批量处理、仪表盘与 PDF 简历生成，贴近打工人刚需。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）
*   **[hiyouga/LlamaFactory](https://github.com/hiyouga/LlamaFactory)** ⭐72,057 | 统一、高效的百种大模型/视觉语言模型微调框架（ACL 2024），国内开发者必用工具。
*   **[FareedKhan-dev/train-llm-from-scratch](https://github.com/FareedKhan-dev/train-llm-from-scratch)** ⭐0 (+247 today) | 从数据下载到文本生成的全流程 LLM 从零训练教程，因填补了硬核入门空白而备受关注。
*   **[open-compass/opencompass](https://github.com/open-compass/opencompass)** ⭐7,080 | 面向大模型时代的全维度评测平台，支持所有主流模型与上百个数据集。
*   **[skyzh/tiny-llm](https://github.com/skyzh/tiny-llm)** ⭐4,267 | 面向系统工程师的 LLM 推理服务课程，在 Apple Silicon 上构建 mini 版 vLLM。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）
*   **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)** ⭐82,423 | 深度融合 RAG 与 Agent 能力的领先开源引擎，致力于为 LLM 提供极致的上下文层。
*   **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** ⭐81,668 | 为各类编程 Agent 提供跨会话的持久化记忆，通过自动压缩和注入上下文解决大模型遗忘问题。
*   **[safishamsi/graphify](https://github.com/safishamsi/graphify)** ⭐65,050 | AI Agent 的知识图谱技能，能将任何代码库、文档、视频转化为可查询的知识图谱，突破了传统 RAG 的瓶颈。
*   **[milvus-io/milvus](https://github.com/milvus-io/milvus)** ⭐44,724 | 全球领先的高性能云原生向量数据库，支持海量规模的 ANN 搜索。

---

## 3. 趋势信号分析

**Agentic Skills（智能体技能化）与模块化分工确立**
今日 GitHub Trending 释放出极其强烈的信号：AI Agent 的开发范式正在从“单体提示词工程”转向“技能模块化组装”。以 `agent-skills`、`last30days-skill`、`obra/superpowers` 为代表的项目集中爆发，说明开发者已意识到，让 Agent 变得强大的关键不在于单一模型的能力，而在于为其挂载标准化、可插拔的“技能包”（如 PM 技能、联网调研技能、工程技能）。这将催生一波“AI Agent 技能市场”的繁荣。

**头部 AI 编程工具的“周边生态”成为开源新红利**
围绕极少数头部 AI 编程工具（特别是 Claude Code 和 Cursor）构建周边工具正成为开源变现与积攒影响力的捷径。无论是逆向收集系统提示词的 `system-prompts-and-models-of-ai-tools`，还是提供记忆持久化的 `claude-mem`，亦或是优化底层执行性能的 `ECC`，都反映了大模型时代的“挖矿不如卖铲子”逻辑——为超级 AI 应用赋能，比重新造一个 AI 应用更容易获得社区青睐。

**多模态向非可见光与物理空间延展**
`RuView` 项目利用 WiFi 信号而非图像进行空间感知和体征监测，代表了端侧 AI 的一个重要分支：超越纯视觉（图像/视频）的多模态感知。结合具身智能的热度，预计未来将出现更多利用声学、电磁波等物理信号结合 LLM 进行推理的开源项目。

---

## 4. 社区关注热点（开发者 Recommended）

*   🔥 **[mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)**：强烈建议所有 Agent 开发者体验。它展示了如何优雅地集成多源异构数据（Reddit、Polymarket等）并让 AI 输出高质量报告，是构建“研究型智能体”的绝佳模板。
*   🔥 **[x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)**：AI 产品经理和后端工程师必看。全面拆解了国外顶尖 AI 产品的系统提示词设计，是学习大厂如何约束和引导模型行为的“武功秘籍”。
*   🔥 **[safishamsi/graphify](https://github.com/safishamsi/graphify)**：突破了传统向量 RAG 的局限，将代码和文档转化为图谱。对于需要处理复杂代码库或需要大模型进行深度逻辑推理的场景，提供了新思路。
*   🌟 **[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)**：今日涨势迅猛的 AIGC 应用。适合自媒体从业者或想快速利用大模型 API �

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*