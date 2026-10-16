# OpenClaw 生态日报 2026-10-17

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-16 22:49 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-17

## 1. 今日速览

OpenClaw 今日保持极高活跃度：过去 24 小时内 Issues 更新 500 条（新开/活跃 377，关闭 123），PR 更新 500 条（待合并 235，已合并/关闭 265），并发布了新版本 **v2026.10.4**。项目处于快速迭代期，@steipete 等核心贡献者以近乎工业化的节奏持续提交重构与性能优化 PR（大量标注 `campaign batch` / `ci:full`）。但社区侧仍存在明显压力：Windows 平台启动/更新可靠性、SQLite WAL 无限增长、插件源捕获导致 SSD 磨损等多个 P0 问题长期未解，Issue 积压与修复吞吐之间的张力是当前项目健康度的主要风险点。

---

## 2. 版本发布

### v2026.10.4 ([openclaw 2026.10.4](https://github.com/openclaw/openclaw/releases))

**Highlights:**
- **Gateway 心跳修复**：电脑休眠或系统时钟跳变后，Gateway 不再因 ownership heartbeat 判定过期而自我重启，改为持续运行（#170790，感谢 @AnvinaLI、@sgh6688、@waynegault、@RomneyDa）。
- Gateway 关闭与重启不再在（发布说明在此处截断）……

**迁移注意事项：** 建议长期运行网关的用户（尤其是笔记本/休眠场景）尽快升级；该修复直接针对多个“时钟跳变导致重启循环”类 Issue（如 #162211 的相关症状）。从 beta 通道（2026.10.5-beta.2 → 2026.10.10-beta.1）升级的用户需注意 #173764 报告的 update 挂起问题。

---

## 3. 项目进展

今日合并/关闭 265 条 PR，主要推进方向：

