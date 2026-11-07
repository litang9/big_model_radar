# AI CLI 工具社区动态日报 2026-11-08

> 生成时间: 2026-11-07 23:37 UTC | 覆盖工具: 7 个

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
**数据窗口：2026-11-07 至 2026-11-08**

---

## 1. 生态全景

AI CLI 工具已从单纯的命令行补全工具演进为覆盖 CLI、桌面端、IDE、移动端的多形态 Agent 平台，竞争焦点转向 **Agent 可靠性、安全治理与自动化/headless 场景成熟度**。头部工具（Claude Code、Codex、Gemini CLI）均在补齐远程会话、Computer Use、subagent 等重度工作流能力，而安全事件（Claude Code 邮箱泄露、Gemini CLI 密钥泄露路径）表明隐私与权限边界已成为公众信任的核心战场。同时，“配额计量不透明/异常消耗”在多个社区同时爆发，成本可观测性正在成为用户选型的硬指标。生态内还出现了明显的兼容性竞争：OpenCode 主动兼容 Claude Code 的 hooks/CLAUDE.md 体系，试图承接迁移用户。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues 摘要 | PR 活跃度 | Release | 情绪基调 |
|---|---|---|---|---|
| **Claude Code** | 10+ 热点，#107757 隐私泄露 727👍/104💬 | 无 PR 更新 | 无 | 🔴 信任危机（隐私+回归） |
| **OpenAI Codex** | Windows 问题占半数，单 issue 最高 81💬 | **10+ PR 合并**（Code Mode、认证、side chats） | rust-v0.169.0-alpha.3 | 🟡 Windows 重灾区，工程节奏快 |
| **Gemini CLI** | 10+ 热点，subagent 假成功成焦点 | **10+ 安全/稳定性 PR，多为 P1** | 无 | 🟢 工程响应积极 |
| **Copilot CLI** | 24 新增 / 16 关闭 | 无 PR 记录 | **2 个版本**（v1.0.108-0/1） | 🟢 迭代稳定、关闭效率高 |
| **OpenCode** | 免费层聚合帖 326💬 | **10+ PR 合并** | 无 | 🟡 免费层情绪波动，插件生态爬坡 |
| **Qwen Code** | CI 失败帖 225💬 | **10+ PR**（SQL 优化、容量设计） | **v0.27.0 正式版** | 🟡 CI/安全债，架构演进活跃 |
| **Kimi Code CLI** | 无活动 | 无 | 无 | ⚪ 静默 |

**要点**：Codex、Gemini CLI、Qwen Code、OpenCode 均处于高频工程迭代期；Claude Code 社区声量最大但以负面事件驱动；Copilot CLI 关闭率最高（16/24）体现成熟维护节奏。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **Headless/SDK 自动化可靠性** | Claude Code（#97074 配额 1.8x、#107144 本地调用被拦）、Qwen Code（#15597 auto-memory 失效、#15325 静默返回旧答案）、Gemini CLI（PR #30051 信号退出）、Copilot CLI（#5380 会话 extensions 不启动） | SDK 入口长期是“二等公民”：会话恢复、超时、退出码、功能完整性全面落后于交互模式 |
| **危险命令防护与权限边界** | Claude Code（#100684 pkill 误杀全部 GUI）、Gemini CLI（PR #30171 rm 变体检测、#30196 污染命令持久放行）、Copilot CLI（#5379 PowerShell 审批过频）、OpenCode（#62432 allow-always 无法撤销） | 社区共识：需要精确的命令 AST 级预检，而非子串匹配或一刀切审批 |
| **成本/配额透明度** | Claude Code（#97074）、Codex（#59690 计量 15 倍异常）、#48369 发送按钮锁死）、Copilot CLI（#3012 任务 token 上限）、Gemini CLI（#19561 每turn 36.6k token 基线） | 五家同时爆发计量类问题，是本周期最强共性信号 |
| **Subagent 状态可观测性** | Gemini CLI（#22323 MAX_TURNS 假成功、#21409 挂死）、Codex（#51524 Computer Use 卡死）、Copilot CLI（#5370 输出延迟似假死）、OpenCode（#62628 压缩死循环） | “无法判断 agent 真实状态”是跨工具的第一痛点 |
| **MCP 生态健壮性** | Codex（#60158 elicitation 被拒）、Copilot CLI（#4695 OAuth token 复用失败）、Gemini CLI（#24246 128 工具上限）、OpenCode（#37844 MCP 进程堆积） | MCP 集成的认证、工具规模、进程管理均待成熟 |
| **IDE/ACP 集成** | Gemini CLI（#30005 hooks 不执行）、OpenCode（#54371 slash 输出不回传）、Copilot CLI（#5376 OTel 缺失） | 编辑器驱动场景的遥测与交互回路是共同短板 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特点 |
|---|---|---|---|
| **Claude Code** | 全栈 Agent 工作流（Remote Control、Browser pane、Desktop） | 重度专业开发者、跨机工作流 | 功能最广但回归频发，安全修复引入新问题（#107757→#107144）暴露发布质量控制不足 |
| **Codex** | Computer Use + 云端 durable chat + 多端同步 | Windows/桌面为主的通用用户、云端会话用户 | Rust 重写（rust-v0.169 alpha），Code Mode 增量工具目录等上下文效率优化激进 |
| **Gemini CLI** | 安全加固 + subagent 体系 + AST/token 效率 | 自动化与安全敏感团队 | 本周期最密集的 P1 安全 PR 流，方向是“沙箱执行 + 分层代码发现”的精细化路线 |
| **Copilot CLI** | 企业管控（沙箱策略、OTel）+ 终端集成 | GitHub 生态企业用户 | 版本节奏最稳，OSC 7501 状态协议、tgrep 共享索引体现“基础设施级”打磨 |
| **OpenCode** | 开源生态兼容 + TUI 插件 + Zen 免费层 | 从 Claude Code 迁移的开源用户 | 明确的“兼容即战略”：CLAUDE.md/skills 已兼容，hooks 是最后缺口 |
| **Qwen Code** | Managed Agent 规模化 + Web Shell | 自托管/托管 agent 平台运维者 | 独特的控制面路线：MySQL 连接池、闲置 Session 回收、容量准入设计 |

---

## 5. 社区热度与成熟度

