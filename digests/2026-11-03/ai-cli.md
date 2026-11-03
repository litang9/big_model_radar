# AI CLI 工具社区动态日报 2026-11-03

> 生成时间: 2026-11-03 02:15 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告
**数据日期：2026-11-03**

---

## 1. 生态全景

AI CLI 工具已从单纯的“终端代码补全”演进为**多端（CLI/桌面/iOS/浏览器扩展）、多 agent（子代理编排、后台任务）、企业级治理（MCP 权限、沙箱、可审计性）三位一体的开发平台**。当前竞争焦点集中在四条战线：agent 可靠性与可观测性、跨端会话一致性、安全/权限模型的透明度、以及长会话上下文与成本治理。同时，所有头部工具都面临“功能快速扩张 vs 回归质量”的张力——今日各仓库的热点 Issue 中回归类问题占比显著。子代理体系（Gemini CLI）与 Web Shell/Channel 生态是本轮迭代中最激进的架构押注。

---

## 2. 各工具活跃度对比

| 工具 | 今日热点 Issues | 今日 PR 动态 | Release | 活跃特征 |
|---|---|---|---|---|
| **Claude Code** | 8+（含 20 条批量关闭的 cyber 系列） | 1（内部维护为主，公开 PR 少） | ✅ v2.1.317（安全改进） | Issue 流量巨大，但修复走内部流水线，透明度低 |
| **OpenAI Codex** | 10（28 评论最热） | 10+（copyberry bot 集中合入） | ❌ 无 | PR 产出最高，架构级改动密集 |
| **Gemini CLI** | 10（P1×4） | 12+ | ✅ nightly v0.67.0（单修复） | 高频 nightly 节奏，安全 PR 是暗线 |
| **Copilot CLI** | 10+（含批量关闭） | 2 | ✅ 3 个补丁（v1.0.106-3~-5） | 版本发布最密集（24h 内 3 发） |
| **OpenCode** | 10 | 10 | ❌ 无 | 社区驱动修复响应快（Issue 当日提 PR） |
| **Qwen Code** | 10（P1×4） | 10 | ✅ v0.26.6 稳定版 + nightly + SDK | Web Shell/Managed Agent 高速扩张 |
| **Kimi Code CLI** | 0 | 0 | ❌ 无 | 过去 24h 无活动，生态最沉寂 |

**注**：Claude Code PR 数低不代表不活跃——其修复不通过公开 PR 进行，Issue 吞吐量实为全生态最高。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **跨端一致性（CLI/桌面/iOS）** | Claude Code、Codex、Copilot CLI、Qwen Code | iOS 与桌面会话/项目列表不同步（Codex #36454）、Remote Control 标题不更新（Claude #104749）、iOS 遥控锁死桌面写锁（Codex #44449） |
| **安全过滤误报与权限透明度** | Claude Code、Codex、Copilot CLI、Gemini CLI、Qwen Code | 域名黑名单误杀（reddit/naver）、HTTP 422 安全误判阻塞本地调试、CLI 隐藏策略注入、Git 参数只读校验绕过、Channel 默认开放权限——**全部工具都踩中此痛点** |
| **长会话上下文/内存治理** | OpenCode、Gemini CLI、Qwen Code、Copilot CLI | keep.tokens 失效致 234K tokens、压缩失败、TUI 转录内存无界增长、回放保留全量文件内容 |
| **Token 成本与用量可见性** | Claude Code、OpenCode、Codex | Max 套餐用量异常飙升（#105240）、网关缓存每轮失效推高成本、Copilot 长上下文计价低估 |
| **Agent 编排与可观测性** | Gemini CLI、Copilot CLI、OpenCode、Codex | 子代理状态黑盒、Agent Monitor TUI（PR #5339）、后台 subagent/cron/worktree 提案、侧边对话面板 |
| **认证健壮性** | Claude Code、Copilot CLI | OAuth refresh token 轮换竞态丢失、MCP 请求丢 Authorization 头、匿名连接凭据复用 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 安全合规、企业级防护、浏览器扩展 | 付费订阅（Max 5x/20x）重度用户 | 封闭开发、内部流水线，安全机制先行但缺乏用户侧覆盖 |
| **OpenAI Codex** | 搜索 Provider 架构、MCP 权限治理、TUI、沙箱统一 | 全栈开发者 + 第三方 API 用户 | 开放仓库 + bot 高产合入，架构级重构激进 |
| **Gemini CLI** | 子代理体系、AST 工具链、OS 沙箱 | 开发者 + 研究向用户 | 社区提案驱动路线图（EPIC/Sprint），nightly 快迭代 |
| **Copilot CLI** | ACP 生态 parity、BYOK/自定义模型、企业 MCP | GitHub 生态用户、企业 Entra/OAuth 场景 | 补丁节奏极快，依托 GitHub 分发与策略体系 |
| **OpenCode** | 项目/会话管理 V2、成本透明、社区编排 | 免费层 + 订阅混合、开源偏好用户 | 纯社区驱动，Issue→PR 当日闭环，但 bot 治理粗糙 |
| **Qwen Code** | Web Shell/Channel、Managed Agent、GitHub/GitLab 集成 | 国内生态 + 远程协作场景 | Agent 平台化路线（38 表/843 列的运行时数据库） |

---

## 5. 社区热度与成熟度

- **第一梯队（高热度 + 高成熟）**：**Claude Code**（Issue 吞吐最大，但付费用户对回归长期未修、无法触达人工支持的不满在累积）；**Codex**（PR 产出最高，但桌面端 26.1027.x 连续回归显示发布质量管控薄弱）。
- **快速迭代期**：**Gemini CLI**（nightly 节奏 + 安全加固暗线）、**Qwen Code**（Web Shell 生态高速扩张，CI 基础设施债 155 评论）、**Copilot CLI**（24h 三发，ACP 快速收敛）。
- **成长期/社区驱动**：**OpenCode**（免费层 213 评论聚合贴显示用户基数大，但 bot 治理与 V2 升级体验是短板）。
- **沉寂**：**Kimi Code CLI** 连续无活动。

**健康度信号**：OpenCode 与 Gemini CLI 对 Issue 的响应速度（当日提修复 PR）最积极；Claude Code 的“黑箱修复”模式虽高效但正在消耗社区信任。

---

## 6. 值得关注的趋势信号

