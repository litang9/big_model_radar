# AI CLI 工具社区动态日报 2026-09-26

> 生成时间: 2026-09-25 23:17 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告
**数据日期：2026-09-26**

---

## 1. 生态全景

AI CLI 工具已从“终端补全工具”全面演进为**以 agent 编排为核心的工程平台**：多 agent/子代理、后台任务、会话持久化成为各家共同投入的主战场。生态分层清晰——Claude Code 与 Codex 引领平台化（插件系统、多云网关），Gemini CLI 与 Qwen Code 全力补齐可靠性短板，OpenCode 和 Copilot CLI 则在稳定性与开放性上寻求突破。与此同时，**长会话稳定性、认证链路脆弱、Windows 支持滞后**是全生态未解的共性债务。插件/Mods 可扩展性（Claude Code）、托管 Agent 架构（Qwen Code）、Skills 生态（Copilot CLI）预示下一阶段竞争焦点是**第三方扩展生态**。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | 重要 PR | Release | 今日焦点事件 |
|---|---|---|---|---|
| **Claude Code** | 10+（批量 stale 关闭） | 6（Mods 主线） | v2.1.283 | Mods 架构密集推进；连续两版回归（pty、权限） |
| **OpenAI Codex** | 10 | 10 | rust-v0.157.0 + 多个 alpha | 全平台 401 认证故障井喷后修复；GPT-6 Sol/Luna 上线 |
| **Gemini CLI** | 10（50 更新） | 10（43 更新） | v0.62.0-nightly | 多个 P1 修复并行；Subagent 可靠性讨论集中 |
| **Copilot CLI** | 10 | **0** | v1.0.89-4 | Skills 系统问题集群发酵；零 PR 更新 |
| **OpenCode** | 10 | 10 | 无 | V2 稳定性问题为主；8 月积压 PR 批量处置 |
| **Qwen Code** | 10 | 10 | v0.24.5-nightly | ripgrep 打包事故；Managed Agent 顶层架构讨论 |
| **Kimi Code CLI** | — | — | — | 无活动 |

**观察**：Codex、Gemini、Qwen 呈“高频发布 + 高 issue 流动”的快速迭代形态；Claude Code 处于大功能（Mods）冲刺期；Copilot CLI 社区活跃但工程响应（0 PR）明显滞后，是健康度警示信号。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **子代理/编排可靠性** | Gemini、OpenCode、Qwen、Claude | Gemini 子代理误报成功（#22323）；OpenCode 早报/不报完成（#48826/#50751）；Qwen 多后台 Agent 重复工作（#8097）——“看起来完成但实际没做”是共性信任危机 |
| **认证/凭证链路** | Codex、Copilot CLI、OpenCode、Gemini | Codex 全端 401 事件；Copilot token 停止刷新（#4929）；OpenCode 凭证误路由（#49847）；Gemini 认证死循环（#29448） |
| **插件/扩展生态** | Claude、Copilot CLI、OpenCode、Qwen | Claude Mods（#91870，126👍）；Copilot Skills 语义缺陷（#4438）；OpenCode V2 插件 API 能力断层（#51265） |
| **Windows/WSL/远程环境兼容** | 全部主要工具 | Qwen ConPTY 进程泄漏（#11303）、Codex Windows 卡顿（#20214）、Claude Remote-SSH CPU 飙升（#87739）、Copilot WSL2 ARM64（#3534） |
| **上下文经济性** | Copilot CLI、Gemini、Claude | Copilot 系统提示词占 10% 窗口（#2627）；Gemini 二进制误读导致 token 膨胀；Gemini AST 感知读取提案（#22745） |
| **权限/安全精细化** | Claude、Qwen、Codex | Claude SECRET 变量静默丢弃（#97299）；Qwen hook 竞态 deny 被覆盖（#12683）；Codex 沙箱保护 .aws 目录 |
| **企业/网关集成** | Claude、Qwen、Codex、OpenCode | Claude prompt-id header（v2.1.283）；Qwen 托管扩展目录（#12183）；Codex Bedrock 支持 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 可扩展性（Mods）、企业管控、桌面端补齐 | 专业开发者 + 企业（网关/托管策略） | 声明先行的插件引擎，遥测/diff mod 作为内建能力扩展点 |
| **OpenAI Codex** | 新模型首发、多云（Bedrock）、全端覆盖 | ChatGPT 订阅用户（Plus/Pro/Max） | Rust 重写 + 极快 alpha 迭代，模型能力驱动 |
| **Gemini CLI** | 稳定性修复、沙箱安全、token 效率 | 开源社区 + Google 生态用户 | 开放式架构提案（OS 沙箱、AST 工具），社区共建程度高 |
| **Copilot CLI** | Skills 生态、路由层级、GitHub 原生集成 | GitHub/VS Code 存量用户 | 依托 GitHub 平台分发，但工程迭代慢（今日 0 PR） |
| **OpenCode** | V2 迁移、provider 中立、桌面端 | 多模型/自带端点用户 | provider 无关路由，事件溯源架构（序列冲突暴露其代价） |
| **Qwen Code** | Managed Agent 平台化、企业部署 | 企业/代理环境 + 阿里生态 | TS agent loop + Java 控制面双栈，本地小模型分流（System One）创新 |

---

## 5. 社区热度与成熟度

- **第一梯队（活跃 + 快速迭代）**：**Codex**（401 事件 24h 内 4+ issue 井喷且快速修复，显示响应力与用户基数双高）、**Gemini CLI**（50 issues/43 PRs 更新，P1 修复节奏密集）。
- **战略投入期**：**Claude Code**（Mods 单一 issue 126👍/216 评论为全生态最高，功能冲刺伴随回归频发）；**Qwen Code**（顶层架构讨论 + 打包事故并存，平台化野心明确但分发链路不成熟）。
- **承压期**：**OpenCode**（V2 迁移阵痛：插件断层、事件序列 bug、PR 批量关闭）；**Copilot CLI**（需求呼声高但响应缺位，社区信任存在流失风险）。
- **沉寂**：Kimi Code CLI 连续无活动。

**成熟度悖论**：用户量最大的工具（Codex、Claude）反而回归问题最多，说明规模放大了脆弱面；而“任务结果可信度”（误报成功、静默降级）是所有工具共同的成熟度短板。

---

## 6. 值得关注的趋势信号

