# AI CLI 工具社区动态日报 2026-10-02

> 生成时间: 2026-10-01 23:52 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告（2026-10-02）

## 一、生态全景

AI CLI 工具已从“终端问答助手”全面演进为**多智能体编排平台**，Claude Code 的 Mods 插件体系、Codex 的 dot/Dots 多代理、Gemini CLI 的子代理互调、Qwen Code 的 Managed Agent 架构均指向同一方向。与此同时，各工具均进入“深水区工程化”阶段：数据丢失、静默失败、权限竞态、token 成本等可靠性问题取代功能缺失成为社区主要抱怨。头部厂商（Anthropic、OpenAI、Google、GitHub）投入密集迭代，Windows 桌面端和云端派发成为共同的薄弱环节。

## 二、各工具活跃度对比

| 工具 | 今日 Issue 热点 | PR 活动 | Release | 迭代节奏 |
|------|----------------|---------|---------|----------|
| **Claude Code** | 10+ 热点（Mods Meta Issue 227 评论） | 5 条 | v2.1.287（Mods 体系落地） | 稳定版+快速回滚收敛 |
| **OpenAI Codex** | 10+ 热点（Windows 问题占过半） | 20+ 条（含 9 个 alpha 版本配套） | v0.160.0 稳定 + 9 alpha | 最密集，稳定/alpha 双轨 |
| **Gemini CLI** | 50 条 Issue 更新、10 热点 | 37 条更新、10 关键 PR | v0.64.0 nightly | nightly 高频，P1 修复密集 |
| **GitHub Copilot CLI** | 10 热点（回归类为主） | 仅 1 条 | 3 个版本（v1.0.91~92-0） | 版本密集但 PR 不透明 |
| **Qwen Code** | 10 热点 + 多个 P1/P2 审计 | 12+ 条 | v0.24.7 nightly | nightly + 架构性推进 |
| **OpenCode** | 存量清理为主 | 10 条（含 7 条集中关闭） | 无 | 平静期 |
| **Kimi Code CLI** | 无 | 无 | 无 | 静默 |

**总体**：Codex、Gemini CLI、Qwen Code 处于工程活跃峰值；Claude Code 社区讨论热度最高（Mods 生态）；Copilot CLI 版本发布频繁但开发过程闭源化；OpenCode、Kimi Code 明显降温。

## 三、共同关注的功能方向

**1. 多智能体/插件扩展架构**（全部主流工具）
- Claude Code：Mods 体系 + 守护型 Mod（#91870，227 评论）
- Codex：V2 子代理动态工具继承（PR #50082）、dot 多代理集成
- Gemini CLI：agents 调用 agents（PR #28738）、子代理后台化（#22741）
- Qwen Code：Managed Agent 双路径架构（#12380，38 评论）为路线图总纲

**2. Agent 失败的静默误报**（跨工具的可观测性危机）
- Gemini CLI：子代理 MAX_TURNS 后误报 success（#22323，P1）
- OpenCode：`MALFORMED_FUNCTION_CALL` 被上报为成功（#52378）
- Claude Code：云端派发计划信息丢失（#98836/#98837）
- → **“假成功”是当前 agent 链路最危险的一类缺陷**

**3. 数据可靠性与静默失败**
- Claude Code：Windows 会话批量消失（#98828）
- Gemini CLI：会话历史误删（PR #29584）、状态文件损坏恢复
- OpenCode：Desktop 无响应且 UI 无报错（#49561）
- Codex：rollout 文件膨胀至 GB 级（#42345）

**4. Token 成本精细化**
- Gemini CLI：二进制误注入上下文、工具数 >128 报错
- Qwen Code：非对话上下文 token 治理（#12028）、工具延迟声明
- Claude Code：Opus 5.5 行为漂移致成本异常（#98679）

**5. Windows 桌面端质量**（Codex 6 条、Copilot/OpenCode/Qwen 均有）——组织设置加载失败、MSIX 路径虚拟化、控制台窗口闪烁、IME 兼容等，Windows 是全行业短板。

**6. 沙箱与企业安全**
- Copilot CLI：sandbox CA 信任管理命令族落地
- Qwen Code：零信任隔离守卫、CVE 依赖审计
- Gemini CLI：不可信目录强制只读（PR #29583）、零依赖 OS 沙箱提案

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|---------|---------|---------|
| **Claude Code** | 可扩展性生态（Mods）、第一方深度集成 | 重度专业开发者、插件作者 | 插件化行为修改 + 守护 agent，模型能力（Opus）为核心壁垒 |
| **OpenAI Codex** | 多端（CLI/Web/Desktop/dot）+ 云端任务 | ChatGPT 生态全量用户 | 云端线程 gRPC、alpha 密集迭代，多入口协同优先 |
| **Gemini CLI** | 子代理体系 + AST 感知工具链 + 开源社区 | 开发者/贡献者（P 标签分级治理） | 开源最彻底，社区提案驱动架构（Tactful Extraction 等） |
| **Copilot CLI** | 企业合规（沙箱 CA、managed settings、BYOK） | GitHub/GHEC 企业用户 | 闭源开发 + 版本火车，安全与治理先行 |
| **Qwen Code** | Managed Agent 托管架构 + 持久化执行 | 架构探索型团队/自托管用户 | 分阶段架构交付（Stage B/D/G）+ 高强度内部审计，工程严谨度最高 |
| **OpenCode** | 多模型兼容 + Desktop UI + 订阅服务 | 自备 API Key 的重度用户 | 聚合中立层，受订阅服务稳定性制约 |

## 五、社区热度与成熟度

- **热度第一梯队**：Claude Code（Mods Meta Issue 227 评论为单日最高）与 Codex（Issue/PR/Release 总量最大，但负面集中在 Windows）
- **快速迭代期**：Codex（9 alpha/天）、Gemini CLI（37 PR/天，P1 修复密集）、Qwen Code（架构性推进+审计驱动）
- **成熟稳定期**：Claude Code（从功能创新转向生态建设与回归收敛）、Copilot CLI（功能完备，进入回归修补与企业合规打磨）
- **调整/观望期**：OpenCode（存量清理、无 Release，Go 订阅信任危机未解）、Kimi Code（静默）

## 六、值得关注的趋势信号

1. **“行为漂移”成为新型运维风险**：Opus 5.5 无预警变更（#98679）表明模型端 silent update 会直接冲击下游成本与质量，建议团队建立模型行为的基线监控与版本锁定策略。

2. **Agent 安全焦点从“权限”转向“验证”**：Claude Code #98815（单会话 9 个未校验缺陷进入生产）指出核心风险是“未经校验的过度自信”而非推理错误——生成代码的自动校验层将成为 agent 工具的标配需求。

3. **可观测性是 agent 可信的前提**：跨工具的“假成功”问题说明，多级 agent 链路中失败透传与轨迹可见性（Gemini 的 subagent share、OpenCode 的中断原因透传）是下一步竞争点。

4. **插件/扩展生态是护城河竞赛**：Claude Mods（一天内即出现行为回滚 #98018）表明扩展体系尚不稳定，但生态卡位战已经开始；其他工具的 subagent 互调、动态工具继承均为同向布局。

