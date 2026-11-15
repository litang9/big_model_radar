# AI CLI 工具社区动态日报 2026-11-16

> 生成时间: 2026-11-15 23:57 UTC | 覆盖工具: 7 个

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

# AI CLI 工具社区动态横向对比分析报告
**数据日期：2026-11-16**

---

## 1. 生态全景

AI CLI 工具已从“终端里的聊天助手”演进为覆盖**多端（CLI/Desktop/Mobile/Web）、多代理（subagent/computer use）、托管运行时**的完整开发平台。头部工具（Codex、Qwen Code）保持日均双版本级的高频迭代，而 Claude Code、Gemini CLI、OpenCode 则在生态整合（插件/ACP/Subagent）上深度投入。共性痛点集中在四条主线：**多端一致性、长会话稳定性、权限模型可预测性、Windows 平台支持**。开源社区的诉求正从“功能有无”转向“可观测性、静默失败与信任透明度”。

---

## 2. 各工具活跃度对比

| 工具 | 今日热点 Issues | PR 活动 | Release | 主要焦点 |
|---|---|---|---|---|
| **OpenAI Codex** | 10+（Windows 占半数） | 10+（当日提交当日关闭） | **2 个 alpha**（0.171.0-a6/a7） | Windows 稳定性、Cloud 会话、rollout 预算机制 |
| **Qwen Code** | 10（含 4 个 P1/P2 安全类） | 10+ 合入 | **1 稳定版 + nightly + SDK** | 1.0 内核迁移、Managed Agent、安全加固 |
| **Gemini CLI** | 10 | 10（含 2 个 P1 修复） | 无 | Subagent 可信度、AST 工具链、安全沙箱 |
| **OpenCode** | 10（#59387 达 **370 条评论**） | 10 | 无 | 免费层限额、Windows 2.3.0 回归、ACP |
| **Claude Code** | 10 | **0** | 无 | Mods 插件系统、多端一致性、跨产品回归 |
| **GitHub Copilot CLI** | 10+（ACP 相关 8+ 条） | **0** | 无 | ACP 生态对齐、认证刷新、计费透明度 |
| **Kimi Code CLI** | 0 | 0 | 无 | 无活动 |

**关键观察**：Codex 与 Qwen Code 是唯二保持“代码提交级活跃”的工具；Claude Code 和 Copilot CLI 当日零 PR，社区活动以 Issue 讨论为主——前者或因主干在私有仓库开发，后者处于功能收敛期。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **Windows 平台稳定性** | Codex（#51524 91条评论、#60812）、OpenCode（PowerShell 0xC0070005、PTY 僵尸进程）、Gemini CLI（路径展开 PR #30308）、Qwen Code（autocrlf 测试失败） | Windows 已成为全行业公认的第二梯队支持短板 |
| **长会话稳定性与上下文管理** | Codex（compact 后执行陈旧指令 #27731、GB 级内存 #61568）、Copilot CLI（令牌停止刷新 #4929）、Gemini CLI（无限挂起 #21409）、OpenCode（提前压缩 #61020） | Compaction 正确性是跨工具的核心信任问题 |
| **权限/沙箱模型精细化** | Claude Code（bypass 模式规则过宽 #105218）、Gemini CLI（tainted 命令授权收紧 PR #30196）、OpenCode（Plan 模式被 heredoc 绕过 #64121）、Qwen Code（不可信上下文标记 #17318） | 从二进制审批走向可预测、细粒度、防绕过的权限体系 |
| **多代理（Subagent/Multi-agent）可靠性** | Gemini CLI（误报 GOAL 成功 P1 #22323）、Qwen Code（审批死锁 #17332）、Codex（预算门控）、Claude Code（Mods 持久化 #108796） | 并行代理场景下审批渲染、终止原因上报、资源预算均不成熟 |
| **ACP / 外部编排器集成** | Copilot CLI（contextTier、Fusion 通告）、OpenCode（slash 命令无输出 #54371）、Qwen Code（1.0 内核逐 surface 切换）、Codex（app-server 文档诉求） | CLI 正在被 Zed/JetBrains/T3 Code 等客户端“协议化”消费 |
| **计费/额度透明度** | OpenCode（370 条评论的免费层汇总帖）、Copilot CLI（premium request 消耗时机）、Codex（$200/月用户 server_overloaded）、Claude Code（Pro/Max 限额异常） | 付费用户对静默降级与隐性消耗的容忍度正在触底 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 插件（Mods）生态、跨产品一致性（claude.ai/Chrome/Cowork） | 深度绑定 Anthropic 全家桶的重度用户 | 封闭主干 + 开放 Issue 追踪，多端协同优先 |
| **OpenAI Codex** | Cloud 会话、Computer Use、rollout 预算机制 | ChatGPT 订阅生态用户、桌面自动化场景 | Rust 重写 + 高度自动化流水线（bot 日清 PR），产品重心向 Cloud 倾斜 |
| **Gemini CLI** | Subagent 质量、AST 感知工具链、零依赖 OS 沙箱 | 追求 agent 正确性与 token 效率的工程师 | 开放社区驱动，P0-P3 分级治理，架构级提案（#19873）公开讨论 |
| **Copilot CLI** | ACP 协议、GitHub 原生集成、多模型（含自定义 provider） | GitHub 生态开发者、IDE/外部客户端用户 | 协议对齐优先，弱化自身 UI、强化被编排能力 |
| **OpenCode** | 免费额度、多模型接入、桌面端 | 价格敏感、跨订阅模型使用的开发者 | 社区贡献活跃，付费与限额体系仍在磨合 |
| **Qwen Code** | Managed Agent/托管运行时、Web Shell、1.0 事件驱动内核 | 企业/平台化部署场景（钉钉适配器可见中国市场导向） | 架构激进重构（共享 agent loop），安全治理流程化（verify-pr 残余风险追踪） |
| **Kimi Code CLI** | — | — | 静默期，活跃度显著落后 |

---

## 5. 社区热度与成熟度

- **最活跃（讨论热度）**：OpenCode——单 Issue 370 条评论，社区情绪强烈但多为负面（限额/付费）；Codex 紧随其后，#51524（91 条评论、持续 1 个月未修复）显示问题集中度高。
- **最快迭代**：Codex（单日 2 alpha、PR 当日闭环）与 Qwen Code（稳定版+nightly+SDK 三线发布，1.0 内核合入中）。
- **最成熟的治理**：Gemini CLI（P1/P2 分级、workstream-rollup 聚合管理）与 Qwen Code（安全残余风险显式追踪）。
- **成熟但节奏放缓**：Claude Code、Copilot CLI——Issue 质量高（多为深度产品问题），但公开代码活动停滞，问题修复依赖内部周期。
- **风险信号**：Claude Code 今日约 20 条 9 月实质 Issue 被 stale 批量关闭；Codex 高价值付费用户（$200/月）持续一个月遭遇服务不可用——两者社区信任均有磨损点。

