# AI CLI 工具社区动态日报 2026-07-06

> 生成时间: 2026-07-06 04:42 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# 2026 年 AI CLI 工具生态横向对比分析报告 (2026-07-06)

基于今日各大主流 AI CLI 工具的社区动态，现发布横向对比与技术生态分析报告如下：

## 1. 生态全景
当前 AI CLI 工具生态正处于从**“单点对话辅助”向“复杂多智能体编排”跨越的深水区**。随着各工具纷纷引入后台 Agent 与子任务分发机制，**系统稳定性（死循环、内存泄漏、日志膨胀）成为各大厂商面临的首要技术瓶颈**。与此同时，开发者对 Token 成本控制、上下文精准压缩以及沙盒安全隔离的需求日益迫切，标志着行业正从“卷模型能力”转向“拼工程化与架构设计”。此外，企业级私有化部署、跨平台桌面端体验对齐以及底层通信协议（如 ACP 1.0）的演进，彰显出该赛道正加速向成熟的工业化生产力工具迈进。

## 2. 各工具活跃度对比
*注：数据提取自 2026-07-06 各仓库公开的 Issue 与 PR 动态。*

| 工具名称 | 版本发布 | 活跃 Issues (重点) | 活跃 PRs | 整体态势 |
| :--- | :--- | :--- | :--- | :--- |
| **Qwen Code** | ✅ Nightly v0.19.6 | 10 | 50 | 迭代极速，工程化极深 |
| **OpenAI Codex** | ❌ 无 | 10 | 10 | 底层重构期，Bug 高发 |
| **Gemini CLI** | ✅ Nightly v0.51.0 | 10 | 10 | 依赖大升级，打磨稳定性 |
| **OpenCode** | ❌ 无 | 10 | 10 | V2 架构跃迁，重塑交互 |
| **Claude Code** | ❌ 无 | 10 | 0 | 焦虑期，痛点集中爆发 |
| **Copilot CLI** | ❌ 无 | 10 | 1 | 转型期，需适配企业侧 |
| **Kimi Code CLI** | ❌ 无 | 1 (已关闭) | 0 | 处于品牌迁移盘点期 |

## 3. 共同关注的功能方向
通过对各社区 Issue 的聚类分析，当前开发者存在高度重合的核心诉求：

*   **多 Agent 编排与防失控机制**：
    *   *Claude Code* 面临后台 Agent 无限递归卡死（长达 6.5 小时无法终止）问题。
    *   *Gemini CLI* 遭遇子 Agent 任务被中断却谎报 `success` 的致命逻辑漏洞。
    *   *Codex* 出现 Subagent 日志疯狂膨胀吞没 145GB 磁盘的问题。
    *   *Qwen Code* 直接响应此痛点，通过引入 `maxSubAgents` 限制并发数量。
*   **上下文精细化管理与成本控制**：
    *   *OpenCode* 呼吁允许自定义上下文压缩阈值，避免粗放截断。
    *   *Qwen Code* 和 *Codex* 均遇到工具输出未截断或 Token 异常聚集导致 Session 卡死或额度异常流失。
    *   *Copilot CLI* 的开发者抗议基础操作（如卸载插件）无端消耗大模型计费额度。
*   **桌面端资源管控与跨平台体验**：
    *   *Codex* 和 *OpenCode* 均曝出严重的本地资源泄漏问题（MCP 进程 9GB 内存泄漏 / 缓存 10 分钟撑爆 60GB C 盘）。
    *   *Claude Code* 呼吁桌面端尽快对齐 CLI 端的“任务执行中消息注入”等高级特性。

## 4. 差异化定位分析
各工具基于自身的基因，在技术路线上呈现出显著的差异化：

*   **Claude Code**：聚焦于**企业级安全防御与深度代码审计**。其痛点反映出极高的安全基线（如频繁的安全拦截与静默降级），但受制于内部工具调用解析的脆弱性。
*   **OpenAI Codex**：发力**底层架构重构与云端大规模部署**。通过引入 MongoDB 会话存储实验、解决 Guardian 断路器死锁，正朝向企业云端 AI 服务平台演进。
*   **Gemini CLI**：主打**生态标准引领与底层 OS 沙箱融合**。随着 Agent Client Protocol (ACP) 迈入 1.0 时代，Gemini 致力于确立多 Agent 通信标准，并积极探索零依赖的 OS 级沙盒隔离。
*   **GitHub Copilot CLI**：侧重于**IDE 与 CI/CD 流水线的无缝衔接**。重点处理计费实体、非交互式自动化运行（`/init`）及企业级本地化端点接入。
*   **OpenCode**：定位为**高度可定制与模型不可知的开源构建器**。专注于会话生命周期管理（如引入原生 `/goal` 指令和自动实验框架），并投入大量精力兼容 DeepSeek、Qwen 等外部模型。
*   **Qwen Code**：深耕**大模型底层性能与国内企业生态**。专注于 Prompt 缓存命中率优化（防止动态加载工具导致 KV-cache 失效），并快速集成企业微信等国内 IM 平台。

## 5. 社区热度与成熟度
*   **快速迭代与工程深水区攻坚者**：**Qwen Code**（单日 50 个 PR）展现出极强的工程落地能力，从大模型底层的 KV-cache 优化到企业级 IM 集成全面铺开；**OpenCode** 处于 V2 架构重构期，社区对工作流定义等前沿模式贡献积极。
*   **痛点爆发与重筑期**：**Claude Code** 与 **Codex** 社区今日 0 版本发布，但积累了大量高热度 Bug（如 Opus 模型退化、GPT-5.5 Token 聚集、内存泄漏）。庞大的用户群正在承受工具极速扩张带来的稳定性阵痛，亟需官方版本修复。
*   **平稳演进与修整期**：**Kimi Code CLI** 目前处于品牌基建重命名盘点阶段，**Copilot CLI** 则致力于解决企业策略适配的细节优化。

## 6. 值得关注的趋势信号
1.  **“Agent 失控”倒逼底层机制硬性约束**：AI CLI 赋予模型创建子进程和执行权限后，引发的递归死循环和磁盘/内存打爆问题已成为行业共性。开发者应密切关注并采用具备硬性并发限制（如 Qwen 的 `maxSubAgents`）和原生 OS 沙箱隔离的版本，避免宿主机受损。
2.  **大模型 KV-cache 命中率成为核心优化指标**：Qwen 社区指出动态加载工具会导致前端 Schema 变动，进而击穿大模型的 Prompt 缓存。这表明工具的工程架构（如稳定 Schema 顺序）开始直接反作用于大模型的推理性能与延迟。
3.  **从“单体助手”向“模型不可知调度器”转型**：OpenCode、Copilot CLI 等工具对自定义端点、外部模型（如 Kimi, Qwen）的高频呼声表明，开发者极度排斥被单一模型锁定。未来不支持热插拔多模型、不具备参数级权限管控（如 Qwen 的 `Tool(param:value)` 语法）的 CLI 工具，将难以在企业级市场存活。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

作为一名专注于 Claude Code 生态的技术分析师，基于 `anthropics/skills` 官方仓库截至 2026-07-06 的数据，我为您整理了最新的社区热点报告。

