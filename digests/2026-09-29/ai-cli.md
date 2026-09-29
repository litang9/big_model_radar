# AI CLI 工具社区动态日报 2026-09-29

> 生成时间: 2026-09-29 00:21 UTC | 覆盖工具: 7 个

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
**日期：2026-09-29 · 数据来源：各项目 GitHub 公开动态**

---

## 一、生态全景

AI CLI 工具已进入“功能深化 + 质量攻坚”并行阶段：头部产品（Claude Code、Codex、Gemini CLI）在可扩展性（Mods/Hooks/Subagent）和平台广度（桌面端、移动端、Remote）上激烈竞争，但桌面端/Windows 平台的稳定性债务集中爆发成为共同隐忧。MCP 生态从“能接入”进入“生产级可靠性”攻坚期，认证、重连、凭据安全问题在各社区密集出现。中腰部开源项目（OpenCode、Qwen Code）则通过权限分级、Session 治理、提示词缓存等工程化创新寻求差异化。整体看，行业重心正从模型能力转向 **权限安全、token 成本、多通道分发** 三大基础设施议题。

---

## 二、各工具活跃度对比

| 工具 | 24h Issues 更新 | 24h PR 更新 | Release 情况 | 今日焦点 |
|---|---|---|---|---|
| Claude Code | ~10+ 热点 | 6 | v2.1.284（Sonnet 5.5 + 回归） | eCryptfs 冻结回归、Mods 回滚 |
| OpenAI Codex | 50 | 43 | v0.158.0 正式版 + 4 个 alpha | Windows 26.924 质量危机 |
| Gemini CLI | 50 | 36 | v0.63.0 nightly | Subagent 可靠性、安全 PR 密集 |
| Copilot CLI | ~10 热点 | 0 | v1.0.90-0 + v1.0.89 系列（多补丁） | 认证 400 错误、MCP OAuth 缺陷 |
| OpenCode | ~10 热点 | 10+ | v1.18.33 | 计费信任危机、TUI OOM |
| Qwen Code | ~10 热点 | 10+ | 无（nightly 曾失败） | Managed Agent Stage G、凭据泄露 |
| Kimi Code CLI | 0 | 0 | 无 | — |

**观察**：Codex 与 Gemini CLI 是当日数据量最大的社区；Claude Code 单 Issue 讨论深度最高（#91870 达 223 评论）；Copilot CLI 零 PR 更新暗示闭源交付流程；Kimi Code CLI 近乎静默。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **MCP 可靠性** | Claude Code（#82746 stdio 重连）、Codex（#11489 自动重连、OAuth 预注册落地）、Copilot CLI（OAuth 端口/issuer 不匹配、secret 注入失效）、Qwen Code（Hosted MCP 运行时 #12946） | stdio 死亡恢复、OAuth 兼容、凭据安全注入是全行业未解难题 |
| **权限与安全护栏** | Claude Code（bypassPermissions 回归 #91683）、OpenCode（HITL 五级确认 #51967）、Gemini CLI（破坏性操作防护 #22672、Landlock 类沙箱——Qwen #12278 同步） | 从二元 allow/deny 走向分级确认 + OS 级沙箱 |
| **桌面端/Windows 稳定性** | Codex（26.924 加载卡死、渲染崩溃）、Claude Code（每秒 17 个 git 进程 #94478）、OpenCode（Windows 弹窗风暴 #51887） | 桌面端普遍落后 CLI，Windows 是重灾区 |
| **Token 成本优化** | Qwen Code（非对话上下文重复计费 #12028）、OpenCode（提示词缓存复用 #51960）、Gemini CLI（AST 精准读取 #22745）、Claude Code（Skills 去重 #95340） | 上下文膨胀与缓存命中率成为成本核心变量 |
| **认证/计费透明度** | Copilot CLI（token 停止刷新 #4929）、Codex（周配额对账异常 #42660）、Claude Code（Cloud Credit 卡死 #97160）、OpenCode（支付被拒 #45278） | 四家同时出现付费用户信任问题，值得警惕 |
| **Agent 可扩展性** | Claude Code（Mods #91870）、Gemini CLI（Subagent 体系）、Qwen Code（Managed Agent 多 Stage）、OpenCode（subagent 通信） | Hooks/插件/子代理是下一代架构共识 |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特点 |
|---|---|---|---|
| **Claude Code** | 可扩展性（Mods/Hooks）+ Skills 生态 | 重度专业开发者、企业 | 闭源、官方主导功能讨论（223 评论的 #91870），模型-工具深度绑定（Sonnet 5.5 首发） |
| **Codex** | 多端覆盖（桌面/Android Remote/TUI） | OpenAI 订阅付费用户（Pro 档位细分 100/200/500） | Rust TUI + 移动配对，发布节奏极快（alpha 日更），但质量回归频发 |
| **Gemini CLI** | Subagent 架构 + 安全工程 | 开发者 + CI/无头场景 | 开源、P1 分级修复体系成熟，安全 PR（命令注入、沙箱逃逸）密度最高 |
| **Copilot CLI** | GitHub 生态集成 + 兼容性 | GitHub 存量用户 | 采纳 `.claude/rules` 兼容——向 Claude 生态靠拢的信号；闭源 PR 流程 |
| **OpenCode** | 权限分级 + 成本工程（缓存复用） | 多 provider、开源偏好用户 | 开源、社区驱动（@jlongster 亲自修权限语义），LiteLLM/Bedrock 等多后端适配积极 |
| **Qwen Code** | Session 治理 + 多通道分发 | 国内生态 + serve 模式企业用户 | 最激进的架构演进（Managed Agent 分 Stage 交付）、Email/QQ/WebShell 多入口、Mem0 记忆集成 |

---

## 五、社区热度与成熟度

- **第一梯队（高热 + 成熟）**：Claude Code——Issue 讨论深度和官方参与度最高，但回归频发（2.1.259/280/284 连续三版）显示发布节奏与质量管控失衡。
- **第一梯队（高热 + 快速迭代）**：Codex、Gemini CLI——日更 50 Issue/40+ PR 级别吞吐；Codex 被桌面端质量拖累，Gemini CLI 的 P1 分级 + 安全响应机制最健康。
- **第二梯队（专注迭代）**：OpenCode、Qwen Code——Issue 量小但 PR 工程质量高（缓存优化、Session fencing 等），处于架构投入期，用户侧问题集中在计费/兼容而非功能。
- **第三梯队**：Copilot CLI——有用户基础但零公开 PR、认证问题长期悬置，社区响应明显弱于头部；Kimi Code CLI 静默，活跃度存疑。

---

## 六、值得关注的趋势信号

