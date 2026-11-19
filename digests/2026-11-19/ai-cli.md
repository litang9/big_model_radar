# AI CLI 工具社区动态日报 2026-11-19

> 生成时间: 2026-11-19 01:51 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-11-19）

## 1. 生态全景

AI CLI 工具已从“终端里的代码补全”全面演进为**多模态、多环境、事件驱动的 Agent 操作系统**：语音通话、Computer Use、Remote Control 等能力正快速进入 CLI 形态。头部厂商（Anthropic、OpenAI、Google、GitHub）在能力上趋于同质（auto 权限、MCP、hooks、subagent），竞争焦点转向**可靠性、企业集成与平台质量**。同时行业普遍进入“能力扩张—质量回归”的循环期，Windows 平台和移动端 Remote Control 成为全行业质量洼地。开源工具（OpenCode、Qwen Code）则以架构重构和生态开放寻求差异化突破。

## 2. 各工具活跃度对比

| 工具 | 今日 Release | 热点 Issues | Issue 特征 | 活跃 PR | 整体活跃度 |
|---|---|---|---|---|---|
| **Claude Code** | v2.1.328 正式版 | 10+（含 2 个安全级） | 桌面端质量、跨用户泄露 | 1（近 24h） | 高（Issue 侧），PR 通道几乎封闭 |
| **OpenAI Codex** | rust-v0.170.0 正式版 + 多预发布 | 10 | Windows Computer Use、隐私 | 10+ | **最高**，双侧均活跃 |
| **Gemini CLI** | v0.69.0 稳定 + v0.70.0-preview | 10（多 P1/P2） | Subagent 可靠性 | 10（50 Issue/32 PR 更新） | 高，社区贡献突出（如 @dongs0104 单人 5 个 PR） |
| **Copilot CLI** | v1.0.114（11-18，无详细日志） | 10 | 企业策略/MCP 认证 | 0 | 中，Issue 驱动为主 |
| **OpenCode** | 无 | 10 | Windows 稳定性、i18n | 10（含核心维护者亲自提交） | 高，PR 侧活跃 |
| **Qwen Code** | v0.28.0-nightly | 10（多 P1） | 1.0 内核迁移、数据完整性 | 10 | 高，工程化节奏快 |
| **Kimi Code CLI** | 无 | 0 | — | 1（文档 PR 关闭） | 低 |

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **Windows 平台质量** | Claude Code、Codex、Gemini CLI、OpenCode、Copilot CLI | 安装失败/BSOD（#111067）、渲染器栈溢出（#64676）、ACP 挂起（#64686）、PowerShell 阻塞（#30247）——全行业性短板 |
| **MCP 生态健壮性** | Claude Code、Codex、Copilot CLI、Gemini CLI | MCP hooks 失败语义（onFailure: block）、懒启动（#62366）、OAuth/Entra 认证静默失败（#4017、#5402）、128 工具上限（#24246） |
| **Remote Control / 移动端** | Claude Code、Codex | 两者均有移动端 Remote Control 断连/无限等待的高频投诉（#28508、#111057 vs #39974） |
| **数据安全与隐私** | Claude Code、Codex、OpenCode、Copilot CLI | 跨用户提示词泄露（#111061）、云端会话显式删除（#24610）、跨产品数据读取（#55383）、凭据明文（#64745）、凭据堆积泄漏（#5473） |
| **上下文/token 预算管理** | Gemini CLI、Copilot CLI、Codex | 369k token 大输出不截断（#30234）、工具定义膨胀 260K（#5151）、compaction 可配置（#96316） |
| **事件驱动 / 后台运行 Agent** | Codex、Qwen Code | monitor 工具唤醒（#29922）vs `/loop` 定时触发、daemon 重启恢复（#17677）——同一诉求的两条实现路径 |
| **远程 feature flag 透明度 / 更新可控性** | Claude Code、OpenCode | 静默启用 idle compaction（#102260）、强制自动重启（#104422）vs todo 特性恢复 opt-in（#64775） |

## 4. 差异化定位分析

- **Claude Code**：闭源、企业级优先，hooks/权限模式（auto）与企业网关（Bedrock/Vertex/Foundry）集成最深；但 PR 通道封闭，社区只能“报障”，桌面端质量问题累积。
- **OpenAI Codex**：能力最前沿（WebRTC 语音、Computer Use、Apps 审批粒度），迭代速度最快；代价是新功能配套 bug 密集（语音导致 HTTP 400、屏幕捕获残留）。
- **Gemini CLI**：开源+社区贡献模式最健康，ACP/IDE 集成是差异化主线；但 subagent 核心卖点可靠性不足，企业模型访问承诺未兑现造成信任赤字。
- **Copilot CLI**：企业/GitHub 生态深度绑定，策略与 Entra 认证是企业刚需也是最大痛点；changelog 不透明（"Fixes and changes"）与 PR 零活跃反映闭源节奏。
- **OpenCode**：中立开源底座，架构试验田——多环境文件工具、Rust 可嵌入 Code Mode、serve 免密等诉求指向**自托管/可嵌入**开发者。
- **Qwen Code**：唯一以**渠道生态**（QQ/DingTalk/WeCom/GitHub）和 managed agent server 为核心路线的工具，1.0 事件驱动内核迁移显示其工程治理成熟。
- **Kimi Code CLI**：尚处早期，社区近乎静默，重点在 IDE 接入文档完善。

## 5. 社区热度与成熟度

- **第一梯队（活跃+双向流动）**：Codex、Gemini CLI、OpenCode、Qwen Code——Issue 与 PR 均活跃，反馈闭环快（Gemini 当天修、Qwen wenshao 当天提修复 PR）。
- **第二梯队（Issue 驱动、单向反馈）**：Claude Code（社区热度高但 PR 通道死水，8 月文档 PR 至今未合并）、Copilot CLI（零 PR，企业用户积怨最深，#1595 持续 9 个月）。
- **成熟度悖论**：商业闭源工具功能最全但质量债务重（Claude Code 桌面端、Codex 新功能 bug）；开源工具更重视回归修复与 CI 治理（Qwen 的字节预算门禁、deflake 系列），但核心能力落后半拍。
- **快速迭代阶段**：Qwen Code（1.0 内核冻结日 11-21）、Codex（Guardian v3/MCP 懒启动密集合入）。

## 6. 值得关注的趋势信号

