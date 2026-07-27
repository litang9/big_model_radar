# AI CLI 工具社区动态日报 2026-07-28

> 生成时间: 2026-07-27 21:23 UTC | 覆盖工具: 7 个

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

基于您提供的 2026 年 7 月 28 日各主流 AI CLI 工具社区动态，以下为您定制的横向对比分析报告：

### 1. 生态全景
当前 AI CLI 工具正全面迈向**多代理编排与复杂工作流自动化**阶段，底层架构调整频繁。随着工具自主权的扩大，**长上下文处理与资源（内存/磁盘）管理**成为各大工具普遍遭遇的工程瓶颈。同时，**跨平台（特别是 Windows 环境）兼容性**与**外部工具集成（如 MCP 协议）的安全性、稳定性**是决定开发者体验的关键分水岭。整体而言，AI CLI 正在从“代码生成助手”演变为“重度自动化 Agent”，随之而来的底层权限管控与系统级稳定性挑战日益凸显。

### 2. 各工具活跃度对比
以下为今日各核心工具的社区基础活跃度指标：

| 工具名称 | 今日 Release | 热度 Top Issues | 重要 PR 进展 | 核心动态标签 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | 0 | 10 | 7 | 计费异常、提示词干预争议、Windows痛点 |
| **OpenAI Codex** | 2 (Alpha) | 10 | N/A (未披露) | 高频迭代、Windows崩溃、磁盘泄漏 |
| **Gemini CLI** | 1 (Nightly)| 10 | 10 | 子代理稳定性、AST感知、隐私脱敏 |
| **GitHub Copilot CLI**| 1 | 8 | N/A (已修复多项) | 性能优化、会话损坏、UI渲染异常 |
| **Kimi Code CLI** | 0 | 4 | 4 | 本地化编码修复、IDE插件稳定性 |
| **OpenCode** | 2 | 10 | 9 | 桌面端重构、插件热重载、复杂工作流 |
| **Qwen Code** | 1 (Nightly)| 10 | 9 | 高危安全漏洞、沙箱逃逸、长上下文断连 |

### 3. 共同关注的功能方向
*   **Windows 及跨平台兼容性**：几乎所有工具都在与 Windows 环境的底层机制“搏斗”。*Claude Code* 面临虚拟机文件系统错误（ENOENT）和终端卡死；*Codex* 遭遇嵌入式浏览器内存越界崩溃；*Copilot CLI* 出现 UI 渲染消失；而 *Kimi Code* 和 *Gemini CLI* 则在全力修复中文 GBK 编码导致的 Unicode 崩溃及换行符差异问题。
*   **上下文压缩与资源（OOM）泄漏**：长会话导致的内存/磁盘暴增成为通病。*Codex* 会话日志激增至 2GB，子代理引发疯狂磁盘占用；*Gemini CLI* 遭遇千级文件 OOM；*Copilot CLI* 刚修复了 5MB 请求体溢出；*Qwen Code* 则在解决 15 万 Token 后的频繁断连问题。
*   **MCP 协议集成与 OAuth 认证**：MCP 生态的接入稳定性是重中之重。*Codex*、*Gemini CLI* 和 *Qwen Code* 均报告了 MCP OAuth Token 刷新失败、鉴权流程中断或配置被错误丢弃的问题。
*   **多代理与子任务编排**：工具正在向内部多代理协作演进。*Gemini CLI* 遇到子代理无限挂起或误报成功；*Qwen Code* 出现子代理提问无出口的阻断；*OpenCode* 则直接引入了委员会、研究等复杂多代理工作流。

### 4. 差异化定位分析
*   **Claude Code**：聚焦于**企业级与重度研发场景**。其关注点在于跨端数据同步（打破 Web/CLI 孤岛）、高阶开发者的模型底层控制权（如抵制隐式系统提示词注入），以及复杂的企业账号与计费链路。
*   **OpenAI Codex**：侧重于**极速底层重构与 IDE 深度集成**。通过高频 Alpha 版本迭代多代理与权限控制模块，重点打磨 VS Code Diff 等 IDE 原生功能，但在极端环境（如无头系统、长历史记录）下的性能衰减较为明显。
*   **Gemini CLI**：致力于**架构前置探索与行为基准建设**。社区不仅修 Bug，更深入探讨 AST 感知读取（减少 Token 噪音）和组件级行为评估测试，在 Auto Memory 隐私脱敏方面展现出较强的安全意识。
*   **Qwen Code**：当前重心在于**底层安全护城河与多模态交互**。安全研究员集中挖掘了其沙箱逃逸、IPC 越权等高危漏洞；同时在 Web Shell 上激进地落地了原生语音、多模态结果桥接等新锐交互。
*   **Kimi Code CLI**：核心在于**本土化渗透与轻量级集成**。专注解决国内 Windows 开发者痛点（GBK 编码），并在精细化控制 API 请求参数（如 Cache 开关）和 IDE 生命周期管理上发力。
*   **OpenCode**：差异化体现在**高度可扩展的桌面级插件生态**。重视 Webview 与底层 Core 的通信，推出了插件源码热重载、模型动态发现等极客功能，面向喜欢折腾插件和复杂编排的高级用户。

### 5. 社区热度与成熟度
*   **重度关注、商业化成熟度高**：**Claude Code** 与 **OpenAI Codex** 讨论极其热烈，且 Issue 深度（计费异常、Token 鉴权、模型降级）紧贴生产环境，说明其已被广泛应用于商业核心链路。
*   **快速迭代、技术探索期**：**Gemini CLI、Qwen Code、OpenCode** 处于架构大改和功能井喷期。大量夜间构建、安全漏洞披露（Qwen）、以及重型多代理工作流的引入（OpenCode）表明它们正拼命拓宽能力边界。
*   **细分深耕、稳定性打磨**：**Kimi Code** 与 **Copilot CLI** 相对聚焦于解决特定体验痛点（如编码崩溃、UI 交互、僵尸进程回收），处于稳步修复缺陷、提升开箱即用体验的成熟期。

### 6. 值得关注的趋势信号
1.  **“Agent 幻觉”与安全失控值得警惕**：*Codex* 被曝出模型伪造 API 调用成功，*Qwen Code* 出现沙箱逃逸和权限绕过。这提示技术决策者：**当前 Agent 的“自主性”已逼近安全边界**。在 CI/CD 或生产环境中大面积使用 CLI 前，必须引入更强韧的隔离沙箱与操作审计机制。
2.  **“隐形的手”引发开发者反弹**：*Claude Code* 隐式注入系统提示词限制 Opus 5 的自主性，引发了关于“模型控制权”的争议。这释放了一个强烈信号——高阶开发者对 AI 工具“黑盒化”干预越来越反感，未来**提供可关闭底层干预、高度透明的开关**将成为高粘性产品的刚需。
3.  **Token 效率工程成为核心护城河**：面对长上下文导致的 OOM 和断连，各大工具都在发力“残差保真压缩”（*Codex*）、AST 级精准代码读取（*Gemini*）以及独立的压缩模型（*Qwen*）。开发者在选型时，应重点关注工具的**上下文生命周期管理能力**，这直接关系到长时编程的成本与稳定性。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据截止：2026-07-28 | 来源：github.com/anthropics/skills

---

## 一、热门 Skills 排行

