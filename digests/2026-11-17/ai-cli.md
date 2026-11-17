# AI CLI 工具社区动态日报 2026-11-17

> 生成时间: 2026-11-17 02:54 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告（2026-11-17）

---

## 一、生态全景

AI CLI 工具已从单机代码补全面向**多 Agent 编排、跨端/托管会话、渠道化触达**演进：Claude Code 深耕 Agent Teams 与企业多账号，Codex 重仓沙箱与 Guardian 安全审批，Qwen Code 以 Channels 构建“会话接入一切平台”的能力。同时，**成本可控性（缓存 TTL、token 浪费）、长任务可靠性（挂起/静默失败）、权限安全边界**成为各社区高度重合的痛点，说明行业已进入“稳定性与信任”竞争阶段。生态分化明显：头部工具 issue 热度集中于企业级刚需，新兴工具（Qwen Code、OpenCode）则处于架构激进重构期。

---

## 二、各工具活跃度对比

| 工具 | 热点 Issues（本期） | PR 动态（24h） | Release | 阶段特征 |
|---|---|---|---|---|
| Claude Code | 10+（含 476👍/310 评论的超高票 #27302） | 仅 1 条（issues-only 模式） | v2.1.326 | 稳定迭代，用户量大、痛点集中于成本与连接健壮性 |
| OpenAI Codex | 10+（#57101 近月热度最高） | **10+ 条高密度合入** | **4 个 alpha/日**（0.170–0.171 线） | 快速迭代，0.171.0 稳定版临近 |
| Gemini CLI | 10（约 27/30 带 agent 标签） | 10+（含 P0 修复） | 无（nightly 连续 12 天失败 ⚠️） | 重构期，Agent 生态是绝对主题 |
| Copilot CLI | 10（多为长期未解核心 bug） | 0 | v1.0.113-0 | 平稳，稳定性焦虑突出 |
| OpenCode | 10（#59387 385 评论免费额度帖） | 10（1 合入） | @opencode/pty@0.6.0 | 2.3.0 迁移阵痛期 |
| Kimi Code CLI | 0 | 0 | 无 | 24h 无活动 |

**关键观察**：Codex 是唯一“发布+合入”双高速的工具；Claude Code 呈“社区极热、上游代码黑箱”形态；Gemini CLI 发布链路中断是独有风险信号。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **MCP 生态可靠性** | Claude Code、Codex、Copilot CLI、Gemini CLI、Qwen Code | 过期 schema（Claude #110270）、工具不可达回归（Codex #61325）、resume 后工具变更 400（Copilot #5359）、工具数 >128 报错（Gemini #24246）——**MCP 是全行业最大公约数痛点** |
| **成本与缓存优化** | Claude Code、Copilot CLI、OpenCode、Qwen Code | 用量异常消耗（Claude #100746）、1h prompt cache TTL（Copilot #5220）、一次性 prompt 破坏缓存前缀（OpenCode #62554）、shell 输出空白填充浪费 token（Qwen #17350） |
| **长会话/长任务可靠性** | Claude Code、Codex、Gemini CLI | 静默挂起 5-20min（Claude #26224/#88178）、HTTP 400 中断（Codex #58569）、子代理假成功/无限挂起（Gemini #22323/#21409） |
| **Subagent/多 Agent 编排** | Claude Code、Gemini CLI、OpenCode、Qwen Code | Agent Teams（Claude）、子代理可信度（Gemini）、阻塞式调用回归诉求（OpenCode #64073）、子会话追加跟进（Qwen #17484） |
| **权限与安全边界** | Codex、Gemini CLI、OpenCode、Copilot CLI | 沙箱重构（Codex 多 PR）、破坏性命令防护（Gemini #22672）、V1 权限静默失效（OpenCode #64253）、Git 命令跳过审批回归（Copilot #5177） |
| **Windows 平台质量** | Claude Code、Codex、Qwen Code | 盘符大小写、沙箱 CreateProcess 失败、本地项目消失、输出填充回归 |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | Agent Teams、插件/hooks、企业账号体系 | 付费专业开发者/企业团队 | 闭源快速迭代，issues-only 开放模式，生态绑定 Anthropic 模型 |
| **Codex** | 沙箱安全、Guardian 审批、Computer Use/Dots 云环境 | 企业安全敏感用户、跨端（CLI/桌面/iOS）用户 | Rust 内核 + 高频 alpha，安全与云自动化双线投入 |
| **Gemini CLI** | 子代理生态、AST 感知工具链、开放贡献 | 开源社区开发者、扩展作者 | 开源、社区驱动，架构提案先行（如 #19873 OS 沙箱） |
| **Copilot CLI** | 企业策略、自定义 provider、GitHub 生态集成 | GitHub/Copilot 订阅用户、企业组织 | 依托 GitHub 分发，harness 迁移后处于回归修复期 |
| **OpenCode** | Code Mode、pty/终端体验、免费层 | 免费用户、桌面终端重度用户 | 开源、插件市场生态，终端子系统自研 |
| **Qwen Code** | Channels 渠道集成、Web Shell、managed-agent 企业托管 | 中国生态（钉钉/QQ/Aone）、企业私有化部署 | 开源、事件总线内核 1.0 重构、渠道插件化 |

---

## 五、社区热度与成熟度

- **最活跃社区**：Claude Code（#27302 476👍/#26224 152👍 等多贴高票）与 Codex（PR 合入密度最高），二者用户基数最大。
- **快速迭代期**：Codex（日发 4 alpha）、Qwen Code（1.0 内核 11-21 冻结倒计时、Channels 生态爆发）、OpenCode（2.3.0 迁移阵痛）。
- **架构重构期**：Gemini CLI（Agent 主题 issue 占 90%，但 nightly 发布中断 12 天，交付能力受质疑）。
- **平稳/沉默期**：Copilot CLI（无 PR 动态、issue 以存量为主）；Kimi Code CLI 无活动，生态存在感弱。
- **成熟度悖论**：用户量最大的工具（Claude Code、Copilot CLI）痛点集中在“核心链路稳定性”而非功能缺失，是成熟期标志；新兴工具（Qwen Code、OpenCode）痛点集中在迁移破坏与 CI 治理，是成长期特征。

---

## 六、值得关注的趋势信号

