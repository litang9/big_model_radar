# AI CLI 工具社区动态日报 2026-10-23

> 生成时间: 2026-10-22 23:21 UTC | 覆盖工具: 7 个

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

**日期：2026-10-23**

---

## 1. 生态全景

AI CLI 工具已全面进入“agentic 编排 + 企业级管控”阶段：各工具的核心战场从单轮代码补全转向多会话/子代理架构、MCP 生态集成和组织级安全策略。同时，**token 经济性（额度、缓存、计费透明度）成为跨所有工具的第一大社区焦虑**，而安全边界（沙箱逃逸、权限旁路、静默数据丢失）是工程投入最密集的方向。快速发版节奏（Codex 一日 4 版、Claude Code 一日 2 版）与稳定性之间的矛盾开始催生“稳定发布通道”诉求，标志着生态从尝鲜期迈向生产期。

---

## 2. 各工具活跃度对比

| 工具 | 今日热点 Issues | 今日活跃 PR | Release | 关键事件 |
|---|---|---|---|---|
| **Claude Code** | 10+（Top: 185👍/65💬） | 7（已关闭，mods 安全框架系列） | v2.1.308/309（2 版） | 沙箱逃逸安全修复；组织级插件安全策略成型 |
| **OpenAI Codex** | 10+（Top: 63💬 MCP 泄漏） | 15+（大量 bot 快速合并） | 4 个 Rust alpha | 内置 Vertex AI provider（多云路线标志性事件） |
| **Gemini CLI** | 10+ | 12+ | 1 nightly | `gemini-4-argon` 模型注册；路径遍历安全修复 |
| **Copilot CLI** | 10+（MCP/OAuth 集中爆发） | 0（PR 不公开） | v1.0.103 | ACP 沙箱修复；语音崩溃回归 |
| **Qwen Code** | 10+（约 10 条 CI 自动 issue） | 10+ | 3（CLI/Desktop/SDK） | K8s 共享 Harness 池；Windows 更新 P1 |
| **OpenCode** | 10+ | 15+ | v1.19.4 | Bun 1.4.4 安全升级；堆快照调试工具链 |
| **Kimi Code CLI** | 0 | 0 | 无 | 过去 24 小时无活动 |

**观察**：Codex 与 Gemini CLI 工程产出最高（自动化 bot 流水线成熟）；Claude Code 单 issue 互动深度最强；Copilot CLI 以 Releases 交付为主、社区主要承担报 bug 职能。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **Token 成本与计费透明** | Claude Code（缓存 TTL 回归 #103673、Team 档位 #47509）、Codex（银行化重置 #56262/56259、agent 擅自扩任务 #56223）、OpenCode（缓存失效重计费 #58175、无限思考烧钱 #42923）、Copilot CLI（PRU 配额清空 #4802） | 全部工具均有付费用户成本投诉，“额度被隐性浪费”是最大公约数痛点 |
| **沙箱与安全边界** | Claude Code（沙箱逃逸修复、组织策略 PR 系列）、Copilot CLI（受信文件夹静默执行 #5232）、Gemini CLI（路径遍历、破坏性命令防护 #22672）、Codex（URL userinfo 安全修复 #56263） | 从“能不能拦”转向“拦得对不对、可不可审计”——路径信任 ≠ 命令信任成共识 |
| **MCP 生态健壮性** | Codex（进程泄漏 9GB #30408、SDK 升级）、OpenCode（structuredContent 丢失、冷启动竞态）、Copilot CLI（OAuth 5 个新 issue）、Qwen Code（MCP 2026-07-28 规范诉求） | MCP“能发现但用不了”是普遍状态，进程生命周期与认证是两大短板 |
| **多会话/子代理可靠性** | Claude Code（Remote Control 掉线 #104410）、Gemini CLI（子代理假报 success #22323）、Qwen Code（auto-memory 干扰 #15225）、Copilot CLI（长会话卡死 #5219） | 子代理编排尚不成熟，“状态误报”是 p1 级信任问题 |
| **Windows 平台质量** | Codex（约 1/3 热点 issue 为 Windows 专属）、Claude Code（更新死锁 #96942）、Qwen Code（更新被锁 #15276）、OpenCode（Bun 段错误） | Windows 是所有工具共同的二等公民 |
| **稳定发布通道** | Copilot CLI（#5203 明确请求）、Codex（alpha 一日多版的隐忧） | 快节奏迭代引入回归，社区开始要求 Stable/Beta 分离 |

---

## 4. 差异化定位分析

| 工具 | 技术路线 | 目标用户 | 差异化重心 |
|---|---|---|---|
| **Claude Code** | 闭源 CLI + Desktop + Remote Control | 重度订阅用户、企业团队 | **企业安全管控**（组织策略 > 个人插件的权限层级）+ 多会话编排；额度档位是商业化短板 |
| **OpenAI Codex** | Rust 重写、高频 alpha、bot 自动化开发 | 早期尝鲜者、多云用户 | **多云 provider**（Vertex AI 内置）+ Computer Use；稳定性和 Windows 体验滞后 |
| **Gemini CLI** | 开源 TypeScript、模型原生能力优先 | 开源社区、token 效率敏感用户 | **AST 感知工具链 + 零依赖 OS 沙箱**的架构探索；模型演进快（gemini-4-argon） |
| **Copilot CLI** | GitHub 生态深度集成、闭源 | GitHub/企业存量用户 | **ACP 模式 + 沙箱/worktree 集成**；安全旁路问题和 OAuth 稳定性是软肋 |
| **Qwen Code** | 开源、服务化架构 | 自托管/企业多租户部署 | **K8s/企业部署最深**（Harness 池、Runtime Broker、外部 provisioner），明显瞄准私有化场景 |
| **OpenCode** | 开源、Bun 运行时、模型中立 | 本地/第三方模型用户、成本敏感者 | **模型中立 + 桌面体验打磨**；可观测性（TTFB、堆快照）投入突出 |

---

## 5. 社区热度与成熟度

**活跃度梯队**：
- **第一梯队（高热且深）**：Claude Code——单 issue 185👍/65💬 的互动深度无人能及，社区已成产品反馈主渠道
- **第一梯队（高产出）**：Codex、Gemini CLI——PR/Release 节奏最快，bot 自动化开发流水线成熟，属快速迭代期
- **第二梯队**：OpenCode、Qwen Code——工程投入聚焦但社区互动较浅；Qwen Code 的 CI 自动 issue（约 10 条）反映主分支稳定性负担重
- **第三梯队**：Copilot CLI——用户量大但社区以报 bug 为主，PR 闭环不公开，反馈回路单向；Kimi Code CLI 无活动，生态存在感最弱

**成熟度信号**：Claude Code 与 Copilot CLI 面对的多是边缘场景 bug 和商业化问题，说明核心功能已稳定；Codex/Gemini CLI 仍在修基础设施级问题（进程泄漏、状态误报）；Qwen Code 处于架构大建设期。

---

## 6. 值得关注的趋势信号

1. **“组织策略 > 个人配置”的权限层级正在成为标配**。Claude Code 的 mods 安全框架 PR 系列（个人插件只可收紧不可放宽）预示企业级插件治理即将成型——**开发团队应提前设计插件的安全声明与审计能力**。

2. **多云/模型中立是不可逆方向**。Codex 内置 Vertex AI、OpenCode 深度第三方模型支持、Gemini CLI 模型快速迭代，意味着 CLI 工具正在从“模型附属品”演变为“模型无关的编排层”。

