# AI CLI 工具社区动态日报 2026-11-13

> 生成时间: 2026-11-13 01:03 UTC | 覆盖工具: 7 个

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
**数据截至 2026-11-13 | 来源：各工具 GitHub 仓库公开动态**

---

## 一、生态全景

AI CLI 工具已从“终端版聊天助手”演进为**多形态（CLI/IDE/桌面端/Web Shell）、多代理（subagent/workflow）、企业级（SSO/沙箱/合规）** 的完整开发平台品类。第一梯队（Claude Code、Codex、Gemini CLI）竞争焦点转向**安全信任**（隐私泄露、沙箱逃逸、权限误判）与**无人值守自动化**（headless/CI 场景可靠性），而 OpenCode、Qwen Code 等追赶者通过架构重写（统一 agent loop）和多模型/多账号能力寻求差异化。值得注意的是，各工具不约而同地进入**架构收敛期**——Qwen Code 重写事件驱动内核、Codex 重构权限系统、Claude Code 推出 Code Mode，暗示行业正从功能堆叠转向底层可靠性攻坚。

---

## 二、各工具活跃度对比

| 工具 | 今日热点 Issues | 今日活跃 PR | Release | 阶段特征 |
|---|---|---|---|---|
| **Claude Code** | 10+（含 796👍 隐私事件） | 1（社区 PR 滞留 4 月） | v2.1.323 | 用户基数最大，社区强但贡献回流慢 |
| **OpenAI Codex** | 10（Windows 问题过半） | 20+（合并密集） | 3 个 alpha（24h 内） | 工程侧最活跃，快速迭代通道 |
| **Gemini CLI** | 10（Subagent P1 密集） | 10+ | 无 | 规划驱动（EPIC/官方路线图） |
| **Copilot CLI** | 42 条更新（MCP 认证为主） | 0 | v1.0.110（昨日） | 企业生态集成问题集中 |
| **Qwen Code** | 10（近半为 CI 问题） | 10+（6 项已合并） | v0.27.3 + v1.0.0-preview.1 | 1.0 内核预览，重构关键期 |
| **OpenCode** | 10（V2 回归密集） | 10+（Issue→PR 一日闭环） | 无 | 敏捷小团队，桌面端发力 |
| **Kimi Code CLI** | 0 | 1（挂起 7 月的 PR 关闭） | 无 | 低活跃窗口期 |

---

## 三、共同关注的功能方向

| 方向 | 具体诉求 | 涉及工具 |
|---|---|---|
| **Subagent 可靠性与可观测性** | 误报成功（Gemini #22323）、无限挂起（Gemini #21409）、后台代理缓存丢失（Claude #94728）、并发上限控制（OpenCode PR #63227）、代理树挂起/恢复（Codex PR #61198） | 全部主流工具 |
| **Headless / CI 自动化** | bypassPermissions 失效（Claude #109397）、权限请求永久阻塞（OpenCode #61504）、限额触达任务被杀（Codex #60447）、MCP 缓存膨胀（Copilot #5446）、headless 登录卡死（Qwen #17038） | Claude、Codex、Copilot、OpenCode、Qwen |
| **沙箱与权限安全** | denyWrite 通配符失效（Claude #92684）、x32 seccomp 加固（Codex PR #61206）、`>\|` 重定向绕过（Qwen PR #17042）、路径解码 fail-closed（Qwen PR #16784）、agent 沙箱讨论（OpenCode #2242） | Claude、Codex、Qwen、OpenCode、Gemini |
| **MCP 生态健壮性** | OAuth 认证四类故障（Copilot 4 条 Issue）、MCP 进程泄漏（Codex #25015）、MCP 连接撕裂修复（Qwen PR #16661）、工具数 >128 报错（Gemini #24246） | 全部工具 |
| **企业级身份与配置** | Passkey/WebAuthn（Claude #84862）、SPIFFE 认证（Codex PR #61207）、Entra/组织设置（Copilot #56620 类）、策略分发插件失效（Copilot #4837）、Bedrock ARN（OpenCode #53756）、企业版新模型支持（Gemini #29689） | 全部工具 |
| **新模型快速适配** | Fable 5.2 从选择器消失（Claude #108726）、GPT-6.1 Sol 限额异常（Codex #60530）、Gemini 4 Carbon/Argon（Gemini #29689/#30125） | Claude、Codex、Gemini |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 模型能力前沿（Code Mode：模型写 JS 调工具）、插件生态、桌面端/Cowork | 重度个人开发者、早期采用者 | TypeScript，产品迭代快但隐私/回归问题暴露信任成本 |
| **OpenAI Codex** | 全平台覆盖（Desktop/Computer Use/SSH/iOS）、企业级安全 | 企业与生产环境用户 | Rust 重写 + 密集 alpha 通道，Bazel/CI 工程化程度最高 |
| **Gemini CLI** | Subagent/skills 体系、上下文效率（AST 工具）、免费额度 | 预算敏感开发者、Google 生态用户 | 开源社区驱动，EPIC 式长期规划 |
| **Copilot CLI** | GitHub/Entra/MDM 深度集成、可访问性 | 企业 GitHub 生态用户 | 闭源，依托 Microsoft 身份体系，企业管控优先 |
| **Qwen Code** | Web Shell/托管形态、统一 agent loop 内核 | 开发者 + 自托管/云端混合场景 | TS 前端 + Java 控制面，架构最大胆但 CI 负债重 |
| **OpenCode** | 开源多模型（BYOK/多账号均衡/本地模型）、桌面端浏览 | 追求模型自由的进阶用户 | 社区敏捷开发，V2 重写期 |
| **Kimi Code CLI** | — | — | 贡献流程严格，当前近乎静默 |

---

## 五、社区热度与成熟度

**活跃度梯队：**
- **第一梯队**：Claude Code（单 Issue 796👍，用户声量最大）、Codex（PR 合并最密集，工程投入最重）
- **第二梯队**：Gemini CLI（规划清晰，P1 响应中）、Copilot CLI（Issue 量大但 PR 静默，闭源反馈单向）、Qwen Code / OpenCode（重构期，Issue↔PR 转化效率高）
- **观察名单**：Kimi Code CLI（连续静默，PR #1777 挂起 7 个月后关闭，方向存疑）

**成熟度判断：**
- **成熟但债务显现**：Claude Code（隐私事件 + 社区 PR 回流停滞 4 个月是危险信号）、Copilot CLI（MCP 认证系统性缺陷）
- **快速迭代阵痛期**：Codex（Windows 端为明显短板）、Qwen Code（CI 资源治理拖累开发带宽）、OpenCode（V2 迁移回归密集）

---

## 六、值得关注的趋势信号

1. **“静默失败”成为行业公敌**：六大工具均有“配置/规则被静默忽略”类高热 Issue（Claude 沙箱规则、Copilot 插件规则文件、Gemini Browser Agent 配置、OpenCode 工具名冲突、Qwen 权限拦截）。**启示**：AI Agent 工具的 debug 体验将成下一竞争维度，显式告警与可观测性是刚需。

2. **无人值守自动化是分水岭**：headless/CI 场景问题在所有工具集中爆发。谁先解决“权限自动决策 + 限额保护 + 断连恢复”三件套，谁就能吃到 CI/eval 市场红利。Codex 的代理树挂起恢复（#61198）和 OpenCode 的权限超时机制是先行信号。

3. **多模型编排成为标配**：Claude 的 Advisor、OpenCode 的 Advisor 工具（一日落地）、账号自动负载均衡，显示“单一主模型 + 按需咨询第二模型 + 多凭证调度”正在成为成本优化的标准架构。

