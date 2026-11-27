# AI CLI 工具社区动态日报 2026-11-27

> 生成时间: 2026-11-27 02:49 UTC | 覆盖工具: 7 个

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

**数据日期：2026-11-27 | 覆盖 7 个主流工具仓库**

---

## 一、生态全景

AI CLI 工具已进入“体验打磨 + 工程化深水区”阶段：各工具基本完成了能力对齐（子代理、MCP、沙箱、权限系统），竞争焦点转向**长会话稳定性、资源治理、计费透明度与可解释性**。TUI/终端交互精细化是当日最密集的工程投入方向（Codex、Qwen、Gemini CLI 均有大量相关 PR）。同时，Windows/企业环境兼容性、无人值守自动化成为新的分水岭，而回归问题频发（Claude Code 计费、Copilot 多版本回归、OpenCode subagent 后台化）暴露出快速迭代节奏下的质量代价。

---

## 二、各工具活跃度对比

| 工具 | Issue 更新 | PR 更新 | Release | 当日焦点 |
|---|---|---|---|---|
| Claude Code | 50 | 4（3 关闭） | 无 | 计费回归 + macOS 资源泄漏 |
| OpenAI Codex | 50 | 28 | 2（alpha.7/8） | TUI PR 密集，#11023（953👍）关闭 |
| Gemini CLI | ~50 | 10 | 无 | 子代理可靠性 + 当日提交当日修 |
| Copilot CLI | 35 | 0 | **3**（117-3/4/5） | 沙箱企业 CA 证书、checkpoint refs 污染 |
| Kimi Code CLI | 0 | 0 | 无 | 无活动 |
| OpenCode | ~50 | 10 | 无 | Subagent 前台执行移除争议 |
| Qwen Code | ~50 | 10+ | **2**（0.28.6/0.28.7） | serve 性能优化 + CI 治理 |

**要点**：Codex 交付节奏最快（PR+Release 双高）；Copilot 走“小步快跑补丁”模式；Qwen 与 Gemini 依赖社区贡献者即时修复；Claude Code 当日无发版，处于危机响应期。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **用量/计费透明度** | Claude Code、Codex、OpenCode、Gemini CLI | 限额异常耗尽（#112477 等 6+ 条）、静默 429（#58883）、/status 完整用量（#15281）、上下文 token 灌水治理（grep 150K 输出） |
| **子代理/多 Agent 可靠性** | Gemini、OpenCode、Claude Code | MAX_TURNS 误报成功、代理挂起、前台执行被移除争议（#64073 38 评论）、父级通知轰炸 |
| **长会话稳定性与资源治理** | 全部活跃工具 | macOS fseventsd/守护进程泄漏（Claude）、Linux OOM 38GiB（Codex #64246）、808MB events.jsonl（Copilot）、TUI 冷启动 14.6s（OpenCode） |
| **沙箱与企业环境兼容** | Copilot、Qwen、Gemini | 自定义 CA 证书（当日已发版响应）、git submodule/Cypress 被阻断、Bubblewrap 沙箱化 |
| **安全拦截可解释性** | Claude Code、Codex | reasoning_extraction 误拦截 78 次（#111336）、"Extra care for cybersecurity"无理由中断（#64238） |
| **无人值守/自动化** | Claude Code、Qwen、Copilot | 预授权、Managed sessions 冷恢复、后台任务通知可观测性 |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特点 |
|---|---|---|---|
| **Claude Code** | 全栈代理 + 桌面/Remote Control | 重度付费订阅用户（Pro/Max） | 闭源、issue 数量级最大（#11 万+），生态成熟但计费与资源治理承压 |
| **Codex** | TUI 体验 + 云任务 + 桌面端 | ChatGPT 订阅开发者 | Rust 重写，alpha 快速迭代，模型层（GPT-6.2）与应用层深度耦合 |
| **Gemini CLI** | 子代理工程化 + ACP 集成 | 开源贡献者 / 编辑器集成方 | 社区响应极快（当日修），依赖贡献者驱动，原生 bash 能力 + 零依赖沙箱探索 |
| **Copilot CLI** | 企业安全合规 + 权限模型 | 企业 / Windows 用户 | 托管策略、CA 证书、ACP 可嵌入化——向 agent 运行时演进 |
| **OpenCode** | 开源多 Provider + 移动端 | BYOK / 开源社区 | 双实现（TS+Rust），订阅支付成痛点（EU 支付被拒、crypto 诉求 74👍） |
| **Qwen Code** | serve/daemon + 多租户 | 平台构建者 / 非主流平台用户 | Harness 内核、Managed Agent ownership 体系、国际化（阿拉伯语 RTL） |

---

## 五、社区热度与成熟度

- **热度最高**：Claude Code（单 Issue 评论 29、👍 54，issue 编号达 11 万级）与 Codex（#11023 953👍 / 207 评论，953 票反映 Linux 桌面端巨大需求缺口）
- **快速迭代期**：Codex（alpha 同日双发）、Copilot（日发 3 补丁）、Qwen（0.28.6→0.28.7 连发）
- **成熟但承压**：Claude Code——生态最成熟，但计费回归 + macOS 泄漏集中爆发，且 stale 机制误关有效 Issue 削弱社区信任（PR #112436 正在补救）
- **贡献者驱动成长期**：Gemini CLI、OpenCode——修复速度快但回归（0.70.0、subagent 后台化）频出
- **静默**：Kimi Code CLI 零活动，可能进入低维护或内部迭代状态

---

## 六、值得关注的趋势信号

1. **计费信任成为新战场**：四个工具同时爆发计量/限额投诉，用量计量的正确性将成为付费留存的关键变量——尤其 Claude Code 11-13 后的系统性回归。
2. **“写副作用”治理诉求上升**：checkpoint refs 污染仓库（Copilot）、Windows 凭据库堆积 5591、孤儿进程收养——用户要求对工具的系统副作用拥有开关与清理权。
3. **安全机制从“有无”转向“可解释 + 可调整”**：误报拦截、无理由中断引发的不满，预示下一阶段竞争在安全策略的透明度与用户可控性。
4. **回归防护跟不上发布节奏**：各工具均有多版本标注的回归（1.0.99/1.0.115/0.70.0/0.28.x），快速 alpha 发布模式需要更强的回归测试投资，社区 PR 拆分纪律（Qwen 依赖链）值得借鉴。
5. **TUI 与非交互（ACP/SDK）双线并进**：终端体验精细化与可嵌入运行时（Copilot ACP 暴露权限判断器、Gemini ACP 修复）同步推进，CLI 正从“个人工具”演变为“可编排的 agent 基础设施”。
6. **长会话/重资源场景是可靠性边界**：OOM、超大 transcript、冷启动 14.6s 等问题集中出现，重度用户的工程化（监控、超时、优雅降级）需求明确。

**对开发者的建议**：生产工作流中优先验证用量计量与长会话稳定性；企业环境关注 Copilot（CA/托管策略）与 Qwen（沙箱化）；依赖子代理的自动化需警惕误报“成功”与挂起问题；关注 Claude Code 计费回归的官方回应再评估升级。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-11-27，来源：anthropics/skills）

---

