# AI CLI 工具社区动态日报 2026-08-16

> 生成时间: 2026-08-15 20:36 UTC | 覆盖工具: 7 个

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



---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据来源：anthropics/skills 仓库热门 PR（50 条中前 20）与 Issues（50 条中前 15）| 数据截止 2026-08-16
> 口径说明：本期 PR 评论数字段缺失，热度依据评论数排序位次推断；所示 20 条 PR **全部处于 OPEN 状态**，无一合并——社区贡献积压是本仓库当前显著特征。

---

## 一、热门 Skills 排行（Top 8）

| # | Skill / PR | 类型 | 状态 |
|---|---|---|---|
| 1 | skill-creator eval 工具链修复 | 核心修复 | OPEN |
| 2 | document-typography | 新增 | OPEN |
| 3 | odt (OpenDocument) | 新增 | OPEN |
| 4 | skill-quality/security-analyzer | 新增（元技能） | OPEN |
| 5 | self-audit | 新增 | OPEN |
| 6 | testing-patterns | 新增 | OPEN |
| 7 | servicenow | 新增 | OPEN |
| 8 | pyxel | 新增 | OPEN |

1. **skill-creator eval 修复**（#1298，@MartinCajiao）— 评论热度第一。修复 `run_eval.py` 恒报 `recall=0%` 的核心缺陷（关联 [#556](https://github.com/anthropics/skills/issues/556)，10+ 独立复现），同时解决 Windows 流读取、触发检测与并行 worker。**讨论热点**：描述优化循环“在对抗噪音”这一根本性失效。→ [PR #1298](https://github.com/anthropics/skills/pull/1298)

2. **document-typography**（#514，@PGTBoos）— 针对 AI 生成文档的排版质控：孤行（orphan wrap）、寡行标题、编号错位。“用户很少主动要求好的排版，但每个文档都受影响”的定位引发共鸣。→ [PR #514](https://github.com/anthropics/skills/pull/514)

3. **odt**（#486，@GitHubNewbie0）— OpenDocument（.odt/.ods）创建、模板填充与 ODT→HTML 转换，覆盖开源/ISO 标准格式场景，持续更新 6 周。→ [PR #486](https://github.com/anthropics/skills/pull/486)

4. **skill-quality-analyzer + skill-security-analyzer**（#83，@eovidiu）— 元技能双件套：五维质量评估（结构/文档/示例等加权打分）+ 安全分析，直指社区对 Skill 供应链质量的焦虑。→ [PR #83](https://github.com/anthropics/skills/pull/83)

5. **self-audit**（#1367，@YuhaoLin2005）— 交付前审计：先机械验证所有声称产出文件存在，再按损害严重度做四维推理审计，与 Issue [#1385](https://github.com/anthropics/skills/issues/1385) 的质量门提案形成呼应。→ [PR #1367](https://github.com/anthropics/skills/pull/1367)

6. **testing-patterns**（#723，@4444J99）— 全栈测试方法论：Testing Trophy 模型、AAA 单测规范、React Testing Library 组件测试等。→ [PR #723](https://github.com/anthropics/skills/pull/723)

7. **serv

---

# Claude Code 社区动态日报
**日期：2026-08-16** | 数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## 一、今日速览

Claude Code 发布 **v2.1.233**，为 `--worktree` 和 `claude agents` 视图新增 GitLab MR 支持，企业代理场景的身份透传能力同步增强。社区侧，**Windows 平台稳定性问题持续发酵**——BSOD、GPU 崩溃、MSIX 更新失败等问题合计占据热门 Issue 半壁江山；同时 **Desktop 跨会话消息回归缺陷**（#86012 / #86069）形成新的问题簇。数据安全方面，Cowork 项目丢失、会话文本渲染缺失等 data-loss 类报告值得警惕。

---

## 二、版本发布

