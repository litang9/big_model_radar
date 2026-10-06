# AI 开源趋势日报 2026-10-07

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-10-06 23:47 UTC

---

# AI 开源趋势日报 · 2026-10-07

## 一、今日速览

今日 GitHub Trending 几乎被“Coding Agent 生态工具”占领——Agent Skills、记忆持久化、逆向工程、CAD 能力注入等围绕 Claude Code / Codex 等 Agent Harness 的周边项目集体爆发。其中 [morluto/rea](https://github.com/morluto/rea) 以单日 +2963 stars 成为最强黑马，标志着“Agent 逆向工程”这一新方向首次进入大众视野。同时，[claude-mem](https://github.com/thedotmack/claude-mem) 在 Trending 与主题搜索双榜出现（总星 97k），Agent 跨会话记忆已成刚需赛道。主题搜索层面，Agent Harness 性能优化（ECC、caveman、headroom）和“少即是多”的 Token 压缩文化正在形成独立流派。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐182,395 | 本地大模型推理事实标准，支持 Kimi、GLM、DeepSeek、gpt-oss 等主流开源模型 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | ⭐167,000 | 模型定义框架，文本/视觉/多模态训练推理一体的生态基石 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | +972 today | TypeScript 名人 Matt Pocock 直出个人 `.agents` 目录的 Agent Skills 集合，“Skills for Real Engineers” 引发工程社区共鸣 |
| [deepseek-ai/DeepGEMM](https://github.com/deepseek-ai/DeepGEMM) | +363 today | DeepSeek 出品的高效 GPU BLAS 内核库，推理训练底层性能优化的标杆 |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | +609 today | 为 AI Harness 提供的“设计语言”，让 Coding Agent 输出更好的 UI 设计，填补 Agent 审美空白 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | ⭐117,284 | 让 Agent 操作浏览器的标准库，Web 自动化基础设施 |
| [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale) | ⭐41,065 | Rust 构建的开源终端 Coding Agent，社区驱动快速迭代 |

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [morluto/rea](https://github.com/morluto/rea) | +2963 today | 今日最热项目：用 Agent 逆向工程任何东西——从 App 行为到原生二进制，全新赛道首次登榜 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐274,283 | Agent Harness 性能优化系统：Skills、本能、记忆、安全一体化，总星已超 27 万，Agent 元工具顶流 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐251,689 | “与你共同成长的 Agent”，总星 25 万级，个人 Agent 方向头部项目 |
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | +621 today | 一整套带人格与流程的“AI 代理商团队”角色 Agent 库，Agent 人格化模板化趋势的代表 |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | ⭐42,795 | 构建高容错 Agent 的图编排框架，生产级多智能体工作流主力 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | ⭐47,252 | 中文社区个人 AI 助手/Agent Harness，自我进化 + 多智能体多渠道，一行安装 |
| [HKUDS/nanobot](https://github.com/HKUDS/nanobot) | ⭐48,827 | 港大 HKUDS 出品的超轻量自托管个人 Agent 框架，学术系开源代表 |

### 📦 AI 应用

| 项目 | Stars | 说明 |
|---|---|---|
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | ⭐154,096 | 最流行的本地 AI 界面，支持 Ollama / OpenAI API 等 |
| [langgenius/dify](https://github.com/langgenius/dify) | ⭐157,970 | Agentic 工作流 + RAG 一体化平台，从原型到生产的协作空间 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | ⭐73,640 | 在本地 AI Coding CLI 中运行的求职 Agent：扫描职位、CV 打分、定制简历 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐57,878 | 文档/主题 → 原生 PowerPoint，带动画、图表与语音旁白，AI 办公生产力爆款 |
| [DuarteSantos8/openGym](https://github.com/DuarteSantos8/openGym) | +1419 today | 自托管健身追踪器（注：与 AI 相关性弱，仅因热榜关注度列出，非 AI 核心项目） |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | +318 today | 让 Coding Agent “说人话”的 ADHD 友好输出 Skill，Agent 输出体验微创新的小而美样本 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | ⭐200,717 | 老牌深度学习框架，ML 生态常青树 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | ⭐103,822 | 动态图训练框架，研究社区默认选择 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐106,136 | 从零用 PyTorch 实现 ChatGPT 级 LLM，最佳学习路径资源 |
| [rohitg00/ai-engineering-from-scratch](https://github.com/gh?tab=repositories) — [ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | ⭐65,287 | AI 工程从零学起，Learn → Build → Ship，反映“AI Engineer”职业化学习需求 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | ⭐62,247 | YOLO 系列目标检测全家桶，CV 应用落地标配 |

### 🔍 RAG/知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐97,150 (+536 today) | 双榜项目：为所有主流 Agent 提供跨会话持久记忆，AI 压缩 + 上下文注入，今日热度佐证其地位 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐124,412 | 代码库 → 可查询知识图谱，AST 确定性解析、无需向量库，反 RAG 常规路线的新范式 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | ⭐189,199 | 为 Agent 供给 Web 数据的基础设施，“Building the library for superintelligence” |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | ⭐74,524 | LLM 输入压缩层：JSON 省 60-95% token、Coding Agent 省 20%，支持库/代理/MCP 三形态 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐66,687 | Agent 记忆层基础设施，生产级持久上下文 |
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | ⭐84,855 | LLM-ready 网页抓取器，RAG 数据采集环节标配 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐38,787 | “无向量、基于推理”的文档索引 RAG，与 Graphify 共同指向 Vectorless RAG 趋势 |

**已过滤项目**（Trending 中非 AI 相关）：[boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5)（PS5 移植工具）、[tester-army/e2e](https://github.com/tester-army/e2e)（通用测试框架）、[earthtojake/text-to-cad](https://github.com/earthtojake/text-to-cad)（注：此项目为 Agent 提供 CAD 能力，实为 AI 相关，已归入下文趋势分析）。另 [Developer-Y/cs-video-courses](https://github.com/Developer-Y/cs-video-courses)、[JuliaLang/julia](https://github.com/JuliaLang/julia)、[netdata/netdata](https://github.com/netdata/netdata) 等为泛 CS/通用工具，弱相关不计入。

---

## 三、趋势信号分析

**1. Agent Skills 生态正在爆发。** 今日榜单上 skills、agency-agents、i-have-adhd、diagram-design、text-to-cad（“给 Agent CAD 超能力”）等项目共同表明：围绕 Claude Code / Codex 等 Harness 的“能力注入型”微包（Skill）已成为独立品类，开发者在以“发 npm 包”的心态发布 Agent 能力。

**2. Agent 基础设施三件套成型：记忆、压缩、逆向。** claude-mem（记忆）+ headroom/caveman（token 压缩）+ rea（逆向工程）覆盖了 Agent 运行时的核心痛点。尤其 morluto/rea 单日近 3000 stars，说明“让 Agent 理解存量系统/二进制”是尚未饱和的新方向；caveman 用“原始人语气”砍 65% token 的病毒式传播，则显示 token 成本焦虑已催生亚文化级方案。

**3. Vectorless / 结构化 RAG 抬头。** Graphify（AST + 知识图谱、无向量库）与 PageIndex（推理式索引）均获高星，社区对纯向量检索的幻觉与不可解释性出现反思，确定性解析路线值得跟踪。

**4. 中国力量持续输出。** DeepGEMM、Dify、CowAgent、ppt-master、daily_stock_analysis 等覆盖从算子层到应用层，开源 Agent 应用中文生态成熟度显著领先。

---

## 四、社区关注热点

- **[morluto/rea](https://github.com/morluto/rea)**（+2963 today）：今日增速第一，“Agent 逆向工程”新赛道开创者，安全研究、遗留系统迁移场景潜力大。
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)**（⭐274k）：Agent Harness 元优化的事实标准，做 Agent 工程必读。
- **[claude-mem](https://github.com/thedotmack/claude-mem)**（⭐97k，双榜）：跨会话记忆 + 主流 Agent 全兼容，Agent 记忆赛道头部，发展速度惊人。
- **[headroom](https://github.com/headroomlabs-ai/headroom)**（⭐74k）：透明代理式 token 压缩，对高成本 Coding Agent 是立竿见影的降本方案。
- **[Graphify](https://github.com/Graphify-Labs/graphify)**（⭐124k）：无向量库的代码知识图谱，RAG 架构选型的有力替代，值得架构师评估。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*