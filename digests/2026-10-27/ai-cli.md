# AI CLI 工具社区动态日报 2026-10-27

> 生成时间: 2026-10-26 23:50 UTC | 覆盖工具: 7 个

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
**数据日期：2026-10-27**

---

## 一、生态全景

AI CLI 工具已从单一的终端编码助手演进为覆盖 TUI、桌面端、云端沙箱、插件生态和多 Agent 协作的完整开发平台。头部厂商（Anthropic、OpenAI、Google）将重心转向**扩展性与插件分发架构**（Claude Code 的 Mods、Codex 的 plugin-host、OpenCode 的 GUI 插件），而社区反馈则集中暴露出**配额计费透明度、上下文 token 效率、多 Agent 可靠性**三大共性短板。新模型（GPT-6.1 Terra、Opus 5.5）的快速落地与灰度期间的质量波动并存，模型迭代速度已超过工具链的稳定性验证能力。整体看，生态正处于“功能扩张期”向“可靠性治理期”过渡的关键节点。

---

## 二、各工具活跃度对比

| 工具 | Issue 更新 | PR 更新 | Release | 今日核心事件 |
|---|---|---|---|---|
| **Claude Code** | ~10 条热点（#91870 达 275 评论） | ~10 条（多为 security-guidance 积压收尾） | v2.1.311 | Mods 扩展系统迭代；零请求下配额异常消耗 |
| **OpenAI Codex** | ~10 条热点（#57084 达 65 评论） | ~20 条密集合入 | rust-v0.165.0-alpha.3 | GPT-6.1 Terra 全平台模型目录落地 |
| **Gemini CLI** | ~50 条 | ~38 条 | 无 | Subagent 可靠性主导讨论；社区 PR 密集 |
| **Copilot CLI** | ~10 条热点（#3709 达 34 👍） | 0 条 | v1.0.104-4 | 语音转写失效、大会话 OOM 回归待修 |
| **Qwen Code** | ~10 条热点 | ~10 条 | v0.26.2-preview.0 + nightly + SDK | K8s 运行时验收推进；headless 权限 bug 集中爆发 |
| **OpenCode** | ~10 条热点 | ~10 条 | 无 | 免费额度问题官方开汇总帖；/goal 双方案竞争 |
| **Kimi Code CLI** | 0 | 0 | 无 | 无活动 |

**观察**：Gemini CLI 的绝对更新量（50 Issue / 38 PR）领先一个数量级，且社区贡献活跃；Codex 的官方工程节奏最快（单日 20 PR）；Copilot CLI 出现 “PR 零更新 + Issue 积压” 的失衡信号，响应速度被社区诟病（#4026 悬置 5 个月）。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **配额/计费透明度** | Claude Code、Codex、OpenCode、Copilot CLI | 零请求下 5h 配额耗尽（CC #105015）；剩余 84-99% 配额仍被 429（Codex #57084）；免费额度误判集中爆发（OpenCode #59387）；空回合照常计费（Copilot #5149）——**4/7 工具同日爆发计费类问题，是当日最强共性信号** |
| **Subagent/Multi-Agent 可靠性** | Gemini CLI、Claude Code、Qwen Code、Codex | 子代理挂起/误报成功（Gemini #21409/#22323）；子代理上下文异常膨胀（Gemini ~36.6k/turn、CC #104791 12k 指令注入、Qwen #15660 42k→105k）；MCP 进程泄漏（Codex #25015） |
| **插件/扩展生态** | Claude Code、Codex、OpenCode、Qwen Code | CC Mods 系统（275 评论）、Codex plugin-host 进程宿主（#57290）、OpenCode 桌面 GUI 插件（#55246）、Qwen 请求 Mod runtime 兼容层（#13749） |
| **MCP 集成成熟度** | 全部主流工具 | OAuth 刷新、strict schema、进程回收、工具数量上限（Gemini #24246 128 工具报错）等，无一工具完全解决 |
| **权限/安全模型** | Qwen Code、Copilot CLI、Claude Code | headless 模式权限过严致功能失效（Qwen #15597/#15600）；ACP 自动批准工具调用回归（Copilot #4537）；内置插件静默跳过用户钩子（CC #104236） |
| **企业代理/TLS 环境** | Claude Code、Codex | staging CA 破坏 Python 3.13+（CC #87378）、Bun 证书加载、Cloud 代理连接（Codex #53767）、`[network_proxy]` 配置（Codex #57286） |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 扩展生态 + 企业安全（security-guidance 系列 PR 密集收尾） | 付费专业开发者/企业团队 | Mods 钩子系统 + 官方插件 marketplace 分发；云沙箱 + self-hosted runner 双轨 |
| **Codex** | 新模型快速落地 + 基础设施重构 | OpenAI 生态/Pro 订阅用户，多平台（GCP Vertex、Bedrock） | Rust 内核 + 插件进程宿主（IPC 隔离）；Terra 模型优先打通多云 |
| **Gemini CLI** | Subagent 体系 + token 效率（AST 感知、Tactful Extraction） | 开源社区/成本敏感用户 | 开放式社区共建（大量 help wanted PR），探索零依赖 OS 沙箱 |
| **Copilot CLI** | BYOK/本地模型 + ACP/headless 集成 | GitHub 生态用户、Foundry Local 用户 | ACP 协议优先，但工程响应节奏明显偏慢 |
| **Qwen Code** | 平台化交付（K8s/Helm）+ 渠道集成（Teams/QQ） | 国内开发者 + 自动化运维场景 | Managed Agent 控制面 + 多渠道投递，唯一向 K8s 原生部署演进的工具 |
| **OpenCode** | 开源中立 + 免费/自定义 provider 一等公民 | 开源社区、BYOK 用户 | 开放 provider 架构，但免费层风控（IP 绑定可绕过）暴露商业化不成熟 |
| **Kimi Code** | — | — | 今日无活动，处于观察期 |

---

## 五、社区热度与成熟度

**活跃度梯队**：
- **第一梯队（高活跃 + 官方强响应）**：Gemini CLI（更新量最大、社区 PR 贡献密集）、Codex（官方工程节奏最快，单日 20 PR）、Claude Code（单 Issue 讨论深度最深，#91870 达 275 评论）
- **第二梯队（活跃但工程滞后）**：OpenCode、Qwen Code——社区反馈活跃，官方在快速消化（Qwen 的 PR 合入率高、OpenCode 双方案竞争评审透明）
- **第三梯队（社区情绪受损）**：Copilot CLI——Issue 积压（#4026 悬置 5 个月）+ PR 零更新 + 连续版本回归（#4251、#5253），回归测试覆盖不足
- **静默**：Kimi Code

**成熟度判断**：Claude Code 与 Codex 处于 “功能扩张 + 债务累积” 并行阶段；Gemini CLI 与 OpenCode 处于快速迭代/社区共建期；Qwen Code 展现最强的工程化交付能力（K8s、CI 自动化），但 headless 权限模型尚不成熟。

---

## 六、值得关注的趋势信号

1. **计费信任危机成为行业级风险**。4/7 工具同日出现配额异常消耗/误判问题，且均发生在付费用户身上。开发者应开启用量监控、保留账单对账习惯；对厂商而言，配额透明度可能成为下一阶段竞争的分水岭。