1. **“假成功”是 agent 信任的下一道坎**：Gemini 子代理 MAX_TURNS 后仍报 success、Copilot grep 压缩损坏文件名行号——这类**静默错误比崩溃更危险**，会直接误导 agent 决策链。开发者应在工作流中加入独立的结果验证层。
2. **安全默认值从“拦截一切”转向“可解释 + 用户可覆盖”**：全生态集中爆发误报问题，预示下一轮竞争点是权限决策的可审计性（Codex 沙箱统一 PR、Gemini Git 校验修复都是信号）。企业选型时应评估安全策略是否提供申诉/覆盖通道。
3. **TUI 正在重新成为主战场**：Codex 侧边会话面板、Copilot Agent Monitor、OpenCode Side bar 模式——多 agent 并行工作流的终端可视化是明确方向。
4. **异常中断的数据持久化成为硬需求**：SIGHUP/信号/崩溃导致工具结果丢失、排队消息消失、会话不可恢复，横跨 4 个工具。长时间无人值守任务（cron、后台 agent）落地前必须解决。
5. **成本可观测性是订阅制产品的下一个分化点**：用量异常、缓存失效、计价不准同时出现在三个工具，重度用户正在用脚投票。
6. **升级需谨慎窗口期**：Codex 桌面 26.1027.x、Claude Code 2.1.229 等版本均有已知回归，生产环境建议延迟 1-2 个补丁版本再跟进。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-03）

## 一、热门 Skills 排行（按关注度整理）

