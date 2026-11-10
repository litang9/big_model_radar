# AI CLI 工具社区动态日报 2026-11-10

> 生成时间: 2026-11-10 02:43 UTC | 覆盖工具: 7 个

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
**数据窗口：2026-11-09 ~ 2026-11-10**

---

## 1. 生态全景

AI CLI 工具已从单一终端编码助手演进为覆盖桌面端、移动 Remote、多消息渠道、GUI 操控（Computer/Browser Use）的完整 Agent 平台。竞争焦点正从“模型能力”转向**工程可靠性**——长会话稳定性、成本透明度、跨平台一致性和 MCP 生态健壮性成为各社区最集中的抱怨。同时，工具间出现明显的生态互吸现象（Codex 主动迁移 Claude Code 技能），头部玩家加速争夺存量用户。Windows 平台已成为所有工具共同的质量洼地。开源社区反馈正深度参与架构演进（如 Gemini CLI 的沙箱/AST 提案、Qwen Code 的 Channels 生态）。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues（日报收录） | PR 动态 | Release | 今日焦点 |
|---|---|---|---|---|
| **Claude Code** | 10+（日报称 30 条热点） | 1 | **2 个**（v2.1.321/322） | 新模型 Fable 5.2（1M 上下文）、Vertex fast mode；Windows/长会话问题集中 |
| **OpenAI Codex** | 10+（含多条高评论量） | **13+**（密集合并） | **3 个** alpha（0.169.0-alpha.6/7、0.167.0-alpha.4.1） | 错误处理/权限体系重构、配额信任危机、Computer Use 故障 |
| **Gemini CLI** | 10 | **10**（多项已合并） | 0 | Subagent 体系可靠性、安全修复（p1 密集） |
| **Copilot CLI** | 12+（Issue 区 29 条更新） | 0 | **2 个**（v1.0.108/109） | 新版回归集中爆发（MCP 命名空间、Entra 登录、计费翻倍） |
| **OpenCode** | 10 | **10+**（贡献者密集提交） | 0 | 免费层信任危机（339 评论）、Windows 稳定性 |
| **Qwen Code** | 10+ | **11** | **1 个**（v0.27.1，三端同步） | Channels 消息生态扩展、Shell 权限安全攻坚 |
| **Kimi Code CLI** | 0 | 0 | 0 | 无活动 |

**小结**：Codex 发布节奏最快（alpha 日更 + PR 密集合并），Claude Code 版本动作最重（新模型落地），Gemini CLI / OpenCode / Qwen Code 无发布但 PR 活跃度高，处于持续工程打磨期。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体表现 |
|---|---|---|
| **Windows 平台质量** | Claude Code、Codex、Copilot CLI、OpenCode、Gemini CLI、Qwen Code | 六家全部中招：沙箱 TLS 阻断（CC #68219）、Computer Use 失效（Codex #51524）、PowerShell 挂起（Copilot #5387）、启动崩溃（OpenCode #63001）、git 权限绕过（Gemini PR #30095）、CI 门禁失败（Qwen）。跨工具无一幸免，是行业级欠账 |
| **长会话/Compaction 可靠性** | Claude Code、Codex、OpenCode、Qwen Code | 压缩丢消息（CC #108711）、compaction 后工具调用失效（OpenCode #50814）、自治任务提前终止（Codex #50771/#36596）、subagent 上下文膨胀 105k（Qwen #15660）、指令漂移（CC #108601） |
| **成本与用量透明度** | Claude Code、Codex、Copilot CLI、OpenCode | agent_summary 吃 18% 加权 token（CC #86879，121👍）、配额异常消耗（Codex #41220，85 评论）、用量翻倍上报（Copilot #5392）、隐性请求计费（OpenCode PR #63006）——真金白银问题在所有社区都是高敏感点 |
| **MCP 生态健壮性** | 全部活跃工具 | OAuth 登录失效（Copilot #5402、OpenCode PR #63008/63012）、孤儿进程泄漏（CC #95821）、大消息静默丢弃（Codex #60383）、进程倍增（OpenCode #43845）、连接器权限（CC #108161） |
| **沙箱与权限模型** | Claude Code、Gemini CLI、Copilot CLI、Qwen Code、Codex | 内网域名权限失效（CC #93201）、Seatbelt 信任死锁（Gemini PR #30164）、allowLocalNetwork 不生效（Copilot #5390）、shell 重定向权限旁路（Qwen #16140）、PermissionProfile 统一化重构（Codex PR #60472） |
| **Subagent/Agent 编排可靠性** | Gemini CLI、Claude Code、Codex、Qwen Code | 假成功上报（Gemini #22323 p1）、无限挂起（Gemini #21409 p1）、后台子 agent 结果丢失（Copilot #5395）、编排会话指令漂移（CC #108601） |
| **多端/远程体验** | Codex、Claude Code、Copilot CLI、Qwen Code | iOS/Android Remote 同步失败、账户切换丢数据（Codex #59895/#60364）、GitHub Mobile 遥控（Copilot #5315）、headless OAuth 设备码（Codex PR #60486） |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 新模型首发（Fable 5.2 / 1M 上下文）、Cowork 桌面端、remote-control | 重度专业开发者、subagent 编排型用户、企业内网用户 | 闭源核心 + issue 驱动开发；模型能力领先但长会话工程化短板明显 |
| **OpenAI Codex** | Computer/Browser Use、云桌面端、跨设备 Remote、企业 Bedrock | 付费订阅用户、GUI 自动化场景、混合云工作流 | Rust 内核 alpha 高速迭代；本日大规模错误处理/权限重构；主动提供竞品迁移工具 |
| **Gemini CLI** | Subagent 体系、AST 工具链、零依赖 OS 沙箱、token 效率 | 开源社区开发者、安全敏感型用户 | 最开放：社区提案直接驱动架构（#19873、#22745）；开源 PR 合并活跃 |
| **Copilot CLI** | 企业合规（GHE、Entra、Trusted Access）、GitHub 生态深度集成 | 企业开发者、安全研究者 | 安全/权限体验精细化迭代；但发布节奏快导致回归密集，企业用户建议滞后一个版本 |
| **OpenCode** | 免费 Zen 层、桌面持久化浏览器、embeddings 生态、多 provider | 价格敏感用户、本地模型用户、自定义 provider 需求者 | 开放 provider 路线 + 社区贡献驱动；v2 服务架构问题开始集中暴露 |
| **Qwen Code** | Channels 消息中枢（QQ/Email/钉钉/GitHub）、WebShell、Managed Agent | 中文生态用户、多平台协作工作流 | 统一 Agent Loop 架构重构；差异化押注消息集成而非 GUI 操控 |

---

## 5. 社区热度与成熟度