---

## 6. 值得关注的趋势信号

1. **CLI 正在“协议化”**：ACP 相关 Issue 在 Copilot CLI、OpenCode、Qwen Code 三处同时升温，CLI 作为可被 Zed/JetBrains/手机端消费的 agent 后端，正在成为新的集成层标准。开发者应关注工具的 ACP/app-server 能力成熟度，而非仅看 TUI 体验。

2. **静默失败是信任的头号杀手**：Gemini 的误报 GOAL 成功、Copilot 的 Fusion 静默降级、MCP "Found 0 tools"——社区对“没报错但结果错”的容忍度远低于显式失败。**可观测性（终止原因、降级警告、subagent 轨迹）将是下一轮竞争力**。

3. **Compaction 正确性成为分水岭**：四个工具同时暴露上下文压缩相关问题（执行陈旧指令、内存爆炸、过早压缩）。重度用户选型时应考察压缩策略的可配置性与失败恢复路径。

4. **权限模型进入“防绕过”阶段**：Plan 模式被 heredoc 绕过（OpenCode）、tainted 命令误授权（Gemini）、bypass 规则过宽（Claude Code）表明，**内置权限模型不应作为唯一安全边界**——在不可信环境务必叠加 OS 级沙箱。

5. **托管运行时是下一个战场**：Qwen Code 的 Managed Agent/Runtime Broker、Codex 的 Cloud 会话、Claude Code 的 Remote Control 均在密集投入，但三者的远程审批流均出现卡死类 Bug——远程权限审批的可靠性是托管场景的关键瓶颈。

6. **Windows 是可量化的选型差异项**：半数以上工具的顶级痛点带 windows-os 标签。Windows 重度用户当前应优先考虑 Gemini CLI（路径修复积极）并谨慎对待 Codex/OpenCode 的大版本升级（2.3.0 回归案例）。

---

*本报告基于 2026-11-16 各仓库公开 GitHub 数据，仅供技术选型与趋势参考。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-11-16，来源：anthropics/skills）

---

## 一、热门 Skills 排行（按 PR 活跃度/影响力）

> 注：本期 PR 评论数据缺失，按 Issue 关联度、更新时间与影响范围综合排序；所有 PR 状态均为 **OPEN**。

