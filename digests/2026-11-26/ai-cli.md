# AI CLI 工具社区动态日报 2026-11-26

> 生成时间: 2026-11-26 02:49 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告 · 2026-11-26

## 一、生态全景

AI CLI 工具已进入**深度打磨与生态扩张并行**的阶段：头部产品（Claude Code、Codex）重心从功能转向长会话稳定性、成本可观测性与沙箱安全；快速追赶者（Gemini CLI、OpenCode、Qwen Code）密集补齐 subagent、ACP、多端体验等基础能力。**Subagent/多 agent 编排**成为各社区共同的主线需求，**MCP 生态健壮性**（OAuth、审批绑定、会话清理）成为新的竞争焦点。同时，安全事件（OpenCode Windows 误删 27 万文件、Qwen 明文 API key 落盘）与 CI 质量滑坡（Qwen E2E 大面积红灯）提示行业正经历规模化增长后的质量偿债期。

## 二、各工具活跃度对比

| 工具 | 热点 Issues（今日） | PR 动态 | Release | 核心信号 |
|---|---|---|---|---|
| Claude Code | 10+（含 1111 👍 巨型 issue #18435） | 仅 2 个社区 PR（开源诉求），官方流水静默 | 无 | 高用户基数、缓释成本类 bug 焦点 |
| OpenAI Codex | 10（多条高互动） | ~20 PR 合入（copyberry 机器人高频），含 alpha 版 | rust-v0.174.0-alpha.6 | TUI 体验深化，沙箱权限失效群问题严重 |
| Gemini CLI | 10（30 条热点中 25+ 带 agent 标签） | 10（4 个安全 PR 集中提交 + ACP 专项） | 无 | Subagent 可观测性是核心痛点 |
| Copilot CLI | 10 | 0（仅 2 个已关闭外贡献） | **3 个补丁版**（v1.0.117-0/1/2） | 补丁流密集，回归风险上升 |
| OpenCode | 10 | 10+（含已关闭实验性 PR） | **v2.4.2** | 严重事故 + 架构重构（Fiber 作用域化、Environment 门控） |
| Qwen Code | 10 | 10（6 个已合） | **v1.0.0-preview.2** | CI 健康度告警，Harness kernel 架构演进 |
| Kimi Code CLI | 0 | 0 | — | 过去 24 小时无活动 |

## 三、共同关注的功能方向

**1. Subagent / 多 agent 编排**（5/7 工具）
- Gemini CLI：30 条热点 issue 中 25+ 条涉及 subagent（挂起 #21409、误报成功 #22323、调度失灵 #21968）
- OpenCode：前台 subagent 执行（#64073，30 评论）、Agent Teams 设计（#12711）
- Claude Code：并行 agent 未测试变更堆积（#112374）；Codex：CLI 连接 dot 的 agent 授权（#56601）

**2. 沙箱 / 权限 / 命令执行安全**（5/7 工具）
- OpenCode 最严重：Windows 转义缺陷误删整盘（#66449）
- Codex：Full access 被忽略的跨平台权限失效群（#63270/#62907）
- Qwen：headless 模式权限绕过（#18379）；Gemini CLI：零依赖沙箱讨论（#19873）+ 4 个安全 PR

**3. MCP 生态健壮性**（4/7 工具）
- Claude Code：OAuth RFC 8707 缺失（#112062）、工具结果数据面回归（#111999）
- Gemini CLI：token 绑定 origin、工具审批绑定定义（#30475/#30478）
- Qwen：128 工具上限（#24246）；Copilot CLI：禁用服务器告警噪音（#5222）

**4. 长会话稳定性与上下文工程**（4/7 工具）
- Claude Code：压缩后工具 schema 丢失（#112250）、缓存重写（#112264）
- Gemini CLI：输出截断（#30234）、压缩后恢复约束；Qwen：#16895 同类处理

**5. 非交互 / ACP / SDK 路径成熟化**（4/7 工具）
- Gemini CLI ACP 专项五连修；Copilot CLI：`-p` 模式回归（#5574）、hooks 不生效（#4640）；Qwen：Harness kernel headless/ACP 重构

## 四、差异化定位分析

| 维度 | Claude Code | Codex | Gemini CLI | Copilot CLI | OpenCode | Qwen Code |
|---|---|---|---|---|---|---|
| **功能侧重** | 企业级 agent 工作流、插件生态 | TUI 可定制性（statusline 系统）、多端（cloud/桌面） | Subagent 体系、AST-aware 工具、安全加固 | GitHub 原生集成、插件市场、企业合规 | 开源中立多 provider、桌面/TUI 一致性 | 订阅商业化闭环、Managed/嵌入式架构 |
| **目标用户** | 重度付费订阅用户（多账号诉求强烈） | ChatGPT Work 企业 + 终端极客 | 开发者 + 协议生态共建者 | GitHub/企业生态内用户 | 开源社区、自定义 provider 用户 | 国内 + 订阅用户，移动伴侣生态 |
| **技术路线** | 闭源 monolith，社区推动反哺开源诉求 | Rust CLI + TUI 快速自动化迭代 | TS 开源，ACP 标准积极参与者 | 发布流水线高频补丁驱动 | 自研插件体系 + 远程 workerd 浏览器流 | Java/Spring Managed Agent + Harness 内核重构 |

## 五、社区热度与成熟度

- **Claude Code**：用户基数最大（单 issue 1111 👍），但官方流水静默——处于“成熟但响应迟缓”阶段，开源诉求 PR（#41518 反编译 1906 个源文件）反映社区张力。
- **Codex**：最活跃的官方开发流（一天 20 PR 合入，机器人自动化），迭代快但发布质量波动（启动级崩溃回归）。
- **Gemini CLI**：外部贡献者质量最高（安全 PR 潮），开源协作健康，属**快速追赶期**。
- **Copilot CLI**：一天 3 个补丁版本，节奏过快已引发回归投诉（1.0.115 系列问题频现）。
- **OpenCode / Qwen Code**：均处于架构大重构期（Fiber 作用域化 / Harness kernel），功能演进快但质量债务明显。
- **Kimi Code CLI**：无活动，社区活跃度垫底。

## 六、值得关注的趋势信号

1. **“可观测性”成为下一战场**：Gemini subagent 误报成功、Claude 缓存被静默重写、Copilot 无诊断错误信息——各工具的隐性故障都在向“状态不可信、成本不可归因”集中。构建 agent 的团队应优先投资执行追踪与 token 归因。

2. **沙箱安全是规模化部署的前置条件**：OpenCode 整盘删除事故、Codex Full access 失效群、Qwen 权限绕过共同表明 shell 转义与审批链路仍是软肋。生产环境建议 fail-closed 策略（Qwen #18370 的 CI 做法值得借鉴）+ 外部守护插件（opencode-win-guard 模式）。

3. **headless/ACP/SDK 用户话语权上升**：三条产品线（Gemini ACP、Copilot `-p`、Qwen Harness）都在系统性补非交互路径。CI/自动化场景的退出码契约、hooks 完整性应作为选型硬指标。

4. **多 agent 协作是明确方向**：Agent Teams、前台 subagent、状态上报等需求在 4 个社区同时升温——编排框架将比单 agent 质量更快成为差异化卖点。

