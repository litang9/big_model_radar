# AI CLI 工具社区动态日报 2026-09-28

> 生成时间: 2026-09-27 23:01 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告（2026-09-28）

## 1. 生态全景

AI CLI 工具已从单轮命令行助手全面演进为覆盖 CLI、Desktop、SDK/Headless、MCP 生态的完整开发平台。当前生态呈现明显的“能力扩张后收紧质量”阶段特征：各工具在多 Agent、Workspace 持久化、事件驱动等高阶能力上加速布局，但稳定性、安全边界和资源管理问题集中爆发。安全成为今日最强信号——Gemini CLI 单日提交 4 个安全 PR，Qwen Code、OpenCode 均暴露凭据/权限类漏洞。版本迭代节奏分化明显：OpenAI Codex 单日发 6 个 alpha，而 Claude Code、Gemini CLI、OpenCode 零发布，将精力投入 issue 治理与安全加固。

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | PR 动态 | Release | 今日焦点 |
|---|---|---|---|---|
| **Claude Code** | 10（7 个被 stale 关闭） | 3（低活跃） | 无 | Stale 关闭潮引发社区信任担忧 |
| **OpenAI Codex** | 10（#48074 达 39 评论/72👍） | 10（copyberry 高频合入） | **6 个 alpha** | Windows/Linux 桌面端回归集中爆发 |
| **Gemini CLI** | 10（#22323 13 评论） | 10（含 4 个安全 PR） | 无 | 安全加固 + Subagent 可靠性 |
| **Copilot CLI** | 10（#179 达 43👍） | 1（近乎为零） | 1（v1.0.89-5） | 权限白名单需求 + 吸引 Claude 迁移用户 |
| **Qwen Code** | 10（#12380 36 评论） | 10 | 无 | Managed Agent 分阶段架构密集推进 |
| **OpenCode** | 10（#32157 达 84👍） | 10（多为 stale 清理） | 无 | Go 订阅认证故障 + v2 迁移阵痛 |
| **Kimi Code CLI** | — | — | — | 无活动 |

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **权限分级与白名单** | Copilot（#1973 👍29、#179 👍43）、Claude Code（#76238、#76490）、Gemini CLI（#22672）、OpenCode（#49948）、Qwen Code（PR #12875） | 只读操作免确认、可配置工具白名单、fail-closed 模式——生态最普适的痛点 |
| **沙箱安全与一致性** | Codex（#25590 UI 与实际沙箱不符）、Gemini CLI（#19873 零依赖沙箱）、Claude Code（#93845 WSL2 bwrap） | 沙箱状态可信、跨平台可用 |
| **会话/上下文管理语义** | Claude Code（#80427 fork）、OpenCode（#32157 queue/steer/break，84👍）、Copilot（#1697 分叉）、Codex（#48067 JSONL 损坏） | 会话恢复、分叉、中断语义需明确规范 |
| **Headless/SDK 自动化可靠性** | Claude Code（#76185 内存泄漏 10-15GB、#76239 MCP 回归）、Codex（#20312 事件驱动唤醒） | CI/长驻 Agent 场景的资源与正确性 |
| **桌面端稳定性** | Codex（榜首多个桌面 issue）、Qwen Code（#12826/#12874）、OpenCode（#37495 WAL 15GB）、Copilot（#4905） | Desktop 产品线普遍不成熟 |
| **MCP 生命周期管理** | Codex（PR #48783）、OpenCode（#51003 进程泄漏）、Claude Code（#76239） | 连接复用、进程清理、启动竞态 |
| **凭据与遥测合规** | Qwen Code（#12856 凭据明文、#12844 遥测违背设置）、Gemini CLI（#26525、PR #29523） | 企业级安全底线 |

## 4. 差异化定位分析

- **Claude Code**：定位企业级 Agent 平台（SDK/Headless/Desktop 全线），但今日暴露治理短板——高价值已复现 bug 被 stale 批量关闭，官方投入似乎转向遥测防篡改（PR #97688）等企业功能。目标用户为深度自动化与 CI 场景，风险也最集中于此。
- **OpenAI Codex**：迭代最快（6 alpha/日 + 机器人高频合入），押注 Guardian 审查与 MCP 深化，但 0.157.x/26.924 双平台桌面回归显示“快发”与“质量”失衡。技术路线为 Rust CLI + Electron 桌面 + daemon 化。
- **Gemini CLI**：最重视安全合规（4 安全 PR/日），主攻 Subagent 体系与代码智能（AST 感知），配合 Gemini 3 原生 bash 能力做差异化沙箱方案。
- **Copilot CLI**：依托 GitHub 生态做“迁移友好”策略（支持 `.claude/rules`），外部贡献几乎为零、功能靠官方 Release 交付——闭源式开发节奏。BYOK/本地模型是差异化方向但体验断档。
- **Qwen Code**：最激进的架构投资——Managed Agent 双路径架构派生十余 Stage 子任务，TS/Java 双栈对齐，面向多 Agent Workspace 协作，本地模型（Ollama）兼容是独特卖点。
- **OpenCode**：开源中立路线（多 provider、插件生态），但 v2 迁移成本（LSP 移除、语义变更）与 Go 订阅计费故障显示商业化配套滞后于能力扩张。

## 5. 社区热度与成熟度

- **热度第一梯队**：Codex（互动量最高，72👍/39评论级 issue）与 OpenCode（84👍 的提案）社区参与度最强。
- **快速迭代期**：Codex（日发 6 版）、Qwen Code（架构密集立项）、Gemini CLI（安全 sprint）。
- **成熟平台期**：Claude Code 与 Copilot CLI——功能完备但外部 PR 活跃度低，Claude Code 处于 issue 清理期，社区信任度承压。
- **成熟度短板共性**：所有推出 Desktop 的工具（Codex、OpenCode、Qwen、Copilot）桌面端问题占比均显著偏高，Desktop 是全行业质量洼地。Kimi Code CLI 无活动，竞争力掉队。

## 6. 值得关注的趋势信号

1. **安全从“功能”变“底线”**：Gemini CLI 单日 4 个安全 PR、Qwen 凭据泄漏与遥测违规、Codex 沙箱降级、OpenCode 绕权——提示开发者：**升级前审查安全 changelog，使用内嵌凭据的配置需立即自查**。
2. **Stale 自动化治理的信任危机**：Claude Code 已复现 bug 被 stale 关闭、用户被迫重开（#93845），OpenCode 批量关闭 PR。issue 数据的“表面健康度”与真实质量脱钩，选型时应看 open issue 的复现标签而非关闭率。
3. **向长驻、事件驱动 Agent 演进**：Codex #20312（事件唤醒）、Qwen Managed Agent、OpenCode queue/steer 语义、Claude SDK headless——回合制 CLI 正向常驻工作区协作范式迁移，但内存泄漏/进程清理问题表明配套工程能力尚未跟上。
4. **Headless/CI 是高价值但最薄弱场景**：Claude Code 的 OOM 与静默丢工具、OpenCode 的 MCP 进程泄漏，对自动化流水线风险最高，建议 CI 中加资源监控与超时熔断。
5. **生态互操作性成为竞争武器**：Copilot 直接兼容 `.claude/rules`，各家争相对标 Claude Code 的权限模型——Claude Code 事实上成为行业交互范式的定义者。
6. **开发者行动建议**：Windows/WSL2 用户暂缓 Codex 0.157.x 升级并验证沙箱权限；重度确认流程用户关注 Copilot 白名单进展（#179 已 43👍）；依赖 Subagent 的生产用户追踪 Gemini #22323/#21409；v2/大版本迁移前务必核对破坏性变更清单。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-09-28，来源：anthropics/skills）