1. **扩展性是下一轮竞争决胜点**：Claude Mods（数周内交付承诺）、Copilot Skills、OpenCode 插件 API、Qwen hooks 生态——各家均在从“单体工具”转向“平台”。第三方开发者现在切入可抢占先机。
2. **“假成功”是新的信任危机**：Gemini 子代理误报 GOAL、OpenCode 早报 completed、Claude /goal 无限重触发——agent 编排的可观测性与确认机制（ack 路径）将成为采购评估的关键指标。
3. **无人值守自动化需求爆发**：Codex 禁用 60s 自动解析（210👍）、Qwen 后台 Agent CLI 管理、Claude goal 约束——长时任务场景的配置开关类需求👍数普遍最高，产品应默认提供“用户控制权”。
4. **企业/网关集成从边缘走向主流**：Claude prompt-id header、Codex Bedrock、Qwen 托管扩展、OpenCode 多网关路由——BYO-model 与多云已是刚需而非选项。
5. **打包分发与回归纪律是被低估的风险**：Qwen ripgrep 执行位事故、Claude 连续两版回归、Codex 401 全端故障——建议生产用户锁定版本、延迟 1-2 个版本跟进，并优先选择发布节奏可控（非 nightly 强推）的渠道。
6. **Windows 与非标准环境仍是二等公民**：全生态 Windows 问题集中（ConPTY 泄漏、卡顿、ARM64 缺失），若团队以 Windows 为主，当前阶段选型需额外谨慎。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-09-26，来源：anthropics/skills）

> 说明：当前数据抓取中 PR 评论数缺失，以下排名基于 Issues 热度、PR 活跃度与近三个月更新情况综合评估。

---

## 一、热门 Skills 排行（PR）

| # | Skill | 功能 | 状态 | 热点 |
|---|---|---|---|---|
| 1 | **skill-creator 触发评估修复**（#1298，@MartinCajiao） | 修复触发评估误报、Windows `select()` 兼容、运行时失败被误判为非触发等问题 | OPEN | 与 Issue #556（触发率 0%）呼应，是社区最核心的“Skill 可靠性”问题 |
| 2 | **mcp-builder 兼容修复**（#1742，@Kuldeeep18） | 修复 `mcp>=2.0` 的 `streamable_http_client` 重命名与自定义 header 问题 | OPEN | 关联 Issue #1390（评估脚本全量报错），MCP 生态兼容是刚需 |
| 3 | **docx 系列修复**（#1792 / #1790，@TINGyu123644；#541，@Lubrsy706） | LibreOffice 超时误报成功、`document.xml.rels` 缺失、`w:id` 冲突致文档损坏 | OPEN | docx 是使用最广的官方 Skill，修复 PR 持续活跃至 9 月下旬 |
| 4 | **pyxel 复古游戏开发**（#525，@kitao） | Python 复古游戏创建/调试/无头验证 | OPEN | 挂起近 7 个月仍在更新（09-22），长尾讨论度高 |
| 5 | **md2video-audio**（#1703，@70v-Yoyo） | Markdown 一键编译为带真人配音的 MP4 视频（Marp + TTS） | OPEN | 零成本内容创作方向，9 月新 PR 中热度最高 |
| 6 | **blast-radius**（#1776，@kishormorol） | 批量/破坏性写操作前的“爆炸半径”检查清单 | OPEN | 与 agent-governance 提案（#412）同属 AI 安全治理热点 |
| 7 | **document-typography**（#514，@PGTBoos） | AI 生成文档的排版质量控制（孤行、寡段、编号错位） | OPEN | 切中“AI 文档输出质量”普遍痛点 |
| 8 | **AWT E2E 测试**（#822，@ksgisang） | 零代码视觉驱动的浏览器 E2E 测试 | OPEN | 测试自动化方向的代表贡献 |

---

## 二、社区需求趋势（Issues 提炼）

1. **Skill 分发与信任机制**：#492（43 评论，全仓库最热）——社区 Skill 冒用 `anthropic/` 命名空间，呼吁官方做签名/来源标识；#189 插件重复安装问题。
2. **组织级 Skill 共享**：#228（16 评论）——期待 Claude.ai 原生支持团队共享 Skill 库。
3. **触发与评估可靠性**：#556（12 评论）——`claude -p` 无法触发 Skill，评估框架失效，是贡献者的共同痛点。
4. **上下文窗口治理**：#1487——`claude-api` Skill 一次注入 156k token 打爆上下文，呼吁 Skill 内容按需/渐进加载。
5. **安全与治理类 Skill**：#412（agent-governance）、#1385（推理质量门禁流水线）、#1175（SPO 权限边界）。
6. **Agent 记忆与状态管理**：#1329——compact-memory 符号化压缩记忆提案。
7. **平台兼容**：#29（Bedrock 支持）、#16（Skills 暴露为 MCP）。

---

## 三、高潜力待合并 Skills（OPEN 且近期活跃）