- **第一梯队（高热 + 高成熟）**：**Claude Code** 与 **Codex**。Claude Code 单 issue 121👍、评论量与议题广度领先，模型节奏最快；Codex PR 吞吐量最大（13+/日），工程化重构最激进，但配额信任危机（85 评论、持续 2 个月）是最大风险敞口。
- **第二梯队（快速迭代成长期）**：**Gemini CLI**（PR 10 条、p1 安全修复密集，社区提案参与度最高）、**Qwen Code**（三端同步发版 + 11 条 PR，Channels 生态扩张最快）、**OpenCode**（339 评论的免费层议题显示用户基数大，但信任消耗中）。
- **成熟但波动**：**Copilot CLI** 功能成熟、企业能力最全，但 1.0.107–109 连续回归叠加零 PR 透明度，社区信心受挫。
- **沉寂**：**Kimi Code CLI** 连续无活动，掉队风险明显。

---

## 6. 值得关注的趋势信号

1. **可靠性成为新护城河**：模型能力趋同后，各社区抱怨几乎全部集中在“挂起、假成功、丢消息、进程泄漏”——Agent 工程质量正取代模型 benchmark 成为主要竞争维度。
2. **成本审计诉求刚性化**：四家工具同时爆发用量透明度问题，预示“可审计的 token 消耗”将成为标配能力，开发者应优先选择提供细粒度开关与请求级账单的工具。
3. **Subagent 是下一个决胜点**：Gemini 假成功 p1、Claude 指令漂移、Qwen 上下文膨胀——编排型工作流仍是未解难题；短期内“禁用 subagent”仍是多数社区的务实绕行方案。
4. **生态迁移战开打**：Codex 内建 Claude Code 技能迁移、OpenCode 打通 Copilot 模型——锁定效应减弱，切换成本下降对用户是利好，选型时可降低沉没成本顾虑。
5. **Windows 是系统性风险**：六家工具同时沦陷，Windows 优先的开发者应在生产采用前做充分 PoC，或考虑 WSL 路径。
6. **发布节奏与回归率的权衡值得警惕**：Codex alpha 日更、Copilot 连发版本均伴随高密度回归。技术团队宜采用“锁定稳定版 + 滞后一个版本”策略，尤其涉及 SDK/计费链路时。

**给技术决策者的一句话**：当前没有“全面可靠”的选项——Claude Code 胜在模型与编排、Codex 胜在迭代速度与 GUI 操控、Gemini/Qwen 胜在开放性与社区响应，建议按核心工作流（编码/自动化/消息协作）做场景化选型，并为长会话与 Windows 环境预留降级方案。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-11-10，来源：anthropics/skills）

## 一、热门 Skills 排行（按社区活跃度）

