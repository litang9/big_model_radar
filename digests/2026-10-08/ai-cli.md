# AI CLI 工具社区动态日报 2026-10-08

> 生成时间: 2026-10-08 00:11 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告 · 2026-10-08

---

## 1. 生态全景

AI CLI 工具已从“单轮代码补全”全面进化为**多智能体编排 + 沙箱化执行 + 企业级管控**的综合平台。头部厂商（Anthropic、OpenAI、Google、GitHub）均在加速打磨 subagent 架构、安全沙箱与合规能力，竞争焦点转向可靠性与成本控制。**长会话上下文管理（compaction/记忆连续性）成为全行业共同痛点**，而 Windows 平台稳定性普遍是短板。开源阵营（OpenCode、Qwen Code）以架构创新（AST 工具链、K8s 运行时）和社区驱动形成差异化竞争。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | 重要 PR | Release | 今日核心事件 |
|---|---|---|---|---|
| **Claude Code** | 10+（3 条其他） | 8 | v2.1.293 | Haiku 5.5 发布；hookify 安全双修；HIPAA 合规示例 |
| **OpenAI Codex** | 10（Windows 事故 8+ 条） | 10 | 0.161.0 正式版 | GPT-6.1 Sol 默认；**Windows sandbox 大规模故障** |
| **Gemini CLI** | 10 | 10 | nightly v0.65.0 | Subagent 可靠性问题集中；认证循环修复 |
| **Copilot CLI** | 10 | 0 | **5 个版本**（v1.0.93→94-2） | 沙箱 GA 全量开放；企业策略管控 |
| **OpenCode** | 10 | 10 | 无 | VS Code 扩展需求 160👍 领跑；fs watcher CPU 故障簇 |
| **Qwen Code** | 10+ | 10 | nightly v0.25.0 | Managed Agent 架构密集推进；安全细节问题 |
| **Kimi Code CLI** | 0 | 0 | 无 | 无活动 |

> 活跃度排序：Codex ≈ Claude Code > Qwen Code ≈ OpenCode ≈ Gemini CLI > Copilot CLI（发版驱动）> Kimi Code（沉寂）。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **Subagent 可靠性与成本控制** | Claude Code、Gemini CLI、Qwen Code | 状态误报/挂起（Gemini #22323/#21409）、per-call effort 覆盖（Claude #77298, 24👍）、高成本子代理确认闸门（Claude #95313）、错误详情回传（Qwen #13597） |
| **上下文压缩与记忆连续性** | Claude Code、Codex、Copilot CLI | compaction 后状态存活（Claude #70555）、图像载荷压缩死循环（Codex #33493）、compact 时机与缓存成本（Copilot #5064） |
| **沙箱与权限模型平衡** | Codex、Copilot CLI、Gemini CLI、Qwen Code | Windows sandbox 故障（Codex）、沙箱白名单联动（Copilot #5076）、安全提示过度拦截（Gemini #29672）、密码输入白名单逃生舱（Claude #78160, 21👍） |
| **Windows 平台稳定性** | Codex、Claude Code、Copilot CLI、Qwen Code | 进程泄漏、静默失败、安装器/认证问题是四家共同的重灾区 |
| **MCP 生态可靠性** | Claude Code、Copilot CLI、Qwen Code、Gemini CLI | OAuth/认证失败、配置热重载、工具数量上限（Gemini 128 工具 400 错） |
| **Token 失控防护** | Qwen Code、Gemini CLI、Codex | 死循环烧 5-14M tokens（Qwen #10887, P1）、只读探索不收敛提醒 |
| **企业合规与管控** | Claude Code、Copilot CLI、Codex | HIPAA 示例、托管策略强制审批模式、Bedrock GovCloud |

---

## 4. 差异化定位分析

| 工具 | 技术路线侧重 | 目标用户 | 差异化标签 |
|---|---|---|---|
| **Claude Code** | 模型迭代 + hooks 扩展 + 企业合规 | 专业开发者、合规企业 | 生态最完整（桌面/Remote Control/Routines/MCP），安全默认值激进 |
| **OpenAI Codex** | Rust 重构、Bazel 基建、Bedrock 多云 | Plus/Pro/Business 全层覆盖 | 推测性执行（prediction fork）、dot 自主智能体，工程基建投入最重 |
| **Gemini CLI** | 架构探索（AST 工具链、零依赖沙箱） | 开发者 + Google 生态用户 | 设计提案驱动的开放路线图，token 效率创新最活跃 |
| **Copilot CLI** | 沙箱 GA + 企业策略管控 | GitHub/微软企业生态 | 发版节奏最快（日 5 版），Entra/Azure 深度绑定 |
| **OpenCode** | 插件生态、多 provider、本地模型 | 开源社区、自建模型用户 | 唯一深度支持本地 provider 的头部工具，社区需求驱动 |
| **Qwen Code** | Managed Agent 双路径架构 + K8s/平台化 | 平台构建者、云原生团队 | 架构野心最大（Session 持久化契约、K8s 工具运行时、Android） |

---

## 5. 社区热度与成熟度

- **成熟稳定期**：Claude Code——功能全面但进入“细节打磨 + 投诉存量问题”阶段（Routines/Remote Control 可靠性）；Codex——功能领先但正经历**Windows sandbox 危机**（单 issue 50 评论），工程响应迅速。
- **快速迭代期**：Copilot CLI（沙箱 GA 后问题量上升，预计持续）、Gemini CLI（subagent 痛点集中但修复节奏快）。
- **架构演进期**：Qwen Code（#12380 提案驱动，PR 密度高但交付周期长）、OpenCode（v2 密集修复，回归跟进迅速，社区参与度最高——160👍 的 VS Code 需求）。
- **观察名单**：Kimi Code CLI 完全沉寂，社区活跃度显著落后第一梯队。

---

## 6. 值得关注的趋势信号

1. **多智能体成本失控是下一个爆发点**：Claude（确认闸门）、Qwen（token 空转 P1）、Gemini（状态误报）三家同时出现——成本可观测性与前置确认将成为标配功能，建议团队在编排层自建防护。
2. **沙箱从“能力”变为“底线”**：Codex 三平台完整性检查框架、Copilot 沙箱 GA、Gemini 零依赖沙箱提案、Qwen 私有 CSI 运行时——执行隔离已成竞争必选项，但**Windows 沙箱实现普遍不成熟**。
3. **安全默认值与开发者自主权的张力公开化**：硬拦截密码（Claude）、审批回归（Copilot）、安全误报（Gemini）——行业需要“信任环境分级 + 逃生舱”机制，一刀切策略引发持续反弹。
4. **MCP 生态进入“深水区”**：认证、热重载、工具数量上限、隐私（GMail 追踪链接）等问题取代连接性成为主要矛盾。
5. **对开发者的即时建议**：Codex Windows 用户暂缓升级 26.1002 系列；重度长会话用户关注各工具 compaction 修复进展；自主智能体（dot）使用者注意 Codex #49873 安全暂停失步问题。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-10-08）

## 一、热门 Skills 排行（按社区关注度）

