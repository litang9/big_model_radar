# AI CLI 工具社区动态日报 2026-09-30

> 生成时间: 2026-09-29 23:41 UTC | 覆盖工具: 7 个

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

**数据日期：2026-09-30**

---

## 一、生态全景

AI CLI 工具已从单纯的“终端对话助手”演进为覆盖桌面端、SDK、托管运行时、多云集成的完整开发工具平台。当前生态呈现三个显著特征：**企业级安全治理成为官方发力主线**（Claude Code sec-default 系列、Copilot 最小权限授权、Qwen Hosted 工具审批）；**Windows 平台与国际化体验是普遍短板**（Codex 控制台闪烁、Gemini CJK 输入法、CRLF 处理）；**多智能体架构进入深水区**（Codex multi-agent V2、Gemini Subagent、Qwen Managed Agent、OpenCode 子代理），可靠性与进程生命周期管理成为新瓶颈。

---

## 二、各工具活跃度对比

| 工具 | 今日热点 Issues | 重要 PR | Release | 今日核心事件 |
|------|----------------|---------|---------|-------------|
| **Claude Code** | 10（含 841👍 的 #18435） | 10（6 已合并） | v2.1.285 | sec-default 安全 PR 密集落地 |
| **Codex** | 10+（#48074 达 116 评论/138👍） | 12+ | 0.159.1 稳定版 + 多 alpha | GPT-6.1 Sol 设为默认模型；Windows 闪烁修复回移植 |
| **Gemini CLI** | 10+ | 10+（P1 修复为主） | v0.62.0 稳定 + v0.63 preview/nightly | 认证死循环修复；Subagent 可靠性争议 |
| **Copilot CLI** | 10 | 1（PR 更新平淡） | **5 个补丁版本**（v1.0.90-1~5） | MCP 稳定性专项修复 + `--mcp-github-auth` |
| **Qwen Code** | 10+ | 10 | v0.24.7 全家桶（CLI/Desktop/SDK） | Managed Agent 双路径架构讨论（37 评论） |
| **OpenCode** | 10 | 10（4 已合入） | 无发布 | 内存 Megathread（147 评论/112👍）+ DB 膨胀 13GB |
| **Kimi Code CLI** | 0 | 0 | 无 | 过去 24 小时无活动 |

**观察**：Claude Code 与 Codex 的头部 Issue 关注度（百赞级）显著领先；Copilot 呈“小步快跑”式高频补丁发布；OpenCode 社区讨论热度高但发布停滞；Qwen 处于架构重构期的活跃设计讨论阶段。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|------|---------|---------|
| **用量统计准确性 / 计费透明** | Claude Code（#91775 token 虚高 2 倍）、Codex（#49322 双重计算）、Gemini（PR #29549 计费高估 3 倍）、OpenCode（#51424 误报余额不足） | **全行业共同痛点**：所有工具均存在计量口径错误，付费用户信任危机 |
| **Token / 上下文成本治理** | Qwen（#12028 非对话上下文治理）、OpenCode（缓存断点、压缩时机）、Gemini（AST 精准读取 #22745、#19561） | 系统提示词 + 工具 schema 的隐性成本被“静默放大”，缓存策略与精准读取成优化焦点 |
| **Windows 平台稳定性** | Codex（闪烁 #48074、启动竞态簇）、Claude Code（MSIX 更新失败 #89599）、Gemini（ConPTY/IME/CRLF 三连修）、Qwen（Ctrl 键 C0 字节 #13068） | Windows 是所有工具的 QA 债务重灾区 |
| **MCP 生态兼容性** | Copilot（点号命名、`-32601` 误判、密钥传递）、Codex（#11765 服务器管理 UX，52👍）、Gemini（工具数 128 上限 #24246）、Qwen（Mem0 via MCP） | MCP 已成事实标准，但规范合规度与连接可靠性参差不齐 |
| **数据完整性与故障恢复** | Claude Code（`git reset --hard` 无确认 #84660）、Gemini（state.json 原子写入）、Copilot（lock 文件永不回收 #4805）、OpenCode（event 表无清理 13GB） | 崩溃不丢数据、异常路径资源清理是工程基础能力短板 |
| **企业安全与权限管控** | Claude Code（sec-default 全套）、Copilot（会话级只读授权）、Gemini（破坏性命令劝阻 #22672）、Qwen（Hosted 工具审批） | 组织级 deny 优先、最小权限、审计能力成为标配需求 |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|---------|---------|---------|
| **Claude Code** | 企业安全治理、插件生态管控、桌面端融合 | 企业开发团队、组织管理员 | Node.js + 插件体系，正向“组织管控 + 个人扩展”双层权限模型演进 |
| **Codex** | 新模型快速集成（GPT-6.1 Sol 默认化）、多云（Bedrock）、移动端 Remote | OpenAI 订阅付费用户、企业多云场景 | Rust 核心，模型能力驱动的快速迭代 |
| **Gemini CLI** | Agent 可观测性、AST 感知代码工具、headless/CI 场景 | 自动化流水线用户、重度 agent 用户 | TypeScript，工程基础补齐阶段（原子写入、增量记录） |
| **Copilot CLI** | MCP 兼容性、GitHub 生态深度绑定、组织级 Agent 分发 | GitHub 原生用户、企业现有 Copilot 订阅者 | 与 VS Code 生态共享后端，强调跨客户端一致性 |
| **Qwen Code** | Managed Agent 托管运行时、记忆系统（Mem0）、多语言一致性 | 托管环境用户、SDK 集成方、国内开发者 | TS + Java 双栈控制面，最激进的架构重构（Session 持久所有权、Runtime Broker） |
| **OpenCode** | 多 Provider 路由、成本优化、开源定制 | 自托管、多模型混用的成本敏感用户 | Bun/TS 单体，v2 数据层问题暴露架构债 |

---

## 五、社区热度与成熟度

**成熟度梯队**：

- **第一梯队（成熟 + 高活跃）**：**Claude Code**、**Codex** —— 百赞级 Issue、系统性 PR 治理、明确的版本节奏；Claude Code 企业化最深，Codex 用户增长带来的 Windows 债务最重
- **第二梯队（快速迭代期）**：**Gemini CLI**、**Qwen Code** —— P1 修复密集，处于“补工程基础 / 重构架构”阶段；Qwen 的方向性讨论（37 评论的架构提案）显示仍在探索期
- **第三梯队（补丁驱动）**：**Copilot CLI** —— 单日 5 版补丁显示响应积极，但 PR 更新平淡、#1274 拖延 8 个月，核心链路可靠性存疑
- **关注风险**：**OpenCode** —— 社区讨论热度最高（147 评论 Megathread），但无版本发布 + 批量关闭社区贡献 PR + v2 数据层缺陷，项目健康度信号偏负面
- **静默**：**Kimi Code CLI** —— 无活动，生态参与度待观察

---

## 六、值得关注的趋势信号

1. **“计量准确性”是下一个信任战场**。四个工具同日暴露用量统计错误（2~3 倍高估），说明 agent 工作流的多轮工具调用使计量远比传统 API 调用复杂。**参考价值**：选用工具时应验证其用量数据与账单的可对账性，团队采购前做实际计量校验。

2. **安全默认值从“用户自治”转向“组织管控”**。Claude Code 的 deny 优先于插件 allow、系统提示词分区防护，与 Copilot 的 `--mcp-github-auth` 殊途同归。**参考价值**：企业选型时应关注工具是否支持组织级策略覆盖个人配置、插件越权防护。

