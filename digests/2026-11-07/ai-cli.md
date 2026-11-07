# AI CLI 工具社区动态日报 2026-11-07

> 生成时间: 2026-11-07 00:05 UTC | 覆盖工具: 7 个

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
**数据日期：2026-11-07**

---

## 1. 生态全景

AI CLI 工具已从单一编码助手全面演进为**多 Agent 编排平台**，各头部产品（Codex、Gemini CLI、Qwen Code、OpenCode）都在密集建设 subagent/workflow 基础设施，表明"单次对话"范式正在让位于"长时程自治任务"。**MCP 已成为事实性工具协议标准**，但也是当前 Bug 密度最高的区域（认证、进程泄漏、会话管理、协议兼容问题横跨全部 6 款工具）。同时，**长会话稳定性**（OOM、上下文丢失、transcript 膨胀、配额重建）是全行业共同的技术债。安全与信任议题（隐私泄露、权限越界、供应链漏洞）首次集中爆发，标志着生态正从"功能竞赛"进入"可靠性 + 信任"竞赛阶段。

---

## 2. 各工具活跃度对比

| 工具 | 今日热点 Issues | 今日活跃 PR | Release | 核心事件 |
|---|---|---|---|---|
| **Claude Code** | 10+（含 687👍 头号事件） | 1 | v2.1.319 | User-Agent 邮箱隐私泄露 + privacy mod 开源 |
| **OpenAI Codex** | 10（3 个进程泄漏类累计 130+ 评论） | 17+（含 Guardian 10 连 PR） | 0.167.0 稳定版 + 0.169.0-alpha.2 | Guardian 审查系统基础设施落地 |
| **Gemini CLI** | 10+（5 个 P1） | 10（8 已合并） | 无 | 稳定性修复日：OOM/FD 泄漏/ACP 重试 |
| **GitHub Copilot CLI** | 10 | 1（文档） | v1.0.107 | Kitty 图像渲染、/code 跳转 VS Code |
| **Qwen Code** | 10（4 个 P1） | 10+ | v0.26.9 | Skill 安装体系增强 + 诊断工具链 |
| **OpenCode** | 10（1 帖 315 评论） | 10+（单人贡献 5 PR） | v2.2.6 | MCP 连接池共享 |
| **Kimi Code CLI** | 0 | 0 | 无 | 无活动 |

**观察**：Codex 工程产出最猛（单日 17+ PR）；Claude Code 单事件引爆力最强；Gemini CLI 呈"修复冲刺"节奏；OpenCode 社区驱动特征明显（个人贡献者单日 5 个高质量 PR）。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **MCP 稳定性与生命周期** | 全部 6 款 | Codex：进程泄漏 37GB（#12491）；OpenCode：连接池（已解决）、会话头丢失（#59640）；Copilot：Entra 认证、schema 丢失（#5367）；Claude Code：协议兼容（#107111） |
| **长会话/长任务可靠性** | Claude Code、Codex、Gemini、Qwen、OpenCode | 上下文被清理（#107979）、配额重建消耗（#45383）、OOM（#30180）、transcript 二次方膨胀（#13113）、后台任务误报完成（#48826） |
| **Subagent 权限与可信度** | Claude Code、Gemini、Qwen、OpenCode | 审批死锁（#16425）、skill 越权（#16418）、子代理误报成功（#22323）、无限挂起（#21409） |
| **成本/配额透明度** | Claude Code、Codex、OpenCode | $10 额度 15 分钟耗尽（#107558）、Pro $500 套餐消耗异常（#59194）、免费层误报（#59387，315 评论） |
| **Windows 一等公民支持** | Codex、Copilot、Claude Code、Qwen | TUI 冻结、项目消失、ACL 阻断、shell 假定 bash（#15310） |
| **安全过滤误判** | Claude Code、Codex、Gemini | 关键词式拦截误伤（naver.com、用户笔记、合法本地开发），呼吁语义级判断 |
| **记忆系统** | Qwen、Gemini、OpenCode | bzmem 集成提案、Holo 个人记忆、自动记忆 headless 失效 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 隐私合规、企业权限治理、Skills/Mods 扩展 | 企业开发者、高合规要求团队 | Auto mode 策略化 + 模型侧安全过滤，闭源核心 + 开源 mods 的透明化策略 |
| **OpenAI Codex** | 多 Agent 编排、云本地融合、审查监督 | Pro/企业重度订阅用户 | Guardian 审查系统 + 云线程自动 checkout，Rust 重写（性能优先） |
| **Gemini CLI** | 工程质量修复、AST 感知工具链、token 效率 | 开源社区、长会话重度用户 | 开放式架构（ACP、VS Code 插件），社区提案驱动（Tactful Extraction、OS 沙箱） |
| **Copilot CLI** | 终端体验打磨、GitHub/VS Code 生态集成 | GitHub 存量用户、企业 Entra 环境 | 与 IDE/桌面深度打通，Fusion 模式做模型路由抽象 |
| **Qwen Code** | Skill 体系、诊断可观测性、CI 治理 | 中文社区、开源贡献者 | 开源快速迭代，Sed 模拟等自建工具链，借鉴 Claude Code 交互（Agent View） |
| **OpenCode** | 多模型接入、插件生态、V2 迁移 | BYOK/本地模型用户、成本敏感团队 | vendor-neutral（Agent Plugins 标准、Ollama/GLM/DeepSeek），字节码 VM 支持可暂停任务 |

---

## 5. 社区热度与成熟度

**热度梯队**：
- **第一梯队**：Claude Code（单 issue 687👍）、Codex（进程泄漏 130+ 累计评论）、OpenCode（汇总帖 315 评论）——用户基数与情绪强度均最高
- **第二梯队**：Gemini CLI、Qwen Code——工程节奏稳定，P1 响应快（Qwen 修复 PR 当日就位）
- **早期/静默**：Copilot CLI（社区互动偏弱，Issue 👍 量级低）；Kimi Code CLI（无活动）

**成熟度判断**：
- **快速迭代期**：Codex（alpha 双轨并行）、Qwen Code（周级版本）、OpenCode（V2 迁移进行中）
- **稳定打磨期**：Claude Code、Gemini CLI、Copilot CLI——问题集中在边缘场景与长期回归，而非核心功能缺失
- **共性隐忧**：三款工具（Claude Code、Codex、Copilot）都被点名“回归测试不足”，版本迭代质量管控是成熟度的真实短板

---

## 6. 值得关注的趋势信号

1. **多 Agent 监督架构是下一个竞争高地**。Codex 单日合入 10 个 Guardian PR（证据检索、频道选择、批量订阅），Qwen 建设诊断/agent 关系图，指向"Agent 输出需要可审计的证据链"——为生态工具开发者（审查、审计类）创造窗口。

