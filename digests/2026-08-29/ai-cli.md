# AI CLI 工具社区动态日报 2026-08-29

> 生成时间: 2026-08-29 02:48 UTC | 覆盖工具: 7 个

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

**数据基准日：2026-08-29** ｜ 覆盖 7 款主流 AI CLI 工具的社区动态

---

## 一、生态全景

当前 AI CLI 工具已集体从"功能竞赛"进入**治理与打磨期**：本期各工具均未推出颠覆性能力，重心转向安全加固、稳定性修复与平台兼容。三条主线贯穿全生态：**安全左移**（Gemini 出现疑似安全审计集中产出，Kimi 当日修复 MCP 权限旁路，OpenCode 连续合入权限钩子修复）；**多智能体可靠性普遍不成熟**（Gemini 子代理"假成功"与无限挂起、Claude Code 子代理视图错乱、Codex 推进 multi-agent 稳定性修复）；**发布/更新管线成为共性风险敞口**（Claude Code 三平台更新失败、Codex Windows 完全阻断、Copilot v1.0.81 回归集中显现）。同时，竞争维度正从模型能力转向 MCP 生态整合、权限/成本可控性与本地模型兼容。

---

## 二、各工具活跃度对比

| 工具 | Issue 动态（24h） | PR 动态（24h） | Release | 热度峰值信号 |
|---|---|---|---|---|
| **Claude Code** | ~50 条更新 | **仅 1 条**（外部贡献近乎为零） | 1（v2.1.251） | #85891（90👍/41💬） |
| **OpenAI Codex** | 高热度（多条 40+💬） | 大量，但**全部由 copyberry[bot] 自动化产出** | **6 个 alpha**（0.151.0 系列） | #40752（51👍/85💬） |
| **Gemini CLI** | Top 10 含 4 个 P1 | 安全加固集群 4+ 条 | 1 nightly（含安全修复） | #22323（P1，13💬） |
| **Copilot CLI** | 22 条 | 未披露 | 1（v1.0.82-1） | #4612（13GB 日志事故） |
| **Kimi Code CLI** | 7 条（4 闭/3 开） | 少量（1 条依赖升级） | 0 | #2625 当日报告当日关闭 |
| **OpenCode** | 多条长尾热议 | **10+ 条，6 条已合并** | 2（v1.18.24/25） | #29079（52👍/119💬） |
| **Qwen Code** | 50 条 | **50 条** | 3（v0.22.3 正式版 + nightly + cua-driver） | Web Shell 大型 cutover 后回归集中 |

> 数据盲区说明：Codex、Gemini、Qwen 的完整 Issue/PR 计数未在源报告中披露，上表以可验证信号为准。

---

## 三、共同关注的功能方向

**1. MCP 集成的可靠性与安全（7 家中 6 家涉及）**
- **Claude Code**：连接器"假连接"（#61682）、启动后无重试机制（#90494）
- **Kimi CLI**：MCP 工具调用绕过敏感文件防护，auto-approve 下可任意读文件（#2625，高危）
- **Gemini CLI**：MCP OAuth 修复 IdP

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据来源**：github.com/anthropics/skills ｜ **数据截止**：2026-08-29

> 方法论说明：本批 PR 数据中评论数缺失，排行依据数据源给定热度排序，并结合关联 Issue 讨论量（评论数/👍数）交叉验证。所有列出 PR 截至数据日均为 **OPEN** 状态。

---

## 一、热门 Skills 排行（PR Top 8）