3. **上下文成本优化的两条路线正在成形**：一是“少读精读”（Gemini 的 AST 感知、surgical reads），二是“缓存与准入”（Qwen 的压缩请求准入防护、OpenCode 的缓存断点）。**参考价值**：长上下文模型时代，非对话 token（系统提示词 + 工具 schema）可能占总成本大头，选型时评估工具的缓存保留能力。

4. **插件/MCP 生态的“规范合规度”成为隐性风险**。Copilot 的点号命名、`-32601` 误判等问题表明“能连”不等于“连得对”。**参考价值**：依赖 MCP 重度集成前，建议对目标 CLI 做 MCP 规范符合性冒烟测试。

5. **托管/多智能体架构带来新的故障模式**。Qwen 的 Broker 死锁（prepared 却永不执行）、Gemini 的 Subagent 误报成功、Codex 的 multi-agent V2，都指向分布式生命周期管理的复杂性。**参考价值**：在生产环境采用 agent 编排能力前，重点考察进程清理、信号处理、会话恢复等基础工程能力——这往往是头部工具与追赶者的真正差距。

6. **Windows 是不可回避的测试盲区**。四款工具同日修复 Windows 相关问题。**参考价值**：团队若以 Windows 为主要开发平台，应将平台稳定性（而非功能丰富度）作为选型首要权重。

---

*报告基于各仓库 2026-09-30 公开动态自动汇总分析，仅供技术选型参考。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> **数据说明**：本报告基于所提供的仓库快照数据（PR 50 条、Issues 50 条，截至 2026-09-30）生成。需要指出：所给 PR 的评论数与 👍 数均为 undefined/0，无法严格按“关注度”排序，以下排序基于 PR 的更新活跃度、关联 Issue 讨论热度及主题代表性综合判断；且原始数据来源与真实性无法独立核实，结论仅供分析参考。

---

## 一、热门 Skills 排行（PR）

