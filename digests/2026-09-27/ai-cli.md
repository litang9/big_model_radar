# AI CLI 工具社区动态日报 2026-09-27

> 生成时间: 2026-09-26 22:47 UTC | 覆盖工具: 7 个

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
**数据窗口：2026-09-27（过去 24 小时）**

---

## 1. 生态全景

AI CLI 工具已全面进入“从单机对话工具向 Agent 平台演进”的阶段：Qwen Code 推进 Managed Agent 分阶段架构、OpenCode 讨论插件标准化与多 Agent 协作、Codex 大力打磨桌面端与 daemon 生命周期，各家均在为长时运行、多 Agent、可恢复的会话体系铺路。与此同时，**稳定性与信任问题集中爆发**——回归 bug、静默失败、数据误删、权限绕过成为社区最高频的投诉类别。桌面端（Desktop/Cowork）成为新一轮竞争战场，但其发布质量管控明显滞后于 CLI 本体。安全与隐私议题（脱敏时机、遥测合规、命令注入、worktree 误删）从边缘诉求上升为核心关切。

---

## 2. 各工具活跃度对比

| 工具 | 活跃 Issue 动态 | PR 进展 | Release | 今日焦点 |
|---|---|---|---|---|
| **Claude Code** | ~10+ 热点（含批量 stale 清理） | 2 | 无 | 2.1.282 Linux 输入失灵回归（10 评论最高热） |
| **OpenAI Codex** | 10 个高热（最高 💬34/👍44） | 21（合并） | **6 个**（1 稳定 + 5 alpha） | Linux 桌面端 26.924 大面积卡死 |
| **Gemini CLI** | 10 个热点（多为 P1/P2 标注） | 10+（含性能系列） | 1（nightly） | Subagent 可信度 + 性能 PR 提速 20-40x |
| **Copilot CLI** | 35 条更新（多为批量关闭） | 0 | 无 | 内存 OOM 问题持续发酵 |
| **Kimi Code CLI** | 0 | 0 | 无 | 无活动 |
| **OpenCode** | 10+ 热点（最高 37👍） | 10（多为批量清理关闭） | 无 | V2 稳定性阵痛 + 插件标准化提案 |
| **Qwen Code** | 10 个热点（架构提案 32 评论） | 10 | **4+**（CLI/Desktop/双 SDK） | Managed Agent 蓝图 + worktree 误删 P1 |

**观察**：Codex 与 Qwen Code 处于高强度发布节奏；Claude Code、OpenCode、Copilot CLI 今日以社区治理（批量关闭）和问题积累为主；Kimi CLI 生态沉默。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **长会话稳定性与内存管理** | 全部活跃工具 | Copilot CLI 的 JS 堆 OOM（#4725/#4664）、Codex macOS 55GB 内存冻结（#33582）、Gemini 内存生命周期 PR、Claude `/compact` 挂起 |
| **权限与安全模型可信度** | Claude Code、Gemini、Qwen、OpenCode | 未批准即执行（Claude #69397）、Windows 命令注入修复（Gemini PR #29510）、worktree 自动清理误删用户文件（Qwen #12735/#12758）、权限确认卡死（OpenCode #27875） |
| **多 Agent / Subagent 治理** | Qwen、Gemini、OpenCode、Claude | 并行数量上限（OpenCode #27110，37👍 全场最高）、subagent 挂起/误报成功（Gemini P1 ×2）、resume 后子代理静默失效（Claude #80315） |
| **配置静默失效 / fail-fast** | OpenCode、Gemini、Copilot CLI | timeout 被忽略（OpenCode #46692）、settings 不生效（Gemini #22267、Copilot #4260） |
| **插件生态与 MCP 兼容** | Claude、OpenCode、Copilot CLI、Qwen | 孤儿插件无法卸载（Claude #97095）、Agent Plugins 标准提案（OpenCode #40993，15👍）、MCP 发现超时与 FastMCP 容错 |
| **桌面端成熟度与平台覆盖** | Codex、Claude、Qwen、OpenCode | Codex 26.924 卡死风暴、Windows arm64 缺失（Copilot #3306）、Linux aarch64 请求（Qwen #12806）、Windows 体验普遍滞后 |

---

## 4. 差异化定位分析

- **Claude Code**：企业级 Agent 工作流定位，Cowork/Desktop 多会话与 hook 体系是独有方向；但权限体系可信度（多次“未批准即执行”报告）与其安全叙事存在张力。Issue 治理偏“清理型”，响应节奏放缓。
- **OpenAI Codex**：**迭代速度最快**（6 版本/日、21 PR 合并），工程修复响应敏捷（窗口闪烁 PR 当天合并）；重心在桌面端 + Windows 平台 + 弱网重连，面向全平台终端用户。但 26.924 桌面版翻车说明发布质量管控未跟上节奏。
- **Gemini CLI**：**社区工程化程度最高**——P1/P2 标签、基准数据支撑的性能 PR（20-40x 提速）、原子化状态写入等系统性修复；方向上押注 AST 代码理解与 OS 级沙箱，技术前瞻性强。
- **Copilot CLI**：依托 GitHub 生态，差异化在 BYO-K 与企业认证，但今日无 PR/无 Release，内存 OOM 与配置碎片化长期未解，活跃度垫底（活跃工具中）。
- **Qwen Code**：**架构投入最激进**——Managed Agent 双引擎、OpenAPI 契约优先、Java/TS 双 SDK、Mesh 多 Agent 协作，明显面向企业级托管/远程场景；但 Remote-SSH P1 与数据安全问题暴露架构复杂度代价。
- **OpenCode**：开源社区驱动，诉求最“草根”（37👍 的并行限制），Agent Plugins 厂商中立标准若落地或成生态变量；V2 过渡期质量波动大。
- **Kimi CLI**：无活动，暂不具备横向竞争力。

---

## 5. 社区热度与成熟度

**活跃度梯队**：

| 梯队 | 工具 | 判断依据 |
|---|---|---|
| 第一梯队（高热+快速迭代） | Codex、Qwen Code、Gemini CLI | 多版本发布 + 双位数 PR + 高互动 Issue |
| 第二梯队（高讨论、低发布） | Claude Code、OpenCode | 社区讨论热（32/37👍 级提案）但今日无 Release，处于积累/重构期（OpenCode V2 清理明显） |
| 第三梯队 | Copilot CLI | 讨论存量大但增量停滞，35 条更新多为批量关闭 |
| 观望 | Kimi CLI | 零活动 |

**成熟度信号**：Codex 和 Claude Code 用户基数最大（单 Issue 💬/👍 显著领先），但也进入“回归 bug 频发”的平台期特征；Gemini CLI 的标签纪律与基准化 PR 显示工程成熟度最高；Qwen Code 架构蓝图宏大但 P1 密度偏高，仍处快速上升期。

