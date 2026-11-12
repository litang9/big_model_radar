# AI CLI 工具社区动态日报 2026-11-12

> 生成时间: 2026-11-12 01:53 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告 · 2026-11-12

---

## 一、生态全景

AI CLI 工具已从“终端补全工具”全面演进为**多形态 Agent 平台**：Claude Code（VS Code 扩展 + Web + Desktop 桥接）、Codex（桌面应用 + Dots + Scheduled tasks）、Qwen Code（Web Shell + Managed Agent）均在向多端托管架构迁移。**子代理（subagent）编排**成为几乎所有工具的开发主线，但可靠性问题（挂起、误报成功、成本失控）集中爆发，说明行业正处于“能力先行、信任滞后”的阶段。同时，**Windows 一等公民支持**是全行业短板——Codex、Gemini CLI、OpenCode、Copilot CLI 的热门 issue 均密集出现 Windows 相关问题。付费限额透明度与认证稳定性则成为付费用户最高频的信任痛点。

---

## 二、各工具活跃度对比

| 工具 | 今日热点 Issues | 今日活跃 PR | Release | 迭代节奏 |
|---|---|---|---|---|
| **Claude Code** | 10（含 2 关闭） | 1（长期 PR 被关闭） | 0 | 平稳期，Issues 驱动、内部开发模式 |
| **OpenAI Codex** | 10 | 10（多数已合入） | **7 个版本**（含稳定版 0.167.2） | 🔥 最密集，24 小时 7 版本 |
| **Gemini CLI** | 10 | 10（4 merged/open 修复） | 0 | 稳定迭代 + 社区贡献活跃 |
| **Copilot CLI** | 10 | 0 | 2（v1.0.110-2/-3） | 周期性发版，实验功能灰度中 |
| **Kimi Code CLI** | 0 | 0 | 0 | 无活动 |
| **OpenCode** | 10+（含 4 关闭） | 10（多项合并） | 1（process-daemon v0.5.2） | 快速迭代，subagent 主线密集推进 |
| **Qwen Code** | 10 | 10 | 1（**v1.0.0-preview**，重大版本） | 🚀 架构重构关键期 |

**要点**：Codex 发版最激进但 PR 集中修 Windows 债务；Qwen Code 的 v1.0.0-preview 是当日最具战略意义的事件；Claude Code 社区热度高但代码贡献近乎停滞（外部 PR 9 个月未合并即关闭）。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **子代理编排与可靠性** | Gemini CLI、OpenCode、Codex、Qwen Code | Gemini #22323（MAX_TURNS 误报成功）/#21409（挂起）；OpenCode 三项 PR 落地并发上限与报告机制；Codex #51658 自适应编排提案；Qwen #16941 verify-then-repair 循环 |
| **无人值守/定时任务权限** | Claude Code、Codex | Claude #98287（定时任务无 per-task 白名单）；Codex #34946（SSH 远程计划任务） |
| **Windows 平台稳定性** | Codex、Gemini CLI、OpenCode、Copilot CLI | Codex 前 5 热 issue 中 4 个涉 Windows（项目丢失 69 评论）；Gemini PowerShell 阻塞/路径空格；OpenCode 代理失效/无法原地升级；Copilot linux-arm64 ENOEXEC |
| **MCP 生态健壮性** | 全部主流工具 | Codex OAuth 凭据保护 PR；Copilot #4606 issuer 不匹配；Gemini #24246 超 128 工具 400 错误；OpenCode #63092 超时文档不一致 |
| **认证/订阅/限额透明度** | Claude Code、Codex、OpenCode、Qwen Code、Copilot CLI | Claude entitlement 同步 bug 反复（#72027/#109155）；Codex 周限额异常（#60963）；OpenCode 免费层汇总帖 355 评论；Qwen #16851 配额未重置 |
| **Token 成本控制** | Claude Code、Gemini CLI、OpenCode、Codex | Claude 上下文膨胀治理（#109159）；Gemini AST 感知读取（#22745）+ Tactful Extraction（#19561）；OpenCode 缓存提示修复（#63421）；Codex Guardian 上下文预算（#60914） |
| **配置热重载可靠性** | Claude Code、OpenCode | Claude #108987（env 变更单向生效）；OpenCode #62002（热重载静默回退默认 agent） |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 多端整合（IDE 扩展/Web/Cowork 定时任务/语音），企业级工作流 | 付费 Pro/Max 专业开发者 | 闭源、Issues 驱动、内部开发；新模型灰度快（Fable 5.2 已可手动切换） |
| **OpenAI Codex** | 桌面应用 + 云 + Dots 生态 + Scheduled tasks | ChatGPT 订阅用户、GCP 企业用户 | Rust 核心，稳定版/alpha 双轨高频发布；沙箱安全优先但权限模型不透明 |
| **Gemini CLI** | 开源社区驱动，安全沙箱探索、AST 工具链创新 | 开发者/贡献者，企业安全敏感用户 | 开源接受社区 PR；架构级提案（零依赖 OS 沙箱 #19873）与官方 EPIC（#22745）并行 |
| **Copilot CLI** | GitHub 生态深度集成、无障碍、实验功能灰度 | GitHub/企业（Entra）用户 | Bun 单文件分发；实验特性（concise transcript）预发布渠道验证 |
| **OpenCode** | 开源中立平台，多 provider（BYOK）、插件生态 | 自托管/多账号/成本敏感开发者 | Effect 框架、Go 多账号均衡、MCP 事件总线，扩展性为核心卖点 |
| **Qwen Code** | 托管多端（Web Shell/Managed Agent/Web Terminal）、1.0 架构重构 | Qwen/Qoder 账号体系用户，中文社区 | 事件总线架构 + OSS 外置 + Journal 持久化，向 SaaS 化托管形态演进 |

---

## 五、社区热度与成熟度

- **最活跃社区**：**OpenCode**（单帖 355 评论）、**Codex**（单 issue 69 评论）、**Qwen Code**（CI gate 帖 325 评论）——均由“危机型议题”驱动，情绪集中。
- **最成熟稳定**：**Claude Code**——issue 质量高、有明确 repro 与优先级，但外部贡献通道基本关闭（PR 活动近乎为零）。
- **快速迭代期**：**Codex**（24h 7 版本）、**Qwen Code**（1.0 preview，架构剧烈变动）、**OpenCode**（subagent 体系密集重构）。
- **成长期**：**Gemini CLI**（社区 PR 采纳积极，Windows 补课中）、**Copilot CLI**（实验功能灰度，MCP/权限长期债务待清）。
- **沉寂**：**Kimi Code CLI** 连续无活动，生态存在感最弱。
- **共同成熟度信号**：所有工具的“静默失败”类 issue（遥测关闭禁用同步、配额重置失效、UI 状态与数据不一致）高频出现，说明可观测性是行业性欠账。

---

## 六、值得关注的趋势信号

