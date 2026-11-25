# AI CLI 工具社区动态日报 2026-11-25

> 生成时间: 2026-11-25 03:31 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告（2026-11-25）

## 一、生态全景

AI CLI 工具已进入**多极竞争、差异化深耕**阶段：Anthropic 与 OpenAI 以高频版本迭代（单日 1 个正式版 vs 5 个 alpha 版）巩固桌面端与长任务自主能力；Gemini CLI 与 OpenCode 借助开源社区力量在 Subagent 架构与会话分支等前沿交互上快速试验；Qwen Code 则押注 Managed Agent 服务化与 1.0 内核重构。共同特征是——**MCP 已成事实标准**（六大工具全部涉及 MCP skills/OAuth/生命周期管理），而**配额计费透明度、沙箱安全、Windows 平台质量**成为全行业尚未解决的共性欠账。

## 二、各工具活跃度对比

| 工具 | 今日热点 Issues | PR 动态 | Release | 迭代节奏 |
|---|---|---|---|---|
| **Claude Code** | 10 条（VS 2026 集成 #15942：158 评论/497 👍） | 仅 1 条（关闭旧 PR） | v2.1.332 正式版 | 稳定周期，Issue 为主、PR 沉寂 |
| **Codex** | 10 条（#58530：42 评论/67 👍） | 10+ 条密集合并 | 5 个 alpha（0.173–0.174 系列） | **最激进**：单日多次发布 |
| **Gemini CLI** | 10 条（Subagent 类占 7 条） | 10 条（含 3 条安全修复） | v0.71.1 补丁 | 社区驱动，安全加固密集 |
| **Copilot CLI** | 35 条 Issue 更新（含 3 条新提） | 0 条 | 4 个预发布（1.0.116-0~3） | 高频预发布、缓慢合入 |
| **OpenCode** | 10 条（含计费与安全高危项） | 10+ 条（@Hona 系列化 PR） | 无 | 社区贡献活跃 |
| **Qwen Code** | 10 条（近半为 CI 噪声） | 10 条 | 无（夜间版 CI 失败自愈） | 工程治理型迭代 |
| **Kimi Code CLI** | 0 | 0 | 无 | 无活动 |

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **MCP 生态成熟化** | Claude Code（MCP skills beta）、Codex（HTTP 会话过期恢复）、Gemini CLI（OAuth origin 校验、工具数>128 报 400）、Copilot CLI（企业 Entra ID 认证、端点冲突治理）、OpenCode（skills 来源标注） | MCP skills 规范、认证链路、连接可靠性是三个普遍短板 |
| **配额/成本透明度** | Claude Code（#105621 额度加速消耗、#105564 缓存重写）、Codex（#63138/#63097 消耗快 5 倍、#58530 Plus 权益请愿）、OpenCode（#66067 路由重复计费） | **三家同时爆发计费异常**，是当日最强共性信号 |
| **上下文/缓存管理** | Claude Code（compaction 后 skills 丢失）、Codex（Goal 上下文丢弃、缓存前缀破坏）、Qwen Code（256 MiB 会话上限） | 长会话可靠性与 compaction 信息损失 |
| **沙箱与权限安全** | Codex（沙箱网络收紧）、Gemini CLI（3 条安全 PR）、Copilot CLI（deniedPaths 绕过）、OpenCode（热重载权限绕过）、Qwen Code（microVM 沙箱） | 权限模型旁路类漏洞密集出现，行业进入安全加固期 |
| **Windows 平台质量** | Claude Code（hook 静默失败、BOM）、Codex（UI 卡顿、权限选择器回归）、Copilot CLI（CRLF、NumLock） | Windows 是三大商业工具共同的质量洼地 |
| **会话分支/历史管理** | Gemini CLI（/fork）、Claude Code（删除单个会话）、Qwen Code（跨 worktree 记忆） | 非破坏性探索正成为新交互范式 |

## 四、差异化定位分析

- **Claude Code**：企业级安全管控导向（PreSkillShellCommand hook），但社区单向——issue 呼声高、代码贡献近乎关闭。目标用户为重度专业开发者，Windows/桌面端是短板。
- **Codex**：迭代速度最快，押注长任务自主（Goal/Daybreak 生命周期）与桌面端一体化；但“每次更新引入新回归”已成固定模式，适合接受激进迭代的尝鲜用户。
- **Gemini CLI**：**Subagent 架构试验田**（今日 Issue 几乎全部集中在 agent 领域），开源贡献最均衡；安全修复响应迅速（A2A 鉴权、token 外泄当日修复关闭）。
- **Copilot CLI**：企业生态集成路线（ACP 协议、组织管理 MCP、GitHub 身份体系），但社区参与度低（PR 为零），属于“闭门快跑”模式。
- **OpenCode**：社区驱动 + 商业订阅（Go 服务）混合模式，远程执行架构（Cloudflare Durable Objects）和移动端是独特方向；配置链路回归多，适合愿意踩坑的开源用户。
- **Qwen Code**：押注 **Managed Agent 服务化与 Java 生态 SDK**，i18n（阿拉伯语 RTL）最积极；但 CI 噪声大、真实社区反馈占比偏低，处于工程基建期。
- **Kimi Code CLI**：社区零活动，需谨慎评估其投入持续性。

## 五、社区热度与成熟度

- **最活跃**：Claude Code（#15942 近 500 👍 显示庞大用户基数）与 Codex（issue+PR 双高）
- **最快迭代**：Codex（单日 5 个 alpha）> Copilot CLI（4 个预发布）> Claude Code（1 正式版）
- **社区贡献最健康**：Gemini CLI 与 OpenCode（PR 流持续、issue 与 PR 互相响应、当日闭环修复）
- **成熟度分层**：Claude Code/Codex 处于“规模大但欠账多”阶段；Gemini CLI/OpenCode 处于“功能试验+信任建立”阶段；Qwen Code 处于“架构重构”阶段；Kimi 停滞。

## 六、值得关注的趋势信号

1. **计费可信度危机**：Claude Code、Codex、OpenCode 三家同日出现配额/计费异常报告，若为行业性计量问题（如缓存计价、路由策略变化），Max/Plus 订阅用户的流失风险正在累积——**建议用户近期保留用量日志以备核查**。
2. **MCP skills 成新战场**：Claude Code 与 OpenCode 同日推进 MCP skills 规范实现，跨服务器的技能发现与加载（`server:skill` 命名、URI 加载）将成为下一轮生态卡位点。
3. **权限模型旁路漏洞密集涌现**：OpenCode 的 cd 重定向绕过、Copilot CLI 的 rewind 快照泄露、Gemini CLI 的 shell 包装变体——**“声明式 deny ≠ 实际隔离”**，microVM 类强隔离（Qwen Code）路线值得跟踪。
4. **“失败伪装为成功”是可靠性新议题**：Gemini CLI 的 subagent 误报 success、Claude Code 的静默 hook 失败均属此类——长任务自主模式（Goal、subagent）的可观测性将决定其能否进入生产。
5. **会话分支（/fork）可能成为标配**：Gemini CLI 的社区提案进展极快（提案+PR 同日），与 git 分支心智模型对齐的探索式 AI 编程交互值得各工具跟进。
6. **Windows 一等公民化仍缺位**：三大头部工具的 Windows 痛点密度均显著高于 macOS/Linux，谁先补齐这块质量洼地，就能吃到最大的存量开发者群体。

**决策建议**：企业用户优先关注 Claude Code（管控能力）+ Copilot CLI（生态集成）的组合；关注成本的用户暂缓升级、保留用量证据；开源/自定义优先的场景，Gemini CLI 与 OpenCode 的社区响应速度值得下注。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-25）

