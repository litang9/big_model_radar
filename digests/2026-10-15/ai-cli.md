# AI CLI 工具社区动态日报 2026-10-15

> 生成时间: 2026-10-14 23:11 UTC | 覆盖工具: 7 个

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
**数据日期：2026-10-15**

---

## 1. 生态全景

AI CLI 工具已全面进入 **Agent 编排与多端协同** 深水区：各工具的竞争焦点从基础补全转向子代理可靠性、MCP 生态健壮性与桌面端体验。头部产品（Claude Code、Codex）节奏密集但回归频发，"发版快 vs 稳定性"的张力成为社区信任的核心变量。开源阵营（Gemini CLI、Qwen Code）则通过公开路线图和社区协作推进架构重构，工程透明度更高。跨端（CLI/桌面/Web/移动）、跨 agent 互通和自托管模型支持，是所有玩家共同押注的方向。

---

## 2. 各工具活跃度对比

| 工具 | Issues（24h） | PRs（24h） | Release 情况 |
|---|---|---|---|
| Claude Code | ~14+ 热点 | 2（均已关闭） | **2 个**（v2.1.299/300） |
| OpenAI Codex | ~10 热点 | 10+ | 2 个 alpha 预发布（0.163.0 线） |
| Gemini CLI | 50 | 39 | 1 个 nightly（v0.65.0） |
| GitHub Copilot CLI | ~10 热点 | 0（内部开发） | **3 个**（v1.0.98 及迭代） |
| OpenCode | ~10 热点 | 10 | 无 |
| Qwen Code | ~10 热点 | 10+ | 无 |
| Kimi Code CLI | 0 | 0 | 无 |

**要点**：Gemini CLI 在公开协作量上断层领先（合计 89 条动态）；Claude Code 与 Copilot CLI 发版最频繁但仓库以内部开发为主；Codex 处于 alpha 密集验证期；Kimi Code CLI 当日静默。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **MCP 生态健壮性** | Codex、OpenCode、Gemini CLI、Claude Code | 进程泄漏（Codex #30408 达 9GB RSS、OpenCode #51003）、启动失败、OAuth 失控（Copilot CLI #5134）、>128 工具 400 错误（Gemini CLI #24246）——MCP 已成为系统性风险点 |
| **子代理/多 agent 可靠性** | 全部主流工具 | Gemini 子代理假成功/挂起（#22323/#21409）、Claude 跨会话消息假送达（#86014）、Copilot headless 静默退出（#5140） |
| **上下文与成本优化** | Claude Code、Copilot CLI、Gemini CLI、Qwen Code | 缓存 token 拆分（Claude 已落地）、prompt caching（Copilot #3808）、空闲自动压缩、AST 精准读取（Gemini #22745）、上下文不可变性（Qwen #14215） |
| **Windows 平台体验** | Codex、Claude Code、OpenCode、Copilot CLI | MXC 启动失败、ECONNRESET、PowerShell/端口问题——Windows 用户占比高但体验普遍落后是行业性短板 |
| **会话管理与跨端互通** | Claude Code、Copilot CLI、OpenCode | CLI↔桌面会话同步（Copilot #4082 👍14）、claude.ai 互通、V1→V2 迁移数据"消失" |
| **可观测性** | 全部 | 终端状态区分 done/error（Codex）、MCP 错误码分类、request_id 透出（Qwen #14133）、上下文用量显示（Claude #102204） |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | Mod 生态、桌面端一体化、OTel 可观测性 | Claude 深度用户、mod 开发者 | 闭源内部开发，Release 节奏驱动，版本号高频迭代 |
| **Codex** | 云任务/Dots、Computer Use、沙箱审批 | OpenAI 全家桶用户、委托式工作流 | Rust 核心 + alpha 密集预发布，多产品线（dot/云/IDE）打通 |
| **Gemini CLI** | Agent 子系统、沙箱安全、终端渲染质量 | 开源贡献者、终端重度用户 | 完全开放协作，PR 量最大，P1/P2 分级 triage 体系成熟 |
| **Copilot CLI** | 企业部署、BYOK、GitHub 生态集成 | 企业开发者、GitHub 用户 | 内部开发 + 渐进发布，企业管控能力最突出（managed policy、Kerberos） |
| **OpenCode** | 配置体系、桌面端、多 provider 兼容 | 重视配置可控性的自选模型用户 | 开源，正经历 V1→V2 大迁移阵痛 |
| **Qwen Code** | Managed Agent 架构、自托管模型、ACP 协议 | 本地推理用户、中文生态、运维者 | 最长线的架构重构（TypeScript loop 与推理解耦、Java 发行版），IM 集成（钉钉/企微）独具中国特色 |

---

## 5. 社区热度与成熟度

- **最活跃**：Gemini CLI（89 条公开动态，triage 体系完备，贡献者反馈周期最短）
- **最成熟但信任承压**：Claude Code（发版快、功能领先，但 Desktop 一天 4 个 UI 回归 + 8 个月未修的启动崩溃 #28304，暴露"静默改版无回退"的信任问题）
- **快速迭代期**：Codex（alpha 双发）、Copilot CLI（三日三版，新功能回归 #5139 需警惕）、OpenCode（V2 迁移收口期，schema 修复当日落地显示响应速度）
- **战略重构期**：Qwen Code（issue 量集中于架构派生任务，外部用户声音相对少，CI 债务与 runner 队列 49-64 分钟拖累贡献体验）
- **观望**：Kimi Code CLI 当日零动态

---

## 6. 值得关注的趋势信号

1. **MCP 是下一个必须解决的基础设施债**。三家工具同时爆出 MCP 进程泄漏/OOM，随 MCP server 数量增长，资源生命周期管理（而非协议本身）将成为选型硬指标。
2. **"假成功"是 Agent 信任危机的核心形态**。子代理误报 GOAL、消息假送达、headless 静默退出——CI/自动化场景的开发者应对 agent 的成功报告做二次校验，不要裸信。
3. **新版本即新回归**。Claude（2.1.299 hook 回归）、Copilot（v1.0.98 与 400 错误时间吻合）均出现发版当日回归。生产环境建议锁版本 + 延迟 3-5 天升级，关注降级路径。
4. **成本可观测性正在成为标配**。缓存 token 拆分、request_id 透出、用量监控的密集落地表明：谁能让长会话成本透明，谁就留住重度用户。
5. **自托管/本地模型是一股不可忽视的诉求**。Qwen（vLLM 不可用、上下文不可变）与 Copilot（BYOK 温度强制 0）的社区反馈表明，本地推理用户正在被主流工具系统性忽视——这是开源工具的差异化机会窗口。
6. **Windows 是全行业的二等公民**。五家工具均有 Windows 痛点集中反馈，Windows 重度用户选型时应优先验证沙箱、MCP 启动与网络稳定性。

