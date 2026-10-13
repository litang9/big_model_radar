# AI CLI 工具社区动态日报 2026-10-13

> 生成时间: 2026-10-13 02:00 UTC | 覆盖工具: 7 个

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
**数据日期：2026-10-13**

---

## 1. 生态全景

AI CLI 工具已从单一编码助手演化为**多 agent 编排平台 + 跨端工作流入口**的竞争格局。当前生态呈现三个明显特征：一是 **subagent/多代理架构成为所有头部工具的主战场**（Claude Code 的 Orchestrating、Codex 的 LocalBoard、Gemini CLI 的 subagent 系统、Qwen Code 的 Managed Agent）；二是 **上下文压缩（compaction）几乎成为全行业性的质量洼地**，各工具均暴露出压缩时机、数据保留和上下文上限误报问题；三是**平台工程化竞争加剧**——Windows/WSL/ARM64 兼容、沙箱安全、凭证/限流稳定性等基础设施问题占据了大量社区带宽，标志着这些工具正从早期尝鲜走向生产环境部署。

---

## 2. 各工具活跃度对比

| 工具 | 今日热点 Issues 更新 | 今日 PR 更新 | Release | 焦点议题 |
|---|---|---|---|---|
| Claude Code | ~10+ | 0（无更新） | 无 | Compaction 行为、压缩崩溃、多 agent 成本失控 |
| OpenAI Codex | ~10+ | **24 个**（多为已合并落地） | 无 | 限流/容量、线程恢复回归、Windows 修复 |
| Gemini CLI | ~10+ | **10+ 个**（P1/P2 修复密集） | v0.65.0-nightly | Subagent 可靠性、终端体验、AST 工具链 |
| GitHub Copilot CLI | 36 条更新 | 0（PR 无更新） | **v1.0.97-0 ~ -2（3 个）** | BYOK 生态、Windows Entra 认证、agent hooks |
| Kimi Code CLI | 0 | 0 | 无 | 无活动 |
| OpenCode | ~10+ | **10 个**（多已合并） | 无 | 凭证回归、Windows/ARM64 大量修复 |
| Qwen Code | ~10+ | **10 个** | v0.25.1-nightly | Managed Agent 架构、生命周期竞态 |

**要点**：Codex 是今日开发活动最密集的项目（24 PR），Copilot CLI 是发布节奏最快的项目（一日三版），Kimi Code CLI 完全静默。

---

## 3. 共同关注的功能方向

### 3.1 上下文压缩可靠性（行业性痛点）
- **Claude Code**：#98747（idle compaction 静默压缩，30 👍）、#100277（1M 窗口 27% 即触发）、#101648（压缩时 SIGILL 崩溃）
- **Codex**：#33493（图片载荷无限保留致反复压缩）、#53336（上下文 475K 骤降至 258K）
- **OpenCode**：#54972（压缩保留推理过程）、#54648（压缩保留过多原文）、#47646（上下文上限误报为 400K）

**共性诉求**：压缩时机/阈值可配置、压缩过程透明、压缩不丢关键信息。

### 3.2 Subagent 行为可信与模型路由
- **Gemini CLI**：#22323（MAX_TURNS 后假成功）、#21968（模型不主动调用 subagent）
- **Copilot CLI**：#5103/#5126（BYOK 子代理模型路由失效）
- **OpenCode**：#54876（subagent 忽略 model 配置）
- **Codex**：#14039（subagent 独立模型路由，20 👍）
- **Claude Code**：#101650（编排 agent 无视预算约束烧配额）

**共性诉求**：子代理配置必须真实生效、结果报告必须可信、预算/并发需硬性护栏。

### 3.3 Windows / 跨平台一等公民化
- **Claude Code**：#91708（OAuth 竞态）、#88561（反斜杠折叠破坏脚本）
- **Codex**：#53261（OAuth 回归）、#52645（headless 继承桌面运行时），PR 侧 WSL 剪贴板、arg0 隔离修复
- **Copilot CLI**：#5068/#5088（Entra 认证失败/崩溃）
- **OpenCode**：今日 6 个 Windows/ARM64 相关 PR 合并

### 3.4 多端会话一致性与跨设备恢复
- Claude Code（Desktop/VSCode/iOS/Chrome 扩展权限不一致）、Codex（#37403 Remote Control 恢复失败，64 评论/48 👍）、Gemini CLI、Qwen Code 均有跨端状态同步类反馈。

### 3.5 会话/数据管控与删除
Codex #24610（云端归档会话显式删除，28 👍）、OpenCode #42765（配额耗尽预警）、Copilot CLI #5114（限流恢复失效）——付费用户对配额与数据主权的敏感度显著上升。

---

## 4. 差异化定位分析

| 维度 | Claude Code | Codex | Gemini CLI | Copilot CLI | OpenCode | Qwen Code |
|---|---|---|---|---|---|---|
| **技术路线** | 闭源单 binary，模型深度绑定 Opus 5.5 | 开源 Rust，ChatGPT 订阅深度整合 | 开源 TS，nightly 快速迭代 | 闭源，GitHub/企业生态深度绑定 | 开源，多 provider 中立网关 | 开源，阿里系，TS + 数据库级工程 |
| **功能侧重** | 多端一致体验、远程控制、企业集成（Bedrock） | 多运行时协作（LocalBoard）、headless/API 优先 | 开放式架构实验（OS 沙箱、AST 工具链评估） | BYOK + 企业策略/合规 + MCP 协议 | Windows/ARM64 分发健壮性、provider 灵活性 | Managed Agent / Workflow 子运行时的系统化架构 |
| **目标用户** | Max 订阅重度用户、多端工作者 | ChatGPT 订阅用户、移动远程接续场景 | 开发者/贡献者社区、Linux 用户 | 企业 GitHub 生态用户、BYOK 用户 | 多模型混用、自托管偏好者 | 中文生态、Desktop/Web Shell 用户 |
| **突出短板** | 压缩不可控、safeguards 误报、stale 关闭社区不满 | 限流持续两月未解、active-writer 并发模型系统性缺陷 | subagent 结果不可信、配置覆盖不生效 | Windows 认证、BYOK 错误信息误导 | v2.0.27 凭证回归、权限语义不一致 | 生命周期竞态密集、治理中立性争议（#14004） |

**关键差异点**：Codex 走“协议与并发架构”路线（LocalBoard、线程权限恢复），Qwen Code 走“重型工程化”路线（数据库迁移、租约管理），Gemini CLI 走“社区共创实验”路线（Epic 讨论、welcome-pr），三者代表了多 agent 时代三种截然不同的架构哲学。

---

## 5. 社区热度与成熟度

