# AI CLI 工具社区动态日报 2026-10-22

> 生成时间: 2026-10-21 23:16 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告 · 2026-10-22

## 一、生态全景

AI CLI 工具已全面进入“多 Agent / 托管会话”时代——各头部工具（Claude Code、Codex、Qwen Code、Gemini CLI）均在向子代理编排、云端会话、桌面端整合方向演进。同时，**企业级能力（代理认证、OAuth、可观测性、沙箱）成为新的竞争主战场**。版本迭代节奏极快（多家日发 2+ 版本），但回归问题频发：几乎每个工具今日都有“新版本引入严重回归”的案例，工程质量管理开始跟不上功能扩张速度。

## 二、各工具活跃度对比

| 工具 | Release | 热点 Issues | PR 活跃 | 今日焦点 |
|---|---|---|---|---|
| Claude Code | 2（v2.1.306/307） | ~17 条更新 | 1 | safety_event OTel、stale bot 批量关闭争议 |
| OpenAI Codex | 2（alpha 系列） | ~13 条 | 10+（copyberry bot 密集合入） | macOS #55744 严重回归（👍125）、企业认证 PR 密集 |
| Gemini CLI | 1（v0.67.0 nightly） | 10 | 10+（6 个已合并） | 取消语义修复、容器内 IDE 桥接、Gemini 4 Argon 注册 |
| Copilot CLI | 1（v1.0.102） | 10 | 1 | 新版即现回归（#5223）、vi 模式请求（👍76）被关闭 |
| Qwen Code | 2 nightly + cua-driver v0.26.0 | 10 | 10+ | Managed Agent 爆发式投入（@wenshao 十余 issue/PR） |
| OpenCode | 0 | 10 | 10+（桌面端 UI 密集打磨） | v2 迁移数据丢失、Go 配额争议 |
| Kimi Code CLI | — | 0 | 0 | 无活动 |

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **子代理可靠性** | Gemini（误报 GOAL success #22323、挂起 #21409）、Copilot（600s 超时回归 #5223）、Qwen（上下文泄漏 #15083）、OpenCode（compaction 吞掉 subtask）、Claude（Cowork 归档丢失 #22931） | 状态上报可信、长时任务不中断、上下文隔离正确——多 Agent 架构的最大共性短板 |
| **上下文/压缩管理** | Claude（MCP 误压缩，已修）、Codex（retained reasoning 双重计数 #53309，已修）、Copilot（压缩超时 #5054）、Gemini（>128 工具 400 报错）、OpenCode（#57496） | 压缩时机误判直接推高 token 成本，各家都在修计量精度 |
| **沙箱与安全边界** | Claude（safety_event）、Codex（MITM 凭证限定 #56003）、Gemini（破坏性操作护栏 #22672）、Qwen（权限绕过 P1 #15129、Workspace 沙箱缺失 #15081）、Copilot（ACP 沙箱失效 #5089） | 从“有沙箱”转向“权限模型一致性 + 凭证保护 + 审计” |
| **企业/代理网络环境** | Codex（Windows 407 代理认证、机密 OAuth 客户端）、Copilot（VPN 语音不可用 #3636）、OpenCode（读取无关云凭据 #56200） | 企业网络是公认痛点，Codex 投入最重 |
| **ACP/编辑器集成** | Gemini（ACP 输出截断）、Copilot（ACP OAuth 不持久 #5192） | 非交互协议仍在补课 |
| **Windows/WSL2 体验** | Codex、Copilot、OpenCode、Claude（CRLF #2805 逾期一年+） | 非 macOS 平台系统性二等公民 |

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 企业可观测性、插件/hook 生态、Desktop 一体化 | 企业开发者、重度 Claude 用户 | 闭源快速迭代 + OTel 审计能力，功能广度领先 |
| **Codex** | Dots 多 Agent、企业网络/认证、云互操作 | OpenAI 生态 + 企业用户 | Rust 核心 + bot 驱动高频合入 + 模块化重构（message-board crate） |
| **Gemini CLI** | AST 工具链、取消语义、容器沙箱 | 开源社区、CI/自动化用户 | 开源、工程严谨（系统性修竞态）、架构级提案开放讨论 |
| **Copilot CLI** | BYOK、键位/编辑体验、GitHub 原生集成 | GitHub 生态用户、编辑器集成场景 | 迭代节奏慢（PR 极少），功能请求响应迟缓 |
| **Qwen Code** | Managed Agent 平台化、CUA Driver、记忆系统 | 从 CLI 转向托管多 Agent 平台 | 开源 + 领军人物（@wenshao）系统性规划，路线图最清晰 |
| **OpenCode** | 桌面端 UI 打磨、v2 迁移 | 通用/自托管用户 | 开源 + 模型无关（Go 服务），但 v2 迁移质量拖后腿 |

## 五、社区热度与成熟度

- **高活跃 + 快速迭代**：Codex（issue 反响最强烈，#55744 单日 👍125）、Gemini CLI（官方调研型 EPIC、PR 合并效率高）、Qwen Code（单日十余功能规划，平台化转型激进）
- **高活跃但流程承压**：Claude Code（社区规模最大，但 stale bot 批量关闭 `reproduced` issue 引发信任危机）
- **活跃但质量滞后**：OpenCode（桌面端投入大，核心数据丢失 #53971 未解）、Copilot CLI（社区诉求明确，官方响应最慢）
- **静默期**：Kimi Code CLI

## 六、值得关注的趋势信号

1. **“CLI → 托管 Agent 平台”是明确主线**：Qwen 的 Managed Agent 系列、Codex 的 message-board crate 化、Claude 的 Cowork/Desktop，均指向长生命周期、可恢复、可审计的会话编排。Session 生命周期管理（归档/恢复/压缩控制权）将成为下一轮标配。
2. **子代理“误报成功”是隐形风险**：Gemini #22323、Copilot #5223 提醒——**不要在自动化流水线中无条件信任子代理返回值**，需外部校验机制。
3. **安全模型从“提示确认”升级为“可审计拦截”**：Claude safety_event、Codex 凭证限定、Qwen 权限绕过修复，说明权限规则一致性（deny 覆盖所有读取路径）是企业选型的硬指标。
4. **升级节奏与回归管理失衡**：今日四个工具均有新版回归案例（Codex #55744、Copilot #5223、OpenCode v2.0.28、Claude Desktop）。**生产环境建议锁定版本、延后 1-2 个周期跟进**，并优先验证压缩/计费相关行为。
5. **新模型信号**：Gemini 4 Argon 注册、Codex GPT-5.5 已下线导致压缩卡死——**压缩逻辑不应硬编码模型名**，这也是自建工具的教训。
6. **Windows/WSL2 与企业网络仍是选型分水岭**：Codex 在企业网络适配上投入最重；重度 Windows 用户当前各家体验均有缺口。

---
*数据基于 2026-10-22 各仓库公开动态，状态以实时数据为准。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-10-22）

