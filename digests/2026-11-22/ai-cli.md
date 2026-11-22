# AI CLI 工具社区动态日报 2026-11-22

> 生成时间: 2026-11-22 00:18 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告（2026-11-22）

---

## 1. 生态全景

AI CLI 工具已从单一终端助手演进为覆盖桌面端、移动端远程控制、多 Agent 编排的完整开发平台。头部产品（Claude Code、Codex、Gemini CLI）竞争焦点正从模型能力转向**工程可靠性**——本期所有工具的社区热点几乎都被回归 Bug、内存治理和权限安全占据。同时，V2 迁移（OpenCode）、统一聊天界面（Qwen Code）、TUI 工作区（Codex）等架构级重构密集进行，标志着生态进入“规模化与稳定性攻坚”阶段。值得注意的是，Copilot CLI 的一起 Agent 误删磁盘事故（#5541）将权限护栏问题推到了全行业面前。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues（本期） | PR 动态 | Release | 核心焦点 |
|---|---|---|---|---|
| **Claude Code** | 10+（含 #71542 73评论/71👍） | 3（无合并） | ❌ 无 | GitHub connector 失效、Remote Control 回归、内存占用 |
| **OpenAI Codex** | 10（含 #57101 82评论） | 13+（密集小步合并） | ✅ rust-v0.173.0-alpha.4 | Nov 21 更新权限回归、TUI 快速迭代 |
| **Gemini CLI** | 10（含 #22323 P1 14评论） | 10（8 个已合并） | ✅ v0.71.0-nightly | Subagent 可靠性、安全修复 |
| **Copilot CLI** | 10 | 3 | ✅ 3 个补丁版（v1.0.115-4~6） | Agent 误删磁盘安全事故、MCP 兼容性 |
| **Kimi Code CLI** | 0 | 0 | ❌ 无 | 过去 24 小时无活动 |
| **OpenCode** | 10（#59387 405评论） | 10 | ❌ 无 | 免费层配额、V2 迁移静默失败 |
| **Qwen Code** | 10（#14724 524评论） | 10+ | ✅ v0.28.3 | CI 稳定性、Web Shell/daemon 重构 |

**观察**：Codex、Gemini CLI、Qwen Code 呈"高频小步快跑"模式（PR 密集合并）；Claude Code 与 OpenCode 社区声量大但官方响应平缓（PR 数少、高热 Issue 长期悬置）。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **权限与 Agent 安全护栏** | Copilot CLI（#5541 磁盘抹除、#5539 权限简化）、Codex（#62943/#63025 权限 UI 回归、#61936 沙箱过严）、Gemini CLI（rm 变体绕过检测、YOLO 模式）、OpenCode（#65467 权限通配符逃逸） | 行业共性痛点：用户被迫在“Full access"与"频繁失败"间二选一，破坏性命令缺硬性防护 |
| **多 Agent / Subagent 可靠性** | Gemini CLI（#22323 假成功、#21409 挂起）、Qwen Code（#15748 通知路由）、Copilot CLI（#5543 嵌套子代理）、OpenCode（#65277 幻觉状态块）、Claude Code（#107433 并发会话内存） | 状态误报、挂起无超时、内存失控是子代理编排的三大顽疾 |
| **远程控制 / 移动端工作流** | Claude Code（5 个相关 Issue）、Copilot CLI（#5468 中继失败） | “手机驱动 CLI”成为最强新兴需求，且是 Bug 高发区 |
| **内存与长会话稳定性** | Claude Code（24 会话耗尽 125GB）、Qwen Code（#17910 大 session 索引）、OpenCode（#65371 堆 OOM、#65137 35GB 库拖垮 server）、Copilot CLI（磁盘占用优化） | 长时间运行 + 大负载场景的内存治理是规模化最大瓶颈 |
| **更新质量与迁移可靠性** | Codex（Nov 17/21 两次更新引入回归）、OpenCode（V2 迁移 caching 丢失、会话空壳）、Qwen Code（#17875 合并 2 分钟时序差致 P1） | 静默回归 + 无告警迁移正在损害用户信任 |
| **MCP 生态兼容性** | Claude Code（#85895 双重 spawn）、Copilot CLI（#5540/#5550）、OpenCode（#65473）、Gemini CLI（#24246 128 工具上限） | MCP 集成进入深水区，协议细节与工具规模管理成新战场 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特点 |
|---|---|---|---|
| **Claude Code** | Remote Control 移动工作流、团队规模化 | 重度专业团队（游戏工作室等） | 桌面+移动深度整合；但 Windows 支持明显滞后 |
| **OpenAI Codex** | TUI 工作区体验、Computer Use | ChatGPT 订阅生态用户 | 自动化 PR 机器人（@copyberry）驱动高频迭代；alpha 快速验证 |
| **Gemini CLI** | Subagent 体系、安全加固 | 开发者/开源社区 | 唯一明显聚焦**架构创新提案**（AST 工具、零依赖沙箱）；安全 PR 密集落地 |
| **Copilot CLI** | 企业集成、ACP 编辑器协议 | GitHub 生态/企业用户 | 稳定版补丁流，节奏克制；子代理编排能力追赶中 |
| **OpenCode** | Provider 中立、开源多模型 | 成本敏感/自主可控用户 | 免费层（zen）策略引流；迁移工具链是短板 |
| **Qwen Code** | Web Shell、daemon/serve、国际化 | 自托管/国内生态（DingTalk 适配） | 无状态 Harness 架构重构；CI 自动化程度高（deflake 机器人） |

---

## 5. 社区热度与成熟度

- **热度最高**：Qwen Code（524 条评论 Issue）与 OpenCode（405 条）——但性质不同：前者是 CI 技术债讨论，后者是免费配额舆情。
- **成熟度最高但响应偏慢**：Claude Code——Issue 编号已达 11 万级，反映庞大用户基数；但 #19666 类 1 年老 Bug 和“开源提案 PR”长期悬置显示治理压力。
- **快速迭代期**：Codex 与 Gemini CLI，均呈现“密集合并 + 老问题批量关闭”的健康信号；Codex 的 alpha 预发布机制使其迭代最快但也引入回归最多。
- **追赶期**：Copilot CLI 稳健补丁流，能力（子代理、MCP）在补齐但尚无爆发点。
- **静默**：Kimi Code CLI 零活动。

---

## 6. 值得关注的趋势信号

1. **安全护栏将成为下一个竞争壁垒**：Copilot 的磁盘抹除事故 + 各工具的权限回归共同表明，“最小权限但可用”的中间档位尚无一家做对。谁能率先交付持久化授权规则 + 破坏性命令硬性拦截，将获得企业市场优势。

2. **可靠性 > 功能成为选型标准**：本期 7 款工具无一例外被回归问题困扰。建议团队：锁定已知稳定版本、推迟自动更新（尤其 Codex Nov 21 版本）、对 OpenCode V2 迁移先做数据备份验证。

3. **多 Agent 状态可信是规模化前提**：Gemini 的假 GOAL 成功、OpenCode 的幻觉状态块揭示同一问题——agent 自报状态不可审计。生产场景需外置校验层，勿信任 agent 的自述结果。