## 一、热门 Skills 排行（按社区关注度）

> 注：本批 PR 的评论数数据缺失（undefined），以下按 Issue 侧讨论热度与 PR 内容影响力综合排序。

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复**（[#1742](https://github.com/anthropics/skills/pull/1742)） | 适配 mcp>=2.0 的 `streamable_http_client` 重命名及自定义 header 配置方式变更。MCP 是 Claude Code 生态核心，兼容性修复关注度高 | OPEN |
| 2 | **skill-creator 触发评估修复**（[#1298](https://github.com/anthropics/skills/pull/1298)） | 修复并行 worker 竞争、Windows `select()` 失败导致的误报触发率，回应了 Issues #556/#1352 反映的“0% 触发率”严重问题 | OPEN |
| 3 | **claude-api 文档修复**（[#1730](https://github.com/anthropics/skills/pull/1730)、[#1950](https://github.com/anthropics/skills/pull/1950)） | 修复死链、更新 Python SDK 1.1.0 pause_turn 自动恢复指引；关联 #1487 反馈的 156k token 上下文爆炸问题 | OPEN |
| 4 | **Pyxel 复古游戏开发**（[#525](https://github.com/anthropics/skills/pull/525)） | Python 复古游戏创建/调试/帧检查，作者即 Pyxel 框架作者 kitao，是存活时间最长的社区 PR 之一（8 个月） | OPEN |
| 5 | **document-typography**（[#514](https://github.com/anthropics/skills/pull/514)） | 排版质量控制（孤行、孤字、编号错位），指出“用户不会主动要求好排版”这一隐性需求痛点 | OPEN |
| 6 | **webapp-testing 安全修复**（[#1980](https://github.com/anthropics/skills/pull/1980)） | 消除 `shell=True` 命令注入风险（CWE-78），安全类修复逐渐成为社区贡献重点 | OPEN |
| 7 | **notion-spec-to-implementation**（[#1245](https://github.com/anthropics/skills/pull/1245)） | 将产品/技术 Spec 转化为 Notion 可执行任务（含验收标准与进度跟踪），工作流自动化方向代表 | OPEN |
| 8 | **md2video-audio**（[#1703](https://github.com/anthropics/skills/pull/1703)） | Markdown → MP4 视频 + 语音合成，零成本内容生产，多模态输出方向 | OPEN |

---

## 二、社区需求趋势

1. **信任与安全治理（最强烈）** — Issue [#492](https://github.com/anthropics/skills/issues/492)（46 条评论，本批最高）指出社区 Skill 冒用 `anthropic/` 命名空间构成信任边界漏洞，呼吁官方建立签名/验证机制。
2. **企业级分发能力** — [#228](https://github.com/anthropics/skills/issues/228)（17 评论）：组织内共享 Skill 库，替代目前 Slack 手动传文件的原始方式。
3. **Skill 触发可靠性** — [#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)：`run_eval.py` 评估器在并行模式下产出 0% 触发率，误导 Skill 描述优化，是质量工具链的最大痛点。
4. **上下文经济性** — [#1487](https://github.com/anthropics/skills/issues/1487)：claude-api Skill 单次注入 156k token 耗尽上下文，社区要求渐进式/按需加载参考文档。
5. **长会话 Agent 状态管理** — [#1329](https://github.com/anthropics/skills/issues/1329)：compact-memory（符号化压缩 agent 记忆）；[#1385](https://github.com/anthropics/skills/issues/1385)：推理质量三道门禁 pipeline。
6. **文档处理细节修复** — docx/xlsx/pptx 的脚本级 bug（[#2018](https://github.com/anthropics/skills/issues/2018)、[#1868](https://github.com/anthropics/skills/issues/1868) 等）持续高频出现。

---

## 三、高潜力待合并 Skills（活跃且尚未合并）

- **[#1298](https://github.com/anthropics/skills/pull/1298)** skill-creator 触发评估隔离化修复 — 直接对应两个高热 Issue，官方合入动机最强
- **[#1742](https://github.com/anthropics/skills/pull/1742)** mcp-builder 适配 mcp>=2 — 关联 Issue #1668，生态关键路径修复
- **[#2019](https://github.com/anthropics/skills/pull/2019)** xlsx 工作表级 defined names 误报修复 — 有对应 Issue #2013，明确验证场景
- **[#1792](https://github.com/anthropics/skills/pull/1792)** docx LibreOffice 超时报错+输出校验 — 修复静默失败，近期仍活跃更新
- **[#1997](https://github.com/anthropics/skills/pull/1997)** skill-creator YAML frontmatter 解析修复 — 同一作者连续报告 docx/skill-creator 问题，贡献集中
- **[#525](https://github.com/anthropics/skills/pull/525)** Pyxel Skill — 存活 8 个月仍被更新，或为长期挂起但未拒绝的候选

⚠️ 风险提示：[#1771](https://github.com/anthropics/skills/pull/1771) proofcore-contract-auditor 将审计证明锚定到 TON 区块链，与 #492 反馈的命名空间/信任问题同源，社区对带商业推广性质的第三方 Skill 普遍持警惕态度。

---

## 四、生态洞察（一句话）

**当前社区最集中的诉求是建立 Skills 的“信任与质量基线”——包括官方命名空间防冒用、组织级分发机制，以及可靠的触发评估工具链；同时要求官方 Skill 自身（claude-api、docx/xlsx 脚本）先解决上下文爆炸与静默失败问题，再谈生态扩张。**

---

# Claude Code 社区动态日报 · 2026-11-27

## 📰 今日速览

今日无新版本发布，社区焦点集中在**用量计费异常**与**macOS 资源泄漏**两大问题上。多条 Issue 报告 5 小时限额以异常速度耗尽（#112477、#110773、#108661），疑似近期版本回归。此外，一位开发者提交的 PR #112436 建议改进 stale issue 清扫机制，避免可复现/高优先级问题被误关。

---

## 🔥 社区热点 Issues（Top 10）

### 1. 5 小时限额重置后立即从 0% 跳到 100%（v2.1.332 回归）
**#112477** | bug / linux / cost / regression | 评论 4
v2.1.332 版本出现严重计费回归：限额重置后单次提示即耗尽全部额度。与多条用量异常 Issue 形成呼应，可能是近期版本的系统性问题。
🔗 https://github.com/anthropics/claude-code/issues/112477

### 2. 用量限额消耗速度远超 token 实际消耗
**#110773** | bug / windows / cost | 评论 3
自 11 月 13-16 日起，单轮对话消耗的限额比例与实际 token 量不匹配，本地转录显示 token 反而更低，但限额百分比却上升。疑似计量逻辑变更。
🔗 https://github.com/anthropics/claude-code/issues/110773

### 3. 同类问题：5 小时限额在远低于以往用量时触发
**#108661** | bug / windows / cost | 评论 5
仅使用 Claude Code（Sonnet 5.5）的情况下，限额在远低于既往可比窗口的用量时即被触发，且组织禁用了 `/feedback` 通道。
🔗 https://github.com/anthropics/claude-code/issues/108661

### 4. macOS fseventsd 失控：800 倍预算占用、核心被持续占满数日
**#98769** | bug / macos / perf:memory | 评论 20
重度使用 Claude Code 的 Mac 上，fseventsd 进程占用 800 倍系统预算并无法自愈，还会阻塞 Claude Code 启动。评论活跃，macOS 重度用户的核心痛点。
🔗 https://github.com/anthropics/claude-code/issues/98769

### 5. 后台守护进程泄漏：6 周累计 64 个进程 / 约 7.1 GB
**#87891** | bug / has repro / macos | 评论 9
守护进程从不回收过期 worker，每次重启还会“收养”孤儿进程。已有复现标记，长期运行用户的实际内存影响显著。
🔗 https://github.com/anthropics/claude-code/issues/87891

### 6. macOS 桌面端空闲会话无限保活：86 个进程 / 26 GB swap
**#104888** | bug / has repro / macos | 评论 3
桌面端 Code 标签页为每个历史会话保留 CLI 进程及 MCP 服务器，即使会话完全空闲。数天后耗尽内存。
🔗 https://github.com/anthropics/claude-code/issues/104888

### 7. GMail MCP 重写 URL 注入 Google 追踪参数（隐私问题）
**#66010** | bug / macos / area:mcp | 评论 29 | 👍 15
自 6 月 5 日起 GMail MCP 在输出链接时被注入 Google 追踪 URL。高评论数、涉及隐私，长期未解决，今日仍有活跃讨论。
🔗 https://github.com/anthropics/claude-code/issues/66010

### 8. reasoning_extraction 安全防护误伤普通开发任务（78 次拦截）
**#111336** | bug / duplicate / area:model | 评论 6
11 月 13-20 日间 78 次请求被误判拦截，横跨 Fable 5.2 / Opus 5.5 / Sonnet 5.5 三个模型。安全防护的误报率问题影响正常工作流。
🔗 https://github.com/anthropics/claude-code/issues/111336

### 9. Subagent Write 工具拒绝写入 "report/summary/findings/analysis" 命名的 .md 文件
**#44657** | bug / linux | 评论 18 | 👍 35
子代理被硬编码禁止写入以这些关键词命名的 Markdown 文件，且无退出选项。👍 数高（35），影响大量自动化工作流。
🔗 https://github.com/anthropics/claude-code/issues/44657

### 10. 账户级设置跨设备同步（长期高票需求）
**#22648** | enhancement / area:auth | 评论 27 | 👍 54
今日 👍 数最高的 Issue。多设备用户需手动维护各自 `~/.claude/` 配置，社区多次请求官方同步方案（关联 #6037、#19634 等）。
🔗 https://github.com/anthropics/claude-code/issues/22648

---

## 🔧 重要 PR 进展

> 今日仅 4 条 PR 更新，3 条为历史 PR 被关闭。

**1. PR #112436（OPEN）— 不要将可复现/高影响 Issue 标记为 stale**
清扫机制不再对带 `has repro`、`reproduced`、`data-loss`、`high-priority` 标签的 Issue 标记或关闭为 stale。由 Claude Code 自动生成，直击社区长期抱怨的“有效 Issue 被机器人误关”问题。
🔗 https://github.com/anthropics/claude-code/pull/112436

**2. PR #35761（CLOSED）— powershell-default 插件：全平台默认使用 PowerShell**
通过 SessionStart hook 检测 pwsh 并注入 PowerShell 语法规则，将 Bash 工具默认 shell 替换为 PowerShell 7+。
🔗 https://github.com/anthropics/claude-code/pull/35761

**3. PR #35684（CLOSED）— bridge-fix 插件：修复 Chrome 扩展桥接失败**
修复 Max 订阅者 tengu_copper_bridge 开启时的 Chrome 扩展连接失败，取代早期方案 #34789。
🔗 https://github.com/anthropics/claude-code/pull/35684

**4. PR #35683（CLOSED）— scroll-fix 插件：修复终端滚动到顶回归**
拦截光标上移指令并限制在可视区域内，附带 Ctrl+6 冻结切换。修复全平台终端回归。
🔗 https://github.com/anthropics/claude-code/pull/35683

---

## 📈 功能需求趋势

从今日 50 条活跃 Issue 中提炼，社区关注方向排序：

| 方向 | 热度信号 | 代表 Issue |
|---|---|---|
| **用量计费透明度** | 6+ 条 Issue 持续发酵，疑似回归 | #112477、#110773、#108661、#112473 |
| **跨设备/账户级同步** | 👍 54，历史多次请求 | #22648 |
| **进程与内存治理** | 多平台、多场景泄漏报告 | #98769、#87891、#104888、#98976 |
| **Remote Control 稳定性** | 重启丢状态、resume 数据丢失 | #110759、#104123 |
| **无人值守自动化** | 预授权需求反复出现 | #86649、#109110 |
| **插件/MCP 生态健壮性** | 同步失效、类型系统缺陷 | #93825、#112627 |
| **UI 可控性** | 面板无法隐藏、调查无法关闭 | #102233、#94710 |

---

## ⚠️ 开发者关注点

1. **计费回归是本周最大警报**：多个平台（Windows/Linux/macOS）、多个版本均报告 5 小时限额异常耗尽，且集中出现在 11 月 13 日之后，建议关注官方回应。
2. **macOS 长期运行的资源代价**：fseventsd 失控、守护进程泄漏、空闲会话保活三类问题叠加，重度用户应定期检查进程数与 swap 占用。
3. **无人值守场景仍是短板**：computer-use MCP 无法预授权、Remote Control 重启即失效、iOS 中途消息丢失（#108975），自动化工作流体验受阻。
4. **安全机制误报**：reasoning_extraction 误拦截普通开发任务，且桌面调查问卷无法关闭（#94710），用户对“被强制的体验”不满情绪上升。
5. **Stale 机制改进在途**：PR #112436 若合并，可复现及 data-loss 级别的 Issue 将不再被机器人自动关闭，是对社区反馈机制的实质性改善。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-27 | 数据来源：github.com/openai/codex**

---

## 1. 今日速览

Codex CLI 发布 0.174.0-alpha.7/8 两个 alpha 版本，开发节奏紧凑。社区方面，Windows 桌面端 Nov 21 更新引发的回归问题（#62943）持续发酵，39 条评论成为最活跃的新 Issue。Linux 桌面端呼声最高的功能请求（#11023，953 👍）今日正式关闭，或有进展落地。TUI 相关 PR 数量占绝对多数，终端体验打磨明显提速。

---

## 2. 版本发布

- **rust-v0.174.0-alpha.8**：连续快速迭代，尚未附详细 changelog
- **rust-v0.174.0-alpha.7**：同日发布的上一版 alpha

两个版本间隔极短，配合今日大量已合并的 TUI PR，推测包含终端 UI 的多处修复与改进。

---

## 3. 社区热点 Issues

| # | Issue | 关注点 |
|---|-------|--------|
| 1 | [#11023](https://github.com/openai/codex/issues/11023) Linux 桌面客户端（CLOSED）| 社区呼声之王：953 👍、207 评论。今日关闭，可能意味着 Linux 版本有实质进展或官方给出明确答复 |
| 2 | [#62943](https://github.com/openai/codex/issues/62943) Windows Nov 21 更新回归（OPEN）| 新会话丢失权限/执行位置选择器，Max 推理档位消失，39 评论，Windows 用户影响面广 |
| 3 | [#63466](https://github.com/openai/codex/issues/63466) GPT-6.2 Astra/Sol 行为回归（OPEN）| 模型层面问题：多个原本正常的应用出现不可靠执行，需大量人工干预，11 评论 |
| 4 | [#64246](https://github.com/openai/codex/issues/64246) Linux 桌面端严重内存耗尽（OPEN）| 今日新报：22.6 GiB 内存 + 15.6 GiB swap 被 OOM 杀掉 323 个进程，疑似 #44525 回归 |
| 5 | [#46182](https://github.com/openai/codex/issues/46182) 归档云任务无法删除（OPEN）| 20 评论；数据控制权诉求：归档任务只有 Unarchive，没有 Delete |
| 6 | [#62669](https://github.com/openai/codex/issues/62669) Windows 路径面包屑闪烁（OPEN）| 19 评论，特定窗口宽度下持续 UI 闪烁 |
| 7 | [#53309](https://github.com/openai/codex/issues/53309) 历史推理双重计数（CLOSED）| 16 评论；历史推理被重复计数导致过早 auto-compaction，今日关闭说明已修复 |
| 8 | [#56311](https://github.com/openai/codex/issues/56311) Windows 内核池泄漏（OPEN）| 每次 MXC 沙箱启动泄漏 ~395 个内核池分配，长期运行后进程创建失败（0x800705AA），诊断极其深入 |
| 9 | [#58883](https://github.com/openai/codex/issues/58883) Pro Lite 静默 429 退避（OPEN）| 低负载下遭遇分钟级 429，且所有会话共享同一 Retry-After 截止时间，TUI 还将其伪装成 WebSocket 重试 |
| 10 | [#64238](https://github.com/openai/codex/issues/64238) 网络安全拦截无解释（OPEN）| 今日新报：任务被"Extra care for cybersecurity"反复中断但不说明触发原因，可解释性问题 |

---

## 4. 重要 PR 进展

| # | PR | 内容 |
|---|----|------|
| 1 | [#64236](https://github.com/openai/codex/pull/64236) | 修复 TUI resume 后的残留 turn/review 状态，崩溃中断的 review 不再卡住界面 |
| 2 | [#64211](https://github.com/openai/codex/pull/64211) | 支持 `file.ts:42-44` 等行区间链接，点击可高亮整个代码块 |
| 3 | [#64199](https://github.com/openai/codex/pull/64199) | 修复部分加载历史时的 prompt 编辑错位问题 |
| 4 | [#64204](https://github.com/openai/codex/pull/64204) | 批量化 TUI 历史回放的终端写入，长会话回放更流畅 |
| 5 | [#64192](https://github.com/openai/codex/pull/64192) | Wayland 下支持 PRIMARY 选区（中键粘贴），Linux 用户体验补齐 |
| 6 | [#64207](https://github.com/openai/codex/pull/64207) | Side chats 可保存、可在 scrollback 模式中循环切换 |
| 7 | [#64221](https://github.com/openai/codex/pull/64221) | MCP 启动不再错误显示 Working 状态，状态派生逻辑重构 |
| 8 | [#64214](https://github.com/openai/codex/pull/64214) | 修复模糊文件搜索中 Unicode（emoji/组合字符）高亮错位 |
| 9 | [#64187](https://github.com/openai/codex/pull/64187) + [#64166](https://github.com/openai/codex/pull/64166) | Guardian V3 shadow review 可从根线程配置，证据存储默认上限 32 MiB |
| 10 | [#64164](https://github.com/openai/codex/pull/64164) | `compact_filesystem_context` 实验特性：去重文件系统上下文，减少发送给模型的冗余 token |

---

## 5. 功能需求趋势

- **TUI 体验精细化**：今日 PR 与近期关闭的 Issue（transcript 性能 #21945、resume picker #8709、双 Esc 误触 #26348、MCP 结果折叠 #26279 等）高度一致——社区对终端交互打磨需求旺盛
- **Linux 桌面端**：#11023 关闭 + #64246 内存问题新报，Linux 支持仍是最大呼声
- **资源可见性**：#15281（/status 展示完整用量）、#53309（上下文计数）反映用户对配额/上下文透明度的持续诉求
- **云任务管理**：归档任务的删除能力（#46182）
- **多 Agent/外设集成**：ChatGPT Dot 与 Codex 聊天互通（#61670）、Computer Use 可靠性（#64041）

---

## 6. 开发者关注点

1. **Windows 端质量**：Nov 21 回归（#62943）、启动冻结（#63112）、内核泄漏（#56311）、路径正斜杠（#30481）——Windows 是当前 bug 报告重灾区
2. **限速与配额体验**：静默 429 退避（#58883）与过早压缩（#53309，已修）表明用量管理仍是付费用户痛点
3. **模型行为回归**：GPT-6.2 Astra/Sol 执行可靠性下降（#63466）及模型选择被首回合忽略（#55780）
4. **可解释性**：安全拦截不说明原因（#64238），用户无法调整任务策略

---

*数据截至 2026-11-27，共 50 条 Issue 与 28 条 PR 更新。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-11-27）

## 1. 今日速览
今日无新版本发布，社区活跃度集中在 Issue 讨论与 PR 修复上。两个高热度 Bug 均聚焦**子智能体（Subagent）可靠性**：子代理达到 MAX_TURNS 后误报“成功”（#22323，14 条评论）和通用代理挂起（#21409）。社区贡献者今日提交了两个针对新报 Issue 的即时修复 PR（#30490、#30489），响应速度值得关注。

## 2. 版本发布
过去 24 小时无新 Release。

## 3. 社区热点 Issues

| Issue | 亮点 |
|---|---|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) 子代理 MAX_TURNS 后误报 GOAL 成功 | 🔥 今日最热（14 评论）。`codebase_investigator` 触发轮次上限却返回 `success`，掩盖了实际中断——对依赖子代理结果的工作流是严重隐患。P1。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 利用模型的 bash 原生能力 + 零依赖 OS 沙箱 | 9 评论的大工程需求：Gemini 3 天生擅长链式 POSIX 工具，方向是零依赖沙箱 + 执行后意图路由，兼顾安全与能力。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) 通用代理无限挂起 | 8 👍 / 8 评论。简单如建文件夹的操作也会挂起长达一小时，仅靠提示词绕开子代理才能解决。P1。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) 评估 AST 感知文件读取/搜索/映射 | 7 评论的 EPIC：用 AST 工具精准读取方法边界、减少 token 噪声、提升导航质量，关联 #22746/#22747。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 不主动使用 skills 和子代理 | 7 评论。自定义 skill 描述明确，模型仍不主动调用——代理调度策略是普遍痛点。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 配置 | `maxTurns` 等覆盖配置被完全忽略，`AgentRegistry` 读取正确但未生效，配置链路断裂。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) browser 子代理在 Wayland 下失败 | Linux Wayland 环境 browser agent 不可用，P1，桌面 Linux 用户受阻。 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 工具数 > 128 触发 400 错误 | MCP 重度用户易踩坑，期望代理智能限制工具作用域。 |
| [#30480](https://github.com/google-gemini/gemini-cli/issues/30480) CRLF 文件 write_file diff 显示全部行变更 | 昨日新报，#16087/#29966 修了链路大部分，仅剩 diff 展示侧——当天即有修复 PR #30489。 |
| [#30482](https://github.com/google-gemini/gemini-cli/issues/30482) Footer 忽略自定义 displayName | Vertex AI 用户 + 自定义模型定义时 footer 模型信息丢失，0.70.0 回归，同日已有 PR #30490 修复。 |

## 4. 重要 PR 进展

- [#30490](https://github.com/google-gemini/gemini-cli/pull/30490) — **修复 Footer 自定义模型 displayName**：向 `getDisplayString` 传入 config，解决 #30482，当日提交当日修。
- [#30489](https://github.com/google-gemini/gemini-cli/pull/30489) — **CRLF 归一化修复 write_file diff**：计算 diff 前统一 `\r\n` → `\n`，同时保留原始内容以维持 CRLF 落盘行为，修复 #30480。
- [#30415](https://github.com/google-gemini/gemini-cli/pull/30415) — **P1：web search 增加时间限制**：`google_web_search` 无限等待导致代理挂起（#29594），本 PR 加超时并在 abort 时停止重试。
- [#30109](https://github.com/google-gemini/gemini-cli/pull/30109) — **限制 grep_search 输出体积**：宽泛搜索可返回约 150K 字符撑爆上下文，本 PR 加字节上限并引导模型收窄搜索。
- [#30212](https://github.com/google-gemini/gemini-cli/pull/30212) — **可配置的单次工具调用超时**（`tools.callTimeout`）：超时转为可恢复的 `TOOL_CALL_TIMEOUT` 错误，让模型自行换策略。
- [#30473](https://github.com/google-gemini/gemini-cli/pull/30473) — **修复历史图片占用豁免字节预算**：防止单张旧图导致会话被过早折叠（#30446）。
- [#30368](https://github.com/google-gemini/gemini-cli/pull/30368) — **ACP 支持 session/close**：客户端可在进程退出前释放会话资源。
- [#30353](https://github.com/google-gemini/gemini-cli/pull/30353) — **ACP token 用量追踪标准化**：保留取消轮次的 usage 数据并统一配额元数据。
- [#30459](https://github.com/google-gemini/gemini-cli/pull/30459) — **修复 0.70.0 起 Git 扩展安装失败**：`GIT_CONFIG_SYSTEM` 被禁导致所有 Git 扩展 install/update 报错。
- [#30470](https://github.com/google-gemini/gemini-cli/pull/30470) — **内置 Nano Banana 图像生成模型**：`gemini-2.5-flash-image` 支持 `--model` 与 `/model` 直选。

## 5. 功能需求趋势

- **子智能体（Subagent）可靠性**：今日热度绝对主线——误报成功、挂起、不被调用、bug 报告缺上下文（#22323/#21409/#21968/#21763），area/agent 标签占据 Issue 榜绝大多数。
- **Agent 工程化/上下文治理**：AST 感知工具（#22745 系列）、"Tactful Extraction" 精准读取降低 token（#19561）、文件化任务追踪替代 WriteToDo（#18836）。
- **Browser Agent 成熟度**：配置覆盖失效、会话锁恢复、Wayland 支持（#22267/#22232/#21983）。
- **安全与自主性平衡**：bash 原生能力 + 沙箱（#19873）、破坏性命令防护（#22672）、YOLO 模式下的策略尊重（PR #30268）。
- **ACP/非交互集成持续完善**：多个 ACP 修复 PR 表明编辑器集成是投入重点。

## 6. 开发者关注点

1. **子代理结果不可信**：MAX_TURNS 被报告为“成功”、代理挂起、错误报告缺失子代理上下文——多代理工作流用户的核心焦虑。
2. **上下文/token 成本**：单轮基线约 36.6k token，大文件读取与 grep 输出“灌水”引发广泛不满，社区正积极推动量化治理方案。
3. **代理自主调度弱**：skills 和子代理需显式提示才被使用，调度策略改进需求强烈。
4. **配置覆盖不生效**：settings.json 中 maxTurns、displayName 等被忽略，回归测试覆盖配置链路呼声渐高。
5. **0.70.0 回归问题集中**：CRLF diff、Footer 显示、Git 扩展安装等多处 0.70.0 引入的回归正被社区快速修复中，建议关注下个小版本。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-11-27）

## 1. 今日速览

过去 24 小时内，Copilot CLI 连发三个补丁版本（1.0.117-3 / -4 / -5），重点改进辅助权限判断、修复终端翻页卡顿，并为沙箱命令新增自定义 CA 证书信任支持。社区方面共更新 35 条 Issue，讨论最热烈的是 agent checkpoint refs 污染仓库的问题（#5323），同时收到一批围绕长会话稳定性、沙箱兼容性与 Windows 环境的新缺陷报告。

## 2. 版本发布

- **v1.0.117-5**（Added）：新增 `sandbox.userPolicy.network.extraCaCertificates` 设置（用户或托管配置均可），使沙箱命令可通过 TLS 拦截代理信任自定义 CA 证书——企业代理环境用户的重点需求。
- **v1.0.117-4**（Fixed）：修复在启用 tabs 的 10 行终端中，Page Down 在固定提示符处卡住的问题。
- **v1.0.117-3**（Improved/Fixed）：
  - 辅助权限（Assisted Permissions）通过进程 ID 识别同会话内由 Copilot 自己启动的进程，减少不必要的确认弹窗；
  - 修复：批准 MCP 服务器工具（会话级或路径级）不再连带批准 Copilot 内置请求（如 shell）。

## 3. 社区热点 Issues（Top 10）

1. **[#5323](https://github.com/github/copilot-cli/issues/5323)** — 请求增加禁用 agent checkpoint refs 的设置。每个 agent turn 都会以用户自己的 git 身份在 `refs/agents/<session-id>/checkpoints/` 下创建 commit，污染所有渲染 refs 的工具。8 条评论、7 👍，是社区讨论热度最高的问题，涉及隐私与仓库整洁性。
2. **[#3563](https://github.com/github/copilot-cli/issues/3563)（已关闭）** — 并行会话时工具批准（"Always allow"）可能被互相覆盖、静默丢失，写入 `~/.copilot/permissions-config.json` 存在竞态。多终端工作流用户的实际痛点，已修复关闭。
3. **[#5464](https://github.com/github/copilot-cli/issues/5464)（已关闭）** — stdio MCP 服务器启动超 10s 时，`server/discover` 探测超时后 Copilot 在同一连接上发送 legacy `initialize`，导致基于 MCP Python SDK 2.3.0 的服务器以 -32022 拒绝连接。MCP 生态兼容性的代表性问题，已修复。
4. **[#5047](https://github.com/github/copilot-cli/issues/5047)（已关闭）** — 请求在 ACP 模式下暴露内置的辅助审批（assisted approval）安全判断器，让 T3 Code 等 ACP 客户端复用 Copilot 的权限策略。反映了 CLI 向可嵌入 agent 运行时演进的诉求。
5. **[#5591](https://github.com/github/copilot-cli/issues/5591)** — Copilot CLI 在 Windows Credential Manager 中积累数百条 `copilot-mcp-oauth` / `copilot-keychain-chunk` 条目且从不清理，最终导致凭据库写满（CredWrite 错误 8），波及其他应用。影响面广、值得尽快修复。
6. **[#5590](https://github.com/github/copilot-cli/issues/5590)** — Gemini 4 Neon 走 `/chat/completions` 时，超过 60s 的缓冲工具调用（>25–30KB）确定性地触发空闲超时（`Incomplete response`）。对使用新模型做大文件写入的用户是硬阻断。
7. **[#5577](https://github.com/github/copilot-cli/issues/5577)** — v1.0.115 远程 CLI 会话切换挂起，伴随内存持续增长和 auth 变更日志风暴，直至本机不可用。远程会话稳定性的严重回归报告。
8. **[#5571](https://github.com/github/copilot-cli/issues/5571)** — 仅 GHE.com 登录时更新器报 "GitHub credential owner did not provide a token"，无法自动下载新版本，需手动 `gh auth login` 规避。企业云用户的更新阻断问题。
9. **[#5593](https://github.com/github/copilot-cli/issues/5593)** — 本地沙箱阻止 `git submodule update`，即使所有 submodule 已就位（no-op 场景），导致含 submodule 的仓库无法在沙箱内构建，属 1.0.99-2 之后的回归。
10. **[#5592](https://github.com/github/copilot-cli/issues/5592)** — 会话 events.jsonl 达 ~808MB 时，SDK 调用 `getMessages` 触发 stdio 传输 `write EINVAL` 并挂起 CLI。大型会话（含大量截图）的可靠性边界问题。

## 4. 重要 PR 进展

过去 24 小时内无 PR 更新，本节省略。

## 5. 功能需求趋势

- **权限与安全模型精细化**：并行会话的权限持久化竞态（#3563）、辅助审批暴露给 ACP 客户端（#5047）、UNC 路径被内容策略误拒（#5586）——社区希望权限系统更智能、更可预测。
- **企业环境兼容性**：自定义 CA 证书（1.0.117-5 已响应）、GHE.com 登录更新失败（#5571）、Windows 沙箱 TCP 阻断（#5580）、Windows 凭据库泄漏（#5591）。企业/Windows 用户是当前反馈主力。
- **长会话与后台任务可靠性**：后台任务通知可观测性（#5596）、wrapper 退出遥测混淆（#5597）、hooks 不热重载（#5595）、AHP 连接无限重试无退避（#5594），一批高质量的长会话稳定性报告集中出现。
- **沙箱兼容性**：Cypress 崩溃（#5588）、git submodule 被阻断（#5593）——沙箱对真实开发工具链的兼容仍是短板。
- **模型路由与可观测性**：Fusion 不路由本地 vLLM 模型（#5581）、BYOK 下 OTel 文件不写出（#5583）、OTel 缺少 `service.instance.id`（#5005，已关闭）。
- **插件生态**：marketplace 全量克隆大仓库且不可取消（#5491）、marketplace.json 单个插件格式错误导致整体安装失败（#5582）、插件 skill 带参数报 Unknown command（#5578）。

## 6. 开发者关注点

- **沙箱环境实用性**是最高频痛点：CA 证书、git submodule、Cypress、Windows TCP，开发者反复要求“能在沙箱里跑真实的构建/测试流程”。今日发布的 extraCaCertificates 设置是积极信号，但兼容性问题仍在积累。
- **状态与通知的透明度**：多位资深用户（如 @netwarm007）提交了带详尽日志证据的可观测性缺陷，要求对通知分发、进程退出原因、连接重试提供明确的 disposition 与退避机制。
- **仓库与系统副作用**：checkpoint refs 污染（#5323）、Windows 凭据库堆积（#5591）表明 CLI 的“写副作用”缺少清理与配置开关，用户希望获得控制权。
- **版本升级回归频发**：多个问题标注为从 1.0.99/1.0.108/1.0.115 起的回归（#5577、#5586、#5593、#5583），快速迭代节奏下的回归防护值得关注。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-27

## 一、今日速览

今日无新版本发布，社区焦点集中在 **前台 Subagent 执行被移除引发的回归争议**（#66555、#64073）——多条 PR 将所有子代理强制转入后台模式，用户反馈上下文污染、频繁唤醒等问题。同时，ChatGPT 订阅模型列表与计费相关议题持续发酵（#64968、#52958），多个修复 PR 已提交。架构层面，核心团队正在推进 Location/SDK 实例生命周期统一重构（#66690）。

---

## 二、社区热点 Issues

1. **[#66555] Critical Regression：前台 Subagent 执行被移除**（🆕 今日创建，5 评论）
   用户指出 PR #63382/#63223 强制所有 subagent 转入后台，导致父代理频繁唤醒、上下文污染，定性为回归而非功能变更。与 #64073（38 评论）形成呼应，是当前最激烈的争议点。
   https://github.com/anomalyco/opencode/issues/66555

2. **[#64073] 恢复前台 Subagent 执行**（OPEN，38 评论，👍13）
   11-15 创建后讨论持续升温，是 Subagent 争议的主讨论帖。
   https://github.com/anomalyco/opencode/issues/64073

3. **[#23153] 用加密货币支付 OpenCode Go**（CLOSED，40 评论，👍74）
   历史长帖，诉求为 Go 订阅支持 crypto 支付，关注度长期居首。
   https://github.com/anomalyco/opencode/issues/23153

4. **[#52958] 意大利/EU 用户所有支付方式均被拒**（OPEN，33 评论）
   多卡种、Apple Pay、Stripe Link 全部失败，EU 支付通道问题影响 Go 订阅转化。
   https://github.com/anomalyco/opencode/issues/52958

5. **[#30611] 瞬时网络错误未重试导致会话失败**（CLOSED，12 评论）
   重试逻辑仅识别 ECONNRESET，其他瞬态传输错误被当作硬错误。与 #59291（ECONNRESET 高频出现，11 评论）同属网络可靠性主题。
   https://github.com/anomalyco/opencode/issues/30611

6. **[#58080] macOS 本地网络隐私限制阻断后台服务 LAN 访问**（OPEN，9 评论）
   macOS 15+ 上后台服务无法连接 LAN 地址，建议通过签名的 .app bundle 解决，影响局域网 API 用户。
   https://github.com/anomalyco/opencode/issues/58080

7. **[#56862] Subagent 上下文压缩持续失败**（OPEN，reproduced，8 评论）
   读取大文件时压缩反复失败（119.2K in / 525 out），与 Subagent 争议直接相关。
   https://github.com/anomalyco/opencode/issues/56862

8. **[#62319] 上游停滞静默重试、无任何日志/报错**（OPEN，5 评论）
   Provider 端点 stall 时 `opencode run` 无限挂起，可观测性缺失，对 CI/脚本场景是硬伤。
   https://github.com/anomalyco/opencode/issues/62319

9. **[#59597] TUI 冷启动首帧耗时 14.6s**（OPEN，3 评论）
   大仓库冷启动 `Time to first draw: 14589ms`，而热连接仅 122ms——性能问题的典型代表。
   https://github.com/anomalyco/opencode/issues/59597

10. **[#64603] iOS TestFlight 名额已满，请求更多或直接发布未签名 .ipa**（OPEN，3 评论）
    移动端 beta 供不应求，反映 iOS 端需求旺盛。
    https://github.com/anomalyco/opencode/issues/64603

---

## 三、重要 PR 进展

1. **[#66705] 修复：从账户自身模型列表读取 ChatGPT 计划速度**
   解决 GPT-6.2 Ultrafast 未对 Pro 账户展示的问题（关闭 #64968），取代旧方案 #64528。
   https://github.com/anomalyco/opencode/pull/66705

2. **[#66707] 修复：VCS 信息读取不再加载冷 Location**
   `GET /api/vcs` 不再为读取 Git/Hg 信息而启动完整 Location（含 MCP 服务器），直击冷启动性能痛点（关闭 #66454）。
   https://github.com/anomalyco/opencode/pull/66707

3. **[#66704] 修复：重连后恢复失败的历史读取**
   历史下载失败后时间线被错误边界锁死，重连也无法恢复，现可自愈（关闭 #55673）。
   https://github.com/anomalyco/opencode/pull/66704

4. **[#66696] 修复：Code Mode agent() 子任务不再通知父级或遗留任务**
   78 个 agent() 调用的脚本中，父会话被 subagent 通知轰炸的问题得到解决。
   https://github.com/anomalyco/opencode/pull/66696

5. **[#66690] 重构：统一 Location 与私有 SDK 实例生命周期映射**
   核心架构级重构，消除第二套 LayerMap/instanceScope 桥接，所有实例共享同一生命周期管理。
   https://github.com/anomalyco/opencode/pull/66690

6. **[#66670] 修复：防范 `Object.prototype` 键导致的 500 错误**（已合）
   生产环境 `/data/alibaba/__proto__` 等路径每日约 12 次 500 错误，已修复关闭。
   https://github.com/anomalyco/opencode/pull/66670

7. **[#66687] 修复：service.json 语法错误不再被覆盖清空**
   配置文件写错时给出明确报错，而非直接抹掉保存的后台服务器设置。
   https://github.com/anomalyco/opencode/pull/66687

8. **[#66652] Rust 客户端：端口选择配色与 ACP 修复**
   Rust CLI 与 dev 分支对齐，主题新增 text/background.selection，与 TS 实现一致。
   https://github.com/anomalyco/opencode/pull/66652

9. **[#66694] 新功能：单请求同步/写入多个 experimental spaces**（已合）
   API 层批量操作能力增强。
   https://github.com/anomalyco/opencode/pull/66694

10. **[#65951] 修复：Flatpak 更新交给 Flatpak 处理**
    Flathub 解包 .deb 时 app-update.yml 触发内置更新器，与系统更新机制冲突，现予以禁用。
    https://github.com/anomalyco/opencode/pull/65951

---

## 四、功能需求趋势

- **Subagent 执行模型**：前台执行被移除引发的回归争议是本周最强信号，社区强烈要求恢复或提供配置项（#66555、#64073、#56862）。
- **支付与订阅可用性**：加密货币支付（74 👍）、EU 支付被拒，计费通道是长期痛点（#23153、#52958、#66655）。
- **ChatGPT 订阅集成**：Pro 账户模型可见性/速度识别（#64968，已有 PR #66705）。
- **错误可观测性与可靠性**：静默重试、空 stderr 退出、watchdog 超时（#62319、#66699、#29420）。
- **TUI/桌面体验对齐**：Session pinning、深链打开会话、文件路径快速打开、彩色 diff、技能字母排序（#55764、#44167、#60175、#66657、#66596）。
- **移动端需求**：iOS TestFlight 扩容呼声高（#64603）。

## 五、开发者关注点

1. **网络重试与超时机制不完善**：仅 ECONNRESET 可重试、挂起连接无超时检测，是会话可靠性投诉最集中的领域。
2. **错误信息不可见**：CLI 退出码 1 + 空 stderr（#66699）、provider stall 无日志，CI/脚本集成场景缺少可诊断性。
3. **冷启动性能**：TUI 首帧 14.6s、VCS API 触发完整 Location 启动——大仓库场景启动路径亟待瘦身（#59597、#66707）。
4. **Subagent 后台化的连锁反应**：父代理唤醒风暴、上下文压缩失败、Code Mode 通知污染，是升级 v2 后最需要评估的风险点。
5. **平台兼容性细节**：macOS 本地网络隐私、Flatpak 更新冲突、Linux 焦点丢失等边缘平台问题持续被报告。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-11-27

## 1. 今日速览

今天最值得关注的动态是性能方向集中发力：[#18480](https://github.com/QwenLM/qwen-code/pull/18480) 提出"消灭 transcript 索引重建风暴”的系统性优化，与 [#18452](https://github.com/QwenLM/qwen-code/pull/18452)、[#17889](https://github.com/QwenLM/qwen-code/issues/17889) 共同指向 serve/daemon 性能瓶颈。同时 v0.28.7 发布，Qwen Code CLI 正式登陆 Harness 内核，隐私统计默认关闭；安全方面也有两个高价值修复（transcript 权限、CI authority-surface 检测）在推进。

---

## 2. 版本发布

**v0.28.7**（[Release](https://github.com/QwenLM/qwen-code/releases)）
- Qwen Code CLI 现可在 Harness 内核上运行，使用统计默认关闭，需显式开启 `privacy.usageStatisticsEnabled`（[#18351](https://github.com/QwenLM/qwen-code/pull/18351)）
- 重复工具调用被拒绝时现在会解释原因，提升调试体验

**v0.28.6**
- Managed sessions 可在等待工具审批、提问或后台任务时挂起，并在 Harness 崩溃后通过冷恢复（cold recovery）恢复（[#17953](https://github.com/QwenLM/qwen-code/pull/17953)、[#18115](https://github.com/QwenLM/qwen-code/pull/18115)）

**其他发布**：v0.28.6-nightly.20261126、SDK TypeScript v0.1.36（捆绑 CLI 0.28.6）

---

## 3. 社区热点 Issues

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#17889](https://github.com/QwenLM/qwen-code/issues/17889) [P1] transcript 分页每次请求全量重解析 JSONL | **今日最重要性能 Issue**。limit=1 与 limit=500 成本相同，阻塞整个事件循环，直接催生了 #18480/#18452 两个优化 PR，形成完整的问题→修复链 |
| 2 | [#18465](https://github.com/QwenLM/qwen-code/issues/18465) Android 上 `os.cpus()` 返回 0 导致 ratio=Infinity，新会话被 503 拒绝 | 边缘平台可用性 bug，已由 [#18477](https://github.com/QwenLM/qwen-code/pull/18477) 当天响应修复，反映社区响应速度 |
| 3 | [#18475](https://github.com/QwenLM/qwen-code/issues/18475) [P2] 会话删除时 worktree sidecar 不可读未 fail closed | 安全/一致性 bug：删除会话可能留下 checkout 和不可读 sidecar，与 #18454 修复路径相关 |
| 4 | [#18264](https://github.com/QwenLM/qwen-code/issues/18264) [OPEN] Main CI — Qwen Code CI 无测试失败 | 仍在开放的 CI 基础设施问题，与 #18258/#18287 一起反映 Java SDK/MySQL lane 的持续不稳定 |
| 5 | [#18258](https://github.com/QwenLM/qwen-code/issues/18258) [OPEN] Managed Agent gate — MySQL 故障门测试失败 | MySQL 8.4 环境下 28+ 测试失败，是当前最活跃的 CI 痛点，#18479 试图通过预配置测试数据库解决 |
| 6 | [#18287](https://github.com/QwenLM/qwen-code/issues/18287) [OPEN] SDK Java — HostedMonitorRunFaultGatesIT 失败 | 同一 MySQL 故障门在 SDK Java 全量测试中复现（37+ 失败），确认是系统性环境问题 |
| 7 | [#11680](https://github.com/QwenLM/qwen-code/issues/11680) E2E CI 失败追踪（107 评论） | 长期追踪型 issue，9 月至今积累大量讨论，体现 E2E 沙箱测试的治理成本 |
| 8 | [#18253](https://github.com/QwenLM/qwen-code/issues/18253) ClassSizeRatchetTest 尺寸棘轮失败 | 代码质量门（类大小棘轮）反复触发，反映大型重构期代码膨胀压力，11-27 仍有更新 |
| 9 | [#18342](https://github.com/QwenLM/qwen-code/issues/18342) E2E Tests 失败（11-26 最新） | 与 #16860（RHEL rpm 构建）和 #18473 相关，上游容器镜像 digest 被回收导致构建失败 |
| 10 | [#16860](https://github.com/QwenLM/qwen-code/issues/16860) Desktop Checks 容器初始化失败 | 11-27 仍有更新，#18473 已修复并关闭，展示“上游 registry GC 破坏 CI”这类外部依赖风险 |

> **观察**：过去 24 小时活跃 Issue 中约 8 成为 CI 基础设施类（bot 自动创建），真实用户 Issue 数量少但质量高，集中在 serve/daemon 性能与平台兼容性。

---

## 4. 重要 PR 进展

| # | PR | 内容 |
|---|-----|------|
| 1 | [#18480](https://github.com/QwenLM/qwen-code/pull/18480) perf(core) | 持久化 prompt-time sidecar、限制冷扫描范围、transcript 索引增量扩展，根治 #17889 指出的索引重建风暴 |
| 2 | [#18219](https://github.com/QwenLM/qwen-code/pull/18219) fix(core) | **安全修复**：session transcript 原以 0644 创建且可能内嵌凭证，现改为 owner-only 权限 |
| 3 | [#18370](https://github.com/QwenLM/qwen-code/pull/18370) fix(ci) | **安全加固**：对外部贡献的自动化 triage 审查从“关键词匹配”升级为“判断 PR 可触达的 authority surface" |
| 4 | [#18477](https://github.com/QwenLM/qwen-code/pull/18477) fix(serve) | 修复 #18465：CPU 核心数不可读时视为无信号而非 0，避免 load ratio=Infinity |
| 5 | [#18479](https://github.com/QwenLM/qwen-code/pull/18479) fix(ci) | 为 `SessionOssStorageMySqlIT` 预配置专用 MySQL 数据库，疏通 SDK Java MySQL CI lane |
| 6 | [#18112](https://github.com/QwenLM/qwen-code/pull/18112) feat(web-shell) | 在会话内直接展示和控制 cron 定时任务（暂停/立即运行/删除），Web Shell 功能持续深化 |
| 7 | [#17471](https://github.com/QwenLM/qwen-code/pull/17471) feat(managed-agent) | 统一 unbound Session authority 到 ownership row，是 16023 体系拆分的主体，依赖链 #18468 → #18478 → #18479 → 本 PR |
| 8 | [#18230](https://github.com/QwenLM/qwen-code/pull/18230) feat(memory) | 跨 task worktree 保留 workspace memory，绑定会话启动目录或注册 workspace |
| 9 | [#18155](https://github.com/QwenLM/qwen-code/pull/18155) feat(managed-agent) | Hosted Workspace Shell 沙箱化：Bubblewrap 只读私有镜像 + `/workspace` 挂载 + 私有 tmpfs |
| 10 | [#17437](https://github.com/QwenLM/qwen-code/pull/17437) feat(i18n) | CLI + Web Shell 完整阿拉伯语支持，含 RTL 布局与 HTML transcript 导出 |

**其他值得关注**：[#18476](https://github.com/QwenLM/qwen-code/pull/18476)（ChatPane 迁移到共享 ChatSurface，第 4 片）、[#18365](https://github.com/QwenLM/qwen-code/pull/18365)（WebShell 可选 session adapter，方便宿主嵌入）、[#18454](https://github.com/QwenLM/qwen-code/pull/18454)（无 sidecar 会话的归档协调前缀修复）、[#18473](https://github.com/QwenLM/qwen-code/pull/18473)（已合并：re-pin RHEL 10 构建镜像 digest）。

---

## 5. 功能需求趋势

从近期 Issue/PR 提炼出五大方向：

1. **serve/daemon 性能优化**（最强信号）：transcript 分页、索引重建、prompt ledger 读取延迟，多个 P1/P2 性能 Issue 与对应 PR 同期出现，是当前社区工程投入重心
2. **会话生命周期与可恢复性**：挂起/冷恢复、归档管理重设计（#18338）、A2A 任务可恢复（#17823）、worktree sidecar 一致性
3. **安全与隐私加固**：transcript 权限收紧、CI authority-surface 检测、Bubblewrap 沙箱化，形成明确的安全工程线
4. **Managed Agent / 多租户体系**：ownership row 重构、子 Session 准入拆分、MySQL 持久化，一系列 stacked PR 显示大型架构演进
5. **Web Shell 体验与生态**：会话内 cron 任务控制、共享 ChatSurface、宿主嵌入 adapter、阿拉伯语 RTL——国际化与可嵌入性并进

---

## 6. 开发者关注点

- **CI 稳定性是最大治理成本**：50 条活跃 Issue 中绝大多数是 bot 自动创建的 CI 失败报告，E2E 沙箱测试、Managed Agent gate（MySQL/Java）和 Desktop 构建反复失败，其中 MySQL lane（#18258/#18287）与外部容器镜像 digest 被回收（#16860）是当前主要根因
- **serve 场景性能痛点明确**：大 transcript 下事件循环阻塞、冷启动扫描成本高，已在 #17889 中给出精确量化数据，社区对“索引重建风暴”类问题容忍度低
- **非主流平台兼容**：Android/Termux 用户真实存在且会提详细复现报告，`os.cpus()` 等环境探测需防御性处理
- **破坏性变更的渐进策略**：v0.28.7 隐私统计默认关闭、Agent Team 工具按 host 能力 gate（#18169），显示项目在默认值设计上趋于保守
- **PR 拆分纪律良好**：#17471 依赖链（#18468 → #18478 → #18479）拆分清晰，便于独立 review 与落地，是值得社区贡献者学习的实践

---
*数据来源：github.com/QwenLM/qwen-code · 生成时间：2026-11-27*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*