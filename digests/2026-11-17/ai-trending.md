# AI 开源趋势日报 2026-11-17

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-17 02:54 UTC

---

# 《AI 开源趋势日报》2026-11-17

## 一、今日速览

今日 GitHub Trending 被 **Agent Skills 生态** 强势占领：15 个热榜项目中过半与 AI Agent 技能包、评估工具或 Agent 交互界面直接相关。NVIDIA 推出 SkillEvaluator、Google Labs 发布 stitch-skills，标志着大厂正加速为“技能即插件”的 Agent 形态建立评估与兼容标准。阿里巴巴 open-code-review 登榜则显示 LLM 深度融入企业级工程工具成为常态。编码代理（coding agent）周边工具链（上下文管理、本地视频编辑、浏览器控制）全面开花，Agent 基础设施已进入精细化分工阶段。

**过滤说明**：Trending 中 `getarcaneapp/arcane`（Docker 管理）、`DeanChensj/jiangshan-map`（历史地图）、`sveltejs/svelte`（前端框架）与 AI 无直接关联，予以排除；主题搜索中 `Developer-Y/cs-video-courses`（课程列表）、`JuliaLang/julia`（编程语言）非 AI 直接相关，亦略去。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理、开发工具）

- **[NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator)**（Python，+873 today）
  NVIDIA 官方出品的 Agent 技能/插件多级评估框架，含质量门禁、语义重叠检测与合成评测集生成——技能爆发时代急需的“质检员”，大厂背书引爆关注。
- **[ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)**（TypeScript，+841 today）
  Chrome 官方为编码代理开放的 DevTools MCP 通道，让 Agent 直接驱动浏览器调试，官方基础设施接入 Agent 生态的标志性项目。
- **[kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill)**（Python，+367 today）
  42 个 FFmpeg 工具 + MCP 服务器，纯本地无 API Key 的视频编辑技能包，体现“本地优先”的 Agent 工具趋势。
