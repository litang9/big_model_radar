# AI CLI 工具社区动态日报 2026-11-20

> 生成时间: 2026-11-20 01:45 UTC | 覆盖工具: 7 个

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
**数据日期：2026-11-20**

---

## 一、生态全景

AI CLI 工具已全面进入 **Agent 化、平台化**阶段：subagent/多代理编排（Codex、Gemini CLI、OpenCode）、多机器多账号协作（OpenCode machines、Qwen Managed Agent）成为头部工具的核心投入方向。同时，**Windows 桌面端质量滞后**几乎成为行业通病（Claude Code、Codex、Gemini CLI、OpenCode 均有高危 Windows issue）。安全与信任问题从“功能需求”升级为“结构性风险”——安全过滤器误报（Claude Code）、密钥脱敏缺失（OpenCode）、MCP 信任边界绕过（Qwen）集中爆发。模型快速迭代（GPT-6.2、Gemini 4 Neon、Claude fable）带来的兼容性摩擦也在同步放大。

---

## 二、各工具活跃度对比

| 工具 | 今日热点 Issues | 重要 PR 更新 | Release | 本日焦点 |
|---|---|---|---|---|
| **Claude Code** | 10（含批量关闭 ~20 条） | 1 | v2.1.329 | Hooks 可观测性落地；Windows 三大 issue 发酵；安全过滤器误报批量关闭 |
| **OpenAI Codex** | 10 | 15+ | rust-v0.171.0 正式版 + 2 预览版 | 新模型 GPT-6.2 Sol 设为默认；Guardian 策略体系重构；TUI 工作区默认启用 |
| **Gemini CLI** | 10+ | 10 | v0.70.0 + v0.71.0-preview.0 + nightly | Subagent 可靠性两大 P1；Windows PowerShell 冻结修复；`/stats heatmap` 上线 |
| **GitHub Copilot CLI** | 10 | 1 | v1.0.115-1 | MCP OAuth 修复；授权疲劳与上下文估算问题 |
| **Kimi Code CLI** | 0 | 0 | 无 | 过去 24 小时无公开活动 |
| **OpenCode** | 10 | 10 | 无（#64784 发布推进中） | 多机器协作、Claude 多账号轮换；两个高危安全问题 |
| **Qwen Code** | 10+ | 13+ | 无 | CI/CD 治理密集；MCP 信任绕过 P1；阿拉伯语 RTL 支持 |

**小结**：Codex 节奏最快（正式版+预览版+15 条 PR 合入）；Gemini CLI 与 Qwen Code PR 吞吐量高；Claude Code 与 Copilot CLI 处于“发布后观察期”，PR 更新少可能意味着主线在内部分支推进。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **Subagent / 多代理可靠性** | Gemini CLI（P1 挂起 #21409、误报成功 #22323）、Codex（subagent 转录视图）、OpenCode（子代理幻觉 #63785）、Qwen（agent loop 统一迁移） | 子代理挂起、失败误报为成功、等待期编造答案——多代理“可信度”是全行业未解问题 |
| **上下文 / Token 效率** | Codex（MCP 目录撑爆上下文 #61679）、Gemini CLI（AST 感知读取 #22745、36.6k tokens/turn 基线）、Copilot CLI（PDF 体积估算失准 #5517、128K 硬编码预算 #4310）、Qwen（token 重复计算 #15486） | 工具目录膨胀、粗暴压缩、估算失准三类问题普遍存在 |
| **MCP 生态健壮性** | Codex（OAuth 401、目录加载失败）、Copilot CLI（OAuth 刷新链路，最高频痛点）、Qwen（elicitation 支持、连接误报）、Gemini CLI（>128 工具 400 错误） | OAuth 认证与工具目录管理是 MCP 落地的两大卡点 |
| **Windows 平台质量** | Claude Code（前三 issue 全为 Windows）、Codex（项目消失 #61294）、Gemini CLI（PowerShell 冻结、`~\` 路径）、OpenCode（权限绕过 #65008） | 进程泄漏、路径解析、同步失败、权限失效全面存在 |
| **权限/安全模型精细化** | Claude Code（过滤器误报 ~20 条）、Copilot CLI（授权疲劳 #1168）、Qwen（AUTO 模式信任绕过 #17854）、OpenCode（密钥脱敏 #64750） | “一刀切拦截”与“静默绕过”两个极端同时存在 |
| **静默失败治理** | Claude Code（hooks 静默失败、Cowork stale write）、Qwen（hook 输出静默丢弃 #17890）、Gemini CLI（telemetry 事件丢失） | “报成功但实际没生效”被普遍认为比直接报错更危险 |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 企业级安全透明度（hooks 信任链）、Desktop/Cowork 集成 | 专业开发者、Anthropic 生态深度用户 | 闭源 monorepo，供应链安全优先；fork PR 防护显示对 CI 滥用的警惕 |
| **Codex** | 新模型快速接入（GPT-6.2 Sol 默认）、Guardian 安全策略、TUI 工作区 | OpenAI 订阅用户、ChatGPT 跨端用户 | Rust 重写 + app-server 架构，工程迭代速度最快 |
| **Gemini CLI** | 开放架构（ACP 协议）、可观测性（/stats heatmap）、AST 感知工具链探索 | 开发者生态、Google Cloud 用户 | 开源 TypeScript，社区驱动 + 前沿架构实验 |
| **Copilot CLI** | GitHub 原生集成、BYOK、企业权限模型 | GitHub 平台存量用户、企业 | 深度绑定 GitHub 工作流，发布节奏平缓 |
| **OpenCode** | Provider 无关、多账号/多机器协作、Code Mode | 多模型重度用户、成本敏感的 power user | 开源、激进的功能实验（账号轮换、免登录浏览器） |
| **Qwen Code** | Managed Agent、DingTalk/GitHub 多通道、国际化（RTL） | 国内企业协作场景、多通道接入 | 大规模架构收敛（agent loop + event-bus），CI 治理投入重 |
| **Kimi Code CLI** | — | — | 今日无活动，生态活跃度暂处低位 |

---

## 五、社区热度与成熟度

- **第一梯队（高活跃 + 快迭代）**：Codex、Gemini CLI——版本发布频繁、PR 合入量大、issue 讨论深度高。
- **第二梯队（高热度 + 稳态迭代）**：Claude Code、OpenCode——issue 反馈密集（Windows、安全），功能实验激进（多机器、账号轮换），但版本节奏相对克制。
- **第三梯队（平台绑定型）**：Copilot CLI——热度集中于 MCP OAuth 与权限模型，PR 活动少，主线可能内部分支推进。
- **垂直深耕型**：Qwen Code——CI 治理与架构收敛投入大，社区信号偏内部工程化，Managed Agent 方向独特但国际社区声量有限。
- **Kimi Code CLI**：今日零活动，活跃度明显落后。

成熟度信号：Claude Code 与 Copilot CLI 的高热度 issue 多为 bug 修复类（说明用户基数大、进入维护期）；Gemini CLI 与 OpenCode 的 issue 中架构级 enhancement 占比高（说明仍处快速演进期）。

