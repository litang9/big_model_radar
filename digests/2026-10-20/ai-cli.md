# AI CLI 工具社区动态日报 2026-10-20

> 生成时间: 2026-10-19 23:37 UTC | 覆盖工具: 7 个

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
**数据日期：2026-10-20**

---

## 一、生态全景

AI CLI 工具已全面进入 **Agent 化深水区**：各工具的竞争焦点从基础代码生成转向 subagent 编排、权限治理、沙箱安全等系统性工程能力。安全与信任成为今日最突出的共同主题——Claude Code 连发两条数据丢失高危 Bug，Qwen Code 暴露仓库 hooks 免审批执行漏洞，三家工具同时推进沙箱/审批加固 PR。与此同时，企业级能力（MCP/OAuth 集成、可观测性、多平台质量）是拉开差距的关键变量，而 Windows 平台和新兴交互形态（语音/Dots/Computer Use）暴露出大量欠账。

---

## 二、各工具活跃度对比

| 工具 | 热点 Issues | 重要 PR | Release | 今日焦点 |
|---|---|---|---|---|
| **Claude Code** | 10（2 条 data-loss） | 1 | v2.1.304 | 数据丢失高危 Bug + mod/plugin 权限治理 |
| **OpenAI Codex** | 10（含 69 评论 Meta issue） | 10+（合并 19 个功能 PR） | 0.164.0 alpha.4~.6（3 连发） | 配额消耗争议 + Windows 质量欠账 |
| **Gemini CLI** | 10 | 10 + 若干已合并 | v0.66.0 nightly | Subagent 可靠性 + 安全确认误报治理 |
| **Copilot CLI** | 10 | 0 | v1.0.100 + v1.0.101-0 | MCP OAuth 生态问题集中爆发 |
| **OpenCode** | 10 | 10+（单开发者十余 PR） | 无 | Provider 兼容性 + 事件架构修复 |
| **Qwen Code** | 10 + ~10 条 CI 失败 | 10 | v0.25.3（CLI/Desktop/SDK 同步） | P1 安全漏洞 + CI 基础设施危机 |
| **Kimi Code CLI** | 0 | 0 | 无 | 过去 24 小时无活动 |

**观察**：Codex 迭代节奏最猛（3 个 alpha/日，19 PR 合并）；Qwen 发布体系最完整但 CI 自伤严重；Copilot CLI PR 透明度最低（可能闭源开发）；OpenCode 依赖单核心开发者高频输出，存在巴士因子风险。

---

## 三、共同关注的功能方向

### 1. 沙箱与破坏性操作防护（最普遍）
- **Claude Code**：`find -delete` 空变量误删 git checkout（#102901）、VPS 源码被删（#102853）
- **Codex**：Windows MXC 沙箱迁移、符号链接替换防护（PR #55384）
- **Gemini CLI**：零依赖 OS 沙箱提案（#19873）、破坏性操作劝阻需求（#22672）
- **Copilot CLI**：Git 写操作绕过审批回归（#5177）、ACP 沙箱失效（#5089）

**结论**：高权限自动化下的删除/写入防护是全行业最大信任缺口。

### 2. 权限审批精细化
- Claude Code（`decider: "person"`、组织级权限上限）、Gemini CLI（确认误报治理 PR #29833）、Copilot CLI（Assisted Permissions 指引配置）、Qwen Code（folder trust 默认值问题 #14746）——各家都在“安全不过度打扰”的平衡点上持续打磨。

### 3. MCP / OAuth 生态集成
- **Codex**（OAuth 不跨重启持久化 #15122）、**Copilot CLI**（ACP token 不持久化、Entra 回调被拒、企业 registry 不可达）尤为集中；企业用户接入受阻是共同痛点。

### 4. Subagent / 多 Agent 可靠性与可观测性
- **Gemini CLI**（虚假成功上报 #22323、无限挂起 #21409）、**Claude Code**（OTel 孤儿 span #99607）、**Qwen Code**（TTFT/reasoning effort 遥测）、**Codex**（runtime agent 注册机制）。

### 5. Provider 兼容性与 BYOK
- **OpenCode**（自定义 provider 保存必失败、强制注入 stream_options）、**Copilot CLI**（temperature=0 强推致推理模型退化）。

---

## 四、差异化定位分析

| 维度 | Claude Code | Codex | Gemini CLI | Copilot CLI | OpenCode | Qwen Code |
|---|---|---|---|---|---|---|
| **功能侧重** | mod/plugin 权限治理、企业策略 | 沙箱安全、语音/Dots、学术计划 | Subagent 架构、token 效率（AST-aware） | GitHub 生态、Skills/插件 | 开源可定制、桌面体验 | Managed Agent、daemon/会话管理 |
| **目标用户** | 企业 + 重度 plugin 用户 | 全平台消费者 + 研究者 | 开发者（Bash 优先路线） | GitHub/企业存量用户 | 开源社区、自托管用户 | 中文社区、Java 工程化团队 |
| **技术路线** | 闭源，权限体系系统性加固 | Rust 核心，多形态（CLI/Web/语音/桌面） | 开源，社区 PR 活跃 | 闭源，微软生态绑定 | 开源，单核心开发者驱动 | 开源（Fork 自 Gemini 系），重工程路线图 |
| **今日短板** | 数据丢失、Desktop UI 回归 | 配额透明度、Windows 质量 | Subagent 结果不可信 | MCP OAuth 三线受阻 | Provider 兼容层脆弱、文档滞后 | CI 基础设施、安全默认值 |

---

## 五、社区热度与成熟度

- **第一梯队（高热度 + 快速迭代）**：**Codex**（69 评论 Meta issue、89 👍 需求、日均 3 release）与 **Claude Code**（高危 Bug 高关注、企业权限体系成型）——均已进入企业级成熟期，但信任问题（配额/数据安全）在侵蚀口碑。
- **第二梯队（活跃迭代期）**：**Gemini CLI** 与 **Qwen Code**，社区贡献活跃、路线图清晰，但核心架构（subagent、CI 基础设施）尚在补课。
- **第三梯队**：**Copilot CLI** 用户基数大但社区互动单向（Issue 多、PR 透明度低）；**OpenCode** 开发节奏极快但社区反馈量级偏小、依赖个人英雄主义。
- **观察期**：**Kimi Code CLI** 零活动，社区运营明显落后于产品线同侪。

---

## 六、值得关注的趋势信号

1. **安全从“事后修复”转向“系统性治理”**：三家工具同日推进沙箱/审批 PR（Codex 符号链接校验、Claude `decider: "person"`、Gemini 确认误报治理）。**建议**：生产环境立即为 `rm`/`find -delete`/`git reset --force` 配置硬性 deny 规则，勿裸奔 bypass-permissions。

2. **配额/用量透明度成为新的信任战场**：Codex #41220（69 评论）与 Gemini/Claude 的遥测需求表明，agent 循环导致的隐性消耗是订阅制模式的信任危机。用量审计工具将是下一个竞争点。