3. **计费可见性将成为产品竞争力**。四家工具同时爆发计费/额度投诉（缓存 TTL 回归、银行化重置、无限思考烧钱），**缺乏成本护栏和透明度的工具将流失重度付费用户**；缓存命中计费的准确性尤其关键。

4. **“静默失败”是信任的最大杀手**。插件不加载、子代理假报 success、MCP 消息丢失、空响应记为成功——各社区共同的抱怨指向一点：**可观测性与失败告警比功能数量更重要**，做 agent 系统的开发者应优先建设终止原因判定和失败显性化。

5. **Windows 与长会话是生产化的最后两公里**。几乎所有工具的 Windows 体验系统性落后，且长会话/无人值守场景（auto-memory 干扰、autocompact 不触发、compaction 丢上下文）问题集中——**在 Windows 上跑生产级 agent 前需充分验证，无人值守任务需设置额度与行为护栏**。

6. **稳定通道诉求标志着用户结构转变**。从“每周新功能”到“每天可用”的诉求转移，说明 AI CLI 正从开发者玩具进入生产工具，**对工具选型应更多考察回归修复速度和发布纪律，而非功能列表长度**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-10-23）

> 说明：本期数据中 PR 评论数与点赞数均为空值，以下排序基于更新活跃度、关联 Issue 讨论热度及修复重要性综合评定。

---

## 一、热门 Skills / PR 排行