- **[ollama/ollama](https://github.com/ollama/ollama)**（Go，⭐187,277）
  本地大模型运行事实标准，已支持 Kimi、GLM、DeepSeek、gpt-oss、Qwen 等主流开源模型。
- **[0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig)**（Rust，⭐9,162）
  Rust 生态模块化 LLM 应用框架，Rust + AI 的代表选手。
- **[skyzh/tiny-llm](https://github.com/skyzh/tiny-llm)**（Python，⭐5,747）
  面向系统工程师的 LLM 推理教学项目：从零实现 mini vLLM，学习推理系统的最佳入口之一。
- **[huggingface/transformers](https://github.com/huggingface/transformers)**（Python，⭐169,089）
  模型定义框架的行业基石，文本/视觉/多模态训练推理全覆盖。

### 🤖 AI 智能体/工作流

- **[ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)**（TypeScript，+791 today）
  Agent-User 交互协议，把 Agent 嵌入前端应用的标准层，今日热榜增速第一梯队，CopilotKit 团队出品。
- **[backnotprop/plannotator](https://github.com/backnotprop/plannotator)**（TypeScript，+696 today）
  "Human-in-the-loop" 的 Agent 工作空间：规划、审批、代码审查、团队协作反馈一站聚合，直击 Agent 监督痛点。
- **[paperclipai/paperclip](https://github.com/paperclipai/paperclip)**（TypeScript，⭐114,382）
  定位“人人都在用的 Agent 工作管理应用”，办公场景 Agent 编排的头部开源产品。
- **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)**（Python，⭐263,946）
  “与你共同成长的 Agent"，明星社区 NousResearch 出品，关注度极高。
- **[browser-use/browser-use](https://github.com/browser-use/browser-use)**（Python，⭐121,245）
  浏览器 Agent 事实标准库，配合今日 Chrome DevTools MCP 热度，Web 操作 Agent 赛道全面升温。
- **[zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)**（Python，⭐47,958）
  自进化个人 AI 助手 + Agent Harness，多智能体多模型多渠道，一行安装。
- **[google-research/paper-orchestra](https://github.com/google-research/paper-orchestra)**（Python，+313 today）
  Google Research 的多智能体自动化学术论文写作框架，Agent 落地科研场景的代表。

### 📦 AI 应用（垂直场景）

- **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)**（Go，+951 today）
  阿里规模验证的混合架构代码审查：确定性流水线 + LLM Agent，行级精准评论，兼容 OpenAI/Anthropic——今日企业级 AI 工程工具最大黑马。
- **[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)**（Python，+1094 today）
  今日榜单增速第一：82 个技能、15 个斜杠命令、681 个公开漏洞报告模式的红队/挖洞技能包，安全 + Agent 交叉领域爆发。
- **[tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills)**（Python，+837 today）
  面向股票交易者的 Claude Code 技能包（行情分析、技术图表、策略开发），与主题区的 Vibe-Trading、daily_stock_analysis 共同印证“AI 交易"赛道火热。
- **[dream-num/univer](https://github.com/dream-num/univer)**（TypeScript，+1828 today）
  今日全榜 stars 增速第一：开源 Office SDK，主打"让人和 AI Agent 共同编辑计算协作”，AI 办公基础设施。
- **[mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)**（Python，+135 today）
  跨 Reddit/X/YouTube/HN/Polymarket 的主题调研技能包并合成摘要，Agent 信息获取能力组件化。
- **[hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)**（Python，⭐77,583）
  文档/主题一键转原生 PPT（含图表、动画、配音），AI 生产力应用高星代表。

### 🧠 大模型/训练

- **[picovoice/picollm](https://github.com/Picovovic/picollm)**（Python，⭐320）
  X-Bit 量化的端侧 LLM 推理方案，端侧部署持续演进。
- **[FonaTech/Project_Chronos](https://github.com/FonaTech/Project_Chronos)**（Python，⭐207）
  零停顿 MoE 推理：前瞻预测 + 异步 DMA 预取，SSD I/O 优化的前沿推理系统尝试。
- **[open-compass/opencompass](https://github.com/open-compass/opencompass)**（Python，⭐7,597）
  支持 OpenAI/Anthropic/Qwen/GLM/DeepSeek 等 100+ 数据集的 LLM 评测平台，中文评测生态核心。
- **[thinkwee/AgentsMeetRL](https://github.com/thinkwee/AgentsMeetRL)**（⭐1,880）/ **[AwesomeOPD](https://github.com/thinkwee/AwesomeOPD)**（⭐883）
  Agentic RL 与 On-Policy Distillation 两份前沿 Awesome List，反映“Agent 训练范式”学术热度攀升。

### 🔍 RAG/知识库

- **[open-webui/open-webui](https://github.com/open-webui/open-webui)**（Svelte，⭐158,863）
  最流行的本地 AI 界面，支持 Ollama/OpenAI 等多后端。
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)**（Python，⭐149,092）
  代码库/文档/PDF → 可查询知识图谱的技能，主打“无需向量库的确定性 AST 解析”，知识图谱 RAG 新范式。
- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)**（Python，⭐79,857）
  LLM 输入压缩代理：JSON 省 60-95% token、编码 Agent 省 20%，上下文经济学代表。
- **[volcengine/OpenViking](https://github.com/volcengine/OpenViking)**（Python，⭐42,319）
  字节自进化上下文数据库，统一 Agent 记忆、知识 RAG 与技能。
- **[StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN)**（Python，⭐13,801）
  MLSys2026 最佳论文：省 97% 存储的个人设备端私有 RAG。
- **[VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex)**（Python，⭐40,452）
  无向量、推理式 RAG 文档索引，与 graphify 同样代表“去向量库化”新思路。

---

## 三、趋势信号分析

**1）Agent Skills 成为今日最强主线。** 热榜 15 席中约 7 个是技能包（BugHunter、trading-skills、ffmpeg-skill、last30days-skill、stitch-skills）或技能基础设施（SkillEvaluator、plannotator），"Skills 生态"正复制当年 MCP 的爆发曲线——而 NVIDIA 入局评估、Google 强调开放标准兼容，说明生态已从“量增”进入“质控与标准化”阶段。

**2）编码代理周边工具精细化。** chrome-devtools-mcp（官方浏览器调试）、claude-mem（跨会话记忆）、headroom（token 压缩）、caveman（120k stars 的“原始人语气”省 token 代理）共同勾勒出 coding agent 的完整外围栈：上下文、工具、成本三大瓶颈都有专门项目攻坚。

**3）垂直场景纵深明显。** AI 交易（claude-trading-skills +837）、安全红队（BugHunter +1094）、AI 办公（univer +1828）登榜，说明 Agent 能力正从通用框架沉淀为领域专用技能资产。

**4）技术方向新信号**：去向量库的 RAG（graphify、PageIndex）、上下文压缩经济学（headroom）、Agentic RL 学术热度上升值得关注。

---

## 四、社区关注热点

- **[SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator)**（+873）—— NVIDIA 定义技能评估标准，技能生态的“守门人”，值得所有 Skill 开发者跟进
- **[Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)**（+1094，今日增速第一）—— 安全红队 + Agent 技能的交叉爆点，模式库含金量高
- **[univer](https://github.com/dream-num/univer)**（+1828，全榜第一）—— “为人和 Agent 设计的 Office”，AI 办公基础设施级机会
- **[open-code-review](https://github.com/alibaba/open-code-review)**（+951）—— 混合架构（规则 + LLM）代码审查，阿里规模验证，企业可直接落地
- **[ag-ui](https://github.com/ag-ui-protocol/ag-ui)**（+791）—— Agent 与前端交互的协议层，若成为标准将是早期红利窗口

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*