3. **Windows 是质量洼地**：Codex（截图死锁、MSIX 沙箱、200 进程泄漏）、Qwen（CLI 闪退）、Copilot（文件锁）——Windows 上的 AI CLI 仍属二等公民，团队选型时需重点验证。

4. **Headless/SDK 场景回归频发**：Claude OTel 孤儿 span、Gemini thought signature 400 错误，提示 CI/自动化用户应锁定版本并建立回归测试，而非追新。

5. **版本升级风险普遍存在**：Claude（Routines 侧边栏回归）、Copilot（1.0.88→89 OAuth 回归、Git 审批绕过）、Gemini（原子写入回归 #29499）。**建议**：升级前查 Release Notes + 相关 Issue，安全敏感场景灰度升级。

6. **跨工具互操作萌芽**：Codex 合入 Claude 会话导入去重 PR、Qwen 从 Codex 导入外部记忆——用户数据可迁移性正在成为差异化筹码，锁定效应尚未形成，现在是多工具评估的好时机。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据说明：本次抓取的 PR 评论数均为 undefined，故“热度”结合 Issues 讨论量（评论数）、更新活跃度与关联 Issue 综合判断。数据截止 2026-10-20。

---

## 一、热门 Skills / PR 排行

| # | PR / Skill | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** ([#1742](https://github.com/anthropics/skills/pull/1742)) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 HTTP 头。关联 Issue [#1390](https://github.com/anthropics/skills/issues/1390)（evaluation.py 对真实 MCP 服务器全 0 分）显示该 Skill 是社区最关注的官方 Skill 之一 | OPEN |
| 2 | **skill-creator 触发评估隔离修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 修复触发评估误报、Windows `select()` 失败等问题。对应多个高热度 Issue（[#556](https://github.com/anthropics/skills/issues/556) 12 评论：`claude -p` 0% 触发率；[#1383](https://github.com/anthropics/skills/issues/1383) 6 项问题）| OPEN |
| 3 | **skill-creator eval viewer 安全加固** ([#1961](https://github.com/anthropics/skills/pull/1961)) | 修复脚本逃逸、DNS rebinding、跨站 POST。关联 XSS Issue [#1394](https://github.com/anthropics/skills/issues/1394)（4 评论）| OPEN |
| 4 | **notion-spec-to-implementation + quantitative-resume-auditor** ([#1245](https://github.com/anthropics/skills/pull/1245)) | 规格文档 → Notion 任务拆解，是最活跃的新功能型 PR（6 月提交、10 月仍有更新）| OPEN |
| 5 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Markdown → 带配音的 MP4 视频，零成本方案，内容创作方向代表 | OPEN |
| 6 | **scnet-hpc** ([#1615](https://github.com/anthropics/skills/pull/1615)) | SSH + Slurm 的 HPC 集群操作 Skill，科学计算方向 | OPEN |
| 7 | **architecture-advisor** ([#2040](https://github.com/anthropics/skills/pull/2040)) | 架构模式选型并输出书面论证，harness SDD 套件第 4 个 Skill | OPEN |
| 8 | **skill-quality/security-analyzer 元技能** ([#83](https://github.com/anthropics/skills/pull/83)) | Skill 质量与安全分析工具，存活超过一年的长尾 PR | OPEN |

---

## 二、社区需求趋势（来自 Issues）

1. **信任与安全机制**：[#492](https://github.com/anthropics/skills/issues/492)（46 评论，最高热度）——社区 Skill 冒用 `anthropic/` 命名空间构成信任边界漏洞，社区强烈要求命名空间隔离与签名验证。
2. **组织级分发**：[#228](https://github.com/anthropics/skills/issues/228)（16 评论）——组织内 Skill 共享库、直接分享链接。
3. **Skill 可靠触发与评估**：[#556](https://github.com/anthropics/skills/issues/556)、[#1383](https://github.com/anthropics/skills/issues/1383)——skill-creator 的 eval 框架在 Windows 和 headless 场景不可用。
4. **Agent 记忆与治理**：[#1329](https://github.com/anthropics/skills/issues/1329) compact-memory（符号化压缩记忆）、[#1385](https://github.com/anthropics/skills/issues/1385) 推理质量门禁流水线、[#412](https://github.com/anthropics/skills/issues/412) agent-governance。
5. **Token 效率**：[#1487](https://github.com/anthropics/skills/issues/1487)——claude-api Skill 单次注入 ~156k token 耗尽上下文；[#202](https://github.com/anthropics/skills/issues/202) 要求 skill-creator 精简为可执行指令。
6. **文档类 Skill 质量修复**：docx ([#2018](https://github.com/anthropics/skills/issues/2018))、pdf ([#538](https://github.com/anthropics/skills/pull/538))、slack-gif-creator ([#1868](https://github.com/anthropics/skills/issues/1868)) 陆续发现边界 bug。

---

## 三、高潜力待合并 Skills（活跃 OPEN PR）

- **[#1742](https://github.com/anthropics/skills/pull/1742)** mcp-builder 适配 mcp>=2 —— 修复官方核心 Skill，且有明确关联 Issue #1668，合并优先级高
- **[#1298](https://github.com/anthropics/skills/pull/1298)** skill-creator 触发评估修复 —— 直击多个高热度 Issue，社区刚需
- **[#1961](https://github.com/anthropics/skills/pull/1961)** eval viewer 安全加固 —— 安全类修复通常快速合并
- **[#1997](https://github.com/anthropics/skills/pull/1997)** YAML frontmatter 解析修复 —— 10 月新提交且持续更新
- **[#1245](https://github.com/anthropics/skills/pull/1245)** Notion spec → implementation —— 挂起最久但持续活跃的新功能 PR
- **[#1792](https://github.com/anthropics/skills/pull/1792)** docx LibreOffice 超时错误处理 —— 小而确定的质量修复

---

## 四、生态洞察（一句话总结）

**社区最集中的诉求不是“更多 Skill”，而是 Skill 的可信度（命名空间安全）、可发现性（触发可靠性）与可维护性（eval 框架、token 效率）——即从“能用”走向“可信的基础设施”阶段。**

---

# Claude Code 社区动态日报 · 2026-10-20

## 📌 今日速览

Claude Code 发布 **v2.1.304**，重点增强了 mod/plugin 的 hooks 权限治理能力。社区方面，**两条数据丢失高危 Bug**（Bash `find -delete` 误删 git checkout、VPS 源码被删）引发高度关注，同时 Desktop Code 标签页移除 Routines 侧边栏引发的可用性回归仍在持续发酵。

---

## 🚀 版本发布：v2.1.304

- 当某个优先运行的 plugin 跳过了用户 mod 的 hook 时，现在会在 transcript 中记录一行日志，注明事件名和 plugin 名称 —— 提升了多 mod 场景的可观测性。
- 为 mod 的 `tool.check` 应答新增 `decider: "person"` 选项：只有权限对话框或宿主回调才能批准该请求，否则以 mod 的规则拒绝 —— 进一步收紧了自动化权限边界。

---

## 🔥 社区热点 Issues

1. **#102901 [high-priority, data-loss]** Bash 沙箱下执行未展开变量的 `find $T -type f -delete`，`$T` 为空导致整个 git checkout 被删除
   高危数据丢失事故，bypass-permissions + 沙箱未能拦住空变量展开，暴露了 Bash 沙箱对危险通配路径的防护缺口。
   https://github.com/anthropics/claude-code/issues/102901

2. **#102853 [data-loss]** Agent 在移动 VCS root 时删除了 VPS 上的源码和 git 仓库
   又一起数据丢失事件，与上一条共同指向“高权限模式下缺乏删除类操作防护”的系统性问题。
   https://github.com/anthropics/claude-code/issues/102853

3. **#102489 [duplicate]** Desktop Code 标签页移除了 Routines 侧边栏，缺少跨 routine 的运行记录视图（👍 6）
   10-14 桌面端更新后 Routines 入口消失，用户无法集中查看历史运行，6 个 👍 表明受影响面较广；与 #102703 为同一回归。
   https://github.com/anthropics/claude-code/issues/102489

4. **#102703** Routines 侧边栏被隐藏且无法重新启用
   定时任务仍正常运行但会话不再出现在侧边栏，属同一 UI 回归的补充报告，两 issue 均于今日活跃更新。
   https://github.com/anthropics/claude-code/issues/102703

5. **#99607 [regression, area:agent-sdk]** Agent SDK / headless 模式不再发出 `claude_code.interaction`，导致 TRACEPARENT 被忽略、`llm_request` span 成为孤儿根节点（2.1.257 引入）
   对依赖 OpenTelemetry 可观测性的生产用户影响较大，是 headless 自动化场景的重要回归。
   https://github.com/anthropics/claude-code/issues/99607

6. **#99463** 从 Claude Desktop fork 一个 `claude remote-control` 会话失败：403 "elevated session requires a trusted device"
   远程控制 + fork 组合场景的认证阻塞，影响 Desktop/CLI 混合工作流。
   https://github.com/anthropics/claude-code/issues/99463

7. **#76097 [closed, 👍 8]** 请求在 Desktop/Cowork 中加入类似移动端的连续语音对话模式
   8 个 👍 的热门功能请求，虽然已关闭（stale），但持续有评论更新，反映社区对语音交互 + 后台任务并行的高需求。
   https://github.com/anthropics/claude-code/issues/76097

8. **#103449** Web/Cowork 的 GitHub 集成问题（附截图）
   今日新提，涉及 claude-code-web 的 GitHub 集成异常。
   https://github.com/anthropics/claude-code/issues/103449

9. **#92635** Harness 引导 Claude 用 `! <command>` 执行 sudo/交互式登录，但 `!` 执行器无 TTY、stdin=/dev/null 根本跑不了
   模型引导与执行器能力不匹配的典型问题，影响密码/认证类操作流程。
   https://github.com/anthropics/claude-code/issues/92635

10. **#89450 [closed]** Claude Code 把流程性工作推回给用户，实际上把非工程师排除在外
    来自日本非专业开发者的深度反馈，引发关于“agent 应主动编排而非依赖用户补流程”的产品哲学讨论。
    https://github.com/anthropics/claude-code/issues/89450

---

## 🔀 重要 PR 进展

过去 24 小时仅 1 条 PR 更新：

1. **#99540 [OPEN]** sec-default：组织对某工具设定的权限上限对其成员安装的 plugin 同样生效
   由 Anthropic 成员 @poteat 提交。组织可通过 policy mod 限制 connector 工具，该上限现在覆盖个人安装的 plugin（含 deny 规则），且 mod 的每个决策 hook 都带 `.catch` 兜底。与今日 v2.1.304 的 `decider: "person"` 发布方向一致，明显在系统性地加固 **mod/plugin 权限治理体系**。
   https://github.com/anthropics/claude-code/pull/99540

---

## 📈 功能需求趋势

- **数据安全与沙箱防护**：两条 data-loss 高危 bug 说明社区对“高权限模式下删除/破坏性操作的硬防护”需求迫切。
- **Plugin/Mod 治理与可观测性**：版本发布 + PR 均围绕 mod hooks、组织级权限上限、决策日志，是多 mod 生态下的核心方向。
- **Desktop UI 回归修复**：Routines 侧边栏系列问题显示桌面端信息架构调整缺少迁移方案。
- **可观测性（OTel/tracing）**：headless 场景的 span 归属回归直接影响生产监控。
- **语音/多模态交互**：连续语音模式请求持续获得支持。
- **多 Agent 协作基础设施**：跨会话消息、fork 树视图、权限拒绝的结构化回传等请求反复出现。

---

## ⚠️ 开发者关注点

1. **bypass-permissions + Bash 沙箱的组合风险**：空变量展开即可绕过防护造成不可逆删除，建议在 CI/生产环境为 `find -delete`、`rm` 等命令配置硬性 deny 规则。
2. **headless/SDK 用户注意 2.1.257+ 的 tracing 回归**（#99607），监控告警可能因孤儿 span 失效。
3. **Desktop 用户避免依赖 Routines 侧边栏**进行 routine 运行管理，回归修复前需通过 Scheduled 页面访问。
4. **大量老 issue 因 stale 被批量关闭**（今日多条 7-8 月 issue 均标记 stale/closed），如有未解决的需求需及时跟进重开或重新提交。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-10-20** | 数据来源：github.com/openai/codex

---

## 📌 今日速览

Codex CLI 密集发布 0.164.0 alpha 版本（alpha.4 至 alpha.6），合并了超过 19 个功能 PR，涵盖沙箱安全加固、runtime agent 注册、Academic Researchers 计划支持等。社区侧，配额异常消耗追踪帖（#41220）持续发酵至 69 条评论，Dots 语音连接与 Windows Computer Use 截图问题仍是高频痛点。

---

## 🚀 版本发布

- **rust-v0.164.0-alpha.6 / alpha.5 / alpha.4**：过去 24 小时内连续发布 3 个 alpha 版本，节奏非常密集，表明 0.164.0 稳定版临近。当前合入的主要变更包括 Windows MXC 沙箱迁移至 `mxc-sdk`、runtime agent 注册机制、以及多项稳定性修复。

---

## 🔥 社区热点 Issues

1. **[#41220](https://github.com/openai/codex/issues/41220) 配额异常消耗跨报告追踪帖**（69 评论 / 20 👍）
   最受关注的 Meta issue：订阅配额/信用点消耗速度远超预期，且与本地 token 统计不一致。已聚合多个用户报告，官方尚未给出结论性解释。

2. **[#10665](https://github.com/openai/codex/issues/10665) Azure DevOps 原生集成请求**（31 评论 / 89 👍）
   👍 数最高的需求：企业用户呼吁 Codex Web 提供与 GitHub 同级的 Azure Repos 集成。

3. **[#35446](https://github.com/openai/codex/issues/35446) Windows Computer Use 截图死锁**（44 评论）
   Win10 22H2 上 `FrameArrived` 内等待 SoftwareBitmap 转换导致死锁，长期未修复。

4. **[#49383](https://github.com/openai/codex/issues/49383) Windows 截图失败：FrameArrived 超时 + E_INVALIDARG**（31 评论）
   与 #35446 同族问题，窗口检测不可靠，Windows Computer Use 可用性堪忧。

5. **[#50870](https://github.com/openai/codex/issues/50870) Dots 语音通话跨设备响铃但不接通**（20 评论）
   覆盖 iPhone / Mac / Windows Web，Dots 连接性问题集中爆发。

6. **[#51731](https://github.com/openai/codex/issues/51731) / [#52873](https://github.com/openai/codex/issues/52873) Dot 无法读取用户 Codex 会话**（各 19 评论）
   "unsupported placement format version" 后端错误，Dot 无法访问用户自建线程，疑为协议版本不兼容。

7. **[#35871](https://github.com/openai/codex/issues/35871) Windows 沙箱无法启动 MSIX 版 PowerShell**（17 评论）
   Store 版 pwsh 在受限 token 下报 `CreateProcessAsUserW error 5`，影响大量 Windows CLI 用户。

8. **[#51649](https://github.com/openai/codex/issues/51649) Windows 桌面端进程堆积至 200 个 Node helper / 11.6GB 内存**（10 评论）
   MCP/CUA/node_repl 进程批次反复累积，内存泄漏级问题。

9. **[#15122](https://github.com/openai/codex/issues/15122) 远程 MCP OAuth 登录不跨重启持久化**（13 评论）
   每次重启需重新走 OAuth 流程，企业 MCP 集成的核心障碍。

10. **[#53677](https://github.com/openai/codex/issues/53677) macOS Orbit 目录无限重试加载 65 个会话**（9 评论）
    access-denied 被当作可重试错误，重启也无法停止，持续产生无效请求。

---

## 🔧 重要 PR 进展（均为 @copyberry[bot] 提交并于当日关闭/合并）

1. **[#55378](https://github.com/openai/codex/pull/55378) Windows MXC 沙箱迁移至 `mxc-sdk`**
   替换独立 MXC crates，有望改善 Windows 沙箱稳定性（呼应 #35871 等 Windows 沙箱问题）。

2. **[#55384](https://github.com/openai/codex/pull/55384) 拒绝沙箱前可替换符号链接**
   安全加固：即使可执行文件只读，其查找路径上的符号链接仍可能被替换，现严格校验。

3. **[#55398](https://github.com/openai/codex/pull/55398) / [#55402](https://github.com/openai/codex/pull/55402) Runtime agent 注册机制与签名断言**
   新增 wire 类型、注册客户端和内存签名器，支持 OAuth/PAT/API key 三种凭据。

4. **[#55387](https://github.com/openai/codex/pull/55387) 支持 Academic Researchers 计划**
   识别 `sci` / `sci_plus` 计划，纳入认证、限流与客户端 schema。

5. **[#55401](https://github.com/openai/codex/pull/55401) 环境断连通知延迟至恢复失败后**
   新增 `Recovering` 状态，避免临时传输丢失时误报断连。

6. **[#55395](https://github.com/openai/codex/pull/55395) 中断的 Guardian 审查回滚以保留证据**
   取消/超时的审查不再让证据“半途入库”，标记回滚保证后续审查完整性。

7. **[#55397](https://github.com/openai/codex/pull/55397) 记录 OAuth 溯源与登录身份**
   Token 刷新时可靠识别 issuer/client ID，避免从不可信的 token claims 推断。

8. **[#55368](https://github.com/openai/codex/pull/55368) Responses Lite 默认启用增量工具目录**
   `incremental_tools` 标记为 stable，工具目录更新直接附加到请求历史。

9. **[#55365](https://github.com/openai/codex/pull/55365) Claude 会话导入去重**
   仅导入后台化 Claude 会话的延续部分，避免历史重复。

10. **[#55380](https://github.com/openai/codex/pull/55380) Rollout 文件生成前保留线程元数据**
    修复 fork/父线程关系丢失问题，减少不必要的文件系统扫描。

---

## 📈 功能需求趋势

- **企业生态集成**：Azure DevOps 原生支持（89 👍）是呼声最高的需求；远程 MCP / OAuth 持久化相关 issue 多条长期开放。
- **Windows 平台质量**：Computer Use 截图、沙箱 MSIX 兼容、进程堆积等问题密集，Windows 已成为问题最集中的平台。
- **Dots / 语音体验**：连接失败、placement 格式不兼容、浏览器控制交接未确认等问题集中涌现，是新功能上线初期的阵痛。
- **配额透明度**：用量统计不一致、agent 循环消耗配额（#55281、#54178），用户强烈要求更清晰的用量核算。

---

## ⚠️ 开发者关注点

1. **配额消耗不可预测**是当前最大信任危机，多条 issue 指向 agent 进入重复循环后快速耗尽额度，官方亟需用量审计工具。
2. **Windows 沙箱与 Computer Use 可靠性**欠账较多，今日 MXC 沙箱迁移 PR 是积极信号，但截图死锁类问题仍未闭环。
3. **MCP/OAuth 生命周期管理**（登录持久化、企业目录一致性）是企业用户采用的关键阻碍。
4. **Dots 跨端兼容**：placement 协议版本问题表明客户端/后端迭代节奏不同步，需注意版本协商机制。

---
*本报告基于 GitHub 公开数据自动汇总，仅供参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-10-20 | 数据来源：github.com/google-gemini/gemini-cli**

---

## 📌 今日速览

昨日发布 nightly 版本 **v0.66.0**（20261019），节奏稳定。PR 方面社区贡献活跃，聚焦 **Shell 安全确认误报治理**（多个安全相关 PR）、**ripgrep 搜索健壮性** 与 **IDE 重连修复**。Issues 热点持续集中在 **Subagent 架构的可靠性问题**上，包括挂起、虚假成功上报、技能调用不足等。

---

## 🚀 版本发布

- **v0.66.0-nightly.20261019.ged96faedf**：例行 nightly 构建，由自动版本 PR [#29821](https://github.com/google-gemini/gemini-cli/pull/29821) 驱动。
  [Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.66.0-nightly.20261018.ged96faedf...v0.66.0-nightly.20261019.ged96faedf)

---

## 🔥 社区热点 Issues（Top 10）

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — Subagent 达到 MAX_TURNS 后仍上报 `success`/`GOAL`，掩盖了真实中断。**P1**，评论 13 条，涉及 agent 核心可信度问题，影响用户对结果的信任。
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — Generalist agent 无限挂起（连建文件夹都卡死，需等待 1 小时+）。**P1**，👍 8，用户已通过禁用 subagent 规避，说明体验影响较大。
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — 提议零依赖 OS 沙箱 + 事后意图路由，充分利用 Gemini 3 原生 bash 能力。大工程量 enhancement，方向性很强。
4. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — Gemini 几乎不主动使用自定义 skills 和 subagents，需显式指令。**P2**，反映 agent 调度策略短板。
5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — 评估 AST-aware 文件读取/搜索/代码库映射的 EPIC（关联 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)、[#22747](https://github.com/google-gemini/gemini-cli/issues/22747)）。官方主导，指向 token 效率优化方向。
6. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — Browser subagent 在 Wayland 下失败。**P1**，Linux 桌面用户核心痛点。
7. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — 工具数 > 128 时触发 API 400 错误。**P2**，重度定制用户（多 MCP/skill）的硬阻断。
8. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)** — Agent 应阻止/劝阻破坏性操作（如不必要的 `git reset`、`--force`、DB 修改）。安全方向高价值需求。
9. **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)** — 模型频繁在随机目录生成临时脚本，污染工作区。**P2**，影响提交整洁度的高频抱怨。
10. **[#21924](https://github.com/google-gemini/gemini-cli/issues/21924)** — 终端 resize 时的性能与闪烁问题（需迁移 RenderStatic）。TUI 体验的核心技术债。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#29828](https://github.com/google-gemini/gemini-cli/pull/29828)** [P1] — 修复多轮对话中历史 function call 缺失 thought signature 导致的 HTTP 400，稳定性关键修复。
2. **[#29834](https://github.com/google-gemini/gemini-cli/pull/29834)** [P1] — a2a-server/core 保留 `thoughtsTokenCount` 等扩展 token 元数据，对齐逐轮上报。
3. **[#29835](https://github.com/google-gemini/gemini-cli/pull/29835)** [P2] — 修复 `isAuthenticationError` 用非锚定子串匹配 `'401'` 导致的误判（端口 4012、行号均会触发 OAuth 重登）。
4. **[#29833](https://github.com/google-gemini/gemini-cli/pull/29833)** — 安全确认优化：agent 自身命令输出不再算外部输入，workspace 内路径不再报批，同类 flag 批准可记忆。直击反复确认痛点。
5. **[#29831](https://github.com/google-gemini/gemini-cli/pull/29831)** — ripgrep 超时改为显式报错，不再返回“看似无结果”的部分匹配，消除静默失败。
6. **[#29744](https://github.com/google-gemini/gemini-cli/pull/29744)** — `/ide enable` 支持 IDE 服务器（VS Code Reload Window）后重连，修复集成终端断连死局。
7. **[#29749](https://github.com/google-gemini/gemini-cli/pull/29749)** — 原子写入不再静默覆盖只读文件、不再分裂硬链接。回归 #29499 引入的问题，涉及数据安全。
8. **[#29824](https://github.com/google-gemini/gemini-cli/pull/29824)** [P2] — 新增 `routing.numericalRules`：按复杂度分数区间路由到不同模型，成本/能力控制粒度升级。
9. **[#29832](https://github.com/google-gemini/gemini-cli/pull/29832)** — 保留用户级 `~/.gitconfig`：此前 shell/git 环境强制 `GIT_CONFIG_GLOBAL=/dev/null`，导致 git 身份等配置丢失。
10. **[#29799](https://github.com/google-gemini/gemini-cli/pull/29799)** — 配额中断/取消时保留可恢复的会话历史，Escape 可停止配额重试弹窗。

> 另有已合并的 [#29792](https://github.com/google-gemini/gemini-cli/pull/29792)（终端滚回保留）与 [#29629](https://github.com/google-gemini/gemini-cli/pull/29629)（流式输出闪烁），TUI 体验修复集中落地。

---

## 📈 功能需求趋势

- **Subagent 架构治理**：占比最高——可靠性（挂起/虚假成功）、调度意愿（不主动用 skills）、可观测性（trajectory 分享 #22598、bug 报告缺上下文 #21763）、并行协作与共享内存（#18287）。
- **Bash/Shell 优先路线**：利用模型原生 POSIX 能力 + 沙箱（#19873），配套治理临时文件污染（#23571）与破坏性操作防护（#22672）。
- **Token/上下文效率**：AST-aware 工具引入（#22745/22746/22747）、"Tactful Extraction" 精准读取（#19561）、文件化任务跟踪替代 WriteToDo（#18836/#21000）。
- **搜索与工具扩展性**：>128 工具 400 错误（#24246）、grep 溢出防护（PR #29822）。
- **安全与信任模型**：多个安全 PR 集中处理确认误报，社区对“不过度打扰但保持安全”的平衡需求强烈。

---

## ⚠️ 开发者关注点（痛点总结）

1. **Agent 结果不可信**：subagent 上报成功实为中断（#22323）+ 无限挂起（#21409）是当前最影响生产使用的问题。
2. **确认弹窗过频**：shell 命令安全检查误报频繁，多个 PR（#29833、#29672）正在系统性治理。
3. **配置生效问题**：settings.json 覆盖被 Browser Agent 忽略（#22267）、symlink agent 不识别（#20079）。
4. **TUI 体验**：闪烁、resize 性能、滚回丢失——本周已有多个修复落地，趋势向好。
5. **环境兼容性**：Wayland（#21983）、Android/Termux（PR #29823）、容器沙箱内 IDE 集成（PR #29748）等长尾环境持续暴露问题。

---
*本报告基于 GitHub 公开数据自动整理，人工分析生成。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-20** | 数据来源：github.com/github/copilot-cli

---

## 1. 今日速览

Copilot CLI 连续发布 **v1.0.100** 与 **v1.0.101-0** 两个版本，新增子代理结构化输出、Assisted Permissions 指引配置、`--disable-client-telemetry` 与 `--trust-folder` 等功能。社区方面，**MCP OAuth 生态问题集中爆发**（ACP 模式 token 不持久化、Entra 回调被拒、企业自定义 registry 不可达），Windows 插件更新文件锁问题也有新报告。Skill 显式调用失效的高热 Issue（#4438）持续活跃。

---

## 2. 版本发布

### v1.0.101-0
- **新增**：为动态工作流子代理添加原生结构化输出（支持相应模型）
- **新增**：`assistedApprovalInstructions` 设置，可指导 Assisted Permissions 的确认决策
- **修复**：共享 MCP 认证错误现指向客户端登录设置

### v1.0.100
- **新增**：`--disable-client-telemetry` 标志，可关闭客户端遥测上传
- **新增**：`--trust-folder` 标志，用于 `-p` 或管道 stdin 启动的一次性 prompt 会话
- **新增**：支持通过 GitHub 安装链接安装已验证的 Skills 与插件（`copilot plugin install "ghapp://air/install?..."`）

⚠️ 注意：#5197 报告 1.0.100 在 WSL2 上语音服务器段错误，升级需留意。

---

## 3. 社区热点 Issues

| # | Issue | 关注度 | 要点 |
|---|-------|--------|------|
| [#4438](https://github.com/github/copilot-cli/issues/4438) | `disable-model-invocation: true` 导致 Skill 完全不可达 | 👍14 / 💬12 | 高热老 Issue：Skill 应为“仅手动调用”却变成完全无法调用，`skill()` 返回 `Skill not found`。影响 Skill 工作流的核心语义，持续未修 |
| [#1305](https://github.com/github/copilot-cli/issues/1305) | 远程 OAuth MCP 服务器支持 CIMD | 👍39 / 💬7 | 已关闭——与 v1.0.101 修复共享 MCP 认证错误相呼应，企业 MCP 接入的重要进展 |
| [#2411](https://github.com/github/copilot-cli/issues/2411) | Shift+Enter 直接提交而非换行 | 👍6 / 💬6 | 已关闭。回归问题修复，交互体验细节 |
| [#4950](https://github.com/github/copilot-cli/issues/4950) | BYOK 强制 temperature=0 导致推理模型退化 | 💬4 | 1.0.81+ 对自定义 OpenAI 兼容提供商强推贪婪采样，推理模型输出退化、上下文溢出时静默挂起。BYOK 用户核心痛点 |
| [#4994](https://github.com/github/copilot-cli/issues/4994) | 回归：ACP 会话每次都弹 MCP OAuth 授权页 | 💬2 | 1.0.88→1.0.89 回归，有效 token 仍被 401，浏览器反复弹窗 |
| [#4488](https://github.com/github/copilot-cli/issues/4488) | Windows 多会话时插件更新报 Access is denied | 💬2 | 文件锁问题，配套新报告 [#5194](https://github.com/github/copilot-cli/issues/5194)（已关闭），或已在近期版本修复 |
| [#4888](https://github.com/github/copilot-cli/issues/4888) | MCP 客户端在 discover 后仍发 legacy initialize | 💬2 | 协议版本切换 bug，双版本 MCP SDK 服务器会直接拒绝连接 |
| [#5040](https://github.com/github/copilot-cli/issues/5040) | Entra 拒绝 127.0.0.1 回调（AADSTS50011） | — | 企业 Entra ID 保护的 MCP 服务器无法认证，loopback 回调端口不固定，缺少 localhost 覆盖配置 |
| [#3265](https://github.com/github/copilot-cli/issues/3265) | 请求 `/pause` 温和中断 agent | 👍6 | 长任务协作体验诉求，讨论持续 |
| [#5177](https://github.com/github/copilot-cli/issues/5177) | 回归：harness 迁移后 Git 写操作不再请求手动批准 | — | **安全相关**：10 月迁移后 `git add/commit` 等仓库变更命令绕过批准提示，值得团队关注 |

---

## 4. 重要 PR 进展

过去 24 小时无 PR 更新（数据为空），略过。

---

## 5. 功能需求趋势

从 Issue 分布可提炼出以下方向：

1. **MCP 生态成熟度**（最集中）：OAuth token 持久化（#5192）、企业 registry 支持（#4949）、协议版本协商（#4888）、Entra 兼容（#5040）、沙箱策略暴露给 MCP 服务器（#5193）
2. **权限与安全精细化**：读写操作区分审批（#4443）、批准附带指引（#5187）、Git 命令审批回归（#5177）、ACP 沙箱失效（#5089）
3. **多代理/自定义代理能力**：子代理 MCP 工具发现范围（#5191）、延迟工具加载失效（#5195）、Skill 调用语义（#4438）
4. **BYOK / 企业自定义模型**：采样参数控制（#4950）、模型 ID 含斜杠无法选择（#4953）
5. **交互体验**：`/ask` 窗口自适应（#4951）、图片粘贴（#4544）、`/clear` 保留模型选择（#5189）

---

## 6. 开发者关注点

- **MCP OAuth 是当前最大痛点**：ACP 模式、Entra、企业 registry 三条线同时出问题，企业用户接入受阻明显
- **权限审批可靠性**：安全敏感场景（Git 写操作、沙箱旁路）的回归问题需优先验证
- **BYOK 灵活性**：CLI 对采样参数、模型 ID 的隐式约束破坏了自定义模型工作流
- **Windows 多会话体验**：文件锁导致插件更新失败是反复出现的平台问题
- **升级风险**：1.0.88→0.89、1.0.100 均有回归报告，团队升级前建议关注 Release Notes 与相关 Issue

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-10-20

## 📌 今日速览

今日无新版本发布，但核心开发者 @kitlangton 单日提交了十余个 PR，集中修复事件作用域（event scope）泄漏、会话删除竞态等架构级问题，并带来时间线动画、无障碍模式等体验改进。Issue 侧新增多个 provider 兼容性问题（缓存、stream_options 注入），v1→v2 会话迁移缺陷也浮出水面。

---

## 🔥 社区热点 Issues

**1. Desktop 自定义 Provider 保存必失败**（OPEN，11 评论，5 👍）
保存处理器无条件抛出 `provider.custom.unavailable`，任何服务器上都无法保存自定义 OpenAI 兼容 provider。评论数最高、影响面广的阻断性 Bug。
[#50650](https://github.com/anomalyco/opencode/issues/50650)

**2. Node fetch 请求缺失 x-opencode-session header**（CLOSED，7 评论）
模型提供商 OpenCode Go 官方通知部分请求缺少必需 header，可能触发计费或追踪异常。已修复关闭。
[#47438](https://github.com/anomalyco/opencode/issues/47438)

**3. Web 时间线丢弃 tool-result 诊断信息**（OPEN，3 评论，已复现）
`tool.execute.after` hook 写入的 `metadata.diagnostics` 在 TUI 正常显示，但 V2 web/desktop 时间线静默丢弃，两套渲染面行为不一致。
[#57180](https://github.com/anomalyco/opencode/issues/57180)

**4. Anthropic cacheFormat 放错位置导致工具调用后缓存失效**（OPEN，2 评论）
`cache_control` 被注入到 tool message 的 `content` 内，网关忽略之——凡是最后一条是工具结果的请求都不缓存，直接推高 token 成本。
[#57199](https://github.com/anomalyco/opencode/issues/57199)

**5. openai-compatible 强制注入 stream_options / store**（OPEN，1 评论）
对所有 Chat Completions 请求注入 OpenAI 专属字段，“OpenAI 风格但非完全兼容”的 API 直接返回 400。
[#57230](https://github.com/anomalyco/opencode/issues/57230)

**6. v1→v2 会话迁移遗漏二次升级前的 v1 会话**（OPEN，1 评论）
升级 V2 → 回滚 V1 建新会话 → 再升 V2 的用户，中间创建的会话永久停留在 legacy 表中不可见。
[#57226](https://github.com/anomalyco/opencode/issues/57226)

**7. 长会话请求组装 O(N) 查询，首 token 前等待约 20 分钟**（CLOSED）
6,400 条消息的会话因逐条 DB 往返组装请求，性能极端案例，凸显长会话架构瓶颈。
[#49329](https://github.com/anomalyco/opencode/issues/49329)

**8. auth.json 无锁全文件重写，并发进程互相覆盖凭证**（CLOSED）
多进程场景下凭据静默丢失，属数据安全隐患。
[#46128](https://github.com/anomalyco/opencode/issues/46128)

**9. 扩展思考轮的幻影工具调用永久卡死会话**（CLOSED）
模型调用不存在的工具被存为 `invalid` part，后续 Anthropic 连续拒绝所有续接请求。
[#47274](https://github.com/anomalyco/opencode/issues/47274)

**10. Docker 官方镜像不存在**（OPEN，1 评论）
按官网 docker-compose 指引拉取 `anomalyco/opencode:latest` 失败，文档与基础设施不一致，阻塞容器化用户。
[#57228](https://github.com/anomalyco/opencode/issues/57228)

---

## 🛠 重要 PR 进展

**1. 修复插件事件订阅与 catalog 重载的作用域**（#57186）
非内置插件订阅事件时丢失 Location 作用域，事件可能泄漏到其他 Location。配套的 #57183（全局 project/worktree/pty/projector 服务）与 #57223（客户端 catalog 刷新合并）构成一组架构修复。

**2. 防止过期读取复活已删除会话**（#57222，关闭前作 #56886）
在 metadata/family 读取进行中删除的会话不再被陈旧数据恢复，修复 #56736。

**3. compaction 输出上限重试 + 保留用户轮次**（#57220）
思考 token 计入 32k 输出上限导致大压缩失败，现在会重试并保护用户消息不被压掉。

**4. 流式渲染改用 @opencode/patchmark 增量解析**（#57016）
替换 marked + remend 的全量重解析，长回复流式渲染不再越来越慢，性能改进显著。

**5. TUI 屏幕阅读器模式**（#56959）
全屏原地重绘对读屏软件不友好，新增 opt-in 模式，可访问性里程碑。

**6. 时间线 iOS 风格动画**（#57224）
流式文本、工具行、Working 指示器改为平滑增长动画，减少跳变。

**7. 供应商下架模型的处理**（#57148）
隐藏已退役模型并主动提供替代选项，改善模型生命周期体验。

**8. 浏览器面板内快捷键与 ⌘T 修复**（#56697 + #57156）
配套发布：浏览器 pane 内保持应用快捷键可用，⌘T 在 pane 内打开标签页。

**9. 后台任务运行时长显示**（#57218）与焦点环修复（#57221）
均为 @kitlangton 的桌面体验打磨系列。

**10. Console 企业表单反垃圾**（#57166，已关闭）
阻止脚本注入与垃圾提交直达 Salesforce/邮件系统。

---

## 📈 功能需求趋势

- **Provider 兼容性与自定义接入**：自定义 provider 表单失效、cacheFormat 错位、强制注入 OpenAI 字段、vLLM 开箱发现（#47344）——兼容层是目前最大的痛点集群。
- **长会话性能**：消息加载阻塞 TUI（#53428/#53391）、O(N) 请求组装（#49329）、压缩失败（#57220），长上下文用户持续施压。
- **V1→V2 迁移可靠性**：会话遗漏（#57226）、插件加载差异（#50140/#48114）。
- **会话管理细粒度操作**：从单条消息 fork（#57229）、API key 删除入口（#57225）。
- **桌面端易用性**：/connect 不可发现（#47440）、本地服务器连接失败（#51587）。

## ⚠️ 开发者关注点

1. **多客户端事件架构脆弱**：TUI 因未加载会话的 `message.removed` 事件停止更新（#52584），今日多个 event scope PR 正是对此的系统性回应。
2. **Hook 生命周期不完整**：工具执行失败时 `tool.execute.after` 不触发，插件状态永久泄漏（#48085）——插件作者需防御性处理。
3. **并发写入安全**：auth.json 全文件重写无锁（#46128），多进程部署用户应警惕凭据丢失。
4. **生态文档滞后**：Docker 镜像缺失（#57228）提示容器化部署需先验证基础设施可用性。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-10-20

## 📌 今日速览

Qwen Code 今日发布 **v0.25.3** 稳定版（含 Desktop 与 TypeScript SDK 同步更新），带来 Test Failure Explorer 模型生成布局等新特性。社区方面，一个 **P1 级安全 Issue（#14746）引发高度关注**——克隆仓库中的项目 hooks 可在无任何审批的情况下于启动时执行。此外，自托管 CI 的 sdk-java 锁排队问题成为今日最高频的工程痛点，多个 PR 正在调整锁预算。

---

## 🚀 版本发布

- **v0.25.3**（CLI / Desktop / SDK 同步发布）
  - **Features**：Test Failure Explorer 支持可选的模型生成布局，含校验与固定视图回退机制
  - **Breaking Changes**：无
  - Nightly 版本包含 daemon 会话级 Skill / Extension 刷新支持
  - **SDK TypeScript v0.1.21** 捆绑 CLI 0.25.3；**Desktop v0.25.3** 修复 managed-agent 的 team_plan_approval 中断回合结算问题

---

## 🔥 社区热点 Issues

1. **#14746 [P1·安全] 克隆仓库的项目 hooks 启动即执行，无信任提示** — 默认 `security.folderTrust.enabled=false` 时所有文件夹被视为可信，`.qwen/settings.json` 中声明的 hooks 在 `qwen` 启动瞬间即运行。这是典型的恶意仓库攻击向量，**今日最需优先处理的安全问题**。
   [链接](https://github.com/QwenLM/qwen-code/issues/14746)

2. **#14743 [P1] CI：sdk-java 锁无法限制单主机队列，任务饿死数小时** — 自托管 ECS 池所有 SDK Java 任务串行竞争同一把文件锁，10-19 当天多个任务耗尽 3600s 预算后失败，一个测试都没跑。直接拖慢整个主干交付节奏。
   [链接](https://github.com/QwenLM/qwen-code/issues/14743)

3. **#14166 [P2] managed-agent D7-2：java_durable 操作的原始命令对账** — wenshao 主导的会话管理路线图切片，12 条评论显示深度设计讨论，是 durable 操作可靠性的关键前置。
   [链接](https://github.com/QwenLM/qwen-code/issues/14166)

4. **#14751 [P2] LSP：Config.shutdown() 后语言服务器仍在运行** — `NativeLspService.stop()` 全代码树仅测试调用一次，存在资源泄漏，daemon 场景下影响尤为明显。
   [链接](https://github.com/QwenLM/qwen-code/issues/14751)

5. **#14722 [P2] Web Shell Token Usage 中显示每模型 TTFT 与输出速度** — 已关闭。社区对可观测性的持续需求，且指出当前工具调用响应的 TTFT 统计口径有误。
   [链接](https://github.com/QwenLM/qwen-code/issues/14722)

6. **#14492 [P2] Main CI：SDK Java HostedExtensionsIT 集成测试失败** — 手动触发的全量套件失败，暴露 MySQL 集成路径的稳定性问题。
   [链接](https://github.com/QwenLM/qwen-code/issues/14492)

7. **#14755 [P3] Desktop：每次启动闪现登录/Token 界面** — Windows 上工作区出现前一闪而过的 "Connect to Qwen Code" 卡片，影响首印象的 UI 体验问题。
   [链接](https://github.com/QwenLM/qwen-code/issues/14755)

8. **#13076 Windows 下 CLI 闪退无任何输出** — 存续近一个月，团队内两人独立复现，launcher 从未暴露 `spawnSync result.error`，排查困难。
   [链接](https://github.com/QwenLM/qwen-code/issues/13076)

9. **#14732 [P3] embedded-harness-scheduler halt-bound 测试在高负载主机上抖动（19/20）** — 已关闭。负载敏感型 flaky 测试的典型样本，与今日多个 CI 失败 Issue 同源。
   [链接](https://github.com/QwenLM/qwen-code/issues/14732)

10. **#14508 遥测：以 span 属性形式输出 reasoning effort** — 遵循 `gen_ai.request.*` 命名规范，反映社区对 LLM 调用可观测性粒度的要求。
    [链接](https://github.com/QwenLM/qwen-code/issues/14508)

> 另注意：今日有 **约 10 条 Main CI 失败 Issue**（#14785/#14786/#14788/#14791/#14793/#14795/#14796/#14798 等），多数指向 HostedHookFaultGatesIT 等 Managed Agent 门禁测试，多数已进入 autofix 流程。

---

## 🔧 重要 PR 进展

1. **#14739 feat(serve)：本地 daemon 发现与控制命令**（wenshao）— daemon 发布 URL/PID/工作区/日志路径，新增 `qwen daemon status/logs/stop` 命令，显著改善多 daemon 运维体验。
   [链接](https://github.com/QwenLM/qwen-code/pull/14739)

2. **#14046 feat(core)：Bun 运行时的真实 PTY 后端**（chiga0）— 使 shell 工具与 Web Terminal 获得终端输出、resize 与退出感知，替代普通子进程回退方案。
   [链接](https://github.com/QwenLM/qwen-code/pull/14046)

3. **#14281 feat(memory)：CLI 与 HTTP 的外部记忆导入任务**（callmeYe）— 从 Codex 起步的外部记忆导入服务，支持确定性预览、分段选择与后台整合。
   [链接](https://github.com/QwenLM/qwen-code/pull/14281)

4. **#14702 fix(core)：恢复过程中保留压缩上下文** — 将恢复的压缩上下文视为结构化前缀而非未完成输入，修复 `/compress` 后多余的 Continue 提示。
   [链接](https://github.com/QwenLM/qwen-code/pull/14702)

5. **#14733 test(managed-agent)：击穿审批结果提交屏障**（wenshao）— 为 G3 审批门禁新增第五个故障注入分支，验证崩溃恢复后精确重发请求。
   [链接](https://github.com/QwenLM/qwen-code/pull/14733)

6. **#14801/#14611/#14808 fix(ci)：sdk-java 锁预算系列调整** — 将锁等待预算从 40/60 分钟提升至 90/120 分钟，并同步调整任务上限，直接响应 #14743。
   [#14801](https://github.com/QwenLM/qwen-code/pull/14801) · [#14611](https://github.com/QwenLM/qwen-code/pull/14611) · [#14808](https://github.com/QwenLM/qwen-code/pull/14808)

7. **#13969 feat(hooks)：本地会话的 FileChanged 通知** — hooks 可注册文件或递归目录监听，补齐本地（非托管）会话的文件变更事件能力。
   [链接](https://github.com/QwenLM/qwen-code/pull/13969)

8. **#14297 feat(web-shell)：按组删除会话历史消息** — 支持选择 prompt 及完整回复组、非连续多组删除的批量管理能力。
   [链接](https://github.com/QwenLM/qwen-code/pull/14297)

9. **#14129 feat(core)：跳过重复注入相同的 UserPromptSubmit hook 上下文** — hook 返回字节级相同上下文时不再重复追加，节省上下文窗口。
   [链接](https://github.com/QwenLM/qwen-code/pull/14129)

10. **#14172 feat(cli)：Linux 下 Ctrl+V 粘贴剪贴板文本** — 补齐 TUI 中文本剪贴板读取的长期空缺（此前仅支持图片路径）。
    [链接](https://github.com/QwenLM/qwen-code/pull/14172)

---

## 📈 功能需求趋势

- **可观测性 / 遥测深化**：TTFT 与 tokens/s 展示（#14722）、reasoning effort span 属性（#14508）、工具结果尺寸遥测补全（#14742）——社区对 LLM 调用级精细度指标需求强烈
- **Web Shell 交互打磨**：Split View 会话添加（#14775）、消息组删除（#14297）、表格控件优化（#14707）、slash 命令高亮（#14161）——UI 打磨类需求密集
- **Managed Agent / 会话管理路线图**：D7 系列 durable 操作（#14166）、daemon 控制命令（#14739）、审批屏障故障测试（#14733）——工程主投入方向
- **本地模型 / 自定义 Provider**：Rapid-MLX 文档示例（#13934）、外部记忆导入（#14281）
- **Hooks 体系扩展**：FileChanged 通知（#13969）、hook 上下文去重（#14129）、updatedInput 集成测试纳入 PR 检查（#14747）

---

## ⚠️ 开发者关注点

1. **CI 基础设施是当前最大痛点**：单主机文件锁序列化导致的任务饿死（#14743）、十余条 Main CI 失败 Issue、macOS 构建依赖安装失败（#14796）、Desktop 打包失败（#14793）——主干稳定性承压明显
2. **安全默认值待收紧**：#14746 的 hooks 免审批执行暴露 folder trust 默认关闭的风险，建议用户在官方修复前手动启用 `security.folderTrust.enabled`
3. **Windows 体验仍有短板**：CLI 无输出闪退（#13076）、Desktop 启动闪屏（#14755）
4. **Flaky 测试治理**：高负载 CI 主机上的时序敏感测试反复出现（#14732、embedded-harness-scheduler 系列），需要系统性去抖动方案
5. **资源生命周期管理**：LSP 服务器不随 shutdown 退出（#14751）提示 daemon 长驻场景下的清理路径需要审计

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*