**一句话总结**：选型上，追求功能前沿选 Claude Code/Codex（承担回归风险），追求可控与透明选 Gemini CLI/OpenCode，企业治理选 Copilot CLI，本地推理与中文生态选 Qwen Code。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-10-15，来源：github.com/anthropics/skills）

> ⚠️ 数据说明：本期 PR 数据中评论数字段缺失（undefined），热度判断结合 PR 摘要质量、更新时间及关联 Issue 讨论热度，仅供趋势参考。

---

## 一、热门 Skills / PR 动态

| # | PR | 内容 | 状态 | 关注点 |
|---|---|---|---|---|
| 1 | [#1742](https://github.com/anthropics/skills/pull/1742) | **mcp-builder 修复**：适配 mcp>=2 的 `streamable_http_client` 重命名及自定义 header 机制 | OPEN | mcp-builder 是生态内被审计最多的 Skill，配套 Issue #1390/#1352 显示其评估框架存在系统性问题，社区修复意愿强烈 |
| 2 | [#1961](https://github.com/anthropics/skills/pull/1961) | **skill-creator eval viewer 安全加固**：修复 script breakout、DNS rebinding、跨站 POST | OPEN（10月新提交，活跃更新） | 对应 Issue #1394/#1383/#1352 的一连串安全与正确性问题，是近期最集中的修复方向 |
| 3 | [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator 触发评估修复**：隔离 worker 探测、兼容 Windows | OPEN | 直接回应 run_eval.py 0% 触发率假阴性问题（Issue #556，12 条评论的热门 Issue） |
| 4 | [#1997](https://github.com/anthropics/skills/pull/1997) | **skill-creator YAML frontmatter 解析修复** | OPEN | 由活跃贡献者 @BichengWang 提交，10 月持续更新，属 skill-creator 修复系列 |
| 5 | [#1703](https://github.com/anthropics/skills/pull/1703) | **md2video-audio**：Markdown → MP4 视频 + 逼真人声配音，零成本 | OPEN | 内容创作类 Skill 代表，社区对"文档→多媒体"转化兴趣高 |
| 6 | [#1245](https://github.com/anthropics/skills/pull/1245) | **notion-spec-to-implementation**：产品/技术 Spec → Notion 任务拆解 | OPEN | 对应"工作流自动化 + 项目管理"需求，PR 存活 4 个月仍在更新 |
| 7 | [#822](https://github.com/anthropics/skills/pull/822) | **AWT（AI Watch Tester）**：视觉驱动的零代码 E2E 测试 | OPEN | 测试自动化方向的代表提交，关联 Issue 中测试生成需求旺盛 |
| 8 | [#514](https://github.com/anthropics/skills/pull/514) | **document-typography**：AI 生成文档的排版质量控制（孤行、寡行、编号错位） | OPEN | 长期未合并（3 月至今），但切中"AI 生成文档质量"的普遍痛点 |

---

## 二、社区需求趋势（Issues 提炼）

1. **安全与信任边界**（最高热）：Issue [#492](https://github.com/anthropics/skills/issues/492)（46 评论）指出社区 Skill 冒用 `anthropic/` 命名空间构成信任边界漏洞——签名验证与命名空间治理是第一大诉求。
2. **组织级 Skill 分发**：[#228](https://github.com/anthropics/skills/issues/228)（16 评论）要求组织内共享 Skill 库，替代目前手动传文件的方式。
3. **Skill 质量评估工具链可靠性**：#556/#1352/#1383/#1390 集中反映 skill-creator 的 eval 框架（触发率统计、基准测试）产出假数据，社区需要可信的 Skill 质量度量。
4. **上下文窗口效率**：[#1487](https://github.com/anthropics/skills/issues/1487) 报告 claude-api Skill 一次性注入 ~156k tokens——按需加载、渐进式披露是架构级诉求。
5. **新方向提案**：compact-memory 紧凑记忆符号（[#1329](https://github.com/anthropics/skills/issues/1329)）、agent-governance 治理模式（[#412](https://github.com/anthropics/skills/issues/412)）、推理质量门禁流水线（[#1385](https://github.com/anthropics/skills/issues/1385)）——指向**长程 agent 状态管理与输出质量管控**。

---

## 三、高潜力待合并 Skills / PR

- **skill-creator 修复系列**（#1961、#1997、#1298、#1681）：对应多个已确认 Issue，修复方案具体、验证充分，近期落地概率最高。
- **mcp-builder 修复**（[#1742](https://github.com/anthropics/skills/pull/1742)）：解决上游 mcp>=2 破坏性变更，属阻塞性兼容问题。
- **AWT E2E 测试**（[#822](https://github.com/anthropics/skills/pull/822)）：填补官方生态测试 Skill 空白，持续更新 6 个月。
- **docx 超时错误上报修复**（[#1792](https://github.com/anthropics/skills/pull/1792)）与 **slack-gif-creator 文字居中修复**（[#2004](https://github.com/anthropics/skills/pull/2004)）：小而明确的 bug fix，合并摩擦低。
- **notion-spec-to-implementation**（[#1245](https://github.com/anthropics/skills/pull/1245)）：工作流自动化代表，若官方明确社区贡献标准有望推进。

---

## 四、生态洞察

**当前社区最集中的诉求是：建立可信的 Skills 生态基础设施——包括命名空间/签名安全治理、可靠的质量评估工具链（eval 框架修复）、以及组织级分发与上下文高效的加载机制**；Skill 功能层面则以“工作流自动化 + agent 状态管理 + 测试/文档质量保障”三大方向最活跃。

---

# Claude Code 社区动态日报
**日期：2026-10-15** | 数据来源：github.com/anthropics/claude-code

---

## 1. 今日速览

过去 24 小时 Claude Code 连续发布 **v2.1.299 与 v2.1.300** 两个版本，重点改进 Mod 提示框装饰（virtualText）与缓存写入的可观测性拆分。社区焦点集中在 **Desktop 2.37337.1 更新引发的侧边栏重构争议**——"Group by" 选项被移除、会话强制嵌套展示且无提示，多个高互动 Issue 涌现。此外，v2.1.299 引入的空闲自动压缩疑似造成 `session.compact` hook 回归，值得 mod 开发者警惕。

---

## 2. 版本发布

### v2.1.300
- **Mod 提示装饰新增 `virtualText`**：可在提示框中绘制不进入草稿和实际提交 prompt 的虚拟文本
- **OTel 可观测性增强**：`api_request` 事件新增 `cache_creation_5m_tokens` / `cache_creation_1h_tokens`，按缓存生命周期拆分写入统计，方便成本分析

### v2.1.299
- **新增环境变量 `CLAUDE_CODE_DISABLE_FILE_MENTIONS`**：`@` 文件提及只传路径给 Claude 自行读取，而非直接注入文件内容——对大文件场景的上下文控制是明显优化
- **终端空闲自动压缩（idle compaction）**：约 200K+ token 的会话空闲约 54 分钟后自动压缩，减少恢复长会话的开销
- ⚠️ 注意：该版本疑似引入 `session.compact` hook 回归（见 Issue #102134）

---

## 3. 社区热点 Issues

| # | Issue | 关注点 |
|---|-------|--------|
| 1 | [#28304](https://github.com/anthropics/claude-code/issues/28304) · 💬42 👍31 | **Claude Desktop 1.1.4173 启动崩溃**：窗口不渲染但进程存活。42 条评论、持续 8 个月未关闭，是社区最持久的高压痛点 |
| 2 | [#102088](https://github.com/anthropics/claude-code/issues/102088) · 💬13 👍10 | **Desktop 移除 "Group by" 选项（回归）**：会话只能按环境分组。10 个 👍 反映了用户对侧边栏突然改版的不满 |
| 3 | [#102129](https://github.com/anthropics/claude-code/issues/102129) | **侧边栏无预警改为嵌套会话结构**：子会话挂在父会话下，父会话归档后子会话“漂浮”在顶层，工作流被打乱 |
| 4 | [#86014](https://github.com/anthropics/claude-code/issues/86014) · 💬17 | **跨会话 `send_message` 假成功**：返回成功但消息永不送达（stuck loading, 0/4 delivery）。多 agent 协作的核心功能不可靠 |
| 5 | [#100216](https://github.com/anthropics/claude-code/issues/100216) · 👍10 | **功能请求：fork 会话以顶层展示**：与 #102129 嵌套问题呼应，用户要求展示方式可配置 |
| 6 | [#102134](https://github.com/anthropics/claude-code/issues/102134) | **`session.compact` hook 在 2.1.299 不再触发**：有复现步骤，手动/自动压缩均失效。空闲压缩新特性可能破坏了 mod hook 契约 |
| 7 | [#102208](https://github.com/anthropics/claude-code/issues/102208) | **提示建议（灰色 ghost text）自 2.1.296 起消失**：CLI 与桌面端均受影响，有复现 |
| 8 | [#99727](https://github.com/anthropics/claude-code/issues/99727) | **Resume 跨压缩边界合并相同 message.id**：多次压缩导致 hook 保留的消息被成倍复制，长会话数据完整性风险 |
| 9 | [#102204](https://github.com/anthropics/claude-code/issues/102204) | **用量环弹窗不再显示上下文窗口使用率**：只显示 5 小时/每周限额，1M 窗口用户失去关键监控指标 |
| 10 | [#102201](https://github.com/anthropics/claude-code/issues/102201) | **CLI 与桌面端共用 `~/.claude.json` 不同登录时误报 "thinking from another organization"**：多账号开发者高频踩坑 |

其他值得留意：[#102206](https://github.com/anthropics/claude-code/issues/102206)（Rewind 代码恢复在大小写不敏感的 macOS 上删除重命名文件）、[#102212](https://github.com/anthropics/claude-code/issues/102212)（Windows 桌面端频繁 ECONNRESET）、[#81874](https://github.com/anthropics/claude-code/issues/81874)（Cowork VM 服务空闲回收+冷启动缓慢）。

---

## 4. 重要 PR 进展

过去 24 小时仅 2 个 PR 更新，且均已关闭，无合并动态：

1. [#86870](https://github.com/anthropics/claude-code/pull/86870)（CLOSED）— 尝试为授权安全研究场景增加上下文检查，避免安全 hook 误报。与今日 Issue #102207（合法渗透测试被 Safeguard 误拦）主题相关
2. [#85834](https://github.com/anthropics/claude-code/pull/85834)（CLOSED）— devcontainer 配置修改，声称解决 HackerOne 访问问题，可信度存疑

> 💡 该仓库以官方内部开发为主，社区 PR 量少且多为关闭状态，功能演进主要通过 Release 节奏体现。

---

## 5. 功能需求趋势

1. **桌面端 UI 自主权**：侧边栏分组/嵌套/展示方式的配置化是当前最强诉求（#102088、#102129、#100216）
2. **跨设备/跨会话互通**：claude.ai 聊天 ↔ Claude Code 会话消息互通（#102203、#102202、#102214）、claude.ai 转录记录与持久记忆访问（#84616）
3. **Mod API UI 能力扩展**：更小的字号/CSS 定制（#102215）、virtualText（已在 v2.1.300 落地）
4. **可观测性与成本**：缓存 token 拆分（已落地）、上下文窗口用量显示回归修复（#102204）
5. **远程/WSL/移动端体验**：WSL 语音输入（#97939）、iOS Remote Control 指示器修复（#89712）
6. **Skill 调用智能度**：模型绕过已安装 skill 自行写临时脚本（#90071）

---

## 6. 开发者关注点

- **⚠️ 升级风险**：v2.1.299 的空闲压缩与 hook 回归（#102134、#99727）、v2.1.296 起提示建议消失（#102208）——依赖 `session.compact` hook 的 mod 团队建议暂缓升级
- **Desktop 2.37337.1 集中翻车**：一天内至少 4 个 UI 回归 issue，更新策略（静默改版、无回退选项）引发信任问题
- **多 agent 可靠性**：跨会话消息投递假成功（#86014）与 agent 可见性（#102202）仍是多 agent 工作流的硬伤
- **Windows 生态稳定性**：启动崩溃（#28304）、ECONNRESET（#102212）、Cowork VM 冷启动（#81874）持续消耗用户耐心
- **安全边界误报**：合法渗透测试被 Safeguard 拦截（#102207），提示安全策略对授权场景的识别能力待提升

---
*本报告基于 GitHub 公开数据自动汇总，版本号与 Issue 状态以官方仓库为准。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 · 2026-10-15

## 1. 今日速览

Codex 桌面端 Windows 平台问题集中爆发：MXC 启动器 HRESULT 0x80070003 导致浏览器/Computer Use 工具初始化失败的多起报告（#53188、#53518、#54085），加上本地命令执行挂起（#53605、#53826、#54084），成为当前最突出的痛点。发布方面，Rust 核心连发 0.163.0-alpha.11 与 alpha.10.1 两个预发布版本，节奏密集。合入 PR 则聚焦 MCP 可观测性、Windows 兼容性修复与 TUI/构建系统重构。

## 2. 版本发布

- **rust-v0.163.0-alpha.11**（0.163.0-alpha.11）
- **rust-v0.163.0-alpha.10.1**（0.163.0-alpha.10.1）

两个均为 alpha 预发布，Release Notes 未附详细变更说明，主要供内测验证 0.163 线的稳定性。

## 3. 社区热点 Issues

1. **[#30408](https://github.com/openai/codex/issues/30408)** — MCP server 进程泄漏：每个线程/会话都会生成全套全局 MCP 进程，线程归档后不清理，累计可达 9+ GB RSS。55 条评论、17 👍，是长期未解的高影响力性能缺陷。
2. **[#53188](https://github.com/openai/codex/issues/53188)** — Windows 浏览器工具初始化失败（MXC launcher HRESULT 0x80070003），30 条评论，与 #53518、#54085 构成一组 MXC 已知目录启动失败的系统性问题。
3. **[#49488](https://github.com/openai/codex/issues/49488)** — Windows dot/Work 计算机任务因 MCP 启动持续失败而缺失浏览器/桌面工具，30 条评论，影响委托式工作流的核心能力。
4. **[#51675](https://github.com/openai/codex/issues/51675)** — macOS 桌面端重启后云端任务从侧边栏消失，但 Dots 能列出且直接读取可恢复，23 条评论，暴露状态同步不一致。
5. **[#50346](https://github.com/openai/codex/issues/50346)（已关闭）** — Linux 26.930 版本回归：Ctrl+Shift+D 听写快捷键失效，已处理。
6. **[#51372](https://github.com/openai/codex/issues/51372)（已关闭）** — dot 发起的云任务创建/延续报 AppServerBackendRequestError，手工创建正常，已修复关闭。
7. **[#36473](https://github.com/openai/codex/issues/36473)** — GitHub 插件连接菜单未暴露组织级 GitHub App 安装入口，导致“已连接”但实际零账户可用，属易混淆的高价值体验问题。
8. **[#52873](https://github.com/openai/codex/issues/52873)** — dot 读取用户自建 Codex 线程报 "unsupported placement format version"，跨入口（dot vs 手工）互操作性缺口。
9. **[#43726](https://github.com/openai/codex/issues/43726)** — Windows 桌面端严重 UI 卡顿、间歇性无响应，而浏览器版流畅，长期存在的平台性能差距。
10. **[#54088](https://github.com/openai/codex/issues/54088)** — Dots 简单消息等待 38 秒至 16 分钟，14 个响应窗口超时，今日新增的高优先级性能反馈。

## 4. 重要 PR 进展

1. **[#54119](https://github.com/openai/codex/pull/54119)** — 禁用细粒度沙箱审批时允许 stdin 输入进入审批复核，修复误拒仍持有权限的终端。
2. **[#54114](https://github.com/openai/codex/pull/54114)** — 终端状态区分 `done`/`error` 并报告阻塞原因，改进状态机可观测性。
3. **[#54094](https://github.com/openai/codex/pull/54094)** — MCP 失败按有界错误码分类并保留在 metrics/spans 中，直接服务于 MCP 问题诊断（呼应 #30408）。
4. **[#54069](https://github.com/openai/codex/pull/54069)** — 修复 Windows 远程 MCP 环境变量过滤丢失 `SystemDrive`/`LocalAppData` 的问题，针对 Windows MCP 启动失败。
5. **[#54079](https://github.com/openai/codex/pull/54079)** — MCP OAuth 刷新令牌被明确拒绝后退役，避免无效重试。
6. **[#54076](https://github.com/openai/codex/pull/54076)** — 修复 PowerShell 字面量 `start` 参数被误判为 URL 启动命令的安全检查误报。
7. **[#54060](https://github.com/openai/codex/pull/54060)** — unarchive 扫描限定在目标线程的归档 rollouts，避免跨线程读取无关元数据（关联归档/线程管理类 issue）。
8. **[#54096](https://github.com/openai/codex/pull/54096) / [#54113](https://github.com/openai/codex/pull/54113)** — Bazel 按需生成 app-server schema 与 Python SDK，去除预生成 bundle 依赖，改进构建管线。
9. **[#54070](https://github.com/openai/codex/pull/54070)** — 网关认证重构为可复用的 `OAuthSessionManager` API，为多入口统一登录铺路。
10. **[#54081](https://github.com/openai/codex/pull/54081) / [#54080](https://github.com/openai/codex/pull/54080)** — TUI 重构：列表视图垂直导航集中化、用户提交轮次拆分为独立模块，持续的代码健康投入。

## 5. 功能需求趋势

- **Windows 平台稳定性**：最强烈的信号，MXC 启动器、Computer Use、命令执行、UI 性能问题密集出现。
- **MCP 生态健壮性**：进程泄漏、启动失败、OAuth 刷新、远程环境变量——贯穿 Issue 与 PR 的主线。
- **Dots/dot 与桌面端互操作**：云任务创建、线程读取、placement 格式兼容，跨产品打通是高频诉求。
- **浏览器控制与 Computer Use**：Chrome 扩展、native host 缺失、权限 UI 与实际行为不一致。
- **IDE/插件集成**：JetBrains 模型列表陈旧（#52628）、@ 引用支持 git-ignored 文件（#51376）、Google Drive 插件不可用（#50849）。
- **远程/移动访问**：Android Remote 会话互斥（#49243）、WSL2 Remote WebSocket 409（#52099）。

## 6. 开发者关注点

- **资源与性能**：MCP 进程泄漏（9+ GB RSS）、Dots 响应延迟长达 16 分钟、Windows 桌面卡顿——内存与延迟是信任度的直接杀手。
- **Windows 一等公民诉求**：多条 Issue 表明 Windows 用户占比高但体验明显落后于 macOS/Linux。
- **状态一致性**：侧边栏 vs 后端数据、权限 UI vs 实际行为、审批徽章残留（#54109）等“显示与事实不符”类问题削弱信任。
- **远程与无头场景**：SSH headless 登录失败（#50072）、Remote Control 配对后 409，开发者希望 CLI/远程链路更可靠。
- **可观测性期待**：今日多个 PR（终端完成状态、MCP 错误码分类）正回应社区对失败原因透明化的需求，方向契合。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-15）

## 📌 今日速览

昨日发布 v0.65.0 nightly 版本，主要修复 Unicode 相关的终端渲染与文件识别问题。PR 活动非常活跃（39 条更新），重点集中在沙箱认证持久化、原子写入安全性、API 超时可配置化等核心改进。Issues 方面，Agent 子系统（子代理挂起、恢复状态误报）仍是社区反馈最集中的痛点区域。

---

## 🚀 版本发布

### [v0.65.0-nightly.20261014.g42c518220](https://github.com/google-gemini/gemini-cli/releases)
- **fix(cli)**：修复反向搜索中扩展 Unicode 字符的高亮索引错误（[#29699](https://github.com/google-gemini/gemini-cli/pull/29699)）
- **fix(core)**：将仅含空白字符的 UTF-16/UTF-32 文件视为空文件

另：v0.66.0 nightly 版本号已自动 bump（[#29740](https://github.com/google-gemini/gemini-cli/pull/29740)），v0.64.0 Changelog 已合并（[#29741](https://github.com/google-gemini/gemini-cli/pull/29741)）。

---

## 🔥 社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) **Subagent 达到 MAX_TURNS 后误报 GOAL 成功**（P1，13 评论） | 可靠性核心问题：子代理被中断却报告“成功”，严重误导用户判断任务完成情况 |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) **通用 Agent 无限挂起**（P1，8 评论 / 8 👍） | 简单操作如创建文件夹也会挂起超过一小时，用户只能手动禁止子代理绕过， 👍 数最高 |
| 3 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) **零依赖 OS 沙箱 + 执行后意图路由**（P2，9 评论） | 前瞻性设计：利用 Gemini 3 原生 bash 能力（grep/sed/awk 链式调用），同时保证安全性 |
| 4 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) **AST 感知的文件读取/搜索/代码库映射**（EPIC，7 评论） | 通过 AST 精确读取方法边界，减少错误读取轮次和 token 噪音，配套 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)、[#22747](https://github.com/google-gemini/gemini-cli/issues/22747) |
| 5 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) **Gemini 不主动使用 skills 和子代理**（P2，7 评论） | 自定义 skills（gradle/git）几乎不被自主调用，影响 Agent 编排实用性 |
| 6 | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) **Browser Agent 忽略 settings.json 配置**（如 maxTurns）（P2） | AgentRegistry 正确读取但配置未生效，配置一致性缺陷 |
| 7 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) **工具数 >128 时触发 400 错误**（P2） | Agent 需更智能地限定工具作用域，直接影响 MCP 重度用户 |
| 8 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) **browser 子代理在 Wayland 下失败**（P1） | Linux 桌面（Wayland）用户被排除在浏览器自动化之外 |
| 9 | [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) **get-shit-done output hook 导致崩溃**（P1） | 输出摘要打印阶段直接 crash，稳定性问题 |
| 10 | [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) **Agent 应阻止破坏性操作**（如 git reset --force） | 安全性诉求：涉及 git 分支管理和数据库维护等高危场景 |

---

## 🔧 重要 PR 进展（Top 10）

1. **[#29671](https://github.com/google-gemini/gemini-cli/pull/29671)**（P1）持久化沙箱认证与会话 — 修复容器沙箱下反复弹认证、会话丢失、文件夹信任死循环问题
2. **[#29749](https://github.com/google-gemini/gemini-cli/pull/29749)** 原子写入尊重只读文件和硬链接 — 修复 #29499 引入的回归：rename 静默覆盖 `0444` 只读文件并切断硬链接
3. **[#29756](https://github.com/google-gemini/gemini-cli/pull/29756)** API 请求头/请求体超时可配置 — 新增 `requestHeadersTimeoutMs`/`requestBodyTimeoutMs`，解决长思考任务被 `UND_ERR_BODY_TIMEOUT` 中断重放的问题
4. **[#29753](https://github.com/google-gemini/gemini-cli/pull/29753)**（P1）修复 Windows 下 openDiff 命令参数格式化与引号 — 经 `cmd.exe` 调用外部 GUI diff 编辑器的兼容性修复
5. **[#29750](https://github.com/google-gemini/gemini-cli/pull/29750)** 修复 settings 占位符在 .env 加载后才解析的顺序缺陷 — 仅在 `.env` 中定义的变量（如 Authorization 头）此前无法展开
6. **[#29457](https://github.com/google-gemini/gemini-cli/pull/29457)**（P1）read-many-files 用 glob 匹配替换模糊 includes — 修复二进制资源被误判为“显式请求”导致上下文膨胀的关键 bug
7. **[#29608](https://github.com/google-gemini/gemini-cli/pull/29608)**（P1）Web 搜索 30 秒超时 — 解决 GoogleSearch/WebFetch 永久卡在 Thinking 状态（用户报告挂起 30+ 分钟）
8. **[#29725](https://github.com/google-gemini/gemini-cli/pull/29725)**（已合并）终端同步输出 + 隔离 spinner 渲染 — 消除 tmux 等终端复用器中的屏幕闪烁
9. **[#29742](https://github.com/google-gemini/gemini-cli/pull/29742)**（已合并）修复可滚动工具容器的右边框溢出渲染
10. **[#29664](https://github.com/google-gemini/gemini-cli/pull/29664)**（P1）npm 依赖批量升级（74 项），含 MCP SDK 1.23.0 → 1.32.1

---

## 📈 功能需求趋势

- **Agent/子代理体系深化**：绝大多数活跃 Issue 集中在 `area/agent` — 子代理恢复语义（#22323）、并行协作与共享内存（#18287）、本地子代理 Sprint（#20195）、symlink 识别（#20079）等，是绝对主战场
- **上下文效率优化**：AST 感知读取（#22745）、"Tactful Extraction"外科手术式读取（#19561）、基于文件的持久化任务跟踪替代 WriteToDo（#18836）— 社区强烈关注 token 成本与 context rot
- **安全与沙箱**：零依赖 OS 沙箱（#19873）、破坏性操作防护（#22672）、per-workspace 策略（#18397）
- **终端 UI 渲染质量**：resize 无闪烁（#21924）、tmux 兼容、Debug Console 布局 — 近期多个 UI PR 已落地
- **可观测性与评估**：子代理轨迹通过 `/chat share` 可见（#22598）、内部 eval 稳定化（#23166）

---

## ⚠️ 开发者关注点（痛点总结）

1. **子代理可靠性**：挂起（#21409）、误报成功（#22323）、上下文缺失于 bug report（#21763）— 用户对子代理“黑盒且不可信”的信任危机最突出
2. **长任务稳定性**：Web 搜索/LLM 调用无限等待（#29608、#29756）、output hook 崩溃（#22186）、交互式提示卡死（#22465）
3. **上下文膨胀**：read-many-files 误读二进制（#29457）、大文件 firehose 式读取（#19561）
4. **配置一致性**：settings.json 覆盖不生效（#22267）、.env 加载顺序（#29750）、自定义 header 解析（#29606）
5. **跨平台兼容**：Wayland 浏览器代理（#21983）、Windows diff 引号问题（#29753）仍有缺口
6. **工具规模限制**：MCP 生态扩展下 >128 工具触发 400（#24246）值得重度用户警惕

---
*数据来源：github.com/google-gemini/gemini-cli · 过去 24 小时活动统计（Issues 50 条 / PRs 39 条）*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-15 | 数据来源：github.com/github/copilot-cli**

---

## 📌 今日速览

Copilot CLI 昨日密集发布 v1.0.98 及两个迭代版本，新增 Gemini 4 Argon 模型支持，并大幅增强 `/ask` 交互体验（Ctrl+E 展开、Ctrl+Y 复制）。社区方面，24 小时内新增多条高优先级 triage Issue，其中 Claude/Gemini 模型返回 HTTP 400 "invalid JSON" 错误（#5139）与 headless 模式中途静默退出（#5140）值得官方尽快确认。

---

## 🚀 版本发布

### v1.0.98（2026-10-14）
**新增**
- 支持 **Gemini 4 Argon** 模型

**修复**
- Node 环境下子进程退出信号丢失时，命令 hooks 仍能可靠完成
- 分屏视图切换会话后，MCP 状态与 `/mcp` 命令保持与活跃会话同步
- 恢复会话时正确处理已废弃的 pending-permission 请求，仅继续活跃的权限请求

### v1.0.98-2
**改进**
- `/ask` 答案支持 Ctrl+E 展开、Ctrl+Y 复制完整答案，可用 `/ask` 或 `/btw` 重新打开会话中最近一次可用的完整回答

### v1.0.98-1
与 v1.0.98 主版本内容基本一致的渐进发布，另修复了普通字符输入被吞的问题。

---

## 🔥 社区热点 Issues

1. **[#5139](https://github.com/github/copilot-cli/issues/5139) Claude 及 Gemini Argon 模型一致返回 HTTP 400 "request body is not valid JSON"**
   与昨日刚发布的 Gemini 4 Argon 支持时间高度重合，可能是新版本引入的回归，影响面广，需官方尽快确认。

2. **[#5140](https://github.com/github/copilot-cli/issues/5140) Headless 模式因 `finish_reason: "tool_calls"` 但无工具调用而中途退出码 0**
   非交互模式下的长任务被静默终止且计费了 193 tokens，对 CI/自动化场景是致命问题。

3. **[#4950](https://github.com/github/copilot-cli/issues/4950) BYOK 自定义 provider 被强制 `temperature=0`，导致推理模型退化与上下文溢出静默挂起**
   自 1.0.81 起引入的回归，BYOK 用户核心痛点，已有 4 条讨论。

4. **[#5134](https://github.com/github/copilot-cli/issues/5134) Windows 上 MCP OAuth 初始化失控，反复打开浏览器直至用户手动终止**
   "Maximum update depth exceeded" 疑似渲染循环 bug，完全阻断正常启动。

5. **[#5130](https://github.com/github/copilot-cli/issues/5130) 企业场景下 "Managed account policy" 错误信息反复刷屏**
   自 1.0.94 持续至今，影响企业用户日常使用。

6. **[#5105](https://github.com/github/copilot-cli/issues/5105) macOS 沙箱阻止 Gradle daemon 本地连接**
   即使已允许本地网络，localhost 连接仍被拒，Java/Gradle 开发者受阻；与已关闭的 #4516（JVM 不遵守沙箱 RW 路径授权）同属沙箱对 JVM 生态的兼容问题。

7. **[#3808](https://github.com/github/copilot-cli/issues/3808) 优化 Claude Sonnet 的 prompt caching 以降低延迟与 token 成本**（👍 8）
   长期高热度需求，与 #4724（按缓存 TTL 空闲自动压缩）共同指向上下文成本优化方向。

8. **[#4082](https://github.com/github/copilot-cli/issues/4082) Copilot CLI 与桌面应用跨端会话同步**（👍 14）
   社区呼声最高的跨端体验需求之一。

9. **[#1724](https://github.com/github/copilot-cli/issues/1724) 在界面中展示当前 TODO 状态**（👍 12）
   用户希望像 opencode 一样在侧边栏看到 agent 内部任务列表，透明度需求强烈。

10. **[#5133](https://github.com/github/copilot-cli/issues/5133) ACP 模式忽略 `includeCoAuthoredBy: false` 配置**
    ACP（`--acp`）与 `-p` 行为不一致，commit 仍被加上 Co-authored-by 尾注，影响集成场景的可控性。

> 值得一提的已关闭项：#5137（默认展开思考过程）、#2535（会话消息时间戳）、#5101（GitHub MCP tool 过滤导致无工具可用）均在昨日关闭，官方响应节奏较快。

---

## 🔧 重要 PR 进展

过去 24 小时内无公开 PR 更新，本节省略。（该仓库主干开发可能不通过公开 PR 进行。）

---

## 📈 功能需求趋势

1. **上下文与成本优化**：prompt caching（#3808）、按缓存 TTL 自动 compact（#4724）、mid-stream 调用的 usage 记账（#5138）——社区对长会话成本和延迟高度敏感。
2. **BYOK / 自定义 provider 增强**：采样参数可控（#4950）、credential command 配置化（#4936），自托管模型用户持续增长。
3. **跨端与多设备体验**：CLI 与桌面应用会话同步（#4082）呼声最高。
4. **Agent 透明度**：TODO 状态可视化（#1724）、默认展开思考（#5137，已关闭）、消息时间戳（#2535，已关闭）。
5. **企业部署友好**：Windows 系统级安装器（#5129）、managed policy 错误治理（#5130）、Kerberos 代理下 MCP 支持（#5142）。
6. **交互体验细节**：`/agent` 非交互选择（#5141）、打字时暂停权限打断（#5131）、`/exit` 嵌套会话问题（#5135）。

---

## ⚠️ 开发者关注点

- **新版本回归风险**：Claude/Gemini Argon 400 错误（#5139）与 v1.0.98 时间吻合，建议升级前观望，或准备降级方案。
- **Headless/自动化可靠性**：静默退出（#5140）、usage 记账缺失（#5138）表明非交互路径的健壮性仍需打磨。
- **沙箱对 JVM 生态兼容性差**：Gradle/Maven 用户（#5105、#4516）几乎无法在沙箱内正常工作。
- **Windows 体验短板集中**：OAuth 失控（#5134）、企业安装（#5129）、代理认证（#5142）。
- **会话管理体验**：会话命名缺失（#5132）、嵌套 `/exit`（#5135）、恢复会话权限处理（本次已修复）是近期反馈密集区。

---

*本日报基于过去 24 小时 GitHub 公开数据自动汇总，Issue 状态以链接页面实时信息为准。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-10-15

## 1. 今日速览

今天 OpenCode 社区最显著的动态是 **V2 配置 schema 混乱的集中爆发与修复落地**：多个关于 `opencode.ai/config.json` 拒绝合法 V2 配置的 Issue 被关闭，对应修复 PR 也已合并。同时，V2 `instructions` 字段长期不生效的问题终于被一连串 PR 彻底解决。Windows 平台（PowerShell 启动、服务端口）也有多个针对性修复。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues

1. **[#43748](https://github.com/anomalyco/opencode/issues/43748) [已关闭] 发布的 config schema 拒绝合法 V2 字段**
   V2 文档支持的 `skills`、`mcp.*`、`permissions` 等字段被官方 schema 判为非法，27 👍，是配置相关最痛的问题，今日随 PR #55524 关闭。

2. **[#55310](https://github.com/anomalyco/opencode/issues/55310) [已关闭] `opencode uninstall` 无备份删除全部会话**
   帮助文本声称“保留会话数据”，实际直接删库，属数据安全隐患，7 条评论迅速推动处理。

3. **[#42170](https://github.com/anomalyco/opencode/issues/42170) [开放] Desktop 启动失败：`no such column: project_id`**
   schema 迁移不一致导致 Desktop 1.18.17 加载会话即 500，是当前最严重的启动阻断级 bug。

4. **[#51003](https://github.com/anomalyco/opencode/issues/51003) [开放] 全局 stdio MCP server 按目录重复启动，内存耗尽**
   多目录客户端下进程成倍膨胀直至 OOM，配套回归测试 PR #55548 今日已提交。

5. **[#3011](https://github.com/anomalyco/opencode/issues/3011) [已关闭] 请求可配置重试机制（opencode.json）**
   老牌功能请求（12 评论、19 👍），希望按 provider 配置重试次数/时间窗口，今日关闭。

6. **[#55189](https://github.com/anomalyco/opencode/issues/55189) [开放] Windows "Open in PowerShell" 失败**
   作者修正了原报告：IPC 处理器把文件夹作为 argv 传给 PowerShell 被解读为 `-Command`，已有修复 PR #55554。

7. **[#55253](https://github.com/anomalyco/opencode/issues/55253) [已关闭] V1→V2 升级后会话“消失”**
   迁移把旧会话挂在占位 `global` 项目下，V2 按目录展示导致不可见——典型迁移体验问题。

8. **[#55250](https://github.com/anomalyco/opencode/issues/55250) [开放·已复现] 网络重连后误报"Session location unavailable"**
   目录明明有效却弹出恢复提示，已复现，影响日常使用流畅度。

9. **[#55516](https://github.com/anomalyco/opencode/issues/55516) [开放] OpenAI OAuth 凭证已保存但 provider 不出现**
   登录成功但 `ProviderNotFoundError`，模型列表为空，属认证/注册链路断裂。

10. **[#55491](https://github.com/anomalyco/opencode/issues/55491) [开放] Nix 构建在 v2.0.28 失败**
    flake 的 src fileset 遗漏 `script/native-arch`，导致 `nix build github:anomalyco/opencode` 无法工作。

## 4. 重要 PR 进展

1. **[#55524](https://github.com/anomalyco/opencode/pull/55524) [已合并] 发布兼容 V1/V2 的 config schema** — 一举解决 #43748、#48812、#50724 等 schema 系列问题。
2. **[#55539](https://github.com/anomalyco/opencode/pull/55539) [已合并] 加载 V2 配置的 instructions 字段** — 接续 #51422/#55116，彻底修复 instructions 不注入上下文的长期缺陷。
3. **[#55547](https://github.com/anomalyco/opencode/pull/55547) [已合并] Windows 服务默认端口改为 45278** — 避开 Hyper-V/WinNAT 保留端口区间，修复 #53351。
4. **[#55554](https://github.com/anomalyco/opencode/pull/55554) [已关闭] 修复 Windows shell 启动与内置终端** — 修复 #55189 的 PowerShell 路径传参问题。
5. **[#55560](https://github.com/anomalyco/opencode/pull/55560) [开放] Anthropic Messages 上未知 provider-executed 工具调用降级为文本** — 修复 claude-code 会话迁移到 Anthropic 模型时的报错。
6. **[#55496](https://github.com/anomalyco/opencode/pull/55496) [开放] Desktop 新增 Subagents 侧栏 Tab** — 响应长期需求 #37267，改善子 agent 状态可观测性。
7. **[#55553](https://github.com/anomalyco/opencode/pull/55553) [开放] 项目目录被删后设置页不再崩溃/重启循环** — 桌面端健壮性修复。
8. **[#55559](https://github.com/anomalyco/opencode/pull/55559) [开放] 修复 CI flaky 测试与 Windows 服务注册** — 提升 dev 分支 CI 稳定性。
9. **[#55548](https://github.com/anomalyco/opencode/pull/55548) [开放] 为 #51003 增加回归测试** — 锁定 location reload 时 stdio MCP 进程必须被回收。
10. **[#55116](https://github.com/anomalyco/opencode/pull/55116) [已合并] 核心加载配置 instructions（含 glob 支持）** — 与 #55539 配套的 V2 功能补全。

## 5. 功能需求趋势

- **配置体系一致性（最强声量）**：V2 schema 与文档脱节、`instructions`/`permissions` 字段行为不一致，是本期最高频主题，今天集中收口。
- **桌面端 UX 完善**：子 agent 输出视图（#37267）、会话导入导出一等公民化（#32696）、预览面板 SVG 适配（#55551）。
- **跨 agent 模型同步**：build/plan/子 agent 各自记忆模型选择，用户希望全局同步（#55242）。
- **可靠性与容错**：可配置重试（#3011）、陈旧 git index.lock 自动恢复（#55241）、session 压缩失败处理（#55520）。
- **平台兼容性**：Windows（PowerShell、端口、SMB 附件）、WSL（剪贴板图片粘贴）、Nix、iOS 远程配对均有反馈。

## 6. 开发者关注点

1. **V1→V2 迁移信任问题**：升级后数据“丢失”（#55253）、卸载删库（#55310）、Release 页面仍只跟踪 v1.x（见 #55345 附注），版本与分发渠道混乱正在消耗用户信任。
2. **资源泄漏**：MCP 进程按目录重复驻留（#51003）对多项目重度用户是硬阻断。
3. **Windows 是 bug 重灾区**：IPC、端口保留区、SMB 路径、shell 集成，几乎每个环节都有反馈，建议 Windows 用户暂缓重度依赖 Desktop。
4. **认证链路脆弱**：OpenAI OAuth 凭证保存但 provider 不注册（#55516）、免费层报错文案含糊（#55435），错误提示可操作性不足。
5. **对配置可验证性的期待**：社区持续要求 `$schema` 与实际行为一致——编辑器校验错误会直接削弱对工具的信任，今日修复是重要一步。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-15）

## 1. 今日速览

今日无新版本发布，社区焦点集中在 **Managed Agent 架构的分层推进**（Stage G、D7 系列切片陆续立项）与 **CI 基础设施治理**（多条 P1/P2 级 CI 问题被提出）。自托管/本地模型用户对上下文缓存与内存目录导致的重复 prompt 处理问题反应强烈，成为性能类反馈的核心痛点。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues

1. **[#12380](https://github.com/QwenLM/qwen-code/issues/12380) — Managed Agent 双路径架构提案（60 评论）**
   项目的核心长期路线图。定义了保留 TypeScript agent loop、模型推理与工具环境供给解耦、Session 持久化所有权等分阶段交付方案。今日多个 D7/G 系列子任务均由此派生，是理解项目方向的必读 Issue。

2. **[#14225](https://github.com/QwenLM/qwen-code/issues/14225) — main 分支确定性 CI 失败（P1）**
   测试仍断言 #14205 之前的 4 项 workflows 列表，导致所有合入 main 的 PR 继承红灯。`status/ready-for-agent`，属于最紧急的阻塞项。

3. **[#14112](https://github.com/QwenLM/qwen-code/issues/14112) — vLLM 后端的 OpenAI 兼容提供方全部 400**
   无参数工具序列化缺失 `"parameters"` 字段 + 不支持的 `tool_choice:"required"`，导致 TheHive 等 vLLM 类服务完全不可用。影响自建推理用户，P2。

4. **[#14203](https://github.com/QwenLM/qwen-code/issues/14203) — 内存目录（#13521）导致本地模型每步全量重处理 prompt**
   0.25.1 起内存目录追加在请求尾部且不入历史，hybrid 模型在 llama.cpp/Ollama 上每步触发完整 prompt 重算，性能退化显著。

5. **[#14215](https://github.com/QwenLM/qwen-code/issues/14215) — 自托管模型的上下文不可变性需求**
   与 #14203 呼应：低 prompt 处理速度的本地部署场景下，memories/sessions 等特性依赖模型能力，社区呼吁上下文缓存与不可变设计。

6. **[#12952](https://github.com/QwenLM/qwen-code/issues/12952) — Stage G：权威 Session 历史、writer fencing 与接管（10 评论）**
   Managed Agent 架构中移除 owner affinity 前的关键验证阶段，@wenshao 已明确哪些部分已交付，工程拆解非常细致。

7. **[#13279](https://github.com/QwenLM/qwen-code/issues/13279) — 外部 supervisor 驱动 qwen serve 的实战经验分享**
   社区用户分享了用另一 agent runtime 长期驱动 `qwen serve` 会话的田野笔记与 recipe 提议，是 agent-to-agent 集成的一手反馈。

8. **[#14148](https://github.com/QwenLM/qwen-code/issues/14148) — Hosted fork 预算守卫与实际运行时不匹配**
   测试守卫假设 650s 健康运行时，实测约 1310s，五个 600s 上限超出剩余预算，SDK Java 测试基础设施亟需修正。

9. **[#14184](https://github.com/QwenLM/qwen-code/issues/14184) — Web Shell 添加 Workspace 对话框在手机端不可用**
   393px 视口下文件夹浏览器塌缩为一行、按钮被挤出屏幕，移动端体验短板凸显。

10. **[#12961](https://github.com/QwenLM/qwen-code/issues/12961) — 未闭合 `<system-reminder>` 标签静默截断消息**
    `indexOf` 扫描器的边界缺陷：用户文本含未闭合标签时，标签后的内容全部丢失。已被标记 `ready-for-human`。

**其他值得留意**：[#14167](https://github.com/QwenLM/qwen-code/issues/14167)/[#14168](https://github.com/QwenLM/qwen-code/issues/14168) D7 持久化命令投递三切片立项；[#13387](https://github.com/QwenLM/qwen-code/issues/13387) 自定义命令将 `@{file}` 内容误作模板解析；[#14216](https://github.com/QwenLM/qwen-code/issues/14216) `tool_call` 桥接校验拒绝未标注来源导致模型放弃重试。

---

## 4. 重要 PR 进展

1. **[#11854](https://github.com/QwenLM/qwen-code/pull/11854) — Hybrid Code Mode**
   新增 `tools.mode` 枚举（`direct`/`code_mode`/`code_mode_only`），对齐 Codex 设计，普通工具与隔离 `exec` JS 工具可共存。长期开放中，是工具执行模型的重大演进。

2. **[#13902](https://github.com/QwenLM/qwen-code/pull/13902) — 项目 Agent 身份与 Agent Team 上 ACP/daemon 协议**
   +3611/−235 的大型 PR，子 agent 委派帧携带 `_meta.agent` 元数据；配套审查遗留项已拆到 [#14127](https://github.com/QwenLM/qwen-code/issues/14127)。

3. **[#14157](https://github.com/QwenLM/qwen-code/issues/14157) → 相关分发工作** — 实验性 Hosted Java 参考发行版（issue 立项），独立于 npm CLI 发布不可变版本化工件，面向运维者。

4. **[#14133](https://github.com/QwenLM/qwen-code/pull/14133) — API 错误透出 provider request id**
   无 body 的 400 错误现在附带 `request_id`，大幅提升可追溯性，便于用户向提供方报障。

5. **[#14113](https://github.com/QwenLM/qwen-code/pull/14113) — 429 携带未知 provider code 时触发模型回退**
   修复 Z.AI `1310`（周/月配额耗尽）等错误码不触发 fallback 的问题，实用性强。

6. **[#14231](https://github.com/QwenLM/qwen-code/pull/14231) — 模型端点 allowlist（`model.allowedBaseUrls`）**
   企业管控特性：设置后模型注册表只注册白名单内端点，覆盖内置与自定义 provider。

7. **[#14230](https://github.com/QwenLM/qwen-code/pull/14230) — Web Shell /memory 面板支持浏览托管 auto-memory**
   新增第三标签页，按 project/user 作用域分组展示、读取、开关自动记忆条目。

8. **[#14043](https://github.com/QwenLM/qwen-code/pull/14043) — 钉钉/企微消息拆分保留 Markdown 结构**
   长消息分段不再截断链接、表格行与代码块，提升 IM channel 体验。

9. **[#13816](https://github.com/QwenLM/qwen-code/pull/13816) — 恢复受阻时归还 Workspace 挂载**
   新增 broker 内部 `release-mount` 端点，窄化处理 tool turn 进入 recovery blocked 后的执行租约释放，避免 Workspace 被卡死。

10. **[#14033](https://github.com/QwenLM/qwen-code/pull/14033) — 跨进程 workspace 锁重试预算从 ~1.3s 提升至 ~5s**
    对齐 Agent Board 锁的两级锁模式，减少高并发下的锁获取失败。

---

## 5. 功能需求趋势

- **Managed Agent / 多 agent 架构**（最大主线）：#12380 派生的 Stage G、D7 系列密集立项，Session 持久化、writer fencing、durable 命令投递、Java 发行版，占据 issue 量首位。
- **自托管/本地模型性能**：上下文不可变性（#14215）、内存目录重复处理（#14203）、vLLM 兼容性（#14112），本地推理用户集中发声。
- **Web Shell / Desktop 体验补齐**：tokens/sec 实时指示（#14226）、移动端布局（#14184）、快捷键（#14179）、auto-memory 浏览（#14230）。
- **企业管控与可运维性**：端点白名单、可观测性（request id 透出）、外部 supervisor 集成。
- **CI/工程效率治理**：单 PR 60 jobs 无预算门（#14212）、runner 队列拥塞（#14219）、main 确定性红（#14225），CI 债务集中爆发。

---

## 6. 开发者关注点

1. **本地/自托管模型性能退化是当前最痛反馈**：0.25.1 的内存目录机制让低 prompt 处理速度的部署每步重算完整上下文，亟需缓存/不可变上下文方案。
2. **vLLM 类 OpenAI 兼容后端不可用**：工具序列化与 `tool_choice` 兼容性需尽快修复，否则整类 provider 被排除。
3. **CI 可靠性影响所有贡献者**：main 分支确定性红 + runner 队列 49-64 分钟，外部贡献者的反馈周期被严重拉长。
4. **错误信息可诊断性持续改善**：request id 透出、桥接校验拒绝需标注来源（#14216），社区希望失败原因对模型和用户都更可读。
5. **移动端与 IM 集成体验**：Web Shell 手机布局、钉钉/企微消息完整性，表明使用场景正从终端向多端扩展。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*