| # | PR | Skill / 主题 | 功能与讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder 修复 | 适配 mcp>=2.0 的 `streamable_http_client` 重命名及自定义 header 新机制，修复 #1668；是 MCP 生态升级的关键兼容补丁 | OPEN |
| 2 | [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator 触发评测修复 | 解决评测 worker 竞争、Windows `select()` 失败导致的假阴性；直接回应 #556 / #1352 两大高热度评测失真问题 | OPEN |
| 3 | [#1245](https://github.com/anthropics/skills/pull/1245) | notion-spec-to-implementation + quantitative-resume-auditor | 将 Notion 产品/技术规格拆解为可执行任务；简历量化审计。跨 4 个多月持续更新，关注度高 | OPEN |
| 4 | [#525](https://github.com/anthropics/skills/pull/525) | Pyxel 复古游戏开发 | 由 Pyxel 作者 kitao 亲自提交，覆盖创建、调试、无头运行验证；3 月提交至今仍活跃 | OPEN |
| 5 | [#1980](https://github.com/anthropics/skills/pull/1980) | webapp-testing 安全修复 | 修复 `shell=True` 引入的命令注入风险（CWE-78），安全类贡献的代表 | OPEN |
| 6 | [#2108](https://github.com/anthropics/skills/pull/2108) | 文档 Skills 同步状态澄清 | 说明仓库文档类 Skills 为快照、与 `~/.claude/skills/synced/` 的同步关系，回应社区对版本混乱的困惑 | OPEN |
| 7 | [#1771](https://github.com/anthropics/skills/pull/1771) | proofcore-contract-auditor | Solidity/Rust 合约静态分析 + TON 链上审计存证；与安全议题 #492 形成张力 | OPEN |
| 8 | [#1615](https://github.com/anthropics/skills/pull/1615) | scnet-hpc | 通过 SSH + Slurm profile 操作 HPC 集群，体现 Skills 向科研计算场景延伸 | OPEN |

> 注：本期 PR 数据中评论字段缺失，排序综合更新时间、存活周期与关联 Issue 热度。

## 二、社区需求趋势（Issues 提炼）

1. **安全与信任机制**（最热，#492，46 评论）：社区 Skill 冒用 `anthropic/` 命名空间，用户呼吁官方签名/命名空间隔离。
2. **组织级分发与共享**（#228，17 评论）：期待 .skill 文件的团队共享库、直接分享链接，取代 Slack 手动传文件。
3. **Skill 触发可靠性工具链**（#556、#1352）：`run_eval.py` 并发评测触发率失真问题持续发酵，是开发者最核心的工程质量诉求。
4. **上下文效率**（#1487）：`claude-api` skill 一次性注入 ~156k token 耗尽上下文，呼吁渐进式加载。
5. **Agent 自治与质量保障类 Skill**（#1329 compact-memory、#1385 推理质量门控、#412 agent-governance）：长程 agent 状态压缩、多阶段审查成为提案热点。
6. **文档处理健壮性**（#2018 docx XML 损坏、#1868 渐变色 off-by-one 等）：Office/PDF Skills 的边角 bug 修复需求密集。

## 三、高潜力待合并 Skills / PR

- [#1742 mcp-builder mcp>=2 适配](https://github.com/anthropics/skills/pull/1742) — 修复上游依赖断裂，落地优先级高
- [#1298 skill-creator 评测隔离修复](https://github.com/anthropics/skills/pull/1298) — 直接对应两个高热度 Issue（#556/#1352），合并概率大
- [#2019 xlsx 外部链接误报修复](https://github.com/anthropics/skills/pull/2019) — 11 月仍活跃更新，修复 #2013
- [#1792 docx LibreOffice 超时处理](https://github.com/anthropics/skills/pull/1792) — 防止超时假成功，典型可靠性补丁
- [#1997 skill-creator YAML 解析修复](https://github.com/anthropics/skills/pull/1997) — 影响所有 Skill 元数据解析正确性
- [#525 Pyxel](https://github.com/anthropics/skills/pull/525) — 作者维护意愿强，存活 8 个月，属创意类高潜贡献

## 四、生态洞察（一句话）

**社区最集中的诉求是从"能用"走向"可信"：在命名空间安全、组织级分发、可靠的触发评测和上下文高效加载这四个维度上，建立对 Skills 的工程化信任基础。**

---

# Claude Code 社区动态日报 · 2026-11-10

## 1. 今日速览

过去 24 小时 Claude Code 连发两个版本：**v2.1.322** 为 Vertex 用户带来 fast mode，**v2.1.321** 引入新模型 **Claude Fable 5.2**（1M 上下文，默认 Fable 模型）并为 `remote-control` 增加 `--settings` 支持。社区方面，内置浏览器对内部域名的权限失效（#93201，24 条评论）、Windows 沙箱 TLS 握手阻断（#68219）以及 cost 相关的 agent_summary 开销问题（#86879，121 👍，已关闭）持续引发讨论。

## 2. 版本发布

**[v2.1.322](https://github.com/anthropics/claude-code/releases)**
- Vertex 平台（global/us/eu 区域）新增 fast mode，若 Vertex 拒绝则自动回退到标准速度。

**[v2.1.321](https://github.com/anthropics/claude-code/releases)**
- 新增 **Claude Fable 5.2**（`claude-fable-5-2`），成为默认 Fable 模型 — 1M 上下文，$8/$40 per Mtok，缓存读取 $0.20/Mtok。
- `claude remote-control` 新增 `--settings <file>` 参数，可对每个启动的会话应用配置文件；文件变更时不会新建会话。

## 3. 社区热点 Issues

1. **[#93201](https://github.com/anthropics/claude-code/issues/93201)** — 内置浏览器对内部主机名（*.habifino.local）忽略 Allowed sites 配置，每个操作都弹权限确认。运行两个多月、24 条评论、37 👍， Cowork 内网用户的核心阻塞问题。今日新提交的 [#108683](https://github.com/anthropics/claude-code/issues/108683) 被标记为重复，说明该问题仍在高频复现。

2. **[#86879](https://github.com/anthropics/claude-code/issues/86879)（已关闭）** — 请求提供禁用 `agent_summary` spinner 的官方方式；在 subagent 密集会话中它消耗 22.7% 的请求和约 18% 的加权 token。121 👍 反映出重度用户对可观测成本的控制诉求强烈。

3. **[#68219](https://github.com/anthropics/claude-code/issues/68219)** — Windows 沙箱中 Claude 子 shell 无法对非 Anthropic 端点完成出站 TLS 握手（破坏 Perforce），有稳定复现。长期未修，影响 Windows 企业开发工作流。

4. **[#56089](https://github.com/anthropics/claude-code/issues/56089)** — 请求允许配置 Cowork VM bundle（vhdx）存储位置，62 👍。Windows 用户系统盘空间焦虑的代表性需求。

5. **[#108601](https://github.com/anthropics/claude-code/issues/108601)** — 长时编排会话跨 Opus 5.5 / Fable 5.1 和多次压缩持续违背明确书面指令（“只做监督”）。由 Claude Code 会话自己撰写的 bug 报告，颇具代表性——长会话指令漂移问题值得关注。

6. **[#92059](https://github.com/anthropics/claude-code/issues/92059)** — Windows 内存压力治理器显示 "evicted 0 of 0" 但应用达到 12.4 GB RSS 后卡死。16 GB 内存机器上桌面端可用性的硬伤。

7. **[#108161](https://github.com/anthropics/claude-code/issues/108161)** — 通过 Docs connector 创建的 Claude Docs 对会话不可达（读取被拒、Artifact 404、@Claude 评论丢失）。MCP/集成链路的跨产品权限问题。

8. **[#95821](https://github.com/anthropics/claude-code/issues/95821)** — stdio MCP server 连接失败重试导致孤儿进程无限累积。长会话下的资源泄漏，服务器端稳定性痛点。

9. **[#108692](https://github.com/anthropics/claude-code/issues/108692)** — CLI 在项目 `.claude` 目录被删除后单核空转（2.1.321 复现），与已关闭的 #77983 属同一 watcher 循环。今日新报，有复现步骤。

10. **[#108711](https://github.com/anthropics/claude-code/issues/108711)** — turn 中途的自动压缩静默丢弃当前用户消息中的长粘贴文本，且无法从 transcript 恢复。数据丢失类 bug，优先级应较高。

## 4. 重要 PR 进展

过去 24 小时仅 1 条 PR 更新：

- **[#89404](https://github.com/anthropics/claude-code/pull/89404)** — 修复 plugin-dev skill 中 `validate-agent.sh` 的 `set -euo pipefail` 交互问题：`((x++))` 在值为 0 时返回非零导致脚本在首个警告处中止，错误标记合法 agent 文件。修复 #83803。开源近三个月仍未合并。

> PR 活动较少，符合该仓库以 issue 追踪为主、代码闭源开发的惯例。

## 5. 功能需求趋势

- **桌面端（Cowork/Code tab）体验**：VM 存储位置配置（#56089）、跨设备隐藏会话（#94562）、Projects 视图显示活跃线程（#108709）、语音听写快捷键（#97929）——桌面端已成功能请求主战场。
- **成本与性能控制**：agent_summary token 开销（#86879，121 👍）、内存治理失效（#92059）、CPU 空转（#108692）、UI 阻塞（#108690）。
- **权限与沙箱模型**：浏览器站点级权限对内网域名失效（#93201）、auto-mode 分类器不确定性行为（#97559）、Windows 沙箱网络限制（#68219）。
- **MCP 生态稳定性**：OAuth redirect URI 失败（#108607）、env 变量解析导致 server 双启（#108294）、孤儿进程泄漏（#95821）、Docs connector 权限（#108161）。
- **新模型与长会话可靠性**：Fable 5.2 落地后，长会话指令漂移（#108601）和压缩丢数据（#108711）成为新焦点。

## 6. 开发者关注点

1. **Windows 是 bug 重灾区**：今日 30 条热点中约半数涉及 Windows（沙箱 TLS、内存、Remote Control 恢复、Zed 打开失败、watcher 空转），Windows 用户满意度明显落后于 macOS/Linux。
2. **长会话可靠性**：指令漂移、压缩丢消息、内存失控、进程泄漏集中出现，编排型重度使用场景（solo founder / subagent-heavy）暴露出工程化短板。
3. **成本透明度**：社区对隐性 token 消耗（如 spinner）高度敏感，需要更细粒度的开关与审计手段。
4. **企业/内网场景支持不足**：内部主机名权限、私有仓库认证（#108710）、Perforce 等企业工具集成问题长期挂起。
5. **MCP 连接器体验参差**：从 OAuth 到进程管理，MCP 集成的“最后一公里”问题仍是高频反馈来源。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-11-10

## 📌 今日速览

Codex Rust 端今天密集发布 3 个 alpha 版本（0.169.0-alpha.6/7 及 0.167.0-alpha.4.1），主仓合并了大量由 copyberry[bot] 提交的错误处理与权限体系重构 PR。社区侧，Windows Computer Use 的浏览器 URL 检测失败与配额异常消耗两大问题持续发酵，跨平台会话同步与桌面端数据迁移问题成为新的投诉焦点。

---

## 🚀 版本发布

| 版本 | 说明 |
|---|---|
| `rust-v0.169.0-alpha.7` | 最新 alpha，主开发线 |
| `rust-v0.169.0-alpha.6` | 前一 alpha 版本 |
| `rust-v0.167.0-alpha.4.1` | 0.167 补丁版本，配合 [#60457](https://github.com/openai/codex/pull/60457) 的 Desktop 热修复回移（incremental tools legacy 特性，面向 Bedrock 原生 Responses） |

---

## 🔥 社区热点 Issues（Top 10）

1. **[#41220](https://github.com/openai/codex/issues/41220) — [Meta] 配额异常消耗/用量统计不一致跨报告追踪**
   85 条评论，聚合多个配额加速消耗的报告，是当前最具争议的问题，直接影响付费用户信任。

2. **[#51524](https://github.com/openai/codex/issues/51524) — Windows Computer Use 在 get_window_state 处停止，无法读取浏览器 URL**
   81 条评论。10 月 6 日起 Chrome/Edge 均复现，Windows Computer Use 的核心能力受损，与 #59380、#58773、#59422 同症状族。

3. **[#59895](https://github.com/openai/codex/issues/59895) — Windows 桌面端更新后切换回个人账户，本地项目全部消失**
   43 条评论、16 👍，11 月新爆出，涉及数据安全感知，用户情绪强烈。

4. **[#36454](https://github.com/openai/codex/issues/36454) — iOS Remote 项目列表与桌面端不同步**
   长期存在的跨设备一致性问题，Remote 体验的核心短板。

5. **[#47270](https://github.com/openai/codex/issues/47270) — 桌面端 Browser Use 无法发现任何浏览器标签页**
   无 ChatGPT 浏览器路由导致 Chrome 与内置浏览器均不可用，影响 macOS 用户。

6. **[#50771](https://github.com/openai/codex/issues/50771) — Codex 任务中途反复停止/丢失**
   19 👍，自治任务连续性问题与 #36596 同属高频行为类痛点。

7. **[#36596](https://github.com/openai/codex/issues/36596) — 自治任务被提前终止，违背“继续直到需要用户输入”的明确指令**
   与上一条共同反映模型自主持续执行能力不稳。

8. **[#51049](https://github.com/openai/codex/issues/51049) — Windows dot 创建任务的桌面端追问失败（AbsolutePathBuf 反序列化错误）**
   云端/本地 cwd 混用导致的路径处理 bug，阻断混合工作流。

9. **[#55046](https://github.com/openai/codex/issues/55046) — Windows MXC 沙箱遗留 AppContainer 目录与防火墙规则，持续增长直至重启**
   系统级资源泄漏，影响重度用户机器卫生。

10. **[#60364](https://github.com/openai/codex/issues/60364) — 切换 ChatGPT 账户清空本地侧边栏组织结构，无迁移路径**
    11 月 9 日新报，与 #59895 同属账户/数据本地化设计缺陷族。

> 其他值得留意：[#60383](https://github.com/openai/codex/issues/60383) Stdio MCP 响应超 16 MiB 被静默丢弃直至 300s 超时；[#60348](https://github.com/openai/codex/issues/60348) Android Remote 手动配对在 headless Linux CLI 上失败；[#57101](https://github.com/openai/codex/issues/57101) Computer Use 截图后金色边框与捕获权限未释放。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#60482](https://github.com/openai/codex/pull/60482) — 统一各传输层的 context_length_exceeded 处理**：HTTP 400 上下文超限错误将正确触发上下文压缩重试，流式失败立即终止流。
2. **[#60479](https://github.com/openai/codex/pull/60479) / [#60476](https://github.com/openai/codex/pull/60476) / [#60480](https://github.com/openai/codex/pull/60480) / [#60475](https://github.com/openai/codex/pull/60475) — 错误分类“终结化”系列**：内容政策违规、access program 拒绝、workspace 访问拒绝、无效 workspace 等 403/400 错误不再被错误重试，直接终止并保留诊断信息。
3. **[#60473](https://github.com/openai/codex/pull/60473) — 本地压缩遵循服务端重试策略**：尊重 `Retry-After`，避免对无效请求盲目重试。
4. **[#60487](https://github.com/openai/codex/pull/60487) — 默认启用 untrusted context tool outputs**：浏览器信息、goal objectives 等非受信上下文以 `function_call_output` 形式进入模型，标记为 stable。
5. **[#60472](https://github.com/openai/codex/pull/60472) / [#60500](https://github.com/openai/codex/pull/60500) — 权限体系迁移**：移除 legacy `SandboxPolicy`，统一序列化为 `PermissionProfile`，遥测标签直接从权限 profile 派生。
6. **[#60486](https://github.com/openai/codex/pull/60486) — app-server 网关 OAuth 增加设备授权流程**：支持 `deviceAuth` 设备码登录，利好 headless/远程场景。
7. **[#60492](https://github.com/openai/codex/pull/60492) — Claude Code 本地技能迁移**：识别 `claude-code-local-skills` 迁移源，排除 `synced`/`.trash` 目录——竞品迁移工具持续完善。
8. **[#60466](https://github.com/openai/codex/pull/60466) — 诊断日志失败时保持线程存储可用**：日志数据库故障不再拖垮会话历史功能。
9. **[#60461](https://github.com/openai/codex/pull/60461) — 权限授权范围纳入 executor 能力发现**：会话级文件授权不得绕过插件禁用策略，安全边界收紧。
10. **[#60457](https://github.com/openai/codex/pull/60457) [OPEN] — 回移 legacy incremental tools 至 0.167.0-alpha.4**：为 Desktop 热修复提供 Bedrock 原生 Responses 的增量工具支持（默认关闭），对应今日发布的 0.167.0-alpha.4.1。

> 值得一提：[#60488](https://github.com/openai/codex/pull/60488) 移除 Xcode 26.4 MCP elicitation 兼容补丁；[#60489](https://github.com/openai/codex/pull/60489) 修复 `app-server daemon start` 忽略特性覆盖参数的问题；[#60462](https://github.com/openai/codex/pull/60462) TUI 问答走 Cloud 消息准入路径。

---

## 📈 功能需求趋势

- **Windows 平台体验修复**：今日热度最高的 10 个 issue 中 7 个带 `windows-os` 标签——Computer Use、沙箱泄漏、任务栏、附件上传等，Windows 已成质量洼地。
- **Computer Use / Browser Use 可靠性**：URL 检测失败、截图超时、捕获权限不释放，端到端 GUI 操控是当前最集中的故障域。
- **跨设备/跨账户一致性**：iOS/Android Remote 同步、账户切换数据丢失、SSH 主机自动重连，多端协同架构待打磨。
- **MCP 生态健壮性**：大消息静默丢弃、elicitation 兼容性等，MCP 集成进入深水区。
- **竞品迁移与生态开放**：Claude Code skill 迁移、Bedrock 增量工具回移，显示 Codex 在积极争取存量用户。
- **会话管理批量操作**（#46587）：多选/批量归档是长期未满足的桌面端需求。

---

## ⚠️ 开发者关注点

1. **配额透明度危机**：#41220 汇聚的用量统计不一致问题持续 2 个多月未闭环，付费用户信任成本最高的单点问题。
2. **自治任务连续性**：“说要继续却提前停止”（#50771、#36596）是行为层面的高频抱怨，影响 agent 工作流可用性。
3. **本地数据安全**：应用更新和账户切换导致本地项目/侧边栏配置消失（#59895、#60364），缺乏迁移与恢复路径。
4. **错误处理体系重构窗口**：本日合并的“终结错误”系列 PR 大幅改变 4xx 行为，依赖 Codex 错误码做自动化的开发者需关注重试语义变化。
5. **headless/远程场景**：Linux CLI Remote 配对失败（#60348）、OAuth 设备授权（#60486）表明无 GUI 环境仍是薄弱地带，但正在被系统性投入。

---
*数据来源：github.com/openai/codex | 统计窗口：2026-11-09 ~ 2026-11-10*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-11-10）

## 1. 今日速览

今日无新版本发布，社区活跃度集中在 **Agent 子代理体系**的 Bug 修复与能力评估上：`area/agent` 标签几乎垄断了热门 Issues，其中 Subagent 达到 MAX_TURNS 却误报成功（p1）和 Generalist Agent 挂起问题最受关注。PR 方面，Windows git diff 权限绕过安全修复（p1）和一批核心稳定性改进（递归会话防护、headless 模式进程清理、macOS Seatbelt 沙箱信任修复）持续推进。

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — Subagent 达到 MAX_TURNS 后误报 `GOAL success`（p1，13 评论）。核心可靠性问题：中断被伪装成成功，直接影响用户对 Agent 结果的信任，社区讨论热烈。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — Generalist Agent 无限挂起（p1，8 评论 / 8 👍）。简单如创建文件夹的操作也会挂起超过一小时，用户只能通过指示模型禁用子代理绕过，是当前子代理体系最影响体验的 Bug。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — 零依赖 OS 沙箱 + 执行后意图路由（9 评论）。方向性提案：Gemini 3 模型天然偏好 bash 工具链（grep/sed/awk），需要安全沙箱来释放这一能力，是架构层面的重要讨论。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — AST 感知文件读取/搜索/映射 EPIC（7 评论）。评估 AST 工具能否减少误对齐读取、降低 token 噪音，衍生出 #22746（tilth/glyph）和 #22747（ast-grep）三个子任务，是 Agent 效率优化的重点方向。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — Gemini 不主动使用 skills 和 sub-agents（7 评论）。用户反馈自定义 skill 几乎从不被自动调用，反映子代理调度/激活策略存在明显短板。

6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** — Browser Agent 完全忽略 settings.json 配置（如 maxTurns）（5 评论）。AgentRegistry 能读到配置但运行时不生效，配置链路断裂。

7. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — Browser subagent 在 Wayland 下失败（p1，4 评论）。Linux 桌面环境兼容性问题，同样误报 GOAL 终止。

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — 工具数超过 128 触发 400 错误（3 评论）。重度扩展用户的硬限制问题，期望 Agent 能智能裁剪工具作用域。

9. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** — get-shit-done 输出 hook 导致崩溃（p1，3 评论）。输出摘要阶段反复崩溃，稳定性问题。

10. **[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)** — "Tactful Extraction" 省 token 精准读取（2 评论）。当前基线约 36.6k tokens/turn，大文件读取容易"灌水"上下文（+15k/turn），提出 grep 优先的分层代码发现策略，与 #22745 的 AST 方向互补。

---

## 4. 重要 PR 进展

1. **[#30095](https://github.com/google-gemini/gemini-cli/pull/30095)**（OPEN，p1/security）— 修复 Windows 下 git diff 权限绕过：危险 Git 参数可能被误判为只读操作，统一 Git 命令安全校验并拒绝危险参数。

2. **[#30185](https://github.com/google-gemini/gemini-cli/pull/30185)**（CLOSED）— 阻止 Shell Mode（`!`）中递归生成交互式 gemini 会话，并拒绝不受支持的配置子命令。

3. **[#30204](https://github.com/google-gemini/gemini-cli/pull/30204)**（CLOSED）— headless（`-p`）模式收到 SIGTERM/SIGINT 时：杀死分离的子进程组、记录被取消的工具调用、保留信号退出码。

4. **[#30164](https://github.com/google-gemini/gemini-cli/pull/30164)**（CLOSED，p1）— 修复 macOS Seatbelt 沙箱下文件夹信任失败：沙箱策略拒绝访问 `trustedFolders.json` 导致信任对话框死锁。

5. **[#30211](https://github.com/google-gemini/gemini-cli/pull/30211)**（CLOSED，p1）— read-many-files 修复：宽泛 glob（如 `reports/**`）误将二进制文件（图片/PDF）以 base64 内联注入上下文。

6. **[#30109](https://github.com/google-gemini/gemini-cli/pull/30109)**（OPEN）— 限制 grep_search 输出体积并引导模型收窄搜索：100 条长行匹配可产生 ~150K 字符，远超 64KB 执行器上限。

7. **[#30212](https://github.com/google-gemini/gemini-cli/pull/30212)**（OPEN）— 新增 `tools.callTimeout` 配置：单次工具调用超时后触发 AbortSignal，以可恢复的 `TOOL_CALL_TIMEOUT` 错误结束，让模型换策略——直接回应挂起类 Issue。

8. **[#30189](https://github.com/google-gemini/gemini-cli/pull/30189)**（CLOSED）— MessageBus.request() 在 publish 失败时立即 reject，不再白等 60 秒超时。

9. **[#30214](https://github.com/google-gemini/gemini-cli/pull/30214)**（OPEN）— 将 TortoiseGitPlink 识别为 PuTTY 系 SSH 客户端，正确插入 `-batch` 参数。

10. **[#30210](https://github.com/google-gemini/gemini-cli/pull/30210)**（OPEN）— WebFetch 取消后停止 fallback 处理，避免请求已取消仍继续尝试备选 URL 的浪费。

---

## 5. 功能需求趋势

- **子代理（Subagent）体系深化**：绝对主线。涵盖可靠性（挂起、误报成功）、调度策略（不主动调用 skills）、并行协作与共享内存（#18287）、轨迹可视化（#22598）、`/bug` 报告包含子代理上下文（#21763）。
- **AST 感知工具链**（#22745/#22746/#22747）：以 ast-grep、tilth、glyph 为候选，追求精准读取、降低 token 消耗。
- **Token 效率优化**：Tactful Extraction（#19561）、grep 输出封顶（PR #30109）、文件型任务追踪替代 WriteToDo（#18836/#21000）。
- **安全与沙箱**：零依赖 OS 沙箱（#19873）、破坏性命令防护（#22672）、Windows git 安全（PR #30095）、macOS Seatbelt 修复。
- **Browser Agent 健壮性**：配置覆盖失效（#22267）、会话锁自动接管（#22232）、Wayland 支持（#21983）。
- **可观测性与评估**：内部 eval 稳定化（#23166/#23313）、telemetry 版本号修正（PR #29960）。

## 6. 开发者关注点

1. **子代理可靠性是最大痛点**：挂起（#21409）、假成功（#22323）、不自动调用（#21968）三类问题叠加，不少用户被迫禁用子代理，社区的忍耐度在下降。
2. **配置不生效**：settings.json 覆盖被 Agent 忽略（#22267）、symlink 的 agent 不被识别（#20079）、`${VAR:-default}` 空值语义错误（PR #30096），配置链路一致性有待加强。
3. **上下文/token 成本**：36.6k/turn 的基线和大文件“灌水”是高频抱怨，社区强烈期待精准读取与输出裁剪。
4. **工具规模上限**：128+ 工具触发 400 错误（#24246），扩展生态重度用户首先撞墙。
5. **跨平台一致性**：Windows（git 安全、SSH 客户端识别）、Linux/Wayland、macOS 沙箱均有平台特定问题，核心维护团队正在批量收口。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 · 2026-11-10

## 1. 今日速览

过去24小时，copilot-cli 发布 **v1.0.109-0**，聚焦安全与权限体验优化（symlink 确认、子域名批量授权、减少只读脚本打扰）。Issue 区异常活跃，29 条更新中出现一批 1.0.107/1.0.108 版本引入的回归问题（MCP 命名空间丢失、Entra 静默登录失效、计费翻倍报告），值得升级用户关注。

## 2. 版本发布

**v1.0.109-0**（Improvements）
- `/share` 与 `/export` 保存本地文件时若跟随 symlink，会先请求确认
- URL 权限提示支持一键批准当前会话内所有子域名
- 只读 shell 脚本触发权限确认的频率降低（涉及 git refs 变更或经隐藏路径读文件的脚本仍会确认）

**v1.0.108**（2026-11-09）
- 新增 `sandbox.userPolicy.filesystem.enumeratePaths` 设置，支持 Windows 仅枚举式目录授权
- 新增 `/index` 命令，符合条件的仓库默认启用托管共享 tgrep 索引
- Grok 4.7/4.6 的 PDF 附件降级为文件引用处理

## 3. 社区热点 Issues（Top 10）

1. **[#5400](https://github.com/github/copilot-cli/issues/5400)** 1.0.108 回归：延迟 MCP 调用后 `function_call` 丢失 namespace，导致 SDK 会话永久损坏（400 错误）。新版本硬回归，已关闭（应已修复），升级 1.0.108 的 SDK 用户需留意。

2. **[#5402](https://github.com/github/copilot-cli/issues/5402)** MCP Entra 静默登录使用 `/common` authority，单租户应用报 AADSTS50194，自 1.0.107 起每会话都要手动 `/mcp auth`。企业单租户场景的高频痛点。

3. **[#5392](https://github.com/github/copilot-cli/issues/5392)** 约 0.3% 的 Claude 调用报告 prompt 用量翻倍（输入/cache 读写均 x2），直接影响计费；与 [#5393](https://github.com/github/copilot-cli/issues/5393)（压缩基于矛盾的单次读数误触发）和 [#5394](https://github.com/github/copilot-cli/issues/5394)（取消压缩后 UI 卡在 "Compacting…"）构成一组用量/压缩链路问题。

4. **[#5390](https://github.com/github/copilot-cli/issues/5390)** macOS 沙箱：`allowLocalNetwork: true` 仍生成 `hostLoopback: deny`，阻断 Gradle 连接本地 daemon（1.0.107）。沙箱网络策略配置与实际生成的 seatbelt profile 不一致。

5. **[#5388](https://github.com/github/copilot-cli/issues/5388)** GHE Cloud 数据驻留租户下，`GH_TOKEN`/`GH_ENTERPRISE_TOKEN` 在掩码前就被丢弃，凭据掩码失效——企业安全场景的重要缺陷。

6. **[#5323](https://github.com/github/copilot-cli/issues/5323)** 功能请求（👍1，评论 5）：提供设置禁用 agent checkpoint 的 `refs/agents/*`——这些 ref 使用用户 git 身份创建，污染所有渲染全量 refs 的工具。社区讨论热烈。

7. **[#5320](https://github.com/github/copilot-cli/issues/5320)**（已关闭，👍11）：支持 OSC 7501 agent-status 上报，让 Herdr 等终端显示 Copilot 会话状态。热度最高的功能请求之一。

8. **[#4322](https://github.com/github/copilot-cli/issues/4322)**（👍5）：支持加入 "Trusted Access for Cyber program"，解决安全补丁审查被误标记为网络安全风险（422）的问题。安全研究者的核心诉求。

9. **[#5387](https://github.com/github/copilot-cli/issues/5387)** Windows：powershell 工具通过 `Start-Process -RedirectStandardOutput` 启动后台进程时会话永不结束，CLI 挂起。

10. **[#5395](https://github.com/github/copilot-cli/issues/5395)** `session.background_tasks_changed` 事件超时后会话停止接受消息，后台子 agent 结果丢失；配套的 [#5386](https://github.com/github/copilot-cli/issues/5386)（SDK 会话 close 后无法 resume）也反映 SDK 会话管理脆弱。

其他值得关注：[#5398](https://github.com/github/copilot-cli/issues/5398) macOS 26 原生 canvas 窗口空白、[#5403](https://github.com/github/copilot-cli/issues/5403) providers.json 隐藏 AIC 配额显示、[#5352](https://github.com/github/copilot-cli/issues/5352) 子 agent 误读禁止 /tmp 指令拒绝读取临时文件（已关闭）。

## 4. 重要 PR 进展

过去 24 小时无 PR 更新，本节省略。

## 5. 功能需求趋势

- **企业集成与合规**：GHE 数据驻留、Trusted Access for Cyber、Kerberos 代理（#5142）、企业安全文档（#5389）——企业用户声音集中。
- **MCP 生态成熟度**：固定 OAuth 回调端口（#5391）、Entra 多租户登录、Connectors 在 `--acp` 模式可用（#5397）——MCP 认证与互操作性是最高频主题。
- **远程/多端控制**：GitHub Mobile 语音遥控（#5315）、ACP 客户端集成、终端状态上报（OSC 7501）。
- **可用性与可观测性**：长任务系统通知（#2616）、凭据存储诊断（#5399）、用量/配额显示准确性。
- **Git 卫生**：减少对仓库的隐形写入（agent checkpoint refs）。

## 6. 开发者关注点

- **新版本回归风险高**：1.0.107–1.0.108 连续引入 MCP 命名空间、Entra 登录、沙箱回环网络等回归，建议企业用户延迟一个版本升级或锁定版本。
- **SDK/ACP 路径不够健壮**：会话生命周期（创建/关闭/恢复）、事件超时、压缩取消等边界情况问题密集，二次开发方受影响最大。
- **计费与用量透明度**：用量翻倍上报、误触发压缩、配额显示消失，涉及真金白银，社区敏感度高。
- **沙箱与权限模型仍是双刃剑**：安全增强（symlink 确认、凭据掩码）持续迭代，但策略配置语义不清（allowLocalNetwork 不生效）和过度打扰仍是主要摩擦点。
- **Windows 支持滞后感明显**：凭据管理器、PowerShell 后台进程、enumerate-only 授权等问题集中出现在 Windows 平台。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-11-10）

## 📌 今日速览

今日无新版本发布，但社区活动非常活跃。Zen 免费层问题（[#59387](https://github.com/anomalyco/opencode/issues/59387)）持续发酵，评论已超 339 条，成为压倒性的焦点议题。PR 方面，贡献者 @rekram1-node 密集提交了 MCP OAuth 修复和 AI embeddings 生态系列 PR，桌面端也迎来了持久化浏览器配置文件等重要功能更新。

---

## 🚀 版本发布

过去 24 小时无新 Release。

---

## 🔥 社区热点 Issues

1. **[zen] Free tier 集中反馈帖** — [#59387](https://github.com/anomalyco/opencode/issues/59387)
   免费层问题官方汇总帖，评论 339 条、👍 27。涵盖"免费额度耗尽不重置""版本不可用”等核心投诉，是当前社区情绪的风向标。

2. **Windows 后台服务每 2 秒弹出控制台并抢占键盘焦点** — [#62988](https://github.com/anomalyco/opencode/issues/62988)
   今日新报，因 `opencode serve --service` 频繁 shell out 且无控制台归属，持续创建新的 cmd.exe 窗口，Windows 用户体验严重受损。

3. **Windows x64 上 Desktop 窗口启动即崩溃** — [#63001](https://github.com/anomalyco/opencode/issues/63001)
   2.2.6 版本渲染进程以 code -2147483645 退出，重装无效。Windows 稳定性问题今日集中爆发。

4. **服务默认端口 49374 与临时 TCP 端口冲突** — [#62891](https://github.com/anomalyco/opencode/issues/62891)
   已复现。默认端口落在临时端口范围内，v2 启动挂起 20 秒后失败，属架构级选端口缺陷。

5. **配置文件并发写入导致整体配置拒绝、杀死全部运行中会话** — [#62872](https://github.com/anomalyco/opencode/issues/62872)
   已复现。`opencode.jsonc` 出现瞬时部分状态时无 last-good 回退，稳定性风险高。

6. **v2 服务为每个项目目录启动一整套本地 MCP 进程** — [#43845](https://github.com/anomalyco/opencode/issues/43845)
   53 个目录 × 2 个 MCP server = 106 个进程，资源浪费严重，已复现并标记为 2.0 议题。

7. **Code Mode execute 工具始终返回 null** — [#62923](https://github.com/anomalyco/opencode/issues/62923)
   v2.2.6 中所有代码执行结果（含异常）均返回 null，核心功能失效，MCP 服务本身健康。

8. **大 worktree 下 git 轮询打满 CPU** — [#62948](https://github.com/anomalyco/opencode/issues/62948)
   在 130 万文件 / 47GB 目录中，每几秒执行全套 git status 命令，性能痛点典型样本。

9. **compaction 后模型将工具调用以纯文本输出** — [#50814](https://github.com/anomalyco/opencode/issues/50814)
   自动压缩后工具调用不再结构化派发，会话无输出。长会话场景的核心 bug。

10. **LM Studio 使用 API key 时模型发现失败** — [#51570](https://github.com/anomalyco/opencode/issues/51570)
    已复现。`/models` 请求未携带 API key，影响本地模型用户的自定义 provider 体验。

---

## 🔧 重要 PR 进展

1. **fix(core): MCP OAuth token 过期前主动刷新** — [#63008](https://github.com/anomalyco/opencode/pull/63008)
   修复此前仅在收到 401 后才被动刷新的问题，与 provider 登录行为对齐。

2. **fix(core): 刷新临时失败时保留 MCP OAuth 凭据** — [#63012](https://github.com/anomalyco/opencode/pull/63012)（已合）
   避免网络抖动/429 被误判为登录失效导致登出。

3. **feat(desktop): 持久化浏览器配置文件 + 导入登录态与扩展** — [#63002](https://github.com/anomalyco/opencode/pull/63002)
   桌面浏览器从一次性内存分区改为单一持久 profile，会话内链接在侧栏打开。重大 UX 改进。

4. **feat(ai): OpenAI 协议 embeddings 已合并** — [#62832](https://github.com/anomalyco/opencode/pull/62832)
   为 `@opencode/ai` 补齐 embeddings 调用能力，并派生出 Google embedContent（[#62843](https://github.com/anomalyco/opencode/pull/62843)）与 Vertex predict（[#62844](https://github.com/anomalyco/opencode/pull/62844)）系列 PR。

5. **feat(core): GitHub Copilot Auto 模型 + model resolve hook** — [#62997](https://github.com/anomalyco/opencode/pull/62997)
   新增实验性 `experimental.model.resolve` 钩子，可按请求类型（primary/compaction 等）动态选模型。

6. **fix(core): Windows 上将快照 git/shell 命令移出主线程** — [#62802](https://github.com/anomalyco/opencode/pull/62802)
   针对进程创建阻塞主线程（最长 160ms）的深度性能优化，与 #62948 类问题相关。

7. **fix(core): session generate 请求计入会话成本** — [#63006](https://github.com/anomalyco/opencode/pull/63006)（已合）
   缓存预热、插件调用等隐性请求也纳入计费统计，提升成本透明度。

8. **feat(codemode): 名称加权 BM25 工具搜索排序** — [#62984](https://github.com/anomalyco/opencode/pull/62984)
   替换固定子串加分策略，解决 `list`/`get` 等常见词淹没结果的问题。

9. **fix(tui): 大型 session family 二次方级 prompt 水合优化** — [#57998](https://github.com/anomalyco/opencode/pull/57998)（已合）
   解决大会话族打开时的扫描性能瓶颈。

10. **fix(stats): crouton-alpha 映射为 Muse Ember 1.0** — [#62994](https://github.com/anomalyco/opencode/pull/62994)（已合）
    Meta 官方要求的数据页品牌映射更新，侧面印证新模型接入节奏。

---

## 📈 功能需求趋势

- **免费层与配额体验**：reset 机制、额度误报（#62803、#62783）持续高热，付费灵活性（加密货币支付 #23153，67 👍）呼声高。
- **桌面/Web 客户端能力增强**：语音输入（#33300）、实验 GUI 插件加载到 Web（#60976）、Inbox 会话置顶（#62772）。
- **自定义 Provider 与本地模型**：LM Studio API key（#51570）、自定义 provider 入口消失（#59603）、TUI 模型选择器显示不全（#62447）。
- **移动端生态**：Android 17 局域网权限缺失（#62934）、社区 MIT 协议 Android 客户端捐赠（#62897）。
- **终端集成深化**：OSC 7501 done/error 状态上报（#60411）、控制台中文化（#62768）。

---

## ⚠️ 开发者关注点（痛点总结）

1. **Windows 平台稳定性成重灾区**：启动崩溃（#63001）、控制台窗口刷屏抢焦点（#62988）、线程阻塞（#62802）三连击，建议官方优先组建 Windows 专项排查。
2. **免费层信任危机**：额度提前耗尽、重置失效、用量误报（22 小时假运行时长），叠加无加密货币支付渠道，正在消耗社区耐心。
3. **长会话可靠性**：compaction 后工具调用失效（#50814）、历史回放截断（#61189），重度用户受损最明显。
4. **资源与性能开销**：MCP 进程倍增（#43845）、git 轮询打满 CPU（#62948）、端口冲突（#62891）——v2 服务架构的系统性问题开始集中显现。
5. **配置健壮性**：并发写入无回退机制（#62872）、符号链接插件不热更新（#63009），影响插件开发者迭代效率。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-11-10）

## 1. 今日速览

Qwen Code 发布 v0.27.1 补丁版本（含 CLI、Desktop、SDK TypeScript），核心变更为启动上下文中显示活动 shell 名称，无破坏性变更。社区活跃度集中在 Channels/GitHub 集成体系（QQ、Email、钉钉 Webhook、PR watch）和 Shell 权限安全分析器的持续修复。主分支 CI 稳定性问题依然是最大噪音源，多条 Managed Agent gate 失败线程仍在处理中。

## 2. 版本发布

- **v0.27.1**（含 desktop-v0.27.1、sdk-typescript-v0.1.31）
  - Features: 启动上下文中命名活动 shell（[#16491](https://github.com/QwenLM/qwen-code/pull/16491)）
  - 文档: Wally 作为 OpenAI 兼容 provider 的说明
  - 无已知破坏性变更

## 3. 社区热点 Issues

1. **#16712 [P1, CLOSED]** main 分支 Java lane 编译失败（重复 case label）——曾阻塞所有 PR 的 Java 测试，已修复。体现主分支质量门禁脆弱性。[链接](https://github.com/QwenLM/qwen-code/issues/16712)
2. **#16683 [P1]** Desktop 0.27 在 Intel x64 Mac 上崩溃（Node runtime Fatal error），打包兼容性问题，等待更多信息。[链接](https://github.com/QwenLM/qwen-code/issues/16683)
3. **#16140 [P1, 安全]** Shell 重定向提取器遗漏 `N>`（fd≥3）、`>|`、`cd>file` 等形式，导致 Write/Edit 拒绝规则失效——权限旁路风险。[链接](https://github.com/QwenLM/qwen-code/issues/16140)
4. **#13139 [P1, 安全]** Shell 权限分析器对引号伪造 `cd` 目标仍存在幻影 cwd 残留入口。[链接](https://github.com/QwenLM/qwen-code/issues/13139)
5. **#16757 [P2, 安全]** 非 UTF-8 ANSI-C 字节折叠为 U+FFFD，导致 shell 路径守卫匹配到与 bash 实际访问不同的文件。[链接](https://github.com/QwenLM/qwen-code/issues/16757)
6. **#15327 [P1, 路线图]** 统一 Agent Loop：所有 surface 共用一个 agent loop 实现（`experimental.unifiedAgentLoop`），架构层面的关键重构，已 ready-for-human。[链接](https://github.com/QwenLM/qwen-code/issues/15327)
7. **#15660 [P2]** Subagent 启动即携带 105k 上下文，来源不明且逐次膨胀——token 管理核心痛点。[链接](https://github.com/QwenLM/qwen-code/issues/15660)
8. **#16766 [P2]** Desktop macOS WKWebView 中 Generated UI 卡片永久卡在 "Loading"，Chromium 正常——平台渲染兼容性问题。[链接](https://github.com/QwenLM/qwen-code/issues/16766)
9. **#16692 / #16691 [P2]** GitHub channel 性能优化提案：GraphQL 批量 PR 状态查询、条件请求（ETag/304）节省 API 配额。[链接](https://github.com/QwenLM/qwen-code/issues/16692)
10. **#16546 [P2]** WebShell 中为 managed session 暴露 sidebar panel 能力，附详细的能力对照表，社区讨论热烈。[链接](https://github.com/QwenLM/qwen-code/issues/16546)

> 另注：CI 机器人线程 #14724（282 评论）、#11680、#11678 等长期困扰主分支，多为基础设施噪音而非产品缺陷。

## 4. 重要 PR 进展

1. **[#16724](https://github.com/QwenLM/qwen-code/pull/16724)** feat(channels): QQ 扫码登录管理契约与配置面，Channels 生态扩展到 QQ。
2. **[#16741](https://github.com/QwenLM/qwen-code/pull/16741)** perf(github): 条件请求轮询，未变更数据不再消耗 API 配额。
3. **[#16732](https://github.com/QwenLM/qwen-code/pull/16732)** feat(serve): PR-watch host 发现与有序关闭，daemon PR 监控的基础设施首块拼图。
4. **[#16746](https://github.com/QwenLM/qwen-code/pull/16746)** feat(web-shell): 从 channel manager 配置 Email 通道。
5. **[#16772](https://github.com/QwenLM/qwen-code/pull/16772)** feat(channels): review/verify 绑定投递需持有活跃 watch，收紧事件投递语义。
6. **[#16773](https://github.com/QwenLM/qwen-code/pull/16773)** feat(channels): 按 UI 语言本地化绑定会话事件提示（中文渲染）。
7. **[#16765](https://github.com/QwenLM/qwen-code/pull/16765)** fix(core): 花括号展开的 `cd` 目标不再发布幻影 cwd，安全修复系列延续。
8. **[#16762](https://github.com/QwenLM/qwen-code/pull/16762)** fix(web-shell): 修复 review 面板多编辑 diff 被挤压成细条的问题（修 #16761）。
9. **[#16621](https://github.com/QwenLM/qwen-code/pull/16621)** fix(web-shell): 加载后自动继续被中断的会话，保留需确认取消的手动路径。
10. **[#16758](https://github.com/QwenLM/qwen-code/pull/16758)** feat(managed-agent): 私有 BTW 跟进与会话 recap（支持 Runtime 已回收的 ACTIVE 会话）。
11. **[#16764](https://github.com/QwenLM/qwen-code/pull/16764) [CLOSED]** CI 分片缩减至 2 个 shard，配合 smoke 时长上限调整以缩短流水线时间。

## 5. 功能需求趋势

- **Channels/消息集成生态**（最热）：QQ 扫码登录、Email、钉钉/Webhook 出站、平台 webhook 投递（#16751/16752/16753），社区正快速把 Qwen Code 打造成多平台消息中枢。
- **GitHub 深度集成与 API 配额效率**：PR 状态 watch、GraphQL 批量查询、条件请求、预算感知（#16690/16691/16692）。
- **统一 Agent 架构**：unifiedAgentLoop 单循环重构（#15327）、Managed Session/WebShell 能力对齐（#16546、#16324）。
- **Web Shell / Desktop 体验打磨**：会话管理、diff 渲染、Generated UI 跨 WebView 兼容、后台自动化（scheduled tasks）。

## 6. 开发者关注点

- **Shell 权限安全性**是高频修复区：重定向形式遗漏、非 UTF-8 路径、幻影 cwd、引号伪造目标——多个 P1 安全 issue 并行推进，说明 shell-semantics 分析器是当前质量攻坚重点。
- **Token/上下文管理**：subagent 上下文膨胀（#15660）与后台任务通知路由错位（#15748）是 agent 多任务场景下的核心痛点。
- **CI 稳定性**：主分支 Java/E2E/Managed Agent gate 反复失败（含一次编译错误导致全量 Java 测试瘫痪），社区正在通过分片缩减和 autofix 流程优化（#16657）缓解。
- **平台兼容性**：Intel x64 Mac 打包失败、macOS WKWebView 渲染差异，Desktop 跨平台一致性仍需关注。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*