# AI CLI 工具社区动态日报 2026-08-26

> 生成时间: 2026-08-25 20:44 UTC | 覆盖工具: 7 个

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

**日期：2026-08-26 ｜ 覆盖范围：Claude Code / OpenAI Codex / Gemini CLI / GitHub Copilot CLI / Kimi Code CLI / OpenCode / Qwen Code**

---

## 1. 生态全景

AI CLI 工具竞争已从功能扩张期进入**可靠性攻坚期**：各工具社区反馈的重心明显从“缺功能”转向“静默失败、token 失控、长时运行崩溃”等工程化问题。发布节奏分化显著——Codex 单日连发 3 个 alpha、Gemini CLI 发 4 个版本、Qwen Code 保持 nightly 滚动，而 Claude Code 进入稳定维护期（单修复性小版本）。安全加固成为集体动作（Gemini 的 SSRF/A2A 认证修复、Qwen 的沙箱与 symlink 防护），显示头部工具开始偿还快速扩张期积累的安全债务。

---

## 2. 各工具活跃度对比

| 工具 | 今日热点 Issues | PR 活动 | Release | 迭代状态 |
|---|---|---|---|---|
| **Claude Code** | ~14 条（最高 112👍，含安全与治理类元议题） | 1 条更新，0 合并 | v2.1.245（glibc 崩溃修复） | 稳定维护，内部开发为主 |
| **OpenAI Codex** | 10 条（最高 56 评论，认证问题聚集） | 3+ 条（线程分页架构主线） | **3 个 alpha**（0.150.0-a.8/9/10） | 高频内测，架构重构期 |
| **Gemini CLI** | 10 条（3 个 P1，Subagent 重灾） | **9 条**（安全修复密集） | **4 个**（stable/preview/nightly/cherry-pick） | 稳定化 + 安全加固并行 |
| **Copilot CLI** | ~3 条活跃 + 清理 9 条陈旧 Issue | 0 | 0 | 平静期 |
| **Kimi Code** | 2 条（含 100% 复现的严重级 Bug） | 0 | 0 | 平静期 |
| **OpenCode** | 10+ 条（服务端故障 + 桌面端稳定性） | **10 条**（重量级功能 PR） | v1.18.23 | 功能高速迭代 |
| **Qwen Code** | 10 条（P0×1 / P1 已修 / P2×5） | **10 条** | v0.22.0-nightly | 全速演进，路线最激进 |

**活跃度梯队**：Qwen Code ≈ OpenCode > Gemini CLI > Codex > Claude Code >> Copilot CLI ≈ Kimi Code

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求与证据 |
|---|---|---|
| **静默失败 / 配置不生效** | Claude Code、Kimi、Qwen、Gemini、OpenCode | Claude Code 四连发（@import 跳过 #86060、权限通配符忽略 #84969、子代理模型覆盖 #85592、env 删除不生效 #85116）；Kimi #2617 Edit/Write 假成功；Qwen #9827 权限白名单未真正下发 API；Gemini #29065 摘要硬编码模型 |
| **Token 成本 / 上下文经济性** | Codex、Copilot、Qwen、OpenCode、Gemini | Codex 改 3 版简历烧 6.78 亿 token（#39854）、限额 5 倍速消耗（#31322）；Copilot #4588 空提示词 47k vs 21.6k tokens；Qwen SKILL.md 永久驻留上下文（#6762）、Review 注入 95k token（#9784）；OpenCode 推出 suffix 压缩模式 PR |
| **Subagent / 多代理可靠性** | Gemini、Qwen、Codex、Claude、OpenCode | Gemini 三个

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据说明**：本次数据中 PR 评论数与 👍 均缺失（显示 undefined/0），排序信号不足；以下排行综合 PR 列表顺序、关联 Issue 热度及活跃时间推断，仅供参考。**所有 Top 20 PR 均处于 OPEN 状态，无一合并**——这本身是重要信号（详见洞察部分）。

---

## 一、热门 Skills 排行（PR）

