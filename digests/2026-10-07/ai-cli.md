# AI CLI 工具社区动态日报 2026-10-07

> 生成时间: 2026-10-06 23:47 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告（2026-10-07）

## 1. 生态全景

AI CLI 工具已全面进入“多智能体 + 自动化深水区”阶段：各家核心战场从基础编码转向子代理编排、无值守自动化和远程/托管会话。权限模型与安全边界（分类器、沙箱、审批）成为用户摩擦最集中的区域，错误透明度与静默失败问题贯穿所有工具的社区讨论。Windows 平台支持普遍成为质量短板，而桌面端（Codex、OpenCode、Claude Code 均有桌面形态）正在成为新的竞争前沿。发布节奏上，头部工具保持日级迭代，开源社区（Qwen Code、Gemini CLI）贡献活跃度显著提升。

## 2. 各工具活跃度对比

| 工具 | 热点 Issues（Top10 热度） | PR 活跃度 | Release 情况 | 今日焦点 |
|---|---|---|---|---|
| **Claude Code** | 10 条（最高 👍288） | 低（仅 2 条更新） | 2 个版本（v2.1.291/292） | 权限分类器体验、stale 批量关闭争议 |
| **OpenAI Codex** | 10 条（最高 👍89 / 59 评论） | 高（10+ 重要 PR 合入） | 2 个 alpha（0.161/0.162 并行） | Windows 桌面端问题爆发 |
| **Gemini CLI** | 10 条（多条 P1） | 极高（44 个 PR 更新） | 稳定版 v0.63.0 + 预览 v0.64.0 | 子代理可靠性、P1 级修复密集合入 |
| **Copilot CLI** | 10 条（31 条 Issue 更新） | 零（PR 0 条） | 3 个版本（v1.0.93-0~2） | MCP OAuth 认证问题、企业管控 |
| **OpenCode** | 10 条（最高 137 评论/130 👍） | 高（10+ 重要 PR，多为 OPEN） | v1.18.35 | Go 配额隔离 Bug、V2 迁移阵痛 |
| **Qwen Code** | 10 条（17 评论居首） | 极高（H4 多分片 PR 同日提交） | v0.25.1-preview.0 | Managed Agent 架构推进、安全加固 |
| **Kimi CLI** | 0 | 1（PR #2616 关闭） | 无 | 静默期 |

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **子代理可靠性** | Gemini CLI（#22323 误报成功、#21409 挂起）、Claude Code（Agent `effort` 参数）、Qwen Code（H4 子 Session 运行时） | 子代理挂起、状态误报、精细化控制——多代理编排的输出不可盲信是共同痛点 |
| **权限/沙箱体验** | Claude Code（分类器硬拦截 #92279/#100091）、Codex（沙箱误判 #40060、拒绝无诊断 #50979）、Copilot CLI（assisted permissions 疑似回归 #5066）、Gemini CLI（破坏性操作防护 #22672） | 共识诉求："提示 > 拒绝”软降级 + 拦截原因可诊断 + 可配置开关 |
| **静默失败/错误透明度** | 全部六家（Claude Code hook 判定丢弃、Codex 结构化诊断 PR、Gemini 截断不可区分 #13538 同类、OpenCode MCP elicitation 挂起） | “错误应显式暴露而非吞掉"是跨工具最强共识 |
| **上下文压缩稳定性** | Claude Code（auto-compact 失败）、Copilot CLI（压缩 300s 超时 #5054）、OpenCode（压缩后工具失效 #51949） | 长会话场景下压缩可靠性普遍不足 |
| **MCP 集成深化** | Copilot CLI（OAuth 认证问题簇）、OpenCode（elicitation、凭据迁移）、Gemini CLI（工具数 >128 报 400）、Claude Code（插件 marketplace） | MCP 已成标配，认证/兼容/规模化问题集中爆发 |
| **Windows 支持** | Codex（50%+ 热门 issue 带 windows-os 标签）、Claude Code（git 进程泄漏、worktree 数据破坏）、OpenCode（WSL UNC 路径） | Windows 普遍是二等公民，跨平台路径解析（AbsolutePathBuf 类）缺陷重复出现 |

## 4. 差异化定位分析

- **Claude Code**：企业级 agent 平台路线，插件 marketplace + 子代理 effort 分级，hooks/MCP 高级编排能力强；但 issue 管理（stale 批量关闭）暴露维护压力，社区信任成本上升。
- **OpenAI Codex**：产品矩阵最广（CLI + 桌面 App + dot 个人代理 + Computer Use），押注多形态入口；代价是 Windows 桌面端质量债集中爆发，功能广度优先于深度打磨。
- **Gemini CLI**：工程纪律最强的开源快速迭代者（44 PR/日，P1 修复密集），同时押注架构创新（AST 感知读取、OS 级沙箱提案），明显在优化 token 成本曲线。
- **Copilot CLI**：企业合规导向（`permissions.limitTo` 域边界管控、BYOK），依托 GitHub 生态；但社区侧投入最弱（PR 零活跃），issue 响应偏慢。
- **OpenCode**：开源 + 商业混合模式，桌面端功能丰富（Office 预览、Bedrock 支持）；但配额计费透明度（“Unlimited”承诺与实际阻断矛盾）和 V2 迁移体验正在消耗用户信任。
- **Qwen Code**：架构投入最激进——Managed Agent 完整路线图（durable 生命周期、角色模型、租户隔离、HTTP 面治理），明显对标生产级多租户场景；但 PR 体量失控与 CI 健康度显示工程管理跟不上野心。
- **Kimi CLI**：当前处于静默期，无版本无 issue 动态，仅剩安全边界讨论余波。

## 5. 社区热度与成熟度

**活跃度梯队**：
- **第一梯队**（高热度 + 高工程产出）：Gemini CLI、Qwen Code、OpenAI Codex
- **第二梯队**（社区大但工程响应分化）：Claude Code（用户量最大但 PR 活跃度低，closed-source 仓库限制贡献）、OpenCode（issue 热度高、PR 响应快但 V2 信任受损）
- **第三梯队**：Copilot CLI（用户基础大但社区互动弱）、Kimi CLI（静默）

**成熟度判断**：Claude Code 和 Copilot CLI 功能最成熟但进入“回归修复期”（消息丢失、权限行为回归）；Codex 和 Gemini CLI 处于快速功能扩张 + 高频修补并行阶段；Qwen Code 处于架构重构中期（preview 版本、CI 不稳定），生产可用性尚需观察。

## 6. 值得关注的趋势信号

1. **无值守自动化是下一个竞争高地**：Claude Code（Routine、ScheduleWakeup）、Codex（dot 远程任务）、Qwen Code（Managed Agent durable 生命周期）都在押注——但三家的静默失败/级联故障问题说明该场景尚不可托付关键流程。**参考价值：自动化流水线中务必加输出校验层，不可盲信 agent 的 success 状态（Gemini #22323 是典型案例）。**

2. **权限系统从“拦截”走向“协商”**：社区一致拒绝硬拦截，要求“降级为提示 + 解释原因 + 可配置"。预计各家将跟进 granular 权限与诊断信息。**参考价值：企业部署前评估权限系统的可审计性，而非仅看拦截率。**

3. **MCP 认证层成为企业采用瓶颈**：Copilot CLI（Entra/Datadog）、OpenCode（凭据迁移）、Gemini CLI（工具数上限）的问题集中出现。**参考价值：企业选型时应实测自有 MCP 服务器（尤其 Azure DevOps 类）的 OAuth 链路。**

4. **桌面端/多设备是新战场**：Codex 移除分支选择引发 89 👍 反弹说明桌面用户对 git 工作流完整性极度敏感——功能裁剪需极谨慎。

5. **Token 成本驱动架构演进**：Gemini 的 AST 感知读取、Claude 的 effort 分级、Qwen 的侧查询预算钳制，均指向“精细 token 控制”方向。**参考价值：重度用户应关注各工具的上下文管理改进，压缩稳定性问题意味着长会话成本仍不可预测。**

6. **Windows 是全行业质量洼地**：若团队主力在 Windows，建议将平台成熟度作为选型首要权重，并对 worktree/进程清理类功能保持警惕（Claude Code 130GB 数据案例）。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-10-07）