1. **托管化是下一代架构共识**：Qwen 的 Managed Agent/事件总线、Claude 的 Cowork/云-本地桥接、Codex 的 Dots/Scheduled tasks，均在向“云端编排 + 本地执行”的混合形态收敛。开发者选型时应关注工具的远程会话可靠性与断连恢复机制。
2. **子代理从“能跑”走向“可信”**：误报成功、无限挂起、成本失控是当前三大信任杀手。OpenCode 的并发硬上限、Qwen 的 verify-then-repair 提案代表治理方向——**建议生产环境暂缓大规模并行子代理，等待权限分级与报告机制成熟**。
3. **上下文经济学成为核心竞争力**：Gemini 的 AST 感知读取、Codex 的 Guardian 预算、Claude 的膨胀治理，均指向同一目标——降低每轮 token 基线。长会话重度用户可将“缓存保留策略”作为选型硬指标。
4. **Windows/异构平台仍是风险区**：四家工具同时暴露 Windows 债务。若团队以 Windows/ARM 为主力环境，建议暂缓生产采用 Codex 桌面版与 Copilot CLI 最新版，锁定已验证版本。
5. **付费信任危机需要运营响应**：entitlement 同步、限额异常、免费层配额是跨厂商的高热议题，反映 Agent 按量消耗模式与固定订阅的计费模型矛盾。企业采购时应要求 SLA 中包含用量可审计条款。
6. **无人值守自动化的权限空白是下一战场**：定时任务/远程执行需求明确（Claude、Codex 均有高热诉求），但任务级权限白名单普遍缺失——这是自动化落地前的必补短板，也是各厂商下半年可能的差异化突破点。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-12）

## 一、热门 Skills 排行（按关注度 PR）

