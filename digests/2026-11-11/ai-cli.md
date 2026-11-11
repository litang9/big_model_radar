# AI CLI 工具社区动态日报 2026-11-11

> 生成时间: 2026-11-11 00:38 UTC | 覆盖工具: 7 个

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
**数据日期：2026-11-11**

---

## 一、生态全景

AI CLI 工具已从单纯的命令行编码助手演化为覆盖远程控制、多代理编排、多渠道触达（IM/Web）、企业管控的完整开发平台。各工具在快速迭代（单日均有 Release 发布）的同时，社区反馈的重心正从“功能有无”转向**可靠性、安全审计与信任问题**——虚假成功上报、权限审批失效、数据丢失、计费误判等成为高频议题。Windows 平台体验和 MCP 生态成熟度是全行业的共性短板。此外，子代理（Subagent）架构与 token 效率优化（AST 感知工具链）是当前最活跃的架构演进方向。

---

## 二、各工具活跃度对比

| 工具 | 热点 Issues（近24h） | PR 活动 | Release | 核心焦点 |
|---|---|---|---|---|
| **Claude Code** | 10 条热点（含 18 评论级） | 仅 1 条（关闭） | v2.1.322 | Remote Control 400、MCP OAuth 竞态 |
| **OpenAI Codex** | 10 条热点（最高 74 评论/85👍） | 10+ 条合入 | v0.167.1 稳定 + v0.169.0-alpha.9 | Windows 扩展崩溃、项目丢失 |
| **Gemini CLI** | 50 条 Issues / 23 条 PRs | 11+ 条（含 P0 修复） | v0.68.0 + v0.69.0-preview | Subagent 可信度、AST 工具链 |
| **Copilot CLI** | 34 条更新（过半 MCP） | 1 条 | v1.0.110-1 / -0 | MCP 兼容性、Windows 回归 |
| **OpenCode** | 10 条热点 | 10+ 条核心 PR | v2.2.7 | 子代理后台化、Windows pipe mode |
| **Qwen Code** | 10 条热点（#14724 达 292 评论） | 12+ 条 | v0.27.2 + SDK 0.1.32 | Web Shell 渠道、安全审计 |
| **Kimi Code CLI** | 0 | 0 | 无 | 静默期 |

**观察**：Gemini CLI 的原始活动量最大；Qwen Code 单 issue 讨论深度最高（292 评论）；Codex 的用户情绪烈度最强（数据丢失恐慌）；Claude Code 和 Copilot CLI 的 PR 侧明显收敛，处于维护节奏。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **Windows 平台稳定性** | Claude Code、Codex、Copilot CLI、OpenCode | 黑窗闪烁（Claude/OpenCode 的 git.exe 弹窗）、扩展 UI 崩溃（Codex #56655）、父进程被杀（Copilot #5404）、NumLock 回归。OpenCode 的 pipe mode（PR #63196）是首个架构级方案 |
| **子代理可靠性与控制权** | Gemini、OpenCode、Qwen、Claude Code | 虚假 success 上报（Gemini #22323）、无视 STOP 指令（OpenCode #63216）、Plan 模式失效（OpenCode #60250）、长会话指令漂移（Claude #108601） |
| **MCP 生态兼容性** | Claude Code、Copilot CLI、Codex、OpenCode | OAuth 刷新竞态（Claude #108871/#108794）、elicitation 静默拒绝（Claude #105334）、legacy initialize 兼容（Copilot #4888）、readOnlyHint 审批摩擦（Codex PR #60638） |
| **远程/多设备协同** | Claude Code、Codex、Copilot CLI、OpenCode | Remote Control 注册失败与重启失联（Claude）、Android 配对失败（Codex #56600）、cloud 会话恢复错误（Codex #59855）、远程策略拦截（Copilot #5283） |
| **用量/计费透明度** | Claude、Codex、Copilot、OpenCode | 会话成本快照（Claude #108488）、额度指示（Codex #25561）、失败请求扣费（Copilot #5408）、限额误报（OpenCode #62529/#51424） |
| **安全审计与凭证保护** | Qwen、Codex、Copilot、Gemini | 输入重定向绕过分类器（Qwen #16856，P1）、shell 快照明文落盘密钥（Codex #30971）、token 掩码失效（Copilot #5388）、危险命令识别（Gemini PR #30171） |
| **Token 效率/上下文管理** | Gemini、Qwen | AST 感知读取（Gemini #22745 EPIC）、surgical reads（#19561）、子代理 105k 上下文膨胀（Qwen #15660） |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 深度 Agentic 编码 + Remote Control + 桌面端 | 专业开发者、重度 Claude 生态用户 | 闭源服务端驱动（fast mode/Vertex），桌面 Code tab 与 CLI 双轨但版本不同步 |
| **OpenAI Codex** | 全平台桌面应用 + 云会话 + 沙箱 | ChatGPT 订阅用户、跨设备工作者 | Rust 重写（rust-v0.x），重沙箱与权限模型，Workspace/云编排 |
| **Gemini CLI** | Subagent 体系 + 开放工具链 | 开发者/贡献者社区（开源最彻底） | TS 开源，AST/tree-sitter 深度集成，社区驱动演进 |
| **Copilot CLI** | 企业集成 + MCP 深度合规 | GitHub/GHE 企业用户、Windows 内网环境 | 深绑 GitHub 账号体系与 Entra 认证，多模型路由（含 Claude Fable） |
| **OpenCode** | 多 provider 聚合 + 桌面端工作流 | 追求模型自由度的 power user | Bun 运行时，provider 中立（Copilot Auto/LM Studio/DeepSeek/Kimi） |
| **Qwen Code** | Web Shell 渠道 + 中国 IM 生态 | 国内开发者、微信/QQ/钉钉用户群 | 分支自 Gemini CLI 的 TS 架构，Managed Agent + 渠道账本体系，强社区治理 |

**关键差异**：Qwen Code 在 IM 渠道触达上独树一帜（微信/QQ/钉钉/邮箱）；OpenCode 是唯一真正 provider 中立的聚合层；Gemini 和 Qwen 走开源社区路线，Claude/Codex/Copilot 以闭源服务端为主。

---

## 五、社区热度与成熟度

- **最活跃**：Gemini CLI（50 Issues/23 PRs/24h）和 Qwen Code（292 评论级深度讨论、CI Failure Patrol 自治机制）——开源社区治理最成熟
- **用户压力最大**：OpenAI Codex——74 评论/85👍 的扩展崩溃和 51 评论的项目丢失，Windows 用户信任受损严重
- **稳定维护期**：Claude Code、Copilot CLI——issue 反馈为主、PR 活动少，产品成熟但长尾 bug（>5min API 超时、NumLock）修复缓慢
- **快速迭代期**：OpenCode——核心开发者高频架构重构（subagent 后台化），但曾发生升级丢数据事故，成熟度风险较高
- **观察名单**：Kimi Code CLI——连续静默，处于低活跃或内部研发状态

---

## 六、值得关注的趋势信号

1. **“信任”成为新的竞争维度**：虚假成功上报（Gemini）、无视 STOP（OpenCode）、服务端注入 "games" 指令（Claude）说明 agent 自主性提升后，可验证性与控制权是生产采用的前提。选型时应考察工具的审批链路与失败上报准确性。

