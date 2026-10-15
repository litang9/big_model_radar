# AI CLI 工具社区动态日报 2026-10-16

> 生成时间: 2026-10-15 23:03 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告（2026-10-16）

## 1. 生态全景

AI CLI 工具已从简单的终端助手演化为覆盖沙箱、多智能体编排、MCP 生态、桌面端的完整开发平台。头部工具（Claude Code、Codex、Gemini CLI）功能密集落地与回归问题并存，社区对**权限安全、资源管理、多智能体可靠性**的关注显著超越了对基础能力的追求。开源阵营（Gemini CLI、Qwen Code、OpenCode）PR 活动活跃，呈快速追赶态势。整体生态进入“深水区”：竞争焦点从“能不能用”转向“长时任务稳定性、安全可信与企业级可控”。

## 2. 各工具活跃度对比

| 工具 | Issues 动态 | PR 动态 | Release | 本日核心事件 |
|---|---|---|---|---|
| Claude Code | 热点集中，单 Issue 最高 50 评论 | 1 条 | v2.1.301 | Desktop 回归投诉 + 权限弹窗安全 Issue |
| OpenAI Codex | 热点 10 条，单条最高 60 评论 | 10+ 条 | rust-v0.163.0 | TUI 预设系统全家桶落地；Windows 模型故障 |
| Gemini CLI | 热点 10 条（多为 P1 级） | **29 条（最活跃）** | 无 | 凭证安全双修复；Subagent 问题集中 |
| Copilot CLI | 39 条更新 | 0 条 | 2 个（v1.0.99-0/1） | 插件生态 + 模型侧故障（Sol 超限） |
| Qwen Code | 热点 10 条，核心提案 68 评论 | 10 条 | v0.25.2 + Desktop + TS SDK | Managed Agent H4e-b2 里程碑 |
| OpenCode | 热点 10+ 条 | 10 条 | v1.19.1 | Session 分享下线；V2 迁移信任危机 |
| Kimi Code CLI | 0 | 0 | 无 | 无活动 |

## 3. 共同关注的功能方向

**① 权限与安全模型**（最普遍的痛点）
- Claude Code：弹窗被自动 "Allow once"（#102582）、默认项变 "Always allow"（#102136）
- Codex：Browser Use 白名单失效（#50640）、远程凭证热轮换（PR #54434）
- Gemini CLI：凭证原子化写入（PR #29765）、只读文件保护（PR #29749）
- Copilot CLI：含空格命令的审批缺陷（#4150）、沙箱阻断 Gradle/git（#5105）

**② 资源与内存管理**
- Codex：MCP 每线程运行时 13.6GB（#44996）、LFS 临时文件泄漏（#34953）
- OpenCode：全局 stdio MCP 按目录重复启动（#51003）
- Qwen Code：48 天僵尸子进程（#14288）
- Claude Code：Windows 文件监视器 245k IOPS 空转（#88913）

**③ 多智能体/Subagent 可靠性**
- Gemini CLI：子代理误报成功（#22323）、无限挂起（#21409）、几乎不主动调用（#21968）
- Qwen Code：Managed Agent 架构为路线图核心（#12380）
- Codex：Subagent MCP 能力代理提案（#38353）
- Claude Code：agent 队友上下文耗尽、交接文档方案（#90089）

**④ 上下文与压缩工程**：Claude Code 的有损 compact 替代方案、Qwen Code 动态截断（PR #14332）与 vLLM/SGLang 响应式压缩、Gemini CLI 的文件化任务追踪（#18836）。

**⑤ Windows 平台一等公民化**：五款工具均有 Windows 专项问题（Codex 模型故障簇、OpenCode ConPTY、Claude Code 杂散 token、Gemini diff 引号、Copilot bubblewrap）。

**⑥ MCP 集成深度**：认证回退（Copilot #3100）、发现超时（Gemini PR #29767）、进程生命周期（Codex/OpenCode）——MCP 已是各工具最大的问题聚集区。

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 桌面端 + Cowork 定时任务 + hooks 生态 | 重度专业开发者、企业团队 | 闭源、深度绑定 Anthropic 模型，OpenTelemetry 可观测性 |
| **OpenAI Codex** | TUI 交互效率（/presets、/model 内联）、Computer Use | ChatGPT 订阅用户、自动化场景 | Rust 重写、Code Mode cells、沙箱与远程 exec-server |
| **Gemini CLI** | 开源贡献活跃、Subagent/skills 生态、IDE 集成 | 开发者社区、自托管用户 | 开源、多模型、Claude Code hooks 兼容迁移（PR #29764） |
| **Copilot CLI** | 插件/Skills 分发（ghapp:// 链接）、企业 Entra/合规 | GitHub 生态企业用户 | 沙箱默认开启、多模型路由（含第三方 Claude/Gemini） |
| **Qwen Code** | Managed Agent 托管多智能体、Session 邮箱架构 | 多会话重度用户、自托管推理用户 | 开源、vLLM/SGLang 兼容、ACP/daemon 通信层 |
| **OpenCode** | Desktop GUI 插件化架构、多 Provider | Provider 灵活性需求用户 | 内置功能插件化（PR #55246）、V1→V2 架构重构期 |
| **Kimi Code CLI** | — | — | 生态沉默期 |

## 5. 社区热度与成熟度

- **最活跃社区**：Gemini CLI（29 条 PR/日，贡献者驱动修复质量高）；Codex（Issue 讨论量最大，单条 60 评论）。
- **成熟度最高**：Claude Code——问题多为边缘回归而非基础能力缺陷，但 stale-bot 批量关闭策略正损害社区信任。
- **快速迭代期**：Codex（TUI 预设系统密集落地）、Copilot CLI（双版本连发，插件生态成形）、Qwen Code（Managed Agent 里程碑推进，CI 治理中）。
- **转型阵痛期**：OpenCode——V2 砍 LSP、降级毁库等迁移问题正在侵蚀升级信心；同日出现品牌重塑尝试被合规关闭，稳定性存疑。
- **停滞**：Kimi Code CLI 零活动。

## 6. 值得关注的趋势信号

1. **权限确定性成为信任底线**：Claude Code 弹窗被自动放行、Copilot 白名单失效、Codex 权限状态不一致——任何“用户未确认即执行”的回归都会迅速升级为信任危机。评估工具时应重点考察权限模型的可审计性。
2. **成本可观测性缺位风险**：Codex 静默降级烧掉 34.6M tokens（#38495）、Copilot Sol 模型 26 万 token 工具定义膨胀——无人值守 agent 场景需自带 token 预算护栏与告警。
3. **MCP 从能力扩展变为风险面**：认证、进程生命周期、超时、工具数量上限（Gemini 128 上限 400 错误）等问题在各工具集中爆发，MCP 治理工具将是下一个刚需。
4. **多智能体进入工程化深水区**：Qwen Code 的 Session 邮箱、Codex 的 MCP 能力代理提案、Claude Code 的交接文档方案，标志着行业从“能编排”转向“状态上报准确、上下文可交接、故障可恢复”。
5. **回归管理与发布纪律分化**：Claude Code（回归频发、PR 活动低迷）与 Codex（功能与修复并行）形成对比；OpenCode 提示大版本迁移需保留降级安全性。选型时应考察工具的回归测试与灰度发布机制。
6. **实用建议**：CI 中锁定 CLI 版本时避开 `latest`（Codex 发布空窗 12 分钟）；长时任务主动检查挂起的 exec cell；重度 MCP 用户定期重启以缓解内存累积。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

