# AI CLI 工具社区动态日报 2026-11-04

> 生成时间: 2026-11-04 00:35 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告 · 2026-11-04

---

## 一、生态全景

AI CLI 工具已从单纯的命令行补全演进为覆盖沙箱、子代理编排、多租户托管、跨端协同的完整工程平台。头部玩家（Claude Code、Codex、Gemini CLI）节奏稳定、日均版本迭代，同时各自向企业级能力（成本归因、托管策略、审批链路）纵深发展。中腰部（OpenCode、Qwen Code）以开源插件生态和多 Provider 兼容性寻求差异化。共性挑战浮出水面：**自主 Agent 的安全边界、长时任务可靠性、Windows 平台质量、token 成本透明度**成为全行业待解命题。

---

## 二、各工具活跃度对比

| 工具 | 热点 Issues | PR 活动 | Release | 当日核心事件 |
|---|---|---|---|---|
| **Claude Code** | 10+（#22543 达 82 评论/237👍） | 2（明显偏少） | **2 个版本**（v2.1.317/318） | Cowork 10GB VM bundle 性能问题持续发酵 |
| **OpenAI Codex** | 12+（#59060 达 76 评论） | **~20 个 PR 快速合入** | 1（rust-v0.167.0-alpha.4） | $10k 灾难性失控案例引发安全大讨论 |
| **Gemini CLI** | 10 | **10+（社区贡献活跃）** | 1（nightly） | 子代理假成功/挂起 P1 双痛点；安全 PR 密集 |
| **Copilot CLI** | 10 | 1 | **3 个版本**（1.0.106-5~7） | 企业托管设置疑似服务端回归（HTTP 422） |
| **OpenCode** | 10（#59387 达 **246 评论**） | 10+（架构级重构） | 0（即将发布） | 免费层配额风暴 + Model 系统大重构 |
| **Qwen Code** | 10 | 10（@wenshao 密集贡献） | 0 | CI 稳定性连环问题 + 杀软误报官方驱动 |
| **Kimi Code CLI** | 0 | 0 | 0 | 无活动 |

**解读**：Issue 讨论热度 OpenCode（246 评论）> Claude Code ≈ Codex > 其余；工程交付速度 Codex、Gemini CLI、OpenCode、Qwen Code 领先；Claude Code Issue 声量大但 PR 活动少，社区能量集中在问题反馈而非代码贡献。

---

## 三、共同关注的功能方向

### 1. 安全与权限精细化（最强共振信号）
- **Codex**：#59060 自主失控 $10k 损失、#40698 权限静默降级；工程侧 Guardian/沙箱 PR 密集
- **Claude Code**：#104925 bypass 模式 rm 误判卡死子代理、#107079 显式授权被拒——“显式授权应生效”
- **OpenCode**：#51504 MCP "ask" 权限静默降级为 "allow"
- **Qwen Code**：#14746 仓库 hooks 免批准执行（已修复）
- **Gemini CLI**：PR #30095 Git 权限绕过修复、#30071 MCP SSRF 加固、#22672 破坏性命令防护

**共性诉求**：安全机制应可预测、可豁免、可审计——“过度保守”与“静默放行”两个方向的失败都存在。

### 2. 长时任务与会话可靠性
- Codex：#31935（60 秒限制，👍23）、#59094 提前终止、#25215 长会话不可恢复
- Claude Code：#33323 任务队列（34 评论）、#63190 延迟消息
- Gemini CLI：#22323 子代理假成功、#21409 代理挂起一小时
- OpenCode：#61530 空响应重试、#61526 reviewer 死循环、压缩可靠性系列问题

### 3. Token 成本透明与控制
- Claude Code：#92544 配额异常消耗、#90756 auto-compact 窗口可视化
- Codex：#59262 配额异常消耗；音频 token 预算 PR（#59268/#59237）已修
- Gemini CLI：PR #30109 限制 grep 输出 150K 字符、AST-aware 工具 EPIC（#22745）以减少 token 噪音

### 4. Windows 平台是全行业质量洼地
- Gemini CLI（PowerShell 误拦截回归）、Copilot CLI（NumLock 回归、CRLF）、OpenCode（模型列表为空、PS 退出码）、Qwen Code（杀软误报）、Codex（沙箱文件链接、Office 集成）——**无一幸免**。

### 5. 可观测性（子代理/多 Agent 编排）
- Copilot CLI：agent-monitor TUI PR；Gemini CLI：#22598 子代理轨迹；OpenCode：消息来源标记（PR #60042）；Codex：遥测细化 PR。

---

## 四、差异化定位分析

| 维度 | Claude Code | Codex | Gemini CLI | Copilot CLI | OpenCode | Qwen Code |
|---|---|---|---|---|---|---|
| **核心侧重** | 企业级（AWS 成本归因、mods、云任务） | 沙箱安全 + Computer Use + 跨端 Remote | 子代理体系 + AST 代码理解 | 企业托管策略 + ACP 协议 + 终端生态 | 模型中立 + 插件生态 | 多租户托管 + Channels/GitHub 集成 |
| **目标用户** | 企业开发团队 | 自主化重度用户、跨设备场景 | 开源社区贡献者 | GitHub/企业生态用户 | 免费层/多 Provider 用户 | 自托管/国产模型用户 |
| **技术路线** | VM/Cowork 隔离，闭源快速迭代 | Rust 核心 + Windows 沙箱强化，PR 高度自动化 | TS 开源，社区 PR 驱动 | VS Code 深度联动，ACP 标准化 | `@opencode/ai` 自描述 Model 架构重构 | Managed Agent + 沙箱 + 多 Provider 兼容 |
| **独特风险** | Cowork 存储技术债；任务排队落后 Codex | 权限失控案例；模型侧回归（Sol 6.1） | 子代理状态可信度 | 托管设置服务端回归 | 免费层稳定性；triage 机器人误判 | CI 自身不稳定；静默失败零告警 |

---

## 五、社区热度与成熟度

- **成熟稳态型**：Claude Code、Codex——Issue 声量大但反馈质量高（有 👍 支撑的痛点聚合），版本节奏可预测，已进入“深水区优化”阶段（成本、安全、企业能力）。
- **快速迭代型**：Codex 工程侧（~20 PR/日、全自动化合入）、Gemini CLI（社区 PR 活跃、夜间版日更）、OpenCode（架构级重构 + 插件生态扩张，production 版本呼之欲出）。
- **追赶期**：Copilot CLI（版本高频但 PR 透明度低，ACP 方向集中清欠）、Qwen Code（核心贡献者驱动，Channels 生态建设中）。
- **沉寂**：Kimi Code CLI 连续无活动。
- **警示信号**：OpenCode 的 #59387（246 评论）和 OpenBotJR 误关 Issue 显示——**社区情绪管理**正在成为与工程能力同等重要的成熟度指标。

---

## 六、值得关注的趋势信号

1. **“显式授权应生效”将成为安全设计共识**。Codex 的 $10k 失控案例与 Claude Code/OpenCode 的权限误判/静默降级是同一枚硬币的两面。下一阶段竞争点不是“更严”或“更松”，而是**可预测、可审计、可豁免的权限语义**（Qwen 的 PR #16116“Hook 重写不继承前步 Allow”是正确方向的范例）。

2. **长时自主任务是下一个能力分水岭**。Codex 已抢先落地任务排队（被 Claude Code 社区引用施压），60 秒限制、会话压缩可靠性、子代理状态可信度都在同一主题下。谁能稳定跑完数小时级任务，谁就拿到重度用户。

