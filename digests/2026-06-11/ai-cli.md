# AI CLI 工具社区动态日报 2026-06-11

> 生成时间: 2026-06-11 03:37 UTC | 覆盖工具: 7 个

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

Based on the provided community updates for June 11, 2026, here is the horizontal comparative analysis report for the mainstream AI CLI tools:

---

# 📊 2026年 AI CLI 开发工具生态横向对比分析报告 (2026-06-11)

## 1. 生态全景
当前 AI CLI 工具生态正处于**从“辅助对话”向“全自动智能体”演进的关键爆发期**。多级子智能体嵌套、自主目标追踪和长上下文管理成为头部工具竞逐的核心能力。然而，**“智能化”与“可控性”的矛盾日益凸显**，内存泄漏、失控死循环、幻觉频发等稳定性问题成为了阻碍全自动化的最大短板。此外，随着工具权限的扩大，**安全防御（如提示注入、权限绕过）和跨平台兼容性（特别是 Windows 生态）**已取代单纯的功能堆砌，成为各厂商投入重兵的底层基建方向。

## 2. 各工具活跃度对比
*(注：以下数据基于今日各项目公开的 Issue 与 PR 截取频次，反映单日社区可见活跃度)*

| 工具名称 | 今日 Releases | 热点 Issues 讨论 | 重要 PR 进展 | 核心迭代方向 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | **v2.1.172** | 10+ (多账号、内存泄漏) | 10+ | 深度嵌套 Agent、底层稳定性修复 |
| **OpenAI Codex** | **2个** (Alpha) | 10+ (Token消耗、桌面端卡顿) | 8+ | Rust 核心重构、Token 预算与上下文管理 |
| **Gemini CLI** | 无 | 10+ (执行挂起、安全漏洞) | 10+ | 安全漏洞修复、AST 感知评估 |
| **GitHub Copilot CLI** | 无 | 10+ (MCP误报、模型缺失) | **0** | 跨端体验同步（目前处于停滞期） |
| **Kimi Code** | 无 | 3 (YOLO模式、任务挂起) | **23** (合并潮) | 进程管理、Windows 兼容性、历史恢复 |
| **OpenCode** | **3个** (v1.17.x) | 10+ (Cursor集成、CPU飙升) | 10+ | TUI 2.0 架构重构、多模型适配 |
| **Qwen Code** | 无 | 10+ (命令执行漏洞、OOM) | 10+ | Daemon 守护进程重构、内存与缓存优化 |

## 3. 共同关注的功能方向
通过横向对比，各 CLI 工具社区在以下四个方向存在高度共振：

1. **子智能体的可控性与权限传递**
   * **现象**：Claude Code 开放了 5 层嵌套，但遇到后台子智能体拒绝停止的问题；Qwen Code 和 Kimi Code 均反馈子代理在后台执行时遇到权限审批阻断。
   * **诉求**：社区迫切需要建立完善的父子 Agent 权限透传机制和确定性的中止逻辑。
2. **上下文窗口治理与 Token 降本**
   * **现象**：OpenAI Codex 连推 3 个 PR 建立 Token 预算和新上下文窗口；Qwen Code 引入规则化压缩 `/compress-fast`；Codex 社区对 Token 异常消耗的讨论突破 600 条。
   * **诉求**：随着任务变复杂，如何避免上下文爆炸、减少无效 Token 消耗成为提效的关键。
3. **Windows 及多平台兼容性**
   * **现象**：Claude Code 出现 ARM64 运行失败和工具结果丢失；Copilot 和 OpenCode 遭遇中文 Windows 编码乱码；Kimi Code 专项修复了 Windows 日志锁和 Git 中文解码。
   * **诉求**：AI CLI 正在从 Mac/Linux 极客圈向全量开发者普及，Windows 环境的进程、编码和权限适配成了必修课。
4. **MCP (Model Context Protocol) 的接入与安全**
   * **现象**：Claude Code 出现 OAuth 鉴权失败；Copilot 误拦截第三方 MCP；Qwen Code 发现参数校验漏洞；Gemini 修复了工具越权漏洞。
   * **诉求**：MCP 已成为行业事实标准，但其动态加载、认证机制和安全边界仍需各大厂商高度协同与防御。

## 4. 差异化定位分析

* **Claude Code：复杂工程自动化的“激进派”**
  敢于在 Agent 深度上做文章（5层嵌套），目标受众是处理超大型代码库的高级极客。但在内存管理（129GB泄漏）等底层性能上正在经历阵痛。
* **OpenAI Codex：架构重塑与重度桌端用户**
  正在经历底层的 Rust 化重构，侧重于通过 Token 预算和 Model Metadata 解决“长上下文失忆”问题。其桌面端受众庞大，导致性能卡顿问题尤为突出。
* **Gemini CLI：追求底层鲁棒性的“防守反击者”**
  今日未见新功能，但在安全（SSRF、路径遍历、提示注入）和执行流（防挂起）上狂补功课。其重点投入的 AST 感知能力，若能落地，将在代码精准理解上实现弯道超车。
* **GitHub Copilot CLI：迟滞的生态“整合者”**
  强依赖 GitHub 生态，但在 CLI 端的更新显得脱节。跨端模型不同步、MCP 策略误杀等问题表明，其 CLI 端的工程优先级低于 VS Code 插件，正引发用户不满。
* **Kimi Code：本土化与多进程协同专家**
  今日合并了惊人的 23 个 PR，几乎全在修复进程树管理、重试机制和 Windows 兼容性。主打无人值守（YOLO/AFK 模式），表现出强烈的 CI/CD 流水线接入野心。
* **OpenCode：开源生态的“缝合怪”与重构先锋**
  极力拥抱多模型（Cursor、讯飞云、DeepSeek），以满足不同区域开发者的定制需求。核心团队正激进地推进 TUI 2.0 和 V2 API 重构，处于痛并快乐着的架构蜕变期。
* **Qwen Code：企业级守护进程探索者**
  以极其庞大的代码量（386文件修改）推进 Daemon 模式，试图将 CLI 打造为常驻后台的 AI 服务节点。同时，其引入的 `enter_plan_mode` 展现了对研发安全管控的深刻理解。

## 5. 社区热度与成熟度

* **第一梯队（成熟度高，痛点深刻）**：Claude Code 和 OpenAI Codex。社区讨论已经超越了基础的“怎么用”，转向了多账号管理、Token 经济学和多级智能体协同，证明其已深入开发者的日常工作流。
* **第二梯队（高潜高增长，快速迭代）**：Qwen Code、OpenCode、Kimi Code。这三大工具今日均有大量底层硬核 PR 合并。尤其是 Kimi 和 Qwen 对进程、OOM 的修复，说明它们正处于从“能用”向“企业级稳定”跨越的阶段。
* **第三梯队（治理与防守期）**：Gemini CLI、Copilot CLI。Gemini 正处于严格的安全与质量治理阶段；而 Copilot CLI 的“零 PR”和社区“自建平替”的呼声，反映出该产品线当前面临较严重的迭代停滞危机。

## 6. 值得关注的趋势信号

1. **AI CLI 从“工具”向“系统服务”演进**
   Qwen Code 的 Daemon 模式和 Kimi Code 的 AFK 模式表明，CLI 不再仅仅是交互式终端程序，而是正演变为可以常驻后台、接管 Web/IDE/CI 调用的 AI 操作系统底层服务。
2. **安全防御成为引爆点**
   随着CLI被赋予极大的系统权限（如自动执行命令、修改文件），Qwen 暴露的 `env` 命令绕过、Gemini 修复的间接提示注入和 Skill 路径遍历漏洞警告业界：**AI 工具的 RCE（远程命令执行）风险正在急剧上升

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据来源：github.com/anthropics/skills ｜ 截止日期：2026-06-11

---

## 一、热门 Skills 排行

由于当前 PR 评论数数据缺失，本排行综合 PR 摘要质量、Issue 关联度及更新活跃度进行评定。