| # | Skill / PR | 功能 | 讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 触发评估修复**（#1298） | 修复 trigger eval 误报、Windows 兼容、运行时失败误判 | 与 Issues #556（0% 触发率）、#1383（Windows 触发评估损坏）高度关联，是 meta-tooling 最热话题 | OPEN，活跃更新至 9 月 |
| 2 | **mcp-builder MCP v2 兼容修复**（#1742） | 支持 `mcp>=2.0.0` 的 import 改名与自定义 HTTP 头 | 对应 Issue #1390（eval 对真实 MCP server 全部 0 分），MCP 生态迁移痛点 | OPEN，9 月底仍在更新 |
| 3 | **proofcore-contract-auditor**（#1771） | Solidity/Rust 智能合约静态分析 + TON 链上审计存证 | Web3 + Skills 结合的代表案例，也引发“第三方推广型 skill”边界讨论 | OPEN |
| 4 | **md2video-audio**（#1703） | Markdown 一键编译为带真人配音的 MP4 视频（Marp 管线，零成本） | 内容创作自动化方向，9 月持续讨论 | OPEN |
| 5 | **AWT (AI Watch Tester)**（#822） | AI 视觉 + 浏览器控制的零代码 E2E 测试 | 测试自动化长尾需求，讨论延续近半年 | OPEN |
| 6 | **document-typography**（#514） | 修复 AI 生成文档的孤行、寡段落、编号错位等排版问题 | “用户不会主动要求但影响所有输出”的典型痛点 | OPEN，3 月后趋冷 |
| 7 | **pyxel 复古游戏开发**（#525） | Python 复古游戏的创建/调试/无头验证 | 垂直领域（游戏）skill 代表 | OPEN |
| 8 | **notion-spec-to-implementation**（#1245） | Notion 规格文档自动拆解为可执行任务 + 量化简历审计 | 项目管理/工作流自动化诉求，9 月底仍活跃 | OPEN |

安全修复类 PR 近期密集出现，同样高关注：eval viewer 安全加固 #1961（脚本逃逸、DNS rebinding、XSS）、webapp-testing 命令注入修复 #1980、docx 孤立批注检测 #1734、docx LibreOffice 超时误报成功修复 #1792。

## 二、社区需求趋势

1. **Skill 安全与信任机制**（最大声量）：Issue #492（43 条评论）指出社区 skill 冒用 `anthropic/` 命名空间构成信任边界漏洞；配套涌现 skill-security-analyzer（PR #83）、eval-viewer XSS 修复（#1394、#1961）等。
2. **企业协作 / 组织级共享**：#228 呼吁 Claude.ai 组织内 skill 共享库，替代 Slack 手动传文件。
3. **Meta-tooling：Skill 评估与质量门禁**：#556（触发率 0%）、#1383（六项 skill-creator 缺陷）、#1385（推理质量三道门禁提案）、#202（skill-creator 应遵循自身最佳实践）——社区强烈要求“给 skill 做体检的工具”。
4. **上下文效率**：#1487（claude-api skill 单次注入 156k token 打爆上下文）、#189（插件重复安装导致 context 冗余）、#1329（compact-memory 符号化压缩 agent 状态）。
5. **文档处理深化**：docx/pdf/odt 修正类 PR 多条（#1734、#1792、#486、#538），ODT 等开放格式支持仍是空白。
6. **AI 治理与 Agent 安全**：#412（agent-governance 提案）、#1175（SharePoint 权限逻辑写进 SKILL.md 的安全隐患）。

## 三、高潜力待合并 Skills

- **#1298** skill-creator 触发评估修复 —— 直击多个高热度 Issues，合并价值最高
- **#1742** mcp-builder 兼容 mcp>=2 —— 关联 Issue #1668/#1390，是 MCP v2 迁移必经修复
- **#1792 / #1734** docx 批注健壮性系列 —— 文档 skill 为官方维护重点
- **#1961 / #1980** eval viewer 与 webapp-testing 安全加固 —— 与安全大趋势契合，更新至 10 月初
- **#1730** claude-api 死链修复 —— 小而确定，10 月初仍有活动
- **#1245 / #1703** Notion 工作流与 Markdown 转视频 —— 需求侧讨论活跃，可能近期落地

## 四、生态洞察（一句话）

**社区最集中的诉求是从“能用的 skill”走向“可信的 skill 生态”——即建立命名空间信任边界、安全审计、可复现的触发评估与上下文高效加载机制，其次才是垂直领域新 skill 的广度扩展。**

---

# Claude Code 社区动态日报 · 2026-10-08

---

## 1. 今日速览

Claude Code 发布 **v2.1.293**，新增 Claude Haiku 5.5 模型（1M 上下文，成为 API 默认 Haiku 模型），并增强 subagent 状态栏的脚本可编程性。社区方面，**桌面端 Routines（定时任务）可靠性问题**与 **Remote Control 连接稳定性**成为投诉焦点；功能需求上，“上下文压缩后工作状态连续性”与“子代理成本控制”获得较高关注。

---

## 2. 版本发布

### v2.1.293
- **新增 Claude Haiku 5.5**（`claude-haiku-5-5`），现为 Anthropic API 默认 Haiku 模型：1M 上下文，定价 $0.10/$0.50 per Mtok（超 100K tokens 的 prompt 为 $0.50/$2.50）
- `subagentStatusLine` payload 新增 `agentType` 字段，脚本可区分自定义子代理类型

---

## 3. 社区热点 Issues