---

## 六、值得关注的趋势信号

1. **“静默失败”成为头号信任杀手**：Claude Code 的 Cowork stale write、Gemini CLI 的 MAX_TURNS 误报成功、Qwen 的 hook 输出丢弃——三家不约而同投入修复。**参考价值**：构建 Agent 自动化流水线时，必须对“成功状态”做独立校验，不能信任工具的自报告。

2. **安全模型从“过滤”走向“分级信任”**：Claude Code 的过滤器误报批量关闭、Copilot 的授权疲劳、Qwen 的 MCP 信任绕过，共同指向“粗粒度拦截不可持续”。**参考价值**：评估工具时应关注其权限决策是否可审计、可解释（Qwen #17715 已明确提出此需求）。

3. **多账号/多机器协作是成本压力的产物**：OpenCode 的 Claude 账号自动轮换、限额加速消耗 issue（#61072）、会话自动恢复烧 token（#56032）反映订阅制的隐性成本问题。**参考价值**：token 计量与配额监控应纳入团队工具选型评估项。

4. **Subagent 可视化与可信度是下一竞争点**：Codex 的 subagent 转录视图、Gemini CLI 的轨迹可视化需求、OpenCode 用 `<system-notice>` 防伪造——多代理的可观测性正在从“加分项”变为“必需品”。

5. **模型目录稳定性成为工程债**：Claude 改名导致 OpenCode 报 model not found、Codex 新模型引发 invalid_prompt、DeepSeek/Ollama 归一化踩坑——模型快速迭代与工具链的兼容性摩擦将持续存在。**参考价值**：生产环境锁定模型 ID 快照，延迟 1-2 周跟进新模型。

6. **Windows 一致性滞后是系统性问题而非个案**：四大工具同时出现 Windows 高优先级 issue。Windows 优先的团队应在选型时显著调低对各工具 Windows 支持的预期，或考虑 WSL 隔离方案。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-20）

