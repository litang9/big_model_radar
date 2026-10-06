# AI CLI 工具社区动态日报 2026-10-06

> 生成时间: 2026-10-06 01:17 UTC | 覆盖工具: 7 个

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
**2026-10-06 · 基于 6 个主流工具的社区动态**

---

## 1. 生态全景

AI CLI 工具已从单纯的“终端补全”演化为**多 agent 编排平台**——Claude Code 的 Mod/hooks、Codex 的 dots、Qwen Code 的 Managed Agent、OpenCode 的 task worktree 隔离，都在向“主代理 + 子代理 + 沙箱化工具运行时”收敛。同时，**MCP 已成为事实性集成标准**，各工具的痛点正从“能不能连”转移到 OAuth 认证、token 续期、工具目录膨胀等“最后一公里”问题。**Windows/跨平台是一致性短板**：三家工具（Claude Code、Codex、Copilot CLI）的高热 issue 过半与 Windows 相关。最后，**自动更新与静默数据操作正在消耗付费用户信任**，多起数据丢失类问题表明“未经同意丢弃上下文”已成为社区零容忍红线。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | 24h PR 活动 | Release | 核心焦点 |
|---|---|---|---|---|
| **Claude Code** | 10+（多起长期未解，最高 21 评论） | 0（不接收社区 PR） | v2.1.290 | idle compaction 静默丢上下文、Desktop 自动更新断连 |
| **OpenAI Codex** | 10+（最高 69 评论） | **34 个合入**（最高） | rust-v0.160.1 稳定 + 3 个 alpha | Windows 体验、Daybreak 安全模式灰度、dots 协调 |
| **Gemini CLI** | 10（P1 密集） | 10 个活跃 PR | v0.64.0 nightly | 子代理稳定性、安全加固 PR 集中 |
| **Copilot CLI** | 10（含多项关闭） | 1（疑似垃圾 PR） | **2 个修复版**（v1.0.93-0、v1.0.92-5） | Entra/MCP 认证、macOS 更新瘫痪 bug |
| **Qwen Code** | 10（#12380 达 46 评论） | 9 个活跃 + 批量 stale 清理 | v0.25.0（CLI/Desktop/SDK 三端） | Managed Agent 架构、v0.25.0 WeChat 回归 |
| **OpenCode** | 10 | 10+（核心修复密集） | 无 | V2 迁移数据丢失、计费/支付信任危机 |
| Kimi Code CLI | — | — | — | 无活动 |

**开发节奏**：Codex（34 PR/日 + 双轨发布）> Gemini/Qwen/OpenCode（nightly 或大版本驱动）> Copilot CLI（内部分支迭代，外部 PR 通道近乎关闭）> Claude Code（纯闭源 Release 模式）。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **多 agent / 子代理编排可靠性** | 全部 6 家 | Gemini：子代理挂起、伪成功（#22323）；Qwen：后台 agent 重复工作（#8097）；Codex：dots 与本地线程互通失败（#50077）；Claude Code：复杂编排下压缩/worktree 问题集中爆发；OpenCode 刚合入子代理 worktree 隔离（#53425） |
| **MCP 生态兼容性** | 全部 6 家 | Codex 修环境变量继承 + 工具目录遥测；Copilot 的 Entra scope 回归（#5061）；Gemini >128 工具即 400；Claude Code structuredContent 静默丢弃（#79944）；OpenCode/Copilot 缺 resources 原语 |
| **会话/上下文管理** | Claude Code、OpenCode、Qwen、Copilot | 自动压缩透明度与 opt-out（Claude Code #98747 vs #66115）；V1→V2 会话迁移丢失（OpenCode）；取消/恢复/重放语义（Qwen #13463）；resume 会话失效（Copilot #4505） |
| **Windows / 跨平台质量** | Claude Code、Codex、Copilot、OpenCode | MSIX 更新强杀（Claude Code #91763）；WSL ENOENT（Codex #22185）；Windows 主题检测（Copilot #4961）；UNC 路径崩溃（OpenCode #52205） |
| **安全与权限模型精细化** | Claude Code、Codex、Gemini、OpenCode | Claude Code 分类器误伤合法操作（#78160）；Codex Daybreak 硬件密钥争议后退回 opt-in（#51207）；Gemini 命令注入/凭据隔离 PR 集中；OpenCode 空权限列表回退 allow 的安全修复（#51664） |
| **工具目录膨胀 / token 成本** | Codex、Gemini、Copilot | Codex BM25 延迟工具加载（#51209）；Gemini AST 感知检索 EPIC（#22745）；Copilot 延迟工具搜索已落地（#4519 关闭） |
| **长会话内信息定位** | OpenCode、Claude Code | OpenCode TUI 搜索呼声最高（60 👍，近一年未关闭）；Claude Code transcript 被静默删除加剧该焦虑 |

---

## 4. 差异化定位分析

| 工具 | 技术路线 | 目标用户 | 独特侧重 |
|---|---|---|---|
| **Claude Code** | 闭源、Release 驱动、hooks/Mod 可观测性 | 专业开发者 + 企业 | 可观测性最深（serverToolUses、agentId 级 hook）；但用户对“静默行为”（更新、压缩、删除）容忍度最低 |
| **Codex** | Rust 内核、双轨发布（稳定+alpha）、34 PR/日最活跃 | 付费 Pro 用户、跨端（iOS/桌面/Web）用户 | dots 任务协调 + Computer Use + Daybreak 安全模式；平台化野心最大，Windows 债务也最重 |
| **Gemini CLI** | 开源、nightly 快节奏、社区安全贡献集中 | 开源开发者、Linux 用户 | 安全加固最密集（OAuth RFC 9207、CWE-88、沙箱）；架构级提案（原生 bash + OS 沙箱）最具实验性 |
| **Copilot CLI** | 内部迭代、企业生态绑定（Entra/managed settings） | GitHub/微软生态企业用户 | 企业管控（BYOK、managed model、多账户）；外部贡献通道最弱，MCP 认证回归风险需谨慎升级 |
| **Qwen Code** | 开源、大版本三端同步（CLI/Desktop/SDK） | 国内生态 + 平台化部署（K8s） | Managed Agent 双路径架构讨论最深（46 评论）；唯一推进 K8s 工具运行时；WeChat 集成暴露本土化特色与回归风险 |
| **OpenCode** | 开源、社区贡献者驱动、插件生态扩张 | 独立开发者、插件作者 | 插件宿主 Effect 共享（#53422）是生态基石修复；但计费/支付三类问题叠加构成独特信任危机 |

---

## 5. 社区热度与成熟度

- **第一梯队（社区热度）**：Codex（评论量最高 69 条，付费用户情绪激烈但参与深）≈ Claude Code（issue 质量高、有根因分析，但无 PR 通道限制了共建）
- **快速迭代期**：Gemini CLI（nightly + P1 密集暴露）、Qwen Code（大版本节奏 + 架构大讨论）、OpenCode（V2 迁移阵痛期，成熟度追赶中）
- **成熟但封闭**：Copilot CLI——修复节奏快（两个 hotfix 版本）、历史债务集中清理，但外部生态近乎单向
- **风险信号**：OpenCode 的付费体系问题（额度不符、发票未入账、EU 支付全拒）若不解决将直接反噬社区；Kimi Code CLI 无活动，暂不具备竞争力

