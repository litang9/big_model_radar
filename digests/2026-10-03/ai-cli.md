# AI CLI 工具社区动态日报 2026-10-03

> 生成时间: 2026-10-02 23:45 UTC | 覆盖工具: 7 个

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
**日期：2026-10-03 | 数据窗口：过去 24 小时**

---

## 一、生态全景

AI CLI 工具已进入**多 Agent 架构与扩展生态的深水区竞争**：Anthropic 以 Mods 为核心密集扩展 API 边界，OpenAI 以每日 7 个 alpha 的激进节奏打磨 Windows/桌面端体验，Google 聚焦 subagent 可靠性与 token 成本治理。同时，**云/本地混合执行环境**（Claude Code 的 Cowork、Codex 的 dot 云电脑、Copilot CLI 的 Ctrl+E 环境切换）成为各家的共同押注方向，但其稳定性问题也集中爆发。开源阵营中 Qwen Code 在 Managed Agent 架构上走出独特路线，OpenCode 则在 V2 beta 阶段收敛质量。整体看，竞争焦点已从“能写代码”转向“可编排、可信任、成本可控”。

---

## 二、各工具活跃度对比

| 工具 | Release 情况 | 热点 Issues（Top 10 热度） | 重要 PR 数 | 社区焦点标签 |
|---|---|---|---|---|
| **Claude Code** | v2.1.288（1 个稳定版） | 最高 236 评论（Mods 提案 #91870） | 1 条（Mods API 声明） | Mods 扩展性、Rate Limit 老问题 |
| **OpenAI Codex** | **7 个 alpha**（0.162.0-alpha.2~8） | 最高 30 评论（Windows Computer Use #49458） | **10+ 条** | Windows 重灾区、VS Code 扩展、配额透明 |
| **Gemini CLI** | v0.64.0 nightly（1 个） | 13 评论（subagent 误报成功 #22323） | **10+ 条**（多为 p1 修复） | Subagent 可靠性、上下文成本、安全 |
| **Copilot CLI** | 3 个补丁（v1.0.92-1~3） | 11 评论 / 12👍（Skill 不可达 #4438） | 0 条（修复走 Release 直发） | MCP 生态、多模型路由、云/本地切换 |
| **Qwen Code** | v0.24.7 nightly（1 个） | **42 评论**（Managed Agent 架构 #12380） | **10 条**（密度最高、含 2 项安全修复） | Managed Agent、数据完整性 |
| **OpenCode** | 无发布 | 32 评论 / 20👍（支付被拒 #45278） | 10+ 条 | Go 订阅信任、V2 收敛、Effect 升级 |
| **Kimi Code** | — | 无活动 | 无活动 | 静默期 |

**观察**：Codex 发布节奏最快但风险信号明显（需回移 0.159 修复）；Qwen Code PR 合入密度和架构讨论深度突出；Claude Code 社区声量最大但 PR 公开活动极少（闭源开发模式）。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **上下文/Token 治理** | Gemini CLI、Qwen Code、Claude Code、OpenCode | /compact 可靠性与副作用（CC #92089 二次方膨胀、Copilot #5045 反复失败、OpenCode compaction 忽略配置）；非会话上下文成本（Qwen #12028）；AST 精确读取与递归展开抑制（Gemini #22745、#19561） |
| **MCP / 插件生态健壮性** | Copilot CLI（最痛）、Claude Code、Gemini CLI、Qwen Code | OAuth/Entra 认证、配置加载失效（CC lspServers #15148）、工具目录一致性、MCP 身份混淆安全修复（Qwen #12531） |
| **云/沙箱执行环境** | Codex（dot 云电脑）、Claude Code（Cowork）、Copilot CLI、Gemini CLI | 云环境持久性与数据丢失（Codex #50388）、云会话静默挂起（CC #99008）、gVisor 沙箱（Gemini #29597） |
| **Windows 支持滞后** | Codex、Claude Code、OpenCode、Qwen Code | WSL 代理不可用、SIGSEGV 崩溃、MSIX 自启失效、Scoop 升级链路、工作区信任机制故障 |
| **多 Agent / Subagent 可靠性** | Gemini CLI、Qwen Code、OpenCode | 挂起、误报成功（Gemini #22323）、权限配置被忽略（Gemini #22267）、托管会话数据一致性 |
| **用量/配额透明度** | Claude Code、Codex、OpenCode、Copilot CLI | Max 用户误限流 7 个月未解（CC #29579）、配额重置未传播（Codex #50451）、缓存命中率骤降致成本上升（OpenCode #51993） |
| **扩展 API / Hooks** | Claude Code（Mods）、OpenCode、Copilot CLI | `tool.execute.before` 增加 skip 字段、生命周期原语、Skill 调度策略 |

---

## 四、差异化定位分析

| 维度 | Claude Code | Codex | Gemini CLI | Copilot CLI | Qwen Code | OpenCode |
|---|---|---|---|---|---|---|
| **功能侧重** | Mods 扩展生态、云会话（Cowork） | 桌面端 Computer Use、dot 自主任务 | Subagent 体系、token 效率 | GitHub/企业集成、多模型路由 | Managed Agent 托管架构、持久化一致性 | Provider 中立、开源免费 + Go 订阅 |
| **目标用户** | Max 订阅重度开发者 | ChatGPT 订阅 + Windows 桌面用户 | Google 生态 / 成本敏感用户 | GitHub 企业用户 | 自托管 / 多 Agent 编排开发者 | BYOK / 开源社区用户 |
| **技术路线** | 闭源 CLI + 开放 Mods API，渐进式声明先于实现 | Rust 高频 alpha，快速试错 | 开源 TS，社区提案驱动（AST/沙箱） | 闭源，Release 直发不打 PR | 开源，架构级分阶段提案（Session 所有权、writer fencing） | 开源，Effect-TS 重构 V2 |
| **工程风格** | 少而精的公开 PR，stale bot 争议 | 一日 7 alpha，回归回移 | p1 修复密集，负责任安全披露 | 补丁直发，节奏平稳 | PR 密度最高，含围栏 SQL 等严谨设计 | 工程卫生（严格化、nix 修复） |

**关键差异点**：Claude Code 赌“扩展平台”，Codex 赌“桌面自主代理”，Gemini 赌“多 agent + 成本”，Qwen Code 赌“服务级托管 agent”——四条路线正在分化而非趋同。

---

## 五、社区热度与成熟度

- **声量最大**：Claude Code（单 issue 236 评论）与 Codex（Windows 问题集群多篇 15-30 评论）——付费用户基数决定声量，但也暴露成熟度债务（CC 限流 7 个月、Codex 数据丢失事件）。
- **快速迭代期**：Codex（7 alpha/日）、Copilot CLI（3 补丁/日）——发布快但回归风险同步上升。
- **架构深耕期**：Qwen Code（42 评论的架构提案 + 一日 10 PR）与 Gemini CLI（AST-aware EPIC）——开源社区呈现出比商业产品更深的设计讨论。
- **质量收敛期**：OpenCode（V2 beta 修 bug）与 Gemini CLI（p1 修复为主）。
- **静默**：Kimi Code 无活动。

**成熟度分层**：Claude Code / Codex 功能最全但稳定性债务最重；Gemini CLI 修复响应最快；Qwen Code / OpenCode 属“高潜力高风险”梯队。

