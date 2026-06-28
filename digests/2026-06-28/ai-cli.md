# AI CLI 工具社区动态日报 2026-06-28

> 生成时间: 2026-06-28 04:54 UTC | 覆盖工具: 7 个

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

作为专注于 AI 开发工具生态的技术分析师，基于 2026 年 6 月 28 日的社区动态数据，为您梳理如下横向对比分析报告：

---

# 📊 2026-06-28 主流 AI CLI 工具生态横向对比分析报告

## 1. 生态全景
当前 AI CLI 工具生态正处于从“代码生成辅助”向“全自动工程智能体”跨越的深水区。各厂商在加速底层架构重构（如引入 AST 解析、Rust 改写）和争夺前沿大模型（GPT-5.5, Opus 4.8, GLM-5.2）首发支持的同时，普遍面临着**模型高频迭代引发的工具链断裂**以及**长时间运行导致的系统级资源泄漏（内存/Token）**两大挑战。随着 Agent 权限的扩大，开发者对自动化失控的担忧日益加剧，**安全沙箱隔离、操作可见性以及细粒度成本管控**已成为决定下一阶段工具选型的核心博弈点。

## 2. 各工具活跃度对比
今日各工具的迭代节奏与社区反馈热度呈现出明显的阶段性差异：

| 工具名称 | 版本发布动态 | 今日热门 Issues (Top 10) | 重要 PR 进展 | 核心基调 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenAI Codex** | **3 个** (Rust Alpha 高频连发) | 334+ 👍 / 极高互动量 | 10+ 堆栈式核心重构 | 底层快节奏重构，集中爆发资源泄漏与计费争议 |
| **Qwen Code** | **1 个** (v0.19.2-nightly) | 集中于状态同步与成本控制 | 10 个 (含 AST 重构) | 强化工程化协同，扩展生态边界 (浏览器/频道) |
| **Gemini CLI** | **1 个** (v0.51.0-nightly) | 集中于 Agent 失控与 UI 卡死 | 10+ 个 (安全加固主导) | 筑牢 Agent 安全栅栏，推进 MCP 标准兼容 |
| **OpenCode** | 无 | 集中于跨端崩溃与模型适配 | 10 个 (TUI 健壮性提升) | 攻坚跨平台路径解析，提高多模型容错率 |
| **Claude Code**| 无 | 75+ 👍 / 高互动量 | 1 个 (日常维护) | 遭遇新模型升级带来的“反噬”，UI 交互受阻 |
| **Kimi Code** | 无 | 无活动 | 无 | 处于静默期 |

## 3. 共同关注的功能方向
透过今日的 Issues 与 PR，可以发现各大社区开发者的诉求在以下四个维度高度重合：

1.  **代码解析维度的升级 (文本正则 -> AST 抽象语法树)**
    *   **Gemini CLI / Qwen Code**：均提出或实现了基于 `tree-sitter` 的 AST 代码解析。旨在替代传统的正则匹配，从根本上解决 Token 浪费、Shell 命令解析错误和幻觉问题。
2.  **Agent 越权防御与安全降级**
    *   **Claude Code / Gemini CLI / Qwen Code**：Claude 呼吁恢复传统键盘授权防误触；Gemini 强制要求批准 Shell 参数扩展并防止 Agent 静默扩大执行范围；Qwen 引入 AST 以彻底解决复杂命令绕过权限校验的痛点。
3.  **资源生命周期与 Token 精细化管控**
    *   **OpenAI Codex / Qwen Code / OpenCode**：Codex 暴露出严重的 SQLite 日志狂写与 MCP 内存泄漏；Qwen 面临缓存失效与上下文死循环。开发者强烈要求拦截后台静默消耗，并提供更透明的限额重置与成本明细。
4.  **跨设备/跨平台的状态一致性**
    *   **Qwen Code / OpenCode**：Qwen 推动将 Todos/Memory 持久化到项目内以支持 Git 同步；OpenCode 集中火力修复 Windows 与 WSL 之间的路径映射崩溃。

## 4. 差异化定位分析

*   **Claude Code：重度依赖深度思考的“大脑驱动型”**。高度绑定 Anthropic 底层模型（Opus 系列），对长程逻辑推演支持最好，但极度脆弱。一旦底层 API 改动（如今日的思考摘要丢失、分类器宕机），上层 CLI 工具缺乏有效的容错降级机制。
*   **OpenAI Codex：追求极致性能的“底层重构型”**。高频发布 Rust Alpha 版本，表明其正在利用 Rust 彻底重写底层以解决 JS 运行时的性能瓶颈。其目标用户更偏向极客与重度系统开发者，对原生沙箱、系统级调用的要求极高。
*   **Gemini CLI：严守安全边界的“防御治理型”**。今日 PR 全面向“安全收敛”倾斜（故障关闭设计、拦截静默执行）。其定位更倾向于成为企业级、高安全要求的自动化执行代理，强调不失控、可干预。
*   **OpenCode：大模型时代的“中立聚合器”**。致力于抹平不同操作系统和不同大模型（NIM, GLM, OpenRouter, Kimi）之间的使用差异。其核心价值在于极高的模型首发支持速度和跨平台兼容修复。
*   **Qwen Code：打通全端协同的“工程化平台型”**。不仅局限于 CLI，正积极向桌面端、Web 端及 IM 工具（钉钉频道）拓展。注重将 AI 状态（Todos/定时任务）与传统软件工程工作流深度绑定。

## 5. 社区热度与成熟度评估

*   **热度最高、痛点最尖锐：OpenAI Codex**。Issue 互动量（单帖超 300+ 点赞）远超其他工具。GPT-5.5 的 Token 计费争议引发了社区强烈反响，同时高频的 Rust PR 提交显示出团队极强的工程迭代能力，处于**极速膨胀与阵痛期**。
*   **生态最丰富、拓展最积极：Qwen Code**。今日不仅修复底层 Bug，还落地了语音听写、Web-Shell MCP 浏览器、群组 Agent 等长尾功能，表明其社区生态正在向多维端侧辐射，进入**功能爆发期**。
*   **成熟度面临考验：Claude Code**。无新版本发布，且面临新模型上线的“阵痛”。其 TUI 交互的创新（鼠标点击）遭到传统开发者抵制，说明在产品成熟度的细节打磨上还有一段路要走。

## 6. 值得关注的趋势信号（开发者的行动指南）

