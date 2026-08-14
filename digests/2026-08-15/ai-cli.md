# AI CLI 工具社区动态日报 2026-08-15

> 生成时间: 2026-08-14 20:43 UTC | 覆盖工具: 7 个

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



---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据窗口**：截至 2026-08-15 · 来源：anthropics/skills
**数据说明**：本次 PR 列表的评论数字段缺失（undefined），以下排行综合关联 Issue 热度、更新

---

# Claude Code 社区动态日报
**日期：2026-08-15 | 数据来源：github.com/anthropics/claude-code**

---

## 1. 今日速览

Claude Code 发布 **v2.1.232**，子代理分叉默认启用、新增 `@` 提及跨会话功能，多会话协作能力迎来重要升级。然而与新功能形成鲜明对比的是，过去 24 小时 Windows 桌面端集中爆发 **4 个跨会话消息“送达但不触发响应”的 Bug 报告**（#86069 / #86212 / #86498 / #86319），新功能稳定性引发担忧。此外，Windows GPU 崩溃与 Max 配额异常消耗两类问题持续发酵，是当前社区情绪最集中的痛点。

---

## 2. 版本发布

### v2.1.232（过去 24 小时发布）
- **子代理分叉默认启用**：`subagent_type: "fork"` 子代理可继承完整对话上下文与 prompt cache；交互式会话中非 teammate 的 agent 启动默认转入后台运行
- **会话提及**：在提示符输入 `@` 即可按名称引用另一个 Claude 会话

> **分析**：这两项更新直接回应了社区呼声最高的多会话编排需求（参见 #24798）。fork 继承 prompt cache 对降低多代理场景成本意义重大，但需关注与 #77964（代理扇出不切换低成本模型）的叠加影响。

---

## 3. 社区热点 Issues

