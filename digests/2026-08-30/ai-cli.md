# AI CLI 工具社区动态日报 2026-08-30

> 生成时间: 2026-08-29 22:39 UTC | 覆盖工具: 7 个

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

**日期：2026-08-30 | 覆盖范围：Claude Code / OpenAI Codex / Gemini CLI / GitHub Copilot CLI / Kimi Code CLI / OpenCode / Qwen Code**

---

## 一、生态全景

当前 AI CLI 工具竞争已从“模型能力演示”全面转入**可靠性、计费透明度与生态集成**的深水区：7 款工具中有 5 款当日动态涉及配额/计费争议，用户开始自带审计工具（rollout 日志、CLI 日志）核验消耗，信任问题成为跨厂商的最大公约数。MCP 已成为事实性集成标准，几乎所有工具的功能演进与回归缺陷都围绕 MCP 展开。格局上，Claude Code 呈现“事实标准”地位——Gemini CLI 当日集中修复 Claude Code hooks 迁移兼容性即是明证；而 OpenAI Codex 以单日 19 个 PR 合并 + 稳定版发布的工程速度领跑迭代节奏。新进入者（Kimi Code）社区尚处冷启动，开源阵营（OpenCode、Qwen Code）则以社区量和细分场景差异化求生。

---

## 二、各工具活跃度对比

> 注：各工具数据来自其各自日报口径，统计基线不完全统一，横向比较以量级

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> **数据说明**：本报告基于 anthropics/skills 仓库截至 2026-08-30 的 50 条 PR 与 50 条 Issues。所展示 PR 的评论数均为 undefined（数据源缺失），故 PR 热度排序综合参考了关联 Issue 讨论量、跨 PR 关联度及更新活跃度；Issue 热度以评论数为准。所有展示的 PR 当前均为 **OPEN** 状态。

---

## 一、热门 Skills 排行