5. **托管化（Hosted/Cloud）与持久化执行是下一战场**：Qwen Code 的 Managed Agent 分阶段交付、Codex 的云端线程 Resume/Attach、Claude Code 的 spawn_task，均指向“agent 会话脱离本地终端”的方向——但当前可靠性均不成熟，生产环境建议保留本地降级路径。

6. **Windows 与静默失败是普遍性短板**：全行业 Windows 桌面问题集中爆发，“不报错的失败”是开发者最大挫败源——工具选型时错误信息质量与平台支持完整度应纳入评估权重。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-10-02）

## 一、热门 Skills 排行（按讨论热度 / 影响力）

| # | Skill / PR | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **skill-creator 修复系列**（#1298、#1681，配合 Issues #1383/#1394） | Claude 官方"造 Skill 的 Skill"。社区大量审计发现触发评估在 Windows 上失效、评估器静默失败、eval-viewer 存在 XSS 风险，是当前修复最集中的模块 | OPEN |
| 2 | **mcp-builder 修复**（#1742，关联 #1390） | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 Header；社区反馈其评估脚本对真实 MCP 服务器一律 0 分 | OPEN |
| 3 | **docx 文档技能修复**（#1792、#541、#1734） | 修复 LibreOffice 超时误报成功、OOXML `w:id` 冲突导致文档损坏、孤立批注检测——文档处理是 PR 贡献最活跃领域 | OPEN |
| 4 | **md2video-audio**（#1703） | Markdown 一键编译为带真人配音的 MP4 视频（Marp + TTS），零成本视频生成，实用性强 | OPEN |
| 5 | **document-typography**（#514） | 解决 AI 生成文档的孤行、孤字换行、标题悬底等排版问题，"用户不会主动要求但都需要"的刚需 | OPEN |
| 6 | **pyxel 复古游戏开发**（#525） | Pyxel 游戏的创建、调试与无头验证，来自 Pyxel 作者本人提交，长期挂起（3 月至今） | OPEN |
| 7 | **AWT AI E2E 测试**（#822） | 赋予 Claude 视觉与浏览器控制能力，零代码生成并自动执行 E2E 测试 | OPEN |
| 8 | **claude-api 模型列表更新**（#1607，关联 #1487） | 标记四个退役模型 ID；社区同时抱怨该 Skill 一次性注入 ~156k token 耗尽上下文 | OPEN |

## 二、社区需求趋势（从 Issues 提炼）

