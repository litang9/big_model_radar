# AI CLI 工具社区动态日报 2026-11-15

> 生成时间: 2026-11-14 23:53 UTC | 覆盖工具: 7 个

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

# AI CLI 工具社区动态横向对比分析 · 2026-11-15

---

## 1. 生态全景

AI CLI 工具已进入**多智能体深水区**：各工具的重心正从单轮对话能力转向子代理调度、长会话稳定性与资源治理。**上下文经济性**（图片载荷、token 开销、prompt cache）成为新的核心战场，用户开始用精确测量数据（如 Codex #41338 的"230 tokens / 4.2 MB"、Gemini 的"36.6k tokens/turn"）倒逼工程优化。与此同时，**社区治理问题浮出水面**——stale 机器人误关、AI 审核误判、PR 被自动化清理，成为各项目共同面临的流程性风险。头部工具（Claude Code、Codex）社区讨论围绕重度生产使用，而 Qwen Code、Gemini CLI 则处于架构重构与快速迭代期。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues（条） | PR 更新（条） | Release | 社区焦点主题 |
|---|---|---|---|---|
| **Claude Code** | 10 | 4 | 无 | 资源治理、团队共享记忆、Plugin API 生命周期 |
| **OpenAI Codex** | 10 | 13 | rust-v0.171.0-alpha.5 | 图片上下文管理、Windows 兼容、配额透明度 |
| **Gemini CLI** | 10 | 10 | 无（Nightly 连续失败中） | Subagent 可靠性、AST 工具链、沙箱 |
| **GitHub Copilot CLI** | 10 | 0 | v1.0.112（11-13） | MCP 认证、上下文开销回归、BYO provider |
| **OpenCode** | 10 | 10 | 无 | 免费配额、v2.3.0 回归、信任争议 |
| **Qwen Code** | 10 | 10 | v0.27.2-nightly | Managed Agent、Web Shell、1.0 内核迁移 |
| **Kimi Code CLI** | 0 | 0 | — | 过去 24 小时无活动 |

> 注：各报告均列出 Top 10 Issues，横向可比的绝对量需结合仓库体量；Claude Code 单 issue 评论量（34 条）与 OpenCode 主帖（367 条累计）显示其社区存量活跃度最高。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **多智能体资源治理与可靠性** | Claude Code、Gemini CLI、Copilot CLI、Qwen Code | 进程树内存上限（CC #91081）、子代理假成功/挂起（Gemini #22323/#21409）、委派认证失败（Copilot #5437）、子代理无输出（Qwen #17261）——子代理是全线标配，但**委派链路可靠性普遍不达标** |
| **图片/多模态上下文管理** | Codex、OpenCode | base64 全量重发毒化会话（Codex #28316/#41338、OpenCode #59794），按体积而非 token 管理上下文成为共识诉求 |
| **长期记忆 / 持续性工作区** | Claude Code、Codex、Gemini CLI | 团队共享记忆（CC #38536）、持续工作空间提案（Codex #61348 一天 28 评论）、任务持久化追踪（Gemini #18836） |
| **MCP 生态成熟度** | Claude Code、Copilot CLI、OpenCode、Qwen Code | 工具 schema 热更新（CC #97369）、OAuth/Keychain 认证（Copilot #5452/#5434）、MCP 进程增殖（OpenCode #37844）、按需拉起 server |
| **长会话稳定性** | 全部主流工具 | OOM（Copilot #5435）、FD 泄漏（CC #98725）、会话恢复一致性（Qwen #16439） |
| **安全与信任** | Claude Code、Gemini CLI、OpenCode、Qwen Code | 安全钩子失效（CC #96860 三次报告）、YOLO 解析失败放行（Gemini #30295）、fallback 绕过白名单（OpenCode #63958）、漏洞报告通道不畅（Qwen #17288） |
| **CI / 发布工程** | Gemini CLI、Qwen Code | Nightly 连续 10 天失败（Gemini #30207，P0）、夜间测试轮换红盘（Qwen #16371） |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特点 |
|---|---|---|---|
| **Claude Code** | 重度 agent 生产环境、插件生态 | 专业开发者/团队 | 生态开放（Plugin API、hook、marketplace），但平台级稳定性与安全响应是短板 |
| **Codex** | 多模态、语音、Cloud 协同 | ChatGPT 订阅生态用户 | Rust 重写 + app-server 面向第三方宿主的开放架构（线程 API、实时帧持久化、预算钩子） |
| **Gemini CLI** | Agent 智能化与 token 效率 | 开发者 + 编辑器集成方 | ACP 协议替代专有集成；探索 AST 工具链、零依赖 OS 沙箱等前沿方向 |
| **Copilot CLI** | 企业集成、BYO 模型 | GitHub/微软生态用户 | 多 provider 路由（Fusion 分层）、Entra OAuth 等企业特性，但免费计划开箱体验差 |
| **OpenCode** | 开源免费、跨端 | 价格敏感/自托管用户 | 免费模型网关（zen）+ TUI/Desktop/移动端全家桶，正启动 CLI 原生化迁移 |
| **Qwen Code** | 托管会话 + Web Shell | 阿里生态/中文开发者 | 事件驱动 1.0 内核重构 + Managed Agent + 钉钉集成，迭代速度最快但 CI 质量欠账 |

---

## 5. 社区热度与成熟度

- **成熟稳定期**：**Claude Code**（issue 讨论深度高，用户为重度生产用户；但 0 PR 来自官方，迭代节奏不可见）、**Copilot CLI**（v1.0.x 稳定线，今日无 PR，以官方节奏为主，社区批量清理遗留 issue）
- **高活跃快速迭代期**：**Codex**（13 个 PR 合入、基础设施持续加固，版本节奏稳定）、**Gemini CLI** 与 **Qwen Code**（各 10 个 PR，处于架构重构窗口，官方响应快但 CI/发布质量不稳定）
- **高热度高风险期**：**OpenCode**（367 条评论的配额主帖 + MAC 伪造信任争议 + AI 审核误判，社区情绪需要维护方主动干预）
- **低活跃**：**Kimi Code CLI**（24 小时零活动）

---

## 6. 值得关注的趋势信号

1. **子代理是下一阶段的决胜点，也是当前的故障高发区**。六个工具中四个的 Top Issue 都与子代理委派链路（认证、输出、终止语义）相关。选型时应重点考察子代理的失败可观测性，而非仅看宣称的能力。
2. **计费与上下文计量的“暗箱”正被用户测量击穿**。Codex 配额 5.6 倍异常消耗、Copilot 静默降级 Fusion 档位、OpenCode fallback 绕过白名单——**静默失败（silent failure）成为用户信任的头号杀手**，团队选型时应优先验证配额/计费的可审计性。
3. **多模态是隐性成本炸弹**。图片全量重发问题在 Codex 和 OpenCode 同时出现且长期未解，重度使用多模态的工作流应评估载荷级别的上下文管理策略。
4. **自动化社区治理的副作用显现**。stale 关闭（Claude Code）、AI 审核误关（OpenCode）、PR 自动清理均造成有效反馈流失——参与开源 AI 工具贡献时需预期流程摩擦，依赖其生产环境时需自建问题追踪机制。
5. **架构开放化趋势明确**：Codex app-server 线程 API、Gemini 的 ACP、Qwen 的 ACP parity 测试——CLI 工具正从终端应用演进为**可被编辑器/宿主集成的 agent 运行时**，这一标准之争值得早期关注。
6. **对开发者的直接建议**：生产采用建议锁定稳定版本（如 Codex 0.169.0 而非 alpha）；升级前查看回归报告（OpenCode v2.3.0 pty 僵尸进程、Copilot 1.0.106 上下文回归都是前车之鉴）；对依赖 Nightly 的团队，Gemini CLI 当前构建中断是直接风险。