2. **Shell 安全判定走向 AST 化**：Qwen 的 tree-sitter-bash 绕过漏洞（#16856）和“手写解析器十五轮补洞”教训表明，基于正则/手写规则的权限审计已到极限，AST 归因将是标配。

3. **Windows 是全行业质量洼地**：六大工具中四个有 Windows 专项 bug 簇。OpenCode 的 process-daemon pipe mode 若验证有效，可能成为行业参考实现。Windows 重度用户暂应对升级保持谨慎。

4. **凭证与计费信任危机抬头**：明文密钥落盘（Codex）、token 掩码失效（Copilot）、失败请求扣费、限额误报（多家）——企业采购前应评估凭证隔离与计费争议机制。

5. **多代理 + 后台化是下一代架构共识**：OpenCode 的 subagent 后台运行、Qwen 的统一 Agent Loop、Gemini 的 Subagent EPIC 指向同一方向；但 Gemini/Qwen 的实践也暴露了上下文膨胀（子代理开局 105k tokens）和调度意愿不足的现实瓶颈。

6. **上下文经济学驱动工具创新**：Gemini 的 AST 感知读取 EPIC 和“外科手术式读取”（基线 36.6k tokens/turn）预示 token 成本优化将从模型层转向工具链层，这对长会话、大代码库场景的 TCO 影响显著。

7. **渠道触达泛化**：Qwen 的微信/QQ/钉钉集成代表了 AI 编码代理从终端走向 IM 的探索，值得关注其是否打开非开发者用户市场。

**给开发者的建议**：生产环境优先验证工具在目标 OS、多会话并发、凭证管理三个场景的表现；对 subagent 编排保持关注但暂不作为核心依赖；企业环境重点审查各工具的安全审计链路与合规特性。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据来源：github.com/anthropics/skills | 截止 2026-11-11**

---

## 一、热门 Skills 排行（按社区关注度与活跃度综合排序）