1. **Agent 从回合制走向事件驱动已成共识**：Codex 的 monitor 工具需求、Qwen 的 `/loop` + PR-watch 事件注入、daemon 会话恢复，预示 2027 年主线是“持续运行、被动唤醒”的 agent。开发者应关注具备 inbox/恢复语义的工具。
2. **权限模型向“细粒度可审计”演进**：auto 模式默认化、按工具粒度审批（#62360）、权限设置被模型忽略的信任危机（#17757）——企业在选型时应优先考察权限审计与远程开关透明度。
3. **安全事件频发敲响警钟**：跨用户泄露、跨产品数据读取、凭据明文、误删 git 历史，说明 agent 权限扩张速度远超防护机制；建议在关键环境启用沙箱、危险命令确认与独立凭据管理。
4. **ACP 正成为 IDE 集成事实标准**：Gemini、Copilot、OpenCode 均在补齐 ACP 支持，但其 Windows 实现普遍不成熟——IDE 集成重度用户短期内应留在 macOS/Linux。
5. **数据主权是采购决策新变量**：云端会话删除、transcript 完整性、凭据堆积等问题表明，会话数据的生命周期管理将从“加分项”变为“门槛项”。
6. **对开发者的直接建议**：Windows 用户暂缓升级各工具最新桌面版；企业 Copilot 用户升级前在非关键环境验证 MCP；开源贡献者优先选择 PR 响应快的 Gemini CLI/OpenCode/Qwen Code。

---
*分析基于 2026-11-19 各仓库公开数据，链接均可在原始日报中溯源。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-19）

## 一、热门 Skills 排行（PR 活跃度 Top）