- **最活跃 / 声量最高**：**Codex**（单 Issue 64 评论、48 👍）与 **Claude Code**（#98747 30 👍）——用户基数最大，但热点 Issue 多为长期未解的存量问题，反映“成熟但债重”。
- **迭代最快**：**Gemini CLI** 与 **Qwen Code**——nightly 发布 + 每日 10+ PR，处于快速演进期；Gemini CLI 以修复为主，Qwen Code 以架构推进为主（H4 阶段、Workflow 子运行时）。
- **发布节奏最密**：**Copilot CLI**（一日三版，agent hooks 等新功能快速落地），但社区反馈集中在 BYOK 等新兴场景，Issue 质量高（如 #5127 当日高质量报告）。
- **工程补课期**：**OpenCode**——v2.0.27 凭证回归引发信任波动（#54833，18 评论），但 PR 侧 Windows/ARM64 修复效率高。
- **静默**：**Kimi Code CLI** 连续无活动，需观察是否为发布间歇。

---

## 6. 值得关注的趋势信号

1. **Compaction 是下一个竞争壁垒**：三家头部工具同时暴露压缩问题，说明“如何在 1M token 窗口下做可控、透明、可配置的压缩”尚未有成熟方案。谁先给出压缩策略的用户控制权（Claude Code 社区最强烈诉求），谁就能锁定长会话重度用户。

2. **多 agent 从功能竞赛转向“契约与治理”竞赛**：Codex 的 LocalBoard、Qwen Code 的 Multi-Agent API 身份契约（#13785）、Gemini CLI 的成员间通信不消耗 lead turn（PR #13955），都在解决“多 agent 可归因、可中断、可预算”的问题。同时 Claude Code #101650 的配额烧毁案例预警：**无硬性护栏的编排能力是生产环境的负债**。

3. **BYOK 与 provider 中立性成为分化点**：Copilot CLI 和 OpenCode 的 BYOK 问题集中爆发，Qwen Code 甚至出现“利益冲突”治理讨论（#14004）——随着用户对模型路由自由度要求提升，“既卖 token 又造 harness”的中立性质疑会成为行业话题。

4. **Windows 是留存率分水岭**：六个工具中五个今日有 Windows 专属问题，OpenCode 和 Codex 已系统性投入。对开发者的启示：**Windows/WSL/ARM64 兼容性应从“nice to have”升级为发布门禁**（参考 OpenCode PR #54982 的 CI 架构校验）。

5. **信任与安全语义需要显式化**：OpenCode 内置权限规则不生效（#54524）、Claude Code safeguards 误报、Gemini CLI 破坏性命令防护（#22672）——权限/安全行为的不一致或不透明正成为企业采用的隐性门槛。

6. **给选型者的即时建议**：长会话重度用户暂押注任何单一工具的压缩能力，建议关注各家的压缩可配置性进展；v2.0.27 的 OpenCode 用户建议观望 #54023 合并；重度 Windows 用户短期看 Copilot CLI 和 OpenCode 的修复节奏。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-10-13）