5. **迭代速度与质量债务的剪刀差**：Codex 和 Copilot 的高频发版均伴随阻断级回归；Qwen 的 CI 红灯刷屏污染信号。对开发者的启示：**升级前锁定版本、验证关键路径，警惕“发布说明 Fixed 项”之外的静默变更**。

6. **开源 vs 闭源张力显性化**：Claude Code 社区反编译级开源 PR、Gemini CLI 的活跃外部安全贡献，显示开源协作正成为获取信任与安全审计的实际通道——Gemini CLI 今日的 4 个安全 PR 全部来自社区即为明证。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-11-26，来源：github.com/anthropics/skills）

---

## 1. 热门 Skills 排行

| # | Skill / PR | 功能 | 讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | [mcp-builder 修复 MCP v2 兼容](https://github.com/anthropics/skills/pull/1742) | 适配 `mcp>=2.0.0` 的 `streamable_http_client` 重命名与自定义 HTTP 头 | MCP SDK 大版本升级导致 skill 脚本批量失效，是工具链兼容性最集中的痛点 | OPEN |
| 2 | [skill-creator 触发评测修复](https://github.com/anthropics/skills/pull/1298) | 隔离 trigger evals，修复 Windows 上 select() 失败及误报 | 对应高热 Issue [#556](https://github.com/anthropics/skills/issues/556)（0% 触发率）与 [#1352](https://github.com/anthropics/skills/issues/1352)（并行 worker 串号），评测可信度是社区核心关切 | OPEN |
| 3 | [pyxel 复古游戏开发](https://github.com/anthropics/skills/pull/525) | 用 Pyxel 创建/调试/验证 Python 复古游戏，含 headless 运行与帧检查 | 长寿 PR（2026-03 至今仍活跃更新），作者为 Pyxel 本尊，社区持续关注能否合入 | OPEN |
| 4 | [webapp-testing 安全加固](https://github.com/anthropics/skills/pull/1980) | 移除 `shell=True`，消除命令注入风险（CWE-78） | 与安全信任边界议题（Issue #492，46 条评论，仓库最热）形成呼应 | OPEN |
| 5 | [docx 修订处理修复](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时正确报错，并验证输出无残留修订标记 | 文档技能（docx/xlsx/pptx）的脚本健壮性是社区贡献最密集区域 | OPEN |
| 6 | [md2video-audio](https://github.com/anthropics/skills/pull/1703) | Markdown → MP4 视频 + 拟真配音（Marp 流水线，零成本） | 内容创作类 skill 的代表性贡献，社区兴趣高 | OPEN |
| 7 | [notion-spec-to-implementation + 简历审计](https://github.com/anthropics/skills/pull/1245) | 将产品/技术 Spec 转为 Notion 实施任务；量化简历审计 | 工作流自动化方向的典型提案 | OPEN |
| 8 | [proofcore-contract-auditor](https://github.com/anthropics/skills/pull/1771) | Solidity/Rust 合约静态分析 + TON 链上审计公证 | Web3 场景；但以 `anthropic/` 命名空间分发社区 skill 引发信任边界争议（见 Issue #492） | OPEN |

> 说明：本批次 PR 评论数据缺失，排序综合 PR 存续时长、更新活跃度及对应 Issue 热度（如 #556 的 13 条评论、#1352 的 6 条评论）推断。

---

## 2. 社区需求趋势

- **安全与信任治理**（最热）：社区 skill 冒用 `anthropic/` 命名空间造成信任边界滥用（[#492](https://github.com/anthropics/skills/issues/492)，46 评论）——诉求是官方签名/命名空间隔离机制。
- **Skill 可评测性**：trigger rate 误报、eval 脚本跨平台失效（[#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)）——社区希望有可信的 skill 触发质量基准。
- **组织级共享**：org 内 skill 库与直接分享链接（[#228](https://github.com/anthropics/skills/issues/228)，17 评论）。
- **上下文效率**：`claude-api` 一次性注入 ~156k token 挤爆上下文（[#1487](https://github.com/anthropics/skills/issues/1487)）；compact-memory 符号化压缩 agent 状态提案（[#1329](https://github.com/anthropics/skills/issues/1329)）。
- **质量门禁工作流**：推理质量三闸门管道提案——校准→对抗审查→交付验证（[#1385](https://github.com/anthropics/skills/issues/1385)）。
- **文档技能健壮性**：docx/xlsx 脚本误报成功、命名空间丢失、外部链接误检（[#2018](https://github.com/anthropics/skills/issues/2018) 等），社区持续以 PR 形式修补。

---

## 3. 高潜力待合并 Skills

- [#1742 mcp-builder MCP v2 适配](https://github.com/anthropics/skills/pull/1742) — 修复引用 Issue #1668，工具链兼容刚需，最可能优先落地。
- [#1298 skill-creator eval 修复](https://github.com/anthropics/skills/pull/1298) — 直击 #556/#1352 两个高热 Bug，合并动机强。
- [#1681 skill-creator package_skill.py 可独立执行](https://github.com/anthropics/skills/pull/1681) — 2026-11 仍在更新，接近收尾。
- [#2019 xlsx 工作表级 defined names 修复](https://github.com/anthropics/skills/pull/2019) — 修复对应 Issue #2013，验证路径清晰。
- [#525 pyxel](https://github.com/anthropics/skills/pull/525) — 持续 8 个月维护，作者权威性高，若官方扩展“娱乐/游戏”类别则大概率合并。
- [#1792 docx 修订超时报错](https://github.com/anthropics/skills/pull/1792) — 小而正确的健壮性修复，合并阻力低。

---

## 4. Skills 生态洞察

**社区最集中的诉求是“可信度”**：一方面要求官方建立命名空间隔离与签名机制以区分官方/社区 skill（#492），另一方面要求 skill 的触发评测与脚本执行结果本身可验证、不静默失败（#556/#1352 及大量 docx/xlsx 修复 PR）——即从“能用的 skill”走向“可信任、可度量的 skill”。

---

# Claude Code 社区动态日报 — 2026-11-26

## 今日速览

今日无新版本发布。社区焦点集中在**缓存与成本类 bug**（#112264 事件 nonce 重铸导致 prompt 缓存失效，可能带来显著额外开销）和**macOS 睡眠计时 bug**（#112366 影响所有超时机制）。同时两条“开源 Claude Code”的 PR 再次活跃，多账号管理需求（#18435）热度持续攀升至 256 评论、1111 👍。

---

## 版本发布

过去 24 小时无新 Release。

---

## 社区热点 Issues

1. **[#18435](https://github.com/anthropics/claude-code/issues/18435)** — Claude Desktop 多账号管理与一键切换配置（256 评论 / 1111 👍）。呼声最高的长线需求，创建近一年仍持续活跃，反映多订阅/工作账号用户的强烈痛点。

2. **[#112264](https://github.com/anthropics/claude-code/issues/112264)** — Code Mode 中事件 nonce 使用进程级密钥重铸，每次 `resume` 都会从首个工具结果起重写 prompt 缓存。可复现、影响成本，对长会话用户的 token 账单影响直接，值得关注。

3. **[#96326](https://github.com/anthropics/claude-code/issues/96326)** — 长会话中读取英文工具输出后回复漂移为英文，尽管 CLAUDE.md 与会话设置均要求日语，纠正不生效。多语言用户的典型痛点，42 👍。

4. **[#107077](https://github.com/anthropics/claude-code/issues/107077)** — Cowork 云会话以“deprecated 模式”启动，插件 hooks 与斜杠命令完全不执行。二态、非间歇性的行为，插件生态可靠性问题。

5. **[#112250](https://github.com/anthropics/claude-code/issues/112250)** — 压缩（compaction）后，通过 ToolSearch 加载的工具丢失 schema，而 alwaysLoad 工具被重发，导致模型“凭记忆”调用工具。涉及 2.1.328–332 版本，tool search 默认开启时影响面广。

6. **[#112062](https://github.com/anthropics/claude-code/issues/112062)** — MCP OAuth 的 `authServerMetadataUrl` 流程未发送 RFC 8707 `resource` 参数，导致 `invalid_target` 登录失败。可复现，影响合规 MCP 服务器的接入。

7. **[#112366](https://github.com/anthropics/claude-code/issues/112366)** — macOS 睡眠时间计入所有超时计时器（MCP 空闲超时、hook 超时、Bash 限制），唤醒后立即误触发超时。可复现，macOS 用户的隐性稳定性问题。

8. **[#112368](https://github.com/anthropics/claude-code/issues/112368)** — WSL2 长交互会话数小时后 Bun segfault（0x5）/ SIGABRT，与 #94462 同 panic 文本但发生在运行中而非启动。长会话可靠性问题的新证据。

9. **[#111999](https://github.com/anthropics/claude-code/issues/111999)** — MCP 工具结果只有 `structuredContent` 到达模型，claude.ai Gmail `search_threads` 丢失 snippet、日期、labelIds 等关键信息。回归类 bug，压缩了 MCP 数据面。

10. **[#94484](https://github.com/anthropics/claude-code/issues/94484)** — 内置 `update-config` skill 每次调用都输出数千行完整 settings.json schema，白白消耗 token 并稀释上下文。成本 + 上下文污染双重影响。

---

## 重要 PR 进展

过去 24 小时内仅 2 条 PR 更新，且均为社区提交的长期开放 PR：

1. **[#41518](https://github.com/anthropics/claude-code/pull/41518)** — “Fully Open Source Claude Code”：从 npm 包中的 `cli.js.map`（57MB）提取 1906 个 TypeScript 源文件，配置 Bun 打包并成功构建运行。工程量可观，但合并可能性存疑。
2. **[#41447](https://github.com/anthropics/claude-code/pull/41447)** — “open source claude code ✨”，关联 #59 等多个长期开源诉求 issue。

> 注：官方 PR 流水今日无更新，核心修复进展主要体现于 Issues 的讨论与标签变化。

---

## 功能需求趋势

- **账号/订阅管理**：多账号切换（#18435）、计费透明度（#112377 明示 `claude -p` 走 API key 计费）、升级购买失败（#111947）。
- **缓存与成本优化**：缓存失效 bug（#112264）、skill 输出冗余（#94484）、插件通过 cache edits 清理旧工具结果以保留缓存前缀（#112380/#112382）。
- **MCP/连接器生态**：分层 scope 模型与命名实例（#112359）、CLI 层 enable/disable MCP 服务器（#112371）、OAuth 兼容性修复（#112062）。
- **桌面/移动端一致性**：Full Disk Access 权限随更新失效（#112379）、移动端 GitHub 连接失败（#111261）、Desktop Code tab 连接器关闭后仍列出工具（#112370）。
- **可复现评测**：请求跨订阅计划一致的内置工具 prompt（#112373），反映 eval/repro 需求增长。

---

## 开发者关注点

- **长会话稳定性**仍是最大痛点：压缩后工具 schema 丢失（#112250）、Bun 崩溃（#112368）、静默 auto-compaction（#112372）、并行 agent 导致未测试变更堆积（#112374）。
- **成本可观测性不足**：缓存被无意重写、skill 输出膨胀等隐性 token 消耗，用户难以归因。
- **行为一致性问题**：语言漂移（#96326）、Cowork 二态模式（#107077）、Opus 5.5 安全护栏误报无关会话（#112369，测量值 9.5%）。
- **平台级细节**：macOS 睡眠计时（#112366）、sandbox 拒写 `$CLAUDE_JOB_DIR/tmp`（#112375）、VS Code 自定义配置目录下 ENOENT（#112381）。
- **模型质量反馈**：Fable 5.2 高 effort 下忽略需求、过度拒绝（#112376、#112378），提示新版模型在指令遵循上仍有调优空间。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 · 2026-11-26

## 一、今日速览

Codex 今日发布 `rust-v0.174.0-alpha.6` 预发布版本。社区焦点集中在两大方向：一是 **ChatGPT Work 沙箱权限失效**问题在 macOS 与 Windows 上集中爆发（用户选择 Full access 仍被限制为 workspace-write），涉及多个高互动 Issue；二是 CLI/TUI 侧更新活跃，copyberry 机器人一天内合入约 20 个 PR，重点优化 TUI 交互（侧边栏鼠标控制、快捷键提示、Unicode 模糊匹配修复等）。

## 二、版本发布

- **[rust-v0.174.0-alpha.6](https://github.com/openai/codex/releases)** — alpha 预发布版本，Release Notes 未附详细说明。结合近期 PR 推测包含 TUI 侧边栏重构、statusline 布局增强、MCP 改进等内容。

## 三、社区热点 Issues

1. **[#35446](https://github.com/openai/codex/issues/35446)** — Windows 10 Computer Use 在 FrameArrived 中等待 SoftwareBitmap 转换时死锁（70 条评论）。长期未修复的老问题，涉及 Windows 屏幕采集底层实现。
2. **[#62650](https://github.com/openai/codex/issues/62650)** — macOS 26.1117.31558 版本在壁纸着色回退路径下启动即崩溃（59 评论，20 👍）。**启动级阻断回归**，影响面广，是当前最严重的 macOS 桌面问题。
3. **[#62907](https://github.com/openai/codex/issues/62907)** — 11 月 21 日更新后 Windows/ChatGPT Work 本地执行选择器消失，SSH 即使开启 Full access 仍被阻止（16 评论，20 👍）。
4. **[#42998](https://github.com/openai/codex/issues/42998)** — macOS 开启音频可视化后切换会话导致语音输入跨应用失效（15 评论）。
5. **[#44343](https://github.com/openai/codex/issues/44343)** — 已删除会话残留在侧边栏，返回 404 `conversation_deleted` 无法移除（15 评论）。
6. **[#63270](https://github.com/openai/codex/issues/63270)** — macOS 26.1117.41037 下 ChatGPT Work 无视 Full access，工具内核始终运行在 workspace-only Seatbelt 沙箱（10 评论）。与 #62907、#64039 构成跨平台的同类权限失效群。
7. **[#62187](https://github.com/openai/codex/issues/62187)** — Windows 桌面模型目录缺失 GPT-6.2 Astra/Sol，更新器误报 up_to_date（8 评论）。
8. **[#63822](https://github.com/openai/codex/issues/63822)**（已关闭）— TUI FenceTracker 在引用行内错误关闭代码围栏，直接由今天的 [PR #64058](https://github.com/openai/codex/pull/64058) 一并修复。
9. **[#56601](https://github.com/openai/codex/issues/56601)** — 功能需求：允许 CLI/TUI 用户连接 dot 无需桌面应用（5 评论，14 👍），反映 CLI 优先用户群的诉求。
10. **[#63267](https://github.com/openai/codex/issues/63267)** — macOS 桌面端 AirPods 听写 10 秒超时，尽管持续收到音频帧（8 评论）。

## 四、重要 PR 进展

1. **[#64058](https://github.com/openai/codex/pull/64058)** — 修复 Unicode 模糊匹配（希腊字母 sigma 变体）及斜杠弹窗激活问题，关闭 #63822。
2. **[#64055](https://github.com/openai/codex/pull/64055)** — TUI 侧边栏新增鼠标控制：点击 `›` 隐藏、`‹` 恢复，解决键盘隐藏后无法重开的痛点。
3. **[#64013](https://github.com/openai/codex/pull/64013)** — 修复 Windows PowerShell hook 中原生退出码丢失问题，避免 `PreToolUse` hook 无法正确阻断工具调用。
4. **[#64023](https://github.com/openai/codex/pull/64023)** — TUI 支持数值型 MCP elicitation 字段，之前数值表单只能回退到通用审批提示。
5. **[#64018](https://github.com/openai/codex/pull/64018)** — 流式输出期间保持中断引导可见，避免用户不知道可用快捷键打断执行。
6. **[#64015](https://github.com/openai/codex/pull/64015)** — 背景命令的启动与延迟结果在 TUI 中正确显示，命令生命周期可跨 turn。
7. **[#64052](https://github.com/openai/codex/pull/64052)** — 能力发现遵循 per-executor 插件设置，禁用单环境插件不影响其他环境。
8. **[#64011](https://github.com/openai/codex/pull/64011)** — HTTP 恢复期间清理被遗弃的 MCP 会话，避免占用服务器容量。
9. **[#64008](https://github.com/openai/codex/pull/64008)** — 自定义 statusline 新增方向性 `box` 元素（行/列布局），配合 [#64009](https://github.com/openai/codex/pull/64009)（弹性 spacer）、[#64010](https://github.com/openai/codex/pull/64010)（inline badge）、[#64007](https://github.com/openai/codex/pull/64007)（maxLines），statusline 可定制能力大幅增强。
10. **[#64016](https://github.com/openai/codex/pull/64016)** — 发布构建中捆绑 Statsig 客户端 key，使 feature gate 在正式版可用。

## 五、功能需求趋势

- **CLI/TUI 体验深化**：statusline 布局系统、侧边栏鼠标交互、命令中心快捷键——TUI 正在向成熟终端 IDE 的可定制性看齐。
- **CLI 与 dot 生态打通**：#56601 等需求显示用户希望 CLI/TUI 无需桌面应用即可授权 computer use。
- **跨设备/远程会话**：Windows→iOS 会话同步缺失（#64043）、Codex cloud 发布失败（#54764）等问题表明多端一致性是关注焦点。
- **新模型可用性**：GPT-6.2 Astra/Sol 目录缺失（#62187）反映用户对新模型触达的强烈期待。
- **MCP 生态健壮性**：elicitation 数值字段、会话清理等 PR 显示 MCP 集成持续打磨中。

## 六、开发者关注点

1. **沙箱权限配置是最大痛点**：ChatGPT Work 的 Full access 设置在 macOS（#63270、#64039）和 Windows（#62907、#55336）上均被忽略，SSH/LAN 访问被阻断且缺乏升级路径——多个高 👍 Issue 聚焦于此，建议官方优先澄清或修复。
2. **启动稳定性回归频发**：macOS 壁纸崩溃（#62650）与 Windows 挂起（#63913）均为更新后阻断级问题，桌面端发布质量需关注。
3. **错误反馈不透明**：多个 Issue（#60790、#64014）反映命令被拒或会话查找失败时无诊断信息，对应 PR 已开始改进 TUI 错误透出。
4. **终端兼容性长尾**：JetBrains 终端乱码（#52003）、iTerm2 未读标记（#47775）、Ghostty 滚动泄漏（#55134，已关闭）显示终端生态兼容仍是持续投入方向。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-11-26 | 数据来源：google-gemini/gemini-cli**

---

## 📌 今日速览

今日无新版本发布，社区焦点集中在 **Subagent 可靠性与状态误报**（P1 级 Issue #22323 引发热议）以及 **一批安全类 PR 的集中提交**（SSRF 防护、MCP OAuth 绑定、遥测重定向防护等）。同时 ACP（Agent Client Protocol）模块迎来多轮质量修复，显示维护团队正系统性补齐非交互模式的短板。

---

## 🚀 版本发布

过去 24 小时无新 Release。（注：近期 Issue 中提及版本为 0.70.0）

---

## 🔥 社区热点 Issues（Top 10）

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 后误报为成功**
   P1 级。`codebase_investigator` 在未做任何分析就触发轮次上限时，仍报告 `status: success`，掩盖了实际中断。14 条评论为今日最高，状态误报直接误导上层 agent 决策，是 Subagent 可观测性的核心缺陷。

2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由**
   9 条评论。提议利用 Gemini 3 原生 bash 能力（grep/cat/sed/awk 链式调用），配合沙箱与意图路由兼顾安全与性能，是 agent 执行架构的重要方向性讨论。

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist agent 无限挂起**（P1，👍8）
   委派给通用 agent 后连建文件夹都永久挂起，等待 1 小时无响应；禁用 subagent 即恢复正常。直接影响日常可用性。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST-aware 文件读取/搜索/代码库映射评估**
   7 条评论，EPIC 级。探索 AST 感知工具以精确读取方法边界、减少 token 噪声，关联子 Issue #22746/#22747（评估 tilth、glyph、ast-grep 等工具）。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 不主动使用 skills 和 subagents**（P1）
   用户反映自定义 skill/subagent 几乎从不被自主调用，仅在显式指令下才使用，存在明显的调度/路由问题。

6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 配置**（P2）
   `AgentRegistry` 正确合并了配置但运行时未生效（如 `maxTurns`），配置链路存在断点。

7. **[#29541](https://github.com/google-gemini/gemini-cli/issues/29541) CLI 注入空 `core.sshCommand` 导致 Git SSH 失败**
   自 0.57.0 起在 macOS 上所有远程 Git 命令报 `fatal: unable to fork`，影响范围广且持续多个版本未修复。

8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) Browser subagent 在 Wayland 下失败**（P1）
   Linux Wayland 环境 browser agent 直接不可用，桌面环境兼容性缺口。

9. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 超过 128 个工具时触发 400 错误**（P2）
   大量 MCP 服务器接入场景下工具数量超 API 限制，需更智能的工具范围裁剪。

10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) Agent 应阻止/抑制破坏性操作**
    复杂 git 操作中偶发使用 `git reset`/`--force`，需在 agent 层建立危险命令防护机制，与安全 PR 潮呼应。

---

## 🔀 重要 PR 进展（Top 10）

**安全修复（今日集中涌现，多为 11-25 提交）：**

1. **[#30477](https://github.com/google-gemini/gemini-cli/pull/30477) fix(web-fetch): 修复 DNS 主机名与重定向导致的 SSRF**
   URL 初检通过后可经重定向/代理跳转至内网目标，此 PR 补齐 redirect hop 校验（复活自 #27739）。

2. **[#30475](https://github.com/google-gemini/gemini-cli/pull/30475) 将 MCP OAuth token 绑定到签发时的服务器 URL**
   服务器 URL 被重指向其他 origin 时不再静默重放旧 token，改为要求重新认证。

3. **[#30478](https://github.com/google-gemini/gemini-cli/pull/30478) 将 MCP 工具审批绑定到具体工具定义**
   修复 `ProceedAlways` 仅按名称记忆审批、`tools/list_changed` 后旧审批误覆盖新定义的漏洞。

4. **[#30476](https://github.com/google-gemini/gemini-cli/pull/30476) 阻止受信工作区设置重定向遥测导出**（P2）
   恶意仓库可一键 trust 后通过 `.gemini/settings.json` 窃取遥测数据，此 PR 隔离了 `telemetry.otlpEndpoint` 等敏感键。

5. **[#30473](https://github.com/google-gemini/gemini-cli/pull/30473) 排除已驱逐二进制载荷的检索字节预算**
   修复旧图片 read_file 无限占用豁免预算导致上下文膨胀的问题（#30446）。

**ACP 质量专项：**

6. **[#30236](https://github.com/google-gemini/gemini-cli/pull/30236)（已合并）ACP 并行执行可并行工具调用**
   对齐 CLI Scheduler 行为，多个独立工具调用并行执行，多命令轮次耗时大幅缩短。

7. **[#30234](https://github.com/google-gemini/gemini-cli/pull/30234)（已合并）ACP 按与 CLI 一致的方式截断大输出**
   此前一个 `seq 1 60000` 调用消耗 369k token，现统一走 `truncateOutputIfNeeded`。

8. **[#30353](https://github.com/google-gemini/gemini-cli/pull/30353) 统一 ACP token 用量跟踪与配额元数据**
   修复取消轮次丢失 usage 数据（#24280）及配额元数据缺失（#27985）。

9. **[#30362](https://github.com/google-gemini/gemini-cli/pull/30362) ACP 上报 agent 停止原因**
   处理 `AgentExecutionStopped` 事件，停止原因以 assistant 消息发出而非静默空轮次结束（#30199）。

10. **[#30246](https://github.com/google-gemini/gemini-cli/pull/30246)（已合并）修复 Windows `/ide install` 路径含空格失败**
    cmd.exe 下对 IDE CLI 路径加引号，VS Code 默认安装目录（含空格）场景修复。

---

## 📈 功能需求趋势

- **Subagent 体系深化**：今日 30 条热点 Issue 中 25+ 条带 `area/agent` 标签，覆盖可靠性（挂起、误报）、并行协作（#18287）、共享内存、自我感知（#21432）、轨迹可观测（#22598）等，是绝对主线。
- **AST-aware 工具链**（#22745/#22746/#22747）：以精确读取、结构化搜索降低 token 消耗、提升 agent 质量。
- **Agent 安全与沙箱**：零依赖沙箱（#19873）、破坏性操作防护（#22672）、per-workspace 策略（#18397）。
- **ACP/非交互模式成熟化**：会话释放、并行执行、输出截断、token 追踪等系统性补齐。
- **上下文与 token 效率**：“Tactful Extraction” 精准读取（#19561，当前基线 36.6k token/轮）、持久化文件任务追踪替代 WriteToDo（#18836）。

---

## ⚠️ 开发者关注点

1. **Subagent 状态不可信**：成功/GOAL 误报 + 挂起 + `/bug` 报告不含子代理上下文（#21763），排障体验差，是当前最高频痛点。
2. **配置链路断裂**：settings.json 覆盖不生效（#22267）、symlink agent 不被识别（#20079），用户自定义能力受阻。
3. **平台兼容性**：Wayland browser agent 失败（#21983）、macOS Git SSH 失败跨 4 个版本未修（#29541）、Windows 路径空格问题（#30246）。
4. **规模化工具冲突**：MCP 生态扩展下 128 工具上限（#24246）日益成为瓶颈。
5. **安全态势**：社区贡献者今日集中提交 4 个安全 PR（SSRF、OAuth 绑定、遥测重定向），提示用户关注信任工作区与 MCP 服务器配置风险。

---
*本日报基于 GitHub 公开数据自动汇总，链接均指向对应 Issue/PR 原文。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-11-26

## 一、今日速览

过去 24 小时内 Copilot CLI 密集发布了多个补丁版本（v1.0.117-0 至 v1.0.117-2），重点修复了模型选择器、扩展工具暴露和 Shell 审批提示等体验问题。社区方面，agent checkpoint refs 污染仓库（#5323）和多根工作区支持（#1826）仍是讨论最热烈的话题，昨日新增了多个与插件市场、语音输入和 Windows 沙箱相关的 triage issue。

## 二、版本发布

**v1.0.117-2**（最新补丁）
- 修复 `copilot help extensions` 的误导说明：扩展仅在已通过 `--allow-all-tools`、`--yolo` 或先前保存的审批时才会自动启动
- 修复 Copilot 发送 flags（如 line）时内置搜索失败的问题

**v1.0.117-1**
- `/model` 选择器现在会展示服务通知并标记即将退役的模型
- 仓库 pinned 的模型指向不可用 provider 时，改为报错而非静默切换 provider

**v1.0.117-0**
- **新增**：显式工具暴露（explicit tool exposure），允许自定义 agent 按需选择加入工具
- 修复：GitHub 登录未完成时恢复 CLI 会话可正确加载 Copilot Connectors；后台 agent 在重启 CLI 后可继续对话

其余 1.0.116 系列版本还包含：扩展 manifest 的构建时 JSON Schema、全屏时间线的"跳转到最新”、ACP 编辑器中按模型选择上下文大小等能力。

## 三、社区热点 Issues（精选 10 条）

1. **[功能请求] 允许禁用 agent checkpoint refs（`refs/agents/*`）** — [#5323](https://github.com/github/copilot-cli/issues/5323)
   最受关注的功能请求之一（8 评论 / 6 👍）。每轮 agent 对话都会以用户 git 身份在仓库创建 checkpoint ref，污染所有渲染 refs 的工具。社区强烈希望提供关闭开关。

2. **[功能请求] 多根工作区（.code-workspace）支持** — [#1826](https://github.com/github/copilot-cli/issues/1826)
   22 👍 的高热度需求。CLI 通过 `/ide` 连接 VS Code 时不读取 `.code-workspace`，导致额外根目录下的 `AGENTS.md` 等指令文件被忽略。

3. **频繁的 transient API error 重试失败** — [#2073](https://github.com/github/copilot-cli/issues/2073)
   13 👍。"Request failed due to a transient API error. Retrying..." 大量重复出现，影响日常使用稳定性。

4. **会话在 turn 结束时永久卡死** — [#4755](https://github.com/github/copilot-cli/issues/4755)
   排队消息在 turn 结束时到达会导致会话既不 idle 也不 running，只能杀进程恢复。属于严重稳定性问题。

5. **插件 skills 未注入主 agent 的 available_skills** — [#2753](https://github.com/github/copilot-cli/issues/2753)
   `/skills` UI 显示 18 个技能，但系统提示词中只有内置技能，导致 agent 无法调用插件技能。

6. **ACP 未暴露 Copilot Fusion 及其 tier 配置** — [#5354](https://github.com/github/copilot-cli/issues/5354)
   11 👍。交互式 CLI 可用 Fusion，但 ACP 只广播 Auto 路由，T3 Code 等客户端无法提供 Fusion 选择器。

7. **Windows 企业环境：ConstrainedLanguage 模式下每条命令报错** — [#4683](https://github.com/github/copilot-cli/issues/4683)
   AppLocker/WDAC 管控环境下，`$host.SetShouldExit()` 被 PowerShell 拒绝，每条 shell 命令都附带虚假错误。企业用户的重大痛点。

8. **被禁用的 MCP server 仍报"blocked by policy"且警告重复** — [#5222](https://github.com/github/copilot-cli/issues/5222)
   启动时对 `disabledMcpServers` 中已显式禁用的服务器仍输出政策警告，且重复两次，信息噪音问题。

9. **Agent Plugins 1.0 的 `.instructions.md` 和 `applyTo` frontmatter 被静默忽略** — [#5440](https://github.com/github/copilot-cli/issues/5440)
   新插件规范中 skills/MCP/agents/hooks 均可加载，但规则文件被忽略，影响插件生态兼容性。

10. **`-p` 模式下 agent 成功但无结论输出时直接失败** — [#5574](https://github.com/github/copilot-cli/issues/5574)
    1.0.115 起的回归问题，破坏了依赖非交互模式退出码的自动化流水线。

## 四、PR 进展

过去 24 小时仅更新 2 个 PR，均为已关闭的外部贡献：

- **Create devcontainer.json** — [#4316](https://github.com/github/copilot-cli/pull/4316)（CLOSED）
- **Add initial devcontainer configuration** — [#4428](https://github.com/github/copilot-cli/pull/4428)（CLOSED）

两个 PR 均围绕 devcontainer 配置，最终未合入。本日无活跃 PR 动态，开发迭代主要体现为 release 补丁流。

## 五、功能需求趋势

从近期 Issues 提炼出的社区关注方向：

- **配置可控性与清洁度**：禁用 checkpoint refs（#5323）、`--max-autopilot-continues` 持久化（#4454）、历史导航限制在当前会话（#5576）——用户普遍希望更多细粒度开关。
- **ACP / 编辑器集成**：Fusion 模型暴露（#5354）、toolCall.title 显示真实命令（#4335）、上下文大小按次选择，ACP 已是仅次于交互 CLI 的第二战场。
- **插件与扩展生态**：Agent Plugins 1.0 规范兼容（#5440）、插件市场容错（#5582）、托管策略预审批扩展（#5575）、插件技能注入（#2753）。
- **企业 / Windows 环境**：ConstrainedLanguage 兼容（#4683）、GHE.com 登录的更新器失败（#5571）、Windows 沙箱网络白名单（#5580）。
- **模型与路由**：Fusion 不路由到本地 vLLM provider（#5581）、Gemini 4 的 reasoning effort 上报错误（#5518）、退役模型的可视化提示（已在新版修复）。

## 六、开发者关注点

1. **稳定性是最大痛点**：会话卡死（#4755）、API 重试失败（#2073）、`-p` 模式回归（#5574）表明近期快速迭代引入了质量风险，自动化流水线用户受影响明显。
2. **非交互 / SDK 用户话语权上升**：hooks 对 steering 消息不生效（#4640）、工具覆盖被绕过（#5579）等 issue 显示 SDK 集成路径的完整性亟需补齐。
3. **企业合规与安全场景待打磨**：托管策略、WDAC/AppLocker、GHE 认证等场景问题集中出现，说明企业采用率在上升而适配尚不完善。
4. **版本节奏过快**：一天内三个补丁版本，用户在 issue 中频繁提及“从 1.0.114 升级到 1.0.115 后出现回归”，建议关注发布说明中的 Fixed 项并及时升级验证。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-26

## 📌 今日速览

OpenCode 发布 **v2.4.2**，为 GPT-6.2 系列模型（Sol/Astra）适配专用 system prompt 并修复 OpenCode Go 连接后的模型选择问题。社区今日焦点集中于两个高危 Bug：Windows 下 bash 工具因转义问题误删整盘根目录（损失 27 万文件），以及 v1→v2 会话迁移导致所有 OpenAI Chat 会话卡死。此外，`read_terminal` 只读终端工具、`session archive` CLI 命令等 PR 值得关注。

---

## 🚀 版本发布

### v2.4.2
- **GPT-6.2 System Prompt**：GPT-6.2 Sol 与 Astra 以及 `gpt-latest` 别名现在使用为 GPT-6.2 撰写的 system prompt（[#66297](https://github.com/anomalyco/opencode/pull/66297)）
- **OpenCode Go Onboarding 修复**：连接 OpenCode 后，模型选择器可正常列出 OpenCode Go 模型

---

## 🔥 社区热点 Issues

1. **[#66449](https://github.com/anomalyco/opencode/issues/66449) · Windows 下 bash 工具误删整个盘符根目录（27 万文件丢失）**
   ⚠️ 今日最严重事故：模型生成的 `cmd /c "rd /s /q \"...\""` 中 `\"` 在 PowerShell 中不是合法转义，`cmd` 收到以 `\` 开头的单一 token，解析为当前盘符根目录并递归删除。正在 triage，待关闭但影响深远，涉及 shell 转义安全设计。

2. **[#66389](https://github.com/anomalyco/opencode/issues/66389) · v1→v2 会话迁移导致 OpenAI Chat 会话全部卡死（v2.3.2）**
   迁移将客户端执行的 tool part 标记为 `executed: true`，下一轮直接报错 "OpenAI Chat assistant messages only support text..."，无 provider 调用即失败，影响面广。

3. **[#64073](https://github.com/anomalyco/opencode/issues/64073) · [FEATURE] 恢复前台 Subagent 执行（30 评论）**
   今日讨论最热烈的 Issue。用户希望 subagent 可在前台运行以观察/中断过程，30 条评论、13 👍 显示社区对 agent 执行控制粒度的强烈诉求。

4. **[#12711](https://github.com/anomalyco/opencode/issues/12711) · [DESIGN] Agent Teams：扁平团队 + 命名消息通信（已关闭）**
   提议多 agent 并行、互相通信、共享任务协作（24 👍，17 评论）。虽已关闭，但代表社区对多 agent 协作架构的长期期待，与 #64073 呼应。

5. **[#66299](https://github.com/anomalyco/opencode/issues/66299) · 插件重启后 session prompt hook 静默失效**
   长生命周期 serve 进程中插件 re-boot 后 `ctx.session.hook("prompt")` 不再触发且无日志。对 secret redaction 等安全类插件影响大，已关闭（可能已修复）。

6. **[#60702](https://github.com/anomalyco/opencode/issues/60702) · Copilot 模型在共享服务中同步失败（已复现）**
   `--standalone` 模式正常，但桌面端/TUI 使用的 `serve --service` 中 Copilot 模型间歇性丢失，登录后同步超时。影响 GitHub Copilot 用户主力工作流。

7. **[#59293](https://github.com/anomalyco/opencode/issues/59293) · subagent sessionID 续传始终失败（triaging）**
   无论传什么值，工具都收到 `"ses"` 并报 "Subagent session not found"，subagent 会话续传完全不可用。

8. **[#66133](https://github.com/anomalyco/opencode/issues/66133) · 嵌入式 SDK 宿主从不运行 automations（已复现）**
   `OpenCode.create` / `OpenCodeWorkerd.create` 创建的 automation 有 `nextDueAt` 但永不执行——只有 server 进程会触发 `Automation.run`，SDK 嵌入场景功能缺失。

9. **[#61221](https://github.com/anomalyco/opencode/issues/61221) · 桌面端 Markdown 渲染忽略主题 `--markdown-*` 色彩 token**
   TUI 有色、桌面/Web 端单色，主题管线生成的 CSS 变量未被消费，视觉体验割裂。

10. **[#61899](https://github.com/anomalyco/opencode/issues/61899) · 桌面集成终端 Ctrl+C 无法中断进程**
    Python dev server 只能靠 `taskkill /F` 终止，基础终端交互体验硬伤。

---

## 🔀 重要 PR 进展

1. **[#66497](https://github.com/anomalyco/opencode/pull/66497) · [已关闭] feat(core): 新增 read_terminal 只读工具**
   Opt-in、只读的 `read_terminal` 工具，可读取持久终端的屏幕、标题、cwd、前台进程、光标及回滚缓冲，不执行任何输入操作。概念优秀但未合入，值得跟踪后续。

2. **[#66503](https://github.com/anomalyco/opencode/pull/66503) · feat(cli): session archive/unarchive 子命令**
   回应 #63518，新增 `session archive <id>` / `unarchive` 及 `session list` 的 `--archived` 过滤，补齐 CLI 侧会话清理能力。

3. **[#66502](https://github.com/anomalyco/opencode/pull/66502) · refactor(core): 后台 Fiber 作用域化**
   `Shell`/`Watcher`/`PersistentPty` 的后台 fiber 迁入 scoped `FiberSet`，teardown 时正确停止；`InternalPlugin.services` 直接派生自 requirements，消除双列表漂移。

4. **[#66498](https://github.com/anomalyco/opencode/pull/66498) · refactor(core): VCS/Snapshot/Worktree/Project 按 Environment 门控**
   移除 workerd 内联 stub，防止远程 workspace 探测宿主磁盘——架构层安全加固。

5. **[#66500](https://github.com/anomalyco/opencode/pull/66500) / [#66496](https://github.com/anomalyco/opencode/pull/66496) / [#66494](https://github.com/anomalyco/opencode/pull/66494) · Inbox 侧边栏系列修复**
   三连修：折叠 Working 区保留当前会话、Inbox 布局不再创建/复用 tab、恢复 "Recent" 头部。Slack 反馈驱动的快速迭代。

6. **[#66499](https://github.com/anomalyco/opencode/pull/66499) · feat(desktop): 首次退出提示后台服务仍在运行 + 退出即停止选项**
   解决“退出桌面端后终端和 MCP server 仍在跑”的用户困惑，体验补全。

7. **[#66501](https://github.com/anomalyco/opencode/pull/66501) · [已关闭] feat(desktop): 退出时安装更新（opt-in）**
   在 Settings › General › Updates 下新增默认关闭的 "Install updates on quit"，呼应 #60665 的 SSH 远程端升级中断痛点。

8. **[#66217](https://github.com/anomalyco/opencode/pull/66217) · [已关闭] feat(browser): 多路复用二进制 WebSocket 传输远程浏览器流量**
   性能提升显著：10 MiB 下载从 31.67s → 1.83s，VS Code Web 编辑器可用从 24.55s → 3.70s。

9. **[#66377](https://github.com/anomalyco/opencode/pull/66377) · fix(ai): Chat replay 保留托管工具历史**
   Chat Completions 此前拒绝包含 provider 执行工具结果的 assistant 历史，现以单条 labeled part 重放，关闭 #57044。

10. **[#66504](https://github.com/anomalyco/opencode/pull/66504) · fix(core): tool call 缺失必填 key 时展示模型实际发送的 keys**
    调试体验改进：错误信息直接暴露模型的 key 命名，便于诊断 schema 不匹配。

> 另有 #66489/#66490（Seaglass Alpha Free 模型上线配套）与 #66492（ecosystem 插件收录 opencode-win-guard、opencode-crew-mail）值得关注——前者在模型获得流量前完成 stealth 标记，时序处理规范。

---

## 📈 功能需求趋势

- **Agent 执行控制与多 agent 协作**：前台 subagent 执行（#64073）、Agent Teams（#12711）、subagent 续传（#59293）——社区对 agent 编排能力的需求持续升温
- **桌面端体验补齐**：项目侧边栏回归（#66491）、会话批量删除（#66468）、提问弹窗可折叠（#66484）、非会话内文件树预览（#60379）——桌面端与 TUI 的功能/视觉一致性呼声高
- **会话管理 CLI 化**：归档命令（#63518）、会话暂停/定时唤醒（#64249）
- **可观测性**：步骤内 token 分解（#58716）、`--markdown-*` 主题令牌（#61221）
- **连接与模型管理**：自定义 provider 的 GUI 管理（#33704）、SSH 远程跨版本稳定性（#60665）

---

## 🛠️ 开发者关注点（痛点汇总）

1. **安全红线**：Windows 转义缺陷导致整盘删除（#66449）暴露了 shell 命令执行层的安全盲区，`opencode-win-guard` 插件进入生态列表也印证了社区的防护需求
2. **数据完整性**：会话迁移 bug（#66389）+ SQLITE_BUSY 无重试（#65020）+ fork 会话配置冻结（#66448）——存储/迁移层可靠性是高频投诉区
3. **共享服务 vs standalone 行为分裂**：Copilot 模型同步（#60702）、automation 不运行（#66133）、插件 hook 失效（#66299）均只在长生命周期 serve 场景复现，提示共享服务生命周期管理存在系统性问题
4. **Provider 协议兼容性**：Gemini reasoning 片段边界错误（#64792）、OpenAI 兼容流式 string error 拒收（#65315）——非官方 provider 的容错偏严格
5. **iOS/移动端基础体验**：听写无语言设置、俄语输出拉丁转写（#56973）

---

*数据来源：github.com/anomalyco/opencode · 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-11-26

## 📌 今日速览

Qwen Code 发布 **v1.0.0-preview.2**，Qwen 订阅目录新增 Qwen4-Max（1M 上下文、图像/视频输入），并加入额度重置倒计时与 `/upgrade` 命令。CI 健康度是今日最大隐忧：Managed Agent gate / E2E / SDK Java 多条流水线持续红灯，产生大量自动 issue。功能侧，基于 Harness kernel 的全新 CLI 产品包（#18351）与 Managed Agent 嵌入式外部 Runtime 支持成为焦点。

---

## 🚀 版本发布

### v1.0.0-preview.2
- Qwen 订阅目录新增 **Qwen4-Max**：1M 上下文窗口，支持图像与视频输入
- 订阅额度耗尽时显示重置倒计时，新增 `/upgrade` 命令直接打开订阅计划页
- Qwen 订阅请求携带 QwenCode 用户标识

---

## 🔥 社区热点 Issues

1. **[#18252](https://github.com/QwenLM/qwen-code/issues/18252) E2E CI 失败（cron-tools 等 74 项）** — 51 条评论，今日讨论最热的 issue。main 分支 E2E 大面积失败，报告标注为 "Provisional"（可能是 main 推进导致的暂态失败），但如此规模的失败值得警惕。

2. **[#18253](https://github.com/QwenLM/qwen-code/issues/18253) Managed Agent gate 失败：ClassSizeRatchetTest** — 类体积“棘轮”机制触发，说明有类的体积超出了既定上限，反映代码膨胀压力（17 评论）。

3. **[#18379](https://github.com/QwenLM/qwen-code/issues/18379) [P1/安全] `qwen -p` 未加 `--approval-mode` 时读取工作区外文件** — headless 模式下，无标志时会通过 `read_file` 而 `--approval-mode=default` 会拒绝的请求。P1 级权限绕过问题，非交互场景的沙箱边界是安全敏感点。

4. **[#18165](https://github.com/QwenLM/qwen-code/issues/18165) 会话日志明文记录 API key** — 更换 Token Plan key 时，完整 API key 被 `~/.qwen/projects/*/chats/*.jsonl` 明文持久化且在多字段重复存储，文件权限偏宽。敏感信息落盘风险，建议尽快处理。

5. **[#15686](https://github.com/QwenLM/qwen-code/issues/15686) [P2] Active Goal 运行时阻塞普通用户输入** — Goal 回合进行中，Enter 发送的消息和粘贴文本被排队直到 Goal 结束，与快捷键文档宣称的“转向当前回合”行为不符，交互模型存在分歧。

6. **[#16708](https://github.com/QwenLM/qwen-code/issues/16708) [P2] FileChangedWatcher 静默丢失新建子目录中的文件事件** — chokidar 4.0.3 的 snapshot-then-watch 间隙导致对新子目录内文件的写入永远不触发通知，静默丢事件对 hooks/自动化场景伤害大。

7. **[#17489](https://github.com/QwenLM/qwen-code/issues/17489) [P2] Windows 下项目级配置无热重载** — 启动时无 `.qwen` 目录、之后新建的 `settings.json` 永不被当前会话识别，`qwen mcp add --scope project` 后服务器不连接。Windows 体验痛点。

8. **[#18394](https://github.com/QwenLM/qwen-code/issues/18394) [P2] Web Shell E2E smoke 在共享 ARM64 runner 上因 ERR_NETWORK_CHANGED 风暴失败** — 大量无关 PR 被“误伤”标红，持续污染 CI 信号，22 个 spec 跳过 bootRetry，基础设施层面的问题正在拖累整个仓库的 CI 可信度。

9. **[#18339](https://github.com/QwenLM/qwen-code/issues/18339) 工作区级扩展安装（`.qwen/extensions`）** — 对齐 skills 的物理安装模式，附完整设计文档，是扩展生态演进的关键提案。

10. **[#18240](https://github.com/QwenLM/qwen-code/issues/18240) 生态申请：Niro（iPhone 伴侣应用）** — 通过本地 macOS Bridge 连接用户现有 Qwen Code 环境的独立 iOS 客户端，申请进入 README Ecosystem 列表，反映移动端远程控制需求。

---

## 🔀 重要 PR 进展

1. **[#18351](https://github.com/QwenLM/qwen-code/pull/18351) [已合] Qwen Code CLI 登陆 Harness kernel** — 基于 #18314 引入的 Harness 内核（agent loop、TUI、headless、ACP 等）构建新一代 CLI 产品包，属于架构层面的重大演进。
2. **[#18389](https://github.com/QwenLM/qwen-code/pull/18389) Managed Agent 支持嵌入式外部 Runtime/Workspace 执行** — 嵌入式宿主可注入外部 Runtime 客户端与传输层，实现真实的 Workspace 准备/执行/发布/排空，并保留物化回执用于恢复。配套 issue #18386。
3. **[#18370](https://github.com/QwenLM/qwen-code/pull/18370) CI 对“权限面” PR fail-closed** — 外部贡献修改敏感面或探测环境凭证时，自动 triage/review 不再仅靠关键词匹配，而是判断 PR 实际可达范围。安全加固。
4. **[#18390](https://github.com/QwenLM/qwen-code/pull/18390) 保留继承的审批模式** — 区分“未提供”与“显式为空”的 approval mode，修复宿主 Definition 继承被破坏的问题。
5. **[#18378](https://github.com/QwenLM/qwen-code/pull/18378) 隔离嵌入式启动失败** — Managed Agent 初始化失败不再阻断宿主应用其他路径，改在宿主单例就绪后以独立子 Spring context 启动。
6. **[#18120](https://github.com/QwenLM/qwen-code/pull/18120) [已合] 跨设备共享工作区输入历史** — Web Shell 输入历史迁移到本地 daemon 按工作区持久化，桌面与移动客户端共享 prompt 与 shell 命令历史。
7. **[#18377](https://github.com/QwenLM/qwen-code/pull/18377) [已合] 修复发布流水线** — Web Shell 适配器 re-export 私有 core helper 导致 `publish-packages` 停摆，连带修复声明文件泄漏私有导入，阻塞发版的关键修复。
8. **[#18317](https://github.com/QwenLM/qwen-code/pull/18317) [已合] 解释重复工具调用拒绝的恢复方法** — 模型供应商返回 "Repetitive tool calls detected" 时，向用户给出简明原因与恢复指引。
9. **[#18395](https://github.com/QwenLM/qwen-code/pull/18395) [已合] Docker 跳过套件注册规范化** — 修复 v0.28.6 Docker 集成发布门禁因“未注册任何测试的提前 return”而失败的问题。
10. **[#16895](https://github.com/QwenLM/qwen-code/pull/16895) 压缩后恢复受上下文窗口约束** — 按主模型有效上下文窗口限制压缩后恢复的文件/图片，放不下的降级为路径列表，防止附件挤占下一请求空间。

---

## 📈 功能需求趋势

- **托管/嵌入架构（Managed Agent）**：外部 Runtime/Workspace 注入（#18386/#18389）、嵌入启动隔离（#18378）密集出现，正走向“可嵌入组件”形态。
- **Web Shell 体验**：归档会话搜索/排序（#17772）、工作区过滤（#17142）、Git 状态徽章（#18096）、键盘重复触发误取消（#18374）——多界面易用性打磨持续。
- **订阅与模型目录**：Qwen4-Max 上架、`/upgrade` 命令、额度倒计时，商业化闭环在完善。
- **扩展生态**：工作区级扩展安装（#18339）、移动端伴侣应用生态申请（#18240）。
- **本地化**：`/language ui` 全局/工作区优先级混乱（#18391），CJK 上下文告警准确性（PR #14982）。

---

## ⚠️ 开发者关注点

1. **CI 稳定性是当前最大痛点**：E2E、Managed Agent gate、SDK Java、Web Shell smoke 全面飘红（#18252/#18253/#18350/#18394 等），自动 issue 刷屏且多为 "Provisional"，信号噪声比恶化，团队在系统性修复（#18393、#18395）。
2. **安全与隐私**：明文 API key 落盘（#18165）与 headless 权限绕过（#18379）两个未关闭的安全 issue 值得优先关注。
3. **文件/配置监听可靠性**：chokidar 快照间隙丢事件（#16708）、Windows 配置热重载失效（#17489），长会话场景的“静默失效”普遍存在。
4. **供应商兼容性**：硬编码 temperature 导致 400（#12928）、重复工具调用拒绝的恢复引导（#18317），对接非首选模型/端点时摩擦明显。
5. **上下文管理精度**：压缩后恢复体积约束（#16895）、always-on context 告警（#14982）、ACP 启动预算分离（#14985），长会话上下文工程是持续投入方向。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*