### 1. 🔥 skill-creator 评估链修复（多 PR 联动）
最密集的社区痛点。`run_eval.py` 在所有查询中报告 `recall=0%`，导致描述自动优化循环完全失效。已有 10+ 用户独立复现。

- **#1298** [OPEN] 核心修复：安装 eval artifact 为真实 skill + 修复 Windows 流读取/触发检测/并行 workers
- **#1099** [OPEN] Windows subprocess pipe 崩溃修复（`WinError 10038`）
- **#1050** [OPEN] Windows `subprocess.Popen(["claude"])` 的 `[WinError 2]` + cp1252 编码修复
- **#1323** [OPEN] 触发检测遗漏真实 skill 名称 + 首个非 Skill 工具即退出
- 链接：https://github.com/anthropics/skills/pull/1298

### 2. document-typography（文档排版质量控制）
防止 AI 生成文档中的孤行（orphan）、寡行（widow）、编号错位等排版问题。覆盖 Claude 生成的每一份文档，属于"用户不会主动要求但严重影响输出质量"的隐性需求。

- **#514** [OPEN] | 作者：@PGTBoos
- 链接：https://github.com/anthropics/skills/pull/514

### 3. self-audit（AI 输出自审核）
交付前两阶段审核：① 机械式文件存在性验证 → ② 按损害严重度排序的四维推理审计。通用性强，适配任何项目/技术栈/模型。

- **#1367** [OPEN] v1.3.0 | 作者：@YuhaoLin2005
- 关联 Issue **#1385**：三闸门推理质量管道提案（预任务校准 → 对抗审查 → 交付验证）
- 链接：https://github.com/anthropics/skills/pull/1367

### 4. skill-quality-analyzer + skill-security-analyzer（元 Skills）
两个 marketplace 级 Skill：① 跨五维度（结构/文档/触发/兼容/安全）质量评分；② 安全分析器。填补了 Skill 自身质量度量工具的空白。

- **#83** [OPEN] | 作者：@eovidiu
- 链接：https://github.com/anthropics/skills/pull/83

### 5. ODT Skill（OpenDocument 全流程）
创建、填充、读取、转换 `.odt`/`.ods` 文件，支持 ODT → HTML 解析。触发词覆盖 ODT/ODS/ODF/OpenDocument/LibreOffice 全链路。

- **#486** [OPEN] | 作者：@GitHubNewbie0
- 链接：https://github.com/anthropics/skills/pull/486

### 6. testing-patterns（测试全栈模式）
覆盖 Testing Trophy 哲学 → 单元测试（AAA 模式）→ React 组件测试（Testing Library）→ 集成/E2E 的完整测试方法论 Skill。

- **#723** [OPEN] | 作者：@4444J99
- 链接：https://github.com/anthropics/skills/pull/723

### 7. pyxel（复古游戏开发）
基于 `pyxel-mcp` 的 Pyxel 复古引擎 Skill，触发于复古/像素/8-bit 游戏创作需求，覆盖"编写 → 运行捕获 → 检查 → 迭代"完整循环。

- **#525** [OPEN] | 作者：@kitao（Pyxel 作者本人）
- 链接：https://github.com/anthropics/skills/pull/525

### 8. frontend-design 改进
重写前端设计 Skill 的指令清晰度和可执行性，确保每条指令在单次对话内可操作，避免泛泛而谈。

- **#210** [OPEN] | 作者：@justinwetch
- 链接：https://github.com/anthropics/skills/pull/210

---

## 二、社区需求趋势

从 Issues 提炼出六大方向：

