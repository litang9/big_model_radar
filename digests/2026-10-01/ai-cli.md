# AI CLI 工具社区动态日报 2026-10-01

> 生成时间: 2026-09-30 23:46 UTC | 覆盖工具: 7 个

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
**数据窗口：2026-10-01 过去 24 小时 | 覆盖 7 款主流工具**

---

## 一、生态全景

AI CLI 工具已从“终端对话助手”全面演进为**多智能体编排平台**：Claude Code、Qwen Code 重仓 agent-team/Managed Agent 架构，Codex 与 Gemini CLI 聚焦子代理委派与跨设备协作。竞争焦点正从模型能力转向**工程可靠性**——数据丢失、计量透明度、静默失败、权限绕过等基础设施问题占据各社区热度前列。同时，**上下文经济性**（compaction、AST 精准读取、token 截断优化）成为新一轮差异化战场。安全态势明显升级：四款工具同期曝出权限/重定向绕过类漏洞，提示注入防护（CI 防火墙、egress 限制）开始进入工程实践。

---

## 二、各工具活跃度对比

| 工具 | 热点 Issues | 重要 PR | Release | 今日核心主题 |
|---|---|---|---|---|
| **Claude Code** | 10（最高 💬63） | 9 | v2.1.286 | 会话数据安全、计费异常、diff 性能 |
| **Codex** | 10+（最高 💬51/👍40） | 10+ | rust-v0.159.3 + 4 个 alpha | Windows 回归、Remote 配对、core 质量攻坚 |
| **Gemini CLI** | 10（P1×4） | 10 + 1 安全 PoC | v0.64.0-nightly | 子代理可靠性、AST 工具链、数据安全修复 |
| **Copilot CLI** | 10+（最高 💬32/👍31） | 0 | v1.0.90–91（连发） | MCP 生态、权限粒度、认证回归 |
| **OpenCode** | 10（最高 💬19/👍29） | 10+ | v1.18.34 | 插件 API、计量信任危机、Extension-first GUI |
| **Qwen Code** | 10（最高 💬38） | 10+ | v0.24.7-nightly | Managed Agent 双路径架构 |
| **Kimi Code CLI** | 0 | 0 | 无 | 无活动 |

> Claude Code 与 Codex 的单 Issue 互动量（50+ 评论）显著高于其他工具，头部效应明显；Copilot CLI 无 PR 动态但 Issue 讨论深度不低，推测为闭源协作模式。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **子代理可靠性** | Gemini（#22323 假成功、#21409 挂起）、OpenCode（#36423 不可取消、#52378 假成功）、Codex（#40852 委派工具缺失）、Qwen（#12959 并发限流） | “报成功实失败”与“挂起无兜底”是跨工具通病，自动化流水线无法信任结果 |
| **数据安全与会话持久化** | Claude Code（#59248 静默删除会话）、Gemini（PR #29584 会话误删修复）、Codex（SQLite 损坏恢复 PR #49701） | 三家同期处理会话数据丢失问题，反映会话持久化是共性薄弱环节 |
| **用量/配额透明度** | Claude Code（#97398 消耗速率暴增 3.6 倍）、OpenCode（Go 计量多 Issue 并发 #41391 等）、Codex（#31001 配额误报） | 计量系统信任危机是付费重度用户流失的直接风险 |
| **权限系统安全漏洞** | OpenCode（#52083 复合命令丢失重定向）、Qwen（#13106 同类 P1）、Claude Code（#88790 伪造用户确认） | **shell 重定向绕过写防护在两家工具中同型出现**，疑似行业性设计缺陷，建议全生态审计 |
| **Windows 平台稳定性** | Codex（Top 10 中 7 个 Windows 问题）、Qwen（#13076 闪退）、Claude Code（PR #98445 进程合并利好） | Windows 是公认的兼容性洼地 |
| **上下文经济性** | Claude Code（#82144 skill 重注入成本 4 倍）、Gemini（AST EPIC #22745、Tactful Extraction）、Codex（PR #49712 UTF-8 截断优化） | 减少 token 浪费已成各家的系统性工程方向 |
| **多智能体/跨用户协作** | Claude Code（#87954 跨用户会话通信）、Codex（Android Remote 配对）、Qwen（Managed Agent 双路径） | Agent 从单机走向跨设备、跨用户编排 |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 企业级安全实践、skills/memory 生态、diff 深度集成 | 重度专业开发者、企业团队 | 闭源、官方主导，CI 防火墙与审查子代理的安全范式领先 |
| **Codex** | 跨设备（CLI/桌面/Android Remote）、ChatGPT 账号体系深度整合 | ChatGPT 订阅用户、移动办公者 | Rust 重写 core，0.160/0.161 双通道快速迭代 |
| **Gemini CLI** | 子代理体系、AST 感知工具链、非交互/headless 场景 | 开源社区开发者、CI/CD 场景 | 开源、官方主导调研（ast-grep 等），工程透明 |
| **Copilot CLI** | MCP 生态、BYOK 多模型、GitHub 原生集成 | GitHub 生态用户、企业（Azure） | 闭源，安全分层（只读自动放行 + 写操作审批）设计精细 |
| **OpenCode** | 插件 API、多 Provider（含国产模型）、可扩展 GUI | 生态共建者、多模型/自托管用户 | 开源、Extension-first 架构、社区贡献活跃（单版本 3 位贡献者） |
| **Qwen Code** | Managed Agent 双路径、Hosted Workspace、会话持久所有权 | 架构探索型用户、国产模型生态 | 开源，分阶段大型架构演进（Stage D/G），审查流程最重（5–8 轮） |
| **Kimi Code CLI** | — | — | 当前无社区活动，处于观察期 |

---

## 五、社区热度与成熟度

- **第一梯队（成熟 + 高热）**：Claude Code、Codex——单 Issue 互动量 50+ 评论，但问题性质偏“运营/信任类”（计费、数据丢失），说明用户基数大、依赖度深
- **快速迭代梯队**：Gemini CLI、Qwen Code、OpenCode——PR 密度高、架构级重构频繁，处于从可用走向可靠的攻坚期；Gemini 和 OpenCode 对社区反馈响应最快（Issue 当日即有对应 PR 合并）
- **稳定演进**：Copilot CLI——版本节奏稳定，但 MCP 相关 bug 密度最高，企业网络兼容性落后于 VSCode 端
- **静默期**：Kimi Code CLI——连续 24 小时无活动，生态参与度暂处末位

---

## 六、值得关注的趋势信号

1. **“假成功”是 Agent 可信度的最大威胁**：Gemini、OpenCode 同日曝出子代理误报成功，叠加 Qwen 的静默遥测缺失——**自动化流水线不能盲信 agent 状态上报**，建议关键操作引入独立校验层。

2. **Shell 重定向绕过是行业性漏洞模式**：OpenCode #52083 与 Qwen #13106 同型（复合命令拆分丢失重定向目标）。所有基于命令解析的权限系统都应重新审计此类攻击面。

3. **计量透明度将成为付费工具的竞争壁垒**：三家工具同期爆发计量信任问题。Claude Code #97398 的“本地转录对账”方法值得重度用户借鉴——**留存自己的用量数据**。