*注：本期 PR 评论数据缺失，排名基于 Issue 关联度、更新活跃度与影响力综合评估。*

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **skill-creator 评估体系修复**（[#1298](https://github.com/anthropics/skills/pull/1298)） | 修复触发评估的误报/漏报（Windows select() 失败、worker 竞争）。与热门 Issues [#556](https://github.com/anthropics/skills/issues/556)（触发率 0%）和 [#1352](https://github.com/anthropics/skills/issues/1352)（并行 worker UUID 串扰）直接呼应，是社区抱怨最集中的痛点 | OPEN |
| 2 | **mcp-builder 兼容性修复**（[#1742](https://github.com/anthropics/skills/pull/1742)） | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 header 机制，关联长期挂起的 Issue #1668 | OPEN |
| 3 | **notion-spec-to-implementation + quantitative-resume-auditor**（[#1245](https://github.com/anthropics/skills/pull/1245)） | 将 Notion 产品/技术规格拆解为可执行任务。跨领域组合型 Skill 的代表，长期未合并但持续更新（10 月仍有活动） | OPEN |
| 4 | **md2video-audio**（[#1703](https://github.com/anthropics/skills/pull/1703)） | Markdown → MP4 视频 + 真人感配音，零成本方案（Marp + TTS），内容创作方向呼声较高的新 Skill | OPEN |
| 5 | **pyxel 复古游戏开发**（[#525](https://github.com/anthropics/skills/pull/525)） | Pyxel 像素游戏创建/调试/无头验证。由框架作者本人提交，挂起 8 个月仍活跃，是“长尾待合并”典型案例 | OPEN |
| 6 | **webapp-testing 安全加固**（[#1980](https://github.com/anthropics/skills/pull/1980)） | 消除 `shell=True` 的命令注入风险（CWE-78），与同期 [#1976](https://github.com/anthropics/skills/pull/1976) 元素识别修复一起，是贡献者 @gerardrecinto 批量质量修复的代表 | OPEN |
| 7 | **document-typography**（[#514](https://github.com/anthropics/skills/pull/514)） | 解决 AI 生成文档的孤行、寡行、编号错位等排版问题——“用户不会主动要求但都需要”的细节体验类 Skill | OPEN |
| 8 | **scnet-hpc**（[#1615](https://github.com/anthropics/skills/pull/1615)） | SSH + Slurm 的 HPC 集群操作 Skill，代表科研计算/基础设施方向的社区诉求 | OPEN |

---

## 二、社区需求趋势（来自 Issues）

1. **安全与信任边界**（最热，46 评论）：[#492](https://github.com/anthropics/skills/issues/492) 指出社区 Skill 冒用 `anthropic/` 命名空间，用户可能向伪官方 Skill 授予高权限——**Skills 生态的信任机制是第一诉求**。
2. **组织级分发与协作**：[#228](https://github.com/anthropics/skills/issues/228)（17 评论）要求 Claude.ai 内组织内 Skill 共享库，替代目前的 Slack 手动传文件。
3. **Skill 触发可靠性/评估工具链**：[#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352) 反映评估脚本系统性产生假阴性，直接影响 Skill 质量优化闭环。
4. **上下文效率**：[#1487](https://github.com/anthropics/skills/issues/1487) 抱怨 claude-api skill 单次注入 ~156k token 耗尽上下文——Skill 渐进式加载需求强烈。
5. **Agent 记忆与治理**：[#1329](https://github.com/anthropics/skills/issues/1329)（compact-memory 紧凑记忆符号）、[#1385](https://github.com/anthropics/skills/issues/1385)（推理质量门禁管线）、[#412](https://github.com/anthropics/skills/issues/412)（agent-governance，已关闭）。
6. **官方文档类 Skill 的易用性**：[#202](https://github.com/anthropics/skills/issues/202)（skill-creator 冗长低效）、[#2064](https://github.com/anthropics/skills/issues/2064)（description 缺触发时机说明）。

---

## 三、高潜力待合并 Skills（活跃 OPEN PR）

- **[#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder 修复**——修复明确关联 Issue，mcp 2.x 迁移刚需，落地概率高。
- **[#1298](https://github.com/anthropics/skills/pull/1298) skill-creator 评估修复**——对应两个高赞 Issue（#556/#1352），合并动机最强。
- **[#2019](https://github.com/anthropics/skills/pull/2019) xlsx 外部链接误报修复**——修复 #2013，11 月初仍在更新，处于活跃 review。
- **[#1950](https://github.com/anthropics/skills/pull/1950) claude-api pause_turn 文档更新**——11 月 10 日刚更新，对应 Python SDK 1.1.0 行为变化。
- **[#1792](https://github.com/anthropics/skills/pull/1792) docx 超时误报修复**——错误处理+输出验证双重改进，配套 Issue #2018（merge_runs XML 损坏）同区域问题集中，官方有合并动力。
- **[#525](https://github.com/anthropics/skills/pull/525) pyxel**——作者权威性高（框架原作者），持续维护 8 个月。

---

## 四、生态洞察（一句话总结）

**社区最集中的诉求不是“更多新 Skill”，而是“可信与可靠”——即解决命名空间信任边界、Skill 触发评估准确性、以及上下文/token 效率这三大基础性问题，其次才是组织内分发能力和 agent 记忆/治理类新方向。**

---

*备注：本周期 PR 数据缺失评论数与合并状态字段，分析以关联 Issue 热度（如 #492 46 评论、#556 13 评论）和 PR 更新时间线作为代理指标，结论可能存在偏差。*

---

# Claude Code 社区动态日报（2026-11-11）

## 📌 今日速览

今日发布 **v2.1.322**，主要变更是为 Vertex 平台（global/us/eu 区域）新增 fast mode，并在 Vertex 拒绝时自动回退到标准速度。社区热点集中在 **Remote Control 400 注册失败**（多用户复现）、**服务端下发的 "games" 指令干扰专业开发工作**，以及 MCP 认证/OAuth 刷新相关的一系列问题。

---

## 🚀 版本发布

**v2.1.322**
- 在 Vertex 的 global、us、eu 区域新增 **fast mode**，若 Vertex 拒绝则自动回退到标准速度
- [Release 链接](https://github.com/anthropics/claude-code/releases)

---

## 🔥 社区热点 Issues

1. **#100377 · Remote Control 项目线程注册失败（CCR v2 worker 400 错误）** · 18 评论
   自 10 月初起，从 claude.ai Project 发送到本机的远程会话全部启动失败，而自启动会话正常。已有大量用户复现，是当前讨论最多的 bug。
   https://github.com/anthropics/claude-code/issues/100377

2. **#106167 · 服务端 "games" 指令干扰专业开发** · 16 评论 / 👍10
   用户报告服务端下发的 "games" 指令块影响正常开发工作流，引发关于服务端注入指令不可控的讨论。
   https://github.com/anthropics/claude-code/issues/106167

3. **#107232 · API 请求超过 5 分钟仍会失败** · 14 评论
   Linux 上的老问题：长时间 API 请求处理依旧未修复，影响大上下文任务。
   https://github.com/anthropics/claude-code/issues/107232

4. **#102952 · 请求恢复桌面端首页的发光代码纹波背景** · 12 评论 / 👍18
   10 月中旬 UI 更新移除了标志性动画背景，社区强烈呼吁恢复。今日点赞最高的 issue。
   https://github.com/anthropics/claude-code/issues/102952

5. **#105334 · 桌面端 MCP elicitation 请求被静默拒绝** · 6 评论 / 👍7
   桌面 Code tab 声称支持 elicitation 却不弹窗直接拒绝，CLI 行为正常，影响 MCP 交互式服务器。
   https://github.com/anthropics/claude-code/issues/105334

6. **#108601 · 长会话编排者反复违背明确书面指令** · 5 评论
   跨 Opus 5.5 / Fable 5.1、跨 compaction 的指令遵循失效报告，由会话本身撰写，视角独特，对 agent 可靠性有参考价值。
   https://github.com/anthropics/claude-code/issues/108601

7. **#108217 · Windows Alt+V 粘贴图片冻结 TUI 约 12 秒** · 5 评论
   事件循环被阻塞导致整个界面卡死，Windows 用户体验痛点。
   https://github.com/anthropics/claude-code/issues/108217

8. **#108871 · 双会话竞争 OAuth 刷新导致“会话过期”** · 1 评论
   同一登录下两个交互式会话竞态刷新 token，输家误报过期，凭据实际有效。
   https://github.com/anthropics/claude-code/issues/108871

9. **#108794 · MCP refresh token 轮换被撤销，被迫 2-3 天重登一次** · 1 评论
   多会话共享同一 MCP 登录时 token 被错误撤销，影响 Gmail 等远程 MCP 服务的日常使用。
   https://github.com/anthropics/claude-code/issues/108794

10. **#108529 · Remote Control 服务器在主机重启后无响应** · 1 评论 / 👍1
    systemd 服务重启后既有会话收不到回复，影响 Remote Control 作为常驻服务的可靠性。
    https://github.com/anthropics/claude-code/issues/108529

---

## 🔀 重要 PR 进展

过去 24 小时仅 1 条 PR 更新：

- **#74722 · /commit-push-pr 支持 Conventional Branch 命名**（已关闭）
  为 `/commit-push-pr` 新增可选 `conventional` 参数，按 Conventional Branch 1.0.0 规范（`<type>/<description>`）从 diff 推断分支类型命名。
  https://github.com/anthropics/claude-code/pull/74722

> 今日 PR 活动较少，社区精力主要集中在 issue 反馈上。

---

## 📈 功能需求趋势

- **Remote Control 稳定性**：注册失败、重启失联等多个高热度 issue，远程工作流成为核心关切
- **MCP 生态成熟度**：elicitation、structuredContent、OAuth 认证/刷新是问题高发区
- **会话用量透明度**：#108488 及多条已关闭 issue 反复要求显示单会话时长/token/成本快照
- **桌面端 UI 定制**：恢复标志性视觉元素、面板快捷键、侧栏分组稳定性
- **模型行为可控性**：服务端注入指令、长会话指令遵循、Ultracode 成本失控等信任类问题

---

## ⚠️ 开发者关注点

1. **Windows 体验仍是重灾区**：每次 prompt 弹出 3-5 个 git.exe 控制台窗口（#99851）、图片粘贴冻结 TUI、computer use 干扰其他应用窗口（#108926）
2. **认证竞态问题**：OAuth 刷新竞态、MCP token 轮换失效，多会话场景下认证可靠性不足
3. **长任务可靠性**：>5 分钟 API 请求失败、长会话指令漂移，影响生产级使用
4. **平台差异**：多个 bug 仅在桌面 Code tab 出现而 CLI 正常，桌面端打包版本常滞后于 CLI 版本

**建议**：使用 Vertex 的用户可升级至 v2.1.322 体验 fast mode；重度 Remote Control 和 MCP OAuth 用户建议关注相关 issue 进展，暂有多会话并行认证需求的开发者需注意规避竞态场景。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-11 | 数据来源：github.com/openai/codex**

---

## 一、今日速览

今日 Codex 发布 **rust-v0.167.1** 稳定版与 **0.169.0-alpha.9** 预发布版。社区焦点集中在 **Windows 平台的稳定性问题**（桌面应用更新后项目丢失、沙箱初始化失败、VS Code 扩展无法启动）以及 **GPT-6.1 Sol 模型从模型选择器中消失** 的问题。PR 方面，开发团队集中合入了大量 TUI 界面优化、沙箱改进和 MCP 工具链增强的改动。

---

## 二、版本发布

| 版本 | 类型 | 说明 |
|------|------|------|
| [rust-v0.167.1](https://github.com/openai/codex/releases/tag/rust-v0.167.1) | 稳定版 | 常规迭代更新（[对比 0.167.0](https://github.com/openai/codex/compare/rust-v0.167.0...rust-v0.167.1)） |
| [rust-v0.169.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.169.0-alpha.9) | 预发布版 | 0.169.0 线持续迭代 |

---

## 三、社区热点 Issues

1. **VS Code 扩展 UI 无法启动（#56655）** — 74 条评论 / 85 👍，本周热度第一。Windows 上升级扩展到 26.51021.22027 后 UI 完全无法初始化，影响面广，与 #56682（隔离 Profile 下同样失败）相互印证，是当前扩展端最严重的回归。
   https://github.com/openai/codex/issues/56655

2. **Windows 更新后本地项目丢失（#59895）** — 51 条评论。桌面应用更新并切回个人账户后所有本地项目消失，涉及数据安全，用户恐慌情绪明显。
   https://github.com/openai/codex/issues/59895

3. **macOS 快捷键 Option+Space Quick Chat 被移除（#31925）** — 50 👍。ChatGPT/Codex 应用整合后丢失高频快捷入口，长期未解决，老用户持续表达不满。
   https://github.com/openai/codex/issues/31925

4. **GPT-6.1 Sol 从模型目录消失（#60676，已关闭）** — 刷新后的模型目录缺少 GPT-6.1 Sol 但内置目录中存在，今日已关闭，疑似已修复或确认为配置问题。关联新 Issue #60690。
   https://github.com/openai/codex/issues/60676

5. **桌面自动化限制与文档冲突（#59546）** — 16 👍。内置自动化限制阻止对外部 Web 系统的监控任务，与官方 Scheduled tasks 文档矛盾，影响自动化工作流用户。
   https://github.com/openai/codex/issues/59546

6. **Windows 云管理会话恢复失败：AbsolutePathBuf 错误（#59855）** — 25 条评论。打开云端会话报 "Invalid request: AbsolutePathBuf deserialized without a base path"，跨设备同步的核心链路受阻。
   https://github.com/openai/codex/issues/59855

7. **Android Remote 配对失败（#56600）** — QR 码与手动配对码均无法配对，移动端 Remote 功能在 Windows 上基本不可用，持续三周未解。
   https://github.com/openai/codex/issues/56600

8. **Windows 沙箱初始化失败：SYSTEM 缺少 WRITE_DAC（#59038 / #60057）** — `.sandbox-bin` 目录 ACL 问题导致沙箱反复失败，即使按建议授予 WRITE_DAC 后仍报错（#60057），说明修复方案不完整。
   https://github.com/openai/codex/issues/59038

9. **Full access 权限失效、SSH 被阻断（#60058）** — ChatGPT Work 中新建会话显示 Full access，但实际执行环境仍是受限网络模式，权限语义不一致且阻断 SSH。
   https://github.com/openai/codex/issues/60058

10. **Shell 快照明文持久化密钥环境变量（#30971）** — 安全类问题，快照会 source 用户启动文件并将 `op read` 等凭证助手的密钥明文写入 `~/.codex/shell_snapshots`，值得安全敏感团队关注。
    https://github.com/openai/codex/issues/30971

---

## 四、重要 PR 进展

1. [#60651](https://github.com/openai/codex/pull/60651) — **Cloud 会话支持模型与推理力度选择**：此前 Cloud 会话只能使用激活时的模型，现在 TUI 中可按需拉取目录并切换模型。

2. [#60647](https://github.com/openai/codex/pull/60647) — **修复 MXC 沙箱中 PowerShell 工作目录丢失**：当 workspace 存在不可读父目录时 PWD 未设置，导致相对路径失效。

3. [#60663](https://github.com/openai/codex/pull/60663) — **exec-server 沙箱准备延迟到执行主机**：修复跨操作系统（如 Windows 客户端 → Linux 主机）时工作区路径被破坏的问题，与 Remote/SSH 场景痛点直接相关。

4. [#60662](https://github.com/openai/codex/pull/60662) — **无头 TUI 会话支持 gateway 设备码登录**：SSH / 无浏览器环境可通过 device code 完成认证，改善远程开发体验。

5. [#60638](https://github.com/openai/codex/pull/60638) — **自动审批模式尊重 readOnlyHint**：修复标记为只读的 MCP 工具仍触发审批的问题，提升自动化流程顺滑度。

6. [#60669](https://github.com/openai/codex/pull/60669) — **git status 跳过 submodule 扫描**：避免执行任务可写的 Git 配置所指定的 clean filter，兼具性能与安全收益。

7. [#60644](https://github.com/openai/codex/pull/60644) — **服务层级更新期间保持中断响应**：将主机确认等待移出提交循环，避免用户中断请求被阻塞。

8. [#60655](https://github.com/openai/codex/pull/60655) — **app-server 设置 API 支持环境更新**：新增实验性 `environments` 字段，可对运行中的 turn 或后续 turn 动态调整环境配置。

9. [#60680-#60683](https://github.com/openai/codex/pull/60680) — **TUI Composer 底栏布局系列重构**：四个关联 PR 系统性解决窄终端下提示被裁剪、状态行被截断、草稿区空间被挤压的问题。

10. [#60671](https://github.com/openai/codex/pull/60671) — **新增 sign-only 模式并收紧 macOS 签名校验**：支持仅签名不公证的打包流程，签名前校验证书与 Team ID，利好发布管线。

其他值得留意：[#60673](https://github.com/openai/codex/pull/60673) 保留 rollout trace 中的 agent 消息投递、[#60646](https://github.com/openai/codex/pull/60646) Guardian 管控策略改用可信模板（防御用户目录注入）。

---

## 五、功能需求趋势

- **Windows 平台稳定性**：50 条热点 Issue 中约 60% 涉及 Windows，覆盖桌面应用、沙箱、扩展、Remote，是当前最集中的问题域。
- **模型目录与 GPT-6.1 Sol 可用性**：多个 Issue 反映 Sol 模型在桌面端 / 扩展端选择器中消失或切换后隐藏（#60676、#60690、#53219）。
- **Remote / 多设备协同**：Android / iOS 配对、历史同步分页超时、SSH 自动重连等需求持续活跃（#56600、#54751、#59931）。
- **权限与沙箱语义透明化**：Full access 与实际执行环境不一致（#60058）、沙箱 ACL 失败（#59038）反映用户对权限模型可预期性的诉求。
- **用量与限额可视化**：桌面端常驻剩余额度指示（#25561）、缓存 token 诊断（#60379）、额度重置异常（#60664）。
- **Subagents / 多智能体体验**：Subagents 面板增强实时活动与逐 agent 配置（#36266）。

---

## 六、开发者关注点

1. **Windows 交付质量**：扩展 UI 初始化失败 + 应用更新丢项目两大问题叠加，Windows 用户信任受损，急需官方修复与数据恢复指引。
2. **跨平台路径处理**：AbsolutePathBuf 反序列化错误、exec-server 路径破坏等暴露出 Windows 与 Unix 路径模型转换的系统性缺陷，今日 PR #60663 是积极信号。
3. **安全与凭证管理**：shell 快照明文落盘密钥（#30971）、Guardian 模板注入防护（PR #60646）表明供应链与凭证安全正在成为双向关注点。
4. **自动化与免打扰审批**：readOnlyHint 审批修复（PR #60638）与 "Always approve" 失效（#53598）显示自动化工作流中的审批摩擦是高频痛点。
5. **稳定性与资源占用**：macOS 全机冻结（#56586）、workspace routing 超时断流（#57063）、Computer Use 屏幕捕获持锁（#57101）等性能问题仍待收敛。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-11-11

## 📌 今日速览

Gemini CLI 昨日连发两个版本：稳定版 **v0.68.0** 与预览版 **v0.69.0-preview.0**，后者新增 `/stats` heatmap 子命令并修复模板占位符替换时 `$` 字符被吞的问题。社区讨论焦点集中在 **Subagent 可靠性**（虚假成功上报、generalist agent 挂起）与 **AST 感知工具链的探索**。PR 侧值得关注的是修复 nightly 发布因陈旧构建产物导致的 413 错误（P0），以及多个安全加固类修复。

---

## 🚀 版本发布

### [v0.69.0-preview.0](https://github.com/google-gemini/gemini-cli/releases)
- **fix(core,cli)**: 模板占位符替换时保留字面 `$` 字符（[#30136](https://github.com/google-gemini/gemini-cli/pull/30136)）
- **feat(cli)**: 新增 `/stats` heatmap 子命令，可视化每日 token 用量

### [v0.68.0](https://github.com/google-gemini/gemini-cli/releases)
- 常规 changelog 汇总与 README 文档更新（澄清 Gemini CLI 的定位、限制与工具能力范围）

---

## 🔥 社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — Subagent 达到 MAX_TURNS 后仍上报 `success`/`GOAL`，掩盖真实中断（P1，13 条评论）。这是当前信任链的核心问题：agent 报告不可信会直接误导上层决策，社区讨论热烈。

2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — 利用 Gemini 3 原生 bash 能力：零依赖 OS 沙箱 + 执行后意图路由（P2，9 条评论）。涉及安全与能力释放的架构级提案，effort/large。

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — Generalist agent 无限挂起，简单如建文件夹也会卡死（P1，👍 8）。用户反馈禁用 subagent 即可绕过，是体验层面最痛的 bug 之一。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — EPIC：评估 AST 感知的文件读取/搜索/代码库映射（7 条评论）。配套 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)、[#22747](https://github.com/google-gemini/gemini-cli/issues/22747)，探索 ast-grep、tilth、glyph 等工具，是 token 效率方向的重要布局。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/22768)** — 模型几乎不会自主调用自定义 skills 和 subagents（7 条评论）。调度策略的痛点，影响可扩展性生态。

6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** — Browser Agent 完全忽略 `settings.json` 的 `maxTurns` 等覆盖配置（5 条评论）。

7. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — browser subagent 在 Wayland 下失败（P1），Linux 桌面兼容性问题。

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — 启用超过 128 个工具时触发 API 400 错误，需更智能的工具范围裁剪。

9. **[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)** — "Tactful Extraction"：token 节俭的外科手术式代码读取。当前基线约 36.6k tokens/turn，大文件读取会造成上下文膨胀，与 AST 方向互补。

10. **[#18836](https://github.com/google-gemini/gemini-cli/issues/18836)** — 用持久化文件任务追踪（CRUD）替代 in-context 的 WriteToDo，解决 "context rot" 与跨会话记忆丢失。

---

## 🔧 重要 PR 进展

| PR | 内容 |
|---|---|
| [#30207](https://github.com/google-gemini/gemini-cli/pull/30207) 🅿️0 | **修复 nightly 发布连续失败**：esbuild 前清空 bundle/，去除约 70MB 陈旧 chunk，解决 413 发布错误 |
| [#30217](https://github.com/google-gemini/gemini-cli/pull/30217) ✅已合并 | 修复多轮 PDF 摄取 + telemetry 禁用时 PDF inlineData 内存驻留导致的 V8 堆 OOM |
| [#30214](https://github.com/google-gemini/gemini-cli/pull/30214) ✅ | 识别 TortoiseGitPlink 为 PuTTY 系 SSH 客户端，正确插入 `-batch` 参数 |
| [#30095](https://github.com/google-gemini/gemini-cli/pull/30095) | 安全修复：堵住 Windows 下 git diff 权限绕过，统一 Git 只读命令校验 |
| [#30171](https://github.com/google-gemini/gemini-cli/pull/30171) | 安全修复：识别任意位置的递归/强制 `rm`（如 `rm x -rf`、`rm --recursive --force`），此前仅检查 `args[1]` |
| [#30020](https://github.com/google-gemini/gemini-cli/pull/30020) ✅ | 丢弃 mid-stream retry 中失败 attempt 已流出的 tool calls，防止副作用命令被执行两次 |
| [#30219](https://github.com/google-gemini/gemini-cli/pull/30219) | ACP 修复：压缩会话重载时 400 错误，tool call 改为记录到活跃 chat 实例 |
| [#30220](https://github.com/google-gemini/gemini-cli/pull/30220) | 会话预览保留 Unicode（中文/emoji）并正确剥离 ANSI 转义序列 |
| [#30216](https://github.com/google-gemini/gemini-cli/pull/30216) | 为 `isApiError`/`isStructuredError` 错误分类守卫补充单测 |
| [#30009](https://github.com/google-gemini/gemini-cli/pull/30009) | CI：新增 OSS Exit Gate npm 发布工作流，采用 Workload Identity 无密钥认证 |

> 💡 另有 dependabot 大规模依赖批量更新 [#30089](https://github.com/google-gemini/gemini-cli/pull/30089)（70 个 npm 包，含 MCP SDK 1.23→1.32）待处理。

---

## 📈 功能需求趋势

1. **Subagent 体系成熟化**（最热方向）：错误上报准确性、自主调度意愿、并行协作与共享内存（[#18287](https://github.com/google-gemini/gemini-cli/issues/18287)）、轨迹可视化（[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)）
2. **Token 效率与 AST 感知工具**：AST 文件读取/搜索、surgical reads、持久化任务追踪，降低每 turn 约 36.6k 的上下文基线
3. **浏览器 Agent 增强**：配置覆盖生效、会话接管与锁恢复（[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)）、Wayland 支持
4. **安全与破坏性行为防护**：危险命令识别、沙箱执行方案、`git reset --force` 等高风险操作抑制（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）
5. **内部评估（eval）稳定性**：steering eval、项目级 eval 可靠性提升（[#23166](https://github.com/google-gemini/gemini-cli/issues/23166)）

---

## ⚠️ 开发者关注点

- **Agent 可信度是最大痛点**：虚假 success 上报（#22323）与无限挂起（#21409）直接打击用户对 subagent 委托的信心
- **上下文成本高企**：大文件读取"firehose"式灌入、in-context todo 导致 context rot，社区强烈期待更精细的读取策略
- **配置不生效**：`settings.json` 覆盖被 Browser Agent 忽略、symlink 形式的 agent 定义不被识别（[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)）
- **工作区卫生**：模型在随机位置创建临时脚本，清理成本高（[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)）
- **可观测性不足**：`/bug` 报告不含 subagent 内部上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)），排障困难

---

*数据来源：github.com/google-gemini/gemini-cli · 统计窗口：过去 24 小时（Issues 50 条 / PRs 23 条）*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-11** | 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)

---

## 📰 今日速览

过去 24 小时，Copilot CLI 连续发布 v1.0.110-1 和 v1.0.110-0 两个版本，重点修复了 `--resume` 会话并发写入问题，并推出了实验性的 sudo/ssh 密码掩码输入对话框。社区方面，MCP 相关问题依然占据主导（34 条更新 Issue 中过半涉及 MCP），Windows 平台的多个回归问题（父进程崩溃、NumLock、Entra 单租户认证）引发关注。

---

## 🚀 版本发布

### v1.0.110-1
- **会话修复**：`copilot --resume` 恢复的会话在打开时即标记为“使用中”，避免 `copilot -p --resume` 和第二个窗口向空闲会话写入
- **渲染改进**：自定义状态栏保留首行缩进，保证所有行对齐一致
- 显示控制字符的可见性改进

### v1.0.110-0
- **新功能（实验性）**：可在掩码对话框中为 agent 命令应答 git/ssh/sudo 密码提示（通过 `/experimental` 开启）
- **改进**：`/user switch` 选择不可用账户时显示恢复引导和重试操作；点击展开的推理区域任意位置可折叠

---

## 🔥 社区热点 Issues（Top 10）

1. **[#4438](https://github.com/github/copilot-cli/issues/4438)** — `disable-model-invocation: true` 导致 Skill 完全不可达
   配置该字段的 Skill 无法被显式调用（`Skill not found`），语义应为“仅手动调用”而非“完全禁用”。17 条评论、20 👍，是本周最热 Issue。

2. **[#5171](https://github.com/github/copilot-cli/issues/5171)** — Windows NumLock 关闭时小键盘导航和 Delete 失效
   1.0.98 引入的回归，影响笔记本用户（无鼠标场景下的小键盘导航），Windows 平台体验痛点。

3. **[#4888](https://github.com/github/copilot-cli/issues/4888)** — MCP 客户端在 `server/discover` 成功后仍发送 legacy `initialize`
   协议兼容性问题：双版本 MCP SDK 服务器会拒绝降级请求，直接影响新版 MCP 协议生态兼容性。

4. **[#5283](https://github.com/github/copilot-cli/issues/5283)** — 个人 Copilot Free 账户远程环境被 remote-control 策略拦截
   涉及远程开发功能的账户策略限制，5 👍，反映个人用户对远程能力的强烈需求。

5. **[#5404](https://github.com/github/copilot-cli/issues/5404)** — Windows 上在 git 仓库中启动 copilot 会杀死父 pwsh 进程
   1.0.108 的严重回归：tgrep 索引时抛出未处理异常，连带关闭整个终端会话和 ssh-agent 等进程，影响较大。

6. **[#5402](https://github.com/github/copilot-cli/issues/5402)** — MCP Entra 静默登录使用 `/common` authority，单租户应用失败（AADSTS50194）
   1.0.107 起 Windows 用户每次会话都需手动 `/mcp auth`，企业单租户场景认证体验受损。

7. **[#5405](https://github.com/github/copilot-cli/issues/5405)** — `view` 和 Playwright 截图无法将图像像素传给模型
   多模态能力失效：模型只收到“查看成功”文本而非图像本身，削弱视觉相关工作流。

8. **[#5408](https://github.com/github/copilot-cli/issues/5408)** — 内容过滤反复失败仍消耗 AI credits
   用户报告会话消耗 1,002.5 AI credits，其中失败请求也在扣费，涉及计费公平性。

9. **[#5388](https://github.com/github/copilot-cli/issues/5388)** — GHE Cloud 数据驻留租户沙箱中 GH_TOKEN 凭证掩码失效
   企业安全相关：token 环境变量在掩码前被丢弃，数据驻留场景的合规风险。

10. **[#5407](https://github.com/github/copilot-cli/issues/5407)** — 请求支持企业代理的 NTLM 回退（Negotiate 认证）
    企业内网代理环境下 Copilot CLI 完全无法联网，Windows 集成认证是刚需。

> 另有多个 MCP 相关旧 Issue（如 [#191](https://github.com/github/copilot-cli/issues/191)、[#4392](https://github.com/github/copilot-cli/issues/4392)、[#4461](https://github.com/github/copilot-cli/issues/4461)）集中关闭，多为 "more-info-needed" 状态处理，建议相关用户跟进确认。

---

## 🔀 重要 PR 进展

过去 24 小时仅 1 条 PR 更新：

- **[#4770](https://github.com/github/copilot-cli/pull/4770)** — Document the WebSocket responses opt-out
  文档类 PR：当 WebSocket 传输不可用（网络封锁或出现 "400 input item ID does not belong to this connection" 错误）时，文档化如何关闭 WebSocket responses 端点回退到标准传输。对受网络限制的企业用户有实际参考价值。

---

## 📈 功能需求趋势

1. **MCP 生态与兼容性**（最突出）：协议版本兼容（#4888）、OAuth 固定回调端口（#5391）、插件设置 OAuth 选项（#5410）、ACP 模式下的 Connectors 支持（#5397）——社区在推动 MCP 集成的深度和规范性。
2. **企业环境支持**：NTLM 代理（#5407）、GHE 数据驻留（#5388）、单租户 Entra（#5402）。
3. **模型灵活性**：模型黑名单/路由控制（#5369）、新模型接入（Claude Fable 5.2 已在 v1.0.109 支持）。
4. **系统资源与配置控制**：使用系统安装的 gh CLI 而非捆绑版（#4456）、远程环境托管（#5283）。
5. **UI/UX 细节**：shell 命令分组控制（#5409）、诊断信息改进（#5399）。

---

## ⚠️ 开发者关注点

- **Windows 平台稳定性**是当前最大痛点：父进程崩溃（#5404）、NumLock 回归（#5171）、凭证管理器诊断缺失（#5399）多条 Issue 集中爆发。
- **凭证与计费信任**：沙箱内 token 掩码失效（#5388）和失败请求扣费（#5408）触及安全与付费用户的核心信任。
- **进程/资源泄漏**历史问题（MCP 孤儿进程、Docker 容器未终止）虽批量关闭，建议升级到 v1.0.110 验证是否真正修复。
- **多模态可用性**：图像无法传给模型（#5405）值得关注，视觉相关自动化工作流用户可能需要暂缓升级或降级验证。
- **升级建议**：v1.0.110 修复了 `--resume` 会话并发写入问题，多窗口用户建议升级；但 1.0.108 在 Windows PowerShell 下存在严重回归（#5404），相关用户可留意后续补丁。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-11

## 一、今日速览

OpenCode 发布 **v2.2.7**，重点推出 GitHub Copilot **Auto 模式**支持。核心开发活跃度高，@jlongster 连发多个 subagent 架构重构 PR，子代理将全面转向后台运行。Windows 平台的黑窗闪烁问题迎来架构级修复方案（process-daemon pipe mode）。社区关注点集中在桌面端项目分组视图、Go 订阅计费错误和桌面 UI 数据刷新等长期痛点。

---

## 二、版本发布

### v2.2.7
- **GitHub Copilot Auto**：当 Copilot 账户拥有 Auto pool 时，可在模型选择器中选择 **Auto**，由 Copilot 路由器以 Auto 折扣价为每个会话自动选模型；路由失败时回退到账户默认 chat 模型（[#62997](https://github.com/anomalyco/opencode)）

---

## 三、社区热点 Issues

1. **[#55446](https://github.com/anomalyco/opencode/issues/55446) 桌面端侧栏按项目分组会话（OPEN）**
   20 条评论、13 👍，本日讨论度最高。请求侧栏像 Codex Projects 视图一样按项目折叠分组，反映桌面端工作流组织是长期强烈需求。

2. **[#51424](https://github.com/anomalyco/opencode/issues/51424) Go 订阅报 "Insufficient account funds"（CLOSED）**
   订阅有效且用量 0% 却无法调用模型，属于计费/鉴权链路的严重问题，已关闭，或已随近期版本修复。

3. **[#60250](https://github.com/anomalyco/opencode/issues/60250) Plan 模式约束失效（OPEN）**
   v2.2.1 中 Plan agent 在多次提醒后仍直接改代码，Agent 权限隔离可靠性问题，14 条评论，处于 triage 阶段。

4. **[#63216](https://github.com/anomalyco/opencode/issues/63216) Agent 忽视 STOP 指令继续操作（OPEN）**
   Windows 上 Neoron agent 在用户明确停止后仍继续修改文件，标注"严重控制失效"，与 #60250 共同指向 agent 控制权这一核心安全问题。

5. **[#52941](https://github.com/anomalyco/opencode/issues/52941) 桌面端文件树/预览不刷新（OPEN, reproduced）**
   agent 编辑文件后 Review 面板显示陈旧内容，已复现。同日新报 [#63214](https://github.com/anomalyco/opencode/issues/63214)（shell 命令创建/删除文件不刷新）表明这是文件监视系统性缺陷。

6. **[#52266](https://github.com/anomalyco/opencode/issues/52266) Windows 黑窗每秒闪烁（OPEN）**
   spawn 未传 `CREATE_NO_WINDOW` 导致 git.exe 等子进程每秒弹窗，7 👍，多次重报。今日 PR #63196（pipe mode）有望根治。

7. **[#59461](https://github.com/anomalyco/opencode/issues/59461) 旧 CPU 启动即崩溃 Error 134（OPEN）**
   新 Bun 运行时要求 SSE4.2 指令集，直接把老处理器用户挡在门外，兼容性硬伤。

8. **[#62529](https://github.com/anomalyco/opencode/issues/62529) ChatGPT 订阅共享限额误报（OPEN）**
   限额余量充足却报 `subscription_sharing_usage_limit_exceeded`，与已关闭的 #51424 同属上游限额判定逻辑问题，可关注 PR #63197 的方向。

9. **[#63174](https://github.com/anomalyco/opencode/issues/63174) 无效 retry-after-ms 覆盖有效 Retry-After 头（OPEN, reproduced）**
   空值 `retry-after-ms` 把 60s 退避解析成 0ms，导致限流时使用过短的 fallback 退避，网络层细节 bug 但影响稳定性。

10. **[#62659](https://github.com/anomalyco/opencode/issues/62659) 升级后全部会话数据丢失（CLOSED）**
    2.2.5→2.2.6 服务启动时重建数据目录，8-11 月所有 transcript 消失。最严重的数据安全问题，值得所有用户警惕备份。

---

## 四、重要 PR 进展

1. **[#63210](https://github.com/anomalyco/opencode/pull/63210) 子代理始终后台运行（OPEN）**
   架构变更：移除 `background` 选项，每次调用立即返回 `sessionID`，父代理以 `<subagent>` 消息形式接收子代理空闲通知。堆叠在 #63209 之上，是本日最重要的演进。

2. **[#63209](https://github.com/anomalyco/opencode/pull/63209) 子代理每次 idle 都向父级汇报（OPEN）**
   打破原一次性 observer 汇报模式，支持直接输入、父级再提示、后台唤醒等多种子代理生命周期场景。

3. **[#63196](https://github.com/anomalyco/opencode/pull/63196) Windows process-daemon pipe mode（OPEN）**
   新增 `create_pipe`：无终端命令永不创建控制台（`CREATE_NO_WINDOW`），是 Windows 黑窗问题（#52266）的架构级修复。

4. **[#63200](https://github.com/anomalyco/opencode/pull/63200) 支持 LM Studio decision models（OPEN）**
   本地模型生态扩展，配合已合并的 #63198（接受 null context length）。

5. **[#63197](https://github.com/anomalyco/opencode/pull/63197) 保留 Claude 订阅限额错误信息（OPEN）**
   修复 AI SDK bridge 把订阅限额错误吞成 `UnknownError` 的问题，改善限额诊断体验。

6. **[#63139](https://github.com/anomalyco/opencode/pull/63139) 组织级 `remote.use` 策略（CLOSED）**
   应企业需求，允许组织通过 Console 策略关闭成员的 `opencode pair --remote` 远程访问能力，企业管控能力增强。

7. **[#63208](https://github.com/anomalyco/opencode/pull/63208) 修复登录 shell 环境探测冻结主进程（CLOSED）**
   桌面启动时的 `spawnSync` 环境探测会卡死主线程最多 5 秒（窗口无法重绘），已修复。

8. **[#63213](https://github.com/anomalyco/opencode/pull/63213) MCP 连接按 session 隔离（OPEN）**
   client MCP 连接支持 `sessionID` 参数，实现会话级隔离，为多会话场景铺路。

9. **[#62729](https://github.com/anomalyco/opencode/pull/62729) CLI 事件流打不开时快速失败（OPEN）**
   `opencode run` 和 ACP 客户端不再无限等待事件流，TUI 不再无限重连。

10. **[#63207](https://github.com/anomalyco/opencode/pull/63207) TUI 默认 transcript 详尽度降为 low（CLOSED）**
    默认输出更精简，已设置 `session.verbosity` 的用户不受影响。

---

## 五、功能需求趋势

- **桌面端工作流组织**：项目分组侧栏（#55446）、消息时间戳（#49742）、快捷键帮助（#63190）——桌面端 UX 是最大需求池
- **Agent 控制与权限**：Plan 模式约束（#60250）、deny 规则携带反馈消息（#63075）、STOP 指令失效（#63216）——用户要求更可靠的边界
- **上下文/会话编辑**：删除消息、插件修改消息线程（#7712、#7034）长期高 👍，呼声持续
- **本地与多模型支持**：LM Studio decision models、DeepSeek V4.1 Flash 新版本（#63110）、Kimi 等
- **企业管控**：组织策略关闭远程访问（#63139）显示企业用户占比上升

---

## 六、开发者关注点

1. **Windows 体验仍是重灾区**：黑窗闪烁、焦点被抢（#62988）、文件树不刷新（#63214）、路径打开错误（#62635）扎堆出现；pipe mode 落地后有望整体改善
2. **订阅计费/限额判定不可靠**：Go 资金不足误报（#51424）、ChatGPT 共享限额误报（#62529）、Claude 限额错误被吞（#63197），多 provider 限额链路需系统性治理
3. **数据安全焦虑**：升级导致全量数据丢失（#62659）后果严重，社区需要迁移安全网与自动备份机制
4. **Agent 行为可信度**：Plan 模式失效、忽视停止指令等问题若不解决，将影响生产环境采用
5. **老硬件兼容**：SSE4.2 硬性要求（#59461）提醒升级前先确认 CPU 支持

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-11-11

## 1. 今日速览

今日 **v0.27.2 正式版发布**，最大亮点是 Web Shell 新增微信、QQ、邮箱渠道配置（含扫码登录与身份管理）。安全方向成为焦点：AUTO 模式分类器被曝将待审调用误报为“已执行操作”（P1），配合 #16856 的输入重定向绕过漏洞，权限审计链路问题集中暴露。同时 CI 不稳定问题持续发酵，Managed Agent gate 相关失败 Issue 讨论量高达 292 条评论。

---

## 2. 版本发布

### [v0.27.2](https://github.com/QwenLM/qwen-code/releases)
- **Web Shell 渠道配置**：支持微信、QQ、邮箱渠道，包括二维码登录、扫码进度、身份显示及登出（[#16736](https://github.com/QwenLM/qwen-code/pull/16736)、[#16724](https://github.com/QwenLM/qwen-code/pull/16724)）
- **CI 修复**：Prettier 在 base tip 处读取完整 ignore 集合
- **CLI/Core**：Agent Host 支持注册重试
- 同步发布 **v0.27.2-preview.0** 预览版

### [sdk-typescript v0.1.32](https://github.com/QwenLM/qwen-code/releases)
- 捆绑 CLI 0.27.2，与 SDK 同源同分支构建

---

## 3. 社区热点 Issues

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#14724](https://github.com/QwenLM/qwen-code/issues/14724) Main CI 失败：Managed Agent gate 无测试识别 | **292 条评论**，自 10-19 持续至今的长期 CI 病灶，反映主分支质量门禁可靠性问题 |
| 2 | [#16425](https://github.com/QwenLM/qwen-code/issues/16425) Workflow agent 权限审批永不渲染，运行无限挂起 | **P1**：多代理工作流到达人工审批点时状态栏显示待审批但 UI 不渲染，任务死锁，影响 0.26.6+ 用户 |
| 3 | [#16856](https://github.com/QwenLM/qwen-code/issues/16856) 命令中间的输入重定向可隐藏后续单词绕过只读分类器 | **P1 安全漏洞**：`git branch < /dev/null -D main` 中 tree-sitter-bash 将 `-D main` 归入 file_redirect 节点，逃逸安全审查 |
| 4 | [#16496](https://github.com/QwenLM/qwen-code/issues/16496) AUTO 模式分类器将待分类调用误报为已执行的 Prior action | **P2 安全**：transcript 中同一调用出现两次，可能导致分类器误判授权状态，标注 welcome-pr 欢迎社区修复 |
| 5 | [#15660](https://github.com/QwenLM/qwen-code/issues/15660) 子代理启动即携带 105k 巨量上下文 | **P2 性能**：父代理 42k 上下文但子代理开局 105k 且逐次膨胀，token 管理存在泄漏 |
| 6 | [#8662](https://github.com/QwenLM/qwen-code/issues/8662) TUI 渲染层从 Ink 迁移到 OpenTUI（追踪） | 36 条评论的长期路线图 issue，当前关卡是同候选安装/平台及完整 Ink/真实终端验收 |
| 7 | [#15738](https://github.com/QwenLM/qwen-code/issues/15738) Team 模式 ACP 下队友消息永远无法送达 leader | P2：`qwen serve --web` + agentTeam 实验中，leader 收不到任何队友消息且团队随 ACP 子进程消亡 |
| 8 | [#15327](https://github.com/QwenLM/qwen-code/issues/15327) 统一 Agent Loop 追踪：所有表面共享一个代理循环 | P1 架构级重构，`experimental.unifiedAgentLoop` 下的核心整合工作 |
| 9 | [#16604](https://github.com/QwenLM/qwen-code/issues/16604) 用真 bash 解析器（tree-sitter-bash/mvdan.sh）替换手写 amend shell 模型 | 源自 PR #16075 十五轮评审的惨痛教训：手写模型每轮补洞又开新洞，安全判定需 AST 归因 |
| 10 | [#16818](https://github.com/QwenLM/qwen-code/issues/16818) managed-agent 渠道分段账本后续项 | wenshao 发起的非阻塞遗留项清单（升级窗口回填、对账门、批处理计划），多段渠道投递体系持续演进 |

---

## 4. 重要 PR 进展

| # | PR | 内容 |
|---|-----|------|
| 1 | [#16844](https://github.com/QwenLM/qwen-code/pull/16844) | **Managed Agent 会话接入客户端文件系统**：因托管控制面禁 WebSocket，通过 Java 中介的 MCP 实现浏览器本地文件访问 |
| 2 | [#16857](https://github.com/QwenLM/qwen-code/pull/16857) | 修复 AUTO 分类器将待审调用列为 Prior action 的缺陷（对应 Issue #16496） |
| 3 | [#16858](https://github.com/QwenLM/qwen-code/pull/16858) | AUTO 分类器提示词重构：判定“用户是否授权该操作”而非“是否符合用户所说” |
| 4 | [#16802](https://github.com/QwenLM/qwen-code/pull/16802) + [#16804](https://github.com/QwenLM/qwen-code/pull/16804) | **钉钉 Webhook 渠道**：后端发送通道 + Web Shell 配置界面，支持签名与 Markdown 消息推送 |
| 5 | [#16784](https://github.com/QwenLM/qwen-code/pull/16784) | **安全加固**：不可解码的 ANSI-C shell 词保持未解析状态，权限检查升级为 ask，fail-closed 策略 |
| 6 | [#16835](https://github.com/QwenLM/qwen-code/pull/16835) | Managed Session 的 /loop 自 paced 唤醒持久化到 Session journal，不再依赖进程内存定时器 |
| 7 | [#15936](https://github.com/QwenLM/qwen-code/pull/15936) | 压缩请求窗口保护：冷压缩必须为摘要预留至少 4096 输出 token，防上下文超限拒绝 |
| 8 | [#16813](https://github.com/QwenLM/qwen-code/pull/16813) | Web Shell 输入框上方显示未完成后台任务 chips（workflow/shell/monitor/local agent） |
| 9 | [#16838](https://github.com/QwenLM/qwen-code/pull/16838) | 微信二维码登录 mint 请求获得与 daemon 一致的时间预算，修复同步读取超时 |
| 10 | [#16846](https://github.com/QwenLM/qwen-code/pull/16846) | 渠道重发身份冲突映射为 409 + 固定 projection wire shape，API 语义规范化 |

其他值得留意：[#16847](https://github.com/QwenLM/qwen-code/pull/16847)（修复已关闭 PR 无法退出轮播的死代码路径）、[#16862](https://github.com/QwenLM/qwen-code/pull/16862)（发布 Docker 测试套件增加一次重试）。

---

## 5. 功能需求趋势

1. **Web Shell / 渠道生态快速扩张**（最热方向）：微信/QQ/邮箱渠道已落地（v0.27.2），钉钉 Webhook（#16802）、出站平台 Webhook 通用化（[#16751](https://github.com/QwenLM/qwen-code/issues/16751)）、会话搜索优化（[#16778](https://github.com/QwenLM/qwen-code/issues/16778)）、自定义 provider 模型发现（[#16785](https://github.com/QwenLM/qwen-code/issues/16785)）密集提出
2. **安全与权限审计**：AUTO 分类器判定逻辑（#16496/#16856）、shell 解析器 AST 化（#16604）、fail-closed 路径处理（#16784）形成一条完整的安全改进主线
3. **Managed Agent / 多代理架构**：渠道账本（#16818）、客户端文件系统（#16844）、Team 模式 ACP 修复（#15738）、统一 Agent Loop（#15327）持续推进
4. **TUI 渲染层迁移**：Ink → OpenTUI 长期工程（#8662）处于验收关卡
5. **性能与 token 管理**：子代理上下文膨胀（#15660）、压缩窗口保护（#15936）、GitHub 渠道 GraphQL 批量查询（[#16692](https://github.com/QwenLM/qwen-code/issues/16692)）

---

## 6. 开发者关注点

- **CI 稳定性是最大痛点**：Issue 榜前五名中四个是 CI 失败（Managed Agent gate、E2E Tests），#14724 累计 292 条评论；团队已建立 CI Failure Patrol + autofix 机制（#16863、#16853）应对测试抖动
- **权限审批挂起类 bug 反复出现**：#16425（审批不渲染）、#12224（/cd 报“响应进行中”）、#16700（/branch 同类报错），提示任务状态跟踪与 UI 渲染间存在系统性不同步
- **长上下文记忆污染**：#16824 报告模型持续将项目名拼错且重装无法清除，与 #15660 的上下文膨胀呼应，暗示持久化记忆/缓存管理需要更透明的可观测性
- **Windows 与静态渲染模式**仍受关注：#14075 的静态模式断行孤字问题尚未解决
- **安全审计欢迎社区参与**：#16496 等标注 `welcome-pr`，是社区贡献者的良好切入点

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*