| # | Skill / PR | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** — [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 Header 传递方式，解决连接脚本兼容性（关联 #1668） | OPEN |
| 2 | **skill-creator 触发评估修复** — [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 Windows 下 select() 失败、多 worker 探针竞争导致的假阴性触发率——与 Issue #556/#1352 的核心痛点直接对应 | OPEN |
| 3 | **pyxel（复古游戏开发）** — [#525](https://github.com/anthropics/skills/pull/525) | Python 像素游戏创作/调试/无头验证，官方库作者本人提交，存活超 8 个月仍在活跃更新 | OPEN |
| 4 | **notion-spec-to-implementation + quantitative-resume-auditor** — [#1245](https://github.com/anthropics/skills/pull/1245) | 将产品/技术 Spec 转为 Notion 可执行任务 + 简历量化审计，工作流自动化方向代表作 | OPEN |
| 5 | **document-typography** — [#514](https://github.com/anthropics/skills/pull/514) | 解决 AI 生成文档的孤行、寡段落、编号错位等排版问题，“隐性刚需”类 Skill | OPEN |
| 6 | **md2video-audio** — [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown → Marp 幻灯 → 带拟真人配音的 MP4 视频，零成本内容生产 | OPEN |
| 7 | **scnet-hpc** — [#1615](https://github.com/anthropics/skills/pull/1615) | 面向 HPC 集群的 SSH + Slurm 工作流操作，覆盖科研计算场景 | OPEN |
| 8 | **webapp-testing 安全加固** — [#1980](https://github.com/anthropics/skills/pull/1980) | 移除 `shell=True` 消除命令注入风险（CWE-78），安全贡献持续涌现（同类：docx 超时校验 [#1792](https://github.com/anthropics/skills/pull/1792)） | OPEN |

## 二、社区需求趋势（Issues 提炼）

1. **信任与安全机制** — 最热 Issue #492（46 评论）：社区 Skills 冒用 `anthropic/` 命名空间构成信任边界漏洞，用户强烈要求官方签名/认证机制。
2. **组织级分发与协作** — #228（17 评论）：期待 Claude.ai 内的团队共享 Skill 库，取代手动传文件的流程。
3. **Skill 元工程/评测可靠性** — #556、#1352：`run_eval.py` 触发率系统性失真（并行 worker UUID 串扰），skill-creator 的评估基础设施是持续性痛点。
4. **上下文经济学** — #1487：`claude-api` Skill 单次注入约 156k token 耗尽上下文，社区要求 Skill 做渐进式/按需加载。
5. **长程 Agent 记忆与质量门控** — #1329（compact-memory 符号化状态压缩）、#1385（三段式推理质量门控管线），反映 Agent 自治场景的新 Skill 方向。
6. **平台基础功能** — #1143（7 评论/18 👍）：账户邮箱变更诉求，虽属平台层但热度高。

## 三、高潜力待合并 Skills（活跃且开放）

- **#1742 mcp-builder 兼容修复** — 关联 Issue #1668，外部依赖断裂属阻断级问题，合并优先级高。
- **#1298 skill-creator 触发评估修复** — 直接回应 #556/#1352 两大高评论 Issue，多平台适配，落地价值大。
- **#1997 skill-creator YAML frontmatter 解析修复** — 修复描述元数据与 SKILL.md 不一致，影响评估准确性。
- **#2019 xlsx recalc 外链误报修复** — 解决工作表级 defined_names 的假阴性（关联 #2013）。
- **#525 pyxel** — 持续维护 8 个月、由上游作者提交，质量与契合度俱佳。
- **gerardrecinto 系列**（[#1975](https://github.com/anthropics/skills/pull/1975)/[#1976](https://github.com/anthropics/skills/pull/1976)/[#1977](https://github.com/anthropics/skills/pull/1977)）— 均关联具体 Issue、小而精准的 bugfix 批量，合并阻力小。

## 四、生态洞察

**社区最集中的诉求一句话总结**：Skills 生态正从"功能贡献"转向“信任与工程化”——用户最迫切需要的是官方命名空间认证、可靠触发评测基础设施和上下文友好的 Skill 加载机制，而非更多新 Skill 本身。

---

# Claude Code 社区动态日报 — 2026-11-19

## 1. 今日速览

Claude Code 发布 **v2.1.328**，为 Opus 4.6 / Sonnet 4.6 在 Bedrock、Vertex、Foundry 等多网关新增 auto 权限模式，并扩展 `mcp_tool` hooks 的 `onFailure: block` 能力。今日社区焦点集中在**桌面端质量问题**：Windows 更新失败导致 CLI 缺失（#111067）、跨用户提示词泄露的安全隐患（#111061）、以及持续发酵的键盘输入重复和 BSOD 问题。Remote Control（远程控制）在移动端工作流中的不稳定性仍是高频投诉。

## 2. 版本发布

**v2.1.328**（[Release](https://github.com/anthropics/claude-code/releases)）
- 为 Amazon Bedrock、Google Cloud Agent Platform、Microsoft Foundry 及 Claude apps gateway 上的 **Opus 4.6 / Sonnet 4.6** 新增 **auto 模式**；未指定权限模式的交互式会话将默认以 auto 模式启动
- `mcp_tool` hooks 新增 `"onFailure": "block"` 选项，与 command / HTTP hooks 行为对齐

## 3. 社区热点 Issues（Top 10）

1. **[#28508](https://github.com/anthropics/claude-code/issues/28508)**（已关闭，19 评论 / 24 👍）— Remote Control 在移动端选择的 AskUserQuestion 无法传回 CLI，导致无限等待。作为 Remote Control 的核心场景 bug，社区关注度高，现已修复关闭。
2. **[#111061](https://github.com/anthropics/claude-code/issues/111061)**（新建）— **VS Code 扩展出现跨用户提示词泄露**：其他用户的 Opus 4.7 请求出现在本地聊天窗口。安全级别最高，建议立即关注。
3. **[#111067](https://github.com/anthropics/claude-code/issues/111067)**（新建，可复现）— Windows 原生安装 `claude update` 到 2.1.327 失败并导致 PATH 上没有 claude 可执行文件，属于阻断级安装问题。
4. **[#110507](https://github.com/anthropics/claude-code/issues/110507)** — 自捆绑 2.1.325 起，Windows 桌面端切换会话/打开设置冻结 30–50 秒，性能回归明显影响日常工作流。
5. **[#107318](https://github.com/anthropics/claude-code/issues/107318)**（回归）— 桌面更新后新 artifacts connector 导致**跨账号共享的 Artifacts 无法读写**，破坏团队协作场景。
6. **[#104422](https://github.com/anthropics/claude-code/issues/104422)** — 桌面端自动更新在工作时间**未经同意强制重启**，单日可触发 4 次，社区强烈要求可控更新时机。
7. **[#102260](https://github.com/anthropics/claude-code/issues/102260)** — Idle compaction 被 feature flag **远程静默启用**，无通知无 opt-in，引发对远程开关策略的信任问题。
8. **[#107274](https://github.com/anthropics/claude-code/issues/107274)** — macOS 上 `rm -rf` 误删 **12+ 个月 git 历史**，数据丢失类 issue，凸显危险命令防护需求。
9. **[#102874](https://github.com/anthropics/claude-code/issues/102874)**（7 👍）— Routines API 对活跃 Project 返回 403 "project is paused"，阻塞自动化流水线集成。
10. **[#106422](https://github.com/anthropics/claude-code/issues/106422)** — `--resume` 会恢复被 `session.compact` hook 移除的消息（≤5 MiB 会话文件），影响依赖 compaction hooks 的插件生态。

其他值得留意：[#111057](https://github.com/anthropics/claude-code/issues/111057)（Remote Control 自动关闭，手机办公不可用）、[#98345](https://github.com/anthropics/claude-code/issues/98345)（auto 模式首轮失效）、[#110741](https://github.com/anthropics/claude-code/issues/110741)（VSCodium 信任目录检测失败）。

## 4. 重要 PR 进展

过去 24 小时仅 1 个活跃 PR：

- **[#86537](https://github.com/anthropics/claude-code/pull/86537)** — 修复 CHANGELOG.md 中 `CLAUDE_BASH_NO_LOGIN`（v1.0.124）条目的重复单词，纯文档修正，仍处 open 状态（自 8 月提交至今未合并）。

> 本仓库为 Anthropic 主导的闭源开发模式，社区贡献以 issue 反馈为主，PR 通道基本不活跃。

## 5. 功能需求趋势

- **权限与安全**：auto 模式的可靠性（#98345）、跨用户泄露（#111061）、红队/漏洞赏金猎人访问计划（#103689）
- **桌面端可控性**：更新时机自主选择（#104422）、远程 feature flag 透明化（#102260）
- **移动/远程工作流**：Remote Control 稳定性是持续性主题（#28508、#87777、#111057）
- **成本控制**：compaction 模型可配置 `compactModel`（#96316）、用量统计错误（#97997）、prompt cache 失效（#110281）
- **企业/团队协作**：GitHub 组织集成（#106713）、共享 Artifacts（#107318）、Routines API（#102874）
- **UX 细节**：Session Rail 快捷键（#105136）、Auto-fix 捕获 bot 编辑的评论（#104871）

## 6. 开发者关注点

- **Windows 体验显著落后**：安装失败（#111067）、BSOD（#94454、#92779，均指向 bindflt.sys）、桌面冻结（#110507），Windows 用户痛点集中。
- **桌面键盘输入重复**是一个长期未解的老问题：#89158、#92622、#105349、#110547 持续报告按键/粘贴双写，跨平台存在。
- **Hook 与插件生态边界问题**：compaction hook 结果被 resume 覆盖（#106422）说明 hooks 语义需要更明确的持久化保证。
- **远程开关策略信任危机**：idle compaction 静默启用（#102260）提醒企业用户关注配置的可审计性。
- **数据安全**：`rm -rf` 误删 git 历史（#107274）再次引发对危险命令确认机制和沙箱化的讨论。

---
*数据截至 2026-11-19，来源：github.com/anthropics/claude-code*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-11-19

## 📌 今日速览

Codex 发布 **rust-v0.170.0** 正式版，为 TUI 带来 WebRTC 实时语音通话能力，并改进了 OTel 认证与跨环境同名 MCP 服务器支持。社区方面，Windows Computer Use 相关 bug（屏幕捕获残留、系统级 UI 卡顿）持续发酵，成为最高热度议题；PR 侧 Guardians v3、跨平台沙箱路径处理与 MCP 懒启动等多项改进密集合入。

---

## 🚀 版本发布

### rust-v0.170.0（正式版）

**新特性：**
- TUI 新增 **WebRTC 协商**，支持实时语音通话（#61172）
- OpenTelemetry HTTP exporter 认证头**自动刷新**（#61028）
- 实验性支持**跨环境使用同名 MCP 服务器**（#60905）

同时放出多个预发布版：`0.172.0-alpha.1`、`0.171.0-alpha.13`、`0.170.0-alpha.4.2`。

---

## 🔥 社区热点 Issues

1. **[#57101](https://github.com/openai/codex/issues/57101)** — Windows Computer Use 完成截图回合后，屏幕捕获权限和金色边框提示未释放（64 评论 / 12 👍）。隐私感知强烈，是当前最热 issue。

2. **[#39974](https://github.com/openai/codex/issues/39974)** — Remote Control 在 Android/iOS 上持续不稳定、频繁断连，而 Windows 桌面端正常（33 评论）。跨 3 台设备复现，影响移动办公场景。

3. **[#56941](https://github.com/openai/codex/issues/56941)** — Computer Use 后系统级 UI 卡顿，需手动结束 `codex-computer-use.exe` 才恢复（27 评论），资源释放问题的又一佐证。

4. **[#29922](https://github.com/openai/codex/issues/29922)** — 请求 agent 可调用的 `monitor` 工具，通过事件（日志/文件/CI）唤醒 Codex 而非轮询（25 评论 / 10 👍）。反映社区对**事件驱动 agent** 的强烈需求。

5. **[#21252](https://github.com/openai/codex/issues/21252)** — TUI 增加 CLI 选项隐藏工具活动，长会话中被工具调用刷屏是普遍痛点（24 评论 / **47 👍**，本日点赞最高）。

6. **[#24610](https://github.com/openai/codex/issues/24610)** — 要求为云端归档会话提供**显式删除**功能（17 评论 / 32 👍），涉及敏感项目上下文的数据保留与隐私。

7. **[#49464](https://github.com/openai/codex/issues/49464)**（已关闭）— VS Code 扩展模型选择器缺失 GPT-6.1 Sol（16 评论 / 29 👍），已修复，反映模型同步滞后问题。

8. **[#51636](https://github.com/openai/codex/issues/51636)** — macOS Work 模式下 Enter 和发送按钮均无法提交消息（18 评论），影响基本可用性。

9. **[#62212](https://github.com/openai/codex/issues/62212)** — 桌面端音频工具输出不受支持，导致后续纯文本回合返回 HTTP 400（12 评论），昨日新报，或与新版语音功能相关。

10. **[#55383](https://github.com/openai/codex/issues/55383)** — Codex 被发现读取并导入本地 Claude Code / Claude Agent SDK 的聊天记录，引发跨产品数据边界争议。

---

## 🔧 重要 PR 进展

1. **[#62366](https://github.com/openai/codex/pull/62366)** — stdio MCP 服务器**懒启动默认启用**：工具目录有缓存时延迟到首次调用再启动，显著加快冷启动。
2. **[#62392](https://github.com/openai/codex/pull/62392)** / **[#62388](https://github.com/openai/codex/pull/62388)** — Connector 结果透传至 ChatGPT Responses，支持 Apps 工具结果作为 `tool_result` 附带（单条 1 MiB 上限）。
3. **[#62373](https://github.com/openai/codex/pull/62373)** — Guardian v3 新增可选**内存消息板**（SQLite），housekeeper 与 reviewer 共享证据。
4. **[#62374](https://github.com/openai/codex/pull/62374)** — Guardian 附带审查的拒绝复议逻辑与独立审查统一。
5. **[#62377](https://github.com/openai/codex/pull/62377)** / **#62376 / #62375** — 系列修复**跨平台路径兼容**：Windows 盘符路径在 Unix 客户端下的 workspace/writable roots/工作目录解码问题。
6. **[#62389](https://github.com/openai/codex/pull/62389)** — 暂停运行时沙箱完整性检查（与沙箱强制执行的策略准备重复）。
7. **[#62386](https://github.com/openai/codex/pull/62386)** — 代理设置每条沙箱命令只准备一次，避免覆盖已绑定凭据。
8. **[#62378](https://github.com/openai/codex/pull/62378)** — 移除 `thread/sample` 的 4,000 字节 prompt 限制。
9. **[#62360](https://github.com/openai/codex/pull/62360)** — Codex Apps 支持**按工具粒度的审批 reviewer**（如日历创建人工审核、其余自动）。
10. **[#62390](https://github.com/openai/codex/pull/62390)** — 全屏 TUI 中 hover 高亮可点击链接与控件，改进交互反馈。

---

## 📈 功能需求趋势

- **权限与自动化平衡**：「Full Access 不够 full」是高频主题（#59249、#60450、#61161、#54854），用户希望免打扰的自动化执行。
- **事件驱动 / 后台运行**：monitor 工具、定时自动化预授权（#42696）反映 agent 从回合制走向持续运行的诉求。
- **隐私与数据控制**：云端会话删除（#24610）、屏幕捕获残留（#57101）、跨产品数据读取（#55383）。
- **TUI 可读性**：隐藏工具活动（#21252）获 47 👍，信息降噪需求突出。
- **远程/移动体验**：Remote Control 稳定性、项目列表刷新、Worktree 显示等多条 issue 集中爆发。

---

## ⚠️ 开发者关注点

1. **Windows Computer Use 资源/权限管理**是当前最大痛点集群（#57101、#56941），建议 Windows 用户关注版本更新。
2. **移动端 Remote Control 可靠性**长期未解（#39974、#44582），重度移动办公用户需谨慎依赖。
3. **配额透明度**：促销积分优先消耗、Analytics 回填（#52039）及配额借用提案（#53434）值得 Pro 用户关注。
4. **异常平台**：FreeBSD 上 65 万文件描述符泄漏（#35764）依旧开放。
5. **升级注意**：CLI 0.154.0 起自定义 provider 的 `/status` 限额显示回归仍未修复（#45052）。
6. **积极信号**：MCP 懒启动默认化、Guardian v3 持续迭代、跨平台沙箱兼容性系列修复，显示核心执行层在快速成熟。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-11-19

## 一、今日速览

Gemini CLI 发布 **v0.70.0-preview.0** 预览版，紧随稳定版 **v0.69.0**（新增 `/stats` heatmap 子命令查看每日 token 用量）。过去 24 小时社区活跃度高：50 条 Issue 更新、32 条 PR 更新，ACP（Agent Client Protocol）相关修复成为 PR 主战场，贡献者 @dongs0104 集中提交了 5 个 ACP/核心修复。Subagent 可靠性问题（挂起、误报成功）仍是 Issue 区最集中的痛点。

---

## 二、版本发布

### v0.70.0-preview.0
- 预览版发布，主要包含 v0.68.0 / v0.69.0 的 changelog 汇总及 nightly 版本号推进（[Release](https://github.com/google-gemini/gemini-cli/releases)）

### v0.69.0（稳定版）
- **fix(core,cli)**: 修复模板占位符替换时字面量 `$` 字符被破坏的问题（[PR #30136](https://github.com/google-gemini/gemini-cli/pull/30136)）
- **feat(cli)**: 新增 `/stats heatmap` 子命令，可视化每日 token 用量（[PR](https://github.com/google-gemini/gemini-cli)）

---

## 三、社区热点 Issues

1. **#22323** [P1] Subagent 达到 MAX_TURNS 后被误报为 GOAL 成功，掩盖中断事实
   可观测性核心缺陷：`codebase_investigator` 自己承认未完成分析，状态却显示 success。13 条评论，P1 优先级，处于 need-retesting 状态。（[链接](https://github.com/google-gemini/gemini-cli/issues/22323)）

2. **#21409** [P1] Generalist agent 无限挂起（👍 8，点赞最高的 bug）
   连创建文件夹这类简单操作都会挂起一小时以上，用户只能显式禁止 subagent 规避。直接影响可用性。（[链接](https://github.com/google-gemini/gemini-cli/issues/21409)）

3. **#28625** [已关闭] 企业版用户质问 Gemini 3.5/3.6 Flash 为何缺席（👍 58，情绪最高）
   指出 Google 在 5 月迁移公告中承诺企业用户可访问最新模型，但实际未兑现。虽已关闭（Stale），但 58 个赞反映企业用户的强烈不满。（[链接](https://github.com/google-gemini/gemini-cli/issues/28625)）

4. **#21968** [P2] 模型几乎不主动使用自定义 skills 和 sub-agents
   即使任务与已定义的 skill 高度相关（gradle、git），模型也不会自主调用，需用户显式指示。影响整个扩展生态的实用性。（[链接](https://github.com/google-gemini/gemini-cli/issues/21968)）

5. **#19873** [P2] 零依赖 OS 沙箱 + 执行后意图路由，释放模型原生 bash 能力
   战略性提案：Gemini 3 模型天生擅长链式使用 POSIX 工具，社区探讨如何在安全与 UX 之间充分释放这一能力。（[链接](https://github.com/google-gemini/gemini-cli/issues/19873)）

6. **#22745** [P2] AST 感知的文件读取/搜索/代码库映射 EPIC
   探索用 AST 工具精确定位方法边界，减少错位读取和 token 噪音，可能重构 `codebase_investigator`。（[链接](https://github.com/google-gemini/gemini-cli/issues/22745)）

7. **#22267** [P2] Browser Agent 完全忽略 settings.json 配置（如 maxTurns）
   AgentRegistry 正确合并了配置但运行时未生效，配置系统与执行层脱节。（[链接](https://github.com/google-gemini/gemini-cli/issues/22267)）

8. **#24246** [P2] 工具数超过 128 个触发 API 400 错误
   期望 agent 更智能地限制工具作用域，对重度 MCP/扩展用户是硬性阻断。（[链接](https://github.com/google-gemini/gemini-cli/issues/24246)）

9. **#23571** [P2] 模型在随机位置创建临时脚本，污染工作区
   限制 shell 执行后，模型到处生成编辑脚本，清理成本高，影响干净提交。（[链接](https://github.com/google-gemini/gemini-cli/issues/23571)）

10. **#22186** [P1] get-shit-done output hook 导致 CLI 崩溃
    任务接近完成打印摘要时崩溃，P1 级稳定性问题。（[链接](https://github.com/google-gemini/gemini-cli/issues/22186)）

---

## 四、重要 PR 进展

1. **#30363** 修复托管历史中 pending prompt 重复追加问题（修复 #30069），附回归测试。（[链接](https://github.com/google-gemini/gemini-cli/pull/30363)）

2. **#30362** ACP 模式下正确上报 agent 停止原因，替代静默空结束，提升 IDE 集成可观测性。（[链接](https://github.com/google-gemini/gemini-cli/pull/30362)）

3. **#30335** 修复 `getSafeGitEnv()` 将 `core.sshCommand` 设为空字符串导致所有 SSH Git 操作失败的问题。（[链接](https://github.com/google-gemini/gemini-cli/pull/30335)）

4. **#30236** ACP 现在像 CLI Scheduler 一样并行执行独立工具调用——此前 4 个 `sleep 3` 串行需 12 秒，现在 3 秒。（[链接](https://github.com/google-gemini/gemini-cli/pull/30236)）

5. **#30234** ACP 补齐大输出截断逻辑：此前一次 `seq 1 60000` 直接消耗 369k input tokens。（[链接](https://github.com/google-gemini/gemini-cli/pull/30234)）

6. **#30230** [P1] 保留合成 binary ack，修复 Gemini 3 下 Code Assist 登录时音频/视频 `read_file` 报 400 的问题。（[链接](https://github.com/google-gemini/gemini-cli/pull/30230)）

7. **#30241** 修复截断工具响应时误切 `__binary_injection__` 内 base64 数据，导致 >48KB 音视频文件读取失败。（[链接](https://github.com/google-gemini/gemini-cli/pull/30241)）

8. **#30232** ACP 支持 `session/close`，客户端可释放会话及其持有的 config、chat 和 MCP 连接资源。（[链接](https://github.com/google-gemini/gemini-cli/pull/30232)）

9. **#30247** [P2] 避免 PowerShell 解析阻塞 Node 事件循环，修复 Windows 下 Thinking 动画冻结。（[链接](https://github.com/google-gemini/gemini-cli/pull/30247)）

10. **#30246** Windows `/ide install` 在编辑器路径含空格时失败——为 cmd.exe 正确加引号（VS Code 默认安装路径即含空格）。（[链接](https://github.com/google-gemini/gemini-cli/pull/30246)）

---

## 五、功能需求趋势

- **Subagent 可靠性与可观测性**（最集中）：挂起（#21409）、误报成功（#22323）、bug 报告缺失上下文（#21763）、轨迹无法分享（#22598）
- **ACP / IDE 集成深化**：PR 区近半数修复集中在 ACP 模式，对齐 CLI 行为（并行执行、输出截断、hook 触发、会话管理）
- **AST 感知代码理解**：#22745、#22746、#19561 均指向更精准、token 更省的代码读取与搜索
- **任务管理演进**：用持久化文件 CRUD 替代 in-context WriteToDo（#18836、#21000）
- **安全与沙箱**：零依赖 OS 沙箱提案（#19873）、阻止破坏性 git/DB 操作（#22672）
- **Windows 支持补强**：PowerShell 阻塞（#30247）、路径空格（#30246）

## 六、开发者关注点

1. **Subagent 挂起/误报是最痛的痛点**：多个 P1 bug 长期处于 need-retesting，用户 workaround 是禁用 subagent——这与 subagent 作为核心卖点的定位矛盾。
2. **Token 消耗失控**：ACP 大输出不截断（369k tokens）、上下文每 turn 基线 36.6k，社区对“节俭读取”诉求强烈。
3. **企业用户信任危机**：新模型（3.5/3.6 Flash）未按承诺对企业用户开放，58 赞的高情绪 Issue 值得官方正面回应。
4. **配置一致性**：settings.json 覆盖在 Browser Agent 上不生效、文档配置键与实际 schema 脱节（#29007、#29016、#28977）。
5. **文档滞后**：auto-generated 文档未随 schema 更新（extensions 类别缺失、HookDecision 值不完整），新用户上手成本增加。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-19** | 数据来源：github.com/github/copilot-cli

---

## 📌 今日速览

Copilot CLI 昨日发布 v1.0.114（"Fixes and changes"）。社区讨论焦点高度集中在 **MCP 生态**上：OAuth/Entra 认证问题（跨 Windows/macOS/WSL2 多平台）、企业策略误拦截，以及云端代理与插件系统的集成缺陷是企业用户的主要痛点。安全软件冲突（Cortex XDR 误杀 shell）也引发关注。

---

## 🚀 版本发布

- **v1.0.114**（2026-11-18）：官方仅注明 "Fixes and changes"，未公布详细变更日志。
  https://github.com/github/copilot-cli/releases

---

## 🔥 社区热点 Issues（Top 10）

1. **[#1595](https://github.com/github/copilot-cli/issues/1595)** 企业版策略误拦截模型列表加载（30 评论 / 11 👍）
   长期未决的老牌 Issue：拥有有效 Enterprise 订阅却无法执行 `/models`，报 "access denied by Copilot policy"。讨论热度最高，自 2 月持续至今，企业用户体验受损明显。

2. **[#5478](https://github.com/github/copilot-cli/issues/5478)** Cortex XDR 将 Copilot 调用 git 判定为 "parent_process_spoofing" 并杀死整个 shell
   企业安全软件与 CLI 的兼容性冲突，直接导致用户无法在有 git 仓库的目录使用 Copilot。

3. **[#4017](https://github.com/github/copilot-cli/issues/4017)** MCP OAuth：第三方 HTTP 服务器取消 host-token 后浏览器授权流程永不启动
   Desktop 应用中 Atlassian、incident.io 等第三方 MCP 服务器静默失败——无弹窗、无报错，调试体验极差。

4. **[#5341](https://github.com/github/copilot-cli/issues/5341)**（已关闭）企业托管策略刷新超时导致 CLI 启动/`--resume` 挂起
   EMU 账户 + `forceRemoteSettingsRefresh` 场景下 CLI 无限挂起，已随新版本修复关闭，值得关注是否彻底解决。

5. **[#5464](https://github.com/github/copilot-cli/issues/5464)**（已关闭）stdio MCP 服务器启动超时后 legacy `initialize` 回退被拒（-32022）
   涉及 MCP Python SDK 2.3.0 的协议握手兼容性问题，对自建 MCP 服务器开发者影响大，近期快速关闭。

6. **[#5473](https://github.com/github/copilot-cli/issues/5473)** Windows 凭据管理器中 `copilot-keychain-chunk` 残留堆积导致全系统凭据存储耗尽
   影响面超出 Copilot 本身——连带破坏了其他工具的登录，属于较严重的资源泄漏。

7. **[#5155](https://github.com/github/copilot-cli/issues/5155)** "Registry only" MCP 策略下云端代理静默丢弃所有 repo 配置的 MCP 服务器
   代理桥接配置无法被指纹识别，企业策略与本地配置的兼容性空白。

8. **[#5151](https://github.com/github/copilot-cli/issues/5151)** 回归：工具定义膨胀至 ~260K tokens，Sol 模型在默认上下文下首个 prompt 前即被拒
   上下文预算管理失控的回归问题，直接影响可用性。

9. **[#5380](https://github.com/github/copilot-cli/issues/5380)** 通过 `create_session` 创建的会话不启动扩展，直到用户手动切换
   会话管理 API 与扩展系统脱节，影响多会话工作流。

10. **[#5402](https://github.com/github/copilot-cli/issues/5402)** MCP Entra 静默登录使用 `/common` authority，单租户应用失败（AADSTS50194）
    自 1.0.107 起每次会话都需手动 `/mcp auth`，Azure DevOps MCP 用户体验显著退化。

---

## 🔧 重要 PR 进展

过去 24 小时内无 PR 更新，本节省略。

---

## 📈 功能需求趋势

从近期 Issues 提炼的热门方向：

1. **MCP 认证健壮性**（最高频）：Entra ID 多租户/访户支持（#5157、#5402）、OAuth 回退到浏览器流程（#5452）、token 交换失败静默卡住（#5350）
2. **MCP 工具延迟加载**：多 Issue 反映 toolSearch 开启后工具仍全量注入上下文（#5195、#5481），与上下文预算问题（#5151）叠加
3. **插件/扩展 API 能力**：稳定的 turn ID 暴露（#5487）、MCP 启动完成事件钩子（#5458）、Agent Plugins 格式支持 OAuth 配置（#5410）
4. **ACP / IDE 集成**：`--acp` 模式无法发现 IDE、无法加载 Connectors（#5447、#5397）
5. **子代理 MCP 权限**：child agent 工具发现范围错误（#5191）、委托任务无法完成 OAuth 认证（#5437）
6. **启动性能与异步加载**：#5090 反映大仓库启动需同步等待 MCP/插件加载

---

## ⚠️ 开发者关注点

- **企业环境是重灾区**：策略误拦截（#1595、#5155）、EMU 账户挂起（#5341）、安全软件冲突（#5478）集中出现在企业版用户中
- **跨平台认证一致性差**：Windows（WAM/OneAuth、凭据堆积）、macOS（keychain 重复弹窗 #5434、并发登录被拒 #5250）、WSL2（token 交换失败 #5350）各有独立的认证故障模式
- **静默失败缺乏可观测性**：多条 Issue 提到底层错误仅在 debug 级别日志可见（#5347、#4017），排障成本高
- **版本迭代引入回归**：1.0.107/1.0.109 前后多次出现认证行为变化，建议企业用户升级前在非关键环境验证 MCP 集成

---
*本报告基于过去 24 小时 GitHub 公开数据自动汇总，链接均可直接访问原始 Issue。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期：** 2026-11-19 | **数据来源：** [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

## 📌 今日速览

今日社区整体较为平静：过去 24 小时无新版本发布，无 Issue 更新，仅有 1 条 PR 动态。唯一值得关注的动态是 Zed 编辑器集成文档更新 PR #1178 已关闭，意味着 Kimi CLI 在 Zed 中的使用指引已定稿。

---

## 🚀 版本发布

过去 24 小时无新版本发布。

---

## 🔥 社区热点 Issues

过去 24 小时无 Issue 更新，本期暂无热点内容。

---

## 🔧 重要 PR 进展

**1. [#1178](https://github.com/MoonshotAI/kimi-cli/pull/1178) — docs(ides): 更新 Zed 中使用 Kimi CLI 的说明（已关闭）**
- **作者：** @yeskunall
- **时间线：** 创建于 2026-02-18，最近更新于 2026-11-18
- **内容：** 重写了在 Zed 编辑器中使用 Kimi Code CLI 的文档指引，替换了原有说明。该 PR 历经约 9 个月最终关闭，表明官方文档对 IDE 集成场景持续投入维护，Zed 用户的接入体验将得到改善。

> 其余 PR 过去 24 小时内无更新。

---

## 📈 功能需求趋势

本日无新增 Issue，无法提取实时需求趋势。结合近期 PR 方向可观察到：

- **IDE 集成** 仍是文档与功能迭代的重点方向（Zed、VS Code 等编辑器的接入体验）。

---

## 🧑‍💻 开发者关注点

今日社区活跃度较低，暂无新的痛点反馈。建议持续关注 Zed 文档更新落地后的用户反馈，以及后续版本发布动态。

---

*本日报基于 GitHub 公开数据自动生成，数据截至 2026-11-19。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-19

## 📌 今日速览

今日无新版本发布，社区焦点集中在 v2.3.x 系列的稳定性问题上：Windows 桌面端渲染器栈溢出导致工具调用无法执行（#64676）、ACP 协议在 Windows 上全面挂起（#64686）两个高严重度缺陷引发关注。PR 方面，维护者 jlongster 亲自下场恢复 `todo` 实验特性仅限 opt-in 的设计（#64775），同时 kitlangton 提交了一项重要的架构重构——文件工具改为使用其解析路径所属的环境（#64774），为多环境/远程工作区铺路。

---

## 🔥 社区热点 Issues（Top 10）

**1. [#37216](https://github.com/anomalyco/opencode/issues/37216) TUI 国际化支持（26 评论）**
TUI 包所有字符串硬编码英文，而 app/desktop/console 已支持 17+ 语言。运行半年的老需求，讨论热度持续第一，非英语用户体验的核心痛点。

**2. [#41763](https://github.com/anomalyco/opencode/issues/41763) ALSA 错误刷屏破坏 TUI 显示（16 评论，2.0 已复现）**
无声音 Linux 主机上滚动斜杠命令选择器会反复初始化 ALSA，诊断信息直接打印在 TUI 上污染界面。

**3. [#52941](https://github.com/anomalyco/opencode/issues/52941) 桌面端文件树/预览显示过期内容（15 评论，已复现）**
Agent 修改文件后 Review 面板不刷新，已打开的预览页签甚至重开后仍显示旧内容——直接影响核心审查工作流。

**4. [#64676](https://github.com/anomalyco/opencode/issues/64676) Desktop 2.3.2 工具调用不执行，渲染器栈溢出（4 评论）**
Windows 桌面端 agent 回复退化为重复闭合标记后被截断，伴随 `RangeError: Maximum call stack size exceeded`。降级到 2.2.7 可规避，疑似 2.3.x 回归。

**5. [#64686](https://github.com/anomalyco/opencode/issues/64686) ACP 在 Windows 上所有 session 方法永久挂起（severity:high）**
根因是 Bun 的 fetch 在 Windows 上被 `/global/event` SSE 流饿死。IDE 集成用户（IDE-ACP）受影响最大，TUI 不受波及。

**6. [#43039](https://github.com/anomalyco/opencode/issues/43039) `opencode serve` 增加 `--no-password` 标志（9 评论，👍 38）**
V2 serve 默认强制鉴权，社区强烈要求提供关闭选项（38 个赞为今日最高）。自托管/内网场景的普遍诉求。

**7. [#64724](https://github.com/anomalyco/opencode/issues/64724)（已关闭）模型输出含 `<|im_end|>` 时会话中断（9 评论）**
Qwen3.8-Flash-Next 等模型在思考中输出特殊 token 导致 OpenCode 停止响应。已快速关闭，可能已有修复。

**8. [#64655](https://github.com/anomalyco/opencode/issues/64655)（已关闭）Android/Termux 下 `serve --service` 长会话反复重启**
PRoot 环境中 inotify 文件监视器问题导致服务循环重启，移动端长时运行场景的代表性问题。

**9. [#55298](https://github.com/anomalyco/opencode/issues/55298) Claude "progress update" 思考块从不显示（已复现）**
Claude 5.5 及 Fable/Mythos 5+ 将工具调用间的简短说明作为 progress update thinking block 发送，OpenCode 不渲染，用户看不到 agent 的过程性说明。

**10. [#64745](https://github.com/anomalyco/opencode/issues/64745)（已关闭）凭据明文暴露 + 破坏性 `gh api` 变更免确认自动批准**
安全类报告：工具 I/O 和日志中凭据明文存储（CWE-532/200），叠加 `gh api` 危险操作自动批准，值得运维用户留意。

---

## 🛠 重要 PR 进展（Top 10）

**1. [#64774](https://github.com/anomalyco/opencode/pull/64774) refactor(core): 文件工具使用其解析路径所属的环境**（kitlangton）
架构级重构：文件工具不再假设会话只有单一环境，而是询问路径本身所在的本地磁盘或远程工作区。多环境支持的前置工作。

**2. [#64775](https://github.com/anomalyco/opencode/pull/64775) fix(core): 恢复 todo 特性仅限 opt-in**（jlongster）
修正 #64761 的失误：实验性 `todowrite` 工具在所有构建（含本地/开发）默认关闭，`OPENCODE_FLAGS=all` 也会跳过它。

**3. [#64437](https://github.com/anomalyco/opencode/pull/64437) feat(codemode): 可嵌入的 Rust 移植版**
新增 `packages/codemode-rust`（crate `psychoscript`），让 Rust 程序无需 Bun/Node 即可嵌入 Code Mode。

**4. [#56942](https://github.com/anomalyco/opencode/pull/56942) fix(core): 在 ai-sdk wire 边界丢弃无 provider 内容的 assistant 轮次**
接续老 Issue #23260：修复 `content: []` 空内容导致 Bedrock `ValidationException` 等硬错误的遗留半边问题。

**5. [#64492](https://github.com/anomalyco/opencode/pull/64492) fix(ai): chunkTimeout 只计时模型输出，不计 keep-alive**
修复 Zen 流式调用静默 30 分钟不报错的问题——超时计时逻辑错误导致挂死。

**6. [#63542](https://github.com/anomalyco/opencode/pull/63542) fix(desktop): 远程服务端口被占用时 SSH 恢复**
SSH 断开后重连因端口占用失败的问题修复，提升远程工作区稳定性。

**7. [#64770](https://github.com/anomalyco/opencode/pull/64770) feat(core): 图像生成改为后台任务**
与视频一致，`POST /api/experimental/generate/image` 改为异步后台作业。

**8. [#64718](https://github.com/anomalyco/opencode/pull/64718) fix(tui): 恢复暂存 prompt 的输入模式**
暂存草稿现在连同输入模式（如普通/增强模式）一起保存和恢复。

**9. [#64764](https://github.com/anomalyco/opencode/pull/64764) feat(core): `name@latest` 插件自动更新**
以 `@latest` 声明的插件自动升级，其余保持现状。

**10. [#64137](https://github.com/anomalyco/opencode/pull/64137)（已合并）fix(service): Windows 管道 spawn "access denied" 重试**
修复 Windows 上使用 Microsoft Store 版 PowerShell 7 时进程创建失败的问题。

---

## 📈 功能需求趋势

- **国际化**：TUI 本地化（#37216）长期呼声最高
- **鉴权灵活性**：serve 免密/自定义认证（#43039，👍 38）
- **细粒度回滚**：仅撤销消息保留文件变更（#7963，👍 13）
- **多会话工作流**：会话分屏视图（#58245），对标 Claude Code Desktop
- **非交互凭据管理**：Windows Credential Manager/DPAPI 集成（#64773）
- **插件生态**：自动更新（#64764）、插件沙箱（#64766）
- **可嵌入性**：Rust 版 Code Mode（#64437），扩展宿主语言边界

## ⚠️ 开发者关注点

1. **Windows 平台质量洼地**：今日多个高严重度问题集中在 Windows（渲染器栈溢出 #64676、ACP 挂起 #64686、路径分隔符导致 check 脚本失败 #64740、管道 spawn 权限 #64137），Windows 用户升级 2.3.x 需谨慎。
2. **流式稳定性**：长会话静默挂死（#64492）、`<|im_end|` 中断（#64724）、免费模型限流冷却升级至 9-10 分钟（#64754）。
3. **缓存/刷新一致性**：文件树过期（#52941）、本地文件预览不刷新（#64777）——agent 编辑后 UI 不同步是跨端通病。
4. **免费层模型可靠性**：多名用户反馈 free-tier 限流与模型启用提示不清（#64702、#64754）。
5. **Agent 行为合规**：越权执行、忽略指令的报告（#64695）提示需收紧工具审批边界。

---
*数据来源：github.com/anomalyco/opencode · 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-11-19）

## 📌 今日速览

今日发布 v0.28.0-nightly 版本，主线聚焦 **1.0 Preview 事件驱动内核落地**（#17045，P1）与多项核心稳定性修复。数据完整性成为热点：JSONL 转录损坏（#17747）、异步 hook 上下文无限累积等关键 bug 均有对应 PR 推进。QQ 渠道相关 PR（#15450）已 merge-ready 但停滞 72 小时，社区呼吁维护者介入。

---

## 🚀 版本发布

**v0.28.0-nightly.20261118.d9ac287c9f**
- 包含 managed-agent `/loop` 定时触发的全栈 E2E 测试（PR #17506）及 verify-pr 相关修复。属于 0.28.0 线的每日 nightly 构建。

---

## 🔥 社区热点 Issues（Top 10）

1. **[#17045](https://github.com/QwenLM/qwen-code/issues/17045)** — 1.0 Preview 循环内核分片落地（P1）
 核心路线图：将事件驱动内核从 `v1.0.0-preview` 逐面迁移到 `main`，社区高度关注（24 条评论）。配套的遗留项跟踪见 [#17284](https://github.com/QwenLM/qwen-code/issues/17284)，冻结日为 11-21。

2. **[#17747](https://github.com/QwenLM/qwen-code/issues/17747)** — Transcript JSONL 写入损坏（P1）
 两条记录粘连导致父链断裂，直接影响会话历史完整性。wenshao 当天提修复 PR #17771，响应迅速。

3. **[#17741](https://github.com/QwenLM/qwen-code/issues/17741)** — main 分支 export 字节预算超标（P1，已关闭）
 仅超标 429 字节但导致三条 CI 红线，阻塞所有 PR。已修复关闭，但暴露出预算门禁的脆弱性。

4. **[#14724](https://github.com/QwenLM/qwen-code/issues/14724)** — Managed Agent CI 长期失败（463 条评论）
 持续一个月的老大难问题，标记 autofix/skip，累计评论数最高，反映 CI 治理压力。同类：[#11680](https://github.com/QwenLM/qwen-code/issues/11680)、[#11678](https://github.com/QwenLM/qwen-code/issues/11678)。

5. **[#17750](https://github.com/QwenLM/qwen-code/issues/17750)** — ToolPublicationContract 与 networknt json-schema-validator 2.x 不兼容（P2）
 宿主应用嵌入 managed-agent-server 时抛 `NoClassDefFoundError`，影响 SDK 嵌入方升级。

6. **[#17774](https://github.com/QwenLM/qwen-code/issues/17774)** — 模型频繁用 XML 而非 JSON 发起工具调用（P3）
 长时间运行场景下反复中断回合，疑似近期版本回归，影响实际使用体验。

7. **[#17757](https://github.com/QwenLM/qwen-code/issues/17757)** — “ask permission” 设置被模型忽略（P2）
 权限控制失效是可信度问题，社区敏感，等待更多信息确认。

8. **[#17167](https://github.com/QwenLM/qwen-code/issues/17167)** — QQ 渠道出站媒体 PR 停滞 72 小时（P3）
 #15450 已被判定 merge-ready，暴露出 review 瓶颈，贡献者体验问题。

9. **[#17245](https://github.com/QwenLM/qwen-code/issues/17245)** — llama.cpp server 频繁超时（P2）
 本地部署用户任务无法完成、断连后从头重试，对比 opencode 可正常工作。

10. **[#17727](https://github.com/QwenLM/qwen-code/issues/17727)** — 409 后重试被 anti-replay 拒绝，无用户恢复路径（P2）
 Managed 会话首条消息提交失败的死锁场景，可用性缺陷。

---

## 🔀 重要 PR 进展（Top 10）

1. **[#17771](https://github.com/QwenLM/qwen-code/pull/17771)** — 中断追加后为 JSONL 记录补分隔符，修复 #17747 的转录损坏。
2. **[#17775](https://github.com/QwenLM/qwen-code/pull/17775)** — GitHub 渠道账本绑定注册身份，对齐 WeCom/DingTalk 适配器架构，关闭跨所有权重放窗口。
3. **[#17736](https://github.com/QwenLM/qwen-code/pull/17736)** — 限制异步 hook 上下文块总量，防止向模型注入兆级无关输出。
4. **[#17665](https://github.com/QwenLM/qwen-code/pull/17665)** — PR-watch 绑定会话私有注入：CI 变红、merge 冲突等事件主动推送进对应 Managed Session，自动化工作流亮点。
5. **[#17677](https://github.com/QwenLM/qwen-code/pull/17677)** — Daemon 重启恢复收件箱：列出未结算 prompt 的会话并批量续跑，提升长任务韧性。
6. **[#17500](https://github.com/QwenLM/qwen-code/pull/17500)** — 原生屏幕阅读器呈现模式，无障碍方向的重要投入。
7. **[#17533](https://github.com/QwenLM/qwen-code/pull/17533)** — Web Shell worktree Codex 对齐 P6：携带元数据契约 + snapshot-then-delete 清理。
8. **[#17711](https://github.com/QwenLM/qwen-code/pull/17711)** — 关闭 artifact 汇总六项遗留缺陷，覆盖 side-records-only 会话的首开计数。
9. **[#17594](https://github.com/QwenLM/qwen-code/pull/17594)** — 一次性关闭 managed `/loop` 六项延迟 review 发现，收敛 posture。
10. **[#17779](https://github.com/QwenLM/qwen-code/pull/17779)** — 记录 workspace artifact 库已合入状态（#17728），配套 follow-up 见 [#17778](https://github.com/QwenLM/qwen-code/issues/17778)。

---

## 📈 功能需求趋势

- **Agent 循环内核与 1.x 架构演进**：#17045/#17284 是当前最高优先级主线，session-management 成为最密集的 scope 标签。
- **渠道集成（QQ/DingTalk/GitHub/WeCom）**：媒体收发、注册身份绑定、mid-turn 消息注入（#15630 已交付），渠道生态持续扩张。
- **Web Shell 体验**：归档会话搜索/排序（#17772）、消息引用（#12682）、大文件虚拟化、worktree Codex 对齐，UI 需求活跃。
- **无障碍与开发者体验**：屏幕阅读器模式（#17500）、自定义主题可配置性（#17724）。
- **可靠性与测试治理**：deflake 系列（#17699、#17761）、CI Failure Patrol 自动化、字节预算门禁。

---

## ⚠️ 开发者关注点

1. **会话数据完整性**：JSONL 损坏、anti-replay 死锁、daemon 重启恢复——长时运行场景的鲁棒性是反复出现的痛点。
2. **CI 稳定性拖累协作**：多个 main 分支 CI 长期失败 issue（累计 500+ 评论），所有 PR 被迫继承红线。
3. **Review 吞吐瓶颈**：merge-ready PR 停滞 72h+，贡献者流失风险。
4. **本地/自定义后端兼容性**：llama.cpp 超时、XML 工具调用异常，非官方模型接入体验退化。
5. **权限控制可信度**：设置被模型忽略的报告需优先核实。

**建议关注**：#17045 的 11-21 冻结节点将是未来几天的关键事件。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*