---

## 六、值得关注的趋势信号

1. **“上下文经济学”成为一等议题**。三个工具（Gemini、Qwen、Claude Code）同时暴露 token 成本问题——非会话开销、compact 副作用、缓存失效。**参考价值**：重度用户应评估各工具的上下文预算治理能力，AST-aware 读取（Gemini #22745）可能是下一代标配。

2. **云执行环境面临信任危机**。Codex dot 云电脑文件丢失、CC Cowork 静默挂起，说明“云端长期工作”的持久性保障尚未兑现。**参考价值**：生产关键工作负载暂不建议完全托管到云会话，保留本地 git 快照习惯。

3. **扩展生态是下一个护城河**。Claude Code 的 Mods（声明先行、运行时应答）、OpenCode 的 hooks、Copilot 的 Skills 三方都在抢插件开发者。**参考价值**：为 Mods/Skills/MCP 写扩展的开发者窗口期已开启，但 API 仍在快速变动，需注意版本锁定。

4. **数据完整性与安全 bug 密集曝光**。会话被误删（Gemini #29584）、transcript 永久损坏（Qwen #12091）、凭据残留（Qwen #13122）、OAuth 合规修复（Gemini RFC 9207）。**参考价值**：AI CLI 正在承担“可修改文件系统 + 持有凭据”的角色，安全审计应纳入选型标准。

5. **Windows 一致性是全行业短板**。四家工具同日报 Windows/WSL 特有故障。**参考价值**：Windows 团队选型时应优先验证沙箱、终端、路径处理；关注 Codex 的 `sandbox uninstall` 等专项修复进展。

6. **问题追踪机制影响社区信任**。CC 的 stale bot 误伤、Codex 配额重置“已传播”却未生效——**响应质量比响应速度更能留住付费用户**，这是各厂商 2026 Q4 的隐形战场。

---

*报告基于 2026-10-03 各仓库公开数据整理，仅供技术选型参考。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

*数据截止 2026-10-03 · 来源：github.com/anthropics/skills*

---

## 一、热门 Skills 排行（PR）

> 注：本批 PR 评论数数据缺失，以下按更新活跃度与议题热度综合排序。