1. **安全与信任机制**（[#492](https://github.com/anthropics/skills/issues/492)，43 评论最高）：社区 Skill 冒用 `anthropic/` 命名空间造成信任边界滥用，社区强烈要求官方签名/验证机制。
2. **组织级共享**（[#228](https://github.com/anthropics/skills/issues/228)）：摆脱"下载 .skill 文件走 Slack"的手工分享，期待企业内 Skill 库与共享链接。
3. **评估/触发可靠性**（[#556](https://github.com/anthropics/skills/issues/556)、#1383）：`claude -p` 下 Skill 触发率 0%、评测框架跨平台失效——Skill 质量评估基础设施是普遍痛点。
4. **Token 效率**（#1487、#189）：Skill 过度注入上下文、插件间重复内容，社区呼吁渐进加载与去重。
5. **新方向提案**：Agent 记忆压缩（compact-memory #1329）、Agent 治理与安全（#412）、推理质量门禁流水线（#1385）、高危批量操作防护（blast-radius #1776）。
6. **平台兼容**：Bedrock 支持（#29）、Windows 一等公民支持（多个 PR/Issue）。

## 三、高潜力待合并 Skills（活跃但未合并）

- [#1298](https://github.com/anthropics/skills/pull/1298) skill-creator 触发评估隔离与 Windows 兼容 — 修复官方核心工具，持续更新至 9 月，合并优先级高
- [#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder 适配 mcp>=2 — 有明确关联 Issue #1668，9 月底仍在活跃
- [#541](https://github.com/anthropics/skills/pull/541) docx 修订 ID 冲突修复 — 修复文档损坏的根因级 bug
- [#1607](https://github.com/anthropics/skills/pull/1607) claude-api 退役模型标记 — 小而确定的事实性修正
- [#1703](https://github.com/anthropics/skills/pull/1703) md2video-audio — 功能完整、需求独特
- [#723](https://github.com/anthropics/skills/pull/723) testing-patterns — 覆盖全栈测试方法论的完整 Skill，长期维护更新

## 四、生态洞察（一句话总结）

> 社区当前最集中的诉求已从"贡献新 Skill"转向 **"让 Skills 可信、可评测、可共享"** —— 即建立命名空间安全验证、可靠的触发评估基础设施和组织级分发机制，这才是 Skills 生态规模化的前置条件。

---
*注：PR 评论数据缺失（显示 undefined），排序基于关联 Issue 讨论量与更新活跃度综合判断；所示 PR 状态均为 OPEN，合并动态需以仓库实时数据为准。*

---

# Claude Code 社区动态日报 · 2026-10-02

## 一、今日速览

**Mods 扩展体系正式落地**：v2.1.287 发布，插件（Mods）现可修改 Claude Code 的深层行为，并内置了名为 "You should know" 的守护型 Mod。Mods 相关的 Meta Issue（#91870，227 条评论）持续高热，官方于 10 月 1 日发布社区更新，表示正快速消化反馈。此外，**Opus 5.5 在 10 月 1 日出现行为漂移报告**（#98679），值得持续观察。

## 二、版本发布

### v2.1.287
- **Claude Mods**：插件现可修改 Claude Code 更深层的行为，扩展能力大幅提升
- **You should know（内置 Mod）**：一个侧向 agent 持续监视你的会话，标记你或 Claude 可能遗漏的问题。启用方式：`/plugin enable cc-plugin-you-should-know@builtin`（限第一方会话）

## 三、社区热点 Issues（Top 10）

1. **[#91870](https://github.com/anthropics/claude-code/issues/91870) Mods - make Claude 10x more extensible**（227 评论 / 130 👍）
   Mods 体系的 Meta Issue。官方 10 月 1 日发布社区更新："We're live!"，正快速处理最新反馈。社区参与度极高，是当前生态最核心的讨论阵地。

2. **[#97854](https://github.com/anthropics/claude-code/issues/97854) Auto mode 服务端安全分类器间歇性无判定，完全阻塞 Bash 与 ScheduleWakeup**（28 评论 / 35 👍）
   Auto mode 下分类器错误导致 100% 工具调用失败（含 `echo ok` 这类无害命令），持续数分钟。影响生产可用性，标记 duplicate 但社区关注度高。

3. **[#98679](https://github.com/anthropics/claude-code/issues/98679) Opus 5.5 自 10 月 1 日起行为漂移：thinking 约 2 倍、输出约 1.6 倍、判断力下降**
   用户报告 Opus 5.5 在无任何本地变更的情况下行为统计性异常，且 Claude Code 之外也出现类似问题。疑似模型端变更，建议关注后续官方回应。

4. **[#84862](https://github.com/anthropics/claude-code/issues/84862) Passkey (WebAuthn) 登录支持**（82 👍）
   高赞需求：在所有平台支持 Passkey 登录 Claude 账户，减少 token 管理与登录摩擦。

5. **[#48636](https://github.com/anthropics/claude-code/issues/48636) 自定义代码片段配色 / 语法高亮主题**（15 评论 / 17 👍）
   长期开放的需求，反映终端 UI 个性化诉求持续存在。

6. **[#91884](https://github.com/anthropics/claude-code/issues/91884) Desktop 定时任务：模型选择端到端失效**
   macOS Desktop 上的 scheduled tasks 忽略用户模型设置、文档中的 picker 缺失、MCP 工具缺 model 参数——三层断裂。

7. **[#98184](https://github.com/anthropics/claude-code/issues/98184) Wi-Fi 切换后下一请求在死连接上挂起 184 秒才重试（Linux）**
   网络韧性问题的典型代表，对笔记本用户移动办公场景影响明显。

8. **[#98815](https://github.com/anthropics/claude-code/issues/98815) Opus 生成未经校验的代码：单次生产会话产出 9 个缺陷**
   生产切换期间生成的 shell/YAML/SQL 出现虚构 CLI 参数、stderr 捕获错误等，部分已执行到生产。核心问题不是推理错误，而是“未经校验的过度自信”，对 agent 安全性讨论有参考价值。

9. **[#98828](https://github.com/anthropics/claude-code/issues/98828) Windows Desktop (MSIX)：约 12 个项目的会话同时消失，提示“文件夹在另一台电脑上”（data-loss）**
   数据丢失级 bug，值得 Windows Desktop 用户警惕。

10. **[#93403](https://github.com/anthropics/claude-code/issues/93403) 嵌套子目录 `.claude/skills` 与 CLAUDE.md 在 auto mode 下永不加载**
    触发器仅在 Read/Edit/Write 时生效，Bash/Grep 不会触发——monorepo 用户的多目录工作流受限。

## 四、重要 PR 进展

1. **[#98018](https://github.com/anthropics/claude-code/pull/98018) mods: 回滚两处变更（agents-md 截断读取、diff 强制配色）**（已关闭）
   官方将 agents-md 和 diff 两个 mods 恢复至早期行为，反映 v2.1.287 前夕对 Mods 行为的快速收敛。

2. **[#98555](https://github.com/anthropics/claude-code/pull/98555) diff: 对话框逐文件打开 diff，关闭时不输出**（已关闭）
   修复非全屏 `/diff` 对话框中旧文件/生成文件残留、关闭无反馈的问题。

3. **[#94847](https://github.com/anthropics/claude-code/pull/94847) diff: 首次编辑仅在有文件可列时打开面板**（仍 Open）
   修复 diff 面板在仓库外/ignored 文件写入时弹出空面板（"No tracked changes"）的问题。

4. **[#16632](https://github.com/anthropics/claude-code/pull/16632) Fix: shell 操作符需审批错误**（已关闭）
   将 ralph-loop 初始化从 Markdown 展示性代码块迁移为可执行的 Bash 工具调用，修复 #16389。

5. **[#62592](https://github.com/anthropics/claude-code/pull/62592) Update security-guidance plugin**（已关闭）
   security-guidance 插件 README 更新。

> 注：今日仅 5 条 PR 更新，Mods 相关的 diff/agents-md 行为调整与回滚是主线。

## 五、功能需求趋势

- **Mods / 可扩展性**：绝对主旋律。#91870 与 v2.1.287 相互呼应，插件深度定制行为成为生态核心方向
- **安全与验证**：#98815（未校验代码）、#97854（分类器阻塞）指向 agent 自动化下的安全兜底需求
- **认证体验**：Passkey/WebAuthn（#84862，82 👍）、OAuth 并发会话失效（#98693）、MCP DCR 严格校验兼容（#94630）
- **多入口一致性与数据可靠性**：Desktop 定时任务（#91884）、移动端 Routines 会话管理（#76841）、Windows 会话丢失（#98828）
- **Monorepo / 多目录工作流**：嵌套 skills/CLAUDE.md 加载（#93403）、VS Code worktree 会话列表（#81024）
- **网络与性能韧性**：Wi-Fi 切换 184 秒挂起（#98184）、未知 TERM_PROGRAM 启动慢 3 秒（#98832）

## 六、开发者关注点

1. **Opus 5.5 行为漂移**（#98679 + #98815）：thinking/输出量显著上升、判断力下降的报告集中在 10 月 1 日出现，若你观察到成本异常，可对比排查
2. **Auto mode 稳定性**：服务端分类器故障会完全阻塞工具调用，关键工作流建议保留手动审批降级路径
3. **Mods 迁移注意**：官方正在快速迭代并回滚 Mods 行为（#98018），依赖 agents-md / diff 默认行为的插件需关注兼容性
4. **Windows Desktop 用户**：#98828 报告多项目会话同时消失，建议确认本地 session 存储备份
5. **agent 云端派发**：spawn_task 经 "cloud" 启动时计划（plan）信息丢失（#98836/#98837，均已关闭但值得跟进），复杂任务的云端派发暂不可靠

---
*数据截至 2026-10-02，来源：github.com/anthropics/claude-code*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-02

## 📌 今日速览

Codex CLI 发布 **v0.160.0 稳定版**，带来任务中心历史浏览、X11 中键粘贴等新功能，同时 0.161/0.162 alpha 版本密集迭代中。Windows 桌面端问题持续发酵，组织设置加载失败（#48324，34 条评论）和 dot 启动的本地任务缺少 Computer Use 工具（#49458）成为社区焦点。VS Code 扩展 10 月 1 日更新后出现消息丢失问题，值得 IDE 用户警惕。

---

## 🚀 版本发布

### rust-v0.160.0（稳定版）
- **任务中心历史浏览**：新增键盘可访问的 "Show more" 操作，可加载更早的任务记录（#49106）
- **X11 中键粘贴**：在支持的本地 Linux X11 终端上可选中转录文本并用中键粘贴（#49112）——这也直接回应了近期的粘贴回归类反馈（#48127、#48357 均已关闭）
- **支持在项目外以 workspace 默认值启动会话**

### Alpha 版本（密集迭代）
- 0.161.0-alpha.6 ~ alpha.13、0.162.0-alpha.1 共 9 个 alpha 版本发布，均为常规迭代，未见详细 changelog

---

## 🔥 社区热点 Issues（Top 10）

| # | Issue | 为什么重要 |
|---|-------|-----------|
| 1 | [#48324](https://github.com/openai/codex/issues/48324) ChatGPT Windows 桌面端无法加载组织设置 | **34 条评论**，Windows 桌面用户被完全阻断在 Composer 之前，且因界面未加载无法提交反馈或获取 session ID，排障路径本身就中断 |
| 2 | [#43058](https://github.com/openai/codex/issues/43058) 提示词被误判违反使用政策 | 26 条评论，模型行为类误伤问题，影响正常开发工作流 |
| 3 | [#49458](https://github.com/openai/codex/issues/49458) Windows 上 dot 启动的任务缺少 Computer Use 工具 | 13 👍，普通本地会话正常但 dot 路径工具缺失，是 dot/Work 体验的关键阻断点 |
| 4 | [#49497](https://github.com/openai/codex/issues/49497) Codex Web 首条消息报 "Unable to determine project root" | **24 👍**，云环境下完全无法发起任务，影响面广 |
| 5 | [#49729](https://github.com/openai/codex/issues/49729) dot 无法在已保存项目中创建/跟进本地任务 | 16 条评论，dot 与 Codex App 项目的集成链路存在多处断裂 |
| 6 | [#43803](https://github.com/openai/codex/issues/43803) 澄清问题卡片被自动关闭 | 8 👍，`request_user_input_async` 渲染时序问题导致问题无法回答，直接影响人机协作交互 |
| 7 | [#49488](https://github.com/openai/codex/issues/49488) Windows 计算机任务缺少浏览器/桌面工具 | MCP 启动持续失败 + 路径错误，与 #49458 同属 dot/Work 工具链问题 |
| 8 | [#41665](https://github.com/openai/codex/issues/41665) Windows exec 静默使用 MSIX 虚拟化 AppData | 长期未解的沙箱路径问题，导致命令操作的不是真实用户配置 |
| 9 | [#49988](https://github.com/openai/codex/issues/49988) VS Code 扩展更新后间歇性丢失消息 | 6 👍，10 月 1 日更新后出现，输入的消息被清空且无响应，**时间新且影响所有 IDE 用户** |
| 10 | [#50118](https://github.com/openai/codex/issues/50118) VS Code 扩展卡在 markedStreaming=true | 轮次完成后仍排队提示词，与 #49988 共同指向近期扩展的状态管理问题 |

其他值得留意：[#50000](https://github.com/openai/codex/issues/50000) Windows 对话间歇性加载失败、[#49618](https://github.com/openai/codex/issues/49618) Windows↔Android Remote 配对死循环、[#42345](https://github.com/openai/codex/issues/42345) 长会话 rollout 文件膨胀至 1.4 GB（性能问题）。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#50113](https://github.com/openai/codex/pull/50113) 云端线程原生 gRPC 客户端** — 新增 `codex-cloud-client`，支持 `ThreadService.Resume/Attach`，为云端线程恢复与实时附加打基础
2. **[#50059](https://github.com/openai/codex/pull/50059) 修复 Linux 沙箱多文件拒绝列表启动失败** — Bubblewrap `--ro-bind-data` 的 fd 复用 bug，直接修复沙箱可用性
3. **[#50082](https://github.com/openai/codex/pull/50082) V2 子代理动态工具继承** — 非 fork 历史的子代理可继承父级客户端定义的动态工具，多代理架构关键能力
4. **[#50087](https://github.com/openai/codex/pull/50087) 会话驱逐时保留排队的 agent 邮件** — 解决未读消息阻止空闲代理卸载的问题，优化内存/线程占用
5. **[#50093](https://github.com/openai/codex/pull/50093) 防止共享 instruction provider 自委托** — 修复递归加载导致的死循环风险
6. **[#50109](https://github.com/openai/codex/pull/50109) 全屏提示框限高可滚动** — 限制在屏幕 2/3 高度，长草稿仍可浏览，TUI 体验改进
7. **[#50052](https://github.com/openai/codex/pull/50052) 恢复 TUI 草稿时保留问题上下文** — 回收未发送答案时附上对应问题标题，避免上下文丢失
8. **[#50099](https://github.com/openai/codex/pull/50099) Guardian V2 Decisions 对比**（opt-in）— 安全分类器的影子对比评估基础设施
9. **[#50061](https://github.com/openai/codex/pull/50061) 回合 MXC PowerShell 修复至 0.159.0-alpha.12** — 为 260930 桌面版本火车回移关键 Windows 修复
10. **[#50050](https://github.com/openai/codex/pull/50050) 插件与技能快照按步骤隔离** — 防止步骤间能力快照串扰，提升确定性

其他：[#50058](https://github.com/openai/codex/pull/50058) 升级 `windows-sys` 0.61.2、[#50094](https://github.com/openai/codex/pull/50094)/[#50083](https://github.com/openai/codex/pull/50083) 附件反向查询 API、[#50045](https://github.com/openai/codex/pull/50045) Find 搜索不再展开整个转录。

---

## 📈 功能需求趋势

1. **dot / 多代理（Dots/Work）集成**：#49458、#49729、#49488、#49883 密集出现，dot 与本地任务、Computer Use、项目的打通是当前最大痛点区
2. **Windows 桌面质量**：组织设置加载、MSIX 路径虚拟化、配对循环——Windows 专属问题在热点榜中占比过半
3. **IDE / VS Code 扩展稳定性**：消息丢失、队列卡死、follow-up 失败（#49988、#50118、#46925），10 月初更新后集中爆发
4. **性能与资源占用**：rollout 文件 4 倍冗余存储（#42345）、GPU 沙箱访问（#19676）
5. **自动化与工作流嵌入**：SessionID 指定（#7801，18 👍）、远程 CLI 与桌面线程协调（#41580）、Tailscale 直连控制（#31991）

---

## ⚠️ 开发者关注点

- **Windows 用户请谨慎更新桌面端**：组织设置加载失败影响多个版本（#48324、#48590），dot 相关任务普遍缺工具
- **VS Code 扩展 10/1 更新存在消息丢失风险**（#49988），建议关注后续修复版本
- **Linux 沙箱用户**：GPU 训练场景下 `workspace-write` 沙箱仍无法访问 `/dev/nvidia*`（#19676）；多文件拒绝列表的启动崩溃已在 PR #50059 修复，将随下版本发布
- **长期运行会话注意磁盘**：rollout 文件可达 GB 级，建议定期清理 `~/.codex/sessions`
- **粘贴回归已修复**：#48127、#48357、#48474 均已关闭，0.160.0 的 X11 中键粘贴为正式改进

---
*数据来源：github.com/openai/codex · 过去 24 小时 Releases / Issues / PRs*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-02）

## 1. 今日速览

Gemini CLI 发布 v0.64.0 nightly 版本，修复了 `@` 符号导致的 CPU 挂起及文件写入非原子性问题。过去 24 小时社区活跃度较高，共 50 条 Issue 更新、37 条 PR 更新，多个 P1 级修复落地，包括会话历史误删除、Ctrl+C 紧急中止失效、状态文件损坏恢复等关键问题。子代理稳定性与文件工具可靠性仍是核心议题。

## 2. 版本发布

**v0.64.0-nightly.20261001.gc6bccb7ec**
- fix(cli): 防止代码中 `@` 符号引发的 CPU 挂起与引号吞噬（#29434 / PR #29557）
- fix(core): 文件工具操作串行化，并实现原子写入（#29078）

## 3. 社区热点 Issues

1. **#22323 [P1] Subagent 触发 MAX_TURNS 后误报 success**（13 评论）
   `codebase_investigator` 达到轮次上限却报告 `GOAL` 成功，掩盖了中断事实。这是可观测性核心缺陷，影响调试信任度。
   https://github.com/google-gemini/gemini-cli/issues/22323

2. **#21409 [P1] Generalist agent 无限挂起**（8 评论 / 👍8）
   简单操作（如创建文件夹）即触发永久挂起，用户需等待长达一小时。高 👍 表明影响面广。
   https://github.com/google-gemini/gemini-cli/issues/21409

3. **#19873 [P2] 零依赖 OS 沙箱 + 执行后意图路由**（9 评论）
   利用 Gemini 3 原生 bash 能力（grep/cat/sed/awk 链式调用），在不牺牲安全性的前提下释放模型原生优势。重要架构提案。
   https://github.com/google-gemini/gemini-cli/issues/19873

4. **#22745 [P2] AST 感知的文件读取/搜索/映射评估（EPIC）**（7 评论）
   探索 AST 工具（tilth/glyph/ast-grep）能否减少 token 噪声、精确读取方法边界，是 codebase_investigator 的潜在升级方向。
   https://github.com/google-gemini/gemini-cli/issues/22745

5. **#21968 [P2] 模型极少主动使用 skills 与 sub-agents**（6 评论）
   用户配置了 gradle/git skills 但模型几乎不自主调用，需显式指令。反映工具选择策略的调优需求。
   https://github.com/google-gemini/gemini-cli/issues/21968

6. **#22186 [P1] get-shit-done output hook 导致崩溃**（3 评论）
   打印用户摘要时反复崩溃，P1 级稳定性问题。
   https://github.com/google-gemini/gemini-cli/issues/22186

7. **#21983 [P1] Browser subagent 在 Wayland 下失败**（4 评论）
   Linux Wayland 用户被阻塞，桌面环境兼容性问题。
   https://github.com/google-gemini/gemini-cli/issues/21983

8. **#22267 [P2] Browser Agent 忽略 settings.json 覆盖（如 maxTurns）**（4 评论）
   AgentRegistry 正确读取合并配置但运行时未生效，配置链路断裂。
   https://github.com/google-gemini/gemini-cli/issues/22267

9. **#24246 [P2] 工具数 >128 时遭遇 400 错误**（3 评论）
   提示词要求"more than 400 tools"场景下 API 报错，需更智能的工具作用域裁剪。
   https://github.com/google-gemini/gemini-cli/issues/24246

10. **#22741 [P3] 支持本地 subagent 后台化（Ctrl+B）**（👍2）
    探索/构建等非阻塞任务可后台运行，是并行 agent 能力的前置诉求。
    https://github.com/google-gemini/gemini-cli/issues/22741

## 4. 重要 PR 进展

1. **#29584 [P1] 修复恢复会话快速退出时删除历史**（OPEN）
   修复恢复会话后 Ctrl+C/`/exit` 导致会话历史文件被永久删除的数据丢失问题。
   https://github.com/google-gemini/gemini-cli/pull/29584

2. **#29582 [P1] 性能优化：ignore 过滤 + 子树剪枝**（OPEN）
   引入目录级状态记忆化、通配符剪枝与 symlink 缓存，解决大仓库多秒级阻塞。
   https://github.com/google-gemini/gemini-cli/pull/29582

3. **#29457 [P1] read-many-files 模糊匹配导致上下文膨胀**（OPEN）
   二进制资源（图片/PDF/音频）被误判为“显式请求”注入上下文，改用 glob 精确匹配。
   https://github.com/google-gemini/gemini-cli/pull/29457

4. **#29558 [P1] 状态持久化原子写入 + 损坏自动恢复**（CLOSED）
   `~/.gemini/state.json` 采用临时文件 + fsync + 原子重命名，损坏时从 `.bak` 自动恢复。
   https://github.com/google-gemini/gemini-cli/pull/29558

5. **#29586 [P2] Ctrl+C 紧急中止可靠触达取消处理器**（CLOSED）
   修复操作执行中紧急停止被吞掉的关键输入缺陷。
   https://github.com/google-gemini/gemini-cli/pull/29586

6. **#29502 [P1] Enter/空格键可靠确认选择列表**（OPEN）
   覆盖 Windows IDE 终端等无 Kitty Keyboard Protocol 环境，涉及工具确认、AskUserDialog 等场景。
   https://github.com/google-gemini/gemini-cli/pull/29502

7. **#29560 [P2] Windows ConPTY 转发 IME 光标位置**（CLOSED）
   修复 CJK 输入法候选窗口错位到底部的问题，中文用户直接受益。
   https://github.com/google-gemini/gemini-cli/pull/29560

8. **#29581 [P2] 支持 @file:line 引用并修复 ghost text 换行死循环**（CLOSED）
   支持 `@file:10`、`@file#L10-L25` 语法，同时修复窄终端/宽字符下的无限循环。
   https://github.com/google-gemini/gemini-cli/pull/29581

9. **#29583 [P1] 不可信目录下强制只读 workspace 设置**（OPEN）
   防止 `gemini mcp add` 等命令在未验证目录中以“省略即同步”方式破坏性覆写配置。
   https://github.com/google-gemini/gemini-cli/pull/29583

10. **#28738 [P2] 允许 agents 调用 agents**（OPEN，help wanted）
    subagent 可通过 `tools:` frontmatter 委派其他 subagent 甚至递归调用自身，是 agent 架构的重要扩展。
    https://github.com/google-gemini/gemini-cli/pull/28738

## 5. 功能需求趋势

- **子代理体系深化**（最热方向）：agent 间互相调用（#28738）、并行协作与共享内存（#18287）、后台化（#22741）、本地 subagent Sprint（#20195）
- **AST 感知工具链**：#22745 / #22746 / #22747 系列，用 AST grep 等工具提升代码理解精度与 token 效率
- **Token 精细化控制**：“Tactful Extraction”手术式读取（#19561，基线 36.6k tokens/turn）、任务追踪去上下文化（#18836）
- **原生 bash 能力 + 沙箱安全**：#19873 零依赖 OS 沙箱提案
- **可观测性**：subagent 轨迹通过 `/chat share` 可见（#22598）、`/bug` 报告包含 subagent 上下文（#21763）
- **跨平台体验**：Windows（IME、文件锁、终端键盘协议）与 Linux Wayland（#21983）兼容性持续补齐

## 6. 开发者关注点

- **稳定性是最大痛点**：agent 挂起（#21409）、hook 崩溃（#22186）、交互提示卡死（#22465）、终端 resize 闪烁（#21924）等高频反馈集中在运行时稳定性
- **上下文/token 成本焦虑**：二进制文件误注入上下文（#29457）、大文件读取"firehose"（#19561）、工具数超限报错（#24246）
- **数据安全担忧**：会话历史误删（#29584）、状态文件损坏（#29558）、不可信目录配置覆写（#29583）、破坏性命令（`git reset --force`，#22672）——本周多个 P1 均属此类
- **配置一致性**：symlink agent 不识别（#20079）、Browser Agent 忽略 settings.json（#22267）
- **工作区卫生**：模型随机目录生成临时脚本（#23571），增加提交前清理负担

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-10-02

## 1. 今日速览

昨日 Copilot CLI 密集发布 v1.0.91 / v1.0.91-1 / v1.0.92-0 三个版本，重点强化 **Sandbox CA 信任管理**、修复 OAuth 重认证后 MCP 工具失效的问题。社区侧，macOS 更新后 CLI 全面瘫痪（#4998）和 1.0.89 启动认证竞态（#5008）两个高热度 bug 值得用户警惕，同时企业相关（权限、BYOK、Data Residency）仍是讨论焦点。

---

## 2. 版本发布

### v1.0.92-0（最新）
- **修复**：OAuth 重认证后，若工具定义未变化，MCP 工具可继续正常工作。

### v1.0.91-1
- **新增**：`copilot sandbox ca` 命令族——支持 check / create / trust / rotate / remove 代理 CA 信任，含 Windows 无人值守安装；原 `/sandbox ca install` 拆分为 `create` 和 `trust`。
- **改进**：CLI 退出前冲刷待发遥测数据（带有限延迟）。

### v1.0.91（2026-10-01）
- 会话时间线在被中断的回合结束后正确清除 busy 状态。
- 沙箱化命令支持 Windows 运行。

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 关注点 |
|---|-------|--------|
| 1 | [#3282](https://github.com/github/copilot-cli/issues/3282)（已关闭，👍31，12 评论） | **多 BYOK 模型支持**：当前只能通过环境变量配置单个 BYOK 模型，TUI 内切换需退出重设。呼声最高的功能请求，已关闭（可能已实现或转移）。 |
| 2 | [#953](https://github.com/github/copilot-cli/issues/953) | **OAuth 权限过宽**：认证时请求全账户读写权限，用户希望限定到特定仓库/区域。企业安全团队长期关注点。 |
| 3 | [#4998](https://github.com/github/copilot-cli/issues/4998) | **macOS 更新后 CLI 完全不可用**：`.mcp-writer.binding` 持久化了过期的文件系统设备 ID，重启后所有新旧会话均无法处理提示。影响面广的严重回归。 |
| 4 | [#5008](https://github.com/github/copilot-cli/issues/5008) | **1.0.89 启动竞态**：交互会话启动时报两次 "Not authenticated" 错误，约 3 秒后恢复正常。疑似新增的 model provider attribution 逻辑在登录完成前触发。 |
| 5 | [#4851](https://github.com/github/copilot-cli/issues/4851)（👍8） | **Azure MCP 注册表验证失败**：Rust 运行时 BrokenPipe，运行数月的配置一夜之间失效，疑似服务端变更引起。 |
| 6 | [#4959](https://github.com/github/copilot-cli/issues/4959) | **企业管理 model 设置不生效**：`managed-settings.json` 中的 `model` 策略被拉取但未被 resolver 应用，企业管控被绕过。 |
| 7 | [#3675](https://github.com/github/copilot-cli/issues/3675)（👍8） | **Session worktree 治理**：worktree 路径/分支名/slug 三重命名不一致且不自清理，长期使用后目录堆积。Windows 用户痛点明显。 |
| 8 | [#5030](https://github.com/github/copilot-cli/issues/5030) | **ACP 模式回归**：1.0.89 起 task 工具无法启动自定义 agent，报 "Unsupported native sessions host effect"。对 ACP 集成方是阻塞性问题。 |
| 9 | [#5031](https://github.com/github/copilot-cli/issues/5031) | **运行中切换 autopilot 导致权限错误**：长任务运行时启用 autopilot，所有工具调用开始报权限拒绝——harness 沿用了初始权限配置。 |
| 10 | [#4982](https://github.com/github/copilot-cli/issues/4982)（已关闭） | **并行工具调用随机卡死**：批量文件读取/搜索（gpt-6-sol）间歇性全部挂起直到用户中断，1.0.88 已关闭（或已修复）。 |

---

## 4. 重要 PR 进展

> 过去 24 小时仅 1 个 PR 更新：

- **[#5036](https://github.com/github/copilot-cli/pull/5036)** [OPEN] — Update default model version in README（@mjgard）
  文档类修正，将 README 中的默认模型说明更新为当前实际默认模型。

*说明：本仓库主分支开发可能不通过公开 PR 进行，今日 PR 活动较少，建议关注 Release Notes 获取实际代码变更。*

---

## 5. 功能需求趋势

从 Issue 分布可归纳出以下方向：

1. **沙箱与企业安全**（最热）：CA 信任管理（已在 v1.0.91 落地）、细粒度 OAuth 权限（#953）、企业 allowlist 策略（#4989）、Linux 沙箱 DNS（#5027）。
2. **模型灵活性与 BYOK**：多 BYOK 模型热切换（#3282，👍31）、企业 managed model 策略正确应用（#4959）、配额/计费信息透出（#5029）。
3. **会话稳定性与可恢复性**：session resume 失败（#5023）、冻结但 UI 仍可操作的“僵尸会话”（#5035）、rewind 丢失剪贴板图片（#5037）。
4. **MCP 生态兼容**：Figma remote MCP 数据缺失（#5025）、MCP 状态通知可关闭（#5034）、Azure 注册表验证（#4851）。
5. **可配置性/降噪**：关闭 "Task complete" 摘要（#5033）、隐藏 verbose MCP 通知（#5034）、worktree 命名与清理规则（#3675）。

---

## 6. 开发者关注点（痛点总结）

- **平台级回归频发**：macOS 设备 ID 持久化（#4998）、启动竞态（#5008）、ACP 自定义 agent 失效（#5030）均在新版本引入，升级需谨慎。
- **企业/合规用户摩擦大**：权限过宽、Data Residency 端点路由错误（#4938）、企业策略不生效，是 GHEC 用户的核心阻碍。
- **异步与后台任务可靠性**：后台 sub-agent 流失败无状态反馈（#4911）、调度提示不触发（#4137）、并行工具调用卡死（#4982）。
- **Windows 体验仍需打磨**：CMD 窗口闪烁（#3171，已关闭）、instructions 文件因盘符大小写重复注入（#5022）。
- **Co-authorship 元数据**：`Copilot-Session` 尾注破坏 GitHub 的 co-authorship 识别（#5032），影响开源仓库的提交归属。

**建议**：受 #4998/#5008/#5030 影响的用户可暂留 1.0.88 或等待 v1.0.92-0 后续补丁；企业用户应测试 v1.0.91 的 sandbox CA 新命令以配合代理环境部署。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-10-02

## 1. 今日速览

今日无新版本发布。社区活跃度集中在 Issue 存量清理与 Windows 体验修复：大量历史 Issue（包括 OpenCode Go 订阅 401 系列）在今日集中关闭。新增 PR 聚焦 Windows 子进程控制台窗口闪烁修复（#52594）、会话回退消息删除边界修复（#52588）等核心问题，另有一批 9 月初的社区贡献 PR 经 automated-pr-cleanup 处理后关闭。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues

1. **[#38257](https://github.com/anomalyco/opencode/issues/38257)** [已关闭] OpenCode Go 全模型 401 "Request blocked by upstream provider"（`/v1/models` 正常但 chat/completions 被拦）。54 条评论、13 👍，是该系列服务端问题的主战场，今日关闭，值得关注官方是否有后续公告。
2. **[#29363](https://github.com/anomalyco/opencode/issues/29363)** [已关闭] `limit.output` 被静默封顶 32k，仅能用实验性环境变量绕过。29 👍 反映高输出 token 需求（DeepSeek 384k）是真实痛点，建议持续跟进官方解封计划。
3. **[#42440](https://github.com/anomalyco/opencode/issues/42440)** [已关闭] Windows 下每次 shell 命令执行都会闪现控制台窗口。12 条评论，长期影响 Windows 体验，对应修复 PR #52594 今日已提交（见下）。
4. **[#43355](https://github.com/anomalyco/opencode/issues/43355)** [已关闭] Desktop 渲染进程陷入 ResizeObserver 循环导致 UI 冻结，仅强退可恢复。核心后端仍存活但渲染挂死，是 Desktop 稳定性的代表性报告。
5. **[#49184](https://github.com/anomalyco/opencode/issues/49184)** [开放中] Go 付费订阅未激活，DeepSeek 模型要求 Global 区域。付费用户受影响且未解决，属高优先级商业问题。
6. **[#51993](https://github.com/anomalyco/opencode/issues/51993)** [开放中] Go 上 deepseek-v4.1-flash 在新增图片后 prompt cache 回退至首图，图片之后内容全部按未缓存计费——直接影响成本。
7. **[#52378](https://github.com/anomalyco/opencode/issues/52378)** [开放中] 子代理 `MALFORMED_FUNCTION_CALL` 失败被上报为成功完成。这是 agent 链路正确性 bug，可能导致父级任务基于假成功继续执行。
8. **[#49561](https://github.com/anomalyco/opencode/issues/49561)** [开放中] Desktop 新建会话发消息无响应（worktree 目录缺失导致 ENOENT），UI 无任何报错，排查成本高。
9. **[#34407](https://github.com/anomalyco/opencode/issues/34407) / [#39170](https://github.com/anomalyco/opencode/issues/39170)** [已关闭] CLI 与 Desktop 的 LaTeX 数学公式渲染为原始文本（Desktop 行内 `$...$` 尤甚）。学术/技术写作用户高频诉求。
10. **[#38524](https://github.com/anomalyco/opencode/issues/38524) / [#40286](https://github.com/anomalyco/opencode/issues/40286)** [已关闭] CLI 对希伯来语/波斯语等 RTL/BiDi 文本渲染错乱。国际化文本支持仍是短板。

## 4. 重要 PR 进展

1. **[#52594](https://github.com/anomalyco/opencode/pull/52594)** fix(cli): 为 Windows 服务添加隐藏控制台，修复子进程 spawn 时的窗口闪烁（Closes #51887 / #50868，关联 #42440）。
2. **[#52588](https://github.com/anomalyco/opencode/pull/52588)** fix(session): 回退消息按边界最后删除、ID 按原始顺序决胜，修正会话回滚语义。
3. **[#52587](https://github.com/anomalyco/opencode/pull/52587)** fix(core): 将“非活跃驱逐”的中断原因透传到未结算工具的失败消息，替代泛化的 "Tool execution interrupted"。
4. **[#52515](https://github.com/anomalyco/opencode/pull/52515)** chore(stats): 退役旧 S3 数据湖，迁移 LakeVpc/LakeCluster 到 stats.ts，保持 R2 同步网络拓扑。
5. **[#48808](https://github.com/anomalyco/opencode/pull/48808)** fix(app): 新布局下恢复权限请求的声音提醒与桌面通知（macOS 通知授权提示）。
6. **[#51640](https://github.com/anomalyco/opencode/pull/51640)** [已关闭] feat(app): Review 面板接入 `session.diff` 路由，激活原本不可选的 "Last turn" 模式，可查看最近一轮的代码变更。
7. **[#46609](https://github.com/anomalyco/opencode/pull/46609)** [已关闭] feat(ai): 支持 freeform 工具表示，为对象输入工具提供规范化表示与 OpenAI 语法方言、GPT-5 Responses 自定义工具调用降级。
8. **[#46676](https://github.com/anomalyco/opencode/pull/46676)** [已关闭] fix(llm): 剔除 Gemini 工具 schema 中的空字符串 enum 成员，修复部分 MCP 服务器的兼容问题。
9. **[#46657](https://github.com/anomalyco/opencode/pull/46657)** [已关闭] feat(session-ui): 推理过程与工具详情收纳为可折叠的 "Thinking" 卡片，带实时展示。
10. **[#46632](https://github.com/anomalyco/opencode/pull/46632)** [已关闭] fix(desktop): 加固打包版 Electron（禁用 RunAsNode/NODE_OPTIONS/CLI inspector、启用 ASAR 完整性校验），显著提升 Desktop 安全基线。

> 注：#466xx 系列 PR 多于 9 月初提交、今日经 automated-pr-cleanup 集中关闭，部分功能可能需等待重新提交或随版本合入。

## 5. 功能需求趋势

- **Windows 体验**：控制台闪烁、npm 安装兼容性、路径分隔符处理等 Windows 问题占比明显，#52594 是直接响应。
- **渲染与排版**：LaTeX 数学公式渲染（CLI/Desktop 多条 Issue）、RTL/BiDi 文本支持，是国际用户与技术写作用户的核心诉求。
- **Desktop UI 完善**：语音输入按钮（#37742）、auto-accept 开关失效系列（#37617 / #48237 / #45159）、会话历史侧边栏（PR #46670）——鼠标驱动的 Desktop 交互对齐 TUI 能力是主线。
- **订阅服务稳定性（OpenCode Go）**：401 blocked by upstream provider 系列、区域限制、订阅激活失败，涉及付费用户体验，是最高声量的非代码类问题。
- **长输出与缓存成本**：output token 32k 封顶、prompt cache 图片回退，反映重度用户对 token 成本与吞吐的敏感。
- **Agent 可观测性**：子代理失败被静默报成功（#52378）、非 git 目录会话归属（#48870）等，指向 agent 链路的可追溯性需求。

## 6. 开发者关注点

- **付费可用性信任**：Go 订阅用户遭遇 401/Endpoint unavailable 的比例高，且多账户被封禁引发申诉（#40055）。官方需要更透明的状态页与封禁策略说明。
- **静默失败难排查**：Desktop 新会话无响应但 UI 无报错（#49561）、配置被静默封顶（#29363），“不报错的失败”是开发者最挫败的一类问题。
- **错误信息质量**：#52587 等 PR 显示官方正在改进中断原因透传，方向正确，社区应持续反馈可操作的错误信息需求。
- **多模型兼容细节**：Kimi K3 空 content 拒绝、Gemini 空 enum 拒绝等，说明自备 API Key 用户对模型切换/混用的兼容性要求很高。
- **大上下文/高输出场景**：长会话、多图、高输出 token 是重度用户标配，缓存命中与输出上限是实际成本的决定因素。

---
*数据来源：github.com/anomalyco/opencode | 统计窗口：2026-10-01 至 2026-10-02*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-02）

## 1. 今日速览

Qwen Code 今日发布 v0.24.7-nightly.20261001（a7deb01bcb），包含 Code Mode 与延迟工具发现对齐等修复。**Managed Agent 架构**仍是社区绝对焦点：今日新增多个 P1/P2 级审计发现（Runtime Broker 跨进程竞态、会话存储无限增长、数据库热路径放大），围绕 Hosted Workspace、durable Hooks 与多阶段交付（Stage D/G）的 Issue 与 PR 密集推进。

## 2. 版本发布

**v0.24.7-nightly.20261001.a7deb01bcb**
- fix(core): 使 Code Mode 文本与延迟工具发现（lazy tool discovery）对齐（[#12990](https://github.com/QwenLM/qwen-code/pull/12990)）
- fix(permissions): 修复 approved 权限未被正确遵循的问题

## 3. 社区热点 Issues

| # | Issue | 看点 |
|---|-------|------|
| 1 | [#12380](https://github.com/QwenLM/qwen-code/issues/12380) Managed Agent 双路径架构提案（38 评论） | 整个 Managed Agent 路线图的总纲：保留 TS agent loop、Session 持久归属、Workspace 绑定与可恢复工具执行，讨论热度持续最高 |
| 2 | [#12028](https://github.com/QwenLM/qwen-code/issues/12028) 非对话上下文 token 治理（18 评论） | 系统提示词、工具 schema、QWEN.md 每次请求都在付费，长上下文模型下开销隐性膨胀，性能路线图核心追踪项 |
| 3 | [#12867](https://github.com/QwenLM/qwen-code/issues/12867) Stage D 后续：durable lifecycle / Turns / Actions（17 评论） | @wenshao 主导，覆盖持久生命周期、java_durable 准入与 AgentDefinition 合同 |
| 4 | [#12737](https://github.com/QwenLM/qwen-code/issues/12737) ACP Bridge Stage B 双引擎宿主集成（14 评论） | 调度决策已更新：本地 `qwen serve` Managed 执行优先级低于 Hosted Managed 切片 |
| 5 | [#13030](https://github.com/QwenLM/qwen-code/issues/13030) Hosted Workspace 新增只读搜索工具（9 评论） | `list_directory`/`glob`/`grep_search` 进 Hosted 工具面，配套 PR #13166 已提交 |
| 6 | [#13183](https://github.com/QwenLM/qwen-code/issues/13183) **P1**：Runtime Broker 跨进程 admit/release 竞态 | 今日新报：跨进程正确性竞态 + 单线程续租调度 + 单 token HTTP 安全姿态，最高优先级 |
| 7 | [#12889](https://github.com/QwenLM/qwen-code/issues/12889) 延迟工具 schema 允许空参数（7 评论） | 有必填字段的工具可被空参数调用，与 nightly 修复的 lazy discovery 直接相关 |
| 8 | [#13184](https://github.com/QwenLM/qwen-code/issues/13184) 会话存储与面板投影无界增长 | "只增不减"是 Managed 持久层与 UI 的默认姿态，审计确认多个无限增长点 |
| 9 | [#13181](https://github.com/QwenLM/qwen-code/issues/13181) 数据库热路径放大（快照重写/SSE/列表） | 四条热路径在持行锁状态下做远超请求量的 DB 工作，性能风险显著 |
| 10 | [#13078](https://github.com/QwenLM/qwen-code/issues/13078) 每日依赖 CVE 审计失败 | CI 安全审计连续失败，疑似高危漏洞，配套修复 PR #13169 已提交 |

其他值得关注：[#13157](https://github.com/QwenLM/qwen-code/issues/13157)（Agent Host 隔离守卫应在权限流之前执行）、[#13145](https://github.com/QwenLM/qwen-code/issues/13145)（MEMORY.md 索引截断切断链接目标）。

## 4. 重要 PR 进展

1. **[#13174](https://github.com/QwenLM/qwen-code/pull/13174)** — Hosted Harness 世代迁移（G3）：Harness 重启后会话不再绑定旧进程世代，Java 控制面自动接管，消除重启导致的会话全量失败
2. **[#13146](https://github.com/QwenLM/qwen-code/pull/13146)** — Web Shell 无需终端即可信任工作区：新增 `POST /workspace/trust/grant` 守护路由，Projects 面板直接提供 Trust 操作
3. **[#13129](https://github.com/QwenLM/qwen-code/pull/13129)** — 持久化 Hosted Hooks（H2）：durable Hook 目录、一次性执行记录、原生事件分发与原属主恢复
4. **[#13179](https://github.com/QwenLM/qwen-code/pull/13179)** — 加固 commit 重试、worker 容器边界与面板轮询三项健壮性修复
5. **[#13166](https://github.com/QwenLM/qwen-code/pull/13166)** — `glob` 工具进入 hosted-workspace `/2` profile，扩展 Hosted 只读搜索能力
6. **[#13138](https://github.com/QwenLM/qwen-code/pull/13138)** — 离线 W1b 恢复包：固定恢复点、私有 journal 闭包导出、操作员 Workspace 比对
7. **[#13156](https://github.com/QwenLM/qwen-code/pull/13156)** — 修复 MEMORY.md 索引 150 字符截断切断链接路径的问题（对应 #13145）
8. **[#13144](https://github.com/QwenLM/qwen-code/pull/13144)** — 校验 Hosted undo receipts，拒绝畸形身份/重复请求 ID/不一致冲突结果
9. **[#13169](https://github.com/QwenLM/qwen-code/pull/13169)** — 更新含高危漏洞的生产依赖并添加针对性 override（对应 CVE 审计失败）
10. **[#12719](https://github.com/QwenLM/qwen-code/pull/12719)** — daemon shell guard 支持多 workspace root，VS Code 多根窗口可在任意打开的文件夹执行 Git 变更

另有基础设施类：[#13172](https://github.com/QwenLM/qwen-code/pull/13172)（稳定 hosted browser smoke 门禁）、[#13033](https://github.com/QwenLM/qwen-code/pull/13033)（agent/goal 工具默认延迟声明，节省上下文）。

## 5. 功能需求趋势

- **Managed Agent / 多智能体架构**：占今日热点 Issue 的绝对多数（#12380、#12867、#12952、#12737、#13030 等），围绕 Session 持久化、durable 执行、宿主编排的分层交付是主线
- **Token / 上下文性能**：#12028 牵头的非对话上下文治理 + 工具延迟声明（#13033），强调“节省必须配 recall/成功率门禁”（#12333）
- **Hosted Workspace 能力扩展**：只读搜索工具（glob/grep）、审批 Action 展示工具输入（#13160）、权限与隔离守卫顺序
- **持久化与可恢复性**：离线恢复包、undo receipts 校验、session 历史外部化（Stage G writer fencing）
- **内存/记忆系统**：MEMORY.md 索引完整性、no-op 提取冷却（#13004）、强召回命中跳过 selector（#13003）
- **平台分发**：Android Phase 2 回归覆盖与导出 UX（#13111）、Web Shell 信任流程

## 6. 开发者关注点

- **稳定性审计密集**：今日 @wenshao 连续提交 P1/P2 审计 Issue（#13181–#13184），指向 Runtime Broker 竞态、DB 放大、无界增长——托管路径的工程安全债集中暴露
- **延迟工具发现（lazy discovery）副作用**：空参数调用（#12889）、"use me instead of X" 引导规则丢失（#12702），是近两日 nightly 的回归重点
- **权限/隔离交互**：Agent Host 无交互端时权限提示自动拒绝导致整次运行终止（#13157），凸显 headless 场景的权限模型需重构
- **CI 基础设施脆弱**：CVE 审计失败、SDK Java 故障门禁 flaky（#13017）、browser smoke 超时，社区在持续投入修复
- **安全姿态**：allowHttp 降级 enrollment token 链路（#13123）、单 token HTTP（#13183）、workspace 信任授权延迟审计（#13186）

---
*数据来源：github.com/QwenLM/qwen-code（过去 24 小时）*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*