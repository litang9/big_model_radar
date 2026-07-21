# AI CLI 工具社区动态日报 2026-07-22

> 生成时间: 2026-07-21 21:32 UTC | 覆盖工具: 7 个

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

以下是为您生成的 2026-07-22 AI CLI 工具生态横向对比分析报告：

# 📊 2026-07-22 AI CLI 工具生态横向对比分析报告

## 1. 生态全景
当前 AI CLI 工具正处于从“辅助代码生成”向“全自主工程智能体”演进的关键拐点，底层架构（如会话持久化、上下文压缩、沙盒隔离）的重构成为近期主旋律。
各工具在追求复杂任务自动化（如嵌套子智能体调度）的同时，正面临严峻的**系统级资源管理挑战**（如内存泄漏、僵尸进程、UI 卡顿）和**底层调用链路的脆弱性**（如 MCP 协议失效、Tool Calling 崩溃）。
此外，生态正在走向事实上的标准互通与激烈争夺，例如 OpenAI Codex 开始提供从 Claude/Cursor 的一键无缝迁移工具，而 MCP（模型上下文协议）已成为全行业突破工具调用瓶颈的共识性基建。

## 2. 各工具活跃度对比
*注：数据基于今日（2026-07-22）各开源社区公开追踪情况*

| 工具名称 | 今日 Release | 热门 Issues (Top 10) | 重要 PR (Top 10) | 核心迭代重心 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | v2.1.216 | 10 | 10 | 沙盒网络控制、Hook 体系增强、长会话性能优化 |
| **OpenAI Codex** | rust-v0.145.0 (正式) | 10 | 10+ | 会话分页重构、跨平台迁移、系统进程治理 |
| **Gemini CLI** | v0.52.0 (Nightly) | 10 | 10 | 安全防护栏、智能体超时预算、AST 感知 |
| **GitHub Copilot CLI**| v1.0.74-0 (预发) | 35 (单日新增) | 1 (较停滞) | Plan 模式细化、MCP 深度集成、上下文字节数压缩 |
| **Kimi Code CLI** | 无 | 5 | 1 | 新模型适配兼容、TUI 渲染优化 |
| **OpenCode** | 无 | 10 | 10 | V2 引擎/TUI 重构、内存溢出排查、权限算法升级 |
| **Qwen Code** | v0.20.1 | 10 | 6 | 后台子代理驻留、启动性能优化、兼容性修复 |

## 3. 共同关注的功能方向
通过交叉对比，当前各社区开发者的痛点与诉求高度重合于以下四大领域：

1. **子智能体的生命周期与状态管理**
   * **共性痛点**：多级 Agent 调度极易引发无限循环、静默失败或进程死锁。
   * **工具映射**：Gemini CLI 面临 Agent 达到 MAX_TURNS 伪装成功及无限卡死问题；OpenCode 遭遇 bash 调用后子代理无限挂起；Claude Code 出现嵌套智能体消息绕过父级直达根会话的 Bug；Qwen Code 则在大力开发后台子代理的驻留与恢复机制。
2. **系统资源占用与极端内存管理**
   * **共性痛点**：长会话与复杂本地任务极易耗尽宿主机资源。
   * **工具映射**：OpenCode 爆发严重的内存溢出集中讨论（117条评论）；OpenAI Codex 遭遇 macOS 与 Windows 双端的系统级进程风暴（WMI/`syspolicyd` 暴涨）；Claude Code 内置 grep 导致 OOM；Copilot CLI 出现 Linux 僵尸进程泄漏。
3. **MCP (Model Context Protocol) 的深度与稳定集成**
   * **共性痛点**：MCP 连接不稳定、鉴权失效、工具无法透传给大模型。
   * **工具映射**：Claude Code 桌面端出现 MCP 调用全线 404 及幽灵连接 Bug；Copilot CLI 社区强烈呼吁支持 Resources、Prompts 和动态 OAuth 注册（CIMD）；OpenAI Codex 修复了 MCP 调用版本绑定及 OAuth Token 自动刷新问题。
4. **长上下文引起的处理瓶颈**
   * **共性痛点**：随对话轮次增加，请求体过大导致 API 拒绝或性能急剧下降。
   * **工具映射**：Copilot CLI 历史记录触碰 5MB 请求体硬限制导致 Agent 死机；OpenCode 陷入自动压缩死循环；Claude Code 则通过修复消息标准化二次方增长的 Bug 缓解了长会话卡顿。

## 4. 差异化定位分析
* **Claude Code**：**“重本地生态与规则驱动”**。技术路线偏向本地沙盒文件系统控制和 Hook/插件系统的深度定制（如 TTS Hook、Hookify 增强），适合需要深度介入本地工作流、构建自动化管道的资深开发者。
* **OpenAI Codex**：**“企业级跨平台与生态聚合”**。底层向 Rust 迁移完成，注重会话持久化（分页线程）和跨平台兼容（如沙盒代理、WMI 优化），且具备强烈的竞品用户迁移意图（`/import` 命令兼容 Cursor/Claude）。
* **Gemini CLI**：**“安全防御与底层重构”**。侧重于通过技术手段（如零依赖 OS 沙盒、真实时间预算、AST 感知）建立企业级安全防护栏，遏制智能体的越权或破坏性操作。
* **GitHub Copilot CLI**：**“IDE 融合与 Plan 驱动”**。高度依附于 GitHub 生态，重点发力 Plan（计划）模式的精细化调度，以及组织级 MCP 策略管理，适合重度依赖 GitHub 进行项目管理的团队。
* **Qwen / Kimi / OpenCode**：**“前沿模型适配与轻量级极速体验”**。Qwen 和 Kimi 的核心精力在于解决最新模型（K2.5, K3, Qwen 兼容协议）的 Tool Calling 兼容性，并优化终端 TUI 的交互流畅度；而 OpenCode 则在走 V2 架构的彻底重构路线（SolidJS TUI 渲染、本地数据隔离）。

## 5. 社区热度与成熟度
* **第一梯队（成熟度高、高频迭代）**：**OpenAI Codex** 与 **Claude Code**。两者均发布了正式版，PR 和 Issue 讨论极为充分，焦点已从“基础功能可用”转向“解决深层架构瓶颈与跨平台资源治理”。
* **第二梯队（生态依赖强、高发声量）**：**GitHub Copilot CLI**。单日激增 35 个 Issue，反映出其庞大的用户基数，但官方核心代码合并 PR 较少（今日仅 1 个待审核 PR），处于功能调整的阵痛期，用户对稳定性回归怨声载道。
* **第三梯队（快速演进、处于破茧期）**：**Gemini CLI**、**OpenCode** 与 **Qwen Code**。这三个工具的 Issue 集中在阻断级 Bug（如死机、伪造成功、内存 OOM）和架构级重构上，说明它们正处于快速成长但尚未完全成熟的阶段。

## 6. 值得关注的趋势信号
1. **A/B 测试正在破坏开发者信任**：Claude Code 社区今天暴露出由于隐藏的 GrowthBook A/B 实验导致核心工具（Grep、Glob、Task）被静默禁用的严重事件。**信号**：面向专业开发者的 CLI 工具应极度克制使用“静默降级”策略，这会严重破坏自动化工作流的确定性。
2. **API 限制正从“Token 颗粒”转向“字节限制”**：Copilot CLI 曝光的 5MB CAPI 请求体超限问题揭示了一个新趋势。**信号**：随着多模态和超长上下文模型普及，开发者不仅需要关注 Token 消耗，更需要在工程中引入对**请求字节体大小**的本地监控与序列化裁剪机制。
3. **“配置便携化”加速了工具间的人口流动**：Codex 引入从 Claude/Cursor 无缝迁移配置的功能。**信号**：各 CLI 工具的底层模型差异在缩小，谁能最大程度降低用户的迁移成本（配置、会话历史、MCP 插件），谁就能在存量市场中抢占份额。
4. **对“确定性超时”与“状态诚实”的刚性需求**：Gemini 伪装成功和 OpenCode 的死锁问题说明，AI 智能体不能只有“Happy Path”。**信号**：开发者在构建多 Agent 架构时，必须在系统层强制注入带时限的 Watchdog（看门狗）机制，并要求 LLM 输出严格的任务执行状态码，防止 Token 被静默空耗。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