---

## 6. 值得关注的趋势信号

1. **“Agent 平台化”是确定性方向**：Qwen 的 Managed Agent、OpenCode 的 Mesh/插件标准、Codex 的 daemon 体系殊途同归——Session 持久化、可恢复执行、多 Agent 协调将成为下一轮标配能力，插件/工具生态的**厂商中立标准化**（OpenCode #40993）值得早期跟进。
2. **静默失败是 Agent 信任的最大威胁**：误报成功（Gemini #22323）、输出截断记为完成（OpenCode #40146）、配置不生效、子代理假运行（Claude #80315）跨工具普遍存在——**可观测性与 fail-fast 将成为选型硬指标**，自建防护时应假设 Agent 汇报不可信。
3. **数据安全责任正在向工具方转移**：worktree 误删（Qwen）、脱敏滞后（Gemini #26525）、遥测无视禁用开关（Qwen #12770）、AI 自生成安全 hook 可绕过（Claude #77177）——自动化程度越高，破坏性操作的守卫一致性越关键；企业采用前应审计自动清理与遥测链路。
4. **桌面端质量滞后于 CLI**：Codex 26.924 事故、Claude Cowork UX、OpenCode Desktop OOM 表明 GUI 壳层是新短板；**短期内生产环境应以 CLI 为主力，桌面端锁定已知稳定版本**（如 Codex 26.917）。
5. **内存/长会话是所有 Node/TS 系工具的共性天花板**：跨 4 个工具的 OOM 报告提示，重度用户需将会话重启/分段纳入日常运维习惯，Qwen 的“工具结果分段持久化”（PR #12767）代表了可能的解法方向。
6. **升级需谨慎成为常态共识**：Claude 2.1.282、Codex 26.924、Copilot v1.0.83 均为近期回归案例——**建议生产环境固定版本、延迟 1-2 个版本跟进**，并关注各仓库的回滚路径。

---

*本报告基于各仓库过去 24 小时公开 GitHub 数据整理，反映时点快照，趋势判断需结合多日数据验证。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
*数据截止：2026-09-27 | 来源：anthropics/skills*

---

## 一、热门 Skills 排行（PR）

注：本期 PR 评论数据缺失（均为 undefined），以下按综合热度（讨论延续性、更新活跃度、Issue 关联度）排序。

