# AI CLI 工具社区动态日报 2026-07-11

> 生成时间: 2026-07-11 03:45 UTC | 覆盖工具: 7 个

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

以下是为您定制的 2026 年 7 月 11 日主流 AI CLI 工具社区动态横向对比分析报告：

# 2026-07-11 AI CLI 工具生态横向对比分析报告

## 1. 生态全景
当前 AI CLI 工具正全面从“单一代码生成”向**多智能体协作与长时任务自动化**演进，但随之而来的**资源失控**（如磁盘打满、Token 枯竭、进程死锁）成为各工具亟待解决的共同痛点。在底层架构上，**安全沙盒隔离、凭据保护与跨平台（特别是 Windows）兼容性**正在奠定企业级可用性的基础。同时，**BYOK（自带密钥）、动态模型路由与 MCP（Model Context Protocol）深度集成**已成为开发者衡量工具开放性的核心指标。

## 2. 各工具活跃度对比
今日各工具社区的代码与 Issue 交互呈现出不同的侧重点与迭代节奏：

| 工具名称 | 今日版本发布 | 热点 Issues 数 | 重要 PR 数 | 核心聚焦领域 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | v2.1.207 (正式版) | Top 10 | 6 | 云平台 Auto 模式普及、子代理/磁盘资源防雪崩、插件安全加固 |
| **OpenAI Codex** | 2个 (Alpha预览版) | Top 10 | 10 | 底层 Rust 重构、GPT-5.5/5.6 推理优化与资源损耗修复 |
| **Gemini CLI** | 无 | Top 10 | 10 | AST 感知代码搜索、Auto Memory 脱敏、多代理死锁修复 |
| **GitHub Copilot CLI**| v1.0.71-0 (预览版) | Top 10 | 1 | TUI 渲染修复、BYOK 动态切换、MCP OAuth 兼容 |
| **OpenCode** | 无 | Top 10 | 10 | 多平台拓展、并发鉴权防护、vLLM/多供应商兼容 |
| **Qwen Code** | 2个 (正式版+ nightly)| Top 10 | 6 | 单 Daemon 多工作区架构、Web Shell 体验升级 |
| **Kimi Code CLI** | 无 | 0 | 4 | 核心状态隔离防污染、新手 Onboarding 体验优化 |

## 3. 共同关注的功能方向
通过对多社区数据的交叉比对，以下四大方向成为行业共识：
* **子代理生命周期的强管控**：
  - **Claude Code** 和 **Qwen Code** 均在紧急修复子代理无限递归导致的死循环与 Token 雪崩；**Gemini CLI** 和 **OpenAI Codex** 也在解决子代理隐瞒中断错误、卡死以及父子模型强制绑定的痛点。
* **本地凭据保护与安全防御**：
  - **Claude Code** 与 **OpenCode** 同时修复了通过软链接劫持 `auth.json` 或本地凭据覆盖的高危漏洞；**Codex** 曝光了 Shell 快照明文持久化凭据的风险；**Gemini CLI** 则在推进 Auto Memory 的前置确定性脱敏。
* **BYOK（自带密钥）与多模型动态调度**：
  - **GitHub Copilot CLI** 和 **OpenAI Codex** 社区强烈呼吁在同一会话内灵活切换本地/云端模型，并支持自定义 HTTP Headers；**OpenCode** 则通过 PR 落地了 API Keys 的动态轮换机制。
* **长时/异步任务与并发处理**：
  - **Claude Code** 呼吁在 MCP 中实现异步任务机制以突破 60 秒超时限制；**Qwen Code** 探索单 Daemon 多工作区并发；**OpenCode** 增加了子代理互相委派及持久化会话功能。

## 4. 差异化定位分析
* **Claude Code**：**企业级自动化与云端原生**。深度绑定 Bedrock/Vertex AI 等云服务，Auto 模式和 Remote Control 走在前列，致力于打造“后台无人值守”的 Agent 形态。
* **OpenAI Codex**：**底层极致重构与推理优化**。聚焦于 Rust 内核打磨，对 GPT-5.5/5.6（Sol/Luna）等新模型的 Token 消耗与推理边界进行精细化控制，强依赖 OpenAI 生态。
* **Gemini CLI**：**代码理解深化与原生沙盒**。倾向于底层系统级交互，探索 AST（抽象语法树）感知以减少 Token 噪声，并推动 OS 级沙盒释放 POSIX 工具链能力。
* **GitHub Copilot CLI**：**细粒度权限控制与 UI 体验**。更加聚焦会话作用域（Repo 级）和开发者的 TUI 交互体验，强调与微软系及第三方企业服务（如 Atlassian）的 MCP 无缝对接。
* **OpenCode**：**中立底座与多平台拓展**。定位为高度兼容的开放框架（支持 LiteLLM、vLLM），不局限于终端，正向移动端/Web 端及桌面内置浏览器拓展。
* **Qwen Code**：**工作区重构与 Web 端平权**。致力于打破 1:1 的进程工作区限制，且在快速重构 Web Shell 体验，试图将桌面端的富文本交互降维打击到 CLI。

## 5. 社区热度与成熟度
* **第一梯队（成熟稳健，问题集中爆发）**：**Claude Code** 与 **OpenAI Codex** 讨论热度最高。它们的架构已经触及深水区——如 Codex 面临的 SQLite 日志写坏 SSD、Claude 面临的后台任务烧掉百万 Token。这说明工具已被用于高强度的生产环境，但亟待补齐系统级资源管控。
* **第二梯队（高频迭代，架构重构中）**：**Gemini CLI**、**OpenCode** 与 **Qwen Code**。今日均有高达 10 个活跃 PR，正处于频繁修补致命 Bug（死锁、内存泄漏、鉴权竞态）和探索新架构（如多工作区、多代理委派）的高速成长期。
* **第三梯队（稳健打磨，细节驱动）**：**GitHub Copilot CLI** 与 **Kimi Code CLI**。重心相对落在开发者 UI 体验、安装引导报错优化以及跨端（尤其是 Safari/Web 端）输入法兼容等“最后一公里”问题上。

## 6. 值得关注的趋势信号
* **“AI 进程”正在成为系统级破坏者**：社区高频反馈的“卡死”、“磁盘打满”、“百万 Token 消耗”表明，AI Agent 已具备了强大的系统破坏力。**对开发者的启示**：未来在 CI/CD 或生产环境中部署 AI CLI 时，必须强制引入外部的 OS 级 Cgroups 资源限额与硬超时熔断机制，不能仅靠模型自身的“节制”。
* **凭据劫持与 Prompt 注入成为新战场**：多个工具同时暴露出软链接覆盖、Shell 快照泄露密钥、Issue 标题注入等安全漏洞。**对开发者的启示**：在利用自动化插件或处理外部数据源（如抓取 GitHub Issues）时，必须对 AI 上下文环境进行严格的权限降级（如使用隔离的用户身份运行 CLI）。
* **AST 感知与多模型混编是降本核心**：Gemini 探索 AST 解析以减少 Token 噪声，开发者呼吁父模型重推理+子模型轻执行。**对开发者的启示**：纯文本代码喂给大模型的方式成本极高且容易幻觉。引入 AST 工具链，以及通过 BYOK 路由将不同复杂度的任务分发给不同权重的模型，是接下来优化 AI 编码成本的技术突破口。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