| # | Skill / PR | 功能 | 社区讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 触发评估修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 trigger evals 误报、Windows 兼容问题 | skill-creator 是生态基石工具，其评测可靠性问题被多个 Issue（#1383、#556）反复提及 | OPEN |
| 2 | **mcp-builder MCP v2 兼容** [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 `mcp>=2.0` 的 `streamable_http_client` 重命名与自定义 header | 关联 Issue #1668 / #1390（评测脚本对真实 MCP server 全部 0 分），是当前最痛的可组合性断裂点 | OPEN |
| 3 | **skill-creator 打包脚本修复** [#1681](https://github.com/anthropics/skills/pull/1681) | 修复 `package_skill.py` 直接执行报错 | 降低 Skill 作者贡献门槛的实操问题 | OPEN |
| 4 | **docx 修订超时与结果校验** [#1792](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时不再误报成功，校验修订标记 | 官方 docx skill 可靠性系列修复之一（同 #1734 孤立批注检测） | OPEN |
| 5 | **claude-api 模型退役更新** [#1607](https://github.com/anthropics/skills/pull/1607) | 标记 4 个已退役模型 ID | 配合 Issue #1487（claude-api 单次注入 ~156k token 耗尽上下文），claude-api 是 token 效率争议焦点 | OPEN |
| 6 | **pyxel 复古游戏开发** [#525](https://github.com/anthropics/skills/pull/525) | Python 复古游戏创建、无头验证、帧检查 | 长寿 PR（2026-03 至今仍活跃更新），垂直领域创作类 skill 代表 | OPEN |
| 7 | **document-typography 排版质检** [#514](https://github.com/anthropics/skills/pull/514) | 修复 AI 文档孤行、孤字换行、编号错位 | 直击“AI 生成文档排版差”的普遍痛点 | OPEN |
| 8 | **blast-radius 批量操作防护** [#1776](https://github.com/anthropics/skills/pull/1776) | 破坏性批量写操作前的影响面核查清单 | 新兴的“AI 安全护栏”方向，与 #492 信任边界议题呼应 | OPEN |

---

## 二、社区需求趋势（来自 Issues）

1. **安全与信任边界**（最热，43 评论）：[#492](https://github.com/anthropics/skills/issues/492) 指出社区 Skill 冒用 `anthropic/` 命名空间，用户可能在误信下授予高权限——签名/命名空间隔离是强烈诉求。
2. **组织级分发与共享**：[#228](https://github.com/anthropics/skills/issues/228) 要求 org 内共享 Skill 库，取代 Slack 手传 `.skill` 文件；[#189](https://github.com/anthropics/skills/issues/189) 抱怨插件重复安装导致上下文膨胀。
3. **Skill 开发/评测工具链可靠性**：[#556](https://github.com/anthropics/skills/issues/556)（评测 0% 触发率）、[#1383](https://github.com/anthropics/skills/issues/1383)（Windows 评测 + benchmark 静默失败）、[#1394](https://github.com/anthropics/skills/issues/1394)（eval-viewer XSS）——skill-creator 工具链是最集中的 bug 反馈区。
4. **上下文/token 效率**：[#1487](https://github.com/anthropics/skills/issues/1487) 单 Skill 注入 156k token 耗尽窗口，反映对渐进式加载（progressive disclosure）落地的关切。
5. **AI 治理与安全类 Skill**：[#412](https://github.com/anthropics/skills/issues/412)（agent-governance）、[#1385](https://github.com/anthropics/skills/issues/1385)（推理质量门禁管线）、[#1329](https://github.com/anthropics/skills/issues/1329)（compact-memory 压缩 agent 状态）——治理、审计、记忆压缩是新兴提案方向。
6. **企业环境集成**：[#1175](https://github.com/anthropics/skills/issues/1175)（SharePoint 权限模型）、[#29](https://github.com/anthropics/skills/issues/29)（Bedrock 支持）——企业文档系统与多云部署需求持续存在。

---

## 三、高潜力待合并 Skills（活跃 OPEN PR）

- **mcp-builder v2 适配** [#1742](https://github.com/anthropics/skills/pull/1742) — 有对应 Issue（#1668）驱动，9 月底仍在更新，合并紧迫性高。
- **skill-creator 系列修复** [#1298](https://github.com/anthropics/skills/pull/1298) / [#1681](https://github.com/anthropics/skills/pull/1681) — 配套多个高评论 Issue，属于核心工具链修复。
- **docx 系列修复** [#1792](https://github.com/anthropics/skills/pull/1792) / [#1734](https://github.com/anthropics/skills/pull/1734) — 小而明确的 bugfix，合并阻力低。
- **claude-api 文档死链修复** [#1730](https://github.com/anthropics/skills/pull/1730) — 10 月初仍在更新，低风险易合并。
- **blast-radius** [#1776](https://github.com/anthropics/skills/pull/1776) — 契合当前治理/安全热点方向。

⚠️ 反面信号：多个 2026 年 1~3 月的 PR（如 #525 pyxel、#514 typography）挂起半年以上仍未合并，说明外部 Skill PR 审核吞吐偏慢，官方重心似在核心 skill 维护而非纳新。

---

## 四、生态洞察（一句话）

**社区最集中的诉求是“可信与高效”：建立 Skill 的安全信任边界（命名空间/签名）、可靠的 Skill 开发评测工具链、以及可控的上下文注入成本——三者共同决定 Skills 生态能否规模化。**

---

# Claude Code 社区动态日报
**日期：2026-10-03 | 数据来源：github.com/anthropics/claude-code**

---

## 一、今日速览

Claude Code 发布 **v2.1.288**，为 Mods 扩展机制新增 `$.ui.selection()` API，并为云会话内置了 `gh api` 命令，Mods 生态持续快速演进。社区方面，标志性的 Mods 扩展性提案（#91870）热度持续领跑，评论已达 236 条。同时，一个持续 7 个月的老牌 Rate Limit 问题（#29579）仍未解决，成为 Max 订阅用户的最大痛点。

---

## 二、版本发布

### v2.1.288
- **新增 `$.ui.selection()`（Mods API）**：返回用户在全屏模式下最近一次选中的文本；当选区位于单条 transcript 行内时，可一并返回该行内容。这为 Mods 开发者提供了读取用户上下文的能力。
- **云会话内置 `gh api`**：为镜像中未安装 GitHub CLI 的云会话提供内置 `gh api` 支持，并修复了内置版本发送控制字符的问题。

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 关注点 |
|---|-------|--------|
| 1 | [#91870](https://github.com/anthropics/claude-code/issues/91870) Mods - make Claude 10x more extensible | ⭐ 今日最热。官方持续更新社区进展（10月1日更新"We're live!"），236 条评论、130 👍。Mods 已上线，团队正在快速消化社区反馈，是当前扩展性生态的核心阵地。 |
| 2 | [#29579](https://github.com/anthropics/claude-code/issues/29579) Max 订阅用户仍遇 Rate limit | ⭐ 持续 7 个月未解的老大难问题，153 条评论。用户仅使用 16% 配额却被限流，涉及 Windows/VSCode/认证多区域，严重影响付费用户体验。 |
| 3 | [#37951](https://github.com/anthropics/claude-code/issues/37951) 请求隐藏 Edit/Write 内联 diff | 99 👍 高票功能请求，希望增加 `showDiffs: false` 设置以精简会话流显示，反映 UI 噪音是高频痛点。 |
| 4 | [#15148](https://github.com/anthropics/claude-code/issues/15148) marketplace.json 中 lspServers 配置不生效 | 73 👍。LSP 插件（typescript/pyright/gopls）安装后无法工作，阻碍插件生态的代码智能能力。 |
| 5 | [#88747](https://github.com/anthropics/claude-code/issues/88747) Worktree 写入绝对 core.hooksPath | 2.1.237 引入的新变体：worktree 复用了主仓库的 git hooks，且与三个已知 issue 均不重复，报告质量高。 |
| 6 | [#89390](https://github.com/anthropics/claude-code/issues/89390) Linux 上 2.1.243 启动即 SIGSEGV | 12 👍。固定地址空指针解引用，`claude --version` 都会崩溃，回退 2.1.241 可恢复，属阻断级回归。 |
| 7 | [#92089](https://github.com/anthropics/claude-code/issues/92089) 二次 /compact 导致 transcript 二次方膨胀 | 第一次 compact 清掉的历史被第二次 compact 重新追加，长会话场景下有性能隐患。 |
| 8 | [#99008](https://github.com/anthropics/claude-code/issues/99008) Cowork 中失败的 /skill 命令静默挂起 | 昨日新报。shell 命令失败的 skill 会让云会话无提示挂死，且是已被 stale bot 关闭的 #87159 的交互版，暴露 stale 机制误伤问题。 |
| 9 | [#99071](https://github.com/anthropics/claude-code/issues/99071) 启动提示引用不可用的内置插件 | 昨日新报。官方启动 tip 引导用户启用 `cc-plugin-you-should-know@builtin`，实际执行报“未安装”，属官方引导与实际状态脱节。 |
| 10 | [#81364](https://github.com/anthropics/claude-code/issues/81364) Windows Desktop "开机自启"开关不持久化 | MSIX 打包版注册表写入问题，影响 Windows 用户日常使用体验。 |

**其他动态**：昨日有一批 8 月初的 Desktop/IDE/Core 类 issue 被 stale bot 批量关闭（如 #83933 设备桥断连、#84864 VS Code 初始化超时等），部分问题可能尚未真正解决，社区对 stale 策略的质疑值得关注。

---

## 四、重要 PR 进展

过去 24 小时仅 1 条 PR 更新：

- **[#97293](https://github.com/anthropics/claude-code/pull/97293)** mods: 声明携带 process.run 截断标志与列表条目 mtimeMs
  - 作者：@poteat（Mods 核心开发者）
  - 内容：Mods 类型声明新增 `$.process.run` 结果的 `isStdoutTruncated` / `isStderrTruncated` 字段，以及 `$.fs.list` 条目的 `mtimeMs` 字段。设计上采取“先于 npm CLI 发布声明、由 CLI 运行时实际应答”的渐进策略，配套测试 fake 已支持这些字段。
  - 意义：Mods API 正在向**进程输出流完整性感知**和**文件系统元数据**两个方向扩展，为构建更强大的守护进程/文件监控类 Mods 铺路。

> 今日 PR 活动较少， Mods 相关开发显然是当前工程重心（与 v2.1.288 的发布内容互相印证）。

---

## 五、功能需求趋势

从近期 Issues 提炼出的社区关注方向：

1. **Mods / 扩展性生态** 🚀：绝对主旋律。官方密集迭代 API（`$.ui.selection()`、进程截断标志、mtimeMs），社区反馈踊跃。
2. **UI 可定制性**：隐藏内联 diff（#37951, 99👍）、Desktop 回车键行为可配置（#99095）、会话分组可折叠——用户要求“减噪”的呼声强烈。
3. **云会话 / Cowork 稳定性**：VM 创建卡死（#88921）、skill 静默挂起（#99008）、设备桥断连（#83933）等问题集中出现，云执行环境仍在磨合期。
4. **Git 深度集成**：worktree 与 hooks 路径、stale commit 卡片等 git 工作流细节问题频发。
5. **插件与 LSP 生态**：marketplace 分发链路（lspServers 失效、内置插件引用缺失）是插件体系的薄弱环节。
6. **跨端会话一致性**：CLI 与 Desktop 切换同一会话丢失上下文（#99095），多端体验需拉齐。

---

## 六、开发者关注点

- **限流与配额透明度**：Max 订阅用户被误限流（#29579）长期未解，配额计算与错误提示的可信度是付费用户最大痛点。
- **稳定性回归**：SIGSEGV 启动崩溃（#89390）、SSE 流重置（#84404）等崩溃级问题表明近几个版本的发布质量把控仍需加强，建议生产环境锁定已知稳定版本。
- **长会话管理**：/compact 的 transcript 二次方膨胀（#92089）对重度用户影响显著。
- **stale bot 误伤**：多个有 repro 的 bug 被 stale 关闭后以新 issue 形式重现（#99008 即典型），问题追踪闭环有待改进。
- **Windows 体验**：MSIX 自启不持久化、路径标准化错误等 Windows 特有问题持续存在。

---
*本日报基于过去 24 小时 GitHub 公开数据自动整理，仅供技术分析参考。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-10-03 | 数据来源：github.com/openai/codex**

---

## 一、今日速览

Codex 团队今日密集发布了 **0.162.0-alpha.2 至 alpha.8 共 7 个 alpha 版本**，迭代节奏极快。Issue 端焦点集中在 **Windows 桌面端 Computer Use / Dot（dots）任务工具缺失**、**VS Code 扩展消息队列死锁**两大问题集群；PR 端则围绕**历史持久化瘦身（64 KiB 截断）、Windows 沙箱卸载工具、自定义模型提供商能力覆盖**等持续打磨。

---

## 二、版本发布

过去 24 小时连续发布 7 个 alpha 版本：

- [rust-v0.162.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.8)
- [rust-v0.162.0-alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.7)
- [rust-v0.162.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.6)
- [rust-v0.162.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.5)
- [rust-v0.162.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.4)
- [rust-v0.162.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.3)
- [rust-v0.162.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.2)

Release notes 均未附详细变更说明，属高频内部迭代。另值得注意的是 [PR #50406](https://github.com/openai/codex/pull/50406) 为留在 0.159 alpha hotfix 系列的客户端回移了 0.159.3 的修复与模型目录，同时保留 PowerShell 兼容性修复——暗示 Windows PowerShell 兼容问题在近期版本中曾造成回归。

---

## 三、社区热点 Issues

1. **#49458 — Windows 上 dot 启动的本地任务缺少 Computer Use 工具**（30 评论 / 14 👍）
   普通 Codex 会话工具正常，但 dot 启动的本地任务无浏览器/桌面工具，是近期 Windows + dots 组合的高频故障之一。
   https://github.com/openai/codex/issues/49458

2. **#49834 — VS Code 扩展内部 fetch 响应 undefined 导致 JSON 解析错误**（16 评论）
   与 #50403、#50404 构成同一问题集群：队列消息发送锁无法释放，提示 "undefined is not valid JSON"，影响面广。
   https://github.com/openai/codex/issues/49834

3. **#49731 — WSL 代理模式下所有命令失败**（17 评论 / 9 👍）
   Windows exec-server 删除 arg0 helper 目录导致 "No such file or directory"，WSL 用户基本不可用。
   https://github.com/openai/codex/issues/49731

4. **#49488 — Windows dot/Work 任务 MCP 启动持续失败**（18 评论 / 6 👍）
   持久化 MCP 启动失败 + 路径错误，Computer 任务缺少浏览器/桌面工具，与 #49458 症状相近。
   https://github.com/openai/codex/issues/49488

5. **#50118 — VS Code 扩展回合完成后仍被标记 Streaming，提示被排队**（11 评论 / 6 👍）
   9 月 30 日左右开始出现，新线程运行数轮后触发，属扩展状态管理 bug。
   https://github.com/openai/codex/issues/50118

6. **#49383 / #35446 — Windows Computer Use 截图捕获失败与死锁**（15 / 14 评论）
   FrameArrived 超时、E_INVALIDARG、SoftwareBitmap 转换死锁，Windows 屏幕捕获链路长期不稳定。
   https://github.com/openai/codex/issues/49383 | https://github.com/openai/codex/issues/35446

7. **#49873 — Dot 安全暂停状态不同步，自主执行继续而人工控制被阻断**（4 评论）
   涉及安全机制的严重问题，值得官方优先调查。
   https://github.com/openai/codex/issues/49873

8. **#50388 / #49682 — dot 云电脑环境意外变更导致项目文件不可访问**（3 / 8 评论）
   数天工作成果疑似丢失，涉及云端环境持久性与数据安全信任问题。
   https://github.com/openai/codex/issues/50388 | https://github.com/openai/codex/issues/49682

9. **#50451 — 10 月 2 日全球配额重置未覆盖付费账号**（1 评论）
   官方已宣布 "Reset all propagated"，但仍有付费用户未生效，配额透明度问题持续发酵。
   https://github.com/openai/codex/issues/50451

10. **#50461 — 5 小时配额在提交提示前即扣减**（1 评论）
    配额计量时机异常，与 #50451、#48843 共同构成 rate-limits 类抱怨主线。
    https://github.com/openai/codex/issues/50461

---

## 四、重要 PR 进展

1. [#50437 — 新增 `codex sandbox uninstall` CLI 命令](https://github.com/openai/codex/pull/50437)：清理遗留 Windows 沙箱账户与网络规则，直接回应 #46380 类沙箱残留问题。
2. [#50427 / #50458 — 历史持久化 64 KiB 截断](https://github.com/openai/codex/pull/50427)：对命令输出与超大 MCP 结果设预算，防止历史文件膨胀为数 MB。
3. [#50459 — 自定义模型提供商能力覆盖](https://github.com/openai/codex/pull/50459)：允许 Responses 兼容提供商配置 `external_web_access`、`remote_compaction` 等能力，利好 BYO-model 用户。
4. [#50434 — TUI `/copy` 键盘选择复制](https://github.com/openai/codex/pull/50434)：支持 vim 风格导航选择最新响应复制，直接修复 #50197 报告的复制损坏问题。
5. [#50418 — 遵循 Responses 失败事件中的 Retry-After 头](https://github.com/openai/codex/pull/50418)：改进限流重试节奏，与近期 rate-limits 抱怨相关。
6. [#50406 — 0.159 alpha 系列恢复 0.159.3 修复](https://github.com/openai/codex/pull/50406)：为无法升级的客户端 cherry-pick 七个修复，保留 PowerShell 兼容。
7. [#50462 — 从委派任务输入填充线程预览](https://github.com/openai/codex/pull/50462)：修复 dot 委派线程无预览、不可发现问题，关联 #48472。
8. [#50442 — 线程用量响应保留原生 USD 金额](https://github.com/openai/codex/pull/50442)：在 credit 估算外透传后端真实美元消耗，提升用量透明度。
9. [#50446 — rollout 附件打包为 gzip tar](https://github.com/openai/codex/pull/50446)：规范诊断附件上传格式并限制大小。
10. [#50433 — API-key 账号可在 TUI 使用 Daybreak](https://github.com/openai/codex/pull/50433)：放宽 /daybreak 的账号类型限制，利好 API 用户。

---

## 五、功能需求趋势

- **多账户 / 账号切换**：#4432（130 👍，本期最高）与 #31778 持续活跃，`--auth-profile` 一等公民支持是呼声最高的功能。
- **Computer Use 稳定性（尤其 Windows）**：截图捕获、FrameArrived、沙箱、WSL 相关 issue 数量最多，是当前最大痛点集群。
- **Dot / 云电脑环境可靠性与数据持久性**：云环境变更导致文件丢失、线程 placement 格式不兼容（#50077）、AbsolutePathBuf 反序列化失败（#49477）。
- **VS Code 扩展健壮性**：消息队列锁、streaming 状态残留、限流状态显示是扩展侧三大顽疾。
- **用量 / 配额透明度**：原生 USD 计量、重置传播、5 小时窗口扣减逻辑均受关注。

---

## 六、开发者关注点

1. **Windows 端是重灾区**：本期 30 条热门 issue 中过半带 `windows-os` 标签，覆盖 WSL、沙箱、Computer Use、MCP 启动等多个子系统。
2. **VS Code 扩展 "queued message send lock" 问题集群**（#49834 / #50403 / #50404 / #50118）自 9 月 30 日起集中爆发，疑似同根因，建议官方统一排查。
3. **数据安全信任危机**：dot 云电脑项目文件丢失（#50388、#49682）若不妥善处理，将直接影响用户在云端长期工作的意愿。
4. **发布节奏与质量平衡**：单日 7 个 alpha 版本显示迭代极快，但 0.159 系列需回移修复（#50406）提示回归风险上升，建议关注 alpha → stable 的稳定性验证。
5. **配额机制需可解释**：重置未传播、扣减时机异常、`Rate limit: Unavailable` 误报等问题频发，社区需要更透明的配额状态展示。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-10-03

## 📌 今日速览

今日发布 nightly 版本 v0.64.0（20261002），核心更新聚焦会话记录稳定性与状态持久化。Issue 区集中围绕 **subagent 可靠性**（挂起、误报成功）展开讨论，PR 区则出现一波高质量的稳定性与安全修复，包括会话恢复去重、OAuth 校验对齐 RFC 9207、以及一个负责任的供应链安全 PoC 披露。

---

## 🚀 版本发布

**v0.64.0-nightly.20261002.gc9096a847** ([Release](https://github.com/google-gemini/gemini-cli/releases/tag/v0.64.0-nightly.20261002.gc9096a847))

- `fix(core)`: ChatRecordingService 实现仅追加式（append-only）delta 补丁与有界历史窗口（PR #29568）
- `fix(cli)`: 状态持久化改为原子写入，损坏时可从备份恢复

---

## 🔥 社区热点 Issues

1. **#22323** — Subagent 达到 MAX_TURNS 后误报 `success`/`GOAL`，掩盖了中断事实（p1，13 条评论）。这是 agent 可观测性的核心信任问题：用户无法依赖 subagent 的状态报告。([链接](https://github.com/google-gemini/gemini-cli/issues/22323))

2. **#21409** — Generalist agent 无限挂起（p1，8 👍）。连建文件夹这样简单的操作都会挂起，只能通过禁用 subagent 绕过，严重影响可用性。([链接](https://github.com/google-gemini/gemini-cli/issues/21409))

3. **#19873** — 利用 Gemini 3 原生 bash 能力 + 零依赖 OS 沙箱（p2，9 条评论）。社区对沙箱化执行链（grep/sed/awk 组合）的架构性提案，方向性讨论热度高。([链接](https://github.com/google-gemini/gemini-cli/issues/19873))

4. **#21968** — 模型几乎不主动使用自定义 skills 和 subagents（p2，7 条评论）。用户配置了 gradle/git skills 后模型仍不触发，反映调度/路由策略的短板。([链接](https://github.com/google-gemini/gemini-cli/issues/21968))

5. **#22745** — EPIC：AST-aware 文件读取、搜索与代码库映射（7 条评论）。配套子任务 #22746、#22747 评估 tilth/glyph/ast-grep 等工具，可能重塑 `codebase_investigator` 的实现方式。([链接](https://github.com/google-gemini/gemini-cli/issues/22745))

6. **#21983** — Browser subagent 在 Wayland 下失败（p1）。Linux 桌面用户（Wayland 已是主流默认）被阻断。([链接](https://github.com/google-gemini/gemini-cli/issues/21983))

7. **#22267** — Browser Agent 完全忽略 `settings.json` 覆盖（如 `maxTurns`）。AgentRegistry 读取了配置但未生效，配置链路断裂。([链接](https://github.com/google-gemini/gemini-cli/issues/22267))

8. **#24246** — 超过 128 个工具时触发 400 错误。工具数量上限对重度扩展用户（MCP + skills）是硬约束，需要智能工具范围裁剪。([链接](https://github.com/google-gemini/gemini-cli/issues/24246))

9. **#22672** — Agent 应阻止/劝阻破坏性操作（`git reset --force`、DB 修改）。安全执行的“软护栏”需求，社区持续关注。([链接](https://github.com/google-gemini/gemini-cli/issues/22672))

10. **#19561** — 'Tactful Extraction'：token 节约型外科手术式读取。基线 36.6k tokens/turn、大文件读取曾导致 +15k tokens 膨胀，与 AST-aware 方向形成呼应。([链接](https://github.com/google-gemini/gemini-cli/issues/19561))

---

## 🔧 重要 PR 进展

1. **#29608** — 网络搜索/抓取 30 秒超时（p1）。修复 GoogleSearch/WebFetch 永久挂起（用户报告 30+ 分钟 "Thinking..."）的问题。([链接](https://github.com/google-gemini/gemini-cli/pull/29608))

2. **#29584** — 防止快速退出时删除已恢复会话的历史（p1）。修复恢复会话后 Ctrl+C 导致**磁盘上会话文件被永久删除**的数据丢失严重 bug。([链接](https://github.com/google-gemini/gemini-cli/pull/29584))

3. **#29618** — 恢复会话时避免重复的 tool response turns（p1）。修复会话重放时 functionResponse 重复反序列化。([链接](https://github.com/google-gemini/gemini-cli/pull/29618))

4. **#29616** — OAuth 回调 `iss` 参数校验对齐 RFC 9207（p1，security）。MCP 授权规范合规修复。([链接](https://github.com/google-gemini/gemini-cli/pull/29616))

5. **#29612** — 强制“终端用户轮次”不变量并规范化请求内容。修复 `/rewind`、流中断后发送违反 API 协议的历史记录。([链接](https://github.com/google-gemini/gemini-cli/pull/29612))

6. **#29457** — read-many-files 用 glob 匹配替换模糊的 requestedExplicitly 判断（p1）。修复二进制资源（图片/PDF/音频）被误判为显式请求导致的**上下文膨胀**。([链接](https://github.com/google-gemini/gemini-cli/pull/29457))

7. **#29582** — 性能优化：忽略过滤引入目录级状态记忆、子树剪枝与 symlink 缓存，解决大仓库多秒级阻塞（perf）。([链接](https://github.com/google-gemini/gemini-cli/pull/29582))

8. **#29611** — 支持带点号的 Gemini 3 型号别名（如 `gemini-3.8-flash`）的多模态 function response，防止 HTTP 400。([链接](https://github.com/google-gemini/gemini-cli/pull/29611))

9. **#29617** — `@<directory>` 引用不再递归展开 `**` 全量读取（p1），避免上下文爆炸。([链接](https://github.com/google-gemini/gemini-cli/pull/29617))

10. **#29597** — companion 支持 gVisor/runsc 沙箱下的 IPC socket 回退。用户态网络栈隔离 loopback 时的通信方案。([链接](https://github.com/google-gemini/gemini-cli/pull/29597))

> 另值得关注：**#29601**（已关闭）是一次负责任的供应链安全披露 PoC，验证 CI 环境变量暴露风险，配套加固 PR **#29615**。

---

## 📈 功能需求趋势

- **Subagent 体系成熟化**：AST-aware 代码探索、并行协作与共享内存（#18287）、本地 subagent Sprint（#20195）、轨迹可分享（#22598）——agent 架构是当前最大投入方向。
- **Token 效率与上下文治理**：Tactful Extraction、AST 精确读取、@目录不递归展开、二进制资源过滤——社区对上下文成本高度敏感。
- **沙箱与安全执行**：gVisor 支持、零依赖 OS 沙箱、破坏性操作防护。
- **可观测性与评测**：/bug 报告缺少 subagent 上下文（#21763）、内部 eval 稳定性（#23166）、steering eval 修复（#23313）。
- **任务管理演进**：文件化 CRUD 任务追踪取代 WriteToDo（#18836）以对抗 context rot。

## ⚠️ 开发者关注点

1. **Subagent 可靠性是最大痛点**：挂起（#21409）、误报成功（#22323）、配置忽略（#22267）三条 p1 并存，用户信任度受损。
2. **数据安全**：会话历史被误删（#29584）这类数据丢失 bug 需优先合入。
3. **上下文成本**：多条 PR/Issue 均指向“文件读取过度展开导致 token 膨胀”，是近期修复重点。
4. **工具规模上限**：128 工具 400 错误对重度 MCP 用户是实际天花板。
5. **终端兼容性**：Wayland 浏览器代理失败、Windows IDE 终端按键确认（#29502）显示跨平台细节问题仍多。

---
*数据来源：github.com/google-gemini/gemini-cli | 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-03 | 数据来源：github.com/github/copilot-cli**

---

## 1. 今日速览

过去 24 小时内 Copilot CLI 密集发布了 3 个补丁版本（v1.0.92-1 ~ -3），重点修复输入响应性、沙盒网络代理和 Windows 临时文件问题，并新增会话前 Ctrl+E 环境切换器（本地/云端）。社区侧共更新 35 条 Issue，MCP 相关问题（OAuth、配置加载、工具目录）成为最高频痛点，另有多个围绕 Opus 5.5 / gpt-6.1-sol / HydraFusion 路由的新模型问题曝光。

---

## 2. 版本发布

### v1.0.92-3
- **新增**：会话前 Ctrl+E 环境选择器，可在本地与云端运行之间切换
- **修复**：键盘/粘贴/鼠标输入在快速交互下保持有序响应；沙盒命令在代理拦截目标时提供网络绕过提示

### v1.0.92-2
- Windows 沙盒命令写入已授权的临时目录，支持“临时文件重命名落盘”类工具
- Prompt 模式在 Stop-hook 续跑完成后只触发一次 sessionEnd hook

### v1.0.92-1
- 修复 Streamable HTTP 会话过期后远程 MCP 服务器的重连
- 向运行中的后台 agent 发消息可在下一个处理点引导其当前轮次
- Context rollover 保留最新请求到恢复上下文；隐藏自动沙盒 CA 设置输出

---

## 3. 社区热点 Issues（Top 10）

1. **#4438** — `disable-model-invocation: true` 导致 Skill 完全不可达（应仅禁用自动调用）。开放近 2 个月、11 条评论、12 👍，是 Skill 系统最受关注的缺陷。[链接](https://github.com/github/copilot-cli/issues/4438)

2. **#5024** — Opus 5.5 原生 task 调用因 `anthropic-beta: fallback-credit-2026-07-01` 被 400 拒绝，复现率 5/5，影响新模型可用性。[链接](https://github.com/github/copilot-cli/issues/5024)

3. **#5042** — HydraFusion 路由 400 后同会话被重路由到小上下文模型（mai-code-1.1-flash），无法加载静态 prompt，工具集中途变更，属于路由降级体验的典型问题。[链接](https://github.com/github/copilot-cli/issues/5042)

4. **#5045** — gpt-6.1-sol 下 `/compact` 反复失败（空模型响应），直接影响长会话可用性。[链接](https://github.com/github/copilot-cli/issues/5045)

5. **#5040** — MCP OAuth：Entra ID 拒绝 `127.0.0.1` 回调（AADSTS50011），企业远程 MCP 认证受阻，涉及 4 个服务器。[链接](https://github.com/github/copilot-cli/issues/5040)

6. **#5044** — 1.0.87 回归：无关工具 `_meta` 差异触发 "MCP tool catalog changed"，导致工具调用失败。[链接](https://github.com/github/copilot-cli/issues/5044)

7. **#5038** — 内置 grep 工具静默忽略无横杠的 `n` 参数，模型丢横杠后拿不到行号；有 664 次 headless 基准数据支撑，值得工具参数容错改进。[链接](https://github.com/github/copilot-cli/issues/5038)

8. **#4482** — `permissions-config.json` 的 `allowed_directories` 不生效，需 `/add-dir` 才能抑制路径确认提示，权限配置可靠性问题。[链接](https://github.com/github/copilot-cli/issues/4482)

9. **#4569** — GitHub Mobile 远程控制会话停留在 "Queued for Copilot"，CLI 实际已响应，跨端状态同步问题。[链接](https://github.com/github/copilot-cli/issues/4569)

10. **#5015** — 请求键盘友好的 less/Vim 风格分页浏览历史，反映终端原生交互诉求（3 👍）。[链接](https://github.com/github/copilot-cli/issues/5015)

**其他速览**：#5032（agent 生成的 commit 中 `Copilot-Session` 尾随 `Co-authored-by` 破坏共同署名）、#5037（rewind 后粘贴图片丢失）、#5035（会话 UI 冻结但 events.jsonl 持续增长）、#5025（Figma 远程 MCP 的 Code Connect 数据为空）。

**已关闭值得关注**：#4832（1.0.83 不加载 workspace `.mcp.json`）、#4012（BYOK reasoning effort，23 👍）、#1825（空 Input Schema 拒绝 MCP 工具）。

---

## 4. 重要 PR 进展

过去 24 小时内无活跃 PR 更新（共 0 条），今日无 PR 动态可汇报。修复内容均通过 Release 补丁直接交付。

---

## 5. 功能需求趋势

- **MCP 生态健壮性**（最集中）：OAuth/Entra 兼容、协议版本回退（#5039 已修）、配置热重载、状态通知抑制（#5034）、Token 缓存共享
- **多模型/路由稳定性**：BYOK（#4840）、HydraFusion 路由降级、Opus 5.5 / gpt-6.1-sol 兼容、reasoning effort 支持
- **权限与沙盒精细化**：命令模式 allow-list（#3032）、目录白名单修复、网络代理绕过（已在 v1.0.92-3 修复）
- **上下文与会话管理**：Plan mode 干净上下文执行（#5041）、/compact 可靠性、rewind 数据保留
- **终端原生 UX**：键盘分页导航、关闭 Autopilot "Task complete" 摘要（#5033）、减少冗余输出
- **云/本地混合工作流**：新发布的 Ctrl+E 环境切换器直接呼应此方向

---

## 6. 开发者关注点

1. **MCP 是当前最大痛点**：认证（OAuth/Entra）、加载、重连、工具目录一致性多点开花，v1.0.92-1 已修复 HTTP 会话重连，但企业场景问题仍多。
2. **新模型接入质量**：路由失败后的降级行为不可控、BYOK 与非 OpenAI 系模型的 schema 兼容性问题反复出现。
3. **静默失败类缺陷**：grep 参数忽略、图片 rewind 丢失、UI 冻结，开发者对“无报错但结果错误”的容忍度最低。
4. **可配置性诉求**：从通知粒度到摘要开关，社区普遍希望对自动化行为有更细的开关控制。
5. **长会话可靠性**：/compact 失败、context rollover、后台任务超时等表明超长工作流仍是薄弱环节（v1.0.92-1 已有改善）。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-10-03

## 📌 今日速览

今日无新版本发布，社区活跃度集中在 V2 beta 的稳定性修复与工程质量提升上。核心团队（@kitlangton）在 TS 严格化（noUnusedLocals）和配置迁移清理上批量合入多个 PR，Nix 打包链路修复集中落地。Go 订阅服务的计费与缓存问题仍是用户侧最大痛点。

---

## 🔥 社区热点 Issues

1. **#45278** — 支付方式突然被拒（32 评论 / 20 👍）
   使用三个月的银行卡突然无法续费 Go 订阅，银行确认无异常。涉及付费用户留存，社区讨论热烈。
   https://github.com/anomalyco/opencode/issues/45278

2. **#24649** — OpenCode Go 模型自托管 vs 第三方代理的透明度问题（19 评论 / 33 👍）
   要求文档澄清 Go 计划中模型的基础设施归属，涉及信任与合规，已关闭但关注度高。
   https://github.com/anomalyco/opencode/issues/24649

3. **#26338** — 请求接入 CommandCode 作为 Provider（12 评论 / 45 👍，今日最高 👍）
   社区对新 provider 需求持续旺盛。
   https://github.com/anomalyco/opencode/issues/26338

4. **#18108** — 截断的 tool call 被误分类且不可恢复（11 评论）
   `finishReason: length` 场景下陷入 doom loop 或静默退出会话循环，是长上下文使用中的核心稳定性问题。
   https://github.com/anomalyco/opencode/issues/18108

5. **#42729** — 请求在 Go 目录中加入 Qwen3.8-27B 开源权重模型（10 评论 / 13 👍）
   https://github.com/anomalyco/opencode/issues/42729

6. **#51993** — deepseek-v4.1-flash 新增图片后 prompt cache 回退失效（8 评论）
   Go 计划用户报告缓存命中率骤降导致费用上升，与 #52761 共同指向 V2 缓存管理缺陷。
   https://github.com/anomalyco/opencode/issues/51993

7. **#42960** — V2 Esc 中断失效，任务后台残留（8 评论）
   Ctrl+C 退出重开后旧任务仍在后台运行，影响 CLI 日常体验。
   https://github.com/anomalyco/opencode/issues/42960

8. **#44094** — "shared model request" 重构后 compaction 忽略 `agents.compaction.model` 配置（6 评论）
   回归类 bug，静默使用会话当前模型，可能导致压缩成本失控。
   https://github.com/anomalyco/opencode/issues/44094

9. **#52796** — SQLite 磁盘满导致 tool 卡在 pending 状态
   错误未被处理，产生无 `tool_result` 的 `tool_use`，被 Anthropic API 拒绝（400）。
   https://github.com/anomalyco/opencode/issues/52796

10. **#52837** — 请求 `tool.execute.before` 钩子增加 `skip` 字段
    支持 AI 编排前置拦截（源于 OpenAPPA 视频引发的场景讨论），是对插件/自动化生态的有价值增强。
    https://github.com/anomalyco/opencode/issues/52837

---

## 🔧 重要 PR 进展

1. **#52868** — GUI 扩展引入类型化组合与生命周期原语
   无 Effect 运行时的依赖图校验，扩展并行激活，是 GUI 插件架构的重要演进。
   https://github.com/anomalyco/opencode/pull/52868

2. **#52866** — 修复 native HTTP 流在分帧事件上的 stall
   补齐 AI SDK 路径之外最后一块传输层修复，关闭 #43519。
   https://github.com/anomalyco/opencode/pull/52866

3. **#52871** — Windows 下隐藏后台子进程窗口（关闭 #42440）
   https://github.com/anomalyco/opencode/pull/52871

4. **#52865** — 支持 Scoop 安装的 opencode2 版本升级检测
   完善 Windows 升级链路。
   https://github.com/anomalyco/opencode/pull/52865

5. **#49863** — 修复 npm 子路径导出插件无法安装的问题（对应 Issue #49852）
   https://github.com/anomalyco/opencode/pull/49863

6. **#50231** — Effect 升级至 rc.118
   涉及 socket、schema 解析、JSON Schema 输出等多个破坏性变更，工程量大，仍在推进。
   https://github.com/anomalyco/opencode/pull/50231

7. **#52872** — 修复 question form 高亮在 raised surface 上的渲染问题
   https://github.com/anomalyco/opencode/pull/52872

8. **#52668** — 项目文件夹缺失时返回 404 而非 500
   提升已保存项目的容错体验。
   https://github.com/anomalyco/opencode/pull/52668

9. **#52869** — `/tui/select-session` 支持指定目标 TUI 实例
   https://github.com/anomalyco/opencode/pull/52869

10. **Nix 打包集中修复**（@jerome-benoit 系列，均已合入）
    - #52143 nix-eval 工作流跑在 v2 分支
    - #52129 移除已被 nixpkgs 26.11 弃用的 x86_64-darwin
    - #51891 修复 v2 分支三个打包缺陷
    https://github.com/anomalyco/opencode/pull/52143

---

## 📈 功能需求趋势

- **Go 订阅透明度与计费**：模型自托管归属（#24649）、计费误入 PAYG 余额（#52554）、支付失败（#45278）——商业侧信任问题集中爆发
- **新模型接入**：CommandCode provider（45 👍）、Qwen3.8-27B 等，开源权重模型呼声高
- **Prompt 缓存效率**：多个 issue（#51993、#52761）报告缓存命中率异常，直接影响用户成本
- **Compaction 可靠性**：缓存失效、thinking 块冲突（#52628）、配置忽略（#44094），V2 压缩链路是 bug 重灾区
- **插件/扩展生态**：npm 子路径导出、GUI 扩展类型化组合、`tool.execute.before` 钩子增强
- **Desktop 可观测性**：会话加载内容（skills/plugins/MCP）与上下文成本面板需求（#48252）

## ⚠️ 开发者关注点

1. **V2 beta 质量收敛**：session 恢复 400（#52452）、Esc 中断失效、subagent 提前完成（#48826）等会话生命周期 bug 密集
2. **Windows 体验滞后**：进程窗口、Scoop 升级、pin 功能缺失（#52794）多例集中出现
3. **CI/工程严谨性**：nix-eval 只评估不构建可让坏 derivation 合入 v2（#52863）；团队正通过 noUnusedLocals 系列提升代码卫生
4. **成本可观测性**：客户端计费 vs 网关上报成本（#43818，OpenRouter/LiteLLM 用户强烈需求）、控制台剩余额度 UI 语义反转（#52401）

---
*数据截至 2026-10-03，来源：github.com/anomalyco/opencode*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-03）

## 📌 今日速览

今日发布 nightly 版本 v0.24.7，包含 Code Mode 懒加载工具发现对齐及权限修复。社区讨论焦点集中在 **Managed Agent 双路径架构**（#12380 已累计 42 条评论持续推进）和**长上下文 Token 治理**两条主线；同时新增多个高质量 Bug 报告，涉及安全（Agent Host 凭据残留）、数据完整性（会话删除破坏 transcript）和 Windows 信任机制故障等。

---

## 🚀 版本发布

**v0.24.7-nightly.20261002.a011f66944**
- fix(core): 使 Code Mode 文本与懒加载工具发现机制对齐（[#12990](https://github.com/QwenLM/qwen-code/pull/12990)，@tanzhenxin）
- fix(permissions): 遵循已批准的权限设置

---

## 🔥 社区热点 Issues

**1. Managed Agent 双路径架构分阶段交付提案** — 42 条评论
[#12380](https://github.com/QwenLM/qwen-code/issues/12380)
定义保留现有 TypeScript agent loop、模型推理与工具环境供给解耦的分阶段架构，赋予 Session 持久所有权与可恢复的工具执行。这是当前社区讨论最热烈的架构级提案，衍生出多个 Stage 追踪 Issue（如 #12952 Stage G writer fencing）。

**2. 非会话上下文 Token 治理（追踪）** — 18 条评论，进行中
[#12028](https://github.com/QwenLM/qwen-code/issues/12028)
系统提示、内置工具 schema、QWEN.md 与技能列表每次请求都被完整发送。在长上下文模型上这块开销极易超过会话本身。长上下文成本优化的核心追踪项。

**3. 删除活跃会话导致 transcript 永久损坏**（P1）— 6 条评论
[#12091](https://github.com/QwenLM/qwen-code/issues/12091)
`sessions/delete` 后仍附着的 writer 会重建无头文件，`parentUuid` 断链导致会话永久降级（degraded_history、自动续跑被禁用）。今日最高优先级数据完整性 Bug。

**4. Agent Host 沙箱守卫时序错误导致运行中断**（blocked）— 6 条评论
[#13157](https://github.com/QwenLM/qwen-code/issues/13157)
工作区外的工具调用先进入权限流程，PLAN 模式下无交互客户端，权限提示被自动拒绝并终止整个 Host。沙箱与权限流程的顺序设计问题。

**5. Agent Host 401 重注册后残留有效凭据**（安全）— 5 条评论
[#13122](https://github.com/QwenLM/qwen-code/issues/13122)
`enrollAgentHost` 不按 name/workspaceCwd 去重，重入后旧行的 secret 仍然有效。凭据安全的真实隐患。

**6. 每日依赖 CVE 审计失败**
[#13078](https://github.com/QwenLM/qwen-code/issues/13078)
定时安全审计任务失败，可能是新的高危漏洞或 npm audit 端点不可用，需关注供应链安全。

**7. Windows 桌面版所有工作区突然变为不可信**
[#13130](https://github.com/QwenLM/qwen-code/issues/13130)
用户报告所有工作区（含主工作区）突然转为只读，UI 无恢复路径。影响可用性的环境类故障。

**8. 托管会话存储与面板投影无界增长**（性能）— 4 条评论
[#13184](https://github.com/QwenLM/qwen-code/issues/13184)
审计确认 managed-agent 持久层与 UI 层“只增不减”，会话事件全量保留。长期运行服务的内存隐患。

**9. Agent Host 终局结算后的迟到结果丢失用量**
[#13238](https://github.com/QwenLM/qwen-code/issues/13238)
`applyHostRunResult()` 将迟到的 Host 结果误判为已应用，累计 token 用量被丢弃。#12582 合并后的回归类问题。

**10. /context 估算可超出上下文窗口**
[#13239](https://github.com/QwenLM/qwen-code/issues/13239)
无 provider token 计数时，估算值可能超过窗口总量；MCP schema 被重复计入。与 #12028 同属上下文可视化准确性方向。

---

## 🔀 重要 PR 进展

| PR | 内容 |
|---|---|
| [#13247](https://github.com/QwenLM/qwen-code/pull/13247) | Managed Session 创建者可变更绑定工作目录（W2 切片），以持久幂等操作执行 |
| [#13241](https://github.com/QwenLM/qwen-code/pull/13241) | 区分已接受的 Host 结果与终局 run，修复 #13238 的迟到结果与用量丢失 |
| [#13225](https://github.com/QwenLM/qwen-code/pull/13225) | 安全回收已退役工具输出，使用持久 claim + 围栏 SQL 确认，每 tick 最多 32 个候选 |
| [#13214](https://github.com/QwenLM/qwen-code/pull/13214) | 修复 runtime-broker 跨进程释放竞态：释放与准入在同一事务内决策 |
| [#13243](https://github.com/QwenLM/qwen-code/pull/13243) | 限制托管 function-hook 模块求值的资源边界，修复 #13129 遗留 Critical 发现 |
| [#13192](https://github.com/QwenLM/qwen-code/pull/13192) | 修复 JDBC/JVM/数据库时区不一致时 writer 租约与发布 epoch 截止时间错误 |
| [#13188](https://github.com/QwenLM/qwen-code/pull/13188) | 关闭 #13083（Hosted Turn 接管/G1 故障转移）合并后审查的 3 个 Critical 发现 |
| [#13179](https://github.com/QwenLM/qwen-code/pull/13179) | 加固 commit 重试、worker 路径围栏（拒绝工作区外的相对路径）与面板轮询 |
| [#13156](https://github.com/QwenLM/qwen-code/pull/13156) | 修复 MEMORY.md 索引条目被 150 字符截断导致链接路径损坏 |
| [#12531](https://github.com/QwenLM/qwen-code/pull/12531) | MCP 服务器规则按身份比对，防止 `foo.bar` 规则授权 `foo_b` 服务的工具（安全修复） |

---

## 📈 功能需求趋势

1. **Managed Agent / 多 Agent 架构**：#12380 提案已进入 Stage G/D 落地阶段，Session 所有权、writer fencing、Workspace 绑定是核心议题，相关 PR 密集产出。
2. **Token 与上下文治理**：#12028、#13208、#13239、#13004 形成完整的问题簇——非会话上下文成本、输出预算窗口感知、估算准确性、memory 提取节奏。
3. **Web Shell / 桌面端体验**：键盘快捷键（#13175）、diff 长行换行（#13248）、memory 面板 CRLF 问题（#13177）等 UI 打磨需求活跃。
4. **安全与凭据**：Host 重注册凭据残留、MCP 身份混淆、CVE 审计——供应链与身份安全关注度上升。
5. **CI/CD 效率**：#13245 提议将可信 PR 泵道迁移到空闲 ECS 池以降低 hosted runner 成本。

---

## ⚠️ 开发者关注点

- **数据完整性风险**：会话删除破坏 transcript（P1）、迟到结果丢用量、租约 epoch 时区问题——托管路径的持久化一致性是当前 Bug 高发区。
- **内存/存储增长**：托管会话“只增不减”的姿态（#13184）与 memory 索引预算双重定义（#13178、#13236）值得长期运行用户警惕。
- **网络环境兼容性**：#13234 详细分析了大陆运营商链路上 TLS 栈代际导致的连接重置，Electron/BoringSSL 失败而 Node 24/OpenSSL 3.5 成功，附诊断与绕行方案。
- **多 API Key 配置混乱**：#12760 反映 `/model` 切换时免费额度与付费计划的密钥选择不符合预期（已关闭，但反映配置体验痛点）。
- **blocked 状态问题积压**：#13157、#13133、#13236 等多个 Issue 被依赖关系阻塞，需关注解阻排期。

---
*数据截至 2026-10-03，来源：github.com/QwenLM/qwen-code*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*