1. **“扩展性竞赛”取代“模型竞赛”成为差异化主战场**：Claude 的 Mods、Gemini 的 Subagent、Qwen 的 Managed Agent 均指向同一方向——工具正从“单次对话”进化为“可编排的持久 Agent 运行时”。开发者选型时应评估各家的 hooks/插件成熟度而非仅看模型能力。

2. **Windows/桌面端是行业性质量洼地**：三家头部产品同日曝出 Windows 阻断级 bug。若团队主力在 Windows，当前 CLI 版本远比桌面版可靠，建议延迟采纳桌面端新版本。

3. **MCP 进入“生产化阵痛期”**：OAuth 兼容、secret 注入、进程生命周期、自动重连四类问题在 4 个社区同时出现。生产环境接入 MCP 前需自建健康检查与降级方案，不能依赖客户端原生可靠性。

4. **Token 经济性成为可量化的选型指标**：非对话上下文重复计费（Qwen #12028）、Skills 重复附加（Claude #95340）、缓存前缀失效（OpenCode #51960）提示重度用户：相同模型在不同 CLI 上的实际成本可能差异数倍，建议实测每轮 token 开销。

5. **付费用户信任是共同软肋**：四家同日出现计费/配额/认证类投诉。企业采购时应关注 SLA 与本地凭证刷新机制（如 Copilot #4929 的“重启才能恢复”在长时 CI 场景是硬伤）。

6. **生态兼容正在形成**：Copilot CLI 支持 `.claude/rules` 是重要信号——Claude Code 的规则/Skills 格式可能成为事实标准，早期投资该格式的团队将获得跨工具可移植性。

---

*本报告基于 2026-09-29 单日公开数据，短期波动可能影响结论稳健性；建议结合多周趋势持续观察。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据范围**：anthropics/skills 仓库（数据截止 2026-09-29）

---

## 一、热门 Skills 排行（按讨论/更新活跃度）

