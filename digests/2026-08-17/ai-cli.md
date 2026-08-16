# AI CLI 工具社区动态日报 2026-08-17

> 生成时间: 2026-08-16 20:36 UTC | 覆盖工具: 7 个

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



---



</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报

**日期：2026-08-17** | 数据来源：github.com/openai/codex

---

## 📌 今日速览

Codex 发布 **rust-v0.148.0-alpha.20** 预发布版本。社区讨论焦点集中在 **Windows/WSL 环境下的会话历史丢失与路径映射问题**，多条高热度 Issue 持续发酵。PR 侧活动密集（14 条更新），TUI、沙箱安全和诊断工具迎来多项改进，其中 `/cd` 工作目录切换命令和 `codex doctor` 端点保护检测值得关注。

---

## 🚀 版本发布

**rust-v0.148.0-alpha.20**（[Release](https://github.com/openai/codex/releases)）
- 0.148.0 系列的第 20 个 alpha 预发布，延续高频迭代节奏，暂未附详细 changelog。

---

## 🔥 社区热点 Issues（Top 10）

**1. [#28094](https://github.com/openai/codex/issues/28094) — WSL 项目路径被改写为 C:\home，丢失项目关联**（26 评论）
Windows/WSL 用户的核心痛点：Codex Desktop 将 `/home` 路径错误重写为 Windows 路径，导致项目聊天关联丢失、有效工作目录被报为不存在。评论数为今日最高，WSL 生态受影响面广。

**2. [#17540](https://github.com/openai/codex/issues/17540) — 旧会话线程从侧边栏消失**（22 评论，6 👍）
Pro 用户报告重启后旧线程不再显示，但磁盘数据仍在。数据"假性丢失"问题已持续 4 个月未解，是历史管理类最长寿的 Issue 之一。

**3. [#20864](https://github.com/openai/codex/issues/20864) — 桌面端全量扫描 sessions 文件导致卡顿**（20 评论，6 👍）
App 无视桌面侧的会话索引状态，直接扫描 `~/.codex/sessions` 下所有 rollout 文件，长使用周期后性能显著劣化。直接关联今日多个性能类 PR。

**4. [#32177](https://github.com/openai/codex/issues/32177) — 文本日志附件触发 "Request blocked" 并污染后续对话**（18 评论，**19 👍**）
今日 👍 最多的 Issue：向会话附加纯文本应用日志即触发请求拦截，且中毒状态延续到后续轮次。反映内容过滤误判对真实开发工作流的阻塞。

**5. [#34833](https://github.com/openai/codex/issues/34833) — MultiAgentV2 跨提供商子代理无法消费加密任务**（12 评论，3 👍）
OpenAI 父代理 + 自定义提供商子代理架构下，任务分配以加密内容下发，第三方模型无法解析。多智能体 + BYO 模型组合的关键缺陷。

**6. [#27928](https://github.com/openai/codex/issues/27928) — Azure 环境下 /review 后续调用失败**（12 评论）
Azure OpenAI/Foundry 用户执行 `/review` 跟进时报 `Expected an ID that begins with 'msg'`，企业 Azure 部署路径的 review 功能不可用。

**7. [#20833](https://github.com/openai/codex/issues/20833) — 项目侧边栏隐藏旧工作区对话**（10 评论，5 👍）
与 #17540 同族：本地线程数据存在但 UI 不展示，用户已提交应用内反馈 ID 辅助排查。

**8. [#26236](https://github.com/openai/codex/issues/26236) — 应用更新后聊天历史消失**（9 评论）
免费版 Windows 用户遭遇，将"历史丢失"问题扩展到更新触发场景，覆盖面进一步扩大。

**9. [#32538](https://github.com/openai/codex/issues/32538) — Windows 自动审批评审死锁**（7 评论，4 👍）
Auto-review 被 TurnComplete 后无界界的 rollout 刷盘阻塞，最终超时报错。审批自动化与 IO 管道的设计冲突。

**10. [#38792](https://github.com/openai/codex/issues/38792) — 0.146.1 线程历史游标失步且后续版本未修复**（3 评论，昨日新建）
本期最有趣的元事件：该报告由 **Claude（Anthropic）代其管理的 Codex CLI 集群用户提交**，含精确测量的诊断数据——AI 代理为竞品 CLI 提交深度 bug 报告，成为 Agent 生态协作的标志性样本。

---

## 🔧 重要 PR 进展（Top 10）

| PR | 状态 | 内容 |
|---|---|---|
| [#38902](https://github.com/openai/codex/pull/38902) | 🟢 OPEN | **按环境生效的 shell 变量策略**：`ShellEnvironmentPolicy` 随 `EnvironmentConfig` 解析，shell 命令、用户任务和统一执行均遵循所选环境策略 |
| [#38894](https://github.com/openai/codex/pull/38894) | ✅ 已关闭 | **TUI 新增 `/cd` 命令**：空闲会话中切换工作目录且保留对话历史，支持相对路径，省略参数回到 `~` |
| [#38827](https://github.com/openai/codex/pull/38827) | ✅ 已关闭 | **`codex doctor` 增加端点保护检测**：识别 macOS/Windows 上的安全软件并提示需要配置的 Codex 排除项——直击 #19166 类崩溃问题 |
| [#38830](https://github.com/openai/codex/pull/38830) | ✅ 已关闭 | **外部编辑器缓冲区隔离**：编辑器临时文件移入受保护的 `editor` 目录，避免沙箱可写路径暴露 composer 文本（安全加固） |
| [#38893](https://github.com/openai/codex/pull/38893) | ✅ 已关闭 | **线程时间戳上限独立恢复**：`updated_at_ms` 与 `recency_at_ms` 分离子查询加载——直接服务于历史排序/显示类 bug 修复 |
| [#38817](https://github.com/openai/codex/pull/38817) | ✅ 已关闭 | **TS SDK 原始配置覆盖**：新增 `configOverrides` 支持点号路径键等结构化 API 无法安全表达的 TOML 配置 |
| [#38806](https://github.com/openai/codex/pull/38806) | ✅ 已关闭 | **code-mode gRPC 健康检查端点**：`GET /healthz` 支持 HTTP/1.1 与 HTTP/2，便于容器化部署探活 |
| [#38819](https://github.com/openai/codex/pull/38819) | ✅ 已关闭 | **保留线程 ID 的元数据暂存**：`ThreadManager::reserve_thread_id` 允许在 Core 启动线程前关联宿主状态 |
| [#38840](https://github.com/openai/codex/pull/38840) | ✅ 已关闭 | **远程控制握手识别 Mac mini 主机**：握手时发送设备类型头，改进移动端远程控制的设备识别 |
| [#31817](https://github.com/openai/codex/pull/31817) | 🟢 OPEN | **自动更新 models.json**：模型清单例行刷新，或预示新模型/配置变更 |

> 💡 观察：今日 PR 绝大多数由 `copyberry[bot]` 自动化流水线产出，另有 #38823/#38822 两项 TUI 渲染内存分配优化，显示团队在长会话性能上持续投入。

---

## 📈 功能需求趋势

1. **Windows/WSL 一等公民支持**——今日 30 条热帖中约 1/3 带 `windows-os` 标签，路径映射、代理穿透、文件监听、崩溃问题集中爆发
2. **会话历史可靠性**——历史丢失/隐藏/损坏类 Issue 占比最高，横跨 Desktop、CLI、IDE 扩展三端
3. **长会话性能与上下文管理**——rollout 文件全量扫描、压缩断连（#31375）、短会话误压缩（#29426）指向上下文管道的系统性压力
4. **多智能体 + 跨提供商编排**——MultiAgentV2 与自定义 provider 的兼容性问题开始涌现
5. **远程/移动工作流**——SSH 远程控制、移动端配对类需求持续存在

---

## ⚠️ 开发者关注点

- **数据安全感缺失**：历史"消失"类问题（#17540/#26236/#20833）虽多为索引层故障，但持续侵蚀用户信任，社区呼吁官方提供索引重建工具
- **长会话是重灾区**：恢复长线程时的空白终端（#34724）、崩溃（#19166）、游标失步（#38792）表明 100+ 轮对话的稳定性仍是短板
- **企业环境兼容性**：Azure（#27928）、系统代理（#15447）、端点防护软件干扰等企业场景问题修复缓慢
- **误判阻塞工作流**：内容过滤误触发（#32177）后污染整个会话，用户缺乏自救手段
- **诊断能力不足**：#24484 等增强请求反映社区希望内置更智能的故障诊断（今日 `codex doctor` PR 是积极信号）

---

*本报告基于 GitHub 公开数据自动汇总，由 AI 分析师生成。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-08-17** | 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 1. 今日速览

过去 24 小时社区动态集中在两条主线上：**Sub-agent 可靠性**（虚假成功上报、挂起、越权运行等 P1 问题持续发酵，其中 #22323 已有官方修复 PR #28815 提交）和 **Auto Memory 子系统的安全与质量整改**（维护者一次性提交 4 个跟踪 Issue）。同时，社区贡献者 @Xsidz 集中提交了十余个高质量修复 PR，其中 **Homebrew 弃用公告**（#28844）和 **`--list-models` 新参数**（#28843）尤为值得关注。夜间版本 v0.56.0 正常发布。

---

## 2. 版本发布

- **v0.56.0-nightly.20260816** 已发布（[Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260815.g2a87e7be1...v0.56.0-nightly.20260816.g2a87e7be1)）
  - 常规 nightly 构建，无独立 Release Notes。注意 PR #28838 修复了 nightly 性能测试因 ripgrep 导入名变更导致的启动失败，预计将在后续 nightly 中生效。

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 优先级 | 热度 | 关注理由 |
|---|-------|--------|------|----------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 触发 MAX_TURNS 后恢复时误报 GOAL 成功 | P1 | 💬 12 | **今日最热**。子代理达到轮次上限后中断，却上报"成功"，掩盖真实失败，直接误导主代理决策。修复 PR #28815 已提交，形成 issue-PR 闭环。 |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist agent 无限挂起 | P1 | 👍 8 | 用户反馈委派给 generalist agent 后简单操作（如创建文件夹）挂起超过 1 小时，禁用子代理可规避。是子代理信任度问题的典型代表。 |
| 3 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由 | P2 | 💬 8 | 高讨论度的架构提案：Gemini 3 原生偏好 bash 链式操作（grep/cat/sed/awk），如何在释放该能力的同时保障安全。方向性话题，涉及产品底层设计。 |
| 4 | [#24353](https://github.com/google-gemini/gemini-cli/issues/24353) 组件级评估体系（EPIC） | P1 | 💬 7 | 官方行为评估（behavioral evals）后续规划，已有 76 个测试用例覆盖 6 个支持的 Gemini 模型。反映官方以评测驱动 agent 质量的策略。 |
| 5 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知的文件读取/搜索/代码库映射评估 | P2 | 💬 7 | 探索 AST 工具能否减少错位读取、降低 token 噪音、优化 codebase_investigator。配套调查 issue [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) 推荐 tilth/glyph 作为起点。 |
| 6 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 主动使用 skills 和子代理的频率过低 | P2 | 💬 6 | 用户反馈即使任务高度相关（如 gradle/git skills），模型也不会自主调用子代理。与 #21409 的"挂起"形成有趣的对照——一个用太多，一个不肯用，暴露路由策略的不稳定。 |
| 7 | [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) Shell 命令执行完毕后卡在 "Waiting input" | P1 | 👍 3 | 极简单的命令执行完成后 TUI 仍显示活动状态并等待输入，影响日常使用的核心体验。 |
| 8 | [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) Auto Memory 增加确定性脱敏并减少日志 | P2 | 💬 4 | **安全类重点**：当前脱敏依赖模型在上下文中事后处理，密钥已进入模型上下文；且服务可能记录 skill 相关日志。同日还有 [#26522](https://github.com/google-gemini/gemini-cli/issues/26522)（低信号会话无限重试）、[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)（无效 memory patch 静默跳过）、[#26516](https://github.com/google-gemini/gemini-cli/issues/26516)（总跟踪），显示 Auto Memory 正在系统性整改。 |
| 9 | [#22093](https://github.com/google-gemini/gemini-cli/issues/22093) v0.33.0 起子代理绕过权限配置运行 | P2 | 💬 3 | 用户明确禁用 agent 模式后子代理仍被自动启用，属于权限回归类问题，安全敏感。 |
| 10 | [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) Agent 应阻止/劝阻破坏性操作 | P2 | 💬 3 | 模型在存在更安全替代方案时仍使用 `git reset --force` 等命令；涉及数据库等资源时风险更高。与 #19873 的沙箱话题互补，同属"安全护栏"方向。 |

---

## 4. 重要 PR 进展（Top 10）

| # | PR | 状态 | 内容 |
|---|-----|------|------|
| 1 | [#28815](https://github.com/google-gemini/gemini-cli/pull/28815) | 🟢 OPEN | **P1** 修复 #22323：子代理在 MAX_TURNS/TIMEOUT 后的最后恢复轮中调用 `complete_task` 时，保留原始终止原因，不再误报 GOAL 成功。由 SSR Agent 自动生成。 |
| 2 | [#28812](https://github.com/google-gemini/gemini-cli/pull/28812) | 🟢 OPEN | **P1** 修复 #21477：为 `getProcessInfo()` 等依赖外部命令的调用添加执行超时，防止裸 Linux 终端下 TUI 在 "Initializing..." 无限挂起。 |
| 3 | [#28844](https://github.com/google-gemini/gemini-cli/pull/28844) | ✅ CLOSED | **分发渠道重要变化**：`gemini-cli` 已从 homebrew-core 弃用，文档新增提示引导新用户改用 npm 安装，并更新版本升级提示。 |
| 4 | [#28843](https://github.com/google-gemini/gemini-cli/pull/28843) | ✅ CLOSED | 新增 `gemini --list-models` 参数，以 JSON 输出可用模型后退出，便于编排器和集成方程序化发现模型，无需进入交互式 REPL。 |
| 5 | [#28840](https://github.com/google-gemini/gemini-cli/pull/28840) | 🟢 OPEN | 修复 ACP `PromptResponse` 丢失 cached/thought token 计数的问题——此前重度使用 prompt

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期**：2026-08-17 | **仓库**：[github/copilot-cli](https://github.com/github/copilot-cli)

---

## 一、今日速览

过去 24 小时无新版本发布，但社区 Bug 报告活跃度显著上升，新增 4 条高质量报告（#4504–#4507）。焦点集中在三方面：**1.0.80 引入的 MCP OAuth 回归**、**会话恢复机制的可靠性缺陷**（恢复后报错、静默归档），以及**内存压力监控器误判导致 OOM 的严重问题**。昨日报告的 Slack 集成 SDK 认证问题（#4503）已关闭，是本期唯一获得官方闭环的 Issue。

---

## 二、版本发布

过去 24 小时无新 Release。（鉴于 #4490 报告 1.0.80 存在 OAuth 回归，建议关注官方是否会发布修复版本。）

---

## 三、社区热点 Issues（Top 10）

### 1. [#4503] SDK server 无认证即报告就绪，Slack 会话创建失败（已关闭）✅
**链接**：https://github.com/github/copilot-cli/issues/4503
本期评论最多（5 条）且已关闭。根因极具诊断价值：SDK server 在环境缺少 `COPILOT_SDK_AUTH_TOKEN` 时仍报告 ready，错误被泛化为“无法创建会话”，掩盖了真实故障。对集成方（如 Slack DM 场景）排查认证问题有参考意义。

### 2. [#3392] NixOS 上 Bash 工具自 1.0.49 起完全不可用
**链接**：https://github.com/github/copilot-cli/issues/3392
**9 👍**，本期最高。5 月 19 日提交至今近 3 个月未修复，附有 strace 详细分析。平台级阻断问题（`Failed to start bash process`），反映出 NixOS 等非主流发行版的支持欠账。

### 3. [#4490] 1.0.80 Atlassian MCP OAuth 回归（RFC 8414 §3.3）
**链接**：https://github.com/github/copilot-cli/issues/4490
**最新版本回归**：1.0.78 正常、1.0.80 失败。授权服务器 issuer 与元数据发现 URL 不匹配校验过严导致拒绝连接。影响所有使用 Atlassian MCP 的用户，升级需谨慎。

### 4. [#4506] 内存压力监控器在 23% 上下文使用率时强制压缩，循环直至 OOM
**链接**：https://github.com/github/copilot-cli/issues/4506
今日新增，严重性高。压缩触发条件是**进程内存**而非上下文压力，且单次仅回收 0.003% token 却反复执行，最终 OOM。长会话稳定性的核心威胁。

### 5. [#4505] 会话恢复后残留过期 connection item ID，会话不可恢复
**链接**：https://github.com/github/copilot-cli/issues/4505
今日新增。恢复会话后每个请求都报 `400 input item ID does not belong to this connection`，重试无效，**`/fork` 也无法绕过**，会话实质报废。

### 6. [#4472] MCP token 刷新期间并发调用各自新建 rmcp service，取消在途调用
**链接**：https://github.com/github/copilot-cli/issues/4472
并发场景的深度缺陷：多个工具调用同时触发 token 刷新时，每次刷新都创建新 service 实例，导致在途调用被 "transport closed" 取消。附有完整复现分析。

### 7. [#4488] Windows 多会话并存时插件更新被文件锁阻塞
**链接**：https://github.com/github/copilot-cli/issues/4488
其他 Copilot CLI 或 VS Code 会话持有的文件锁会阻塞无关插件的更新（"Access is denied"），需关闭所有会话才能更新，工作流中断明显。

### 8. [#4486] 编辑权限请求出现超时
**链接**：https://github.com/github/copilot-cli/issues/4486
报告者为 **@dscho**（Git 与 GitHub 资深维护者）。权限请求未及时响应即超时，对挂机过夜、多会话并行的用户干扰极大，为新近引入的行为变化。

### 9. [#4504] account.getQuota 将请求时间戳误作 resetDate 返回
**链接**：https://github.com/github/copilot-cli/issues/4504
今日新增，JSON-RPC API 正确性缺陷。报告附完整请求/响应示例，配额重置时间无法据此判断，影响依赖此接口做用量管理的集成方。

### 10. [#4473] claude-haiku-4.5 子代理不支持 'medium' reasoning effort
**链接**：https://github.com/github/copilot-cli/issues/4473
CLI 内部路由子代理任务到 `claude-haiku-4.5` 时附带不支持的 reasoning effort 参数，直接报错。模型路由参数与模型能力映射的校验缺失。

> **其他值得关注**：#4507（`-p` 非交互模式忽略仓库级 `enabledPlugins`，配置面不一致）、#4474/#4502（会话被静默归档且无恢复入口）、#4489（恢复会话不还原所选 agent）、#4463（Windows MCP OAuth 间歇性 socket 10013）。

---

## 四、重要 PR 进展

本期仅 1 条 PR 更新，且质量存疑：

- **[#3163] ViewSonic monitor**：https://github.com/github/copilot-cli/pull/3163
  5 月开启、昨日仍有活动。内容为"monitor for #2591, #3561, #3559"并提及触发 GitHub Action runners，**与仓库主题无关，疑似误提交或滥用行为**，建议维护者审查关闭。

总体来看，PR 通道本期近乎沉寂，无功能性或修复性代码合入，与 Issue 侧的高活跃形成对比。

---

## 五、功能需求趋势

从本期 18 条 Issue 中可提炼出五个方向：

| 方向 | 相关 Issue | 信号强度 |
|---|---|---|
| **会话生命周期管理**（恢复、归档/反归档、agent 持久化） | #4502、#4474、#4489、#4505 | ★★★ 最高频，4 条独立 Issue 指向同一痛点 |
| **MCP 生态健壮性**（OAuth 回归、并发刷新、Windows 兼容） | #4490、#4472、#4463 | ★★★ 连续多日新增，跨平台扩散 |
| **插件系统成熟化**（依赖声明与解析、更新机制） | #4487、#4488、#4507 | ★★ 依赖模型属新功能提案 |
| **非交互/ACP 与交互模式对齐** | #4275、#4507 | ★★ 两个独立面（contextTier、plugins）暴露一致性缺口 |
| **模型路由与 API 正确性** | #4473、#4504、#4498 | ★★ 参数校验与返回值准确性 |

---

## 六、开发者关注点

1. **升级 1.0.80 存在回归风险**：Atlassian MCP OAuth 断裂（#4490），依赖 MCP 的团队建议暂缓升级或回退 1.0.78。
2. **长会话是重灾区**：内存监控误压缩致 OOM（#4506）、恢复后 ID 失效（#4505）、权限请求超时（#4486）、静默归档（#4474）——多条 Issue 均在长时/多会话场景触发。
3. **认证链路脆弱且报错泛化**：SDK 无 token 即 ready（#4503）、OAuth 间歇性失败（#4463）、并发刷新竞态（#4472），且错误信息常掩盖根因，排查成本高。
4. **Windows 平台体验滞后**：文件锁阻塞插件更新（#4488）、socket 10013（#4463）

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期**：2026-08-17 ｜ **数据来源**：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

> 数据说明：过去 24 小时内共 5 条 Issue、2 条 PR 有更新，无新版本发布。本期为低活跃日，以下全量列出，不做凑数筛选。

---

## 📌 今日速览

过去 24 小时无新版本发布，社区焦点集中在两件事：**#2604 报告周配额疑似缩水 3–5 倍且无官方公告**（附客户端级埋点数据，涉及计量透明度），以及 **#2605 指出 CronCreate 定时任务在 TUI 中无任何管理入口**（当天创建当天关闭）。此外，两个沉寂数月的功能请求（Session 删除命令、记忆层优化）重新活跃，社区贡献者 @Ricardo-M-L 的两个修复 PR 也有更新。

---

## 📦 版本发布

过去 24 小时无新 Release。

---

## 🔥 社区热点 Issues（5 条）

### 1. #2604 周配额疑似缩水 3–5 倍且无公告，附埋点前后对比数据 [OPEN]
🔗 https://github.com/MoonshotAI/kimi-cli/issues/2604

**为何重要**：直接涉及订阅服务的计量透明度与用户信任。作者为 Vivace 档会员，自 7 月中旬起通过脚本在 API 层面构建 JSONL 账本，逐日记录原始 token 消耗（新输入 + 缓存读取 + 输出），数据显示有效周配额缩减约 3–5 倍。究竟是条款静默变更还是计量回归，需要官方明确回应。目前 2 条评论。

### 2. #2605 CronCreate 定时任务无用户可见的管理入口 [CLOSED]
🔗 https://github.com/MoonshotAI/kimi-cli/issues/2605

**为何重要**：模型通过 `CronCreate` 工具创建的定时任务，用户在 TUI 中完全无法查看或管理——没有 `/cron` 命令，`/tasks` 面板只显示 shell 后台任务和子代理，官方文档也无说明。任务文件实际持久化在 `~/.kimi-code/cron/<工作目录哈希>/` 下，普通用户无从得知。这是典型的"隐藏状态"可用性问题。值得注意的是，该 Issue 创建（08-16）当天即被关闭，关闭原因值得跟进。

### 3. #2600 Windows PowerShell 7 默认 D 盘启动时路径找不到 [OPEN]
🔗 https://github.com/MoonshotAI/kimi-cli/issues/2600

**为何重要**：v0.33 版本 Windows 兼容性 bug。用户将 PowerShell 7 默认启动目录设为 D 盘（非 C 盘系统目录）后，kimi code 无法找到路径。影响所有使用非默认启动配置的 Windows 用户。已有 5 条评论，讨论较活跃。

### 4. #1783 请求添加 /delete 命令删除 Session [OPEN]
🔗 https://github.com/MoonshotAI/kimi-cli/issues/1783

**为何重要**：4 月提出的长期功能请求，8 月仍有更新（6 条评论）。当前删除 session 需手动清理 `~/.kimi/sessions/` 目录，涉及三类场景：session 列表过多难管理、释放磁盘空间、**敏感信息彻底清除**。反映 session 生命周期管理尚未成熟。

### 5. #1478 记忆层优化请求：大项目场景下很痛苦 [OPEN]
🔗 https://github.com/MoonshotAI/kimi-cli/issues/1478

**为何重要**：3 月提出的老请求（4 条评论），8 月重新活跃。作者指出参考文档中几乎没有记忆相关内容（仅见 agent.md），并援引了其他工具的分层记忆架构（SOUL.md / USER.md / MEMORY.md / 每日记忆目录）作为参考。大项目上下文与记忆管理是持续性痛点。

---

## 🔧 重要 PR 进展（2 条）

### 1. #2324 fix(web): 处理 SessionProcess.send_message 中的 BrokenPipeError [OPEN]
🔗 https://github.com/MoonshotAI/kimi-cli/pull/2324

修复 `src/kimi_cli/web/runner/process.py` 中的竞争条件：`send_message` 在方法开头调用 `start()` 与实际写入 `process.stdin` 之间，子进程可能已退出，未做防护的写入和 `drain()` 会抛出 BrokenPipeError。影响 Web 模式会话稳定性。由 @Ricardo-M-L 于 5 月提交，至今开放约 3 个月。

### 2. #2449 fix(string): shorten_middle 在长度检查前先剥离换行符 [OPEN]
🔗 https://github.com/MoonshotAI/kimi-cli/pull/2449

修复 `shorten_middle(text, width, remove_newline=True)` 在短输入时提前返回、未折叠换行的问题。该函数被 `extract_key_argument` 用于渲染工具调用关键参数的**单行**摘要（`width=50`），换行残留会破坏 TUI 单行显示。同为 @Ricardo-M-L 提交，开放约 2 个月。

---

## 📈 功能需求趋势

综合本期及近期 Issues，社区关注集中在四个方向：

| 方向 | 代表 Issue | 核心诉求 |
|---|---|---|
| **会话/状态生命周期管理** | #1783、#2605 | 用户对 CLI 产生的持久化状态（sessions、cron 任务 JSON）需要完整的管理入口，而非手动操作文件系统 |
| **记忆与上下文管理** | #1478 | 大项目场景下记忆层薄弱，且缺少官方文档说明 |
| **用量透明度与可观测性** | #2604 | 配额计量规则变更需提前公告，用户有 API 层面对账需求 |
| **Windows/跨平台兼容性** | #2600 | 非默认环境配置（启动目录、盘符）下的边缘场景测试不足 |

---

## ⚠️ 开发者关注点

- **配额透明度是当前最敏感问题**：#2604 附带了相当严谨的埋点数据，若官方不及时回应，可能引发订阅用户信任危机。
- **"模型创建的隐藏状态"缺乏用户入口**：cron 任务静默写入本地 JSON 但 TUI 不可见，这类问题会随 agent 能力增强而放大。
- **长尾功能请求响应缓慢**：#1783、#

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报

**日期：** 2026-08-17 | **数据来源：** [anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 📌 今日速览

过去 24 小时无新版本发布，社区讨论焦点集中在 **Desktop 端稳定性**（5 分钟超时、内置工具报错）与**本地模型兼容性**（Qwen 系列系统消息限制）两大主题。值得注意的是，多位贡献者实现「当天提 Issue、当天交 PR」的快速响应，同时 `opencode-agent[bot]` 自动化提交的修复（如 #42921、#42849）已在当天合入，社区运转效率颇高。

---

## 📦 版本发布

无新版本发布。

---

## 🔥 社区热点 Issues

**1. [#26602](https://github.com/anomalyco/opencode/issues/26602) Desktop 对慢速本地 Provider 固定 5 分钟超时（11 评论）**
本期最热 Issue。Desktop 端对本地 OpenAI 兼容 Provider 的请求在恰好 5 分钟后被 `Headers Timeout Error` 中断，且 `"timeout": false` 配置不生效。该问题自 5 月持续至今，反映 Desktop 用户运行本地推理场景的核心痛点。

**2. [#8689](https://github.com/anomalyco/opencode/issues/8689) 支持从 AI 消息回退/Fork（16 👍）**
本期最高赞需求。目前只能从用户消息创建分支，社区强烈希望在任意 AI 回复处 fork 会话，属于长会话探索工作流的高频诉求。

**3. [#17471](https://github.com/anomalyco/opencode/issues/17471) 模型输出达 token 上限时自动继续（11 👍）**
大上下文模型（如 Claude Opus 4.6 百万级窗口）场景下，`finish_reason: "length"` 导致任务中断，社区希望自动续写，与自动化流水线场景高度相关。

**4. [#20458](https://github.com/anomalyco/opencode/issues/20458) TUI 退出后终端鼠标转义序列乱码（7 评论 / 4 👍）**
退出 TUI 后终端输出 `35;89;19M...` 之类的乱码，影响后续终端操作体验，长期未解。

**5. [#42909](https://github.com/anomalyco/opencode/issues/42909) Qwen 3.8 拒绝多条系统消息（新增）**
`qwen3.8:27b` 在 `/v1/chat/completions` 收到多条 system 消息即报错，而 OpenCode 等代理客户端常发送多条。与已关闭的 [#16560](https://github.com/anomalyco/opencode/issues/16560)（qwen3.5 同类问题）呼应，PR [#42801](https://github.com/anomalyco/opencode/pull/42801) 正在跟进修复。

**6. [#42920](https://github.com/anomalyco/opencode/issues/42920) WebUI 版本号始终比实际低 1（新增）**
老毛病复发：从 1.14（[#24286](https://github.com/anomalyco/opencode/issues/24286)）、1.15（[#29301](https://github.com/anomalyco/opencode/issues/29301)）到如今 1.18，`opencode upgrade` 后 WebUI 版本号始终落后 CLI 一个 patch 位，暗示升级流程存在系统性缺陷。

**7. [#42880](https://github.com/anomalyco/opencode/issues/42880) 高速生成 .so 文件损耗 SSD（新增）**
用户报告 opencode 在 `/tmp` 中以极高频率写入 `.so` 文件造成 SSD 磨损，并分享了 tmpfs RAM Disk + 定时清理的临时方案。硬件级影响，值得维护者优先排查。

**8. [#42923](https://github.com/anomalyco/opencode/issues/42923) mimo-v2.5 子代理陷入无限思考循环消耗额度（新增）**
作为 subagent 模型运行时进入永不结束的 thinking 循环，持续扣费且无超时保护，

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-08-17 | 数据来源：github.com/QwenLM/qwen-code**

---

## 一、今日速览

多智能体（multi-agent）协作成为今日焦点：贡献者 @netbrah 单日集中报告了 4 个 Team 功能缺陷（成员消息被误判为 shutdown、任务分派不生效、提示词与运行时行为矛盾、task_list 空过滤器误过滤），并同步提交了 3 个修复 PR，形成“报告+自修复”的完整闭环。同时，`/review` 平台持续工业化演进（增量评审、跨 rebase 判定迁移、Aone Code 接入），一条 P1 级 CI 安全问题（PAT 凭据与不可信代码共宿主机）引发持续讨论。

---

## 二、版本发布

| 版本 | 类型 | 要点 |
|---|---|---|
| [v0.21.12-preview.5](https://github.com/QwenLM/qwen-code/compare/v0.21.12...v0.21.12-preview.5) | Preview | 预览通道例行发布 |
| [v0.21.11-nightly.20260816](https://github.com/QwenLM/qwen-code/releases) | Nightly | autofix 新增 deny-by-default footprint 门控与位置窗口审计（PR #9156）；web-shell 修复 |
| [dsw-eas-full-20260816-r3](https://github.com/QwenLM/qwen-code/releases) | Benchmark | 基于 v0.21.12 的完整 E2E 基准：SWE-bench Verified (500) + Terminal-Bench 2.0 (89)，包代理作用域收敛至 verifier 依赖出口 |
| [dsw-eas-full-20260816-r2](https://github.com/QwenLM/qwen-code/releases) | Benchmark | 同一基准链路的上一轮全量重跑 |

---

## 三、社区热点 Issues（Top 10）

1. **[#9089](https://github.com/QwenLM/qwen-code/issues/9089) · P1 · CI 安全：PAT 任务与不可信分支代码共宿主机，需 runner 级隔离**
   唯一 P1。autofix 携带 PAT 的作业与不可信 PR 代码跑在同一 runner，该攻击面**无法在 GitHub Actions step 内部关闭**，需要基础设施层（runner 隔离）解决。安全敏感，持续 3 天讨论未决。

2. **[#9276](https://github.com/QwenLM/qwen-code/issues/9276) · P2 · Team 成员无法向 leader 发送普通消息**
   成员发送 completion/状态消息被运行时误判为 shutdown 请求，报错 "Only the team leader can request shutdowns"。多智能体核心链路阻断，5 条评论，配套修复 PR #9287 已提交。

3. **[#9282](https://github.com/QwenLM/qwen-code/issues/9282) · P2 · 手动任务指派持久化但不派发**
   leader 将任务设为 `in_progress` 且指定 `owner` 后，空闲成员收不到任何任务提示——自动投递路径只认领无主 `pending` 任务，导致指派任务永久搁浅。修复见 PR #9288。

4. **[#9283](https://github.com/QwenLM/qwen-code/issues/9283) · P2 · Agent-team 提示词与自动投递行为矛盾**
   运行时会自动向 leader 转发成员的最终答案，但普通/plan 类提示词却要求显式 `send_message`，且承诺了不存在的 peer 消息摘要——提示词与实现脱节会误导模型行为。

5. **[#5966](https://github.com/QwenLM/qwen-code/issues/5966) · P2 · 中文输入法定期完全失效（0.19.3）**
   长期悬置的用户侧痛点：除 UI 闪烁外，中文输入法间歇性失效只能输拼音，且无报错难以定位。开放近两个月仍处 need-information 状态，标注 welcome-pr。

6. **[#8962](https://github.com/QwenLM/qwen-code/issues/8962) · P2 · tmux/远程环境下无法使用（持续闪烁）**
   终端渲染高频闪烁到“闪瞎眼睛”的程度，缩小窗口至 400x300 才勉强可用。与 #5966 同属渲染层顽疾，远程开发场景基本不可用。

7. **[#9253](https://github.com/QwenLM/qwen-code/issues/9253) · P2 · Web Shell 开发标签页在 daemon 重启后白屏**
   dev server/Vite 重启后长开标签页白屏，无报错、无恢复 UI，只能手动刷新。影响 daemon 开发者日常体验。

8. **[#9278](https://github.com/QwenLM/qwen-code/issues/9278) · P2 · 设计文档：/review 发布时收敛建议（遥测+诊断+操作员Owned发布面）**
   深度设计 issue：剖析“评审→修复→diff 膨胀→更多 finding”的**失控回路**（回路增益 >1，唯一阻尼是 prose 约定），提出系统化收敛方案。中文撰写，状态 in-progress。

9. **[#9205](https://github.com/QwenLM/qwen-code/issues/9205) · P2 · 同一 PR 并发评审在固定 worktree 路径上互踩**
   两个会话评审同一 PR 时，一个会话的清理动作删掉另一个正在使用的 worktree（审计记录 5 次未担保的删除）。并发安全缺陷，影响重度评审工作流。

10. **[#9275](https://github.com/QwenLM/qwen-code/issues/9275) · P3 · 功能请求：GitHub Copilot 认证接入**
    希望通过 `/auth` 复用 Copilot 订阅登录并使用其可用模型（含 device flow）。生态互操作性方向的需求信号，标注 need-discussion。

---

## 四、重要 PR 进展（Top 10）

1. **[#8992](https://github.com/QwenLM/qwen-code/pull/8992) · feat(mcp): MCP 2026 核心与 WebShell Apps host**
   首个 MCP 2026 客户端切片：自动协商新协议、宣告 Apps 扩展、保留 `ui://` 工具元数据、拉取并校验声明的 HTML 资源。协议栈升级的基石 PR。

2. **[#9288](https://github.com/QwenLM/qwen-code/pull/

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*