1.  **警惕“模型升级引发的断崖式衰退”**：从 Claude (Opus 4.7/4.8) 和 Codex (GPT-5.5) 的表现来看，大模型能力的提升往往伴随着输出格式、Token 权重和安全策略的暗中改变。**建议开发团队**：在生产环境中锁定 CLI 的依赖模型版本，不要盲目开启自动升级，并建立模型输出的回归测试。
2.  **Agent 架构正从“工具池”转向“AST 感知”**：传统通过字符串拼接或 Bash 执行代码修改的方式正被淘汰，向代码 AST 解析演进是共识。**建议开发者**：在构建内部 AI 工具链时，优先考虑集成 `tree-sitter` 等结构化解析工具，以大幅提升准确率并削减 Token 成本。
3.  **长会话的“资源泄漏”成为隐形杀手**：无论是 Codex 的僵尸进程，还是 OpenCode 高达 26G 的内存堆积，都暴露出当前 AI CLI 在长时间运行下的状态管理缺陷。**建议开发者**：对于需要常驻后台（如 `serve` 模式或 Cron 任务）的 AI 进程，必须配置强制的自动重启策略（如 PM2/Docker 重启策略），避免宿主机 OOM。
4.  **“上下文状态”的资产化**：Qwen 支持将 Todos 存入 Git 的趋势表明，AI 生成的计划和记忆正在成为项目资产的一部分。未来的研发协同，可能会把 `.ai/todos` 或 `.ai/context` 纳入标准的代码库提交规范中。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下是基于 `anthropics/skills` 仓库数据（截至 2026-06-28）生成的 Claude Code Skills 社区热点分析报告：

### 1. 热门 Skills 排行 (Top Pull Requests)
社区当前最关注的贡献集中在**底层工具链修复、记忆能力扩展及文档处理增强**三个方面。以下为最具代表性的 PR：

