# AI CLI 工具社区动态日报 2026-11-21

> 生成时间: 2026-11-21 01:29 UTC | 覆盖工具: 7 个

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
**数据日期：2026-11-21**

---

## 1. 生态全景

AI CLI 工具已从单一编码助手演进为**多端（CLI/Desktop/Web/Mobile）、多 Agent（子代理、远程控制、沙箱执行）的企业级开发平台**。头部玩家（Claude Code、Codex、Copilot CLI）竞相投入企业组织管理、远程会话控制与安全沙箱能力，而快速追赶者（Gemini CLI、OpenCode、Qwen Code）则在子代理可靠性、上下文工程和 CI 治理上密集补课。**安全与稳定性成为新的竞争焦点**——数据损毁事故、权限静默失效、快照吞盘等问题的集中爆发，标志着行业正从“功能竞赛”转入“信任建设”阶段。同时，发布节奏普遍加快（Codex 一日四发 alpha、Qwen/Copilot 双版本），快速迭代与质量保障的张力在各社区同步显现。

---

## 2. 各工具活跃度对比

| 工具 | Issue 活跃度（今日） | PR 活跃度（今日） | Release | 迭代阶段 |
|---|---|---|---|---|
| **Claude Code** | 高（约 10+ 热点，含 4 个月未解老 issue） | 极低（仅 1 个 PR，已关闭） | v2.1.330 稳定版 | 稳定迭代 + 企业化 |
| **OpenAI Codex** | 高（崩溃簇 50+ 评论级 issue 多条） | 高（10+ PR 合入，网络/OAuth/MCP 基础设施） | 4 个 alpha（0.173.0） | 快速预发验证 |
| **Gemini CLI** | 高（子代理议题主导，P1 多条） | 高（7 合并 + 3 open，社区贡献活跃） | nightly v0.71.0 | 每日 nightly 快迭代 |
| **Copilot CLI** | 中高（44 条更新，安全事故引爆讨论） | 0 | 2 个修复/功能版（v1.0.115-2/3） | 稳定通道小幅快跑 |
| **OpenCode** | 高（权限/快照安全事件） | 高（10+ PR，含架构级沙箱落地） | 无（promotion PR 推进中） | 大版本蓄势期 |
| **Qwen Code** | 极高（47 条更新，CI 议题评论量 506/100） | 极高（50 条更新，维护者双实现并行） | preview.1 + nightly | 架构收敛冲刺期 |
| **Kimi Code CLI** | 无活动 | 无活动 | — | 生态静默期 |

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **远程控制 / 多端会话稳定性** | Claude Code（#95364 静默更新丢会话）、Codex（Remote 超时、跨端幽灵会话）、Copilot CLI（#5468 Mobile/Web 控制失败） | 远程会话不丢、relay 握手可靠，已是三方共同的最脆弱链路 |
| **子代理（Subagent）可靠性** | Gemini CLI（误报成功、挂起、不被自主调用）、OpenCode（#64073 前台 subagent 恢复）、Claude Code（sub-agent token 异常/文档缺失） | 子代理的执行可信度、可观测性、自主调用率是跨工具的第一痛点 |
| **上下文 / Token 管理与成本** | Claude Code（auto-compact 时机 #92434）、Qwen Code（compaction 重复计数 #15486，P1）、Gemini CLI（精准抽取降低 36.6k token 基线）、Copilot CLI（prompt cache TTL #5220，17 👍） | compaction 时机、token 估算准确性、缓存成本四家齐碰 |
| **沙箱与安全边界** | Copilot CLI（rsync --delete 清盘事故 + Windows 沙箱增强）、OpenCode（沙箱架构 PR + 权限规则静默失效）、Gemini CLI（OS 级零依赖沙箱提案 #19873）、Codex（Windows 沙箱 owner 恢复） | 从“权限提示”走向“系统级隔离”，安全成为军备竞赛 |
| **MCP 生态成熟度** | Copilot CLI（OAuth 静默刷新等 5 条，问题密度最高）、Codex（MCP 预热 PR）、OpenCode（SEP-3415 Events 推送）、Gemini CLI（128 工具上限 #24246） | 认证、协议兼容、大规模工具管理仍是 MCP 落地摩擦点 |
| **Windows 平台质量** | Codex（55 GB 内存泄漏）、OpenCode（shell 空输出、cmd 引号转义）、Gemini CLI（路径展开）、Copilot CLI（winget 更新破坏）、Qwen Code（argv 32767 限制） | Windows 是全行业公认的薄弱平台 |
| **会话可恢复性** | Copilot CLI（lock 文件阻塞 #4805）、Gemini CLI（--resume 语义修复）、Qwen Code（daemon SIGKILL 后恢复） | 崩溃后会话/锁状态不残留是共性可靠性要求 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 企业组织管理（Admin Console 配置下发）、Desktop/Remote Control、内置工具（easel 图表） | 企业团队 + 深度 Anthropic 生态用户 | 闭源 issue 跟踪为主，代码贡献内部化；配置项文档化滞后 |
| **OpenAI Codex** | 多端桌面（Computer Use、iOS）、WebRTC/Cloud stream、OAuth 启动协议 | ChatGPT 订阅生态的跨端用户 | Rust CLI 快速 alpha + 桌面端高频回归，基础设施 PR 密集 |
| **Gemini CLI** | 子代理体系、AST 感知工具调研、遥测/eval 内建 | 开发者社区 + Android/Termux 等长尾平台 | 开源社区驱动最纯（help wanted PR 活跃），nightly 每日发布 |
| **Copilot CLI** | 沙箱细粒度策略、Agent Plugins 1.0、ACP 协议、企业 EDR 兼容 | GitHub 原生用户、企业组织 | 稳定通道小步快跑，深度绑定 GitHub/ winget 生态 |
| **OpenCode** | Agent 沙箱架构、MCP Events（SEP）、Agent Widgets（可交互组件） | 追求可扩展性的 power user / 插件开发者 | 开源 + 中继/多 Provider 兼容（含 Anthropic 兼容层），实验性强 |
| **Qwen Code** | Managed Agent 架构、IM 渠道集成（QQ/Teams/DingTalk）、Web Shell/触屏 | 中文生态用户 + IM 驱动工作流 | 重工程治理（CI gate、CVE 审计），多渠道分发路线独特 |
| **Kimi Code CLI** | — | — | 今日无动态，处于观察期 |

---

## 5. 社区热度与成熟度

**热度梯队**：
- **第一梯队**：Qwen Code（47 issue + 50 PR 更新）、Codex / Gemini CLI / OpenCode / Claude Code（高 issue 互动）
- **第二梯队**：Copilot CLI（中高，PR 沉寂）
- **静默**：Kimi Code CLI

