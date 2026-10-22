# OpenClaw 生态日报 2026-10-23

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-22 23:21 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-10-23

## 1. 今日速览

OpenClaw 今日保持极高活跃度：24 小时内 Issues 更新 500 条（新开/活跃 80，关闭 420），PR 更新 500 条（待合并 210，合并/关闭 290），并发布了新版本 **v2026.10.6**。Issue 关闭量远超新开量（420:80），显示维护团队正在进行大规模清理与收尾工作。PR 方面，核心维护者 @steipete 今日集中提交了十余个 Control UI 启动性能优化与架构重构 PR，是当日最显著的工程主线。安全仍是社区最活跃的话题域，记忆投毒、API 密钥保护等安全类 Issue 持续获得高讨论量。整体健康度：高活跃、高吞吐、收敛趋势明显。

## 2. 版本发布

### v2026.10.6（2026-10-23）

- **⚠️ 破坏性变更 / 强制迁移**：OpenClaw 现在要求 **Node 24.22.1+**（24 线）或 **Node 26.12.1+**（26 线）。这两个版本包含了 2026 年 10 月 Node.js 安全公告中针对**被泄露证书私钥签发的 TLS 证书链的拒绝修复**。
- **迁移注意事项**：
  - 非 Docker 用户（CLI/裸机 gateway 部署）必须手动升级 Node 运行时，否则将无法通过版本校验；
  - 官方 Docker 镜像已内置受补丁的 Node 24.2x，Docker 用户无感升级；
  - 使用自签名或企业 TLS 中间人代理的用户需确认证书链不再使用被撤销的密钥，否则连接将被拒绝。

## 3. 项目进展

今日合并/关闭 290 个 PR，重点方向：

