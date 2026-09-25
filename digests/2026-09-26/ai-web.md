# AI 官方内容追踪报告 2026-09-26

> 今日更新 | 新增内容: 306 篇 | 生成时间: 2026-09-25 23:17 UTC

数据来源:
- Anthropic: [anthropic.com](https://www.anthropic.com) — 新增 2 篇（sitemap 共 449 条）
- OpenAI: [openai.com](https://openai.com) — 新增 304 篇（sitemap 共 1035 条）

---

# AI 官方内容追踪报告
**日期：2026-09-26（覆盖 2026-09-24/25 增量）**

---

## 一、今日速览

1. **Anthropic 发布两篇重磅研究**：一是 Claude 在 N=4 超对称杨-米尔斯理论中完成“九圈振幅”计算——这是外部物理学家发起的挑战被模型攻克，直接回应了“LLM 能力见顶论”；二是 Project Swap，用微型“Claude 交易市场”实验代理替人类议价的效果，延续 Project Deal 的多智能体经济学研究线。
2. **OpenAI 侧出现大规模抓取噪音**：约 304 条“新增”绝大多数为旧页面（GPT-4、DALL·E 2/3、Sora、Model Spec 历史版本、Disrupting Malicious Uses 系列等）被重新索引，且正文均无法提取。真正的增量信号需从去重后的标题集合中甄别。
3. 从标题可辨识的 OpenAI 近期主线包括：**GPT-6 Astra 及 Sol/Luna 双模型、GPT-5.5/5.6 系列迭代、ChatGPT 广告（Ads）与欧洲扩张、ChatGpt Health / B2B Signals 等垂直产品、以及生物防务（Rosalind Biodefense）等前沿部署**——显示 OpenAI 正全力推进商业化与垂直行业渗透。
4. 两大实验室同日在“**AI 做前沿科学**”赛道发声（Claude 九圈振幅 vs OpenAI 的理论物理新结果、Navier-Stokes 解、蛋白质合成降本），前沿科学能力正成为新的竞争力展示场。

---

## 二、Anthropic / Claude 内容精选

### Research

**1. 《Yes, Claude can do Nine Loops》— Claude 完成 N=4 SYM 九圈振幅计算**
- 发布：2026-09-25 | https://www.anthropic.com/research/yes-claude-can-do-nine-loops
- 理论物理学家、科普作家 Matt von Hippel（4gravitons.com 博主）此前向各 AI 公司发起挑战，要求解决其原研究领域的一个高难度振幅问题——一个月内即被 Claude 攻克，且达到九圈阶（nine-loop）精度。
- 文章以“客座视角”呈现，刻意引用“超级智能将至”与“LLM 已到天花板”两派专家的分歧，再以实测结果回应——这是 Anthropic 精心设计的叙事：**用领域专家的第三方背书证明前沿推理能力**，而非自夸 benchmark。
- 战略意义：直接对标 OpenAI 同期密集发布的“AI 做数学/物理”内容（见下文），争夺“AI 加速科学”的叙事主导权。

**2. 《Project Swap: What happens when agents trade for us?》**
- 发布：2026-09-24 | https://www.anthropic.com/research/project-swap
- Project Deal 的续作：六个办公室的员工各带一本书，与 Claude 短聊 5 分钟形成偏好画像后，派出 Claude 代理进入“交易大厅”互相推销、议价、成交。5 分钟对话后，代理的书籍偏好排序与本人匹配度达 61%。
- 核心发现：代理交易技巧本身没问题，市场失效主要源于**代理掌握的委托人信息不足**；模型能力（而非提示词指令）是决定谈判结果的最大变量——更强的模型形成更高效的市场。
- 战略意义：这是“AI 代理经济学”的系统性实验研究，为未来 agent-to-agent 商务、代理市场设计（以及相应的安全/市场操纵政策）积累实证基础。Anthropic 延续了其“用受控社会实验研究 agent 社会”的独特研究风格。

---

## 三、OpenAI 内容精选

> ⚠️ 数据质量说明：本次 OpenAI 增量含大量重复与历史页面重抓（如 GPT-4、DALL·E、一致性模型、Model Spec 历版、全部 "Disrupting Malicious Uses" 系列），且正文抓取失败。以下按主题去重整理，标注“疑似回溯索引”，真正的当日新内容需谨慎对待。

### Release / 产品（近期主线，疑似回溯为主）

- **GPT-6 Astra 及其体系**
  - [GPT-6 Astra](https://openai.com/index/gpt-6-astra/)、[Introducing GPT-6 Sol and Luna](https://openai.com/index/introducing-gpt-6-sol-and-luna/)、[Safety Overview: GPT-6 Astra](https://openai.com/index/safety-overview-gpt-6-astra/)、[Path to Astra](https://openai.com/index/path-to-astra/)、[GPT-6 Astra: Next Generation Work](https://openai.com/index/gpt-6-astra-next-generation-work/)
  - "Astra"作为 GPT-6 旗舰，配套 Sol/Luna（疑似快慢双形态）与完整 system card 体系，Airbnb 等头部客户案例同步发布。
- **GPT-5.5 / 5.6 高频迭代**：[Introducing GPT-5.5](https://openai.com/index/introducing-gpt-5-5/)、[GPT-5.6](https://openai.com/index/gpt-5-6/)、[GPT-5.6 Frontier Intelligence Efficiency](https://openai.com/index/gpt-5-6-frontier-intelligence-efficiency/)、[Advancing the Price Performance Frontier with GPT-5.6](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/)、[GPT-5.4 Mini and Nano](https://openai.com/index/introducing-gpt-5-4-mini-and-nano/)——小数点版本密集更新 + 明确主打“性价比/效率”，显示 API 价格战与成本曲线是发布核心。
- **商业化与广告**：[Testing Ads in ChatGPT](https://openai.com/index/testing-ads-in-chatgpt/)、[Our Approach to Advertising and Expanding Access](https://openai.com/index/our-approach-to-advertising-and-expanding-access/)、[ChatGPT Ads Expands Across Europe](https://openai.com/index/chatgpt-ads-expands-across-europe/)、[Expanding Access to AI with ChatGPT Ads](https://openai.com/index/expanding-access-to-ai-with-chatgpt-ads/)——广告从测试到欧洲全量，“免费换广告”的规模化变现路径已成型。
- **垂直行业产品矩阵**：[Introducing ChatGPT Health](https://openai.com/index/introducing-chatgpt-health/)（含健康档案接入）、[ChatGPT Financial Services](https://openai.com/index/introducing-chatgpt-financial-services/)、[Astra for Law](https://openai.com/index/astra-for-law/)、[Introducing B2B Signals](https://openai.com/index/introducing-b2b-signals/)、[Personal Finance ChatGPT](https://openai.com/index/personal-finance-chatgpt/)——健康、金融、法律三大高价值行业全布局。
- **多模态与交互**：[Introducing GPT Live](https://openai.com/index/introducing-gpt-live/)（连续语音交互）及 [GPT Live 1 in the API](https://openai.com/index/introducing-gpt-live-1-in-the-api/)、[ChatGPT Images 2.0 / 2.5](https://openai.com/index/introducing-chatgpt-images-2-0/)、[Previewing Ultrafast](https://openai.com/index/previewing-ultrafast/)。
- **Agent 基础设施**：[Introducing the Agents API](https://openai.com/index/introducing-the-agents-api/)、[How Agents Are Transforming Work](https://openai.com/index/how-agents-are-transforming-work/)。

### Research / 前沿科学

- [New Result: Theoretical Physics](https://openai.com/index/new-result-theoretical-physics/)、[Extending Single-Minus Amplitudes to Gravitons](https://openai.com/index/extending-single-minus-amplitudes-to-gravitons/)——振幅理论方向，**与 Anthropic 九圈振幅一文正面撞车，疑似同一挑战（von Hippel challenge）语境下的竞争性发布**。
- [Navier-Stokes Solution](https://openai.com/index/navier-stokes-solution/)、[Model Disproves Discrete Geometry Conjecture](https://openai.com/index/model-disproves-discrete-geometry-conjecture/)、[Ten Advances in Mathematics](https://openai.com/index/ten-advances-in-mathematics/)、[First Proof Submissions](https://openai.com/index/first-proof-submissions/)——数学/物理证明能力系列展示。
- [GPT-5 Lowers Protein Synthesis Cost](https://openai.com/index/gpt-5-lowers-protein-synthesis-cost/)、[Introducing LifeSciBench](https://openai.com/index/introducing-life-sci-bench/)、[Introducing GeneBench Pro](https://openai.com/index/introducing-genebench-pro/)——生命科学垂直 benchmark 与实际降本证据。
- [How Two Settings Tripled Our ARC-AGI 3 Scores](https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores/)、[What Parameter Golf Taught Us](https://openai.com/index/what-parameter-golf-taught-us/)——推理效率/测试时计算调优的工程洞察。
- [Scaling Social Science Research](https://openai.com/index/scaling-social-science-research/)、[Introducing the OpenAI Economic Research Exchange](https://openai.com/index/introducing-the-openai-economic-research-exchange/)——与 Anthropic 的 agent 经济学实验形成对照，但 OpenAI 走“资助外部研究”路线。

### Safety / 治理

- [Model Misalignment Reporting Framework](https://openai.com/index/model-misalignment-reporting-framework/)、[How We Monitor Internal Coding Agents Misalignment](https://openai.com/index/how-we-monitor-internal-coding-agents-misalignment/)、[How Confessions Can Keep Language Models Honest](https://openai.com/index/how-confessions-can-keep-language-models-honest/)、[Reasoning Models Chain-of-Thought Controllability](https://openai.com/index/reasoning-models-chain-of-thought-controllability/)——对齐监测体系化。
- 网络安全方向密集：[Trusted Access for Cyber](https://openai.com/index/trusted-access-for-cyber/)、[Codex Security](https://openai.com/index/codex-security-now-in-research-preview/)、[Expanding Daybreak](https://openai.com/index/expanding-daybreak-as-the-cyber-defense-window-narrows/)、[Pacing Model Development Cyber Capabilities](https://openai.com/index/pacing-model-development-cyber-capabilities/)——"cyber defense window narrows"措辞值得注意，暗示 offensive-defensive差距在缩小。
- 青少年安全与年龄预测系列（[Parental Controls](https://openai.com/index/introducing-parental-controls/)、[ChatGPT for Teens](https://openai.com/index/chatgpt-for-teens/)、[Age Prediction](https://openai.com/index/our-approach-to-age-prediction/)）——未成年人市场扩张前的合规铺垫。
- **敏感事件响应**：[Our Response to the Tanstack NPM Supply Chain Attack](https://openai.com/index/our-response-to-the-tanstack-npm-supply-chain-attack/)、[Hugging Face Incident and the Road Ahead](https://openai.com/index/hugging-face-incident-and-the-road-ahead/)、[Our Decision on Cursor Following Its Acquisition by SpaceX](https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/)——罕见地公开卷入生态安全事件与供应商地缘决策。

### Company / 生态

- [Update on the OpenAI Foundation](https://openai.com/index/update-on-the-openai-foundation/) + [Paul Christiano Joins OpenAI Foundation Board](https://openai.com/index/paul-christiano-joins-openai-foundation-board/)——Christiano（前对齐负责人）回归董事会是重要治理信号。
- 国际扩张：[Expanding Our Presence in Brazil](https://openai.com/index/expanding-our-presence-in-brazil/)、[Supporting Next Generation AI Startups Thailand](https://openai.com/index/supporting-next-generation-ai-startups-thailand/)。
- [The Full Stack Behind Abundant Intelligence](https://openai.com/index/the-full-stack-behind-abundant-intelligence/)、[Scaling Storage One Billion Users](https://openai.com/index/scaling-storage-one-billion-users-part-one/)——"abundant intelligence" 是 OpenAI 的新叙事关键词，"十亿用户"级别的基建披露。

---

## 四、战略信号解读

**Anthropic：能力证明 × 社会实验的双线叙事。** 今日两篇内容都不是产品发布，而是“证明类”内容：一篇借第三方专家之口证明前沿科学推理（反驳“天花板论”），一篇用受控实验回答“agent 进入市场会怎样”这一政策级问题。Anthropic 明显在为 agent 经济时代积累**规范性话语权**——不只说“我们能做”，而是“我们理解它对社会意味着什么”。

**OpenAI：全速商业化 + 前沿科学双引擎。** 去重后的标题集合清晰显示三条主线：(1) 模型版本高频小步迭代并主打价格性能比（GPT-5.x 连发）；(2) 变现渠道多元化（广告欧洲扩张、健康/金融/法律垂直产品）；(3) 前沿科学成果作为品牌势能（振幅、Navier-Stokes、蛋白质）。两者相辅相成：科学叙事撑溢价，效率叙事抢 API 份额。

**竞争态势：** 最尖锐的对撞点在**振幅理论物理**——Claude 完成九圈 N=4 SYM 计算与 OpenAI 的 "New Result: Theoretical Physics / Gravitons" 几乎同期，很可能源自同一外部挑战，双方各自宣布“第一个解决”，这是典型的 benchmark 竞争升级到“真人出题”阶段。此外，Anthropic 的 Project Swap（自己动手做实验）与 OpenAI 的 Economic Research Exchange（资助外部研究）代表了两种研究生态打法。

**对开发者/企业的影响：** OpenAI 的 GPT-5.x 效率叙事 + Agents API + 零数据保留（[Zero Data Retention for Frontier Models](https://openai.com/index/offering-zero-data-retention-for-frontier-models/)）明显瞄准企业合规采购；Anthropic 则以安全性研究与 agent 行为实证差异化。企业选型正从“模型能力”转向“agent 治理与可解释性”。

---

## 五、值得关注的细节

1. **"Defense window narrows" 的安全措辞**：OpenAI 网络安全系列标题暗示前沿模型的攻防不对称正在恶化，配合 "Trusted Access"（受信访问分级）机制，预示网络能力发布将走向类似生物安全的分级管控。
2. **供应商地缘政治进入产品决策**：Cursor 被 SpaceX 收购后 OpenAI 公开表态（链接见上），加上 Hugging Face 事件、TanStack 供应链攻击响应——AI 巨头开始公开执行“生态阵营”切割。
3. **Paul Christiano 入职 OpenAI Foundation 董事会**：曾因对齐分歧离开 OpenAI 的核心人物回归治理架构，结合 Foundation 更新，暗示治理结构可能有重大调整。
4. **"Abundant Intelligence" 成为 OpenAI 新纲领词**（Build/Full Stack 两篇），取代此前的 AGI 叙事——从“追求智能”转向“智能过剩/普惠”，与广告变现策略语义自洽。
5. **Anthropic 的“市场实验三部曲”成型**（Project Deal → Project Swap → ?）：按此节奏，下一步可能出现更大规模的 agent 市场或真实货币实验，值得政策研究者提前关注。
6. **数据质量警告**：本次 OpenAI 304 条增量中正文全部抓取失败且重复率极高，建议排查爬虫的 canonical URL / 去重逻辑（sitemap 全量重抓疑似为主因），否则会污染后续趋势分析。

---

*本报告基于官网公开内容，OpenAI 部分因正文缺失，标题级推断请在决策前以原文核实。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*