| # | Skill | 核心功能 | 讨论热点 | 状态 |
|---|-------|---------|---------|------|
| 1 | **skill-creator 评估管线修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 `run_eval.py` 永远报告 0% recall 的缺陷 | 关联 Issue [#556](https://github.com/anthropics/skills/issues/556)（12 评论，10+ 独立复现）：描述自动优化循环实际在“对噪声优化”，是 skill-creator 最严重的可靠性问题 | OPEN |
| 2 | **document-typography 排版质控** [#514](https://github.com/anthropics/skills/pull/514) | 防止 AI 生成文档的孤行、寡段落、编号错位 | “用户很少主动要求好排版”——proactive（主动式）质量 Skill 的代表方向 | OPEN |
| 3 | **Hivemind 多智能体编排** [#1628](https://github.com/anthropics/skills/pull/1628) | Claude Code 作为唯一 planner/reviewer，将机械工作委派给免费模型的 headless worker | 核心论点：“昂贵模型的上下文才是稀缺资源”——上下文经济学视角的编排方案 | OPEN |
| 4 | **ODT 文档 Skill** [#486](https://github.com/anthropics/skills/pull/486) | OpenDocument 创建、模板填充、转 HTML | 补齐 docx/pdf 之外的开放格式（ODF/ISO 标准）生态空白 | OPEN |
| 5 | **skill-quality/security-analyzer 元技能** [#83](https://github.com/anthropics/skills/pull/83) | 五维度 Skill 质量评估 + 安全扫描 | “用 Skill 审计 Skill”——生态自我治理的元层面工具 | OPEN |
| 6 | **self-audit 自审计** [#1367](https://github.com/anthropics/skills/pull/1367) | 交付前机械文件校验 + 四维推理质量门禁 | 与 Issue [#1385](https://github.com/anthropics/skills/issues/1385)（质量门禁管线提案）形成呼应 | OPEN |
| 7 | **testing-patterns 测试 Skill** [#723](https://github.com/anthropics/skills/pull/723) | Testing Trophy 哲学、AAA 单元测试、React Testing Library 全栈覆盖 | 代码质量工作流标准化的持续需求 | OPEN |
| 8 | **ServiceNow 平台 Skill** [#568](https://github.com/anthropics/skills/pull/568) | 覆盖 ITSM/ITOM/SecOps/CSDM/IntegrationHub 的企业平台助手 | 2026-08-12 仍在更新，企业级垂直集成的典型样本 | OPEN |

---

## 二、社区需求趋势（Issues 提炼）

1. **信任与安全治理（最热议题）** — [#492](https://github.com/anthropics/skills/issues/492)（43 评论）社区 Skill 伪装 `anthropic/` 官方命名空间分发，构成权限提升的信任边界漏洞；[#1175](https://github.com/anthropics/skills/issues/1175) 质疑在 SKILL.md 内编写权限逻辑的安全性。**诉求：命名空间隔离 / 签名验证 / 权限审计机制**。

2. **组织内分发与共享** — [#228](https://github.com/anthropics/skills/issues/228)（16 评论）：当前需经 Slack 传 .skill 文件 + 手动上传，**诉求：组织级 Skill 库与直接分享链接**。

3. **skill-creator 工具链跨平台可靠性** — [#556](https://github.com/anthropics/skills/issues/556)（12 评论）：eval 脚本 0% 触发率，Windows 近乎不可用（#1099/#1050/#1298 三个修复 PR 并存）。**诉求：可用的评估基建**。

4. **上下文窗口效率** — [#1487](https://github.com/anthropics/skills/issues/1487)：claude-api Skill 单次注入 ~156k token 耗尽上下文；[#189](https://github.com/anthropics/skills/issues/189)（9 👍）插件重复安装导致 Skill 冗余；[#1329](https://github.com/anthropics/skills/issues/1329) 提议 compact-memory 符号化压缩 agent 状态。**诉求：渐进式加载与去重**。

5. **质量门禁 / 自审计** — [#1385](https://github.com/anthropics/skills/issues/1385)、[#202](https://github.com/anthropics/skills/issues/202)：任务前校准 → 对

---

# Claude Code 社区动态日报
**日期：2026-08-29** | 数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## 📌 今日速览

Claude Code 发布 **v2.1.251**，新增模型切换前后置 Hook 事件（`PreModelSwitch`/`PostModelSwitch`）及子代理工具调用的实时远程流式传输，Hook 体系进一步强化。社区侧，Windows 桌面端问题持续发酵——置顶窗口 Bug（[#85891](https://github.com/anthropics/claude-code/issues/85891)）以 90 个 👍、41 条评论成为本周最热 Issue；同时跨平台自动更新引发的启动失败问题集中暴露。今日新增的多条 Issue 聚焦 MCP 连接生命周期与 Windows Hooks 执行缺陷，值得开发者关注。

---

## 🚀 版本发布

### v2.1.251
**核心更新：**
- 新增 `PreModelSwitch` / `PostModelSwitch` Hook 事件，支持**拦截（block）、确认或注解模型切换操作**——为权限管控和成本审计提供了官方钩子
- `SessionStart` resume 类 Hook 现在可接收**会话过期状态与预估 re-cache 成本**，恢复长会话前可做前置决策
- 前台子代理的工具调用与结果现可**实时流式传输至 Remote Control**，远程监控子代理行为不再有黑盒延迟

> 点评：模型切换 Hook 是企业级部署的刚需功能，配合 re-cache 成本预估，长会话场景下的成本控制能力显著增强。

---

## 🔥 社区热点 Issues

**1. [#85891](https://github.com/anthropics/claude-code/issues/85891) — Windows 11 桌面端窗口强制置顶，无关闭选项**
`OPEN` | 👍 90 | 💬 41 | 本日最热
主窗口表现为 topmost 窗口，遮挡其他应用且无设置可关闭。作为 #66516 的 Windows 对应问题，已积累 90 个 👍，是社区呼声最高的桌面端 UX 问题。#88093（👍 19）等多条重复 Issue 表明影响面持续扩大。

**2. [#13340](https://github.com/anthropics/claude-code/issues/13340) — global/local settings.json 中的 allow 权限未被生效**
`OPEN` | 👍 51 | 💬 26 | 存续超 8 个月
自 2025-12 开放至今的老牌核心 Bug：权限白名单配置被无视，直接冲击 CI/自动化场景的可预测性。长期未修复，社区不满情绪在评论中持续累积。

**3. [#61682](https://github.com/anthropics/claude-code/issues/61682) — Cowork 中 GitHub 连接器显示"已连接"但无任何工具暴露**
`OPEN` | 💬 27 | 更新于今日
Windows 11 + app v1.8555.2.0 下，MCP 连接器状态与实际能力脱节，"假连接"问题让集成工作流形同虚设。

**4. [#90473](https://github.com/anthropics/claude-code/issues/90473) — v2.1.243 在 Linux 上 main() 前段错误（SIGSEGV）**
`OPEN` | `regression` | `has repro` | 昨日新增
打包的分配器 interpose 了 glibc 的 `free()`，在 `__newlocale` 中崩溃，Manjaro 上 v2.1.243 完全无法启动，v2.1.241 正常。**由自动更新静默引入的回归**，Linux 原生安装用户受影响。

**5. [#89680](https://github.com/anthropics/claude-code/issues/89680) — Windows 静默更新残留孤儿进程，新版无法启动（0x80070020）**
`OPEN` | `has repro` | 更新于今日
更新器残留的子进程持有旧版 AppX 容器，导致新版启动报错直至重启。同源问题 [#89687](https://github.com/anthropics/claude-code/issues/89687) 报告更新器在退出时向活动容器强制注册，注销前无法启动。

**6. [#88094](https://github.com/anthropics/claude-code/issues/88094) — Remote Control 被默认开启**
`OPEN` | 💬 6
远程控制功能默认启用引发隐私与安全争议，用户主张高风险能力应显式 opt-in 而非 opt-out。

**7. [#71942](https://github.com/anthropics/claude-code/issues/71942) — macOS 自动更新删除运行中的 App Bundle，Full Disk Access 授权失效**
`OPEN` | `has repro`
会话运行中更新会删掉正在执行的 `claude.app`，导致已授予的磁盘完全访问权限被吊销直至重启。与 #89680 共同指向**跨平台更新机制的可靠性缺陷**。

**8. [#90494](https://github.com/anthropics/claude-code/issues/90494) — MCP 服务器在 Claude Code 启动后才就绪则永不连接**
`OPEN` | `has repro` | 今日新增
MCP 连接仅在进程启动时尝试一次，失败被缓存整个生命周期，无重试机制；`/mcp` 重连报 "No token data found"。对启动顺序不受控的本地 MCP 场景是硬伤。

**9. [#90495](https://github.com/anthropics/claude-code/issues/90495) — Windows 上 exec-form Hook 参数被丢弃，仍经 bash.exe 路由导致崩溃**
`OPEN` | `has repro` | 今日新增
按官方文档将 Hook 从 shell 形式改为 exec 形式后，`args` 数组被忽略且仍走 bash.exe，触发 `eval_stdin` 崩溃。Windows Hooks 实现与文档承诺不符。

**10. [#79920](https://github.com/anthropics/claude-code/issues/79920) — 后台会话守护进程 fd 泄漏耗尽文件表，连锁触发内核恐慌**
`OPEN` | 更新于今日
多后台会话累积导致 ENFILE → launchd SIGBUS → macOS 内核崩溃。虽然 👍 为 0，但**问题严重度等级最高**，是稳定性维度不可忽视的隐患。

---

## 🔀 重要 PR 进展

过去 24 小时仅 **1 条 PR** 有更新：

**[#87079](https://github.com/anthropics/claude-code/pull/87079) — fix(security-guidance): 修复 `**` glob 模式无法匹配零深度路径**
`OPEN` | @anishsamant
`_glob_match` 委托给 fnmatch 时裸 `*` 已可跨 `/`，导致 `**/*.ts` 需要字面 `/` 而静默排除顶层文件——**安全规则文件的失败模式是静默不匹配**，属于安全语义修复，建议优先合入。

> 📊 注：本仓库 Issue 活跃（日更新 50 条）但外部 PR 极少（24 小时内仅 1 条），社区贡献路径仍以 Issue 反馈为主，代码贡献基本来自官方团队。

---

## 📈 功能需求趋势

| 方向 | 代表 Issue | 信号强度 |
|---|---|---|
| **当前模型可视化** | [#74349](https://github.com/anthropics/claude-code/issues/74349)（VSCode 扩展无活动模型指示）、[#75047](https://github.com/anthropics/claude-code/issues/75047)（UI 持久显示模型） | 两条独立需求指向同一缺口，CLI 有 `/status` 但 IDE/桌面端缺位 |
| **用量/成本透明化** | [#80261](https://github.com/anthropics/claude-code/issues/80261)（主界面用量指示器，👍 13）、[#83092](https://github.com/anthropics/claude-code/issues/83092)（用量进度条，已关闭）、[#80732](https://github.com/anthropics/claude-code/issues/80732)（`/usage` 数据 API 化，已关闭） | 两条已关闭暗示部分落地，但持久化展示与机器可读接口仍是诉求 |
| **消息队列** | [#34835](https://github.com/anthropics/claude-code/issues/34835)（排队消息，已关闭，💬 20） | 已关闭，或已实现 |
| **自动化治理** | 新版 `PreModelSwitch` Hook 直接回应了模型切换管控需求 | 官方动作与社区诉求对齐 |

**趋势判断：** 社区关注重心正从"功能有无"转向**状态可见性（模型、用量）与行为可控性（权限、Hook）**——这与 v2.1.251 的 Hook 强化方向一致。

---

## ⚠️ 开发者关注点

**1. 自动更新是当前最大信任危机（跨平台）**
- Windows：孤儿进程/容器锁定致启动失败（[#89680](https://github.com/anthropics/claude-code/issues/89680)、[#89687](https://github.com/anthropics/claude-code/issues/89687)、[#90493](https://github.com/anthropics/claude-code/issues/90493)）
- macOS：删除运行中 Bundle 吊销授权（[#71942](https://github.com/anthropics/claude-code/issues/71942)）
- Linux：v2.1.243 分配器回归致全面崩溃（[#90473](https://github.com/anthropics/claude-code/issues/90473)）

> 建议：生产环境可考虑**锁定版本、禁用自动更新**，等待官方对更新管线的系统性修复。

**2. Windows 平台质量问题集中**
置顶窗口（#85891/#88093）、ConPTY 宽度失效（[#80123](https://github.com/anthropics/claude-code/issues/80123)）、ANSI 转义丢失与跨会话输入串扰（[#68465](https://github.com/anthropics/claude-code/issues/68465)）、preview 面板整体崩溃（[#90478](https://github.com/anthropics/claude-code/issues/90478)）、Hook exec-form 失效（#90495）——Windows 用户占据了本日问题清单的近半数。

**3. 后台/多会话架构尚不成熟**
Ctrl+B 挂起后会话不可恢复（[#89666](https://github.com/anthropics/claude-code/issues/89666)）、子代理视图导航错乱（[#90492](https://github.com/anthropics/claude-code/issues/90492)）、后台会话绕过代理配置（[#78444](https://github.com/anthropics/claude-code/issues/78444)）、fd 泄漏引发内核恐慌（#79920）。Agent-view/后台会话是高频迭代区，也是 Bug 高发区。

**4. 权限系统可靠性存疑**
#13340（allow 规则不生效）长期未解，叠加 #88094（Remote Control 默认开启），自动化场景的权限边界可预测性是 CI/CD 用户的核心焦虑。

---

*本报告基于过去 24 小时 GitHub 公开数据自动生成，Issue 状态以生成时刻为准。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# 📊 OpenAI Codex 社区动态日报

**日期：2026-08-29 ｜ 数据来源：github.com/openai/codex**

---

## 一、今日速览

Codex CLI 在过去 24 小时密集发布 **6 个 0.151.0-alpha 预览版**，迭代节奏极快。社区侧，**Windows 桌面端问题持续发酵**——更新后应用无法启动（#40752，85 条评论）成为最高热度议题。PR 动态方面，团队围绕 **MCP 能力增强、安全加固与多代理稳定性**推进了大量改进，且全部由 `copyberry[bot]` 自动化产出，值得关注其工程流程。

---

## 二、版本发布

过去 24 小时发布 6 个 alpha 预览版（Release Notes 均未附详细变更说明）：

| 版本 | 说明 |
|---|---|
| [rust-v0.151.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.12) | 最新预览版 |
| [rust-v0.151.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.11) | — |
| [rust-v0.151.0-alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.10) | — |
| [rust-v0.151.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.9) | — |
| [rust-v0.151.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.8) | — |
| [rust-v0.151.0-alpha.7.1](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.7.1) | — |

> 💡 短期内连续 6 个 alpha 版本，结合 PR 中大量稳定性修复，推测正处于快速修复窗口期。

---

## 三、社区热点 Issues TOP 10

### 🔥 高优先级缺陷

**1. [#40752](https://github.com/openai/codex/issues/40752) — Windows 桌面端更新后无法启动**
85 评论 / 51 👍，今日最热。升级到 v26.820.60940 后报 "Unable to locate Codex CLI"，`.cmd` 包装器触发 spawn EINVAL。作为**完全阻断性回归**，影响大量 Plus 用户，且与多个更新相关 Issue 佐证近期发布质量波动。

**2. [#33776](https://github.com/openai/codex/issues/33776) — ChatGPT.exe 疯狂生成 taskkill/conhost 进程**
37 评论 / 27 👍。单次会话遗留 287 个僵尸进程，引发 **WMI 故障风暴和 DWM 降级**，属系统级影响，长期未解。

**3. [#35050](https://github.com/openai/codex/issues/35050) — GPT-5.6 串行执行独立的 Code Mode 调用**
26 评论 / 40 👍（今日最高点赞）。模型行为层问题：显式批处理可降低 27–45% 权重用量，直击**成本效率**痛点，商业用户高度关注。

**4. [#40968](https://github.com/openai/codex/issues/40968) — Send 按钮永久转圈，提示无法提交**
14 评论。Pro x5 订阅用户在发送后续 prompt 时被完全阻断，基础交互层面的可用性问题。

**5. [#39855](https://github.com/openai/codex/issues/39855) — Windows Remote 新会话信任校验失败**
15 评论。路径格式错误导致每个无项目会话都无法通过 trust verification，**Windows Remote 功能基本不可用**。

### ⚡ 性能与稳定性

**6. [#33786](https://github.com/openai/codex/issues/33786) — 已完成的长会话每几秒被完整重放**
13 评论。app-server 层反复重放线程历史，造成**全系统输入卡顿**，24 核机器也无法幸免，性能架构问题。

**7. [#41339](https://github.com/openai/codex/issues/41339) — AppX 迁移后启动被更新策略阻塞 5+ 分钟**
5 评论。Microsoft Store 打包方式切换引发的连锁回归，与 #40752 共同指向**发布/更新管道问题**。

### 🖥️ 平台能力缺陷

**8. [#39280](https://github.com/openai/codex/issues/39280) — macOS Chrome 标签页可认领但操作全部被策略拦截**
12 评论。浏览器扩展能枚举/认领标签页，但真实页面交互在到达 Chrome 前即被 policy verification 拒绝，Browser Use 在 macOS 上形同虚设。

**9. [#41326](https://github.com/openai/codex/issues/41326) — Computer Use 首次点击即 SIGTRAP 崩溃**
8 评论。`get_app_state` 正常返回后，第一个坐标点击就让 `SkyComputerUseService` 崩溃，Computer Use 可靠性问题再添一

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-08-29** | 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 📌 今日速览

今日发布 nightly 版本 **v0.59.0-nightly.20260829**，合入了受限制模式下 workspace trust 的 fail-closed 安全修复（[#29099](https://github.com/google-gemini/gemini-cli/pull/29099)）。同时，社区出现一批高质量安全加固 PR（防特权提升、OAuth IdP 混淆、NTFS 短路径绕过、SSRF 防护），显示安全审计进入集中修复期。Issue 侧，**Subagent 可靠性**（挂起、误报成功、调度不足）仍是社区最集中的痛点。

---

## 🚀 版本发布

### v0.59.0-nightly.20260829.g0bd1d4397
**[Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.59.0-nightly.20260828.g3c311beac...v0.59.0-nightly.20260829.g0bd1d4397)**

- **fix(core): 强制 fail-closed 工作区信任机制，并在受限模式下过滤 mcpServers**（[#29099](https://github.com/google-gemini/gemini-cli/pull/29099) by @luisfelipe-alt）—— 防止在不受信任或受限环境中服务器启动时执行非预期进程，`@google/gemini-cli-a2a-server` 将不再加载仓库定义的 `mcpServers` 配置。属于安全敏感修复，建议 A2A 部署用户尽快升级。

---

## 🔥 社区热点 Issues（Top 10）

**1. Subagent 触发 MAX_TURNS 后被误报为 GOAL 成功** [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
P1 | 💬 13 | 子代理在达到最大轮次限制、未完成任何分析时，仍上报 `status: "success"` 和 `Termination Reason: "GOAL"`。这种"假成功"会掩盖中断事实，直接误导上层决策，是可观测性层面的核心缺陷。

**2. Generalist agent 无限挂起** [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
P1 | 💬 8 | 👍 8 | 只要 CLI 委派给 generalist agent 就会永久挂起，连创建文件夹这种简单操作也会卡死，用户需等待一小时以上手动取消。临时绕过方案是禁止使用子代理——这实际上架空了多智能体架构。

**3. Shell 命令执行完成后卡在 "Waiting input"** [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
P1 | 💬 4 | 👍 3 | 极简单的命令执行完毕后 CLI 仍显示"等待用户输入"并挂起。与 #21409 同属"卡死"类高频痛点，标签已标记 need-retesting。

**4. Gemini 主动使用 skills 和子代理的频率过低** [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)
P2 | 💬 6 | 用户配置了 gradle、git 等自定义 skills，但模型在做高度相关任务时也不会自动调用，除非显式指令。反映 subagent 调度策略与用户预期的偏差。

**5. 零依赖 OS 沙箱 + 执行后意图路由** [#19873](https://github.com/google-gemini/gemini-cli/issues/19873)
P2 | 💬 8 | 社区提出的重要架构提案：Gemini 3 模型天然擅长链式使用 POSIX 工具，应在不牺牲安全的前提下，通过操作系统级沙箱释放模型的 bash 原生能力。effort/large，属长期方向讨论。

**6. AST 感知的文件读取/搜索/代码库映射** [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)
P2 | 💬 7 | Google 内部工程师发起的 EPIC：评估 AST 感知工具能否精确定位方法边界、减少错位读取、降低 token 噪音。配套调查 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) 推荐以 tilth 或 glyph 为起点。

**7. Auto Memory 对低信号会话无限重试** [#26522](https://github.com/google-gemini/gemini-cli/issues/26522)
P2 | 💬 5 | 提取 agent 若判定会话低价值而跳过 `read_file`，该会话会永远留在索引中被反复唤醒。Auto Memory 已形成 issue 矩阵（另见 [#26516](https://github.com/google-gemini/gemini-cli/issues/26516)、[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)）。

**8. Auto Memory 缺乏确定性脱敏** [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)
P2 | 💬 4 | 安全敏感：当前脱敏依赖提取 prompt 指令，发生在敏感内容已进入模型上下文**之后**。要求改为确定式脱敏并削减日志量。

**9. 工具数超过 128 个触发 400 错误** [#24246](https://github.com/google-gemini/gemini-cli/issues/24246)
P2 | 💬 3 | 启用较多 MCP 服务器时易触顶，社区期望 CLI 智能裁剪工具作用域。MCP 重度用户的实际 blocker。

**10. hooks migrate 事件键名与 Claude Code 不一致** [#29123](https://github.com/google-gemini/gemini-cli/issues/29123)
P2 | 💬 1 | **今日新报**：`EVENT_MAPPING` 将子代理停止事件映射为 `SubAgentStop`（大写 A），而 Claude Code 实际发出的是 `SubagentStop`，导致迁移的 hooks 静默失效。兼容性迁移工具的典型边角 bug。

> 其他值得留意：get-shit-done output hook 导致崩溃（P1，[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)）、browser subagent 在 Wayland 下失败（P1，[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)）、symlink 形式的 agent 文件不被识别（[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)）。

---

## 🔧 重要 PR 进展（Top 10）

**安全加固集群**（多为 8/28 提交，疑似安全审计/VRP 集中产出）：

| PR | 内容 |
|---|---|
| [#29099](https://github.com/google-gemini/gemini-cli/pull/29099) ✅ 已合入 nightly | 受限模式下强制 fail-closed 信任解析 + 过滤仓库级 `mcpServers`，防启动时意外进程执行 |
| [#29115](https://github.com/google-gemini/gemini-cli/pull/29115) | 修复 Windows/POSIX 系统级配置不安全加载，可导致**本地特权提升与跨用户任意命令执行**；引入 PowerShell ACL 校验 |
| [#29117](https://github.com/google-gemini/gemini-cli/pull/29117) | MCP OAuth 回调实现 RFC 9207 Issuer 校验，防御 **IdP 混淆攻击**与令牌泄露 |
| [#29116](https://github.com/google-gemini/gemini-cli/pull/29116) | 处理 NTFS 8.3 短文件名（如 `git~

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期**： 2026-08-29 ｜ **数据来源**： [github.com/github/copilot-cli](https://github.com/github/copilot-cli)

---

## 一、今日速览

今日发布 **v1.0.82-1**，重点改进认证失败的具体错误提示（如 401 Bad credentials），这直接回应了近期集中爆发的企业租户认证问题。过去 24 小时共更新 **22 条 Issues**，其中企业认证（GHEC 数据驻留、企业账号 `-p` 模式）与 TUI 稳定性（事件循环失控、输入失效）成为两大焦点。值得注意的是，v1.0.81 引入的多处回归（chroma-mcp 兼容性、BYOK 模式 `/model` 缺失、模型目录 URL 错误）开始集中显现。

---

## 二、版本发布

### v1.0.82-1（1.0.82-1）

**Fixed**
- 认证失败时展示具体错误信息（如 401 Bad credentials），而非仅提示 `/login`

> **点评**： 这是诊断性改进而非根因修复。结合今日 #4527、#4654、#4650 等企业认证类 Issue 的集中反馈，此版本将帮助用户和官方更快定位问题，但企业租户端点路由错误的根本修复仍待观察。

---

## 三、社区热点 Issues

**1. [#4612](https://github.com/github/copilot-cli/issues/4612) — FileWatch 事件循环失控冻结 TUI，调试日志膨胀至 13 GB**
长驻/恢复会话可能进入紧循环，持续输出 `No connection accepted a host event {"kind":"FileWatch"}`，TUI 完全无响应且日志疯狂增长。**严重度最高**：兼具 UI 冻结与磁盘占满风险，7 条评论显示官方正在积极排查。

**2. [#4480](https://github.com/github/copilot-cli/issues/4480) — Atlassian MCP OAuth 失败（已关闭）**
1.0.79 引入的回归导致 Atlassian 远程 MCP 服务器 OAuth 发现失败（RFC 8414 §3.3 issuer 不匹配）。收获 6 个 👍，今日已关闭，推测已修复，是 MCP 生态兼容性的重要进展。

**3. [#4533](https

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期：2026-08-29 ｜ 数据来源：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)**

---

## 📌 今日速览

今日无新版本发布，社区焦点集中在两条线上：**安全**——一个揭示 MCP 工具调用可绕过内置敏感文件防护、实现任意文件读取的高危 Issue（#2625）在报告当天即被关闭，官方响应迅速；**计费**——付费用户报告 cache_read 每轮计费而 cache_creation 恒为 0，配额消耗放大 10 倍以上（#2626），目前尚无官方回应。此外，Plan 模式死循环 bug（#2623）与 asyncssh 安全依赖升级 PR（#2622）值得关注。

---

## 🚀 版本发布

过去 24 小时无新 Release。

---

## 🔥 社区热点 Issues

> 今日共 7 条 Issue 更新（4 条关闭、3 条开放），以下按重要性全量呈现。

### 1.［安全］MCP 工具调用绕过内置敏感文件防护（已关闭）
**[#2625](https://github.com/MoonshotAI/kimi-cli/issues/2625) ｜ CLOSED ｜ 报告当日即关闭**

- **为什么重要**：内置 Read 工具会拒绝读取 `.env`、SSH 私钥、凭证存储等敏感文件，但 MCP 工具调用**不受此内容级防护约束**；在 auto-approve 权限模式下还会跳过审批提示。任何接受文件路径参数的 MCP 服务器均可借此实现任意文件读取。这是典型的权限模型旁路问题，直接关系 MCP 生态的安全边界。
- **社区反应**：当日创建、当日关闭，响应极快；但仅 1 条评论，修复细节未公开，建议关注后续 changelog。

### 2.［计费］cache_read 每轮计费且 cache_creation 恒为 0，配额消耗放大 10 倍+
**[#2626](https://github.com/MoonshotAI/kimi-cli/issues/2626) ｜ OPEN ｜ 今日新建**

- **为什么重要**：年费订阅用户报告 5 小时配额窗口在轻度使用下数分钟内损失约 40%。CLI usage 明细显示 cache_read 每轮计费、cache_creation 始终为 0——即缓存从未建立却持续按缓存读取收费。这直接影响付费用户核心成本，属于高优先级的商业信任问题。
- **社区反应**：今日新开，暂无回复。需官方确认是计费端 bug 还是缓存持续未命中。

### 3.［bug］Plan 模式死循环：反复调用 Bash echo / ReadFile 而不写计划
**[#2623](https://github.com/MoonshotAI/kimi-cli/issues/2623) ｜ OPEN ｜ v0.38.0 / K3 / Linux**

- **为什么重要**：Plan 模式下模型完成探索后不执行写计划 / ExitPlanMode，而是死循环重复调用 `Bash echo` 与 ReadFile，任务无法推进且持续空耗 token。这是 agent 控制流的核心稳定性问题，K3 模型用户需重点留意。
- **社区反应**：已有 1 条评论，等待维护者确认复现路径。

### 4.［docs］openai_legacy 自建 /v1 端点接入示例三处易错
**[#2624](https://github.com/MoonshotAI/kimi-cli/issues/2624) ｜ OPEN ｜ cursor[bot] 提交**

- **为什么重要**：providers 文档中 `openai_legacy`（Chat Completions 协议）自建接入存在三个高频踩坑点：`type` 必须为 `openai_legacy`（而非 `openai_responses`）、baseURL 需以 `/v1` 结尾、不应走 `/login` 流程。自建网关 / LiteLLM 用户的接入成功率直接受此影响。
- **社区反应**：机器人自动提交的文档改进建议，暂无评论，属低成本高收益的修复项。

### 5.［增强］JetBrains AI Assistant 中 ACP 调用 kimi 无法识别传入文件（已关闭）
**[#1272](https://github.com/MoonshotAI/kimi-cli/issues/1272) ｜ CLOSED ｜ 2 月创建，8-28 关闭**

- **为什么重要**：通过 ACP 协议在 JetBrains AI Assistant 中调用 kimi 时，拖入/附件的文件无法被识别，必须在提示词中写完整路径才能处理，严重破坏 IDE 内交互流畅性。这是 IDE

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报

**日期：2026-08-29** | 数据来源：github.com/anomalyco/opencode

---

## 📌 今日速览

OpenCode 今日连发 v1.18.24 / v1.18.25 两个版本，重点修复 Azure 认证与 Bedrock 推理缓存问题，企业云接入体验显著改善。社区侧，2.0 版本 SQLite 存储无限膨胀问题（数据库达 13GB+）持续发酵，成为当前最受关注的开放性议题。开发层面，核心团队今日合并了多个性能与权限安全相关 PR，流式输出、会话切换延迟等问题得到修复。

---

## 🚀 版本发布

### [v1.18.25](https://github.com/anomalyco/opencode/releases)
- **修复**：Azure CLI 登录不再强制依赖 Bun 运行时，认证流程更顺畅。

### [v1.18.24](https://github.com/anomalyco/opencode/releases)
- **修复**：Bedrock 推理响应不再被缓存为无法回放的空消息。
- **改进**：
  - Azure Provider 支持通过 Azure CLI + Microsoft Entra ID 登录，摆脱 API Key 依赖；
  - V1 开始兼容读取 V2 配置字段，缓解版本升级配置断裂问题。

---

## 🔥 社区热点 Issues

**1. [#29079](https://github.com/anomalyco/opencode/issues/29079) | GPT 模型响应极慢（119 评论 / 52 👍）**
本周讨论热度最高的议题。用户反馈 GPT 5.4 (xhigh) 执行简单任务时响应从数秒到数分钟不等，行为不稳定。119 条评论反映该问题影响面广，目前已关闭，但仍是模型延迟类问题的代表性反馈。

**2. [#33356](https://github.com/anomalyco/opencode/issues/33356) | [2.0] event 表无限增长，opencode.db 达 13GB+（24 评论 / 仍开放）**
长驻实例的事件溯源表从不裁剪和压实，两个实例各膨胀至 ~13GB，磁盘占用率达 99%。这是 2.0 架构下最严重的存储设计缺陷报告，尚未解决，建议长期运行用户密切关注。

**3. [#42700](https://github.com/anomalyco/opencode/issues/42700) | [2.0] TUI 每次启动泄漏 ~21MB .so 文件（仍开放）**
每次启动向 /tmp 泄漏一个 21MB 的共享库且不清理，最终填满 tmpfs 并导致 TUI 启动失败（OpenTUI 库加载错误）。Arch Linux 用户报告，属于资源泄漏类高风险问题。

**4. [#42748](https://github.com/anomalyco/opencode/issues/42748) | message.updated.1 重复序列化 summary.diffs，事件写入复杂度平方级（仍开放）**
与 #33356 同源的深层问题：每次消息更新都写入完整快照（含全量 diff 补丁文本），写入量随更新次数呈 O(n²) 增长。二者共同构成 2.0 存储层的核心技术债。

**5. [#38570](https://github.com/anomalyco/opencode/issues/38570) | 限额计算错误：仅消费 $1.50 却显示 47% 已用（仍开放）**
5 小时限额百分比与实际消费金额严重不符，涉及计费透明度，直接影响用户信任，建议订阅用户自查。

**6. [#5750](https://github.com/anomalyco/opencode/issues/5750) | 多图上传触发 Tool use id 错误（14 评论，已关闭）**
上传 2 张图片即报错的工具调用 ID 错误，讨论充分后已修复关闭，多模态工作流用户可验证。

**7. [#22792](https://github.com/anomalyco/opencode/issues/22792) | vLLM + Qwen3-Coder 触发无限压缩摘要循环（已关闭）**
本地部署用户输入“你好”即触发病态的 compaction 循环，是本地模型兼容性的典型问题，已修复。

**8. [#29397](https://github.com/anomalyco/opencode/issues/29397) | OpenCode Zen 全模型变慢且 Esc 无法中断（已关闭）**
官方托管服务延迟异常 + 双击 Esc 中断失效的组合问题，反映流式中断机制曾存在缺陷。

**9. [#34402](https://github.com/anomalyco/opencode/issues/34402) | 单条 Prompt 2 分钟烧掉 $21 且无输出（已关闭）**
使用 GPT 5.5 Pro 执行深度审计任务时费用一次性耗尽、无任何返回。计费保护与异常任务熔断机制的缺失值得关注。

**10. [#34445](https://github.com/anomalyco/opencode/issues/34445) | 升级后旧会话数据丢失、未迁移（已关闭）**
存储迁移至 opencode.db 时重建数据目录且未迁移历史会话，属于数据丢失级别的事故报告，升级 2.0 前建议备份。

---

## 🔧 重要 PR 进展

**1. [#46058](https://github.com/anomalyco/opencode/pull/46058) | fix(core): 释放已退出 shell 的执行状态（开放中）**
清理滞留的已退出 shell 记录中的执行引用，中断超时 fiber，减少长会话内存驻留。

**2. [#46051](https://github.com/anomalyco/opencode/pull/46051) | fix: 停止在每次 PartUpdated 时克隆 Part（开放中）**
修复 `Session.updatePart` 每次事件都 `structuredClone` 的问题——Part 可达 ~488KB，此前 9.3 万次事件造成大量无谓分配。直接回应性能痛点 #35107。

**3. [#46044](https://github.com/anomalyco/opencode/pull/46044) | fix(app): 降低会话切换延迟（开放中）**
针对首次打开未访问会话时约半秒白屏的优化，目标 v2。

**4. [#46053](https://github.com/anomalyco/opencode/pull/46053) | fix(session): `! cmd` 后台立即执行（已合并）**
Agent 响应期间提交 shell 命令不再排队等待，命令立即启动并显示条目，交互体验显著改善。

**5. [#46031](https://github.com/anomalyco/opencode/pull/46031) | feat(tui): 分支级 review 范围（已合并）**
`/diff` 不再只显示未提交变更，支持按分支/PR 范围审查，弥补“提交后改动从 review 中消失”的缺口。

**6. [#46056](https://github.com/anomalyco/opencode/pull/46056) | fix(core): 工具拒绝显式化（开放中）**
修复被拒绝的嵌套工具在 CodeMode 中变成可捕获 JS 错误、导致程序在用户拒绝后仍继续执行的安全隐患。

**7. [#46050](https://github.com/anomalyco/opencode/pull/46050) | fix(core): 待审批请求复用权限策略（已合并）**
修复"always allow"一键通过时绕过插件 `permission.evaluate` 钩子的漏洞，权限模型更严谨。

**8. [#45544](https://github.com/anomalyco/opencode/pull/45544) | feat(cli): 服务端 CORS 白名单配置（已合并）**
新增 `service set/get/unset cors` 持久化配置及 `serve --cors` 参数，自托管场景的安全性增强。

**9. [#46048](https://github.com/anomalyco/opencode/pull/46048) | fix(core): 有界定时器冲刷短流式突发（已合并）**
模型输出短突发后暂停时，客户端不再干等到下一个 delta，流式“假死”观感得到修复。

**10. [#46047](https://github.com/anomalyco/opencode/pull/46047) | feat(tui): 向 TUI 插件暴露 scrollToMessage（开放中）**
插件生态扩展：支持跳转定位历史消息，配合消息边界标记需求 #37699。

---

## 📈 功能需求趋势

| 方向 | 信号来源 | 说明 |
|---|---|---|
| **企业云认证集成** | v1.18.24/25、#29079 | Azure Entra ID / CLI 登录、Bedrock 兼容成为迭代重点，企业 adopting 信号明显 |
| **存储与资源治理** | #33356、#42748、#42700 | 事件裁剪/压实、临时文件清理是 2.0 架构的刚性需求 |
| **本地与自定义模型支持** | #22792、#25755、#46046 | vLLM / openai-compatible / nvidia 模型兼容性问题密集，本地推理用户群体庞大 |
| **权限与安全模型** | #46056、#46050、#45544 | 工具拒绝语义、权限钩子、CORS 管控持续加固 |
| **插件 API 纵深** | #15680、#46047、#30933 | worktree 生命周期事件、TUI 滚动控制、项目级 MCP 配置等扩展点呼声集中 |
| **Desktop/Web 稳定性** | #34421、#34437、#34223 | 渲染进程卡死、UI 门控逻辑错误多发于 1.17.x 桌面端 |

---

## ⚠️ 开发者关注点

1. **2.0 存储层是最大雷区**：opencode.db 无限膨胀（#33356）+ 平方级事件写入（#42748）+ 升级迁移丢数据（#34445）三条线索叠加，长驻/重度用户应设置磁盘监控并升级前备份 `~/.local/share/opencode`。
2. **资源泄漏需主动排查**：TUI .so 泄漏（#42700）、shell �

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-08-29

> 数据来源：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | 统计窗口：过去 24 小时（Issues 50 条更新 / PR 50 条更新）

---

## 一、今日速览

**v0.22.3 正式版发布**，Channels 新增每会话最多 8 个持久命名任务的管理能力，同日跟进 v0.22.3-nightly 与 cua-driver-rs v0.20.2。**Web Shell 成为当前问题最集中的模块**——大型 UI cutover（PR #9811）后衍生出一批 P1/P2 回归（消息编辑 rewind 错位、会话切换死锁、分组丢失等）。此外，**本地及第三方兼容模型的健壮性**引发高频讨论：llama-server grammar 崩溃（#10435）、网关 HTTP 413 导致长会话报废（#10380）、Anthropic wire 缺流安全保护（#9005）均有对应修复推进中。

---

## 二、版本发布

### [v0.22

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*