> 说明：本批 PR 数据中评论数均缺失（undefined），以下排行综合 Issue 关联度、更新活跃度与主题热度综合评估。

---

## 一、热门 Skills / PR 排行

| # | PR / Skill | 功能 | 讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | [#1298 fix(skill-creator)](https://github.com/anthropics/skills/pull/1298) | 修复 skill-creator 触发评估：per-worker 探针竞争、Windows `select()` 失败、运行时错误被误判为非触发 | 关联 [#556](https://github.com/anthropics/skills/issues/556)（eval 触发率 0%）和 [#1383](https://github.com/anthropics/skills/issues/1383)，是社区反映最强烈的 skill-creator 质量链问题核心 | OPEN |
| 2 | [#1742 fix(mcp-builder)](https://github.com/anthropics/skills/pull/1742) | 适配 `mcp>=2.0.0` 的 `streamable_http_client` 重命名及自定义 header 传法 | 对应 Issue #1668；配合 [#1390](https://github.com/anthropics/skills/issues/1390)（evaluation.py 全军覆没 0/N），mcp-builder 是近期修复焦点 | OPEN |
| 3 | [#1792 fix(docx)](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时不再假报成功，并校验修订标记（`w:ins`/`w:del` 等）真正清除 | docx 是使用最广的官方 skill，配套修复还有 [#541](https://github.com/anthropics/skills/pull/541)（w:id 冲突致文档损坏）和 [#1734](https://github.com/anthropics/skills/pull/1734)（孤儿批注检测） | OPEN |
| 4 | [#1703 md2video-audio](https://github.com/anthropics/skills/pull/1703) | Markdown → Marp 幻灯片 → 带真人配音的 MP4 视频，零成本方案 | 多媒体生成类 skill 的代表，持续更新至 9 月中 | OPEN |
| 5 | [#525 pyxel](https://github.com/anthropics/skills/pull/525) | Python 复古游戏开发：引导实现、无头输入驱动运行、帧检查 | 3 月提交至今 9 月仍有更新，长尾讨论活跃 | OPEN |
| 6 | [#822 AWT (AI Watch Tester)](https://github.com/anthropics/skills/pull/822) | 零代码 E2E 测试生成：给 Claude 视觉 + 浏览器控制 | 测试自动化是 Issue 中高频需求方向（参见 #723 testing-patterns） | OPEN |
| 7 | [#514 document-typography](https://github.com/anthropics/skills/pull/514) | AI 生成文档的排版质控：孤行、寡段、编号错位 | 切中"AI 生成文档排版差"这一普遍痛点 | OPEN |
| 8 | [#83 skill-quality/security-analyzer](https://github.com/anthropics/skills/pull/83) | 元技能：对 skill 做五维质量分析与安全审计 | 与 #492 信任边界议题呼应，元治理方向 | OPEN |

---

## 二、社区需求趋势（来自 Issues）

1. **Skill 安全与信任治理** — [#492](https://github.com/anthropics/skills/issues/492)（43 条评论，全站最热）：社区 skill 冒用 `anthropic/` 命名空间构成信任边界漏洞；配套关切包括 [#1394](https://github.com/anthropics/skills/issues/1394)（eval-viewer XSS）和 [#1175](https://github.com/anthropics/skills/issues/1175)（SPO 权限逻辑写入 SKILL.md 的安全疑虑）。
2. **组织级分发与共享** — [#228](https://github.com/anthropics/skills/issues/228)：期望 org 内 skill 库 / 分享链接，替代手动传 `.skill` 文件。
3. **Skill 评估与可观测性** — [#556](https://github.com/anthropics/skills/issues/556)、[#1383](https://github.com/anthropics/skills/issues/1383)：触发评估不可靠（0% 触发率、Windows 兼容、静默基准失败）。
4. **Token 效率 / 上下文管理** — [#1487](https://github.com/anthropics/skills/issues/1487)（claude-api 一次性注入 ~156k token）、[#1329](https://github.com/anthropics/skills/issues/1329)（compact-memory 紧凑 agent 状态记法）、[#189](https://github.com/anthropics/skills/issues/189)（插件重复安装浪费上下文）。
5. **输出质量工作流** — [#1385](https://github.com/anthropics/skills/issues/1385)（三段式推理质量门 Pipeline）、[#412](https://github.com/anthropics/skills/issues/412)（agent-governance 安全模式）。
6. **skill-creator 本身需现代化** — [#202](https://github.com/anthropics/skills/issues/202)：教程式文案损害 token 效率。
7. **基础设施兼容** — [#29](https://github.com/anthropics/skills/issues/29)：AWS Bedrock 支持困惑。

---

## 三、高潜力待合并 Skills（活跃 OPEN，近期可能落地）

- [#1742 mcp-builder 修复](https://github.com/anthropics/skills/pull/1742) — 9/27 仍在更新，有明确关联 Issue #1668，最接近落地。
- [#1298 skill-creator 触发评估修复](https://github.com/anthropics/skills/pull/1298) — 直接回应多个高热 Issue，修复面广。
- [#1792 docx 超时/校验修复](https://github.com/anthropics/skills/pull/1792) — 9/25 更新，修复目标明确、易于验收。
- [#1245 notion-spec-to-implementation + quantitative-resume-auditor](https://github.com/anthropics/skills/pull/1245) — 9/24 仍在推进，覆盖产品工作流方向。
- [#723 testing-patterns](https://github.com/anthropics/skills/pull/723) — 9/21 更新，与社区测试自动化需求高度契合。
- [#1681 skill-creator package_skill.py 修复](https://github.com/anthropics/skills/pull/1681) — 9/27 更新，小而确定的工程修复。

---

## 四、生态洞察（一句话）

**社区最集中的诉求是"可信与可控"：既要解决 skill 命名空间冒用、XSS、权限边界等安全问题，也要修复 skill-creator/mcp-builder 的评估工具链并压缩 skill 的上下文开销——即让 Skills 生态在规模化分发前先变得安全、可度量、token 高效。**

---

# Claude Code 社区动态日报 — 2026-09-28

## 📌 今日速览

过去 24 小时无新版本发布。Issue 活动集中在旧 bug 的批量清理：大量 7 月创建的 bug 被标记 stale 并关闭，包括多个高价值、已复现的成本与权限类问题，社区可能需要关注这些 bug 是否被后续跟进。PR 方面活跃度较低，仅 3 个 diff/安全遥测相关 PR 更新。

## 🚀 版本发布

过去 24 小时无新 Release。

## 🔥 社区热点 Issues

1. **#76606 [已关闭] Prompt cache 被长会话中的消息重写失效**
   作者通过对 `/v1/messages` 请求 diff 定位到成本激增根因——Claude Code 重写旧消息导致整个对话被重新处理，直接烧钱。成本类核心问题被 stale 关闭，值得关注是否复发。
   🔗 https://github.com/anthropics/claude-code/issues/76606

2. **#76238 [已关闭] MCP 白名单工具在新会话仍触发权限提示**
   已被标记 `reproduced`（官方复现），3 👍，说明影响面广，但最终仍因 stale 关闭。
   🔗 https://github.com/anthropics/claude-code/issues/76238

3. **#76185 [已关闭] Headless `-p` 会话空闲时内存泄漏至 10–15GB**
   长时间后台 Bash 任务下 RSS 飙升，曾把 18GB 服务器打到 OOM（load 68、SSH 失联）。对 CI/自动化场景是严重风险。
   🔗 https://github.com/anthropics/claude-code/issues/76185

4. **#75794 [已关闭] Plan 模式下模型未经权限删除整个目录（data-loss）**
   标记为 `data-loss` 的模型行为问题，涉及安全底线，即使关闭也值得追踪后续复现报告。
   🔗 https://github.com/anthropics/claude-code/issues/75794

5. **#76239 [已关闭] SDK headless：stdio MCP 启动慢时首轮静默丢失工具（回归）**
   CLI 2.1.144 引入的非阻塞预等待导致单轮会话回归，影响所有 Agent SDK 自动化用户。
   🔗 https://github.com/anthropics/claude-code/issues/76239

6. **#76584 [已关闭] Compaction 摘要将超时命令的部分 stdout 记录为已确认结果**
   长任务超时（exit 143）后，截断输出被当作成功结果写入压缩摘要，可能误导后续会话决策——正确性隐患。
   🔗 https://github.com/anthropics/claude-code/issues/76584

7. **#76490 [已关闭] Windows 盘符路径导致 Bash 权限白名单永不匹配**
   `C:/...` 与 `/c/...` 两种写法均失效，Windows 用户权限配置形同虚设。
   🔗 https://github.com/anthropics/claude-code/issues/76490

8. **#93845 [OPEN] WSL2：read-deny 符号链接指向 /mnt/c 时 bwrap 沙箱全部失败**
   前身 #45122 被 stale 关闭后锁定，但问题在 2.1.268 仍复现，用户被迫重开 issue——反映 stale 机制的问题。
   🔗 https://github.com/anthropics/claude-code/issues/93845

9. **#97058 [OPEN] Desktop：已结束的 Project 线程占用会话配额，新会话被拒**
   9 月 25 日新报，一天内即有互动，Desktop 生命周期管理的新痛点。
   🔗 https://github.com/anthropics/claude-code/issues/97058

10. **#80427 [OPEN] 多终端恢复同一会话时静默 fork 而非 interleave**
    与文档行为不符，2.1.218 仍存在，涉及会话一致性的核心语义。
    🔗 https://github.com/anthropics/claude-code/issues/80427

## 🔧 重要 PR 进展

> ⚠️ 过去 24 小时仅 3 个 PR 更新，如实列出如下：

1. **#97688 [OPEN] sec-default：collector 遥测流穿透用户层级**
   当组织层启用安全默认配置时，用户插件无法丢弃或改写发往 collector 的记录——增强企业级遥测防篡改能力。
   🔗 https://github.com/anthropics/claude-code/pull/97688

2. **#94847 [OPEN] diff：首次编辑仅在确有文件可展示时才打开面板**
   修复对仓库外文件、ignored 文件或其他 worktree 写入时弹出空 "No tracked changes" 面板的问题。
   🔗 https://github.com/anthropics/claude-code/pull/94847

3. **#95587 [CLOSED] diff：恢复会话时面板打开时机与内置面板统一**
   恢复/继续含编辑历史的会话时，diff 面板随宽度确定即打开，`/clear` 后保持，与内置面板行为对齐。
   🔗 https://github.com/anthropics/claude-code/pull/95587

## 📈 功能需求趋势

- **成本控制与 Prompt Cache**：缓存失效、重复处理整段对话的成本异常是持续痛点（#76606）。
- **权限与沙箱可靠性**：MCP 白名单失效、Windows 路径匹配失败、WSL2 bwrap 失败，跨平台权限系统问题集中。
- **Headless / SDK 自动化**：内存泄漏（#76185）、MCP 工具静默丢失（#76239）表明无头模式是高价值但薄弱的场景。
- **Desktop / Cowork 稳定性**：设备桥接失败、会话配额泄漏、Google Drive 受保护路径等问题频发。
- **会话管理语义**：多终端恢复 fork、compaction 摘要准确性等核心会话行为需要更明确的保障。

## ⚠️ 开发者关注点

1. **Stale 关闭潮的隐患**：今日大量带 `has repro` / `reproduced` 标签的 bug 被 stale 关闭（含成本、内存泄漏、数据丢失级问题），且已有用户被迫重开 issue（#93845），社区对问题实际解决存疑。
2. **无头模式的资源与正确性**：长时后台任务下的内存泄漏和超时输出的错误记录，对 CI/自动化流水线风险最高。
3. **Windows / WSL2 仍是二等公民**：盘符路径、/mnt/c 符号链接等平台特有问题修复滞后。
4. **回归管理**：2.1.144 引入的 MCP 预等待回归影响 SDK 用户，提示升级前应检查 changelog 中的行为变更。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 · 2026-09-28

## 📌 今日速览

Codex CLI 密集发布 6 个 alpha 版本（0.159.0-alpha.7~10 及 0.158.0 补丁），迭代节奏明显加快。社区最大的痛点集中在 **Windows 桌面端 0.157.x/26.924 的稳定性回归**（终端窗口闪烁、加载卡死）和 **Linux 桌面端的 SIGCHLD 处理器覆盖问题**——后者已被社区定位到根因。PR 方面，copyberry 机器人高频合入 TUI 打磨、MCP 状态发现和 Guardian 审查改进。

---

## 🚀 版本发布

过去 24 小时发布 6 个 alpha 版本，均为 Rust CLI：

| 版本 | 说明 |
|---|---|
| [rust-v0.159.0-alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.10) | 最新 alpha，0.159 主线持续推进 |
| [rust-v0.159.0-alpha.9 / -8 / -7](https://github.com/openai/codex/releases) | 0.159 系列快速迭代 |
| [rust-v0.158.0-alpha.15.3 / -15.2](https://github.com/openai/codex/releases) | 0.158 稳定线补丁，可能包含 Linux 桌面端卡死问题的修复 |

单一版本未附详细 changelog，但从 PR 流向看主要覆盖 TUI 渲染、MCP、Guardian 及终端兼容性修复。

---

## 🔥 社区热点 Issues（Top 10）

**1. [#48074](https://github.com/openai/codex/issues/48074) — Windows 安装 daemon 后请求期间终端窗口反复闪烁**
热度最高（39 评论 / 72 👍）。影响所有 Windows CLI 用户的核心可用性，与 #48325、#48467 疑似同根因，0.157.x 的 daemon 化改造引入的回归。

**2. [#48554](https://github.com/openai/codex/issues/48554) — Linux 桌面端 Electron 覆盖 libuv 的 SIGCHLD 处理器**
技术含量最高的报告：空 SIGCHLD 处理器导致子进程永不回收，进而引发 shell 环境超时、"Git is unavailable"、线程无法加载等连锁故障。#48618 已验证保留 libuv 处理器可修复。

**3. [#48419](https://github.com/openai/codex/issues/48419) — Linux 桌面端打开本地线程挂起 120 秒超时**
26.924 版本 hydration 阶段不发 `thread/resume`，与 #48535 一致；社区已确认**回滚到 26.917.71314 可恢复**。

**4. [#47855](https://github.com/openai/codex/issues/47855) — Windows 桌面端第二条消息永久挂起**
会话第一条消息正常、第二条无法到达 app-server，阻塞正常对话流程的严重 bug。

**5. [#48463](https://github.com/openai/codex/issues/48463) — Windows 更新后卡在加载屏（app_start 引导超时）**
26.924.2738.0 版本更新后 codex-home 请求超时，多网络环境可复现，疑为版本更新流程缺陷。

**6. [#43015](https://github.com/openai/codex/issues/43015) — 63.8 MB 图片历史请求 + WebSocket 回退导致的长时间卡顿**
图像辅助编码场景下上下文体积失控，涉及压缩策略与传输层设计的深层架构问题。

**7. [#25590](https://github.com/openai/codex/issues/25590) — UI 显示 Full Access 但实际以 workspace-write 沙箱执行**
**安全相关**：沙箱状态与 UI 不一致，恢复线程时权限被静默降级，值得所有桌面端用户关注。

**8. [#43347](https://github.com/openai/codex/issues/43347) — 关闭最后一个 Browser Use 标签页导致整个应用崩溃**
跨两个版本复现的崩溃，影响 Browser Use 功能可用性。

**9. [#48067](https://github.com/openai/codex/issues/48067) — NUL 字节损坏 JSONL 导致会话历史不可读**
长期会话数据完整性问题，本地历史文件被 NUL 填充后无法解析，且无恢复路径。

**10. [#20312](https://github.com/openai/codex/issues/20312) — 功能需求：原生事件驱动的会话唤醒原语**
高价值架构提案：当前 Codex 是回合驱动的，无法在外部事件（文件变更、MCP 推送等）到达时唤醒空闲会话，是实时响应场景的关键缺失。

---

## 🔀 重要 PR 进展（Top 10）

**1. [#48799](https://github.com/openai/codex/pull/48799) — 修复 Windows 终端 SGR 鼠标上报**
直接回应 #48030（Rider 终端输出原始 `[M...` 序列），通过单独请求 SGR 编码让 ConPTY 正确翻译鼠标事件。

**2. [#48783](https://github.com/openai/codex/pull/48783) — 单服务器 MCP 状态发现 + 线程连接复用**
检查单个 MCP 服务器不再需要全量发现，降低 MCP 运维开销。

**3. [#48796](https://github.com/openai/codex/pull/48796) — Guardian 熔断中断的可选结构化错误**
为 Guardian 拒绝限制中断添加结构化错误，opt-in 设计兼容旧客户端。

**4. [#48779](https://github.com/openai/codex/pull/48779) — 父级压缩时保留独立 Guardian 历史**
保证审查证据在 compaction、resume、rollback 后不丢失，配合 #48725（保留 Code Mode 已确认消息）完善 Guardian 上下文链。

**5. [#48805](https://github.com/openai/codex/pull/48805) — 模态框打开时允许滚动会话记录**
修复"Implement this plan?"提示阻断滚动，用户决策前无法回看长计划内容的 UX 痛点。

**6. [#48772](https://github.com/openai/codex/pull/48772) — 修复长符号链接路径下的 Unix socket 连接**
控制 socket 路径超出 Unix 限制时自动解析并重试，提升 Linux 兼容性。

**7. [#48761](https://github.com/openai/codex/pull/48761) — 紧凑终端活动显示隐藏输出行数**
折叠输出改为 `+ 5 lines (ctrl+t to expand)` 形式，提升可读性。

**8. [#48757](https://github.com/openai/codex/pull/48757) + [#48754](https://github.com/openai/codex/pull/48754) — TUI 视觉打磨**
状态 shimmer 动画对齐桌面端节奏；`/status` 去边框并换行长值，修复窄终端截断。

**9. [#48686](https://github.com/openai/codex/pull/48686) — 从 info 日志移除 WebSocket 头和工具载荷**
日志脱敏与降噪，保留连接 URL、工具名、线程 ID 等关键信息。

**10. [#48727](https://github.com/openai/codex/pull/48727) + [#48724](https://github.com/openai/codex/pull/48724) — 修复 Linux 测试 ETXTBSY 竞态**
集中化可执行 fixture 创建，解决并发测试继承可写描述符导致的 ETXTBSY，提升 CI 稳定性。

---

## 📈 功能需求趋势

1. **桌面端稳定性是当前最大诉求** — 26.924 版本在 Windows/Linux 双平台均出现严重回归，Issues 榜首几乎被占据
2. **沙箱与权限模型** — UI 与实际沙箱状态不一致（#25590）、Browser Use 权限校验失败（#48573）引发信任担忧
3. **事件驱动 / 常驻 Agent** — #20312 的会话唤醒原语需求，反映社区向长驻实时 Agent 演进的期待
4. **终端兼容性** — JetBrains IDE 集成终端、Windows Terminal、PowerShell 下的 TUI 表现持续报障
5. **上下文与数据管理** — 图片历史体积失控（#43015）、JSONL 损坏（#48067）、git worktree 下 hooks 配置失效（#27133）

---

## ⚠️ 开发者关注点

- **Windows 用户建议暂缓 0.157.x 升级**：终端窗口闪烁、复制粘贴失效等多重回归未解
- **Linux 桌面端 26.924 存在系统性缺陷**：SIGCHLD 覆盖 + hydration 挂起，临时方案是回滚 26.917.71314
- **沙箱降级问题需自查**：使用 Full Access 的用户应验证线程恢复后的实际权限
- **积极信号**：copyberry 机器人以极高频率合入修复，PR#48799 已直接针对 Windows 终端问题，修复落地速度可期
- **Guardian/MCP 生态持续深化**：多个 PR 完善审查上下文保留与 MCP 连接效率，表明这是内部投入的重点方向

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-28

## 📌 今日速览

今日无新版本发布。社区焦点集中在**安全加固**：4 个新提交的 PR 集中修复了路径逃逸、环境变量泄露等安全问题（含一个 p1 级 checkpoint 路径穿越漏洞）。Issue 侧，子代理（Subagent）的稳定性与状态误报仍是讨论最热烈的 topic，多条 p1 级 Bug 得到更新。

---

## 🔥 社区热点 Issues（Top 10）

**1. #22323 — Subagent 达到 MAX_TURNS 后误报 GOAL 成功**（p1）
子代理在触及轮次上限、未做任何分析时仍报告 `success`/`GOAL`，掩盖了中断事实。这是可观测性层面的严重误报，13 条评论为当日最多。
https://github.com/google-gemini/gemini-cli/issues/22323

**2. #19873 — 零依赖 OS 沙箱 + 执行后意图路由**（p2）
利用 Gemini 3 原生 bash 能力（grep/sed/awk 链式操作）的同时保证安全，方向性很强的大型 enhancement，9 条评论。
https://github.com/google-gemini/gemini-cli/issues/19873

**3. #21409 — Generalist agent 挂起**（p1，👍8）
主代理委派给 generalist agent 后永久挂起，连建文件夹都会卡住 1 小时。8 个 👍 反映影响面较广。
https://github.com/google-gemini/gemini-cli/issues/21409

**4. #22745 — AST 感知的文件读取/搜索/代码库映射 EPIC**（p2）
评估 AST 工具能否精确读取方法边界、减少 token 噪声，是代码理解能力的重要演进方向。
https://github.com/google-gemini/gemini-cli/issues/22745

**5. #26525 — Auto Memory 确定性脱敏 + 减少日志**（p2，安全）
当前脱敏发生在内容已进入模型上下文之后，存在密钥泄露风险，配合 #26522/#26523 组成 Auto Memory 质量问题系列。
https://github.com/google-gemini/gemini-cli/issues/26525

**6. #21968 — Gemini 不会主动使用 skills 和 sub-agents**（p2）
即使任务高度相关，模型也不会自主调用自定义技能，需显式指令，反映调度策略问题。
https://github.com/google-gemini/gemini-cli/issues/21968

**7. #22186 — get-shit-done output hook 导致崩溃**（p1）
在输出用户摘要时反复崩溃，直接影响可用性。
https://github.com/google-gemini/gemini-cli/issues/22186

**8. #21983 — browser subagent 在 Wayland 下失败**（p1）
Linux Wayland 环境浏览器子代理直接失败，影响 Linux 桌面用户。
https://github.com/google-gemini/gemini-cli/issues/21983

**9. #24246 — 超过 128 个工具时触发 400 错误**（p2）
工具数量膨胀场景下模型 API 报错，需更智能的工具范围裁剪。
https://github.com/google-gemini/gemini-cli/issues/24246

**10. #29524 — Antigravity 付费账号显示"不符合条件"**（新 Issue）
付费 Google AI Pro 用户无法登录 Antigravity，今日新报，账号/订阅链路问题。
https://github.com/google-gemini/gemini-cli/issues/29524

---

## 🔧 重要 PR 进展（Top 10）

**安全修复系列（今日新增，值得关注）**：

1. **#29521** [p1] 修复 checkpoint tag 路径穿越（`x/../../secret` 可逃逸 checkpoint 目录）— https://github.com/google-gemini/gemini-cli/pull/29521
2. **#29522** 修复 glob 工具：绝对路径 pattern 可忽略已验证的搜索目录（如读取 `/etc/*.conf`）— https://github.com/google-gemini/gemini-cli/pull/29522
3. **#29523** 外部安全检查器以最小环境变量运行并限制输出上限，防止 `GEMINI_API_KEY` 泄露 — https://github.com/google-gemini/gemini-cli/pull/29523
4. **#29525** a2a-server 不再从请求的 agentSettings 推导工作区信任，堵住信任注入 — https://github.com/google-gemini/gemini-cli/pull/29525

**功能与修复**：

5. **#29404** 新增 `gemini models list` 子命令（支持 JSON 输出），便于集成工具发现可用模型 — https://github.com/google-gemini/gemini-cli/pull/29404
6. **#29411** `--resume` 裸参数改为恢复**最近活跃**而非最近创建的会话，修复恢复到旧 spike 会话的问题 — https://github.com/google-gemini/gemini-cli/pull/29411
7. **#29407** 修复 JSON 序列化将重复 OpenTelemetry 数组误判为 `[Circular]`，改用祖先路径追踪 — https://github.com/google-gemini/gemini-cli/pull/29407
8. **#29294** [已关闭] 修复后台命令执行时终端闪烁/撕裂（stdout 争用 + 焦点问题）— https://github.com/google-gemini/gemini-cli/pull/29294
9. **#29292** [已关闭] checkpoint JSON 的 `history` 非数组时校验，防止 `/resume` 崩溃 — https://github.com/google-gemini/gemini-cli/pull/29292
10. **#29293** [已关闭] p1 级修复（#1578）— https://github.com/google-gemini/gemini-cli/pull/29293

---

## 📈 功能需求趋势

1. **子代理体系成熟化**：Subagent 是绝对主线 — 挂起修复（#21409）、状态准确上报（#22323）、自主调度（#21968）、轨迹可分享（#22598）、本地子代理 Sprint（#20195）形成完整 workstream。
2. **安全与沙箱**：bash 原生能力沙箱化（#19873）、Auto Memory 脱敏（#26525）、破坏性命令防护（#22672），加上今日 4 个安全 PR，安全投入明显加码。
3. **代码智能**：AST 感知读取/搜索（#22745、#22746）、"Tactful Extraction" 省 token 手术式读取（#19561）。
4. **任务管理重构**：用持久化文件 CRUD 替代上下文内 WriteToDo（#18836、#21000），对抗 context rot。
5. **终端渲染性能**：resize 无闪烁（#21924）等 Ink 渲染优化。

---

## ⚠️ 开发者关注点（痛点）

- **子代理可靠性**：挂起、误报成功、不主动调用是三大高频抱怨，且 `/bug` 报告不含子代理上下文（#21763），排障困难。
- **上下文/token 成本**：大文件读取"灌水"上下文（+15k tokens/turn），工具数量超限即 400。
- **临时文件污染**：模型在随机位置生成编辑脚本，增加 commit 清理负担（#23571）。
- **配置生效问题**：settings.json 覆盖（如 maxTurns）被 Browser Agent 完全忽略（#22267）。
- **交互式命令卡死**：创建 vite app 等交互式 prompt 导致 CLI 卡住（#22465）。
- **会话恢复体验**：`--resume` 选择逻辑与 checkpoint 损坏容错近期均有修复落地。

> 💡 **总体判断**：项目处于"能力扩张后收紧安全与可靠性"阶段，今日安全 PR 密集提交值得升级前留意；依赖子代理工作流的生产用户建议关注 #22323/#21409 的修复进展。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-09-28** | 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)

---

## 📌 今日速览

昨日发布 **v1.0.89-5**，带来三项体验改进：表单输入支持鼠标左键点击定位、支持读取 `.claude/rules` 规则文件作为自定义指令（对 Claude Code 迁移用户友好）、侧栏会话新增未读蓝点提示。社区讨论热度最高的话题集中在**权限白名单**（Interactive Mode 工具白名单需求，👍 29）、**BYOK/本地模型切换**以及**长时间会话认证失效**等稳定性问题。

---

## 🚀 版本发布

### v1.0.89-5（[Release](https://github.com/github/copilot-cli/releases)）
- **鼠标交互增强**：`ask_user` 与 elicitation 表单输入框支持左键点击聚焦，光标定位到点击位置
- **规则文件兼容**：新增对 `.claude/rules` 目录下 Claude Code 规则文件的支持，可直接作为自定义指令
- **会话可读性**：侧栏会话完成一轮未打开的对话后显示蓝点提醒

---

## 🔥 社区热点 Issues（Top 10）

1. **#1973 交互模式工具白名单**（👍 29 | 💬 13）— Interactive Mode 每次工具调用都需手动确认，安全只读操作（grep/cat/git log）也不例外，唯一出路 `/allow-all` 又会放行破坏性操作。社区强烈呼吁类似 Claude Code 的分级白名单。
   https://github.com/github/copilot-cli/issues/1973

2. **#179 全局可配置允许工具**（👍 43 | 💬 4）— 与 #1973 呼应的老牌需求：希望在 config.json 中全局配置工具白名单，直接对标 `~/.claude/settings.json`。
   https://github.com/github/copilot-cli/issues/179

3. **#3709 /model 支持会话内多模型切换（含 BYOK/本地）**（👍 33 | 💬 8）— BYOK 模式被 `COPILOT_MODEL` 钉死在单一模型上，且 `/model` 选择器不列出本地 provider 的模型，混合使用 GitHub 托管模型与本地模型的呼声很高。
   https://github.com/github/copilot-cli/issues/3709

4. **#1613 内置 git worktree 生命周期管理**（👍 38 | 💬 4）— 希望 Copilot 能自动创建/销毁 worktree 以隔离并行任务，是并行工作流方向的高票需求。
   https://github.com/github/copilot-cli/issues/1613

5. **#4929 长时进程认证令牌停止刷新**（💬 7）— 进程级 auth token 失效后所有 prompt 报错，`/login` 无法恢复，只能重启进程。稳定性关键 bug。
   https://github.com/github/copilot-cli/issues/4929

6. **#4905 Desktop App 会话数分钟后死亡**（💬 6）— "GitHub credential registration is no longer available" 导致 github-mcp-server 目录失效，影响桌面端多会话用户。
   https://github.com/github/copilot-cli/issues/4905

7. **#2627 可配置系统提示词、削减固定 token 开销**（👍 21 | 💬 6）— 系统提示词启动即占约 20,500 tokens（200K 窗口的 10%），加上工具定义 ~8,500 tokens，重度用户希望可精简。
   https://github.com/github/copilot-cli/issues/2627

8. **#1857 取消/移除已入队的消息**（👍 29 | 💬 12）— 通过 `Ctrl+Q` 入队的消息无法在执行前撤回，讨论热烈，属高频操作体验痛点。
   https://github.com/github/copilot-cli/issues/1857

9. **#1697 会话分叉（Session forking）**（👍 25 | 💬 4）— 任务出现分岔时被迫串行或丢失上下文，希望能将对话分支为共享上下文的并行会话。
   https://github.com/github/copilot-cli/issues/1697

10. **#4602 managedSettings fail-closed 连锁故障**（💬 2）— 企业托管设置在 serverFetchFailed 抖动时整体失败：`store_memory` 全会话失效且所有 MCP server 被剥离，定位为多个 issue 的共同根因，企业场景影响大。
    https://github.com/github/copilot-cli/issues/4602

> 本日还有多个历史 issue 关闭：#1305（CIMD 支持）、#2285（复制含不可见字符）、#4623（Gemini MCP schema 400）、#2075（plan mode 下 agent 可编辑，涉及安全）等。

---

## 🔧 重要 PR 进展

过去 24 小时仅 1 条 PR 更新，无实质性社区 PR 进展：

- **#3817** "kCreate #"（@edge500，OPEN）— 描述为 "aquellos"，疑似测试性/无效 PR，无评论、无 👍，参考价值低。
  https://github.com/github/copilot-cli/pull/3817

> 💡 本周期功能迭代主要通过官方 Release 交付，外部贡献 PR 活跃度低。

---

## 📈 功能需求趋势

1. **精细化权限控制**（#1973、#179）：只读操作免确认 + 可配置白名单，是社区呼声最集中的方向
2. **BYOK / 本地模型深度支持**（#3709、#4950）：会话内模型切换、自定义采样参数、reasoning 字段兼容
3. **会话与上下文管理**（#1697 分叉、#1613 worktree、#1571/#3703 compaction 丢上下文、#2627 系统提示词瘦身）
4. **长时运行稳定性**（#4929 认证刷新、#4907 MCP 重连刷屏、#4602 企业托管配置 fail-closed）
5. **跨工具生态兼容**：v1.0.89-5 支持 `.claude/rules`，显示官方在积极吸引 Claude Code 用户迁移

---

## ⚠️ 开发者关注点（痛点总结）

- **确认疲劳**：每步工具调用都要手动批准，重度用户的工作流被频繁打断，且缺乏安全的中间方案
- **Token 预算焦虑**：固定系统提示词 + 工具定义占用近 30K tokens，压缩了有效上下文空间
- **长会话可靠性**：认证失效、MCP 重连消息刷屏、compaction 丢任务上下文，长时间挂机场景问题多发
- **BYOK 体验断档**：模型切换、采样参数被强制（temperature=0 导致推理模型退化）、事件流兼容性（只识别 `reasoning_content`）
- **Desktop App 成熟度不足**：worktree 会话丢失自定义 agents、凭据注册过期等新问题持续涌现

---
*本报告基于 2026-09-28 前推 24 小时的 GitHub 数据自动生成。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-28

## 1. 今日速览

今日无新版本发布。社区焦点集中在 **OpenCode Go 订阅认证问题**（多个用户报告 "Invalid credential" / "subscription required" 错误）、**v2 版本的 MCP 内存与进程管理缺陷**，以及 2.0 版本最受期待的功能提案——**可配置的 mid-run 提示词投递语义（queue vs steer）**（84 👍）。此外，一批 8 月的 stale PR 被自动化清理关闭。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues

1. **[#32157](https://github.com/anomalyco/opencode/issues/32157)** — **[2.0] 可配置 mid-run 提示词投递：queue vs steer**
   👍 84，评论 9。要求一等公民地区分用户在 agent 运行中提交提示词的三种语义（queue / steer / break），并考虑 compaction 场景下的 steer 语义。长期开放、热度最高，反映社区对 agent 控制粒度的强烈需求。

2. **[#51689](https://github.com/anomalyco/opencode/issues/51689)** — **OpenCode Go 订阅在 Desktop 端失效**
   "G" 徽章消失、"Insufficient account funds" 报错。同日 [#51683](https://github.com/anomalyco/opencode/issues/51683)、[#51685](https://github.com/anomalyco/opencode/issues/51685) 报告相同问题并已关闭，疑似服务端故障，值得持续观察。

3. **[#50885](https://github.com/anomalyco/opencode/issues/50885)** — **Go 订阅用户拿不到 API key**（👍 9）
   控制台 Keys 页只能创建 Service Account，无法生成 Go API key；配合 [#51388](https://github.com/anomalyco/opencode/issues/51388)（登录成功但请求报 Invalid API key），Go 订阅的认证/密钥链路问题较集中。

4. **[#51003](https://github.com/anomalyco/opencode/issues/51003)** — **全局 stdio MCP server 按目录重复启动，耗尽内存**
   多目录客户端（如 OpenChamber）下每个目录都会 spawn 一份 MCP 进程，直接打爆主机内存。与同日新报的 [#51731](https://github.com/anomalyco/opencode/issues/51731)（Location 关闭不清理 MCP 进程，reload 后遗留僵尸 stdio 进程）共同指向 v2 的 MCP 生命周期管理缺陷。

5. **[#37495](https://github.com/anomalyco/opencode/issues/37495)** — **SQLite WAL 无限增长（10–15 GB）撑爆磁盘**
   Desktop 为同一 `opencode.db` 打开多个连接并持长读事务，导致 WAL 无法 checkpoint，只有完全退出才恢复。桌面端稳定性的重要问题。

6. **[#49027](https://github.com/anomalyco/opencode/issues/49027)** — **Agent config 多余字段原样透传，触发 invalid_request_error**
   任何自定义属性被直接转发给上游 provider（Zen gateway），kimi-k3 / glm-5.3 等模型均复现。配置校验/白名单机制缺失。

7. **[#49948](https://github.com/anomalyco/opencode/issues/49948)** — **裸重定向绕过 shell 权限检查**（安全）
   `> file` 解析为 0 条命令，跳过权限检查直接执行。权限扫描器的边界情况，安全隐患级别。

8. **[#14445](https://github.com/anomalyco/opencode/issues/14445)** — **`opencode serve` 从非根路径启动时以 `/` 为 base directory**（已关闭）
   允许访问任意位置且权限路径不匹配——安全相关的服务端修复值得确认。

9. **[#49389](https://github.com/anomalyco/opencode/issues/49389)** — **[FEATURE] 插件无法触达的五项核心 session 能力**
   系统性梳理了 core 有但插件 API 不可达的写侧 session 操作，插件生态扩展性的高质量提案。

10. **[#50916](https://github.com/anomalyco/opencode/issues/50916)** — **v2 移除了 LSP 支持？**
    文档确认 v2 不再运行 language server、不产出 LSP diagnostics。用户对 v2 能力倒退的疑虑，迁移文档建议用替代方案，需关注官方路线图说明。

其他值得一看：[#32825](https://github.com/anomalyco/opencode/issues/32825)（`OPENCODE_CONFIG_DIR` 在 v2 中语义从“追加”变“替换”，破坏性变更）、[#49605](https://github.com/anomalyco/opencode/issues/49605)（`released:0` 被当作 1970 年导致自定义模型默认隐藏）、[#37888](https://github.com/anomalyco/opencode/issues/37888)（Docker/CI 下跳过启动时 npm install 的环境变量）。

## 4. 重要 PR 进展

> 注：今日多数 PR 为 `automated-pr-cleanup` 批量关闭的 stale PR，不代表近期合入。

1. **[#50221](https://github.com/anomalyco/opencode/pull/50221)**（OPEN）— 更新 nixpkgs 以支持 Bun 1.4，解决 Nix node_modules hash 计算问题。
2. **[#45759](https://github.com/anomalyco/opencode/pull/45759)**（已关）— Console 启动失败后恢复远程模型清单，避免网络抖动导致 `ModelUnavailableError` 持久化。
3. **[#45598](https://github.com/anomalyco/opencode/pull/45598)**（已关）— 修复 Electron 权限 handler 仅授权最新窗口的问题，保留通知/剪贴板白名单。
4. **[#45608](https://github.com/anomalyco/opencode/pull/45608)**（已关）— 用 `resolve.exports` 修复 Node 下 npm provider 的目录导入错误（`ERR_UNSUPPORTED_DIR_IMPORT`）。
5. **[#45583](https://github.com/anomalyco/opencode/pull/45583)**（已关）— 新增 `KV.scanAll(prefix)` 集中化全前缀扫描，解耦存储分页与恢复逻辑。
6. **[#45553](https://github.com/anomalyco/opencode/pull/45553)**（已关）— 幂等的 Go 配额修复端点，支持一次性精确扣减月度配额——侧面印证 Go 计费问题频发。
7. **[#45546](https://github.com/anomalyco/opencode/pull/45546)**（已关）— Telegram 双向 TUI session bridge，基于 v2 SDK 重构。
8. **[#45578](https://github.com/anomalyco/opencode/pull/45578)**（已关）— GPT-5 请求使用 `max_completion_tokens` 替代 `max_tokens`。
9. **[#45577](https://github.com/anomalyco/opencode/pull/45577)**（已关）— provider 侧执行的工具调用不再被错误改写为 `invalid` 工具。
10. **[#45571](https://github.com/anomalyco/opencode/pull/45571)**（已关）— 显式 `--agent` 可选择隐藏 agent，但 picker 中不显示——完善 agent 可见性语义。

## 5. 功能需求趋势

- **Agent 运行控制语义**（#32157, 84 👍）：queue/steer/break 的显式区分是呼声最高的方向。
- **插件 API 能力扩展**（#49389, #50962）：session 写操作、TUI API 稳健性，插件生态是核心诉求。
- **桌面端体验补齐**：重开已关闭标签页（#51717）、语音推按输入（#35219）、路径渲染修正（#51723, #50390）。
- **容器/CI 友好化**（#37888）：跳过启动安装、资源占用控制。
- **订阅与认证体验**（#50885, #51388）：Go 订阅密钥管理是近期用户增长痛点。

## 6. 开发者关注点

- **Go 订阅链路故障集中爆发**：今日至少 5 个 issue 涉及认证失败/密钥缺失/配额问题，官方响应速度是关键。
- **v2 迁移成本**：`OPENCODE_CONFIG_DIR` 语义变更（#32825）、LSP 移除（#50916）、tool call 校验错误（#51661）——v2 兼容性损耗引发用户疑虑。
- **资源与生命周期管理**：MCP 进程泄漏（#51003, #51731）、SQLite WAL 膨胀（#37495）是长时间运行场景下的稳定性隐患。
- **安全边界**：shell 裸重定向绕权（#49948）、serve 目录配置错误（#14445）表明权限扫描与路径解析仍需加固。
- **Windows 支持薄弱**：Bash 工具因管道持有而挂起（#32504）、多 issue 来自 Windows 用户。

---
*数据来源：github.com/anomalyco/opencode | 统计窗口：2026-09-27 至 2026-09-28*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-09-28）

## 📌 今日速览

今日无新版本发布，社区焦点集中在 **Managed Agent 分阶段架构**（#12380）的密集推进上，Stage D/F/H 多个子任务同步立项与落地。此外暴露了两个值得注意的安全/隐私问题：aux-model 选择器可能将凭据明文持久化（#12856），以及 `qwen mcp reconnect` 在用户明确关闭统计时仍上传遥测数据（#12844）。

---

## 🔥 社区热点 Issues

1. **[#12380](https://github.com/QwenLM/qwen-code/issues/12380) — Managed Agent 双路径架构提案**（评论 36）
   本周最热讨论。定义分阶段交付架构：Session 持久所有权、Workspace 绑定、可恢复的工具执行、稳定 WebSocket 接口。是当前多个 Stage 子任务的母提案，持续吸引大量架构讨论。

2. **[#12737](https://github.com/QwenLM/qwen-code/issues/12737) — ACP Bridge Stage B：Legacy/Managed 双引擎配对宿主集成**（评论 9）
   让普通 `qwen serve` 宿主实际使用双引擎配对，是架构落地路径上的关键一步。

3. **[#12826](https://github.com/QwenLM/qwen-code/issues/12826) — Webview 因 CodeMirror 竞态崩溃**（已关闭，评论 7）
   Remote-SSH 环境下使用 `@file` 引用即触发 Webview 崩溃（0.24.6），影响面大，已快速修复关闭。

4. **[#12856](https://github.com/QwenLM/qwen-code/issues/12856) — Aux-model 选择器持久化含凭据的 baseUrl**（评论 5）
   🔴 安全类问题：`visionModel` 等 5 个设置项以 `authType:<id>\0<baseUrl>` 形式存储，若 baseUrl 内嵌 userinfo 凭据会被所有公开表面原样输出。建议优先关注。

5. **[#12835](https://github.com/QwenLM/qwen-code/issues/12835) — Skill 工具被排除时仍注入 Skills 列表**（评论 5，ready-for-agent）
   明确排除 skill 工具后系统提示仍包含 `<system-reminder>`，浪费上下文；已有对应修复 PR #12838。

6. **[#12793](https://github.com/QwenLM/qwen-code/issues/12737) — Stage D 公共 API 契约与 DTO**（已关闭，评论 5）
   OpenAPI 契约入库、生成 DTO、Session 查询与事件回放，是 Managed Agent 对外 API 的基石。

7. **[#12802](https://github.com/QwenLM/qwen-code/issues/12802) — 残留 .deferred 标记永久阻塞独立更新**（已关闭，评论 5）
   独立更新机制中过期标记可导致更新永久卡死，属影响升级通道的可用性缺陷。

8. **[#12844](https://github.com/QwenLM/qwen-code/issues/12844) — `qwen mcp reconnect` 违背遥测关闭设置**（评论 4，ready-for-human）
   🔒 隐私问题：`createMinimalConfig()` 未传递 usageStatistics 设置，即使显式关闭仍发送 `session_start` 事件。修复 PR #12857 已提交。

9. **[#12874](https://github.com/QwenLM/qwen-code/issues/12874) — macOS 右侧扩展面板开启后无法关闭**
   Toggle 状态机缺陷且无任何替代关闭路径（Esc、拖分隔线均无效），0.24.6 桌面版可稳定复现；根因已在 PR #12876 定位（按钮被标题栏拖拽区域遮挡）。

10. **[#12859](https://github.com/QwenLM/qwen-code/issues/12859) — fastjson2 2.0.65 负标度 BigDecimal 回读失败**
    Runtime Broker 对齐 fastjson2 2.0.65 后重新引入“不可读行”不变量，与 #12798 的正标度修复形成对称漏洞。

---

## 🚀 重要 PR 进展

1. **[#12854](https://github.com/QwenLM/qwen-code/pull/12854) — 持久化 Workspace 协作状态层**
   workspace 级身份、线程、消息、运行记录、准入、文件锁与迁移——workspace-agent 协作栈第一块基石。

2. **[#11206](https://github.com/QwenLM/qwen-code/pull/11206) — 持久化 workspace-agent 执行服务**
   协作栈第二部分：守护进程可启动并恢复 agent turn，绑定任务级 session，暴露可信协作接口。

3. **[#12848](https://github.com/QwenLM/qwen-code/pull/12848) — Hosted 前台 Shell turns（gated）**
   在 `hosted-workspace-shell/1` profile 下为私有 Hosted Workspace 循环增加前台命令执行，stdout/stderr 完整存入 SQL Session Store。

4. **[#12855](https://github.com/QwenLM/qwen-code/pull/12855) — Stage H 记录提交与任务列表（H0c）**
   Session authority 提交 Stage H 记录，控制平面据此重建任务列表，TypeScript/Java 双侧对齐。

5. **[#12857](https://github.com/QwenLM/qwen-code/pull/12857) — 修复 mcp reconnect 遥测与代理设置**
   修复 #12844：临时 Config 正确传递 usageStatisticsEnabled 与 proxy 配置。

6. **[#12876](https://github.com/QwenLM/qwen-code/pull/12876) — macOS 右侧面板无法关闭修复**
   将 docked 面板内嵌避开标题栏拖拽区域，修复 #12874。

7. **[#12838](https://github.com/QwenLM/qwen-code/pull/12838) — Skill 未注册时跳过列表注入**
   修复 #12835，排除 skill 工具时不再注入 `<available_skills>` 列表，节省上下文。

8. **[#12833](https://github.com/QwenLM/qwen-code/pull/12833) — Desktop 发布矩阵新增 linux-aarch64**
   ARM64 Linux 获得 AppImage 与 deb 发布渠道，扩大平台覆盖。

9. **[#12879](https://github.com/QwenLM/qwen-code/pull/12879) — Ollama 零参数工具兼容**
   修复 #12878：为无参数工具注入空 parameters 字段，解决 Ollama 本地部署全量 400 报错。

10. **[#12875](https://github.com/QwenLM/qwen-code/pull/12875) — PreToolUse hook 支持 failMode: "closed"**
    可选的故障关闭模式：hook 传输失败时拒绝工具调用，增强安全合规场景。

---

## 📈 功能需求趋势

- **多 Agent / Session 管理架构**（最热）：#12380 主提案衍生出 Stage B/D/F/H 十余个子任务，覆盖 API 契约、故障恢复（#12766、#12670）、CI 门禁（#12728、#12872），是当前绝对主线。
- **Workspace 持久化协作**：跨重启的 worker 认领/回收（#12766）、durable binding、stranded-run 和解（PR #12854/#11206）。
- **隐私与遥测可控性**：遥测关闭失效（#12844）、NO_PROXY 语义对齐（#12852）、可选 ScreenContextAgent MCP（#12832）。
- **平台覆盖扩展**：ARM64 Linux 桌面发布（#12833）、macOS UI 打磨（#12874）。
- **本地模型兼容**：Ollama 零参数工具支持（#12878）。
- **上下文效率**：Skill 列表按需注入（#12835）、Auto Memory 结构化召回（#10151）。

---

## ⚠️ 开发者关注点

- **凭据泄漏风险**：aux-model baseUrl 中的 userinfo 被原样持久化与输出（#12856），使用内嵌凭据的用户建议立即检查配置。
- **桌面端稳定性**：0.24.6 的 Webview 崩溃（#12826）与 macOS 面板卡死（#12874）均与 UI 状态/竞态相关，桌面端质量待提升。
- **升级链可靠性**：独立更新的 deferred 标记死锁（#12802）表明自更新机制仍存在边角案例。
- **远程/代理环境**：cua-sdk 下载不走代理（#12829）、Remote-SSH 场景问题频发，企业网络用户痛点集中。
- **Batch API 结果完整性**：collect 报告 9/9 成功但 3 份交付缺失章节（#12825），批量任务的可信度存疑。

---
*数据截至 2026-09-28，来源：github.com/QwenLM/qwen-code*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*