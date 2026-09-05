# AI CLI 工具社区动态日报 2026-09-06

> 生成时间: 2026-09-05 22:03 UTC | 覆盖工具: 7 个

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

# AI CLI 工具

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据说明：PR 评论数字段缺失（显示 undefined），排行依据数据源提供的热度排序（列表顺序）推断；所有展示 PR 截止 2026-09-06 均为 **OPEN** 状态。Issues 评论数完整，趋势分析以 Issues 为主依据。

---

## 一、热门 Skills 排行（PR Top 8）

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **skill-creator 评估链修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 修复 `run_eval.py` 恒报 0% recall 的核心缺陷——skill 描述优化循环一直在"对噪声优化"。关联 Issue [#556](https://github.com/anthropics/skills/issues/556)（12 条评论、10+ 独立复现），是社区最痛的 bug | OPEN |
| 2 | **document-typography** ([#514](https://github.com/anthropics/skills/pull/514)) | 修复 AI 生成文档的排版顽疾：孤字换行、孤行标题、编号错位。定位为"用户不会主动要求但每次都受益"的隐性质量 skill | OPEN，讨论持续近 1 个月 |
| 3 | **scnet-hpc** ([#1615](https://github.com/anthropics/skills/pull/1615)) | 基于 profile 的 SSH + Slurm 工作流，操作 SCNet HPC 集群（分区、模块、作业生成）。科学计算场景的代表贡献 | OPEN |
| 4 | **frontend-design 重写** ([#210](https://github.com/anthropics/skills/pull/210)) | 重写官方前端设计 skill，强调"每条指令单轮会话内可执行"，提升清晰度与内部一致性 | OPEN |
| 5 | **元技能双件套** ([#83](https://github.com/anthropics/skills/pull/83)) | skill-quality-analyzer（五维质量评估）+ skill-security-analyzer，用于审计 Skills 本身。存续时间最长的 PR 之一（2025-11 至今） | OPEN |
| 6 | **ODT skill** ([#486](https://github.com/anthropics/skills/pull/486)) | OpenDocument 格式（.odt/.ods）的创建、模板填充与 HTML 转换，补齐开源文档格式空白 | OPEN |
| 7 | **Hivemind 多智能体编排** ([#1628](https://github.com/anthropics/skills/pull/1628)) | 将机械任务委派给运行免费模型的 headless opencode worker，Claude Code 只做规划/审查/合并。核心论点："稀缺资源是上下文，不是智能" | OPEN |
| 8 | **self-audit 质量门** ([#1367](https://github.com/anthropics/skills/pull/1367)) | 交付前审计：先机械验证文件真实性，再按损害严重度做四维推理审计，通用性强 | OPEN，已迭代至 v1.3.0 |

*另有一批高活跃修复类 PR：pdf 大小写引用修复 [#538](https://github.com/anthropics/skills/pull/538)、docx 修订 ID 冲突修复 [#541](https://github.com/anthropics/skills/pull/541)、Windows 兼容修复 [#1099](https://github.com/anthropics/skills/pull/1099) / [#1050](https://github.com/anthropics/skills/pull/1050)。*

---

## 二、社区需求趋势（来自 Issues）

1. **安全与信任边界（最高热度）**：[#492](https://github.com/anthropics/skills/issues/492)（43 条评论，全站最热）指出社区 skill 冒用 `anthropic/` 命名空间分发，构成权限提升风险；[#1175](https://github.com/anthropics/skills/issues/1175) 质疑在 SKILL.md 中写 SharePoint 权限逻辑的安全性。社区迫切需要官方签名/命名空间隔离机制。

2. **组织级分发与共享**：[#228](https://github.com/anthropics/skills/issues/228)（16 条评论、8 👍）要求组织内 skill 共享库，替代当前"下载 .skill 文件走 Slack"的原始流程；[#189](https://github.com/anthropics/skills/issues/189) 反馈双插件安装导致 skill 重复占用上下文。

3. **评估与质量自审工具链**：[#556](https://github.com/anthropics/skills/issues/556)（评估触发率 0%）、[#1390](https://github.com/anthropics/skills/issues/1390)（mcp-builder 评分全零）、[#202](https://github.com/anthropics/skills/issues/202)（skill-creator 违反自身最佳实践）、[#1385](https://github.com/anthropics/skills/issues/1385)（推理质量门提案）——社区在系统性要求"可验证的 skill 质量"。

4. **上下文经济性**：[#1487](https://github.com/anthropics/skills/issues/1487) 报告 claude-api skill 单次注入 ~156k token 耗尽窗口；[#1329](https://github.com/anthropics/skills/issues/1329) 提出 compact-memory（符号化压缩 agent 状态）。"skill 瘦身"成为新议题。

5. **企业平台集成**：ServiceNow ([#568](https://github.com/anthropics/skills/pull/568))、HPC Slurm ([#1615](https://github.com/anthropics/skills/pull/1615))、Buffer API ([#1627](https://github.com/anthropics/skills/pull/1627))、SharePoint ([#1175](https://github.com/anthropics/skills/issues/1175))——skill 正从通用编码向垂直企业工作台渗透。

---

## 三、高潜力待合并 Skills

- **[#1298](https://github.com/anthropics/skills/pull/1298) 评估链修复**：解决被 10+ 人复现的 #556 核心缺陷，与 [#1099](https://github.com/anthropics/skills/pull/1099)、[#1050](https://github.com/anthropics/skills/pull/1050) 形成 Windows/评估修复组合拳，合并优先级最高。
- **[#1367](https://github.com/anthropics/skills/pull/1367) self-audit**：有 [#1385](https://github.com/anthropics/skills/issues/1385) 提案铺垫 + 版本迭代至 v1.3.0，需求与成熟度兼备。
- **[#1607](https://github.com/anthropics/skills/pull/1607) claude-api 模型退役标记**：小而明确的文档修复，直接解决官方 Issue #1603。
- **[#538](https://github.com/anthropics/skills/pull/538) / [#541](https://github.com/anthropics/skills/pull/541) / [#539](https://github.com/anthropics/skills/pull/539)**：Lubrsy706 的文档 skill 精准修复系列（大小写、OOXML ID 冲突、YAML 校验），典型低风险高价值 PR。
- **[#514](https://github.com/anthropics/skills/pull/514) document-typography**：存续 5 个月+持续更新，覆盖所有文档生成场景。

---

## 四、

---

# Claude Code 社区动态日报
**日期：2026-09-06 | 数据来源：github.com/anthropics/claude-code**

---

## 一、今日速览

过去 24 小时无新版本发布，社区注意力集中在 **Desktop 应用质量问题**上：窗口置顶、焦点抢占类 Issue 持续发酵（#88093 已获 41 👍，相关重复报告 #87895 高达 72 👍）。今日新增多个 Desktop 端 Bug，涉及权限默认值失效、终端面板闪烁抢焦点等。唯一活跃 PR 为安全规则 glob 匹配修复，值得安全敏感团队关注。

---

## 二、社区热点 Issues

**1. [#88093](https://github.com/anthropics/claude-code/issues/88093) — Windows 端窗口始终置顶（19 评论 / 41 👍）**
Claude Desktop (Windows) 主窗口悬浮于所有应用之上且无关闭选项。此前 macOS 版同类报告 [#66516](https://github.com/anthropics/claude-code/issues/66516) 和 Windows 版 [#87895](https://github.com/anthropics/claude-code/issues/87895)（72 👍）均被标记 invalid 关闭，社区对跨平台置顶 Bug 的反馈强烈但处置路径不明。

**2. [#80177](https://github.com/anthropics/claude-code/issues/80177) — iOS Simulator 面板在 macOS 27.0 beta 上崩溃循环（18 评论）**
辅助进程 `claude-ios-sim` 因未捕获的 `NSException` 持续崩溃，面板卡死在 "Attach a simulator"。影响新系统上的 iOS 模拟器调试工作流。

**3. [#81833](https://github.com/anthropics/claude-code/issues/81833) — git worktree 会话中 auto-memory 加载不一致（16 评论，has repro）**
同一仓库、同一天的 worktree 会话，有的完整加载 `MEMORY.md`，有的完全不加载记忆。记忆可靠性问题直接影响多 worktree 用户的日常体验。

**4. [#92016](https://github.com/anthropics/claude-code/issues/92016) — Desktop 自动拒绝 CLI 原生 SendMessage，破坏子代理恢复（14 评论，回归）**
Desktop 1.46388.1 在 Code 标签页中自动拒绝 `SendMessage` 工具，导致 subagent 无法恢复；Desktop 的替代实现仅覆盖 session-to-session 场景。CLI 与 Desktop 功能不对齐的典型案例。

**5. [#55206](https://github.com/anthropics/claude-code/issues/55206) — Windows Cowork sandbox 可创建文件但 unlink 被拒（14 评论）**
挂载宿主目录上所有 git 写操作（涉及删除文件的 commit/rebase 等）全部失败。该 Issue 自 5 月初提交至今未修复，是 Windows 端长期痛点。

**6. [#82131](https://github.com/anthropics/claude-code/issues/82131) — Autocompact 抖动：压缩后 3 轮内再次触顶（10 评论）**
连续 3 次 compact 后上下文迅速回满，用户陷入"压缩-膨胀"循环，长会话效率受损。

**7. [#37780](https://github.com/anthropics/claude-code/issues/37780) — IS_DEMO 环境变量绕过工作区信任提示（9 评论，已关闭）**
`IS_DEMO` 会抑制信任提示但不授予信任，导致 statusline 和 hooks 失效。涉及环境变量

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报

**日期：2026-09-06** | 数据来源：[github.com/openai/codex](https://github.com/openai/codex)

---

## 一、今日速览

Codex 发布 **rust-v0.153.4**，修复 Astra 模型在模型选择器中的可见性问题并将其设为捆绑默认模型。社区侧，**Windows + WSL2 环境下无法创建项目的阻断性 Bug**（#41463，29 条评论）持续发酵，且在新版本中复现（#42984）；开发侧，一批语音（Voice）相关 PR 密集合入，暗示实时语音功能正在加速构建。

---

## 二、版本发布

### rust-v0.153.4
- **修复 Astra 在捆绑模型选择器中的可见性**，并在未显式配置模型时将 Astra 设为捆绑默认模型（#42874）
- **更新 Astra 使用指引**：仅在会话中该工具可用时才使用异步提问（#42878）

> 点评：Astra 正在被推为默认模型，但社区已有 #43062、#43103 等反馈 Astra 在长任务中的压缩挂起与不收敛问题，默认模型切换后此类反馈可能增多。

---

## 三、社区热点 Issues（Top 10）

### 1. [Windows + WSL] 无法创建项目 – AbsolutePathBuf 反序列化失败
[#41463](https://github.com/openai/codex/issues/41463) | bug | 29 评论 | 19 👍
最热 Issue。Windows 桌面版使用 WSL2 时项目创建完全阻断，错误指向 `AbsolutePathBuf` 在无 base path 时反序列化失败。已持续一周未修复，影响 WSL 用户的核心工作流。

### 2. [Windows + WSL2] 切换环境后项目创建失败（同一错误复现）
[#42984](https://github.com/openai/codex/issues/42984) | bug | 4 评论
昨日新增报告，从 Windows 原生模式切换到 WSL 后同样触发 `AbsolutePathBuf` 迁移错误——证明 #41463 未在新版本中修复，问题仍在蔓延。

### 3. [Windows 10] 工具调用后 DWM Composition 句柄持续累积
[#33192](https://github.com/openai/codex/issues/33192) | bug/performance | 19 评论
可控实验复现：每次含终端工具调用的任务使 DWM `Composition` 句柄增长（5 次调用增长 22），疑为图形资源泄漏，长期运行将拖垮系统。

### 4. TUI 请求隐藏工具调用/输出
[#18396](https://github.com/openai/codex/issues/18396) | enhancement | 12 评论 | **30 👍（今日最高赞）**
CLI 用户强烈要求可折叠/隐藏冗长的工具调用输出。作为高赞老 Issue 持续活跃，反映 TUI 信息密度管理是 CLI 用户核心痛点。

### 5. macOS 重复性 OOM：内存飙升至 40–59 GB
[#35994](https://github.com/openai/codex/issues/35994) | bug/performance | 9 评论
子进程失控导致 Codex/ChatGPT 内存暴涨至 40–59 GB，附完整截图证据。跨平台性能问题（与 #33192 呼应）值得官方优先排查。

### 6. Windows IDE 扩展无法执行命令：helper_unknown_error
[#39933](https://github.com/openai/codex/issues/39933) | bug | 11 评论
VS Code 扩展在 Windows 上因 `setup refresh had errors` 无法执行任何命令，基本不可用。另有 #42971 报告该错误同样阻断桌面 helper。

### 7. 路径转义 Bug：`Z:\AREA_01` 被序列化为 `Z:\AREA\_01`
[#41486](https://github.com/openai/codex/issues/41486) | bug | 7 评论
UI 显示正确但发送给模型的路径中下划线被错误转义，导致模型操作错误文件。典型的序列化层 Bug，影响面可能超出 Windows。

### 8. Windows 桌面版持续闪烁（AMD 集显）
[#39846](https://github.com/openai/codex/issues/39846) | bug | 10 评论
Ryzen 7 9700X + Radeon 集显环境下桌面端持续闪烁。与 macOS 闪烁问题（#35101，5 评论）并存，指向跨平台渲染层缺陷。

### 9. 上下文压缩挂起 20+ 分钟且停止后立即重启
[#43062](https://github.com/openai/codex/issues/43062) | bug | 2 评论
GPT-6 Astra Ultra 长线程中自动压缩挂起超过 20 分钟，用户主动停止后立即重新触发。与 #32922（压缩丢失目标上下文）、#43103（Astra 不收敛）共同构成 Astra + 压缩的可靠性问题集群。

### 10. [Windows][Pets] 输入区域偏移 & 重启后点击穿透
[#42661](https://github.com/openai/codex/issues/42661) | bug | 9 评论
桌面宠物功能在多显示器 + 高 DPI 下点击区域偏移、重启后永久点击穿透。同日新增 #42945 报告类似问题，新功能质量问题集中暴露。

---

## 四、重要 PR 进展（Top 10）

> 今日 PR 几乎全部由 @copyberry[bot] 提交并已合入（CLOSED），其中**语音功能系列 PR 占比近半**，是明显的开发主线。

### 语音 / 实时通信系列
1. **[#43097](https://github.com/openai/codex/pull/43097) 新增 helper 支持的 Realtime WebRTC 会话 API** — 提供 `RealtimeWebrtcSession` 及可克隆句柄，覆盖启动、协商、音频控制、电平表与错误上报，是语音功能的会话基石。
2. **[#43079](https://github.com/openai/codex/pull/43079) 语音 helper 增加本地音频设备支持（opt-in）** — 新增 `openDevices`/`setAudioControls` 协议，基于 CPAL 实现跨 macOS/Linux/Windows 麦克风与扬声器接入。
3. **[#43090](https://github.com/openai/codex/pull/43090) voice-host 通过 RTP 发送处理后的麦克风音频** — 将采集音频重采样后接入输出媒体轨，保留静音边界并限制陈旧音频。
4. **[#43100](https://github.com/openai/codex/pull/43100) 有界的入站 Opus RTP 处理** — 限制 64 包 / 2 MiB 待处理上限，防止媒体队列无限增长。

### 核心功能与稳定性
5. **[#43069](https://github.com/openai/codex/pull/43069) 交互式会话与 fork 支持 managed worktrees** — 将此前仅限 `codex exec` 的 `--worktree` 扩展到交互式会话，启动前解析目标 checkout 的配置与策略。
6. **[#43043](https://github.com/openai/codex/pull/43043) Agents 概览初始化不再触发文件系统扫描** — 初始最近线程列表改用 `use_state_db_only`，直接回应启动性能类反馈。
7. **[#43031](https://github.com/openai/codex/pull/43031) 刷新后的 MCP 工具目录与其客户端绑定** — 修复连接复用时刷新的 Apps 目录丢失、并使无关服务器调用失效的问题。
8. **[#43039](https://github.com/openai/codex/pull/43039) 通过 `app/installed` 刷新线程实时工具** — 修复强制刷新只更新独立快照、不作用于后续 turn 的问题。
9. **[#43005](https://github.com/openai/codex/pull/43005) / [#43002](https://github.com/openai/codex/pull/43002) Guardian V2 可观测性增强** — 为分类失败添加 `failure_reason` 标签、新增 WebSocket 连接时长指标；Guardian ticket 替换为 `parent_response_id`，避免重试继承失败响应的 ID。
10. **[#43110](https://github.com/openai/codex/pull/43110) 在会话历史中记录 reasoning effort 变更（feature flag 控制）** — 为 OpenAI 模型追加可信的 `configuration_update` 记录，默认关闭；配合 #43104（Guardian 线程上下文迁入 `guardianv2` 配置）可见配置体系正在重构。

---

## 五、功能需求趋势

| 趋势方向 | 依据 | 热度 |
|---|---|---|
| **Windows 平台稳定性** | 今日 Top 30 Issue 中约半数带 `windows-os` 标签，覆盖 WSL、闪烁、句柄泄漏、路径处理 | 🔥🔥🔥 |
| **内存 / 资源管理** | #33192（DWM 句柄）、#35994（macOS OOM 59GB）跨平台并发 | 🔥🔥🔥 |
| **上下文压缩可靠性** | #43062、#32922、#43103 均指向压缩挂起/丢上下文/任务不收敛 | 🔥🔥 |
| **会话与线程管理** | 账户切换丢历史（#43107、#42971）、旧线程不可见（#26634）、孤立 turn（#41591）、归档删除残留（#43106） | 🔥🔥 |
| **TUI 输出精简** | #18396 以 30 👍 居首，CLI 用户需要可折叠的工具调用输出 | 🔥🔥 |
| **Astra 模型适配** | 新版将 Astra 设为默认，但社区已有 3 条相关行为反馈 | 🔥 |
| **语音功能（供给侧）** | 8+ 条语音 PR 密集合入：WebRTC、RTP、Opus、本地设备 | 官方主线 |

---

## 六、开发者关注点

1. **WSL 用户被阻断**：`AbsolutePathBuf` 反序列化错误已持续一周且在新版本复现（#41463 → #42984），Windows + WSL 用户暂时只能回退原生模式。
2. **长任务可靠性下降**：Astra + 自动压缩的组合出现挂起 20 分钟、目标上下文丢失、任务反复重做等问题，建议长线程用户关注压缩行为异常。
3. **资源泄漏需主动监控**：Windows 句柄累积与 macOS 内存暴涨均可在数日内劣化系统，建议定期重启客户端。
4. **路径含下划线的项目需警惕**：#41486 的转义 Bug 可能让模型操作错误文件，提交路径前建议人工核对。
5. **CLI 体验改进在路上**：`/copy` 支持复制 status 输出（#43055）、交互式 worktree（#43069）、启动去文件系统扫描（#43043）均已合入，CLI 工作流持续打磨。

---

*本日报基于过去 24 小时 GitHub 公开数据自动整理，共监控 50 条 Issue 更新与 36 条 PR 更新。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-09-06 | 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)**

---

## 一、今日速览

今日社区最突出的动态是**模型解析静默改写 Bug**（[#29213](https://github.com/google-gemini/gemini-cli/issues/29213)）在报告后 24 小时内即收到两份社区修复 PR，响应速度惊人。夜间版本 `v0.60.0-nightly` 聚焦**安全加固**，包含扩展环境变量治理与工作区路径边界检查。此外，**子代理稳定性问题**（挂起、虚假成功上报）仍是 Issue 区最高频的痛点。

---

## 二、版本发布

### [v0.60.0-nightly.20260905.g85aca163f](https://github.com/google-gemini/gemini-cli/releases)
| 模块 | 更新内容 |
|---|---|
| extensions | 环境变量变更时弹出用户确认（consent）提示，并对可改变运行时的环境变量进行清洗 |
| core | 增强命令安全检查中的工作区路径边界校验与符号链接解析 |

> 点评：两项均为安全向修复，与近期社区密集提交的安全类 PR 方向一致，显示项目正系统性收紧沙箱与路径逃逸防线。

---

## 三、社区热点 Issues（Top 10）

### 🔴 P1 级缺陷

**1. [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — 子代理达到 MAX_TURNS 后误报"GOAL 成功"**（13 评论）
`codebase_investigator` 子代理在达到最大轮次限制、未完成任何分析的情况下，仍上报 `status: "success"`。这直接掩盖了任务中断事实，**动摇用户对 Agent 结果的可信度**，是当前评论最多的 Issue，已进入需复测阶段。

**2. [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — 通用 Agent 无限挂起**（8 👍 / 8 评论）
Generalist agent 连创建文件夹这类简单操作都会永久挂起（用户等待长达 1 小时），唯一 workaround 是显式禁止使用子代理。8 个 👍 表明受影响面较广。

**3. [#29213](https://github.com/google-gemini/gemini-cli/issues/29213) — `gemini-2.5-flash` 被静默映射为 `gemini-3.5-flash`**（4 评论，9月4日新建）
Vertex AI 后端下显式指定的模型被自动改写，导致无 3.5 Flash 权限的环境直接请求失败。**从报告到出现两份修复 PR 仅用一天**，是本周响应最快的 Bug。

**4. [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 命令执行完毕后卡在"Waiting input"**（3 👍）
简单命令执行完成后界面仍显示"等待用户输入"且命令状态挂起，影响交互式使用的核心体验。

**5. [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser 子代理在 Wayland 下失败**
Linux Wayland 桌面环境下浏览器子代理无法工作，阻碍 Linux 用户的浏览器自动化场景。

### 🟡 P2 级重要议题

**6. [#19873](https://github.com

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-09-06 | 数据来源：github.com/github/copilot-cli**

---

## 一、今日速览

GitHub Copilot CLI 发布 **v1.0.84-1**，新增对 **GPT-6 Astra** 模型的支持。过去 24 小时共有 20 条 Issue 更新、0 条 PR 更新，社区讨论焦点集中在**升级引发的回归问题**（自动更新破坏桌面应用、Worktree 会话失效）和**运行稳定性**（Linux 内存溢出崩溃），MCP 工具生态的可靠性问题也在集中暴露。

---

## 二、版本发布

### v1.0.84-1
- **Added**: 新增 GPT-6 Astra 模型支持

> 说明：本版本为功能新增型更新，建议关注升级后模型切换行为是否与 [#4732](https://github.com/github/copilot-cli/issues/4732) 中报告的自动降级问题相关。

---

## 三、社区热点 Issues（Top 10）

### 1. 允许取消或移除已排队的消息 [#1857](https://github.com/github/copilot-cli/issues/1857)
**[OPEN] | 👍 28 | 💬 11 | 3 月至今**
今日互动量最高的 Issue。用户通过 `Ctrl+Q` / `Ctrl+Enter` 排队的消息在 agent 忙碌或 `/compact` 期间无法取消或删除，只能被动等待依次执行。作为开放半年的老牌痛点，社区呼声持续高涨，是键盘输入领域最被期待的能力补齐。

### 2. 自动更新覆写 copilot.exe，破坏桌面应用捆绑的 CLI [#4728](https://github.com/github/copilot-cli/issues/4728)
**[OPEN] | 新增**
严重性较高的安装机制问题：在终端运行 `copilot` 触发自动更新时，会重写 GitHub Copilot 桌面应用自带的 CLI，导致应用无法恢复任何已有会话（"Session unavailable"）。CLI 与桌面应用的更新边界划分值得维护者优先处理。

### 3. Linux 上频繁 JavaScript 堆内存溢出 [#4725](https://github.com/github/copilot-cli/issues/4725)
**[OPEN] | 👍 0 | 💬 1**
CLI 每隔几分钟即崩溃，堆占用逼近 4GB，日志显示 Mark-Compact 后仍无法释放，疑似内存泄漏。直接影响 Linux 用户可用性的稳定性缺陷。

### 4. 升级 desktop 2.98.0 / runtime 1.1.15 后所有 Worktree 会话报 "Worktree missing" [#4734](https://github.com/github/copilot-cli/issues/4734)
**[OPEN] | 新增**
升级引入的回归：应用自动更新后，**所有**基于 Worktree 的项目会话（含新建会话）均无法使用。属于阻断级问题，建议升级前观望。

### 5. tools/list 刷新超时导致 MCP 服务器的工具被永久剥离 [#4731](https://github.com/github/copilot-cli/issues/4731)
**[OPEN] | 新增**
当工具调用超时被取消后，运行时会立即向**刚被放弃的同一服务器**派发 `tools/list` 刷新，该刷新同样超时，进而导致此服务器的工具在进程整个生命周期内不可用。MCP 可靠性的典型链条式故障。

### 6. 内置 research agent 指示子代理调用不存在的 github/get_me 工具 [#4729](https://github.com/github/copilot-cli/issues/4729)
**[OPEN] | 新增**
Agent 提示词与实际暴露的 MCP 工具集不匹配：子代理按提示词尝试调用 `github/get_me` 失败后，可见地浪费推理步骤尝试调和，甚至泄露内部提示内容。提示词与工具注册需同步治理。

### 7. Canvas open_canvas 参数被 CLI 破坏（JSON-RPC 序列化 Bug）[#4721](https://github.com/github/copilot-cli/issues/4721)
**[OPEN] | 新增**
CLI 在向 Canvas 扩展派发工具调用时会破坏 JSON-RPC 参数——解析后的参数被拼接 `}{}` 后缀，产生截断在值中间的非法 JSON。扩展生态互操作性的底层缺陷。

### 8. WSL2 下 Ctrl+H 被误判为 Ctrl+Backspace [#4328](https://github.com/github/copilot-cli/issues/4328)
**[OPEN] | 💬 7**
根因是 Windows Terminal 的 `WT_SESSION` 环境变量泄露进 WSL2，导致"删除前一字符"变成"删除整个单词"。7 条评论保持活跃讨论，是跨平台终端输入检测的代表性案例。

### 9. 按模型 Prompt Cache TTL 对齐的空闲自动压缩 [#4724](https://github.com/github/copilot-cli/issues/4724)
**[OPEN] | 新增 |

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期**：2026-09-06 | **数据来源**：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

## 📌 今日速览

今日社区整体活跃度较低：无新版本发布、无 PR 更新，Issue 板块仅 2 条动态。其中一条是新提交的 VS Code 扩展流式渲染丢字符 Bug（#2635），另一条是历时约 6 个半月的第三方 Coding Agent 文档完善请求正式关闭（#1210）。

---

## 🚀 版本发布

过去 24 小时无新版本发布。

---

## 🔥 社区热点 Issues

> 说明：过去 24 小时内仅 2 条 Issue 有更新，今日全部呈现如下（不足 10 条）。

### 1. VS Code 扩展：流式聊天文本在渲染/复制层丢失个别字符（OPEN，新提交）

**#2635** · @TserenTserenov · 创建于 2026-09-05 · 评论 0 · 👍 0
🔗 https://github.com/MoonshotAI/kimi-cli/issues/2635

**为什么重要**：这是一份定位清晰的高质量 Bug 报告——报告者通过对比 session wire log 确认模型原始输出完整无损，问题被精确隔离到扩展端的渲染或面板复制层。该缺陷直接影响所有依赖聊天面板阅读、复制 AI 回复的用户，属于核心体验问题。对维护者而言，问题域已被收窄到 VS Code 扩展的流式渲染管线，排查成本大幅降低。

**社区反应**：刚提交不足一天，暂无官方回复，建议持续关注后续响应与修复进展。

### 2. [enhancement] 完善"在第三方 Coding Agent 中使用"的文档（CLOSED）

**#1210** · @bosens-China · 创建于 2026-02-23 · 更新于 2026-09-05 · 评论 1 · 👍 0
🔗 https://github.com/MoonshotAI/kimi-cli/issues/1210

**为什么重要**：该请求指出两点核心诉求——其一，关于“在 Claude Code 中使用 tab 键切换 Kimi K2 Thinking 模型”的说明过于简略；其二，每次都需手动 `export` 环境变量的方式不便，建议参考智谱（BigModel）的 Claude Code 接入文档，提供配置化的持久方案。今日正式关闭，可能意味着相关文档已更新或有官方回应，建议查看关闭时的关联说明。

**社区反应**：1 条评论，从提交到关闭历时约 6 个半月，反映了跨工具接入文档是长期存在的社区诉求。

---

## 🔧 重要 PR 进展

过去 24 小时无 PR 更新。

---

## 📈 功能需求趋势

基于近期 Issue 信号（今日样本有限，供参考）：

1. **第三方 Coding Agent 集成体验**：社区持续关注在 Claude Code 等工具中接入 Kimi 的文档完整度与配置便利性（#1210）。环境变量反复 export 是明确痛点，配置文件或一次性初始化方案是期望方向。
2. **VS Code 扩展质量与稳定性**：流式渲染丢字问题（#2635）表明扩展端显示层仍是薄弱环节，涉及 UI 渲染与复制链路的保真度，需重点关注。

---

## 🧑‍💻 开发者关注点

- **配置摩擦**：每次会话手动 `export` API 相关变量被认为不便，开发者期望对标智谱等厂商，提供配置文件或持久化的接入方案。
- **流式输出保真度**：即使模型输出本身无损，渲染层丢字也会直接影响代码复制的可靠性，侵蚀用户对扩展的信任。
- **文档深度**：对“在第三方 Agent 中使用 Kimi”这类跨工具场景，社区希望看到更完整的操作指引，包括模型切换快捷键等细节说明。

---

*数据统计窗口：过去 24 小时（截至 2026-09-06）。今日为低活跃日，建议结合后续几日动态综合判断趋势。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：2026-09-06** | 数据来源：[anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 📌 今日速览

OpenCode 发布 **v1.18.29**，修复了 OpenAI 订阅用户无法看到 `gpt-6-astra` 等整数版本号模型的 OAuth 过滤问题。今日社区最值得关注的动态是**多个热门 Issue 迎来了对应修复 PR**（输出上限、可点击文件路径、commentary 通道），同时自动化 PR 清理机制集中关闭了 3 个停滞 PR，其中 HTTP 408 重试修复已被作者重新提交。Memory Megathread 讨论热度持续，评论数已达 140 条。

---

## 🚀 版本发布

### [v1.18.29](https://github.com/anomalyco/opencode/releases)
- **修复 Codex OAuth 模型过滤逻辑**：现在能正确识别整数版本号的 GPT 模型（如 `gpt-6`）
- 修复 OpenAI 订阅用户看不到 `gpt-6-astra` 的问题
- 感谢 2 位社区贡献者（含 @Peter267 的中文文档加粗渲染修复）

---

## 🔥 社区热点 Issues

1. **[#20695](https://github.com/anomalyco/opencode/issues/20695) Memory Megathread** | 140 评论 · 108 👍
   官方集中处理内存问题的汇总帖，维护者明确要求不要用 LLM 生成解决方案，而是收集堆快照。运行 5 个月仍是社区最高优先级问题，反映内存泄漏是当前最普遍的痛点。

2. **[#29363](https://github.com/anomalyco/opencode/issues/29363) `limit.output` 被静默限制在 32k** | 19 评论 · 17 👍
   配置中的 `limit.output`（如 DeepSeek 的 384000）被静默截断为 32000，唯一逃生门是实验性环境变量。**好消息：PR #47532 已提交针对性修复。**

3. **[#19466](https://github.com/anomalyco/opencode/issues/19466) 空闲等待时 CPU 占用 ~50%** | 17 评论 · 16 👍
   等待 API 限流重试期间（"doing nothing"）单核占用高达 50%（i9-14900），长时间未修复，影响后台常驻用户。

4. **[#35486](https://github.com/anomalyco/opencode/issues/35486) DeepSeek v4 Flash 持续 Internal Server Error** | 14 评论
   OpenCode Go 用户即使新建会话、清缓存仍报错，是今日 Go 服务稳定性投诉的典型代表。

5. **[#27963](https://github.com/anomalyco/opencode/issues/27963) Windows 可执行文件损坏** | 11 评论 · 6 👍
   v1.15.3 起在 Win10/11 上报 "not a valid application"，安装即失败的严重问题，持续影响 Windows 用户。

6. **[#37891](https://github.com/anomalyco/opencode/issues/37891) Desktop 聊天中的文件路径不可点击** | 7 评论
   路径看起来像链接但无法打开到编辑器/Finder。**PR #47528 已提交实现，社区期待度高。**

7. **[#37239](https://github.com/anomalyco/opencode/issues/37239) [2.0] service restart 陷入静默重试循环** | 6 评论
   `opencode2 service restart` 触发后台服务连续 ~16 次静默失败重启（约 2.5 分钟），需手动杀进程，影响 2.0 升级体验。

8. **[#47168](https://github.com/anomalyco/opencode/issues/47168) 未实现的 `commentary` 通道导致回合提前结束** | 4 评论
   GPT 系统提示词要求模型在 `commentary` 通道发送进度更新，但该通道未被实现——在 chat-completions 模型上每次进度更新都会终结回合。**PR #47355 已提交修复。**

9. **[#36443](https://github.com/anomalyco/opencode/issues/36443) [2.0] 事件订阅未按客户端兴趣隔离** | 3 评论
   `/api/event` 让每个 TUI 接收全局所有事件，服务端负载随连接数而非兴趣数扩展，是 2.0 架构层面的性能关键项。

10. **[#47494](https://github.com/anomalyco/opencode/issues/47494) [Desktop 1.18.29] 本地项目无法重命名/图标不更新** | 2 评论
    针对最新版本的新报障：非 git 本地文件夹作为项目时，重命名静默失败、侧边栏图标不刷新。

---

## 🔧 重要 PR 进展

| PR | 内容 | 状态 |
|---|---|---|
| [#47532](https://github.com/anomalyco/opencode/pull/47532) | 将解析后的输出上限真正传递到模型请求生成，直接修复 #29363 的 32k 静默截断 | OPEN |
| [#47528](https://github.com/anomalyco/opencode/pull/47528) | 聊天消息中的内联文件路径（如 `src/app.tsx:301`）变为可点击，对应需求 #37891 | OPEN |
| [#47355](https://github.com/anomalyco/opencode/pull/47355) | 对 chat-completions 模型移除 `commentary` 通道提示，修复 #47168 的回合中断 | OPEN |
| [#47527](https://github.com/anomalyco/opencode/pull/47527) | `/stats` 性能优化：实测从 20.78s 降到响应式级别，改为异步聚合避免阻塞服务端 | OPEN |
| [#47536](https://github.com/anomalyco/opencode/pull/47536) | 支持 Astra Responses 异步函数调用与实时纯文本转向 | OPEN（草案） |
| [#46912](https://github.com/anomalyco/opencode/pull/46912) | 退出前等待 stdout 写入完成，修复管道 JSON 被截断问题 | OPEN |
| [#43681](https://github.com/anomalyco/opencode/pull/43681) | Amazon One Medical 团队贡献：V2 正确解析 Bedrock AWS profile 凭证 | OPEN |
| [#47524](https://github.com/anomalyco/opull/47524) | HTTP 408 请求超时重试，**替代被自动清理关闭的 #39413**，已 rebase 到新版 retry.ts | OPEN |
| [#43128](https://github.com/anomalyco/opencode/pull/43128) | 提交/换行快捷键可在设置中自定义，运行近 3 周等待合并 | OPEN |
| [#47539](https://github.com/anomalyco/opencode/pull/47539) | 项目身份变化后保持会话在目录级选择器中可见，修复会话"消失" | OPEN |

**其他动态**：自动化 PR 清理今日关闭了 3 个停滞 PR（[#39413](https://github.com/anomalyco/opencode/pull/39413)、[#39407](https://github.com/anomalyco/opencode/pull/39407)、[#37741](https://github.com/anomalyco/opencode/pull/37741)）；本地插件热重载修复 [#47537](https://github.com/anomalyco/opencode/pull/47537) 已合入关闭。

---

## 📈 功能需求趋势

- **Desktop/Web 体验补齐**：可点击文件路径（#37891）、Web UI 浏览器通知（[#47479](https://github.com/anomalyco/opencode/issues/47479)）、TUI 图片粘贴/拖拽（[#44310](https://github.com/anomalyco/opencode/issues/44310)）——多端功能对齐是高频诉求。
- **性能与资源占用**：内存泄漏（#20695）、空闲 CPU 占用（#19466）、事件订阅隔离（#36443）、stats 加速（PR #47527）构成完整的性能主线。
- **2.0 插件体系完善**：`permission.evaluate` 的 ask 判定被忽略（[#47495](https://github.com/anomalyco/opencode/issues/47495)）、插件热重载（PR #47537）显示插件 API 可靠性仍在打磨。
- **模型/网关兼容性**：GPT-6-astra 过滤、DeepSeek v4 稳定性、Muse Spark 推理流转发（[#43584](https://github.com/anomalyco/opencode/issues/43584)）、Grok 4.6 拒收 metadata 字段（#47496）——新模型适配持续产生长尾问题。
- **本地/私有部署**：LAN 提供商自动发现（PR [#27554](https://github.com/anomalyco/opencode/pull/27554)）等待 4 个月，Bedrock 凭证支持（PR #43681）反映企业用户需求。
- **运行时升级**：捆绑 Bun 从 1.3.14 升级到 1.4.x（[#44945](https://github.com/anomalyco/opencode/issues/44945)）。

---

## ⚠️ 开发者关注点

1. **OpenCode Go 订阅与配额信任危机**：今日集中出现多起投诉——配额按百分比而非美元计算导致提前拒绝服务（

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报

**日期：2026-09-06 | 数据来源：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

---

## 一、今日速览

Qwen Code 发布 **v0.23.1-preview.0**，核心亮点是 Web Shell 动态工作流的可视化管理能力（PR #10594）。今日社区讨论聚焦两大方向：一是**导出（export）性能问题集中爆发**——空会话导出 HTML 高达 19.5 MB，多个 P1/P2 Issue 密集跟进；二是 **daemon 后台任务可靠性**——后台 shell 输出丢失、会话无法回收等问题成为 P1 级关注点。此外，通过 ACP 协议将子 Agent 委托给外部 Agent（首选 Claude Code）的 PR #11003 是架构层面的一项重要探索。

---

## 二、版本发布

### v0.23.1-preview.0（另有 v0.23.0-nightly.20260905 同步包含）

- **feat(web-shell)**: 动态工作流运行的可视化与管理（PR #10594，@qqqys）
- **perf(web-shell)**: 会话工作流项目的派生优化

> 解读：工作流可视化落地 Web Shell，配合同日多条 workflow 相关 perf Issue（#10865），表明 workflow 体验是当前迭代主线。

---

## 三、社区热点 Issues（Top 10）

### 🔴 P1 级

**1. [#11031](https://github.com/QwenLM/qwen-code/issues/11031) 导出 HTML 内嵌完整 Web Shell 运行时，空会话即 19.5 MB**
导出架构将 `WebShellTranscript` 可达的完整浏览器依赖图内嵌进每个 HTML 文件。属导出体验的根因级问题，后续 #11091、#11100、#11096 均为其衍生。

**2. [#11119](https://github.com/QwenLM/qwen-code/issues/11119) serve 模式下后台 shell 输出与唤醒通知在会话运行时回收时被静默丢弃，导致会话卡死**
daemon 托管会话中后台任务持续产出但通知丢失。当天已有对应修复 PR #11132 快速响应。

**3. [#10879](https://github.com/QwenLM/qwen-code/issues/10879) 发布主机 hk4 仍携带共享 ecs-qwen 标签，发布任务与 PR CI 抢占资源**
状态 ready-for-human。反映发布基础设施的资源隔离问题，与 #11109 共同构成今日 CI 议题。

### 🟡 P2 级

**4. [#11091](https://github.com/QwenLM/qwen-code/issues/11091) Mermaid（约 6 MB）仍被打平进导出转录渲染器**
#9812 合并后渲染器已外置至 unpkg 并以 SHA-384 SRI 锁定，但 Mermaid 体积问题残留，6 条评论为今日最热讨论之一。

**5. [#11118](https://github.com/QwenLM/qwen-code/issues/11118) 执行 cron/goal/monitor 工作的会话永远无法被回收**
子进程对"忙碌"的两种判定不一致，导致 daemon 会话泄漏，属后台自动化路线图的关键堵点。

**6. [#11096](https://github.com/QwenLM/qwen-code/issues/11096) main 分支构建的导出指向 404 的 unpkg URL**
`0.23.0` 在 #9812 合并前发布，tarball 缺少 `export-transcript-document.js`——典型的版本与代码演进不同步问题。

**7. [#11109](https://github.com/QwenLM/qwen-code/issues/11109) release.yml 重复执行已完成的工作，其中一个 20 分钟步骤什么都没验证**
当日两次发布运行超时，发布流水线效率问题实际影响了交付节奏。

### 🟢 功能与体验

**8. [#5883](https://github.com/QwenLM/qwen-code/issues/5883) 提案：将聊天面板统一收敛至 web-shell（覆盖 Web/VSCode webview/桌面端）**
架构级提案，决定三端 UI 的统一路径，持续讨论近三个月。

**9. [#11112](https://github.com/QwenLM/qwen-code/issues/11112) Web Shell 新增模型无法选中，报 "Set model failed: Invalid params"**
dogfooding 标签的配置类问题，模型管理页面基础体验缺陷。

**10. [#11111](https://github.com/QwenLM/qwen-code/issues/11111) 会话搜索应匹配对话内容而非仅标题**
对标 Codex 的搜索体验，属高频用户诉求。

---

## 四、重要 PR 进展（Top 10）

| PR | 内容 | 意义 |
|---|---|---|
| [#11132](https://github.com/QwenLM/qwen-code/pull/11132) | 会话重绑时重发被丢弃的后台 shell 通知 | 直接修复今日 P1 Issue #11119，通知改为延迟重放而非丢弃 |
| [#11003](https://github.com/QwenLM/qwen-code/pull/11003) | 通过 ACP 将子 Agent 回合委托给外部 Agent（首发 Claude Code） | 架构级能力：subagent 定义 `executor` 块即可外置执行，事件流原样重发布，打开多 Agent 互操作空间 |
| [#10043](https://github.com/QwenLM/qwen-code/pull/10043) | 降低虚拟化历史记录滚动延迟 | 前沿触发 + 感知 deadline 的调度策略，长会话滚动体验优化 |
| [#10841](https://github.com/QwenLM/qwen-code/pull/10841) | 扩展技能以 `<扩展名>:<技能名>` 命名 | 解决技能命名冲突，`rust:pdf` 风格的命名空间隔离 |
| [#8927](https://github.com/QwenLM/qwen-code/pull/8927) | channel 级 `sessionRotation` 限制会话生命周期 | 支持 `maxTurns` 等边界，长驻路由会话可自动轮换 |
| [#10347](https://github.com/QwenLM/qwen-code/pull/10347) | 瞬时网络错误（EOF）自动重试 | 无法使用 Ctrl+Y 的场景（channel/后台）下的关键韧性修复 |
| [#10899](https://github.com/QwenLM/qwen-code/pull/10899) | 钉钉后台 Agent 聚合推送改为可选 | 默认分段实时投递并以 `Agent · <name>` 标注归属，并发任务可辨识 |
| [#10952](https://github.com/QwenLM/qwen-code/pull/10952) | DWS IM 摄取按会话隔离 | 按钉钉会话 ID 隔离执行，无关私聊/群聊可并行，同会话内保持顺序 |
| [#10991](https://github.com/QwenLM/qwen-code/pull/10991) | 解耦扩展激活刷新 | 激活策略持久化提交后再刷新会话，新增 capability 供客户端区分旧 daemon |
| [#11083](https://github.com/QwenLM/qwen-code/pull/11083) | workspace 为用户主目录时从 user scope 读取 channel 配置 | 修复 home 目录场景下频道配置对管理 API 和 Web Shell 不可见 |

---

## 五、功能需求趋势

1. **导出轻量化（本周最强主线）**：#11031 → #11091 → #11100 → #11096 形成完整问题链，社区对"导出文件从 19.5 MB 降下来"的诉求高度一致，涉及渲染器外置、Mermaid 按需加载、剥离 daemon 运行时等分层优化。
2. **后台自动化可靠性**：cron 可见性（#5823）、后台 shell 通知不丢（#11119/#11132）、会话可回收（#11118）、worktree 会话清理（#11024），daemon 模式下的任务生命周期管理是 roadmap 重点。
3. **Web Shell 三端统一**：#5883 提案持续推进，近期多个 PR（#10594、#11077、#11105）均围绕 web-shell 沉淀，WebUI 退休方向明确。
4. **多 IM 平台深度集成**：钉钉聚合推送（#10899）、IM 摄取隔离（#10952）、微信 bot 文件发送（#4441）——国内 IM 生态是一等公民。
5. **外部 Agent 互操作**：ACP 委托外部 Agent（#11003）预示从"单体 CLI"向"可编排 Agent 框架"的演进。

---

## 六、开发者关注点

- **CI/CD 稳定性拖累交付**：发布流水线重复工作与超时（#11109）、发布主机资源争抢（#10879）、`vi.waitFor` 1 秒硬编码超时影响 2047 处调用点（#10892）、cron E2E 夜间抖动被 continue-on-error 掩盖（#10904）。当日两次发布超时已造成实际影响，测试对机器负载的敏感性是系统性问题（另见 PR #11106、#10758）。
- **daemon 会话生命周期脆弱**：通知丢弃、会话泄漏、错误信息打印 `[object Object]`（#11123）等细节问题密集出现，反映 serve 架构进入深度使用后的磨合期。
- **Windows 平台安全语义弱化**：`@` 文件读取缺失 `O_NOFOLLOW` 等价保护（#8227），跨平台安全测试盲区仍待补齐。
- **基础 UX 细节待打磨**：Cmd+A 全选整页（#11108）、模型切换失败（#11112）、会话搜索只匹配标题（#11111）——dogfooding 标签高频出现说明团队正高强度自用排查。

---

*本报告基于过去 24 小时 GitHub 公开数据自动聚合分析，人工审校生成。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*