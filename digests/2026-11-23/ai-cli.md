# AI CLI 工具社区动态日报 2026-11-23

> 生成时间: 2026-11-23 00:49 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告 · 2026-11-23

## 1. 生态全景

AI CLI 工具已从“终端补全助手”全面演进为**多智能体编排平台**，子代理（subagent）体系、沙箱安全、上下文压缩成为三大共性战场。头部产品（Claude Code、Codex、Gemini CLI）社区讨论重心从功能可用性转向**可信度与精细化控制**——安全护栏误报、权限模型、token 成本透明度。同时工具形态正从纯 CLI 向“CLI + 桌面端 + Web Shell + 云会话”多端融合，Windows 与国际化（中文、阿拉伯语 RTL）用户反馈密度显著上升。

## 2. 各工具活跃度对比

| 工具 | Issues 动态 | PR 动态 | Release | 今日焦点 |
|---|---|---|---|---|
| Claude Code | Top issue 25 评论，集中讨论 | 无 PR 更新 | 无 | 安全/权限设计争论（#78160 等） |
| OpenAI Codex | 50 个 Issue 更新 | 29 个 PR | 无 | TUI 密集打磨、Windows 痛点集中 |
| Gemini CLI | Top issue 14 评论 | 10+ PR | v0.71.0 nightly | Agent 调用 Agent、ACP 修复 |
| Copilot CLI | 约 10 热点 Issue | 2 个 PR | **v1.0.115-7** | 云端沙箱连接稳定性 |
| Kimi Code CLI | 0 | 0 | 无 | 无活动 |
| OpenCode | Top issue 25 评论 | 10+ PR | 无 | V2 迁移功能回退争议 |
| Qwen Code | Top issue 545 评论（CI 追踪） | 10+ PR | **v0.28.4** + 桌面版 | Web Shell / Managed Agent 主线 |

**解读**：Codex 更新量最大但以机器人（copyberry）批量提交的 TUI 打磨为主；Claude Code 活跃度低但讨论质量高（安全架构级议题）；Gemini CLI 和 Qwen Code 处于明确的 roadmap 驱动快速迭代期。

## 3. 共同关注的功能方向

| 方向 | 相关工具与诉求 |
|---|---|
| **子代理编排与可观测性** | Gemini（Agent 调用 Agent #30409、轨迹查看 #22598）、Codex（委派停滞 #49883、fork 丢 prompt-cache #24704）、OpenCode（前台 subagent 恢复 #64073、侧边栏）、Copilot CLI（嵌套子 Agent 多轮 #5543）、Claude Code（多会话隔离 #94582）——**全生态共识性需求** |
| **沙箱与权限精细化** | Claude（“安全默认 + 可配置豁免”）、Codex（Windows 权限选择器失效、Linux snapd 沙箱）、Gemini（零依赖 OS 沙箱提案 #19873、tainted 命令白名单 #30196）、Copilot CLI（云端沙箱连接） |
| **上下文压缩与 token 成本** | Claude（usage 求和导致 auto-compact 提前 #84738）、OpenCode（keep.tokens 失效、压缩后 cache 全量 miss）、Codex（fork 不继承缓存）、Gemini（AST 感知读取降 token 噪音） |
| **静默失败 / 误报成功** | Gemini（MAX_TURNS 误报 GOAL 成功）、Qwen（SGLang 400 被丢弃）、OpenCode（Plan 模式失效）、Claude（伪造工具调用 #109152）——Agent 结果可信度是普遍焦虑 |
| **Windows 平台质量** | Claude（盘符大小写）、Codex（7/10 热点是 Windows）、OpenCode（ECONNRESET）、Qwen（@ 路径转义） |
| **MCP 可靠性** | Claude（elicitation、鉴权头）、OpenCode（>61 工具静默截断）、Copilot CLI（内置 MCP 读工具不可用）、Gemini（>128 工具 400 错误） |

## 4. 差异化定位分析

- **Claude Code**：定位企业级安全敏感场景，权限模型最严格，但也因此引发“默认安全 vs 开发者自主权”矛盾；社区讨论偏架构层（护栏误报、模型可信度），用户画像为重度专业开发者。
- **OpenAI Codex**：生态最广（CLI + 桌面 + Work + ChatGPT 联动），方向是**持久化工程工作区**（#61348）；但 Windows 桌面端质量债明显，回归频发。
- **Gemini CLI**：技术路线最前沿——Agent 递归调用、AST 感知代码理解、A2A/ACP 协议、零依赖沙箱，偏研究者与早期采用者，nightly 节奏快。
- **Copilot CLI**：深度绑定 GitHub 生态（Mobile、企业网络、容器化部署），企业部署场景（连接令牌、K8s）投入明确，但独立创新议题较少。
- **OpenCode**：开源多 Provider 路线，桌面端性能打磨积极；V1→V2 迁移功能回退引发社区信任危机，处于转型阵痛期，中文社区活跃度上升。
- **Qwen Code**：Web Shell + Managed Agent 托管架构差异化明显，国际化投入（阿拉伯语 RTL）最积极；CI 不稳定是主要短板。

## 5. 社区热度与成熟度

- **高活跃 + 高成熟**：Claude Code（讨论深度高、以设计争论为主）、Codex（量最大，但 Windows 回归说明扩张快于质量收敛）
- **快速迭代期**：Gemini CLI（nightly + 方向性 PR 密集）、Qwen Code（双版本节奏、当天响应 bug 当天出 PR——#18141→#18142 值得称赞）
- **调整期**：OpenCode（性能优化密集但面临迁移信任危机）
- **早期/低活跃**：Kimi Code CLI（无活动）、Copilot CLI（PR 量少但版本节奏稳定）

## 6. 值得关注的趋势信号

1. **"Agent 结果可信度”成为新的竞争维度**：误报成功、伪造工具调用、静默失败在所有工具中被曝光——自动化流水线落地前，务必对 Agent 终态做独立校验，不能信任其自述。
2. **权限模型从粗放转向“安全默认 + opt-in 豁免”**：Claude 的密码阻断争论、Gemini 的 tainted 命令白名单（#30196）代表行业共识方向；安全敏感团队应关注 heredoc 注入类绕过（Claude #111729）。
3. **Prompt-cache 与压缩效率直接决定成本**：压缩后缓存全量 miss（OpenCode 456 秒重处理）、fork 丢缓存（Codex）、usage 统计虚高（Claude）说明多 Agent 场景的实际成本可能远超账面，选型时应实测。
4. **多端融合是标配方向**：CLI + 桌面 + Web Shell + 云会话 + Mobile，云会话连接稳定性（Copilot CLI #5552/#5553、Claude 云端 MCP 失联）是新爆发的问题面。
5. **Windows 是普遍质量洼地**：四大工具均有 Windows 相关热点，Windows 团队应暂缓自动更新关键版本，等待稳定期。
6. **MCP 工具规模瓶颈显现**：>61 静默截断、>128 报 400——重度 MCP 用户需做工具裁剪，这也是各工具下一轮优化重点。