- **声量最高**：Claude Code（单 issue 727👍）与 OpenCode（326💬 聚合帖）、Qwen Code（225💬 CI 帖）——但三者高声量均由**负面情绪**驱动（隐私事件、免费层故障、CI 不稳定）。
- **工程响应最积极**：Gemini CLI 与 Codex，单日各合并 10+ PR 且直击痛点；Gemini CLI 的 P1 安全修复密度尤其突出。
- **成熟稳定期**：Copilot CLI，双版本发布 + 67% issue 关闭率，进入维护打磨阶段。
- **快速迭代/架构演进期**：Qwen Code（Managed Agent 容量治理）、OpenCode（V2 桌面端 + 插件生态）、Codex（Rust 化 + Code Mode）。
- **掉队风险**：Kimi Code CLI 连续静默，存在感最弱。

---

## 6. 值得关注的趋势信号

1. **安全与信任成为竞争分水岭**：Claude Code 邮箱泄露（已造成实际钓鱼危害）与 Gemini CLI 密钥泄露修复形成对照——后者“粘贴转义、危险命令全变体检测、错误报告隔离”的处理方式正在树立行业标杆。开发者选型时应将安全响应速度纳入评估。

2. **Agent 可观测性是下一个基础设施**：假成功（Gemini #22323）、假死（Copilot #5370）、静默错误（Qwen #15325）跨工具出现，OSC 7501 终端状态协议被多家采纳，**结构化 agent 状态上报**将成为标配能力。

3. **Headless/SDK 从边缘走向核心战场**：五家工具的自动化场景问题集中爆发，预示 CI/CD 中嵌入 agent 已是主流用法。重度自动化用户目前仍需以“防御性配置 + 独立监控”兜底。

4. **计量透明度可能引发监管/合规关注**：Codex 15 倍消耗、Claude Code 1.8 倍配额倍率等若被证实，属实质计费争议。建议企业用户建立独立的 token 消耗审计，勿轻信内置用量报告。

5. **兼容性成为获客策略**：OpenCode 兼容 Claude Code hooks 的路线表明，agent 配置格式（CLAUDE.md、skills、hooks）正在事实标准化——锁定效应减弱，**迁移成本下降对用户是长期利好**。

6. **上下文/token 效率进入工程深水区**：AST 感知读取（Gemini）、增量工具目录（Codex/OpenCode）、分层提取（Gemini #19561）取代了粗暴的上下文压缩，token 成本优化正从模型层下沉到工具层。

**给决策者的一句话**：当前没有一款工具在安全、稳定性、自动化三方面同时达标——组合使用（交互用 Claude Code/Codex + CI 验证用 Copilot CLI）或锁定响应最快的开源方案（Gemini CLI）是务实选择，Kimi Code CLI 暂不建议纳入生产评估。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

*数据截止：2026-11-08 | 来源：anthropics/skills*

---

## 一、热门 Skills 排行（PR）

需要说明：本期数据中 PR 评论数均为空，故以更新活跃度、关联 Issue 讨论量及修复价值综合排序。