2. **权限模型正从“配置”走向“运行时难题”**。三款工具同日暴露权限失效（Qwen skill 越权、审批死锁；OpenCode permissions 静默失效；Claude Code auto mode 策略变更），提示企业在选型时应将权限边界的可验证性列为 P0 评估项。

3. **上下文压缩副作用成为新的风险源**。Claude Code 历史被 "[cleared]"、Qwen 压缩导致 skill 约束丢失、Codex 中断后重建烧配额——压缩不再是纯优化问题，而是**正确性问题**。关注各家的“压缩可见性/可控制”方案。

4. **云本地融合加速**。Codex 云线程自动 checkout 本地仓库、Copilot `/code` 跳转 VS Code，CLI 正在成为跨端会话的入口而非孤立终端。

5. **对企业/网关用户的操作建议**：
   - 升级 Claude Code v2.1.319 前评估 `CLAUDE_CODE_AUTO_MODE_SERVER`（LLM 网关场景行为变更）
   - Codex MCP 泄漏未修，多线程场景建议监控孤儿进程
   - Qwen npm 包存在已披露安全通告（#16434），尽快跟进升级
   - 内网环境慎用 OpenCode 安装器（忽略 .npmrc 镜像配置）

6. **社区信任是隐形护城河**：Claude Code 对隐私事件“开源 mod 响应”、OpenCode 复活被 stale bot 误关的 PR，显示透明化响应正成为社区运营的差异化能力；反之，Codex 的 4 个月未修泄漏和 Copilot 重复 changelog 正在消耗耐心。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-07）

> **数据说明**：本期 PR 数据中评论数均为空（undefined），故“热门”排序参考 PR 讨论持续时间、跨月更新活跃度及关联 Issue 热度综合判断。

---

## 一、热门 Skills 排行（PR）