---

## 6. 值得关注的趋势信号

1. **“静默行为”是新的信任红线**：Claude Code 的静默压缩/自动更新、OpenCode 的静默会话丢失、Codex 的静默替换 ChatGPT Desktop——行业共识正在形成：**任何未经用户同意的上下文/数据操作都需要 opt-out 和审计日志**。工具选型时应评估此点。
2. **安全功能正从“加固”走向“门控”再退回“渐进”**：Codex Daybreak 硬件密钥强制 → 一天内退回 opt-in 开关（#51207）是标志性事件；Claude Code 密码硬阻断获今日最高 👍。**安全策略的可配置性将成为差异化能力**。
3. **多 agent 编排进入“正确性攻坚”阶段**：三家以上工具同时在解决取消语义、输入重放、子代理误报成功——从“能并行”到“可信赖的并行”是下一阶段竞争焦点，OpenCode 的 worktree 隔离 PR 值得借鉴。
4. **工具规模治理成为新战场**：MCP 工具 >128 触发 400（Gemini）、BM25 延迟加载（Codex）、AST 感知检索（Gemini EPIC）——**上下文预算管理技术**对重度 MCP 用户是实际生产力差异。
5. **对开发者的实操建议**：
   - 升级 Copilot CLI 前验证 Entra MCP scope 兼容性（#5061 回归）
   - 升级 Qwen Code v0.25.0 前检查 WeChat 集成依赖
   - OpenCode V1→V2 升级前务必备份会话数据库
   - 长期依赖 Claude Code 远程会话的团队建议锁定版本，规避 Desktop 自动更新断连

---
*数据来源：各仓库 2026-10-06 前后 24 小时公开动态，统计口径以各日报原文为准。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-10-06）

## 一、热门 Skills 排行（按 PR 讨论活跃度/更新频率）