**1. [#66010] GMail MCP 将 URL 重写为带 Google 追踪参数的链接（隐私问题）** — 20 评论 / 7 👍
标签含 `PRIVACY`，长期未解决的隐私争议，MCP 生态可信度问题的典型代表。
🔗 https://github.com/anthropics/claude-code/issues/66010

**2. [#70555] 长会话压缩后“变傻”：工作状态应能在 compaction 和 /clear 后存活** — 15 评论
直击长会话核心痛点：压缩后重复推导、遗忘进行中的任务、自信但错误的输出。社区共鸣强烈。
🔗 https://github.com/anthropics/claude-code/issues/70555

**3. [#78160] 硬性禁止输入密码破坏合法开发/测试流程，请求权限门控的白名单机制** — 13 评论 / 21 👍
安全默认值 vs 开发者自主权的经典矛盾，👍 数最高的安全类需求，值得官方重新权衡。
🔗 https://github.com/anthropics/claude-code/issues/78160

**4. [#57286] Remote Control 初始化失败（macOS）** — 16 评论 / 4 👍
长期存在的 macOS 桌面端连接问题，已被标记 duplicate 但持续有新反馈。
🔗 https://github.com/anthropics/claude-code/issues/57286

**5. [#77298] 请求 Agent (Task) 工具支持按调用设置 effort 参数** — 8 评论 / 24 👍
今日 👍 最高的功能请求：目前 effort 只能在 agent 定义文件中预设，无法调用时覆盖。
🔗 https://github.com/anthropics/claude-code/issues/77298

**6. [#95967] Routines 运行记录不再出现在桌面侧栏和 Remote Control** — 8 评论 / 6 👍
定时任务执行结果“消失”，跨设备续接工作流被打断。
🔗 https://github.com/anthropics/claude-code/issues/95967

**7. [#95966] 定时任务静默跳过触发窗口（Windows 桌面端）** — 8 评论
5 天持续观测确认任务静默失败：无报错、无运行历史，可靠性问题严重。
🔗 https://github.com/anthropics/claude-code/issues/95966

**8. [#96299] Windows 上 claude.exe 进程累积不释放，一天下来 RAM/磁盘高占用** — 7 评论
Windows 桌面端资源泄漏，直接影响日常开发体验。
🔗 https://github.com/anthropics/claude-code/issues/96299

**9. [#95313] 请求在生成高成本子代理前需用户确认** — 8 评论
成本控制诉求：多代理编排下 token 消耗不可预期，用户希望增加确认闸门。
🔗 https://github.com/anthropics/claude-code/issues/95313

**10. [#96662] 更新后 Auto Mode 分类器在合法多代理工作流中误报** — 3 评论 / 2 👍
权限自动判定引入的新误伤，提示 Auto Mode 分类策略需要细化。
🔗 https://github.com/anthropics/claude-code/issues/96662

其他值得留意：[#100317](https://github.com/anthropics/claude-code/issues/100317) Routines 的 "Default" 模型静默跟随上次交互模型、[#96220](https://github.com/anthropics/claude-code/issues/96220) 重启后 Remote Control 全部被关闭、[#100347](https://github.com/anthropics/claude-code/issues/100347) 子代理文档遗漏 per-invocation 参数说明。

---

## 4. 重要 PR 进展

**1. [#100293] 新增 HIPAA 合规 managed-settings 示例**（新 PR）
提供 `hipaa-baseline.json` 与 MCP 锁定配置样例，面向医疗合规企业的内容外发管控。
🔗 https://github.com/anthropics/claude-code/pull/100293

**2. [#84364] hookify: pretooluse 钩子异常时 fail-closed**
修复安全漏洞：规则评估异常时原先返回 0 放行工具执行，现改为 deny。
🔗 https://github.com/anthropics/claude-code/pull/84364

**3. [#85716] hookify: 从祖先 .claude 目录加载规则，防止静默绕过**
修复安全规则在子目录场景下被静默跳过的 bypass 风险。
🔗 https://github.com/anthropics/claude-code/pull/85716

**4. [#86746] 保留 Python 解释器探测错误信息**
安全指引脚本报错信息从 `/dev/null` 恢复，提升诊断体验。
🔗 https://github.com/anthropics/claude-code/pull/86746

**5. [#85323] 修复 agent 描述 YAML block scalar 解析**
`validate-agent.sh` 正确测量多行 `description: |` 内容，修复误报。
🔗 https://github.com/anthropics/claude-code/pull/85323

**6. [#82320] 修复 AWS gateway 示例脚本在 macOS bash 3.2 上崩溃**
`${VAR,,}` 语法需 bash 4+，macOS 自带 3.2 直接中止。
🔗 https://github.com/anthropics/claude-code/pull/82320

**7. [#99206] [已关闭] /diff 停靠面板首行空行修正**
官方维护的 UI 细节修复，停靠面板头部行渲染逻辑调整。
🔗 https://github.com/anthropics/claude-code/pull/99206

**8. [#41447] feat: open source claude code**（社区玩笑式长寿 PR）
引用 5 个相关 issue 的“开源请求”，持续被社区顶起，反映开源期待。
🔗 https://github.com/anthropics/claude-code/pull/41447

> 注：今日仅 8 条 PR 更新，安全类（hookify 两连修）与合规示例为亮点。

---

## 5. 功能需求趋势

| 方向 | 代表 Issues | 热度信号 |
|---|---|---|
| **子代理精细化控制** | #77298（per-call effort，24👍）、#95313（成本确认闸门）、#100347（文档补全） | 🔥🔥🔥 最活跃方向 |
| **内存/上下文连续性** | #70555（compaction 存活）、#82638（compact 后补全失效） | 🔥🔥 长会话刚需 |
| **定时任务（Routines）可靠性** | #95966、#95967、#100317 | 🔥🔥 三条并发投诉 |
| **Remote Control 稳定性** | #57286、#96220、#100106 | 🔥🔥 重启/更新后断连 |
| **权限模型灵活性** | #78160（密码输入白名单，21👍）、#96662（Auto Mode 误报） | 🔥🔥 安全默认 vs 开发效率 |
| **企业合规** | PR #100293（HIPAA 示例） | 🔥 官方侧持续投入 |
| **Hooks 扩展** | #100201（后台任务结束钩子） | 🔥 新兴需求 |

---

## 6. 开发者关注点

1. **Windows 桌面端是问题重灾区**：进程泄漏（#96299）、定时任务静默失败（#95966）、插件 MCP 服务器无法启动（#82622）、权限误报（#96662）。
2. **长会话记忆衰减**仍是最大体验痛点，compaction 后能力下降直接影响复杂任务交付质量。
3. **成本可观测性不足**：多代理场景下希望对高开销操作有前置确认与更清晰的计费边界。
4. **安全机制需要“逃生舱”**：密码硬拦截、localhost 导航限制等一刀切策略，开发者普遍要求基于信任环境的 opt-in 机制。
5. **文档滞后于功能**：per-invocation `effort`/`model` 参数文档缺失（#100347），社区已在自行发现未文档化能力。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-08

## 📌 今日速览

Windows 平台成为今日最大痛点：26.1002 版本更新后，sandbox 初始化因 `node_repl.exe` 共享冲突（os error 32）大面积失败，单日涌现 8+ 个相关 Issue。版本方面，**Codex CLI 0.161.0 正式发布，GPT-6.1 Sol 成为默认模型**，同时引入 Bedrock 多智能体 V2 支持。工程侧，团队合并了一整套跨平台 sandbox 完整性检查框架和 Bazel 构建体系 PR，疑似为解决当前的 Windows sandbox 危机铺路。

---

## 🚀 版本发布

### [rust-v0.161.0（正式版）](https://github.com/openai/codex/releases)
- **GPT-6.1 Sol 成为内置目录与 Amazon Bedrock 目录的默认模型**（#49318, #49339）
- Amazon Bedrock 支持**多智能体 V2** 与兼容模型的 **Ultra reasoning**；Bedrock Mantle 支持 AWS GovCloud 区域（#49345, #49813）
- 支持登录 MCP 服务器

另有 alpha 版迭代：[0.162.0-alpha.18](https://github.com/openai/codex/releases)、[0.162.0-alpha.17.1](https://github.com/openai/codex/releases)

---

## 🔥 社区热点 Issues（Top 10）

**Windows sandbox 事故是今日绝对焦点，以下前 5 条相互关联：**

1. **[#51601](https://github.com/openai/codex/issues/51601)** — Windows app 26.1002.51308 sandbox 初始化在验证自身运行时时遇 sharing violation，**所有命令执行失败**。50 条评论，18 👍，是本次事故的汇总帖。

2. **[#51590](https://github.com/openai/codex/issues/51590)** — sandbox 对运行中的 `node_repl.exe` 执行 ACL 更新时被 error 32 锁定，Computer Use 与 shell 全部阻塞。根因定位帖。

3. **[#51851](https://github.com/openai/codex/issues/51851) / [#51862](https://github.com/openai/codex/issues/51862) / [#51777](https://github.com/openai/codex/issues/51777)** — 同一问题的持续追踪：**重启应用也无法恢复**，普通会话与 dot 任务均受影响，波及 Plus/Pro/Business 各订阅层。

4. **[#49458](https://github.com/openai/codex/issues/49458)**（64 评论，24 👍）— dot 启动的本地任务缺少 Computer Use 工具，普通本地会话正常。与今日新增的 [#51882](https://github.com/openai/codex/issues/51882) 相互印证，说明 dot 委托任务的工具注入链路存在系统性问题。

5. **[#51881](https://github.com/openai/codex/issues/51881)** — Windows CLI 0.160.0 初始化 in-process app-server 时报 os error 5，`--no-daemon` 也无法绕过，问题可能超出 sandbox 层。

6. **[#49873](https://github.com/openai/codex/issues/49873)** — **安全问题**：dot safety-pause 状态失步，自主执行继续运行而人类控制/恢复通道被阻断。涉及 $200/月 Pro 用户，值得安全团队关注。

7. **[#33493](https://github.com/openai/codex/issues/33493)** — compaction v2 未清理 `input_image` 载荷，图像密集的长会话陷入无限自动压缩循环。长期影响重度桌面用户。

8. **[#50254](https://github.com/openai/codex/issues/50254) / [#50608](https://github.com/openai/codex/issues/50608)** — Windows 桌面端卡在 "Organization settings could not be loaded"，app-server 无法启动（os error 5）。代理网络环境和 MSIX 安装渠道用户受影响明显。

9. **[#41695](https://github.com/openai/codex/issues/41695)** — iPad 访问远程 Codex 会话频繁冻结，移动端远程会话稳定性仍是短板。

10. **[#48913](https://github.com/openai/codex/issues/48913)**（已关闭，34 👍）— 要求增加关闭随机会话问候语的配置项。**高赞快速落地**，显示团队对 CLI 体验反馈响应积极。

---

## 🔧 重要 PR 进展

1. **[#51843](https://github.com/openai/codex/pull/51843)** — 在命令执行与文件系统操作前统一运行 sandbox 完整性检查，**直接回应 Windows sandbox 事故**。
2. **[#51842](https://github.com/openai/codex/pull/51842)** — 新增 sandbox 完整性运行器，带结果与耗时指标，支持三大平台。
3. **[#51841](https://github.com/openai/codex/pull/51841) / [#51840](https://github.com/openai/codex/pull/51840) / [#51831](https://github.com/openai/codex/pull/51831)** — 完整性检查三平台后端落地：macOS Seatbelt、Linux bubblewrap、Windows MXC，构成完整的沙箱依赖盘点框架。
4. **[#51848](https://github.com/openai/codex/pull/51848) + [#51856](https://github.com/openai/codex/pull/51856)** — Bazel 构建体系对齐 Cargo 并纳入发布矩阵，未来将以 `-bazel` 后缀并行发布双构建产物，工程基础设施重大升级。
5. **[#51884](https://github.com/openai/codex/pull/51884)** — 实验性 prediction fork 继承父级上下文与请求设置，最大化 prompt cache 复用，暗示推测性执行方向。
6. **[#51872](https://github.com/openai/codex/pull/51872)** — 全局 app-server 配置与启动目录解耦，修复[#50619](https://github.com/openai/codex/issues/50619)中“启动目录被删导致所有 TUI 会话阻塞”的问题。
7. **[#51835](https://github.com/openai/codex/pull/51835)** — `code_mode_interrupt` 转正为默认开启，中断 turn 时终止活跃的 code mode 单元与嵌套工具调用。
8. **[#51857](https://github.com/openai/codex/pull/51857)** — app-server prompt prefix 兼容性测试，防止默认 prompt 变更未加 feature flag 就发布。
9. **[#51866](https://github.com/openai/codex/pull/51866)** — 修复多行异步问题渲染丢失换行与链接错位。
10. **[#51823](https://github.com/openai/codex/pull/51823)** — MCP 工具元数据以 `Arc<[ToolInfo]>` 共享，消除 prepared call 的重复克隆。

---

## 📈 功能需求趋势

- **Windows 平台可用性**：今日 30 条热门 Issue 中约半数标记 `windows-os`，sandbox/ACL/app-server 是重灾区，社区呼吁发布前加强 Windows 回归测试。
- **Dot（自主智能体）稳定性与安全**：dot 任务工具缺失、safety-pause 失步、云环境执行失败（[#51883](https://github.com/openai/codex/issues/51883)）持续累积。
- **上下文管理**：压缩循环（#33493）、ChatGPT→WORK 切换丢失上下文（[#51297](https://github.com/openai/codex/issues/51297)）。
- **企业云集成**：Bedrock 多智能体/GovCloud 已落地；1Password 集成浏览器（[#32081](https://github.com/openai/codex/issues/32081)）仍有需求。
- **CLI 可配置性**：问候语开关已交付，显示“减少打扰性默认行为”是高赞需求方向。

---

## ⚠️ 开发者关注点

1. **Windows sandbox error 32 事故**是当前最高优先级：跨多个版本（51308/52244）、影响命令执行/浏览器控制/Computer Use 全链路，且重启无效。观察 PR #51843 的发布节奏是否及时止血。
2. **auto-update 破坏性**：#50254、#49204、#51201 显示近期自动更新多次引入启动失败、权限重置等问题，macOS 也未能幸免。
3. **dot 安全线**：#49873 的“安全暂停失效”属于独特的信任级问题，建议使用 dot 自主执行的用户关注进展。
4. **Windows 文本渲染**：#14577（ClearType 缺失导致文字模糊）已开放近 7 个月仍未解决，是低频但持续的体验抱怨。

> 💡 建议：Windows 用户可关注 #51601 获取修复进展；需要稳定环境的专业用户可暂缓升级至 26.1002 系列。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-10-08

## 📌 今日速览

今日发布 nightly 版本 v0.65.0，重点修复了**不受信任目录的只读工作区设置**与**会话恢复时的重复工具响应**问题。社区方面，Subagent 相关问题持续占据热度榜首，包括 MAX_TURNS 中断被误报为成功、通用 Agent 挂起等 P1 级 Bug。PR 方向则集中在认证循环修复、沙箱状态持久化和安全误报消除等质量打磨工作。

---

## 🚀 版本发布

**v0.65.0-nightly.20261007.gef59c532f**

- **fix(cli)**: 在不受信任的文件夹中强制执行只读工作区设置（#29583，by @jvargassanchez-dot）——安全加固，防止非信任目录下的意外写入
- **fix(core)**: 修复恢复会话时出现重复工具响应轮次的问题（by @diegogodinezr）

---

## 🔥 社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** Subagent 触发 MAX_TURNS 后误报 `GOAL success`（P1，13 评论）
   中断被包装成成功结果，严重误导上层 Agent 决策，是当前 subagent 可靠性的核心痛点。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** 通用 Agent 挂起（P1，8 评论，👍 8）
   委派给 generalist agent 后永久挂起（用户等了 1 小时），社区共鸣度高，👍 数最多。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** 零依赖 OS 沙箱 + 执行后意图路由（P2，9 评论）
   利用 Gemini 3 原生 bash 能力（grep/sed/awk 链式操作）的方向性设计提案，讨论热烈。

4. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** Gemini 主动使用 skills/sub-agents 频率过低（P2，7 评论）
   自定义 skill 和子代理需显式指示才会触发，反映模型自主调度能力不足。

5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** AST 感知的文件读取/搜索/代码库映射 EPIC（P2，7 评论）
   探索用 AST 工具精确读取方法边界，减少 token 噪声与错误对齐读取，属长期架构方向。

6. **[#29669](https://github.com/google-gemini/gemini-cli/issues/29669)** Google 登录成功但无法访问 CLI（3 评论，今日新建）
   新鲜认证问题，显示"authentication succeeded"却无法进入 CLI，正在收集信息。

7. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** get-shit-done output hook 导致崩溃（P1，3 评论）
   在输出用户摘要阶段反复崩溃。

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** 超过 128 个工具时触发 400 错误（P2，3 评论）
   工具数量上限问题，期望 Agent 能智能裁剪工具作用域。

9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** browser subagent 在 Wayland 下失败（P1，3 评论）
   Linux 桌面生态兼容性问题。

10. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** Browser Agent 忽略 settings.json 配置覆盖（P2，4 评论）
    AgentRegistry 正确读取合并配置，但运行时未生效，配置链路断裂。

---

## 🔧 重要 PR 进展

1. **[#29655](https://github.com/google-gemini/gemini-cli/pull/29655)** ✅ 修复 OAuth/浏览器验证无限循环（P2）
   对应今日 #29669 等认证问题，为验证重试加上边界。

2. **[#29671](https://github.com/google-gemini/gemini-cli/pull/29671)** 沙箱中持久化认证与会话状态（P1）
   解决 #29461 报告的沙箱容器内反复认证、会话丢失问题。

3. **[#29672](https://github.com/google-gemini/gemini-cli/pull/29672)** 消除 untrusted flags 安全误报
   `ls -ld`、`grep -rn` 等无害命令不再触发安全确认中断，改善使用流畅度。

4. **[#29674](https://github.com/google-gemini/gemini-cli/pull/29674)** 修复 IdeServer.stop() 在 MCP 会话打开时永不 resolve
   VS Code companion 关闭挂起问题。

5. **[#29670](https://github.com/google-gemini/gemini-cli/pull/29670)** mid-stream 重试退避支持 abort 感知
   ESC 取消后不再继续重试循环、不再发出误导性 RETRY 事件。

6. **[#29665](https://github.com/google-gemini/gemini-cli/pull/29665)** ✅ gVisor 沙箱下网络隔离错误显式提示
   将泛化错误替换为明确的 gVisor 网络隔离说明。

7. **[#29612](https://github.com/google-gemini/gemini-cli/pull/29612)** ✅ 强制终端 user turn 不变量并规范化请求内容
   修复 `/rewind`、流中断后发送不合规请求导致 API 报错的问题。

8. **[#29629](https://github.com/google-gemini/gemini-cli/pull/29629)** 限制流式纯文本高度以减少闪烁
   缓解流式输出全屏清屏重绘的闪烁问题（关联 #21924 终端 resize 性能）。

9. **[#29641](https://github.com/google-gemini/gemini-cli/pull/29641)** ✅ 遥测支持自定义 OTLP headers
   兼容 Grafana Cloud、Honeycomb、Datadog 等带认证的 OTLP 端点。

10. **[#29445](https://github.com/google-gemini/gemini-cli/pull/29445)** ✅ 区分“无法读取”与“缺失”的 MCP 启用配置（P1）
    修复损坏的 `mcp-server-enablement.json` fail-open 导致已禁用 MCP 服务器被重新启用并覆盖配置的安全隐患。

---

## 📈 功能需求趋势

- **Subagent 可靠性与可观测性**：状态误报（#22323）、挂起（#21409）、轨迹分享（#22598）、bug 报告缺上下文（#21763）——subagent 是当前最大的问题聚集区
- **AST 感知工具链**：#22745/#22746/#22747 系列 EPIC，探索 tilth/glyph/ast-grep 等工具集成
- **安全与沙箱**：零依赖 OS 沙箱（#19873）、破坏性行为防护（#22672）、per-workspace 策略（#18397）
- **Token 效率**："Tactful Extraction" 精简读取（#19561）、文件式任务跟踪替代 in-context todo（#18836/#21000）
- **Browser Agent 增强**：配置覆盖生效（#22267）、会话接管与锁恢复（#22232）、Wayland 支持（#21983）

---

## ⚠️ 开发者关注点

1. **Agent 行为可信度**：成功/失败状态误报、静默挂起让用户难以信任委派结果，是当前最影响生产使用的痛点
2. **认证流程脆弱**：登录循环、沙箱内反复认证、缓存凭据切换账号困难（#29643）等认证问题本周集中出现
3. **安全提示过度拦截**：无害命令触发确认中断，打断自动化工作流（#29672 正在修复）
4. **工具数量上限**：MCP 生态扩展下 128+ 工具即 400 报错，需要工具智能路由/裁剪机制
5. **上下文与 token 成本**：大文件读取导致上下文膨胀（+15k tokens/turn），社区对精准读取方案呼声高

---

*数据来源：github.com/google-gemini/gemini-cli | 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-10-08）

## 1. 今日速览

过去 24 小时 Copilot CLI 连发 5 个版本（v1.0.93 → v1.0.94-2），命令沙箱（`/sandbox`、`--sandbox`）正式面向全部用户开放，并修复了分屏模式下会话切换的可靠性问题。社区方面，沙箱相关 bug（`/add-dir` 未同步白名单、Assisted Permissions 审批回归）和 MCP 连接问题（Cloudflare OAuth、Windows Entra 登录）成为讨论焦点。今日新增多个高质量 triage issue，涉及 Windows Terminal 配置误改、macOS 本地网络权限缺失等平台级问题。

## 2. 版本发布

| 版本 | 要点 |
|---|---|
| **v1.0.94-2** | 修复与杂项更新 |
| **v1.0.94-1** | 修复：分屏视图 reconcile 时点击 Sessions 侧栏可可靠切换会话 |
| **v1.0.94-0** | 托管设置要求更新版本时显示升级指引（不阻塞正常提示）；托管策略可禁用 Assisted Permissions，强制 Manual Approval 模式 |
| **v1.0.93-4** | ⭐ 命令沙箱（`/sandbox`、`--sandbox`）对**所有用户**开放；修复活跃 turn 中安全 `/user` 命令立即执行、拒绝不安全远程命令、排队 relay 主机命令 |
| **v1.0.93-3** | MCP 服务器配置变更可在 turn 之间生效，无需重启会话 |

**版本主线**：沙箱能力全面 GA + 企业管控（域边界 `permissions.limitTo`、策略强制审批模式）+ MCP 热重载。

## 3. 社区热点 Issues（Top 10）

1. **#400 [CLOSED]** — "No model available" 组织策略报错（57 评论 / 34 👍）
   全库最高热度 issue，企业用户普遍受影响 CLI 无法获取模型。已关闭，但仍是企业策略配置的典型案例。
   https://github.com/github/copilot-cli/issues/400

2. **#5076 [OPEN]** — `/add-dir` 不将目录加入沙箱白名单（3 评论）
   v1.0.93 沙箱 GA 后即刻暴露的配套缺陷，直接影响新功能可用性，与当日版本主线高度相关。
   https://github.com/github/copilot-cli/issues/5076

3. **#5066 [OPEN]** — Assisted Permissions 审批回归（3 评论）
   用户反馈近期辅助权限模式要求审批的命令明显增多，与 v1.0.94-0 引入的策略管控可能存在关联，值得团队关注。
   https://github.com/github/copilot-cli/issues/5066

4. **#5068 [OPEN]** — Windows MCP Entra 登录失败（8 👍）
   Azure DevOps MCP 服务器 scope 校验失败，微软生态用户受阻， 👍 增长快。
   https://github.com/github/copilot-cli/issues/5068

5. **#4991 [OPEN]** — Cloudflare MCP "Subscription limit reached"（4 评论）
   OAuth 成功后远程 MCP 服务器仍不可用，随后误报需要认证，远程 MCP 可靠性问题代表。
   https://github.com/github/copilot-cli/issues/4991

6. **#5074 [OPEN]** — Windows Terminal 快捷键设置弹窗默认"Yes"，误按 Enter 改写 settings.json
   新鲜 triage issue，首字母即默认确认 + 抢占焦点，属于典型的 UX 破坏性操作风险。
   https://github.com/github/copilot-cli/issues/5074

7. **#5072 [OPEN]** — macOS Copilot.app 缺少 `NSLocalNetworkUsageDescription`
   macOS 26 上所有子进程（CLI、MCP、shell）均无法访问本地子网主机，平台级权限声明缺失。
   https://github.com/github/copilot-cli/issues/5072

8. **#4731 [CLOSED]** — 取消的工具调用导致 MCP 服务器工具永久丢失
   复杂的时序 bug：取消 tool call 后立刻向同一服务器发 tools/list 刷新，超时后该进程内工具永久剥离。已修复关闭。
   https://github.com/github/copilot-cli/issues/4731

9. **#3534 [OPEN]** — WSL2 ARM64 `/copy` 失败（8 评论）
   cmd.exe 引号包装 bug 导致 clip.exe 退出码 1，ARM64 用户剪贴板功能不可用，长期未解。
   https://github.com/github/copilot-cli/issues/3534

10. **#4652 [CLOSED]** — Windows 25H2 报“沙箱不支持此主机”
    最新 Windows 预览版上沙箱误报不支持，随沙箱 GA 该类兼容性问题将持续出现。已关闭。
    https://github.com/github/copilot-cli/issues/4652

## 4. 重要 PR 进展

过去 24 小时无活跃 PR 更新（数据源显示 0 条），本节省略。核心代码变更已通过上述 5 个 release 直接交付。

## 5. 功能需求趋势

- **上下文与成本优化**：社区强烈关注上下文重建性能（#5067）、`/compact` 时机与提示缓存成本（#5064）、会话级累计 token 用量暴露（#5065）
- **沙箱体验完善**：`/add-dir` 与白名单联动（#5076）、`/ide` 在沙箱下无法发现工作区（#4909）
- **MCP 生态可靠性**：Windows Entra 认证（#5068）、Cloudflare 远程连接（#4991）、工具目录未就绪时的误报"No tools found"（#5069）
- **企业管控与可观测性**：hook 事件覆盖用户中止场景（#5075），扩展自动化集成能力

## 6. 开发者关注点

1. **沙箱是当前最大痛点聚集地**：版本高频迭代与 bug 密度并存——白名单同步、Windows 文件系统权限（#4788）、`enabled: false` 未生效（#4679）、文档与实际能力不符（#3861）。沙箱 GA 后预计问题量继续上升。
2. **跨平台一致性不足**：WSL2 ARM64 剪贴板（#3534）、macOS 本地网络权限（#5072）、Windows 25H2 沙箱兼容（#4652）、winget 升级路径破坏（#5071）——Windows/WSL 相关 issue 占比显著。
3. **危险 UX 默认值**：多个 issue 反馈默认选中破坏性选项（#5074）、Ctrl+C 在弹窗场景下误拒绝确认（#4789）、Ctrl-D 丢弃表单输入（#4866），键位与焦点管理需系统性梳理。
4. **MCP 认证与超时仍是顽疾**：Azure MCP `learn=true` 180 秒超时回归（#4749）表明性能回归监控有缺口。
5. **企业用户是高影响力群体**：#400 的热度说明组织策略/模型启用配置的报错诊断体验仍需改善。

---
*数据来源：github.com/github/copilot-cli · 统计窗口：过去 24 小时（Issues 33 条更新，PR 0 条）*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-10-08

## 📌 今日速览

今日无新版本发布，但社区活跃度持续高涨。**VS Code 官方扩展请求**（#11176）以 160 👍 持续领跑功能需求；Windows 安装生态（winget 官方包）问题落地关闭。v2 版本进入密集修复期，核心贡献者 @kitlangton 单日提交多个 well-known 配置健壮性与 TUI 修复 PR，文件监视器 CPU 占用问题成为本日新焦点。

---

## 🚀 版本发布

过去 24 小时无新 Release。

---

## 🔥 社区热点 Issues

1. **#11176 [FEATURE] 官方 VS Code 扩展** — 160 👍 / 30 评论，长期霸榜。社区对原生 VS Code 集成的诉求强烈，是目前最重要的功能请求。
   https://github.com/anomalyco/opencode/issues/11176

2. **#5121 [CLOSED] Windows winget 安装** — 文档缺失 winget 入口且包版本与 Releases 不一致的问题终于关闭，配套功能请求 #49554（官方 winget 包）仍在推进，Windows 分发链路正在规范化。
   https://github.com/anomalyco/opencode/issues/5121

3. **#26602 Desktop 对慢速本地 provider 固定 5 分钟 Headers Timeout** — 18 评论。即使配置 `"timeout": false` 也被强制 5 分钟截断，严重影响本地大模型用户（18 条评论、持续 5 个月未解）。
   https://github.com/anomalyco/opencode/issues/26602

4. **#53811 fs watcher 在 macOS 上陷入订阅死循环（100%+ CPU）** — 新报告：`@parcel/watcher` FSEvents 后端自我维持地反复订阅/退订 skills 目录，单核打满。与 #50594（bulk skills 写入导致 serve 进程终止）同源，**文件监视器稳定性是当前最集中的故障簇**。
   https://github.com/anomalyco/opencode/issues/53811

5. **#52269 OpenAI provider 间歇性 Service Unavailable** — 跨模型、跨会话的上游连接失败，重试与重启均无法根治，影响生产可用性。
   https://github.com/anomalyco/opencode/issues/52269

6. **#52452 [CLOSED] 后台服务重启遗留孤儿 tool_calls 导致恢复 400** — 会话持久化一致性问题已修复关闭，是 v2 稳定性的重要修复。
   https://github.com/anomalyco/opencode/issues/52452

7. **#48805 muse-spark-1.3 模型切换时报 `encrypted_content` 错误** — 同会话切换模型即失败，reasoning 内容跨 caller 校验问题，影响 Console/Go 用户的核心工作流。
   https://github.com/anomalyco/opencode/issues/48805

8. **#53776 [CLOSED] Go 订阅有效但所有模型返回服务器错误** — 当日创建、当日关闭，计费/凭证链路的快速响应值得肯定（同类问题 #53773 限流、#53827 余额误报仍待处理）。
   https://github.com/anomalyco/opencode/issues/53776

9. **#53728 v2 全屏 TUI 丢失 `--agent`/`--model` 标志** — 已复现。脚本化固定 agent 启动交互会话的用例被 v2 破坏，配套 #53806（`--session` 恢复时 `--model` 被忽略）表明 CLI 标志语义需要系统性回归测试。
   https://github.com/anomalyco/opencode/issues/53728

10. **#53617 Desktop 陈旧 CLI 二进制永不清理（每次更新 +175MB）** — 清理代码被开发标志门控导致打包版不生效，磁盘无限增长，是影响长期用户的实际痛点。
    https://github.com/anomalyco/opencode/issues/53617

---

## 🔧 重要 PR 进展

1. **#53826 在 Desktop/TUI 时间线中展示会话执行错误** — 修复错误被静默吞掉的问题，附前后对比截图。
   https://github.com/anomalyco/opencode/pull/53826

2. **#53823 / #53821 well-known 远程配置的启动与刷新容错** — @kitlangton 连击修复：源不可达后 10 分钟刷新循环提前退出导致永久无法恢复、以及瞬时 503/401 导致 provider 配置被整体丢弃两个问题。
   https://github.com/anomalyco/opencode/pull/53823

3. **#53422 [CLOSED] 向插件注入宿主 Effect 实例** — 解决插件自带 `effect` 副本无法共享模块私有符号/Scheme AST 的问题，插件生态的关键基础设施修复。
   https://github.com/anomalyco/opencode/pull/53422

4. **#53641 时间线文件链接的确定性识别与解析** — 行内代码仅在实际文件存在时变为可点击链接，跳转到指定行，否则保持普通代码样式，含 mermaid 决策图。
   https://github.com/anomalyco/opencode/pull/53641

5. **#32089 doom loop 检测跨消息生效** — 修复检测仅读取当前 assistant message 导致跨步骤重复调用永不触发的缺陷（对应 #51965），沉寂数月后重新活跃。
   https://github.com/anomalyco/opencode/pull/32089

6. **#53685 拒绝畸形 tool 参数并结清未完成调用** — 流式 tool 参数解析健壮性修复，直接针对 #50775“单个坏结果卡死整个会话”这类问题。
   https://github.com/anomalyco/opencode/pull/53685

7. **#53492 终端与 Web 客户端语音输入** — 社区呼声已久的功能（关联 #18226/#29663），进入实现阶段。
   https://github.com/anomalyco/opencode/pull/53492

8. **#53798 Vertex Google Cloud 凭证接入（gcloud auth / 环境变量）** — `/connect` 新增 external 类型凭证方式，Vertex 企业用户接入体验显著简化。
   https://github.com/anomalyco/opencode/pull/53798

9. **#47675 实际调用已文档化的 `permission.ask` 插件钩子** — 文档声明了钩子但从未触发，插件 API 可信度修复。
   https://github.com/anomalyco/opencode/pull/47675

10. **#53822 / #53817 TUI 保留暂不可用的会话模型选择 & Console 配置复用** — 前者防止模型目录刷新时静默重置用户选择；后者修复 #53775 引入的启动回归，v2 迭代节奏紧凑、回归跟进迅速。
    https://github.com/anomalyco/opencode/pull/53822

---

## 📈 功能需求趋势

- **IDE 集成**：VS Code 官方扩展（160 👍）为最大公约数诉求；Zed ACP 集成故障（#53799）表明编辑器集成是刚需且需打磨。
- **Windows 一等公民化**：winget 官方包 + 安装器速度（#53702：curl 安装耗时数分钟而直连 npm 仅 0.3s）。
- **本地/自建 provider 支持**：超时控制（#26602）、OpenAI 兼容端点稳定性。
- **语音与多模态输入**：终端/Web 语音输入 PR 已落地在途。
- **会话与模型管理**：`--agent`/`--model` 标志语义、worktree 会话族独占（#53220）、子 agent 状态可视化（#51113）。
- **插件生态成熟化**：TUI 渲染文本装饰/点击（#53225）、permission.ask 钩子、Effect 实例共享。

## ⚠️ 开发者关注点（痛点汇总）

1. **文件监视器不稳定**：CPU 死循环（#53811）、bulk 写入风暴致进程终止（#50594），建议合并排查。
2. **会话持久化一致性**：孤儿 tool_calls、坏 tool result 卡死会话（#50775），多个 PR 正在围攻。
3. **上游网络层可靠性**：OpenAI 间歇失败、Zen 网关路由挂起（#40479）、固定 5 分钟超时。
4. **计费/凭证误报**：余额充足却报 Insufficient funds、Go 订阅失效、限流误判（#53773/#53776/#53827），客服侧响应快但根因待查。
5. **磁盘膨胀**：Desktop 每次更新残留 175MB 旧二进制。
6. **配置静默失败**：`{env:VAR}` 未解析时空字符串替换导致 MCP 401（#53784），需要 config 加载期校验与告警。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-10-08

## 一、今日速览

今日 Qwen Code 发布 **v0.25.0-nightly.20261007**，包含远程 Hosts 绑定修复。社区讨论焦点集中在 **Managed Agent 双路径架构**（#12380 及其 Stage D/H 系列后续）持续推进，多个核心 PR（H4b 子 Session 运行时、CSI 运行时基础、K8s 工具运行时）密集更新。同时暴露出多个值得关注的**安全与稳定性问题**：系统设置路径环境变量无所有权校验、web-shell 审批卡片未净化模型文本、重复工具错误导致的 token 空转（P1 级）。

---

## 二、版本发布

**v0.25.0-nightly.20261007.8003d28042**（[Release](https://github.com/QwenLM/qwen-code/releases)）

- **fix(agents)**: 替换选中的远程 Hosts 时不丢失绑定关系（[#13430](https://github.com/QwenLM/qwen-code/pull/13430)，@yiliang114）
- **test(core)**: 关闭 #126 相关测试缺口

更新以修复和测试加固为主，无破坏性变更。

---

## 三、社区热点 Issues

**1. [#12380](https://github.com/QwenLM/qwen-code/issues/12380) — Managed Agent 双路径架构总体提案**（49 评论）
社区最核心的长期议题。定义了保留现有 TypeScript agent loop、模型推理与工具环境供给解耦、Session 持久化归属等分阶段交付方案。今日大量 PR/Issue 均为该提案的子阶段（D、H、L3），是理解项目路线图的必读文档。

**2. [#12867](https://github.com/QwenLM/qwen-code/issues/12867) — Stage D 后续：持久化生命周期与 AgentDefinition**（18 评论，@wenshao）
覆盖 D1–D3 交付后的剩余部分：durable lifecycle、Turns、Actions、`java_durable` 准入配置和 AgentDefinition，是 Managed Agent 契约落地的关键路径。

**3. [#13395](https://github.com/QwenLM/qwen-code/issues/13395) — Kubernetes 工具运行时进度追踪**（15 评论）
2026-10-08 最新更新：#13289 已合并，Draft PR #13526 新增原生 JSON 数值摘要前置项，推进跨平台交付门禁。

**4. [#6710](https://github.com/QwenLM/qwen-code/issues/6710) — ACP 恢复后无法区分用户取消与异常中断**（12 评论，P1）
2026-10-07 验证仍可复现，保持 open。涉及 session 恢复语义，关联 PR #13436 正在修复中。

**5. [#10887](https://github.com/QwenLM/qwen-code/issues/10887) — 重复工具错误不提前终止，session 空转烧掉 5-14M tokens**（10 评论，P1）
对成本影响极大的 bug。最新验证显示在 guard 环境变量下行为有变化，社区期待默认防护。

**6. [#10791](https://github.com/QwenLM/qwen-code/issues/10791) / [#10797](https://github.com/QwenLM/qwen-code/issues/10797) — 内部标签泄漏到用户可见输出**（各 7-8 评论）
`<thinking>` 块、tool-result 脚手架标签泄漏问题的家族性跟踪（汇总见 [#10559](https://github.com/QwenLM/qwen-code/issues/10559)）。#10791 修复已在 PR #11188 中推进，仍可复现的部分持续验证中。

**7. [#13513](https://github.com/QwenLM/qwen-code/issues/13513) — 系统设置路径环境变量无文件所有权校验**（5 评论，安全）
`QWEN_CODE_SYSTEM_SETTINGS_PATH` 可被任意覆盖加载配置，v0.24.7 已验证受影响，属安全隐患。

**8. [#13566](https://github.com/QwenLM/qwen-code/issues/13566) — web-shell 审批卡片旁路文本未净化**（5 评论，安全）
从已合并 PR #13549 遗留的评审发现，模型提供的描述文本在命令块旁未转义直接渲染。

**9. [#13597](https://github.com/QwenLM/qwen-code/issues/13597) — Subagent 不向主 agent 报告错误详情**（4 评论）
超时只返回笼统的 "execution failed"，导致主 agent 盲目重试而非调整限制——多 agent 场景的实用性痛点。

**10. [#13633](https://github.com/QwenLM/qwen-code/issues/13633) / [#13632](https://github.com/QwenLM/qwen-code/issues/13632) — hooks 生态新需求**（各 4 评论）
用户取消 turn 时触发 hook（Esc/Ctrl+C 有明确定义的结束信号）；MCP server 发送 `tools/list_changed` 时动态刷新工具注册表。均由社区用户 @glmn 提出，代表 hooks/MCP 集成的实际需求。

---

## 四、重要 PR 进展

**1. [#13550](https://github.com/QwenLM/qwen-code/pull/13550) — Managed Agent H4b：子 Session 运行时**（@wenshao）
提案 #12380 Stage H 的关键切片，基于 H4a 的子 agent 契约，实现子 Session 运行时。

**2. [#13526](https://github.com/QwenLM/qwen-code/pull/13526) — 私有 CSI 运行时基础**（@doudouOUC）
实验性私有 CSI 文件运行时，保持不支持的私有入口关闭，是 K8s 运行时（#13395）的前置工作。

**3. [#13436](https://github.com/QwenLM/qwen-code/pull/13436) — 跨 session 恢复保留取消意图**（@yiliang114）
区分用户取消与基础设施中断，恢复的尝试保留自身执行身份。已有约 840 行测试，但 mutation 测试暴露部分守卫未覆盖（见 [#13478](https://github.com/QwenLM/qwen-code/issues/13478)、[#13502](https://github.com/QwenLM/qwen-code/issues/13502)）。

**4. [#13572](https://github.com/QwenLM/qwen-code/pull/13572) — H5b/H5c 通道运行时（email 参考适配器）**（@wenshao）
Managed Agent 扩展运行时的 channel runtime，以 email 适配器作为参考垂直实现。

**5. [#13354](https://github.com/QwenLM/qwen-code/pull/13354) — 可靠的 ACTIVE Workspace 删除（L3）**（@doudouOUC）
最新提交修复原生测试 fixture 与生命周期契约的兼容性，删除调度证明准入检查生效。

**6. [#13621](https://github.com/QwenLM/qwen-code/pull/13621) — 生产环境 replay-floor 推进**（dev-bot）
实现 Session 事件保留/裁剪的前半部分，安全推进生产重放水位线（基于 D3 的 409 cursor_expired 契约）。

**7. [#13579](https://github.com/QwenLM/qwen-code/pull/13579) — 恢复含引号调用内容的外层 XML 调用**（@yiliang114）
参数值中包含引号包裹的工具调用标记时完整保留为数据，同时后续真实调用仍可独立恢复——解析健壮性系列修复的延续。

**8. [#13601](https://github.com/QwenLM/qwen-code/pull/13601) — 只读探索收敛提醒**（@yiliang114）
连续只读调用达到配额时插入提醒，要求 agent 使用已收集信息或说明阻塞。直接回应 #13321 的 token 空转问题。

**9. [#13578](https://github.com/QwenLM/qwen-code/pull/13578) — 审批卡片旁路渲染净化**（@yiliang114）
修复 #13566：对审批对话框中描述行和注释块统一转义模型提供的文本。

**10. [#13481](https://github.com/QwenLM/qwen-code/pull/13481) — 发布流水线 Docker 磁盘回收加固**（dev-bot）
沙箱镜像构建前额外清理 BuildKit 缓存并 gate 数据根目录，防止 nightly CI 磁盘耗尽——保障每日发布的基建修复。

---

## 五、功能需求趋势

| 方向 | 证据 | 热度 |
|---|---|---|
| **Managed Agent / 多 agent 架构** | #12380、#12867、#13550、#13572、#13613 | 🔥🔥🔥 占今日动态最大比重 |
| **K8s / 平台化分发** | #13395、#13526、#13111（Android Phase 2） | 🔥🔥 |
| **Token / 上下文效率** | #10887（P1）、#13321、#2566、#13603 | 🔥🔥 重复出现的老痛点 |
| **取消 / 中断语义** | #6710（P1）、#13436、#13502、#13633 | 🔥🔥 跨 session 一致性 |
| **Hooks / MCP 生态** | #13632、#13633 | 🔥 |
| **输出净化与解析健壮性** | #10700、#10791、#10797、#13559、#13579 | 🔥 持续家族性修复 |

---

## 六、开发者关注点

1. **Token 空转与失控循环**是最高优先级痛点：死循环烧掉数百万 token（#10887）、只读探索不收敛（#13321），社区强烈要求默认防护而非环境变量开关。
2. **取消/恢复语义不完整**：用户取消与异常中断难以区分，跨 session 恢复后取消意图丢失，主 agent 拿不到 subagent 的真实错误原因（#13597）导致盲目重试。
3. **安全细节持续暴露**：设置路径无所有权校验（#13513）、web-shell 未净化模型文本（#13566）、workspace 路径逃逸（#13179）——建议关注这三个方向的自查。
4. **上下文窗口显示错误**（#13603）：agent tab 按主模型窗口而非自身模型计算 context 用量，多模型 arena 用户直接受影响。
5. **Windows 体验问题**：桌面端登录强制使用 Edge 忽略默认浏览器（#13625）；`/update` 在交互/非交互模式下行为不一致（#13634）。

---
*数据来源：github.com/QwenLM/qwen-code | 统计窗口：过去 24 小时*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*