| # | Skill / PR | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **skill-creator 修复系列** — [#1298](https://github.com/anthropics/skills/pull/1298) | 修复触发评估误报、Windows 兼容、运行时失败误判。关联 Issue [#1383](https://github.com/anthropics/skills/issues/1383)、[#202](https://github.com/anthropics/skills/issues/202)：skill-creator 是社区审计最密集的“元 Skill”，被批评文档化而非操作化 | OPEN |
| 2 | **mcp-builder 修复** — [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 mcp>=2 的 `streamable_http_client` 重命名与自定义 Header；呼应 Issue [#1390](https://github.com/anthropics/skills/issues/1390)（评估脚本对真实 MCP server 得 0 分） | OPEN |
| 3 | **docx/PDF 文档技能修复群** — [#541](https://github.com/anthropics/skills/pull/541)、[#1792](https://github.com/anthropics/skills/pull/1792)、[#538](https://github.com/anthropics/skills/pull/538)、[#1734](https://github.com/anthropics/skills/pull/1734) | OOXML `w:id` 冲突导致文档损坏、LibreOffice 超时误报成功、大小写敏感路径、孤立批注检测——office 类 Skill 是 bug 修复最活跃板块 | OPEN |
| 4 | **md2video-audio** — [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown → Marp 幻灯 → 带真人配音的 MP4，零成本内容视频化，9 月更新活跃 | OPEN |
| 5 | **proofcore-contract-auditor** — [#1771](https://github.com/anthropics/skills/pull/1771) | Solidity/Rust 合约静态分析 + TON 链上审计存证，Web3 方向代表（但带商业项目推广色彩，需注意与 Issue #492 的命名空间信任问题） | OPEN |
| 6 | **AWT (AI Watch Tester)** — [#822](https://github.com/anthropics/skills/pull/822) | 零代码视觉 E2E 测试，3 月提交持续讨论至 9 月，测试自动化方向的长青 PR | OPEN |
| 7 | **blast-radius** — [#1776](https://github.com/anthropics/skills/pull/1776) | 批量/破坏性写操作前的“爆炸半径”检查清单，安全治理方向 | OPEN |
| 8 | **pyxel 复古游戏开发** — [#525](https://github.com/anthropics/skills/pull/525) | 包含 headless 运行与帧检验的游戏开发 Skill，半年持续更新 | OPEN |

---

## 二、社区需求趋势（来自 Issues）

1. **安全与信任边界**（最热，43 评论）：[#492](https://github.com/anthropics/skills/issues/492) 社区 Skill 冒用 `anthropic/` 命名空间；配套诉求见 XSS [#1394](https://github.com/anthropics/skills/issues/1394)、SharePoint 权限设计 [#1175](https://github.com/anthropics/skills/issues/1175)。
2. **组织级分发与共享**：[#228](https://github.com/anthropics/skills/issues/228) 请求组织内 Skill 库/共享链接，替代手动上传 .skill 文件。
3. **Skill 可评估性/触发可靠性**：[#556](https://github.com/anthropics/skills/issues/556)（`claude -p` 触发率 0%）、[#1383](https://github.com/anthropics/skills/issues/1383)、[#1390](https://github.com/anthropics/skills/issues/1390) —— 触发评估与质量基准是头号工程痛点。
4. **上下文效率**：[#1487](https://github.com/anthropics/skills/issues/1487) claude-api Skill 一次性注入 ~156k tokens 打爆上下文；[#1329](https://github.com/anthropics/skills/issues/1329) compact-memory 提案（符号化压缩 agent 状态）。
5. **AI 输出质量与治理**：[#1385](https://github.com/anthropics/skills/issues/1385) 推理质量门禁流水线、[#412](https://github.com/anthropics/skills/issues/412) agent-governance。
6. **平台兼容与部署**：[#29](https://github.com/anthropics/skills/issues/29)（Bedrock 支持）、Windows 兼容问题反复出现。
7. **新 Skill 方向提案**：测试模式库（#723）、HPC/Slurm 运维（#1615）、ODT 开放文档（#486）、文档排版质检（#514）、Notion 规格转任务（#1245）。

---

## 三、高潜力待合并 Skills（活跃 OPEN，近期可能落地）

- [#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder mcp>=2 兼容修复 — 修复明确、有对应 Issue #1668，月底仍在更新
- [#1792](https://github.com/anthropics/skills/pull/1792) docx 超时错误修复 — 小而准的正确性修复
- [#1607](https://github.com/anthropics/skills/pull/1607) claude-api 模型退役状态更新 — 低风险、直接呼应 #1487/#1603
- [#1681](https://github.com/anthropics/skills/pull/1681) skill-creator package_skill.py 直接执行修复
- [#1298](https://github.com/anthropics/skills/pull/1298) skill-creator 触发评估隔离与 Windows 修复 — 若合并将缓解 #1383/#556 两大痛点

---

## 四、生态洞察（一句话总结）

**社区最集中的诉求不是“更多 Skill”，而是让现有 Skill 生态变得可信（命名空间与安全治理）、可分发（组织级共享）且可度量（触发评估、上下文效率与质量基准）——即从“数量扩张”转向“工程化治理”。**

---

# Claude Code 社区动态日报 · 2026-09-30

## 一、今日速览

Claude Code 发布 **v2.1.285**，新增 `--desktop` 启动桌面端、`plugin configure` 命令及 WebFetch 开关环境变量。安全成为今日主线：官方密集合并多个安全默认值（sec-default）相关 PR，强化组织级权限管控。社区端，多账户管理需求（841 👍）持续高热，Windows 桌面端静默更新导致应用无法启动的 bug 引发较多讨论。

---

## 二、版本发布

### v2.1.285
- 新增环境变量 `CLAUDE_CODE_DISABLE_WEB_FETCH`，可完全关闭 WebFetch 工具（利于受控环境的安全管控）
- 新增 `claude --desktop` 命令，可直接在当前目录打开 Claude 桌面端，并支持 `--continue` / `--resume <id>` 恢复会话
- 新增 `claude plugin configure <plugin>` 命令，用于查看/配置插件

---

## 三、社区热点 Issues

1. **[#18435](https://github.com/anthropics/claude-code/issues/18435)** — 桌面端多账户管理与快速切换（841 👍 / 198 评论）。社区呼声最高的功能，工作/个人账户隔离是刚需，持续半年仍是热点。

2. **[#89599](https://github.com/anthropics/claude-code/issues/89599)** — Windows MSIX 静默更新后应用无法启动（13 评论）。后台更新退出主进程但子进程存活，注册失败 0x80073D02，需手动杀进程，是 refile 的二次提交，Windows 用户痛点明显。

3. **[#98145](https://github.com/anthropics/claude-code/issues/98145)** — 韩语输出在工具调用中间提示中反复回退为英语（11 评论）。反映语言指令在长会话/工具链路中的持久性不足，对非英语用户具有普遍意义。

4. **[#66373](https://github.com/anthropics/claude-code/issues/66373)** — 请求本地会话移交云端（`--teleport` 的反向操作，12 👍）。多设备/移动办公场景的真实需求。

5. **[#95566](https://github.com/anthropics/claude-code/issues/95566)** — 原生二进制在 kvm64 CPU（无 SSE4/POPCNT）虚拟机上 100% CPU 静默挂死。glibc/musl 双构建均复现，社区呼吁安装前做 CPU 特性预检，影响老虚拟化环境用户。

6. **[#91775](https://github.com/anthropics/claude-code/issues/91775)** — `/usage` 统计按 transcript 行而非 message.id 计数，token 总量虚高约 2 倍。直接影响用户对成本的判断，值得关注。

7. **[#84660](https://github.com/anthropics/claude-code/issues/84660)** — 未经确认执行 `git reset --hard` 导致不可逆数据丢失。权限安全类高危反馈，与近期 sec-default 强化方向呼应。

8. **[#91680](https://github.com/anthropics/claude-code/issues/91680)** — Cowork 沙箱 `/sessions` 目录不回收，4 个月堆积 1,634 个目录占满磁盘，计划任务全部在 `useradd` 处失败。资源泄漏类问题，运维场景影响大。

9. **[#98211](https://github.com/anthropics/claude-code/issues/98211)** — 安全过滤对合法网络安全研究产生误判。安全策略与科研可用性之间的平衡问题。

10. **[#78147](https://github.com/anthropics/claude-code/issues/78147)**（已关闭）— 持久化任务列表中的已完成任务被静默 GC 删除。数据丢失类，文档与实现不一致。

> 注：今日有多条 7 月旧 issue 被 stale 机器人批量关闭，属常规清理，未列入热点。

---

## 四、重要 PR 进展

1. **[#98080](https://github.com/anthropics/claude-code/pull/98080)**（已合并）— sec-default：settings 中的 deny 规则优先于用户安装插件的 allow/ask。堵住插件越权放开权限的口子。

2. **[#98083](https://github.com/anthropics/claude-code/pull/98083)**（已合并）— 新增托管选项 `allowManagedModsOnly`，组织可只允许自有 mods、拒绝个人安装的插件。企业管控能力补齐。

3. **[#97241](https://github.com/anthropics/claude-code/pull/97241)**（已合并）— sec-default：系统提示词分区的组装越过用户层插件，插件不再能塑造组织用户的系统提示词。

4. **[#97334](https://github.com/anthropics/claude-code/pull/97334)**（开放）— sec-default：会话保留的行越过用户层。与引擎 `session.append` 有合并顺序依赖，测试项按预期为红。

5. **[#98018](https://github.com/anthropics/claude-code/pull/98018)**（已合并）— 回滚两个 mods 变更（agents-md 截断读取、diff 强制颜色），恢复旧行为，体现官方对 mods 稳定性的谨慎态度。

6. **[#98275](https://github.com/anthropics/claude-code/pull/98275)**（开放）— AGENTS.md 加载提示行改为仅输出到 debug log，避免污染正常 transcript。

7. **[#96434](https://github.com/anthropics/claude-code/pull/96434)**（开放）— security-guidance：阻止 reviewer 将被 deny 或涉密的文件（如 `secrets.yaml`）带入模型上下文。修复 #96276，安全价值高。

8. **[#97952](https://github.com/anthropics/claude-code/pull/97952)**（开放）— 对调用 Claude 的 GitHub Actions 工作流做安全加固，包括 egress 防火墙 runner。社区贡献的安全治理范例。

9. **[#97293](https://github.com/anthropics/claude-code/pull/97293)**（开放）— mods 类型声明新增 `process.run` 截断标志（`isStdoutTruncated` 等）与 `fs.list` 的 `mtimeMs`，待 npm CLI 版本就绪后启用。

10. **[#94847](https://github.com/anthropics/claude-code/pull/94847)**（开放）— diff 面板仅在确有可列文件时才自动展开，修复对仓库外/ignored 文件写入时弹出空面板的问题。

---

## 五、功能需求趋势

- **账户与身份管理**：多账户切换（#18435）+ 本地↔云端会话移交（#66373），反映多环境无缝协作是第一大诉求
- **企业安全与治理**：sec-default 系列 PR 密集落地（deny 优先、mods 白名单、系统提示词管控），组织级管控是官方当前发力点
- **桌面端体验**：`--desktop` 新命令、静默更新可靠性、会话持久化，桌面端仍是 bug 与需求集中区
- **成本透明度**：token 统计准确性（#91775）需求上升
- **国际化/语言一致性**：非英语输出的持久性（#98145）
- **环境兼容性**：老旧 CPU/VM、WSL2、网络驱动器等长尾环境支持

---

## 六、开发者关注点

1. **数据安全焦虑**：`git reset --hard` 无确认执行（#84660）、任务静默删除（#78147）等数据丢失事件是社区最敏感的信任问题
2. **权限边界**：插件能否覆盖用户/组织权限规则是近期安全讨论核心，官方已通过多个 PR 回应
3. **资源泄漏与稳定性**：沙箱会话目录不回收（#91680）、孤儿进程（#80230）等问题对长期运行的服务器场景影响较大
4. **更新可靠性**：Windows MSIX 静默更新失败（#89599）表明自动更新机制在特定平台仍有硬伤
5. **成本可观测性**：统计口径错误导致用量虚高 2 倍，开发者需要可信的账单对账依据

---

*数据截至 2026-09-30，来源：github.com/anthropics/claude-code 公开动态。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-09-30** | 数据来源：github.com/openai/codex

---

## 一、今日速览

Codex 今日发布 **0.159.1 稳定版**，最大亮点是将 **GPT-6.1 Sol 设为默认模型**（含 Amazon Bedrock Mantle/Runtime 目录），但社区随即反馈 Sol 6.1 在部分客户端不可见（[#49362](https://github.com/openai/codex/issues/49362)）。同时，团队密集回移植 **Windows 控制台窗口闪烁修复**（#48074，116 条评论的最热 Issue），准备发布 0.159.2 和 0.160.0-alpha.6 修复版。Windows 桌面端启动卡 Loading、渲染器崩溃等问题持续发酵，成为当前最大痛点。

---

## 二、版本发布

### rust-v0.159.1（稳定版）
- **新功能**：GPT-6.1 Sol 成为内置目录及 Amazon Bedrock Mantle/Runtime 目录的默认模型（#49323、#49342）
- [完整 Changelog](https://github.com/openai/codex/compare/rust-v0.159.0...rust-v0.159.1)

### rust-v0.159.0（前一日发布，今日社区消化中）
- 实验性 `instant_interrupt`：允许在模型响应或长时间 code-mode 调用期间用新输入转向 Codex
- 新会话采用精简欢迎界面与统一头部格式，回合中/后偶发提示小技巧

### Alpha 版本
- rust-v0.161.0-alpha.2 / alpha.1、rust-v0.160.0-alpha.6 / alpha.3 持续迭代中

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 关注度 | 为什么重要 |
|---|-------|--------|-----------|
| 1 | [#48074](https://github.com/openai/codex/issues/48074) Windows 终端窗口随 daemon 请求反复闪烁 | 💬116 👍138 | 全库最热 Issue，影响所有 Windows CLI 用户；修复已回移植至 0.159.2 / 0.160-alpha.6，社区高度关注落地进度 |
| 2 | [#49264](https://github.com/openai/codex/issues/49264) 0.159.0 回归：CLI 每条命令都弹出 Windows Terminal 窗口 | 💬6 👍4 | #48074 的回归确认，锁定问题引入时间点（~09-28 更新），对修复验证关键 |
| 3 | [#49362](https://github.com/openai/codex/issues/49362) Sol 6.1 未在 Codex 中出现 | 💬5 👍6 | 新默认模型发布首日即出现可见性问题，Pro 200 用户无法选用，直接影响 0.159.1 核心卖点 |
| 4 | [#48466](https://github.com/openai/codex/issues/48466) Windows 26.924 每次冷启动卡 Loading | 💬13 | 高频启动故障，需手动重启 app-server 才能恢复 UI |
| 5 | [#48938](https://github.com/openai/codex/issues/48938) Windows 26.924 渲染器反复崩溃 + 严重输入延迟 | 💬6 | Pro 20x 付费用户强烈不满，涉及付费额度浪费，舆情风险高 |
| 6 | [#48946](https://github.com/openai/codex/issues/48946) 启动转圈不止，修复/重装均无效 | 💬7 | 与 #48466、#49237、#49240 构成 Windows 启动握手竞态问题簇 |
| 7 | [#48777](https://github.com/openai/codex/issues/48777) Android Codex Remote 授权后循环回到"授权此手机" | 💬6 | Remote 配对链路断裂，阻塞移动端使用场景 |
| 8 | [#11765](https://github.com/openai/codex/issues/11765) MCP 服务器管理 UX 需求 | 💬9 👍52 | 高赞老牌需求：希望 UI 内启用/禁用 MCP 服务器，而非只依赖版本库中的 config.toml |
| 9 | [#48320](https://github.com/openai/codex/issues/48320) 项目聊天泄漏到全局 Recents（macOS/Win11） | 💬4 | 09-25 桌面更新引入的会话组织回归，衍生出 #48742、#49128 等多个相关反馈 |
| 10 | [#49322](https://github.com/openai/codex/issues/49322) / [#49349](https://github.com/openai/codex/issues/49349) 用量统计双重计算 / 剩余额度跳变 | 💬3+3 | 付费用户对用量仪表盘数据不一致的信任危机，#49349 已关闭 |

---

## 四、重要 PR 进展（Top 10）

1. **[#49385](https://github.com/openai/codex/pull/49385)** — 回移植 Windows 控制台闪烁抑制修复至 **0.159.2**（#49164 + #49308），针对最热 Issue #48074 的稳定版修复
2. **[#49386](https://github.com/openai/codex/pull/49386)** — 将剩余 Windows 控制台修复回移植到冻结的 0.160.0-alpha.6
3. **[#49339](https://github.com/openai/codex/pull/49339)** / **[#49342](https://github.com/openai/codex/pull/49342)** — 将 GPT-6.1 Sol 加入 Bedrock 目录并设为默认（含 `global.` / `us.` 变体），后者回移植至 0.159.1
4. **[#49345](https://github.com/openai/codex/pull/49345)** — 在 Amazon Bedrock 上启用 **multi-agent V2 与 Ultra 推理等级**，模型可按目录声明使用 V2
5. **[#49353](https://github.com/openai/codex/pull/49353)** — 批准的文件系统升级（escalation）不再被 denied-read 策略锁死，修复 Git 元数据更新类操作
6. **[#49301 系列 #49360](https://github.com/openai/codex/pull/49360)** — 通过 `ShellInvocation` 携带 shell 及登录模式元数据，改进 shell 快照与凭证代理
7. **[#49357](https://github.com/openai/codex/pull/49357)** — TUI 粘贴多行文本时延续 Markdown 引用块前缀，编辑体验细节改进
8. **[#49395](https://github.com/openai/codex/pull/49395)** — 移除 TUI 随机问候语，会话头部统一为 `model:` / `directory:` 字段（配合 0.159.0 新欢迎界面的迭代）
9. **[#49332](https://github.com/openai/codex/pull/49332)** — 使用 `PendingRequestGuard` 即时清理被取消的 exec-server RPC 请求，避免悬挂条目
10. **[#49403](https://github.com/openai/codex/pull/49403)** — 新增实验性开关：login shell 中的捆绑工具（`login_shell_package_path`），默认关闭

其他值得关注：[#49384](https://github.com/openai/codex/pull/49384)（凭证存储结果追踪 + 敏感错误脱敏）、[#49379](https://github.com/openai/codex/pull/49379)（hook 正则匹配器预编译优化）、[#49389](https://github.com/openai/codex/pull/49389)（序列化共享 Windows sandbox 账号的测试，修复并发密码轮换竞态）。

---

## 五、功能需求趋势

1. **Windows 平台稳定性**（最强信号）：今日约半数热 Issue 与 Windows 相关——控制台闪烁、启动卡死、渲染器崩溃、WSL2 沙箱、路径推断。团队已在测试与回移植层面密集响应。
2. **新模型支持与可见性**：GPT-6.1 Sol 默认化 + Bedrock multi-agent V2 / Ultra 推理，企业多云（Bedrock）集成是明确方向。
3. **MCP 体验完善**：服务器启停管理 UX（#11765，👍52）、callId 暴露（#21044）、OAuth 凭证存储遥测（PR #49392）——MCP 生态管理是长期需求。
4. **会话/项目组织**：项目聊天与全局 Recents 的边界（#48320、#49128），桌面端信息架构调整引发连锁反馈。
5. **Remote / 移动端配对**：Android 授权循环（#48777）、Remote 流序列中断（#32241）、移动端项目缺失（#27272）。
6. **用量透明度**：用量双倍统计、额度百分比跳变，付费用户对计量准确性的诉求上升。

---

## 六、开发者关注点

- **Windows 用户体验是当前最大债务**：#48074 已积累 116 条评论/138 赞，且 0.159.0 出现回归（#49264）。0.159.2 与 0.160.0-alpha.6 修复版的发布时间是社区最期待的节点。
- **付费用户的容忍度在下降**：多个 Pro/20x 订阅用户在 Issue 中表达对付费期间服务不可用的强烈不满（#48938、#48393 的 429 错误）。
- **桌面 App 启动握手竞态**是系统性问题：#48466、#48946、#49237、#49240 症状一致（app-server 就绪但 UI 卡 Loading），需架构级修复而非个案处理。
- **企业协作配置诉求**：团队希望 MCP 等配置可被版本管理的同时支持个人级覆盖/启停。
- **文档与实际行为一致性**：凭证存储实际使用 keyring 而文档仍称 `auth.json`（PR #49361 已修正），提示团队在推进安全存储改造。

---
*本日报基于 GitHub 公开数据自动汇总，仅供参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报

**日期：2026-09-30** | 数据来源：google-gemini/gemini-cli

---

## 📌 今日速览

Gemini CLI 今日发布 **v0.62.0 稳定版**及 v0.63.0 preview/nightly，重点修复认证死循环与连接恢复体验。社区讨论焦点集中在 **Subagent 可靠性**（挂起、误报成功、上下文丢失）与 **Windows/中文输入体验**。PR 方面，状态持久化原子写入、headless 模式 CPU 卡死修复等多个 P1 级修复同步推进。

---

## 🚀 版本发布

### v0.62.0（稳定版）
- fix(a2a-server): tasks metadata 端点对不支持的 store 增加提前返回 ([#29334](https://github.com/google-gemini/gemini-cli/pull/29334))

### v0.63.0-preview.0
- fix(cli): 连接恢复期间显示重试进度指示器 ([#29468](https://github.com/google-gemini/gemini-cli/pull/29468))

### v0.63.0-nightly.20260929
- fix(auth): 修复文件争用、headless keyring 和 supervisor 状态丢失导致的**无限认证循环** ([#29448](https://github.com/google-gemini/gemini-cli/pull/29448))——对 CI/headless 场景用户是重要修复

---

## 🔥 社区热点 Issues（Top 10）

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** Subagent 达到 MAX_TURNS 后误报 `success/GOAL`，掩盖真实中断 — P1，13 条评论，直接影响任务结果可信度，是 agent 可观测性的核心痛点。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** Generalist agent 无限挂起 — P1，8 👍，连创建文件夹这类简单操作也会挂起一小时，用户体验严重受损。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** 零依赖 OS 沙箱 + 执行后意图路由，释放模型的 bash 原生能力 — 社区提出了架构级方案讨论，涉及安全与能力取舍。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** AST 感知的文件读取/搜索/代码库映射 EPIC — 官方发起的方向性调研（含 ast-grep、tilth 等工具评估），可能显著改变 agent 的代码探索方式。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** 模型几乎不主动使用自定义 skills 和 sub-agents — 反映 agent 调度/路由策略的普遍问题。

6. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** Browser subagent 在 Wayland 下失败 — P1，Linux 桌面用户受阻。

7. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** 工具数超过 128 触发 400 错误 — MCP 重度用户的硬性上限问题。

8. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** get-shit-done output hook 导致 CLI 崩溃 — P1。

9. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** Browser Agent 完全忽略 settings.json 配置覆盖（如 maxTurns）— AgentRegistry 读取了配置但未生效。

10. **[#22186 / #22672](https://github.com/google-gemini/gemini-cli/issues/22672)** Agent 应阻止/劝阻破坏性操作（`git reset --force` 等）— 安全性需求，运维场景用户重点关注。

> 其他值得留意：[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)（subagent 轨迹通过 `/chat share` 可见）、[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)（"Tactful Extraction" 节省 token 的外科手术式读取）。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#29558](https://github.com/google-gemini/gemini-cli/pull/29558)** (P1) 状态持久化原子写入：临时文件 + fsync + 原子重命名，损坏时自动从 `.bak` 恢复 — 根治 `state.json` 损坏丢状态问题。

2. **[#29557](https://github.com/google-gemini/gemini-cli/pull/29557)** (P1) 修复 headless 模式（`-p` + 管道 stdin）下代码含 `@scope/pkg` 时 100% CPU 不可中断卡死，并防范 ReDoS。

3. **[#29568](https://github.com/google-gemini/gemini-cli/pull/29568)** (P1) ChatRecordingService 改为 append-only 增量补丁 + 有界历史窗口，替代全量重写 — 性能优化大工程（size/xl）。

4. **[#29457](https://github.com/google-gemini/gemini-cli/pull/29457)** (P1) read-many-files 中二进制资源被误判为“显式请求”导致上下文膨胀，改用 glob 精确匹配。

5. **[#29450](https://github.com/google-gemini/gemini-cli/pull/29450)** (P1, 已合并) a2a-server 实现 V1→V2 设置分层迁移，内存中保持 V1 平面配置向后兼容。

6. **[#29528](https://github.com/google-gemini/gemini-cli/pull/29528)** (P1, 已合并) 修复 headless 模式下 workspace 未受信任仍上报 `onTrustChange(true)` 的“脑裂”状态。

7. **[#29560](https://github.com/google-gemini/gemini-cli/pull/29560)** 修复 Windows ConPTY 下 CJK 输入法候选窗错位 — 中文用户重要体验修复。

8. **[#29549](https://github.com/google-gemini/gemini-cli/pull/29549)** (已合并) ACP 模式补全 `PromptResponse.usage` 字段并发出 usage_update 通知，解决约 3 倍的计费高估。

9. **[#29559](https://github.com/google-gemini/gemini-cli/pull/29559)** diff 计算前归一化 CRLF，修复 Windows 文件“整文件都是 diff”的问题。

10. **[#29564](https://github.com/google-gemini/gemini-cli/pull/29564)** 设置迁移时保留 `${VAR}` 环境变量占位符，防止明文展开泄露密钥值。

> 另有 dependabot 批量依赖更新（[#29508](https://github.com/google-gemini/gemini-cli/pull/29508)，76 项），undici/fast-uri 安全修复已合入。

---

## 📈 功能需求趋势

- **Agent/Subagent 可靠性与可观测性**：挂起、误报成功、轨迹不可见、`/bug` 缺上下文——最密集的需求方向。
- **Agent 调度智能化**：模型不主动用 skills/subagents、工具数上限 400 报错，指向路由与工具范围管理。
- **AST 感知代码工具**：官方 EPIC 调研 AST 读取/搜索（#22745/#22746/#22747），与 token 节约型“surgical reads”（#19561）呼应，反映对上下文效率的持续投入。
- **安全沙箱与防护**：零依赖 OS 沙箱、破坏性命令劝阻、per-workspace 策略。
- **任务管理演进**：用持久化文件 CRUD 替代 in-context 的 WriteToDo（#18836），对抗 context rot。
- **平台兼容性**：Windows（ConPTY/IME/CRLF）、Linux Wayland、headless/CI 模式。

---

## ⚠️ 开发者关注点

1. **Headless/CI 场景稳定性**是近期修复重心：认证死循环、CPU 卡死、trust 状态错误接连修复，说明自动化流水线用户反馈集中。
2. **状态与数据完整性**：`state.json` 原子写入、chat 记录 append-only 重构，CLI 正在补齐“崩溃不丢数据”的工程基础。
3. **上下文成本**：二进制文件误读、大文件 firehose、token 膨胀是高频抱怨，“少读精读”是明确优化方向。
4. **Windows 国际化体验**：IME 光标、CRLF diff 修复显示东亚开发者群体的反馈正被快速响应。
5. **配置生效链路**：settings.json 覆盖被 Browser Agent 忽略、V1/V2 迁移占位符丢失——配置系统可靠性仍需关注。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-09-30** | 数据来源：github.com/github/copilot-cli

---

## 一、今日速览

过去 24 小时 Copilot CLI 发布节奏密集，连发 5 个补丁版本（v1.0.90-1 至 v1.0.90-5），重点修复 MCP 工具调用与启动报错问题，并新增 `--mcp-github-auth` 安全参数。社区方面，MCP 生态兼容性仍是最大痛点——Figma 远程服务器加载失败（#4870）、MCP 工具名带点导致 400 错误（#2581）等问题引发大量讨论。此外，#1274 报告的持续 400 无效请求错误（31 条评论、13 👍）仍是未解决的高热度问题。

---

## 二、版本发布

### v1.0.90-5
- 修复：配置的 provider 已提供模型时，启动或模型选择器中不再显示 "No supported model available"
- 修复：MCP 服务器在响应后持续发送进度更新时，工具调用仍可正常完成

### v1.0.90-4
- 修复：全新启动时登录过程中不再打印 "Failed to read model provider attribution" 错误

### v1.0.90-3
- **新增**：`--mcp-github-auth` 参数，将 GitHub 账户授权限定于已批准的 MCP server origins
- **新增**：路径访问提示中支持会话级只读目录授权（安全粒度提升）

### v1.0.90-2 / v1.0.90-1
- 修复：MCP OAuth 登录（如 Datadog）复用仍有效的缓存 token
- 修复：已撤销的运行中提示在会话恢复后保持移除状态

**点评**：本批发布以 MCP 稳定性和安全授权为主旋律，`--mcp-github-auth` 和会话级目录授权体现了对最小权限原则的重视。

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 状态 | 热度 | 关注理由 |
|---|-------|------|------|---------|
| 1 | [#1274 CLI 频繁收到 400 invalid request body](https://github.com/github/copilot-cli/issues/1274) | OPEN | 31 评论 / 13 👍 | **今日最热**。代码审查场景下 95% 请求返回 400，疑为 CLI 构造的请求体不合法或服务端校验问题，持续近 8 个月未解，影响面广 |
| 2 | [#1285 组织级 Agent 不显示](https://github.com/github/copilot-cli/issues/1285) | OPEN | 11 评论 / 14 👍 | 企业用户在 `{org}/.github-private` 中创建的 Agent 无法在 CLI/VS Code 中出现，阻碍组织级采用 |
| 3 | [#4870 Figma 远程 MCP 服务器加载失败（-32601 被视为致命错误）](https://github.com/github/copilot-cli/issues/4870) | CLOSED | 8 评论 / 12 👍 | CLI 将 `server/discover` 返回的 `-32601` 当作致命错误而拒绝注册工具，VS Code 可正常工作。已修复，是 MCP 兼容性修复的典型案例 |
| 4 | [#2861 Compaction 失败：模型返回空响应（Opus 4.6）](https://github.com/github/copilot-cli/issues/2861) | CLOSED | 7 评论 / 5 👍 | 手动 `/compact` 在 Claude Opus 4.6 上连续 3 次失败，反映上下文压缩与新模型的兼容问题 |
| 5 | [#4982 工具调用并行批处理无限卡死](https://github.com/github/copilot-cli/issues/4982) | OPEN | 1 评论 | **新报告**。gpt-6-sol 下并行文件读取/搜索随机性停摆，相同批次时好时坏，疑似竞态问题，值得密切关注 |
| 6 | [#4985 MCP server env 密钥占位符未传递到子进程](https://github.com/github/copilot-cli/issues/4985) | OPEN | 1 评论 | `${secret:...}` 占位符在 macOS 上无法传递给 stdio MCP server，涉及密钥管理可靠性 |
| 7 | [#4805 会话无法恢复：崩溃残留的 lock 文件永不回收](https://github.com/github/copilot-cli/issues/4805) | OPEN | 2 评论 | 宿主进程崩溃后遗留 `inuse.<pid>.lock`，导致数据完好的会话永久无法打开——生命周期管理缺陷 |
| 8 | [#4807 空闲进程 FileWatch 事件风暴：双核 CPU + 33GB 日志](https://github.com/github/copilot-cli/issues/4807) | CLOSED | 3 评论 | 空闲 CLI 进程 221% CPU 持续 35 小时、写出 33GB 日志，资源泄漏问题触目惊心，已修复 |
| 9 | [#2581 MCP 工具名含点号导致 400](https://github.com/github/copilot-cli/issues/2581) | CLOSED | 3 评论 / 3 👍 | CLI 不符合 MCP 规范允许的点号命名，触发 API 正则校验失败，规范合规性问题 |
| 10 | [#4515 同时暴露 MCP content 与 structuredContent](https://github.com/github/copilot-cli/issues/4515) | OPEN | 2 评论 | 双重注入上下文违反 MCP 规范预期，可能浪费 token 并干扰模型理解，仍待修复 |

---

## 四、重要 PR 进展

> 注：过去 24 小时内仅 1 条 PR 更新，结合近期 Issue 动向整理如下。

1. **[#5000 从已发布的 Release 发布 npm tarballs](https://github.com/github/copilot-cli/pull/5000)** — 新开 PR。将 npm 发布改为由 GitHub Release 触发，采用 trusted publishing（OIDC）替代 npm token，并保留手动恢复路径。**发布工程安全化的重要改进**。
2. **v1.0.90-3 安全授权特性**（对应 #3393、#1285 一类 MCP OAuth / 组织授权问题）— `--mcp-github-auth` 参数落地，回应了社区对 MCP 授权范围过宽的担忧。
3. **v1.0.90-1 MCP OAuth token 缓存复用** — 直接关联已关闭的 #3393（Sentry/Datadog OAuth 卡住），每次连接不再重复走认证流程。
4. **v1.0.90-5 进度更新不再阻塞工具调用** — 修复激进发送 progress 通知的 MCP 服务器导致调用挂起的问题，与 #4982 报告的并行工具停摆症状相关，值得观察是否根治。

---

## 五、功能需求趋势

1. **MCP 生态兼容性（最高频）**：远程服务器注册失败、工具命名规范、OAuth 流程、密钥传递、structuredContent 处理——MCP 相关 Issue 占比显著，社区对“开箱即用连接任意 MCP 服务器”期望强烈。
2. **企业/组织能力**：组织级 Agent 分发（#1285）、BYOK 支持（#4037、#2651），企业用户希望 CLI 与既有治理体系融合。
3. **会话与上下文管理**：会话恢复可靠性（#4805）、按名称检索会话（#2483）、上下文压缩稳定性（#2861）、对话回滚折叠浏览（#4995）。
4. **多模态与富内容**：PDF 上传分析（#4583）需求明确，模型能力与 CLI 功能存在缺口。
5. **交互体验打磨**：ask_user 枚举字段增加自由输入逃生口（#3323）、MCP 快捷开关（#2805）、键盘输入/时区识别（#3533、#2315）。
6. **性能与资源**：事件风暴（#4807）、工具调用停摆（#4982）表明后台资源管理仍是薄弱环节。

---

## 六、开发者关注点

- **请求可靠性是头号痛点**：#1274 的 400 错误高居榜首且长期未解，叠加 #4982 的工具停摆，核心请求链路的稳定性是开发者信任的基础。
- **MCP 规范合规度**：点号命名（#2581）、structuredContent（#4515）、`-32601` 处理（#4870）均属“CLI 与规范不一致”，建议团队建立 MCP 规范符合性测试集。
- **密钥与授权安全**：`--mcp-github-auth` 与会话级只读授权是积极信号，但 `${secret:...}` 传递失败（#4985）说明实现仍有缝隙。
- **故障恢复能力**：lock 文件永不回收（#4805）、33GB 日志（#4807）暴露了异常路径下的资源清理缺失，建议关注 watchdog 与日志轮转机制。
- **跨工具一致性**：多个 Issue 提到“VS Code 可以但 CLI 不行”（#4870 等），跨客户端行为一致性是提升体验的关键。

---
*数据截至 2026-09-30，统计窗口为过去 24 小时内更新的 Releases / Issues / PRs。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-09-30）

## 📌 今日速览

今日无新版本发布。社区焦点集中在**内存/资源占用问题**（Memory Megathread 已积累 147 条评论）和 **SQLite 数据库无限膨胀**（13GB+）两大长期痛点上。PR 方面，Zen API CORS 修复、OpenRouter 缓存断点优化、Copilot GPT-6 推理力度修复等一批贡献已合入，同时有一批 8 月底的历史 PR 被批量清理关闭。

---

## 🔥 社区热点 Issues

**1. Memory Megathread（已关闭）** — [#20695](https://github.com/anomalyco/opencode/issues/20695)
内存问题集中汇总帖，147 条评论、112 👍，是项目最受关注的问题之一。维护者明确要求社区提供 heap snapshot 而非 LLM 生成的“解决方案”，显示团队正在系统性排查内存问题。

**2. opencode.db 无限膨胀至 13GB+** — [#33356](https://github.com/anomalyco/opencode/issues/33356)
事件溯源 `event` 表（主要为 `message.updated.1` 快照）无保留/压缩策略，长期运行实例将磁盘占满至 97-99%。37 条评论，v2 架构级隐患，影响生产可用性。

**3. TUI 间歇性 OOM：内存 1 分钟内飙至 24-28GB** — [#51761](https://github.com/anomalyco/opencode/issues/51761)
线性增长且无 GC 锯齿，无法定位触发条件，与 #20695 呼应，是内存问题在新版中的又一实例。

**4. 图片被拒后 Session 彻底“变砖”** — [#52042](https://github.com/anomalyco/opencode/issues/52042)
自定义 OpenAI 兼容提供商拒绝图片输入后，每次请求都重放失败图片且只报通用 400，无恢复路径。已有对应修复 PR #52145。

**5. Desktop 启动失败：no such column: project_id** — [#42170](https://github.com/anomalyco/opencode/issues/42170)
schema 迁移不兼容导致 sidecar 500，Desktop 完全不可用，属于阻断级 bug。

**6. OpenAI OAuth 转换误读 Codex 预算为上下文限制** — [#44821](https://github.com/anomalyco/opencode/issues/44821)
导致比实际限制早数十万 token 触发自动压缩，直接影响使用成本与体验，5 👍。

**7. OpenCode Go 订阅显示 0% 用量却报“余额不足”** — [#51424](https://github.com/anomalyco/opencode/issues/51424)
付费用户被误判额度，涉及计费正确性，社区高度敏感。

**8. Bedrock Opus 5.5 thinking block 签名错误（已关闭）** — [#51481](https://github.com/anomalyco/opencode/issues/51481)
子代理会话中 thinking block 绑定校验失败，需透传 Anthropic 的 `prefix_mismatch_behavior` 参数。

**9. Zen API CORS 仅在模型列表路由生效** — [#52178](https://github.com/anomalyco/opencode/issues/52178)
所有推理端点预检 404，第三方浏览器客户端完全无法调用。当日即有修复 PR #52185。

**10. OpenRouter Anthropic 提示缓存仍未生效（已关闭）** — [#51726](https://github.com/anomalyco/opencode/issues/51726)
#39009 修复不彻底，`opencode run` 每步都全额计费 input，成本敏感用户持续追踪。

---

## 🔧 重要 PR 进展

**1. fix(console): Zen API 全路由响应 CORS 预检** — [#52185](https://github.com/anomalyco/opencode/pull/52185)（Open）
解决 #52178，使所有 Zen 推理端点可被浏览器客户端调用。

**2. fix(ai): OpenRouter Anthropic/Qwen 请求设置缓存断点** — [#52110](https://github.com/anomalyco/opencode/pull/52110)（已合入）
`applyCachePolicy` 此前跳过 OpenRouter，导致缓存缺失、全额计费。

**3. fix(core): 透传 Copilot Responses 设置** — [#52182](https://github.com/anomalyco/opencode/pull/52182)（已合入）
修复 GPT-6 被误分类为非推理模型、effort 参数丢失的问题（#51850）。

**4. [contributor] fix(ai): OpenRouter auto 缓存标记按模型选择** — [#52119](https://github.com/anomalyco/opencode/pull/52119)（已合入）
按 `anthropic/`、`qwen/` 前缀区分断点策略，AI agent 贡献。

**5. fix(tui): 切换会话时释放超大消息缓存** — [#52187](https://github.com/anomalyco/opencode/pull/52187)（Open）
视图卸载时释放会话消息缓存，直击 TUI 内存问题（#39380）。

**6. fix(core): 展示结构化提供商错误详情** — [#52145](https://github.com/anomalyco/opencode/pull/52145)（Open）
解码通用 HTTP 错误背后的真实提供商报错，改善 #52042 类问题的可诊断性。

**7. [contributor] fix(opencode): darwin 二进制本地编译后重签名** — [#52183](https://github.com/anomalyco/opencode/pull/52183)（Open）
修复 Bun 编译后 ad-hoc 签名失配问题。

**8. fix(app): 快捷键过滤框保持焦点** — [#49815](https://github.com/anomalyco/opencode/pull/49815)（已合入）
小而美的 UX 修复：首字符输入后焦点丢失。

**9. feat(app): 提交前上传受管附件（3-PR 系列之三）** — [#46185](https://github.com/anomalyco/opencode/pull/46185)（已关闭/清理）
受管附件存储体系（#46175/#46182/#46185）今日被批量清理关闭，值得跟踪后续走向。

**10. fix(core): 目录读取越界 offset 报错** — [#46159](https://github.com/anomalyco/opencode/pull/46159)（已关闭/清理）
修复 offset 越界被误报为“空目录”的工具语义问题，与一批 8 月底贡献 PR 一同被自动化清理。

---

## 📈 功能需求趋势

- **性能与资源管理**是最大主线：内存泄漏、OOM、CPU 100%、DB 膨胀相关问题密集出现，社区对 v2 的资源治理期待很高。
- **成本优化**：提示缓存（OpenRouter、跨会话 system prompt）、context compaction 时机（#44821）相关讨论活跃，反映重度用户对 token 成本的敏感。
- **自定义 Provider 生态**：OpenAI 兼容端点的错误透明度（#52042）、Desktop 添加自定义 Provider 失败（#51330）、新接入请求（Nous Portal #47515）。
- **Desktop/TUI 体验打磨**：附件选择器记忆路径、上下文面板排序、归档会话保持打开等细节需求增多。
- **多模型路由兼容性**：Bedrock thinking block 绑定、GPT-6 effort 透传、DeepSeek V4 thinking 开关等，跨提供商一致性是持续热点。

## ⚠️ 开发者关注点

1. **v2 数据层设计缺陷**：事件表无清理机制（#33356）+ schema 迁移破坏性变更（#42170），长期运行与升级路径可靠性存疑。
2. **错误信息可观测性不足**：多个 Issue 抱怨通用 400/500 错误掩盖真实原因，#52145 修复方向正确但需覆盖更多路径。
3. **计费/额度判定准确性**：OpenCode Go 误报余额不足（#51424）、缓存失效导致多倍计费（#51726）直接影响付费信任。
4. **贡献 PR 流失风险**：大量带 `automated-pr-cleanup` 标签的 8 月底社区 PR 被批量关闭（含有价值的功能如受管附件），贡献者体验值得关注。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-09-30）

## 1. 今日速览

Qwen Code 今日发布 **v0.24.7 全家桶**（CLI、Desktop、TypeScript SDK v0.1.17），核心更新聚焦 Managed Agent 架构的 Workspace 会话准入。社区讨论热度最高的是 **Managed Agent 双路径架构**（#12380，37 条评论）与**非对话上下文 token 治理**（#12028）两大方向。同时 wenshao、yiliang114 等核心贡献者密集提交了一批 Runtime Broker 稳定性和记忆系统性能的 issue，显示托管运行时正进入加固阶段。

---

## 2. 版本发布

### v0.24.7（CLI）
- **feat(managed-agent)**: 支持无执行能力的 Workspace 绑定会话准入（[#12709](https://github.com/QwenLM/qwen-code/pull/12709)）
- 无已知破坏性变更

### Desktop v0.24.7
- **fix(serve)**: 保留会话创建失败诊断信息（#12331）
- **feat(sdk-java)**: 新增 Managed Runtime 相关能力

### SDK TypeScript v0.1.17
- 捆绑 CLI 0.24.7，与 CLI 同分支构建

### Nightly
- v0.24.7-nightly.20260929：修复 Code Mode 文案与懒加载工具发现对齐（#12990）、权限批准相关修复

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#12380](https://github.com/QwenLM/qwen-code/issues/12380) Managed Agent 双路径架构提案（37 评论） | 本周讨论之王：定义 TS agent loop 保留 + 模型推理与工具环境解耦的分阶段架构，Session 持久所有权、Workspace 绑定、WebSocket 稳定接口，是整个 roadmap 的顶层设计 |
| 2 | [#12028](https://github.com/QwenLM/qwen-code/issues/12028) 非对话上下文 token 治理（15 评论） | 系统提示词、内置工具 schema、QWEN.md 每次请求都全额计费，长上下文模型上可能远超对话本身，是成本优化的核心追踪 issue |
| 3 | [#12326](https://github.com/QwenLM/qwen-code/issues/12326) 工具常驻集合动态选择 | `tools.eager` 是唯一能实质缩减请求体积的开关，社区希望智能选择常驻工具集而不破坏 prompt prefix 缓存 |
| 4 | [#13016](https://github.com/QwenLM/qwen-code/issues/13016) **[P1]** SDK 中止后 CLI worker 残留 | 今日唯一 P1：SIGTERM/SIGKILL 都无法终止 supervisor 重启的子进程，影响 SDK 用户体验，已有对应 PR #13036 |
| 5 | [#12867](https://github.com/QwenLM/qwen-code/issues/12867) Managed Agent Stage D 后续 | 涵盖持久生命周期、Turns/Actions、`java_durable` 准入和 AgentDefinition，是 #12380 Stage D 的落地清单 |
| 6 | [#13030](https://github.com/QwenLM/qwen-code/issues/13030) Hosted Workspace 只读搜索工具准入 | 提议在托管配置文件中加入 `list_directory`/`glob`/`grep_search`，平衡托管安全性与实用性 |
| 7 | [#12889](https://github.com/QwenLM/qwen-code/issues/12889) 延迟 tool_call 允许空参数（5 评论） | 延迟工具桥接的 schema 校验漏洞：必填字段缺失也能通过，实际场景中已复现 |
| 8 | [#13059](https://github.com/QwenLM/qwen-code/issues/13059) Runtime Broker 返回 prepared 却永不执行 | worker 拒绝的调用返回 `200 prepared`，provider 客户端无限等待——典型的分布式死锁 |
| 9 | [#12999](https://github.com/QwenLM/qwen-code/issues/12999) 桥接层强制声明 schema 但 8 个工具族不自校验 | 架构一致性问题：桥接层的校验比工具本体更严格，导致行为不一致 |
| 10 | [#13068](https://github.com/QwenLM/qwen-code/issues/13068) Ctrl+方向键发送原始 C0 字节 | shell 模式下终端体验 bug，导致 EOF/光标卡死等异常，直接影响日常使用 |

> 其他值得留意：#13070 tool_call 桥接间歇性拒绝合法调用（社区用户报告）、#13028 VSCode IDE Companion 0.24.7 发布失败（已关闭）、#13017 SDK Java 容错测试 flaky。

---

## 4. 重要 PR 进展（Top 10）

| # | PR | 内容 |
|---|-----|------|
| 1 | [#12358](https://github.com/QwenLM/qwen-code/pull/12358) 独立 Managed Agent 技术栈 | 端到端预览：常驻 Harness + Java 控制面 + 会话级 Tool Runtime，含持久 Session 记录和 Spring Broker 契约 |
| 2 | [#13071](https://github.com/QwenLM/qwen-code/pull/13071) Hosted 工具审批（D6a） | Hosted Harness 在工具调用前持久化等待审批，新增可信决策私有路由 |
| 3 | [#13036](https://github.com/QwenLM/qwen-code/pull/13036)（已关闭）限制子进程存活时间 | 针对 P1 issue #13016 的修复：supervisor 被杀后限制 child 存活时长 |
| 4 | [#12891](https://github.com/QwenLM/qwen-code/pull/12891) CLI 集成 Mem0 | opt-in 式 Mem0 记忆连接，自动注册 MCP server，配置体验对齐 model providers |
| 5 | [#12953](https://github.com/QwenLM/qwen-code/pull/12953) 辅助模型凭据脱敏 | `visionModel`/`fastModel` 等 5 个辅助选择器的凭据在所有出口面脱敏，安全加固 |
| 6 | [#13061](https://github.com/QwenLM/qwen-code/pull/13061) Provider 重试与释放顺序门控测试 | 真实 Spring Broker + MySQL/MariaDB 容错场景测试，覆盖 FG6f |
| 7 | [#12977](https://github.com/QwenLM/qwen-code/pull/12977) Hosted Workspace 审计式恢复 | 离线 opt-in 恢复流程：处理部分 Shell 捕获卡死 Workspace 租约的运维场景 |
| 8 | [#12992](https://github.com/QwenLM/qwen-code/pull/12992) 修复内联 chip 注解范围 | 文本恰好匹配 chip 名称时注解错位的问题，Web Shell 体验修复 |
| 9 | [#12789](https://github.com/QwenLM/qwen-code/pull/12789) 扩展生命周期事件尊重统计 opt-out | 隐私合规修复：临时 Config 未透传 usage-statistics 关闭设置 |
| 10 | [#13072](https://github.com/QwenLM/qwen-code/pull/13072) 压缩请求准入防护 | 共享缓存与冷压缩请求的完整准入控制，结合 provider 锚点与路由估算 |

---

## 5. 功能需求趋势

1. **Managed Agent / 托管运行时**（绝对主导）：#12380、#12867、#13030、#13019 等十余条 issue，覆盖架构设计、持久生命周期、工具准入、审批流、媒体投递（#13039）
2. **Token / 上下文成本治理**：#12028 系列，包括工具常驻集选择（#12326）、基准对比门控（#12333）、prompt cache 保留（#11321）
3. **记忆系统智能化**：Mem0 集成（PR #12891）、no-op 提取冷却（#13004）、确定性召回短路（#13003）、自主工具运行中事件驱动召回（#13063）
4. **延迟工具发现（ToolSearch）健壮性**：#12889、#12999、#13070 暴露桥接层 schema 校验的系统性问题
5. **跨语言一致性**：TypeScript/Java 双端 validator 边界对齐（#13041）、SDK Java 容错门控（#13017）

---

## 6. 开发者关注点

- **进程生命周期管理是最大痛点**：P1 的 worker 残留问题（#13016）叠加 Broker 死锁（#13059）、无限取消重试（#13040），SDK/daemon 集成方对进程清理和故障恢复反馈集中
- **内存泄漏隐患**：per-Session 索引随释放的 Session 单调增长（#13042），长期运行的 daemon 场景风险高
- **延迟工具调用可靠性不足**：v0.24.6 用户已实际遭遇间歇性调用拒绝（#13070），schema 校验双层不一致（#12999）亟待收敛
- **成本可见性缺失**：非对话上下文在长上下文模型上的开销“静默放大”，用户要求度量和治理手段
- **终端体验细节**：Ctrl 组合键（#13068）、VP 模式内容对齐（PR #9305）等交互 bug 仍影响日常使用
- **CI 稳定性**：主分支 CI 失败（#12714）、yamllint 环境漂移（PR #12650）、flaky 测试（#13017/#13032）消耗维护者精力

---

*数据来源：github.com/QwenLM/qwen-code 过去 24 小时 Releases / Issues / PRs*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*