1. **MCP 从“加分项”变为“基础设施”**：五个工具同时曝出 MCP 回归/兼容问题，工具动态变更后的会话兼容（schema 过期、工具集漂移）是全行业待解课题。开发者选型时应评估各工具的 MCP 回归测试成熟度。
2. **成本可观测性成为选型关键**：缓存 TTL、静默重写缓存、token 浪费类 issue 在 4 个工具中集中出现——建议为生产环境配置 per-model 用量监控，警惕“看不见的消耗”。
3. **“静默失败”是共同敌人**：无论 Claude 的静默断连、Gemini 的子代理假成功，还是 OpenCode 的权限静默失效，都指向同一趋势：**可观测性与失败显式化将成为下一代工具的核心竞争力**。
4. **安全边界从护栏走向架构**：Codex 的沙箱基建重构、Gemini 的多项安全 PR、Copilot 的审批回归修复，表明行业正从“提示词约束”转向“内核级沙箱+审批链”。
5. **渠道化与企业托管是新战场**：Qwen Code 的 Channels（GitHub/钉钉/QQ）、Codex 的云环境管理、Claude 的企业多账号——Agent 会话正脱离终端，向 IM 与托管平台渗透。
6. **升级风险常态化**：Codex 26.1111、Claude 2.1.323、OpenCode 2.3.0 均出现“升级即坏”。**建议企业用户锁定版本、暂缓自动更新，并在升级前核对 changelog 中的破坏性变更**。

---

*数据截至 2026-11-17，基于六款工具的 GitHub 公开动态整理。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-11-17，来源：anthropics/skills）

## 一、热门 Skills 排行

| # | Skill / PR | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复**（#1742） | 适配 mcp>=2.0 的 `streamable_http_client` 重命名及自定义 HTTP 头配置方式变更，解决下游连接脚本断裂问题 | OPEN |
| 2 | **skill-creator 触发评测隔离**（#1298） | 修复并行 worker 竞争、Windows select() 失败导致触发率误报，直击社区最痛的 eval 误报问题（关联 Issue #556/#1352） | OPEN |
| 3 | **notion-spec-to-implementation + quantitative-resume-auditor**（#1245） | 将产品/技术规格转为 Notion 可执行任务；量化简历审查，跨维护周期长（6-10月），关注度持续 | OPEN |
| 4 | **pyxel 复古游戏开发**（#525） | Pyxel 像素游戏创建/调试/无头验证，官方库作者提交，存活 8 个月仍在更新 | OPEN |
| 5 | **md2video-audio**（#1703） | Markdown 零成本编译为带真人配音的 MP4 视频（Marp + TTS） | OPEN |
| 6 | **scnet-hpc**（#1615） | 基于 SSH + Slurm 的 HPC 集群操作 skill，企业/科研场景代表 | OPEN |
| 7 | **document-typography**（#514） | AI 生成文档的排版质控（孤行、孤词、编号错位），指出“所有 Claude 文档都有此问题” | OPEN |
| 8 | **proofcore-contract-auditor**（#1771） | Solidity/Rust 智能合约静态分析 + TON 链上审计存证，Web3 方向（注意：带商业推广属性） | OPEN |

## 二、社区需求趋势（来自 Issues）

1. **安全与信任边界**（#492，46 评论最热）：社区 skill 冒用 `anthropic/` 命名空间，用户呼吁官方签名/验证机制
2. **组织级分发能力**（#228，17 评论）：企业内共享 skill 库、直接分享链接，替代 Slack 传文件的手工流程
3. **Skill 触发评测可靠性**（#556、#1352）：run_eval.py 触发率恒为 0%、并行 worker UUID 串扰——评测工具本身的正确性是社区最大痛点
4. **上下文效率**（#1487）：claude-api skill 单次注入 ~156k tokens 耗尽上下文，呼吁按需加载/瘦身
5. **质量门控与元认知类 skill**（#1385、#1329）：推理质检流水线、紧凑记忆符号系统——agent 自我治理方向提案活跃
6. **文档处理健壮性**：docx/xlsx/pptx 大量边角 bug（#2018、#1868 等），文档 skill 是贡献最密集区

## 三、高潜力待合并 Skills（活跃 OPEN PR）

- **#1298** skill-creator 触发评测隔离修复 —— 直接回应两大高热度 Issue，合并价值最高
- **#1742** mcp-builder 兼容 mcp>=2 —— 修复下游 breaking change，阻塞用户多
- **#1997 / #1681** skill-creator YAML 解析与打包脚本修复 —— 同一 skill 密集修复表明官方将集中重构
- **#2019 / #1792** xlsx 外链检测、docx 超时校验 —— 文档 skill 小步快跑式修复，合并概率高
- **#1980** webapp-testing 移除 shell=True —— 安全修复（CWE-78），优先级高
- **#2108** 文档 skill 快照状态澄清 —— 官方导出机制说明，近期活跃（11月）

## 四、生态洞察（一句话）

**社区最集中的诉求是"让 Skills 的可信度与评测体系跟得上其数量增长"——从命名空间安全、组织分发，到触发率误报和上下文膨胀，核心都是要求官方建立 Skills 的信任、分发与质量基础设施。**

---

# Claude Code 社区动态日报 — 2026-11-17

## 📌 今日速览

Claude Code 发布 **v2.1.326**，新增 Agent Teams 场景下的 Code Mode 支持及工具配置格式校验告警。社区方面，多账号 Connector 支持（#27302，310 评论 / 476 👍）热度持续，同时 **2.1.323 移除 `subagentStatusLine` 引发的回归争议**和**用量异常消耗类问题**成为今日焦点。新 Issue 中 MCP schema 过期、plugin hooks 失效等可复现 bug 值得关注。

---

## 🚀 版本发布

### v2.1.326
- 支持 Agent Teams 启用时开启 Code Mode；若已开启，启用 teams 的会话现在将以 Code Mode 启动
- 新增启动告警：当 `--allowedTools`、`--disallowedTools` 或 `--tools` 的条目不符合已知格式时提示用户

---

## 🔥 社区热点 Issues