这是一份基于 `anthropics/skills` 仓库（截至 2026-07-22）的 Claude Code Skills 社区热点与技术生态分析报告。

### 1. 热门 Skills 排行 (Pull Requests)
当前社区的 PR 热点主要集中在**核心工具链修复、代码质量保障**以及**文档排版增强**三大方向。以下是最受关注的 Skill 提交与改进：

*   **1. skill-creator 核心评估机制大修**
    *   **功能与状态**：修复 `run_eval.py` 始终报 `recall=0%` 的致命 Bug。该 Bug 导致技能描述的优化循环完全失效（基于噪音进行优化），同时修复了 Windows 下的子进程读取与并发问题。
    *   **社区热点**：这是官方技能创建工具的核心基石，牵动了多个后续开发流程。
    *   **链接**：[PR #1298](https://github.com/anthropics/skills/pull/1298) (Open)
*   **2. self-audit (自我审计推理质检门禁)**
    *   **功能与状态**：提供 AI 输出结果交付前的双重校验——先进行机械的文件存在性验证，再基于损坏严重程度进行四个维度的推理审计。
    *   **社区热点**：高度契合当前 AI Agent 确保“不产生幻觉”与“交付可信结果”的核心诉求。
    *   **链接**：[PR #1367](https://github.com/anthropics/skills/pull/1367) (Open)
*   **3. testing-patterns (全栈测试规范)**
    *   **功能与状态**：涵盖完整测试堆栈的最佳实践，包括测试理念（测试奖杯模型）、单元测试（AAA 模式）以及 React 组件测试规范。
    *   **社区热点**：填补了 Claude Code 在自动化生成高质量测试代码方面的指导空白。
    *   **链接**：[PR #723](https://github.com/anthropics/skills/pull/723) (Open)
*   **4. document-typography (文档排版质量控制)**
    *   **功能与状态**：自动修复 AI 生成文档中的常见排版问题（如孤行、寡行、页底孤立标题、编号错位等）。
    *   **社区热点**：直击 AI 生成长文本时的“视觉不专业性”痛点，大幅提升最终交付物的可用性。
    *   **链接**：[PR #514](https://github.com/anthropics/skills/pull/514) (Open)
*   **5. ODT (OpenDocument 文档处理)**
    *   **功能与状态**：支持创建、填充、读取或转换开放文档格式文件，并支持 ODT 到 HTML 的解析。
    *   **社区热点**：扩展了 Claude Code 在开源/ISO标准化办公文档格式（如 LibreOffice）的落地能力。
    *   **链接**：[PR #486](https://github.com/anthropics/skills/pull/486) (Open)
*   **6. skill-quality-analyzer & skill-security-analyzer (元技能：质量与安全分析)**
    *   **功能与状态**：为 Claude Skills 本身提供五维度（结构、文档、示例等）的质量评分，以及安全漏洞分析。
    *   **社区热点**：标志着社区开始系统性地构建“开发 Skills 的 Skills”，重视生态自身的健康度。
    *   **链接**：[PR #83](https://github.com/anthropics/skills/pull/83) (Open)

---

### 2. 社区需求趋势
从 Issues 的讨论中可以看出，社区对 Skills 生态的期待已超出单一功能，正向**系统性安全、团队协作与底层架构**延伸：

*   **安全与信任边界划分**：[Issue #492](https://github.com/anthropics/skills/issues/492) (43 评论) 反映了严重的安全隐患，社区制作的 Skills 被放在 `anthropic/` 命名空间下分发。社区强烈要求**建立签名机制或官方/第三方命名空间隔离**，防止恶意技能骗取高级权限。此外，对 SharePoint 等企业内部文档的细粒度权限控制需求也日益凸显（[Issue #1175](https://github.com/anthropics/skills/issues/1175)）。
*   **企业级/组织级共享工作流**：[Issue #228](https://github.com/anthropics/skills/issues/228) (14 评论) 指出目前 Skill 分享极其落后（需手动通过 Slack 发送 `.skill` 文件再上传）。社区急需一个“组织级共享库”来实现工作流的快速对齐。
*   **长程记忆与 Agent 治理**：随着 Agent 运行时间变长，[Issue #1329](https://github.com/anthropics/skills/issues/1329) 提出了 `compact-memory` 技能需求，希望用符号表示法压缩 Agent 的上下文状态；同时 [Issue #412](https://github.com/anthropics/skills/issues/412) 提出了 `agent-governance`，要求 AI 具备策略执行、威胁检测和审计能力。
*   **跨平台兼容性 (Windows 优先)**：[Issue #1061](https://github.com/anthropics/skills/issues/1061) 及诸多 PR 表明，早期的 Skills 工具链完全基于 Unix 优先假设，导致在 Windows 上编码错误 (cp1252)、子进程调用失败，社区迫切要求补齐跨平台支持。

---

### 3. 高潜力待合并 Skills
以下 PR 解决了核心痛点且讨论活跃，是近期最有可能被官方合并落地或成为社区主流分支的关键技能：

*   **[PR #1298](https://github.com/anthropics/skills/pull/1298): `fix(skill-creator): run_eval.py`**
    *   **落地理由**：它修复了阻断性 Bug（[Issue #556](https://github.com/anthropics/skills/issues/556)，10+ 用户复现），没有这个修复，基于评分自动优化 Skill 描述的整个底层逻辑将完全瘫痪。
*   **[PR #541](https://github.com/anthropics/skills/pull/541): `fix(docx): prevent tracked change w:id collision`**
    *   **落地理由**：修复了 DOCX 技能中硬编码 ID 导致办公文档（带有书签的文档）结构损坏的严重问题，属于高优先级的稳定性修复。
*   **[PR #509](https://github.com/anthropics/skills/pull/509): `docs: add CONTRIBUTING.md`**
    *   **落地理由**：直接回应了仓库社区健康度低下的短板，规范了开源贡献流程，属于基础设施完善的必经之路。

---

### 4. Skills 生态洞察
**一句话总结：** 当前社区在 Skills 层面最集中的诉求是**“建立企业级的安全信任边界与组织共享机制，同时亟待修复底层技能开发工具链的跨平台兼容性与评估盲区”**。

---

以下是为您生成的 2026-07-22 Claude Code 社区动态日报。

# 📰 Claude Code 社区动态日报 (2026-07-22)

## 1. 今日速览
今日 Claude Code 发布了 **v2.1.216** 版本，重点修复了长会话中令人困扰的卡顿问题，并引入了更细粒度的沙盒网络控制。然而，社区今日爆发出多个严重的阻断性 Bug：新发布的 **Fable 5 模型在 Max 计划中出现权限认证异常**，同时**隐藏的 A/B 测试实验导致大量核心工具（如 Task、Grep、Glob）被静默禁用**。此外，MCP 工具调用的稳定性在桌面端和 VS Code 扩展中面临严峻考验。

---

## 2. 版本发布
### **[v2.1.216](https://github.com/anthropics/claude-code/releases)**
- **新增配置**：引入 `sandbox.filesystem.disabled` 设置，允许用户在保留网络出站控制的同时，跳过文件系统隔离。
- **性能修复**：修复了在长会话中由于消息标准化成本随轮次呈二次方增长，导致数秒卡顿和恢复缓慢的问题。

---

## 3. 社区热点 Issues (Top 10)

1. **[Issue #79337](https://github.com/anthropics/claude-code/issues/79337) | 🔥 23 评论 | Fable 5 在 Max 计划中报“需使用额度”**
   - **亮点**：Fable 5 成为 Max 标准配置的首日，大量用户反馈 CLI 强制降级至 Opus 4.8 并索要额外积分，严重影响新模型的使用体验。
2. **[Issue #75577](https://github.com/anthropics/claude-code/issues/75577) | 13 评论 | Task 工具在最新模型中被静默禁用**
   - **亮点**：受 `tengu_vellum_ash` 实验性开关影响，TaskCreate 等工具在 Opus 4.8 / Sonnet 5 下消失，且无任何报错，导致 Agent 流程中断。
3. **[Issue #11002](https://github.com/anthropics/claude-code/issues/11002) | 61 评论 | [功能请求] 增加 `--screen-reader` 无障碍模式**
   - **亮点**：社区呼声极高的老 Issue，请求为 NVDA 和 JAWS 等屏幕阅读器提供更好的终端交互支持。
4. **[Issue #79358](https://github.com/anthropics/claude-code/issues/79358) | 10 评论 | Windows 桌面端“自动修复 CI”复选框失效**
   - **亮点**：由于近期的回归错误，PR 侧边栏中点击该复选框毫无反应，阻断了自动化 CI 修复的工作流。
5. **[Issue #74949](https://github.com/anthropics/claude-code/issues/74949) | 8 评论 | Auto 模式分类器间歇性不可用阻断所有复合 Bash 命令**
   - **亮点**：高峰期分类器宕机，导致 `&&`、管道符等复合命令被全盘拦截，使 Shell 脚本工作完全瘫痪。
6. **[Issue #79933](https://github.com/anthropics/claude-code/issues/79933) | 3 评论 | 桌面端 1.24012.0 所有 MCP 工具调用报 404 错误**
   - **亮点**：昨天刚更新的桌面端版本中，MCP 请求返回 `side_channel_waiting_key_absent`，所有外部工具调用全线瘫痪。
7. **[Issue #78826](https://github.com/anthropics/claude-code/issues/78826) | 4 评论 | MCP 服务器显示已连接但模型无法调用工具**
   - **亮点**：即使 `/mcp` 显示成功连接，工具列表却始终无法暴露给模型，这是近期高频出现的幽灵 MCP Bug。
8. **[Issue #79935](https://github.com/anthropics/claude-code/issues/79935) | 0 评论 | 内置 ugrep 触发 OOM（内存耗尽）**
   - **亮点**：由于 Claude Code 将 `grep` 强制指向内部 `ugrep`，一个双边界量词正则直接吃光系统 RAM 和 Swap。
9. **[Issue #79931](https://github.com/anthropics/claude-code/issues/79931) | 0 评论 | Grep 和 Glob 工具从默认列表中彻底消失**
   - **亮点**：又一个 GrowthBook 实验（`tengu_deferred_stub_tool`）引发的血案，导致开发者失去全局搜索和文件匹配能力。
10. **[Issue #79934](https://github.com/anthropics/claude-code/issues/79934) | 1 评论 | 嵌套子智能体的消息绕过父级直达根会话**
    - **亮点**：在多层 Agent 嵌套时，`SendMessage(to: "main")` 会导致报告直接发送给根节点，破坏了任务分派的上下文闭环。

---

## 4. 重要 PR 进展 (Top 10)

1. **[PR #79620](https://github.com/anthropics/claude-code/pull/79620) | feat: 新增文本转语音 (TTS) Hook**
   - 为视障开发者或解放双手工作流提供支持，跨平台实现 Claude 响应的语音朗读。
2. **[PR #79898](https://github.com/anthropics/claude-code/pull/79898) | Add Claude apps gateway on AWS**
   - 提供了在 AWS 上结合 Amazon Bedrock 运行 Claude apps gateway 的官方参考部署资产。
3. **[PR #79873](https://github.com/anthropics/claude-code/pull/79873) | fix(hookify): 修复 `event: prompt` 规则永不触发的问题**
   - 修复了载荷键名不匹配导致用户提交的 Prompt 规则完全失效的严重逻辑漏洞。
4. **[PR #79644](https://github.com/anthropics/claude-code/pull/79644) | fix: 引号包裹 `${CLAUDE_PLUGIN_ROOT}`**
   - 修复了 macOS 上因系统路径包含空格导致插件 Hook 执行失败的顽疾。
5. **[PR #79645](https://github.com/anthropics/claude-code/pull/79645) | fix(hookify): 以 UTF-8 编码读取规则文件**
   - 解决了 Windows 下默认 cp1252 编码无法解析带有 Emoji 和特殊符号的规则文件的问题。
6. **[PR #79647](https://github.com/anthropics/claude-code/pull/79647) | fix(hookify): 解除对插件目录名称的依赖**
   - 使导入逻辑更加健壮，不再强制要求插件文件夹必须命名为特定的 `hookify`。
7. **[PR #79889](https://github.com/anthropics/claude-code/pull/79889) | fix(hookify): 允许在没有 `CLAUDE_PLUGIN_ROOT` 时运行 Hook**
   - 移除了对环境变量的强依赖，提升了 Hook 脚本在沙盒或外部环境中的可移植性。
8. **[PR #79640](https://github.com/anthropics/claude-code/pull/79640) | fix(ralph-wiggum): 禁止模型调用特定命令**
   - 修正了错误的 Frontmatter 键名，正确使用 `disable-model-invocation` 确保某些危险循环命令仅限用户手动触发。
9. **[PR #79643](https://github.com/anthropics/claude-code/pull/79643) | docs: 修正 `/commit-push-pr` 行为说明**
   - 对齐了文档与实际行为，明确该命令仅基于当前暂存区的 Diff 生成 PR 描述。
10. **[PR #78532](https://github.com/anthropics/claude-code/pull/78532) | gateway/gcp: 支持 PG16 并修复 Terraform 示例**
    - 解决了 Google Cloud SQL 在 PG16+ 版本上默认企业版导致的标准部署报错问题，并加入了内部 ALB 支持。

---

## 5. 功能需求趋势

*   **无障碍与多模态交互**：随着 TTS Hook 的合并（#79620）和读

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 (2026-07-22)

## 1. 今日速览
今日 OpenAI 正式发布了 **Codex `rust-v0.145.0` 正式版**，带来了重磅的底层会话记录重构和跨平台配置无缝迁移功能。与此同时，社区讨论焦点高度集中在**系统资源占用（特别是 Windows 下的 WMI 与进程风暴问题）**以及**新版用量限制策略的抱怨**上。

---

## 2. 版本发布
**[rust-v0.145.0](https://github.com/openai/codex/releases)** (正式版)
- **会话历史大升级**：引入了实验性的分页线程历史记录功能，支持高效恢复、搜索、持久化命名、子智能体支持以及记忆功能。
- **无缝迁移工具**：大幅扩展了 `/import` 命令的能力，现在可以直接迁移 Cursor 和 Claude Code 的设置、MCP 服务器、插件、会话和命令。

*(注：同日更新了多个 alpha 版本至 `0.145.0-alpha.29`，持续打磨底层稳定性。)*

---

## 3. 社区热点 Issues (Top 10)

1. **[#25719](https://github.com/openai/codex/issues/25719) [Bug] macOS Codex Desktop 频繁触发 `syspolicyd` / `trustd` 导致 CPU 和内存暴涨**
   - *关注点*：高优 Bug。macOS 用户反馈独立桌面端会导致系统底层进程失控，严重影响电脑性能，获得了 343 个点赞。
2. **[#8745](https://github.com/openai/codex/issues/8745) [Enhancement] Codex CLI 亟需内置 LSP 集成支持**
   - *关注点*：最高热度需求（430 个点赞）。开发者希望 CLI 能自动检测并安装语言服务器，以提供更精准的代码诊断。
3. **[#2998](https://github.com/openai/codex/issues/2998) [Enhancement] IDE 内集成的 Diff / 审批工作流**
   - *关注点*：215 个点赞。用户希望目前仅在终端体验良好的红绿 Diff 审批流程能够直接无缝集成到 IDE 插件中。
4. **[#33685](https://github.com/openai/codex/issues/33685) [Bug] 每周额度消耗速度与旧版 5 小时限制一样快**
   - *关注点*：策略调整引发的争议。用户反馈取消 5 小时限制后，新的周限额极速流失，引发对计费/用量机制的担忧。
5. **[#33776](https://github.com/openai/codex/issues/33776) / [#34260](https://github.com/openai/codex/issues/34260) [Bug] Windows 桌面端衍生数百个 `taskkill.exe` 进程导致 WMI 风暴**
   - *关注点*：Windows 平台重大性能灾难。进程无法被正常杀死，导致 WMI 提供程序配额耗尽，系统卡死。
6. **[#7291](https://github.com/openai/codex/issues/7291) [Bug] VSCode 扩展无法正常撤销更改**
   - *关注点*：核心功能受阻。Codex 执行的代码修改在尝试 revert 时失败，影响开发者的版本控制安全。
7. **[#17265](https://github.com/openai/codex/issues/17265) [Bug] MCP OAuth Token 不会自动刷新**
   - *关注点*：MCP 生态痛点。即使保存了 refresh_token，Codex 依然不会自动续期，导致长时间会话中的 MCP 工具调用鉴权失效。
8. **[#15310](https://github.com/openai/codex/issues/15310) [Bug] 桌面端自动化任务静默回退到沙盒写入权限**
   - *关注点*：安全与自动化执行。定时任务配置了完全访问权限，但在后台静默执行时却退回到受限沙盒。
9. **[#10185](https://github.com/openai/codex/issues/10185) [Bug] TUI 模式从 Plan 切换到 Code 依然表现为 Plan**
   - *关注点*：核心 CLI 行为异常。模式切换未生效，导致 Agent 继续只规划不写代码。
10. **[#17574](https://github.com/openai/codex/issues/17574) [Bug] 子智能体泄露 stdio MCP 辅助进程树**
    - *关注点*：资源泄露。xcodebuildmcp 和 chrome-devtools-mcp 等辅助进程在子智能体运行后无限积累，耗尽系统资源。

---

## 4. 重要 PR 进展 (Top 10)

1. **[#34605](https://github.com/openai/codex/pull/34605) 支持通过 `/new` 和 `/clear` 命名会话**
   - 落地用户需求，允许在快速重置上下文的同时直接保留有意义的会话名称。
2. **[#34588](https://github.com/openai/codex/pull/34588) 将 MCP 调用绑定到已捕获的目录版本**
   - *关键修复*：防止模型在获取工具列表后，因 MCP 连接动态更新导致调用了模型未曾见过的工具版本，提升执行安全性。
3. **[#34613](https://github.com/openai/codex/pull/34613) 通过限制 SID 路由 Windows 沙盒代理流量**
   - 针对 Windows 环境的网络代理优化，确保提权状态下的沙盒进程能安全稳定地复用回环端口。
4. **[#34563](https://github.com/openai/codex/pull/34563) 实现继承的线程历史分页功能**
   - 为 v0.145.0 的发布提供底层代码支撑，支持跨父子线程和嵌套分支的分页翻阅历史对话。
5. **[#34581](https://github.com/openai/codex/pull/34581) 引入路由卡片的词汇技能选择**
   - 提升 Agent 的意图识别能力，通过解析技能名称、工具依赖和描述的精确匹配来实现更智能的插件路由。
6. **[#34611](https://github.com/openai/codex/pull/34611) 增加技能目录渲染的兼容性策略**
   - 优化插件生态展示，核心端展示完整描述，而扩展端展示简短描述，适应不同 UI 渲染限制。
7. **[#34590](https://github.com/openai/codex/pull/34590) 添加基于键值的环境变量策略过滤器**
   - 增强配置管理，支持对 Shell 启动环境变量进行更精细（正则层级）的 include/exclude 控制。
8. **[#34566](https://github.com/openai/codex/pull/34566) 在 rollout 清理期间保护 fork 历史引用**
   - 防止在清理底层存储记录时，意外删掉通过分页机制产生关联的父子对话记录，保障数据完整性。
9. **[#30154](https://github.com/openai/codex/pull/30154) [code-reviewed] 保留被驱逐 V2 Agents 的状态**
   - 后端内存优化：当 V2 智能体因 LRU 策略被从内存中移除时，依然保持其最终状态（成功/失败）可查，避免前端报 NotFound。
10. **[#34612](https://github.com

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

以下是 2026 年 7 月 22 日的 Gemini CLI 社区动态技术分析师日报：

# 📰 Gemini CLI 社区动态日报 (2026-07-22)

## 1. 今日速览
今日 Gemini CLI 发布了 `v0.52.0` 每日构建版。当前社区核心焦点集中在**智能体的稳定性与安全性**上，大量高优先级（P1）Bug 和 PR 正在致力于修复子智能体无限循环、卡死以及潜在的系统级安全漏洞（如 RCE 漏洞和变量注入绕过）。此外，基于 AST（抽象语法树）的代码库感知能力和评估体系的完善正成为下一阶段演进的重点。

## 2. 版本发布
*   **v0.52.0-nightly.20260721.gacae7124b**
    *   **概览**：每日自动构建版本。
    *   **更新范围**：[查看完整 Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.52.0-nightly.20260720.gacae7124b...v0.52.0-nightly.20260721.gacae7124b)

## 3. 社区热点 Issues (Top 10)
以下 Issues 反映了当前系统在复杂任务执行、安全性和内存管理上的痛点：

1.  **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) [P1] Subagent 达到 MAX_TURNS 时伪装成成功**
    *   *关注点*：子智能体在达到最大轮数被中断时，仍向主进程报告 `status: "success"`，掩盖了任务失败的事实，严重影响复杂任务的可靠性。
2.  **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) [P1] 通用智能体卡死**
    *   *关注点*：当 CLI 调用通用智能体（如创建文件夹等简单操作）时会无限期挂起，开发者只能通过强制禁止子智能体来临时解决。
3.  **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) [P1] Shell 命令执行后卡在 "Waiting input"**
    *   *关注点*：执行简单的 CLI 命令后，终端假死并提示等待用户输入，严重破坏终端交互体验。
4.  **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) [P2] 工具数量超过 128 个时报 400 错误**
    *   *关注点*：当挂载的 MCP 工具或内置工具超过 API 限制时，CLI 缺乏智能裁剪机制导致直接崩溃。
5.  **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) [P2] Auto Memory 缺乏确定性的敏感数据脱敏**
    *   *关注点*：自动记忆功能在将本地对话记录发送给模型前，没有有效拦截密钥等敏感信息，存在潜在的数据泄露风险。
6.  **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) [P2] Auto Memory 无限重试低信号会话**
    *   *关注点*：后台提取器反复读取和处理无价值的会话历史，导致不必要的性能和 Token 消耗。
7.  **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) [P2] 阻止智能体执行破坏性操作**
    *   *关注点*：模型在执行复杂的 Git 操作或修改数据库时，偶尔会使用 `git reset --force` 等高危指令，社区呼吁增加底线防护栏。
8.  **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) [P2] Gemini 不够主动使用自定义 Skills 和 Sub-agents**
    *   *关注点*：即便配置了高度相关的技能，模型也极少自主调用，必须由用户显式指令，降低了自动化工作流的效率。
9.  **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) [P2] 利用零依赖 OS 沙盒执行 Bash 命令**
    *   *关注点*：社区提议利用 Gemini 原生的 Bash 亲和力，在安全的系统级沙盒中执行链式命令，而非依赖重型的内部工具。
10. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) [P2] 引入 AST 感知的文件读取与搜索**
    *   *关注点*：传统按行读取容易截断方法，社区强烈建议引入 AST 解析器，实现更精准的代码库导航和 Token 节约。

## 4. 重要 PR 进展 (Top 10)
今日的 Pull Requests 展现了开发团队在底层稳定性、安全防护和评估基建上的强力推进：

1.  **[#28403](https://github.com/google-gemini/gemini-cli/pull/28403) [P1] 修复 $VAR 变量扩展绕过漏洞 (GHSA-wpqr-6v78-jr5g)**
    *   *进展*：修复了 Bash 和 PowerShell 替换检测中的安全校验缺陷，防止恶意变量扩展逃逸安全网关。
2.  **[#28389](https://github.com/google-gemini/gemini-cli/pull/28389) [P1] 为智能体状态转换添加真实时间预算**
    *   *进展*：从根本上解决由事件驱动引起的智能体无限循环问题，强加全局超时限制。
3.  **[#28388](https://github.com/google-gemini/gemini-cli/pull/28388) [P1] 修复 tools.core 通配符拒绝规则误伤 MCP 工具的 Bug**
    *   *进展*：修复了配置 `tools.core: []` 时意外禁用所有信任的 MCP 工具的严重逻辑漏洞。
4.  **[#28470](https://github.com/google-gemini/gemini-cli/pull/28470) [已关闭] a2a-server 工作区信任与 RCE 隔离重构**
    *   *进展*：为防止零点击远程代码执行（RCE），重构了 a2a-server 启动序列并实现了进程级别的环境隔离。
5.  **[#28397](https://github.com/google-gemini/gemini-cli/pull/28397) [P2] 移除 Shell 工具关键路径上的同步 I/O**
    *   *进展*：将 `fs.mkdtempSync` 等同步阻塞方法替换为异步调用，解决了 React Ink 终端 UI 执行命令时掉帧卡顿的问题。
6.  **[#28469](https://github.com/google-gemini/gemini-cli/pull/28469) [核心修复] 模型回退时轮换 Session ID**
    *   *进展*：当模型降级到 `gemini-2.5-flash` 时刷新 Session ID，修复了后端状态保持导致的 API 致命错误。
7.  **[#28472](https://github.com/google-gemini/gemini-cli/pull/28472) [核心修复] 恢复 GOOGLE_APPLICATION_CREDENTIALS 凭据回退**
    *   *进展*：修复了 Agent 模式下由于缺少凭据回退机制导致的进程意外退出（退出码 41）问题。
8.  **[#28394](https://github.com/google-gemini/gemini-cli/pull/28394) [修复] 修复后台进程退出时的临时文件泄露**
    *   *进展*：解决了使用 `is_background: true` 执行命令后，系统临时目录不断膨胀的资源泄露问题。
9.  **[#28305](https://github.com/google-gemini/gemini-cli/pull/28305) [基建] 增强评估工具的失败诊断输出**
    *   *进展*：在行为评估失败时，自动在控制台格式化输出工具调用的完整时间线和错误详情，大幅提升调试效率。
10. **[#28411](https://github.com/google-gemini/gemini-cli/pull/28411) [维护] 自动关闭 Feature Request 前增加说明**
    *   *进展*：优化自动化机器人的触达体验，在因“核心稳定性优先”而自动关闭功能请求前，先发布友好的解释评论。

## 5. 功能需求趋势
从近期的 Issue 和 PR 趋势来看，社区和官方的发力点集中在以下方向：
*   **智能体架构与安全重构**：正在从“能运行就行”向“企业级

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

这份报告为您梳理了 2026 年 7 月 22 日 GitHub Copilot CLI 的最新社区动态、版本迭代以及开发者关注的焦点。

### 1. 今日速览
今日 Copilot CLI 发布了 **v1.0.74-0** 版本，重点引入了 `/model plan` 功能，允许开发者在计划模式下指定特定的 AI 模型。社区活跃度极高，单日更新了 35 条 Issue，当前热点高度集中在 **MCP (Model Context Protocol) 的深度生态支持**、**长上下文引发的内存与请求体积超限问题**，以及近期版本（如 v1.0.73）带来的多个严重回归 Bug（如文件读取失败、剪贴板失效等）。

---

### 2. 版本发布
**最新预发版本：v1.0.74-0**
- **新增功能**: 引入 `/model plan`（或 `/model --plan`）命令。开发者可以通过传入模型 ID 在计划模式中指定专属模型，输入 `off` 清除，或不带 ID 打开选择器。退出计划模式后将恢复默认会话模型。
- **体验优化**: 优化了历史会话的恢复搜索功能，现在即使会话标题包含不同的空格字符也能精准匹配。

**近期稳定版：v1.0.73 (发布于 2026-07-20)**
- 修复了配置额外目录时 Anthropic 子代理中断工作的问题。
- 优化了自定义代理指令中相对链接的解析路径，现在将从 agent 文件所在位置进行正确解析。

---

### 3. 社区热点 Issues (Top 10)
以下为本期最值得关注的 10 个 Issue，聚焦于系统稳定性和核心工作流阻塞：

1. **[#4188] 计划模式 阻止 Shell 命令执行 (回归 Bug)** ([链接](https://github.com/github/copilot-cli/issues/4188))
   - **关注点**: 最新版本中，计划模式开始阻止 `gh cli` 等 shell 命令的执行。社区认为这是严重的体验倒退，因为这切断了 Agent 在规划阶段读取或创建 Issue 的能力。
2. **[#4163] Linux 环境下产生大量僵尸进程** ([链接](https://github.com/github/copilot-cli/issues/4163))
   - **关注点**: v1.0.71 版本被指出未能正确回收子进程，导致以 Copilot PID 为父进程的僵尸进程（状态为 Z）不断累积（约每分钟 2 个），存在严重的内存泄漏隐患。
3. **[#4183] 正常工具历史记录导致 CAPI 5 MB 请求体超限崩溃** ([链接](https://github.com/github/copilot-cli/issues/4183))
   - **关注点**: 在高频调用工具的长会话中，即使 Token 未超限，序列化后的 CAPI Responses 请求体也很容易触碰 5 MB 的独立硬限制。目前的自动压缩机制无法解决字节数超限问题，导致 Agent 彻底死机。
4. **[#4202] 内置 `view` 工具报错 "Path does not exist" (v1.0.73 回归)** ([链接](https://github.com/github/copilot-cli/issues/4202))
   - **关注点**: 从 v1.0.72 开始出现的严重 Bug，内置的文件查看工具无法读取现有文本文件，而降级到 v1.0.71 则一切正常，阻断了基本的文件读取工作流。
5. **[#3622] Windows 系统下静默复制失败** ([链接](https://github.com/github/copilot-cli/issues/3622))
   - **关注点**: 在 Windows 环境下，将 Agent 输出复制到剪贴板的操作静默失败（无报错，但粘贴出来是旧内容）。该 Bug 从 v1.0.48 之后开始出现。
6. **[#4012] BYOK 自定义模型不支持 `--reasoning-effort max`** ([链接](https://github.com/github/copilot-cli/issues/4012))
   - **关注点**: 使用 BYOK 接入类似 `glm-5.2:cloud` 的模型时，CLI 强制阻断了 `--reasoning-effort max` 标志，即便底层配置完全合法，限制了第三方推理能力。
7. **[#4206] 组织级 MCP 策略导致环境页脚永久卡死在 "Loading"** ([链接](https://github.com/github/copilot-cli/issues/4206))
   - **关注点**: 当内置 GitHub MCP 握手在组织策略下停滞时，底部的环境状态栏会永远显示 `◎ Loading: 1 instruction, 40 skills...`，即使实际上已加载完毕。
8. **[#4208] 诉求：支持自定义 Agent 的显式内联调用和链式调用** ([链接](https://github.com/github/copilot-cli/issues/4208))
   - **关注点**: 目前无法在同一个对话上下文中平滑切换或链式调用 `.github/agents` 中的不同自定义 Agent。开发者呼吁增加更优雅的上下文传承机制。
9. **[#1305] 远程 OAuth MCP 服务器需支持 CIMD 标准** ([链接](https://github.com/github/copilot-cli/issues/1305))
   - **关注点**: 社区持续呼吁完善 OAuth 认证支持，要求实现无需预注册的动态客户端注册（DCR）标准，降低远程 MCP Server 的接入门槛。
10. **[#2193] 支持为 `/fleet` 子代理配置默认模型** ([链接](https://github.com/github/copilot-cli/issues/2193))
    - **关注点**: 目前每次唤醒 `/fleet` 子代理都需要在 Prompt 中手动声明模型。社区希望能在全局或项目级别设定默认子代理模型，减少重复指令。

---

### 4. 重要 PR 进展
*注：过去 24 小时内仅有 1 个 PR 更新，但未见核心代码合并动向。*

1. **[#3163] ViewSonic monitor 环境支持** ([链接](https://github.com/github/copilot-cli/pull/3163))
   - **状态**: Open
   - **简评**: 这是一个由社区开发者 @tijuks 提交的、针对特定环境/监控设备（关联 #2591, #3561 等）的适配及 GitHub Action 初始化 PR。目前处于待审核状态，暂时没有维护者评论。

---

### 5. 功能需求趋势
综合本期及近期 Issues，社区目前最关注的技术演进方向如下：

- **MCP 协议的深度与广度集成**：开发者已不再满足于基础的 MCP Tools 支持，对 **Resources (资源读取)**、**Prompts (提示词模板)** 以及 **Subscriptions (资源订阅与实时更新)** 的诉求呈现爆发趋势（#1518, #1803, #3073）。
- **精细化长上下文与成本管理**：随着 Agent 任务变重，开发者需要更细颗粒度的控制。一方面是要求**可配置的自动压缩阈值**（#1688），另一方面希望能**按子代理拆解 AI Credit 消耗**（#4207）。
- **BYOK (Bring Your Own Key) 的鲁棒性提升**：接入第三方模型时，流式解析（如对 `reasoning_content` 的处理 #4196）和推理深度控制（#4012）成为接入高级模型的关键痛点。

---

### 6. 开发者关注点（痛点总结）

1. **"隐形限制"导致的中断**：除了 Token 限制，API 请求体的 **5 MB 字节硬限制**（#4183）和 Tokenizer 缓存丢失（#4201）经常让长时 Agent 任务功亏一篑，开发者急需更透明的预警机制。
2. **跨端环境兼容性崩塌**：近期的更新似乎对特定终端环境造成了破坏，特别是在 **Windows (剪贴板)**、**VS Code Remote/WSL 下的 tmux/screen**（#4191, #4201）以及 **Linux 下的进程管理**（#4163 僵尸进程）中表现不佳。
3. **沙盒与权限边界冲突**：开发者在使用沙盒环境时，面临权限过严导致的体验割裂。例如，计划模式一刀切禁用 Shell 命令（#4188），以及 Agent 无法安全写入自身的 `plan.md` 规划文件（#4193）。开发者呼吁更细粒度的安全旁路或白名单机制。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

**Kimi Code CLI 社区动态日报 (2026-07-22)**

### 1. 今日速览
今日 Kimi Code CLI 社区无新版本发布，但围绕 `v0.28.1` 及最新模型（如 K2.5、K3）的兼容性问题引发了密集讨论。社区反馈的焦点集中在核心工具链路（Tool Calling）、终端渲染稳定性（UI 抖动）以及输入监听盲区等高优 Bug 上。同时，开发者针对 `StrReplaceFile` 的链式替换逻辑缺陷提交了关键的修复 PR。

### 2. 版本发布
* **过去 24 小时内无新版本发布。**

### 3. 社区热点 Issues
今日共追踪到 5 条活跃 Issue，均围绕近期版本暴露的稳定性和功能性 Bug，以下为重点关注列表：

* **[#2527] K2.5 模型 Tool Calling 完全失效 + Goal Mode 无限循环 (必现)**
  * **关注理由**：属于阻断级 Bug。开发者反馈在使用 K2.5 模型时，Agent 无法正确调用 Bash 工具（提示 "Tool not found"），且在 Goal Mode 下陷入死循环。这直接影响最新模型在生产环境中的可用性。
  * **链接**：[github.com/MoonshotAI/kimi-cli/issues/2527](https://github.com/MoonshotAI/kimi-cli/issues/2527)

* **[#2474] CLI 界面持续抖动，莫名从头重新渲染整个对话**
  * **关注理由**：严重影响开发体验的 UI Bug。在 Linux 环境下使用 K2.7 Code Thinking 模型时，终端界面出现高频抖动和重绘，已累积一定热度（👍 2）。
  * **链接**：[github.com/MoonshotAI/kimi-cli/issues/2474](https://github.com/MoonshotAI/kimi-cli/issues/2474)

* **[#2526] StrReplaceFile 链式编辑时统计替换次数过少**
  * **关注理由**：底层核心文件修改工具的逻辑缺陷。在进行依赖上下文的链式替换时，由于统计基准错误，导致后续编辑失效，直接影响 AI 编写和重构代码的准确性。
  * **链接**：[github.com/MoonshotAI/kimi-cli/issues/2526](https://github.com/MoonshotAI/kimi-cli/issues/2526)

* **[#2529] 键盘右侧数字小键盘输入无响应**
  * **关注理由**：影响 Windows 平台用户的基础交互体验，暴露了 CLI 终端输入事件监听处理不够全面。
  * **链接**：[github.com/MoonshotAI/kimi-cli/issues/2529](https://github.com/MoonshotAI/kimi-cli/issues/2529)

* **[#2528] Shell 模式下输出内容过长**
  * **关注理由**：开发者反馈在使用 `!` 进入 Shell 模式执行命令（如 `git log` 等）时，输出缺乏截断或分页机制，可能导致终端卡顿或上下文溢出。
  * **链接**：[github.com/MoonshotAI/kimi-cli/issues/2528](https://github.com/MoonshotAI/kimi-cli/issues/2528)

### 4. 重要 PR 进展
今日有 1 个重要的代码贡献提交，精准修复了社区反馈的核心工具逻辑问题：

* **[#2524] fix(tools): 针对 running content 统计 StrReplaceFile 的替换次数**
  * **进展说明**：由开发者 @Sreekant13 提交，旨在解决 Issue [#2526](https://github.com/MoonshotAI/kimi-cli/issues/2526)。该 PR 修复了原先针对“原始文件内容”计算替换次数的缺陷，改为针对“正在进行编辑的（running）内容”进行统计。这确保了依赖于前置修改结果的链式编辑能够被正确识别和执行。
  * **链接**：[github.com/MoonshotAI/kimi-cli/pull/2524](https://github.com/MoonshotAI/kimi-cli/pull/2524)

### 5. 功能需求趋势
从近期 Issues 中提炼出社区目前的三个核心演进方向：
1. **多模型兼容与底层工具链适配**：随着 K2.5、K3 等新模型的接入，模型与内置工具（如 Bash, Goal Mode）的底层通信格式适配成为高优诉求。
2. **终端渲染性能与 UX 优化**：针对长文本输出、高频率对话流，CLI 的渲染引擎（重绘逻辑、防抖处理）以及输出流控制（日志截断、分页）亟需优化。
3. **底层文件处理工具健壮性**：社区对 `StrReplaceFile` 等高频代码修改工具的关注度极高，期望 AI 拥有更精准、支持复杂链式操作的文件处理能力。

### 6. 开发者关注点（痛点）
* **Agent 执行链路的稳定性**：开发者极度依赖 Tool Calling 和 Goal Mode 完成自动化任务，当前版本中出现的死循环和工具识别失败极大消耗了 Token 且阻断了工作流。
* **多平台输入与显示兼容性**：Linux 端的 TUI 渲染异常和 Windows 端的小键盘监听缺失，反映出 CLI 跨平台底层事件处理仍有打磨空间。
* **Shell 交互的上下文管理**：原生 Shell 模式（`!` 命令）的野蛮输出让开发者感到担忧，社区呼吁引入更智能的日志折叠或长度限制机制。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

这里是 2026 年 7 月 22 日的 OpenCode 社区动态日报。

### 1. 今日速览
今日 OpenCode 社区无新版本发布，但核心架构（特别是 V2 引擎与 TUI 渲染层）的底层重构非常活跃。社区讨论的焦点集中在**严重的内存泄漏问题**、**Agent 执行时的无限卡死循环**，以及部分用户反馈的**计费与上游 API 异常**。

### 2. 版本发布
*过去 24 小时内无新版本发布。*

---

### 3. 社区热点 Issues (Top 10)

*   **[#20695] Memory Megathread (内存问题集中讨论帖)**
    *   **动态**: 评论数高达 117，是近期最热门的 Issue。
    *   **分析**: 官方正在集中排查内存溢出（OOM）及高占用问题。开发者明确指出 LLM 自动生成的修复建议通常是错的，目前迫切需要社区提供手动获取 Heap Snapshots（堆快照）的真实数据以供分析。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/issues/20695)
*   **[#37012] [FEATURE] 保留旧版布局选项**
    *   **动态**: 评论数 25。
    *   **分析**: 新版 UI 上线后引发部分老用户不满。用户反馈旧版布局访问功能更直观，且支持良好的工作区多开，呼吁保留 Legacy Layout。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/issues/37012)
*   **[#37790] [BUG] OpenCode Go 订阅扣费成功但提示“余额不足”**
    *   **动态**: 支付链路严重 Bug。
    *   **分析**: 用户通过 Stripe 成功付款，但系统状态未正确同步，导致无法使用订阅服务，直接影响付费用户的业务可用性。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/issues/37790)
*   **[#30680] OpenCode 陷入自动压缩死循环**
    *   **动态**: 核心机制 Bug。
    *   **分析**: 即使在空文件夹下，Agent 也会疯狂触发 auto-compaction 并空耗 Token，最终导致模型彻底拒绝生成回复。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/issues/30680)
*   **[#31119] [BUG] Error: no such column: name**
    *   **动态**: 致命阻断错误。
    *   **分析**: 更新至 1.16.2 版本后，大量回归用户遭遇底层数据库 Schema 报错，直接导致应用彻底不可用。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/issues/31119)
*   **[#33028] [BUG] 快速 bash 调用后子代理无限挂起**
    *   **动态**: 执行流阻断问题。
    *   **分析**: Agent 调用 bash 工具后，后续的 LLM 流式请求永不超时，导致进程死锁，只能靠强制杀进程解决。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/issues/33028)
*   **[#19130] Windows ARM64 原生 TUI 初始化失败**
    *   **动态**: 平台兼容性问题。
    *   **分析**: 在 Windows 11 ARM64 下，非交互命令正常，但 TUI 界面因 `bun:ffi` 加载 TinyCC 动态库失败而无法启动。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/issues/19130)
*   **[#14292] [FEATURE] 将会话数据保存在项目目录下**
    *   **动态**: 数据本地化管理需求。
    *   **分析**: 社区希望打破全局 `~/.opencode` 的强制存储方式，将会话记录随项目目录本地化，便于版本管理和便携迁移。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/issues/14292)
*   **[#17073] [FEATURE] 在 grep/glob 结果中保护 .env 文件**
    *   **动态**: 安全防护增强需求。
    *   **分析**: 当前的权限控制仅作用于直接读取，但在 grep/glob 搜索时，敏感文件内容极易被意外暴露。社区要求加强搜索层面的拦截。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/issues/17073)
*   **[#37056] opencode-go 代理模型频繁报 400/401/500**
    *   **动态**: API 网关稳定性问题。
    *   **分析: 在订阅 Go 计划后，处理大请求体（如 300KB+）时上游几近必现 400 错误，且存在 API Key 鉴权间歇性失效（401）现象。*
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/issues/37056)

---

### 4. 重要 PR 进展 (Top 10)

*   **[#38183] feat(core): 从结构化快照渲染 CodeMode 目录增量**
    *   **意义**: 核心架构大改。将 CodeMode 提示词管理从全量替换升级为语义级的部分更新，大幅优化 LLM 的指令理解效率。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/pull/38183)
*   **[#37174] refactor(tui): 为 V2 键盘绑定引入 Command IDs**
    *   **意义**: TUI 交互重构。通过规范的 Command ID 映射键盘快捷键，兼容 V1 插件的同时，大幅提升配置的灵活性。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/pull/37174)
*   **[#37936] fix(opencode): 权限匹配算法更改为“最高特定优先级”**
    *   **意义**: 修复权限系统的底层逻辑漏洞，将“最后匹配生效”改为“最具体规则优先”（关联修复了 4 个相关 Issue），增强安全性。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/pull/37936)
*   **[#38175] feat(session-ui): 在聊天框中原生渲染 Mermaid 图表**
    *   **意义**: 提升用户体验，Markdown 中的 Mermaid 代码块将直接渲染为图表，同时保留源码复制功能。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/pull/38175)
*   **[#38177] perf(tui): 批量事件传播优化**
    *   **意义**: 针对 TUI 性能的重磅优化。在不丢失协议事件的前提下，减少了 SolidJS 响应式触发和渲染调度，能有效缓解高并发解码时的卡顿。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/pull/38177)
*   **[#38179] feat(plugin): 暴露应用元数据**
    *   **意义**: 统一并暴露 Host 版本、通道等应用元数据，为 V2 插件系统、MCP 客户端和健康监测提供标准化环境变量。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/pull/38179)
*   **[#38184] fix(core): 动态发现 Copilot API 端点**
    *   **意义**: 增强模型集成兼容性。V2 OAuth 认证完成后自动探测并持久化账号专用的 Copilot 端点，提升连接成功率。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/pull/38184)
*   **[#34563] feat(opencode): 动态发现 Abacus 模型**
    *   **意义**: 打破静态模型库限制，通过 `/v1/models` 端点动态拉取 Abacus 提供商的 77+ 个隐藏文本生成模型。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/pull/34563)
*   **[#38189] fix(core): 标识化派生子代理**
    *   **意义**: 为子代理显式添加 Spawned Subagent 上下文，帮助主代理更好地区分主任务与委派任务，减少上下文污染。
    *   🔗 [查看链接](https://github.com/anomalyco/opencode/pull/38189)
*   **[#38

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Qwen Code 社区动态日报 (2026-07-22)**

### 1. 今日速览
今日 Qwen Code 正式发布了 [v0.20.1](https://github.com/QwenLM/qwen-code)，主要带来了 Autofix 标签驱动的接管与调度机制。当前社区高度聚焦于**子代理的深度管理**（如后台驻留、会话接管与恢复）以及**启动性能优化**（懒加载机制）。此外，OpenAI 兼容模型在 Tool Call 上的特殊行为导致了大量兼容性 Bug，引起了开发者的广泛关注与讨论。

---

### 2. 版本发布
*   **[v0.20.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.20.1)**
    *   **核心特性**：引入了基于标签驱动的 Autofix 接管与发布机制，并修复了强制调度时的无操作绿屏问题。
    *   **底层组件**：发布了 `cua-driver-rs v0.7.3`，提供了相对坐标分支的预编译二进制文件，支持 macOS（签名+公证）、Linux 和 Windows 跨平台。

---

### 3. 社区热点 Issues
以下是过去 24 小时内社区讨论最热烈的 10 个 Issue：

1.  **[Issue #7316](https://github.com/QwenLM/qwen-code/issues/7316)** | `OpenAI 兼容模型导致 SubAgent 完全不可用` (P2)
    *   **关注点**：部分 OpenAI 兼容模型为可选参数 `working_dir` 返回空字符串，导致工具调用包含语义互斥字段，子代理直接崩溃。这是目前第三方模型接入的最大痛点。
2.  **[Issue #7156](https://github.com/QwenLM/qwen-code/issues/7156)** | `Bug: 子代理篡改主会话模型引发上下文溢出` (P1, 已关闭)
    *   **关注点**：在子代理执行期间，主会话模型被静默切换为子代理模型，导致致命的 400 错误。该路径与此前修复的 #7119 不同，说明核心存在深层路由 Bug。
3.  **[Issue #7433](https://github.com/QwenLM/qwen-code/issues/7433)** | `Bug: 使用本地模型时 SDK 错误报告当前模型为 coder-model` (P2)
    *   **关注点**：开发者通过 ACP 使用本地 llama.cpp 模型时，SDK 依然报告模型为 `coder-model(qwen-oauth)`，导致前端状态展示与实际运行不符。
4.  **[Issue #7306](https://github.com/QwenLM/qwen-code/issues/7306)** | `强化工具输出预算、可观测性与工件生命周期` (P2)
    *   **关注点**：针对模型上下文容易爆掉的痛点，该提案旨在系统性重构 Tool 输出的截断机制和监控。目前 Phase 1 已合并，减少了 14,096 个面向模型的字符。
5.  **[Issue #7056](https://github.com/QwenLM/qwen-code/issues/7056)** | `VS Code 扩展无法连接 Qwen agent` (P2)
    *   **关注点**：`qwen-code-vscode-ide-companion` 扩展频繁报 ACP 进程意外退出错误，严重影响了 IDE 侧的用户体验。
6.  **[Issue #7287](https://github.com/QwenLM/qwen-code/issues/7287)** | `Bug: 自动记忆系统首次更新必然被拒` (P2)
    *   **关注点**：`MEMORY.md` 在会话开始时被注入 System Prompt，但未在 `FileReadCache` 中注册，导致大模型随后尝试写入该文件时，由于未通过“先读后写”校验而失败。
7.  **[Issue #7118](https://github.com/QwenLM/qwen-code/issues/7118)** | `Windows 独立安装因 SHA-256 校验失败而中止` (P2)
    *   **关注点**：部分 Windows 环境下 PowerShell 无法解析 `Get-FileHash`，导致独立安装包卡在哈希校验阶段。
8.  **[Issue #7427](https://github.com/QwenLM/qwen-code/issues/7427)** | `Web Shell 中的 artifact 面板在刷新时疯狂报错` (P2)
    *   **关注点**：`qwen serve` Web Shell 界面在自动刷新或 prompt 完成时，弹出大量 "Load artifacts failed: Failed to fetch" 的 Toast 提示。
9.  **[Issue #5540](https://github.com/QwenLM/qwen-code/issues/5540)** | `功能需求：允许恢复已完成的后台子代理` 
    *   **关注点**：目前的子代理是一次性的，处于 `completed` 状态后无法继续发送消息。社区呼吁支持 revive 机制以节省多轮对话开销。
10. **[Issue #7139](https://github.com/QwenLM/qwen-code/issues/7139)** | `Windows Docker 沙箱向 ACP Shell 传递无效工作目录` (P1, 已关闭)
    *   **关注点**：在 Windows 11 上使用 Docker 沙箱时，所有 Shell 工具调用都报 `chdir(2) failed`，映射路径存在跨系统兼容性问题。

---

### 4. 重要 PR 进展
以下是值得关注的 10 个核心代码合并请求：

1.  **[PR #7302](https://github.com/QwenLM/qwen-code/pull/7302)** | `feat(cli): 通过 @ 引用历史会话并添加补全标签`
    *   **价值**：极大地增强了上下文管理。用户现在可以通过 `@` 提及之前的会话，系统会注入只读的结构化记录摘要。
2.  **[PR #7426](https://github.com/QwenLM/qwen-code/pull/7426)** & **[PR #7459](https://github.com/QwenLM/qwen-code/pull/7459)** | `feat(core): 保持已完成的后台代理驻留与恢复`
    *   **价值**：允许父会话重新打开时恢复被中断或已完成的后台代理运行时，免去了重新初始化的开销。
3.  **[PR #7455](https://github.com/QwenLM/qwen-code/pull/7455)** | `perf(startup): 将 undici 置于包级动态导入后实现懒加载`
    *   **价值**：将 HTTP 客户端移出冷启动闭包，节省了约 2 MiB 的解析/编译开销，大幅提升 CLI/ACP 启动速度。
4.  **[PR #7256](https://github.com/QwenLM/qwen-code/pull/7256)** | `fix(core): 剥离子环境变量中的 Qwen 内部守护进程密钥`
    *   **价值**：关键安全修复。防止模型通过生成的 Shell 进程读取到 `QWEN_SERVER_TOKEN` 等敏感信息。
5.  **[PR #7343](https://github.com/QwenLM/qwen-code/pull/7343)** & **[PR #7403](https://github.com/QwenLM/qwen-code/pull/7403)** | `fix(agent): 忽略空的 working_dir 占位符`
    *   **价值**：兼容性修复。针对 OpenAI 模型返回空字符串导致的子代理崩溃问题（对应 Issue #7316），在参数路由前将其规范化为 unset。
6.  **[PR #6486](https://github.com/QwenLM/qwen-code/pull/6486)** | `feat(cli): 添加模型切换热键 (Ctrl+F)`
    *   **价值**：允许用户在交互式 CLI 中通过快捷键一键在当前模型和备用模型间无缝切换，提升多模型工作流体验

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*