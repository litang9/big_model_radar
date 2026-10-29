# AI 官方内容追踪报告 2026-10-29

> 今日更新 | 新增内容: 392 篇 | 生成时间: 2026-10-28 23:59 UTC

数据来源:
- Anthropic: [anthropic.com](https://www.anthropic.com) — 新增 4 篇（sitemap 共 491 条）
- OpenAI: [openai.com](https://openai.com) — 新增 388 篇（sitemap 共 1091 条）

---

# AI 官方内容追踪报告 · 2026-10-29

---

## 1. 今日速览

- **Anthropic 重磅发布两条“前沿能力实证”研究**：未发布内部研究模型在 Chrome/Safari/Android/Windows/Linux 上构造出 5 条真实关键漏洞攻击链，以及生命科学团队联合六家药企推进 AI 制药——这是 Anthropic 首次系统性展示其模型在**网络攻防**与**药物研发**两大高价值垂直领域的端到端能力。
- **Anthropic 明确宣布“自主药物研发”路线**：不仅与 BigHat、BMS、Enveda、Generate 等合作，还“开始了自己的药物发现工作”，并计划大幅扩展——信号极强，标志其从模型公司向“AI 驱动的科学机构”演进。
- **OpenAI 侧数据异常**：今日抓取的 388 篇“增量”绝大多数为**全站索引回填**（无正文、且含大量 2024–2025 历史文章），真正当日（10-27/28）有效新增约十余篇，核心集中在 **Codex 商业化**（Teams 弹性定价、安全产品、不含 SAST 的技术立场）与**安全治理**（MentalHealthBench、恶意使用打击系列、Instruction Hierarchy Challenge）。
- **两大安全叙事同日对撞**：Anthropic 展示“模型找漏洞”，OpenAI 发布《Disrupting Malicious Uses of AI》系列（打击诈骗/威胁行为者）与《Why Codex Security Doesn't Include SAST》——双方都在争夺“负责任的安全领导者”话语权，但切入点截然不同。

---

## 2. Anthropic / Claude 内容精选

### Research（4 篇）

**① [Early progress on accelerating drug development with Claude](https://www.anthropic.com/research/early-progress-drug-development)**（2026-10-27，Team Science）
- 与六家组织（BigHat Biosciences、Bristol Myers Squibb、Divergence Labs、Enveda、Generate Biomedicules、The Column Group）开展深度研发合作，覆盖靶点发现、分子设计、可制造性优化、监管文件起草、临床试验设计等**全流程**。
- 关键表态：Anthropic 已“开始自己的药物发现工作”，并“计划从这里大幅扩展”——这是从合作方向自主研发的关键转折。
- 战略框架值得注意：强调“瓶颈是分布式 的，没有单一问题要解决”，暗示其押注的是**通用长程 agent 能力**而非专用分子模型（与 Isomorphic Labs / DeepMind 路线形成差异）。

**② [Discovering and exploiting vulnerabilities in critical, real-world software with Claude](https://www.anthropic.com/research/discovering-vulnerabilities-with-claude)**（2026-10-27，Frontier Red Team）
- 用未发布内部研究模型在 Chrome、Safari、Android、Windows、Linux 上构造 5 条攻击链，含一键 RCE、零点击 RCE、锁屏绕过等，展示**多步复杂利用链**的自主构造能力。
- 全部按协调披露流程上报（90 天修补期 + 45 天宽限期），定位为“模型网络能力的风向标测试”。
- 深层信号：未发布模型已具备此类能力——既是前沿能力广告，也是对监管界“我们先行自测”的姿态展示；与 OpenAI 的《Pacing Model Development Cyber Capabilities》《Trusted Access for Cyber》形成直接对话。

**③ [Coding agents in the social sciences](https://www.anthropic.com/research/coding-agents-social-sciences)**（原文 2026-05-27，今日更新收录，Societal Impacts）
- 1,260 名社会科学家调查显示：81% 试过 AI 聊天，但仅 20% 采用 coding agent；使用率存在显著性别与院校层级差距。
- 战略意义：为 Claude Code 的学术市场渗透提供实证依据，同时坦承“产出更多工作论文但期刊投稿未增”，是少见的克制结论。

**④ [Claude discovers a novel enzyme system](https://www.anthropic.com/research/claude-discovers-novel-enzyme-system)**（原文 2026-09-23，今日更新收录）
- 正式介绍 Anthropic **生命科学研究组与自营实验室**：Claude 在仅获高层指引下发现了具 CRISPR 样重复序列的新型酶系统（ART）。
- 与①联动看：这是“自营实验室 + 湿实验验证”模式的首个公开成果，呼应 10-20 的蝎毒神经毒素蛋白结合物设计，构成完整的“AI 发现 → 实验 → 应用”叙事。

---

## 3. OpenAI 内容精选

> 说明：今日抓取的 OpenAI 侧绝大多数条目为无正文的历史索引回填（去重后约 200+ 条，时间跨度 2023–2026），以下仅整理可确认为 10-27/28 有效新增或具分析价值的内容。

### 产品 / Release

- **[Codex Flexible Pricing For Teams](https://openai.com/index/codex-flexible-pricing-for-teams/)**（10-28）：Codex 面向团队推出弹性计价，延续近期“Codex for Every Role / Scaling Codex to Enterprises / Codex App”的密集节奏，表明**agentic coding 已进入商业化深水区**，价格战开打。
- **[Introducing Dots](https://openai.com/index/introducing-dots/)**（10-28）：新产品，命名刻意模糊，值得后续追踪正文。
- **[Better Prompt Caching For GPT 6](https://openai.com/index/better-prompt-caching-for-gpt-6/)**（10-28）：GPT-6 缓存降价/提速，是长上下文 agent 经济性的基础设施优化，直接对打 Claude 的 prompt caching 优势。
- **[Oracle Apps In Chatgpt](https://openai.com/index/oracle-apps-in-chatgpt/) / [ServiceNow Partnership Expansion](https://openai.com/index/openai-servicenow-partnership-expansion/)**（10-28）：企业应用生态持续扩张，ChatGPT 正在变成企业工作流的聚合入口。
- **[Chatgpt Ads Expands 26 New Countries](https://openai.com/index/chatgpt-ads-expands-26-new-countries/)**（10-28）：广告业务全球化提速，配合 “Our Approach to Advertising” 系列，商业化第二曲线成形。

### 安全 / 治理

- **[Introducing Mentalhealthbench](https://openai.com/index/introducing-mentalhealthbench/)**（10-28）：继 Healthbench / LifeSciBench 之后的垂直评测基准，暗示 OpenAI 在心理健康应用上的产品化意图（另有 "Update on Mental Health Related Work" 呼应）。
- **《Disrupting Malicious Uses of AI》系列**（10-28，[总览](https://openai.com/index/disrupting-malicious-uses-of-ai/) + 十余篇子案例：romance scam、bet bot、cyber threat actors、false witness 等）：罕见的**单日十余篇**密集发布，显然是针对全球诈骗/滥用治理的集中公关行动，很可能回应近期的滥用舆情或监管压力。
- **[Instruction Hierarchy Challenge](https://openai.com/index/instruction-hierarchy-challenge/)（×2）**（10-28）：指令层级攻防挑战赛，与 Anthropic 的漏洞研究同日出现，安全议题正面交锋。
- **[Why Codex Security Doesnt Include Sast](https://openai.com/index/why-codex-security-doesnt-include-sast/)**（10-28）：技术立场文，为 Codex Security 产品边界辩护——正值 [Codex Security Now In Research Preview] 之后的舆论消化期。
- **[Model Misalignment Reporting Framework](https://openai.com/index/model-misalignment-reporting-framework/) / [Securing Our Frontier Model Training Environment](https://openai.com/index/securing-our-frontier-model-training-environment/)**：治理与基础设施安全披露。

### 值得留意的回填信号（历史但今日入库）

索引回填中可见 OpenAI 过去一年的关键轨迹：**GPT-6 Astra 系列**（GPT-6 / Safety Overview / Airbnb 案例 / Astra for Law / Path to Astra）、**收购潮**（Astral、Promptfoo、Rockset、Orchestra Bio、TBPN）、**IPO 准备（[Confidential S-1](https://openai.com/index/openai-submits-confidential-s-1/)）、自研芯片（Broadcom Jalapeño）与多云分发（AWS、Oracle、Google Cloud）**。回填本身无新信息，但为构建 OpenAI 全景时间线提供了完整素材。

---

## 4. 战略信号解读

**技术优先级对比**
- **Anthropic**：今日发布几乎全部押注“**前沿能力实证 + 科学自营**”——漏洞研究证明模型上限，药物研发+自营实验室证明商业落地深度。其策略是用“Claude 能做成真事”的具体案例替代抽象 benchmark 营销。
- **OpenAI**：节奏明显偏向“**商业化 + 合规防御**”——Codex 定价、广告扩国、企业应用生态是进攻面；恶意使用打击系列、青少年保护、年龄预测是防御面。这与其 S-1 递交、上市前窗口期高度吻合：**营收增长与监管风险管理双线并进**。

**议题引领与跟进**
- 网络安全：Anthropic 引领（真实漏洞链），OpenAI 跟进（Trusted Access for Cyber、Pacing Cyber Capabilities）。
- 生命科学：罕见地**双方同时重仓**——Anthropic 自营实验室 vs OpenAI 收购 Orchestra Bio + Rosalind Biodefense + LifeSciBench，这是 2026 下半年最值得跟踪的对撞赛道。
- 企业分发：OpenAI 引领（多云、Oracle/ServiceNow/Samsung 等），Anthropic 未在此层竞争。

**对开发者/企业的影响**
- Prompt caching 竞争与 Codex 弹性定价 → agent 运行成本进入快速下降通道，长会话 agent 的单位经济性改善。
- Anthropic 的“全流程药物研发”叙事 → 生命科学企业选型时将面临“深度共创伙伴 vs 水平平台”的路线选择。

---

## 5. 值得关注的细节

1. **“未发布内部研究模型”** —— Anthropic 漏洞文的措辞，暗示下一代模型安全评测前置，也为后续发布铺垫能力预期。
2. **OpenAI 单日十余篇 "Disrupting Malicious Uses" 子案例** —— 异常密集，典型的危机响应式发布，建议排查同期是否有负面报道或国会听证。
3. **《Apple Is Getting This Wrong》** —— OpenAI 罕见直接点名批评合作伙伴/对手，结合索引中的 "Openai And Apple Announce Partnership"，双方关系可能出现裂痕，值得追踪。
4. **"Introducing Dots" 语义晦涩** —— 无正文的神秘发布，可能是新产品线（社交/协作？）的软启动。
5. **抓取管道信号**：OpenAI 侧 388 条“增量”中大量重复与历史回填，提示站点结构变更或爬虫去重策略需修复；分析时应以 Anthropic 的 4 篇增量可信度最高。
6. **Anthropic 首次明确 "begun drug discovery efforts of our own"** —— 从“模型供应商”到“研发主体”的身份跃迁，潜在的利益冲突与商业模式问题（药企合作伙伴 vs 竞争者）将在后续显现。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*