### v2.1.233
- **GitLab MR 集成**：`--worktree` 标志与 `claude agents` 视图现支持 GitLab merge request URL，MR 在视图中以 `!N` 形式显示。
- **企业网关身份透传**：新增可选开关 `forward_user_identity`（Anthropic upstream 的 apps gateway 设置），可将登录用户身份以 HTTP header 形式转发给后端代理，便于企业审计与细粒度访问控制。

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 关注度 |
|---|-------|--------|
| 1 | [#32870](https://github.com/anthropics/claude-code/issues/32870) Windows BSOD（Wof.sys 目录枚举触发） | 41 评论 |
| 2 | [#81698](https://github.com/anthropics/claude-code/issues/81698) Desktop GPU 进程崩溃致全部会话丢失 | 31 评论 |
| 3 | [#21236](https://github.com/anthropics/claude-code/issues/21236) 允许禁用自动 git worktree 创建 | 108 👍 |
| 4 | [#11455](https://github.com/anthropics/claude-code/issues/11455) 会话交接/连续性支持 | 25 评论 |
| 5 | [#86012](https://github.com/anthropics/claude-code/issues/86012) + [#86069](https://github.com/anthropics/claude-code/issues/86069) 跨会话消息无响应 | 各 23 评论 |
| 6 | [#67021](https://github.com/anthropics/claude-code/issues/67021) 内置 ugrep 正则编译 OOM | 19 评论 |
| 7 | [#67071](https://github.com/anthropics/claude-code/issues/67071) 工具调用间文本不渲染（数据已持久化） | 12 评论 / 10 👍 |
| 8 | [#86280](https://github.com/anthropics/claude-code/issues/86280) Cowork 全部项目丢失 | data-loss |
| 9 | [#86986](https://github.com/anthropics/claude-code/issues/86986) setup-token 全量 400 报错 | 今日新增 |
| 10 | [#85422](https://github.com/anthropics/claude-code/issues/85422) Token 消耗熔断机制 | 功能请求 |

**要点解读：**

1. **#32870 BSOD 问题**：`claude.exe` 在目录列举（`NtQueryDirectoryFileEx`）时经 `Wof.sys` 触发 Windows 蓝屏，已确认可复现且标记为外部依赖问题。运行 5 个月仍未解决，是评论区最活跃的 Issue。
2. **#81698 GPU 崩溃级联**：Desktop 应用 GPU 进程崩溃（RTX 5080 环境）会连带杀掉所有运行中的会话，暴露了 Electron 多会话架构缺乏进程隔离保护的短板。
3. **#21236 worktree 可控性**：108 👍 的最高票请求近日关闭。社区长期希望对关联仓库**关闭自动 worktree 创建**，与本次 v2.1.233 持续迭代 worktree 功能的方向呼应。
4. **#86012 / #86069 跨会话消息回归簇**：两名独立用户报告相同根因——消息送达目标会话的 composer 后**未被提交**，目标会话完全无响应（`hadFirstResponse=false`），直至 15-20 分钟后被空闲超时强杀。已标记 regression，是 Desktop agents 功能的关键缺陷。
5. **#67021 ugrep 内存爆炸**：`-E` 模式下含两个有界区间 `.{0,N}` 的正则在 DFA 构造阶段分配数 GB 内存，可被无意识打爆主机，属于潜在的稳定性/安全风险。
6. **#67071 静默数据丢失**：工具调用之间的助手文本在 GUI/CLI 均不渲染（JSONL 中完整存在），被标记为 #41814 问题族的回归，且被新模型放大。
7. **#86280 Cowork 项目全丢**：macOS 更新/重启后 `local-agent-mode-sessions` 被重建为空；同时曝出 `cleanupPeriodDays=30` 默认值**静默删除**会话记录，双重 data-loss 引发信任担忧。
8. **#86986 CI 阻塞**：`claude setup-token` 签发的长效 OAuth token 首次请求即遭 400 拒绝，本地与 CI 均可复现，直接影响自动化流水线，建议 CI 用户关注。
9. **#85422 成本控制诉求**：请求引入**运行时强制的 token 消耗熔断**（按 hooks/plugins/subagents 归因分账），而非仅警告，反映重度用户对失控消耗的焦虑。

---

## 四、重要 PR 进展

> 过去 24 小时内仅 1 个 PR 有活动更新，本节据实呈现。

- **[#86870](https://github.com/anthropics/claude-code/pull/86870)** `fix: prevent false-positive CVP status changes during authorized security research`
  提交者 @JoTalbot。修改 `security-guidance/hooks/review_api.py` 中的安全触发器逻辑：在触发安全审查前增加任务上下文校验（新增 `is_authorized_lab()` 标志识别经授权的安全实验室环境，扩展 `cap_diff_for_prompt()` 读取会话元数据中的 CVS 状态），避免授权安全研究工作被误判拦截。PR 描述以俄语撰写，侧面反映贡献者的国际化构成。

---

## 五、功能需求趋势

从今日活跃 Issue 中可提炼出五个明确方向：

1. **Worktree 行为可控化**：最高票诉求（#21236，108 👍）是让自动 worktree 创建可关闭/可配置；#84258 同时报告 worktree 隔离过度阻断只读 `git -C` 调用——「隔离」与「灵活」需要更好的平衡。
2. **会话连续性与多会话协作**：#11455（会话交接）持续活跃，#86012/#86069 的回归说明跨会话消息已成为高频使用路径，其可靠性是 agents 体验的生命线。
3. **成本治理**：#85422 的 token 熔断器请求代表了企业用户对「可执行预算上限 + 消耗归因」的刚需。
4. **Desktop 工作流集成**：#54614 请求通过 CLI 参数/deep link 直接在指定目录打开新 Code 会话（跳过 Cowork 主页）；#74534 请求语音听写的 15s/2min 超时可配置——重度用户在把 Desktop 当主力 IDE 用。
5. **平台健壮性（尤其 Windows）**：BSOD、GPU 崩溃、MSIX 反篡探误报（#84841/#84865）、Code Integrity 拦截（#80999）构成 Windows 体验的主要减分项。

---

## 六、开发者关注点

- **Windows/MSIX 打包是重灾区**：过去 24 小时热门 Issue 中约 1/3 与 Windows 相关。MSIX 的 AppData 虚拟化被反篡探机制误判为 junction 攻击（`PlantDetectedError`），导致商店版**永远无法自动更新**——企业用户建议暂避 MSIX 渠道。
- **数据丢失信任危机**：三起独立 data-loss（#86280 项目丢失、#67071 文本不渲染、cleanupPeriodDays 静默清理）叠加，社区开始呼吁显式的数据保留策略与恢复手段。
- **权限系统行为不透明**：#57132 中 `~/.claude/` 下的 allow 规则在 `/permissions` 显示已加载但运行时不生效；#84258 中 PreToolUse hook 显式批准仍被 worktree 隔离硬阻断——「配置可见但行为不符」是最消耗用户信任的缺陷类型。
- **CI/自动化可靠性**：#86986 的 setup-token 400 问题是今日新增的高优先级阻塞项；#84474 报告 Workflow 代码审查的 PR 评论发布**静默失败却报告成功**，对 CI 场景是双重打击（既没发出去，又以为发了）。
- **文档与实际行为脱节**：多份报告附带 documentation 标签（#57132、#84258），提示文档同步滞后于功能演进。

---

*本报告基于过去 24 小时 GitHub 公开数据自动汇总， Issue 共 50 条（展示 30 条），PR 共 1 条。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报

**日期：2026-08-16** | 数据来源：[github.com/openai/codex](https://github.com/openai/codex)

---

## 📰 今日速览

今日 Codex 连发两个 alpha 版本（v0.148.0-alpha.18/19），迭代节奏密集。社区最大焦点是 **Windows 桌面端 26.810 更新引发的 CPU 空转回归**——多条高热 Issue 集中爆发（#38547、#38510 已关闭，#38551、#38716 仍待修复）。同时 copyberry 机器人当日合入十余个功能/修复 PR，覆盖 TUI 体验、hooks 引擎、exec 可观测性等方向，其中存储诊断、分页历史修复直接呼应近期高热 Issue。

---

## 🚀 版本发布

| 版本 | 说明 |
|---|---|
| [rust-v0.148.0-alpha.19](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.19

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-08-16** | 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 📌 今日速览

过去 24 小时，Gemini CLI 发布了 v0.56.0 nightly 版本，最大亮点是 **"SSR Agent" 自动化修复代理集中产出 8+ 个 Issue 修复 PR**（包括 P1 级 Subagent 终止原因误报问题），形成"AI 修 AI"的独特景观。同时，**行为评估（Behavioral Evals）基础设施迎来三个大型 PR 扩充**，安全方向（SSRF 防护、Node 22 升级、Auto Memory 脱敏）持续推进。社区侧，Subagent 可靠性仍是最高频的痛点话题。

---

## 🚀 版本发布

### [v0.56.0-nightly.20260815.g2a87e7be1](https://github.com/google-gemini/gemini-cli/releases)
- 将 `a2a-server` 测试中的 `process.env` 直接修改迁移至 Vitest 的 `vi.stubEnv()`，规范测试环境管理（[PR #28811](https://github.com/google-gemini/gemini-cli/pull/28811)）
- [完整 Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260814.gc0d192452...v0.56.0)

---

## 🔥 社区热点 Issues（Top 10）

**1. Subagent 达到 MAX_TURNS 后被误报为 GOAL 成功**（12 评论，P1）
[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
`codebase_investigator` 撞上最大轮次限制后仍上报 `status: "success"`，掩盖了真实中断原因。这是本日评论最多的 Issue，对应的修复 PR [#28815](https://github.com/google-gemini/gemini-cli/pull/28815) 已由 SSR Agent 提交——"Issue 被 AI 修复"的闭环值得关注。

**2. Generalist agent 无限挂起**（8 👍，P1）
[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
委派给 generalist agent 后简单操作（如建文件夹）也会永久挂起，用户等待长达一小时。手动禁止子代理可绕过，8 个 👍 反映影响面较广。

**3. Shell 命令执行完成后卡在 "Waiting input"**（4 评论，P1）
[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
命令明明已结束，UI 却仍显示激活并等待用户输入。涉及 core 执行流程的 P1 问题，3 个 👍。

**4. 【新 Issue】高内存占用，堆达 8GB**（昨日新报）
[#28829](https://github.com/google-gemini/gemini-cli/issues/28829)
用户贴出 GC 日志显示 Mark-Compact 后堆仍高达 8GB，标记为 `effort/large`。这是过去 24 小时唯一的新增 Issue，值得早期跟踪。

**5. Auto Memory 缺乏确定性脱敏，日志过量**（P2，area/security）
[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)
本地 transcript 内容先进入模型上下文、后脱敏的时序存在安全隐患，属于记忆系统的安全加固需求。

**6. Gemini 几乎不主动使用 Skills 和 Sub-agents**（6 评论）
[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)
即使存在高度相关的自定义 skill（如 gradle、git），模型也不会自主调用，需显式指令。反映调度策略的智能度不足。

**7. Subagent 自 v0.33.0 起绕过权限限制运行**（3 评论）
[#22093](https://github.com/google-gemini/gemini-cli/issues/22093)
配置为禁用的 agent 模式在升级后自动启用子代理。带安全隐患，目前状态为 need-retesting。

**8. AST 感知文件读取/搜索/映射的可行性评估**（7 评论，EPIC）
[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)
探索 AST 感知工具能否减少 token 噪声、精确读取方法边界、改进代码库导航，与 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)（调查 tilth/glyph 作为起点）构成技术路线图。

**9. 组件级评估（Component-Level Evals）EPIC**（7 评论，P1）
[#24353](https://github.com/google-gemini/gemini-cli/issues/24353)
行为评估体系已积累 76 个测试、覆盖 6 个支持的 Gemini 模型，本 EPIC 是其后续深化。今天合入的三个大型 Evals PR 均属此工作流。

**10. Browser subagent 在 Wayland 下失败**（4 评论，P1）
[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)
Linux Wayland 环境浏览器子代理直接失败，且报 `Termination Reason: GOAL` 掩盖真实错误——与 #22323 的"假成功"是同类可信度问题。

---

## 🔧 重要 PR 进展（Top 10）

**1. 修复：预览模型被静默替换时增加警告**（P1）
[#28828](https://github.com/google-gemini/gemini-cli/pull/28828)
用户请求 `gemini-3.1-pro-preview` 但账号无权限时，Config 会静默降级为 `auto-gemini-2.5` 别名——现在会明确警告。解决"模型悄悄变了"的隐蔽行为。

**2. 修复：web-fetch 中 DNS 解析绕过导致的 SSRF 漏洞**（CVSS 8.6）
[#28725](https://github.com/google-gemini/gemini-cli/pull/28725)
攻击者可通过自定义域名指向私有/回环 IP（如 `169.254.169.254`）绕过 DNS 防护。**高优先级安全修复**。

**3. 修复：沙箱 Dockerfile 升级至 node:22-slim**（P1，安全）
[#28726](https://github.com/google-gemini/gemini-cli/pull/28726)
Node 20 接近 EOL，近期 CVE 仅在 Node 22/24/26 修复。覆盖全部 cloudrun Dockerfile 实例。

**4. [SSR Agent] 保留 Subagent 恢复期间的原始终止原因**（P1）
[#28815](https://github.com/google-gemini/gemini-cli/pull/28815)
修复今日最热 Issue #22323：子代理在 `MAX_TURNS`/`TIMEOUT` 后的宽限恢复轮中调用 `complete_task` 时，不再误报成功。

**5. [SSR Agent] 为执行流程增加超时，防止 TUI 无限挂起**（P1）
[#28812](https://github.com/google-gemini/gemini-cli/pull/28812)
裸 Linux 终端启动时卡在 "Initializing..."，根源是 `getProcessInfo()` 依赖的 `ps` 命令无超时。与 #21409 挂起问题同属可靠性主线。

**6. 修复：消除 401 子串引起的误判认证错误**（P2）
[#28827](https://github.com/google-gemini/gemini-cli/pull/28827)
修复端口号、退出码等含 "401" 的无关字符串被误判为认证失败的问题，附带回归测试。

**7-9. 行为评估三部曲：任务追踪 + 错误恢复 + 多工具链**（均为 XL/L 级）
- [#28822](https://github.com/google-gemini/gemini-cli/pull/28822)：任务规划（`write_todos`）、完成信号、任务查询评估
- [#28823](https://github.com/google-gemini/gemini-cli/pull/28823)：任务图依赖、可视化、文件 404 重试、Shell 失败诊断恢复评估
- [#28824](https://

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>



</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期：** 2026-08-16 ｜ **数据来源：** [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)
**24 小时活跃度：** Releases 0 ｜ Issues 更新 5 ｜ PRs 更新 2

---

## 1. 今日速览

过去 24 小时无新版本发布，社区动态集中在两条主线：一是运行近 6 个月、累计 40 条评论的**跨会话持久记忆系统**需求（[#1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)）持续发酵；二是**订阅配额问题**集中爆发——有开发者以 wire 级仪表化数据指出周配额疑似缩水至原有的 1/3–1/5（[#2604](https://github.com/MoonshotAI/kimi-cli/issues/2604)），叠加 compaction 策略缺陷导致的 token 浪费（[#2603](https://github.com/MoonshotAI/kimi-cli/issues/2603)）。今日整体活跃度偏低，PR 侧仅 2 条 bug 修复有更新。

---

## 2. 社区热点 Issues

> 今日仅 5 条 Issue 有更新，全部收录并按重要性排序。

### ① #1283 持久记忆系统（Persistent context across sessions）🔥
**[OPEN] [enhancement]** ｜ [@CatKang](https://github.com/MoonshotAI/kimi-cli/issues/1283) ｜ 💬 40 条评论

- **为什么重要：** 请求实现完整的记忆系统，包括自动记忆（AI 自管理笔记）与手动记忆（用户自定义指令），是 CLI 类工具走向长期协作的核心能力。
- **社区反应：** 2 月底创建至今讨论不断，是全仓库热度最高的功能需求之一，今日仍有更新，持续高热。

### ② #2604 周配额疑似缩水 3–5 倍（附仪表化数据）⚠️
**[OPEN]** ｜ [@tobiu](https://github.com/MoonshotAI/kimi-cli/issues/2604) ｜ 💬 1 条评论

- **为什么重要：** 作者为 Vivace 档会员，通过脚本直连 API 层构建 JSONL 台账，逐日记录原始 token 消耗（fresh input + cache reads + output），数据显示周可用配额在无官方公告的情况下缩减约 3–5 倍。
- **社区反应：** 当日新建，直指计费透明度与计量回归问题，属敏感议题，建议官方尽快公开回应。

### ③ #2603 配额感知的上下文压缩（Quota-aware compaction）
**[OPEN]** ｜ [@salim4n](https://github.com/MoonshotAI/kimi-cli/issues/2603) ｜ 💬 0 条评论

- **为什么重要：** 当前 compaction 仅在逼近模型最大上下文时触发，而 K3 拥有 1M token 窗口（`max_context_size = 1048576`），配合默认 `reserved_context_size = 50000`，**实际会话中压缩几乎永不发生**，订阅用户的配额被无效 token 持续消耗。与 #2604 构成"配额经济学"的同一问题两面。
- **社区反应：** 新建 Issue，暂无评论，但技术论证扎实，预期会引起共鸣。

### ④ #1478 记忆层优化诉求 + 文档缺失（中英双语）
**[OPEN] [enhancement]** ｜ [@hahy36](https://github.com/MoonshotAI/kimi-cli/issues/1478) ｜ 💬 3 条评论

- **为什么重要：** 中文社区视角对 #1283 的呼应：参考文档中几乎找不到记忆相关说明（仅见 `agent.md`），大项目场景体验痛苦。作者还提供了 OpenClaw 风格的多文件记忆结构参考（`SOUL.md` / `USER.md` / `MEMORY.md` + 每日原始记录）。
- **社区反应：** 3 月创建至今仍有更新，反映记忆功能在**实现**与**文档**两端的双重缺口。

### ⑤ #1155 openai_legacy 丢失 reasoning 内容（已关闭）
**[CLOSED]** ｜ [@rongou](https://github.com/MoonshotAI/kimi-cli/issues/1155) ｜ 💬 0 条评论

- **为什么重要：** 使用 sglang / vllm 等 OpenAI 兼容后端时，`openai_legacy` provider 因未向 `OpenAILegacy` 构造器传递 `reasoning_key`，会丢弃全部 reasoning/thinking 内容，甚至触发 `APIEmptyResponseError`。
- **社区反应：** 状态已变更为 CLOSED，自托管与兼容后端用户可在新版本中验证修复效果。

---

## 3. 重要 PR 进展

> 今日仅 2 条 PR 有更新，全部收录。

### ① #2524 修复 StrReplaceFile 替换计数

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>



</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-08-16 | 数据来源：github.com/QwenLM/qwen-code**

---

## 一、今日速览

过去 24 小时项目共发布 6 个版本：1 个 nightly 功能版本 + 5 个基准测试流水线验证版本，标志着 Release → SWE-bench Verified（500 例全量）→ Terminal-Bench 2.0（89 例）的端到端自动评测链路已跑通。Issue 与 PR 动态中，最突出的信号是核心贡献者 @wenshao 对 `/review` 工具链发起的高强度"自吃狗粮"审查，单日提交了 7+ 个 P2 级流程缺陷报告，且均有对应修复 PR 跟进；同时多条 P1 级 CI E2E 失败已被 autofix 机器人认领修复。

---

## 二、版本发布

**1. [v0.21.11-nightly.20260815.c396fe3d12](https://github.com/QwenLM/qwen-code/releases)**
- 新增 autofix 默认拒绝的 footprint 门禁与位置窗口统计（[#9156](https://github.com/QwenLM/qwen-code/pull/9156)，by @wenshao），进一步收紧自动化修复的安全边界
- 包含 web-shell 修复（发布说明截断）

**2. 基准测试流水线验证系列（5 个 smoke + 1 个 full run）**
- `dsw-eas-tb-smoke-20260815-r1~r5`：通过 5 轮迭代修复 Terminal-Bench verifier 代理转义问题，最终 r5 全链路 smoke 成功（SWE-bench 1/1 resolved）
- `dsw-eas-full-20260815-r1`：启动全量基准——SWE-bench Verified 500 例 + Terminal-Bench 2.0 89 例，SWE 成功发布后才调度 Terminal-Bench
- 值得关注：这是仓库基准基础设施（Benchmark-Qwen-Ref: v0.21.12）走向常态化的关键节点

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#9089](https://github.com/QwenLM/qwen-code/issues/9089) 🔴 P1 安全 | autofix 携带 PAT 的 CI 任务与不可信分支代码共享宿主机，需 runner 级隔离。GitHub Actions 步骤内部无法闭环，是当前最高优先级的安全敞口 |
| 2 | [#9241](https://github.com/QwenLM/qwen-code/issues/9241) / [#9239](https://github.com/QwenLM/qwen-code/issues/9239) / [#9237](https://github.com/QwenLM/qwen-code/issues/9237) 🔴 P1 | 三个 main 分支 E2E CI 失败（均在测试结果产出前挂掉），均已标记 `autofix/approved`，自动化修复在途——反映 CI 稳定性仍是主要摩擦点 |
| 3 | [#5966](https://github.com/QwenLM/qwen-code/issues/5966) | 中文输入法在 0.19.3 UI 中完全失效，只能输入拼音，且无报错难以定位。开放近 2 个月、标注 welcome-pr，是中文社区最痛的用户体验问题之一 |
| 4 | [#9198](https://github.com/QwenLM/qwen-code/issues/9198) | 连续运行一周以上后 OOM（1TB 内存服务器），且 tmux 终端按键错乱、复制粘贴失效。指向长时运行内存泄漏 + 终端状态恢复缺陷 |
| 5 | [#9230](https://github.com/QwenLM/qwen-code/issues/9230) | follow-up 建议的旁路查询破坏服务端 prefix caching，主会话 prompt 缓存命中率趋近 0%，每轮全量重填上下文；`enableCacheSharing` 默认关闭。直接影响 API 成本与延迟 |
| 6 | [#9026](https://github.com/QwenLM/qwen-code/issues/9026) | headless 模式下模型在工具结果后静默结束回合即触发 `NO_TOOL_RESULT_PROGRESS` 硬失败，中断无人值守自动化任务 |
| 7 | [#7427](https://github.com/QwenLM/qwen-code/issues/7427) | web-shell artifact 面板在自动刷新时反复弹出 "Load artifacts failed" 错误，污染界面且干扰正常使用 |
| 8 | [#9209](https://github.com/QwenLM/qwen-code/issues/9209)（及 [#9219](https://github.com/QwenLM/qwen-code/issues/9219)、[#9218](https://github.com/QwenLM/qwen-code/issues/9218)、[#9208](https://github.com/QwenLM/qwen-code/issues/9208)、[#9206](https://github.com/QwenLM/qwen-code/issues/9206)、[#9207](https://github.com/QwenLM/qwen-code/issues/9207)、[#9205](https://github.com/QwenLM/qwen-code/issues/9205)） | @wenshao 系列报告：`/review` 管线最后一道门禁拒绝自身上游产出的数据格式（3 小时分析在终点失败）、overlap 检测按精确行匹配导致漏报/误杀、并发 review 竞争固定 worktree 路径、验证探针污染共享 worktree、chunk 退役静默失效。这是对自家 review 工具最彻底的一次实战审计 |
| 9 | [#9250](https://github.com/QwenLM/qwen-code/issues/9250) | `qwen serve` 的 write_file/edit/notebook_edit 无条件以 0600 权限创建新文件，忽略 umask 且无任何配置项，影响 ACP host 场景下的文件可用性 |
| 10 | [#9200](https://github.com/QwenLM/qwen-code/issues/9200) | 用户对比三份日志质疑相同任务执行过程质量波动大。属于模型侧 badcase，但社区需要稳定性预期管理 |

---

## 四、重要 PR 进展（Top 10）

1. **[#9127](https://github.com/QwenLM/qwen-code/pull/9127) — 端到端会话媒体引用**（@ytahdn）
   跨 daemon、ACP 桥、TS SDK、Web Shell 全栈实现会话级媒体引用：图片上传一次后以 media ID + 元数据流转，覆盖中途排队、消息回显、reconciliation 等路径。本周最大特性 PR。

2. **[#8467](https://github.com/QwenLM/qwen-code/pull/8467) — Web Shell Git 增强**（@BZ-D）
   Changes 视图新增 Uncommitted/Unstaged/Staged/Committed/Branch 五种 diff 来源，支持可搜索的 commit 与 branch 选择器及现有分支切换。

3. **[#9049](https://github.com/QwenLM/qwen-code/pull/9049) — 钉钉 Workspace 内置渠道**（@qqqys）
   复用已认证的 DWS CLI profile，支持私信、@提及、文档提及通知、原生 todo 变更、来源级会话隔离。

4. **[#9167](https://github.com/QwenLM/qwen-code/pull/9167) — 钉钉文件外发**（@qqqys）
   识别最终回复中的本地文件标记，校验工作区白名单后经媒体 API 上传并以原生文件消息送达。

5. **[#8927](https://github.com/QwenLM/qwen-code/pull/8927) — 渠道会话轮转 sessionRotation**（@qwen-code-dev-bot）
   新增 per-channel 配置，支持 `maxTurns` / 时长两种上限，超限后下一条消息自动开新会话，防止渠道会话无限膨胀。

6. **[#9153](https://github.com/QwenLM/qwen

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*