| # | Skill / PR | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** ([#1742](https://github.com/anthropics/skills/pull/1742)) | 适配 `mcp>=2.0` 的 `streamable_http_client` 重命名与自定义 Header 机制。关联 Issue [#1390](https://github.com/anthropics/skills/issues/1390)（评估脚本对真实 MCP 服务器打 0 分）显示 mcp-builder 是社区使用最频繁、问题最集中的 Skill | OPEN |
| 2 | **skill-creator 触发评估修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 隔离 trigger evals、修复 Windows select() 失败与误报。关联高热度 Issue [#556](https://github.com/anthropics/skills/issues/556)（`claude -p` 触发率 0%），触及“Skill 何时被触发”这一核心痛点 | OPEN |
| 3 | **skill-creator YAML 解析修复** ([#1997](https://github.com/anthropics/skills/pull/1997)) + 独立执行修复 ([#1681](https://github.com/anthropics/skills/pull/1681)) | 修复 SKILL.md frontmatter 解析与打包脚本路径问题，均为 skill-creator 工具链刚需修复 | OPEN |
| 4 | **notion-spec-to-implementation + quantitative-resume-auditor** ([#1245](https://github.com/anthropics/skills/pull/1245)) | 将产品/技术 Spec 转为 Notion 可执行任务清单；讨论跨度长达 4 个月（6月–10月） | OPEN |
| 5 | **pyxel 复古游戏开发** ([#525](https://github.com/anthropics/skills/pull/525)) | 由 Pyxel 作者本人提交，含无头运行、帧检查等验证流程，长期活跃（3月–11月） | OPEN |
| 6 | **webapp-testing 安全加固** ([#1980](https://github.com/anthropics/skills/pull/1980)) | 消除 `shell=True` 命令注入风险（CWE-78），配合 [#1976](https://github.com/anthropics/skills/pull/1976) 元素发现修复 | OPEN |
| 7 | **docx 系列修复** ([#1792](https://github.com/anthropics/skills/pull/1792)、[#1734](https://github.com/anthropics/skills/pull/1734)) | LibreOffice 超时正确报错、孤儿注释检测；对应 Issue [#2018](https://github.com/anthropics/skills/issues/2018) 的 XML 命名空间 bug | OPEN |
| 8 | **xlsx 外链风险检测修复** ([#2019](https://github.com/anthropics/skills/pull/2019)) | 修复 worksheet 级 defined names 导致的误报，11 月仍有更新 | OPEN |

---

## 二、社区需求趋势（Issues 提炼）

1. **安全与信任边界**：[#492](https://github.com/anthropics/skills/issues/492)（46 条评论，热度第一）——社区 Skill 冒用 `anthropic/` 命名空间构成信任滥用；配合 [#1394](https://github.com/anthropics/skills/issues/1394)（eval-viewer XSS），**供应链安全是最大焦虑**。
2. **企业级分发与组织内共享**：[#228](https://github.com/anthropics/skills/issues/228)（17 条评论）——要求组织级 Skill 库与分享链接，摆脱 Slack 手传 `.skill` 文件。
3. **Agent 记忆与推理质量**：[#1329](https://github.com/anthropics/skills/issues/1329) compact-memory（紧凑符号化 agent 状态）、[#1385](https://github.com/anthropics/skills/issues/1385) 三段式推理质量门控——长会话上下文管理是高阶用户核心需求。
4. **Token 效率与 Skill 触发可靠性**：[#1487](https://github.com/anthropics/skills/issues/1487)（claude-api 单次注入 ~156k token 撑爆上下文）、[#556](https://github.com/anthropics/skills/issues/556)、[#202](https://github.com/anthropics/skills/issues/202)（skill-creator 冗长低效）。
5. **工程化/垂直领域 Skill**：HPC 集群运维 ([#1615](https://github.com/anthropics/skills/pull/1615))、Web3 合约审计 ([#1771](https://github.com/anthropics/skills/pull/1771))、Markdown 转视频 ([#1703](https://github.com/anthropics/skills/pull/1703))。

---

## 三、高潜力待合并 Skills

- **[#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder** — 修复明确关联 Issue #1668/#1390，属阻塞级 bug，最可能优先落地
- **[#1298](https://github.com/anthropics/skills/pull/1298) + [#1997](https://github.com/anthropics/skills/pull/1997) skill-creator 修复** — 对应高赞 Issue #556，官方有强动机合入
- **[#2019](https://github.com/anthropics/skills/pull/2019) xlsx** — 修复 #2013，近期仍活跃更新
- **[#525](https://github.com/anthropics/skills/pull/525) pyxel** — 上游作者维护，质量与测试完备，8 个月持续跟进
- **[#1980](https://github.com/anthropics/skills/pull/1980) webapp-testing 安全修复** — 安全类修复通常优先处理

---

## 四、生态洞察（一句话总结）

**社区最集中的诉求是“可信赖、可分发的 Skills 基础设施”**——即解决命名空间信任与命令注入等安全问题、实现组织级共享机制、修复 Skill 触发评估与 token 效率，让 Skills 从个人脚本进化为企业可依赖的标准化能力。

---

# Claude Code 社区动态日报 · 2026-11-07

## 📌 今日速览

今天社区最大焦点是 **User-Agent 隐私泄露事件**（#107757）：Claude Code 在 Web 搜索时将用户邮箱暴露给第三方，收获 687 个 👍 和 98 条评论，官方随即发布 v2.1.319 并开源了内置 privacy mod（#107768）。此外，登录认证、Desktop 登录失败及网络超时等稳定性问题持续发酵。

---

## 🚀 版本发布

### v2.1.319
- **Auto mode 策略变更**：在关闭遥测或 feature flags 的场景（包括 LLM 网关后）,auto mode 不再回退到内置分类器，而是对服务器无法校验的调用进行询问或直接拒绝。
- 可设置 `CLAUDE_CODE_AUTO_MODE_SERVER=0` 恢复旧行为；**Bedrock、Vertex、Foundry 不受影响**。

---

## 🔥 社区热点 Issues（Top 10）

1. **[#107757] User-Agent 头泄露用户邮箱** — ⭐ 今日头号事件
   Web 搜索请求的 `User-Agent` 携带登录邮箱，导致用户每天收到大量诈骗邮件。687 👍 / 98 评论，作者强调必须彻底移除而非提供 opt-out 选项。
   https://github.com/anthropics/claude-code/issues/107757

2. **[#1757] 频繁要求重新登录** — 长期遗留问题（2025-06 至今），几乎每天都需要重新网页认证，78 👍，用户 frustration 极高。
   https://github.com/anthropics/claude-code/issues/1757

3. **[#108048] Opus 5.5 `reasoning_extraction` 拒绝读取用户自己的笔记文件**
   可稳定复现、二分定位到 30 行代码块，且依赖 user-scope rules 文件存在；Opus 4.8 无此问题。对模型安全过滤准确性的重要反馈。
   https://github.com/anthropics/claude-code/issues/108048

4. **[#107111] HTTP MCP：合法 tools/list 响应被当作错误丢弃**（has repro）
   连接 Google Gmail MCP 服务器成功后，符合 2026-07-28 协议的有效响应被报 "Error POSTing to endpoint"，`/mcp` 显示 "tools fetch failed · connected"。MCP 生态兼容性问题。
   https://github.com/anthropics/claude-code/issues/107111

5. **[#107232] API 请求超过 5 分钟仍无法处理**
   Linux 环境长请求超时问题持续未解，影响长任务工作流。
   https://github.com/anthropics/claude-code/issues/107232

6. **[#103788] Claude Desktop (macOS) 登录失败："We couldn't verify your browser"**
   Google 和邮箱双路径均 400，与配置/VPN 无关，仅更换出口 IP 后邮箱路径可用。企业/受限制网络用户受影响大。
   https://github.com/anthropics/claude-code/issues/103788

7. **[#95539] naver.com 全域被安全限制误拦截**（has repro）
   韩国最大门户被默认安全黑名单拦截（daum.net 未被拦截），地域性误判问题。
   https://github.com/anthropics/claude-code/issues/95539

8. **[#107558] $10 额度 15 分钟内耗尽**
   轻度使用下额度异常消耗，疑似计量 bug，涉及用户真金白银。
   https://github.com/anthropics/claude-code/issues/107558

9. **[#107267] Windows Terminal 2.1.318 输入/滚动冻结**（疑似 #63504 回归）
   CPU 负载下 TUI 全屏模式卡顿，影响 Windows 用户日常体验。
   https://github.com/anthropics/claude-code/issues/107267

10. **[#107979] 长会话中历史轮次显示 "[cleared]"**
    粘贴内容和截图在会话中途被从模型上下文中剥离，影响长对话工作流的可靠性。
    https://github.com/anthropics/claude-code/issues/107979

**其他值得留意**：
- [#88993](https://github.com/anthropics/claude-code/issues/88993) Subagent 在 ~180s 被中断且重试冷启动无法完成
- [#94687](https://github.com/anthropics/claude-code/issues/94687) macOS 自动更新后语音听写失效（TCC 权限问题）
- [#107388](https://github.com/anthropics/claude-code/issues/107388) SSH 会话 Artifact 无法在侧边栏打开（回归）

---

## 🔀 重要 PR 进展

> 过去 24 小时仅 1 条 PR 更新：

1. **[#107768] mods: add the privacy mod**（已关闭）
   开源内置 `privacy` mod 源码：拒绝包含登录邮箱的 shell 调用，并命名 User-Agent 相关检查。无新行为，可视为对 #107757 隐私事件的响应性透明化举措。
   https://github.com/anthropics/claude-code/pull/107768

---

## 📈 功能需求趋势

1. **安全过滤智能化**：#95539、#108048、#91579（已关闭）均指向关键词式安全拦截的误判问题，社区呼吁语义级判断。
2. **MCP 生态兼容性**：协议版本兼容（#107111）、远程 MCP 工具能力扩展（#107292 请求 `effort` 参数）。
3. **认证与稳定性**：登录频次（#1757）、Desktop 登录失败（#103788）长期是高频话题。
4. **长任务/长会话可靠性**：API 5 分钟超时（#107232）、subagent 中断（#88993）、上下文清理（#107979）反映长任务场景仍是薄弱环节。
5. **Skills 与 Agents 增强**：#10238（子目录支持，已交付关闭）显示 Skills 组织能力已获改进。

---

## ⚠️ 开发者关注点

- **隐私与信任**：#107757 表明用户对数据外泄零容忍，privacy mod 开源是积极信号，但根本修复（移除邮箱传输）仍待验证。
- **成本透明度**：#107558 的异常计费引发对用量计量的担忧，建议关注官方回应。
- **企业/网关用户注意**：v2.1.319 的 auto mode 变更可能影响 LLM 网关场景的权限行为，升级前建议评估 `CLAUDE_CODE_AUTO_MODE_SERVER` 配置。
- **回归测试不足**：多个 issue（#107267、#107388）被标记为回归，版本迭代质量管控是社区隐忧。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-11-07

## 1. 今日速览

Codex CLI 发布稳定版 **0.167.0**（新增 Agent 命令中心与后端切换能力），同时推进 **0.169.0-alpha.2** 内测。桌面端 **MCP 进程泄漏问题**（内存占用高达 37GB）持续发酵，成为最严重的未决社区痛点。工程团队今日合入大量 PR，重点建设 **Guardian 审查系统**与 **TUI 体验优化**。

---

## 2. 版本发布

### rust-v0.167.0（稳定版）
- 新增 `codex agents --no-daemon` 命令打开 Agent 命令中心，命令中心与会话选择器现可标记未读结果
- 终端会话选择器支持在已连接后端之间切换，且切换时保留草稿

### rust-v0.169.0-alpha.2（预发布）
- 常规 alpha 迭代，无详细 changelog

---

## 3. 社区热点 Issues

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#30408](https://github.com/openai/codex/issues/30408) MCP 进程泄漏（9+ GB RSS） | **最严重性能问题**。每个新线程都生成全套全局 MCP 进程，线程关闭后不清理，孤儿进程无限累积。23 👍，69 条评论，持续 4 个月未修复 |
| 2 | [#12491](https://github.com/openai/codex/issues/12491) MCP 僵尸进程 1300+ / 37GB 泄漏 | 与 #30408 同源问题，GUI 端更严重，反映进程回收机制存在系统性缺陷 |
| 3 | [#42739](https://github.com/openai/codex/issues/42739) Windows 更新后本地项目从侧边栏消失 | 79 条评论，影响 Windows 桌面用户的核心工作流；#59895 昨日新报同类问题，说明**回归尚未修复且仍在复现** |
| 4 | [#51524](https://github.com/openai/codex/issues/51524) Windows Computer Use 卡在 get_window_state | 10 月更新后无法读取 Chrome/Edge 浏览器 URL，Computer Use 功能在 Windows 上实质不可用 |
| 5 | [#55141](https://github.com/openai/codex/issues/55141) macOS 重启后内存压力持续攀升 | 每线程工具服务器累积，与 MCP 泄漏家族问题呼应，16GB 机型用户受影响明显 |
| 6 | [#32880](https://github.com/openai/codex/issues/32880) Windows Git 写入被 DENY ACL 阻断 | workspace-write 沙箱 ACL 阻塞 linked worktrees，自主 Git 操作回归，阻断 Pro 用户日常工作 |
| 7 | [#59895](https://github.com/openai/codex/issues/59895) 项目消失 + 切回个人账户后丢失 | 昨日新报（8 评论快速增长），验证 #42739 是持续性而非一次性回归 |
| 8 | [#45383](https://github.com/openai/codex/issues/45383) 中断会话重建上下文浪费配额 | 长任务被中断后需重建 context 消耗额度，对 Plus 用户成本影响大 |
| 9 | [#59194](https://github.com/openai/codex/issues/59194) Pro $500 套餐 2 小时消耗 8% 周配额 | 高端订阅计量透明度问题，引发对用量计费合理性的讨论 |
| 10 | [#56475](https://github.com/openai/codex/issues/56475) 安全检查误报阻断授权本地开发 | 网络安全 safety-check 疑似误伤合法开发场景，安全策略与可用性的平衡问题 |

---

## 4. 重要 PR 进展

1. **[Guardian 审查系统系列](https://github.com/openai/codex/pull/59994)**（#59993–#60002）：一次性合入 10 个 PR 构建完整的 Guardian reviewer 基础设施——消息板固定读视图、只读证据检索工具、原子批量订阅、模型驱动的频道选择、按源顺序的证据投递规划。这是今日**最大的工程动作**，预示某种多 agent 证据审查/监督机制即将上线
2. [#60007](https://github.com/openai/codex/pull/60007) 云线程携带本地 GitHub 项目：新建云端线程可自动 checkout 对应仓库，本地↔云端体验打通
3. [#60009](https://github.com/openai/codex/pull/60009) TUI 登录支持自定义网关选择：`gateway_setup_wizard` 功能（默认关闭），面向企业/自建网关用户
4. [#60003](https://github.com/openai/codex/pull/60003) Realtime 连接接入运行时认证：修复旁路握手复用捕获的认证头的安全隐患
5. [#60006](https://github.com/openai/codex/pull/60006) 降低 SQLite 写入开销：token 用量只更新时间戳与总数，缓解单写者连接池争用——**与内存/性能泄漏问题相关的基础优化**
6. [#60011](https://github.com/openai/codex/pull/60011) 多 agent 模式适配托管工具：`multi_agent_v2.disable_native_tools` 下改用捆绑模式策略
7. [#59983](https://github.com/openai/codex/pull/59983) TUI 中将用户输入渲染为 Markdown：保留 gutter/背景/超链接的富文本渲染
8. [#59991](https://github.com/openai/codex/pull/59991) MCP 工具刷新时保留调用上下文：修复 `_codex_apps.invocation_context` 在工具元数据刷新后丢失的问题
9. [#60008](https://github.com/openai/codex/pull/60008) TUI 剪贴板与输入处理重构：提取图片粘贴、粘贴节流等 helper，为后续功能铺路
10. [#60004](https://github.com/openai/codex/pull/60004) `account/read` 暴露 ChatGPT user ID：便于下游工具做账户关联与审计

---

## 5. 功能需求趋势

- **进程/内存治理（最强烈）**：MCP 子进程泄漏问题占据热度榜前列，三四个关联 issue 累计超 130 条评论，用户要求彻底的进程生命周期管理
- **Windows 平台质量**：项目消失、Git 沙箱阻断、Computer Use 失效、VS Code 扩展初始化失败——Windows 相关 issue 占热点近半
- **跨端体验一致性**：iOS/Android Remote 配对、自定义分节同步、浏览器集成状态在不同会话间不一致
- **配额与计量透明度**：Pro $200/$500 用户对用量消耗速度和中断重建成本不满
- **模型行为可控性**：上下文压缩策略偏重最新消息、指令遵循能力、Images 2.6 OAuth 模型选择缺失
- **终端通知集成**：OSC 777 通知方法等终端深度适配需求

---

## 6. 开发者关注点

1. **MCP 进程生命周期**是最紧迫的技术债：官方 SQLite 写入优化（#60006）方向正确，但尚未见针对进程回收的专项修复合入，社区耐心正在耗尽
2. **Windows 桌面回归测试不足**：多起严重回归（项目消失、ACL 阻断）均由版本更新触发，发布质量管控被反复质疑
3. **长任务成本模型**：会话中断后上下文重建消耗配额，开发者期望断点续传或增量恢复机制
4. **安全策略误报**：safety-check 阻断合法开发、Browser Use 屏蔽站点且无申诉通道，用户要求透明的审查/豁免流程
5. **内部架构信号**：Guardian 系列与多 agent v2、云线程仓库预配等 PR 表明 Codex 正向“多 agent + 云本地融合”方向演进，值得生态工具开发者提前关注

---
*数据来源：github.com/openai/codex（过去 24 小时）*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-11-07）

## 📌 今日速览

今日无新版本发布。社区活跃度集中在**稳定性与内存管理修复**：多个修复 PR 合入，涉及 OOM 崩溃、ACP 模式流重试、会话恢复 400 错误等核心问题。Issues 侧，`area/agent` 工作流的 Subagent 相关问题持续占据热榜，包括子代理挂起、结果误报成功等 P1 级 Bug。另需注意出现一个疑似垃圾内容的 Issue（#30190）。

---

## 🔥 社区热点 Issues（Top 10）

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — Subagent 达到 MAX_TURNS 后误报为 GOAL 成功，掩盖了实际中断。**P1 级**，误导用户对任务完成度的判断，13 条评论讨论热烈。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — Generalist agent 无限挂起，简单如创建文件夹的操作也会卡死，用户等待一小时后被迫取消。P1 级，8 👍，可暂时通过禁用 subagent 规避。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — 提出**零依赖 OS 沙箱 + 执行后意图路由**方案，以释放 Gemini 3 原生 bash 能力（grep/sed/awk 链式操作）。方向性增强提案，9 条评论。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — EPIC：评估 **AST 感知的文件读取/搜索/代码库映射**，目标是减少 token 噪声、精确定位方法边界。配套 #22746（tilth/glyph）与 #22747（ast-grep）。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — 模型几乎从不主动使用自定义 Skills 和 Sub-agents，仅在显式指示下才调用。影响自定义工作流的核心体验。

6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** — Browser Agent 完全忽略 `settings.json` 中的 `maxTurns` 等配置覆盖，`AgentRegistry` 读取合并后未生效。

7. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — 工具数量超过 128 个时触发 400 错误，代理缺乏工具作用域智能裁剪机制。

8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — Browser subagent 在 Wayland 下运行失败，影响 Linux 用户。P1 级。

9. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** — get-shit-done 输出 hook 在打印用户摘要时导致 CLI 崩溃。P1 级。

10. **[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)** — "Tactful Extraction"：建立 token 节约的外科手术式代码读取层级，解决大文件读取导致的上下文膨胀（每回合约 36.6k token 基线）。

> ⚠️ 备注：[#30190](https://github.com/google-gemini/gemini-cli/issues/30190) 内容为波兰语的 PR 审查请求模板，疑似机器人/垃圾提交，建议维护者处理。

---

## 🛠️ 重要 PR 进展（Top 10）

**已合并（CLOSED）：**

1. **[#30180](https://github.com/google-gemini/gemini-cli/pull/30180)** — 修复长会话中多模态工具输出导致的 **V8 堆内存 OOM 崩溃**，限制多段工具输出并淘汰旧的 inlineData。
2. **[#30186](https://github.com/google-gemini/gemini-cli/pull/30186)** — 修复会话恢复时的 `400 INVALID_ARGUMENT`（model turn 结尾请求）及主线程 JSONL 冻结，关联 #29829。
3. **[#30187](https://github.com/google-gemini/gemini-cli/pull/30187)** — ACP 模式下防止**数小时配额重试挂起**，并向 ACP 客户端通知重试状态。
4. **[#30165](https://github.com/google-gemini/gemini-cli/pull/30165)** — 修复 ACP 模式中流式重试导致**部分文本/工具调用被错误拼接执行**的严重问题。
5. **[#30184](https://github.com/google-gemini/gemini-cli/pull/30184)** — 修复 macOS PTY 主文件描述符泄漏，防止长会话耗尽 `kern.tty.ptmx_max`。
6. **[#30182](https://github.com/google-gemini/gemini-cli/pull/30182)** — 网络故障时不再静默挂起加载动画数分钟，明确报错（含 TLS 拦截/ALL_PROXY 场景）。
7. **[#30181](https://github.com/google-gemini/gemini-cli/pull/30181)** — VS Code 扩展替换 barrel 导入，**包体积缩减 >80%**（13.8 MB → 1.7 MB 生产版），改善启动性能。
8. **[#30183](https://github.com/google-gemini/gemini-cli/pull/30183)** — 允许通过 `model.requestTimeoutMs` 覆盖 60s API headers 超时，修复高思考级别长请求被误杀重放。

**进行中（OPEN）：**

9. **[#30185](https://github.com/google-gemini/gemini-cli/pull/30185)** — **P1**：防止 Shell 模式（`!`）中递归生成交互式 gemini 会话。安全相关，值得关注。
10. **[#30164](https://github.com/google-gemini/gemini-cli/pull/30164)** — **P1**：修复 macOS Seatbelt 沙箱下文件夹信任失败（沙箱内无法访问 `trustedFolders.json`），与已合入的 #30143（FSEvents 权限）配套。

---

## 📈 功能需求趋势

- **Subagent 体系成熟化**（最大热点）：并行协作与共享内存（#18287）、本地子代理 Sprint（#20195）、轨迹共享 `/chat share`（#22598）、symlink 识别（#20079）等，社区对子代理稳定性与可观测性诉求强烈。
- **AST 感知工具链**：#22745/#22746/#22747 系列，探索 tilth、glyph、ast-grep 提升代码读取精度。
- **上下文与 token 效率**：Tactful Extraction（#19561）、基于文件的持久化任务追踪替代 WriteToDo（#18836、#21000）。
- **安全与沙箱**：OS 级零依赖沙箱（#19873）、阻止破坏性命令如 `git reset --force`（#22672）、per-workspace 策略（#18397）。
- **Browser Agent 韧性**：会话接管与锁恢复（#22232）、配置覆盖（#22267）、Wayland 支持（#21983）。

## 🎯 开发者关注点

1. **子代理可靠性是最大痛点**：挂起（#21409）、结果误报（#22323）、不主动调用（#21968）三个 P1/P2 问题叠加，用户对 subagent 信任度下降。
2. **长会话稳定性**：OOM、FD 泄漏、会话恢复错误等问题本周密集修复，说明长时程 agentic 会话仍是薄弱环节。
3. **可观测性不足**：`/bug` 报告缺少子代理上下文（#21763），排障困难。
4. **配置一致性**：`settings.json` 覆盖在 Browser Agent 中不生效（#22267），工具数超限即 400（#24246），边界场景打磨待加强。
5. **macOS 沙箱兼容**：Seatbelt 相关修复连续多日推进（#30143 → #30164），macOS 沙箱用户建议关注后续版本。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-11-07）

## 📌 今日速览

GitHub Copilot CLI 昨日发布 **v1.0.107**，延续 v1.0.106 的更新内容（Kitty 内联图像渲染、`/code` 命令跳转 VS Code、Fusion 层级设置、统一设置面板），但有用户指出两个版本发布说明完全相同，已提出澄清请求（#5377）。社区今日新增多条 MCP 相关 Bug（Entra 认证、工具 schema 丢失、OAuth token 过期），输入体验（Shift+Enter 多行输入）依旧是长期高频痛点。

---

## 🚀 版本发布

### v1.0.107（2026-11-06）
- Rex 终端支持通过 **Kitty direct placements** 渲染内联图像
- 新增 `/code` 命令，可将当前会话在 **VS Code** 中打开
- `copilot config` 新增 **Fusion 层级设置**
- `/settings` 为所有用户打开**统一仪表板**，并支持跨设置与本地资源的全局搜索

> ⚠️ 注：v1.0.106 与 v1.0.107 的发布说明除日期外完全一致，社区已请求澄清（[#5377](https://github.com/github/copilot-cli/issues/5377)）。

---

## 🔥 社区热点 Issues

| # | 标题 | 关注点 |
|---|------|--------|
| 1 | [#1972](https://github.com/github/copilot-cli/issues/1972) 可配置提交键（如 Ctrl+Enter），避免 IME 输入误提交 | 👍 48，CJK 用户核心痛点，长期未解决 |
| 2 | [#2776](https://github.com/github/copilot-cli/issues/2776) Shift+Enter 提交而非换行 | 👍 5 / 9 评论，与 #3768 同类问题，多行输入需求强烈 |
| 3 | [#5370](https://github.com/github/copilot-cli/issues/5370) Fusion/Auto 模式下后台长命令导致 Agent 输出被扣留 | 今日新增，Fusion 模式核心体验问题 |
| 4 | [#5220](https://github.com/github/copilot-cli/issues/5220) Claude 模型支持 1 小时 prompt cache TTL | 👍 9，5 分钟 TTL 在交互场景频繁过期，成本影响大 |
| 5 | [#5236](https://github.com/github/copilot-cli/issues/5236) Windows 上 Entra broker token 缓存为 0 字节，每个新进程重新弹登录 | MCP + Windows 认证体验受阻 |
| 6 | [#5250](https://github.com/github/copilot-cli/issues/5250) macOS 多个 Entra MCP 服务器并发登录冲突 | 跨平台 Entra 认证均有问题 |
| 7 | [#3679](https://github.com/github/copilot-cli/issues/3679) BYOK Azure OpenAI 429 限流重试 ~0.15s 内耗尽，无有效退避 | 影响自托管/气隙环境可用性 |
| 8 | [#5367](https://github.com/github/copilot-cli/issues/5367) Agent 频繁丢失 MCP 工具 schema，需 /compact 恢复 | 用户称“每天都在挣扎”，稳定性问题 |
| 9 | [#4150](https://github.com/github/copilot-cli/issues/4150) permissions-config.json 含空格的 commandIdentifiers 仍需审批 | 权限白名单机制与文档不一致 |
| 10 | [#5371](https://github.com/github/copilot-cli/issues/5371) 自定义模型 provider 在 `--host-environment`/`--server` 模式下被忽略 | BYOK 高级用法受挫 |

**今日关闭**（可视为近期修复成效）：#5368（Windows sandbox 探针失败）、#4845（会话卡在 "In use"）、#4943（ask_user 表单 Esc 误丢弃）、#2731（@ 文件补全空格路径）、#5265（并发输入历史互相覆盖）。

---

## 🔧 重要 PR 进展

过去 24 小时仅 1 条 PR 更新：

- **[#5373](https://github.com/github/copilot-cli/pull/5373)** docs: 新增简体中文版 Copilot CLI README — 添加中文翻译及中英文导航链接，保留命令、配置键与产品名称，反映中文社区参与度提升。

> 今日无其他活跃 PR，开发重心可能在 v1.0.107 的发布与问题跟进上。

---

## 📈 功能需求趋势

1. **输入体验与多行编辑**：Shift+Enter 换行、可配置提交键（#2776、#1972、#3768）是呼声最高且持续最久的需求，尤其影响 IME 用户。
2. **MCP 生态稳定性**：Entra 认证（#5236、#5250、#5366）、工具 schema 丢失（#5367）、OAuth token 过期（#5366）等问题密集出现，MCP 已成为 Bug 与需求双高发区。
3. **模型与成本控制**：Claude 长 TTL 缓存（#5220）、Fusion 模式模型黑名单（#5369）、BYOK 重试策略（#3679）反映用户对成本与模型路由的可控性需求。
4. **可观测性与可定制性**：ACP 模式 OTel 缺失（#5376）、禁用内置斜杠命令（#5375）、hook 消息渲染（#5374）、上下文自动剪枝（#5362）。
5. **IDE / 多端集成**：`/code` 打开 VS Code 已落地，桌面 App 与 CLI 的功能一致性需求上升。

---

## ⚠️ 开发者关注点

- **认证摩擦**：Windows/macOS 的 Entra broker 缓存与并发登录问题，导致 MCP 用户每个进程都要重新认证，是当前最影响日常使用的痛点。
- **Fusion/Auto 模式成熟度**：输出扣留（#5370）、模型路由不可控（#5369）、5 小时会话重置后模型 400 错误（#5361），新模式仍在磨合期。
- **企业/自托管场景**：BYOK provider 在非交互模式被忽略、429 无退避、managed settings sandbox 探针问题，显示企业级场景测试覆盖不足。
- **长会话稳定性**：上下文膨胀、MCP schema 丢失、会话状态异常等问题在长时间使用中集中暴露，用户依赖 `/compact`、`/restart` 作为临时解法。
- **文档与发布透明度**：v1.0.106/107 说明重复引发困惑，社区期望更清晰的 changelog。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# 📰 OpenCode 社区动态日报 — 2026-11-07

## 1. 今日速览

OpenCode 发布 **v2.2.6**，核心亮点是 **MCP 连接池共享机制**，可跨项目复用同一连接，显著减少进程开销与启动时间。社区方面，免费层（Free tier）问题持续发酵（#59387 已累积 315 条评论），同时多位贡献者集中合入 TUI 体验修复。企业环境与多语言输出的相关问题成为新的关注焦点。

---

## 2. 版本发布

### [v2.2.6](https://github.com/anomalyco/opencode/releases)
- **Shared MCP Connections**：为 MCP 服务器启用连接池（pooling），相同配置的项目共享一条连接，减少进程数并加快启动（[#61185](https://github.com/anomalyco/opencode/pull/61185)）
- **GUI 插件主题与新增 Slots**：GUI 插件支持自定义主题及更多扩展插槽

---

## 3. 社区热点 Issues

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#59387](https://github.com/anomalyco/opencode/issues/59387) [zen] 免费层问题汇总帖 | **315 条评论**，集中报免费额度误报、重置失效、Desktop 版本受限等问题，是当前最热痛点 |
| 2 | [#40993](https://github.com/anomalyco/opencode/issues/40993) 支持 Agent Plugins 标准 | 21 👍，请求接入 vendor-neutral 的 agent-plugins.org 打包规范（Agent Skills + MCP），关系生态互通 |
| 3 | [#27110](https://github.com/anomalyco/opencode/issues/27110) 限制并行 subagent 数量 | 42 👍，本地模型用户受限于内存/上下文，亟需并行度上限配置 |
| 4 | [#48826](https://github.com/anomalyco/opencode/issues/48826) subagent 后台任务被提前标记完成 | 已复现的 V2 核心调度 bug：`background: true` 任务未结束即上报 completed，影响任务编排可靠性 |
| 5 | [#61511](https://github.com/anomalyco/opencode/issues/61511) Crouton Alpha 中途停转 | Agent 在多步任务中途停止需人工推动，已 triaging 后关闭 |
| 6 | [#59640](https://github.com/anomalyco/opencode/issues/59640) MCP 并行调用丢失会话头 | Streamable HTTP 会话恢复期间并发请求丢失 `Mcp-Session-Id`，MCP 稳定性核心问题 |
| 7 | [#62403](https://github.com/anomalyco/opencode/issues/62403) 企业内网 npm 镜像下更新超时 | 安装器硬编码 `registry.npmjs.org`，忽略 `.npmrc` 配置，企业用户升级受阻 |
| 8 | [#57844](https://github.com/anomalyco/opencode/issues/57844) / [#62411](https://github.com/anomalyco/opencode/issues/62411) GLM 多语言输出混入异形字符 | 俄语/波兰语回答中混入 CJK 字符，GLM-5.3-Flash 在多语言场景质量问题频出 |
| 9 | [#62415](https://github.com/anomalyco/opencode/issues/62415) Agent markdown 同时含 `name` 与 V2 `permissions` 时权限失效 | 兼容性陷阱：带 `name` 字段时 permissions 不生效，影响从 Claude Code 迁移的团队 |
| 10 | [#62138](https://github.com/anomalyco/opencode/issues/62138) `/goal` 在 undo 后永久卡队 | 已复现：undo 后 goal 保持 queued 永不执行，等待计时器也无法启动 |

---

## 4. 重要 PR 进展

| # | PR | 内容 |
|---|-----|------|
| 1 | [#62450](https://github.com/anomalyco/opencode/pull/62450) | v2.2.6 release PR，版本号与 changelog 回同步至 `dev` |
| 2 | [#62437](https://github.com/anomalyco/opencode/pull/62437) | **TUI 工具输出折叠**（`session.tool_details`），复活被 stale bot 关闭的 #42552，响应社区长期请求 |
| 3 | [#62444](https://github.com/anomalyco/opencode/pull/62444) | Code Mode VM 通过 flag registry 在 dev build 默认启用，移除手写开关 |
| 4 | [#62413](https://github.com/anomalyco/opencode/pull/62413) | 暴露字节码 VM 的 **suspendable program API**（VmRuntime.program/resume、Snapshot 等），为可暂停长任务打基础 |
| 5 | [#62248](https://github.com/anomalyco/opencode/pull/62248) | 修复 TUI 浅色终端下因缓存 palette 强制暗色主题的问题（#52457） |
| 6 | [#62250](https://github.com/anomalyco/opencode/pull/62250) | 修复 `description: [Tag] ...` 开头的 agent 被 YAML 静默丢弃的问题（#54200） |
| 7 | [#62245](https://github.com/anomalyco/opencode/pull/62245) | MCP OAuth 完成后返回列表页而非关闭对话框（#51060），改善多服务器认证流程 |
| 8 | [#62249](https://github.com/anomalyco/opencode/pull/62249) | grep 遇到非 UTF-8（Latin-1/GBK）匹配行时保留结果而非整体失败（#51912） |
| 9 | [#58846](https://github.com/anomalyco/opencode/pull/58846) | 修复已完成导入遗留的 V1 全局 sessions 归属问题（#49827），惠及已升级用户 |
| 10 | [#62446](https://github.com/anomalyco/opencode/pull/62446) / [#62443](https://github.com/anomalyco/opencode/pull/62443) | Console 文档更新：**Pulse Alpha Free 停止免费**，新增 **Iceman Free**（限时免费 stealth 模型） |

> 💡 值得注意：@Tarquinen 单日贡献 5 个高质量修复 PR（#62242/62244/62245/62248/62250），全部已合并。

---

## 5. 功能需求趋势

1. **MCP 生态与稳定性**：连接池（已落地）、OAuth 流程、并行调用会话恢复、Agent Plugins 标准支持 —— MCP 相关是最活跃方向
2. **TUI/桌面体验打磨**：工具输出折叠、主题跟随终端、模型收藏、项目删除、自定义标题栏
3. **Agent 编排与调度**：并行 subagent 限制、后台任务生命周期管理、goal/undo 交互、ACP 运行中会话注入消息
4. **插件与扩展 API**：Plugin 主题 slots、`session.synthetic` 的 idle-only 唤醒、agent permissions 声明
5. **多模型接入**：Ollama 本地模型兼容（模型列表缺失、工具调用不执行）、GLM 多语言质量

---

## 6. 开发者关注点（痛点）

- **免费层信任危机**：限额误报与重置失效长期未解，用户流失风险高
- **企业/内网环境**：安装器忽略 npm 镜像配置，"Allow always" 持久化静默覆盖 `ask` 规则，权限模型需更透明
- **V1→V2 迁移回归**：favorites、agent permissions、sessions 导入等多处兼容性破损
- **非英语输出质量**：GLM/DeepSeek 等多语言模型混入异形字符，社区呼吁输出语言守卫选项
- **多步任务可靠性**：agent 中途停转、goal 卡队、subagent 提前完成，长任务自治能力仍是短板
- **本地模型支持**：Ollama 模型识别与工具调用执行链路问题反复出现

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-11-07）

## 1. 今日速览

Qwen Code 发布 **v0.26.9**，重点改进 Skill 安装与激活体系（ZIP 上传、daemon API、TypeScript SDK、批量激活及恢复保护）。社区方面，两个 P1 级问题引发关注：**自动压缩导致 review-only skill 越权改写源码**（#16418）和 **workflow agent 权限审批永不渲染导致任务死锁**（#16425，修复 PR #16432 已就位）。PR 活跃度高，围绕 managed-agent 诊断、可观测性和 CI 安全加固有大量产出。

## 2. 版本发布

### v0.26.9
- **Skill 安装与激活增强**：支持 Skill ZIP 上传、daemon API、TypeScript SDK 支持、批量激活与恢复保护，大幅简化 Skill 的安装与管理流程
- 无已知破坏性变更
- 链接：https://github.com/QwenLM/qwen-code/releases

## 3. 社区热点 Issues

1. **#16424** [P1] Managed Agent gate CI 持续失败（“no test identified”），累计 **217 条评论**，是当前最顽固的 CI 问题，值得维护者优先攻坚。
   https://github.com/QwenLM/qwen-code/issues/14724

2. **#16418** [P1] **反复自动压缩后，review-only skill 越权实现源码**——安全/权限边界的严重问题，自动压缩丢失了 skill 的原始约束上下文，导致 agent 从“审阅”滑向“实现”。
   https://github.com/QwenLM/qwen-code/issues/16418

3. **#16425** [P1] Workflow agent 权限审批永不渲染，运行无限挂起（0.26.6/0.26.8 均可复现），状态栏显示“待审批”但无人能响应。修复见 PR #16432。
   https://github.com/QwenLM/qwen-code/issues/16425

4. **#13113** [P1] 长会话 transcript 快照二次方增长，超过硬编码的 256 MiB 索引上限后会话**完全无法打开**，影响长期使用者。
   https://github.com/QwenLM/qwen-code/issues/13113

5. **#15597** [P1] Headless `-p` 模式下自动记忆永远无法保存：隐式 deny 覆盖了 memory agent 的 scoped allow，记忆索引始终为空但仍在付费运行。
   https://github.com/QwenLM/qwen-code/issues/15597

6. **#15412** [P2] 长项目路径导致会话记录失败、会话列表损坏（macOS 上路径组件超限），修复见 PR #16477。
   https://github.com/QwenLM/qwen-code/issues/15412

7. **#16434** [P2] SDK 与 Web Shell 依赖存在已公开的安全通告，需要升级并重新发布 npm 包——供应链安全关注点。
   https://github.com/QwenLM/qwen-code/issues/16434

8. **#15495** [P2] 图片载荷驱逐（默认阈值 20）无关闭开关且未在设置 schema 中声明，长会话中图片被静默移出历史。
   https://github.com/QwenLM/qwen-code/issues/15495

9. **#15310** [P3] Windows 上未告知模型实际使用 cmd.exe，模型默认写 bash 命令导致每处失败浪费一整轮——Windows 体验的代表性痛点。
   https://github.com/QwenLM/qwen-code/issues/15310

10. **#16429** [讨论] 提议集成 bzmem 作为可选长期记忆服务（区分原始证据/用户事实/派生知识），记忆方向社区需求持续升温。
    https://github.com/QwenLM/qwen-code/issues/16429

## 4. 重要 PR 进展

1. **#16432** 修复 workflow agent 后台审批在交互式 TUI 中死锁：注册表在挂起审批前要求真实响应者（对应 #16425）。
   https://github.com/QwenLM/qwen-code/pull/16432

2. **#16477** 修复项目目录名压平为单个路径组件的越界问题（对应 #15412）。
   https://github.com/QwenLM/qwen-code/pull/16477

3. **#16438** 图片载荷驱逐支持关闭（阈值设 0 即永不改写），并补齐 `model.chatCompression` 设置声明（对应 #15495）。
   https://github.com/QwenLM/qwen-code/pull/16438

4. **#16475** Managed-agent 持久化会话诊断：Context / 模型统计 / 资源 / 子 agent 四个标签页的诊断对话框。
   https://github.com/QwenLM/qwen-code/pull/16475

5. **#16498** 执行诊断与 agent 关系图：持久化工具与 Skill 使用记录、原生文件操作和行数变更度量、授权 agent 关系视图。
   https://github.com/QwenLM/qwen-code/pull/16498

6. **#16436** 左方向键打开 Agent View（Claude Code 风格后台会话花名册），并修复其在 Windows 上的可用性。
   https://github.com/QwenLM/qwen-code/pull/16436

7. **#16494 / #16482** CI 安全加固：publish-triage checkout 前重建 git 元数据；review/resolve 权限门控路由至自托管 ECS 池。
   https://github.com/QwenLM/qwen-code/pull/16494 | https://github.com/QwenLM/qwen-code/pull/16482

8. **#16439** 会话恢复时重放持久化的启动 prelude（日期、目录树、git 快照等不再按当前时间重建），提升恢复一致性。
   https://github.com/QwenLM/qwen-code/pull/16439

9. **#16495** 遥测新增 OpenRouter 路由后端与 generation id 属性（对应 #14629）。
   https://github.com/QwenLM/qwen-code/pull/16495

10. **#15701** [已合并] sed 模拟修复：`.` 现可匹配 `\r`，字符类按 Unicode 语义处理，与真实 sed 行为对齐（对应 #15675）。
    https://github.com/QwenLM/qwen-code/pull/15701

## 5. 功能需求趋势

- **会话管理与长会话稳定性**：transcript 膨胀（#13113）、路径问题（#15412）、启动 prelude 重放（PR #16439）、后台 shell 状态残留（#15800）——最高频方向。
- **记忆系统**：headless 自动记忆失效（#15597）、bzmem 集成提案（#16429）、Holo 个人记忆 PR（#16488），长期记忆生态活跃。
- **可观测性与遥测**：会话诊断（#16475/#16498）、OpenRouter 路由属性（#16495）、cache-write token 统计缺失（#15414）。
- **多 Agent / Workflow**：Agent View（#16436）、审批 UI 死锁（#16425）、后台视图 UX 边界（#16444）。
- **Skill 体系**：v0.26.9 的安装/激活增强 + skill 越权问题（#16418），权限边界成为新焦点。
- **Web Shell 体验**：内联分支讨论（#16474）、auto-recap 设置失效（#13911）、GitHub 事件过滤（PR #16493）。

## 6. 开发者关注点

- **权限模型可靠性是当前最大痛点**：从 skill 越权（#16418）、审批死锁（#16425）到 headless 记忆被 deny（#15597），权限请求的可达性与边界一致性亟需系统性梳理。
- **长会话退化**：token/索引无限增长、图片驱逐不可控、压缩导致上下文丢失，说明长跑稳定性是生产用户的核心关切。
- **CI 治理**：CI 失败机器人报告（#14724、#16191）长期刷屏，团队正通过 #16319、#16494 等 PR 精简报告与加固发布流水线。
- **Windows 一等公民化**：shell 假定 bash（#15310）、Agent View Windows 兼容（PR #16436）显示 Windows 体验仍是短板。
- **供应链安全**：已发布 npm 包依赖存在安全通告（#16434），提示用户关注版本升级节奏。

---
*数据来源：github.com/QwenLM/qwen-code（过去 24 小时）*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*