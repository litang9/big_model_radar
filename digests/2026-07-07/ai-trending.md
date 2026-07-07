# AI 开源趋势日报 2026-07-07

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-07-07 04:18 UTC

---

这份《AI 开源趋势日报》基于 2026 年 7 月 7 日的 GitHub Trending 及主题搜索数据编制。我们已剔除非 AI 相关的通用项目，对数据进行了深度过滤与分类，并提炼了核心技术信号。

---

# 📰 AI 开源趋势日报 (2026-07-07)

## 1. 今日速览
今日 GitHub AI 生态出现明显的**“智能体技能化”**与**“端侧/本地化”**爆发趋势。一方面，围绕顶级闭源模型（如 GPT-5.5、Claude 4.8）的系统提示词泄露库引发全网极大关注，揭示了高阶模型的内在逻辑；另一方面，以 Rust 和端侧推理为核心的应用展现出惊人的爆发力，隐私优先的本地会议助手及底层高性能组件纷纷登榜。此外，**“AI 技能”** 正在成为连接各类 CLI 编程智能体的新型标准化资产。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具）
*   [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc) [JavaScript] ⭐ (+906 today)
    OpenAI 官方出品，允许在 Claude Code 中直接调用 Codex 进行代码审查或任务委派，标志着不同厂商的 AI 编程工具正在走向底层互联。
*   [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) [Python] ⭐ (+610 today)
    包含 345 个预制技能，兼容 Claude Code、Codex、Cursor 等十多种编程智能体，是构建“即插即用”AI 能力的超级模板库。