| # | Skill 名称 | PR | 功能简述 | 状态 | 链接 |
|---|-----------|-----|---------|------|------|
| 1 | **frontend-design** (改进) | #210 | 重写前端设计 Skill，提升指令清晰度与可执行性，确保每条指令在单次对话中可落地 | OPEN | [链接](https://github.com/anthropics/skills/pull/210) |
| 2 | **automation-workflows-builder** | #1046 | 新增前端设计、AI 体验咨询、自动化工作流构建三个 Skill 定义文件 | OPEN | [链接](https://github.com/anthropics/skills/pull/1046) |
| 3 | **shodh-memory** | #154 | AI Agent 持久化记忆系统，跨对话保持上下文，含 `proactive_context` 主动回忆机制 | OPEN | [链接](https://github.com/anthropics/skills/pull/154) |
| 4 | **skill-quality-analyzer / skill-security-analyzer** | #83 | 两个元技能：五维质量分析（结构/文档/安全等）+ 安全审计，用于评估其他 Skill | OPEN | [链接](https://github.com/anthropics/skills/pull/83) |
| 5 | **sensory** (macOS 自动化) | #806 | 通过 AppleScript 实现原生 macOS 自动化，替代截图方式，支持两级权限模型 | OPEN | [链接](https://github.com/anthropics/skills/pull/806) |
| 6 | **testing-patterns** | #723 | 覆盖全测试栈：Testing Trophy 哲学、AAA 模式、React Testing Library、集成测试等 | OPEN | [链接](https://github.com/anthropics/skills/pull/723) |
| 7 | **document-typography** | #514 | AI 生成文档的排版质量控制：修复孤行、寡行、编号错位等常见问题 | OPEN | [链接](https://github.com/anthropics/skills/pull/514) |
| 8 | **ODT (OpenDocument)** | #486 | OpenDocument 格式(.odt/.ods)的创建、填充、读取及 HTML 转换 | OPEN | [链接](https://github.com/anthropics/skills/pull/486) |

**社区讨论热点**：前端设计 Skill（#210）的清晰度争议引发关注——社区认为原版更像"开发者文档"而非可执行指令；记忆系统（#154）和元技能分析器（#83）反映出社区对 **Skill 自身基础设施** 的高兴趣。

---

## 二、社区需求趋势

从高评论 Issues 中提炼五大需求方向：

### 🔥 趋势 1：企业级协作与共享
- **Issue #228**（13 评论 / 7 👍）：要求支持组织内 Skill 共享库，取代当前手动下载→Slack 传输→手动上传的原始流程。
- **Issue #1175**：企业级 SharePoint 文档处理中的权限控制与安全边界问题。

### 🔥 趋势 2：Skill 开发工具链稳定性
- **Issue #556**（12 评论 / 7 👍）：`run_eval.py` 触发率始终为 0%，Skill 评估管线完全失效。
- **Issue #1169**：描述优化循环 recall 永远为 0%，包括精确的 slash-command 查询也无法命中。
- **Issue #1050 / #1099**：Windows 平台兼容性全面缺失（subprocess 失败、编码崩溃）。

### 🔥 趋势 3：安全与信任体系
- **Issue #492**（7 评论）：社区 Skill 冒用 `anthropic/` 命名空间，存在信任边界滥用风险。
- **Issue #412**：请求 `agent-governance` Skill——AI Agent 系统的策略执行、威胁检测与审计追踪。

### 🔥 趋势 4：跨平台/跨服务集成
- **Issue #16**（4 评论）：将 Skills 暴露为 MCP（Model Context Protocol）工具的标准化接口。
- **Issue #29**（4 评论）：AWS Bedrock 兼容性需求。
- **Issue #61 / #62**：Skills 加载 404 错误和批量消失问题。

### 🔥 趋势 5：架构优化与去重
- **Issue #189**（6 评论 / 8 👍）：`document-skills` 与 `example-skills` 插件安装重复内容，浪费上下文窗口。
- **Issue #1220**：多文件引用预加载机制，当前只有 `SKILL.md` 被加载。
- **Issue #1156**：Skill 可移植性标签的真实性验证问题。

---

## 三、高潜力待合并 Skills

以下 PR 修复关键缺陷或填补明显空白，且近期有更新活动，合并可能性较高：

| PR | 内容 | 最近更新 | 合并理由 | 链接 |
|-----|------|---------|---------|------|
| **#538** | 修复 PDF Skill 中 8 处文件名大小写引用错误 | 2026-04-29 | 纯 bug fix，影响 Linux/macOS 用户 | [链接](https://github.com/anthropics/skills/pull/538) |
| **#539** | YAML 描述字段未加引号导致静默解析失败 | 2026-04-16 | 防御性校验，解决广泛存在的 YAML 问题 | [链接](https://github.com/anthropics/skills/pull/539) |
| **#361** | 检测未转义的 YAML 特殊字符（`:` `#` `{}` `[]`） | **2026-06-10** | 与 #539 互补，覆盖更广的字符集，极活跃 | [链接](https://github.com/anthropics/skills/pull/361) |
| **#362** | UTF-8 多字节字符导致 CLI Rust 层 panic | **2026-06-10** | 修复非英文用户的崩溃问题，极活跃 | [链接](https://github.com/anthropics/skills/pull/362) |
| **#509** | 新增 `CONTRIBUTING.md` 社区贡献指南 | 2026-03-19 | 回应 Issue #452，社区健康指标从 25% 提升 | [链接](https://github.com/anthropics/skills/pull/509) |
| **#1140** | `agent-creator` 元技能 + 评估脚本多工具并行修复 | 2026-06-02 | 关联 Issue #1120，含 Windows 兼容修复 | [链接](https://github.com/anthropics/skills/pull/1140) |
| **#541** | 修复 DOCX Skill 中 `w:id` 冲突导致文档损坏 | 2026-04-16 | OOXML 规范级 bug，影响文档生成场景 | [链接](https://github.com/anthropics/skills/pull/541) |

**特别关注**：#361 和 #362 均在 2026-06-10 有更新，属于活跃度最高的 PR。

---

## 四、Skills 生态洞察

> **一句话总结**：社区当前最集中的诉求是 **Skill 开发工具链的基础可用性**——评估/优化脚本的触发失败（recall=0%）、Windows 平台兼容性缺失、YAML 校验漏洞等基础设施问题，已超越新 Skill 功能需求，成为阻碍生态发展的首要瓶颈。

**补充洞察**：
- 企业用户正推动 Skills 从「个人工具」向「组织级共享资产」演进（共享库、权限控制、审计追踪）。
- 安全信任体系（命名空间冒用、Skill 可移植性验证）是下一个必须解决的治理问题。
- 元技能（Meta-Skills：质量分析器、安全审计器、Skill 创建器）的出现标志着生态正走向「自我优化」阶段。

---

# Claude Code 社区动态日报 (2026-06-11)

## 1. 今日速览
今天 Claude Code 正式发布 **v2.1.172** 版本，最引人注目的动态是**子智能体正式支持最深达 5 层的嵌套调用**，这将极大提升复杂工作流的自动化潜力。在社区方面，多账号管理需求热度居高不下，同时严重的内存泄漏、Windows 兼容性及 MCP OAuth 授权失败等核心稳定性问题引发了大量讨论。

## 2. 版本发布
**v2.1.172** 
- **多级 Agent 调用**：Sub-agents 现在可以生成自己的子智能体，支持最深达 5 级的嵌套。
- **AWS Bedrock 优化**：当未设置 `AWS_REGION` 时，Amazon Bedrock 现在会从 `~/.aws` 配置文件读取区域信息，与 AWS SDK 优先级保持一致；`/status` 命令现在也会显示当前 Region 的来源。
- **UI 改进**：浏览标记时新增了搜索栏。

---

## 3. 社区热点 Issues (Top 10)