| # | Skill / PR | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **skill-creator 触发评估修复**（[PR #1298](https://github.com/anthropics/skills/pull/1298)） | 修复触发评估的误报/漏报：并行 worker 竞争、Windows `select()` 失败、运行时异常被误判为非触发。直接回应社区两大痛点 Issue（#556、#1352），是当前生态最关键的质量基础设施 | OPEN |
| 2 | **skill-creator YAML 解析修复**（[PR #1997](https://github.com/anthropics/skills/pull/1997)） | 修复 `parse_skill_md` 手工剥离引号导致元数据与 SKILL.md 不一致的问题，影响 description 优化流程 | OPEN |
| 3 | **mcp-builder 兼容 mcp>=2**（[PR #1742](https://github.com/anthropics/skills/pull/1742)） | 适配 `streamable_http_client` 重命名与自定义 Header 新机制（修复 #1668），保障 MCP 生态兼容性 | OPEN |
| 4 | **webapp-testing 安全加固**（[PR #1980](https://github.com/anthropics/skills/pull/1980)） | 消除 `shell=True` 导致的命令注入风险（CWE-78），呼应社区对 Skill 供应链安全的高度关注（Issue #492） | OPEN |
| 5 | **docx 修订处理健壮性**（[PR #1792](https://github.com/anthropics/skills/pull/1792)） | LibreOffice 超时不再误报成功，并校验输出 DOCX 确无修订标记；关联 #2018 中 merge_runs 破坏 XML 的同类问题 | OPEN |
| 6 | **md2video-audio**（[PR #1703](https://github.com/anthropics/skills/pull/1703)） | Markdown → MP4 视频 + 拟人配音的零成本转换（Marp 管线），代表内容创作类 Skill 的热门方向 | OPEN |
| 7 | **pyxel 复古游戏开发**（[PR #525](https://github.com/anthropics/skills/pull/525)，存活 8 个月） | Python 复古游戏创建/调试/无头验证，长青未合并，说明官方对非核心场景 Skill 收录谨慎 | OPEN |
| 8 | **document-typography**（[PR #514](https://github.com/anthropics/skills/pull/514)） | 控制孤行、孤词换行、标题悬底等排版问题——针对 AI 生成文档的通用痛点 | OPEN |

---

## 二、社区需求趋势（Issues 提炼）

1. **信任与安全机制**：[Issue #492](https://github.com/anthropics/skills/issues/492)（46 评论，最热）——社区 Skill 冒用 `anthropic/` 命名空间造成权限滥用风险，呼声最高的是官方签名/命名空间隔离。
2. **组织级分发与共享**：[Issue #228](https://github.com/anthropics/skills/issues/228)——需要企业内 Skill 库与直接分享链接，替代 Slack 手传 `.skill` 文件。
3. **Skill 触发评测可靠性**：[#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)——评测脚本报 0% 触发率，掩盖真实质量，是创作者最痛的工具链缺陷。
4. **上下文/token 效率**：[#1487](https://github.com/anthropics/skills/issues/1487)——claude-api Skill 单次注入 ~156k token 打爆上下文；[#202](https://github.com/anthropics/skills/issues/202) 要求 skill-creator 遵循自身 token 效率最佳实践。
5. **新 Skill 方向提案**：agent 记忆压缩 compact-memory（[#1329](https://github.com/anthropics/skills/issues/1329)）、推理质量门禁流水线（[#1385](https://github.com/anthropics/skills/issues/1385)）、AI agent 治理安全模式（[#412](https://github.com/anthropics/skills/issues/412)）。
6. **安装/同步体验**：[#189](https://github.com/anthropics/skills/issues/189)（插件重复安装）、[#2108](https://github.com/anthropics/skills/pull/2108)（同步副本与仓库快照关系文档化）。

---

## 三、高潜力待合并 Skills

- **[PR #1298](https://github.com/anthropics/skills/pull/1298)** skill-creator 触发评估修复——对应两个活跃 Issue（#556/#1352），合并优先级高，持续更新至 9 月。
- **[PR #1742](https://github.com/anthropics/skills/pull/1742)** mcp-builder mcp>=2 适配——阻塞 MCP 新版本用户，修复路径明确。
- **[PR #1997](https://github.com/anthropics/skills/pull/1997)** skill-creator YAML 解析修复——问题复现清晰、影响 description 优化正确性。
- **[PR #1792](https://github.com/anthropics/skills/pull/1792)** docx 超时错误上报——小而确定的质量修复，11 月仍有更新。
- **[PR #2019](https://github.com/anthropics/skills/pull/2019)** xlsx 外链误报修复——有对应 Issue #2013，验证成本低。
- **[PR #1245](https://github.com/anthropics/skills/pull/1245)** Notion spec 转实现 + 简历量化审计双 Skill——企业工作流方向，10 月仍在活跃更新。

---

## 四、生态洞察

**社区最集中的诉求是“可信的 Skill 分发与可靠的触发评测”**——即让用户敢装（命名空间/签名安全）、让组织好管（共享机制）、让创作者能验证（评测工具准确性），三者共同指向 Skills 生态从"能用"走向"可信可运营"的基础设施缺口。

---

# Claude Code 社区动态日报 — 2026-11-16

## 1. 今日速览

过去 24 小时无新版本发布、无 PR 更新，社区活动集中在 Issue 讨论。热度最高的是跨产品回归 Bug #96718（Artifact 版本历史菜单被移除，已获 16 👍），同时 Mods 插件系统的多个缺陷（命令注册失效、重启后消失）持续引发关注。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues

**1. [#96718](https://github.com/anthropics/claude-code/issues/96718) — Artifact "Version history" 被移除，保存的版本无法访问（回归）**
影响 Claude Code、Cowork 和 claude.ai 全线产品，用户保存的 Artifact 历史版本变得不可达。评论 10 条、16 👍，是今日热度最高的回归问题，与 #95442 相关。

**2. [#96526](https://github.com/anthropics/claude-code/issues/96526) — modifyOtherKeys 仅对白名单终端启用，xterm/VTE 无法绑定 Ctrl+Enter**
Linux TUI 键位绑定受限，扩展键模式只对 iTerm/kitty/WezTerm/ghostty 等白名单终端开启，其余终端无法使用 Ctrl+Enter 等组合键。影响重度终端用户的自定义工作流。

**3. [#94032](https://github.com/anthropics/claude-code/issues/94032) — summarizedThinking 特性开关强制开启，完整思维链不可见**
Desktop/Mobile 端通过 feature flag (3531779070) 强制对所有模型启用思维链摘要，用户无退出选项，引发透明度方面的担忧。

**4. [#105390](https://github.com/anthropics/claude-code/issues/105390) — Claude in Chrome 站点授权永远无法授予**
扩展的 approved-sites 列表始终为空，授权提示不出现，所有页面读取均失败。功能完全不可用级别的 Bug，有稳定复现。

**5. [#99691](https://github.com/anthropics/claude-code/issues/99691) — Desktop 中 Mods 注册的斜杠命令显示 "isn't a command here"**
命令实际可执行但在 / 菜单中缺失，说明 CLI 与 Desktop 的命令注册通道存在不一致。Mods 生态的核心体验问题。

**6. [#105218](https://github.com/anthropics/claude-code/issues/105218) — Bypass permissions 模式下 Chrome 集成安全规则波及所有 shell 操作**
用户在自己的 Linux 机器上以 bypass 模式运行，但 Claude 因 Chrome 集成的安全规则拒绝执行 firewall-cmd 等系统管理命令，权限模型的边界设计引发讨论。

**7. [#107436](https://github.com/anthropics/claude-code/issues/107436) — Windows Remote Control 中 computer use 授权弹窗不出现**
项目线程调用 request_access 时无任何审批界面，computer use 功能在远程场景下被卡死。

**8. [#99234](https://github.com/anthropics/claude-code/issues/99234) — Desktop 斜杠菜单忽略 command.describe 的 isHidden**
CLI 正确隐藏，Desktop 的 SDK 命令列表未过滤 isHidden，再次体现 CLI 与 Desktop 行为不一致。

**9. [#108796](https://github.com/anthropics/claude-code/issues/108796) — Mods 在会话重启后消失**
Windows 平台新报告的 Bug（Claude Code 2.1.322），插件持久化存在问题，建议 Mods 开发者关注。

**10. [#95581](https://github.com/anthropics/claude-code/issues/95581) — Remote Control 会话不出现在 `claude agents` 视图**
移动端/Desktop 可见但终端缺失，是 #77720 的后续请求，反映多端会话视图统一的需求。

## 4. 重要 PR 进展

过去 24 小时无 PR 更新。（注：今日大量被标记 stale 的旧 Issue 被批量关闭，见下方趋势。）

## 5. 功能需求趋势

- **Mods/插件体验完善**：#99691、#99234、#108796、#101679（Mods 启动器入口）——插件系统是当前需求最密集的方向
- **多端一致性**：CLI / Desktop / Mobile / Remote Control 的行为差异（#96718、#99691、#95581、#90822）
- **权限模型精细化**：#100433（永久信任特定应用的 computer use）、#105218（bypass 模式的规则边界）
- **协作能力**：#107281（向队友的 Claude Code 会话发送待审批消息）
- **浏览器/Web 集成**：#105390（Chrome 授权）、#109313（Browser pane 暴露 WebMCP）

## 6. 开发者关注点

- **Desktop 与 CLI 的功能漂移**成为高频痛点：斜杠命令、技能补全、隐藏命令等在两端行为不一致，插件开发者首当其冲
- **权限审批流在远程场景失效**（#107436、#105218），bypass 模式的安全规则范围过大，影响自动化运维类工作流
- **今日有约 20 条 9 月旧 Issue 因 stale 被批量关闭**（Cowork 挂起、MCP 协议版本不匹配、credentials.json 无限增长、后台任务孤儿进程等），其中部分为有复现的实质性问题，社区可能需要重新追踪或重开
- **计费/限额异常**（#93332、#93340）仍是 Pro/Max 用户敏感话题

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-16** | 数据来源：github.com/openai/codex

---

## 📌 今日速览

Codex CLI 持续高频迭代，今日发布 rust-v0.171.0-alpha.6 / alpha.7 两个 alpha 版本。PR 侧以 TUI 打磨和 rollout 预算（budget）机制重构为主，Cloud 会话功能明显增强。Issues 侧 **Windows 平台问题依然占主导**，Computer Use 无法读取浏览器 URL 的 bug（#51524）已积累 91 条评论，成为社区最大痛点。

---

## 🚀 版本发布

- **rust-v0.171.0-alpha.7** — [Release 0.171.0-alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.7)
- **rust-v0.171.0-alpha.6** — [Release 0.171.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.6)

同日连发两个 alpha 版本，迭代节奏极快，0.171 稳定版可期。

---

## 🔥 社区热点 Issues（Top 10）

1. **[#51524](https://github.com/openai/codex/issues/51524)** [Windows] Computer Use 在 `get_window_state` 处卡死，无法读取 Chrome/Edge 当前 URL。自 10 月初爆发，91 条评论、持续一个多月未修复，是当前社区最集中的投诉。

2. **[#48756](https://github.com/openai/codex/issues/48756)** Mini（pets）全局快捷键 ⌥+Space 无法更改或禁用。47 个 👍 为本日最高，强抢用户全局快捷键引发强烈不满。

3. **[#61568](https://github.com/openai/codex/issues/61568)** 0.167+ TUI 启动时加载其他线程完整 rollout，单次启动占用数 GB 内存。11-14 新报，0.166 正常，属严重回归，已 CLOSED（可能已修复）。

4. **[#54227](https://github.com/openai/codex/issues/54227)** Windows Pro（$200/月）用户遭遇持续一个月以上的 `server_overloaded` 和远程 compact 失败，付费用户流失风险高。

5. **[#27731](https://github.com/openai/codex/issues/27731)** Compact 恢复后模型将陈旧的用户 prompt 当作当前指令执行，可能导致错误操作，涉及上下文管理核心正确性。

6. **[#60594](https://github.com/openai/codex/issues/60594)** 重复图片输入 + zstd 请求压缩触发 HTTP 400，禁用压缩则正常。11-10 新报的连通性回归。

7. **[#60812](https://github.com/openai/codex/issues/60812)** Windows Desktop 26.1106 更新后，附加的二级项目文件夹不再包含在可写根目录中，破坏多目录项目工作流。

8. **[#61459](https://github.com/openai/codex/issues/61459)** Dot 无法控制已连接的 Windows VM（`GetCursorPos: Access is denied`），但 ChatGPT Work 会话可以——权限模型不一致问题。

9. **[#54538](https://github.com/openai/codex/issues/54538)** 空的项目缓存导致本地数据库中完好的项目“消失”，恢复缓存后恢复，涉及数据可靠性与用户信任。

10. **[#18490](https://github.com/openai/codex/issues/18490)** [已关闭] Plan Mode 请求"compact context 后实施计划”选项，替代完全清空上下文——社区长期期待的功能方向。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#61706](https://github.com/openai/codex/pull/61706)** — exec 重构为使用共享 app-server client，统一连接管理，架构层面整合。

2. **[#61697](https://github.com/openai/codex/pull/61697)** — 恢复终端原始 alternate-scroll 模式，修复 TUI 退出后滚动行为被破坏的问题。

3. **[#61690](https://github.com/openai/codex/pull/61690)** — TUI goals 中粘贴文本保持内联而非转为文件引用，改善目标编辑体验（与 #25346 相关痛点呼应）。

4. **[#61694](https://github.com/openai/codex/pull/61694)** — 实验性功能弹窗取消时丢弃未保存编辑，交互细节修复。

5. **[#61692](https://github.com/openai/codex/pull/61692)** — 修复宽 Unicode 字符的状态栏截断问题，CJK 用户受益明显。

6. **[#61663](https://github.com/openai/codex/pull/61663)** — 修复相对工作目录下的配置读取失败，`cwd: .` 现在能正确反映外部配置变更。

7. **[#61600](https://github.com/openai/codex/pull/61600)** — 为 Cloud 会话启用自动标题生成，Cloud 功能持续补齐。

8. **[#61599](https://github.com/openai/codex/pull/61599)** — 报告 Cloud 流恢复失败的具体原因（会话不存在/无权限/登录变更），并取消废弃读取。

9. **[#61582](https://github.com/openai/codex/pull/61582)** / **[#61581](https://github.com/openai/codex/pull/61581)** — rollout 预算耗尽时门控新任务、记录中性中断标记（不归因于用户），预算机制体系化重构。

10. **[#61686](https://github.com/openai/codex/pull/61686)** — 插件 manifest 延迟到 marketplace 选中后再加载，减少无用 IO 和解析警告。

> 注：今日 PR 几乎全部由 copyberry[bot] 提交且当日关闭，显示出高度自动化的开发流水线。

---

## 📈 功能需求趋势

- **Windows 平台稳定性**：本日 30 条热门 Issue 中约半数带 `windows-os` 标签，覆盖 sandbox、Computer Use、MCP、路径处理等，是压倒性的第一诉求。
- **Computer Use / Dot 桌面自动化**：浏览器控制、VM 控制权限问题集中爆发，反映该功能处于快速铺开期但成熟度不足。
- **上下文与 Compaction**：compact 后指令错乱（#27731）、远程 compact 失败（#54227）表明上下文管理是核心关切。
- **Cloud / 多端协同**：Cloud 会话标题、流恢复、跨后端状态管理相关 PR 密集，产品重心明显向 Cloud 倾斜。
- **app-server 生态**：第三方客户端（PWA、手机端）基于 app-server 构建的诉求增多，请求更完善的文档与设备码认证（#18615）。

---

## ⚠️ 开发者关注点

1. **付费体验与稳定性错配**：Pro/Max（$200/月）用户连续一个月遭遇 server_overloaded，高价值用户流失风险需警惕。
2. **内存/性能回归频发**：TUI 启动加载全量 rollout 占数 GB 内存（#61568）、macOS 空闲线程内存不释放（#53310），大上下文场景的资源管理是短板。
3. **沙箱与权限模型可预测性差**：Full Access 下仍出现晦涩的 pre-launch 策略错误（#61689）、二级目录不可写（#60812），权限语义需要更透明。
4. **数据可靠性信任问题**：项目“消失”（#54538）、本地数据库无法访问（#24006）类问题直接动摇用户对本地存储的信任。
5. **全局快捷键等强制行为**：不可禁用的 ⌥+Space（#61568 之外的 #48756）高赞反馈提示需要更多用户可配置项。

---
*本日报基于过去 24 小时 GitHub 公开数据自动整理，仅供技术分析参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-11-16）

## 1. 今日速览

今日无新版本发布，社区活动集中在 Subagent（子智能体）方向：修复 MAX_TURNS 中断被误报为成功的 P1 级 PR #29367 有新进展，对应 Issue #22323 仍是讨论最热烈的 Issue。同时，针对该 Subagent 工作流的一批聚合 Issue（workstream-rollup）在今天集中更新，显示官方正在系统性推进 Agent 质量与可观测性改进。另有多个社区 PR 聚焦路径解析、安全规则和文档纠错。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** Subagent 触达 MAX_TURNS 后被误报为 GOAL 成功（P1）— 隐藏了任务中断事实，误导主 Agent 决策。13 条评论，修复 PR #29367 已在推进中。

2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** 利用模型原生 Bash 能力 + 零依赖 OS 沙箱与执行后意图路由（P2，大工作量）— 架构级增强提案，讨论如何安全释放 Gemini 3 的 POSIX 工具链能力。9 条评论。

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** Generalist agent 无限挂起（P1）— 简单操作（如建目录）也会挂起长达 1 小时，8 个 👍，是用户实际受阻最多的稳定性问题。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** AST 感知的文件读取/搜索/代码库映射 EPIC — 探索用 AST 工具减少误读、降低 token 噪音，可能显著提升 agent 质量与效率。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** Gemini 不主动使用自定义 skills 和 sub-agents — 用户反映即使任务高度相关也不会自动调用，属于智能体自主性核心痛点。

6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** Browser Agent 忽略 settings.json 配置（如 maxTurns）— AgentRegistry 读取了配置但未生效，配置链路断裂的典型 bug。

7. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** Browser subagent 在 Wayland 下失败（P1）— Linux 桌面用户受阻，终止原因同样误报为 GOAL，与 #22323 相关。

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** 工具数 >128 时触发 400 错误 — 需要更智能的工具作用域裁剪，对重度扩展/自定义 agent 用户影响大。

9. **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)** 模型频繁在随机位置创建临时脚本 — 影响工作区清洁度和提交卫生，反映 shell 编辑路径的规范缺失。

10. **[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)** Subagent 轨迹应可通过 `/chat share` 查看 — 可观测性诉求：便于审查和评估子智能体行为。

## 4. 重要 PR 进展

1. **[#29367](https://github.com/google-gemini/gemini-cli/pull/29367)** 修复 Subagent 恢复时覆盖原始终止原因导致的虚假 GOAL 成功（P1）— 直接对应 #22323，根因是 `LocalAgentExecutor` 无条件覆写 `terminateReason`。

2. **[#30308](https://github.com/google-gemini/gemini-cli/pull/30308)** Windows 下 `~\...` 路径在 resolvePath 中正确展开 — 使 `policyPaths`、`includeDirectories` 等配置在 Windows 上指向 home 目录而非字面相对路径。

3. **[#30196](https://github.com/google-gemini/gemini-cli/pull/30196)** 阻止对“受污染” shell 命令保存 always-allow 规则 — 修复"Always allow"一次误授权所有 `npm ...` 命令的安全隐患，改为仅单次批准。

4. **[#30306](https://github.com/google-gemini/gemini-cli/pull/30306)** 工作区扫描时跳过中途消失的子目录（P1）— 消除 `.gemini/projects.json.lock` 锁文件引起的 ENOENT 误告警。

5. **[#30307](https://github.com/google-gemini/gemini-cli/pull/30307)** list_background_processes 中被信号杀死的进程不再显示 `Exit Code: null` — 减少对模型的干扰信息。

6. **[#30267](https://github.com/google-gemini/gemini-cli/pull/30267)** 从可执行文件路径正确检测本地 git clone 安装 — 修复源码运行被误判为 npm 全局安装并触发意外自动更新的问题。

7. **[#30305](https://github.com/google-gemini/gemini-cli/pull/30305)** 修正扩展文档中永远不生效的 excludeTools 写法 — 文档中 `run_shell_command(rm -rf)` 形式实际匹配不到任何工具。

8. **[#30194](https://github.com/google-gemini/gemini-cli/pull/30194)** 修复 `gemini models` 遗漏 `/model manage` 中可用的 `gemini-3.8-flash`（v0.67.0）— 附带可复现的失败测试验证。

9. **[#30068](https://github.com/google-gemini/gemini-cli/pull/30068)**（已关闭）转发 contextManagement 配置到 core — 修复配置的 40 万 token 输出掩码阈值被默认 5 万覆盖的问题，虽已关闭但反映的配置丢失问题值得关注。

10. **[#30066](https://github.com/google-gemini/gemini-cli/pull/30066)**（已关闭）安全 PoC：演示 CI 链可在自托管 runner 上执行 fork 分支代码 — 针对 Google OSS VRP 的供应链安全验证，提示 CI 流程存在被注入风险，值得维护者重视。

## 5. 功能需求趋势

- **Subagent 质量与稳定性**（最热方向）：误报成功、无限挂起、不主动调用、并行协作（#18287）、共享内存等，构成完整的工作流改进路线图。
- **AST 感知工具链**（#22745/#22746/#22747）：用 tilth/glyph/ast-grep 等做精准代码读取与搜索，降低 token 消耗。
- **安全与沙箱**：OS 级零依赖沙箱（#19873）、破坏性命令防护（#22672）、tainted 命令授权收紧（#30196）。
- **任务管理演进**：用持久化文件 CRUD 替代 in-context 的 WriteToDo（#18836、#21000），对抗 context 腐烂。
- **可观测性**：`/bug` 报告纳入 subagent 上下文（#21763）、轨迹分享（#22598）、内部 eval 稳定化（#23166）。
- **跨平台体验**：Windows 路径处理、Wayland 浏览器支持。

## 6. 开发者关注点

- **可信度问题最突出**：Subagent 在 MAX_TURNS 中断后仍报 success/GOAL，是最影响信任的 bug，P1 修复已在路上。
- **挂起与配置失效**：agent 无限期挂起（#21409）、settings.json 配置被忽略（#22267、#30068）让用户配置努力白费。
- **工具与 token 上限**：>128 工具即 400 报错（#24246）、单轮 ~36.6k token 基线（#19561），重度用户在扩展性与成本上均有压力。
- **工作区卫生**：临时脚本乱放（#23571）、git 危险操作（#22672）增加清理与安全负担。
- **可诊断性不足**：`/bug` 与 chat share 无法覆盖 subagent 内部状态，排障困难。

---
*数据来源：github.com/google-gemini/gemini-cli | 统计窗口：2026-11-15 至 2026-11-16*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-16 | 数据来源：github.com/github/copilot-cli**

---

## 1. 今日速览

过去 24 小时无新版本发布、无 PR 更新，社区活动全部集中在 Issues。认证令牌刷新失败（#4929，13 条评论）持续发酵，成为长会话用户的核心痛点；ACP（Agent Client Protocol）生态相关的新旧 Issue 合计超过 8 条，外部编排器集成需求明显升温。此外，Copilot Fusion 的 tier 解析与 ACP 可见性问题同日出现两条新报告，值得留意。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#4929](https://github.com/github/copilot-cli/issues/4929) 长驻进程认证令牌停止刷新，所有 prompt 失败直到重启 | 13 条评论，长期未解的高影响 bug；/login 无法恢复，仅重启有效，直接影响长会话工作流 |
| 2 | [#5145](https://github.com/github/copilot-cli/issues/5145) 自定义 OpenAI 兼容 provider 在后台 shell 退出后触发 400 `reasoning_text` 错误 | 8 条评论；涉及 thinking 模式下运行时合成 assistant turn 的协议边界问题，影响 DeepSeek 等自定义模型用户 |
| 3 | [#4275](https://github.com/github/copilot-cli/issues/4275) ACP 应暴露 contextTier 会话配置项 | 8 条评论、5 👍；ACP 与交互模式功能对齐的核心诉求，阻碍外部客户端动态调整上下文窗口 |
| 4 | [#5323](https://github.com/github/copilot-cli/issues/5323) 请求增加禁用 agent checkpoint refs（refs/agents/*）的设置 | 6 条评论；agent checkpoints 使用用户 git 身份创建 ref，污染仓库工具链（如 git ls-remote 输出），社区反响强烈 |
| 5 | [#5354](https://github.com/github/copilot-cli/issues/5354) ACP 不通告 Copilot Fusion 及其 tier 配置 | 6 👍；Fusion 在交互模式可用但 ACP 客户端（如 T3 Code）无法展示，ACP 对齐问题的又一例证 |
| 6 | [#5457](https://github.com/github/copilot-cli/issues/5457) Fusion tier "high" 静默降级为 policy "standard" | 新 Issue；tier 解析错误且无任何警告，直接影响付费推理质量，或为计费/路由相关 bug |
| 7 | [#5283](https://github.com/github/copilot-cli/issues/5283) 个人 Copilot Free 账户远程环境托管被 remote-control 策略阻断 | 6 👍、triage:needs-human；策略与账户权限冲突，影响远程开发场景 |
| 8 | [#5464](https://github.com/github/copilot-cli/issues/5464) stdio MCP server 启动超时后 legacy `initialize` 回退被 -32022 拒绝 | 新 Issue；MCP Python SDK 2.3.0 兼容性问题，10 秒 discover 超时过短，影响慢启动的 MCP 服务器 |
| 9 | [#5468](https://github.com/github/copilot-cli/issues/5468) GitHub Mobile / github.com 远程控制中继失败（"sealed value must bind this connection's challenge"） | 新 Issue；会话可读但不可控，远程控制核心功能受损 |
| 10 | [#4773](https://github.com/github/copilot-cli/issues/4773) MCP 重复发现对已加载 namespace 报 "Found 0 tools" | 误导性结果导致 agent 错误判定集成不可用并跳过工作流步骤，可靠性风险 |

**已关闭值得关注：** [#2782](https://github.com/github/copilot-cli/issues/2782)（ACP 拒绝 claude-opus-4.7）、[#2068](https://github.com/github/copilot-cli/issues/2068)（后台压缩多消耗 1 次 premium request，5 👍）、[#2474](https://github.com/github/copilot-cli/issues/2474)（/model 显示上下文窗口大小）—— 后两条是社区长期呼声，关闭或代表已修复。

---

## 4. 重要 PR 进展

过去 24 小时无 PR 更新（共 0 条）。

---

## 5. 功能需求趋势

从今日 Issues 提炼出的社区关注方向：

- **ACP / 非交互集成（最热）**：contextTier 配置化（#4275）、Fusion 通告（#5354）、模型上下文上限与分 tier 计价元数据（#5466）、opus-4.7 可用性（#2782）—— 外部编排器（Zed、Conductor、T3 Code）生态对功能对齐的诉求集中爆发。
- **可配置性 / 减少干扰**：关闭 agent checkpoint refs（#5323）、隐藏 Fusion 推广提示（#5469）、更多终端主题（#5465）。
- **MCP 可靠性**：启动完成事件钩子（#5458）、discover 超时策略（#5464）、重复发现的误导性结果（#4773）。
- **远程 / 云 Agent**：远程控制中继失败（#5468）、Free 账户远程策略（#5283）、云 Agent Playwright MCP 与图片查看崩溃（#4931、#4930）。
- **Agent 行为与效率**：后台任务 sleep 轮询浪费模型 turns（#5459）、忽略用户指定的实现语言（#5462）。

---

## 6. 开发者关注点

1. **长会话稳定性是首要痛点**：认证令牌刷新失败（#4929）至今无修复方案，重启是唯一 workaround，叠加后台压缩计费问题（#2068），重度用户对“会话越长越不可靠”的担忧明显。
2. **ACP 已成为一等公民使用场景**：近三分之一的新旧活跃 Issue 与 ACP 相关，模型能力、上下文配置、计费元数据的不对齐是主要摩擦点。
3. **静默降级 / 静默失败损害信任**：Fusion high 静默降级（#5457）、MCP "Found 0 tools"（#4773）均无警告，开发者强烈期望可观测性与显式报错。
4. **对仓库与终端环境的侵入性**：agent checkpoint refs 写入用户 git 身份（#5323）、推广提示（#5469）反映社区对“工具应保持克制”的诉求。
5. **计费透明度**：premium request 的消耗时机（压缩、无效轮询 turns）持续引发退款/审查类诉求（#2068、#5462）。

---
*本报告基于过去 24 小时 GitHub 公开数据自动汇总，评论数/点赞数为生成时点快照。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：2026-11-16** | 数据来源：github.com/anomalyco/opencode

---

## 1. 今日速览

今日无新版本发布，但社区活跃度极高：免费版限额问题持续发酵（#59387 已积累 370 条评论），Windows 平台 2.3.0 版本暴露出多个问题（PowerShell 启动失败、PTY 守护进程僵尸进程泄漏）。贡献者方面，`$PWD` 解析 bug、Windows 管道重试等多个修复 PR 集中提交，桌面端与 Console 集成的改进持续推进。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues

| # | Issue | 状态 | 评论 | 为什么值得关注 |
|---|-------|------|------|----------------|
| 1 | [Free tier issues: read this first](https://github.com/anomalyco/opencode/issues/59387) | OPEN | 370 | 免费层问题的汇总帖，涵盖“额度已用尽”“重置从不发生”等核心痛点，是当前社区情绪的风向标 |
| 2 | [Pay Go with crypto](https://github.com/anomalyco/opencode/issues/23153) | CLOSED | 36 | 69 👍 的高热度付费方式需求，现已关闭，可能已有结论或纳入路线图 |
| 3 | [DeepSeek V4 Flash requires Global regions but Privacy setting is missing](https://github.com/anomalyco/opencode/issues/50155) | OPEN | 26 | 付费 Go 订阅用户无法使用新模型，暴露产品设置入口缺失，影响付费体验 |
| 4 | [Show exact free usage limit reset time](https://github.com/anomalyco/opencode/issues/52894) | OPEN | 13 | 与免费层限额问题直接相关，要求精确显示重置时间，可显著减少重复反馈 |
| 5 | [ACP: slash commands execute but never stream their output](https://github.com/anomalyco/opencode/issues/54371) | OPEN | 9 | 已复现。影响 JetBrains 等 IDE 中通过 ACP 使用 OpenCode 的核心体验 |
| 6 | [ChatGPT subscription-sharing limit error despite available allowance](https://github.com/anomalyco/opencode/issues/62529) | OPEN | 9 | 2.2.5 版本订阅额度误判，明明有余量却报“限额已达”，付费用户强烈不满 |
| 7 | [Накопитель m.2 выходит из строя](https://github.com/anomalyco/opencode/issues/64085) | OPEN | 8 | 离谱但严重：用户报告本地高强度运行导致两块 M.2 硬盘故障，需官方核查是否存在异常 I/O 行为 |
| 8 | [opencode-pty daemon leaks zombie child processes](https://github.com/anomalyco/opencode/issues/63976) | OPEN | 3 | 已复现。2.3.0 起 PTY 守护进程僵尸进程无限增长，属于真实资源泄漏 bug |
| 9 | [Model bypasses Plan mode file-write restrictions using shell heredocs](https://github.com/anomalyco/opencode/issues/64121) | OPEN | 3 | 安全问题：Plan 模式下模型可用 shell heredoc 绕过文件写入限制 |
| 10 | [Store PowerShell fails with 0xC0070005 in Windows pipe mode](https://github.com/anomalyco/opencode/issues/63892) | OPEN | 3 | 2.3.0 升级后 Windows 商店版 PowerShell 完全无法执行命令，已有修复 PR（#64137）跟进 |

**其他值得留意**：[Claude Agent 模型目录丢失上下文窗口导致提前压缩](https://github.com/anomalyco/opencode/issues/61020)（已修复关闭）、[MCP `tools/list_changed` 通知后新工具不可调用](https://github.com/anomalyco/opencode/issues/64117)。

---

## 4. 重要 PR 进展

| # | PR | 内容 |
|---|-----|------|
| 1 | [#64137](https://github.com/anomalyco/opencode/pull/64137) | 修复 Windows 管道模式下 PowerShell 7 spawn 失败（0xC0070005），带访问拒绝重试逻辑，关闭 #63892 |
| 2 | [#64126](https://github.com/anomalyco/opencode/pull/64126) | CLI 使用实际 cwd 替代陈旧的 `$PWD` 环境变量，附回归测试（已关闭，与 #64128 分工） |
| 3 | [#64128](https://github.com/anomalyco/opencode/pull/64128) | 修复完整 TUI 路径下 `file.list` 失败时的目录回退问题，补全 `$PWD` 修复链 |
| 4 | [#64133](https://github.com/anomalyco/opencode/pull/64133) | Claude 上下文发现不完整时冷却后重试，是 #61020（提前 compaction）的后续修复 |
| 5 | [#62490](https://github.com/anomalyco/opencode/pull/62490) | TUI 导出对话框支持选择保存位置，改善 `/export` 体验 |
| 6 | [#64134](https://github.com/anomalyco/opencode/pull/64134) | 实验性功能：通过 OpenCode Console 预览 Slack 消息链接，深化 Console 集成 |
| 7 | [#63542](https://github.com/anomalyco/opencode/pull/63542) | SSH 远程服务端口被占用时自动恢复，解决重连失败问题 |
| 8 | [#64132](https://github.com/anomalyco/opencode/pull/64132) | 新时间线中移除 subagent 行的 spinner（已合并关闭），时间线 UI 持续打磨 |
| 9 | [#64130](https://github.com/anomalyco/opencode/pull/64130) | 检测到 hex 已安装后隐藏安装提示，桌面端体验优化（已关闭） |
| 10 | [#64139](https://github.com/anomalyco/opencode/pull/64139) | 配对 QR 码支持携带服务器名称，改进移动端配对流程（已关闭） |

**趋势**：今天有一批 10 月中旬的社区 PR 被批量关闭（automated-pr-cleanup 标签），包括 docs 更新和多个小修复，表明仓库在清理陈旧贡献。

---

## 5. 功能需求趋势

1. **额度与付费体验透明化** — 免费层限额、重置时间显示、加密货币支付、订阅额度误判，多个高热度 Issue 聚焦于此
2. **Windows 平台稳定性** — PowerShell 管道、路径反斜杠、桌面卡死等问题集中爆发，是当前最薄弱环节
3. **Subagent 管理与可视化** — 前台/后台 subagent 执行恢复、Web 端停止后台 subagent、TUI 进度条可见性
4. **IDE/ACP 集成** — JetBrains 中 slash 命令输出不显示，ACP 兼容性仍是痛点
5. **安全与沙箱** — Plan 模式绕过漏洞、更细粒度的执行权限与沙箱（#48411）
6. **MCP 生态健壮性** — 工具列表变更通知不生效、Windows 路径转义问题
7. **桌面端体验细节** — 任务栏角标、图片附件显示、滚动条可用性

---

## 6. 开发者关注点

- **2.3.0 升级回归问题多**：Windows PowerShell 启动失败、PTY 僵尸进程泄漏、TUI subagent 进度不可见——建议 Windows 用户暂缓升级或关注 #64137 合并
- **长会话/大上下文管理**：Claude Agent 上下文窗口识别错误导致过早 compaction，重度用户对 token 效率敏感
- **程序化调用的路径正确性**：`$PWD` vs cwd 的老问题（#56386）持续影响 systemd、subprocess 等非 shell 拉起场景，本周终于有系统性修复
- **自动化运维场景**：smolvm 等轻量虚拟机环境无法运行（#64112），反映部分开发者在受限环境中使用 CLI 的需求
- **安全边界信任度**：Plan 模式被 heredoc 绕过（#64121）提示用户不应完全依赖内置权限模型做安全隔离

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-11-16）

## 📰 今日速览

Qwen Code 发布 **v0.27.4 稳定版**，核心亮点是 Managed Agent 会话可访问授权的本地目录并打开交互式 Managed Web Terminal，且不持久化凭证或路径。架构层面迎来重要进展：**1.0 Preview 事件驱动内核正逐步落地 main 分支**，headless 与 Ink TUI 已默认切换至共享 agent loop。此外，Web Shell 迎来 Codex 风格 worktree 会话、语音输入等大量新功能，安全类修复（终端控制序列净化、依赖 CVE）持续活跃。

---

## 🚀 版本发布

### v0.27.4（CLI + Desktop 同步发布）
- **Managed Agent 会话安全升级**：可访问授予的本地目录并打开交互式 Managed Web Terminal，不持久化凭证或路径（[#16844](https://github.com/QwenLM/qwen-code/pull/16844)、#16866）
- **Web Shell**：新增侧边栏 workspace 过滤器（[#17244](https://github.com/QwenLM/qwen-code/pull/17244)）
- **Managed Agent**：新增 DingTalk（钉钉）适配器
- **客户端文件系统注册**进 managed 会话（by @wenshao）

### 其他发布
- **v0.27.3-nightly.20261115**：每日 nightly 构建
- **SDK TypeScript v0.1.34**：捆绑 CLI 0.27.4，与 SDK 同源构建

---

## 🔥 社区热点 Issues（Top 10）

| # | Issue | 重要性 |
|---|-------|--------|
| 1 | [#17045](https://github.com/QwenLM/qwen-code/issues/17045) 🏛️ | **1.0 Preview 内核落地追踪**（P1，已关闭）— 事件驱动 agent loop 内核分片合入 main，是当前最重要的架构演进，已进入逐 surface 开启阶段 |
| 2 | [#17332](https://github.com/QwenLM/qwen-code/issues/17332) | **Auto 模式子代理审批死锁**（P1）— 并行工具批次含多个审批请求时只渲染一个对话框，其余请求成为孤儿并冻结整个批次，影响 multi-agent 工作流 |
| 3 | [#17371](https://github.com/QwenLM/qwen-code/issues/17371) | **verify-pr 残余风险追踪**（P1）— PR #17185 经 17 轮评审后"带残余风险合入"，此 issue 追踪安全边界遗留问题，体现安全治理流程 |
| 4 | [#17099](https://github.com/QwenLM/qwen-code/issues/17099) | **npm 安全扫描整改**（P2）— Snyk 报告 29 项发现/43 条依赖路径/13 个 npm 包，跨 web-shell 与 SDK，需分阶段升级 |
| 5 | [#17380](https://github.com/QwenLM/qwen-code/issues/17380) | **Managed Agent 启动竞态**（P2）— Workspace 运行时仍在 provisioning 时 Turn 即报 `hosted_harness_unavailable` 永久失败，用户体验为“本轮执行失败” |
| 6 | [#15225](https://github.com/QwenLM/qwen-code/issues/15225) | **auto-memory 尾随消息中断工具链**（P2，长上下文）— 自动记忆目录作为独立 user 消息附加在 tool result 后，会诱使模型输出空泛承诺而非继续调用工具 |
| 7 | [#17383](https://github.com/QwenLM/qwen-code/issues/17383) | **会话卡死 RECOVERY_BLOCKED**（P2）— Runtime Broker 创建超时后会话永久卡死，无用户恢复路径 |
| 8 | [#17318](https://github.com/QwenLM/qwen-code/issues/17318) | **系统性不可信上下文追踪**（P3，安全）— 提议对 shell/远程工具输出建立统一的“不可信上下文”标记，系统性防御 prompt injection，社区讨论热烈 |
| 9 | [#16425](https://github.com/QwenLM/qwen-code/issues/16425) | **Workflow 审批 UI 挂死**（P1，已关闭）— 权限审批请求已发出但对话框永不渲染，导致运行无限挂起，已在 0.26.x 复现并修复 |
| 10 | [#15512](https://github.com/QwenLM/qwen-code/issues/15512) | **外部 Hosted Workspace Profile（Phase 2）**（P2）— 平台分发方向的关键能力：在外部供给的 worker 上启用 Hosted 工具 |

> ℹ️ 长期 CI 噪音问题仍在持续：[#14724](https://github.com/QwenLM/qwen-code/issues/14724)（Managed Agent gate，383 条评论）与 [#13078](https://github.com/QwenLM/qwen-code/issues/13078)（每日 CVE 审计失败，52 条评论）。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#17336](https://github.com/QwenLM/qwen-code/pull/17336)** — headless 会话（`-p`/stream-json）**默认运行在共享 agent loop** 上，1.0 内核落地第 2 步
2. **[#17362](https://github.com/QwenLM/qwen-code/pull/17362)**（已合入）— **Ink TUI 默认切换至共享 agent loop**，交互式终端跟进新内核
3. **[#17228](https://github.com/QwenLM/qwen-code/pull/17228)** — Web Shell **Codex 风格 managed worktree 会话**：默认开启隔离 worktree、detached HEAD、分支创建与交接
4. **[#17377](https://github.com/QwenLM/qwen-code/pull/17377)** — 从 Qoder 移植**模型可用性账本**，为 fallback 链提供 session 级、按模型健康状态机（Option B 整合决策首个能力）
5. **[#17388](https://github.com/QwenLM/qwen-code/pull/17388)** — 修复 parallel-agent 显示中 agent 名称仅用较弱 ANSI 过滤的**安全净化缺口**（对应 #17386）
6. **[#17346](https://github.com/QwenLM/qwen-code/pull/17346)** — shell 命令确认对话框的**终端控制序列净化**，覆盖命令、警告、规则标签等多处不可信文本
7. **[#17378](https://github.com/QwenLM/qwen-code/pull/17378)** — Web Shell 新增 **Change overview 标签页**，按交付单元聚合会话文件变更与 `+/-` 规模
8. **[#15936](https://github.com/QwenLM/qwen-code/pull/15936)** — **上下文压缩健壮性修复**：压缩请求必须为摘要预留至少 4096 输出 token，否则降级或拒绝，并在超长时自动恢复
9. **[#16023](https://github.com/QwenLM/qwen-code/pull/16023)** — **跨会话共享常驻外部 Workspace**，关闭会话变为成员关系变更，避免 worker 反复创建销毁
10. **[#17364](https://github.com/QwenLM/qwen-code/pull/17364)** — Web Shell 分支选择器遇脏工作树时提供 **Stash 切换 / 携带变更** 两种解决方案，不再死胡同

其他值得留意：[#17272](https://github.com/QwenLM/qwen-code/pull/17272)（Managed `/loop` 技能按 profile 发布）、[#17385](https://github.com/QwenLM/qwen-code/pull/17385)（`/copy N` 跳过纯工具调用轮次）、[#17375](https://github.com/QwenLM/qwen-code/pull/17375)（verify-pr 信任拒绝 fail-closed）。

---

## 📈 功能需求趋势

1. **1.0 内核架构迁移**：#17045 系列工作是当前主线，headless → Ink TUI → ACP/OpenTUI 逐 surface 切换，社区高度关注
2. **Managed Agent / 托管运行时**：DingTalk 适配器、外部 Workspace、Runtime Broker、常驻 worker 共享——托管生态是投入最密集的方向
3. **Web Shell 体验对齐 Codex**：worktree 隔离、语音输入、Qwen Live 实时语音、图像生成、变更总览（#17237、#17347）
4. **安全加固**：终端序列净化、不可信上下文追踪、依赖 CVE 分阶段整改、verify-pr 信任边界
5. **多代理（multi-agent）工作流**：并行代理审批渲染、workflow 权限审批链路的稳定性修复
6. **模型能力与上下文管理**：fallback 链健康账本、长上下文压缩健壮性、auto-memory 干扰问题

---

## ⚠️ 开发者关注点

- **审批/权限 UI 可靠性是高频痛点**：#17332（子代理批量审批冻结）与 #16425（workflow 审批不渲染）均导致运行挂死，说明权限交互渲染管线在多代理场景下仍是薄弱环节
- **托管运行时的启动竞态与恢复路径缺失**：#17380、#17383 反映 provisioning 窗口期失败无重试、无用户自愈手段
- **Windows 兼容性**：#17368 显示开启 `autocrlf` 的 Windows 环境下 4 个 git 测试因 fixture 失败
- **CI 稳定性/测试去抖（deflake）工作量巨大**：过去 24 小时出现 6+ 个 deflake issue，CI Failure Patrol 自动化机制在积极运转但测试确定性待系统性改善
- **依赖安全债务**：CVE 审计持续失败近两个月（#13078），29 项 Snyk 发现已建立追踪（#17099）但整改仍在路上

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*