| # | Skill | 功能 | 讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 隔离 trigger 评测、修复 Windows 兼容及运行时失败误判 | Skill 触发评测误报问题，社区长期关注（对应 Issue #1383、#556） | OPEN |
| 2 | **mcp-builder 修复** ([#1742](https://github.com/anthropics/skills/pull/1742)) | 适配 mcp>=2 的 `streamable_http_client` 重命名及自定义 Header | 修复 #1668；配合 Issue #1390（评测全 0 分）的讨论 | OPEN |
| 3 | **proofcore-contract-auditor** ([#1771](https://github.com/anthropics/skills/pull/1771)) | Solidity/Rust 合约静态分析 + TON 链上审计证明锚定 | Web3 场景，涉及第三方商业协议，需安全审查 | OPEN |
| 4 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Markdown 一键编译为带人声配音的 MP4 视频（Marp + TTS） | 零成本内容创作方向，关注度较高 | OPEN |
| 5 | **docx 孤立评论检测** ([#1734](https://github.com/anthropics/skills/pull/1734)) | 检测 Word 文档中失去锚点的评论 | docx Skill 的 OOXML 细节修复系列（同 #541、#1792） | OPEN |
| 6 | **pyxel 复古游戏开发** ([#525](https://github.com/anthropics/skills/pull/525)) | Python 复古游戏的实现、调试、帧级验证 | 作者为 Pyxel 作者本人，长期挂起（3 月至今） | OPEN |
| 7 | **AWT AI E2E 测试** ([#822](https://github.com/anthropics/skills/pull/822)) | 零代码 AI 视觉浏览器自动化 E2E 测试 | 测试自动化需求旺盛，跨半年仍活跃更新 | OPEN |
| 8 | **document-typography** ([#514](https://github.com/anthropics/skills/pull/514)) | AI 生成文档的排版质量控制（孤行、孤词、编号对齐） | 切中 AI 生成文档的普遍痛点 | OPEN |

---

## 二、社区需求趋势

1. **安全与信任机制**（最高热度）：社区 Skill 冒充 `anthropic/` 命名空间引发信任边界滥用（[#492](https://github.com/anthropics/skills/issues/492)，43 评论）；XSS 漏洞（[#1394](https://github.com/anthropics/skills/issues/1394)）、SharePoint 权限设计（[#1175](https://github.com/anthropics/skills/issues/1175)）。
2. **企业级分发与共享**：组织内 Skill 共享库（[#228](https://github.com/anthropics/skills/issues/228)）、插件内容重复（[#189](https://github.com/anthropics/skills/issues/189)）。
3. **Skill 元工具/质量工程**：trigger 评测可靠性（[#556](https://github.com/anthropics/skills/issues/556)、[#1383](https://github.com/anthropics/skills/issues/1383)）、skill-quality-analyzer（[#83](https://github.com/anthropics/skills/pull/83)）、推理质量门禁流水线（[#1385](https://github.com/anthropics/skills/issues/1385)）。
4. **上下文效率**：claude-api Skill 单次注入 ~156k token 撑爆窗口（[#1487](https://github.com/anthropics/skills/issues/1487)）、compact-memory 紧凑记忆符号（[#1329](https://github.com/anthropics/skills/issues/1329)）。
5. **测试自动化**：testing-patterns（[#723](https://github.com/anthropics/skills/pull/723)）、AWT（#822）。
6. **运维安全**：blast-radius 批量破坏性操作检查清单（[#1776](https://github.com/anthropics/skills/pull/1776)）、HPC/Slurm 集群操作（[#1615](https://github.com/anthropics/skills/pull/1615)）。

---

## 三、高潜力待合并 Skills

近期（9 月）仍持续更新、问题明确、修复性质的 PR 最可能近期落地：

- **[#1792](https://github.com/anthropics/skills/pull/1792)** docx：LibreOffice 超时报错 + 输出校验（9/25 更新）
- **[#1742](https://github.com/anthropics/skills/pull/1742)** mcp-builder：mcp>=2 兼容（9/27 更新，修复指定 Issue）
- **[#1681](https://github.com/anthropics/skills/pull/1681)** skill-creator：package_skill.py 直执修复（9/27 更新）
- **[#1298](https://github.com/anthropics/skills/pull/1298)** skill-creator：trigger evals 系统性修复（长期活跃，对应多个高热 Issue）
- **[#1607](https://github.com/anthropics/skills/pull/1607)** claude-api：退役模型 ID 标记（9/28 更新，文档类低风险）

⚠️ 注意：如 #1771（TON 链上锚定）、#1776 等涉及外部服务/商业协议的新 Skill，合并阻力较大。

---

## 四、生态洞察

**当前社区最集中的诉求是：让 Skills 生态变得"可信、可评测、可分发"**——即建立官方/社区的信任边界（命名空间与安全审计）、提供可靠的 Skill 触发与质量评测工具链、支持企业级组织内共享，而非单纯追求新功能数量；官方核心 Skill（skill-creator、docx、mcp-builder、claude-api）的质量与上下文效率问题构成了当前最多的讨论热点。

---

# Claude Code 社区动态日报 · 2026-09-29

## 1. 今日速览

Claude Code 发布 **v2.1.284**，正式引入 **Claude Sonnet 5.5**（1M 上下文，$2/$10 per Mtok，缓存读取 $0.20/Mtok）并成为 API 默认 Sonnet 模型。但新版本接连曝出回归问题：Linux eCryptfs 环境下首次回车即冻结、git worktree 信任修复未生效等。同时官方对 Mods 可扩展性系统（#91870）进行了 PR 回滚调整，显示该功能仍在快速迭代中。

---

## 2. 版本发布

### v2.1.284
- 新增 **Claude Sonnet 5.5**（`claude-sonnet-5-5`），现为 Anthropic API 默认 Sonnet 模型，1M 上下文，定价 $2/$10 per Mtok，缓存读取 $0.20/Mtok
- auto 模式在工作目录外读取前的确认提示新增 **"Yes, but ask again next time"** 选项
- ⚠️ 注意：已有用户报告该版本在 eCryptfs 环境下存在严重冻结问题（见下文 #98023）

---

## 3. 社区热点 Issues

**1. [#91870](https://github.com/anthropics/claude-code/issues/91870) — Mods：让 Claude 可扩展性提升 10 倍**
官方主导的重量级功能讨论，223 条评论、128 👍。官方承诺“数周内”交付 function hooks，是社区参与度最高的议题。今日相关 PR #98018 回滚了两个 mods 变更，显示仍在打磨中。

**2. [#98023](https://github.com/anthropics/claude-code/issues/98023) — v2.1.284 在 eCryptfs 环境首次回车即冻结（回归）**
主线程从 `/` 递归遍历 `/home/.ecryptfs`，RSS 涨至 3+ GB，Ctrl-C/SIGTERM 均无效，仅 2.1.280 正常。**新版本关键阻断性回归**，Linux 用户升级需谨慎。

**9. [#91683](https://github.com/anthropics/claude-code/issues/91683) — bypassPermissions 模式在配置 Read() deny 规则后仍弹确认（回归）**
2.1.259 引入的回归，`cd DIR && grep …` 组合命令绕过了 bypassPermissions 语义。跨 Windows/macOS，涉及权限模型核心，27 👍。

**3. [#20697](https://github.com/anthropics/claude-code/issues/20697) — Skills 在 Claude Desktop 与 CLI 间同步**
157 👍 的高票需求，用户希望 Skills 跨端一致，持续活跃中。

**4. [#94478](https://github.com/anthropics/claude-code/issues/94478) — Windows 桌面端每秒生成约 17 个 git 进程，内核池泄漏放大至每天 6 GB**
约 200 万个/天的短命进程，既是资源浪费也放大系统级内存泄漏，桌面端性能顽疾。

**5. [#95340](https://github.com/anthropics/claude-code/issues/95340) — Skill 去重以渲染后内容为键，仅改参数也会重复附加 SKILL.md**
组合式 Skills 使用成本随调用次数线性增长（N × body），影响 Skills 生态的成本效率。

**6. [#94265](https://github.com/anthropics/claude-code/issues/94265) — `.claude/worktrees/` 之外的 worktree 每次切换都要确认一次**
与 #97991 呼应，worktree 权限/信任体验仍是高频痛点。

**7. [#97991](https://github.com/anthropics/claude-code/issues/97991) — 已信任仓库的 git worktree 在 2.1.284 上仍重复提示"Workspace not trusted"**
与维护者 @bcherny 此前宣布的修复行为不符，文档承诺与实际不符，影响可信度。

**8. [#31724](https://github.com/anthropics/claude-code/issues/31724) — `/voice` 模式缺语言配置项**
50 👍，语音转写默认英文，非英语（如乌克兰语）体验差；关联已关闭的桌面端听写同类问题 #78682，本地化语音需求明确。

**9. [#82746](https://github.com/anthropics/claude-code/issues/82746) — stdio MCP 服务器挂掉后无会话内恢复手段**
HTTP/SSE 已支持自动重连，stdio 服务器死亡后只能重启 Claude Code，请求 `claude mcp reconnect` 命令。

**10. [#97160](https://github.com/anthropics/claude-code/issues/97160) — Cloud 环境用量达 100% 后即使有 Cloud Credit 也卡死**
Web 端计费/配额逻辑问题，直接影响付费用户可用性。

---

## 4. 重要 PR 进展

**1. [#98018](https://github.com/anthropics/claude-code/pull/98018)（CLOSED）— mods：回滚两项变更**
回滚 #96363（diff --no-color）和 #96364（agents-md 分页读取），agents-md 与 diff mods 恢复早期行为。Mods 体系尚在试验期，行为仍在回调。

**2. [#96364](https://github.com/anthropics/claude-code/pull/96364)（CLOSED）— agents-md：自动分页 Read 嵌套 AGENTS.md 不再算作已交付**
原改动针对超过 token 上限被分页的全文件读取，现随 #98018 一并回滚。

**3. [#96363](https://github.com/anthropics/claude-code/pull/96363)（CLOSED）— diff：传 `--no-color` 防止 git 强制配色清空 diff 内容**
解决 `color.ui=always` 配置下 diff 面板空白的问题，同样被回滚待重做。

**4. [#94847](https://github.com/anthropics/claude-code/pull/94847)（OPEN）— diff：首次编辑仅在确有文件可列时才打开面板**
修复对仓库外/被忽略文件写入时弹出空 diff 面板的问题，by @bcherny。

**5. [#97952](https://github.com/anthropics/claude-code/pull/97952)（OPEN）— CI 安全加固：为调用 Claude 的 GitHub Actions 工作流加防护**
对 issue 分类、去重等三个 Claude 工作流实施出站防火墙 runner 等加固，社区贡献的安全改进。

**6. [#31204](https://github.com/anthropics/claude-code/pull/31204)（CLOSED）— AI 学习路线图 Canvas 应用**
与产品无关的社区 PR，已被关闭。

*（过去 24 小时仅 6 个 PR 更新，其余无重大进展）*

---

## 5. 功能需求趋势

- **可扩展性（Mods/Plugins/Hooks）**：#91870 一骑绝尘，function hooks 即将落地，是当前最大功能主线
- **Skills 生态成熟化**：跨端同步（#20697）、去重修复（#95340）、用户级 Skills 在 Desktop 可用（#80407）
- **Worktree / 多目录工作流**：信任继承（#97991）、切换确认（#94265）集中爆发
- **国际化/本地化**：语音语言设置（#31724）、Windows 数据目录重定位（#57998）
- **MCP 可靠性**：stdio 自动重连（#82746）、长响应 SSE 解析失败（#97987）
- **CLI 人体工学**：Bash tab 补全（#91120）、Focus View 全量生效（#98026）

---

## 6. 开发者关注点

1. **版本回归频发**：2.1.259（权限）、2.1.280+（SIGILL 无 AVX CPU）、2.1.284（eCryptfs 冻结、worktree 信任），升级前建议查看 issue tracker
2. **权限模型一致性**：bypassPermissions 与 deny 规则冲突、worktree 反复确认——权限体验是近期最密集的抱怨来源
3. **桌面端资源占用**：Windows 上每秒 17 个 git 进程、孤儿 runner 进程（#78668），桌面端稳定性落后 CLI
4. **模型行为可靠性**：#98025 报告模型绕过“未经确认不改生产环境”规则、#98024 报告异常拒答，提示工程/记忆约束的执行力度仍受质疑
5. **配额与计费透明度**：Cloud Credit 与用量限制不联动（#97160）影响付费用户信任

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 · 2026-09-29

## 一、今日速览

Codex CLI 正式版 **v0.158.0** 发布，带来 TUI 复制/粘贴增强与 OAuth 预注册 MCP 服务器支持；同时 0.159/0.160 多个 alpha 版本持续迭代。社区方面，**Windows 桌面端 26.924 更新引发大量回归问题**（加载卡死、渲染器崩溃、项目列表丢失），成为今日最集中的投诉方向；此外 TUI 复制/粘贴回归和 Android Remote 配对失败也是高频话题。

---

## 二、版本发布

### rust-v0.158.0（正式版）
- 全屏 TUI 支持配置**选中即复制与右键粘贴**，复制的会话内容保留 Markdown 格式（#47639, #47896, #48118）
- 支持连接**需要预注册 OAuth client secret 的 MCP 服务器**，包括通过 `codex mcp add --oauth-client` 方式

### Alpha 版本
- rust-v0.160.0-alpha.2 / 0.159.0-alpha.13 / 0.159.0-alpha.12 / 0.158.0-alpha.15.4：常规迭代发布

---

## 三、社区热点 Issues

| # | Issue | 关注点 |
|---|-------|--------|
| 1 | [#48417](https://github.com/openai/codex/issues/48417) 🔒 | **Linux 桌面端 26.924.22138 每次提示都挂起**，回退 26.901.41600 后恢复。已关闭但反映 26.924 版本存在严重回归 |
| 2 | [#48522](https://github.com/openai/codex/issues/48522) | Windows 桌面端**无限加载转圈**，`app://-/index.html` 路由永不解析，浏览器版正常 |
| 3 | [#48938](https://github.com/openai/codex/issues/48938) | Windows 26.924.2738.0 **渲染器反复崩溃、白屏重载、严重输入延迟**；Pro 20x 付费用户强烈不满 |
| 4 | [#42739](https://github.com/openai/codex/issues/42739) | Windows 桌面更新后**侧边栏本地项目全部消失**（34 条评论），磁盘文件仍在但 UI 丢失 |
| 5 | [#48125](https://github.com/openai/codex/issues/48125) | TUI **无法复制文本**回归（0.157 引入），SSH 远程场景下尤其影响工作流，17 👍 |
| 6 | [#27117](https://github.com/openai/codex/issues/27117) | 长期未修：pwsh 启动的独立更新继承 `PSModulePath` 导致 `Get-FileHash` 失败，39 条评论、28 👍 |
| 7 | [#46114](https://github.com/openai/codex/issues/46114) | Windows 桌面**沙箱初始化全面失败**（"requires effective :root read access"），重置/修复均无效 |
| 8 | [#36268](https://github.com/openai/codex/issues/36268) | Android "Authorize this phone" **配对死循环**，Web 授权完成但应用无法消费，与 [#35855](https://github.com/openai/codex/issues/35855)、[#48777](https://github.com/openai/codex/issues/48777) 同属 Remote 配对故障群 |
| 9 | [#48991](https://github.com/openai/codex/issues/48991) | 用户请求**可关闭 TUI 启动欢迎语**（"Speak, friend, and enter a prompt"），引发对产品文案噪声的讨论 |
| 10 | [#42660](https://github.com/openai/codex/issues/42660) 🔒 | **周配额重置/对账疑似异常**，无本地活动却显示配额耗尽，影响付费转化决策 |

---

## 四、重要 PR 进展

1. [#49106](https://github.com/openai/codex/pull/49106) — Agent 命令中心增加**历史分页**，“Show more" 可加载更多历史会话
2. [#49105](https://github.com/openai/codex/pull/49105) — **重连后恢复未发送的 TUI 输入**，区分未发送与未确认消息
3. [#49098](https://github.com/openai/codex/pull/49098) — **修复 exec server 上 Windows 沙箱 PowerShell 回退解析**，直接关联 #27117 等 Windows 沙箱问题
4. [#49067](https://github.com/openai/codex/pull/49067) — **Windows 沙箱策略事件中剔除配置值**，防止凭据泄漏到持久化事件日志
5. [#49069](https://github.com/openai/codex/pull/49069) — **后台增量回收 SQLite 日志数据库空闲页**，缓解磁盘膨胀（关联 #43158 类问题）
6. [#49084](https://github.com/openai/codex/pull/49084) — app-server **增量追踪运行中的 turns**，消除状态锁下的全量扫描，提升性能
7. [#49075](https://github.com/openai/codex/pull/49075) — 修复**生成 subagent 时丢失 pending environment** 的问题
8. [#49082](https://github.com/openai/codex/pull/49082) — Guardian diff 路径**跳过远程 Git discovery**，避免离线执行器阻塞审批重校验
9. [#49079](https://github.com/openai/codex/pull/49079) — 统一 TUI 订阅标签，Pro 档位更名为 **Pro 100/200/500**——暗示订阅档位调整
10. [#49073](https://github.com/openai/codex/pull/49073) — **TUI 中显式展示实时语音目录加载失败**，不再静默回退内置目录

---

## 五、功能需求趋势

- **TUI 交互体验**：复制/粘贴、滚动、输入恢复是近期最密集的反馈（#48125、#48127、#48024），0.158 的 copy-on-select 更新正是回应
- **Windows 平台稳定性**：26.924 桌面版回归集中爆发（加载、渲染、沙箱、项目列表），Windows-os 已成为最重的 issue 标签
- **Remote / 移动配对**：Android + Windows/WSL 的 Remote Control 配对失败形成问题群（#36268、#35855、#48774、#48777）
- **MCP 生态**：OAuth 预注册客户端支持落地；社区持续要求 **MCP 自动重连**（#11489，8👍）
- **可配置性/降噪**：用户希望减少营销性文案与推广提示（#48991），追求工具的克制感

---

## 六、开发者关注点

1. **Windows 桌面 26.924 版本质量危机**：多个独立 issue 指向同一版本批次的加载卡死与崩溃，付费 Pro 用户情绪激烈（#48938），需要官方统一回应
2. **沙箱策略误报**：Windows 上 "blocked by policy" 缺乏可操作诊断（#46012）、execpolicy 误报（#40060）长期困扰用户
3. **配额透明度**：周配额对账异常（#42660）直接影响 Plus → Pro 升级决策
4. **资源占用**：大仓库下 git add/diff worker CPU 飙升（#30477）、macOS diff SIGKILL 残留 Git 对象导致磁盘耗尽（#43158）
5. **回归测试缺口**：0.157/0.158 连续引入复制粘贴回归，Linux/Wayland（Konsole）场景缺乏覆盖

---
*数据来源：github.com/openai/codex · 统计窗口：过去 24 小时（50 Issues / 43 PRs 更新）*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-09-29** | 数据来源：github.com/google-gemini/gemini-cli

---

## 📌 今日速览

今日社区焦点集中在 **Subagent 可靠性**与**非交互/无头模式稳定性**两大方向：Subagent 挂起、结果误报成功等核心问题持续升温，而多项 P1 级 PR 正在修复认证死循环、文件写入竞态等关键缺陷。同时发布了 v0.63.0 nightly 版本，安全类 PR（沙箱逃逸、命令注入防护）也值得关注。

---

## 🚀 版本发布

**v0.63.0-nightly.20260928.g2fe7c2d3f**（夜间构建，自动化版本升级）
- Full Changelog: https://github.com/google-gemini/gemini-cli/compare/v0.63.0-nightly.20260926.g2fe7c2d3f...v0.63.0-nightly.20260928.g2fe7c2d3f

---

## 🔥 社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** Subagent 达到 MAX_TURNS 后误报 "GOAL success"
   P1 级 Bug。子代理在未完成任何分析前就因轮次上限中断，却报告成功，掩盖了真实失败。误导性强，13 条评论，等待复测。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** Generalist agent 无限挂起
   P1 级，8 👍。委托给通用 agent 后简单操作（如建目录）也永久挂起，用户等待一小时以上。禁用子代理可绕过。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** 零依赖 OS 沙箱 + 执行后意图路由
   大型增强提案：利用 Gemini 3 原生 bash 能力（grep/cat/sed/awk 链式操作），同时保障安全性。9 条评论，方向性讨论热烈。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** AST 感知文件读取/搜索/代码库映射 EPIC
   调研用 AST 工具精确读取方法边界，减少无效读取轮次与 token 噪声，可显著改进 `codebase_investigator`。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** 模型不主动使用 Skills 与子代理
   自定义 skill（gradle/git 等）只有在显式指令下才被调用，影响自动化体验。6 条评论，用户共鸣较强。

6. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** Browser subagent 在 Wayland 下失败
   P1 级，Linux Wayland 环境浏览器代理直接失败，影响 Linux 开发者工作流。

7. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** 超过 128 个工具触发 400 错误
   工具数量过多时 API 报错，期望 agent 智能裁剪工具范围。对重度扩展用户影响大。

8. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** Browser Agent 忽略 settings.json 覆盖配置
   `AgentRegistry` 正确读取了配置，但 Browser Agent 未生效（如 maxTurns），配置链路存在断裂。

9. **[#23571](https://github.com/google-gemni/gemini-cli/issues/23571)** 模型在随机位置创建临时脚本
   限制 shell 执行后模型生成大量散落编辑脚本，工作区清理成本高，影响提交整洁性。

10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)** Agent 应阻止/抑制破坏性操作
    复杂 git 操作中模型偶尔使用 `git reset`、`--force` 等危险命令，需要更安全的行为护栏。

---

## 🔧 重要 PR 进展

1. **[#29539](https://github.com/google-gemini/gemini-cli/pull/29539)** 非交互模式下支持自主计划执行（P1）
   Plan Mode 在 headless 环境跳过用户确认，直接起草并执行计划。

2. **[#29448](https://github.com/google-gemini/gemini-cli/pull/29448)**（已关闭）修复无限认证循环（P1）
   解决 Windows/WSL/headless 下的文件争用、keyring 不可用导致的死循环（#28341）。

3. **[#29499](https://github.com/google-gemini/gemini-cli/pull/29499)** 文件工具操作串行化 + 原子写入（P1）
   修复并行子代理同时操作同一文件时的静默丢失更新与 diff 不准确问题。

4. **[#29492](https://github.com/google-gemini/gemini-cli/pull/29492)** 沙箱构建与网络设置移除 shell 插值
   安全修复：checkout 路径含 shell 元字符时可导致命令注入。

5. **[#29536](https://github.com/google-gemini/gemini-cli/pull/29536)** grep 模式注入防护（CWE-88）
   通过显式 `-e` 分隔符防止搜索模式被解析为命令行选项。

6. **[#29542](https://github.com/google-gemini/gemini-cli/pull/29542)** `formatTruncatedToolOutput` 边界修复（P1）
   `maxChars <= 0` 时禁用截断，防止索引切片导致输出异常膨胀。

7. **[#29528](https://github.com/google-gemini/gemini-cli/pull/29528)** headless 模式文件夹信任状态传播（P1）
   修复 hook 与历史日志的“脑裂”状态——未信任工作区被误报为已信任。

8. **[#29457](https://github.com/google-gemini/gemini-cli/pull/29457)** read-many-files 上下文膨胀修复（P1）
   用 glob 匹配替换模糊子串匹配，避免二进制资源被误判为“显式请求”而注入上下文。

9. **[#29476](https://github.com/google-gemini/gemini-cli/pull/29476)** 修复交互模式 Enter 按键无响应（P1）
   解决 IDE 集成终端中工具确认提示按键失效的挂起问题（#23297）。

10. **[#29535](https://github.com/google-gemini/gemini-cli/pull/29535)** 尊重 allowed onboarding tier（企业）
    修复有效个人/免费账户被误判“无有效许可证”的问题（#29529）。

---

## 📈 功能需求趋势

- **Subagent 体系深化**：AST 感知代码导航（#22745/22746/22747）、并行子代理协作与共享内存（#18287）、子代理轨迹可视化（#22598）、本地子代理 Sprint（#20195）
- **安全与沙箱**：OS 级零依赖沙箱（#19873）、破坏性操作防护（#22672）
- **Token 效率**："Tactful Extraction" 外科式读取（#19561，当前基线约 36.6k tokens/turn）、持久化文件任务追踪替代 WriteToDo（#18836/#21000）
- **浏览器自动化**：Wayland 支持（#21983）、会话接管与锁恢复（#22232）、配置覆盖生效（#22267）
- **终端渲染性能**：resize 时无闪烁渲染（#21924）

---

## ⚠️ 开发者关注点

1. **可靠性是最大痛点**：子代理挂起（#21409）、误报成功（#22323）、交互卡死（#29476）等问题直接阻断工作流。
2. **无头/CI 环境支持不足**：认证死循环（#29448）、信任状态异常（#29528）、Plan Mode 无法自主执行（#29539）正在集中修复。
3. **Windows 体验短板**：扩展更新的文件锁问题（#29540）、认证与终端兼容性问题频发。
4. **配置与可观测性**：settings.json 覆盖不生效（#22267）、bug 报告缺少子代理上下文（#21763），排障成本高。
5. **上下文成本**：无效文件读取导致的 token 膨胀（#29457）引发对 token 经济性的持续关注。

---
*本报告基于过去 24 小时 GitHub 公开数据自动生成，共追踪 50 条 Issue 与 36 条 PR 更新。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-09-29** | 数据来源：github.com/github/copilot-cli

---

## 一、今日速览

过去24小时内 Copilot CLI 连发多个补丁版本（v1.0.90-0 及 v1.0.89 系列），重点修复 PR 模板遵循、索引搜索阈值配置等体验问题。认证类问题成为社区最大痛点：CLI 持续 400 错误（#1274，29条评论）与进程级 token 失效（#4929）仍在发酵。MCP 生态相关问题集中爆发，OAuth 重定向、secret 注入等多条新 Issue 值得关注。

---

## 二、版本发布

- **v1.0.90-0**（最新）：修复与变更
- **v1.0.89**（2026-09-28）：
  - 左键点击 `ask_user` / elicitation 表单输入框可直接聚焦并将光标置于点击位置
  - 支持将 `.claude/rules` 下的 Claude Code 规则文件作为自定义指令
  - 侧边栏会话在完成一个你尚未打开的 turn 后显示蓝点提示
- **v1.0.89-6 / -7**：
  - **改进**：PR 创建现在遵循仓库 PR 模板，保留必需章节与 checklist 结构；可通过 `TGREP_FILE_COUNT_THRESHOLD` 配置索引搜索自动激活阈值
  - **修复**：Shell 输出不再显示尾部命令完成元数据；Timeline 相关修复

---

## 三、社区热点 Issues

1. **[#1274](https://github.com/github/copilot-cli/issues/1274)** CLI 频繁返回 400 invalid request body（OPEN，29评论 / 12👍）
   大量代码审查请求失败，疑似服务端校验或客户端请求构造问题，是当前最活跃的 Issue，官方尚未给出结论。

2. **[#4929](https://github.com/github/copilot-cli/issues/4929)** 长时运行进程认证 token 停止刷新（OPEN，13评论）
   所有 prompt 失败且 `/login` 无法恢复，只能重启进程。影响重度用户的核心工作流。

3. **[#4971](https://github.com/github/copilot-cli/issues/4971)** 每小时出现一次 Authorization error（OPEN）
   与 #4929 症状相似，指向 token 刷新机制存在系统性缺陷。

4. **[#4606](https://github.com/github/copilot-cli/issues/4606)** Google Workspace MCP OAuth 因 issuer 尾斜杠不匹配失败（OPEN）
   Google 官方 MCP 端点因元数据校验严格而被拒，跨厂商兼容性问题。

5. **[#4968](https://github.com/github/copilot-cli/issues/4968)** OAuth redirect URI 端口不匹配破坏多数 MCP 服务器登录（OPEN）
   CIMD 声明固定端口但运行时绑定临时端口，影响面广，属 MCP 接入的关键阻断问题。

6. **[#4985](https://github.com/github/copilot-cli/issues/4985)** MCP server 的 `${secret:...}` 占位符未传递给子进程（OPEN，今日新增）
   密钥管理机制在 stdio MCP 场景失效，涉及安全性。

7. **[#4983](https://github.com/github/copilot-cli/issues/4983)** 慢 initialize 的远程 MCP（Miro）连接超时（今日关闭）
   VS Code 可用但 CLI 失败，揭示 CLI 的 MCP 发现超时策略过严。

8. **[#4972](https://github.com/github/copilot-cli/issues/4972)** Windows 下通过 wrapper 启动时 MCP worker 进程残留（OPEN）
   进程生命周期管理缺陷，可能导致资源泄漏。

9. **[#3392](https://github.com/github/copilot-cli/issues/3392)** NixOS 上 bash 工具自 v1.0.49 起损坏（CLOSED，13👍）
   非主流发行版兼容性问题的代表，长期困扰 Nix 用户后终于关闭。

10. **[#2958](https://github.com/github/copilot-cli/issues/2958)** 支持 plan mode / autopilot 分别配置默认模型（CLOSED，16👍）
    高票功能需求被采纳关闭，社区对细粒度模型配置呼声很高。

---

## 四、重要 PR 进展

过去24小时内无活跃 PR 更新（0条），本期从略。新版本以补丁发布形式交付，推测改动未通过公开 PR 流转。

---

## 五、功能需求趋势

- **MCP 生态成熟度**：认证（OAuth issuer/端口）、secret 注入、进程生命周期、超时策略——MCP 接入是当前问题最密集的领域
- **认证稳定性**：token 自动刷新、进程级凭证管理是最高频抱怨
- **模型配置细粒度化**：per-mode 默认模型、agent frontmatter 数组 `model:` 字段等需求陆续被满足
- **自定义指令兼容**：v1.0.89 采纳 `.claude/rules` 支持，显示向 Claude Code 生态兼容靠拢的趋势
- **输入/编辑体验**：`ask_user` 长文本编辑器支持（#4050）、多行粘贴（#2997）等交互细节持续打磨
- **平台兼容性**：NixOS、Windows（CACert、Bracketed Paste）等长尾平台问题逐步清偿

---

## 六、开发者关注点

1. **认证可靠性是第一痛点**：#1274、#4929、#4971 三条高热 Issue 均指向认证/请求层，用户对“重启才能恢复”容忍度低。
2. **MCP 集成碎片化**：多个 OAuth 与进程管理缺陷叠加，说明 MCP 支持进入实际生产环境后暴露大量边缘案例。
3. **样式指令遵从度**：#4986（忽略 no-em-dash 指令）反映用户对自定义指令执行一致性的不满。
4. **企业/非 GitHub 场景支持不足**：#2813（enterprise /remote URL 404）、#3378（非 GitHub 仓库 /memory 链接 404）显示混合生态用户被忽视。
5. **供应链安全**：#4442（adm-zip CVE）提醒使用方关注二进制内嵌依赖的漏洞扫描与升级节奏。

---
*本日报基于 GitHub 公开数据自动整理，仅供参考。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-09-29

## 一、今日速览

OpenCode 发布 **v1.18.33**，修复了 Cloudflare AI Gateway 超时、MCP 浏览器启动报错及调试信息泄露凭证等问题。社区方面，订阅支付与配额类问题持续发酵（#45278 支付被拒已积累 29 条评论），V2 版本的稳定性问题（TUI OOM、Windows 弹窗风暴）引发关注。PR 方面活跃度集中在提示词缓存复用优化（#51960）和 human-in-the-loop 权限分级新特性（#51967）。

---

## 二、版本发布

### v1.18.33
- Cloudflare AI Gateway 模型现可正确遵循 provider 的响应与流式超时设置（@danlapid）
- MCP 浏览器启动器立即退出时，启动失败信息现在能被正确上报
- Debug 配置输出现在会对凭证和敏感 Header 做脱敏处理
- Gemini thinking 相关修复（截断）

---

## 三、社区热点 Issues

| # | 标题 | 关注理由 |
|---|------|---------|
| [#45278](https://github.com/anomalyco/opencode/issues/45278) | 支付方式使用 3 个月后突然被拒 | 评论最多（29 条），银行确认无问题，指向计费系统侧问题 |
| [#42421](https://github.com/anomalyco/opencode/issues/42421) | V2 缺失 todowrite/todoread 工具（已关闭） | V2 迁移核心回归，模型无法维护 TODO 列表 |
| [#50236](https://github.com/anomalyco/opencode/issues/50236) | 2.0.4 起 acp session/new 忽略用户配置 | 影响 Zed 等 ACP 客户端，自定义 provider/agent 全部丢失 |
| [#42938](https://github.com/anomalyco/opencode/issues/42938) | Go 套餐用满后不用 Zen 余额，封锁 12 小时 | 文档与实际行为不符，影响付费用户核心权益 |
| [#41206](https://github.com/anomalyco/opencode/issues/41206) | Go 配额与用量历史不匹配 | 配额透明度问题，多篇类似报告 |
| [#42225](https://github.com/anomalyco/opencode/issues/42225) | TUI 终端缩小时不重排布局 | 长期未修的终端兼容性问题 |
| [#51887](https://github.com/anomalyco/opencode/issues/51887) | Windows 上 CLI 无限弹窗抢焦点 | 新报高严重性，几乎不可用 |
| [#51761](https://github.com/anomalyco/opencode/issues/51761) | TUI OOM：间歇性吃掉 24-28GB 内存 | 500MB/s-1GB/s 线性增长且无 GC，V2 稳定性警报 |
| [#51779](https://github.com/anomalyco/opencode/issues/51779) | Zen 余额充足仍报 Account budget exceeded（已关闭） | 429 上游错误持续超 24 小时 |
| [#51224](https://github.com/anomalyco/opencode/issues/51224) | 并行 Code Mode 同工具权限请求互相孤立 | 权限系统并发缺陷，第二次请求永久挂起 |

---

## 四、重要 PR 进展

| # | 标题 | 内容 |
|---|------|------|
| [#51960](https://github.com/anomalyco/opencode/pull/51960) | 会话级数据移出共享 instructions 前缀 | session ID 导致缓存失效，修复后兄弟 subagent 可跨会话复用提示词缓存——显著降成本提速 |
| [#51967](https://github.com/anomalyco/opencode/pull/51967) | human-in-the-loop 确认分级 | 新增 AUTO/SAFE/BALANCED/STRICT/CUSTOM 五级确认策略，叠加于现有权限系统之上 |
| [#51968](https://github.com/anomalyco/opencode/pull/51968) | CLI 拒绝权限后继续运行 | `opencode run` 拒绝权限时附带反馈，模型可作出反应而非直接中断（核心维护者 @jlongster） |
| [#51969](https://github.com/anomalyco/opencode/pull/51969) | 修复 LLM bash 工具 WASM 加载错误 | 统一 `web-tree-sitter` 导入来源，避免模块状态不一致 |
| [#51962](https://github.com/anomalyco/opencode/pull/51962) | 输出 token 上限封顶 256k（已合并） | 防止 Kimi K2.6 等模型把整个上下文窗口当输出上限请求 |
| [#51957](https://github.com/anomalyco/opencode/pull/51957) | 捕获 LiteLLM 成本 Header | 修复 LiteLLM 代理下回合成本记录为 $0 的问题 |
| [#51953](https://github.com/anomalyco/opencode/pull/51953) | 重放出错回合时保留 thinking blocks | 修复 Anthropic reasoning 状态丢失导致重放失败 |
| [#51959](https://github.com/anomalyco/opencode/pull/51959) | Bedrock Claude 默认绑定 thinking blocks | 适配 Claude 5.1+ 的 thinking 签名绑定机制 |
| [#51911](https://github.com/anomalyco/opencode/pull/51911) | env block 暴露运行版本/provider/模型 | 常见 AGENTS.md 需求，让 agent 知道自己的运行环境 |
| [#51895](https://github.com/anomalyco/opencode/pull/51895) | Copilot 对 github.com 使用公共 host | 修复 OAuth 账号 `enterpriseUrl: "github.com"` 被误判为企业版 |

---

## 五、功能需求趋势

1. **V2 迁移兼容性**：环境变量（#36990）、TODO 工具（#42421）、`home_logo` 插件槽（#51916）、`setCacheKey`（#51956）——V1 功能在 V2 中的等价物是最高频诉求
2. **Subagent 架构增强**：兄弟 agent 通信（#38964）、子 agent 向父级提问（#38963）、外部集成感知子会话进度（#46685）
3. **权限系统精细化**：human-in-the-loop 分级（#51966/#51967）、Code Mode 内权限请求可视化（#51223/#51224）
4. **MCP 生态集成**：深度链接一键添加 MCP 服务器（#51919）、远程 MCP header 环境变量插值（#23664）
5. **计费/配额透明度**：Zen 余额回退（#42938）、免费模型"Unlimited"承诺（#51682）、配额与账单对不上（#41206）

---

## 六、开发者关注点

- **计费可靠性是当前最大信任危机**：支付被拒、余额不生效、credits 到账失败集中爆发，建议官方发布统一的 status 说明
- **V2 资源稳定性**：TUI OOM（#51761）和 Windows 弹窗（#51887）属阻断级 bug，且触发条件不明，复现困难
- **提示词缓存是隐性优化重点**：多个 PR（#51960、#51956）显示团队在系统性提升跨会话缓存命中率，对重度用户成本影响显著
- **外部集成（ACP/事件总线）的权限与进度可见性不足**，是 IDE/编辑器集成用户的主要痛点
- **防呆机制待完善**：doom-loop 检测漏掉交替调用模式（#47759），"never commit secrets" 规则被过度解读阻断正常操作（#51908）

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-09-29

## 1. 今日速览

Managed Agent 双路径架构（#12380）持续推进，Stage G（权威 Session 历史、writer fencing 与接管）追踪 issue 与对应 PR #12964（接管时执行对账）今日落地，多阶段交付进入深水区。内存/上下文治理线热度居高不下：结构化 Auto Memory 上线追踪（#12947）、Mem0 集成 PR（#12891）与多项迁移修复同步推进。此外，安全类问题值得关注——Aux 模型选择器在 baseUrl 中持久化凭据的泄漏风险（#12856，P2）已被提出。

## 2. 版本发布

过去 24 小时无新 Release。注：v0.24.6-nightly.20260927 构建曾失败（integration_none），见 [#12880](https://github.com/QwenLM/qwen-code/issues/12880)（已关闭）。

## 3. 社区热点 Issues

1. **[#12380](https://github.com/QwenLM/qwen-code/issues/12380)** — Managed Agent 双路径架构与分阶段交付提案，37 条评论，是近期最核心的路线图讨论，几乎决定了 serve 模式下 Session/Workspace/工具执行的形态。
2. **[#12416](https://github.com/QwenLM/qwen-code/issues/12416)**（P1）— Remote-SSH 下 Companion 0.24.2 所有 `POST /session` 均报 `EPIPE`/`BridgeChannelClosedError`，唯一 P1 级 bug，17 条评论，影响面大。
3. **[#12737](https://github.com/QwenLM/qwen-code/issues/12737)** — ACP 桥 Stage B：Legacy 与 Managed 双引擎配对宿主集成，9-28 刚更新调度决策（本地 Managed 执行降级、优先 Hosted 切片）。
4. **[#12028](https://github.com/QwenLM/qwen-code/issues/12028)** — 非对话上下文 token 治理追踪：系统提示、工具 schema、QWEN.md、技能列表在每次请求中重复计费，大上下文模型下成本可观，社区共鸣强。
5. **[#12856](https://github.com/QwenLM/qwen-code/issues/12856)**（P2）— 五个设置键以 `authType:<id>\0<baseUrl>` 形式持久化模型选择器；当 baseUrl 内嵌 userinfo 凭据时会被所有公开表面原样泄露，安全隐患明确。
6. **[#12947](https://github.com/QwenLM/qwen-code/issues/12947)** — 结构化 Auto Memory 在 main 上的 rollout 准备追踪，是 #10151 与 #12028 两条线的汇合点。
7. **[#12928](https://github.com/QwenLM/qwen-code/issues/12928)**（P2）— 内部模型请求硬编码 `temperature: 0.2` 导致 Responses 兼容端点返回 400，兼容性问题需尽快移除。
8. **[#12929](https://github.com/QwenLM/qwen-code/issues/12929)**（P2）— Legacy 内存元数据迁移在工具调用完成的轮次后不推进，交互式 CLI 中复现，阻塞迁移收尾。
9. **[#12952](https://github.com/QwenLM/qwen-code/issues/12952)** — Stage G 追踪：外部化权威 Session 历史/checkpoint，证明 writer fencing 与接管后才移除 owner 亲和，配对 PR #12964 今日提交。
10. **[#12889](https://github.com/QwenLM/qwen-code/issues/12889)**（P2）— 延迟 `tool_call` schema 允许带必填字段的工具收到空参数，导致工具调用失败，真实使用场景中触发。

## 4. 重要 PR 进展

1. **[#12964](https://github.com/QwenLM/qwen-code/pull/12964)** — 新 Broker 接管 READY Session 时分页扫描在途执行并向原 Runtime 代查询状态、结算回执，Stage G2 核心机制。
2. **[#12946](https://github.com/QwenLM/qwen-code/pull/12946)** — 实现私有 Hosted MCP 运行时（H1）：Runtime 接管 stdio/HTTP/SSE 连接与凭据，模型使用固定版本工具 schema。
3. **[#12955](https://github.com/QwenLM/qwen-code/pull/12955)** — 启用 G0 公开 Workspace 文件 Turn（显式开关 `QWEN_MANAGED_AGENT_WORKSPACE_FILES_ENABLED`），REST 与 WebShell 共享准入。
4. **[#12891](https://github.com/QwenLM/qwen-code/pull/12891)** — 主 CLI 内置 Mem0 记忆集成（opt-in），配置 endpoint 即自动注册 MCP server，记忆能力扩展的标志性一步。
5. **[#12913](https://github.com/QwenLM/qwen-code/pull/12913)** — 索引重建失败时保留元数据迁移的真实进度（committed/conflict/failure 计数），修复静默回退。
6. **[#12894](https://github.com/QwenLM/qwen-code/pull/12894)** — Hosted Shell 远程结果持久投递：有界 stdout/stderr 发布、不可变目录与对象存储、Session 回执准入。
7. **[#12865](https://github.com/QwenLM/qwen-code/pull/12865)** — Linux 上持久本地 Runtime worker 注册与收养，重启后凭 seed + 进程身份恢复执行日志。
8. **[#12278](https://github.com/QwenLM/qwen-code/pull/12278)** — 新增 Landlock 文件系统沙箱后端，bwrap 之后提供无 CLI 依赖的执行隔离备选。
9. **[#12773](https://github.com/QwenLM/qwen-code/pull/12773)** — fast model 选择固定到具体 provider endpoint，避免同 id 多 provider 时误路由（同时是 #12856 的引入源，需配合修复）。
10. **[#12531](https://github.com/QwenLM/qwen-code/pull/12531)** — 修复 MCP server 权限通配模式经有损名称规范化后被碰撞 server 利用的授权问题，安全相关。

## 5. 功能需求趋势

- **Managed Agent / serve 架构**：#12380 及 B/D/G/H 各 Stage 追踪 issue（#12737、#12867、#12952、#12847）占据热度榜首，多代理、持久 Session、SDK 是投入最重的方向。
- **记忆与上下文治理**：结构化 Auto Memory（#10151、#12947）、Mem0 集成（#12891）、token 治理（#12028）持续活跃，是第二大主线。
- **通道与平台分发**：Email 通道（#8281）、QQ Bot、Android/mobile shell、Web Shell 均有进展，社区对“多入口触达 Agent”需求明显。
- **安全与隐私**：凭据持久化泄露（#12856）、MCP 遥测在禁用时仍上报（#12844）、沙箱（Landlock）等安全问题密集出现。

## 6. 开发者关注点

- **Remote-SSH 可用性**（#12416，P1）：Companion 无法创建会话是最痛的可用性阻断，优先级最高。
- **token 成本可观测性**：非对话上下文静默占用大比例 token（#12028），开发者强烈希望量化和压缩。
- **Provider 兼容性**：硬编码 temperature（#12928）、空参数 tool_call（#12889）、多 provider 路由歧义（#12773/#12856）反映出第三方端点兼容仍是高频痛点。
- **稳定性工程**：CI 主干红测试（#12714）、nightly 发布失败（#12880）频发，基础设施可靠性需关注。
- **凭据安全**：设置文件中的凭据泄露路径（#12856）建议相关用户尽快自查 baseUrl 配置。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*