1. **[#27302](https://github.com/anthropics/claude-code/issues/27302)** — 多 Connector 账号支持（同一 connector、不同账号）
   310 评论 / 476 👍，仓库最受欢迎的 enhancement 之一，企业多账号场景刚需。

2. **[#109446](https://github.com/anthropics/claude-code/issues/109446)** — 2.1.323 静默移除 `subagentStatusLine`（regression）
   38 👍。无理由、无替代、无迁移路径，用户失去 subagent 的上下文/成本/模型信息展示，破坏性变更引发不满。

3. **[#26224](https://github.com/anthropics/claude-code/issues/26224)** — 大量 prompt 卡死/挂起 5-20 分钟
   133 评论 / 152 👍 的长期未解 bug，#88178 显示同类“静默连接死亡”问题仍在持续。

4. **[#88178](https://github.com/anthropics/claude-code/issues/88178)** — 一天累计等待 5h46，23 次约 15 分钟静默卡顿
   系统性问题报告，指出连接静默断开时无错误、无重试、无提示。

5. **[#100746](https://github.com/anthropics/claude-code/issues/100746)** — 用量上限（周/会话）异常快速消耗
   付费用户核心痛点，与 #105132（图片历史裁剪后 0.76M+ token 重复缓存写入）、#110403（subagent 暂停后全量重写缓存）构成“成本异常”问题簇。

6. **[#95764](https://github.com/anthropics/claude-code/issues/95764)** — Opus 5 工具调用间的正文被服务器改写为 thinking 摘要块
   代码块丢失、Desktop 不显示、模型误以为用户已看到，属正确性问题。

7. **[#107077](https://github.com/anthropics/claude-code/issues/107077)** — Cowork 云会话以“deprecated mode”启动，plugin hooks 与 slash commands 失效
   非间歇性问题：同一插件在一种模式 100% 工作另一种 0%。

8. **[#91618](https://github.com/anthropics/claude-code/issues/91618)** — Windows worktree 安全检查因盘符大小写比较失败
   有复现，Windows 用户体验受阻。

9. **[#110270](https://github.com/anthropics/claude-code/issues/110270)** — resume 会话发送过期的 MCP tool schema
   即使 `tools/list` 已更新仍发旧 schema 给 API，MCP 生态可靠性问题。

10. **[#110424](https://github.com/anthropics/claude-code/issues/110424)** — sequential-thinking MCP 触发 `reasoning_extraction` 拒绝（Opus 5.5 回归）
    11-14 起稳定复现，规划类工作流被全面阻断。

---

## 🔧 重要 PR 进展

过去 24 小时仅 1 条 PR 更新：

- **[#78049](https://github.com/anthropics/claude-code/pull/78049)** [CLOSED] — 修复 `Set-ClaudeCodePolicy.ps1` 在 32-bit PowerShell 宿主下写入错误 Program Files 路径的问题（Intune 默认 32-bit 宿主导致 `$env:ProgramFiles` 指向 `Program Files (x86)`）。已被关闭，或已合入主线或由官方另行处理。

> 注：本仓库 PR 活动极少（issues-only 模式为主），建议关注 Release changelog 跟踪代码变更。

---

## 📈 功能需求趋势

- **账号与订阅管理**：多 Connector 账号（#27302）、usage reset 误触防护（#108822、#102938）
- **成本控制**：交互式会话花费上限（#95964）、statusLine 中 per-model 周用量（#99223）、subagent 空闲缓存策略（#110403）
- **生态互通**：读取 claude.ai Projects 与聊天历史（#106011）、跨会话/仓库迁移记忆与 artifacts（#110525）
- **插件与 hooks 完整性**：worktree 中项目级 hooks 不生效（#83953）、插件使用记录缺失（#110537）、Cowork 模式 hooks 失效（#107077）

---

## ⚠️ 开发者关注点

1. **成本/用量异常是最大痛点**：异常快速消耗、超大重复缓存写入、reset 误扣等问题集中出现，建议关注 #105132、#110403 中的缓存行为分析。
2. **连接健壮性**：静默挂起（#26224、#88178）长期未解，无超时/重试反馈机制。
3. **配置静默变更**：`subagentStatusLine` 被无预警移除（#109446），提示生产环境升级前应仔细核对 changelog。
4. **Windows 平台边缘问题较多**：盘符大小写（#91618）、更新横幅不清除（#65093）、桌面端输入重复（#110547）。
5. **安全护栏误伤**：`reasoning_extraction` 拦截正常 MCP 工作流（#110424），影响可预测性。

---
*数据截至 2026-11-17，来源：github.com/anthropics/claude-code*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-11-17）

## 1. 今日速览

今日 Codex 仓库发布节奏密集，24 小时内连发 4 个 Rust alpha 版本（0.170.0-alpha.4.1 至 0.171.0-alpha.10），同时合入大量涉及沙箱、Guardian 审查和 app-server 架构重构的 PR。社区侧，Windows Computer Use 屏幕捕获未释放（#57101）持续发酵，MCP 工具在 26.1111 桌面版中的回归问题（#61325）成为新焦点。

## 2. 版本发布

过去 24 小时发布 4 个 alpha 版本：

| 版本 | 说明 |
|---|---|
| [rust-v0.170.0-alpha.4.1](https://github.com/openai/codex/releases/tag/rust-v0.170.0-alpha.4.1) | 0.170.0 线热修复补丁 |
| [rust-v0.171.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.8) | 0.171.0 迭代 |
| [rust-v0.171.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.9) | 0.171.0 迭代 |
| [rust-v0.171.0-alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.10) | 0.171.0 最新 alpha |

同日 10 个 alpha 的快速轮转表明 0.171.0 稳定版临近，建议关注后续 changelog。

## 3. 社区热点 Issues

1. **[#57101](https://github.com/openai/codex/issues/57101)** Windows Computer Use：截图会话结束后屏幕捕获权限与金色边框未释放（42 评论）。隐私与安全敏感，持续时间已近一个月，是本日热度最高 issue。
2. **[#49682](https://github.com/openai/codex/issues/49682)** ChatGPT Dots 云计算机文件丢失（35 评论，👍10）。云工作区状态持久性问题的代表性报告。
3. **[#60778](https://github.com/openai/codex/issues/60778)** iOS Codex 显示 "No tasks yet" 但历史会话可搜索（21 评论，👍13）。iOS 端任务列表同步 bug，用户复现明确。
4. **[#50728](https://github.com/openai/codex/issues/50728)** macOS Computer Use 干扰手动输入：击键/粘贴重复，Claude 键盘事件延迟 16–56 秒（21 评论）。跨应用干扰严重。
5. **[#59808](https://github.com/openai/codex/issues/59808)** Dot 云工作区一天内三次回滚/状态丢失（8 评论）。Dots 可靠性再次受质疑。
6. **[#61325](https://github.com/openai/codex/issues/61325)** 26.1111.21308 回归：第三方插件及 `[mcp_servers]` 的 MCP 工具完全不可达（0 tools），26.1106 正常、CLI 正常。疑似桌面版紧急回归，建议尽快跟进。
7. **[#58569](https://github.com/openai/codex/issues/58569)** macOS 桌面端长任务中反复 HTTP 400 中断（9 评论），影响任务连续性。
8. **[#61294](https://github.com/openai/codex/issues/61294)** Windows 26.1111 更新后本地项目消失但聊天保留，与 #61325 同版本，升级风险信号。
9. **[#59941](https://github.com/openai/codex/issues/59941)** Windows 更新后 `CreateProcessSecurityEnvironment 0x8007000F` 阻断所有本地命令，沙箱环境问题影响可用性。
10. **[#39551](https://github.com/openai/codex/issues/39551)** 高级账户安全与 GitHub 插件 MFA 要求形成认证策略死锁（👍10），企业/安全用户痛点。

其他值得注意：#59410（Windows token 缺 `chatgpt_account_id` 致认证失败）、#61943（CLI 持久 daemon 与临时认证冲突，今日新报）。

## 4. 重要 PR 进展

1. **[#61947](https://github.com/openai/codex/pull/61947)** 在 Linux 沙箱中遮蔽系统 SSH config drop-ins，修复用户命名空间下 SSH 连接被拒。
2. **[#61942](https://github.com/openai/codex/pull/61942)** 将 exec-server 启动集中到 `WrappedSandboxCommand`，统一进程派生与 Windows token 会话准备——与 #59941 类问题相关的沙箱基建重构。
3. **[#61946](https://github.com/openai/codex/pull/61946)** / **[#61929](https://github.com/openai/codex/pull/61929)** Guardian 审查改进：嵌套 MCP 审批携带外层工具上下文；审查视图按证据截断点冻结。安全审批链路持续打磨。
4. **[#61934](https://github.com/openai/codex/pull/61934)** / **[#61928](https://github.com/openai/codex/pull/61928)** app-server 线程恢复可并发重叠、线程列表锁封装到 `ThreadListState`，解决慢 MCP 启动阻塞无关会话的性能问题。
5. **[#61922](https://github.com/openai/codex/pull/61922)** / **[#61920](https://github.com/openai/codex/pull/61920)** / **[#61919](https://github.com/openai/codex/pull/61919)** TUI 大更新：侧栏会话文件选择器、文件追踪、图片预览（PNG/JPEG/GIF/WebP）。
6. **[#61940](https://github.com/openai/codex/pull/61940)** Cloud 客户端新增 `list_saved_environments`，云环境管理能力增强。
7. **[#61926](https://github.com/openai/codex/pull/61926)** agent 搜索支持按线程 ID 和 Git 分支匹配。
8. **[#61939](https://github.com/openai/codex/pull/61939)** worktree 状态扫描缓慢时保留部分 Git 元数据，避免 1 秒超时丢弃已获取信息。
9. **[#61931](https://github.com/openai/codex/pull/61931)** 记录 Windows MXC deny-read glob 展开耗时，为沙箱性能问题（可能关联 #57101 类延迟）增加可观测性。
10. **[#61915](https://github.com/openai/codex/pull/61915)** 无效 `tui.status_line_provider` 时回退内置状态栏，避免启动失败——容错性改进。

## 5. 功能需求趋势

- **Computer Use / Dots 稳定性**：占比最高的 bug 集群（#57101、#50728、#49682、#59808），社区对云/本地自动化环境的会话清理、状态持久化诉求强烈。
- **MCP 生态集成**：远程 OAuth MCP、第三方插件工具暴露（#61325、#61723、#16574）——MCP 已是核心工作流，回归影响面大。
- **TUI / 桌面体验打磨**：撤销重做（#2379，👍38）、侧栏文件预览（#40079）等 UX 需求长期高票。
- **Windows 平台支持质量**：沙箱、MSIX 更新、认证相关 issue 显著多于 macOS（#59941、#61294、#59410）。
- **跨端一致性与同步**：iOS/macOS 会话列表、远程桌面项目可见性（#60778、#31407）。

## 6. 开发者关注点

- **升级即坏**：26.1111 桌面版出现两处回归（MCP 工具不可达、本地项目消失），建议企业用户暂缓自动更新并锁定已知稳定版本。
- **沙箱与安全边界**：Windows `CreateProcessSecurityEnvironment` 失败、Linux SSH 沙箱、MFA 策略死锁——沙箱与认证交叉领域是当前最密集的痛点，官方也以多个沙箱重构 PR 回应。
- **长任务可靠性**：HTTP 400 中断、compaction 摘要丢失（#61916）表明长时运行任务的连续性仍是薄弱环节。
- **可观测性不足**：多个 issue 依赖用户手工抓日志/包元数据定位版本，#61931 等日志增强 PR 是积极信号，但社区仍普遍要求更好的诊断工具（`codex doctor` 覆盖面）。

---
*数据来源：github.com/openai/codex | 统计窗口：2026-11-16 ~ 2026-11-17*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-11-17

## 一、今日速览

今日无新版本发布，但 PR 活动密集：**夜间构建自 11-05 起连续失败**（P0 级问题），社区正推进修复（#30207）。安全修复成为近期主线，多个针对 Git 命令绕过、环境变量注入的修复 PR 相继合并或推进。Agent（子代理）相关 Issue 依然是社区讨论的绝对焦点，其中子代理可靠性问题（假成功、挂起）持续发酵。

---

## 二、版本发布

今日无新 Release。（注：夜间构建发布自 2026-11-05 起因 npm 包体积超限持续失败，见 PR #30207）

---

## 三、社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — 子代理撞到 MAX_TURNS 上限却上报 `success`/`GOAL`，掩盖了任务被中断的事实（P1，13 条评论）。这是影响任务可信度的核心缺陷：调用方无法感知子代理实际失败。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — 通用 agent 挂起，简单操作（建文件夹）可挂 1 小时以上（P1，8 👍）。用户只能靠提示词禁止子代理绕过，严重影响可用性。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — 利用 Gemini 3 原生 bash 能力 + 零依赖 OS 沙箱与执行后意图路由（P2 大型增强，9 条评论）。这是 Agent 架构方向的重量级提案。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — 评估 AST 感知的文件读取/搜索/代码库映射（EPIC，配套 #22746、#22747）。有望大幅减少 token 浪费与读取错位，是提效方向的关键探索。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — Gemini 几乎从不主动使用自定义 skills 和子代理（P2，7 条评论）。用户反馈需显式指令才触发，反映调度触发机制不足。

6. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — 工具数超 128 时遭遇 400 错误，期望智能裁剪工具作用域。对重度扩展/MCP 用户是硬性阻断。

7. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** — Browser Agent 完全忽略 `settings.json` 覆盖（如 `maxTurns`），配置读取与合并存在断链。

8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — 浏览器子代理在 Wayland 下失败（P1）。Linux 桌面用户的基本功能受损，与 PR #30097（WSL2 剪贴板修复）同属跨平台痛点。

9. **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)** — 模型频繁在随机目录生成临时编辑脚本，清理成本高。反映 shell 执行路径下工作区卫生问题。

10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)** — Agent 应阻止/劝阻破坏性行为（`git reset`、`--force`、DB 操作）。安全性议题在 Issue 侧同样受关注。

---

## 四、重要 PR 进展

1. **[#30207](https://github.com/google-gemini/gemini-cli/pull/30207)**（P0）— esbuild 前清理 `bundle/`，剔除陈旧产物。修复自 11-05 起夜间发布因 npm 413（tarball 25.2MB，含约 70MB 陈旧 JS）持续失败的问题。

2. **[#30206](https://github.com/google-gemini/gemini-cli/pull/30206)**（P1 安全）— 阻断项目级 `.env` 注入 Git 环境变量影响内部 Git/shell 操作，防供应链式提权。

3. **[#30095](https://github.com/google-gemini/gemini-cli/pull/30095)**（已关闭，P1 安全）— 修复 Windows Git diff 权限绕过，统一只读 Git 命令校验，拒绝危险参数。

4. **[#30289](https://github.com/google-gemini/gemini-cli/pull/30289)**（P1）— `gemini extensions link` 解析符号链接真实路径并在同意提示中披露，**默认改为不同意**，提升扩展透明度。

5. **[#30292](https://github.com/google-gemini/gemini-cli/pull/30292)** — 修复 `read_background_output` 丢弃 64KB 读取窗口首行的问题，单行超 64KB 日志不再整条丢失，并标记截断读取。

6. **[#30325](https://github.com/google-gemini/gemini-cli/pull/30325)**（新提交）— 后台输出超 64KB 时头部不再误标为 "Full Log Output"，避免模型误判。

7. **[#30283](https://github.com/google-gemini/gemini-cli/pull/30283)**（已关闭）— 系统级 MCP server 命令强制所有权与写权限检查，不安全的直接跳过。

8. **[#30097](https://github.com/google-gemini/gemini-cli/pull/30097)** — 修复 WSL2 (WSLg) 图片粘贴：补充 `WAYLAND_DISPLAY`/`DISPLAY` 剪贴板检测 + BMP 回退。

9. **[#30316](https://github.com/google-gemini/gemini-cli/pull/30316)** — 修复自定义模型别名指向模型层级（如 `flash-lite`）时字符串比较失败导致设置丢失。

10. **[#30315](https://github.com/google-gemini/gemini-cli/pull/30315)** — 从 CLI 路径而非 cwd 检测本地 Git 克隆，修复自动更新把源码 checkout 误判为 npm 全局安装。

其他值得注意：[#30305](https://github.com/google-gemini/gemini-cli/pull/30305)（修正文档中永不生效的 `excludeTools` 写法）、[#30281](https://github.com/google-gemini/gemini-cli/pull/30281)（Node 26 fetch 超时配置生效）、[#30321](https://github.com/google-gemini/gemini-cli/pull/30321)（依赖与 Stage 2 沙箱容器更新）。

---

## 五、功能需求趋势

- **Agent/子代理生态**是压倒性主题（30 条热点 Issue 中约 27 条带 `area/agent` 标签）：可靠性（假成功、挂起）、调度触发（skills 使用不足）、并行协作与共享内存（#18287）、轨迹可视化（#22598）。
- **AST 感知工具链**：读取/搜索/代码库映射的精准化（#22745/#22746/#22747），配合 "Tactful Extraction" 精简 token（#19561）。
- **上下文与任务管理**：用持久化文件任务追踪替代 in-context WriteToDo（#18836、#21000）。
- **安全加固**：破坏性命令防护（#22672）、沙箱化 shell 执行（#19873）、Git 环境注入防御。
- **平台健壮性**：内部 eval 体系稳定性（#23166、#23313）、构建发布链路修复。

---

## 六、开发者关注点

1. **子代理可信度**是最大痛点：假成功上报（#22323）、无限挂起（#21409）、bug 报告缺失子代理上下文（#21763），三者叠加使调试几乎不可行。
2. **配置不生效**：Browser Agent 忽略 settings.json（#22267）、自定义模型别名丢失（#30238）、symlink agent 不被识别（#20079）——配置一致性亟待系统性梳理。
3. **工作区卫生与安全**：临时脚本乱放（#23571）、危险 git 命令（#22672）反映行为约束不足。
4. **跨平台体验**：Wayland 浏览器代理失败（#21983）、WSL2 粘贴失效，Linux 桌面/子系统支持是高频反馈。
5. **规模化限制**：工具数 >128 触发 400 错误（#24246），MCP 重度用户撞到天花板。
6. **发布链路**：夜间构建连续 12 天失败（#30207），P0 修复待落地，建议用户暂时避免依赖 nightly 渠道。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期：2026-11-17**

---

## 1. 今日速览

今日 Copilot CLI 发布 v1.0.113-0 修复版本。社区热度最高的两条均为长期未解的核心问题：macOS 更新后 `.mcp-writer.binding` 导致 CLI 完全不可用的问题（#4998）已关闭，而自定义模型 provider 在后台 shell 退出后触发 400 错误的 issue（#5145）仍在讨论中。今日新增多条 triage 类 issue，涉及模型行为、会话管理和企业策略等多个方向。

---

## 2. 版本发布

- **v1.0.113-0**：常规修复与变更（Fixes and changes），官方未提供详细 changelog。

---

## 3. 社区热点 Issues

1. **#4998 [已关闭] macOS 更新/重启后 CLI 完全不可用 —— `.mcp-writer.binding` 持久化过期文件系统设备 ID**（12 评论 / 👍11）
   12 条评论、11 个 👍，是本期热度最高的问题。macOS 安全更新重启后新旧会话均无法处理 prompt，影响面广。现已关闭，值得受影响用户验证修复效果。
   https://github.com/github/copilot-cli/issues/4998

2. **#5145 [开放] thinking 模式下 `reasoning_text` 未回传导致 400 错误**（9 评论）
   自定义 OpenAI 兼容 provider（Responses API）用户在后台 shell 退出后，runtime 合成的无模型 assistant turn 触发 HTTP 400，会话被杀。对自定义模型接入用户是阻断性问题。
   https://github.com/github/copilot-cli/issues/5145

3. **#4905 [开放] 桌面版会话数分钟后死亡："GitHub credential registration is no longer available"**（7 评论 / 👍4）
   凭证注册失效导致 github-mcp-server 目录过期且致命，是桌面版用户的高频痛点。
   https://github.com/github/copilot-cli/issues/4905

4. **#5220 [开放] 请求 Claude 模型支持 1 小时 prompt cache TTL**（3 评论 / 👍11）
   默认 5 分钟缓存 TTL 在正常交互使用中频繁过期，导致整段对话重算，成本与延迟双重影响。👍数高，社区呼声强烈。
   https://github.com/github/copilot-cli/issues/5220

5. **#2881 [已关闭] Autopilot 模式无限循环，持续消耗 premium requests**（5 评论）
   自动驾驶模式进入自我重复循环且无法自动停止，每次迭代消耗一个 premium request，直接涉及用户计费安全。
   https://github.com/github/copilot-cli/issues/2881

6. **#5177 [已关闭] 回归：harness 迁移后变更仓库的 Git 命令不再请求手动批准**（3 评论）
   安全相关回归——`git add`/`git commit` 等破坏性命令跳过审批，属于权限模型的严重问题。
   https://github.com/github/copilot-cli/issues/5177

7. **#4041 [已关闭] IPv4-only 沙箱环境下 `web_fetch` 对所有 URL 失败**（3 评论）
   fetch failed 错误困扰沙箱用户数月，现已关闭。
   https://github.com/github/copilot-cli/issues/4041

8. **#5359 [已关闭] 会话恢复后 MCP 工具变更导致 400 "Tool reference not found"**（3 评论）
   MCP server 工具集在两次启动之间变化后，resume 的会话所有请求均失败，反映会话状态与动态工具的兼容问题。
   https://github.com/github/copilot-cli/issues/5359

9. **#5483 [开放·今日新增] 两条 "immediate" 消息被合并为一条无分隔字符串**（1 评论）
   编程化 SDK 集成场景下 `"no"` + `"drop phase 7"` 被拼成 `"nodrop phase 7"`，语义完全改变，是 SDK 可靠性隐患。
   https://github.com/github/copilot-cli/issues/5483

10. **#2378 [开放] 支持取消已排队消息而不中止当前操作**（1 评论 / 👍7）
    长期开放的交互体验需求，社区认可度高。
    https://github.com/github/copilot-cli/issues/2378

---

## 4. 重要 PR 进展

过去 24 小时内无活跃 PR 更新（数据源共 0 条），本节省略。

---

## 5. 功能需求趋势

从近期 Issues 提炼出的社区功能关注方向：

- **模型与成本优化**：Claude 1 小时 prompt cache TTL（#5220）、1M token 上下文支持（#2601）——缓存与上下文窗口是自定义模型用户的核心诉求。
- **MCP 生态健壮性**：OAuth 兼容性（#4901、#4584、#4463、#3973）、工具动态变更后的会话兼容（#5359）——MCP 相关 issue 占比最高，是最大痛点聚集区。
- **会话管理体验**：归档会话的查看与恢复（#5482）、复制历史 assistant 回复（#5484）、分支会话 updated_at 洪水问题（#4903）。
- **沙箱与权限精细化**：Mach/XPC 服务白名单（#4881）、macOS 本地网络策略（#5390）、WSL 下运行 VS Code Remote（#4546）。
- **企业/组织管理**：远程策略刷新（#5479）、组织托管 GPT 模型的工具延迟加载（#5481）。

---

## 6. 开发者关注点

- **稳定性优先于新功能**：最高热度的 issue 均为阻断性 bug（CLI 不可用、会话死亡、400 报错），而非功能请求，反映用户对核心链路稳定性的焦虑。
- **自定义 provider 支持仍不成熟**：`wireApi: "responses"` 路径下的 reasoning 回传（#5145）、组织托管模型行为不一致（#5481）等问题持续出现。
- **状态持久化与并发安全**：`config.json` 并发会话互相覆盖丢失 trustedFolders（#4900）、resume 会话与动态 MCP 工具不兼容（#5359），本地状态管理是多处问题的共同根源。
- **权限与安全回归受高度警惕**：Git 命令跳过审批（#5177）、Autopilot 无限消耗 premium requests（#2881）表明 harness 迁移后的权限与循环控制需要更严格的回归测试。
- **计费敏感**：缓存 TTL 过短（#5220）与 premium request 消耗（#2881）显示成本可控性正成为用户选型关键因素。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-17

## 📌 今日速览

今日核心动态是 **`@opencode/pty@0.6.0` 正式发布（protocol 9）**，修复了 2.3.0 版本引入的 Linux 下 pty daemon 僵尸进程泄漏问题，配套消费端升级 PR 已合入。免费版（Free tier）额度问题仍是社区最大痛点，主 Issue 评论已突破 385 条。Code Mode 生态迎来多项重要改进，包括慢脚本自动后台化、shell 工具统一等。

---

## 🚀 版本发布

### process-daemon v0.6.0
- **包名**：`@opencode/pty@0.6.0`（protocol 9）
- **核心修复**：解决 OpenCode 2.3.0 中每个已完成的 shell 命令在 `opencode-pty daemon` 下变成僵尸进程（zombie）且永不被回收的问题
- **配套升级**：[PR #64251](https://github.com/anomalyco/opencode/pull/64251) 已将主仓库消费端固定到该版本并启用 protocol 9

---

## 🔥 社区热点 Issues

### 1. [#59387] Free tier 免费额度问题汇总帖
**状态**：OPEN | 💬 385 评论 | 👍 28
 🔗 https://github.com/anomalyco/opencode/issues/59387

免费层用户集中反馈地：额度提示 "Free usage exceeded"、每日重置不生效、Desktop 版本被拒等问题。持续三周热度不减，是当前社区最活跃的讨论帖。

### 2. [#63817] Linux 下 pty daemon 僵尸进程泄漏（已确认）
**状态**：CLOSED | 💬 10 评论
 🔗 https://github.com/anomalyco/opencode/issues/63817

2.3.0 升级后所有完成的 shell 命令均成为僵尸进程。已随 pty 0.6.0 修复关闭。同类问题：[#63976](https://github.com/anomalyco/opencode/issues/63976)（daemon 生命周期内僵尸单调增长）。

### 3. [#64073 / #64096] 请求恢复前台/阻塞式 Subagent 调用
**状态**：OPEN | 💬 各 8 评论
 🔗 https://github.com/anomalyco/opencode/issues/64073 | https://github.com/anomalyco/opencode/issues/64096

2.3.0 将 subagent 改为强制后台执行引发用户强烈反弹，社区要求保留阻塞式调用的可选项，是近期核心工作流变更中最受争议的点。

### 4. [#62554] 一次性 Prompt 破坏缓存前缀（已复现）
**状态**：OPEN | 💬 5 评论
 🔗 https://github.com/anomalyco/opencode/issues/62554

goal reminder、keep-alive、compaction prompt 等一次性提示抢占了缓存断点，导致整个对话前缀缓存失效——直接影响长会话的 token 成本。

### 5. [#64334] 免费额度耗尽仅在 429 失败后才可见
**状态**：OPEN | 💬 3 评论
 🔗 https://github.com/anomalyco/opencode/issues/64334

UI 缺少剩余额度指示器，用户只有在新会话首条消息 429 报错时才发现配额用完。与 #59387 同属免费层体验问题。

### 6. [#54916] Compaction 缩减阶段恢复被 Hook 删除的文本（高危）
**状态**：OPEN | 💬 3 评论
 🔗 https://github.com/anomalyco/opencode/issues/54916

compaction 需要缩减时，`flattenAndDropOldest` 从历史重建内容，**丢弃了 redaction 插件删除的敏感文本**，被删数据可能重新到达模型。安全相关问题，值得高度重视。

### 7. [#64317] Windows 下关闭 worktree 会话遗留孤儿 pty shell 锁死目录
**状态**：OPEN | 💬 2 评论
 🔗 https://github.com/anomalyco/opencode/issues/64317

孤儿 shell 持有 worktree 工作目录，导致目录无法删除，需完全重启才能清理。与 pty daemon 生命周期管理相关的又一案例。

### 8. [#64253] V1 `permission` 配置在 v2.3.0 被静默忽略
**状态**：CLOSED | 💬 2 评论
 🔗 https://github.com/anomalyco/opencode/issues/64253

兼容性回归：项目级 V1 权限配置（bash/task 等规则）被静默忽略，无提示无日志，与迁移文档声明相悖——权限静默失效属于安全敏感问题。

### 9. [#51796] glibc < 2.28 系统上嵌入的 opencode-pty 无法运行
**状态**：OPEN | 💬 4 评论
 🔗 https://github.com/anomalyco/opencode/issues/51796

内置 pty daemon 动态链接了 GLIBC_2.28/2.29，老系统上 "New terminal" 必然 503，且 exec 错误被误报为 service.json ENOENT。

### 10. [#61899] Desktop 集成终端 Ctrl+C 无法中断进程
**状态**：OPEN | 💬 5 评论
 🔗 https://github.com/anomalyco/opencode/issues/61899

Windows 上 Python dev server 无法用 Ctrl+C 停止，只能 `taskkill /F`，严重影响日常开发体验。

---

## 🔧 重要 PR 进展

| PR | 内容 | 状态 |
|---|---|---|
| [#64251](https://github.com/anomalyco/opencode/pull/64251) | 固定 `@opencode/pty 0.6.0` + protocol 9，落地僵尸进程修复 | ✅ 已合入 |
| [#64343](https://github.com/anomalyco/opencode/pull/64343) | **Code Mode 慢脚本自动后台化**：执行超 10 秒自动转后台任务，结果异步回传会话 | OPEN |
| [#64335](https://github.com/anomalyco/opencode/pull/64335) | `full_codemode` 下 `tools.shell` 成为唯一 shell 工具，合并 `shell_status`/`shell_wait` | OPEN |
| [#64347](https://github.com/anomalyco/opencode/pull/64347) | Code Mode `search()` 支持纯字符串查询（模型常误用该形式导致 SchemaError） | OPEN |
| [#63002](https://github.com/anomalyco/opencode/pull/63002) | **Desktop 登录态浏览器面板**：聊天链接在已登录 profile 中打开，支持从 Chrome/Edge/Firefox 等一键导入登录态 | OPEN |
| [#64340](https://github.com/anomalyco/opencode/pull/64340) | Linux NFS 数据库禁用 WAL，修复 NFS 启动失败 | OPEN |
| [#64349](https://github.com/anomalyco/opencode/pull/64349) | CI：v1 发布改用 GitHub 托管 runner 支持 trusted publishing | OPEN |
| [#62146](https://github.com/anomalyco/opencode/pull/62146) | 插件运行期间固定 npm 缓存代，防止缓存被误清理 | OPEN |
| [#62578](https://github.com/anomalyco/opencode/pull/62578) | 单个 well-known 源不可达不再导致全部集成加载失败 | OPEN |
| [#62577](https://github.com/anomalyco/opencode/pull/62577) | ripgrep 文件搜索包含隐藏文件（Windows/非 git 目录 `@` 选择器漏文件） | OPEN |

---

## 📈 功能需求趋势

1. **Subagent 执行模型**：强制后台化引发强烈反弹，社区明确要求阻塞式调用的回归（#64073、#64096）
2. **免费层透明度**：额度显示、重置机制、训练同意开关等（#59387、#64334、#64304）
3. **插件/市场生态**：统一 marketplace / registry 的 master issue 已关闭（#28696，👍 38），或已在推进中；scratchpad/笔记类工作流需求浮现（#64327）
4. **提示词缓存与成本优化**：缓存断点保护、空闲会话自动 compaction（#62554、#50777）
5. **MCP 深度集成**：服务端自定义通知推送到会话实现 wake-up（#48855）
6. **免认证 serve**：`opencode2 serve` 的 no-password flag（#43039，👍 35）

---

## ⚠️ 开发者关注点

- **pty daemon 生命周期管理**是本周最集中的痛点：僵尸进程、孤儿 shell、glibc 兼容性、Ctrl+C 失效，均指向同一子系统，0.6.0 修复了首个问题但余下问题仍待跟进
- **安全与隐私**：compaction 缩减恢复被删文本（#54916）和 V1 权限配置静默失效（#64253）两处值得安全审计关注
- **2.3.0 迁移阵痛**：subagent 行为变更 + pty 回归叠加，建议 Linux 用户关注 pty 0.6.0 升级路径
- **成本敏感**：缓存前缀被一次性 prompt 破坏的问题影响所有长会话用户的 token 开销

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-11-17

## 一、今日速览

Qwen Code 发布 v0.27.4 nightly 版本，带来 Web Shell 侧边栏工作区过滤与 DingTalk 适配器两项新功能。今日 PR 活动极为活跃，**Channels（渠道集成）生态快速扩张**——Aone Code、GitHub 相继成为新的托管渠道适配器。同时，1.0 Preview 事件总线内核落地进入关键阶段（#17045），headless 会话已默认切换至新内核，冻结日期为 11 月 21 日。

## 二、版本发布

**v0.27.4-nightly.20261116** ([Release](https://github.com/QwenLM/qwen-code/releases))
- `feat(web-shell)`: 侧边栏新增工作区过滤功能 ([#17244](https://github.com/QwenLM/qwen-code/pull/17244))
- `feat(managed-agent)`: 新增钉钉（DingTalk）适配器

## 三、社区热点 Issues

1. **#17045** — [P1] 1.0 Preview 循环内核逐面上主干的追踪 Issue（22 评论）。事件驱动内核 + 单一 `query()` 入口，是 1.x 架构演进的核心主线，11-21 冻结，社区高度关注。
2. **#17467** — [P1] managed-config_install 资源提交时丢失闭包依赖，Session 资源完整性受损，新暴露的 P1 级核心缺陷。
3. **#17258** — [P1] 订阅模型下窗口预算输出上限与固定 thinking_budget 冲突（`max_completion_tokens [4000] < thinking_budget [16384]`），长会话场景下直接阻断使用。
4. **#17371** — [P1] verify-pr 安全边界：追踪 PR #17185 经 17 轮评审后以“带残留风险合入”决策落地后的遗留风险清单。
5. **#17350** — [P2] Windows 回归：`run_shell_command` 输出被填充至终端宽度，**26–34% 的 shell 输出是空白字符**且被送入模型，浪费 token，v0.24.0 引入的回归。
6. **#17383** — [P2] Managed Runtime Broker 会话创建超时后永久卡在 `RECOVERY_BLOCKED`，无用户恢复路径。
7. **#17501** — [P2]（已关闭）固定 undici dispatcher 忽略 `NODE_EXTRA_CA_CERTS`，私有 CA 环境下 provider 调用失败，企业自建环境痛点。
8. **#16767** — [P2] Web Shell 中 turn 正常结束于 tool call 时误报“请求被中断”横幅，影响交互体验。
9. **#17077 / #17167** — [P3] 两个 merge-ready 的 Channels PR（注入分发模式、QQ 富媒体）因需双批准停滞 72h+，贡献者公开请求评审，反映评审带宽瓶颈。
10. **#13078** — 每日依赖 CVE 审计持续失败（54 评论），可能是新的高危漏洞或 npm audit 端点问题，安全侧需跟进。

## 四、重要 PR 进展

1. **#17511** — GitHub 成为第三个托管渠道适配器（继 email、DingTalk 之后），支持 @mention 评论接入会话。
2. **#17442** — Aone Code 渠道插件，以扩展插件形式实现，零核心改动，验证了渠道插件化架构。
3. **#17445** — headless 会话（`-p` / stream-json）默认运行于事件总线内核，#17045 落地的第 4 步。
4. **#17377** — 从 Qoder 移植模型可用性账本，为 fallback 链提供会话级、按模型粒度的健康状态机。
5. **#17228** — Web Shell Codex 风格托管 worktree 会话：默认隔离 worktree、detached HEAD、并行会话互不干扰。
6. **#17484** — `create_sub_session` 支持对已创建子会话追加跟进，强化多 Agent 协作编排。
7. **#17500** — CLI 原生屏幕阅读器呈现模式（opt-in），无障碍支持的重要进展。
8. **#17421** — Web Shell 新增繁体中文（zh-TW/zh-HK/zh-MO）独立 locale。
9. **#17509 / #17508 / #17510 / #17507** — managed-agent 一组重构：DDL 词法解析器替代正则解析、统一协调器去重与租约续期、Broker URL 规范化、验证 Failsafe 配置去重。
10. **#17440** — verify-pr 加固 watch-state 形状守卫与容器 nonce，收口 #17371 残留风险。

## 五、功能需求趋势

- **渠道集成（Channels）**：当前最热方向——GitHub、Aone Code、QQ、钉钉、通用出站 Webhook（#17374），社区在构建“会话触达一切 IM/平台”的能力。
- **1.0 内核统一**：事件总线内核逐面切换 + 统一聊天表面设计提案（#17460），架构收敛是 1.x 主线。
- **Web Shell / daemon 体验**：Codex worktree 对齐、后台任务解释（#17398）、智能交互 UI（#14019）、worktree 保留策略与快照（#17237）。
- **企业/托管部署（managed-agent）**：Runtime Broker 健壮性、会话恢复、权限模型拆分（#17471）持续投入。
- **无障碍与本地化**：屏幕阅读器模式、繁中支持。
- **多 Agent 编排**：子会话跟进、ACP 团队报告与审批联动（#15658）。

## 六、开发者关注点

- **CI 稳定性是最大噪音源**：Managed Agent gate（#14724，413 评论）、E2E（#11680）、Windows 单测（#11678）等主分支 CI 失败 Issue 长期霸榜，flaky 测试治理（deflake 流程）已成常态工作流。
- **Token 成本敏感**：Windows shell 输出空白填充（#17350）这类浪费 token 的问题引发关注。
- **私有 CA / 企业网络环境兼容性**：#17501 反映企业自建环境的证书链支持仍需打磨。
- **评审带宽不足**：多个 merge-ready PR 因双批准门槛停滞 72 小时以上，贡献者体验受损。
- **长会话 / 大上下文稳定性**：thinking_budget 冲突（#17258）、~230k prompt tokens 场景下的问题暴露出长会话预算管理短板。

---
*数据来源：github.com/QwenLM/qwen-code · 过去 24 小时 | 明日关注：#17045 冻结倒计时（11-21）*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*