| # | Skill | 功能 | 讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 修复**（PR [#1298](https://github.com/anthropics/skills/pull/1298)） | 修复触发评估误报、Windows select() 失败、运行时错误被误判为非触发 | 关联 Issue [#1383](https://github.com/anthropics/skills/issues/1383)（6 个可复现缺陷）与 [#1394](https://github.com/anthropics/skills/issues/1394)（eval-viewer XSS），是社区审计最深入的模块 | OPEN |
| 2 | **mcp-builder 修复**（PR [#1742](https://github.com/anthropics/skills/pull/1742)） | 适配 mcp>=2 的 `streamable_http_client` 重命名及自定义 HTTP 头 | 修复 Issue [#1668](https://github.com/anthropics/skills/issues/1668)；另 Issue [#1390](https://github.com/anthropics/skills/issues/1390) 报告评估脚本对真实 MCP 服务器全得 0 分 | OPEN |
| 3 | **docx 修复**（PR [#1792](https://github.com/anthropics/skills/pull/1792)、[#541](https://github.com/anthropics/skills/pull/541)） | LibreOffice 超时报错、修订标记 ID 冲突致文档损坏 | OOXML `w:id` 共享 ID 空间冲突是高价值 bug；配套 PR [#1734](https://github.com/anthropics/skills/pull/1734)（孤儿批注检测） | OPEN |
| 4 | **pyxel 复古游戏开发**（PR [#525](https://github.com/anthropics/skills/pull/525)） | Python 复古游戏的创建、调试、无头运行验证 | 挂起近 7 个月仍持续更新（至 9/22），长尾 PR 的典型 | OPEN |
| 5 | **AWT AI E2E 测试**（PR [#822](https://github.com/anthropics/skills/pull/822)） | 视觉 + 浏览器控制的零代码端到端测试 | 映射社区对测试自动化 Skills 的强烈需求（另见 testing-patterns PR [#723](https://github.com/anthropics/skills/pull/723)） | OPEN |
| 6 | **skill-creator 打包脚本修复**（PR [#1681](https://github.com/anthropics/skills/pull/1681)） | 修复 `package_skill.py` 直接执行的 ModuleNotFoundError | skill-creator 工具链持续高频修复 | OPEN |
| 7 | **md2video-audio**（PR [#1703](https://github.com/anthropics/skills/pull/1703)） | Markdown → Marp 幻灯 → 带 AI 配音的 MP4 视频 | 零成本内容生产类 Skill 代表 | OPEN |
| 8 | **blast-radius**（PR [#1776](https://github.com/anthropics/skills/pull/1776)） | 批量/破坏性写操作前的爆炸半径检查清单 | 安全防护类 Skill，与 agent-governance 提案（Issue [#412](https://github.com/anthropics/skills/issues/412)）呼应 | OPEN |

## 二、社区需求趋势（来自 Issues）

1. **安全与信任边界**：最热 Issue [#492](https://github.com/anthropics/skills/issues/492)（43 评论）——社区 Skill 假借 `anthropic/` 命名空间冒充官方，引发权限滥用担忧；叠加 [#1394](https://github.com/anthropics/skills/issues/1394) XSS，安全是第一议题。
2. **组织级协作/分发**：[#228](https://github.com/anthropics/skills/issues/228) 要求组织内 Skill 共享库；[#62](https://github.com/anthropics/skills/issues/62) 反映 Skill 静默丢失的可靠性问题。
3. **上下文效率**：[#1487](https://github.com/anthropics/skills/issues/1487) —— claude-api skill 单次注入 156k tokens 爆炸上下文；[#1329](https://github.com/anthropics/skills/issues/1329) 提议 compact-memory 符号化记忆。
4. **评估/质量工具链**：[#556](https://github.com/anthropics/skills/issues/556)（触发率 0%）、[#1383](https://github.com/anthropics/skills/issues/1383)、[#1385](https://github.com/anthropics/skills/issues/1385)（推理质量门禁流水线）——社区在自建 Skill 评测方法论。
5. **企业集成**：Bedrock 支持（[#29](https://github.com/anthropics/skills/issues/29)）、SharePoint 权限模型（[#1175](https://github.com/anthropics/skills/issues/1175)）。
6. **插件去重**：document-skills 与 example-skills 内容重复（[#189](https://github.com/anthropics/skills/issues/189)，👍9）。

## 三、高潜力待合并 Skills（活跃且持续更新的 OPEN PR）

- **#1298 skill-creator 触发评估修复**（9/16 仍更新，多 Issue 支撑，优先级最高）
- **#1742 mcp-builder mcp>=2 适配**（9/29 更新，修复已确认 Issue）
- **#1792 docx LibreOffice 超时修复**（9/25 更新，修复面明确易验收）
- **#1730 claude-api 失效 URL 修复**（10/4 更新，低风险文档修正，最接近合并）
- **#525 pyxel / #723 testing-patterns / #822 AWT**：长周期但持续维护，功能型 Skill 中胜出概率大

## 四、生态洞察（一句话）

**社区最集中的诉求是从“能写 Skill”转向“可信的 Skill”——即安全的命名空间与权限边界、可复现的触发/质量评估工具链，以及不炸上下文的高效加载机制。**

---

# Claude Code 社区动态日报 · 2026-10-06

## 1. 今日速览

Claude Code 发布 v2.1.290，重点增强了插件/Mod 的 hooks 可观测性（`turn.step` 新增 `serverToolUses`、`tool.check` 新增 `agentId`）。社区讨论焦点集中在 **2.1.286 引入的空闲自动压缩（idle compaction）静默丢失上下文** 问题（#98747，13 评论），以及 Desktop 端静默自动更新导致 Remote Control 会话断连的一系列连锁问题。多起数据丢失类 issue（transcript 被静默删除/压缩替换）值得团队警惕。

## 2. 版本发布

**v2.1.290**（[Release](https://github.com/anthropics/claude-code/releases)）
- Mod 的 `turn.step` hook 结果中新增 `serverToolUses` 字段：暴露 API 自行执行的工具调用（advisor），包含 id、名称、输入及起止时间
- 插件 hooks 的 `tool.check` 事件新增 `agentId`，可用于区分子代理与主代理的权限检查

## 3. 社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#74558](https://github.com/anthropics/claude-code/issues/74558) Fable 5 中途 assistant 文本块间歇性被作为 summarized thinking 投递，回合“静默” | 19 评论/16 👍，有复现，影响 stream-json 消费端，长期未解 |
| 2 | [#91763](https://github.com/anthropics/claude-code/issues/91763) Windows MSIX 下 `git fsmonitor--daemon` 继承 AppX 容器，更新强杀后阻止新版本启动 (0x80070020) | 18 评论，社区已给出根因分析和免重启 workaround |
| 3 | [#61021](https://github.com/anthropics/claude-code/issues/61021) VS Code 终端中无法正常选中文本复制 | 17 评论/14 👍，长期影响日常操作效率 |
| 4 | [#98747](https://github.com/anthropics/claude-code/issues/98747) 2.1.286 空闲压缩静默丢弃工作上下文，无 opt-out | 13 评论/11 👍，**今日最热新 issue**，与 #66115 的功能请求形成“过度实现”的反讽 |
| 5 | [#89690](https://github.com/anthropics/claude-code/issues/89690) modelPicker 的 `opusplan` 行被跳过但内置列表又无该行 | 12 评论，有复现，影响自定义模型配置 |
| 6 | [#78160](https://github.com/anthropics/claude-code/issues/78160) 密码硬阻断破坏合法开发/测试流程 | 11 评论/20 👍（今日最高 👍），呼吁权限门控的 opt-in |
| 7 | [#66115](https://github.com/anthropics/claude-code/issues/66115) 请求空闲超时自动压缩以防缓存过期成本 | 21 👍，是 #98747 抱怨的功能源头，需平衡“省成本”与“保上下文” |
| 8 | [#78096](https://github.com/anthropics/claude-code/issues/78096) Claude in Chrome `list_connected_browsers` 数据陈旧/isLocal 误报 | 6 评论，浏览器桥接可靠性问题 |
| 9 | [#79944](https://github.com/anthropics/claude-code/issues/79944) MCP 响应同时含 structuredContent 时 text block 被静默丢弃 | 5 评论/4 👍，影响所有返回混合内容的 MCP 服务器 |
| 10 | [#95364](https://github.com/anthropics/claude-code/issues/95364) + [#99585](https://github.com/anthropics/claude-code/issues/99585) Desktop 静默自动更新致 Remote Control 全部断连且不恢复 | 两个独立 issue 印证同一痛点，远程运维用户损失大 |

其他值得注意：[#98307](https://github.com/anthropics/claude-code/issues/98307) 后台会话 Worktree 隔离误杀子代理所有 Bash 命令；[#99828](https://github.com/anthropics/claude-code/issues/99828) Windows 盘符大小写导致 workspace trust 与项目权限失效。

## 4. 重要 PR 进展

过去 24 小时无更新的 Pull Request。（该仓库主仓库不接收社区代码 PR，变更通过 Releases 发布。）

## 5. 功能需求趋势

- **会话/上下文管理可控性**：自动压缩的透明度与 opt-out（#98747、#99068、#99817、#97797）是当前最强烈的诉求方向
- **远程与多设备体验**：Remote Control 断连恢复（#95364、#99585、#88692）、Chrome 扩展桥接稳定性（#78096、#98135）
- **权限模型精细化**：安全拦截的分类器误伤（#78160、#99230、#99813、#99829），用户要求可配置的豁免机制
- **IDE/VS Code 集成稳定性**：文本选择（#61021）、webview OOM（#97044）、hooks 卡死（#96683）
- **headless/自动化工作流**：定时任务的 Bypass permissions 失效（#99529）、headless 下审批不生效（#99813）

## 6. 开发者关注点（痛点总结）

1. **数据丢失是最大红线**：压缩替换 transcript、30 天静默删除、post-compaction 丢弃历史段——多起 issue 表明用户对“未经同意丢弃上下文”零容忍
2. **自动更新破坏可用性**：Windows MSIX 进程残留阻止重启、Desktop 静默更新杀死远程会话，更新机制需要更温和的策略
3. **安全策略与生产力冲突**：分类器拦截本地 transcript 访问、localhost 测试登录等合理操作，需要更细粒度的白名单
4. **长会话/子代理场景可靠性**：压缩、worktree 隔离、后台会话在复杂编排（lead + subagents）下问题集中爆发

---
*数据来源：github.com/anthropics/claude-code · 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**2026-10-06** | 数据来源：github.com/openai/codex

---

## 1. 今日速览

Codex 今日发布 **rust-v0.160.1 稳定版**（修复远程 stdio MCP 服务器的环境变量继承问题），同时推进了 **0.162.0-alpha.16** 的迭代。开发活动非常活跃，过去 24 小时合入 34 个 PR，重点覆盖 **Daybreak 安全模式灰度控制、MCP 工具目录遥测、沙箱安全加固**等方向。社区侧，Windows 平台的 Computer Use、dots（dot 任务）协调失败及桌面端稳定性问题持续引发大量讨论。

---

## 2. 版本发布

### rust-v0.160.1（稳定版）
- **Bug Fix**：当为远程 stdio MCP 服务器显式配置远程环境变量时，保留 `SYSTEMROOT`、`TEMP`、`TMP`，使 Unix 宿主机得以保留 Windows 执行器的启动环境——改善了跨平台 MCP 场景的兼容性。
- Changelog: [#51121](https://github.com/openai/codex/pull/51121)

### rust-v0.162.0-alpha.14 / .15 / .16
- 三个 alpha 版本连续迭代，持续向 0.162 稳定版推进。

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 关注度 | 为什么重要 |
|---|-------|--------|-----------|
| 1 | [#36040](https://github.com/openai/codex/issues/36040) iOS Remote 仅列出最近有聊天的项目 | 💬 69 | 远程控制核心体验回归，自 7 月底持续发酵，是评论最多的长期未解问题，影响 iOS 用户日常使用 |
| 2 | [#49458](https://github.com/openai/codex/issues/49458) Windows dot 启动的本地任务缺少 Computer Use 工具 | 💬 58 👍 24 | dots 与 Computer Use 两大新功能的交集故障，普通会话正常而 dot 任务失效，24 个 👍 说明受影响面广 |
| 3 | [#25271](https://github.com/openai/codex/issues/25271) Windows 上 Computer Use 无法识别 Chrome URL | 💬 50 | 5 月底至今的老问题，导致 Computer Use 在 Windows 浏览器场景几乎不可用，与 [#45177](https://github.com/openai/codex/issues/45177)（zh-CN、Chrome 153）同源 |
| 4 | [#48938](https://github.com/openai/codex/issues/48938) Windows 更新后渲染进程反复崩溃、白屏、严重输入延迟 | 💬 21 | Pro 付费用户强烈不满，涉及多次并发任务的生产力场景，情绪激烈且缺乏官方解释 |
| 5 | [#48311](https://github.com/openai/codex/issues/48311) Windows 内置 LaTeX 编译器无法找到平台标准目录 | 💬 18 👍 8 | 内置文档工具链完全不可用，最小示例也失败 |
| 6 | [#22185](https://github.com/openai/codex/issues/22185) Windows Desktop + WSL 工作区 unified_exec 尝试 CreateProcess /bin/bash 报 ENOENT | 💬 16 👍 10 | 混合 Windows/WSL 开发环境是主流配置，执行链路断裂阻断核心工作流 |
| 7 | [#45596](https://github.com/openai/codex/issues/45596) Work helpers 占用镜像目录后项目镜像同步失败 | 💬 15 | 企业版（Work）场景数据同步问题，涉及项目可用性 |
| 8 | [#45021](https://github.com/openai/codex/issues/45021) 模型输出偶发丢失词与数字之间的空格 | 💬 8 👍 5 | gpt-6-astra 的模型行为 bug，跨多个 CLI 版本复现，直接影响生成代码/文档的正确性 |
| 9 | [#50489](https://github.com/openai/codex/issues/50489) Daybreak 要求购买实体 FIDO2 硬件钥匙，密码管理器 passkey 不被接受 | 💬 3 👍 2 | 新安全模式将付费用户锁在常规 code review 之外，硬件门槛引发争议，与今日 Daybreak 灰度 PR 直接相关 |
| 10 | [#50077](https://github.com/openai/codex/issues/50077) macOS dot 无法读取本地线程（placement format v1 不支持），委派任务丢失原生工具 | 💬 8 | dots 协调机制的可复现协议层故障，反映 dot 与本地线程互通尚不成熟 |

**其他值得留意**：会话跨端不同步 [#38200](https://github.com/openai/codex/issues/38200)、更新后 Codex Desktop 被 ChatGPT Desktop 替换 [#32145](https://github.com/openai/codex/issues/32145)、chrome.dll 访问违例崩溃 [#50799](https://github.com/openai/codex/issues/50799)。

---

## 4. 重要 PR 进展（Top 10）

1. **[#51207](https://github.com/openai/codex/pull/51207) CLI Daybreak 控件改为 opt-in 特性开关** — 新增 `features.cli_daybreak`（默认关闭），呼应了 #50489 中社区对硬件密钥强制要求的强烈反弹，Daybreak 暂时退回灰度。
2. **[#51211](https://github.com/openai/codex/pull/51211) 拒绝 PATH 中沙箱可写的 bubblewrap 可执行文件** — 重要沙箱安全加固，防止 bwrap 探测阶段执行未经隔离的二进制。
3. **[#51215](https://github.com/openai/codex/pull/51215) 遥测测量原始 MCP 工具目录大小** — 记录 MCP 工具定义序列化 JSON 字节直方图，为工具目录膨胀问题提供数据支撑。
4. **[#51203](https://github.com/openai/codex/pull/51203) apply_patch 无条件保留行尾符** — 修复 CRLF 文件被静默归一化为 LF 的老问题，Windows 用户受益明显。
5. **[#51158](https://github.com/openai/codex/pull/51158) Windows 发布中对 PowerShell 安装脚本签名** — 使用 Azure Trusted Signing，减少安装时的安全告警。
6. **[#51157](https://github.com/openai/codex/pull/51157) 模型推理前强制校验必需环境 skills** — 支持 `environments.toml` 声明 `skills.required`，缺失即快速失败。
7. **[#51209](https://github.com/openai/codex/pull/51209) JavaScript code mode 增加排序式工具发现** — 默认关闭的 `code_mode_tool_search`，BM25 排序的延迟工具加载，直指 MCP 工具过多时的上下文成本问题。
8. **[#51192](https://github.com/openai/codex/pull/51192) TUI 恢复时等待 SIGCONT** — 修复 `Ctrl+Z` 挂起后恢复的竞态，带超时保护。
9. **[#51185](https://github.com/openai/codex/pull/51185) 重试瞬时 gRPC code-mode 会话准入失败** — 提升 code mode 会话建立可靠性。
10. **[#51186](https://github.com/openai/codex/pull/51186) + [#51198](https://github.com/openai/codex/pull/51198) 发布流程加固** — 防止稳定版发布指针回退、允许多 tag 并行构建但串行发布，工程基础设施持续成熟。

**其他**：浏览器扩展自定义请求头 [#51194](https://github.com/openai/codex/pull/51194)、base instructions 迁移为 Responses input 消息 [#51156](https://github.com/openai/codex/pull/51156)。

---

## 5. 功能需求趋势

1. **Dots（dot 任务/代理协调）** — 最高频的新兴主题：#49458、#50077、#50887、#49978、#49499 均指向 dot 与本地线程、Computer Use、语音之间的互通可靠性，社区期待 dot 成为稳定的一等公民。
2. **Windows 平台体验** — 热点 Issue 中过半标注 `windows-os`：Computer Use、WSL、LaTeX、崩溃稳定性，Windows 是当前最需投入的质量短板。
3. **Computer Use / 浏览器自动化** — Chrome URL 识别（#25271、#45177）、嵌入式浏览器崩溃（#50799）、浏览器设置不生效（#50722）持续有反馈。
4. **安全与审批策略** — Daybreak 硬件密钥门槛（#50489）、子代理升级审批继承（#23324）、Auto-review 后 /approve 不可用（#49439），社区希望在安全与可用性间取得平衡。
5. **跨端会话与项目同步** — 桌面/iOS/Web 会话不同步（#38200）、跨项目仪表盘需求（#23561）反映多端工作流管理诉求上升。
6. **MCP 生态扩展** — 环境变量继承修复（v0.160.1）与工具目录遥测/发现（#51215、#51209）表明官方在系统性优化大规模 MCP 集成。

---

## 6. 开发者关注点

- **付费用户对质量回归容忍度下降**：#48938 中 Pro 用户明确表达对崩溃问题与缺乏官方沟通的不满；建议关注 Windows 桌面端稳定性投入。
- **跨平台混合环境仍是重灾区**：Windows+WSL（#22185）、Unix 宿主机跑 Windows 执行器（v0.160.1 修复）说明跨 OS 边界的路径/环境处理需系统治理。
- **模型行为层面的细微 bug**（空格丢失 #45021）无法通过客户端修复，开发者希望更透明的模型问题跟踪渠道。
- **安全功能落地方式需要缓和**：Daybreak 的硬件密钥强制要求与 opt-in 退回（#51207）表明“渐进式启用 + 软件密钥支持”更符合社区预期。
- **CLI 工程细节持续打磨**：apply_patch 行尾、SIGCONT 处理、fd 泄漏诊断（#37971）等反馈显示 CLI 核心用户对低层可靠性要求极高。

---
*本日报基于 GitHub 公开数据自动聚合分析，仅供参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-06）

## 📌 今日速览

Gemini CLI 发布了新 nightly 版本 v0.64.0（20261005）。社区讨论焦点集中在 **Agent 子代理的稳定性与行为问题**（挂起、误报成功、调用不足），同时安全类 PR 活跃，多个涉及 OAuth RFC 9207 合规与命令注入防护的修复正在推进中。

---

## 🚀 版本发布

- **v0.64.0-nightly.20261005.gfb972b2f8**（[Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.64.0-nightly.20261003.gfb972b2f8...v0.64.0-nightly.20261005.gfb972b2f8)）—— 仅隔一天的 nightly 迭代，持续快速发布节奏。

---

## 🔥 社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** Subagent 达到 MAX_TURNS 后仍上报 "GOAL success"，掩盖中断事实。P1 级 bug，影响结果可信度，13 条评论，热度最高。
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** Generalist agent 无限挂起，简单操作（如建文件夹）也会卡死，8 👍，用户痛点强烈。
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** 提议利用 Gemini 3 模型原生 bash 能力，通过零依赖 OS 沙箱 + 执行后意图路由释放模型潜力，是重量级架构级 enhancement。
4. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** 模型几乎不主动使用自定义 skills 和 subagents，需显式指令才触发，反映调度策略问题。
5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** EPIC：评估 AST 感知的文件读取/搜索/代码库映射，目标是减少 token 浪费、提升检索精度，是社区长期关注的方向（配套 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)、[#22747](https://github.com/google-gemini/gemini-cli/issues/22747)）。
6. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** P1：browser subagent 在 Wayland 下失败，Linux 用户受阻。
7. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** Browser Agent 完全忽略 settings.json 配置覆盖（如 maxTurns），配置合并逻辑存在断链。
8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** 工具数超过 128 个时触发 API 400 错误，工具范围裁剪机制需优化。
9. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** P1：get-shit-done 输出 hook 导致 CLI 崩溃。
10. **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)** 模型频繁在随机位置生成临时脚本，污染工作区，增加提交清理成本。

---

## 🔧 重要 PR 进展

1. **[#29644](https://github.com/google-gemini/gemini-cli/pull/29644)** P1：恢复终端宽度变化时的防抖静态刷新，修复水平 resize 的渲染问题。
2. **[#29641](https://github.com/google-gemini/gemini-cli/pull/29641)** 遥测支持自定义 OTLP headers，兼容 Grafana Cloud/Honeycomb/Datadog 等认证端点。
3. **[#29643](https://github.com/google-gemini/gemini-cli/pull/29643)** 重新选择 Google 登录时清除缓存凭据，支持账号切换，告别过期 token 锁定。
4. **[#29490](https://github.com/google-gemini/gemini-cli/pull/29490)** P1：修复 `gemini -r` 恢复会话时 tool response 重复回放问题。
5. **[#29616](https://github.com/google-gemini/gemini-cli/pull/29616)** P1 安全：OAuth 回调 `iss` 参数校验对齐 RFC 9207（与 [#29488](https://github.com/google-gemini/gemini-cli/pull/29488) 同属修复 MCP OAuth 回归）。
6. **[#29536](https://github.com/google-gemini/gemini-cli/pull/29536)** 安全：grep 工具使用 `-e` 显式分隔符，防止 CWE-88 命令行选项注入。
7. **[#29523](https://github.com/google-gemini/gemini-cli/pull/29523)** 安全：外部 safety checker 仅获取最小环境变量并限制输出上限，避免 API key 泄漏与内存耗尽。
8. **[#29522](https://github.com/google-gemini/gemini-cli/pull/29522)** 安全：glob 工具防止绝对路径模式逃逸出已验证的搜索目录。
9. **[#29612](https://github.com/google-gemini/gemini-cli/pull/29612)** 强制终端用户轮次不变量，修复 `/rewind`、流中断等场景下的 API 协议违规。
10. **[#29638](https://github.com/google-gemini/gemini-cli/pull/29638)** 移除 VS Code 扩展启动时的 Marketplace 更新检查，加速启动。

---

## 📈 功能需求趋势

- **Agent/Subagent 稳定性与编排**：今日 30 条热门 Issues 中绝大多数带 `area/agent` 标签，子代理挂起、状态误报、调度不积极是核心议题；并行子代理协作（[#18287](https://github.com/google-gemini/gemini-cli/issues/18287)）仍在规划。
- **代码检索效率**：AST 感知工具（tilth/glyph/ast-grep）、"Tactful Extraction" 精准读取（[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)）反映对 token 成本与上下文膨胀的持续优化诉求。
- **安全加固**：社区贡献者集中提交沙箱、注入防护、凭据隔离类 PR，安全是当前贡献热点。
- **任务管理升级**：用持久化文件 CRUD 替换 WriteToDo 以对抗 context rot（[#18836](https://github.com/google-gemini/gemini-cli/issues/18836)）。
- **终端渲染体验**：resize 闪烁、流式输出闪烁等 TUI 性能问题持续修复中。

---

## ⚠️ 开发者关注点

1. **子代理可靠性不足**：挂起、伪成功、上下文缺失（`/bug` 报告不含子代理信息 [#21763](https://github.com/google-gemini/gemini-cli/issues/21763)），多代理工作流尚不可完全信赖。
2. **配置一致性**：settings.json 覆盖对 browser agent 失效，symlink 定义 agent 不被识别（[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)）。
3. **工作区卫生**：临时脚本乱放、危险命令（git reset --force）缺乏拦截（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）。
4. **交互场景卡死**：如创建 Vite 应用时陷入交互式提示（[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)）。
5. **工具规模限制**：>128 工具即 400 报错，重度 MCP 用户受限。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-06 | 数据来源：github.com/github/copilot-cli**

---

## 1. 今日速览

过去 24 小时 Copilot CLI 连续发布 v1.0.93-0 与 v1.0.92-5 两个修复版本，重点解决 LSP 语言服务器生命周期与 Entra 保护 MCP 服务器的凭证静默续期问题。社区方面，macOS 更新后 `.mcp-writer.binding` 导致 CLI 完全不可用的高热度 Bug（9 评论 / 9 👍）仍未解决；同时 v1.0.92 被报告拒绝标准 Entra `api://` scopes，MCP 生态兼容性问题持续发酵。

---

## 2. 版本发布

### v1.0.93-0（最新）
- **Fixed**
  - 禁用沙箱时，预热的语言服务器在 LSP 请求间保持运行
  - 点击被截断的紧凑 shell 命令可展开显示

### v1.0.92-5
- **Improved**：Microsoft Entra 登录后可选择使用哪个账户，`/logout` 可登出对应 OAuth 会话
- **Fixed**：Entra 保护的 MCP 服务器可静默续期仅含 access-token 的凭证

### v1.0.92（2026-10-05）
- 新增 `copilot config` 子命令，支持 list / read / set / remove 配置项
- 会话前可通过 **Ctrl+E 环境选择器**在本地与云端运行之间切换
- 旧版 HTTP+SSE MCP 连接不再受支持（迁移至 Streamable HTTP）

---

## 3. 社区热点 Issues

1. **#4998 [OPEN] macOS 更新/重启后 CLI 完全不可用**（9 评论 / 9 👍）
   `.mcp-writer.binding` 持久化了过期的文件系统设备 ID，导致新旧会话均无法处理提示词。影响面广、复现路径清晰，是最需优先修复的阻断级 Bug。
   https://github.com/github/copilot-cli/issues/4998

2. **#5061 [OPEN] v1.0.92 拒绝标准 Entra api:// scopes**（新 Issue）
   与昨日 Entra 凭证续期修复直接相关——新版反而拒绝远程 MCP 服务器声明的合法 `api://<app-id>/<scope>` 格式 scopes，疑似回归问题。
   https://github.com/github/copilot-cli/issues/5061

3. **#4775 [OPEN] Mission Control 面板链接 404**
   `/copilot/tasks/<uuid>` 路径不存在，实际会话位于 `/agents/tasks/<uuid>`；会话本身可通过 `copilot --resume` 恢复，属 dashboard 路由不一致问题。
   https://github.com/github/copilot-cli/issues/4775

4. **#3399 [CLOSED] BYOK 自定义请求头支持**（7 评论 / 14 👍）
   企业级需求：为 BYOX/BYOK LLM 端点添加 `X-Tenant-ID` 等自定义 HTTP 头。已关闭，或已在近期版本落地。
   https://github.com/github/copilot-cli/issues/3399

5. **#4505 [CLOSED] 恢复会话后连接 item ID 失效**
   响应中断后 resume 会话持续报 `CAPIError: 400`，`/fork` 也无法自救。会话稳定性核心问题，已修复。
   https://github.com/github/copilot-cli/issues/4505

6. **#3074 [CLOSED] `/effort` 命令快速切换推理力度**（12 👍）
   免去 `/model` 多步操作，按提示词复杂度动态调整 reasoning effort，高频实用需求已落地。
   https://github.com/github/copilot-cli/issues/3074

7. **#4991 [OPEN] Cloudflare MCP 连接失败**
   OAuth 成功后报 `Subscription limit reached`，随后要求重新认证，远程 MCP 可用性问题的典型案例。
   https://github.com/github/copilot-cli/issues/4991

8. **#1803 [OPEN] 支持 MCP resources/read 原语**（2 评论 / 13 👍）
   目前仅支持 MCP tools，社区要求补齐 resources 与 prompts 两大核心原语，呼声较高。
   https://github.com/github/copilot-cli/issues/1803

9. **#4155 [CLOSED] Gemini 模型返回 400**
   `gemini-3.1-pro-preview` / `gemini-3.5-flash` 纯文本请求全部失败，多模型支持稳定性问题已修复。
   https://github.com/github/copilot-cli/issues/4155

10. **#4961 [OPEN] Windows 主题跟随 OS 而非终端背景**
    OS 主题切换后文本在深色终端下不可读，可访问性问题，1.0.89-1 仍存在。
    https://github.com/github/copilot-cli/issues/4961

其他值得留意的关闭项：#4519（延迟工具搜索 namespace 缺失）、#4169（`-p` 模式 OTEL 遥测缺失）、#2853（`/agent <name>` 直接调用）、#4561（ACP cancel 应返回 `"cancelled"`）等，显示团队正在集中清理模型调用、遥测与 ACP 协议合规性方面的历史债务。

---

## 4. 重要 PR 进展

过去 24 小时仅 1 条 PR 更新，无实质功能进展：

- **#5046 [OPEN] "Initial commit"**（@c6r8h48msf-debug）
  无描述、无评论，标题异常，疑似误提交或低质量 PR，建议维护者 triage 关闭。
  https://github.com/github/copilot-cli/pull/5046

> 本期 PR 动态明显低于 Issues 活动，版本迭代可能主要通过内部分支合入，外部贡献通道有限。

---

## 5. 功能需求趋势

从 Issue 分布可提炼出五大方向：

- **MCP 生态兼容性（最集中）**：#4998、#4991、#5061、#5039、#5058、#1803、#2790——覆盖 OAuth 认证、协议版本协商、HTTP vs SSE 类型识别、resources 原语支持，远程 MCP 是当前最大痛点源
- **企业/组织管控**：#3399（BYOK 自定义头）、#4715（屏蔽内置插件市场，已关闭）、#4959/#4960（Enterprise managed model 设置不生效）
- **模型灵活性与多模型**：#3074（已落地的 `/effort`）、#4462（subagent 模型覆盖被忽略）、#5051（外部 provider 超时）
- **Agent/自动化行为可控性**：#3595（AutoPilot 需决策确认时暂停）、#2853（agent 直呼）、#5059（subagentStart hook 暴露 agentId）
- **可观测性与遥测**：#4967（OTEL span 丰富化）、#4169（已修复）

---

## 6. 开发者关注点

1. **会话稳定性是底线诉求**：恢复会话失败（#4505）、macOS 重启后瘫痪（#4998）这类阻断级问题对开发者信任伤害最大，期望更快的 hotfix 响应
2. **远程 MCP “最后一公里”问题**：OAuth 流程、token 续期、scope 校验、协议版本协商各环节均有报障；v1.0.92 在修旧问题的同时引入新回归（#5061），企业 MCP 接入者升级需谨慎
3. **配置管理正在系统化**：新 `copilot config` 命令与 Entra 多账户选择回应了 #4959 等企业诉求，但 managed settings 的实际生效链路仍待验证
4. **键盘/交互细节引发摩擦**：双 Esc 触发 Rewind（#5060）、Ctrl+E 环境选择等快捷键设计需要可配置性
5. **文档与实现漂移**：#4963 指出文档写 `reasoningEffort` 而实际生效的是 `reasoning-effort`，自定义 agent 用户需注意
6. **Windows 体验仍需打磨**：主题检测逻辑（#4961）与历史配置损坏问题（#2195）表明平台差异化测试覆盖不足

---
*本报告基于 GitHub 公开数据自动整理，仅供参考。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-10-06

## 1. 今日速览

今日无新版本发布。社区焦点集中在 **V1→V2 升级引发的会话数据问题**（会话丢失、路径存储异常）和 **OpenCode Go 订阅计费/支付问题**上。PR 方面活跃度较高，多条修复与生态文档 PR 被合并，核心维护者 @kitlangton 提交了插件宿主 Effect 实例共享的关键修复。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues（Top 10）

1. **TUI 会话缓冲区字符串搜索功能**（#4714，37 评论 / 60 👍）
   社区呼声最高的长青需求，用户希望在 agent 输出中实现类似编辑器的 find 功能。已持续近一年未关闭，配套的桌面版搜索需求（#19143，14 👍）同样在活跃讨论中，显示“长会话内信息定位”是核心痛点。
   https://github.com/anomalyco/opencode/issues/4714

2. **ChatGPT OAuth 连接后丢失新发布的 OpenAI 模型**（#52878，12 评论）
   通过 "Sign in with ChatGPT" 登录后，models.dev 之外的新模型会被 catalog 调和逻辑丢弃。影响面较广的 provider 层 bug。
   https://github.com/anomalyco/opencode/issues/52878

3. **V2 升级后迁移的 V1 会话从 /sessions 列表消失**（#52844，已关闭）
   迁移时 `session.path` 未按项目根目录归一化导致会话不可见。同类问题还有 #53450（非 git 目录的 V1 会话被隐藏），均为近期升级用户的高频踩坑点，值得 V2 迁移用户关注。
   https://github.com/anomalyco/opencode/issues/52844

4. **会话移动 API 存入非法路径致会话“消失”**（#53454）
   `POST /api/session/{id}/move` 在目标目录为项目根时写入 bogus path，返回 204 但会话从列表中隐藏。
   https://github.com/anomalyco/opencode/issues/53454

5. **Go 订阅月度额度与文档不符**（#46365，5 👍）
   文档标称 $60/月限额，实际约 $24.5 即显示 100%，付费用户信任度问题。
   https://github.com/anomalyco/opencode/issues/46365

6. **意大利（EU）所有支付方式订阅 Go 均被拒**（#52958）
   实体卡、Apple Pay、Stripe Link、虚拟卡全部失败，疑似区域支付风控问题，影响欧洲付费转化。
   https://github.com/anomalyco/opencode/issues/52958

7. **已支付发票未入账，付费模型全线报余额不足**（#52186）
   发票显示 PAID 但余额为 $0，属于计费管线的严重问题。
   https://github.com/anomalyco/opencode/issues/52186

8. **自定义 primary agent 无法使用免费额度**（#53347）
   自定义 agent 被 Console 拒绝，而内置 plan agent 使用相同免费模型正常，指向免费层鉴权对自定义 agent 的误判。
   https://github.com/anomalyco/opencode/issues/53347

9. **免费模型在 shell/read 权限 deny 时直接失败**（#51241）
   权限收紧与免费层校验存在耦合 bug，安全意识强的用户反而无法使用免费模型。
   https://github.com/anomalyco/opencode/issues/51241

10. **Slack 桥接消息被 HTML 转义并静默截断**（#53224）
    消息体进入 agent 上下文、PR、shell 命令前被双重破坏，无任何报错，排查成本高。
    https://github.com/anomalyco/opencode/issues/53224

> 其他值得关注：#29802（gVisor 下 TUI 不渲染，1.0.142→1.4.17 回归，已修复关闭）、#48319（重启后 composite reasoning id 过期报错）、#46976（macOS 启动 5–20 秒变慢）。

---

## 4. 重要 PR 进展（Top 10）

1. **[contributor] fix(cli): 插件共享宿主 Effect 实例**（#53422，@kitlangton）
   解决插件加载自带 `effect`/`@opencode/plugin` 副本时模块私有符号与 Schema AST 无法共享导致的运行时故障。插件生态稳定性的基石修复。
   https://github.com/anomalyco/opencode/pull/53422

2. **fix(tui): 合并 message.part.delta store 写入**（#48431）
   消除流式渲染路径客户端 O(n²) 开销，与 markdown-live-relex PR 配合彻底解决长会话冻结问题。性能关键改动。
   https://github.com/anomalyco/opencode/pull/48431

3. **fix(core): 未跟踪文件 diff 合并为单次 git 调用**（#53449）
   原实现每个未跟踪文件跑 2 个 git 进程，257 个文件即超出 60s 超时导致空白页；修复后显著提升大工作区体验。
   https://github.com/anomalyco/opencode/pull/53449

4. **fix(core): 空 resources 列表不再解析为 allow**（#51664）
   修复权限校验中空数组回退到 `allow` 的安全漏洞，权限模型的重要安全修复。
   https://github.com/anomalyco/opencode/pull/51664

5. **[contributor] fix(ai): 延迟系统更新至本地工具结果齐备**（#51765，已合并）
   解决 Anthropic 消息流中系统更新与工具结果交错导致的协议错误，含中断处理。
   https://github.com/anomalyco/opencode/pull/51765

6. **feat(app): Desktop 发现 TUI 主题**（#53041）
   Desktop 自动发现用户配置和项目 `.opencode/themes` 目录的主题文件，统一 TUI/Desktop 主题体验。
   https://github.com/anomalyco/opencode/pull/53041

7. **fix(core): 澄清旧版 ChatGPT OAuth 标签**（#53451，已合并）
   将旧 OAuth 方式重命名为 "ChatGPT browser (legacy)" 等，与新版 "Sign in with ChatGPT" 明确区分——直接呼应 #52878 的用户困惑。
   https://github.com/anomalyco/opencode/pull/53451

8. **fix(app): 切换选择前提交 staged revert**（#53445，已合并）
   修复 GUI 中 revert 后立即换模型发送提示时报 "Message not found" 的时序 bug。
   https://github.com/anomalyco/opencode/pull/53445

9. **feat(task): 子代理分支隔离**（#53425）
   为 task 工具新增可选 branch 参数，通过 git worktree 为子代理创建隔离工作区，社区期待已久的并行安全能力。
   https://github.com/anomalyco/opencode/pull/53425

10. **fix(browser): 会话存储跨重启持久化**（#53453）
    修复内嵌浏览器 pane 每次重载生成临时 UUID partition 导致 cookies/登录全丢的问题，并提升 tunnel 连接上限。
    https://github.com/anomalyco/opencode/pull/53453

> 生态方面：#53448（OpenCode Model Router）、#53455（opencode-courier）、#46770（opencode-twg）等多个插件文档 PR 被合并，社区插件生态持续扩张。

---

## 5. 功能需求趋势

- **会话内搜索/导航**：TUI（#4714，60 👍）与 Desktop（#19143）双端呼声强烈，是呼声最高且未被满足的需求
- **V2 迁移与数据完整性**：会话丢失、路径归一化（#52844、#53450、#53454）集中爆发，升级体验是当前最大风险区
- **权限与沙箱精细化**：可配置自动批准快捷键（#40331）、按 model/agent 粒度的 warming 设置（#53457）、权限拒绝时的信息泄露问题（#53446）
- **TUI 布局灵活性**：水平分屏终端（#53452）、主题透明度（#51625）、终端兼容性（Zellij+Ghostty 链接 #51735、gVisor #29802）
- **模型路由与多级回退**：社区插件 Model Router（#53448）的流行印证了 per-agent 模型 fallback 链的刚需
- **Slack/外部集成可靠性**：消息转义与截断（#53224）暴露 agent 入口链路的薄弱环节

---

## 6. 开发者关注点

1. **计费/支付体系信任危机**：额度与文档不符（#46365）、发票未入账（#52186）、EU 支付全拒（#52958）三类问题叠加，付费用户流失风险高，建议官方优先响应
2. **免费层限制过于黑盒**：免费模型与权限设置耦合失败（#51241）、自定义 agent 被误判（#53347），错误信息不透明增加排查成本
3. **大仓库/长会话性能**：启动变慢（#46976）、流式渲染 O(n²)（#48431）、diff 超时（#53449）——多位贡献者从不同层面提交性能修复，说明已是系统性瓶颈
4. **V1→V2 升级路径**：迁移数据完整性问题集中出现，建议升级前备份会话数据库
5. **Windows/WSL 支持**：UNC 路径传给 Linux server 导致 500 与崩溃（#52205）、符号链接补全缺失（#53447），Windows 体验仍属二等公民

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-06）

## 📌 今日速览

Qwen Code 正式发布 **v0.25.0**（含 CLI、Desktop 与 SDK TypeScript v0.1.18），核心亮点是本地 workspace-agent 协作能力。社区讨论焦点集中在 **Managed Agent 双路径架构**（#12380，46 条评论）及其 Kubernetes 工具运行时推进。同时，v0.25.0 上曝出 WeChat 集成回归问题（P1），值得集成用户关注。

---

## 🚀 版本发布

### v0.25.0（CLI / Desktop / SDK 同步发布）

- **feat(agents): 本地 workspace-agent 协作**（[#11206](https://github.com/QwenLM/qwen-code/pull/11206) by @yiliang）—— 支持多个本地 agent 在工作区内协同工作，是本版本最大特性。
- **fix(serve): 保留会话创建失败的诊断信息**（#12331）
- **feat(sdk-java): 新增 managed runtime** 支持
- **SDK TypeScript v0.1.18** 捆绑 CLI 0.25.0
- 官方声明**无已知 Breaking Changes**

---

## 🔥 社区热点 Issues

1. **[#12380](https://github.com/QwenLM/qwen-code/issues/12380)** Managed Agent 双路径架构提案（46 评论）
   定义分阶段架构：保留现有 TypeScript agent loop、模型推理与工具环境配置解耦、Session 持久化所有权与稳定 WebSocket。是当前社区讨论最激烈的路线图提案。

2. **[#13395](https://github.com/QwenLM/qwen-code/issues/13395)** Kubernetes 工具运行时进度追踪（14 评论）
   #12380 的落地追踪 issue，关联 PR #13289，记录可移植性与验收门禁，是平台化交付的关键路径。

3. **[#8097](https://github.com/QwenLM/qwen-code/issues/8097)** 后台 agent 协调缺陷：重复工作、过早完成（10 评论）
   多个后台 Explore subagent 并发时父 agent 重复子任务工作，多 agent 协调的核心痛点。

4. **[#13480](https://github.com/QwenLM/qwen-code/issues/13480)** ⚠️ P1：v0.25.0 WeChat 集成损坏（4 评论）
   扫码配置时 iOS 端报"please upgrade WeChat interface version in OpenClaw"，此前曾在 v0.14.1 修复，疑似回归。**升级用户需注意**。

5. **[#6710](https://github.com/QwenLM/qwen-code/issues/6710)** P1：ACP 无法区分用户取消与进程意外中断（6 评论）
   daemon 重启后 `/session/:id/continue` 两种场景产生相同历史形态，影响会话恢复可靠性。

6. **[#13447](https://github.com/QwenLM/qwen-code/issues/13447)** P1：加载需鉴权的插件仓库时卡死（4 评论）
   Git 凭据输入框无法交互导致启动挂起；#13459 显示修复（`GIT_TERMINAL_PROMPT=0`）已在推进，但失败原因尚需透出。

7. **[#12664](https://github.com/QwenLM/qwen-code/issues/12664)** P1：Shell 模式命令不占用会话忙状态（4 评论）
   `!` 命令执行期间 `streamingState` 仍为 Idle，允许并发模型 turn，存在两条未门控写入路径。

8. **[#13463](https://github.com/QwenLM/qwen-code/issues/13463) / [#13487](https://github.com/QwenLM/qwen-code/issues/13487)** 已取消的 managed-Agent 输入可被重放进后续 Host run（4 评论）
   Web Shell 验收发现的取消语义边界问题，#13487 已完成可达性验证拆分，核心在于 tool-profile 分支。

9. **[#10692](https://github.com/QwenLM/qwen-code/issues/10692)** `<tool_call>` 方言 XML 工具调用泄漏为纯文本（6 评论）
   讽刺的是这是 qwen-code 自己 system prompt 教模型的格式，fallback 却只恢复 invoke 方言。

10. **[#13441](https://github.com/QwenLM/qwen-code/issues/13441)** POSIX Shell 取消后残留忽略 TERM 的子孙进程（4 评论）
    进程组 leader 退出后 descendant 仍在运行，child_process 与 node-pty 两种 transport 均可复现。

---

## 🔧 重要 PR 进展

1. **[#13442](https://github.com/QwenLM/qwen-code/pull/13442)** feat(hooks): PreToolUse hook 可返回 `updatedInput` 完整替换工具输入并全量重校验（终端/无头/ACP 均支持）—— Hooks 生态的重要能力扩展。
2. **[#13488](https://github.com/QwenLM/qwen-code/pull/13488)** feat(web-shell): 取消未产生输出的 prompt 时，内容（文本/图片/附件）自动回填到 composer—— 体验细节优化。
3. **[#13401](https://github.com/QwenLM/qwen-code/pull/13401)** test(managed-agent): 加固虚拟线程 carrier-pinning 见证测试并补齐第三处（#13388 后续）。
4. **[#13243](https://github.com/QwenLM/qwen-code/pull/13243)** fix(cli): 限制 managed function-hook 模块求值范围，保持 hold-fenced owner 可恢复—— 修复 #13129 遗留的两项 Critical 发现。
5. **[#13431](https://github.com/QwenLM/qwen-code/pull/13431)** test(integration): 五个 Hosted driver 共享 Store 代理的 hop-by-hop header 过滤器。
6. **[#9305](https://github.com/QwenLM/qwen-code/pull/9305)** fix(ui): VP 模式短内容底部对齐，消除 composer 上方空白（修 #9300）。
7. **#12331**（已随 v0.25.0 发布）fix(serve): 保留会话创建失败诊断。
8. **#11206**（已随 v0.25.0 发布）本地 workspace-agent 协作，本版本核心特性。
9. **批量 Stale 清理**：#4997、#4681、#3242、#3170、#2993、#2771、#2556、#2554、#2517、#2503、#2502、#2484、#2412、#2404 等十余个历史 PR 被关闭，多为 3-6 月的老旧 PR，社区维护者正在进行仓库清理。

---

## 📈 功能需求趋势

- **Managed Agent / 多 agent 架构**：#12380、#13395、#8097、#13463 —— 毫无疑问的第一主线，覆盖 daemon、session 所有权、K8s 运行时。
- **平台分发（Web Shell / Desktop / Android）**：#13340（计划审批 markdown 渲染）、#13111（Android Phase 2 回归覆盖）。
- **会话管理与取消语义**：#13487、#13463、#6710、#12664 —— 取消/恢复/重放的正确性成为高频议题。
- **Memory 系统改进**：#13458（agentMaxTurns 未生效）、#13465（裸错误 token）、#13178（索引预算重复）、#13280（越界加载 QWEN.md）。
- **Hooks 生态**：#13442（PreToolUse 输入替换）、#13133（idle 所有权决策）。

---

## ⚠️ 开发者关注点

1. **升级 v0.25.0 前检查 WeChat 集成依赖**（#13480，P1 回归）。
2. **取消/中断语义不可靠**是当前最集中的痛点：shell 取消残留进程（#13441）、取消输入被重放（#13463/#13487）、取消与中断不可区分（#6710）。
3. **鉴权插件仓库启动卡死**（#13447）影响需要私有依赖的用户，关注 #13459 的修复进展。
4. **长上下文场景的资源问题**：JSONL 有界读取实际吞整文件（#13485）、compaction 丢弃服务端真实上下文上限（#13432）。
5. **Token 计数显示缺陷**（#13473/#13474）：百万级 token 显示为 `1000k`/`1000.0k`，重度用户会频繁遇到。
6. **错误信息可读性**：内部 stop-reason token 直接暴露给用户（#13465），扩展更新失败原因不透出（#13459）。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*