## 一、热门 Skills 排行（基于 PR 活跃度与关联 Issue 讨论）

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** — [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 Header 机制；关联 Issue [#1390](https://github.com/anthropics/skills/issues/1390)（evaluation.py 对真实 MCP 服务器评分恒为 0），是 MCP 生态兼容性焦点 | OPEN |
| 2 | **skill-creator 触发评估隔离修复** — [#1298](https://github.com/anthropics/skills/pull/1298) | 修复并发 worker 误报触发率（关联 [#1352](https://github.com/anthropics/skills/issues/1352)）、Windows select() 失败等 6 项问题，是 Issue 区讨论最密集的 Skill | OPEN |
| 3 | **skill-creator eval viewer 安全加固** — [#1961](https://github.com/anthropics/skills/pull/1961) | 修复 XSS 脚本逃逸、DNS rebinding、跨站 POST（关联 [#1394](https://github.com/anthropics/skills/issues/1394)），安全社区持续关注 | OPEN |
| 4 | **skill-creator 打包脚本修复** — [#1681](https://github.com/anthropics/skills/pull/1681) | 修复 `package_skill.py` 直接执行的 ModuleNotFoundError，Kuldeeep18 维护活跃（10-08 仍更新） | OPEN |
| 5 | **md2video-audio** — [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown → Marp 幻灯片 → MP4 视频 + 真人感配音，零成本内容创作方向代表 | OPEN |
| 6 | **docx 修复两连** — [#1792](https://github.com/anthropics/skills/pull/1792)、[#1734](https://github.com/anthropics/skills/pull/1734) | LibreOffice 超时误报成功、孤立批注检测；文档处理是稳定需求场景 | OPEN |
| 7 | **AWT (AI Watch Tester)** — [#822](https://github.com/anthropics/skills/pull/822) | 视觉 + 浏览器控制的零代码 E2E 测试，3 月提交至今仍活跃讨论 | OPEN |
| 8 | **document-typography** — [#514](https://github.com/anthropics/skills/pull/514) | AI 生成文档的排版质量控制（孤行、寡段、编号对齐），切中普遍痛点 | OPEN |

## 二、社区需求趋势（从 Issues 提炼）

1. **安全与信任机制**（最强信号）：[#492](https://github.com/anthropics/skills/issues/492)（46 条评论）——社区 Skill 冒用 `anthropic/` 命名空间构成信任边界漏洞；连带 XSS、命令注入（[#1980](https://github.com/anthropics/skills/pull/1980)）等安全 PR 密集出现
2. **组织级分享与分发**：[#228](https://github.com/anthropics/skills/issues/228)（16 条评论）要求组织内 Skill 库、直接分享链接，替代手工上传 .skill 文件
3. **Skill 质量评估工具链**：skill-creator 的 eval/benchmark 可靠性是最高频痛点（[#556](https://github.com/anthropics/skills/issues/556)、[#1383](https://github.com/anthropics/skills/issues/1383)、[#1352](https://github.com/anthropics/skills/issues/1352)）
4. **上下文窗口效率**：[#1487](https://github.com/anthropics/skills/issues/1487) —— claude-api skill 一次性注入 ~156k token 耗尽上下文；配套需求如 compact-memory（[#1329](https://github.com/anthropics/skills/issues/1329)）
5. **AI 治理与推理质量**：agent-governance（[#412](https://github.com/anthropics/skills/issues/412)）、推理质量门禁流水线（[#1385](https://github.com/anthropics/skills/issues/1385)）
6. **文档格式覆盖扩展**：ODT 支持（[#486](https://github.com/anthropics/skills/pull/486)）、SharePoint Online 安全处理（[#1175](https://github.com/anthropics/skills/issues/1175)）

## 三、高潜力待合并 Skills

- **[#1742](https://github.com/anthropics/skills/pull/1742)** mcp-builder 兼容修复 —— 修复确定性高，阻塞 MCP 2.x 用户，合并优先级最高
- **[#1298](https://github.com/anthropics/skills/pull/1298)** 触发评估隔离 —— 对应多个已确认 Issue，社区验证充分
- **[#1792](https://github.com/anthropics/skills/pull/1792)** docx 超时校验 —— 小而准的官方 Skill 修复，落地快
- **[#538](https://github.com/anthropics/skills/pull/538)** pdf 大小写引用修复 —— 8 处确定性修复，典型 easy-merge
- **[#486](https://github.com/anthropics/skills/pull/486)** ODT Skill —— 填补官方文档格式空白，需求明确

## 四、生态洞察

> **社区最集中的诉求是：为 Skills 建立可信、可测、轻量的工程基础**——包括命名空间安全隔离、可靠的触发/质量评估工具链、以及控制 Skill 注入对上下文窗口的消耗；功能性新 Skill（测试、视频、HPC）虽多，但生态瓶颈在基础设施而非数量。

---

# Claude Code 社区动态日报 · 2026-10-13

## 1. 今日速览

过去 24 小时无新版本发布，社区焦点集中在 **上下文压缩（Compaction）行为** 上：#98747 已关闭（22 条评论、30 👍），讨论热度最高，另有 #100277 反映 Opus 5.5 1M 窗口下 auto-compact 过早触发，以及 #101648 报告压缩过程中出现 JSC JIT SIGILL 崩溃。Desktop/多端一致性（权限、会话管理、插件弹窗）仍是高频痛点区域。

## 2. 版本发布

无新 Release。

## 3. 社区热点 Issues

1. **[#98747](https://github.com/anthropics/claude-code/issues/98747)** [已关闭] 2.1.286 起 idle compaction 在 prompt cache 过期前静默压缩长会话上下文，无退出选项且记录为 "manual"。22 评论 / 30 👍，是本周讨论最热烈的 issue，关闭结果值得确认是否已修复或仅标记。
2. **[#91495](https://github.com/anthropics/claude-code/issues/91495)** Desktop 内置浏览器忽略 "Allow all websites" 站点权限设置。19 评论 / 23 👍，长期未修复的权限类高赞 bug。
3. **[#88561](https://github.com/anthropics/claude-code/issues/88561)** Bash 工具在 shell 解析前将 `\\` 折叠为 `\`，破坏正则和路径，违反 POSIX 单引号语义。有复现，Windows 平台脚本工作流的核心正确性问题。
4. **[#91708](https://github.com/anthropics/claude-code/issues/91708)** Windows/VSCode 多会话并发 OAuth 刷新竞态导致 400 强制重新登录。文件凭证存储缺乏锁机制的典型问题。
5. **[#68083](https://github.com/anthropics/claude-code/issues/68083)** Desktop "Auto-fix CI" 全局开关对本地 `gh` 创建的 PR 不生效且不持久化到配置文件。
6. **[#96118](https://github.com/anthropics/claude-code/issues/96118)** Opus 5.5 safeguards 以 `reasoning_extraction` 误报拦截正常消息，与 #88301、#88454 同属误报类问题（后两者已 stale 关闭，社区或对此处理方式不满）。
7. **[#100277](https://github.com/anthropics/claude-code/issues/100277)** Opus 5.5 1M 上下文在 ~275K tokens（约 27%）即触发 auto-compact，远早于预期，与 #98747 共同指向压缩策略问题。
8. **[#101648](https://github.com/anthropics/claude-code/issues/101648)** Linux x64 上 2.1.296 / Bun 1.4.3 在 "Compacting conversation…" 时主线程 SIGILL 崩溃，运行时级严重问题，且与已知 #91914 崩溃签名不同。
9. **[#101650](https://github.com/anthropics/claude-code/issues/101650)** Orchestrating 会话无视项目并发限制、超时后自我重试 2 小时，烧掉约 12% 周 Max 配额且无一合并。多 agent 编排的成本失控典型案例。
10. **[#101654](https://github.com/anthropics/claude-code/issues/101654)** Chrome 扩展权限弹窗在已批准会话内反复触发、无视 permission mode。今日新报。

## 4. 重要 PR 进展

过去 24 小时无 PR 更新，本节省略。

## 5. 功能需求趋势

- **上下文/压缩控制**：idle compaction 退出选项、auto-compact 阈值可配置是当前最强烈诉求（#98747、#100277）。
- **会话生命周期与多端同步**：会话归档跨客户端同步（#88476）、跨组织切换不丢会话（#94507）、扩展宿主重启后重连（#94743）、无点击新会话交接（#100913）。
- **Remote Control / 移动端体验**：iOS effort picker 状态同步（#99489）、"Send now" 不杀后台 agent（#97705）。
- **沙箱与扩展性**：Mods API 允许 hook 动态添加文件 deny 规则（#101377），生态开发者需要更细粒度的沙箱控制。
- **企业/云集成**：Bedrock STS role session name 定制（#84504，已关闭）、私有项目定时 Routine 可靠性（#99527）。

## 6. 开发者关注点

1. **上下文管理不透明、不可控**——压缩时机、阈值、开关均无用户控制，且压缩路径本身存在崩溃（#101648）和过早触发（#100277）问题，是当前最集中的痛点。
2. **多 agent 编排成本失控**——agent 不遵守并发/预算约束、失败后自我重试导致配额烧毁（#101650），需要硬性的护栏机制而非仅靠 prompt 指令。
3. **Windows 平台质量**——OAuth 竞态、路径反斜杠损坏、`.claude.json` 大小写重复键致 MCP 静默丢失（#90438）等多个长期未决问题。
4. **跨客户端状态一致性**——Desktop / VSCode / iOS / Chrome 扩展对权限、归档、effort 设置的理解不一致，多端工作流摩擦成本高。
5. **Safeguards 误报**——`reasoning_extraction` 类误拦截反复出现，相关 issue 多被 stale 关闭，社区对处理方式存在不满情绪。

---
*数据来源：github.com/anthropics/claude-code · 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-13

## 一、今日速览

今日无新版本发布，但开发活动高度活跃，过去 24 小时内更新了 24 个 PR，集中在多线程权限恢复、流错误处理和跨平台（WSL/Windows）修复。社区侧最大痛点仍是 **#37403 "already has an active writer" 回归**（64 条评论、48 👍，持续两月未解），同时多个 "model at capacity" 限流类 Issue 于今日关闭，或暗示服务端容量问题已缓解。新报告的 **GPT-6.1 Sol 上下文从 475K 骤降至 258K**（#53336）值得持续关注。

---

## 二、版本发布

过去 24 小时无新 Release。

---

## 三、社区热点 Issues

1. **[#37403](https://github.com/openai/codex/issues/37403)** — macOS 桌面端无法恢复 Remote Control / CLI 线程（`already has an active writer`）。8 月更新引入的回归，破坏了“手机远程接续 Mac 线程”的核心工作流，64 评论 / 48 👍，是当前社区声量最高的 Issue。

2. **[#33493](https://github.com/openai/codex/issues/33493)** — Local compaction v2 无限保留 `input_image` 载荷，导致图片密集型会话反复触发自动压缩。上下文管理类长期 Bug 的代表。

3. **[#24610](https://github.com/openai/codex/issues/24610)** — 请求为云端归档会话提供显式删除功能（28 👍）。涉及隐私与数据保留，是热度最高的功能请求之一。

4. **[#14039](https://github.com/openai/codex/issues/14039)** — 允许 subagent 独立选择模型/Provider/Profile（20 👍，已关闭）。多代理架构下精细化模型路由的核心诉求。

5. **[#46172](https://github.com/openai/codex/issues/46172)** / **[#46980](https://github.com/openai/codex/issues/46980)** — "Selected model is at capacity" 限流错误。前者已关闭；后者为 Pro 20x 用户持续 30+ 小时遭遇，限流问题仍是付费用户高频痛点。

6. **[#53336](https://github.com/openai/codex/issues/53336)** — 新报告：GPT-6.1 Sol 上下文窗口在轮次间从 475K 掉到 258.4K，自动压缩阈值同步回退。可能影响长会话用户的实际可用上下文。

7. **[#25015](https://github.com/openai/codex/issues/25015)** — app-server 为 subagent 泄漏 MCP 进程栈，Linux 下内存线性增长。长时运行稳定性问题，已列入 Papercuts 计划。

8. **[#52839](https://github.com/openai/codex/issues/52839)** — Windows + ChatGPT 认证下，模型目录缺失 Sol Ultrafast。模型目录一致性问题的信号。

9. **[#52645](https://github.com/openai/codex/issues/52645)** — Windows 上 headless `codex exec` 继承桌面端 computer-use 运行时（MCP + notify hook），空闲 helper 反复重生，并行负载下机器不可用。跨产品边界的状态污染，工程细节值得留意。

10. **[#53261](https://github.com/openai/codex/issues/53261)** — 10 月 10 日更新后 Windows 桌面端 OAuth 登录失败 + workspace 路由超时。近期更新引入的连通性回归。

---

## 四、重要 PR 进展

> 注：今日更新 PR 均由 @copyberry[bot] 提交，且已关闭（多为合并落地）。

1. **[#53419](https://github.com/openai/codex/pull/53419)** + **[#53424](https://github.com/openai/codex/pull/53424)** — 配置加载时恢复已保存的线程权限，并为冷恢复线程的网络授权添加回归测试。直接回应 #52251（full-access 线程被降级）类问题。

2. **[#53451](https://github.com/openai/codex/pull/53451)** — 将不完整响应（如 `max_output_tokens`）归类为终态错误，禁止超限后重试/压缩回退，避免无效循环。

3. **[#53452](https://github.com/openai/codex/pull/53452)** — 回合收尾时关闭输入准入，修复消息队列错序问题（与 #48516 直接相关）。

4. **[#53453](https://github.com/openai/codex/pull/53453)** — WSL 下优先使用 Windows 剪贴板并限制复制尝试次数，修复 WSLg 剪贴板阻塞 TUI 的问题。

5. **[#53436](https://github.com/openai/codex/pull/53436)** — TUI 请求回复按来源连接/线程路由，防止会话切换后请求 ID 复用导致的错配。

6. **[#53406](https://github.com/openai/codex/pull/53506)** — 网络代理拒绝重复 Host 头（返回 400），消除策略评估与上游解析器选择不同 Host 的安全隐患。

7. **[#53429](https://github.com/openai/codex/pull/53429)** — 配置开关即时生效（无需重启）并改进设置搜索/导航，体验优化。

8. **[#53412](https://github.com/openai/codex/pull/53412)** — 按 OS 隔离 arg0 helper 目录，修复 Windows/WSL 共享 `CODEX_HOME` 时跨平台清理误删 live helper 的问题。

9. **[#53400](https://github.com/openai/codex/pull/53400)** — 新增 `LocalBoard` 显式本地消息板连接机制，支持独立 Codex 运行时共享 board 并分配差异化权限——多运行时协作架构的基础设施。

10. **[#53438](https://github.com/openai/codex/pull/53438)** / **[#53440](https://github.com/openai/codex/pull/53440)** — 移除不可靠的 Apple Terminal 检测启发式；保留 16 色终端下状态条色彩。终端兼容性持续打磨。

---

## 五、功能需求趋势

- **会话/数据管控**：云端归档会话删除（#24610，28 👍）反映隐私与数据保留诉求上升。
- **多代理架构**：subagent 独立模型路由（#14039，20 👍）、MCP 进程生命周期管理（#25015）。
- **性能与缓存**：app-server 稳定 prompt-cache key 支持（#21796，14 👍），编排器用户对成本敏感。
- **跨设备/远程工作流**：Remote Control 恢复、移动端可见性、Dots 委托任务连接稳定性（#37403、#53519）。
- **Windows 平台体验**：过去 24 小时新 Issue 中 `windows-os` 标签占比显著，OAuth、浏览器工具、Computer Use 提权等问题集中。

---

## 六、开发者关注点

1. **限流与容量**："at capacity" 类 Issue 高频出现，覆盖 Plus 到 Pro 20x 各档位，即使付费高价仍遭遇持续不可用。
2. **上下文管理回归**：压缩（compaction）相关 Issue 数量多——旧指令复活（#42695）、图片载荷膨胀（#33493）、上下文窗口缩水（#53336），长会话可靠性是核心痛点。
3. **状态一致性**：active-writer 冲突已出现在至少 3 个 Issue（#37403、#53497），多客户端接入同一会话的并发模型存在系统性问题。
4. **运行时边界污染**：headless CLI 继承桌面端运行时（#52645）、Dots 任务无法访问本地 MCP（#53136），产品形态融合过程中的隔离性不足。
5. **Windows 一等公民化**：从 OAuth 到剪贴板、MSVC 构建链，官方 PR 也显示对 Windows/WSL 投入明显加大。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-10-13

## 📌 今日速览

今日发布 nightly 版本 **v0.65.0**，主要修复扩展加载健壮性问题。社区最活跃的讨论集中在 **Agent/Subagent 子系统**——大量 P1 级 bug（subagent 假成功、通用 agent 挂起）持续被重新验证。PR 侧出现多个高优先级修复，包括快速 Ctrl-C 导致的会话污染、tmux 闪烁、rootless Podman 沙箱兼容等。

---

## 🚀 版本发布

### v0.65.0-nightly.20261013
- **fix(cli)**: 当某个扩展在 allowlist 检查中失败时，继续加载其他扩展（此前一个坏扩展会导致全部扩展加载失败）— [PR #29720](https://github.com/google-gemini/gemini-cli/pull/29720)

---

## 🔥 社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — Subagent 触发 MAX_TURNS 后仍报告 "GOAL success"，掩盖了中断事实（P1）。这直接影响任务结果可信度，13 条评论，处于待复测状态。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — 通用 agent（generalist）无限挂起，连建文件夹都会卡死一小时（P1，👍 8）。用户只能手动禁止 subagent 规避，8 条评论。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — 利用 Gemini 3 原生 bash 能力，通过零依赖 OS 沙箱 + 执行后意图路由（P2，large effort）。方向性架构提案，讨论热烈（9 条评论）。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — AST 感知的文件读取/搜索/代码库映射 Epic，配套 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)（tilth/glyph）与 [#22747](https://github.com/google-gemini/gemini-cli/issues/22747)（ast-grep）。团队在系统性评估 AST 工具对 agent 质量的提升。

5. **[#21968](https://github.com/google-gemni/gemini-cli/issues/21968)** — 模型几乎不主动使用自定义 skills 和 subagents，只有显式指令才触发。反映调度/路由层的能力短板。([链接](https://github.com/google-gemini/gemini-cli/issues/21968))

6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** — Browser Agent 完全忽略 settings.json 中的 maxTurns 等覆盖配置；AgentRegistry 读取了但未生效，配置链路存在断层。

7. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — browser subagent 在 Wayland 下失败（P1），Linux 桌面用户受影响。

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — 工具数量超过 128 时触发 API 400 错误，agent 未智能裁剪工具作用域。

9. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)** — Agent 应阻止/劝阻破坏性行为（git reset --force、DB 操作等），安全侧的客户诉求。

10. **[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)** — "Tactful Extraction"：当前上下文基线约 36.6k tokens/轮，大文件读取造成上下文膨胀，提议建立分级外科手术式代码发现流程。

---

## 🔧 重要 PR 进展

1. **[#29728](https://github.com/google-gemini/gemini-cli/pull/29728)**（P1）— 修复快速双击 Ctrl-C 时的会话污染竞态：首次中断未等待完成即退出，导致会话状态损坏。

2. **[#29725](https://github.com/google-gemini/gemini-cli/pull/29725)**（P2, XL）— 实现终端同步输出（Synchronized Output）+ 隔离 spinner 渲染状态，消除 tmux 等复用器中的闪烁。

3. **[#29644](https://github.com/google-gemini/gemini-cli/pull/29644)**（P1）— 恢复终端宽度变化时的防抖静态 UI 刷新，修复横向 resize 时界面渲染异常。

4. **[#29611](https://github.com/google-gemini/gemini-cli/pull/29611)**（P2）— 支持带点号的 Gemini 3 模型（如 gemini-3.8-flash）及别名的多模态函数响应，修复图片工具输出触发 400 的问题。

5. **[#29718](https://github.com/google-gemini/gemini-cli/pull/29718)**（P2）— rootless Podman 沙箱追加 `--userns=keep-id`，修复 EACCES 错误。

6. **[#29726](https://github.com/google-gemini/gemini-cli/pull/29726)**— 修复 POSIX 下命令被误识别为 `trap` 导致 sandbox.toml 逐命令规则永不生效的问题。

7. **[#29695](https://github.com/google-gemini/gemini-cli/pull/29695)**（P2）— 修复 Debug Console（F12）高度计算及 terminalBuffer 模式闪烁，引入增量渲染与历史项 memoization。

8. **[#29727](https://github.com/google-gemini/gemini-cli/pull/29727)**— `list_directory` 不再静默隐藏被路径校验拒绝的条目，显式报告给模型和用户。

9. **[#29722](https://github.com/google-gemini/gemini-cli/pull/29722)**— 修复 UTF-16/UTF-32 纯空白文件被误判为非空的问题（NUL 字符未被 trim）。

10. **[#29719](https://github.com/google-gemini/gemini-cli/pull/29719)**— 安全机制优化：构建文件确认后重置跟踪状态，避免反复警告；文件名去重。

> 其他：[#29568](https://github.com/google-gemini/gemini-cli/pull/29568)（ChatRecordingService 增量 delta 补丁 + 有界历史窗口）已关闭；[#29678](https://github.com/google-gemini/gemini-cli/pull/29678)（.env 先于 settings 占位符加载的竞态）已关闭。

---

## 📈 功能需求趋势

- **Agent/Subagent 可靠性**（最大热点）：假成功报告、挂起、不主动调用、轨迹不可见（#22598）、`/bug` 缺少子代理上下文（#21763）。
- **AST 感知工具链**：团队系统性评估 tilth / glyph / ast-grep 用于精准读取与代码库映射（#22745 系列）。
- **上下文效率**：Token 节约型读取（#19561）、文件化持久任务追踪替代 in-context todo（#18836、#21000）。
- **沙箱与安全**：零依赖 OS 沙箱（#19873）、破坏性命令防护（#22672）、工作区级权限策略（#18397）。
- **多 agent 协作**：并行 subagent、共享内存协作（#18287）目前被阻塞待基础设施。

---

## ⚠️ 开发者关注点

1. **子代理结果不可信**是最高频痛点：MAX_TURNS 假成功（#22323）+ 挂起（#21409）组合使 subagent 在生产流程中风险较高。
2. **配置覆盖不生效**：settings.json 的 maxTurns 等被 Browser Agent 忽略（#22267），且 symlink 的 agent 定义不被识别（#20079）。
3. **工具数量上限**：>128 工具直接 400（#24246），重度扩展用户撞墙。
4. **工作区卫生**：模型在随机目录创建临时脚本（#23571），清理成本高。
5. **终端体验**：resize 闪烁/性能问题持续修复中（#21924、#29695、#29725），tmux 用户可期待近期改善。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-13 | 数据来源：github.com/github/copilot-cli**

---

## 📰 今日速览

过去 24 小时内 Copilot CLI 密集发布了 v1.0.97 系列三个补丁版本（v1.0.97-0 至 v1.0.97-2），核心亮点是新增 **agent-scoped 声明式 hooks** 和 **内联图片默认渲染**。社区侧，过去 24 小时共更新了 36 条 Issue，焦点集中在 BYOK 自定义模型/子代理行为、Windows MCP Entra 认证问题，以及 agent 发现机制的修复反馈。

---

## 🚀 版本发布

### v1.0.97-2（最新补丁）
**Fixed**
- 修复自定义 agent 发现问题：即使仓库定义超过 100 个 agent 或 agent 文件深层嵌套，也能全部被发现。

### v1.0.97-1
- 修复与变更（未附详细说明）。

### v1.0.97-0
**Added**
- 为自定义 agent 新增 agent-scoped 声明式 hooks。

**Improved**
- 内联图片在支持的终端上默认渲染，无需开启实验模式；可用 `/settings inlineImages false` 关闭。

**Fixed**
- 修复 Autopilot 错误拒绝 preToolUse hook 的 "ask" 决策的问题。

### v1.0.96（2026-10-12）
- 交互式沙箱设置会建议可能的环境密钥，并允许在保存前添加掩码主机。
- `/model` 和 `/config` 中的模型 ID 不区分大小写，并保存规范化 ID。
- 企业策略解析期间保持 `/allow-all` 可用。

---

## 🔥 社区热点 Issues

1. **[#970](https://github.com/github/copilot-cli/issues/970)** — macOS Gatekeeper 拦截 Copilot 应用（👍 22，评论 8）
   长期存在的老问题：每次通过 Homebrew 升级后都被 Apple 安全策略拦截，企业用户需手动放行。累计 22 个 👍，是关注度最高的安装类痛点。

2. **[#5068](https://github.com/github/copilot-cli/issues/5068)** — Windows MCP Entra 登录失败："server's advertised scopes could not be safely validated"（👍 12）
   连接 Entra ID 保护的 MCP 服务器（如 Azure DevOps）时认证持续失败，企业 Windows 用户影响较大。

3. **[#5088](https://github.com/github/copilot-cli/issues/5088)** — Windows CLI 首次 Entra account-broker 登录时崩溃（msalruntime.dll 0xc0000005）
   硬崩溃级 bug，根因疑似 WAM 被无父窗口调用，与 #5068 共同构成 Windows MCP 认证的双重痛点。

4. **[#5127](https://github.com/github/copilot-cli/issues/5127)** — SDK BYOK 模式下短模型名无法匹配 provider 模型，并报出误导性的 "No GitHub OAuth token" 错误
   BYOK 用户 @SivaKesava1 今天提交的高质量报告，错误信息严重误导排障方向。

5. **[#5103](https://github.com/github/copilot-cli/issues/5103)** — BYOK 子代理强制使用会话级 wire API，跨模型家族的子代理返回 400
   与 #5127 同属 BYOK 生态问题：`COPILOT_PROVIDER_WIRE_API` 全局生效导致跨家族模型调用失败。

6. **[#5126](https://github.com/github/copilot-cli/issues/5126)** — BYOK 下内置代理（explore/task/research）从不使用其默认模型，静默跑在会话模型上
   静默行为偏离，影响成本与效果预期，值得关注后续修复。

7. **[#5100](https://github.com/github/copilot-cli/issues/5100)** — 一次 120s host-ack 超时后，会话事件投递永久失败
   长会话中单次超时导致会话不可用直到 resume，稳定性问题对重度用户影响明显。

8. **[#5105](https://github.com/github/copilot-cli/issues/5105)** — macOS 沙箱阻止 Gradle daemon 本地连接（即使已放行本地网络）
   沙箱网络策略与 JVM 生态（Gradle daemon 监听 localhost）冲突，Java 开发者工作流受阻。

9. **[#5124](https://github.com/github/copilot-cli/issues/5124)** — `--agent <name>` 选择在启动约 1 秒后被静默丢弃（与登录/MCP 重载存在竞态）
   命令行指定自定义 agent 的核心用法直接失效，疑似与 v1.0.97 的 agent 发现改动相关。

10. **[#5114](https://github.com/github/copilot-cli/issues/5114)** — 达到会话限制并等待 5 小时后，输入 "continue" 无法从中断处继续
    限流恢复机制失效，且 429 cap 残留提示仍在影响输出。

> 值得注意的已关闭项：#4960（企业自定义模型可选问题）、#5030（ACP 模式 task 工具无法启动自定义 agent）、#4834（MCP 2026-07-28 多轮请求支持）、#3052（`--add-github-mcp-tool` 只读端点问题）均在昨日关闭，与 v1.0.97 修复内容相呼应。

---

## 🔀 重要 PR 进展

过去 24 小时内无更新的 Pull Requests。

---

## 📈 功能需求趋势

1. **BYOK / 自定义模型生态**：多个新 Issue（#5127、#5126、#5103）集中暴露 BYOK 模式下模型解析、子代理 wire API、内置代理模型选择的问题，说明 BYOK 用户基数增长迅速，成为最活跃的反馈来源。
2. **自定义 Agent 与 Hooks 扩展**：v1.0.97-0 新增 agent-scoped 声明式 hooks、v1.0.97-2 修复大规模 agent 发现，社区也随之报告 agent 相关竞态问题（#5124），可扩展性是当前迭代主线。
3. **MCP 认证与协议兼容**：Windows Entra 认证（#5068、#5088）、OAuth issuer 校验（#5082）、协议版本 2026-07-28 兼容（#4834，已关闭）持续占据讨论区。
4. **企业策略与合规**：Gatekeeper 拦截（#970）、企业托管策略无法刷新（#5109）、企业策略解析期的 `/allow-all`（v1.0.96）表明企业环境适配仍是重点。

---

## ⚠️ 开发者关注点

- **Windows 体验短板**：MCP Entra 认证失败、进程崩溃、插件卸载 Access Denied（#5119）等多个 Windows 专属问题集中出现，Windows 用户摩擦明显。
- **沙箱可用性**：macOS 沙箱对 Gradle 等 daemon 型工具链的兼容问题（#5105）提示沙箱网络策略需要更精细的控制。
- **稳定性与长会话**：会话事件投递永久失败（#5100）、限流后无法继续（#5114）、崩溃后终端模式未恢复（#5120）反映长会话可靠性仍需打磨。
- **错误信息可观测性**：BYOK 场景的误导性报错（#5127）与社区对 prompt 耗时追踪的需求（#5125）表明开发者希望有更好的调试与性能洞察工具。

---

*本报告基于 2026-10-13 抓取的 GitHub 公开数据自动生成。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-10-13

## 📰 今日速览

今日无新版本发布，但社区活跃度居高不下。**v2.0.27 的凭证/网关问题持续发酵**：#54833（全模型 "Invalid credential"）以 18 条评论成为最热 Issue，OpenAI 上游 503 问题也在 #54664 中被重新追踪。PR 方面，@Hona 密集提交了一批 Windows/ARM64 架构相关修复并已合入多个，Windows 生态质量明显改善。

---

## 🔥 社区热点 Issues

**1. [#54833](https://github.com/anomalyco/opencode/issues/54833) — 全模型报 "Invalid credential"（已复现，severity:high）**
v2.0.27 启动会话即失败，18 条评论、13 👍，是当前影响面最广的回归。已标记复现，与凭证刷新逻辑相关（见下文 PR #54023）。

**2. [#54664](https://github.com/anomalyco/opencode/issues/54664) — OpenAI 网关对 >1 MiB 未压缩请求体返回 503**
#52269 被关闭后问题未解决，社区已完成诊断并重新立案。根因清晰，等待官方修复，属高优先级基础设施问题。

**3. [#47646](https://github.com/anomalyco/opencode/issues/47646) — ChatGPT OAuth 将长上下文模型上下文上限误写为 400k**
实际目录约 1.05M tokens，TUI 严重低估可用上下文，影响长上下文工作流。

**4. [#54950](https://github.com/anomalyco/opencode/issues/54950)（已关闭）— ChatGPT token sharing 401 INVALID_API_KEY**
同一 access token 在 OpenCode 外可用，指向客户端认证处理缺陷，已随修复关闭，可与 #54833 对照参考。

**5. [#51340](https://github.com/anomalyco/opencode/issues/51340) — serve 进程 RSS 随使用增长且不回落**
7 小时内从 161 MB 涨至 ~1 GB，疑似内存泄漏，长驻服务场景的核心隐患。

**6. [#47545](https://github.com/anomalyco/opencode/issues/47545) — Auto 模式重复误发权限通知**
自动批准在客户端进行，但服务端已先发出 permission 事件，导致终端被无意义通知刷屏。

**7. [#54524](https://github.com/anomalyco/opencode/issues/54524) — 内置 external_directory ask 规则不生效**
默认权限下写入 session 外路径（如 /tmp）无任何弹窗，而显式配置相同规则则正常——**权限安全相关，值得警惕**。

**8. [#54876](https://github.com/anomalyco/opencode/issues/54876) — 内置 subagent 忽略 agents.<id>.model 配置**
general/explore 子代理随机使用同 provider 其他模型，v2.0.27 回归。

**9. [#50650](https://github.com/anomalyco/opencode/issues/50650) — Desktop 自定义 provider 保存必抛错**
save handler 无条件抛出 `provider.custom.unavailable`，功能完全不可用，影响 OpenAI 兼容端接入。

**10. [#54173](https://github.com/anomalyco/opencode/issues/54173) — Windows TUI 默认前景色文本不可见**
Transcript 正文、命令面板、composer 间歇性消失，需全量重绘恢复，Windows 原生体验持续痛点。

---

## 🔧 重要 PR 进展

**1. [#54023](https://github.com/anomalyco/opencode/pull/54023)（OPEN）— 跨 Location 协调凭证刷新**
按 credential ID 全局去重刷新、持久化轮换 token——**直接针对今日最热的 #54833**，值得重点关注其合并进度。

**2. [#54987](https://github.com/anomalyco/opencode/pull/54987)（已合）— 更新 Go 落地页 DeepSeek ZDR 日期至 2026-10-31**
agent 贡献的文档修复，回应 #54951。

**3. [#54988](https://github.com/anomalyco/opencode/pull/54988)（OPEN）— Windows 与 WSL 分离服务默认端口**
解决 Hyper-V/WinNAT 端口保留区间导致的端口冲突（#53351）。

**4. [#54982](https://github.com/anomalyco/opencode/pull/54982)（已合）— CI 校验发布产物 CPU 架构**
防止 2.0.27 中 ARM64 包内嵌 x64 原生 DLL 这类"CI 全绿但真机必挂”的回归再次发生。

**5. [#54983](https://github.com/anomalyco/opencode/pull/54983) / [#54979](https://github.com/anomalyco/opencode/pull/54979)（已合）— 修复 Windows ARM64 Prism 模拟安装更新链路**
让 x64 模拟安装升级到原生 ARM64，并按架构独立 staging 捆绑 CLI。

**6. [#54984](https://github.com/anomalyco/opencode/pull/54984)（已合）— 诊断信息报告 ARM64 上的 x64 模拟**
模拟 x64 是 Windows ARM64 崩溃报告的头号成因，此 PR 让诊断可区分两者。

**7. [#54981](https://github.com/anomalyco/opencode/pull/54981)（已合）— 用 System32 自带 bsdtar 替代 PowerShell 解压 ripgrep**
修复策略禁用 PowerShell 环境下 rg.exe 永远装不上、每次会话重复下载的问题。

**8. [#54986](https://github.com/anomalyco/opencode/pull/54986)（OPEN）— TUI 渲染本地 Markdown 图片**
补齐与 Desktop 的差距，transcript 中直接显示 `![alt](path)` 图片。

**9. [#54945](https://github.com/anomalyco/opencode/pull/54945)（已合）— `compatibility.cacheFormat` 配置 Anthropic 缓存断点**
打破硬编码 allowlist，提升 prompt cache 灵活性与成本效率。

**10. [#54920](https://github.com/anomalyco/opencode/pull/54920)（已合）— 更新服务 D1 过载时返回 503 而非 1101**
避免 Cloudflare Error 1101 影响 CLI/Desktop 更新检查。

---

## 📈 功能需求趋势

- **Windows/ARM64 生态成熟**：winget 包（#49554）、便携版 Desktop（#37893）、TUI 渲染缺陷（#54173）——Windows 用户诉求集中爆发，也是今日 PR 主战场。
- **上下文与压缩管理**：#54972（`/compact --with-derivation` 保留推理过程）、#54648（压缩保留过多原文）、#47646（上下文上限误报）。
- **可观测性与用户引导**：#42765（免费额度耗尽前预警而非静默 429）获得 6 👍。
- **国际化与可访问性**：#26915 请求 RTL（阿拉伯语/希伯来语/波斯语）支持。
- **插件扩展性**：#54927 请求 session tab bar 插件槽位，社区已自建 opencode-better-tabs。

## ⚠️ 开发者关注点（痛点总结）

1. **凭证与上游稳定性是当前最大痛点**：Invalid credential、401/503、网关大请求体失败连续多日霸榜，建议观望 #54023 合并情况再升级 2.0.27。
2. **权限安全语义不一致**：内置规则与显式规则行为不同（#54524）、Auto 模式通知误报（#47545），权限模型可靠性需要官方澄清。
3. **配置不生效类回归频发**：subagent 模型配置被忽略（#54876）、per-agent temperature 无法生效（#54629）、Desktop 自定义 provider 保存必失败（#50650）。
4. **长驻进程资源问题**：serve 模式 RSS 只涨不降（#51340）。

> 💡 建议：使用 v2.0.27 且依赖 ChatGPT OAuth/token sharing 的用户暂缓升级或关注 #54023；Windows ARM64 用户可期待下一版本的大量架构修复。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-13）

## 1. 今日速览

今日 Qwen Code 发布 v0.25.1-nightly.20261012，聚焦 Managed Agent 架构的 connector/broker 稳定性修复。社区讨论重心仍是 **Managed Agent 双路径架构**（#12380，56 条评论持续发酵）与 **Multi-Agent API 公共契约设计**。Web Shell 体验类 bug 报告明显增多，多个新 PR 已在修复路上。

## 2. 版本发布

**v0.25.1-nightly.20261012.18f80f5666**
- fix(managed-agent): 修复来自 #12692 R2 评审的 connector 与 broker 健壮性问题（PR #13330，@wenshao）
- 其余变更信息被截断，详见 [Release 页面](https://github.com/QwenLM/qwen-code/releases)

## 3. 社区热点 Issues

1. **[#12380](https://github.com/QwenLM/qwen-code/issues/12380)** — Managed Agent 双路径架构提案（56 评论）：定义保留现有 TS agent loop、推理与工具环境解耦、Session 持久化归属的阶段性架构，是当前最核心的路线图讨论。

2. **[#13492](https://github.com/QwenLM/qwen-code/issues/13492)** — XML tool-call 恢复丢弃含引号工具标记的外层调用（11 评论）：#13515 已合并修复内层，外层恢复仍待 PR #13579，属于核心解析正确性问题。

3. **[#13785](https://github.com/QwenLM/qwen-code/issues/13785)** — Multi-Agent API：在公共契约上增加 agent 身份维度，使多 Agent 执行可归因、树状化、可中断。明确不是要托管服务，而是契约层表达，讨论质量很高。

4. **[#13898](https://github.com/QwenLM/qwen-code/issues/13898)** — Web Shell 显示后台 subagent 实时状态（running/done、耗时、剩余数），反映 Desktop 用户对后台任务可观测性的强需求。

5. **[#13837](https://github.com/QwenLM/qwen-code/issues/13837)** — 聊天视图 RTL/LTR 混排损坏：代码块强制 LTR、希伯来语镜像乱序，缺 bidi 隔离，标记 welcome-pr 求社区认领。

6. **[#13680](https://github.com/QwenLM/qwen-code/issues/13680)**（已关闭）— P1：Linux Desktop 内置 ripgrep 被 post-link 重写导致启动探测 SIGSEGV，属平台打包类严重问题，已修复关闭。

7. **[#13992](https://github.com/QwenLM/qwen-code/issues/13992)** — Runtime Broker 在 retention 后丢失 release 证明，导致 Hosted 清理从 200 变 409 死循环，Managed Agent 可靠性链上的新发现。

8. **[#13984](https://github.com/QwenLM/qwen-code/issues/13984)** — Monitor resume 遇到已 settle 的记录时留下循环，导致 Session 关闭失败，由 @wenshao 亲自提报的 managed-agent 边界问题。

9. **[#14009](https://github.com/QwenLM/qwen-code/issues/14009)** — `--disable-mcp-server` 仅在启动时生效，首次 settings.json 重算即丢失，禁用的 MCP server 会“复活”，P2 新 bug。

10. **[#14004](https://github.com/QwenLM/qwen-code/issues/14004)** — 社区提出“利益冲突”治理讨论：同一公司既卖 token 订阅又造消耗 token 的 harness，引发关于产品中立性的讨论。

其他值得关注：[#13925](https://github.com/QwenLM/qwen-code/issues/13925)（已关闭）Release notes 重复累积旧 PR；[#13943](https://github.com/QwenLM/qwen-code/issues/13943)（已关闭）UTF-8 BOM 导致 .lsp.json 被静默忽略。

## 4. 重要 PR 进展

1. **[#13858](https://github.com/QwenLM/qwen-code/pull/13858)** — Managed Agent H4 阶段：Workflow 子运行时，Managed Session 可通过新 Workflow 工具启动 workflow 子进程，是 #12380 路线图的关键落地。

2. **[#13955](https://github.com/QwenLM/qwen-code/pull/13955)** — 成员间消息走 session_command 通道（H4e-b3c），团队成员点对点通信不再消耗 lead 的模型 turn。

3. **[#13325](https://github.com/QwenLM/qwen-code/pull/13325)** — 修复 #12692 R2 评审的 8 个 Critical 发现，含 InnoDB 锁序反转、keyset 分页缺陷等数据库层严重问题。

4. **[#13816](https://github.com/QwenLM/qwen-code/pull/13816)** — 新增 mount-release 端点，工具 turn 进入 recovery blocked 时归还 Workspace 执行 mount，防止租约泄漏。

5. **[#13971](https://github.com/QwenLM/qwen-code/pull/13971)** — Web Shell Settings 隐藏已停用的内置 OAuth 模型（对应 Issue #13965），社区贡献者快速响应。

6. **[#14001](https://github.com/QwenLM/qwen-code/pull/14001)** — 修复后台 shell ack 到达时 Web Shell 折叠视图丢失 turn 最终回答的问题（对应 #13998）。

7. **[#13954](https://github.com/QwenLM/qwen-code/pull/13954)** — CI 强制 Flyway 迁移版本严格递增，堵住数据库迁移顺序回退的风险。

8. **[#13975](https://github.com/QwenLM/qwen-code/pull/13975)** — TOML 命令文件剥离 UTF-8 BOM 后再转换，与已修复的 .lsp.json BOM 问题同源，Windows 编辑器友好。

9. **[#13628](https://github.com/QwenLM/qwen-code/pull/13628)** — 系统设置环境变量覆盖路径增加管理员信任门控，防止用户文件冒充系统层，安全加固。

10. **[#13679](https://github.com/QwenLM/qwen-code/pull/13679)** — Session Overview 支持列出并打开无 workspace 的 standalone 会话，补齐 Desktop 会话管理。

## 5. 功能需求趋势

- **Managed Agent / Multi-Agent**：绝对主线。架构定义（#12380）、Multi-Agent 身份契约（#13785）、Workflow 子运行时、成员通信等密集推进，是未来数月的核心方向。
- **Web Shell / Desktop 体验**：后台 subagent 状态显示（#13898）、turn 折叠丢答案（#13998）、模型列表残留（#13965）等，Desktop UI 打磨需求集中爆发。
- **国际化与文本正确性**：RTL/bidi 支持（#13837）、VS Code 伴生 UI 本地化（#13967），国际化用户群在增长。
- **集成生态**：You.com 免费 MCP 接入 web search（#13987）、OSC 7501 终端状态协议（#13870）、Chrome 扩展 WebSocket 重连退避（#13966）。
- **平台分发健壮性**：Linux ripgrep 打包崩溃（#13680）已闭环，但平台打包仍是持续关注点。

## 6. 开发者关注点

- **状态一致性与生命周期边界**：大量 bug 集中在“settle/resume/release 与 retention 的竞态”（#13984、#13992、#13242），Managed Agent 的清理与恢复路径是当前最大质量风险区。
- **Windows/BOM 兼容性**：BOM 静默破坏 .lsp.json、TOML 命令解析，Windows 用户反复踩坑，建议在配置加载层统一处理。
- **配置生效持久性**：`--disable-mcp-server` 等 CLI flag 在设置重算后丢失，flag 与 settings 的合并语义需要系统性设计。
- **可靠性工程细节**：Chrome 扩展无限重试无退避、release notes 无限累积等，社区对日志噪声和 CI/发布流程规范提出更高要求。
- **信任模型**：workspace 信任状态不可恢复（#13130）、系统设置路径信任门控（PR #13628），桌面端信任机制仍是痛点。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*