**数据说明**：本批 PR 数据缺失评论数字段，故排行综合 PR 描述质量、issue 关联度、社区 Issue 讨论热度（评论数）交叉推导。

---

## 一、热门 Skills 排行（PR/Issue 综合）

| # | Skill/主题 | 功能 | 社区讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **mcp-builder 修复** ([#1742](https://github.com/anthropics/skills/pull/1742)) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名及自定义 HTTP headers | 修复高引用 Issue #1668，上游 SDK 破坏性变更 | OPEN |
| 2 | **skill-creator 触发评估修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 隔离 trigger evals、修复 Windows select() 失败 | 关联社区痛点 Issue #556 / #1352（触发率恒为 0% 的评测失真问题） | OPEN |
| 3 | **webapp-testing 安全加固** ([#1980](https://github.com/anthropics/skills/pull/1980)) | 移除 `shell=True`，消除命令注入风险（CWE-78） | 安全性修复类 PR 的典型代表，与 Issue #492 信任边界议题呼应 | OPEN |
| 4 | **docx 完善系列** ([#1792](https://github.com/anthropics/skills/pull/1792)、[#1734](https://github.com/anthropics/skills/pull/1734)) | LibreOffice 超时正确报错、检测孤儿批注 | 文档处理是最成熟的官方 Skill 域，社区持续挑刺（如 #2018 merge_runs XML 损坏） | OPEN |
| 5 | **xlsx 外链风险修复** ([#2019](https://github.com/anthropics/skills/pull/2019)) | 解析 worksheet 级 defined names，消除假阴性 | 修复 #2013，属数据正确性关键修复 | OPEN |
| 6 | **pyxel 复古游戏开发** ([#525](https://github.com/anthropics/skills/pull/525)) | Python 复古游戏创建/调试/验证 | 唯一存活至 11 月的 3 月老 PR，含 headless 验证框架，作者为 Pyxel 作者本人 | OPEN |
| 7 | **Notion spec → 任务拆解 + 简历量化审计** ([#1245](https://github.com/anthropics/skills/pull/1245)) | 规格文档转 Notion 实施计划、简历量化审计 | 项目管理 + 职场工具方向的双 Skill 提案 | OPEN |
| 8 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Markdown → MP4 视频 + 仿真配音 | 内容创作自动化，零成本方案吸引关注 | OPEN |

---

## 二、社区需求趋势（源自 Issues）

1. **Skill 触发评测的真实性** — 最大痛点。#556（13 评论）、#1352 均指向 `run_eval.py` 多 worker 并发时触发率恒为 0，误导 Skill 优化方向。
2. **安全与信任边界** — #492（46 评论，全站最热）：社区 Skill 冒用 `anthropic/` 命名空间，呼吁命名空间隔离与官方认证机制。
3. **组织级分享与协作** — #228（17 评论）：要求 Skills 支持 org 内直接共享，替代手工传 `.skill` 文件的原始流程。
4. **上下文效率** — #1487：`claude-api` 单次注入 ~156k token 耗尽上下文；#202（已关闭）：要求 skill-creator 按最佳实践重写，减少说教式冗余。
5. **企业治理与质量门禁** — #412（agent-governance 提案）、#1385（推理质量三道门禁管线）、#1329（compact-memory 紧凑代理状态符号化）。
6. **去重与分发一致性** — #189：document-skills 与 example-skills 安装重复内容，占用上下文。

---

## 三、高潜力待合并 Skills（活跃但未合并）

- [#1742 mcp-builder MCP v2 适配](https://github.com/anthropics/skills/pull/1742) — 修复明确影响面大的上游兼容问题，落地概率最高
- [#1298 skill-creator eval 修复](https://github.com/anthropics/skills/pull/1298) — 直接回应两个活跃 Issue，维护者动力强
- [#2019 xlsx 外链假阴性修复](https://github.com/anthropics/skills/pull/2019)、[#1792 docx 超时报错修复](https://github.com/anthropics/skills/pull/1792) — 小而准的 bugfix，合并阻力低
- [#2108 文档同步关系澄清](https://github.com/anthropics/skills/pull/2108) — 纯文档，涉 sync 机制说明，易过审
- [#1997 YAML frontmatter 解析修复](https://github.com/anthropics/skills/pull/1997)、[#1681 package_skill 直接执行修复](https://github.com/anthropics/skills/pull/1681) — skill-creator 工具链修复，11 月仍活跃更新

*注：#1771（proofcore-contract-auditor，TON 链存证）因带明显商业推广属性且涉及外部链上锚定，合并前景存疑。*

---

## 四、生态洞察（一句话）

**社区最集中的诉求是“可信与可控的 Skill 生命周期”——从命名空间信任边界、触发评测的真实性，到上下文注入的经济性，本质上都在要求 Anthropic 把 Skills 从社区实验品升级为有认证、有质量度量、有分发治理的正式生态。**

---

# Claude Code 社区动态日报（2026-11-25）

## 📌 今日速览

今日 Claude Code 发布 **v2.1.332**，引入两项值得关注的能力：**MCP 服务器技能（beta）** 与新的 **PreSkillShellCommand hook 事件**，进一步打通 MCP 生态与权限管控。社区方面，Windows 与 Desktop 应用相关问题持续占据热度榜首，涉及 VS 2026 集成、用量消耗异常、权限提示过严等长期诉求。

---

## 🚀 版本发布：v2.1.332

- **MCP 服务器技能（beta）**：来自 MCP 服务器的技能会以 `server:skill` 形式出现在 `/` 菜单中，原有技能命名不变
- **新增 `PreSkillShellCommand` hook 事件**：可在技能或命令加载时拒绝其内联 shell 命令，为安全管控提供新抓手（注意：在 2.1.331 及更早版本中，settings 文件需以 op 命名）

链接：https://github.com/anthropics/claude-code/releases

---

## 🔥 社区热点 Issues（Top 10）

**1. VS 2026 集成支持**（#15942，158 评论 / 497 👍）
最长寿的热帖之一，Windows 开发者对 Visual Studio 2026 集成的需求持续发酵，近 500 赞表明这是 Windows 生态最强烈的呼声。
https://github.com/anthropics/claude-code/issues/15942

**2. 用量限额消耗异常加快**（#105621，13 评论）
Max 订阅用户报告 10 月中旬以来工作流不变但额度消耗大幅加速，已被标记 duplicate，暗示官方已知晓此类问题，但根因仍不透明，值得持续追踪。
https://github.com/anthropics/claude-code/issues/105621

**3. Desktop 自定义主题 / 强调色**（#79305，41 评论 / 107 👍）
用户指出当前近黑色暗色模式难以与其他应用区分，请求 CLI 自定义主题系统在桌面端对齐。
https://github.com/anthropics/claude-code/issues/79305

**4. macOS 26 反复弹出权限提示**（#83841，11 评论）
Claude Code 每次会话启动都触发 "access data from other apps" 弹窗且无法清除，与 `disclaimer` helper 二进制有关，影响 macOS 升级用户日常体验。
https://github.com/anthropics/claude-code/issues/83841

**5. `/compact` 后技能未重新附加**（#94564，8 评论）
与官方文档承诺不符：压缩后技能未被重新挂载，仅剩摘要转述。对依赖长会话 + skills 的重度用户是实际功能退化。
https://github.com/anthropics/claude-code/issues/94564

**6. Windows 钩子命令静默失败**（#109103，4 评论）
Hook 命令经 Git Bash 执行，路径含反斜杠或未加引号空格时退出 127 且无可见报错——Windows hook 生态的又一痛点。
https://github.com/anthropics/claude-code/issues/109103

**7. Jupyter Notebook 编辑不自动刷新**（#15379，25 评论）
VS Code 集成中的经典 bug，文件已写盘但编辑器不刷新，影响数据科学工作流近一年仍未解决。
https://github.com/anthropics/claude-code/issues/15379

**8. 第二轮对话重写 17k 上下文缓存**（#105564）
每个新会话的第二轮都会将完整 session-start 上下文重写入 prompt cache（`messages_changed`），造成额外 token 开销，与上文的额度消耗问题可能存在关联。
https://github.com/anthropics/claude-code/issues/105564

**9. Desktop 上下文用量指示器回归**（#90708，21 评论）
长会话中 context 用量比 5 小时限额环更具决策价值，用户请求恢复或让 footer 组件可配置。
https://github.com/anthropics/claude-code/issues/90708

**10. 权限提示过严阻断任务**（#112098，今日新增）
用户抱怨 Claude Code 拒绝输入密码/凭据导致任务中断，"安全 vs 可用性”的平衡问题今日再被引爆。
https://github.com/anthropics/claude-code/issues/112098

---

## 🔀 重要 PR 进展

过去 24 小时仅 1 条 PR 更新：

- **#45553 resolve duplicate IPs**（已关闭）：由 @johnkohler00 于 4 月提交，昨日最终关闭。该仓库本身并非主要接受社区 PR 的代码库，PR 动态整体沉寂。
https://github.com/anthropics/claude-code/pull/45553

---

## 📈 功能需求趋势

1. **桌面端（Desktop app）成熟度**是当前需求最集中的方向：主题定制、context 指示器、fast mode 状态一致性（#100998）、macOS 权限弹窗等——CLI 的功能与体验尚未完整对齐到桌面端
2. **Windows 平台体验**：VS 2026 集成、PowerShell BOM（#90962）、hook 路径解析、CPU 占用等，Windows 用户痛点密度显著高于 macOS/Linux
3. **会话与上下文管理**：删除单个会话（#26904 / #85906）、MEMORY.md 大小限制可配置（#79217）、compaction 自定义（#89797）、Remote Control 会话本地可见（#94369）
4. **MCP 与技能生态**：新版的 MCP skills 与 PreSkillShellCommand 正面回应了这一方向，社区关注度预计将持续上升
5. **成本透明度**：额度消耗异常、缓存重写开销等 cost 类问题近一个月集中涌现

---

## ⚠️ 开发者关注点

- **成本异常仍未解释**：多个 issue（#105621、#105564）指向 10 月中旬后的额度/缓存行为变化，Max 用户流失风险值得官方尽快澄清
- **静默失败是高频抱怨**：hook 127 退出、0 字节 `known_marketplaces.json`（#112096）、重复的 “hook was skipped" 通知（#104216）——错误应可感知、可配置、可关闭
- **文档与实现不一致**：compaction 后技能附加行为与文档不符（#94564），长期用户依赖文档承诺时会踩坑
- **Windows 上的路径/编码兼容性**是 bug 重灾区（BOM、反斜杠、空格路径），跨平台一致性仍需投入
- **Web/Cloud 端边界问题**：attribution 无法真正关闭（#107892）、云端 stop hook 不可禁用（#103869）——远程环境的用户控制权不足

---

*数据截至 2026-11-25，来源：github.com/anthropics/claude-code*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-11-25

## 1. 今日速览

Codex CLI 今日密集发布了 5 个 alpha 版本（0.174.0-alpha.2 至 alpha.5），同时合并了大量 TUI 终端能力重构与体验优化的 PR。社区侧，**用量配额异常消耗**（11 月 20–22 日起多个用户报告配额消耗速度暴增 5 倍以上）和 **11 月 21 日桌面端更新引发的新会话权限选择器回归**成为两大焦点话题。

## 2. 版本发布

过去 24 小时共发布 5 个 alpha 版本，迭代节奏非常密集（单日多次发布）：

| 版本 | 链接 |
|---|---|
| rust-v0.174.0-alpha.5 | [Release](https://github.com/openai/codex/releases) |
| rust-v0.174.0-alpha.4 | 同上 |
| rust-v0.174.0-alpha.3 | 同上 |
| rust-v0.174.0-alpha.2 | 同上 |
| rust-v0.173.0-alpha.5 | 同上 |

各 Release Notes 仅含版本号，无详细变更说明；结合 PR 流看，0.174.x 重点在 **TUI 终端能力集中化重构**、**Daybreak/Goal 生命周期修复**和**沙箱网络策略收紧**。

## 3. 社区热点 Issues

1. **#58530 — 12 月用量限额：请求为 Plus 保留 ChatGPT High 与 Codex/Work 权限**（42 评论 / 67 👍，热度第一）——Plus 用户集体请愿，与近期多项配额异常报告形成呼应，是当前最敏感的社区议题。
   https://github.com/openai/codex/issues/58530

2. **#56941 — [Windows] Computer Use 后系统级 UI 卡顿，仅杀掉 codex-computer-use.exe 可立即恢复**（28 评论）——影响整个桌面流畅度的严重性能 bug，长期未修复。
   https://github.com/openai/codex/issues/56941

3. **#62943 — [Windows] 11 月 21 日更新回归：新会话丢失权限/执行位置选择器，Max 推理档位消失**（26 评论 / 15 👍）——新版本引入的功能回归，与 #63290、#60139 疑似同根因。
   https://github.com/openai/codex/issues/62943

4. **#32396 — macOS 上 Computer Use 的“锁定后自动解锁”失败**（24 评论）——Pro 用户自 7 月持续报告，至今未解决。
   https://github.com/openai/codex/issues/32396

5. **#62234 — macOS 更新后底部面板设置丢失、终端被强制移至右侧**（24 评论 / 23 👍，已关闭）——高赞高互动，近期更新引发的布局回归，已修复关闭。
   https://github.com/openai/codex/issues/62234

6. **#62967 — macOS Local Work 无视已启用的网络访问设置，强制注入 CODEX_SANDBOX_NETWORK_DISABLED=1**（12 评论）——沙箱网络策略误伤本地工作流，影响面较广。
   https://github.com/openai/codex/issues/62967

7. **#63217 — macOS 桌面端无法打开/新建会话："Peer closed MessagePort connection"**（11 评论）——26.1117.41037 版本的连接可靠性问题，Send 按钮常灰。
   https://github.com/openai/codex/issues/63217

8. **#32922 — compaction 时 Goal 上下文被丢弃，任务目标丢失**（10 评论）——长会话场景下 Agent 忘记目标的根因之一，与今日合并的 Daybreak/Goal 修复 PR 直接相关。
   https://github.com/openai/codex/issues/32922

9. **#63138 / #63097 — GPT-6.2 Astra/Sol 配额自 11 月 22 日起消耗速度快 5 倍以上**（两项独立报告）——配额计量疑似异常，CLI 与桌面端均有反馈，值得官方核查。
   https://github.com/openai/codex/issues/63138 | https://github.com/openai/codex/issues/63097

10. **#42996 — GPT-6 Astra 切换 reasoning-effort 未使用 configuration_update，破坏缓存前缀复用**（6 评论 / 5 👍）——技术含量较高的缓存优化诉求，与 #35416（切档导致 cache miss）同属一类。
    https://github.com/openai/codex/issues/42996

## 4. 重要 PR 进展

1. **#63809 — Goal 自动续跑时保留已保存的 Daybreak 选择**——修复自动续跑丢失用户配置的问题，直接回应 Goal 生命周期类 issue（#32922、#40162）。
   https://github.com/openai/codex/pull/63809

2. **#63810 — 语音聊天改用 ChatGPT 账户级偏好**——Codex 与 ChatGPT 语音选择打通，体验统一。
   https://github.com/openai/codex/pull/63810

3. **#63808 — 修复 API workload identity 启动/刷新时的认证问题**——修复凭证安装会撤销既有网络策略的缺陷。
   https://github.com/openai/codex/pull/63808

4. **#63807 — 自定义 HTTPS 网关自动探测 `/models` 模型目录**——降低自建网关接入门槛，只需配置 base_url 即可发现模型。
   https://github.com/openai/codex/pull/63807

5. **#63806 — 加固插件市场的 SSH 主机校验**——封堵 Git/SSH 与 URL 解析器对远程地址解释不一致带来的安全旁路。
   https://github.com/openai/codex/pull/63806

6. **#63811 — 打包的 ripgrep 升级至 16.0.0**——内置搜索工具链升级。
   https://github.com/openai/codex/pull/63811

7. **#63789 / #63790 / #63793 等系列 — TUI 终端能力集中化重构**（多条 PR）——将散落在渲染、剪贴板、图片、通知等处的终端探测逻辑统一收口到 `terminal_capabilities` 模块，是本日最大规模的重构主线。
   https://github.com/openai/codex/pull/63789

8. **#63788 — 全屏转录视图默认折叠 turn 详情**——默认折叠工具调用细节，减少噪音；可用 `tui.collapse_turn_details = false` 关闭。
   https://github.com/openai/codex/pull/63788

9. **#63785 — 无 bracketed paste 标记时保留多行粘贴**——修复部分终端下粘贴换行被误判为提交的经典痛点。
   https://github.com/openai/codex/pull/63785

10. **#63782 — MCP 回复命中过期 HTTP 会话时自动恢复**——修复 Streamable HTTP 会话过期后工具调用永久 pending 的问题。
    https://github.com/openai/codex/pull/63782

另值得注意：**#63775**（Linux 沙箱代理桥接需显式端口授权，安全收紧）与 **#63780**（opt-in Statsig 遥控开关，默认关闭）。

## 5. 功能需求趋势

- **用量与配额透明度**（最强烈）：#58530、#63097、#63138、#61336、#35416 集中爆发，用户要求更清晰的配额计量与 Plus 档位权益保障。
- **Goal/长任务自主模式的可靠性**：#32922、#40162、#63815 反映 Goal 生命周期（上下文丢失、无法恢复、绕过交付里程碑）仍是核心短板。
- **缓存与成本优化**：reasoning-effort 切换不破坏 prompt prefix 缓存（#42996、#35416）是高级用户的明确诉求。
- **沙箱与网络策略的灵活性**：#62967、#46526、#62805 显示默认安全策略与用户显式配置之间的冲突频发。
- **TUI/终端体验打磨**：多行粘贴、折叠详情、通知与图片协议适配，官方正通过集中化重构系统性解决。

## 6. 开发者关注点

1. **Windows 端质量欠账明显**：UI 卡顿（#56941）、RTL 文字渲染（#34871）、权限选择器回归（#62943）等多个长期 issue 集中在 Windows，Mac 侧整体反馈更积极。
2. **桌面端每次更新引入新回归**已成固定模式：11 月 21 日更新一次性引发权限选择器、SSH 云工作、内置浏览器降级（#62832 丢失密码/cookies）等多个问题，更新节奏与回归测试的平衡是用户高频抱怨点。
3. **配额计量可信度**：多位用户用详细日志佐证配额异常消耗，若官方不回应可能进一步加剧 #58530 的社区情绪。
4. **app-server / CLI 混合进程的稳定性**：MessagePort 断连（#63217）、审批请求失效（#60139）等跨进程通信问题在新版本中反复出现。

---
*数据来源：github.com/openai/codex（过去 24 小时）| 生成时间：2026-11-25*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-11-25）

## 今日速览
Gemini CLI 发布补丁版本 **v0.71.1**（cherry-pick 修复）。社区焦点集中在 **Subagent 架构**上：P1 级的 subagent 状态误报和挂起问题持续发酵，同时大量 agent 相关的 workstream-rollup Issue 被批量更新。新 PR 方面，`/fork` 会话分支、MCP OAuth 安全加固、SA impersonation token 泄露防护等值得关注。

## 版本发布
- **v0.71.1**：仅包含一个 cherry-pick 补丁（PR #30429），修复 v0.71.0 的遗留问题。
  链接：https://github.com/google-gemini/gemini-cli/compare/v0.71.0...v0.71.1

## 社区热点 Issues

1. **#22323 [P1] Subagent 达到 MAX_TURNS 后误报为成功**（评论 14，今日更新）
   `codebase_investigator` 碰到回合上限后仍报告 `status: "success"`，掩盖了任务中断，严重影响可靠性判断。标记 `status/need-retesting`，是今日最活跃的 Issue。
   https://github.com/google-gemini/gemini-cli/issues/22323

2. **#21409 [P1] 通用 agent 无限挂起**（评论 8，👍 8）
   委派给 generalist agent 后连创建文件夹这种简单操作都挂起，用户最长等待一小时。社区共鸣强烈（8 个 👍）。
   https://github.com/google-gemini/gemini-cli/issues/21409

3. **#19873 [P2] 利用模型 bash 原生能力的零依赖沙箱方案**（评论 9）
   大型增强提案：Gemini 3 模型天然擅长链式 POSIX 工具，需配合 OS 级沙箱和执行后意图路由，兼顾能力与安全。
   https://github.com/google-gemini/gemini-cli/issues/19873

4. **#21968 [P2] Gemini 不主动使用 skills 和 subagents**（评论 7）
   用户配置了 gradle/git skills 但模型几乎从不自主调用，只在显式指令时使用。反映 agent 调度策略的实用性缺口。
   https://github.com/google-gemini/gemini-cli/issues/21968

5. **#22745 [P2] AST 感知文件读取/搜索/映射评估（EPIC）**（评论 7）
   探索 AST 工具能否精确定位方法边界、减少 token 噪声和错位读取，是 subagent 能力提升的重要方向（配套 #22746 评估 tilth/glyph 工具）。
   https://github.com/google-gemini/gemini-cli/issues/22745

6. **#22267 [P2] Browser Agent 忽略 settings.json 配置**（评论 5）
   `AgentRegistry` 正确读取并合并了 `maxTurns` 等配置，但 Browser Agent 实际不生效，配置链路存在断点。
   https://github.com/google-gemini/gemini-cli/issues/22267

7. **#21983 [P1] browser subagent 在 Wayland 下失败**（评论 4）
   Linux Wayland 环境的 browser agent 兼容性问题，同样以 GOAL 成功假象掩盖失败（与 #22323 相关的模式）。
   https://github.com/google-gemini/gemini-cli/issues/21983

8. **#24246 [P2] 工具数量 >128 时遭遇 400 错误**（评论 3）
   大量注册工具（含 MCP）时直接触发 API 400，需要更智能的工具范围裁剪。MCP 重度用户的关键痛点。
   https://github.com/google-gemini/gemini-cli/issues/24246

9. **#22672 [P2] Agent 应阻止危险操作**（评论 3）
   模型在复杂 git 操作中使用 `git reset --force` 等破坏性命令，以及修改数据库等不可逆行为时缺乏防护。
   https://github.com/google-gemini/gemini-cli/issues/22672

10. **#30462 新提案：/fork 命令与非破坏性会话分支**（今日新提）
    社区用户提出基于 `ChatRecordingService.forkAsync()` 的会话分支方案（类似 `git checkout -b`），配套 PR 已提交，进展很快。
    https://github.com/google-gemini/gemini-cli/issues/30462

## 重要 PR 进展

1. **#30464 [XL] feat: /fork 命令与 rewind 分支选项**（今日新提）
   实现非破坏性对话分支：`/fork [name] [--stay]` 命令 + `/rewind` 中的 "Fork conversation from here" 选项。
   https://github.com/google-gemini/gemini-cli/pull/30464

2. **#30454 [P1] fix: MCP OAuth 流程强制 origin 一致性**
   按 RFC 8414 §3.3 强制 issuer 匹配，防止 OAuth 授权/token 端点 origin 不一致导致的安全风险。
   https://github.com/google-gemini/gemini-cli/pull/30454

3. **#30456 fix: 限制 SA impersonation token 接收方**
   修复服务账号模拟 token 可发送至任意 URL 的数据外泄风险，引入 host allowlist 并要求 scopes。重要安全修复。
   https://github.com/google-gemini/gemini-cli/pull/30456

4. **#30451 [XL] fix: shell 包装变体的命令替换检测加固**
   加固 `PolicyEngine` 对 shell 包装命令中命令替换和被禁命令的检测，覆盖前缀工具、shell flag、尾随操作符等变体。
   https://github.com/google-gemini/gemini-cli/pull/30451

5. **#30459 fix: 修复 0.70.0 后 Git 扩展安装失败**
   回归修复：`GIT_CONFIG_SYSTEM` 限制导致所有 git 扩展 install/update 失败，启用 unsafe config paths。
   https://github.com/google-gemini/gemini-cli/pull/30459

6. **#30449 [已关闭] fix: A2A server 手动挂载路由无鉴权**
   `/tasks`、`/execute` 等五条路由在认证配置之后挂载，完全无凭据可访问。已修复关闭。
   https://github.com/google-gemini/gemini-cli/pull/30449

7. **#29546 feat: 非交互模式下支持 /skill-name 激活 skill**（help wanted）
   注册 `SkillCommandLoader` 到非交互路径，使脚本/CI 场景也能激活技能。
   https://github.com/google-gemini/gemini-cli/pull/29546

8. **#30335 fix: 停止将 core.sshCommand 覆盖为空字符串**
   修复安全 Git 环境导致所有 SSH git 操作失败的 bug（`cannot run : No such file or directory`）。
   https://github.com/google-gemini/gemini-cli/pull/30335

9. **#30331 fix: MCP env 值含 `=` 或为空时被静默截断**
   `TOKEN=abc=def==` 被存为 `abc` 且退出码为 0，修复解析逻辑。
   https://github.com/google-gemini/gemini-cli/pull/30331

10. **#30219 [已关闭] fix: ACP 压缩会话重载 400 错误**
    ACP 模式下工具调用错误挂载到已被压缩移除的模型消息上，导致会话重载 400。已合并。
    https://github.com/google-gemini/gemini-cli/pull/30219

## 功能需求趋势

- **Subagent 架构成为绝对主线**：今日活跃 Issue 几乎全部集中在 `area/agent`，涵盖可靠性（状态误报、挂起）、可观测性（trajectory 共享 #22598、bug 报告含 subagent 上下文 #21763）、并行协作与共享内存（#18287）、本地 subagent 路线图（#20195）。
- **上下文工程优化**：AST 感知工具（#22745/#22746）、"Tactful Extraction" 精准读取（#19561）、基于文件的任务追踪替代 in-context todo（#18836）——社区在系统性对抗 token 膨胀和上下文腐烂。
- **安全加固**：破坏性命令防护（#22672）、零依赖 OS 沙箱（#19873）、本周多个安全 PR（OAuth origin、token 外泄、A2A 鉴权）显示安全是当前工程重点。
- **会话管理增强**：`/fork` 非破坏性分支是今日最亮眼的社区新功能提案。

## 开发者关注点

- **失败被伪装为成功**是最高频痛点：subagent 达到 MAX_TURNS、browser agent 在 Wayland 失败等都以 "GOAL success" 呈现，掩盖了中断，用户无法信任结果（#22323、#21983）。
- **Agent 挂起/卡死**：generalist agent 无限挂起（#21409）、交互式 prompt 卡死（#22465），直接影响日常可用性。
- **配置不生效**：Browser Agent 忽略 settings.json（#22267）、symlink 的 agent 文件不被识别（#20079）。
- **MCP 用户体验**：工具数超 128 报 400（#24246）、env 值解析截断（#30331）、工具过滤不支持逗号（#30332）——MCP 重度用户的摩擦点密集。
- **工作区卫生**：模型随机目录生成临时脚本污染 commit（#23571），清理成本高。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-11-25）

## 1. 今日速览

过去 24 小时 copilot-cli 发布了密集的 1.0.116 系列预发布版本（-0 至 -3），聚焦 MCP 服务治理、时间线导航和 ACP 编辑器体验。Issue 活跃度较高（35 条更新），其中一条 **沙箱安全相关报告**（#5564：被 deniedPaths 拒绝的文件仍被读取并复制到 COPILOT_HOME）值得社区重点关注。无 PR 更新。

## 2. 版本发布

| 版本 | 重点内容 |
|---|---|
| [v1.0.116-3](https://github.com/github/copilot-cli/releases/tag/v1.0.116-3) | 新增：全屏时间线 "Jump to latest" 跳转回最新输出并恢复跟随；ACP 兼容编辑器可临时选择上下文大小（不改变保存的默认值）；支持为 Copilot 启动的每个进程设置环境变量 |
| [v1.0.116-2 / -1](https://github.com/github/copilot-cli/releases/tag/v1.0.116-2) | 新增：插件与独立 MCP server 连接同一端点时给出警告，并在 `/mcp` 中提示如何禁用其一。修复：取消挂起提示不再等待 activity 刷新；重连 host 后不再将空闲会话误标为 busy；Unix 上取消的前台进程处理改进 |
| [v1.0.116-0](https://github.com/github/copilot-cli/releases/tag/v1.0.116-0) | 改进：组织管理的 MCP server（Connectors 除外）跳过单独的慢连接/登录警告，登录需求汇总到启动摘要；启动时汇总需要关注的 MCP 状态，等待 `/mcp auth <name>` 后再打开浏览器 |
| [v1.0.115](https://github.com/github/copilot-cli/releases/tag/v1.0.115) | ACP 编辑器结构化澄清问题（表单支持）；Windows 沙箱包查询默认启用（`sandbox.userPolicy.capabilities: []` 可关闭）；允许 macOS 沙箱命令进行特定 Mach service 查询 |

**趋势解读**：本周期开发重点明显在 **MCP server 生命周期管理**（认证、冲突检测、状态汇总）和 **ACP 协议兼容性**，与下方多个热点 Issue 直接对应。

## 3. 社区热点 Issues（Top 10）

1. **[#5564](https://github.com/github/copilot-cli/issues/5564) 沙箱拒绝路径的文件仍被读取并复制到 COPILOT_HOME**（🆕）
   安全敏感：`deniedPaths` 中的文件被 `edit` 工具读取后，明文快照保存在 `~/.copilot/session-state/.../rewind-file-snapshots/`。沙箱用户应立即关注。

2. **[#1148](https://github.com/github/copilot-cli/issues/1148) Windows 下 CRLF 行尾污染（已关闭）**
   老牌高关注度问题（8 评论/9 👍）：Copilot 编辑 LF 文件后强制改为 CRLF。今日关闭，Windows 用户可验证修复效果。

3. **[#4275](https://github.com/github/copilot-cli/issues/4275) ACP 暴露 contextTier 会话配置（已关闭）**
   与 v1.0.116-3 的 "在 ACP 兼容编辑器中选择上下文大小" 直接对应，可视为已实现，是 ACP 平权交互 CLI 功能的又一里程碑。

4. **[#2165](https://github.com/github/copilot-cli/issues/2165) Ubuntu keychain 支持损坏（OPEN，23 👍）**
   长期未决的 Linux 认证痛点：文档与实际行为不符、secret-tool 依赖混乱。点赞数最高，值得维护者优先跟进。

5. **[#5323](https://github.com/github/copilot-cli/issues/5323) 请求增加禁用 agent checkpoint refs 的设置（OPEN）**
   `refs/agents/*` 以用户 git 身份创建 checkpoint ref，污染所有渲染 refs 的工具，社区希望有开关。

6. **[#5171](https://github.com/github/copilot-cli/issues/5171) NumLock 关闭时小键盘导航失效（已关闭）**
   Windows 终端回归问题修复关闭，Windows Terminal 用户可关注验证。

7. **[#4755](https://github.com/github/copilot-cli/issues/4755) 会话永久卡死（wedged）状态**
   排队消息落在 turn 末尾时会话既非 idle 也非 running，无法恢复只能杀进程。稳定性核心问题。

8. **[#5040](https://github.com/github/copilot-cli/issues/5040) MCP OAuth：Entra ID 拒绝 127.0.0.1 回调（AADSTS50011）**
   企业级 Microsoft Entra 保护的远程 MCP server 无法认证，企业集成的主要阻碍。

9. **[#5559](https://github.com/github/copilot-cli/issues/5559) [回归] macOS TLS 1.3 自 1.0.93-0 起损坏**
   macOS 用户连接企业 MCP 端点（如 Jenkins MCP）失败，新近回归但影响面可能较大。

10. **[#5569](https://github.com/github/copilot-cli/issues/5569) ACP：附加 shell 仍在运行时 Copilot 输出两次最终答案（🆕）**
    可通过 `sleep 45` 稳定复现，对 ACP 客户端（如 Zed）的 turn 结束语义有直接影响。

其他新提交值得留意：[#5568](https://github.com/github/copilot-cli/issues/5568)（MCP registry 请求缺少 User-Agent 被 AWS WAF 拦截）、[#5565](https://github.com/github/copilot-cli/issues/5565)（create_session 无限挂起且非 ASCII 名称乱码）。

## 4. 重要 PR 进展

过去 24 小时无 PR 更新，本节省略。

## 5. 功能需求趋势

- **MCP 生态成熟化**：OAuth/企业认证（#5040）、注册表请求规范（#5568）、重复端点治理（对应 1.0.116-2 新增警告）、过期重登（#5175）——MCP 已成为社区反馈最密集的领域。
- **ACP 协议平权**：contextTier 会话配置（#4275）、toolCall.title 透明度（#4335）、双答案问题（#5569），非交互/编辑器集成的需求持续增长。
- **沙箱安全与可控性**：#5564（拒绝路径泄露）、#5323（checkpoint refs 开关）、Windows/macOS 沙箱策略细化（1.0.115）。
- **配置灵活性**：BYOK 多 provider 支持（#4976，8 👍）、默认 Agent 设置（#5383）、权限跨会话持久化（#3253）。
- **可访问性与渲染质量**：屏幕阅读器体验（#1573）、markdown 渲染（#5084）、长输出截断（#3541、#5563）。

## 6. 开发者关注点

- **Windows 体验仍是痛点聚集地**：行尾污染（#1148，已修复）、键盘导航（#5171，已修复）接连解决，但长期积累的信任需要重建。
- **Linux/macOS 认证与网络问题悬而未决**：Ubuntu keychain（#2165，23 👍）和 macOS TLS 1.3 回归（#5559）是最影响日常使用的基础设施级 bug。
- **稳定性"卡死"类 bug**：会话 wedged（#4755）、create_session 挂起（#5565）、SIGINT 后模型仍在后台运行（#4863）——超时和取消机制是系统性薄弱点。
- **隐私与安全意识上升**：checkpoint refs 泄露会话结构、rewind 快照绕过沙箱拒绝路径，社区对 CLI 在仓库和主目录中留下的"痕迹"愈发敏感。

---
*数据来源：github.com/github/copilot-cli | 报告生成于 2026-11-25*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-25

## 今日速览

今日无新版本发布，社区活跃度集中在 Issue 讨论与 PR 提交上。两个值得高度关注的问题浮出水面：一是 **Go 订阅服务路由导致 prefix 重复计费**（#66067），二是 **配置热重载期间 provider deny 策略可被绕过的安全隐患**（#52333）。PR 方面，@Hona 集中提交了十余个时间线阅读体验优化 PR，@rekram1-node 则聚焦 MCP skills 与核心性能改进。

## 版本发布

过去 24 小时无新 Release。

## 社区热点 Issues

1. **[#66067](https://github.com/anomalyco/opencode/issues/66067) [Bug] Go 服务将同一会话路由到多个 deepseek-v4.1-flash 后端，每次切换重复计费整个 prefix**
   涉及真金白银的计费问题：同一 session header 下请求被分散到至少三个后端，各后端独立缓存导致 prefix 反复重算，直接推高用户成本。19 条评论，影响 Go 订阅用户的信任度，需优先修复。

2. **[#52333](https://github.com/anomalyco/opencode/issues/52333) [安全] 配置热重载期间 provider.use deny 策略可被绕过**
   已复现的高危问题：热重载窗口期内，被 deny 的 provider 可被选中，会话流量（含系统提示词与历史）可能静默流向第三方免费 provider。属于数据外泄风险，建议用户暂避频繁热重载插件。

3. **[#11176](https://github.com/anomalyco/opencode/issues/11176) [Feature] 官方 VS Code 扩展**
   长青需求，164 👍 + 41 评论，呼声持续数月。社区对官方 IDE 集成的期待是第一优先级功能。

4. **[#64073](https://github.com/anomalyco/opencode/issues/64073) [Feature] 恢复前台 Subagent 执行**
   27 条评论的 v2 核心交互需求：用户希望恢复对 subagent 执行的前台控制与可视化。

5. **[#52958](https://github.com/anomalyco/opencode/issues/52958) [Billing] 意大利用户所有支付方式均被拒绝**
   欧盟市场支付通道问题，用户尝试物理卡、Apple Pay、Stripe Link、虚拟卡全部失败。27 条评论，影响 Go 订阅在 EU 的转化。

6. **[#66053](https://github.com/anomalyco/opencode/issues/66053) [Bug] 带重定向的 cd 命令绕过所有 shell 权限检查**
   `cd . > file` 这类命令被 ShellParse 排除出命令列表，从而跳过权限校验——又一个权限模型旁路问题，与 #48411（更好的沙箱权限控制，14 评论）共同指向权限体系需要系统性加固。

7. **[#66110](https://github.com/anomalyco/opencode/issues/66110) [Bug] 新会话偶发使用内置默认模型 opencode/big-pickle**
   已复现的 v2.4.1 配置加载问题，可能造成意外的流量计费与模型行为不一致。

8. **[#66146](https://github.com/anomalyco/opencode/issues/66146) [Bug] 删除 git worktree 会清空共享 skills 注册表**
   一个 worktree 的删除会触发从已删除目录重建全局 skills registry，波及其他所有项目。虽已关闭，但暴露了共享后台服务状态管理的脆弱性。

9. **[#66203](https://github.com/anomalyco/opencode/issues/66203) [Bug] TUI 模型变体（如 #high）选择后变“粘滞”无法更换**
   已关闭的交互 bug，但影响日常 TUI 工作流，`/models`、`Ctrl+X M` 全部失效，值得已升级用户确认修复情况。

10. **[#66072](https://github.com/anomalyco/opencode/issues/66072) [Bug] MCP subscriptions/listen 流断开后 list_changed 永久失效**
    现代 MCP 连接中监听流一旦断开（服务器重部署、代理空闲超时等），工具/提示/资源变更通知永久丢失，影响 MCP 生态的可靠性。

## 重要 PR 进展

1. **[#66245](https://github.com/anomalyco/opencode/pull/66245) fix(data): 固定 OG worker 的 OpenMono 字体**
   修复 #65994 合并后数据站点部署失败的问题，属于热修复。

2. **[#66246](https://github.com/anomalyco/opencode/pull/66246) perf(core): 文件 diff 只算一次并跳过空侧**
   所有 write/edit/patch 操作的 diff 构建成本优化，纯性能改进。

3. **[#66242](https://github.com/anomalyco/opencode/pull/66242) fix(core): Code Mode Bun.write 不再逐字节遍历 Uint8Array**（已合并）
   解决 #pain-points 频道反馈的“会话中服务器重启”问题，写入大文件时的阻塞是诱因之一。

4. **[#66130](https://github.com/anomalyco/opencode/pull/66130) feat(core): 为移动端 App 添加推送通知**
   服务端推送通知基础设施，draft 状态，移动端布局正在推进。

5. **[#66240](https://github.com/anomalyco/opencode/pull/66240) feat: 接入 OpenCodeWorkerd alarm()、WorkspaceDriver Identity 与 WorkerClient.fromWebSocket**
   远程执行平面系列第 5 个 PR，基于 Cloudflare Durable Object 休眠机制，是 SDK 远程化架构的关键一环。

6. **[#66217](https://github.com/anomalyco/opencode/pull/66217) feat(browser): 通过多路复用二进制 WebSocket 流式传输远程浏览器流量**
   远程浏览器流量通道重构，与桌面浏览器 pane（参见 #66172 冻结问题）形成呼应。

7. **[#66164](https://github.com/anomalyco/opencode/pull/66164) fix(core): 桥接 AI SDK V2 语言模型到 V3**
   修复 SAP AI Core 等仅提供 V2 模型的 provider 每轮报错的问题，扩展 provider 兼容面。

8. **[#66244](https://github.com/anomalyco/opencode/pull/66244) / [#66220](https://github.com/anomalyco/opencode/pull/66220) fix(core): MCP skills 标注来源服务器 & 支持仅凭 URI 加载 skill**
   两个 PR 完善 MCP skills 规范合规性。

9. **[#66054](https://github.com/anomalyco/opencode/pull/66054) / [#66173](https://github.com/anomalyco/opencode/pull/66173) / [#66188](https://github.com/anomalyco/opencode/pull/66188) / [#66033](https://github.com/anomalyco/opencode/pull/66033) / [#66230](https://github.com/anomalyco/opencode/pull/66230) fix(app): @Hona 的时间线阅读体验系列**
   一整套 stack PR：滚动位置保持、历史分页预加载与动态页面大小、行内滚动时的追频策略，显著提升长会话浏览体验。

10. **[#65994](https://github.com/anomalyco/opencode/pull/65994) feat(data): 数据站点各区块分享/嵌入卡片**（已合并）
    opencode.ai/data 的社交分享功能，含品牌化卡片生成。

## 功能需求趋势

- **IDE 集成**：VS Code 官方扩展（#11176）持续领跑需求榜，官方 TUI/Desktop 之外的入口是社区最强诉求。
- **计费与订阅可靠性**：Go 服务路由重复计费（#66067）+ 意大利支付失败（#52958），商业链路的稳定性成为新的关注焦点。
- **权限与沙箱**：权限模式易用性（#48411）与多个权限绕过 bug 共同指向“更完善、更难绕过的执行沙箱”需求。
- **可配置性与本地化**：费用显示货币可配置（#66087，CNY）、Galician 翻译等表明国际用户基础扩大。
- **无障碍（a11y）**：屏幕阅读器对流式内容的播报（#54652、#57512 已关闭）正在被系统性解决。
- **移动端**：推送通知 PR（#66130）显示移动端是明确的路线图方向。

## 开发者关注点

- **模型配置的确定性**：新会话偶发回落到默认模型（#66110）、`-m` 根命令 flag 在 v2 被移除（#56218）、TUI 变体粘滞（#66203）、自定义 provider 启动时不注册（#66166）——v2 的配置加载与模型选择链路存在多处回归，是当前最高频的痛点。
- **会话状态与恢复**：Ollama 会话恢复报 ModelUnavailable（#62711）、长会话历史回放截断（#61189）、ACP 提前结束流式输出（#53914）。
- **共享后台服务的状态一致性**：worktree 删除清空 skills（#66146）、嵌入式 SDK 的 automation 不运行（#66133）、远程配对丢失 HTTPS URL（#66132），均指向后台服务生命周期管理的薄弱环节。
- **非拉丁键盘与 Windows 平台**：俄语布局下快捷键失效（#55676）、Windows 路径比较 bug（#66192）、Wayland 合成器冻结（#66172），跨平台细节仍需打磨。
- **命令语义混淆**：`/thinking` 与 `/effort` 行为相同（#51542）反映 CLI 命令语义的清晰度问题。

---
*数据来源：github.com/anomalyco/opencode（统计窗口：过去 24 小时）*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-11-25）

## 一、今日速览

今日无新版本发布，但主线围绕 **CI 稳定性**与** Managed Agent 生态建设**双线推进：昨日至今日新增多条 Managed Agent gate / E2E 测试失败报告（#18252、#18253、#18258 等），社区已提交集中修复 PR（#18297）；功能侧，1.0 Preview 事件驱动内核落地追踪 Issue（#17045）持续活跃，Web Shell、memory、hooks 等方向均有新 PR 进入评审。此外，一个**会话日志明文记录 API key 的安全问题**（#18165）值得所有用户留意。

---

## 二、版本发布

过去 24 小时无正式 Release。夜间版本 v0.28.3 的两次发布工作流失败已由 autofix 处理并关闭（#18244、#18241）。

---

## 三、社区热点 Issues（Top 10）

1. **[#17045](https://github.com/QwenLM/qwen-code/issues/17045) — 1.0 Preview 内核分片落地追踪（P1）**
   24 条评论，今日更新。事件驱动的 agent loop 内核（`query()` 单一入口）将逐面（surface）合入 main，并支持回退开关。这是 1.x 路线图的核心工程，直接决定未来 CLI/Web Shell 的架构形态。

2. **[#18165](https://github.com/QwenLM/qwen-code/issues/18165) — 会话日志明文记录 API key（安全）**
   更换 Token Plan API key 时，cat/grep 输出中的完整 key 被明文持久化到 `.jsonl` 会话日志，且在多个字段重复存储，文件权限偏宽。属于敏感信息落盘风险，建议用户尽快自查 chats 目录权限。

3. **[#13113](https://github.com/QwenLM/qwen-code/issues/13113) — 长会话文件快照二次方增长，超 256 MiB 索引上限后无法打开（P1）**
   `file_history_snapshot` 无界增长导致会话彻底不可加载，256 MiB 限制还是硬编码。影响重度用户的长会话可用性，已标记 ready-for-human。

4. **[#18252](https://github.com/QwenLM/qwen-code/issues/18252) — E2E 测试失败：cron tools 默认注册等 74 项用例**
   标记为“临时报告”，main 已推进，新 run 通过即可关闭。反映了高频推送下 CI 报告的滞后性问题。

5. **[#18253](https://github.com/QwenLM/qwen-code/issues/18253) / [#16346](https://github.com/QwenLM/qwen-code/issues/16346) — ClassSizeRatchetTest 失败**
   生产类尺寸棘轮测试反复失败，#16346 已持续 3 周未闭环，暴露托管 SDK 侧类膨胀治理问题。

6. **[#18258](https://github.com/QwenLM/qwen-code/issues/18258) / [#18287](https://github.com/QwenLM/qwen-code/issues/18287) — Hosted 进程崩溃容错门禁（MySQL）失败**
   进程崩溃场景“不重复、不伪造结果”的门禁测试失败，涉及托管 Harness 的可靠性核心保证，与 PR #18297 的修复直接相关。

7. **[#18149](https://github.com/QwenLM/qwen-code/issues/18149) — 扩大 Action parking 覆盖范围（无状态 Harness Phase 4 后续）**
   首批增量仅 park 冷恢复已接受的等待场景，多数真实会话在等待工具审批时仍驻留内存。该提案决定托管模式的资源占用上限。

8. **[#10791](https://github.com/QwenLM/qwen-code/issues/10791) — `<thinking>` 块内容泄漏到用户可见输出（P2）**
   修复 PR #11188 验证持续更新（最新至 10-07），仍是模型输出体验的高频痛点。

9. **[#17446](https://github.com/QwenLM/qwen-code/issues/17446) — CLI 自定义 Provider 配置时自动发现模型列表（P2）**
   希望将 `/auth` 的模型发现体验扩展到 OpenAI/Anthropic 兼容端点的自定义 Provider 流程，降低接入第三方网关的摩擦。

10. **[#18030](https://github.com/QwenLM/qwen-code/issues/18030) — 项目 auto-memory 在 Git worktree 间共享（P2）**
    #6462 使每个 worktree 有独立记忆目录，跨 worktree 的经验无法沉淀，配套 PR #18230 已在推进。

---

## 四、重要 PR 进展（Top 10）

1. **[#18297](https://github.com/QwenLM/qwen-code/pull/18297) — 集中修复 main 分支可复现失败**（fix CI）
   一站式修复 Hosted Harness 命令标识超限、storage overlap guard 误比较等近期 CI 红灯，今日新鲜提交，是恢复主干绿色的关键 PR。

2. **[#18301](https://github.com/QwenLM/qwen-code/pull/18301) — Web Shell 未设置布尔项显示"Not set"徽标**（fix web-shell）
   修复 #18298：`experimental.unifiedAgentLoop` 等无 schema 默认值的设置被渲染为 OFF 的误导性问题，新增轮廓式“未设置（各 surface 自用默认值）”标识。

3. **[#18267](https://github.com/QwenLM/qwen-code/pull/18267) — Managed Agent 封闭 JSON 字段显式化**（refactor）
   将四类封闭 JSON 结构（session 模型配置、runtime 对账状态、Boot/Ready 文档、执行定义字段）转为具名 Java 值，提升托管服务端的类型安全。

4. **[#18247](https://github.com/QwenLM/qwen-code/pull/18247) — 公开 Managed Agent Java 客户端**（feat sdk-java）
   为 Java 生态提供正式的托管 Agent 客户端 SDK，是 Managed Agent 平台化的对外接口基石。

5. **[#18280](https://github.com/QwenLM/qwen-code/pull/18280) — microVM PR review 执行的 guest-exec UDS 桥**（feat cli）
   分层沙箱 Phase 2-B：PR 审查在本地 microVM 内经 Unix domain socket 桥执行，无主机读写挂载、严格 fail-closed。安全隔离方向的重要进展。

6. **[#18257](https://github.com/QwenLM/qwen-code/pull/18257) — 模型请求前追加有效权限上下文**（fix core）
   参照 Codex 快照方案：审批模式变化时向对话历史追加提醒，让模型感知当前权限状态。

7. **[#18230](https://github.com/QwenLM/qwen-code/pull/18230) — 跨任务 worktree 保留工作区记忆**（feat memory）
   将私有项目 auto-memory 绑定到会话启动目录 / serve 注册的工作区，`--worktree` 检出不再丢失主工作区记忆，对应 Issue #18030。

8. **[#18266](https://github.com/QwenLM/qwen-code/pull/18266) — `UserPromptSubmit` hook 每条用户消息只触发一次**（fix hooks）
   工具结果、Stop 续跑、重试、自动 prompt 不再触发该事件；转向运行中会话的消息则逐一检查。

9. **[#18268](https://github.com/QwenLM/qwen-code/pull/18268) — Java SDK 支持普通 files profile 的 lifecycle v2 close**（已合入）
   修复 #18263：托管工作区会话关闭被 SDK 拒绝的问题，属于快速闭环的 bugfix。

10. **[#17437](https://github.com/QwenLM/qwen-code/pull/17437) — CLI 与 Web Shell 全面阿拉伯语 + RTL 布局支持**（feat i18n）
    覆盖 CLI、Web Shell 及导出 HTML 转录的 RTL 渲染，国际化版图持续扩张。

其他值得注意：#18290（Hosted Harness Session 按职责拆分，已关闭）、#18282（triage bot 令牌回退到 GITHUB_TOKEN，已合入）、#18300（修复 CI Patrol checkout 误写全局 Git config）。

---

## 五、功能需求趋势

- **Managed Agent / 托管服务化**：绝对主线。Issue #18149、#18289，PR #18247、#18267、#18268、#18290 均围绕 Hosted Harness 的生命周期、无状态化与 SDK 对外接口展开。
- **1.0 内核重构**：#17045 的事件驱动 loop 内核分片落地，涉及 session-management 核心架构演进。
- **Web Shell 体验**：自定义面板（#18159）、设置语义准确性（#18298）、跨设备输入历史（PR #18120）、mid-turn 消息转录（#17559，已关闭）。
- **记忆与上下文**：worktree 记忆共享（#18030）、compaction 后指向转录原文（#16437，已关闭）——上下文压缩的信息损失是持续话题。
- **安全与隔离**：日志脱敏（#18165）、microVM 沙箱执行（PR #18280）、权限规则与审批上下文（PR #17372、#18257）。
- **Provider 生态**：自定义 Provider 模型发现（#17446）、第三方扩展提交通道（#14540）。

---

## 六、开发者关注点

1. **CI 噪声大**：Managed Agent gate / E2E 失败报告占今日 Issue 的近一半，且多为“临时报告”（main 推进后自愈）。社区正在投入 PR #18297、#18282、#18300 系统性降噪，但开发者需学会区分真实回归与噪声。
2. **长会话稳定性**：256 MiB 硬编码索引上限（#13113）是重度用户最实质的阻断点，会话数据无界增长问题尚无根本解。
3. **敏感信息落盘**：#18165 提示日志脱敏与文件权限收紧需求，建议运维侧立即审查 `~/.qwen/projects/*/chats/` 的可读性。
4. **Hooks 行为可预测性**：PR #18266、#18299 表明社区在持续打磨 hooks 的触发语义与错误可见性——hook 静默失效是开发者调试痛点。
5. **多设备/多工作区一致性**：Web Shell 输入历史同步（#18120）、worktree 记忆（#18230）反映“同一工作环境跨场景”的一致性诉求正在成为标配期望。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*