**成熟度画像**：
- **成熟稳定型**：Claude Code（稳定版发布、企业功能上线，但 4 个月未解的认证 issue 与文档缺口暴露支持流程短板）、Copilot CLI（稳定通道 + 沙箱策略精细化）
- **快速迭代型**：Codex（一日四 alpha，桌面端回归频发——速度与质量的张力最尖锐）、Gemini CLI（nightly 节奏，但社区贡献治理最好）
- **冲刺重构型**：Qwen Code（Managed Agent 大重构 + CI 治理，评论量 506 的 CI 追踪 issue 说明工程债仍在偿还）、OpenCode（版本蓄势 + 架构级 PR 落地，前瞻性强但磁盘/权限安全事故需警惕）

---

## 6. 值得关注的趋势信号

1. **“Agent 安全”从口号变成事故驱动议题**：Copilot CLI 的 rsync 清盘、OpenCode 的 90 GB 快照与权限静默失效、Codex 的屏幕捕获权限未释放，三起同日事件表明**沙箱化（OS 级隔离）是必然方向**——Gemini CLI 的零依赖沙箱提案和 OpenCode/Copilot 的沙箱 PR 值得技术选型时重点评估。

2. **Remote Control 成为下一个兵家必争之地**：Claude Code、Codex、Copilot CLI 三家同时在此链路翻车，说明“移动端/Web 远程接管本地 Agent 会话”已被视为核心场景，但基础设施尚不成熟——生产环境采用需谨慎，建议关注会话持久化机制而非仅看功能宣传。

3. **子代理可信度是 Agent 编排的瓶颈**：误报成功、挂起、不被调用三大问题在 Gemini CLI/OpenCode 同时出现。若团队依赖多 Agent 架构，需自建结果校验层，不能盲信子代理的成功报告。

4. **上下文估算准确性直接影响成本**：四家工具均有 compaction/token 估算 bug，重度用户应监控实际 token 消耗，勿过度信任工具侧的上下文管理。

5. **对闭源生态依赖未文档化特性存在升级风险**：Claude Code 的 `CLAUDE_SECURESTORAGE_CONFIG_DIR` 案例提示，依赖私有配置项的周边工具在版本升级时可能被动损坏。

6. **Windows 是全行业短板**，Windows 优先的团队建议优先考察 Gemini CLI nightly（修复最勤）或暂缓采用问题密集的工具；**IM 渠道集成（Qwen Code 的 QQ/Teams/DingTalk）** 则预示 AI CLI 正从开发者终端走向更广泛的组织工作流。

---

**一句话建议**：企业选型看 Claude Code/Copilot CLI 的组织管理与沙箱策略；追求可控性与社区治理看 Gemini CLI；关注前沿架构（MCP Events、Agent Widgets、沙箱）看 OpenCode；中文/IM 生态看 Qwen Code；Codex 当前 macOS 桌面端为高危状态（启动崩溃），建议暂缓升级。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据来源：anthropics/skills | 截止 2026-11-21**

⚠️ **数据说明**：本期 PR 数据中评论数与点赞数均为 undefined，无法按互动量严格排序；以下排行基于 PR 内容质量、存活时长（长期保持 OPEN 且持续更新）及关联 Issue 讨论热度综合评估。

---

## 一、热门 Skills 排行（按综合关注度）