2. **Subagent 上下文膨胀是隐形成本黑洞**。三个工具独立报告子代理携带超额指令（CC ~12k、Gemini 36.6k/turn 基线、Qwen 42k→105k），意味着多 Agent 架构的实际 token 成本普遍高于预期 2-3 倍。评估 Multi-Agent 方案时务必实测子代理起始上下文。

3. **插件架构是 2026 下半年军备竞赛主线**。CC Mods、Codex plugin-host、OpenCode GUI 插件在同一个月密集落地，预示 CLI 工具正复制 IDE 的插件生态路径。早期投入插件开发的团队存在卡位红利，但需警惕 API 仍处 experimental 阶段的破坏性变更。

4. **模型灰度与工具链验证脱节**。Opus 5.5 纠正率异常上升（CC #105112）、Terra 灰度期间 UI 元数据不一致（Codex #57288）均表明：新模型上线质量验证依赖社区反馈兜底。关键任务建议锁定稳定版本 + 保留人工复核。

5. **Headless/自动化模式的权限模型是普遍盲区**。Qwen 与 Copilot 的权限 bug 均属 “权限规则过于保守或过于宽松” 的两端失衡。在 CI/CD 中引入 AI CLI 时，应独立验证权限规则的实际拦截行为，而非信任文档语义。

6. **多云/企业代理环境支持成为采购考量**。Codex 打通 Vertex/Bedrock、CC 修复 Bun 证书与代理隧道，说明企业受管网络下的可用性正从“边缘需求”变为“准入门槛”。

---

*报告基于 2026-10-27 各仓库公开数据生成，Issue/PR 编号均可溯源。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-10-27，基于 anthropics/skills 仓库）

---

## 一、热门 Skills 排行（PR）