## 一、热门 Skills 排行（按 PR 关注度）

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** — [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 header 传递方式，修复连接脚本兼容性，是 MCP 生态升级的关键适配 | OPEN |
| 2 | **skill-creator 触发评测隔离** — [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 Windows 下 select() 失败、并行 worker 竞争导致的假阴性触发率——与 Issue [#556](https://github.com/anthropics/skills/issues/556)（0% 触发率）和 [#1352](https://github.com/anthropics/skills/issues/1352) 直接呼应，是元工具类最痛的问题 | OPEN |
| 3 | **notion-spec-to-implementation + quantitative-resume-auditor** — [#1245](https://github.com/anthropics/skills/pull/1245) | 将产品/技术规格自动拆解为 Notion 任务（含验收标准与进度跟踪）；附带简历量化审计 Skill | OPEN |
| 4 | **webapp-testing 安全加固** — [#1980](https://github.com/anthropics/skills/pull/1980) | 消除 `shell=True` 命令注入风险（CWE-78）；同 Skill 另有元素发现修复 [#1976](https://github.com/anthropics/skills/pull/1976) | OPEN |
| 5 | **pyxel 复古游戏开发** — [#525](https://github.com/anthropics/skills/pull/525) | 由 Pyxel 作者本人提交，覆盖实现引导、无头运行与帧检查，存活 8 个月仍在更新 | OPEN |
| 6 | **document-typography** — [#514](https://github.com/anthropics/skills/pull/514) | 控制文档孤行、寡段、编号错位等 AI 生成文档通病，切中普遍痛点 | OPEN |
| 7 | **md2video-audio** — [#1703](https://github.com/anthropics/skills/pull/1703) | 零成本将 Markdown 编译为带拟真配音的 MP4 视频 | OPEN |
| 8 | **docx/xlsx 文档技能修复群** — [#1792](https://github.com/anthropics/skills/pull/1792)、[#2019](https://github.com/anthropics/skills/pull/2019) | LibreOffice 超时误报成功、外部链接误报等正确性问题，文档技能是修 bug 最密集的板块 | OPEN |

## 二、社区需求趋势（来自 Issues）

1. **安全与信任边界**：[#492](https://github.com/anthropics/skills/issues/492)（46 评论，最高热度）——社区 Skill 冒充 `anthropic/` 命名空间，用户在不知情下授予高权限。
2. **组织级 Skill 共享**：[#228](https://github.com/anthropics/skills/issues/228)——要求原生组织共享库，替代 Slack 传 .skill 文件的手工流程。
3. **评测与可靠性工具**：skill-creator 的触发评测系统性失真（[#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)），社区强烈要求可靠的 Skill 触发验证。
4. **上下文/token 效率**：[#1487](https://github.com/anthropics/skills/issues/1487)——claude-api 单次注入 156k token 耗尽上下文；[#202](https://github.com/anthropics/skills/issues/202) 要求 skill-creator 写法更省 token。
5. **新方向提案**：compact-memory 紧凑记忆符号（[#1329](https://github.com/anthropics/skills/issues/1329)）、推理质量门禁流水线（[#1385](https://github.com/anthropics/skills/issues/1385)）、agent-governance 安全治理（[#412](https://github.com/anthropics/skills/issues/412)）。
6. **安装与去重体验**：插件重复安装相同 Skill（[#189](https://github.com/anthropics/skills/issues/189)）、Skill 神秘丢失（[#62](https://github.com/anthropics/skills/issues/62)）。

## 三、高潜力待合并 Skills

- **[#1298](https://github.com/anthropics/skills/pull/1298)** skill-creator 评测隔离修复——对应两个高热度 Issue，需求最迫切。
- **[#1742](https://github.com/anthropics/skills/pull/1742)** mcp-builder 兼容 mcp>=2——阻断性兼容问题，随 MCP 2.x 普及优先级上升。
- **[#1997](https://github.com/anthropics/skills/pull/1997)** skill-creator YAML frontmatter 解析修复——小而关键，作者 BichengWang 同时在修 docx（#2018）。
- **[gerardrecinto 修复三连](https://github.com/anthropics/skills/pull/1975)**（#1975/#1976/#1977）——均为对应 Issue 的一对一小修复，合并阻力最低。
- **[#1681](https://github.com/anthropics/skills/pull/1681)** package_skill.py 直执行修复——11 月 19 日仍活跃更新。

## 四、生态洞察

**当前社区最集中的诉求是“可信与可靠”：Skill 分发的命名空间安全（#492）、触发评测的真实性（#556/#1352）、以及文档/MCP 类官方 Skill 的正确性修复，均指向让 Skills 生态从“能用”走向“可信赖”。**

---

# Claude Code 社区动态日报 · 2026-11-20

---

## 📌 今日速览

今日 Claude Code 发布 **v2.1.329**，重点加强了 hooks 的透明度与可观测性（信任对话框与加载失败警告）。社区方面，Windows 平台问题持续发酵：Cowork 数据丢失、Desktop 进程泄漏、Code 标签页提前结束回合三大 issue 讨论热烈；同时一批 cybersecurity 安全过滤器误报的历史 issue 被批量关闭。

---

## 🚀 版本发布：v2.1.329

- 新增信任对话框警告，显示文件夹 hooks 的声明来源位置
- 在 Claude Desktop 及其他非交互式宿主中，当托管设置里的 hooks 加载失败时，会在对话中给出警告
- 新增显示本会话的定时任务（scheduled tasks）、`/loop` 唤醒记录及目标信息

> 点评：这批更新明显针对 hooks 配置的调试体验和供应链安全透明度，回应了社区对 hooks 静默失败的长期抱怨。

---

## 🔥 社区热点 Issues

1. **Cowork 静默数据丢失：device_commit_files 写入滞后一个 commit**（#93482，28 评论）
   覆盖写入报告成功但磁盘内容落后整整一次提交，且 mtime 是新的——典型的静默 stale write，对数据完整性威胁极大，有稳定复现，带 data-loss 标签但至今未修复。
   https://github.com/anthropics/claude-code/issues/93482

2. **Desktop Code 标签页：next-step box 在回复写入前结束回合**（#102132，23 评论，28 👍）
   `wrap_up` + `ask` 组合导致模型回复被截断， 👍 数今日最高，用户实际影响面广。
   https://github.com/anthropics/claude-code/issues/102132

3. **Windows 上 claude.exe 进程累积不释放，全天高 RAM/磁盘占用**（#96299，13 评论）
   会话关闭后后台进程不终止，随 Desktop 运行时间持续累积，长期使用体验严重劣化。
   https://github.com/anthropics/claude-code/issues/96299

4. **Claude in Chrome 的 file_upload 工具在新会话中缺失**（#105868，7 评论）
   作者多次更新：问题反复，目前仅在自动审批模式下可用，且伴随 3.8 MB 的异常 payload。
   https://github.com/anthropics/claude-code/issues/105868

5. **批量关闭的 Safeguard cyber 误报系列**（#94092–#94159，均为 Closed）
   @sworrl 于 9 月集中提交的约 20 条安全过滤器误报（固件烧录、lint、TLS 配置、服务器加固等均被拦截并 session-halted）今日全部关闭，标记 duplicate——说明上游已有统一跟踪 issue。这是社区对安全过滤过激的强烈信号。
   https://github.com/anthropics/claude-code/issues/94092

6. **Fable usage reset 单次点击消耗两次配额**（#108822，4 评论）
   计费类 bug：点击一次重置，可用次数从 2 直接归零，涉及用户实际权益。
   https://github.com/anthropics/claude-code/issues/108822

7. **固件烧录/微控制器开发被 Safeguard 阻断**（#94159，Closed）
   嵌入式开发场景误报的代表案例，severity 标记为 session-halted（阻断授权工作）。
   https://github.com/anthropics/claude-code/issues/94159

8. **防御性安全修复提交被拦截**（#94157，Closed）
   修复安全漏洞的 commit 反而触发拦截，凸显过滤器对“防御性安全工作”的识别不足。
   https://github.com/anthropics/claude-code/issues/94157

9. **服务器加固期间的本地备份文件搜索被阻断**（#94141，Closed）
   defensive-hardening 域名仍被误拦，反映分类启发式精度问题。
   https://github.com/anthropics/claude-code/issues/94141

10. **DNS API 凭证配置 TLS 证书被拦截**（#94140，Closed）
    crypto-secrets 域名误报案例，正常的证书自动化流程被 session-halted。
    https://github.com/anthropics/claude-code/issues/94140

---

## 🔧 重要 PR 进展

过去 24 小时仅更新 **1 条 PR**：

- **#111198 Don't run @claude mentions on pull requests from forks**（@mhegazy，11-19 创建）
  来自 TypeScript 团队核心成员的提交：fork 来源的 PR 不再触发 `@claude` mention 自动运行，属于安全与成本防护措施，防止外部 fork 滥用 CI 中的 Claude 调用。
  https://github.com/anthropics/claude-code/pull/111198

---

## 📈 功能需求趋势

- **Hooks 可观测性** ✅ 部分落地：v2.1.329 的信任对话框与失败警告直接响应了这一需求
- **数据完整性 / 写入可靠性**：Cowork 的静默 stale write 是当前最高风险项，社区期待优先修复
- **安全过滤器精细化**：嵌入式/固件/防御性安全开发场景需要白名单或更智能的分类
- **Windows 平台资源管理**：进程生命周期管理是 Windows Desktop 用户的持续性诉求

---

## ⚠️ 开发者关注点

1. **静默失败是最大痛点**：从 hooks 加载失败到 Cowork stale write，用户反复强调“报成功但实际没生效”比直接报错更危险
2. **Windows 生态质量滞后**：今日热度前三的 issue 全部标注 `platform:windows`，Windows Desktop/Code tab 的稳定性与资源管理明显落后
3. **安全过滤误伤合法工作流**：嵌入式开发、安全加固、基础设施运维等领域的专业开发者被高频阻断，关闭为 duplicate 说明官方在集中处理，但尚无明确修复时间表
4. **计费/配额可靠性**：reset 配额双扣问题提示 usage 计量逻辑需加固
5. **回合完整性**：Code tab 的 UI 时序问题导致回复丢失，影响对模型输出正确性的信任

---

*数据截至 2026-11-20，来源：github.com/anthropics/claude-code*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-20** | 数据来源：github.com/openai/codex

---

## 📰 今日速览

Codex 发布 **rust-v0.171.0 正式版**，GPT-6.2 Sol/Astra 进入模型目录并将 Sol 设为默认，TUI 工作区（含文档预览、图片预览、子代理转录）默认启用。过去 24 小时仓库合入大量 PR，集中在 **Guardian 策略体系、线程上下文 ID 重构、app-server 性能与稳定性**。Issue 侧，桌面端（尤其 Windows 版）的会话/项目同步与沙盒权限问题持续发酵，其中音频工具输出导致 HTTP 400 的新 bug 讨论热烈。

---

## 🚀 版本发布

### rust-v0.171.0（正式版）
- **新模型**：模型目录新增 GPT-6.2 Sol 和 Astra，**Sol 成为默认选择**（#62106）
- **TUI 工作区默认启用**：支持可搜索文档预览、图片预览，以及与主对话并行的子代理（subagent）转录视图（#61352, #61888, #61889, #61919）
- 另发布 **rust-v0.172.0-alpha.2** 和 **rust-v0.171.0-alpha.13.1** 两个预览版

---

## 🔥 社区热点 Issues（Top 10）

| # | Issue | 为什么值得关注 |
|---|-------|---------------|
| 1 | [#25319](https://github.com/openai/codex/issues/25319) VS Code 聊天按工作区/项目隔离 | 👍139、61 评论的长期热门需求，IDE 扩展的用户强烈希望聊天历史不要跨项目泄漏 |
| 2 | [#62212](https://github.com/openai/codex/issues/62212) 桌面端音频工具输出导致后续纯文本轮次 HTTP 400 | 新模型 Sol + 音频输出的兼容性 bug，28 条评论，影响会话可用性 |
| 3 | [#25737](https://github.com/openai/codex/issues/25737) CLI 登录强制短信 OTP，绕过硬件安全密钥 | 高级账户安全（AAS）用户被降级到 SMS 验证，安全体验倒退，24 条评论 |
| 4 | [#47041](https://github.com/openai/codex/issues/47041) GPT-5.6 Sol / GPT-6 Astra 误拒无害提示（invalid_prompt） | 模型行为问题，影响 Windows 桌面端正常使用 |
| 5 | [#32519](https://github.com/openai/codex/issues/32519) ChatGPT–Codex 共享项目上下文与双向任务交接 | 移动端讨论 → 桌面端实现的工作流打通，是高频工作流诉求 |
| 6 | [#61294](https://github.com/openai/codex/issues/61294) Windows 更新后本地项目消失但聊天仍在 | 26.1111 版本数据一致性 bug，升级即丢项目入口，影响面广 |
| 7 | [#61679](https://github.com/openai/codex/issues/61679) Apps 工具目录全量随请求发送，撑爆上下文并循环压缩 | 新会话直接超出上下文窗口的架构级问题 |
| 8 | [#33581](https://github.com/openai/codex/issues/33581) TUI 复制代码块带左侧填充空格 | ✅ 已关闭——粘贴脚本/YAML 出错的老问题终于修复，社区好评 |
| 9 | [#54691](https://github.com/openai/codex/issues/54691) Full Access 模式实际仍为 workspace-write，阻断 Xcode 服务 | 沙盒报告与实际权限不一致，影响 macOS 原生开发工作流 |
| 10 | [#62631](https://github.com/openai/codex/issues/62631) MCP 目录反复加载失败（mcpServerStatus/list 不支持） | 今日新报，日志中 156 次重复告警，暴露 app-server 方法协商缺陷 |

---

## 🔧 重要 PR 进展（Top 10）

| # | PR | 内容 |
|---|-----|------|
| 1 | [#62589](https://github.com/openai/codex/pull/62589) | 移除请求与 rollout 中的累计 MCP 归因数据，直接缓解 #61679 的上下文膨胀问题 |
| 2 | [#62607](https://github.com/openai/codex/pull/62607) | 修复配置显式 Guardian provider 时 Guardian V2 评分被禁用的问题 |
| 3 | [#62614](https://github.com/openai/codex/pull/62614) | 配置重载/账户切换时刷新 Guardian 策略，运行中线程即时生效 |
| 4 | [#62627](https://github.com/openai/codex/pull/62627) | Guardian 模型目录获取失败时后台重试，不阻塞工具调用 |
| 5 | [#30963](https://github.com/openai/codex/pull/30963) | 审批响应按待处理授权验证，堵住“exec 响应消费 patch 等待者”的越权边界（已开放数月的长期 PR，仍在推进） |
| 6 | [#62633](https://github.com/openai/codex/pull/62633) / [#62635](https://github.com/openai/codex/pull/62635) | 线程上下文 ID 分配集中化到 `ThreadContextIds`，统一 response item 与 context window ID 生成 |
| 7 | [#62599](https://github.com/openai/codex/pull/62599) | `fs/readFile` 改为 stdio 流式响应，避免大文件 base64+JSON 双份内存分配 |
| 8 | [#62636](https://github.com/openai/codex/pull/62636) | 优化线程列表的 rollout 扫描开销，缓解 #60187 一类性能问题 |
| 9 | [#62593](https://github.com/openai/codex/pull/62593) | Windows 沙盒登录策略失败时给出可读错误说明（如 `ERROR_LOGON_TYPE_NOT_GRANTED`） |
| 10 | [#62609](https://github.com/openai/codex/pull/62609) | 线程恢复时对 app-server 请求重放施加背压，防止慢客户端撑爆出站队列 |

其他值得注意：[#62615](https://github.com/openai/codex/pull/62615)（执行策略拆分独立 crate，剥离 Starlark 解析器依赖）、[#62601](https://github.com/openai/codex/pull/62601)（exec-server 瞬时连接失败自动重试）、[#62621](https://github.com/openai/codex/pull/62621)（rollout 预算决策下沉到各记账路径）。

---

## 📈 功能需求趋势

1. **工作区/项目感知**：VS Code 聊天按项目隔离（#25319）、ChatGPT 项目上下文共享（#32519、#59070）、侧边栏按项目分组（#31561）——跨端项目一致性是呼声最高的方向
2. **CLI/TUI 与桌面端能力对齐**：不依赖桌面 App 将计算机接入 dot（#56601，👍13），CLI 用户要求同等远程能力
3. **多代理与智能路由**：任务感知的多 Agent 编排与模型自动路由（#62394），与 0.171.0 的 subagent 工作区发布方向契合
4. **沙盒权限精细化**：Full Access 实际生效（#54691）、config.toml 权限配置被忽略（#58507）、权限选择器消失（#60109）
5. **新模型适配**：GPT-6.2 Sol/Astra 接入后伴随的 invalid_prompt 误拒、音频输出兼容等问题集中出现

---

## ⚠️ 开发者关注点（痛点总结）

- **Windows 桌面端质量**：项目消失（#61294）、项目侧边栏不同步（#45735）、聊天跨端缺失（#60941）、WSL 探测耗尽磁盘（#54509）、代理下 WebSocket 超时（#38768）——Windows 是当前 bug 密度最高的平台
- **MCP 生态健壮性**：工具目录撑爆上下文（#61679）、OAuth 401 元数据解析失败（#47756）、目录加载失败（#62631）
- **认证与安全**：CLI 登录绕过 FIDO2 硬件密钥（#25737）令安全敏感用户不满
- **远程/Dots 稳定性**：Dots 连接后命令挂起（#61836）、云工作区离线（#60856）、移动端错误拦截 Codex Cloud（#30417）
- **性能**：桌面端渲染卡顿与进程树臃肿（#60187）虽有个别 PR 缓解，仍是持续关注点

---
*本报告基于过去 24 小时 GitHub 公开数据自动汇总，仅供参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-11-20）

## 📰 今日速览

Gemini CLI 今日发布 **v0.70.0 正式版**、**v0.71.0-preview.0 预览版**及对应 nightly 版本，v0.71 新增 `/stats` heatmap 子命令用于可视化每日 token 用量。社区侧，Agent 子代理（subagent）可靠性问题仍是讨论焦点——包括 MAX_TURNS 中断被误报为成功（#22323）和通用代理挂起（#21409）两个 P1 问题持续活跃。PR 方面，Windows 体验显著改善：PowerShell 解析异步化修复 UI 冻结（#30334）、`~\` 路径解析修复（#30376）等陆续合入。

---

## 🚀 版本发布

**v0.70.0（正式版）**
- 汇总 v0.68 / v0.69 / v0.70 系列变更，含多个 changelog 合入
- [Release 链接](https://github.com/google-gemini/gemini-cli/releases)

**v0.71.0-preview.0**
- v0.70.0 changelog 合入、版本 bump 等发布准备工作

**v0.71.0-nightly.20261120.gd4cb1713f**
- `fix(core,cli)`: 修复模板占位符替换时字面量 `$` 字符被破坏的问题（[PR #30136](https://github.com/google-gemini/gemini-cli/pull/30136)）
- `feat(cli)`: 新增 `/stats heatmap` 子命令，以热力图展示每日 token 使用量
- [Release 链接](https://github.com/google-gemini/gemini-cli/releases)

---

## 🔥 社区热点 Issues Top 10

| # | Issue | 为什么重要 |
|---|-------|-----------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 触发 MAX_TURNS 后误报为 GOAL 成功 | **P1**。`codebase_investigator` 明明因轮次上限中断却返回 `success`，掩盖真实失败，直接影响任务可信度。13 条评论，今日更新 |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) 通用代理挂起 | **P1**，8 👍。子代理挂起可长达 1 小时，仅靠提示词绕过，用户体验严重受损 |
| 3 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 事后意图路由 | 大型 enhancement 方向：让 Gemini 3 发挥原生 bash 能力的同时保障安全，9 条评论持续讨论 |
| 4 | [#28159](https://github.com/google-gemini/gemini-cli/issues/28159) Homebrew 安装方式争议 | 非官方 tap 却被列为推荐安装方式，建议移除或提供官方 tap，8 条评论 |
| 5 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) browser subagent 在 Wayland 下失败 | **P1**，Linux Wayland 用户浏览器代理完全不可用 |
| 6 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知的文件读取/搜索/映射 EPIC | 架构级探索：用 AST 精确读取方法边界，减少 token 浪费与错位读取 |
| 7 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) 模型几乎不主动使用 skills 和 subagents | 用户痛点：即使有高度相关的自定义 skill，模型也不会自主调用 |
| 8 | [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) get-shit-done output hook 导致崩溃 | **P1**，输出总结阶段反复崩溃 |
| 9 | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 配置（如 maxTurns） | 配置合并逻辑存在缺陷，`AgentRegistry` 读取正确但代理不生效 |
| 10 | [#29360](https://github.com/google-gemini/gemini-cli/issues/29360) `web_fetch` 丢失页面所有表格 | 新问题（未 triage）：`html-to-text` 未传 table selector 导致表格内容完全丢失 |

其他值得留意：[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)（>128 工具时 400 错误）、[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)（symlink 的 agent 文件不被识别）。

---

## 🔧 重要 PR 进展 Top 10

1. **[#30334](https://github.com/google-gemini/gemini-cli/pull/30334)**（已合入）✅ Windows PowerShell 命令 AST 解析改为异步，修复 Thinking spinner 多秒冻结——Windows 体验重大修复
2. **[#30370](https://github.com/google-gemini/gemini-cli/pull/30370)**（已合入）✅ 修复 `.gitignore` 在 `dir/**` 通配模式下嵌套否定规则的解析错误
3. **[#30368](https://github.com/google-gemini/gemini-cli/pull/30368)**（OPEN）ACP 协议新增 `session/close` 支持，客户端可在进程退出前释放会话资源
4. **[#30376](https://github.com/google-gemini/gemini-cli/pull/30376)**（OPEN）修复 Windows 下 `~\` 反斜杠路径不展开的问题，影响策略路径、扩展注册表等
5. **[#30156](https://github.com/google-gemini/gemini-cli/pull/30156)**（已合入）✅ 修复 chat compression 事件在 OTel SDK 未就绪时丢失——telemetry 事件先缓冲再发送
6. **[#30157](https://github.com/google-gemini/gemini-cli/pull/30157)**（已合入）✅ `safeJsonStringify` 只在真正循环引用时替换 `[Circular]`，修复误判共享数组的场景
7. **[#30154](https://github.com/google-gemini/gemini-cli/pull/30154)**（已合入）✅ ACP 模式进入前 flush stdio 缓冲，避免崩溃/SIGKILL 时 hook 警告丢失
8. **[#30136](https://github.com/google-gemini/gemini-cli/pull/30136)**（已合入，随 nightly 发布）✅ 模板占位符替换保留字面量 `$`
9. **[#30239](https://github.com/google-gemini/gemini-cli/pull/30239)**（OPEN）修复 tier alias（flash/pro 等）解析到首个模型时丢失自定义 `generateContentConfig`
10. **[#30375](https://github.com/google-gemini/gemini-cli/pull/30375)**（OPEN，P1）批量修复文档内部死链；配套 [#30372](https://github.com/google-gemini/gemini-cli/pull/30372) 修复 skills 文档锚点

---

## 📈 功能需求趋势

从 Issue 分布看，社区关注集中在以下方向：

1. **Agent/子代理架构（绝对主导，占 Issue 大半）**：并行子代理协作（#18287）、共享内存（#18287）、基于文件的持久化任务追踪替代 WriteToDo（#18836）、子代理轨迹可视化（#22598）、通过 settings.json 发现子代理（#18285）
2. **代码理解与 token 效率**：AST 感知工具链（#22745、#22746）、"Tactful Extraction" 精准读取以对抗上下文膨胀（#19561，基线 36.6k tokens/turn）
3. **安全与沙箱**：OS 级零依赖沙箱（#19873）、阻止破坏性 git/DB 操作（#22672）
4. **Windows / 跨平台支持**：PowerShell、路径分隔符、Wayland 浏览器代理等修复需求密集
5. **可观测性**：token 用量热力图（已落地 `/stats heatmap`）、/bug 报告包含子代理上下文（#21763）

---

## ⚠️ 开发者关注点（痛点总结）

- **子代理可靠性是最大痛点**：挂起（#21409）、误报成功（#22323）、不主动调用（#21968）三类问题叠加，用户对 subagent 信任度低
- **状态误报危害大**：中断被包装成 `GOAL` 成功，让依赖自动化流程的开发者难以察觉失败
- **配置不生效**：settings.json 中 agent 配置（maxTurns 等）被读取却不应用（#22267），symlink agent 不识别（#20079）
- **上下文成本压力**：大文件读取导致 token 暴涨，社区强烈呼吁更精细的读取策略
- **工具数量上限**：MCP/扩展生态扩展后 >128 工具即 400 错误（#24246），需要智能工具裁剪
- **安装渠道混乱**：Homebrew 非官方源误导新用户（#28159）

---

*数据来源：google-gemini/gemini-cli GitHub（Releases / Issues / PR，2026-11-20）*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-20 | 数据来源：github.com/github/copilot-cli**

---

## 一、今日速览

昨日发布 **v1.0.115-1**，重点修复 MCP OAuth 签到流程及工作流执行等待问题。社区讨论热度集中在 **MCP OAuth 认证链路**（刷新令牌、静默重授权）和**权限授权疲劳**两大痛点。今日新增多个与终端交互体验相关的 issue（滚动跳转、思考块折叠、多行评论）。

---

## 二、版本发布

### v1.0.115-1
- **Fixed**：MCP 签到现在可以在服务器授予所需 scopes 但省略自动请求的 refresh-token scope 时继续进行
- **Fixed**：直接工作流执行现在会等待项目扩展工作流注册完成

### v1.0.115-0
- 常规修复与变更

> 点评：本次修复直指社区反馈最多的 MCP OAuth 认证问题，与 #4017、#4203 等高频 issue 直接相关。

---

## 三、社区热点 Issues

**1. [#4017](https://github.com/github/copilot-cli/issues/4017) [CLOSED] MCP OAuth：非第一方 HTTP 服务器取消 host-token 后无法启动浏览器认证流**
Copilot Desktop 中第三方 MCP 服务器（Atlassian、incident.io）认证完全失败——无弹窗、无报错，仅静默失败。8 条评论、已关闭，疑似被新版本修复覆盖。

**2. [#4203](https://github.com/github/copilot-cli/issues/4203) [OPEN] MCP OAuth：过期 access token 触发交互式重认证而非静默 refresh_token**
违反 RFC 6749 §6 的典型问题：缓存有有效 refresh token 却强制用户重新走浏览器登录，并丢弃服务器工具。5 👍，是 MCP 体验的核心痛点。

**3. [#1168](https://github.com/github/copilot-cli/issues/1168) [OPEN] 单次请求内授权提示过多（“授权疲劳”）**
一条“调查 PR 727 为何失败”的指令触发十余次授权确认，严重打断工作流。3 👍，权限模型粒度问题呼声很高。

**4. [#5283](https://github.com/github/copilot-cli/issues/5283) [OPEN] [需人工介入] 个人 Copilot Free 账户远程环境托管被策略阻止**
本地设置已启用但远程访问始终失败，标记 `triage:needs-human`，6 👍 表明受影响用户不少。

**5. [#5350](https://github.com/github/copilot-cli/issues/5350) [CLOSED] MCP OAuth：授权码已收到但 code→token 交换未执行，服务器卡在 "Connecting"**
WSL2 + Entra ID（Azure DevOps MCP）场景下浏览器往返完成但令牌交换丢失，已关闭。

**6. [#5519](https://github.com/github/copilot-cli/issues/5519) [CLOSED] 高于 1.0.107 的版本破坏 BYOK**
本地托管模型用户在 1.0.107 后遇到模型目录所有权验证失败，BYOK 用户需关注。

**7. [#5090](https://github.com/github/copilot-cli/issues/5090) [OPEN] 启动体验 + 输入行体验**
大仓库中 MCP/插件加载阻塞用户输入，要求异步化启动流程，代表性能类诉求。

**8. [#5516](https://github.com/github/copilot-cli/issues/5516) [OPEN] store_memory 提供 user scope 但全部 404**
用户级记忆不可用时仍暴露该选项，且 `/memory off` 一刀切关闭所有 scope，粒度不足。

**9. [#5517](https://github.com/github/copilot-cli/issues/5517) [OPEN] 粘贴 PDF 按编码体积估算上下文（620k 估算 vs 31k 实际）**
导致不必要的自动压缩，与早前图片问题（#2936）同源，影响长会话体验。

**10. [#4310](https://github.com/github/copilot-cli/issues/4310) [OPEN] 模型无能力限制数据时默认回退 128K token 预算**
大上下文模型（如 1M token Anthropic）被硬编码预算错误压缩，BYOK/自定义模型路由用户受影响。

---

## 四、重要 PR 进展

过去 24 小时仅 1 条 PR 更新：

**1. [#2957](https://github.com/github/copilot-cli/pull/2957) [CLOSED] fix: launchExtension() 中扩展 bootstrap 路径不匹配**
修复 SEA 二进制目录与 pkg 缓存路径不一致导致 macOS/Windows 扩展加载失败的问题。为社区贡献 PR，已关闭。

> 本期 PR 活动较少，主线开发可能通过内部分支推进，建议关注下期 Release Notes。

---

## 五、功能需求趋势

| 方向 | 代表 Issue | 热度 |
|---|---|---|
| **MCP OAuth 认证可靠性** | #4017, #4203, #5350, #4769, #4371, #5510 | 🔥🔥🔥 最高频 |
| **权限/沙箱模型精细化** | #1168, #4298, #5507 | 🔥🔥 |
| **上下文与记忆管理** | #5516, #5517, #4310, #4424 | 🔥🔥 |
| **终端交互体验** | #5533（滚动跳转）、#5531/#5532（思考块折叠）、#5534（diff 多行评论） | 🔥 今日新增集中 |
| **会话管理** | #5501（ACP 会话持久化）、#4580（/fork 新终端） | 🔥 |
| **BYOK / 自定义模型** | #5519, #4310 | 🔥 |

---

## 六、开发者关注点

1. **MCP OAuth 是当前最大痛点**：从授权码交换、静默刷新到元数据重定向，认证链路多个环节均有缺陷；v1.0.115-1 已开始针对性修复，但 #4203（静默刷新）仍开放。
2. **授权疲劳**：单任务十余次确认提示严重影响 agent 自动化体验，社区期待更智能的权限聚合或白名单机制。
3. **WSL2/Windows 平台问题突出**：浏览器签到静默卡死（#5510）、MCP worker 残留（#4972）等，跨平台支持仍需打磨。
4. **上下文估算偏保守**：PDF/图片按文件体积而非 token 计数，引发不必要的压缩，长会话用户损失上下文。
5. **BYOK 用户脆弱性**：版本升级破坏本地模型配置（#5519），提示模型目录验证机制需要更平滑的兼容策略。

---
*本报告基于过去 24 小时 GitHub 公开数据自动生成，点击各条目链接查看详情。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-20

## 📌 今日速览

今日无新版本发布，但一条 `dev → production` 的发布推进 PR（#64784）正在路上，包含 Tidepool Alpha Free 与 Gemini 4 Neon 文档及多项核心变更。核心贡献者 @kitlangton 和 @Tarquinen 今天集中提交了一批 PR：多机器协作（machines）基础设施和 Claude Agent 多账号轮换成为焦点。Issues 方面，安全（密钥未脱敏 #64750）、Windows 权限绕过（#65008）等高危问题值得关注。

---

## 🔥 社区热点 Issues

**1. [#4283] 复制到剪贴板失效（已关闭）** — 161 条评论、135 👍
历史性高热度问题，跨终端的剪贴板复制问题影响大量用户，现已关闭，可作为长尾体验问题的典型样本。
https://github.com/anomalyco/opencode/issues/4283

**2. [#65008] Windows 下 PowerShell 脚本调用跳过权限确认** — OpenCode 2.3.0
安全类高危问题：项目配置了 shell `ask` 规则，但 Build agent 直接执行 PowerShell 脚本未弹出确认框，权限模型在 Windows 上存在绕过风险。
https://github.com/anomalyco/opencode/issues/65008

**3. [#64750] v2.3.2 密钥仍以未脱敏形式持久化到日志/会话存储** — 安全跟进
继 #64745 后的 v2 复现：secrets 未脱敏写入日志，且带凭据的远程 URL 未经确认即被执行，是当前最紧迫的安全议题。
https://github.com/anomalyco/opencode/issues/64750

**4. [#64869] edit 工具在后台服务中对特定路径无限挂起** — 11 条评论
长驻后台服务中 `edit` 对某文件停摆（30 秒至 5+ 分钟），而同路径 `write` 和独立 `--standalone` 服务均正常，指向后台服务的状态污染问题。
https://github.com/anomalyco/opencode/issues/64869

**5. [#64746] Claude Agent 模型 ID 在 `fable` 与 `claude-fable-5-2` 之间翻转**
上游 Claude Code 改名导致会话在下一次提问时报 "model not found"，已有对应修复 PR（#65032）。
https://github.com/anomalyco/opencode/issues/64746

**6. [#61072] Claude 5 小时套餐限额消耗速度快 ~1.8 倍（已关闭）**
SDK 将请求标记为 `sdk-ts` 导致计费加速，直接影响订阅成本，社区反馈强烈。
https://github.com/anomalyco/opencode/issues/61072

**7. [#63785] 子代理 "后台工作” 模式导致幻觉回答**
无独立任务可做时，agent 在等待子代理期间自行编造答案，暴露出提示词设计层面的质量问题。
https://github.com/anomalyco/opencode/issues/63785

**8. [#56032] 请求：禁止服务启动时自动恢复会话**
后台服务无条件恢复所有挂起会话，导致非正常退出后 token 在无用户输入的情况下被继续消耗。
https://github.com/anomalyco/opencode/issues/56032

**9. [#51152] 按项目锁定凭据激活**
`auth switch` 是全局的——切换账号会静默影响其他项目中后台 agent 的计费账户，多项目用户痛点明显。
https://github.com/anomalyco/opencode/issues/51152

**10. [#51209] 向插件暴露 V2 TUI composer** — 15 条评论
V1 的 `appendPrompt` 能力在 V2 缺失，是插件生态迁移的核心阻塞点。
https://github.com/anomalyco/opencode/issues/51209

---

## 🚀 重要 PR 进展

**1. [#64784] release: dev 提升至 production**
包含 Console 文档（Tidepool Alpha Free、Gemini 4 Neon）及多项核心/app/CLI 变更，下个版本的前奏。
https://github.com/anomalyco/opencode/pull/64784

**2. [#63002] feat(desktop): 免登录浏览器面板**
桌面端内嵌浏览器：链接点击即打开且保持登录态，支持从 Chrome/Edge/Firefox 等一键导入登录信息，并附带 agent 安全防护。
https://github.com/anomalyco/opencode/pull/63002

**3. [#65035] feat(core): Claude 账号用量耗尽自动轮换**
支持多个 Claude 配置目录，一个账号触顶自动切换下一个，直击 #61072 反映的成本痛点。
https://github.com/anomalyco/opencode/pull/65035

**4. [#65032] fix(core): 保留所有 Claude 模型 ID 兼容性**
修复 #64746 的模型改名翻转问题，Claude Code 曾列出的 ID 全部保持可用。
https://github.com/anomalyco/opencode/pull/65032

**5. [#64867] fix(ai): 关闭重叠的 reasoning 块**
修复 #64792——Anthropic 兼容网关中 `reasoning start before end` 导致 Gemini 3.x 会话中断的问题。
https://github.com/anomalyco/opencode/pull/64867

**6. [#65031] feat(core): 机器密钥与一次性加入字符串**
多机器协作基础设施：服务器可通过一次性 join string 邀请其他设备，`machines` flag 后续将开放加密链接能力。
https://github.com/anomalyco/opencode/pull/65031

**7. [#64971] fix(core): 后台结果统一为模型不可伪造的 `<system-notice>` 块**
针对模型自己编造 `<subagent … state="completed">` 假结果的幻觉问题（关联 #63785）。
https://github.com/anomalyco/opencode/pull/64971

**8. [#65011] refactor(codemode): Code Mode 语言迁移至 psychoscript 包**
Code Mode 的编译器/VM/运行时/标准库独立为 `psychoscript@0.1.2` 包，架构解耦的重要一步。
https://github.com/anomalyco/opencode/pull/65011

**9. [#64381] feat(core): 会话中工具变更即时下发**
MCP 服务器连接/断开、插件工具出现时，不再需要重开会话即可生效。
https://github.com/anomalyco/opencode/pull/64381

**10. [#65002] feat(codemode): 脚本执行块下方展示文件 diff**
Code Mode 可视化体验增强：execute 完成后直接以文件 diff 形式呈现结果。
https://github.com/anomalyco/opencode/pull/65002

---

## 📈 功能需求趋势

- **多机器/多账号协作**：`machines` flag 下的远程路径（`gpu:~/notes.txt`）、机器邀请、Claude 多账号轮换，是当前最活跃的开发主线。
- **成本与配额控制**：Claude 套餐限额加速消耗（#61072）、会话自动恢复烧 token（#56032）、账号轮换（#65035），用户对 token 花费的精细化控制需求强烈。
- **插件生态 V2 迁移**：TUI composer 暴露（#51209）等 V1 能力缺口阻碍插件作者迁移。
- **Provider 兼容性**：Claude 模型改名、Gemini/Vercel 网关 reasoning 块、Mistral 工具桥、OpenRouter 输出异常——多 provider 适配仍是 issue 高发区。
- **交互式终端能力**：社区请求原生 PTY 工具以驱动 REPL、调试器、psql 等长驻会话（#65017）。

---

## ⚠️ 开发者关注点

1. **安全与权限**：密钥未脱敏持久化（#64750）、Windows PowerShell 权限绕过（#65008）、带凭据 URL 无确认执行——权限模型和脱敏机制是当前最高优先级的信任问题。
2. **后台服务稳定性**：edit 挂起（#64869）、自动恢复会话（#56032）表明长驻服务的状态管理与生命周期控制仍需打磨。
3. **幻觉与提示词质量**：子代理等待期编造答案（#63785）、模型伪造后台结果（#64971 修复中），系统提示的边界约束正在加强。
4. **凭据隔离**：多项目共享全局凭据激活（#51152）会造成跨项目误计费，按项目隔离需求迫切。
5. **免费层体验**：Beam Free 智商不足（#65027）、免费额度误报耗尽（#65029）等反馈较多，免费层是用户增长入口但口碑承压。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-11-20）

## 一、今日速览

今日无新版本发布，社区焦点集中在 **CI/CD 稳定性治理**（Managed Agent 门禁长期红、CI 机器人账号失效）与 **Managed Agent 生态持续收敛**（DingTalk/GitHub 通道、Workspace 制品库、Web Shell 移动端体验）。同时出现一个值得警惕的 **P1 安全类问题**：AUTO 模式下服务器级 MCP 信任可完全绕过 LLM 分类器。

---

## 二、版本发布

过去 24 小时无新 Release。

---

## 三、社区热点 Issues（Top 10）

1. **[#17854](https://github.com/QwenLM/qwen-code/issues/17854) [P1/安全] AUTO 模式下服务器级 MCP 信任绕过 LLM 分类器**
   受信任 MCP 服务器后续新增的工具可零审查直接执行，用户批准时的信任边界被结构性放大。安全类 P1，值得优先关注。

2. **[#15486](https://github.com/QwenLM/qwen-code/issues/15486) [P1] 自动压缩后 token 估算重复计算 pending 工具结果**
   导致回合被中断或以 `max_tokens: 1` 发送，直接影响核心使用体验，属 context 性能路线图关键问题。

3. **[#17851](https://github.com/QwenLM/qwen-code/issues/17851) [P1] Managed Agent full tier 在 main 上自 11-11 起持续红**
   `sdk-java.yml` 定时任务每日失败，Hosted failover E2E 出现 `runtime_preparation_timeout`，独立于任何 PR。

4. **[#17039](https://github.com/QwenLM/qwen-code/issues/17039) [P1] Managed Agent 门禁名称不稳定，无法设为必需检查**
   已导致 #17006 带红合入并污染后续 PR，是 CI 治理的关键卡点。

5. **[#17037](https://github.com/QwenLM/qwen-code/issues/17037) [P1] hz3 自建 runner /tmp inode 耗尽**
   残留 verify work tree 占 92% tmpfs，任务在重负载步骤前即失败，暴露自托管 CI 的清理机制缺陷。

6. **[#16832](https://github.com/QwenLM/qwen-code/issues/16832) [P2] 手动 PR 重审通道失效**
   `qwen-code-pr-review.yml` 硬编码了已注销的 `qwen-code-ci-bot` 账号（404），修复见 PR #17881。

7. **[#17832](https://github.com/QwenLM/qwen-code/issues/17832) [P2] MCP 仍在连接中的服务器被误报为失败**
   VS Code 伴生进程中后连接成功的工具永远到不了模型，影响 MCP 可靠性认知。

8. **[#17859](https://github.com/QwenLM/qwen-code/issues/17859) [P2] Web Shell iOS Safari 键盘遮挡 Send 按钮**
   移动端 Web Shell 体验细节问题，首次点击收起键盘而非发送。

9. **[#17188](https://github.com/QwenLM/qwen-code/issues/17188) / [#17189](https://github.com/QwenLM/qwen-code/issues/17189) [P2] 模型 ID 归一化两连缺陷**
   DeepSeek V3.1/V3.2 输出上限回退到 32K（应为 64K）；Ollama `llama4:scout/maverick` 冒号后缀导致视觉输入丢失。

10. **[#17284](https://github.com/QwenLM/qwen-code/issues/17284) [P2] Agent loop 统一迁移的遗留清单**
    配合 #17045（所有 surface 迁至共享 agent loop + event-bus 内核，11-21 冻结），是 1.x 架构演进的路线图枢纽。

> 注：#14724（484 评论）等高热 Issue 为 CI 失败机器人自动追踪帖，信号价值低于上述人工 Issue，故未列入。

---

## 四、重要 PR 进展（Top 10）

1. **[#17894](https://github.com/QwenLM/qwen-code/pull/17894) 压缩请求降级时保留用户原始输入**
   修复 #15936 将所有文本（含用户消息）截断到 4000 字符的问题，用户输入不再被裁剪。

2. **[#17795](https://github.com/QwenLM/qwen-code/pull/17795) Managed capabilities 中央对话框**
   覆盖 35 个 audited daemon-only 能力组，中英文说明 + 搜索 + 缺口追踪，明确“已知差距”与“产品决策”的边界。

3. **[#17358](https://github.com/QwenLM/qwen-code/pull/17358) MCP elicitation 能力声明与协议级拒绝处理**
   在握手 `capabilities` 中声明 `elicitation` 并注册 `elicitation/create` 处理器，MCP 协议完整性提升。

4. **[#17437](https://github.com/QwenLM/qwen-code/pull/17437) CLI + Web Shell 完整阿拉伯语支持（含 RTL 布局）**
   覆盖核心 CLI、Web Shell 及导出 HTML 记录的 RTL 适配。

5. **[#11854](https://github.com/QwenLM/qwen-code/pull/11854) 混合 code mode**
   对齐 Codex 的 `tools.mode` 枚举（`direct`/`code_mode`/`code_mode_only`），普通工具与隔离 `exec` JS 工具并存。

6. **[#17863](https://github.com/QwenLM/qwen-code/pull/17863) `create_sub_session` 工作区审批细化**
   显式工作区在权限评估前解析，解析到当前运行时则走常规权限流。

7. **[#17474](https://github.com/QwenLM/qwen-code/pull/17474) 外部前台 Shell 接入 Broker 与 Control Plane**
   Runtime Broker 的 dispatch/cancel/reconcile/close 栅栏与 Control Plane profile 协商，managed 架构关键拼图。

8. **[#17881](https://github.com/QwenLM/qwen-code/pull/17881) 修复 autofix 审查链路**
   将已删除的 `qwen-code-ci-bot` 切换到存活的 `qwen-code-review-bot`，直接解决 #16832。

9. **[#17890](https://github.com/QwenLM/qwen-code/pull/17890) ACP 默认 legacy 轮次补投递异步 hook 输出**
   最后一个仍在静默丢弃后台 hook 输出的 model-round surface 被补齐。

10. **[#17893](https://github.com/QwenLM/qwen-code/pull/17893) / [#17837](https://github.com/QwenLM/qwen-code/pull/17837) / [#17887](https://github.com/QwenLM/qwen-code/pull/17887) 测试去脆化三连**
    分别修复 workspace artifact 索引断言的数据库隔离、DingTalk 超时上限（30s→120s 并加锁）、导出文档性能预算在 CI 上的伸缩，呼应团队本周密集的 deflake 行动。

---

## 五、功能需求趋势

- **Managed Agent / 多通道集成**：DingTalk、GitHub、WeCom 注册身份绑定、H5e 卡片、workspace 制品库等 follow-up 密集，是最活跃的开发主线。
- **上下文与 token 管理**：压缩请求保真（#17894）、token 估算修正（#15486）、持久化输出 stub 检测（#17337），社区对长会话质量诉求强烈。
- **Web Shell / 移动端体验**：iOS 键盘遮挡、触摸尺寸规范化（#17892）、worktree parity（#17533）持续打磨。
- **Agent loop 架构统一**：#17045 + #17284 的 event-bus 内核迁移即将冻结，属 1.x 最大的架构收敛动作。
- **MCP 可靠性与安全**：elicitation 支持、连接误报、AUTO 模式信任边界三条线并行。
- **国际化**：阿拉伯语 RTL 全链路支持，语言覆盖持续扩大。

---

## 六、开发者关注点

1. **CI 基础设施脆弱**：自建 runner 资源泄漏（inode 耗尽）、机器人账号失效、Managed Agent 门禁无法设为必需检查——CI 治理已成本周最高频痛点。
2. **测试脆性（flakiness）**：CI Failure Patrol 批量标记 flaky 测试并触发 deflake PR，DingTalk/web-shell/E2E 多处超时与隔离问题待解。
3. **模型目录归一化**：非官方 model id（DeepSeek、Ollama tag）频繁踩坑，归一化策略需要更鲁棒的匹配。
4. **权限系统可解释性**：#17715 提出“不可检视的权限主体应成为协议状态而非布局意外”，反映社区对权限决策可审计性的更高要求。
5. **Desktop/Web Shell 功能平权**：LSP 在 Desktop 端缺乏受支持的开启通道（#14507），CLI 与图形端能力差距持续被提出。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*