| # | PR / Skill | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | [#1245 notion-spec-to-implementation + quantitative-resume-auditor](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品/技术规格自动拆解为可实施任务（含验收标准与进度跟踪），叠加量化简历审计。持续更新至 10 月中，是存活最久的社区贡献 PR 之一 | OPEN |
| 2 | [#1742 fix(mcp-builder)](https://github.com/anthropics/skills/pull/1742) | 修复 MCP≥2.0 中 `streamablehttp_client` 更名与自定义 header 配置方式变更；与高热度 Issue [#1390](https://github.com/anthropics/skills/issues/1390)（评估器对真实 MCP server 全部 0 分）共同构成 mcp-builder 修复主线 | OPEN |
| 3 | [#1298 fix(skill-creator)](https://github.com/anthropics/skills/pull/1298) | 隔离 trigger 评估、修复 Windows `select()` 失败与运行时异常误判，直接回应 Issue [#1383](https://github.com/anthropics/skills/issues/1383)、[#556](https://github.com/anthropics/skills/issues/556) 的触发率评估失真问题 | OPEN |
| 4 | [#1997 fix(skill-creator): YAML frontmatter 解析](https://github.com/anthropics/skills/pull/1997) | 手写解析器丢失引号/续行，导致 description 优化与评估元数据与 SKill.md 不一致；10 月内高频更新 | OPEN |
| 5 | [#525 pyxel 复古游戏开发](https://github.com/anthropics/skills/pull/525) | 指导 Pyxel 复古游戏的实现、headless 输入驱动运行与帧级验证，创作类 Skill 代表，悬置 7 个月仍被持续 review | OPEN |
| 6 | [#486 ODT 文档 Skill](https://github.com/anthropics/skills/pull/486) | OpenDocument 创建、模板填充与 ODT→HTML 转换，补齐开源文档格式缺口 | OPEN |
| 7 | [#1703 md2video-audio](https://github.com/anthropics/skills/pull/1703) | 零成本将 Markdown 编译为带真人感配音的 MP4 视频（Marp + TTS），代表“内容再生产”方向 | OPEN |
| 8 | [#210 frontend-design 改进](https://github.com/anthropics/skills/pull/210) | 重写 frontend-design 使指令“单会话内可执行”，呼应社区对 Skill 指令可操作性而非说教文风的批评（见 [Issue #202](https://github.com/anthropics/skills/issues/202)） | OPEN |

---

## 二、社区需求趋势（来自 Issues）

1. **Skill 分发与信任机制**（最高热度，46 评论）：[#492](https://github.com/anthropics/skills/issues/492) 指出社区 Skill 冒用 `anthropic/` 命名空间构成信任边界漏洞；[#228](https://github.com/anthropics/skills/issues/228)（17 评论）要求组织内共享 Skill 库与直链分享。
2. **Agent 记忆与上下文压缩**：[#1329](https://github.com/anthropics/skills/issues/1329) 提议 compact-memory（符号化紧凑 agent 状态）；[#1487](https://github.com/anthropics/skills/issues/1487) 抱怨 claude-api skill 单次注入 156k tokens 耗尽上下文——token 效率是共识痛点。
3. **质量门禁与治理类元 Skill**：[#1385](https://github.com/anthropics/skills/issues/1385)（推理质量三道门禁管道）、[#412](https://github.com/anthropics/skills/issues/412)（agent-governance 安全模式）、[#83](https://github.com/anthropics/skills/pull/83)（skill 质量/安全分析器）——社区期望“用 Skill 管 Skill”。
4. **工程化基础设施修复**：skill-creator 的评估体系（触发率、基准测试、跨平台）集中爆发问题（[#556](https://github.com/anthropics/skills/issues/556)、[#1383](https://github.com/anthropics/skills/issues/1383)、[#1394](https://github.com/anthropics/skills/issues/1394) XSS），docx/pdf 等文档 Skill 的脚本正确性（[#2018](https://github.com/anthropics/skills/issues/2018)）也持续有反馈。

---

## 三、高潜力待合并 Skills

- **[#1742 mcp-builder 兼容性修复](https://github.com/anthropics/skills/pull/1742)** + **[#1298 skill-creator 触发评估修复](https://github.com/anthropics/skills/pull/1298)**：均对应多个高评论 Issue，合并优先级最高。
- **[#1997 YAML 解析修复](https://github.com/anthropics/skills/pull/1997)** 与 **[#1792 docx LibreOffice 超时正确报错](https://github.com/anthropics/skills/pull/1792)**：小而关键的 correctness 修复，落地阻力小。
- **[#1980 webapp-testing 移除 shell=True](https://github.com/anthropics/skills/pull/1980)**：修复命令注入风险（CWE-78），契合 #492 引发的安全关注，10 月仍在活跃更新。
- **[#1245 Notion 规格转化](https://github.com/anthropics/skills/pull/1245)**：存活 4 个月持续迭代，是最接近合入的新功能型 Skill。

---

## 四、生态洞察

**社区最集中的诉求不是“更多 Skill”，而是 Skill 的可信分发机制（命名空间/组织共享）与可度量的质量基础设施（可靠的触发评估与 token 高效的 Skill 设计）——即从“能写 Skill”走向“能信任、能验证 Skill”。**

---

# Claude Code 社区动态日报 — 2026-10-23

## 1. 今日速览

过去 24 小时 Claude Code 连发两个版本（v2.1.308 / v2.1.309），重点修复了 **macOS/Linux 沙箱中 shell 启动文件逃逸沙箱执行** 的安全问题。社区侧最热话题仍是 **Team 计划缺少 Max 20x 等价档位**（#47509，185 👍 / 65 评论），同时 v2.1.301 引入的 **prompt cache TTL 回归至 5 分钟** 被确认为回归 Bug，订阅用户成本感知明显。多会话/Remote Control 稳定性问题今日集中爆发，值得桌面端用户关注。

---

## 2. 版本发布

### [v2.1.309](https://github.com/anthropics/claude-code/releases)
- 修复 macOS/Linux 上沙箱化 Bash 命令在每次执行前**在沙箱外运行 shell 启动文件**的问题（安全相关）
- 修复 macOS 沙箱 `denyWrite` glob 模式在通过 symlink 访问路径时未在真实路径生效的问题

### [v2.1.308](https://github.com/anthropics/claude-code/releases)
- 常规 Bug 修复与可靠性提升

> 💡 建议：使用 sandbox/bash 沙箱特性的用户应尽快升级至 v2.1.309。

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 关注点 | 反应 |
|---|-------|--------|------|
| 1 | [#47509](https://github.com/anthropics/claude-code/issues/47509) Team 计划需要 Max 20x 等价档位 | Team Premium 仅 6.25x Pro 用量，重度 agentic coding 用户（CTO/tech lead）额度不足，长期高热度 | 👍185 / 💬65 |
| 2 | [#103673](https://github.com/anthropics/claude-code/issues/103673) **回归：v2.1.301 起 CLI 使用 5m 缓存 TTL** | 订阅用户交互式会话缓存从 1h 降为 5m，直接增加 token 消耗，已有 repro，疑似回归 | 👍2 / 💬2，新发现，值得关注 |
| 3 | [#102269](https://github.com/anthropics/claude-code/issues/102269) 隔夜休眠反复重写 agent 缓存，烧掉 25% 周额度 | 7 agent 工作流面板仅 2.5M tokens，但每周额度被大幅消耗；涉及 cost + agents + desktop | 💬7 |
| 4 | [#103465](https://github.com/anthropics/claude-code/issues/103465) 桌面端更新**删除** Code tab 会话并清空插件/GitHub 连接器 | 标记 data-loss，会话数据本身丢失而非隐藏，属最严重等级的用户数据问题 | 💬2 |
| 5 | [#84698](https://github.com/anthropics/claude-code/issues/84698) 桌面端在 diff/commit 刷新时执行未经请求的后台 `git fetch` | 不可追踪、无开关可禁用，涉及隐私与可审计性 | 👍8 / 💬7 |
| 6 | [#83422](https://github.com/anthropics/claude-code/issues/83422) 插件 enabled-in-settings 但静默不加载 | 团队协作场景痛点：提交 `.claude/settings.json` 后插件技能/hooks 静默缺失，marketplace autoUpdate 也不生效 | 💬7 |
| 7 | [#96942](https://github.com/anthropics/claude-code/issues/96942) Windows 更新死锁：主进程存活 + 单实例锁阻止重启 | 双版本可复现，导致桌面端更新后无法正常重启 | 💬8 |
| 8 | [#43326](https://github.com/anthropics/claude-code/issues/43326) 按任务复杂度自动选择模型与 effort | 长期热门 FR：免去手动 `/model`、`/effort` 切换，省 token 又省心 | 👍76 / 💬7 |
| 9 | [#104410](https://github.com/anthropics/claude-code/issues/104410) Remote Control 会话掉线不自愈、跨会话消息静默丢失 | 每周多次掉线且重连后身份变化，使其难以作为多会话架构骨干 | 今日新报 |
| 10 | [#102610](https://github.com/anthropics/claude-code/issues/102610) Safeguards 误报拦截正常请求 | reasoning_extraction 触发条件过于宽泛，用户对自己文档的常规分析被拦截 | 💬4 |

其他值得留意：[#104412](https://github.com/anthropics/claude-code/issues/104412) 云会话因本地未推送分支启动即死、[#87027](https://github.com/anthropics/claude-code/issues/87027) 账户级配置/auto memory 同步、[#100743](https://github.com/anthropics/claude-code/issues/100743) Remote Control 闲置 30 分钟被归档。

---

## 4. 重要 PR 进展

> 注：今日更新的 7 个 PR 均已关闭，主要来自 @poteat 的 mods 体系（插件安全策略框架），反映 **组织级安全策略对个人插件的约束** 是当前工程重点。

1. [#99137](https://github.com/anthropics/claude-code/pull/99137) — sec-default：个人插件只可收紧、不可放宽安全规则（不能移除 deny/ask 规则或修改 pinned 变量）
2. [#99540](https://github.com/anthropics/claude-code/pull/99540) — sec-default：组织对工具的审批上限约束个人安装的所有插件
3. [#97688](https://github.com/anthropics/claude-code/pull/97688) — sec-default：遥测记录持续到用户层之上，个人插件无法丢弃/改写发送到 collector 的记录
4. [#97334](https://github.com/anthropics/claude-code/pull/97334) — sec-default：会话保留的记录行超越用户层，组织审计能力增强
5. [#99118](https://github.com/anthropics/claude-code/pull/99118) — /diff 面板/对话框打开时不再挂起其他插件的 toast 通知
6. [#99141](https://github.com/anthropics/claude-code/pull/99141) — /diff 在无可绘制内容时保留 pane，待内容就绪即显示（改善首次打开体验）
7. [#97293](https://github.com/anthropics/claude-code/pull/97293) — 声明 `$.process.run` 的截断标志（isStdoutTruncated）与 `$.fs.list` 的 mtimeMs 字段，等 npm CLI 发布后生效

**趋势判断**：PR 活动高度集中在“组织安全策略 > 个人插件”的权限层级架构上，预示企业级插件生态管控即将成型。

---

## 5. 功能需求趋势

1. **成本与用量管理**（最热）：更高额度档位（#47509）、按复杂度自动选模型（#43326）、缓存 TTL 回归（#103673）——token 经济性是订阅用户第一关切
2. **多会话 / Remote Control 可靠性**：掉线不自愈（#104410）、闲置归档（#100743）、云会话无回传通道（#104160）、AskUserQuestion 移动端丢失（#102055）——多 agent 编排基础设施尚不成熟
3. **配置与状态同步**：账户级配置/auto memory 跨设备同步（#87027）、CLI 与 Desktop 统一会话存储
4. **插件生态可观测性**：插件静默不加载（#83422）、skillOverrides 无操作、marketplace 自动更新失效
5. **企业安全与合规**：后台 git fetch 不可审计（#84698）、safeguards 误报（#102610）、组织级策略管控（PR 系列）
6. **可访问性与 TUI 体验**：reduced motion 计时器冻结、输入框文本选择缺失

---

## 6. 开发者关注点（痛点总结）

- **额度焦虑普遍存在**：从档位定价到缓存 TTL 到休眠时的隐性消耗，成本透明度是最大不满来源
- **静默失败是信任杀手**：插件不加载、MCP 多文本块丢弃、跨会话消息丢失——缺少告警机制的失败最招致抱怨
- **Desktop 更新风险**：更新死锁（#96942）与会话数据丢失（#103465）并存，Windows 用户受影响最集中
- **Headless/自动化场景边缘情况**：Autocompact 不主动触发导致自主会话停摆（#77509）、Agent .md 解析对 CRLF 敏感（#80890）
- **安全策略双刃剑**：v2.1.309 修复沙箱逃逸值得肯定，但 safeguards 误报率过高影响正常工作流

---
*数据来源：github.com/anthropics/claude-code（过去 24 小时）*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-10-23** | 数据来源：github.com/openai/codex

---

## 1. 今日速览

Codex 迎来高频发版日，24 小时内连发 4 个 Rust alpha 版本（含 0.164.0-alpha.12），并合入了**内置 Google Cloud Vertex AI provider** 这一重要新能力。社区方面，MCP server 进程泄漏（9+ GB RSS）的严重性能 bug 讨论热度持续领先（63 条评论），rate-limit 银行化重置机制相关投诉集中爆发（3 个新 issue）。

---

## 2. 版本发布（过去 24 小时）

| 版本 | 说明 |
|---|---|
| [rust-v0.164.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.164.0-alpha.12) | 最新 alpha |
| [rust-v0.164.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.164.0-alpha.11) | 另有 [.11.1 backport PR](https://github.com/openai/codex/pull/56276) 验证 Vertex AI 回移 |
| [rust-v0.163.0-alpha.11.2](https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.11.2) | 补丁版本 |
| [rust-v0.164.0-alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.164.0-alpha.10) | — |

发版节奏极快，alpha 通道一天内 4 次迭代，建议生产环境用户留在稳定通道。

---

## 3. 社区热点 Issues（Top 10）

1. **[#30408](https://github.com/openai/codex/issues/30408) MCP 进程泄漏致 9+ GB RSS**（63 评论 / 20 👍）
   最严重的性能问题：每个新线程/会话都生成全套全局 MCP server 进程，线程关闭/归档后**从不清理**，孤儿进程无限累积。长期运行的桌面端用户强烈共鸣，是最需要官方响应的 issue。

2. **[#56262](https://github.com/openai/codex/issues/56262) 银行化重置被误判“不需要”（今日新增）**
   全局重置数小时后，周用量显示 83–87%，但资格检查却按 100% 处理，导致用户损失 2 次重置。复现两次，直接影响付费用户额度。

3. **[#56259](https://github.com/openai/codex/issues/56259) 自动重置与 80% 规则冲突（今日新增）**
   官方政策要求剩余额度 <80% 才能手动兑换，自动重置反而阻塞了即将过期的银行化重置——机制设计层面的政策矛盾。

4. **[#56264](https://github.com/openai/codex/issues/56264) Windows 更新后线程无法恢复（今日新增）**
   沙箱 helper 调用 MXC launcher 时 `process.env` 缺失 `SYSTEMROOT`，导致已有本地会话无法加载，属升级引入的回归。

5. **[#53154](https://github.com/openai/codex/issues/53154) Chrome Computer Use 无故触发 URL 安全拦截**（14 评论）
   页面读取成功后突然被安全停止，且无可操作的拒绝理由。Computer Use 安全策略的透明度问题是社区反复出现的痛点（另见 #24847、#47579、#49601）。

6. **[#55783](https://github.com/openai/codex/issues/55783) macOS 桌面端 Dot 从侧边栏消失**（12 评论 / 6 👍）
   同账号 Web 端正常，26.1016.51333 版本桌面端异常，影响 Dot 功能用户。

7. **[#37472](https://github.com/openai/codex/issues/37472) 请求 `request_user_input` 默认模式下不超时**（24 👍）
   👍 数最高的功能请求：Default 模式下用户输入询问自动超时打断长任务工作流，社区强烈希望可配置为无限等待。

8. **[#24847](https://github.com/openai/codex/issues/24847) Windows Browser Use 拦截 `file://` 本地预览**（9 👍）
   与文档承诺矛盾，本地 HTML 原型审查工作流被阻断。

9. **[#56223](https://github.com/openai/codex/issues/56223) Agent 擅自扩大清理范围并消耗额度（今日新增）**
   模型行为问题：窄范围清理任务被扩展为无关重写，再靠反复返工“自我修正”，烧掉大量 usage——直击 coding agent 可控性核心痛点。

10. **[#52996](https://github.com/openai/codex/issues/52996) Windows 端持续 HTTP 432 工作区路由失败**
    账号/工作区初始化反复失败，账户查找返回 `authenticatedAccountPresent=false`，Windows 桌面端连接性问题代表。

---

## 4. 重要 PR 进展（Top 10）

1. **[#56265](https://github.com/openai/codex/pull/56265) 内置 Google Cloud Vertex AI provider**（已合并）
   今日最大功能：支持 `model_provider = "gcp"`，基于 `GOOGLE_CLOUD_PROJECT`/`GOOGLE_CLOUD_LOCATION` 构建端点，通过 `gcloud auth application-default` 获取凭证。已有 [backport PR #56276](https://github.com/openai/codex/pull/56276) 准备发布 0.164.0-alpha.11.1。

2. **[#56278](https://github.com/openai/codex/pull/56278) MCP 调用支持协商式网络策略元数据**
   仅对可信 ChatGPT 来源广播 `codex/network-policy-meta`，为 MCP 网络治理打基础。

3. **[#56263](https://github.com/openai/codex/pull/56263) 拒绝 marketplace URL userinfo 中的反斜杠**
   安全修复：URL 解析器与 Git/libcurl 对反斜杠的处理差异可能造成主机名绕过匹配。

4. **[#56284](https://github.com/openai/codex/pull/56284) 模型目录与缓存按 thread originator 隔离**
   不同 originator 使用独立的内存目录和磁盘缓存，确保线程拿到正确的模型元数据。

5. **[#56266](https://github.com/openai/codex/pull/56266) 跨 runtime overlay 保留 MCP 禁用原因**
   修复自定义 `codex_apps` 注册的需求拒绝会阻塞托管 Apps 替换的问题。

6. **[#56250](https://github.com/openai/codex/pull/56250) 恢复线程时避免冗余设置检查点**
   设置未变化时不再重复写入 `ThreadSettingsApplied` 事件，减少 rollout 膨胀。

7. **[#56277](https://github.com/openai/codex/pull/56277) AWS SigV4 签名支持有界请求体**
   网络代理此前仅支持空 body 或 `UNSIGNED-PAYLOAD`，现在可缓冲并哈希非空负载后签名。

8. **[#56261](https://github.com/openai/codex/pull/56261) 隔离 V8 源依赖的 C++ runtime 设置**
   通过独立 inline namespace 解决 V8 与 protobuf 的 Abseil 冲突链接问题，工程稳定性改进。

9. **[#56286](https://github.com/openai/codex/pull/56286) 升级 MCP SDK 至 1.32.0**
   与 #30408 的 MCP 泄漏问题相关，值得观察该升级是否包含修复。

10. **[#56290](https://github.com/openai/codex/pull/56290) + [#56288](https://github.com/openai/codex/pull/56288) 发布链路加固**
    uv 锁定 Python 构建工具、Cosign v3.1.4 签名固定（保留 v2 签名 bundle 兼容），供应链安全投入持续。

> 注：今日大部分 PR 由 `copyberry[bot]` 提交且快速关闭合并，自动化开发流程运转高效。

---

## 5. 功能需求趋势

- **多云/多 provider 支持** 🔥：Vertex AI provider 落地，社区对非 OpenAI 后端接入需求明显
- **Computer Use / Browser Use 安全策略透明化**：#53154、#24847、#47579、#49601 集中反馈“被拦截但无理由、无恢复路径”
- **Rate-limit 重置机制优化**：银行化重置的过期、兑换资格（80% 规则）与自动重置的交互，今日 3 个新 issue
- **移动/可穿戴监控**：#33528 Apple Watch 应用（语音提示 + agent 监控 + 工具审批）
- **交互控制**：`request_user_input` 可选无限等待（#37472，24 👍）

---

## 6. 开发者关注点

1. **资源泄漏与长时间运行稳定性**：MCP 进程泄漏（#30408）是桌面端最持久的痛点，建议受影响用户定期重启 app-server。
2. **Windows 端体验落后**：今日 30 条热门 issue 中约 1/3 为 Windows 专属问题（升级回归 #56264、432 路由失败、Doctor 误报 #55536、存档会话缺失 #30363），Windows 质量差距明显。
3. **额度管理焦虑**：重置机制多处不自洽，加上 agent 擅自扩大任务范围消耗 usage（#56223），付费用户对“额度被浪费”高度敏感。
4. **安全拦截缺乏可解释性**：被拦截时没有 actionable reason，用户无法区分误报与真实风险。
5. **发版节奏 vs 稳定性**：alpha 通道一日多版，早期尝鲜与稳定性之间的取舍需要谨慎评估。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-23）

## 📌 今日速览

今日发布 nightly 版本 **v0.67.0-nightly.20261022**，最大亮点是将 IDE companion 通过 exec stdio 桥接到容器沙箱中。PR 活跃度极高，出现 `gemini-4-argon` 新模型支持的提交，并修复了一个 legacy checkpoint 回退中的路径遍历安全漏洞。Agent 子系统（子代理恢复、浏览器代理）仍是 Issue 讨论焦点。

---

## 🚀 版本发布

**[v0.67.0-nightly.20261022.g09d81bf11](https://github.com/google-gemini/gemini-cli/releases)**
- feat(cli): 将 IDE companion 桥接到容器沙箱（基于 exec stdio）— [#29858](https://github.com/google-gemini/gemini-cli/pull/29858)
- 附带 v0.66.0-preview.0 的 changelog

---

## 🔥 社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** Subagent 达到 MAX_TURNS 后仍报告 `GOAL success`，掩盖了实际中断（13 评论，p1）。状态误报会误导上层 agent 决策，是最受关注的 bug。

2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** 利用模型的 bash 原生能力：零依赖 OS 沙箱 + 执行后意图路由（9 评论，大工程量 enhancement）。Gemini 3 天生偏好 POSIX 工具链，方向性架构讨论。

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** Generalist agent 无限挂起（8 评论，👍8）。简单如建文件夹的操作也会挂起，用户只能靠提示词禁用子代理绕过，属高频用户痛点。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** 评估 AST 感知的文件读取/搜索/代码库映射（7 评论，EPIC）。配合 ast-grep 等工具减少 token 浪费，是提升 agent 质量的核心探索。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** Gemini 不会主动使用 skills 和 sub-agents（7 评论）。用户配好的 gradle/git skills 几乎从不被自动触发，反映子代理调度策略问题。

6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** Browser Agent 完全忽略 settings.json 配置覆盖（如 maxTurns），AgentRegistry 读取合并但未生效。

7. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** Browser subagent 在 Wayland 下失败并误报 GOAL 完成（p1），Linux 桌面用户受阻。

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** 超过 128 个工具时遭遇 API 400 错误，期望 agent 更智能地裁剪工具作用域。

9. **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)** 模型频繁在随机位置创建临时脚本，污染工作区，增加清理成本。

10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)** Agent 应阻止/劝阻破坏性行为（`git reset --force`、数据库操作等），安全策略需求。

---

## 🔧 重要 PR 进展

1. **[#29875](https://github.com/google-gemini/gemini-cli/pull/29875)** 🆕 新增 `gemini-4-argon` 模型支持，注册模型别名与能力检测。
2. **[#29876](https://github.com/google-gemini/gemini-cli/pull/29876)** 🛡️ 修复 legacy checkpoint 回退中的路径遍历漏洞（p1 安全）。
3. **[#29858](https://github.com/google-gemini/gemini-cli/pull/29858)**（已发布）IDE companion 桥接到容器沙箱，强化容器化工作流。
4. **[#29880](https://github.com/google-gemini/gemini-cli/pull/29880)** 新增 `gemini models` 子命令与 `--list-models` 标志，支持 JSON 输出的模型发现。
5. **[#29838](https://github.com/google-gemini/gemini-cli/pull/29838)**（p1）相对路径改为基于活动 IDE workspace root 解析，修复文件工具写错位置问题。
6. **[#29879](https://github.com/google-gemini/gemini-cli/pull/29879)** 流式中途出错/重试时丢弃已缓冲的 tool calls，防止幽灵执行。
7. **[#29881](https://github.com/google-gemini/gemini-cli/pull/29881)** ACP 模式：429 重试进度上报、重试延迟上限与模型回退。
8. **[#29849](https://github.com/google-gemini/gemini-cli/pull/29849)**（已合）非交互模式收到 SIGINT/SIGTERM 后立即停止工具执行，避免副作用。
9. **[#29828](https://github.com/google-gemini/gemini-cli/pull/29828)**（已合）修复多轮对话因缺失 `thought_signature` 导致的 HTTP 400。
10. **[#28642](https://github.com/google-gemini/gemini-cli/pull/28642)**（已合）用同步 `unbash` 解析器替换 tree-sitter Bash 解析器，移除 WASM 运行时，减小体积并简化初始化。

其他值得注意：[#29884](https://github.com/google-gemini/gemini-cli/pull/29884) 支持 Termux 上 ripgrep 解析（Android 支持）、[#29883](https://github.com/google-gemini/gemini-cli/pull/29883) 修复泰语/老挝语字符显示宽度。

---

## 📈 功能需求趋势

- **子代理（Subagent）体系**：本地子代理 Sprint、并行协作与共享内存、轨迹可视化共享（/chat share）、symlink 识别等，是最密集的工作流方向。
- **AST 感知工具链**：代码库映射与精准读取（ast-grep、tilth、glyph），目标是降低 token 消耗、减少误对齐读取。
- **沙箱与安全**：OS 级零依赖沙箱、破坏性命令防护、路径安全（PR #29876）。
- **IDE 集成深化**：IDE workspace 路径解析、companion 沙箱桥接。
- **模型演进支持**：gemini-4-argon 注册、模型发现命令。
- **浏览器代理健壮性**：配置覆盖生效、会话接管与锁恢复、Wayland 支持。

## 🧑‍💻 开发者关注点

1. **状态误报**：子代理挂起/超限却报 success 是 p1 级信任问题（#22323、#21409、#21983 共同指向终止原因判定逻辑）。
2. **取消与清理**：SIGINT 后仍在执行工具、临时脚本乱放，开发者希望"取消即停止、工作区干净"。
3. **Token 效率**：36.6k/turn 的上下文基线被视为过高，社区强烈期待精准读取与文件式任务跟踪（替代 in-context WriteToDo）。
4. **配置可靠性**：settings.json 覆盖不生效（browser agent）、`${VAR}` 占位符被迁移覆盖，配置系统稳定性需提升。
5. **能力调度**：模型不主动使用 skills/sub-agents，工具数量超限即报错，智能调度需求迫切。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期：2026-10-23** | 数据来源：[github.com/github/copilot-cli](https://github.com/github/copilot-cli)

---

## 1. 今日速览

Copilot CLI 于昨日发布 **v1.0.103**，重点改进 ACP 会话沙箱设置、断线重连后保留云端回复全文、以及 MCP 工具快照缓存复用。社区方面，**MCP/OAuth 认证问题集中爆发**（一天内至少 5 个相关新 Issue），此外安全类问题持续受关注——后台 agent 绕过 hooks 执行危险命令、受信文件夹静默自动批准命令等。用户对快速迭代引入回归的不满催生了“稳定发布通道”的功能请求。

---

## 2. 版本发布

### v1.0.103（2026-10-22）

**Added**
- 点击已完成的响应代码块可复制其原始代码（可配置启用）。

**Improved**
- ACP 会话现在遵循已保存的沙箱设置及 `--sandbox`/`--no-sandbox` 标志，包括 resume 场景。
- 云端回复在 CLI 断线重连后保留全文。
- 在同一仓库的多个已注册 Git worktree 间复用本地 MCP 工具快照缓存。
- 改进远程启动选项，提供更清晰的 hosting/连接标志，弃用旧版 `--remote`/`--no-remote`。
- Sessions 浏览器改进。

> 点评：ACP 沙箱遵循设置的修复直接回应了 Issue #5089 报告的问题，是本次发布中安全相关性最高的变更。

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#5197](https://github.com/github/copilot-cli/issues/5197) **WSL2 语音服务器段错误（signal 11）** | 1.0.100 更新语音运行时后，WSL2 上 `/voice` 卡在"Fetching voice models"，语音服务进程启动数秒后崩溃。4 条评论、影响面明确，是当前最高互动的 bug。 |
| 2 | [#3013](https://github.com/github/copilot-cli/issues/3013) **Hooks 对后台 task agent 不生效（已关闭）** | 报告者认为这是安全漏洞——后台/通用 agent 可以绕过阻止危险命令的 hook。作为 4 月份的老问题于昨日关闭，值得了解官方最终立场。 |
| 3 | [#5232](https://github.com/github/copilot-cli/issues/5232) **受信文件夹在 manual 模式下静默自动批准命令** | 昨日新报的安全问题：只要命令引用的文件路径在受信文件夹内，`powershell.exe`、`sqlcmd`、`curl` 等副作用不可预测的命令均免确认执行。路径门控无法判断命令实际行为。 |
| 4 | [#4802](https://github.com/github/copilot-cli/issues/4802) **启用 Assisted Permissions 后 PRU 配额被清空** | Copilot Pro 年付用户报告剩余 234 PRU 被异常耗尽，疑似与 Assisted Permissions 有关，涉及付费用户直接利益。 |
| 5 | [#4065](https://github.com/github/copilot-cli/issues/4065) **密钥脱敏过于激进** | 误将 spec 文件中 `${env.AUTH_TOKEN}` 这类合法的变量插值示例文本脱敏，3 👍，影响文档/配置类日常使用。 |
| 6 | [#5203](https://github.com/github/copilot-cli/issues/5203) **请求稳定发布通道** | 快速迭代频繁引入回归影响日常使用，用户请求 Stable / Beta 分离的发布渠道。反映了社区对质量稳定性的普遍诉求。 |
| 7 | [#5219](https://github.com/github/copilot-cli/issues/5219) **未知 model id 导致 task subagent 回退 128k 上限并使整轮失败** | 长会话中主 agent 委托 task subagent 时整轮报 "prompt budget" 错误，主上下文远未达限，会话被卡死。 |
| 8 | [#5228](https://github.com/github/copilot-cli/issues/5228) **`copilot --resume` 无 ID 时落入新空会话** | 统一 Sessions 浏览器成为默认后回归：会话列表约 2 秒后被自动替换，且信任提示抢占首个 Enter 键。新版特性引入的典型回归案例。 |
| 9 | [#5027](https://github.com/github/copilot-cli/issues/5027) **Linux Sandbox 在 systemd-resolved stub resolver 下 DNS 损坏（已关闭）** | 沙箱共享宿主机 `/etc/resolv.conf` 指向 `127.0.0.53` 导致沙箱内 DNS 不可用，昨日关闭，应已修复。 |
| 10 | [#5133](https://github.com/github/copilot-cli/issues/5133) **ACP 模式忽略 `includeCoAuthoredBy: false`** | `copilot --acp` 不遵守配置，commit 仍带 `Co-authored-by: Copilot`，而 `copilot -p` 正常——ACP 与交互模式行为不一致的代表案例。 |

---

## 4. 重要 PR 进展

过去 24 小时内无更新的 Pull Requests（0 条），本节省略。

> 注：本项目主要更新通过 Releases 交付，PR 活动可能不公开或未同步。

---

## 5. 功能需求趋势

从近期 Issues 提炼出的社区需求方向：

1. **M / OAuth 认证健壮性（最热）**：refresh token 未被使用（[#5229](https://github.com/github/copilot-cli/issues/5229)、[#5233](https://github.com/github/copilot-cli/issues/5233)）、Windows token 缓存为空（[#5236](https://github.com/github/copilot-cli/issues/5236)）、MCP 认证阻塞 CLI 启动（[#5234](https://github.com/github/copilot-cli/issues/5234)）——OAuth 令牌生命周期管理是当前最集中的痛点。
2. **权限与沙箱安全**：后台 agent 绕过 hooks（#3013）、受信文件夹静默执行（#5232）、ACP 沙箱失效（#5089，v1.0.103 已修复）。
3. **发布节奏与稳定性**：稳定通道请求（#5203）+ 多个新版本回归（#5228、#5197）。
4. **ACP 模式功能对齐**：ACP 与交互模式行为差异持续被报告（#5133、#5229）。
5. **会话/上下文管理**：compaction 后丢失 hook 上下文（[#5225](https://github.com/github/copilot-cli/issues/5225)）、会话恢复体验（#5228）。
6. **输入/交互体验**：语音语言可配置（[#5226](https://github.com/github/copilot-cli/issues/5226)）、输入框置顶选项（[#5227](https://github.com/github/copilot-cli/issues/5227)）、纯键盘滚动（#2750）。
7. **企业/代理环境支持**：web_fetch 代理环境 DNS 校验失败（[#5230](https://github.com/github/copilot-cli/issues/5230)）。
8. **模型管理精细化**：Auto 模式排除特定模型（[#5231](https://github.com/github/copilot-cli/issues/5231)）。

---

## 6. 开发者关注点

- **安全边界是最大焦虑**：三个独立 Issue（#3013、#5232、#5089）都指向同一核心问题——权限控制体系存在旁路（后台 agent、路径门控、ACP 模式），路径信任无法等价于命令信任。v1.0.103 修复了 ACP 沙箱部分，但机制性问题仍在讨论中。
- **付费配额可信度**：PRU 配额异常消耗（#4802）对年付用户是硬伤，需官方明确 Assisted Permissions 与计费的关系。
- **快速迭代的代价**：1.0.100 引入语音崩溃、Sessions 浏览器引入 resume 回归，用户明确要求 Stable 通道，“每天可用”比“每周新功能”更重要。
- **MCP 生态的成熟度短板**：插件 agent 取消自己的 MCP 调用（[#5237](https://github.com/github/copilot-cli/issues/5237)）、issue agent 无法访问已发现的 MCP 服务器（[#5208](https://github.com/github/copilot-cli/issues/5208)）——MCP 集成“能发现但用不了”的状态普遍存在。
- **长会话可靠性**：会话卡死（#5219）、compaction 丢上下文（#5225）、混合模型历史续传失败（#4914，已关闭）表明长时任务仍是薄弱环节。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-10-23

## 1. 今日速览

OpenCode 发布 **v1.19.4**，将内置 Bun 运行时升级至 1.4.4，修复了包括 TLS、HTTP/2/3、WebSocket 等在内的多个安全问题——这也可能顺带缓解近期 Windows 上 Bun 段错误导致的 serve 崩溃问题。桌面端迎来一批体验打磨 PR（统一搜索列表、iOS 风格时间线动画、堆快照调试），同时 MCP 生态相关的 bug（structuredContent 丢失、冷启动注册表竞态）和 Zen 模型缓存计费异常成为社区讨论焦点。

---

## 2. 版本发布

### v1.19.4
- **Bun 运行时升级至 1.4.4**：包含 Brotli、TLS、HTTP/1.1、HTTP/2、HTTP/3、WebSocket 及 `fetch` 的安全修复，并将根证书更新至 NSS 3.131.1。
- 🔗 https://github.com/anomalyco/opencode/releases/tag/v1.19.4

---

## 3. 社区热点 Issues

| # | Issue | 亮点 |
|---|-------|------|
| 1 | [#53688](https://github.com/anomalyco/opencode/issues/53688) Bun 1.4.2 长时间运行后段错误 | Windows 上 `opencode serve` 几分钟到几小时内崩溃，crash 指向捆绑的 Bun 1.4.2。今日发布的 v1.19.4（Bun 1.4.4）可能直接相关，issue 已关闭 |
| 2 | [#45087](https://github.com/anomalyco/opencode/issues/45087) 自动更新器吃掉 266 GB 磁盘 | 长驻服务每 10 分钟重装一次，npm 缓存膨胀至 266 GB。自动更新机制可靠性问题的典型代表，已修复关闭 |
| 3 | [#38923](https://github.com/anomalyco/opencode/issues/38923) MCP structuredContent 被丢弃 | 仅转发 `content[].text` 给模型，结构化 JSON 负载全丢。对重度 MCP 用户影响大，👍 4 |
| 4 | [#58175](https://github.com/anomalyco/opencode/issues/58175) deepseek-v4.1-flash 缓存 256k 以上失效 | 10-17 起 prompt 超过 ~256k 后缓存前缀跌至固定 ~16k，每轮按未缓存费率重新计费。**仍开放**，直接影响成本 |
| 5 | [#54192](https://github.com/anomalyco/opencode/issues/54192) MCP 冷启动读空注册表 | 首次 `opencode mcp list` 显示无配置，第二次才正常——冷目录竞态，**已复现、开放中** |
| 6 | [#57178](https://github.com/anomalyco/opencode/issues/57178) `time.streamed` 从未持久化且测的是全流时长而非 TTFB | 对遥测/成本分析用户是硬伤。对应修复 PR #57179 已合并关闭 |
| 7 | [#37735](https://github.com/anomalyco/opencode/issues/37735) 空 stop 完成被记为成功响应 | 模型无文本无工具调用返回 `finish: "stop"`，UI 静默停止、无报错。静默失败类问题中最危险的一种 |
| 8 | [#58128](https://github.com/anomalyco/opencode/issues/58128) LLM API 失败重试策略硬编码 | 指数退避最长 10s、最多 10 次，网络抖动即可中断长任务。**开放中**，作者建议移除硬编码 |
| 9 | [#58205](https://github.com/anomalyco/opencode/issues/58205) 免费层 $0 余额仍报 FreeUsageLimitError | 24h 窗口内无任何使用却触发限额，且重置窗口未暴露给 CLI/API。**开放中** |
| 10 | [#42923](https://github.com/anomalyco/opencode/issues/42923) mimo-v2.5 子代理无限思考循环耗尽额度 | 子代理陷入思考死循环，永不超时，直接烧钱。已关闭 |

其他值得一看：[#58241 Workspace Lock 功能提案](https://github.com/anomalyco/opencode/issues/58241)（阻止 OpenCode 修改文件）、[#58243 MCP 管理器 UX 增强](https://github.com/anomalyco/opencode/issues/58243)。

---

## 4. 重要 PR 进展

| # | PR | 内容 |
|---|-----|------|
| 1 | [#58252](https://github.com/anomalyco/opencode/pull/58252) `feat(cli): debug heap-dump` | 新增 CLI 命令通过认证 API 请求服务器堆快照，解决 Windows 无 `SIGUSR1` 无法抓堆的痛点。已合并 |
| 2 | [#58259](https://github.com/anomalyco/opencode/pull/58259) 桌面端命令面板抓堆快照 | 一条命令同时抓取桌面应用 + 服务器的堆快照到同一目录，打包版也能用 |
| 3 | [#57179](https://github.com/anomalyco/opencode/pull/57179) `step.streamed` 改为首个事件时发布 | 修复 TTFB 遥测失真问题（配合 issue #57178），已合并 |
| 4 | [#58232](https://github.com/anomalyco/opencode/pull/58232) MCP SDK 升级 2.0.0 → 2.3.1 | 两个本地补丁已进上游，保留三个仍需的补丁 |
| 5 | [#58222](https://github.com/anomalyco/opencode/pull/58222) 桌面端统一搜索列表 | ⌘K 面板与各搜索列表共享一套组件，新增粘性分组头与分组跳转 |
| 6 | [#57224](https://github.com/anomalyco/opencode/pull/57224) iOS 风格时间线动画 | 会话运行时流式文本逐行平滑落地而非整帧跳动，+1156 行 |
| 7 | [#56322](https://github.com/anomalyco/opencode/pull/56322) V1 全局会话导入归属修复 | 修复 V1→V2 导入后会话归属错误，关联 20+ 个历史 issue，是长尾数据迁移问题 |
| 8 | [#57222](https://github.com/anomalyco/opencode/pull/57222) 防止 stale read 恢复已删除会话 | 删除中的会话不再被并发读取“复活” |
| 9 | [#53233](https://github.com/anomalyco/opencode/pull/53233) 压缩保留文本预算强制执行 | 落实 #43250 的 retained-text 预算不变量 |
| 10 | [#58253](https://github.com/anomalyco/opencode/pull/58253) TypeScript 7.1 + `bun check` | 本地类型检查切换到 `bun check`，CI 升级 TS 7.1 |

另有 bot 驱动的小修持续合入：[#58258 connect 路由统一](https://github.com/anomalyco/opencode/pull/58258)、[#58251 标题栏按钮间距](https://github.com/anomalyco/opencode/pull/58251)、[#58255/58257 移除 V1 文档残留](https://github.com/anomalyco/opencode/pull/58255)。

---

## 5. 功能需求趋势

1. **可观测性与遥测准确性**：TTFB 度量（#57178）、token 缓存命中计费（#58175）、空响应静默成功（#37735）——社区对“数据要准”的需求明显上升。
2. **MCP 生态成熟度**：structuredContent 透传（#38923）、冷启动竞态（#54192）、MCP 管理器 UX（#58243）、SDK 升级（PR #58232），MCP 是当前最活跃的议题簇。
3. **TUI/Desktop 体验打磨**：文件路径可点击（#19005）、侧边栏宽度配置（#35513）、消息时间戳（#57929）、收藏模型快速切换（#46284）、Timeline detail 生效范围（#58150）。
4. **本地模型集成**：Ollama 模型在 TUI 选择器中缺失（#57210）、GitHub Copilot 零模型（#57955）——本地/第三方 provider 的模型发现与展示一致性。
5. **安全与防护**：Workspace Lock（#58241）、发布产物 attestation 验证文档（#45757）。

---

## 6. 开发者关注点

- **稳定性与崩溃**：Bun 运行时段错误（#53688）是近期最大痛点，v1.19.4 的 Bun 1.4.4 升级值得 Windows 长驻服务用户立即跟进。
- **自动更新可靠性**：266 GB 缓存膨胀（#45087）、ENOEXEC 竞态（#41495）——更新器是历史 bug 重灾区，长驻服务用户建议手动控制更新。
- **成本失控风险**：无限思考循环烧额度（#42923）、缓存失效重新计费（#58175）、免费层误报限额（#58205），计费类问题缺乏用户侧可见性与保护。
- **错误处理策略僵化**：重试参数硬编码（#58128）、curl 报错未翻译为根因（#58226），社区期望更可配置、更友好的失败路径。

---
*数据截至 2026-10-23，来源：github.com/anomalyco/opencode*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-23）

## 📰 今日速览

Qwen Code v0.26.0 正式版及配套 Desktop、TypeScript SDK 同日发布，带来 daemon token 持久化、会话级 Skill/Extension 刷新等重要特性。社区讨论聚焦于 Managed Agent 体系的稳定性（CI 大面积 flake）、Windows 桌面端更新被 node.exe 锁定的 P1 故障，以及 auto-memory 机制对长上下文 agent 行为的干扰。架构层面，Kubernetes 共享 Harness 池与外部 Runtime provisioner 等大规模部署方向的 PR 持续推进。

---

## 🚀 版本发布

- **v0.26.0-nightly.20261022.bf66a26c97**：包含 daemon token 持久化（PR #15023）及发布流程中对所有 vendored 二进制的覆盖修复。
- **desktop-v0.26.0**：支持会话级 Skill 与 Extension 刷新（PR #14050），修复 managed-agent 边界问题。注意：Windows 端自动更新仍有文件锁定问题（见 Issue #15276）。
- **sdk-typescript-v0.1.22**：捆绑 CLI v0.26.0。

---

## 🔥 社区热点 Issues（Top 10）

1. **[#15138](https://github.com/QwenLM/qwen-code/issues/15138)** — CI 的 Java failure reporter 可能静默丢弃 PR 报告或接受不完整的分页任务结果，直接影响 CI 可观测性的可信度，合并后复查发现新缺口，6 条评论持续讨论。
2. **[#15276](https://github.com/QwenLM/qwen-code/issues/15276)** ⚠️ P1 — Windows 桌面端应用内更新失败："Error opening file for writing"，原因是捆绑的 node.exe 运行时锁定自身目录，升级即失败，直接影响 Windows 用户。
3. **[#15235](https://github.com/QwenLM/qwen-code/issues/15235)** — `reasoning.effort: "max"` 在非 Z.ai 域名（本地反向代理）下被静默降级为 "xhigh"，反映对自定义网关/代理场景的兼容性不足。
4. **[#15225](https://github.com/QwenLM/qwen-code/issues/15225)** — auto-memory 的尾部 user 消息注入会让正在使用工具的 agent 提前停止并输出空承诺，是长程 coding agent 的正确性 bug。
5. **[#15267](https://github.com/QwenLM/qwen-code/issues/15267)** — `vitest --no-isolate` 运行 CLI 测试会**覆盖开发者真实的 `~/.qwen/settings.json`**，测试隔离缺失导致实际数据污染。
6. **[#15248](https://github.com/QwenLM/qwen-code/issues/15248)** — sdk-java Runtime Broker 时序测试在 GitHub 托管 runner 上 3/3 flake，阻塞 fork PR 的 fast lane，是 CI 拥堵的代表性问题。
7. **[#8968](https://github.com/QwenLM/qwen-code/issues/8968)** — 请求支持 MCP 2026-07-28 规范与 MCP Apps，以 daemon WebShell 作为 UI 宿主，反映社区对 MCP 生态升级的强烈期待。
8. **[#15079](https://github.com/QwenLM/qwen-code/issues/15079)**（已关闭）— Managed Agent 运行时动态管理 MCP 服务器而不重建 Session 的需求落地，是托管会话体验的关键改进。
9. **[#12277](https://github.com/QwenLM/qwen-code/issues/12277)**（已关闭）— `qwen serve` 开启 Local Control 时因第二个监听器引发 EADDRINUSE，daemon 网络绑定问题得到处理。
10. **[#15247](https://github.com/QwenLM/qwen-code/issues/15247)** — 提议为 Runtime Broker 增加 HTTP 外部 provisioner，将 Session worker 生命周期交给运维侧服务，瞄准企业级部署场景。

> 另有约 10 条 CI 自动创建的 "Main CI failed" Issue（Managed Agent gate / SDK Java / E2E），多数处于 ready-for-agent + autofix 流转中，表明主分支 CI 稳定性是当前最大的工程负担。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#15255](https://github.com/QwenLM/qwen-code/pull/15255)** — Managed Agent 新增面向 Kubernetes 的共享 Harness 池：租户/Workspace/实例级持久放置、epoch 单调递增、writer grant 防护旧持有者，是企业级多租户部署的核心架构。
2. **[#15263](https://github.com/QwenLM/qwen-code/pull/15263)** — 大规模清理：统一 Managed Agent 首发契约，删除预发布兼容路径、混合版本授权回退及旧 checkpoint/digest 格式，显著瘦身。
3. **[#15211](https://github.com/QwenLM/qwen-code/pull/15211)** + **[#15218](https://github.com/QwenLM/qwen-code/pull/15218)** — @wenshao 的 scheduled-task gate 系列：定时任务在 claim 前执行 shell gate 命令，静默跳过不满足条件的触发，贯穿 daemon 与 Web Shell。
4. **[#15283](https://github.com/QwenLM/qwen-code/pull/15283)** — OpenTUI 会话恢复对齐 Ink：取消管理、resume/branch 回放、对话/文件回退、checkpoint 重放与退出摘要。
5. **[#14959](https://github.com/QwenLM/qwen-code/pull/14959)** — 私有化 Bun 1.3.14 分发，OpenTUI 会话不再依赖全局 Bun，Node 保持启动器边界。
6. **[#14677](https://github.com/QwenLM/qwen-code/pull/14677)** — 安全相关修复：命令中重赋值 `HOME` 后，`cd` / `~` 目标解析按 bash 实际语义处理，避免写路径认证错误。
7. **[#15274](https://github.com/QwenLM/qwen-code/pull/15274)** / **[#15257](https://github.com/QwenLM/qwen-code/pull/15257)** / **[#15284](https://github.com/QwenLM/qwen-code/pull/15284)** — CI 修复系列：将自托管 sdk-java 的 per-host 锁范围收窄到 Maven 缓存回写、锁等待预算从 90 分钟提升至 160 分钟，系统性缓解 CI 排队。
8. **[#15155](https://github.com/QwenLM/qwen-code/pull/15155)** — Todo 列表持久化到 Hosted Session Store 并注入新会话、暴露到 WebShell，跨 turn 状态保持。
9. **[#13606](https://github.com/QwenLM/qwen-code/pull/13606)** — Runtime provider 支持有界的图片与 PDF 投递，按能力快照控制工具描述与内容下发。
10. **[#15212](https://github.com/QwenLM/qwen-code/pull/15212)** — 修复 macOS 上 daemon（launchd 启动）PATH 缺失 `gh` 导致会话 PR 绑定失败的问题，桌面端体验改善。

---

## 📈 功能需求趋势

- **Managed Agent / 服务化架构**：Runtime Broker、Harness 池、外部 provisioner、会话运行时 MCP 管理，社区与官方投入最重的方向，明显瞄准 K8s/企业多租户部署。
- **MCP 生态升级**：MCP 2026-07-28 规范、MCP Apps、Web Shell 中 MCP 工具完整参数/结果展示（#15280）。
- **Web Shell / Desktop 体验**：工具卡片展开细节、follow-pause 修复、Windows 更新可靠性。
- **记忆系统（auto-memory）**：既是需求热点也是 bug 来源（提前终止 agent、队列提取未处理 rejection #15269、诊断边界 #15277）。
- **灵活性与自托管**：自定义 baseUrl/反向代理兼容、worktree 可配置目录（#15292）、精确版本更新（PR #11486）。

---

## 🛠️ 开发者关注点

- **CI 稳定性是最大痛点**：Managed Agent gate 与 SDK Java lane 在自托管/托管 runner 上反复 flake，多个 PR 专门调整锁策略与等待预算，值得贡献者关注合入节奏。
- **测试隔离与开发者环境安全**：`--no-isolate` 覆盖真实用户配置（#15267）值得所有本地跑测试的贡献者警惕。
- **自托管/反向代理兼容性**：effort 降级（#15235）等表明以非官方网关接入的用户仍会遇到静默行为差异。
- **桌面端更新可靠性**：Windows P1 更新失败（#15276）已 ready-for-human，Windows 用户建议暂用完整安装包升级。
- **长会话正确性**：auto-memory 注入消息改变模型行为（#15225）提示重度用户在长任务中注意 agent 提前收尾现象。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*