> 数据说明：本批 PR 均为 OPEN 状态，评论数为空，以下排序依据为关联 Issue 热度、更新活跃度与议题影响力。

---

## 一、热门 Skills 排行（PR 维度）

| # | Skill / PR | 功能 | 讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 触发评估修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 修复触发评估误报、Windows `select()` 失败、运行时故障误判为非触发等问题 | 关联 Issue [#556](https://github.com/anthropics/skills/issues/556)（12 评论）与 [#1383](https://github.com/anthropics/skills/issues/1383)，是社区反馈最集中的工具链 | OPEN |
| 2 | **mcp-builder 兼容修复** ([#1742](https://github.com/anthropics/skills/pull/1742)) | 适配 `mcp>=2.0` 的 `streamable_http_client` 重命名与自定义 header | 关联 [#1668]，与 Issue [#1390](https://github.com/anthropics/skills/issues/1390)（评估 0/N 评分缺陷）同属 mcp-builder 质量问题 | OPEN |
| 3 | **skill-creator eval viewer 安全加固** ([#1961](https://github.com/anthropics/skills/pull/1961)) | 修复脚本逃逸、DNS rebinding、跨站 POST | 呼应 Issue [#1394](https://github.com/anthropics/skills/issues/1394) 的 XSS 漏洞披露，安全类修复近期密集出现 | OPEN |
| 4 | **webapp-testing 命令注入修复** ([#1980](https://github.com/anthropics/skills/pull/1980)) | 消除 `shell=True` 导致的命令注入风险（CWE-78） | 安全修复持续涌入，反映社区对 Skill 供应链安全的关注 | OPEN |
| 5 | **proofcore-contract-auditor** ([#1771](https://github.com/anthropics/skills/pull/1771)) | Solidity/Rust 智能合约静态分析 + TON 链上审计存证 | Web3 场景 Skill 尝试，第三方协议集成引发信任讨论 | OPEN |
| 6 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Markdown → Marp 幻灯片 → MP4 视频 + 仿真配音，零成本 | 内容创作自动化方向，9 月持续更新 | OPEN |
| 7 | **blast-radius** ([#1776](https://github.com/anthropics/skills/pull/1776)) | 批量/破坏性写操作前的"爆炸半径"检查清单 | 高危操作治理类 Skill，与 agent-governance 需求趋势吻合 | OPEN |
| 8 | **docx 修复系列** ([#1792](https://github.com/anthropics/skills/pull/1792)、[#1734](https://github.com/anthropics/skills/pull/1734)) | LibreOffice 超时正确报错、孤儿批注检测 | 文档类官方 Skill 的长期维护需求旺盛 | OPEN |

---

## 二、社区需求趋势（Issues 提炼）

1. **安全与信任治理**（最热）：[#492](https://github.com/anthropics/skills/issues/492)（43 评论）指出社区 Skill 冒用 `anthropic/` 命名空间构成信任边界滥用；配合近期多个安全 PR，安全是第一大诉求。
2. **组织级共享与分发**：[#228](https://github.com/anthropics/skills/issues/228)（16 评论）呼吁组织内 Skill 库与直接分享链接。
3. **Skill 工具链可靠性**：skill-creator 评估框架问题密集（[#556](https://github.com/anthropics/skills/issues/556)、[#1383](https://github.com/anthropics/skills/issues/1383)、[#1394](https://github.com/anthropics/skills/issues/1394)），Windows 支持与跨平台稳定性呼声高。
4. **Token 效率**：[#1487](https://github.com/anthropics/skills/issues/1487) 报告 claude-api Skill 单次注入 156k token 耗尽上下文；[#202](https://github.com/anthropics/skills/issues/202) 要求 skill-creator 精简。
5. **Agent 治理与安全操作**：[#412](https://github.com/anthropics/skills/issues/412)（agent-governance）、[#1385](https://github.com/anthropics/skills/issues/1385)（推理质量门禁流水线）、[#1329](https://github.com/anthropics/skills/issues/1329)（compact-memory）。
6. **企业集成**：Bedrock 支持（[#29](https://github.com/anthropics/skills/issues/29)）、SharePoint 文档处理安全（[#1175](https://github.com/anthropics/skills/issues/1175)）。

---

## 三、高潜力待合并 Skills（OPEN 但活跃）

- [#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder 修复 —— 有明确关联 Issue #1668，9/29 仍在更新，最接近落地
- [#1298](https://github.com/anthropics/skills/pull/1298) skill-creator 触发评估修复 —— 对应多个高热度 Issue，维护者优先级高
- [#1792](https://github.com/anthropics/skills/pull/1792) docx 超时报错修复 —— 官方文档 Skill 缺陷修复，合并阻力小
- [#1961](https://github.com/anthropics/skills/pull/1961) eval viewer 安全加固 —— 对应已披露漏洞，安全修复优先
- [#1703](https://github.com/anthropics/skills/pull/1703) md2video-audio —— 内容创作类新 Skill 中最活跃

长期未合并积压：[#525](https://github.com/anthropics/skills/pull/525)、[#514](https://github.com/anthropics/skills/pull/514)、[#822](https://github.com/anthropics/skills/pull/822)、[#486](https://github.com/anthropics/skills/pull/486) 等开放超 6 个月，反映外部 Skill 合并门槛较高。

---

## 四、生态洞察

> **社区最集中的诉求：建立 Skills 的安全信任体系与分发机制** —— 从命名空间冒用（#492，43 评论）到 XSS/命令注入密集披露，再到组织级共享需求，社区正从"写 Skill"转向"安全地分发和治理 Skill"；同时 skill-creator 评估工具链的跨平台可靠性是阻碍贡献者参与的最大摩擦点。

---

# Claude Code 社区动态日报（2026-10-07）

## 1. 今日速览

过去 24 小时内 Claude Code 连发两个版本：v2.1.292 为插件安装新增 `--marketplace` 参数并为 Agent 工具引入 `effort` 参数，v2.1.291 修复了两处会话消息丢失的回归问题。社区讨论焦点集中在权限分类器（classifier）的体验问题——多名用户呼吁允许关闭或软降级分类器拦截行为。此外，大量 8 月的 stale issue 被批量关闭，引发对问题追踪机制的讨论。

## 2. 版本发布

### [v2.1.292](https://github.com/anthropics/claude-code/releases)
- `claude plugin install` 新增 `--marketplace <source>` 参数：必要时自动添加 marketplace（与 `claude plugin marketplace add` 遵循相同的策略检查），并从中安装插件
- Agent 工具新增 `effort` 参数，可为子代理指定运行努力等级

### [v2.1.291](https://github.com/anthropics/claude-code/releases)
- 修复 v2.1.290 中云端会话权限提示（permission prompts）应答丢失的回归
- 修复 v2.1.288 中退出会话时末尾消息可能丢失的回归

## 3. 社区热点 Issues

1. **[粘贴文本块提交前可查看/编辑](https://github.com/anthropics/claude-code/issues/3412)**（👍 288，评论 87，已关闭）
   无障碍领域高赞老 issue，macOS 听写用户长期痛点。今天更新后关闭，值得关注是否已实现。

2. **[Auto 模式下分类器拦截应降级为权限提示而非硬拒绝](https://github.com/anthropics/claude-code/issues/92279)**
   分类器 block 后模型收到 `automode-blocked` 无法恢复，只能让用户手动执行命令，破坏自动化体验。社区高度共鸣。

3. **[请求提供关闭分类器的选项](https://github.com/anthropics/claude-code/issues/100091)**（昨日新开）
   与上一条同属分类器问题，用户反馈拦截过于激进，希望可配置开关。反映权限自动化的普遍不满。

4. **[Windows 上超时的 git status 留下孤儿 git.exe 进程堆积耗尽内存](https://github.com/anthropics/claude-code/issues/97752)**
   2 秒超时只杀死了 Git 启动器，真正的 mingw64 git.exe 仍在运行。Windows 长会话用户的实际内存风险。

5. **[定时 Routine 邮件通知静默失败](https://github.com/anthropics/claude-code/issues/96059)**
   前置 issue #84645/#80880 被标记 "not planned" 后问题仍复现，用户重新开贴求关注——反映自动化通知可靠性问题。

6. **[/diff 面板不设置 cwd，读取启动目录而非会话 worktree](https://github.com/anthropics/claude-code/issues/89395)**
   有复现步骤的明确 bug，影响 worktree 隔离会话中 diff 结果的准确性。

7. **[Grep 静默遵循 .gitignore，审计代码时无法区分“不存在”与“看不见”](https://github.com/anthropics/claude-code/issues/84161)**（已关闭/stale）
   影响 agent 自审场景的经典可用性问题，关闭状态可能引来重新提交。

8. **[Worktree 清理在 Windows 上不安全，junction 目标被破坏，130GB 无法回收](https://github.com/anthropics/claude-code/issues/84162)**（已关闭/stale）
   揭示自动 worktree 生命周期管理的深层问题，Windows 数据安全风险值得警惕。

9. **[API 529 过载时子代理无重试直接终止 + 权限分类器宕机阻塞所有工具执行](https://github.com/anthropics/claude-code/issues/84201)**（已关闭/stale）
   无值守（unattended）多代理部署的关键可靠性问题：级联故障无降级路径。

10. **[Stop hook exit-2 判定在 ScheduleWakeup 挂起时被静默丢弃](https://github.com/anthropics/claude-code/issues/83687)**（已关闭/stale）
    Hooks 与后台唤醒机制交互的边界 bug，对依赖 hook 强制输出规范的用户影响大。

## 4. 重要 PR 进展

过去 24 小时仅 2 条 PR 更新，无法凑满 10 条，列出如下：

1. **[security-guidance：审查者不可接触被拒绝与密钥文件](https://github.com/anthropics/claude-code/pull/96434)**（OPEN）
   修复 #96276。安全审查子代理不再读取 `Read` deny/ask 规则覆盖的文件及 `.env`、密钥等敏感文件，且不授予 shell；提供 `SG_SKIP_SECRET_FILES=0` 退出选项。安全隔离设计的重要改进。

2. **[fix(ralph-wiggum)：stop hook Windows 兼容](https://github.com/anthropics/claude-code/pull/19084)**（CLOSED）
   修复 stop hook 的 `#!/bin/bash` shebang 在 Windows/WSL 下无法执行的问题。已关闭，可关注后续替代方案。

## 5. 功能需求趋势

- **权限系统可控性**：最强信号。分类器硬拦截、无法关闭、拦截后无法恢复（#92279、#100091、#84182），社区希望“提示 > 拒绝”的软降级与可配置开关。
- **无值守/自动化可靠性**：Routine 通知失败、API 529 无重试、子代理错误状态误报（#96059、#84201、#84155），长时自动化任务成为核心场景。
- **插件生态**：`--marketplace` 参数落地，插件分发的安装体验持续打磨。
- **子代理精细化控制**：Agent 工具 `effort` 参数、模型覆盖显示（#83663），多代理编排的可观测性需求上升。
- **Windows 支持短板**：git 进程泄漏、worktree 清理不安全（#97752、#84162），Windows 是问题集中区。
- **上下文/压缩稳定性**：auto-compact 失败、压缩后 schema 丢失（#83682、#84189）。

## 6. 开发者关注点

- **静默失败是最大痛点**：MCP 调用丢弃、邮件通知失败、hook 判定丢弃、Grep 静默忽略文件——开发者反复强调“错误应显式暴露而非吞掉”。
- **会话数据安全**：连续两个版本修复消息丢失回归（v2.1.288/290），社区对会话完整性高度敏感。
- **Stale 批量关闭引发担忧**：大量 8 月的实质性 bug 被标 stale 关闭（部分仍可复现，如 #96059），开发者被迫重开 issue，追踪成本转嫁社区。
- **资源泄漏与磁盘占用**：Windows 进程堆积、worktree 无法回收（130GB 案例），长期运行的清理机制亟待改进。
- **Hooks/MCP 边界行为**：hook 与 ScheduleWakeup、MCP 与会话重初始化的交互存在多个未解 bug，是高级用户的主要摩擦点。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-10-07** | 数据来源：github.com/openai/codex

---

## 一、今日速览

Codex 桌面端在 Windows 平台的问题集中爆发：dot 委派任务、Computer Use、沙箱策略等多个核心功能在 Windows 上存在阻塞级 bug，其中 dot 委派任务缺少 Computer Use 工具的 issue 讨论热度最高（59 条评论）。同时，社区对桌面 App 移除分支选择功能的回退诉求强烈（89 👍）。研发侧保持高频迭代，过去 24 小时合入大量修复 PR，重点覆盖 Windows 沙箱、relay 连接稳定性及 TUI 体验优化。

---

## 二、版本发布

- **rust-v0.162.0-alpha.17**（[链接](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.17)）
- **rust-v0.161.0-alpha.13.1**（[链接](https://github.com/openai/codex/releases/tag/rust-v0.161.0-alpha.13.1)）

两个 alpha 版本同期发布，说明 0.161/0.162 两条线并行推进，延续 CLI 的快速迭代节奏。Release notes 未附带详细变更说明，具体内容可对照近期合入的 PR。

---

## 三、社区热点 Issues（Top 10）

1. **[#49458](https://github.com/openai/codex/issues/49458)｜Windows：dot 启动的本地任务缺少 Computer Use 工具**（59 评论 / 24 👍）
   普通本地 Codex 会话功能正常，但 dot 委派任务无法使用 Computer Use。作为 dot + Computer Use 两大新功能的交叉点，讨论热度全天最高，且同类问题持续新增（见 #51328）。

2. **[#49532](https://github.com/openai/codex/issues/49532)｜要求恢复 App 中的分支选择功能**（46 评论 / 89 👍）
   新版桌面 App 移除了 git 分支选择入口，直接冲击开发者日常工作流，是今日 👍 最高的 issue，用户诉求非常明确：**把功能加回来**。

3. **[#40060](https://github.com/openai/codex/issues/40060)｜Windows 沙箱对 PowerShell 脚本误判**（27 评论）
   同一脚本中出现 `Start-Process` 与无关 URL 即触发 execpolicy 拦截，自 8 月报告至今在最新版和 main 分支仍可复现，是长期未修的分类器逻辑缺陷。

4. **[#3761](https://github.com/openai/codex/issues/3761)｜VS Code 扩展：拖拽非图片文件**（26 评论 / 57 👍）
   一年多的老需求，社区对 VS Code 扩展的文件交互能力期待持续存在。

5. **[#50428](https://github.com/openai/codex/issues/50428)｜Windows 桌面端 durable chat 提交/fork 失败（AbsolutePathBuf 反序列化错误）**（20 评论）
   云端会话可读但无法发送消息或 fork，属功能性阻断。相关错误也出现在 #50664，指向同一底层路径解析问题。

6. **[#42514](https://github.com/openai/codex/issues/42514)｜Intel Mac 缺少 Computer Use 服务**（16 评论 / 6 👍）
   x86_64 架构被排除在新功能之外，老机型用户关注度较高。

7. **[#48670](https://github.com/openai/codex/issues/48670)｜Windows 内置浏览器路由消失、权限无法校验**（13 评论）
   浏览器可见地打开了页面，但 Browser Use 无法读取/交互，影响 agent 的浏览器自动化能力。

8. **[#31001](https://github.com/openai/codex/issues/31001)｜GitHub code review 报用量耗尽但仪表盘显示有余额**（11 评论 / 19 👍）
   7 月至今未解，限流状态与 Analytics 仪表盘不一致，错误信息不可诊断，影响 CI 集成体验。

9. **[#49351](https://github.com/openai/codex/issues/49351)｜VS Code 扩展语音听写 403 Forbidden**（10 评论 / 5 👍）
   同账号在 ChatGPT 桌面端可用、扩展内不可用，指向扩展鉴权链路问题。

10. **[#50799](https://github.com/openai/codex/issues/50799)｜Windows 桌面端 chrome.dll 访问违例崩溃**（6 评论）
    内嵌浏览器清理阶段崩溃，是稳定性类问题中较严重的一个。

> **模式观察**：30 条热门 issue 中超过一半带 `windows-os` 标签，Windows 桌面端是当前质量问题的重灾区，且多与 dots、Computer Use、browser 等新功能叠加出现。

---

## 四、重要 PR 进展（Top 10）

1. **[#51512](https://github.com/openai/codex/pull/51512)｜对齐 Windows 沙箱临时目录权限**
   修复 temp 目录授权回退到宿主 `TEMP`/`TMP` 导致绕过只读/拒绝子路径的漏洞，直接回应近期一批 Windows 沙箱 issue（#50979、#51509）。

2. **[#51511](https://github.com/openai/codex/pull/51511)｜修复 Windows 10 盘符路径 no-follow 打开失败**
   DOS 盘符别名被误判为 reparse point 导致拒绝打开，增加重试逻辑，改善 Win10 兼容性。

3. **[#51502](https://github.com/openai/codex/pull/51502)｜限定 relay 重连次数并处理阻塞写入期间的 pong**
   修复 WebSocket 升级卡死阻断重连、短连接过早重置退避的问题，对 dot/远程连接稳定性（#49582、#50015 类问题）很关键。

4. **[#51483](https://github.com/openai/codex/pull/51483)｜结构化 rendezvous 连接诊断（无凭据泄露）**
   用关联 ID 替代原始错误文本，在不记录敏感 payload 的前提下提升连接失败的可排查性。

5. **[#51517](https://github.com/openai/codex/pull/51517)｜附件上传携带线程持久化意图**
   区分 ephemeral 线程与持久线程的上传行为，完善线程/附件数据模型。

6. **[#51482](https://github.com/openai/codex/pull/51482)｜技能识别与路径匹配改用 PathUri**
   解决 Windows 路径大小写/分隔符差异导致的技能匹配失败，同时保留文件名中的特殊字符。

7. **[#51500](https://github.com/openai/codex/pull/51500)｜Agent 指挥中心支持任务置顶**
   TUI 新增 `p` 键置顶任务、可配置键位绑定，多 agent 工作流的操作效率提升。

8. **[#51499](https://github.com/openai/codex/pull/51499)｜rollout 历史加载迁移至单一阻塞 worker**
   `.jsonl` 与 `.jsonl.zst` 解析统一到可取消的阻塞线程，改善会话历史加载的响应性。

9. **[#51515](https://github.com/openai/codex/pull/51515)｜暴露 agent 树关停失败详情**
   新增 `wait_detailed()`，将泛化的关停错误细化为具体操作/线程级报告。

10. **[#51471](https://github.com/openai/codex/pull/51471) / [#51472](https://github.com/openai/codex/pull/51472)｜TUI 全面保留可点击 URL**
    待确认 steers、选择列表中的 URL 改为终端超链接渲染，换行/截断不再丢失目标地址，是一组细致的 TUI 体验打磨。

---

## 五、功能需求趋势

1. **Windows 平台一等公民化**：沙箱策略误判、路径处理、dot/Computer Use 缺失等，Windows 用户在呐喊式反馈，占热门 issue 的 50% 以上。
2. **Dot（个人代理）与远程任务**：设备切换连接失败（#49582）、云端任务无法创建/恢复（#50015）、跨设备可见性控制（#49503）——dot 作为新形态产品的多设备体验亟待补齐。
3. **桌面 App 工作流完整性**：分支选择被移除引发强烈反弹（#49532），说明桌面 App 的 git 深度集成是核心用户的基本盘。
4. **Computer Use 跨平台覆盖**：Intel Mac 缺失（#42514）、Windows 弹窗 HWND 拒绝点击（#36603）、委派任务不可用（#49458/#51328）。
5. **IDE/扩展能力增强**：拖拽文件（#3761）、语音听写（#49351）、TUI 文本粘贴对称性（#17103）。

---

## 六、开发者关注点

- **Windows 沙箱准确性与透明度**是最大痛点：策略误判（#40060）、拒绝时缺少规则诊断（#50979）、UI 承诺"Ask for approval"但底层被 `granular.sandbox_approval=false` 阻断（#51509）——用户普遍反映"被拒绝但不知道为什么"。
- **错误信息不可诊断**：用量限流与仪表盘不一致（#31001）、`no-active-thread` 类反馈缺少上下文（#51173、#50423）、dot 报泛化的 UNKNOWN 错误（#50015）。社区强烈需要可操作的错误提示，这与研发侧重"结构化诊断"的 PR 方向（#51483、#51515、#51467）形成呼应。
- **路径解析类缺陷（AbsolutePathBuf）**已在多个 Windows issue 中重复出现（#50428、#50664），疑似同一根因，值得官方优先定位。
- **稳定性**：内嵌浏览器崩溃（#50799）、本地命令挂起不返回（#50725）等阻断性问题仍在累积。

---
*本报告基于过去 24 小时 GitHub 公开数据自动整理，评论/点赞数为生成时点快照。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-07）

## 📰 今日速览

Gemini CLI 发布 **v0.63.0 稳定版**及 **v0.64.0-preview.0** 预览版，a2a-server 设置迁移与 ACP usage 通知成为亮点。社区方面，子代理可靠性问题持续发酵——Subagent 挂起、误报成功状态等多个 P1 级 Issue 活跃讨论中。今日共 44 个 PR 更新，多项 P1 级核心修复（OAuth 死循环、会话历史误删除、IDE 沙箱连接）被合并。

---

## 🚀 版本发布

### v0.63.0（稳定版）
- `fix(cli)`: 连接恢复期间显示重试进度指示器（#29468）
- 附带 v0.61.0-preview.1 changelog 更新
- [Release 链接](https://github.com/google-gemini/gemini-cli/releases/tag/v0.63.0)

### v0.64.0-preview.0（预览版）
- `refactor(a2a-server)`: 实现 V1 到 V2 设置迁移逻辑（#29450）
- `fix(acp)`: 桥接 PromptResponse.usage 并发出 usage_update 通知（#29389）
- [Release 链接](https://github.com/google-gemini/gemini-cli/releases/tag/v0.64.0-preview.0)

### 每日构建
- `v0.64.0-nightly.20261006.gfb972b2f8` 照常发布

---

## 🔥 社区热点 Issues（Top 10）

### 1. Subagent 达到 MAX_TURNS 后误报成功状态【P1】
[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | 💬 13
`codebase_investigator` 在达到最大轮次限制、未完成任何分析时仍报告 `success` 和 `GOAL` 终止，掩盖了实际中断。**可信度问题直接影响生产使用**，13 条评论为今日最热讨论。

### 2. Generalist Agent 无限挂起【P1】
[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | 💬 8 | 👍 8
通用代理委派后永久挂起，简单如创建文件夹的操作也会卡死（等待超过一小时）。8 个 👍 表明影响面广，用户只能靠提示词规避。

### 3. 零依赖 OS 沙箱 + 执行后意图路由【P2】
[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | 💬 9
提出利用 Gemini 3 模型原生的 bash 使用习惯（grep/cat/sed/awk 链式调用），配合 OS 级沙箱兼顾安全与体验。**架构级提案，讨论热烈**。

### 4. AST 感知的文件读取/搜索/代码库映射【P2】
[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | 💬 7
EPIC 级调研：用 AST 工具精确读取方法边界，减少错位读取和 token 噪音。相关子任务 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)、[#22747](https://github.com/google-gemini/gemini-cli/issues/22747) 同步推进。

### 5. Gemini 不主动使用 Skills 和子代理【P2】
[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | 💬 7
自定义 skills（如 gradle/git）即使任务高度相关，模型也不主动调用，需显式指令才触发。**反映调度策略的深层问题**。

### 6. Browser Agent 忽略 settings.json 覆盖配置【P2】
[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | 💬 4
`AgentRegistry` 正确读取合并配置，但 Browser Agent 运行时完全忽略 `maxTurns` 等覆盖项——配置管道存在断点。

### 7. Browser 子代理在 Wayland 下失败【P1】
[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | 💬 4
Linux Wayland 环境 browser subagent 直接失败，影响 Linux 桌面用户。

### 8. 工具数超过 128 触发 400 错误【P2】
[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | 💬 3
MCP 生态扩展后工具数量激增，CLI 缺乏智能工具范围限制机制。**重度 MCP 用户的核心痛点**。

### 9. Agent 应阻止破坏性操作【P2】
[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | 💬 3
模型偶尔在有更安全替代方案时使用 `git reset` / `--force`，涉及 DB 等资源时风险更高。安全防护体系待加强。

### 10. 模型在随机位置创建临时脚本【P2】
[#23571](https://github.com/google-gemini/gemini-cli/issues/23571) | 💬 3
限制 shell 执行后，模型在各目录散落编辑脚本，工作区清理成本高，污染 git 提交。

---

## 🔧 重要 PR 进展（Top 10）

### 已合并 / 已关闭

**1. OAuth 回调 iss 参数校验对齐 RFC 9207【P1·安全】**
[#29616](https://github.com/google-gemini/gemini-cli/pull/29616) | ✅ CLOSED
按 RFC 9207 和 MCP 授权规范校验 `iss` 参数，仅在元数据要求时强制。安全合规性提升。

**2. 修复快速退出时删除已恢复会话的历史记录【P1】**
[#29584](https://github.com/google-gemini/gemini-cli/pull/29584) | ✅ CLOSED
恢复会话后快速 `Ctrl+C`/`/exit` 会永久删除会话历史文件——**数据丢失级修复**，定位并解决两个根因。

**3. 会话恢复时避免重复工具响应轮次【P1】**
[#29618](https://github.com/google-gemini/gemini-cli/pull/29618) | ✅ CLOSED
修复 `convertSessionToClientHistory` 在会话恢复时重复回放 `functionResponse` 的问题。

**4. 沙箱内 IDE 连接修复：转发 auth token + 接受容器 host header【P1】**
[#29653](https://github.com/google-gemini/gemini-cli/pull/29653) | ✅ CLOSED
修复 `GEMINI_SANDBOX=docker|podman|runsc|lxc` 下 IDE 集成（`/ide status`、原生 diff）不可用的问题。

**5. Ctrl+O 展开输出时防止终端清屏/滚动重置【P2】**
[#29640](https://github.com/google-gemini/gemini-cli/pull/29640) | ✅ CLOSED
修复 Terminator 等 VTE 终端展开截断输出时白屏或跳回滚动顶部的问题。

### 进行中

**6. 防止 OAuth/浏览器验证无限循环【P2】**
[#29655](https://github.com/google-gemini/gemini-cli/pull/29655) | 🔄 OPEN
用户完成浏览器认证后仍陷入无限验证和 OAuth 提示循环，本 PR 引入有界重试机制。

**7. 强制终端用户轮次不变量，规范化请求内容**
[#29612](https://github.com/google-gemini/gemini-cli/pull/29612) | 🔄 OPEN
`/rewind`、流中断等操作可能生成不符合协议要求（须以非空 user turn 结尾）的对话历史，本 PR 统一归一化处理。

**8. gVisor 沙箱网络隔离错误显式提示【P2】**
[#29665](https://github.com/google-gemini/gemini-cli/pull/29665) | 🔄 OPEN
gVisor (`runsc`) 下 loopback 被隔离导致 IDE 连接失败时，提供清晰诊断而非误导性 `/ide install` 提示。

**9. 重新选择 Google 登录时清除缓存凭据**
[#29643](https://github.com/google-gemini/gemini-cli/pull/29643) | 🔄 OPEN
允许用户切换 Google 账号或重新认证，而非锁定在过期 token 上。

**10. fetchJson 健壮性：JSON 解析与流错误处理【P2】**
[#29658](https://github.com/google-gemini/gemini-cli/pull/29658) | 🔄 OPEN
GitHub 扩展元数据请求的 JSON 解析错误捕获、流失败处理及非成功响应排空。

> 📦 依赖方面：Dependabot 一次性提交 **74 项 npm 依赖更新**（含 MCP SDK 1.23.0 → 1.31.0），见 [#29664](https://github.com/google-gemini/gemini-cli/pull/29664)。

---

## 📈 功能需求趋势

| 方向 | 相关 Issue | 趋势解读 |
|---|---|---|
| **子代理可靠性** | #22323, #21409, #21968 | 今日最强主线：状态误报、挂起、调度不足，多项 P1 挂牌 |
| **代码智能（AST）** | #22745/46/47, #19561 | 减少 token 消耗、精准读取代码结构成为官方调研重点 |
| **安全与沙箱** | #19873, #22672 | OS 级零依赖沙箱 + 破坏性操作防护并行推进 |
| **任务管理演进** | #18836, #21000 | 用持久化文件 CRUD 替代上下文内 WriteToDo，对抗 context rot |
| **浏览器代理** | #22267, #22232, #21983 | 配置覆盖失效、会话锁恢复、Wayland 兼容性均有诉求 |
| **可观测性** | #22598, #21763 | 子代理轨迹分享（`/chat share`）、bug report 补全子代理上下文 |

---

## ⚠️ 开发者关注点

1. **子代理可信度是最大痛点**：结果被误报为成功（#22323）+ 无限挂起（#21409），意味着自动化流水线中的 Gemini CLI 输出不可盲信，需额外校验层。
2. **会话/认证稳定性持续修复**：今日合入的多个 P1（会话历史误删、OAuth 死循环、重复工具响应）均指向核心会话管理的边界情况，近期升级可显著改善体验。
3. **Token 成本优化需求强烈**：基线约 36.6k tokens/turn，大文件读取"灌水"问题（#19561）驱动 AST 工具与"surgical reads"方向。
4. **沙箱/容器场景支持仍不完善**：IDE 集成在 docker/podman/gVisor 下的问题今日集中修复，容器化部署用户建议关注 v0.64 相关 PR 落地。
5. **MCP 重度用户注意**：工具数 >128 会触发 400 错误（#24246），目前需自行控制启用工具范围。

---

*数据截至 2026-10-07 | 来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-07 | 数据来源：github.com/github/copilot-cli**

---

## 1. 今日速览

过去 24 小时内 Copilot CLI 密集发布了 3 个版本（v1.0.93-0 至 v1.0.93-2），重点引入企业级网络边界管控（`permissions.limitTo`）并更新模型推荐列表（GPT-6.1 Sol、GPT-6 Astra/Luna、Claude 5.5）。Issue 区共更新 31 条，**MCP OAuth 认证问题成为最集中的痛点**（Entra ID、Datadog、协议版本协商等多起报告），社区同时持续关注 BYOK 多模型、沙箱权限和上下文压缩性能。

---

## 2. 版本发布

### v1.0.93-2（最新）
- **Added**：新增企业配置 `permissions.limitTo`，可强制网络请求遵循托管域边界，面向企业安全管控场景
- **Improved**：模型选择器推荐列表更新，优先展示 GPT-6.1 Sol、GPT-6 Astra/Luna 及 Claude 5.5
- **Fixed**：修复 GitHub.com Connector 用户无法展开 GitHub CLI 权限的问题

### v1.0.93-1
- 常规修复与变更（未附详细说明）

### v1.0.93-0
- 修复：禁用沙箱时，预热的语言服务器可在多次 LSP 请求间保持运行
- 修复：点击被截断的紧凑模式 shell 命令可展开完整内容

---

## 3. 社区热点 Issues（Top 10）

1. **[#3282] 多 BYOK 模型支持**（已关闭 | 👍 31 | 13 评论）
   社区呼声最高的功能之一：当前 BYOK 仅支持通过环境变量配置单一模型，切换需终止会话。值得关注该 Issue 关闭后是否意味着已落地多模型切换能力。
   https://github.com/github/copilot-cli/issues/3282

2. **[#4775] Mission Control 仪表盘链接 404**（开放 | 9 评论）
   github.com 仪表盘生成的远程会话链接指向不存在的 `/copilot/tasks/<uuid>` 路径，实际会话位于 `/agents/tasks/<uuid>`。CLI 侧 `--resume` 可用，但 Web 端入口断裂，影响远程会话工作流。
   https://github.com/github/copilot-cli/issues/4775

3. **[#2776] Shift+Enter 应插入换行而非提交**（开放 | 👍 3 | 7 评论）
   长期未决的输入体验问题：编写多行提示词时误触提交。多行输入是重度用户的高频需求。
   https://github.com/github/copilot-cli/issues/2776

4. **[#5066] Assisted permissions 模式疑似回归**（开放 | 新增）
   近期辅助权限模式要求用户批准过多低风险命令（如 PowerShell 文件查找），疑似最新版本行为回归，值得官方确认。
   https://github.com/github/copilot-cli/issues/5066

5. **[#1785] 输入栏缺少标准编辑快捷键**（已关闭 | 👍 2）
   缺少全选、Ctrl+U 清行等终端惯例操作，影响长提示词编辑效率。
   https://github.com/github/copilot-cli/issues/1785

6. **[#4695] MCP OAuth token 未跨会话复用**（开放）
   HTTP 类型 MCP 服务器的 OAuth token 因 cache-key 哈希不稳定，频繁生成新条目导致重复认证。与今日多起 MCP 认证报告共同指向 OAuth 缓存机制的系统性问题。
   https://github.com/github/copilot-cli/issues/4695

7. **[#5061] 1.0.92 拒绝标准 Entra `api://` scopes**（开放 | 新增）
   远程 MCP 服务器的合法 Entra 委托权限被拒绝，直接阻断 Azure DevOps MCP 等企业场景接入。
   https://github.com/github/copilot-cli/issues/5061

8. **[#5054] 自动压缩持续超时**（开放）
   大上下文 + xhigh reasoning 场景下 "summarizer did not settle within 300s" 频繁触发，几乎每轮重试，直接影响可用性与 token 成本。
   https://github.com/github/copilot-cli/issues/5054

9. **[#3022] `--no-remote` 未完全禁用远程控制**（已关闭 | 👍 4）
   该 flag 仅将远程会话设为只读而非彻底断开，与文档描述不符。关闭或意味着已修复。
   https://github.com/github/copilot-cli/issues/3022

10. **[#3302] `/research` 模式无法访问已配置的 MCP 服务器**（已关闭）
    Research agent 与主会话的 MCP 工具可见性不一致，修复后对深度调研工作流是重要补全。
    https://github.com/github/copilot-cli/issues/3302

---

## 4. 重要 PR 进展

过去 24 小时内无活跃 PR 更新（0 条），本期省略。版本修复内容主要随 v1.0.93 系列发布，可关注 Release Notes 获取对应变更细节。

---

## 5. 功能需求趋势

- **MCP 生态接入与认证**（最高频）：OAuth token 复用、Entra scope 校验、协议版本协商回退（#5039）、Windows Entra broker 校验（#5068）、Datadog token 交换（#5058）——MCP OAuth 成为当前最集中的问题域
- **BYOK / 离线场景增强**：多 BYOK 模型切换（#3282）、BYOK 下支持动态 workflows（#5055）
- **权限与安全精细化**：企业域边界管控（新版本已响应）、按次批准不持久记忆（#5062）、沙箱文件访问策略（#1300）
- **上下文与成本管理**：上下文重建性能优化（#5067）、缓存热时执行 /compact（#5064）、checkpoint 增加 token 计数（#5065）
- **可扩展性 / SDK**：插件声明依赖 MCP 服务器（#2113）、subagent hook 暴露 agentId（#5059）、覆盖内置 memory 工具（#5063）
- **输入与可访问性**：多行输入（#2776）、编辑快捷键（#1785）、禁用双 Esc Rewind（#5060）、十月新配色可读性回归（#5056）

---

## 6. 开发者关注点

1. **MCP OAuth 可靠性是当前最大痛点**：token 缓存失效、scope 校验过严、协议版本协商无回退——多条独立报告指向认证层的系统性缺陷，企业用户（Azure DevOps、Datadog、Jira）受影响最重
2. **权限体验平衡**：一方面 assisted permissions 疑似收紧过多（#5066），另一方面用户希望对 `git push` 等高危命令禁止“始终允许”（#5062）——粒度化权限是明确方向
3. **长上下文场景性能**：自动压缩超时、上下文重建慢、缓存时机影响成本，重度用户对 token 成本和响应延迟敏感
4. **企业管控能力增强**：新版 `permissions.limitTo` 与 BYOK 多模型诉求，反映企业/合规场景采用加速
5. **升级引发的回归需警惕**：canvas 扩展发现失效（#5057）、配色可读性下降（#5056）、权限行为变化（#5066），建议升级 1.0.93 前关注相关 Issue 进展

---
*本报告基于过去 24 小时 GitHub 公开数据自动整理，链接均指向原始 Issue/Release 页面。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期：2026-10-07 | 数据来源：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)**

---

## 📌 今日速览

今日 Kimi CLI 仓库整体较为平静：过去 24 小时无新版本发布，无新 Issue 更新。唯一动态是 PR **#2616**（Build Remote Agent 手机配对功能）已于 10 月 6 日关闭，该 PR 曾引发对第三方远程控制协议安全边界的讨论。

---

## 🚀 版本发布

过去 24 小时无新版本发布。

---

## 🔥 社区热点 Issues

过去 24 小时无 Issue 更新，暂无可报道内容。

> 💡 如需回溯近期讨论，可前往 [Issues 列表](https://github.com/MoonshotAI/kimi-cli/issues) 查看历史热点。

---

## 🔀 重要 PR 进展

### 1. Add Build Remote Agent phone pairing (gbr/1) — 已关闭

- **链接：** [PR #2616](https://github.com/MoonshotAI/kimi-cli/pull/2616)
- **作者：** @LinespottingPrivate | 创建于 2026-08-23，2026-10-06 关闭
- **内容概要：** 该 PR 试图将 **Build Remote Agent**（付费 iOS/Android 应用）添加为桌面 Agent 的配对设备。手机端通过免费的 MIT 协议开源项目 [`gbr-agent`](https://github.com/LinespottingOrg/GrokBuildRemote-Agents)，以自定义协议 `gbr/1` 观察本地会话并可注入操作——定位为“观察者 + 否决权”，而非完整编排者。
- **分析：** 该 PR 引入第三方商业应用的远程会话注入能力，涉及安全边界与维护责任问题，可能是最终被关闭的原因。社区对“手机遥控本地 CLI 会话”这一交互形态的兴趣值得关注，或可作为官方功能的参考方向。

*（过去 24 小时仅此 1 条 PR 更新）*

---

## 📈 功能需求趋势

由于近期无活跃 Issue 数据，基于历史观察，社区关注方向主要包括：

- **远程/移动端协同：** 如 PR #2616 所示，通过手机观察与控制本地 CLI 会话的需求真实存在
- **IDE 集成深化：** VS Code / JetBrains 插件体验是持续热点
- **会话安全与权限控制：** 第三方注入类功能引发对沙箱与审计机制的讨论

---

## 🛠️ 开发者关注点

- **安全边界：** 允许外部设备（尤其是商业应用）注入本地 Agent 会话，需要明确的权限模型与沙箱隔离
- **协议标准化：** 自定义配对协议（如 `gbr/1`）与官方扩展机制的兼容性尚无清晰规范
- **功能静默期：** 连续无 Release、无 Issue 动态，开发者可关注 [Releases 页面](https://github.com/MoonshotAI/kimi-cli/releases) 获取后续更新

---

*本日报基于 GitHub 公开数据自动汇总，如有遗漏请以仓库实际内容为准。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-10-07

## 1. 今日速览

OpenCode 发布 **v1.18.35**，新增 canonical redirects 与 agent 可读统计数据（JSON/Markdown 格式），并修复 xAI 图像处理问题。社区焦点集中在 **OpenCode Go 配额限制机制**——单个模型触达限额后波及全部模型的 Bug 引发多起报告；同时 V2 版本 MCP OAuth 凭据不迁移、changelog 缺失等迁移问题持续发酵。桌面端贡献活跃，新增 Office 文件预览、Bedrock 凭据配置等多个重要 PR。

---

## 2. 版本发布

### v1.18.35 ([Release](https://github.com/anomalyco/opencode/releases))

**Core 改进：**
- 新增 canonical redirects，以及供 agent 读取的 JSON / Markdown 格式统计数据

**Bug 修复：**
- xAI 工具结果现可携带受支持的图像，不支持的图像格式将被跳过（@Jaaneek）

**感谢 3 位社区贡献者**（含 @dc85 的 web 文档贡献）

> ⚠️ 相关背景：社区已指出 V2 系列发布缺少 release notes（见下方 Issue #52184），文档透明度问题值得关注。

---

## 3. 社区热点 Issues

### 🔥 高热讨论

**1. [#4283](https://github.com/anomalyco/opencode/issues/4283) — 复制到剪贴板失效（137 评论 / 130 👍）**
长期遗留的 TUI 文本选择复制问题，自 2025-11 开放至今仍是关注度最高的 Issue。影响基础日常操作，社区持续施压要求修复。

**2. [#45278](https://github.com/anomalyco/opencode/issues/45278) — 订阅支付被拒（33 评论 / 23 👍）**
用户使用 3 个月无异常的卡片突然无法续费，银行确认无问题。涉及商业付费链路，直接影响留存。

**3. [#49014](https://github.com/anomalyco/opencode/issues/49014) — 5 小时限额阻塞所有模型（13 评论）**
grok-4.6 触达自身限额后，所有零用量的 Go 模型同样报错，切换模型无效。配额隔离机制疑似存在 Bug，与 #52783、#51682 构成同一问题簇。

**4. [#52783](https://github.com/anomalyco/opencode/issues/52783) — 周配额触达后无法使用其他模型（9 评论）**
qwen3.7-plus 周配额用尽后，其他模型全部被阻断。与上一条共同指向 Go 服务配额按 provider 整体限制的设计缺陷。

**5. [#52184](https://github.com/anomalyco/opencode/issues/52184) — V2 发布缺少 release notes（7 评论 / 17 👍）**
changelog 停留在 v1.18.33，v2.0.x 的 GitHub release 仅有标题行。高 👍 数反映社区对 V2 信息透明度的强烈不满。

### 🐛 重要 Bug

**6. [#51856](https://github.com/anomalyco/opencode/issues/51856) — MCP elicitation 能力声明与实现不符（8 评论）**
客户端在握手时声明支持 `elicitation.form` 但从不处理 `elicitation/create` 请求，导致工具调用挂起超时。影响 MCP 生态兼容性。

**7. [#53607](https://github.com/anomalyco/opencode/issues/53607) — V2 不迁移 V1 的 MCP OAuth 凭据（4 评论）**
升级后所有 OAuth 保护的远程 MCP 服务器掉入 `needs_auth`，且无任何提示。V1→V2 迁移体验的关键缺口。

**8. [#52205](https://github.com/anomalyco/opencode/issues/52205) — Windows Desktop 将 WSL UNC 路径传给 Linux 服务端导致 500（4 评论）**
跨 Windows/WSL 场景的路径转换缺失，引发启动崩溃。已有修复 PR（见下文 #53628）。

**9. [#51949](https://github.com/anomalyco/opencode/issues/51949) — 自动压缩后 agent 停用顶层工具（3 评论）**
context compaction 后 agent 只走 code mode 且全部失败，甚至向用户报告工具未注册。涉及核心会话状态管理。

**10. [#53617](https://github.com/anomalyco/opencode/issues/53617) — Desktop 陈旧 CLI 二进制从不清理（2 评论）**
每次 CLI 更新暂存约 175 MB 且清理代码被开发 flag 屏蔽，磁盘占用无限增长。当日已有对应修复 PR，响应速度快。

---

## 4. 重要 PR 进展

| PR | 内容 | 状态 |
|---|---|---|
| [#53305](https://github.com/anomalyco/opencode/pull/53305) | **Office 文件预览**：基于 BetterOffice（Rust→WASM）实现 .docx/.xlsx/.pptx 只读预览，引擎全部离主线程运行 | OPEN |
| [#53626](https://github.com/anomalyco/opencode/pull/53626) | **Bedrock 凭据配置**：支持 API key、AWS SSO/named profile、直接密钥三种方式，自动发现本机 profile | OPEN |
| [#53624](https://github.com/anomalyco/opencode/pull/53624) | **外部凭据引用**：通用 `external` 凭据类型，以元数据而非 token 形式传递 | OPEN |
| [#53625](https://github.com/anomalyco/opencode/pull/53625) | **集成连接表单改进**：表单式连接 + 校验，贯穿 Core/Protocol/Server/TUI/Web 全栈 | OPEN |
| [#53628](https://github.com/anomalyco/opencode/pull/53628) | 修复 #52205：仅 builtin sidecar 使用原生文件选择器，解决 WSL UNC 路径问题 | OPEN |
| [#53618](https://github.com/anomalyco/opencode/pull/53618) | 修复 #53617：打包构建中清理陈旧 CLI stages | OPEN |
| [#53627](https://github.com/anomalyco/opencode/pull/53627) | 修复浏览器栏 review 发现的 14 项问题 + 缩放菜单 Bug | OPEN |
| [#53333](https://github.com/anomalyco/opencode/pull/53333) | **TUI 三级 transcript 导航**：按 prompt/landmark/block 跳转 + ctrl+home/end | OPEN |
| [#53630](https://github.com/anomalyco/opencode/pull/53630) | `messages_first` 返回上次滚动位置，改善长会话阅读体验 | OPEN |
| [#53619](https://github.com/anomalyco/opencode/pull/53619) 等系列 | @dc85 的 Exo Free 模型文档批量更新（18 个语言版本 + Console），配套 #53621 stats 修复 | 已合并 |

> 📌 另外，多个 9 月遗留社区 PR 被 automated-pr-cleanup 机器人批量关闭（如 #47640 office 预览、#47641 retry-after 修复），部分功能可能需要重新提交。

---

## 5. 功能需求趋势

1. **MCP 生态深化**：elicitation 支持（#51856）、MCP 工具搜索/延迟 schema 加载（#49645）、OAuth 凭据迁移（#53607）——社区希望 MCP 集成更完整、更轻量。
2. **配额与计费透明化**：Go 免费模型“Unlimited”承诺与实际阻断的矛盾（#51682）是信任级问题。
3. **桌面端体验打磨**：可自定义快捷键（#43897）、侧栏开关（#53631）、面板宽度限制（#52772）、Office/PDF 预览（#53305）。
4. **插件扩展性**：`tool.execute.before` 增加 skip 字段实现确定性门控（#52837），反映高级用户对执行流程控制的需求。
5. **平台覆盖**：Termux/Android 支持（#47612）、Windows/WSL 互操作。

---

## 6. 开发者关注点

- **V2 迁移阵痛**：release notes 缺失、MCP 凭据不迁移、附件上传 500（#45558）——V2 beta 用户的核心摩擦点，建议官方提供迁移指南。
- **配额隔离 Bug 簇**：#49014 / #52783 / #51682 指向同一根因（provider 级整体限流），建议优先修复。
- **长会话可靠性**：auto-compact 后工具失效（#51949）、Code Mode 提示词误导小模型（#53623），暴露 prompt 工程与上下文管理的脆弱性。
- **基础交互仍未闭环**：剪贴板问题（#4283）挂了近一年、137 条评论，高关注度低进展的 Issue 需要官方明确回应。
- **稳定性投诉**：Go 服务间歇性 503/524（#36889）自 7 月持续至今，服务端可靠性仍是短板。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-10-07

## 一、今日速览

Qwen Code 发布 **v0.25.1-preview.0** 预览版。过去 24 小时社区活跃度极高，Managed Agent（托管智能体）扩展运行时成为绝对主线：Stage H4（子智能体/子 Session 运行时）多个分片 PR 同日提交，同时 H3 阶段的验收与启用前置工作密集展开。安全方面出现两个值得警惕的问题：web-shell 审批路径的控制字符注入缺陷和系统设置环境变量覆盖缺少文件所有权校验。CI 层面主分支存在多个测试失败，尚待修复。

---

## 二、版本发布

**v0.25.1-preview.0**（[Release](https://github.com/QwenLM/qwen-code/releases)）
- `fix(agents)`: 替换已选定的远端 Hosts 时不丢失绑定关系（PR #13430，@yiliang114）
- 测试补充：关闭 #12693 的合入后评审遗留项

本次为预览版，核心改动聚焦 Hosted Harness 的绑定稳定性，建议生产环境继续停留在稳定版。

---

## 三、社区热点 Issues（Top 10）

1. **[#12867](https://github.com/QwenLM/qwen-code/issues/12867) — Managed Agent Stage D 后续：durable 生命周期、Turns、Actions**（17 评论）
 wenshao 主导的核心路线图 issue，覆盖 API 契约中最重的持久化部分，是 multi-agent 架构的基石，讨论热度全站第一。

2. **[#13078](https://github.com/QwenLM/qwen-code/issues/13078) — 每日依赖 CVE 审计失败**（11 评论）
 定时安全审计连续失败，可能存在新的高危漏洞或 npm audit 端点不可用，安全敏感用户需关注。

3. **[#13030](https://github.com/QwenLM/qwen-code/issues/13030) — Hosted Workspace 新增只读搜索工具 profile**（9 评论，已关闭）
 为 Hosted Harness 引入 `list_directory` / `glob` / `grep_search` 三个只读工具，扩大托管环境的可用能力，已落地。

4. **[#13458](https://github.com/QwenLM/qwen-code/issues/13458) — `memory.agentMaxTurns` 配置被硬编码 8 覆盖**（5 评论，已关闭）
 用户作用域的 memory dream 忽略配置常量，直接影响后台记忆智能体的预算控制，已修复。

5. **[#13542](https://github.com/QwenLM/qwen-code/issues/13542) — 主分支测试 `holdsRestorePagesInsideThePerPageByteBudget` 全量失败**（P1，3 评论）
 #13355 引入的记录校验破坏了主分支集成测试，每次 `mvn test` 必现，属需要立即处理的 P1 回归。

6. **[#13113](https://github.com/QwenLM/qwen-code/issues/13113) — Session 无法打开："Transcript snapshot is too large to index"**（P1，3 评论）
 `file_history_snapshot` 二次方增长最终突破硬编码的 256 MiB 索引上限，长会话用户数据受损风险高，P1 待人工处理。

7. **[#13517](https://github.com/QwenLM/qwen-code/issues/13517) — web-shell 审批对话框主路径未转义双向/控制字符**（P2 安全，3 评论）
 审批卡片的 `tool.args` 主内容路径存在注入风险，配套修复 PR #13549 已提交。

8. **[#13513](https://github.com/QwenLM/qwen-code/issues/13513) — 系统设置路径环境变量覆盖无文件所有权校验**（P3 安全，3 评论）
 `QWEN_CODE_SYSTEM_SETTINGS_PATH` 可被任意路径劫持，0.24.x 全系受影响，本地提权场景值得关注。

9. **[#13415](https://github.com/QwenLM/qwen-code/issues/13415) — 本地 Qwen3.x 模型被假定 1M 上下文，自动压缩永不触发**（3 评论）
 通过 OpenAI 兼容端点（如 llama.cpp）使用本地模型时，上下文窗口误判导致超过服务端真实上限（如 262K），本地部署用户痛点明显。

10. **[#13538](https://github.com/QwenLM/qwen-code/issues/13538) — 侧查询截断与成功不可区分，web-fetch 可能存储被截断的页面**（P2，3 评论）
 `generateText` 丢弃 `finishReason`，截断的旁路查询结果被静默写入，影响数据正确性。

---

## 四、重要 PR 进展（Top 10）

1. **[#13550](https://github.com/QwenLM/qwen-code/pull/13550) — H4b 子 Session 运行时**（wenshao）
 Managed Agent 扩展运行时 H4 阶段核心分片，实现子 Session 的托管执行，堆叠在 #13505 之上。

2. **[#13505](https://github.com/QwenLM/qwen-code/pull/13505) — H4a 子智能体与父级接受记录契约**
 定义 H4 六个分片的投递地图，为子智能体/工作流/团队协作铺路。

3. **[#13545](https://github.com/QwenLM/qwen-code/pull/13545) — 在绑定 Session 表面强制执行 Workspace 角色模型**（wenshao）
 契约升至 v1.34，Turn 提交/取消/改名/cwd 变更从"创建者检查"升级为"角色/Owner 检查"，关闭 #13535。

4. **[#13544](https://github.com/QwenLM/qwen-code/pull/13544) — 持久化 workspace 角色与 Session 所有者**（wenshao）
 迁移 V48 将授权布尔列替换为 NONE < READER < OPERATOR < OWNER 角色枚举，多租户隔离的基础。

5. **[#13543](https://github.com/QwenLM/qwen-code/pull/13543) — 枚举全部 78 条 HTTP 路由并加入准入门控**（wenshao）
 以单一版本化 `SurfaceRegistry` 枚举公开/WebShell/内部全部接口面，安全治理的基础设施。

6. **[#13549](https://github.com/QwenLM/qwen-code/pull/13549) — web-shell 审批参数预览转义控制字符**（yiliang114）
 修复今日热点安全问题 #13517 的主路径，是审批卡片正常显示时用户实际读取的内容。

7. **[#13174](https://github.com/QwenLM/qwen-code/pull/13174) — 采用下一代 Hosted Harness（G3）**（wenshao）
 Hosted Session 不再绑定首次服务的 Harness 进程代际，Harness 重启后自动被下一代接管而非全部失败——可用性重大改进。

8. **[#13244](https://github.com/QwenLM/qwen-code/pull/13244) — 侧查询输出 token 按实际上下文窗口预算**（yiliang114）
 已经历 11 轮评审，修复侧查询绕过主流程 output token 钳制的问题，衍生 issue #13528/#13538 仍在跟进。

9. **[#13486](https://github.com/QwenLM/qwen-code/pull/13486) — JSONL 前缀读取达到预算即停止**（GoldArowana）
 有界 JSONL 读取在预算满足后立即停止，减少无谓 IO，对 #13113 类的大 transcript 问题有间接缓解意义。

10. **[#13494](https://github.com/QwenLM/qwen-code/pull/13494) — 停止声明不支持的 LSP 动态注册**（shenyankm，已关闭）
 诚实声明六个能力不支持动态注册，修复 #13491 的 JSON-RPC `-32601` 拒绝问题，社区贡献者快速响应的范例。

---

## 五、功能需求趋势

- **Managed Agent / 多智能体（绝对主线）**：Stage D（durable 生命周期）、Stage H（扩展运行时：MCP、Hooks、后台 Shell/Monitor、子智能体、Channels）、G3 Harness 代际接管、actor 角色与租户隔离——占今日 Issue/PR 总量的一半以上，正从“能力堆砌”转向"hardening + 生产启用验收"（#13532 Linux 物理机验收、#13535 租户隔离验收）。
- **会话与 Transcript 可持续性**：大快照增长（#13113）、文件历史保留与恢复（#13124）、恢复分页预算，社区对长会话稳定性诉求强烈。
- **Token/上下文管理精细化**：侧查询预算（#13244/#13538）、本地模型窗口误判（#13415）、models.dev 目录键规范化（#13209）。
- **安全加固**：转义缺陷、环境变量劫持、CVE 审计、HTTP 面枚举与准入门控——安全类 issue 密度明显上升。
- **本地/自托管模型支持**：OpenAI 兼容端点、llama.cpp 场景的兼容性问题持续出现。

---

## 六、开发者关注点

1. **主分支 CI 健康度堪忧**：#13542（P1 测试回归）、#12714、#13503 多个 CI 失败 issue 持续开放，贡献者在 main 上跑全量测试会撞到已知失败。
2. **PR 体量与评审轮次失控**：#13166 达 +4117 行触发"1500 行熔断"、#13244 评审 11 轮、#13110 评审 5 轮以上——大量 follow-up 被延后为独立 issue（#13514、#13528、#13412），形成技术债积压。
3. **配置项形同虚设**：文档承诺的配置被硬编码覆盖（#13458），本地模型用户对上下文窗口误判（#13415）不满，配置一致性需系统性排查。
4. **长会话数据安全**：transcript 超限导致 Session 永久不可打开（#13113）是用户侧最严重的实际损失场景。
5. **memory 写入引发 prompt 重新处理**（#11550，开放近一个月仍未解决）：性能痛点，涉及缓存失效策略。

---

*数据来源：GitHub QwenLM/qwen-code 公开仓库，统计区间为过去 24 小时。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*