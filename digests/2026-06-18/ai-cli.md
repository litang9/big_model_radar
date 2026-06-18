# AI CLI 工具社区动态日报 2026-06-18

> 生成时间: 2026-06-18 15:43 UTC | 覆盖工具: 7 个

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

以下是为您生成的 AI CLI 工具生态横向对比分析报告（基于 2026-06-18 社区动态）：

# 2026年 AI CLI 工具生态横向对比分析报告 (2026-06-18)

## 1. 生态全景
当前 AI CLI 工具已跨越早期的“极客尝鲜”阶段，全面进入**企业级生产环境与复杂工程落地**的深水区。各大工具的竞争焦点正从单纯的“模型代码生成能力”向**沙箱安全性、跨平台运行时兼容性（如内核级隔离）、以及多智能体（Agent）编排稳定性**转移。同时，随着模型上下文协议（MCP）成为行业标准，生态建设的重心正向**打破工具孤岛、实现 IM/IDE/Web 端无缝互联**以及**细粒度的权限与 Token 预算管控**倾斜。

## 2. 各工具活跃度对比
整体来看，主流工具保持极高迭代频次，底层架构重构与 DX（开发者体验）优化并行。

| 工具名称 | 今日版本发布 | 核心 Issues 热度/重点 | 活跃 PR 数 | 核心迭代方向 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | v2.1.181 | 10+ (Linux桌面端呼声高、静默覆盖Bug) | 7+ | 命令行配置增强、macOS沙盒兼容、权限细化 |
| **OpenAI Codex** | rust-v0.141.0 (+Alpha) | 10+ (Linux端计费痛点、Win非ASCII崩溃) | 10+ | E2E加密远程执行、Token预算控制、作用域隔离 |
| **Gemini CLI** | v0.47.0 (+Preview) | 10+ (Agent挂起、终端执行卡死) | 10+ | Notebook修复、AST感知代码理解、安全脱敏 |
| **GitHub Copilot CLI**| 无 | 10+ (MCP OAuth失效、BYOK兼容性) | 1 | 计划审查兼容性回退、BYOK深度支持 |
| **Kimi Code CLI** | 无 | 2 (系统代理不生效、配置心智负担) | 1 | 底层网络代理透明化重构 |
| **OpenCode** | v1.17.8 | 10+ (Agent沙箱隔离、热重载呼声) | 10+ | 后台托管执行、多模型用量追踪、配置碎片化 |
| **Qwen Code** | v0.18.3 (+Nightly) | 10+ (多Agent崩溃、GIF Token计算错) | 10+ | IM平台无缝集成(微信/钉钉)、CJK/Emoji底层重构 |

## 3. 共同关注的功能方向
通过对各社区 Issue 和 PR 的聚类分析，当前开发者存在以下高度共鸣的诉求：
* **Linux 平等对待与跨平台兼容**：**Claude Code** 和 **Codex** 社区对 Linux 原生桌面版呼声极高（分别获 460/600 赞），且 Codex 因缺乏 Linux 端导致额度重置失效；同时，**Codex** 和 **Qwen Code** 均在集中修复 Windows 非 ASCII 路径（如中文名）导致的系统级故障和 UI 渲染问题。
* **Agent 安全沙箱与细粒度权限**：开发者对“黑盒执行”极度不信任。**Claude Code** 呼吁区分读/写/删权限；**OpenCode** 和 **Gemini CLI** 强烈要求引入目录级沙箱隔离和“防破坏”护栏（如阻止盲目的 `git reset --force`）。
* **MCP 协议的稳定性与企业级集成**：MCP 工具的加载失效或认证断层是通病。**Claude Code**、**Copilot CLI** 均报告了 MCP OAuth 认证后无法调用的链路断层问题；**OpenCode** 则在跟进 MCP 资源订阅 API 的兼容性。
* **长上下文与 Token 预算控制**：面对长会话，**Codex** 在底层引入了“共享 Rollout Token 预算”；**Qwen Code** 针对多智能体长会话崩溃进行优化；**Gemini CLI** 则试图通过 AST 感知精准截取代码，以减少 Token 噪声。

## 4. 差异化定位分析
* **Claude Code**：**“深度集成与工作流中枢”**。侧重于无缝融入开发者的高频心流，如打通 Web 端架构规划与 CLI 端编码、引入语音连续监听模式减轻手部劳损，适合追求极致 DX 的全栈开发者。
* **OpenAI Codex**：**“底层基建与安全可控”**。技术路线偏向硬核与底层，通过 Rust 重写并引入端到端加密的 Noise 中继通道，强调远程执行的安全性与多环境网络隔离，适合对安全性要求极高的企业级Agent任务。
* **Gemini CLI**：**“架构演进与代码深度理解”**。走在探索 Agent 自治的前沿，重点攻克 AST（抽象语法树）感知工具，试图让 AI 从“字符串匹配”进化为“语义级代码库理解”，适合大型复杂工程的重构场景。
* **GitHub Copilot CLI**：**“BYOK生态与企业合规”**。核心发力点在于放开模型限制（深度兼容 Ollama Cloud 等自定义模型）以及对企业级内容排除策略的遵守，定位为高度可定制的企业内部提效工具。
* **OpenCode**：**“极客开源与高自由度”**。主打动态配置（热重载、碎片化配置）、后台托管执行模式及基于任务类型的智能模型调度，满足喜欢折腾工作流流的高级开发者。
* **Qwen Code / Kimi Code**：**“本土化与全场景触达”**。在国内特色网络环境（Kimi 修复系统代理）和 IM 生态融合（Qwen 深度接入微信、钉钉，解决长文本分割、Emoji 渲染）上具备绝对优势，更适合国内敏捷团队和自动化机器人构建者。

## 5. 社区热度与成熟度评估
* **高频迭代期（Codex, Gemini CLI, Qwen Code, OpenCode）**：这四款工具今日均有新版本发布且 PR 极度活跃，底层重构动作频繁（如 Codex 的 Rust 化、Gemini 的依赖锁死），正处于快速跑马圈地、修补核心架构短板的阶段。
* **稳健演进期**：今日无版本发布，但 Issue 讨论极具深度（如 BYOK 兼容、插件按需声明），表明其基础架构已趋稳定，社区正在向挖掘高阶用法和精细化管理过渡。
* **痛点爆发期**：积累了大量如 Cowork 虚拟机启动失败、静默覆盖配置文件等长期未解的体验 Bug，需警惕快速迭代带来的“配置负债”。

## 6. 值得关注的趋势信号（开发者参考价值）
1. **“静默失败”是当前 Agent 最大的隐患**：无论是 Gemini 子 Agent 达到轮次后的“伪成功”，还是 Claude/CLI 的“静默覆盖文件”、“跨目录数据修改”，都提醒开发者：**现阶段不要给予 AI 完全的文件写权**，必须配置 Pre-commit hooks 或目录沙箱。
2. **MCP 工具链路存在“断点”**：虽然 MCP 爆发，但前端 UI、CLI、认证层和执行环境之间的链路依然脆弱。开发者在自建 BFF 或集成第三方 MCP 时，需做好容错降级机制，不能假设工具调用 100% 成功。
3. **多模型混合调度成为可能**：从 Codex 的环境级作用域限制，到 OpenCode 的基于任务类型自动路由模型，未来的 CLI �

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下是为您生成的《Claude Code Skills 社区热点报告（数据截止 2026-06-18）》：

### 1. 热门 Skills 排行（基于 PR 影响力与生态价值）
当前社区开发的重心正从基础脚本向**企业级系统集成、Agent 记忆框架及开发测试全流程**演进。以下是最具代表性的热门 Skills：