---

*数据基于各项目 2026-11-15 前 24 小时公开动态快照，评论/点赞数为抓取时点数据。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-15 | 来源：anthropics/skills 仓库**

> ⚠️ 说明：本次抓取的 PR 评论数与点赞数均为空值，以下热度排序基于 PR/Issue 的更新活跃度、关联 Issue 讨论量及议题影响力综合推断。

---

## 一、热门 Skills 排行（PR 维度）

| # | Skill / PR | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **skill-creator 触发评估修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 trigger eval 的误报/漏报及 Windows 兼容问题；与高热度 Issue [#556](https://github.com/anthropics/skills/issues/556)（0% 触发率）和 [#1352](https://github.com/anthropics/skills/issues/1352)（并行 worker 串号导致假阴性）直接相关，是社区最痛的底层质量问题 | OPEN |
| 2 | **mcp-builder 兼容修复** [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 header 方式，修复 #1668；反映 MCP 协议快速演进下 Skills 跟进压力 | OPEN |
| 3 | **webapp-testing 安全加固** [#1980](https://github.com/anthropics/skills/pull/1980) | 消除 `shell=True` 导致的命令注入风险（CWE-78），配合 [#1976](https://github.com/anthropics/skills/pull/1976) 元素发现修复，测试类 Skill 维护活跃 | OPEN |
| 4 | **docx/xlsx 文档 Skill 质量修复** [#1792](https://github.com/anthropics/skills/pull/1792) / [#2019](https://github.com/anthropics/skills/pull/2019) | LibreOffice 超时误报成功、外部链接风险漏检（对应 Issue #2013）；文档处理仍是使用最广、Bug 最多的 Skill 家族 | OPEN |
| 5 | **md2video-audio** [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown → Marp 幻灯片 → MP4 视频 + 真人配音，零成本内容生产管线，代表 AIGC 多媒体方向 | OPEN |
| 6 | **pyxel 复古游戏开发** [#525](https://github.com/anthropics/skills/pull/525) | 由 Pyxel 作者本人提交，含 headless 运行与帧检查验证流程，长期未合并（3 月至今），社区关注其命运 | OPEN |
| 7 | **notion-spec-to-implementation** [#1245](https://github.com/anthropics/skills/pull/1245) | 将产品/技术 Spec 拆解为 Notion 可执行任务（含验收标准与进度追踪），打通需求→实施闭环 | OPEN |
| 8 | **scnet-hpc** [#1615](https://github.com/anthropics/skills/pull/1615) | SSH + Slurm 的 HPC 集群操作 Skill，体现 Skills 向科研计算场景扩展 | OPEN |

---

## 二、社区需求趋势（Issue 维度）

1. **安全与信任机制（最强烈）** — [#492](https://github.com/anthropics/skills/issues/492)（46 评论）：社区 Skill 冒用 `anthropic/` 命名空间造成信任边界滥用，亟需命名/签名隔离机制。
2. **组织级共享与分发** — [#228](https://github.com/anthropics/skills/issues/228)（17 评论）：要求 org 内 Skill 库与直接分享链接，替代手工 Slack 传文件。
3. **skill-creator 评估体系可靠性** — [#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)：触发率评估结果不可信，直接影响 Skill 优化的可信度。
4. **Token/上下文效率** — [#1487](https://github.com/anthropics/skills/issues/1487)：claude-api Skill 单次注入 ~156k token，要求渐进式加载；[#2064](https://github.com/anthropics/skills/issues/2064) 要求 description 写明"何时触发"。
5. **Agent 记忆与治理类新方向** — [#1329](https://github.com/anthropics/skills/issues/1329)（compact-memory 紧凑记忆表示）、[#1385](https://github.com/anthropics/skills/issues/1385)（推理质量三道闸门流水线）、[#412](https://github.com/anthropics/skills/issues/412)（agent-governance）。

---

## 三、高潜力待合并 Skills

- **#1298 skill-creator eval 修复** — 对应两大高热度 Issue，落地价值最高
- **#1742 mcp-builder 适配 mcp>=2** — 阻塞性兼容修复（#1668）
- **#2019 / #1792 xlsx、docx 修复** — 有明确 Issue 牵引（#2013 等），修复路径清晰
- **#2108 文档 Skill 同步机制澄清** — 已引用可验证的导出里程碑，合并阻力小
- **#525 pyxel / #1245 notion-spec** — 功能型新 Skill 长期挂起，若官方明确外部贡献政策后有望推进
- **#1997 skill-creator YAML frontmatter 解析修复** — 影响元数据准确性，社区反馈积极

---

## 四、生态洞察（一句话）

**社区最集中的诉求是从"Skill 数量增长"转向"信任与质量"：官方命名空间防冒用、触发评估的真实可靠性、以及按需加载以控制上下文成本，构成了当前 Skills 生态的三大核心矛盾。**

---

# Claude Code 社区动态日报 · 2026-11-15

> 数据来源：github.com/anthropics/claude-code | 统计窗口：过去 24 小时

---

## 1. 今日速览

今日无新版本发布。社区讨论热度最高的仍是**多智能体场景下的资源治理与稳定性问题**（macOS fseventsd 失控、进程树资源上限缺失），以及长期呼声很高的**团队级共享记忆**功能提案。此外，一个已被报告三次的 Windows 安全审查钩子失效问题再次被提起，值得关注。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#38536](https://github.com/anthropics/claude-code/issues/38536) 共享团队记忆功能提案 | 🔥 34 条评论、11 👍，长期热门。团队知识无法跨成员流转（交接、评审、调研上下文全部丢失），是呼声最明确的功能缺口之一。 |
| 2 | [#98769](https://github.com/anthropics/claude-code/issues/98769) macOS fseventsd 失控 | 重度 agent 用户中 fseventsd 内存超预算 800 倍、单核被打满数天且无自愈，还会阻塞 Claude Code 启动（关联 #96008）。19 条评论，属高危平台级问题。 |
| 3 | [#91081](https://github.com/anthropics/claude-code/issues/91081) 子进程树资源治理 | Claude Code 执行 Bash/后台任务/subagent 时无内存上限、无系统压力反馈、无销毁顺序保证。19 条评论，与 #98769 共同构成“资源治理”主题。 |
| 4 | [#97369](https://github.com/anthropics/claude-code/issues/97369) MCP 工具描述更新失效 | 已加载的 deferred MCP 工具，其 description/schema 变更后即使 `/mcp reconnect` 乃至 `--resume` 也无法触达模型。影响 MCP 生态迭代。 |
| 5 | [#96860](https://github.com/anthropics/claude-code/issues/96860) security-guidance 钩子不执行（第三次报告） | 订阅登录时 security-guidance 从不运行模型审查，前两次报告（#77450、#87145）均无回复即关闭。涉及安全机制失效，处理方式引发社区不满。 |
| 6 | [#98725](https://github.com/anthropics/claude-code/issues/98725) Linux/Wayland 渲染进程 FD 泄漏 | 删除的 `/dev/shm` 文件描述符持续泄漏，7–25 小时后触及 1024 上限导致窗口冻结。Desktop 稳定性代表问题。 |
| 7 | [#101782](https://github.com/anthropics/claude-code/issues/101782) 插件 hook 在 `$.agent.spawn` 时被跳过 | hook 返回后插件自身发起的 spawn 不再触发插件的 `tool.check`，auto 模式下直接拒绝。Plugin API 生命周期设计缺陷。 |
| 8 | [#100651](https://github.com/anthropics/claude-code/issues/100651) Plugin Pane redraw 导致 "no handler" 错误 | `ui.press` hook 异步 await 期间 pane 重绘，press 调用失败。有稳定复现。 |
| 9 | [#85873](https://github.com/anthropics/claude-code/issues/85873) SSH 远程会话中的定时任务永不执行（已关闭/stale） | cwd 按本地文件系统校验且无 host 绑定，架构级问题但以 stale 关闭，远程工作流用户仍受影响。 |
| 10 | [#63901](https://github.com/anthropics/claude-code/issues/63901) 会话内跳转历史 prompt（已关闭/stale，9 👍） | 长会话导航体验痛点，获 9 个 👍 后仍被 stale 关闭，TUI 易用性诉求未落地。 |

> ⚠️ 附注：用户 @o1409 今日集中提交了系列 "[MODEL] Ignored instructions" 报告（#110099、#110102、#110103、#110106 等，自称 100 条中的第 15/18/19/22 条），反映模型忽略指令的行为问题，刷屏式提交方式本身也可能污染 issue 追踪。

---

## 4. 重要 PR 进展（今日更新，共 4 条）

今日仅 4 个 PR 更新，全量为开源贡献：

1. **[#106972](https://github.com/anthropics/claude-code/pull/106972) dedupe agents 改为前台运行**
   dedupe 流程中 Claude 后台启动 agent 后即结束回合，导致任务被截断。PR 通过 `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` 并强制等待每个 agent 修复。来自 VS Code 团队的 @bpasero-ant，可信度高。

2. **[#95698](https://github.com/anthropics/claude-code/pull/95698) 修复 ralph-wiggum / output-style 插件 hook 路径问题**
   三个内置插件以裸路径注册 `.sh` hook，含空格路径会失败。改为 `bash "<quoted path>"` 执行。

3. **[#81672](https://github.com/anthropics/claude-code/pull/81672) hookify 包导入与安装目录名解耦**
   修复 marketplace 安装时目录名非 `hookify` 导致导入失败的问题（fixes #69665、#81448）。长期挂起（7 月底创建），今日有更新。

4. **[#78445](https://github.com/anthropics/claude-code/pull/78445) 修正插件文档与实际行为不符**
   对照插件源码修正 plugins/README.md 中三处描述错误，包括 security-guidance 的 hook 事件声明。

---

## 5. 功能需求趋势

从今日活跃 Issues 提炼的主要方向：

- **多智能体资源治理**（最热）：内存上限、压力反馈、进程树生命周期管理（#91081、#98769）
- **团队协作 / 共享记忆**：跨成员知识库、handoff 上下文传递（#38536）
- **Plugin API 生命周期完善**：hook 与 spawn 时序、UI redraw 竞态（#101782、#100651）
- **长会话体验**：796 轮长会话的分析元数据、历史 prompt 导航（#92736、#63901）
- **MCP 动态更新**：工具 schema 变更的热更新机制（#97369）
- **跨设备/远程一致性**：bridge 会话设置同步、SSH 远程任务（#93063、#85873、#93158）

---

## 6. 开发者关注点与痛点

1. **重度使用下的系统稳定性是核心痛点**：macOS fseventsd 失控、Linux FD 泄漏、Windows PTY 残留——三大平台均有各自的“长跑”稳定性问题，且多无自愈手段。
2. **安全机制可靠性存疑**：security-guidance 三次报告无回应即关闭，社区对安全相关 bug 的处理流程信心不足。
3. **Stale 关闭机制引发不满**：多个有 👍、有讨论、有复现的 issue（#63901、#85873、#93146）因不活跃被自动关闭，问题实际未解决。
4. **平台行为不一致**：CLI 与 Desktop/bridge/remote 会话在设置同步、attribution、定时任务等行为上差异多，增加排障成本。

---

*本报告由 AI 自动生成，数据截至 2026-11-15。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-15** | 数据来源：github.com/openai/codex

---

## 1. 今日速览

Codex CLI 发布 **rust-v0.171.0-alpha.5** 预发布版本。社区讨论焦点集中在**图片/多模态上下文管理**（base64 图片重复发送导致线程膨胀、配额异常消耗）和 **Windows 平台兼容性**（execpolicy 误报、Computer Use 故障）两大主题。今日合入大量核心 PR，涉及 rollout 预算控制、TUI 线程归档、实时语音帧持久化等基础设施改进。

---

## 2. 版本发布

**rust-v0.171.0-alpha.5**（2026-11-14）
- 预发布版本，进入 0.171.0 迭代周期，距 CLI 稳定版 0.169.0 又一版本演进。Release Notes 未附详细变更，具体内容可对照近期合并的 PR 列表（rollout 预算、线程归档、TUI 改进等预计随版本逐步释出）。
- 链接：https://github.com/openai/codex/releases

---

## 3. 社区热点 Issues

**1. [#40060](https://github.com/openai/codex/issues/40060) Windows execpolicy 误报（49 评论）**
PowerShell 脚本中同时出现 `Start-Process` 与无关 URL 时触发执行策略分类器误报。作者确认 0.146.0 至最新 main 分支均存在，近三个月持续活跃，是 Windows 用户体验的最大痛点之一。

**2. [#57101](https://github.com/openai/codex/issues/57101) Windows Computer Use 屏幕捕获未释放（32 评论）**
截图回合结束后，屏幕捕获权限与金色边框持续存在，涉及隐私顾虑，Computer Use 用户高度关注。

**3. [#28316](https://github.com/openai/codex/issues/28316) Base64 图片在后续上下文中重复发送（29 评论，👍10）**
图片处理回合结束后，完整 base64 载荷仍保留在会话历史并随每次请求重发，导致上下文无界增长。10 个 👍 显示影响面广。

**4. [#61348](https://github.com/openai/codex/issues/61348) 功能提案：持续性工程工作区（28 评论，昨日新发）**
希望 ChatGPT + Work + Codex 成为持续的工作空间而非一次性任务，涉及 subagent、session、memory 与 remote 协同。发布一天即获 28 条讨论，反映社区对长期记忆/连续工作流的强烈诉求。

**5. [#41338](https://github.com/openai/codex/issues/41338) 内联图片“token 小、体积大”的不对称问题（15 评论）**
实测显示内联图片输出仅占 ~230 tokens 但网络传输 4.2 MB，token 计费式上下文管理完全无法感知载荷，导致线程卡死——为图片问题的根因提供了关键测量数据。

**6. [#18629](https://github.com/openai/codex/issues/18629) Base64 工具图片“毒化”桌面线程（15 评论）**
内联 base64 图片累积导致恢复会话时 `Bad Request` 及 token 用量膨胀，与 #41338 构成同一问题簇。

**7. [#53560](https://github.com/openai/codex/issues/53560) macOS Work 审批立即失效（15 评论）**
桌面端点击 Allow/Approve 后立即报 "approval request is no longer active"，浏览器端同一账号正常，属 Work 桌面工作流阻断级 bug。

**8. [#51478](https://github.com/openai/codex/issues/51478) HTTP 429 阻断加载已有会话（13 评论）**
限流时带 Retry-After 的响应导致 Web 与 Windows 桌面端无法读取历史会话，限流策略影响基础可用性。

**9. [#20805](https://github.com/openai/codex/issues/20805) 图片密集会话反复重连（11 评论，👍9）**
会话积累大量图片后几乎每条消息都触发重连，性能严重劣化，与图片上下文问题簇相关。

**10. [#58312](https://github.com/openai/codex/issues/58312) Plus 五小时配额消耗加速 ~5.6 倍（5 评论，👍6）**
用户实测 10 月起配额消耗异常增长，要求官方对计费口径透明化——可能与上述图片重复上传问题存在关联，值得追踪。

---

## 4. 重要 PR 进展

**1. [#61578](https://github.com/openai/codex/pull/61578) 工具执行前重检 rollout 预算**
修复工具调用等待执行槽/审批期间预算耗尽后仍启动新工作的问题，强化预算控制。

**2. [#61577](https://github.com/openai/codex/pull/61577) 响应完成后的处理与用量核算**
允许等待响应完成并同步执行后置钩子，使预算 enforcement 能阻断耗尽预算的响应所派生的工具调用。

**3. [#61562](https://github.com/openai/codex/pull/61562) 统一模型请求钩子生命周期**
为采样与压缩尝试配对 `Pre/PostModelRequest` 钩子，增加 `thread_id` 与 `kind` 区分，利于宿主侧监控与预算管理。

**4. [#61486](https://github.com/openai/codex/pull/61486) TUI 归档线程只读化与恢复**
归档线程显示通知并冻结输入（保留草稿/转录），支持 `U` 键取消归档继续会话，TUI 会话管理体验显著增强。

**5. [#61490](https://github.com/openai/codex/pull/61490) Cloud 任务切换保留当前会话**
加载新 Cloud 任务历史失败时保持当前聊天、草稿与回复流不变，提升 Cloud 稳定性。

**6. [#61488](https://github.com/openai/codex/pull/61488) Git remote 解析加固**
改用 NUL 分隔读取 fetch URL，修复 partial clone 过滤文本被误认为 remote 条目的问题，并限制 remote URL 元数据长度避免超出 Responses API 8096 字符限制。

**7. [#61480](https://github.com/openai/codex/pull/61480) 持久化实时历史快照分页**
新增实验性 `thread/realtime/list`，支持按会话/观测时间/事件 ID 过滤的游标分页读取。

**8. [#61473](https://github.com/openai/codex/pull/61473) 完成确认前持久化带时间戳的实时帧**
语音转录以 `frame` 项记录（`voice_transcript` 通道），实时语音数据可靠性提升。

**9. [#61446](https://github.com/openai/codex/pull/61446) `thread/list` 支持线程 ID 包含过滤**
客户端可在当前过滤条件下检索指定线程 ID（最多 100 个）的摘要，解决跨页核对问题。

**10. [#61494](https://github.com/openai/codex/pull/61494) 按环境描述上下文与权限（feature flag）**
多环境下分别描述各自的文件系统/网络权限规则，为 sandbox 多环境体验铺路。

*其他值得注意：[#61481](https://github.com/openai/codex/pull/61481) Cloud 会话切换期间允许 Ctrl+C 退出、[#61452](https://github.com/openai/codex/pull/61452) 上下文窗口提示作为工具输出、[#61535](https://github.com/openai/codex/pull/61535) 请求增加可信国家码元数据。*

---

## 5. 功能需求趋势

1. **多模态上下文管理（最强烈）**：#28316 / #41338 / #18629 / #20805 / #46761 / #34542 形成图片载荷问题簇，社区要求 Codex 不再在后续请求中重发 base64 图片，并按实际体积（而非 token）管理上下文。
2. **持续性工作区与记忆**：#61348 代表了对跨任务 session/memory、subagent 持久化的诉求。
3. **Windows 平台修复**：execpolicy 误报、Computer Use、地理位置等多个 Windows 专属 issue，平台兼容仍是薄弱环节。
4. **配额透明度**：#58312 / #51478 反映用户要求更清晰的用量核算与限流行为说明。
5. **Work/审批工作流**：#53560 / #52400 / #55256 显示沙箱审批机制在桌面端的可靠性需要打磨。

---

## 6. 开发者关注点

- **配额与成本异常**：图片重复上传与配额加速消耗叠加，开发者难以估算实际成本，需要透明计量。
- **长会话稳定性**：图片累积导致线程“毒化”、自动压缩失败、恢复报错，长时编码 agent 工作流受影响最大。
- **桌面端跨平台质量**：macOS Work 审批失败、Windows Computer Use 各类故障，桌面端落后于 CLI/Web 的成熟度。
- **TUI 打磨持续进行**：新 PR 显示团队在输入区抖动（#61554）、归档管理、Ctrl+C 行为等细节上快速迭代，CLI 体验仍是投入重心。
- **可扩展性基建**：MCP 服务器启动目录（#61444）、线程过滤 API（#61446）、实时历史分页（#61480）等 PR 表明 app-server 正在为第三方宿主集成增强能力。

---
*本报告基于 GitHub 公开数据自动整理，评论数为抓取时快照。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-11-15

## 一、今日速览

今日无新版本发布，Nightly 构建自 11-05 起持续失败的问题（npm 413 错误）已有一个 **P0 级修复 PR**（#30207）进入评审。ACP（Agent Client Protocol）模式成为贡献热点，单日新增 3 个相关 PR，涵盖输出截断与工具并行执行。Issue 区“子代理（Subagent）”方向持续活跃，多-agent 协作、AST 感知工具等长期路线图问题获得更新。

## 二、版本发布

过去 24 小时无新 Release。

## 三、社区热点 Issues

1. **#22323 — Subagent 达到 MAX_TURNS 后仍报告 GOAL success（P1）**
   [链接](https://github.com/google-gemini/gemini-cli/issues/22323)
   子代理被中断却返回“成功”，掩盖了真实失败原因，直接影响任务可靠性判断。13 条评论为今日最多，标记 `need-retesting`，说明修复可能已就绪待验证。

2. **#21409 — Generalist agent 无限挂起（P1，👍8）**
   [链接](https://github.com/google-gemini/gemini-cli/issues/21409)
   委派给通用 agent 后简单操作（如建文件夹）也挂起超过一小时，是本批 Issue 中 👍 最多的可用性硬伤。

3. **#19873 — 零依赖 OS 沙箱 + 执行后意图路由（P2，effort/large）**
   [链接](https://github.com/google-gemini/gemini-cli/issues/19873)
   针对 Gemini 3 模型原生 bash 偏好设计的沙箱方案，讨论热度高（9 评论），是安全性与模型能力平衡的重要架构讨论。

4. **#21968 — Gemini 不主动使用 skills 和子代理（P2）**
   [链接](https://github.com/google-gemini/gemini-cli/issues/21968)
   用户反馈自定义技能几乎从不被自动调用，反映 agent 调度智能化的核心痛点，`need-retesting` 状态。

5. **#22745 — AST 感知的文件读取/搜索/代码库映射 EPIC（P2）**
   [链接](https://github.com/google-gemini/gemini-cli/issues/22745)
   评估 AST 工具（ast-grep、tilth、glyph 等）能否减少误读、降低 token 开销，配套 #22746、#22747，是 token 效率方向的重要探索。

6. **#21983 — Browser subagent 在 Wayland 下失败（P1）**
   [链接](https://github.com/google-gemini/gemini-cli/issues/21983)
   Linux Wayland 用户浏览器代理不可用，`need-retesting` 待验证。

7. **#22267 — Browser Agent 无视 settings.json 配置覆盖（P2）**
   [链接](https://github.com/google-gemini/gemini-cli/issues/22267)
   `AgentRegistry` 读取了配置但未生效，配置一致性问题。

8. **#24246 — 工具数 >128 时 API 返回 400（P2）**
   [链接](https://github.com/google-gemini/gemini-cli/issues/24246)
   MCP + 子代理场景下工具数易超限，需要更智能的工具作用域裁剪。

9. **#23571 — 模型频繁在随机位置创建临时脚本（P2）**
   [链接](https://github.com/google-gemini/gemini-cli/issues/23571)
   工作区污染问题，影响 git commit 卫生，是高频用户抱怨。

10. **#19561 — "Tactful Extraction" 节约 token 的外科式读取（P3）**
    [链接](https://github.com/google-gemini/gemini-cli/issues/19561)
    基线 ~36.6k tokens/turn、大文件读取导致 +15k/turn 的量化数据详实，token 成本优化方向的代表性提案。

## 四、重要 PR 进展

1. **#30207 — [P0] 构建前清理 bundle/ 修复 Nightly 发布失败**
   [链接](https://github.com/google-gemini/gemini-cli/pull/30207)
   25.2MB 包内约 70MB 陈旧构建产物导致 npm 413 错误，Nightly 已连续失败 10 天，今日最高优先级修复。

2. **#30298 — ACP 模式下并行执行独立工具调用**
   [链接](https://github.com/google-gemini/gemini-cli/pull/30298)
   对齐标准 CLI 调度器行为，ACP 模式从串行循环改为批量并行执行只读工具调用，显著提升吞吐。

3. **#30297 — ACP 模式下截断超大 shell/MCP 工具输出**
   [链接](https://github.com/google-gemini/gemini-cli/pull/30297)
   防止大日志/目录树直接打爆模型上下文。

4. **#30174 — 修复长模型回合被 body timeout 杀死并重放**
   [链接](https://github.com/google-gemini/gemini-cli/pull/30174)
   高 thinking 模式下大参数 write_file 超过 5 分钟无输出被 undici 中断且重放 3 次，浪费严重。

5. **#30296 — 驱逐被拒绝的 OAuth 客户端初始化 promise**
   [链接](https://github.com/google-gemini/gemini-cli/pull/30296)
   防止一次 OAuth 失败永久污染进程级缓存，安全相关修复。

6. **#30295 — YOLO 模式下 shell 解析失败时保留 ASK_USER 决策**
   [链接](https://github.com/google-gemini-cli/pull/30295)
   修复解析失败即放行的安全隐患，企业合规相关。

7. **#30178 — 修复 IME 提交与 Enter 同 tick 时的丢字**
   [链接](https://github.com/google-gemini/gemini-cli/pull/30178)
   韩语输入最后一个音节被吞（`테스트`→`테스`），中文用户同样受益。

8. **#30292 — 保留超限后台日志尾部并标记截断（P2，help wanted）**
   [链接](https://github.com/google-gemini/gemini-cli/pull/30292)
   修复 `read_background_output` 丢弃 64KB 窗口首行导致整行日志丢失的问题。

9. **#30157 — safeJsonStringify 仅替换真正的循环引用（P2）**
   [链接](https://github.com/google-gemini/gemini-cli/pull/30157)
   修复 OpenTelemetry 共享数组被误判为循环导致遥测数据损坏。

10. **#28405 — 修复用户上滚查看时滚动位置跳变（P1）**
    [链接](https://github.com/google-gemini/gemini-cli/pull/28405)
    长期存在的 UI 痛点（#5009），翻阅历史变更时被新内容拽回底部。

## 五、功能需求趋势

- **子代理（Subagent）体系深化**：占比最高。包括恢复/终止语义（#22323）、并行协作与共享内存（#18287）、轨迹分享（#22598）、发现机制（#18285）、本地子代理 Sprint（#20195）等，是官方明确的工作流主线。
- **AST 感知工具链**：#22745/#22746/#22747 系列 EPIC，探索 ast-grep、tilth、glyph 等，目标是更精准的读取/搜索与更低的 token 消耗。
- **Bash 原生能力 + 沙箱**：#19873 提出的零依赖 OS 沙箱契合 Gemini 3 的 bash 原生训练倾向。
- **ACP / 编辑器集成**：ACP 替代 Zed 集成后（#21171 上游更名），相关文档同步与能力补齐（并行执行、输出截断）成为贡献热点。
- **上下文与任务管理重构**：#18836 提议用持久化文件任务追踪（CRUD）替代 in-context 的 WriteToDo，对抗 context rot。

## 六、开发者关注点

1. **可靠性是首要痛点**：子代理挂起（#21409）、假成功上报（#22323）、无限等待等 P1 问题直接动摇用户信任。
2. **Agent 调度智能化不足**：模型不主动调用 skills/子代理（#21968），需要用户显式指令，削弱自动化价值。
3. **Token 成本压力**：36.6k/turn 基线、大输出未截断、firehose 式读文件，社区在系统性量化并推动“外科式”上下文管理。
4. **安全与破坏性操作防护**：YOLO 模式下的策略绕过（#30295）、`git reset --force` 等危险命令（#22672）持续被关注。
5. **工作区卫生**：临时脚本乱放（#23571）增加提交清理成本。
6. **发布工程隐患**：Nightly 连续 10 天失败（#30207）暴露构建缓存管理问题，值得依赖 nightly 的用户注意。

---
*数据来源：github.com/google-gemini/gemini-cli · 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-11-15）

## 📌 今日速览

过去24小时社区活动集中在 **v1.0.112 发布后的稳定性反馈**：新增 Issues 集中在 MCP 认证（OAuth/Keychain）、上下文开销回归（~20K tokens）以及子代理模型默认配置错误。同时，一批长期存在的剪贴板、Windows 代码页、会话恢复类 Bug 被批量关闭，显示团队正在系统性清理遗留问题。无 PR 更新。

---

## 🚀 版本发布

**v1.0.112**（2026-11-13 发布）

- `/compact` 失败时，现在会显示模型提供方的原始错误信息，去除内部 host-rethrow 前缀
- 修复：对于 CLI 尚未发送的 prompt（如在托管账户策略加载期间输入的内容），保留粘贴文本，再次按 Enter 时发送的是粘贴内容而非空消息

---

## 🔥 社区热点 Issues

**1. [#5145] 400 `reasoning_text` 错误 — thinking 模式下后台 shell 退出后触发**（OPEN，👍 1，4 评论）
自定义 OpenAI 兼容 provider（`wireApi: "responses"`）下，后台 shell 退出后运行时合成的无模型 assistant turn 会导致下一次模型调用返回 HTTP 400。这是自定义 provider 用户的核心阻塞问题，讨论活跃度最高。
https://github.com/github/copilot-cli/issues/5145

**2. [#5450] 上下文开销回归：1.0.106 后每会话多耗 ~20K tokens**（OPEN）
200K 窗口下可用工作空间从 ~112K 降至 ~93K，自动压缩明显加快。直接影响所有重度用户的实际可用上下文。
https://github.com/github/copilot-cli/issues/5450

**3. [#5456] 子代理默认模型包含免费计划不可用模型**（OPEN）
`explore`/`task` 默认 `gpt-6-luna`、`research` 默认 `claude-sonnet-5.5` 均不在免费计划中，开箱即报错。影响新用户首次体验。
https://github.com/github/copilot-cli/issues/5456

**4. [#5457] Fusion "high" 档静默降级为 "standard" 策略**（OPEN）
请求 High tier 却实际运行 Standard policy，无任何警告，`session.fusion_resolved` 事件可证实。静默降级行为对计费/性能敏感用户影响大。
https://github.com/github/copilot-cli/issues/5457

**5. [#5452] MCP OAuth（Entra）强制原生 broker 窗口，阻止粘贴且无浏览器回退**（OPEN）
1.0.109 起 `/mcp auth azure-devops` 打开 OneAuth 窗口，密码字段完全无法粘贴，企业用户痛点明显。
https://github.com/github/copilot-cli/issues/5452

**6. [#5434] macOS Keychain 反复弹窗 + 大量重复条目**（OPEN）
即使选择"Always Allow"，`copilot-mcp-oauth` 仍不断触发 `/usr/bin/security` 钥匙串提示，疑似凭据存储逻辑问题。
https://github.com/github/copilot-cli/issues/5434

**7. [#5437] 委派 `task` 子代理无法认证 HTTP-OAuth MCP 服务器**（OPEN）
`<server>/*` 通配符在子代理中触发 401，显式引用仅在部分模型/服务器上有效，基于 ~30 次委派运行验证。影响多代理工作流。
https://github.com/github/copilot-cli/issues/5437

**8. [#5435] 长交互会话反复 OOM 崩溃（1.0.109）**（OPEN）
崩溃后恢复会话时后台代理不可访问，复发性质说明内存管理存在系统性问题。
https://github.com/github/copilot-cli/issues/5435

**9. [#5436] 结构化 403 错误被掩盖为通用认证失败**（OPEN）
自定义 provider 返回的结构化 `error.message`/`error.code` 未透传，误导排障方向。由微软内部开发者（@gwexler-msft）提交。
https://github.com/github/copilot-cli/issues/5436

**10. [#5459] 后台任务期间 Agent 用 `sleep N; check` 轮询消耗模型 turns**（OPEN）
每次轮询都是完整重读上下文的独立模型 turn，浪费 token 且无产出，涉及代理调度效率设计。
https://github.com/github/copilot-cli/issues/5459

**已关闭（值得注意）：** Wayland 剪贴板问题 #4615/#3985、Windows 代码页 936 复制清屏 #4391、会话恢复不还原 agent #4489、`--add-dir` 不加载 skills #3173、`--available-tools` 空值暴露全部工具 #5306、MCP 工具缓存内存泄漏 #5446 —— 遗留 Bug 清理成果显著。

---

## 🔧 重要 PR 进展

过去24小时无 PR 更新，本节省略。

---

## 📈 功能需求趋势

1. **MCP 生态完善**：认证体验（OAuth、Keychain、子代理授权）是最高频问题区；新增需求如 MCP 启动完成事件钩子（#5458）
2. **上下文与内存管理**：token 开销回归（#5450）、OOM 崩溃（#5435）、工具缓存膨胀（#5446）——性能是核心关切
3. **自定义 Provider / BYO 模型**：错误透传（#5436、#5145）与 Fusion 分层计费策略（#5457）
4. **多代理与后台任务**：子代理模型配置（#5456）、委派认证（#5437）、后台任务轮询效率（#5459）

---

## ⚠️ 开发者关注点

- **免费计划开箱即坏**：默认子代理模型不可用，新用户上手即遇错（#5456）
- **静默失败模式**：Fusion 降级、403 掩盖均无警告，用户难以感知真实状态（#5457、#5436）
- **企业/平台集成摩擦**：Entra OAuth broker 阻塞粘贴、macOS Keychain 反复弹窗，企业环境可用性受损（#5452、#5434）
- **长会话稳定性**：OOM 与上下文膨胀叠加，重度用户可用空间持续被压缩（#5435、#5450）
- **可观测性诉求**：社区出现请求构造源码溯源类 Issue（#5455），反映对透明度的需求上升

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-15

## 📌 今日速览

今日无新版本发布，v2.3.0 仍是当前主线。社区焦点集中在 **免费版（zen free tier）配额问题**（主 Issue 评论已破 367 条）、**2.3.0 引入的 pty 僵尸进程回归**，以及一个引发信任争议的 **MAC 地址伪造绕过限流** 报告。生态侧 OpenTUI 0.9.0 升级 PR 和 CLI 原生化迁移值得技术关注。

---

## 🔥 社区热点 Issues

**1. [zen] Free tier 问题汇总主帖（OPEN）— #59387**
367 条评论、28 👍，持续高热。免费用户集中反馈"配额用尽""重置永不发生""Desktop 版本失效"等问题，是当前社区最大痛点。
https://github.com/anomalyco/opencode/issues/59387

**2. pty 守护进程产生僵尸进程（2.3.0 回归，已关闭）— #63817**
2.3.0 起所有已完成的 shell 命令均以 zombie 状态残留于 `opencode-pty daemon` 下，2.2.7 无此问题。已关闭，但见 #63975 反馈关闭状态存疑。
https://github.com/anomalyco/opencode/issues/63817

**3. MAC 地址伪造绕过免费模型限流（已关闭）— #63931**
用户报告 OpenCode 在触发限流后自动更换 MAC 地址继续使用，未经用户同意。无论真伪，已引发对客户端行为的信任讨论。
https://github.com/anomalyco/opencode/issues/63931

**4. opencodejr AI 审核机器人误关 Issue（OPEN）— #63975**
AI moderator 将 #63948 标为 #63817 的重复并关闭，但后者本身也是关闭状态，导致僵尸进程问题无处跟踪。暴露 AI 自动化审核的准确性风险。
https://github.com/anomalyco/opencode/issues/63975

**5. 模型 fallback 绕过 allowed-models 白名单（OPEN）— #63958**
付费用户移除模型后仍被 fallback 使用；Plan/Build 切换时模型被静默更改。涉及计费信任，需优先修复。
https://github.com/anomalyco/opencode/issues/63958

**6. 历史图片全量重发导致会话永久不可用（OPEN）— #59794**
每次请求都重发会话中所有历史图片且无裁剪，在 vLLM 等限制单次图片数的后端上，会话积累图片后彻底崩坏。
https://github.com/anomalyco/opencode/issues/59794

**7. subagent sessionID 续聊必失败（OPEN）— #59293**
传入任何 sessionID 都被截断为 `"ses"`，无法续接子代理会话。核心工作流功能损坏。
https://github.com/anomalyco/opencode/issues/59293

**8. 缓存 Location 导致 MCP 子进程成倍增殖（OPEN）— #37844**
单个服务下实测约 10 组重复 MCP 进程组，性能与资源开销问题，长期未解。
https://github.com/anomalyco/opencode/issues/37844

**9. Android 11 设备无法安装官方 App（OPEN）— #63791**
Infinix X693 (Android 11) 上 Play 与 Aurora Store 均报不兼容，影响低端设备覆盖。
https://github.com/anomalyco/opencode/issues/63791

**10. reasoning_effort 变化丢失提示词缓存（已关闭）— #63935**
仅改变 reasoning_effort 时约 1/3 请求无法复用 prompt cache，直接影响自适应 agent 的成本与延迟。
https://github.com/anomalyco/opencode/issues/63935

---

## 🔧 重要 PR 进展

**1. OpenTUI 0.9.0 升级 — #63989**
Markdown 代码块渲染 API 变更（marked Token → OpenTUI 类型），对插件作者为破坏性更新。
https://github.com/anomalyco/opencode/pull/63989

**2. CLI 原生化迁移 — #63477**
将 CLI 移植到 native 实现，技术方向重大，附独立预览仓库。
https://github.com/anomalyco/opencode/pull/63477

**3. Desktop SSH/WSL 连接放宽版本校验 — #63988**
修复因远端 OpenCode 版本不同导致无法连接的问题（移植自 rune-desktop）。
https://github.com/anomalyco/opencode/pull/63988

**4. SSH 重连时远端端口被占的恢复 — #63542**
断线重连不再因端口占用而失败，提升远程开发稳定性。
https://github.com/anomalyco/opencode/pull/63542

**5. TUI 显示工具执行耗时 — #63986**
V2 客户端中展示 tool elapsed time，增强可观测性。
https://github.com/anomalyco/opencode/pull/63986

**6. Browser 代理流量改用二进制 WebSocket — #55528**
高延迟链路上 6 MiB 图片传输从 ~70s 降至 ~4s（约 18×），性能显著（后被自动化清理关闭，值得关注复活）。
https://github.com/anomalyco/opencode/pull/55528

**7. Inbox 显示空闲会话的待处理请求（desktop）— #63601**
补齐 TUI 侧已修复的同类缺口，避免请求静默丢失。
https://github.com/anomalyco/opencode/pull/63601

**8. 会话导入 SQLite 参数上限分块写入 — #55450**
修复超长会话导入因单条 INSERT 超参数限制而失败的问题。
https://github.com/anomalyco/opencode/pull/55450

**9. Gemini 请求不再以 model turn 结尾 + 时钟回拨 ID 保持递增 — #55515**
修复 Gemini 请求被拒的长期问题。
https://github.com/anomalyco/opencode/pull/55515

**10. 生态文档：Sikemux 收录 — #63648**
原生 Mac/Linux 生态项目接入 Ecosystem 页面，社区生态持续扩张。
https://github.com/anomalyco/opencode/pull/63648

---

## 📈 功能需求趋势

1. **隐私与会话管理**：不落地的临时会话模式（#53921）、本地数据可控性是明确需求方向。
2. **子代理（subagent）能力增强**：TUI 中直接对选中子代理 prompt/steer（#42670，7 👍）呼声高。
3. **MCP 资源效率**：按需（首次调用时）拉起 MCP server（#53028）与进程复用，减少冷启动开销。
4. **国际化补齐**：TUI 尚无 i18n（#37216）；zh/zht 词典落后英文 93 个键（#53858）。
5. **移动端联动**：桌面/CLI 发起的会话推送通知到 iOS（#63992）。
6. **本地模型与自定义 Provider 的 GUI 管理**（#33704）：LM Studio、Jan 等本地推理用户的持久诉求。

---

## ⚠️ 开发者关注点

- **v2.3.0 回归风险**：pty 僵尸进程（#63817）、TUI 光标乱跳（#63971）、GNOME Terminal 退出后配色残留（#63977）——升级前建议留意。
- **成本与缓存敏感**：prompt cache 非确定性丢失（#63935）、图片全量重发（#59794）、fallback 绕过模型白名单产生付费（#63958）是付费用户三大痛点。
- **本地/自托管体验**：5 分钟 Headers Timeout 无法关闭（#26602）、图片限制后端兼容性差，本地推理用户摩擦较大。
- **AI 审核流程**：opencodejr 误关 Issue 引发对自动化 triage 的质疑（#63975），维护方流程或需调整。
- **贡献流程摩擦**：大量有效 PR 被自动化清理关闭（如 #55528、#55450），需要贡献者 rebase 重提，外部贡献留存率堪忧。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-11-15

## 一、今日速览

Qwen Code 发布 v0.27.2 nightly 版本，核心亮点是 Managed Agent 会话支持注册客户端文件系统。1.0 Preview 内核落地（#17045）持续推进，配套的 ACP agent-loop 一致性 Bug（#17234）当日被快速修复关闭。CI 稳定性仍是社区最大痛点，夜间测试通道持续红盘（#16371），同时 Web Shell 成为功能迭代最密集的方向。

## 二、版本发布

**v0.27.2-nightly.20261113** ([Release](https://github.com/QwenLM/qwen-code/releases))
- feat(managed-agent): 将客户端文件系统注册到 managed sessions（@wenshao, #16844）
- test(web-shell) 相关更新

## 三、社区热点 Issues

1. **#17045 — 1.0 Preview 循环内核落地跟踪（P1）**
   核心路线图：将 `v1.0.0-preview` 的事件驱动内核（单一 `query()` 入口）逐个 surface 迁移到 main。18 条评论，社区高度关注。
   https://github.com/QwenLM/qwen-code/issues/17045

2. **#16371 — 夜间 CI 通道持续红盘（P1）**
   `SDK Java` 和 `E2E Tests` 夜间通道几乎每晚失败，但每次是不同的 timing 敏感测试，非稳定回归，关闭单条 issue 无法根治。维护者已承认这是系统性问题。
   https://github.com/QwenLM/qwen-code/issues/16371

3. **#17234 — ACP agent-loop 一致性红盘（已关闭）**
   kernelRounds 仅为 sharedRounds 的一半（23/25 用例失败），当日由 @wenshao 提交并快速关闭，体现 1.0 内核迁移中的快速响应。
   https://github.com/QwenLM/qwen-code/issues/17234

4. **#17288 — 私有安全漏洞报告通道不畅（P1）**
   安全研究者反馈 SECURITY.md 指向的阿里云控制台在印度无法登录，GitHub 私有漏洞报告也未启用。文档/流程级问题，需官方优先处理。
   https://github.com/QwenLM/qwen-code/issues/17288

5. **#16824 — 模型反复拼写错误（P2）**
   用户报告 Qwen 3.8 坚持将项目名 "Luminum" 拼成 "Lulumi"，重装无效。指向长上下文/token 管理层的记忆污染问题。
   https://github.com/QwenLM/qwen-code/issues/16824

6. **#17261 — Managed Agent 子代理无输出直至超时（P2）**
   content-only 工作区拓扑下，子代理启动成功但全程无进展，最终 `hosted_turn_deadline_exceeded`。Managed Agent 稳定性又一案例。
   https://github.com/QwenLM/qwen-code/issues/17261

7. **#17289 — 自定义命令参数替换模式 Bug（P2）**
   `{{args}}` 直接作为 `replaceAll` 替换串，导致 `$$`、`$&` 等被意外解释。经典注入类 Bug，值得所有自定义命令用户警惕。
   https://github.com/QwenLM/qwen-code/issues/17289

8. **#17266 — Windows Web Shell 环境信息开关引发 cmd.exe 窗口风暴（P2）**
   触发大量可见 cmd 窗口与重叠 git 轮询，高 CPU。Windows daemon 体验的典型痛点。
   https://github.com/QwenLM/qwen-code/issues/17266

9. **#17284 — 1.0 Agent Loop 遗留项跟踪（P2）**
   记录 #17045（11-21 冻结）未覆盖的后续工作，是理解 1.0 路线图边界的必读文档。
   https://github.com/QwenLM/qwen-code/issues/17284

10. **#17077 — Channel PR #15634 审查卡死**
    消息注入调度模式 PR 因两票审批门槛停滞多日，作者发 issue 催审，反映社区贡献流程瓶颈。
    https://github.com/QwenLM/qwen-code/issues/17077

## 四、重要 PR 进展

1. **#17228 — Web Shell Codex 式 worktree 会话（@wenshao）**
   新会话默认使用隔离 worktree、detached HEAD，支持并行与 handoff，默认开启。今日最大功能变更。
   https://github.com/QwenLM/qwen-code/pull/17228

2. **#16439 — 会话恢复时重放持久化 startup prelude（@MikeWang0316tw）**
   resume 不再基于当前日期/目录重建 prelude，改为重放原始记录，保证恢复会话上下文一致性。
   https://github.com/QwenLM/qwen-code/pull/16439

3. **#16784 — 无法解码的 shell 路径 fail-closed（@he-yufeng）**
   安全修复：不可无损解码的文件名不再继承 allow 判定，收紧行为更安全。
   https://github.com/QwenLM/qwen-code/pull/16784

4. **#16679 — ACP 上报失败的 todo_write（@2SinceJuly）**
   失败调用不再被静默丢弃，以 terminal `tool_call_update` 上报。
   https://github.com/QwenLM/qwen-code/pull/16679

5. **#17025 — 稳定 OpenTUI 流式 markdown 预览（@MikeWang0316tw）**
   关闭同步流式预览消除抖动，直击 TUI 渲染体验痛点（关联长期 issue #6137 闪烁问题）。
   https://github.com/QwenLM/qwen-code/pull/17025

6. **#17219 — 稳定 macOS 夜间 CI（@wenshao）**
   针对 #16371 系统性 CI 不稳定问题的专项修复。
   https://github.com/QwenLM/qwen-code/pull/17219

7. **#16943 — 新增 `/memory show` 命令（@xxwtiancai）**
   打印会话实际携带的组合 memory，填补用户调优 QWEN.md / `/remember` 后无法验证的盲区。
   https://github.com/QwenLM/qwen-code/pull/16943

8. **#17281 — Managed Agent 按提交态读取继承的扩展配置（@yiliang114）**
   修复子代理绑定扩展包时的 committed-state 契约，与 #17261/#17247 同属子代理委派链路加固。
   https://github.com/QwenLM/qwen-code/pull/17281

9. **#17276 — Web Shell 整行选定时显示复制菜单（@4ekuct25）**
   修复三击选整行时菜单不出现的边界问题，与 #17270 issue 呼应，响应极快。
   https://github.com/QwenLM/qwen-code/pull/17276

10. **#17269 — 批量刷新扩展并保留健康 watcher（@chiga0）**
    减少 CLI 运行时刷新次数，修复 Source 安装路径，改善扩展安装体验。
    https://github.com/QwenLM/qwen-code/pull/17269

## 五、功能需求趋势

- **Managed Agent / 托管会话**：绝对主线。客户端文件系统注册、子代理委派、DingTalk 适配、扩展配置继承，相关 issue/PR 占比最高。
- **Web Shell**：迭代最密集的 UI 方向——worktree 会话、多工作区 Goals、复制菜单、语言设置、Windows daemon 体验均有反馈。
- **1.0 内核迁移**：#17045/#17284 路线图驱动，ACP/TUI parity 测试成为迁移质量的度量标尺。
- **ACP 协议完善**：todo_write 失败上报、max_tokens 截断报告、conditional close 语义，面向编辑器/客户端集成方。
- **Memory 管理**：`/memory show`、memory-manager 测试基建，用户对“模型实际看到什么”的可观测性需求上升。

## 六、开发者关注点

1. **CI 不稳定是最大痛点**：夜间通道"轮换式红盘"（#16371）、大量 deflake issue/PR（#17262、#17268 等），开发者对 timing 敏感测试消耗的精力显著；GitHub Next 主动提出 CI 提速建议（#17287）。
2. **Managed Agent 子代理链路可靠性**：#17261、#17247 均为子代理委派卡死/拒绝问题，是当前核心 Bug 集中区。
3. **安全流程待完善**：私有漏洞报告通道不可用（#17288）应尽快响应；shell 路径 fail-closed（#16784）等安全加固持续进行。
4. **Windows 体验短板**：cmd.exe 窗口风暴、git 轮询高 CPU（#17266），daemon 模式在 Windows 上问题集中。
5. **审查瓶颈**：社区 PR 因审批门槛停滞（#17077），维护者带宽成为贡献流转的约束。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*