这份报告基于 `anthropics/skills` 官方仓库截止至 2026-07-11 的数据，为您梳理 Claude Code Skills 生态的最新动态与社区焦点。

### 1. 热门 Skills 排行 (Top Pull Requests)
虽然近期多数高热度 PR 集中在底层修复与工程化优化，但以下 PR 因解决了核心痛点或拓展了全新能力而备受瞩目：

1. **[PR #1298] Skill-Creator 核心修复：解决评估器 0% Recall 致命 Bug**
   - **功能/状态**: 修复了 `run_eval.py` 在所有测试中报告 0% 召回率的问题，并同步解决了 Windows 流读取和并行 Worker 的严重缺陷。
   - **讨论热点**: 该 PR 直接解决了社区高度复现的 Issue #556。由于此 Bug 导致 Skills 的描述优化循环一直在“针对噪音进行优化”，严重阻碍了新 Skills 的开发，因此成为近期最重要的底层修复之一。（状态: OPEN）
   - 链接: https://github.com/anthropics/skills/pull/1298
2. **[PR #1367] 新增 self-audit 技能：AI 输出自我审计**
   - **功能/状态**: 引入“机械验证+四维推理”的双重质量门禁。在 AI 交付输出前，强制验证文件是否存在，并按严重程度进行逻辑审计。
   - **讨论热点**: 对应社区 Issue #1385，体现了社区对“AI 自我纠错与交付质量把控”的强烈需求。（状态: OPEN）
   - 链接: https://github.com/anthropics/skills/pull/1367
3. **[PR #514] 新增 document-typography 技能：文档排版质检**
   - **功能/状态**: 自动修复 AI 生成文档中的常见排版问题（如孤行、寡段、编号错位）。
   - **讨论热点**: 完美补足了 AI 生成内容“重内容、轻排版”的痛点，属于体验极大提升的实用性 Skills。（状态: OPEN）
   - 链接: https://github.com/anthropics/skills/pull/514
4. **[PR #83] 新增 skill-quality-analyzer 与 skill-security-analyzer**
   - **功能/状态**: 为 Marketplace 增加两个“元技能”，用于对其他 Claude Skills 进行五维度质量打分和安全漏洞分析。
   - **讨论热点**: 随着第三方 Skills 增多，安全与质量把控成为共识，此 PR 提供了自动化审计方案。（状态: OPEN）
   - 链接: https://github.com/anthropics/skills/pull/83
5. **[PR #210] 优化 frontend-design 技能的清晰度与可执行性**
   - **功能/状态**: 重构前端设计技能的 Prompt，使其指令在单次会话中更具可执行性和精确性。
   - **讨论热点**: 探讨了如何编写高效的 Skill 指令以精准控制 Claude 的行为，是 Prompt Engineering 的优秀范例。（状态: OPEN）
   - 链接: https://github.com/anthropics/skills/pull/210

### 2. 社区需求趋势 (社区 Issues 洞察)
从高讨论量的 Issues 来看，社区对 Skills 的需求已从“功能实现”转向“安全、协作与企业级落地”：

- **安全信任与命名空间隔离**：[Issue #492 (34评论)](https://github.com/anthropics/skills/issues/492) 暴露出巨大的安全隐患。社区强烈要求禁止第三方 Skills 使用 `anthropic/` 命名空间，以防用户在不知情的情况下授予恶意技能高级权限。
- **企业级与团队协作共享**：[Issue #228 (14评论)](https://github.com/anthropics/skills/issues/228) 呼吁在 Claude.ai 中实现组织级别的 Skills 共享库。目前靠手动分发 `.skill` 文件的方式严重阻碍了团队推广。
- **AI Agent 自身的状态与治理**：[Issue #1329](https://github.com/anthropics/skills/issues/1329) 提出 `compact-memory`（压缩上下文记忆）需求；[Issue #412](https://github.com/anthropics/skills/issues/412) 提议构建 `agent-governance`（代理治理：信任评分、审计追踪）。这说明长任务 Agent 的记忆管理和安全边界是当前的迫切需求。
- **Skill 转 MCP 协议标准化**：[Issue #16 (4评论)](https://github.com/anthropics/skills/issues/16) 提出了极具前瞻性的建议，希望将 Skills 包装为标准化的 MCP (Model Context Protocol) 暴露给外部软件调用。

### 3. 高潜力待合并 Skills (High-Potential Merges)
以下处于 OPEN 状态的 PR 修复了高频 Bug 或填补了关键空白，具有极高的合并价值，近期有望落地：

- **[PR #538] & [PR #541] PDF/DOCX 核心解析与渲染修复**
  - 修复了 PDF 中跨大小写敏感系统的文件引用失效问题，以及 DOCX 中追踪修订与现有书签的 `w:id` 冲突（导致文档损坏）。这些是官方文档处理套件的关键除错，合并优先级极高。
  - 链接: https://github.com/anthropics/skills/pull/538 , https://github.com/anthropics/skills/pull/541
- **[PR #362] 解决多字节字符 UTF-8 Panic 问题**
  - 非英语（如中文）环境下，`quick_validate.py` 常因按字符断字导致 Rust 底层崩溃。此 PR 引入了字节级安全验证，对全球化 Skills 生态至关重要。
  - 链接: https://github.com/anthropics/skills/pull/362
- **[PR #1302] 新增 color-expert 技能**
  - 一个高度封装的调色板与色彩学技能，涵盖了从色彩空间（OKLCH/CAM16）到各类命名系统的完整知识库，非常适合数据可视化与前端UI生成。
  - 链接: https://github.com/anthropics/skills/pull/1302

### 4. Skills 生态洞察
**当前社区在 Skills 层面最集中的诉求是：建立可靠的跨平台执行环境与安全边界（修复 Windows/评估器底层 Bug、隔离非官方信任域），并实现从“单次生成”向“自我审计与组织级协作复用”的工程化升级。**

---

这里是 2026-07-11 的 Claude Code 社区动态日报。

### 1. 今日速览
今日 Claude Code 发布了 **v2.1.207** 版本，正式在主流云服务平台（Bedrock、Vertex AI、Foundry）默认开启 Auto 模式，并修复了困扰多时的长文本输出导致终端卡顿的问题。社区今日焦点集中在**资源与成本失控**（子代理无限递归、磁盘被日志打满、后台任务无法终止烧掉百万 Token）以及**插件脚本的安全性漏洞**（YAML 注入与凭证覆盖）。

---

### 2. 版本发布
**[v2.1.207](https://github.com/anthropics/claude-code/releases)**
* **云平台 Auto 模式默认启用**：在 Bedrock、Vertex AI 和 Foundry 中，Auto 模式无需再手动配置 `CLAUDE_CODE_ENABLE_AUTO_MODE` 即可使用（可通过 `disableAutoMode` 设置关闭）。
* **终端性能修复**：修复了在流式输出包含超长列表、表格或段落时，导致的终端冻结和键盘输入延迟问题。

---

### 3. 社区热点 Issues (Top 10)

1. **[#69238](https://github.com/anthropics/claude-code/issues/69238) | [Bug] Advisor 触发时 API 无响应**
   * **动态**：热度最高（76 👍）。使用 Sonnet 时触发 Opus 4.8 的 Advisor 频繁报网络错误，严重干扰常规开发。
2. **[#74649](https://github.com/anthropics/claude-code/issues/74649) | [Bug] Cowork 在 Windows 11 Pro 无法运行**
   * **动态**：因缺少 HCS 服务 (`vfpext`)，Windows 用户的 Cowork 功能大面积瘫痪，引发大量讨论（43 评论）。
3. **[#68110](https://github.com/anthropics/claude-code/issues/68110) | [Bug] 通用子代理无限递归导致 Token 指数级燃烧**
   * **动态**：核心痛点。子代理被允许调用 `Agent` 工具产生自身子代理，引发雪崩效应。缺乏深度和数量限制是架构层面的隐患。
4. **[#41737](https://github.com/anthropics/claude-code/issues/41737) | [Bug] 任务输出文件几分钟内耗尽 278GB 磁盘空间**
   * **动态**：致命级 Bug。Claude Code 在 `/private/tmp/claude...` 下的任务输出文件无限制增长，直接导致系统磁盘耗尽崩溃。
5. **[#75314](https://github.com/anthropics/claude-code/issues/75314) | [Bug] 10 个后台 Agent 任务运行 34+ 小时无法取消**
   * **动态**：后台任务失去控制，无法终止，导致白白消耗约 100 万 Token，暴露了任务生命周期的控制缺陷。
6. **[#6305](https://github.com/anthropics/claude-code/issues/6305) / [#69970](https://github.com/anthropics/claude-code/issues/69970) | [Bug] Hooks (Pre/PostToolUse) 未执行**
   * **动态**：自动化流程断层。多个版本中存在已注册的 Bash Hooks 静默失效的问题，严重影响了 CI/CD 和安全拦截工作流。
7. **[#76580](https://github.com/anthropics/claude-code/issues/76580) | [Security] 插件脚本存在 YAML 注入和软链接凭证覆盖风险**
   * **动态**：今日新报出的安全漏洞。官方插件脚本处理不当，可能被恶意利用覆盖本地凭证。
8. **[#66269](https://github.com/anthropics/claude-code/issues/66269) | [Bug] 复制终端中的中文 (CJK) 内容出现乱码**
   * **动态**：中文开发者强相关。全屏防闪烁渲染器 (`tui: fullscreen`) 导致从终端复制出来的文本变为乱码（Mojibake）。
9. **[#76571](https://github.com/anthropics/claude-code/issues/76571) | [Feature] 在 MCP 客户端中实现 SEP-1686 (异步任务)**
   * **动态**：架构级需求。目前 MCP 工具调用是同步的，超过 60 秒即超时，开发者呼吁支持长时间运行的任务机制。
10. **[#76554](https://github.com/anthropics/claude-code/issues/76554) | [Feature] 将 Remote Control 引入桌面原生应用**
    * **动态**：CLI 端的 Remote Control 已经成熟，桌面端用户呼吁尽快实现多端功能对齐。

---

### 4. 重要 PR 进展 (共 8 条)

今日的 PR 集中在**安全加固**与**生态兼容性**上：

1. **[PR #76581](https://github.com/anthropics/claude-code/pull/76581) | 强化插件脚本的 YAML、路径与软链接处理**
   * 修复了 Issue #76580 中的安全隐患，阻止了路径遍历和基于软链接的凭证覆盖攻击。
2. **[PR #76576](https://github.com/anthropics/claude-code/pull/76576) | 对齐插件文档与 v2.1.207 的注入修复**
   * 跟进今日发布版本的 shell 注入修复，更新了 `${user_config.*}` 相关的安全文档和验证器。
3. **[PR #76475](https://github.com/anthropics/claude-code/pull/76475) | 安全规则补充 `innerHTML +=` 漏网之鱼**
   * 增强了 `security-guidance` 插件，拦截通过 `+=` 追加方式的 XSS 攻击。
4. **[PR #76394](https://github.com/anthropics/claude-code/pull/76394) | 新增 Windows CLI 启动器**
   * 社区贡献者为 Windows 用户开发了一个功能丰富的 PowerShell CLI 启动面板。
5. **[PR #76298](https://github.com/anthropics/claude-code/pull/76298) | 文档更新：Remote Control 后台任务面板**
   * 补充了 v2.1.205 引入的 Web/移动端后台任务同步功能的用户文档。
6. **[PR #76289](https://github.com/anthropics/claude-code/pull/76289) | 增强 Bash 验证器示例：复合命令拦截**
   * 示例 Hook 更新，现在能够识别并拦截 `;`, `&&`, `||` �

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

这是一份为您定制的 2026 年 7 月 11 日 OpenAI Codex 社区动态技术分析师日报。

---

# 📰 OpenAI Codex 社区动态日报 (2026-07-11)

## 1. 今日速览
今日 Codex 核心引擎连续发布了 `0.145.0-alpha.3` 和 `0.145.0-alpha.4` 两个预览版，重点推进了底层系统的代码重构与性能优化。社区侧，**GPT-5.5 推理 token 聚集导致性能下降**的 Bug 引爆热议（183条评论），同时**子智能体模型绑定限制**以及 **Windows 沙盒机制频繁报错**成为了开发者群体中最突出的痛点。

## 2. 版本发布
今日共发布 2 个 Rust 核心预发布版本，主要聚焦于底层打磨：
*   **rust-v0.145.0-alpha.4** ([Release Notes](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.4))
*   **rust-v0.145.0-alpha.3** ([Release Notes](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.3))

## 3. 社区热点 Issues (Top 10)
以下是过去 24 小时内互动量最高、最具代表性的 Issues，反映出当前产品亟待解决的瓶颈：

1.  **[性能崩塌] GPT-5.5 推理 token 异常聚集现象** (👍 284 | 💬 183)
    *   [Issue #30364](https://github.com/openai/codex/issues/30364)
    *   **分析：** 开发者发现 GPT-5.5 的 `reasoning_output_tokens` 会卡在 516、1034、1552 等固定边界值，导致在复杂任务上“过早停止思考”，是当前最受关注的模型行为异常。
2.  **[硬件损耗] SQLite 反馈日志一年可写 640TB** (👍 431 | 💬 144)
    *   [Issue #28224](https://github.com/openai/codex/issues/28224)
    *   **分析：** 虽然该问题已通过几个 PR 修复（减少了 85% 的日志），但其引发的 SSD 寿命焦虑依然是社区高赞话题。
3.  **[架构限制] GPT-5.6 Sol 强制子智能体降级** (👍 85 | 💬 35)
    *   [Issue #31814](https://github.com/openai/codex/issues/31814)
    *   **分析：** 模型元数据强制开启了 `multi_agent_version = "v2"`，导致用户无法为 Subagent 分配其他模型，严重阻碍了多智能体混合调度。
4.  **[Windows 兼容] 桌面端频繁卡顿与掉帧** (👍 45 | 💬 33)
    *   [Issue #20214](https://github.com/openai/codex/issues/20214)
    *   **分析：** 即使在 32GB 内存和高性能 CPU 的 Windows 11 环境下，Codex App 依然存在严重的资源调度卡顿。
5.  **[Windows 沙盒] 原生沙盒设置辅助程序频频报错** (👍 12 | 💬 33)
    *   [Issue #28982](https://github.com/openai/codex/issues/28982)
    *   **分析：** Windows App 更新至 26.616 后，沙盒启动报错“找不到指定模块”，阻碍了 Plus 用户的基础体验。
6.  **[MCP 服务] 桌面端新会话缺少 `inputSchema` 报错** (👍 33 | 💬 28)
    *   [Issue #28978](https://github.com/openai/codex/issues/28978)
    *   **分析：** 6月18日更新后，桌面端与 MCP 服务端的通信协议出现断层，而使用相同配置的 CLI 端则一切正常。
7.  **[安全漏洞] Shell 快照明文持久化凭据风险** (💬 3)
    *   [Issue #30971](https://github.com/openai/codex/issues/30971) / [Issue #32327](https://github.com/openai/codex/issues/32327)
    *   **分析：** 多个 Issue 指出，Codex 在写入 Shell 快照时，黑名单仅排除了 `PWD/OLDPWD`，导致云服务商 API Keys 可能被明文写入磁盘，引发安全担忧。
8.  **[致命循环] Codex 创建的任务导致 ChatGPT 无限重启** (💬 3)
    *   [Issue #32321](https://github.com/openai/codex/issues/32321)
    *   **分析：** macOS 下的 `launchctl` 重启任务变成了 keepalive 循环，导致主程序 ChatGPT 被不断终止，属于阻断级 Bug。
9.  **[功能诉求] 支持为子智能体单独指定模型/服务商** (👍 15 | 💬 10)
    *   [Issue #14039](https://github.com/openai/codex/issues/14039)
    *   **分析：** 开发者强烈希望能打破子智能体与父会话的模型强绑定，实现“父模型用高阶推理，子模型用轻量级执行”的降本架构。
10. **[UI 体验] 桌面端长对话滚动闪烁与重叠** (👍 3 | 💬 8)
    *   [Issue #32016](https://github.com/openai/codex/issues/32016)
    *   **分析：** 随着上下文变长，内置聊天窗口的渲染性能急剧下降，影响正常阅读。

## 4. 重要 PR 进展 (Top 10)
近期合并或更新的 Pull Requests 显示了团队的修复进度与功能演进方向：

1.  **[多智能体] 允许限制子智能体环境** - [PR #31662](https://github.com/openai/codex/pull/31662)
    *   为 `spawn_agent` 新增 `environment_ids`，支持父节点精准控制子节点的运行环境与能力边界。
2.  **[云端集成] GPT-5.6 Sol 成为 Amazon Bedrock 默认模型** - [PR #32288](https://github.com/openai/codex/pull/32288)
    *   Bedrock 静态目录权重调整，标志着 OpenAI 正在加速推进 5.6 系列模型在企业级云服务上的落地。
3.  **[性能优化] 大幅减少冗余的文件系统调用** - [PR #31514](https://github.com/openai/codex/pull/31514)
    *   通过直接写入临时文件、使用 symlink 元数据等方式，减少了重-stat 操作，大幅提升文件索引速度。
4.  **[性能优化] 加速反向历史记录搜索** - [PR #30887](https://github.com/openai/codex/pull/30887)
    *   优化了 `history.jsonl` 的扫描与锁定逻辑，解决了长对话下历史记录回溯的严重卡顿。
5.  **[跨平台] 应用补丁时保留原始换行符** - [PR #30882](https://github.com/openai/codex/pull/30882)
    *   引入 `apply_patch_preserve_line_endings` 特性开关，重点解决 Windows 环境下代码 diff 产生非预期 CRLF/LF 转换的问题。
6.  **[安全与规范] 强制出站响应项 ID 添加前缀** - [PR #32312](https://github.com/openai/codex/pull/32312)
    *   引入 `ResponseItemId` 类型，要求 ID 必须以特定前缀（如 `msg_`）开头，规范了上下文历史传输的合法性。
7.  **[架构解耦] 尊重模型对推理摘要的支持情况** - [PR #32290](https://github.com/openai/codex/pull/32290)
    *   模型元数据增加 `supports_reasoning_summary_parameter` 字段。若模型不支持，则自动剥离相关参数，增强了非 OpenAI 原生模型的兼容性。
8.  **[IDE 集成] 优先使用 Codex 主套接字进行 Unix IDE 通信** - [PR #32302](https://github.com/openai/codex/pull/32302)
    *   改进了 IDE 环境下上下文获取的链路，优先连接 `CODEX_HOME/ipc/ipc.sock`，提升了跨进程通信的稳定性。
9.  **[Hooks 机制] 支持来自工作区插件的受信任 Hooks** - [PR #32301](https://github.com/openai/codex/pull/32301)
    *   为工作区远程插件增加哈希记录与刷新回调，使得动态加载的插件能够安全地触发生命周期 Hooks。
10. **[开发者体验] 为中断的会话新增 Advisory Interrupt Hooks** - [PR #26259](https://github.com/openai/codex/pull/26259)
    *   区分了 `Stop`（主动停止）与 `Interrupt`（被动打断），允许开发者在打断时获取上下文而不阻塞执行流。

## 5. 功能需求趋势
综合本期 Issue 与 PR，当前社区功能关注点呈现以下

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

以下是为您生成的 2026-07-11 Gemini CLI 社区动态日报。

# Gemini CLI 社区动态日报 (2026-07-11)

### 1. 今日速览
今日项目无新版本发布，社区重心主要集中在**子代理的稳定性优化**与**自动记忆系统的安全脱敏**上。开发者通过 PR 提交了大量关键修复，重点修补了 `a2a-server` 的路径遍历漏洞、IDE 插件的授权死循环以及核心配置合并时的递归崩溃问题。

### 2. 版本发布
* **过去24小时内无新版本发布。**

---

### 3. 社区热点 Issues (Top 10)
以下是近期讨论热度最高、最具代表性的 Issues，反映了当前工具在实际使用中的痛点：

1. **[#22323] 子代理隐瞒中断错误** (👍2 | 💬10)
   * **关注点**：`codebase_investigator` 子代理在触及最大轮次 (`MAX_TURNS`) 后仍报告 "success"，掩盖了实际的中断失败，严重影响任务验证。
2. **[#19873] 零依赖 OS 沙盒与意图路由** (👍1 | 💬8)
   * **关注点**：Gemini 3 倾向于原生使用 Bash，建议引入系统级沙盒来安全释放模型的 POSIX 工具链 (`grep`, `sed` 等) 操作能力。
3. **[#24353] 健壮的组件级评估** (👍0 | 💬7)
   * **关注点**：维护者发起的 Epic 计划，旨在建立更完善的行为评估测试基线，目前已有 76 个针对 6 种 Gemini 模型的测试用例。
4. **[#22745] 探索 AST 感知的代码读取与搜索** (👍1 | 💬7)
   * **关注点**：讨论引入 AST (抽象语法树) 工具来精确定位方法边界，以减少 Token 噪声和因读取错位导致的无效交互。
5. **[#21409] 通用代理时常卡死** (👍8 | 💬7)
   * **关注点**：P1 级严重 Bug。当 CLI 调用通用代理执行简单任务（如创建文件夹）时会无限期挂起，开发者只能通过禁用子代理来绕过。
6. **[#21968] Gemini 未能充分利用自定义技能和子代理** (👍0 | 💬6)
   * **关注点**：模型在未明确指令时，极少主动调用已配置好的自定义 Skills 和 Sub-agents。
7. **[#26522] 阻止 Auto Memory 无限重试低信号会话** (👍0 | 💬5)
   * **关注点**：后台记忆提取代理在跳过未读取的会话时，未将其标记为已处理，导致低价值会话在队列中被无限次重新评估。
8. **[#25166] Shell 命令执行完成后卡在 "Waiting input"** (👍3 | 💬4)
   * **关注点**：P1 核心 Bug。命令执行结束后，UI 界面仍判定 Shell 处于活动状态并等待输入，导致流程阻塞。
9. **[#21983] browser 子代理在 Wayland 下失败** (👍1 | 💬4)
   * **关注点**：Linux Wayland 环境兼容性问题，浏览器子代理直接报错终止。
10. **[#26525] 增加确定性脱敏并减少 Auto Memory 日志** (👍0 | 💬3)
    * **关注点**：安全类隐患。当前 Auto Memory 会先将本地记录读入模型上下文才进行脱敏，存在密钥泄露风险，亟需前置确定性脱敏逻辑。

---

### 4. 重要 PR 进展 (Top 10)
近期代码合并聚焦于安全防护、执行循环优化及致命崩溃修复：

1. **[#28353] 修复 a2a-server restore 命令的路径遍历漏洞**
   * **内容**：通过增加路径规范化检查，防止 `../../../etc/passwd` 等恶意输入逃逸出检查点目录。（安全防护纵深改进）
2. **[#28352] Caretaker 代理清理 Issue 标题以防止提示词注入**
   * **内容**：对拉取的 Issue 标题进行转义并包裹在 `</untrusted_context>` 中，堵住了通过 Issue 标题进行 Prompt 注入的漏洞。
3. **[#28316] 确保 Agent Mode 中任务取消能终止执行流**
   * **内容**：修复了取消任务后底层流仍在运行的“幽灵执行” Bug，同时解决了多个竞态条件和内存泄漏问题。
4. **[#28319] 重构 a2a-server 初始化生命周期**
   * **内容**：强制在加载工作区环境变量前进行路径信任检查，并使用 `AsyncLocalStorage` 隔离任务环境，大幅提升多并发下的安全性。
5. **[#28348] 解决 MaxListenersExceededWarning 与无限授权循环**
   * **内容**：修复了 Windows 环境下 OAuth 授权成功后陷入无限循环，以及 API 重试时导致的内存泄漏/无限循环问题。
6. **[#28349] 防御 customDeepMerge 中的循环引用**
   * **内容**：修复配置对象存在循环引用（如 `obj.self = obj`）时，设置管理器无限递归崩溃的问题。
7. **[#28330] 原子化设置 IDE 伴侣的 token 文件权限**
   * **内容**：修复 TOCTOU 安全隐患。原先写入授权文件后再 `chmod` 的两步操作，在中间窗口期文件是全局可读的，现已改为原子化操作。
8. **[#28247] 修复 ls 忽略 glob 匹配规则**
   * **内容**：调整 `ls` 命令对含有路径分隔符的忽略模式的匹配逻辑，采用 `picomatch` 支持相对路径及 `**` 语法。
9. **[#28164] 限制单次用户请求的递归推理轮次 (CLOSED)**
   * **内容**：为了防止 Agent 陷入死循环耗尽 API 额度，该 PR 提议强制限制单次请求最多 15 次递归。虽已关闭，但反映了社区对防死循环机制的重视。
10. **[#28248] 完善 MCP 环境变量扩展的文档**
    * **内容**：详细补充了关于 MCP Server 配置中环境变量语法（`$VAR`, `%VAR%`）支持情况的文档，降低用户配置心智成本。

---

### 5. 功能需求趋势
通过对 Issues 和 PR 的提炼，当前社区需求呈现以下几大核心趋势：
* **代码解析维度的升维 (AST 集成)**：传统的基于正则或逐行读取的方式已无法满足复杂的工程修改需求，社区强烈呼吁集成 AST 感知工具（如 `tilth` 或 `glyph`），以实现精准的代码定位与映射。
* **子代理系统的调度与容错**：多代理协作（通用代理、浏览器代理等）的调度策略仍显稚嫩。模型何时该分配任务、子代理失败时如何进行上下文恢复，是接下来的重构重点。
* **记忆系统与数据安全底座**：Auto Memory 系统的长期记忆构建虽具创新性，但目前存在无限重试、日志过度记录、脱敏不彻底等问题。前置数据脱敏与补丁验证成为安全侧的主旋律。
* **防破坏性与安全沙盒化执行**：由于模型偏爱执行 Shell 命令（`git reset`, `sed` 等），社区正积极推动 OS 级沙盒隔离，以及对高危破坏性操作进行软性劝阻。

---

### 6. 开发者关注点
总结开发者近期的真实痛点与吐槽：
* **流程卡死与"幽灵"状态**：无论是通用代理挂起、Shell 等待输入死锁，还是 IDE 授权无限循环，各种“死锁”和“无效等待”极大地打断心流，是目前体验上最致命的痛点。
* **工作区污染**：为了规避工具限制，模型频繁在工作区随机目录生成临时脚本（Issue #23571），开发者不得不频繁手动清理脏文件以维持干净的 Git 提交。
* **Token 与上下文过载**：当挂载

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

以下是为您生成的 2026-07-11 GitHub Copilot CLI 社区动态日报。

# 🚀 GitHub Copilot CLI 社区动态日报 (2026-07-11)

## 1. 今日速览
今日 GitHub Copilot CLI 发布了 `v1.0.71-0` 版本，带来了更精细的会话与作用域控制（如固定提示词、Repo 作用域），并优化了安装引导与快捷键体验。社区方面，终端 TUI 渲染崩溃（特别是 WSL2 环境）和多款 MCP Server 的 OAuth 认证失败成为了今日最受关注的痛点，同时开发者对 BYOK（自带密钥）多模型切换与任务调度的呼声持续高涨。

## 2. 版本发布
**[v1.0.71-0](https://github.com/github/copilot-cli/releases/tag/v1.0.71-0)** 发布更新：
*   **新增**：在 `/settings` 中增加了固定提示词设置，允许用户控制提示词的置顶状态。
*   **新增**：设置仪表盘新增 Repo 和 Repo (local) 作用域选项卡。
*   **改进**：默认使用更轻量化的安装引导和定向验证命令。
*   **改进**：优化了快捷键绑定，现在可以使用 `ctrl+x → x` 快速关闭会话，`ctrl+x → h` 隐藏分屏。

## 3. 社区热点 Issues (Top 10)
以下是过去 24 小时内互动最频繁、最具代表性的 Issues：

1.  **[ #4069 ] WSL2 环境下 TUI 中途卡死且输入失效 (👍8)**
    *   **动态**：高赞问题。在 WSL2 + Windows Terminal 环境下，当模型流式输出时，TUI 容易发生屏幕清空且无法响应 `Ctrl+C` 的死锁状态（底层报 EPIPE 错误）。
    *   **链接**：[https://github.com/github/copilot-cli/issues/4069](https://github.com/github/copilot-cli/issues/4069)
2.  **[ #2739 ] GPT-5.4/5.3-codex 移除了 xhigh reasoning 能力 (👍12, 已关闭)**
    *   **动态**：用户抱怨最新版本中移除了极高推理能力选项，导致复杂任务可用性下降。
    *   **链接**：[https://github.com/github/copilot-cli/issues/2739](https://github.com/github/copilot-cli/issues/2739)
3.  **[ #3709 ] 请求在同一会话中灵活切换 BYOK/本地模型 (👍17)**
    *   **动态**：高赞需求。目前 BYOK 模式会将会话死板地绑定到单一模型，用户希望在 `/model` 选择器中能直接列出并切换本地提供商的模型。
    *   **链接**：[https://github.com/github/copilot-cli/issues/3709](https://github.com/github/copilot-cli/issues/3709)
4.  **[ #4024 ] 语音模式下所有内置 ASR 模型静默失败**
    *   **动态**：核心 Bug。在 Foundry Local Core 中，`/voice` 界面显示录音电平正常，但底层多模态路由错误导致所有转录结果返回空。
    *   **链接**：[https://github.com/github/copilot-cli/issues/4024](https://github.com/github/copilot-cli/issues/4024)
5.  **[ #3399 ] 允许 BYOK 模式注入自定义 HTTP Headers (👍6)**
    *   **动态**：企业级需求。部分自建 LLM 网关需要传递 `X-Tenant-ID` 等特定请求头，开发者呼吁开放 Header 自定义配置。
    *   **链接**：[https://github.com/github/copilot-cli/issues/3399](https://github.com/github/copilot-cli/issues/3399)
6.  **[ #4089 ] Atlassian MCP Server OAuth 成功但工具未暴露**
    *   **动态**：MCP 生态兼容性问题。Atlassian MCP 连接显示成功，但 Agent 会话中无法调用任何实际工具。
    *   **链接**：[https://github.com/github/copilot-cli/issues/4089](https://github.com/github/copilot-cli/issues/4089)
7.  **[ #2533 ] 阻塞式 Shell 调用导致 Agent 彻底卡死**
    *   **动态**：当 Agent 执行例如等待超时的 SSH 命令时，会完全忽略用户后续输入的新消息，缺乏异步中断机制。
    *   **链接**：[https://github.com/github/copilot-cli/issues/2533](https://github.com/github/copilot-cli/issues/2533)
8.  **[ #4091 ] Linux (Alpine) 独立二进制文件在 v1.0.X 版本中丢失 (已关闭)**
    *   **动态**：回归问题。`linuxmusl-x64` 的发布包中突然移除了预编译的 Standalone binary，影响了 Alpine 用户的免 Node 部署。
    *   **链接**：[https://github.com/github/copilot-cli/issues/4091](https://github.com/github/copilot-cli/issues/4091)
9.  **[ #3331 ] 插件支持在 CLI 启动时通过 Marketplace 标志自动更新 (👍4)**
    *   **动态**：目前插件需手动执行更新指令，开发者呼吁提供配置项以实现无感知的自动更新，保障团队一致性。
    *   **链接**：[https://github.com/github/copilot-cli/issues/3331](https://github.com/github/copilot-cli/issues/3331)
10. **[ #4078 / #4079 ] 定时任务触发时清空并中断了原有任务队列**
    *   **动态**：调度逻辑缺陷。当使用 `/every` 或 `/after` 触发定时指令时，它会杀死当前排队的任务，且不会在执行完毕后恢复原队列。
    *   **链接**：[https://github.com/github/copilot-cli/issues/4078](https://github.com/github/copilot-cli/issues/4078)

## 4. 重要 PR 进展
*注：过去 24 小时内仅有 1 个活跃 PR 更新。*

1.  **[ #2565 ] install: 防止重复安装时生成重复的 PATH 条目**
    *   **进展**：针对环境变量污染问题。此前多次执行安装脚本会导致 PATH 配置在 Shell profile 中重复追加。该 PR 优化了校验逻辑，不再单纯依赖 `command -v copilot` 进行安装状态判断。
    *   **链接**：[https://github.com/github/copilot-cli/pull/2565](https://github.com/github/copilot-cli/pull/2565)

## 5. 功能需求趋势
通过提炼近期 Issues，社区目前最关注的功能演进方向如下：
*   **BYOK 与本地模型深度融合**：开发者不再满足于单一的本地模型挂载，他们要求 BYOK 模式具备与云端模型相同的 UI 权重，包括在会话内动态切换模型 (#3709)、支持自定义请求头 (#3399)。
*   **MCP (Model Context Protocol) 生态稳定性**：围绕 MCP 的 OAuth 认证流程（特别是针对 Work IQ、Atlassian 等微软系或第三方企业服务）存在大量断链报告 (#4084, #4085, #4086)，提升 MCP �

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

这份报告基于 2026 年 7 月 11 日的 GitHub 数据动态生成。

---

# 🚀 Kimi Code CLI 社区动态日报 (2026-07-11)

## 1. 今日速览
今日 Kimi CLI 社区无新增 Issue 与 Release 版本，但核心代码贡献依然活跃，主要聚焦于**底层架构的健壮性修复**与**前端体验的细节打磨**。开发者 @nankingjing 连续提交了两个重要 PR，着手解决核心组件 `KimiSoul` 的工具绑定冲突问题，并大幅优化了新用户首次安装时的报错引导体验。

## 2. 版本发布
*过去 24 小时内无最新 Release。*

## 3. 社区热点 Issues
*注：过去 24 小时内 Issues 区间更新数为 0。结合近期 PR 提交情况，当前社区核心反馈的痛点集中在以下方面：*

*   **初始化与新手体验痛点**：新用户通过 Homebrew 全新安装后，若未执行 `kimi login`，在执行任何命令时会遇到毫无头绪的 `LLM not set` 报错。
*   **核心架构状态污染**：在使用 `/init` 命令时，生成的临时 `KimiSoul` 实例会意外篡改共享工具（如 Plan-mode 相关工具）的绑定状态，导致计划模式失效（参考关联 Issue #2478）。

## 4. 重要 PR 进展
今日共有 4 个 PR 发生状态更新，以下是详细进展：

*   **[OPEN] [PR #2489](https://github.com/MoonshotAI/kimi-cli/pull/2489): 修复 `/init` 导致的计划模式工具绑定失效问题**
    *   **作者**: @nankingjing
    *   **进展**: 修复底层 Agent 架构的严重 Bug (#2478)。之前 `/init` 创建的临时 `KimiSoul` 会错误地重绑定共享的 `EnterPlanMode`、`ExitPlanMode` 等工具实例，此 PR 恢复了正确的工具绑定生命周期，对保障 CLI 核心 Agent 状态稳定性意义重大。
*   **[OPEN] [PR #2488](https://github.com/MoonshotAI/kimi-cli/pull/2488): 优化全新安装时的 `LLMNotSet` 报错信息**
    *   **作者**: @nankingjing
    *   **进展**: 提升新手 Onboarding 体验（修复 #2456）。将晦涩的 `LLM not set` 报错转化为包含明确操作指引（如提示运行 `kimi login`）的 Actionable Error，大幅降低新用户的上手门槛。
*   **[CLOSED] [PR #2353](https://github.com/MoonshotAI/kimi-cli/pull/2353): 优化 Web 端应用布局间距**
    *   **作者**: @anxndsgn
    *   **进展**: 已合并。移除了应用层级的外部间距但保留了安全区域，同时精调了会话侧边栏和搜索框的 UI 间距，提升 Web 界面的视觉密度与专业感。
*   **[CLOSED] [PR #1815](https://github.com/MoonshotAI/kimi-cli/pull/1815): 修复 Safari 浏览器输入法回车误发消息的问题**
    *   **作者**: @qianqiuqiu
    *   **进展**: 已合并。解决了 macOS Safari 环境下，使用原生中文输入法时，按下 Enter 确认拼音候选词会被误判为“发送消息”的痛点 Bug，显著改善了 Mac 用户的 Web 端交互体验。

## 5. 功能需求趋势
根据近期开发者提交的代码动向，可以提炼出当前 Kimi CLI 演进的两大核心趋势：

1.  **底层 Agent 生命周期隔离与稳定性**：随着工具链越来越复杂，多 Agent 实例（如临时 Soul 与常驻 Soul）之间的状态隔离、上下文管理和工具绑定防冲突成为开发重点。
2.  **跨平台与 Web 端输入法兼容性**：持续修复复杂环境（特别是 Safari + macOS 原生中文 IME）下的按键监听事件，表明项目对国内开发者使用习惯和跨端一致性的重视程度正在提升。

## 6. 开发者关注点
*   **Onboarding 摩擦**：从安装到第一次成功对话之间的“隐形报错”是造成用户流失的关键，社区正致力于将各类系统级报错转化为可执行的 CLI 指引。
*   **IDE / Web 端细节体验**：开发者对 Web 端的排版紧凑度、安全区适配以及输入法交互有着极高的要求，前端体验正在向成熟的商业级生产力工具对齐。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

以下是 2026-07-11 OpenCode 社区动态日报：

### 1. 今日速览
今日 OpenCode 社区未发布新版本，但底层稳定性和安全性迎来了大量优化，多位开发者提交了针对鉴权、后台任务并发处理和 TUI 体验的关键 PR。此外，新模型适配（如 GPT-5.6 和 GitHub Copilot）以及历史遗留的性能、LSP 兼容性问题是当前社区讨论的焦点。

### 2. 版本发布
*过去 24 小时内无新版本发布。*

### 3. 社区热点 Issues
以下是今日最受关注、讨论度最高的 10 个 Issue：

*   **[#30086] [OPEN] 新版本 CPU 占用率急剧飙升** (👍12 | 💬21)
    自最近更新以来，OpenCode 的 CPU 占用率急剧上升，从原本可同时运行 10+ 个会ession降至运行 3 个即导致电脑卡顿，严重影响了开发效率。
*   **[#10288] [OPEN] 呼吁推出移动端/Web 端版本** (👍89 | 💬15)
    社区呼声极高的功能请求，开发者希望能够在移动设备（Android/iOS）或通过 Web UI 随时随地审查代码和获取 AI 辅助。
*   **[#1302] [CLOSED] 支持通过 apiKeyHelper 动态轮换 API Keys** (👍55 | 💬12)
    请求支持通过外部脚本动态刷新 JWT Token 或 API Key，以解决静态密钥容易过期的企业级安全痛点。
*   **[#36140] [OPEN] ChatGPT OAuth 下 GPT-5.6 Luna 报 Model not found** (👍51 | 💬12)
    新模型 `gpt-5.6-luna` 虽在内置列表中显示，但实际请求时返回 HTTP 404，影响大量尝鲜用户。
*   **[#26772] [OPEN] 桌面版请求集成内置浏览器** (👍3 | 💬13)
    请求在桌面版引入内置浏览器工作区，方便开发者在编码时直接审查和交互 Web 应用。
*   **[#14795] [CLOSED] Zen API 返回 500 错误** (👍4 | 💬10)
    在通过 OpenAI 兼容客户端调用 Zen API 的免费模型时，因 Token 元数据解析问题导致持续性 500 报错。
*   **[#7488] [CLOSED] 自定义 vLLM 端点 Mistral 模型报 Role 结构错误** (👍10 | 💬7)
    使用 Mistral/Devstral 模型进行 Tool Calls 时，因消息结构限制抛出 `Unexpected role 'user' after role 'tool'` 异常。
*   **[#28289] [OPEN] 大型 Android 项目中 kotlin-ls 初始化超时** (💬6)
    JetBrains Kotlin LSP 在大型 Gradle 项目中同步耗时过长，导致语言服务初始化超时，且用户命令覆盖无效。
*   **[#25487] [CLOSED] LiteLLM 代理流解析中断** (💬6)
    当配置提供商为 OpenAI 兼容的 LiteLLM 代理时，首次工具结果流式传回后触发 `text part <uuid> not found` 错误并中止运行。
*   **[#36350] [CLOSED] OpenCode 违背 Terminal Shell 参数配置** (💬3)
    用户明确在配置中指定使用 CMD，但系统仍偶发性调用 PowerShell，且在 Windows 上经常出现无法读取 PowerShell 输出的问题。

### 4. 重要 PR 进展
今日有许多聚焦于系统健壮性与新特性集成的 PR，以下是最值得关注的 10 个：

*   **[#36336] 移植 GitHub Copilot OAuth 鉴权 [CLOSED]**
    将 GitHub.com 及企业版 Copilot 的 Device OAuth 接入 V2 集成注册表，支持 Credential 感知的请求头注入。
*   **[#7756] 支持子代理互相委派及持久化会话 [CLOSED]**
    引入了带预算控制和层级会话导航的 subagent-to-subagent delegation 功能，大幅增强了复杂任务的自定义编排能力。
*   **[#36143] 修复 ChatGPT OAuth 下 GPT-5.6 适配问题 [OPEN]**
    通过调整 Responses Lite 的请求封装，修复了 `gpt-5.6-luna` 模型 404 报错（对应 Issue #36140）。
*   **[#36360] 拒绝通过软链接写入凭据 [OPEN]**
    安全加固：防止恶意脚本通过在目标路径植入软链接劫持 `auth.json` 或 MCP 凭据文件。
*   **[#36362] 序列化并发 auth.json 写入 [OPEN]**
    修复多协程并发读取和修改 `auth.json` 导致的竞态条件与数据损坏风险。
*   **[#36363] 修复 /compact 在 subagent 配置下静默失败 [OPEN]**
    解决了当 `default_agent` 配置为子代理时，会话摘要压缩接口失效的底层逻辑错误。
*   **[#36359] 停止将 HTML 网关报错正文直接倾倒在 TUI 中 [OPEN]**
    优化错误展示：当代理返回 Nginx 503 等 HTML 错误页时，不再在 TUI 界面刷屏展示整个 HTML 文档。
*   **[#36353] 解决 Windows 下后台进程阻塞 Shell 工具的问题 [OPEN]**
    修复在 Windows 环境中，若 Shell 命令启动了后台守护进程（如服务器），导致 stdio 管道无法到达 EOF 而一直挂起的问题。
*   **[#36352] TUI 引入语义化文件路径截断组件 [OPEN]**
    全新的文件路径展示组件，在空间受限时能智能保留文件名、扩展名及最近的完整父级路径，提升代码审查视觉体验。
*   **[#36339] CodeMode 沙盒支持 Promise.any 和 new Promise [CLOSED]**
    在 CodeMode 沙盒解释器中实现了 `Promise.any` 及 `new Promise(executor)` 的实例化支持。

### 5. 功能需求趋势
从近期的 Issues 和 PRs 中，可以总结出社区目前明确聚焦的四大功能演进方向：
1.  **全平台拓展与桌面体验重塑：** 用户强烈要求打破纯终端限制（Issue #10288），包括引入移动端/Web UI，以及在桌面版集成内置浏览器（Issue #26772），实现“编码-预览”工作流闭环。
2.  **企业级安全与多租户支持：** 社区对动态 API Key、JWT Token 自动轮换（Issue #1302）的需求旺盛；同时，核心团队也在密集提交安全强化 PR（如软链接拦截、并发

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# 🛠️ Qwen Code 社区动态日报 (2026-07-11)

## 1. 今日速览
今天 Qwen Code 发布了 **v0.19.9 正式版**与最新的 **v0.19.8 nightly 版**，核心修复了子代理工具死循环与历史记录断链问题。社区动态方面，“单 Daemon 多工作区” 架构演进引发密集讨论，同时针对 Web Shell 底部工具栏的交互体验改造成为了近期最受关注的特性需求。

---

## 2. 版本发布
*   **[v0.19.9 正式版](https://github.com/QwenLM/qwen-code/releases/tag/v0.19.9)**
    *   **停止子代理死循环**：修复了子代理重复进行工具调用的循环问题 ([PR #6543](https://github.com/QwenLM/qwen-code/pull/6543))。
    *   **历史链修复**：检测并标记损坏的历史记录链，替代之前静默截断的行为，提升了上下文恢复的稳定性。
*   **[v0.19.8 nightly 版](https://github.com/QwenLM/qwen-code/releases/tag/v0.19.8-nightly.20260711.0ef3a76bd)**
    *   **YOLO 模式修复**：修复了模型调用 `enter_plan_mode` 时打破 YOLO 模式（全自动模式）的问题 ([PR #6630](https://github.com/QwenLM/qwen-code/pull/6630))。
    *   **CLI 支持转发**：新增 `forward ask_user` 功能。

---

## 3. 社区热点 Issues (Top 10)
以下是近 24 小时内讨论度最高、最具代表性的 Issues：

1.  **单 Daemon 多工作区架构 RFC** | [#6378](https://github.com/QwenLM/qwen-code/issues/6378) | `20 评论`
    *   **关注点**：社区提出了改变当前 "1 守护进程 = 1 工作区" 模型的 RFC，旨在支持单进程管理多个工作区。这是目前讨论最激烈的底层架构变更需求。
2.  **API 流式传输 120s 超时报错** | [#5975](https://github.com/QwenLM/qwen-code/issues/5975) | `10 评论`
    *   **关注点**：自 v0.19.3 升级后，模型思考后频繁出现 "No stream activity for 120000ms" 报错，核心稳定性受到开发者抱怨。
3.  **macOS 独立安装包缺失原生模块** | [#6590](https://github.com/QwenLM/qwen-code/issues/6590) | `4 评论`
    *   **关注点**：macOS 独立包缺失 `@teddyzhu/clipboard` 模块，导致用户无法使用 `Ctrl+V` 粘贴图片，影响多模态输入体验。
4.  **tool_use 缺失对应的 tool_result** | [#6654](https://github.com/QwenLM/qwen-code/issues/6654) | `4 评论`
    *   **关注点**：在复杂工具调用时出现上下文断层，导致 API 强制报错，反映了会话状态管理存在边界 Bug。
5.  **Cron 解析器步长丢弃 Bug** | [#6629](https://github.com/QwenLM/qwen-code/issues/6629) | `4 评论` (已关闭)
    *   **关注点**：解析 `5/15` 这类 Cron 表达式时退化为仅匹配 `5`。该问题已被快速响应并自动分配修复。
6.  **v0.19.9 CI/CD 发布失败** | [#6690](https://github.com/QwenLM/qwen-code/issues/6690), [#6687](https://github.com/QwenLM/qwen-code/issues/6687), [#6684](https://github.com/QwenLM/qwen-code/issues/6684) | `多 评论`
    *   **关注点**：由于 `integration_docker` 测试未通过，导致昨日 v0.19.9 的自动化发布流水线连续失败。
7.  **Web Shell 底部工具栏大改版需求** | [#6699](https://github.com/QwenLM/qwen-code/issues/6699), [#6700](https://github.com/QwenLM/qwen-code/issues/6700), [#6701](https://github.com/QwenLM/qwen-code/issues/6701) | `各 2 评论`
    *   **关注点**：用户 `@pomelo-nwu` 密集提出系列需求，要求重构 Web Shell 输入区，增加工作区切换、Git 分支展示、执行环境选择等快捷按钮，对标 Codex 桌面端体验。
8.  **代理转发导致 Anthropic 缓存命中率极低** | [#6642](https://github.com/QwenLM/qwen-code/issues/6642) | `2 评论` (已关闭)
    *   **关注点**：使用 Routify 等代理调用 Claude 模型时，缓存命中率仅 20%，导致账单成本剧增，暴露了 Anthropic 转换器的缓存策略痛点。
9.  **MCP HTTP 传输遭遇 401 不重试** | [#6639](https://github.com/QwenLM/qwen-code/issues/6639) | `3 评论`
    *   **关注点**：当 MCP 服务器返回 401 未授权时，Qwen Code 没有触发 OAuth 恢复流程，而是直接显示离线。
10. **审批模式切换 UI 语言混杂** | [#6582](https://github.com/QwenLM/qwen-code/issues/6582) | `3 评论` (已关闭)
    *   **关注点**：使用 `Shift+Tab` 切换 YOLO/Plan 等模式时，部分提示中英混杂，国际化（i18n）遗漏导致体验割裂。

---

## 4. 重要 PR 进展 (Top 10)
今日社区贡献活跃，以下是最具价值的代码合并/提交：

1.  **[feat] 多工作区 ACP 传输层落地 (第四阶段)** | [#6621](https://github.com/QwenLM/qwen-code/pull/6621) by @doudouOUC
    *   配合 Issue #6378，为 Daemon 增加了基于工作区的 ACP 端点 (`/workspaces/:workspace/acp`)，是多工作区架构的核心基建。
2.  **[fix] 修复泄露的协议标签输出** | [#6683](https://github.com/QwenLM/qwen-code/pull/6683) by @yiliang114
    *   修复了 `qwen3.7-max` 在复杂上下文中将内部 `<analysis>` 等协议标签直接暴露给用户的严重问题，并完善了重试逻辑。
3.  **[feat] 增强子代理可观测性** | [#6580](https://github.com/QwenLM/qwen-code/pull/6580) by @TianYuan1024
    *   在代理执行详情页展示未截断的实时运行命令，大幅提升了多 Agent 协作时的调试体验。
4.  **[fix] 修复 `/goal` 指令生命周期安全问题** | [#6681](https://github.com/QwenLM/qwen-code/pull/6681) by @qqqys
    *   使得自动 `/goal` 评估能够安全等待后台 Shell 或 Agent 任务完成后再执行，避免错误终止。
5.  **[feat] WebShell 恢复被中断的会话** | [#6697](https://github.com/QwenLM/qwen-code/pull/6697) by @samuelhsin
    *   环境重启或加载历史记录时，自动识别并恢复之前未完成的 AI 回答。
6.  **[feat] 流式输出时展示完整思考过程** | [#6678](https://github.com/QwenLM/qwen-code/pull/6678) by @huww98
    *   使用 `Alt+T` 展开思考块时，从原先硬编码的 4 行预览改为通过

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*