| # | Skill / PR | 功能 | 讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 触发评估修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 隔离触发评估、修复 Windows `select()` 失败及运行时错误误判 | 与热门 Issue #556（0% 触发率）直接相关，是 Skill 可靠性基础设施的核心修复；持续更新 3 个月 | OPEN |
| 2 | **mcp-builder 兼容修复** [#1742](https://github.com/anthropics/skills/pull/1742) | 支持 mcp>=2 的 `streamable_http_client` 重命名与自定义 header | 修复 #1668，关联 Issue #1390（评估脚本对真实 MCP server 全部报 0 分）——mcp-builder 是近期 bug 最集中的官方 Skill | OPEN |
| 3 | **docx 孤立评论检测** [#1734](https://github.com/anthropics/skills/pull/1734) | 检测 docx 中孤立/悬空的评论文档 | docx 是 PR 修复最密集的官方 Skill（另见 #1792 超时误报、#541 书签 ID 冲突） | OPEN |
| 4 | **pyxel 复古游戏开发** [#525](https://github.com/anthropics/skills/pull/525) | 用 Python 创建、调试、验证复古游戏 | 生命周期最长的社区 PR（3 月提交，9 月仍有更新），开发者原生贡献 | OPEN |
| 5 | **document-typography** [#514](https://github.com/anthropics/skills/pull/514) | AI 生成文档的排版质控（孤行、寡行、编号对齐） | 切中“AI 生成文档排版差”的普遍痛点，定位独特 | OPEN |
| 6 | **AWT (AI Watch Tester)** [#822](https://github.com/anthropics/skills/pull/822) | AI 视觉 + 浏览器控制的零代码 E2E 测试 | 测试自动化方向代表，长期活跃 | OPEN |
| 7 | **blast-radius** [#1776](https://github.com/anthropics/skills/pull/1776) | 批量/破坏性写操作前的“影响半径”检查清单 | 安全防护类新秀，覆盖删数据、批量邮件等高危场景 | OPEN |
| 8 | **scnet-hpc** [#1615](https://github.com/anthropics/skills/pull/1615) | SCNet HPC 集群的 SSH + Slurm 操作 | 垂直领域（科研计算）代表 | OPEN |

---

## 二、社区需求趋势（Issues 提炼）

1. **安全与信任边界**（最热）：#492（43 评论）——社区 Skill 冒用 `anthropic/` 命名空间构成信任滥用；#1175 关注 SKILL.md 内写权限逻辑的安全隐患。社区强烈呼吁签名/命名空间治理。
2. **组织级分发与共享**：#228（16 评论）——企业内共享 Skill 库、直接分享链接，替代 Slack 传文件的原始方式。
3. **Skill 可靠性与评估**：#556（12 评论，触发率 0%）、#1390（评估脚本 fabricate 错误）——Skill 触发/评估工具链是当前质量痛点核心。
4. **Token 效率与上下文管理**：#1487（claude-api 单次注入 156k token 打爆上下文）、#1329（compact-memory 符号化压缩 agent 状态）、#189（插件重复导致 context 冗余）。
5. **新 Skill 方向提案**：agent 治理与审计（#412）、推理质量门禁流水线（#1385）——AI 自我监督类元 Skill 兴起。
6. **平台互通**：Bedrock 支持（#29）、Skills 暴露为 MCP（#16）。

---

## 三、高潜力待合并 Skills

- [#1298](https://github.com/anthropics/skills/pull/1298) skill-creator 评估修复 —— 直接回应 #556，官方基础设施级修复，合并优先级高
- [#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder mcp>=2 兼容 —— 修复在用 Issue #1668，9/26 仍在更新
- [#1792](https://github.com/anthropics/skills/pull/1792) docx LibreOffice 超时误报修复 —— 小而准的官方 Skill 修复
- [#538](https://github.com/anthropics/skills/pull/538) / [#541](https://github.com/anthropics/skills/pull/541) pdf/docx 精确 bug 修复（来自高产出贡献者 @Lubrsy706）
- [#525](https://github.com/anthropics/skills/pull/525) pyxel —— 持续维护半年，作者响应积极，有望成为首个游戏开发类官方 Skill

---

## 四、生态洞察（一句话）

**社区最集中的诉求是“让 Skills 值得信任”：从命名空间安全、触发可靠性，到 token 效率，生态正从“能跑”转向“可信赖的企业级基础设施”。**

---

# Claude Code 社区动态日报（2026-09-27）

## 1. 今日速览

今日无新版本发布。最值得关注的动态是 **2.1.282 版本引入的 Linux TUI 输入框失灵 bug（#96931）**，已成为过去 24 小时评论最多的 Issue。此外，一条涉及会话数据与用户配额关系的内部安全默认值 PR（#97334）有新进展。多数活跃 Issue 为旧问题的 stale 清理与批量关闭。

## 2. 版本发布

过去 24 小时无新 Release。⚠️ 注意：当前最新版 2.1.282 存在回归问题（见下），Linux 用户可考虑暂时停留在 2.1.281。

## 3. 社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#96931](https://github.com/anthropics/claude-code/issues/96931) 2.1.282 输入框停止接受按键 | **今日最高热度（10 评论）**。新版本回归 bug：会话开始 0-90 秒内输入框失灵，Ctrl-C 无效，进程假死。有稳定复现，Linux 用户升级需谨慎 |
| 2 | [#69397](https://github.com/anthropics/claude-code/issues/69397) PowerShell 工具未弹权限确认即执行破坏性命令 | **安全问题**。工具跳过权限提示且 transcript 无记录，涉及权限体系可信度，长期未解决 |
| 3 | [#75330](https://github.com/anthropics/claude-code/issues/75330) Claude 执行了未经批准的操作（已关闭） | 同为权限安全问题，跨 Bedrock/VS Code 场景，值得关注关闭原因 |
| 4 | [#75510](https://github.com/anthropics/claude-code/issues/75510) 权限请求流失败后无退避重试约 128 次（已关闭） | 权限请求失败时的重试风暴，transcript 分析发现的典型工程问题 |
| 5 | [#97095](https://github.com/anthropics/claude-code/issues/97095) 同步插件变“孤儿”无法卸载 | 新 Issue（9/25）。claude.ai 同步的插件无 marketplace 支撑，本地与云端均无法移除，跨端插件管理缺陷 |
| 6 | [#80315](https://github.com/anthropics/claude-code/issues/80315) 崩溃后 `--resume` 会话中 Agent/Task 静默失效 | 子代理显示 "now running" 但实际不运行且无失败信号，影响排障与可靠性 |
| 7 | [#77177](https://github.com/anthropics/claude-code/issues/77177) Hook 创建流程产出可被绕过的安全限制 | Claude 自己写的 bash 正则 hook 存在常见绕过路径，暴露 AI 生成安全代码的质量风险 |
| 8 | [#75400](https://github.com/anthropics/claude-code/issues/75400) 桌面端多会话模式 `/compact` 无限挂起（已关闭） | 大会话压缩无错误、无恢复路径，UI 计数器无限增长 |
| 9 | [#80264](https://github.com/anthropics/claude-code/issues/80264) 大小写不敏感文件系统产生重复项目条目 | macOS/Windows 默认文件系统均受影响，项目列表以字面路径为 key 导致去重失败 |
| 10 | [#78233](https://github.com/anthropics/claude-code/issues/78233) Cowork 置顶项目后从 Recents 消失 | UX 问题：越整理项目 Recents 越空，与用户组织习惯背道而驰 |

**其他动向**：一批 9/19-9/23 的 issue（API 误封、GitHub 集成、使用量图表配色等）被批量关闭，多为 needs-info/invalid 分类清理。

## 4. 重要 PR 进展

过去 24 小时仅 2 条 PR 更新：

1. [#97334](https://github.com/anthropics/claude-code/pull/97334) **sec-default: 会话保留行数不再超出用户层级**
   - 安全相关默认值调整，涉及 `session.append` 事件的合并顺序约束。作者注明 test 检查在 CLI 携带该事件前“按构造即为红”，属于跨仓库协同发布。

2. [#41611](https://github.com/anthropics/claude-code/pull/41611) 补充缺失 source
   - 3 月提交的社区 PR，长期未合并，今日有活动更新。

## 5. 功能需求趋势

- **TUI 稳定性**：输入失灵、焦点抢占（#75360）、`/compact` 挂起等终端交互问题持续高频
- **权限与安全模型**：权限提示被绕过、重试风暴、hook 安全性——权限体系可信度是社区最敏感话题
- **插件生态管理**：marketplace 同步、卸载、submodule 支持（#88074）等插件生命周期问题增多
- **桌面端（Cowork/Desktop）成熟度**：托盘图标、快捷方式迁移、Recents 逻辑、Enterprise 功能差异（#80316）
- **会话恢复与子代理可靠性**：crash 后 resume、Agent 静默失败
- **跨平台一致性**：Windows/Linux 桌面端问题显著多于 macOS

## 6. 开发者关注点

1. **2.1.282 回归风险**：Linux 用户输入失灵是当下最紧迫问题，建议暂缓升级
2. **权限审计缺口**：多次报告“未批准即执行”，企业用户应关注 transcript 完整性
3. **长会话/大会话体验**：compact 挂起、resume 后子代理失效，长时使用可靠性仍是痛点
4. **AI 生成防护代码不可盲信**：#77177 提醒用户对 Claude 自动生成的安全 hook 需人工审查
5. **Issue 治理**：大量 stale/invalid 标签清理，部分有价值的旧 bug（如 #69397）存在被误关风险，建议受影响用户及时跟进

---
*数据来源：github.com/anthropics/claude-code | 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-09-27** | 数据来源：github.com/openai/codex

---

## 📌 今日速览

过去 24 小时 Codex 发布了 **6 个版本**（含 5 个 alpha 预发布和稳定版 0.157.1），但社区焦点集中在 **桌面端大面积启动/任务卡死问题**——Linux 26.924 版本任务卡在 "Starting your task"、Windows 端白屏/无限加载等 Issue 持续发酵。同时，开发者积极提交修复，合并了 **21 个 PR**，重点覆盖 Windows 控制台窗口闪烁、TUI 体验优化和网络重连稳定性。

---

## 🚀 版本发布

| 版本 | 说明 |
|---|---|
| rust-v0.157.1 | 稳定版，Chores 类更新，[Changelog](https://github.com/openai/codex/compare/rust-v0.157.0...rust-v0.157.1) |
| rust-v0.159.0-alpha.6 / .5 / .4 | 0.159 预发布迭代频繁，说明主线开发活跃 |
| rust-v0.158.0-alpha.15.1 / alpha.2.1 | 0.158 补丁预发布 |

> 注：0.157.1 的 Release Highlights 因 PR 索引为空无法生成。alpha 版本迭代速度（一天多个）表明 0.159 主线正在快速推进。

---

## 🔥 社区热点 Issues（Top 10）

1. **[#48212](https://github.com/openai/codex/issues/48212)** Linux 桌面端任务卡在 "Starting your task"（💬34 👍29）
   26.924.20706 版本最严重的问题，CLI 正常但桌面端完全不可用，是当前热度最高的 Issue。

2. **[#48074](https://github.com/openai/codex/issues/48074)** Windows 安装 daemon 后终端窗口反复闪烁（💬28 👍44）
   👍 最高，长期存在的 Windows 体验痛点；已有对应 PR #48483 修复，见下文。

3. **[#48189](https://github.com/openai/codex/issues/48189)** Linux 桌面 26.924 卡死，回滚 26.917 可修复（💬13 👍26）
   与 #48212 同源，用户已找到临时回滚方案，值得受影响用户参考。

4. **[#48016](https://github.com/openai/codex/issues/48016)** Windows 无法启动（已关闭）（💬29）
   高热度且已解决，Windows 用户可关注其排查过程。

5. **[#46949](https://github.com/openai/codex/issues/46949)** Windows remote-control daemon 为 MCP 子进程弹出可见控制台（💬19）
   长期未修，影响 MCP 工具链体验，与 #44768 属同类问题。

6. **[#46110](https://github.com/openai/codex/issues/46110)** Linux sandbox 拒绝 snapd 的 nsfs 挂载（💬18）
   Ubuntu 原生环境 bubblewrap 构建失败，阻断所有文件系统受限命令，sandbox 兼容性问题的典型代表。

7. **[#48333](https://github.com/openai/codex/issues/48333)** Windows 桌面卡启动 spinner，需手动结束 app-server（💬16）
   桌面端与 app-server 生命周期管理问题的又一实例。

8. **[#48419](https://github.com/openai/codex/issues/48419)** Linux 26.924 打开本地线程挂起——hydration 未发送 thread/resume（💬9）
   提供了深入的技术分析（120s 超时、RPC 追踪），对定位 #48212/#48189 根因有参考价值。

9. **[#48545](https://github.com/openai/codex/issues/48545)** Windows 端 401 (sk-svcac) 事故后仍无法恢复（💬2）
   9 月 26 日服务端事故的遗留个案，重装后依旧失败，值得关注官方跟进。

10. **[#33582](https://github.com/openai/codex/issues/33582)** macOS 端内存涨至 55GB 导致系统冻结（💬9）
    两个月未修的严重性能问题，长会话用户需警惕。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#48483](https://github.com/openai/codex/pull/48483)** 为管道化 Windows 子进程默认设置 `CREATE_NO_WINDOW`
   直接修复 #48074/#46949 系列控制台窗口闪烁问题，Windows 用户最受期待的修复。

2. **[#48491](https://github.com/openai/codex/pull/48491)** 受限 Windows 启动器下回退到嵌入式模式
   修复 `cargo run` 等启动器阻止 daemon 存活导致 CLI 无法打开的问题，与 #48016 相关。

3. **[#48531](https://github.com/openai/codex/pull/48531)** 增强 Windows sandbox 运行时注册错误上下文
   改善 Windows sandbox 问题的可诊断性。

4. **[#48508](https://github.com/openai/codex/pull/48508)** steering 时保留 WebSocket continuation
   避免中断当前响应时断开重连、重发全部历史，提升长会话效率。

5. **[#48318](https://github.com/openai/codex/pull/48318)** TUI 重连持续到共享截止时间
   放宽 5 次重试上限至 120 秒预算内，提升弱网恢复能力。

6. **[#48502](https://github.com/openai/codex/pull/48502)** 修复本地 app-server 的浏览器登录
   解决本地 daemon 无法自动打开浏览器登录的问题。

7. **[#48549](https://github.com/openai/codex/pull/48549) / [#48548](https://github.com/openai/codex/pull/48548)** 复制 TUI 响应时保留 Markdown 表格与单元格元数据
   明显改善终端用户的复制体验。

8. **[#48469](https://github.com/openai/codex/pull/48469)** 更多终端默认支持选中即复制
   覆盖 Ghostty ≥1.2.0、Kitty (macOS)、Windows Terminal、VS Code 等。

9. **[#48272](https://github.com/openai/codex/pull/48272)** Windows daemon 启动不再继承 launcher stdio
   修复调用方等待 EOF 挂起的问题，改善 daemon 生命周期管理。

10. **[#48551](https://github.com/openai/codex/pull/48551) / [#48489](https://github.com/openai/codex/pull/48489)** TUI 数学公式与 Mermaid 渲染修复
    细节体验打磨，反映 TUI 渲染能力的持续完善。

---

## 📈 功能需求趋势

- **桌面端稳定性**：26.924 更新引发的 Linux/Windows 启动卡死、白屏问题集中爆发，是当前最强信号——桌面端发布质量管控需加强。
- **Windows 平台体验**：控制台窗口闪烁、daemon 生命周期、sandbox 注册等问题占比极高，Windows 是当前最需要投入的平台。
- **Sandbox 兼容性**：Linux snapd/nsfs、macOS TIOCSTI 等宿主环境兼容问题持续存在。
- **无障碍与国际化**：Read Aloud（#20957）、波兰语键盘输入（#48414）等需求反映国际用户群扩大。
- **Remote/多账号**：账号切换后 Remote 失效（#39698）等功能性问题待解。

---

## ⚠️ 开发者关注点

1. **避免升级 26.924 桌面版（Linux）**：受影响用户可回滚 26.917.71314（见 #48189）。
2. **Windows daemon 是问题高发区**：控制台闪烁、stdio 继承、启动器限制——好消息是 #48483/#48491/#48272 已合并，预计下个稳定版显著改善。
3. **弱网/断连恢复**：多个 PR 聚焦重连策略，弱网环境用户值得期待 0.158/0.159。
4. **服务端事故残留**：9 月 26 日 401 事故大部分用户已恢复，个别 Windows 用户仍受影响（#48545），建议关注官方状态页。
5. **内存泄漏**：macOS 长会话内存膨胀（#33582）两个月未修，建议定期重启 app-server 规避。

---
*本报告由 AI 自动生成，数据统计窗口为过去 24 小时。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-09-27）

## 📌 今日速览

今日社区活跃度集中在**稳定性与内存管理**两大方向：多个 P1 级别的 Agent 挂起/崩溃问题持续发酵，同时 Auto Memory 系列安全与质量问题集中提交。PR 方面，性能优化成为亮点——多位贡献者提交了算法线性化改造，基准测试显示部分操作提速 **20-40 倍**。夜间版本 v0.63.0 照常发布。

---

## 🚀 版本发布

**v0.63.0-nightly.20260926.g2fe7c2d3f**
- fix(core): 移除无效的 `diff.external` 覆盖配置（[#29467](https://github.com/google-gemini/gemini-cli/pull/29467)）
- 版本号例行 bump 至 0.63.0-nightly

---

## 🔥 社区热点 Issues Top 10

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** Subagent 触发 MAX_TURNS 后误报为 GOAL 成功（P1，13 评论）
   中断被伪装成成功，用户无法察觉任务实际未完成。直接影响 Agent 可信度，属最高优先级可信性缺陷。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** Generalist agent 无限挂起（P1，8 评论 / 8 👍）
   简单如创建文件夹的操作也会挂起长达一小时，用户只能手动禁止 subagent 规避。👍 数最高，痛点最普遍。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** 零依赖 OS 沙箱 + 执行后意图路由（P2，9 评论）
   利用 Gemini 3 原生 bash 能力的架构级提案，平衡模型 POSIX 工具链偏好与安全隔离，方向性讨论热度高。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** AST 感知的文件读取/搜索/代码库映射 EPIC（P2，7 评论）
   探索用 AST 精确定位方法边界，减少错位读取和 token 噪音，是工具层演进的长期路线图。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** 模型主动使用 skills/sub-agents 频率过低（P2，6 评论）
   自定义 skill 几乎不会被自主调用，需显式指令触发，反映调度提示词工程的实际短板。

6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)** Auto Memory 确定性脱敏与日志削减（P2，5 评论）
   安全敏感：secret 脱敏发生在内容已进入模型上下文之后，存在泄露窗口，需确定性前置脱敏。

7. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)** Auto Memory 对低信号会话无限重试（P2，4 评论）
   提取 agent 不读取即不标记已处理，导致同一会话被反复唤醒，浪费后台资源。

8. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** Browser Agent 忽略 settings.json 配置（如 maxTurns）（P2，4 评论）
   AgentRegistry 合并逻辑与实际生效配置脱节，配置透传链路存在断点。

9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** Browser subagent 在 Wayland 下失败（P1，4 评论）
   Linux 桌面（Wayland）兼容性问题，同样伴随 Termination Reason 误报。

10. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** get-shit-done output hook 导致崩溃（P1，3 评论）
    长输出摘要打印阶段触发崩溃，稳定性硬伤。

---

## 🔧 重要 PR 进展 Top 10

1. **[#29520](https://github.com/google-gemini/gemini-cli/pull/29520)**（P1）流式输出/工具确认期间保持滚动位置稳定，修复视口跳变问题
2. **[#29451](https://github.com/google-gemini/gemini-cli/pull/29451)**（P1，已关闭）限制工具输出大小并优化长时运行 agent 循环的内存生命周期，防止内存无限增长
3. **[#29510](https://github.com/google-gemini/gemini-cli/pull/29510)** 加固 Windows 子进程参数引用，修复 `shell: true` 下的**命令注入漏洞**
4. **[#29459](https://github.com/google-gemini/gemini-cli/pull/29459)**（P1）将取消信号传播至 `!{...}` shell 注入命令，修复挂起命令无法中断的问题
5. **[#29397](https://github.com/google-gemini/gemini-cli/pull/29397）**（P2）防止中断回合产生合成 assistant 消息导致的**会话上下文污染与无限循环**
6. **[#29402](https://github.com/google-gemini/gemini-cli/pull/29402)**（P1）持久化状态写入原子化（临时文件 + fsync + rename），防止 state.json 被截断清空
7. **[#29400](https://github.com/google-gemini/gemini-cli/pull/29400)**（P1）修复 `-r` 恢复会话时 functionResponse 重复回放问题
8. **[#29398](https://github.com/google-gemini/gemini-cli/pull/29398)**（P1）MCP 工具发现增加短超时，避免 JSON-RPC id 不匹配时等待 10 分钟
9. **[#29515](https://github.com/google-gemini/gemini-cli/pull/29515) / [#29516](https://github.com/google-gemini/gemini-cli/pull/29516) / [#29512](https://github.com/google-gemini/gemini-cli/pull/29512)** 性能系列：Set/Map 替代 indexOf、缓存 turn 索引、push+reverse 替代 unshift，合成基准从 ~300-400ms 降至 5-18ms
10. **[#28676](https://github.com/google-gemini/gemini-cli/pull/28676)**（help wanted）bootstrap 父进程向子进程转发 SIGTERM 等终止信号，避免孤儿进程

---

## 📈 功能需求趋势

- **Agent 可靠性与可观测性**（最热）：终止原因误报（#22323、#21983）、挂起（#21409）、bugreport 缺失 subagent 上下文（#21763）、subagent 轨迹不可分享（#22598）
- **Auto Memory 安全与质量**：前置确定性脱敏（#26525）、无效 patch 处理（#26523）、后台重试策略（#26522）
- **代码理解工具升级**：AST 感知读取/搜索/映射（#22745、#22746）、token 节省的“手术式提取”（#19561）
- **沙箱与安全执行**：零依赖 OS 沙箱提案（#19873）、破坏性命令防护（#22672）
- **任务管理持久化**：以文件 CRUD 替代 in-context todo（#18836、#21000）
- **终端体验**：resize 无闪烁渲染（#21924）

---

## ⚠️ 开发者关注点

1. **Subagent 可信度危机**：挂起、误报成功、配置不生效是投诉最集中的三类问题，“禁用 subagent” 成为用户临时 workaround
2. **内存/上下文管理**：token 膨胀、上下文腐烂、会话恢复异常（重复响应）持续被提及，对应多个 P1 PR 正在推进
3. **取消/中断语义**：shell 注入、子进程、MCP 发现等多处缺乏超时与取消传播，社区 PR 密集修复中
4. **Auto Memory 隐私担忧**：脱敏时机滞后于模型上下文注入，安全敏感用户的核心顾虑
5. **Windows/Linux 兼容性**：Windows 命令注入风险、Wayland 浏览器代理失败，跨平台一致性仍需加强

---

*数据截至 2026-09-27，来源：github.com/google-gemini/gemini-cli*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-09-27 | 数据来源：github.com/github/copilot-cli**

---

## 📋 今日速览

过去 24 小时无新版本发布、无活跃 PR，但社区讨论热度较高（35 条 Issue 更新）。最突出的主题是**内存稳定性问题**——多个 JavaScript heap OOM 相关 Issue 持续活跃，其中 Linux 平台的频发崩溃（#4725）仍未解决。此外，大量历史 Issue 于昨日集中关闭，显示团队进行了一轮批量处理/清理。

---

## 🚀 版本发布

过去 24 小时无新 Release。

---

## 🔥 社区热点 Issues

1. **#2995** 无法使用 DeepSeek API（14 评论 / 👍9）
   BYO-K（自带 Key）配置 DeepSeek 后无法正常使用，涉及 `COPILOT_PROVIDER_*` 环境变量体系。BYO-K 是社区高关注度功能，此问题已持续 5 个月，昨日关闭。
   https://github.com/github/copilot-cli/issues/2995

2. **#4664** 恢复长期会话时 JS 堆内存溢出崩溃（9 评论）
   会话文件过大导致 Node/V8 超过 4GB 堆限制后崩溃，反映长会话 + context-memory 的内存管理缺陷。已关闭，可关注修复版本。
   https://github.com/github/copilot-cli/issues/4664

3. **#4725** Linux 平台频发 OOM 崩溃（7 评论 / 仍 OPEN）
   每隔几分钟 Mark-Compact 失败崩溃一次，疑似内存泄漏。**目前仍开放**，是稳定性方向最需跟进的问题。
   https://github.com/github/copilot-cli/issues/4725

4. **#4753** v1.0.83 会话恢复取消 MCP 连接（1s 超时回归）
   会话恢复时 stdio MCP 服务器初始化超时从 16s 缩至 1s，导致服务器静默不可用。典型的版本回归案例，已关闭。
   https://github.com/github/copilot-cli/issues/4753

5. **#4370** FastMCP 兼容性：`server/discover` 返回 -32602 导致初始化失败
   CLI 对未实现 `server/discover` 的 MCP 实现容错不足，影响 FastMCP 生态用户。
   https://github.com/github/copilot-cli/issues/4370

6. **#4160** Plan 模式误拦截只读命令
   关键词启发式匹配导致 `powershell`/shell 只读命令被误判为“可能修改工作区”，影响 Plan 模式可用性。
   https://github.com/github/copilot-cli/issues/4160

7. **#2644** 功能请求：输入框支持 Shift+方向键文本选择（仍 OPEN）
   基础编辑体验缺失，长期未解决，反映终端 UI 输入层是持续痛点。
   https://github.com/github/copilot-cli/issues/2644

8. **#4076** 内置 research agent 的 MCP 工具应可配置
   `research.agent.yaml` 硬编码工具列表，研究子代理无法使用用户自配的 MCP 服务器，agent 扩展性的代表性诉求。
   https://github.com/github/copilot-cli/issues/4076

9. **#4260** 桌面端忽略 `askUser: false` 设置（仍 OPEN）
   CLI 与桌面应用配置体系割裂，桌面端无法禁用 `ask_user` 工具，暴露双宿主架构的配置同步问题。
   https://github.com/github/copilot-cli/issues/4260

10. **#3306** Windows arm64 原生插件缺失
    winget 安装后报 `Native addon "runtime" not found for win32-arm64`，重装无效，影响 arm64 Windows 用户可用性。
    https://github.com/github/copilot-cli/issues/3306

其他值得注意：#1864（会话文件损坏后无恢复手段，👍8）、#2368（项目级 lsp.json 不生效，👍5）、#3712（Windows ReFS/Dev Drive 沙箱限制文档请求，👍4）、#4951（/ask 窗口过小，仍 OPEN）。

---

## 🔀 重要 PR 进展

过去 24 小时无 PR 更新。如需跟踪代码进展，建议关注上述回归类 Issue（#4753、#4664）对应的修复提交。

---

## 📈 功能需求趋势

- **MCP 生态兼容与可配置性**：FastMCP 容错（#4370）、恢复超时回归（#4753）、research agent 工具配置（#4076）——MCP 是最高频主题
- **BYO-K / 第三方模型**：DeepSeek 接入（#2995）、bearerToken 企业认证（#4300）、模型命名一致性（#1752）
- **会话稳定性与 context-memory**：OOM 崩溃（#4664、#4725）、会话文件损坏恢复（#1864）、compaction 后 checkpoint 丢失（#3054）
- **权限精细化**：命令白名单（#2298）、Plan 模式误拦截（#4160）、agent 工具最小权限（#2172）
- **终端交互体验**：文本选择快捷键（#2644）、esc 误触发（#2508）、渲染兼容性（#2844）

---

## ⚠️ 开发者关注点

1. **内存泄漏/OOM 是当前最大痛点**：多个独立 Issue 证实长会话与大 context 场景下 Node 堆内存持续增长，Linux 平台尤甚（#4725 仍开放）
2. **版本回归频繁**：v1.0.83 的 MCP 超时回归、1.0.81-8 的插件 hook 回归（#4608），提示升级需谨慎、建议锁定已知稳定版本
3. **配置体系碎片化**：CLI / 桌面端 / VS Code 之间配置行为不一致（#4260、#1752），企业用户对认证自动化诉求强烈（#4300）
4. **平台覆盖不均**：Windows arm64 安装损坏、ReFS 沙箱限制、Linux 终端渲染问题，非主流平台体验明显滞后

---
*本日报基于 2026-09-27 前的 GitHub 公开数据自动整理，仅供技术参考。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-27

> 数据来源：github.com/anomalyco/opencode

---

## 📌 今日速览

今日无新版本发布。社区焦点集中在 **V2 稳定性**上：ESC 中断失效、会话冻结、subagent 验证失败等问题持续发酵；同时 Desktop 端 8 并行 agent 触发 OOM 崩溃的新报告值得警惕。多个历史遗留 Bug（如 `OPENCODE_CONFIG_DIR` 覆盖全局配置）迎来了修复 PR。

---

## 🚀 版本发布

过去 24 小时无新 Release。

---

## 🔥 社区热点 Issues

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#28492](https://github.com/anomalyco/opencode/issues/28492) Web 界面启动后 MaxListenersExceededWarning | 10 评论 / 6 👍，EventTarget 内存泄漏警告提示存在潜在监听器泄漏，长期运行风险高 |
| 2 | [#27875](https://github.com/anomalyco/opencode/issues/27875) Enter 键无法确认权限授予 | 权限确认卡死直接阻塞工作流，10 条评论反映影响面广 |
| 3 | [#17648](https://github.com/anomalyco/opencode/issues/17648) 会话处理器无限重试、退避无上限 | 无最大重试次数、无熔断器，上游 LLM 抖动会导致无限循环，属架构级缺陷 |
| 4 | [#40993](https://github.com/anomalyco/opencode/issues/40993) 支持 Agent Plugins 标准（agent-plugins.org） | 15 👍 最高赞，厂商中立的插件打包规范，生态互操作的关键方向 |
| 5 | [#27110](https://github.com/anomalyco/opencode/issues/27110) 限制并行 subagent 最大数量 | 37 👍 全场最高赞，本地模型用户受内存/上下文限制，需求强烈 |
| 6 | [#51269](https://github.com/anomalyco/opencode/issues/51269) V2 subagent 请求 schema 验证失败 | 2.0.16 上**所有** subagent 派发均失败，阻塞级回归 |
| 7 | [#51529](https://github.com/anomalyco/opencode/issues/51529) Desktop 8 并行 agent OOM 崩溃（已关闭） | 渲染进程被 OS 杀死，与并行 subagent 限制需求形成呼应 |
| 8 | [#46692](https://github.com/anomalyco/opencode/issues/46692) `chunkTimeout`/`timeout` 在 V2 路径被静默忽略 | 配置被接受但不生效，客户端无任何停顿上限，静默失败最伤信任 |
| 9 | [#3699](https://github.com/anomalyco/opencode/issues/3699) ESC 中断会话失效（已关闭） | 19 条评论的老牌问题，与 [#42960](https://github.com/anomalyco/opencode/issues/42960) 表明 ESC 中断在 V2 中仍未根治 |
| 10 | [#32825](https://github.com/anomalyco/opencode/issues/32825) / [#28658](https://github.com/anomalyco/opencode/issues/28658) `OPENCODE_CONFIG_DIR` 替换而非追加全局配置 | 影响 AGENTS.md 全局加载，v1/v2 加载器行为不一致，已有修复 PR 在途 |

其他值得关注：[#40146](https://github.com/anomalyco/opencode/issues/40146) 输出截断被误记录为正常完成、[#50598](https://github.com/anomalyco/opencode/issues/50598) V2 agent `permissions` frontmatter 解析后未生效、[#51423](https://github.com/anomalyco/opencode/issues/51423) Desktop V2 打开会话随机冻结。

---

## 🔧 重要 PR 进展

1. **[#47468](https://github.com/anomalyco/opencode/pull/47468)** fix(core): `OPENCODE_CONFIG_DIR` 恢复追加语义 — 同时修复 #28658 和 #32825，保持全局 AGENTS.md 正常加载，**今日唯一 OPEN 状态的重点 PR**。
2. **[#31489](https://github.com/anomalyco/opencode/pull/31489)** fix(tui): 输入框 Home/End 键处理 — 修复按键滚动消息列表而非移动光标的问题（9 👍 的 #27661）。
3. **[#45128](https://github.com/anomalyco/opencode/pull/45128)** fix(app): 全局 UI 字体应用到输入框 — V2 提示编辑器此前继承 body 字体。
4. **[#45306](https://github.com/anomalyco/opencode/pull/45306)** fix(tui): 对话框打开时跳过 question reject — 防止 ESC 同时关闭对话框并误拒问题。
5. **[#45284](https://github.com/anomalyco/opencode/pull/45284)** fix(tui): 权限请求变化时重置子界面 — 修复多权限排队时渲染过期请求。
6. **[#45256](https://github.com/anomalyco/opencode/pull/45256)** feat(session): 截断轮次的实验性 length-nudge — 针对输出预算全部耗在 reasoning 通道的“空消息”问题，关联 #40146。
7. **[#45257](https://github.com/anomalyco/opencode/pull/45257)** feat(app): fork 对话框支持完整会话选项 — 此前只能按用户 prompt 分叉。
8. **[#45260](https://github.com/anomalyco/opencode/pull/45260)** refactor(core): 统一插件发现与选择管线 — 抽取进程级插件发现服务，含回归测试。
9. **[#45253](https://github.com/anomalyco/opencode/pull/45253)** fix(codemode): 保留 bigint 精度 — 沙箱解释器中链式工具调用的精确整数运算。
10. **[#45200](https://github.com/anomalyco/opencode/pull/45300)** fix(core): grep 路径不存在时报错 — 避免静默返回空结果掩盖配置错误。

> 注：今日更新的大部分 PR 带 `automated-pr-cleanup` 标签且已关闭，疑为批量清理动作，反映 V2 代码线正在大规模整理。

---

## 📈 功能需求趋势

1. **并行 agent 资源治理**：subagent 数量上限（#27110，37 👍）、OOM 崩溃（#51529）、上下文窗口不更新（#51532）——并行能力与资源控制失衡是当前最热主题。
2. **插件生态标准化**：Agent Plugins 厂商中立规范支持（#40993，15 👍）、portable 构建与免全局安装（#37893、#15789）。
3. **V2 稳定性收尾**：ESC 中断、schema 验证、配置目录语义、timeout 静默失效——V2 beta 向 GA 过渡的典型阵痛。
4. **可观测性与可移植性**：截断轮次正确上报（#40146）、项目级独立 `/tmp` 目录（#49073）。

---

## ⚠️ 开发者关注点

- **交互卡死类问题高频**：Enter 无法确认、Confirm 点击无响应、多问题 prompt 后 TUI 挂起（#27875、#36382、#48047、#43376），是投诉最集中的痛点。
- **静默失败损害信任**：timeout 配置被忽略（#46692）、permissions frontmatter 不生效（#50598）、grep 空结果——开发者强烈期待 fail-fast 行为。
- **重试/熔断机制缺失**：无限指数退避（#17648）对付费 API 用户可能造成实际费用与时间损失。
- **升级路径混乱**：v1→v2 迁移后 session `path=NULL` 丢失（#51144）、“如何升级到 v2” 疑问（#51526），说明迁移文档与数据兼容性待改善。
- **Go 订阅配额逻辑**：单一模型限额阻塞同族全部模型（#51550），计费侧体验需打磨。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-27

## 1. 今日速览

Qwen Code 发布 **v0.24.6**（CLI、Desktop、TypeScript SDK 同步更新），核心围绕 Managed Agent 架构推进：Java SDK 新增 Hosted Harness 私有客户端和托管运行时，公共 API 契约（Stage D）与 ACP Bridge 双引擎集成（Stage B）同步开工。社区侧最热的仍是 **Managed Agent 分阶段架构提案（#12380，32 条评论）**，同时爆出两个 P1 级数据安全问题——stale worktree 自动清理会误删用户文件，值得关注。

## 2. 版本发布

### v0.24.6（CLI / Desktop / SDK 同发）
- **feat(sdk-java)**: 新增 Hosted Harness 私有客户端（[#12654](https://github.com/QwenLM/qwen-code/pull/12654)）
- **feat(sdk-java)**: 新增托管运行时支持
- **fix(serve)**: 保留会话创建失败的诊断信息（[#12331](https://github.com/QwenLM/qwen-code/pull/12331)）
- **fix(mcp)**: 修复注册信息保留问题
- **test(cli)**: 补齐 managed-context/1 遗留的测试缺口（[#12712](https://github.com/QwenLM/qwen-code/pull/12712)）
- 无已知 Breaking Changes

同日发布：`sdk-typescript-v0.1.16`（捆绑 CLI 0.24.6）、`desktop-v0.24.6`、nightly 构建版本。

## 3. 社区热点 Issues

1. **[#12380](https://github.com/QwenLM/qwen-code/issues/12380)** Managed Agent 双路径架构与分阶段交付提案（32 评论）— 本周讨论核心，定义 Session 持久所有权、Workspace 绑定、可恢复工具执行与稳定 WebSocket 通道，是后续所有 Stage B/D/W 工作的顶层蓝图。

2. **[#12416](https://github.com/QwenLM/qwen-code/issues/12416)** [P1] Remote-SSH 下所有 `POST /session` 失败（EPIPE/BridgeChannelClosedError，16 评论）— Companion 0.24.2 的会话创建完全不可用而独立 CLI 正常，影响远程开发用户的核心工作流。

3. **[#12735](https://github.com/QwenLM/qwen-code/issues/12735)** [P1] stale worktree 清理误删含未跟踪文件的用户命名 worktree — 数据丢失级问题，自动扫描可能销毁用户工作成果，已关闭（应已修复）但值得复盘。

4. **[#12758](https://github.com/QwenLM/qwen-code/issues/12758)** [P2] 启动扫描销毁 git-ignored 内容，且与 daemon 清理守卫逻辑不一致 — 与 #12735 同属 worktree 清理安全问题，暴露同一 sink 的双重实现。

5. **[#12792](https://github.com/QwenLM/qwen-code/issues/12792)** [P2] EditTool 在 CRLF/LF 混合时重写整个文件的行尾 — 导致 `git diff` 显示全文件变更，污染代码审查，日常使用体验的高频痛点。

6. **[#12770](https://github.com/QwenLM/qwen-code/issues/12770)** [P2] 扩展生命周期事件无视 `privacy.usageStatisticsEnabled` 仍上报 RUM — 数据隐私合规问题，用户明确禁用统计后仍被上传。

7. **[#12760](https://github.com/QwenLM/qwen-code/issues/12760)** [P2] 多 API Key 场景下 `/model` 与 `/model --fast` 选择异常 — 多供应商配置（DeepSeek/阿里云）用户无法正确切换模型。

8. **[#12727](https://github.com/QwenLM/qwen-code/issues/12727)** Windows 上 `/update` 命令行为异常，更新后仍提示新版本（6 评论）— 已关闭。

9. **[#12793](https://github.com/QwenLM/qwen-code/issues/12793)** [P2] Managed Agent Stage D：公共 API 契约、生成 DTO、Session 查询与事件回放 — 提案落地关键切片，对应今日 PR #12808。

10. **[#12806](https://github.com/QwenLM/qwen-code/issues/12806)** [P2] Desktop 请求增加 Linux aarch64（AppImage/deb）构建 — ARM64 Linux 用户目前无官方发行包，反映平台覆盖需求。

## 4. 重要 PR 进展

1. **[#12808](https://github.com/QwenLM/qwen-code/pull/12808)** Managed Agent 公共 API 契约与契约测试入库（Stage D1）— OpenAPI 成为 Session 路由和 WebShell 适配器的单一事实来源。

2. **[#12807](https://github.com/QwenLM/qwen-code/pull/12807)** ACP Bridge 向所有配对引擎投递 workspace 变更（B2b）— 未确认变更的引擎被隔离，保障 Legacy/Managed 双引擎一致性。

3. **[#12794](https://github.com/QwenLM/qwen-code/pull/12794)** 修复 web_fetch 多地址（双栈）主机连接失败分类只看第一个地址的问题 — 解决 https→http 回退顺序依赖。

4. **[#12767](https://github.com/QwenLM/qwen-code/pull/12767)**（已合）本地托管工具结果分段存储 — Session 级不可变分段持久化，支持幂等发布、密封与字节范围读取。

5. **[#11959](https://github.com/QwenLM/qwen-code/pull/11959)** 从 models.dev 目录解析模型上下文窗口/输出上限/输入模态 — 内置精简快照 + 24h 后台刷新。

6. **[#10954](https://github.com/QwenLM/qwen-code/pull/10954)** `qwen serve` 新增 `GET /background-agents` 暴露 supervisor 运行的后台 Agent 状态。

7. **[#12559](https://github.com/QwenLM/qwen-code/pull/12559)** OpenTUI 弹窗几何与补全截断对齐 ink 渲染器 — 终端 UI 一致性修复。

8. **[#12545](https://github.com/QwenLM/qwen-code/pull/12545)** 对无 Skill 工具的子代理屏蔽 SkillManager — 修复嵌套 Agent 的工具策略泄漏。

9. **[#11965](https://github.com/QwenLM/qwen-code/pull/11965)**（已合）hooks 的 enabled 状态按 name 而非完整身份作为 key — 修复 #11902 中命令变更后禁用状态丢失。

10. **[#11206](https://github.com/QwenLM/qwen-code/pull/11206)** Mesh：持久化共享线程的多 Agent 协作 — Agent 身份、任务分派、结果归属与审核的完整协作框架，是长期方向性特性。

## 5. 功能需求趋势

- **Managed Agent / 多 Agent 架构**（绝对主导）：#12380 及派生的 Stage B（#12737）、Stage D（#12793）、W0c（#12724）密集推进，Session 管理 + 多 Agent + daemon 是当前路线图核心。
- **平台分发覆盖**：Linux aarch64 桌面构建（#12806）、`--agent` 无头子代理 CLI（#12803）。
- **配置与模型切换体验**：多 API Key 下的模型选择（#12760）、按 models.dev 目录推断模型能力（PR #11959）。
- **隐私与可控性**：禁用统计上报（#12770）、技能默认全部禁用（#12790）。
- **会话/serve 稳定性**：Remote-SSH 会话失败（#12416）、JSON 消息超限导致会话 404（#11908，已关）。

## 6. 开发者关注点

- **数据安全是最高优先级痛点**：worktree 自动清理连续爆出两个误删用户文件的问题（#12735、#12758），自动清理逻辑缺少对用户命名/ignored 文件的防护，且与 daemon 侧守卫不一致。
- **远程/serve 场景稳定性**：Remote-SSH 会话创建失败（P1）与 ACP 通道脆弱性（fail-closed 导致会话全丢）显示 daemon 化链路仍需打磨。
- **文件编辑副作用**：行尾重排（#12792）让 diff 失真，直接干扰真实项目的代码审查。
- **Windows 平台体验**：`/update` 异常（#12727）等问题反复出现，Windows 安装/更新链路是高频反馈区。
- **信任与隐私**：遥测无视用户禁用设置（#12770）引发合规担忧，隐私开关的执行一致性需要系统性审计。

---
*数据来源：QwenLM/qwen-code GitHub（过去 24 小时 Releases / Issues / PR）*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*