| # | Skill / PR | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 `mcp>=2.0` 的 `streamable_http_client` 重命名与自定义 HTTP 头，解决 #1668 兼容性痛点；mcp-builder 是生态中被 fix 最多的官方 Skill | OPEN |
| 2 | **Notion Spec to Implementation + Quantitative Resume Auditor** [#1245](https://github.com/anthropics/skills/pull/1245) | 将产品/技术规格转化为 Notion 可执行任务（含验收标准与进度跟踪），讨论持续至 10 月中 | OPEN |
| 3 | **skill-creator 触发评估修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 trigger eval 在 Windows 与多 worker 竞争下的误报，呼应高热度 Issue #556（0% 触发率） | OPEN |
| 4 | **webapp-testing 安全修复** [#1980](https://github.com/anthropics/skills/pull/1980) | 移除 `shell=True`，消除命令注入风险（CWE-78），11 月仍活跃 | OPEN |
| 5 | **Pyxel 复古游戏开发** [#525](https://github.com/anthropics/skills/pull/525) | 由 Pyxel 作者本人提交，支持无头运行与帧检查，存活 8 个月仍活跃 | OPEN |
| 6 | **docx 孤立注释检测 / LibreOffice 超时修复** [#1734](https://github.com/anthropics/skills/pull/1734) / [#1792](https://github.com/anthropics/skills/pull/1792) | document 类 Skill 的可靠性持续打磨（呼应 #2018 XML 损坏问题） | OPEN |
| 7 | **md2video-audio** [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown→带配音 MP4 的零成本转换，社区创意类代表 | OPEN |
| 8 | **scnet-hpc** [#1615](https://github.com/anthropics/skills/pull/1615) | SSH+Slurm HPC 集群操作，反映科研计算场景需求 | OPEN |

## 二、社区需求趋势（Issues 提炼）

1. **信任与安全机制**（最高热）：#492（46 评论）—— 社区 Skill 冒用 `anthropic/` 命名空间造成信任边界滥用；另有 #1394 eval-viewer XSS、#1980 注入修复。安全是第一诉求。
2. **企业级分发能力**：#228（17 评论）—— 组织内共享 Skill 库、直接分享链接，替代 Slack 手动传 `.skill` 文件。
3. **Skill 元质量与工程化**：#556（13 评论，触发率 0%）、#202（skill-creator 最佳实践）、#1487（claude-api 单次注入 156k token 撑爆上下文）—— 社区要求 Skill 本身可评估、可测量、Token 高效。
4. **文档处理可靠性**：docx/pdf/pptx 相关 bug 密集（#2018、#1809），文档生成是最重的实际使用场景。
5. **新方向提案**：compact-memory 符号化记忆压缩（#1329）、推理质量门控流水线（#1385）、agent-governance（#412）—— 面向长时 agent 的记忆与治理。

## 三、高潜力待合并 Skills（活跃且近期可能落地）

- **[#1298](https://github.com/anthropics/skills/pull/1298) skill-creator 触发评估隔离修复** —— 直接回应高热 Issue #556，官方最有动力合并。
- **[#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder mcp>=2 适配** —— 修复核心工具链兼容性，配套 Issue #1390 显示 mcp-builder 评估体系急需修复。
- **[#1997](https://github.com/anthropics/skills/pull/1997) skill-creator YAML frontmatter 解析修复** + [#1975](https://github.com/anthropics/skills/pull/1975)/[#1976](https://github.com/anthropics/skills/pull/1976)/[#1977](https://github.com/anthropics/skills/pull/1977)（@gerardrecinto 的批量小修复系列）—— 均直接修复已确认 Issue，合并阻力小。
- **[#1980](https://github.com/anthropics/skills/pull/1980) webapp-testing 安全修复** —— 对应 #492 安全大背景，优先级高。
- **[#525](https://github.com/anthropics/skills/pull/525) Pyxel** —— 上游作者维护、质量高，长期活跃有望落地。

## 四、生态洞察（一句话）

> 社区当前最集中的诉求是 **"可信与可用"**：建立官方命名空间信任边界与 Skill 安全审计机制，同时让 Skill 的触发与执行做到可评估、Token 高效、跨平台可靠——即从"能写 Skill"走向"可信赖的 Skill 工程化"。

---

# Claude Code 社区动态日报 — 2026-11-03

## 一、今日速览

Claude Code 发布 v2.1.317，安全相关改进成为亮点：新增账户邮箱外发确认机制和 `/schedule` 连接器透明化警告。社区方面，[Bug][cyber] 系列安全过滤误报 Issue 集中被批量关闭（多为 duplicate），而 Chrome 扩展对 reddit.com 的安全拦截误报和 Max 订阅用量异常飙升仍是讨论最热烈的话题。

## 二、版本发布

**v2.1.317** 主要更新：
- `/schedule` 新增警告：当新建云端定时任务被附加了未请求的 connectors 时会提示，并说明如何移除
- 新增检查：web 或 shell 工具调用若会将账户邮箱发送到网络，会先征求用户确认
- Agent SDK hook 新增 `onFailure: "block"` 选项

## 三、社区热点 Issues

1. **[#95326](https://github.com/anthropics/claude-code/issues/95326)** — Claude in Chrome 自 9/18 起对 reddit.com 全部工具拦截（"safety restrictions"），35 👍 / 29 评论，持续近两个月未修复，是浏览器扩展方向最严重的回归之一。
2. **[#105240](https://github.com/anthropics/claude-code/issues/105240)** — Max 5x 用户报告周用量 48 小时内达 94%，10/24 后明显恶化，涉及计费/用量统计准确性，订阅用户高度关注。
3. **[#105477](https://github.com/anthropics/claude-code/issues/105477)** — Max 20x 用户反馈 Opus 5.5 自 10 月中旬起持续退化至不可用，并抱怨无法联系到 Anthropic 人工支持，14 👍 反映共鸣强烈。
4. **[#88391](https://github.com/anthropics/claude-code/issues/88391)** — Desktop 端 prompt suggestions 自 2.1.229 起静默消失，标记 has repro 的回归 bug，至今未修。
5. **[#95539](https://github.com/anthropics/claude-code/issues/95539)** — naver.com（韩国最大门户）被默认安全黑名单整体拦截，典型的地域性域名误判，daum.net 等同类站点却正常。
6. **[#102265](https://github.com/anthropics/claude-code/issues/102265)** — 短生命周期子命令（`claude plugin validate`）在 OAuth refresh 中途退出导致 rotated token 丢失，下一进程 `invalid_grant` 并清空登录态，认证链路设计缺陷，has repro。
7. **[#104749](https://github.com/anthropics/claude-code/issues/104749)** — Remote Control 的 `/rename` 无法更新 iOS 端会话标题，跨端体验问题。
8. **[#62135](https://github.com/anthropics/claude-code/issues/62135)** — curl/gh 命令虽有 allow 规则仍提示权限。作者更新澄清这实为合理行为（curl -X DELETE 等非只读），已关闭，是权限系统语义误解的典型案例。
9. **[#90854](https://github.com/anthropics/claude-code/issues/90854)（及 90827–90855 系列约 20 条）** — 同一用户批量提交的 [Bug][cyber] 安全过滤误报系列（Opus 4.8 标记、session-halted），今日集中被关闭为 duplicate，暗示官方已有统一跟踪入口。

## 四、重要 PR 进展

过去 24 小时仅 1 条 PR 更新：

- **[#106583](https://github.com/anthropics/claude-code/pull/106583)**（已关闭）— 将仓库内三个 Claude 驱动的 GitHub Actions workflow（issue triage、dedupe、claude.yml）从 Opus 4.6 / Sonnet 4.6 统一升级到 Sonnet 5.5。反映了官方 CI 智能化维护栈的模型迭代节奏。

> 说明：该仓库日常 issue 修复不通过公开 PR 进行，PR 流水线以内部维护为主，本日无其他 PR 动态。

## 五、功能需求趋势

- **安全过滤的可控性与透明度**：域名黑名单误报（reddit、naver）与 cyber 误报系列是近期最密集的反馈方向，社区希望黑名单可配置、误报有申诉通道。
- **订阅用量与计费可见性**：Max 套餐用量统计异常（#105240）引发对用量仪表准确性和配额消耗明细的需求。
- **模型稳定性与降级反馈**：Opus 5.5 回归问题（#105477）显示用户希望有模型问题公告或版本回退机制。
- **跨端一致性（Remote Control / iOS / Desktop）**：会话标题同步、Desktop 回归等表明多端体验是重点诉求。
- **认证健壮性**：OAuth token 轮换竞态/丢失类问题持续出现，需要更可靠的凭据管理。

## 六、开发者关注点

1. **安全拦截误伤生产力**：安全过滤（site blocklist、cyber safeguard）误报直接阻断授权工作，且缺乏用户侧覆盖手段，是当前最集中的痛点。
2. **配额消耗不明**：订阅用户对用量异常攀升感到焦虑，需要更透明的 token 消耗报告。
3. **难以触达人工支持**：付费用户（Max 20x）反馈问题只能靠 GitHub issue，缺少正式支持通道。
4. **回归频发**：2.1.229（prompt suggestions）、9/18（Reddit 拦截）等回归长期未修，用户对回归测试覆盖度存疑。
5. **凭据与多进程安全**：短命子命令与并发会话场景下的 OAuth refresh token 处理仍有边界缺陷。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-11-03

## 📌 今日速览

今日无新版本发布，但仓库活跃度极高：大量由 copyberry bot 提交的 PR 集中合入，覆盖搜索 Provider 架构、MCP 权限治理、TUI 体验和 SQLite 并发安全等多个方向。Issue 侧，桌面端（Windows/macOS）XLSX/PPT 附件上传卡死问题持续发酵，CLI @Browser 在 Windows 上不可用（28 条评论）成为最热话题。

---

## 🔥 社区热点 Issues

**1. Windows 终端 CLI @Browser 报 "browser access host is unavailable"**（28 评论 / 11 👍）
桌面应用更新至 26.1023.6123.0 后浏览器功能失效，影响 Windows 11 + Brave 用户，是当前讨论最激烈的回归问题。
[链接](https://github.com/openai/codex/issues/57641)

**2. iOS 远程项目列表与桌面端不同步**（22 评论）
iOS 端项目列表未以 Desktop 为唯一事实来源，长期未解决的跨端同步缺陷。
[链接](https://github.com/openai/codex/issues/36454)

**3. Work 设置中本地浏览器使用被禁用**（20 评论）
Windows 用户升级后被强制禁用本地浏览器功能，疑似策略下发问题。
[链接](https://github.com/openai/codex/issues/56645)

**4. macOS 桌面端 XLSX 附件上传无限转圈**（16 评论）
26.1027.30824 版本上的高影响力回归，与 #58432、#58252 形成同根问题簇。
[链接](https://github.com/openai/codex/issues/58302)

**5. iOS Remote Control 导致桌面端 "already has an active writer" 锁死**（12 评论 / 7 👍）
远程控制会话未正确释放线程写锁，阻断桌面端继续工作。
[链接](https://github.com/openai/codex/issues/44449)

**6. 已发布的 Codex Cloud Start skill 在新任务中缺失**（9 评论 / 3 👍）
Skills 发布链路存在上下文注入缺陷，直接影响云任务可复现性。
[链接](https://github.com/openai/codex/issues/50879)

**7. GPT-6.1 Sol 持续报 "model is at capacity"**（5 评论）
与 #57443 同类，容量/限流问题影响正常工作流，社区不满情绪上升。
[链接](https://github.com/openai/codex/issues/58824)

**8. 裸 CLI 注入隐藏 granular policy 导致网络升级被拒**（4 评论）
沙箱策略注入不透明，引发对 CLI 安全模型可审计性的质疑。
[链接](https://github.com/openai/codex/issues/56732)

**9. [回归] Commit 7ce5fa7 破坏跨 Provider 会话恢复**（3 评论 / 2 👍）
影响使用第三方 API 的用户，属于功能回归，需要优先修复。
[链接](https://github.com/openai/codex/issues/58865)

**10. Windows Computer Use 报告错误焦点元素**（8 评论）
计算机使用功能的元素定位在窗口生命周期变化时不稳定，制约自动化可靠性。
[链接](https://github.com/openai/codex/issues/58482)

---

## 🛠 重要 PR 进展

**1. [#59036](https://github.com/openai/codex/pull/59036) 搜索 Provider 策略感知回退** — 模型选择的搜索 Provider 需兼顾宿主限制并保留已有浏览引用归属，是搜索架构核心改动。

**2. [#59034](https://github.com/openai/codex/pull/59034) MCP 绑定中增加模型 Search 发现** — 通过已授权的宿主 Apps 连接发现模型搜索工具档案，打通搜索与 MCP 生态。

**3. [#59033](https://github.com/openai/codex/pull/59033) Web 搜索 Provider 元数据与配置** — 新增 `ModelInfo.web_search_provider`（standalone / search_mcp）及 `client_search_provider` 配置项。

**4. [#59028](https://github.com/openai/codex/pull/59028) Guardian 审查使用 MCP 预备权限** — 修复 MCP 权限在调用准备后变更导致审查遗漏的安全隐患，与 #58401 相关。

**5. [#59009](https://github.com/openai/codex/pull/59009) 集中文件系统权限解析** — 统一 Linux bubblewrap 与 macOS Seatbelt 的沙箱策略生成路径，回应社区对沙箱透明度的诉求。

**6. [#59015](https://github.com/openai/codex/pull/59015) SQLite 迁移并发安全** — 修复 SQLx 迁移锁无效导致的并发启动竞态，提升多进程稳定性。

**7. [#59007](https://github.com/openai/codex/pull/59007) TUI 多后端 Host 切换** — `leader b` 快捷键循环切换连接，保存新建会话默认 Host。

**8. [#58998](https://github.com/openai/codex/pull/58998) 保留长运行 Turn 的 steering 能力** — 修复切回运行中线程时因 replay buffer 淘汰导致转向失效的问题。

**9. [#58992](https://github.com/openai/codex/pull/58992) TUI 侧边对话面板（实验性）** — 新增 `tui_workspace` feature，支持并排显示父子会话，终端体验重大扩展。

**10. [#59016](https://github.com/openai/codex/pull/59016) 线程元数据写入原子化** — 防止部分失败留下不一致状态，支持重试，与 #59027（项目历史丢失）问题相关。

---

## 📈 功能需求趋势

- **附件/文件上传可靠性**：XLSX/PPT 上传卡死或静默丢弃（#58302/#58432/#58252/#59030）成为桌面端最高频故障主题。
- **跨端同步与会话状态**：iOS/桌面同步、远程控制锁、项目历史丢失（#36454/#44449/#59027）反映多端一致性是长期痛点。
- **沙箱与权限透明度**：社区要求权限决策可解释、可审计（#58401/#56732/#59023），与近期 Guardian 相关 PR 方向呼应。
- **模型容量与限流**："at capacity" / 429 错误在 Plus 用户中集中爆发（#58824/#57443/#51478）。
- **MCP 工具生态**：请求 agent 可自主刷新 MCP 连接与工具发现（#56970）。

## ⚠️ 开发者关注点

1. **桌面端回归质量**：26.1027.x 版本连续引入附件上传回归，Windows 与 macOS 均受影响，建议升级前评估。
2. **跨 Provider 兼容性**：#58865 回归表明 API 用户对会话可恢复性的诉求需纳入回归测试。
3. **可观测性改善**：#59018（WebSocket 指标）、#59021（安装 ID 并发读）等 PR 显示官方在持续加固底层稳定性，值得关注后续版本。
4. **TUI 能力快速演进**：多后端切换、侧边面板等功能表明终端体验仍是重点投入方向。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-11-03

## 1. 今日速览

今日发布 nightly 版本 v0.67.0，核心修复了 Whisper 语音模型下载中断后误判为已安装的问题。社区讨论焦点高度集中在**子代理体系**上——包括子代理挂起、终止状态误报、配置失效等多个 P1 级问题。此外，安全方向出现了一个 P1 级的 Windows Git 权限绕过修复 PR，值得关注。

---

## 2. 版本发布

### [v0.67.0-nightly.20261103.g0ac57c029](https://github.com/google-gemini/gemini-cli/compare/v0.67.0-nightly.20261102.g6814e00d6...v0.67.0-n)

- **fix(core)**: 修复 Whisper 模型下载被中断/截断后，残留的部分文件被 `isModelInstalled()` 误判为已安装的问题（PR #30058）

本版本为单修复 nightly 版本，变更较轻量。

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) · P1 · 13 评论 | `codebase_investigator` 子代理达到 MAX_TURNS 上限却上报 `GOAL success`，**成功状态误报掩盖了任务中断**——这直接影响用户对 agent 结果的信任度，是可靠性核心问题 |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) · P1 · 8 评论 · 👍8 | 通用代理（generalist agent）无限挂起，简单如创建文件夹的操作也会卡死长达一小时，需手动禁止子代理才能规避，👍 数最高说明影响面广 |
| 3 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) · P2 · 9 评论 | 架构级提案：利用 Gemini 3 原生 bash 能力，通过零依赖 OS 沙箱 + 执行后意图路由替代传统工具调用，是 agent 执行模型演进的重要讨论 |
| 4 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) · P2 · 7 评论 | EPIC：评估 AST 感知的文件读取/搜索/代码库映射，可减少 token 噪声和错位读取，与 #22746/#22747 构成完整调研线 |
| 5 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) · P2 · 7 评论 | 模型**几乎从不主动使用**自定义 skills 和子代理，仅在明确指令下才触发——这是 agent 自主调度能力的代表性短板 |
| 6 | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) · P2 · 5 评论 | Browser Agent 完全忽略 `settings.json` 中的 `maxTurns` 等覆盖配置，AgentRegistry 读取了配置但未生效 |
| 7 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) · P1 · 4 评论 | browser 子代理在 Wayland 下失败，影响 Linux 桌面用户（与今日 PR #30097 的 WSL2 剪贴板问题同属 Linux 图形生态适配痛点） |
| 8 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) · P2 · 3 评论 | 工具数量超过 128 个时触发 API 400 错误，暴露了工具作用域管理缺失，重度扩展用户必踩 |
| 9 | [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) · P2 · 3 评论 | Agent 偶尔使用 `git reset --force` 等破坏性命令，呼吁增加破坏性行为防护——安全相关，社区呼声明确 |
| 10 | [#23571](https://github.com/google-gemini/gemini-cli/issues/23571) · P2 · 3 评论 | 模型频繁在随机目录创建临时编辑脚本，清理成本高，影响工作区整洁度与提交卫生 |

> **观察**：今日活跃 Issues 中 `area/agent` 标签占比极高，子代理生态是当前矛盾最集中的领域。

---

## 4. 重要 PR 进展（Top 10）

| # | PR | 内容 |
|---|-----|------|
| 1 | [#30095](https://github.com/google-gemini/gemini-cli/pull/30095) · **P1/security** | 修复 Windows 上 Git 命令安全校验绕过：危险 Git 参数可能被误判为只读安全操作；提取共享校验 helper 并在 Windows 上应用一致的只读白名单 |
| 2 | [#30051](https://github.com/google-gemini/gemini-cli/pull/30051) | headless 模式（`gemini -p --yolo`）被信号中断时：正确终止活动 shell、持久化 tool calls、以标准信号退出码退出而非 exit 0 |
| 3 | [#30094](https://github.com/google-gemini/gemini-cli/pull/30094) | 修复子代理 tool calls（无需审批的读/搜索类）不显示在 UI 状态中的问题，直接对应“子代理黑盒”痛点 |
| 4 | [#30097](https://github.com/google-gemini/gemini-cli/pull/30097) | WSL2 图片粘贴修复：增加 WSLg 剪贴板检测（`WAYLAND_DISPLAY` 回退）+ BMP 格式兜底 |
| 5 | [#30058](https://github.com/google-gemini/gemini-cli/pull/30058) ✅ 已合入今日 nightly | Whisper 模型下载中断防护，避免部分文件被误认为已安装（今日发版内容） |
| 6 | [#30100](https://github.com/google-gemini/gemini-cli/pull/30100) | 扩展下载加固：流错误处理、部分文件清理、SSRF/重定向防护、socket 超时——安全与健壮性双重提升 |
| 7 | [#29958](https://github.com/google-gemini/gemini-cli/pull/29958) | 修复 ACP 客户端收到的 `run_shell_command` 结果为空的问题（`AnsiOutput` 未被转发） |
| 8 | [#30003](https://github.com/google-gemini/gemini-cli/pull/30003) / [#30096](https://github.com/google-gemini/gemini-cli/pull/30096) | `${VAR:-default}` 语义对齐 Bash：环境变量设为空字符串时使用默认值（双 PR 竞争同一问题 #30000，可关注维护者取舍） |
| 9 | [#30102](https://github.com/google-gemini/gemini-cli/pull/30102) | 遥测修复：IDE 连接此前被记为 `start_session`，虚增会话计数；改用 `ide_connection` 事件 |
| 10 | [#29977](https://github.com/google-gemini/gemini-cli/pull/29977) / [#29978](https://github.com/google-gemini/gemini-cli/pull/29978) | `read_background_output` 两处修复：尊重取消信号（不再空等 delay）+ 保留超长/边界行（修复 64KB 窗口首行丢失） |

其他值得一看：[#30104](https://github.com/google-gemini/gemini-cli/pull/30104)（`/skills link` 后刷新斜杠命令）、[#29951](https://github.com/google-gemini/gemini-cli/pull/29951)（P0：集成测试 VS Code 下载重试）、[#29831](https://github.com/google-gemini/gemini-cli/pull/29831)（ripgrep 超时返回部分结果的修复已关闭）。

---

## 5. 功能需求趋势

从 Issue 分布可提炼出以下方向：

1. **子代理体系成熟化**（绝对主导）：并行子代理协作与共享内存（#18287）、子代理轨迹分享（#22598）、`/bug` 报告包含子代理上下文（#21763）、symlink 识别（#20079）——官方已有 Sprint 规划（#20195）
2. **AST 感知工具链**：#22745/#22746/#22747 系列，探索 ast-grep、tilth、glyph 等工具提升代码读取与搜索精度
3. **Token 效率**：#19561 "Tactful Extraction" 提出外科手术式代码发现层级，目标降低 36.6k/turn 的上下文基线；#18836 提议用文件级 CRUD 任务追踪替代 in-context WriteToDo，对抗 context rot
4. **沙箱与安全执行**：#19873 OS 级零依赖沙箱提案、#22672 破坏性命令防护、今日多个安全 PR——安全执行成为明确路线
5. **Browser/IDE 集成韧性**：浏览器会话接管与锁恢复（#22232）、Wayland/WSL 兼容、VS Code companion 一系列修复
6. **评估体系建设**：内部 eval 稳定化（#23166）、steering eval 修复（#23313）

---

## 6. 开发者关注点（痛点总结）

- **可靠性信任危机**：子代理“假成功”（#22323）与无限挂起（#21409）叠加，用户无法信任委派结果，宁可禁用子代理
- **可观测性不足**：子代理内部状态在 UI 与 `/bug` 报告中均不可见，排障困难（#21763、PR #30094 正面回应）
- **自主调度弱**：模型不主动调用 skills/子代理，需要显式指令（#21968）
- **工具规模上限**：>128 工具即 400 报错，MCP/扩展重度用户受限（#24246）
- **工作区卫生**：临时脚本散落（#23571）、破坏性 git 命令（#22672）——自动化善后成本高
- **Linux 桌面生态二等公民感**：Wayland 浏览器代理失败、WSL2 粘贴失效，图形相关适配长期缺位

> **今日一句话**：子代理的“能用”到“可信”之间，还隔着状态上报、可观测性和自主调度三座山；安全加固（Windows Git、扩展下载、SSRF）则是本周默默推进的暗线。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-03** | 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)

---

## 📌 今日速览

过去24小时 Copilot CLI 密集发布 3 个补丁版本（v1.0.106-3 ~ -5），重点修复 ACP 模式配置问题、`@file` 提及在括号/引号内失效等高频痛点。社区围绕**队列消息可取消**、**BYOK 多模型切换**两大功能需求持续热议，ACP 生态相关问题批量关闭，显示该模块进入快速收敛期。

---

## 🚀 版本发布（3 个）

### v1.0.106-5
- **修复**：ACP 模式（`copilot --acp`）现在正确遵守 `includeCoAuthoredBy: false` 设置，ACP 客户端不再强制添加 Co-authored-by 尾注
- 定向 `/settings` 命令立即显示所选设置
- 修复恢复会话时的 telemetry 禁用警告问题

### v1.0.106-4
- **修复**：空会话不再在会话选择器中闪烁后消失
- **修复**：写在括号、引号、反引号内的 `@file` 提及现在能正确附加文件并在 `!` shell 命令中展开，不再被静默忽略

### v1.0.106-3
- **新增**：opt-in 的会话管理工具及本地会话 `@mentions`
- **改进**：托管账户策略刷新警告现在包含 Policy Helper 结果，策略解决后自动清除
- **修复**：匿名连接可复用有效的已保存 MCP OAuth 凭据

---

## 🔥 社区热点 Issues（Top 10）

| # | Issue | 关注度 | 为什么重要 |
|---|-------|--------|-----------|
| 1 | [#1857](https://github.com/github/copilot-cli/issues/1857) 允许取消/移除已排队的消息 | 👍33 💬15 | 用户通过 `Ctrl+Q` 排队的消息一旦入队无法撤回，误操作会全部执行，长会话场景风险高。讨论活跃，是输入交互领域最高呼声需求之一 |
| 2 | [#3709](https://github.com/github/copilot-cli/issues/3709) `/model` 支持单会话内切换多个模型（含 BYOK/本地） | 👍34 💬14 | BYOK 模式被 `COPILOT_MODEL` 钉死在单一模型，`/model` 选择器不显示本地 provider 的模型，重度自定义用户核心痛点 |
| 3 | [#5112](https://github.com/github/copilot-cli/issues/5112) 支持 OSC 7501 程序状态协议 | 👍11 💬5 | 让终端实时显示 agent 状态（working/blocked），是终端深度集成的代表需求，反映社区对 TUI 可观测性的关注 |
| 4 | [#5133](https://github.com/github/copilot-cli/issues/5133) ✅已关闭 ACP 模式忽略 `includeCoAuthoredBy: false` | 💬2 | 与 v1.0.106-5 修复直接对应，ACP 用户提交信息卫生问题正式解决 |
| 5 | [#5171](https://github.com/github/copilot-cli/issues/5171) Windows NumLock 关闭时小键盘导航/删除失效 | 💬2 | v1.0.98 引入的回归问题，笔记本用户（无鼠标场景）受影响明显 |
| 6 | [#3015](https://github.com/github/copilot-cli/issues/3015) MCP Streamable HTTP 中 tools/call 丢失 Authorization 头 | 💬2 👍2 | OAuth 2.1 + DCR 流程中 initialize 后续请求不带 Bearer 头，导致 MCP 服务器会话失效，阻塞企业级 MCP 部署 |
| 7 | [#5145](https://github.com/github/copilot-cli/issues/5145) 自定义 provider 思考模式下 `reasoning_text` 400 错误 | 💬2 👍2 | DeepSeek 等自定义模型在后台 shell 退出后触发 HTTP 400，暴露 runtime 合成 assistant turn 的协议兼容问题 |
| 8 | [#4646](https://github.com/github/copilot-cli/issues/4646) 自定义模型 `/compact` 失败（"Tool choice must be auto"） | 💬2 | 压缩是长会话刚需，自定义 OpenRouter 模型用户完全无法使用，配合 #5145 反映自定义模型生态成熟度不足 |
| 9 | [#5304](https://github.com/github/copilot-cli/issues/5304) WSL2 下 `/keep-alive` 无法阻止 Windows 休眠 | 💬2 | WSL 被当作 Linux 用 `systemd-inhibit`，跨系统电源管理失效，长任务用户机器中途休眠造成损失 |
| 10 | [#5318](https://github.com/github/copilot-cli/issues/5318) grep 输出压缩损坏文件名和行号 | 💬1 | 内置 rg 工具的压缩逻辑把数字后缀误判为分隔符，**合并不同文件、错标行号**——会直接误导 agent 的代码定位，属于影响正确性的高危缺陷 |

**其他值得注意**：[#4891](https://github.com/github/copilot-cli/issues/4891) Windows 硬崩溃（0xc0000005）丢失进行中对话；[#5335](https://github.com/github/copilot-cli/issues/5335) HTTP 422 网络安全误判阻塞合法本地调试；[#5319](https://github.com/github/copilot-cli/issues/5319) Cloud relay 会话不可用。

---

## 🔀 重要 PR 进展

过去24小时仅 2 个 PR 更新（数据受限）：

### [#5339](https://github.com/github/copilot-cli/pull/5339) 只读 Agent Monitor TUI（Graph + Timeline）⭐
- 作者 @ychu-msft，新增 `tools/agent-monitor` 独立终端查看器
- 针对单一指定本地会话，可视化展示 agent 间启动/等待关系与耗时，回答“哪个 agent 启动了哪个、谁在等谁、等了多久”
- 直接呼应社区对 agent 编排可观测性的需求，值得关注

### [#5321](https://github.com/github/copilot-cli/pull/5321) ADJU 手机摄像头 Windows 应用
- 作者 @kapalj372-beep，Android/iPhone 通过局域网 Wi-Fi + WebRTC 给 PC 提供摄像头画面
- PIN 授权 WebSocket 信令、CustomTkinter 预览界面
- ⚠️ **与本仓库定位明显不符**，疑似无关贡献，预计不会被合并

---

## 📈 功能需求趋势

1. **自定义模型 / BYOK 生态成熟**：#3709、#5145、#4646 密集出现，用户对自定义 provider 的模型切换、压缩兼容、思考模式协议支持需求强烈
2. **ACP 模式完善**：过去24小时 #5133、#5268、#5269、#4700、#4106 等 ACP 相关 issue 批量关闭，加上 v1.0.106 系列修复，ACP 正在快速补齐与交互模式的 parity
3. **MCP / 认证可靠性**：OAuth 头丢失（#3015）、Entra broker 并发登录失败（#5250）、resource 尾斜杠不匹配（#5337）——企业级 MCP 接入是持续焦点
4. **交互细节与键盘体验**：消息队列管理（#1857）、快捷键语义分离（#3245）、Ctrl+C 复制冲突（#4789）等精细化交互需求持续升温
5. **可观测性与远程控制**：OSC 7501 状态上报（#5112）、agent monitor（PR #5339）、移动端语音遥控（#5315），反映 CLI 向“可监控、可远程”方向演进

---

## ⚠️ 开发者关注点（痛点总结）

- **长会话可靠性**：压缩失败、硬崩溃丢对话、队列消息不可控，是重度用户最大痛点
- **工具输出正确性**：grep 压缩损坏结果（#5318）属于“静默出错”类缺陷，会误导 agent 决策，建议优先修复
- **跨平台细节**：Windows（NumLock、硬崩溃）和 WSL2（电源管理）的边缘问题积累较多
- **误判拦截**：422 网络安全标记（#5335）阻塞合法调试任务，安全策略与可用性的平衡需改进
- **多任务 agent 场景**：重复 skill 加载（#4430）、steering 消息跳过 hook（#4640）显示多 agent/hook 体系仍有边界情况待处理

---
*本报告基于过去24小时 GitHub 公开数据自动整理，仅供技术参考。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-11-03

## 一、今日速览

今日无新版本发布，社区活跃度集中在问题修复与功能讨论：免费层（Free tier）问题聚合贴 [#59387](https://github.com/anomalyco/opencode/issues/59387) 评论已突破 213 条，成为最高热度话题；项目管理模块迎来密集修复，两个针对 git 仓库识别与项目身份的新 PR（#61314、#61317）当日提交；此外用户对自动分诊机器人 Openbotjr 错误关闭 Issue 的不满开始发酵。

## 二、版本发布

过去 24 小时无新 Release。

## 三、社区热点 Issues

1. **#59387 [zen] Free tier 问题汇总贴（213 评论）**
   免费层用户集中反馈"配额已用尽""重置不生效""版本不支持"等问题，是当前最活跃的讨论串。
   https://github.com/anomalyco/opencode/issues/59387

2. **#61304 Openbotjr 机器人错误关闭 Issue（4 评论）**
   用户投诉分诊机器人在已有回复的情况下仍以"未收到回应"为由关闭 Issue，且无法 @ 通知，影响社区信任度，值得官方优先处理。
   https://github.com/anomalyco/opencode/issues/61304

3. **#49827 migrate-v1：V1→V2 升级后 global 项目会话不可见（20 评论，已复现）**
   V2 按目录分项目导致非 git 目录的旧会话在 TUI 中"消失"，升级体验的核心痛点。
   https://github.com/anomalyco/opencode/issues/49827

4. **#55446 Desktop/Web 侧边栏按项目分组会话（15 评论，13 👍）**
   请求侧边栏支持按项目折叠分组（对标 Codex Projects 视图），是 UI 方向呼声最高的需求之一。
   https://github.com/anomalyco/opencode/issues/55446

5. **#43250 keep.tokens 配置失效，上下文膨胀 15 倍（8 评论，已复现）**
   压缩回溯逻辑无上限且跳过合成消息，15K 配置下实际携带 234K tokens，直接影响成本与性能。
   https://github.com/anomalyco/opencode/issues/43250

6. **#61303 Windows 非 git 目录新建项目解析为 C:\ 根目录（4 评论）**
   V2.2.5 上 `C:\OpenCode General` 被识别为名为 "Root" 的 C:\ 根项目，Windows 用户体验受损。
   https://github.com/anomalyco/opencode/issues/61303

7. **#61276 经 Go 网关的缓存几乎每轮失效（3 评论）**
   更新后缓存命中率骤降，多 subagent 并发场景尤为明显，直接推高订阅用户成本。
   https://github.com/anomalyco/opencode/issues/61276

8. **#61313 TUI 转录内存随全量会话日志增长（2 评论）**
   压缩只限制模型请求，客户端 JS 堆仍持有全部转录页，长会话存在内存膨胀风险。
   https://github.com/anomalyco/opencode/issues/61313

9. **#61009 目录 git 化后 session list 返回空（2 评论，已复现）**
   项目注册表产生重复条目（pre-git 与 post-git 各一），已有修复 PR #61314 当日提交，响应迅速。
   https://github.com/anomalyco/opencode/issues/61009

10. **#49842 社区提案：后台 subagent、monitors、cron、worktree 隔离（4 评论）**
    用户分享自己 fork 的编排功能实现并愿意拆分 PR，展示了社区对 agent 编排能力的强烈兴趣。
    https://github.com/anomalyco/opencode/issues/49842

## 四、重要 PR 进展

1. **#61317 fix(core): 独立 git clone 获得独立项目身份**
   修复使用 remote URL 作为项目标识导致不同 clone 混淆的问题，关联 5 个历史 Issue。
   https://github.com/anomalyco/opencode/pull/61317

2. **#61314 fix(core): 目录变为 git 仓库后重建 location**
   直接修复 #61009，location 图缓存生命周期过长导致的身份钉死问题。
   https://github.com/anomalyco/opencode/pull/61314

3. **#61315 fix(acp): 通过 session_info_update 转发会话标题更新**
   ACP 客户端此前无法收到自动生成的会话标题，改善编辑器/IDE 集成体验。
   https://github.com/anomalyco/opencode/pull/61315

4. **#59803 fix(core): 修正 Copilot 长上下文与缓存写入计价**
   修复长会话中 Copilot 成本被严重低估的问题，涉及分级定价。
   https://github.com/anomalyco/opencode/pull/59803

5. **#55261 feat(tui): 提示词历史作用域设置**
   对应 #52154，新增 `prompt.history_scope`，支持 Up 键仅回溯当前会话历史。
   https://github.com/anomalyco/opencode/pull/55261

6. **#61228 fix(tui): 支持启用原生输入解析**
   在 `/experiments` 中暴露 native input parser 开关，改善终端输入兼容性。
   https://github.com/anomalyco/opencode/pull/61228

7. **#61299 feat(tui): 支持 @ 引用项目目录外文件**
   将 V1 实现移植到 V2，长期缺失的高频功能。
   https://github.com/anomalyco/opencode/pull/61299

8. **#60867 feat(app): 独立 Side bar 模式（Draft）**
   新增第四种界面模式，用于并行工作流，等待维护者设计评审。
   https://github.com/anomalyco/opencode/pull/60867

9. **#60543 docs(cli): 完善 run --format json 记录结构与退出码文档**
   降低脚本作者需读源码才能使用 NDJSON 输出的门槛。
   https://github.com/anomalyco/opencode/pull/60543

10. **#60750 feat(cli): 新增 opencode doctor（已关闭）**
    只读诊断工具，检查数据目录与隐藏故障模式，源自真实升级事故，配套 #60748 日志凭据脱敏 PR，工程实践价值高。
    https://github.com/anomalyco/opencode/pull/60750

## 五、功能需求趋势

- **项目/会话管理升级**：V2 项目化改造后遗症集中爆发（#49827、#61009、#61303），同时社区强烈要求更强的项目分组与导航能力（#55446、#39284）。
- **成本与用量透明**：缓存失效（#61276）、计价不准（#59803）、模型使用展示（#61311）反映订阅用户对成本可观测性的诉求。
- **Agent 编排能力**：后台 subagent、cron 调度、worktree 隔离（#49842）和 Side bar 并行模式（#60867）显示社区向"多 agent 并行"方向演进。
- **模型与区域灵活性**：DeepSeek 模型的 US/EU 托管请求（#61077）、隐藏付费模型的 `OPENCODE_ONLY_FREE_MODELS`（#60383）。
- **上下文与内存治理**：keep.tokens 失效（#43250）与 TUI 内存增长（#61313）指向压缩机制需更彻底的端到端治理。

## 六、开发者关注点

1. **Free tier / Go 订阅稳定性**是当前最大痛点：免费层报错、意大利等地区支付被拒（#52958）、网关返回非法 JSON 导致会话卡死（#60753）。
2. **自动化运维（Openbotjr）质量问题**引发社区信任危机：错误关闭有效 Issue、无法交互（#61304），建议官方尽快优化机器人逻辑或补充人工复核。
3. **长会话资源治理**不足：压缩配置不生效、缓存失效、客户端内存无界增长，三者在重度用户（多 subagent、25h+ 会话）中叠加放大。
4. **Windows 支持与项目识别**：非 git 目录解析到 C:\ 根、git 化后身份失效，说明 V2 的 VCS 探测层需要系统性加固——今日两个修复 PR 已是积极信号。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-11-03）

## 一、今日速览

Qwen Code 发布 **v0.26.6 稳定版**，为受信任工作区的 Web Shell 侧边栏新增活动视图（展示审批/输入/错误状态与未读消息）。社区方面，多个 **P1 级问题**集中爆发：Web Shell 会话打开缓慢、GitHub/GitLab Channel 默认开放权限与文档不符的安全问题、异常会话中断后工具调用结果丢失。Web Shell 与 Managed Agent 生态仍是 PR 活跃的主战场。

---

## 二、版本发布

- **v0.26.6**（稳定版）
  - 新增 Web Shell 侧边栏活动视图：针对受信任工作区会话，实时展示审批、输入、错误状态及未读消息
  - 无破坏性变更
  - [查看 Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.26.6)
- **v0.26.5-nightly.20261102**（夜间版）
- **sdk-typescript v0.1.27**：捆绑 CLI 0.26.6

---

## 三、社区热点 Issues

1. **[#14724](https://github.com/QwenLM/qwen-code/issues/14724)** Main CI 失败：Managed Agent gate 无法定位测试（155 条评论）。CI 基础设施稳定性的长期痛点，讨论量最高。

2. **[#16144](https://github.com/QwenLM/qwen-code/issues/16144)** [P1/安全] Web Shell 创建的 GitHub/GitLab Channel 默认对任何人开放，与文档声称的“群组访问默认关闭”不符，可能暴露未列出的公共仓库。（@wenshao）

3. **[#16171](https://github.com/QwenLM/qwen-code/issues/16171)** [P1/性能] Web Shell 会话打开极慢：live replay 保留了 edit 工具结果中的完整文件内容。（@wenshao）

4. **[#15799](https://github.com/QwenLM/qwen-code/issues/15799)** [P1] 终端关闭（SIGHUP）导致并行工具调用结果未记录，恢复会话时被误报为失败并重试。

5. **[#16169](https://github.com/QwenLM/qwen-code/issues/16169)** [P2] 工具运行期间排队的消息在 SIGHUP 后静默丢失，无任何持久化痕迹。

6. **[#15165](https://github.com/QwenLM/qwen-code/issues/15165)** [P2/性能] Shell 安全解析器在 Node 24.16.0 上触发约 1.6 GiB 的 WASM 编译器瞬时内存尖峰。

7. **[#16127](https://github.com/QwenLM/qwen-code/issues/16127)** [P1] Linux 上 VS Code Companion 0.26.5 在 Electron-as-Node 环境下使用 Sharp 解码图像时 SIGSEGV 崩溃。

8. **[#12970](https://github.com/QwenLM/qwen-code/issues/12970)** [P2] `invalid_tool_params` 错误被误诊为 `max_tokens` 截断，导致模型无效重试消耗 token，且多调用轮次中失败调用不再执行。

9. **[#16157/16158/16159](https://github.com/QwenLM/qwen-code/issues/16157)** 系列模型 ID 解析问题：Bedrock、OpenRouter `:exacto`、Ollama HF 量化标签均导致回退到默认上下文窗口（200K/32K）。

10. **[#15052](https://github.com/QwenLM/qwen-code/issues/15052)** [P2] CI 并发替换导致主分支中间 SHA 缺少独立 E2E 验证结果，影响失败归因。

---

## 四、重要 PR 进展

1. **[#16106](https://github.com/QwenLM/qwen-code/pull/16106)** feat: Web Shell 新增 Channel 事件时间线页面，记录消息接收/跳过/回复及跳过原因。
2. **[#16117](https://github.com/QwenLM/qwen-code/pull/16117)** feat: GitHub 事件可投递到绑定了 PR 的会话（创建/审查/验证过该 PR 的会话）。
3. **[#16149](https://github.com/QwenLM/qwen-code/pull/16149)** feat: Channel 编辑器中直接编辑 GitHub 仓库设置，免去手工改 `settings.json`。
4. **[#16102](https://github.com/QwenLM/qwen-code/pull/16102)** fix: 文件变更卡片限定在会话工作目录内，排除 Git 忽略的未跟踪路径。
5. **[#16170](https://github.com/QwenLM/qwen-code/pull/16170)** fix: 配置同步绑定到 attachment 而非 SSE 流，修复事件流打开前配置写入的时序问题。
6. **[#16172](https://github.com/QwenLM/qwen-code/pull/16172)** fix: 会话回放时压缩大型工具结果显示（配合 #16171 的性能修复方向）。
7. **[#16077](https://github.com/QwenLM/qwen-code/pull/16077)** feat: `/verify-pr` 本地 Docker 方案，模型凭据保留在宿主机通过代理转发。
8. **[#16148](https://github.com/QwenLM/qwen-code/pull/16148)** fix: Managed Runtime worker 不再输出 record_artifact 引导（配合 #16147 内存优化）。
9. **[#16143](https://github.com/QwenLM/qwen-code/pull/16143)** refactor: Managed Agent 38 张表、843 列全英文文档化，对齐 MySQL schema 规范。
10. **[#14672](https://github.com/QwenLM/qwen-code/pull/14672)** feat: 新增 `general.updateMode` 三态设置，解耦更新通知与自动安装。

---

## 五、功能需求趋势

- **Web Shell / Channel 生态**：最活跃方向，围绕 GitHub/GitLab 集成、事件可观测性（时间线）、桌面端复用 Web Shell（[#8092](https://github.com/QwenLM/qwen-code/issues/8092)）。
- **多模型支持健壮性**：Bedrock / OpenRouter / Ollama 等模型 ID 解析与上下文窗口映射问题集中涌现（#16157-16159）。
- **上下文与 Token 优化**：文件/工具输出切片引用（[#16173](https://github.com/QwenLM/qwen-code/issues/16173)）、prompt cache 前缀保持（#6721）。
- **IDE 集成**：VS Code Companion 在 Linux 上的稳定性问题。
- **平台分发**：Fedora/RHEL 的 rpm 安装包缺失（#16034）。

---

## 六、开发者关注点

1. **会话生命周期健壮性**是最大痛点：SIGHUP 后排队消息丢失（#16169）、工具结果未记录误判重试（#15799）、僵尸子进程堆积（#14288），异常中断场景的数据持久化亟需系统性修复。
2. **内存与性能**：WASM 解析器 1.6 GiB 瞬时分配（#15165）、Web Shell 回放保留完整文件内容（#16171）、Managed 沙箱每实例额外 ~166 MiB（#16147）。
3. **CI/CD 可靠性**：多条 CI 失败追踪 issue 长期 open，并发替换导致验证盲区，自动化修复 bot 与人工介入的协作流程仍在磨合。
4. **安全与权限默认值**：Channel 默认开放策略与文档不一致（#16144）、畸形权限规则静默失效（#16078），提示权限解析链路需更严格的校验与告警。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*