**修复类：**
- [#174752](https://github.com/openclaw/openclaw/pull/174752)（已关闭）— 释放被缓存 WebSocket 持有的已完成 OpenAI runs，防止 session/runtime lease 泄漏，🦞 高评级修复。
- [#173834](https://github.com/openclaw/openclaw/pull/173834) / [#174787](https://github.com/openclaw/openclaw/pull/174787) — 修复 Doctor 在更新期间将 DM 发送者回填进刻意置空的群组白名单的问题（关联 #173826）。
- [#174675](https://github.com/openclaw/openclaw/pull/174675) — 插件元数据预取移出 Gateway 线程，减少 SQLite 同步读阻塞。

**性能/重构（@steipete 主导的 campaign）：**
- [#174701](https://github.com/openclaw/openclaw/pull/174701) — Control UI 关闭菜单不再拖慢聊天重载，**实测 reload 阻塞降低 34%**。
- [#174705](https://github.com/openclaw/openclaw/pull/174705) — 移除 PostgreSQL 冗余 schema/transport 检查。
- [#174714](https://github.com/openclaw/openclaw/pull/174714)、[#174731](https://github.com/openclaw/openclaw/pull/174731)、[#174790](https://github.com/openclaw/openclaw/pull/174790) — Solid 迁移后的 UI 响应式生命周期简化系列。
- [#174702](https://github.com/openclaw/openclaw/pull/174702)（实验性，已关闭）— formatter 缓存实验未通过性能门限，明确不落地，体现了严谨的实验流程。

**待合并的关键修复：**
- [#174389](https://github.com/openclaw/openclaw/pull/174389)（P1）— 删除单个 agent 不再破坏其他 agent 的健康/用量/实时更新。
- [#174782](https://github.com/openclaw/openclaw/pull/174782) — 共享 OpenAI org TPM 限流时的共享恢复节流。
- [#172772](https://github.com/openclaw/openclaw/pull/172772) — 修复其他 OpenClaw 进程占用 agent 数据库导致 update 失败。

整体看，项目在 Gateway 线程卸载、UI 性能、插件/更新可靠性三条线上同步推进，速度可观，但多数高优修复仍处于 `waiting on author` / `ready for maintainer look` 状态，落地存在排队延迟。

---

## 4. 社区热点

1. **[#143524](https://github.com/openclaw/openclaw/issues/143524)（131 评论，P0）** — Agent SQLite WAL 在 Windows 上数天内膨胀至 1.4–2.8 GB，`wal_autocheckpoint=1000` 失效并阻塞 Gateway 启动。讨论量是第二名的近 5 倍，是当前社区最强烈的痛点，**尚无 fix PR**。
2. **[#159356](https://github.com/openclaw/openclaw/issues/159356)（27 评论）** — llama.cpp manager 误报 ready 但 embedding 子进程退出，HTTP 500；用户通过扩容 RAM 至 8GB 自行缓解，指向内存压力问题。
3. **[#112423](https://github.com/openclaw/openclaw/issues/112423)（22 评论）** — 大型 SQLite transcript 归档在 Gateway 线程做全量物化/压缩/IO，阻塞事件循环。
4. **[#148707](https://github.com/openclaw/openclaw/issues/148707)（21 评论，P1，2026.9.4 回归）** — 同 session 并发 run 导致回复丢失（"no active tool authority snapshot"）。
5. **[#111897](https://github.com/openclaw/openclaw/issues/111897)（19 评论）** — 同 lane 并发 run 产生重复回复。

诉求聚焦：**会话状态一致性与消息不丢失**（多条 P1）以及 **Windows 平台可靠性**。

---

## 5. Bug 与稳定性（按严重程度）

| 级别 | Issue | 摘要 | Fix PR |
|---|---|---|---|
| P0 | [#143524](https://github.com/openclaw/openclaw/issues/143524) | SQLite WAL 无限增长阻塞启动 | ❌ 无 |
| P0 | [#162211](https://github.com/openclaw/openclaw/issues/162211) | 启动阻塞事件循环 40–200s → 重启循环 | ❌ 无 |
| P0 | [#140161](https://github.com/openclaw/openclaw/issues/140161) | Windows 计划任务模式冷启动挂 5–7 分钟或静默退出 | ❌ 无 |
| P0 | [#167406](https://github.com/openclaw/openclaw/issues/167406) | Windows MSIX + Codex 主线程饥饿 | ❌ 无 |
| P0 | [#154950](https://github.com/openclaw/openclaw/issues/154950) | 2026.7.x → 2026.9.x 更新被 legacy-workspace 错误永久阻塞 | ❌ 无 |
| P0 | [#152275](https://github.com/openclaw/openclaw/issues/152275) | 插件激活失败致模型目录/回复派发不可用直至重启 | ❌ 无 |
| P0 | [#167557](https://github.com/openclaw/openclaw/issues/167557) | 延迟插件迁移不收敛 | ❌ 无（标记 not-repro-on-main）|
| P0 | [#115256](https://github.com/openclaw/openclaw/issues/115256) | 桌面应用引导 gateway boot-loop | ❌ 无 |
| P1 | [#173764](https://github.com/openclaw/openclaw/issues/173764) | update 在 post-activation doctor 步骤无限挂起（今日新报） | 相关 [#172772](https://github.com/openclaw/openclaw/pull/172772) 进行中 |
| P1 | [#168955](https://github.com/openclaw/openclaw/issues/168955) | 2026.10.1 启动回归：ready 时间 410s → 1030s | ❌ 无 |
| P1 | [#157989](https://github.com/openclaw/openclaw/issues/157989) | 插件源捕获每次 CLI 写 1.1–1.4 GB、Gateway 启动写 6.5 GB（SSD 磨损） | ❌ 无 |
| P1 | [#108395](https://github.com/openclaw/openclaw/issues/108395) | 模型伪造 "Human:" 消息实现自我授权（安全） | ❌ 无 |
| P1 | [#109478](https://github.com/openclaw/openclaw/issues/109478) | 多行工具参数 `\n` 注入破坏文件 | ❌ 无 |

今日已关闭的重要 Bug：[#164113](https://github.com/openclaw/openclaw/issues/164113)（LXC 容器 FICLONE EPERM 更新失败，带 fix-shape-clear 标签）。

**结构性观察**：P0 问题几乎全部集中在 Windows/更新路径/SQLite 存储层，且多数带 `clawsweeper:no-new-fix-pr` 标签——修复债务明显高于新增修复速度。

---

## 6. 功能请求与路线图信号

- **SecretRef 支持 MCP env**（[#76493](https://github.com/openclaw/openclaw/issues/76493)，4 👍，已带 `needs-security-review`）— 安全最佳实践需求强烈，进入产品决策阶段，可能近期落地。
- **输出守卫（pseudo tool-call / 重复流防护）**（[#138245](https://github.com/openclaw/openclaw/issues/138245)，已关闭待产品决策）— 与 [#44965](https://github.com/openclaw/openclaw/issues/44965) 的流重复防护同源，社区反复提出，属于高呼声方向。
- **Agent 身份显示在聊天头部**（[#174785](https://github.com/openclaw/openclaw/pull/174785)，feature intake）— UI 团队已在实现中。
- **插件引导内联卡片**（[#174703](https://github.com/openclaw/openclaw/pull/174703)）— Control UI 体验持续打磨。
- **Prompt-cache 前缀重写优化**（[#143017](https://github.com/openclaw/openclaw/issues/143017)，实测 21.3M 浪费 cache-write tokens）— 成本敏感用户强烈关注，尚无 PR，但数据论证扎实，值得关注路线图纳入。

---

## 7. 用户反馈摘要

**痛点：**
- **Windows 用户体验明显落后于 macOS/Linux**：启动慢（#168955、#140161）、更新不可靠（#170956：荷兰用户“只有反复尝试后才成功”）、MSIX 安装问题密集。
- **静默消息丢失是最伤信任的问题**：#112259（iMessage 消息被静默丢弃，无重试无死信）、#148707（回复丢失）。
- **资源消耗担忧**：#157989（SSD 磨损）、#143017（token 成本）、#158417（/tmp 填满不清理）。
- **幻觉用户消息引发安全担忧**：#151962（内部运行时字符串被当作用户 prompt）、#108395（模型伪造 Human 消息自我授权）。

**满意点：**
- 用户愿意做深度诊断（#143524 提供 WAL 完整取证、#143017 提供量化 token 测量），社区技术素养高，与维护者协作模式成熟。
- 新版 Gateway 心跳修复（2026.10.4）直接回应了休眠/时钟跳变场景的长期抱怨，获多位贡献者致谢。
- doctor/更新路径的多个修复（#164113 关闭、#173834 合并）显示 LXC/白名单等边缘场景在被认真对待。

---

## 8. 待处理积压

**长期未解的高优 Issue（多数 `needs-maintainer-review`，>1 个月）：**
- [#143524](https://github.com/openclaw/openclaw/issues/143524)（9/9 报告，131 评论）— WAL 膨胀，社区最热，需尽快指派修复
- [#112423](https://github.com/openclaw/openclaw/issues/112423)（7/21 报告）— transcript 清理阻塞事件循环
- [#96834](https://github.com/openclaw/openclaw/issues/96834)（6/25 报告）— WhatsApp 图片卡 lane 3 分钟
- [#107244](https://github.com/openclaw/openclaw/issues/107244)（7/14 报告）— WhatsApp 群消息完全无法入站
- [#87756](https://github.com/openclaw/openclaw/issues/87756)（5/28 报告）— Lobster 嵌套 /tools/invoke 挂起
- [#99910](https://github.com/openclaw/openclaw/issues/99910)（7/4 报告）— Memory dreaming 卡死 Gateway 10 分钟
- [#76493](https://github.com/openclaw/openclaw/issues/76493)（5/3 报告）— SecretRef，已 5+ 个月

**建议：** 维护者应优先处理“SQLite/存储层 WAL 系列”（#143524、#164294、#172091 属同族问题）与“Windows 启动/更新系列”（#140161、#170956、#173764），两簇问题的用户可见影响最大且相互加剧。P0 列表中 8 项均无 fix PR，修复债务需要专门的专项 campaign（类似 steipete 的 perf campaign 模式）来消化。

---

*数据来源：GitHub API 快照（Issues/PR 各 500 条），统计窗口为 2026-10-16 至 2026-10-17。*

---

## 横向生态对比

# 个人 AI 助手/智能体开源生态横向对比分析报告

**数据窗口：2026-10-16 至 2026-10-17**

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道已进入“平台化深水区”：两个头部项目（OpenClaw、Hermes Agent）均处于每日数百条 Issue/PR 的超高活跃状态，且都已完成或正在经历**统一网关运行时**级别的架构重构。生态共性痛点高度收敛于四点：**持久会话状态一致性、跨平台可靠性（尤其 Windows）、存储层（SQLite）治理、静默数据/消息丢失**。与此同时，社区对**成本可见性**（token 浪费、bug 导致的配额烧毁）和**安全边界**（提示注入、凭证落盘）的容忍度显著降低——这两类问题正从“技术债”升级为“信任债”。总体判断：生态从功能竞赛转入可靠性与信任构建阶段。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 377，关闭 123） | 451（新开/活跃 368，关闭 83） |
| PR 更新（24h） | 500（待合并 235，合并/关闭 265） | 500（待合并 398，合并/关闭 102） |
| Release | **v2026.10.4**（高频发版节奏） | 无（v0.22.1 存在已知更新链问题） |
| Issue 开关比 | ~3.1 : 1 | ~4.4 : 1 |
| 架构阶段 | 重构后性能 campaign 期 | 网关重构刚合入，fallout 修复期 |
| 健康度评估 | ⚠️ 黄：交付速度极高，但 **8 项 P0 无 fix PR**，修复债务累积 | ⚠️ 黄：修复 PR 补给充足、决策管道清晰，但新问题涌入速度超吞吐，v0.22.x 带伤发版 |

**共同风险信号**：两项目 Issue 开关闭比均 >3:1，说明生态整体的“报告能力”增长快于“修复能力”。

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **交付节奏领先**：日合并/关闭 265 PR（Hermes 为 102），@steipete 的 campaign batch 模式（性能专项批量推进，如 #174701 实测 reload 阻塞降 34%）体现了工业化的工程管理能力。
- **社区深度强**：#143524（131 评论，是第二名 5 倍）与 #143017（量化 21.3M 浪费 cache tokens）显示用户具备专业级取证能力，报告质量高。
- **版本迭代快**：v2026.10.4 直接回应休眠/时钟跳变长期抱怨，产品响应闭环存在。

**劣势：**
- **修复债务结构性失衡**：P0 全部集中在 Windows/更新路径/SQLite 三大存储与启动层，且多带 `clawsweeper:no-new-fix-pr` 标签——性能 campaign 与可靠性债务之间存在资源错配。
- Hermes 同期已系统性落地单调时钟迁移（#134672）消除同类时钟跳变问题，OpenClaw 的修复粒度更碎片化。

**技术路线差异**：OpenClaw 走“广度优先”（插件生态 + 多平台消息通道 + Gateway 线程卸载并行推进）；Hermes 走“深度优先”（统一网关运行时一次性合入，多 profile 安全隔离架构成形，#139569/#139689）。

---

## 4. 共同关注的技术方向

| 技术方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **时钟跳变/休眠稳定性** | #170790（2026.10.4 心跳修复） | #134672（全量单调时钟迁移） | NTP/休眠后网关误判、重启循环 |
| **SQLite 存储治理** | #143524 WAL 膨胀、#112423 线程阻塞 | #69672 FTS5 索引损坏、#137517 回收合并 | 存储 IO 阻塞主线程、DB 无限增长 |
| **静默数据/消息丢失** | #112259 iMessage 丢弃、#148707 回复丢失 | #132401 scratch 静默删除（P0） | 要求可审计、可恢复（日志/隔离区/keep-marker） |
| **成本可见性** | #143017 prompt-cache 浪费 21.3M tokens | #138343 陈旧投递烧配额、#133999 缓存重写 | bug 直接转化为账单损失 |
| **提示注入防线** | #108395 模型伪造 "Human:" 自我授权 | PR #137554 `.hermes.md` 写保护 | 输出守卫、敏感文件防护 |
| **记忆子系统** | Memory dreaming 卡 Gateway（#99910） | #25309 Dreaming 提案 + #135039 写入管线 | 后台记忆整合的需求已在两项目并行涌现 |
| **更新链路可靠性** | #154950 更新永久阻塞、#173764 挂起 | #136281 stable.json 404、#127284 启动卡死 | source/自更新路径是共同的脆弱面 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多平台消息通道（iMessage/WhatsApp/Telegram）、插件生态、Control UI 打磨 | 多 profile 隔离、Kanban 任务编排、Desktop/TUI/CLI 全端、webapp 化（#93508） |
| 目标用户 | 消息通道重度个人助手用户，macOS/Linux 体验优先（Windows 明显落后） | 桌面/开发者向的多 agent 协作用户 |
| 架构关键差异 | Gateway 线程卸载、插件元数据预取外移、Solid UI 迁移 | 统一网关运行时（#106742）、插件独立宿主运行、同意门控统一 |
| 安全治理 | SecretRef 需求待落地（#76493，5+ 月） | 已有 `.hermes.md` 写保护 PR、环境凭证问题进入决策队列 |
| 短板 | Windows 可靠性、P0 修复债务 | 发版纪律（v0.22.x 带伤）、needs-decision 裁决积压（含安全项） |

---

## 6. 社区热度与成熟度

- **快速迭代阶段**：两项目均处高活跃，但性质不同——OpenClaw 是**重构后的性能优化冲刺期**（高风险：P0 债务累积），Hermes 是**大重构落地后的回归修复期**（#134889 追踪 127 评论为绝对焦点）。
- **成熟度分层**：
  - OpenClaw：核心路径（macOS/Linux 桌面）较成熟，Windows/更新路径半成品；
  - Hermes：架构前瞻性（多 profile 隔离）领先，但发版纪律与决策速度拖累稳定性兑现。
- **治理健康度**：Hermes 的 `needs-decision` 流程透明（3 项待裁决可见）；OpenClaw 的 `clawsweeper` 自动标签暴露了修复供给不足的结构性问题。

---

## 7. 值得关注的趋势信号

1. **“信任型 bug”成为生态主战场**：静默丢失（消息、scratch 数据）引发的信任损伤远超功能缺失——任何清理/投递操作默认需可审计、可恢复，应作为智能体基础设施的基线设计。
2. **存储层是智能体落地的隐形瓶颈**：WAL 膨胀、FTS 损坏、transcript 压缩阻塞事件循环在两项目同步爆发——agent 高频读写场景对 SQLite 的默认配置和线程模型提出超出常规应用的要求，**存储专项治理是确定性投入方向**。
3. **成本即正确性**：缓存前缀浪费、陈旧投递烧配额表明，agent 系统中 bug 的度量单位正在从“功能错误”变为“实际美元损失”，成本遥测将成为标配。
4. **时钟与并发的系统性防御**：单调时钟迁移（Hermes）与心跳判定修复表明，长时运行 agent 必须按分布式系统标准处理时钟、租约与并发 run 一致性。
5. **安全从边界走向纵深**：从 SecretRef 到提示注入写保护，“模型可自我授权/篡改上下文”类问题（#108395）提示开发者需要输出守卫与权限快照机制。
6. **修复债务需要 campaign 化管理**：OpenClaw 的 perf campaign 模式证明批量专项有效——将同类模式复制到 Windows 可靠性与 SQLite 存储两簇债务，是两项目维护者（及自建 agent 团队）都应借鉴的工程实践。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-17

## 1. 今日速览

Hermes Agent 今日维持高活跃度：过去 24 小时 Issues 更新 451 条（新开/活跃 368，关闭 83），PR 更新 500 条（待合并 398，已合并/关闭 102），无新版本发布。项目正处在大规模架构重构期——**统一网关运行时（#106742）已于 10 月 14 日合入 main**，由此引发的 session/profile 路由、消息投递等连锁修复成为当前主线（追踪 Issue #134889 已积累 127 条评论）。整体开关闭比约为 4.4:1，修复吞吐跟不上新问题涌入，短期稳定性压力较大，但社区参与度和修复 PR 补给（如 #138342）均很充足，项目健康度良好。

## 2. 版本发布

今日无新版本发布。注意 v0.22.1 仍存在已知问题：stable 渠道更新源 `stable.json` 返回 404（#136281），且 `hermes update` 在本地缺少 release commit 时会拒绝更新（#137646，已关闭），建议 git 安装用户暂以 main 分支为准。

## 3. 项目进展

今日无明确记录的大规模合并（102 条合并/关闭多为 CI 审查和小型修复），关键脉络如下：

- **统一网关运行时后续**：#134889（追踪 #106742 合并后修复）持续吸引 127 条评论，是当前绝对焦点。其 package 5 的两个插件架构 PR 今日活跃推进：[#139569](https://github.com/NousResearch/hermes-agent/pull/139569)（插件 WebSocket 统一同意门控 + Desktop 插件套接字接入本地网关）与叠在其上的 [#139689](https://github.com/NousResearch/hermes-agent/pull/139689)（被服务 profile 的 dashboard 插件运行在独立插件宿主）——多 profile 安全隔离架构正在成形。
- **启动性能**：[#140176](https://github.com/NousResearch/hermes-agent/pull/140176)（已关闭/合并）修复低磁盘自动清理提示导致 CLI 启动等待 `state.db` 的问题，全量历史扫描降频至每周一次——直接改善冷启动体验。
- **稳定性基建**：[#140171](https://github.com/NousResearch/hermes-agent/pull/140171) 修复 uninstall 测试的事件循环竞态；[#134672](https://github.com/NousResearch/hermes-agent/pull/134672) 将流式存活检测、退避、看门狗计时全部迁移到单调时钟，系统性消除 NTP/时钟跳变引发的误判（与 #131743、#125095 等多个 stall 类 bug 相关）。
- **P0 网关事故修复**：#138343（网关重启循环 + 陈旧异步委派投递烧钱，P0）已关闭，对应修复 PR #138342 已在处理路径上。

## 4. 社区热点

1. **[#134889](https://github.com/NousResearch/hermes-agent/issues/134889)**（127 评论）— 统一网关"独占所有本地 session"的后 merge 修复追踪。巨型重构落地后的回归修复主战场，大量 label（Windows 兼容、消息投递、session 状态）表明影响面横跨 CLI/Desktop/TUI。
2. **[#136567](https://github.com/NousResearch/hermes-agent/issues/136567)**（27 评论，7 👍，P1）— Telegram 论坛 DM 新 topic 首条消息无线程 ID，被 lobby 恢复逻辑误路由到旧 topic。上游（Telegram 平台行为变更）+ 会话状态双重归因，是多平台消息路由可靠性的典型痛点。
3. **[#132401](https://github.com/NousResearch/hermes-agent/issues/132401)**（23 评论，P0，needs-decision）— scratch 目录 24h 静默清理无声删除多天 agent 工作成果。数据丢失类 P0，用户诉求明确：需要日志、隔离区或 keep-marker 机制，等待维护者决策。
4. **[#25309](https://github.com/NousResearch/hermes-agent/issues/25309)**（10 评论）— "Dreaming" 后台记忆整理功能提案（5 月提出至今仍活跃），社区对记忆自动整合需求持续。
5. **[#135039](https://github.com/NousResearch/hermes-agent/issues/135039)**（11 评论）— MEMORY.md/USER.md 写入时预算与验收管线，与 #25309 同属记忆子系统演进方向。

## 5. Bug 与稳定性（按严重度）

**P0**
- [#132401](https://github.com/NousResearch/hermes-agent/issues/132401) scratch prune 静默销毁多天工作 — 无 fix PR，需决策。
- [#138343](https://github.com/NousResearch/hermes-agent/issues/138343)（已关闭）网关重启循环 + 配额烧毁 — 修复见 PR #138342。

**P1**
- [#136567](https://github.com/NousResearch/hermes-agent/issues/136567) Telegram topic 误路由 — 上游归因。
- [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) kanban 卡片 rate-limit 后永久卡 `blocker_auth`，reviewer 永不派生。
- [#127284](https://github.com/NousResearch/hermes-agent/issues/127284) `source-completion-pending` 无 TTL/自愈，一次被杀的 tail 永久卡住后续启动。
- [#127621](https://github.com/NousResearch/hermes-agent/issues/127621)（8 👍）Desktop 助手回复偶发重复渲染。
- [#138826](https://github.com/NousResearch/hermes-agent/issues/138826) 删除非根 profile 的 session 必 409（`store._routing_db` vs `authority.db`），网关重构直接 fallout，**v0.22.1 与 main 均复现**。
- [#108967](https://github.com/NousResearch/hermes-agent/issues/108967) `GET /v1/skills` 恒 500（陈旧 kwarg）。

**P2 精选**
- [#138843](https://github.com/NousResearch/hermes-agent/issues/138843)（已关闭）provider override 保留旧 base_url，新 key 发往旧端点（401）。
- [#136281](https://github.com/NousResearch/hermes-agent/issues/136281) 更新源 stable.json 404。
- [#136557](https://github.com/NousResearch/hermes-agent/issues/136557) DeepSeek 内联 reasoning 泄漏到 content。
- [#69672](https://github.com/NousResearch/hermes-agent/issues/69672) FTS5 索引 `\x00json:` 哨兵，SQLite 版本相关的索引损坏 + DB 膨胀。
- [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) `browser_exec` 残留永不退出的 daemon 进程。

**安全类**
- [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) 终端环境快照将含凭证的环境变量写入磁盘。
- PR [#137554](https://github.com/NousResearch/hermes-agent/pull/137554) 为 `.hermes.md` 增加写保护（提示注入防线），已提修复待评审。

## 6. 功能请求与路线图信号

- **记忆子系统**（#135039 预算/验收管线、#25309 Dreaming 后台整合）：两个高讨论量提案互补，构成 MEMORY.md 治理 → 自动整合的演进路径，无对应实现 PR，属中期方向。
- **Web 化 Desktop**：[#93508](https://github.com/NousResearch/hermes-agent/pull/93508) `hermes webapp` 在浏览器中托管真实 Desktop 渲染器，8 月起持续 rebase，是最受期待的大型特性 PR 之一。
- **工具输出按引用消费**：[#78090](https://github.com/NousResearch/hermes-agent/pull/78090) 已重新 rebase 到当前 main，活跃推进中。
- **生态扩展**：[#140154](https://github.com/NousResearch/hermes-agent/pull/140154) 新增 deepseek-search-fetch 插件目录条目；[#140167](https://github.com/NousResearch/hermes-agent/pull/140167) 修复 MCP OAuth 登录等待体验。
- **Kanban 增强**：[#137662](https://github.com/NousResearch/hermes-agent/pull/137662) 按板限流 `max_spawn_by_board`，配合 #119070 的卡死问题，kanban 调度器是明确改进区。
- **状态库维护自动化**：[#137517](https://github.com/NousResearch/hermes-agent/pull/137517) 孤儿消息行回收 + FTS5 索引合并，直指 #69672。

## 7. 用户反馈摘要

- **数据安全焦虑最突出**：scratch 静默删除（#132401）引发对"agent 工作成果随时可能消失"的普遍担忧，用户强烈要求任何清理操作可审计、可恢复。
- **升级/安装路径脆弱**：stable.json 404（#136281）、`source-completion-pending` 卡死（#127284）、home_io_guard 测试失败（#129455）集中反映 source 安装用户在更新链路上反复受挫。
- **网关重构 fallout 实际影响桌面用户**：#138826 的 session 删除 409、#127621 的回复重复，说明 Desktop 日常使用正承受架构迁移阵痛。
- **成本敏感**：#138343 的陈旧投递烧配额、#133999 的缓存前缀重写，用户对"bug 直接转化为账单损失"容忍度极低。
- **正面信号**：Slack 状态指示修复（#110374，11 👍）、Telegram 等多平台支持的问题获得快速响应和高质量根因分析，报告者普遍给出了可复现的详细诊断，社区质量高。

## 8. 待处理积压

| Issue | 说明 | 状态 |
|---|---|---|
| [#132401](https://github.com/NousResearch/hermes-agent/issues/132401) | P0 数据丢失，10-03 提出至今 needs-decision | ⚠️ 最需维护者拍板 |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) | P1 kanban 卡死，09-22 起 needs-decision | 无 fix PR |
| [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) | 安全：凭证落盘，07-10 起 needs-decision | 无 fix PR |
| [#127284](https://github.com/NousResearch/hermes-agent/issues/127284) | P1 更新自愈缺失，09-29 起 awaiting-reporter | 可能缺复现信息 |
| [#58226](https://github.com/NousResearch/hermes-agent/issues/58226) | Anthropic 用量显示错误，07-04 起 | 长期未修 |
| [#69672](https://github.com/NousResearch/hermes-agent/issues/69672) | FTS 完整性问题，07-22 起 | PR #137517 部分覆盖 |
| [#108967](https://github.com/NousResearch/hermes-agent/issues/108967) | `/v1/skills` 恒 500，09-12 起 | 一行级修复却积压月余 |

**建议**：优先裁决三个 `needs-decision` 的 P0/P1/安全 Issue；统一网关 fallout（#138826 等）应在下一个 tag 前收口，避免 v0.22.x 系列持续带伤发版。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*