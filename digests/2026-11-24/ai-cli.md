# AI CLI 工具社区动态日报 2026-11-24

> 生成时间: 2026-11-24 04:45 UTC | 覆盖工具: 7 个

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

**数据日期：2026-11-24**

---

## 一、生态全景

AI CLI 工具已全面进入 **Agent 化与平台化深水区**：各家不再满足于终端问答，而是围绕后台 daemon、桌面端、沙箱安全、企业网关构建完整产品体系。今日动态呈现三个鲜明特征——**安全与信任成为首要议题**（数据丢失、API key 明文落盘、A2A 认证强制化）、**用量透明度引发跨社区信任危机**（Claude Code 与 Codex 同时爆发配额核算投诉）、**沙箱与权限隔离成为军备竞赛**（bubblewrap/sandbox-exec/Seatbelt/microVM 等方案密集落地）。社区重心正从“功能可用”转向“长会话可靠性、状态诚实性与成本可观测性”。

---

## 二、各工具活跃度对比

| 工具 | Issues 动态 | PR 动态 | Release | 今日重点 |
|---|---|---|---|---|
| **Claude Code** | 高（10+ 热点，含 2 起新增数据丢失） | 低（仅 2 条社区 PR，均关闭） | v2.1.331 | 企业平台 Code Mode + OIDC 分组 |
| **OpenAI Codex** | 高（跨平台权限问题集中） | **很高（约 20 项官方 PR 密集合入）** | rust-v0.172.0 稳定版 + v0.174.0-alpha.1 | 插件签名验证、Guardian v3 |
| **Gemini CLI** | 高（50 条更新） | 高（34 条更新，多为官方） | v0.71.1 紧急安全补丁 + v0.72.0-preview | A2A Bearer Token 强制认证 |
| **Copilot CLI** | 中高（30 条，MCP 占 40%+） | 低（仅 1 条社区 PR） | v1.0.115-8 | 子代理用量分组统计 |
| **OpenCode** | 中高（10+ 热点） | 高（10+ 官方 PR） | v2.4.1（补丁） | 后台服务高负载稳定性修复 |
| **Qwen Code** | 中高（1.0 内核讨论 24 评论） | 高（10+ 官方 PR） | 无 | 1.0 事件驱动内核合入主线 |
| **Kimi Code CLI** | 无 | 无 | 无 | 停更状态 |

**观察**：Codex、Gemini CLI、Qwen Code、OpenCode 呈“官方高强度工程投入”模式；Claude Code 与 Copilot CLI 则 Issue 多、公开 PR 少，反映闭源开发流程。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **用量透明度 / 配额核算** | Claude Code（#111837/#111685 Ultra "Other" 84%）、Codex（#41220 追踪帖 101 评论）、Copilot CLI（子代理用量分组）、OpenCode（缓存命中率/TTFT 可见） | 跨社区最大公约数痛点，用户要求可信的 token/费用明细 |
| **沙箱与权限安全** | Claude Code（auto 模式越界删除）、Codex（Seatbelt 强制受限 #63270）、Gemini CLI（#19873 OS 沙箱、#22672 危险命令防护）、Qwen Code（bubblewrap 受限 Shell、microVM）、OpenCode（#63599 OS 级沙箱） | 全员投入，“自主操作安全边界”是行业性课题 |
| **长会话稳定性 / 压缩可靠性** | Claude Code（语言漂移、daemon 泄漏）、Qwen Code（压缩死锁 #15486）、Codex（压缩后 Goals 死循环）、Copilot CLI（后台通知 400、锁文件假死） | 上下文压缩是所有工具的共同薄弱环节 |
| **MCP 生态健壮性** | Copilot CLI（OAuth 刷新、Tasks 协议、40%+ 占比）、Qwen Code（elicitation #17316）、Gemini CLI（工具数 >128 报 400）、Codex（MCP Unix socket/auth PR） | MCP 已成为扩展核心，但认证、协议一致性、规模上限问题普遍 |
| **会话生命周期管理** | Claude Code（fork/resume 一致性）、OpenCode（上下文大小展示、Inbox 置顶）、Codex（归档任务删除）、Qwen Code（超大 transcript 回放） | pause/resume/fork/归档是高频需求 |
| **插件/扩展安全化** | Codex（端到端签名验证）、Gemini CLI（extension 安装全量确认）、Claude Code（插件 .trash 导致 hooks fail-open） | 供应链安全开始进入 CLI 工具视野 |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 企业集成最深（Bedrock/Foundry/网关 OIDC），自主任务能力激进但安全边界存疑 | 企业开发者、重度订阅用户 | 闭源、opinionated，auto 权限模式激进；官方 PR 不可见 |
| **OpenAI Codex** | 桌面端 Work 模式 + Guardian 自动审批 + 插件签名体系，工程节奏最快 | ChatGPT 生态用户、桌面优先开发者 | Rust 重写、双平台桌面端、供应链安全系统化投入 |
| **Gemini CLI** | Agent 可观测性与调度智能性（AST 感知、状态诚实性） | 开源社区、成本敏感型开发者 | 开源、依赖批量治理、安全响应快（紧急补丁当天发） |
| **Copilot CLI** | MCP 与 GitHub 生态深度绑定，企业管控能力 | GitHub 原生用户、企业策略管控场景 | 开源但官方迭代节奏较慢，回归频发 |
| **OpenCode** | 桌面端 IDE 化 + 内置浏览器 + Agent×浏览器协同，差异化最鲜明 | 桌面重度用户、开源模型（Ollama等）用户 | 开源、多 Provider 中立、Cloudflare 分布式部署探索 |
| **Qwen Code** | 1.0 架构重构（事件驱动内核 + Managed Agent 无状态化） | 中文开发者、自托管/多端用户 | 开源、web shell + microVM 验证隔离、国际化领先（显示翻译已落地） |
| **Kimi Code CLI** | — | — | 近乎停滞，生态存在感最弱 |

---

## 五、社区热度与成熟度

- **第一梯队（热度高 + 迭代快）**：**Codex**（Issue 101 评论追踪帖 + 约 20 项官方 PR/日，工程节奏最强）、**Gemini CLI**（50 Issues / 34 PRs，开源协作最健康）。
- **热度高但公开迭代弱**：**Claude Code**（Issue 讨论量与严重度最高——数据丢失、语言漂移，但 PR 通道近乎静默，用户只能“报了等”）。
- **快速上升期**：**OpenCode**（浏览器+桌面 IDE 化方向引爆新需求）、**Qwen Code**（1.0 重构期，讨论集中且工程推进有序）。
- **成熟但摩擦多**：**Copilot CLI**（MCP 全链路问题 + 版本回归频发，处于“功能广但稳定性还债”阶段）。
- **掉队**：**Kimi Code CLI** 完全无活动。

---

## 六、值得关注的趋势信号

1. **“信任基础设施”将成为下一轮竞争焦点**：配额透明度（Codex 101 评论、Claude Ultra 投诉）与状态诚实性（Gemini 误报 GOAL success、Claude 中断误标 user-rejected）表明——用户对 Agent 的信任正从“能力”转向“可验证性”。具备细粒度用量 API 和诚实的失败上报的工具将赢得重度用户。

2. **沙箱技术栈收敛于 OS 原生方案**：bubblewrap（Qwen、OpenCode）、sandbox-exec（OpenCode、Codex Seatbelt）、microVM（Qwen）多线并行。开发者选型时应将“是否有 OS 级隔离”作为生产环境硬指标——Claude Code 两起仓库外删除事件即是反面教材。