**1. skill-creator 评测修复套件 — [#1298](https://github.com/anthropics/skills/pull/1298)**
- **功能**：修复 `run_eval.py` 恒报 0% recall 的核心 bug，涉及 Windows 流读取、触发检测与并行 worker。
- **讨论热点**：关联 Issue [#556](https://github.com/anthropics/skills/issues/556)（12 评论 / 7 👍，10+ 独立复现），是当前官方工具链最严重的可靠性问题——描述优化循环实际在“对噪声做优化”。
- **状态**：OPEN（2026-06 活跃）

**2. document-typography 排版质检 — [#514](https://github.com/anthropics/skills/pull/514)**
- **功能**：自动修复 AI 生成文档的孤行、孤字换行、页底标题搁浅等排版问题。
- **讨论热点**：“用户不主动要求、但每个文档都受影响”的隐性质量需求，代表被动体验优化方向。
- **状态**：OPEN

**3. frontend-design 可操作性重构 — [#210](https://github.com/anthropics/skills/pull/210)**
- **功能**：重写 frontend-design skill，确保每条指令在单次会话内可执行。
- **讨论热点**：呼应 Issue [#202](https://github.com/anthropics/skills/issues/202)（8 评论，已关闭）对 skill 写法“像文档而非指令”的批评，触及 Skill 编写范式之争。
- **状态**：OPEN

**4. 元技能双件套：质量 + 安全分析器 — [#83](https://github.com/anthropics/skills/pull/83)**
- **功能**：对 Skill 本身做多维质量评估与安全审计的 meta skills。
- **讨论热点**：与 Issue [#492](https://github.com/anthropics/skills/issues/492)（43 评论，全库最热）的命名空间安全争议直接呼应，“用 Skill 治理 Skill”。
- **状态**：OPEN（挂起超 9 个月）

**5. self-audit 交付前审计 — [#1367](https://github.com/anthropics/skills/pull/1367)**
- **功能**：机械文件校验 + 四维推理质量门，交付前拦截 AI 幻觉输出。
- **讨论热点**：与作者同源的 Issue [#1385](https://github.com/anthropics/skills/issues/1385)（三段式质量门 Pipeline 提案）形成提案-实现闭环。
- **状态**：OPEN

**6. Hivemind 零成本多智能体编排 — [#1628](https://github.com/anthropics/skills/pull/1628)**
- **功能**：Claude Code 作为唯一 planner/reviewer，将机械任务委派给运行免费模型的 headless opencode worker。
- **讨论热点**：“贵的上下文而非智能才是稀缺资源”——最激进的 token 经济学实验，2026-08 新提交。
- **状态**：OPEN

**7. ServiceNow 全平台 skill — [#568](https://github.com/anthropics/skills/pull/568)**
- **功能**：覆盖 ITSM/SecOps/ITAM/CSDM 等 ServiceNow 全栈工作流。
- **讨论热点**：企业级 ERP/ITSM 领域的深度垂直尝试，存活 5 个月持续更新（至 2026-08-12），生命周期最长的新增 PR 之一。
- **状态**：OPEN

**8. pyxel 复古游戏开发 — [#525](https://github.com/anthropics/skills/pull/525)**
- **功能**：对接 pyxel-mcp 的像素风游戏创作工作流（编写→运行截图→检查→迭代）。
- **讨论热点**：由 Pyxel 原作者提交，是“上游作者为自家生态适配 Claude Code”的标杆案例。
- **状态**：OPEN

---

## 二、社区需求趋势（自 Issues 提炼）

| 趋势 | 证据 | 核心诉求 |
|---|---|---|
| **① 信任与安全机制**（最热） | [#492](https://github.com/anthropics/skills/issues/492)（43 评论）、[#1175](https://github.com/anthropics/skills/issues/1175)、[#412](https://github.com/anthropics/skills/issues/412) | 社区 skill 冒用 `anthropic/` 命名空间致信任边界被滥用；需要签名/溯源、权限治理与 agent 安全模式 |
| **② 组织级分发能力** | [#228](https://github.com/anthropics/skills/issues/228)（16 评论 / 8 👍） | 告别“下载 .skill 走 Slack 手动上传”，需要组织共享库与分享链接 |
| **③ 上下文效率（token 经济学）** | [#1487](https://github.com/anthropics/skills/issues/1487)（claude-api 一次注入 156k token）、[#1329](https://github.com/anthropics/skills/issues/1329)、[#189](https://github.com/anthropics/skills/issues/189)（9 👍，插件内容重复） | Skill 按需渐进加载、紧凑记忆表示、去重——上下文是稀缺资源 |
| **④ 质量评测工具链修复** | [#556](https://github.com/anthropics/skills/issues/556)、[#202](https://github.com/anthropics/skills/issues/202)、[#1385](https://github.com/anthropics/skills/issues/1385) | skill-creator 的 eval 循环在 Windows 全线失效；“如何科学评估一个 skill 好不好”尚无官方答案 |
| **⑤ 跨平台与互操作** | [#29](https://github.com/anthropics/skills/issues/29)（Bedrock）、[#16](https://github.com/anthropics/skills/issues/16)（Skills as MCPs） | Skills 与 Bedrock、MCP 协议的打通与统一抽象 |

---

## 三、高潜力待合并 Skills

> 全部 Top PR 均未合并，以下按“修复型优先 + 近期活跃”筛选合并概率较高者：

1. **[#538](https://github.com/anthropics/skills/pull/538) / [#541](https://github.com/anthropics/skills/pull/541) / [#539](https://github.com/anthropics/skills/pull/539)**（@Lubrsy706 三连修复）— pdf 大小写引用、docx OOXML ID 冲突导致文档损坏、YAML 校验，均为低风险高确定性的 bug fix，最典型的“先合”候选。
2. **[#1298](https://github.com/anthropics/skills/pull/1298)** — 直击 #556（10+ 复现）的官方工具链级 bug，若合并将解锁整个描述优化循环。
3. **[#1602](https://github.com/anthropics/skills/pull/1602)** — 跨 mcp-builder 等多个 skill 的序列化/编码/指标修复，2026-08-24 仍活跃。
4. **[#509](https://github.com/anthropics/skills/pull/509)** — CONTRIBUTING.md，回应社区健康度缺口（#452），流程型变更阻力最小。
5. **[#568](https://github.com/anthropics/skills/pull/568)** — ServiceNow skill 持续迭代 5 个月，企业垂直领域稀缺供给，谈判筹码最高。
6. **[#1615](https://github.com/anthropics/skills/pull/1615) / [#1628](https://github.com/anthropics/skills/pull/1628)** — 8 月新提交且仍在更新（HPC 集群操作 / 多智能体编排），代表官方可能关注的增量方向，但合并历史表明此类大型新增 PR 周期很长。

---

## 四、Skills 生态洞察（一句话）

**社区最集中的诉求不是“更多 Skill”，而是“可信的 Skill 基础设施”——命名空间安全治理、组织级分发、上下文按需加载，以及一个能正常工作的 skill 评测工具链；与此同时 Top PR 全部悬置未合，官方审查吞吐量已成为生态最大瓶颈。**

---

# Claude Code 社区动态日报
**日期：2026-08-26** | 数据来源：github.com/anthropics/claude-code

---

## 1. 今日速览

Claude Code 发布 **v2.1.245**，修复了在搭载 glibc 2.44 的 Linux 发行版（Arch Linux、CachyOS、Fedora Rawhide）上的启动崩溃问题。社区方面，一条关于 **“超过 6000 条带 has repro 标签的 Issue 自 2026 年 3 月起被自动关闭”** 的元议题引发关注，折射出社区对议题维护机制的担忧；同时，欢迎横幅关闭请求（112 👍）持续发酵，以及一个**插件市场 URL 凭证明文显示的安全问题**值得开发者留意。

---

## 2. 版本发布

### [v2.1.245](https://github.com/anthropics/claude-code/releases)
- **修复**：在预装 glibc 2.44 的 Linux 发行版（Arch Linux、CachyOS、Fedora Rawhide）上的启动崩溃。

> 单一修复性小版本，建议上述滚动发行版用户尽快升级。

---

## 3. 社区热点 Issues

**① [#2254](https://github.com/anthropics/claude-code/issues/2254) · 禁用欢迎横幅**（45 评论 / 112 👍）
自 2025 年 6 月开放至今的老牌需求，今日再获活跃讨论。用户普遍认为每次启动都显示欢迎画面和提示浪费终端空间。112 个 👍 使其成为社区呼声最高的 TUI 定制化需求，但长期未获官方响应。

**② [#87647](https://github.com/anthropics/claude-code/issues/87647) · 6000+ 条 "has repro" Issue 被自动关闭**（4 👍）
元议题：用户统计发现自 2026 年 3 月以来，大量已被复现确认的 Bug 被批量自动关闭。这直接影响社区上报 Bug 的积极性和对仓库维护的信任度，属于治理层面的重要信号。

**③ [#87804](https://github.com/anthropics/claude-code/issues/87804) · 为 `.claude/rules/` 增加"话题级"触发机制**（12 评论，今日讨论最热烈的新需求）
现有 `paths:` 只能按文件路径触发规则，用户希望按"对话主题"（prompt-topic）条件加载规则文件。作者做了充分的同类需求调研（#85300、#78795、#75610），指向规则系统向语义化/条件化演进的方向。

**④ [#86136](https://github.com/anthropics/claude-code/issues/86136) · 插件市场 URL 凭证明文打印** ⚠️ 安全
内嵌在 Marketplace URL 中的访问凭证会在 `/plugin` 菜单和 `claude plugin marketplace list` 输出中以明文展示，存在凭证泄露风险（如被截图、日志记录）。使用私有市场 + 嵌入式鉴权的团队应重点关注。

**⑤ [#85592](https://github.com/anthropics/claude-code/issues/85592) · `CLAUDE_CODE_SUBAGENT_MODEL` 静默丢弃逐次调用的模型指定**（v2.1.223 起回归）
组织通过托管设置 env 钉死子代理模型后，单次调用显式指定的 `model` 参数被**静默忽略**，且文档承诺的警告从未触发，元数据记录的还是请求而非实际生效的模型。对依赖混合模型调度（如仅特定子代理用 Opus）的企业工作流影响显著。

**⑥ [#85441](https://github.com/anthropics/claude-code/issues/85441) · 孟加拉语等复杂文字系统渲染损坏**
根因分析扎实：TUI 使用 `wcwidth` 测量宽度且未启用终端 mode 2027，导致所有复杂脚本（Bengali/Hindi/Tamil/Thai/Khmer/Myanmar 等）排版错乱。国际化支持的结构性缺口。

**⑦ [#84224](https://github.com/anthropics/claude-code/issues/84224) · 自动更新器覆盖其他 npm 安装**
存在多个 npm global prefix（如 nvm + Homebrew 共存）时，自更新器会写入 PATH 解析到的 prefix，而非自身安装位置，导致两个安装互相污染。多版本/多 Node 环境用户的经典痛点。

**⑧ [#85116](https://github.com/anthropics/claude-code/issues/85116) · settings env 的删除操作对守护进程会话不生效**
从 settings.json 移除环境变量后，后台守护进程托管的会话（Agents View / 后台任务）仍继承旧 env 快照，env 注入只增不减。会静默破坏跨会话消息等功能，且无任何配置可中和，暴露了 daemon 架构下配置热更新的缺陷。

**⑨ [#87677](https://github.com/anthropics/claude-code/issues/87677) · `~/.claude.json.tmp.*` 临时文件永不清理**
原子写入失败留下的临时文件（每份数十 KB）不在保留期清扫范围内，长期运行的服务器上逐渐堆积。今日新提交的 [#89565](https://github.com/anthropics/claude-code/issues/89565)（systemd 服务场景下同样现象）已被关闭为重复，说明受影响面在扩大。

**⑩ [#85499](https://github.com/anthropics/claude-code/issues/85499) · 第三方模型端点上自动压缩失败并终止会话**（回归）
新版引入的 unknown-model 窗口强制校验导致 OpenAI/Anthropic 兼容端点的长会话在自动压缩时报 "Auto-compaction could not recover this turn" 并结束。此前数周运行稳定的配置被更新破坏，影响自托管/代理网关用户。

> **其他值得关注**：[#86060](https://github.com/anthropics/claude-code/issues/86060)（@import 路径后跟冒号/逗号时静默跳过）、[#84969](https://github.com/anthropics/claude-code/issues/84969)（`permissions.ask` 中非末尾 `:*` 通配符被静默忽略）、[#85972](https://github.com/anthropics/claude-code/issues/85972)（reduced motion 开启时计时器冻结，无障碍问题）、[#84702](https://github.com/anthropics/claude-code/issues/84702)（从 Agents View 返回后聊天无法滚动）。

---

## 4. 重要 PR 进展

过去 24 小时内仅 **1 条 PR** 有更新，无合并记录：

**① [#89404](https://github.com/anthropics/claude-code/pull/89404) · 修复 `validate-agent.sh` 误报与首警告即中止问题**（@bcherny）
修复 plugin-dev skill 自带的 agent 校验脚本跑在自家 agent 文件上反而失败的问题。三个根因均与 `set -euo pipefail` 交互有关：
1. `((warning_count++))` 在 `set -e` 下算术表达式返回非零时直接中止脚本——首个警告就退出；
2. 对合法 agent 文件产生误报。
关联公开 Issue [#83803](https://github.com/anthropics/claude-code/issues/83803)。

> 注：外部贡献者 PR 活动较少符合该仓库惯例（核心开发在内部进行，版本以 npm 直接发布）。今日无 PR 合入，Issue 修复预计将体现在后续版本中。

---

## 5. 功能需求趋势

从今日活跃 Issue 中可提炼出五个清晰方向：

| 方向 | 代表 Issue | 信号强度 |
|---|---|---|
| **TUI 可定制化** | #2254（禁用横幅）、#85972、#84702 | ★★★ 持续高热度 |
| **规则/权限系统精细化** | #87804（话题级规则触发）、#84969、#86060 | ★★★ 今日讨论最活跃 |
| **企业托管与后台架构** | #85592、#85116、#82332 | ★★★ 管理设置 + daemon 会话是重灾区 |
| **第三方模型兼容** | #85499 | ★★ 回归问题，自托管用户痛点 |
| **国际化与无障碍** | #85441、#85972 | ★★ 结构性缺口，非英文用户持续受影响 |

---

## 6. 开发者关注点（痛点总结）

1. **"静默失败"是最大公约数痛点**：@import 被跳过无警告（#86060）、权限规则被忽略无提示（#84969）、子代理模型被覆盖且文档承诺的警告不触发（#85592）、env 删除不生效（#85116）。社区反复要求：**凡是配置未按预期生效，必须有可见的告警路径**。

2. **安装与更新可靠性**：自更新器覆盖其他 prefix 的安装（#84224）、临时文件泄漏（#87677）、更新引入第三方模型压缩回归（#85499）。多 Node 环境/长驻服务器场景下的升级信任度在下降。

3. **多会话

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-08-26** | 数据来源：github.com/openai/codex

---

## 一、今日速览

过去 24 小时 Codex 核心连发 **3 个 alpha 版本**（0.150.0-alpha.8/9/10），Rust 侧进入密集迭代周期。社区侧**认证/登录问题持续发酵**，macOS 打开旧对话即触发登录失效的 [#39162](https://github.com/openai/codex/issues/39162) 以 56 条评论居热度榜首。工程侧则重点推进**线程历史分页架构的全面稳定化**，并出现 Amazon Bedrock 集成、逐 turn 动态调参等值得关注的 PR。

---

## 二、版本发布

| 版本 | 说明 |
|---|---|
| `rust-v0.150.0-alpha.10` | 最新 alpha，24 小时内第 3 个版本 |
| `rust-v0.150.0-alpha.9` | 同日发布 |
| `rust-v0.150.0-alpha.8` | 同日发布 |

> 一天三发的节奏表明 0.150.0 正处于高频内测阶段，预计将承载近期分页线程历史、turn 级设置等大量架构改动。

---

## 三、社区热点 Issues

**1. [#39162](https://github.com/openai/codex/issues/39162) — macOS 打开旧对话导致 ChatGPT 认证失效**（56 评论 / 32 👍）
本周最热问题。26.814.41407 版本起，打开已有对话会使 ChatGPT 登录态失效并强制跳转登录页，回退到 26.810.52044 可恢复正常。影响面广、持续一周未修复，是认证类问题的核心聚集地。

**2. [#39903](https://github.com/openai/codex/issues/39903) — 请求禁用 "Ran N commands" 折叠**（25 评论 / **43 👍，今日最高赞**）
TUI 中已执行命令被折叠为计数行，重度用户难以审计 agent 实际执行了什么。高赞背后反映的是社区对 **CLI 操作可审计性**的强烈诉求。

**3. [#37403](https://github.com/openai/codex/issues/37403) — macOS 桌面端无法恢复 Remote Control / CLI 线程**（31 评论 / 28 👍）
8 月 7 日更新引入的回归：`already has an active writer` 错误导致移动端 Remote Control 与桌面端无法接力同一 CLI 线程，移动办公工作流被打断。

**4. [#25178](https://github.com/openai/codex/issues/25178) — Windows Computer Use 截图失败**（31 评论 / 16 👍）
Win10 22H2 上 `get_window_state` 截图因 `SetIsBorderRequired` 接口不支持而失败，其余 Computer Use 能力正常，长期未解。

**5. [#25271](https://github.com/openai/codex/issues/25271) — Computer Use 无法读取 Chrome URL**（25 评论）
即使在新标签页（`chrome://newtab/`）上也拿不到当前 URL，制约浏览器自动化任务的可靠性。

**6. [#40611](https://github.com/openai/codex/issues/40611) — 开启高级账户安全后陷入登录-登出死循环**（今日新报）
20x Pro 用户为保住 Daybreak Blue 访问权开启 Advanced Account Security 后，桌面端完全不可用。与 #39162、#40036 叠加，**认证问题已成系统性风险区**。

**7. [#31322](https://github.com/openai/codex/issues/31322) — 使用限额消耗速率反复回归**（10 评论）
限额早上恢复正常、晚间又回到约 5 倍速消耗，用户指出这是复发性系统问题而非偶发抖动，与多个 token 异常消耗 issue 相互印证。

**8. [#39421](https://github.com/openai/codex/issues/39421) — Marketplace 升级残留 559 GB / 4972 个孤儿目录**（3 评论）
41 天泄漏 559 GB，为该问题系列最大案例（此前最高 277 GB）。curated 克隆有清理机制而 marketplace 没有，配套修复 PR [#40683](https://github.com/openai/codex/pull/40683) 已在推进。

**9. [#33196](https://github.com/openai/codex/issues/33196) — 并行子代理引发 token 极端放大与重复压缩**（5 评论）
子代理并行导致 token 消耗失控并反复触发 compaction，与 [#39854](https://github.com/openai/codex/issues/39854)（改 3 版简历烧掉 6.78 亿 token）、[#36664](https://github.com/openai/codex/issues/36664)（单会话 74 次压缩）构成一组高成本痛点。

**10. [#23652](https://github.com/openai/codex/issues/23652) — TUI 输入框支持鼠标点击移动光标**（19 👍）
经典交互增强诉求二次提交（前身 #14315 因赞数不足被关），无障碍与效率双重价值，社区支持度高。

---

## 四、重要 PR 进展

**线程历史分页架构（本日主线，三连推进）**

1. [#40673](https://github.com/openai/codex/pull/40673) — **分页历史 API 转正**：`thread/turns/list`、`thread/items/list`、`thread/revert` 摆脱实验性标记，相关字段稳定化。
2. [#40677](https://github.com/openai/codex/pull/40677) — 持久线程默认启用分页历史。
3.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 | 2026-08-26

---

## 一、今日速览

昨日 Gemini CLI 发布了 **v0.57.0 稳定版**（修复 Cloud Workstations OAuth 流程与 IDE 连接目录不匹配问题），并推出 **v0.58.0-preview.0** 预览版。**安全加固成为今日社区主线**：多个针对 MCP OAuth SSRF、A2A 服务器认证、路径穿越的修复 PR 集中提交。与此同时，**Subagent 可靠性仍是最大痛点**，多个 P1 级挂起/误报 Issue 持续活跃。

---

## 二、版本发布

| 版本 | 关键内容 |
|---|---|
| **v0.57.0**（稳定版） | 动态解析 Cloud Workstations 代理重定向 URI（OAuth 流程修复）；修复 IDE 连接中被吞掉的目录不匹配错误 |
| **v0.58.0-preview.0** | 修复 ignore path 处理中 symlink 求值不一致的问题 |
| **v0.57.0-preview.1** | 对 preview.0 的 cherry-pick 补丁版本 |
| **v0.56.0-nightly** | a2a-server 在新消息轮次清除过期取消错误；write policy 配置中声明顶层 safety checkers |

> 注：v0.58.0-preview.0 中的 symlink 修复与长期存在的 Issue [#20079](https://github.com/google-gemini/gemini-cli/issues/20079)（agents 目录下 symlink 文件不被识别）方向一致，值得持续观察。

---

## 三、社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent 触发 MAX_TURNS 后误报 GOAL 成功**（P1，13 评论，今日最热）
   `codebase_investigator` 在达到最大轮次限制、未做任何分析的情况下仍报告 `status: success`，掩盖了真实中断原因。这是 Subagent 可观测性缺陷的典型案例，直接影响用户对结果的信任。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent 无限挂起**（P1，8 👍）
   委派给 generalist agent 后简单操作（如创建文件夹）挂起超一小时，禁用 subagent 后恢复正常。社区反馈强烈，是代理编排稳定性的核心问题。

3. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) | Shell 命令执行完毕后卡在 "Waiting input"**（P1）
   极简单的命令执行完成后仍显示活跃并等待用户输入，与 #22465（创建 vite 应用卡在交互提示）同属“挂起”类问题。

4. **[#29065](https://github.com/google-gemini/gemini-cli/issues/29065) | 会话摘要硬编码 gemini-3.1-flash-lite**（今日新报）
   摘要生成忽略用户配置的模型，导致自定义 endpoint 用户失败。新问题尚未分类，但直击“配置不被尊重”这一高频抱怨。

5. **[#28785](https://github.com/google-gemini/gemini-cli/issues/28785) | IdeServer.stop() 在 MCP 会话开启时永不返回**
   `server.close()` 等待活跃的流式 MCP 会话导致无法关闭，关联修复 PR #28789 已于今日关闭，进展值得跟进。

6. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) | Auto Memory 无限重试低价值会话**
   低信号会话因未被 `read_file` 标记处理而反复浮现，是 Auto Memory 问题簇（#26516、#26523、#26525）的代表。

7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | Auto Memory 缺乏确定性脱敏**（安全）
   转录内容先进入模型上下文、后才由 prompt 指示脱敏，存在 secrets 泄露窗口。P2 安全类，社区关注度高。

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | 超过 128 个工具时遭遇 400 错误**
   工具数量超限时 API 报错，社区期望 agent 能智能裁剪工具作用域，对重度 MCP/扩展用户影响较大。

9. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | AST 感知的文件读取/搜索/映射调研**（EPIC）
   探索用 AST 工具精确读取方法边界、减少 token 噪声，与 #22746（tilth/glyph 工具调研）、#19561（Tactful Extraction）共同构成代码智能方向。

10. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | 零依赖 OS 沙箱 + 执行后意图路由**（大工程）
    针对 Gemini 3 模型原生 bash 使用习惯，探索在安全与体验间平衡的沙箱方案，是安全与能力演进的重要提案。

---

## 四、重要 PR 进展

1. **[#29081](https://github.com/google-gemini/gemini-cli/pull/29081) | 修复 MCP OAuth 元数据发现中的 SSRF** 🔒
   按 RFC 9728/8414 强制远程 OAuth 端点使用 HTTPS、校验 origin 匹配，仅对本地 MCP 放行 loopback HTTP。今日提交的重要安全修复。

2. **[#29063](https://github.com/google-gemini/gemini-cli/pull/29063) | 修复非交互模式下 Plan Mode 挂起**（P1）
   `gemini -p "..." -y` 场景中 Plan Mode 指令仍要求等待永不到来的用户反馈，本 PR 解决该挂起问题。

3. **[#28789](https://github.com/google-gemini/gemini-cli/pull/28789) | 修复 IdeServer.stop() 挂起与 keep-alive 泄漏**（已关闭）
   同时解决 #28785 的 MCP 会话阻塞关闭问题与间歇性 ping 失败从不触发的资源泄漏。

4. **[#29087](https://github.com/google-gemini/gemini-cli/pull/29087) | 防止扩展并发安装竞态**
   利用 `proper-lockfile` 协调多个 CLI 进程同时安装/更新同一扩展时的文件交错写入。

5. **[#28699](https://github.com/google-gemini/gemini-cli/pull/28699) | A2A 服务器强制认证 + 阻断 checkpoint 路径穿越**（已关闭）
   自定义 REST 路由此前完全绕过凭据校验，本 PR 补齐认证并修复路径穿越漏洞。

6. **[#29067](https://github.com/google-gemini/gemini-cli/pull/29067) | 移除 A2A 误导性安全声明与硬编码凭据**
   清理 agent card 中不真实的 `securitySchemes` 声明及代码中的硬编码凭据，使本地开发安全模型显式化。

7. **[#28930](https://github.com/google-gemini/gemini-cli/pull/28930) | 移除不安全的 `diff.external` 覆盖**（P1）
   空值覆盖会被 git 解释为启用外部 diff 工具，与沙箱禁用初衷相反，属回归性修复。

8. **[#28983](https://github.com/google-gemini/gemini-cli/pull/28983) | 混合换行符检测改进**
   修正“仅一处 `\r\n` 即判定为 CRLF”的粗糙逻辑，改为检测混合换行符，减少跨平台协作中的误判。

9. **[#28701](https://github.com/google-gemini/gemini-cli/pull/28701) | 修复 TRUST_PARENT 规则优先级**（已关闭）

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-08-26 | 数据来源：github.com/github/copilot-cli**

---

## 一、今日速览

过去 24 小时**无新版本发布、无 PR 更新**，社区动态完全集中在 Issue 侧。当日两大焦点：**MCP 可靠性**（[#4598](https://github.com/github/copilot-cli/issues/4598) 报告 18 个 MCP 服务器仅连上 3 个且句柄会话中被销毁）与 **token 成本**（[#4588](https://github.com/github/copilot-cli/issues/4588) 发现工具搜索仅对 Anthropic 模型生效，空提示词消耗 47k vs 21.6k tokens）。此外，维护者今日集中关闭了 9 条 2025 年底的垃圾/空白 Issue，进行了一轮积压清理。

---

## 二、版本发布

过去 24 小时无新 Release（省略）。

---

## 三、社区热点 Issues（Top 10）

1. **[#13](https://github.com/github/copilot-cli/issues/13) 为 CLI 输入增加 vi/vim 模式** — `74 👍 / 8 评论`
   全仓库最高赞功能请求，2025-09 提出至今仍活跃，今日再获新互动。模态编辑用户对 CLI 交互层效率的核心诉求，值得长期跟踪。

2. **[#4588](https://github.com/github/copilot-cli/issues/4588) MCP 工具搜索仅对

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期**：2026-08-26 ｜ **数据来源**：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

> 📊 数据说明：过去 24 小时仓库动态较为平缓（无新 Release、无活跃 PR、仅 2 条 Issue 更新），本日报基于实际数据如实呈现，不作推测性补充。

---

## 1. 今日速览

今日社区整体平静：无新版本发布，无 PR 活动，仅 2 条 Issue 有更新。最值得警惕的是新提交的严重级 Bug [#2617](https://github.com/MoonshotAI/kimi-cli/issues/2617) —— 0.38.0 版本在 macOS 上 `Edit`/`Write` 工具返回成功但实际未写入磁盘，100% 可复现，属于“静默失败”类高危问题。此外，挂起月余的上下文压缩 Bug [#2523](https://github.com/MoonshotAI/kimi-cli/issues/2523) 昨日有新动态，显示用户仍在受影响。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 社区热点 Issues

> 过去 24 小时内仅 2 条 Issue 有更新，全部收录如下。

### 🔴 #2617 [OPEN] Edit/Write 工具返回成功但从未写入磁盘（0.38.0，macOS）

**作者**：@tizerluo ｜ **创建/更新**：2026-08-25 ｜ **评论**：2 ｜ [查看 Issue](https://github.com/MoonshotAI/kimi-cli/issues/2617)

- **为什么重要**：这是编码 CLI 最危险的一类 Bug——“静默失败”。工具返回成功文案（"The file has been updated..." / "File created successfully"），Agent 基于错误的前提继续推理，但文件系统毫无变化。相比报错，这种失败无任何错误信号，极难被用户察觉，直接动摇工具链可信度。
- **关键细节**：问题自 2026-08-25 ~17:00 UTC 起在所有会话中 100% 复现。**在特定时间点突然出现**（而非随版本升级出现）这一特征值得注意，可能指向服务端/模型侧变更，而非 0.38.0 本地回归。
- **社区反应**：已有 2 条评论跟进，暂未见官方确认。

### 🟡 #2523 [OPEN] 上下文压缩 Bug —— 重新打开已完成且已删除的任务

**作者**：@Frogzter ｜ **创建**：2026-07-20 ｜ **更新**：2026-08-25 ｜ **评论**：1 ｜ [查看 Issue](https://github.com/MoonshotAI/kimi-cli/issues/2523)

- **环境**：v0.6.3 / Windows / K2.7 coding 模型
- **为什么重要**：上下文压缩（compaction）是长会话稳定性的核心机制。该 Bug 导致压缩后模型“复活”已删除、已完成的任务，说明历史状态在压缩时未被正确清理，会造成重复劳动、上下文污染和 token 浪费。
- **社区反应**：Issue 已存续超过一个月，昨日仍有更新，说明问题尚未解决且持续影响用户。

---

## 4. 重要 PR 进展

过去 24 小时无 PR 更新，无相关进展可报告。

---

## 5. 功能需求趋势

受限于今日样本量（仅 2 条活跃 Issue），可提炼的信号有限，但两条 Issue 均指向**可靠性而非新功能**：

- **核心工具链正确性**：文件写入（`Edit`/`Write`）的可靠性是当前最高优先级诉求，社区期待“要么成功、要么明确报错”，绝不接受假成功。
- **上下文管理健壮性**：压缩机制对任务生命周期（已完成/已删除状态）的处理需要更严谨，避免状态残留。
- **总体判断**：当前社区关注点集中于“把基础功能做稳”，IDE 集成、新模型支持等扩展性需求今日无新增信号。

---

## 6. 开发者关注点

- **静默失败是最需防御的失败模式**：#2617 表明工具执行结果与磁盘状态可能脱节。社区潜在诉求包括：写入后读回校验（write-verify）、失败时显式报错、以及工具调用的落盘确认机制。
- **服务端变更的可见性**：#2617 的问题在特定时间点突然出现且与本地版本无关，开发者可能希望获得服务端变更的透明公告或状态页。
- **跨平台覆盖**：今日两条 Issue 分别来自 macOS 和 Windows，核心功能 Bug 在两大平台均有暴露，跨平台回归测试或需加强。
- **存量 Issue 的消化速度**：#2523 挂起超一个月仍被用户回访，长期未响应的 Bug 可能影响用户信心与留存。

---

*本日报基于 GitHub 公开数据自动整理，仅反映过去 24 小时窗口内的活动。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：2026-08-26 | 数据来源：github.com/anomalyco/opencode**

---

## 📌 今日速览

OpenCode 发布 **v1.18.23**，集中修复 Cloudflare AI Gateway 的模型路由问题。社区今日最大焦点是 **Zen API / Ox Alpha Free 模型在携带 `tools` 参数时持续返回 "Endpoint is unavailable"**（#44300 等 4 个相关 Issue），疑似服务端故障仍在排查。此外，TUI 迎来多项重量级功能 PR：VS Code 风格的会话预览标签页、持久化会话终端等。

---

## 🚀 版本发布

### v1.18.23
- **修复 Cloudflare AI Gateway 第三方提供商路由**：非 Workers 模型现可通过网关 REST API 正常工作（@superhighfives）
- **修复 Anthropic 模型经 Cloudflare AI Gateway 的调用**：自动将 `claude-haiku-4.5` 等点号格式模型 ID 转换为 Anthropic 要求的连字符 slug 格式

---

## 🔥 社区热点 Issues（Top 10）

**1. [#44300](https://github.com/anomalyco/opencode/issues/44300) — Zen API / Ox Alpha Free 携带 tools 的请求全面失败** ⚠️ *今日最紧急*
自 8 月 23 日起，所有包含 `tools` 数组的 chat completion 请求在 `x-preview-f-free` 和 `ox-alpha-free` 两条路由上均返回 "Endpoint is unavailable"。12 条评论、5 👍，多个重复报告（#44850、#44742、#45020）印证这是服务端故障而非客户端问题，纯对话可用、一调工具即挂。

**2. [#8345](https://github.com/anomalyco/opencode/issues/8345) — macOS 上 `zsh: illegal hardware instruction` 崩溃**
评论区最热（23 评论 / 7 👍），自 1 月持续至今未解，影响桌面版 macOS 用户启动，是长期悬而未决的稳定性顽疾。

**3. [#45011](https://github.com/anomalyco/opencode/issues/45011) — CLI/TUI 创建的会话在 Web 端 Home 永不显示**
Web 端项目注册表为纯客户端实现，导致跨端会话不可见，需在浏览器手动添加项目。暴露了多端架构下项目注册机制的设计缺陷。

**4. [#19143](https://github.com/anomalyco/opencode/issues/19143) — 桌面端消息搜索（Cmd+F / Ctrl+F）**
8 👍 高票功能请求，长会话中定位信息只能人工滚动，社区呼声强烈且持续发酵半年。

**5. [#45053](https://github.com/anomalyco/opencode/issues/45053) — `muse-spark-1.2-contributor` 模型无限挂起**
请求被接受但无流式输出、无错误、无完成。同订阅下其他模型正常，指向该模型服务端 serving 问题。

**6. [#44958](https://github.com/anomalyco/opencode/issues/44958) — 拒绝响应被隐藏且会话历史丢失（OpenCode Go）**
HTTP 流实际包含内容但 UI 静默无响应，或运行永久卡住。涉及**数据完整性**——用户会话历史凭空消失，性质较严重。

**7. [#43355](https://github.com/anomalyco/opencode/issues/43355) — 桌面端渲染进程陷入 ResizeObserver 循环导致整体冻结**
Agent 回合结束后窗口完全无响应，后端仍存活，只能强杀重启。影响 v1.18.18 桌面用户的核心可用性。

**8. [#38140](https://github.com/anomalyco/opencode/issues/38140) — Windows 下 Bun runtime 无法连接 localhost 提供商**
`@ai-sdk/openai-compatible` 指向 `127.0.0.1:9877` 时内置 Bun fetch 失败，Node 正常。直接阻断 Windows 用户使用本地模型。

**9. [#39632](https://github.com/anomalyco/opencode/issues/39632) — v2 输入框首键击破坏 IME 输入法组合**
日/中/韩用户第一字符被直接提交为字面文本，无法进入组合编辑状态。对 CJK 用户属高频阻断性问题。

**10. [#45055](https://github.com/anomalyco/opencode/issues/45055) — 对 OpenAI 兼容后端发送多个 system 片段**
v1.18.23 仍会拆分 system 消息，导致严格模板（如 SGLang 服务 Qwen3.8-27B）每个回合都失败，附带了可用的 coalesce 插件方案，自托管用户值得关注。

> 另：[#12405](https://github.com/anomalyco/opencode/issues/12405)（Windows 代理下 Connection reset，19 评论）已关闭，长期连接问题告一段落。

---

## 🔧 重要 PR 进展（Top 10）

| PR | 内容 | 状态 |
|---|---|---|
| [#44971](https://github.com/anomalyco/opencode/pull/44971) | **持久化会话终端**：会话左侧 + 固定终端右侧的分栏布局，终端状态随会话持久保存（@jlongster） | 🟢 Open |
| [#45021](https://github.com/anomalyco/opencode/pull/45021) | **实验性会话预览标签页**：VS Code 风格斜体预览标签，浏览会话不再塞满标签栏（@kitlangton） | 🟢 Open |
| [#44264](https://github.com/anomalyco/opencode/pull/44264) | **suffix 压缩模式**：新增实验性 `compaction.mode: "suffix"`，改变上下文压缩策略 | 🟢 Open |
| [#45064](https://github.com/anomalyco/opencode/pull/45064) | **修复子代理权限继承**：不再把已被覆盖的父会话 deny 规则拷贝进 subagent，修正 last-match-wins 语义 | 🟢

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-08-26 | 数据来源：github.com/QwenLM/qwen-code**

---

## 一、今日速览

昨日发布 **v0.22.0-nightly** 夜间版本，聚焦 Web Shell 修复。社区讨论热度集中在三方面：`/effort max` 导致会话不可用的 P1 级 Bug 已关闭、`/review` 管线子代理化改造（P0）持续推进、以及多项安全加固 PR（Windows symlink 防护、review 沙箱隔离）集中落地。此外，Web Shell 迎来 HTML 产物托管分享等重磅功能提案。

---

## 二、版本发布

### [v0.22.0-nightly.20260825.22bb5e8b9f](https://github.com/QwenLM/qwen-code/releases)
- **fix(web-shell)**: 从 overview 面板打开会话时传递工作区 cwd（[#9730](https://github.com/QwenLM/qwen-code/pull/9730)，by @wenshao）——修复了会话工作目录丢失的问题
- 其余修复内容详见 Release Notes

---

## 三、社区热点 Issues

**1. [#9459](https://github.com/QwenLM/qwen-code/issues/9459) | P1 | 已关闭 | 10 评论**
`/effort max` 在所有 OpenAI 兼容 Provider 上触发 400 错误且 `clampReasoningEffort()` 未正确钳制，设置后**会话内所有后续请求持续失败**。作为 UI 暴露的选项却破坏会话，属最高优先级体验杀手，目前已被修复关闭。

**2. [#9784](https://github.com/QwenLM/qwen-code/issues/9784) | P0 | Open | 3 评论**
计划将 `/review high` 全管线迁移至 fork 子代理上下文运行。当前一次完整审查会在主对话注入约 95k token 的 SKILL.md 加 14+ 个 agent 返回，正确性与上下文成本双重受损。这是 multi-agent 路线图上的关键架构改造。

**3. [#8097](https://github.com/QwenLM/qwen-code/issues/8097) | P2 | Open | 8 评论**
后台 agent 协同缺陷三连：父 agent 重复执行子 agent 工作、过早标记完成、`send_message` 非交互失败。多后台 Explore agent 并行场景下的核心协同问题。

**4. [#9198](https://github.com/QwenLM/qwen-code/issues/9198) | P2 | Open | 6 评论**
连续运行一周后 OOM（1TB 内存服务器），且 tmux 终端按键错乱、无法复制粘贴——会话/内存泄漏的严重用户报告，附完整现场截图。

**5. [#8662](https://github.com/QwenLM/qwen-code/issues/8662) | 需讨论 | Open | 5 评论**
TUI 渲染层从 ink 7 + React 19 迁移至 OpenTUI 的跟踪 Issue。当前 ink 补丁已达约 1037 行，闪烁等结构性问题难以在现框架内修复，属重大技术路线变更。

**6. [#8227](https://github.com/QwenLM/qwen-code/issues/8227) | 安全 | Open | 5 评论 | welcome-pr**
Windows 平台 `@` 文件引用的 symlink/TOCTOU 防护失效：`O_NOFOLLOW` 在 Windows 不存在，dev/ino 身份校验可能形同虚设。是 #7206 加固工作的平台补漏。

**7. [#5823](https://github.com/QwenLM/qwen-code/issues/5823) | P2 | Open | 5 评论**
`/loop` cron 任务静默触发且不可见——模型自身无法列出或停止已排期任务，导致数天后每个新会话都被自动"接管"。自动化能力与可控性的典型矛盾。

**8. [#6762](https://github.com/QwenLM/qwen-code/issues/6762) | P2 | Open | 6 评论**
Skill Context 生命周期管理需求：SKILL.md 正文作为 tool result 加载后**永久驻留上下文**，无法卸载或压缩。上下文经济性方向的高价值提案。

**9. [#9827](https://github.com/QwenLM/qwen-code/issues/9827) | P2 | 已关闭 | 4 评论**
`permissions.allow` 白名单只影响 CLI 展示，**实际 API 请求仍携带完整工具集**——权限收紧形同虚设，涉及安全与 token 浪费双重影响。

**10. [#10027](https://github.com/QwenLM/qwen-code/issues/10027) | P2 | 已关闭 | 4 评论**
DeepSeek vision 模型静默丢弃 `image_url` 内容并替换为占位符。第三方 Provider 兼容性问题的又一案例。

---

## 四、重要 PR 进展

**1. [#10007](https://github.com/QwenLM/qwen-code/pull/10007) | 安全加固**
新增跨平台 `openNoFollow` 工具函数，在缺失 `O_NOFOLLOW` 的平台上保持防护等价性——直接回应 Issue #8227 的 Windows 安全缺口。

**2. [#10024](https://github.com/QwenLM/qwen-code/pull/10024) | Web Shell 新功能**
HTML 产物托管分享：引导式 Provider 流程，Cloudflare → Vercel → Netlify 三级备选，统一的 Prepare → Authorize → Connect → Ready 进度体验。

**3. [#9838](https://github.com/QwenLM/qwen-code/pull/9838) | 调度能力**
支持当前会话级定时任务（daemon 侧），与 #5823 的 cron 可见性问题形成呼应。

**4. [#9492](https://github.com/QwenLM/qwen-code/pull/9492) | 循环检测修复**
对 `task_list` 等有状态读工具引入结果感知：相同参数不再必然判定为循环（其他 teammate 可能已变更共享看板），精准缓解 #9733 的误杀问题。

**5. [#9607](https://github.com/QwenLM/qwen-code/pull/9607) | 流式解析**
混合思考模型流式场景下，`content` 中平衡的内联 `<think>` 块降级处理而非中止整个 turn——提升 OpenAI 兼容端点的鲁棒性。

**6. [#9983](https://github.com/QwenLM/qwen-code/pull/9983) | Review 沙箱安全**
将管线 worktree lease 文件移出沙箱可写挂载面，并拒绝恢复指向该目录的 admin 条目——源自 #9723 审查发现。

**7. [#9441](https://github.com/QwenLM/qwen-code/pull/9441) | 交互改进**
`PreToolUse` hook 返回 `ask` 时，回弹至 `awaiting_approval` 并展示完整 edit/exec diff，而非仅显示 hook 理由的纯文本提示。

**8. [#9980](https://github.com/QwenLM/qwen-code/pull/9980) | 初始化体验**
设置向导在 Model IDs 阶段预先拉取已认证的模型列表（单次快照请求），Token/Coding Plan 用户不再需要盲填模型 ID。

**9. [#9739](https://github.com/QwenLM/qwen-code/pull/9739) | 会话↔PR 绑定**
补齐最后一块拼图：agent 在 shell 中通过 `gh pr create` 创建的 PR 也能与会话绑定（含实时检测与 shell 快照双路径）。

**10. [#10028](https://github.com/QwenLM/qwen-code/pull/10028) / [#10030](https://github.com/QwenLM/qwen-code/pull/10030) | Shell 分类器**
分析 heredoc 节点内嵌套的语句与重定向 + 阻止 "state planter" 后的子命令逃逸确认范围——确保确认弹窗"所见即所执行"。

---

## 五、功能需求趋势

| 方向 | 信号强度 | 代表 Issue |
|---|---|---|
| **多 agent / 后台自动化** | 🔥🔥🔥 | #9784 (P0)、#8097、#5823 |
| **上下文经济性**（压缩、卸载、缓存复用） | 🔥🔥🔥 | #6762、#9230、#9309、#10015 |
| **Review 管线深化**（增量、子代理化、审计镜头） | 🔥🔥 | #9784、#9902、#9717 |
| **Web Shell 体验**（分享、布局、会话管理） | 🔥🔥 | #10024、#10014、#10006 |
| **平台安全加固**（Windows、沙箱、symlink） | 🔥🔥 | #8227、#9983、#10007 |
| **可观测性**（telemetry、context 用量指标） | 🔥 | #10015、#9833 |

---

## 六、开发者关注点

1. **长时间运行稳定性是最大痛点**：OOM（#9198）、会话不可恢复终止（#9733）、循环检测误杀无人值守任务，均指向自动化场景下的鲁棒性缺口。
2. **第三方 Provider 兼容性摩擦不断**：OpenAI 兼容端点的 effort 钳制（#9459）、DeepSeek 视觉内容丢失（#10027）、OpenRouter 分类器不可用（#9757）——多生态适配仍是持续成本。
3. **权限与安全的"表面生效"隐患**：#9827（工具白名单未真正下发）与 #8227（Windows 防护弱化）提示开发者审计配置实际生效范围，勿仅依赖 UI 展示。
4. **上下文成本意识觉醒**：Skill 正文永久驻留、前缀缓存被旁路查询击穿，社区对 token 级别的精细化管理的诉求明显上升。
5. **CI 基础设施待修**：Windows 测试 lane 长期红（#9481）、自托管 runner ENOSPC（#10035）、沙箱镜像发布失败（#9979/#9989）——影响贡献者体验与发布节奏。

---
*本报告基于过去 24 小时 GitHub 公开数据自动聚合，观点仅供技术参考。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*