4. **远程/移动工作流是下一个主战场**：Claude Code 与 Copilot 同时押注，且同时暴露路由错乱、中继失败等问题，说明技术尚不成熟但方向确定。

5. **上下文成本优化进入架构层**：Gemini 的 AST 感知提案、Qwen 的 auto-memory 共享、Claude 的 compact 机制问题，共同指向“精准读取替代全量灌水”的 token 经济学趋势。

6. **自动化开发的自动化**：Qwen 的 CI deflake 机器人、Codex 的 @copyberry 自动 PR 显示，头部项目已开始用 AI 维护 AI 工具本身——开发工作流的元层面自动化值得提前布局。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据来源**：github.com/anthropics/skills | 数据截止 2026-11-22

> 说明：本期 PR 数据中评论数缺失（undefined），以下排行综合 PR 更新活跃度、关联 Issue 讨论热度和功能影响力评定。

---

## 一、热门 Skills 排行（PR）

| # | Skill / PR | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** ([#1742](https://github.com/anthropics/skills/pull/1742)) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名及自定义 Header 配置，修复 [#1668](https://github.com/anthropics/skills/issues/1668)。MCP 生态版本升级兼容是持续热点 | OPEN |
| 2 | **skill-creator 触发评估修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 隔离 trigger evals、修复 Windows select() 失败，配合两个高热 Issue（[#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)）反映的"触发率为 0"问题，是社区最痛的评测链路修复 | OPEN |
| 3 | **webapp-testing 安全加固** ([#1980](https://github.com/anthropics/skills/pull/1980)) | 消除 `shell=True` 命令注入风险（CWE-78），同 Skill 还有元素发现修复 [#1976](https://github.com/anthropics/skills/pull/1976) | OPEN |
| 4 | **Notion 规格转实现 + 简历量化审计** ([#1245](https://github.com/anthropics/skills/pull/1245)) | 将产品/技术 Spec 拆解为可执行的 Notion 任务；存活周期长（6 月至 10 月持续更新） | OPEN |
| 5 | **Pyxel 复古游戏开发** ([#525](https://github.com/anthropics/skills/pull/525)) | 由 Pyxel 作者本人提交，覆盖游戏创建/调试/无头验证，是最长寿的社区 PR 之一（3 月至今） | OPEN |
| 6 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | 零成本将 Markdown 编译为带拟真配音的 MP4 视频（Marp + TTS），内容创作类 Skill 代表 | OPEN |
| 7 | **document-typography** ([#514](https://github.com/anthropics/skills/pull/514)) | 解决 AI 生成文档的孤行、寡段、编号错位等排版问题，定位独特 | OPEN |
| 8 | **proofcore-contract-auditor** ([#1771](https://github.com/anthropics/skills/pull/1771)) | Solidity/Rust 合约静态分析 + TON 链上审计证明锚定，Web3 方向（需注意其商业属性引发的边界讨论，参见安全 Issue [#492](https://github.com/anthropics/skills/issues/492)） | OPEN |

---

## 二、社区需求趋势（Issues 提炼）

1. **安全与信任边界**（最热，46 评论）：[#492](https://github.com/anthropics/skills/issues/492) —— 社区 Skill 冒用 `anthropic/` 命名空间分发，社区强烈要求官方明确签名/溯源机制。
2. **组织级协作与分发**：[#228](https://github.com/anthropics/skills/issues/228)（17 评论）—— 期待组织内共享 Skill 库；[#189](https://github.com/anthropics/skills/issues/189) 抱怨插件重复安装污染上下文。
3. **评测与触发可靠性**：[#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352) —— skill-creator 的 run_eval 并发评测产生系统性假阴性，是开发者自建 Skill 的核心阻塞。
4. **上下文经济性**：[#1487](https://github.com/anthropics/skills/issues/1487) —— claude-api Skill 单次注入 156k tokens 撑爆上下文；[#202](https://github.com/anthropics/skills/issues/202) 批评 skill-creator 冗长低效，社区要求"按需加载"。
5. **Agent 记忆与治理类新方向**：[#1329](https://github.com/anthropics/skills/issues/1329)（紧凑符号化 agent 记忆）、[#1385](https://github.com/anthropics/skills/issues/1385)（三段式推理质量门禁）、[#412](https://github.com/anthropics/skills/issues/412)（agent 治理模式）。

---

## 三、高潜力待合并 Skills / PR

- **[#1298](https://github.com/anthropics/skills/pull/1298)** skill-creator eval 修复 —— 直击两大高热 Issue，合并动机最强。
- **[#1742](https://github.com/anthropics/skills/pull/1742)** mcp-builder mcp>=2 兼容 —— 阻塞用户连接新版 MCP 服务器，优先级高。
- **[#1997](https://github.com/anthropics/skills/pull/1997)** skill-creator YAML frontmatter 解析修复（关联 [#2018](https://github.com/anthropics/skills/issues/2018) 的 docx XML 修复同作者，质量稳定）。
- **[#2019](https://github.com/anthropics/skills/pull/2019)** xlsx 外部链接风险误报修复 —— 有明确 Issue 对应（#2013）。
- **[@gerardrecinto 系列](https://github.com/anthropics/skills/pull/1977)**（#1975/#1976/#1977）—— 短平快的 bug 修复三连，合并阻力小。
- **[#525](https://github.com/anthropics/skills/pull/525)** Pyxel —— 上游作者维护、持续更新 8 个月，游戏开发空缺领域。

---

## 四、生态洞察（一句话）

**社区最集中的诉求是"可信与可靠"—— 建立官方命名空间签名机制防止 Skill 冒用，同时修复 skill-creator 评测链路和上下文注入失控，让 Skills 从"能触发"走向"可信触发、按需加载"。**

---

# Claude Code 社区动态日报（2026-11-22）

## 1. 今日速览

过去 24 小时无新版本发布，但社区活跃度依旧很高：GitHub connector 大面积失效的回归 Bug（#71542）持续发酵，已达 73 条评论、71 个 👍，是当前最受关注的未解决问题。同时，Remote Control（手机远程控制）相关的多个新 Bug 集中爆发，覆盖 macOS 与 Windows，移动端工作流成为新的问题高发区。内存占用问题仍是 Linux 团队用户的最大痛点。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues

1. **[#71542](https://github.com/anthropics/claude-code/issues/71542)** GitHub connector 连接成功但 Claude 无法访问任何仓库内容（含公开仓库），账户级失效，属近期回归。73 条评论、71 👍，本周最严重的可用性问题，仍标记为 invalid 待官方确认。

2. **[#19666](https://github.com/anthropics/claude-code/issues/19666)** Windows 11 + VS Code 下 Claude Code 触发 Bun panic 崩溃，长期未修复的老问题（1 月至今），已有 repro，影响 Windows IDE 用户基本可用性。

3. **[#111057](https://github.com/anthropics/claude-code/issues/111057)** macOS Desktop 的 Remote Control 在本地会话上不断自动关闭，尽管设置已开启，导致纯手机工作流不可用。11-18 新提交，回归类问题。

4. **[#111587](https://github.com/anthropics/claude-code/issues/111587)** Windows 多并发会话下，手机端一个会话的入口实际连接到了另一个本地会话——远程控制的路由错乱，存在操作错误会话的风险。

5. **[#107891](https://github.com/anthropics/claude-code/issues/107891)** 退出 Desktop 应用（含静默更新）会将 Remote Control 会话在 claude.ai 端归档且无法恢复，多个相关 Issue 的根因可能在此。

6. **[#78146](https://github.com/anthropics/claude-code/issues/78146)** Windows 下 Bash 工具被 hook 环境文件（CLAUDE_ENV_FILE）无限膨胀卡死：每次 compact 都追加内容且无去重/截断，长会话中每条命令均报 exit 127。

7. **[#107433](https://github.com/anthropics/claude-code/issues/107433)** 游戏工作室反馈：24 个并发会话耗尽 125 GB 内存工作站的内存，呼吁共享 MCP server 与 agent 内存预算机制，反映重度团队用户的规模化瓶颈。

8. **[#85895](https://github.com/anthropics/claude-code/issues/85895)** 项目级 `.mcp.json` stdio MCP server 每次启动被 spawn 两次，导致单连接后端丢失 tools client，影响 MCP 生态可靠性。

9. **[#91618](https://github.com/anthropics/claude-code/issues/91618)** Windows 上 isolation-worktree 安全检查因盘符大小写（`D:` vs `d:`）比较而拒绝合法 worktree，典型案例的 Windows 路径兼容性 bug。

10. **[#96382](https://github.com/anthropics/claude-code/issues/96382)** VS Code 扩展自 2.1.268 起移除了标签式侧边栏，用户无法查看/切换/关闭活跃会话且无回退选项，引发 UI 回归争议。

其他值得留意：[#111596](https://github.com/anthropics/claude-code/issues/111596)（macOS Cmd+Q 挂死）、[#95739](https://github.com/anthropics/claude-code/issues/95739)（未来时间戳的 OAuth 刷新锁永久阻塞 token 刷新）、[#98500](https://github.com/anthropics/claude-code/issues/98500)（iOS 推送通知除 Remote Control 外均不送达）。

## 4. 重要 PR 进展

过去 24 小时仅 3 个 PR 有更新，无重大功能性合并：

1. **[#41447](https://github.com/anthropics/claude-code/pull/41447)**（OPEN）社区发起的“开源 Claude Code”提案式 PR，关联 5 个开源请求 Issue，更多是社区态度的表达，长期处于 Open 状态。

2. **[#111198](https://github.com/anthropics/claude-code/pull/111198)**（CLOSED，11-21 更新）由 @mhegazy 提交：禁止在来自 fork 的 PR 上触发 `@claude` mention，属于 CI/机器人行为治理，已关闭。

3. **[#1](https://github.com/anthropics/claude-code/pull/1)**（CLOSED）创建 SECURITY.md 的历史 PR，无实质新动态。

> 本期 PR 数量少且无合并动作，建议将注意力集中在 Issue 追踪上。

## 5. 功能需求趋势

- **移动端 / Remote Control 工作流**：多个 Issue 集中于此——[#91815](https://github.com/anthropics/claude-code/issues/91815)（从手机发起远程会话+设备选择器）、[#111164](https://github.com/anthropics/claude-code/issues/111164)（语音实时对话模式）、[#97450](https://github.com/anthropics/claude-code/issues/97450)（headless 管理云会话生命周期）。“手机驱动 Claude Code”是当前最强需求方向。
- **多会话/规模化资源管理**：[#107433](https://github.com/anthropics/claude-code/issues/107433) 代表的共享 MCP server、agent 内存预算需求，反映团队级部署诉求。
- **IDE 体验完整性**：[#96382](https://github.com/anthropics/claude-code/issues/96382)（恢复会话侧边栏）、[#102536](https://github.com/anthropics/claude-code/issues/102536)（未发送 prompt 草稿持久化恢复）、[#75425](https://github.com/anthropics/claude-code/issues/75425)（JetBrains 原生 GUI，已关闭）。
- **会话上下文与协作**：[#77792](https://github.com/anthropics/claude-code/issues/77792)（跨会话附加 PR chip，已关闭）显示并行/分叉会话协作场景受关注。

## 6. 开发者关注点

1. **连接器与认证可靠性**：GitHub connector 全账户失效（#71542）、OAuth 刷新锁死锁（#95739）——基础链路的回归正在损害信任。
2. **Windows 支持质量**：Bun panic 崩溃、盘符大小写、Bash hook 膨胀、Remote Control 会话错乱，Windows 已成本期 Bug 最密集平台。
3. **内存与进程管理**：单进程 6.5 GB RSS、24 会话吃满 125 GB、MCP 重复 spawn——多 agent/多会话场景的内存治理是规模化最大瓶颈。
4. **静默更新的副作用**：更新重启导致 Remote Control 断连、会话归档、UI 无回退变更，用户呼吁更可控的更新与会话恢复机制。
5. **长会话稳定性**：compact 导致环境文件膨胀、Bash 卡死等，表明长时间运行会话的健壮性仍需系统性改进。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报

**日期：2026-11-22** | 数据来源：[openai/codex](https://github.com/openai/codex)

---

## 一、今日速览

Codex 今日发布 **rust-v0.173.0-alpha.4** 预发布版本，同时社区侧焦点集中在 **11 月 21 日桌面端更新引发的权限/沙箱回归问题**（Windows & macOS 均有报告）。TUI 方面迎来一波密集改进：Agent Command Center 停靠化、Markdown 块选择复制、并发推理摘要默认启用等，显示 TUI 工作区体验正在快速迭代。

---

## 二、版本发布

- **[rust-v0.173.0-alpha.4](https://github.com/openai/codex/releases)** — Alpha 预发布，仅含版本说明，无详细 changelog。从今日合并的 PR 推断，本版本预计包含并发推理摘要默认启用（#62903）、TUI 工作区改进（#62986）等内容。

---

## 三、社区热点 Issues

1. **[#62943](https://github.com/openai/codex/issues/62943)｜Nov 21 更新回归：新会话丢失权限与执行位置选择器**（OPEN，9 评论 / 4 👍）
   Windows + ChatGPT Work 用户报告 11 月 21 日更新后新对话丢失权限选择器、执行位置选择器及 Max 推理强度选项。**今日最紧急的新增回归**，与 #63025 相互印证，疑似同一根因。

2. **[#62650](https://github.com/openai/codex/issues/62650)｜macOS 壁纸着色回退导致启动崩溃**（OPEN，56 评论 / 18 👍）
   构建 `26.1117.31558` 在特定壁纸配置（含 Apple 官方壁纸）下启动即崩溃，属**阻断级回归**。社区讨论热烈，临时方案需放弃个性化壁纸设置。

3. **[#57101](https://github.com/openai/codex/issues/57101)｜Windows Computer Use 截图后金色边框与捕获权限残留**（OPEN，82 评论 / 13 👍）
   长期高热度问题：截图回合结束后屏幕捕获访问指示与金色边框不消失，涉及隐私担忧，持续吸引大量讨论。

4. **[#61936](https://github.com/openai/codex/issues/61936)｜macOS 高影响回归：Git fetch/merge/commit 因 .git 权限错误中断**（OPEN，3 评论）
   11 月 17 日起沙箱策略变化导致常规 Git 本地写入失败，阻塞正常开发流程，用户不愿使用无限制 Full access 作为 workaround。

5. **[#63025](https://github.com/openai/codex/issues/63025)｜Windows/Work：Full access 选项消失、审批后无法继续**（OPEN，3 评论 / 1 👍）
   与 #62943 同日报告的权限系统回归，进一步佐证 Nov 21 更新引入了权限 UI 的系统性问题。

6. **[#43189](https://github.com/openai/codex/issues/43189)｜Daybreak 已验证仍提示 "This content can't be shown"**（OPEN，15 评论）
   安全检查误伤正常内容的持续问题，影响输出可见性。

7. **[#52039](https://github.com/openai/codex/issues/52039)｜Pro 200 用户 62,500 促销积分异常消耗**（OPEN，13 评论）
   促销积分在周配额未用尽时被优先扣减，且 Analytics 事后回填用量，计费透明度问题引发订阅用户关注。

8. **[#54143](https://github.com/openai/codex/issues/54143)｜macOS 回归：切换到 ChatGPT Work 后 Chat 模式消失且无法切回**（OPEN，8 评论）
   普通对话被静默转为 Work 模式后无法恢复，模式边界混乱的典型案例。

9. **[#27207](https://github.com/openai/codex/issues/27207)｜恢复主 UI 中访问已归档对话**（OPEN，10 评论 / 18 👍）
   高 👍 的 Papercuts 需求：归档对话被藏到 Settings 深处，属明显体验倒退。

10. **[#62631](https://github.com/openai/codex/issues/62631)｜macOS MCP 目录反复加载失败**（OPEN，4 评论）
    用户日志中两小时内出现 156 次 `mcpServerStatus/list` 不支持错误，暴露 app-server 方法兼容性问题。

> 另注：多条历史 TUI Issue（#17793 退格多删、#17103 粘贴、#19501 中文 IME、#16840 中文渲染、#16687 光标跳动等）于今日集中关闭，推测随近期 TUI 修复批量解决。

---

## 四、重要 PR 进展

1. **[#62903](https://github.com/openai/codex/pull/62903)｜并发推理摘要默认启用** — `concurrent_reasoning_summaries` 标记为稳定并默认开启，改用 `sequential_cutoff` 投递模式。
2. **[#62905](https://github.com/openai/codex/pull/62905) + [#62904](https://github.com/openai/codex/pull/62904)｜推理摘要选择器** — `/config` 新增 Auto/Concise/Detailed/None 选项，TUI 默认启用自动摘要。
3. **[#62986](https://github.com/openai/codex/pull/62986) + [#62990](https://github.com/openai/codex/pull/62990)｜Agent Command Center 停靠化** — 从模态框改为侧边停靠面板，支持任务列表与对话间快捷切换。
4. **[#63047](https://github.com/openai/codex/pull/63047)｜转录区 Markdown 块选择复制** — `m` 键标记代码块，`h/l/j/k` 导航扩展，`Tab` 扩展至外层区块。
5. **[#63058](https://github.com/openai/codex/pull/63058)｜Cloud 回复流恢复可重试** — 修复瞬断耗尽恢复次数限制的问题，共享 deadline 不再挤占历史拉取时间。
6. **[#63022](https://github.com/openai/codex/pull/63022)｜修复剪贴板文本回退** — X11 下图像剪贴板请求返回文本时正确降级，并保护待处理粘贴不被提前提交。
7. **[#62894](https://github.com/openai/codex/pull/62894)｜索引式网络搜索默认项** — 新增 `web_search_indexed_default`，受限回合可用 `indexed` 搜索替代 `cached`。
8. **[#63046](https://github.com/openai/codex/pull/63046)｜Code Mode exec 目录按签名变化刷新** — 修复嵌套工具更新后 `functions.exec` 声明过期的问题。
9. **[#63013](https://github.com/openai/codex/pull/63013)｜支持 Orca 集成终端** — 识别 `TERM_PROGRAM=Orca`，启用可点击 Markdown 链接与 Kitty 图形协议。
10. **[#62906](https://github.com/openai/codex/pull/62906)｜codex exec 中 HTTP MCP 启动错误清晰化** — 隐藏含凭据的端点 URL，避免传输层噪音刷屏。

其他值得留意：[#63054](https://github.com/openai/codex/pull/63054)（shell 模式屏蔽补全弹窗）、[#63036](https://github.com/openai/codex/pull/63036)（斜杠命令命名参数补全）、[#62931](https://github.com/openai/codex/pull/62931)（Rex 客户端剪贴板转发 OSC 52）。

---

## 五、功能需求趋势

| 方向 | 信号 |
|---|---|
| **权限/沙箱精细化控制** | Nov 21 更新回归集中爆发（#62943、#63025、#61936），用户强烈需要"最小权限但可用"的中间档位 |
| **会话/数据可迁移性** | #47087 要求跨平台迁移本地聊天记录的一等支持 |
| **历史对话可发现性** | #27207（归档对话入口）、#57674（云线程重试死循环）反映对话管理体验短板 |
| **Windows Computer Use 成熟度** | #57101、#52319 持续高热，无障碍信息返回与隐私指示是主要缺口 |
| **计费/用量透明度** | #52039 促销积分扣减顺序与 Analytics 回填引发信任问题 |
| **TUI 终端兼容性** | 大量 Issue 集中于 IME、光标、主题渲染等终端细节 |

---

## 六、开发者关注点

- **更新质量与回归管控**是当前最大痛点：Nov 17 与 Nov 21 两次桌面端更新分别引入 Git 权限中断和权限 UI 丢失，建议团队推迟自动更新或锁定已知稳定版本。
- **Windows 端体验滞后**：Computer Use、IME、终端渲染相关 Issue 占比显著，Windows 用户长期处于“二等公民”状态。
- **沙箱默认策略过严与权限提示设计的平衡**：多个 Issue 表明用户被迫在“Full access”与“频繁失败”间二选一。
- **积极信号**：TUI 老问题批量关闭 + 高频小步 PR（多为 @copyberry[bot] 自动化），显示迭代节奏健康；推理摘要、Command Center 等能力正在快速补齐。

---
*本报告基于过去 24 小时 GitHub 公开数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-11-22）

## 📰 今日速览

Gemini CLI 发布 v0.71.0-nightly 版本，重点修复 Windows 路径展开与会话恢复问题。社区讨论焦点集中在 **Agent 子代理可靠性**——包括 MAX_TURNS 中断被误报为成功、通用 Agent 挂起等 P1 级 Bug。同时，多个涉及安全（YOLO 模式检查、粘贴文本泄密防护）和稳定性（IME 输入、超时重放）的重要 PR 在过去一天被合并。

---

## 🚀 版本发布

### [v0.71.0-nightly.20261121.geeeccfcd5](https://github.com/google-gemini/gemini-cli/releases)
- **fix(cli)**: 支持 Windows 下 `~\` 波浪号+反斜杠形式的 home 相对路径展开（[#30376](https://github.com/google-gemini/gemini-cli/pull/30376)）
- **fix(cli)**: 会话恢复改为恢复“最近活跃”的会话，而非“最近启动”的会话，更符合用户预期

---

## 🔥 社区热点 Issues（Top 10）

| # | Issue | 亮点分析 |
|---|-------|---------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 后误报 GOAL 成功 | **P1 Bug**，14 条评论。`codebase_investigator` 撞到轮次上限却报告 `success`，掩盖了真实中断，直接影响任务结果可信度，是目前讨论最热烈的 Issue |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) 通用 Agent 无限挂起 | **P1 Bug**，8 👍。委托给 generalist agent 后连建目录都挂起一小时以上，用户只能通过提示词绕过，严重影响日常使用 |
| 3 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由 | **P2 大型增强**。利用 Gemini 3 原生 bash 能力（grep/sed/awk 链式操作），同时兼顾安全沙箱，是架构层面的重要提案 |
| 4 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知的文件读取/搜索/映射评估 | **EPIC**。探索 AST 工具能否减少 token 噪音、提升读取精度，关联多个子 Issue（#22746、#22747），是 Agent 效率优化的关键方向 |
| 5 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 不主动使用 skills 和 sub-agents | 用户反馈即使存在高度相关的自定义 skill，模型也不主动调用，需显式指令才触发——反映工具选择策略存在短板 |
| 6 | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 配置 | `maxTurns` 等全局/项目配置在 Browser Agent 上完全失效，虽然 AgentRegistry 正确读取了配置，配置传递链路存在断点 |
| 7 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) Browser subagent 在 Wayland 下失败 | **P1 Bug**，Linux Wayland 用户的浏览器代理直接不可用，终止原因显示为 GOAL 但实际未完成任务 |
| 8 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 工具数超过 128 触发 400 错误 | API 对工具数量有限制，Agent 需要更智能地收敛工具作用域，对重度 MCP/扩展用户影响大 |
| 9 | [#23571](https://github.com/google-gemini/gemini-cli/issues/23571) 模型在随机位置创建临时脚本 | 限制为 shell 执行后，模型到处生成编辑脚本，commit 前清理成本高，反映工作区卫生管理缺失 |
| 10 | [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) get-shit-done output hook 导致崩溃 | **P1**。输出 hook 在打印用户摘要时反复崩溃 CLI，稳定性问题 |

---

## 🔧 重要 PR 进展（Top 10）

### 已合并（CLOSED）

1. **[#30169](https://github.com/google-gemini/gemini-cli/pull/30169)** 粘贴 @ 文本和模糊匹配不再意外附加密钥 🔒
   修复粘贴 shell 日志可能导致 SSH 私钥被附加到模型请求的安全漏洞，`escapePastedAtSymbols` 默认开启。

2. **[#30171](https://github.com/google-gemini/gemini-cli/pull/30171)** 识别任意位置的递归/强制 rm 标志
   修复 `rm -r -f`、`rm --recursive --force`、`rm x -rf` 等变体绕过危险命令检测的漏洞。

3. **[#30178](https://github.com/google-gemini/gemini-cli/pull/30178)** IME 提交与 Enter 同 tick 时提交完整文本
   修复韩语（Hangul）输入最后一个音节被吞的问题（`테스트` → `테스`），中文用户同样受益。

4. **[#30174](https://github.com/google-gemini/gemini-cli/pull/30174)** 修复 body timeout 杀死并重放长模型轮次
   高思考模式下模型长时间静默输出大文件参数时，不再被 undici 超时中断并重复请求 3 次。

5. **[#30170](https://github.com/google-gemini/gemini-cli/pull/30170)** 本地 subagent 不再因单次模型调用卡顿耗尽整个 deadline
   为模型响应增加 per-turn 限制，避免 `cli_help` 白等 3 分钟超时。

6. **[#30175](https://github.com/google-gemini/gemini-cli/pull/30175)** 本地 subagent 的 generateContentConfig 对所有模型生效
   修复 temperature/topP/thinkingConfig 仅对 `auto` 模式 agent 生效的问题。

7. **[#30173](https://github.com/google-gemini/gemini-cli/pull/30173)** 非受信目录可读取 ~/.gemini/.env
   修复 workspace 账户用户在受信目录外陷入无限登录循环的问题。

8. **[#30172](https://github.com/google-gemini/gemini-cli/pull/30172)** 每个工具调用 ID 在会话记录中仅保留一个结果
   根除 `--resume` 后请求中工具结果重复的问题，修复 400 错误隐患。

### 进行中（OPEN）

9. **[#30268](https://github.com/google-gemini/gemini-cli/pull/30268)** YOLO 模式下尊重 taint/build 文件检查
   可信 YOLO 模式运行时不再被确认弹窗或 `POLICY_VIOLATION` 硬拒绝打断，对 headless 自动化场景关键。

10. **[#30375](https://github.com/google-gemini/gemini-cli/pull/30375)** 修复文档内部死链（P1）
    批量修复缺失 `.md` 后缀、错误绝对路径和失效锚点的文档链接。

---

## 📈 功能需求趋势

1. **Agent 可靠性与可观测性**（最热）：subagent 状态误报、挂起、bug report 缺失子代理上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)）、轨迹分享（[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)）
2. **代码理解效率优化**：AST 感知工具链（#22745/#22746/#22747）、"Tactful Extraction" 精准读取（[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)）——共同目标是降低每轮 36.6k token 的上下文基线
3. **沙箱与安全增强**：零依赖 OS 沙箱提案（#19873）、破坏性命令防护（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）
4. **任务管理演进**：用持久化文件 CRUD 替换 in-context 的 WriteToDo（[#18836](https://github.com/google-gemini/gemini-cli/issues/18836)、[#21000](https://github.com/google-gemini/gemini-cli/issues/21000)）
5. **多 Agent 协作**：并行 subagent 共享内存探索（[#18287](https://github.com/google-gemini/gemini-cli/issues/18287)）、官方示例 agent 库（[#18283](https://github.com/google-gemini/gemini-cli/issues/18283)）

---

## ⚠️ 开发者关注点（痛点总结）

- **Subagent 信任危机**：成功/失败状态不可信（假 GOAL 成功）、挂起不超时、配置不生效，是当前最高频的抱怨源
- **上下文成本**：大文件读取“灌水”导致 token 膨胀，用户迫切需要精准读取策略
- **工具数量上限**：重度扩展用户遭遇 128 工具 400 错误，需更智能的工具作用域管理
- **IME/国际化输入**：韩语输入丢字已修复，但表明多语言输入路径仍需持续验证
- **Windows 兼容性**：路径分隔符、`~\` 展开等问题持续修复中，本次 nightly 已有改善
- **工作区卫生**：临时脚本散落、危险 git 操作缺乏护栏

---

*数据来源：github.com/google-gemini/gemini-cli | 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-22 | 数据来源：github.com/github/copilot-cli**

---

## 1. 今日速览

过去 24 小时 Copilot CLI 密集发布三个补丁版本（v1.0.115-4 ~ -6），聚焦插件初始化竞态、会话恢复与磁盘占用优化。社区方面，一起 Agent 在 WSL 中误执行 `rsync --delete` 导致用户磁盘数据被清空的安全事故（#5541）被标记为 needs-human，引发对权限护栏的高度关注；另有 6 条新 issue 集中反馈 MCP、子代理与权限 UX 问题。

---

## 2. 版本发布

| 版本 | 类型 | 更新内容 |
|---|---|---|
| [v1.0.115-6](https://github.com/github/copilot-cli/releases) | Fixed | 组织策略临时变更中断插件安装后，下次尝试可立即安装，无需等待重试延迟；`/delegate` 未登录时给出提示而非静默无响应；Unix 下取消 shell 命令的行为修复 |
| [v1.0.115-5](https://github.com/github/copilot-cli/releases) | Improved/Fixed | 长时间运行的本地会话占用磁盘更少、恢复更快；排队切换到 Copilot Fusion 时正确显示请求的路由配置文件 |
| [v1.0.115-4](https://github.com/github/copilot-cli/releases) | Added/Fixed | 新增：ACP 编辑器中支持结构化澄清问题表单；修复插件初始化竞态阻塞新会话或会话恢复失败；Windows 下清理 Git 命令、hooks 及语言服务器检查的子进程 |

---

## 3. 社区热点 Issues（Top 10）

1. **[#5541](https://github.com/github/copilot-cli/issues/5541) Agent 在 WSL 中误删用户磁盘（needs-human）** ⚠️
   Agent 因 PowerShell→bash 引号/换行损坏导致变量为空，执行 `rsync -a --delete /` 不可逆清空磁盘。已标记需人工处理，是本日最严重的 Agent 安全事件。

2. **[#5468](https://github.com/github/copilot-cli/issues/5468) 远程控制在 GitHub Mobile 与 github.com 上全部失败**
   中继连接报 "sealed value must bind this connection's challenge"，会话可读不可控，影响远程协作核心功能。

3. **[#5544](https://github.com/github/copilot-cli/issues/5544) web_fetch 在 Surge Fake-IP 环境下仍拒绝公共 URL**
   #5180 关闭后的回归反馈，1.0.114 仍复现，代理/VPN 用户的网络兼容性问题尚未真正解决。

4. **[#5550](https://github.com/github/copilot-cli/issues/5550) `gh` 在 PATH 上时，自定义 Agent 无法使用内置 GitHub MCP 读工具**
   内置 MCP 服务器与系统 `gh` CLI 冲突，影响自定义 Agent 生态。

5. **[#5543](https://github.com/github/copilot-cli/issues/5543) 嵌套子代理无法多轮运行**
   子代理启动的子代理 background 模式被静默忽略，与 changelog 宣称的"多轮子代理始终启用"不符。

6. **[#5547](https://github.com/github/copilot-cli/issues/5547) install.sh `VERSION=prerelease` 安装到更旧的构建**
   Git 版本排序将稳定版排在预发布版之前，违反 semver 语义，已有配套修复 PR（见下文）。

7. **[#5540](https://github.com/github/copilot-cli/issues/5540) MCP Tasks 声明了但未发送 task augmentation**
   初始化宣称支持 Tasks，调用 `taskSupport: "required"` 工具却不带任务增强数据，MCP 兼容性缺口。

8. **[#3558](https://github.com/github/copilot-cli/issues/3558) 上下文记忆重复条目错误（已关闭）**
   处理提示词时触发 CAPIError 400 "Duplicate item"，8 👍 5 评论，老牌高关注度问题本日关闭。

9. **[#3192](https://github.com/github/copilot-cli/issues/3192) `statusLine.command` 在 `footer.showCustom=true` 时不执行**
   自定义状态栏功能失效且无报错，自定义配置体验的长期痛点，仍开放。

10. **[#5541 之外的安全相关：#5539](https://github.com/github/copilot-cli/issues/5539) 权限 UX 过于复杂**
    用户希望一条"永久允许读取某目录、跨会话跨仓库"的简单规则，无需复杂策略配置，与 #5541 共同指向权限系统改进需求。

---

## 4. 重要 PR 进展

> 过去 24 小时仅 3 条 PR 更新，全部列出：

1. **[#5548](https://github.com/github/copilot-cli/pull/5548)（OPEN）修复 prerelease 安装排序**
   设置 `versionsort.suffix` 使 Git 将预发布标签排在稳定版之前，修复 #5547，`VERSION=prerelease` 将安装真正最新的构建。

2. **[#5310](https://github.com/github/copilot-cli/pull/5310)（OPEN）修复容器冒烟测试工作区权限**
   临时工作区 `0700` 模式导致镜像运行用户（UID 10001）无法访问，修复 amd64/arm64 CI 失败。

3. **[#1512](https://github.com/github/copilot-cli/pull/1512)（CLOSED）README 默认模型文档更新**
   将默认模型说明从 Sonnet 4.5 更新为 Sonnet 4.6，本日关闭。

---

## 5. 功能需求趋势

- **权限系统简化与护栏**（#5539、#5536、#5541）：持久化授权规则、后台代理审批不打断前台交互、危险命令防护是当前最强呼声。
- **子代理/多代理编排**（#5543、#5549）：嵌套子代理多轮运行、会话级 `resume/suspend` 工具，Agent 自主管理会话生命周期。
- **MCP 生态兼容性**（#5540、#5542、#5550）：Tasks augmentation、OAuth 状态探测、与 `gh` CLI 的冲突，MCP 集成进入深水区。
- **会话可观测性**（#5537）：在会话列表中展示 AI credits（AIC）消耗，成本透明化需求上升。
- **网络/代理环境兼容**（#5544、#5546）：Fake-IP DNS、企业过滤网络下的 TLS 握手问题持续困扰特定用户群。

---

## 6. 开发者关注点

1. **Agent 安全边界**：#5541 的磁盘抹除事故表明，破坏性命令（尤其涉及空变量展开的 `--delete` 类操作）缺乏硬性防护，开发者对沙箱/白名单机制期待强烈。
2. **重复授权疲劳**：跨会话、跨仓库重复审批 `ls`/`grep` 等低风险命令（#2256、#5539）是长期高频痛点。
3. **安装与升级可靠性**：install.sh 的版本排序 bug（#5547）会让 prerelease 用户降级，影响内测反馈渠道。
4. **企业/受限网络可用性**：TLS 握手失败（#5546）、代理环境 URL 拒绝（#5544）在企业环境中构成采用障碍。
5. **会话性能与资源**：官方本日发布的磁盘占用/恢复速度优化（v1.0.115-5）正回应了长会话资源消耗的反馈，但嵌套会话退出（#4874）等问题仍有改进空间。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-22

## 📌 今日速览

今日无新版本发布，社区活跃度集中在 V2 (2.3.2) 稳定性问题上：免费层（zen）配额问题持续发酵，主 Issue 评论已破 400 条；V1→V2 迁移接连爆出 prompt caching 静默丢失和会话消息丢失两个兼容性 bug。PR 方向亮点是 Google Antigravity provider 重构后重新提交、agent 交互式 widgets 和 MCP Events beta 支持。

---

## 🔥 社区热点 Issues

1. **[#59387](https://github.com/anomalyco/opencode/issues/59387)** [zen] 免费层配额问题汇总帖（405 评论）—— "Free usage exceeded"、"配额重置永不发生" 等问题集中反馈，是社区当前最大痛点，官方置顶收集报告。

2. **[#65371](https://github.com/anomalyco/opencode/issues/65371)** 开启 `warming: true` 后 server 因 V8 堆内存 OOM 崩溃（SIGABRT）—— 一天内崩溃 4 次，会话预热机制存在内存泄漏嫌疑，影响生产可用性。

3. **[#65400](https://github.com/anomalyco/opencode/issues/65400)** V1→V2 迁移静默丢弃 OpenAI 兼容 Claude 端点的 prompt caching —— 每轮对话按未缓存输入计费，成本直接翻倍且无任何警告，属高优先级兼容性 bug。

4. **[#65497](https://github.com/anomalyco/opencode/issues/65497)** V1→V2 迁移信任 completed 标记，不修复未投影的会话 —— K8s 长期运行环境下升级后会话列表可见但打开为空，数据丢失风险。

5. **[#64616](https://github.com/anomalyco/opencode/issues/64616)** Desktop 渲染进程卡死在 `/api/event` SSE 流 —— 窗口无响应只能重启应用，而后台服务本身健康，指向 renderer 事件流处理缺陷。

6. **[#63743](https://github.com/anomalyco/opencode/issues/63743)** `opencode upgrade` 经 npm 使用 `--force`，下载全部平台 optionalDependencies（约 2GB）—— 升级体验差且易破坏环境。

7. **[#62319](https://github.com/anomalyco/opencode/issues/62319)** 上游 provider 卡死时静默重试，无错误、无日志 —— `opencode run` 无限挂起，可观测性缺失。

8. **[#65277](https://github.com/anomalyco/opencode/issues/65277)** gemini-4-neon 作为父 agent 运行子 agent 时幻觉生成 `<subagent state="completed">` 块 —— 子代理编排下的模型行为异常。

9. **[#65473](https://github.com/anomalyco/opencode/issues/65473)** 远程 MCP server 对 `notifications/initialized` 返回 202 时报 `Unexpected content type: null` —— 该行为符合 MCP Streamable HTTP 标准，属协议兼容性 bug。

10. **[#65137](https://github.com/anomalyco/opencode/issues/65137)** 35GB 数据库上 `opencode stats` 直接拖垮 server —— stats 全量扫描设计在大型数据库上不可用，性能问题典型样本。

---

## 🛠 重要 PR 进展

1. **[#65489](https://github.com/anomalyco/opencode/pull/65489)** feat: 新增 Google Antigravity provider（ACP 路线）—— 拆分自被关闭的 #65430，回应了 #28889 的功能需求。
2. **[#65261](https://github.com/anomalyco/opencode/pull/65261)** feat: agent widgets —— agent 可在会话中渲染原生交互式组件（PsychoScript 模板 + JSON），是重要的 UI 扩展能力。
3. **[#65271](https://github.com/anomalyco/opencode/pull/65271)** feat: 跟进 MCP Events beta（SEP-3415）推送投递 —— 从轮询转向推送的架构升级。
4. **[#65498](https://github.com/anomalyco/opencode/pull/65498)** chore: 发布说明与翻译生成切换到 gemini-4-neon 高推理档 —— 项目自身 AI 工作流的模型升级。
5. **[#65472](https://github.com/anomalyco/opencode/pull/65472)** fix: Bedrock 应用推理 profile ARN 下正确区分 Claude/Nova —— 修复 `id.includes("anthropic")` 的脆弱判断。
6. **[#65467](https://github.com/anomalyco/opencode/pull/65467)** fix: “Always allow” 不再保存裸升级通配符 —— 修复权限逃逸安全漏洞（#64627）。
7. **[#65491](https://github.com/anomalyco/opencode/pull/65491)** feat: 语音模型列表改从 models.dev 动态获取 —— 新模型无需 server 发版。
8. **[#65492](https://github.com/anomalyco/opencode/pull/65492)** fix: Copilot `/chat/completions` 路由下禁用 PDF 输入 —— 修复 Gemini 模型 400 报错。
9. **[#65494](https://github.com/anomalyco/opencode/pull/65494)** fix: run 调用自动更名为 Code Mode 并跟随重命名的 execute —— 旧命令/别名兼容。
10. **[#63982](https://github.com/anomalyco/opencode/pull/63982)** feat: 可配置编辑工具选择（已关闭）—— 移除 `gpt-` 前缀硬编码启发式，允许用户指定 `patch` vs `edit`/`write`。

---

## 📈 功能需求趋势

- **权限与沙箱安全**：更好的执行权限控制和沙箱（#48411）、权限规则修复（#65248）—— 安全可控性是高频诉求。
- **V1→V2 迁移可靠性**：caching 丢失、会话空壳等迁移 bug 密集出现，社区对升级路径信心不足。
- **会话/工作区持久化**：workspace artifacts（#35318）、GitHub Issue/PR 绑定工作上下文（#42396）、跨项目持久 utility workspace（#65486）。
- **可观测性与可配置性**：静默重试无日志（#62319）、成本估算显示（#60653）、编辑工具选择（#63981）。
- **生态集成**：Antigravity 连接器（#28889）、本地 GPU 语音听写方案 whisper-ditado（#65499）、MCP 推送投递。

---

## ⚠️ 开发者关注点

1. **免费层配额体验**是当前最大舆情来源，官方汇总帖仍在积累报告（405+ 评论）。
2. **V2 稳定性**：堆 OOM、SSE 卡死、SQLite disk I/O error（#59189）、大库 stats 拖垮 server —— 长时间运行/大负载场景问题集中。
3. **迁移即坑**：多个 V1→V2 升级 bug 均为“静默失败”，社区呼吁迁移工具增加校验与告警。
4. **TUI 细节体验**：Escape 失效（#65456）、禁用 tabs 后会话仍恢复为标签页（#65457）、权限 `ask` 被静默当作 `allow`（#65248，涉及安全）。
5. **Provider 兼容性**：Mistral GLM 系列工具调用崩溃、MCP 202 响应被拒 —— 对非主流 provider/协议实现的容错有待加强。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-11-22

## 一、今日速览

Qwen Code 发布 **v0.28.3** 稳定版，无破坏性变更，主要带来 Web Shell 后台任务解释能力增强及多项 CI 修复。过去 24 小时社区活动高度活跃：CI 稳定性仍是最大噪音源（多个长期失败的 CI 追踪 Issue 持续更新），同时 wenshao 等核心贡献者密集推进 **Web Shell 体验、daemon 健壮性与 Managed Agent 体系**的迭代。值得关注的是 #17875 合并后确认引入回归（P1 级 #18042），修复跟进已在路上。

---

## 二、版本发布

### v0.28.3
- **Features**：Web Shell 支持从 composer chips 解释后台任务（[#17398](https://github.com/QwenLM/qwen-code/pull/17398)）
- **CI 修复**：改用 live review bot 进行手动重审（[#17848](https://github.com/QwenLM/qwen-code/pull/17848)）、稳定 Managed Agent 必需 gate
- **破坏性变更**：无

---

## 三、社区热点 Issues

1. **[#14724](https://github.com/QwenLM/qwen-code/issues/14724)** — Managed Agent gate 持续失败（524 条评论）。长期存在的 CI 噪音源，评论量最大，反映 gate 稳定性问题是项目首要技术债。

2. **[#18042](https://github.com/QwenLM/qwen-code/issues/18042)（P1）** — #17875 合并后确认回归：media-strip 丢失 recovery handle + web_fetch 返回处理回归。PR 合并仅比评审晚 2 分钟导致修复未能上车，是当前最高优先级修复项。

3. **[#17479](https://github.com/QwenLM/qwen-code/issues/17479)（P1）** — `qwen serve` 两个复合缺陷：SSE 耗尽 listener cap 后锁死 /health；显式 `--port` 静默产生重复 daemon。基于长期运行部署实测，对生产用户影响大。

4. **[#12597](https://github.com/QwenLM/qwen-code/issues/12597)（P2）** — 请求真正的“禁用自动 compaction”开关。上下文管理是高频讨论方向，此 Issue 持续活跃一个月。

5. **[#15748](https://github.com/QwenLM/qwen-code/issues/15748)（P2）** — Subagent 后台任务完成通知只发给顶层 agent，可能引发无谓唤醒甚至 OOM。多 agent 架构下的通知路由缺陷。

6. **[#16091](https://github.com/QwenLM/qwen-code/issues/16091)（P2）** — Bun PTY 在 5000 行洪流下 300 次无间隔切换无法保持 byte-exact。终端渲染正确性的深度压力测试缺陷。

7. **[#17037](https://github.com/QwenLM/qwen-code/issues/17037)（已关闭）** — CI 自托管机器 hz3 /tmp inode 耗尽，遗留 verify worktree 占 92% tmpfs。已解决，但揭示了 CI 基础设施卫生问题。

8. **[#18030](https://github.com/QwenLM/qwen-code/issues/18030)（P2）** — 请求在 workspace 与其 Git worktree 之间共享项目 auto-memory。#6462 让每个 worktree 独立记忆目录，破坏了经验沉淀的连续性。

9. **[#18059](https://github.com/QwenLM/qwen-code/issues/18059)（P2）** — Windows 上 UNC / WSL 路径的 "Always Allow" 保存的规则永不匹配（`//server` 被解析为 `/server`）。Windows/WSL 互操作痛点。

10. **[#18061](https://github.com/QwenLM/qwen-code/issues/18061)（P3）** — `/theme` 应像 `/model` 一样接受主题名参数。同日即有对应 PR #18062 响应，社区响应速度很快。

> 另注意：多条 CI Failure Patrol "deflake" Issue（#18050/#18051/#18053/#18055）在 24 小时内密集产生，多数围绕 `qwen serve` SIGKILL 恢复测试，去 flakes 工作量大。

---

## 四、重要 PR 进展

1. **[#18062](https://github.com/QwenLM/qwen-code/pull/18062)** — `/theme <name>` 支持直接切换主题，含 tab 补全，对齐 `/effort`、`/output-style` 交互习惯。

2. **[#17910](https://github.com/QwenLM/qwen-code/pull/17910)** — 为超过 64 MiB 共享缓存的超大 transcript 索引建立独立 256 MiB LRU 保留类，避免每次请求被拒载，显著优化大 session 性能。

3. **[#17437](https://github.com/QwenLM/qwen-code/pull/17437)** — CLI 与 Web Shell 完整阿拉伯语支持 + RTL 布局（含导出的 HTML transcript），国际化覆盖持续扩张。

4. **[#17952](https://github.com/QwenLM/qwen-code/pull/17952)（已合并）** — 统一聊天界面迁移的核心：后端无关的 ChatSurface 聊天栏渲染器，从 view model 完整渲染 transcript / 审批 / 提问 / composer。

5. **[#18028](https://github.com/QwenLM/qwen-code/pull/18028)** — ACP 通道存活监控区分“忙碌”与“死亡”：探测超时时采样子进程 CPU 记账，拆除通道前留存取证证据。

6. **[#18054](https://github.com/QwenLM/qwen-code/pull/18054)** — daemon 过载暂停状态在 Web Shell 侧边栏可视化：警告条 + 禁用所有任务创建入口，透传拒绝原因。

7. **[#17918](https://github.com/QwenLM/qwen-code/pull/17918)** — 触屏设备上 follow-up 建议可显式接受，改善移动端 Web Shell 体验。

8. **[#18047](https://github.com/QwenLM/qwen-code/pull/18047)（已合并）** — 无状态 Harness 第四阶段 "Action parking" 设计文档：等待工具审批/用户提问的 Turn 不再钉住 Session。

9. **[#18022](https://github.com/QwenLM/qwen-code/pull/18022)** — telemetry 增加 `managed` 渠道维度，区分 Managed Agent 会话与普通 daemon 流量。

10. **[#17970](https://github.com/QwenLM/qwen-code/pull/17970)** — cron / `/loop` 自动续跑消息压缩为紧凑卡片，减少聊天流噪音。

> 去 flakes 批量工作同步推进：#18031（teammate parity）、#18056（idle-timer）、#18057（SIGKILL 恢复）等由 dev-bot 自动开出。

---

## 五、功能需求趋势

- **上下文 / 内存管理**：禁用自动 compaction 开关（#12597）、workspace 与 worktree 共享 auto-memory（#18030）、microcompaction 保护（#18043）——最集中的需求方向。
- **Web Shell 体验**：统一聊天界面、触屏优化（#17918）、过载可视化（#18054）、自动消息卡片化（#17970）——本周期投入最重的产品线。
- **Daemon / serve 健壮性**：SSE listener 耗尽与端口复用（#17479）、SIGKILL 恢复、ACP 通道存活判定（#18028）。
- **Managed Agent 体系**：DingTalk 适配器完善（#17173）、telemetry 归因（#18022）、Action parking 设计（#18047）。
- **国际化**：阿拉伯语 + RTL（#17437）显示语言矩阵持续扩大。
- **CLI 一致性细节**：`/theme` 参数化（#18061）等命令交互统一。

---

## 六、开发者关注点

1. **CI 稳定性是最大痛点**：评论量 Top 10 的 Issue 中 7 个为 CI 失败追踪；CI Failure Patrol 的自动 deflake 机制虽高效，但也产生大量重复/临时 Issue（如 #18050 vs #18051 vs #18055 三个针对同一测试），信噪比待改善。
2. **合并流程风险**：#17875 在评审结论落地 2 分钟后合并，导致 P1 回归（#18042）只能事后修复——自动化评审与人工合并时序协调值得流程改进。
3. **多 agent / subagent 通知路由**（#15748）与 **大 session 内存压力**（#17910、#15748 提及 OOM）是 daemon 长时间运行场景下的实际稳定性威胁。
4. **Windows / WSL 互操作**：UNC 路径权限规则失效（#18059）提醒跨平台路径规范化仍有坑。
5. **自托管 runner 卫生**：hz3 inode 耗尽事件（#17037）表明 CI 基础设施需要常态化清理机制。

---
*数据来源：GitHub QwenLM/qwen-code 过去 24 小时活动 | 由技术分析师生成*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*