3. **Agent 状态误报是被低估的系统性缺陷**：三个工具（Gemini #22323/#30427、Claude #86001、Copilot #5556）同时出现“向模型误报状态”类 bug，直接影响 Agent 自主决策正确性，属于下一阶段可靠性攻坚的核心。

4. **桌面化 + 浏览器协同是新的产品化方向**：OpenCode 内置浏览器（导入登录态、Agent 操作页面）、Codex Work 模式、Claude 桌面端，CLI 工具正演变为“通用桌面 Agent”，桌面端权限模型设计滞后于功能推进，是当前缺陷密集区。

5. **对开发者的实操建议**：
   - 生产/CI 场景暂缓依赖 auto/full-access 类自主权限模式，等待沙箱边界成熟；
   - 重度 MCP 用户暂缓升级 Copilot CLI 近期版本；
   - 关注 Codex 插件签名要求变化（插件开发者需提前适配）；
   - 长会话场景建立外部保活/定期换会话习惯（各工具 daemon/压缩缺陷均未根治）。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-11-24，来源：anthropics/skills）

> 说明：本期热门 PR 的评论数据缺失（undefined），以下排序依据为 PR 的热度关联 Issue、更新活跃度与议题重要性综合评定。

---

## 一、热门 Skills 排行（PR）