- [#1742 mcp-builder 修复](https://github.com/anthropics/skills/pull/1742)：绑定明确 Issue #1668，修复路径清晰，最可能近期落地
- [#1792 / #1790 docx 修复](https://github.com/anthropics/skills/pull/1792)：9 月下旬仍持续更新，官方文档 Skill 缺陷修复优先级高
- [#1734 孤立 docx 批注检测](https://github.com/anthropics/skills/pull/1734)：09-25 更新，docx 生态补充
- [#1298 skill-creator 评估修复](https://github.com/anthropics/skills/pull/1298)：解决评估基建核心缺陷，影响所有 Skill 贡献者
- [#525 pyxel](https://github.com/anthropics/skills/pull/525)：长期跟踪、持续打磨，接近成熟

---

## 四、生态洞察

**社区最集中的诉求是：让 Skills 从“能触发”走向“可信”——即修复触发/评估可靠性、控制上下文消耗、并建立官方签名与组织级分发的信任体系，让海量社区贡献（文档处理、测试、内容创作、安全治理）能安全规模化落地。**

---

# Claude Code 社区动态日报 · 2026-09-26

## 1. 今日速览

Claude Code 发布 **v2.1.283**，为 LLM 网关场景增强请求追踪能力（`x-claude-code-prompt-id` hint header）并新增 `availableModelsMatch` 托管设置。备受瞩目的 **Mods 可扩展性架构**持续密集推进，@poteat 连发多个相关 PR，距离 "N 周内交付" 的承诺越来越近。社区方面，Opus 5.5 的任务聚焦回归、2.1.281 引入的 pty 回归等新问题值得升级用户留意。

## 2. 版本发布

**v2.1.283**
- 新增 `x-claude-code-prompt-id` 网关 hint header，使 LLM 网关可按用户 prompt 分组请求；需通过 `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1` 显式开启。
- 新增 `availableModelsMatch` 托管设置：设为 `"exact"` 时，`availableModels` 条目将仅精确匹配允许的模型。

## 3. 社区热点 Issues（Top 10）

1. **#91870** [OPEN] Mods — 让 Claude 可扩展性提升 10 倍（216 评论 / 126 👍）
   本季度最高热度提案，官方已确认 "数周内” 交付 function hooks，社区高信号反馈正持续塑造设计。配套 PR（见下文）显示开发已进入测试与声明对齐阶段。
   https://github.com/anthropics/claude-code/issues/91870

2. **#97117** [OPEN] Opus 5.5 相比 Opus 4.6 出现严重范围蔓延与任务聚焦回归
   长周期工程项目（约 18 个会话）中途切换到 Opus 5.5 后出现明显的 scope creep，用户被迫回退 4.6。新模型行为回归值得所有升级用户关注。
   https://github.com/anthropics/claude-code/issues/97117

3. **#97297** [OPEN] 2.1.281 回归：Bash 子进程继承 TUI 的真实 pty，ssh 密码提示会破坏全屏鼠标追踪并卡死会话（含复现）
   新版本回归 + 可复现，影响所有需要交互式子进程认证（ssh/git push）的远程开发流程，优先级高。
   https://github.com/anthropics/claude-code/issues/97297

4. **#97299** [OPEN] headersHelper 静默忽略名称含 SECRET 的环境变量（含复现，标记 security/regression）
   涉及 MCP 请求头构造的安全相关回归，含 SECRET 的环境变量被静默丢弃，可能导致认证头缺失或行为不可预期。
   https://github.com/anthropics/claude-code/issues/97299

5. **#96096** [OPEN] 2.1.280 回归：Bypass 模式下 Claude in Chrome 工具每次调用都弹权限提示，"Always allow" 失效（含复现）
   桌面端 Code 标签页的权限记忆失效，对自动化浏览器工作流是实质阻断。
   https://github.com/anthropics/claude-code/issues/96096

6. **#94041** [OPEN] 原生 /goal Stop hook 无限重触发，无法确认条件已满足
   会话级目标守卫机制缺少 ack 路径，仅靠重复拦截安全阀兜底，影响所有使用 goal 约束长任务的自动化场景。
   https://github.com/anthropics/claude-code/issues/94041

7. **#43477** [OPEN] VS Code 中 Claude Code 窗口 Ctrl+C 复制失效（长期未解）
   悬置近 6 个月的 IDE 集成基础体验问题，6 👍，Windows + VS Code 用户的持续痛点。
   https://github.com/anthropics/claude-code/issues/43477

8. **#87739** [OPEN] CLI 原生二进制在 VS Code Remote-SSH (Ubuntu 26.04) 启动时 CPU 飙到 ~100% 不降（含复现）
   长期未解的性能问题，直接影响远程开发可用性。
   https://github.com/anthropics/claude-code/issues/87739

9. **#74589** [OPEN] 功能请求：允许删除/取消发布 Artifact
   TUI 工具方向的补齐需求——Artifact 一旦创建无法清理，管理体验缺口明显。
   https://github.com/anthropics/claude-code/issues/74589

10. **#97295** [OPEN] 桌面端：同机多账号应显示所有已登录账号的 Code 会话
    多账号工作流下切换账号后历史会话从侧边栏“消失”（数据仍在磁盘），企业/外包场景常见痛点。
    https://github.com/anthropics/claude-code/issues/97295

*注：今日多个陈旧 issue 被批量标记 stale 关闭（如 #45178 Cowork EXDEV、#67522 Neo 2 键盘 Cmd+V、#72590 VS Code skill 注入块挤压回复区等），若仍受影响请跟进 reopen。*

## 4. 重要 PR 进展（Mods 架构主线为主）

> 今日 PR 全部来自 @poteat，围绕 **Mods（#91870）** 的引擎/插件协同开发，采用“声明先于 CLI 发布、测试红直到发布版携带对应事件”的联动策略。

1. **#97293** mods: 类型声明携带 `process.run` 的截断标志（`isStdoutTruncated`/`isStderrTruncated`）及 `fs.list` 的 `mtimeMs` —— 为 Mods 提供更精细的进程输出与文件元数据 API。
   https://github.com/anthropics/claude-code/pull/97293

2. **#97241** sec-default: 系统提示词各 section 可继续穿透 user tier —— 涉及 prompt 组合（`prompt.compose`）与安全默认值的分层设计，合并顺序与引擎强耦合。
   https://github.com/anthropics/claude-code/pull/97241

3. **#96953** [已合] diff: focus hook 同时应答引擎与插件注册名（`cc-plugin-diff`）—— 修复元素命名匹配问题，Mods 下 diff 视图交互稳定性提升。
   https://github.com/anthropics/claude-code/pull/96953

4. **#96930** [已合] telemetry/agents-md: 测试插件按名称挂接 collector stream，验证第三方插件对 `telemetry.log` 事件的能力边界。
   https://github.com/anthropics/claude-code/pull/96930

5. **#96917** [已合] telemetry: `$.telemetry.log` / `$.telemetry.mark` 由 mod 的 hooks 实现，作为 engine 侧的遥测能力扩展点。
   https://github.com/anthropics/claude-code/pull/96917

*（今日活跃 PR 共 6 条，其余为社区提交 #41611 “补充缺失源码”，长期 Open，无实质进展。）*

## 5. 功能需求趋势

- **插件/Mods 可扩展性**：绝对主旋律。issue #91870 与配套 PR 显示 function hooks、遥测事件、diff/telemetry mod 正在全面落地，未来数周是关键窗口。
- **桌面端体验补齐**：多账号会话可见性（#97295）、Artifact 管理（#74589）、RTL 布局渲染（#80514）等桌面端需求持续累积。
- **权限与安全精细化**：Bypass 模式权限记忆失效（#96096）、SECRET 环境变量静默忽略（#97299）、跨端权限快捷键不一致（#73325）——权限 UX 与安全默认值是高频方向。
- **模型行为与选择控制**：新 `availableModelsMatch` 设置、模型降级投诉（#95411）、Opus 5.5 聚焦回归（#97117），反映用户对“锁定指定模型 + 稳定行为”的强烈诉求。
- **企业/网关集成**：v2.1.283 的 prompt-id header 表明 LiteLLM 等网关用户的需求正被官方响应。

## 6. 开发者关注点

- **版本回归频发**：2.1.280（权限提示）、2.1.281（pty 继承）连续两版引入回归，建议生产环境升级前查看 release notes 与近期 regression 标签 issue。
- **交互式子进程是雷区**：ssh 密码提示、MCP 长任务自动后台化（#86464）等问题表明 TUI 与子进程 pty/进度通知的交互仍是最脆弱区域。
- **远程/容器化环境**：Remote-SSH 下 CPU 空转（#87739）、Workflow 工具按 cwd 而非脚本仓库解析 agent（#80544）持续困扰非本地开发场景。
- **误判与模型行为不可控**：内容过滤误报（#85426、#95415）、模型静默降级（#95411）缺少用户侧开关或解释，是信任层面的主要摩擦点。
- **陈旧 issue 大批量 stale 关闭**：Windows 桌面端、Cowork、VS Code 相关的老问题被自动关闭较多，受影响用户需主动跟进，避免问题石沉大海。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-09-26 | 数据来源：github.com/openai/codex**

---

## 1. 今日速览

今日最大事件是席卷全平台的 **401 Unauthorized 认证故障**：大量 ChatGPT 订阅用户（Plus/Pro/Max）在 Desktop、CLI 和 IDE 扩展中遭遇 "Incorrect API key: sk-svcacct..." 错误，相关 Issue 在 24 小时内井喷式出现并多数已快速关闭，疑似服务端问题已修复。与此同时，**rust-v0.157.0 正式版发布**，带来 GPT-6 Sol/Luna 新模型支持（含 Amazon Bedrock），仓库还保持高频的 alpha 迭代节奏（0.158/0.159 系列）。

---

## 2. 版本发布

### rust-v0.157.0（正式版）
- **新增 GPT-6 Sol 和 Luna 模型**，包括 Amazon Bedrock 支持，以及旧模型的迁移提示（#47332, #47347）
- 默认启用**全屏转录（fullscreen transcripts）**，新增 Shift-click 扩展文本选择（#47178, #47414）
- 启用符合条件的自动后台服务器启动

### Alpha 迭代（同期密集发布）
- 0.159.0-alpha.1 ~ alpha.3
- 0.158.0-alpha.13 ~ alpha.15

> 迭代节奏极快，正式版与下一版本的 alpha 通道并行推进，显示主干开发活跃。

---

## 3. 社区热点 Issues

| # | Issue | 关注点 |
|---|-------|--------|
| 1 | [#48235](https://github.com/openai/codex/issues/48235) 🔒已关闭 | 401 故障“源头” Issue：Desktop + CLI 同时失效，重新认证无效。29 评论/44 👍，快速关闭表明服务端已修复 |
| 2 | [#48237](https://github.com/openai/codex/issues/48237) | 401 "Incorrect API key" 最热单帖（28 评论/48 👍），代表今天大批受影响用户 |
| 3 | [#48232](https://github.com/openai/codex/issues/48232) 🔒 | Remote compaction 触发 401，被拒密钥为用户从未配置的 service-account key，定位价值高 |
| 4 | [#48230](https://github.com/openai/codex/issues/48230) 🔒 | 恢复会话线程时 401，Plus 用户，21 评论 |
| 5 | [#20214](https://github.com/openai/codex/issues/20214) | **长期顽固 Bug**：Windows 11 上 App 频繁卡顿/冻结，114 评论/87 👍，至今未解 |
| 6 | [#28969](https://github.com/openai/codex/issues/28969) | **210 👍 高需求**：请求配置项以禁用 60 秒问题自动解析，长时间无人值守工作流的核心痛点 |
| 7 | [#25443](https://github.com/openai/codex/issues/25443) | Desktop 活跃会话中陷入 refresh-token-revoked 状态，是 OAuth 令牌生命周期的老问题 |
| 8 | [#35823](https://github.com/openai/codex/issues/35823) | `logs_2.sqlite` 虽设置了 `auto_vacuum=INCREMENTAL` 但从不执行，日志文件无限增长 |
| 9 | [#19504](https://github.com/openai/codex/issues/19504) / [#21563](https://github.com/openai/codex/issues/21563) | 阿拉伯语/希伯来语/波斯语 **RTL 渲染支持**缺失，国际化用户持续呼吁 |
| 10 | [#48179](https://github.com/openai/codex/issues/48179) | Browser Use 对 localhost 返回 `ERR_BLOCKED_BY_CLIENT`，而内置浏览器手动访问正常，影响本地 Web 开发调试 |

---

## 4. 重要 PR 进展

1. [#48224](https://github.com/openai/codex/pull/48224) — **压缩（compaction）时保留 model 与 access program 配对**，防止服务端拒绝混合配对——与今日 401/compaction 问题直接相关
2. [#48238](https://github.com/openai/codex/pull/48238) — Windows 本地 MCP 服务器启动时使用 `CREATE_NO_WINDOW` 抑制控制台弹窗，改善 Windows 体验
3. [#48229](https://github.com/openai/codex/pull/48229) — 将 Responses 失败解析（含限流重试延迟）抽取为独立模块，为认证/错误处理重构铺路
4. [#48211](https://github.com/openai/codex/pull/48211) — 全屏 TUI 唤起外部编辑器时保持 Codex 界面可见，修复草稿和提示“消失”的体验问题
5. [#48176](https://github.com/openai/codex/pull/48176) — 沙箱可写根目录下默认保护 `.aws` 目录，防止凭证助手被篡改（安全加固）
6. [#48198](https://github.com/openai/codex/pull/48198) — 遵守执行环境的代理配置要求，修复受限命令在代理环境下离线的问题
7. [#48190](https://github.com/openai/codex/pull/48190) — 对 agent 消息板 SSE 帧在解析前施加大小限制，修复畸形帧无限累积的内存问题（健壮性）
8. [#48206](https://github.com/openai/codex/pull/48206) / [#48205](https://github.com/openai/codex/pull/48205) — 警告查看器 UX 双 PR：支持 `k` 键保留警告并跳下一个、关闭时清理已查看警告
9. [#48174](https://github.com/openai/codex/pull/48174) — 用量限额分析保留 `limit_window`，可区分 5 小时限额与周限额
10. [#48199](https://github.com/openai/codex/pull/48199) — 空预览的归档线程不再从线程列表中被过滤掉

---

## 5. 功能需求趋势

- **认证可靠性**：OAuth token 生命周期管理（过期/撤销后残留旧 token、重新登录不生效）是长期反复出现的主题，今日 401 事件进一步放大关注度
- **新模型与多云支持**：GPT-6 Sol/Luna、Amazon Bedrock、模型自动切换（见 #48242 中 GPT-6 Astra 自动回切）
- **Windows 体验**：性能卡顿（#20214）、日志膨胀（#35823）、控制台弹窗（PR #48238）等多点开花
- **国际化（RTL）**：阿拉伯语/希伯来语/波斯语完整 RTL 支持呼声持续
- **自动化工作流配置**：禁用/调整问题自动解析超时（#28969，210 👍）反映无人值守长任务场景需求强烈
- **浏览器/本地开发集成**：Browser Use 与 localhost 调试的兼容性

---

## 6. 开发者关注点

1. **认证链路脆弱**：今日 401 事件波及 CLI、Desktop、IDE 扩展全端，跨 macOS/Linux/Windows，用户排查手段有限；社区亟需更清晰的认证诊断工具（`codex doctor` 覆盖不足，见 #48231）
2. **错误提示不友好**：用户根本没配置 `sk-svcacct` key 却收到相关报错，错误信息与实际状态脱节，增加排障成本
3. **长会话稳定性**：压缩失败、websocket 断连重连（#24533）、会话恢复失败等问题在长任务场景反复出现
4. **资源占用**：Windows 端性能与磁盘占用（SQLite 不回收）是 Plus/Pro 用户的主要流失风险点
5. **可配置性需求**：自动解析超时、强制文本方向等“给用户开关”类请求 👍 数普遍偏高，说明社区希望对自动化行为有更多控制权

---
*本报告基于 GitHub 公开数据自动生成，仅反映社区动态，不构成官方声明。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-26

## 📌 今日速览

今日发布 v0.62.0-nightly 版本，社区修复热度集中在核心稳定性：认证死循环、文件并发竞态、交互模式 Enter 卡死等多个 P1 级修复同时推进。Subagent（子代理）生态成为 Issues 最活跃领域，其可靠性、可观测性与安全管理引发大量讨论。此外，Homebrew 弃用提示文档已合并，官方引导用户转向 npm 安装。

---

## 🚀 版本发布

**v0.62.0-nightly.20260925.gbedef96ef**（[Release](https://github.com/google-gemini/gemini-cli/releases)）
- 发布 v0.61.0-preview.1 与 v0.61.0 正式版 Changelog（#29469、#29472）
- 修复：区分 MCP enablement 配置缺失与格式错误的场景
- 另有 #29471 显示版本已 bump 至 0.63.0-nightly，迭代节奏紧凑

---

## 🔥 社区热点 Issues（Top 10）

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** Subagent 达到 MAX_TURNS 后误报 "success/GOAL"，掩盖真实中断 — P1，13 条评论，影响任务结果可信度，是子代理可观测性的核心痛点。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** Generalist agent 挂起，简单操作（建目录）也永久卡死 — P1，8 👍，用户实测等待 1 小时无响应，仅禁用子代理可绕过。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** 利用模型原生 bash 能力：零依赖 OS 沙箱 + 执行后意图路由 — P2 大型增强，9 条评论，方向性架构提案，涉及安全与 UX 平衡。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** AST 感知的文件读取/搜索/代码库映射 EPIC — 精准读取方法边界、降低 token 噪音，配套 #22746 建议 tilth/glyph 作为起点。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** 模型几乎不主动使用自定义 skills 和 sub-agents — 反映调度策略问题，即使有高相关 skill 也不触发。

6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)** Auto Memory 泄密风险：敏感内容进入模型上下文后才脱敏 — P2 安全问题，要求确定性前置脱敏并减少日志。

7. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** get-shit-done output hook 导致崩溃 — P1，输出用户摘要时稳定复现崩溃。

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** 工具数超 128 触发 400 错误 — 工具作用域管理需智能化，MCP 重度用户常见。

9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** Browser agent 在 Wayland 下失败 — P1，Linux 桌面新显示协议兼容性问题。

10. **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)** 模型在随机位置创建临时脚本 — 限制 shell 执行后副作用明显，工作区清理成本高。

> 另值得关注：Auto Memory 系列问题集中提交（#26516、#26522、#26523），显示该功能进入密集打磨期。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#29448](https://github.com/google-gemini/gemini-cli/pull/29448)** 修复 Windows/WSL/无头环境认证无限循环 — 解决与 Code Assist 扩展的文件竞争，keyring 不可用时自动回退加密文件存储（P1）。

2. **[#29499](https://github.com/google-gemini/gemini-cli/pull/29499)** 文件工具操作序列化 + 原子写入 — 修复并行 sub-agent 并发写同一文件的静默丢失更新问题（P1）。

3. **[#29476](https://github.com/google-gemini/gemini-cli/pull/29476)** 修复 IDE 集成终端下 Enter 确认无响应 — 解耦确认事件发布与 IO（P1）。

4. **[#29457](https://github.com/google-gemini/gemini-cli/pull/29457)** read-many-files 用 glob 匹配替换模糊 requestedExplicitly 逻辑 — 修复二进制资源误判导致上下文膨胀的关键 bug（P1）。

5. **[#29505](https://github.com/google-gemini/gemini-cli/pull/29505)** 支持 rootless Podman keep-id 沙箱 — 正确映射宿主 UID/GID，容器化用户福音（P1）。

6. **[#29463](https://github.com/google-gemini/gemini-cli/pull/29463)**（已合并）ACP 模式同分钟会话文件名冲突修复 — session/load 覆盖 checkpoint 状态导致会话查找失败（P1）。

7. **[#29437](https://github.com/google-gemini/gemini-cli/pull/29437)**（已合并）后台 shell 退出时清理临时目录 — 消除 `gemini-shell-*` 目录泄漏（P1）。

8. **[#29467](https://github.com/google-gemini/gemini-cli/pull/29467)**（已合并）移除非法 `diff.external` 覆盖 — 修复执行沙箱内 git diff 致命错误。

9. **[#29450](https://github.com/google-gemini/gemini-cli/pull/29450)** a2a-server 实现 V1→V2 配置迁移 — 保持 V1 扁平配置内存级向后兼容（P1）。

10. **[#28844](https://github.com/google-gemini/gemini-cli/pull/28844)**（已合并）Homebrew 弃用通知 — homebrew-core 中 gemini-cli 已弃用，文档引导新用户改用 npm。

> 依赖更新活跃：#29508 一次性 bump 76 个 npm 依赖；#28985 google-auth-library 升 11.x（P0）。

---

## 📈 功能需求趋势

1. **Subagent 体系成熟化**（最热门）：本地子代理 Sprint（#20195）、轨迹分享（#22598）、bug 报告上下文（#21763）、symlink 识别（#20079）、Browser agent 韧性（#22232）— 子代理从“能用”走向“可靠可观测”。
2. **Token 效率与精准上下文**：AST 感知工具（#22745/#22746）、"Tactful Extraction" 手术式读取（#19561）、持久化文件任务追踪替代 WriteToDo（#18836/#21000）。
3. **安全与沙箱**：OS 级零依赖沙箱（#19873）、破坏性命令防护（#22672）、Auto Memory 前置脱敏（#26525）。
4. **终端渲染体验**：resize 无闪烁高性能渲染（#21924）。
5. **安全护栏**：per-workspace 策略而非全局策略（#18397）。

---

## ⚠️ 开发者关注点

- **可靠性是当前最大痛点**：agent 挂起（#21409）、误报成功（#22323）、Enter 卡死、认证死循环 — “任务看起来完成但实际没做”严重损害信任。
- **并发正确性**：并行子代理文件竞态（#29499）反映多 agent 架构落地后的新 bug 类别。
- **上下文管理**：二进制误读导致 token 膨胀（#29457）、工具数超限 400（#24246）、模型不主动用 skill（#21968）。
- **环境兼容性**：Wayland（#21983）、WSL2 剪贴板（#27588）、rootless Podman（#29505）、无头环境认证 — 非标准环境支持需求持续。
- **安装渠道变化**：Homebrew 渠道弃用，建议尽快迁移至 npm。

---
*数据来源：github.com/google-gemini/gemini-cli | 统计窗口：过去 24 小时（50 Issues / 43 PRs 更新）*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-09-26

## 1. 今日速览

Copilot CLI 发布 **v1.0.89-4**，引入智能路由层级自动建议与切换后的快速反馈机制，并改进了插件的启用/禁用管理。社区方面，**技能（Skills）系统**成为焦点——`disable-model-invocation` 配置导致技能不可达的问题持续发酵（#4438、#4637、#4838），多个相关 Issue 在过去 24 小时内活跃更新。认证与稳定性问题（token 刷新失效、会话崩溃）仍是高频痛点。

## 2. 版本发布

### v1.0.89-4
- **Added**
  - 自动建议路由层级（routing tier），支持快捷键或点击切换
  - 从自动推荐切换到手动选择模型后，自动弹出快速反馈提示
- **Improved**
  - 直接安装的插件现支持启用/禁用；已记录为禁用的插件将停止加载

## 3. 社区热点 Issues

1. **#4438** — `disable-model-invocation: true` 导致技能完全不可达，而非“仅手动调用”（8 评论 / 11 👍）
   技能系统的核心语义 Bug：`copilot skill list` 可见但模型 `skill()` 工具报 `Skill not found`。与 #4637、#4838 共同构成技能解析问题的集群，社区关注度最高。
   https://github.com/github/copilot-cli/issues/4438

2. **#4929** — 进程级 auth token 停止刷新，所有 prompt 失败直至重启（6 评论）
   长时间运行会话的致命问题，`/login` 也无法恢复，严重影响稳定性。
   https://github.com/github/copilot-cli/issues/4929

3. **#2627** — 可配置系统提示词，削减固定 token 开销（5 评论 / 20 👍）
   系统提示词启动即消耗约 20,500 tokens（占 200K 窗口的 10%），是👍数最高的功能请求之一，反映社区对上下文经济性的强烈诉求。
   https://github.com/github/copilot-cli/issues/2627

4. **#232** — 请求 `--system-prompt` 参数（6 评论 / 11 👍）
   长期开放的经典功能请求，与 #2627 同属“系统提示词可定制化”方向，持续活跃。
   https://github.com/github/copilot-cli/issues/232

5. **#3534** — WSL2 (ARM64) 下 `/copy` 因 cmd.exe 引号问题失败（7 评论）
   Windows/WSL 平台兼容性代表问题，1.0.55 起持续未解，跨平台用户痛点。
   https://github.com/github/copilot-cli/issues/3534

6. **#4775** — Mission Control 仪表盘链接 404：`/copilot/tasks/<uuid>` 路径不存在（6 评论）
   会话本身存活但 URL 路径错误（实际位于 `/agents/tasks/`），暴露前后端路径不一致。
   https://github.com/github/copilot-cli/issues/4775

7. **#4905** — Desktop 应用会话数分钟后死亡："GitHub credential registration is no longer available"（5 评论 / 4 👍）
   桌面端捆绑 CLI（1.0.84-5）与 github-mcp-server 目录交互时的认证失效问题，影响面广。
   https://github.com/github/copilot-cli/issues/4905

8. **#4680** — CLI 向自定义 OpenAI 兼容端点发送错误 model ID，导致会话被杀（4 评论）
   配置 `mimo-v2.5` 却发送 `gpt-5.4-nano`，直接打击 BYO-model（自带模型）用户群的信任。
   https://github.com/github/copilot-cli/issues/4680

9. **#4946** — 后台 shell 完成通知后触发 HTTP 400 `content[].thinking`（2 评论）
   新 Bug，涉及后台任务通知与 thinking 内容块的时序冲突，可能影响推理模型的连续使用。
   https://github.com/github/copilot-cli/issues/4946

10. **#4082** — CLI 与 Desktop 应用间的跨应用会话同步（2 评论 / 9 👍）
    多端工作流诉求的代表，社区对会话可移植性的期望明确。
    https://github.com/github/copilot-cli/issues/4082

## 4. 重要 PR 进展

过去 24 小时内无 PR 更新（共 0 条），本节省略。

## 5. 功能需求趋势

- **系统提示词可定制化**：#232、#2627、#4440（支持读取 `.claude/rules`）——社区希望削减固定开销并统一多工具的指令文件，是👍最集中的方向。
- **技能（Skills）系统健壮性**：#4438、#4637、#4838——frontmatter 语义、headless 模式解析等问题的密集反馈，说明技能使用量快速增长。
- **自定义模型 / BYO endpoint**：#4680、#4960——OpenAI 兼容端点的 model ID 处理与企业托管模型选择问题，反映 BYO-model 需求上升。
- **多端会话互通**：#4082——CLI 与 Desktop 的会话同步诉求。
- **输入体验细节**：#2199（Ctrl+Backspace 删词）、#3138（编辑中切模型不丢草稿）——终端交互体验持续打磨。

## 6. 开发者关注点

- **长时间会话稳定性是最大痛点**：token 停止刷新（#4929）、Desktop 会话死亡（#4905）、MCP 重连通知刷屏（#4907）、空闲时 file-search 线程失控消耗 CPU/磁盘（#4710）——多个高热度 Issue 均指向“跑得越久越不可靠”。
- **认证链路脆弱**：进程内凭证失效后无法自恢复，`/login` 兜底失效，用户只能重启。
- **上下文窗口经济性**：固定系统开销占比过高（#2627）+ Compaction 丢失执行中任务上下文（#1571），长任务的上下文管理体验有待改善。
- **Windows/WSL 平台兼容性**：剪贴板（#3534）、渲染对齐（#3501）等问题长期存在，ARM64 支持滞后。
- **插件生态边界**：marketplace 单条目超 1024 字符即整体拒绝（#4969）、私有仓库凭证冲突（#4103），插件分发的容错与认证策略需要更宽松的设计。

---
*数据截至 2026-09-26，来源：github.com/github/copilot-cli*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-09-26

## 一、今日速览

今日无新版本发布，社区活跃度集中在 V2（2.0.x）稳定性问题上：subagent 后台任务完成通知丢失、事件序列冲突导致会话永久不可写、插件 API 能力缺失（token 用量、composer 访问）成为讨论焦点。PR 方面，一批 8 月的自动化清理 PR 集中关闭，同时新增了 codemode 安全加固、事件序列恢复等高质量修复。

---

## 二、版本发布

过去 24 小时无新 Release。

---

## 三、社区热点 Issues

1. **[#42094](https://github.com/anomalyco/opencode/issues/42094) TUI 在合成器缩放至 4 时触发 SIGILL 崩溃**（@dhh，8 评论）
   空闲 TUI 在显示缩放切换瞬间于 `drawTextBuffer` 处执行 `ud2` 中止，两次复现于不同版本且指令指针相同，是 TUI 渲染层的硬崩溃，复现精确度高，值得关注根因分析。

2. **[#51419](https://github.com/anomalyco/opencode/issues/51419) [needs:compliance] OpenAI 401：API key 错误**（@scrapelabs，5 评论 / 6 👍）
   发送提示词返回 401，疑似凭证路由错误。虽然被合规机器人标记，但 👍 数最高，说明受影响用户不少。

3. **[#34644](https://github.com/anomalyco/opencode/issues/34644) GitHub Copilot Student 计划认证后 provider 不可见**（@TavoMtz，5 评论 / 21 👍）
   OAuth 认证成功后 `github-copilot` provider 完全不出现，长期未解决（6 月底至今），21 👍 反映教育用户群体诉求强烈。

4. **[#48073](https://github.com/anomalyco/opencode/issues/48073) Gemini 因 MCP 工具 nullable array schema 全局 400**（@wenduof，5 评论）
   Gemini 预先校验所有 function declaration，一个不兼容的 MCP 工具 schema（`type: ["array","null"]`）会导致所有请求失败，属于 schema 转换层缺陷，对 MCP 生态兼容性影响大。

5. **[#50751](https://github.com/anomalyco/opencode/issues/50751) 后台 subagent 完成后父会话收不到通知**（@fdematos，4 评论）
   报告已持久化、UI 可见，但编排 agent 无限等待，需人工干预。直接影响 agent 编排可靠性。

6. **[#48826](https://github.com/anomalyco/opencode/issues/48826) V2 subagent 后台任务未完成即被标记 completed**（@Ploppy3，4 评论）
   与 #50751 构成 subagent 生命周期管理的对称缺陷（早报完成 vs 不报完成），是 V2 编排核心痛点。

7. **[#49847](https://github.com/anomalyco/opencode/issues/49847) ChatGPT OAuth 请求误用 Zen API key**（@jhsu，4 评论）
   OpenAI provider 被错误绑定到 Zen 集成，OAuth-only 端点拒绝 API key，凭证路由类 bug 的又一例。

8. **[#51411](https://github.com/anomalyco/opencode/issues/51411) 过期事件序列永久拒绝新会话事件**（@d4n-sec，2 评论）
   `event_sequence.seq` 落后时与唯一索引冲突，聚合根永久不可写。数据一致性问题，已有对应修复 PR（#51413）。

9. **[#51265](https://github.com/anomalyco/opencode/issues/51265)（已关闭）V2 插件 API 无法读取 token 用量**（@famewolf，2 评论）
   DCP 式上下文裁剪插件在 2.0.x 完全失效，代表 V2 插件生态的能力断层，关闭后值得观察是否以其他方式解决。

10. **[#41206](https://github.com/anomalyco/opencode/issues/41206) OpenCode Go 配额与使用历史不符**（@diqdrax，6 评论）
    计费/配额展示不一致，涉及商业化信任问题，多位用户跟进。

---

## 四、重要 PR 进展

1. **[#51407](https://github.com/anomalyco/opencode/pull/51407) codemode 安全加固**（OPEN）
   限定替换字符串、参数数量、内建递归深度、thenable 链与拒绝诊断，修复多项无界分配导致的挂死，是递归/分配审计系列的首个 PR。

2. **[#51413](https://github.com/anomalyco/opencode/pull/51413) 修复过期事件序列**（OPEN，修 #51411）
   分配本地序列前取存储游标与最新持久化序列的较大值，防止唯一索引冲突。

3. **[#51409](https://github.com/anomalyco/opencode/pull/51409)（已合并关闭）解码压缩检查点中的旧版媒体**（@kitlangton）
   修复含媒体的 2.0.15 前压缩会话升级后 `Session.MessageDecodeError` 加载失败，升级用户直接受益。

4. **[#51417](https://github.com/anomalyco/opencode/pull/51417) 折叠推理块遵循 thinkingOpacity**（OPEN）
   修复折叠状态下 reasoning 标题忽略主题透明度设置，关闭 #51134。

5. **[#51418](https://github.com/anomalyco/opencode/pull/51418) 对齐分组工具行与头部**（OPEN）
   移除 12px 内嵌缩进并附 840px 回归测试，TUI 细节打磨。

6. **[#51412](https://github.com/anomalyco/opencode/pull/51412) / [#51414](https://github.com/anomalyco/opencode/pull/51414)（均已关闭）统一浏览器打开逻辑**（@rekram1-node）
   将 15 处分散的 `open` 调用收敛到共享模块，典型的健康重构。

7. **[#45008](https://github.com/anomalyco/opencode/pull/45008)（已关闭）动态路由 provider 追踪实际响应模型 ID**
   Firerouter/OpenRouter auto/LiteLLM 场景下记录真实服务模型，关闭 #38543，对用量统计与调试有价值。

8. **[#45025](https://github.com/anomalyco/opencode/pull/45025)（已关闭）拒绝超限 Bedrock event-stream 帧**
   拒绝超过 AWS 16 MiB 限制的帧声明长度，防御性解析加固。

9. **[#45037](https://github.com/anomalyco/opencode/pull/45037)（已关闭）桌面端会话消息搜索**
   Cmd/Ctrl+F 复用 find controller，关闭长期需求 #19143。

10. **[#45024](https://github.com/anomalyco/opencode/pull/45024)（已关闭）防护 tool-stream 中的 Object.prototype 键**
    处理 provider 返回的 `toString`/`constructor` 等原型链键名，健壮性修复。

> 注：多个标注 `[automated-pr-cleanup]` 的 PR 于今日集中关闭，为 8 月下旬积压贡献的批量处置。

---

## 五、功能需求趋势

- **V2 插件 API 补全**：composer 访问（#51209）、token 用量读取（#51265）反映 V1→V2 迁移中插件生态能力缺失是当前最大呼声。
- **Subagent/编排可观测性**：实时 subagent 侧边栏（#41249，已有社区插件）、完成通知、后台任务生命周期，多 issue 聚集。
- **TUI 外观定制**：透明度设置（#51353）、thinkingOpacity、shell 命令自定义状态栏（#37464，11 👍）。
- **Provider/凭证可靠性**：Copilot Student（#34644）、Zen key 误路由（#49847）、配额统计（#41206）。
- **平台兼容性**：Windows ARM64 安装器（#33732、#49059）、桌面 sidecar OOM（#47553）。

---

## 六、开发者关注点

1. **V2 稳定性是主战场**：事件存储序列冲突、旧版会话回填遗漏（#51404）、agent variant 不生效（#51326）等多处 V2 回归并存，升级路径需谨慎。
2. **Subagent 可靠性系统性短板**：早完成、不通知、本地模型收不到工具定义（#51268），编排场景尚不成熟。
3. **凭证/网关路由脆弱**：OpenAI/Zen 绑定混乱、Zen Go 503（#51306）、DeepSeek 网关 400（#51391），多租户网关问题频发。
4. **桌面端资源问题**：sidecar 内存泄漏至 3GB+ OOM 长期未解，Windows ARM64 安装完全不可用。
5. **长时间任务被误杀**：60 分钟空闲 Location 驱逐会中断运行中会话（#51343），Web UI 用户尤需注意。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-09-26

## 1. 今日速览

Qwen Code 发布 v0.24.5 nightly 版本，引入 Java SDK Hosted Harness 私有客户端，Managed Agent 双路径架构持续推进（#12380 讨论热度最高）。今日打包问题集中爆发：**vendored ripgrep 丢失执行位**（#12668、#12679）影响自更新与全新安装，建议 Windows 用户暂缓 `/update` 操作。Web Shell/Desktop 的会话管理与多 Agent 协调仍是社区最活跃的讨论方向。

## 2. 版本发布

**v0.24.5-nightly.20260925.c3a4058a0c**
- feat(sdk-java): 新增 Hosted Harness 私有客户端（PR #12654，@doudouOUC）
- test(java): 固定 runtime-broker guard 测试

> ⚠️ 注意：本 nightly 版本疑似携带 ripgrep 执行位丢失问题（见下文 #12668 / #12679）。

## 3. 社区热点 Issues

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#12380](https://github.com/QwenLM/qwen-code/issues/12380) Managed Agent 双路径架构提案（21 评论） | 核心维护者 @doudouOUC 提出 TS agent loop 保留 + 模型推理与工具环境解耦的分阶段交付架构，涉及 Session 持久化所有权、Workspace 绑定、可恢复工具执行，是平台化演进的顶层设计讨论 |
| 2 | [#11303](https://github.com/QwenLM/qwen-code/issues/11303) Windows ConPTY 进程泄漏（P1, 17 评论） | VS Code Companion 12 小时泄漏 347 个 conhost.exe 进程 / 2.8 GB 内存，已 ready-for-human，影响面大 |
| 3 | [#472](https://github.com/QwenLM/qwen-code/issues/472) is_background 参数校验问题（14 评论） | 老问题（2025-08 提出）持续发酵，MCP 参数校验强制 boolean 导致使用受阻 |
| 4 | [#11872](https://github.com/QwenLM/qwen-code/issues/11872) Web Terminal PTY 不可用（已关闭，14 评论） | @lydell/node-pty 未打包 + macOS 签名阻止 prebuilds，已修复关闭，可作排障参考 |
| 5 | [#12416](https://github.com/QwenLM/qwen-code/issues/12416) Remote-SSH 会话创建失败（P1, 12 评论） | Companion 0.24.2 下所有 `POST /session` 报 EPIPE/BridgeChannelClosedError，而独立 CLI 正常，Remote 用户被阻断 |
| 6 | [#8586](https://github.com/QwenLM/qwen-code/issues/8586) 后台 Agent 恢复与 activeWork 追踪（10 评论） | 后台 Agent 超越前台提示后失去进展时的恢复路径设计，daemon 健康体系关键一环 |
| 7 | [#12668](https://github.com/QwenLM/qwen-code/issues/12668) + [#12679](https://github.com/QwenLM/qwen-code/issues/12679) ripgrep 执行位丢失（P1，均已处理/关闭前者） | **今日最紧急**：自更新和全新安装均出现 ripgrep `EACCES`，npm 打包机制性缺陷，修复后需发新版 |
| 8 | [#8097](https://github.com/QwenLM/qwen-code/issues/8097) 后台 Agent 协调缺陷（9 评论） | 多后台 Explore 子 Agent 并发时父 Agent 重复工作、提前完成、send_message 不可交互，多 Agent 体系的核心协调问题 |
| 9 | [#12683](https://github.com/QwenLM/qwen-code/issues/12683) PreToolUse hook 竞态（P1，已关闭） | **安全相关**：多个 hook 并存时“最后完成者获胜”，deny 可被 allow 静默覆盖 |
| 10 | [#12589](https://github.com/QwenLM/qwen-code/issues/12589) System One 决策门（6 评论） | 用小型本地分类模型（Von）分流简单请求以降低延迟，配套 PR #12590 已提交，性能方向的创新提案 |

## 4. 重要 PR 进展

| # | PR | 内容 |
|---|-----|------|
| 1 | [#12358](https://github.com/QwenLM/qwen-code/pull/12358) Managed Agent 独立栈 | @doudouOUC 端到端预览：常驻 Harness → Java 控制面 → Session 级 Tool Runtime，含独立 Spring Broker |
| 2 | [#12718](https://github.com/QwenLM/qwen-code/pull/12718) 修复 CI 红灯 | 容忍 win32 目录 fsync 拒绝 + macOS 测试夹具 bug，解决 Windows 145 / macOS 2 个 nightly 失败 |
| 3 | [#12590](https://github.com/QwenLM/qwen-code/pull/12590) System One 决策门 | 对应 #12589，默认关闭、fail-open，本地小模型单次前向分类用户请求 |
| 4 | [#12561](https://github.com/QwenLM/qwen-code/pull/12561) MemoryChanged hook | 托管记忆增删改及开关时通知集成方，完善 hooks 事件生态 |
| 5 | [#12183](https://github.com/QwenLM/qwen-code/pull/12183) 部署托管扩展目录 | `--managed-extensions <root>` 支持企业部署方集中管理扩展 |
| 6 | [#11799](https://github.com/QwenLM/qwen-code/pull/11799) 远程 Computer Use 中继 | 无头 Linux 服务器会话可借用 Mac 桌面的 node_repl/CUA 驱动，跨设备能力亮点 |
| 7 | [#10949](https://github.com/QwenLM/qwen-code/pull/10949) + [#10954](https://github.com/QwenLM/qwen-code/pull/10954) 后台会话 CLI 管理 | `qwen sessions peek/answer/stop` + `GET /background-agents` API，后台 Agent 可观测性体系 |
| 8 | [#12461](https://github.com/QwenLM/qwen-code/pull/12461) 前台子 Agent 并发上限 | per-model 并发 cap 扩展至前台子 Agent，防止资源失控 |
| 9 | [#12705](https://github.com/QwenLM/qwen-code/pull/12705) web_fetch 回退修复 | EHOSTUNREACH/ENETUNREACH 纳入连接级错误白名单，修复 https 升级回退遗漏（配套 #12720 深层重构） |
| 10 | [#12559](https://github.com/QwenLM/qwen-code/pull/12559) OpenTUI 弹窗几何对齐 | 渲染器迁移期 UI 兼容性收尾，修复 picker 溢出和补全截断 |

## 5. 功能需求趋势

1. **Managed Agent / 平台化**：#12380、#12358、#8586、#10943-10954 系列，会话持久化 + 后台 Agent 生命周期管理是当前最重的投入方向
2. **多 Agent 协作**：Agent Team 阵列展示（#11069）、后台子 Agent 协调（#8097）、并发上限（#12461）
3. **性能与延迟**：System One 决策门（#12589/#12590）、ToolSearch prefill 重复处理（#10603）
4. **企业/代理环境**：Batch API 绕过 pinned dispatcher（#12169）、部署托管扩展（#12183）、数据隐私文档
5. **IDE 与多端集成**：Zed ACP AskUserQuestion（#11361）、VS Code Companion 多项 bug、移动端麦克风授权（#12127）
6. **Web Shell / Desktop**：会话删除、Live Voice 新任务（#12619/#12620，已修复关闭）

## 6. 开发者关注点

- **打包与安装可靠性**：今日最集中痛点——ripgrep 执行位（#12668/#12679）、Windows `/update` 路径错误（#12687）；0.24.5 的 npm 分发链路存在系统性问题
- **Windows 平台质量**：ConPTY 泄漏（#11303）、目录同步拒绝（#12718）、nightly CI 大量失败（#12714），Windows 是当前质量短板
- **代理/TLS 拦截环境**：Batch API 上传直连全局 fetch 绕过 dispatcher（#12169），企业用户反复反馈
- **Hook 安全语义**：PreToolUse 多 hook 竞态导致 deny 被覆盖（#12683），权限模型需要聚合决策而非竞速
- **代码健康度**：社区提交了大量高质量重构建议（#12721 收敛四处手抄的 subagent 工具声明策略、#12704 文档 runbook 对账），维护团队采用 follow-up issue 管理审查遗留项的流程值得关注

---
*数据截至 2026-09-26，来源：QwenLM/qwen-code 公开仓库动态。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*