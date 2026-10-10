# AI 开源趋势日报 2026-10-11

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-10-10 23:31 UTC

---

# 📰 AI 开源趋势日报 · 2026-10-11

## 一、今日速览

今日 Trending 榜单被「AI Coding Agent 生态」全面占领：[rea](https://github.com/morluto/rea)（Agent 逆向工程）以单日 +25,784 stars 登顶，Claude Code 周边的 Skills、上下文优化、知识插件类项目集中爆发。Agent 记忆与上下文压缩成为最热技术主题（claude-mem、headroom、context-mode 同榜）。传统 ML 框架（PyTorch、TensorFlow、Transformers）仅维持基础热度，社区注意力已明显从“训练模型”转向“运营 Agent”。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐182.7k | 本地 LLM 运行时事实标准，支持 Kimi、GLM、DeepSeek、Qwen 等主流模型 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | ⭐167.2k（今日 +94） | 模型定义框架常青树，文本/视觉/多模态训练与推理基础设施 |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | 今日 +178 | Agent 上下文窗口优化：沙箱化工具输出（降 98%）、会话记忆持久化，跨 17 平台 MCP + hooks |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | ⭐8.8k | Rust 生态模块化 LLM 应用框架，Rust + AI 组合的代表 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | ⭐318 | 端侧 LLM 推理 + X-Bit 量化，本地推理新玩家 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | ⭐154.2k | 本地优先 AI 界面，支持 Ollama/OpenAI API 的全栈 UI |

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [morluto/rea](https://github.com/morluto/rea) | 今日 +25,784 🏆 | Agent 驱动的逆向工程：从应用行为到原生二进制全自动分析，今日最爆项目 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐276.5k | Agent harness 性能优化系统：Skills、本能、记忆、安全一体化 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐252.5k | “与你共同成长”的个人 Agent，开源社区旗舰 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | 今日 +1,737 | TypeScript 大神出品的 Agent Skills 集合，直连 .agents 目录 |
| [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | 今日 +279 | 基于 Karpathy 对 LLM 编码陷阱观察的单文件 CLAUDE.md，借势热传 |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | 今日 +626 | Anthropic 官方发布 Claude Cowork 知识工作者插件库，官方生态信号 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | ⭐117.6k | 浏览器操作 Agent 标准方案 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐99.2k | Agent 跨会话持久记忆层，兼容 Claude Code/Codex/Gemini 等十余客户端 |

### 📦 AI 应用

| 项目 | Stars | 说明 |
|---|---|---|
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐59.4k（今日 +515） | AI 生成原生 PowerPoint（原生形状/动画/图表/配音），双榜在身，国产应用出海代表 |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | ⭐95.5k | 一条 CLI 让 Agent 读取 Twitter/Reddit/B站/小红书全网内容，零 API 费 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | ⭐74.0k | AI 求职 Agent：岗位扫描、CV 打分、简历定制，本地运行 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | ⭐66.1k | LLM 多市场股票分析系统，零成本定时运行 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | ⭐52.5k | 300+ 助手的 AI 生产力工作台 |
| [asukaminato0721/telegram-summary-bot](https://github.com/asukaminato0721/telegram-summary-bot) | ⭐202 | 免费自部署的群聊 AI 摘要机器人，支持中文检索 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | ⭐104.1k（今日 +81） | 深度学习训练基石框架 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | ⭐200.7k（今日 +24） | 老牌 ML 框架，热度平稳但增长乏力 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | ⭐62.4k | YOLO27/26/11 全家桶，CV 训练部署事实标准 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | ⭐7.5k | LLM 评测平台，覆盖 100+ 数据集、主流模型 |
| [thinkwee/AwesomeOPD](https://github.com/thinkwee/AwesomeOPD) | ⭐874 | On-Policy Distillation 论文列表——小模型蒸馏新热点 |

### 🔍 RAG/知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | ⭐92.0k | RAG + Agent 融合引擎，RAG 赛道头部 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐67.0k | Agent 记忆基础设施，生产级 drop-in 方案 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐39.0k | 无向量、推理式 RAG，反向量数据库流派代表 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐125.3k | 代码库→可查询知识图谱，Claude Code skill 形态 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | ⭐13.0k | MLSys 2026 最佳论文，存储省 97% 的端侧 RAG |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | ⭐32.0k | 小模型驱动的 Agent 长期记忆平台 |

---

## 三、趋势信号分析

**1. Claude Code 生态全面爆发。** 今日热榜 13 席中约半数与 AI Coding Agent 直接相关（skills、context-mode、knowledge-work-plugins、diagram-design），且多为“轻量资产”（Skills 文件、CLAUDE.md、HTML 资源）而非重型框架——社区创新单元正从“框架”降维到“提示词资产 + 插件”。

**2. 上下文工程成为独立赛道。** context-mode（工具输出压缩 98%）、headroom（token 削减 20-95%）、caveman（65% token 节流）、claude-mem（会话记忆）同日集中出现，指向同一痛点：Agent 时代的 token 成本与上下文管理。

**3. 记忆与蒸馏是下半年两大主线。** RAG 榜单中记忆类项目（mem0、cognee、claude-mem）密集；训练侧 On-Policy Distillation 论文列表活跃，暗示“小模型 + 强蒸馏”路线升温。

**4. 官方入场。** Anthropic 开源 Claude Cowork 插件库，平台方主动培育生态，将挤压第三方工具的生存空间，但也带来标准化的 hooks/skills 规范红利。

---

## 四、社区关注热点

- **[morluto/rea](https://github.com/morluto/rea)**：单日 +25.8k 的现象级项目，Agent 应用于逆向工程是全新的能力边界，值得观察其技术路线
- **[anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins)**：Anthropic 官方生态动作，预示 Agent 插件规范的官方标准走向
- **[mksglu/context-mode](https://github.com/mksglu/context-mode) + [headroom](https://github.com/headroomlabs-ai/headroom)**：上下文压缩双雄，token 成本优化是所有 Agent 项目的刚需
- **[PageIndex](https://github.com/VectifyAI/PageIndex) / [LEANN](https://github.com/StarTrail-org/LEANN)**：“无向量 RAG”与端侧轻量检索，代表对重型向量数据库路线的反思
- **[hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)**：Trending 与主题搜索双榜在身的国产 AI 应用，验证“生成原生格式文档”这一垂直场景的商业潜力

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*