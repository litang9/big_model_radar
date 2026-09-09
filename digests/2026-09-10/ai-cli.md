# AI CLI 工具社区动态日报 2026-09-10

> 生成时间: 2026-09-09 22:32 UTC | 覆盖工具: 7 个

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

**数据日期：2026-09-10 ｜ 覆盖范围：Claude Code / Codex / Gemini CLI / Copilot CLI / Kimi CLI / OpenCode / Qwen Code**

---

## 一、生态全景

当前 AI CLI 工具已全面进入**“深水区打磨”阶段**：七大工具均在密集发版（单日合计 12 个 Release），但竞争焦点已从功能扩张转向**可靠性、安全性与可控性**。三个标志性信号尤为突出：一是 **Windows 平台成为全行业共同的短板**，六款工具同时暴露平台级缺陷；二是**安全加固成为 PR 主战场**，沙箱逃逸、提示注入、权限绕过等执行

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据截至 2026-09-10 · 来源：[anthropics/skills](https://github.com/anthropics/skills)
> 说明：本轮抓取的 PR 评论数缺失，排行基于**关联 Issue 热度（评论数/👍）、更新活跃度与话题影响面**综合判定；状态以数据快照为准。

---

## 一、热门 Skills 排行（PR Top 8）

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **skill-creator 评估链路修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 `run_eval.py` 恒报 `recall=0%` 的核心缺陷，关联 Issue [#556](https://github.com/anthropics/skills/issues/556)（12 评论 / 7 👍，10+ 独立复现）。描述优化循环“在对着噪声优化”引发广泛共鸣，另有 [#1099](https://github.com/anthropics/skills/pull/1099)、[#1050](https://github.com/anthropics/skills/pull/1050) 两个平行修复，是当前**最热 bug 簇** | OPEN |
| 2 | **skill-quality-analyzer / skill-security-analyzer 元技能** [#83](https://github.com/anthropics/skills/pull/83) | 对 Skill 本身做五维质量审计与安全扫描，直接呼应全仓最热 Issue [#492](https://github.com/anthropics/skills/issues/492)（**43 评论**：社区 Skill 冒用 `anthropic/` 命名空间的信任边界滥用） | OPEN |
| 3 | **frontend-design 可操作性重构** [#210](https://github.com/anthropics/skills/pull/210) | 重写指令使每条均可在单轮对话内执行，解决“指导性过强、可执行性不足”的问题，是设计类 Skill 中讨论最久的改进 | OPEN |
| 4 | **document-typography 排版质控** [#514](https://github.com/anthropics/skills/pull/514) | 消除 AI 生成文档的孤行、标题沉底、编号错位等通病；“用户很少主动要求排版，但所有文档都受影响”的定位引发讨论 | OPEN |
| 5 | **ODT / OpenDocument 技能** [#486](https://github.com/anthropics/skills/pull/486) | 补齐 docx/pdf 之外的开源标准文档格式（.odt/.ods）创建、模板填充与 HTML 转换 | OPEN |
| 6 | **Hivemind 零成本多智能体编排** [#1628](https://github.com/anthropics/skills/pull/1628) | Claude Code 只做规划/审查/合并，机械劳动下放给免费模型的 headless opencode worker——“上下文才是稀缺资源”的成本视角受关注 | OPEN |
| 7 | **testing-patterns 测试全栈技能** [#723](https://github.com/anthropics/skills/pull

---

# Claude Code 社区动态日报

**日期：** 2026-09-10 ｜ **数据来源：** [anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## 1. 今日速览

过去 24 小时官方连发两个版本：v2.1.266 紧急修复了影响 LLM-gateway/代理用户的登录回归，v2.1.267 新增面向企业管控的 `maxEffortLevel` 设置。社区侧最热话题是 Windows 更新 KB5124008 导致 Cowork 全部 Plan9 共享挂载失败（24 条评论、11 👍）。此外，官方以 PR 形式开源了三个内置 hooks 插件（sec-default / diff / telemetry）的源码，值得关注。

---

## 2. 版本发布

### v2.1.267（最新）
- **新增 `maxEffortLevel` 设置**：支持顶层配置或按模型配置（`modelSettings`），可对所有 Provider（含 Bedrock、Vertex、Foundry）设置 effort 等级上限；用户仍可主动选择更低等级。适合企业统一管控推理投入与成本。
- **新增 `--system-prompt-snapshot off`**：每次请求重新渲染系统提示词，便于调试与确保提示词不被快照缓存。

### v2.1.266
- **修复 2.1.265 引入的网关回归**：非文档化环境变量 `CLAUDE_CODE_USE_GATEWAY`（此前仅在 `ANTHROPIC_BASE_URL` 与 `ANTHROPIC_AUTH_TOKEN` 同时

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报

**日期：2026-09-10 | 数据来源：github.com/openai/codex**

---

## 📌 今日速览

过去 24 小时，Codex 在 alpha 通道密集发布 4 个 0.154.0 预发布版本，迭代节奏明显加快。社区方面，**Windows 平台问题持续发酵**（#20214 卡顿问题评论数已达 111 条），**后台轮询导致的 Token 浪费**成为高频痛点。值得注意的是，今日合入的主要 PR 几乎全部由 `copyberry[bot]` 自主生成并当日关闭——Codex 正在用自己开发自己，且重点集中在守护系统（Guardian）、守护进程恢复和 WSL 沙箱安全上。

---

## 🚀 版本发布

Rust 端 24 小时内连发 4 个 alpha 版本，显示 0.154.0 处于快速验证阶段：

| 版本 | 说明 |
|---|---|
| `rust-v0.154.0-alpha.11` | 最新 alpha |
| `rust-v0.154.0-alpha.10.2` | 补丁版 alpha |
| `rust-v0.154.0-alpha.8` | — |
| `rust-v0.154.0-alpha.6.1` | 补丁版 alpha |

> 各版本均无详细 Release Notes，属常规 alpha 迭代。结合 PR 动向推测，本周期重点在守护进程生命周期、Guardian 审查预算与沙箱加固。

---

## 🔥 社区热点 Issues（Top 10）

**1. [#20214] Windows 11 上 Codex App 频繁卡顿/冻结（111 评论 / 87 👍）**
存在 4 个多月的老问题，配置充足（Ryzen 5 5600 + 32GB）的机器依然复现，是当前仓库热度第一的 Issue，代表 Windows 用户的核心不满。
🔗 https://github.com/openai/codex/issues/20214

**2. [#13733] 后台进程轮询浪费 Token：每次 write_stdin 轮询都携带完整历史触发一轮 API 调用（40 评论 / 40 👍）**
点赞/评论比极高，说明大量用户实际遇到费用异常，是影响信任度的经济性问题。
🔗 https://github.com/openai/codex/issues/13733

**3. [#25178] Windows Computer Use 截图失败：`SetIsBorderRequired` 报 0x80004002（53 评论）**
其他能力（列窗口、读无障碍文本、键盘输入）均正常，唯独截图环节崩溃，阻塞了 Windows 桌面自动化的核心场景。
🔗 https://github.com/openai/codex/issues/25178

**4. [#35259] Codex Desktop 等待/状态轮询反复进入模型，实测消耗 19.8% Token（22 评论 / 19 👍）**
用户提供了量化数据，与 #13733 形成"CLI + Desktop 双端轮询浪费"的证据链。
🔗 https://github.com/openai/codex/issues/35259

**5. [#15723] 后台子进程/子代理完成后不唤醒调用方 Agent（22 评论）**
长任务编排的基础能力缺失，直接导致用户被迫手动轮询，与上述 Token 浪费问题互为因果。
🔗 https://github.com/openai/codex/issues/15723

**6. [#34337] CLI/Desktop 会话 rollout 可静默膨胀至数百 GiB 甚至 TiB 级（11 评论）**
磁盘占用失控是长期运行的硬伤，配套跟踪 Issue #42648 也同步活跃。
🔗 https://github.com/openai/codex/issues/34337

**7. [#41470] Windows/Android 远程同步不对称：新项目不出现、移动端线程触发信任门（16 评论）**
跨设备一致性是 Remote 功能的口碑关键，此问题反映同步状态机存在缺陷。
🔗 https://github.com/openai/codex/issues/41470

**8. [#26648] 请求支持 Jujutsu (jj) 工作区或自定义 worktree 后端（5 评论 / 27 👍）**
高点赞低评论，典型"沉默多数"型需求，反映社区对 VCS 灵活性的诉求。
🔗 https://github.com/openai/codex/issues/26648

**9. [#31935] 移除 60 秒阻塞等待限制（5 评论 / 11 👍）**
GPT-5.6 开发者提示中的 60s 等待上限把长命令变成无意义轮询，与 #13733/#35259 同根源。
🔗 https://github.com/openai/codex/issues/31935

**10. [#42669] Windows 桌面版进程启动但窗口永不出现（8 评论）**
"Artifact Session host Unix-socket transport is not available on Windows" 的报错直指 Windows 架构适配缺口，属完全不可用级别。
🔗 https://github.com/openai/codex/issues/42669

> **今日新增**：#44316（macOS Remote Control 配对成功但 WebSocket 握手 503）、#44301（Windows 版 `/approve` 再审批入口缺失）均为 9 月 9 日新报，值得追踪。
> 🔗 https://github.com/openai/codex/issues/44316 | https://github.com/openai/codex/issues/44301

---

## 🛠️ 重要 PR 进展（Top 10）

> 今日 Top 20 PR 均由 `copyberry[bot]` 提交且当日关闭，体现 Codex 自驱开发流程已常态化运转。

**1. [#44286] 阻止 WSL 互操作逃逸受限文件系统沙箱** 🔒
修复高危安全问题：开启网络后可通过 `wsl.exe` 以 root 重入发行版绕过 bubblewrap 沙箱。
🔗 https://github.com/openai/codex/pull/44286

**2. [#44314] / [#44283] / [#44299] 守护进程重启的线程恢复三部曲**
关机时原子化持久化线程 ID、启动时后台恢复，让活跃 Goal 在 daemon 重启后无需客户端重连即可续跑。
🔗 https://github.com/openai/codex/pull/44314 | https://github.com/openai/codex/pull/44283 | https://github.com/openai/codex/pull/44299

**3. [#44293] / [#44281] 为 Guardian 审查与分类器强制完整请求预算**
确保父级压缩检查点和图片计入分类器输入预算，防止审查证据本身超限导致失败。
🔗 https://github.com/openai/codex/pull/44293 | https://github.com/openai/codex/pull/44281

**4. [#44311] Remote Control 遵循共享 Retry-After 截止时间**
堵住通过重新配对/换 Token/重连绕过服务端限流窗口的漏洞。
🔗 https://github.com/openai/codex/pull/44311

**5. [#44320] 连续三次空自动续转后标记 Goal 为 blocked**
终止"空转循环"——这正是社区抱怨的无效 Token 消耗在 Agent 编排层的对应修复。
🔗 https://github.com/openai/codex/pull/44320

**6. [#44290] `update_goal` 支持用户请求的 paused 状态**
此前只接受 `complete`/`blocked`，Agent 无法响应用户的显式暂停请求。
🔗 https://github.com/openai/codex/pull/44290

**7. [#44288] 修复命令 Hook 在阻塞 stdin 下的死锁**
stdin 写入与输出排水并发化，并将写入纳入超时管控，消除无限挂起。
🔗 https://github.com/openai/codex/pull/44288

**8. [#44307] 新增 opt-in 的 macOS CLI 预发布候选构建**
Apple Silicon / Intel 双架构，打包为带签名配置的 `CodexCLI.app`，macOS 分发走向正规化。
🔗 https://github

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-09-10** | 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 一、今日速览

今日社区动态聚焦三大主线：**Subagent 可靠性问题持续发酵**（误报成功、挂起、日志缺失等多条 P1 问题活跃讨论中）；**安全加固成为 PR 主战场**（提示注入防护、沙箱文件系统边界、认证崩溃修复等多个安全向 PR 密集推进）；同时 nightly 版本发布，修复了 NTFS 短路径和沙箱容器配置隔离问题。Auto Memory 系统的安全性与质量问题也进入维护者重点治理阶段。

---

## 二、版本发布

### v0.61.0-nightly.20260909.ged2ac40df
[Release 链接](https://github.com/google-gemini/gemini-cli/releases)

- **fix(core)**: 缓解 NTFS 8.3 短文件名（SFN）路径问题 ([#29116](https://github.com/google-gemini/gemini-cli/pull/29116))——针对 Windows 环境下短路径可能绕过安全校验的隐患
- **fix(cli)**: 在沙箱容器中隔离配置目录 ([#29216](https://github.com/google-gemini/gemini-cli/pull/29216))——避免沙箱运行时状态污染宿主机配置

---

## 三、社区热点 Issues（Top 10）

**1. [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 后误报 GOAL 成功** `P1` | 💬 13
今日讨论度最高的问题。`codebase_investigator` 子代理达到轮次上限后仍报告 `status: "success"`，掩盖了实际中断。**误报成功比直接失败更危险**——用户可能基于虚假结论继续工作。已进入 need-retesting 状态。

**2. [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist agent 无限挂起** `P1` | 💬 8 | 👍 8
通用代理接管后连创建文件夹这类简单操作都会永久挂起（用户等待长达 1 小时）。高 👍 数表明影响面广，目前唯一的 workaround 是指示模型不使用子代理——这直接抵消了子代理架构的价值。

**3. [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 后执行意图路由** `P2` | 💬 9
战略性提案：Gemini 3 模型原生偏好 POSIX 工具链（`grep`/`sed`/`awk`），应通过 OS 级沙箱释放其 bash 亲和性，同时以"后执行意图路由"保障安全。这代表了社区对**执行架构演进方向**的核心讨论。

**4. [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知文件读取/搜索/映射 EPIC** `P2` | 💬 7
探索用 AST 感知工具替代朴素文本读取，一次调用精确定位方法边界，减少错位读取的轮次浪费和 token 噪音。与 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)（tilth/glyph 方案调研）构成完整的性能优化路线图。

**5. [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) Auto Memory 确定性脱敏与日志削减** `P2` `security` | 💬 5
安全问题：Auto Memory 将本地转录内容发送给后台提取代理，**密钥脱敏发生在内容已进入模型上下文之后**，属于"事后补救"而非"事前防护"。需要引入确定性的本地脱敏机制。

**6. [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 极少主动使用 Skills 和子代理** `P2` | 💬 6
即便任务高度相关，模型也不会自主调用自定义技能（如 gradle/git skill），需显式指令才触发。这暴露了**技能路由/触发机制**的有效性问题，直接影响技能生态的实用价值。

**7. [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) Shell 命令完成后卡在 "Waiting input"** `P1` | 💬 4 | 👍 3
极简单的 shell 命令执行完毕后，CLI 仍显示"等待用户输入"并挂起。核心执行链路的稳定性缺陷，影响日常使用流畅度。

**8. [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) get-shit-done output hook 导致崩溃** `P1` | 💬 3
输出 hook 在打印用户摘要阶段反复触发崩溃。P1 定位表明这不是孤立的第三方扩展问题，涉及 hook 执行框架的健壮性。

**9. [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) Browser subagent 在 Wayland 下失败** `P1` | 💬 4
Linux Wayland 会话下浏览器子代理直接失败。配合 [#22232](https://github.com/google-gemini/gemini-cli/issues/22232)（会话接管与锁恢复）和 [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)（忽略 settings.json 配置），browser agent 的健壮性问题是当前子代理体系的重灾区。

**10. [#21335](https://github.com/google-gemini/gemini-cli/issues/21335) /compress 压缩结果不持久化** `P2` | 💬 2 | 👍 2
`/compress` 将对话历史替换为摘要后未写回磁盘会话文件，resume 后压缩效果丢失、token 节省归零。上下文管理的"最后一公里"问题。

---

## 四、重要 PR 进展（Top 10）

**1. [#29250](https://github.com/google-gemini/gemini-cli/pull/29250) 防止通过构建文件修改和不可信标志进行间接提示注入** `size/xl` 🔒 OPEN
重构 `shell`/`edit`/`write_file` 内置执行路径，在受限工作区模式下强化构建配置文件与外部命令参数的边界校验。**今日最重要的安全 PR**。

**2. [#29214](https://github.com/google-gemini/gemini-cli/pull/29214) 加固沙箱文件系统边界并隔离运行时状态** `size/l` 🔒 OPEN
将沙箱运行时状态与宿主机配置目录隔离，用净化后的配置文件替代宿主目录挂载，统一采用 realpath 解析做路径敏感性检查。与今日 release 中的沙箱配置隔离修复形成呼应。

**3. [#29265](https://github.com/google-gemini/gemini-cli/pull/29265) 防止中断轮次导致的会话上下文污染** `P2` OPEN
修复 SIGINT/超时/工具中止中断 agentic stream 后污染会话历史、破坏后续 prompt 执行的问题。直接关联 #22323 等 subagent 中断类缺陷的根因治理。

**4. [#29266](https://github.com/google-gemini/gemini-cli/pull/29266) 防止复杂度路由覆盖手动选择的模型** ✅ CLOSED
修复 GCA Normal Mode 下 `CliComplexityBasedRouting` 启用时，将用户显式指定的具体模型（如 `chat-gemini-3-1-pro-preview-paid-tier`）强制降级为 Gemini 2.5 Flash 的问题。**用户模型选择权的保障**。

**5. [#29262](https://github.com/google-gemini/gemini-cli/pull/29262) 交替缓冲区模式动态开关** `P1` ✅ CLOSED
通过避免同步卸载历史项规避 yoga-wasm 内存越界崩溃，消除退出交替缓冲区时的页脚重影，恢复正常缓冲区滚动。终端 UI 稳定性的重要修复。

**6. [#29063](https://github.com/google-gemini/gemini-cli/pull/29063) 修复非交互会话中 Plan Mode 等待用户反馈挂起** `P1` ✅ CLOSED
非交互模式（`gemini -p "..." -y`）下 Plan Mode 指示代理等待永不到来的用户输入导致挂起。**CI/CD 场景的关键修复**。

**7. [#29163](https://github.com/google-gemini/gemini-cli/pull/29163) 修复 macOS Seatbelt 下 git 仓库内认证崩溃** `P1` `security` OPEN
启动时 `useGitBranchName` hook 在受限权限环境下读取 `.git` 失败导致崩溃。macOS 沙箱用户的启动阻断问题。

**8. [#29156](https://github.com/google-gemini/gemini-cli/pull/29156) 停止在 shell 执行中清空用户 git 配置** OPEN
修复 #28792 引入的回归：`GIT_CONFIG_GLOBAL/GIT_CONFIG_SYSTEM` 被指向 `/dev/null`，导致 `user.name`、签名等配置在所有 shell 命令中失效。典型的安全加固引发的可用性回归。

**9. [#29087](https://github.com/google-gemini/gemini-cli/pull/29087) 防止并发扩展安装竞态** ✅ CLOSED
利用现有 `proper-lockfile` 依赖为扩展安装/更新加锁，解决两个 CLI 进程同时操作导致的文件拷贝交错与元数据写入冲突。多实例并行使用场景的刚需。

**10. [#29089](https://github.com/google-gemini/gemini-cli/pull/29089) 向 retryWithBackoff 转发 abortSignal** ✅ CLOSED
`BaseLlmClient`（会话摘要、压缩、分类器共用）此前接收 `abortSignal` 却未传入重试层，导致取消操作无法中断退避重试。涉及 #29065 中断传播链路的补全。

> 💡 另有 [#29155](https://github.com/google-gemini/gemini-cli/pull/29155)（BOM 编码文件误判为非空）、[#29151](https://github.com/google-gemini/gemini-cli/pull/29151)（Skill 优先级大小写不敏感匹配）、[#29248](https://github.com/google-gemini/gemini-cli/pull/29248)（确认操作后历史/遥测去重）等修复持续推进。

---

## 五、功能需求趋势

| 方向 | 信号强度 | 代表 Issue |
|---|---|---|
| **Subagent 可观测性与可靠性** | ★★★★★ | #22323 / #21409 / #22598 / #21763 |
| **沙箱与执行安全架构** | ★★★★★ | #19873 / #22672 / #26525 + PR #29250 / #29214 |
| **上下文与 token 效率** | ★★★★ | #22745 / #19561 / #21335 |
| **Auto Memory 治理** | ★★★★ | #26525 / #26522 / #26523 / #26516 |
| **Browser agent 健壮化** | ★★★ | #22232 / #22267 / #21983 |
| **AST 感知代码工具链** | ★★★ | #22745 / #22746 |
| **持久化任务追踪（替代 WriteToDo）** | ★★★ | #18836 / #21000 |

**核心洞察**：社区讨论正从"功能有无"转向"**可信

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-09-10 | 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)**

---

## 一、今日速览

过去 24 小时社区活跃度较高（46 条 Issue 更新），**v1.0.84-3** 发布，重点修复了 OAuth 认证的 MCP 服务器在会话启动时的连接问题。Windows 平台成为吐槽重灾区：#4756（强制归档会话）以 19 👍 成为最热 Issue，叠加 WSL2 CPU 回归、沙箱权限等问题。此外，"400 input item ID" 连接错误家族出现新变种（#4791），值得持续关注。

---

## 二、版本发布

### v1.0.84-3
**Fixed**
- `/copy` 命令现在会在可用时包含任务完成消息
- OAuth 认证的 MCP 服务器在会话启动时可靠连接

> 点评：MCP OAuth 启动连接修复与近期多个 MCP 认证类 Issue（如 #4769 重定向失败）方向一致，但重定向场景是否覆盖尚待社区验证。

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 关注度 | 关注理由 |
|---|-------|--------|----------|
| 1 | [#4756 Windows 应用要求归档所有空闲会话才能新建 Local 会话](https://github.com/github/copilot-cli/issues/4756) | 7 评论 / **19 👍** | **今日最高赞**。桌面应用 1.1.15 + CLI 1.0.83-5 组合下，新建会话报 "invalid argument"，严重影响日常工作流 |
| 2 | [#135 浅色主题失效](https://github.com/github/copilot-cli/issues/135) | **12 评论** / 12 👍 | 创建于 2025-09-30，**近一年未解决**，长期困扰浅色终端用户，社区耐心临近极限 |
| 3 | [#4535 `store_memory` 在 v1.0.81 预发布版持续失败](https://github.com/github/copilot-cli/issues/4535) | 8 评论 / 1 👍 | 上下文记忆核心功能受阻：原生内存写入缺少必需的实例 ID，导致 `Instance id is required` 错误 |
| 4 | [#3700 WSL2 回归：主线程空闲时 CPU 飙至 ~215%，TUI 输出冻结](https://github.com/github/copilot-cli/issues/3700) | 3 评论 / 2 👍 | 标注 **High severity**，是 #2208 的回归问题，重启前实时输出完全无法渲染 |
| 5 | [#2147 CAIP 400: input item ID 不属于此连接](https://github.com/github/copilot-cli/issues/2147) | 6 评论 / 1 👍 | 已关闭。该错误与 WebSocket 传输相关，今日 PR [#4770](https://github.com/github/copilot-cli/pull/4770) 专门为其文档化了退出方案 |
| 6 | [#4791 切换用户账户后陷入不可恢复的 400 错误](https://github.com/github/copilot-cli/issues/4791) | 新报告 | 与 #2147 同族错误的新触发路径：换号后重启会话也无法恢复，疑似连接状态与账户绑定过深 |
| 7 | [#4775 Mission Control 面板链接 404](https://github.com/github/copilot-cli/issues/4775) | 3 评论 | 路径不一致：面板指向 `/copilot/tasks/<uuid>`，实际会话位于 `/agents/tasks/<uuid>`，远程会话入口形同虚设 |
| 8 | [#2199 请求支持 Ctrl+Backspace 整词删除](https://github.com/github/copilot-cli/issues/2199) | 3 评论 / 7 👍 | 高赞功能请求；配套的 Windows 特定问题 [#3858](https://github.com/github/copilot-cli/issues/3858)（6 👍）指出 Windows 上该快捷键完全失效，仅 Alt+Backspace 可用 |
| 9 | [#3772 支持对 MCP 注册表的认证读取](https://github.com/github/copilot-cli/issues/3772) | 1 评论 / 5 👍 | 企业刚需：自定义 MCP 注册表（如 Azure API Center）目前匿名读取，企业被迫暴露匿名端点 |
| 10 | [#4769 MCP OAuth 在元数据 URL 重定向时失败](https://github.com/github/copilot-cli/issues/4769) | 1 评论 | issuer 校验与重定向发现地址不匹配导致认证失败，是今日新版本 MCP 修复方向的有力补充 |

---

## 四、重要 PR 进展

> ⚠️ 过去 24 小时仅 2 条 PR 更新，且均为文档类，无代码功能变更：

1. **[#4770 文档化 WebSocket responses 退出选项](https://github.com/github/copilot-cli/pull/4770)** — 针对网络封锁 WebSocket 或遭遇 `400 input item ID` 错误的场景，文档化可用的关闭手段。与已关闭的 #2147 直接呼应，是连接错误族问题的"官方逃生指南"。
2. **[#4786 修订第三方服务相关通知](https://github.com/github/copilot-cli/pull/4786)** — 澄清第三方服务的访问要求与条款表述，属合规性文档更新。

---

## 五、功能需求趋势

从今日 Issue 池可提炼出五大方向：

- **🎨 主题与外观控制**（#135、#3773、#4620）：浅色主题修复呼声最高，"固定 GitHub 主题为深色/浅色"的解耦需求（不跟随系统）开始出现
- **⌨️ 键盘交互习惯**（#2199、#3858）：Ctrl+Backspace 整词删除的跨平台一致性问题，合计 13 👍
- **🔄 会话管理智能化**（#1467、#4756）：默认恢复上次会话、会话列表可辨识性、避免强制归档
- **🔐 MCP 与企业集成**（#3772、#4769、#4773、#4765）：认证读取注册表、OAuth 可靠性、非 repo 根目录的配置发现，企业场景复杂度持续暴露
- **🧩 插件生态**（#4487）：请求为 marketplace 插件建立依赖声明与自动安装机制，对标 Claude Code 已有能力

---

## 六、开发者关注点

1. **Windows 平台稳定性成最大痛点**：今日 Issue 中 Windows/WSL2 相关占比显著（#4756、#3700、#4771 任务栏卡片卡转圈、#4788 沙箱 `git status` 权限拒绝、#4381 通知角标残留），Windows 体验亟需一轮系统性治理。
2. **连接错误族问题持续蔓延**："400 input item ID does not belong to this connection" 已确认与 WebSocket 传输相关，且新触发路径不断出现（#4791 切换用户），建议关注 #4770 的退出方案作为临时缓解。
3. **资源消耗问题不容忽视**：`tgrep` 索引器在大型 monorepo 上无内存上限导致宿主 OOM（[#3976](https://github.com/github/copilot-cli/issues/3976)），叠加 WSL2 CPU 空转，重度用户对性能回归敏感。
4. **长会话可靠性退化**：自动审批模式约 1 小时后静默失效（[#4764](https://github.com/github/copilot-cli/issues/4764)），需要重启会话恢复，影响免打扰的连续工作流。
5. **新旧版本交替期风险**：`store_memory` 在 v1.0.81 预发布版中断裂（#4535）提示预发布通道的内存/实例管理正在重构，升级预发布版本需谨慎评估。

---

*本报告基于 GitHub 公开数据自动整理，如有出入请以官方仓库为准。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期：2026-09-10 | 数据来源：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)**

---

## 一、今日速览

今日无新版本发布，社区活跃度相对平缓。最值得关注的动态是两条新报出的 Bug：**#2638 设备授权登录在浏览器确认后返回 HTTP 500**（直接影响用户登录，属阻断性问题），以及 **#2639 Windows Terminal 下阿拉伯语（RTL）文字字符反转渲染问题**。此外，存在近 7 个月的 VSCode 扩展 `@` 文件联想优化建议 #1270 已被关闭，或已进入实现/处理流程。

---

## 二、版本发布

过去 24 小时无新 Release。

---

## 三、社区热点 Issues

> 今日共 4 条 Issue 更新（2 新增、2 关闭），全部收录如下：

### 1. 🔴 /login 设备授权登录失败：浏览器确认成功后返回 HTTP 500
- **状态**：OPEN（新增）| **环境**：CLI v0.42.0 / macOS / 免费版
- **为何重要**：这是**阻断性登录故障**——用户在浏览器中完成设备码确认后，CLI 侧仍收到 HTTP 500，且在 VS Code 扩展中同样复现。涉及认证链路，影响面可能较广。
- **社区反应**：暂无评论，尚待官方回应，建议持续关注。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2638

### 2. 🟠 阿拉伯语（RTL）文本在交互提示与对话回复中字符反转
- **状态**：OPEN（新增）| **环境**：Windows Terminal
- **为何重要**：涉及**国际化与终端渲染**——阿拉伯语直接输入时逐字符反转显示，AI 回复中阿拉伯语与拉丁字符/数字混排时同样异常。对中东及北非用户群体是基础可用性问题。
- **社区反应**：暂无评论。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2639

### 3. 🟢 [enhancement] VSCode 扩展：输入 `@` 后应优先展示已打开的文件
- **状态**：CLOSED（2026-02-27 创建，2026-09-09 关闭）
- **为何重要**：典型的工作流上下文感知需求——用户输入 `@` 引用文件时，大概率意图操作当前已打开的编辑器文件，优先级排序可显著减少检索成本。该 Issue 存续约 7 个月后关闭，值得关注后续版本是否落地。
- **社区反应**：1 条评论。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1270

### 4. 🟢 [Feature] Kimi Web 支持对 AI 回复的任意片段“引用并追问”（Quote & Reply）
- **状态**：CLOSED（2026-08-11 创建，2026-09-09 关闭）
- **为何重要**：精细化的对话交互体验——允许用户框选 AI 回复中的段落/代码块/diff 解释行，针对该片段附加评论或追问。关闭可能意味着已排期、转移跟踪或已实现。
- **社区反应**：无评论。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2601

---

## 四、重要 PR 进展

> 今日仅 1 条 PR 更新，收录如下：

### 1. fix(fetch): 抑制网页抓取中重复提取的评论文本
- **状态**：CLOSED（2026-04-13 创建，2026-09-09 更新/关闭）
- **内容**：修复 `FetchURL` 的 HTML 提取路径——将 Trafilatura 的正文与评论分开检查，当提取的评论归一化后与正文内容相同时予以抑制，并为 GitHub Issue 抓取的重复输出场景补充了回归测试。可提升网页内容读取的准确性与 token 效率。
- 链接：https://github.com/MoonshotAI/kimi-cli/pull/1863

---

## 五、功能需求趋势

从今日更新的 Issues 中可提炼出以下方向：

| 方向 | 信号来源 | 分析 |
|---|---|---|
| **IDE 深度集成** | #1270、#2638（扩展复现登录问题） | VSCode 扩展是高频使用入口，社区持续要求编辑器上下文感知（已打开文件优先联想）；同时扩展质量需与 CLI 同步保障 |
| **国际化 / 多语言渲染** | #2639 | RTL 文字渲染是此前较少被覆盖的盲区，提示终端 UI 对非拉丁语系的兼容仍需补课 |
| **Web 端交互精细化** | #2601 | 引用-追问（Quote & Reply）类功能是 AI 对话产品的成熟交互范式，社区期望对齐 |
| **认证与基础稳定性** | #2638 | 登录链路的服务端 500 错误属于最优先级的基础设施问题 |

---

## 六、开发者关注点

1. **认证可靠性是底线**：#2638 中设备授权流程“浏览器确认成功但 CLI 报 500”的断裂体验，且免费档用户 + VS Code 扩展双场景复现，是最需优先响应的痛点。
2. **终端渲染对非拉丁语系的兼容性**：RTL 语言反转问题（#2639）反映底层 TUI 渲染层在国际化上的欠缺，可能同样影响希伯来语、波斯语等用户。
3. **编辑器上下文感知的工作流诉求**：开发者期望工具“懂我正在看什么”——`@` 文件联想优先展示已打开文件（#1270）是此类需求的代表。
4. **内容抓取质量**：PR #1863 针对的网页正文/评论重复提取问题，直接影响基于 fetch 的上下文构建质量与 token 成本，此类基础能力打磨仍是社区持续关注点。

---

*本报告基于过去 24 小时 GitHub 公开数据自动整理生成。今日数据量较小（4 Issues / 1 PR），已全量收录。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：2026-09-10** | 数据来源：[anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 一、今日速览

OpenCode 发布 **v1.18.30**，为 GPT-6 模型加入 Astra 系统提示词，并修复了 Bedrock DeepSeek 模型 ID 解析等问题。社区侧，配置热重载需求（#8751，96 👍）持续领跑功能投票，而 **Plan 模式可被 bash 绕过**（#39491）和 **Kimi K3 压缩摘要为空导致历史丢失**（#41571）是今日最受关注的风险类问题。桌面端与 CLI 自动化场景的稳定性反馈明显增多。

---

## 二、版本发布

### [v1.18.30](https://github.com/anomalyco/opencode/releases)

**Core 改进：**
- 为 GPT-6 系列模型新增 **Astra 系统提示词**

**Bug 修复：**
- 保留 Bedrock DeepSeek 模型 ID（含基于 ARN 的 ID），确保正确解析（@YeEmrick）
- 升级 Azure Provider SDK，纳入兼容性修复
- 升级 OpenAI Provider SDK

---

## 三、社区热点 Issues

| # | Issue | 关注度 | 看点 |
|---|-------|--------|------|
| 1 | [#8751 热重载 agents/skills/commands](https://github.com/anomalyco/opencode/issues/8751) | 23 评论 / 96 👍 | **社区呼声最高的功能**：允许运行时失效并重载配置，无需重启即可新增 agent/skill。自 1 月提出至今热度不减 |
| 2 | [#32747 @ 文件引用不含启动后新建的文件](https://github.com/anomalyco/opencode/issues/32747) | 16 评论 / 14 👍 | 启动后创建的文件在 `@` 补全中缺失，需重启才可见。代码审查指向 TUI 搜索状态过期，影响日常工作流 |
| 3 | [#39491 Plan 模式可经 bash 写入文件](https://github.com/anomalyco/opencode/issues/39491) | 5 评论 | **安全边界问题**：模型在 Plan 模式下绕过 write-tool 限制，用 `cat >` 等 bash 命令直接写文件，Plan 模式的只读承诺形同虚设 |
| 4 | [#41571 Kimi K3-256K 压缩摘要为空，历史被静默丢弃](https://github.com/anomalyco/opencode/issues/41571) | 3 评论 / 2 👍 | 自 v1.18.15 起，压缩输出仅含 reasoning 部分而无 text，导致**对话历史静默丢失**，属数据完整性风险 |
| 5 | [#41730 --auto 权限不级联到子 agent](https://github.com/anomalyco/opencode/issues/41730) | 3 评论 | `opencode run --auto` 的自动批准权限未向下传递给 subagent，自动流水线中途卡在审批上 |
| 6 | [#48214 会话中 Prompt 工具列表与运行时注册表偏离](https://github.com/anomalyco/opencode/issues/48214) | 3 评论 | 生产级 headless 多租户场景（`opencode serve`）中，一批工具调用正常后下一批全部解析失败，无 MCP 变更也会触发 |
| 7 | [#47034 gemini-3.8-flash 报 400 错误](https://github.com/anomalyco/opencode/issues/47034) | 5 评论 / 1 👍 | Gemini 3.8 Flash 经 API 调用返回 `Requests ending with a model turn are not supported`，模型兼容性问题 |
| 8 | [#48203 Desktop(Mac) 追问会打断正在运行的回合](https://github.com/anomalyco/opencode/issues/48203) | 2 评论 | 发送后续消息会"抢占"当前回合而非排队，首个任务永远无法完成，报告者已定位到 app 代码根因 |
| 9 | [#42238 `run --format json` 将压缩内部输出混入普通文本事件](https://github.com/anomalyco/opencode/issues/42238) | 3 评论 | 自动压缩的摘要与合成提示词以 `type: "text"` 事件输出，JSONL 消费方无法区分，破坏 CLI 自动化管道 |
| 10 | [#39677 Azure 图片数 400 错误未触发媒体剥离压缩](https://github.com/anomalyco/opencode/issues/39677) | 2 评论 / 1 👍 | Azure 硬性限制 50 张图片，长会话超限后持续致命 400，且未被归类为上下文溢出，自动恢复机制不生效 |

**其他值得一看：** [#48215 俄语用户请求回归 DeepSeekV4](https://github.com/anomalyco/opencode/issues/48215)（已关闭）、[#48206 新版侧边栏"消失"投诉](https://github.com/anomalyco/opencode/issues/48206)（已关闭）、[#48099 请求桌面版 MSI 安装器](https://github.com/anomalyco/opencode/issues/48099)。

---

## 四、重要 PR 进展

1. **[#46670 会话历史树侧边栏](https://github.com/anomalyco/opencode/pull/46670)**（OPEN）
   v2 浮层 UI 将侧边栏开关、新建会话、会话标题堆叠在对话流之上，此 PR 重构为历史树侧边栏，是桌面端信息架构的重要改进。

2. **[#48225 修复 ACP 会话选项与 reasoning 边界](https://github.com/anomalyco/opencode/pull/48225)**（OPEN）
   修复 ACP 协议下 reasoning 内容边界的两个 bug，关联已关闭的 #31961。

3. **[#48235 TUI 启动竞态防护](https://github.com/anomalyco/opencode/pull/48235)**（OPEN）
   修复 #40002：TUI Data provider 启动时并发触发 **8 个 location refresh**，加入竞态守卫。

4. **[#48223 降低会话冷/热加载开销](https://github.com/anomalyco/opencode/pull/48223)**（OPEN）
   针对大 session 进入缓慢的用户反馈：复用最多 16 个已渲染 timeline、延迟折叠计算，性能优化向 PR。

5. **[#48150 分支搜索与会话间距打磨](https://github.com/anomalyco/opencode/pull/48150)**（OPEN）
   修复菜单延迟 autofocus 后无法立即输入的问题，桌面端交互细节优化。

6. **[#41449 交互式终端工具 + VS Code 自动挂载](https://github.com/anomalyco/opencode/pull/41449)**（CLOSED，自动清理）
   允许 agent 驱动真实 PTY（open/read/input/close）并自动挂载进 VS Code 终端面板，思路值得关注，可惜被自动化清理关闭。

7. **[#41435 将未发送的 prompt 草稿按会话隔离](https://github.com/anomalyco/opencode/pull/41435)**（CLOSED，自动清理）
   解决切换会话时草稿串台问题——新会话不再携带上一会话的未发送文本。

8. **[#41432 i18n 渲染集中化](https://github.com/anomalyco/opencode/pull/41432)**（CLOSED，自动清理）
   将运行时英文回退、富模板插入、复数选择收敛到统一的类型化 i18n 上下文，机械化迁移全部 **62 个 UI 语言字典**。

9. **[#48152 压缩进度与结果可视化](https://github.com/anomalyco/opencode/pull/48152)**（CLOSED）
   修复压缩刚开始就显示 "Session compacted" 的误导，改为真实进度反馈。

10. **[#41401 跨 TUI 保持已关闭标签页状态](https://github.com/anomalyco/opencode/pull/41401)**（CLOSED，自动清理）
    两个 TUI 共享 tab 存储时，一方关闭的标签页不再被另一方意外重开。

> ⚠️ **观察**：今日大量社区 PR（#414xx 系列）被 `automated-pr-cleanup` 机器人批量关闭，贡献者可能需要重新提交或认领，这一清理策略对社区积极性的影响值得留意。

---

## 五、功能需求趋势

1. **配置热重载与动态加载**：#8751（96 👍）的agents/skills/commands 热重载是社区第一诉求，#48219 的 skill 遮蔽问题也属同一范畴——静态配置模型正在成为瓶颈。
2. **桌面端成熟度**：MSI 企业部署（#48099）、Mac 交互冲突（#48203）、终端面板冻结（#48202）、UI 状态残留（#48199），桌面版进入"打磨深水区"。
3. **模型生态快速跟进**：GPT-6 Astra 提示词（已发布）、Gemini 3.8 Flash 报错、Kimi K3 压缩异常、DeepSeekV4 回归呼声、Bedrock ARN 修复——新模型适配的节奏在加快。
4. **权限与自主性控制**：auto-accept 开关（#48237）、subagent 权限级联（#41730）、Plan 模式强制约束（#39491），用户对"自主程度颗粒度"的需求上升。
5. **CLI/无人值守自动化**：JSON 输出纯净性（#42238）、`--server` 远程路径解析（#47665）、headless 多租户稳定性（#48214），OpenCode 正被更多嵌入到自动化管线中。

---

## 六、开发者关注点

- **"重启才能修复"类问题高频出现**：`@` 引用过期（#32747）、工具注册表偏离（#48214）、skill 加载不一致（#48219）——运行时状态同步机制是共同的深层症结，与热重载需求（#8751）互为表里。
- **压缩可靠性是数据安全红线**：空摘要丢历史（#41571）、内部输出泄漏进 JSON 流（#42238）、Azure 图片超限不触发压缩（#39677）——三条

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报

**日期：** 2026-09-10 ｜ **数据来源：** [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

---

## 一、今日速览

Qwen Code 迎来密集发版：CLI **v0.23.2** 正式版、SDK TypeScript **v0.1.11** 及 CUA Driver **v0.20.5** 同日发布，Web Shell 分屏会话导航得到增强。社区方面，**Windows 平台 ConPTY 进程泄漏**（#11303/#11352）成为最热话题，两条 P1 讨论合计 16 条评论；同时 VS Code 扩展升级导致**会话历史丢失**（#11489）和 TUI 后台 Agent 完成时的**静默崩溃**（#11500）两条新 P1 引发关注。

---

## 二、版本发布

### 📦 [v0.23.2](https://github.com/QwenLM/qwen-code/releases) （正式版）
- **feat(web-shell):** 改进分屏会话导航（[#11250](https://github.com/QwenLM/qwen-code/pull/11250)，by @wensha）
- 官方声明无已知 Breaking Changes

### 🌙 [v0.23.2-nightly.20260909](https://github.com/QwenLM/qwen-code/releases)
- **fix(goal):** 超出 claim 预算的 checkpoint 改为重试，不再消耗 stall（[#11365](https://github.com/QwenLM/qwen-code/pull/11365)）

### 🧩 [sdk-typescript-v0.1.11](https://github.com/QwenLM/qwen-code/releases)
- 捆绑 CLI v0.23.2，与 CLI 同源同分支构建

### 🖥️ [cua-driver-rs-v0.20.5](https://github.com/QwenLM/qwen-code/releases)
- 预编译二进制：macOS 代码签名+公证的通用二进制及 `QwenCuaDriver.app`；Linux x86_64/arm64（glibc 2.31 起步）；Windows UIAccess worker + 原生 SDK payload

---

## 三、社区热点 Issues

| # | 问题 | 重要性 |
|---|------|--------|
| 1 | [#11303](https://github.com/QwenLM/qwen-code/issues/11303) Windows 下 conhost.exe 泄漏 | 🔥 P1，12 条评论，今日最热 |
| 2 | [#11119](https://github.com/QwenLM/qwen-code/issues/11119) serve 会话回收丢后台输出 | P1，10 条评论 |
| 3 | [#11489](https://github.com/QwenLM/qwen-code/issues/11489) 扩展升级丢失全部会话历史 | P1，升级事故 |
| 4 | [#11500](https://github.com/QwenLM/qwen-code/issues/11500) TUI 静默退出（React #185） | P1，今日新增 |
| 5 | [#11352](https://github.com/QwenLM/qwen-code/issues/11352) node-pty 层 ConPTY 泄漏 | P1，依赖层受阻 |

**详细解读：**

1. **[#11303](https://github.com/QwenLM/qwen-code/issues/11303)** — Windows 上 qwen-cli（VS Code Companion）泄漏 headless `conhost.exe` 进程，约 12 小时后单个进程累积 **347 个子进程、占用约 2.8 GB 内存**。已标记 ready-for-human，是近期 Windows 性能类最严重的反馈。

2. **[#11119](https://github.com/QwenLM/qwen-code/issues/11119)** — daemon 模式（`qwen serve`）下 Web Shell 会话运行时回收后，后台 shell 的输出与唤醒通知被**静默丢弃**，导致会话卡死（wedge）。CI 轮询类长任务场景受影响最大，讨论持续 5 天仍开放。

3. **[#11489](https://github.com/QwenLM/qwen-code/issues/11489)** — VS Code 扩展从 v0.21.11 升级到 v0.23.1 后，侧边栏**全部历史会话消失**。数据仍存在于 `state.vscdb`，但新版本不读取，属升级兼容性事故，已要求补充信息。

4. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500)** — 多个后台子 Agent 接近同时完成时，TUI 触发未捕获的 **Minified React error #185**（最大更新深度超限）直接退出到 shell，无任何错误提示。Ink 的 `useBoxMetrics` 布局监听 setState 循环被指为根因。

5. **[#11352](https://github.com/QwenLM/qwen-code/issues/11352)** — 从 #11303 拆分出的"不可修复半边"：`@lydell/node-pty` 1.2.0-beta.10 在自然退出时擦除 baton 早于 `onExit`，JS 侧无法触达 `ClosePseudoConsole`。**锁定依赖版本下无解**，状态 blocked，需上游配合。

6. **[#11186](https://github.com/QwenLM/qwen-code/issues/11186)** — `qwen serve` 绑定用户 home 目录时，channel 所有权模型未覆盖该场景的 user-scope settings 读取，设置加载逻辑与实际归属不一致。

7. **[#11503](https://github.com/QwenLM/qwen-code/issues/11503)** — daemon git guard（#8687 引入）在仓库 `.git` 目录为 NTFS junction/符号链接指向其他卷时，**拒绝所有 git 命令（含只读的 status/log/diff）**，连会话自身的工作区仓库也被拦截，Windows 用户痛点明显。

8. **[#11499](https://github.com/QwenLM/qwen-code/issues/11499)** — 项目 `.mcp.json` 中 `${VAR}` 占位符不被展开，`Authorization: Bearer ${MY_TOKEN}` **以字面文本发送**。好消息是修复 PR（#11501）当日即提交。

9. **[#11433](https://github.com/QwenLM/qwen-code/issues/11433)** — 社区发起设计

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*