---
*数据来源：各项目 GitHub 仓库过去 24 小时动态；Kimi Code CLI 无活动未纳入对比。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-23）

## 一、热门 Skills 排行（按 PR 活跃度）

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 兼容性修复** — [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 mcp>=2.0 中 `streamable_http_client` 重命名及自定义 header 配置方式变更，修复 #1668；反映 MCP SDK 快速迭代对 skill 脚本的连锁影响 | OPEN |
| 2 | **skill-creator 触发评估修复** — [#1298](https://github.com/anthropics/skills/pull/1298) | 隔离并行 worker 探测、修复 Windows `select()` 失败、区分运行时错误与非触发，直指社区长期抱怨的 "trigger rate 失真" 问题（关联 #556、#1352） | OPEN |
| 3 | **webapp-testing 安全加固** — [#1980](https://github.com/anthropics/skills/pull/1980) | 移除 `shell=True`，消除 CWE-78 命令注入风险；呼应 #492 的信任边界安全讨论 | OPEN |
| 4 | **pyxel 复古游戏开发** — [#525](https://github.com/anthropics/skills/pull/525) | 由 Pyxel 作者本人提交，覆盖创建、无头运行调试与帧检查；存续 8 个月仍活跃更新 | OPEN |
| 5 | **docx / xlsx 文档处理修复** — [#1792](https://github.com/anthropics/skills/pull/1792)、[#2019](https://github.com/anthropics/skills/pull/2019) | LibreOffice 超时正确报错、xlsx 工作表级 defined names 误报修复；文档 skills 是 bug 修复最密集区域 | OPEN |
| 6 | **claude-api 文档修复** — [#1730](https://github.com/anthropics/skills/pull/1730)、[#1950](https://github.com/anthropics/skills/pull/1950) | 替换失效 URL、更新 Python SDK 1.1.0 pause_turn 行为；配合 #1487 的 156k token 注入问题，claude-api 是高关注度 skill | OPEN |
| 7 | **skill-creator 工程化改进** — [#1681](https://github.com/anthropics/skills/pull/1681)、[#1997](https://github.com/anthropics/skills/pull/1997) | 修复 `package_skill.py` 直接执行报错、YAML frontmatter 解析错误；skill 开发工具链自身质量是持续焦点 | OPEN |

> 注：该数据集中所有热门 PR 均为 OPEN 状态，评论数字段缺失，排序依据更新活跃度与关联 Issue 讨论量。

## 二、社区需求趋势

1. **安全与信任机制**（最热，46 评论）— [#492](https://github.com/anthropics/skills/issues/492)：社区 skill 冒用 `anthropic/` 命名空间造成信任边界滥用，呼吁签名/命名空间治理。
2. **组织级共享** — [#228](https://github.com/anthropics/skills/issues/228)：企业内共享 skill 库、直接分享链接，替代手动上传 `.skill` 文件。
3. **Skill 触发可靠性** — [#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)：评估框架误报 0% 触发率、并行 worker 交叉污染 UUID——skill 元数据优化不可信是开发者核心痛点。
4. **上下文经济性** — [#1487](https://github.com/anthropics/skills/issues/1487)：claude-api 一次性注入 156k token 耗尽上下文；[#1329](https://github.com/anthropics/skills/issues/1329) 提议 compact-memory 紧凑符号化记忆。
5. **AI 输出质量治理** — [#1385](https://github.com/anthropics/skills/issues/1385)：三阶段推理质量门（校准→对抗审查→交付验证）。
6. **安装与同步体验** — [#189](https://github.com/anthropics/skills/issues/189)、[#2108](https://github.com/anthropics/skills/pull/2108)：插件重复安装、synced 副本与仓库状态混淆。

## 三、高潜力待合并 Skills

- [#1298](https://github.com/anthropics/skills/pull/1298) skill-creator 评估修复 — 直接对应两个高热度 Issue，需求明确、维护者持续跟进 3 个月，合并概率最高。
- [#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder mcp>=2 适配 — 阻塞性兼容修复，关联上游 Issue。
- [#1997](https://github.com/anthropics/skills/pull/1997) YAML frontmatter 解析修复 — 小而准，修复元数据传递错误。
- [#1792](https://github.com/anthropics/skills/pull/1792) docx 超时校验 — 修复静默失败，11 月仍有更新。
- 新 skill 类：[#525](https://github.com/anthropics/skills/pull/525)（pyxel，上游作者背书）与 [#1245](https://github.com/anthropics/skills/pull/1245)（Notion spec→任务）长期活跃，但外部 skill 合并节奏偏慢。

## 四、生态洞察

**当前社区最集中的诉求是：让 Skills 从"能触发"走向"可信赖"——即修复 skill 触发/评估工具链的可靠性缺陷（skill-creator 相关 Issue+PR 占热榜近三分之一），并建立命名空间与权限层面的安全信任边界。**

---

# Claude Code 社区动态日报 — 2026-11-23

## 1. 今日速览

今日无新版本发布、无 PR 更新，社区动态集中在 Issue 讨论。安全与权限设计成为最热话题：密码输入硬阻断（#78160，25 条评论）引发关于“默认安全 vs 开发者自主权”的持续争论；同时新曝光两个安全/权限类 Bug——未加引号 heredoc 中的反引号命令注入（#111729）和 `--tools ""` 下模型伪造工具调用（#109152），值得安全敏感团队关注。此外多个 MCP 相关问题（elicitation 自动拒绝、云会话 GitHub MCP 失联、定时任务缺少鉴权头）在今日持续更新。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues（Top 10）

1. **[#78160](https://github.com/anthropics/claude-code/issues/78160)** — 密码输入硬阻断破坏合法开发/测试流程，请求权限门控的自主环境 opt-in。25 条评论、32 👍，本期最热；社区普遍认可默认安全，但强烈呼吁为 localhost/自有测试环境提供白名单机制。

2. **[#105770](https://github.com/anthropics/claude-code/issues/105770)** — Android 端在 root/解锁 bootloader 设备上登录失败（`/auth/verify_google_mobile` 返回 HTTP 400，Play Integrity 校验不通过）。20 条评论，影响 power 用户群体，目前标记为 invalid 但争议未平息。

3. **[#98256](https://github.com/anthropics/claude-code/issues/98256)** — MCP elicitation 能力已声明但交互式 VS Code 会话中请求被自动拒绝（"print mode"）。12 条评论、28 👍，MCP 生态集成的长期痛点，影响依赖 elicitation 的 MCP 服务器。

4. **[#91618](https://github.com/anthropics/claude-code/issues/91618)** — Windows 上 isolation-worktree 安全检查因盘符大小写（`D:\` vs `d:\`）比较误拒合法 worktree。有可复现步骤的回归问题，Windows 多会话工作流受阻。

5. **[#76624](https://github.com/anthropics/claude-code/issues/76624)**（已关闭）— 请求支持原位修改账户邮箱而非强制新建账户。11 条评论、18 👍，账户管理长期诉求，被以 invalid 关闭后仍有讨论。

6. **[#82700](https://github.com/anthropics/claude-code/issues/82700)** — Pro 订阅在 Claude Code 中被拒："organization has disabled subscription access"，完整重认证并升级客服后仍未解决。订阅/组织鉴权链路问题。

7. **[#111336](https://github.com/anthropics/claude-code/issues/111336)** — `[reasoning_extraction]` 安全防护误报阻断正常开发工作，一周内 78 次请求被拦截（跨 Fable 5.2 / Opus 5.5 / Sonnet 5.5）。安全护栏误报率问题的又一实证。

8. **[#111729](https://github.com/anthropics/claude-code/issues/111729)** — 未加引号 heredoc 中的 Markdown 反引号导致被禁命令实际执行。**今日新增的安全相关 Bug**，涉及权限绕过，建议关注后续修复。

9. **[#111395](https://github.com/anthropics/claude-code/issues/111395)** — Cowork 定时任务中远程 MCP 调用因缺少 `Mcp-Param-owner` 头（SEP-2243）返回 HTTP 400，会话转交互后恢复正常。今日仍在更新。

10. **[#84738](https://github.com/anthropics/claude-code/issues/84738)** — Advisor 轮次的 usage 将多次迭代 token 求和，导致上下文虚高一倍、auto-compact 提前约 300-500K token 触发，subagent 受影响最大。成本与上下文管理的准确性问题。

## 4. 重要 PR 进展

过去 24 小时无 PR 更新，本节省略。

## 5. 功能需求趋势

- **权限与安全精细化**：密码输入 opt-in 白名单（#78160）、heredoc 命令执行防护（#111729）、跨会话通信默认关闭并改为 opt-in 父子链路（#94582）——社区核心诉求是“安全默认 + 可配置豁免”。
- **MCP 可靠性**：elicitation 支持（#98256）、OAuth token 持久化（#84274）、云会话内置 GitHub MCP 加载（#111532）、定时任务鉴权头（#111395），MCP 仍是问题最集中的集成面。
- **多会话/多 agent 协作**：共享 checkout 下跨会话提问广播到所有会话（#103647）、并行会话互相污染上下文（#94582），反映多 agent 工作流已成主流但隔离机制不足。
- **Windows 平台质量**：盘符大小写回归（#91618）、usage 统计错误（#84738）等，Windows 用户反馈密度高。
- **账户与成本透明**：邮箱原位修改（#76624）、用量限制沟通（#94592）、API 错误 token 退还机制（#94567）。

## 6. 开发者关注点

- **安全护栏误报/误拦是最大痛点**：`reasoning_extraction` 误报（78 次/周）、密码硬阻断、heredoc 注入——开发者需要在安全与可用性之间获得更细粒度的控制权。
- **Token 统计与 auto-compact 准确性**：usage 求和错误导致上下文被提前压缩、隐性成本上升（#84738），直接影响长任务和 subagent 场景。
- **远程/云会话稳定性**：VS Code Remote-SSH 会话切换逐行重渲染（#111752，今日新增回归）、`/resume` 后键盘输入完全无响应（#111739）、桌面端“Can't reach your computer”（#94229）。
- **模型行为可信度**：`--tools ""` 下仍伪造 Write/Bash 调用并声称已执行（#109152），对构建自动化流水线的开发者是显著风险。
- **订阅/登录链路**：Android root 设备登录被拒、Pro 订阅组织权限错误等问题悬而未决，客服升级周期长。

---
*数据来源：github.com/anthropics/claude-code（过去 24 小时）*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 · 2026-11-23

## 📰 今日速览

今日无新版本发布，但社区活跃度依然很高。过去 24 小时内共更新 **50 个 Issues**（Windows 平台相关问题持续占据热榜）和 **29 个 PR**。TUI（终端界面）迎来一波密集的质量打磨，涵盖流式输出稳定性、tmux 兼容性、WebSocket 复用等改进；Issue 侧 Windows 桌面端的沙箱权限与 Computer Use 残留会话问题仍是最大痛点。

---

## 🚀 版本发布

过去 24 小时无新 Release。

---

## 🔥 社区热点 Issues（Top 10）

### 1. Windows Computer Use：截图回合结束后屏幕采集与金色边框未释放
**#57101** · 85 评论 · 15 👍 · [链接](https://github.com/openai/codex/issues/57101)
本月最热 Issue。Computer Use 完成截图回合后，屏幕采集权限和金/黄色提示边框持续存在，涉及用户隐私感知，社区讨论极为热烈，属于高优先级安全/信任类问题。

### 2. 功能请求：将 ChatGPT + Work + Codex 打造为连续工程工作区
**#61348** · 41 评论 · [链接](https://github.com/openai/codex/issues/61348)
用户希望 Codex 从“一次性任务”演进为持久化工程工作区（任务、记忆、会话连续性），代表了一大批重度用户的核心诉求。

### 3. [Windows][WSL] 桌面端将 `/home` 路径重写为 `C:\home`，丢失项目聊天关联
**#28094** · 27 评论 · [链接](https://github.com/openai/codex/issues/28094)
运行 5 个月未修的老 Issue，WSL 项目路径映射错误导致工作目录被误判为不存在，严重影响 WSL 开发者的日常使用。

### 4. Linux 沙箱拒绝 snapd 创建的合法 nsfs 挂载根
**#46110** · 26 评论 · 21 👍 · [链接](https://github.com/openai/codex/issues/46110)
👍 数最高的沙箱类 Issue。Ubuntu 原生环境下 snapd 的 nsfs 挂载导致 bubblewrap 构建失败，任何文件系统受限命令都无法执行。

### 5. [已关闭] macOS：更新后底部面板设置消失、终端被强制移至右侧
**#62234** · 20 评论 · 18 👍 · [链接](https://github.com/openai/codex/issues/62234)
今日关闭的热门 UI 回归问题，18 👍 说明影响面广，或已在近期版本中修复。

### 6. macOS Work 任务审批点击 Allow 后立即报 "approval request is no longer active"
**#53560** · 20 评论 · [链接](https://github.com/openai/codex/issues/53560)
审批流程在桌面端完全不可用但网页端正常，阻断 Work 用户的核心工作流，与 #60139（Windows 同类问题）疑似同根因。

### 7. [Dots] 委派任务完成后停滞，需反复人工提醒
**#49883** · 17 评论 · [链接](https://github.com/openai/codex/issues/49883)
子代理（subagent）委派链路在任务完成或遇到审批阻塞时中断，是自动化长任务场景的关键缺陷。

### 8. Windows：浏览器运行时启动前失败 `failed to write kernel assets`
**#41359** · 14 评论 · [链接](https://github.com/openai/codex/issues/41359)
浏览器控制插件在 bootstrap 阶段即失败，阻塞了 Windows 用户的浏览器自动化能力。

### 9. [Windows][Work] 发送首条消息后权限选择器消失，Work 强制 Cloud/TPP 无本地选项
**#62975** · 10 评论 · 6 👍 · [链接](https://github.com/openai/codex/issues/62975)
新近爆出（11-21 创建）且更新频繁。权限选择 UI 失效叠加 Work 环境强制云端执行，与 #62926（“Full access” 被忽略、以只读运行）共同指向 Windows 沙箱权限管理的系统性问题。

### 10. Windows 桌面端启动约 3 秒后整体冻结
**#63123** · 5 评论 · [链接](https://github.com/openai/codex/issues/63123)
昨日新报，事件日志记录 Application Hang 1002，等待链仅指向 ChatGPT.exe 自身，疑似前端渲染层死锁，值得关注后续复现情况。

---

## 🛠️ 重要 PR 进展（Top 10）

> 注：今日 PR 几乎全部由 `@copyberry[bot]` 提交并关闭，以 TUI/终端体验打磨为主。

### 1. TUI 自动恢复断线的云端会话
**#63211** · [链接](https://github.com/openai/codex/issues/63211)
断线重连后自动重新附加云端会话，避免显示内容落后于实际已保存的回复。

### 2. 复用运行时认证的 Responses WebSocket 连接
**#63175** · [链接](https://github.com/openai/codex/pull/63175)
避免每次请求重新握手并重发完整输入，直接降低延迟与带宽开销，是性能类的关键改进。

### 3. Codex 可在终端侧边栏打开工作区文件
**#63184** · [链接](https://github.com/openai/codex/pull/63184)
新增 `open_in_codex` MCP 工具，文档、图片、源码行可在对话旁内联查看，显著提升终端工作流的信息密度。

### 4. Command Center 搜索支持按创建时间排序
**#63208** · [链接](https://github.com/openai/codex/pull/63208)
`Tab` 键切换 `Updated` / `Created` 排序，解决新任务被旧任务淹没的问题。

### 5. 修复新云端会话的账户刷新逻辑
**#63171** · [链接](https://github.com/openai/codex/pull/63171)
修复 provider 切换时 TUI 读取云端后端不暴露的配置导致的错误。

### 6. 流式输出稳定性三连修
**#63196** / **#63194** · [链接](https://github.com/openai/codex/pull/63196) · [链接](https://github.com/openai/codex/pull/63194)
修复 Markdown 表格在流入 scrollback 时的短暂消失，以及警告通知打断流式回答导致的内容重复问题。

### 7. 重绘前保持流式输出可见（含宽字符换行计数修正）
**#63151** · [链接](https://github.com/openai/codex/pull/63151)
正确计算双宽字符（如中文、长 URL）占用的行数，修正历史插入时的行数统计。

### 8. 尊重 tmux 鼠标设置变更（alternate screen 模式）
**#63195** · [链接](https://github.com/openai/codex/pull/63195)
tmux 不通知 pane 鼠标选项变化，此 PR 通过轮询保持鼠标捕获与 tmux 设置同步。

### 9. 提高 Linux 48kHz 语音回调周期
**#63169** · [链接](https://github.com/openai/codex/pull/63169)
解决 PipeWire 大周期图下 ALSA 采集环形缓冲溢出导致的麦克风丢样本问题。

### 10. 代理命令中心：任务加载进度与分页修复
**#63145** / **#63146** · [链接](https://github.com/openai/codex/pull/63145) · [链接](https://github.com/openai/codex/pull/63146)
窄列表下保持任务状态可见、修复按固定行数分页跳过任务的问题、增加加载进度指示。

**其他值得一看**：#63192（输入时延迟数字选项抢焦点）、#63193（rewind/fork 后丢弃 typeahead 防误提交）、#63152（保留宿主终端光标形状）、#63174（`url` 2.5.9 依赖更新）。

---

## 📈 功能需求趋势

从近期 Issues 提炼出五大方向：

1. **持久化工程工作区**：#61348、#55485 集中反映用户希望任务、会话、子代理状态可跨中断存活（durable job state、安全恢复、工作区重校验）。
2. **子代理编排增强**：#24704（fork 后丢失 prompt-cache 血统，20 👍）、#51658（自适应原生编排提案）、#49883 表明 subagent 是最活跃的功能话题之一。
3. **沙箱与权限管理可控性**：Windows 权限选择器消失、Full access 被忽略、Linux snapd/嵌套沙箱失败——多平台沙箱问题集中爆发。
4. **UI/UX 可配置性**：#24731（新聊天默认 No Project）、#26819（推理强度/模型切换快捷键）、#37705（听写热键 Insert/Send 模式）。
5. **用量与配额透明度**：#62359 要求更诚实的可用性提示与付费重置选项，#61548 反映 Ultra 档位未生效到 GPT-6.1 Sol。

---

## ⚠️ 开发者关注点（痛点总结）

- **Windows 是重灾区**：热榜 Top 10 中 7 条与 Windows 相关（WSL 路径映射、沙箱、Computer Use 残留、启动冻结、审批失效），且多为更新引入的回归，建议 Windows 用户暂缓自动更新关键版本。
- **审批流程跨平台失效**：macOS（#53560）与 Windows（#60139）均出现 "approval request is no longer active"，但网页端正常，疑似桌面 app-server 与审批状态的同步缺陷。
- **Computer Use 的隐私边界**：#57101 的采集/边框残留问题触碰用户信任底线，社区期待明确的资源释放保证。
- **Linux 沙箱兼容性碎片化**：snapd nsfs（#46110）、嵌套沙箱 0700 检查冲突（#53799）表明 bubblewrap 方案与主流 Linux 发行版组件存在兼容缺口。
- **CLI 缓存效率**：subagent fork 不继承 prompt-cache（#24704，20 👍）直接推高长上下文任务成本，是 CLI 重度用户的高频抱怨。

---
*数据来源：github.com/openai/codex · 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-11-23

## 1. 今日速览

今日发布 nightly 版本 v0.71.0，社区活跃度集中在 **子代理（Subagent）体系**：Agent 互相调用、AST 感知工具、Agent 沙箱化成为讨论焦点。ACP（Agent Client Protocol）相关修复集中涌现，社区贡献者 @sayaklearner-prog 密集提交多个 ACP 修复 PR，成为当日最活跃的贡献者之一。

---

## 2. 版本发布

**v0.71.0-nightly.20261122.geecccfcd5**
- 自动化 nightly 版本发布（[#30399](https://github.com/google-gemini/gemini-cli/pull/30399)）
- [完整变更记录](https://github.com/google-gemini/gemini-cli/compare/v0.71.0-nightly.20261121.geecccfcd5...v0.71.0-nightly.20261122.geecccfcd5)

---

## 3. 社区热点 Issues

**1. [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 后被误报为 GOAL 成功**（p1，14 评论）
子代理超限中断却被标记为成功，掩盖真实失败原因。这直接影响 Agent 可靠性与结果可信度，是最需要优先修复的可观测性问题。

**2. [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由**（p2，9 评论）
利用 Gemini 3 原生 bash 能力（grep/sed/awk 链式操作）同时保证安全性。这是 Agent 安全架构的重要方向性提案。

**3. [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) 通用 Agent 挂起**（p1，8 评论，8 👍）
generalist agent 挂起超过一小时无响应，用户只能通过禁止子代理绕过。高优先级稳定性问题。

**4. [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知文件读取/搜索/映射影响评估**（p2，7 评论）
EPIC 级议题：用 AST 精确读取方法边界、减少无效读取与 token 噪音，配套子议题 #22746、#22747（推荐 ast-grep）。

**5. [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 主动使用 skills 和 sub-agents 不足**（p2，7 评论）
模型几乎不主动调用自定义技能与子代理，需显式指令才触发。Agent 自主调度能力是普遍痛点。

**6. [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 配置覆盖**（p2，5 评论）
AgentRegistry 正确合并配置但 Browser Agent 不生效，maxTurns 等覆盖失效。

**7. [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) Browser 子代理在 Wayland 下失败**（p1，4 评论）
Linux Wayland 环境 browser subagent 报错，影响 Linux 桌面用户。

**8. [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 工具数 >128 时触发 400 错误**（p2，3 评论）
MCP 工具重度用户的典型问题，Agent 应智能裁剪工具作用域。

**9. [#23571](https://github.com/google-gemini/gemini-cli/issues/23571) 模型在随机目录创建临时脚本**（p2，3 评论）
Shell 执行受限时模型乱放编辑脚本，污染工作区、增加清理成本。

**10. [#22598](https://github.com/google-gemini/gemini-cli/issues/22598) 子代理轨迹应可通过 /chat share 查看**（2 评论）
子代理轨迹已保存但难以访问，影响调试与评估效率。

---

## 4. 重要 PR 进展

**1. [#30409](https://github.com/google-gemini/gemini-cli/pull/30409)（已关闭）/ [#28738](https://github.com/google-gemini/gemini-cli/pull/28738) 允许 Agent 调用其他 Agent**
子代理通过 `tools:` 声明委托其他子代理或递归调用自身，带嵌套深度限制。多个 PR 并行推进，是本周 Agent 架构核心变更。

**2. [#30196](https://github.com/google-gemini/gemini-cli/pull/30196)（已关闭）阻止为受污染的 shell 命令保存 always-allow 规则**
安全修复：构建文件变更后的不可信命令只能“仅本次允许”，防止永久放行 `npm` 等命令。

**3. [#30298](https://github.com/google-gemini/gemini-cli/pull/30298) ACP 模式下并行执行独立工具调用**
修复 ACP 模式串行执行问题，使只读独立工具调用可批量并行，与标准 CLI 调度器对齐。

**4. [#30297](https://github.com/google-gemini/gemini-cli/pull/30297) ACP 模式下截断超大的 shell/MCP 输出**
防止巨型日志或目录树直接灌入模型上下文。

**5. [#30353](https://github.com/google-gemini/gemini-cli/pull/30353) ACP token 用量追踪标准化**
取消的回合保留 usage 数据，修复 ACP 客户端配额元数据丢失问题。

**6. [#30277](https://github.com/google-gemini/gemini-cli/pull/30277) 沙箱权限拒绝检测与受限环境处理改进**
改善容器化/受限环境下 POSIX 沙箱错误识别。

**7. [#30405](https://github.com/google-gemini/gemini-cli/pull/30405) a2a-server 处理 fire-and-forget 调度器拒绝**
未处理的 Promise 拒绝会击穿整个 a2a-server 进程并拖垮所有运行中任务。

**8. [#30404](https://github.com/google-gemini/gemini-cli/pull/30404) 修复 checkpoint 名称错误截断**
文件名含 `.json`（如 package.json）时 `/restore` 失败的问题。

**9. [#30281](https://github.com/google-gemini/gemini-cli/pull/30281) Node 26 上 fetch 超时配置生效**
升级 Undici 至 7.30.2，修复 Node 26 内置 fetch 忽略全局 dispatcher 的问题。

**10. [#30316](https://github.com/google-gemini/gemini-cli/pull/30316) 保留自定义模型别名生成设置**
修复 flash-lite 等 tier 别名解析后设置丢失的问题。

其他：[#30400](https://github.com/google-gemini/gemini-cli/pull/30400)（ACP+沙箱初始化挂起修复）、[#30401](https://github.com/google-gemini/gemini-cli/pull/30401)（MCP 工具刷新保留超时配置）、[#30406](https://github.com/google-gemini/gemini-cli/pull/30406)（文档修正 folder trust 默认开启）。

---

## 5. 功能需求趋势

- **子代理体系深化**：Agent 调用 Agent、并行协作与共享内存（#18287）、子代理轨迹可观测性（#22598、#21763），是当前最密集的 workstream。
- **AST 感知代码理解**：AST-aware 读取/搜索/映射（#22745-22747）+ token 节约的"Tactful Extraction"（#19561），指向“精准、低成本”的代码探索方向。
- **Agent 安全与沙箱**：零依赖 OS 沙箱（#19873）、破坏性操作防护（#22672）、tainted 命令白名单限制（#30196）。
- **Browser Agent 成熟化**：配置覆盖、Wayland 支持、会话接管与锁恢复（#22232）。
- **ACP/A2A 协议完善**：token 追踪、并行工具调用、hook 拒绝事件透出等持续打磨。

---

## 6. 开发者关注点

1. **Agent 可靠性是首要痛点**：挂起（#21409）、误报成功（#22323）、交互提示卡死（#22465）——Agent 的失败模式缺乏透明度。
2. **Agent 自主性不足**：模型不主动使用 skills/subagents（#21968），需要用户显式干预。
3. **工具数量上限**：MCP 重度用户遭遇 128 工具 400 错误（#24246），工具管理智能化需求迫切。
4. **工作区卫生**：临时脚本乱放（#23571）让干净提交变得困难。
5. **配置一致性**：symlink 子代理不识别（#20079）、settings.json 覆盖被忽略（#22267）等配置边界问题反复出现。
6. **上下文成本**：大文件读取"firehose"式灌入上下文（#19561），开发者对 token 效率敏感。

---
*数据来源：github.com/google-gemini/gemini-cli · 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-11-23

## 📌 今日速览

新版本 **v1.0.115-7** 发布，修复了 `--ui-server` 会话恢复与 npm 安装版启动残留进程两个问题。社区方面，**云端沙箱（cloud sandbox）会话连接稳定性**成为新爆发点（#5552、#5553），容器化部署与连接令牌机制也有新的 PR 推进（#5554）。

---

## 🚀 版本发布

### [v1.0.115-7](https://github.com/github/copilot-cli/releases)
**Fixed**
- 使用 `--ui-server` 的客户端现在可以在服务器开始监听后立即附加到恢复的 CLI 会话
- 修复 npm 安装的 Copilot CLI 在启动期间被终止时，不会在后台残留进程

---

## 🔥 社区热点 Issues

1. **[#5552](https://github.com/github/copilot-cli/issues/5552) 云端沙箱会话在工具调用后永久断连**
   工具调用结束后出现 "Live connection unavailable"，重试始终失败，仅剩只读历史。云端沙箱是较新能力，连接可靠性问题直接影响可用性，昨日新报，待官方回应。

2. **[#5553](https://github.com/github/copilot-cli/issues/5553) GitHub Mobile (Android) 云端会话切后台即断连**
   应用后台化或空闲 2-3 分钟后连接掉线，重试常失败，需强制重启应用。与 #5552 同一作者，指向云端会话生命周期的系统性问题。

3. **[#5544](https://github.com/github/copilot-cli/issues/5544) `web_fetch` 仍拒绝 Surge Fake-IP 解析的公网 URL**
   #5180 关闭后问题在 1.0.114 上依旧复现。代理/VPN 用户的网络兼容性问题持续存在，回归修复不彻底值得关注。

4. **[#5550](https://github.com/github/copilot-cli/issues/5550) `gh` 在 PATH 上时，内置 GitHub MCP 读工具对自定义 Agent 不可用**
   影响自定义 Agent 通过内置 MCP 读取 Issues 的核心场景，涉及工具解析优先级设计。

5. **[#5547](https://github.com/github/copilot-cli/issues/5547) install.sh 的 `VERSION=prerelease` 装到比稳定版更旧的构建**
   Git 的 version:refname 排序将 `v1.0.114` 排在其预发布之前，与 semver 语义相反，安装脚本逻辑缺陷。

6. **[#5543](https://github.com/github/copilot-cli/issues/5543) 嵌套子 Agent 无法多轮对话**
   子 Agent 启动的子 Agent 强制同步执行，background 模式被静默忽略，与 changelog 宣称的多轮子 Agent 能力不符。

7. **[#5546](https://github.com/github/copilot-cli/issues/5546) 企业过滤网络下 TLS 握手失败（Schannel 错误）**
   访问 `api.individual.githubcopilot.com` 时 TLS alert 40，公司网络环境下无法启动，已标记 needs-human。

8. **[#2622](https://github.com/github/copilot-cli/issues/2622) 手动 `/rename` 被自动生成的会话名覆盖（OPEN）**
   长期未关闭的用户体验问题，会话管理是高频操作，自动命名策略需要尊重用户显式设置。

9. **[#5309](https://github.com/github/copilot-cli/issues/5309) 内容过滤响应后误报 `model_not_supported`（已关闭）**
   实际是内容过滤触发却报模型不支持，误导排查方向。已修复关闭。

10. **[#3601](https://github.com/github/copilot-cli/issues/3601) Bash 工具因 `LC_CTYPE=C` 静默丢弃非 ASCII 字符（已关闭）**
    中文/日文路径等被剥离导致文件操作失败，对非英语用户影响重大，修复关闭是好消息。

> 其他值得关注：#1851（`/model` 显示上下文窗口大小，👍5，已实现关闭）、#5551（ACP 模式下图像生成不可用，已关闭）、#4581（为开发者生成图标/OG 图片等视觉资产，已关闭）。

---

## 🔀 重要 PR 进展

> 过去 24 小时仅更新 2 个 PR，全部列出：

1. **[#5554](https://github.com/github/copilot-cli/pull/5554)（OPEN，新提交）支持容器中挂载和生成的连接令牌**
   为 headless 容器引入 SDK 客户端共享密钥：支持 `COPILOT_CONNECTION_TOKEN_FILE` 从挂载的 secret 读取，并区分于用户 GitHub token，兼顾 K8s 部署与本地试用场景。是容器化方向的重要改进。

2. **[#5310](https://github.com/github/copilot-cli/pull/5310)（已关闭）修复容器冒烟测试工作区权限**
   临时工作区 `0700` 权限导致运行时用户（UID 10001）无法访问，影响 amd64/arm64 CI。已合并关闭。

---

## 📈 功能需求趋势

- **云端沙箱 / GitHub Mobile 集成**：连接稳定性成为当前最高优先级的新痛点（#5552、#5553）
- **会话管理增强**：社区希望补齐 `resume_session` / `suspend_session` 工具与侧边栏挂起操作（#5549）
- **容器化与 headless 部署**：连接令牌、CI 冒烟测试、workspace 权限（#5554、#5310）显示企业部署场景快速增长
- **多 Agent 协作**：嵌套子 Agent 的多轮对话、后台模式（#5543）是 Agent 能力演进的关键诉求
- **多模态/工具生态**：图像生成能力扩展到 ACP 会话与开发者资产（#5551、#4581）
- **模型透明度**：在 `/model` 中展示上下文窗口大小（#1851）已落地

---

## ⚠️ 开发者关注点

1. **网络环境兼容性**是长期痛点：企业 TLS 过滤（#5546）、Surge Fake-IP（#5544）、私有 Feed 401（#4035）等问题反复出现，建议部署前验证网络策略。
2. **国际化正确性**：非 ASCII 字符在 Bash 工具中被丢弃的问题（#3601）已修复，非英语用户建议升级。
3. **安装渠道可靠性**：`VERSION=prerelease` 语义错误（#5547）提示脚本安装用户注意版本核对。
4. **错误信息可诊断性**：内容过滤误报为模型不支持（#5309）类问题会误导排障，升级到最新版可规避。
5. **升级建议**：使用 npm 安装或 `--ui-server` 的用户应升级至 **v1.0.115-7**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-23

## 今日速览

今日无新版本发布，社区讨论聚焦多智能体（Subagent）体验与上下文压缩（Compaction）两大主题。核心维护者 @Hona 密集提交了一批桌面端性能优化 PR（timeline 滚动、模型选择器布局抖动等），并关闭了多个已修复的 bug。MCP 远程服务器工具截断（>61 个工具被静默丢弃）和会话压缩性能问题引发较多讨论。

## 版本发布

过去 24 小时无新 Release。

## 社区热点 Issues

1. **[#64073](https://github.com/anomalyco/opencode/issues/64073) 恢复前台 Subagent 执行** — 25 条评论、8 👍，今日最热。社区强烈要求恢复 V2 中移除的前台子智能体执行能力，反映 V1→V2 迁移功能回退问题持续发酵。

2. **[#52941](https://github.com/anomalyco/opencode/issues/52941) 桌面端文件树/预览面板显示过期内容** — 16 条评论，已被标记 reproduced。Agent 编辑文件后 Review 面板不刷新，直接影响核心工作流可信度。

3. **[#60250](https://github.com/anomalyco/opencode/issues/60250) Plan 模式失效：Agent 直接改代码** — 15 条评论，已关闭。v2.2.1 中 Plan agent 无视提醒直接实施修改，属行为约束类高优先级 bug。

4. **[#43250](https://github.com/anomalyco/opencode/issues/43250) keep.tokens 不生效，上下文膨胀至 234K** — 11 条评论，今日仍有更新。压缩拆分的回溯逻辑无界且跳过合成消息，设置 15K 实际保留 5-15 倍，直接关联 token 成本。

5. **[#12716](https://github.com/anomalyco/opencode/issues/12716) 推理/输出阶段的 Doom loop 未被捕获** — 11 条评论，已关闭。Agent 陷入无限循环时的防护缺口。

6. **[#41249](https://github.com/anomalyco/opencode/issues/41249) TUI 中的实时 Subagents 侧边栏** — 10 条评论，已关闭。社区开发者已自建插件（opencode-subagents-view），官方侧需求旺盛。

7. **[#65590](https://github.com/anomalyco/opencode/issues/65590) MCP：远程服务器 >61 个工具被静默截断** — 9 条评论，当日新报已关闭。影响大型 MCP 服务器集成，握手后新增工具报 `Unknown tool`。

8. **[#21227](https://github.com/anomalyco/opencode/issues/21227) 聊天 UI 展示工具返回的图片** — 8 评论、14 👍（点赞最多）。webfetch 与 MCP ImageContent 返回的图片目前无法在 UI 中显示。

9. **[#65549](https://github.com/anomalyco/opencode/issues/65549) 压缩时 prompt-cache 全量 miss** — 5 条评论，当日新报已关闭。压缩请求 system prompt 与缓存前缀不一致，本地后端 50K token 重处理耗时约 456 秒，性能痛点突出。

10. **[#64484](https://github.com/anomalyco/opencode/issues/64484) 2.3.0 间歇性 ECONNRESET** — 5 条评论。#60399 修复后问题仍复现，出错会话需在其他会话发消息才能恢复，Windows 用户受影响明显。

## 重要 PR 进展

1. **[#65261](https://github.com/anomalyco/opencode/pull/65261) feat(core): Agent Widgets** — Agent 可在会话中展示交互式组件（PsychoScript 模板 + JSON 数据，各客户端原生渲染），是本周最重要的新特性 PR，今日仍在活跃更新。

2. **[#65631](https://github.com/anomalyco/opencode/pull/65631) perf(app): 移除 timeline 滚动帧的强制布局** — 消除滚动帧中的同步样式/布局计算；作者明确说明不包含历史滚动跳变修复，态度严谨。

3. **[#65635](https://github.com/anomalyco/opencode/pull/65635) fix(app): 消除模型选择器布局抖动** — 基于 92 模型/19 provider 目录的性能剖析，修复打开、滚动、选择时的 layout thrash。

4. **[#63998](https://github.com/anomalyco/opencode/pull/63998) feat(server): 实验性 Spaces** — 服务器级实验功能（feature flag 控制），提供 `PUT/DELETE /api/experimental/space/:space/:key` 写入能力。

5. **[#65633](https://github.com/anomalyco/opencode/pull/65633) feat: 实验性 session cwd** — 会话可携带独立工作目录，支持配对机器，向后兼容，位于 `machines` feature flag 之后。

6. **[#58929](https://github.com/anomalyco/opencode/pull/58929) fix(core): 重启时跳过其他存活进程持有的执行声明** — 修复多 `opencode serve` 共存时启动扫描误判孤儿任务的问题，长期 PR 今日继续推进。

7. **[#61414](https://github.com/anomalyco/opencode/pull/61414) fix(core): 保留 Subagent 中父级中断原因** — 配合 issue #61413，修复父会话关闭导致子智能体被误记为用户停止的问题，已合并关闭。

8. **[#65634](https://github.com/anomalyco/opencode/pull/65634) perf(app): 后台活动菜单流畅性** — 20 个并发 subagent 时菜单滚动低于 1 FPS，本 PR 消除每帧/每事件的四重开销叠加，已关闭。

9. **[#65642](https://github.com/anomalyco/opencode/pull/65642) feat(desktop): Windows 跳转列表显示最近项目** — 从原生 Rune 桌面版移植的 Windows 集成小功能。

10. **[#62480](https://github.com/anomalyco/opencode/pull/62480) fix(core): 压缩输出限制按缩短后请求的剩余空间计算** — 修复自动压缩时摘要输出 token 被错误限流的问题，已合并，与 #43250/#65549 一同构成压缩相关改进主线。

## 功能需求趋势

- **多智能体可观测性**：Subagent 侧边栏/状态面板是最集中的需求（#64073、#41249、#57097、#37431、#12463、#27995、#65610），横跨 TUI 与桌面端，多与 V1→V2 迁移中的功能回退有关。
- **上下文压缩质量与成本**：keep.tokens 失效、缓存 miss、输出限流、自动压缩调度（#43250、#65549、#62480、#65643）持续高频。
- **桌面端 UI 正确性与性能**：文件树不刷新、Mermaid 图片、低配机器卡顿、内存占用（#52941、#62893、#65496、#65566/65568）。
- **MCP 生态兼容**：工具截断、VSCodium 支持（#65590、#63194）。
- **自定义 Provider 回归**：V1 的自定义 Provider 选项在 V2 桌面端被移除，用户呼吁恢复（#65578）。

## 开发者关注点

- **V2 迁移信任危机**：多项 V1 已有功能（前台 subagent、侧边栏、自定义 Provider）在 V2 中缺失，是社区不满的最大来源。
- **Token 成本失控**：压缩机制缺陷导致上下文保留量远超配置、缓存全量 miss，直接影响 API 开销与响应延迟。
- **稳定性与资源占用**：ECONNRESET、服务自我终止（#65600）、CLI 内存飙升、低配 Windows 不可用等问题影响日常可用性。
- **中文社区活跃度上升**：今日出现多条中文 issue（#65610、#65643、#65585），文档与支持渠道的国际化值得关注。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-11-23

---

## 📰 今日速览

今天项目发布了 **v0.28.4** 及桌面版 v0.28.4，重点增强了 Web Shell 的本地 daemon 模式（新增工作区 artifact 库页面与共享 ChatSurface）。社区方面，Windows 下 `@` 文件引用静默丢失的 bug（#18141）当天即有配套修复 PR 提交（#18142），响应迅速。CI 稳定性问题（Managed Agent gate、E2E 测试）仍是 Issue 区的讨论焦点。

---

## 🚀 版本发布

**v0.28.4** & **desktop-v0.28.4**（[Release](https://github.com/QwenLM/qwen-code/releases)）

- Web Shell 本地 daemon 模式新增工作区 **artifact 库页面**，支持渐进式扫描与流式更新（[#18071](https://github.com/QwenLM/qwen-code/pull/18071)）
- Web Shell 聊天引入共享 **ChatSurface**、Continue 徽章与 suggestion chip
- 测试增强：managed-agent 全栈 E2E 中观察真实的定时 /loop 触发（#17506）

---

## 🔥 社区热点 Issues

1. **#14724 — Managed Agent gate CI 失败，无法定位测试**（545 评论）
   运行时间最长、讨论最多的 CI 追踪 Issue，10 月至今未关闭，反映主分支 CI 长期不稳定。
   [链接](https://github.com/QwenLM/qwen-code/issues/14724)

2. **#11680 — E2E Tests CI 失败（Docker sandbox shard）**（106 评论）
   与 #14724 同类的长期追踪 Issue，最新失败于 11-22。
   [链接](https://github.com/QwenLM/qwen-code/issues/11680)

3. **#11678 — Qwen Code CI Windows Node 22 测试失败**（68 评论）
   Windows 平台主 CI 持续失败，autofix 进行中。
   [链接](https://github.com/QwenLM/qwen-code/issues/11678)

4. **#13078 — 每日依赖 CVE 审计失败**（62 评论，已关闭）
   安全审计流水线问题，现已解决，值得关注 npm audit 端点稳定性。
   [链接](https://github.com/QwenLM/qwen-code/issues/13078)

5. **#17934 — daemon 被 SIGKILL 后会话恢复 E2E 失败**（40 评论）
   涉及 daemon 崩溃恢复这一核心可靠性场景。
   [链接](https://github.com/QwenLM/qwen-code/issues/17934)

6. **#18141 — Windows：@ 补全/拖放的含空格括号文件被静默丢弃**（今日新提，2 评论）
   中文文件名场景（`@测试\ 文档.md`）实测可复现，直接影响数据完整性；当天已有修复 PR #18142。
   [链接](https://github.com/QwenLM/qwen-code/issues/18141)

7. **#18135 — SGLang 平坦 400 响应导致上下文溢出未被检测**（P2）
   OpenAI SDK 只读 `error` 字段，SGLang 的扁平错误体被丢弃，上下文超限静默失败。
   [链接](https://github.com/QwenLM/qwen-code/issues/18135)

8. **#18136 — Gemma 3/4 被误判为纯文本模型，图片不发送**（P2）
   影响通过 Ollama/vLLM 使用 Gemma 多模态能力的用户。
   [链接](https://github.com/QwenLM/qwen-code/issues/18136)

9. **#18127 — Managed Agent 取消操作因前序 turn 清理未确认而卡死**（P2）
   Turn 停留在 `CANCELLING`，影响托管服务稳定性；同系列 #18130 已关闭，说明该区域在快速迭代。
   [链接](https://github.com/QwenLM/qwen-code/issues/18127)

10. **#18107 — /btw 流式回答按源码行数而非折行行数截断**（P2）
    长行会挤爆行预算并推动整个 transcript，UI 渲染逻辑问题。
    [链接](https://github.com/QwenLM/qwen-code/issues/18107)

---

## 🔀 重要 PR 进展

1. **#18142 — 修复 Windows 转义 @ 路径解析**（新开）
   解决 #18141，覆盖提示提交、嵌套补全、粘贴路径等场景。[链接](https://github.com/QwenLM/qwen-code/pull/18142)

2. **#18111 — 支持超大 session transcript 的 daemon 加载与回放**
   加固长会话的恢复、索引、artifact 加载与批量回放，超出限制时安全失败。[链接](https://github.com/QwenLM/qwen-code/pull/18111)

3. **#18140 — Web Shell 侧边栏支持 per-workspace 管理**
   每个本地受信工作区均可直接管理，不再限于主工作区。[链接](https://github.com/QwenLM/qwen-code/pull/18140)

4. **#18114 — Managed Agent 在外部 Workspace Worker 上执行扩展**
   外部 Worker 可执行 Skills、脚本、MCP 工具与 hooks，保留 provider 身份。[链接](https://github.com/QwenLM/qwen-code/pull/18114)

5. **#18115 — Phase 4：可恢复 Action 等待密封证书挂起**（已合并）
   会话可在工具审批等待期间挂起，不再常驻或中止。[链接](https://github.com/QwenLM/qwen-code/pull/18115)

6. **#17437 — CLI 与 Web Shell 完整阿拉伯语支持（含 RTL 布局）**
   覆盖核心、CLI、Web Shell 及 HTML 导出 transcript 的国际化大项。[链接](https://github.com/QwenLM/qwen-code/pull/17437)

7. **#18139 — 保留推断 K3 路由的强制 reasoning 配置**
   完成 Kimi K3 推理参数归一化，避免注入冲突默认值。[链接](https://github.com/QwenLM/qwen-code/pull/18139)

8. **#18032 — Ink 历史召回时保留粘贴文本**
   Up 召回提示词时恢复原始剪贴板内容而非显示占位文本。[链接](https://github.com/QwenLM/qwen-code/pull/18032)

9. **#18058 — Managed Agent 身份列去哈希化重构**
   哈希键改为有界 VARCHAR + 可逆规范化引用，提升可读性与可调试性。[链接](https://github.com/QwenLM/qwen-code/pull/18058)

10. **#18131 — 限制 Managed Monitor 观察窗口内存**
    观察窗口上限 1000 条 / 32 KiB，防止内存无限增长。[链接](https://github.com/QwenLM/qwen-code/pull/18131)

---

## 📈 功能需求趋势

- **Web Shell 体验深化**：artifact 库、侧边栏多工作区管理、触屏编辑栏布局、ChatSurface 共享——Web Shell 是当前最活跃的开发主线。
- **多模型/多后端兼容**：SGLang 错误处理（#18135）、Gemma 3/4 多模态（#18136）、Kimi K3 reasoning 归一化（#18139）。
- **Managed Agent / 托管架构**：外部 Worker 扩展执行、Action 挂起、取消恢复等状态机硬化，是后端投入最大的方向。
- **Windows 平台**：更新器 PowerShell 依赖（#13065）、@ 路径转义（#18142）持续修复。
- **国际化**：阿拉伯语 RTL 支持显示社区语言贡献面在扩大。

---

## 🛠️ 开发者关注点

1. **CI 不稳定是最大痛点**：前 4 条热门 Issue 全部是 CI 失败追踪（合计 700+ 评论），涵盖 Managed Agent gate、E2E、Windows 单元测试和 CVE 审计；`deflake` 类 Issue（#18113、#18119）高频出现，CI Failure Patrol + autofix 机器人流程在积极运转但尚未收敛。
2. **静默失败不受容忍**：SGLang 错误丢弃、@ 引用静默跳过、telemetry 丢失 `top_k`（#18106）——社区对“不报错但行为错误”的反馈集中，且历史 PR #12665（报告被丢弃的 @ 引用）与今日 #18141 呼应，说明该问题存在已久。
3. **长会话/大 transcript 的健壮性**：#18111、#18097 显示大体积会话的加载与分页是实际使用中暴露的问题。
4. **测试质量债务在有序偿还**：wenshao 密集提交 post-merge follow-up 与测试覆盖增强 PR（#18093、#18097），项目对测试覆盖有明确的追踪机制。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*