**Control UI 启动性能专项（@steipete 主导，今日爆发式提交）**
- [#181052](https://github.com/openclaw/openclaw/pull/181052)：聊天启动时不再预加载工具详细渲染代码，减少 11,960 gzip 字节
- [#181059](https://github.com/openclaw/openclaw/pull/181059)：Online 侧边栏渲染延迟至首次打开，减少 1,640 字节
- [#181068](https://github.com/openclaw/openclaw/pull/181068)：emoji 目录延迟至编辑器/表情反应时加载，Chat 启动减少 16,503 gzip 字节
- [#181062](https://github.com/openclaw/openclaw/pull/181062)：图片与浏览器操作代码延迟加载，减少 9,324 字节
- [#181031](https://github.com/openclaw/openclaw/pull/181031)：可选英文文案与高亮语法定义延迟加载
- 配套工具改进 [#181065](https://github.com/openclaw/openclaw/pull/181065)：基线对比报告新增启动 JS 字节增量，防止性能回退

这一系列 PR 合计可减少约 **40KB+** 的首屏加载，是本版本周期内最系统的性能攻坚。

**核心架构重构（同一作者）**
- [#181054](https://github.com/openclaw/openclaw/pull/181054)：合并运行时准备的所有者，消除 22 项单用途事实传递与重复的 MCP 能力探测
- [#181055](https://github.com/openclaw/openclaw/pull/181055)（已关闭）：单消费者 surface 准备逻辑本地化，横跨 Discord/iMessage/Nextcloud Talk 等 channel
- [#181066](https://github.com/openclaw/openclaw/pull/181066)、[#181044](https://github.com/openclaw/openclaw/pull/181044)（已关闭）：配置选择与 schema/文件系统工具收敛

**功能与修复**
- [#180988](https://github.com/openclaw/openclaw/pull/180988)：修复 2026.9.34 版本验证漂移，恢复 13 个 postbuild 阶段的 Docker 前版本兼容性
- [#181019](https://github.com/openclaw/openclaw/pull/181019)（已关闭）：修复 `sessions_spawn` 在必要 worker placement 启动期间失败的问题
- [#180639](https://github.com/openclaw/openclaw/pull/180639)：Doctor 拒绝旧版 cron 导入中的非法 UTF-8 字节（防数据损坏）
- [#180788](https://github.com/openclaw/openclaw/pull/180788)：新增 Requesty 作为内置模型 provider（第 4 次尝试，XL 规模）

**总体评估**：项目以“UI 性能 + 内部架构收敛”为主线快速推进，420 个 Issue 关闭表明 issue 清单正在系统性消化，节奏健康。

## 4. 社区热点

| Issue | 评论 | 主题 | 状态 |
|---|---|---|---|
| [#7707](https://github.com/openclaw/openclaw/issues/7707) | 38 | 按来源的**记忆信任分级**（防记忆投毒） | 已关闭 |
| [#11829](https://github.com/openclaw/openclaw/issues/11829) | 21 | **API 密钥防泄漏安全路线图** | 已关闭 |
| [#22438](https://github.com/openclaw/openclaw/issues/22438) | 20 | Bootstrap 文件**分层加载**节省 token | 已关闭 |
| [#68596](https://github.com/openclaw/openclaw/issues/68596) | 18 👍8 | 流式 watchdog 超时可配置（长推理模型） | 已关闭 |
| [#13583](https://github.com/openclaw/openclaw/issues/13583) | 17 | **响应前强制钩子（硬门禁）** | 已关闭 |
| [#53763](https://github.com/openclaw/openclaw/issues/53763) | 17 | 内置 headless 浏览器 | 已关闭 |

**诉求分析**：
1. **安全是第一关切**：Top 6 中 3 个与安全相关——用户深刻担忧 agent 记忆被网页/第三方 skill 中的恶意指令投毒，以及 provider API key 被序列化进 prompt 泄漏。这些高讨论安全 Issue 今日被批量关闭，或预示安全专项已在内部推进（与 v2026.10.6 的 TLS 修复方向一致）。
2. **Token 成本与上下文治理**：#22438 反映大工作区用户对 bootstrap 文件浪费上下文预算的不满，与 #35203（多 agent token 成本治理）同属一类诉求。
3. **长推理模型兼容性**：#68596 指出 kimi-k2.5/DeepSeek-R1 等推理模型频繁触发流式 watchdog 误报，反映推理型模型时代基础设施需要适配。

## 5. Bug 与稳定性（按严重程度）

**P1 级（仍在处理）**
- [#172837](https://github.com/openclaw/openclaw/issues/172837) [OPEN]：Codex 原生子 agent 完成投递放弃后 `nativeSubagentAssignments` 永不清理，每个新父线程重复 re-pin/re-send（2026.10.3）——无 fix PR
- [#158127](https://github.com/openclaw/openclaw/issues/158127) [OPEN]：2026.9.6 多 agent 运行时发布失败 + Codex 启动超时——无 fix PR
- [#140010](https://github.com/openclaw/openclaw/issues/140010) [OPEN]：Windows 睡眠唤醒后 UI/WebSocket 重连失败 30-60s+（crash-loop 影响）——无 fix PR
- [#128140](https://github.com/openclaw/openclaw/issues/128140) [OPEN]：`memory_search` 工具固定 15s 超时而 CLI 正常——无 fix PR

**已修复/关闭的重要 Bug**
- [#43996](https://github.com/openclaw/openclaw/issues/43996)：`no-new-privileges` 下 sandbox 容器立即退出（P1，security + crash-loop）——已关闭
- [#51396](https://github.com/openclaw/openclaw/issues/51396)：`clearUnboundScopes` 无条件剥离非本地 token-auth 客户端的 operator 权限（P1 回归）——已关闭
- [#53008](https://github.com/openclaw/openclaw/issues/53008)：记忆压缩阻塞主处理通道，bot 无响应 10 分钟以上——已关闭
- [#53540](https://github.com/openclaw/openclaw/issues/53540)：大参数工具调用生成延迟超过请求超时导致 "Network connection lost"——已关闭
- [#181019](https://github.com/openclaw/openclaw/pull/181019)：worker 子 spawn 竞态——fix PR 已关闭（处理完毕）

**观察**：多 agent / Codex 运行时相关 P1 是当前最集中的稳定性风险面，且多个尚无对应 fix PR。

## 6. 功能请求与路线图信号

**可能纳入下一版本的信号**（有活跃 PR 支撑）：
- **Knowledge 记忆插件内置**：[#180139](https://github.com/openclaw/openclaw/pull/180139)（XL，含兼容性/安全边界审查标记）将证据支撑型记忆插件捆绑发布，默认关闭——与 #60572（多槽记忆架构）、#20935（记忆审计日志）等高热 Issue 形成呼应，**记忆子系统是明确的路线图方向**
- **后台摘要不阻塞新消息**：[#176964](https://github.com/openclaw/openclaw/pull/176964) 直接缓解 #53008 类痛点
- **自动化 webhook 权限收敛**：[#178904](https://github.com/openclaw/openclaw/pull/178904) 限制 webhook 触发的 turn 只能访问自身 automation 工具

**长期候选（今日被关闭但需求真实）**：
- 记忆信任分级（#7707）、硬门禁钩子（#13583）、skill 安装安全扫描钩子（#18677）——三个安全提案同日关闭，需关注是否以其他形式落地
- 内置 headless 浏览器（#53763）与 Requesty provider PR（#180788）若合并将显著降低使用门槛

## 7. 用户反馈摘要

**痛点**：
- **多 agent 编排不可靠**（#43367）：并发 `agents add` 覆盖配置、session-lock 失败、子任务脱离——多 agent 用户的核心挫折
- **消息丢失类问题反复出现**：Feishu 图片在出站前丢失（#41744）、Telegram 会话串扰（#41165、#53783、#56692）——channel 集成的路由可靠性是普遍抱怨
- **低级质量事故**：#51429（开发者硬编码 `/Users/wangtao` 工作路径被合并发布）引发中文社区嘲讽，暴露 CI 缺乏此类检查
- **运维摩擦**：macOS 上 node 获得辅助功能权限即暴露全部 npm 包（#7227）；恢复副本无限累积（#174253 系列，PR #181033 处理中）

**满意点**：
- 社区对维护响应速度评价高，"@steipete 单日系统性性能攻坚" 式的工程投入获得认可
- Docker 用户对内置运行时的升级体验满意（v2026.10.6 无感安全修复）

## 8. 待处理积压（维护者关注清单）

| 项目 | 等级 | 问题 |
|---|---|---|
| [#172837](https://github.com/openclaw/openclaw/issues/172837) 子 agent 分配泄漏 | P1 | 无 fix PR，每条新父线程放大问题 |
| [#158127](https://github.com/openclaw/openclaw/issues/158127) 多 agent 发布失败 | P1 | 等 maintainer review / 需补充信息 |
| [#140010](https://github.com/openclaw/openclaw/issues/140010) Windows 唤醒重连 | P1 | 标 stale，需 live repro |
| [#128140](https://github.com/openclaw/openclaw/issues/128140) memory_search 超时 | P1 | 8 月报告至今无修复 |
| [#50291](https://github.com/openclaw/openclaw/issues/50291) 插件钩子缺 trace 上下文 | P2 | 3 月报告，可观测性生态阻塞点 |
| [#150348](https://github.com/openclaw/openclaw/pull/150348) 混合配置写入 | P2 | 9 月起 open，兼容性风险标记 |
| [#180788](https://github.com/openclaw/openclaw/pull/180788) Requesty provider | P3 | 第 4 次尝试（前 3 次 #54443/#95375 失败），需 proof |

**建议**：优先投入 Codex/多 agent 运行时 P1 集群（#172837/#158127），这两者直接影响生产可用性；同时确认被批量关闭的安全类高热 Issue 的后续落地路径，向社区传递清晰信号。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比报告
**数据日期：2026-10-23 · 样本：OpenClaw、Hermes Agent**

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道已进入“高强度迭代 + 架构收敛”并存阶段：头部项目单日 Issue/PR 更新量均达数百条，工程节奏接近成熟基础设施项目。**安全（记忆投毒、密钥泄漏、审批越权）已成为超越功能诉求的第一社区话题**，两个项目均在当日出现安全类高热事件。同时，多智能体编排（A2A、子 agent、跨网关协作）和记忆子系统治理（信任分级、预算控制）是从讨论走向实现的明确主线。运行时重构（统一网关、多 agent 运行时）带来的系统性回归是当前生态最大的稳定性风险面。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 80，关闭 420） | 390（新开/活跃 357，关闭 33） |
| PR 更新（24h） | 500（待合并 210，合并/关闭 290） | 500（待合并 279，合并/关闭 221） |
| Release | **v2026.10.6**（含 Node 强制升级） | 无（v0.22.5 冲刺 rc） |
| 收敛比（Issue 关闭/新开） | 5.25：1（强收敛） | 0.09：1（扩张期） |
| 阶段判断 | 质量巩固 + 性能攻坚 | 高频迭代 + 发布冲刺 |
| 健康度 | 高（系统性消化积压） | 高但承压（回归面广：session-state 标签贯穿 P1/P2） |

**关键差异**：OpenClaw 关闭量远超新开量，处于清单收敛期；Hermes 新开 Issue（357）远超关闭（33），反映统一网关重构后的影响面仍在扩散。

## 3. OpenClaw 在生态中的定位

- **工程节奏优势**：单日 @steipete 一人系统性提交十余个性能 PR（合计削减 40KB+ 首屏 JS），并配套防回退度量（#181065 启动字节基线报告），工程化成熟度高于同类。
- **安全响应快**：v2026.10.6 强制 Node 24.22.1+/26.12.1+ 以修复 TLS 证书链缺陷，Docker 用户无感——供应链安全的处置速度和分层体验是标杆做法。
- **技术路线**：TypeScript/Node 技术栈、多 channel（Discord/iMessage/Nextcloud Talk 等）接入、Control UI 为核心交互面；对比 Hermes 的 Python/uv + 桌面端（CLI/gateway/desktop/TUI）+ 模型路由生态（MiniMax/Kimi 多路由、本地模型支持）路线。OpenClaw 更偏“通信中枢型个人 agent"，Hermes 更偏“本地优先 + 多模型路由的桌面 agent"。
- **社区规模信号**：OpenClaw issue 编号已至 18 万级（PR #181xxx），Hermes 约 14 万级，两者均为生态头部体量；但 OpenClaw 的 Issue 收敛比显著更健康。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **记忆安全与治理** | #7707 记忆信任分级（38 评论）、#180139 Knowledge 记忆插件、#53008 压缩阻塞 | #135039 MEMORY.md 预算控制与准入、#116673 记忆文档链 | 防 prompt 注入投毒 + 记忆膨胀成本控制，双方均为活跃投资区 |
| **agent 权限与审批安全** | #13583 响应前硬门禁钩子、#18677 skill 安装扫描 | #141346 smart approval 自动放行 osascript 致数据丢失、#25083 不可变 skills | “智能审批”信任危机是共同痛点，审批边界需可审计、可硬约束 |
| **多智能体编排** | #172837/#158127 多 agent/Codex 运行时 P1 集群 | #97681 跨网关 A2A 协作、#91687 长任务 task id | 多 agent 是明确路线图，但同时也是当前最大稳定性风险源 |
| **长推理模型兼容** | #68596 流式 watchdog 超时（kimi-k2.5/DeepSeek-R1） | #131743 Codex 300s 首进展停滞、#136486 reasoning 重放 400 | 推理型模型时代，超时/流式/重放基础设施需系统性适配 |
| **上下文/token 成本** | #22438 bootstrap 分层加载 | #121880 压缩边界切坏 tool_call | token 预算治理成为 power user 核心诉求 |
| **发布工程可靠性** | #180988 版本验证漂移修复 | Windows 更新三件套（#74885/#91229/#91097） | 自更新链路（尤其 Windows）是共同摩擦点 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多 channel 通信中枢、Control UI 性能、skill 生态 | 模型路由（MiniMax/Kimi/本地模型一等公民）、跨网关 A2A、浏览器自动化统一为 browser_exec |
| 目标用户 | Docker/网关部署的常驻 bot 运维者、多 channel 个人助手用户 | 本地优先桌面用户（Windows/macOS）、多模型/本地模型玩家 |
| 架构关键差异 | 多 channel surface + MCP 工具体系；运行时准备所有者收敛中 | 统一网关运行时（#106742 刚完成大重构，回归消化中）；插件化（Camofox 独立化） |
| 破坏性变更风格 | Node 运行时强制升级（Docker 屏蔽复杂度） | 内置 browser_* 工具移除（用户需显式迁移插件） |

## 6. 社区热度与成熟度分层

- **快速迭代/扩张期**：Hermes Agent——Issue 新开 357/日、v0.22.5 冲刺、统一网关重构影响面广（#134889 单 issue 213 评论），典型“大重构后回归消化”特征。
- **质量巩固/收敛期**：OpenClaw——Issue 关闭 420/日 vs 新开 80，性能专项 + 架构收敛 + 安全修复三线并进，节奏可控。
- **成熟度信号对比**：OpenClaw 已具备防性能回退的度量基建和分层升级体验；Hermes 的社区诊断质量高（用户附测试证据、主动纠错）但工程化收敛机制仍在建立（279 个待合并 PR、hook PR 需批量处置）。
- **共同短板**：多 agent/运行时 P1 问题长期无 fix PR（OpenClaw #172837/#158127；Hermes #79087 悬置近 3 月），生产可用性均未完全达标。

## 7. 值得关注的趋势信号

1. **安全从“功能”变为“第一性约束”**：记忆投毒、密钥泄漏、审批越权致数据丢失在两个项目同日高热。对开发者的启示：agent 产品需内置**来源信任分级、硬门禁钩子、审批操作可回滚**三件套，而非事后补丁。
2. **记忆子系统成为下一个竞争高地**：两个项目都在从“记忆存储”走向“记忆治理”（信任、预算、审计、准入管线）。做记忆中间件/插件的机会窗口正在打开。
3. **推理型模型倒逼基础设施改造**：watchdog 超时、流式停滞、重放语义变化——传统为快响应模型设计的基础设施假设正在失效，超时/重试/压缩策略需按模型类型可配置。
4. **多智能体协作（A2A）从愿景进入工程**：Hermes 的跨网关协作讨论 + OpenClaw 的多 agent 运行时踩坑说明——真正落地前，**会话状态归属、任务 id 语义、子 agent 生命周期清理**是最先要解决的基础问题。
5. **发布工程即用户留存**：Windows 自更新、版本验证漂移、TLS 供应链修复的处置质量直接影响社区信任；Docker 化屏蔽升级复杂度（OpenClaw 模式）值得借鉴。
6. **可观测性是生态短板**：OpenClaw #50291 插件缺 trace 上下文、Hermes hook 生命周期缺乏统一契约——agent 的调试/审计工具链存在明显供给缺口，是创业与开源贡献的机会方向。

---

**总结**：OpenClaw 处于健康收敛期，工程纪律和分层升级体验是标杆；Hermes 处于大重构消化期，模型路由与本地优先路线差异化明显。两者共同指向的行业下一站：**安全的记忆治理、可审计的权限边界、适配推理模型的基础设施、可靠的多智能体编排**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-23

## 1. 今日速览

Hermes Agent 今日保持极高活跃度：过去 24 小时 Issues 更新 390 条（新开/活跃 357、关闭 33），PR 更新 500 条（待合并 279、已合并/关闭 221），无新版本发布。从 PR 流看，v0.22.5 的发布准备工作密集推进（Windows 安装/更新 E2E 修复、uv 重锁、CI 修复），是本日的核心主线。社区侧，统一网关运行时（#106742 合并后）引发的会话状态归属问题持续发酵，#134889 已累积 213 条评论，是当前最大风险面。总体判断：项目处于高频迭代期，合并吞吐量健康，但 session-state 相关回归问题积压较多，需关注稳定性。

## 2. 版本发布

过去 24 小时无新 Release。但从 PR 活动判断 **v0.22.5 正在冲刺 rc 阶段**（多个 PR 引用 "v0.22.5 attempt rc.1" 的 CI run 39867334090），预计近期发布。

## 3. 项目进展

本日合并/关闭 PR 221 条，重点包括：

- **Windows 发布链修复**：[#143291](https://github.com/NousResearch/hermes-agent/pull/143291) 修复 v0.22.4→新版本更新后 launcher 与安装戳不刷新的问题（P2）；[#143292](https://github.com/NousResearch/hermes-agent/pull/143292) 解决冷缓存 sdist 编译超过 MAX_PATH 导致 Windows 桌面构建失败。两者直接解锁 v0.22.5 发布。
- **CI/E2E 修复批量落地**：[#143261](https://github.com/NousResearch/hermes-agent/pull/143261)（E2E 磁盘空间）、[#143263](https://github.com/NousResearch/hermes-agent/pull/143263)（Pillow 13 override 后升级 E2E）均已关闭，发布阻塞项快速清零。
- **浏览器自动化架构收敛**：[#143146](https://github.com/NousResearch/hermes-agent/pull/143146) 将浏览器自动化统一到 `browser_exec`，移除 agent-browser 和十个内置 `browser_*` 工具，Camofox 迁移为独立插件——**这是一个破坏性变更**，依赖内置浏览器工具的用户需注意迁移。
- **依赖治理**：[#143281](https://github.com/NousResearch/hermes-agent/pull/143281) 重锁以适配最新版 uv（待合并）；[#143287](https://github.com/NousResearch/hermes-agent/pull/143287) 清理残留 requirements.txt。
- **模型生态**：[#143294](https://github.com/NousResearch/hermes-agent/pull/143294) 将 10 月 19 日发布的 MiniMax-M3.1-Flash 提升为一等模型（MiniMax/OpenRouter/Nous 三路由）；Kimi K2.8 Preview 选择器命名 PR [#111984](https://github.com/NousResearch/hermes-agent/pull/111984) 已关闭。

整体看，本日项目在 Windows 平台可靠性和发布工程上前进明显，同时完成了浏览器工具栈的架构瘦身。

## 4. 社区热点

- **[#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（213 评论，已关闭）**：统一网关运行时 #106742 合并后的 post-merge 修复追踪 issue，标记 P0，横跨 CLI/gateway/desktop/TUI 十余个标签。超高评论量说明这次大重构的影响面极广，是近期社区焦虑的集中点。
- **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)（40 评论）**：跨网关 Bot 协作（A2A 方向），诉求是让分布在不同机器/所有者的个人智能体协作而不交出控制权，代表项目的长期路线图方向。
- **[#141346](https://github.com/NousResearch/hermes-agent/issues/141346)（32 评论，security）**：Smart approval 自动放行了 osascript 命令，导致用户未保存的 PowerPoint 被关闭且导出文件被删，**不可恢复的数据丢失**。这是本日最严重的安全/信任类反馈，直指 smart 审批模式对 AppleScript 的风险评估缺口。
- **[#64231](https://github.com/NousResearch/hermes-agent/issues/64231)（29 评论）**：插件生命周期事件目录与 hook 分类学——维护者主动提出批量处置积压的 hook PR，反映插件生态治理需求。
- **[#135039](https://github.com/NousResearch/hermes-agent/issues/135039)（13 评论）**：MEMORY.md/USER.md 写入时预算控制与准入管线，社区对记忆文件无限膨胀带来的延迟/成本问题有共识。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 问题 | 状态 |
|---|---|---|
| P0 | [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) 统一网关后单一 gateway 独占所有本地会话，post-merge 修复进行中 | 追踪中，已关闭（修复阶段） |
| P2 | [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) smart approval 自动批准 osascript 造成数据丢失（security） | Open，暂无明确 fix PR |
| P2 | [#139532](https://github.com/NousResearch/hermes-agent/issues/139532) turn 进行中 gateway 重启将会话 FIFO 永久卡死，桌面端无恢复入口；与 [#138915](https://github.com/NousResearch/hermes-agent/issues/138915)（Dashboard 409）同属 session-state fallout | Open |
| P2 | [#136281](https://github.com/NousResearch/hermes-agent/issues/136281) 更新检查 404：stable.json 分发链路上游故障 | Open，cause/upstream |
| P2 | [#131743](https://github.com/NousResearch/hermes-agent/issues/131743) Codex 长任务 300 秒首进展停滞 | Open，needs-repro |
| P2 | [#136486](https://github.com/NousResearch/hermes-agent/issues/136486) `reasoning` 别名重放触发 HTTP 400，字段拒绝学习机制失效 | Open |
| P2 | [#121880](https://github.com/NousResearch/hermes-agent/issues/121880) hygiene 压缩边界切在 tool_call 上导致 Gemini 400 | Open |
| 已修复 | [#122424](https://github.com/NousResearch/hermes-agent/issues/122424) js-yaml/yaml CVE 固定（已关闭）；[#137944](https://github.com/NousResearch/hermes-agent/issues/137944) edge-tts 403（7.3.0 修复，已关闭） | Closed |

值得关注：session-state/sweeper:risk 标签几乎贯穿所有 P1/P2 bug，是统一网关重构后的系统性回归面。今日也有对症 PR：[#141669](https://github.com/NousResearch/hermes-agent/pull/141669)（prompt.cancel 停止 turn）、[#143282](https://github.com/NousResearch/hermes-agent/pull/143282)（automation wake admission_conflict）。

## 6. 功能请求与路线图信号

- **跨网关/跨所有者 Bot 协作**（[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)）+ **A2A 长任务返回 task id**（[#91687](https://github.com/NousResearch/hermes-agent/issues/91687)）：多智能体协作是明确的路线图主线，可能进入下个大版本。
- **Hook 生命周期统一为运行时契约**（[#67798](https://github.com/NousResearch/hermes-agent/issues/67798)）+ 今日 PR [#143260](https://github.com/NousResearch/hermes-agent/pull/143260)（pre/post_llm_call 传递 sender 来源）：hook 治理正在从讨论走向实现，[#64231](https://github.com/NousResearch/hermes-agent/issues/64231) 的批量处置有望落地。
- **记忆预算与准入**（[#135039](https://github.com/NousResearch/hermes-agent/issues/135039)）+ PR [#116673](https://github.com/NousResearch/hermes-agent/pull/116673)（MEMORY.md 锚定文档链，待合并）：memory 子系统是活跃投资区。
- **本地模型 turn 显式完成信号**（[#143289](https://github.com/NousResearch/hermes-agent/pull/143289)）与 **provider base-URL 解析修复**（[#143262](https://github.com/NousResearch/hermes-agent/pull/143262)）：本地/自建模型兼容性持续增强。
- **不可变/受保护 skills**（[#25083](https://github.com/NousResearch/hermes-agent/issues/25083)）与 #141346 一起，指向"agent 权限边界"这一主题，结合 smart approval 事故可能被提优先级。

## 7. 用户反馈摘要

- **信任与安全是最大痛点**：#141346 中用户因 smart approval 自动放行脚本丢失未保存工作，社区对"智能审批"的信任受到实质冲击；同类诉求见 skills 防篡改（#25083）。
- **Windows 用户苦安装/更新久矣**：自更新文件锁（[#91229](https://github.com/NousResearch/hermes-agent/issues/91229)）、`git reset --hard` 摧毁本地提交导致无限更新循环（[#74885](https://github.com/NousResearch/hermes-agent/issues/74885)）、计划任务无法重启 watchdog（[#91097](https://github.com/NousResearch/hermes-agent/issues/91097)）——本日多个发布工程 PR 正面回应此痛点。
- **重负载/长会话用户受稳定性困扰**：长任务流式停滞、压缩边界错误、会话卡死无 UI 恢复（#139532）是 power user 的核心抱怨。
- **正面信号**：用户提交的诊断质量高（#79087 中用户主动撤回错误结论并附测试证据）；社区积极贡献 i18n（pt-BR 文档，[#68680](https://github.com/NousResearch/hermes-agent/issues/68680)）和新模型接入 PR，生态参与意愿强。

## 8. 待处理积压

- **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)**（8 月末至今，needs-decision）：跨网关协作，路线图级，需维护者给出决策节点。
- **[#79087](https://github.com/NousResearch/hermes-agent/issues/79087)**（8 月初，P1，Windows）：安装探测超时误判为首次运行，P1 级别悬置近 3 个月，建议优先处理。
- **[#74885](https://github.com/NousResearch/hermes-agent/issues/74885) / [#91229](https://github.com/NousResearch/hermes-agent/issues/91229) / [#91097](https://github.com/NousResearch/hermes-agent/issues/91097)**：Windows 更新三件套长期未关，v0.22.5 发布前建议纳入验证范围。
- **[#121880](https://github.com/NousResearch/hermes-agent/issues/121880) / [#131743](https://github.com/NousResearch/hermes-agent/issues/131743)**：provider 兼容性 P2 长期 open，影响 Gemini/Codex 长任务用户。
- **PR 积压**：待合并 279 个，包括内存文档链 [#116673](https://github.com/NousResearch/hermes-agent/pull/116673)（9 月末至今）、WhatsApp 懒安装策略 [#87264](https://github.com/NousResearch/hermes-agent/pull/87264)（8 月中至今）等，建议按 #64231 的批量处置思路清理。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*