*   [steipete/CodexBar](https://github.com/steipete/CodexBar) [Swift] ⭐ (+598 today)
    无需登录即可在桌面端展示 OpenAI Codex 和 Claude Code 使用量统计的工具，解决了多智能体频繁切换时的用量焦虑。
*   [bradautomates/claude-video](https://github.com/bradautomates/claude-video) [Python] ⭐ (+427 today)
    赋予 Claude “看视频”能力的实用工具，通过自动抽帧、转录并将其喂给大模型，补齐了多模态 Agent 处理长视频的工程化短板。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
*   [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) [JavaScript] ⭐ (+1112 today)
    为 AI 编程智能体提供生产级别的工程技能包，旨在解决当前 AI 生成的代码过于“玩具化”或不够规范的问题。
*   [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) [JavaScript] ⭐ (+1458 today)
    有趣且实用的 Agent 技能包，专门用于阻止 AI 生成千篇一律的“废话语料”，为 AI 注入“高级审美”与品味。
*   [ogulcancelik/herdr](https://github.com/ogulcancelik/herdr) [Rust] ⭐ (+779 today)
    运行在终端的智能体多路复用器，允许开发者同时管理和并行运行多个 AI CLI 任务，大幅提升终端多 Agent 协作效率。
*   [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) [Python] ⭐ 210,478 [topic:ai-agent]
    “与你共同成长的智能体”，NousResearch 旗下的顶流开源 Agent 项目，在开源模型生态中具有统治级关注度。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）
*   [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) [JavaScript] ⭐ (+1378 today)
    今日全网最火项目之一，系统性提取并公开了包括 ChatGPT-5.5、Claude 4.8、Gemini 3.5 等最新一代商业 AI 的底层系统提示词。
*   [Zackriya-Solutions/meetily](https://github.com/Zackriya-Solutions/meetily) [Rust] ⭐ (+2494 today)
    **今日新增 Star 最高项目**。完全本地化处理、隐私第一的 AI 会议助手，基于 Rust 构建实现 4 倍速的 Whisper 实时转录，无云依赖。
*   [ruvnet/RuView](https://github.com/ruvnet/RuView) [Rust] ⭐ (+470 today)
    极具前瞻性的空间智能应用，不依赖摄像头，纯粹利用普通 WiFi 信号进行实时空间感知、生命体征监测和存在检测。
*   [karakeep-app/karakeep](https://github.com/karakeep-app/karakeep) [TypeScript] ⭐ (+199 today)
    支持“万物收藏”的自托管应用，内置极强的 AI 自动打标和全文检索功能，是个人知识管理的利器。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）
*   [AarambhDevHub/aarambh-ai](https://github.com/AarambhDevHub/aarambh-ai) [Rust] ⭐ 9 [topic:llm-model]
    纯 Rust 从头实现的 Decoder-only LLM（抛弃 Python/PyTorch）。支持 INT4 量化与 GRPO 对齐，展现了 Rust 在底层大模型训练中的野心。
*   [open-compass/opencompass](https://github.com/open-compass/opencompass) [Python] ⭐ 7,166 [topic:llm-model]
    支持目前市面所有前沿模型（Llama3、Qwen、GLM、GPT-4）的权威大模型评测平台，是 AI 模型迭代的必备标尺。
*   [huggingface/transformers](https://github.com/huggingface/transformers) [Python] ⭐ 162,321 [topic:llm]
    Hugging Face 的核心框架，涵盖了目前最前沿的机器学习模型定义，依然是 AI 训练与推理生态的绝对基石。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）
*   [alibaba/zvec](https://github.com/alibaba/zvec) [C++] ⭐ (+382 today)
    阿里巴巴开源的轻量级、闪电般快速的进程内向量数据库，打破了传统重负载向量库的局限，极其适合轻量级 RAG 应用。
*   [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) [Python] ⭐ 78,851 [topic:rag]
    将任何代码、文档、音视频转化为可查询的知识图谱，支持接入 Claude Code、Cursor 等主流智能体，代表了 GraphRAG 的工程化落地。
*   [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) [TypeScript] ⭐ (+867 today, 总 146k+)
    大规模网络搜索与抓取的最强 API，是为 RAG 知识库源源不断输送高质量、结构化实时数据的黄金搭档。

---

## 3. 趋势信号分析

今日 GitHub 数据释放了三个极为强烈的行业信号：
**1. “CLI Agent” 正在统一开发者工作流。** 围绕终端命令行（如 Claude Code, Codex, Gemini CLI）的插件、技能优化正在形成巨大的生态。像 `claude-skills`、`CodexBar` 以及各种 agent 工具的集中爆发，说明开发者已不再满足于 GUI 聊天框，而是将 AI 深度嵌入到了本地编译与开发流中。
**2. “提示词工程” 变为 “资产泄露与研究学”。** `system_prompts_leaks` 凭借极高热度登顶，揭示了在 GPT-5.5 和 Claude 4.8 时代，商业巨头精密的 Prompt 架构已成为社区重点研究的开源情报，这不仅能指导企业级 RAG 优化，也反映了大众对闭源黑盒模型透明度的渴求。
**3. Rust 正式接管 AI 边缘侧。** 无论是今日暴涨的本地会议助手 `meetily`，还是终端复用器 `herdr`，或是纯 Rust 编写的大模型 `aarambh-ai`，以及轻量级向量库 `zvec`，都在证明 Rust 凭借“内存安全+极致并发”已成为“隐私优先、本地运行”AI 应用的绝对首选语言。

---

## 4. 社区关注热点
*   🔥 **[asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)**：每一位 Prompt 工程师和 Agent 开发者必看。研究头部大厂如何设定系统提示词，能极大提升自己应用的稳定性与安全性。
*   🚀 **[Zackriya-Solutions/meetily](https://github.com/Zackriya-Solutions/meetily)**：企业级替代 Otter.ai 的最佳开源方案。基于 Rust 和本地 Whisper 的架构，做到 100% 本地运行，解决了商业会议数据泄露的痛点。
*   ⚡ **[alibaba/zvec](https://github.com/alibaba/zvec)**：对于不需要部署庞大独立服务的开发者，阿里开源的 `zvec` 进程内向量数据库大幅降低了 RAG 系统的部署门槛，适合小型应用与端侧设备。
*   🧩 **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)**：前端大神 addyosmani 的力作，规范了 AI 智能体的代码编写行为，非常适合希望构建自动化软件工程团队的技术负责人研究借鉴。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*