*   **skill-quality-analyzer & skill-security-analyzer** (状态: [OPEN])
    *   **功能**: 针对 Claude Skills 本身进行质量和安全分析的“元技能”，评估文档结构、依赖安全及提示词注入风险。
    *   **社区热点**: 社区高度关注 Skills 治理，该 PR 回应了大家对官方分发渠道中安全信任边界问题的担忧。
    *   **链接**: [PR #83](https://github.com/anthropics/skills/pull/83)
*   **shodh-memory (持久化上下文)** (状态: [OPEN])
    *   **功能**: 为 AI Agents 提供跨会话的持久化记忆系统，动态结构化存储和召回历史交互上下文。
    *   **社区热点**: 解决了 Claude Code 长线任务处理时“遗忘”初始设定的问题，是迈向真正自治 Agent 的核心基建。
    *   **链接**: [PR #154](https://github.com/anthropics/skills/pull/154)
*   **AURELION Skill Suite (认知与记忆框架)** (状态: [OPEN])
    *   **功能**: 包含内核、顾问、Agent 和记忆四个模块的套件，提供结构化思维模板以规范 AI 的推理逻辑。
    *   **社区热点**: 超越了单一的代码生成，偏向复杂的知识管理和专业级认知协作。
    *   **链接**: [PR #444](https://github.com/anthropics/skills/pull/444)
*   **ServiceNow / SAP-RPT-1-OSS 平台技能** (状态: [OPEN])
    *   **功能**: 深度集成 ServiceNow (覆盖 ITSM, SecOps 等) 和 SAP 的开源表格基础模型，执行企业级预测分析与流转。
    *   **社区热点**: 标志着 Claude Code 正加速渗透传统大型企业 IT 架构与内部运维流。
    *   **链接**: [ServiceNow PR #568](https://github.com/anthropics/skills/pull/568) | [SAP PR #181](https://github.com/anthropics/skills/pull/181)
*   **testing-patterns (全栈测试模式)** (状态: [OPEN])
    *   **功能**: 覆盖单元测试、React 组件测试及 E2E 测试的指导技能，推行 Testing Trophy 模型。
    *   **社区热点**: 补齐了 Claude Code 在“代码生成”之后的“质量保障”短板，是目前开发者最迫切的SDLC补丁之一。
    *   **链接**: [PR #723](https://github.com/anthropics/skills/pull/723)

### 2. 社区需求趋势（提炼自 Issues）
通过分析高票 Issues，当前社区对 Skills 生态的期待集中在以下四个方向：

*   **跨组织与企业级安全分发机制**：用户苦于无法在团队内共享 Skills（需手动分发文件），同时社区强烈要求解决第三方 Skill 冒用 `anthropic/` 官方命名空间带来的越权与信任边界滥用风险。（[Issue #228](https://github.com/anthropics/skills/issues/228), [Issue #492](https://github.com/anthropics/skills/issues/492)）
*   **Skill 交互协议底层改造**：开发者呼吁将 Skills 暴露并标准化为 MCPs (Model Context Protocol)，使其能像普通 API 一样被其他软件结构化调用。（[Issue #16](https://github.com/anthropics/skills/issues/16)）
*   **与主流云后端的无缝对接**：用户急需明确的指南和官方支持，以便将现有的 Skills 运行在 AWS Bedrock 等第三方托管的 Claude 环境中。（[Issue #29](https://github.com/anthropics/skills/issues/29)）
*   **内部文档系统的安全访问**：针对 SharePoint 等企业内部网盘，希望 SKILL.md 内置细粒度的权限控制（RBAC），以安全地处理内部机密文档。（[Issue #1175](https://github.com/anthropics/skills/issues/1175)）

### 3. 高潜力待合并 Skills（修复与优化类）
以下处于 [OPEN] 状态的 PR 解决了社区当前最棘手的系统级 Bug，预计将被官方优先合并：

*   **修复 `skill-creator` 召回率与跨平台崩溃问题 (高优先级)**
    *   **痛点**: 多位开发者报告在 Windows 上运行 `run_eval.py` 优化描述时，召回率始终显示为 0%，导致优化逻辑失效。
    *   **关联高潜力 PR**: 
        *   [PR #1298](https://github.com/anthropics/skills/pull/1298) (彻底修复 0% recall bug 及并行工作流)
        *   [PR #1099](https://github.com/anthropics/skills/pull/1099) / [PR #1050](https://github.com/anthropics/skills/pull/1050) (修复 Windows 环境下的子进程执行与编码错误)
*   **修复文档处理时的数据损坏风险**
    *   **痛点**: 生成 DOCX 时因 ID 冲突导致文档损坏，以及 YAML 多字节字符（如中文）引发的截断。
    *   **关联高潜力 PR**:
        *   [PR #541](https://github.com/anthropics/skills/pull/541) (解决 OOXML 修订追踪 ID 冲突问题)
        *   [PR #362](https://github.com/anthropics/skills/pull/362) (修复多字节字符引发的 UTF-8 panic)
*   **补充社区协同规范**
    *   [PR #509](https://github.com/anthropics/skills/pull/509) 提供了缺失的 `CONTRIBUTING.md`，这将大幅改善仓库的社区健康度指标。

### 4. Skills 生态洞察
> **“社区目前最集中的诉求，正从‘编写单个功能脚本’迅速转向‘构建跨平台兼容性、保障企业级内容安全以及实现 Agent 持久化记忆的工程化基建’。”**

---

**Claude Code 社区动态日报 (2026-06-18)**

作为一名专注于 AI 开发工具的技术分析师，以下是为您整理的今日（2026年6月18日）Claude Code 开源社区动态汇总。

### 1. 今日速览
今日 Claude Code 发布了 `v2.1.181` 版本，重点增强了命令行配置的灵活性与 macOS 的沙盒兼容性。社区方面，开发者对 **Linux 官方桌面版**的呼声极高（获 460+ 点赞），同时 **Cowork 虚拟机启动失败**及 **MCP 工具加载失效**等核心 Bug 引发了大量讨论。此外，多起关于“文件静默覆盖”及“会话上下文丢失”的问题报告值得官方警惕。

---

### 2. 版本发布
**[v2.1.181](https://github.com/anthropics/claude-code/releases)** 更新内容摘要：
* **配置增强**：新增 `/config key=value` 语法，允许在交互模式、`-p` 及 Remote Control 中直接通过提示符修改设置（如 `/config thinking=false`）。
* **macOS 沙盒优化**：新增 `sandbox.allowAppleEvents` 可选设置，允许沙盒环境下的命令在 macOS 上发送 Apple Events。
* **其他更新**：补充了 `CLAUDE_CLIENT_P` 相关配置（截断未完全展示）。

---

### 3. 社区热点 Issues (Top 10)
以下为本日最受关注或最具技术讨论价值的 10 个 Issue：

1. **[FEATURE] Official Claude Desktop build for Linux** | [#65697](https://github.com/anthropics/claude-code/issues/65697)
   * **关注度** 👍: 460 | 💬: 41
   * **分析**：Linux 开发者强烈呼吁推出官方原生的 Ubuntu/Debian 桌面版，这是目前社区功能请求中点赞量最高的 Issue。
2. **[BUG] Cowork: "Failed to start Claude's workspace"** | [#27801](https://github.com/anthropics/claude-code/issues/27801)
   * **关注度** 💬: 69 | 👍: 38
   * **分析**：Cowork 功能在重启后依然报 "VM service not running" 错误，此 Bug 已存在近 4 个月，严重影响部分用户的核心工作流。
3. **[BUG] MCP Tools Not Available... Despite Successful Connection** | [#2682](https://github.com/anthropics/claude-code/issues/2682)
   * **关注度** 💬: 35 | 👍: 26
   * **分析**：经典 Bug。MCP Server 连接成功并能列出工具，但在对话中无法调用。这对依赖 MCP 生态的开发者是个痛点。
4. **[BUG] Terminal rendering corruption in tmux** | [#29937](https://github.com/anthropics/claude-code/issues/29937)
   * **关注度** 💬: 22 | 👍: 48
   * **分析**：在 `tmux` 和 `alacritty` 环境下，TUI 出现文本重叠和覆盖，影响终端硬核玩家的使用体验。
5. **[BUG] Renamed session works on first resume but... disappears** | [#25090](https://github.com/anthropics/claude-code/issues/25090)
   * **关注度** 💬: 31 | 👍: 29
   * **分析**：会话重命名后，第二次退出时会丢失名称。属于影响项目管理体验的交互级 Bug。
6. **[FEATURE] Share conversation context from Claude.ai to Claude Code** | [#13843](https://github.com/anthropics/claude-code/issues/13843)
   * **关注度** 💬: 20 | 👍: 83
   * **分析**：开发者希望打通 Web 端与 CLI 端的上下文，实现“网页端规划架构，CLI 端直接写代码”的无缝衔接。
7. **[BUG] Cowork on macOS 1.8555.2 — zero MCP tools bind...** | [#62072](https://github.com/anthropics/claude-code/issues/62072)
   * **关注度** 💬: 11
   * **分析**：自 5 月 23 日更新后引入的回归问题，macOS 上的 Cowork 模式完全无法绑定 MCP 工具，疑似丢失了 `--mcp-config` 启动参数。
8. **[FEATURE] Expose token usage data to statusline scripts** | [#11535](https://github.com/anthropics/claude-code/issues/11535)
   * **关注度** 💬: 11 | 👍: 18
   * **分析**：开发者请求将 Token 用量暴露给状态栏脚本，以便更精细地控制 API 成本。
9. **[BUG] claude.json silently overwritten... LOST my COMPLETE MCP SERVERS** | [#69354](https://github.com/anthropics/claude-code/issues/69354)
   * **关注度** 💬: 1（今日新增）
   * **分析**：**高危 Bug**。当 `claude.json` 包含块级注释 (`/* */`) 时会被静默覆盖，导致开发者自定义的 MCP 服务配置全部丢失，需引起高度重视。
10. **[FEATURE] Permission auto-approve should separate read/write/delete** | [#69352](https://github.com/anthropics/claude-code/issues/69352)
    * **关注度** 💬: 2（今日新增）
    * **分析**：目前权限自动批准过于宽泛（如 `git *`）。开发者呼吁将权限细化，区分只读和写/删操作，以防模型执行危险的破坏性命令。

---

### 4. 重要 PR 进展
今日数据源中包含 7 个活跃 PR，以下为值得关注的代码贡献（注：受限于数据源总量，列举以下重点）：

1. **fix: Update Dockerfile to use native installer** | [#33443](https://github.com/anthropics/claude-code/pull/33443) by @pri2si17-1997
   * 将容器环境的安装方式从已弃用的 `npm install` 切换为原生安装程序，并升级至 Node 24.14，提升 Docker 环境下的部署稳定性。
2. **fix(code-review): allow re-reviews when new commits are pushed** | [#19867](https://github.com/anthropics/claude-code/pull/19867) by @nielskaspers
   * 优化代码审查插件逻辑：当有新 Commit 推送时，允许 Claude 重新审查，而不是直接跳过。
3. **fix: hookify Python 3.8 compat and cwd-independent rule loading** | [#23972](https://github.com/anthropics/claude-code/pull/23972) by @clowerweb
   * 修复了 `hookify` 插件在 Python 3.8 (Ubuntu 20.04 默认版本) 上的崩溃问题，提升了老系统的兼容性。
4. **Update frontend-design skill** | [#69226](https://github.com/anthropics/claude-code/pull/69226) by @williamqian12 (已合并)
   * 更新了前端设计技能插件，并将版本提升至 1.1.0。
5. **fix(scripts): break pagination when page is not full** | [#68673](https://github.com/anthropics/claude-code/pull/68673) by @AZERDSQ131
   * 修复了脚本分页逻辑的边缘情况判断错误。

---

### 5. 功能需求趋势
从近期 Issue 汇总来看，社区需求呈现以下三大趋势：
1. **跨平台与多端融合**：Linux 桌面端呼声最高 (#65697)；打通 Claude.ai 与 Claude Code 的上下文 (#13843)；读取 VS Code 终端输出 (#69360)。
2. **细粒度安全与权限控制**：开发者不再满足于粗放的权限放行，希望对文件操作 (读/写/删)、工具调用提供更细粒度的拦截和超时取消机制 (#69352, #69372)。
3. **语音模式智能化**：针对原生语音输入，社区呼吁增加连续监听 (#30761)、VAD 静音自动发送 (#69373) 以及自定义专业词汇替换 (#31599)，以减轻手部劳损，适应专业开发场景。

---

### 6. 开发者关注点与痛点
* **数据安全与配置稳定性**：多个 Issue 报告了“静默失败”或“文件覆盖”问题（如 `claude.json` 配置被清空 #69354，Tool-call 被

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 - 2026-06-18

## 1. 今日速览
今日 Codex 发布了 `rust-v0.141.0` 正式版，最突出的改进是引入了端到端加密的 Noise 中继通道，并全面优化了跨平台远程执行的环境兼容性。社区方面，Linux 版桌面端的缺失引发了关于“额度重置无法通用”的严重连锁反馈；同时，Windows 系统中由于非 ASCII 用户名导致的磁盘占用暴增及崩溃问题持续发酵。底层研发方面，官方正在密集合并关于会话 Token 预算控制和多环境作用域隔离的代码。

## 2. 版本发布
**rust-v0.141.0 正式版发布**
- **安全通信升级**：远程执行器（Remote executors）现在使用经过身份验证、端到端加密的 Noise 中继通道，大幅提升了远程代码执行的安全性。（[相关 PR: #26242](https://github.com/openai/codex/pull/26242), [#26245](https://github.com/openai/codex/pull/26245)）
- **跨平台兼容增强**：跨平台远程执行现在能够保留执行器原生的工作目录和 Shell 环境，包括在 app-server 和 exec-server 边界之间正确处理文件系统权限路径。
- *注：官方同日还发布了 `0.142.0-alpha.1` 等多个 Alpha 测试版本。*

---

## 3. 社区热点 Issues (Top 10)

1. **[强烈呼吁] Codex desktop app for Linux** ([#11023](https://github.com/openai/codex/issues/11023))
   - **关注度**：123 评论 | 600 👍
   - **分析**：Linux 桌面端是当前社区呼声最高的功能（600个赞）。缺乏原生 Linux 客户端不仅影响体验，还导致 Linux 用户无法享受最新的额度重置等运营策略，矛盾日益加剧。
2. **[严重 Bug] GPT-5.5 速率限制消耗异常暴增** ([#28879](https://github.com/openai/codex/issues/28879))
   - **关注度**：4 评论 | 2 👍 (今日新建)
   - **分析**：多名 Plus 用户反馈自 6 月 16 日起，相同任务的 Token 消耗暴增 10-20 倍，原本 20+ 次的 5 小时额度在 2-3 次对话后即耗尽。严重影响生产力，需官方紧急介入。
3. **[体验痛点] 无法验证旧手机号导致账号被锁** ([#25749](https://github.com/openai/codex/issues/25749))
   - **关注度**：50 评论 | 30 👍
   - **分析**：用户更换手机号后，Codex 强制要求验证无法接收短信的旧号码，且无恢复路径。即便 Google OAuth 和 ChatGPT 正常，Codex 依然被锁死，认证流程设计存在重大缺陷。
4. **[计费 Bug] Linux 用户无法获取或使用额度重置** ([#27915](https://github.com/openai/codex/issues/27915))
   - **关注度**：10 评论 | 22 👍
   - **分析**：由于新的额度重置机制仅绑定 Desktop App，直接导致没有桌面端的 Linux 用户被变相“剥夺”了重置额度的权利。
5. **[高频 Bug] 模型上下文窗口耗尽** ([#9046](https://github.com/openai/codex/issues/9046))
   - **关注度**：31 评论
   - **分析**：在仅发送一条消息时也会报“上下文空间不足”。上下文压缩与管理依然是长对话场景下的技术软肋。
6. **[系统级故障] Windows 中文用户名导致磁盘被大量垃圾文件撑爆** ([#28258](https://github.com/openai/codex/issues/28258), 及 #28093, #28691 等)
   - **关注度**：多个相关 Issue 合计十余条评论
   - **分析**：Windows 平台近期爆出严重兼容问题，若用户目录包含非 ASCII 字符（如中文），Codex 的 `cua_node` 会无限循环创建 272MB 的 `.staging` 运行时文件夹，导致系统卡顿甚至磁盘瘫痪。
7. **[集成缺失] Chrome 扩展插件在商店中消失** ([#21700](https://github.com/openai/codex/issues/21700))
   - **关注度**：20 评论 | 18 👍
   - **分析**：Codex 桌面端用于接管浏览器的 Computer Use 扩展程序已无法在 Chrome 应用商店下载，导致相关自动化工作流彻底瘫痪。
8. **[交互优化] 禁止将长文本自动转为 .txt 附件** ([#25144](https://github.com/openai/codex/issues/25144))
   - **关注度**：57 评论 | 80 👍
   - **分析**：App 端近期将粘贴的长 Prompt 自动转换为附件，导致模型解析格式错误。社区强烈要求提供关闭该自动转换功能的开关。
9. **[企业级需求] 用量限制重置后自动恢复 CLI 会话** ([#21073](https://github.com/openai/codex/issues/21073))
   - **关注度**：9 评论 | 14 👍
   - **分析**：开发者希望长时间运行的 Agent 任务能在触及限额并被中断后，等到额度刷新时自动恢复执行，而不是需要人工手动重启。
10. **[IDE 集成] Codex Desktop 未渲染 MCP Apps 行内 UI 资源** ([#21019](https://github.com/openai/codex/issues/21019))
    - **关注度**：9 评论 | 13 👍
    - **分析**：虽然 Codex 能触发 MCP 工具，但无法读取 `mcp_app_resource_uri` 渲染行内 iframe，限制了第三方插件在桌面端的可视化交互。

---

## 4. 重要 PR 进展 (Top 10)

1. **[架构] 添加共享 Rollout Token 预算控制** ([#28494](https://github.com/openai/codex/pull/28494), [#28746](https://github.com/openai/codex/pull/28746), [#28707](https://github.com/openai/codex/pull/28707))
   - **内容**：引入了在多线程会话中共享 Token 预算的机制。当预算耗尽时，将自动中断当前会话，为未来实现“限额自动恢复与长耗时任务”打下底层基础。
2. **[安全] 按执行环境划分网络审批作用域** ([#28899](https://github.com/openai/codex/pull/28899))
   - **内容**：网络权限审批现在被限定在具体的执行环境中。在一个环境中允许访问的域名，不会自动穿透到其他环境，提升了多任务并行时的安全性。
3. **[核心] 增加回合级别的上下文注入** ([#28911](https://github.com/openai/codex/pull/28911))
   - **内容**：将上下文注入拆分为“线程级”和“单次对话级”，允许扩展基于当前对话的临时状态动态注入上下文，使提示词工程更加精准。
4. **[稳定性] 恢复执行进程的 stdin 写入** ([#28895](https://github.com/openai/codex/pull/28895))
   - **内容**：修复了当 exec-server 的 websocket 意外断开时，远程 MCP 服务器的 stdin 写入失败导致进程被错误关闭的 Bug。
5. **[插件系统] 插件根路径全面 URI 化** ([#28918](https://github.com/openai/codex/pull/28918))
   - **内容**：要求插件路径以 `file://` URI 形式传递（如 `file:///opt/plugins/foo`），此举有望从根本上解决 Windows 下因非 ASCII 路径解析乱码导致的 bug（对应 Issue #28258）。
6. **[效率] 暂停被 TUI 中断的活跃目标** ([#28813](https://github.com/openai/codex/pull/28813))
   - **内容**：当用户按下 `Esc` 强行中断 Agent 运行时，系统会自动将当前正在执行的 `/goal` 状态标记为“暂停”，防止后台任务脱离控制继续执行。
7. **[文件系统] 在 App-server 暴露文件系统元数据大小** ([#28928](https://github.com/openai/codex/pull/28928))
   - **内容**：在 `fs/getMetadata` 接口响应中增加 `sizeBytes` 字段，优化客户端读取大文件或判断文件修改状态时的网络开销。
8. **[性能] 优化 Git 的 fsmonitor 刷新机制** ([#28843](https://github.com/openai/codex/pull/28843))
   - **内容**：修复了 Codex 传递 `--no-optional-locks` 参数导致 Git 的 fsmonitor 缓存失效的问题，减少了后台不必要的全量 Worktree 扫描，降低 CPU 占用。
9. **[搜索] 引入 Index-gated 网络搜索模式** ([#28489](https://github.com/openai/codex/pull/28489))
   - **内容**：在现有的 `disabled`、`cached`、`live` 之外新增了 `index_gated` 搜索模式，可能用于控制模型只能访问特定白名单或本地索引的网页，提升企业级数据安全。
10. **[MCP] 将 MCP 沙盒元数据绑定到服务器环境** ([#28914](https://github.com/openai/codex/pull/28914))
    - **内容**：修复了 MCP 沙盒状态以前错误地使用主线程工作目录的问题，现在会根据 MCP 服务器自身所属的执行环境重新构建沙盒策略。

---

## 5. 功能需求趋势

根据今日 Issues 的互动量和标签分布，社区当前最关注的功能方向集中在：
1. **跨平台桌面端对齐**：Linux 桌面端研发迫在眉睫，不仅是 UI �

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

这里是为您生成的 2026 年 6 月 18 日 Gemini CLI 社区动态日报。

# 🗞️ Gemini CLI 社区动态日报 (2026-06-18)

## 1. 今日速览
今日 Gemini CLI 发布了 **v0.47.0** 正式版以及 **v0.48.0-preview.0** 预览版，持续优化底层依赖与发布流水线。社区侧焦点集中在 **Agent（智能体）执行稳定性与安全性**，包括通用 Agent 频繁挂起、终端命令执行卡死等多个 P1 级 Bug 引起热烈讨论。此外，开发者通过 PR 修复了 Jupyter Notebook 文件损坏等严重问题，并积极探索 AST 感知工具以提升 Agent 深度代码理解能力。

## 2. 版本发布
*   **[v0.47.0](https://github.com/google-gemini/gemini-cli/pull/28002)**: 最新稳定版发布，主要整合了近期的底层重构，优化了后端定义处理。
*   **[v0.48.0-preview.0](https://github.com/google-gemini/gemini-cli/pull/27999)**: 预览版发布，引入了 Dependabot 的依赖更新冷却期机制，以增强依赖更新的稳定性。

---

## 3. 社区热点 Issues (Top 10)

1.  **[P1 Bug] 通用 Agent 挂起无响应 ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409))**
    *   **关注点**: 开发者反馈 `gemini-cli` 在将任务委派给通用 Agent（如创建文件夹等简单操作）时会永久挂起。禁用子 Agent 可临时解决。这是当前最影响体验的阻断性问题。
2.  **[P1 Bug] 终端命令执行后卡在 "Waiting input" ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166))**
    *   **关注点**: Gemini 执行完简单的 CLI 指令后，UI 依然显示 shell 命令处于活动状态并等待输入，导致交互卡死。
3.  **[P1 Bug] 子 Agent 达到 MAX_TURNS 却误报成功 ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323))**
    *   **关注点**: `codebase_investigator` 触发最大轮次限制被中断后，仍向主 Agent 报告 `status: "success"`。这种“伪成功”掩盖了真实错误，极具迷惑性。
4.  **[P2 Security] 自动记忆缺乏确定性脱敏 ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525))**
    *   **关注点**: Auto Memory 会在脱敏前将本地会话记录发送给模型，存在潜在的密钥/敏感信息泄露风险，亟需在发送前引入硬编码的脱敏逻辑。
5.  **[P2 Feature] 评估 AST 感知的代码读取与搜索 ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745))**
    *   **关注点**: 探讨通过 AST（抽象语法树）感知工具来优化 Agent 对代码库的理解，从而减少 Token 噪声并精准定位方法边界。这是提升 Agent 编码能力的核心架构演进。
6.  **[P2 Bug] 模型过度依赖自定义 Skills 和子 Agents ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968))**
    *   **关注点**: 尽管配置了相关的 Skills（如 git/gradle），Agent 在执行强关联任务时仍极少主动调用它们，需要开发者显式指令才能触发。
7.  **[P2 Bug] 模型在随机位置创建临时脚本 ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571))**
    *   **关注点**: Agent 执行 Shell 命令时，倾向于在各个目录乱建编辑脚本，导致工作区难以管理和清理。
8.  **[P1 Bug] get-shit-done 输出钩子导致崩溃 ([#22186](https://github.com/google-gemini/gemini-cli/issues/22186))**
    *   **关注点**: 在打印用户摘要前，输出钩子频繁引发 CLI 崩溃，破坏工作流。
9.  **[P2 Bug] 工具数量 >128 时触发 400 错误 ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246))**
    *   **关注点**: 当环境可用工具超过 128 个时，会直接触发 API 400 错误，要求 Agent 具备更智能的工具集上下文裁剪能力。
10. **[P2 Feature] 阻止 Agent 的破坏性操作 ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672))**
    *   **关注点**: 社区呼吁 Agent 应内置安全护栏，在处理复杂 Git 分支或数据库时，避免盲目使用 `git reset --force` 等危险指令。

---

## 4. 重要 PR 进展 (Top 10)

1.  **[修复] 解决 Jupyter Notebook 和 JSON 文件损坏 ([#28000](https://github.com/google-gemini/gemini-cli/pull/28000))**
    *   修复了 `write_file` 工具静默损坏 `.ipynb` 和 JSON 文件格式的高危 Bug，大幅提升数据安全性。
2.  **[功能] 新增 `gemini models` 命令 ([#27848](https://github.com/google-gemini/gemini-cli/pull/27848))**
    *   允许用户通过命令行快速列出所有可用的 Gemini 模型、上下文窗口限制及其层级，支持文本和 JSON 格式输出。
3.  **[修复] 根据 Content-Type 正确解码网页内容 ([#27996](https://github.com/google-gemini/gemini-cli/pull/27996))**
    *   此前 `web-fetch` 工具强制使用 UTF-8 解码，此 PR 修复了中文 (GBK)、日文及遗留编码网站返回乱码的问题。
4.  **[修复] 修复 WSL 下分支名称不同步的问题 ([#28012](https://github.com/google-gemini/gemini-cli/pull/28012))**
    *   针对无 `fs.watch` 事件的挂载文件系统（如 WSL `/mnt/c/`），解决了执行 `git checkout` 后 UI 底部分支名称不更新的痛点。
5.  **[修复] 优化系统提示词中的 Skill/Agent 替换逻辑 ([#27994](https://github.com/google-gemini/gemini-cli/pull/27994))**
    *   修复了在提示词注入时，由于使用全局正则表达式替换导致的 `$1` 等变量解析异常，确保 Skills 内容原样、准确注入。
6.  **[重构] 参数解析抛出 FatalConfigError 替代直接退出 ([#27987](https://github.com/google-gemini/gemini-cli/pull/27987))**
    *   将 `process.exit(1)` 重构为抛出特定异常，解决了 `--help` / `--version` E2E 测试中经常挂起的问题。
7.  **[测试] 修复 macOS 符号链接测试失败 ([#27990](https://github.com/google-gemini/gemini-cli/pull/27990))**
    *   解决了在 macOS 下由于 `/var` 指向 `/private/var` 导致的核心文件读写工具（EditTool/WriteFileTool）单元测试失败的问题。
8.  **[安全] 保护 fork PR 触发的链式工作流 ([#27780](https://github.com/google-gemini/gemini-cli/pull/27780))**
    *   修补了安全漏洞，防止恶意外部 fork PR 通过 `workflow_run` 链式调用携带恶意载荷，同时确保带有 `GEMINI_API_KEY` 的作业安全。
9.  **[维护] 锁定依赖版本并引入 14 天冷却期 ([#27948](https://github.com/google-gemini/gemini-cli/pull/27948))**
    *   移除所有依赖的 `^` 和 `~` 前缀以严格锁定版本，并为自动化依赖更新设置 14 天的缓冲期，提升构建稳定性。
10. **[功能] 新增 `eval:inventory` CLI 命令 ([#28009](https://github.com/google-gemini/gemini-cli/pull/28009))**
    *   引入本地测试清单命令，方便开发者快速扫描和统计仓库中已定义的 Behavior Evals（行为评估测试用例）。

---

## 5. 功能需求趋势
综合近期的 Issues 和 PR，社区对 Gemini CLI 的功能演进呈现出以下核心趋势：
*   **AST 感知与精准代码理解**：传统正则或纯文本读取已无法满足复杂工程需求，社区强烈呼唤引入 AST 感知工具来优化代码库映射、方法边界定位，从而减少 Token 消耗和“幻觉”。
*   **Agent 自治与可靠性**：Agent 需要更强的上下文管理能力（如自动处理超过 128 个工具的上下文），以及在遇到死循环或最大轮次时能够真实上报而非“伪装成功”。
*   **企业级安全与护栏**：针对 Auto Memory 功能的隐私脱敏前置化需求急迫；同时要求在执行 Shell 命令时建立“防破坏”机制，避免对工作区和版本库造成不可逆污染。

## 6. 开发者关注点与痛点总结
1.  **终端渲染与 Shell 控制流卡死**：从命令执行卡

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

以下是为您生成的 2026-06-18 GitHub Copilot CLI 社区动态日报。

---

# 📰 GitHub Copilot CLI 社区动态日报 (2026-06-18)

## 1. 今日速览
今日 GitHub Copilot CLI 社区焦点主要集中在 **MCP (Model Context Protocol) 认证与工具调用兼容性**、**BYOK (自带模型) 场景下的结构化输出报错**，以及**文件引用（`@` 语法）失效**等问题上。尽管过去 24 小时内没有发布新版本，但开发者们围绕自定义模型集成、会话管理及多智能体工作流提出了大量高质量的 Bug 反馈与功能诉求。

## 2. 版本发布
**无**。过去 24 小时内无新版本发布。（当前社区主流测试与反馈版本多集中于 `v1.0.63` 和 `v1.0.64-0`）。

## 3. 社区热点 Issues (Top 10)
以下是今日社区讨论热度最高、影响面最广或最具代表性的 10 个 Issue：

*   **[#3838] Drive MCP OAuth 认证无效导致工具调用失败** `[OPEN]`
    *   **关注点**：MCP 服务器在 OAuth 浏览器授权成功并生成本地缓存后，实际发起工具调用时依然报错“missing required authentication credential”。
    *   **链接**：https://github.com/github/copilot-cli/issues/3838
*   **[#3839] Ollama Cloud 不支持 Copilot CLI 的 `custom_tool_call` 负载** `[OPEN]`
    *   **关注点**：在 Fleet Mode 下使用 BYOK 路由到 Ollama Cloud 时，因 CLI 发送了 `custom_tool_call` 类型的 input item 导致 `400 Bad Request`，反映了 CLI 与第三方模型 API 的兼容性痛点。
    *   **链接**：https://github.com/github/copilot-cli/issues/3839
*   **[#1974] 升级至 1.0.3 后生成的 Markdown 链接无法点击** `[OPEN]`
    *   **关注点**：影响终端视觉体验与效率的老旧 UI Bug，至今未完全修复，引发多轮讨论。
    *   **链接**：https://github.com/github/copilot-cli/issues/1974
*   **[#3074] 提议增加 `/effort` 命令快速切换推理算力** `[OPEN]`
    *   **关注点**：开发者希望能在执行简单或复杂任务时，无需繁琐的设置，通过斜杠命令快速在 Low/Medium/High 之间切换模型的推理消耗。
    *   **链接**：https://github.com/github/copilot-cli/issues/3074
*   **[#3518] 恢复被意外归档的项目会话** `[OPEN]`
    *   **关注点**：对于长运行、多层级调用的 Agent 编排会话，归档操作目前不可逆，用户迫切需要“撤销归档”功能以挽回丢失的上下文。
    *   **链接**：https://github.com/github/copilot-cli/issues/3518
*   **[#3812] 自定义子代理无法访问 MCP 工具** `[CLOSED]`
    *   **关注点**：由于 MCP 工具延迟加载机制的变动，导致下级 Subagents 无法再获取和调用 MCP 工具，破坏了已有的复杂工作流。
    *   **链接**：https://github.com/github/copilot-cli/issues/3812
*   **[#3730] 支持 Enterprise 管理的自定义模型** `[CLOSED]`
    *   **关注点**：企业级用户希望在 CLI 中也能无缝使用 VS Code 等其他 Copilot 客户端中已配置好的 OpenAI 兼容端点和自定义模型。
    *   **链接**：https://github.com/github/copilot-cli/issues/3730
*   **[#3754] `--resume` 恢复带有空格的会话名时静默崩溃** `[OPEN]`
    *   **关注点**：`copilot --resume "Name With Spaces"` 会无任何报错直接以退出码 1 退出，与官方文档行为不符。
    *   **链接**：https://github.com/github/copilot-cli/issues/3754
*   **[#3841] CLI 错误地强制执行组织级内容排除策略** `[OPEN]`
    *   **关注点**：组织管理员设置的 Content Exclusions 原本只应作用于 GitHub 代码审查，但现在却拦截了本地 CLI 的文件工具调用，影响了本地代码的处理。
    *   **链接**：https://github.com/github/copilot-cli/issues/3841
*   **[#3849] Windows 本地沙箱运行命令报 `E_NOTIMPL` 错误** `[OPEN]`
    *   **关注点**：Windows 平台开启实验性本地沙箱后，无法在沙箱内启动进程，暴露了跨平台底层 API 实现的缺失。
    *   **链接**：https://github.com/github/copilot-cli/issues/3849

## 4. 重要 PR 进展
*(注：过去 24 小时内仅更新了 1 个 PR)*

*   **[#3847] Plan review: 兼容性回退方案设计与测试向量** `[OPEN]`
    *   **内容**：针对严格的 OpenAI 兼容后端（不提供 `function_call` 元数据）导致计划审查菜单不可用的问题（对应 Issue #3846），此 PR 提供了一套 JSON 优先解析策略，并辅以 YAML 和列表启发式解析的设计文档与测试用例。
    *   **链接**：https://github.com/github/copilot-cli/pull/3847

## 5. 功能需求趋势
综合近期 Issues，社区最关注的功能演进方向如下：
1.  **更完善的 BYOK (自带模型) 与第三方 API 兼容性**：开发者深度集成 Ollama Cloud、严格 OpenAI 兼容端点等，呼吁 CLI 的底层通信（如 Tool Call 描述、Plan Review 解析）能更加解耦和标准化（#3839, #3846, #3730）。
2.  **更精细的会话与任务生命周期管理**：要求支持会话“反归档”（#3518）、改进后台子代理的执行与队列消息处理（#3344）、以及完善 `--resume` 在复杂命名或路径提示上的细节（#3754, #3837）。
3.  **指令与配置的动态加载 (MCP & Plugins)**：社区希望 Skill 文件或 Plugin 能够按需声明和启用额外的 MCP 服务器（#3292），以及让插件能打包并共享指令文件（#2727）。
4.  **工作流提效的轻量化命令**：如呼吁增加一键切换模型算力的 `/effort`（#3074）和自定义别名系统 `/commands`（#3844）。

## 6. 开发者关注点（高频痛点）
*   **`@` 语法文件引用大面积失效/降级**：多位开发者反馈近期版本中，在包含符号链接（#435）、非当前根目录（#3834）或带有特定字母前缀（#3854）的情况下，`@` 自动补全和文件展开功能完全失效，严重影响了上下文投递的效率。
*   **MCP 工具链的稳定性与认证断层**：MCP 服务器虽然在连接端表现正常，但在 OAuth 凭据下发（#3838）、跨层级的子代理调用权限同步（#3812）以及 SDK 编程模式注入（#3850）中频繁掉链子。
*   **状态同步不一致**：CLI 端与 GUI 端（如 VS Code）的状态不同步引发困惑，典型如 `--effort` 启动参数在 CLI 设置为 `xhigh`，但在 VS Code UI 中却显示为 `Medium`（#3851）。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

**Kimi Code CLI 社区动态日报 (2026-06-18)**

### 1. 今日速览
今日 Kimi Code CLI 社区整体活跃度平稳，无新版本发布。社区讨论与贡献主要聚焦于**特殊网络环境下的代理配置**以及**初始配置体验（DX）的优化**。开发者 @logicwu0 针对高赞的代理网络 Bug 迅速提交了修复 PR，展现了社区的高效协作。

### 2. 版本发布
* **无新版本发布**。（注：根据 Issue 反馈，当前社区实际运行版本已至 `1.43.0`，并已支持最新的 `K2.7 Code` 模型）。

### 3. 社区热点 Issues
*今日数据更新量较少，以下为近期/今日最值得研发团队关注的 2 个核心 Issue：*

* **[#2455] [OPEN] [bug] FetchURL 未读取系统代理，在被墙环境下无法访问外网，而 Shell/curl 正常**
  * **关注原因**：这是一个影响国内开发者或企业内网开发者的严重阻断性 Bug。当系统配置了 `HTTP_PROXY`/`HTTPS_PROXY` 时，Kimi CLI 内置的 `FetchURL` 无法正常发起外部网络请求，导致 Web 搜索等功能失效，而同环境下的 `curl` 表现正常。
  * **社区反应**：引发了开发者的共鸣与讨论，确认该问题普遍存在于 Linux/WSL 环境中。
  * **链接**：[https://github.com/MoonshotAI/kimi-cli/issues/2455](https://github.com/MoonshotAI/kimi-cli/issues/2455)

* **[#2460] [CLOSED] Feedback: onboarding and configuring MCP servers, plugins, and sub-skills is harder than it needs to be**
  * **关注原因**：这是一个关于开发者体验（DX）的高质量反馈。用户指出，尽管 Kimi Code 功能强大（支持 cua-driver、MCP servers、插件、子技能包等），但初始化配置和串联这些组件的学习成本过高，花费了大量时间在“配置环境”而非“使用工具”上。
  * **社区反应**：已被官方关闭（可能已收录至内部研发规划或转化为具体 Task）。这表明官方可能已意识到引导链路上的不足。
  * **链接**：[https://github.com/MoonshotAI/kimi-cli/issues/2460](https://github.com/MoonshotAI/kimi-cli/issues/2460)

### 4. 重要 PR 进展
*今日仅有 1 个 PR 更新，但其质量与响应速度值得关注：*

* **[#2461] [OPEN] fix(net): honour system proxy env vars in aiohttp sessions**
  * **功能描述**：针对 Issue #2455 的修复方案。贡献者 @logicwu0 发现底层 HTTP 请求库（`aiohttp`）在建立会话时未读取系统代理环境变量。此 PR 重构了网络层的代理处理逻辑，确保 CLI 内部网络请求行为与标准 Shell 网络环境保持一致。
  * **重要性**：修复后将大幅改善受限网络环境（如国内直连、公司安全内网）下 CLI 联网工具链的可用性。
  * **链接**：[https://github.com/MoonshotAI/kimi-cli/pull/2461](https://github.com/MoonshotAI/kimi-cli/pull/2461)

### 5. 功能需求趋势
从今日及近期的 Issue 交互中，可以提炼出以下两个明显的功能演进趋势：
1. **底层网络与运行环境兼容性**：CLI 工具需要适应更复杂的系统级网络策略。支持 HTTP/SOCKS 代理、内网穿透环境、以及跨平台（特别是 WSL 架构）的稳定性是基础刚需。
2. **配置体验“零门槛化”**：随着 Kimi Code 能力边界的扩展（集成 MCP、插件系统等），配置复杂度呈指数级上升。社区强烈期望能有“一键引导配置”、“可视化配置面板”或“开箱即用”的预设方案。

### 6. 开发者关注点
* **网络代理的透明化处理**：开发者痛点在于“本地脚本能通，但 AI 工具内的网络模块不通”。开发者在排查网络问题时耗费了大量精力，呼吁 AI CLI 工具应更深度地遵守宿主机的系统环境变量。
* **插件与 MCP 体系的串联心智负担**：高级用户在构建包含 MCP 服务器、驱动（如 cua-driver）和子技能的复杂工作流时，当前缺乏清晰的调试日志和统一的配置入口，心智负担较重。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

以下是 2026-06-18 OpenCode 社区动态日报。

### 1. 今日速览
OpenCode 今日发布了 **v1.17.8** 版本，重点修复了 OpenAI 兼容提供商的 MCP 工具模式校验失败问题，并显著优化了会话时间线的加载性能。社区方面，开发者对 **Agent 沙箱安全隔离**、**动态配置热重载** 的呼声极高，同时关于旧版 Intel Mac 兼容性（SIGILL 崩溃）以及多会话状态同步的修复 PR 正在积极推进中。

---

### 2. 版本发布
**[v1.17.8](https://github.com/anomalyco/opencode/releases)**
- **Core 性能优化**: 会话时间线加载速度大幅提升，消除了闪烁和滚动跳动现象。
- **Bug 修复**: 修复了 OpenAI 兼容提供商无法接受 MCP 工具 schemas 的校验报错。
- **Bug 修复**: 修复了 Cloudflare AI Gateway 无法正确接收已配置 API Key 的问题。

---

### 3. 社区热点 Issues
以下是今日最值得关注的 10 个 Issue，反映了社区的核心诉求与痛点：

1. **[Issue #2242] Agent 沙箱隔离机制缺失** (👍 55, 💬 73)
   - **关注点**：开发者强烈希望限制 Agent 访问当前目录之外的文件或执行危险终端命令。同类竞品（如 Gemini-CLI）已有 macOS seatbelt 方案，OpenCode 目前在此方面存在空白。
2. **[Issue #8751] 请求支持 Agents/Commands 热重载** (👍 77, 💬 18)
   - **关注点**：社区希望能免去重启应用即可生效配置的需求，允许在运行态动态创建或重载 Agent 和技能。
3. **[Issue #8456] 基于任务类型自动路由模型** (👍 37, 💬 8)
   - **关注点**：用户希望 OpenCode 能具备智能模型调度能力，根据不同任务特征自动选择最适合的大模型。
4. **[Issue #32749] Explore Agent 严重浪费 Token** (💬 4)
   - **关注点**：主控 Agent 频繁无脑调用 Explore 子代理（即使一个简单的 grep 就能解决），导致多余的 Token 消耗和文件重复读取。
5. **[Issue #30680] 自动压缩死循环** (💬 7)
   - **关注点**：即使在新文件夹中，OpenCode 也会不断触发 auto-compaction 消耗 Token，最终导致模型停止生成响应。
6. **[Issue #32801] 跨目录无感知的数据覆盖** (💬 2)
   - **关注点**：严重安全隐患。在多分支工作树中打开目录 A，OpenCode 却在后台静默修改目录 B 的数据，缺乏路径校验通知。
7. **[Issue #16610] 启动时由于 `.git` 目录导致卡死** (💬 10)
   - **关注点**：当系统的 `inotify` 实例数耗尽时，只要路径下存在 `.git`，OpenCode 就会直接挂起。
8. **[Issue #32850] / [#29039] 旧版 Intel Mac 核心崩溃 (SIGILL)** (💬 3)
   - **关注点**：在 pre-Haswell (如 Ivy Bridge) CPU 的 macOS 上，x64-baseline 二进制文件依然会因缺少 AVX2 指令集而直接闪退。
9. **[Issue #32420] 订阅支付成功但未激活** (💬 4)
   - **关注点**：多位用户反馈支付了 OpenCode Go 订阅费用，但工作区未生效，且客服反馈迟缓，影响付费体验。
10. **[Issue #21495] 递归技能发现与 TUI 多选** (👍 6, 💬 4)
    - **关注点**：目前的 `skills` 命令仅发现表层技能，用户希望能递归读取并支持在终端 UI 中多选执行。

---

### 4. 重要 PR 进展
今日共有多个关键修复与功能增强 PR 提交：

1. **[PR #32854] 修复文件监听启动失败导致 TUI 崩溃**
   - 将 watcher 初始化改为非致命错误。如果启动失败只记录警告而不阻塞应用，直接修复了上述 Issue #16610 的卡死问题。
2. **[PR #32675] 引入托管后台执行模式**
   - 核心突破。为核心 bash 工具和 OpenCode shell 增加了受管制的后台运行能力，解决长时间命令阻塞痛点。
3. **[PR #9545] 统一使用量追踪**
   - 为 Anthropic Claude、GitHub Copilot 和 OpenAI ChatGPT 等 OAuth 认证的提供商添加了内置的 Token 使用量追踪，并暴露 `/usage` API。
4. **[PR #31322] TUI 轮询外部会话变更**
   - 修复了当外部进程（或 `opencode serve`）修改会话时，本地 TUI 视图状态不同步、不刷新的隔离问题。
5. **[PR #29355] 增加 MCP 资源订阅 API**
   - 为 MCP 客户端增加了 resource subscription 能力，进一步完善了对复杂 MCP Server 的兼容性。
6. **[PR #16525] 支持 `config.d` 碎片化配置**
   - 允许用户将配置拆分到多个文件中管理，大幅提升大型项目配置的灵活度。
7. **[PR #32075] 可配置的计划提醒**
   - 允许用户覆盖或自定义 Plan 模式中的提醒机制，提升了 Agent 任务委派的可控性。
8. **[PR #29354] 支持用户配置中针对特定模型的限制覆盖**
   - 修复了自定义模型 `limit.context` / `limit.output` 被错误丢弃的问题，方便用户接入私有化模型。
9. **[PR #29356] 将 Skills API 暴露给插件系统**
   - 通过 `PluginInput.skills` 让第三方插件也能直接调用 OpenCode 的技能体系，生态扩展性大增。
10. **[PR #32844] 修复 Token 预留逻辑**
    - 修复了在开启自动压缩时，未给下一次响应正确保留全部输出预算的深层 Bug。

---

### 5. 功能需求趋势
通过对近期 Issue 和 PR 的分析，当前社区最关注的功能方向集中在：
- **Agent 安全与权限控制**：强烈需要沙箱机制、目录读写限制以及跨目录操作保护。
- **配置即代码与热更新**：对 `config.d` 多文件配置、Agent/Plugin 热重载的需求激增。
- **多模型协同与调度**：社区期望从“手动切模型”进化为“基于任务/Plan 动态分配模型

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# 📰 Qwen Code 社区动态日报 (2026-06-18)

**数据来源:** [github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

---

### 1. 🌤️ 今日速览
今日 Qwen Code 正式发布了 `v0.18.3` 稳定版及对应的 Nightly 版本，主要修复了文件历史追踪与 CLI 交互中断的问题。社区活跃度极高，大量提交集中在**终端 UI 字符串处理优化（CJK/Emoji）**、**多渠道（微信/钉钉/QQ）集成完善**以及**弱网环境下的 SSE 流稳定性提升**。此外，安全方面修复了一个潜在的 GitHub 远程仓库校验绕过漏洞。

---

### 2. 🚀 版本发布
*   **[v0.18.3](https://github.com/QwenLM/qwen-code/releases/tag/v0.18.3) & [v0.18.3-nightly](https://github.com/QwenLM/qwen-code/releases/tag/v0.18.3-nightly.20260618.bc3e0b405)**
    *   **核心修复**: 修复了在用户取消 `ask_user_question` 后 CLI 未正确停止的问题。
    *   **历史追踪**: 改进了核心逻辑，现在可以在文件历史中正确追踪和支持 `sed` 编辑操作。

---

### 3. 🔥 社区热点 Issues (Top 10)
以下筛选了今日最具讨论价值和技术深度的 Issues：

1.  **[Issue #5180](https://github.com/QwenLM/qwen-code/issues/5180) - 多智能体长会话崩溃**
    *   **动态**: 主会话作为项目经理派发任务给 subagent，但运行 12 小时后崩溃。
    *   **分析**: 属于 `roadmap/multi-agent` 和长上下文管理范畴，暴露了超长会话下的内存或 Token 管理瓶颈。
2.  **[Issue #5210](https://github.com/QwenLM/qwen-code/issues/5210) - 0.18.1 版本 ExitPlanMode 卡住**
    *   **动态**: 模型使用 `qwen3.7-max` 时，卡在退出计划模式长达 7 个多小时。
    *   **分析**: 影响开发体验的严重阻塞 Bug，社区反映近期频发。
3.  **[Issue #5265](https://github.com/QwenLM/qwen-code/issues/5265) - API Error 400: content field is required**
    *   **动态**: 强制重启后重开会话报错 `InternalError.Algo.InvalidParameter`。
    *   **分析**: 会话恢复时的状态序列化/反序列化可能丢失了关键的消息体内容。
4.  **[Issue #5234](https://github.com/QwenLM/qwen-code/issues/5234) - 工具调用陷入死循环**
    *   **动态**: Agent 在调用工具时无法正常终止。
    *   **分析**: 经典的 Agent 决策失效问题，可能与特定模型（如 qwen3.7-plus）的工具调用格式解析有关。
5.  **[Issue #5339](https://github.com/QwenLM/qwen-code/issues/5339) - GIF 图片 Token 计算错误**
    *   **动态**: `ImageTokenizer` 缺少对 `image/gif` 的 MIME 类型支持，导致 GIF 总是回退到 512x512 的默认维度。
    *   **分析**: 影响 Token 上下文长度的精确计算，已有对应 PR 修复。
6.  **[Issue #5261](https://github.com/QwenLM/qwen-code/issues/5261) - UI 缺失折叠思考块展开快捷键**
    *   **动态**: 升级到 v0.18.2 后，新增了折叠思考块功能，但无法展开查看详细思维链。
    *   **分析**: 新引入的 UI 特性（TUI）交互设计不完善。
7.  **[Issue #5173](https://github.com/QwenLM/qwen-code/issues/5173) - 多 Provider 相同模型 ID 冲突**
    *   **动态**: 配置了多个共享相同模型 ID（如 `qwen3.7-max`）但 `baseUrl` 不同的提供商时，设置无法跨会话持久化。
    *   **分析**: 提供商消歧逻辑存在缺陷，影响同时使用多个 API 代理（如 OpenRouter / 自建 BFF）的开发者。
8.  **[Issue #5267](https://github.com/QwenLM/qwen-code/issues/5267) - `context.fileName` 配置不生效**
    *   **动态**: 自定义附加上下文文件（如 README.md）未按预期加载。
    *   **分析**: 配置解析或文件加载作用域的 Bug。
9.  **[Issue #5326](https://github.com/QwenLM/qwen-code/issues/5326) - GitHub Remote 校验漏洞**
    *   **动态**: `/setup-github` 校验逻辑使用简单的正则 `/github\.com/`，导致钓鱼网站 `github.com.evil` 被误判为合法仓库。
    *   **分析**: 典型的安全校验疏漏（高危），需立即修复以防供应链攻击。
10. **[Issue #5263](https://github.com/QwenLM/qwen-code/issues/5263) - 自动生成技能的持久化提示请求**
    *   **动态**: 社区希望 Agent 自动生成的技能在写入磁盘前能增加用户确认环节。
    *   **分析**: 反映了用户对 Agent 自主修改文件系统的谨慎态度，是对产品流程的优质建议。

---

### 4. 🔧 重要 PR 进展 (Top 10)
今日 PR 活跃度极高，主要围绕稳定性和国际化/多渠道支持：

1.  **[PR #5330](https://github.com/QwenLM/qwen-code/pull/5330) - 增加 SSE 流闲置看门狗**
    *   **亮点**: 解决弱网环境下 SSE 连接静默断开导致程序假死（转圈卡死）的问题，超时将自动中断。
2.  **[PR #5182](https://github.com/QwenLM/qwen-code/pull/5182) - 秒级会话唤醒引擎**
    *   **亮点**: 为 `/loop` 功能引入独立于 cron 任务的、秒级分辨率的唤醒通道，对标 Claude Code 的实现。
3.  **[PR #5327](https://github.com/QwenLM/qwen-code/pull/5327) - 修复 GitHub 远程主机校验漏洞**
    *   **亮点**: 解析 Git remote URL 拒绝形如 `github.com.evil` 的伪造主机，修复 Issue #5326。
4.  **[PR #5319](https://github.com/QwenLM/qwen-code/pull/5319) - 重命名 TodoWrite 工具展示名**
    *   **亮点**: 将面向用户的 UI 显示名称从 `TodoWrite` 改为 `TodoList`，底层 API schema 保持不变，提升语义清晰度。
5.  **[PR #5342](https://github.com/QwenLM/qwen-code/pull/5342) - 支持会话搜索中的 Emoji 字素**
    *   **亮点**: 修复了输入框按字节截断导致 Emoji（如 🚀、🇨🇳）被撕裂成乱码的问题，大幅优化中文/多语言用户体验。
6.  **[PR #5317](https://github.com/QwenLM/qwen-code/pull/5317) - 追踪附加的 stdout fd 重定向**
    *   **亮点**: 完善 Shell 权限语义分析，现在能正确识别 `1> file` 这样的显式输出重定向操作，防止越权写入。
7.  **[PR #5299](https://github.com/QwenLM/qwen-code/pull/5299) - 钉钉超长 Markdown 分割**
    *   **亮点**: 钉钉单条消息有 3800 字符限制，该 PR 自动对长文本进行智能分割，并保持代码块的完整性。
8.  **[PR #5340](https://github.com/QwenLM/qwen-code/pull/5340) - 支持 GIF 图片 Token 解析**
    *   **亮点**: 添加 `image/gif` 到 MIME 列表，修复 Issue #5339。
9.  **[PR #5298](https://github.com/QwenLM/qwen-code/pull/5298) - 扩展 Windows 风格的波浪号路径**
    *   **亮点**: 解决 Windows 环境下 `~\...` 路径无法正确解析的开发者痛点。
10. **[PR #5296](https://github.com/QwenLM/qwen-code/pull/5296) - 微信机器人显示允许的图片目录**
    *   **亮点**: 之前向微信发图片报路径越界错（Issue #4441），现在报错时会明确提示允许的沙盒目录，便于排障。

---

### 5. 📈 功能需求趋势
从今日的 Issue 和 PR 活动中，可以明显看出以下趋势：
*   **IM 平台无缝集成**: 社区对将 Qwen Code 作为后端大脑接入各大 IM（微信、钉钉、飞书、QQ、Telegram）的需求激增。相关的 PR 正在密集修复各平台的 Markdown 截断、图片目录沙盒和消息推送问题。
*   **终端 UI (TUI) 字符串健壮性**: 集中爆发了一波关于 CJK（中日韩）字符、Emoji 字素宽度处理的优化需求。Qwen Code 正在对其底层的 Ink/React 终端渲染层进行深度重构，以支持国际化。
*   **多模型/多 Provider 路由**: 开发者越来越倾向于在本地同时配置多个兼容 OpenAI 接口的提供商（BFF, OpenRouter 等），对模型消歧和跨会话持久化的要求提高。
*   **Shell 与沙盒安全**: 针对终端命令执行，社区在持续完善权限管控，例如对各类 fd（文件描述符）重定向的识别，避免 Agent 在不知情的情况下覆盖系统文件。

---

### 6. 🧐 开发者关注点 (痛点)
1.  **网络稳定性与状态恢复**: API 连接错误（Issue #96, #3914）和重启后状态丢失（Issue #5265）依然是最困扰基础用户的问题。**PR #5330** 的看门狗机制是解决此类问题的关键一步。
2.  **Agent 陷入死锁**: 包括退出计划模式卡死（#5210）和工具调用死循环（#5234）。开发者在长任务委派时缺乏有效的强制熔断机制。
3.  **Token 与长上下文管理**: 随着多 Agent 协作（主控+子 Agent）模式的普及，长时间运行（如 12 小时）导致的上下文溢出或崩溃成为高级用户的核心痛点。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*