| # | Skill / PR | 功能 | 讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | [skill-creator 触发评估修复 #1298](https://github.com/anthropics/skills/pull/1298) | 修复触发评估的误报、Windows 兼容与运行时故障处理 | 关联多个高热 Issue（#556、#1352）：并行 worker 竞争导致触发率恒为 0%，是 skill-creator 最核心的可靠性问题 | OPEN（持续更新至 9 月） |
| 2 | [mcp-builder 兼容 MCP≥2 #1742](https://github.com/anthropics/skills/pull/1742) | 适配 `streamable_http_client` 重命名及自定义 header 新方式 | MCP 2.0 破坏性变更导致现有连接脚本失效，#1668 报告的官方阻塞问题 | OPEN |
| 3 | [webapp-testing 安全修复 #1980](https://github.com/anthropics/skills/pull/1980) | 移除 `shell=True`，消除命令注入风险（CWE-78） | 安全类修复，与 #492 的生态信任问题同属社区安全关切 | OPEN |
| 4 | [Notion 规格转实现 + 简历审计双 Skill #1245](https://github.com/anthropics/skills/pull/1245) | 将产品/技术 Spec 拆解为可执行 Notion 任务；量化简历审计 | 工作流自动化方向的代表性贡献，存活周期长（6 月至今仍活跃） | OPEN |
| 5 | [docx 修订追踪修复 #1792](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时正确报错并验证修订标记清除 | docx 是文档类 Skill 中 Bug 报告最密集的模块（另见 #2018） | OPEN |
| 6 | [pyxel 复古游戏开发 #525](https://github.com/anthropics/skills/pull/525) | Python 复古游戏创建、无头运行验证 | 作者为 Pyxel 作者本人（kitao），官方级维护背书 | OPEN（存活 8 个月） |
| 7 | [md2video-audio #1703](https://github.com/anthropics/skills/pull/1703) | Markdown → 带真人配音的 MP4 视频（零成本） | 内容创作自动化的典型需求 | OPEN |
| 8 | [scnet-hpc #1615](https://github.com/anthropics/skills/pull/1615) | SSH + Slurm 的 HPC 集群操作 | 科研计算场景，垂直领域 Skill 代表 | OPEN |

---

## 二、社区需求趋势（来自 Issues）

1. **生态安全与信任机制**（最热，46 评论）：[#492](https://github.com/anthropics/skills/issues/492) 社区 Skill 冒用 `anthropic/` 命名空间，呼吁签名验证与命名空间隔离。
2. **组织级 Skill 分发**：[#228](https://github.com/anthropics/skills/issues/228) 呼吁组织内共享 Skill 库，替代手动传文件。
3. **Skill 触发可靠性工具链**：[#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352) 评测脚本系统性误差，反映「Skill 质量工程」成为刚需。
4. **上下文效率**：[#1487](https://github.com/anthropics/skills/issues/1487) claude-api Skill 单次注入 156k token，#1329 提议 compact-memory 符号化记忆——轻量化 Skill 是强需求。
5. **AI 输出质量管控**：[#1385](https://github.com/anthropics/skills/issues/1385) 提出「校准→对抗审查→交付验证」三重质量门提案；[#514](https://github.com/anthropics/skills/pull/514) 文档排版质量控制同属此类。
6. **垂直领域扩展**：Web3 合约审计（#1771）、HPC（#1615）、游戏开发（#525）显示社区向专业场景渗透。

---

## 三、高潜力待合并 Skills

- **#1298 skill-creator 评估修复**：修复社区最痛的评测可靠性问题，关联多个高热 Issue，合并价值最高。
- **#1742 mcp-builder MCP≥2 适配**：修复官方 Issue #1668，阻塞用户连接，优先级高。
- **#2019 xlsx 外部链接检测修复**：修复 #2013，近期（11-03）仍在活跃更新，接近落地。
- **#1997 skill-creator YAML 解析修复**：小而关键的元数据解析正确性修复，合并阻力小。
- **#525 pyxel**：作者本人维护，长期存活且持续响应，社区背书强。
- **#1681 package_skill.py 独立执行修复**：11-19 仍有更新，活跃度最高的 PR 之一。

---

## 四、生态洞察

**社区最集中的诉求是：建立 Skills 生态的信任与可靠性基础——从命名空间安全（#492）、触发评测准确（#556/#1352）到上下文轻量化（#1487），社区正推动 Skills 从「功能堆叠」走向「工程化质检」。**

---

# Claude Code 社区动态日报 · 2026-11-21

## 1. 今日速览

Claude Code 发布 **v2.1.330**，重点增强了企业级能力：支持通过 Anthropic Enterprise Admin Console 登录组织并自动应用组织配置，同时新增内置图表工具 easel。社区方面，认证登录、Desktop 静默更新中断 Remote Control 会话、终端回滚重复等老牌问题持续发酵，安全过滤器误报问题（embedded/固件开发场景）在今日被批量关闭。

## 2. 版本发布

**v2.1.330**（过去24小时）
- **企业组织登录**：`claude auth login` 后自动应用 Enterprise Admin Console 管理的组织设置，并使用组织的云提供商或网关
- **新增 easel 内置 mod**：可按需绘制图表，并在 MCP metrics 中展示

## 3. 社区热点 Issues

1. **[#79808](https://github.com/anthropics/claude-code/issues/79808)** [bug/auth] 无法登录：验证邮件被拦截且支持机器人无升级通道。31 条评论、开放 4 个月未解，反映认证支持流程存在盲区。

2. **[#51828](https://github.com/anthropics/claude-code/issues/51828)** [regression/tui] VS Code 集成终端 + macOS 下终端 resize 时回滚区重复内容，自 2.1.116 起持续存在。38 👍、31 评论，是呼声最高的 TUI 回归问题。

3. **[#89690](https://github.com/anthropics/claude-code/issues/89690)** [has repro] `opusplan` 被模型选择器视为已覆盖但实际不显示，导致无法选择 Opus Plan Mode。23 条评论，涉及模型选择器与“模式”模型的语义混淆。

4. **[#95364](https://github.com/anthropics/claude-code/issues/95364)** [desktop] Desktop “静默更新”在用户离开时退出并重启应用，**丢弃所有 Remote Control 会话**。24 👍、22 评论，Remote Control 稳定性是近期高频痛点。

5. **[#85654](https://github.com/anthropics/claude-code/issues/85654)** [regression/tui] 折叠粘贴块内的斜杠命令不会被分发，而是被当作普通消息提交。

6. **[#92434](https://github.com/anthropics/claude-code/issues/92434)** [core] Auto-compact 依据上一轮 token 数决策，导致重注入的指令文件直接撑爆上下文窗口而非触发压缩。

7. **[#102045](https://github.com/anthropics/claude-code/issues/102045)** [web/memory] Web 版在同一会话链接下不保留项目决策，跨会话记忆仍是社区核心诉求。

8. **[#111275](https://github.com/anthropics/claude-code/issues/111275)** [integrations/macOS] Microsoft 365 Office 插件安装后数秒内消失，疑似与 Claude Desktop/Cowrow Office 会话冲突有关（关联 #61756）。昨日新报，值得关注。

9. **[#79223](https://github.com/anthropics/claude-code/issues/79223)** [docs] 请求文档化 `CLAUDE_SECURESTORAGE_CONFIG_DIR`——生态工具广泛使用却无官方文档，另见 [#100347](https://github.com/anthropics/claude-code/issues/100347)（sub-agents 文档缺失 effort 参数说明）。

10. **[#94161–#94167](https://github.com/anthropics/claude-code/issues/94162)** [cyber] 同一用户（@sworrl）报告的 7 个安全过滤器误报 issue 今日被**批量关闭**（多为 duplicate）。嵌入式固件调试被 Opus 4.8 拦截导致 session 中断的案例，其处置方式（关闭而非修复）值得跟踪。

## 4. 重要 PR 进展

过去 24 小时仅 1 个 PR 更新：

- **[#111198](https://github.com/anthropics/claude-code/pull/111198)** [CLOSED] 由 @mhegazy 提交：来自 fork 的 PR 不再触发 `@claude` mention。该 PR 今日被关闭，fork 场景下 @claude 自动化触发的边界问题仍待官方另行处理。

*（今日无其他 PR 活动，仓库以 issue 跟踪为主，代码贡献流向内部渠道。）*

## 5. 功能需求趋势

- **企业与组织管理**：v2.1.330 的组织登录正是回应企业用户需求，配套的组织策略配置（如 [#101895](https://github.com/anthropics/claude-code/issues/101895) 的站点白名单策略误报）仍待打磨
- **Remote Control / 远程会话稳定性**：多个高热度 issue（#95364、#109419）集中在远程控制掉线、会话丢失
- **跨会话记忆与上下文管理**：auto-compact 时机（#92434）、Web 版决策保留（#102045）是持续诉求
- **Desktop 功能对齐**：请求在 Desktop Code 标签页支持实验性 Code Mode（[#110673](https://github.com/anthropics/claude-code/issues/110673)）
- **文档完善**：环境变量、sub-agents 参数等配置项文档缺口被密集报告
- **嵌入式/固件开发场景**：安全过滤器误报阻碍合法调试工作流

## 6. 开发者关注点

- **认证流程可靠性**：登录问题长期悬置且无人工升级通道（#79808），企业迁移至组织登录后行为变化需留意
- **Remote Control 是远程工作流刚需**：静默更新和 Windows 上的自动关闭都在破坏这一场景，建议关注版本更新时机
- **上下文成本控制**：auto-compact 判定滞后与 sub-agent token 消耗异常（#94310）直接影响使用成本
- **高级配置依赖未文档化特性**：`CLAUDE_SECURESTORAGE_CONFIG_DIR` 等变量虽被生态广泛使用，官方文档尚未覆盖，升级存在风险
- **安全过滤器边界**：嵌入式/固件开发者可能遭遇 session 被中断，官方目前的处置以关闭 duplicate 为主，未见明确改进路线

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 · 2026-11-21

## 📌 今日速览

Codex Rust CLI 密集发布 **0.173.0-alpha.1 ~ alpha.4** 四个预发布版本，迭代节奏极快。社区最突出的问题是 **macOS 桌面端 26.1117.31558 启动即崩溃**（NSUnknownKeyException），多条高热度 Issue 聚焦于此。PR 方面，团队合入大量网络配置、OAuth 启动协议、MCP 预热等基础设施改进。

---

## 🚀 版本发布

- **rust-v0.173.0-alpha.1 ~ alpha.4**：一天内连续发布 4 个 alpha 预发布，处于快速迭代验证阶段，未附详细 changelog。建议生产环境继续停留在稳定版渠道。

---

## 🔥 社区热点 Issues

1. **[#57101](https://github.com/openai/codex/issues/57101)** Windows Computer Use：截图回合结束后屏幕捕获权限与金色边框未释放（75 评论，13 👍）。涉及隐私与安全边界，是本周评论最多的 Issue。
2. **[#62650](https://github.com/openai/codex/issues/62650)** macOS 26.1117.31558 在壁纸 tint 回退路径下**启动即崩溃**，属启动阻断级回归（53 评论，16 👍），普通苹果自带壁纸即可触发。
3. **[#62683](https://github.com/openai/codex/issues/62683)** 同版本 `NSUnknownKeyException: valueForUndefinedKey: Desktop` 崩溃，与 [#62716](https://github.com/openai/codex/issues/62716)、[#62856](https://github.com/openai/codex/issues/62856) 共同指向同一回归簇，多用户确认。
4. **[#62472](https://github.com/openai/codex/issues/62472)** Codex Remote：WebSocket 连通但 initialize 30 秒超时，已关闭——远程控制链路问题可能已有修复。
5. **[#59432](https://github.com/openai/codex/issues/59432)** Pro 用户新建会话单次运行即达“最大对话长度”，配额/上下文计算疑似异常。
6. **[#20181](https://github.com/openai/codex/issues/20181)** Linear Agent SDK 无法拉起 cloud agent（"no available environments"），长期未解。
7. **[#62733](https://github.com/openai/codex/issues/62733)** Windows 26.1117 更新后蓝牙听写失效（clock=unavailable），新版本引入的功能回归。
8. **[#62234](https://github.com/openai/codex/issues/62234)** macOS 更新后面板设置丢失、终端强制移至右侧（11 👍），用户配置迁移问题。
9. **[#38877](https://github.com/openai/codex/issues/38877)** Windows 上 node.exe 虚拟内存膨胀至 ~55 GB 导致系统崩溃重启，严重资源泄漏报告。
10. **[#56642](https://github.com/openai/codex/issues/56642)** 云端归档会话无标题、无法取消归档且记录残留，中文用户提交的详细报告。

---

## 🔧 重要 PR 进展

1. **[#62882](https://github.com/openai/codex/pull/62882)** 跨网络配置层（`[permissions.network]` / `[network_proxy]` / `[experimental_network]`）组合托管域名规则。
2. **[#62867](https://github.com/openai/codex/pull/62867)** + [#62859](https://github.com/openai/codex/pull/62859)：app-server 启动阶段支持配置服务器 OAuth，定义启动 OAuth 协议。
3. **[#62876](https://github.com/openai/codex/pull/62876)** 云目录刷新期间预热 MCP 服务器，消除首轮对话的启动延迟。
4. **[#62870](https://github.com/openai/codex/pull/62870)** TUI WebRTC 调用改用 runtime agent 认证。
5. **[#62865](https://github.com/openai/codex/pull/62865)** Windows 沙箱 owner 恢复延迟至用户登录时执行，修复开机时 session/token 缺失问题。
6. **[#62863](https://github.com/openai/codex/pull/62863)** 请求头设置 `x-codex-exclude: tools`，减少 Responses API 回传的工具目录冗余。
7. **[#62858](https://github.com/openai/codex/pull/62858)** Agents overview 通过 Cloud stream 通知保持线程状态实时同步。
8. **[#62852](https://github.com/openai/codex/pull/62852)** Guardian 响应重采样限制为一次重试，防止回合无法结束。
9. **[#62857](https://github.com/openai/codex/pull/62857)** Default 模式的内置指令延迟至 Plan 模式之后再注入，减少冗余 prompt。
10. **[#62849](https://github.com/openai/codex/pull/62849)** / [#62840](https://github.com/openai/codex/pull/62840)：工具 schema 与 TUI Markdown 渲染的内存分配优化。

---

## 📈 功能需求趋势

- **会话/线程管理**：云端线程删除（#50618）、跨平台本地历史迁移（#47087）、归档修复（#56642）呼声集中。
- **远程与多端协同**：Codex Remote 连接超时、iOS 远程历史为空、跨设备幽灵会话等问题高频出现，远程链路是当前脆弱点。
- **外部事件集成**：异步事件（webhook、文件监听）注入可见会话的需求（#33556，7 👍）。
- **配额透明度**：Plus/Pro 用户对 5 小时配额快速耗尽、误导性状态显示的不满持续发酵。

---

## ⚠️ 开发者关注点

1. **macOS 26.1117 版本为高危更新**——多个独立报告确认启动崩溃，建议暂缓升级或准备回退方案。
2. **远程控制（Remote Control）链路不稳**：近 3 天内新增至少 3 条相关 Issue，影响 iOS/macOS/Windows 多端。
3. **Windows 端资源管理**：内存泄漏、UI 卡顿（#59614）、WSL 集成启动失败（#61546）持续未解。
4. **版本节奏观察**：CLI alpha 一日四发 + 桌面端回归频发，显示快速迭代与质量保障之间的张力，建议生产用户锁定稳定版本。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# 📰 Gemini CLI 社区动态日报（2026-11-21）

## 1. 今日速览

今日发布 **v0.71.0-nightly.20261121**，重点修复 Windows 路径与 会话恢复问题。社区讨论焦点高度集中在 **Subagent 子代理体系**上：从“子代理达到 MAX_TURNS 后误报成功”到“通用代理挂起”，子代理的可靠性、可观测性与自主调用率成为最突出的痛点。此外，多个涉及遥测、安全工作流和 YOLO 模式的社区 PR 于今日合并关闭。

## 2. 版本发布

**v0.71.0-nightly.20261121.geecccfcd5**
- 修复 Windows 下 `~\...` 反斜杠风格的 home 相对路径不被展开的问题（影响策略路径、扩展注册表、include 目录）([PR #30376](https://github.com/google-gemini/gemini-cli/pull/30376))
- `gemini --resume` 改为恢复**最近活跃**会话而非最近启动的会话 ([PR #30389](https://github.com/google-gemini/gemini-cli/pull/30389))

## 3. 社区热点 Issues

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 后误报 GOAL 成功 | **P1**。子代理被中断却报告成功，掩盖真实失败，13 条评论，直接影响任务可信度 |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) 通用代理挂起 | **P1**，8 👍。通用子代理连建文件夹都会永久挂起，用户等待一小时后被迫取消 |
| 3 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由 | **P2 大型增强**。让 Gemini 3 发挥原生 bash 能力的同时保障安全，方向性提案 |
| 4 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 不主动使用 skills 和子代理 | 核心体验问题：自定义 skill/subagent 几乎从不被自主调用，需显式指令 |
| 5 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知的文件读取/搜索/代码库映射 EPIC | 系统性调研 AST 工具（ast-grep、tilth、glyph）能否提升代理质量与 token 效率 |
| 6 | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 配置 | `maxTurns` 等覆盖配置完全失效，配置合并链路存在缺陷 |
| 7 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) browser subagent 在 Wayland 下失败 | **P1**。Linux Wayland 用户被浏览器子代理完全阻塞 |
| 8 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 超过 128 个工具触发 400 错误 | 大量 MCP/自定义工具场景下直接报错，工具作用域管理需更智能 |
| 9 | [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) get-shit-done output hook 导致崩溃 | **P1**。输出 hook 在打印总结时反复使 CLI 崩溃 |
| 10 | [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) 代理应阻止破坏性操作 | 安全诉求：模型偶尔使用 `git reset --force` 等危险命令，需要更安全的替代引导 |

**其他值得留意**：[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)（symlink 形式的 agent 不被识别）、[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)（/bug 报告缺少子代理上下文）、[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)（“精准抽取”降低每回合 36.6k token 基线）。

## 4. 重要 PR 进展

| # | PR | 内容 | 状态 |
|---|-----|------|------|
| 1 | [#30376](https://github.com/google-gemini/gemini-cli/pull/30376) | Windows `~\` 路径展开修复 | ✅ 已合并（进入今日 nightly） |
| 2 | [#30389](https://github.com/google-gemini/gemini-cli/pull/30389) | `--resume` 恢复最近活跃会话 | ✅ 已合并（进入今日 nightly） |
| 3 | [#30370](https://github.com/google-gemini/gemini-cli/pull/30370) | 修复 `dir/**` 通配模式下嵌套 `.gitignore` 否定规则失效 | ✅ 已合并 |
| 4 | [#29823](https://github.com/google-gemini/gemini-cli/pull/29823) | Android/Termux 回退系统 ripgrep，修复 `ENOENT` 崩溃 | ✅ 已合并 |
| 5 | [#30157](https://github.com/google-gemini/gemini-cli/pull/30157) | `safeJsonStringify` 只对真实循环引用替换 `[Circular]`，修复 OTel 遥测数据丢失 | ✅ 已合并 |
| 6 | [#30156](https://github.com/google-gemini/gemini-cli/pull/30156) | 缓冲 chat compression 遥测事件直至 OTel SDK 就绪 | ✅ 已合并 |
| 7 | [#30154](https://github.com/google-gemini/gemini-cli/pull/30154) | ACP 模式进入前刷新 stdio 缓冲，避免崩溃丢失日志 | ✅ 已合并 |
| 8 | [#30390](https://github.com/google-gemini/gemini-cli/pull/30390) | Windows cmd.exe 下引用含空格的 IDE CLI 路径，修复 `/ide install` 失败 | 🔄 Open |
| 9 | [#30268](https://github.com/google-gemini/gemini-cli/pull/30268) | taint/构建文件检查尊重 YOLO 模式，避免自主运行被中断 | 🔄 Open |
| 10 | [#30212](https://github.com/google-gemini/gemini-cli/pull/30212) | 新增 `tools.callTimeout` 单次工具调用超时配置 | 🔄 Open |

**社区贡献活跃**：[#30094](https://github.com/google-gemini/gemini-cli/pull/30094)（UI 中显示子代理执行中的工具调用）、[#30104](https://github.com/google-gemini/gemini-cli/pull/30104)（`/skills link` 后刷新斜杠命令）等多个 help wanted PR 持续推进。

## 5. 功能需求趋势

1. **子代理体系成熟化**（最主导方向）：可靠性（挂起/误报成功）、可观测性（轨迹分享 `/chat share`、bug 报告上下文）、并行协作与共享内存、通过 `settings.json` 发现 agent
2. **上下文与 token 效率**：AST 感知读取/搜索、surgical reads（“精准抽取”）、文件化任务跟踪替代 WriteToDo
3. **安全性增强**：OS 级零依赖沙箱、破坏性命令防护、per-workspace 策略
4. **平台兼容性**：Windows 路径/IDE 路径、Linux Wayland、Android/Termux 持续是修复热点
5. **可配置性与可观测性**：工具调用超时、遥测可靠性、内部 eval 体系稳定化

## 6. 开发者关注点

- **子代理可信度是最大痛点**：挂起、误报成功、不主动调用三大问题叠加，用户被迫用指令禁用 subagent 作为 workaround，侵蚀核心体验
- **静默失败难排查**：`/bug` 报告和 UI 均缺少子代理内部状态，排障成本高
- **大规模工具集受限**：128 工具上限使重度 MCP 用户直接撞墙
- **自主模式（YOLO）体验不顺**：安全检查与无人值守运行之间的冲突尚待收敛
- **Windows 支持持续打磨**：路径展开、IDE 安装等基础问题仍在批量修复中，Windows 用户建议关注 nightly 更新

---
*数据来源：github.com/google-gemini/gemini-cli | 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-21** | 数据来源：github.com/github/copilot-cli

---

## 📌 今日速览

过去 24 小时 Copilot CLI 发布了两个新版本（v1.0.115-2 / v1.0.115-3），重点改进 Windows 沙箱能力与 @ 提及选择器体验。社区出现一起**严重安全事故报告**（#5541：Agent 在 WSL 中执行 `rsync --delete` 清空用户磁盘），引发对 Agent 安全边界的担忧。MCP 相关问题依然是 Issue 最集中的领域。

---

## 🚀 版本发布

### v1.0.115-3（修复）
- 保持 @ 提及选择器在空搜索完成前可见，修复其关闭后 Ctrl+Y 和 Tab 恢复正常行为的问题

### v1.0.115-2（新功能）
- **默认启用 Windows 沙箱包查询**，可通过 `sandbox.userPolicy.capabilities: []` 退出
- 新增 `sandbox.userPolicy.seatbelt.extraMachLookups`：允许沙箱命令执行特定 macOS Mach 服务查找，无需开放 Keychain 访问
- `/model` 中新增 Ctrl+X then A 快捷键

---

## 🔥 社区热点 Issues（Top 10）

1. **#5541 [OPEN] Agent 在 WSL 中执行 `rsync -a --delete <dir>/ /` 清空用户磁盘** ⚠️
   最严重的报告：跨 Shell 引号传递失败导致变量为空，`--delete` 直接作用于根目录。直接拷问 Agent 的命令安全校验机制，是安全设计层面必须回应的问题。
   https://github.com/github/copilot-cli/issues/5541

2. **#5478 [OPEN] Cortex XDR 将 Copilot 调用 git 判定为 parent_process_spoofing 并杀死 Shell**（8 评论）
   企业安全软件与 CLI 的兼容性冲突：在有 git 仓库的目录启动即崩溃，企业环境受影响。
   https://github.com/github/copilot-cli/issues/5478

3. **#5220 [OPEN] 请求 Claude 模型支持 1 小时 prompt cache TTL**（17 👍）
   默认 5 分钟缓存过期导致交互使用中反复重读全对话，直接推高 API 成本，用户呼声强烈。
   https://github.com/github/copilot-cli/issues/5220

4. **#4203 [OPEN] 远程 MCP OAuth：access token 过期时强制交互式重登而非静默 refresh**（5 👍）
   缓存了有效 refresh_token 却不走 RFC 6749 §6 刷新流程，MCP 可用性硬伤。
   https://github.com/github/copilot-cli/issues/4203

5. **#5468 [OPEN] 远程控制在 GitHub Mobile 和 github.com 上全部失败**
   会话可同步可读但无法控制，relay 握手报 "sealed value must bind this connection's challenge"，跨端体验受阻。
   https://github.com/github/copilot-cli/issues/5468

6. **#4805 [OPEN] 崩溃后遗留的 `inuse.<pid>.lock` 导致会话永久无法恢复**
   会话数据完好却被生命周期锁阻塞，属可靠性核心问题。
   https://github.com/github/copilot-cli/issues/4805

7. **#2109 [CLOSED] ACP 支持 ask_user / ask_question 扩展方法**（9 👍）
   结构化向用户提问的 ACP 能力需求，已关闭，值得关注是否落地实现。
   https://github.com/github/copilot-cli/issues/2109

8. **#5071 [OPEN] Windows `/upgrade` 破坏 winget 安装记录**
   内置更新绕过 winget，覆盖 WinGet\Links 别名导致包管理状态不一致，Windows 用户的典型痛点。
   https://github.com/github/copilot-cli/issues/5071

9. **#5440 [OPEN] Agent Plugins 1.0 的 `.instructions.md` 与 `applyTo` 静默失效**
   新插件格式下规则文件被忽略，插件生态兼容性问题。
   https://github.com/github/copilot-cli/issues/5440

10. **#5090 [OPEN] 启动时 MCP/插件同步加载阻塞输入行**
    大型仓库用户被迫等待加载完成才能工作，请求异步化，性能体验代表性问题。
    https://github.com/github/copilot-cli/issues/5090

---

## 🔧 重要 PR 进展

过去 24 小时内无 PR 更新（0 条），本节省略。

---

## 📈 功能需求趋势

1. **MCP 生态成熟度**（最集中）：OAuth 静默刷新（#4203）、协议版本回退（#5039）、大小写容错匹配（#5050）、Task 增强（#5540）、resource.blob 传参（#4916）——MCP 是当前问题密度最高的领域
2. **沙箱与安全**：新版本加强沙箱能力的同时，#5541 数据损毁事故显示危险命令防护仍需加强
3. **成本可见性与控制**：prompt cache TTL（#5220）、会话级 AI credits 展示（#5537）
4. **会话可靠性**：锁文件恢复（#4805）、模型切换确定性（#5535）、CI 严格退出码（#3064）
5. **权限体验简化**：跨仓库持久读权限（#5539）、辅助权限模式回退（#5066）

---

## ⚠️ 开发者关注点

- **安全底线**：#5541 的磁盘清空事故说明跨 Shell（PowerShell→WSL）引用处理 + 危险命令（`--delete`、`/`）缺乏防护，社区将密切关注官方响应
- **企业环境兼容性**：XDR/EDR 软件冲突（#5478）影响大组织采用
- **Windows 平台体验**：winget 更新错乱、插件卸载拒绝访问、WSL 环境 OAuth 回调等多个 Windows 特有问题持续存在
- **终端交互细节**：滚动位置跳变（#5533）、权限弹窗重置问答框（#5536）等影响日常使用流畅度
- **MCP 用户期待“开箱即用”**：认证、协议版本、资源传输等基础链路仍有明显摩擦

---

*本报告基于过去 24 小时 GitHub 公开数据自动生成，共追踪 44 条 Issue 更新、2 个 Release、0 个 PR。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-11-21）

## 📌 今日速览

今日无新版本发布，但发布 promotion PR (#64784) 正在推进 dev → production，包含 Tidepool Alpha Free 与 Gemini 4 Neon 的 Console 文档。社区围绕 **权限规则静默失效 (#65290)** 和 **快照吞掉 90 GB 磁盘 (#65127)** 展开热烈讨论。PR 侧亮点颇多：实验性 Agent 沙箱架构落地、MCP Events 推送交付跟进 SEP-3415、Agent 交互式 Widgets 提案亮相。

## 🚀 版本发布

过去 24 小时无正式 Release。#64784 正在准备将 `dev` 晋升至 `production`，预计近期发布。

## 🔥 社区热点 Issues

1. **[#64073](https://github.com/anomalyco/opencode/issues/64073)** [FEATURE] 恢复前台 Subagent 执行 — 24 条评论、7 👍，本周讨论最热的特性请求，子代理执行模式的变化引发大量用户回响。

2. **[#65290](https://github.com/anomalyco/opencode/issues/65290)** `external_directory` ask 规则加载但从不提示，越界读取静默执行 — 高严重度权限安全缺陷，配置存在但服务端根本不创建权限请求，安全敏感用户必读。

3. **[#65127](https://github.com/anomalyco/opencode/issues/65127)** 快照捕获包含 git-ignored 及 >2 MiB 文件，打包了 90 GB 进快照存储 — `/undo` 特性严重破坏性 bug，直接威胁用户磁盘。对应修复 PR #65239 已在途。

4. **[#50979](https://github.com/anomalyco/opencode/issues/50979)** session move 到空 git 仓库时静默重指向 global 项目的 worktree — 已复现的 core 数据完整性问题，可能导致未提交工作“丢失”。

5. **[#52067](https://github.com/anomalyco/opencode/issues/52067)** `edit` 工具间歇性报 "Could not find oldString"，且仅差前导空格的不同字符串被判为相同 — 编辑工具的核心可靠性问题，长期困扰用户。

6. **[#58989](https://github.com/anomalyco/opencode/issues/58989)** Go 中继丢弃 `anthropic-beta` / `anthropic-version` 请求头 — 导致 Anthropic 格式 beta 能力（body 字段与 header 分离）不可用，影响所有走官方中继的用户。

7. **[#62085](https://github.com/anomalyco/opencode/issues/62085)** 切换模型后，上一轮工具返回的图片被意外附加到下一条纯文本 prompt — 跨模型切换的上下文污染，值得隐私/正确性关注。

8. **[#65214](https://github.com/anomalyco/opencode/issues/65214)** Windows 上 `shell` 工具对带路径参数的命令返回空输出 — 使 Windows 桌面端的文件检查与语法校验基本不可用。

9. **[#64573](https://github.com/anomalyco/opencode/issues/64573)** Windows cmd 模式下每条命令的内嵌双引号都被转义 — cmd 用户的 shell 可用性痛点。

10. **[#65279](https://github.com/anomalyco/opencode/issues/65279)** `session.interrupt` 把所有调用方都上报为 `reason="user"` — SDK/API 可观测性缺陷，外部程序与 opencode 自身的中断无法区分。

## 🔧 重要 PR 进展

1. **[#64784](https://github.com/anomalyco/opencode/pull/64784)** release: promote dev to production — 下一个 production 版本的发布 PR，含新模型文档与核心变更。

2. **[#65168](https://github.com/anomalyco/opencode/pull/65168)** 实验性 Agent 沙箱核心架构基础 — 迈向 #48411 沙箱能力的第一步，是架构级大动作。

3. **[#65271](https://github.com/anomalyco/opencode/pull/65271)** MCP Events 推送交付（SEP-3415 beta）— MCP 客户端从轮询走向推送，生态前瞻性强。

4. **[#65261](https://github.com/anomalyco/opencode/pull/65261)** Agent Widgets — Agent 可在会话中渲染 PsychoScript 交互式组件，扩展性大提案。

5. **[#65239](https://github.com/anomalyco/opencode/pull/65239)** 强制快照 ignore/大小限制并约束捕获时间 — 直接修复 90 GB 快照事故 (#65127/#64918)。

6. **[#65295](https://github.com/anomalyco/opencode/pull/65295)** machines 系列审查修复 — 修复"本机 always 授权会波及所有连接机器"的严重权限问题。

7. **[#65052](https://github.com/anomalyco/opencode/pull/65052)** 插件自动更新（@latest / range / Git branch）— 插件生态维护性显著提升（后续引发多次 CI 修复 #65301/#65302/#65304）。

8. **[#65289](https://github.com/anomalyco/opencode/pull/65289)** ChatGPT refresh token 被拒时主动请求重连 — 修复登录态过期死循环体验 (#60133)。

9. **[#65291](https://github.com/anomalyco/opencode/pull/65291)** 限制 Code Mode 工具调用追踪的内存占用 — 保留最近 128 条嵌套调用，防止 trace 无限膨胀。

10. **[#65193](https://github.com/anomalyco/opencode/pull/65193)** 顶层调用的 Code Mode 工具也能执行 — 提升弱模型下的容错能力。

## 📈 功能需求趋势

- **Agent 执行模型与沙箱**：前台 Subagent 恢复请求 (#64073) + 沙箱架构 PR (#65168)，Agent 编排是当前最热方向。
- **可观测性与 API 语义**：interrupt reason 归因 (#65279)、中断无日志 (#65220) 等多个 issue 要求更好的插件/SDK 遥测。
- **权限与安全细粒度控制**：external_directory 规则失效 (#65290)、跨机器授权泄漏 (#65295) 表明权限系统是薄弱环节。
- **桌面端体验打磨**：项目列表残留 (#65145)、Add Project 入口过深 (#65297)、拼写检查 (#65281) 等大量 Desktop 细节反馈。
- **新模型/Provider 接入**：Gemini Omni 1.2 Flash 文档 (#65299)、Ollama 小模型兼容 (#65156)、自定义 Anthropic 兼容 provider (#65092)。

## ⚠️ 开发者关注点

- **Windows 平台质量堪忧**：shell 空输出 (#65214)、cmd 引号转义 (#64573)、NumPad 按键失效 (#65158)、CLI 无限挂起 (#65245)、tsgo OOM (#49224) —— Windows 用户痛点高度集中。
- **磁盘与资源安全**：快照无限制吞盘 (#65127) 提醒用户关注 `/undo` 功能的磁盘开销，建议暂时排查快照存储目录大小。
- **中继/网关兼容性**：Go 中继丢 header (#58989)、区域 403 (#41518) 等持续影响非直连用户。
- **升级链路**：`opencode upgrade` 失败 (#65253) 提示 2.2.7 → 2.3.2 升级可能受阻，建议备选安装方式。
- **工具可靠性基础项**：`edit` 工具的字符串匹配缺陷 (#52067) 长期未根治，是编辑类 agent 工作流的最直接风险。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-11-21

## 📰 今日速览

今日社区活跃度持续高位（过去 24 小时内 47 条 Issue 更新、50 条 PR 更新），发布了 **v0.28.1-preview.1** 预览版，同时 v0.28.0 nightly 持续迭代。维护者 @wenshao 与 @yiliang114 密集推进 **Managed Agent 架构收敛**（Runtime spawn 时机修复、Schema 初始化统一、CI gate 稳定化）。CI 基础设施仍是最大痛点，多个长期失败 Issue 评论数破百。

---

## 🚀 版本发布

### [v0.28.1-preview.1](https://github.com/QwenLM/qwen-code/releases)
- **test(managed-agent)**: 在全栈 E2E 中观察真实的 scheduled /loop 触发（@wenshao, [#17506](https://github.com/QwenLM/qwen-code/pull/17506)）
- **fix(verify-pr)**: 加固 watch 相关逻辑（发布说明截断，详见 Release 页面）

同步发布 `v0.28.0-nightly.20261120.19b31401f5`，包含相同核心变更。

---

## 🔥 社区热点 Issues

1. **[#14724](https://github.com/QwenLM/qwen-code/issues/14724)** — Main CI 失败：Managed Agent gate 无测试识别（506 条评论）
   长期追踪 Issue，是仓库讨论量最高的话题，反映 Managed Agent gate 在 main 分支上的反复失败，与 #17039（gate 稳定化）直接相关。

2. **[#11680](https://github.com/QwenLM/qwen-code/issues/11680)** — Main CI 失败：E2E Tests（100 条评论）
   Linux sandbox:docker 分支 E2E 持续失败，今日仍有更新，说明 E2E 基础设施稳定性问题仍未根治。

3. **[#13078](https://github.com/QwenLM/qwen-code/issues/13078)** — 每日依赖 CVE 审计失败（57 条评论）
   依赖安全审计持续告警，可能是新高危漏洞或 npm audit 端点问题，安全敏感用户需关注。

4. **[#17039](https://github.com/QwenLM/qwen-code/issues/17039)** — ✅ 已关闭：将 Managed Agent gate 设为 required check（@yiliang114）
   P1 级 CI 治理项落地——此前 Java 套件破坏可“带病合并”。该修复对阻止 CI 失败扩散至全仓库意义重大。

5. **[#15486](https://github.com/QwenLM/qwen-code/issues/15486)** — P1：自动 compaction 后下一次请求的 size 估算重复计入 pending tool result 并加 20K pad
   直接影响可用性——导致回合被终止或以 `max_tokens: 1` 发送。Token 管理方向的核心 bug，仍在讨论中。

6. **[#17934](https://github.com/QwenLM/qwen-code/issues/17934)** — 新增：E2E 失败——daemon 被 SIGKILL 后会话可列出并继续（14 条评论）
   serve 模式的进程恢复能力测试失败，涉及 qwen-serve 守护进程稳定性。

7. **[#17167](https://github.com/QwenLM/qwen-code/issues/17167)** — ✅ 已关闭：QQ 渠道出站媒体 PR #15450 停滞 72 小时的 review 请求（8 条评论）
   社区贡献者对“merge-ready 却无人审批”流程瓶颈的典型反馈，今日关闭可能意味着已合并。

8. **[#17086](https://github.com/QwenLM/qwen-code/issues/17086)** — ✅ 已关闭：qwen4-max-preview 服务端中文 tool-URL 规则被模型视为 prompt injection
   有趣的 badcase：Model Studio 端点注入的隐藏指令被模型反复标记，属模型服务端与客户端的边界问题。

9. **[#17885](https://github.com/QwenLM/qwen-code/issues/17885)** — ✅ 已关闭：Windows Java lane 因 32780 字符 argv 超过 Windows 32767 限制而确定性失败
   经典 Windows 限制问题（#17478 引入），快速修复关闭，体现了 CI patrol 机制的高效。

10. **[#17962](https://github.com/QwenLM/qwen-code/issues/17962)** — 文档描述了 install.sh 二进制（1.0.0-preview.2）不支持的功能，且未标注适用版本线
    新用户上手体验痛点，反映 native binary 渠道与文档脱节，值得发布团队关注。

---

## 🔧 重要 PR 进展

1. **[#17964](https://github.com/QwenLM/qwen-code/pull/17964)** / **[#17965](https://github.com/QwenLM/qwen-code/pull/17965)** — fix(managed-agent)：临时 Runtime state 目录改为 spawn 时创建
   恢复“构造 Runtime provider 不得触碰文件系统”的架构约束，两条并行实现（@wenshao / @yiliang114）反映维护者对该修复的重视。

2. **[#17910](https://github.com/QwenLM/qwen-code/pull/17910)** — fix(core)：超限 transcript 索引进入独立有界缓存类（256 MiB LRU）
   性能优化：超大索引不再被 64 MiB 共享缓存直接拒之门外，改善大会话/长对话体验。

3. **[#17918](https://github.com/QwenLM/qwen-code/pull/17918)** — feat(web-shell)：触屏设备上支持接受 follow-up 建议
   移动端 UX 增强，解决触屏 composer 中建议仅显示为占位文本的问题。

4. **[#17376](https://github.com/QwenLM/qwen-code/pull/17376)** — feat(cli)：原生历史统计（/stats）
   跨项目历史 Activity 与 Efficiency 报表，社区期待的数据可视化功能。

5. **[#11854](https://github.com/QwenLM/qwen-code/pull/11854)** — feat：混合 code mode（`tools.mode`: direct / code_mode / code_mode_only）
   对齐 Codex 的 exec JavaScript 工具隔离模式，长跑两个月的重量级特性，仍在推进。

6. **[#17823](https://github.com/QwenLM/qwen-code/pull/17823)** — fix(agents)：transcript 读取错误后 A2A 任务保持可恢复
   Agent 间协议健壮性：返回可重试错误 -32012 而非保存失败结果，读恢复后任务仍可完成。

7. **[#17903](https://github.com/QwenLM/qwen-code/pull/17903)** — fix(ci)：Microsoft Teams 渠道暂缓 npm 发布，等待一次性 bootstrap publish
   发布流程治理：用仓库变量 gate 控制未完成初始化的包进入 release。

8. **[#17471](https://github.com/QwenLM/qwen-code/pull/17471)** — feat(managed-agent)：统一 unbound Session 权限到 ownership 行（16023 A/2）
   大重构 #16023 的拆分迁移之一，Managed Agent 会话权限模型收敛的关键一步。

9. **[#17961](https://github.com/QwenLM/qwen-code/pull/17961)** — ✅ 已合并：fix(managed-agent)：Hosted Harness 客户端单锁交接
   消除懒加载客户端在 build/publish/close/adopt 并发路径下的竞态。

10. **[#13957](https://github.com/QwenLM/qwen-code/pull/13957)** — fix(cli)：高度受限的 tool result 保留 Markdown 格式
    社区贡献长跑 PR，今日更新（曾标 stale），解决 CLI 输出中 Markdown 被剥离的显示问题。

---

## 📈 功能需求趋势

- **Managed Agent / 多 Agent 架构**（最热）：Runtime spawn、Session ownership、Agent Host 替换、/loop guard 等议题占今日动态 40% 以上，是当前仓库的核心演进方向（#17471、#17523、#17284、#13644）
- **CI/CD 与工程治理**：gate 稳定化、Windows argv 限制、CVE 审计、flaky test 治理形成持续的工程化投入流（#17039、#16832、#17885）
- **渠道集成生态**：QQ 出站媒体、Aone Code、DingTalk 身份绑定、Teams 发布 gate、Microsoft 渠道持续活跃（#17167、#17517、#17769）
- **Web Shell / 桌面体验**：Codex worktree parity、触屏交互、UI 遮挡修复、Desktop 打包（#17918、#17963、#17237、#16860）
- **Token / 上下文管理**：compaction 估算、超限索引缓存、模型 output limit 识别（#15486、#17910、#17188）
- **兼容性与模型支持**：DeepSeek V3.1/V3.2 output limit、服务端注入指令冲突（#17188、#17086）

---

## ⚠️ 开发者关注点

1. **CI 可靠性是最大抱怨**：多个 CI 失败追踪 Issue 评论量极高（506/100/57 条），且"no test identified"类问题反复出现。好消息是 #17039（required check）与 #16832（修复已失效 bot 的 re-review 通道）今日均已关闭。
2. **审批流程瓶颈**：merge-ready PR 停滞 72 小时（#17167）引发贡献者不满，人审资源不足是社区贡献流转的显著痛点。
3. **上下文/token 估算 bug 影响日常使用**：#15486 中 compaction 后重复计数导致回合中断，属 P1 且仍在讨论，重度用户需留意。
4. **安装与文档脱节**：install.sh 的 native binary（1.0.0-preview.2）功能与文档不匹配、版本线未标注（#17962），新用户上手成本偏高。
5. **Windows 与跨平台细节**：argv 32767 限制类问题、Windows Node 22 测试失败表明 Windows lane 仍是质量薄弱环节。

---
*数据来源：GitHub QwenLM/qwen-code 公开数据 · 统计窗口：2026-11-20 ~ 2026-11-21*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*