| # | Skill / PR | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** ([#1742](https://github.com/anthropics/skills/pull/1742)) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 Header 配置，修复 #1668；与高讨论度 Issue #1390（评估脚本对所有真实 MCP 服务器打 0 分）呼应，是 MCP 构建链路的关键修复 | OPEN |
| 2 | **skill-creator 触发评估修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 隔离 trigger evals、修复 Windows select() 失败与误报；直接回应 #556（`claude -p` 触发率 0%）这一 13 评论的热门 Issue | OPEN |
| 3 | **docx LibreOffice 超时修复** ([#1792](https://github.com/anthropics/skills/pull/1792)) | 超时不再误报成功，并校验修订标记真正清除；文档类 Skill 是修复 PR 最密集的领域（另见 #1734、#2018） | OPEN |
| 4 | **webapp-testing 安全加固** ([#1980](https://github.com/anthropics/skills/pull/1980)) | 移除 `shell=True` 消除命令注入风险（CWE-78）；同 Skill 还有 #1976 元素识别修复 | OPEN |
| 5 | **Pyxel 复古游戏开发 Skill** ([#525](https://github.com/anthropics/skills/pull/525)) | 像素风游戏创建、无头运行与帧检查；3 月提交至今仍在更新，生命力强 | OPEN |
| 6 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Markdown → Marp 幻灯片 → 带真人配音的 MP4，零成本内容生产方向 | OPEN |
| 7 | **notion-spec-to-implementation + quantitative-resume-auditor** ([#1245](https://github.com/anthropics/skills/pull/1245)) | 产品/技术规格自动拆解为 Notion 实施任务；体现“Spec → 可执行任务”工作流自动化需求 | OPEN |
| 8 | **scnet-hpc** ([#1615](https://github.com/anthropics/skills/pull/1615)) | SSH + Slurm 的 HPC 集群操作 Skill，代表科研计算场景接入 | OPEN |

---

## 二、社区需求趋势（Issues 提炼）

1. **安全与信任机制**（最强诉求）：#492（46 评论）指出社区 Skill 冒用 `anthropic/` 命名空间造成信任边界滥用；配套出现 #1980 注入修复、#1394 XSS——社区要求签名/命名空间治理。
2. **组织级分发与共享**：#228（17 评论）要求 Claude.ai 内组织级 Skill 共享库，替代 Slack 手传 `.skill` 文件。
3. **Agent 记忆与推理质量控制**：#1329 compact-memory（符号化压缩 Agent 状态）、#1385 推理质量三关卡流水线——长会话上下文效率是持续热点（另见 #1487：claude-api 单次注入 156k token 撑爆上下文）。
4. **Skill 元质量规范**：#202（skill-creator 应为操作指令而非开发文档）、#2064（description 缺少“何时触发”）——触发准确性是核心痛点。
5. **Web3 / 治理类提案**：#1771 智能合约审计上链、#412 agent-governance。

---

## 三、高潜力待合并 Skills / PR

- [#1298](https://github.com/anthropics/skills/pull/1298) skill-creator 触发评估修复 —— 解决 #556，涉及评估基础设施，优先级高
- [#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder mcp>=2 兼容 —— MCP 生态演进必需
- [#2019](https://github.com/anthropics/skills/pull/2019) xlsx 工作表级 defined names 修复（关联 #2013）
- [#1997](https://github.com/anthropics/skills/pull/1997) skill-creator YAML frontmatter 解析修复
- [#2108](https://github.com/anthropics/skills/pull/2108) 文档 Skills 快照状态澄清 —— 11 月初新提交，反映官方同步机制正在规范化
- [#1975](https://github.com/anthropics/skills/pull/1975) / [#1976](https://github.com/anthropics/skills/pull/1976) / [#1977](https://github.com/anthropics/skills/pull/1977) 同一作者批量小修复，合并概率高

---

## 四、生态洞察

**当前社区最集中的诉求：安全可信的 Skill 分发机制（命名空间治理 + 注入/XSS 加固），以及可靠的 Skill 触发与评估基础设施**——即从“能写 Skill”转向“Skill 可被信任、可被正确触发、可在组织内安全流通”。

---

# Claude Code 社区动态日报 · 2026-11-08

## 一、今日速览

今日无新版本发布，社区焦点集中在 **#107757 隐私泄露事件**（User-Agent 头泄露用户邮箱，727 👍 / 104 评论，持续发酵）。此外，headless 模式额度消耗异常（#97074）与 2.1.317 新增账号邮箱校验误伤本地 Bash 调用（#107144）是今日讨论最活跃的技术问题。

---

## 二、版本发布

过去 24 小时无新 Release。

---

## 三、社区热点 Issues（Top 10）

1. **[#107757](https://github.com/anthropics/claude-code/issues/107757)｜User-Agent 头向第三方泄露用户邮箱**
   本期最热 Issue（👍727，评论 104）。Web 搜索时 `User-Agent` 携带用户邮箱，导致作者每天收到大量钓鱼邮件。社区强烈要求**直接移除该字段而非提供 opt-out 选项**。涉及隐私合规风险，属 P0 级安全事件。

2. **[#97074](https://github.com/anthropics/claude-code/issues/97074)｜Headless `claude -p` 每 token 消耗 5 小时窗口约 1.8 倍于交互模式**
   有完整复现（👍154，评论 72）。相同工作负载下 SDK 入口（`sdk-cli`）配额消耗显著更高，直接影响重度自动化用户和 CI 场景成本。

3. **[#100684](https://github.com/anthropics/claude-code/issues/100684)｜Auto 模式 `pkill -f "cat"` 误杀 macOS 全部 GUI 应用**
   子串匹配 `/Applications` 导致 Safari、Chrome 等被 SIGTERM。暴露了 Auto 模式下 Bash 危险命令防护缺失的系统性风险。

4. **[#107144](https://github.com/anthropics/claude-code/issues/107144)｜2.1.317+ 账号邮箱校验阻断 headless 本地 Bash 调用**
   新版本安全校验误伤 heredoc 写文件、curl 到 127.0.0.1 等纯本地操作，疑似与 #107757 的隐私修复相关，引发回归担忧。

5. **[#96508](https://github.com/anthropics/claude-code/issues/96508)｜#86362 回归：Browser pane 仍拦截解析到 127.0.0.1 的同源子资源**
   原_issue 被关闭但无关联修复版本，Windows 上依然复现，社区对“未修复即关闭”的做法不满。

6. **[#95231](https://github.com/anthropics/claude-code/issues/95231)｜Remote Control 会话被过滤出 `/resume` 选择器**
   因 transcript 中 `entrypoint: sdk-cli` 被过滤，远程控制会话无法恢复。与 #94546 同根因，反映入口标记体系的设计缺陷。

7. **[#87190](https://github.com/anthropics/claude-code/issues/87190)｜[FEATURE] 附加终端到另一台机器上的 Remote Control 会话**
   远程开发场景的高价值需求，说明社区正把 Claude Code 用于跨机工作流。

8. **[#98551](https://github.com/anthropics/claude-code/issues/98551)｜[FEATURE] Browser pane 支持信任解析到 127.0.0.1 的本地开发域名**
   针对 Lando/DDEV 等 `*.lndo.site` 本地开发栈，与 #96508 是同一问题的正向解法方向。

9. **[#106772](https://github.com/anthropics/claude-code/issues/106772)｜后台会话停止上报 OSC 7501 终端状态**
   影响第三方终端工具（如 herdr）对 agent 状态的追踪，反映生态集成依赖的 OSC 协议稳定性问题。

10. **[#104359](https://github.com/anthropics/claude-code/issues/104359)｜持有环境变量凭据时 CLI 仍续期存储的 claude.ai 登录**
    macOS 沙箱场景下 refresh token 被拆分写入 `.credentials.json`，后续 400 错误导致凭据被清空，属凭据管理设计缺陷。

---

## 四、重要 PR 进展

过去 24 小时无 PR 更新，本节省略。

---

## 五、功能需求趋势

从本期 Issues 中可提炼出以下热点方向：

- **远程/多机工作流**：Remote Control 会话管理（#95231、#94546、#87190）成为最集中的诉求，会话入口标记与恢复体验需系统性重构。
- **本地开发环境支持**：Browser pane 对 127.0.0.1 域名的信任机制（#96508、#98551）呼声明确，需产品级解决方案。
- **Desktop App 打磨**：输入延迟（#108216，已关闭）、prompt suggestions 缺失（#106323）、侧栏状态记忆（#104942）、浏览器面板多标签（#106887）等 UX 细节问题密集。
- **成本与配额透明度**：headless 配额倍率（#97074）、API 余额误报（#106458）持续被关注。
- **自动化/无人值守可靠性**：Routines 因权限提示卡死（#91724，已 stale）等问题在自动执行场景反复出现。

---

## 六、开发者关注点

1. **隐私与安全是当前最大信任危机**：#107757 的邮箱泄露已造成实际诈骗危害，而 #107144 显示相关修复又引入回归——开发者期待官方给出既彻底又不误伤的方案与正式声明。
2. **Auto 模式的权限边界**：#100684 的“误杀全家”事件加剧了对 Auto 模式执行破坏性 Bash 命令的担忧，社区普遍要求更严格的命令预检/白名单机制。
3. **Headless/SDK 一等公民待遇**：从配额倍率（#97074）、会话恢复（#94546）到本地调用被拦截（#107144），SDK 入口功能长期落后于交互式 CLI，自动化用户受影响最大。
4. **凭据与会话管理的健壮性**：多凭据并存时的续期逻辑（#104359）易导致 token 失效，企业用户尤其敏感。
5. **大量 Issue 因 stale 被自动关闭**：本期多条历史 issue（#83899、#84604、#91740 等）被 stale bot 关闭且未关联修复，社区对“以关闭代替修复”的流程存在持续不满。

---

*数据来源：github.com/anthropics/claude-code · 统计窗口：2026-11-07 至 2026-11-08*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-11-08

## 📌 今日速览

Codex 发布 **rust-v0.169.0-alpha.3** 预发布版本。社区侧 Windows 平台问题持续发酵，**Computer Use 无法读取浏览器 URL** 相关 bug 依然是最热议题；同时 CLI 团队合并了大量关于 Code Mode 增量工具目录、运行时认证的改进。

---

## 🚀 版本发布

- **rust-v0.169.0-alpha.3** — Alpha 预发布，官方未附详细 changelog。

---

## 🔥 社区热点 Issues

1. **[#42739](https://github.com/openai/codex/issues/42739)** Windows 桌面更新后本地项目从侧边栏消失（81 评论）。持续两个多月未修复，是当前评论量最高的 issue，影响用户核心工作流。

2. **[#51524](https://github.com/openai/codex/issues/51524)** Windows Computer Use 在 `get_window_state` 处停止，无法确定浏览器 URL（74 评论）。Chrome/Edge 均复现，10 月 6 日后集中爆发。

3. **[#59380](https://github.com/openai/codex/issues/59380)** 与上条同源的新报告：Computer Use 无法检测 URL 也无法截图，说明该缺陷至今未解决且有新版本（26.1103）复现。

4. **[#50428](https://github.com/openai/codex/issues/50428)** Windows 桌面 durable chat 提交与 fork 因 `AbsolutePathBuf` 反序列化失败（42 评论），阻塞云端会话执行。

5. **[#35420](https://github.com/openai/codex/issues/35420)** OneDrive 工作区降级时 Codex 流反复断连（37 评论），凸显本地云同步目录的兼容性短板。

6. **[#48369](https://github.com/openai/codex/issues/48369)** 用量耗尽后发送按钮全局永久禁用，即使配额恢复也不解锁（16 评论、8 👍）。

7. **[#59690](https://github.com/openai/codex/issues/59690)** GPT-6.1 Terra 自 11 月 5 日起每次调用消耗约 **15 倍** Codex 限额，疑似缓存输入按全价计费——计量问题需官方尽快澄清。

8. **[#51540](https://github.com/openai/codex/issues/51540)** Dots 的"abuse prevention"不透明限流破坏 always-on 可靠性，且无用量计和重置信息（11 评论）。

9. **[#58811](https://github.com/openai/codex/issues/58811)** VS Code 扩展因 30 秒内 eager 预加载 3,203 个 chunk 导致 UI 启动超时，性能问题分析非常扎实。

10. **[#60158](https://github.com/openai/codex/issues/60158)** 新增：0.167.0 中 MCP form elicitation 被自动拒绝，即使 `approval_policy = "on-request"`，可能影响依赖表单交互的 MCP 集成。

---

## 🔧 重要 PR 进展

1. **[#60157](https://github.com/openai/codex/pull/60157) / [#60163](https://github.com/openai/codex/pull/60163)** Code Mode 增量工具定义支持及接入会话——嵌套工具变更无需重发完整 `functions.exec` 声明，降低上下文开销。
2. **[#60152](https://github.com/openai/codex/pull/60152)** 本地工作区 side chats 持久化 + 标签页关闭控件，重启后可从侧栏恢复。
3. **[#60181](https://github.com/openai/codex/pull/60181)** 侧栏标签键盘（k/j、方向键）与鼠标滚轮导航。
4. **[#60101](https://github.com/openai/codex/pull/60101) / [#60073](https://github.com/openai/codex/pull/60073)** Analytics 与远程控制请求统一切换到运行时认证。
5. **[#60096](https://github.com/openai/codex/pull/60096)** 终止对不可恢复的运行时认证拒绝的重试，快速暴露登录错误。
6. **[#60080](https://github.com/openai/codex/pull/60080)** 模型请求预算检查支持异步，避免阻塞 HTTP/WS 生成。
7. **[#60067](https://github.com/openai/codex/pull/60067)** 修复 side-chat 首次请求丢失开发者策略的问题。
8. **[#60172](https://github.com/openai/codex/pull/60172)** 答案审核流程保留展示指令元数据，恢复历史时保持正确显示行为。
9. **[#60122](https://github.com/openai/codex/pull/60122)** Code mode 调度错误写入 rollout trace，可观测性提升。
10. **[#30880](https://github.com/openai/codex/pull/30880)**（长期开放）检测 Vite+ 管理的 Codex 安装，`doctor`/更新链路适配。

---

## 📈 功能需求趋势

- **Windows 平台稳定性**：热门 issue 中过半与 Windows 相关（Computer Use、沙箱 token 泄漏、OneDrive 断连），是最迫切的方向。
- **用量透明度**：限额计量（#59690）、重置规则（#39398）、不透明限流（#51540）呼声集中。
- **可扩展性**：公开 Desktop 扩展 API / Extension Host（#51138）、上下文压缩钩子（#60174）。
- **跨端一致性**：iOS/Android 与桌面端的会话、项目列表同步（#36454、#37659、#56600）。
- **CLI 可靠性**：沙箱嵌套、MCP 交互、认证链路。

## ⚠️ 开发者关注点

1. **Windows 是重灾区**：Computer Use 浏览器 URL 检测失败已持续一个月且跨多个版本，官方尚无修复时间表。
2. **配额计量疑似异常**：#59690 的 15 倍消耗若属实，重度用户需立即关注账单与限额。
3. **MCP elicitation 自动拒绝**（#60158）可能破坏现有 MCP 工作流，升级 0.167.0 前建议验证。
4. **IDE 性能**：VS Code 扩展的 chunk 预加载问题（#58811）影响启动可用性，可关注后续修复版本。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-11-08）

## 1. 今日速览

今日无新版本发布，社区活动集中在安全修复与 Agent 稳定性两个方向。安全方面出现一批高优先级 PR：修复污染命令被永久放行、粘贴文本泄露 SSH 私钥、错误报告含完整聊天记录写入公共临时目录等隐患。Agent 方面，subagent 会话 ID 冲突、子代理超时误报成功、本地子代理生成配置失效等问题持续活跃讨论。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — Subagent 达到 MAX_TURNS 后仍上报 `GOAL success`，掩盖了实际中断。这是可观测性层面的严重问题：模型行为被打断却被记录为成功，会误导上层调度。13 条评论为今日最多，P1 优先级，等待复测。

2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — 提议零依赖 OS 级沙箱 + 执行后意图路由，充分利用 Gemini 3 原生 bash 能力（grep/sed/awk 链式调用）。涉及安全与能力的核心权衡，讨论活跃（9 评论）。

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — 通用 agent 挂起问题，简单如创建文件夹也会永久卡死（用户等待 1 小时），8 个 👍 反映影响面较广。P1，等待复测。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — AST 感知的文件读取/搜索/代码库映射 EPIC，目标是通过精确读取方法边界减少无效 turn 和 token 噪音，是 Agent 效率方向的长期投入。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — 模型几乎不主动调用自定义 skills 和 subagents，仅在明确指示时才使用。对依赖 subagent 生态的用户是核心痛点。

6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** — Browser Agent 完全忽略 `settings.json` 的配置覆盖（如 `maxTurns`），AgentRegistry 读取了配置但未生效，属配置链路断裂。

7. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — Browser subagent 在 Wayland 下失败，但终止原因仍显示 `GOAL`，与 #22323 属同类"虚假成功"问题。P1。

8. **[#30005](https://github.com/google-gemini/gemini-cli/issues/30005)** — 新提交：ACP 模式下 `BeforeTool`/`AfterTool` hooks 不执行，`acpSession.ts` 绕过了调度器。影响所有通过 Zed/JetBrains 等编辑器驱动的用户。

9. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — 工具数超过 128 个时触发 API 400 错误，要求 Agent 更智能地裁剪工具作用域。对重度 MCP/skill 用户是硬性上限问题。

10. **[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)** — "Tactful Extraction"提案：建立 grep → 精读的分层代码发现机制，解决大文件读取"firehose"式上下文膨胀（基线约 36.6k tokens/turn），token 成本优化方向代表。

## 4. 重要 PR 进展

1. **[#30196](https://github.com/google-gemini/gemini-cli/pull/30196)** — 安全修复：对被标记为"受污染"的 shell 命令（不可信 flag、构建文件变更后的构建命令）选择"Always allow"时不再保存持久放行规则，改为仅当次批准，防止"一次放行、永久放行 `npm`"。

2. **[#30169](https://github.com/google-gemini/gemini-cli/pull/30169)** — 安全修复（P1）：粘贴的 shell 转录文本可能触发 CLI 未经确认附带 SSH 私钥。此 PR 让粘贴文本中的 `@` 默认转义并修复模糊匹配路径。修复 #26730。

3. **[#30088](https://github.com/google-gemini/gemini-cli/pull/30088)** — 错误报告（含完整聊天历史）此前以默认权限写入共享 `/tmp`，存在信息泄露风险；现迁移至 `~/.gemini/tmp/error-reports/` 并限制为当前用户可读。

4. **[#20273](https://github.com/google-gemini/gemini-cli/pull/20273)** — P1：为 subagent 生成独立会话 ID。此前子代理继承父会话 ID，异常退出时会导致会话记录相互覆盖。

5. **[#30170](https://github.com/google-gemini/gemini-cli/pull/30170)** — P1：修复本地 subagent 在模型调用卡住时耗尽整个 `maxTimeMinutes` 才超时的问题，新增可选的单 turn 模型响应时限。修复 #29257。

6. **[#30171](https://github.com/google-gemini/gemini-cli/pull/30171)** — P1：修复 `rm` 危险命令检测只检查 `args[1]` 的缺陷，`rm -r -f x`、`rm --recursive --force x`、`rm x -rf` 等变体此前均未被标记为危险。

7. **[#30172](https://github.com/google-gemini/gemini-cli/pull/30172)** — 修复会话记录与实时历史中同一 tool call ID 产生多条结果的问题，消除 `--resume` 后的重复工具应答。

8. **[#30051](https://github.com/google-gemini/gemini-cli/pull/30051)** — headless 模式（`gemini -p --yolo`）被信号中断时：正确终止活动 shell、持久化工具调用、以标准信号退出码退出，而非静默 exit 0 留下孤儿进程。

9. **[#30020](https://github.com/google-gemini/gemini-cli/pull/30020)** — 修复流式重试导致前端执行两份工具调用的问题：失败的尝试已流式输出但未写入历史，造成同一副作用命令被执行两次。对写操作是重要正确性修复。

10. **[#30194](https://github.com/google-gemini/gemini-cli/pull/30194)** — 修复 v0.67.0 中 `gemini models` 列表遗漏 `gemini-3.8-flash`（`/model manage` 中可见），已验证测试通过。

## 5. 功能需求趋势

- **Agent 执行安全**：沙箱执行（#19873）、破坏性命令防护（#22672、PR #30171/30196）、敏感信息防泄露（PR #30169/30088），是当前投入最密集的方向。
- **Subagent 体系成熟化**：会话隔离（PR #20273）、并行协作与共享内存（#18287）、轨迹可分享（#22598）、agent 发现机制（#18285），官方正以 sprint 推进（#20195）。
- **Token 效率与 AST 感知工具**：AST 文件读取/代码库映射（#22745/#22746）、Tactful Extraction 分层读取（#19561）、文件化任务追踪替代 in-context todo（#18836）。
- **Browser Agent 可靠性**：配置覆盖失效（#22267）、Wayland 兼容（#21983）、会话锁自动恢复（#22232）。
- **ACP/编辑器集成**：ACP hooks 失效（#30005）、ACP steering（PR #29901，已关闭），编辑器生态集成持续完善。
- **Headless/非交互模式**：中断处理（PR #30051）、结构化错误保留（PR #29895）、无人值守策略文档（PR #29902）。

## 6. 开发者关注点

- **Agent "挂死/假成功"是最高频痛点**：通用 agent 永久挂起（#21409）、MAX_TURNS 误报 GOAL success（#22323）、browser agent Wayland 失败但仍报成功（#21983）——用户普遍反馈难以判断子代理真实状态，可观测性和 bug 报告缺失子代理上下文（#21763）加剧了排查难度。
- **自动化场景的信任边界**：headless/YOLO 模式下的命令放行粒度、危险命令检测完整性、粘贴/文件附件的密钥泄露路径，是多条 P1 安全 PR 的共同主题。
- **工具数量与上下文成本**：>128 工具触发 400 错误（#24246）、每 turn 约 36.6k token 基线（#19561），重度用户对工具管理和 token 优化的诉求强烈。
- **模型自主性不足**：模型不主动使用 skills/subagents（#21968），用户被迫显式指示，削弱了自动化工作流的实际价值。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-08 | 数据来源：github.com/github/copilot-cli**

---

## 1. 今日速览

过去 24 小时 Copilot CLI 连发两个版本（v1.0.108-0 / v1.0.108-1），重点在沙箱能力增强（Windows 枚举式目录授权、`/cd` 后 MCP 服务器自动重启）与共享 tgrep 索引默认启用。Issues 活跃度较高（24 条），共 16 条被关闭——包括两个高关注的终端渲染/键盘输入问题，但仍有 8 条新问题处于开放状态，集中在 PowerShell 权限审批、ACP 模式可观测性缺失与企业场景配置。

---

## 2. 版本发布

### [v1.0.108-1](https://github.com/github/copilot-cli/releases)
**Fixed**
- Grok 4.7 / 4.6 上的 PDF 附件降级为文件引用，不再导致整个 turn 失败
- 沙箱开启时，本地 MCP 服务器在 `/cd` 后会自动重启，正确继承新目录的 denied paths 配置

### [v1.0.108-0](https://github.com/github/copilot-cli/releases)
**Added**
- 新增 `sandbox.userPolicy.filesystem.enumeratePaths` 设置项（Windows 枚举式目录授权）
- 新增 `/index` 命令；对符合条件的仓库默认启用托管共享 tgrep 索引

**Improved**
- 构建产物可回答关于 Copilot CLI 自身行为的问题

---

## 3. 社区热点 Issues

1. **[#5112](https://github.com/github/copilot-cli/issues/5112) OSC 7501 程序状态协议支持（已关闭）** 👍20 / 💬7
   交互式 TUI 向支持 OSC 7501 的终端上报 agent 状态（working/blocked 等）。作为本周期最高赞 issue 被关闭，是终端集成方向的重要进展。

2. **[#3760](https://github.com/github/copilot-cli/issues/3760) Ctrl+Enter 提示与实际行为不符（已关闭）** 👍12 / 💬4
   UI 提示 “ctrl+enter enqueue”，实际 enqueue 是 ctrl+q。高赞键盘输入问题被关闭，键盘交互持续是痛点区。

3. **[#4695](https://github.com/github/copilot-cli/issues/4695) MCP OAuth token 跨会话复用失败（开放中）**
   PKCE 公共客户端的 HTTP MCP 服务器频繁生成新 cache-key 导致反复重新授权。MCP 生态可用性的关键障碍，建议持续关注。

4. **[#5370](https://github.com/github/copilot-cli/issues/5370) Fusion/Auto 模式下后台长命令导致输出延迟（开放中）**
   Agent 输出被扣留到下一个用户 turn 才一次性显示，用户视角 agent “卡死”。影响 Fusion 新模式的核心体验。

5. **[#5379](https://github.com/github/copilot-cli/issues/5379) PowerShell 审批解析器要求全脚本审查（开放中，新）**
   1.0.106/107 中已授权的简单 git 命令仍触发权限提示，疑似审批解析回归。

6. **[#5376](https://github.com/github/copilot-cli/issues/5376) ACP 模式下无任何 OTel 遥测输出（开放中，新）**
   `copilot --acp` 不创建 per-session OTel tracker，对企业可观测性场景是硬伤。

7. **[#5380](https://github.com/github/copilot-cli/issues/5380) `create_session` 创建的会话中 Extensions 不启动（开放中，新）**
   程序化创建的会话缺少 extensions 的工具、技能和 hooks，直到用户手动切换。影响自动化工作流。

8. **[#5023](https://github.com/github/copilot-cli/issues/5023) 会话恢复因被掩码的指标字符串而永久失败（已关闭）**
   代码变更计数器被掩码为字符串导致 session 不可恢复，数据类型健壮性问题已修复关闭。

9. **[#4977](https://github.com/github/copilot-cli/issues/4977) / [#4918](https://github.com/github/copilot-cli/issues/4918) 捆绑 ripgrep 在 16KB/64KB 页 ARM64 内核上崩溃（均已关闭）**
   jemalloc 静态链接假设 4KB 页大小，Asahi Linux 等平台直接 abort。两条相关 issue 同日关闭，值得 ARM Linux 用户升级验证。

10. **[#3012](https://github.com/github/copilot-cli/issues/3012) 为任务设置 token 上限（已关闭）** 👍3
    社区长期呼吁控制 premium request 消耗，防止单任务耗尽月度配额，该功能请求已关闭。

---

## 4. 重要 PR 进展

过去 24 小时无 PR 更新记录，本节省略。

---

## 5. 功能需求趋势

- **沙箱与企业管控**：Windows 枚举式授权（#5368）、企业策略文档（#3884）、禁用内置斜杠命令（#5375）——企业场景的细粒度管控是活跃方向
- **终端深度集成**：OSC 7501 状态协议（#5112）、全键盘导航聊天界面（#5378）
- **程序化/自动化场景**：ACP 模式遥测（#5376）、`create_session` 的 extension 生命周期（#5380）、BYOK 自定义 provider 在 server 模式失效（#5371）
- **成本可控性**：任务级 token 上限（#3012）
- **模型与附件兼容性**：Grok 系列的 PDF 降级处理（v1.0.108-1）

---

## 6. 开发者关注点

- **权限提示过频**：PowerShell 简单命令仍需全脚本审查（#5379）、`gh api` 端点参数被误判为文件路径（#1486），权限解析的准确性是高频痛点
- **MCP 可靠性**：OAuth token 复用失败（#4695）影响 MCP 工作流连续性
- **输出实时性**：Fusion/Auto 模式的输出延迟（#5370）让 agent 看似假死
- **平台兼容性**：ARM64 非标准页大小（#4977/#4918）虽已修复，提示捆绑二进制的可移植性风险
- **可观测性缺口**：ACP/server 模式缺乏 OTel 支持（#5376），企业用户难以接入现有监控体系

**总体判断**：本周版本迭代节奏稳定、issue 关闭效率高，但新增开放问题集中在 Fusion 新模式、ACP 程序化接入和企业管控三大方向，是下一阶段需要重点跟踪的领域。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-08

## 1. 今日速览

今日无新版本发布，社区活跃度集中在 V2 桌面端与 TUI 插件生态的 bug 修复与功能打磨上。Zen 免费层问题聚合帖评论已突破 326 条，仍是社区最大痛点；Claude Code hooks 兼容性（#12472）持续获得关注。PR 方向则围绕 Console 事件监听、桌面端启动性能和统一产品导航展开。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues

1. **#59387 [zen] Free tier 免费层问题聚合帖**（326 评论 / 24 👍）
   免费额度提示、重置失败、版本不可用等问题的官方汇总帖，持续吸引大量用户报告，是当前社区情绪的风向标。
   https://github.com/anomalyco/opencode/issues/59387

2. **#12472 Claude Code hooks 原生兼容（PreToolUse / PostToolUse / Stop）**（21 评论 / 42 👍）
   OpenCode 已兼容 CLAUDE.md 与 skills，hooks 是迁移用户的最后一块缺口， 👍 数表明需求强烈。
   https://github.com/anomalyco/opencode/issues/12472

3. **#39986 TUI 外部 TSX 插件在打包 CLI 中无法响应式更新**（9 评论）
   打包 Bun CLI 中 Solid 转换不可靠，signal 更新不触发重渲染，直接阻碍 TUI 插件生态发展。
   https://github.com/anomalyco/opencode/issues/39986

4. **#47665 V2 CLI：`--server` 模式下位置参数目录仍被本地解析**（7 评论）
   远程-only 路径触发本地 ENOENT，影响远程工作流用户。
   https://github.com/anomalyco/opencode/issues/47665

5. **#55268 big-pickle 模型推理内容泄漏到可见文本**（5 评论）
   模型推理中出现字面 `</think>` 标签导致后续 CoT 全部走 content 通道，属于正确性/隐私双重风险。
   https://github.com/anomalyco/opencode/issues/55268

6. **#54371 ACP：slash 命令执行但输出不回传**（5 评论 / 5 👍）
   JetBrains Rider 中 ACP agent 的 slash 命令输出不可见，影响 IDE 集成体验。
   https://github.com/anomalyco/opencode/issues/54371

7. **#37844 V2 核心：缓存 Location 导致 MCP 子进程成倍堆积**（5 评论）
   单个服务下观测到约 10 组重复 MCP 进程组，性能问题已复现，值得运维侧关注。
   https://github.com/anomalyco/opencode/issues/37844

8. **#62628 Plan agent 自动压缩后死循环，`opencode run` 永不退出**（2 评论）
   压缩→Plan 模式提醒→再压缩的循环在 150 秒内触发多次，已复现，属 CLI 自动化场景的阻断性 bug。
   https://github.com/anomalyco/opencode/issues/62628

9. **#62634 scoped npm 包 TUI 插件首次访问 storage 即崩溃**（4 评论）
   storage key 直接拼接原始插件 ID 导致 "Invalid storage segment"，新报但影响插件分发。
   https://github.com/anomalyco/opencode/issues/62634

10. **#56297 Windows 下 winget 无法安装 OpenCode**（3 评论 / 7 👍）
    `winget install Anomaly.OpenCode` 找不到包，官方安装渠道失效，获多位用户确认。
    https://github.com/anomalyco/opencode/issues/56297

其他值得关注：#62415（agent markdown 带 `name` 时 permissions 失效，已修待关闭）、#61774（移动端上滑即回弹到底部，已修待关闭）、#52537（双击 Esc 撤回消息的 Claude Code 风格功能请求）。

## 4. 重要 PR 进展

1. **#62662 Console 事件监听唤醒 session**（已合并）
   session 可在其监听的 Slack 线程 / GitHub PR / commit / Actions 事件发生时自动唤醒，是 Console 集成的重要能力。
   https://github.com/anomalyco/opencode/pull/62662

2. **#62667 桌面端不再因登录 shell 探测阻塞启动**
   主进程启动时执行 `$SHELL -il -c "env -0"` 可能卡住，改为不阻塞后台服务启动。
   https://github.com/anomalyco/opencode/pull/62667

3. **#62176 Code Mode 目录更新瘦身与稳定化**
   工具目录共享 2k token 预算导致每次更新重述全量（~2.2k tokens），重写为增量稳定更新，显著降低 token 消耗。
   https://github.com/anomalyco/opencode/pull/62176

4. **#62664 桌面端新增 `/rename` slash 命令**
   补齐 TUI 已有能力，支持带参数重命名 session。
   https://github.com/anomalyco/opencode/pull/62664

5. **#62615 Code Mode：延迟已知工具调用的搜索索引创建**
   修复参数求值触发索引构建的性能问题（对应 #62614）。
   https://github.com/anomalyco/opencode/pull/62615

6. **#62141 Shell 执行状态更清晰：`Exit code: N`、超时时长、zsh 未匹配 glob 透传**
   提升模型对 shell 结果的理解质量。
   https://github.com/anomalyco/opencode/pull/62141

7. **#62654 / #62665 / #62660 统一产品导航**
   opencode.ai、docs、Data、Console、status 页共享同一 nav 与 logo 菜单，后续两个 PR 修复 chevron 样式与 light-dark() 颜色。
   https://github.com/anomalyco/opencode/pull/62654

8. **#62610 README 重写对齐 landing page**
   由 opencode-agent[bot] 完成，含终端截图替换与 raw-view 彩蛋。
   https://github.com/anomalyco/opencode/pull/62610

9. **#62661 文档新增：杀毒软件 HTTPS 扫描说明与 W-9 税表**
   企业采购与安全审计场景的配套文档。
   https://github.com/anomalyco/opencode/pull/62661

10. **#60957 nix node_modules hash 自动更新**（bot 维护）
    nix 用户的持续构建保障。
    https://github.com/anomalyco/opencode/pull/60957

另有一批 10 月旧 PR 被 automated-pr-cleanup 关闭（如 #53796 插件入口解析、#53752 跨浏览器 session 发现），属例行清理。

## 5. 功能需求趋势

- **Claude Code 生态兼容**：hooks 兼容（#12472）、Esc 撤回消息（#52537）、agent 文件的 `name` 字段兼容（#62415）——迁移用户期望“无缝切换”。
- **TUI 插件生态成熟度**：TSX 响应式渲染（#39986）、npm 包加载与 storage（#62634、#62666）是插件作者的集中痛点。
- **IDE / ACP / 远程集成**：ACP slash 命令输出（#54371）、`--server` 远程路径（#47665）、集成启动器的模型前缀（#62417）。
- **桌面端体验打磨**：session 按项目分组、`/rename`、归档快捷键、菜单 i18n（#61252 的 `{{path}}` 模板泄漏）。
- **API 可观测性**：session 列表返回最后一条消息时间戳（#62655）等元数据增强请求。

## 6. 开发者关注点

- **Token / 推理流正确性**：big-pickle 的 CoT 泄漏（#55268）、deepseek-v4.1-flash 的 reasoning/text 分类混乱（#54861）、GLM-5.3-Flash 波兰语文本损坏（#62411）——内置 provider 的流式解析是高频 bug 来源。
- **资源与性能**：MCP 子进程堆积（#37844）、Windows ResizeObserver 风暴（#62206）、Code Mode token 浪费（#62176、#62615）。
- **权限模型可预期性**："Allow always" 无法关闭持久化、静默覆盖 `ask` 规则（#62432），安全敏感团队呼声明确。
- **稳定性阻断项**：Plan agent 压缩死循环（#62628）、思考中途静默停止（#62323）、winget 安装失效（#56297）。
- **分发渠道**：winget 包缺失直接影响 Windows 新用户获取，建议优先修复。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-11-08

## 📌 今日速览

Qwen Code 发布 **v0.27.0** 正式版。社区焦点集中在 **Managed Agent 的性能与容量治理**（wenshao 连发多项 SQL 优化与闲置 Session 停驻设计提案）以及 **CI 安全加固**（外部 PR 用一次性隔离 Runner、CVE 审计持续失败）。Web Shell 生态活跃，多项 UI 增强与轮询优化同步推进。

---

## 🚀 版本发布

**v0.27.0**（[Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.27.0)）
- test(interactive): 前台 shell 帧改为轮询而非快照（#16455，@yiliang114）
- test(managed-agent): 生命周期测试调整
- 另有 nightly 版本 v0.26.9-nightly.20261106 同步滚动

---

## 🔥 社区热点 Issues

1. **[#14724](https://github.com/QwenLM/qwen-code/issues/14724) Main CI 失败：Managed Agent gate 无测试识别**（OPEN，225 评论）— 长期困扰的 CI 稳定性问题，评论数遥遥领先，反映 managed-agent 测试基础设施亟待修复。

2. **[#13078](https://github.com/QwenLM/qwen-code/issues/13078) 每日依赖 CVE 审计失败**（OPEN，44 评论）— 持续超过一个月未解决，可能存在高危漏洞，安全风险需尽快处置。

3. **[#16514](https://github.com/QwenLM/qwen-code/issues/16514) 用一次性 Runner 隔离外部 PR 的 CI**（P1，11 评论）— 昨日新提。外部 PR 可执行贡献者控制的 CI 脚本，自托管 Runner 存在凭证泄露风险，安全治理优先级高。

4. **[#15597](https://github.com/QwenLM/qwen-code/issues/15597) Headless 模式下 auto-memory 永远无法写入**（P1，9 评论）— 非交互 `-p` 模式中隐式 deny 覆盖了 memory agent 的 scoped allow，内存索引始终为空却仍消耗 token，是核心功能级 bug。

5. **[#16320](https://github.com/QwenLM/qwen-code/issues/16320) Managed Agent 控制面 SQL 随 Session 数线性增长**（P2，5 评论）— 常驻 Session 的租约续期导致数据库负载膨胀，与容量治理议题（#15082）直接相关。

6. **[#12856](https://github.com/QwenLM/qwen-code/issues/12856) Aux-model 选择器持久化泄露 NUL 分隔的 baseUrl 凭证**（P2，5 评论）— baseUrl 中嵌入的 userinfo 凭证被所有公开面原样输出，属 credential-security 问题。

7. **[#16355](https://github.com/QwenLM/qwen-code/issues/16355) Web Shell sidebar=false 时空闲页仍每 5 秒轮询全部 workspace**（P1，4 评论）— 明显的资源浪费，修复 PR #16550 已在同日提交。

8. **[#15875](https://github.com/QwenLM/qwen-code/issues/15875) SDK stream-json 中 text 快照 thinking 后变更 message id**（P2，4 评论）— 影响 SDK 客户端流式消费语义，破坏消息流一致性。

9. **[#15325](https://github.com/QwenLM/qwen-code/issues/15325) 超过 --max-session-turns 后返回成功但重复上一轮答案**（P2，3 评论）— SDK 场景下的静默错误，无任何提示，ready-for-agent 待修复。

10. **[#15082](https://github.com/QwenLM/qwen-code/issues/15082) Managed Agent 容量与闲置回收模型设计**（P2，4 评论）— 缺乏 Runtime 数量、内存上限、闲置回收的准入控制规范，是多 agent 路线图上的关键设计议题。

---

## 🔀 重要 PR 进展

1. **[#16414](https://github.com/QwenLM/qwen-code/pull/16414)** MySQL 连接池默认启用 prepared statement 缓存（wenshao，已关闭）— 直接缓解 #16320 的控制面 SQL 开销。

2. **[#16564](https://github.com/QwenLM/qwen-code/pull/16564)** 闲置常驻 Hosted Session “停驻”设计提案（中英双语，纯文档）— 对应 #15082 容量治理路线。

3. **[#16500](https://github.com/QwenLM/qwen-code/pull/16500)** Managed Agent 增加 Skills 与 MCP 自助服务（doudouOUC）— 让托管会话可自主配置扩展能力。

4. **[#16475](https://github.com/QwenLM/qwen-code/pull/16475)** 持久化 Session 与执行诊断（doudouOUC）— 记录上下文、模型统计、工具活动及子调用关系，提升可观测性。

5. **[#16550](https://github.com/QwenLM/qwen-code/pull/16550)** 修复 sidebarless 模式 live-state 轮询范围（yiliang114）— 只轮询实际展示的 workspace，修复 #16355。

6. **[#16462](https://github.com/QwenLM/qwen-code/pull/16462)** CI failure patrol 迁移至 ECS 并单独计时沙箱镜像拉取（wenshao）— 让分类器预算归模型独享，CI 提效。

7. **[#16324](https://github.com/QwenLM/qwen-code/pull/16324)** Managed 会话复用宿主 shell 外壳（yiliang114）— 消除双重 UI 层，统一 Web Shell 视觉。

8. **[#15880](https://github.com/QwenLM/qwen-code/pull/15880)** PR review 干净后自动进入深度验证轮（wenshao）— 自动化维护者验证流程，加速合入。

9. **[#15473](https://github.com/QwenLM/qwen-code/pull/15473)** Windows 桌面端更新前先停掉捆绑 runtime（BigDaddy1337）— 修复更新时 Node 二进制被占用导致的失败。

10. **[#16438](https://github.com/QwenLM/qwen-code/pull/16438)** 声明 model.chatCompression 配置项并允许关闭图片载荷驱逐（2SinceJuly）— 补齐配置文档化，阈值设 0 可完全保留历史图片。

---

## 📈 功能需求趋势

- **Managed Agent 规模化治理**：容量模型、闲置回收、SQL/内存开销是当前最密集的设计讨论方向（#15082、#16320、#16564）。
- **Web Shell 体验完善**：Split View 滚动按钮（#16569）、模型 Provider 徽章（#16562）、MCP 工具卡片展开（#15280）、内联重命名（#14373）等 UI 需求活跃。
- **SDK / 非交互模式健壮性**：stream-json 语义（#15875、#15325）、headless auto-memory（#15597）表明 SDK 集成场景成为质量焦点。
- **安全与 CI 基建**：隔离外部 PR CI（#16514）、CVE 审计（#13078）、凭证泄露（#12856）持续占据优先级。
- **配置与内存可观测性**：/memory show（#16517）、--config-dir（#10984）、32K 上下文自定义 provider 指引（#12886）。

---

## ⚠️ 开发者关注点

1. **CI 稳定性是最大痛点**：多条 CI 失败 bot issue 长期挂起（#14724 已 225 评论），E2E 测试抖动（#16046、#15185）频繁。
2. **Headless/SDK 模式功能不完整**：auto-memory 写入被阻、超限后静默返回旧答案，自动化管线用户受影响最大。
3. **资源开销**：Web Shell 空闲轮询、控制面 SQL 膨胀，部署密度高的用户对性能回归敏感。
4. **安全债**：凭证经 baseUrl 泄露、外部 PR 可触达自托管 Runner，建议尽快升级并关注 v0.27.x 后续补丁。

---

*数据来源：github.com/QwenLM/qwen-code · 统计窗口：过去 24 小时*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*