| 排名 | Skill / PR | 功能定位 | 社区讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 评估工具链修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 修复 `run_eval.py` 恒报 0% recall 的核心缺陷 | 关联 [#556](https://github.com/anthropics/skills/issues/556)（12 条评论、10+ 独立复现），描述优化循环实际在“对噪声优化”，是影响所有 Skill 质量的基础性问题 | OPEN |
| 2 | **Hivemind 多智能体编排** ([#1628](https://github.com/anthropics/skills/pull/1628)) | 将机械性工作委托给运行免费模型的 headless opencode worker，Claude Code 只做规划/审查/合并 | 直击“贵模型上下文才是稀缺资源”的成本痛点，与多 Agent 协作趋势高度契合 | OPEN |
| 3 | **document-typography** ([#514](https://github.com/anthropics/skills/pull/514)) | AI 生成文档的排版质控：孤字换行、寡段落、编号错位 | 覆盖 Claude 生成的每一份文档，“用户很少主动要求但普遍受益”的典型隐性需求 | OPEN |
| 4 | **self-audit 质量门** ([#1367](https://github.com/anthropics/skills/pull/1367)) | 交付前先机械验证文件存在性，再做四维推理审计 | 与作者自己的提案 [#1385](https://github.com/anthropics/skills/issues/1385)（推理质量门流水线，4 条评论）形成 Issue+PR 闭环 | OPEN |
| 5 | **ODT 全能处理** ([#486](https://github.com/anthropics/skills/pull/486)) | OpenDocument 创建、模板填充、ODT→HTML 转换 | 补齐开源/ISO 标准文档格式空白，欧洲政府与开源生态刚需 | OPEN |
| 6 | **skill-quality/security-analyzer 元技能** ([#83](https://github.com/anthropics/skills/pull/83)) | 从结构与安全五维度分析 Skill 本身的质量 | 与最热 Issue #492（命名空间信任滥用）呼应，社区对“用 Skill 审 Skill”的治理方案兴趣浓厚 | OPEN |
| 7 | **testing-patterns** ([#723](https://github.com/anthropics/skills/pull/723)) | 全栈测试方法论：Testing Trophy、AAA、React 组件测试 | 覆盖“该测什么/不该测什么”的哲学层到实操层 | OPEN |
| 8 | **ServiceNow 平台 Skill** ([#568](https://github.com/anthropics/skills/pull/568)) | ITSM/ITOM/SecOps/CSDM 等 ServiceNow 全模块助手 | 企业级 SaaS 平台覆盖广度罕见，8 月仍在活跃更新 | OPEN |

**修复类热点**（非新 Skill 但关注度极高）：DOCX 修订 ID 冲突导致文档损坏 ([#541](https://github.com/anthropics/skills/pull/541))、PDF 大小写引用在 Linux 失效 ([#538](https://github.com/anthropics/skills/pull/538))、claude-api 过期模型 ID ([#1607](https://github.com/anthropics/skills/pull/1607))、Windows 兼容三连修 ([#1099](https://github.com/anthropics/skills/pull/1099)、[#1050](https://github.com/anthropics/skills/pull/1050))。

---

## 二、社区需求趋势

1. **安全与信任治理（最强烈）** — [#492](https://github.com/anthropics/skills/issues/492)（43 条评论，全库最热）：社区 Skill 伪装 `anthropic/` 官方命名空间，构成权限提升的信任边界漏洞。用户迫切需要官方签名/命名空间隔离机制，而非自行鉴别。
2. **企业级分发与协作** — [#228](https://github.com/anthropics/skills/issues/228)（16 条评论）：组织内 Skill 共享仍靠 Slack 传文件 + 手动上传；叠加 [#189](https://github.com/anthropics/skills/issues/189) 插件重复安装污染上下文，企业落地摩擦明显。
3. **上下文经济性** — [#1487](https://github.com/anthropics/skills/issues/1487)：claude-api Skill 单次注入 ~156k tokens 直接耗尽上下文；[#1329](https://github.com/anthropics/skills/issues/1329)（9 条评论）提出 compact-memory 符号化紧凑记忆。“Skill 瘦身”已成硬需求。
4. **AI 输出质量自审** — [#1385](https://github.com/anthropics/skills/issues/1385)、[#202](https://github.com/anthropics/skills/issues/202)：交付前校准→对抗审查→验证的质量门流水线，以及 skill-creator 从“文档腔”回归“操作指令”的重构诉求。
5. **工具链跨平台可靠性** — [#556](https://github.com/anthropics/skills/issues/556)、[#29](https://github.com/anthropics/skills/issues/29)（Bedrock 支持）、[#62](https://github.com/anthropics/skills/issues/62)：评估脚本失效、Windows 崩溃、Skill 无故消失等问题反复出现。
6. **Skill 与 MCP 融合** — [#16](https://github.com/anthropics/skills/issues/16)、[#1390](https://github.com/anthropics/skills/issues/1390)：将 Skill 能力以 MCP API 形式暴露，以及 mcp-builder 评估器对真实 MCP server 全军覆没的修复需求。

---

## 三、高潜力待合并 Skills（OPEN 且活跃）

- **[#1298](https://github.com/anthropics/skills/pull/1298) 评估工具链修复** — 根因明确、多人复现，合并后解锁整个 Skill 描述优化流程，优先级最高。
- **[#1628](https://github.com/anthropics/skills/pull/1628) Hivemind** — 8 月下旬提交并持续更新，踩中多 Agent + 成本优化双热点。
- **[#1607](https://github.com/anthropics/skills/pull/1607) claude-api 模型 ID 修正** — 修复事实性错误并关联 Issue #1603，改动小、确定性强，合并阻力最低。
- **[#1602](https://github.com/anthropics/skills/pull/1602) mcp-builder 等多项修复** — 直接回应 [#1390](https://github.com/anthropics/skills/issues/1390)（评估恒 0 分），8 月仍在更新。
- **[#1367](https://github.com/anthropics/skills/pull/1367) self-audit** — 已迭代至 v1.3.0，配套 Issue 讨论充分，属于社区自我提出、自我完善的典型。
- **[#541](https://github.com/anthropics/skills/pull/541) / [#538](https://github.com/anthropics/skills/pull/538) 文档 Skill 修复系列** — 同一作者（@Lubrsy706）的精准小修复，技术论证扎实，合并概率高。
- **[#568](https://github.com/anthropics/skills/pull/568) ServiceNow** — 创建 5 个月仍持续维护（8 月更新），企业需求侧背书。

---

## 四、Skills 生态洞察

> **社区最集中的诉求是“从能用走向可信”：修复评估/跨平台等基础工具链缺陷、压缩 Skill 的上下文开销、并建立官方命名空间与安全治理——让 Skills 能被企业放心地规模化分发和使用。**

---

# Claude Code 社区动态日报
**日期：2026-08-30 | 数据来源：github.com/anthropics/claude-code**

---

## 1. 今日速览

过去 24 小时无新版本发布，社区焦点集中在问题追踪与维护层面。讨论最热烈的是 macOS 内核级内存泄漏问题（#66020，25 条评论），且 #82941 报告了相同症状，已形成问题簇。另一个值得注意的动态是：**8 月 29 日出现了大规模 stale 机器人批量关闭旧 Issue 的操作**——约 20 条历史 Issue（包括带有 `has repro` / `reproduced` 标签、尚未修复的 Bug）被自动关闭，社区对问题追踪机制的信任度可能受影响。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues

**① [#66020](https://github.com/anthropics/claude-code/issues/66020) — macOS 内核 zone 泄漏导致 panic（OPEN）**
当日热度第一（25 评论 / 5 👍）。CLI 在 macOS 26.5.1 上泄漏 `data.kalloc.1024` zone，内存达 ~20GB 时 claude.exe 触发内核 panic；泄漏速率随 agent 负载从 21/sec 飙升至 1027/sec。有完整复现，属于系统级稳定性缺陷，是当前最需官方回应的问题。

**② [#82941](https://github.com/anthropics/claude-code/issues/82941) — 同症状内核 panic：fd/kqueue 泄漏（OPEN）**
长时间会话后 `data.kalloc.1024` 耗尽引发内核 panic，症状与 #66020 高度吻合，指向同一根因簇，说明 macOS 长会话资源泄漏并非孤例。

**③ [#79773](https://github.com/anthropics/claude-code/issues/79773) — Max 20x 升级后周限额未生效（OPEN）**
13 评论。用户升级后额度仍按 Max 5x 甚至更快速率耗尽，属于订阅计费/限额核算缺陷，直接影响付费用户信任。

**④ [#74329](https://github.com/anthropics/claude-code/issues/74329) — stdio MCP server 中途退出后被错误注销（OPEN, reproduced）**
复现路径清晰：MCP 进程退出

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-08-30** | 数据来源：[openai/codex](https://github.com/openai/codex)

---

## 一、今日速览

Codex CLI **v0.151.0 正式版发布**，重点强化 MCP 生态：可选 MCP 服务器的工具发现宽限期可配置、扩展可在工具结果送达模型前进行检查或替换、插件目录支持按仓库合并配置。社区侧，**macOS 端认证失效 bug（#39162）以 69 条评论成为最热话题**，同时 26.825.x 新版 Windows 桌面端集中出现启动故障；配额计费类问题（周配额消耗异常、静默 API 计费）持续发酵。仓库当天合并 19 个 PR，聚焦多代理（multi-agent）指令、goal 执行链路与会话元数据稳定性。

---

## 二、版本发布

### [rust-v0.151.0](https://github.com/openai/codex/releases/tag/rust-v0.151.0)（正式版）
- **MCP 工具发现宽限期可配置**：为可选 MCP 服务器的工具发现新增可配置的宽限期（#41199）
- **扩展可拦截 MCP 工具结果**：Extensions 现可在工具结果到达模型前进行检查或替换（#41202），为中间件/审计类扩展打开空间
- **插件目录增强**：合并按仓库的配置，并上报无效的项目 marketplace 条目

### 预发布版本
- [rust-v0.152.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.152.0-alpha.1)
- rust-v0.151.0-alpha.12 / alpha.7.2（迭代收尾）

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 热度 | 关注理由 |
|---|-------|------|----------|
| 1 | [#39162](https://github.com/openai/codex/issues/39162) macOS 打开已有会话导致 ChatGPT 认证失效并跳转登录 | 💬69 👍40 | **本月最高讨论度**。26.814.41407 版本引入的回归，影响基础可用性；已知可用版本为 26.810.52044 |
| 2 | [#34035](https://github.com/openai/codex/issues/34035) 请求将 5 小时用量限制的临时取消改为永久 | 💬21 👍151 | **全榜最高 👍**。7 月 12 日官方宣布临时移除 5 小时限制后，社区强烈要求对 Plus/Pro/Business 永久保留 |
| 3 | [#39903](https://github.com/openai/codex/issues/39903) 请求增加禁用"Ran N commands"折叠、始终显示执行命令的选项 | 💬48 👍68 | TUI 可观测性核心诉求：命令折叠影响审查与调试效率，与官方"可审计性"目标直接相关 |
| 4 | [#39855](https://github.com/openai/codex/issues/39855) Windows Remote：新建无项目会话因畸形路径未通过信任验证 | 💬17 👍9 | Remote 功能在 Windows 上的阻断级问题，直接影响远程工作流 |
| 5 | [#40002](https://github.com/openai/codex/issues/40002) Android Remote 因大小写敏感路径查找无法验证 Windows 受信项目 | 💬12 👍8 | 跨平台路径语义差异（Windows 不区分大小写 vs 查找区分）导致移动端 Remote 不可用 |
| 6 | [#41369](https://github.com/openai/codex/issues/41369) 单个 Terra Medium 任务重复处理 10.1M 输入 tokens（98% 缓存），消耗 33% 五小时配额 | 💬5 | 用户基于本地 rollout JSONL 做了详细审计，指向上下文重复重处理的架构性问题 |
| 7 | [#39699](https://github.com/openai/codex/issues/39699) 周配额在正常开发工作流中消耗远超预期 | 💬10 | 与 #41369 同属配额透明度问题，用户要求消耗明细可审计 |
| 8 | [#40871](https://github.com/openai/codex/issues/40871) 桌面端静默从订阅计费切换至休眠 API key，一夜产生约 $758 费用 | 💬2 | **计费安全问题**，无显式 opt-in 即切换计费方式，风险极高，值得所有 API key 用户警惕 |
| 9 | [#40323](https://github.com/openai/codex/issues/40323) 自动压缩反复内嵌图片，长会话 rollout 膨胀至 16 GiB 以上 | 💬4 👍1 | 长会话稳定性：compaction 逻辑缺陷导致磁盘与内存双重压力 |
| 10 | [#41571](https://github.com/openai/codex/issues/41571) / [#41540](https://github.com/openai/codex/issues/41540) 26.825.5331.0 Windows 启动卡 logo 循环（Application Hang 1002）/ headless 启动（node_repl.exe 重定位失败 0x80071770） | 💬3+5 | **今日新增**，最新桌面版启动回归，两个独立故障均在 26.825.x 复现 |

> 其他值得留意：[#41561](https://github.com/openai/codex/issues/41561) GitHub 集成 Draft/Ready 切换因连接器查询不存在的 `Repository.fullDatabaseId` 字段而失败，阻断自动化 PR 流程；[#41465](https://github.com/openai/codex/issues/41465) Windows 悬浮宠物无法点击拖拽（Pet 功能交互缺陷）。

---

## 四、重要 PR 进展（Top 10）

1. [#41454](https://github.com/openai/codex/pull/41454) **重复执行宿主失败后阻断 goal** — 追踪每个活动 goal 的失败 exec 回合，连续三次失败即标记 blocked，任一工具成功则重置计数。直接回应执行环境故障类问题（如 #40596）。
2. [#41562](https://github.com/openai/codex/pull/41562) **跨 goal 延续保留回合谱系** — 确保自动 goal 延续可归属到创建它的原始回合，避免外部输入/hook 上下文污染谱系元数据。
3. [#41467](https://github.com/openai/codex/pull/41467) **TUI 模型选择器从 app server 实时刷新** — 修复选择器打开时展示过期缓存目录的问题，异步拉取当前账号可用模型。
4. [#41464](https://github.com/openai/codex/pull/41464) **更新会话元数据时保留权限快照** — 延迟旧版沙箱策略投影，避免客户端名称/版本更新意外改动权限状态，强化安全不变量。
5. [#41567](https://github.com/openai/codex/pull/41567) **从自有设置快照恢复线程 cwd** — 修复恢复线程时 cwd 可能来自 fork 历史或被 compaction 移出重放窗口的问题。
6. [#41447](https://github.com/openai/codex/pull/41447) **支持 `openai/elicitation` 表单请求** — 客户端声明对象值 `form` 能力即启用，`openai/elicitation/create` 以 form 模式处理。结构化用户交互的重要一步。
7. [#41457](https://github.com/openai/codex/pull/41457) **多代理 proactive

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报

**日期**: 2026-08-30 | **数据来源**: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 📰 今日速览

Gemini CLI 发布 v0.59.0-nightly 夜间版本，核心变化是**安全加固**：restricted 模式下强制 fail-closed 工作区信任校验并过滤 mcpServers 配置。社区侧，Agent 可靠性仍是最大痛点——Subagent 状态误报（13 条评论）与 Generalist Agent 挂起（8 👍）两大 P1 问题持续发酵。此外，今天有多位社区贡献者提交了针对 **Claude Code hooks 迁移兼容性**和 **Web Fetch SSRF 防护**的修复 PR，质量颇高。

---

## 🚀 版本发布

### [v0.59.0-nightly.20260829.g0bd1d4397](https://github.com/google-gemini/gemini-cli/releases)

- **fix(core): enforce fail-closed workspace trust and filter mcpServers in restricted mode**（[#29099](https://github.com/google-gemini/gemini-cli/pull/29099)，作者 @luisfelipe-alt）
  - 受限模式下工作区信任改为 **fail-closed** 策略（默认不信任，显式授权才放行）
  - 同时过滤 `mcpServers` 配置，防止受限模式下加载未受信 MCP 服务器
  - 点评：这是对沙箱/受限模式安全边界的重要补强，与 Issue #19873（OS 级沙箱方案）方向呼应

---

## 🔥 社区热点 Issues（Top 10）

**1. Subagent 触发 MAX_TURNS 后误报为 GOAL 成功** — [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
`P1` | 13 💬 | 2 👍
`codebase_investigator` 子代理明明因达到轮次上限被中断，却上报 `status: "success"`。**状态误报直接影响任务编排的可信度**——上层 Agent 会基于假成功结果继续决策。本日讨论热度第一，仍是 need-retesting 状态。

**2. Generalist Agent 无限挂起** — [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
`P1` | 8 💬 | **8 👍**（本日最高）
即使是创建文件夹这类简单操作，一旦 defer 给 generalist agent 就永久挂起（用户等待超 1 小时）。用户反馈 instruct 模型不使用子代理可绕过。**点赞数最高，说明受影响面广**。

**3. 零依赖 OS 沙箱 + 执行后意图路由** — [#19873](https://github.com/google-gemini/gemini-cli/issues/19873)
`P2` | 8 💬
社区提出的架构级方案：利用 Gemini 3 模型原生的 bash 亲和性（`grep`/`sed`/`awk` 链式调用），配合 OS 级沙箱和执行后意图路由，在安全与能力间取得平衡。effort/large，是 Agent 执行模型的重要演进方向。

**4. AST 感知的文件读取/搜索/代码库映射 EPIC** — [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)
`P2` | 7 💬
官方 EPIC：评估 AST 感知工具能否 ① 一次调用精确定位方法边界、减少错位读取和 token 噪音，② 支持符号级导航。配套调查 issue [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) 推荐从 tilth 或 glyph 入手。

**5. Gemini 不主动使用 Skills 和子代理** — [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)
`P2` | 6 💬
用户配置了 `gradle`、`git` 等自定义 skill，但模型在高度相关任务中仍不主动调用，需显式指令才触发。**反映任务路由/工具选择的智能度不足**，是提升 Agent 自主性的关键反馈。

**6. Auto Memory 对低信号会话无限重试** — [#26522](https://github.com/google-gemini/gemini-cli/issues/26522)
`P2` | 5 💬
后台记忆提取代理只有成功 `read_file` 读取转录才会标记已处理；若判断"低信号"跳过读取，该会话将反复被重新 surfaced，形成死循环。同日相关：[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)（无效记忆补丁被静默丢弃）、[#26516](https://github.com/google-gemini/gemini-cli/issues/26516)（记忆系统缺陷追踪总表）——**记忆子系统正处密集打磨期**。

**7. Shell 命令执行完毕后卡在 "Waiting input"** — [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
`P1` | 4 💬 | 3 👍
极简单的 CLI 命令执行完成后，UI 仍显示命令活跃并等待用户输入。P1 + 3 👍，属高频稳定性问题。

**8. Auto Memory 缺乏确定性脱敏、日志过量** — [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)
`P2` `area/security` | 4 💬
当前流程是先把本地转录内容送入模型上下文、再由模型脱敏——**敏感信息已在模型上下文中暴露**。需要确定性的前置脱敏方案。隐私敏感用户需重点关注。

**9. Browser Subagent 在 Wayland 下失败** — [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)
`P1` | 4 💬
Linux Wayland 会话下浏览器子代理直接失败（但上报 GOAL 完成，与 #22323 的误报模式类似）。同方向问题：[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)（浏览器会话接管与锁恢复）、[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)（Browser Agent 无视 settings.json 的 maxTurns 覆盖）。

**10. 工具数超限时遭遇 400 错误** — [#24246](https://github.com/google-gemini/gemini-cli/issues/24246)
`P2` | 3 💬
启用工具（含 MCP）超过一定数量（标题称 128，正文提及 400）后 API 直接返回 400。社区期望 Agent 能智能裁剪工具作用域。MCP 重度用户的高频障碍。

---

## 🔧 重要 PR 进展（Top 10）

**1. Nightly 版本自动化发布** — [#29121](https://github.com/google-gemini/gemini-cli/pull/29121)
机器人 `gemini-cli-robot` 自动化版本号提升至 `0.59.0-nightly.20260829.g0bd1d4397`。

**2. Web Fetch 目标校验与连接路由加固** — [#29120](https://github.com/google-gemini/gemini-cli/pull/29120)（@diegogodinezr）
出站请求改用**异步 DNS 解析校验目标地址**，并通过 Undici transport 直接绑定解析后地址（保留 TLS），有效防御 **SSRF 及 DNS 重绑定攻击**。社区贡献的高质量安全 PR。

**3. Hooks 迁移：修复 SubagentStop 事件键名** — [#29124](https://github.com/google-gemini/gemini-cli/pull/29124)（@0717lee）
Claude Code 拼写为 `SubagentStop`（小写 a），而 Gemini CLI 迁移映射表误写为 `SubAgentStop`，导致迁移时该 hook 被**静默丢弃**。修复 #29123。

**4. Hooks 迁移：超时单位秒→毫秒换算** — [#29125](https://github.com/google-gemini/gemini-cli/pull/29125)（@0717lee）
Claude Code 的 hook 超时单位是**秒**，Gemini CLI 按**毫秒**解释。原样拷贝数字会让 `"timeout": 30` 变成 30ms 即超时。修复 #29122。**与 #29124 同日提交，Claude Code 迁移兼容性迎来集中修复**。

**5. 修复 401 子串导致的误判认证错误** — [#28827](https://github.com/google-gemini/gemini-cli/pull/28827)（@mikemikimike）
原逻辑将任何包含 `401` 的消息（如端口号、退出码）误判为认证失败。现仅在消息开头或 HTTP/状态码上下文中识别，并附带回归测试。修复 #28203。

**6. a2a-server：

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-08-30 | 数据来源：github.com/github/copilot-cli**

---

## 一、今日速览

Copilot CLI 发布 **v1.0.82-2** 补丁版本，修复了 `/worktree`、`/move` 命令切换与计划审批卡片展开两处交互问题。值得关注的是，**v1.0.81 引入的回归问题持续发酵**——chroma-mcp 兼容性破坏、Azure DevOps MCP OAuth 认证失败两条新 Issue 相继出现，MCP 生态稳定性成为当前最大隐忧。此外，Agent Plugins 1.0 规范落地后的插件发现问题也开始浮现。

---

## 二、版本发布

### v1.0.82-2（补丁版本）

**Fixed：**
- 在 `/worktree` 或 `/move` 准备 worktree 期间输入消息，不再导致切换进入 worktree 失败
- `Ctrl+E` 可重新展开计划审批卡片，查看完整计划内容

> 点评：本版本聚焦 TUI 交互细节打磨，属于小步快跑的稳定性修复，未包含新功能。

---

## 三、社区热点 Issues

> 过去 24 小时共更新 9 条 Issue（不足 10 条，全部收录），按重要性排序：

**1. v1.0.81 破坏与 chroma-mcp 的兼容性** [#4647](https://github.com/github/copilot-cli/issues/4647)
- **标签：** triage | 👍 0 | 评论 2 | 前日新报，昨日持续讨论
- **重要性：** ⭐⭐⭐ 典型版本回归问题。从 v1.0.80 升级到 v1.0.81 后，`mcp-config.json` 中配置的 chroma-mcp 服务器无法正常工作，直接阻断依赖向量数据库的用户工作流。回归类问题通常优先级最高，建议受影响用户暂缓升级。

**2. v1.0.81 WAM 实现导致远程 ADO MCP 服务器 OAuth 认证失败** [#4660](https://github.com/github/copilot-cli/issues/4660)
- **标签：** triage | 👍 0 | 评论 0 | **昨日新报**
- **重要性：** ⭐⭐⭐ 又一条指向 v1.0.81 的回归。Azure DevOps 远程 MCP 服务器加载时提示"requires authentication"，使用 `/mcp auth` 命令认证同样失败。与 #4647 合并观察，v1.0.81 对 MCP 认证/集成层的改动可能引入了系统性问题。

**3. Windows 冷启动时 `copilot --resume` 卡死在 "Resuming session"** [#4165](https://github.com/github/copilot-cli/issues/4165)
- **标签：** area:sessions, area:platform-windows | 👍 1 | 评论 4 | 已持续 1 个多月
- **重要性：** ⭐⭐⭐ PowerShell 直接运行 `copilot --resume` 会话永久挂起且无报错，需先进入其他路径才能恢复。会话恢复是 CLI 核心功能，Windows 用户基数大，社区已有 4 条讨论但尚未修复。

**4. OmniSharp LSP 大型项目加载超时，呼吁可配置 `initializeTimeout`** [#1392](https://github.com/github/copilot-cli/issues/1392)
- **标签：** area:tools | 👍 **5（本日最高）** | 评论 3 | **已开放半年**
- **重要性：** ⭐⭐⭐ 大型 C# 解决方案场景下 LSP 服务器初始化始终超时，导致语言感知分析不可用。该 Issue 反应数最高、存续时间最长（2026-02 至今），反映社区对 **LSP 超时配置化**的强烈诉求，暴露出企业级大型代码库支持短板。

**5. Agent Plugins 1.0：`com.github.copilot/agents` 下自定义 agent 未被发现** [#4655](https://github.com/github/copilot-cli/issues/4655)
- **标签：** triage | 👍 0 | 评论 1 | 前日新报，昨日持续讨论
- **重要性：** ⭐⭐⭐ 按照微软 Agent Plugins 1.0 规范开发的插件中，skills 和 MCP 服务器可被识别，但 Copilot 专属自定义 agent 无法被发现。随着插件生态启动，规范符合度问题将直接影响第三方开发者积极性。

**6. apply_patch 因 JSON 包装错误陷入无限循环** [#4553](https://github.com/github/copilot-cli/issues/4553)
- **标签：** area:models, area:tools | 👍 0 | 评论 0 | 已持续 9 天
- **重要性：** ⭐⭐ 执行文件修改任务时 CLI 频繁因 JSON-wrapping 错误补丁失败，并以相同 payload 无限重试，导致任务无法完成。属于核心编辑工具链的稳定性问题，尚无官方回应。

**7. `/allow-all` 无法抑制 bash 工具执行确认弹窗** [#2955](https://github.com/github/copilot-cli/issues/2955)
- **标签：** area:permissions | 👍 1 | 评论 1 | **已开放 4 个月**
- **重要性：** ⭐⭐ 执行 `/allow-all` 后，每次 shell 调用仍弹出权限确认框，权限批量授权机制形同虚设，严重影响自动化工作流效率。

**8. 功能请求：本地自动记忆（agent 发起，无远程存储）** [#2930](https://github.com/github/copilot-cli/issues/2930)
- **标签：** area:context-memory | 👍 3 | 评论 2 | 已开放 4 个月
- **重要性：** ⭐⭐ 企业出于安全合规禁用远程 Copilot Memory 后，CLI 完全失去知识积累能力。请求提供纯本地记忆方案，反映 **企业安全与本地化优先** 的明确需求趋势。

**9. 建议将 `.agents` 目录发现机制扩展至 instructions、agents、hooks** [#4204](https://github.com/github/copilot-cli/issues/4204)
- **标签：** area:agents, area:configuration | 👍 0 | 评论 2 | 已持续 1 个多月
- **重要性：** ⭐⭐ 目前 `.agents/skills` 已受支持，社区希望统一约定覆盖 instructions、agents、hooks，且不限于 Git 仓库。属于生态规范化诉求，有助于 Copilot 定制能力的可移植性。

---

## 四、重要 PR 进展

> 过去 24 小时共更新 3 条 PR（不足 10 条，全部收录）：

**1. install: 为 fish shell 添加 PATH 配置支持** [#2381](https://github.com/github/copilot-cli/pull/2381) ❌ 已关闭
- 提交于 2026-03-29，历时 5 个月后于昨日关闭。该 PR 修复安装器将 POSIX `export` 语法写入 fish shell 用户 `~/.profile` 导致 PATH 配置静默失效的问题（fish 不读取该文件且使用数组式 PATH 语法）。长期挂起后关闭，fish 用户安装体验问题仍未解决，值得关注是否会有官方实现替代。

**2. 处理 invalid-label writer 中的 fork PR 关联问题** [#4497](https://github.com/github/copilot-cli/pull/4497) ❌ 已关闭
- 内部 CI 工具链改进：当 GitHub 未填充 workflow run 的 PR 关联时，invalid-label writer 现可通过可信 workflow-run 元数据搜索，并在恰好匹配一个开放 PR 时要求关联。属于仓库维护自动化优化，对终端用户无直接影响。

**3. Initial commit with exported changes from codespace** [#4659](https://github.com/github/copilot-cli/pull/4659) ⚠️ 开放中
- 标题与描述均为"codespace 导出的初始提交"，疑似贡献者误操作或低质量提交，与项目无关。**建议维护者及时关闭，社区成员无需关注。**

---

## 五、功能需求趋势

从近期 Issue 中可提炼出五大方向：

| 方向 | 相关 Issue | 信号强度 |
|---|---|---|
| **MCP 生态稳定性** | #4647、#4660 | 🔴 强——v1.0.81 连续两条回归，MCP 集成成重灾区 |
| **Agent/Plugin 可扩展性** | #4655、#4204 | 🟠 中强——Agent Plugins 1.0 刚落地，规范适配与 `.agents` 统一约定呼声高 |
| **企业安全与本地化** | #2930 | 🟠 中——远程 Memory 被企业禁用后出现能力真空，本地记忆方案需求明确 |
| **工具链配置灵活性** | #1392 | 🟠 中——LSP `initializeTimeout` 可配置化，大型单体仓库支持是刚需 |
| **权限系统体验** | #2955 | 🟡 中等——批量授权与自动化工作流的冲突 |

---

## 六、开发者关注点

**痛点总结：**

1. **版本回归风险突出**：v1.0.81 一天内暴露两条 MCP 相关回归（#4647、#4660），建议生产环境用户升级前查看 Release Notes 与回归 Issue，必要时锁定版本。

2. **长尾 Issue 修复缓慢**：LSP 超时（#1392

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期：2026-08-30 | 数据来源：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)**

---

## 一、今日速览

过去 24 小时社区整体较为平静：无新版本发布，无 PR 更新，仅 1 条 Issue 活跃。唯一的焦点是 **#2626 计费异常报告**——付费订阅用户反馈 `cache_read` 每轮均被计费而 `cache_creation` 恒为 0，导致配额消耗放大约 10 倍以上。该问题涉及计费公平性与缓存机制透明度，建议官方团队优先排查。

---

## 二、版本发布

过去 24 小时无新版本发布。

---

## 三、社区热点 Issues

> 本周期内仅 1 条 Issue 有更新，无法凑齐 10 条，以下为全部活跃 Issue 的深度分析。

### #2626 计费异常：cache_read 每轮计费、cache_creation 恒为 0（配额消耗放大超 10 倍）
**状态：OPEN | 作者：@ahmadyaseen35-coder | 创建/更新：2026-08-29 | 评论：1 | 👍：0**

🔗 https://github.com/MoonshotAI/kimi-cli/issues/2626

**问题描述：**
- 年费订阅用户报告，在 2026-08-28 晚间（+03:00 时区）的 5 小时配额窗口内，**轻度使用几分钟即消耗约 40% 配额**
- 用户拉取 CLI 日志后发现异常模式：所有会话中 `cache_creation` 始终为 0，但 `cache_read` 每轮对话均被计费
- 推测缓存实际未生效（未写入），但计费系统仍按“缓存读取”扣费，造成 **>10 倍的配额放大效应**

**为什么重要：**
1. **直接影响付费用户体验**：配额是订阅服务的核心价值，异常扣费会迅速消耗用户信任
2. **可能是系统性问题**：如果缓存写入在服务端静默失败，受影响的可能不止报告者一人，其他用户或许尚未察觉
3. **涉及计费透明度**：`cache_creation = 0` 与 `cache_read > 0` 的组合在逻辑上自相矛盾，说明计费链路或缓存层存在 bug

**社区反应：**
- 目前有 1 条评论，尚无 👍，Issue 创建不到一天，关注度有待观察
- 报告质量较高：附带了时间线、时区信息和 CLI 日志拉取行为，属于可复现性较强的反馈

---

## 四、重要 PR 进展

过去 24 小时无 PR 更新。

---

## 五、功能需求趋势

> 注：本周期仅 1 条活跃 Issue，以下趋势提炼自 #2626 及其隐含诉求，样本有限，仅供参考。

| 方向 | 具体诉求 | 优先级信号 |
|------|---------|-----------|
| **计费透明化** | 配额消耗明细实时可查，区分 cache_read / cache_creation / 常规 token 计费 | 高（直接影响付费决策） |
| **缓存诊断工具** | CLI 内置缓存命中率、缓存写入状态的调试命令或日志字段 | 中高（本次问题的排查依赖） |
| **用量监控** | 5 小时窗口的剩余配额展示与异常消耗告警 | 中 |

---

## 六、开发者关注点

1. **成本可预测性是核心痛点**：付费用户对“轻度使用却大量扣费”的容忍度极低，配额异常放大会直接引发退订风险
2. **缓存计费逻辑的可解释性**：`cache_read` 与 `cache_creation` 字段的语义需要与实际行为一致，否则用户无法自行判断问题归属（客户端 vs 服务端）
3. **排查工具链缺失**：用户被迫手动拉取 CLI 日志分析计费字段，说明缺少官方的用量审计/诊断入口
4. **官方响应速度待验证**：该 Issue 更新于昨日，社区将关注官方是否能在配额窗口计费类问题上给出快速响应

---

## 编辑备注

本期为低活跃日（1 Issue / 0 PR / 0 Release），趋势分析样本量小。建议持续追踪 **#2626** 的官方回复与修复进展——若确认为服务端缓存计费 bug，可能引发批量同类报告，届时将成为下周期的核心议题。

*明日日报将继续跟踪该 Issue 的状态变化及官方回应。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：2026-08-30 | 数据来源：github.com/anomalyco/opencode**

---

## 一、今日速览

过去 24 小时无新版本发布，但社区保持高活跃度（50 个 Issues、50 个 PR 有更新）。三条主线值得关注：**①** 用户 @neohiro 集中提交一批桌面端 GUI/插件管理功能提案（#46151–#46157 系列）；**②** OpenCode Go 配额百分比计算问题集中爆发，多个 Issue 反映显示异常甚至超过 100%；**③** 自动化清理流程（`automated-pr-cleanup`）批量处理了大量 7 月底积压的 PR，其中不乏有价值的修复。

---

## 二、版本发布

过去 24 小时无新版本发布。

---

## 三、社区热点 Issues

| # | Issue | 热度 | 关注理由 |
|---|-------|------|----------|
| 1 | [#13626](https://github.com/anomalyco/opencode/issues/13626) Web UI 从服务器自动同步项目 | 15 评论 / 15 👍 | 跨设备使用场景的核心痛点，自 2 月开放至今仍是高频诉求 |
| 2 | [#36942](https://github.com/anomalyco/opencode/issues/36942) 请求垂直标签页 | 14 评论 / 26 👍 | 新 UI 强制水平标签导致一次只能看到约 5 个会话标题，26 👍 显示共鸣强烈 |
| 3 | [#23566](https://github.com/anomalyco/opencode/issues/23566) 文档称 LSP 默认启用与实际不符（已关闭） | 13 评论 / 22 👍 | 文档与代码行为不一致，误导用户配置预期 |
| 4 | [#4232](https://github.com/anomalyco/opencode/issues/4232) LM Studio 显示未配置的模型（已关闭） | 11 评论 / 10 👍 | 本地模型集成的典型问题，影响 LM Studio 用户 |
| 5 | [#38570](https://github.com/anomalyco/opencode/issues/38570) 配额计算异常：仅用 $1.50 却显示 47% | 6 评论 | 与 #41206、#46184、#46149 构成配额显示问题簇 |
| 6 | [#46153](https://github.com/anomalyco/opencode/issues/46153) GUI 配置每模型上下文参数 | 6 评论（今日新增） | @neohiro 系列提案之首，希望免改 `opencode.jsonc` 直接在 GUI 调 temperature、系统提示词等 |
| 7 | [#34644](

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-08-30 | 数据来源：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

---

## 📌 今日速览

过去 24 小时，Qwen Code 发布 **v0.22.3-nightly** 夜间版本，主要增强 Web Shell 的 Git 状态可视化与 Review 功能。社区方面，源自 PR #9811（WebShell UI 重构）评审拆分的一批 IDE 集成缺陷被集中修复关闭，Agent Team 多智能体功能完成消息投递时机与“幽灵成员”两项关键修复。流式 API 超时问题（[#5975](https://github.com/QwenLM/qwen-code/issues/5975)，14 条评论）仍是讨论最热烈的长尾未决问题。

---

## 🚀 版本发布

**[v0.22.3-nightly.20260829.e5cb60ad48](https://github.com/QwenLM/qwen-code/releases)**

- **feat(web-shell)**: 在分支选择器旁显示 Git 状态提示（[PR #10397](https://github.com/QwenLM/qwen-code/pull/10397) by @wenshao），提升 Web Shell 中 Git 操作的可视性
- **feat(review)**: Review 功能增强（发布说明截断，详见 Release 页面）

---

## 🔥 社区热点 Issues（Top 10）

| # | Issue | 状态 | 关注度 | 为什么重要 |
|---|-------|------|--------|-----------|
| 1 | [#5975](https://github.com/QwenLM/qwen-code/issues/5975) 流式 API 超时：120s 无输出后报错 | 🔴 OPEN | 💬 14 | **社区讨论最多的问题**。模型输出 Thought 后流式中断，v0.19.3 起频繁复现，直接影响核心使用体验，挂有 `welcome-pr` 标签等待社区修复 |
| 2 | [#8124](https://github.com/QwenLM/qwen-code/issues/8124) 启动 Banner 首次渲染丢失顶部行 | 🔴 OPEN | 💬 13 | 间歇性 UI 渲染缺陷，与待处理的 provider 更新相关，Windows 平台高发，定位难度大 |
| 3 | [#10520](https://github.com/QwenLM/qwen-code/issues/10520) toolSearch threshold > 0 导致 llama.cpp 400 错误 | 🟡 OPEN | 💬 4 | **今日新报**，已标记 `ready-for-human`。影响本地 llama.cpp 服务器 + MCP 工具组合，threshold 设 0 可绕过，是本地推理生态兼容性的典型问题 |
| 4 | [#8172](https://github.com/QwenLM/qwen-code/issues/8172) Agent Team 消息在整个多轮任务期间被排队 | ✅ CLOSED | 💬 4 | 长期存在的多智能体通讯延迟问题，队友消息需等 leader 完全空闲才投递。今日关闭，对应修复见 PR #9638 |
| 5 | [#8625](https://github.com/QwenLM/qwen-code/issues/8625) Windows 终端中文拼音输入显示不清 | ✅ CLOSED | 💬 8 | 中文用户高频痛点，影响 Windows 平台 IME 输入体验，今日修复关闭 |
| 6 | [#9025](https://github.com/QwenLM/qwen-code/issues/9025) Keyless Vertex AI 环境变量无法推断，无头模式启动失败 | ✅ CLOSED | 💬 5 | 企业级部署场景（ADC 认证）的阻塞性问题，`getAuthTypeFromEnv` 推断逻辑缺陷已修复 |
| 7 | [#10385](https://github.com/QwenLM/qwen-code/issues/10385) Web Shell 消息编辑传入错误的 turn 索引 | ✅ CLOSED | 💬 4 | 今日关闭中**唯一 P1 级**缺陷：编辑消息时用窗口

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*