1. **[FEATURE] 桌面端多账号管理与切换** 
   - **链接**：[#18435](https://github.com/anthropics/claude-code/issues/18435)
   - **关注原因**：高达 580 个点赞和 109 条评论，是目前社区呼声最高的功能。用户强烈需要在 Claude Desktop 中轻松切换多个账号（如工作号与个人号）。

2. **[BUG] 严重内存泄漏：消耗 129GB RAM 导致系统死机** 
   - **链接**：[#11315](https://github.com/anthropics/claude-code/issues/11315)
   - **关注原因**：极其严重的性能 Bug，Claude Code 在运行中虚拟内存飙升至 129GB 并耗尽物理内存，导致系统彻底崩溃，属于高优先级修复项。

3. **[BUG] MCP 连接器 OAuth 认证成功但未发送 Bearer Token** 
   - **链接**：[#46140](https://github.com/anthropics/claude-code/issues/46140)
   - **关注原因**：严重阻碍了 Web 端 MCP 服务器的接入。OAuth 流程虽然走通，但后续请求未携带 Token，导致 MCP 无法正常鉴权工作。

4. **[BUG] Cowork 功能在 ARM64 (Snapdragon X) 上运行失败** 
   - **链接**：[#50674](https://github.com/anthropics/claude-code/issues/50674)
   - **关注原因**：Windows on ARM 生态的兼容性问题，即使通过了准备情况检查，Cowork 依然无法正常运行。

5. **[BUG] Edit 工具静默将 Tab 转换为空格导致匹配失败** 
   - **链接**：[#26996](https://github.com/anthropics/claude-code/issues/26996)
   - **关注原因**：对代码库格式敏感的开发者影响极大，AI 在修改文件时暗中改变缩进字符，导致代码比对和后续修改反复报错。

6. **[BUG] Windows 工具结果因内部错误静默丢失** 
   - **链接**：[#46767](https://github.com/anthropics/claude-code/issues/46767)
   - **关注原因**：自 v2.1.101 引入的严重回归 Bug，导致 Windows 平台上所有工具的返回结果丢失，基本处于不可用状态。

7. **[MODEL] Opus 4.8 捏造用户请求并固执执行不存在的任务** 
   - **链接**：[#64260](https://github.com/anthropics/claude-code/issues/64260)
   - **关注原因**：模型行为异常（幻觉），脱离用户输入自行发明任务上下文，严重影响智能体的可控性。

8. **[BUG] macOS Bash 工具报 ENOSPC 错误丢失输出** 
   - **链接**：[#63909](https://github.com/anthropics/claude-code/issues/63909)
   - **关注原因**：在磁盘有空间的情况下，子进程的任何输出都会触发磁盘空间不足报错并被静默丢弃，已提供复现步骤。

9. **[MODEL] 系统提示词不应鼓励使用 `$(...)` 命令替换** 
   - **链接**：[#31373](https://github.com/anthropics/claude-code/issues/31373)
   - **关注原因**：模型行为导致频繁弹出权限确认框，破坏终端操作体验的流畅度。

10. **[BUG] 后台子智能体拒绝停止并持续触发任务** 
    - **链接**：[#67321](https://github.com/anthropics/claude-code/issues/67321)
    - **关注原因**：**与今日发布的多级 Agent 特性直接相关**。后台子智能体无视用户的停止指令继续运行，并不断唤醒主智能体执行操作，引发失控风险。

---

## 4. 重要 PR 进展 (Top 10)

1. **延长 Issue/PR 自动关闭时间：14 天改为 90 天** 
   - **链接**：[#63686](https://github.com/anthropics/claude-code/pull/63686)
   - **说明**：将社区贡献的 Stale（过期）和自动关闭周期大幅延长，体现了官方对社区长期反馈的包容度提升。

2. **将 ANTHROPIC_BASE_URL 转发给 agentic_review 子进程** 
   - **链接**：[#65875](https://github.com/anthropics/claude-code/pull/65875)
   - **说明**：修复了使用代理/网关（如 LiteLLM）时，子进程无法继承父进程 Base URL 导致认证失败的问题。

3. **修复 Hookify 提示词字段映射及上下文警告** 
   - **链接**：[#67084](https://github.com/anthropics/claude-code/pull/67084)
   - **说明**：重构了旧版 `event: prompt` 规则向新版 `UserPromptSubmit` 的映射逻辑，并增强了向后兼容性。

4. **修复 Plugin-dev 验证脚本因 `set -e` 提前中止的问题** 
   - **链接**：[#66416](https://github.com/anthropics/claude-code/pull/66416)
   - **说明**：解决了插件开发者在验证时，因为严格的 shell 模式导致首个校验项失败后脚本直接退出的痛点。

5. **文档：澄清 allowed-tools 与 agent tools 的边界** 
   - **链接**：[#65916](https://github.com/anthropics/claude-code/pull/65916)
   - **说明**：重要概念澄清。明确了 `allowed-tools` 只是自动审批机制（未列出工具仍可通过弹窗调用），而 `tools:` 是硬性能力边界。

6. **文档：记录 Subagent 中 ${CLAUDE_PLUGIN_ROOT} 路径不解析的已知限制** 
   - **链接**：[#65919](https://github.com/anthropics/claude-code/pull/65919)
   - **说明**：针对今天放开的 5 层嵌套 Agent 功能特别有用，明确了变量在子智能体传递过程中的已知限制。

7. **修复 Devcontainer Docker 守护进程检测失败的问题** 
   - **链接**：[#66372](https://github.com/anthropics/claude-code/pull/66372)
   - **说明**：修复了在 PowerShell 环境下，Docker 未运行时脚本仍误报运行正常的检测逻辑错误。

8. **修复 Plugin .mcp.json 示例文档格式错误** 
   - **链接**：[#64607](https://github.com/anthropics/claude-code/pull/64607)
   - **说明**：纠正了文档中 `.mcp.json` 错误地使用 `mcpServers` 嵌套包裹的问题，防止新手开发者踩坑。

9. **补全 plugin-dev 缺失的 plugin.json 清单文件** 
   - **链接**：[#65286](https://github.com/anthropics/claude-code/pull/65286)
   - **说明**：修复了官方插件 `plugin-dev` 缺失 manifest 导致无法通过常规机制发现和安装的问题。

10. **修复 ralph-wiggum 插件中失效的错误处理逻辑** 
    - **链接**：[#66573](https://github.com/anthropics/

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 (2026-06-11)

## 1. 今日速览
今日 OpenAI Codex 团队连续发布了两个 Rust 核心的 Alpha 版本（v0.140.0-alpha.4 和 alpha.7），底层迭代节奏加快。在功能开发方面，团队合并了大量关于 **Token 预算** 和 **上下文窗口管理** 的核心 PR，旨在让模型更智能地处理长上下文。同时，社区对 **Windows 桌面端稳定性（闪退、卡顿）** 以及 **会话历史莫名丢失** 的问题反馈强烈，其中 Token 消耗过快的经典 Issue 讨论数已突破 600 条。

## 2. 版本发布
- **rust-v0.140.0-alpha.7** 和 **rust-v0.140.0-alpha.4**
  - **总结**：今日连续推送了两个 Alpha 版本，主要聚焦于底层 Rust 核心代码的迭代与测试，为后续的 CLI 和 Desktop 稳定版做铺垫。

## 3. 社区热点 Issues (Top 10)
以下筛选了今日最值得关注的 10 个 Issue，集中在计费、系统稳定性和多智能体方面：

1. **[Token 消耗异常] Burning tokens very fast** | [View](https://github.com/openai/codex/issues/14593)
   - **关注度**：👍 265 | 评论：604
   - **简析**：这是一个自 3 月份以来的老问题。用户反馈在 VS Code 等插件中，模型在卡住或等待时依然在飞速消耗 Token，导致额度迅速流失，至今依然是社区最关注的痛点。
2. **[工作空间切换] GitHub PR review fails after migrating to Personal Pro** | [View](https://github.com/openai/codex/issues/26867)
   - **关注度**：👍 7 | 评论：13
   - **简析**：用户从 Business 账号迁移到 Personal Pro 后，进行 Git PR Review 时依然提示“工作空间已停用”，涉及复杂的 Auth 认证状态缓存问题。
3. **[性能问题] Codex Desktop on Windows is extremely slow** | [View](https://github.com/openai/codex/issues/23198)
   - **关注度**：👍 31 | 评论：12
   - **简析**：Windows 桌面端日常使用中存在极度卡顿的现象，且确认非电脑本身性能问题，高点赞数表明此为 Windows 用户的普遍痛点。
4. **[数据丢失] Desktop project threads disappear** | [View](https://github.com/openai/codex/issues/25463)
   - **关注度**：评论：12
   - **简析**：UI 界面无法显示历史对话，但本地 JSONL 文件仍存在。此“假性丢失”问题在多个 Issue 中被反复提及。
5. **[模型鉴权] gpt-5.3-codex-spark model is not supported with ChatGPT account** | [View](https://github.com/openai/codex/issues/17642)
   - **关注度**：评论：12
   - **简析**：Pro 订阅用户在 CLI 中尝试调用最新的 `gpt-5.3-codex-spark` 模型时报 400 错误，引发关于账户权限与模型可用性的讨论。
6. **[流式输出] Severe streaming slowdown in Fast mode** | [View](https://github.com/openai/codex/issues/27491)
   - **关注度**：评论：6
   - **简析**：在 macOS 使用 GPT-5.5 的 Fast 模式时，流式输出变为每隔几秒吐出几个字符然后卡住，严重影响编码体验。
7. **[系统崩溃] Windows 26.602.71036 crashes after update** | [View](https://github.com/openai/codex/issues/27175)
   - **关注度**：👍 3 | 评论：8
   - **简析**：升级到最新版本后，即使是空会话，Windows 桌面端也会直接崩溃或变得无法访问。
8. **[多智能体] MultiAgentV2 encrypted spawn_agent schema returns 400** | [View](https://github.com/openai/codex/issues/26753)
   - **关注度**：👍 2 | 评论：9 (已关闭)
   - **简析**：开发者启用 `multi_agent_v2` 特性后，模型在处理前报错。此问题已被官方关注并关闭，预计已在新版修复。
9. **[权限 Bug] Windows Store app fails to start for non-ASCII usernames** | [View](https://github.com/openai/codex/issues/13553)
   - **关注度**：👍 9 | 评论：11
   - **简析**：如果 Windows 用户名包含中文字符或其他非 ASCII 字符，应用直接启动失败。这是一个阻塞性的路径解析 Bug。
10. **[进程泄漏] app-server leaks child processes after crash** | [View](https://github.com/openai/codex/issues/26869)
    - **关注度**：评论：8
    - **简析**：macOS 版本在崩溃重启后，会遗留大量孤儿进程并疯狂写日志，导致磁盘 I/O 压力飙升。

## 4. 重要 PR 进展 (Top 10)
今天官方在底层架构和 TUI (终端界面) 上投入了大量精力，重要 PR 汇总如下：

1. **[核心特性] Add token budget context feature** | [View](https://github.com/openai/codex/pull/27438)
   - **内容**：引入上下文 Token 预算功能，当使用量跨过阈值时，允许在模型上下文中注入剩余 Token 的提示信息。
2. **[核心特性] Add context remaining tool** | [View](https://github.com/openai/codex/pull/27518)
   - **内容**：为模型新增一个 Tool，允许模型主动查询当前上下文还剩下多少 Token 额度。
3. **[核心特性] Add new context window tool** | [View](https://github.com/openai/codex/pull/27488)
   - **内容**：当模型认为当前上下文已经无用时，提供一个工具让 Codex 直接开启一个全新的上下文窗口，避免浪费 Token 去生成长篇总结。
4. **[上下文优化] Add comp_hash to model metadata** | [View](https://github.com/openai/codex/pull/27532)
   - **内容**：为模型元数据增加 `comp_hash` 字段，用于唯一标识模型是否兼容压缩配置，解决历史记录恢复时的模型一致性问题。
5. **[网络代理] Add system proxy feature config surface** | [View](https://github.com/openai/codex/pull/26706)
   - **内容**：引入系统级代理 (PAC) 支持的配置层面。这对处于复杂网络环境下的开发者来说是非常实用的底层功能。
6. **[TUI 增强] Support images and long text in TUI goals** | [View](https://github.com/openai/codex/pull/27508) (系列 PR 包含 27509, 27510)
   - **内容**：重构了 TUI 的 `/goal` 指令，解除了 4000 字符的长度限制，并**首次支持在 TUI 目标中直接输入图片**。
7. **[MCP 协议] Pass agent path metadata to MCP tools call** | [View](https://github.com/openai/codex/pull/27495)
   - **内容**：向 MCP 服务传递当前的 Agent 路径（如 `/root/worker`），让 MCP 服务端能够感知当前调用是主 Agent 还是子 Agent。
8. **[图像处理] Strip image detail from Responses Lite requests** | [View](https://github.com/openai/codex/pull/27246)
   - **内容

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 (2026-06-11)

## 1. 今日速览
今日 Gemini CLI 社区重点关注**核心稳定性**与**安全性**。虽然官方未发布新版本，但社区贡献了多个关键修复，尤其是针对终端环境下长时间挂起和潜在安全注入漏洞的 PR 备受瞩目。同时，核心开发团队正集中评估 AST（抽象语法树）感知工具的集成，以期大幅提升代码分析的准确度并降低 Token 消耗。

## 2. 版本发布
过去 24 小时内**无**新版本发布。

---

## 3. 社区热点 Issues
以下是今日最受关注的 10 个 Issue，反映了社区的核心痛点与功能期望：

1. **Generalist agent 无限挂起** [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
   - **重要性**：极高。CLI 在委派给 generalist agent 时会永久卡死（已获 8 个 👍）。
   - **状态**：维护者已标记 `need-retesting`，正在跟进。
2. **评估体系 Epic：组件级别的行为评估** [#24353](https://github.com/google-gemini/gemini-cli/issues/24353)
   - **重要性**：官方正在建立更健壮的组件级测试，目前已生成 76 个行为评估用例，旨在提升模型底层执行质量。
3. **AST 感知文件读取与代码映射评估** [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)
   - **重要性**：官方正在调研引入 AST 感知工具，这将极大减少因代码读取错位导致的错误，并显著降低 Token 噪音。
4. **子代理未达到目标却误报成功** [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
   - **重要性**：`codebase_investigator` 达到最大交互轮次后不仅中断，还向主代理返回 `status: "success"`，导致严重的“幻觉式”结果。
5. **Auto Memory 安全性与重试机制缺陷** [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) & [#26522](https://github.com/google-gemini/gemini-cli/issues/26522)
   - **重要性**：Auto Memory 功能被指出存在严重体验问题：不仅在提取敏感信息时存在泄露风险，还会对低质量会话进行无限重试。
6. **Shell 命令执行完毕后仍卡在 "Waiting input"** [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
   - **重要性**：核心交互 Bug。简单命令执行完毕后 UI 依然挂起，导致工作流被迫中断。
7. **可用工具超过 128 个时报 400 错误** [#24246](https://github.com/google-gemini/gemini-cli/issues/24246)
   - **重要性**：重度插件用户遭遇的瓶颈，反映出当前工具作用域管理机制的局限性。
8. **模型频繁在随机位置创建 tmp 脚本** [#23571](https://github.com/google-gemini/gemini-cli/issues/23571)
   - **重要性**：Agent 在执行 Shell 限制模式时，生成的临时文件散落各处，增加了代码库维护的清理负担。
9. **Gemini 未充分利用自定义 Skills 和 Sub-agents** [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)
   - **重要性**：即使提供了精确的 Prompt，主代理仍倾向于“亲力亲为”而非调用合适的外部技能或子代理，触发路由机制问题。
10. **Browser Agent 在 Wayland 下失败** [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)
    - **重要性**：Linux 桌面环境兼容性问题，阻碍了部分开发者在 Wayland 环境下使用浏览器代理功能。

---

## 4. 重要 PR 进展
今日共有多个高质量修复 PR 提交，安全与执行流修复尤为突出：

1. **[核心修复] 彻底解决 Shell 执行挂起问题** [#27842](https://github.com/google-gemini/gemini-cli/pull/27842)
   - 针对 Issue #25166，为 PTY 执行的输出管道添加了错误处理边界，防止渲染管线阻塞导致 UI 卡死。
2. **[安全修复] 防御私有 IP 绕过 (SSRF)** [#27473](https://github.com/google-gemini/gemini-cli/pull/27473)
   - 修复 `isBlockedHost` 仅检查 IP 字面量的缺陷，现会在校验前先解析主机名，封堵内网访问漏洞。
3. **[安全修复] 修复 HITL 间接提示注入漏洞** [#27472](https://github.com/google-gemini/gemini-cli/pull/27472)
   - 在工具确认 UI 中强制实施“截断锁定”，防止恶意命令通过超长内容折叠来蒙蔽用户。
4. **[安全修复] Skill 安装路径遍历漏洞修复** [#27767](https://github.com/google-gemini/gemini-cli/pull/27767)
   - 修复了 `installSkill` 等命令中的 3 处路径遍历漏洞，防止通过恶意 Frontmatter 写入系统任意文件。
5. **[核心修复] 终端 resize 导致的 ioctl EBADF 崩溃** [#27502](https://github.com/google-gemini/gemini-cli/pull/27502)
   - 解决了 React 的 `useEffect` 与 PTY teardown 之间的竞态条件。
6. **[核心修复] 零配额失败快速响应** [#27698](https://github.com/google-gemini/gemini-cli/pull/27698)
   - 当遇到 `0` 配额限制时，不再陷入无意义的 10 次重试死循环，而是直接快速失败报错。
7. **[Agent 修复] read_background_output 中止逻辑优化** [#27839](https://github.com/google-gemini/gemini-cli/pull/27839)
   - 修复按 ESC 取消后台输出读取时，UI 显示取消但后台依然在请求的问题。
8. **[逻辑修复] 修复空 parts 导致的函数调用判断错误** [#27474](https://github.com/google-gemini/gemini-cli/pull/27474)
   - 修复了 `parts: []` 时因 JS 逻辑导致被错误识别为函数响应的隐藏 Bug。
9. **[安全修复] CI/CD workflow_run 产物投毒防护** [#27753](https://github.com/google-gemini/gemini-cli/pull/27753)
   - 在 CI 流水线中增加了校验，防止 Fork PR 利用 `workflow_run` 窃取仓库 Secrets。
10. **[功能优化] trustedFolders.json 支持数组格式** [#27648](https://github.com/google-gemini/gemini-cli/pull/27648)
    - 提升配置体验，允许使用更简单的列表格式配置受信任目录。

---

## 5. 功能需求趋势
通过对近期 Issue 的分析，当前社区功能演进呈现以下三大趋势：

1. **代码上下文感知 (AST) 增强**：官方和社区均意识到纯文本匹配的局限性，正大力评估 AST 集成（如 AST grep），以提供精确的方法级别读取和代码搜索。
2. **评估驱动开发**：开始系统性引入“行为评估”，从底层验证 Agent 在多轮复杂任务中的鲁棒性，防止“误报成功”等问题。
3. **Auto Memory 体系治理**：Auto Memory 的自动学习与上下文注入引发了安全（敏感信息泄露）与质量（低信噪比）的担忧，亟待加入确定性过滤与重试熔断机制。

## 6. 开发者关注点
开发者反馈的**高频痛点**集中在以下方面：

- **执行流卡死与死循环**：无论是 Shell 执行挂起、Agent 间委派死锁，还是重试逻辑不懂得“及时止损”，都严重影响了“无人值守”开发体验的信任度。
- **Agent 路由与“智能度”不足**：模型倾向于自己编写脚本而不是使用现成的 Skills 或 Sub-agents；在遇到错误或限制时，不如预期般智能（如乱建 tmp 文件）。
- **安全边界模糊**：包括工具权限过大、间接注入风险以及 Auto Memory 可能意外记录密钥的问题，开发者对 CLI 的权限隔离机制提出了更高要求。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# 📰 GitHub Copilot CLI 社区动态日报 (2026-06-11)

## 1. 今日速览
今日 GitHub Copilot CLI 社区依然保持高度活跃，核心关注点集中在**多模型支持（尤其是 Gemini 系列）的缺失**以及**近期版本更新带来的 UI 交互与功能回归问题**。虽然过去 24 小时内官方没有发布新版本或更新任何 Pull Requests，但社区正强烈呼吁解决第三方 MCP 被误禁用、终端渲染流式输出乱码以及 Worktree 默认开启引发的灾难性体验等关键痛点。

## 2. 版本发布
过去 24 小时内，**无**新的 Releases 发布。

---

## 3. 社区热点 Issues (Top 10)

以下是近期评论最多、社区讨论最激烈的 10 个 Issues，反映了当前用户的核心诉求：

1. **[工作流破坏] Bring back the GitHub Copilot in the CLI commands to not break workflows** (#53)
   - **👍 75 | 💬 34 | 状态: OPEN**
   - **链接:** https://github.com/github/copilot-cli/issues/53
   - **概述:** 由于官方长达 6 个月未对此最高赞 Issue 作出回应，社区已开始自行开发替代方案（如 `shell-ai`）。这反映了用户对 CLI 现有更改严重破坏原有工作流的极度不满。
2. **[权限/企业] "Copilot Requests" permission for fine-grained tokens should be visible for org-owned tokens** (#223)
   - **👍 76 | 💬 29 | 状态: OPEN**
   - **链接:** https://github.com/github/copilot-cli/issues/223
   - **概述:** 企业环境下的高频痛点。组织不希望使用个人 PAT 进行自动化认证，但目前的细粒度 Token 缺少对 "Copilot Requests" 的权限显示，阻碍了企业级采纳。
3. **[模型支持] Copilot CLI does not list all org-enabled models (e.g. Gemini 3.1 Pro)** (#1703)
   - **👍 54 | 💬 31 | 状态: CLOSED**
   - **链接:** https://github.com/github/copilot-cli/issues/1703
   - **概述:** 即使组织设置中启用了某些模型，CLI 端仍然无法像 VS Code 那样看到并使用它们（如 Gemini 3.1 Pro），暴露出跨端模型同步的严重滞后。
4. **[交互 Bug] ctrl+shift+c no longer copies to clipboard on Linux** (#2082)
   - **👍 8 | 💬 21 | 状态: OPEN**
   - **链接:** https://github.com/github/copilot-cli/issues/2082
   - **概述:** Linux 用户的基操受阻。自 v1.0.4 起，`ctrl+shift+c` 复制快捷键失效，虽然官方提供了右键或 Ctrl+c 替代方案，但这打破了 Linux 开发者的肌肉记忆。
5. **[MCP 误拦截] 3rd party MCP servers are disabled, despite no such policy** (#1707)
   - **👍 0 | 💬 9 | 状态: CLOSED**
   - **链接:** https://github.com/github/copilot-cli/issues/1707
   - **概述:** 严重的策略读取 Bug。CLI 错误地报告“组织策略禁用了第三方 MCP”，但降级到旧版本或在 VS Code 中均能正常使用。该问题今日仍在持续引发关注 (#3756)。
6. **[UI 回归] Please bring back no-alt-screen** (#2334)
   - **👍 28 | 💬 7 | 状态: CLOSED**
   - **链接:** https://github.com/github/copilot-cli/issues/2334
   - **概述:** 强制开启 `alt-screen` 导致终端无法使用滚动条、无法查看历史记录、无法使用终端的原生查找功能，极大地降低了可用性。
7. **[底层架构] Background sub-agent silently hangs at total_turns=0 when model="gpt-5.5"** (#3547)
   - **👍 0 | 💬 7 | 状态: CLOSED**
   - **链接:** https://github.com/github/copilot-cli/issues/3547
   - **概述:** 在调用后台子代理并指定 `gpt-5.5` 模型时，代理会无限期挂起且不执行任何 turn。这表明 CLI 对最新多模态/高级模型的调度存在缺陷。
8. **[认证缺陷] Error loading model list: Error: Not authenticated** (#3596)
   - **👍 10 | 💬 5 | 状态: OPEN**
   - **链接:** https://github.com/github/copilot-cli/issues/3596
   - **概述:** 使用 `--resume` 恢复之前的会话时，会导致认证状态丢失，执行 `/model` 报错，必须开启新会话才能恢复。
9. **[代码管理] Worktrees are nightmare, should be disabled by default** (#2243)
   - **👍 8 | 💬 2 | 状态: OPEN**
   - **链接:** https://github.com/github/copilot-cli/issues/2243
   - **概述:** Copilot 在后台运行时默认启用 Git Worktree，导致生成了大量有用的代码却极难合并回主工作树。开发者强烈要求默认关闭此行为，交由人工控制。
10. **[插件系统] Regression in v1.0.60: userPromptSubmitted hook additionalContext no longer injected** (#3727)
    - **👍 0 | 💬 3 | 状态: OPEN**
    - **链接:** https://github.com/github/copilot-cli/issues/3727
    - **概述:** v1.0.60 引入了破坏性更新，导致通过 Hook 注入的 Planner 上下文失效。这直接影响了依赖该机制的高级插件和自定义扩展。

---

## 4. 重要 PR 进展
过去 24 小时内，**无**更新的 Pull Requests。社区目前处于被动等待官方回应和修复的阶段。

---

## 5. 功能需求趋势
从近期 Issues 的标签和内容提炼，社区目前最关注以下三个功能演进方向：

- **🔥 多模型对齐与下放**
  用户对 Gemini 系列（#821, #1664, #2434）及最新模型（如 GPT-5.5）的呼声极高。CLI 作为高级开发者的工具，其模型可用性远落后于 VS Code 插件，成为一个主要瓶颈。
- **🛠️ MCP (Model Context Protocol) 生态完善**
  如何更好地接入和管理 MCP 是近期的核心趋势。用户不仅需要修复第三方 Server 被误拦截的策略 Bug（#1707, #3756），还提出了更高级的需求，如通过简写语法快速调用特定 MCP Tool（#3752），以及防止 MCP Server 失控循环生成导致系统卡死（#3701）。
- **🖥️ 原生终端体验优化**
  开发者对终端 UI 的“图形化”侵入表现出明显的反感。要求保留原生终端的查找、滚动（#2334），要求修复流式输出时字符重叠、截断的渲染 Bug（#3749, #3755），以及要求恢复任务完成时的终端响铃提示（#3748）。

---

## 6. 开发者关注点与核心痛点

1. **跨端体验严重割裂：** 多个 Issue（#1703, #2550, #2854）指出，VS Code 能用到的模型和能绕过的策略限制，在 CLI 中却处处碰壁。官方在 CLI 与 IDE 版本间的功能同步和策略对齐做得不够。
2. **版本更新带来大量回归：** 近期更新质量堪忧。例如 v1.0.60 破坏了 Hook 注入机制（#3727），最近的版本破坏了 Windows/Linux 的原生复制功能（#3622,

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

以下是为你生成的 2026 年 6 月 11 日 Kimi Code CLI 社区动态日报。

---

# 📰 Kimi Code CLI 社区动态日报 (2026-06-11)

## 1. 今日速览
今日 Kimi Code CLI 无新版本发布。社区方面，用户重点反馈了在 v0.12.0 版本中 YOLO 模式（全自动）被意外拦截，以及 Agent 任务清单无法完成最后一项的阻塞性问题。项目核心开发团队今日集中推进了大量历史 PR 的合并与更新，核心焦点显著集中在 **Windows 平台兼容性优化**、**会话历史与断点恢复机制增强**，以及 **底层 Shell 进程管理稳定性提升** 上。

## 2. 版本发布
过去 24 小时内无新版本发布。目前社区关注度最高的版本为 Issues 中提及的 `v0.12.0`。

## 3. 社区热点 Issues
今日数据源内共更新 3 条 Issues，以下是社区反馈的核心问题：

*   **#2448 [OPEN] [bug] YOLO 模式下依然提示需要审批**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/issues/2448](https://github.com/MoonshotAI/kimi-cli/issues/2448)
    *   **关注点:** 用户在使用 `k2.6` 模型并开启 YOLO 模式时，CLI 依然会弹出审批提示。YOLO 模式是自动化工作流的核心，此问题会打断 CI/CD 或自动化脚本执行。
*   **#2447 [OPEN] [bug] 最后一个 Todo 项目永远无法完成**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/issues/2447](https://github.com/MoonshotAI/kimi-cli/issues/2447)
    *   **关注点:** Agent 在执行多步任务时，最后一项待办事项始终处于挂起状态。这直接影响了复杂代码生成任务的闭环体验，消耗多余的 Token。
*   **#2173 [CLOSED] [enhancement] !**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/issues/2173](https://github.com/MoonshotAI/kimi-cli/issues/2173)
    *   **关注点:** 一个较早的功能增强提议，已于今日关闭。

## 4. 重要 PR 进展
过去 24 小时内共有 23 个 PR 发生状态更新。以下精选出对稳定性、兼容性影响最大的 10 个关键 PR：

*   **#2327 [CLOSED] 修复：超时时终止整个 Shell 进程树**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/pull/2327](https://github.com/MoonshotAI/kimi-cli/pull/2327)
    *   **内容:** 在独立的进程组中运行前台命令，并在超时或取消时终止整个进程树。有效防止了僵尸进程占用系统资源。
*   **#2355 [CLOSED] 修复：MCP 延迟启动失败后继续执行**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/pull/2355](https://github.com/MoonshotAI/kimi-cli/pull/2355)
    *   **内容:** 避免因 MCP Server 启动失败导致整个交互式对话中断，增强了工具扩展层面的容错能力。
*   **#2383 [OPEN] 修复：重放历史时修复孤立的 tool_calls**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/pull/2383](https://github.com/MoonshotAI/kimi-cli/pull/2383)
    *   **内容:** 针对进程被 `kill -9` 或 OOM 异常终止后，历史记录中残留不完整的 `tool_calls` 导致会话无法恢复的问题进行了修复。
*   **#2354 [CLOSED] 修复：Windows 平台避免共享日志轮转冲突**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/pull/2354](https://github.com/MoonshotAI/kimi-cli/pull/2354)
    *   **内容:** Windows 下多个并发进程（CLI/Web/Worker）共享日志会导致冲突，现改为按 PID 隔离日志（`kimi.<pid>.log`）。
*   **#2386 [OPEN] 修复：映射撤销操作到上下文轮次**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/pull/2386](https://github.com/MoonshotAI/kimi-cli/pull/2386)
    *   **内容:** 修复了 `/undo` 命令在特定本地操作中截断上下文不准确的问题，提升了版本回退的精确度。
*   **#2235 [CLOSED] 修复：省略 OpenAI 兼容请求中的空工具数组**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/pull/2235](https://github.com/MoonshotAI/kimi-cli/pull/2235)
    *   **内容:** 部分兼容 API（如 vLLM）遇到 `tools: []` 会报错。此 PR 优化了 Legacy Provider，提升了第三方模型后端的兼容性。
*   **#2288 [CLOSED] 修复：重启后避免重复发送 Web 上传文件**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/pull/2288](https://github.com/MoonshotAI/kimi-cli/pull/2288)
    *   **内容:** 添加了 `.sent` 持久化标记，解决了服务重启后上下文重复上传同一文件导致的报错和 Token 浪费。
*   **#2334 [CLOSED] 修复：Kimi 请求前清理无效的 UTF-16 代理对**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/pull/2334](https://github.com/MoonshotAI/kimi-cli/pull/2334)
    *   **内容:** 增强了对系统提示词和历史消息的编码清洗，防止底层 API 因编码异常请求失败。
*   **#1893 [CLOSED] 修复：Windows 上 Git 处理非 UTF-8 文件名报错**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/pull/1893](https://github.com/MoonshotAI/kimi-cli/pull/1893)
    *   **内容:** 解决了中文 Windows 环境下（默认 GBK），`git ls-files` 输出中文字符时的解码崩溃问题。
*   **#2211 [CLOSED] 修复：将 AFK 模式传递给 Worker 进程**
    *   **链接:** [github.com/MoonshotAI/kimi-cli/pull/2211](https://github.com/MoonshotAI/kimi-cli/pull/2211)
    *   **内容:** 修复了 Web 后台模式 (`--afk web`) 下，子进程仍尝试请求审批的缺陷，确保了无头模式的静默运行。

## 5. 功能需求趋势
基于近期 Issues 和 PRs 的动态，当前社区功能演进呈现以下趋势：
1.  **无人值守自动化:**
    YOLO 模式和 AFK 模式的频繁修复表明，社区正在大力推进 Kimi CLI 接入自动化流水线（如自动修复 Bug、定时脚本）的能力，要求极高的免打扰运行稳定性。
2.  **跨平台兼容性 (特别是 Windows 生态):**
    今日合入了大量针对 Windows 环境的修复，包括控制台闪退、日志锁、进程树管理以及中文路径编码。这表明工具正在从早期的 *nix 主导向全面兼容 Windows 开发环境转型。
3.  **容灾与会话恢复机制:**
    关于 `/undo` 映射、历史 `tool_calls` 修复、

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-06-11

---

## 1. 今日速览

OpenCode 连续发布 **v1.17.1 → v1.17.2 → v1.17.3** 三个补丁版本，重点修复桌面端崩溃、远程配置认证过期和子代理权限问题。社区方面，**Cursor CLI 集成请求**持续升温（183 👍），**高 CPU 占用**问题在多个 Issue 中被密集反馈，核心团队同时在推进 **TUI 2.0 重构**和 **V2 Session API**，底层架构正在经历一次较大的演进。

---

## 2. 版本发布

### v1.17.3
- 修复 v1.17.2 导致的桌面端崩溃问题

### v1.17.2
- **Core**: 远程配置认证过期时引导重新登录（替代直接加载失败）；恢复子代理使用自身配置权限的能力
- **Desktop**: 修复 Linux 启动器和图标标识，解决固定到任务栏后无法正常打开的问题

### v1.17.1
- **Core**: `references` 配置支持为代理添加使用描述、显示在新文档中、可从 `@` 自动补全中隐藏；兼容旧版 `reference` 配置项
- 修复 MCP prompt 和 resource 请求相关问题

---

## 3. 社区热点 Issues

**① #2072 — 支持 Cursor CLI 集成** 👍183 | 💬71
[链接](https://github.com/anomalyco/opencode/issues/2072)
> 自 Cursor 发布 CLI 后，社区强烈希望 OpenCode 能接入其 API。183 个赞为全站最高，讨论活跃度极高，是当前最热门的功能请求。核心障碍在于 Cursor API 未公开文档。

**② #27167 — 原生 `/goal` 命令：持久化会话目标** 👍69 | 💬40
[链接](https://github.com/anomalyco/opencode/issues/27167)
> 提议增加原生 `/goal` 命令，实现跨轮次的自动化目标追踪。与 Claude Code 和 OpenAI Codex 的 Goal Mode 对标，社区讨论深入，被认为是提升自主代理能力的关键特性。

**③ #30086 — 新版本 CPU 占用飙升** 👍1 | 💬10
[链接](https://github.com/anomalyco/opencode/issues/30086)
> 用户反馈最近 7 天内 CPU 占用急剧上升，过去可同时开 10+ 会话，现在 3 个就卡顿。多个 Issue 呼应此问题（#16438、#31831），属于当前最紧急的性能回归。

**④ #11831 — YOLO 模式：自动批准所有权限提示** 👍29 | 💬9
[链接](https://github.com/anomalyco/opencode/issues/11831)
> 面向高级用户的"无确认模式"请求，跳过所有工具权限提示（仍尊重 `deny` 规则）。29 赞表明需求强烈，涉及安全边界设计。

**⑤ #31247 — Opus 4.8 via GitHub Copilot 泄露工具调用文本** 💬8
[链接](https://github.com/anomalyco/opencode/issues/31247)
> 使用 `github-copilot/claude-opus-4.8` 时，模型会将工具调用标记（`call read`、`<invoke>`）泄漏为普通消息并持久化，影响后续上下文质量。

**⑥ #30158 — Web UI 终端按钮自 v1.15.12 起消失** 👍6 | 💬7
[链接](https://github.com/anomalyco/opencode/issues/30158)
> Web UI 右上角终端按钮在升级后消失，降级到 v1.15.11 恢复。影响 Web 端用户的基本工作流。

**⑦ #6490 — Web UI 无法浏览默认用户目录外的文件夹** 👍12 | 💬10
[链接](https://github.com/anomalyco/opencode/issues/6490)
> Windows 下 `opencode web` 无法导航到 D 盘等非默认路径，限制多盘符环境的使用体验。长期未解决。

**⑧ #31831 — 空闲状态下 CPU 持续 185% / 内存 500MB+** 💬1
[链接](https://github.com/anomalyco/opencode/issues/31831)
> 今日新报，用户在 macOS Apple Silicon 上使用 `deepseek-v4-pro`，即使空闲状态也消耗极高资源。附 10 分钟监控数据，与 #30086 形成呼应。

**⑨ #31830 — Windows bash 工具中文输出乱码** 💬1
[链接](https://github.com/anomalyco/opencode/issues/31830)
> `Console.OutputEncoding` 被重置为 936 编码导致中文乱码，影响中文 Windows 用户体验。

**⑩ #31812 — 讯飞云 (xfyun) 引擎繁忙时未自动重试** 💬4
[链接](https://github.com/anomalyco/opencode/issues/31812)
> 讯飞云 API 返回 `engine busy` 时不触发重试逻辑，请求直接失败。已有对应 PR #31819 修复。

---

## 4. 重要 PR 进展

**① [#31796] TUI 2.0 重大重构** — @thdxr
[链接](https://github.com/anomalyco/opencode/pull/31796)
> Terminal UI 2.0 全面重构，是今天最核心的架构变更 PR，将从根本上改变 TUI 层的数据流和渲染方式。

**② [#31822] V2 Session API 端点** — @thdxr
[链接](https://github.com/anomalyco/opencode/pull/31822)
> 新增 V2 location 解析、session 创建/查询端点和会话级待处理问题列表，同步更新 JS SDK。为 TUI 2.0 和外部集成提供 API 基础。

**③ [#31826] TUI 数据层重构：替换 sync-v2 为 DataProvider** — @thdxr
[链接](https://github.com/anomalyco/opencode/pull/31826)
> 用领域驱动的 `DataProvider` 替换旧的 sync-v2 context，迁移 agent/model/provider/reference 等消费者到 `useData`，配合 TUI 2.0 进行。

**④ [#31819] 修复讯飞云 engine busy 重试** — @magicxoxcco
[链接](https://github.com/anomalyco/opencode/pull/31819)
> 将 `engine busy` 加入可重试错误列表，解决 #31812。国内用户使用讯飞云时的关键修复。

**⑤ [#31817] 修复 isV1 检测遗漏 compaction 配置** — @szzhoujiarui-sketch
[链接](https://github.com/anomalyco/opencode/pull/31817)
> `isV1()` 未识别仅包含 `compaction` 字段的配置，导致 `preserve_recent_tokens` 被静默丢弃。影响上下文压缩策略。

**⑥ [#31329] PDF/图片文件读取失败时优雅降级** — @zhiyiwang-byte
[链接](https://github.com/anomalyco/opencode/pull/31329)
> 损坏或无权限的 PDF 文件不再导致会话崩溃，改为可观察的错误输出。提升文件处理的鲁棒性。

**⑦ [#29217] TUI 内联 `$skill` 调用 + Skill Pill UI** — @jjdubski
[链接](https://github.com/anomalyco/opencode/pull/29217)
> 提示词输入框中输入 `$` 触发技能自动补全，选中后以 pill 形式展示。关闭 5 个相关 Issue，是交互体验的重要提升。

**⑧ [#31805] 修复 TUI 退出时 epilogue 被清理的 bug** — @tobwen
[链接](https://github.com/anomalyco/opencode/pull/31805)
> scoped shutdown 清理时提前清除会话 epilogue，导致退出信息无法正常打印。通过快照机制修复。

**⑨ [#31745] 将 content-filter finish reason 展示为可见错误** — @kkdawkins
[链接](https://github.com/anomalyco/opencode/pull/31745)
> 当模型因内容过滤停止时（如 Anthropic `refusal`），之前无错误提示。现在用户能看到明确的原因说明。

**⑩ [#31802] MCP 认证和调试中保留 headers** — @rekram1-node
[链接](https://github.com/anomalyco/opencode/pull/31802)
> 修复 MCP OAuth 传输和 debug 探测中丢失自定义 headers 的问题，确保内容协商和认证 headers 正确传递。

---

## 5. 功能需求趋势

| 趋势方向 | 代表 Issue | 关注度 |
|---------|-----------|--------|
| **IDE/编辑器集成** | #2072 Cursor 支持 | 👍183，社区最高 |
| **自主代理 / 目标驱动** | #27167 `/goal` 命令 | 👍69，40 条讨论 |
| **性能优化（CPU/内存）** | #30086、#31831、#16438 | 多 Issue 密集反馈 |
| **权限与自动化** | #11831 YOLO 模式 | 👍29 |
| **多模型/多提供商兼容** | #26762 Cerebras、#31812 讯飞云、#31755 MiniMax | 持续增长 |
| **国际化与本地化** | #29309 越南语、#31830 中文编码 | 亚洲市场扩展信号 |
| **GitHub Actions 集成** | #30468 编辑已有评论、#25699 私有仓库 | CI/CD 场景深化 |
| **插件/扩展能力** | #31821 ensureServer() API | 插件生态萌芽 |

---

## 6. 开发者关注点（痛点总结）

**🔴 高 CPU / 内存占用是当前最紧急的问题**
多个 Issue（#30086、#31831、#16438）独立报告了资源消耗异常，用户反馈从"可开 10 会话"退化为"3 会话就卡"。Snapshot 文件膨胀到 16GB 也被提及。v1.17.x 系列尚未解决此问题。

**🟡 桌面端稳定性需要关注**
v1.17.3 刚修复了 v1.17.2 引入的桌面端崩溃，结合 Linux 启动器修复（v1.17.2）和文件树缓存残留 bug（#31804），Desktop 端质量仍需加强。

**🟡 Web UI 功能缺失在积累**
终端按钮消失（#30158）、无法浏览非默认目录（#6490）、`xdg-open` 在容器中报错（#31815），Web 端体验与 TUI/Desktop 差距在扩大。

**🟢 社区贡献活跃，底层架构重构进行中**
核心团队（@thdxr、@jlongster）正在推进 TUI 2.0 和 LayerNode 架构重构，多个测试层（snapshot-race、processor、share）在同一天被重构简化，表明内部正在进行系统性技术债清理。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 (2026-06-11)

## 📰 今日速览
今日 Qwen Code 社区重点关注**系统稳定性与内存管理**，包括修复潜在的 OOM 问题、优化 Prompt Cache 策略以及增强 Context 压缩能力。此外，**Daemon (后台) 模式**和 **Web/桌面端 UI** 迎来大量功能完善与补丁。社区热烈讨论了关于 MCP 工具链路验证、后台子代理权限控制以及 CLI 终端 Raw Mode 等核心底层机制。

## 🚀 版本发布
过去 24 小时内无正式版本发布。

---

## 🔥 社区热点 Issues (Top 10)

1. **[安全] `env` 命令在只读白名单中导致任意命令执行**
   - **链接**: [#4930](https://github.com/QwenLM/qwen-code/issues/4930)
   - **概述**: 安全研究人员指出，`env` 被列为只读命令，但攻击者可利用 `env` 执行任意系统命令（如 `env bash -c "malicious_code"`）从而绕过安全确认。这是一个高优先级的安全漏洞。
2. **[核心] SchemaValidator 缺失数字类型转换导致 MCP 工具调用失败**
   - **链接**: [#4966](https://github.com/QwenLM/qwen-code/issues/4966)
   - **概述**: LLM 经常将 MCP 工具的数字参数输出为字符串（如 `{"depth": "3"}`），严格的校验器会直接拒绝。开发者呼吁增加自动类型转换以提升 MCP 工具调用成功率。
3. **[核心] 自动生成的 Memory 干扰正常的 CLI 调用**
   - **链接**: [#4976](https://github.com/QwenLM/qwen-code/issues/4976)
   - **概述**: 自动提取的 Memory 内容在后续会话中产生了严重的误导，导致模型在执行任务时（如读取特定格式文档）绕了极大弯路，社区呼吁需要更精准的 Memory 召回/提取机制。
4. **[交互] 终端在特定情况下回退到 Cooked Mode 导致输入无响应**
   - **链接**: [#4973](https://github.com/QwenLM/qwen-code/issues/4973)
   - **概述**: 当最后一个 ink `useInput` 停用时，`KeypressContext` 跳过了 Raw Mode 的获取，导致终端在按下 Enter 前完全无响应，影响 CLI 基础交互体验。
5. **[交互] 后台 Subagents 自动拒绝需要权限的工具调用**
   - **链接**: [#4928](https://github.com/QwenLM/qwen-code/issues/4928)
   - **概述**: 目前后台运行的子代理遇到需要交互确认的操作会直接被拒绝。建议将审批请求推送到父会话的 UI 队列中，以实现真正无缝的后台自动化。
6. **[核心] 长对话 Goal 循环中 Hook 继续跳过微压缩导致上下文溢出**
   - **链接**: [#4838](https://github.com/QwenLM/qwen-code/issues/4838)
   - **概述**: 在执行 `/goal` 等长任务时，Hook 递归调用不会触发 `microcompactHistory()`，导致上下文无法被及时压缩，极易触碰 Token 上限。
7. **[配置] OpenWork 无法区分来自不同提供商的相同模型**
   - **链接**: [#4877](https://github.com/QwenLM/qwen-code/issues/4877)
   - **概述**: 当用户在 `settings.json` 中配置了不同提供商（如 OpenAI 和 DeepSeek）的相同名称模型时，系统无法正确路由请求，模型切换功能出现混乱。
8. **[UX] SSH 环境下 `/copy` 命令依赖图形库不可用**
   - **链接**: [#4926](https://github.com/QwenLM/qwen-code/issues/4926)
   - **概述**: 在纯 SSH 连接的 Linux 环境下，`/copy` 命令因缺少 `xclip` 和 `xsel` 失败。开发者建议在无 GUI 环境下应回退到终端转义序列来实现复制。
9. **[功能] 增加跨会话全局用量统计仪表盘**
   - **链接**: [#4597](https://github.com/QwenLM/qwen-code/issues/4597)
   - **概述**: 对标 Claude Code，社区希望增强 `/stats` 命令，支持将会话数据持久化，并提供跨会话的全局历史趋势 Token/耗时聚合统计。
10. **[性能] 自动与手动截断阈值完全相同**
    - **链接**: [#4945](https://github.com/QwenLM/qwen-code/issues/4945)
    - **概述**: 用户发现 `/context` 显示的 Auto 和 Hard 阈值一致（皆为 42k），导致系统直到最后一刻才触发压缩，降低了长上下文的表现。

---

## 🛠 重要 PR 进展 (Top 10)

1. **[重构] 移除死代码防止 OOM (内存溢出)**
   - **链接**: [#4982](https://github.com/QwenLM/qwen-code/pull/4982)
   - **说明**: 清理了 `Turn.debugResponses` 及相关废弃代码。由于该数组会缓存所有流式返回块且从未被读取，移除它可显著降低内存泄漏风险。
2. **[核心] 增加 `enter_plan_mode` 工具与计划审批门**
   - **链接**: [#4853](https://github.com/QwenLM/qwen-code/pull/4853)
   - **说明**: 引入了代理主动降级到 Plan 模式的机制。在执行复杂或定义不明确任务前，模型可自行进入规划状态并等待用户批准，提升安全性。
3. **[核心] 稳固 Prompt Cache 前缀，抵御 MCP/Skills 频繁变动**
   - **链接**: [#4896](https://github.com/QwenLM/qwen-code/pull/4896)
   - **说明**: 解耦了 Skill 的“可见性”与“校验逻辑”，将其放入不同的缓存层级，修复了会话中动态加载 MCP 导致整体 Prompt Cache 失效的高成本问题。
4. **[交互] 引入无需 LLM 的规则化压缩命令 `/compress-fast`**
   - **链接**: [#4893](https://github.com/QwenLM/qwen-code/pull/4893)
   - **说明**: 新增本地快速压缩指令，不依赖大模型即可对上下文进行规则提炼，极大节省了 Token 消耗和压缩耗时。
5. **[ Daemon ] Daemon 模式功能批量合并进主分支**
   - **链接**: [#4490](https://github.com/QwenLM/qwen-code/pull/4490)
   - **说明**: 一个巨大的里程碑式 PR，合并了 daemon 模式核心功能集，包含 46 个提交，跨越 386 个文件修改（+11.5万/-1.2万行代码）。
6. **[ Daemon ] ACP/REST 对齐 —— 新增 29 个内部方法**
   - **链接**: [#4827](https://github.com/QwenLM/qwen-code/pull/4827)
   - **说明**: 为 Daemon 模式的 Web 交互增加了 29 个标准方法，实现了 ACP 与 REST 接口的完全对齐，增强多端控制能力。
7. **[ UI ] TUI 可折叠的思考块与计时器**
   - **链接**: [#4598](https://github.com/QwenLM/qwen-code/pull/4598)
   - **说明**: 优化思考过程展示。模型推理时展示固定高度的实时流式窗口，

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*