| # | Skill / PR | 功能 | 讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **mcp-builder 修复** ([#1742](https://github.com/anthropics/skills/pull/1742)) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 header 机制 | MCP SDK 2.x 破坏性变更导致 mcp-builder 不可用，是 mcp-builder 系列问题（见 #1390）的一部分 | OPEN |
| 2 | **skill-creator 触发评测隔离修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 修复 trigger eval 误报、Windows select() 失败等问题 | 直接回应社区高热 issue #556（评测 0% 触发率），是 skill-creator 可信度的核心修复 | OPEN |
| 3 | **notion-spec-to-implementation + quantitative-resume-auditor** ([#1245](https://github.com/anthropics/skills/pull/1245)) | 将产品/技术 Spec 转为 Notion 可执行任务；量化简历审计 | 需求管理 + 职业工具组合 PR，跨领域贡献的典型样本 | OPEN |
| 4 | **pyxel 复古游戏开发 Skill** ([#525](https://github.com/anthropics/skills/pull/525)) | 用 Python 创建/调试/验证复古游戏，含无头运行与帧检查 | Pyxel 作者本人提交，权威性高，存活 7 个月仍在更新 | OPEN |
| 5 | **document-typography** ([#514](https://github.com/anthropics/skills/pull/514)) | 修复 AI 生成文档的孤行、寡妇段落、编号错位 | 切中“AI 生成文档质量”普遍痛点 | OPEN |
| 6 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Markdown 一键转 MP4 视频 + 真人感配音 | 零成本内容生产方向 | OPEN |
| 7 | **skill-quality-analyzer + skill-security-analyzer** ([#83](https://github.com/anthropics/skills/pull/83)) | 对 Skill 本身做五维质量评估与安全扫描 | 元技能（meta-skill），与社区安全焦虑（#492）呼应 | OPEN |
| 8 | **scnet-hpc** ([#1615](https://github.com/anthropics/skills/pull/1615)) | SSH + Slurm 的 HPC 集群操作 | 拓展科学计算场景 | OPEN |

**注**：所有热门 PR 均为 OPEN，无已合并条目——本身即反映社区贡献落地率低的现状。

---

## 二、社区需求趋势（Issues 提炼）

1. **安全与信任机制**（最热，#492，46 评论）：社区 Skill 冒用 `anthropic/` 命名空间造成信任边界滥用；配套诉求包括 #1394（eval-viewer XSS）等 Skills 自身安全审计。
2. **组织级分发与协作**（#228）：企内共享 Skill 库、直接分享链接，替代 Slack 手传 .skill 文件的原始方式。
3. **Skill 触发与评测可靠性**（#556，13 评论）：`claude -p` 下 0% 触发率，评测框架可信度是 skill-creator 生态的基石诉求。
4. **上下文效率**：#1487（claude-api 一次性注入 156k token）、#202（skill-creator 冗长）、#1329（compact-memory 紧凑记忆）——Skills 瘦身与渐进式加载呼声强烈。
5. **AI 输出质量门禁**（#1385、#412）：任务前校准 → 对抗性审查 → 交付验证的治理型 Skill 方向。
6. **现有 Skill 工程质量**：docx（#2018 XML 损坏）、slack-gif-creator（#1868）、webapp-testing 等大量 bug 修复需求。

---

## 三、高潜力待合并 Skills / PR

- [#1742 mcp-builder mcp>=2 适配](https://github.com/anthropics/skills/pull/1742) — 修复高优先级 issue #1668，持续更新至 10 月
- [#1298 skill-creator 评测隔离修复](https://github.com/anthropics/skills/pull/1298) — 对应最痛的 #556
- [#1997 skill-creator YAML 解析修复](https://github.com/anthropics/skills/pull/1997) + [#1681 package_skill.py 直执行修复](https://github.com/anthropics/skills/pull/1681) — 同一 Skill 的工程补强，合并概率高
- [#1980 webapp-testing 命令注入修复](https://github.com/anthropics/skills/pull/1980) — 安全类修复（CWE-78），通常优先处理；同作者另有 #1977、#1976 两个 bug fix
- [#1792 docx 超时报错 + 输出校验](https://github.com/anthropics/skills/pull/1792) — 修复静默失败
- [#525 pyxel](https://github.com/anthropics/skills/pull/525) — 上游作者背书、长存活的 新增类 PR

---

## 四、生态洞察（一句话总结）

> 社区最集中的诉求不是“更多新 Skill”，而是**让 Skills 可信、可分发、可控 token**——即建立命名空间信任与安全审计机制、组织级共享能力、可靠的触发评测体系，以及瘦身后的渐进式上下文加载。

---

# Claude Code 社区动态日报 · 2026-10-27

## 📰 今日速览

Claude Code 发布 **v2.1.311**，为 `self-hosted-runner` 新增空闲会话保持参数，并修复启动后长时间冻结的问题。社区方面，**Mods 可扩展性系统**（#91870，275 条评论）持续活跃，官方正在快速消化社区反馈；同时多位用户报告 **5 小时用量配额异常消耗**与 **Opus 5.5 回答质量下滑**，值得密切关注。

---

## 🚀 版本发布：v2.1.311

- `self-hosted-runner` 新增 `--hold-idle-file` 与 `--max-hold-min` 参数，可在主机报告残留进程时保持空闲会话
- 为 Explanatory 输出风格新增提示（当用户请求解释时展示）
- 修复启动时及启动后的长时间冻结问题

---

## 🔥 社区热点 Issues

**1. [#91870](https://github.com/anthropics/claude-code/issues/91870) — Mods：让 Claude 可扩展性提升 10 倍**
官方主导的扩展性方案持续迭代，10 月 1 日更新确认已上线，团队正快速处理最新反馈。275 条评论、131 👍，是当前社区最活跃的讨论。Mods 生态将是近期核心演进方向。

**2. [#105015](https://github.com/anthropics/claude-code/issues/105015) — 5 小时限额在零请求下从 0% 涨至 100%**
用户在 10/21 与 10/25 两次复现：无任何本机请求，3 小时内配额被耗尽，周配额同步上涨。直接影响付费用户体验，属计费类高优先级问题。

**3. [#105112](https://github.com/anthropics/claude-code/issues/105112) — Opus 5.5 自 10/19 起回答与自身研究结果相悖**
大数据量统计（900 vs 5738 条回答）显示纠正率从 5.2% 升至 25.4%。模型质量回退信号，需官方确认是否与近期服务端变更有关。

**4. [#73514](https://github.com/anthropics/claude-code/issues/73514) — WebFetch 忽略 prompt 抽取参数，整页注入上下文**
3-4 次抓取即可耗尽 1M token 窗口，已标记 reproduced。对依赖 WebFetch 的工作流是严重的上下文浪费问题。

**5. [#104791](https://github.com/anthropics/claude-code/issues/104791) — Subagent 即使排除 MCP 工具仍接收全部 MCP 指令（约 12k tokens）**
自定义子代理 `tools:` 列表收窄无效，20 个 MCP server 下每个子代理启动即背负 ~48.5k 字符的指令注入，成本与性能双重损耗。

**6. [#69364](https://github.com/anthropics/claude-code/issues/69364) — `--continue`/`--resume` 不检查活跃会话注册表**
同一会话可在另一进程中被重复打开并追加写入同一 jsonl，多终端用户存在数据竞争风险，长期未解决。

**7. [#104236](https://github.com/anthropics/claude-code/issues/104236) — Team 组织中内置安全插件静默跳过用户级 classic.Stop 钩子**
`cc-plugin-sec-default@builtin` 抢占最外层位置且跳过行为无提示，影响 Mods 用户的安全与生命周期钩子可靠性。

**8. [#87378](https://github.com/anthropics/claude-code/issues/87378) — Cloud sandbox 代理使用无扩展的 staging CA，破坏所有 Python 3.13+ 客户端**
自签证书缺少 `basicConstraints`/`keyUsage`，不符合 RFC 5280，导致新版本 Python TLS 校验失败，云端沙箱可用性受阻。

**9. [#89690](https://github.com/anthropics/claude-code/issues/89690) — modelPicker 将 `opusplan` 误判为已内置覆盖**
`opusplan` 是模式而非模型，自定义 picker 行无法到达 `/model` 选择器，配置自定义模型阵容的用户受影响。

**10. [#105212](https://github.com/anthropics/claude-code/issues/105212) — AGENTS.md 遵循问题（macOS）**
AGENTS.md 指令文件未被正确遵循的问题报告，涉及模型层行为，与 #105112 一同反映近期模型指令遵循的稳定性疑虑。

---

## 🔀 重要 PR 进展

**1. [#105303](https://github.com/anthropics/claude-code/pull/105303) — 从 claude-plugins-official 安装 marketplace 插件**
官方 PR，重构 `claude-code-plugins` marketplace 使所有插件改由官方插件仓库安装，与 code-review 移植及版本机制 PR 存在合并顺序依赖，是插件分发架构的重要调整。

**2. [#96434](https://github.com/anthropics/claude-code/pull/96434) — security-guidance 审查器排除受保护与密钥文件**
review 子代理不再读取 deny/ask 规则覆盖的文件及 `.env`、密钥库等敏感文件，且不授予 shell，显著强化安全审查的隔离性。

**3. [#76640](https://github.com/anthropics/claude-code/pull/76640) — Bun 运行时加载 macOS 系统证书并处理 NO_PROXY**
修复 v2.1.17+ Bun 运行时下 "Self-signed certificate detected" 导致 API 连接失败的问题，企业代理环境用户受益。

**4. [#79237](https://github.com/anthropics/claude-code/pull/79237) — 防止 spawn 任务变更父仓库 checkout**
新增 `_is_isolated_worktree` 守卫，避免 spawn 的伪 worktree 在共享主 checkout 上执行 `git checkout -b`，防止并行任务互相污染。

**5. [#87079](https://github.com/anthropics/claude-code/pull/87079) — 修复 `**` glob 无法匹配零深度路径**
`**/*.ts` 因 fnmatch 语义问题静默排除顶层文件，作为安全规则属于静默失效，属高危修复。

**6. [#81426](https://github.com/anthropics/claude-code/pull/81426) — security-guidance 支持 Windows venv 布局**
Windows 用户此前无法使用 agentic commit reviewer，本 PR 消除了 `SKIP_WIN32` 的平台限制。

**7. [#76274](https://github.com/anthropics/claude-code/pull/76274) — 审查路径按仓库根解析并加固 findings 契约**
修复跨仓库/绝对路径混入审查提示的问题，属于 agentic 审查器健壮性系列修复。

**8. [#61373](https://github.com/anthropics/claude-code/pull/61373) — patterns 新增 exclude_substrings 降误报**
解决 `ast.literal_eval` 误匹配 `eval(`、`db.exec` 误匹配 `exec(` 等经典误报。

**9. [#65875](https://github.com/anthropics/claude-code/pull/65875) — 向 agentic_review 子进程转发 ANTHROPIC_BASE_URL**
修复 LiteLLM/Bifrost 等代理网关 + OAuth 场景下子进程认证失败。

**10. [#66577](https://github.com/anthropics/claude-code/pull/66577) — 同步 security-guidance marketplace 版本与描述**
marketplace.json 与 plugin.json 版本/描述不一致导致升级异常，属元数据治理修复。

> 注：以上 2-10 均为已关闭 PR，今日集中出现在更新列表中，可视作 security-guidance 插件相关积压 PR 的批量收尾。

---

## 📈 功能需求趋势

1. **Mods / 插件生态**：#91870、#104236、#102480、#105303 均指向 Mods 系统的落地打磨——钩子优先级、UI 渲染层、插件分发渠道是三大焦点。
2. **用量与成本控制**：#105015、#104791、#90015 反映用户对配额透明度和 token 浪费（MCP 指令注入、WebFetch 全文注入）的强烈关注。
3. **会话与进程管理**：#69364、#90034 持续要求多进程会话注册表、运行中工作流的落盘记录。
4. **MCP 协议成熟度**：#105223（strict schema 回归）、#105234（channel 契约）、#99471（OAuth 刷新令牌）表明 MCP 集成仍是问题高发区。
5. **Desktop Code tab 体验**：#104245、#102480 显示 Desktop 内嵌 Code 的 next-step box / wrap_up 强制行为引发工作流冲突争议。

---

## ⚠️ 开发者关注点

- **计费异常风险**：零活动下配额消耗（#105015）多次复现，建议 Pro 用户近期留意用量面板。
- **模型质量波动**：Opus 5.5 自 10/19 起纠正率异常上升（#105112），关键任务建议保留人工复核。
- **Token 预算**：重度 MCP 用户的子代理会隐性携带 ~12k tokens 指令（#104791）；WebFetch 的 prompt 抽取失效（#73514）也会快速撑爆上下文。
- **企业/代理环境**：Cloud sandbox TLS（#87378）、Bun 证书加载、代理隧道（#71781）等网络问题在受管环境中集中出现。
- **钩子可靠性**：Team 组织内置插件静默跳过用户钩子（#104236），依赖 `classic.Stop` 的自动化流程需自查。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-27

## 📌 今日速览

Codex 发布 **rust-v0.165.0-alpha.3**，同步推送约 20 个密集合入的 PR，其中 **GPT-6.1 Terra 正式加入全平台模型目录**（含 GCP Vertex、Amazon Bedrock），成为今日最大看点。社区侧最热话题是 Linux/VS Code 用户遭遇 **HTTP 429 限流风暴**（#57084，65 条评论），尽管 Pro 配额剩余 84–99% 仍被频繁中断。Windows 桌面端的内存泄漏、MCP 进程泄漏和权限系统问题持续发酵。

---

## 🚀 版本发布

- **rust-v0.165.0-alpha.3** — 无详细 changelog，但从同期 PR 可推断涵盖模型目录更新（GPT-6.1 Terra）、TUI 交互改进、插件进程宿主等基础设施增强。

---

## 🔥 社区热点 Issues（Top 10）

1. **[#57084](https://github.com/openai/codex/issues/57084)** — Linux/VS Code 用户在 Pro 配额剩余 84–99% 的情况下持续遭遇 HTTP 429 和共享重试死线。65 条评论、8 👍，是今日最活跃的事件日志型 Issue，反映限流机制存在系统性问题。

2. **[#49453](https://github.com/openai/codex/issues/49453)** — 浏览器访问被聊天级“永久拒绝”记录卡死，即使显式放行站点也无法恢复。37 条评论，权限状态持久化的设计缺陷。

3. **[#25015](https://github.com/openai/codex/issues/25015)** — app-server 为 subagent 启动的 MCP 进程栈在 `close_agent` 后不回收，导致 Linux 上进程数与内存线性增长。长期存在的资源泄漏核心问题。

4. **[#43803](https://github.com/openai/codex/issues/43803)** — `request_user_input_async` 问题卡片在回合最终消息渲染时被自动关闭，导致用户无法作答。17 评论、12 👍，与 #48563 属同族 UI 竞态问题。

5. **[#42611](https://github.com/openai/codex/issues/42611)** — CLI 自动压缩（auto-compaction）将已回答的用户消息重放为新回合，可能造成重复执行，数据安全风险较高。

6. **[#46690](https://github.com/openai/codex/issues/46690)** — Windows 渲染进程内存泄漏涨至 4–7 GB 后反复崩溃，回滚到 26.903.9818.0 稳定，是影响生产可用性的高优先级 bug。

7. **[#53767](https://github.com/openai/codex/issues/53767)** — Codex Cloud 运行时无法连接分配的 HTTP 代理（`proxy:8080` Operation not permitted），阻断企业代理网络下的正常使用。

8. **[#53136](https://github.com/openai/codex/issues/53136)** — macOS 上 Dot 启动的任务无法访问已启用的本地 MCP 工具，7 👍，新功能与 MCP 生态的兼容性问题。

9. **[#57288](https://github.com/openai/codex/issues/57288)** — 10/26 GPT-6.1 Terra 灰度期间，VS Code 扩展显示 "GPT-6 Terra" 但会话实际使用 `gpt-6.1-terra`，模型切换的元数据不一致。

10. **[#57300](https://github.com/openai/codex/issues/57300)** — `codex.toml` 出现 null 值导致启动失败、项目丢失，配置健壮性问题的最新案例。

---

## 🔀 重要 PR 进展（Top 10）

1. **[#57293](https://github.com/openai/codex/pull/57293)** — **GPT-6.1 Terra 加入模型目录**：捆绑目录、GCP Vertex picker、Amazon Bedrock（含 Global 和 US 跨区变体），并设为 GCP 记忆整合首选模型。

2. **[#57290](https://github.com/openai/codex/pull/57290)** — 新增 `codex-plugin-host` 插件进程宿主：清理环境启动、握手验证、256 KiB 帧限制的 IPC 与生命周期管理，为插件架构打基础。

3. **[#57286](https://github.com/openai/codex/pull/57286)** — `requirements.toml` 支持 `[network_proxy]`（保留 `[experimental_network]` 兼容别名），与 Cloud 代理问题（#53767）相关。

4. **[#57280](https://github.com/openai/codex/pull/57280)** — Rollout trace 保留完整 MCP 结果，包括被截断的大结果和被拒绝的调用，提升可观测性。

5. **[#57292](https://github.com/openai/codex/pull/57292)** — TUI 中异步问题与回复支持 Markdown 渲染，优化提问交互体验（与 #43803/#48563 问题卡 UX 相关）。

6. **[#57284](https://github.com/openai/codex/pull/57284) + [#57285](https://github.com/openai/codex/pull/57285)** — 将 TUI 鼠标捕获重构为显式策略，展开问题时禁用捕获让终端处理链接点击，细节体验改进。

7. **[#57275](https://github.com/openai/codex/pull/57275)** — 识别 `imagegen_premium` 用量限制错误，保留图像生成的失败元数据。

8. **[#57287](https://github.com/openai/codex/pull/57287)** — Prediction fork 中保留父级工具声明并附加“MCP 不可用”提示，避免子会话静默丢失工具能力。

9. **[#57278](https://github.com/openai/codex/pull/57278)** — 重构 agent 生成/启动/通信辅助函数，抽取 `ThreadStartupContext`，为多 agent 架构做代码整理。

10. **[#57204 系列基础设施](https://github.com/openai/codex/pull/57277)** — `i18n-config` 切换到 crates.io 正式发布版，去除 Git 补丁依赖；同日还有 fence 升级（#57307）、refresh-token 错误透出（#57304）等维护性改动。

---

## 📈 功能需求趋势

- **新模型支持**：GPT-6.1 Terra 全平台落地是本周主线，社区对灰度期间 UI/元数据一致性有较高要求（#57288）。
- **Cloud / 远程环境**：CLI 无法发现新一代云环境、`cloud exec` 忽略模型覆盖（#56350）、代理连接失败（#53767），Codex Cloud 仍是问题高发区。
- **插件与 MCP 生态**：官方明显在投入插件进程宿主（#57290）和 MCP 可观测性（#57280），但社区侧 MCP 进程泄漏（#25015、#56335）和 Dot 任务 MCP 不可用（#53136）尚未解决。
- **交互式提问 UX**：问题卡片被自动关闭的竞态问题在 macOS/Windows 双端反复出现（#43803、#48563），TUI 侧已在改进。

---

## ⚠️ 开发者关注点（痛点总结）

1. **限流与用量透明度**：429 错误与实际配额剩余不匹配（#57084、#57236），5 小时配额消耗异常快，付费用户信任受损——这是当前社区情绪最强的痛点。
2. **Windows 桌面端稳定性**：渲染进程内存泄漏崩溃（#46690）、MCP 进程无限堆积（#56335）、EPERM 沙箱拦截 Node spawn（#47868）、任务栏遮挡（#45369），Windows 体验显著落后于 macOS。
3. **权限系统持久化错误**：聊天级“拒绝”被永久保存且无法撤销（#49453、#45237），权限决策的可见性与可管理性不足。
4. **配置健壮性**：`codex.toml` null 值导致启动失败（#57300）、模型目录 5 秒硬编码超时静默返回空（#56528）、截断的 function_call 重放导致 400（#56850）——静默失败模式是高级用户的主要摩擦来源。

**建议关注**：若你在 Linux/VS Code 上使用 Pro 订阅，今日的 429 问题值得跟踪 #57084；等待 GPT-6.1 Terra 的用户可升级至 0.165.0-alpha.3 获取完整模型目录。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-27）

## 1. 今日速览

过去 24 小时 Gemini CLI 无新版本发布，但社区活动十分活跃：50 条 Issue 更新、38 条 PR 更新。Subagent（子代理）生态仍是绝对焦点，涉及可靠性、可观测性和能力增强等多个维度；同时新增了多项针对终端渲染、ACP 协议和错误分类的社区修复 PR，显示外围生态正在快速成熟。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 后误报 GOAL 成功 | **P1**。子代理耗尽轮次却报告"成功"，掩盖了任务中断，直接影响任务可信度。13 条评论，社区讨论热烈 |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist agent 挂起 | **P1**，8 👍。委托给通用代理后无限挂起（简单如建文件夹也卡死），等待一小时无响应，是子代理稳定性最严重的用户痛点 |
| 3 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 不主动使用 skills 和 sub-agents | **P2**。用户配置的 gradle/git 技能几乎不会被自主调用，反映自主调度能力不足，7 条评论 |
| 4 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由 | **P2 / large effort**。利用 Gemini 3 原生 bash 能力（grep/sed/awk 链式调用）同时保障安全性的架构提案，方向性强 |
| 5 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知的文件读取/搜索/代码库映射评估 | **P2 EPIC**。探索 AST 工具（ast-grep、tilth、glyph）提升读取精度、降低 token 噪音，是 token 效率优化的关键方向 |
| 6 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 超过 128 工具时触发 400 错误 | **P2**。工具数量超限直接报错，期望 agent 智能裁剪工具范围，对重度 MCP 用户影响大 |
| 7 | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 配置 | **P2**。maxTurns 等全局/项目配置被完全忽略，AgentRegistry 读取合并逻辑与实际使用脱节 |
| 8 | [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) get-shit-done output hook 导致崩溃 | **P1**。输出 hook 在打印用户摘要时反复崩溃，影响第三方集成稳定性 |
| 9 | [#19561](https://github.com/google-gemini/gemini-cli/issues/19561) "Tactful Extraction" 节俭 token 读取策略 | **P3**。当前基线约 36.6k tokens/turn，大文件读取"消防水管式"灌入导致上下文膨胀，提出分层精准发现策略 |
| 10 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) Browser subagent 在 Wayland 下失败 | **P1**。Linux Wayland 环境（主流发行版默认）下浏览器代理不可用，同样误报 GOAL 终止 |

## 4. 重要 PR 进展

| # | PR | 内容 |
|---|-----|------|
| 1 | [#29951](https://github.com/google-gemini/gemini-cli/pull/29951) VS Code 集成测试重试瞬时下载失败 | **P0**。修复 nightly release 因 VS Code 下载超时导致的误报失败 |
| 2 | [#29905](https://github.com/google-gemini/gemini-cli/pull/29905) 处理 East Asian Ambiguous 宽度字符终端 | **P2 / L**。修复 macOS Terminal.app、iTerm2、VTE 等终端将模糊宽度字符按双宽渲染的错位问题 |
| 3 | [#29904](https://github.com/google-gemini/gemini-cli/pull/29904) 限制终端宽度变化后的历史重渲染 | **P2 / L**。限制内联渲染器在 resize 时的工作量，减少重复输出，配合 #21924 的渲染性能优化 |
| 4 | [#29884](https://github.com/google-gemini/gemini-cli/pull/29884) Android (Termux) 信任系统路径解析 ripgrep | **P2 / help wanted**。让 Termux 下 `pkg install ripgrep` 安装的二进制可被 grep_search 使用 |
| 5 | [#29961](https://github.com/google-gemini/gemini-cli/pull/29961) 将项目消费上限错误归类为终端配额错误（已关闭） | **P2**。AI Studio 超出月度消费上限返回 429/400 + 空 details，修复错误分类导致的不当重试 |
| 6 | [#29910](https://github.com/google-gemini/gemini-cli/pull/29910) ACP 权限请求包含 MCP 元数据（已合并） | 提升 ACP（Agent Client Protocol）客户端权限提示的可读性，显示具体 server/tool 名称 |
| 7 | [#29959](https://github.com/google-gemini/gemini-cli/pull/29959) 支持可配置数值评分模型路由 | **新特性**。允许用户自定义数值分数区间 → 模型的映射规则，实现精细化的模型分层调度 |
| 8 | [#29966](https://github.com/google-gemini/gemini-cli/pull/29966) diff 前规范化 CRLF 行尾 | 修复 Windows/CRLF 文件在 Edit 工具 diff 上下文中的不一致 |
| 9 | [#29947](https://github.com/google-gemini/gemini-cli/pull/29947) 保留超大后台日志尾部 | **P2 / help wanted**。单行超过 64KB 的后台日志此前静默丢弃全部可用尾部，现在保留部分片段 |
| 10 | [#29965](https://github.com/google-gemini/gemini-cli/pull/29965) 修复 ExpandableText Unicode 截断 | 修复 UTF-16 代理对边界截断导致 emoji 渲染丢失及切换行为异常 |

## 5. 功能需求趋势

1. **Subagent 能力体系建设**（最主流）：本地子代理 Sprint（#20195）、并行子代理协作与共享内存（#18287）、子代理轨迹经 `/chat share` 可见（#22598）、`/bug` 报告包含子代理上下文（#21763）、symlink 识别（#20079）——子代理正从"能用"走向"可靠、可观测、可协作"。
2. **Token / 上下文效率**：AST 感知工具系列（#22745/#22746/#22747）、Tactful Extraction 精准读取（#19561）、文件化任务追踪替代 WriteToDo（#18836/#21000）。
3. **安全与沙箱**：零依赖 OS 沙箱（#19873）、阻止破坏性 git/DB 操作（#22672）。
4. **浏览器自动化**：Browser Agent 配置覆盖（#22267）、会话接管与锁恢复（#22232）、Wayland 支持（#21983）。
5. **终端渲染体验**：resize 无闪烁（#21924）、模糊宽度字符、Unicode 截断等 PR 密集落地。
6. **内部评估基础设施**：稳定内部项目 evals（#23166）、steering eval 修复（#23313）。

## 6. 开发者关注点

- **可靠性信任危机**：子代理“挂起”和“误报成功”是最高频痛点（#21409、#22323、#21983），用户无法信任代理的完成状态。
- **自主调度不足**：模型几乎不主动使用 skills/subagents（#21968），需显式指令才触发，削弱了自动化价值。
- **工具数量上限**：重度 MCP 配置下 128 工具限制直接报错（#24246），且 Browser Agent 配置不生效（#22267），配置体系一致性存疑。
- **Token 成本压力**：36.6k tokens/turn 基线 + 大文件读取膨胀，成本敏感用户持续呼吁精准读取策略。
- **清理负担**：模型在随机目录生成临时脚本，增加 commit 前清理成本（#23571）。
- **Windows/终端兼容性长尾**：CRLF、Unicode 宽度、resize 渲染等细节问题仍需持续打磨，好在社区 PR 修复响应较快。

---
*数据来源：github.com/google-gemini/gemini-cli | 统计窗口：2026-10-26 ~ 2026-10-27*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-27** | 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)

---

## 一、今日速览

昨日发布 **v1.0.104-4** 修复版本，但社区焦点集中在多条高热度 Issue 的集中更新上：语音转写全模型失效（#4024）、大会话恢复 OOM 回归（#4251）以及 1.0.103 的会话锁超时（#5253）等核心稳定性问题仍在等待官方修复。BYOK/本地模型多模型切换（#3709，34 👍）持续是呼声最高的功能需求。

---

## 二、版本发布

- **v1.0.104-4**（[Release](https://github.com/github/copilot-cli/releases)）：官方说明仅为 "Fixes and changes"，未附详细变更日志。

---

## 三、社区热点 Issues（Top 10）

1. **[#4024](https://github.com/github/copilot-cli/issues/4024)** — `/voice` 语音模式所有内置 ASR 模型转写返回空，疑似 MultiModalProcessor 对 nemotron_speech (RNNT) 的路由 bug。14 条评论，影响 Foundry Local Core 语音功能可用性。
2. **[#3709](https://github.com/github/copilot-cli/issues/3709)** — 请求 `/model` 支持在同一会话内切换多个模型（含 BYOK/本地 provider）。34 👍、11 评论，BYOK 用户最强诉求。
3. **[#4905](https://github.com/github/copilot-cli/issues/4905)** — 桌面版会话数分钟后死亡："GitHub credential registration is no longer available"，导致 github-mcp-server 目录失效，7 条评论。
4. **[#4251](https://github.com/github/copilot-cli/issues/4251)** — 1.0.74 回归：恢复大会话时 OOM/单核满载约 70 分钟，内存占用约为 1.0.73 的 3–4 倍，有严格 A/B 对照数据。
5. **[#5253](https://github.com/github/copilot-cli/issues/5253)** — 1.0.103 持久性 session-lock 超时，任务无法刷新、UI 无响应，为最新版本引入的新问题。
6. **[#4026](https://github.com/github/copilot-cli/issues/4026)** — Windows 原生运行时反复崩溃，自 2026 年 5 月起横跨 4 个版本未解决。
7. **[#4017](https://github.com/github/copilot-cli/issues/4017)** — 桌面版 MCP OAuth：非第一方 HTTP 服务器取消 host-token 后浏览器授权流程永不启动，无提示无报错。
8. **[#5149](https://github.com/github/copilot-cli/issues/5149)** — Claude Opus 5.5 被 32k maxOutputTokens 限制，高 reasoning-effort 下返回空回合且 auto-continue 照常计费，涉及成本问题。
9. **[#4537](https://github.com/github/copilot-cli/issues/4537)** — ACP 模式自 1.0.81-1 起再次自动批准工具调用（#845 回归），shell 命令、文件删除可无人值守执行，安全隐患。
10. **[#3976](https://github.com/github/copilot-cli/issues/3976)** — 实验 `tgrep` 索引器在大型 monorepo 上无内存上限，直接 OOM 杀死宿主机。

---

## 四、重要 PR 进展

过去 24 小时无 PR 更新（数据为 0 条）。

---

## 五、功能需求趋势

- **BYOK / 本地模型深度支持**（#3709、#4703、#3839、#3911、#4282）：多模型切换、per-agent provider、Ollama Cloud 兼容性是最大呼声集群。
- **ACP / headless 集成完善**（#4537、#4555、#4880、#4838）：权限审批、模型列表暴露、后台 sub-agent 保护等协议层缺口。
- **MCP 生态健壮性**（#4017、#5014、#4949、#4392、#5134、#5242）：OAuth 流程、自定义 registry、孤儿进程、inotify 限制等多平台问题。
- **会话稳定性与性能**（#4251、#5253、#5023、#4670）：大会话恢复、锁超时、遥测数据类型异常。

---

## 六、开发者关注点

1. **会话生命周期脆弱**：恢复失败、锁超时、OOM 是近期最高频痛点，且 #4251、#5253 均为版本回归，反映回归测试覆盖不足。
2. **权限与安全**：ACP 自动放行工具调用（#4537）、编辑权限请求超时（#4486）直接影响生产可用性。
3. **MCP 集成摩擦大**：OAuth 状态管理混乱、孤儿进程、资源泄漏，企业自建 registry 用户受阻。
4. **计费与模型配置透明度**：空回合计费（#5149）、auto 模型强制禁用 reasoning（#4560）引发对成本控制的不满。
5. **大量 Issue 长期停留在 more-info-needed 状态**（#4026 悬置 5 个月），社区对响应速度有所不满。

---
*本报告基于过去 24 小时 GitHub 公开数据自动汇总。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-10-27

## 一、今日速览

今日无新版本发布，但社区围绕**免费额度（free tier）问题**爆发大量讨论——官方专门开设汇总 Issue（#59387）引导用户集中反馈。PR 方面活动活跃，核心团队推进 `/goal` 目标追踪功能的两套竞争实现（#58508 / #59437），并合入多项 UX 改进，包括桌面 GUI 插件支持（#55246）和长消息折叠（#59435）。

---

## 二、版本发布

过去 24 小时无新 Release。

---

## 三、社区热点 Issues

1. **[#59387](https://github.com/anomalyco/opencode/issues/59387) Free tier 问题官方汇总帖（OPEN）**
   官方为 "Free usage exceeded"、"额度重置失败"、"Desktop 版本失效" 等高频报错开设的统一入口。免费额度相关问题近期集中爆发，这是当前社区最活跃的反馈通道。

2. **[#56324](https://github.com/anomalyco/opencode/issues/56324) 官方 TUI 内免费模型报错（CLOSED）**
   Windows v2.0.32 用户在官方终端内使用免费模型被拒："free tier can only be used from within OpenCode"。71 条评论，属高严重性误判问题，现已关闭。

3. **[#34344](https://github.com/anomalyco/opencode/issues/34344) 免费模型无限用量漏洞（CLOSED）**
   速率限制绑定 IP，切换 VPN 即可重置额度。63 条评论的安全类议题，暴露免费层风控设计缺陷。

4. **[#58550](https://github.com/anomalyco/opencode/issues/58550) 新用户首次使用即提示超额（CLOSED）**
   安装 10 分钟后第一条消息就被告知 "Free usage exceeded"，与 #59387 同源的配额误判问题。

5. **[#54181](https://github.com/anomalyco/opencode/issues/54181) 后台服务卡死 + 会话静默丢失（OPEN，severity:high）**
   `opencode serve --service` 卡死后 watchdog 恢复导致 404 "session not found"，重启风暴竞争服务槽位。三个耦合问题，涉及**用户数据丢失**，值得高优先级关注。

6. **[#54603](https://github.com/anomalyco/opencode/issues/54603) npm 包在 Linux/macOS 上发布 `opencode.exe`（OPEN，已复现）**
   `@opencode/cli` 在所有平台都带 `.exe` 后缀（实际是 ELF/Mach-O 文件），属打包发布缺陷。

7. **[#54114](https://github.com/anomalyco/opencode/issues/54114) 服务端 watcher 自循环，空转 ~37% CPU（OPEN，已复现）**
   inotify 每秒 1–2 次对 `.agents/skills` 反复拆建监听，永不收敛。与 #53393（无防抖的兼容性重载）同属 v2 配置热重载的性能病灶。

8. **[#54654](https://github.com/anomalyco/opencode/issues/54654) `plugin list` 首次调用返回空（OPEN，已复现）**
   冷启动竞态：扫描未完成即返回空列表。与 mcp.list / skill.list / agent.list / model.list 是**同一类系统性竞态**（#54192、#51680、#51282、#51703），建议统一修复。

9. **[#58354](https://github.com/anomalyco/opencode/issues/58354) shell 输出含 NUL 字节导致会话卡死（OPEN，已复现）**
   二进制命令输出未过滤 NUL 字节，严格校验的上游（如 Venice）直接 400，会话不可用。

10. **[#58839](https://github.com/anomalyco/opencode/issues/58839) 自定义 Provider 无法触发工具审批（OPEN）**
    自定义 LanguageModelV3 provider 发出的 tool-approval-request 永远得不到响应，无权限弹窗、无回复，阻塞自定义 provider 生态。

---

## 四、重要 PR 进展

1. **[#55246](https://github.com/anomalyco/opencode/pull/55246) Desktop GUI 插件支持（OPEN）**
   插件可通过 `./gui-experimental` 导出携带 GUI 部分，桌面应用内置功能也改造为内置插件。插件架构的重大扩展，API 标记 experimental。

2. **[#59437](https://github.com/anomalyco/opencode/pull/59437) vs [#58508](https://github.com/anomalyco/opencode/pull/58508) `/goal` 命令两套方案竞争**
   均基于 session idle hook 实现“目标完成自动提醒”。#59437 走纯客户端判定（无新服务端事件），架构更轻量，两者取舍仍在评审中。

3. **[#59435](https://github.com/anomalyco/opencode/pull/59435) 长消息折叠为前 8 行（OPEN）**
   粘贴日志或长 prompt 不再刷屏，带 "Read more" 展开，与 iOS 端规则对齐。

4. **[#59441](https://github.com/anomalyco/opencode/pull/59441) 压缩请求按 provider 上次真实计数定大小（OPEN）**
   修复 compaction 摘要请求按全文 chars/4 估算的问题，改用 provider 返回的真实 token 数。

5. **[#59440](https://github.com/anomalyco/opencode/pull/59440) 修复 setting-only 配置误激活 catalog provider（OPEN）**
   仅调整设置的 provider 条目被错误标记为 `enabled`，导致未连接也显示可用。

6. **[#59439](https://github.com/anomalyco/opencode/pull/59439) 回滚 config-defined providers 识别改动（OPEN）**
   回滚 #57007——在 Integration 公共 schema 上加 `configured` 字段污染了集成抽象，架构层取舍的典型案例。

7. **[#59190](https://github.com/anomalyco/opencode/pull/59190) 实验性图像与 decision 生成端点（OPEN）**
   仅定义 HTTP 契约（decode 后返回未实现），为客户端先行适配铺路，体现契约先行的设计流程。

8. **[#59421](https://github.com/anomalyco/opencode/pull/59421) 新增 `LLM.loop` 工具循环 API（CLOSED，已合入）**
   封装"模型调用 → 执行工具 → 回填结果 → 再调用"循环，降低 SDK 使用门槛。

9. **[#59403](https://github.com/anomalyco/opencode/pull/59403) Nix 依赖改从 `bun.lock` 提取（OPEN）**
   配合 bun2nix 离线缓存，解决 Nix 构建的依赖同步问题（Closes #49063）。

10. **[#59046](https://github.com/anomalyco/opencode/pull/59046) CI：构建与签名/发布流程分离（CLOSED）**
    发布相关 job 全部收敛到 `release` 环境，最小权限 + CODEOWNERS，并移除 VS Code 发布工作流——供应链安全与发布合规的重要加固。

---

## 五、功能需求趋势

- **免费层体验与计费可靠性**：今日最强势主题。额度误判、重置失效、订阅扣费后仍显示 Free（#59068、#59436）集中出现，官方已设汇总帖。
- **后台服务稳定性（v2 `serve --service`）**：会话丢失、watcher 自循环、CPU 空转（#54181、#54114、#53393）构成一组系统性问题。
- **插件与扩展生态**：GUI 插件、session tab bar 插件槽位（#54927）、自定义 provider 工具审批（#58839），社区在积极构建第三方扩展。
- **v2 存储与路径契约**：离线 SQLite 检查/备份/vacuum（#54618）、跨平台规范路径契约（#54615）、目录提示边界校验（#54617），@romanilyin 系列提案推动 v2 存储层规范化。
- **目标驱动工作流**：`/goal` 两套 PR 并行推进，反映"AI 自主完成任务 + 完成通知”的需求方向。

---

## 六、开发者关注点

1. **Windows 体验仍是重灾区**：Ctrl+C 鼠标追踪残留（#6912，21 👍）、免费模型报错、跨平台路径校验等多条高赞 Issue 均涉 Windows。
2. **冷启动竞态成系统性模式**：plugin/mcp/skill/agent/model 的 `list` 命令首调返回空（#54654 等 5 个同源 Issue），开发者期盼统一修复而非逐个打补丁。
3. **自定义 provider 一等公民化诉求**：模型选择器不显示 provider 名（#49309、#50322）、工具审批不可用（#58839）表明 config-defined provider 的可见性与权限链路尚不完整。
4. **健壮性细节**：NUL 字节、Basic Auth 401（#45856）、缺 i18n key（#59377）等边缘 case 持续消耗用户信任。
5. **热重载性能**：无防抖的配置重载导致高 CPU 占用，桌面与服务场景均受影响，是 v2 架构下亟需治理的技术债。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-27）

## 1. 今日速览

Qwen Code 发布 **v0.26.2-preview.0** 预览版，核心变更是 managed 模式新增会话权限规则与 Auto approval 支持，同时修复了 serve token 解析的安全隐患。Issue 侧两条 P1/P2 级 headless 模式权限 bug 引发热议（auto-memory 永远无法保存、`2>&1` 被误判为文件写入）。Kubernetes 工具运行时（#13395）S1 验收通过两项原生回归，配套的实验性 Helm 部署 PR（#15492）正在推进。

---

## 2. 版本发布

- **v0.26.2-preview.0**：[feat(managed): 会话权限规则与 Auto approval](https://github.com/QwenLM/qwen-code/pull/15448)（@doudouOUC）；fix(cli): 加固 serve token 解析。
- **v0.26.1-nightly.20261026**：与 preview 版包含相同的 managed 权限与 token 修复。
- **sdk-typescript v0.1.23**：捆绑 CLI 0.26.1，与 CLI 同源构建。

---

## 3. 社区热点 Issues

1. **#15597 [P1] Headless -p 模式下 managed auto-memory 永远无法保存** — 隐式 edit/write_file deny 覆盖了 memory agent 的 scoped allow，导致记忆索引始终为空却仍消耗 token。7 条评论，属于功能直接失效级别。[链接](https://github.com/QwenLM/qwen-code/issues/15597)

2. **#15600 [P2] `2>&1` fd 重定向被解析为写文件 "&1"** — headless 只读命令含 `2>&1` 即被 deny，影响面广的 shell 权限解析 bug。[链接](https://github.com/QwenLM/qwen-code/issues/15600)

3. **#15675 [P1] sed 模拟与真实 sed 行为不一致** — 进程内 sed 模拟缺少 `s`/`u` 正则标志，`.` 不匹配 `\r` 和完整 emoji，可能造成静默的文件编辑偏差。[链接](https://github.com/QwenLM/qwen-code/issues/15675)

4. **#13395 Kubernetes 工具运行时追踪** — S1 两项原生回归通过，但 SDK CI 门禁仍有缺口，保持 OPEN。25 条评论，是平台化交付的主线追踪 Issue。[链接](https://github.com/QwenLM/qwen-code/issues/13395)

5. **#15526 [P2] warn 模式下循环提醒仅发一次，随后 59 次相同调用无守卫** — 模型对同一文件 `read_file` 70 次的失控循环暴露防护缺口，本地模型用户高发。[链接](https://github.com/QwenLM/qwen-code/issues/15526)

6. **#15660 [P2] Subagent 起始上下文异常膨胀** — 父会话 42k，subagent 却以 105k prompt 起步且逐个增大，token 成本直接受损，等待补充信息中。[链接](https://github.com/QwenLM/qwen-code/issues/15660)

7. **#1379 [已关闭] 请求移除 Co-authored-by: Qwen-Coder 署名** — 去年年底的老 Issue 昨日再次活跃，反映社区对提交署名策略的持续不满。[链接](https://github.com/QwenLM/qwen-code/issues/1379)

8. **#15470 [P2] CI 失败报告器失效** — 10 月 24 日 3.5 小时内 10 次 main 分支失败产生 0 个 Issue，hosted runner 等待 20-100 分钟后被丢弃，影响问题可追溯性。[链接](https://github.com/QwenLM/qwen-code/issues/15470)

9. **#14724 Managed Agent gate CI 失败** — 64 条评论，本月最活跃的 CI 失败追踪 Issue，持续未定位到具体测试。[链接](https://github.com/QwenLM/qwen-code/issues/14724)

10. **#15686 [P2] Active Goal 期间普通用户输入被无限期排队** — Goal 激活时 Enter 转向消息与粘贴内容均不送达，与快捷键文档语义矛盾。[链接](https://github.com/QwenLM/qwen-code/issues/15686)

---

## 4. 重要 PR 进展

1. **#15492 实验性 Kubernetes 一键 Helm 部署**（@doudouOUC）— Managed Agent 控制面 + Hosted Harness + 持久 MySQL，与 #13395 验收配套。[链接](https://github.com/QwenLM/qwen-code/pull/15492)
2. **#15632 managed-agent 扫描器 row-pool 残留清理**（@yiliang114）— 移除 35 行仅为测试存在的生产适配器，关闭 #15527 的四项残留。[链接](https://github.com/QwenLM/qwen-code/pull/15632)
3. **#15668 Web Shell 展示并管理 /autofix-pr watches**（@wenshao）— autofix-pr 可用性四部曲收官之作。[链接](https://github.com/QwenLM/qwen-code/pull/15668)
4. **#15634 channels 新增 inject 派发模式**（@Eric-GoodBoy-Tech）— 运行中 turn 可在工具批次边界读取新到消息，而非缓冲到 turn 结束。[链接](https://github.com/QwenLM/qwen-code/pull/15634)
5. **#15558 修复不支持的 Anthropic 强制工具选择**（@Adkid-Zephyr）— Claude Opus 5.5 / Sonnet 5.5 等模型改用 `auto` + 显式工具命名。[链接](https://github.com/QwenLM/qwen-code/pull/15558)
6. **#15422 持久会话 Workflow 模式（DW-04A）**（@qqqys）— `--workflow-mode on`、SDK、ACP/daemon 多入口统一。[链接](https://github.com/QwenLM/qwen-code/pull/15422)
7. **#15625 `/verify-pr` 命令绑定 PR badge**（@wenshao）— 与 `/review` 对齐的会话-PR 关联。[链接](https://github.com/QwenLM/qwen-code/pull/15625)
8. **#15030 提升 workspace skill 安装限额**（@callmeYe）— 拆分传输上限与磁盘上限，突破 2026-07 以来的硬编码 6 MiB 预算。[链接](https://github.com/QwenLM/qwen-code/pull/15030)
9. **#15611 Generated UI 实例跨导航保留**（@qqqys）— iframe 与 Worker 复用，避免页面切换后状态丢失。[链接](https://github.com/QwenLM/qwen-code/pull/15611)
10. **#14335 完成子会话 TTL 自动清理**（@4ekuct25）— `serve.subSessionCompletionTtlHours` 配置化清理已完成 sub-session，缓解 daemon 存储膨胀。[链接](https://github.com/QwenLM/qwen-code/pull/14335)

---

## 5. 功能需求趋势

- **平台化 / Kubernetes 交付**：#13395、#15512（外部 Hosted Workspace profile phase 2）、PR #15492，managed 部署是当前主线方向。
- **多 Agent 协作**：#15682 提出用户级全局 agents/squads 跨 workspace 复用；#13749 请求 Claude Code 风格的 Mod runtime 兼容层。
- **渠道集成扩展**：#15618（Microsoft Teams 扩展）、#15631（QQ bot 主动投递语义）、PR #14348（QQ 撤回工具），channel 生态持续扩张。
- **Web Shell / 桌面体验打磨**：#13175（快捷键）、#15629（重命名预选）、#15683（transcript 顶置 prompt），UI 细节需求密集。
- **Autofix / 自动化运维**：/autofix-pr 系列与 CI 失败自动归档（#15470）显示工程自动化投入加大。

---

## 6. 开发者关注点

- **Headless/自动化模式的权限模型不成熟**：#15597、#15600 均为 `-p` 模式下权限规则过于保守导致的硬性功能失效，是当前最紧迫的痛点。
- **Token / 上下文成本**：subagent 上下文膨胀（#15660）、auto-memory 空转耗 token、循环调用无守卫（#15526），长任务成本控制被反复提及。
- **CI 基础设施可靠性**：多条 Issue（#14724、#15470、#15677）指向 CI 失败上报失效与 hosted runner 不稳定，测试基建负债明显。
- **工具实现的保真度**：sed 模拟偏差（#15675）提示进程内模拟真实 shell 工具的策略存在正确性风险。
- **署名与社区体验**：#1379 的回温说明 Co-authored-by 署名仍是最直观的社区负面反馈点。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*