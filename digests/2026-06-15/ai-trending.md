# AI 开源趋势日报 2026-06-15

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-06-15 03:55 UTC

---

# 《AI 开源趋势日报》 — 2026.06.15

## 1. 今日速览
今日 GitHub AI 生态呈现出**“智能体基建化”**与**“垂直场景深化”**两大核心特征。吴恩达团队的 [aisuite](https://github.com/andrewyng/aisuite) 再次受到开发者热捧，反映出社区对多模型统一接口的强烈需求；英伟达发布的 [SkillSpector](https://github.com/NVIDIA/SkillSpector) 登上热榜，标志着 AI Agent 的安全与漏洞扫描已成为大厂布局的重点。此外，以 [Kronos](https://github.com/shiyu-coder/Kronos) 和 [TradingAgents](https://github.com/TauricResearch/TradingAgents) 为代表的金融 AI 开源项目迎来爆发，显示 LLM 在专业高频垂直领域的应用正走向成熟。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具）
- [NVIDIA/SkillSpector](https://github.com/NVIDIA/SkillSpector) [Python] ⭐0 (+964 today)
  **英伟达推出的 AI Agent 技能安全扫描工具**。随着 Agent 大量调用外部工具，该项目的爆发反映了社区对插件/技能层恶意模式与安全风险的关注。
- [andrewyng/aisuite](https://github.com/andrewyng/aisuite) [Python] ⭐0 (+291 today)
  **多模型统一调用接口**。让开发者像切换数据库一样无缝切换各家闭源/开源大模型，极大地降低了多模型联调和测试成本。
- [vllm-project/vllm](https://github.com/vllm-project/vllm) [Python] ⭐82,866
  **业界标准的高吞吐 LLM 推理引擎**。依旧是生产环境部署大模型的首选基础设施。
- [ollama/ollama](https://github.com/ollama/ollama) [Go] ⭐174,183
  **本地大模型运行神器**。现支持无缝运行 Kimi-K2.6、GLM-5.1 等最新一代开源模型，是端侧 AI 的基石。
- [huggingface/transformers](https://github.com/huggingface/transformers) [Python] ⭐161,592
  **SOTA 机器学习模型定义与训练框架**。覆盖文本、视觉、音频等全模态，生态霸主地位不可撼动。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）
- [affaan-m/ECC](https://github.com/affaan-m/ECC) [JavaScript] ⭐215,594
  **Agent 性能优化与技能调度系统**。为 Claude Code、Cursor 等 AI 编程助手提供记忆、安全和本能反应机制。
- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitis/AutoGPT) [Python] ⭐184,943
  **老牌全民 AI 自动化 Agent 框架**。持续演进，致力于降低普通人构建 AI 应用的门槛。
- [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) [Python] ⭐77,091
  **AI 驱动的自主软件开发平台**。对标 Devin 的开源方案，让智能体直接参与写代码、修 Bug。
- [browser-use/browser-use](https://github.com/browser-use/browser-use) [Python] ⭐98,849
  **网页自动化 AI Agent**。让大模型能够“看见”并操作网页，是目前 Agent 收集数据与交互的核心组件。
- [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) [JavaScript] ⭐72,579
  **极具创意的 Token 压缩技能**。通过让 Agent “像原始人一样说话”，在保持逻辑的前提下削减 65% 的 Token 消耗。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）
- [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) [Python] ⭐0 (+244 today)
  **面向金融市场的语言基础模型**。将复杂 K 线与市场数据转化为大模型可理解的语言，今日备受瞩目。
- [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) [Python] ⭐86,213
  **多智能体金融交易框架**。模拟真实交易室的分工，通过多个 LLM Agent 协同完成投研与交易决策。
- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) [Python] ⭐27,585
  **全自动 AI PPT 生成器**。能将任意文档转化为带原生动效和语音解说的可编辑 PPT，直击职场痛点。
- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) [TypeScript] ⭐47,336
  **全能 AI 生产力工作站**。集成前沿大模型聊天、自主智能体及 300+ 辅助助手。
- [googleworkspace/cli](https://github.com/googleworkspace/cli) [Rust] ⭐27,068
  **Google Workspace 命令行工具**。内置 AI Agent 技能，让大模型能直接接管和操作你的 Gmail、日历和云盘。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) [Python] ⭐193,670
  **开源可进化的 Agent 模型**。打破静态模型限制，主打能够与开发者共同成长的陪伴型 AI。
- [open-compass/opencompass](https://github.com/open-compass/opencompass) [Python] ⭐7,084
  **全维度 LLM 评测平台**。支持 GLM、Llama、Qwen 等主流模型在 100+ 数据集上的客观能力评估。
- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) [Python] ⭐4,278
  **Apple Silicon 端侧推理教程**。面向系统工程师，从零手搓一个微缩版 vLLM + Qwen。
- [Picovoice/picollm](https://github.com/Picovoice/picollm) [Python] ⭐312
  **端侧大模型推理引擎**。基于 X-Bit 量化技术，主打在移动设备和嵌入式端跑大模型。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）
- [langgenius/dify](https://github.com/langgenius/dify) [TypeScript] ⭐145,230
  **生产级 Agentic 工作流开发平台**。目前开源界最强大的 RAG + Agent 编排可视化构建工具。
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) [Python] ⭐82,741
  **深度文档解析 RAG 引擎**。专注解决复杂格式（PDF/表格）的精准切片与检索，为 LLM 提供高质量上下文。
- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) [JavaScript] ⭐61,595
  **本地优先的一体化 AI 应用**。将 RAG、向量和 Agent 打包成开箱即用的桌面级应用。
- [milvus-io/milvus](https://github.com/milvus-io/milvus) [Go] ⭐44,779
  **云原生高性能向量数据库**。海量数据向量检索的工业界标准底座。
- [topoteretes/cognee](https://github.com/topoteretes/cognee) [Python] ⭐17,829
  **Agent 长期记忆与知识图谱平台**。将传统的向量 RAG 升级为自托管的知识图谱引擎，解决长期记忆遗忘问题。

---

## 3. 趋势信号分析

**1. Agent 安全与效能优化的崛起**
随着 AI Agent 大规模接管编码（如 Cursor/Claude Code）与系统操作，今天 [NVIDIA/SkillSpector](https://github.com/NVIDIA/SkillSpector)（安全扫描）的爆火和 [caveman](https://github.com/JuliusBrussee/caveman)（Token 压缩）的超高 Star 数，释放了一个明确信号：**Agent 的“外挂技能”正在面临严重的安全审查压力，同时其 Token 消耗正在逼疯开发者**。如何安全、低成本地运行 Agent，已成为当下最急迫的工程痛点。

**2. 金融大模型商业闭环显现**
从今日 Trending 的 [Kronos](https://github.com/shiyu-coder/Kronos) 到榜单上高活跃的 [TradingAgents](https://github.com/TauricResearch/TradingAgents) 与 [daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)，金融垂直场景几乎跑通了“数据清洗-多源检索-LLM 推理-执行交易”的全流程。通用大模型在金融逻辑推理上的短板，正在被领域微调和多 Agent 协同架构快速补齐。

**3. 模型层向多模态与端侧无缝融合**
从 Ollama 宣布支持新一代国产模型（Kimi-K2.6, GLM-5.1）可以看出，开源生态对高质量闭源模型“平替”的需求依然强劲。同时，诸如 [tiny-llm](https://github.com/skyzh/tiny-llm) 和 [picollm](https://github.com/Picovoice/picollm) 项目的活跃，暗示着针对特定硬件（如 Apple Silicon 和移动端）裁剪、量化的推理微调技术，正成为新一代极客工程师的必修课。

---

## 4. 社区关注热点

- 🔥 **[NVIDIA/SkillSpector](https://github.com/NVIDIA/SkillSpector)**：强烈建议所有正在开发 Agent 插件、MCP 工具的开发者关注。Agent 直接执行恶意代码或被提示词注入劫持的风险已经近在眼前，防患于未然需要此类工具。
- 🔥 **[andrewyng/aisuite](https://github.com/andrewyng/aisuite)**：如果你还在为各家大模型 API 参数不一致而头疼，这个项目是目前最低成本的解决方案。
- 🚀 **[Kronos](https://github.com/shiyu-coder/Kronos) & [TradingAgents](https://github.com/TauricResearch/TradingAgents)**：量化交易者和金融科技开发者必看。展示了如何将传统的行情数据与现代 LLM 的分析能力进行优雅对接。
- 💡 **[caveman](https://github.com/JuliusBrussee/caveman)**：为 Prompt 工程提供了一个反直觉但极其有效的思路。用极简语法替代冗长思维链，不仅省钱，还能降低模型幻觉。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*