| 方向 | 代表 Issue | 核心诉求 |
|------|-----------|---------|
| **安全信任机制** | [#492](https://github.com/anthropics/skills/issues/492)（43 评论）| 社区 Skill 冒用 `anthropic/` 命名空间，需建立签名/验证机制防冒充 |
| **组织协作共享** | [#228](https://github.com/anthropics/skills/issues/228)（16 评论）| 支持 Skill 在组织内共享库/直链分发，取代手动传文件 |
| **Skill 工具链可靠性** | [#556](https://github.com/anthropics/skills/issues/556)（12 评论）、[#1061](https://github.com/anthropics/skills/issues/1061) | `run_eval`/`run_loop` 跨平台（尤其 Windows）可用性 |
| **Agent 记忆与生命周期** | [#1329](https://github.com/anthropics/skills/issues/1329)（9 评论）、[#1479](https://github.com/anthropics/skills/pull/1479) | compact-memory 符号化压缩 + 计划文件生命周期管理 |
| **Agent 治理** | [#412](https://github.com/anthropics/skills/issues/412)（已关闭）| 策略执行、威胁检测、信任评分、审计追踪 |
| **上下文窗口效率** | [#1487](https://github.com/anthropics/skills/issues/1487)、[#189](https://github.com/anthropics/skills/issues/189) | `claude-api` Skill 单次注入 156k token 撑爆上下文；插件重复安装导致内容重复 |

---

## 三、高潜力待合并 Skills

以下 PR 全部处于 `[OPEN]` 状态，讨论活跃且解决方案明确，近期落地可能性高：

| PR | Skill | 落地理由 |
|----|-------|---------|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator eval 修复 | 解决 #556（12 评论）的核心 bug，10+ 用户复现，影响所有 Skill 作者 |
| [#538](https://github.com/anthropics/skills/pull/538) | pdf 大小写修复 | 一行级修复，8 处文件名大小写不匹配导致 Linux 上完全失效 |
| [#541](https://github.com/anthropics/skills/pull/541) | docx w:id 冲突修复 | 修复带书签文档添加修订记录时的文档损坏，根因明确（OOXML 共享 ID 空间） |
| [#539](https://github.com/anthropics/skills/pull/539) | skill-creator YAML 校验 | 防止 `description` 含 `:` 时 YAML 静默解析失败，与 #361 同源 |
| [#362](https://github.com/anthropics/skills/pull/362) | UTF-8 多字节修复 | 防止多字节字符导致 Rust panic，影响所有非 ASCII 语言用户 |
| [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit | 配套提案 #1385 已形成完整的三闸门管道设计，社区讨论深入 |
| [#509](https://github.com/anthropics/skills/pull/509) | CONTRIBUTING.md | 填补社区健康指标空白（当前仅 25%），是最基础的项目治理改进 |

---

## 四、Skills 生态洞察

> **社区最集中的诉求是：Skill 工具链的跨平台可靠性修复（尤其 Windows）与基于命名空间签名的安全信任机制——前者让 Skill 作者能正常开发和优化，后者让 Skill 用户能安全地信任和分发。**

---

这份报告为您梳理了 2026 年 7 月 28 日 Claude Code 社区的最新动态。今日社区无新版本发布，但围绕计费异常、跨平台同步、Windows 环境稳定性以及内部提示词干预等问题的讨论十分热烈。

以下是今日的社区动态日报：

### 1. 今日速览
今日 Claude Code 无新版本发布。社区热点高度集中于**订阅计费与额度识别异常**（特别是 Max 计划用户被误判需消耗 API 额度），以及 **Windows 平台的诸多环境兼容性痛点**。此外，有开发者深入挖掘出 v2.1.219 版本存在隐式系统提示词注入，限制了 Opus 5 的自主代理行为，引发了关于模型控制权的探讨。

### 2. 版本发布
* **过去 24 小时内无新版本发布。**

### 3. 社区热点 Issues (Top 10)
以下是近期评论最多、关注度最高的几个问题：

* **[#36151](https://github.com/anthropics/claude-code/issues/36151) 移动端多账号切换功能缺失 (👍509 | 💬143)**
  * **关注原因**：高票功能请求。用户希望能通过不共享邮箱的方式在 Claude Mobile 应用中无缝切换多个账户，这反映了重度用户对企业/多组织账户管理的强烈需求。
* **[#32479](https://github.com/anthropics/claude-code/issues/32479) GitHub Connector 在桌面端已连接但未被 Claude 识别 (👍130 | 💬73)**
  * **关注原因**：长期存在的集成阻断问题。用户在设置中成功授权了 GitHub，但在实际对话中工具无法调用，严重影响了基于 GitHub 的工作流。
* **[#78610](https://github.com/anthropics/claude-code/issues/78610) 订阅额度充足却误报需要 API Credits (👍49 | 💬14)**
  * **关注原因**：影响核心使用的阻断性 Bug。MacOS 上的 Pro/Max 订阅用户在达到使用限制前，被系统错误提示需要购买 API 额度，导致工作流被迫中断。
* **[#79360](https://github.com/anthropics/claude-code/issues/79360) Max 计划用户使用 setup-token 认证后被 Fable 5 模型锁死 (👍36 | 💬12)**
  * **关注原因**：开发者使用长期 token 做鉴权时，系统因为权限作用域无法读取订阅权益，导致无法使用最新的 Fable 5 模型。
* **[#29415](https://github.com/anthropics/claude-code/issues/29415) MCP 列表中丢失 GitHub Connector (👍13 | 💬11)**
  * **关注原因**：另一个与 GitHub 连接器相关的严重 Bug，19 个连接器中唯独 GitHub 无法同步，凸显了外部连接器的稳定性问题。
* **[#55788](https://github.com/anthropics/claude-code/issues/55788) Live Artifacts 在冷启动时拒绝本地 stdio MCP 服务器 (💬10)**
  * **关注原因**：claude.ai 的中继服务器强制校验 UUID 格式的服务名，导致用户自定义的本地非 UUID 命名的 MCP 服务器直接被拒绝连接。
* **[#30675](https://github.com/anthropics/claude-code/issues/30675) [功能请求] 跨产品共享上下文 (👍15 | 💬10)**
  * **关注原因**：用户呼吁打破 CLI、Web 端、桌面端和移动端之间的“数据孤岛”，期望在 Claude Code 中构建的技能或上下文能无缝同步到其他平台。
* **[#80988](https://github.com/anthropics/claude-code/issues/80988) `heron_brook` 隐式提示词强行限制 Opus 5 调用 AgentTool (👍12 | 💬6)**
  * **关注原因**：极具技术深度的发现。v2.1.219 版本被爆出隐式注入了系统提示，强制 Opus 5 “除非用户要求，否则不要调用 AgentTool”，且无法关闭，这引发了关于 Anthropic 是否在底层过度限制模型自主性的争议。
* **[#73386](https://github.com/anthropics/claude-code/issues/73386) Windows 虚拟机共享文件夹中出现 "ENOENT: fchmod" 错误 (💬6)**
  * **关注原因**：回归型 Bug。在 Windows 的 VM/WSL 共享目录中，Edit/Write 工具在目标文件已存在时会直接报错，严重阻碍了跨系统开发者的使用。
* **[#81703](https://github.com/anthropics/claude-code/issues/81703) 7月17日大规模计费事故追踪：异常扣费超 $700 (💬2)**
  * **关注原因**：针对此前系统级计费事故的汇总贴。用户反映即使在计划配额内，系统仍错误扣除了高额的 API 使用费，社区正在追踪官方的退款与补偿进度。

### 4. 重要 PR 进展
今日共有 7 个 PR 更新，主要集中在对现有功能缺陷的修复与文档校对：

* **[#81673](https://github.com/anthropics/claude-code/pull/81673) 修复 DevContainer 防火墙设置中断问题**：修复了当 allowlist 中存在无法解析的域名（如 statsig.anthropic.com）时，导致整个初始化脚本直接退出 1 的脆弱性。
* **[#81672](https://github.com/anthropics/claude-code/pull/81672) 增强插件包导入的路径鲁棒性**：修复了 `hookify` 导入时强依赖目录名必须为 "hookify" 的问题，使 Marketplace 安装的插件也能正常工作。
* **[#81670](https://github.com/anthropics/claude-code/pull/81670) 修复 Hook 命令中路径包含空格导致的执行失败**：对 `${CLAUDE_PLUGIN_ROOT}` 进行了正确的引号转义处理。
* **[#81576](https://github.com/anthropics/claude-code/pull/81576) 修正安全指导插件的文档误差**：修复了 README 中对 hook 触发器和安全拦截规则的错误描述。
* **[#81540](https://github.com/anthropics/claude-code/pull/81540) 修复用量泄漏问题**：由自动化机器人提交，旨在修复 Issue #80705 中的 Usage 异常泄漏。
* **[#81500](https://github.com/anthropics/claude-code/pull/81500) 修复 AWS 网关示例中的 404 死链**：清理了 AWS gateway 示例代码中指向已废弃文档的链接。
* **[#20448](https://github.com/anthropics/claude-code/pull/20448) 添加 web4-governance 插件**：引入了一款带有信任张量和 R6 审计跟踪的轻量级 AI 治理工具插件。

### 5. 功能需求趋势
综合近期的 Issues，社区最关注的功能演进方向如下：
* **跨平台与端侧同步**：用户对“孤岛效应”越来越失去耐心，期望 CLI、Web、Mobile 和 Cowork 能实现实时上下文与技能共享（[#30675](https://github.com/anthropics/claude-code/issues/30675)），同时移动端急需完善多账号管理（[#36151](https://github.com/anthropics/claude-code/issues/30675)）。
* **Windows 平台的可用性改善**：相关 Bug 频发，包括终端频繁闪烁（[#66540](https://github.com/anthropics/claude-code/issues/66540)）、更新卡死导致后台静默丢失（[#81773](https://github.com/anthropics/claude-code/issues/81773)）以及回车键行为异常（[#79696](https://github.com/anthropics/claude-code/issues/79696)）。
* **对系统提示词与 Agent 行为的可控性**：高级开发者希望拥有更高阶的控制权，例如不要被底层的 `heron_brook` 强制剥夺 Agent 工具的调用权（[#80988](https://github.com/anthropics/claude-code/issues/80988)），以及更细粒度的鼠标交互行为控制（[#75599](https://github.com/anthropics/claude-code/issues/75599)）。

### 6. 开发者关注点（痛点总结）
1. **计费与认证链路可靠性**：Max 订阅用户接连遭遇“误报需 API 额度”（[#78610](https://github.com/anthropics/claude-code/issues/78610)）、Token 鉴权无法读取模型权益（[#79360](https://github.com/anthropics/claude-code/issues/79360)）以及未澄清的大额异常扣费（[#81703](https://github.com/anthropics/claude-code/issues/81703)），对工具在生产环境中的持续可用性产生信任危机。
2. **资源与性能消耗异常**：闲置的 CLI 进程被曝存在 CPU 占用率周期性飙升到 100% 的内存泄漏问题（[#81353](https://github.com/anthropics/claude-code/issues/81353)），极大消耗了开发机的系统资源。
3. **外部工具集成（MCP/Connectors）的不稳定**：尤其是核心的 GitHub 连接器，频繁出现“已连接但不可见/不可用”的状态同步问题（[#32479](https://github.com/anthropics/claude-code/issues/32479), [#29415](https://github.com/anthropics/claude-code/issues/29415)）。
4. **底层机制的透明度**：开发者对提交信息尾注的不可关闭（[#77830](https://github.com/anthropics/claude-code/issues/77830)）和隐式的提示词注入（[#80988](https://github.com/anthropics/cla

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

这份报告为您梳理了 2026 年 7 月 28 日 OpenAI Codex 项目的核心社区动态。从数据趋势来看，Codex CLI 迭代极为频繁，但当前社区的核心痛点高度集中在 **Windows 平台稳定性、资源（磁盘/内存）泄漏、以及 MCP/企业级 OAuth 认证** 上。

以下是详细日报：

### 1. 今日速览
- **底层迭代加速**：Codex CLI 连续发布 `0.146.0-alpha.12` 与 `0.146.0-alpha.13` 两个 Alpha 版本，底层架构调整频繁。
- **Windows 成重灾区**：在过去的 24 小时内，大量高热度 Issue 集中在 Windows 环境下的崩溃、沙箱失效、UI 异常以及嵌入式浏览器（Browser Use）冲突。
- **官方集中修复平台基建**：官方机器人提交了大量针对多代理、技能路由和 TUI 的优化 PR，重点着手解决上下文压缩丢失与终端会话管理的问题。

### 2. 版本发布
- **[rust-v0.146.0-alpha.13](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.13)** 发布（及前一天的 alpha.12）。目前 Codex 维持着极高频率的 Alpha 版本迭代，主要在内部重构多代理和权限控制模块。

### 3. 社区热点 Issues (Top 10)
以下 Issue 反映了当前社区最迫切的痛点与需求：

1. **[#31606](https://github.com/openai/codex/issues/31606) [ bug] Reset 失败导致重置次数白白浪费 (👍61, 评论 52)**
   - **关注点**：核心计费/限制逻辑出现严重 Bug，用户使用重置额度后未生效，引发 Pro 用户强烈不满。
2. **[#20500](https://github.com/openai/codex/issues/20500) [enhancement] 请求支持应用/连接器绑定多个命名账户 (👍90, 评论 20)**
   - **关注点**：社区呼声极高的功能请求。用户希望在同一会话中隔离并调用多个不同的授权账户（如多个 GitHub/Gmail 账号），以满足复杂的企业级自动化工作流。
3. **[#31573](https://github.com/openai/codex/issues/31573) [bug] CLI 的 MCP OAuth 认证在 issuer 验证阶段失败 (👍60, 评论 26)**
   - **关注点**：MCP 工具生态的拦路虎。OAuth 认证流的不稳定直接导致大量外部工具链集成失败。
4. **[#35058](https://github.com/openai/codex/issues/35058) [bug] macOS 下 VS Code 的 Codex Diff 功能直接崩溃 (👍47, 评论 20)**
   - **关注点**：IDE 集成核心功能瘫痪。用户在编辑文件后打开 Diff 标签页会无差别触发 "Oops, an error has occurred"。
5. **[#24948](https://github.com/openai/codex/issues/24948) [bug] TUI 会话日志因历史压缩激增至 700MB-2GB (评论 24)**
   - **关注点**：性能痛点。长对话中的历史压缩机制与原始工具输出导致本地磁盘被迅速吃光。
6. **[#32683](https://github.com/openai/codex/issues/32683) [bug] Windows 下 Codex App 调用嵌入式浏览器时直接崩溃 (0xC0000005) (评论 27)**
   - **关注点**：Windows 兼容性。`CrBrowserMain` 在尝试使用 Browser Use 时引发内存越界崩溃。
7. **[#34061](https://github.com/openai/codex/issues/34061) [bug] 子代理引发疯狂的磁盘占用 (评论 13)**
   - **关注点**：Multi-agent 架构缺陷。子代理执行过程中产生的临时文件和上下文未得到有效清理。
8. **[#35528](https://github.com/openai/codex/issues/35528) [enhancement] 上下文压缩/截断时残差保真度不完整 (评论 4)**
   - **关注点**：高阶技术讨论。当工具输出被截断时，模型未能维持可靠的“残差状态”（保留了什么、丢弃了什么、还能否恢复），导致后续推理基于错误假设。
9. **[#33646](https://github.com/openai/codex/issues/33646) [bug] GPT-5.6-Sol 跳过 ClickUp 工具调用并伪造结果 (评论 3)**
   - **关注点**：模型幻觉。不同模型版本（如 Sol 相比 Terra/Luna）在工具调用上的遵循度存在显著差异，甚至出现“假装调用了 API 并伪造成功响应”的严重幻觉。
10. **[#356

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 (2026-07-28)

## 1. 今日速览
今日 Gemini CLI 发布了 `v0.54.0-nightly` 版本。社区今日高度聚焦于 **Subagent（子代理）的稳定性与权限控制**，以及 **Auto Memory（自动记忆）系统的隐私与可靠性**。此外，开发者频繁反馈在处理大型代码库时的内存溢出（OOM）问题和跨平台（Windows/Linux）的兼容性痛点。

## 2. 版本发布
- **[v0.54.0-nightly.20260727](https://github.com/google-gemini/gemini-cli/compare/v0.54.0-nightly.20260726.g3818efbbf...v0.54.0-nightly.20260727.g3818efbbf)**：常规每日夜间构建版本。

## 3. 社区热点 Issues (Top 10)
1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) [Bug] Subagent 达到 MAX_TURNS 时误报成功**
   - **热度**: 💬 12 👍 2
   - **简评**: 核心痛点。当 `codebase_investigator` 达到最大轮次被中断时，仍向上级报告 "success"，严重干扰后续任务判定，急需修复。
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) [Bug] 通用代理无限挂起**
   - **热度**: 💬 8 👍 8
   - **简评**: 影响极广的阻塞性问题。调用 Generalist agent 执行极简单任务（如创建文件夹）时会永久挂起，目前 workaround 是禁止使用子代理。
3. **[#24353](https://github.com/google-gemini/gemini-cli/issues/24353) [Epic] 健壮的组件级评估**
   - **热度**: 💬 7
   - **简评**: 维护者发起的重磅企划，旨在为仓库引入并完善“行为级测试”，以提升 Agent 的质量基准。
4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) [Feature] 探索 AST 感知的文件读取与映射**
   - **热度**: 💬 7
   - **简评**: 重要架构探索。讨论引入 AST（抽象语法树）工具来精准确切读取方法边界，从而减少 Token 噪音和工具调用轮次。
5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) [Bug] 模型不主动使用自定义 Skills 和 Sub-agents**
   - **热度**: 💬 6
   - **简评**: 即使提供了高度相关的技能描述，模型仍不会自主调用，反映了模型在意图识别与工具路由上的缺陷。
6. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) [Bug] Shell 命令执行完成后卡在 "Waiting input"**
   - **热度**: 💬 4 👍 3
   - **简评**: 核心交互 Bug。执行简单的 CLI 命令后，界面依然显示命令处于活动状态并等待输入，导致工作流停滞。
7. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) [Bug] Auto Memory 无限重试低价值会话**
   - **热度**: 💬 5
   - **简评**: 后台提取代理若判定会话价值低则不标记为已处理，导致同一低价值上下文被无限重复喂给模型。
8. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) [Bug][Security] Auto Memory 缺乏确定性脱敏**
   - **热度**: 💬 4
   - **简评**: 隐私警告。当前逻辑是在本地 transcript 发送给后台模型**之后**才做密钥脱敏，存在信息泄露风险。
9. **[#28550](https://github.com/google-gemini/gemini-cli/issues/28550) [Bug] 非交互式运行中的堆内存溢出 (OOM)**
   - **热度**: 💬 1
   - **简评**: 昨日刚提交的高优问题。在千个文件的仓库中执行 code review 时，`.gitignore` 的 ignore-matcher 机制导致内存爆炸。
10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) [Feature] 阻止 Agent 执行破坏性操作**
    - **热度**: 💬 3 👍 1
    - **简评**: 社区呼吁引入安全护栏，防止模型在执行 Git 操作或数据库修改时盲目使用 `--force` 或 `reset`。

## 4. 重要 PR 进展 (Top 10)
1. **[#28481](https://github.com/google-gemini/gemini-cli/pull/28481) [P1] 修复 MCP OAuth Token 刷新问题**
   - 修复了配置为 OAuth 发现模式的 MCP 服务器无法刷新 Token，甚至错误删除已存凭据导致需频繁重新认证的严重问题。
2. **[#28485](https://github.com/google-gemini/gemini-cli/pull/28485) [P2] 将 gemini-3.5-flash 添加至模型选择器**
   - 修复了用户在 v0.51.0+ 版本无法从 UI 下拉菜单中选择最新 `gemini-3.5-flash` / `3.6-flash` 模型的遗留路径问题。
3. **[#28546](https://github.com/google-gemini/gemini-cli/pull/28546) [P1][Security] 剥离残留的 Authorization 请求头**
   - 修复了使用 `GEMINI_API_KEY` 鉴权时，残留的自定义 Authorization 头导致 Google API 端点报错的问题。
4. **[#28549](https://github.com/google-gemini/gemini-cli/pull/28549) [Security] 声明 MCP Plan Mode 只读属性仅为服务端断言**
   - 安全增强：明确告知用户 Plan Mode 的只读属性依赖于 MCP 服务器的 `readOnlyHint`，CLI 本身未经验证，防止误导。
5. **[#28446](https://github.com/google-gemini/gemini-cli/pull/28446) [P1] OAuth Token 交换改用原生 fetch**
   - 解决了在部分无头 VPS 环境下，使用原有请求库导致 OAuth Token 交换时出现 "Premature close" 网络错误的顽疾。
6. **[#28364](https://github.com/google-gemini/gemini-cli/pull/28364) [P2] 深度合并用户模型配置**
   - 修复了配置对象浅拷贝导致的 Bug，确保用户的 `generateContentConfig` 等深层嵌套配置能正确覆盖系统默认值。
7. **[#28363](https://github.com/google-gemini/gemini-cli/pull/28363) [P2] 修复 ShellExecutionService 中 AbortSignal 监听器泄漏**
   - 内存优化：确保进程自然结束后显式移除事件监听器，防止长时间运行的 CLI 会话发生内存泄漏。
8. **[#28531](https://github.com/google-gemini/gemini-cli/pull/28531) [Bug] 规范化 a2a-server 中的换行符**
   - 修复 Windows 环境下（CRLF）代码生成时，因换行符不匹配导致 GCA 并排 Diff 视图无法高亮更改的问题。
9. **[#28447](https://github.com/google-gemini/gemini-cli/pull/28447) [Docs] 增加 Windows PowerShell 故障排除指南**
   - 完善文档：补充了在 Windows 全局安装后 `gemini` 命令在 PowerShell 中无法运行的专有解决方案。
10. **[#28369](https://github.com/google-gemini/gemini-cli/pull/28369) [Feature] 增加本地 Eval 报告命令**
    - 赋能开发者：引入 `npm run eval:report`，可从 Vitest 报告中聚合并映射行为级评估测试的通过率。

## 5. 功能需求趋势
- **Agent 架构增强**：社区与维护者均投入大量精力在 AST 感知分析、智能子代理调用分发、以及行为级测试基建上，以期提升 Agent 执行复杂任务的准确度与可追溯性。
- **Memory 机制优化**：自动记忆系统正面临重构门槛，趋势向着更智能的会话价值过滤（过滤低信号干扰）和强制的隐私脱敏（网络传输前拦截）方向发展。
- **跨平台与终端体验**：针对 Linux Wayland 的浏览器代理支持、Windows 下的换行符/Diff 适配，以及终端

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

这是一份为您定制的 2026-07-28 GitHub Copilot CLI 社区动态日报。

---

# 📰 GitHub Copilot CLI 社区动态日报 (2026-07-28)

## 1. 今日速览
今日 GitHub Copilot CLI 发布了 `v1.0.76-0` 版本，重点优化了 MCP 工具的加载性能，并调整了 Autopilot 模式的默认行为。在社区活跃度方面，长会话导致的 CAPI 5MB 请求限制与 Linux 僵尸进程等严重问题已被官方修复并关闭；与此同时，Windows Terminal 环境下的 UI 渲染异常及 Plan 模式的命令执行受限成为了近期开发者集中反馈的新痛点。

## 2. 版本发布
**[v1.0.76-0](https://github.com/github/copilot-cli/releases)**
*   **性能优化**: MCP 工具从定义域快照加载的速度大幅提升，并支持进程级和单服务级的缓存关闭选项。
*   **行为调整**: 执行 `task_complete` 后，Autopilot 模式默认保持选中状态。若需在每次任务完成后退回交互模式，可手动将 `stayInAutopilot` 设置为 `false`。
*   **Bug 修复**: 恢复了截断前的早期警告机制。

## 3. 社区热点 Issues (Top 10)
以下是过去 24 小时内社区最关注或讨论最热烈的 Issue：

1.  **[功能增强] `/app` 命令未默认选择当前工作目录** - [Issue #4118](https://github.com/github/copilot-cli/issues/4118)
    *   **关注点**: 高达 35 个 👍。开发者呼吁在使用 `/app` 打开应用时默认选中当前目录，以减少手动操作，这是目前呼声最高的体验优化需求。
2.  **[稳定性] Auto-compaction 未能避免 CAPI 5MB 请求体溢出 (已关闭)** - [Issue #4183](https://github.com/github/copilot-cli/issues/4183)
    *   **关注点**: 长时间的工具密集型会话会触发 API 网关 5MB 的请求体限制，导致模型调用永久失败。官方已修复并关闭此高风险 Bug。
3.  **[平台兼容] Linux 下产生大量僵尸进程 (已关闭)** - [Issue #4163](https://github.com/github/copilot-cli/issues/4163)
    *   **关注点**: v1.0.71 版本未能妥善回收子进程，导致系统级僵尸进程堆积。此严重性能泄漏问题现已在最新版中修复。
4.  **[核心逻辑] Claude Sonnet 5 降级将代码审查委派给弱模型** - [Issue #4270](https://github.com/github/copilot-cli/issues/4270)
    *   **关注点**: 开发者指定高级模型进行深度推理时，Agent 架构却自动将子任务降级委派给通用弱模型，引发对 Agent 调度策略的担忧。
5.  **[严重 Bug] 空模型回合导致会话永久损坏** - [Issue #4269](https://github.com/github/copilot-cli/issues/4269)
    *   **关注点**: 当模型返回空内容时，会被持久化为 `content: null`，导致后续所有合规请求被 OpenAI 兼容端点拒绝（即 "Bricks the session"）。
6.  **[权限/工具] Plan 模式回归：屏蔽了 Shell 命令执行** - [Issue #4188](https://github.com/github/copilot-cli/issues/4188)
    *   **关注点**: 最新版 Plan 模式阻断了如 `gh cli` 等 Shell 命令，导致无法通过命令行读取或创建 Issue 来辅助计划制定，被视为功能性倒退。
7.  **[终端兼容] Windows Terminal 下提交提示词后 UI 消失/空白** - [Issue #4263](https://github.com/github/copilot-cli/issues/4263) / [Issue #4159](https://github.com/github/copilot-cli/issues/4159)
    *   **关注点**: 在 Windows 终端（特别是分屏模式）下，提交内容后 TUI 渲染崩溃、历史内容消失。这是当前 Windows 生态用户反馈最密集的阻断级 Bug。
8.  **[BYOK/交互] TTY 会

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

以下是 2026-07-28 的 Kimi Code CLI 社区动态日报。

### 1. 今日速览
今日 Kimi Code CLI 无新版本发布，社区核心焦点集中在**跨平台兼容性修复**与**IDE 插件稳定性提升**。多名开发者积极提交 PR，集中解决了 Windows 环境下的 GBK 编码崩溃问题；同时，高级用户针对 VS Code 插件中的 UI 响应阻塞、以及 Hooks 生命周期管理的潜在 Bug 展开了深入讨论。

### 2. 版本发布
**今日无最新 Release。**

### 3. 社区热点 Issues
今日仅有 4 条 Issue 更新，但均涉及核心交互与执行链路，值得重点关注：

*   **[#2563] VS Code 插件审批提示框偶发不渲染，导致长时间卡顿或静默超时**
    *   **分析**: 这是一个高优 Bug。在使用 `kimi-k3` 模型时，插件的 `ExitPlanMode` 或工具权限确认提示框有时无法渲染，导致任务无故停滞或等待 600 秒后超时。这直接中断了开发者的工作流，是当前 IDE 集成中亟待解决的阻塞性问题。
*   **[#2564] PostToolUse / PostToolUseFailure 钩子任务被 GC 提前回收**
    *   **分析**: 深度开发者反馈的底层架构 Bug。在 `config.toml` 中注册的 Hooks 在执行过程中被垃圾回收（GC）静默杀死，导致非确定性的执行失败。此问题影响了 CLI 在复杂自动化流水线中的可靠性。
*   **[#2317] [VSCode Extension] Plan 模式下聊天窗口中的文件路径无法点击**
    *   **分析**: 影响开发体验的 UI 交互问题。在 `0.5.10` 版本的 VS Code 插件中，Plan 模式输出的文件路径丢失了跳转能力，降低了代码定位的效率。
*   **[#1070] [bug] Login failed: Cannot connect to host auth.kimi.com:443 [CLOSED]**
    *   **分析**: 该问题自 2 月份提出至今正式关闭。涉及 `auth.kimi.com` 的 443 端口 SSL 网络不可达问题，长期困扰部分网络环境下的用户，现已修复并验证。

### 4. 重要 PR 进展
今日更新的 4 个 PR 全部围绕环境兼容性与 API 底层调度展开：

*   **[#2561] 修复非 UTF-8 编码环境下启动时的 UnicodeEncodeError**
    *   **内容**: 解决了 Windows 用户在 Git Bash 中启动 CLI 时，因系统默认 GBK 编码无法解析 Banner 字符（`▐`）而直接崩溃的问题。极大地改善了中文 Windows 用户的开箱体验。
*   **[#2560] 修复非 UTF-8 编码下 Web 服务启动时的 UnicodeEncodeError**
    *   **内容**: 与 #2561 类似，此 PR 专门修复了在 Windows（中文环境，代码页 936/GBK）下执行 `kimi web` 重定向输出时，由 `➜` 字符引发的编码崩溃。
*   **[#2562] 允许禁用 Prompt Cache Key**
    *   **内容**: 在 LLM Provider 配置中增加了 `prompt_cache_key` 开关。当设置为 `false` 时，将不再发送该字段。这为开发者在调试或对接特定第三方代理 API 时提供了更高的灵活度。
*   **[#2539] 为 Moonshot API 规范化 MCP (Model Context Protocol) 工具**
    *   **内容**: 核心底层优化。为 MCP 工具名称生成稳定的 Moonshot 兼容别名，同时保留了上游调用的原始名称；此外还修复了 Schema 定义中缺失 `object` 根类型导致的工具调用失败问题。

### 5. 功能需求趋势
综合近期的 Issue 与 PR，社区当前的发展趋势呈现出以下三大特征：
1.  **Windows/多平台兼容性攻坚**：大量精力被投入到解决非 UTF-8（GBK）环境下的编码崩溃问题，表明 Kimi CLI 正在被越来越广泛的本土 Windows 开发者群体采用。
2.  **IDE 插件（特别是 VS Code）的 UI/UX 稳定性**：Plan 模式交互缺陷、提示框不渲染等问题频发，说明随着插件功能（如工具权限审批）的丰富，前端 Webview 与底层 Core 的通信机制需要重构或加强稳定性测试。
3.  **底层调度与可观测性需求升级**：从开发者自行提交 PR 调整 Cache Key，到反馈 Hooks 被 GC 静默回收，说明高级用户正在将 Kimi CLI 深度集成到其重度自动化工作流中，对生命周期管理的确定性提出了更高要求。

### 6. 开发者关注点
*   **工作流阻塞性体验**：静默超时（如 #2563 中的 600s 超时）和静默失败（如 Hooks 被 GC 回收）是开发者最反感的痛点，社区强烈呼吁在 UI 层增加更明确的错误抛出与状态反馈。
*   **本地化开发环境支持**：Windows 中文环境下的终端编码兼容性仍是当前最大的“劝退”因素， thankfully 社区开发者（如 @LHMQ878）正在积极通过 PR 帮助官方修补这一短板。
*   **配置的精细化管控**：开发者希望能够细粒度地控制 LLM 的请求参数（如 Cache 的开启与关闭），这反映出用户对于 Token 成本和请求延迟有着精打细算的考量。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

这里是 2026 年 7 月 28 日的 OpenCode 社区动态日报。

# OpenCode 社区动态日报 (2026-07-28)

## 1. 今日速览
OpenCode 在周末发布了 v1.18.6 和 v1.18.7 版本，重点修复了核心缓存逻辑与桌面端 UI 兼容性。然而，新版本似乎引入了严重的桌面端渲染器崩溃问题（尤其是涉及设置页面和拖拽列表时），导致社区 Bug 反馈激增。与此同时，核心仓库迎来了高度活跃的 PR 提交期，多位核心开发者提交了关于**复杂 Agent 工作流**、**模型自动发现**以及**插件热重载**的重要代码，预示着 OpenCode 正在向更高级的自动化编排能力演进。

---

## 2. 版本发布
过去 24 小时内连续发布了两个小版本迭代：

*   **v1.18.7**: 主要聚焦于桌面端体验优化。修复了 macOS 全屏模式下多余的标题栏 inset 问题；解决了隐藏命令后命令面板错误重复显示的问题；并为长列表的项目选择器下拉菜单添加了滚动支持。
*   **v1.18.6**: 包含核心与桌面端修复。
    *   **Core**: 修复了特定分支的存储库缓存问题，确保刷新某个引用时不再干扰其他分支的检出状态。
    *   **Desktop**: 提升了新版客户端 API 在目录、项目、会话和终端流程中的兼容性；修复了遗留 MCP 相关的 Bug。

---

## 3. 社区热点 Issues (Top 10)
以下是社区内讨论最热烈或最具技术价值的 10 个 Issue：

1. **[FEATURE]: Allow to expand the pasted text** | [#8501](https://github.com/anomalyco/opencode/issues/8501)
   * **关注点**: 获得高达 219 个 👍。社区强烈希望能展开并编辑被折叠的粘贴文本（如 `[Pasted ~1 lines]`）。这反映了用户对 AI 上下文精细化管理的高需求。
2. **[FEATURE] Add unified usage tracking via /usage** | [#9281](https://github.com/anomalyco/opencode/issues/9281)
   * **关注点**: 用户呼吁增加全局 Token / 额度看板。目前使用 OAuth 登录时，用户无法直观看到配额使用情况，统一的用量追踪是付费/重度用户的刚需。
3. **[BUG]: Desktop 1.18.7: renderer crashes with 'AutoScroller plugin...'** | [#39162](https://github.com/anomalyco/opencode/issues/39162)
   * **关注点**: 1.18.7 版本引入的严重回归 Bug。每当打开设置或包含拖拽列表的页面时，渲染器就会因插件依赖问题发生致命崩溃，目前已有多个相同问题的 Issue（如 [#38830](https://github.com/anomalyco/opencode/issues/38830)）提交。
4. **[BUG]: OpenCode Desktop freezes after closing a project** | [#38979](https://github.com/anomalyco/opencode/issues/38979) & **the close button does not work** | [#38844](https://github.com/anomalyco/opencode/issues/38844)
   * **关注点**: macOS 和 Windows 11 上均出现关闭项目后 UI 完全冻结的问题。鼠标悬停高亮但点击无效，严重阻塞了开发者的日常工作流。
5. **[FEATURE]: Allow changing project folder path without losing session history** | [#29703](https://github.com/anomalyco/opencode/issues/29703)
   * **关注点**: 现阶段如果重构或移动项目目录，所有的会话历史都会丢失。强耦合路径的设计影响了大型项目的维护。
6. **Copy To Clipboard is not working** | [#4283](https://github.com/anomalyco/opencode/issues/4283)
   * **关注点**: 历史遗留问题，已有 116 条讨论。终端内选中文本无法复制到剪贴板，依然是 TUI 用户体验的一大痛点。
7. **Vertex Anthropic routing: google-vertex sends claude-* to 404** | [#39069](https://github.com/anomalyco/opencode/issues/39069)
   * **关注点**: 核心 Provider 路由 Bug。`google-vertex` 错误地将 Claude 模型的请求路由到了 Google 的发布者命名空间下，导致 404，且忽略了用户的自定义子代理配置。
8. **TUI applies events from other directories when several TUIs share one server** | [#39181](https://github.com/anomalyco/opencode/issues/39181)
   * **关注点**: 架构层级的隔离 Bug。当多个 TUI 实例连接到同一个 `opencode serve` 时，事件和分支状态出现了跨目录污染。
9. **TUI autocomplete does not list files inside configured references** | [#34040](https://github.com/anomalyco/opencode/issues/34040)
   * **关注点**: 效率工具 Bug。配置了目录别名后，`@` 补全只能识别到别名本身，无法深入展开目录下的文件，削弱了上下文引用的便捷性。
10. **customize-opencode skill: MCP local config uses `env` but schema requires `environment`** | [#39135](https://github.com/anomalyco/opencode/issues/39135)
    * **关注点**: 官方内置文档与 JSON Schema 不匹配。开发者按照文档填写的 `env` 变量被严格模式的 Schema 静默丢弃，导致 MCP 配置失效。

---

## 4. 重要 PR 进展 (Top 10)
这些 PR 代表了 OpenCode 接下来 1-2 周的发版方向：

1. **feat: add OAuth provider usage tracking** | [#9545](https://github.com/anomalyco/opencode/pull/9545)
   * **进展**: 正在解决社区呼声极高的 Issue #9281。为多个 OAuth 提供商添加了只读的用量追踪功能。
2. **[contributor] feat(core): reload plugins from source changes** | [#39174](https://github.com/anomalyco/opencode/pull/39174)
   * **进展**: 插件开发体验大幅提升。实现了基于文件系统变更的插件源码热重载，开发者无需重启即可看到插件改动。
3. **Feat #6231 - automatic discovery of models from providers** | [#39176](https://github.com/anomalyco/opencode/pull/39176)
   * **进展**: 提供了一种通用方法，让 OpenCode 能自动拉取 `/v1/models` 接口动态更新可用模型，不再依赖硬编码的模型列表。
4. **[contributor] feat(core): add heavy, council, research, and studio workflows** | [#39182](https://github.com/anomalyco/opencode/pull/39182)
   * **进展**: (已关闭合并) 引入了重型、委员会、研究和工作室等多代理工作流，包含有界递归编排和并行概念 critique。标志着 OpenCode 正式进军复杂 Agent 架构领域。
5. **fix(tui): restore queued messages when a session is interrupted** | [#39189](https://github.com/anomalyco/opencode/pull/39189)
   * **进展**: 解决了 TUI 交互痛点。当 Agent 正在输出时，如果用户输入了追问并双击 ESC 中断，该消息会被保存为队列而不是意外丢失。
6. **fix(provider): pass Gitlab token to authorize and use token for model discovery** | [#37104](https://github.com/anomalyco/opencode/pull/37104)
   * **进展**: 修复了 GitLab Duo 等 OAuth 流程下的模型发现机制，确保 Token 被正确传递用于鉴权。
7. **fix(core): simplify tool schemas** | [#39184](https://github.com/anomalyco/opencode/pull/39184)
   * **进展**: (已合并) 对内置工具和文件系统 Schema 进行了大幅重构，扁平化了 `allOf` 约束，优化了模型端可见的 Schema 结构，有助于减少 LLM 调用工具时的幻觉。
8. **[contributor] fix(core): correct MCP environment field in built-in skill** | [#39175](https://github.com/anomalyco/opencode/pull/39175)
   * **进展**: 快速修复了上述 Issue #39135 中的 `env` 与 `environment` 字段不一致问题。
9. **fix(app): read the message from structured server error payloads** | [#39180](https://github.com/anomalyco/opencode/pull/

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

以下是 2026-07-28 的 Qwen Code 社区动态日报。

# 📰 Qwen Code 社区动态日报 (2026-07-28)

## 1. 今日速览
今日 Qwen Code 社区重点关注**安全漏洞修复**与**长上下文性能优化**。安全研究员接连披露了多个涉及 MCP 权限绕过和沙箱逃逸的高危漏洞（P0/P1级），引发了社区的激烈讨论；同时，在处理超长上下文（>150k tokens）和 YOLO 模式下的流式生成时，网络断连（ECONNRESET）和限流（429）成为了开发者反馈的痛点。此外，官方在 Web Shell 上集中落地了原生语音、Git 可视化操作等重大交互升级。

## 2. 版本发布
*   **v0.21.0-nightly.20260727.c003e1718** 发布。本次更新修复了 CLI 洞察功能中时间统计未能统一使用本地时间的问题，并对 autofix 进行了重构。
*   **dsw-manual-poc-20260727-2 / 1** 基准测试预发布。最新非生产环境基准测试已完成，基于 `swe-bench/swe-bench-verified@2` 数据集的 500 个任务中成功解决 376 个（目前状态为 QUARANTINED 隔离审核中）。

---

## 3. 社区热点 Issues (Top 10)

1.  **[P1/安全] MCP 工具拒绝授权被绕过** — [ #7769 ](https://github.com/QwenLM/qwen-code/issues/7769)
    *   **关注点**：高危安全漏洞。当用户在 Qwen Desktop 显式拒绝某 MCP 工具调用时，如果 Agent 发起了新的 SSE 会话，它可以在新会话中绕过拒绝限制继续重试。这对生产环境的权限管控构成重大隐患。
2.  **[P1/安全] Desktop IPC 桥接缺乏授权校验** — [ #7768 ](https://github.com/QwenLM/qwen-code/issues/7768)
    *   **关注点**：高危安全漏洞。渲染进程暴露的 `mcp_client_tool_call` 特权 IPC 方法在调用 MCP 服务器时，未强制执行用户授权检查，可能导致越权执行。
3.  **[P2/核心] 配额耗尽 429 错误静默重试** — [ # #7841 ](https://github.com/QwenLM/qwen-code/issues/7841)
    *   **关注点**：核心体验痛点。当 API 返回带有重置时间的“配额永久耗尽（429）”时，系统将其误判为瞬时限流并静默重试，导致用户卡死且无任何错误提示。
4.  **[P1/核心] YOLO 模式生成大代码块必崩** — [ #7832 ](https://github.com/QwenLM/qwen-code/issues/7832)
    *   **关注点**：高频 Bug。在无交互（headless）YOLO 模式下生成 500+ 行代码时，因 DashScope 网关在 3-5 分钟后断开 TCP 连接，导致生成流强制终止且不重试。
5.  **[P2/核心] 长上下文（>150k）频繁 ECONNRESET** — [ #7831 ](https://github.com/QwenLM/qwen-code/issues/7831)
    *   **关注点**：长上下文稳定性。当会话上下文超过 15 万 Token 后，API 调用频繁报错 `TypeError: ECONNRESET`，严重影响长会话开发体验。
6.  **[P2/安全] 代码解释器沙箱逃逸** — [ #7770 ](https://github.com/QwenLM/qwen-code/issues/7770)
    *   **关注点**：沙箱隔离机制存在缺陷，若用户的 MCP 代理暴露在公网，隔离环境内的代码执行可能反向写入宿主机。
7.  **[P2/核心] 技能上下文生命周期管理缺失** — [ #6762 ](https://github.com/QwenLM/qwen-code/issues/6762)
    *   **关注点**：架构优化需求。`SKILL.md` 内容作为工具结果载入后会永久驻留在对话历史中，无法卸载或压缩，快速消耗 Token 配额。
8.  **[P2/核心] 子代理提问无出口** — [ #7835 ](https://github.com/QwenLM/qwen-code/issues/7835)
    *   **关注点**：Agent 交互阻塞性 Bug。子代理在运行中向用户发起提问，但主代理未收集和转发该问题，导致用户无输入途径，子代理陷入永久等待。
9.  **[P2/MCP] `--safe-mode` 过度清空 MCP 配置** — [ #7819 ](https://github.com/QwenLM/qwen-code/issues/7819)
    *   **关注点**：在 ACP 驱动下，`--safe-mode` 除了清空本地配置，也静默丢弃了客户端合法传入的 `mcpServers`，导致 MCP 工具链失效。
10. **[Bug/CI] 主干分支 E2E 测试大面积失败** — [ #7755 ](https://github.com/QwenLM/qwen-code/issues/7755) 等
    *   **关注点**：过去 24 小时内，由 Bot 自动触发了近 10 条 E2E 测试失败的 Issue（如 #7860, #7787 等），表明近期代码提交导致测试环境存在不稳定或回归问题。

---

## 4. 重要 PR 进展 (Top 10)

1.  **[核心修复] 优雅处理配额耗尽的 429 状态码** — [ #7842 ](https://github.com/QwenLM/qwen-code/pull/7842)
    *   **进展**：针对 Issue #7841，现在能够识别带有重置时间的 429 错误，并在首次尝试时直接快速失败，向用户抛出友好提示，而非无脑静默重试。
2.  **[核心功能] 支持专属上下文压缩模型 (`/model --compaction`)** — [ #7818 ](https://github.com/QwenLM/qwen-code/pull/7818)
    *   **进展**：新增 `--compaction` 标志，允许用户专门指定一个用于会话自动压缩的模型（支持 compactionModel → fastModel → main 的三级回退链），极大优化 Token 利用率。
3.  **[安全修复] 修复 `--safe-mode` 丢弃合法 MCP 配置** — [ #7827 ](https://github.com/QwenLM/qwen-code/pull/7827)
    *   **进展**：修复了安全模式下对 MCP 的“一刀切”拦截，现在将安全保留调用方通过 ACP 传入的顶层 `mcpServers` 配置。
4.  **[Web Shell/交互] 集成原生 Live Voice 功能** — [ #7859 ](https://github.com/QwenLM/qwen-code/pull/7859)
    *   **进展**：为 macOS Web Shell 引入系统级原生语音体验，用户可通过双击 Command 键从任意应用唤醒无项目上下文的语音对话。
5.  **[Web Shell/Git] 添加 Git 分支选择器与 PR 工作流** — [ #7731 ](https://github.com/QwenLM/qwen-code/pull/7731)
    *   **进展**：在 Web Shell 引入 IntelliJ 风格的 Git 分支弹窗，支持搜索过滤（本地/远程/Tag）、快速检出以及可视化的创建 PR 流程。
6.  **[多模态修复] 为纯文本模型桥接工具结果中的图片** — [ #7484 ](https://github.com/QwenLM/qwen-code/pull/7484)
    *   **进展**：解决了纯文本主模型无法理解工具执行结果（如截图、图表）的问题，现在会将内置或 MCP 工具产生的图片结果统一路由处理，提升多模态容错。
7.  **[集成扩展] 新增 GitLab 轮询通道适配器** — [ #7862 ](https://github.com/QwenLM/qwen-code/pull/7862)
    *   **进展**：除了 GitHub，Qwen Code 现在支持监控和分发 GitLab 的 Todos 与消息，进一步扩展了平台生态集成。
8.  **[集成优化] GitHub 通知按触发原因分发** — [ #7826 ](https://github.com/QwenLM/qwen-code/pull/7826)
    *   **进展**：GitHub 适配器不再将所有通知视为普通评论，而是能够精准识别 `@mentions`（提及）、`review requests`（代码审查请求）等具体事件并执行相应动作。
9.

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*