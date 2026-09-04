# AI CLI 工具社区动态日报 2026-09-05

> 生成时间: 2026-09-04 22:20 UTC | 覆盖工具: 7 个

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

**日期：2026-09-05 | 覆盖范围：Claude Code / OpenAI Codex / Gemini CLI / Copilot CLI / Kimi Code CLI / OpenCode / Qwen Code**

---

## 一、生态全景

AI CLI 工具已进入"模型—客户端深度耦合"的竞争阶段：头部厂商（Anthropic、OpenAI、Google、GitHub）均以高频版本迭代将新模型能力（如 GPT-6-Astra、Gemini 3）快速推至终端，而开源阵营（Gemini CLI、Qwen Code、OpenCode）则靠社区 PR 保持工程节奏。**安全沙箱化**是当日最一致的工程主线——四家工具同日推进沙箱边界、权限管控与凭证安全修复。与此同时，**资源治理**（内存泄漏、磁盘膨胀、OOM）与**成本可观测性**（prompt cache 归因、计费透明）正取代功能堆叠，成为社区抱怨最集中、也最能决定重度用户去留的战场。值得关注的是，以 ACP 为代表的**跨 Agent 互操作**（Qwen Code 已可编排 Claude Code 作为执行器）开始萌芽，预示竞争重心正从"单一工具"转向"Agent 运行时层"。

---

## 二、各工具活跃度对比

| 工具 | Issue 动态（24h） | PR 动态（24h） | Release | 当日焦点 |
|---|---|---|---|---|
| **Claude Code** | 50 条更新，**全部为 stale bot 批量关闭** | 2 条（社区贡献，均 OPEN，吸纳节奏慢） | **2 个**（v2.1.260/261） | 可观测性：/diff 面板、缓存未命中归因 |
| **OpenAI Codex** | 10+ 热点，4 条为当日新增（Astra 可见性、项目消失） | **10+ 条，多为已合并**（含 5 个 Guardian 系列） | **3 个**（含 1 alpha） | Astra 上线+热修复；Windows 沙箱架构 |
| **Gemini CLI** | 10 热点 + Auto Memory 系列 bug | 10 条，安全加固主题密集 | 1 个 nightly | 沙箱边界、配置所有权、路径穿越防护 |
| **Copilot CLI** | 38 条活跃，OOM 呈多发态势 | **≈0**（仅 1 条疑似垃圾 PR） | **3 个**（v1.0.83→84-0） | 沙箱强化、Win11 任务栏；ACP 权限回归 |
| **Kimi Code CLI** | 7 条（6 条批量关闭、1 条新增） | 1 条 | 0 | 仓库维护性清理，静默日 |
| **OpenCode** | 内存大合集帖 139 评论持续发酵 | 未披露 | 1 个（v1.18.28） | **当日发布、当日回归**（#47368 MCP） |
| **Qwen Code** | 10 热点，#8662 迁移帖 30 评论居首 | 10 条（含 ACP 互操作里程碑 PR） | 0 | OpenTUI 渲染迁移、跨 Agent 委托 |

> ⚠️ 数据口径说明：各仓库对 stale bot 的使用策略不同（Claude Code、Kimi 存在批量关闭），Issue 数不完全等价于讨论热度；Copilot CLI 与 Claude Code 属闭源产品仓库，PR 通道天然缺失，活跃度应主要看 Release 与 Issue 反馈。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求与证据 |
|---|---|---|
| **沙箱与安全加固** | Codex、Gemini、Copilot、Qwen、Claude |

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据来源：anthropics/skills 仓库 PR 与 Issues（截至 2026-09-05）
> ⚠️ 数据说明：本批次 PR 的评论数字段缺失（undefined），排序依据原始抓取顺序；Issues 评论数完整可用。所有 Top 20 PR 状态均为 **OPEN**。

---

## 一、热门 Skills 排行（PR）