*   **[PR #1298] 核心工具链修复：修复 Skill 评估器 0% 召回率问题**
    *   **功能**：修复 `run_eval.py` 始终报告 0% 召回率的严重 Bug，该问题导致 Skill 描述词的自动优化循环完全失效（针对底层噪声进行优化）。
    *   **状态**：`[OPEN]` | **关注点**：此 PR 解决了被大量开发者独立复现的底层阻塞问题，是当前社区最急需合并的核心修复。
    *   **链接**：https://github.com/anthropics/skills/pull/1298
*   **[PR #83] 新增元技能：Skill 质量与安全分析器**
    *   **功能**：引入两个高阶分析工具，分别从五个维度（结构、文档等）评估 Skill 质量，以及进行安全审查。
    *   **状态**：`[OPEN]` | **关注点**：直接响应了社区对第三方 Skill 安全性和质量标准化的强烈诉求。
    *   **链接**：https://github.com/anthropics/skills/pull/83
*   **[PR #154] 新增 shodh-memory 技能：AI Agent 持久化上下文**
    *   **功能**：为 AI Agent 提供跨对话的持久记忆系统，主动提取并结构化存储历史交互上下文。
    *   **状态**：`[OPEN]` | **关注点**：突破了 Claude Code 长上下文管理的瓶颈，是 Agent 走向完全自动化的关键基础设施。
    *   **链接**：https://github.com/anthropics/skills/pull/154
*   **[PR #486] 新增 ODT (开放文档格式) 技能**
    *   **功能**：支持创建、填充、读取及转换 `.odt` / `.ods` 等 LibreOffice/ISO 标准格式的文档，并可解析为 HTML。
    *   **状态**：`[OPEN]` | **关注点**：填补了官方在非微软系（非 docx/xlsx）开源办公文档格式的空白。
    *   **链接**：https://github.com/anthropics/skills/pull/486
*   **[PR #541] 紧急修复：防止 DOCX 书签 ID 冲突导致文档损坏**
    *   **功能**：修复由于 OOXML 中 `w:id` 共享 ID 空间导致的硬编码低 ID 冲突，避免文档损坏。
    *   **状态**：`[OPEN]` | **关注点**：解决了企业级文档处理中的致命破坏性问题。
    *   **链接**：https://github.com/anthropics/skills/pull/541

### 2. 社区需求趋势
通过对高热度 Issues 的分析，社区对未来 Skills 的发展提出了以下核心需求方向：

*   **信任边界与安全治理**
    *   开发者对“社区 Skill 滥用 `anthropic/` 命名空间”感到担忧，迫切需要建立官方与第三方的信任边界与安全沙箱机制。同时，有提案呼吁建立 `agent-governance`（Agent 治理）技能，用于策略执行和审计。*(参考: #492, #412)*
*   **企业级协作与无缝共享**
    *   团队用户强烈要求在 Claude.ai 组织内部实现 Skill 的一键共享库或链接分发功能，以替代目前低效的手动文件传输与上传流程。*(参考: #228)*
*   **上下文窗口优化与记忆压缩**
    *   针对长任务中 Agent “自我陶醉”导致 Token 消耗过大的问题，社区提出了 `compact-memory` 需求，希望通过符号标记法等结构化手段压缩长期 Agent 状态。*(参考: #1329)*
*   **跨平台兼容性 (Windows 与 Bedrock)**
    *   大量 Windows 开发者反馈底层评估脚本（`run_eval.py` 等）存在严重的兼容性问题（编码错误、子进程阻塞）。同时，AWS 用户呼吁 Skills 尽快原生适配 Amazon Bedrock 环境。*(参考: #1061, #29)*

### 3. 高潜力待合并 Skills
以下处于 OPEN 状态的 PR 解决了显著的痛点，且讨论活跃，具备近期落地的极高潜力：

*   **[PR #538 & #361] 验证器与文件路径大小写规范化**
    *   **落地理由**：修复了 Windows/Linux 大小写敏感系统下的致命文件引用错误，以及 YAML 特殊字符未加引号导致的静默解析失败。属于提高鲁棒性的“必合并”类型修复。
    *   **链接**：https://github.com/anthropics/skills/pull/538 , https://github.com/anthropics/skills/pull/361
*   **[PR #514] 新增文档排版质量控制技能**
    *   **落地理由**：精准解决了 AI 生成文档时的常见痛点（如孤行、寡行、分页标题孤立等问题）。对提升 Claude 实际交付物（如 PDF/DOCX）的质感有立竿见影的效果。
    *   **链接**：https://github.com/anthropics/skills/pull/514
*   **[PR #362] 修复多字节字符 (UTF-8) 导致的 Rust Panic**
    *   **落地理由**：将验证脚本中的字符长度检查替换为字节长度检查，彻底解决了中文、日文等多字节语言在处理时导致 CLI 崩溃的问题，对国际化至关重要。
    *   **链接**：https://github.com/anthropics/skills/pull/362

### 4. Skills 生态洞察
**一句话总结：** 
当前社区在 Skills 层面最集中的诉求，正从“单一功能扩展”向**“企业级工程化与可靠性”**转移——重点聚焦于打破跨平台（Windows/Bedrock）与长上下文（持久记忆）的物理瓶颈，并迫切需要建立第三方 Skills 的**安全信任边界**与组织级共享机制。

---

以下是 2026-06-28 的 Claude Code 社区动态日报。

### 1. 今日速览
今日 Claude Code 无新版本发布，社区讨论焦点高度集中在近期模型升级（Opus 4.7 / 4.8）引发的回归问题，其中“思考摘要缺失”及“安全分类器宕机导致命令被拦截”引发了最热烈的讨论。此外，Cowork 虚拟机在 ARM64 架构下的兼容性缺陷，以及终端 UI 交互（如鼠标误触）和 macOS 自动更新带来的权限失效问题，成为了开发者今日的核心痛点。

### 2. 版本发布
*过去 24 小时内无新版本发布。*

### 3. 社区热点 Issues (Top 10)
以下是今日互动频繁且最具代表性的 Issues：

*   **[BUG] Opus 4.7 思考摘要丢失（核心缺陷）** [#49268](https://github.com/anthropics/claude-code/issues/49268)
    *   **热度**: 👍75 | 评论 46
    *   **点评**: Opus 4.7 模型升级后，底层 API 默认修改了 `display: "summarized"`，导致 harness 无法正确显示思考过程。这是今日呼声最高的 Bug，严重影响开发者对 AI 决策的观察。
*   **[BUG] VS Code 扩展无法渲染 Opus 4.7 思考摘要** [#49322](https://github.com/anthropics/claude-code/issues/49322) & [#49902](https://github.com/anthropics/claude-code/issues/49902)
    *   **热度**: 👍41 | 评论 47 / 14
    *   **点评**: 上述核心缺陷在 VS Code 插件中的具体表现，官方暂未给出热修复，大量插件用户受影响。
*   **[BUG] Cowork VM 在 ARM64 (Snapdragon X) 上无法启动** [#39636](https://github.com/anthropics/claude-code/issues/39636)
    *   **热度**: 评论 32
    *   **点评**: Windows on ARM 用户的痛点。虚拟机内核一直无法引导并超时，导致 ARM 架构设备完全无法使用 Cowork 模式。
*   **[FEATURE] 允许禁用终端内可点击的 Yes/No 提示** [#70622](https://github.com/anthropics/claude-code/issues/70622)
    *   **热度**: 👍24 | 评论 8
    *   **点评**: 新引入的终端 UI 鼠标点击授权功能引发强烈反感，开发者报告容易误触（甚至不小心批准危险操作），呼吁提供保留传统键盘输入的选项。
*   **[BUG] 安全分类器宕机拦截所有 Bash 执行** [#69950](https://github.com/anthropics/claude-code/issues/69950)
    *   **热度**: 评论 2
    *   **点评**: 因为 `claude-opus-4-8` 临时不可用，自动模式下无法判断命令安全性，导致大面积阻断所有工具调用。暴露了过度依赖单一安全校验模型的脆弱性。
*   **[BUG] Opus 4.8 工具调用包装器格式错误及幻觉** [#71952](https://github.com/anthropics/claude-code/issues/71952)
    *   **热度**: 评论 1
    *   **点评**: Opus 4.8 模型出现退化，直接向外输出原始的 `<invoke>` XML 标签而非触发内部工具调用，伴随严重的偏题幻觉。
*   **[BUG] macOS 自动更新导致运行态应用失效及权限丢失** [#71942](https://github.com/anthropics/claude-code/issues/71942)
    *   **热度**: 评论 1
    *   **点评**: 严重破坏性 Bug。应用在后台自动更新时删除了当前正在运行的 App bundle，直接导致系统的“完全磁盘访问权限”被撤销。
*   **[BUG] MCP 服务器指令被静默截断** [#43474](https://github.com/anthropics/claude-code/issues/43474)
    *   **热度**: 评论 3
    *   **点评**: 当配置多个 MCP 服务器时，系统提示词会超限并发生截断，这对复杂的多 Agent 架构配置具有隐蔽的破坏性。
*   **[BUG] 无限 Token 循环消耗** [#71945](https://github.com/anthropics/claude-code/issues/71945)
    *   **热度**: 评论 2
    *   **点评**: 模型在思考阶段陷入死循环，单次重复生成可浪费超过 2000 Token，极大地消耗了用户的额度。
*   **[BUG] 无法在 Claude Desktop 中删除环境配置** [#12294](https://github.com/anthropics/claude-code/issues/12294)
    *   **热度**: 👍22 | 评论 18
    *   **点评**: 长期未解决的历史遗留问题，环境配置变成“只增不减”，严重影响工作区管理。

### 4. 重要 PR 进展
近期仓库 PR 活跃度较低，今日仅有基础维护性质的提交：

*   **fix(scripts): 为 edit-issue-labels.sh 添加错误提示** [#68787](https://github.com/anthropics/claude-code/pull/68787)
    *   **内容**: 修复了当未传入 label 参数时 CI 脚本静默失败的缺陷，添加了标准的 stderr 报错信息。属于开发者工具链体验优化。

### 5. 功能需求趋势
从今日的 Issue 动态中，可以提炼出以下几个明确的产品演进诉求：

*   **权限与通知解耦**: 开发者强烈需要**移动端可操作通知**（[#62458](https://github.com/anthropics/claude-code/issues/62458)）、**VSCode 原生 Toast 通知**（[#57230](https://github.com/anthropics/claude-code/issues/57230), [#65241](https://github.com/anthropics/claude-code/issues/65241)），以及多 Agent 集中式审批面板（[#70591](https://github.com/anthropics/claude-code/issues/70591)）。用户不希望被“绑架”在终端前等待 Prompt。
*   **上下文控制权下放**: 在 Cowork 模式下，用户希望拥有**手动执行 `/compact` (上下文压缩)** 的能力，而不是完全依赖系统自动触发（[#65114](https://github.com/anthropics/claude-code/issues/65114)）。
*   **底层大模型兼容性测试加强**: API 层面（Opus 4.7/4.8）的轻微变动，直接导致 Claude Code 的思考链断裂、安全机制瘫痪和 XML 解析失败。社区呼吁在发布新模型前加强 CLI 端的回归覆盖。

### 6. 开发者关注点（痛点总结）
1.  **新模型稳定性倒退**: 近期 Opus 4.7/4.8 的上线引发了连锁反应（思考摘要失效、死循环消耗 Token、XML 误输出）。开发者对大模型版本切换带来的不稳定性感到疲惫。
2.  **TUI 交互的反向优化**: 终端内 UI 的鼠标可点击交互（Yes/No 按钮）未能获得传统开发者的认可，因极易造成误操作（甚至引发安全隐患）而遭到社区抵制。
3.  **跨平台与多架构支持薄弱**: Cowork 在 Windows ARM64 架构上的缺席，以及 macOS 偶发性主线程冻结（[#71951](https://github.com/anthropics/claude-code/issues/71951)）和自毁式更新，反映出跨端工程化测试存在盲区。
4.  **记忆机制的不可靠**: 开发者反馈 Claude Code 虽然能记录 Memory，但在会话中途经常违背自己刚写下的规则（[#71935](https://github.com/anthropics/claude-code/issues/71935)），对长程任务的一致性表示担忧。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**OpenAI Codex 社区动态日报 (2026-06-28)**

### 1. 今日速览
今日 Codex 团队持续推进底层架构优化，一日内连发 3 个 Rust Alpha 版本，并在 PR 区集中攻克了 MCP (Model Context Protocol) 的 OAuth 凭证管理与并发难题。社区方面，针对 GPT-5.5 模型的 token 消耗暴增和后台资源泄漏（如 SQLite 日志 churn、僵尸进程）成为开发者最热烈的投诉焦点。

### 2. 版本发布
过去 24 小时内，Codex 连续发布了 3 个迭代版本，显示出高频的底层代码合并节奏：
*   **rust-v0.143.0-alpha.29** ([Release](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.29))
*   **rust-v0.143.0-alpha.28** ([Release](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.28))
*   **rust-v0.143.0-alpha.27** ([Release](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.27))

### 3. 社区热点 Issues (Top 10)
1.  **[GPT-5.5 限额消耗暴增 10-20 倍]** [#28879](https://github.com/openai/codex/issues/28879) - **最受关注**。自 6 月 16 日起，Plus 计划用户发现使用 `gpt-5.5` 时，每个 token 的限流成本激增，原本可用 20+ 次提示的预算在 2-3 次后耗尽。社区讨论极为热烈（334 👍 / 186 评论）。
2.  **[SQLite 日志狂写导致 SSD 寿命损耗]** [#28224](https://github.com/openai/codex/issues/28224) - 反馈日志年写入量可达 640 TB（400 👍）。作者更新称近期的 3 个 PR 已成功减少了 85% 的日志，问题得到极大缓解。
3.  **[Responses-Lite 模式兼容性异常]** [#30224](https://github.com/openai/codex/issues/30224) 与 [#30406](https://github.com/openai/codex/issues/30406) - 在 Windows 和 macOS 最新版中，使用 `X-OpenAI-Internal-Codex-Responses-Lite` 时报错 "This model is not supported"，导致 GPT-5.5 无法调用，而 GPT-5.4 正常。
4.  **[强烈呼吁恢复 `/undo` 指令]** [#9203](https://github.com/openai/codex/issues/9203) - 社区呼吁（303 👍）恢复 TUI 中的撤销功能，以防止 Codex 误删未被 Git 追踪的文件或修改未提交的代码。
5.  **[macOS Computer Use 与 MCP 僵尸进程泄漏]** [#25744](https://github.com/openai/codex/issues/25744) - 长时间运行的会话会积累大量未清理的子进程，导致 HID 延迟和 WindowServer 卡顿。
6.  **[MCP 服务进程内存泄漏]** [#30408](https://github.com/openai/codex/issues/30408) - Codex 每次新建会话都会启动全局 MCP 进程，但归档/关闭会话时从不清理，导致内存占用飙升超 9GB。
7.  **[后台建议偷偷消耗大量 Token]** [#30390](https://github.com/openai/codex/issues/30390) - 桌面版在后台生成首页建议时，会在无重连记录的情况下消耗约 7 万个 token。
8.  **[macOS SQLite TRACE 日志 churn 未彻底解决]** [#29532](https://github.com/openai/codex/issues/29532) - 升级至 `0.142.0` 后，部分日志频率下降，但持久化的 TRACE 日志 churn 问题依然存在。
9.  **[Windows 沙箱执行失败]** [#29072](https://github.com/openai/codex/issues/29072) 与 [#20570](https://github.com/openai/codex/issues/20570) - Windows 环境下沙箱启动程序路径错误，导致 `apply_patch` 等工具持续报错 `CreateProcessAsUserW failed`。
10. **[ChatGPT 登录流程阻断]** [#24990](https://github.com/openai/codex/issues/24990) - 付费 Plus 用户无法通过标准 ChatGPT 流程登录，被强制重定向至添加手机号页面。

### 4. 重要 PR 进展 (Top 10)
1.  **[MCP OAuth 核心架构重构]** [#30292](https://github.com/openai/codex/pull/30292), [#30293](https://github.com/openai/codex/pull/30293), [#30294](https://github.com/openai/codex/pull/30294) - 针对此前 OAuth Token 过期不刷新的 Bug，提交了一系列堆栈式 PR，序列化了 MCP OAuth 登录、登出、刷新及共享凭据存储的事务，确保并发安全。
2.  **[支持持久化外部线程目标]** [#30369](https://github.com/openai/codex/pull/30369) - 为嵌入式应用引入了持久化的外部线程目标 API，完善了跨会话的目标状态管理。
3.  **[遥测与工具耗时诊断]** [#30334](https://github.com/openai/codex/pull/30334) - 增加了结构化的遥测日志，用于细化工具和推理的耗时诊断，将调度排队时间与实际执行时间区分开来。
4.  **[开放使用限制重置详情 API]** [#30395](https://github.com/openai/codex/pull/30395) - 允许客户端拉取详细的限额重置积分过期日期，优化前端额度过期提示体验。
5.  **[禁用 WebSocket 的 Nagle 算法]** [#30269](https://github.com/openai/codex/pull/30269) - 在 Rendezvous WebSocket 连接中全面禁用 Nagle 算法，以降低网络通信延迟。
6.  **[运行时强制插件市场策略]** [#29691](https://github.com/openai/codex/pull/29691) - 在运行时映射企业级源策略，确保被企业封禁的插件直接转为未激活状态。
7.  **[增加 currentTime/read 超时阈值]** [#30384](https://github.com/openai/codex/pull/30384) - 将外部 currentTime/read 请求的超时时间从 5 秒延长至 10 秒，减少弱网环境下的读取失败。
8.  **[规范化提示输出分配 ID]** [#30327](https://github.com/openai/codex/pull/30327) - 为合成的 "aborted" 输出分配稳定 ID，防止重试和本地压缩破坏对话身份。
9.  **[暴露环境信息 RPC]** [#30291](https://github.com/openai/codex/pull/30291) - 允许客户端在分配线程前发现环境的 Shell 和工作目录，提升了多系统执行环境的兼容性。
10. **[内测邀请系统整合]** [#30313](https://github.com/openai/codex/pull/30313) - 在 `/usage` 下添加了临时的客户端侧邀请流程机制。

### 5. 功能需求趋势
*   **精细化用量与限额管理**：随着 GPT-5.5 的推出，开发者对 Token 消耗规则的不透明度感到不满，社区强烈要求暴露更详细的限额重置时间、后台静默消耗明细（如 #30390, #29618）。
*   **进程与资源生命周期管理**：MCP 插件和 Computer Use 工具的繁荣带来了严重的资源泄漏问题。社区急需更健壮的沙箱进程回收和日志清理机制。
*   **TUI/CLI 体验回归与增强**：如恢复 `/undo`（撤销危险文件操作）、支持多行状态栏展示等，开发者呼唤更原生、容错率更高的终端操作体验。

### 6. 开发者关注点（痛点）
*   **模型切换带来的隐性成本**：从 GPT-5.4 到 GPT-5.5，不仅存在兼容性问题（Responses-Lite 报错），其 Token 计费权重的突变让许多 Plus 用户面临“额度秒没”的窘境。
*   **多操作系统兼容性割裂**：Windows 端的沙箱打包和路径解析（如 `fsPath` 和 `CreateProcessAsUserW`）依然脆弱；Intel 版 Mac 依然缺失部分 Computer Use 核心组件。
*   **MCP 集成的稳定性**：虽然官方在 PR 中大力修复 OAuth 凭证池的问题，但当前版本中多线程并发启动 MCP 进程导致的内存暴涨和文件句柄泄漏（EMFILE），仍是重度用户日常开发的阻碍。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

这是一份为您准备的 Gemini CLI 社区动态技术分析师日报（2026-06-28）。

# 📰 Gemini CLI 社区动态日报 (2026-06-28)

## 1. 今日速览
今日 Gemini CLI 发布了 `v0.51.0-nightly` 版本，重点强化了敏感路径的安全拦截机制。从今日的 Issue 与 PR 动态来看，**Agent（智能体）的边界控制与安全性**是社区与开发团队的核心关注点，多个高优先级 PR 致力于防止 Agent 的“未经授权越权操作（静默扩大执行范围）”。此外，关于 MCP 兼容性修复以及 AST（抽象语法树）代码解析能力的讨论与实现成为了近期功能演进的新趋势。

## 2. 版本发布
- **v0.51.0-nightly.20260628** ([查看详情](https://github.com/google-gemini/gemini-cli/compare/v0.51.0-nightly.20260626.gb14416447...v0.51.0-ni))
  - **安全修复**: 强制执行大小写不敏感的敏感路径黑名单，并优化了 VS Code 插件的“人类介入”机制，进一步防止绕过安全校验的风险。

---

## 3. 社区热点 Issues (Top 10)
以下筛选了今日社区最活跃、最具代表性的 10 个问题，反映了开发者的真实痛点：

1. **[P1 BUG] 通用 Agent 频繁卡死挂起** ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409))
   - **关注点**: 极高的用户呼声（👍 8）。当 Gemini CLI 调用通用 Agent 执行简单任务（如创建文件夹）时会永久挂起。这是目前影响开发体验的最严重 Bug 之一。
2. **[P1 BUG] Shell 命令执行后卡在 "Waiting input"** ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166))
   - **关注点**: 终端交互层面的严重 Bug。命令执行完毕后，CLI 依然显示处于激活状态并等待输入，导致工作流被迫中断。
3. **[P1 BUG] Sub-agent 触发 MAX_TURNS 后误报成功** ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323))
   - **关注点**: Agent 自省能力缺陷。子 Agent 达到最大轮次限制而中断时，主进程却将其误判为 "GOAL success"，这会误导后续的自动化决策。
4. **[P2 BUG] Sub-agent 绕过配置静默运行** ([#22093](https://github.com/google-gemini/gemini-cli/issues/22093))
   - **关注点**: 自 v0.33.0 起，即使在配置中禁用了 Agent 模式，子 Agent 依然会被调用。引发了社区对工具自动化失控的担忧。
5. **[P2 需求] 零依赖 OS 沙箱化与意图路由** ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873))
   - **关注点**: 社区深度探讨如何利用 Gemini 原生的 Bash 能力，同时通过 OS 级沙箱保证安全性，是未来 Agent 底层架构的重要演进方向。
6. **[P2 需求] 引入 AST 感知的文件读取与代码映射** ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745))
   - **关注点**: 突破传统的正则/文本匹配，让 Agent 理解代码的 AST 结构，从而大幅减少 Token 消耗并提高代码修改的准确性。
7. **[P2 BUG] Auto Memory 系统存在敏感信息泄露风险** ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525))
   - **关注点**: 后台提取 Agent 会在脱敏前将本地记录发送给模型，存在密钥/机密数据被包含进上下文的风险。
8. **[P2 BUG] Agent 乱建临时脚本文件** ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571))
   - **关注点**: 模型倾向于使用 Shell 执行代码修改，导致工作区中充斥着散落的 `.sh` 或 `.py` 脚本，增加了清理成本和提交污染。
9. **[P2 BUG] Browser Agent 忽略 settings.json 配置** ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267))
   - **关注点**: 浏览器自动化场景下，针对 `maxTurns` 等覆盖配置完全失效，严重制约了复杂前端自动化测试的定制化需求。
10. **[P1 需求] 健壮的组件级评估测试** ([#24353](https://github.com/google-gemini/gemini-cli/issues/24353))
    - **关注点**: 官方团队正在推进构建“行为级评估测试”，以系统性地解决 Agent 频繁出现非预期行为的问题。

---

## 4. 重要 PR 进展 (Top 10)
今日的 PR 动态主要集中在安全加固、MCP 协议兼容以及 Agent 权限收敛：

1. **[Agent 安全] 防止 Agent 静默扩大执行范围** ([#28171](https://github.com/google-gemini/gemini-cli/pull/28171) & [#28172](https://github.com/google-gemini/gemini-cli/pull/28172))
   - **进展**: 修复了当 Agent 初始方法失败或审查特定代码行时，未经用户同意擅自运行全局脚本或读取整个文件的严重隐患。
2. **[MCP 修复] 嗅探并修正 MCP 图片 MIME 类型** ([#27878](https://github.com/google-gemini/gemini-cli/pull/27878))
   - **进展**: 修复了 Figma MCP 集成中 WebP 被错判为 PNG 导致 API 报 400 错误的问题，通过本地二进制签名嗅探解决了此故障。
3. **[MCP 修复] 规范化 MCP 工具 Schema 至根对象类型** ([#27888](https://github.com/google-gemini/gemini-cli/pull/27888))
   - **进展**: 修复了部分 MCP Server 未严格声明 `type: "object"` 导致 Vertex AI 严格模式报错的问题，大幅提升了第三方 MCP 工具的兼容性。
4. **[MCP 修复] 使用存储的 Client ID 刷新 OAuth** ([#27889](https://github.com/google-gemini/gemini-cli/pull/27889))
   - **进展**: 解决了自动发现的 MCP Server 在无静态 `oauth.clientId` 时，Token 刷新失败的授权链路问题。
5. **[安全策略] 强制要求批准 Shell 参数扩展** ([#28175](https://github.com/google-gemini/gemini-cli/pull/28175))
   - **进展**: 出于安全考虑，将白名单中包含 Shell 参数扩展（如 `$VAR`）的命令降级为需要确认，并在 YOLO（自动执行）模式下直接拒绝。
6. **[底层基建] 实现 Caretaker Egress Cloud Run 服务** ([#28167](https://github.com/google-gemini/gemini-cli/pull/28167))
   - **进展**: 引入了基于 Pub/Sub 的自动化 GitHub 操作服务，预示着项目仓库的 Issue/PR 自动化分类和处理能力将大幅提升。
7. **[评估基建] 新增 eval:coverage 覆盖率报告命令** ([#28169](https://github.com/google-gemini/gemini-cli/pull/28169))
   - **进展**: 为内置工具引入了评估覆盖率检查，帮助开发者更好地跟踪测试的有效性。
8. **[核心修复] 尊重 session_context 中的 ignore 规则** ([#27886](https://github.com/google-gemini/gemini-cli/pull/27886))
   - **进展**: 修复了上下文构建时无视 `.gitignore` 和 `.geminiignore` 规则的缺陷，有助于减少上下文噪音和保护隐私文件。
9. **[安全加固] 要求显式批准的 Bot 补丁产物** ([#28178](https://github.com/google-gemini/gemini-cli/pull/28178))
   - **进展**: 针对 AI Bot 自动提交代码的流程进行了“故障关闭”设计，拒绝未经明确批准的补丁产物。
10. **[核心修复] 终端调整大小时的优化与防闪烁** ([#21924](https://github.com/google-gemini/gemini-cli/issues/21924))
    - **进展**: 针对调整终端窗口大小导致的高性能消耗和画面闪烁问题，引入了静态渲染和分批更新机制（关联 Issue 今日活跃）。

---

## 5. 功能需求趋势
从近期 Issue 和 PR 的标签及讨论中，可以洞察出 Gemini CLI 演进的几个显著趋势：
- **强化 Agent 权限栅栏**: 社区对 Agent “自作主张”（如越权读写文件、静默执行脚本）感到不安。防越权、OS 级沙箱隔离、敏感路径拦截是目前开发团队投入精力最多的方向。
- **代码理解维度的升级 (文本 -> AST)**: 模型单纯依靠正则或 Bash 查看代码容易产生幻觉且耗费 Token。社区正强烈推动将 AST（抽象语法树）解析能力内建到 CLI 中，

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

这里是 2026 年 6 月 28 日的 OpenCode 社区动态日报。

### 1. 今日速览
今日 OpenCode 社区无新版本发布，但围绕**系统稳定性（尤其是内存与跨平台路径处理）**和**大模型兼容性**产生了大量高质量讨论与代码提交。开发团队与社区贡献者集中修复了多个导致 Desktop 应用和 TUI 崩溃/卡死的严重 Bug，并合并了包括 Wayland 剪贴板支持、会话重命名等实用功能。Windows/WSG 跨环境路径解析与底层 Bun 运行时的性能表现仍是当前社区关注的核心焦点。

### 2. 版本发布
*今日暂无新版本发布。*

---

### 3. 社区热点 Issues (Top 10)
以下为本日更新中最具代表性、暴露出核心架构或高负载痛点的 10 个 Issue：

1. **[内存泄漏警告] (#22422)** | 👍: 0 | 评论: 7
   * **关注原因**：在 TUI 和 Web 界面启动后触发 `MaxListenersExceededWarning`。这是一个核心的底层性能 Bug，表明事件监听器存在未被正确销毁的泄漏风险。
2. **[Desktop App 跨系统 UNC 路径解析错误] (#19473)** | 👍: 0 | 评论: 7
   * **关注原因**：Windows 端连接 WSL 服务器时，路径解析逻辑冲突导致所有的 bash 工具调用失效，严重影响跨平台开发者的工作流。
3. **[OpenRouter 额度与 max_tokens 拦截报错] (#12219)** | 👍: 6 | 评论: 7
   * **关注原因**：大量第三方模型（如 Kimi 2.5 Free）用户在使用时遭遇额度校验拦截。反映出系统在处理不同提供商的计费/Token 限制策略时容错不足。
4. **[WSL 工作区路径被强制转换破坏] (#30895)** | 👍: 0 | 评论: 6
   * **关注原因**：与 #19473 类似，Desktop v1.16.0 将 WSL 原生的 `/mnt/c/` 转换为 Windows `C:\` 路径，导致文件列表和会话状态损坏。
5. **[Server 模式长时间运行导致严重的内存堆积] (#33213)** | 👍: 0 | 评论: 5
   * **关注原因**：`opencode serve` 长时间运行（约 1.5 天）后内存峰值达到惊人的 26.8 GiB。高频使用 JS 堆和 JIT 编译导致严重的内存碎片化，暴露出服务端部署的稳定性隐患。
6. **[Desktop 渲染进程致命崩溃 (404)] (#32473)** | 👍: 0 | 评论: 4
   * **关注原因**：当本地数据库缺少历史会话 ID 时，Desktop 渲染层抛出未捕获的 404 错误，导致整个应用启动即崩溃。这指向了客户端缺乏数据校验的降级处理机制。
7. **[GLM-5.2 会话崩溃：模型误用截图能力] (#34113)** | 👍: 2 | 评论: 3
   * **关注原因**：Agent 在使用纯文本模型（GLM-5.2）时，错误地触发了视觉截图技能，导致会话直接中断。暴露出 Agent 工具调用前缺乏对当前模型能力度的探测。
8. **[NVIDIA NIM Nemotron 3 Ultra 550B 请求挂起] (#34026)** | 👍: 0 | 评论: 3
   * **关注原因**：Top 级开源大模型接入时在“思考阶段”无限挂起，且无超时反馈，影响了对前沿模型的首发支持体验。
9. **[Agent 工作时模型选择被静默覆盖] (#34207)** | 👍: 0 | 评论: 4
   * **关注原因**：严重的产品逻辑 Bug。用户在 Agent 提问时切换更高级的模型，系统会在回答时静默回退到旧模型，破坏了用户的信任和控制感。
10. **[Cloudflare Workers AI 缺少 Account ID 配置] (#34269)** | 👍: 0 | 评论: 2
    * **关注原因**：Desktop 客户端在接入特定厂商（如 Cloudflare）时 UI 字段缺失，阻断了服务接入。

---

### 4. 重要 PR 进展 (Top 10)
今日的 PR 集中在增强 TUI 健壮性、修复跨端路径问题以及丰富 Agent 工具生态：

1. **[feat(tools): 添加系列 Agent 工具] (#34273)**
   * **内容**：为 Agent 增加了 Git、代码格式化、诊断、LSP 重命名以及记忆/历史检索等高级工具，极大增强了 AI 自主编程的能力边界。
2. **[feat(app): V2 版 WSL UI 交互] (#34233)**
   * **内容**：全面重构了 Windows/WSL 交互的 UI 组件，引入了 `button-v2` 和 `loader-v2`，这是彻底解决近期 WSL 路径频发问题的前端基础。
3. **[fix(tui): 阻止管道标准输入破坏 UI 和键盘事件] (#34242)**
   * **内容**：修复了多个历史遗留 Issue（#28538 等），确保 TUI 在接收外部管道传入数据时不会卡死键盘监听。
4. **[fix(app): 隔离会话页面级错误] (#34254)**
   * **内容**：在页面主面板引入 ErrorBoundary。当单个会话读取失败（如上述 Issue #32473 的 404 错误）时，不再导致整个 Tab 栏崩溃，提升了应用韧性。
5. **[fix(server): 拦截外部目录提示路径] (#34256)**
   * **内容**：在实例查找之前增加校验，直接修复了近期频发的 Desktop/WSL 之间的路径串联错误问题。
6. **[fix: 保留附件文件的真实系统路径] (#34234)**
   * **内容**：修复了拖拽或粘贴附件时只保留 base64 数据而丢失本地路径的问题，使得 Agent 能够在后续主动读取原文件。
7. **[feat(tui): 添加会话重命名功能] (#34264)**
   * **内容**：端到端实现了期待已久的会话重命名功能（包含底层数据库、API 接口和前端通信）。
8. **[fix(tui): 支持 Wayland 系统的剪贴板读取] (#29881)**
   * **内容**：修复了在无 xsel/xclip 的原生 Wayland 环境下，Ctrl+V 粘贴文本静默失败的问题，改用 `wl-paste`。
9. **[[contributor] fix(core): 恢复 V2 模型提示词] (#34275) by @opencode-agent[bot]**
   * **内容**：由 AI Bot 提交的代码，将旧版特定提供商的系统提示词迁移至 V2 运行时核心，保证升级后模型的初始人格和行为逻辑不退化。
10. **[fix: 在 message() 管道末端增加空内容守卫] (#34272)**
    * **内容**：在底层大模型请求出口处增加了与提供商无关的空内容拦截器，防止因上游 API 返回空数据而导致的解析崩溃。

---

### 5. 功能需求趋势
从近期 Issue 和 PR 的走向来看，社区需求呈现以下几大趋势：
* **跨平台环境深度融合（尤其是 Windows + WSL）**：大量开发者使用 Windows 作为宿主机运行 WSL 进行开发。社区极度渴望 Desktop App 与 WSL Server 之间能有一套无缝、透明的文件系统和路径映射机制。
* **前沿大模型的极速适配**：开发者对最新模型的跟进速度要求极高。GLM-5.2、Kimi 2.6、Nemotron-3-Ultra 等模型发布后，社区立刻涌现接入 Bug。模型能力探测（如自动识别是否支持视觉/思考链）成为急迫需求。
* **企业级环境与部署能力**：关于 Server 模式的内存泄漏问题和长时运行稳定性的反馈，表明 OpenCode 正在被企业级团队重度使用（甚至作为常驻服务运行），对于资源精细化管理的要求日益提升。
* **微调与 Token 成本控制**：针对 OpenRouter 等聚合 API 的计费拦截、Minimax-M3 思考链不合理输出等问题，说明用户对 Token 成本和上下文消耗极其敏感。

### 6. 开发者关注点（高频痛点）
1. **应用级崩溃容错差**：一个小错误（如丢失文件路径、数据库找不到 ID、API 返回空值）就会直接导致 TUI 卡死或 Desktop 渲染进程整体崩溃（白屏），缺乏局部错误的优雅降级。
2. **Agent 的自洽能力**：AI 会尝试调用当前模型不支持的工具（如纯文本模型尝试看图），或者在多轮对话中“悄悄”篡改用户指定的目标模型。开发者希望 AI 的行为具有更高的透明度和确定性。
3. **资源占用过高**：无论是在桌面端（高达 30%-50% 的 CPU 占用）还是服务端（动辄几十 G 的内存峰值），Bun 运行时和 JS 阻塞带来的性能开销让重负载用户感到头疼。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Qwen Code 社区动态日报 - 2026年06月28日**

### 1. 今日速览
今日 Qwen Code 发布了 `v0.19.2-nightly` 版本，核心修复了 `web_fetch` 的 JSON 回退机制。社区当前焦点高度集中在**跨设备状态同步**（如 Todos/Memories 接入 Git）、**Token 消耗与成本控制**（如避免缓存失效、上下文超限）以及**后台自动化任务的可见性**（如 `/loop` 任务管理）。

### 2. 版本发布
*   **[v0.19.2-nightly.20260628.714513df2](https://github.com/QwenLM/qwen-code/releases)**
    *   **修复:** 允许 `web_fetch` 在解析失败时回退到 JSON 格式，提升网页抓取的容错率 (PR [#5660](https://github.com/QwenLM/qwen-code/pull/5660))。

### 3. 社区热点 Issues (Top 10)
1.  **[#5819](https://github.com/QwenLM/qwen-code/issues/5819) 升级后默认偷偷使用高价模型导致额外扣费**
    *   *关注点:* 高优 Bug。用户反馈系统自动升级后，将配置悄无声息地改为了高价值模型导致额度耗尽，同时伴随中文繁简转换异常。涉及核心的配置安全与用户信任问题。
2.  **[#5836](https://github.com/QwenLM/qwen-code/issues/5836) 请求 Todos/Plans 支持持久化到项目内以便跨设备同步**
    *   *关注点:* 高频需求。目前任务清单默认存在 `~/.qwen/`，用户强烈希望能落入 `.qwen/todos` 以便通过 Git 进行版本控制和多端协同。
3.  **[#5942](https://github.com/QwenLM/qwen-code/issues/5942) Anthropic Provider 频繁导致 Prompt-cache 失效，推高调用成本**
    *   *关注点:* 性能与成本。指出 Qwen Code 在处理侧边查询和末尾消息时导致缓存命中率极低，相同后端下成本远高于 Claude Code。
4.  **[#5823](https://github.com/QwenLM/qwen-code/issues/5823) `/loop` Cron 定时任务“静默触发”，缺乏可见性**
    *   *关注点:* 自动化体验。定时任务触发时模型不可视，也无法自主停止任务，容易引发“失控”恐慌。
5.  **[#5922](https://github.com/QwenLM/qwen-code/issues/5922) Windows 环境下 `cua-driver.exe` 疑似进程泄漏 (占用高 CPU)**
    *   *关注点:* 系统级 Bug。`computer_use` 相关的驱动程序在 Agent 空闲时依然在后台运行并消耗大量 CPU 资源。
6.  **[#5941](https://github.com/QwenLM/qwen-code/issues/5941) 大模型输出时向上滚动视图异常跳动**
    *   *关注点:* UI 交互体验。在生成内容时轻微滚动鼠标会导致视图直接回到最顶部，严重影响代码审查体验。
7.  **[#5756](https://github.com/QwenLM/qwen-code/issues/5756) 默认 8K 输出上限导致大文件写入反复重试**
    *   *关注点:* 核心逻辑缺陷。`write_file` 等大型生成任务被硬编码上限截断，引发死循环重试，浪费大量 Token。
8.  **[#5950](https://github.com/QwenLM/qwen-code/issues/5950) 131072 Token 限制导致 400 内部错误**
    *   *关注点:* 上下文管理。当请求 Tokens 超出上下文窗口时，系统未自动触发压缩机制，而是直接报错中断。
9.  **[#5894](https://github.com/QwenLM/qwen-code/issues/5894) Edit 工具的 Diff 结果摘要被重复注入后续对话**
    *   *关注点:* 上下文污染。修改文件后的结果摘要被死循环般附加到随后的每一次回答中。
10. **[#5626](https://github.com/QwenLM/qwen-code/issues/5626) 提案：基于 Daemon 架构复活 Chrome 扩展**
    *   *关注点:* 生态扩展。社区正在积极推进依托 `qwen serve` 守护进程重构浏览器插件，打通浏览器侧的 Agent 能力。

### 4. 重要 PR 进展 (Top 10)
1.  **[#5928](https://github.com/QwenLM/qwen-code/pull/5928) feat(config): 支持将 Todos 持久化到项目本地目录**
    *   *价值:* 直接回应 Issue #5836，引入 `todosDirectory` 设置，允许将任务状态存入 `.qwen/todos` 以实现 Git 同步。
2.  **[#5890](https://github.com/QwenLM/qwen-code/pull/5890) feat(loop): 通过 `.qwen/loop.md` 注入定时任务上下文**
    *   *价值:* 解决长时间运行的后台任务状态丢失问题，允许用户中途编辑和持久化 Cron 任务的指令。
3.  **[#5777](https://github.com/QwenLM/qwen-code/pull/5777) feat(browser-ext): 基于直连守护进程架构重构 Chrome 扩展**
    *   *价值:* 将浏览器扩展从 Native Messaging 宿主重构为 HTTP+SSE 的轻量级客户端，大幅提升响应速度与稳定性。
4.  **[#5946](https://github.com/QwenLM/qwen-code/pull/5946) fix(core): 隔离 Anthropic SDK Abort 监听器内存泄漏**
    *   *价值:* 修复了 Anthropic 生成器中调用者中止信号导致的内存泄漏问题，提升长对话稳定性。
5.  **[#2652](https://github.com/QwenLM/qwen-code/pull/2652) refactor: 使用 tree-sitter AST 替换字符串解析 Shell 命令**
    *   *价值:* 底层大重构。利用 AST 彻底解决复杂 Shell 命令（嵌套引号、heredoc等）的解析痛点，极大增强权限校验和安全防御。
6.  **[#5944](https://github.com/QwenLM/qwen-code/pull/5944) fix(core): 阻止模型反复调用相似的只读 Shell 检查命令**
    *   *价值:* 增加 Always-on 循环守卫，当模型陷入不断执行 `git status` / `git diff` 的死循环时主动阻断，节约 Token。
7.  **[#5888](https://github.com/QwenLM/qwen-code/pull/5888) feat(channels): 引入多人频道常驻 Agent (`qwen tag`)**
    *   *价值:* 针对 DingTalk 等聊天群组设计的频道级多用户 Agent 架构（RFC + Phase 0）。
8.  **[#5868](https://github.com/QwenLM/qwen-code/pull/5868) feat(core): 增加可配置的 Auto-compact（自动压缩）阈值**
    *   *价值:* 允许开发者动态调整上下文压缩触发的时机，优化长会话的 Token 消耗。
9.  **[#5856](https://github.com/QwenLM/qwen-code/pull/5856) feat(desktop): 桌面端引入语音听写功能**
    *   *价值:* 将 CLI/Web Shell 中的 `/voice` 特性移植到桌面端，提供麦克风录入及波形展示。
10. **[#5879](https://github.com/QwenLM/qwen-code/pull/5879) feat(web-shell): 在 Web 端 `/mcp` 对话框中浏览 MCP 资源**
    *   *价值:* 补齐 Web Shell 端的 MCP 管理能力，使其与 TUI 终端体验对齐。

### 5. 功能需求趋势
*   **状态同步与 Git 集成化:** 社区强烈要求打破单机限制，推动 Task Lists、Plans 和 Memories 等运行时状态向项目级别（`.qwen/` 目录

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*