> 注：本批数据中 PR 评论数均为空值，以下按更新活跃度与关联 Issue 热度综合排序。

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 HTTP 头，修复 #1668，是 MCP 生态升级的关键兼容补丁 | OPEN |
| 2 | **skill-creator 评估修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 隔离 trigger evals、修复 Windows select() 失败，直接回应高热 Issue #556/#1352（触发率恒为 0 的评估器 bug）| OPEN |
| 3 | **notion-spec-to-implementation + quantitative-resume-auditor** [#1245](https://github.com/anthropics/skills/pull/1245) | 将产品/技术 Spec 转为 Notion 任务清单；简历量化审计。存活周期长（6 月创建仍活跃更新至 10 月），表明在评审流程中 | OPEN |
| 4 | **webapp-testing 安全修复** [#1980](https://github.com/anthropics/skills/pull/1980) | 消除 `shell=True` 命令注入风险（CWE-78），安全类贡献的代表 | OPEN |
| 5 | **pyxel 复古游戏开发** [#525](https://github.com/anthropics/skills/pull/525) | 由 Pyxel 作者本人提交，覆盖游戏实现、无头运行与帧检查，长期活跃（3 月至今）| OPEN |
| 6 | **md2video-audio** [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown→Marp 幻灯→带真人配音的 MP4 视频，零成本多媒体生成方向 | OPEN |
| 7 | **docx/xlsx/pptx 系列修复** [#1792](https://github.com/anthropics/skills/pull/1792)、[#2019](https://github.com/anthropics/skills/pull/2019)、[#1975](https://github.com/anthropics/skills/pull/1975) | 文档 Skill 的可靠性补丁：LibreOffice 超时校验、外部链接误报、参数校验，由 @gerardrecinto 等高产贡献者持续批量修复 | OPEN |
| 8 | **skill-creator 工具链修复** [#1997](https://github.com/anthropics/skills/pull/1997)、[#1681](https://github.com/anthropics/skills/pull/1681) | YAML frontmatter 解析错误、脚本直跑 ModuleNotFoundError——元技能自身的健壮性是社区刚需 | OPEN |

## 二、社区需求趋势（来自 Issues）

1. **信任与安全机制**（最热，46 评论）：[#492](https://github.com/anthropics/skills/issues/492) 社区 Skill 冒用 `anthropic/` 命名空间造成信任边界滥用，签名/命名空间隔离呼声最高。
2. **组织级共享与分发**：[#228](https://github.com/anthropics/skills/issues/228) 要求 Claude.ai 内组织共享 Skill 库；[#2108](https://github.com/anthropics/skills/pull/2108) 反映用户对 synced skills 与仓库快照关系的困惑。
3. **评估/元工具可靠性**：[#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352) skill-creator 触发率评估系统性失效，是开发者的核心痛点。
4. **上下文经济性**：[#1487](https://github.com/anthropics/skills/issues/1487) claude-api 单次注入 ~156k token 耗尽上下文；[#1329](https://github.com/anthropics/skills/issues/1329) 提议 compact-memory 符号化压缩 agent 状态。
5. **质量治理类新 Skill 提案**：[#1385](https://github.com/anthropics/skills/issues/1385) 推理质量三闸门管道（校准→对抗审查→交付验证）、[#412](https://github.com/anthropics/skills/issues/412) agent-governance 安全治理模式。
6. **去重与包管理体验**：[#189](https://github.com/anthropics/skills/issues/189) 双插件安装导致重复 Skill 污染上下文窗口。

## 三、高潜力待合并 Skills（活跃 OPEN PR）

- **[#1742](https://github.com/anthropics/skills/pull/1742)** mcp-builder：MCP 2.x 兼容性属阻塞性问题，关联 Issue 明确，合并优先级高。
- **[#1298](https://github.com/anthropics/skills/pull/1298)** skill-creator eval 修复：对应两个高评论 Issue，社区刚需驱动。
- **[#1245](https://github.com/anthropics/skills/pull/1245)** Notion Spec + 简历审计：PR 存活 4 个月以上仍在更新，处于深度评审中。
- **[#2019](https://github.com/anthropics/skills/pull/2019)** xlsx 外部链接检测：有明确关联 Issue #2013，典型 bugfix 快通道。
- **[#525](https://github.com/anthropics/skills/pull/525)** pyxel：上游作者维护 + 持续迭代 8 个月，质量与维护承诺兼备。
- **[#1980](https://github.com/anthropics/skills/pull/1980)** webapp-testing 安全修复：安全类 PR 通常被优先处理。

## 四、生态洞察

**当前社区最集中的诉求是：Skills 生态从"功能扩张"转向"信任与可靠性"——命名空间安全、评估工具准确性、上下文开销与重复 Skill 治理，比新增 Skill 本身更受关注。**

---

# Claude Code 社区动态日报 · 2026-11-12

## 📰 今日速览

今日无新版本发布，社区活跃度集中在 Issues 讨论上。认证/订阅同步问题再度成为焦点——#72027（Pro 用户被 "organization disabled" 拦截）今日关闭，但 #109155 作为新报告标记为 duplicate，说明该 entitlement 同步 bug 仍未根治。VS Code 扩展的 git-worktree 会话支持（#81024）以 16 个 👍 成为呼声最高的功能请求。

---

## 🚀 版本发布

过去 24 小时无新 Release。

---

## 🔥 社区热点 Issues（Top 10）

**1. [#72027](https://github.com/anthropics/claude-code/issues/72027) · Pro 订阅者被 "organization disabled" / "Max or Pro required" 拦截（CLOSED）**
个人 Pro 用户遭 entitlement 同步 bug 阻断，10 条评论。今日关闭，但同日出现新报告 #109155 并被标记 duplicate——问题是否真正修复值得观察。

**2. [#81024](https://github.com/anthropics/claude-code/issues/81024) · VS Code 扩展应显示 git-worktree 会话（OPEN）**
扩展硬编码 `includeWorktrees: false`，多 worktree 工作流用户无法在会话列表中切换。16 👍，本周最高热度功能请求。

**3. [#98032](https://github.com/anthropics/claude-code/issues/98032) · macOS 会话挂起 ~6 分钟后 ECONNRESET（OPEN）**
2026-09-28 起突发的连接问题，长会话高概率失败，有明确 repro。跨版本的稳定性回归问题。

**4. [#84424](https://github.com/anthropics/claude-code/issues/84424) · Bash 工具 stdin 重定向检测不识别引号（OPEN，已复现）**
对含 `<` 的带引号参数误判，导致 stdin 保持打开、命令被 shell dotfile 挂起。底层 shell 解析缺陷，影响面广。

**5. [#108955](https://github.com/anthropics/claude-code/issues/108955) · /model 选择器缺少 Fable 5.2（OPEN）**
`/model claude-fable-5-2` 可用但选择器只显示 5.1，暗示新模型已在灰度发布中，UI 未跟上。5 👍。

**6. [#98287](https://github.com/anthropics/claude-code/issues/98287) · Cowork 定时任务的权限分类器拒绝所有者已授权的邮件发送（OPEN）**
有人值守会话可发送、无人值守定时任务被 "Real-World Transactions" 规则拦截，且无 per-task 白名单。反映自动化场景的权限模型缺失。

**7. [#108745](https://github.com/anthropics/claude-code/issues/108745) · VS Code 扩展 2.1.322：telemetry=off 静默禁用插件同步（OPEN）**
关闭 VS Code 遥测后，org 管理的 MCP servers / agents / skills 全部消失且无提示。隐私选项与核心功能的意外耦合。

**8. [#108987](https://github.com/anthropics/claude-code/issues/108987) · 移除 `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` 后 autocompact 循环不停止（OPEN）**
settings.json `env` 变更仅单向生效，删除后需重启才能解除，暴露了 env 热重载的架构缺陷。

**9. [#94446](https://github.com/anthropics/claude-code/issues/94446) · Desktop 文件查看器无法打开 additionalDirectories 下的文件链接（OPEN）**
`--add-dir` 目录下的文件链接可点击但无反应，6 👍。多目录工作流的核心体验缺口。

**10. [#109082](https://github.com/anthropics/claude-code/issues/109082) · macOS Desktop 桥接失效 2 天，云会话无法连接本地 Mac（CLOSED）**
"not connected to the bridge" 错误持续 48 小时且重启无效，今日关闭。云-本地桥接（Remote Control / Cowork）可靠性问题频发。

---

## 🔀 重要 PR 进展

过去 24 小时仅更新 1 个 PR：

- **[#26230](https://github.com/anthropics/claude-code/pull/26230) · Feature/path validation hooks（CLOSED）**
  为 agent 工具调用添加相对路径拦截，以支持更安全沙箱化。创建于 2026-02 月，今日关闭，开放长达 9 个月未合并——外部贡献的 hook 安全机制未被采纳。

> 今日 PR 活动极少，且唯一动态为长期 PR 被关闭，符合 claude-code 仓库一贯的“Issues 驱动、内部开发”模式。

---

## 📈 功能需求趋势

1. **IDE / VS Code 集成深度**：git-worktree 会话（#81024）、原生拼写检查（#81814，11 👍）、扩展更新后会话灰屏（#108714）——IDE 是需求最密集的区域。
2. **语音与多模态交互**：语音模式缺少 TTS 回读、连续监听、自动提交（#102545），用户希望端到端语音工作流。
3. **云 / Web 端（Claude Code Web & Cowork）**：上下文膨胀治理（#109159，重复规则注入 ~100KB）、GitHub 代理只读访问（#109162）、本地命令输出改为弹窗（#109151）、定时任务 prompt 重投递（#109016）。
4. **成本与缓存控制**：暴露 advisor 工具的 `caching` 参数（#91110）、1M context 需额外 credits 报错（#109160）。
5. **新模型支持**：Fable 5.2 已可手动切换但未入选择器（#108955），社区对新模型 UI 跟进敏感。

---

## ⚠️ 开发者关注点

- **认证/订阅同步不稳**："organization disabled" / entitlement 类 bug 反复出现（#72027、#109155），付费用户被锁是最高优先级痛点。
- **云-本地桥接与 Remote Control 可靠性**：bridge 断连（#109082）、`--resume` 附着到错误 job（#108839）、Chrome 桥接要求重新授权（#109036）。
- **配置热重载单向性**：settings.json env 变更能生效但无法撤销（#108987）。
- **静默失败模式**：telemetry off 禁用插件同步无任何提示（#108745）、权限重写导致 auto mode 拒绝调用（#108921）——用户希望失败可观测。
- **无人值守自动化权限空白**：Cowork 定时任务缺乏任务级权限配置（#98287），是 agent 自动化落地的主要阻力。
- **网络稳定性**：macOS ECONNRESET 突发回归（#98032）持续影响长会话用户。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 · 2026-11-12

## 1. 今日速览

今日 Codex 密集发布多个版本，**稳定版 0.167.2** 为 Google Cloud Vertex AI 用户默认启用了增量式工具声明，同时 **0.170.0-alpha.2** 预发布版已就位。Windows 平台仍是问题重灾区——应用更新后本地项目丢失（69 条评论）、沙箱权限反复失效等长期 issue 持续发酵。PR 侧聚焦稳定性：Windows 沙箱权限保持、MCP OAuth 凭据保护、原子写入修复等多项关键修复已合入。

## 2. 版本发布

| 版本 | 类型 | 重点内容 |
|---|---|---|
| **0.167.2** | 稳定版 | GCP 默认启用增量式工具更新；可通过 `config.toml` 中 `[features]` 的 `incremental_tools_legacy_gcp = false` 关闭（[#60617](https://github.com/openai/codex/pull/60617), [#60848](https://github.com/openai/codex/pull/60848)） |
| 0.170.0-alpha.2 / alpha.1 | 预发布 | 下一大版本迭代中 |
| 0.169.0-alpha.11.1 / alpha.11 / alpha.10 | 预发布 | 快速迭代中 |
| 0.167.0-alpha.4.3 | 预发布 | 补丁版本 |

发布节奏非常密集，24 小时内出现 7 个版本，其中 GCP 增量工具声明是唯一带实质功能说明的更新。

## 3. 社区热点 Issues

1. **[#59895](https://github.com/openai/codex/issues/59895) Windows 应用更新后本地项目消失**（69 评论 / 19 👍）
   最热 issue。应用更新并切回个人账户后所有本地项目丢失，涉及数据安全，Windows 用户集体反弹，官方需尽快回应。

2. **[#45403](https://github.com/openai/codex/issues/45403) Full access 模式下仍被 "blocked by policy" 拦截**（34 评论）
   明确授权的文件清理操作被不透明策略拒绝且无审查路径，暴露 Windows 沙箱权限设计与用户预期的根本矛盾。

3. **[#58447](https://github.com/openai/codex/issues/58447) macOS dot 无法读取原生 Codex 线程**（25 评论）
   Dots 功能的 `cloud_threads.read` 路由在已授权桌面端上仍报错，Dots 生态互操作性存在问题。

4. **[#50520](https://github.com/openai/codex/issues/50520) Windows 沙箱 `helper_sandbox_lock_failed` 反复出现**（21 评论）
   `.sandbox-bin` 权限重置为 Modify 后沙箱失效，需手动重新授权。今日合入的 PR #60943 正在解决此问题。

5. **[#34946](https://github.com/openai/codex/issues/34946) 计划任务支持 SSH 远程主机**（10 评论 / 11 👍）
   诉求明确的功能需求：让 Scheduled tasks 可在 SSH 连接的主机上运行并在桌面端展示结果，远程自动化场景呼声高。

6. **[#59890](https://github.com/openai/codex/issues/59890) Images 2.6 在第三方 OAuth 客户端不可用**（7 评论）
   新图像模型无法通过 Codex OAuth 选择或使用新输出格式，第三方生态接入受限。

7. **[#60594](https://github.com/openai/codex/issues/60594) zstd 请求压缩导致重复图片输入 HTTP 400**（7 评论）
   Windows 上的连通性 bug，相同输入不压缩可成功，压缩则失败，影响多模态长会话。

8. **[#19669](https://github.com/openai/codex/issues/19669) Slack 连接器使用过期 OAuth 链接**（7 评论）
   撤销重连后仍用旧凭证，多 Slack 账户用户无可靠切换路径，长期未修（4 月创建）。

9. **[#56474](https://github.com/openai/codex/issues/56474) 托管守护进程升级导致活跃任务中断且 TUI 卡死**（5 评论）
   0.163→0.164 强制更新期间替换守护进程就绪失败，影响生产连续性。

10. **[#60963](https://github.com/openai/codex/issues/60963) 周限额异常快速消耗**（新）
    ChatGPT Pro 100 用户报告 gpt-6-astra 消耗异常，配合 [#60953](https://github.com/openai/codex/issues/60953)（要求自选 5 小时/周限额窗口），限额透明度是付费用户核心关切。

## 4. 重要 PR 进展

1. **[#60943](https://github.com/openai/codex/pull/60943) Windows 沙箱重复安装时保留文件权限** — 直接针对 #50520 的 `helper_sandbox_lock_failed` 问题，避免 ACL 重应用破坏已有文件权限。

2. **[#60849](https://github.com/openai/codex/pull/60849) 保护 MCP OAuth 凭据免受过期写入** — 防止 token 刷新覆盖新登录或登出后重建凭据，与 issue #43216（DCR client_secret 不持久化）相关。

3. **[#60872](https://github.com/openai/codex/pull/60872) 修复 Windows 原子写入** — 改用 `std::fs::rename` 支持并发读取，Windows 稳定性关键修复。

4. **[#60905](https://github.com/openai/codex/pull/60905) 跨环境隔离同名 MCP 服务器** — 解决不同执行器上同名 MCP 服务器互相遮蔽的问题，新增 feature flag 控制。

5. **[#60848](https://github.com/openai/codex/pull/60848) GCP 默认启用增量工具声明** — 本日稳定版的核心功能变更，已随 0.167.2 发布。

6. **[#60944](https://github.com/openai/codex/pull/60944) Windows 运行时注册权限错误后自动调和** — 服务权限报错时接受已完成的注册，减少安装失败，与 #59992（500MB 运行时反复下载）相关。

7. **[#60942](https://github.com/openai/codex/pull/60942) 会话 replay/压缩时保留线程本地模型 ID 状态** — 修复长会话恢复后模型状态错乱的问题。

8. **[#60914](https://github.com/openai/codex/pull/60914) 为 Code Mode 执行结果预留 Guardian 上下文预算** — 上下文管理精细化，为关键执行输出单独分配 token 配额。

9. **[#60846](https://github.com/openai/codex/pull/60846) / [#60845](https://github.com/openai/codex/pull/60845) 搜索质量修复** — 分别修复含空白字符查询的线程搜索摘要，及重叠搜索根目录的结果去重。

10. **[#60897](https://github.com/openai/codex/pull/60897) issue 自动打标改用 Responses API** — CI 基础设施改进，用严格 JSON schema 的 Python 脚本替代 Codex action。

## 5. 功能需求趋势

- **远程/多主机工作流**：SSH 主机上的计划任务（#34946）、远程环境编排是明确方向
- **子代理编排**：原生自适应编排提案（#51658）反映用户希望更低成本地组合 subagent + 模型选择 + skills
- **限额灵活性**：Pro 用户要求自选用量窗口（#60953）、限额消耗透明化（#60963）
- **新模型/多模态接入**：Images 2.6 及 GIF/动画输出的完整 CLI 支持（#59890）
- **模型可靠性**：迭代调试与自主任务执行能力提升（#60754）、避免任务中途提前收尾（#56951）

## 6. 开发者关注点

1. **Windows 体验仍是最大痛点**：前 5 热门 issue 中 4 个与 Windows 相关（项目丢失、沙箱权限、运行时重复下载、连通性），今日多个合入 PR 也集中于此，官方正集中攻坚但尚未见效。
2. **沙箱权限模型不透明**："Full access" 承诺与实际策略拦截的落差（#45403、#60760）削弱信任，社区要求可审查的拦截原因。
3. **升级/更新的破坏性**：应用更新丢数据（#59895）、守护进程升级中断任务（#56474）——自动更新的原子性与回滚能力是高频诉求。
4. **OAuth/凭据生命周期管理**：MCP DCR secret 不持久（#43216）、Slack 连接器过期链接（#19669），多账户/多服务场景的凭据热切换不可靠。
5. **工具链边缘 case 多**：@dovvnloading 一天内报告 5 个 CLI 细节 bug（路径含 `#`、连字符开头 MCP 名、marketplace JSON 输出等），显示 CLI 参数解析与结构化输出仍需打磨。

---
*数据来源：github.com/openai/codex · 统计窗口 2026-11-11 至 2026-11-12*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-11-12

## 📌 今日速览

今日无新版本发布，社区活跃度集中在 Issue 讨论与 PR 修复上。**Subagent（子代理）生态仍是焦点**：从“挂起”、“误报成功”到“不被充分利用”，子代理的稳定性与调度策略成为最集中的反馈方向。同时，多位贡献者提交了针对 Windows 兼容性和 ACP 模式的修复 PR，文档与 CI 质量治理也在持续推进。

---

## 🔥 社区热点 Issues（Top 10）

1. **[#20813](https://github.com/google-gemini/gemini-cli/issues/20813)** — headless 模式 + 自定义系统提示词导致账号被封（已关闭）
   企业/安全相关的 P1 级客户问题，14 条评论反映了封号申诉流程的不透明，对生产环境用户影响大。

2. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — Subagent 达到 MAX_TURNS 后误报为 "GOAL success"
   核心可靠性缺陷：子代理被中断却报告成功，会直接误导上层任务编排。13 条评论，P1。

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — Generalist agent 永久挂起
   简单如创建文件夹的操作也会挂起 1 小时以上，8 个 👍 表明影响面广，是子代理方向最高赞的 bug。

4. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — 零依赖 OS 沙箱 + 执行后意图路由
   重要的架构级提案：利用 Gemini 3 模型原生的 bash 能力（grep/sed/awk 链式调用），在不牺牲安全性的前提下释放模型潜力。

5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — AST 感知的文件读取/搜索/代码库映射（EPIC）
   官方发起的调查项，探索用 AST 工具精准读取方法边界，减少 token 浪费和误读。配套 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)、[#22747](https://github.com/google-gemini/gemini-cli/issues/22747)。

6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — 模型不主动使用 Skills 和 Sub-agents
   用户反馈即使任务高度相关，模型也几乎从不自主调用自定义 skill，只能靠显式指令触发。

7. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — 工具数量超过 128 触发 400 错误
   对重度扩展用户（MCP 工具集）是硬性限制，暴露了工具作用域管理的不足。

8. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** — Browser Agent 忽略 settings.json 配置覆盖（如 maxTurns）
   配置合并逻辑存在断链，AgentRegistry 读取正确但实际不生效。

9. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** — get-shit-done 输出 hook 导致崩溃
   在输出用户摘要阶段反复崩溃，P1 级稳定性问题。

10. **[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)** — "Tactful Extraction" 节省 token 的精准读取策略
    针对每轮约 36.6k token 的上下文基线，提出 grep 优先的分级代码发现机制，减少“倾泻式”大文件读取。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#30247](https://github.com/google-gemini/gemini-cli/pull/30247)**（Open）— 避免 PowerShell 解析阻塞事件循环
   修复 Windows 下 shell 检查同步解析导致的 UI 冻结（Thinking 转圈卡死）。P2，size/xl。

2. **[#30228](https://github.com/google-gemini/gemini-cli/pull/30228)**（Closed/Merged）— 修复空模型响应导致的 400 错误
   解决 `Requests ending with a model turn are not supported` 及用户提示词被静默合并进 functionResponse 的问题。

3. **[#30246](https://github.com/google-gemini/gemini-cli/pull/30246)**（Open）— Windows 上 `/ide install` 路径含空格导致失败
   VS Code 默认安装路径（如 "Program Files"）必然触发，修复 cmd.exe 路径引号问题。

4. **[#30220](https://github.com/google-gemini/gemini-cli/pull/30220)**（Closed）— 会话预览保留 Unicode 字符
   原实现粗暴剔除所有非 ASCII 字符，中文等国际化内容在会话搜索/预览中全部丢失。

5. **[#30176](https://github.com/google-gemini/gemini-cli/pull/30176)**（Closed）— 认证重启后保留 `--worktree` 选择
   修复认证流程重启（exit code 199）后 Git worktree 丢失的问题。

6. **[#30148](https://github.com/google-gemini/gemini-cli/pull/30148)**（Open）— ACP 模式下触发 SessionStart / Notification hooks
   补齐 ACP（Agent Client Protocol）模式与交互模式的 hook 行为一致性。

7. **[#30144](https://github.com/google-gemini/gemini-cli/pull/30144)**（Open）— ACP 模式实时刷新 stderr 输出
   hook 日志和警告此前要等到进程退出才输出，现改为实时刷新。

8. **[#30134](https://github.com/google-gemini/gemini-cli/pull/30134)**（Open）— ACP 模式下报告被 hook 拦截的提示词
   修复被 hook 拦截的 prompt 返回空 `end_turn`、客户端无从得知原因的问题。

9. **[#30139](https://github.com/google-gemini/gemini-cli/pull/30139)**（Open）— 收紧 triage 机器人的标签写入
   只允许写入仓库已定义的标签，防止 AI triage 输出污染 issue 元数据。

10. **[#29546](https://github.com/google-gemini/gemini-cli/pull/29546)**（Open, help wanted）— 非交互模式支持 `/skill-name` 激活 skill
    打通 headless 场景下的 skill 调用路径，与社区对 skill 可用性的诉求（#21968）呼应。

---

## 📈 功能需求趋势

- **Subagent 体系化**：并行子代理协作、共享内存、任务轨迹可视化（[#18287](https://github.com/google-gemini/gemini-cli/issues/18287)、[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)）是最大的方向性投入。
- **Token 效率与 AST 感知工具**：AST-aware 读写/搜索（#22745 系列）+ "Tactful Extraction"（#19561）+ 持久化任务追踪（[#18836](https://github.com/google-gemini/gemini-cli/issues/18836)），共同指向降低上下文成本。
- **安全与沙箱**：零依赖 OS 沙箱（#19873）、防止破坏性命令（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）、企业遥测白名单（PR #30010）。
- **Browser Agent 健壮性**：会话接管、锁恢复、配置覆盖生效（#22232、#22267）。

---

## ⚠️ 开发者关注点（痛点汇总）

1. **子代理可靠性**：挂起、误报成功、不主动调用——三条主线 bug 让子代理目前“可用但不可信”。
2. **Windows 体验**：PowerShell 阻塞、路径空格、cmd.exe 兼容性等问题集中出现，Windows 一等公民支持仍在补课。
3. **封号与申诉流程**：headless + 自定义系统提示词触发 ToS 封号（#20813），自动化场景用户对账号安全存在担忧。
4. **配置一致性与可观测性**：settings.json 覆盖不生效、`/bug` 报告缺少子代理上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)）、非 UTF-8 网页乱码（[#27980](https://github.com/google-gemini/gemini-cli/issues/27980)）。
5. **工具规模上限**：>128 工具触发 400，重度 MCP 用户亟需智能工具作用域裁剪。

---
*数据来源：github.com/google-gemini/gemini-cli | 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期：2026-11-12** | 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)

---

## 一、今日速览

今日发布两个新版本 **v1.0.110-3** 与 **v1.0.110-2**，集中修复了 Entra 登录误报错误、无障碍体验、目录删除后启动崩溃等问题。社区讨论热度最高的是 **concise transcript 实验模式**（1.0.110-1 预发布渠道灰度）引发的一批新反馈，以及多个长期遗留的 MCP OAuth、权限和会话恢复问题持续活跃。此外，linux-arm64 二进制 ENOEXEC 兼容性问题值得 arm 用户关注。

---

## 二、版本发布

### [v1.0.110-3](https://github.com/github/copilot-cli/releases)
**修复内容：**
- 避免 Microsoft Entra 登录时组织账户可用的情况下出现不必要的错误弹窗
- 提升无障碍体验：屏幕阅读器可识别当前会话，并在会话需要关注或空闲时进行播报（Sessions 列表）
- `/usage` 模型行按终端宽度换行而非直接截断

### [v1.0.110-2](https://github.com/github/copilot-cli/releases)
**修复内容：**
- 中断或失败尝试产生的部分响应与推理内容被标记为“未完成”，但文本得以保留
- 从已删除目录启动 `copilot` 时给出明确提示（目录不存在及恢复方法），不再抛出 Node 堆栈崩溃

---

## 三、社区热点 Issues

1. **[#3534](https://github.com/github/copilot-cli/issues/3534)** [已关闭] WSL2 (ARM64) 下 `/copy` 失败（`clip.exe exited with code 1`）
   社区讨论最热烈（9 评论 / 7 👍），为 `cmd.exe` 包装层的引号转义 bug，影响 WSL2 剪贴板功能。已修复关闭。

2. **[#5053](https://github.com/github/copilot-cli/issues/5053)** [开放] 1.0.89 回归：ACP 会话不再向 `session-store.db` 写入历史与用量索引
   影响非交互/ACP 场景的数据持久化，属于跨版本回归，仍在等待修复。

3. **[#5426](https://github.com/github/copilot-cli/issues/5426)** [开放] Concise transcript 模式丢弃推理行（无视 showReasoning / ctrl+t）
   新实验功能灰度首日即收到反馈，与 #5427 一同构成新版本体验回归的集中报告。

4. **[#5427](https://github.com/github/copilot-cli/issues/5427)** [开放] 折叠的 "N commands" 分组仍渲染完整未截断的命令文本
   同为 concise transcript 灰度反馈，影响终端整洁度，预计官方将快速响应。

5. **[#5312](https://github.com/github/copilot-cli/issues/5312)** [已关闭] 上下文窗口滚动失败在 1.0.105 上复发（checkpoint.md 缺失）
   原始 issue #5205 在无修复说明情况下被关闭后复发，反映社区对“关闭即完成”处理方式的不满，今日再度更新。

6. **[#4606](https://github.com/github/copilot-cli/issues/4606)** [开放] Google Workspace MCP OAuth 因 accounts.google.com 尾斜杠 issuer 不匹配而失败
   阻断 Google 官方 MCP 端点认证，对依赖 Google 生态的用户影响大。

7. **[#5424](https://github.com/github/copilot-cli/issues/5424)** [开放] linux-arm64 二进制在 Linux 6.12 (aarch64, 4K pages) 上 ENOEXEC
   Bun 单文件可执行文件兼容性问题，需经 ld.so 才能启动，影响 ARM Linux 用户升级。

8. **[#2955](https://github.com/github/copilot-cli/issues/2955)** [开放] `/allow-all` 无法抑制 bash 工具执行确认弹窗
   长期开放的权限系统问题，自动化工作流的主要摩擦点。

9. **[#5145](https://github.com/github/copilot-cli/issues/5145)** [开放] thinking 模式下 400：`reasoning_text` 需回传——后台 shell 退出后运行时合成的 assistant 轮次触发
   影响 BYOK 自定义 provider（DeepSeek + responses API）用户，暴露协议兼容性细节问题。

10. **[#5420](https://github.com/github/copilot-cli/issues/5420)** [开放] 长时间构建在未经用户批准下被终止，停止来源误导且 Docker 子进程被孤立
    涉及进程管理与安全审批边界的可信度问题，对企业用户尤为重要。

---

## 四、重要 PR 进展

过去 24 小时内无更新的 Pull Requests，本节省略。

---

## 五、功能需求趋势

- **可配置性增强**：`/config` 统一交互式设置编辑器（[#3352](https://github.com/github/copilot-cli/issues/3352)）、禁用内置 slash 命令（[#5375](https://github.com/github/copilot-cli/issues/5375)）、语音转录语言可配置（[#5226](https://github.com/github/copilot-cli/issues/5226)）——社区希望减少硬编码、获得更细粒度控制。
- **IDE 集成深化**：文件链接在 VS Code 连接时无法打开（[#5423](https://github.com/github/copilot-cli/issues/5423)）、会话选择器内联摘要（[#2330](https://github.com/github/copilot-cli/issues/2330)），IDE 联动体验是持续诉求。
- **MCP 生态健壮性**：OAuth issuer 匹配（#4606）、动态客户端注册过期不重注册（#5284）、会话恢复后工具引用失效（#5359）、启动时会话 ID 切换丢失 stdio MCP 服务器（#4920）——MCP 相关问题占比显著。
- **平台兼容性**：linux-arm64 ENOEXEC（#5424）、macOS 12 原生插件加载失败（#5418）、Windows 沙箱下 dotnet 多项目构建受阻（#5421）。
- **实验功能打磨**：concise transcript 首日暴露的显示回归（#5426、#5427）。

---

## 六、开发者关注点

- **会话稳定性与恢复**：`/restart` 后会话无法恢复（[#5416](https://github.com/github/copilot-cli/issues/5416)）、权限提示 5 秒超时自动取消导致会话卡死（#5018）、resume 后 MCP 工具引用失效——会话生命周期管理是最高频痛点。
- **权限与审批流程**：`/allow-all` 不生效（#2955）、assisted permission 已批准仍触发 `permission_prompt` 通知（[#5417](https://github.com/github/copilot-cli/issues/5417)），权限语义不一致影响自动化信任。
- **误判与可用性**：HTTP 422 网络安全风控误拦合法本地调试（[#5335](https://github.com/github/copilot-cli/issues/5335)）、长时构建被擅自终止（#5420），触发阈值的透明度受到质疑。
- **订阅与认证状态**：付费升级后模型不可用（[#5419](https://github.com/github/copilot-cli/issues/5419)）、未登录时 `gh auth token` 无退避地高频重试导致 CPU 飙升（#5256）。
- **提示**：升级 1.0.110 前若在 macOS 12.x 或 Linux 6.12 ARM64 环境，建议先确认 #5418 / #5424 的修复状态。

---

*本报告基于过去 24 小时 GitHub 公开数据自动汇总，链接均指向原始 issue/release 页面。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-12

## 一、今日速览

今日 OpenCode 发布 process-daemon v0.5.2（opencode-pty，protocol 8），主要修复 PTY 稳定性问题。社区热点集中在免费层使用限制问题（#59387，已积累 355 条评论）和 V2 桌面版/TUI 的多处回归 bug。PR 方面，子代理（subagent）体系迎来多项重要改动：并发上限、报告机制重构和崩溃恢复修复同步推进。

## 二、版本发布

- **process-daemon v0.5.2**：发布于 npm `@opencode/pty@0.5.2`（protocol 8），来自 `packages/process-daemon`，属 PTY 守护进程维护性更新。[Release 链接](https://github.com/anomalyco/opencode/releases)

## 三、社区热点 Issues

1. **[#59387](https://github.com/anomalyco/opencode/issues/59387) 免费层问题汇总帖（OPEN）** — 355 条评论、27 👍，覆盖"Free usage exceeded"、配额重置失效、旧版 Desktop 失效等问题，是目前社区情绪最集中的地方，官方以单帖聚合方式处理。

2. **[#63417](https://github.com/anomalyco/opencode/issues/63417) HA 插件客户端每 ≤10s 弹重连 splash（OPEN）** — Home Assistant add-on 场景下 iOS/桌面端反复全屏重连提示，会话基本不可用，影响自托管用户。

3. **[#63229](https://github.com/anomalyco/opencode/issues/63229) Windows 桌面版会话中浏览器标签再次缺失（OPEN）** — 升级引入的回归 bug，中文用户报告，此前已出现过一次。

4. **[#62002](https://github.com/anomalyco/opencode/issues/62002) 热重载配置后 default_agent 静默回退到内置 build（OPEN）** — 自定义 agent 的 model 和 permissions 在一次读配置失败后丢失，属数据一致性问题，自定义重度用户关注。

5. **[#63383](https://github.com/anomalyco/opencode/issues/63383) Goal Resume 忽略所选 agent，卡在 Plan 模式（OPEN）** — 桌面端目标执行暂停后恢复仍用 Plan agent，无法写入文件导致循环暂停，影响工作流闭环。

6. **[#51022](https://github.com/anomalyco/opencode/issues/51022) Windows 系统代理下 ripgrep 静默下载失败且永不重试（OPEN, reproduced）** — 不读取 WinINET 系统代理，失败被缓存直到重启，企业网络用户痛点，今日已有对应 PR（见下文）。

7. **[#63393](https://github.com/anomalyco/opencode/issues/63393) 切换模型导致排队请求“消失”（OPEN）** — 队列数据实际仍在（被 AI 从 inbox 表中找回），但 UI 层丢失，易引发用户恐慌。

8. **[#63092](https://github.com/anomalyco/opencode/issues/63092) MCP 超时文档默认 5s 实为 30s，标量 timeout 覆盖 12h 执行窗口（OPEN, reproduced）** — 文档与实现不一致且配置语义有陷阱，MCP 集成用户必读。

9. **[#63331](https://github.com/anomalyco/opencode/issues/63331) standalone 模式缺失 github-copilot/auto（OPEN, reproduced）** — 直接影响 Copilot Student 用户，其套餐只允许 auto 路由访问模型。

10. **[#57345 / #57517](https://github.com/anomalyco/opencode/issues/57345) TUI OSC 10/11/4 回复泄漏进输入框（OPEN, reproduced）** — SSH/系统主题下终端颜色查询响应碎片化后被当作用户输入， longstanding TUI 问题，两帖持续活跃。

**值得注意的关闭项**：[#62797](https://github.com/anomalyco/opencode/issues/62797)（Plan 模式提醒残留）、[#63345](https://github.com/anomalyco/opencode/issues/63345)（后台 shell 完成通知堆积）、[#62934](https://github.com/anomalyco/opencode/issues/62934)（Android 17 缺少 ACCESS_LOCAL_NETWORK 权限）、[#51755](https://github.com/anomalyco/opencode/issues/51755)（Windows PowerShell 无法原地升级）均已修复/关闭。

## 四、重要 PR 进展

1. **[#63227](https://github.com/anomalyco/opencode/pull/63227) feat(core): 子代理并发硬上限** — 限制单 session 子代理并发数，直接回应成本失控问题（关联 #54935），对 token 消耗有实质影响。

2. **[#63413](https://github.com/anomalyco/opencode/pull/63413) refactor(core): 移除 subagent notify 选项（已合并）** — 每个带父级的子 session 空闲时都向父级报告，官方明确不支持静默子代理，属架构决策落地。

3. **[#63416](https://github.com/anomalyco/opencode/pull/63416) fix(core): 子代理报告确认后恢复父级唤醒** — 修复崩溃后父级 idle 挂起问题，与 #63413 形成子代理可靠性组合拳。

4. **[#63424](https://github.com/anomalyco/opencode/pull/63424) fix(core): ripgrep 解析失败后重试** — `Effect.cached` 连失败也缓存导致永不恢复，修复 #51022。

5. **[#63421](https://github.com/anomalyco/opencode/pull/63421) fix(core): AI SDK 桥接层保留 Anthropic 缓存提示** — 修复 provider options key 与 SDK 读取 key 不匹配导致缓存失效的成本问题。

6. **[#63354](https://github.com/anomalyco/opencode/pull/63354) feat(core): Go 账号按用量自动均衡（实验性）** — `experimental.auto_balance_accounts` 标志，按剩余时间用量选账号，多账号用户福音。

7. **[#63411](https://github.com/anomalyco/opencode/pull/63411) feat(core): session 历史搜索与检查工具（实验性）** — 让 agent 能搜索、检查当前位置的会话历史，`experimental.session_search` 开启。

8. **[#63261](https://github.com/anomalyco/opencode/pull/63261) feat(core): MCP 事件发布到总线** — 插件/客户端可订阅 MCP 服务器事件，且断线重连后订阅保持，扩展插件生态能力。

9. **[#63427](https://github.com/anomalyco/opencode/pull/63427) feat(app): Recent 侧栏支持隐藏与静音 session（已合并）** — 桌面端对齐 iOS 抽屉行为，隐藏后可经标题栏搜索找回。

10. **[#63136](https://github.com/anomalyco/opencode/pull/63136) fix(cli): 后台服务注册限定网络命名空间** — 修复不同 netns 下两个同用户客户端互相替换的死循环，容器/隔离环境重要修复。

## 五、功能需求趋势

- **桌面端布局自由度**：#53382（会话内容宽度可调）、#54800（744px 宽度上限裁剪大图表）持续活跃，宽屏利用率是高频诉求。
- **插件/扩展 API**：#51209 要求 V2 TUI composer 开放给插件（V1 的 `appendPrompt` 尚无 V2 等价物），配合 #63261 的 MCP 事件总线，插件生态是明确方向。
- **子代理编排**：并发上限（#63227）、报告机制（#63413/#63416）、历史搜索（#63411）密集落地，多 agent 编排是当前开发主线。
- **远程/移动端体验**：HA add-on 重连问题（#63417）、云端移动视图事件流断档（#63426）、Android 局域网权限（#62934）反映 remote serve 场景用户增长。
- **企业网络兼容**：系统代理支持（#51022）、网络命名空间（#63136）表明代理/隔离环境是薄弱环节。

## 六、开发者关注点

1. **Windows 一等公民地位仍待加强**：PowerShell 无法原地升级（#51755）、安装脚本强制要求 bash/WSL（#63352）、系统代理失效（#51022）、桌面版回归 bug（#63229）——Windows 用户痛点最密集。
2. **免费层信任危机**：#59387 长期高热，配额提示与重置逻辑不可靠直接影响转化与口碑。
3. **状态同步可靠性**：排队请求“消失”（#63393）、inbox pending 标签残留（#59615）、事件流断档无重同步（#63426），UI 状态与真实数据的一致性是反复出现的主题。
4. **配置热重载安全**：#62002 一次读配置失败即静默回退默认 agent，开发者希望失败时保留原配置而非降级。
5. **TUI 终端兼容性**：OSC 颜色查询泄漏（#57345/#57517）、thinking 块滚动跳跃（#58666）等老牌 TUI 问题修复进展缓慢，SSH 用户耐心有限。

---
*数据来源：github.com/anomalyco/opencode · 统计窗口：2026-11-11 ~ 2026-11-12*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-11-12** | 数据来源：github.com/QwenLM/qwen-code

---

## 📌 今日速览

Qwen Code 正式发布 **v1.0.0-preview**，将 Qoder 与 Qwen Code 的 Agent 能力整合到统一架构中，进入预览期（接口与配置可能变动）。与此同时，核心开发者 @wenshao 密集推进 Managed Agent 与事件总线架构重构，Web Shell、Web Terminal 成为功能迭代主战场；CI 稳定性问题（ Managed Agent gate 累计 325 条评论）持续困扰社区。

---

## 🚀 版本发布

### v1.0.0-preview
- 整合 Qoder 与 Qwen Code 的 Agent 能力，覆盖代码理解、实现、调试与测试
- 支持 Qwen 与 Qoder 账号体系
- 预览阶段接口、配置项与行为可能调整，不建议生产环境直接依赖
- [Release 链接](https://github.com/QwenLM/qwen-code/releases)

---

## 🔥 社区热点 Issues

1. **#14724 — Main CI: Managed Agent gate 持续失败（累计 325 条评论）**
   自 10 月中旬至今未关闭，是当前社区讨论最多的 Issue，反映 Managed Agent 质量门禁稳定性堪忧，已成为团队维护负担的集中体现。
   [链接](https://github.com/QwenLM/qwen-code/issues/14724)

2. **#16982 — `/rewind` 在 `/cd` 后可能将检查点恢复到错误目录（P1）**
   可能静默覆盖无关项目文件，属数据安全隐患，已标记 ready-for-human，需人工优先处理。
   [链接](https://github.com/QwenLM/qwen-code/issues/16982)

3. **#16425 — Workflow Agent 权限审批永不渲染，运行无限挂起（P1，已关闭）**
   状态栏显示“待审批”但审批 UI 不出现，多 Agent 工作流核心缺陷，已修复关闭，值得关注修复是否回移到 1.x 分支。
   [链接](https://github.com/QwenLM/qwen-code/issues/16425)

4. **#16915 / #16908 — 模型连接频繁中断、任务无法继续（P2，1.x）**
   多位用户反馈 CLI 执行中连接丢失且缺乏详细日志，属用户侧高频痛点。
   [#16915](https://github.com/QwenLM/qwen-code/issues/16915) | [#16908](https://github.com/QwenLM/qwen-code/issues/16908)

5. **#16921 — glob 永远无法匹配目录（nodir:true）**
   目录形态的 pattern 返回空结果被模型误读为“不存在”，直接影响 Agent 文件探索能力，设计层面需讨论。
   [链接](https://github.com/QwenLM/qwen-code/issues/16921)

6. **#15861 — web-shell 冒烟测试确定性超时（P1）**
   与 PR 无关的确定性失败导致每个 PR 都付出重跑成本，阻塞合并流水线。
   [链接](https://github.com/QwenLM/qwen-code/issues/15861)

7. **#16767 — 工具调用收尾时出现虚假“请求被中断”横幅（Web Shell）**
   会话正常结束在 tool call 上却提示中断并提供“继续执行”，误导用户，反映会话状态机边界处理不严谨。
   [链接](https://github.com/QwenLM/qwen-code/issues/16767)

8. **#16954 — lint 入口守卫在 macOS 符号链接路径下静默跳过（P2）**
   lint 退出码 0 但实际未运行，属 CI 假绿隐患，@yiliang114 提供了精确定位。
   [链接](https://github.com/QwenLM/qwen-code/issues/16954)

9. **#16941 — 提案：核心级 verify-then-repair 循环（干净上下文验证者）**
   将“编辑→运行检查→反馈失败→有界重试”内建为回合级机制，方向与业界 Agent 自验证趋势一致，值得关注采纳情况。
   [链接](https://github.com/QwenLM/qwen-code/issues/16941)

10. **#16851 — Web UI 周配额多周未重置（支持类）**
    coder.qwen.ai 账号配额卡死，属服务端问题，影响付费/免费额度用户体验。
    [链接](https://github.com/QwenLM/qwen-code/issues/16851)

---

## 🔀 重要 PR 进展

1. **#16866 — Managed Web Terminal（feat, @wenshao）**
   为 Managed Agent 会话增加交互式 Web 终端，WebSocket 逐字节中继 PTY，终端 I/O 不入日志，补齐 web_terminal 平价能力。
   [链接](https://github.com/QwenLM/qwen-code/pull/16866)

2. **#16938 — 基于事件总线重构 Agent 循环（opt-in）**
   将共享 agent loop 拆为 Conversation / Llm / Tool 三个 handler，是 1.0 架构演进的关键一步。
   [链接](https://github.com/QwenLM/qwen-code/pull/16938)

3. **#16868 — 超大会话资源 OSS 外置与 Journal 压实（已合并）**
   冷数据下沉对象存储、MySQL 保持排序/幂等权威；合并后暴露并发竞争，由 #16983 补刀修复。
   [#16868](https://github.com/QwenLM/qwen-code/pull/16868) | [#16983](https://github.com/QwenLM/qwen-code/pull/16983)

4. **#16653 — grep/glob 结果强制执行 Read deny 规则（安全修复）**
   修复 ripgrep 工具绕过读权限过滤返回受限文件内容的安全缺口，建议关注尽快合并。
   [链接](https://github.com/QwenLM/qwen-code/pull/16653)

5. **#16877 — 手动会话-PR 绑定（/pr 命令 + Web Shell 对话框）**
   自动绑定失效时用户可显式关联 GitHub PR，覆盖 TUI / headless / daemon 全场景。
   [链接](https://github.com/QwenLM/qwen-code/pull/16877)

6. **#16835 — Managed Session 持久化自步 /loop 唤醒**
   自步唤醒从内存计时器改为持久 Journal 输入，提升长时任务的可靠性。
   [链接](https://github.com/QwenLM/qwen-code/pull/16835)

7. **#16844 — 客户端文件系统注册进 Managed 会话**
   通过 Java 中介 MCP 通道让 Managed Agent 访问浏览器本地文件，绕过 WebSocket 禁令，架构上有代表性。
   [链接](https://github.com/QwenLM/qwen-code/pull/16844)

8. **#16926 — 文件历史备份原子化发布**
   从 v1.0.0-preview 分支回移崩溃安全备份机制，开启"preview 特性拆分入 main"的先例。
   [链接](https://github.com/QwenLM/qwen-code/pull/16926)

9. **#16779 — Web Shell 会话搜索体验重构**
   独立居中对话框、键盘导航、加载/重试状态，社区贡献者 @deggs7 主导。
   [链接](https://github.com/QwenLM/qwen-code/pull/16779)

10. **#16865 — 对账记录读取门控 + 段计划批处理（perf）**
    Reconciler 跳过已有全部回执的投递记录读取，降低 Managed Agent 通道开销。
    [链接](https://github.com/QwenLM/qwen-code/pull/16865)

---

## 📈 功能需求趋势

- **Agent 自主性与可靠性**：verify-then-repair 循环（#16941）、沙箱内程序化编排工具调用（#16944）、`/loop` 持久化唤醒（#16835）——社区希望 Agent 少问多做、自我纠错
- **Web Shell / Desktop 体验打磨**：模型选择器宿主插槽（#16893）、频道白名单从观察到的联系人选择（#16931）、工作区切换后焦点管理（#16980）、Tooltip 裁剪（#16970）——桌面端 UX 进入细节优化期
- **权限与安全**：grep/glob 读权限强制（#16653）、权限审批流程可靠性（#16425）——Agent 权限边界成为持续主题
- **托管架构（Managed Agent）**：Web Terminal、客户端文件系统、OSS 外置、事件总线——1.0 的架构主线清晰指向托管多端形态
- **可观测性**：连接中断缺乏日志（#16908）反复出现，用户要求更透明的错误诊断

---

## ⚠️ 开发者关注点

1. **CI 稳定性是最大痛点**：多个 main 分支 CI 失败 Issue 长期开放（#14724 累计 325 评论），flaky test 靠 CI Failure Patrol 机器人自动重跑甄别（#16975、#16959），团队正系统性投入 deflake 与 lint 门禁治理（#16945、#16946、#16899）
2. **会话/连接可靠性**：模型连接中断、任务卡死、虚假中断提示（#16915、#16908、#16767）是用户侧最高频投诉，1.x 分支尤甚
3. **文件操作语义正确性**：glob 无法匹配目录（#16921）、/rewind 恢复错目录（#16982）等边界缺陷直接影响 Agent 行为可信度
4. **自托管兼容性**：自部署 Qwen3-Coder 工具调用失败的老问题（#124）仍有社区持续跟进
5. **文档滞后**：MCP 热重载文档过时（#16925）提示 1.0 架构演进速度快于文档维护，值得贡献者介入

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*