4. **安全从“拦截”走向“结构化判定”**：Qwen 的 `>|` 重定向修复、Codex 的 seccomp x32 加固、Claude 的沙箱规则问题，共同指向趋势——正则/文本匹配式权限判定已不够，需要 shell 语义级分析 + fail-closed 默认策略。

5. **企业身份体系是护城河**：SPIFFE（Codex）、Entra/MDM（Copilot）、Passkey（Claude 呼声高）——个人工具企业化的关键卡位在认证与策略分发，Copilot 的“装而不启”问题恰好说明这仍是无人完全做好的蓝海。

6. **对开发者的选型建议**：生产 headless 场景暂避桌面端快速迭代版本（Claude 桌面端、Codex Windows 端）；重视隐私审计的团队需评估 Claude Code 邮箱泄露事件处置；追求模型自由的用户关注 OpenCode/BYOK；企业 GitHub 深度用户可等 Copilot MCP 认证体系修复后再规模化推开。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截至 2026-11-13）

## 一、热门 Skills 排行（PR）

| # | PR / Skill | 功能 | 讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **mcp-builder 修复** [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 HTTP 头 | MCP SDK 2.0 破坏性变更导致官方 skill 失效，跨版本兼容是焦点 | OPEN |
| 2 | **skill-creator 触发评估修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 隔离 trigger evals、修复 Windows 与运行时故障 | 触发率误报（false miss）长期困扰 skill 评估，与 Issue #556/#1352 呼应 | OPEN |
| 3 | **notion-spec-to-implementation + quantitative-resume-auditor** [#1245](https://github.com/anthropics/skills/pull/1245) | 将产品/技术 Spec 转为可执行的 Notion 任务清单；简历量化审计 | “Spec → 可执行任务”的工作流自动化方向受关注 | OPEN |
| 4 | **pyxel 复古游戏开发 Skill** [#525](https://github.com/anthropics/skills/pull/525) | Python 复古游戏的创建、调试与无头验证 | 由 Pyxel 作者本人提交，存活超 8 个月仍待合并 | OPEN |
| 5 | **md2video-audio** [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown 一键编译为带配音的 MP4 视频（Marp + TTS） | “零成本内容视频化”是社区反复出现的需求 | OPEN |
| 6 | **document-typography** [#514](https://github.com/anthropics/skills/pull/514) | AI 生成文档的排版质量控制（孤行、寡段、编号对齐） | 直击“AI 文档排版差”的普遍痛点 | OPEN |
| 7 | **scnet-hpc** [#1615](https://github.com/anthropics/skills/pull/1615) | SSH + Slurm 的 HPC 集群操作 | 代表科学计算/HPC 这一垂直方向 | OPEN |
| 8 | **proofcore-contract-auditor** [#1771](https://github.com/anthropics/skills/pull/1771) | Solidity/Rust 合约静态分析 + TON 链上审计存证 | Web3 场景，但也引发对外部服务依赖的讨论 | OPEN |

## 二、社区需求趋势（Issues 提炼）

1. **安全与信任边界**（最热，46 条评论）：社区 skill 冒用 `anthropic/` 命名空间构成信任滥用风险（[#492](https://github.com/anthropics/skills/issues/492)）——签名、命名空间治理呼声最高。
2. **组织级共享与分发**：企业内共享 skill 库、直接分享链接（[#228](https://github.com/anthropics/skills/issues/228)，8👍）；另有插件内容重复导致上下文浪费（[#189](https://github.com/anthropics/skills/issues/189)，9👍）。
3. **Skill 评估与触发可靠性**：`run_eval.py` 触发率为 0（[#556](https://github.com/anthropics/skills/issues/556)）、并行 worker 交叉污染产生假阴性（[#1352](https://github.com/anthropics/skills/issues/1352)）——skill-creator 工具链的可信度是持续性痛点。
4. **上下文效率**：claude-api skill 单次注入 ~156k tokens 打爆上下文窗口（[#1487](https://github.com/anthropics/skills/issues/1487)）；skill-creator 本身过于冗长（[#202](https://github.com/anthropics/skills/issues/202)）。
5. **新 Skill 方向提案**：compact-memory 紧凑代理状态符号化（[#1329](https://github.com/anthropics/skills/issues/1329)）、推理质量门控流水线（[#1385](https://github.com/anthropics/skills/issues/1385)）、agent-governance 治理模式（[#412](https://github.com/anthropics/skills/issues/412)）——围绕长时程 agent 的记忆、质量与治理。

## 三、高潜力待合并 Skills（活跃 OPEN PR）

- **mcp-builder MCP 2.0 适配** [#1742](https://github.com/anthropics/skills/pull/1742)：修复官方核心 skill 的兼容性破坏，紧迫性最高。
- **skill-creator 触发评估隔离修复** [#1298](https://github.com/anthropics/skills/pull/1298)：直接回应 #556/#1352 两大热_issue，落地概率高。
- **xlsx 外部链接误报修复** [#2019](https://github.com/anthropics/skills/pull/2019) 与 **skill-creator YAML 解析修复** [#1997](https://github.com/anthropics/skills/pull/1997)：精准小修，易合并。
- **docx LibreOffice 超时处理** [#1792](https://github.com/anthropics/skills/pull/1792)、**webapp-testing 命令注入修复** [#1980](https://github.com/anthropics/skills/pull/1980)：安全/正确性修复类优先级高。
- 另有 gerardrecinto 密集提交的算法艺术、webapp-testing、pptx 修复系列（[#1975](https://github.com/anthropics/skills/pull/1975)–[#1977](https://github.com/anthropics/skills/pull/1977)），均为小而美的候选合并项。

## 四、生态洞察（一句话总结）

**社区最集中的诉求是“让 Skills 生态可信且高效”**——即修复 skill 触发/评估工具链的可靠性、治理命名空间的信任边界、控制 skill 的上下文占用，并打通组织内共享分发，而非单纯追求更多新 skill 数量。

---

# Claude Code 社区动态日报（2026-11-13）

## 1. 今日速览

新版本 **v2.1.323** 发布，引入实验性 **Code Mode**（Claude 通过编写 JavaScript 调用工具）并新增插件引擎版本声明机制。隐私问题持续发酵：**User-Agent 头泄露用户邮箱**的 Issue 已获 796 个 👍 和 118 条评论，成为社区最强呼声。此外，`DISABLE_TELEMETRY` 意外禁用 feature flags 导致新模型（Fable 5.2）从选择器消失的 bug 值得关注。

---

## 2. 版本发布

### v2.1.323
- **Code Mode（实验性，需手动开启）**：Claude 编写 JavaScript 代码来调用工具，而非直接调用。可通过 [官方文档](https://code.claude.com/docs/en/code-mode) 开启，也支持组织级关闭。
- **插件引擎声明**：`plugin.json` 新增 `engines["claude-code"]` 字段，用于声明插件兼容的 Claude Code 版本范围。

---

## 3. 社区热点 Issues

1. **[#107757](https://github.com/anthropics/claude-code/issues/107757) — User-Agent 头泄露用户邮箱（隐私违规）**
   🔥 最热 Issue（118 评论 / 796 👍）。Web 搜索时 Claude Code 在 `User-Agent` 中向第三方泄露用户邮箱，导致用户每天收到大量诈骗邮件。社区强烈要求**彻底移除**而非提供 opt-out 选项。

2. **[#108726](https://github.com/anthropics/claude-code/issues/108726) — `DISABLE_TELEMETRY=1` 意外禁用 feature flags**
   关闭遥测会同时阻止 feature flags 下载并忽略本地缓存，所有 flag 回退到编译默认值，导致 Fable 5.2 从 `/model` 选择器中消失。有复现步骤，隐性影响所有依赖 flag 的功能。

3. **[#84862](https://github.com/anthropics/claude-code/issues/84862) — Passkey (WebAuthn) 登录支持（37 评论 / 183 👍）**
   长期诉求：在全平台（CLI、IDE、Web）支持 Passkey 免密登录，呼声持续高涨。

4. **[#90471](https://github.com/anthropics/claude-code/issues/90471) — VS Code 扩展无法渲染 `advisor_tool_result` 内容块**
   Webview 显示 "Unsupported content type"，虽不影响模型工作但严重影响 IDE 内体验。

5. **[#109397](https://github.com/anthropics/claude-code/issues/109397) — bypassPermissions 并非真正绕过**
   无法解析的 `rm` 提示在无人值守会话中自动**拒绝**操作，即使配置了 `bypassPermissions` + 跳过危险模式提示，对 headless 自动化场景是阻断性问题。

6. **[#92684](https://github.com/anthropics/claude-code/issues/92684) — 沙箱 `denyWrite` 静默忽略路径中间通配符规则（Linux）**
   安全相关：含中间路径通配符的写入拒绝规则被静默忽略，无任何告警，有复现。

7. **[#94728](https://github.com/anthropics/claude-code/issues/94728) — 恢复后台 subagent 丢失 prompt cache**
   恢复后台子代理时报 `messages_changed` 且无 thinking blocks，导致缓存失效、成本增加。

8. **[#106049](https://github.com/anthropics/claude-code/issues/106049) — Cloud 会话无法在 PR/Issue 中附加图片**
   GitHub 代理拒绝所有 GraphQL 请求，而 REST API 无对应上传端点，云端工作流存在功能盲区。

9. **[#108947](https://github.com/anthropics/claude-code/issues/108947) — 二进制文件校验失败时 PreToolUse hook 不执行**
   `Read` 工具的输入校验先于 hook 执行，导致 `updatedInput` 无法重定向 `.heic → .jpg` 等场景失效。

10. **[#109419](https://github.com/anthropics/claude-code/issues/109419) — Windows 桌面端 Remote Control 离开期间自动关闭（回归）**
    标记为 regression：即使开启“默认启用远程控制”并禁用睡眠，离开机器后所有会话的 Remote Control 仍会自动关闭。

---

## 4. 重要 PR 进展

> 过去 24 小时仅 1 条 PR 更新，本期略述。

- **[#81672](https://github.com/anthropics/claude-code/pull/81672) — fix(hookify): 使包导入不再依赖安装目录名**
  修复 hookify 插件从 marketplace 安装时因目录名不是 `hookify` 而导入失败的问题（修复 #69665、#81448）。该 PR 自 7 月底开放至今仍在等待 review，社区贡献回流速度值得关注。

---

## 5. 功能需求趋势

| 方向 | 代表 Issue |
|---|---|
| **安全与隐私** | User-Agent 泄露邮箱 (#107757)、沙箱规则静默失效 (#92684)、bypassPermissions 失效 (#109397) |
| **桌面端体验完善** | Mermaid 暗色模式不可读 (#109425)、PR 状态图标缺失 (#109424)、/btw 侧聊上下文隔离 (#108777)、Remote Control 回归 (#109419) |
| **后台代理/多会话管理** | 批量停止后台代理 `claude stop --all` (#109414)、后台代理状态卡死 (#103849)、终端输出在 1024 字节边界损坏 (#109420) |
| **headless / SDK 自动化** | `--agent` 下 `--json-schema` 被静默忽略 (#109393)、语音听写暴露给 Agent SDK (#108577) |
| **认证方式现代化** | Passkey/WebAuthn 全平台支持 (#84862)、身份验证表单重定向循环 (#108830) |
| **GitHub 集成** | Cloud 环境无法上传图片 (#106049)、Cowork 会话 repo 工具缺失 (#97926)、仓库连接失败 (#109406) |

---

## 6. 开发者关注点

- **隐私与信任是头等大事**：User-Agent 泄露邮箱事件热度持续攀升（796 👍），社区对“opt-out 式补救”明确不满意，要求结构性移除。
- **静默失败模式普遍**：多个高优 bug 共同特征是**静默失效**——沙箱规则被忽略、schema 被忽略、feature flags 回退。开发者呼吁增加显式告警。
- **无人值守/headless 场景脆弱**：自动拒绝、缓存丢失、hook 不触发等问题集中出现在自动化流水线中，影响 CI 可靠性与成本。
- **桌面端处于快速迭代阵痛期**：暗色主题、面板渲染、Remote Control 等回归问题密集，建议生产环境暂缓升级桌面端。
- **社区 PR 回流缓慢**：唯一活跃 PR 已等待近 4 个月，贡献者激励与 review 带宽或成瓶颈。

---
*数据截至 2026-11-13，来源：github.com/anthropics/claude-code*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 · 2026-11-13

## 一、今日速览

Codex Rust CLI 密集发布 **0.170.0-alpha.2 ~ alpha.4** 三个预发布版本，迭代节奏明显加快。Windows 平台的 Computer Use 和 Desktop 端问题持续占据社区热度，包括系统级 UI 卡顿、屏幕捕获残留等高互动 Issue。同时团队合并了大量 TUI/会话管理/安全沙箱相关的 PR，工程侧投入显著。

---

## 二、版本发布

- **rust-v0.170.0-alpha.4**（[Release](https://github.com/openai/codex/releases/tag/rust-v0.170.0-alpha.4)）
- **rust-v0.170.0-alpha.3**（[Release](https://github.com/openai/codex/releases/tag/rust-v0.170.0-alpha.3)）
- **rust-v0.170.0-alpha.2**（[Release](https://github.com/openai/codex/releases/tag/rust-v0.170.0-alpha.2)）

24 小时内连续三个 alpha 版本，配合今日合并的 Rust 工具链升级至 1.99.1（#61205）等 PR，推测为快速迭代通道，暂无正式版发布。

---

## 三、社区热点 Issues（Top 10）

1. **#25319 将 VS Code 聊天限定到当前工作区/项目**（60 评论 / 134 👍）
   社区呼声最高的功能请求：VS Code 扩展的聊天/线程历史应按 workspace 隔离。半年未关闭说明官方仍在评估中。
   https://github.com/openai/codex/issues/25319

2. **#56941 [Windows] Computer Use 后系统级 UI 卡顿**（24 评论）
   使用 Computer Use 后整个 Windows 图形界面严重迟滞，杀掉 codex-computer-use.exe 立即恢复。高严重性性能问题。
   https://github.com/openai/codex/issues/56941

3. **#57101 Windows Computer Use 截图后捕获权限与金色边框未释放**（23 评论）
   与 #56941 同属 Computer Use 生命周期清理缺陷，两 Issue 叠加显示该功能在 Windows 上收尾处理不完善。
   https://github.com/openai/codex/issues/57101

4. **#25015 app-server 子代理 MCP 进程栈泄漏，Linux 内存线性增长**（19 评论 / Papercuts 标签）
   子代理结束后 MCP 子进程树残留，长期运行的 app-server 内存持续增长，属稳定性核心问题。
   https://github.com/openai/codex/issues/25015

5. **#59546 Desktop 内置 automation 限制阻止外部 Web 系统监控任务**（15 评论 / 18 👍）
   实际行为与 Scheduled tasks 官方文档冲突，👍 数高反映文档与产品行为不一致的普遍不满。
   https://github.com/openai/codex/issues/59546

6. **#59931 Windows Desktop 重启后不自动重连已启用的 SSH 主机**（14 评论）
   用户在两台 Windows 设备上复现，影响远程工作流连续性。
   https://github.com/openai/codex/issues/59931

7. **#23037 远程 SSH 在 keyboard-interactive/PAM 认证下失败**（11 评论 / 9 👍）
   企业环境（公钥 + PAM 双重认证）常见场景，终端 ssh 可连但 Codex 失败，长期未解决。
   https://github.com/openai/codex/issues/23037

8. **#56620 [Windows] Desktop 更新后无法加载组织设置，重装/修复无效**（13 评论）
   企业用户受影响的认证/配置加载问题，且常规修复手段均告失败，排障成本高。
   https://github.com/openai/codex/issues/56620

9. **#60537 [Linux] 听写 ducking 永久降低播放增益**（10 评论）
   细节型缺陷：音频流在听写结束前消失时播放音量无法恢复，反映 Linux 音频管线状态管理问题。
   https://github.com/openai/codex/issues/60537

10. **#60530 GPT-6.1 Sol 用量限额消耗异常加快**（7 评论）
    多用户报告五小时限额消耗速度显著上升，涉及计费/计量透明度，社区敏感度高。
    https://github.com/openai/codex/issues/60530

---

## 四、重要 PR 进展（Top 10）

1. **#61198 代理树优雅挂起与恢复** — 新增 `ThreadManager::suspend_agent_tree`，挂起时保留未完成 turn 与子代理结果，恢复后可用。
   https://github.com/openai/codex/pull/61198

2. **#61206 Linux seccomp 限制覆盖 x32 系统调用** — 修复沙箱逃逸面：x32 ABI 与 x86-64 共享 audit 架构导致原有架构检查失效，安全加固。
   https://github.com/openai/codex/pull/61206

3. **#61207 SPIFFE JWT-SVID 工作负载身份认证** — 企业级特性：Unix 工作负载可直接从 SPIFFE Workload API 获取断言进行 OpenAI token 交换。
   https://github.com/openai/codex/pull/61207

4. **#61205 Rust 工具链升级至 1.99.1** — 全 workspace、Bazel、CI 与发布流程同步升级，是 alpha 版本密集发布的底层支撑。
   https://github.com/openai/codex/pull/61205

5. **#61216 TUI 会话恢复时保留线程输入** — 恢复其他会话时保留草稿、排队的后续消息及中断的 steer 重试，体验细节优化。
   https://github.com/openai/codex/pull/61216

6. **#61215 追踪听写使用情况** — 以逐输入元数据记录 `codex_app_used_dictation`，为听写功能（关联 #60537、#54911 等）提供遥测基础。
   https://github.com/openai/codex/pull/61215

7. **#61213 模型目录 Apps 使用说明支持** — 新增 `catalog_apps_instructions` 功能开关，按所选模型注入 Apps 使用指令。
   https://github.com/openai/codex/pull/61213

8. **#61211 / #61212 状态栏 provider 本地配置与持久化** — 支持 `tui.status_line_provider` 选择默认或 MCP provider，配置写入本地用户配置。
   https://github.com/openai/codex/pull/61211

9. **#61194 / #61195 权限系统去遗留化** — 移除旧版 sandbox policy 构建权限 profile 的路径，且工作目录变更时保留权限配置，权限系统重构推进。
   https://github.com/openai/codex/pull/61195

10. **#61186 计划项 ID 唯一化** — 改用 UUIDv7 生成 plan item ID，修复一个 turn 内多个完成计划共享 ID 的问题。
    https://github.com/openai/codex/pull/61186

其他值得注意：#61198 之外的会话管理相关（#61218 隐藏附属线程、#61210 保留委托提示）、#61187 Bazel CI GCS 认证缓存（构建提速）、#61196 修复内联图片预览残影。

---

## 五、功能需求趋势

| 方向 | 信号 |
|---|---|
| **Windows Computer Use 稳定性** | #56941、#57101、#49844、#61191，Windows 端 CUA 是当前 bug 密集区 |
| **IDE / 工作区集成** | #25319（134 👍）遥遥领先，workspace 隔离是最大功能诉求 |
| **远程 SSH / 多端体验** | #59931、#23037、#60799（iOS）、#54911，连接可靠性与跨端一致性问题集中 |
| **用量与限额透明度** | #60530、#36806、#60447，计量准确性、限额触达时的任务保护呼声高 |
| **沙箱与权限策略** | #58401、#61191、#60974，Full access 模式下策略误判、决策理由不透明 |
| **企业级身份与配置** | #56620（组织设置）、#47756（MCP OAuth）、PR #61207（SPIFFE），企业场景需求上升 |

---

## 六、开发者关注点

1. **Windows 体验落后**：今日热门 Issue 中过半为 windows-os 标签，Computer Use、浏览器控制、WSL 启动、组织设置加载均有问题，Windows 是当前质量短板。
2. **资源泄漏与长时运行稳定性**：MCP 进程泄漏（#25015）、npm 启动器信号丢失（#60493）、内存无上限（#36806），守护进程型部署的可靠性是痛点。
3. **限额计量信任危机**：GPT-6.1 Sol 消耗异常（#60530）与限额触达直接终止任务且无安全检查点（#60447）叠加，影响付费用户信任。
4. **文档与产品行为脱节**：#59546（automation 限制与文档冲突）、#58780（“始终允许”规则不生效），配置保存后不被遵守是高频抱怨。
5. **工程侧积极信号**：PR 流水线高度活跃（Rust 工具链升级、权限系统重构、沙箱 x32 加固、SPIFFE 企业认证），显示团队在为生产化与企业采用铺路。

---
*数据截至 2026-11-13，来源：github.com/openai/codex 公开数据*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-11-13）

## 📌 今日速览

今日无新版本发布。社区讨论焦点集中在 **Subagent 体系**：多个 P1 级 Bug（子代理误报成功、通用代理挂起）持续引发讨论，同时官方推进 AST 感知工具、并行子代理协作等长期规划。PR 方面，**新模型支持（Gemini 4 Carbon / Argon）** 和 **ACP 协议完善** 是两大活跃方向。

---

## 🐛 社区热点 Issues

**1. [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 后误报 GOAL 成功** (P1, 💬13)
子代理 `codebase_investigator` 触达轮次上限后仍返回 `success`，掩盖了实际中断，误导主代理决策。13 条评论为今日最热，涉及代理可信度的核心问题。

**2. [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist agent 无限挂起** (P1, 👍8)
CLI 委派给通用代理后永久挂起（等待 1 小时无响应），禁用子代理可绕过。8 个 👍 表明影响面较广。

**3. [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由** (P2, 💬9)
提议利用 Gemini 3 原生 bash 能力（grep/sed/awk 链式调用），配合系统级沙箱保障安全，是架构层面的重要讨论。

**4. [#29689](https://github.com/google-gemini/gemini-cli/issues/29689) 支持企业版用户使用 Gemini 4 Argon** (💬8, 👍5)
要求在 Code Assist Enterprise (OAuth) 和 API Key 认证下官方支持 Gemini 4 Argon，企业用户呼声高。

**5. [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) 评估 AST 感知的文件读取/搜索/映射** (P2, 💬7)
官方 EPIC：探索 AST 工具以精准读取方法边界、减少 token 噪音，是提升上下文效率的关键方向。

**6. [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 主动调用 skills 和子代理的频率过低** (P2, 💬7)
模型几乎从不自主使用自定义 skills/sub-agents，仅显式指令才触发，反映代理调度策略问题。

**7. [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) get-shit-done output hook 导致崩溃** (P1)
输出 hook 在打印用户摘要时反复使 CLI 崩溃，稳定性问题。

**8. [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 工具数 > 128 时遇到 400 错误** (P2)
MCP/子代理场景下工具数量易超限，代理需更智能地裁剪工具作用域。

**9. [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 配置** (P2)
`AgentRegistry` 正确合并了配置但 Browser Agent 不生效（如 maxTurns），配置链路存在断层。

**10. [#30125](https://github.com/google-gemini/gemini-cli/issues/30125) 支持旗舰模型 Gemini 4 Carbon** (👍3)
10 月 28 日发布的最新旗舰模型，社区要求 CLI 第一时间支持，与 #29689 共同反映新模型适配的迫切需求。

---

## 🔧 重要 PR 进展

**1. [#30253](https://github.com/google-gemini/gemini-cli/pull/30253) 修复 models 列表硬编码 8192 输出上限** (已关闭)
`gemini models` 此前对所有模型显示 8192 输出 token 上限，现正确报告 Gemini 2.5/3 的 65,536。

**2. [#30230](https://github.com/google-gemini/gemini-cli/pull/30230) 修复音视频 read_file 400 错误** (P1, 开放中)
Gemini 3 + Code Assist 下读取音频/视频报 "Requests ending with a model turn are not supported"，保留合成 ack 使媒体独立成轮。

**3. [#30088](https://github.com/google-gemini/gemini-cli/pull/30088) 错误报告移出共享临时目录** (安全，开放中)
错误报告含完整聊天记录，此前写入 `os.tmpdir()` 且默认权限，存在信息泄露风险，现迁移至 `~/.gemini/tmp/` 并限制权限。

**4. [#30258](https://github.com/google-gemini/gemini-cli/pull/30258) 同步扩展 undici bodyTimeout** (已关闭)
修复请求超时 > 300s 时 `bodyTimeout` 未同步更新导致的超长请求失败。

**5. [#30135](https://github.com/google-gemini/gemini-cli/pull/30135) 新增 `/stats heatmap` 子命令** (已关闭)
终端内渲染 GitHub 风格的每日 token 使用热力图，实用性强。

**6. [#30232](https://github.com/google-gemini/gemini-cli/pull/30232) ACP 支持 session/close** (开放中)
客户端此前无法释放会话导致配置/MCP 连接泄漏，实现 `unstable_closeSession` 处理。

**7. [#30178](https://github.com/google-gemini/gemini-cli/pull/30178) 修复 IME 提交与回车同 tick 丢字** (开放中)
韩文等 IME 输入最后一音节被丢弃（`테스트` → `테스`），对中日韩用户重要的修复。

**8. [#29546](https://github.com/google-gemini/gemini-cli/pull/29546) 非交互模式支持 `/skill-name` 激活技能** (P2, 开放中)
补齐 SkillCommandLoader 注册与 tool 结果处理，使 headless 模式也能用斜杠命令。

**9. [#29859](https://github.com/google-gemini/gemini-cli/pull/29859) 任务树中显示执行中的子代理工具调用** (开放中)
修复子代理工具执行时从任务树消失的问题，提升多代理场景可观测性。

**10. [#30259](https://github.com/google-gemini/gemini-cli/pull/30259) resumeChat 失败后正确恢复工作区目录** (已关闭)
会话恢复失败时 `WorkspaceContext` 残留目录的边界修复。

---

## 📈 功能需求趋势

- **新模型支持**：Gemini 4 Carbon / Argon 的企业版接入是当前最迫切的功能请求（#29689、#30125）。
- **Subagent 体系成熟化**：调度可靠性（#22323、#21409）、配置生效（#22267）、轨迹可观测（#22598）、并行协作与共享内存（#18287）是主线。
- **上下文效率**：AST 感知工具（#22745、#22746）、“Tactful Extraction” 精准读取（#19561）、文件化任务跟踪替代 WriteToDo（#18836）。
- **安全与沙箱**：OS 级沙箱化 bash 执行（#19873）、破坏性命令防护（#22672）。
- **ACP 协议完善**：会话生命周期、hook 触发、错误上报的协议级补齐。

## ⚠️ 开发者关注点

1. **子代理可信度**：误报成功 + 无限挂起两大 P1 问题，直接影响生产可用性；`/bug` 报告不含子代理上下文（#21763）加剧排查难度。
2. **工具数量上限**：MCP 生态扩展下 128 工具限制成为规模化瓶颈（#24246）。
3. **配置一致性**：settings.json 在 Browser Agent 等子系统中不生效，用户配置预期被打破。
4. **安全细节**：临时脚本乱放（#23571）、错误报告权限（PR #30088）等卫生问题受到关注。
5. **国际化体验**：IME 输入丢字等修复显示 CJK 用户群体活跃度上升。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-13** | 数据来源：github.com/github/copilot-cli

---

## 一、今日速览

Copilot CLI 昨日发布 **v1.0.110**，带来实验性的 agent 命令密码提示掩码对话框、Entra 登录错误弹窗优化及屏幕阅读器可访问性改进。过去 24 小时社区共更新 42 条 Issues，讨论热度集中在 **MCP 认证与 Token 缓存**、**插件系统可靠性**以及 **ACP/SDK 集成缺陷**上。值得注意的是，多起长会话内存耗尽（OOM）崩溃报告值得关注。

---

## 二、版本发布

### [v1.0.110](https://github.com/github/copilot-cli/releases) & [v1.0.110-3](https://github.com/github/copilot-cli/releases)（2026-11-12）

**新特性（Experimental）：**
- 🔐 Agent 命令中出现的 git、ssh、sudo 密码提示，可在掩码对话框中直接应答（通过 `/experimental on` 启用）

**修复：**
- 组织账户可用时，Microsoft Entra 登录不再弹出多余错误提示
- 屏幕阅读器可识别当前会话，并在 Sessions 列表中播报需要关注或空闲的会话（可访问性改进）
- `/usage` 模型行按终端宽度自动换行而非截断

---

## 三、社区热点 Issues（Top 10）

### 🔴 认证与 MCP（当前最热话题）

**1. [#5236](https://github.com/github/copilot-cli/issues/5236) Windows Entra Broker Token 缓存保持 0 字节**（7 评论）
MCP 服务器通过 Entra broker 登录后，token 缓存文件始终为空，每个新进程都重新弹出账户选择器。Windows + MCP 组合的核心痛点，7 条评论为今日最热讨论。

**2. [#4606](https://github.com/github/copilot-cli/issues/4606) Google Workspace MCP OAuth 因 issuer 尾斜杠不匹配失败**（5 评论，👍 2）
`accounts.google.com/` 与 `accounts.google.com` 的 trailing-slash 差异导致原生 HTTP MCP 认证在浏览器授权前即失败。属标准实现细节问题，影响所有 Google 官方 MCP 端点用户。

**3. [#5437](https://github.com/github/copilot-cli/issues/5437) Task 子代理无法认证 HTTP-OAuth MCP 服务器**
`<server>/*` 通配符授权在子代理中返回 401，显式引用仅在个别模型上部分生效。跨约 30 次委派运行验证，是多智能体 + MCP 工作流的实际阻塞项。

**4. [#5434](https://github.com/github/copilot-cli/issues/5434) macOS 钥匙串 `copilot-mcp-oauth` 提示反复出现**
选择"始终允许"后仍持续弹窗，且产生大量重复钥匙串条目。macOS 用户体验受损明显。

### 🟡 稳定性与内存

**5. [#5435](https://github.com/github/copilot-cli/issues/5435) 1.0.109 长交互会话反复 OOM 崩溃**
昨日新报，用户称反复出现；崩溃后恢复会话时，原后台 agent 无法再访问。与 #5446（MCP 工具缓存膨胀）共同指向内存管理问题。

**6. [#5446](https://github.com/github/copilot-cli/issues/5446) MCP 工具缓存随临时工作区无限增长**
`mcp-tools` 快照缓存在 CI/eval 等每次新建工作区的场景下持续膨胀，可能导致启动时内存耗尽。对自动化场景影响大。

### 🟠 多智能体与插件

**7. [#4837](https://github.com/github/copilot-cli/issues/4837) 策略驱动的 enabledPlugins 安装后始终 `"enabled": false`**（3 评论，👍 2）
通过 MDM/设备策略或仓库级配置分发的插件虽落盘但永不激活，企业规模化部署的直接阻塞项。

**8. [#5440](https://github.com/github/copilot-cli/issues/5440) Agent Plugins 1.0 格式的 `.instructions.md` 与 `applyTo` 被静默忽略**
skills、MCP、agents、hooks 均正常加载，唯独规则文件失效——兼容性覆盖不全的典型信号。

### 🔵 集成与模型配置

**9. [#5447](https://github.com/github/copilot-cli/issues/5447) ACP 模式跳过 `~/.copilot/ide` 发现，永远无法连接 IDE**
同一终端中交互式 CLI 1 秒内完成附加，`--acp` 却始终无 IDE MCP 服务器。ACP 生态集成的明显缺口。

**10. [#5363](https://github.com/github/copilot-cli/issues/5363) ACP `session/new` 上报的模型与实际运行不符**
响应中 `currentValue` 声称是 claude-sonnet-5.5，实际会话运行其他模型，客户端需显式 set 才生效。协议语义不一致问题。

> 另值得跟进：[#5444](https://github.com/github/copilot-cli/issues/5444) 昨日早间更新后协调子会话回复不再回传主聊天——疑似回归，影响面可能扩大。

---

## 四、重要 PR 进展

过去 24 小时无更新的 Pull Requests，本节省略。

---

## 五、功能需求趋势

从今日 Issues 中可提炼出以下社区关注方向：

| 方向 | 相关 Issue | 信号强度 |
|---|---|---|
| **MCP 认证/授权健壮性** | #5236、#4606、#5437、#5434 | ⭐⭐⭐⭐⭐ 最集中 |
| **内存与长会话稳定性** | #5435、#5446、#4467 | ⭐⭐⭐⭐ |
| **多智能体协调可靠性** | #5444、#5437、#5243（已修复） | ⭐⭐⭐⭐ |
| **插件/策略分发** | #4837、#5440 | ⭐⭐⭐ |
| **ACP/SDK 协议一致性** | #5447、#5363、#5448 | ⭐⭐⭐ |
| **BYOK 配置体验** | #5287（providers.json schema）、#5436（403 错误透传） | ⭐⭐ |
| **资源清理与磁盘占用** | #5443（worktree 复用/释放） | ⭐⭐ |
| **编辑器体验细节** | #5442（vim mode `:q`/`:model`） | ⭐ |

---

## 六、开发者关注点

1. **MCP OAuth/Token 生命周期是最大痛点**：横跨 Windows（Entra 缓存）、macOS（钥匙串重复）、跨进程（子代理 401）、标准兼容（Google issuer）四个维度，社区呼吁统一的认证状态管理与缓存策略。

2. **自动化与无头场景支持不足**：ACP 模式不连 IDE、MCP 工具缓存在临时工作区场景膨胀、BYOK 403 错误被掩盖为认证失败——都指向 CI/eval/嵌入式场景被次要对待。

3. **企业规模化部署受阻**：策略驱动插件“装而不启”、Agent Plugins 1.0 规则文件静默失效，说明企业管控与新插件标准的兼容性验证不充分。

4. **回归质量**：#5444（更新后子会话失联）、#5243（1.0.95 后子代理丢失内置工具，已修复）、#5151（工具定义 15K→260K 导致 Sol 模型上下文超限）——近期迭代引入回归偏多，建议升级前关注 release notes 中的已知问题。

5. **反馈质量高**：多数新 Issue 附带详细复现步骤与版本信息（部分由 AI 辅助 triage 生成），社区工程化程度较高，官方响应窗口应重点投向 MCP 认证与内存问题。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期：2026-11-13 | 数据来源：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)**

---

## 1. 今日速览

今日社区整体较为平静：过去 24 小时无新版本发布、无新增 Issue 动态，仅有一条历史 PR（#1777）出现状态更新。核心关注点仍集中在**三层规则系统（three-tier rules system）**这一功能 PR 上。

---

## 2. 版本发布

无。过去 24 小时内仓库未发布新 Release。

---

## 3. 社区热点 Issues

**无。** 过去 24 小时内没有 Issue 被创建或更新，暂无可报道的社区讨论。

---

## 4. 重要 PR 进展

### #1777 [CLOSED] feat: three-tier rules system
- **作者**：@Nemo4110 ｜ 创建于 2026-04-07，更新于 2026-11-12
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/1777
- **内容**：提出三层规则系统（three-tier rules system），旨在为 CLI 提供分层级的行为规则配置能力。该 PR 挂起时间较长（约 7 个月），最终以关闭收尾，且尚未观察到合并或替代实现的迹象。
- **值得注意**：关闭时间点临近，可能意味着维护者正在规划替代方案，或该设计方向被搁置。建议关注后续是否有相关 Issue 或新 PR 承接此需求。

> 注：过去 24 小时仅此一条 PR 动态，无法凑齐 10 条。

---

## 5. 功能需求趋势

由于今日无活跃 Issue 数据，无法提炼新的需求趋势。从 PR #1777 可间接看出，**规则/配置的分层管理体系**（类似 Claude Code 的项目级/用户级规则机制）是社区曾推动的方向，其最终走向有待观察。

---

## 6. 开发者关注点

- **贡献流程门槛**：PR 模板明确要求贡献者先与维护者在 Issue 中讨论确认，否则 PR 可能被关闭或忽略——#1777 的最终关闭一定程度上印证了该流程的严格执行。
- **观察建议**：当前仓库处于低活跃窗口期，建议持续跟踪 Release 与主干 commit，判断三层规则系统是否以其他形式落地。

---

*本日报基于过去 24 小时的 GitHub 数据自动汇总，数据稀疏期内容从简。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-13

## 今日速览

今日无新版本发布，社区活跃度集中在 Issues 与 PR 讨论。核心维护者 @kitlangton 和 @rekram1-node 密集提交了多个 AI 推理层的修复与重构 PR，其中「Advisor 工具」（让主模型可咨询第二个模型）在同一天内完成 Issue 提报到 PR 实现，反应速度惊人。同时 V2 的 Bedrock 兼容性、桌面端性能等老问题持续发酵。

---

## 版本发布

过去 24 小时无新 Release。

---

## 社区热点 Issues

1. **[#2242] Agent 沙箱机制**（115 评论 / 84 👍）
   讨论如何限制 agent 终端命令访问当前目录之外的文件，对标 gemini-cli / codex-cli 的 seatbelt 方案。虽已关闭，但仍是社区长期关注的 sandbox 讨论标杆帖。
   https://github.com/anomalyco/opencode/issues/2242

2. **[#785] 禁用流式模式**（37 评论 / 40 👍）
   代理服务商不支持 streaming 场景下的兼容性需求，今日再次更新，说明非流式模式仍是企业用户的刚需。
   https://github.com/anomalyco/opencode/issues/785

3. **[#53756] Bedrock 应用推理配置 ARN 误用 Nova 格式**（10 评论）
   Claude 模型通过 inference profile ARN 调用时 effort 变体按 Nova 格式生成，Bedrock 返回 400。企业级 Bedrock 集成的实际阻塞问题。
   https://github.com/anomalyco/opencode/issues/53756

4. **[#63632] V2 回合被神秘中止且无法追踪原因**（2 评论，今日新提）
   用户详细报告 2.0.22/2.0.27 中 turn 被无故 abort，store 与 stream 状态不一致，且关键字段在版本间丢失。报告质量高，值得维护者优先关注。
   https://github.com/anomalyco/opencode/issues/63632

5. **[#63506] 桌面端 prompt footer 显示过时模型名**（6 评论）
   slash command 通过 frontmatter 切换模型后，TUI footer 未同步更新，API 与事件流已确认切换成功——UI 层 bug。
   https://github.com/anomalyco/opencode/issues/63506

6. **[#61504] 权限请求超时机制**（6 评论）
   `ask` 规则会永久阻塞会话，无人值守场景下会话卡死。自动化/CI 场景的关键需求。
   https://github.com/anomalyco/opencode/issues/61504

7. **[#63212] GitLab Duo workflow 模型无法调用工具**（3 评论）
   v2 丢失了 v1 中 `toolExecutor`、`approvalHandler` 等接线，模型尝试调用工具时静默结束。v2 迁移的 provider 兼容性回归。
   https://github.com/anomalyco/opencode/issues/63212

8. **[#52420] 工具名归一化导致静默冲突**（5 评论，已复现）
   工具注册以 `effectiveName` 为 key，特殊字符统一归一为 `_`，名称仅差特殊字符的工具会静默覆盖。
   https://github.com/anomalyco/opencode/issues/52420

9. **[#63576] 桌面端 2.2.7 短提示响应极慢**（2 评论，今日新提）
   一词提示也要等很久才出首 token，且与 provider、空会话、禁用插件均无关。可能是 2.2.7 的性能回归。
   https://github.com/anomalyco/opencode/issues/63576

10. **[#63252] context hook 消息丢失 metadata**（3 评论，已关闭并有对应修复 PR）
    自 2.2.6 移除 `Message.metadata` 后，插件无法将上下文附加到特定用户消息——配套修复 PR #63590 今日已提交。
    https://github.com/anomalyco/opencode/issues/63252

---

## 重要 PR 进展

1. **[#63637] 新增 Advisor 工具**（新功能）
   对齐 Claude Code 的 advisor 能力：主模型工作中可咨询用户指定的第二个模型。对应 Issue #63631 同日提出，实现速度极快。
   https://github.com/anomalyco/opencode/pull/63637

2. **[#63002] 桌面端持久化浏览器 profile**
   统一桌面浏览器 profile，保留登录态、扩展，会话内链接在侧边栏打开。显著改善桌面端浏览体验。
   https://github.com/anomalyco/opencode/pull/63002

3. **[#63354] OpenCode Go 账号自动负载均衡**
   实验性 flag `experimental.auto_balance_accounts`，按剩余时长内用量最低的凭证自动选号，适合重度用户规避限额。
   https://github.com/anomalyco/opencode/pull/63354

4. **[#63641] 结构化回答回放修复**
   模型结构化回答此前报 "Tool result missing"，现在正确回放进下一次请求。
   https://github.com/anomalyco/opencode/pull/63641

5. **[#63227] 子 agent 并发上限**
   为会话子 agent 增加硬性并发上限，直接回应成本失控痛点（关联 #54935）。
   https://github.com/anomalyco/opencode/pull/63227

6. **[#63590] 修复 session hook metadata 传递**（已关闭，修复 #63252）
   插件通过 `event.metadata` 存储的数据现在能正确到达 context hook。
   https://github.com/anomalyco/opencode/pull/63590

7. **[#63633 / #63573] Code Mode 工具名修复链**
   插件在 `tool.execute.before` 中改写工具名此前无效；经 #63630 回滚后重新拆分实现，架构迭代过程清晰。
   https://github.com/anomalyco/opencode/pull/63633

8. **[#63612] `/clear` 与 `/exit` 卸载本地模型**
   解决本地模型驻留内存问题，对 Ollama 等本地推理用户友好。
   https://github.com/anomalyco/opencode/pull/63612

9. **[#63634] 移除 Gemini Veo 与 Runway 视频协议**
   上游服务关停后的清理，视频协议仅保留一条路径，降低维护负担。
   https://github.com/anomalyco/opencode/pull/63634

10. **[#63542] SSH 远程端口占用自动恢复**
    SSH 断线重连时远端服务端口被占导致失败，现可自动恢复（修复 #54059）。
    https://github.com/anomalyco/opencode/pull/63542

---

## 功能需求趋势

- **多模型协作**：Advisor 工具（主模型咨询第二模型）从提案到 PR 一日完成，多模型编排是当前热点。
- **成本与并发控制**：子 agent 并发上限、账号自动均衡、free-tier 限额问题（#63568）反映用户对用量/成本的强烈关注。
- **企业集成与 Provider 兼容**：Bedrock 推理配置、GitLab Duo 工具调用、非流式代理支持，企业级接入仍是痛点密集区。
- **无人值守/自动化**：权限请求超时（#61504）、静默 abort（#63632）表明 headless/CI 场景需求上升。
- **桌面端体验**：持久浏览器 profile、MSI 安装器、响应延迟，桌面产品线迭代活跃。

## 开发者关注点

1. **V2 稳定性回归**：多个 v2 issue 涉及状态不一致、provider 兼容性回归（#63212、#63632），v2 迁移期质量风险值得警惕。
2. **性能**：桌面端首 token 延迟（#63576）与大型 worktree CPU 饱和（#62948）是两类高频性能投诉。
3. **插件生态健壮性**：工具名冲突、metadata 丢失、reload 时无效工具隔离——插件 API 的边界情况被持续暴露。
4. **可观测性**：多处反馈错误静默或信息不足（MCP 403 静默重连 #59806、turn abort 无原因 #63632），用户呼吁更透明的错误上报。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-11-13

## 一、今日速览

Qwen Code 今日发布 **v0.27.3** 正式版及 **v1.0.0-preview.1** 预览版——后者修复了订阅账号登录后无法使用订阅模型的关键问题，标志着 1.0 内核（统一事件驱动 agent loop）进入预览阶段。社区侧，1.0 loop kernel 落地主线（#17045）与多项 Managed Agent 基础设施重构是今日主线，CI 稳定性问题（hz3 节点 inode 耗尽、构建产物下载超时）仍是最大痛点。

---

## 二、版本发布

### [v1.0.0-preview.1](https://github.com/QwenLM/qwen-code/releases)
- **修复订阅账号登录后无法使用订阅模型**的问题：模型目录现随登录状态自动切换，无需手动配置 provider
- 订阅模型目录及 thinking-budget 映射与 Qwen Code 0.2 同步

### [v0.27.3](https://github.com/QwenLM/qwen-code/releases)
- Web Shell 输入框上方新增 chips，展示未完成的后台工作流、shell、monitor 和本地 agent
- 无已知 Breaking Changes

### [v0.27.2-nightly.20261112](https://github.com/QwenLM/qwen-code/releases)
- 修复 Session 关闭时 MCP owner 未释放等 Managed Agent 问题

---

## 三、社区热点 Issues

1. **[#17045](https://github.com/QwenLM/qwen-code/issues/17045) — 1.0 Preview loop kernel 落地主线追踪（P1）**
   官方路线图 Issue：将 1.0 Preview 中重写的事件驱动内核逐个 surface 迁回 `main`，是当前最重要的架构演进方向。

2. **[#14724](https://github.com/QwenLM/qwen-code/issues/14724) — Main CI: Managed Agent gate 失败（342 条评论）**
   持续近一个月的 CI 失败追踪 Issue，评论量远超其他，反映 CI 不稳定对贡献者的严重困扰。

3. **[#17040](https://github.com/QwenLM/qwen-code/issues/17040) — ACP 子进程在 curl/网络工具调用后失联，被 daemon 超时杀掉（P1）**
   Web Shell（`qwen serve`）中执行 curl 后 session 报 `agent channel closed mid-request`，影响 Windows 用户实际可用性。

4. **[#16579](https://github.com/QwenLM/qwen-code/issues/16579) — Hosted v1 detach 在 Hook 配置的活后台运行时卡死（P1）**
   由 @wenshao 提交，范围已于 11-12 修正为 v1 detach 路径的 wedge，需 keep-READY drain。

5. **[#16927](https://github.com/QwenLM/qwen-code/issues/16927) — CI 构建产物下载超时导致 58 个 job 空跑变红（P1）**
   Linux unit / web-shell smoke / no-AK 集成三条泳道共享的 artifact 交接在两次尝试中均超时，~31 分钟后无测试执行即失败。

6. **[#17037](https://github.com/QwenLM/qwen-code/issues/17037) — hz3 节点 /tmp inode 耗尽，残留 verify worktree 占 92% tmpfs（P1）**
   CI 基础设施层面的硬故障，job 在执行前即被磁盘门槛拦截，需尽快清理。

7. **[#13570](https://github.com/QwenLM/qwen-code/issues/13570) — Auto 模式拦截仅提及 amend 措辞的惰性文本，无逃生通道（P2，安全）**
   权限系统误伤问题：用户自定义 ask 规则被内置破坏性命令防护抢先阻断，涉及安全策略与用户自主权的平衡。

8. **[#15327](https://github.com/QwenLM/qwen-code/issues/15327) — 所有 surface 统一到一个 agent loop（P1）**
   与 #17045 呼应的核心架构需求：`packages/core` 中单一 agent loop 供所有前端复用。

9. **[#17038](https://github.com/QwenLM/qwen-code/issues/17038) — Headless Linux 登录卡在验证状态（P2）**
   无头设备通过他机浏览器完成 OAuth 后 CLI 无法自动继续，影响服务器/远程场景用户。

10. **[#16434](https://github.com/QwenLM/qwen-code/issues/16434) — SDK 与 Web Shell 依赖存在已披露安全通告（P2）**
    `@qwen-code/sdk@0.1.28` 和 `@qwen-code/web-shell@0.26.8` 的干净解析仍命中公开 advisory，跟踪依赖升级与发包。

---

## 四、重要 PR 进展

1. **[#17050](https://github.com/QwenLM/qwen-code/pull/17050) — 为 loop 滚动上线添加 kernel 与 OpenTUI nightly CI 泳道**
   服务于 #17045 block B：Linux 无沙箱矩阵新增双开关 kernel 臂，OpenTUI 交互任务补齐三臂（current/unified/kernel）loop 矩阵。

2. **[#16866](https://github.com/QwenLM/qwen-code/pull/16866) — Managed Web Terminal（Managed Agent 交互式网页终端）**
   浏览器 WebSocket 经 Java 控制面逐字节中继到 Runtime worker 的 PTY；终端 I/O 为实时按键数据，不落 journal、不导出。

3. **[#17035](https://github.com/QwenLM/qwen-code/pull/17035) — AgentCore 工具批次接入共享 agent loop（已合并）**
   开启 `experimental.unifiedAgentLoop` 后，子 agent / 后台 / fork / workflow agent 的工具调用以单批次跑在 agent 自身调度器上，统一 loop 的关键一步。

4. **[#16784](https://github.com/QwenLM/qwen-code/pull/16784) — shell 不可解码路径 fail-closed（安全修复）**
   无法解码的文件名词元不再继承 allow 结论，防止经 quote removal / ANSI-C 解析逃逸的路径绕过权限判定。

5. **[#16661](https://github.com/QwenLM/qwen-code/pull/16661) — 修复被中止工具调用撕裂的 MCP 连接**
   中止 in-flight MCP 请求后 transport 被误杀置为 DISCONNECTED；现 abort 路径会自动修复连接。

6. **[#17042](https://github.com/QwenLM/qwen-code/pull/17042) — 权限系统识别 `>|` clobber 重定向的写入（已合并）**
   修复 `echo '{}' >| .qwen/settings.json` 可绕过 `Write(...)` deny 规则的漏洞——分析器此前在 `|` 处截断导致漏报写入。

7. **[#17064](https://github.com/QwenLM/qwen-code/pull/17064) — Managed Agent Server 收敛为单一可执行 jar（已合并）**
   模块构建与发行版统一为单个 Spring Boot 可执行 jar，简化部署与运维。

8. **[#17047](https://github.com/QwenLM/qwen-code/pull/17047) — CSI 准入、activation-lease、broker 读取器 pack-aware 化（已合并）**
   关闭 journal 压缩驱逐 `record_bytes` 后无法回读的前置条件，为启用 session 删除功能铺路。

9. **[#16679](https://github.com/QwenLM/qwen-code/pull/16679) — ACP 客户端正确上报失败的 todo_write**
   失败调用现以 `status: failed` 的 terminal `tool_call_update` 上报，而非静默丢弃帧。

10. **[#17043](https://github.com/QwenLM/qwen-code/pull/17043) — 修复 rename 恢复测试并落地 #17006 评审遗留（已合并）**
    将 main 的 Java 测试套件恢复为绿色，是今日 Managed Agent 收敛批次的一部分。

---

## 五、功能需求趋势

- **统一 Agent Loop 内核（最热）**：#17045、#15327、#17035、#17050 形成 1.0 内核落地的完整脉络，事件驱动 `query()` 单入口架构是当前最高优先级方向。
- **Web Shell / 托管形态增强**：Managed Web Terminal（#16866）、后台任务 chips（v0.27.3）、session 概览 UX（#17056、#16444）显示 Web 端产品化投入持续加大。
- **权限与安全策略精细化**：amend-guard 误伤（#13570、#16449）、shell 路径解码 fail-closed（#16784）、`>|` 重定向识别（#17042），社区要求安全防护从“粗粒度拦截”走向“结构化判定 + 用户可覆盖”。
- **会话稳定性与生命周期管理**：detach 卡死（#16579）、ACP 失联（#17040）、连接中断（#16915、#16908）等多条 Issue 指向 session/channel 生命周期的健壮性。
- **订阅账号体验**：v1.0.0-preview.1 优先修复订阅模型可用性，登录态自动跟随是明确的产品方向。

---

## 六、开发者关注点

- **CI 稳定性是最大抱怨源**：评论量 Top 3 几乎全是 CI 失败追踪（#14724 342 条评论），叠加 #16927（58 job 空跑）、#17037（inode 耗尽）、#16958（lint-gate 跟进），自建 runner 集群的资源治理与 flaky test 治理（deflake 系列 #17046/#17057/#17063/#16975）占用了大量维护带宽。
- **模型连接可靠性**：多条用户反馈 CLI 执行中频繁断连且日志不足以定位（#16908、#16915），对可诊断性（logging）有明确诉求。
- **无头/远程场景支持不足**：headless Linux OAuth 登录卡住（#17038）反映服务器与远程开发场景仍属二等公民。
- **依赖安全更新滞后**：SDK 与 Web Shell 发布包仍命中公开 advisory（#16434），供应链安全需更快的升级节奏。
- **贡献流程摩擦**：PR 合并门禁依赖维护者评审（#17077 卡在两次 approval），外部贡献者等待周期偏长。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*