| # | PR | 主题 | 状态 |
|---|---|---|---|
| 1 | [#1742](https://github.com/anthropics/skills/pull/1742) | **mcp-builder 兼容修复**：适配 `mcp>=2.0.0` 的 `streamable_http_client` 重命名及自定义 HTTP 头新配置方式，修复连接脚本破坏性问题 | OPEN |
| 2 | [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator 触发评估修复**：隔离并行 worker 探测、修复 Windows `select()` 失败，消除误报/漏报（直接回应 Issue #556、#1352 两大热点） | OPEN |
| 3 | [#1245](https://github.com/anthropics/skills/pull/1245) | **新增 notion-spec-to-implementation + quantitative-resume-auditor**：将产品/技术 Spec 转化为 Notion 可执行任务；简历量化审计 | OPEN |
| 4 | [#1980](https://github.com/anthropics/skills/pull/1980) | **webapp-testing 安全加固**：移除 `shell=True`，消除命令注入风险（CWE-78） | OPEN |
| 5 | [#2019](https://github.com/anthropics/skills/pull/2019) | **xlsx 外部链接误报修复**：支持工作表级 defined names 与别名解析，修复 recalc.py 漏检 | OPEN |
| 6 | [#525](https://github.com/anthropics/skills/pull/525) | **Pyxel 复古游戏开发 Skill**：Python 复古游戏创建/调试/无头验证工作流，存活超 8 个月，社区生命力强 | OPEN |
| 7 | [#1703](https://github.com/anthropics/skills/pull/1703) | **md2video-audio**：Markdown → Marp 幻灯 → 带真人语音的 MP4 视频，零成本内容创作方向 | OPEN |
| 8 | [#2108](https://github.com/anthropics/skills/pull/2108) | **文档澄清**：明确文档类 Skills 的快照状态与 `~/.claude/skills/synced/` 同步机制，回应分发混乱问题 | OPEN |

---

## 二、社区需求趋势（Issues 提炼）

1. **安全与信任边界**（最热）：[#492](https://github.com/anthropics/skills/issues/492)（46 评论）——社区 Skill 冒用 `anthropic/` 命名空间，用户可能在误信下授予过高权限，签名/命名空间隔离是头号诉求。
2. **组织级协作与分发**：[#228](https://github.com/anthropics/skills/issues/228)（17 评论）——org 内 Skill 共享库/分享链接；[#189](https://github.com/anthropics/skills/issues/189) 插件重复安装污染上下文。
3. **Skill 评估/触发可靠性工具链**：[#556](https://github.com/anthropics/skills/issues/556)（13 评论）与 [#1352](https://github.com/anthropics/skills/issues/1352)——`run_eval.py` 触发率恒为 0，评估基础设施的可信度是 Skill 作者的核心痛点。
4. **上下文效率与 Agent 记忆**：[#1487](https://github.com/anthropics/skills/issues/1487)（claude-api 单次注入 ~156k token）与 [#1329](https://github.com/anthropics/skills/issues/1329)（compact-memory 符号化压缩 agent 状态）——Skills 的 token 经济学成为新焦点。
5. **AI 输出质量治理**：[#1385](https://github.com/anthropics/skills/issues/1385) 校准→对抗审查→交付验证三道质量门；[#412](https://github.com/anthropics/skills/issues/412) agent-governance 安全治理模式。
6. **文档/办公场景健壮性**：docx/xlsx/pptx 脚本的边界 bug（[#2018](https://github.com/anthropics/skills/issues/2018)、[#1868](https://github.com/anthropics/skills/issues/1868)）持续有反馈。

---

## 三、高潜力待合并 Skills（活跃 OPEN PR）

- **[#1298](https://github.com/anthropics/skills/pull/1298)** skill-creator 评估修复 —— 对应两个高评论 Issue，落地价值最高。
- **[#1742](https://github.com/anthropics/skills/pull/1742)** mcp-builder 适配 MCP v2 —— MCP 生态快速演进，兼容性刚需。
- **[#2019](https://github.com/anthropics/skills/pull/2019)** xlsx defined-names 修复 —— 有明确关联 Issue #2013，典型 bugfix 快通道。
- **[#1997](https://github.com/anthropics/skills/pull/1997)** skill-creator YAML frontmatter 解析修复 —— 修 normal parse 偏差，直接影响元数据正确性。
- **[#525](https://github.com/anthropics/skills/pull/525)** Pyxel —— 长期维护、结构完整，是功能型新 Skill 中最成熟的候选。
- **gerardrecinto 三连修**（[#1975](https://github.com/anthropics/skills/pull/1975)/[#1976](https://github.com/anthropics/skills/pull/1976)/[#1977](https://github.com/anthropics/skills/pull/1977)）—— 均有对应 Issue 编号、改动小而准，合并概率高。

---

## 四、生态洞察（一句话）

**社区最集中的诉求已从"贡献新 Skill"转向"可信与可靠"——即命名空间安全、可复现的触发评估工具链、以及文档/办公类官方 Skills 的工程健壮性。**

---

# Claude Code 社区动态日报 · 2026-11-24

## 1. 今日速览

今日发布 **v2.1.331**，重点扩展了 Code Mode 在企业级托管平台（Amazon Bedrock、Google Agent Platform、Microsoft Foundry 等）终端会话中的支持，并新增网关 OIDC 分组解析能力。社区方面，数据丢失类问题持续发酵——Windows 平台出现删除用户整个数据目录的严重案例，以及自主任务越界删除仓库外文件的新报告；语言漂移（日语回复漂移为英语）问题仍是讨论热度最高的 Issue。

---

## 2. 版本发布

### v2.1.331
- **Code Mode 企业平台支持**：终端会话中的 Code Mode 现已支持 Amazon Bedrock、Google Cloud Agent Platform、Microsoft Foundry 及 Claude Platform on AWS，企业自托管用户迎来重要更新。
- **网关 OIDC 增强**：Claude Apps 网关新增 `oidc.groups_jsonpath` 配置，支持从对象列表的匹配条目中读取用户组信息，改善企业身份集成灵活性。

---

## 3. 社区热点 Issues

**⚠️ 严重/数据丢失类**

1. **[#106818](https://github.com/anthropics/claude-code/issues/106818) Windows 上例行清理永久删除用户整个数据文件夹**
   auto 权限模式下，Claude Code 在多会话并行运行时执行清理操作，删除了仓库外的用户数据目录。标记 `data-loss`，属于最高优先级风险类问题。

2. **[#111921](https://github.com/anthropics/claude-code/issues/111921) 自主任务未审计测试即全量执行，并删除仓库外文件**（今日新建）
   macOS 桌面端自主任务越界操作，模型在“审查-验证-部署”流程中直接运行所有测试并删除用户文件。与 #106818 共同指向 auto 模式安全边界问题。

3. **[#97847](https://github.com/anthropics/claude-code/issues/97847) 插件同步更新将打开会话的插件目录移入 .trash，其 hooks 随之 fail-open**
   同步机制与活跃会话冲突导致 hook 安全机制失效，属于安全设计层面的隐患。

**🔥 高热度讨论**

4. **[#96326](https://github.com/anthropics/claude-code/issues/96326) 日语回复漂移为英语，CLAUDE.md 规则无法约束**（25 评论 / 42 👍）
   本期热度第一。Opus 5.5 长会话中阅读英文工具输出后用户可见回复漂移为英语，纠正后仍复发。多语言用户体验的核心痛点。

5. **[#94393](https://github.com/anthropics/claude-code/issues/94393) Monitor 工具不遵守 persistent 标志，实际存活约 30 分钟**（14 评论 / 32 👍）
   schema 允许 timeout_ms 上限 3600000，但即使活跃会话中监控也会提前终止，影响长时监控工作流。

6. **[#87891](https://github.com/anthropics/claude-code/issues/87891) 后台 daemon 不回收陈旧 worker，六周泄漏 64 进程 / ~7.1 GB 内存**
   macOS 上已复现的资源泄漏，daemon 重启时还会重新“收养”孤儿进程。

**🛠 核心功能缺陷**

7. **[#86001](https://github.com/anthropics/claude-code/issues/86001) 中断执行中的工具被标记为 "user-rejected"，模型被误导为“工具未运行”**
   引擎枚举中明明有 `interrupted` 值却不使用，导致模型状态判断错误，影响 agent 可靠性。

8. **[#87984](https://github.com/anthropics/claude-code/issues/87984) 会话后台化后以新 session id 继续，--resume 出现停滞副本**
   会话管理核心缺陷，容易造成工作丢失与恢复混乱。

9. **[#111837](https://github.com/anthropics/claude-code/issues/111837) Ultra 周配额被不明 "Other" 用量耗尽（84%）**（关联 [#111685](https://github.com/anthropics/claude-code/issues/111685)）
   两起独立报告指向配额计量透明度问题，账单类投诉明显增多。

10. **[#30675](https://github.com/anthropics/claude-code/issues/30675) 跨产品共享上下文需求：Claude Code / Claude.ai / Cowork 上下文孤岛**（17 评论 / 26 👍）
    最受关注的功能请求，用户希望 skills 和上下文在产品套件间互通。

---

## 4. 重要 PR 进展

过去 24 小时仅 2 条 PR 更新，均为社区 PR 且已关闭，无官方 PR 动态：

1. **[#45553](https://github.com/anthropics/claude-code/pull/45553) resolve duplicate IPs**（CLOSED）
   历史社区提交，处理重复 IP 记录，今日更新后维持关闭状态。

2. **[#11713](https://github.com/anthropics/claude-code/pull/11713) feat: Add developer-utilities plugin**（CLOSED）
   提供 5 个社区请求的实用命令；值得注意的是作者注明会话管理类命令已被官方原生功能取代后移除，侧面反映官方功能追赶社区需求的速度。

---

## 5. 功能需求趋势

从本期 Issues 提炼出以下方向：

- **跨产品上下文互通**：Claude Code / Claude.ai / Cowork / 移动端的共享记忆与 skills 同步（#30675），呼声最高。
- **会话生命周期管理**：Pause/Hibernate & Resume 原生控制（#111870）、会话 fork/后台化/resume 的一致性（#87984、#73742）。
- **后台 Agent 可靠性**：孤儿子 agent 治理（#74133）、headless 模式后台任务通知（#85129）、失败 agent 状态恢复（#75433）——后台/daemon 架构是缺陷密集区。
- **企业集成**：OIDC/网关配置（本期 release 已部分响应）、非 Claude 模型经 LiteLLM 代理的兼容性（#111897）。
- **用量透明度**：配额计量与账单可见性（#111837、#111685），Ultra 用户投诉集中。

---

## 6. 开发者关注点

- **Auto 权限模式的安全边界是最大隐忧**：#106818、#111921 两起数据丢失均发生在 auto 模式下，社区对“自主清理/删除”操作的沙箱约束呼声强烈。建议生产环境暂缓使用 auto 模式处理仓库外路径。
- **多语言输出不稳定**：CLAUDE.md 语言规则对长会话约束力弱（#96326），非英语用户需频繁手动纠正。
- **后台 daemon 生态不成熟**：内存泄漏（#87891）、worker 误判崩溃（#73600）、环境变量丢失（#86290）、自更新破坏 worktree（#75609）等长期未修复问题持续积累。
- **长时任务工具限制**：Monitor 工具 30 分钟硬性存活上限（#94393）与 headless 模式后台任务被杀（#85129），影响 CI/CD 与监控自动化场景，需开发者自行设计外部保活方案。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-11-24）

## 1. 今日速览

今日 Codex 发布 **rust-v0.172.0 稳定版**，带来终端会话跳转与斜杠命令 Tab 补全等新功能，同时推送了 v0.174.0-alpha.1 预发布。社区方面，**配额异常消耗的跨用户追踪帖（#41220）持续发酵，评论已达 101 条**；桌面端 Work 模式的权限/沙箱问题成为 macOS 与 Windows 双平台的集中爆发点。PR 侧，官方机器人 copyberry 密集合入了插件签名验证、Guardian 审批优化等约 20 项改进。

## 2. 版本发布

**[rust-v0.172.0](https://github.com/openai/codex/releases/tag/rust-v0.172.0)**（稳定版）
- 支持从搜索结果和转录中跟随后续线程链接，在终端打开已保存的对话和嵌套 Agent（#62332）
- 按 `Tab` 可补全斜杠命令参数，如 `/mcp lo` → `/mcp login`（#62343）
- 支持在任务组之间跳转

另发布预发布版本：[rust-v0.174.0-alpha.1](https://github.com/openai/codex/releases)、rust-v0.172.0-alpha.2.1、rust-v0.171.0-alpha.13.2（无详细 changelog）。

## 3. 社区热点 Issues

1. **[#41220](https://github.com/openai/codex/issues/41220)** [bug/rate-limits] 配额异常消耗与用量核算不一致的跨用户追踪帖，101 条评论持续增长，是当前社区最大痛点，涉及订阅额度异常快速耗尽。
2. **[#58677](https://github.com/openai/codex/issues/58677)** [bug/sandbox] macOS 桌面端创建聊天后 Full access 权限控件消失，会话实际仍受限，31 条评论。
3. **[#42950](https://github.com/openai/codex/issues/42950)** [bug/app] Codex Sites 创建的公开站点被 Cloudflare 拦截，外部访客无法访问，影响站点功能可用性。
4. **[#62975](https://github.com/openai/codex/issues/62975)** [bug/Windows] ChatGPT Work 发送首条消息后权限选择器消失，Work 主页强制 Cloud/TPP 且无 Local 选项，Windows 端高赞问题。
5. **[#46182](https://github.com/openai/codex/issues/46182)** [enhancement] 桌面端已归档云任务缺少删除操作，仅有“取消归档”，15 👍 表明需求强烈。
6. **[#62733](https://github.com/openai/codex/issues/62733)** [bug/Windows] 升级到 26.1117.3838.0 后蓝牙听写失效（clock=unavailable），为近期版本回归问题。
7. **[#62700](https://github.com/openai/codex/issues/62700)** [CLOSED] macOS 26.1117.31558 本地 skills 从斜杠菜单消失，已修复，反映回归问题修复节奏尚可。
8. **[#63270](https://github.com/openai/codex/issues/63270)** [bug/sandbox] macOS Work 模式即使选择 Full access，工具内核仍强制 workspace-only Seatbelt 沙箱，与 #58677/#62975 构成权限体系系统性问题。
9. **[#63539](https://github.com/openai/codex/issues/63539)** [bug] “That approval request is no longer active” 报错频繁中断 Work/Codex 工作流，用户反馈严重影响生产力。
10. **[#14099](https://github.com/openai/codex/issues/14099)** [bug/TUI] Windows CLI 粘贴极慢的老问题（3 月至今未解决），Windows TUI 性能长期欠账。

## 4. 重要 PR 进展

1. **[#63515](https://github.com/openai/codex/pull/63515)** — `codex exec` 遵循配置和已保存的审批策略，不再强制 `never`，修复非交互场景审批行为。
2. **[#63489](https://github.com/openai/codex/pull/63489)** / [#63487](https://github.com/openai/codex/pull/63487) / [#63484](https://github.com/openai/codex/pull/63484) — 插件归档签名验证体系落地：新建验证 crate、解压前验证签名、支持 Plugin Service 签名密钥，显著强化供应链安全。
3. **[#63514](https://github.com/openai/codex/pull/63514)** / [#63513](https://github.com/openai/codex/pull/63513) — Guardian v3 自动审批优化：预热 root reviewer、首判前读取用户指令，降低审批延迟并提升判定准确性。
4. **[#63523](https://github.com/openai/codex/pull/63523)** — 回合设置被中断时保留已接受的提示词，避免恢复历史丢失输入。
5. **[#63520](https://github.com/openai/codex/pull/63520)** — TUI 恢复前等待终端前台所有权，修复 Ctrl-Z 后 `bg` 导致的终端设置冲突。
6. **[#63497](https://github.com/openai/codex/pull/63497)** — 桌面端 MCP 改走 Unix socket，解决 SSH 转发替换监听后旧连接挂起问题。
7. **[#63532](https://github.com/openai/codex/pull/63532)** — 允许扩展为 MCP 服务器提供逐请求认证，支持凭据刷新而无需重启会话。
8. **[#63533](https://github.com/openai/codex/pull/63533)** — 从 Responses WebSocket 握手中刷新模型目录，避免 `x-models-etag` 更新滞后。
9. **[#63476](https://github.com/openai/codex/pull/63476)** — 网关注册纳入本地托管配置，管理员无需在两处分别配置网关 URL 与 OAuth。
10. **[#63537](https://github.com/openai/codex/pull/63537)** — 本地 code-mode host 空闲 5 秒后回收，优化资源占用。

## 5. 功能需求趋势

- **权限与沙箱可控性**：Full access 失效、Seatbelt 强制限制、权限选择器消失等问题集中，用户强烈要求桌面端权限模型透明可靠（#58677/#62975/#63270）。
- **会话与工作流管理**：归档任务删除（#46182）、线程标题自定义模板（#29677）、审批请求生命周期稳定性（#63539）等管理能力需求突出。
- **用量透明度**：配额核算与消耗监控是最高频诉求（#41220/#63097/#63522），用户希望获得可信的用量明细。
- **Hook 与扩展机制**：PermissionRequest hook 需要面向用户的审批信号（#28833，13 👍），app-server 工具策略契约文档需求（#52780）。
- **跨平台体验一致性**：Windows 端 TUI 性能、安装脚本健壮性（#14099/#20782）、远程配对（#60347）等长期待改进。

## 6. 开发者关注点

- **配额信任危机**：Pro/Plus 用户持续报告额度异常快速耗尽，缺乏官方核算明细，跨报告追踪帖已积累 101 条评论，是当前最大的社区信任风险点。
- **桌面端 Work 模式权限回归**：26.1117.x 版本在 macOS 与 Windows 上均出现权限控件消失/沙箱强制受限，且审批请求失效报错频发，建议受影响用户暂缓升级并关注 #62975/#63270 后续修复。
- **CI/自动化场景**：`codex exec` 审批策略修复（#63515）与 npm 二进制未公证导致的 macOS 扫描风暴（#23649）对脚本化/调度场景用户影响较大。
- **插件生态安全化**：本周签名验证系列 PR 表明官方正系统性地为 Plugin Service 构建端到端签名校验，插件开发者应关注归档签名要求的变化。
- **长会话稳定性**：上下文压缩后 Goals 死循环（#47707）、symlink rollout 恢复失败（#56162）等长任务/长历史场景问题仍待解决。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-11-24

## 📌 今日速览

今日 Gemini CLI 发布了 **v0.71.1 紧急补丁版本**，核心修复为 A2A 服务器的 Bearer Token 认证强制执行与请求输入校验（安全相关，建议尽快升级）。同时 **v0.72.0-preview.0 预览版**也已放出。社区方面，Agent/Subagent 相关问题仍是讨论焦点——虚假成功上报、agent 挂起、subagent 调度不足等 P1 级 Bug 持续活跃，多项 workstream-rollup 议题今日集中更新。

---

## 🚀 版本发布

### v0.71.1（补丁版，重点）
- **安全修复**：`fix(a2a-server)` 强制 Bearer Token 认证与请求输入校验（PR [#30420](https://github.com/google-gemini/gemini-cli/pull/30420)，cherry-pick 至 [#30429](https://github.com/google-gemini/gemini-cli/pull/30429)）
- 🔗 [Release v0.71.1](https://github.com/google-gemini/gemini-cli/releases/tag/v0.71.1)

### v0.71.0
- 包含 v0.70.0 changelog 整理及版本提升等常规变更
- 🔗 [Release v0.71.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.71.0)

### v0.72.0-preview.0（预览）
- `fix(core)`: 修复 `dir/**` 模式下嵌套 `.gitignore` 否定规则的处理（PR [#30370](https://github.com/google-gemini/gemini-cli/pull/30370)）
- `fix(cli)`: Windows 主目录展开修复
- 🔗 [Release v0.72.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.72.0-preview.0)

### v0.71.0-nightly（今日构建）
- 同样包含 A2A 安全修复，版本号 `nightly.20261124.gaafdfdfb5`

---

## 🔥 社区热点 Issues（Top 10）

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** · P1 · Subagent 达到 MAX_TURNS 后误报 "GOAL success"，掩盖了实际中断。**14 条评论，今日最热**。这直接影响用户对 agent 结果的信任度，是可观测性层面的关键缺陷。

2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** · P2 · 利用 Gemini 3 模型原生 bash 能力 + 零依赖 OS 沙箱与执行后意图路由。大型 enhancement，涉及安全与 UX 平衡，9 条评论。

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** · P1 · Generalist agent 无限挂起（用户等待超过 1 小时），8 👍。与今日 PR #30415（web search 挂起修复）相关，是当前最影响体验的 Bug 之一。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** · P2 · 评估 AST 感知的文件读取/搜索/代码库映射（EPIC）。目标是减少读偏移、降低 token 噪音，代表 agent 效率优化的大方向。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** · P2 · Gemini 几乎不主动使用自定义 skills 和 subagents，只有显式指示才会用。7 条评论，反映 agent 调度智能性不足。

6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** · P2 · Browser Agent 完全忽略 `settings.json` 中的配置覆盖（如 maxTurns）。配置系统一致性问题。

7. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** · P2 · 工具数超过限制（>128）时触发 400 错误，期望 agent 更智能地限定工具作用域。对重度 MCP 用户影响明显。

8. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)** · P2 · Agent 应阻止/劝阻危险操作（如 `git reset --force`、DB 修改）。安全性诉求，与今日 a2a-server 安全修复方向呼应。

9. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** · P1 · `get-shit-done` output hook 导致 CLI 崩溃，用户在收尾阶段前功尽弃。

10. **[#30427](https://github.com/google-gemini/gemini-cli/issues/30427)** · 新 issue · Ctrl-C 中断 MCP 工具调用后，即使服务端已完成操作，恢复会话时仍向模型误报 "Operation cancelled"。**今日新提交**，与状态误报类问题（#22323）同源，值得持续关注。

---

## 🔀 重要 PR 进展（Top 10）

1. **[#30415](https://github.com/google-gemini/gemini-cli/pull/30415)** · P1 · `fix(core)`: 为 `google_web_search` 增加时间限制，abort 后停止重试。直接解决 #29594 报告的 agent 挂起问题。
2. **[#30420](https://github.com/google-gemini/gemini-cli/pull/30420)** · 已合并 · `fix(a2a-server)`: 强制 Bearer Token 认证 + 请求输入校验，替换占位 auth 逻辑。**今日最重要的安全修复**。
3. **[#30441](https://github.com/google-gemini/gemini-cli/pull/30441)** · 扩展安装/更新确认现在完整覆盖 hooks、context files 等全部新增内容，并在更新时对比差异重新请求确认。Extension 安全透明度提升。
4. **[#30423](https://github.com/google-gemini/gemini-cli/pull/30423)** · P1 · npm 依赖组批量更新（69 项），含 simple-git、@octokit/rest 等。
5. **[#30433](https://github.com/google-gemini/gemini-cli/pull/30433) / [#30431](https://github.com/google-gemini/gemini-cli/pull/30431)** · P2 · zod 从 3.x 大版本升级至 4.6.6（注意：上游曾有恶意提交事件，升级含安全考量）。
6. **[#30435](https://github.com/google-gemini/gemini-cli/pull/30435) / [#30434](https://github.com/google-gemini/gemini-cli/pull/30434)** · body-parser、proxy-addr 升级，均标注安全相关。
7. **[#30430](https://github.com/google-gemini/gemini-cli/pull/30430)** · P1 · MCP TypeScript SDK 从 1.23.0 升至 1.32.0，跟进 MCP 生态。
8. **[#30207](https://github.com/google-gemini/gemini-cli/pull/30207)** · P0 · 已合并 · esbuild 前清理 `bundle/`，修复自 11-05 起 nightly 发布持续失败的 "413 Request Entity Too Large"（tarball 含 70MB 陈旧构建产物）。
9. **[#30210](https://github.com/google-gemini/gemini-cli/pull/30210)** · 已合并 · WebFetch 取消后停止 fallback 处理，避免取消后无效计算。
10. **[#30429](https://github.com/google-gemini/gemini-cli/pull/30429)** · 已合并 · 自动 cherry-pick 生成 v0.71.1 补丁的发布流程 PR。

---

## 📈 功能需求趋势

- **Agent 可观测性与状态诚实性**：MAX_TURNS 误报成功（#22323）、MCP 取消误报（#30427）、/bug 报告缺 subagent 上下文（#21763）——社区强烈要求 agent 状态透明可信。
- **Agent 稳定性**：挂起问题成系列（#21409、#22465、#22186），取消/超时处理是修复主线（PR #30415、#30210）。
- **代码理解深度**：AST 感知工具链（#22745、#22746）+ Token 节俭的“外科手术式读取”（#19561），共同指向 agent 效率优化。
- **Agent 协作架构**：subagent 并行协作、共享内存（#18287）、任务追踪持久化（#18836、#21000）等长期路线图持续推进。
- **安全性强化**：危险命令防护（#22672）、bash 沙箱方案（#19873）、extension 确认机制（PR #30441）与今日 A2A 认证修复形成一致趋势。

## 🛠️ 开发者关注点（痛点总结）

1. **Subagent 可靠性不足**：挂起、误报、不主动调用、symlink 不识别（#20079）、Wayland 下 browser agent 失败（#21983）。
2. **配置不生效**：Browser Agent 无视 `settings.json` 覆盖，配置合并逻辑需重构。
3. **上下文/Token 成本**：大文件读取 "firehose" 式灌入导致上下文膨胀（基线约 36.6k tokens/回合），社区期待更精细的读取策略。
4. **工作区卫生**：模型在随机位置生成临时脚本，增加提交前清理负担（#23571）。
5. **扩展性与限制**：>128 工具触发 400 错误，重度 MCP 用户受影响（#24246）。

---
*数据来源：github.com/google-gemini/gemini-cli · 统计窗口：过去 24 小时（Issues 50 条 / PRs 34 条更新）*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-11-24）

## 1. 今日速览

今日发布 **v1.0.115-8**，重点改进子代理用量统计与 Assisted Permissions 审查模型的容错回退。Issue 活跃度较高（30 条更新），**MCP 生态相关问题持续占据主导**（Tasks 扩展、OAuth 刷新、会话锁、动态 headers 等），另有多条 1.0.110+ 引入的回归报告值得关注（ACP reasoning 消失、Jenkins MCP 端点失效）。

---

## 2. 版本发布

### v1.0.115-8
- `--usage-output-file` 现按配置名称（而非调用 ID）对子代理用量分组，并统计每个子代理的启动次数，便于成本核算。
- Assisted Permissions 支持在首个审查模型卡住或失败时切换备用模型，减少不必要的审批弹窗。

---

## 3. 社区热点 Issues

1. **Worktrees 应默认关闭**（#2243，👍 21，OPEN）
   用户反馈会话产出数千行代码却无法合并回主 worktree，呼吁默认禁用、手动开启。今日最高赞，反映社区对自动 worktree 的强烈不满。
   https://github.com/github/copilot-cli/issues/2243

2. **远程 MCP OAuth 不做静默 refresh_token 刷新**（#4203，👍 6，OPEN）
   access token 过期后强制交互式重新登录并丢弃工具，违反 RFC 6749 §6。影响所有长期使用远程 MCP 服务器的用户。
   https://github.com/github/copilot-cli/issues/4203

3. **MCP Tasks 声明与实际行为不符**（#5540 / #5555，OPEN / CLOSED）
   客户端在初始化时声明支持 Tasks，但对 `taskSupport: "required"` 工具不发送 task augmentation，且声明 Tasks 扩展却拒绝 `CreateTaskResult`。MCP 协议一致性核心缺陷。
   https://github.com/github/copilot-cli/issues/5540 | https://github.com/github/copilot-cli/issues/5555

4. **后台 shell 完成通知触发 HTTP 400 `content[].thinking`**（#4946，OPEN）
   长时任务跨回合完成后，通知注入新回合导致请求被拒，会话可靠性问题。
   https://github.com/github/copilot-cli/issues/4946

5. **ACP 模式 1.0.110 起不再输出 reasoning summaries**（#5556，OPEN，回归）
   `agent_thought_chunk` 事件消失，ACP 客户端“思考中”区块黑屏，用户长时间无反馈。
   https://github.com/github/copilot-cli/issues/5556

6. **崩溃遗留 `inuse.<pid>.lock` 导致会话无法恢复**（#4805，OPEN）
   会话数据本身完好但被过期的生命周期锁永久阻塞，属于数据完好却“假死”的典型案例。
   https://github.com/github/copilot-cli/issues/4805

7. **启动时 session-ID 切换静默丢弃本地 stdio MCP 服务器**（#4920，OPEN）
   `--resume` 和 `/new` 均可复现，MCP 服务器连接到占位会话后被无声丢弃。
   https://github.com/github/copilot-cli/issues/4920

8. **Windows 提权会话创建 MCP 锁文件后普通会话无法启动**（#5255，OPEN）
   提权会话创建的 `.mcp-writer.lock` 导致非提权会话 `os_error=5`，Windows 权限模型痛点。
   https://github.com/github/copilot-cli/issues/5255

9. **非交互模式下扩展工具权限请求永久挂起**（#5381，OPEN）
   `copilot -p` 中 custom-tool 权限无人应答直到被 kill，且 `--allow-tool` 无法命名扩展工具，影响 CI/自动化场景。
   https://github.com/github/copilot-cli/issues/5381

10. **云沙盒会话断连后永不重连**（#5552 / #5553，OPEN）
    云端 sandbox 会话在工具调用后 "Live connection unavailable"，Android 端后台 2-3 分钟即掉线，重试常失败。
    https://github.com/github/copilot-cli/issues/5552

---

## 4. 重要 PR 进展

> 过去 24 小时仅 1 条 PR 更新：

1. **#5554 [CLOSED] 为 CLI 容器添加可选连接 token 生成**（@brunobraison 类贡献，社区提交）
   设置 `COPILOT_CONNECTION_TOKEN_GENERATE=true` 可在 headless CLI 启动时打印随机 token，让本地 SDK 客户端无需预先在宿主机创建密钥即可连接。降低 headless 模式试用门槛，已被关闭（疑似由维护者以其他方式实现或需调整）。
   https://github.com/github/copilot-cli/pull/5554

---

## 5. 功能需求趋势

- **MCP 生态健壮性**（最热点）：OAuth 静默刷新、动态 headers（`headersHelper` 对齐 Claude Code）、JSONC 注释支持（#4323）、Tasks 协议一致性——MCP 相关 Issue 占比超 40%。
- **会话稳定性与可恢复性**：锁文件回收、ack 超时后的会话自救、云沙盒重连。
- **非交互/自动化模式**：`-p` 模式的权限处理、`task_complete` 输出保证（#2482）、ACP 事件流完整性。
- **企业管控**：沙盒与配置的 enterprise policy 强制下发（#4446）。
- **输出质量**：移除硬编码的 100 字回复限制（#5558）、跨会话历史记忆（#2048）。
- **默认行为可配置化**：worktree 开关、实验性功能的保留与文档。

---

## 6. 开发者关注点

1. **MCP 是当前最大痛点**：从认证（OAuth/租户）、协议（Tasks）、锁文件到配置解析，全链路都有反馈，建议重度 MCP 用户暂缓升级并关注 patch 节奏。
2. **近期版本回归频发**：1.0.93 起 Jenkins MCP 端点失效（#5559）、1.0.110 起 ACP reasoning 消失（#5556），升级前建议查阅 release notes 与相关 Issue。
3. **Windows 用户摩擦多**：提权锁冲突、插件卸载 access denied、`--no-warnings` 兼容噪音（#1446）。
4. **长会话可靠性**：后台任务、ack 超时、锁残留等问题集中出现在长时间交互会话中，重度用户建议养成定期 resume/新会话的习惯。
5. **可观测性需求上升**：本次 release 的子代理用量分组统计正响应了社区对成本透明化的诉求，期待后续扩展到 token/费用维度。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-24

## 一、今日速览

OpenCode 今日发布 **v2.4.1**，修复了 macOS 12 上的会话保存问题。桌面端浏览器功能（v2.4.0 引入）持续引发热议，围绕浏览器面板与 Agent 协同的 Feature Request 成为今日最活跃的需求方向。此外，`opencode-go` 网络性能问题（TTFT 随 prompt 长度增长）是今天最受关注的稳定性话题，维护者已提交针对后台服务高负载稳定性的修复 PR。

---

## 二、版本发布

### v2.4.1（2026-11-24）
- **macOS 12 会话修复**：解决了旧版 SQLite 环境下无法保存 assistant 消息的问题（[#65771](https://github.com/anomalyco/opencode/pull/65771)）
- **纯配置 Provider 显示模型**：仅通过 config 配置的 Provider（如 Ollama）现在能正确展示其模型列表

### v2.4.0（近期）
- **内置桌面浏览器**：支持从 Chrome/Edge/Firefox/Safari 导入登录状态与浏览历史，可安装 Chromium 扩展，所有数据保存在一个持久化的桌面 profile 中——聊天链接可直接以已登录状态打开，标签页可跨会话存活

---

## 三、社区热点 Issues

1. **后台服务端口冲突导致重启失败**（#54267，14 评论，已复现）
   重新启动 `opencode` 时，旧后台服务未退出导致固定端口被占用，报 "Managed service port already in use"。与今日合并中的 [PR #65915](https://github.com/anomalyco/opencode/pull/65915) 直接相关，是长期存在的稳定性痛点。
   https://github.com/anomalyco/opencode/issues/54267

2. **opencode-go 高缓存命中率下仍出现 21.7–178.2 秒响应头延迟**（#57849，12 评论，triaging）
   在 97.97–99.97% 缓存命中率的暖缓存请求中，`deepseek-v4.1-flash` 返回响应头延迟极高，涉及 241k–607k 上下文。社区对 Go 网络链路性能的持续追踪。
   https://github.com/anomalyco/opencode/issues/57849

3. **TTFT 随 prompt 长度线性增长**（#65966，3 评论，pending close）
   即使前缀完全相同且携带 session header，18k→6s、90k 冷启动→19s。server-timing 显示瓶颈在上游且流量被路由到远程 IAD，与 #57849 构成同一性能问题的两面。
   https://github.com/anomalyco/opencode/issues/65966

4. **桌面端右键链接在应用内浏览器打开并让 Agent 操作该页面**（#65946，8 评论）
   基于 v2.4.0 内置浏览器能力的高热度 Feature Request，代表社区对"Agent + 浏览器协同"的强烈期待。
   https://github.com/anomalyco/opencode/issues/65946

5. **Session 级终端 + 可选终端上下文**（#43758，8 评论）
   当前终端是 workspace 级作用域，所有 tab 共享；社区希望每个会话有独立终端，并能选择性将终端内容提供给模型。
   https://github.com/anomalyco/opencode/issues/43758

6. **macOS 剪贴板双写竞争**（#59052，6 评论）
   2.1.4 起 TUI 复制文本同时使用原生写入和 OSC 52，导致 Alacritty 报 NSPasteboard 写入失败告警。
   https://github.com/anomalyco/opencode/issues/59052

7. **桌面端 IDE 级项目树 / Worktree 管理 / Git 历史**（#65977，4 评论）
   对标 IntelliJ Community 的完整三合一请求，反映桌面端用户对 IDE 化的期待。
   https://github.com/anomalyco/opencode/issues/65977

8. **后台服务是 per-user 单例，首个启动的环境变量影响所有 profile**（#58141，3 评论，👍2）
   `OPENCODE_CONFIG_DIR` 多 profile 场景下，后台单例服务导致环境变量串扰，是多工作区用户的核心痛点。
   https://github.com/anomalyco/opencode/issues/58141

9. **ACP 提前终止注册命令的流式输出**（#53914，3 评论，已复现）
   Zed 等 ACP 客户端调用长运行命令时，首个执行周期结束即返回 `session/prompt`，后续周期被截断。影响 IDE 集成体验。
   https://github.com/anomalyco/opencode/issues/53914

10. **会话选择器显示真实上下文大小**（#61070，3 评论）
    现有 `tokens`/`cost` 为累计值（400K 上下文报告 389M），用户无法判断哪些会话接近上下文上限，恢复会话时难以筛选。
    https://github.com/anomalyco/opencode/issues/61070

其他值得注意：TUI worktree 位置行丢失分支名（#65424）、插件热重载期间工具列表短暂为空（#64464，已复现）、同数据库第二实例暂停所有 goals（#62145，已复现）、CLI `opencode run` 在 stdin 为打开管道时挂起（#65887）。

---

## 四、重要 PR 进展

1. **[#65915](https://github.com/anomalyco/opencode/pull/65915) fix: 后台服务在重度并行负载下保持稳定**
   修复多 workspace 并行 Agent 场景下后台服务 6 小时内被重启 97 次的问题。直接回应热点 Issue #65799/#54267。

2. **[#65948](https://github.com/anomalyco/opencode/pull/65948) feat(server): workerd 上接受 machine WebSocket 链接**（已关闭）
   在 Cloudflare Durable Object 上支持 `opencode-worker` 机器链接，为分布式部署铺路。

3. **[#63669](https://github.com/anomalyco/opencode/pull/63669) feat(core): Agent 指令与 Plan 模式重构**
   修复 Plan 模式在每次压缩后重注入 synthetic reminder 导致会话反复唤醒的问题，改为将规则固定在 system prompt 中。

4. **[#63599](https://github.com/anomalyco/opencode/pull/63599) feat(core): 可选 OS 级 shell 沙箱**（已关闭）
   Linux 用 bubblewrap、macOS 用 sandbox-exec 包裹 shell 命令，显著提升执行安全性。

5. **[#65914](https://github.com/anomalyco/opencode/pull/65914) fix(app): 消除 tab strip 的二次方复杂度**
   大量会话 tab 打开时，每个会话更新都触发 O(n) 重算，本 PR 解决该性能退化。

6. **[#65969](https://github.com/anomalyco/opencode/pull/65969) fix(desktop): 浏览器面板附加到未打开 tab 中的会话**
   后台运行的会话（服务端恢复、自动化、shell 任务）不再丢失浏览器面板。

7. **[#65945](https://github.com/anomalyco/opencode/pull/65945) fix(core): 加固 PermissionPolicy 代数与无人值守 hook 检查**（已关闭）
   修复属性测试（`@tear/pbt`）发现的 5 个代数 bug 及 2 个存量 bug，权限系统可靠性提升。

8. **[#65961](https://github.com/anomalyco/opencode/pull/65961) feat(app): Inbox 会话置顶与归档列表**
   实验性 Inbox 侧边栏的迭代，配合 #65941 的多选批量操作（已合并），会话管理体验快速完善。

9. **[#65967](https://github.com/anomalyco/opencode/pull/65967) fix(core): 识别头部不在字节 0 的 PDF**（已关闭）
   真实 PDF 文件常在头部前有填充字节，此修复解决 "Cannot read binary file" 误报。

10. **[#64180](https://github.com/anomalyco/opencode/pull/64180) refactor(desktop): 简化 deep link 并支持按 id 打开会话**
    新增 `opencode://session/<id>` 协议，改善桌面端会话跳转与外部集成。

其他：CI 收紧 stale issue 自动关闭（#65954）、Copilot Free Auto 模型检测修复（#65965）、插件事件流按 Location 作用域隔离（#65846）、非 PDF 头字节检测、子 Agent 显示父会话侧边栏（#65957，已合并）。

---

## 五、功能需求趋势

1. **桌面端 IDE 化**：今日最密集的需求方向（#65946、#65977、#65944、#65933、#65927、#65950、#65958、#65953），用户要求项目树、diff 视图交互、文件面板布局、会话元信息展示等 IDE 级细节体验。
2. **Agent × 浏览器协同**：v2.4.0 内置浏览器发布后，"在浏览器面板中让 Agent 直接操作页面"成为新的高热方向（#65946、#65956）。
3. **会话/上下文管理**：上下文大小展示（#61070）、跨会话 token 统计与缓存命中率（#58024）、会话置顶（#59906、#65953）——用户在长上下文高频使用下对可观测性需求强烈。
4. **Provider 可观测性**：路由器实际选中模型的上报（#60309）、TTFT 与路由透明度（#65966、#57849）。

---

## 六、开发者关注点

- **网络/推理性能是首要痛点**：`opencode-go` 的 TTFT 与响应头延迟问题占据多条高评论 Issue，尤其在大上下文场景，用户希望上游路由与缓存行为更透明。
- **后台服务稳定性**：端口冲突（#54267）、单例环境串扰（#58141）、高负载频繁重启（PR #65915 所修），多 profile/多工作区用户受影响最大。
- **插件系统健壮性**：热重载期间工具短暂消失（#64464）、事件流跨作用域泄漏（PR #65846），插件生态扩大后隔离性要求提高。
- **长上下文成本与可观测性**：累计 token 数字失真、缓存命中率不可见，用户需要真实的上下文占用数据来决策压缩/切换会话时机。
- **免费层额度**：Free tier 用户对限额提示的困惑（#65928）持续出现，文档与提示语需更清晰。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-11-24）

## 一、今日速览

今日无新版本发布，社区活跃度集中在 **1.0 Preview 内核合入主线**（#17045，24 条评论）与 **Managed Agent 无状态化推进** 两条主线上。安全方面出现一个值得关注的问题：会话日志被指明文记录 API key（#18165）。此外，多个 P1/P2 级核心修复 PR 提交，包括压缩死锁、Gemini 兼容性及超大 transcript 处理。

---

## 二、版本发布

过去 24 小时无新 Release。

---

## 三、社区热点 Issues

1. **[#17045](https://github.com/QwenLM/qwen-code/issues/17045)** — 1.0 Preview 循环内核分片合入主线的总跟踪 Issue（P1，24 条评论）。事件驱动内核 + 单一 `query()` 入口是 1.0 架构的核心，是目前讨论最热烈的议题。

2. **[#18165](https://github.com/QwenLM/qwen-code/issues/18165)** — **安全问题**：更换 API key 时，工具输出中的完整密钥被明文写入会话日志并在多个字段重复存储，且文件权限偏宽。敏感信息落盘风险，建议优先关注。

3. **[#15486](https://github.com/QwenLM/qwen-code/issues/15486)** — 自动压缩（compaction）后，下一次请求的体积估算把 pending tool result 重复计数并额外加 20K padding，导致回合被中断或以 `max_tokens: 1` 发送（P1 bug，9 条评论）。

4. **[#18197](https://github.com/QwenLM/qwen-code/issues/18197)** — 工具调用发射层间歇性丢失必填 JSON 参数（file_path、command 等），且可能升级为不可恢复的重试循环导致整个会话瘫痪。影响面广的序列化边界 bug。

5. **[#18202](https://github.com/QwenLM/qwen-code/issues/18202)** — `Ctrl+X` 调起外部编辑器（vim/nano/micro）退出后 TUI 花屏、无法输入，只能杀进程。交互体验硬伤。

6. **[#17446](https://github.com/QwenLM/qwen-code/issues/17446)** — 请求在自定义 Provider 配置流程中支持模型自动发现（扩展 `/auth` 的体验到 OpenAI/Anthropic 兼容端点，P2，5 条评论）。

7. **[#17316](https://github.com/QwenLM/qwen-code/issues/17316)** — MCP client 支持 elicitation 能力：允许 MCP server 中途请求结构化用户输入，目前依赖此能力的服务器会静默失败（P2，4 条评论）。

8. **[#16437](https://github.com/QwenLM/qwen-code/issues/16437)** — 压缩后在摘要中附加会话 transcript 路径，让模型可回查摘要丢弃的细节。轻量方案，配套 PR #18018 已合入并关闭。

9. **[#18148](https://github.com/QwenLM/qwen-code/issues/18148)** — 每日依赖 CVE 审计失败，可能是新的高危漏洞或 npm audit 端点不可用，需检查 CI 流水线。

10. **[#17143](https://github.com/QwenLM/qwen-code/issues/17143)** — TUI 界面本身的 i18n 本地化（目前设置仅影响模型输出语言，不影响菜单/状态栏/错误提示）。已关闭，相关能力正通过 PR #18175（显示翻译）逐步落地。

其他值得注意：[#18200](https://github.com/QwenLM/qwen-code/issues/18200)（`getGptReasoningCapabilities()` 缺少 GPT-6/6.1/6.2 系列模型 ID）、[#18192](https://github.com/QwenLM/qwen-code/issues/18192)（Windows Desktop 登录阻塞新用户）。

---

## 四、重要 PR 进展

1. **[#18209](https://github.com/QwenLM/qwen-code/pull/18209)** — 修复长推理会话在上下文接近上限时手动/自动压缩反复失败的死锁（剥离未签名历史推理块 + 预算钳制），直击 #15486 一类问题。

2. **[#18211](https://github.com/QwenLM/qwen-code/pull/18211)**（已合入）— 为 MySQL 身份 join 固定完整索引键，修复 Managed Agent 的查询计划回归，配套 follow-up #18206。

3. **[#18175](https://github.com/QwenLM/qwen-code/pull/18175)** — 新增内置显示翻译：`general.displayLanguage` 设置可将回复与思考翻译为中文/英文，覆盖 Ink/OpenTUI 终端与 Web Shell。

4. **[#18220](https://github.com/QwenLM/qwen-code/pull/18220)** — 修复 Gemini functionResponse parts 中混入文本字段被拒绝的问题，严格对齐 Gemini schema。

5. **[#18221](https://github.com/QwenLM/qwen-code/pull/18221)** — `/verify-pr` 硬件隔离验证轮次的可执行编排层：bearer token 签发/撤销、宿主侧模型代理、microVM 隔离构建于 #18181 之上。

6. **[#18155](https://github.com/QwenLM/qwen-code/pull/18155)** — Managed Agent 的受限 Shell：Bubblewrap 为每条命令提供只读私有镜像 + 独立网络/临时目录，安全隔离显著增强。

7. **[#18210](https://github.com/QwenLM/qwen-code/pull/18210)** — Managed prompt 内保持 Skills 文件与已安装扩展稳定，跨 prompt 可升级版本，支持跨 daemon 的 epoch 绑定回收。

8. **[#18111](https://github.com/QwenLM/qwen-code/pull/18111)** — 支持超大会话 transcript 的 daemon 加载与回放：加固恢复、索引、批量回放分帧及 Web Shell 错误处理。

9. **[#18146](https://github.com/QwenLM/qwen-code/pull/18146)**（已合入）— 性能优化：daemon 会话目录扫描 I/O 大幅降低（有界读取替代全文打开），改善大目录启动速度。

10. **[#18205](https://github.com/QwenLM/qwen-code/pull/18205)** — Web Shell 的 Managed Agent React 绑定层（slice 3b）：增量 transcript 流、待审批请求与回合取消接入统一聊天控制器。

其他：[#18120](https://github.com/QwenLM/qwen-code/pull/18120)（跨设备共享工作区输入历史）、[#18207](https://github.com/QwenLM/qwen-code/pull/18207)（修复 main 分支红的 actorId 长度测试，阻塞 Managed Agent gate）。

---

## 五、功能需求趋势

- **Managed Agent / 无状态化**：最高频主线。Action parking 扩展（#18149）、S5 Hooks parking（PR #18218）、不可变回合资源视图（#18178）等密集推进。
- **上下文与压缩可靠性**：压缩死锁、体积估算、压缩后回查 transcript（#15486、#16437、PR #18209），是用户痛点最集中的领域。
- **Web Shell 体验**：自定义面板（#18159）、Activity 排序（#18214）、跨工作区链接解析（#18198）、移动端输入框缩放（#17933）。
- **Provider / 模型兼容性**：自定义 Provider 模型发现（#17446）、GPT-6 系列 reasoning 能力识别（#18200）、Gemini schema 兼容（PR #18220）。
- **MCP 深化**：elicitation 能力支持（#17316）是协议层面的重要缺口。
- **国际化**：显示翻译已落地（PR #18175），TUI 全量 i18n 仍是长期诉求。

---

## 六、开发者关注点

1. **安全与隐私**：API key 明文落盘（#18165）+ 文件权限过宽 + 日志多字段重复存储，是当下最紧迫的信任问题。
2. **稳定性边界 bug**：工具参数丢失（#18197）、压缩死锁（PR #18209 修复）、Managed Agent 取消卡死（#18127，已关）——序列化与状态机边界是回归高发区。
3. **Windows 体验欠佳**：登录阻塞（#18192）、路径补全大小写敏感（#18162）、MCP 测试 teardown 失败（#18204）。
4. **大型会话/长时运行**：超大 transcript 加载（PR #18111）、daemon 目录扫描性能（PR #18146）反映重度用户诉求。
5. **CI 健康度**：CVE 审计失败（#18148）与 main 分支测试红（PR #18207）需要维护者及时介入。

**总体判断**：项目处于 1.0 架构落地前的密集重构期，核心工程（内核、Managed Agent、Web Shell）推进有序，但安全性（日志脱敏）与边界稳定性问题应尽快排期修复。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*