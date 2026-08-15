# OpenClaw 生态日报 2026-08-16

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-08-15 20:36 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报

**报告日期：2026-08-16** | 数据来源：[openclaw/openclaw](https://github.com/openclaw/openclaw) 过去 24 小时 GitHub 活动

---

## 一、今日速览

OpenClaw 今日处于**高强度活跃但积压承压**状态：24 小时内 Issues 更新达 500 条（新开/活跃 487 条，仅关闭 13 条），PR 更新 500 条（待合并 451 条，合并/关闭 49 条）。项目发布了 **v2026.8.1-beta.2**，核心是密钥出网绑定（Secret egress host binding）安全加固与 GPT-5.6 Ultra 运行时切换支持。社区讨论焦点集中在资源泄漏（P0 内存泄漏 + 实时语音状态无界增长）、压缩（compaction）链路可靠性与 prompt cache 命中率退化三大集群问题上。整体判断：功能迭代速度健康（单日新增 10+ 个 P1 级修复 PR），但 **Issue 关闭率仅约 2.6%，大量高等级问题带有 `clawsweeper-recovery-stuck` 标签**，维护者评审带宽（13 个 PR 处于 "ready for maintainer look"）成为明显瓶颈。

---

## 二、版本发布

### v2026.8.1-beta.2 — [OpenClaw 2026.8.1-beta.2](https://github.com/openclaw/openclaw/releases)

**核心更新：**

1. **Secret egress host binding（安全加固，破坏性变更）**
   - 每个 shared-store 密钥现在必须绑定到**精确的 HTTPS 目标主机**，覆盖 CLI、Gateway RPC 和 Control UI 三个入口
   - 未绑定主机的 sentinel 替换将**fail-closed**——在明文出网前直接失败，而不是放行
   - 贡献者：@shakkernerd

2. **GPT-5.6 Ultra 与运行时切换**（Release Notes 在数据截断处，完整内容待官方文档确认）

**迁移注意事项：**
- ⚠️ 该变更属于**收紧式破坏性变更**：升级到本 beta 后，所有依赖"密钥可出网到任意主机"旧行为的共享密钥将**直接失败**。生产环境升级前需为存量 shared-store 密钥补充主机绑定配置，建议先在测试网关验证 sentinel 替换链路。

---

## 三、项目进展

过去 24 小时共 **49 个 PR 合并/关闭**，另有大量新 PR 进入评审队列。代表性进展：

**✅ 已完成（关闭）——安装策略安全审查闭环：**
- [#116489](https://github.com/openclaw/openclaw/pull/116489) `feat(security): require acknowledgement for install policy warnings`（XL, P2）— `security.installPolicy` 命令可返回 `warn`，交互式 CLI 安装需操作员确认可疑插件/技能
- [#120900](https://github.com/openclaw/openclaw/pull/120900) `feat(ui): review install policy warnings`（XL, P2，附视频验证）— Control UI 侧对应实现，管理员可在 UI 中审查并显式放行带警告的安装（`acknowledgeInstallPolicyWarning: true`）
- 两个 PR 合计构成**插件安装安全审查的完整 CLI + UI 工作流**，与 beta 版本的 secret egress 绑定共同表明：安全边界治理是本周期主线。

**🔧 关键修复推进（新提交/更新中）：**
- [#124275](https://github.com/openclaw/openclaw/pull/124275) `fix(anthropic): partial agent exec block drops restrictive global security`（P1，security-boundary）— 修复配置了严格全局 exec 策略的 operator，其 Claude CLI agent 只要带任何 per-agent exec 设置就会**绕过权限限制**的漏洞 👀 已可评审
- [#124162](https://github.com/openclaw/openclaw/pull/124162) Discord 断线 watchdog（P1）— 修复事件循环卡顿导致重连定时器不触发、网关永久失聪的问题
- [#123877](https://github.com/openclaw/openclaw/pull/123877) `fix: honor provider timeouts during stuck-session recovery`（XL, P1，关闭 [#121018](https://github.com/openclaw/openclaw/issues/121018)）— 自托管慢速 provider 用户的卡死会话恢复误杀问题 👀
- [#117258](https://github.com/openclaw/openclaw/pull/117258) `fix(auth): prevent sticky unreadable state`（XL, P1，修复 [#117209](https://github.com/openclaw/openclaw/issues/117209)）— WeCom 用户重启前丧失全部模型访问的问题 👀
- [#124267](https://github.com/openclaw/openclaw/pull/124267) `fix(compaction): anchor pressure to provider usage`（P2）— 将压缩压力锚定到 provider 真实上下文用量，直指压缩集群问题
- [#124191](https://github.com/openclaw/openclaw/pull/124191) `fix: claude-cli prompt cache stops hitting after first follow-up`（P1）— 稳定可缓存前缀、将变化内容移至 user turn

**📐 架构级投入（XL 规模，维护者主导）：**
- [#119804](https://github.com/openclaw/openclaw/pull/119804) `feat(ai): add provider transport accounting contract` + [#119833](https://github.com/openclaw/openclaw/pull/119833) `fix(ai): harden Anthropic transport accounting` — 建立 provider 中立的传输层记账契约，为多 provider 可观测性打地基

**小结：** 单日 49 个 PR 合并/关闭、13+ 个新 P1/P2 修复 PR 提交，安全、压缩、provider 兼容三条线并行推进，节奏在同类开源项目中属第一梯队；但 451 个待合并 PR 的存量意味着集成验证压力持续累积。

---

## 四、社区热点

按评论数排序的今日最热讨论：

| # | Issue | 热度 | 核心诉求 |
|---|-------|------|---------|
| 1 | [#116201](https://github.com/openclaw/openclaw/issues/116201) 实时语音会话无界保留 provider/consult 状态 | **65 评论** | 语音场景下被取代的咨询工作、大帧音频、pre-ready 缓冲在慢速/突发流量下不被释放；用户要求把"条数限制/取消信号"升级为**硬性所有权边界** |
| 2 | [#91588](https://github.com/openclaw/openclaw/issues/91588) Gateway 内存泄漏 RSS 350MB→15.5GB，OOM 循环 | 24 评论（**P0**） | 7×24 生产部署的核心诉求；已持续 2 个月，仍挂 `needs-live-repro` |
| 3 | [#121953](https://github.com/openclaw/openclaw/issues/121953) Cron 消息 `[cron:...]` 前缀被 DeepSeek 降优先级致卡顿 | 19 评论 | DeepSeek 用户暴露了 OpenClaw 注入前缀与 provider 边缘节点路由策略的冲突；已有 linked PR |
| 4 | [#68596](https://github.com/openclaw/openclaw/issues/68596) 可配置流式 watchdog 超时 | 16 评论 / **8 👍（今日最高）** | 长思考模型（kimi-k2.5、DeepSeek-R1）被 30s watchdog 误判中断——**社区呼声最集中的功能请求** |
| 5 | [#62505](https://github.com/openclaw/openclaw/issues/62505) Coding Agent 完全不干活（2026.4.2 后回归） | 15 评论 | 核心工作流（编码代理）从可用变不可用的回归，4 月至今无 fix PR |
| 6 | [#115908](https://github.com/openclaw/openclaw/issues/115908) 会话转录投影重建 livelock 阻塞主线程 | 14 评论 | 同步重建路径占满事件循环，所有 channel 传输停摆数十秒 |
| 7 | [#38327](https://github.com/openclaw/openclaw/issues/38327) google-vertex/gemini-3.1 报 "Cannot convert undefined or null" | 13 评论（回归） | Vertex 用户升级即坏，3 月至今 |
| 8 | [#39476](https://github.com/openclaw/openclaw/issues/39476) A2A `sessions_send` 回调造成消息重复 | 13 评论 | 多智能体互操作场景的幂等性缺陷 |

**诉求画像：** 热点议题高度集中于 **"7×24 长时运行下的状态管理可靠性"**（内存、会话状态、压缩、传输）——用户群显然把 OpenClaw 当作常驻基础设施而非玩具项目在用。

---

## 五、Bug 与稳定性

按严重程度排列（fix PR 状态依据 `clawsweeper:linked-pr-open` / `no-new-fix-pr` 标签判定）：

### 🔴 P0
- **[#91588](https://github.com/openclaw/openclaw/issues/915

---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报

**项目**：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) ｜ **日期**：2026-08-16（覆盖过去 24 小时）

---

## 1. 今日速览

项目处于**高强度维护期**：过去 24 小时 Issues 与 PR 更新各达 500 条，其中 234 条 Issue 被关闭（关闭率约 47%），维护团队清障效率显著。PR 侧有 31 条合并/关闭，呈现鲜明的 **"salvage（抢救式合并）"文化**——维护者 @teknium1 当日将多个滞留的社区 PR 重植到最新 main 分支落地（#87237、#87241、#87245）。**无新版本发布**，但 main 分支推进迅速，修复密度高。热点集中在两条主线：**Windows 更新管道连环故障**与**会话状态/上下文压缩（compression）稳定性**，后者今日集中关闭了至少 5 个 P1。整体健康度：活跃度优秀，P1 响应迅速，但 Windows 与安装更新路径的存量问题仍偏重。

---

## 2. 版本发布

近 24 小时**无新版本发布**。最新修复（含 Windows P1 #87241）仍在 main 分支，预计进入下个版本窗口。

---

## 3. 项目进展

### 3.1 已落地的重要 PR（合并/关闭）

| PR | 内容 | 意义 |
|---|---|---|
| [#87241](https://github.com/NousResearch/hermes-agent/pull/87241) ⭐ | **P1**：修复 Windows `hermes update` 因 Bitwarden `cryptography` 自锁导致更新永远无法完成（salvage 自 #77517） | Windows 更新管道关键止血 |
| [#87237](https://github.com/NousResearch/hermes-agent/pull/87237) | 会话切换时保留回合耗时计时器（salvage 自 #61518），网关新增 `turn_started_at` 上报 | 补齐原 #61518 的网关侧缺口 |
| [#87245](https://github.com/NousResearch/hermes-agent/pull/87245) | 桌面转录每回合显示耗时徽章 "⏱ 38s"（salvage 自 #84430） | 桌面 UX 增强 |
| [#87150](https://github.com/NousResearch/hermes-agent/pull/87150) | **P2**：修复桌面端"编辑重发"在后端重启后截断错误回合、静默丢失大量模型上下文——改为 fail-closed 并保留持久化行 ID | 会话数据安全修复 |
| [#61518](https://github.com/NousResearch/hermes-agent/pull/61518) / [#84430](https://github.com/NousResearch/hermes-agent/pull/84430) | 原始社区 PR 关闭（由 salvage 版接续） | 体现贡献回收机制 |

### 3.2 今日新开的高质量 PR（待评审）

- [#87240](https://github.com/NousResearch/hermes-agent/pull/87240)（**P2**）：多路复用网关下 Telegram 多 bot 配置隔离——修复次要 bot 回复丢失、会话串到默认 profile 的问题
- [#87252](https://github.com/NousResearch/hermes-agent/pull/87252)：**安全加固**——MCP catalog bootstrap 从 `shell=True` 迁移到原生 argv 执行，消除命令注入面
- [#87246](https://github.com/NousResearch/hermes-agent/pull/87246)（**P2**）：启动时先解析 model routes 再应用 provider 默认值，修复显式指定模型仍被附加默认 provider
- [#87243](https://github.com/NousResearch/hermes-agent/pull/87243)：Windows 上通过活跃 SSH 传输自动转发远程 loopback 预览（受限 Electron 分区渲染）
- [#87244](https://github.com/NousResearch/hermes-agent/pull/87244)、[#87242](https://github.com/NousResearch/hermes-agent/pull/87242)、[#87247](https://github.com/NousResearch/hermes-agent/pull/87247)：Kanban 移动端适配、shell hooks 静默失效告警、官方 skills 种子精简

> ⚠️ 评审提示：[#86355](https://github.com/NousResearch/hermes-agent/pull/86355)（Matrix 项目路由）PR 描述中包含硬编码的个人绝对路径（`/home/rle/projects/...`）作为 registry 示例，建议维护者确认实现是否可配置化。

**整体判断**：单日 31 个 PR 合并/关闭 + 10 余个新 PR，配合 234 个 Issue 关闭（含 8 个 P1），项目主干处于**快速收敛期**，桌面端体验与 Windows 稳定性是当前投入重心。

---

## 4. 社区热点

| 议题 | 热度 | 状态 | 核心诉求 |
|---|---|---|---|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) Skills 索引过期（29.8h > 26h 限制） | 36 评论 | OPEN | 自动化 watchdog 持续报警，暴露 `skills-index.yml` cron 重建链路不可靠，影响 /docs/skills 站点 |
| [#34352](https://github.com/NousResearch/hermes-agent/issues/34352) 多租户 Hermes 架构 | 32 评论 / 3👍

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*