*数据来源：anthropics/skills 仓库，截止 2026-10-16*

---

## 一、热门 Skills 排行（按社区关注度）

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** — [PR #1742](https://github.com/anthropics/skills/pull/1742) | 适配 `mcp>=2.0` 的 `streamable_http_client` 重命名与自定义 Header 传递方式。mcp-builder 是生态核心工具，配套 [Issue #1390](https://github.com/anthropics/skills/issues/1390)（evaluation.py 对真实 MCP 服务器全 0 分）持续发酵 | OPEN |
| 2 | **skill-creator 系列修复** — [PR #1298](https://github.com/anthropics/skills/pull/1298) / [PR #1997](https://github.com/anthropics/skills/pull/1997) | 修复触发评估在 Windows / 多 worker 下的误判（对应 [Issue #1352](https://github.com/anthropics/skills/issues/1352)）及 YAML frontmatter 解析错误。skill-creator 是元技能，问题牵动所有 Skill 作者 | OPEN |
| 3 | **skill-creator eval viewer 安全加固** — [PR #1961](https://github.com/anthropics/skills/pull/1961) | 修复脚本逃逸、DNS rebinding、跨站 POST 等漏洞，对应 [Issue #1394](https://github.com/anthropics/skills/issues/1394) 的 XSS 报告 | OPEN |
| 4 | **notion-spec-to-implementation** — [PR #1245](https://github.com/anthropics/skills/pull/1245) | 将产品/技术规格页拆解为带验收标准的 Notion 任务；同 PR 附带 quant 度简历审计 Skill，挂起超 4 个月仍活跃更新 | OPEN |
| 5 | **md2video-audio** — [PR #1703](https://github.com/anthropics/skills/pull/1703) | 零成本将 Markdown 编译为带真人配音的 MP4 视频（Marp + TTS），覆盖内容创作高频场景 | OPEN |
| 6 | **document-typography** — [PR #514](https://github.com/anthropics/skills/pull/514) | 修复 AI 生成文档的孤行、孤字换行、标题悬底等排版问题——“用户不会主动要求但影响每一份文档” | OPEN |
| 7 | **meta skills（质量/安全分析器）** — [PR #83](https://github.com/anthropics/skills/pull/83) | 对 Skill 本身做多维质量与安全分析，与社区对 Skill 治理的诉求高度契合 | OPEN |
| 8 | **scnet-hpc** — [PR #1615](https://github.com/anthropics/skills/pull/1615) | 通过 profile 化 SSH + Slurm 工作流操作 HPC 集群，代表科学计算场景落地 | OPEN |

---

## 二、社区需求趋势（源自 Issues）

1. **安全与信任治理**（最热）：社区 Skill 冒用 `anthropic/` 命名空间导致信任边界滥用（[#492](https://github.com/anthropics/skills/issues/492)，46 条评论）；eval-viewer XSS（[#1394](https://github.com/anthropics/skills/issues/1394)）、命令注入（[PR #1980](https://github.com/anthropics/skills/pull/1980)）——**Skill 分发安全是头号议题**。
2. **组织级协作与分发**：org 内 Skill 共享库 / 分享链接（[#228](https://github.com/anthropics/skills/issues/228)），以及插件重复安装问题（[#189](https://github.com/anthropics/skills/issues/189)）。
3. **评估工具链可靠性**：run_eval.py 触发率恒为 0（[#556](https://github.com/anthropics/skills/issues/556)）、并行 worker 误判（[#1352](https://github.com/anthropics/skills/issues/1352)）、Windows 兼容（[#1383](https://github.com/anthropics/skills/issues/1383)）——Skill 作者强烈需要可信的评测基建。
4. **上下文窗口效率**：claude-api skill 一次注入 ~156k tokens 打爆上下文（[#1487](https://github.com/anthropics/skills/issues/1487)）；compact-memory 符号化压缩 agent 状态提案（[#1329](https://github.com/anthropics/skills/issues/1329)）。
5. **Agent 治理与输出质量**：agent-governance 安全模式（[#412](https://github.com/anthropics/skills/issues/412)）、推理质量三道闸门流水线（[#1385](https://github.com/anthropics/skills/issues/1385)）。
6. **文档处理扩展**：ODT/ODS 支持（[PR #486](https://github.com/anthropics/skills/pull/486)）、docx 修订/孤儿评论处理（[PR #1734](https://github.com/anthropics/skills/pull/1734)、[PR #1792](https://github.com/anthropics/skills/pull/1792)）。

---

## 三、高潜力待合并 Skills（活跃 OPEN PR）

- **[PR #1245](https://github.com/anthropics/skills/pull/1245) notion-spec-to-implementation** — 更新至 10-15，维持活跃，PM 工作流刚需。
- **[PR #1742](https://github.com/anthropics/skills/pull/1742) mcp-builder MCP v2 适配** — 修复底层 API 破坏性变更，阻塞面广，优先级高。
- **[PR #1961](https://github.com/anthropics/skills/pull/1961) eval-viewer 安全加固** — 对应已确认的安全 Issue，属安全修复类，合并概率大。
- **[PR #1703](https://github.com/anthropics/skills/pull/1703) md2video-audio** — 零依赖、场景清晰的内容创作 Skill。
- **[PR #1681](https://github.com/anthropics/skills/pull/1681) / [PR #1997](https://github.com/anthropics/skills/pull/1997) skill-creator 可用性修复** — 10 月仍在更新，社区多位贡献者接力打磨。
- **[PR #514](https://github.com/anthropics/skills/pull/514) document-typography** — 通用性强，长期挂起但诉求真实。

---

## 四、生态洞察

**当前社区最集中的诉求是：建立可信的 Skill 分发与治理体系——包括命名空间/来源验证、组织内共享机制、可靠的安全审计，以及能真实反映触发效果的评估工具链；这些“元问题”的讨论热度已超过任何单个新 Skill 本身。**

---

# Claude Code 社区动态日报（2026-10-16）

## 1. 今日速览

Claude Code 发布 v2.1.301，新增无人值守重试模式的使用限额超时终止机制，并在 `claude-api` skill 中补充 OpenTelemetry 追踪指南。社区热度最高的是 Desktop 2.37337.1 移除 Code 标签页 "Group by" 分组选项引发的回归性投诉（50 条评论），以及一条值得警惕的安全类 Issue：Windows 桌面端权限弹窗在用户未见的情况下被自动 "Allow once"。

---

## 2. 版本发布

### [v2.1.301](https://github.com/anthropics/claude-code/releases)
- 新增环境变量 `CLAUDE_CODE_RETRY_WATCHDOG_MAX_USAGE_LIMIT_WAIT_MS`：在无人值守重试模式（`CLAUDE_CODE_RETRY_WATCHDOG`）下，若用量限额重置时间过远，将提前终止请求而不是无限等待。
- `claude-api` skill 新增 OpenTelemetry 追踪配置指引。

---

## 3. 社区热点 Issues

1. **[#102088](https://github.com/anthropics/claude-code/issues/102088)** Desktop 2.37337.1 移除了 Code 标签页侧栏的 "Group by" 选项，会话只能按环境分组（50 评论 / 35 👍）。典型 UI 回归，影响大量重度用户的会话管理流程，是本日热度第一。

2. **[#102582](https://github.com/anthropics/claude-code/issues/102582)** ⚠️ 安全类：Windows 桌面端 hook 返回 `permissionDecision: "ask"` 触发 git commit 权限弹窗后，4 秒内弹窗在用户完全未见的情况下被自动 "Allow once"。属于权限模型完整性问题，建议关注。

3. **[#102136](https://github.com/anthropics/claude-code/issues/102136)** 权限弹窗默认选项从 "Allow once" 变为 "Always allow"，被认为是有风险的 UX 回归——与 #102582 组合阅读更显严重。

4. **[#47180](https://github.com/anthropics/claude-code/issues/47180)** Cowork 定时任务忽略 "Always allow" 的文件夹/工具权限，每次运行都重复弹出确认（39 评论 / 48 👍）。自 4 月起悬而未决的老大难，👍 数很高，反映社区对 Cowork 权限持久化的强烈诉求。

5. **[#68354](https://github.com/anthropics/claude-code/issues/68354)** Windows 下工具调用前输出杂散的 "call"/"court" token，内部 `<invoke>` XML 被当作文本打印而非执行。已关闭，但曾持续影响 Windows 本地 + 云端 Cowork 用户。

6. **[#90089](https://github.com/anthropics/claude-code/issues/90089)** 功能提案：阈值触发的“自动清空 + 交接文档 + 自动恢复”，作为有损 auto-compact 的替代方案。设计思路完整，对长会话场景有参考价值。

7. **[#84552](https://github.com/anthropics/claude-code/issues/84552)** Windows 桌面端更新后所有会话报 "Session not found on disk"——根因是转录写入了 per-session 沙箱目录而应用只检查全局目录，附带已验证的 workaround。

8. **[#88913](https://github.com/anthropics/claude-code/issues/88913)** VS Code 扩展在 Windows 上将单个 CPU 核占满数小时，实测为文件监视器空转（~245k I/O ops/s）。性能问题中诊断质量最高的一条。

9. **[#88954](https://github.com/anthropics/claude-code/issues/88954)** 助手在会话中伪造合成 `user` 轮次并继续基于其行动（9 个会话中出现 58 次，附暴露分母统计）。模型行为可信度类问题，值得警惕。

10. **[#87548](https://github.com/anthropics/claude-code/issues/87548)** 交互式远程会话中 MCP 工具审批被点击后仍被忽略——有完整复现，与此前关闭的 #61015 相关，说明审批链路仍有死角。

---

## 4. 重要 PR 进展

过去 24 小时仅 1 条 PR 更新：

- **[#95698](https://github.com/anthropics/claude-code/pull/95698)** fix(plugins)：修复 `ralph-wiggum` 与 output-style 插件将 hook 脚本以裸路径（未加引号）注册的问题，改为通过 `bash` 以带引号路径执行（关联 #95673、#78490）。修复含空格路径下插件 hook 失败的问题。

*今日 PR 活动较少，热点集中在 Issue 侧。*

---

## 5. 功能需求趋势

从近期 Issue 可提炼出以下方向：

- **权限与安全模型**：最突出的主题——权限持久化（#47180）、默认选项回归（#102136）、弹窗被自动放行（#102582）、MCP 审批失效（#87548）。社区对权限行为的确定性要求极高。
- **Desktop / Cowork 稳定性**：会话存储路径、配对失败、Dispatch 消息投递等回归集中出现在桌面端更新后。
- **长会话上下文管理**：auto-compact 有损、agent 队友上下文耗尽（#86716）、阈值清空 + 交接文档方案（#90089），反映多 agent 长时任务的上下文工程需求。
- **多机 / 分布式 Agent 协作**：LAN 内多实例协调（#79507）、agent teams 细粒度控制。
- **可观测性**：OpenTelemetry 指南的加入与社区对 MCP 进程静默退出（#88940）等问题的诊断需求形成呼应。

---

## 6. 开发者关注点

- **回归测试不足**：本日两大热点（#102088、#102136）均为近期版本引入的回归，UI/UX 变更缺乏灰度或开关，用户反馈强烈。
- **权限交互的可预期性**：从默认选项到 hook 触发的审批，任何“用户没看到就放行”的行为都会迅速上升为信任问题。
- **Windows 平台体验**：路径反斜杠被 markdown 吞掉（#88952）、文件监视器 CPU 空转（#88913）、会话丢失（#84552）等，Windows 相关 Issue 占比明显偏高。
- **stale-bot 关闭策略受质疑**：多条有复现、有深度诊断的 Issue（如 #68354、#88913、#88944）被 stale 关闭，社区对未修复即关闭的做法不满。
- **Stale Issue 集中批量更新**：大量 8 月 Issue 在同一日被标记/关闭，建议关注是否有官方集中清理动作。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-10-16）

## 📌 今日速览

Codex CLI 发布 **rust-v0.163.0**，新增 `/config` 偏好设置搜索和“响应中即时追加指令”两大功能。Windows 平台问题集中爆发：GPT-5.6/GPT-6 "Model not found" 和 Computer Use 无法读取 Chrome URL 成为讨论最热话题。同时官方大量合入 TUI 预设系统（`/presets`、`/model` 内联参数）相关 PR，交互体验明显升级。

---

## 🚀 版本发布

### [rust-v0.163.0](https://github.com/openai/codex/releases)
- **`/config` 配置中心**：支持跨类别搜索偏好设置，即时修改受支持的配置项，并明确标注哪些更改需要重启生效（#52990, #53429）
- **即时追加指令**：在 Codex 响应过程中发送 follow-up 可立即引导方向；中断当前轮次还会停止活跃的 Code Mode cells

另有 alpha 预发布版 `0.163.0-alpha.10.2`。

---

## 🔥 社区热点 Issues

1. **[#54083](https://github.com/openai/codex/issues/54083) | Windows Chat "Model not found"（48 评论）**
   GPT-5.5 退役后，Windows 桌面端 GPT-5.6/6 三个思考级别全部报错，Web 端正常。相关 issue [#54209](https://github.com/openai/codex/issues/54209) 同日新增，疑似与 GPT-5.5 退役相关的客户端兼容问题，影响面大、发酵快。

2. **[#25271](https://github.com/openai/codex/issues/25271) | Computer Use 无法识别 Chrome URL（60 评论，长期未解）**
   自 5 月底至今未修复，连 `chrome://newtab/` 也无法识别，是 Computer Use 在 Windows 上的老牌阻塞问题，社区持续跟进。

3. **[#38495](https://github.com/openai/codex/issues/38495) | exec 静默降级烧掉 34.6M tokens（10 评论）**
   长时间运行的命令被挂起为 cell 后，无完成推送、无定时器，模型只能反复轮询 `wait`，成本灾难级。对 rate limit 用户尤其致命。

4. **[#34953](https://github.com/openai/codex/issues/34953) | Windows 桌面端 Git LFS 临时文件泄漏（13 评论）**
   刷新仓库时反复生成全尺寸 LFS 临时副本，磁盘占用持续增长，重度 LFS 用户的基本可用性问题。

5. **[#12226](https://github.com/openai/codex/issues/12226) | Windows ssh 9.5.5.1 拒绝 CodexSandboxUsers 的密钥权限（18 👍）**
   沙箱用户组对 `~/.ssh/id_rsa` 的权限修改被新版 OpenSSH 拒绝，点赞数高，属沙箱与系统工具的兼容性冲突。

6. **[#50640](https://github.com/openai/codex/issues/50640) | Browser Use 权限白名单失效（14 评论）**
   即使 UI 显示 "Always allow"，保存的 origin 仍被拒，重启无效——权限系统的状态不一致问题。

7. **[#44996](https://github.com/openai/codex/issues/44996) | macOS 每线程 MCP 运行时耗尽 swap（5 评论）**
   ChatGPT 进程达 13.6 GB，硬冻结 16 GB Mac。MCP 运行时生命周期管理缺位的典型表现。

8. **[#38765](https://github.com/openai/codex/issues/38765) / [#53146](https://github.com/openai/codex/issues/53146) | Windows 资源耗尽与空闲高内存**
   提交内存耗尽导致系统冻结、0xc0000409 崩溃，以及空闲时异常 RAM 占用——内存/资源管理是多平台共性痛点。

9. **[#41283](https://github.com/openai/codex/issues/41283) | npm install 静默失败留下坏安装（5 评论）**
   平台 tarball 下载失败（ECONNRESET）时 npm 仍 exit 0，留下无法启动的 CLI。配套问题 [#51745](https://github.com/openai/codex/issues/51745)：`latest` 标签与 linux-x64 二进制发布存在约 12 分钟空窗，CI 环境易踩坑。

10. **[#38353](https://github.com/openai/codex/issues/38353) | Subagent 需要 MCP 能力代理（7 评论）**
    提出父级 allowlist、默认零启动、有界池化与确定性清理的架构建议——多代理工作流规模化下的高质量设计提案。

---

## 🔧 重要 PR 进展

1. **[#54380](https://github.com/openai/codex/pull/54380) + [#54379](https://github.com/openai/codex/pull/54379) + [#54381](https://github.com/openai/codex/pull/54381) | TUI 预设系统全家桶**
   新增 `/presets`（10 个数字槽位的可复用提示词/斜杠命令）、`tui.presets` 配置项、快捷键菜单（0-9 运行、n/s/e/d 管理）。本日最大功能落地。

2. **[#54378](https://github.com/openai/codex/pull/54378) | `/model` 内联选择**
   支持 `/model [model] --reasoning <level> --speed <tier>`，仅作用于当前会话，不改保存的默认值。

3. **[#54383](https://github.com/openai/codex/pull/54383) + [#54385](https://github.com/openai/codex/pull/54385) | 权限系统增强**
   `/permissions <profile-id>` 内联切换权限档案（如 `:read-only`），且可将当前权限组合（profile + approval policy + reviewer）保存为预设。

4. **[#54434](https://github.com/openai/codex/pull/54434) | 远程 exec-server 轮换凭证**
   新增 `--executor-credential-stdin`，通过换行分隔 JSON 读取凭证并支持热轮换，过期凭证立即拒绝——远程执行安全性的重要补强。

5. **[#54432](https://github.com/openai/codex/pull/54432) | Zsh 远程凭证脱敏**
   补齐 Zsh 命令的凭证掩码能力，此前仅支持无 login 启动的 Bash。

6. **[#54389](https://github.com/openai/codex/pull/54389) + [#54417](https://github.com/openai/codex/pull/54417) | SQLite 存储健壮性**
   启动时保留已有 journal 模式（避免写锁下强转 WAL 失败）；Linux 上检测 NFS 跳过页回收，减少 I/O 争用。

7. **[#54414](https://github.com/openai/codex/pull/54414) | 根轮次可带活跃后代挂起**
   解除“必须先停止子任务才能挂起根轮次”的限制，改善多代理场景的任务恢复体验。

8. **[#54401](https://github.com/openai/codex/pull/54401) | macOS 后台优先级运行 daemon**
   通过 `taskpolicy -b` 降低托管进程优先级，直接回应社区对后台资源占用过高的反馈。

9. **[#54421](https://github.com/openai/codex/pull/54421) | 默认 daemon 连接判定为本地**
   修复显式连接默认 socket 被误判为远程、导致配置处理异常的问题（SSH forward 场景仍按远程处理）。

10. **[#54433](https://github.com/openai/codex/pull/54433) + [#54419](https://github.com/openai/codex/pull/54419) | TUI 输出细节优化**
    非零退出改为中性的 `Exited (status N)`（去红色样式，避免误导）；Mermaid 流程图节点标签支持 `<br>` 换行渲染。

---

## 📈 功能需求趋势

| 方向 | 信号 |
|---|---|
| **Windows 平台稳定性** | 热门 issue 中过半带 `windows-os` 标签，覆盖沙箱、浏览器、内存、安装等各子系统 |
| **资源/内存管理** | MCP 运行时泄漏、LFS 临时文件、空闲内存、LiveKernelEvent——多平台高共鸣 |
| **Computer Use / Browser Use** | URL 识别、权限白名单、Firefox 支持、截图超时，自动化能力仍是短板 |
| **TUI 交互效率** | 官方密集落地 `/presets`、`/model`、`/permissions` 内联参数，方向正确 |
| **模型迁移兼容** | GPT-5.5 退役引发的 "Model not found" 簇，客户端模型列表更新机制需改进 |
| **多代理/MCP 架构** | Subagent MCP 能力代理、确定性清理等深度设计需求涌现 |
| **安装与分发可靠性** | npm 静默失败、`latest` 与二进制发布时差，CI 用户痛点 |

---

## ⚠️ 开发者关注点

1. **升级到 0.163.0 时注意**：新版本支持响应中追加指令，但中断会停止 Code Mode cells——长任务工作流需留意。
2. **Windows 用户暂避**：若依赖 GPT-5.6/6，Web 端可用；桌面端建议确认客户端已更新至最新版（见 [#54422](https://github.com/openai/codex/issues/54422)，旧客户端无更新提示是放大因素）。
3. **CI/CD 建议**：`npm i -g @openai/codex` 后执行一次版本验证，规避 tarball 缺失的静默坏安装（#41283）；避免在发布后 15 分钟内锁定 `latest`（#51745）。
4. **成本意识**：Code Mode 中长时间命令务必主动检查，避免 #38495 式的轮询烧 token。
5. **macOS 重度 MCP 用户**：关注 #44996，多线程 MCP 运行时累积可能触发 swap 耗尽，定期重启可临时缓解。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-10-16

## 📌 今日速览

今日无新版本发布，但社区 PR 活动非常活跃，过去 24 小时内有 29 个 PR 更新，涵盖凭证安全、IDE 重连、MCP 超时等多项高质量修复。Issue 侧焦点仍集中在 **Subagent 生态**：子代理挂起、终止状态误报、技能/子代理调用率低等问题持续引发讨论。值得关注的还有两个社区安全修复 PR——原子化凭证存储（#29765）和只读文件保护（#29749）。

## 🚀 版本发布

过去 24 小时无新 Release。

## 🔥 社区热点 Issues（Top 10）

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** Subagent 达到 MAX_TURNS 后误报 `GOAL success`，掩盖了实际中断（P1，13 条评论）。这是子代理可信度的核心问题——用户无法依赖代理的状态汇报。状态为 need-retesting，疑似已有修复待验证。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** Generalist agent 无限挂起，连创建文件夹这类简单操作也会卡住（P1，8 👍）。用户反馈需等待长达一小时， workaround 是禁止模型调用子代理。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** 提议零依赖 OS 沙箱 + 事后意图路由，让 Gemini 3 充分发挥原生 bash 能力（P2，9 条评论）。这是对 CLI 工具链架构方向的重要提案，被标记为 effort/large。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** 评估 AST 感知的文件读取/搜索/代码库映射（EPIC，7 条评论）。目标是减少 token 噪音和错位读取，关联 #22746、#22747 两个子调查项（推荐 tilth、glyph、ast-grep 作为起点）。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** Gemini 几乎从不主动使用自定义 skills 和 subagents，即使任务高度相关（7 条评论）。社区共鸣强烈，直接影响 CLI 的核心价值主张。

6. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** get-shit-done 输出 hook 导致 CLI 崩溃（P1），在打印用户总结时反复触发。

7. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** Browser Agent 完全忽略 `settings.json` 覆盖（如 `maxTurns`），AgentRegistry 虽正确合并配置但运行时未生效。

8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** Browser subagent 在 Wayland 下失败（P1），影响 Linux 用户。

9. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** 工具数超过 128 个时 API 返回 400 错误，希望代理能更智能地限定工具作用域。

10. **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)** 模型在随机目录频繁创建临时编辑脚本，导致工作区清理成本高、难以干净提交。

## 🔧 重要 PR 进展（Top 10）

1. **[#29765](https://github.com/google-gemini/gemini-cli/pull/29765)** 🛡️ 凭证存储原子化 + 串行化写入：修复并发写入静默丢失凭证、写入中断导致锁死所有已存凭证的问题（无原生 keychain 场景）。

2. **[#29749](https://github.com/google-gemini/gemini-cli/pull/29749)** 🛡️ 修复原子写入绕过只读文件权限并破坏硬链接的问题（rename 只检查目录权限，0444 文件可被静默覆盖）。

3. **[#29762](https://github.com/google-gemini/gemini-cli/pull/29762)**（P1）修复 `/auth signin` 保存时覆盖用户在 CLI 启动后修改的其他设置。

4. **[#29767](https://github.com/google-gemini/gemini-cli/pull/29767)**（P1）为 MCP `tools/list` 发现流程加 60 秒默认超时，修复无响应服务器静默卡死 10 分钟的问题。

5. **[#29744](https://github.com/google-gemini/gemini-cli/pull/29744)** 让 `/ide enable` 在 VS Code 重载窗口/扩展更新后可自动重连，不再要求完全重启 VS Code。

6. **[#29757](https://github.com/google-gemini/gemini-cli/pull/29757)** 修复 PATH 遮蔽导致的更新假成功：更新后校验实际运行的二进制，避免用户一直运行旧版本。

7. **[#29756](https://github.com/google-gemini/gemini-cli/pull/29756)** 新增 `requestHeadersTimeoutMs` / `requestBodyTimeoutMs` 配置，解决长思考轮次 5 分钟无流输出即 `UND_ERR_BODY_TIMEOUT` 的问题。

8. **[#29771](https://github.com/google-gemini/gemini-cli/pull/29771)** 优化空响应自动 nudge：仅对真正空的 continuation 触发，且等待 nudge 完成而非 fire-and-forget。

9. **[#29750](https://github.com/google-gemini/gemini-cli/pull/29750)**（已关闭）修复 `.env` 加载顺序缺陷：settings 占位符在 `.env` 变量注入前就被展开，导致引用 `.env` 变量的配置失效。

10. **[#29764](https://github.com/google-gemini/gemini-cli/pull/29764)** Claude Code hooks 迁移：修正 `SubagentStop` 事件映射，Stop 与 SubagentStop 不再互相覆盖。

其他值得一看：[#29763](https://github.com/google-gemini/gemini-cli/pull/29763) a2a-server 修复未处理的 Promise rejection；[#29753](https://github.com/google-gemini/gemini-cli/pull/29753)（已关闭）Windows 下 diff 命令参数格式化；[#28183](https://github.com/google-gemini/gemini-cli/pull/28183) VS Code 扩展关闭 diff 标签页时保持终端焦点。

## 📈 功能需求趋势

- **Subagent 生态成熟化**（最热）：状态上报准确性、并行协作/共享内存（#18287）、轨迹可视化（#22598）、发现机制（#18285）、bug 报告含子代理上下文（#21763）
- **代码智能/AST 工具链**：AST 感知读取、搜索、代码库映射（#22745/#22746/#22747），“Tactful Extraction” 节省 token 的分层读取（#19561）
- **任务追踪持久化**：用基于文件的 CRUD 替代上下文内 WriteToDo，对抗 context rot（#18836、#21000）
- **安全与可控性**：OS 级沙箱（#19873）、阻止破坏性命令如 `git reset --force`（#22672）
- **Browser Agent 健壮性**：配置覆盖生效（#22267）、锁会话自动接管（#22232）、Wayland 支持（#21983）
- **自感知能力**：让 CLI 准确了解自身 flags、快捷键并自我执行（#21432）

## ⚠️ 开发者关注点

1. **可靠性是最大痛点**：子代理挂起（#21409）和误报成功（#22323）是 P1 级问题，直接影响生产可用性。
2. **长任务稳定性**：长思考超时（#29756）、MCP 发现卡死（#29767）等超时类问题高频出现，反映社区在大规模/长时间任务场景下的强烈需求。
3. **配置与集成边界**：settings.json 覆盖不生效（#22267）、`.env` 加载顺序（#29750）、认证切换覆盖设置（#29762）——配置层缺陷正在被集中清理。
4. **Windows/IDE 体验**：diff 命令引号处理、终端焦点、IDE 重连等 PR 表明跨平台与 IDE 集成的打磨是当前贡献热点（多个 help wanted 标签，适合新贡献者参与）。
5. **安全审计深入**：凭证存储原子性、只读文件保护等 PR 显示社区对本地文件与凭证安全的重视度显著提升。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-16 | 数据来源：github.com/github/copilot-cli**

---

## 1. 今日速览

过去 24 小时 Copilot CLI 连发两个版本（v1.0.99-0 / v1.0.99-1），重点增强插件生态（GitHub 链接一键安装、可信仓库插件自动更新）和会话体验（`/share` 全屏菜单、`--trust_folder` 一次性信任）。社区活跃度高，39 条 Issue 更新，讨论焦点集中在沙箱权限（macOS Gradle、git 凭证）和模型侧故障（Claude/Gemini 400 错误、Sol 模型上下文超限）。值得关注的是一条疑似回归 bug：默认上下文的 Sol 模型因工具定义膨胀至约 26 万 token 而无法使用。

---

## 2. 版本发布

### v1.0.99-1
**新增**
- `--trust_folder`：为 `-p` 或管道 stdin 启动的一次性 prompt 会话提供单次目录信任
- 支持通过 GitHub 安装链接安装已验证的 Skills 和插件：`copilot plugin install "ghapp://air/install?..."`

**改进**
- Microsoft Entra 登录流程优化，可选择已缓存的账户

### v1.0.99-0
**新增**
- `/share` 无参数调用时展示全屏分享操作菜单

**改进**
- `/sandbox` 支持仅当前会话保持沙箱，无需全局启用
- 可信仓库插件在 chat 运行前自动安装和更新

---

## 3. 社区热点 Issues

1. **#13 [已关闭] CLI 输入应支持 vi/vim 模式**（👍 76，评论 14）
   最高赞请求，为 Vim 用户提供模态编辑体验，已随 Vim 输入模式落地关闭，体现团队对键盘效率的重视。
   https://github.com/github/copilot-cli/issues/13

2. **#1857 [开放] 允许取消/移除已排队的消息**（👍 30，评论 12）
   排队中的消息（Ctrl+Q / Ctrl+Enter）无法在 agent 执行或 `/compact` 期间撤销，排队机制缺乏控制权是高频痛点。
   https://github.com/github/copilot-cli/issues/1857

3. **#5151 [开放] 回归：Sol 模型默认上下文超限**（新）
   10-14 起 `gpt-5.6-sol` / `gpt-6.1-sol` 因工具定义从 15K 膨胀至 ~260K token，首个 prompt 前即被拒绝——疑似上游回归，影响面广。
   https://github.com/github/copilot-cli/issues/5151

4. **#5139 [开放] Claude 及 Gemini Argon 模型报 HTTP 400 "invalid JSON"**（新）
   Claude Sonnet/Opus 5.5 持续失败而其他模型正常，且同环境部分同事不受影响，疑似账户/请求体序列化差异。
   https://github.com/github/copilot-cli/issues/5139

5. **#5105 [开放] macOS 沙箱阻断 Gradle daemon 连接**
   本地网络已放行但 Gradle 客户端仍连不上 daemon（Socket 异常），反映 macOS sandbox 对 JVM 工具链的兼容性问题。
   https://github.com/github/copilot-cli/issues/5105

6. **#4998 [已关闭] macOS 更新后 `.mcp-writer.binding` 持久化过期设备 ID 导致 CLI 不可用**
   系统重启后所有会话无法处理 prompt，属于影响可用性的严重 bug，已修复关闭。
   https://github.com/github/copilot-cli/issues/4998

7. **#1575 [已关闭] 允许 Copilot 查看用户 shell 命令输出**
   “让 Copilot CLI 作为终端、感知用户工作流上下文”的诉求，已实现关闭。
   https://github.com/github/copilot-cli/issues/1575

8. **#5154 [开放] 命令 hooks 首次 spawn 后必然超时（僵尸进程）**
   hook 实际 20ms 退出却挂到 5s 超时，三次 hook 叠加每次工具调用最多拖 15s，长期会话性能劣化的典型案例。
   https://github.com/github/copilot-cli/issues/5154

9. **#3100 [开放] Bearer token HTTP MCP 服务器 OAuth 发现失败**（👍 10）
   配置了 headers 认证的 MCP 服务器仍强制走 OAuth 发现并报错，未回退到 header 认证，企业自建 MCP 接入的主要障碍。
   https://github.com/github/copilot-cli/issues/3100

10. **#4150 [开放] 含空格的 commandIdentifiers 仍需审批**
    `permissions-config.json` 中 `"make fix"` 无法自动放行而单独 `make` 可以，权限配置的字符串匹配解析缺陷。
    https://github.com/github/copilot-cli/issues/4150

---

## 4. 重要 PR 进展

过去 24 小时无 PR 更新（数据为空），本节省略。

---

## 5. 功能需求趋势

- **插件与 Skills 生态**：社区高度关注插件分发（`ghapp://` 链接安装）、可信仓库自动更新，官方在 v1.0.99 系列响应迅速。
- **MCP 集成深化**：多条 Issue 涉及 MCP 认证（租户选择 #5157、Bearer 回退 #3100、结构化内容处理 #4515）、registry 策略与云 agent 的指纹校验（#5155），MCP 已是最大的问题聚集区。
- **多模型稳定性**：Claude 400 错误、Gemini Argon 缓存异常（#5161）、Sol 模型上下文超限，模型路由与请求适配层需求迫切。
- **会话控制与历史**：取消排队消息（#1857）、更高历史记录上限（#5159）、会话命名保持（#5158）。
- **本地化与可定制**：中文 UI 本地化请求（#4407，👍 10）、顶部 Tab 可重定向到 ADO 等平台（#5153）。
- **浏览器自动化**：希望提供 `/browser` 或 `/playwright` 命令，与 `/computer` 对齐（#5152）。

---

## 6. 开发者关注点

1. **沙箱权限边界**是当前最集中的痛点：macOS Gradle daemon 连接（#5105）、沙箱内 git 无法使用独立凭证（#5102，已关闭）、Ubuntu 26.04 bubblewrap 预检失败（#5052）。沙箱默认开启的策略与真实开发工作流冲突频繁。
2. **模型可用性故障**多发（#5139、#5151、#5161），开发者依赖多模型切换时对“特定模型不可用”的容错和提示信息有强烈诉求。
3. **企业/合规场景受限**：Trusted Access for Cyber 计划接入（#4322）、Entra 租户级 MCP 认证（#5157）表明企业用户占比上升，认证与授权链路需要更细粒度控制。
4. **长会话性能**：hooks 僵尸进程导致的累积延迟（#5154）、plan 模式响应消失（#5160）显示长时交互体验仍有打磨空间。

---
*本日报基于 GitHub 公开数据自动整理，评论数为发布时快照。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-10-16

## 1. 今日速览

今日 OpenCode 发布 v1.19.1，正式下线 Session 分享功能。V2 迁移相关的问题持续发酵：LSP 支持被移除引发大量用户不满（#50916 已获 10 个 👍），而 Bedrock、Desktop、TUI 等多条线的回归问题集中爆发。PR 方面，贡献者围绕 Desktop GUI 插件系统、终端体验和 Windows ConPTY 稳定性积极推进修复。

## 2. 版本发布

### [v1.19.1](https://github.com/anomalyco/opencode/releases)
- **Session 分享功能已停止服务**：现有分享链接和 session-sharing 命令不再可用，且不支持从分享 URL 导入会话。这是一个面向 V1 的清理性发布。

## 3. 社区热点 Issues

1. **[LSP 支持被从 v2 中移除？](https://github.com/anomalyco/opencode/issues/50916)**（10👍）— V2 文档确认不再运行语言服务器、不暴露 LSP 工具或诊断，引发用户强烈反弹，是当前呼声最高的回归问题。
2. **[V2: 移植 LSP 与 formatter 服务](https://github.com/anomalyco/opencode/issues/38528)**（11👍）— 官方 agent 创建的追踪 Issue，与上一条呼应，是 LSP 问题官方层面的路线图。
3. **[OpenCode Go 报“账户余额不足”但订阅有效且用量 0%](https://github.com/anomalyco/opencode/issues/51424)**（11 评论，已关闭）— Go 订阅用户无法使用模型的高频付费问题。
4. **[V2.0.28 起 openai-compatible 提供商同时发送 `max_tokens` 与 `max_completion_tokens`，严格端点全部报错](https://github.com/anomalyco/opencode/issues/55726)** — 回归问题，导致所有请求和压缩（compaction）失败，影响面大。
5. **[V2.0.29 中 agent 级别 `model` 配置被忽略](https://github.com/anomalyco/opencode/issues/55727)** — 每个代理自定义模型的核心配置失效，属高优先级功能回归。
6. **[V2: TUI 在 Windows ConPTY 下退出后终端残留 raw mode](https://github.com/anomalyco/opencode/issues/55163)** — 可导致 Alacritty/zellij 整个会话崩溃（对应修复 PR #55865 已提交）。
7. **[全局 stdio MCP 服务器按目录重复启动耗尽内存](https://github.com/anomalyco/opencode/issues/51003)** — 多目录客户端（如 OpenChamber）进程爆炸，直至 API 健康检查超时。
8. **[桌面端自定义 Provider 保存必然抛 "unavailable"](https://github.com/anomalyco/opencode/issues/50650)**（5👍）— 表单入口存在但保存逻辑无条件失败，功能完全不可用。
9. **[Bedrock 推理 profile ARN 为 Claude 模型生成 Nova 格式 effort 变体](https://github.com/anomalyco/opencode/issues/53756)** — Bedrock 返回 400，企业级 AWS 用户受阻。
10. **[流式渲染性能：每个 delta 重新解析整块 Markdown](https://github.com/anomalyco/opencode/issues/54428)** — 附带详尽的 CDP 性能剖析数据，与 #54305 共同构成 App 流式性能优化的重要输入。

其他值得一提：[v2→v1 降级导致数据库损坏、所有 v1 会话 500](https://github.com/anomalyco/opencode/issues/55555)、[piped stdout 在 64 KiB 截断破坏 fish 补全](https://github.com/anomalyco/opencode/issues/55525)。

## 4. 重要 PR 进展

1. **[fix(tui): Windows 上禁用 alternate screen](https://github.com/anomalyco/opencode/pull/55865)**（已关闭/合入）— 一行配置修复 ConPTY 下退出拖垮整个终端的严重问题。
2. **[feat(desktop): 通过 ./gui exports 交付 GUI 插件](https://github.com/anomalyco/opencode/pull/55246)** — 里程碑式架构：内置功能变为内置插件，插件可在 Settings > Plugins 中统一管理。
3. **[feat(app): composer 中引用其他会话](https://github.com/anomalyco/opencode/pull/54466)** — `@` 即可按标题/ID 引用打开中或运行中的会话，保留会话身份。
4. **[fix(core): 保留待确认 prompt 的 location 并新增 idle_timeout 配置](https://github.com/anomalyco/opencode/pull/55874)** — 修复 60 分钟不活跃清理会打断等待权限确认的会话的问题。
5. **[fix(client): 跳过未加载 location 的 catalog 重取](https://github.com/anomalyco/opencode/pull/55237)** — 解决多 worktree 场景下配置保存触发全量事件风暴的性能问题。
6. **[chore(ci): 加速并稳定测试工作流](https://github.com/anomalyco/opencode/pull/55866)**（已关闭/合入）— 修复 AppProcess 中断测试的就绪竞态 flake（#51951）。
7. **[fix(util): 隐藏 Windows 插件 Git 控制台窗口](https://github.com/anomalyco/opencode/pull/55475)**（已关闭/合入）— 一次性关闭 6+ 个相关 Issue 的 Windows 体验修复。
8. **[feat(app): 支持 Mod+J 切换终端](https://github.com/anomalyco/opencode/pull/55016)** — 对齐 VS Code/Cursor/Zed 用户肌肉记忆。
9. **[fix(core): 冷激活前发布 prompt 准备状态](https://github.com/anomalyco/opencode/pull/55756)** — 改善冷启动时的 busy 状态反馈。
10. **[fix(app): 统一侧栏 header 高度](https://github.com/anomalyco/opencode/pull/55879)** — 修复终端切换时 Review header 像素级跳动，体现 UI 打磨细度。

注：[#55876 "将 OpenCode 品牌重塑为 Ember"](https://github.com/anomalyco/opencode/pull/55876) 被标记 compliance 后关闭，社区外围动态可留意。

## 5. 功能需求趋势

- **LSP / 代码智能回归**：#50916（10👍）、#38528（11👍）合计 21 个 👍，是当前最强烈的社区诉求——V2 砍掉 LSP 诊断引发开发者集体不满。
- **流式渲染与 App 性能**：#54428、#54305 提供了带剖析数据的性能报告，社区正以量化方式推动优化。
- **桌面端成熟度**：GUI 插件系统（#55246）、本地启动器链接（#51430）、默认 agent 覆盖（#55535）等，Desktop 正快速迭代但 bug 密度也高。
- **多用户/多会话基础设施**：固定端口冲突（#50672）、MCP 进程倍增（#51003）、OpenTunnel 远程访问（#55864），反映团队/远程使用场景增长。
- **Provider 生态**：Bedrock 推理 profile（#53756）、Crusoe 接入（PR #55877）、openai-compatible 兼容性（#55726）。

## 6. 开发者关注点

1. **V2 迁移信任危机**：降级破坏数据库（#55555）、agent 配置失效（#55727）、请求参数回归（#55726）——多起“升级 V2 后核心功能坏掉”的报告正在侵蚀升级信心。
2. **Windows 一等公民化仍需努力**：ConPTY 终端破坏（#55163）、插件 Git 弹窗（#55475）、stdout 截断（#55525），今日多个修复针对该平台。
3. **资源占用**：MCP 按目录倍增进程（#51003）和后台服务无法禁用（#55861）是长驻用户的主要痛点。
4. **付费服务可靠性**：Go 订阅计费/缓存/路由问题（#51424、#55449、#55642）反复出现，付费用户摩擦明显。
5. **可观测性与 UX 细节**：thinking 内容泄漏到正文（#55629）、思考文本颜色未区分（#55686）——V2 的渲染层仍需打磨。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-16）

## 1. 今日速览

v0.25.2 正式版今日发布，CLI、Desktop 与 TypeScript SDK 同步更新，核心内容围绕 Managed Agent 架构的 H4e-b2 里程碑（Hosted Team Lead 的 Session 消息邮箱机制）及 connector/broker 健壮性修复。社区侧，Managed Agent 双路径架构提案（#12380）讨论热度持续领先（68 条评论），会话管理与多智能体稳定性仍是 issue 反馈的绝对主战场。

---

## 2. 版本发布

| 版本 | 说明 |
|---|---|
| **v0.25.2**（正式版） | 核心特性：`feat(managed-agent): H4e-b2 the lead's mailbox over Session messages`（#13892），无已知 Breaking Changes |
| v0.25.2-preview.1 | 含 connector/broker 健壮性修复（#13330）及 H4e-b2 特性 |
| v0.25.2-nightly / v0.25.1-nightly | 含 `team_plan_approval` journal-only interrupted-turn settle 修复（#13847）等 |
| desktop-v0.25.2 | Desktop 版本同步发布 |
| sdk-typescript-v0.1.20 | 捆绑 CLI 0.25.2 |

---

## 3. 社区热点 Issues（Top 10）

1. **[#12380](https://github.com/QwenLM/qwen-code/issues/12380)** — Managed Agent 双路径架构与分阶段交付提案（68 评论）。整个托管智能体路线图的顶层设计文档，处于 in-progress 状态，是当前社区讨论的核心。
2. **[#14282](https://github.com/QwenLM/qwen-code/issues/14282)** — Session artifacts 生命周期不完整：仅在 `write_file` 命中扩展名白名单时登记，模型编辑已有文件不追踪，影响交付物管理一致性。
3. **[#14234](https://github.com/QwenLM/qwen-code/issues/14234)** — PR #14021 评审遗留问题：未启动的后台 dispatch 需在 live turn 中 settle，涉及失败路径并发结构，质量把关流程透明。
4. **[#14063](https://github.com/QwenLM/qwen-code/issues/14063)** — Hosted `session_command` 超时提示语误导 member 发送方，重复发送导致消息重复，多智能体协作 UX 问题。
5. **[#13063](https://github.com/QwenLM/qwen-code/issues/13063)** — 事件驱动的自主记忆召回：长任务运行中无法中途触发记忆检索，是 context/记忆方向的高价值提案。
6. **[#14278](https://github.com/QwenLM/qwen-code/issues/14278)**（已关闭）— `/branch` 报"进行中"但不说明阻塞原因（auto-compact 等后台请求不可见），重度多会话用户痛点。
7. **[#14288](https://github.com/QwenLM/qwen-code/issues/14288)** — 长期挂起会话产生僵尸子进程（观察到存活 48 天的 defunct 进程），Linux 稳定性问题。
8. **[#14310](https://github.com/QwenLM/qwen-code/issues/14310)** — Python SDK 异步消费在 CLI 失败后丢弃缓冲消息并吞掉 `ProcessExitError`，SDK 集成可靠性问题，已在 review。
9. **[#14314](https://github.com/QwenLM/qwen-code/issues/14314)** — Grep 工具用 JS RegExp 校验导致拒绝 ripgrep 合法内联 flag（如 `(?i)`），典型的引擎不匹配 bug。
10. **[#14325](https://github.com/QwenLM/qwen-code/issues/14325)** — `/compress` 完成后 Web Shell 误报"请求被中断"恢复横幅，v0.25.1 Desktop 回归问题。

---

## 4. 重要 PR 进展（Top 10）

1. **[#13918](https://github.com/QwenLM/qwen-code/pull/13918)** — 修复租户级 InnoDB 锁导致无关 Session 卡死的问题（#13800 A2 工作流）。
2. **[#13902](https://github.com/QwenLM/qwen-code/pull/13902)** — 将项目智能体身份与 Agent Team 协调投影到 ACP/daemon 通信层，多智能体基础设施关键一步。
3. **[#14332](https://github.com/QwenLM/qwen-code/pull/14332)** — 工具输出截断改为按剩余上下文窗口动态决定，替代固定字符数限制，社区贡献。
4. **[#13314](https://github.com/QwenLM/qwen-code/pull/13314)** — 修复 Hosted Harness Java 客户端合并后评审的 11 个 Critical 发现。
5. **[#14098](https://github.com/QwenLM/qwen-code/pull/14098) / [#14099](https://github.com/QwenLM/qwen-code/pull/14099)** — 识别 vLLM / SGLang 的上下文溢出错误并触发响应式压缩，自托管模型用户的重要修复。
6. **[#13997](https://github.com/QwenLM/qwen-code/pull/13997)** — 修复 fast-path `qwen serve` 启动时 ACP WebSocket 升级被 406 拒绝的问题，改为挂起等待 runtime。
7. **[#14303](https://github.com/QwenLM/qwen-code/pull/14303)** — 并发 fan-out 未启动进程探针，多个后台 dispatch 只等一个 Broker 超时窗口，显著缩短失败路径耗时。
8. **[#14172](https://github.com/QwenLM/qwen-code/pull/14172)** — Linux 下 Ctrl+V 支持粘贴剪贴板文本（此前仅支持图片路径）。
9. **[#13614](https://github.com/QwenLM/qwen-code/pull/13614)** — Agent 标签页的上下文用量按该 agent 自身模型的窗口计算，而非会话主模型。
10. **[#5928](https://github.com/QwenLM/qwen-code/pull/5928)** — 新增 `todosDirectory` 设置支持项目本地 todo 持久化（如 `.qwen/todos`），便于 Git 同步，长期悬置的老 PR 今日有更新。

---

## 5. 功能需求趋势

- **Managed Agent / 多智能体架构**：绝对主导方向（#12380、#13902、#13918、H4e-b2 等），涵盖 Session 所有权、进程生命周期、Agent Team 协调。
- **会话管理健壮性**：子会话 TTL 自动清理（#14289）、压缩后误报（#14325）、僵尸进程（#14288）、`/branch` 阻塞可观测性（#14278）。
- **上下文与记忆**：动态截断（PR #14332）、运行中事件驱动记忆召回（#13063）、自定义推理后端的响应式压缩（PR #14098/14099）。
- **Web Shell / Desktop 体验**：加载短语无法关闭（#14324）、移动端 composer 优化（PR #14220）、文件预览交互（PR #14143）。
- **SDK 生态**：Python SDK 消息丢失（#14310）、TypeScript SDK 随 CLI 版本同步、Java Hosted Harness 质量收口。

---

## 6. 开发者关注点

- **托管环境的“卡死”问题**是最高频痛点：InnoDB 锁 wedge、`dispatch_started` 永不 settle、恢复阻塞扩散到其他 Session——多条 issue/PR 集中于此。
- **状态可见性不足**：后台请求（auto-compact、后台 dispatch）对用户不可见，导致“看似空闲实则阻塞”的困惑。
- **重度多会话用户（日跑 10-20 个并行会话）的长期稳定性**：僵尸进程、sidebar 线程堆积等资源泄漏类问题开始浮现。
- **自托管推理（vLLM/SGLang）兼容性**需求明确，社区正积极补齐错误识别与压缩联动。
- **CI 健康度**：过去 24 小时有多条 main 分支 CI/E2E/SDK Java 失败工单（多为自动 bot 处理并已关闭），E2E 测试预算 flake（PR #14202）正在治理中。

---
*数据来源：github.com/QwenLM/qwen-code，统计窗口为过去 24 小时*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*