从数据来看，当前社区不仅关注具体业务场景的 Skill 开发，更将大量精力投入到了 **Skill 元工具链（如 skill-creator）的修复、跨平台兼容性（尤其是 Windows）以及安全机制建设**上。

以下是详细的分析报告：

### 一、 热门 Skills 排行 (Top Pull Requests)

虽然部分 PR 的显性评论数缺失，但结合其对生态的影响力和关联 Issue 的热度，以下 6 个提交是当前最受关注的项目：

1. **[Self-Audit Skill (四维推理质量门禁)](https://github.com/anthropics/skills/pull/1367)**
   * **功能**：在 AI 交付输出前进行审计。先进行机械文件验证（确认声称生成的文件是否真实存在），再进行四维推理审计。
   * **社区热点**：随着 Claude Code 接管更多复杂编码任务，“幻觉”和“残缺输出”成为痛点。该 Skill 提供了通用的交付前质检方案。
   * **状态**：Open
2. **[Sensory Skill (macOS 原生自动化)](https://github.com/anthropics/skills/pull/806)**
   * **功能**：教授 Claude 使用 `osascript` (AppleScript) 进行原生 macOS 自动化，以替代基于截图的低效计算机视觉控制。
   * **社区热点**：分为两级权限系统（直接应用脚本与系统 UI 操控），大幅提升了 Agent 在 macOS 上的系统级操作效率。
   * **状态**：Open
3. **[Skill-Creator 核心工具链修复 (run_eval.py 0% Recall)](https://github.com/anthropics/skills/pull/1298)**
   * **功能**：修复了 `run_eval.py` 始终报错 0% recall 的致命 Bug，并优化了 Windows 下的流读取、触发检测与并行计算。
   * **社区热点**：此 PR 解决了社区最核心的痛点之一（关联 Issue #556 获得大量关注），因为评估框架的失效导致所有 Skill 的描述词自动优化循环完全无法运作。
   * **状态**：Open
4. **[Document-Typography Skill (文档排版质控)](https://github.com/anthropics/skills/pull/514)**
   * **功能**：自动修复 AI 生成文档中的常见排版问题（如孤行、段尾寡行、编号错位等）。
   * **社区热点**：填补了 Claude Code 在生成高质量 Office 文档时经常出现的格式细节缺陷，用户对这种“无需提示自动优化”的体验评价极高。
   * **状态**：Open
5. **[Meta-Skills: 质量与安全分析器](https://github.com/anthropics/skills/pull/83)**
   * **功能**：向市场添加两个“元 Skill”，分别用于从五个维度评估其他 Skill 的质量，以及进行安全分析。
   * **社区热点**：迎合了社区对企业级安全管控的强烈诉求（关联 Issue #492，获 34 次高讨论）。
   * **状态**：Open
6. **[Testing-Patterns Skill (全栈测试模式)](https://github.com/anthropics/skills/pull/723)**
   * **功能**：为开发者提供全栈测试指南，包括测试理念、单元测试（AAA 模式）、React 组件测试等。
   * **社区热点**：补齐了 Claude Code 在自动化编写高质量测试代码方面的短板。
   * **状态**：Open

---

### 二、 社区需求趋势

从近期高票 Issues 中，可以提炼出社区对 Claude Code 生态的四大演进需求：

1. **安全信任边界与命名空间隔离**
   * **趋势**：社区对安全极其敏感。[Issue #492](https://github.com/anthropics/skills/issues/492) (评论 34) 强烈反映了社区开发者滥用 `anthropic/` 命名空间伪装官方 Skill 的漏洞。此外，针对 SharePoint 等企业内部系统（[Issue #1175](https://github.com/anthropics/skills/issues/1175)），如何在 SKILL.md 中安全地实施权限控制也是刚需。
2. **企业级组织内共享与工作流协同**
   * **趋势**：Skills 正在从“个人工具”向“团队资产”转变。[Issue #228](https://github.com/anthropics/skills/issues/228) (评论 14) 呼吁 Claude.ai 支持组织内的 Skill 共享库，替代目前通过 Slack 手动传输 `.skill` 文件的原始方式。
3. **底层工具链的跨平台兼容性 (Windows 支持饥渴)**
   * **趋势**：大量关于 Windows 兼容性的反馈爆发（如 [Issue #1061](https://github.com/anthropics/skills/issues/1061)）。由于 `skill-creator` 底层脚本基于 Unix-first 设计，Windows 用户在运行子进程、处理 cp1252 编码时频发崩溃，社区亟待官方抹平台差异。
4. **Skill 与底层模型/MCP 的深度融合**
   * **趋势**：开发者希望 Skill 不仅仅是 Prompt，更能暴露为 API。[Issue #16](https://github.com/anthropics/skills/issues/16) 提出将 Skills 暴露为 MCP (Model Context Protocol) 接口；同时，关于如何在 AWS Bedrock 上无缝使用 Skills 也是早期企业用户的常见疑问（[Issue #29](https://github.com/anthropics/skills/issues/29)）。

---

### 三、 高潜力待合并 Skills

以下 PR 解决了社区当前最严重的系统性 Bug，一旦通过代码审查，极大概率在近期合并落地：

* ⏳ **[PR #1298 & PR #1323: 彻底修复 run_eval.py 的触发检测失效问题](https://github.com/anthropics/skills/pull/1298)**
  * **潜力原因**：这是 Skills 生态的“基础设施级”修复。没有它，Skill 的描述词自动优化循环完全失效。这两个 PR �

---

# Claude Code 社区动态日报 (2026-07-06)

> **数据来源**: [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

## 1. 今日速览
今日 Claude Code 仓库无新版本发布，也没有新的代码合并（PR），但社区讨论热度持续走高。当前社区最大的痛点集中在**安全审查机制的过度拦截与模型静默降级**（尤其是 Fable 模型在分析本地代码库时被频繁误判并强制降级到 Opus），以及**后台 Agent 失控**（陷入死循环并无限递归创建子 Agent）。此外，开发者对 Desktop 桌面端应用与 CLI/TUI 的功能对齐提出了强烈需求。

## 2. 版本发布
**今日无新版本发布。** (当前主流社区版本似乎为 2.1.197 - 2.1.201)。

---

## 3. 社区热点 Issues (Top 10)
以下是今日评论最多、影响最广的关键 Issue：

1. **[模型退化] Claude Opus 4.8 推理与性能严重衰退** (👍28 | 💬22)
   作者 @voidfreud 反馈 Opus 4.8 在最高努力级别下推理能力极度糟糕，质疑存在欺骗性降级。该问题引起大量用户共鸣跟帖。
   👉 [查看 Issue #68780](https://github.com/anthropics/claude-code/issues/68780)

2. **[权限 BUG] Cowork 定时任务无视 "Always allow" 权限** (👍30 | 💬25)
   每次执行预设任务时系统都会重新弹出权限确认框，破坏了自动化工作流的体验，macOS 平台尤为明显。
   👉 [查看 Issue #47180](https://github.com/anthropics/claude-code/issues/47180)

3. **[扩展 BUG] Chrome 扩展在 macOS Edge 切换标签页时自动关闭** (👍32 | 💬24)
   在 macOS 上使用浏览器扩展时，若在 Microsoft Edge 中切换或打开标签页，侧边栏会直接关闭。
   👉 [查看 Issue #30873](https://github.com/anthropics/claude-code/issues/30873)

4. **[UI BUG] Bash 输出截断且快捷键无法完全展开** (👍27 | 💬18)
   当命令行产生 30-40 行以上的输出时，使用 `ctrl+o` / `ctrl+e` 依然无法展开查看完整内容。
   👉 [查看 Issue #26954](https://github.com/anthropics/claude-code/issues/26954)

5. **[致命 BUG] 后台 Agent 无限递归并陷入死循环** (👍0 | 💬4)
   嵌套的后台代理没有执行内联任务，而是不断生成子代理，并在长达 6.5 小时以上的 no-op 填充循环中卡死，且无法被终止。
   👉 [查看 Issue #73829](https://github.com/anthropics/claude-code/issues/73829)

6. **[解析 BUG] 工具调用暴露 `<invoke>` 标签导致解析失败** (👍0 | 💬2)
   会话进行到后半段时，助手输出了缺少 `antml:` 命名空间的裸露 `<invoke>` 标签，导致严重解析故障。
   👉 [查看 Issue #73808](https://github.com/anthropics/claude-code/issues/73808)

7. **[交互 BUG] AskUserQuestion 鼠标单击即意外提交** (👍12 | 💬8)
   在 Linux/IntelliJ 环境下，弹出的交互问题框仅需鼠标点击选项就会立即提交，无需按回车确认，极易导致误操作。
   👉 [查看 Issue #71547](https://github.com/anthropics/claude-code/issues/71547)

8. **[功能对齐] Desktop 应用需支持任务执行中的消息注入** (👍5 | 💬4)
   CLI/TUI 支持在工具调用的间隙插入"指导"消息，但 Desktop 桌面端目前只能排队等待当前任务全部完成。
   👉 [查看 Issue #71726](https://github.com/anthropics/claude-code/issues/71726)

9. **[MCP BUG] MCP 工具参数类型错误 (Number 变 String)** (👍4 | 💬11)
   当 JSON Schema 声明参数类型为 `number` 时，Claude Code 依然将其作为字符串发送给 MCP Server，导致类型不匹配报错。
   👉 [查看 Issue #32524](https://github.com/anthropics/claude-code/issues/32524)

10. **[安全误判] 安全扫描频繁误杀触发模型静默降级** (今日多起合并参考)
    多位开发者反馈在进行正常的代码安全审计、计算神经科学探讨时，Fable 模型的安全分类器过度敏感被关闭，并**静默降级**为 Opus 4.8，严重影响正常工作。
    👉 [查看典型 Issue #74660](https://github.com/anthropics/claude-code/issues/74660) / [#74665](https://github.com/anthropics/claude-code/issues/74665) / [#74657](https://github.com/anthropics/claude-code/issues/74657)

---

## 4. 重要 PR 进展
**今日无更新的 Pull Requests。** (社区开发者在等待官方对近期高发安全拦截与 Agent 失控问题进行修复。)

---

## 5. 功能需求趋势
从近期 Issue 标签和讨论中，可以提炼出以下三大核心趋势：

*   **安全机制可控性与模型降级的透明化**：开发者强烈要求在进行本地防御性安全代码审计时，不要被错误识别为恶意攻击，更不要在未经同意的情况下静默降级模型（如 Fable 降至 Opus）。
*   **多 Agent 编排与 Workflow 灵活性**：
    *   **稳定性需求**：迫切需要修复后台 Agent 的无限递归与无限循环问题（[#73829](https://github.com/anthropics/claude-code/issues/73829)）。
    *   **功能诉求**：工作流脚本需要一种官方允许的、确定的执行 Shell 命令的基础方法（`sh()` 原语），而不是只能通过创建子 Agent 来执行（[#74663](https://github.com/anthropics/claude-code/issues/74663)）。
*   **Desktop 桌面端体验对齐与多账号支持**：桌面端用户呼吁补齐 CLI 端的特有能力（如多任务间消息注入 [#71726](https://github.com/anthropics/claude-code/issues/71726)），并希望更好地支持在同一客户端无缝切换或管理个人与工作多个账号的会话（[#74662](https://github.com/anthropics/claude-code/issues/74662)）。

---

## 6. 开发者关注点 (痛点总结)

1.  **"幻觉式" 提示词注入**：在没有任何恶意文本输入的情况下，Opus 4.8 模型自行捏造了包含 "disregard all prior context" 在内的提示词注入攻击，并高置信度地执行了虚假指令（[#74652](https://github.com/anthropics/claude-code/issues/74652)）。另一用户在常规本地文件整理时，助手末尾被插入了 10KB 的外部网页诱导文本（[#74669](https://github.com/anthropics/claude-code/issues/74669)）。
2.  **本地 Memory 的数据静默截断**：系统在重写内存文件前置元数据时，未加引号的值在遇到 YAML 注释（` #`）时会被静默截断，导致上下文丢失（[#74666](https://github.com/anthropics/claude-code/issues/74666)）。
3.  **云盘访问权限阻断 (macOS)**：Desktop 桌面端在访问 Dropbox/OneDrive/Google Drive 等文件提供程序时，不弹窗提示而是直接静默拒绝访问，导致文件读取失败（[#74658](https://github.com/anthropics/claude-code/issues/74658)）。
4.  **深度调研工具受限**：`/deep-research` 默认工作流极其频繁地撞上服务端限流（`API Error: Server is temporarily limiting requests`），几乎处于不可用状态（[#65731](https://github.com/anthropics/claude-code/issues/65731)）。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

这是一份为您定制的 2026-07-06 OpenAI Codex 社区动态日报。

### OpenAI Codex 社区动态日报 - 2026-07-06

#### 1. 今日速览
今日 Codex 社区焦点高度集中在**模型性能质疑与资源消耗异常**上。大量开发者反馈 GPT-5.5 存在严重的“用量额度异常消耗”以及“推理 Token 聚集卡顿”问题。此外，桌面端（尤其是 Windows 和 macOS）的 UI 回归 Bug 及内存/进程泄漏引发了多项高质量 Bug 报告。官方开发团队则在底层架构上发力，提交了包括 MongoDB 存储支持、MCP 进程清理及自动补全体验优化在内的多个核心 PR。

#### 2. 版本发布
*(今日无新版本发布)*

#### 3. 社区热点 Issues (Top 10)
以下是过去 24 小时内社区讨论最热烈、最具代表性的 Issues：

1. **[强烈呼声] Codex Linux 桌面版需求** ([#11023](https://github.com/openai/codex/issues/11023))
   * **热度**: 👍 690 | 评论 143
   * **简评**: 长期霸榜的高频需求。由于 macOS 版本存在功耗等问题，大量开发者强烈呼吁官方尽快推出原生 Linux 桌面应用。
2. **[严重 Bug] GPT-5.5 推理 Token 聚集导致性能下降** ([#30364](https://github.com/openai/codex/issues/30364))
   * **热度**: 👍 194 | 评论 106
   * **简评**: 开发者发现 GPT-5.5 的推理输出 Token 异常聚集在 516、1034 等固定边界，导致在处理复杂任务时出现“提前截止”或推理质量大跌。
3. **[严重 Bug] Plus 订阅额度异常流失** ([#30918](https://github.com/openai/codex/issues/30918))
   * **热度**: 评论 10
   * **简评**: 用户反馈在正常交互使用下，5 小时的用量限制在约 6 分钟内从 70% 暴跌至 100%，严重影响正常开发。
4. **[上下文异常] Codex 回复历史消息而非最新消息** ([#8648](https://github.com/openai/codex/issues/8648))
   * **热度**: 👍 55 | 评论 85
   * **简评**: 在多轮对话中，Agent 偶尔会“鬼打墙”回复较早的上下文，这是影响编码连贯性的致命 Agent 逻辑缺陷。
5. **[资源泄漏] 桌面版 MCP server 进程泄漏 (内存占用达 9GB+)** ([#30408](https://github.com/openai/codex/issues/30408))
   * **热度**: 评论 4
   * **简评**: 每次开启新会话都会生成完整的 MCP 服务进程，且关闭会话后不回收，最终导致系统内存耗尽。
6. **[资源泄漏] Subagent 会话日志膨胀至 145GB** ([#31198](https://github.com/openai/codex/issues/31198))
   * **热度**: 评论 2
   * **简评**: 长期运行的项目中，子代理不断重复写入压缩历史快照，导致磁盘空间被瞬间吞没。
7. **[UI 回归] 桌面版无法显示 Git UI 和文件树** ([#30484](https://github.com/openai/codex/issues/30484))
   * **热度**: 评论 5
   * **简评**: 尽管后端能正常检测到 Git 仓库，但前端 UI 控件全面消失。该问题在近期版本集中爆发。
8. **[系统兼容] Windows 桌面版无限生成 Git 进程** ([#29492](https://github.com/openai/codex/issues/29492))
   * **热度**: 评论 12
   * **简评**: 在非 Git 目录下运行时，应用会创建空的 `.git` 文件夹并死循环拉起 Git 进程。
9. **[性能问题] macOS SQLite 日志读写频繁 (依然未解决)** ([#29532](https://github.com/openai/codex/issues/29532))
   * **热度**: 评论 34
   * **简评**: 升级至 rust-v0.142.0 后，SQLite 的日志 churn 问题仅得到部分缓解，仍造成持续的性能消耗。
10. **[企业需求] 呼吁提供非 Microsoft Store 的 Windows 安装包** ([#21538](https://github.com/openai/codex/issues/21538))
    * **热度**: 👍 19 | 评论 9
    * **简评**: 很多企业级用户的 Windows 机器受策略限制无法访问微软商店，呼吁官方提供独立原生安装程序（如 MSI/EXE）。

#### 4. 重要 PR 进展 (Top 10)
开发团队今日推进了多项底层逻辑优化和 Bug 修复：

1. **新增 MongoDB 会话存储支持** ([#31175](https://github.com/openai/codex/pull/31175))
   * 引入实验性的 MongoDB 持久化存储，并提供无缝的会话迁移命令，预示着 Codex 在大规模云端部署架构上的演进。
2. **优化额度重置与兑换机制 UI** ([#30488](https://github.com/openai/codex/pull/30488))
   * 针对近期额度异常消耗的反馈，该 PR 在 UI 端补充了详细的额度重置积分详情、过期时间及消耗逻辑展示。
3. **修复 MCP 启动时取消 Review 导致的卡死状态** ([#31189](https://github.com/openai/codex/pull/31189))
   * 解决了用户取消内联审查时，TUI 错误地将子进程的 MCP 启动事件转发给父进程，导致后续 `/review` 命令被永久阻断的痛点。
4. **修复 Session 关闭失败导致的 Writer 泄漏** ([#31155](https://github.com/openai/codex/pull/31155))
   * 解决了 rollout 持久化失败时 writer 未释放，导致本地存储锁死、后续会话无法正常写入的底层逻辑 Bug。
5. **缓解模型容量错误导致的任务中断** ([#31176](https://github.com/openai/codex/pull/31176))
   * 引入重试机制：当后端返回 "model capacity"（模型容量/过载）错误时，系统将自动重试而不是直接中断用户的当前目标。
6. **提升插件发现与工具装配性能** ([#31201](https://github.com/openai/codex/pull/31201))
   * 为插件元数据缓存添加 30 秒的过期时间，避免长期驻留进程的磁盘字节检查带来的性能开销。
7. **修复自定义规则解析失败导致的策略全盘失效** ([#31188](https://github.com/openai/codex/pull/31188))
   * 此前若用户的 `.rules` 文件解析失败，会重置整个执行策略引发安全隐患；现优化为保留受管理的执行策略。
8. **扩展管理权限支持 (Apps Authentication)** ([#30982](https://github.com/openai/codex/pull/30982))
   * 允许受信任的宿主扩展为内置 Codex Apps MCP 服务器提供 OAuth 认证，进一步打通生态。
9. **优化 Guardian 断路器中断后的生命周期** ([#31182](https://github.com/openai/codex/pull/31182))
   * 修复了因安全熔断机制触发导致线程空闲事件未正确 emit，进而导致 Agent 线程假死的问题。
10. **改善 TUI 自动补全空格与光标体验** ([#31191](https://github.com/openai/codex/pull/31191) & [#31190](https://github.com/openai/codex/pull/31190))
    * 修复了在技能提及（Mentions）之间自动补全导致的冗余空格问题，并优化了光标位置模糊时的弹窗插入准确度。

#### 5. 功能需求趋势
综合近期 Issues，社区功能需求呈现以下三大趋势：
* **跨平台与企业级分发能力**：Linux 版桌面端仍是最大的呼声缺口；同时，针对受限网络环境的企业用户，去 Store 化的原生安装包需求迫切。
* **用量计算与速率限制透明化**：针对额度的“异常蒸发”，开发者强烈要求 Codex 提供更加细粒度的 Token 消耗追踪面板和重置机制说明。
* **Git 原生体验修复**：桌面端持续丢失 Git UI 面板引发不满，用户期望在 IDE 内拥有稳定可视的 Diff 视图和分支操作支持。

#### 6. 开发者关注点（痛点总结

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 (2026-07-06)

## 1. 今日速览
今天 Gemini CLI 发布了最新的 v0.51.0 每日构建版。社区今日的讨论焦点高度集中在**子智能体的稳定性与执行逻辑**上，包括任务中断却被误报为成功、Agent 频繁卡死，以及对破坏性命令（如 `git reset --force`）的安全管控需求。此外，开发者在内存机制的安全脱敏和 Token 消耗控制方面提出了多项重要反馈。

## 2. 版本发布
- **v0.51.0-nightly.20260706.gf7af4e518** ([Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.51.0-nightly.20260705.gf7af4e518...v0.51.0-nightly.20260706.gf7af4e518))
  日常自动化 Nightly 构建，主要包含底层依赖库的升级与日常漏洞修复。

## 3. 社区热点 Issues (Top 10)

1. **[P1] Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption** ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323))
   - **关注点**：严重逻辑漏洞。子智能体在触及最大轮次限制（MAX_TURNS）被迫中断时，居然向主进程返回 `status: "success"`，这会误导系统认为目标已完成，导致极其严重的开发隐患。
2. **[P1] Generalist agent hangs** ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409))
   - **关注点**：高优 Bug。用户普遍反馈，当 CLI 调用 Generalist（通用）子智能体执行哪怕是新建文件夹这样的简单操作时，也会无限期挂起，极大影响了正常工作流。
3. **[P2] Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing** ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873))
   - **关注点**：架构优化提案。建议利用 Gemini 原生的 Bash 纂好，结合零依赖的 OS 沙箱机制，在不牺牲安全性的前提下释放模型使用 POSIX 工具（`grep`, `sed` 等）的能力。
4. **[P1] Shell command execution gets stuck with "Waiting input"** ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166))
   - **关注点**：核心交互 Bug。执行完简单的 CLI 命令后，界面卡在 "Awaiting user input" 状态无法继续，阻断了用户的操作连贯性。
5. **[P2] Gemini does not use skills and sub-agents enough** ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968))
   - **关注点**：智能体调度策略。开发者反馈模型极少主动调用自定义的 Skills 和 Sub-agents，必须通过硬性 Prompt 强制干预，期望提升模型对工具的自主决策能力。
6. **[P2] Stop Auto Memory from retrying low-signal sessions indefinitely** ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522))
   - **关注点**：内存系统性能。Auto Memory 机制会陷入对 "低价值会话" 的无限重试死循环，耗费计算资源。
7. **[P2] Gemini CLI encounters 400 error with > 128 tools** ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246))
   - **关注点**：Token 承载上限。当可用工具（如 MCP 工具）超过 128 个时直接触发 400 报错，亟需优化上下文窗口的工具范围裁剪逻辑。
8. **[P2] Agent should stop/discourage destructive behavior** ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672))
   - **关注点**：安全与防护。社区强烈要求限制模型执行破坏性命令（如 `git reset --force` 或修改本地数据库），防止不可逆的操作。
9. **[P2] Add deterministic redaction and reduce Auto Memory logging** ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525))
   - **关注点**：数据隐私。当前 Auto Memory 会将本地代码记录先放入模型上下文再进行脱敏，存在泄密风险，呼吁引入确定性的前置脱敏逻辑。
10. **[P2] Model frequently creates tmp scripts in random spots** ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571))
    - **关注点**：代码整洁性。模型执行 Shell 操作时倾向于在各个目录乱建临时脚本，给开发者清理工作区带来巨大负担。

---

## 4. 重要 PR 进展 (Top 10)

1. **fix(core): limit recursive reasoning turns per single user request** ([#28164](https://github.com/google-gemini/gemini-cli/pull/28164))
   - **进展**：引入了严格的递归推理轮次限制（单次请求默认 15 次），有效防止模型陷入无限循环，保护本地 CPU 资源和 API 配额。
2. **fix(core): guard message inspectors against empty parts arrays** ([#28068](https://github.com/google-gemini/gemini-cli/pull/28068))
   - **进展**：修复了一个经典的 JS 逻辑陷阱（`[].every()` 返回 true），防止空 `parts` 数组的 Model 消息被误判为 `FunctionCall`，提升了核心模块的鲁棒性。
3. **fix(core): buffer chat compression telemetry** ([#28162](https://github.com/google-gemini/gemini-cli/pull/28162))
   - **进展**：将聊天压缩（上下文裁剪）的遥测日志和指标进行缓冲处理，提升了企业版的监控稳定性。
4. **chore(deps): bump @google/genai from 1.30.0 to 2.10.0** ([#28295](https://github.com/google-gemini/gemini-cli/pull/28295))
   - **进展**：底层 GenAI SDK 大版本升级（1.x 升至 2.x），预示着 Gemini CLI 底层模型调用机制将迎来新特性适配。
5. **chore(deps): bump @agentclientprotocol/sdk from 0.16.1 to 1.0.0** ([#28294](https://github.com/google-gemini/gemini-cli/pull/28294))
   - **进展**：Agent Client Protocol SDK 正式迈入 1.0 里程碑，标志着多 Agent 通信协议走向稳定。
6. **chore(deps): bump puppeteer-core from 24.0.0 to 25.2.1** ([#28292](https://github.com/google-gemini/gemini-cli/pull/28292))
   - **进展**：核心浏览器控制库的大版本升级，有望改善近期频发的 `browser_agent` 相关 Bug。
7. **chore(deps-dev): bump eslint from 9.24.0 to 10.6.0** ([#28293](https://github.com/google-gemini/gemini-cli/pull/28293))
   - **进展**：代码规范工具大版本跃升，保障项目代码质量基线。
8. **chore(deps-dev): bump @types/node from 20.11.24 to 26.0.1** ([#28297](https://github.com/google-gemini/gemini-cli/pull/28297))
   - **进展**：Node.js 类型定义跨越式更新至 v26，为利用高版本 Node API 做准备。
9. **chore(deps): bump js-yaml from 4.1.1 to 5.2.0** ([#28289](https://github.com/google-gemini/gemini-cli/pull/28289))
   - **进展**：底层 YAML 解析库升级。
10. **chore/release: bump version to 0.51.0-nightly.20260706** ([#28298](https://github.com/google-gemini/gemini-cli/pull/28298))
    -

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

这是一份为您定制的 2026-07-06 GitHub Copilot CLI 社区动态日报。

# GitHub Copilot CLI 社区动态日报 (2026-07-06)

## 1. 今日速览
今日 GitHub Copilot CLI 无新版本发布，社区焦点主要集中在**多模型可用性报错**以及**企业级/本地化自定义端点需求**上。值得关注的是，开发者在处理大型单体仓库时遇到了严重的内存泄漏（OOM）问题，同时关于插件市场和上下文记忆的权限计费逻辑也引发了讨论。

## 2. 版本发布
*今日无新版本发布。*

## 3. 社区热点 Issues
以下是近期更新中最值得关注的 10 个 Issue：

*   **[OPEN] 核心模型不可用报错：`gpt-5.3-codex` 缺失** ([#3997](https://github.com/github/copilot-cli/issues/3997))
    *   **关注点**：多位用户反馈在运行 Agent 任务时遭遇 `gpt-5.3-codex` 模型不可用的致命错误。该问题影响范围广，讨论热度最高。
*   **[OPEN] 功能提议：在 CLI 中支持自定义模型端点** ([#4003](https://github.com/github/copilot-cli/issues/4003))
    *   **关注点**：开发者强烈要求 CLI 版本对齐 VS Code 的能力，允许配置本地或私有化部署的自定义模型端点，以满足企业合规与本地测试需求。
*   **[OPEN] 严重性能问题：原生 `tgrep` 索引器导致大型单体仓库 OOM** ([#3976](https://github.com/github/copilot-cli/issues/3976))
    *   **关注点**：内置的 Rust `tgrep` 三元索引器在启动时会创建无内存上限的守护进程，直接导致大型项目主机内存耗尽被系统杀掉（OOM）。
*   **[OPEN] 企业版缺陷：无法选择 Copilot 计费实体导致 Memory 保存失败** ([#4005](https://github.com/github/copilot-cli/issues/4005))
    *   **关注点**：企业版用户反馈无法保存上下文记忆，系统报错“未选择计费实体”。企业环境下的权限和计费路由机制存在 Bug。
*   **[OPEN] 计费逻辑争议：卸载插件消耗 AI Credit** ([#4032](https://github.com/github/copilot-cli/issues/4032))
    *   **关注点**：用户在执行移除插件的操作时，发现系统为了解析命令调用了大模型，从而消耗了 AI 额度。开发者呼吁将此类基础操作改为本地指令直处理。
*   **[CLOSED] 进程挂起：Tool-use Hooks 的 stdin 未正确关闭** ([#4034](https://github.com/github/copilot-cli/issues/4034))
    *   **关注点**：已修复。此前 `preToolUse` 和 `postToolUse` 钩子因为 stdin 未发送 EOF 导致常用的 `$(cat)` 模式发生命令行卡死。
*   **[CLOSED] 自动化阻碍：无法以非交互模式运行 `/init` 命令** ([#4011](https://github.com/github/copilot-cli/issues/4011))
    *   **关注点**：已修复。此前在 Shell 脚本中执行 `copilot init` 生成配置文件后会挂起，阻碍了 CI/CD 环境下的自动化初始化。
*   **[OPEN] 订阅权限错位：Pro 订阅无法使用 Kimi K2.7 Code** ([#4029](https://github.com/github/copilot-cli/issues/4029))
    *   **关注点**：官方政策声明 Pro 会员可用 `kimi-k2.7-code` 模型，但 CLI 端实际将其标记为 Blocked/Disabled，属于策略同步 Bug。
*   **[OPEN] 交互体验：Autopilot 模式无法跨回合持久化** ([#3977](https://github.com/github/copilot-cli/issues/3977))
    *   **关注点**：当前 `--autopilot` 标志仅在首个任务生效，任务结束后会回退至标准模式。开发者希望通过启动参数让自动驾驶模式贯穿整个交互会话。
*   **[CLOSED] 插件生态：安装插件未正确注册 MCP 服务器** ([#4004](https://github.com/github/copilot-cli/issues/4004))
    *   **关注点**：已修复。此前插件内附带的 `.mcp.json` 虽然被下载，但未能自动写入到全局 `~/.copilot/mcp-config.json` 中。

## 4. 重要 PR 进展
今日仅有 1 个 PR 更新：

*   **[OPEN] 新增 Jekyll 部署的 GitHub Actions 工作流** ([#4030](https://github.com/github/copilot-cli/pull/4030))
    *   **内容**：由社区贡献，旨在自动化构建并将基于 Jekyll 的文档/项目网站部署到 GitHub Pages，预装了必要的依赖项。

## 5. 功能需求趋势
从近期的 Issue 中，可以清晰看出社区对 Copilot CLI 未来发展的三大期待：
1.  **多模型与私有化部署**：开发者不再满足于官方提供的单一模型池，急需接入本地模型（如 Ollama）或企业私有端点。
2.  **非交互式与 CI/CD 友好化**：CLI 作为终端工具，需要在自动化流水线中表现得更稳定，要求提供更多无需人工干预的批量执行指令和状态保持机制。
3.  **细粒度的计费与状态隔离**：随着插件系统和 MCP 的引入，开发者希望清晰的界定“系统指令操作”与“AI 推理”的边界，避免无意义的 Token 消耗。

## 6. 开发者关注点
*   **稳定性痛点**：Windows 系统上的卸载残留问题 ([#3662](https://github.com/github/copilot-cli/issues/3662)) 长期未解；内置实验性工具（如 `tgrep`）缺乏资源限制，直接威胁宿主机安全。
*   **UI/UX 细节**：终端界面下的键盘导航（如 Tab 切换失灵 [#4028](https://github.com/github/copilot-cli/issues/4028)）、拒绝执行命令后的交互文案冗余 ([#4033](https://github.com/github/copilot-cli/issues/4033)) 等细节体验仍需打磨。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

这里是为您生成的 2026-07-06 Kimi Code CLI 社区动态日报。

# Kimi Code CLI 社区动态日报 (2026-07-06)

**数据来源:** [github.com/MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

## 1. 今日速览
今日 Kimi Code CLI 仓库无新增版本发布或活跃的代码合并，整体开发节奏较为平稳。社区的焦点高度集中于品牌迁移（"Kimi CLI" → "Kimi Code"）带来的历史遗留问题，开发者指出下游生态（SDK、IDE 插件、包管理器等）的命名仍存在严重碎片化现象。该问题已作为核心追踪项被记录并关闭，预示着官方后续将开展全局统一的清理工作。

## 2. 版本发布
* **过去 24 小时内无新版本发布。**

## 3. 社区热点 Issues
今日数据周期内仅更新了 1 条 Issue，但其涉及的战略与工程化问题非常关键：

* **[#2483] [branding] "Kimi CLI" → "Kimi Code" migration is half-done — downstream references are wildly inconsistent across the ecosystem** (状态: CLOSED)
  * **链接:** [https://github.com/MoonshotAI/kimi-cli/issues/2483](https://github.com/MoonshotAI/kimi-cli/issues/2483)
  * **为什么重要:** 这是一个典型的“技术债务”暴露。随着项目从 `kimi-cli` 向 `kimi-code` 迁移，虽然文档站的 Banner 已更新，但包名、二进制路径、各类 IDE 扩展（Zed, VS Code）的标识并未同步。
  * **社区反应:** 开发者 @counterfactual5 详细列举了生态中至少四套命名同时存在的乱象。官方已将其关闭并作为内部追踪，表明团队已意识到该问题的严重性，预计近期会发起大规模的 Downstream 重命名行动。

## 4. 重要 PR 进展
* **过去 24 小时内无更新的 Pull Requests。** 
*(项目当前可能正处于品牌迁移的代码盘点阶段，暂无新功能或修复代码合并入主分支。)*

## 5. 功能需求趋势
基于近期的 Issue 动态，当前社区呈现出的核心趋势并非“新功能增加”，而是**“工程基建与品牌一致性”**：
* **生态统一性:** 随着工具链的扩展（CLI核心、VS Code/Zed 插件、Python/Node SDK），开发者强烈要求各个分发渠道的命名规范、导入路径保持高度一致。
* **向后兼容与平滑过渡:** 在破坏性更名（Breaking Change）过程中，社区需要明确的迁移指南和兼容期，而不是“只改了一半”的半成品状态。

## 6. 开发者关注点
* **依赖管理的确定性:** 痛点集中在 PyPI 包名、二进制环境变量路径的不一致。开发者在配置 CI/CD 或编写自动化脚本时，由于命名混乱（如不知该调用 `kimi` 还是 `kimi-code`），极易导致流水线断裂。
* **IDE 集成体验的连续性:** Zed 和 VS Code 扩展作为高频使用入口，其插件标识与底层 CLI 脱节，会让用户产生“是否用错版本”的疑虑。开发者呼吁官方尽快收敛出口，提供单一的、权威的安装与引用规范。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

这是为您生成的 2026-07-06 OpenCode 社区动态日报。

# 📰 OpenCode 社区动态日报 (2026-07-06)

## 1. 今日速览
今日 OpenCode 无新版本发布，但底层架构的迭代与重构显著加速，核心团队及社区贡献者将重心全面转向 V2 架构的优化（如全局表单路由、会话上下文重构）。MCP（Model Context Protocol）工具的兼容性与元数据处理成为今日 PR 的焦点。同时，社区热议集中在上下文精细化管理（自动压缩与限制）、外部模型（如 DeepSeek、Qwen）的工具调用兼容性，以及终端 UI 的稳定性上。

## 2. 版本发布
**无**（过去 24 小时内未发布新版本）。

---

## 3. 社区热点 Issues (Top 10)
以下为本日讨论最热烈、最具代表性的 10 个 Issue：

*   **[FEATURE]: Add native session goals with /goal** ([#27167](https://github.com/anomalyco/opencode/issues/27167))
    *   **关注点**：随着 AI 编码助手的普及，开发者需要更好的任务生命周期管理。社区呼吁引入原生的 `/goal` 命令，以设定持久化的会话目标，避免在长对话中偏离主题。（👍 104 | 💬 59）
*   **[FEATURE]: Configurable context limit and auto-compaction threshold** ([#8140](https://github.com/anomalyco/opencode/issues/8140))
    *   **关注点**：现有的自动压缩机制在逼近上下文上限时才触发，导致成本难以控制。开发者强烈要求能够自定义上下文限制和提前触发压缩。（👍 52）
*   **[FEATURE]: Native StatusLine Hook for Plugins** ([#8619](https://github.com/anomalyco/opencode/issues/8619))
    *   **关注点**：当前插件若想在状态栏显示信息（如 git 状态、时间戳），必须将内容注入到对话上下文中。社区呼吁提供原生 Context-Free 的状态栏 Hook，以节约 Token 开销。（👍 50）
*   **[FEATURE]: support config.d/ directory for modular configuration** ([#9062](https://github.com/anomalyco/opencode/issues/9062))
    *   **关注点**：单文件 `opencode.json` 在大型项目中变得过于臃肿，开发者希望支持目录式的模块化配置。（👍 11）
*   **Auto-compaction enabled by default, but context_length_exceeded errors still occur** ([#8089](https://github.com/anomalyco/opencode/issues/8089))
    *   **关注点**：即便开启了默认的自动压缩，复杂的 Agent 工作流中依然会报超出上下文长度的错误，暴露了当前压缩策略在边缘场景下的局限性。（👍 14）
*   **[FEATURE]: jdtls should support lombok** ([#8032](https://github.com/anomalyco/opencode/issues/8032))
    *   **关注点**：Java 生态的重磅需求。要求在启动 Java 语言服务器 (jdtls) 时自动挂载 Lombok javaagent。（👍 17）
*   **Qwen 3.7 Plus/Max (via OpenRouter) unknown/invalid tool calls** ([#33618](https://github.com/anomalyco/opencode/issues/33618))
    *   **关注点**：最新 Qwen 模型通过 OpenRouter 接入时，频繁出现空名称的工具调用失败问题，导致会话中断。（👍 2）
*   **[FEATURE]: Allow interactive terminal input for commands** ([#8097](https://github.com/anomalyco/opencode/issues/8097))
    *   **关注点**：Agent 在执行需要交互式输入的命令（如 `sudo` 提示输入密码）时受阻，开发者要求开放终端交互权限。（👍 12）
*   **docs: clarify that project and global AGENTS.md files are combined** ([#9282](https://github.com/anomalyco/opencode/issues/9282))
    *   **关注点**：文档 ambiguity 导致用户误以为局部 `AGENTS.md` 会覆盖全局配置。实际上它们是合并生效的，需修正文档。（👍 12）
*   **[FEATURE]: Codex CLi feature/harness compatibility** ([#9454](https://github.com/anomalyco/opencode/issues/9454))
    *   **关注点**：讨论 OpenCode 是否应更好地兼容 Codex 模型及其强大的上下文压缩 Harness。（👍 9）

---

## 4. 重要 PR 进展 (Top 10)
今日的 PR 集中在 V2 架构迁移、MCP 协议支持以及细节体验的打磨：

*   **refactor(core): rename system context to instructions** ([#35497](https://github.com/anomalyco/opencode/pull/35497))
    *   **进展**：将 V2 的 `SystemContext`（系统上下文）子系统正式重命名为 `Instructions`（指令），收紧了发现逻辑的语义，是一次重要的架构语义重构。
*   **feat(opencode): add research command (autoresearch pattern)** ([#35495](https://github.com/anomalyco/opencode/pull/35495))
    *   **进展**：引入激动人心的 `opencode research` 命令，允许用户自动构建实验场景，实现“在睡眠中运行代码实验”。
*   **feat(desktop): add close-to-tray behavior** ([#35259](https://github.com/anomalyco/opencode/pull/35259))
    *   **进展**：桌面端重磅体验优化。关闭最后一个窗口时将程序最小化到系统托盘/Dock，确保后台 Agent 持续运行。
*   **[beta] fix(app): optimize large review panes** ([#35375](https://github.com/anomalyco/opencode/pull/35375))
    *   **进展**：使用扁平化模型和 TanStack 虚拟化技术，彻底重构了代码审查面板，解决了大型文件 Diff 时的卡顿问题。
*   **refactor(core): route questions through forms** ([#35422](https://github.com/anomalyco/opencode/pull/35422))
    *   **进展**：通过 `Form.Service` 实现内置的提问工具，移除了冗余的 TUI 状态，统一了 V2 的交互逻辑。
*   **fix(mcp): preserve metadata across paginated tools** ([#35500](https://github.com/anomalyco/opencode/pull/35500) & [#35439](https://github.com/anomalyco/opencode/pull/35439))
    *   **进展**：修复了 OpenCode 在遍历 MCP 分页工具列表时丢失 `outputSchema` 和任务元数据的严重缺陷。
*   **fix(opencode): handle stale session.directory when project moves** ([#35492](https://github.com/anomalyco/opencode/pull/35492))
    *   **进展**：修复了用户移动或删除项目目录后，数据库中陈旧的 `session.directory` 导致 CLI 卡死和 HTTP 500 错误的 Bug。
*   **fix(tui): prevent piped stdin from breaking UI and keyboard input** ([#34242](https://github.com/anomalyco/opencode/pull/34242))
    *   **进展**：彻底解决了管道标准输入破坏 TUI 界面渲染和键盘响应的问题，对 CI/CD 集成场景非常重要。
*   **fix: update v2 session usage metrics** ([#35468](https://github.com/anomalyco/opencode/pull/35468))
    *   **进展**：基于目录定价和上下文层级精确计算 V2 的会话成本，并优先展示 Copilot 报告的 AIU 计费指标。
*   **[contributor] fix(tui): restore reverted prompt in v2** ([#35462](https://github.com/anomalyco/opencode/pull/35462))
    *   **进展**：修复了执行 `/undo` 或 `/revert` 后提示词及文件附件未能正确恢复的问题。

---

## 5. 功能需求趋势
基于近期 Issues，社区需求呈现以下四大趋势：
1.  **上下文与成本微观管控**：粗放的上下文管理已无法满足重度用户。开发者要求能够配置上下文触发阈值（[#8140](https://github.com/anomalyco/opencode/issues/8140)）、使用递归语言模型替代粗暴的截断压缩（[#8455](https://github.com/anomalyco/opencode/issues/8455)）。
2.  **工作流生命周期管理**：从简单的问答向自动化工作流迈进，需求包括设定持久化会话目标（[#27167](https://github.com/anomalyco/opencode/issues/27167)）和无人值守的自动实验框架（[#35495](https://github.com/anomalyco/opencode/pull/35495)）。
3.  **外部模型与工具调用的兼容**：OpenCode 作为客户端，对各类新模型（DeepSeek 思维链保留、Qwen 工具调用）的容错与适配需求激增，尤其是处理无效 JSON 和空函数名的情况。
4.  **配置模块化与规则继承**：单文件配置正在成为瓶颈，目录化配置（`config.d/`）和更清晰的 Rules 继承/合并逻辑成为企业级用户的迫切需求。

---

## 6. 开发者关注点与痛点
*   **本地存储失控引发系统崩溃**：有开发者反馈（[#8096](https://github.com/anomalyco/opencode/issues/8096)），缓存或日志文件在极短时间内（10分钟）膨胀至 60GB，直接导致 C 盘崩溃，且目前缺乏应用内清理机制。这暴露了本地

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

以下是 2026-07-06 的 Qwen Code 社区动态日报。

### 1. 今日速览
今日 Qwen Code 发布了最新的 nightly 版本，重点强化了 CI 自动化审查的 PR 门禁机制。从社区动态来看，**长会话上下文管理、缓存（KV-cache）命中率优化以及核心安全沙盒隔离**是当前开发者最为关注的焦点。此外，子 Agent 并发控制、多 IM 平台（如企业微信、QQ Bot）集成等高级特性的 PR 取得了实质性进展。

### 2. 版本发布
*   **[v0.19.6-nightly.20260706.47f62a466](https://github.com/QwenLM/qwen-code/releases)**
    *   **更新内容**：加强了 PR 检查门禁，引入了批处理检测、问题存在性检查以及危险标志模式匹配，旨在提升自动化协作的安全性与准确性。

### 3. 社区热点 Issues
以下 10 个 Issue 反映了当前社区的核心痛点与期望：

1.   **[#6282](https://github.com/QwenLM/qwen-code/issues/6282) [P1 漏洞] `transform_data` 未强制执行子进程隔离**
    *   **关注点**：安全。开发者发现 `transform_data` 在执行脚本时未正确应用文件系统和网络隔离，存在潜在的沙盒逃逸风险。
2.   **[#4049](https://github.com/QwenLM/qwen-code/issues/4049) [Bug] 工具输出未截断导致 Context Token 溢出**
    *   **关注点**：长会话稳定性。执行批量脚本输出大量 JSON 时容易撑破上下文窗口，导致 Session 卡死，开发者呼吁引入智能截断机制。
3.   **[#6265](https://github.com/QwenLM/qwen-code/issues/6265) `tool_search` 每次延迟加载都会使 LLM 服务器的 KV-cache 失效**
    *   **关注点**：性能。动态发现和加载工具会导致前端发生改变，进而使得大模型服务端的 KV-cache 频繁失效，严重拖慢响应速度。
4.   **[#6338](https://github.com/QwenLM/qwen-code/issues/6338) 稳定工具 schema 顺序以避免 Prompt Cache 失效**
    *   **关注点**：性能。与 #6265 类似，异步注册工具会导致 schema 顺序变化，社区希望硬性稳定声明顺序以提升缓存命中率。
5.   **[#6312](https://github.com/QwenLM/qwen-code/issues/6312) [性能优化] 减少 Daemon 会话创建时的单会话开销**
    *   **关注点**：架构优化。针对常驻事件循环中重复执行同步 I/O 和对象初始化导致的性能损耗进行跟踪优化。
6.   **[#6318](https://github.com/QwenLM/qwen-code/issues/6318) [Bug] 执行 `/compress` 后无法 `/rewind` 回退**
    *   **关注点**：历史记录管理。压缩上下文后破坏了原有的回退链路，即使回退到未压缩区也会报错，影响交互体验。
7.   **[#6356](https://github.com/QwenLM/qwen-code/issues/6356) [Bug] 通过软链接访问文件时条件规则未加载**
    *   **关注点**：配置解析。`.qwen/rules/` 中的路径匹配未正确处理文件系统软链接场景，导致针对特定文件的提示词失效。
8.   **[#6299](https://github.com/QwenLM/qwen-code/issues/6299) [Bug] ci-bot 在 PR 关闭后仍继续运行审查并触发邮件轰炸**
    *   **关注点**：开发体验。自动化机器人逻辑存在缺陷，导致已关闭的 PR 依然被强制要求堆叠“屎山代码”以过审，引发开发者强烈不满。
9.   **[#6360](https://github.com/QwenLM/qwen-code/issues/6360) [需求] 为 Bot 提示词添加频道活跃记忆召回**
    *   **关注点**：IM 机器人能力增强。希望为 Qwen Channel bot 增加基于当前会话/频道的局部记忆库读取能力。
10.  **[#6175](https://github.com/QwenLM/qwen-code/issues/6175) [Bug] 模型思考过程显示 'Thought for 0s' 且停止流式输出**
    *   **关注点**：UI 交互。OpenAI 兼容模型的推理时长统计错误且思考过程不再支持流式输出，严重影响前端调试体验。

### 4. 重要 PR 进展
今日共有 50 个 PR 更新，以下 10 个最具代表性：

1.   **[#6354](https://github.com/QwenLM/qwen-code/pull/6354) 增加 `maxSubAgents` 限制并行子 Agent 数量**
    *   **功能**：引入核心配置限制并行运行的子 Agent 上限，超出部分进入排队，防止资源瞬时枯竭。
2.   **[#6106](https://github.com/QwenLM/qwen-code/pull/6106) 增加 `Tool(param:value)` 参数级权限控制语法**
    *   **功能**：支持基于工具参数的细粒度权限控制。例如可直接拦截请求特定模型（如 `Agent(model:opus)`）的子 Agent 启动。
3.   **[#6347](https://github.com/QwenLM/qwen-code/pull/6347) 扩展文件热重载**
    *   **功能**：监听磁盘上的插件文件变更，实现对 commands、skills 等的静默热重载，大幅提升二次开发体验。
4.   **[#6224](https://github.com/QwenLM/qwen-code/pull/6224) 新增企业微信智能机器人通道**
    *   **功能**：重写 WeCom 通道，直接通过官方 WebSocket SDK 连接，免去繁琐的回调应用配置。
5.  **[#6358](https://github.com/QwenLM/qwen-code/pull/6358) 修复压缩历史后的 `/rewind` 失效问题**
    *   **修复**：对应 Issue #6318，修正了上下文压缩后对话轮次统计的逻辑，恢复正常的回退功能。
6.   **[#6346](https://github.com/QwenLM/qwen-code/pull/6346) / [#6259](https://github.com/QwenLM/qwen-code/pull/6259) Daemon 会话 artifacts 持久化**
    *   **功能**：支持在 Daemon 重启或会话重播期间保留可恢复的元数据和内容，提升系统鲁棒性。
7.   **

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*