## 一、热门 Skills 排行（按 PR 活跃度/关联 Issue 热度）

| # | Skill / PR | 功能 | 热点与状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 `mcp>=2.0.0` 的 `streamable_http_client` 重命名及自定义 HTTP 头 | 关联高热度 Issue #1390（评估脚本对真实 MCP server 评分恒为 0），mcp-builder 是社区最关注的官方核心 Skill。**OPEN** |
| 2 | **skill-creator 系列修复** [#1298](https://github.com/anthropics/skills/pull/1298) / [#1961](https://github.com/anthropics/skills/pull/1961) / [#1997](https://github.com/anthropics/skills/pull/1997) | 修复 trigger 评估误报、eval viewer 安全加固（脚本逃逸/DNS rebinding/XSS）、YAML frontmatter 解析错误 | skill-creator 问题最密集（#556、#1383、#1394），是元 Skill 生态的基础设施。**均 OPEN** |
| 3 | **docx 系列** [#1792](https://github.com/anthropics/skills/pull/1792)（LibreOffice 超时处理） | 文档修订接受脚本的错误校验修复 | 文档处理类修复持续活跃（见 Issue #2018 merge_runs XML 损坏）。**OPEN** |
| 4 | **notion-spec-to-implementation + quantitative-resume-auditor** [#1245](https://github.com/anthropics/skills/pull/1245) | 将产品/技术规格转为 Notion 可执行任务；简历量化审计 | 长期未合并但持续更新（10-15 仍活跃）。**OPEN** |
| 5 | **md2video-audio** [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown 一键生成带真人配音的 MP4 视频（Marp + TTS） | 零依赖多媒体方向代表。**OPEN** |
| 6 | **pyxel 复古游戏开发** [#525](https://github.com/anthropics/skills/pull/525) | Python 复古游戏的创建/调试/无头验证 | 3 月提交、9 月仍活跃，作者持续维护。**OPEN** |
| 7 | **document-typography** [#514](https://github.com/anthropics/skills/pull/514) | AI 生成文档的排版质控（孤行、孤字换行、编号错位） | 直击 Claude 文档输出痛点，讨论质量高。**OPEN** |
| 8 | **scnet-hpc** [#1615](https://github.com/anthropics/skills/pull/1615) | SSH + Slurm 的 HPC 集群操作 Skill | 面向科研计算场景。**OPEN** |

## 二、社区需求趋势（Issues 提炼）

1. **组织级协作与分发**（最热，17 评论）：[#228](https://github.com/anthropics/skills/issues/228) — 要求组织内 Skill 直接共享，替代当前"下载 .skill → Slack 传输 → 手动上传"的笨拙流程。
2. **安全与信任边界**（46 评论，争议最大）：[#492](https://github.com/anthropics/skills/issues/492) — 社区 Skill 冒用 `anthropic/` 命名空间，用户误授高权限；配套需求见 agent-governance 提案 [#412](https://github.com/anthropics/skills/issues/412)（已关闭）。
3. **Skill 评估/质量工具链**：[#556](https://github.com/anthropics/skills/issues/556)（13 评论，trigger 评估 0% 命中）、[#1383](https://github.com/anthropics/skills/issues/1383)、[#1385](https://github.com/anthropics/skills/issues/1385)（推理质量门禁流水线提案）— 社区强烈需要可靠的 Skill 触发评测与质量度量。
4. **上下文效率**：[#1487](https://github.com/anthropics/skills/issues/1487) — claude-api Skill 单次注入 ~156k token 耗尽上下文；配套提案 compact-memory [#1329](https://github.com/anthropics/skills/issues/1329)。
5. **工作流自动化**：规格→任务（#1245）、HPC 调度（#1615）、文档→视频（#1703）等端到端自动化是新增 Skill 的主流形态。

## 三、高潜力待合并 Skills

- **#1742 mcp-builder MCP2 适配** — 修复阻塞性兼容问题，依赖官方 mcp 生态升级节奏，最可能近期合并。
- **#1961 + #1997 skill-creator 安全与解析修复** — 对应多个已确认 Issue（#1394 XSS、#1383），是官方元工具的必要修复。
- **#1792 docx 超时报错修复** — 小而明确的行为修正，合并门槛低。
- **#1245 Notion 规格实现 Skill** — 更新至 10 月中，作者持续响应 review，落地概率上升。
- **#1730 claude-api 死链修复**、**#538 pdf 大小写引用修复** — 低风险文档修正型 PR，典型快速合并候选。

## 四、生态洞察（一句话）

> 当前社区最集中的诉求是：**建立可信赖的 Skill 分发与质量保障体系**——包括命名空间安全、组织内共享机制、可靠的触发评估工具链和上下文效率，而不仅仅是更多新 Skill。

---

# Claude Code 社区动态日报 · 2026-10-22

## 一、今日速览

过去 24 小时 Claude Code 连发两个版本（v2.1.306 / v2.1.307），重点修复云会话 headless 模式登录误报和大量 MCP 工具场景下的误压缩问题，并新增 `claude_code.safety_event` OpenTelemetry 可观测性事件，提升企业级审计能力。社区方面，Linux 平台 CRLF 行尾符老问题（#2805）持续发酵，Desktop 应用的 Routines/侧边栏回归（#102323）已获修复关闭；同时今日有十余个标记 `reproduced` 的 issue 被 stale bot 关闭，引发对 bug 处理流程的关注。

## 二、版本发布

### [v2.1.307](https://github.com/anthropics/claude-code/releases)
- 新增 `/claude-api api-version`，可将 Claude API 代码迁移至 `2026-10-21` API 版本
- 新增 `claude_code.safety_event` OpenTelemetry 事件：每当权限规则、auto 模式、安全检查、hook 或沙箱**拦截/提示/退回**某次工具调用时都会发出事件——对企业安全审计是重要能力
- 其他请求修复

### [v2.1.306](https://github.com/anthropics/claude-code/releases)
- 修复云会话中 `claude -p` 在缺少会话环境变量时误报 "Not logged in" 的问题
- 修复含大量 MCP 工具的会话中，真实 API 错误被替换为 "prompt is too long" 并触发不必要压缩的问题

## 三、社区热点 Issues

1. **[#2805](https://github.com/anthropics/claude-code/issues/2805)** — Linux 上 Claude Code 持续生成 CRLF 行尾文件，导致脚本 "No such file or directory"。53 条评论、39 👍，自 2025-07 开放至今仍是 Linux 用户最大痛点。
2. **[#22931](https://github.com/anthropics/claude-code/issues/22931)** — Cowork 聊天归档后“消失”，无法找回。43 条评论、38 👍，数据丢失类问题引发用户强烈不安。
3. **[#102323](https://github.com/anthropics/claude-code/issues/102323)（已关闭）** — Desktop 2.37337.1 更新移除侧边栏文件夹分组、隐藏 Routines 区块。已修复关闭，反映 Desktop 自动更新回归问题频发。
4. **[#97729](https://github.com/anthropics/claude-code/issues/97729)** — 功能请求：SSH 远程会话中支持应用内浏览器，10 👍，反映远程开发体验的强烈需求。
5. **[#100694](https://github.com/anthropics/claude-code/issues/100694)** — Desktop 静默自动更新重启后 Remote Control 与既有 Code 会话断连，长任务监控中断。
6. **[#98977](https://github.com/anthropics/claude-code/issues/98977)** — 朗读功能希望只读最终答案，而非所有中间过程评论，可访问性/效率改进需求。
7. **[#84124](https://github.com/anthropics/claude-code/issues/84124)（已关闭）** — statusLine 事件驱动刷新无合并机制，慢命令退化为 N 个并发副本（Windows），已被 stale bot 关闭但带 `reproduced` 标签。
8. **[#83804](https://github.com/anthropics/claude-code/issues/83804)（已关闭）** — 官方 plugin-dev 自带的 skills 被自家校验脚本 `quick_validate.py` 拒绝，暴露插件生态工具链自测缺失。
9. **[#75552](https://github.com/anthropics/claude-code/issues/75552)（已关闭）** — Sonnet 5 agent 调试时未经提示将 `.env.local` 敏感值回显到聊天输出，安全问题值得持续关注。
10. **[#81694](https://github.com/anthropics/claude-code/issues/81694)（已关闭）** — Shell snapshot 丢失 `_` 前缀辅助函数导致 `cd` 报 127，1 月以来第 6 次报告仍未解决即被 stale 关闭。

> ⚠️ 注：今日大量带 `reproduced` 标签的 issue 被 stale bot 批量关闭（#83803、#81665、#81629、#81616、#81156、#80791、#80631 等），社区对“已复现仍被自动关闭”的机制存在不满情绪。

## 四、重要 PR 进展

今日仅 1 个 PR 更新：

- **[#21459](https://github.com/anthropics/claude-code/pull/21459)** — `feat(hookify)`: 为规则匹配新增 `glob_match` 支持（如 `*.py`）及大小写敏感选项。对 hookify 用户而言，glob 比正则更简洁易读，是实用性较强的社区贡献，自 1 月提交至今仍在推进中。

## 五、功能需求趋势

1. **远程/云会话体验**：SSH 远程浏览器（#97729）、云会话 headless 修复（v2.1.306）、Remote Control 重连（#100694）——远程开发是核心诉求方向。
2. **Desktop 应用稳定性**：Routines、侧边栏、归档等 UI 回归频发，用户呼吁更可控的更新节奏。
3. **插件生态工具链**：校验脚本误报（#83804、#83803）、marketplace BOM 静默失败（#84501）、插件命名空间双重前缀（#80631）等，插件开发者摩擦点集中。
4. **企业可观测性与安全**：v2.1.307 的 `safety_event` OTel 事件正回应该方向需求。
5. **可访问性与本地化**：朗读选项（#98977）、非 ASCII 字符（韩文命令 #81156、古吉拉特文渲染 #81665）问题持续存在。

## 六、开发者关注点

- **跨平台一致性**：Linux CRLF（#2805）、Windows statusLine 并发（#84124）、kitty 终端按键（#81619）——非 macOS 平台的长期质量问题反馈集中。
- **上下文管理可靠性**：MCP 工具多时的误压缩（已在 v2.1.306 修复）直接关联 token 成本，开发者高度敏感。
- **插件/hook 配置的静默失败**：多个 issue 反映配置错误不报错、行为与文档不符（#81073、#80784、#81852），希望增强校验和错误提示。
- **会话恢复健壮性**：`--resume` 在项目目录移动后永久失效（#81603）、跨项目会话泄露（#81616）影响长周期工作流。
- **Stale 机制争议**：已复现的 bug 被自动关闭可能造成问题流失，建议官方复核带 `reproduced` 标签的 issue 处理策略。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-10-22** | 数据来源：github.com/openai/codex

---

## 1. 今日速览

今日 Codex 团队发布两个 alpha 版本：`0.164.0-alpha.9` 和热修复版 `0.163.0-alpha.11.1`（含证书依赖更新与 Rust 1.99.1 兼容性修复）。社区方面，macOS 桌面端 26.1016.51333 版本新聊天首条消息失败问题（#55744）持续发酵，24 小时内收获 60 条评论、125 个 👍，是当前最严重的回归问题。此外，大量由 copyberry[bot] 提交的 PR 集中合入，覆盖代理认证、token 计量、MCP 企业认证等核心方向。

---

## 2. 版本发布

- **[rust-v0.164.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.164.0-alpha.9)**：最新 alpha 迭代。
- **[rust-v0.163.0-alpha.11.1](https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.11.1)**：热修复版本，回合并 #55616（更新 `rustls-webpki` 与 `webpki-roots`）及 #55677 等 Rust 1.99.1 兼容性修复，对应 PR [#55966](https://github.com/openai/codex/pull/55966)。

---

## 3. 社区热点 Issues

| # | Issue | 关注度 | 说明 |
|---|-------|--------|------|
| 1 | [#55744](https://github.com/openai/codex/issues/55744) macOS 新聊天首条消息失败 "Cannot serialize value" | 💬60 👍125 | 今日最热。26.1016.51333 版本 macOS 桌面端新会话直接无法启动，影响面广，属严重回归，官方需尽快响应。 |
| 2 | [#49453](https://github.com/openai/codex/issues/49453) 浏览器访问被旧的聊天级拒绝记录阻塞 | 💬31 | 明确授权网站后仍被拦截，权限状态持久化逻辑存在缺陷，影响浏览器自动化工作流。 |
| 3 | [#50168](https://github.com/openai/codex/issues/50168) Dot → Codex Cloud 互操作失败 | 💬26 | `cloud_threads` 可读不可写，创建返回 UNKNOWN、发消息报 CloudThreadNotFoundError，云到云集成关键缺口。 |
| 4 | [#53309](https://github.com/openai/codex/issues/53309)（已关闭）历史推理 token 被重复计数导致过早压缩 | 💬17 👍8 | 已修复关闭，对应 PR #55991（避免 retained reasoning 双重计数），值得确认修复版本。 |
| 5 | [#17541](https://github.com/openai/codex/issues/17541) Azure 用户切换模型后 "encrypted content could not be decrypted" | 💬14 👍10 | 半年老问题仍活跃，Azure 场景模型切换体验差。 |
| 6 | [#53425](https://github.com/openai/codex/issues/53425) macOS 内置浏览器可交互但 Agent 报 "Browser is not available: iab" | 💬13 | UI 与运行时状态不一致，Agent 无法利用内置浏览器上下文。 |
| 7 | [#55795](https://github.com/openai/codex/issues/55795) Windows 升级 26.1016.51333 后 Dots 入口消失 | 💬10 | 与 #55744 同版本引入的回归，重装无法恢复，Windows 用户受影响明显。 |
| 8 | [#55783](https://github.com/openai/codex/issues/55783) macOS 桌面端 Dot 从侧边栏消失（Web 端正常） | 💬7 👍6 | 同样指向 26.1016.51333 的 Dot 功能部署问题，与 #55795 形成跨平台呼应。 |
| 9 | [#41275](https://github.com/openai/codex/issues/41275) Windows 企业网络 Schannel 证书校验失败导致无限重连 | 💬8 👍7 | 企业/公共部门环境高发，今日合入的 Windows 代理认证相关 PR（#56000/#55994）或为相关改进。 |
| 10 | [#55805](https://github.com/openai/codex/issues/55805) 剩余配额 88-90% 却间歇性遭遇 HTTP 429 | 💬3 | Pro 20x 订阅用户报告 155-288 秒重试等待，限流判定逻辑疑似过严。 |

**其他值得留意**：[#53132](https://github.com/openai/codex/issues/53132)（Windows MSIX 安装反复失败 0x80073CF6）、[#54226](https://github.com/openai/codex/issues/54226)（远程压缩卡死在已下线的 GPT-5.5 模型）、[#51870](https://github.com/openai/codex/issues/51870)（Windows 端持续卡顿）。

---

## 4. 重要 PR 进展

1. **[#55991](https://github.com/openai/codex/pull/55991) 避免保留推理 token 双重计数** — 修复过早自动压缩问题（对应 Issue #53309），Responses Lite 报告的 usage 含 retained reasoning 时不再重复估算。
2. **[#56003](https://github.com/openai/codex/pull/56003) 将 MITM 凭证替换限定到受信来源** — 安全加固：凭证暴露前需校验目标来源与原始请求，项目配置不能重定向受信凭证策略。
3. **[#56001](https://github.com/openai/codex/pull/56001) 企业托管 MCP 认证支持机密 OAuth 客户端** — 突破此前仅支持公共客户端的限制，企业 IdP 集成的关键能力。
4. **[#56000](https://github.com/openai/codex/pull/56000) / [#55994](https://github.com/openai/codex/pull/55994) Windows 代理认证隧道** — 代理返回 407 时用登录用户的 Negotiate/NTLM 凭证重试 CONNECT，直接回应 Issue #41275 类企业网络问题。
5. **[#55969](https://github.com/openai/codex/pull/55969) mailbox 抢占时排空 WebSocket 响应** — 修复响应 ID 丢失导致增量续传失败的问题。
6. **[#55968](https://github.com/openai/codex/pull/55968) 云端 skill/插件目录刷新失败退避** — 服务不可用时增加冷却退避，避免每个模型步骤前反复重试。
7. **[#55987](https://github.com/openai/codex/pull/55987) exec-server 凭证被拒后自动刷新** — 远程凭证轮转场景下的自愈能力。
8. **[#56011](https://github.com/openai/codex/pull/56011) rollout trace 会话在 PID 复用时保持独立** — 防止进程句柄复用导致 `write_stdin` 关联到错误的 exec。
9. **[#55970](https://github.com/openai/codex/pull/55970) / [#55973](https://github.com/openai/codex/pull/55973) message-board 模块化** — 抽出独立 `codex-message-board` crate，支持消费者按需选择讨论工具子集，为多 Agent 协作打基础。
10. **[#30601](https://github.com/openai/codex/pull/30601) app-server OTEL 启动改为尽力而为** — 遥测配置错误不再导致 app-server 致命退出，提升容错性。

---

## 5. 功能需求趋势

- **Dots / 多 Agent 稳定性**：26.1016.51333 版本引发 Dot 消失问题集中爆发（#55795、#55783、#50168），Dot 已成核心功能但其发布质量与云互操作能力是当前最大短板。
- **企业网络与认证**：代理 407 认证、Schannel 证书、OAuth token 交换失败、机密 OAuth 客户端等企业场景问题密集，官方 PR 投入明显。
- **上下文与 token 计量**：压缩时机误判（#53309、#54226）和限流判定（#55805）表明社区对配额透明度和精确计量呼声高。
- **MCP 生态增强**：环境变量展开（#2680，👍24）、`http_headers_helper` 环境变量传递（#46244）等长期需求仍开放，安全传递密钥是高频诉求。
- **Windows 端体验**：安装失败、卡顿、沙箱、视口跳动等问题占比高，Windows 是当前质量问题重灾区。

---

## 6. 开发者关注点

1. **升级风险**：26.1016.51333 是问题版本，macOS 用户建议暂缓升级，遇到 #55744/#55783 可在对应 Issue 跟踪修复进展。
2. **过早压缩与限流误判**：若使用 0.162.0-alpha 系列遇到上下文异常压缩，可升级至包含 #55991 修复的版本；429 与实际配额不符的问题仍待官方确认。
3. **企业环境适配**：Windows 代理认证与 MCP 机密 OAuth 客户端支持即将落地，受 #41275/#47343 影响的企业用户值得关注后续 release notes。
4. **密钥管理痛点**：MCP 配置中无法使用 `${ENV_VAR}` 展开迫使用户明文写入密钥（#2680），是持续一年多的老需求，建议关注官方路线图。
5. **架构演进信号**：message-board 独立成 crate、NFS 数据库迁移工具（#55975）、SQLite 日志目录可配置（#55978）等 PR 显示 Codex 在为多 Agent 存储隔离与部署灵活性做底层重构。

---
*本报告基于过去 24 小时 GitHub 公开数据自动整理，仅供技术参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报

**日期：2026-10-22 | 数据来源：github.com/google-gemini/gemini-cli**

---

## 📌 今日速览

今日发布 v0.67.0 nightly 版本，包含 git 环境配置保留等重要修复。社区活跃 PR 集中在 **请求取消后的执行终止**、**ACP 输出截断** 和 **容器沙箱内的 IDE 集成** 三大方向。Issues 区 Subagent 可靠性问题持续发酵（误报成功、挂起、配置不生效），成为用户最大痛点。此外，社区 PR 中出现了 **Gemini 4 Argon 模型** 的支持注册，值得密切关注。

---

## 🚀 版本发布

**v0.67.0-nightly.20261021.gd00859d6b**（[Release](https://github.com/google-gemini/gemini-cli/releases)）

- `chore`: gsutil 迁移至 gcloud storage（#29839）
- `fix(core)`: 在 shell 和 git 环境中保留用户级 `~/.gitconfig`（#29832）——避免用户 git 配置被沙箱环境静默丢弃

---

## 🔥 社区热点 Issues（Top 10）

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** Subagent 达到 MAX_TURNS 后误报 `success/GOAL`
   P1 级 bug。子代理中断被伪装成成功，严重误导上层任务判断，13 条评论，是可观测性/状态上报的核心缺陷。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** Generalist agent 无限挂起（P1，👍 8）
   简单操作（如创建文件夹）挂起超过一小时，用户只能显式禁用子代理绕过，直接影响可用性。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** 利用模型 bash 原生能力的零依赖沙箱方案
   提出通过 OS 级沙箱 + 执行后意图路由，让 Gemini 3 原生使用 POSIX 工具链，是架构级提案（effort/large）。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** AST-aware 文件读取/搜索/代码库映射 EPIC
   官方发起的调研系列：用 AST 工具减少 token 噪音、精准读取方法边界，关联 #22746/#22747，代表工具链演进方向。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** 模型自主使用 skills/sub-agents 频率过低
   用户反馈即使任务高度相关，模型也不会主动调用自定义技能，需显式指令才行——路由/调度策略的核心体验问题。

6. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** Browser subagent 在 Wayland 下失败（P1）
   Linux Wayland 用户被排除在浏览器代理功能之外。

7. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** Browser Agent 忽略 settings.json 配置（如 maxTurns）
   AgentRegistry 读取并合并了配置但实际未生效，配置链路存在断点。

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** 工具数 >128 时触发 400 错误
   MCP 生态下工具数量膨胀是普遍现象，需要更智能的工具范围管理。

9. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)** Agent 应阻止破坏性操作
   社区呼吁对 `git reset --force`、DB 修改等高危命令引入更严格的安全护栏。

10. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** get-shit-done output hook 导致崩溃（P1）
    第三方 hook 在输出摘要阶段直接 crash CLI，扩展稳定性问题。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#29849](https://github.com/google-gemini/gemini-cli/pull/29849)** 非交互模式下的终止信号处理
   修复 headless 模式收到 SIGINT/SIGTERM 后仍继续执行 shell 副作用并重复提交工具结果的问题。对 CI/自动化场景至关重要。

2. **[#29858](https://github.com/google-gemini/gemini-cli/pull/29858)**（已合并）IDE companion 桥接进容器沙箱
   突破性功能：`GEMINI_SANDBOX=docker|podman|runsc` 下的 CLI 首次支持 `/ide` 全套集成（open-file 上下文、native diff）。

3. **[#29833](https://github.com/google-gemini/gemini-cli/pull/29833)**（已合并）安全确认优化
   Agent 自身命令输出中的 flag 不再算外部输入，同一 flag 的批准可记忆，大幅减少重复确认弹窗。

4. **[#29744](https://github.com/google-gemini/gemini-cli/pull/29744)** `/ide enable` 支持 IDE 重启后重连
   解决 VS Code Reload Window 后连接永久失败的痛点。

5. **[#29862](https://github.com/google-gemini/gemini-cli/pull/29862)**（已合并）+ **[#29778](https://github.com/google-gemini/gemini-cli/pull/29778)** ACP 工具输出截断
   修复 `--acp` 模式下大输出未经截断直接发送模型导致 400 token 超限的问题。

6. **[#29737](https://github.com/google-gemini/gemini-cli/pull/29737)** 注册 Gemini 4 Argon 模型
   社区 PR 使 `gemini-4-argon` 可像普通模型一样选择，暗示新模型即将上线。

7. **[#29867](https://github.com/google-gemini/gemini-cli/pull/29867)** 设置迁移保留 `${VAR}` 占位符
   修复废弃设置自动迁移时将环境变量占位符展开覆盖写回磁盘的破坏性 bug。

8. **[#29718](https://github.com/google-gemini/gemini-cli/pull/29718)** Rootless Podman 沙箱加 `--userns=keep-id`
   修复非 root Podman 用户沙箱内 `EACCES` 错误。

9. **[#29749](https://github.com/google-gemini/gemini-cli/pull/29749)**（已关闭）原子写入保护只读文件与硬链接
   指出 rename-based 原子写会绕过目标文件写权限位，是重要的文件系统安全问题（关注后续是否重开）。

10. **[#29868](https://github.com/google-gemini/gemini-cli/pull/29868)** 取消请求后停止 continuation 流
    修复按 Escape 取消后后续工具仍继续执行的竞态，与 #29849 属同一条“取消语义”修复线。

其他值得留意：[#29823](https://github.com/google-gemini/gemini-cli/pull/29823)（Android/Termux 支持）、[#29779](https://github.com/google-gemini/gemini-cli/pull/29779)（ripgrep 失败标记为工具错误）、[#29847](https://github.com/google-gemini/gemini-cli/pull/29847)（home 目录下误报重复 agent，已合并）。

---

## 📈 功能需求趋势

| 方向 | 关键信号 |
|---|---|
| **Subagent 可靠性与可观测性** | 误报成功（#22323）、挂起（#21409）、轨迹分享（#22598）、bug report 缺子代理上下文（#21763）——最高频痛点 |
| **工具链智能化** | AST-aware 搜索/读取（#22745/22746/22747）、Token 节省型"Tactful Extraction"（#19561）、文件化任务追踪替代 WriteToDo（#18836） |
| **取消与生命周期语义** | 交互/非交互模式的取消后终止（#29849/#29868），官方集中修复中 |
| **沙箱与安全** | OS 级零依赖沙箱提案（#19873）、破坏性操作护栏（#22672）、只读文件保护（#29749） |
| **容器/异构环境支持** | 容器内 IDE 桥接（#29858）、Wayland（#21983）、Termux（#29823）、rootless Podman（#29718） |
| **新模型支持** | Gemini 4 Argon 注册（#29737） |

---

## ⚠️ 开发者关注点

- **子代理状态上报不可信**：`GOAL success` 与实际中断不符，自动化流水线中不可依赖子代理返回值做判断。
- **取消/终止语义正在收紧**：多个 PR 表明官方在系统性修复“取消后仍执行”问题，headless 用户建议关注 v0.67 合入情况。
- **配置生效链路有断点**：Browser Agent 忽略 settings.json（#22267）、agent 目录不支持 symlink（#20079）、设置迁移破坏 `${VAR}`（#29867）——自定义配置时需验证实际生效。
- **工具数量与上下文成本**：>128 工具即 400 报错；大文件读取造成 context bloat，重度 MCP 用户应主动裁剪工具集。
- **沙箱环境功能差异**：IDE 集成在容器沙箱中长期不可用，#29858 合并后将有实质改善，建议升级验证。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-22** | 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)

---

## 📌 今日速览

Copilot CLI 昨日发布 **v1.0.102**（含 -0/-1 三个子版本），带来子代理工具审批继承、托管 Auto 模型选择、代理环境沙箱网络支持等多项改进。但新版本随即暴露回归问题：后台子代理运行超 600 秒会导致 autopilot 中断（#5223）。此外，BYOK 自定义提供商 403 鉴权问题（#4414）已关闭，而呼声极高的 vi/vim 输入模式请求（#13，76 👍）也已关闭，社区对 modal 编辑支持的期待值得关注后续动向。

---

## 🚀 版本发布

### v1.0.102（2026-10-21）

**Improved**
- 沙箱网络流量继承宿主代理设置时，现支持 `NO_PROXY` 和 `ALL_PROXY`

**Fixed**
- Prompt 模式在 `-p` 和管道 stdin 运行时遵循托管 Auto 模型选择
- 子代理遵循自定义和 MCP 工具审批，避免重复权限提示，继承工作流可正常运行
- 插件市场支持 git-subdir 来源和长插件描述
- Fish shell 补全在别名包含 `--effort` 等选项别名时正常工作

---

## 🔥 社区热点 Issues（Top 10）

1. **[#13] vi/vim 输入模式请求已关闭**（76 👍 / 15 评论）
   社区呼声最高的功能请求——为 CLI 交互界面提供 modal 编辑支持。该 Issue 今日被关闭，是否意味着功能已落地或被拒绝，建议关注后续 Release 说明。
   https://github.com/github/copilot-cli/issues/13

2. **[#5223] 1.0.102 回归：后台子代理超 600s 导致 autopilot 中断**
   新版本发布当天即报回归：交互式 autopilot 在后台子代理运行超 10 分钟后强制停止。升级用户需注意可用 `COPILOT_TASK_WAIT_TIMEOUT_SECONDS` 临时规避。
   https://github.com/github/copilot-cli/issues/5223

3. **[#4414] BYOK 自定义提供商本地 403 鉴权错误已关闭**
   自定义 OpenAI/Anthropic 兼容提供商推理请求全部失败且从未到达提供商，问题最终定位在本地，现已关闭。BYOK 用户可验证是否随 v1.0.102 修复。
   https://github.com/github/copilot-cli/issues/4414

4. **[#3636] 企业 VPN 下语音模式无法启用**（OPEN）
   `/voice` 因无法获取 STT 模型目录而完全不可用，企业网络环境（VPN/代理）用户持续受影响，与本次代理设置改进直接相关。
   https://github.com/github/copilot-cli/issues/3636

5. **[#5192] ACP 模式 MCP OAuth token 不持久化**
   每个新 ACP 会话都会重新打开浏览器进行 OAuth 登录，严重影响非交互工作流（编辑器集成场景）的可用性。
   https://github.com/github/copilot-cli/issues/5192

6. **[#5089] ACP 模式忽略 `--sandbox` 配置（已关闭）**
   `copilot --acp` 下 shell 命令以非沙箱方式运行，属安全隐患。已关闭，可能已随新版本修复。
   https://github.com/github/copilot-cli/issues/5089

7. **[#5207] Windows 沙箱下非系统盘目录无法访问**
   工作目录在 D: 盘时，沙箱内 `Get-ChildItem`、`git` 等全部失效，Windows 用户核心痛点。
   https://github.com/github/copilot-cli/issues/5207

8. **[#5219] 子代理未知模型 ID 回退 128k 上限导致整轮失败**
   task 子代理配置了未知模型 ID 后回退到 128k 默认 caps，导致 "Request exceeds the model's prompt budget" 卡死整个会话。
   https://github.com/github/copilot-cli/issues/5219

9. **[#5054] 大上下文自动压缩持续超时**
   xhigh 推理 + 大上下文场景下，summarizer 300 秒超时几乎每轮重试，严重影响长会话可用性。
   https://github.com/github/copilot-cli/issues/5054

10. **[#5220] 请求 Claude 1 小时 prompt cache TTL 选项**
    默认 5 分钟缓存 TTL 在交互式使用中频繁过期导致重复计费/延迟，社区希望提供 1 小时 TTL 选项。
    https://github.com/github/copilot-cli/issues/5220

---

## 🔀 重要 PR 进展

> 过去 24 小时内仅 **1 条 PR** 更新：

1. **[#1960] [CLOSED] install: 使用 GITHUB_TOKEN 进行认证的 GitHub 请求**
   安装脚本支持将 `GITHUB_TOKEN` 注入 curl/wget 下载头及 git remote URL，避免 API 限流并支持私有仓库安装。该 PR 今日被关闭（未标注合并状态），社区可能仍需此能力。
   https://github.com/github/copilot-cli/pull/1960

---

## 📈 功能需求趋势

- **键位与编辑体验**：vi/vim 模式（#13）、可配置键位绑定（#5211）、Numpad Home/End 无障碍支持（#5221）——键盘工作流定制是持续热点
- **ACP / 非交互模式**：OAuth 持久化（#5192）、沙箱失效（#5089）、task_complete 消息格式（#5150）——编辑器/客户端集成场景问题集中爆发
- **BYOK 与模型配置**：自定义提供商鉴权（#4414）、额外请求参数（#3448）、启动模型选择记忆（#5213）、prompt cache TTL（#5220）
- **沙箱与企业环境**：Windows 多盘符（#5207）、企业 MCP Registry-only 策略（#5155）、VPN 代理兼容（#3636）
- **代理与子代理稳定性**：600s 超时回归（#5223）、未知模型 ID 回退（#5219）、coordinator 重试死循环（#5210）

---

## ⚠️ 开发者关注点

1. **v1.0.102 升级需谨慎**：后台子代理 + autopilot 组合场景存在回归（#5223），依赖长时任务的自动化工作流建议暂缓升级
2. **ACP 模式仍不成熟**：沙箱不生效、OAuth 不持久、消息协议不规范三个问题叠加，编辑器集成用户当前体验较差
3. **企业/代理网络环境兼容性差**：VPN、代理、多盘符、企业 MCP 策略等场景问题反复出现，是流失企业用户的风险点
4. **长会话稳定性**：自动压缩超时（#5054）、会话卡死（#5219）显示大上下文场景仍需优化
5. **shell guard 过度防护**（#5214）：`kill $VAR` 等常规命令被拦截，提示安全策略与易用性平衡仍需打磨

---

*本报告基于过去 24 小时 GitHub 公开数据自动生成，问题状态以仓库实时数据为准。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-10-22

## 📌 今日速览

今日无新版本发布，社区活动集中在 v2 迁移遗留问题的持续消化与 Go 服务配额/可用性争议上。桌面端（app/desktop）迎来密集的 UI 打磨 PR，核心团队（@kitlangton、@rekram1-node 等）同日提交十余个功能与重构 PR，显示 beta 通道迭代明显加速。

---

## 🐛 社区热点 Issues

1. **[CLOSED] Go 配额消耗约为 DeepSeek V4 Flash 显示成本的 4 倍** [#42985](https://github.com/anomalyco/opencode/issues/42985) — 20 条评论、9 👍。计费透明度争议持续两个月后才关闭，Go 服务用量统计的公信力问题值得用户警惕。

2. **[CLOSED] 新版 v2 Console 中无法创建/查看 Go API key** [#52227](https://github.com/anomalyco/opencode/issues/52227) — 14 条评论。文档与产品脱节，影响通过外部编码工具使用 Go 的用户，已关闭（或已修复）。

3. **[OPEN] CLI v2.0.8 丢失消息时间戳选项（v1 有）** [#49742](https://github.com/anomalyco/opencode/issues/49742) — 9 条评论。v2 功能回退的典型案例，用户反复追问，一个月未修复。

4. **[CLOSED] 升级 2.0.30 后无法启动（端口占用误报）** [#56005](https://github.com/anomalyco/opencode/issues/56005) — 8 条评论。与 [#55918](https://github.com/anomalyco/opencode/issues/55918)（WSL2 镜像网络保留端口导致启动失败）同根：Windows 上托管服务端口选择逻辑对 WSL2 场景不友好。

5. **[OPEN] V1→V2 迁移静默丢弃旧消息，历史会话变空**（高严重度）[#53971](https://github.com/anomalyco/opencode/issues/53971) — 已复现，64 个 V1 会话数据“存在但不可见”。数据丢失类问题中最严重的一条，仍未解决。

6. **[OPEN] openai-compatible 模型 `max_tokens` 回归：严格端点全部拒绝请求** [#55726](https://github.com/anomalyco/opencode/issues/55726) — v2.0.28 引入的回归（源自 #54694），自建/兼容 API 网关用户受影响面广，已复现未修复。

7. **[CLOSED] 非 git 目录的 V1 会话迁移后从项目会话列表消失** [#50551](https://github.com/anomalyco/opencode/issues/50551) / [#53450](https://github.com/anomalyco/opencode/issues/53450) — 同一 `project_id='global'` 迁移缺陷的两条报告，均已关闭。

8. **[OPEN] 服务器启动时读取 ~/.aws 和 gcloud 凭据文件（未使用 Bedrock/Vertex）** [#56200](https://github.com/anomalyco/opencode/issues/56200) — 安全敏感问题，已复现，隐私用户应关注。

9. **[OPEN] 过期免费模型（GLM）破坏整个模型目录同步，连带阻断其他可用免费模型** [#57931](https://github.com/anomalyco/opencode/issues/57931) — 今日新增，免费模型用户的可用性问题，缺乏优雅降级。

10. **[OPEN] 网络切换（Wi-Fi→有线）静默取消子代理任务且无法恢复** [#57538](https://github.com/anomalyco/opencode/issues/57538) — 长任务场景下的可靠性缺陷，任务断点续传能力缺失的体现。

---

## 🔧 重要 PR 进展

1. **桌面端"What's new in beta"入口** [#57940](https://github.com/anomalyco/opencode/pull/57940) / [#57886](https://github.com/anomalyco/opencode/pull/57886) — 命令面板/设置可回看 beta 更新日志，并展示每项变更的作者与动效说明。

2. **CI：隔离常红 e2e 测试并快速失败** [#57951](https://github.com/anomalyco/opencode/pull/57951) — beta 流水线 e2e 一直红、重试拖慢 PR，此 PR 隔离常红用例，仅对 beta 生效。工程质量改进的信号。

3. **"Recently closed" 仅显示文件** [#57963](https://github.com/anomalyco/opencode/pull/57963) — 修复侧面板新建标签页混入非文件项的问题（@jlongster）。

4. **应用内组件实验室（替代 Storybook）** [#57908](https://github.com/anomalyco/opencode/pull/57908) — dev 构建内置组件预览，自研工具链投入加大。

5. **CSS orb 活动指示芯片（实验开关）** [#57893](https://github.com/anomalyco/opencode/pull/57893)（已关闭）— 通过 Knobs 实验系统灰度测试新动效。

6. **视频可像图片一样打开并缩放** [#57924](https://github.com/anomalyco/opencode/pull/57924)（已关闭/合并）— Review 面板支持屏幕录制缩放查看。

7. **统一细腻滚动条** [#57943](https://github.com/anomalyco/opencode/pull/57943) / [#57926](https://github.com/anomalyco/opencode/pull/57926) — 页面、面板、菜单统一使用自定义 ScrollView。

8. **Tab 快捷键作用域修复 + 侧边 tab 条安抚** [#57935](https://github.com/anomalyco/opencode/pull/57935) — ⌘T 不再全局劫持焦点。

9. **Copilot 模型在无 picker 时仍可选** [#57956](https://github.com/anomalyco/opencode/pull/57956) — 修复 `model_picker_enabled` 映射导致的模型被禁用。

10. **core 系列重构（6 个 PR，@rekram1-node）** [#57952](https://github.com/anomalyco/opencode/pull/57952)、[#57953](https://github.com/anomalyco/opencode/pull/57953)、[#57949](https://github.com/anomalyco/opencode/pull/57949)、[#57961](https://github.com/anomalyco/opencode/pull/57961)、[#57960](https://github.com/anomalyco/opencode/pull/57960)、[#57958](https://github.com/anomalyco/opencode/pull/57958) — 系统性清除冗余 Schema 校验、类型重品牌化与死代码，热路径性能应有小幅收益。

---

## 📈 功能需求趋势

- **V1→V2 迁移完整性**：会话丢失/隐藏、配置迁移语义混乱（#56835）是长期高频话题，占开放问题的显著比例。
- **状态可迁移性**：请求一键迁移全部状态（配置、会话、凭据、MCP、插件、skills）到新机器 [#54534](https://github.com/anomalyco/opencode/issues/54534)。
- **MCP 延迟加载**：模型无关的 MCP 工具搜索/按需 schema 加载，缓解系统提示词膨胀 [#49645](https://github.com/anomalyco/opencode/issues/49645)。
- **TUI 插件扩展性**：为会话 tab 栏等 UI 区域开放插件插槽 [#54927](https://github.com/anomalyco/opencode/issues/54927)。
- **Go 服务透明度**：计费、API key 管理、单模型 429（#57851、#57859）问题集中，社区对配额与可用性可观测性诉求强烈。

---

## ⚠️ 开发者关注点（痛点总结）

1. **Windows/WSL2 体验仍是重灾区**：端口冲突误判（#56005、#55918）、子进程弹窗（#57907）、4GB 内存占用（#56867）、skills API 返回空（#57524）。
2. **回归质量**：v2.0.28 的 `max_tokens` 破坏 openai-compatible 用户，功能回退（时间戳丢失）修复缓慢，升级 v2 需谨慎。
3. **可靠性细节**：网络切换静默取消任务（#57538）、自动 compaction 吞掉 subtask（#57496）、工具调用"说而不做"死循环（#57501）。
4. **数据安全**：迁移静默丢数据（#53971）+ 启动时读取无关云凭据（#56200），建议升级前备份 `opencode.db`。

---
*数据截至 2026-10-22，来源：github.com/anomalyco/opencode 过去 24 小时 Issues/PR 更新。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-10-22

## 1. 今日速览

今日发布两个 nightly 版本（v0.25.3 系列）及 **cua-driver-rs v0.26.0**（CUA Driver 预编译二进制，含 macOS 签名公证）。**Managed Agent 生态爆发**：@wenshao 一天密集提交十余个 Managed Agent 功能需求（MCP 运行时管理、上下文压缩、Session 生命周期等），配套 PR 同步推进。另有两个 **P1 级 bug** 值得警惕：权限绕过（#15129）和 daemon OOM（#15071）。

---

## 2. 版本发布

- **v0.25.3-nightly.20261021.79242671bb / v0.25.3-nightly.20261020**
  - feat(daemon): 支持 session 级别的 Skill 与 Extension 刷新（#14050 by @callmeYe）
  - fix(managed-agent): 相关边界修复
- **cua-driver-rs v0.26.0** — Qwen CUA Driver 预编译二进制：macOS 提供 codesigned + notarized 的 universal binary 与 `QwenCuaDriver.app`；Linux 支持 x86_64/arm64（glibc 2.31+）；Windows 提供 UIAccess worker 与原生 SDK payload。

---

## 3. 社区热点 Issues

1. **#15129 [P1] 权限绕过：`permissions.deny Read(...)` 可被 grep_search/glob 绕过** — 安全问题，deny 规则只挡 read_file，grep/glob 仍可返回被禁文件内容，与文档承诺不符。
   https://github.com/QwenLM/qwen-code/issues/15129

2. **#15071 [P1] VS Code companion 的 `qwen serve` daemon 无限堆增长至 ~4GB 后 OOM 崩溃** — 影响桌面/IDE 用户日常使用的严重稳定性问题。
   https://github.com/QwenLM/qwen-code/issues/15071

3. **#13492 [P2] XML tool-call 恢复丢弃含引号工具标记的外层调用** — 13 条评论，部分已修复（#13515 已合并），外层恢复仍待 #13579。
   https://github.com/QwenLM/qwen-code/issues/13492

4. **#13787 [P3] XML 恢复在多调用大响应上重复前缀扫描导致延迟攀升** — 与 #13492 同族的性能问题，已提供有界复现基准。
   https://github.com/QwenLM/qwen-code/issues/13787

5. **#15083 [P2] 后台 subagent 运行时用户输入会落入 subagent 上下文执行，deferred tool_call 被拒** — 涉及 AsyncLocalStorage 上下文泄漏与工具策略误用，架构层面问题。
   https://github.com/QwenLM/qwen-code/issues/15083

6. **#14979 [P2] 改进 edit 工具** — 用户呼吁移植 dsh-better-edit 理念替换现有 read/edit，反映 edit 的 old_text 精确匹配是高频痛点。
   https://github.com/QwenLM/qwen-code/issues/14979

7. **#15076 [P2] Managed Agent Workspace 缺少 web_fetch 和 todo_write** — 工具已存在于 core 但未暴露给 Managed Session，补齐成本低、价值高。
   https://github.com/QwenLM/qwen-code/issues/15076

8. **#15056 [P2] 提议本地 `/autofix-pr` 命令**：监听 PR 自动修复 CI 失败、review 反馈与冲突 — 社区对自动化工作流的热切期待。
   https://github.com/QwenLM/qwen-code/issues/15056

9. **#15081 [P2] Managed Agent Workspace 文件与进程访问缺乏沙箱限制** — 安全模型缺失，Workspace 目录被当作受信数据而非文件系统边界。
   https://github.com/QwenLM/qwen-code/issues/15081

10. **#15109 [P2] 桌面客户端任务通知无法启用** — WebView 对临时 loopback origin 拒绝通知权限，UI 层体验缺口。
    https://github.com/QwenLM/qwen-code/issues/15109

---

## 4. 重要 PR 进展

1. **#15119** feat(managed-agent): 不重建 Session 即可管理 MCP 服务器（增删/启停/重载）— 对应 issue #15079。
   https://github.com/QwenLM/qwen-code/pull/15119
2. **#15104** feat(managed-agent): 持久化手动上下文压缩，含 actor 级幂等与压缩修订号。
   https://github.com/QwenLM/qwen-code/pull/15104
3. **#15131** feat(managed-agent): 安全落定恢复流程并继续 Session，引入五状态恢复视图。
   https://github.com/QwenLM/qwen-code/pull/15131
4. **#15100** feat(managed-agent): Session 生命周期 UI（关闭/归档/恢复/删除）与只读导出。
   https://github.com/QwenLM/qwen-code/pull/15100
5. **#15094** fix(managed): 对齐 checkpoint 预算并暴露恢复阻塞。
   https://github.com/QwenLM/qwen-code/pull/15094
6. **#15053** fix(core): Anthropic 全局 prompt-cache 范围改为全 base URL opt-in，默认仅保留 per-session 缓存断点。
   https://github.com/QwenLM/qwen-code/pull/15053
7. **#14281** feat(memory): CLI 与 HTTP 的 scoped 外部记忆导入任务（首个支持 Codex）。
   https://github.com/QwenLM/qwen-code/pull/14281
8. **#15118** test(core): 钉死 setTools 工具声明实际写入生成配置的回归测试。
   https://github.com/QwenLM/qwen-code/pull/15118
9. **#15121/#15122/#15123/#15127/#15128**（系列）fix(ci): 修复 sdk-java 自托管 host lock 的 fd 泄漏与多小时锁占用，将锁范围收窄到 Maven 缓存写回。
   https://github.com/QwenLM/qwen-code/pull/15121
10. **#15060** fix(web-shell): 切换 Session 时重置阅读暂停，防止暂停状态跨 Session 泄漏。
    https://github.com/QwenLM/qwen-code/pull/15060

---

## 5. 功能需求趋势

- **Managed Agent 成为主线**（数量最多、最集中）：@wenshao 系统性提出 MCP 运行时管理（#15079）、手动上下文压缩（#15080）、Session 归档/搜索/生命周期（#15077、#15078）、容量与空闲回收模型（#15082）、能力对齐矩阵（#15075）、与 legacy daemon 的差距追踪（#15084）——表明 Qwen 正从 CLI 工具向托管多 Agent 平台演进。
- **安全与沙箱**：权限绕过（#15129）、Workspace 沙箱（#15081）。
- **性能与上下文成本**：XML 恢复延迟（#13787）、legacy auto-memory 目录重复 token 开销（#15027）。
- **自动化工作流**：`/autofix-pr`（#15056）、CI autofix 机器人体系持续运转。
- **工具体验打磨**：edit 工具重构（#14979）、read_file 图像能力声明与模型能力不匹配（#15125）。

---

## 6. 开发者关注点

- **稳定性痛点**：daemon 内存泄漏 OOM（#15071）与 CI 自托管环境的锁管理是当前最高频的工程摩擦点（今日 5+ 个 CI lock 相关 PR）。
- **权限模型一致性**：文档承诺与工具实现脱节（deny 规则不覆盖 grep/glob），用户对安全边界的可信度存疑。
- **上下文/token 成本**：记忆目录重复注入、上下文压缩控制权是长会话用户的核心诉求。
- **并发正确性**：后台 subagent 上下文泄漏（#15083）、Hosted 生命周期竞态（#15088）显示异步架构仍是薄弱环节。
- **edit 工具体验**：精确 old_text 匹配屡屡失败，社区已有成熟替代方案可移植，呼声强烈。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*