| # | Issue | 热度 | 关注理由 |
|---|-------|------|----------|
| 1 | [#24798 会话间通信支持多 Claude 工作流](https://github.com/anthropics/claude-code/issues/24798) | 💬68 👍21 | 半年老帖持续活跃，诉求并行会话间建立依赖编排。今日 v2.1.232 的 `@` 提及可视为官方对该方向的首次正式响应，评论区关注度再度攀升 |
| 2 | [#34255 Remote Control 自动重连失效，连接静默断开](https://github.com/anthropics/claude-code/issues/34255) | 💬62 👍103 | 👍 全场第二高。iOS/macOS 远程控制断连后无任何恢复机制，对移动办公场景是致命体验，社区持续施压求修复 |
| 3 | [#30492 实时转向：执行中重定向 Claude 的优先消息通道](https://github.com/anthropics/claude-code/issues/30492) | 💬34 👍60 | 长任务执行中无法有效干预是高频痛点，与今日发布的后台 agent 默认运行形成互补需求——后台任务更需要中途 steering 能力 |
| 4 | [#65961 模型默认输出冗长注释，无视停止指令](https://github.com/anthropics/claude-code/issues/65961) | 💬12 👍112 | **👍 全场最高**。模型行为层面的指令遵从问题，反映社区对"CLAUDE.md 约束力"的普遍不满，值得模型团队关注 |
| 5 | [#80444 Windows 桌面端 GPU 进程致命崩溃，MSIX 包损坏需 Repair](https://github.com/anthropics/claude-code/issues/80444) | 💬33 | 崩溃后应用彻底无法启动（appxState=2），双驱动版本复现，Windows 体验危机的代表案例 |
| 6 | [#81698 GPU 崩溃连带杀死全部运行中会话](https://github.com/anthropics/claude-code/issues/81698) | 💬30 | 与 #80444 同根源，但危害更大——长时间运行的多个会话被一次崩溃全部清零，无恢复手段 |
| 7 | [#86069 跨会话消息落入 composer 但从不提交](https://github.com/anthropics/claude-code/issues/86069) | 💬19 | **与 v2.1.232 新功能直接相关**，标记为 regression。另有 #86212、#86498、#86319 三个同源报告，Windows 端跨会话消息链路存在系统性缺陷 |
| 8 | [#15125 Chrome 集成支持指定实例/Profile](https://github.com/anthropics/claude-code/issues/15125) | 💬18 👍37 | 多 Chrome 实例/配置文件用户的刚需，浏览器集成深化的代表性诉求 |
| 9 | [#76187 Cowork (Windows) 项目文件夹挂载失败](https://github.com/anthropics/claude-code/issues/7676187) | 💬11 | 7 月 8 日更新引入的回归，嵌套文件夹静默分离，双机复现，报告质量高（含 bridge 层分析） |
| 10 | [#57580 macOS PTY 文件描述符泄漏 [已关闭]](https://github.com/anthropics/claude-code/issues/57580) | 💬23 👍27 | 长 Bash 会话耗尽 `kern.tty.ptmx_max` 导致系统级 ENXIO 的经典 bug 本日关闭，正面信号；同类监控思路值得借鉴 |

**其他值得留意**：[#78420 v2.1.209 起 prompt 间歇性翻倍发送](https://github.com/anthropics/claude-code/issues/78420)（隐藏请求烧配额、上下文计锁定 100%，标记 regression）；[#83205 Max 配额跨模型异常速耗](https://github.com/anthropics/claude-code/issues/83205)；[#86749 cron 使用过期 CLI 重复重建 760k token 缓存](https://github.com/anthropics/claude-code/issues/86749)（今日新报）。

---

## 4. 重要 PR 进展

今日 PR 活动较平淡（共 6 条），全部梳理如下：

1. [#86746 保留 Python 解释器探测错误](https://github.com/anthropics/claude-code/pull/86746) — 修复 #86709：`sg-python.sh` 此前将探测 stderr 丢弃至 `/dev/null`，候选解释器全部失败时用户只能看到泛化报错。改进诊断体验的实用修复。
2. [#86626 新增 shell 补全（bash/zsh/fish）](https://github.com/anthropics/claude-code/pull/86626) — 社区贡献的补全脚本，兼容 macOS 原生 bash 3.2、无需额外依赖，并保持与已安装 CLI 同步。CLI 易用性的有益补充。
3. [#60280 CI actions SHA 固定 [已关闭]](https://github.com/anthropics/claude-code/pull/60280) — 供应链安全加固的后续批次（#56784 的 follow-up），将 6 个 workflow

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-08-15** | 数据来源：github.com/openai/codex

---

## 📌 今日速览

过去 24 小时最重大的事件是 **Windows/macOS 桌面端 26.810.4967.0 版本爆发大规模性能回退**：多个当日新开的 Issue 报告空闲时 CPU 占用异常、系统级鼠标卡顿乃至频繁崩溃，形成明显的回归问题集群。与此同时，CLI 侧保持极高迭代速度，单日发布 5 个 alpha 版本（0.148.0-alpha.13 ~ alpha.17），合入了统一执行引擎默认启用、Guardian v2 安全分类器可配置、gRPC code-mode 限制移除等大量改动。

---

## 🚀 版本发布

| 版本 | 说明 |
|---|---|
| [rust-v0.148.0-alpha.17](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.17) | 最新 alpha |
| [rust-v0.148.0-alpha.16](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.16) | — |
| [rust-v0.148.0-alpha.15](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.15) | — |
| [rust-v0.148.0-alpha.14](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.14) | — |
| [rust-v0.148.0-alpha.13](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.13) | — |

单日连发 5 个 alpha 版本，官方 Release Notes 未附详细变更说明（需对照 commit log）。这一节奏与当日的 PR 合入密度吻合，表明 0.148.0 正处于快速冲刺阶段。

---

## 🔥 社区热点 Issues（Top 10）

### 1. ⚠️ 版本回退集群：26.810.4967.0 空闲时 CPU 空转（今日新增）
[#38547](https://github.com/openai/codex/issues/38547) | 11 评论 / 5 👍 | Windows
从 `26.803.10989.0` 升级到 `26.810.4967.0` 后，Electron 主进程在**完全空闲状态下持续 CPU 空转**，矛头指向 Chrome 插件 app-server 的哈希循环。同日涌现的 [#38551](https://github.com/openai/codex/issues/38551)、[#38554](https://github.com/openai/codex/issues/38554) 报告了相同根因（退出 Codex 立即恢复），回归起点明确指向 8 月 14 日的这次更新。**当日最紧迫的问题，建议官方尽快回滚或热修。**

### 2. ⚠️ 系统级鼠标卡顿 + 空闲 ~10% CPU（今日新增）
[#38583](https://github.com/openai/codex/issues/38583) | 8 评论 / 6 👍 | Windows 11 / 26.813.12317
更新后引发**全系统范围的鼠标延迟**，影响不止于 Codex 自身。macOS 侧也有对应反馈：[#38611](https://github.com/openai/codex/issues/38611) 报告 Chrome rollout 追踪器在会话 JSONL 超过 V8 最大字符串长度后进入 >160% CPU 的重试死循环——说明该回归**跨平台存在**。

### 3. macOS 端持续崩溃，用户呼吁回滚（今日新增）
[#38637](https://github.com/openai/codex/issues/38637) | 4 评论 | macOS arm64 / 26.810.41047
Pro 20x 订阅用户报告新版"几分钟内就崩溃，长对话几乎无法打开"。与 Windows 回归问题相互印证，26.810 系列桌面端整体质量堪忧。

### 4. 长期顽疾：Windows 11 上频繁冻结/卡顿
[#20214](https://github.com/openai/codex/issues/20214) | 99 评论 / 84 👍 | 自 4 月末至今未解
本日评论数最高的 Issue。Ryzen 5 + 32GB 内存的配置下仍频繁冻结，三个月内积累近百条讨论，是 Windows 桌面端性能问题的"老大哥"。今日的回归集群可能与之叠加发酵。

### 5. 最高赞诉求：允许关闭 60 秒问题自动解决
[#28969](https://github.com/openai/codex/issues/28969) | 76 评论 / **194 👍**
全列表最高赞 Issue。CLI 对提问强制 60 秒超时自动解决，长期任务中被误超时的用户强烈要求增加配置项。呼声极高但未见官方响应，值得关注是否会进入 0.148 系列。

### 6. 自动充值开关被反复自动打开
[#31987](https://github.com/openai/codex/issues/31987) | 19 评论 | codex-web / Desktop
用户每次购买额度后 auto-recharge 都被自动勾选开启，属于**计费信任类问题**，措辞激烈（"honestly a crime"）。此类问题对付费用户留存影响直接。

### 7. Windows 版缺少"控制其他设备"标签页
[#28919](https://github.com/openai/codex/issues/28919) | 33 评论 / 33 👍 | remote
Pro 用户发现 Windows 版 Settings > Connections 中缺少远程控制入口，导致无法控制其他设备的 Codex。远程功能平台不对齐的典型案例。

### 8. Windows 沙箱无法启动 MSIX 版 PowerShell 7
[#35871](https://github.com/openai/codex/issues/35871) | 14 评论 | sandbox / exec
`CreateProcessAsUserW failed: 5`——沙箱受限令牌拒绝启动商店版 pwsh。技术分析扎实，指向 MSIX 打包二进制与受限令牌的根本冲突，对默认使用 Store 版 PowerShell 的 Windows 用户是硬阻断。

### 9. 会话恢复触发 ~71 Mbps 上行突发
[#33796](https://github.com/openai/codex/issues/33796) | 8 评论 | connectivity
多个 1–2 GB 的 rollout 会话在恢复时集中上传，可能打满家庭上行带宽。随着会话体量增长，客户端的数据同步策略需要限速/增量机制。

### 10. VS Code 多窗口打开同一会话导致所有权静默转移（今日新增）
[#38629](https://github.com/openai/codex/issues/38629) | 3 评论 | extension / app-server
在另一个 VS Code 窗口打开活跃对话会**静默转移会话所有权**并允许并发执行 turn，可能引发状态竞争。架构层面的新问题，值得扩展开发者关注。

---

## 🔧 重要 PR 进展（Top 10）

> 今日 PR 几乎全部由 `copyberry[bot]` 自动化提交并快速合入，覆盖 CLI/TUI、gRPC、Guardian、MCP 多条线。

1. **[Windows 默认启用统一执行引擎](https://github.com/openai/codex/pull/38625)**（#38625，已合入）
   `unified_exec` 在全平台默认开启，Windows 上暴露 `exec_command` / `write_std

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-08-15** | 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 一、今日速览

过去 24 小时，Gemini CLI 发布了 nightly 版本 **v0.56.0**，核心改进聚焦于容量错误（capacity errors）的静默重试机制。社区方面，**子代理（Subagent）稳定性问题持续发酵**——挂起、状态误报、权限绕过等 P1 级 Issue 讨论热烈；同时多个**安全相关 PR 活跃推进**，包括修复 simple-git 严重 CVE 和防范 eval 工作流供应链 RCE 攻击。

---

## 二、版本发布

### [v0.56.0-nightly.20260814.gc0d192452](https://github.com/google-gemini/gemini-cli/releases)
- **test(e2e)**：稳定慢速 runner 上的 file-system-interactive 测试（[PR #28793](https://github.com/google-gemini/gemini-cli/pull/28793)）
- **fix(core)**：为容量错误实现上下文感知的静默重试与可用性 TTL 机制（[PR #28761](https://github.com/google-gemini/gemini-cli/pull/28761)），可减少服务端限流/过载时的用户可见失败

---

## 三、社区热点 Issues

**1. [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — 子代理达到 MAX_TURNS 后误报为 GOAL 成功**（P1 | 💬 12）
`codebase_investigator` 子代理触发最大轮次限制后仍报告 `status: "success"`，掩盖了实际中断。状态误报会直接误导上层决策，是 Agent 可观测性的核心缺陷。

**2. [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist 代理无限挂起**（P1 | 💬 8 | 👍 8）
委托给 generalist agent 后永久挂起，连创建文件夹这类简单操作也会卡死，用户需等待一小时以上手动取消。高点赞数表明影响面广。

**3. [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖 OS 沙箱与执行后意图路由**（P2 | 💬 8）
社区提案：利用 Gemini 3 原生 bash 能力（grep/sed/awk 链式调用），配合 OS 级沙箱在安全与体验间取得平衡。方向性架构讨论，关注度高。

**4. [#24353](https://github.com/google-gemini/gemini-cli/issues/24353) — 组件级评估体系（EPIC）**（P1 | 💬 7）
行为评估测试的后续规划，目前已生成 76 个行为评估用例并覆盖 6 个 Gemini 模型，是官方质量基础设施的重点工程。

**5. [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — AST 感知的文件读取/搜索/代码库映射评估**（P2 | 💬 7）
探索 AST 感知工具能否减少读偏移、降低 token 噪音、提升代码导航精度，潜在改进 `codebase_investigator`。

**6. [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini 主动调用 skills 和子代理的频率过低**（P2 | 💬 6）
用户反馈模型几乎从不自主使用自定义 skills/subagents，即使任务高度相关。反映路由/调度策略的实际痛点。

**7. [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 命令执行完毕后卡在 "Waiting input"**（P1 | 💬 4 | 👍 3）
简单命令执行完成后 CLI 仍显示 "Awaiting user input" 并挂起，长会话中的高频体验问题。

**8. [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Auto Memory 确定性脱敏与日志削减**（P2 | 🔒 安全 | 💬 4）
Auto Memory 将本地转录内容发送给后台提取模型时，脱敏发生在内容**已进入模型上下文之后**，存在 secrets 暴露风险。安全敏感，值得关注。

**9. [#22093](https://github.com/google-gemini/gemini-cli/issues/22093) — v0.33.0 起子代理绕过权限配置运行**（P2 | 💬 3）
用户明确禁用 agents 后子代理仍被自动启用，涉及权限边界与用户控制权。

**10. [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) — get-shit-done 输出 hook 导致崩溃**（P1 | 💬 3）
输出 summary 阶段触发崩溃，属于稳定性 P1 问题，尚待复现信息补充。

---

## 四、重要 PR 进展

**1. [#28778](https://github.com/google-gemini/gemini-cli/pull/28778) — 升级 simple-git 至 3.32.3 修复 CRITICAL 级 CVE-2026-28292** 🔒
依赖漏洞修复，trivy 扫描发现，严重级别 CRITICAL。

**2. [#28740](https://github.com/google-gemini/gemini-cli/pull/28740) — 防范 eval-pr 工作流供应链 RCE** 🔒
修复不可信 fork 代码可能在特权 `pull_request_target` 上下文执行的问题（Issue #28336），将 eval 工作流拆分为安全构建步骤与可信执行步骤。

**3. [#28738](https://github.com/google-gemini/gemini-cli/pull/28738) — 支持代理调用代理（嵌套子代理）**
允许子代理通过 `tools:` frontmatter 委托其他子代理甚至递归调用自身，直接回应社区对 Agent 组合能力的诉求。

**4. [#28603](https://github.com/google-gemini/gemini-cli/pull/28603)（已关闭）— 沙箱 Dockerfile 升级至 Node 22** 🔒 P1
Node 20 已于 2026-04-30 EOL，沙箱内运行模型指令的 EOL 运行时存在暴露风险。

**5. [#28597](https://github.com/google-gemini/gemini-cli/pull/28597)（已关闭）— 修复环境变量加载顺序竞态**
解决 settings 占位符在 `.env` 加载前就被展开的时序问题，影响配置生命周期正确性。

**6. [#25378](https://github.com/google-gemini/gemini-cli/pull/25378) — 修复 Windows ripgrep `spawn EFTYPE` 错误** P1
解决 Windows 上 `grep_search` 因二进制架构不匹配导致的失败，Windows 平台关键修复。

**7. [#27588](https://github.com/google-gemini/gemini-cli/pull/27588) — 支持 WSL2 剪贴板图片粘贴**
通过 PowerShell interop 读取 Windows 剪贴板并保存为 PNG，补齐 WSL 用户体验。

**8. [#28596](https://github.com/google-gemini/gemini-cli/pull/28596)（已关闭）— 新增 `--list-all-sessions` 选项**
支持跨 workspace 查看和管理所有会话，解决多项目用户"忘记会话在哪个目录"的痛点。

**9. [#28718](https://github.com/google-gemini/gemini-cli/pull/28718) — 流中断时记录已接收的 usage 数据**
修复 `generateContentStream` 中途失败导致 usageMetadata 丢失的问题，改进计量准确性。

**10. [#20916](https://github.com/google-gemini/gemini-cli/pull/20916)（已关闭）— 修复 PTY 文件描述符泄漏** P1
长会话导致 PTY 耗尽（macOS 上限 511）的系统级问题，社区贡献者完成的深度诊断与修复。

---

## 五、功能需求趋势

从本期 Issue 全景看，社区关注呈以下五大方向：

| 趋势方向 | 代表 Issue | 信号强度 |
|---|---|---|
| **子代理架构可靠性** | #22323（状态误报）、#21409（挂起）、#28738（嵌套调用） | ⭐⭐⭐⭐⭐ 绝对主导 |
| **安全加固** | #26525（脱敏）、#19873（OS 沙箱）、#22672（破坏性操作防护）、#28740/#28778（供应链） | ⭐⭐⭐⭐ 官方+社区双轮驱动 |
| **Auto Memory 体系化** | #26522（低信号重试）、#26523（无效 patch 处理）、#26516（质量跟踪） | ⭐⭐⭐ 密集的系列跟踪 Issue |
| **代码理解深度（AST）** | #22745（AST 感知工具）、#22746（CLI 工具选型 tilth/glyph） | ⭐⭐⭐ 探索评估阶段 |
| **跨平台体验（Windows/WSL/Wayland）** | #25378、#27588、#21983 | ⭐⭐⭐ 社区贡献活跃 |

---

## 六、开发者关注点

综合 Issue 讨论与 PR 反馈，当前核心痛点包括：

1. **Agent 挂起与"假死"状态**：generalist 挂起（#21409）、shell 卡 "Waiting input"（#25166）、vite 交互式提示卡死（#22465）——多个 P1 问题共同指向终端/进程生命周期管理的系统性短板。
2. **失败被静默掩盖**：MAX_TURNS 误报成功（#22323）、Auto Memory 静默跳过无效 patch（#26523）、bugreport 缺少子代理上下文（#21763），可观测性不足加剧排障难度。
3. **安全边界模糊**：subagents 绕过禁用配置（#22093）、内存提取时 secrets 后置脱敏（#26525）、破坏性 git 操作缺乏防护（#22672），权限与隔离机制亟需收紧。
4. **调度智能不足**：模型不主动使用 skills/subagents（#21968）、工具数量超限报 400（#24246）、临时脚本污染工作区（#23571）。
5. **资源泄漏**：PTY 文件描述符/内存泄漏（#20916、#27154）影响长会话稳定性，相关修复 PR 近期密集推进。

---

*本报告基于 GitHub 公开数据自动生成，评论数与状态截至 2026-08-14。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-08-15 | 数据来源：github.com/github/copilot-cli**

---

## 一、今日速览

过去 24 小时 GitHub Copilot CLI 发布了 v1.0.80 及当日热修复版 v1.0.80-1，更新焦点为模型配置，但新版随即暴露出 MCP OAuth 回归问题。社区围绕 **RFC 8414 OAuth 校验导致 Atlassian/GitLab MCP 无法连接**、**Claude 等模型"已启用却不可用"** 两大问题簇集中反馈，29 条 Issue 更新中新帖明显偏向 1.0.80 回归报告。

---

## 二、版本发布

| 版本 | 日期 | 说明 |
|------|------|------|
| [v1.0.80](https://github.com/github/copilot-cli/releases) | 2026-08-14 | Update model configurations |
| [v1.0.80-1](https://github.com/github/copilot-cli/releases) | 2026-08-14 | Fixes and changes |

**解读**：发布当日即跟进补丁版，节奏异常，结合社区反馈（#4490、#4493 均报告 1.0.80 新增回归），推测 v1.0.80 的模型配置变更引入了问题，1.0.80-1 为紧急修复。

---

## 三、社区热点 Issues（Top 10）

**1. [#4480](https://github.com/github/copilot-cli/issues/4480) [已关闭] Atlassian MCP OAuth 失败——1.0.71 起的回归**
6👍 / 4 评论。1.0.79 连接 Atlassian 远程 MCP 时因 RFC 8414 §3.3 issuer 不匹配被拒。该 Issue 已关闭（疑似已修复），但见下条，问题在 1.0.80 中仍被报告，修复完整性存疑。

**2. [#4490](https://github.com/github/copilot-cli/issues/4490) [OPEN] Atlassian MCP OAuth 在 1.0.80 中依然失败**
发布当天新报，明确指出 1.0.78 正常、1.0.80 失败。与 #4480、#4439 构成同一问题簇，是当前 MCP 生态用户最痛的阻断性问题。

**3. [#4439](https://github.com/github/copilot-cli/issues/4439) [OPEN] GitLab 自管 MCP OAuth 元数据被 RFC 8414 校验拒绝**
GitLab Self-Managed + OAuth 2.0 动态客户端注册场景全量受阻。三条 Issue 合看，CLI 的 issuer 严格校验与主流 MCP 服务商的实际部署不兼容。

**4. [#4390](https://github.com/github/copilot-cli/issues/4390) [OPEN] 组织已启用模型在目录中缺失（Claude Sonnet 5/Opus 5、Kimi K3）**
4👍。Copilot Business 组织显式启用的模型在 CLI 实际目录中不可见，涉及 Anthropic 全系与 Kimi K3，企业用户影响面大。

**5. [#4422](https://github.com/github/copilot-cli/issues/4422) [OPEN] Enterprise 账户下所有 Claude 模型被禁用**
3👍。设置页面显示已启用但 CLI 报"This model is disabled"，且回滚 CLI 版本无效——指向服务端/目录同步问题而非客户端。

**6. [#4345](https://github.com/github/copilot-cli/issues/4345) [OPEN] claude-haiku-4.5 不支持 reasoning effort 'medium'**
4👍 / 6 评论。两个服务端 feature flag 同时生效时，子代理执行反复报错。暴露出服务端灰度配置组合缺乏兼容性验证，模型配置相关问题的高热度代表。

**7. [#4491](https://github.com/github/copilot-cli/issues/4491) [OPEN] /spawn 命令模板自相矛盾，可能向无关会话注入上下文**
值得安全团队关注：模板语义冲突的"解释方向"是破坏性的——可将"创建子会话"静默变成"向不相关的运行中会话写入"，且缺少跨会话写入的审批门。

**8. [#4493](https://github.com/github/copilot-cli/issues/4493) [OPEN] 1.0.80 中 /restart 与 -w 启动的会话冲突**
`copilot -w` 创建的会话执行 /restart 时因 worktree 选项与会话 ID 冲突无法恢复，1.0.80 原生回归。

**9. [#4477](https://github.com/github/copilot-cli/issues/4477) [OPEN] 停止操作导致整个会话与 Prompt 丢失**
点击停止按钮即删除会话（含未保存的编辑），多次复现。数据丢失类问题对用户信任伤害最大。

**10. [#4486](https://github.com/github/copilot-cli/issues/4486) [OPEN] 编辑权限请求"超时"**
多会话并行、隔夜挂起的用户频繁遭遇权限弹窗超时，属高频工作流摩擦点，新版引入。

> **其他值得关注**：[#4494](https://github.com/github/copilot-cli/issues/4494)（新启用模型需手动清缓存才可见，与 #4390/#4422 同根因）；[#4346](https://github.com/github/copilot-cli/issues/4346) 已关闭（Actions 中 GITHUB_TOKEN 拉取 MCP 注册策略 403，CI 场景阻断，疑似已修复）；[#2934](https://github.com/github/copilot-cli/issues/2934) 已关闭（protobuf OTLP 导出支持，可观测性用户期待已久）。

---

## 四、重要 PR 进展

> 注：过去 24 小时仅 3 条 PR 更新，均围绕 CI/自动化基础设施，无产品功能 PR，全部列出如下。

**1. [#4497](https://github.com/github/copilot-cli/pull/4497) [OPEN] invalid-label writer 支持 fork PR 关联**
当 GitHub 未回填 workflow run 的 PR 关联时，通过可信的 workflow-run 元数据检索并要求唯一匹配的开放 PR，补齐 fork 场景自动化。

**

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期**：2026-08-15 ｜ **数据来源**：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)（过去 24 小时）

---

## 一、今日速览

过去 24 小时无新版本发布、无 PR 更新，仓库活动完全集中在 Issues 讨论侧。**记忆系统（Memory System）是当前社区的绝对焦点**：#1283 已累积 39 条评论且昨日仍有新增讨论，与 #1478 的中文用户反馈互相印证，"跨会话持久化上下文"成为最强烈的功能诉求。此外，Windows PowerShell 版本感知增强的 Issue #1136 于昨日关闭，值得跟踪其落地情况。

---

## 二、社区热点 Issues

> 本期共 4 条 Issue 有更新，全部列出（不足 10 条）。

**1. #1283 Memory System - Persistent context across sessions** 🔥
- 状态：OPEN ｜ 39 条评论 ｜ 2026-02-27 创建，持续活跃近 6 个月
- **为什么重要**：请求实现完整的记忆系统，包含**自动记忆**（AI 管理的笔记，沉淀项目模式与用户偏好）和**手动记忆**（用户自定义指令），实现跨会话上下文持久化。这是本周期内评论数最高的 Issue，长期霸榜说明痛点具有普遍性。
- **社区反应**：39 条评论、讨论持续半年仍不断有新声音加入，是社区最期待的功能方向。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1283

**2. #2269 Remote Control / Multi-Device Session Handoff**
- 状态：OPEN ｜ 6 条评论 ｜ 1 👍 ｜ 2026-05-13 创建
- **为什么重要**：请求支持在一台设备启动会话后，从另一台设备（笔记本 / Web / 移动端）**无缝接管或远程控制**，面向跨多环境工作的用户，指向云端会话同步能力。
- **社区反应**：讨论量中等，但需求场景明确，属于差异化工作流诉求。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2269

**3. #1478 记忆层优化请求（中英双语）**
- 状态：OPEN ｜ 2 条评论 ｜ 2026-03-17 创建
- **为什么重要**：中文用户直指两大痛点——**大项目中记忆层体验差**、**参考文档中几乎找不到记忆相关说明**（仅见 agent.md）。作者还给出了参考实现：`SOUL.md` / `USER.md` / `MEMORY.md` + 按日归档的 `memory/` 目录这一文件式记忆结构，具备可操作性。
- **社区反应**：评论不多，但与 #1283 高度互补，说明记忆需求跨越中英文用户群体。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1478

**4. #1136 Shell 工具版本感知的 PowerShell 上下文（已关闭）**
- 状态：CLOSED ｜ 2026-02-13 创建，2026-08-14 关闭
- **为什么重要**：基于 **Kimi K2.5（SGLang）** 的大规模测试，指出当前 Shell 工具在 Windows 上存在三类关键问题，显著拖累 Agent 首轮（pass-1）命令生成质量，建议 Shell 工具感知 PowerShell 版本上下文。
- **社区反应**：关闭原因未在摘要中说明，建议关注是否已随某版本实现或转入其他渠道跟进。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1136

---

## 三、重要 PR 进展

过去 24 小时**无 PR 更新**。结合同期无新 Release，仓库代码层面处于静默期，活动全部集中在需求讨论侧。一个可跟踪的线索：#1136 于昨日关闭，但数据中未见关联 PR，其实际落地路径（直接合入 / 另开 PR / 关闭不采纳）有待后续确认。

---

## 四、功能需求趋势

从本期更新的 Issues 中可提炼出以下方向（按热度排序）：

1. **记忆与持久化上下文**（最强烈）：#1283（39 评论）+ #1478 双 issue 印证，覆盖自动/手动记忆、项目模式沉淀、大项目上下文保持，是社区当前最集中的诉求。
2. **跨设备 / 远程会话**：#2269 的 Session Handoff，指向 "CLI ↔ Web ↔ 移动端" 的连续工作流，隐含对云端会话同步与远程控制能力的需求。
3. **Windows / PowerShell 兼容性**：#1136 反映 Windows 仍非"一等公民"，Shell 工具需感知 PowerShell 版本差异以提升命令生成质量。
4. **文档完善**：#1478 指出记忆相关能力几乎无参考文档（仅 agent.md），文档缺口是记忆功能的配套短板。

---

## 五、开发者关注点（痛点总结）

- **跨会话上下文丢失**：每次新会话需重复交代项目背景与偏好，重复成本高（#1283、#1478）。
- **大项目体验不佳**：记忆层薄弱导致长周期、大代码量项目中"很痛苦"，这是中文用户的直接表述（#1478）。
- **文档缺口**：记忆、配置等能力缺乏系统性的参考文档，用户只能自行摸索或借鉴其他工具的文件结构（#1478）。
- **多设备工作流割裂**：会话无法在设备间迁移或远程接管，跨环境开发者效率受损（#2269）。
- **Windows 首轮命令生成质量**：PowerShell 版本语义模糊导致 pass-1 命令生成退化（#1136）。

---

**数据说明**：统计窗口为截至 2026-08-15 的过去 24 小时。本期仅 4 条 Issue 有更新、0 条 PR 更新、无新 Release，故热点 Issue 如实列全 4 条、PR 部分标注为空，未做数据外推。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>



</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-08-15** | 数据来源：github.com/QwenLM/qwen-code

---

## 一、今日速览

**v0.21.12 正式版发布**，核心更新为 Web Shell 工作区文件上传（拖拽 + @ 面板，带进度跟踪）与 autofix review 的 diff 增长刹车机制。社区最热议题是 0.21.2 引入的**图片加载即崩溃回归**（[#8957](https://github.com/QwenLM/qwen-code/issues/8957)，12 条评论居首）。此外，贡献者 @wenshao 单日提交了约 8 个 review/autofix 自动化改进 PR，围绕"增量、可恢复、可收敛"形成一条完整的工程线。

---

## 二、版本发布

- **v0.21.12（正式版）**：Web

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*