# OpenClaw 生态日报 2026-11-08

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-07 23:37 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-08

## 1. 今日速览

OpenClaw 今日保持极高活跃度：过去 24 小时共 500 条 Issue 更新（新开/活跃 421，关闭 79）与 500 条 PR 更新（待合并 318，已合并/关闭 182），无新版本发布。社区贡献热情强劲，今日新增 PR 数量多且覆盖 Web UI、Android、macOS、Gateway、插件等多个层面，其中 @steipete 集中提交了多个 Control UI 性能优化 PR。项目整体处于“高吞吐修复 + 持续性能打磨”阶段，但多个 P0/P1 级稳定性问题（SQLite 损坏、更新通道死锁、消息静默丢失）长期未闭环，是当前健康度的主要风险点。

## 2. 版本发布

今日无新版本发布。值得注意的是 [#193962](https://github.com/openclaw/openclaw/issues/193962) 指出：#187197 的修复已进入 2026.11.5-beta.1，但受影响的 2026.10.10 安装**无法通过 `openclaw update` 到达该修复**（更新器自身 10 秒探针超时），形成“修复无法触达”的死锁局面，下一个版本发布前建议优先解决此自更新通道问题。

## 3. 项目进展

今日 182 个 PR 合并/关闭，318 个待合并，主要推进方向：

- **Control UI 性能与体验（@steipete 主导）**
  - [#194815](https://github.com/openclaw/openclaw/pull/194815) 将冷启动 Chat 构建拆分到多个 paint frame（协调者已接受性能权衡）；[#194827](https://github.com/openclaw/openclaw/pull/194827) 减少首次访问的请求波次；[#194834](https://github.com/openclaw/openclaw/pull/194834) 为热重载测量基线校准实验。
  - [#194866](https://github.com/openclaw/openclaw/pull/194866) 修复 provider 向导在兼容性步骤的必现崩溃（10/10 Chromium 复现）。
- **会话排序语义修复（roboclaw-bot 批量产出）**：[#194839](https://github.com/openclaw/openclaw/pull/194839) / [#194856](https://github.com/openclaw/openclaw/pull/194856) 修正“标记未读/重命名/置顶等操作不应改变 Last updated 排序”——一组完整、互相关联的 UX 修复。
- **安全修复**：[#194830](https://github.com/openclaw/openclaw/pull/194830) 限制受限角色（guest/contributor）只能发现公共仓库，堵住私有 org 仓库源码泄露路径，security-sensitive，建议尽快合并。
- **可靠性/正确性**：[#194798](https://github.com/openclaw/openclaw/pull/194798) 修复 sessions_send 发起方 cron 结束导致中途回复失败；[#190001](https://github.com/openclaw/openclaw/pull/190001)（ready for maintainer look）PostgreSQL 历史页单一快照读取，降低延迟；[#194837](https://github.com/openclaw/openclaw/pull/194837) 修复 explicit 多代理网关下 Telegram 转写回声不入历史。
- **新功能**：[#194721](https://github.com/openclaw/openclaw/pull/194721) 选中文本一键开新会话；[#194763](https://github.com/openclaw/openclaw/pull/194763) 聊天文件夹 + 会话移动。

整体看，今日在 Web UI 打磨、会话状态正确性、安全边界三个方向均有实质推进，合计约 36% 的 PR 吞吐被合并/关闭。

## 4. 社区热点

评论数最多的讨论集中在**长周期高严重度问题**：

- [#44925](https://github.com/openclaw/openclaw/issues/44925)（31 评论，🦞 diamond lobster）：Subagent 完成结果静默丢失，无重试/通知/超时重启，自 3 月悬置至今。
- [#177656](https://github.com/openclaw/openclaw/issues/177656)（31 评论）：2026.10.5 稳定版 native host exec 出现 shared-state integrity admission 错误，至少 28 次失败。
- [#150635](https://github.com/openclaw/openclaw/issues/150635)（26 评论）：短期记忆召回存储达 512 条上限后逐夜清退，dreaming 深度阶段永远无法晋升——记忆系统核心机制失效。
- [#119720](https://github.com/openclaw/openclaw/issues/119720)（25 评论）：同步持久化阻塞 Gateway 事件循环，已有部分修复落地（#140231、#138984）。
- [#191944](https://github.com/openclaw/openclaw/issues/191944)（24 评论）：macOS 上 `gateway stop/--force` 双双失败。
- [#126360](https://github.com/openclaw/openclaw/issues/126360)（20 评论）：explicit 多代理模式下 AgentSelectionRequiredError 刷屏日志。
- [#50093](https://github.com/openclaw/openclaw/issues/50093)（20 评论）：WhatsApp 断线重连后丢失消息不回填——高价值功能诉求。

**诉求共性**：用户对“静默失败”（消息丢失、结果丢弃、无告警）容忍度极低，最活跃的讨论几乎全部指向**可观测性与重试机制的缺失**，而非功能不足。

## 5. Bug 与稳定性（按严重度）

**P0**
- [#193962](https://github.com/openclaw/openclaw/issues/193962)：更新器死锁——修复无法通过 `openclaw update` 触达（release blocker，**无 fix PR**）
- [#126821](https://github.com/openclaw/openclaw/issues/126821)：全新重建的 SQLite 在 15–24h 内再次损坏，出现“拒绝所有服务但不退出”的瘫痪模式（**无 fix PR**）
- [#89278](https://github.com/openclaw/openclaw/issues/89278)：Codex OAuth 刷新超 10s 超时导致 cron/heartbeat 失败（**无 fix PR**）

**P1**
- [#44925](https://github.com/openclaw/openclaw/issues/44925) Subagent 结果静默丢失（无 fix PR）
- [#177656](https://github.com/openclaw/openclaw/issues/177656) shared-state integrity admission 错误（无 fix PR）
- [#168955](https://github.com/openclaw/openclaw/issues/168955) Windows 启动从 ~410s 回归至 ~1030s，sidecars.control-ui-assets 阻塞 477s（无 fix PR）
- [#193262](https://github.com/openclaw/openclaw/issues/193262) Docker + Windows 盘 bind-mount 状态目录启动失败（2026.9.3 起回归，无 fix PR）
- [#182647](https://github.com/openclaw/openclaw/issues/182647) Cloud worker 会话首次推理必失败（标记 queueable-fix，待排队）
- [#111897](https://github.com/openclaw/openclaw/issues/111897) 同 lane 并发 run 产生重复回复（无 fix PR）
- [#167557](https://github.com/openclaw/openclaw/issues/167557) 插件数据迁移永不收敛（无 fix PR）

**P2 值得关注**
- [#194662](https://github.com/openclaw/openclaw/issues/194662)（今日新开，9 评论）：通知唤醒让助手“回答没人发的消息”并虚构发送者——幻觉 + 会话状态问题叠加，社区反应强烈。
- [#143581](https://github.com/openclaw/openclaw/issues/143581)：Signal 入站消息卡在 spool 重试循环近 23 小时。

## 6. 功能请求与路线图信号

- **记忆系统是需求最密集领域**：[#150635](https://github.com/openclaw/openclaw/issues/150635)（晋升机制）、[#101422](https://github.com/openclaw/openclaw/issues/101422)（召回路径配置，有 linked PR）、[#138366](https://github.com/openclaw/openclaw/issues/138366)（Dreams 页面插件化）、[#128140](https://github.com/openclaw/openclaw/issues/128140) / [#136405](https://github.com/openclaw/openclaw/issues/136405)（memory_search 超时）——建议作为下版本主题。
- **动态模型发现** [#10687](https://github.com/openclaw/openclaw/issues/10687)（4 👍）配合今日 [#194822](https://github.com/openclaw/openclaw/pull/194822) 修 catalog 推荐模型，方向信号明确。
- **自压缩工具** [#6757](https://github.com/openclaw/openclaw/issues/6757)：由 OpenClaw 代理自主提交的 issue，上下文管理需求真实。
- **配置化快捷键** [#163739](https://github.com/openclaw/openclaw/issues/163739)（Ctrl+Shift+A 冲突，有 linked PR），大概率近期落地。
- **多代理权限分级** [#59149](https://github.com/openclaw/openclaw/issues/59149)：与今日 #194830 安全修复方向一致，安全域是活跃路线图信号。

## 7. 用户反馈摘要

- **痛点**：① 静默丢消息是跨渠道（Telegram [#125764](https://github.com/openclaw/openclaw/issues/125764)、WhatsApp #50093、Signal [#101793](https://github.com/openclaw/openclaw/issues/101793)、iMessage [#112259](https://github.com/openclaw/openclaw/issues/112259)）的最大抱怨；② 启动/运行时性能回归（#168955、#117262 SQLite 33s 事件循环停顿）直接影响日常使用；③ 升级路径脆弱（#167557 迁移不收敛、#193962 更新死锁、#48920 文档领先于版本）。
- **满意点**：PR 流程高度规范化（size/proof/rating 标签体系），roboclaw-bot 与 clawtributors 贡献管线运转顺畅；社区愿意做深度源码级复现报告，忠诚度高。
- **典型场景**：多代理部署、家庭服务器/自托管（WSL2、Docker、macOS LaunchAgent）、IM 渠道接入（Telegram/Signal/Matrix/微信）是主流使用形态。

## 8. 待处理积压（维护者关注建议）

| Issue | 年龄 | 状态 |
|---|---|---|
| [#14785](https://github.com/openclaw/openclaw/issues/14785) 工具 schema 固定 ~3500 token 开销 | 9 个月 | 无 fix PR，每会话隐性成本 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) Subagent 结果静默丢失 | 8 个月 | 需产品决策 |
| [#50093](https://github.com/openclaw/openclaw/issues/50093) WhatsApp 回填 | 8 个月 | 需产品决策 |
| [#126821](https://github.com/openclaw/openclaw/issues/126821) SQLite 反复损坏（P0） | 3 个月 | 数据丢失级，无 fix PR |
| [#89278](https://github.com/openclaw/openclaw/issues/89278) OAuth 10s 超时（P0） | 5 个月 | 无 fix PR |
| [#121953](https://github.com/openclaw/openclaw/issues/121953) DeepSeek 降权 `[cron:` 前缀 | 3 个月 | 一行前缀改动即可缓解，建议尽快 |

**健康度小结**：吞吐优秀、贡献体系成熟，但 P0 级稳定性积压（尤其 SQLite 完整性与自更新通道）与新性能回归若不在下个版本集中清偿，可能侵蚀用户信任。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告 — 2026-11-08

## 1. 生态全景

个人 AI 助手/自主智能体开源生态当前处于**高速扩张与稳定性还债并存的阶段**：两个头部项目日更新量均达 500+ Issue/PR 量级，社区贡献热情空前。技术上，“统一网关/多渠道接入”架构重构成为主线（OpenClaw 的 Gateway 与 Hermes 的 unified gateway 均处在大改后收敛期），同时插件化生态（Hermes Hackathon、OpenClaw 插件目录）成为第二增长曲线。共性痛点清晰：**静默失败、会话状态正确性、自更新/迁移可靠性**是跨项目的最大稳定性债务，用户对“可观测性缺失”的容忍度已到临界点。

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 421，关闭 79，关闭率 ~19%） | 500（新开/活跃 453，关闭 47，关闭率 ~9%） |
| PR 更新（24h） | 500（待合并 318，合并/关闭 182，合并率 ~36%） | 500（待合并 396，合并/关闭 104，合并率 ~21%） |
| Release | 无 | 无（v0.22.5 Windows 回归或催生补丁） |
| P0 问题 | 3 个无 fix PR（更新死锁、SQLite 损坏、OAuth 超时） | 无 P0，P1 一个且 fix（#150927）已提交 |
| 积压最老 Issue | 9 个月（#14785） | 8 个月（PR #2637） |
| 健康度评估 | **吞吐优秀但 P0 债务重**，数据丢失级风险（SQLite）未闭环 | **重构债集中但路径清晰**，Bug 增速超关闭速，Issue 治理压力大 |

**关键差异**：OpenClaw 的问题更具“存量性”（3 个 P0 均无 fix PR，长期悬置）；Hermes 的问题更具“增量性”（统一网关重构引入，且已有定向修复在路上）。

## 3. OpenClaw 在生态中的定位

**优势**：
- **渠道广度领先**：Telegram/WhatsApp/Signal/iMessage/Matrix/微信全覆盖，IM 接入是最主流使用形态，用户忠诚度高（深度源码级复现报告频出）
- **贡献管线成熟**：roboclaw-bot + clawtributors + size/proof/rating 标签体系，PR 合并率（36%）显著高于 Hermes（21%）
- **核心贡献者带动明确**：@steipete 集中推进 Control UI 性能，方向聚焦

**风险**：
- 3 个 P0 全部无 fix PR，其中 **#193962 更新死锁形成“修复无法触达用户”的恶性循环**——这会直接侵蚀信任
- 记忆系统核心机制失效（#150635 晋升机制）与 Subagent 结果静默丢失（#44925，8 个月）悬置过久

**技术路线差异**：OpenClaw 走“多渠道个人助手 + Gateway 中心化”路线，自托管（家庭服务器/WSL2/Docker）是主流部署；Hermes 走“多实例协作 + Kanban 任务编排”路线，更偏自动化重度用户。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent |
|---|---|---|
| **静默失败/消息丢失** | 跨四渠道最大抱怨（#125764、#50093、#101793、#112259） | "No reply"（#147839）、prompt 不送达（#146955）、结果丢弃（#145022） |
| **网关事件循环阻塞** | #119720（部分修复已落地） | #145022、#146643（fix #150927 已提交） |
| **会话状态正确性** | 排序语义修复组 PR（#194839 等）、幽灵通知（#194662） | 幽灵会话 "(Untitled)"（#143659）、空会话行（#140222） |
| **跨代理/多代理协作** | 多代理网关（#194837）、权限分级（#59149） | 跨网关 Bot 协作（#97681，40 评论）+ Ferry 插件已落地 |
| **上下文/token 成本** | 工具 schema 3500 token 开销（#14785） | delegate 上下文上限（#108891）、reasoning 双写（#125273） |
| **自更新/迁移可靠性** | 更新死锁（#193962）、迁移不收敛（#167557） | owed-restart 永不清除（#147873） |

**最强共识信号**：多代理协作基础设施——Hermes 的 Ferry 插件（git 基础 store-and-forward）与 #97681、OpenClaw 的多代理网关修复与 #59149 权限分级，双方都在向“代理互操作”演进。

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | IM 渠道接入、个人助手体验、记忆系统（dreaming/memroy_search） | Kanban 任务编排、Desktop 体验、多 profile 部署 |
| 目标用户 | 个人自托管用户（家庭服务器、单机多渠道接入） | 重度自动化/多实例运营者（Kanban worker、跨网关协作） |
| 架构关键点 | Gateway 中心 + 多 IM 桥接 + SQLite 持久化 | 统一网关 + worker 调度 + 插件系统（Agent Plugins v1） |
| 生态策略 | clawtributors 贡献管线（偏内部流程） | Hackathon 开放生态（Valun、Workspace、Signal Dog 等外部产出） |
| 质量债务分布 | 数据完整性与更新通道（P0 级） | 重构回归与会话状态（P1/P2 级） |

## 6. 社区热度与成熟度

- **活跃度分层**：两者均处第一梯队（500+/500+ 日更新），但**质量阶段不同**——OpenClaw 处于“高吞吐修复 + 性能打磨”的**质量巩固期**，重构基本完成，需清偿存量 P0；Hermes 处于统一网关大重构后的**快速迭代收敛期**，Bug 曲线尚未见顶。
- **治理能力对比**：OpenClaw 的 Issue 关闭率（~19%）是 Hermes（~9%）的两倍，流程更成熟；但 Hermes 的 P1 已有 fix PR 在途，响应定向性更好。
- **贡献者风险**：OpenClaw 对 @steipete 等个别核心贡献者依赖明显；Hermes 通过 Hackathon 在扩大贡献者基数。

## 7. 值得关注的趋势信号

1. **“可观测性优先”成为用户底线**：两项目最热讨论全部指向静默失败，而非功能缺失。对开发者的启示：**为代理系统构建重试 + 告警 + 状态审计**比加新功能的边际价值更高。
2. **多代理互操作是下一个竞争高地**：跨实例（Ferry）、跨网关（#97681）、权限分级（#59149）密集涌现，“个人代理间协作协议”可能成为 2027 年标准化的候选方向。
3. **插件化生态验证成功**：Hermes Hackathon 产出多样且覆盖 agent 间信贷交易等前沿场景，插件 API 设计将成为项目护城河。
4. **自更新通道是隐形 P0**：OpenClaw #193962 表明，修复若无法触达用户等于没修——智能体项目的分发/更新可靠性需作为一等工程问题对待。
5. **记忆系统是需求密度最高的功能域**：OpenClaw 记忆相关 Issue 五连发（召回、晋升、超时、页面化），长期记忆的正确性与成本管理是个人助手的核心差异点，值得作为下版本主题投入。

**对开发者的行动建议**：选型时若重 IM 个人助手场景选 OpenClaw（但评估 SQLite/更新风险），重任务编排与多实例自动化选 Hermes（但关注网关收敛进度）；两者共同的方向性机会在多代理协作协议与可观测性工具链。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-08

## 1. 今日速览

过去 24 小时 Hermes Agent 保持高活跃度：Issues 更新 500 条（新开/活跃 453，关闭 47），PR 更新 500 条（待合并 396，已合并/关闭 104），无新版本发布。讨论焦点集中在 **统一网关（unified gateway, #106742）合并后的回归问题**——涉及 Kanban 调度、会话持久化、Desktop 连接超时等多个 P1/P2 级问题。同时社区生态繁荣，Plugin Hackathon 带来大量插件目录提交（Valun、Google Workspace、Ferry、Signal Dog 等）。整体看，项目处于“大重构后收敛 Bug + 生态扩张”阶段，Issue 关闭率（约 9%）明显低于新增速度，稳定性治理压力上升。

## 2. 版本发布

无新版本发布。值得注意的是 v0.22.5（2026-10-23 发布）在 Windows 上暴露出 Kanban worker 提示不送达的回归（#146955），可能催生补丁版本。

## 3. 项目进展

今日合并/关闭的代表性 PR：

- [#150881](https://github.com/NousResearch/hermes-agent/pull/150881)（ci-reviewed）— 修复 Desktop/Webapp 中已删除的网关在重启后复活并抢占 primary 的问题，改善连接管理可靠性。
- [#150924](https://github.com/NousResearch/hermes-agent/pull/150924) — Desktop 错误 toast 现在展示对象型错误详情的可读 message，而非原始 JSON。
- [#150925](https://github.com/NousResearch/hermes-agent/pull/150925) — Webapp 测试连接与 SSH Connect 共用同一错误状态表，消除两处逻辑漂移。
- [#150419](https://github.com/NousResearch/hermes-agent/pull/150419) — 修复 Termux (linux-arm64-bionic) 上 pnpm 可执行文件缺失，恢复移动端 dashboard 构建。
- [#150900](https://github.com/NousResearch/hermes-agent/pull/150900) — **Ferry 插件**：基于 git 的跨实例 store-and-forward 任务交换，与 #97681（跨网关 Bot 协作）方向呼应。
- [#150364](https://github.com/NousResearch/hermes-agent/pull/150364) — JS workspace 拒绝 npm 安装、保留 npx/npm run，巩固 pnpm 迁移。

整体推进：以 Desktop/网关连接稳定性修复 + 插件生态扩容为主，与主线大重构（统一网关）的收敛工作并行。

## 4. 社区热点

1. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（54 评论）** — 统一网关合并后 main 分支遗留问题汇总帖，覆盖 CLI/TUI/Desktop/Telegram/Discord/cron 等几乎所有表面。这是当前项目最重要的大重构收敛跟踪 Issue，社区集中在此回报回归。
2. **[#97681](https://github.com/NousResearch/hermes-agent/pull/97681) / [issue 97681](https://github.com/NousResearch/hermes-agent/issues/97681)（40 评论，4 👍）** — “让 Bot 跨网关协作”：个人代理跨机器、未来跨所有者协作的基础设施。与已合并的 Ferry 插件（#150900）形成路线图呼应，是社区最期待的架构方向。
3. **[#129455](https://github.com/NousResearch/hermes-agent/issues/129455)（24 评论）** — 测试套件在默认安装下因 import-time PM 探测触发 home_io_guard 而大面积失败，影响贡献者入门体验。
4. **[#119070](https://github.com/NousResearch/hermes-agent/issues/119070)（23 评论）** — Kanban 卡片因一次限流被永久标记为 blocker_auth，reviewer 永不生成，自动化流水线卡死。
5. **[#122609](https://github.com/NousResearch/hermes-agent/issues/122609)（20 评论）** — Skills Hub 索引新鲜度退化（28.1h > 26h 上限），CI 定时重建未按时运行。

## 5. Bug 与稳定性（按严重度）

| 严重度 | 问题 | 状态 |
|---|---|---|
| **P1** | [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban worker 因网关事件循环卡顿崩溃（"execution unknown; retained by owner"），一次卡顿杀死 4 个 worker，工作进行中丢失 | 相关 fix：[#150927](https://github.com/NousResearch/hermes-agent/pull/150927)（将 worker claim/verify 移出事件循环）已提交 |
| **P2** | [#146955](https://github.com/NousResearch/hermes-agent/issues/146955) Windows v0.22.5：Kanban worker 已绑定但 prompt 永不送达，read_frame 空转至超时（v0.22.2→v0.22.5 回归） | 待 fix |
| **P2** | [#146643](https://github.com/NousResearch/hermes-agent/issues/146643) 网关在每次变更时重读全部会话历史，数千会话时占用 1.5-2.5 CPU 核，Desktop 请求 30s 超时 | 待 fix |
| **P2** | [#147839](https://github.com/NousResearch/hermes-agent/issues/147839) 单次 20s worker_receipt_timeout 毒化存储，整轮对话报 "No reply" | 待 fix |
| **P2** | [#137838](https://github.com/NousResearch/hermes-agent/issues/137838) macOS 网关在 missed liveness probe 后反复 exit 75（根因未确认，原诊断已撤回） | 调查中 |
| **P2** | [#149861](https://github.com/NousResearch/hermes-agent/issues/149861)（已关闭）pnpm 12.15.0 静默丢弃 get-windows 可选依赖，macOS Desktop 构建失败 | 已处理 |
| **P2** | [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) browser_exec 每次调用遗留永不过期的 browser_harness 守护进程 | 待 fix |
| **P2** | [#140222](https://github.com/NousResearch/hermes-agent/issues/140222) 带 monitor 的 cron agent 任务每次 tick 都在 state.db 写入空会话行 | 待 fix |
| **P2** | [#136486](https://github.com/NousResearch/hermes-agent/issues/136486) / [#125273](https://github.com/NousResearch/hermes-agent/issues/125273) reasoning 字段别名冲突致 HTTP 400；reasoning token 在 state.db 双重存储（存储翻倍） | 待 fix |
| **P2** | [#143659](https://github.com/NousResearch/hermes-agent/issues/143659) TUI 启动即写 0 消息会话行，会话选择器充满 "(Untitled)" 幽灵项 | 待 fix |
| **P2** | [#147873](https://github.com/NousResearch/hermes-agent/issues/147873) 更新后 owed-restart 义务永不清除，CLI 每次打印误导性警告 | 待 fix |

**趋势判断**：P1/P2 问题高度集中在统一网关改造波及的会话状态与 Kanban 调度路径，#150927 若合并可缓解 #145022 和 #146643 的一部分。

## 6. 功能请求与路线图信号

- **跨实例/跨所有者 Bot 协作**（[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)，40 评论）— 已有 Ferry 插件（#150900）落地雏形，社区呼声高，大概率进入主线规划。
- **提供方 5xx 触发 fallback 链**（[#68771](https://github.com/NousResearch/hermes-agent/issues/68771)）— 请求量不大但实现成本低、收益明确，有希望纳入下个补丁版本。
- **Desktop 拼写检查**（[#48375](https://github.com/NousResearch/hermes-agent/issues/48375)，13 👍）与 **选中文字浮动引用按钮**（[#52554](https://github.com/NousResearch/hermes-agent/issues/52554)，4 👍）— 长期高 👍 的 Desktop 体验需求。
- **Profile 间记住上次会话**（[#77952](https://github.com/NousResearch/hermes-agent/issues/77952)）、**Slack 按频道严格 mention 门控**（[#84366](https://github.com/NousResearch/hermes-agent/issues/84366)）— 细分场景改进。
- **delegate 子代理上下文上限随模型窗口扩展**（[#108891](https://github.com/NousResearch/hermes-agent/issues/108891)）— 对长窗口模型用户影响直接。
- **i18n**：[#105163](https://github.com/NousResearch/hermes-agent/issues/105163) 防卡死意图检测仅支持英文，非英文代理失去 anti-stall 保护——国际化信号明确。

## 7. 用户反馈摘要

- **Kanban/自动化用户**是当前最痛苦的群体：卡片卡死（#119070）、worker 崩溃丢工作（#145022）、prompt 不送达（#146955）、单次超时毁掉整轮（#147839）——多实例、多 profile 的重度部署受影响最大。
- **Desktop 用户**抱怨升级后超时与构建失败（#146643、#149861），以及琐碎但恼人的体验问题（幽灵会话、拼写检查缺失、引用操作不便）。
- **大窗口/本地模型用户**反馈上下文预算（#108891）和 reasoning 双写（#125273）让长会话成本和存储翻倍。
- **积极面**：社区对插件生态响应热烈，Hackathon 产出多样（agent 间信贷交易 Valun、Google Workspace 集成、声音监听 Signal Dog、模型自动选择 Vipernet），说明 Agent Plugins v1 的扩展性获得认可。

## 8. 待处理积压

- [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) — 统一网关收敛跟踪帖，54 评论、横跨 15 个组件标签，建议维护者优先梳理出可执行的子任务清单。
- [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) — 开放 46 天，标记 needs-decision，Kanban 调度器永久卡死问题需要决策。
- [#68771](https://github.com/NousResearch/hermes-agent/issues/68771) — 开放近 4 个月，低成本高收益，长期无人认领。
- [#121095](https://github.com/NousResearch/hermes-agent/issues/121095) — 浏览器守护进程泄漏，开放 44 天，随使用时长持续累积资源占用。
- [#75130](https://github.com/NousResearch/hermes-agent/issues/75130) — skill 提案队列无限增长（8 天 357 条、21% 失效），对启用审批流的生产部署构成隐患。
- [#2637](https://github.com/NousResearch/hermes-agent/pull/2637) — `!cmd` 快速 shell 命令 PR 开放近 8 个月，涉及安全边界（sweeper:risk-security-boundary）标注意味着需要维护者明确表态。

**健康度小结**：贡献与社区参与极为活跃（500+ Issue/PR 日更新），但 Bug 新增速度远超关闭速度，统一网关重构的稳定性债是当前最大风险项；建议优先合并 #150927 类事件循环修复，并为 Windows（#146955）尽快发布补丁版本。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*