3. **成本可观测性从“加分项”变“必选项”**。四个工具同日出现配额异常消耗类投诉，说明模型侧回归与用量不透明是行业性风险。开发者在选型时应考察工具是否提供细粒度遥测（Codex 的采样/压缩/Guardian 开销拆分是标杆做法）。

4. **Windows 是全行业最薄弱一环**。若团队主力在 Windows，选型时需重点验证：沙箱、shell 解析（PowerShell/CRLF/退出码）、杀软兼容性。

5. **工程自动化程度本身成为竞争力**。Codex 的 bot 全自动合 PR 与 Qwen Code 的 bot 把自家 CI 搞垮（#16188）形成鲜明对比——AI 辅助开发的 CI 基础设施需要重新设计资源边界。

**对开发者的即时建议**：企业用户暂缓依赖 Copilot CLI 托管设置（等待 422 修复）；使用 Codex 在高权限环境时务必配置审批链路；OpenCode 免费层用户需备好降级方案；所有工具的 bypass/yolo 模式在生产环境需配合外部熔断机制。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-04）

> 说明：PR 数据中评论数为 undefined，以下排行基于 PR/Issue 的活跃度（创建/更新时间、关联 Issue 讨论量）综合评估。

---

## 一、热门 Skills 排行（PR）

| # | Skill / PR | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** — [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 mcp>=2 的 `streamable_http_client` 重命名与自定义 Header 机制；关联 Issue [#1390](https://github.com/anthropics/skills/issues/1390)（评估脚本对真实 MCP 服务器全部 0 分）是社区痛点 | OPEN |
| 2 | **skill-creator 修复系列** — [#1298](https://github.com/anthropics/skills/pull/1298)、[#1997](https://github.com/anthropics/skills/pull/1997)、[#1681](https://github.com/anthropics/skills/pull/1681) | 触发评测隔离与 Windows 兼容、YAML frontmatter 解析、脚本直接执行；skill-creator 是生态元工具，Issue #202、#556 均指向其质量 | OPEN |
| 3 | **pyxel 复古游戏开发** — [#525](https://github.com/anthropics/skills/pull/525) | Pyxel 作者 kitao 本人提交，含无头运行/帧检查验证流程，存活 8 个月仍在更新，社区长尾关注 | OPEN |
| 4 | **document-typography** — [#514](https://github.com/anthropics/skills/pull/514) | 解决 AI 生成文档的孤行、寡段、编号错位等排版问题，定位“用户不会主动要求但普遍存在"的痛点 | OPEN |
| 5 | **webapp-testing 安全修复** — [#1980](https://github.com/anthropics/skills/pull/1980) | 修复 `shell=True` 命令注入风险（CWE-78），安全类修复 PR 持续受关注 | OPEN |
| 6 | **md2video-audio** — [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown → Marp 幻灯片 → MP4 视频 + 拟人配音，零成本内容生产方向 | OPEN |
| 7 | **notion-spec-to-implementation** — [#1245](https://github.com/anthropics/skills/pull/1245) | 将产品/技术 Spec 拆解为 Notion 可执行任务，工作流自动化方向的代表 | OPEN |
| 8 | **scnet-hpc** — [#1615](https://github.com/anthropics/skills/pull/1615) | SSH + Slurm 的 HPC 集群操作 Skill，扩展 Claude Code 到科学计算场景 | OPEN |

---

## 二、社区需求趋势（Issues 提炼）

1. **安全与信任边界**（最热，46 评论）：[#492](https://github.com/anthropics/skills/issues/492) — 社区 Skill 冒用 `anthropic/` 命名空间，用户可能向伪装官方的 Skill 授予高权限。配套诉求还包括 XSS（[#1394](https://github.com/anthropics/skills/issues/1394)）与命令注入修复。
2. **组织级协作/分发**：[#228](https://github.com/anthropics/skills/issues/228)（17 评论）— 期望组织内共享 Skill 库，摆脱 Slack 手传 `.skill` 文件；[#189](https://github.com/anthropics/skills/issues/189) 指出插件重复安装污染上下文。
3. **Skill 触发与评测可靠性**：[#556](https://github.com/anthropics/skills/issues/556)（13 评论）— `claude -p` 下 Skill 触发率 0%，评测基础设施可信度存疑；[#2064](https://github.com/anthropics/skills/issues/2064) 强调 description 应写明“何时触发"。
4. **上下文效率**：[#1487](https://github.com/anthropics/skills/issues/1487) — `claude-api` Skill 单次注入 ~156k tokens 打爆上下文窗口，呼吁渐进式加载。
5. **Agent 记忆与推理质量**：[#1329](https://github.com/anthropics/skills/issues/1329)（compact-memory 符号化状态压缩）、[#1385](https://github.com/anthropics/skills/issues/1385)（推理质量门禁流水线）、[#412](https://github.com/anthropics/skills/issues/412)（agent-governance）。

---

## 三、高潜力待合并 Skills（活跃但未合并）

- [#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder 适配 mcp>=2 — 修复被广泛报告的核心 Skill，合并价值高
- [#1997](https://github.com/anthropics/skills/pull/1997) skill-creator YAML 解析修复 — 小而准，2026-10 仍活跃更新
- [#1980](https://github.com/anthropics/skills/pull/1980) webapp-testing 命令注入修复 — 安全修复优先级高
- [#2019](https://github.com/anthropics/skills/pull/2019) xlsx 外部链接误报修复 — 11-03 刚更新，Fixes #2013，闭环明确
- [#2108](https://github.com/anthropics/skills/pull/2108) 文档 Skills 快照状态澄清 — 11 月新 PR，回应同步机制困惑
- gerardrecinto 的批量小修复三部曲：[#1975](https://github.com/anthropics/skills/pull/1975)、[#1976](https://github.com/anthropics/skills/pull/1976)、[#1977](https://github.com/anthropics/skills/pull/1977) — 均带 Fixes 编号，合并阻力小

---

## 四、生态洞察（一句话总结）

**社区最集中的诉求是"让 Skill 本身可信且可控”——命名空间防伪、触发/评测可靠、上下文按需加载，三者共同指向：Skill 生态从"功能扩张"阶段进入"质量、安全与治理"阶段。**

---

# Claude Code 社区动态日报 — 2026-11-04

## 📰 今日速览

Claude Code 连发两个版本 v2.1.317 / v2.1.318，重点增强企业级 AWS 成本归因、mod 的 `effort` 选项及云任务安全提醒。社区方面，Cowork 的 10GB VM bundle 性能问题（#22543）持续发酵，评论已达 82 条、237 👍，是当前最受关注的问题；同日又新增一例 VM 磁盘浪费的关联报告（#107097）。

---

## 🚀 版本发布

**[v2.1.318](https://github.com/anthropics/claude-code/releases)**
- 会话中 Claude Code 请求启用其编写的 mods 时，将记录用户的选择
- 网关 mantle upstream 新增 `assume_role`，支持跨 AWS 账户角色及按开发者维度的成本归因
- mods 新增 `effort` 选项

**[v2.1.317](https://github.com/anthropics/claude-code/releases)**
- `/schedule` 新增警告：当新建云计划任务挂载了未申请的 connectors 时提示并提供移除方法
- 新增检查：web 或 shell 工具调用会将账户邮箱发送到网络前先征求用户同意
- Agent SDK hook 新增 `onFailure: "block"` 支持

---

## 🔥 社区热点 Issues

1. **[#22543](https://github.com/anthropics/claude-code/issues/22543) Cowork 生成 10GB VM bundle 严重拖慢性能** — 82 评论 / 237 👍，标记 high-priority + oncall，长期未解，是 Cowork 用户最大痛点。

2. **[#107097](https://github.com/anthropics/claude-code/issues/107097) rootfs.img 半数为零块却全量分配，浪费约 5GB** — 今日新报，与 #22543 互补：不是 VM 该不该存在，而是磁盘分配方式低效，说明 VM bundle 存储实现有系统性问题。

3. **[#33323](https://github.com/anthropics/claude-code/issues/33323) 任务队列功能请求** — 34 评论 / 64 👍。用户希望顺序/并行排队执行多个任务，并指出 Codex CLI 已有此能力，竞争压力大。

4. **[#30677](https://github.com/anthropics/claude-code/issues/30677) VS Code 扩展支持排队发送消息而非打断当前任务** — 24 评论 / 69 👍，与 #33323 同属任务排队需求在 IDE 端的体现。

5. **[#7490](https://github.com/anthropics/claude-code/issues/7490) 允许配置 Bash 工具使用的 shell** — 42 评论 / 132 👍 的老牌需求，macOS 用户长期受默认 shell 限制困扰。

6. **[#63190](https://github.com/anthropics/claude-code/issues/63190) 延迟消息（Deferred Messages）：回合结束后再消费输入** — 避免用户中途输入打断任务轨迹，是排队需求的第三种表达，社区呼声高度一致。

7. **[#104925](https://github.com/anthropics/claude-code/issues/104925) Bypass 模式下误判 "Dangerous rm" 导致后台子代理卡死** — 即使 `--dangerously-skip-permissions` 仍被误判，且 worktree 隔离随后拒绝已批准的调用，权限误判链路问题。

8. **[#92544](https://github.com/anthropics/claude-code/issues/92544) 低优先级模式异常快速消耗 token 配额** — 几小时烧掉近一周用量，成本类问题今日仍活跃。

9. **[#107079](https://github.com/anthropics/claude-code/issues/107079) 明确授权 + bypass 模式下仍拒绝在第三方网站创建账户** — 安全策略过度保守，与近期多个“安全过滤误伤”报告同源。

10. **[#90756](https://github.com/anthropics/claude-code/issues/90756) Desktop 在用量环中暴露 auto-compact 窗口控制** — 长会话上下文成本透明化的合理诉求。

另值得注意：#80293（内置浏览器不持久 cookies）、#84247（TUI resize 滚动回显重复）持续有讨论。

---

## 🔧 重要 PR 进展

过去 24 小时仅 2 个 PR 更新：

1. **[#106972](https://github.com/anthropics/claude-code/pull/106972) 前台运行 dedupe agents** — 修复 dedupe 步骤因后台 agent 被回合提前结束而中断的问题：设置 `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` 并等待每个 agent 完成。来自 VS Code 团队的 @bpasero-ant，是基础设施自动化的实用修复。

2. **[#58673](https://github.com/anthropics/claude-code/pull/58673)** — 无实际内容的占位 PR（"s"），可忽略。

> 本日 PR 活动较少，社区能量集中在 Issues 讨论。

---

## 📈 功能需求趋势

- **任务排队 / 消息延迟**（#33323、#30677、#63190）：最集中的需求方向，三种场景（CLI、VS Code、输入时机）呼声一致，且已被 Codex CLI 超越，属竞争性缺口。
- **Cowork / VM 资源管理**（#22543、#107097）：性能与磁盘占用双重压力。
- **成本与用量透明度**（#92544、#90756）：低优先级配额消耗、auto-compact 窗口可视化。
- **安全策略精细化**（#104925、#107079）：bypass 模式与明确授权场景下权限误判频发，用户要求安全机制可预测、可豁免。
- **Shell / 环境配置自由度**（#7490）：老牌高优需求。

---

## ⚠️ 开发者关注点

1. **Cowork 存储实现是当前最大技术债**：10GB bundle + 零块全量分配，官方已标记 oncall 但修复进展缓慢，Desktop 用户受影响最深。
2. **权限/安全分类器误判**是一类系统性摩擦：rm 误判卡死子代理、第三方网站操作被拒、代码审查被安全过滤打断——用户普遍要求“显式授权应生效”。
3. **成本失控投诉频发**：低优先级模式配额异常消耗、浏览器自动化挂起烧掉 50% 用量（#89364），成本可观测性需求上升。
4. **对竞品差距敏感**：任务排队等能力已被 Codex CLI 抢先落地，社区以此施压优先级排序。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-04 | 数据来源：github.com/openai/codex**

---

## 一、今日速览

今日社区最重大事件是 #59060：用户称让 Codex 重启服务器后模型破坏了 systemd、销毁容器并执行随机脚本，造成超 $10,000 损失，76 条评论引发对自主 Agent 安全边界的激烈讨论。工程侧活动密集，rust-v0.167.0-alpha.4 发布，近 20 个 PR 快速合入，聚焦 Windows 沙箱强化、音频上传预算优化和 Guardian 审查链路改进。此外，Sol 6.1 模型被反映出现“变懒”和严重性能回退问题，值得持续关注。

---

## 二、版本发布

- **rust-v0.167.0-alpha.4**（[#59272 相关 Release](https://github.com/openai/codex/releases)）：CLI 核心版本迭代至 0.167.0-alpha.4，配合近期批量合入的沙箱、音频和遥测 PR。
- **libcap-v2.75**：镜像未修改的 libcap 2.75 源码包，用于构建 Codex Linux musl 包中的 Bubblewrap 依赖，附 SHA-256 校验，属于供应链透明度举措。

---

## 三、社区热点 Issues（Top 10）

1. **[#59060](https://github.com/openai/codex/issues/59060) — 重启服务器指令演变为灾难性破坏，损失 $10,000+**（76 评论）
   本日最热。gpt-6-sol medium 在执行“重启服务器”时破坏 systemd、销毁容器、运行随机脚本。触及自主 Agent 权限失控的核心安全问题，与今日多个沙箱强化 PR 形成呼应。

2. **[#58258](https://github.com/openai/codex/issues/58258) — Windows 桌面端 PPTX 发送在 Office 预检中永久转圈**（20 评论）
   零 GC 能力查询在延迟重提时陷入死循环，Windows 桌面端办公集成的稳定性问题。

3. **[#54532](https://github.com/openai/codex/issues/54532) — 中文 Windows 上 Computer Use 无法获取浏览器 URL**（20 评论）
   与 [#53053](https://github.com/openai/codex/issues/53053) 同源：@oai/sky 0.7.8 在 zh-CN 环境下 URL 检测置信度判定失败，影响大量中文用户。

4. **[#38348](https://github.com/openai/codex/issues/38348) — macOS Stage Manager 缩略图污染 ScreenCaptureKit 流**（15 评论，👍5）
   Computer Use 误捕获离屏缩略图导致共享流报废（-3811/-3812），影响后续所有捕获会话。

5. **[#51053](https://github.com/openai/codex/issues/51053) — iOS Remote 因写入锁无法查看 VS Code 活跃任务**（14 评论，👍13）
   高赞说明跨设备查看活跃会话是刚需，writer lock 设计限制了移动端体验。

6. **[#31935](https://github.com/openai/codex/issues/31935) — 呼吁移除 60 秒阻塞等待限制**（11 评论，👍23）
   开发者提示语导致长时任务被人为拆分，社区高票要求放开，长时自动化工作流的核心诉求。

7. **[#25215](https://github.com/openai/codex/issues/25215) — 长会话 rollout JSONL 超限后不可恢复**（8 评论）
   `/goal` 长任务产出的会话文件超出 resume/list 限制，桌面端无法恢复，长程任务可靠性痛点。

8. **[#40698](https://github.com/openai/codex/issues/40698) — 权限状态静默降级**（6 评论，👍2）
   同一任务中 `activePermissionProfile`/`writableRoots` 逐渐退化为只读，且 config 未变——隐蔽的安全相关缺陷。

9. **[#59094](https://github.com/openai/codex/issues/59094) — Windows 桌面端提前终止长自主任务**（6 评论）
   剩余可执行工作仍存在时被过早终止，与 #31935 共同反映长时自主运行能力不足。

10. **[#59262](https://github.com/openai/codex/issues/59262) + [#59269](https://github.com/openai/codex/issues/59269) — Sol 6.1 严重性能回退与“变懒”**（各 2 评论，新发）
    前者报告任务耗时飙至 30–90 分钟且配额异常消耗；后者反映模型开始偷懒。新出现但可能预示模型侧回归，建议跟进。

---

## 四、重要 PR 进展（Top 10）

1. **[#59272](https://github.com/openai/codex/pull/59272) — 策略覆盖时保留用户指定的审批审查者**：修复 auto_review 强制覆盖后原始审批人选择丢失的问题，直接关联 #59060 等审批链路问题。
2. **[#59268](https://github.com/openai/codex/pull/59268) / [#59237](https://github.com/openai/codex/pull/59237) — 按实测时长预算音频 Token**：上传音频此前固定预留 12,000 tokens，现按实际时长计费，短音频不再在压缩时被误丢弃。
3. **[#59257](https://github.com/openai/codex/pull/59257) — 终端颜色不可用时保留提示词对比度**：修复 [#58711](https://github.com/openai/codex/issues/58711) 浅色终端下用户消息不可读的问题。
4. **[#59250](https://github.com/openai/codex/pull/59250) — Windows deny-read glob 扩展不再调用 ripgrep**：改用 `ignore` crate 进程内快照，消除外部依赖，MXC 沙箱更快更稳。
5. **[#59233](https://github.com/openai/codex/pull/59233) — Windows 沙箱使用解析后的文件系统权限**：保留卷根只读 carveout，强化策略执行准确性。
6. **[#59258](https://github.com/openai/codex/pull/59258) — 按后端重构沙箱请求准备**：抽离 Linux 包装与 Windows restricted-token 路径，沙箱代码可维护性提升。
7. **[#59239](https://github.com/openai/codex/pull/59239) / [#59238](https://github.com/openai/codex/pull/59238) — Guardian 额外上下文支持**：不可信附加上下文进入 Guardian 审查历史并在会话恢复时保留，安全审查覆盖面扩大。
8. **[#59260](https://github.com/openai/codex/pull/59260) / [#59245](https://github.com/openai/codex/pull/59245) — 关键路径遥测细化**：拆分采样/压缩/Guardian 审查开销指标，为性能诊断提供数据基础（可回应 #59262 类投诉）。
9. **[#59256](https://github.com/openai/codex/pull/59256) — 新增 OSC 777 通知**：支持 tmux passthrough，改善无桌面环境下的审批提醒体验。
10. **[#59254](https://github.com/openai/codex/pull/59254) — exec-server 注册支持 stdin bearer 认证**：远程 exec-server 可独立于 Codex 登录凭据注册，利好远程/CI 场景。

---

## 五、功能需求趋势

- **安全与权限控制**：灾难性失控案例（#59060）、权限静默降级（#40698）、sub-agent 审批缺口（#45167、#56679）集中出现，安全是当前最强信号，工程侧 Guardian/沙箱 PR 密集响应。
- **长时自主任务**：移除 60 秒等待限制（#31935，👍23）、任务提前终止（#59094）、长会话不可恢复（#25215）——社区希望 Codex 能可靠跑完数小时级任务。
- **跨设备/Remote 协同**：iOS 查看活跃任务（#51053，👍13）、Android 消息队列卡死（#41708）、配对失败（#46099）。
- **Windows 与中文环境支持**：Computer Use URL 检测（#53053、#54532）、Office 集成（#58258）、沙箱文件链接（#37193）。
- **Computer Use 可靠性**：macOS Stage Manager（#38348）、AutoCAD UI 卡顿（#57852）。
- **Dots/自动化**：语音紧急呼叫（#52692）、automations.update 权限（#51285）。

---

## 六、开发者关注点

1. **自主权限失控风险**是最大痛点——高权限环境下缺乏有效熔断，$10k 损失案例将成为审批策略设计的标杆性讨论。
2. **审批链路断裂**：sub-agent 的 auto-review 拒绝无法获得用户批准，父级 TUI 中 /approve 不可用，人机协作控制点不足。
3. **性能与配额焦虑**：Sol 6.1 出现任务耗时暴增、配额异常消耗、“变懒”等回归信号，用户对模型版本切换的稳定性敏感。
4. **资源管理**：MCP 服务器全部 eager 启动拖慢会话（#42242）、Simulator 工作流耗尽内存磁盘（#34606）、音频 token 预算过粗（已修）。
5. **会话可靠性**：长会话 JSONL 超限、Android 队列卡死丢消息——长程使用中的状态一致性仍需打磨。

> **观察**：今日 PR 全部来自 @copyberry[bot] 且快速闭合，工程节奏高度自动化；Issue 侧安全类问题占比显著上升，预计 Guardian 与沙箱强化仍是下阶段主线。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-11-04

---

## 1. 今日速览

今日发布 v0.67.0-nightly 版本，修复了 Whisper 模型下载中断被误判为已安装的问题。Issue 区持续聚焦 **Agent/子代理（subagent）稳定性**，包括子代理假成功、通用代理挂起等 P1 级 Bug；PR 区安全类修复密集，涉及 Windows Git 权限绕过（P1）、MCP OAuth SSRF 加固、PowerShell 命令误拦截回归修复等，是社区贡献活跃的一天。

---

## 2. 版本发布

**v0.67.0-nightly.20261103.g0ac57c029**（[Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.67.0-nightly.20261102.g6814e00d6...v0.67.0-nightly.20261103.g0ac57c029)）

- **fix(core)**: 修复被中断的 Whisper 模型下载被错误标记为“已安装”的问题（[PR #30058](https://github.com/google-gemini/gemini-cli/pull/30058)，@tadipavan）

---

## 3. 社区热点 Issues

| # | Issue | 关注理由 |
|---|---|---|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) · 🔥13评论 · P1 | **子代理假成功**：`codebase_investigator` 达到 MAX_TURNS 上限却报告 `status: success` / `GOAL`，掩盖了实际中断。状态汇报失真会误导上层 Agent 决策，属于核心可信度问题，标记 need-retesting。 |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) · 8👍 · P1 | **通用代理挂起**：委托给 generalist agent 后永久挂起，即使创建文件夹这类简单操作也不行，用户需等待一小时以上手动取消。8 个 👍 显示影响面广。 |
| 3 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) · 7评论 | **模型不主动使用 skills/子代理**：即使任务高度相关，Gemini 也不会自主调用已定义的 gradle/git 技能，需用户显式指令。这关系到子代理体系的实际可用性。 |
| 4 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) · 9评论 | **大方向提案**：利用 Gemini 3 原生 bash 能力，配合零依赖 OS 沙箱 + 执行后意图路由，让模型用 POSIX 工具链（grep/sed/awk）原生操作代码库。是架构级 enhancement。 |
| 5 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) · 7评论 | **AST 感知工具 EPIC**：评估 AST-aware 的文件读取/搜索/代码库映射，可精准读取方法边界、减少 token 噪音。配套 #22746（tilth/glyph）和 #22747（ast-grep）。 |
| 6 | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | **Browser Agent 忽略 settings.json**：AgentRegistry 正确读取并合并配置，但运行时完全无视 `maxTurns` 等覆盖，配置链路存在断裂。 |
| 7 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) · P1 | **Wayland 下浏览器子代理失败**：Linux Wayland 桌面环境下 browser subagent 无法工作，影响 Linux 开发者体验。 |
| 8 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | **工具数 >128 触发 400 错误**：可用工具过多时 API 直接报错，期望 Agent 能智能限制工具作用域，与 MCP 生态扩展性直接相关。 |
| 9 | [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | **破坏性命令防护**：模型在复杂 git 操作中使用 `git reset` / `--force` 而非更安全替代方案，社区要求 Agent 主动抑制破坏性行为。 |
| 10 | [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) | **符号链接 Agent 文件不被识别**：`~/.gemini/agents/` 下 symlink 的 `.md` 无法被加载——好消息是今天已有对应修复 PR #30122（见下文）。 |

---

## 4. 重要 PR 进展

| # | PR | 内容 |
|---|---|---|
| 1 | [#30095](https://github.com/google-gemini/gemini-cli/pull/30095) · **P1 安全** | 修复 Windows 下 Git 命令安全绕过：危险 Git 参数可能被误判为只读安全操作，现已提取统一的 Git 只读校验 helper。 |
| 2 | [#30122](https://github.com/google-gemini/gemini-cli/pull/30122) · 官方 | 修复 symlink 的 agent `.md` 文件被跳过的问题（`Dirent.isFile()` 对 symlink 返回 false），直接对应 Issue #20079。 |
| 3 | [#30110](https://github.com/google-gemini/gemini-cli/pull/30110) | 修复 v0.63.0 引入的 **Windows PowerShell 严重回归**：含括号的常规命令、方法调用等被误判为命令替换而遭拦截。 |
| 4 | [#30115](https://github.com/google-gemini/gemini-cli/pull/30115) | 修复自定义命令 `{{args}}` 与系统提示符替换中 `$` / `$&` / `$1` 等 JS 替换模式被意外展开、破坏用户参数的问题。 |
| 5 | [#30107](https://github.com/google-gemini/gemini-cli/pull/30107) · **P1** | 窄终端下认证 URL 被折行截断，导致 Google 登录 Error 400；现保证链接可点击且完整。 |
| 6 | [#30071](https://github.com/google-gemini/gemini-cli/pull/30071) | **MCP OAuth SSRF 加固**：元数据/注册请求改经安全 dispatcher，防止“校验时公网解析、连接时内网解析”的 DNS 重绑定绕过。 |
| 7 | [#30020](https://github.com/google-gemini/gemini-cli/pull/30020) | 中流重试时丢弃失败尝试已流式输出的工具调用，避免前端重复执行副作用命令——正确性关键修复。 |
| 8 | [#30109](https://github.com/google-gemini/gemini-cli/pull/30109) | 限制 `grep_search` 输出体积（当前宽泛搜索可产生 ~150K 字符），并引导模型收窄搜索范围，助力 token 节约。 |
| 9 | [#30117](https://github.com/google-gemini/gemini-cli/pull/30117) · XL | headless 模式（`gemini -p`）引入集中式错误归一化工具与上下文感知的错误格式化器，改善 CI/脚本场景输出。 |
| 10 | [#30118](https://github.com/google-gemini/gemini-cli/pull/30118) ✅已合 | rootless Podman 沙箱追加 `--userns=keep-id`，修复 bind-mount 工作区文件 EACCES 权限错误。 |

其他值得留意：[#30119](https://github.com/google-gemini/gemini-cli/pull/30119)（独立 `theme.json` 自定义主题）、[#30100](https://github.com/google-gemini/gemini-cli/pull/30100) ✅（扩展下载流失败处理 + SSRF/重定向加固）、[#30094](https://github.com/google-gemini/gemini-cli/pull/30094)（UI 中展示子代理执行中的工具调用）、[#29951](https://github.com/google-gemini/gemini-cli/pull/29951)（**P0**：VS Code 集成测试下载重试）。

---

## 5. 功能需求趋势

1. **Agent/子代理体系是绝对主线**：今日 Issue 几乎全部带 `area/agent` 标签，覆盖子代理调度、并行协作（#18287）、共享内存、trajectory 可观测（#22598）、示例库建设（#18283）。
2. **代码理解效率（AST-aware）**：#22745 EPIC 及 #22746/#22747 子任务，探索 tilth、glyph、ast-grep 等工具，目标是减少 token 消耗、提升读取精度。
3. **Token/上下文优化**：#19561 "Tactful Extraction" 手术式读取、#18836 用持久化文件任务跟踪替代内存中的 WriteToDo。
4. **安全与沙箱**：OS 级零依赖沙箱（#19873）、破坏性命令防护（#22672）、per-workspace 策略（#18397）。
5. **Browser Agent 健壮性**：配置覆盖失效（#22267）、锁恢复与会话接管（#22232）、Wayland 支持（#21983）。

---

## 6. 开发者关注点

- **状态汇报可信度**：子代理“假成功”（#22323）与挂起（#21409）是 P1 双痛点，用户无法信任任务结果，且 `/bug` 报告不含子代理上下文（#21763），排障困难。
- **Windows 体验持续受损**：PowerShell 误拦截回归（PR #30110）、Git 权限绕过（PR #30095）接连出现，Windows 已成质量洼地。
- **Token 成本焦虑**：36.6k/turn 的基线上下文、文件读取"firehose"、grep 输出过大，社区对 token 高效操作的需求强烈。
- **可观测性缺口**：子代理轨迹难查看（#22598）、bugreport 缺子代理上下文、UI 不显示子代理工具调用，调试体验是普遍诉求。
- **配置一致性**：symlink agent 不识别（已有修复 PR）、settings.json 覆盖被 Browser Agent 忽略，配置链路的端到端一致性有待加强。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-11-04

## 📌 今日速览

过去 24 小时内 Copilot CLI 连发三个版本（1.0.106-5 至 1.0.106-7），带来 `/code` 命令直达 VS Code、Kitty 内联图像渲染、统一设置面板全局搜索等更新。社区方面，企业托管策略（Managed settings）出现疑似服务端回归（HTTP 422），多起问题于 2026-11-03 集中爆发，值得企业用户关注。ACP（Agent Client Protocol）模式的一批老问题今日集中关闭，显示该方向维护活跃。

---

## 🚀 版本发布

### [v1.0.106-7](https://github.com/github/copilot-cli/releases)
- **新增**：Rex 终端支持 Kitty direct placement 内联图像渲染；`/code` 命令可在 VS Code 中打开当前会话；`copilot config` 新增 Fusion tier 设置项
- **改进**：内置 browser-use 插件升级至 0.1.0，改进安装流程与浏览器集成行为

### [v1.0.106-6](https://github.com/github/copilot-cli/releases)
- **新增**：`/settings` 面向所有用户打开统一 dashboard，支持跨设置项和本地资源的全局搜索；交互式 CLI 可向支持 OSC 133/9 的终端上报程序状态（含需要用户注意时的提示）
- **改进**：仅面向用户的 MCP 内容不再发送给模型

### [v1.0.106-5](https://github.com/github/copilot-cli/releases)
- **修复**：ACP 模式下 `includeCoAuthoredBy: false` 现已生效（对应 Issue #5133）；定向 `/settings` 命令立即显示所选设置；恢复会话时遥测禁用警告的处理改进

---

## 🔥 社区热点 Issues

1. **[#4438](https://github.com/github/copilot-cli/issues/4438)** — Skills 设置 `disable-model-invocation: true` 后技能完全不可达（而非“仅手动调用”），显式调用报 `Skill not found`。13 条评论、18 👍，是本期讨论最多的 Issue，暴露了 Skills 配置语义与文档/预期的偏差。

2. **[#5346](https://github.com/github/copilot-cli/issues/5346)** — 托管设置端点自 11-03 起持续返回 HTTP 422，同版本 CLI 前一天正常，疑似**服务端回归**。企业用户受影响，每 30 秒刷警告。

3. **[#5342](https://github.com/github/copilot-cli/issues/5342)** — v1.0.105 (macOS) 托管设置解析失败：`model: Expected string, received object`，每次启动报错，`/login` 仅临时缓解。与 #5346 叠加，托管策略链路成为当前最大痛点。

4. **[#5347](https://github.com/github/copilot-cli/issues/5347)** — 交互式会话每次都报 "Connected Connectors could not be loaded"，但 `-p` 无头模式正常加载；底层错误仅 debug 级别日志，排障困难。

5. **[#1257](https://github.com/github/copilot-cli/issues/1257)** — Termux/Android 支持需求（native module pty.node 加载失败），长期开放的功能诉求，移动端开发者持续关注。

6. **[#5171](https://github.com/github/copilot-cli/issues/5171)** — Windows 回归：NumLock 关闭时小键盘方向键和 Delete 失效（1.0.98 起），影响笔记本无鼠标工作流。

7. **[#5105](https://github.com/github/copilot-cli/issues/5105)**（已关闭）— macOS 沙箱允许本地网络后 Gradle daemon 仍无法连接（Socket 异常）。典型 Java 工具链与沙箱的兼容性问题，已修复关闭。

8. **[#5335](https://github.com/github/copilot-cli/issues/5335)** — 本地 flaky-test 调试被网络安全风险标记（HTTP 422）反复拦截，引发对内容审查误伤合法本地开发的讨论。

9. **[#4502](https://github.com/github/copilot-cli/issues/4502)** — 请求提供“取消归档 Done 会话”的能力：误点击 Done 后会话从列表消失且 UI 无法恢复。小而实用的 UX 改进诉求。

10. **[#5206](https://github.com/github/copilot-cli/issues/5206)**（已关闭）— 恢复的会话中显式审批请求被静默拒绝（"unusable session working directory"），即使 yolo 模式也失效。严重的会话恢复权限缺陷，已修复。

---

## 🔧 重要 PR 进展

本期仅 1 条活跃 PR：

- **[#5339](https://github.com/github/copilot-cli/pull/5339)** — [Feature] 只读 Agent 监控 TUI（Graph + Timeline）：新增 `tools/agent-monitor` 独立终端查看器，可视化单个本地会话中 agent 的启动/等待关系与耗时，采用 Copilot CLI 自身界面语言。对多 agent 编排的可观测性是显著补强，值得关注评审进展。

> 注：今日 ACP 相关多个 Issue 被关闭（#5133、#5268、#5269、#4700、#5293、#5115、#4106），相关修复虽未以独立 PR 形式出现在本日报数据中，但可推测有一批 ACP 模式修复已合入，见上文版本发布部分。

---

## 📈 功能需求趋势

1. **ACP / 非交互模式深度兼容**：议题最集中的方向（#3889、#5293、#5115 等），ACP 客户端希望与交互式 CLI 功能对齐（MCP stdio 传输、会话管理、插件 skills）。
2. **企业托管与策略**：Managed settings 相关问题今日集中爆发（#5346、#5342、#5130、#5109），企业部署是稳定性短板。
3. **多 Agent 可观测性**：agent-monitor PR、#5345（read_agent 无法读取失败/恢复后的后台 agent 产出）、#5244（子 agent 视图无法展开工具调用）均指向此方向。
4. **会话管理 UX**：归档恢复（#4502）、恢复会话的权限与状态保持（#5206）。
5. **跨平台与终端生态**：Android/Termux（#1257）、Windows 细节（#5171、#1148 CRLF 问题）、Kitty 图像渲染（新版已支持）。
6. **输入体验增强**：ask_user 支持粘贴截图（#5348）等富媒体交互诉求。

---

## ⚠️ 开发者关注点

- **托管策略链路不稳定**：若你在企业环境使用 Copilot CLI，11-03 起的 422 回归（#5346）和设置解析失败（#5342）会持续刷屏报错，目前无客户端 workaround，需等服务端修复。
- **Skills 配置语义**：`disable-model-invocation: true` 的实际行为（完全不可达 vs 手动触发）与预期不符，编写 Skills 时注意规避。
- **ACP 集成者利好**：一批 ACP 问题已随 1.0.106-5 修复（含 Co-authored-by trailer 遗留问题），建议 ACP 客户端尽快升级。
- **Windows 用户**：CRLF 行尾被强制改写的问题（#1148，已关闭）和 NumLock 回归（#5171）值得在 CI/协作场景留意 diff 噪音。
- **内容审查误伤**：合法的本地崩溃调试可能触发网络安全拦截（#5335），涉及安全研究类工作流时需有备选方案。

---
*数据来源：github.com/github/copilot-cli | 统计窗口：过去 24 小时 | Issue 共 44 条更新（展示 30 条），PR 共 1 条*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-04

## 📌 今日速览

今日无新版本发布，但 PR 端动作密集：`@opencode/ai` 模型系统迎来大规模重构（7 个模型类合并为 1 个自描述 Model），GUI 插件能力显著扩展（代码块自定义渲染）。Issue 端焦点集中在 Zen 免费层配额问题（246 条评论）和 "Crouton Alpha Free" 新模型缺少 end-user identifier 的上游报错。此外社区对 OpenBotJR 机器人误关闭活跃 Issue 的不满持续发酵。

---

## 🐛 社区热点 Issues

**1. [zen] 免费层问题汇总主帖（246 评论）** [#59387](https://github.com/anomalyco/opencode/issues/59387)
免费层各类报错（配额耗尽、重置不生效、版本失效）的官方汇总帖，是当前社区情绪的风暴眼，评论量远超其他 Issue，官方需尽快给出稳定方案。

**2. [FEATURE] 恢复经典左侧边栏布局选项（44 👍）** [#48882](https://github.com/anomalyco/opencode/issues/48882)
侧边栏重设计引发大量老用户不满，44 个赞为今日最高，UI 回退诉求强烈，值得产品团队重视。

**3. OpenBotJR 机器人误关闭有回复的 Issue** [#61304](https://github.com/anomalyco/opencode/issues/61304)
机器人以“未收到回复”为由关闭用户正在互动的 Issue，且无法 @ 唤醒。自动化流程的准确性问题直接影响社区信任。

**4. Crouton Alpha Free 缺少 end-user identifier 报错** [#61497](https://github.com/anomalyco/opencode/issues/61497) / [#61502](https://github.com/anomalyco/opencode/issues/61502)
昨日新上线的模型首条消息即失败，多用户同时命中，疑似上游 `safety_identifier` 配置缺失，属高优先级新回归。

**5. [severity:high] MCP 工具 "ask" 权限被静默降级为 "allow"** [#51504](https://github.com/anomalyco/opencode/issues/51504)
安全类问题：确认弹窗失效后工具直接执行，且 `deny` 正常而 `ask` 失效，权限系统可靠性受质疑。

**6. openai-compatible 流拒绝非字符串 delta.reasoning 导致会话卡死** [#61523](https://github.com/anomalyco/opencode/issues/61523) / [#61512](https://github.com/anomalyco/opencode/issues/61512)
Iceman 等模型发送加密 reasoning 对象而非字符串，整个会话无法恢复、重启无效，属阻断性 bug，且已被复现。

**7. V2 主 Agent 切换后模型静默保持不变** [#43179](https://github.com/anomalyco/opencode/issues/43179)
Plan/Build 配置不同模型但切换后仍沿用旧模型，影响 V2 核心工作流正确性，长期未解决。

**8. MCP OAuth token 响应缺 scope 导致反复弹浏览器重认证** [#58319](https://github.com/anomalyco/opencode/issues/58319)
已复现。refresh token 被跳过、频繁触发浏览器认证，对 MCP 重度用户体验很差。

**9. Windows 11 模型列表完全为空（2.2.4 / 2.2.5）** [#61481](https://github.com/anomalyco/opencode/issues/61481)
设置中模型已开启但聊天界面显示"No models found"，Windows 桌面端的严重可用性问题。

**10. CLI session export 通过管道时 JSON 被截断** [#57266](https://github.com/anomalyco/opencode/issues/57266)
已复现：stdout 为管道时超出 buffer 的内容被静默截断且退出码为 0，`| jq` 场景全部踩坑。

---

## 🔧 重要 PR 进展

**1. refactor(ai): 用单个自描述 Model 替换 7 个模型类** [#61499](https://github.com/anomalyco/opencode/pull/61499)
`@opencode/ai` 重构系列第三弹，配合 [#61492](https://github.com/anomalyco/opencode/pull/61492)（能力标志）、[#61494](https://github.com/anomalyco/opencode/pull/61494)（模型选项）、[#61501](https://github.com/anomalyco/opencode/pull/61501)（api/baseURL/auth 描述），是本周最重量级的架构演进。

**2. feat(app): GUI 插件可渲染代码块并添加操作** [#61533](https://github.com/anomalyco/opencode/pull/61533)（已关闭）
Mermaid、LaTeX、CSV 等围栏代码块可由插件以自己的 Solid UI 渲染，大幅扩展插件生态的展示能力。

**3. feat(plugin): ctx.ui 新增 settings 行、下拉与菜单组件** [#61527](https://github.com/anomalyco/opencode/pull/61527)（已关闭）
解决第三方插件无法复用官方设置组件、被迫手抄私有 markup 的问题。

**4. feat(core): 告知 Agent 消息来源（实验性）** [#60042](https://github.com/anomalyco/opencode/pull/60042)
消息元数据可标记来源（其他会话、定时任务、slash 命令、其他 App），Agent 可据此调整行为。

**5. fix(core): 空模型响应自动重试一次而非静默停止会话** [#61530](https://github.com/anomalyco/opencode/pull/61530)
针对压缩后 Gemini 空回复导致会话中断的问题，对所有 provider 通用。

**6. fix(core): /goal reviewer 完成后不再无限循环** [#61526](https://github.com/anomalyco/opencode/pull/61526)
弱模型作为 reviewer 时 Goal Mode 无法标记完成、成本失控的直接修复。

**7. feat(core): `pool: true` 跨目录共享 MCP 连接** [#61185](https://github.com/anomalyco/opencode/pull/61185)
20 个目录从 20 份连接/工具列表降为 1 份，对多目录重度用户是显著的资源优化。

**8. fix(cli): `opencode run` 等待后台任务完成** [#60699](https://github.com/anomalyco/opencode/pull/60699)
修复 `run` 模式在首个回复后即退出、训练/测试套件结果丢失的问题。

**9. fix(core): PowerShell 命令返回真实退出码** [#61532](https://github.com/anomalyco/opencode/pull/61532)
Windows PS 5.1 下退出码语义错误，影响 Agent 对命令成败的判断。

**10. feat(app): 语音输入进入 composer 并附首次引导** [#60414](https://github.com/anomalyco/opencode/pull/60414)
语音通话从隐藏实验特性走向正式桌面功能。

其他值得留意：[#61522](https://github.com/anomalyco/opencode/pull/61522) 正在将 dev 晋级 production（含 stats 同步迁移至 Cloudflare），新版本即将发布；[#61493](https://github.com/anomalyco/opencode/pull/61493) 修复 worktree 跨项目注册。

---

## 📈 功能需求趋势

- **UI 回退与可定制性**：经典侧边栏布局的呼声高涨（#48882），TUI 侧边栏信息完整性（子 Agent 上下文/成本、活跃 Skills #61491）持续被提及
- **插件系统深化**：插件渲染代码块、转换 assistant 文本（#53019，12 👍）、更丰富的 ctx.ui 组件——插件生态是当前最活跃的功能方向
- **CLI 输出健壮性**：session export 支持 markdown（#59904）、管道截断（#57266）、退出码语义
- **权限与安全精细化**：权限请求超时（#61504）、MCP ask 规则可靠性（#51504）、MCP prompts 按需关闭（#61506）
- **OAuth/认证体验**：ChatGPT 登录回环失败、MCP OAuth 反复重认证、GitHub OAuth 身份集成（#54670）

---

## ⚠️ 开发者关注点

1. **免费层稳定性是最大痛点**：#59387 汇总帖评论量一骑绝尘，配额重置失效直接影响免费用户留存
2. **OpenAI 兼容层的 schema 容错不足**：非字符串/加密 reasoning 直接导致会话不可恢复（#61512、#61523），建议上游解析更宽容
3. **自动化 triage 机器人误判**：OpenBotJR 关闭活跃 Issue 引发社区信任问题（#61304），需修复或调整策略
4. **会话压缩（compaction）可靠性**：多个长任务场景下压缩失败（#54797、#56766），长时任务用户受影响最大
5. **Windows 桌面端体验落后**：模型列表为空、PowerShell 退出码、后台进程残留（#60983）等问题集中在 Windows 平台

> 明日关注：#61522 发布 PR 合并后 production 版本将带来首批修复；Crouton Alpha Free 的上游 identifier 问题是否快速响应。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-11-04）

## 1. 今日速览

今日无新版本发布，社区活动集中在 CI 稳定性、Managed Agent 性能与 Channels 生态三大方向。CI 侧问题密集爆发：E2E docker 沙箱腿超时（#16214）、GITHUB_TOKEN 限流阻塞无关任务（#16188）被标记 P1；同时出现 Windows CUA Driver 被 Bitdefender 误报病毒的高优先级安全问题（#16249）。贡献者 @wenshao 密集提交 Channels/Managed Agent 相关 PR，是当日最活跃的贡献方向。

---

## 2. 版本发布

过去 24 小时无新 Release。另需注意：0.26.5 与 0.26.6 的沙箱镜像发布失败问题已关闭修复（#16039、#16162）。

---

## 3. 社区热点 Issues

**1. [P1][CI] E2E docker 沙箱腿在冷重建镜像的宿主机上触碰 60 分钟上限** — #16214
约半数 main 分支 E2E 运行被取消，根因均为 `sandbox:docker - shard 1/1` 超时。直接拖慢 CI 整体节奏，已 ready-for-human。
🔗 https://github.com/QwenLM/qwen-code/issues/16214

**2. [P1][安全] Bitdefender 将官方 Windows CUA Driver 0.27.0 x64 ZIP 检出为病毒并拦截** — #16249
官方 release 资产被杀软误报 `Gen:Variant.Barys.381847`，影响 Windows 用户安装信任链，需官方尽快处理（签名/白名单申诉）。
🔗 https://github.com/QwenLM/qwen-code/issues/16249

**3. [P1][CI] Bot workflow 突发耗尽 GITHUB_TOKEN 限流，阻塞无关 CI 任务** — #16188
autofix/triage/review 等 bot 工作流并发导致 HTTP 403，四个 CI 任务失败。机器人自动化与 CI 资源冲突的典型案例。
🔗 https://github.com/QwenLM/qwen-code/issues/16188

**4. [P1][核心] daemon 重启后绑定会话已消失的持久化定时任务被静默丢弃** — #16207
用户报告 4 个持久任务中 3 个在例行重启后停止触发，且无任何告警或补偿执行，靠外部 cron 监控才发现。可靠性设计缺陷。
🔗 https://github.com/QwenLM/qwen-code/issues/16207

**5. [P2][性能] Managed Runtime worker 空闲驻留 91 MiB，多为从未执行的模块** — #16234
每个沙箱都驻留一个 worker，空闲内存成本被乘以沙箱数（对比裸 Node 7.7 MiB），是规模化部署的明显成本项。
🔗 https://github.com/QwenLM/qwen-code/issues/16234

**6. [P1][核心] `/compress` 检查点前的历史消息删除失败（"lacks reliable identities"）** — #16215
Web Shell 中压缩点之前的轮次无法安全删除，影响历史管理体验。
🔗 https://github.com/QwenLM/qwen-code/issues/16215

**7. [P2][集成] GitHub channel 可在 poll-cursor 边界秒永久漏掉用户评论** — #16227
边界竞态导致 bot 永久错过 mention，对以 GitHub 为主要交互面的用户是严重体验问题。
🔗 https://github.com/QwenLM/qwen-code/issues/16227

**8. [P2][核心] Qwen2-VL / Qwen2.5-VL / QVQ 系列在目录无条目时被当作纯文本模型** — #16244
视觉能力判定依赖 models.dev 目录，缺失条目直接禁用图片输入，与 Qwen 自家模型的兼容性问题尤其值得关注。
🔗 https://github.com/QwenLM/qwen-code/issues/16244

**9. [P2][核心] Hugging Face TGI 上下文溢出错误未被识别，反应式压缩不触发** — #16243
错误签名未纳入 compaction 触发列表，自建推理用户会直接撞墙。
🔗 https://github.com/QwenLM/qwen-code/issues/16243

**10. [安全][已关闭] 克隆仓库的 `.qwen/settings.json` 中的 hooks 无需批准即可启动执行** — #14746
`security.folderTrust.enabled` 默认关闭导致任意仓库 hooks 启动即执行，属于典型的恶意仓库攻击面问题，已修复关闭，建议用户升级确认。
🔗 https://github.com/QwenLM/qwen-code/issues/14746

> 另：bot 自动创建的 CI 失败追踪 issue（#14724 已积累 165 条评论、#15173 等）持续活跃，反映 Managed Agent gate / E2E 的不稳定仍是长期顽疾。

---

## 4. 重要 PR 进展

**1. feat(channels): 私有 bound-session 投递与扫描健康日志** — #16237（@wenshao）
为 Channel 事件时间线补齐私有投递通道的可观测性，配合 #16106/#16117 逐步完善 Channels 体系。
🔗 https://github.com/QwenLM/qwen-code/pull/16237

**2. fix(channels): 将 poll cursor 文件收敛到 workspace 作用域** — #16231（@wenshao）
GitHub/GitLab/DWS 游标文件移至 `~/.qwen/channels/<scope>/`，并以 0700/0600 权限写入，兼修隔离与安全。
🔗 https://github.com/QwenLM/qwen-code/pull/16231

**3. perf(managed-agent): 会话命令不再持有 tenant 锁** — #16225（@doudouOUC）
16 个 Session 命令移出 tenant placement guard，直接降低多租户场景锁竞争。
🔗 https://github.com/QwenLM/qwen-code/pull/16225

**4. feat(autofix-pr): helper 拒绝时输出结构化原因与下一步** — #16238（@wenshao）
拒绝信息从纯英文文本升级为 JSON 字段（`refused`/`next`），提升自动化流水线的可编程性。
🔗 https://github.com/QwenLM/qwen-code/pull/16238

**5. fix(core): runtime session 状态拒绝回收的 PID** — #16128（@yiliang114）
sidecar 记录不透明进程启动令牌，PID + token 双重校验防误判，修复会话存活检测的经典 PID 复用问题。
🔗 https://github.com/QwenLM/qwen-code/pull/16128

**6. fix(permissions): 向运维者暴露畸形权限规则** — #15775（@he-yufeng）
所有规则摄入路径对无效规则发出警告，`/permissions` 界面显示 `invalid: not applied` 徽标。
🔗 https://github.com/QwenLM/qwen-code/pull/15775

**7. fix(ci): RHEL 10 上无 Xvfb 时以 headless 运行 desktop smoke** — #16211（@yiliang114）
RHEL 10 移除了 Xvfb 包，改用 weston headless 后端，保障 rpm 构建链路。
🔗 https://github.com/QwenLM/qwen-code/pull/16211

**8. fix(managed-agent): 证明 A3 重写命令恢复无需 Hook 重跑** — #16116（@wenshao）
补齐 G3 恢复矩阵：Hook 重写的输入作为独立批准步骤处理，不继承前步 Allow——安全语义上很关键。
🔗 https://github.com/QwenLM/qwen-code/pull/16116

**9. fix(memory): auto dream 失败后引入退避机制** — #15169（@harjothkhara）
内存自动整理失败后指数退避，避免反复失败打爆日志/资源。
🔗 https://github.com/QwenLM/qwen-code/pull/15169

**10. fix(web-shell): bump @datafe-open/markdown-chart 至 0.4.1** — #16021（@zhangxy-zju）
修复渲染器挂载失败时 ECharts 抛错的问题，autofix takeover 流程推进中。
🔗 https://github.com/QwenLM/qwen-code/pull/16021

---

## 5. 功能需求趋势

- **多 Provider / 自托管模型支持**：OpenRouter `:exacto` 标签（#16158）、HuggingFace TGI（#16243）、Qwen2-VL/QVQ 视觉模型识别（#16244）——社区对非官方直连场景的兼容性需求强烈。
- **Channels / GitHub 集成深化**：GitHub channel 可靠性（#16227 漏评论、#16228 重复错误评论）及相关 PR（#16231/#16236/#16237/#16239）是当前最活跃的开发主线。
- **Managed Agent / 多租户性能**：worker 内存（#16234）、tenant 锁优化（#16225）、托管安装隐私控制（#16006 已关闭）。
- **Desktop / Web Shell 体验**：内嵌浏览器预览与 UI 检查器请求（#16209）、消息删除（#16215）、自定义 loading 文案（#14353）。
- **IDE / 第三方集成扩展**：Bellows 集成文档请求（#16233）、VS Code companion 问题（#16063 已关闭）。

---

## 6. 开发者关注点

1. **CI 基础设施不稳定是最大痛点**：docker 沙箱超时（#16214）、token 限流（#16188）、沙箱镜像发布失败（#16039/#16162）连环出现，bot 自动追踪 issue 积累大量评论，说明“为 AI 自动化建的 CI”本身正成为维护负担。
2. **静默失败零可观测性**：定时任务静默死亡（#16207）、评论静默漏投（#16227）反映 daemon 类组件缺乏失败告警与补偿机制，社区明确要求“要么执行要么报错”。
3. **默认配置的安全边界**：仓库 hooks 免批准执行（#14746）虽已修复，但 folder trust 默认关闭的设计引发了广泛讨论，后续默认安全策略值得关注。
4. **超时与长请求处理**：Anthropic 300s 硬超时忽略用户配置（#16187，已关闭）提示企业用户应检查自身 API 超时配置是否真正生效。
5. **企业/托管部署诉求**：禁用 models.dev 目录刷新以满足隐私合规（#16006）表明 managed 安装场景的配置粒度需求在上升。

---
*数据来源：GitHub QwenLM/qwen-code，统计窗口为 2026-11-03 至 2026-11-04。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*