| # | Skill / PR | 功能 | 讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 评估修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 `run_eval.py` 永远报告 0% recall 的核心缺陷，同步修复 Windows 流读取、触发检测与并行 worker | 关联 [#556](https://github.com/anthropics/skills/issues/556)（10+ 独立复现），描述优化循环此前在“对噪声优化”，是本周期最高优先级修复 | OPEN |
| 2 | **document-typography** [#514](https://github.com/anthropics/skills/pull/514) | AI 生成文档的排版质量控制：孤行、寡段、编号错位 | 切中“Claude 生成的所有文档都受影响”这一普遍痛点，属于用户极少主动要求但体验影响巨大的默认质量类 Skill | OPEN |
| 3 | **scnet-hpc** [#1615](https://github.com/anthropics/skills/pull/1615) | 基于 Profile 的 SSH + Slurm 工作流，操作 SCNet HPC 集群 | 代表垂直基础设施场景（超算）进入 Skills 生态 | OPEN |
| 4 | **ODT Skill** [#486](https://github.com/anthropics/skills/pull/486) | OpenDocument（.odt/.ods）创建、模板填充及 ODT→HTML 解析 | 补齐官方文档技能矩阵中开源/ISO 标准格式的空缺 | OPEN |
| 5 | **Hivemind** [#1628](https://github.com/anthropics/skills/pull/1628) | 零成本多智能体编排：将机械性工作委派给运行免费模型的 headless opencode worker，Claude Code 只做规划/审查/合并 | 引发“昂贵模型上下文才是稀缺资源”的架构讨论，是多 Agent 成本优化的代表性方案 | OPEN |
| 6 | **testing-patterns** [#723](https://github.com/anthropics/skills/pull/723) | 全栈测试知识：Testing Trophy 哲学、AAA 单测、React Testing Library、集成与 E2E | 填补官方 Skills 中测试方法论空白 | OPEN |
| 7 | **ServiceNow 平台 Skill** [#568](https://github.com/anthropics/skills/pull/568) | 覆盖 ITSM/ITOM/SecOps/FSM/CSDM/IntegrationHub 的企业级 ServiceNow 助手 | 定位“平台级助手”而非窄脚本工具，是企业软件集成的典型样本 | OPEN |
| 8 | **pyxel 复古游戏开发** [#525](https://github.com/anthropics/skills/pull/525) | 对接 pyxel-mcp，覆盖“编写→运行截图→检查→迭代”的像素游戏工作流 | 展示 Skill + MCP 组合的创意开发场景 | OPEN |

---

## 二、社区需求趋势（来自 Issues）

1. **🔐 信任与安全治理（最强声量）** — [#492](https://github.com/anthropics/skills/issues/492)（**43 条评论，全站第一**）：社区 Skill 冒用 `anthropic/` 命名空间分发，构成信任边界滥用；配套诉求见 agent-governance 提案 [#412](https://github.com/anthropics/skills/issues/412) 与 SharePoint 权限设计疑虑 [#1175](https://github.com/anthropics/skills/issues/1175)。
2. **🏢 企业级分发与组织内共享** — [#228](https://github.com/anthropics/skills/issues/228)（16 评论）：呼吁组织级 Skill 库/直接分享链接，替代目前“下载 .skill 文件走 Slack”的原始流程；[#189](https://github.com/anthropics/skills/issues/189) 则暴露插件重复安装挤占上下文的问题。
3. **🛠️ Skill 元工具链的可靠性** — [#556](https://github.com/anthropics/skills/issues/556)（12 评论）：skill-creator 的评估/触发机制系统性失效，催生 #1298、#1099、#1050、#539 等一串修复 PR；[#202](https://github.com/anthropics/skills/issues/202) 要求 skill-creator 本身按最佳实践重写。
4. **🧠 上下文效率与输出质量门禁** — [#1487](https://github.com/anthropics/skills/issues/1487)：claude-api Skill 单次注入 ~156k token 耗尽上下文；[#1329](https://github.com/anthropics/skills/issues/1329) 提议 compact-memory 符号化压缩 Agent 状态；[#1385](https://github.com/anthropics/skills/issues/1385) 提出“校准→对抗审查→交付验证”三道质量门禁。
5. **🔌 跨生态互操作** — [#16](https://github.com/anthropics/skills/issues/16)：Skill 暴露为 MCP 接口；[#29](https://github.com/anthropics/skills/issues/29)：Bedrock 支持诉求。

---

## 三、高潜力待合并 Skills（活跃 OPEN PR）

- [#1298](https://github.com/anthropics/skills/pull/1298) — run_eval.py 根因修复，解决 10+ 复现的高频 Bug（#556），合并价值最高
- [#514](https://github.com/anthropics/skills/pull/514) — document-typography，通用性强、痛点普适
- [#486](https://github.com/anthropics/skills/pull/486) — ODT 支持，文档矩阵补全
- [#541](https://github.com/anthropics/skills/pull/541) / [#538](https://github.com/anthropics/skills/pull/538) — docx/pdf 修复（OOXML 共享 ID 空间冲突、大小写敏感路径），小而确定的可靠性改进
- [#1628](https://github.com/anthropics/skills/pull/1628) — Hivemind 多 Agent 成本优化，架构讨论热度高
- [#210](https://github.com/anthropics/skills/pull/210) — frontend-design 可执行性重写，属官方 Skill 质量回修
- [#83](https://github.com/anthropics/skills/pull/83) — skill-quality/security-analyzer 双元技能，直接回应 #492 安全关切

---

## 四、生态洞察（一句话）

**社区最集中的诉求不是“更多领域 Skill”，而是生态本身的可信度与可靠性——安全命名空间治理、skill-creator 工具链修复、上下文效率与质量自审构成了本周期三大主线。**

---

# Claude Code 社区动态日报
**日期：2026-09-05 | 数据来源：github.com/anthropics/claude-code**

---

## 一、今日速览

昨日 Claude Code 连发两个版本（v2.1.260 / v2.1.261），重点提升**可观测性**：新增 `/diff` 实时改动面板、prompt-cache 未命中归因诊断、组织策略加载失败提示，以及可调的命令输出截断上限。社区侧需注意：过去 24 小时内更新的 50 条 Issue **全部为 CLOSED + stale 状态**，主要由 stale 机器人批量清理推动，并非新增讨论或官方修复；从存量内容看，安全策略误判、token 成本失控与跨会话协作仍是开发者最集中的痛点。

---

## 二、版本发布

### [v2.1.261](https://github.com/anthropics/claude-code/releases)
- `/status` 和 `claude doctor` 新增 **"Organization policy"** 诊断行，说明组织策略无法加载的原因（如代理未透传 endpoint）——对企业代理环境排障非常有用
- 新增 `bashOutputMaxChars` 和 `taskOutputMaxChars` 设置，可提高命令与后台任务输出的捕获上限，缓解长输出被截断的问题

### [v2.1.260](https://github.com/anthropics/claude-code/releases)
- 全屏模式下新增 **diff 侧边面板**，随 Claude 编辑实时展示未提交的改动，`/diff` 切换
- `/cost` 中新增 **prompt-cache 未命中的可能原因**提示（工具定义或系统提示变更、空闲超过 TTL 等）——直击 API 成本优化刚需

---

## 三、社区热点 Issues

> ⚠️ 以下 Issue 均已于近期被 stale 机制关闭（多为 7 月创建、9-04 更新），反映的是持续存在的社区诉求而非已修复问题。

**1. [#78935](https://github.com/anthropics/claude-code/issues/78935) — 安全策略文本重复注入，静默烧光使用限额**
Windows 平台上安全策略文本被持续/重复注入到无关会话，直接消耗 token 并触发限额。安全机制本身成为成本黑洞，属高严重度问题。

**2. [#78241](https://github.com/anthropics/claude-code/issues/78241) — 伪造的用户回合被注入会话上下文（Linux，area:security）**
本地 transcript 中不存在、但 parentUuid 链完整的"伪造用户消息"出现在模型上下文中。无论根因是缓存污染还是注入，都值得安全敏感团队关注。

**3. [#79679](https://github.com/anthropics/claude-code/issues/79679) — "45% 周额度花在给 Claude 建 PM 工具上"**
用户抱怨近一半 Fable 配额消耗在搭建项目管理脚手架以约束任务蔓延（sprawl），而非实际业务开发。代表了大量重度用户对**开箱即用任务治理能力**的强烈不满。

**4. [#74250](https://github.com/anthropics/claude-code/issues/74250) — 并行会话破坏 MCP OAuth 刷新令牌轮换**
多个会话共享凭证存储时触发 refresh-token 重用检测，导致整个 token family 被吊销、所有会话被迫交互式重认证。企业 MCP 部署的典型阻碍。

**5. [#80292](https://github.com/anthropics/claude-code/issues/80292) — 多设备 Max 订阅刷新令牌"乒乓式"失效**
一台设备登录数小时后另一台被登出，循环往复。多机工作流用户的基本可用性问题。

**6. [#79285](https://github.com/anthropics/claude-code/issues/79285) — Routines 表单缺失模型选择器，静默回退默认模型**
文档仍描述存在模型选择器，实际 UI 已移除且无任何提示。"静默行为变更"是比功能缺失更危险的信任问题。

**7. [#77805](https://github.com/anthropics/claude-code/issues/77805) — 请求在 UI 中暴露 Session ID**
跨会话消息工具目前只能靠标题/分支模糊匹配定位目标会话，社区需要 UI 直接展示会话 ID。这是多 Agent 协作生态的基础设施缺口。

**8. [#80269](https://github.com/anthropics/claude-code/issues/80269) — 功能请求：上下文占用超阈值自动 handoff**
长上下文下模型准确率下降（锚定效应、指令稀释），用户只能手动盯着百分比执行 `/end-chat`。自动化上下文交接是长任务的刚需。

**9. [#80246](https://github.com/anthropics/claude-code/issues/80246) — 后台 Bash 任务仍在运行，Header 已显示 "done"**
`run_in_background: true` 的任务未返回时，状态指示即转为空闲。后台任务的可观测性缺口易造成误判。

**10. [#77055](https://github.com/anthropics/claude-code/issues/77055) — VSCode 扩展 `/mcp` 交互对话框退化为纯文本（2.1.205 起回归）**
带 `has repro` 标签的确认回归，影响 IDE 内 MCP 管理体验，代表 VSCode 扩展质量下滑的一系列反馈。

---

## 四、重要 PR 进展

> 过去 24 小时仅 2 条 PR 更新，均为社区贡献、处于 OPEN 状态，官方仓库的 PR 吸纳节奏本周期偏慢。

**1. [#61691](https://github.com/anthropics/claude-code/pull/61691) — GitHub Connector "显示已连接但无工具"诊断脚本**
针对 Windows 上反复出现的 GitHub MCP 连接器状态为 Connected 却暴露零工具的问题，提供 PowerShell 诊断/修复脚本，并串联了多个关联 issue 的根因分析。

**2. [#87079](https://github.com/anthropics/claude-code/pull/87079) — 修复 `**` glob 模式无法匹配零深度路径（security-guidance）**
`**/*.ts` 因委托给 fnmatch 而要求字面 `/`，导致 `security-patterns.json` 中的安全规则**静默跳过顶层文件**。作者强调"安全规则的静默失效"是高危失败模式，值得优先评审合入。

---

## 五、功能需求趋势

从本期 Issue 全量数据中可提炼出五条主线：

| 方向 | 代表 Issue | 信号强度 |
|---|---|---|
| **多会话 / 多 Agent 协作** | #77805（暴露 Session ID）、#78706（可信对等会话免逐条审批）、#78128（终端标签标题承载会话状态） | ★★★ 持续升温 |
| **上下文生命周期管理** | #80269（超阈值自动 handoff）、配合 v2.1.260 的缓存诊断 | ★★★ 官方与社区同向 |
| **长时运行 / Headless 自动化** | #78653（消息投递型 MCP 调用满足回合输出要求）、#80289 系列 Cowork 定时任务问题 | ★★ 上升中 |
| **认证与企业环境** | #74250（OAuth 轮换）、#80292（多设备令牌）、v2.1.261 组织策略诊断 | ★★ 官方开始响应 |
| **TUI / IDE 体验细节** | #80290（statusLine 1Hz 刷新上限）、#80262（滚动内容无法复制）、#77055（VSCode 回归） | ★★ 长尾但影响留存 |

---

## 六、开发者关注点

1. **安全策略误伤正常开发**：机器视觉调试被标记为"网络安全话题"（[#80271](https://github.com/anthropics/claude-code/issues/80271)）、日常开发触发安全系统拦截（[#80240](https://github.com/anthropics/claude-code/issues/80240)）——误判申诉通道缺失是高频抱怨。

2. **Token 成本不可控**：策略文本重复注入烧限额（#78935）+ 过度任务蔓延迫使自建 PM 工具（#79679）叠加，重度用户对"花在管理工具上的钱"意见集中。建议关注新版 `bashOutputMaxChars` 与 `/cost` 缓存归因是否缓解此问题。

3. **静默行为变更**：Routines 模型回退（#79285）、模型名与实际模型不一致（[#80266](https://github.com/anthropics/claude-code/issues/80266)）等"不报错的错误"消耗信任，社区呼吁变更需显式提示。

4. **后台任务可观测性**：状态显示与实际任务生命周期脱节（#80246）、后台命令触发无归属的 Keychain 授权弹窗（[#80254](https://github.com/anthropics/claude-code/issues/80254)）。

5. **Windows / 企业域环境**：域加入机器上的 Cowork VM 崩溃（[#67829](https://github.com/anthropics/claude-code/issues/67829)）、MSIX 更新后无法启动叠加 OneDrive 重定向（[#78944](https://github.com/anthropics/claude-code/issues/78944)）——企业 Windows 环境是故障重灾区。

---

*数据说明：本期 Issue 更新以 stale bot 批量关闭为主，新发讨论较少；PR 活动量低。建议次日重点关注 v2.1.260/261 的社区实测反馈。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-09-05** | 数据来源：github.com/openai/codex

---

## 一、今日速览

今日核心主线是 **GPT-6-Astra 模型的落地与修补**：v0.153.3 将 Astra 加入 Amazon Bedrock 模型选择器，但社区随即在 Linux/Windows 端反馈模型不可见，官方已提交热修复 PR #42874。其次，**Windows 桌面端更新后的项目消失问题**集中爆发（#42739、#42867），叠加 WSL、沙箱等多个长期痛点，Windows 生态质量仍是最大短板。此外，团队合并了大量 Guardian 审查加固与 Windows 沙箱改进的 PR，工程侧投入明显。

---

## 二、版本发布

### rust-v0.153.3（稳定版）
- **新功能**：GPT-6-Astra 加入 Amazon Bedrock 模型选择器（Mantle 及 Runtime 全球/美国路由）(#42805)
- **修复**：纠正 GPT-6-Astra 异步澄清提问的引导逻辑，改用受支持的工具并明确其仅接受文本 (#42809)

### rust-v0.153.2
- **修复**：GPT-6-Astra Fast 档位描述从 "1.5x" 更正为 "2x speed, increased usage"（仅文案变更，不影响实际请求）(#42632)

### rust-v0.154.0-alpha.3（预览版）
- Alpha 迭代版本，面向下个特性周期。

---

## 三、社区热点 Issues（Top 10）

**1. [#39903] TUI 命令折叠无法关闭（已关闭）** — 65 评论 / 81 👍
社区参与度最高的 Issue：用户要求提供选项禁用 "Ran N commands" 折叠、始终显示执行的命令。81 个赞反映 TUI 可审计性是 CLI 用户的核心诉求，现已关闭。
🔗 https://github.com/openai/codex/issues/39903

**2. [#18960] Codex App 频繁重连循环（OPEN）** — 56 评论 / 51 👍
websocket 在 `response.completed` 前被服务端关闭导致流式失败，自 4 月持续至今，是存活最久的高热度连接性问题。
🔗 https://github.com/openai/codex/issues/18960

**3. [#25178] Windows 10 22H2 Computer Use 截图失败（OPEN）** — 39 评论 / 17 👍
`get_window_state` 调用截图时因 `SetIsBorderRequired` 接口不受支持（0x80004002）而失败，影响旧版 Windows 上的 Computer Use 完整性。
🔗 https://github.com/openai/codex/issues/25178

**4. [#36040] iOS Remote 回归：仅显示近期有会话的项目（OPEN）** — 30 评论
Remote Control 配对 macOS 主机后项目列表不完整，属于多端协同的回归问题。
🔗 https://github.com/openai/codex/issues/36040

**5. [#34061] 子代理导致磁盘占用失控（OPEN）** — 25 评论
Subagent 会话文件无限累积，是性能/资源类问题中呼声最高的一条，与今日合并的 jemalloc PR 呼应。
🔗 https://github.com/openai/codex/issues/34061

**6. [#41463] Windows + WSL 无法创建项目（OPEN）** — 24 评论 / 16 👍
`AbsolutePathBuf` 反序列化缺少 base path，直接阻断 WSL 用户创建项目，属功能性阻断级缺陷。
🔗 https://github.com/openai/codex/issues/41463

**7. [#41566] 会话历史投影被重复 ordinal 永久冻结（OPEN）** — 14 评论
未完成 turn 后分页 rollout 产生重复序号，导致线程历史冻结，涉及数据一致性，需重点关注。
🔗 https://github.com/openai/codex/issues/41566

**8. [#41960] Windows 桌面宠物不响应点击/拖拽（OPEN）** — 14 评论 / 16 👍
Pets 彩蛋功能在 Windows 上输入完全失效，16 个赞说明该功能的用户基础不小。
🔗 https://github.com/openai/codex/issues/41960

**9. [#42853 / #42868] Astra 模型在 Windows/Linux 不可见（OPEN）** — 今日新增
与 v0.153.3 发布直接相关：符合条件的 Pro 账户在 Windows 模型选择器中看不到 GPT-6-Astra，Linux 端亦不稳定。官方热修复 PR #42874 已就绪。
🔗 https://github.com/openai/codex/issues/42853 | https://github.com/openai/codex/issues/42868

**10. [#42739 / #42867] Windows 更新后本地项目全部消失（OPEN/CLOSED）** — 今日集中爆发
多个用户报告桌面端更新后 Projects 侧栏清空、会话被移入 Recents，#42867 定位为项目归属迁移不完整，当天即被关闭，修复节奏较快。
🔗 https://github.com/openai/codex/issues/42739 | https://github.com/openai/codex/issues/42867

---

## 四、重要 PR 进展（Top 10）

**1. [#42874] [0.153 hotfix] 在捆绑模型选择器中显示 Astra（OPEN）**
将 `gpt-6-astra` 可见性改为 `list`，修复 0.153 捆绑目录隐藏 Astra 的问题，且其优先级使其成为未显式配置时的默认模型。直接回应今日两个高热 Issue。
🔗 https://github.com/openai/codex/pull/42874

**2. [#42841] 原生 Windows MXC 沙箱适配器（已合并）**
新增 `codex-mxc-sandbox`，包含原生 MXC 可用性检测与启动器，拒绝不支持的策略并验证 deny-path，是 Windows 沙箱架构的重要一步。
🔗 https://github.com/openai/codex/pull/42841

**3. [#42850] Linux musl 二进制改用 jemalloc（已合并）**
CLI 与 app server 在 musl 目标上切换至 `tikv-jemallocator`，改善内存分配性能，利好 Alpine 等静态链接环境。
🔗 https://github.com/openai/codex/pull/42850

**4. [#42847] TUI 复制时保留 Markdown 格式（已合并）**
复制整条回复时同时提供渲染 HTML 与原始 Markdown，富文本目的地可保留标题、列表、表格等格式，直接改善 CLI 用户体验。
🔗 https://github.com/openai/codex/pull/42847

**5. [#42870] 避免冗余文件系统沙箱路径解析（已合并）**
消除沙箱准备阶段在执行线程上的重复同步探测与别名解析，减少阻塞，属性能优化。
🔗 https://github.com/openai/codex/pull/42870

**6. [#42835] 沙箱 CLI 保留 Windows 托管 deny 读取限制（已合并）**
修复 `codex sandbox --permission-profile` 传入空列表导致 deny-read ACL 被丢弃的安全缺陷。
🔗 https://github.com/openai/codex/pull/42835

**7. [#42833] Windows 沙箱包装器保留 SystemRoot（已合并）**
`ShellExecuteExW` 提权需要 `SystemRoot` 环境变量，此前缺失会导致沙箱安装助手失败。
🔗 https://github.com/openai/codex/pull/42833

**8. [#42823] 通过 app server 暴露托管 WebMCP 策略（已合并）**
解析 `[browser_use].allow_webmcp` 托管配置并保持层级优先级，面向企业管控场景。
🔗 https://github.com/openai/codex/pull/42823

**9. [#42821] `codex doctor` 报告托管文件系统策略（已合并）**
诊断信息覆盖云感知配置加载、加载耗时与托管策略，提升企业环境可诊断性。
🔗 https://github.com/openai/codex/pull/42821

**10. [#42852] Guardian 审查在上下文压缩后加固（已合并）** ⭐ 系列合并
今日共有 5 个 Guardian 相关 PR 合并（#42852、#42844、#42832、#42838、#42819），系统性解决压缩/恢复后用户授权约束丢失、执行器路径转换错误、审批路由依赖异步评分器等问题，是当日最大的工程投入方向。
🔗 https://github.com/openai/codex/pull/42852

---

## 五、功能需求趋势

| 趋势方向 | 信号来源 |
|---|---|
| **新模型（Astra/GPT-6）跨平台可用性** | v0.153.3 发布 + #42853/#42868 可见性问题 + 3 个模型引导 PR，模型分发一致性是当前焦点 |
| **Windows 平台成熟度** | Issues 中 Windows 相关占比最高（沙箱、WSL、桌面更新迁移、Pets、Remote Control），PR 侧 MXC 沙箱适配器等 4 个 Windows 专项修复呼应 |
| **远程控制与多端同步** | iOS Remote 回归 (#36040)、active-writer 冲突 (#40558)、Windows 注册失败 (#32164)、权限未生效 (#41234) |
| **会话/数据管理** | 历史冻结 (#41566)、并发会话泄漏工作区 (#24224)、本地导出需求 (#26740)、转录丢失 (#27734) |
| **企业托管与策略管控** | WebMCP 策略 (#42823)、doctor 托管报告 (#42821)、feature 别名优先级 (#42863)、MCP OAuth 规范 (#15643) |
| **性能与资源占用** | 子代理磁盘占用 (#34061)、进程树未终止 (#32742)、jemalloc 与沙箱路径解析优化 |

---

## 六、开发者关注点

1. **升级即事故**：Windows 桌面端更新多次引发项目消失、历史丢失（#42739、#42867、#27734、#33597），社区对更新迁移脚本的信任度下降，呼吁升级前数据备份与迁移校验机制。
2. **WSL 集成是重灾区**：项目创建阻断 (#41463) 与登录回调挂起 (#37682) 长期未解，WSL 用户实际处于半不可用状态。
3. **资源泄漏需系统性治理**：磁盘无限增长 (#34061) 与子进程树残留 (#32742) 表明生命周期管理存在结构性缺口，而非孤立 bug。
4. **模型可用性不一致削弱体验**：Astra 在 Bedrock 上线但客户端选择器缺失，"服务端已发布、客户端看不到"的分发不同步引发即时挫败感。
5. **可观测性诉求强烈**：#38911（任务级用量与结果关联分析）与 #15643（MCP 规范合规）反映企业开发者希望获得更透明的用量与协议层诊断能力。

---
*本报告基于过去 24 小时 GitHub 公开数据自动生成，评论数/点赞数为截至抓取时点的快照。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-09-05** | 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 📌 今日速览

昨日发布 v0.60.0-nightly 版本，修复了 MCP OAuth 流程中的 RFC 9207 签发方标识问题。社区贡献的 PR 呈现明显的**安全加固主题**——沙箱文件系统边界、配置文件所有权校验、路径穿越防护等批量推进。Issue 讨论热度则集中在 **Subagent 可靠性**（虚假成功上报、挂起）与 **Auto Memory 隐私安全**两大方向。

---

## 🚀 版本发布

**[v0.60.0-nightly.20260904.g87a9c71d5](https://github.com/google-gemini/gemini-cli/releases)**

- **fix(core)**: 在 MCP OAuth 流程中强制执行 RFC 9207 签发方标识校验（[PR #29117](https://github.com/google-gemini/gemini-cli/pull/29117)），提升了 MCP 服务器身份验证的规范性与安全性。

---

## 🔥 社区热点 Issues（Top 10）

**1. [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent 达到 MAX_TURNS 后仍上报 GOAL 成功**
`P1` · 13 评论 · area/agent
最热讨论。`codebase_investigator` 子代理在触及轮次上限、未执行任何分析的情况下仍报告 `success`，中断被"成功"掩盖，严重误导主代理决策。属于子代理可观测性的核心缺陷。

**2. [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent 无限挂起**
`P1` · 8 评论 · 👍8
用户报告通用代理接管后简单操作（如创建文件夹）也永久挂起，等待 1 小时无响应；明确指示不使用子代理则恢复正常。8 个 👍 反映影响面较广。

**3. [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | 零依赖 OS 沙箱 + 执行后意图路由**
`P2` · 9 评论 · kind/enhancement
架构级提案：利用 Gemini 3 模型原生的 bash 能力链式调用 POSIX 工具，同时通过 OS 级沙箱保证安全。与今日多个沙箱加固 PR 方向呼应，值得持续跟踪。

**4. [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | AST 感知的文件读取/搜索/映射 EPIC**
`P2` · 7 评论
评估 AST 感知工具的价值：精准读取方法边界、单次调用完成定位、降低 token 噪音。配套调查 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) 推荐 tilth/glyph 作为起点。

**5. [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini 主动使用 Skills 和子代理的频率过低**
`P2` · 6 评论
用户反馈即便任务高度相关，模型也不会自主调用自定义 skills（如 gradle/git），需显式指令。触及代理编排的核心体验问题。

**6. [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | Auto Memory 缺乏确定性脱敏**
`P2` · 5 评论 · area/security
Auto Memory 将本地转录内容发送给后台提取代理后**才**由模型脱敏——敏感数据已进入模型上下文。要求实现确定性脱敏并减少日志记录，隐私风险突出。

**7. [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) | Shell 命令执行完毕后卡在 "Waiting input"**
`P1` · 4 评论 · 👍3
简单命令执行完成后 CLI 仍显示命令活跃并等待用户输入，反复出现。与 #21409 同属"卡死"类高频痛点。

**8. [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | Browser subagent 在 Wayland 下失败**
`P1` · 4 评论
Linux Wayland 环境下浏览器子代理直接失败，影响 Linux 桌面用户的关键工作流。

**9. [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | 工具数超过 128 个触发 400 错误**
`P2` · 3 评论
MCP 生态扩展后的典型问题：工具数量超限直接报 400，期望代理能智能裁剪工具作用域。

**10. [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | get-shit-done 输出 hook 导致崩溃**
`P1` · 3 评论
输出 hook 在打印用户摘要阶段反复使 CLI 崩溃，属于稳定性 P1。

> 另可关注：Auto Memory 系列 bug 集中曝光——[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)（无效补丁静默跳过）、[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)（低信号会话无限重试）、[#26516](https://github.com/google-gemini/gemini-cli/issues/26516)（追踪汇总）。

---

## 🔧 重要 PR 进展（Top 10）

**安全加固方向（今日主线）：**

**1. [PR #29212](https://github.com/google-gemini/gemini-cli/pull/29212) | 系统配置路径所有权与访问控制校验** ✅ 已关闭
`P1` · 加载 `system-defaults.json` 和 `settings.json` 前强制校验文件所有权；Windows 侧验证 Administrators/SYSTEM/TrustedInstaller 所有权。与 nightly 中的 RFC 9207 修复同日出稿，安全节奏密集。

**2. [PR #29214](https://github.com/google-gemini/gemini-cli/pull/29214) | 沙箱文件系统边界加固与运行时状态隔离**
将沙箱运行时状态与宿主配置目录隔离，宿主目录挂载替换为脱敏只读配置文件，路径敏感性检查中解析符号链接。

**3. [PR #29215](https://github.com/google-gemini/gemini-cli/pull/29215) | 不可信工具输出的信封元数据溯源**
更新系统提示词，要求模型仅从已验证的顶层信封属性推断作者身份与运行状态，防范工具输出注入伪造元数据。

**4. [PR #29116](https://github.com/google-gemini/gemini-cli/pull/29116) | 缓解 NTFS 8.3 短文件名路径穿越**
在路径规范化和 AllowedPathChecker 中处理 Windows SFN 短名（如 `git~1`、`env~1`），堵住短名绕过黑名单的攻击面。

**5. [PR #29203](https://github.com/google-gemini/gemini-cli/pull/29203) | 剥离携带额外参数的 shell 包装器**
原 `stripShellWrapper` 仅识别裸 `bash -c`，附加参数即可绕过策略引擎的内层命令复查；现已支持更多包装器形态。

**稳定性与体验方向：**

**6. [PR #29201](https://github.com/google-gemini/gemini-cli/pull/29201) | 确认重试时保留已批准的 shell 命令** 
`P1` · 修复 TOML 自定义命令含多个 `!{...}` 注入时确认流程死循环、即使用户选择"始终允许"也永不收敛的问题。

**7. [PR #29206](https://github.com/google-gemini/gemini-cli/pull/29206) | resume 会话数据透传，消除孤儿会话文件** ✅ 已关闭
`--resume <uuid>` 时配置初始化未携带会话数据导致孤儿文件，现改为透传。

**8. [PR #29208](https://github.com/google-gemini/gemini-cli/pull/29208) | agents.json 形状异常时优雅降级**
`P2` · 损坏的 agents.json（同步冲突/磁盘满/手工编辑）原会导致裸 TypeError 崩溃，现校验形状并回退为空。

**9. [PR #29200](https://github.com/google-gemini/gemini-cli/pull/29200) | MCP 运行时策略一致性强制执行**
`P2` · 企业特性：策略检查对齐大小写不敏感的服务器名匹配，显式空 `mcp.allowed` 列表改为 fail-closed 而非放行全部。

**10. [PR #29205](https://github.com/google-gemini/gemini-cli/pull/29205) | MCP prompt 文本去除 JSON 编码直传**
修复 McpPromptLoader 对返回文本的 JSON 编码处理，完整保留内嵌引号与换行。

> 其他：[#29195](https://github.com/google-gemini/gemini-cli/pull/29195)（checkpoint 非数组 history 崩溃修复）、[#29211](https://github.com/google-gemini/gemini-cli/pull/29211)（React state updater 内嵌套 setState）、[#29209](https://github.com/google-gemini/gemini-cli/pull/29209)（非数字 PID 行防 NaN 污染 llmContent）。

---

## 📈 功能需求趋势

从近期 Issues 提炼出社区关注的主要方向：

| 方向 | 代表 Issue | 热度信号 |
|---|---|---|
| **Subagent 编排与可靠性** | #22323、#21409、#21968、#22598 | 讨论量最高，多个 P1 |
| **Auto Memory 安全与质量** | #26525、#26523、#26522

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-09-05** | 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)

---

## 📌 今日速览

过去 24 小时内 Copilot CLI 连发三个版本（v1.0.83 / v1.0.83-5 / v1.0.84-0），重点强化 **沙箱安全隔离** 与 **Windows 11 任务栏集成**，并新增 MCP OAuth 的 CIMD 支持。社区侧，**内存稳定性问题集中爆发**（多条 OOM 崩溃报告），同时 **ACP 模式权限自动批准的安全回归** 引发关注，值得企业用户警惕。

---

## 🚀 版本发布

### [v1.0.84-0](https://github.com/github/copilot-cli/releases)
- **Added**：托管沙箱会话现可在经批准的绕过提示后，对本次会话剩余部分禁用沙箱
- **Fixed**：
  - PowerShell 下被沙箱阻止的写入操作，现在会提供在沙箱外运行命令的选项
  - 修复凭据存储中存在多个 GitHub 账户时沙箱化 `gh` 的行为

### [v1.0.83-5](https://github.com/github/copilot-cli/releases)
- **Added**：Windows 11 任务栏显示运行中的 Copilot 会话，悬停可查看实时状态卡片
- **Improved**：macOS/Linux 上沙箱命令不再能访问本机运行的服务（macOS 同时阻断命令自身在 127.0.0.1 启动的服务器，可能影响部分测试套件）

### [v1.0.83](https://github.com/github/copilot-cli/releases)（2026-09-04）
- 新增 Client ID Metadata Document（CIMD）支持，用于 MCP OAuth 登录
- 自定义 Agent 的 `model` 字段支持列出多个模型，按顺序尝试直至可用；`model-policy: required` 保持强制约束

---

## 🔥 社区热点 Issues（Top 10）

| # | Issue | 关注度 | 为什么重要 |
|---|-------|--------|-----------|
| 1 | [#2904](https://github.com/github/copilot-cli/issues/2904) 自定义 Agent YAML frontmatter 应支持 Reasoning Effort | 8 评论 / 23 👍 | 本日互动量最高。`.agent.md` 已支持 `model` 字段，但推理力度仍只能通过全局 `--effort` 设置，社区强烈希望按 Agent 粒度控制 |
| 2 | [#2627](https://github.com/github/copilot-cli/issues/2627) 可配置系统提示词，削减固定 token 开销 | 4 评论 / 19 👍 | 系统提示词在会话启动即消耗约 20,500 tokens（200K 窗口的 10%），叠加工具定义约 8,500 tokens，重度用户成本痛点明显 |
| 3 | [#232](https://github.com/github/copilot-cli/issues/232) 为 Copilot CLI 添加 `--system-prompt` 参数 | 5 评论 / 10 👍 | 长期开放的经典需求（2025-10 创建），希望摆脱仓库级配置文件的限制，在命令行直接注入系统指令 |
| 4 | [#4537](https://github.com/github/copilot-cli/issues/4537) ACP 模式再次自动批准工具调用（#845 回归） | 1 评论 / 2 👍 | **安全风险**：自 1.0.81-1 起 `--acp` 模式不再发送 `session/request_permission`，Shell 命令、文件编辑/删除会无人值守直接执行，且会话日志无豁免记录。第三方客户端集成方需重点关注 |
| 5 | [#4699](https://github.com/github/copilot-cli/issues/4699) 长时间 `--resume` 会话 OOM 崩溃 | 1 评论 / 2 👍 | 1.0.82 版本 14 小时内 3 次在 4 GiB 堆上限崩溃；且崩溃转储文件被写入用户当前工作目录，污染项目目录 |
| 6 | [#4725](https://github.com/github/copilot-cli/issues/4725) 频繁 JavaScript heap OOM | 1 评论 | 与 #4699 相互印证，每数分钟崩溃一次，Mark-Compact 日志显示内存分配失败，稳定性问题呈多发态势 |
| 7 | [#4720](https://github.com/github/copilot-cli/issues/4720) 1.0.82 BYOK 模式静默禁用提示词缓存（成本约 5 倍） | 新 Issue | BYOK 请求不携带 prompt-cache 声明，`cached_tokens=0`，每轮全价重发全部上下文。对自付费 API 用户是直接的经济损失 |
| 8 | [#4728](https://github.com/github/copilot-cli/issues/4728) 自动更新重写自身 `copilot.exe`，破坏桌面应用内置 CLI | 新 Issue | 终端中运行 `copilot` 触发自动更新后，GitHub Copilot 桌面应用无法恢复任何已有会话，且无任何提示指向 CLI 问题，排查成本高 |
| 9 | [#4525](https://github.com/github/copilot-cli/issues/4525) 1.0.81-1 在 `server/discover` 成功后仍发送旧版 `initialize`，导致 -32022 | 6 评论 / 已关闭 | MCP 协议兼容性问题的典型案例（对 Python MCP SDK 2.0.0 双时代 runner），已随版本修复关闭，但同类问题仍在产生（见 #4647） |
| 10 | [#1688](https://github.com/github/copilot-cli/issues/1688) 在 config.json 中添加可配置的自动压缩阈值 | 3 评论 / 5 👍 | 使用 Claude Opus 4.6 等大模型时，上下文占用 45-60% 即出现明显延迟，内置压缩触发太晚。与 #2627、#4724 共同构成“上下文管理”需求簇 |

**其他值得留意**：[#4710](https://github.com/github/copilot-cli/issues/4710)（空闲会话中 `copilot-file-search` 线程失控，占满 CPU 核心且日志无限增长）、[#4647](https://github.com/github/copilot-cli/issues/4647)（v1.0.81 破坏 chroma-mcp 兼容性，待分诊）。

---

## 🔀 重要 PR 进展

过去 24 小时 PR 活动接近于零，仅 1 条更新：

- **[#3771](https://github.com/github/copilot-cli/pull/3771) "Initial project setup"** — 由社区账号提交，无描述、无 👍，从标题与账号特征看**疑似垃圾/无效 PR**，预计将被维护者关闭。

> 📊 说明：该仓库主要发行渠道为 Releases，外部代码贡献极少，属 GitHub 官方产品的典型模式。今日无实质性 PR 进展，故不凑数列示。

---

## 📈 功能需求趋势

综合全部 38 条活跃 Issue，社区需求集中在六个方向：

1. **上下文与 Token 管理**（最强烈）— 可配置系统提示词、削减固定开销、可调压缩阈值、空闲时按缓存 TTL 主动压缩（#232 / #2627 / #1688 / #4724）
2. **Agent 粒度控制** — 按 Agent 设置 reasoning effort、多模型回退已落地但细粒度配置仍缺（#2904；v1.0.83 已部分响应）
3. **MCP 生态兼容性** — 协议版本切换期的 `-32022`、chroma-mcp 破坏性变更等问题连续出现（#4525 / #4647）
4. **内存与运行时稳定性** — OOM 三连报（#4699 / #4725 / #4710），长会话场景尤为严重
5. **成本优化** — BYOK 提示词缓存失效（#4720）引发对计费透明度的关注
6. **企业治理** — 屏蔽内置插件市场（#4715）、对接 Trusted Access for Cyber program（#4322）

此外，**终端 UX 细节**（Shift+方向键文本选择 #2644、滚动条干扰复制 #4707、Android Studio 终端滚轮误触 #3194）持续有零星反馈。

---

## ⚠️ 开发者关注点

- **安全性优先级**：ACP 权限回归（#4537）意味着使用第三方 ACP 客户端的用户当前处于**无确认执行**状态，建议临时禁用或降级，直至官方修复
- **长会话不可靠**：--resume 长会话 + OOM 组合（#4699）建议控制会话时长、定期开新会话规避
- **BYOK 用户核对账单**：若在 1.0.82 上使用自有 API Key，检查 provider usage 中的 `cached_tokens` 是否为 0（#4720）
- **桌面应用用户**：避免在终端混用会触发自动更新的 `copilot` 命令，以防破坏桌面版会话（#4728）
- **沙箱策略变化**：v1.0.83-5 起沙箱阻断本机回环服务，依赖本地测试服务器（127.0.0.1）的测试套件可能受影响，注意评估升级
- **版本节奏快、回归多**：1.0.81–1.0.83 短期内引入多个兼容性/行为回归，生产环境建议滞后一个版本跟进

---

*本报告基于 2026-09-04 至 2026-09-05 的 GitHub 公开数据自动汇总，观点仅供参考。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期：2026-09-05 | 数据来源：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)**

---

## 一、今日速览

今日无新版本发布，社区动态以维护性工作为主：6 个创建于 2026-03-03 的存量 Issue 在昨日（09-04）被批量关闭，涉及 Hooks 系统、MCP 超时崩溃、Skills 管理等热门话题，疑似进行了一轮仓库 Issues 集中清理。新增 1 个 Windows 终端快捷键失效的 Bug 报告（#2634），另有 1 个针对文件编辑工具计数逻辑的修复 PR 持续推进。

---

## 二、版本发布

过去 24 小时无新 Release。（按惯例省略本节）

---

## 三、社区热点 Issues

*今日共 7 条 Issue 更新（不足 10 条，全部收录）：*

| # | 状态 | 标题 | 关注理由 |
|---|------|------|----------|
| 1 | 🆕 OPEN | [#2634 终端改键位不成功（如粘贴）](https://github.com/MoonshotAI/kimi-cli/issues/2634) | **今日唯一新增 Issue**。用户报告在 Windows Terminal + PowerShell 环境下 Ctrl+V 粘贴失效，且终端侧改键不生效，直指 Windows 交互体验短板。尚无官方回复。 |
| 2 | ✅ CLOSED | [#1313 Hooks 系统（通知与生命周期事件）](https://github.com/MoonshotAI/kimi-cli/issues/1313) | **本期最高热度（3 👍）**。请求增加类似 Claude Code 的 Hooks 机制，在长任务完成或需人工介入时通知用户。现已关闭，若已落地将是重要的能力补齐，建议关注后续 Changelog 确认。 |
| 3 | ✅ CLOSED | [#1316 MCP 超时导致 kimi-cli 整体不可用](https://github.com/MoonshotAI/kimi-cli/issues/1316) | 高严重性 Bug：单个 MCP 连接失败即中断整个 CLI 会话。反映故障隔离机制缺失，是 MCP 生态可用性的核心痛点。 |
| 4 | ✅ CLOSED | [#1319 本地 Skills 操作管理方法](https://github.com/MoonshotAI/kimi-cli/issues/1319) | 请求提供 `skills list / skills rm` 等管理命令，统一 Skills 存储目录，解决自定义 Skill 无法查看版本、触发词和删除的问题。 |
| 5 | ✅ CLOSED | [#1320 多行输入的智能方向键导航](https://github.com/MoonshotAI/kimi-cli/issues/1320) | 经典终端 UX 问题：光标位于多行文本中间时，上/下方向键仍触发历史命令切换而非移动光标，影响长 Prompt 编辑体验。 |
| 6 | ✅ CLOSED | [#1315 按 ESC 后 Subagent 仍在运行](https://github.com/MoonshotAI/kimi-cli/issues/1315) | 进程控制 Bug：中断操作（ESC）无法终止已派发的 Subagent 任务，涉及资源浪费与状态不一致风险。 |
| 7 | ✅ CLOSED | [#290 OpenRouter 自定义模型返回 401](https://github.com/MoonshotAI/kimi-cli/issues/290) | 存续近 10 个月的老 Issue（2025-11 创建），使用 OpenRouter + 第三方模型（gpt-5.1-codex）时认证失败，反映第三方平台兼容性长期诉求。 |

> 📌 **观察**：#1313–#1320 均创建于 2026-03-03、同日（09-04）被关闭更新，呈明显批量操作特征，更可能是仓库维护性清理而非集中修复。相关功能是否已解决，建议以官方说明为准。

---

## 四、重要 PR 进展

*今日仅 1 条 PR 更新：*

- **[#2524 fix(tools): count StrReplaceFile replacements against the running content](https://github.com/MoonshotAI/kimi-cli/pull/2524)**（OPEN，07-20 创建，09-04 更新）
  - 关联 Issue #2526。修复 `StrReplaceFile` 工具的替换计数逻辑：原实现对*原始文件内容*计数，导致链式编辑（前一次编辑产出的字符串作为后续编辑目标）被漏计。修复后改为基于*运行中的内容*（sequential edits 后的状态）计数，提升了工具执行反馈的准确性。属于 Agent 工具链正确性修复，值得 Review 关注。

---

## 五、功能需求趋势

从近期 Issues 提炼出社区最关注的方向：

1. **终端交互体验（高频）**：快捷键自定义、粘贴、多行编辑导航（#2634、#1320）——Windows 环境尤为突出
2. **事件与自动化机制**：Hooks 系统、生命周期通知（#1313），对标 Claude Code 的成熟特性
3. **Skills 生命周期管理**：安装/查看/删除/版本管理命令化（#1319）
4. **MCP 稳定性与容错**：连接失败不应拖垮主进程（#1316）
5. **第三方平台与模型兼容**：OpenRouter 等自定义接入的认证与稳定性（#290）

---

## 六、开发者关注点

- **Windows 一等公民支持不足**：终端快捷键、粘贴、PowerShell 兼容问题反复出现，是当前最直接的日常使用痛点
- **故障隔离缺失**：单个 MCP 服务异常导致整个会话中断，用户期望优雅降级而非崩溃
- **Agent 进程可控性**：ESC 无法终止 Subagent，中断语义需要更严格的全链路生效
- **长任务注意力管理**：Hooks 需求背后是"挂机跑任务、完成即通知"的核心工作流诉求
- **可观测性与反馈准确性**：PR #2524 类似的工具执行计数/报告精度问题，影响 Agent 自我修正能力

---

*本日报基于过去 24 小时 GitHub 公开数据自动整理，观点仅供参考。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报

**日期：2026-09-05** | 数据来源：[github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 一、今日速览

OpenCode 发布 **v1.18.28**，核心改进为 Copilot 请求追踪，但发布当天即有用户报告新版本引入**远程 MCP 连接回归**（#47368）。资源占用问题持续发酵——内存泄漏大合集帖评论已达 139 条，CPU 占用激增和 SQLite 数据库膨胀（13GB+）成为长时运行用户的三大痛点。此外，**Go 订阅计费问题今日集中爆发**，多个中英文 Issue 反映额度消耗与实际使用不符。

---

## 二、版本发布

### v1.18.28 ([Release Notes](https://github.com/anomalyco/opencode/releases))

**Core 改进：**
- 将 session ID 作为 GitHub Copilot 交互头发送，提升会话级请求追踪能力

**Desktop 修复：**
- OpenCode 账号设备认证流程改用桌面客户端 ID
- 增大 "open-in app" 图标尺寸，提升可见性

> ⚠️ 注意：发布当日已有用户报告 v1.18.28 导致远程 MCP（KitWright/Unity）无法连接，详见下文 #47368。

---

## 三、社区热点 Issues

### 1. 内存问题大合集（官方集中处理）
**#20695** | 👍 108 | 💬 139 | [链接](https://github.com/anomalyco/opencode/issues/20695)

官方开辟的内存问题集中治理帖，维护者 @thdxr 明确要求用户**提交堆快照而非 LLM 生成的解决方案**。作为评论数最高的 Issue，内存泄漏已是当前社区最集中的质量痛点。

### 2. OpenAI 兼容端点自动发现模型
**#6231** | 👍 228 | 💬 52 | [链接](https://github.com/anomalyco/opencode/issues/6231)

**全站最高 👍 的功能请求**。LM Studio / Ollama / llama.cpp 等本地用户目前需在 `opencode.json` 中手动维护模型列表，本地模型频繁变更时极易出错。呼声极高但悬置已久。

### 3. 新版本 CPU 占用激增
**#30086** | 👍 26 | 💬 50 | [链接](https://github.com/anomalyco/opencode/issues/30086)

用户报告近期更新后 CPU 占用剧增：过去可同时运行 10+ 会话，如今 3 个会话即导致鼠标卡顿。性能回退与内存问题叠加，反映资源开销问题正在恶化。

### 4. `event` 表无限增长，数据库膨胀至 13GB+
**#33356** | 💬 27 | [链接](https://github.com/anomalyco/opencode/issues/33356)

事件溯源架构下 `opencode.db` 的 `event` 表（主要是 `message.updated.1` 快照）无保留策略、无压缩机制，长时运行实例膨胀至 13GB，撑爆 22GB 磁盘至 97–99%。属于 V2 架构级设计缺陷。

### 5. v1.18.28 远程 MCP 回归
**#47368** | 💬 2 | 今日新建 | [链接](https://github.com/anomalyco/opencode/issues/47368)

从 1.18.27 升级到 1.18.28 后，原本正常工作的 KitWright/Unity 远程 MCP 桥接（`127.0.0.1:9155`）无法连接。**当日发布、当日报告回归**，Windows Desktop 用户升级需谨慎。

### 6. Go 订阅计费与实际扣费不符
**#39822** | 💬 4 | [链接](https://github.com/anomalyco/opencode/issues/39822)

用户实际 API 消耗约 $0.35，却已扣掉 $12/5小时 额

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报

**日期**: 2026-09-05 | **数据来源**: [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

---

## 一、今日速览

今日无新版本发布，社区重心集中在 **OpenTUI 渲染层迁移**（#8662，累计 30 条评论，为近期最热议题）与 **CI/测试基础设施性能优化** 上。安全方面动态密集：DingTalk 凭证泄露（#10936）已修复关闭，但依赖 CVE 审计（#10850）与 Bash 白名单绕过（#10197）两个 P1 安全问题仍待处理。功能侧最大亮点是 PR #11003 落地了**通过 ACP 将子代理任务委托给外部 Agent（首发支持 Claude Code）**的跨 Agent 互操作能力。

---

## 二、版本发布

过去 24 小时无新 Release。（社区已发出请求 #11022，希望发布包含托管内存与 prompt cache 修复的新版 `@qwen-code/sdk`）

---

## 三、社区热点 Issues

### 1. 🔥 TUI 渲染层从 ink 迁移至 OpenTUI（追踪 Issue）
[#8662](https://github.com/QwenLM/qwen-code/issues/8662) | P3 | 30 评论（今日最热）

现行 TUI 基于 ink 7 + React 19，携带约 1037 行的补丁文件（`patches/ink+7.0.3.patch`）及自定义虚拟视口（VP）模式，导致闪烁、渲染异常等难以在 ink 框架内根治的结构性问题。该追踪 Issue 汇总了迁移方案与分批 parity 计划，是理解 qwen-code 终端架构演进方向的核心入口。

### 2. CI 测试耗时瓶颈在模块导入而非调度
[#10908](https://github.com/QwenLM/qwen-code/issues/10908) | P2 | 8 评论

一次 Release 构建中 `cli` workspace 的模块收集耗时 **2223s**，远超实际断言执行的 1372s；`core` 为 546s vs 251s。结论是测试时间被 import 成本绑架，纯靠并行分片无法解决。对应修复见 PR #10917（见下文），对贡献者的本地测试体验影响直接。

### 3. Cerebras 多轮请求全部 400 失败
[#11045](https://github.com/QwenLM/qwen-code/issues/11045) | P1

通过 OpenAI 兼容协议接入 Cerebras 托管模型时，首轮正常，**后续每一轮都报 `400 status code (no body)`**——原因是历史消息中携带的 `reasoning_content` 字段被 Cerebras 拒收。这暴露了第三方推理网关对推理链字段的兼容性差异，是 P1 级可用性问题。

### 4. DingTalk 渠道明文打印 clientSecret（已修复）
[#10936](https://github.com/QwenLM/qwen-code/issues/10936) | P1 | ✅ 已关闭

`qwen channel start` 启动 DingTalk 渠道时，每次连接都会将含 `clientId`/`clientSecret` 的完整 SDK 配置对象及 stream ticket 以明文打到 stdout。已随修复关闭，但建议相关用户检查历史日志泄露风险。

### 5. 依赖 CVE 审计仓库级失败
[#10850](https://github.com/QwenLM/qwen-code/issues/10850) | P1

`npm audit --omit=dev` 在 main 分支报 **4 个漏洞（1 low / 2 moderate / 1 high）**，涉及 `fast-uri`/`qs`/`uuid` 新公告，CI 审计任务全仓受阻，等待 lockfile 升级。

### 6. 静态 loader 环境变量赋值可绕过 Bash 白名单
[#10197](https://github.com/QwenLM/qwen-code/issues/10197) | P1 | 安全

Qwen 在匹配 `Bash(...)` 白名单规则前会剥离行首环境变量赋值，但某些赋值会改变被授权程序的运行时语义并触发额外代码执行（无需命令替换或反引号）。属于沙箱逃逸类问题，状态 ready-for-human。

### 7. AUTO 模式下用户确认永远到不了分类器
[#11019](https://github.com/QwenLM/qwen-code/issues/11019) | P2

生产事故场景：API 宿主中 Agent 通过 `ask_user_question` 请求确认数据变更，用户**连续三次确认均无效**，工具调用仍被拦截；且会话重建后审批模式回退为 AUTO。对自动化管道用户是阻断性问题。

### 8. 语音听写无法使用 Token Plan ASR
[#10932](https://github.com/QwenLM/qwen-code/issues/10932) | P2 | ready-for-human

Model Studio 的 Token Plan 以新模型族 ID `qwen-audio-3.0-asr-flash` 提供 ASR，但语音管线硬编码旧 ID 白名单，导致 `resolveVoiceTransport` 直接拒绝。麦克风采集正常，纯粹是模型 ID 准入问题，修复成本低。

### 9. macOS + tmux 下 IME 输入导致光标错位/乱码
[#8177](https://github.com/QwenLM/qwen-code/issues/8177) | P2 | 4 评论

中文输入时拼音片段（如 `shu'ru`）混入已输入文字、光标残影、候选窗与终端文本重叠。长期困扰中文用户的渲染顽疾，与 OpenTUI 迁移（#8662）的动机高度相关。

### 10. `/export html` 每个 HTML 文件都内嵌完整 Web Shell 运行时
[#11031](https://github.com/QwenLM/qwen-code/issues/11031) | P1

当前导出架构将 `WebShellTranscript` 可达的整个浏览器依赖图复制进每个导出文件——**空会话导出也有约 19.5 MB**。需要重构为共享运行时引用。

> **其他值得关注**: 内部脚手架标签泄露到用户可见输出 [#10797](https://github.com/QwenLM/qwen-code/issues/10797)；子代理委托期间 Todo 计划冻结 55 分钟 [#10953](https://github.com/QwenLM/qwen-code/issues/10953)；无工作区的独立会话需求 [#8908](https://github.com/QwenLM/qwen-code/issues/8908)；仓库累计 issue/PR 突破 **10000** 里程碑 🎉 [#11023](https://github.com/QwenLM/qwen-code/issues/11023)。

---

## 四、重要 PR 进展

### 1. 子代理可通过 ACP 委托给外部 Agent（首发 Claude Code）
[#11003](https://github.com/QwenLM/qwen-code/pull/11003)

子代理定义可声明 `executor` 块指定外部命令，该轮对话改由外部编码 Agent 通过 ACP 驱动，过程以相同形态回放。这是**跨 Agent 互操作**的里程碑式能力，意味着 qwen-code 可编排 Claude Code 等外部执行器。

### 2. 将浏览器授权的本地目录桥接进会话
[#10962](https://github.com/QwenLM/qwen-code/pull/10962)

当 daemon 运行在云主机/容器时，浏览器端用户可将自己机器上的某个目录"交给"Agent 访问——解决远程部署场景下 Agent 只能看到 daemon 所在文件系统的限制。

### 3. 后台会话的可视化与交互控制
[#10949](https://github.com/QwenLM/qwen-code/pull/10949)

新增 `qwen sessions peek / answer / stop` 三个子命令，可查看后台 Agent View 会话正在做什么、回答其提问、随时叫停。

### 4. `qwen sessions ps` 列出托管 Agent View 会话
[#10942](https://github.com/QwenLM/qwen-code/pull/10942)

原命令只遍历存活进程注册表，无法描述 Agent View supervisor 维护的 richer 生命周期状态，本 PR 补齐该盲区。

### 5. 测试运行器支持按模块解析 core（CI 提速）
[#10917](https://github.com/QwenLM/qwen-code/pull/10917)

针对 #10908 的修复：cli 测试运行器学会解析单个 core 模块，并将两个文件从 core 包根迁出作为端到端验证。

### 6. 全部 workspace 统一共享池测试超时
[#10915](https://github.com/QwenLM/qwen-code/pull/10915)

15 个仍在使用 vitest 默认 5000ms 超时的 workspace 提升至共享 ECS 池标准，并通过 parity sweep 防止新 workspace 静默回落默认值。

### 7. OpenTUI 启动期输入丢失修复
[#11046](https://github.com/QwenLM/qwen-code/pull/11046)

会话启动最初几秒在 OpenTUI 渲染器输入的 prompt 会被静默丢弃（`Chat not initialized`）。本 PR 让 turn 等待 startup chat 完成后再发送。

### 8. 渠道级会话轮换 `sessionRotation`
[#8927](https://github.com/QwenLM/qwen-code/pull/8927)

长跑 PR，新增按 `maxTurns`/时间上限约束路由复用同一会话的时长，超限后下一条消息自动开新会话。

### 9. DingTalk 后台 Agent 聚合改为可选
[#10899](https://github.com/QwenLM/qwen-code/pull/10899)

默认改为每个非空响应段即时送达，且消息头标注 `Agent · <name>` 保证并发可归因；偏好单条汇总的用户可手动开启。

### 10. Rewind 映射锚定稳定 prompt 身份
[#9466](https://github.com/QwenLM/qwen-code/pull/9466)

重写回溯映射逻辑：从按位置序号改为按持久化 prompt 身份解析，使 resume（含 headless `-p --resume`）等会重排 turn 的场景下 rewind 依然准确。

---

## 五、功能需求趋势

| 方向 | 代表 Issue | 信号强度 |
|---|---|---|
| **终端渲染架构重构** | #8662 OpenTUI 迁移、#8177 IME 问题 | ★★★ 讨论量断层第一，多笔配套修复 PR 持续落地 |
| **会话/后台任务管理** | #8908 独立会话、#11017 Quick Chat、#11024 worktree 生命周期 | ★★★ CLI/daemon/Web Shell 三端联动，PR 密集 |
| **跨 Agent 互操作（ACP）** | #11003 外部 Agent 委托、#11013 对标 Claude Code Dynamic Workflows | ★★★ 明显以 Claude Code 为对标坐标系 |
| **第三方 Provider 兼容** | #11045 Cerebras、#9746

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*