4. **上下文经济性进入工具层竞争**：Gemini 的 AST 感知读取、Claude Code 的 skill 重注入问题、Codex 的截断优化表明：单纯堆上下文的时代结束，**精细化 token 管理能力**将直接影响实际使用成本。

5. **安全工程化成为头部工具的分水岭**：Claude Code 的 CI egress 防火墙（防提示注入供应链攻击）、Copilot 的静态可分析管道审查、Gemini 的不可信目录只读边界——这些模式均可直接复用于企业内部 Agent 部署。

6. **多智能体编排从单机走向分布式**：跨用户通信、跨设备配对、Hosted Workspace、ACP 子进程——Agent 的所有权、恢复、凭证治理是下一个六个月的架构主战场。

**给开发者的行动建议**：升级前锁定已知良好版本（近期回归高发）；重要会话手动备份；评估权限配置中的重定向攻击面；对子代理结果建立独立验证机制。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-10-01）

## 一、热门 Skills 排行（按讨论度/活跃度）

| # | Skill | 功能 | 热点 | 状态 |
|---|-------|------|------|------|
| 1 | **skill-creator 触发评估修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 修复 skill 触发评估在 Windows 上的 select() 失败、多 worker 竞争导致的假阴性 | 社区对 skill 触发可靠性（Issue [#556](https://github.com/anthropics/skills/issues/556)：`claude -p` 0% 触发率、[#1383](https://github.com/anthropics/skills/issues/1383) 六项问题）反映强烈，该 PR 是核心修复 | OPEN，持续更新 |
| 2 | **mcp-builder 修复** ([#1742](https://github.com/anthropics/skills/pull/1742)) | 适配 mcp>=2 的 `streamable_http_client` 重命名与自定义 Header | 配合 Issue [#1390](https://github.com/anthropics/skills/issues/1390)（评估器对真实 MCP 服务器全 0 分），mcp-builder 是质量吐槽重灾区 | OPEN |
| 3 | **docx 系列修复** ([#1792](https://github.com/anthropics/skills/pull/1792)、[#541](https://github.com/anthropics/skills/pull/541)) | LibreOffice 超时误报成功、tracked change ID 冲突导致文档损坏 | docx 是使用最广的官方 Skill，质量问题（孤儿批注 [#1734](https://github.com/anthropics/skills/pull/1734)）持续被提交 | OPEN |
| 4 | **AWT AI E2E 测试** ([#822](https://github.com/anthropics/skills/pull/822)) | 零代码 AI 视觉 + 浏览器控制的端到端测试生成 | 测试自动化方向关注度最高的 PR，长期未合并但持续活跃 | OPEN |
| 5 | **pyxel 复古游戏开发** ([#525](https://github.com/anthropics/skills/pull/525)) | Python 复古游戏的创建/调试/无头验证 | 由 pyxel 作者本人提交，挂起 7 个月仍活跃 | OPEN |
| 6 | **claude-api 模型退役更新** ([#1607](https://github.com/anthropics/skills/pull/1607)) | 标记 4 个已退役模型 ID；呼应 Issue [#1487](https://github.com/anthropics/skills/issues/1487)（该 Skill 单次注入 ~156k tokens 耗尽上下文） | claude-api Skill 的 token 效率是热门议题 | OPEN |
| 7 | **document-typography** ([#514](https://github.com/anthropics/skills/pull/514)) | AI 生成文档的排版质量控制（孤行、孤词换行、编号错位） | 切中"AI 生成文档排版差"普遍痛点 | OPEN |
| 8 | **testing-patterns** ([#723](https://github.com/anthropics/skills/pull/723)) | 覆盖 Testing Trophy、单测/React/集成的完整测试方法学 | 与 AWT 一同构成测试方向两大 PR | OPEN |

## 二、社区需求趋势（来自 Issues）

1. **分发与信任机制**（最热，43 评论 [#492](https://github.com/anthropics/skills/issues/492)）：社区 Skill 冒用 `anthropic/` 命名空间的信任边界滥用；组织内共享机制缺失（[#228](https://github.com/anthropics/skills/issues/228)）。
2. **Skill 工程化质量工具**：skill-quality-analyzer / skill-security-analyzer（[#83](https://github.com/anthropics/skills/pull/83)）、推理质量门禁流水线（[#1385](https://github.com/anthropics/skills/issues/1385)）——社区希望有"评估 Skill 的 Skill"。
3. **Agent 记忆与治理**：compact-memory 紧凑记忆符号（[#1329](https://github.com/anthropics/skills/issues/1329)）、agent-governance 安全治理（[#412](https://github.com/anthropics/skills/issues/412)）。
4. **安全与批量操作防护**：blast-radius 批量破坏性操作检查清单（[#1776](https://github.com/anthropics/skills/pull/1776)）、eval-viewer XSS（[#1394](https://github.com/anthropics/skills/issues/1394)）。
5. **文档格式扩展**：ODT 支持（[#486](https://github.com/anthropics/skills/pull/486)）、Markdown 转视频（[#1703](https://github.com/anthropics/skills/pull/1703)）。
6. **运维/基础设施**：HPC Slurm 集群操作（[#1615](https://github.com/anthropics/skills/pull/1615)）。

## 三、高潜力待合并 Skills

- **[#1298](https://github.com/anthropics/skills/pull/1298)** skill-creator 触发评估修复 — 直击多个高赞 Issue，最可能优先合并
- **[#1742](https://github.com/anthropics/skills/pull/1742)** mcp-builder mcp>=2 兼容 — 有对应 Issue #1668 且 9 月底仍在更新
- **[#1681](https://github.com/anthropics/skills/pull/1681)** skill-creator 打包脚本独立执行修复 — 同一活跃贡献者，小而确定
- **[#1607](https://github.com/anthropics/skills/pull/1607)** claude-api 模型退役 — 纯事实性修正，合并门槛低
- **[#541](https://github.com/anthropics/skills/pull/541)** / **[#538](https://github.com/anthropics/skills/pull/538)** docx/pdf 修复类小 PR — 低风险高价值

⚠️ 需警惕：[#1771](https://github.com/anthropics/skills/pull/1771) proofcore-contract-auditor 将审计证明锚定到 TON 区块链，带有明显项目推广性质，是 Issue #492 所指"信任边界滥用"的典型案例，合并概率低。

## 四、生态洞察（一句话）

> 社区最集中的诉求已从"新增 Skill"转向 **Skill 的可信分发（命名空间治理、组织共享）与工程化质量（触发可靠性、评估工具、上下文效率）**——即 Skills 生态正在从数量扩张进入质量与治理阶段。

---

# Claude Code 社区动态日报 · 2026-10-01

## 📌 今日速览

Claude Code 发布 **v2.1.286**，权限提示新增堆叠计数与全屏模式鼠标支持。社区最热的两个方向是：**会话数据安全**（静默清理导致会话记录丢失，#59248 已积累 55 条评论）与**用量计费异常**（9 月 25 日重置后周限额消耗速率暴增 3.6 倍，#97398）。PR 方面，团队集中优化 diff 面板性能与 CI 安全加固。

---

## 🚀 版本发布

### v2.1.286
- **权限提示计数**：多个权限请求堆叠时显示 "2 of 5" 计数，避免用户迷失在授权队列中
- **全屏模式鼠标支持**：列表的 "N more" 折叠行支持点击跳转，带 hover 和按下状态
- 修复多个 Claude Code 进程相关问题

---

## 🔥 社区热点 Issues

**1. [#82056] 会话无法确认 auto-memory 索引加载状态**（OPEN，63 评论）
用户无法判断自动记忆索引是完整加载、被截断还是完全未加载，直接影响记忆功能的可信赖度。作为评论区最活跃的 Issue，反映社区对 memory 透明度的强烈诉求。
🔗 https://github.com/anthropics/claude-code/issues/82056

**2. [#59248] 静默清理策略删除会话记录，无警告、无恢复**（OPEN，55 评论，38 👍）
后台保留策略静默删除历史会话转录，包括前一天的工作记录，属于数据丢失级 bug。38 个 👍 说明触达大量用户痛点。
🔗 https://github.com/anthropics/claude-code/issues/59248

**3. [#97398] 9 月 25 日重置后周限额消耗速率增快约 3.6 倍**（OPEN）
用户用本地转录去重统计：上周 9,352 次响应才到 100%，本周 715 次已达 24%（约 30 次/1%）。数据详实，若属实将显著影响重度用户。
🔗 https://github.com/anthropics/claude-code/issues/97398

**4. [#82144] 压缩后 skill 全文重注入，成本约为压缩摘要的 4 倍**（OPEN）
compaction 后系统提醒会以字节截断方式重注入每个已调用 skill 的完整正文，5 个 skill 场景下上下文开销超过压缩摘要本身——与 compaction 的初衷背道而驰。
🔗 https://github.com/anthropics/claude-code/issues/82144

**5. [#98184] Wi-Fi 切换后请求在死连接上挂起 184 秒才重试**（OPEN，Linux，有复现）
网络切换场景下的重连体验问题，移动办公开发者的高频痛点。
🔗 https://github.com/anthropics/claude-code/issues/98184

**6. [#80569] Agent-team 队友忽略 subagent 定义中的 effort frontmatter**（OPEN）
effort 是文档明确支持的字段，但在 agent-team 模式下被静默忽略，多智能体编排的用户将遇到行为不一致。
🔗 https://github.com/anthropics/claude-code/issues/80569

**7. [#88790] AskUserQuestion 工具结果无法与真人回复区分**（OPEN，安全相关）
subagent 可伪造“用户确认”，存在权限绕过的安全隐患，属于值得重视的安全设计缺陷。
🔗 https://github.com/anthropics/claude-code/issues/88790

**8. [#87954] 功能需求：跨用户会话通信通道**（OPEN）
希望两个不同用户的 Claude Code 会话能互相对话、交接工作——社区对协作式 agent 工作流的想象正在扩展。
🔗 https://github.com/anthropics/claude-code/issues/87954

**9. [#94353] Windows 桌面版斜杠命令菜单对屏幕阅读器完全静默**（OPEN，a11y）
NVDA 用户无法感知斜杠命令菜单，无障碍支持仍是明显短板。
🔗 https://github.com/anthropics/claude-code/issues/94353

**10. [#98541] GitHub 集成仅支持公开仓库**（CLOSED，duplicate）
无法访问私有/组织仓库，虽被标记重复关闭，但反映 GitHub 集成的实际可用性限制。
🔗 https://github.com/anthropics/claude-code/issues/98541

---

## 🔧 重要 PR 进展

**1. [#98445] diff 面板：单 git 进程读取所有文件的 hunks**（CLOSED，已合并）
每次工具调用后最多 50 个 git 进程合并为 1 个，Windows 上收益最大（进程启动慢、易超时）。
🔗 https://github.com/anthropics/claude-code/pull/98445

**2. [#98357] diff 面板：自动感知外部完成的 merge，减少分支名异常时的轮询**（CLOSED）
不再每 2 秒启动一次 git 轮询，静默状态下成本更低。
🔗 https://github.com/anthropics/claude-code/pull/98357

**3. [#98374] diff 面板：rebase 完成后重新读取 diff 而非显示"不可用"**（CLOSED）
修复 git 残留 `REBASE_HEAD` 导致的误判。
🔗 https://github.com/anthropics/claude-code/pull/98374

**4. [#94847] diff 面板：首次编辑仅在确有文件可列时才打开面板**（OPEN）
避免仓库外写入/ignored 文件触发空面板，diff 面板体验持续打磨中。
🔗 https://github.com/anthropics/claude-code/pull/94847

**5. [#97952] CI 安全加固：为调用 Claude 的 GitHub Actions 加防火墙**（CLOSED）
三个 Claude 相关 workflow 迁移到 egress 受限 runner，防止提示注入引发的供应链攻击。
🔗 https://github.com/anthropics/claude-code/pull/97952

**6. [#96434] 安全审查不再触碰 deny 规则与密钥文件**（OPEN，claude[bot]）
security-guidance 子代理遵循会话 Read deny/ask 规则，跳过 `.env` 等敏感文件，且无 shell 权限。
🔗 https://github.com/anthropics/claude-code/pull/96434

**7. [#97293] 类型声明补充 `process.run` 截断标志与 `mtimeMs`**（OPEN）
预告 npm CLI 将暴露 `isStdoutTruncated`/`isStderrTruncated` 及列表条目 `mtimeMs`，SDK 能力增强的前兆。
🔗 https://github.com/anthropics/claude-code/pull/97293

**8. [#98275] AGENTS.md 加载提示改写入 debug 日志**（CLOSED）
项目仅有 AGENTS.md 时不再在转录中新增行，与 2.1.286 内置行为对齐。
🔗 https://github.com/anthropics/claude-code/pull/98275

**9. [#39417] SKILL.md 补充前端关键设计思考步骤**（CLOSED）
社区贡献的 skill 设计指南增强。
🔗 https://github.com/anthropics/claude-code/pull/39417

---

## 📈 功能需求趋势

1. **上下文与记忆管理**：memory 加载透明度（#82056）、compaction 后 skill 重注入成本（#82144）——上下文经济性是最大呼声
2. **数据安全与可恢复性**：会话静默删除（#59248）引发对保留策略可控性的信任危机
3. **多智能体协作**：effort 覆盖、跨用户会话通信（#87954），agent-team 生态快速成形
4. **网络韧性**：连接切换、死连接重试（#98184），移动/远程场景可靠性
5. **无障碍（a11y）**：屏幕阅读器支持持续缺位（#94353）
6. **工具集成广度**：GitHub 私有仓库、DDEV 本地域名支持（#95139）

---

## ⚠️ 开发者关注点

- **计费透明度疑虑**：限额消耗速率突变（#97398）缺乏官方说明，建议重度用户留存本地用量数据以便对账
- **会话数据请自行备份**：在 #59248 修复前，重要会话转录建议手动归档
- **Windows 体验改善进行中**：diff 面板进程合并 PR（#98445）对 Windows 用户是显著利好
- **安全实践升级**：仓库自身的 CI 防火墙与审查子代理权限收紧，值得企业用户借鉴其模式

---
*数据来源：github.com/anthropics/claude-code | 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-01

## 1. 今日速览

Codex 今日发布 **rust-v0.159.3** 稳定版，主要新增 ChatGPT 登录会话的账户安全设置提醒功能；同时 0.161 alpha 线持续迭代（已至 alpha.5）。主仓库合入大量质量与性能改进 PR，集中在异步 I/O 优化、SQLite 损坏恢复和 Windows 兼容性。社区方面，**Windows 平台 bug 与 Android Remote 配对失败**仍是两大高热话题。

## 2. 版本发布

- **[rust-v0.159.3](https://github.com/openai/codex/compare/rust-v0.159.2...rust-v0.159.3)**：新增功能——符合条件的本地 ChatGPT 登录会话可显示可选的账户安全设置提醒（#49744）。
- **rust-v0.161.0-alpha.5 / alpha.4 / alpha.3**、**rust-v0.160.0-alpha.6.1**：预发布通道持续推进。
- 参考：**rust-v0.159.2** 曾修复 Windows 上后台进程/沙箱命令启动时的控制台窗口闪烁问题（#49385）。

## 3. 社区热点 Issues

1. **[#48043](https://github.com/openai/codex/issues/48043)** — Windows 上 CLI 0.157.0 因 daemon 权限错误无法启动（0.156.1 正常）。51 条评论、40 👍，是当前最受关注的回归问题。
2. **[#42739](https://github.com/openai/codex/issues/42739)** — Windows 桌面更新后本地 Projects 从侧边栏消失。39 条评论，关联 #42867，项目迁移问题影响面广。
3. **[#48774](https://github.com/openai/codex/issues/48774)** — Android Codex Remote 配对失败。28 条评论，Remote 配对是近期重灾区。
4. **[#36268](https://github.com/openai/codex/issues/36268)** — Android "Authorize this phone" 死循环，host 端收不到配对声明。长期未解的老问题（7 月至今）。
5. **[#40852](https://github.com/openai/codex/issues/40852)** — macOS code-mode 任务缺失 `send_message_to_thread` 工具，10 👍，影响子代理协作工作流。
6. **[#42973](https://github.com/openai/codex/issues/42973)** — Desktop 更新后 headless SSH 任务丢失线程消息与委派工具，影响 HPC 远程用户。
7. **[#48555](https://github.com/openai/codex/issues/48555)** — 桌面端切换 ChatGPT 账户后 Android 配对死循环，15 👍，跨账户状态污染诊断细致。
8. **[#43929](https://github.com/openai/codex/issues/43929)** — Linux 沙箱 bwrap "Bad file descriptor"：workspace 内 ≥2 个 deny 文件即启动失败，可稳定复现。
9. **[#43019](https://github.com/openai/codex/issues/43019)** — Windows 上每文件 fan-out `git diff --no-index`，数千个未跟踪文件耗尽 commit 内存导致系统崩溃，性能风险严重。
10. **[#48896](https://github.com/openai/codex/issues/48896)** — 多数启动卡在 spinner、renderer 挂载失败，附带分析与 workaround，Windows 体验痛点。

其他值得留意：#31001（GitHub code review 误报配额耗尽）、#49458 / #49551（Dots 委派任务缺失 Computer Use / Chrome 工具）、#49055（`service_tier: flex` 不支持导致 Business 用户完全不可用）。

## 4. 重要 PR 进展

1. **[#49715](https://github.com/openai/codex/pull/49715)** + **[#49744](https://github.com/openai/codex/pull/49744)** — TUI 账户安全设置提醒及 0.159.3 backport，23 个文件含完整回归测试。
2. **[#49713](https://github.com/openai/codex/pull/49713)** — 移除仓库本地的 Codex guidance、skills 与环境配置（AGENTS.md 等），仓库结构治理。
3. **[#49701](https://github.com/openai/codex/pull/49701)** / **[#49710](https://github.com/openai/codex/pull/49710)** — 启动时检测 SQLite 损坏并保留恢复备份；用类型化错误码替代字符串匹配判定损坏。
4. **[#49708](https://github.com/openai/codex/pull/49708)** — 会话索引 I/O 移出 async runtime 线程（`spawn_blocking`），避免阻塞。
5. **[#49712](https://github.com/openai/codex/pull/49712)** — token 预算截断改用 UTF-8 边界查找，避免全字符串扫描，性能优化。
6. **[#49690](https://github.com/openai/codex/pull/49690)** — Windows 提权沙箱中保留 PowerShell 相对路径，修复用户配置目录不可访问时的路径解析。
7. **[#49686](https://github.com/openai/codex/pull/49686)** — 远程消息板通知投递至活动 turn，作为 agent 消息呈现。
8. **[#49683](https://github.com/openai/codex/pull/49683)** — 新增 `in_app_voice` 托管 feature gate，暗示桌面端语音功能在准备中。
9. **[#49714](https://github.com/openai/codex/pull/49714)** — API-key cyber access 程序与模型发现解耦，独立于 `api_key_model_discovery` 开关。
10. **[#49704](https://github.com/openai/codex/pull/49704)** — 防止 npm alpha dist-tag 回退，发布工程健壮性改进。

另有一批 I/O 取消与批处理优化（#49692–#49696），以及 OpenTelemetry skill 调用事件导出（[#49689](https://github.com/openai/codex/pull/49689)）。

## 5. 功能需求趋势

- **Remote / 跨设备配对**：Android ↔ 桌面配对失败是多周持续热点（#48774、#36268、#48555、#49618、#49179），社区急需可靠的配对状态管理。
- **Dots / 子代理委派**：委派任务工具集不完整（缺 Computer Use、Chrome、`node_repl`、`send_message_to_thread`），#49458、#49551、#40852、#40397 反映出工具能力对齐需求。
- **沙箱能力与稳定性**：Linux bwrap、Windows 提权沙箱、`--yolo` 持久化均有关注。
- **配额可见性**：用量展示误报/重复（#31001、#48412、#47667）表明社区希望用量数据准确透明。
- **可观测性**：OpenTelemetry 事件（#49689）方向与开发者诉求一致。

## 6. 开发者关注点

- **Windows 是 bug 重灾区**：过去 24 小时 Top 10 Issues 中 7 个涉及 Windows——启动失败、Projects 丢失、内存耗尽、UI 卡死、控制台闪烁等。官方虽在 0.159.2 修复闪烁问题，但 0.157→0.158 的启动回归仍未闭环。
- **版本升级引入回归的信任问题**：多个 issue 标注“旧版本正常、升级后失败”，社区对升级路径稳定性不满。
- **CLI/app-server 稳定性**：async 阻塞、SQLite 损坏、会话恢复等底层问题在 PR 中密集修复，说明 core runtime 正经历一轮质量攻坚。
- **错误信息可操作性差**：如配额误报、配对循环无明确失败原因，开发者要求更可诊断的错误输出。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-10-01

## 📰 今日速览

Gemini CLI 昨夜发布 **v0.64.0-nightly**，核心改进集中在非交互模式下的自主计划执行。今日社区动态以 **Agent/Subagent 相关问题** 为主导——子代理挂起、误报成功、配置失效等 P1 问题持续发酵。同时新增多个高质量 PR，聚焦**数据安全（会话历史误删除）、性能优化（文件过滤）和交互可靠性（Ctrl+C 中断）**。

---

## 🚀 版本发布

**v0.64.0-nightly.20260930** ([Release](https://github.com/google-gemini/gemini-cli/releases))
- `fix(core)`: 非交互模式下启用自主计划执行（[PR #29539](https://github.com/google-gemini/gemini-cli/pull/29539)）——对 CI/CD 与 headless 场景是重要改进
- `fix(core)`: `maxChars <= 0` 时禁用工具输出截断，修复 `formatTruncatedToolOutput` 逻辑

---

## 🔥 社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) **子代理 MAX_TURNS 后误报 GOAL 成功** (P1, 💬13) | 可靠性核心问题：`codebase_investigator` 达到轮次上限却报告 `success`，掩盖真实中断，误导上层决策。13 条评论，社区高度关注 |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) **通用代理无限挂起** (P1, 👍8) | 即使创建文件夹这类简单操作也会挂起一小时以上，用户只能手动禁止子代理绕过 |
| 3 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) **零依赖 OS 沙箱 + bash 原生能力利用** (P2, 💬9) | 大型 enhancement：让 Gemini 3 充分发挥原生 bash 链式操作能力，同时通过沙箱保障安全，架构级讨论 |
| 4 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) **AST 感知的文件读取/搜索/映射 EPIC** (P2, 💬7) | 官方主导调研：AST 工具可精确定位方法边界、减少 token 噪声，关联 #22746/#22747 两个子任务 |
| 5 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) **模型不主动使用 skills 和子代理** (P2, 💬6) | 用户反馈自定义 skills 几乎不会被自动调用，只有显式指令才触发，影响整个扩展生态的实用性 |
| 6 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) **browser 子代理在 Wayland 下失败** (P1, 💬4) | Linux 桌面用户（Wayland）浏览器代理不可用，阻碍自动化测试场景 |
| 7 | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) **Browser Agent 无视 settings.json 配置** (P2, 💬4) | `maxTurns` 等配置在全局/项目级设置中被完全忽略，`AgentRegistry` 读取合并逻辑存在缺陷 |
| 8 | [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) **get-shit-done 输出 hook 导致崩溃** (P1, 💬3) | 输出摘要打印阶段反复崩溃 CLI，稳定性硬伤 |
| 9 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) **超过 128 个工具触发 400 错误** (P2, 💬3) | 工具数量上限对重度 MCP 用户是硬限制，需要智能化的工具作用域管理 |
| 10 | [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) **代理应阻止/劝阻破坏性操作** (P2, 💬3) | 模型在复杂 git 操作中偏好 `git reset` / `--force` 等危险命令，安全问题呼声渐高 |

---

## 🔧 重要 PR 进展（Top 10）

1. **[PR #29584](https://github.com/google-gemini/gemini-cli/pull/29584)** (P1) 修复**恢复会话后快速退出导致会话历史被永久删除**的数据丢失问题——今日最关键修复
2. **[PR #29583](https://github.com/google-gemini/gemini-cli/pull/29583)** (P1) 在不受信任目录中强制 `.gemini/settings.json` 只读边界，防止 `gemini mcp add` 等命令的破坏性覆盖写入
3. **[PR #29586](https://github.com/google-gemini/gemini-cli/pull/29586)** (P2) 修复 `Ctrl+C` 紧急中断在活跃操作期间被吞掉的问题，保障用户随时可中断 agent
4. **[PR #29580](https://github.com/google-gemini/gemini-cli/pull/29580)** (P1) ACP 会话按精确 ID 解析，修复新建会话恢复时报 "Invalid session identifier"
5. **[PR #29582](https://github.com/google-gemini/gemini-cli/pull/29582)** (P1) 性能优化：分层目录状态记忆化 + 通配符子树剪枝 + symlink 缓存，消除大仓库文件发现的数秒级阻塞
6. **[PR #29568](https://github.com/google-gemini/gemini-cli/pull/29568)** (P1) ChatRecordingService 改为 append-only 增量写入 + 有界历史窗口，消除全量重写
7. **[PR #29581](https://github.com/google-gemini/gemini-cli/pull/29581)** (P2) 支持 `@file:10-20` 行号引用解析，并修复窄终端下 ghost text 换行死循环
8. **[PR #29532](https://github.com/google-gemini/gemini-cli/pull/29532)** 修复 `RetryInfo` 延迟为 0 时被误判为**终态配额错误**，导致重试中止和模型降级
9. **[PR #29578](https://github.com/google-gemini/gemini-cli/pull/29578)** 修复远程 MCP OAuth 对 Google 端点（Docs/Sheets/Drive）刷新令牌丢失问题
10. **[PR #29457](https://github.com/google-gemini/gemini-cli/pull/29457)** (P1) 修复 `read-many-files` 中二进制文件被误判为“显式请求”导致的上下文膨胀（glob 匹配替换模糊子串匹配）

> ⚠️ 值得注意：[#29585](https://github.com/google-gemini/gemini-cli/pull/29585) 为 Google VRP 安全研究 PoC（已关闭），提醒维护者 CI 供应链安全。

---

## 📈 功能需求趋势

1. **Agent/Subagent 可靠性与可观测性**（最热）：状态误报、挂起、轨迹不可见（#22598）、bug report 缺子代理上下文（#21763）
2. **AST 感知工具链**：官方 EPIC 推进（#22745/#22746/#22747），探索 tilth/glyph/ast-grep 用于精准代码读取
3. **安全加固**：OS 级沙箱（#19873）、破坏性命令防护（#22672）、不可信工作区隔离（PR #29583）
4. **Token 效率**："Tactful Extraction" 外科手术式读取（#19561）、文件任务追踪替代 WriteToDo（#18836）
5. **浏览器自动化**：Wayland 支持、会话锁恢复、配置覆盖（#21983/#22232/#22267）
6. **多代理协作**：共享内存/并行子代理（#18287）、本地子代理 Sprint（#20195）

---

## ⚠️ 开发者关注点（痛点总结）

- **子代理“假成功”**：状态上报与实际执行不符，自动化流水线无法信任结果（#22323）
- **挂起无超时兜底**：子代理/generalist 挂起后无有效中断手段，`Ctrl+C` 修复（PR #29586）正是回应
- **数据丢失风险**：会话历史误删（PR #29584）、并行文件写竞争（PR #29499）显示并发场景仍脆弱
- **配置不生效**：settings.json 覆盖被忽略、symlink 代理无法识别（#22267/#20079）
- **上下文成本**：大文件读取“倾泻”造成 +15k tokens/turn 的膨胀，工具数量超限直接 400（#19561/#24246）
- **终端渲染体验**：resize 闪烁、滚动位置重置（#21924/PR #29520）在长会话中影响显著

---
*数据截至 2026-10-01 · 来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-10-01

## 1. 今日速览

过去 24 小时内 Copilot CLI 连续发布多个版本（最新 v1.0.91-0），重点优化了只读 shell 管道的自动执行审查机制，并修复了 Windows 下 Node/npm 沙箱网络问题。社区方面，**macOS 更新导致 CLI 全面失效的 writer-lock 问题**（#4998 / #5026）和 **1.0.89 启动认证竞态错误**（#5008）是今日最受关注的新报告。MCP 相关问题（注册表连接、OAuth 发现）持续占据社区讨论热度。

---

## 2. 版本发布

### v1.0.91-0
- **Improved**：完整且可静态分析的只读 shell 管道现在可进入“执行证据审查”流程，不完整或含未绑定变量的管道仍需显式批准——在安全性与流畅度间取得更好平衡
- **Fixed**：为 Windows 上 Node/npm 遇到的 EACCES socket 拒绝提供沙箱网络绕过选项

### v1.0.90 / v1.0.90-6 / v1.0.90-7
- 新增 **GPT-6.1 Sol** 模型选择支持
- 新增 `--mcp-github-auth`，可将 GitHub 账号认证限定到已批准的 MCP server origins
- 新增会话级只读目录批准
- 修复中断会话恢复后权限提示无法应答的问题
- 改进：紧凑时间线中点击展开的工具调用任意位置即可折叠；语音模式未就绪时 Space / Ctrl+X V 会给出提示

---

## 3. 社区热点 Issues

| # | Issue | 关注理由 | 数据 |
|---|-------|---------|------|
| [#1274](https://github.com/github/copilot-cli/issues/1274) | 代码审查请求频繁 400 错误 | 长期未解的核心可用性问题，95% 的 diff 审查请求失败，影响生产工作流 | 💬32 👍13 |
| [#1973](https://github.com/github/copilot-cli/issues/1973) | 交互模式工具白名单 | 安全粒度诉求强烈——目前要么逐次批准只读操作，要么 `/allow-all` 全放行，缺少中间方案 | 💬16 👍29 |
| [#3282](https://github.com/github/copilot-cli/issues/3282) | 多 BYOK 模型支持（已关闭） | BYOK 用户高度关注（👍31），切模型需重启会话，体验割裂；现已关闭，或已规划解决 | 💬11 👍31 |
| [#4438](https://github.com/github/copilot-cli/issues/4438) | `disable-model-invocation: true` 导致 Skill 完全不可达 | 与 Skill 系统设计预期相悖——本应“仅手动调用”，实际变成“无法调用” | 💬10 👍11 |
| [#5008](https://github.com/github/copilot-cli/issues/5008) | 1.0.89 启动报 "Not authenticated" | 新版本引入的回归，启动竞态在登录完成前读取模型归属，3 秒后自愈但报错干扰 | 💬4 |
| [#4998](https://github.com/github/copilot-cli/issues/4998) | macOS 更新后 `.mcp-writer.binding` 持久化过期设备 ID 导致不可用 | 系统级更新即“全灭”，影响面广；同日 [#5026](https://github.com/github/copilot-cli/issues/5026)（已关闭）复现相同问题 | 💬2 |
| [#4851](https://github.com/github/copilot-cli/issues/4851) | Azure MCP 注册表验证 BrokenPipe | 企业用户“一夜之间”中断，Rust 运行时对 Azure API Center 的兼容性问题 | 💬3 👍7 |
| [#2203](https://github.com/github/copilot-cli/issues/2203) | 任务中途切换 AutoPilot 模式 | 0.0.421 移除了 Shift+Tab 热切换，用户工作流被迫中断；与 [#3595](https://github.com/github/copilot-cli/issues/3595)（AutoPilot 应暂停等待确认）共同反映自动化控制权诉求 | 💬2 👍11 |
| [#4949](https://github.com/github/copilot-cli/issues/4949) | 企业自定义 MCP 注册表无法访问 | VSCode 可用而 CLI 不可用，企业 MCP 生态在 CLI 端存在能力缺口 | 💬2 |
| [#4935](https://github.com/github/copilot-cli/issues/4935) | Slack MCP OAuth 请求超集权限 | 仅暴露只读工具却索要全部写权限，最小权限原则失守，存在安全隐患 | 💬1 👍4 |

其他值得留意：[#2205](https://github.com/github/copilot-cli/issues/2205)（Terminator 滚动行为，💬14）、[#5015](https://github.com/github/copilot-cli/issues/5015)（Vim/less 风格键盘翻页）、[#5024](https://github.com/github/copilot-cli/issues/5024)（Opus 5.5 因 `anthropic-beta` 值被拒 400）。

---

## 4. 重要 PR 进展

过去 24 小时内无 PR 更新，本节省略。

---

## 5. 功能需求趋势

1. **权限与安全粒度**：工具白名单（#1973）、会话级目录批准、最小权限 OAuth（#4935）——v1.0.90 的目录批准是初步回应，但社区期待更细粒度的白名单机制
2. **模型灵活性**：GPT-6.1 Sol 已落地；多 BYOK 模型切换（#3282）、BYOK 子代理（#2554）仍是热点
3. **MCP 生态健壮性**：注册表连接（#4949、#4851）、OAuth issuer 带路径时的发现失败（#4662）、Figma Code Connect 数据缺失（#5025）——MCP 是当前 bug 密度最高的区域
4. **终端交互体验**：滚动/回溯改进集中爆发（#2205、#4894、#4995、#5015），长会话可读性是普遍痛点
5. **自动化控制权**：AutoPilot 中途切换（#2203）与人工确认暂停点（#3595）
6. **跨工具配置复用**：读取 `.claude/rules` / `.agents/rules`（#4440，已关闭），降低多 Agent 工具维护成本

---

## 6. 开发者关注点

- **稳定性回归**：近期版本频繁引入回归（1.0.89 认证竞态 #5008、macOS writer-lock #4998/#5026、Opus 5.5 beta header 400 #5024），升级前建议锁定已知良好版本
- **企业/代理网络环境**：Azure MCP、自定义注册表、代理认证问题反复出现，CLI 在企业网络拓扑下的兼容性落后于 VSCode 端
- **长会话管理**：resume 后滚动错乱、usage 统计不准、孤儿 tool_use 卡死会话等问题显示会话持久化机制仍是薄弱环节
- **安全默认值**：只读操作自动放行 + 写操作严格审批的分层模型呼声最高，与官方 v1.0.91 的管道审查改进方向一致

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-10-01

## 📰 今日速览

OpenCode 发布 **v1.18.34**，重点修复了 macOS 27+ 二进制签名问题，并在模型请求中加入会话标识头（直接回应了长期存在的 Go provider `MissingSessionID` 报错）。社区方面，**Go 配额计量不准**、**Zen 免费层版本校验异常**和**权限系统中复合命令丢失重定向**（潜在安全风险）是当日讨论最集中的话题。架构层面，"Extension-first GUI" 重构 PR 的出现预示桌面/网页端将迎来插件化重大变革。

---

## 🚀 版本发布

### v1.18.34
- 模型请求现在附带命名空间的 session 与 parent-session 身份头（应解决 [#47763](https://github.com/anomalyco/opencode/issues/47763) 的路由报错）
- 对本地编译的 macOS 二进制重新签名，确保在 macOS 27+ 上可靠运行（@ryangamerdev）
- macOS CLI 发布二进制改用 Developer ID 签名
- 感谢 3 位社区贡献者

---

## 🔥 社区热点 Issues

**1. XDG 规范违规：node_modules 装进 ~/.config**（#27786 · 19 评论 · 👍9）
运行时依赖被安装到 `~/.config/opencode` 而非 `~/.local/share`，违反 XDG Base Directory 规范。开放 4 个多月仍未关闭，是 Linux 用户体验的长期痛点。
🔗 https://github.com/anomalyco/opencode/issues/27786

**2. 核心会话能力对插件不可达**（#49389 · 12 评论）
详列 5 项核心已实现但插件无法调用的会话能力（compaction、removal 等）。今日已有两个针对性 PR 合并（见下文），社区推动力强。
🔗 https://github.com/anomalyco/opencode/issues/49389

**3. "Allow always" 权限不跨会话持久化**（#20066 · 已关闭 · 👍29）
高赞需求终于关闭，权限将保存到配置文件，是易用性的重要改进。
🔗 https://github.com/anomalyco/opencode/issues/20066

**4. 安全风险：复合 shell 命令丢弃重定向，已授权命令变成无提示写文件**（#52083）
权限扫描器拆分复合命令时遗漏重定向目标，被 allow 的命令可链式实现任意文件写入。⚠️ 建议优先关注。
🔗 https://github.com/anomalyco/opencode/issues/52083

**5. Go 配额计量与 Usage History / 文档限额不符**（#41391 · 5 评论）
百分比与美元金额对不上，配以 #52347（剩余额度 18%→82% 神秘跳变）、#52371（两天烧完限额）、#52337 等，**Go 订阅计量问题今日集中爆发**。
🔗 https://github.com/anomalyco/opencode/issues/41391

**6. 从未使用过的 gpt-6-luna 出现在用量报告中**（#52367 · 3 评论）
用户质疑用量归属准确性，与配额问题叠加，加剧对计量系统的信任危机。
🔗 https://github.com/anomalyco/opencode/issues/52367

**7. Zen 免费层错误要求 "1.18.0 or newer"（版本已更新）**（#52393 · 已关闭）
Desktop v1.18.33 被误判版本过旧，与 #49944 同源，今日快速关闭。
🔗 https://github.com/anomalyco/opencode/issues/52393

**8. Go provider 400 MissingSessionID**（#47763 · 👍9）
请求缺少 `x-opencode-session` 头导致路由失败——**v1.18.34 的发布说明直接针对此问题**。
🔗 https://github.com/anomalyco/opencode/issues/47763

**9. v2 后台 subagent 无法取消**（#36423 · 👍7）
v2 subagent 可启动、可恢复，但没有取消机制；配合 #52378（失败的 subagent 被报告为成功）和 #52372（无熔断的无限重试），subagent 可靠性短板集中显现。
🔗 https://github.com/anomalyco/opencode/issues/36423

**10. 本地插件无法解析 "@opencode/plugin" 导入**（#50434 · 3 评论）
文档推荐的 V2 插件写法在 Node/Bun 下正常、OpenCode 内报包找不到，阻碍插件生态发展。
🔗 https://github.com/anomalyco/opencode/issues/50434

---

## 🔧 重要 PR 进展

**1. refactor(app): Extension-first GUI 架构重构**（#52369 · OPEN）
桌面/网页端所有非核心功能改为基于统一 SDK 的内置 GUI 扩展，`packages/app` 只保留宿主概念。架构级大动作。
🔗 https://github.com/anomalyco/opencode/pull/52369

**2. feat(plugin): 暴露 session compaction / removal**（#52385 / #52387 · 已合并）
直接落地 #49389 的第 1、2 项诉求，插件 API 能力持续补齐。
🔗 https://github.com/anomalyco/opencode/pull/52385 · https://github.com/anomalyco/opencode/pull/52387

**3. fix(ai): 模型能力默认值向前兼容**（#52388 · 已合并）
GPT ≥ 6 默认开启 chronological effort，GLM ≥ 4.6 默认开启 tool streaming，覆盖未来版本号，减少每次新模型的配置摩擦。
🔗 https://github.com/anomalyco/opencode/pull/52388

**4. fix: 停止重试 Z.ai Responses 模型/权限拒绝**（#52135 · 已关闭）
Z.ai 在 HTTP 200 流内用 `response.failed` 报错，之前被错误重试。流式错误分类的重要修复。
🔗 https://github.com/anomalyco/opencode/pull/52135

**5. fix: 终止相同工具调用的无限循环**（#46272 · 已关闭）
同一工具+相同参数连续调用 10 次即停止会话，直接回应 #52372 类的重试风暴问题。
🔗 https://github.com/anomalyco/opencode/pull/46272

**6. fix: Nemotron / Qwen 内联工具 schema $ref**（#52391 · OPEN）
MCP 参数 `$ref` 被序列化为 JSON 字符串导致模型解析失败，影响国产模型生态。
🔗 https://github.com/anomalyco/opencode/pull/52391

**7. fix(core): 回滚被中断的 shell 获取**（#52386 · OPEN）
修复 `Shell.create` 中断后进程管理器泄漏问题。
🔗 https://github.com/anomalyco/opencode/pull/52386

**8. fix(github): 使用 share API 返回的真实 URL**（#52384 · OPEN）
GitHub agent 自行拼接的会话链接全部 404，改用 API 返回值。
🔗 https://github.com/anomalyco/opencode/pull/52384

**9. feat(cli): serve --no-auth 选项**（#43069 · OPEN）
支持显式关闭认证（`OPENCODE_AUTH=false`），便于内网部署场景。
🔗 https://github.com/anomalyco/opencode/pull/43069

**10. fix: 支持 GitLab Duo 自管实例**（#50844 · OPEN）
GitLab provider 改用配置的实例 URL，扩展企业自托管场景。
🔗 https://github.com/anomalyco/opencode/pull/50844

其他值得注意的清理批次（automated-pr-cleanup）：MCP 进程树终止（#46312）、恢复会话的提示处理（#46307）、桌面防降级更新（#46277）等均已关闭。

---

## 📈 功能需求趋势

1. **插件 API 补齐**：核心能力（compaction、removal、session 枚举）向插件开放是当前最活跃的主线，官方响应迅速
2. **Go/Zen 订阅计量透明化**：配额计算、用量归属、计费状态一致性是用户信任的核心诉求
3. **多 Provider 兼容**：Z.ai、GitLab Duo 自管、Nemotron/Qwen schema、Ollama 上下文窗口自动探测（#52346）、国产模型成本追踪（#34877）
4. **Subagent 可靠性**：取消机制、错误上报准确性、重试熔断成体系化需求
5. **桌面 UX 打磨**：`/compact` 回归、review 面板实时刷新、终端/文件即时可用（#52348）
6. **部署与企业场景**：no-auth serve、自托管 GitLab 支持

## ⚠️ 开发者关注点

- **安全**：复合命令重定向绕过权限检查（#52083 / #52360）值得所有用户评估自身 permission 配置风险
- **信任危机**：Go 计量问题今日多 issue 并发（#41391、#52347、#52367、#52371），疑似系统性计量缺陷而非个案
- **升级稳定性**：Desktop 2.0.18 丢失 `/compact`（#51638）、版本校验误判（#52393）提示升级前应关注回归报告
- **插件生态瓶颈**：`@opencode/plugin` 解析失败（#50434）和 `server()` 键静默禁用注册（#52321）两个问题会让新插件开发者踩坑
- **macOS 用户**：v1.18.34 的签名修复解决了 27+ 系统上的运行问题，建议尽快升级

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-10-01

## 一、今日速览

今日 Qwen Code 发布 v0.24.7 nightly 版本，社区焦点继续集中在 **Managed Agent 双路径架构**的推进上——Stage D/G 的多个跟踪 Issue 活跃讨论，多个关键 PR（Hosted 文件历史与撤销、私有 ACP 子进程、持久化 Hooks）密集提交。安全方面值得警惕：一个 **P1 级 Shell 重定向绕过 Write 防护**的漏洞报告（#13106）需要重点关注。

---

## 二、版本发布

**v0.24.7-nightly.20260930.57e720bc97** 已发布，包含：
- fix(core): 对齐 Code Mode 文本与 lazy tool 发现机制（[#12990](https://github.com/QwenLM/qwen-code/pull/12990)，@tanzhenxin）
- fix(permissions): 保留已批准权限（修复提交，changelog 截断）

---

## 三、社区热点 Issues

| # | Issue | 关注理由 |
|---|---|---|
| 1 | [#12380](https://github.com/QwenLM/qwen-code/issues/12380) Managed Agent 双路径架构提案（38 评论） | 全项目最热讨论，定义 Session 持久所有权、Workspace 绑定、可恢复工具执行的分阶段交付蓝图，是当前架构演进的总纲 |
| 2 | [#13106](https://github.com/QwenLM/qwen-code/issues/13106) **[P1]** cd 段静默丢弃重定向目标，绕过 Write 拒绝检查 | `cd somedir > .qwen/settings.json` 可绕过写保护，安全漏洞，需立即修复 |
| 3 | [#12867](https://github.com/QwenLM/qwen-code/issues/12867) Stage D 后续：持久生命周期、Turns、Actions（11 评论） | @wenshao 主导的架构落地跟踪，D1–D3 已交付，社区深度参与契约讨论 |
| 4 | [#13062](https://github.com/QwenLM/qwen-code/issues/13062) 投机接受失败时不产生任何遥测（8 评论） | 静默失败类缺陷，影响可观测性，telemetry 完整性问题 |
| 5 | [#13030](https://github.com/QwenLM/qwen-code/issues/13030) Hosted Workspace 新增只读搜索工具 profile（8 评论） | `list_directory`/`glob`/`grep_search` 进 Hosted 环境，扩展托管能力的关键一步 |
| 6 | [#13130](https://github.com/QwenLM/qwen-code/issues/13130) Desktop 所有 workspace 突然变为不可信且无法恢复 | 用户体验阻断性 Bug，UI 缺少恢复路径，等待 triage |
| 7 | [#13076](https://github.com/QwenLM/qwen-code/issues/13076) Windows 闪退无任何输出 | 多人独立复现（PowerShell/cmd 均有），launcher 未暴露 spawnSync 错误 |
| 8 | [#13122](https://github.com/QwenLM/qwen-code/issues/13122) Agent host 401 后重新注册留下旧凭证仍有效 | 凭证安全：重复注册不去重，旧 secret 未失效 |
| 9 | [#12959](https://github.com/QwenLM/qwen-code/issues/12959) 请求增加 maxConcurrentBackgroundAgents 设置（4 评论） | 用户真实痛点：并发后台 subagent 触发 API 限流 HTTP 400 |
| 10 | [#12467](https://github.com/QwenLM/qwen-code/issues/12467) LSP 诊断失败仍报告“无诊断”（4 评论） | 误导模型与用户的假阴性问题，ready-for-human 待审核 |

其他值得留意：[#12770](https://github.com/QwenLM/qwen-code/issues/12770)（已关闭）扩展生命周期事件违反隐私设置上传 RUM；[#13121](https://github.com/QwenLM/qwen-code/issues/13121) 第三方 OpenAI 兼容端点文档示例请求（注意甄别是否为推广性质）。

---

## 四、重要 PR 进展

| # | PR | 内容 |
|---|---|---|
| 1 | [#13110](https://github.com/QwenLM/qwen-code/pull/13110) | **Hosted 文件历史与撤销**：Write/Edit 前保存原文件内容，支持回退到指定 prompt 起点状态，已过五轮审查 |
| 2 | [#13131](https://github.com/QwenLM/qwen-code/pull/13131) | **M2：私有 ACP 子进程承载 Managed 会话**，Managed 引擎设计核心切片 |
| 3 | [#13129](https://github.com/QwenLM/qwen-code/pull/13129) | **H2：持久化 Hosted Hooks**——Hook 目录、一次性执行记录、原生事件分发与属主恢复 |
| 4 | [#13107](https://github.com/QwenLM/qwen-code/pull/13107) | Web Shell Managed 面板中展示并响应 Hosted 工具审批，打通权限闭环 |
| 5 | [#13114](https://github.com/QwenLM/qwen-code/pull/13114) | 发布过期恢复：区分在途超时/认领过期/fencing/临时争用，保证幂等恢复 |
| 6 | [#13109](https://github.com/QwenLM/qwen-code/pull/13109)（已关闭） | Hosted MCP detach 后连接释放重试恢复 |
| 7 | [#13115](https://github.com/QwenLM/qwen-code/pull/13115) | 修复 SDK Java fault gate 间歇性 flaky（#13017） |
| 8 | [#12982](https://github.com/QwenLM/qwen-code/pull/12982) | 修复畸形 tool-call 参数被误诊为 max_tokens 截断（finish_reason 被错误改写） |
| 9 | [#12513](https://github.com/QwenLM/qwen-code/pull/12513) | 批量获取 1–20 个 workspace 会话实时快照（单请求只读） |
| 10 | [#11486](https://github.com/QwenLM/qwen-code/pull/11486) | `qwen update --target-version` 支持精确版本升级，跳过 npm 发现 |

测试补充系列（#13116/#13118/#13120/#13127）集中覆盖 G0 启动校验与 Broker provider 控制流，反映团队对 Managed Agent 测试矩阵的持续投入。

---

## 五、功能需求趋势

1. **Managed Agent / 多 Agent 架构**（绝对主导）：#12380 系列、Stage D/G、Hosted Workspace profile、ACP 子进程——超过一半的热门 Issue/PR 围绕此方向。
2. **会话管理与持久化**：文件历史保留/恢复（#13124）、writer fencing 与 takeover（#12952）、provenance 分类修复（#12042）。
3. **安全与凭证治理**：Shell 重定向绕过、Agent host 重新注册、allowHttp 降级（#13123）。
4. **可观测性与遥测**：静默失败遥测缺失、隐私开关失效、诊断误报。
5. **后台自动化与资源控制**：并发 subagent 限流、内存提取冷却策略（#13004）。
6. **跨端体验**：Windows 稳定性（闪退）、Web Shell UI（上下文卡片渲染）、Desktop 信任机制。

---

## 六、开发者关注点

- **Windows 体验是高频痛点**：闪退无输出（#13076）、workspace 信任失效（#13130）直接影响可用性，等待官方 triage。
- **API 并发限制**：多 subagent 并行触发限流，用户强烈希望有并发控制 + 瞬时错误重试机制（#12959）。
- **隐私合规担忧**：即使关闭统计，扩展事件仍上报 RUM（#12770 已关闭），建议用户关注版本修复情况。
- **静默失败模式**：投机接受、LSP 诊断等多处“报成功实失败”，建议依赖诊断类工具的开发者保持警惕。
- **审查流程成熟但节奏重**：大量 PR 走过 5–8 轮 review，非关键建议被拆分为独立 follow-up issue，社区贡献者可通过认领这些 `ready-for-agent` / `ready-for-human` 标签的 Issue 快速参与。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*