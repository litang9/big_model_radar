# OpenClaw 生态日报 2026-10-19

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-18 22:24 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-19

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时内 Issue 更新达 500 条（新开/活跃 441，关闭 59），PR 更新 500 条（待合并 307，已合并/关闭 193），并发布了新版本 **v2026.10.5**。核心贡献者 @steipete 今日提交了大量重构与性能优化 PR（超过 15 个），重点集中在 Web UI 生命周期治理、SQLite 启动开销削减和 MCP SDK v2 迁移。社区侧，长期存在的 Gateway 稳定性问题（内存泄漏、SQLite 损坏、事件循环阻塞）仍是讨论焦点。总体来看，项目处于"快速迭代 + 偿还技术债"并行阶段，健康度良好但 P0 级稳定性债务需要优先清偿。

## 2. 版本发布

### v2026.10.5

**核心更新：更新流程自治恢复**

- **`openclaw update` 全平台自愈完成**：修复了跨设备、跨文件系统、pnpm 12、Windows 提权（elevation）、macOS login shell 等场景下更新中断的问题
- **不再搁浅安装**：自动清理陈旧的 handoff lease 与 package-activation journal，替代之前将安装遗留在半完成状态的行为
- 对繁忙或无响应的组件（busy/unhealthy）有相应处理策略（发布说明截断，详见 Release 页）

**迁移注意**：从 2026.10.x 之前的版本升级时，建议升级后执行一次 `openclaw doctor` 确认安装状态；此前被中断过的更新建议手动检查残留 lease。

## 3. 项目进展

今日 PR 活动以 @steipete 为主导，呈现明显的"系统性清理"策略：

**架构级重构**
- [#175403](https://github.com/openclaw/openclaw/pull/175403) — MCP session/node 客户端迁移至 SDK v2（XL，已 ready for maintainer look），完成内部 client、transport、OAuth、validator 全链路迁移，为未来 MCP 协议升级铺路
- [#175805](https://github.com/openclaw/openclaw/pull/175805) — 简化 state lease 心跳存活协议，回收已关闭清理 PR 的重叠区域
- [#176545](https://github.com/openclaw/openclaw/pull/176545) — 削减 SQLite 启动重复工作（连接策略 SQL 与 schema-cookie 重复读取）

**关键修复**
- [#176192](https://github.com/openclaw/openclaw/pull/176192)（P1）— 外部插件在 capture/restore 失败重载期间阻塞 Gateway HTTP 请求的问题，直指多条可用性 Issue
- [#175686](https://github.com/openclaw/openclaw/pull/175686) — 修复 `plugins reload --wait` 无限期阻塞新 agent run 的问题（关联 #173061）
- [#176511](https://github.com/openclaw/openclaw/pull/176511) — 修复 cron 隔离 run 结束后排队的 exec completion 丢失
- [#176422](https://github.com/openclaw/openclaw/pull/176422)（已关闭）— 定时 follow-up 丢失授权任务访问权限

**Web UI 功能**
- [#176546](https://github.com/openclaw/openclaw/pull/176546) / [#176552](https://github.com/openclaw/openclaw/pull/176552) — 远程桌面（Remote Desktop）面板控制与连接状态精化、viewport 适配
- [#176535](https://github.com/openclaw/openclaw/pull/176535) — 会话预览中展示委派子任务产出的 PR

**CI 修复**
- [#176447](https://github.com/openclaw/openclaw/pull/176447) / [#176562](https://github.com/openclaw/openclaw/pull/176562) — 修复 main 分支 `check-dependencies` 因 reply-admission 重构遗留孤儿导出而失败

整体来看，今日推进了约 190+ 个 PR 的合并/关闭，MCP SDK v2 迁移接近落地，Gateway 可用性修复（插件阻塞系列）是最有价值的用户可感知进展。

## 4. 社区热点

| Issue | 评论 | 热点核心 |
|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) Gateway 内存泄漏（P0） | 40 | RSS 从 350MB 涨至 15.5GB，2-3 天内被 OOM killer 反复击杀，引发 launchd-handoff 重启循环。自 6 月开帖至今仍是最高热度 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) Subagent 结果静默丢失（P1） | 31 | 多种失败模式下任务完成无重试、无通知、无自动重启，直接影响多 agent 编排可靠性 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) 同步持久化阻塞事件循环（P1） | 25 | 帖内更新显示 #140231/#138984 已落地部分修复，社区在持续追踪剩余部分 |
| [#48003](https://github.com/openclaw/openclaw/issues/48003) Steer 模式不注入消息（P1，👍4） | 20 | 根因已定位到 3 月的 `KeyedAsyncQueue` 引入，有 linked PR 开放中 |
| [#22438](https://github.com/openclaw/openclaw/issues/22438) 分层 Bootstrap 加载（P2 feature） | 19 | 大工作区用户对上下文 token 浪费的强烈诉求 |

**诉求分析**：热点高度集中在**可靠性**（消息不丢、内存不漏、会话状态不坏）与**成本控制**（token 浪费、缓存失效），反映出用户已将 OpenClaw 用于长期生产环境，对"静默失败"的容忍度极低。

## 5. Bug 与稳定性（按严重度）

**P0 级**
- [#91588](https://github.com/openclaw/openclaw/issues/91588) Gateway 内存泄漏致 OOM 循环 — ⚠️ 无 fix PR（`no-new-fix-pr` 标签），已持续 4 个月+
- [#40001](https://github.com/openclaw/openclaw/issues/40001) Write 工具无 append 模式，隔离 cron 会话覆写共享文件造成数据丢失 — 无 fix PR
- [#126821](https://github.com/openclaw/openclaw/issues/126821) WSL2 下全新 SQLite 库 15-24h 内再次损坏，5 天 5 次，含"瘫痪但拒绝退出"模式 — 无 fix PR
- [#56217](https://github.com/openclaw/openclaw/issues/56217) Secret provider 崩溃循环耗尽 1Password 速率限制 — 无 fix PR
- [#137085](https://github.com/openclaw/openclaw/issues/137085) macOS App 8.2 升级后设备身份卡在 "native-importing"（release blocker）— 无 fix PR
- [#137177](https://github.com/openclaw/openclaw/issues/137177) 内置 WeCom 插件 2026.7.2 无法安装（P0，release blocker）

**P1 级**
- [#164799](https://github.com/openclaw/openclaw/issues/164799) 版本变更后 agent 逐个准入耗时数分钟、readyz 503 — 今日活跃 14 评论
- [#134993](https://github.com/openclaw/openclaw/issues/134993) 2026.8.1 升级后大 fleet 下 Gateway 单核 busy loop
- [#159499](https://github.com/openclaw/openclaw/issues/159499) Windows 上 `ready` 耗时 220s，插件注册两阶段占 175s
- [#143581](https://github.com/openclaw/openclaw/issues/143581) Signal 入站消息卡 spool 重试循环 ~23 小时
- [#112259](https://github.com/openclaw/openclaw/issues/112259) 入站消息零负载分发被静默丢弃，无重试/死信
- [#135704](https://github.com/openclaw/openclaw/issues/135704) iMessage 带 `reply_to_guid` 的反射消息绕过 echo 缓存
- [#132303](https://github.com/openclaw/openclaw/issues/132303) 🔒 安全：`tools.deny` 对 claude-cli 后端不生效，被禁工具仍可用

**已修复/已关闭**
- [#136183](https://github.com/openclaw/openclaw/issues/136183)（已关闭）— 2026.8.1 起 command executor 挂起 ssh 的回归，main 上无法复现
- [#175027](https://github.com/openclaw/openclaw/issues/175027)（已关闭）— Android realtime Talk 绑定已归档会话
- [#129455](https://github.com/openclaw/openclaw/issues/129455)（已关闭）— requester-settle 过早终结顺序工作流

## 6. 功能请求与路线图信号

**有 PR 支撑、落地可能性高**
- 分层 Bootstrap 加载（[#22438](https://github.com/openclaw/openclaw/issues/22438)）— 符合当前 token 成本优化主线
- Steer 模式修复（[#48003](https://github.com/openclaw/openclaw/issues/48003)）— 已有 linked PR
- Feishu collect 模式队列修复（[#54409](https://github.com/openclaw/openclaw/issues/54409)）— linked PR 开放中
- 远程桌面 UI — PR #176546/#176552 表明已是进行中的正式功能

**呼声高但待产品决策**
- [#76493](https://github.com/openclaw/openclaw/issues/76493)（👍4）`mcp.servers[].env` 支持 SecretRef — 安全最佳实践受阻，标注 needs-security-review
- [#10687](https://github.com/openclaw/openclaw/issues/10687)（👍4）OpenRouter 等动态模型发现
- [#6757](https://github.com/openclaw/openclaw/issues/6757) Agent 自触发上下文压缩（由 agent 自己提交的 feature request，颇具项目特色）
- [#158898](https://github.com/openclaw/openclaw/issues/158898) Runtime context 每次重建追加导致前缀缓存永远失效 — 对 DeepSeek 等按缓存计费 provider 成本影响巨大，建议关注
- [#55792](https://github.com/openclaw/openclaw/issues/55792) Gateway 重启后补偿错过的入站消息

## 7. 用户反馈摘要

**痛点（按提及频率）**
1. **静默失败是最大敌人**：消息丢失（#44925、#112259）、结果丢弃均无任何用户可见信号，用户需自行翻日志排查
2. **升级体验差**：Windows 启动 220s（#159499）、macOS 升级身份卡死（#137085）、版本变更后 readyz 503（#164799）——多个平台升级路径都有拦路虎
3. **长会话退化**：15+ 轮对话后工具参数被静默丢弃（#53408）
4. **多 agent 并发不可靠**：config 覆写、session-lock 失败（#43367）

**满意点**
- 社区肯定 #119720 中已落地的部分修复与维护者透明的根因更新
- #136183 ssh 回归在 main 上不复现后被关闭，响应及时
- Agent 自助报障/提需求的机制（如 #164799、#6757）运转顺畅

**典型场景画像**：用户以 self-hosted Gateway + Telegram/Signal/Discord/iMessage 多通道 + cron 定时任务 + 多 agent 编排为主，属重度生产使用。

## 8. 待处理积压（提醒维护者关注）

| Issue | 积压时长 | 风险 |
|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) P0 内存泄漏 | 4 个月+，40 评论，无 fix PR | 最高优先级，直接导致生产不可用 |
| [#128140](https://github.com/openclaw/openclaw/issues/128140) memory_search 工具 15s 必超时 | 近 2 个月，needs-live-repro | 核心功能不可用，建议安排复现 |
| [#55792](https://github.com/openclaw/openclaw/issues/55792) 重启后消息补偿 | 7 个月，已标 stale | 高价值 feature，stale 前请给出路线图判断 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) Subagent 静默丢失 | 7 个月 | 多 agent 是项目核心卖点，长期不修损害定位 |
| [#53628](https://github.com/openclaw/openclaw/issues/53628) XDG_CONFIG_HOME 不生效 | 7 个月，needs-info | Docker 用户的安装路径直接受影响 |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) 长对话参数丢失 | 7 个月 | 影响所有重度用户 |
| [#63112](https://github.com/openclaw/openclaw/pull/63112) cron shell 命令警告 PR | 6 个月，waiting on author | 社区 PR 等待作者响应，建议维护者介入推进或关闭 |
| [#59414](https://github.com/openclaw/openclaw/pull/59414) doctor Node 生命周期建议 | 6 个月+ | 同上 |

**健康度小结**：Issue 关闭率（59/500 ≈ 12%）相对新开量偏低，P0 稳定性债务（内存泄漏、SQLite 损坏）积累时间过长，建议在下一个 minor 版本前集中清偿；PR 侧维护者产出质量与节奏优秀，307 个待合并 PR 中大量处于 "waiting on author" 状态，triage 流程运转正常。

---

## 横向生态对比

# 个人 AI 助手/智能体开源生态横向对比分析报告（2026-10-19）

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已从“可运行的原型”全面进入“生产化攻坚”阶段：两大头部项目（OpenClaw、Hermes Agent）日均 Issue/PR 活动均达 500 条量级，说明用户基数和贡献规模已具备成熟开源基础设施项目的特征。生态的注意力重心正从功能扩张转向**可靠性工程**——内存泄漏、静默消息丢失、SQLite 损坏、更新失败恢复等长周期运行问题成为两大项目共同的最高热度议题。同时，多通道消息接入（Telegram/Signal/iMessage/WeCom/Feishu）、MCP 协议升级、多 agent 编排与 token 成本控制构成清晰的下一阶段技术主线。整体上，这是一个用户已重度投入生产、对“静默失败”容忍度极低的生态。

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 441，关闭 59） | 471（新开/活跃 411，关闭 60） |
| PR 更新（24h） | 500（待合并 307，合并/关闭 193） | 500（待合并 379，合并/关闭 121） |
| Release | **v2026.10.5**（更新流程自愈） | 无（主线为统一网关合并后修复） |
| 核心主线 | 技术债清偿 + MCP SDK v2 迁移 + Web UI | #106742 统一网关合并后回归修复（追踪帖 185 评论） |
| Issue 关闭率 | ~12%，偏低 | ~13%，但有分片打包收敛机制 |
| 安全类积压 | tools.deny 绕过（#132303）等，多个 P0 无 fix PR | 2 项 7 月起 needs-decision（#59293、#62336） |
| 健康度评估 | **B+**：产出节奏优秀，但 P0 债务（内存泄漏 4 个月+）积压过久 | **B**：修复收敛速度快，但大合并引入回归面宽，PR review 吞吐压力大（379 待合并） |

## 3. OpenClaw 在生态中的定位

**优势**：
- **迭代节奏与发布纪律**：在 24h 合并/关闭 193 个 PR 的同时仍保持版本发布节奏（v2026.10.5），明显快于 Hermes Agent 的 121 个
- **系统性技术债治理能力**：@steipete 单日 15+ 重构 PR（MCP SDK v2 全链路迁移、state lease 协议简化、SQLite 启动开销削减），显示核心维护者深度投入
- **架构前瞻性**：MCP SDK v2 迁移、远程桌面面板、分层 Bootstrap 加载均指向长期成本与扩展性

**技术路线差异**：OpenClaw 走“Gateway 中心化 + 多通道消息 + 多 agent 编排”的 self-hosted 重度生产路线；Hermes Agent 正通过统一网关运行时收敛架构，处于一次大合并（#106742）后的消化期，且保留了 Desktop/TUI 双端和更活跃的插件 catalog 机制。

**社区规模**：两者 Issue/PR 流量同级（均触顶 500/日），但 OpenClaw 的 issue 编号体量（17 万级 PR）和单 issue 热度（#91588 40 评论、4 个月）显示更长周期、更深的生产使用沉淀。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent |
|---|---|---|
| **更新/升级可靠性** | v2026.10.5 全平台自愈更新；Windows 启动 220s（#159499）、macOS 身份卡死（#137085） | #125437 Windows 半安装无恢复（本周 15 个 Discord 帖），fix PR #135806 待合并 |
| **静默失败/消息可靠性** | Subagent 结果静默丢失（#44925，7 个月）、入站消息无重试/死信（#112259） | cron 误报送达（#121786 已修复）、消息顺序回归（包 10） |
| **内存/资源泄漏** | Gateway RSS 350MB→15.5GB OOM 循环（#91588，P0，4 个月+） | 网关内存 provider 线程/fd 无限增长（PR #137156）、Dashboard 回归 +300-400MB（#58694） |
| **Token/上下文成本** | 分层 Bootstrap 加载（#22438）、前缀缓存永远失效（#158898） | —（相对缺位，属 OpenClaw 差异化关注点） |
| **多 agent 编排** | Subagent 静默丢失、config 覆写、session-lock 失败 | A2A 协议诉求（#514，29 👍 已关闭，去向待观察） |
| **凭据/安全** | tools.deny 不生效（#132303）、SecretRef 诉求（#76493） | config set 绕过写保护、环境变量凭据落盘、CVE 依赖锁定 |
| **cron 定时任务隔离** | #40001 覆写共享文件、#176511 exec completion 丢失 | #100908/#121786 证据门扩展 |

**结论**：更新链路可靠性、静默失败可观测性、长周期资源泄漏是双项目共同的三大债务，可视为整个品类的共性难题。

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多通道消息网关（Telegram/Signal/iMessage/WeCom/Feishu）、远程桌面、多 agent 编排、cron | Desktop/TUI 双端体验、webapp 浏览器渲染器（PR #93508）、插件 catalog、MoA |
| 目标用户 | 重度 self-hosted 生产用户（大 fleet、长期运行、多通道接入） | 桌面端个人用户 + 插件开发者群体，配置体验更受关注 |
| 技术架构 | Gateway 中心化，SQLite 状态层，MCP SDK v2 | 刚完成统一网关运行时大合并，处于架构收敛期 |
| 治理风格 | 维护者高质量产出主导，agent 自助报障机制有特色 | 分片打包（每日一分片）的工业化修复流程 |

## 6. 社区热度与成熟度

- **快速迭代 + 债务清偿并行（OpenClaw）**：发布节奏快、功能持续落地（远程桌面、MCP v2），但 P0 稳定性债务（#91588、#126821）积压 4 个月+，属“功能领先、稳定性欠账”型。
- **质量巩固期（Hermes Agent）**：统一网关合并后回归面宽（仅包 10 就新增 41 项发现），但收敛速度快（包 2 一周清零），属“大重构后快速修复”型。
- **共同风险**：安全类决策积压（两边均有 2-3 项长期 needs-decision）、待合并 PR 堆积（合计近 700 条）、Issue 关闭率均 ~12-13%，triage 能力接近饱和。

## 7. 值得关注的趋势信号

1. **“可靠性即差异化”**：两大项目最高热度议题全是静默失败、OOM、数据损坏——用户已把这类工具当生产基础设施，可观测性（重试/死信/用户可见失败信号）是下一轮竞争焦点。
2. **更新器是被低估的关键组件**：跨平台更新自愈（OpenClaw v2026.10.5、Hermes #135806）同时成为投入重点，"update 是第一印象功能"正在成为共识。
3. **Token 成本工程化**：分层 Bootstrap、前缀缓存稳定性（#158898 对 DeepSeek 等按缓存计费 provider 影响巨大）预示“上下文结构决定成本”将成为架构约束。
4. **MCP 与互操作标准化**：OpenClaw 抢先迁移 SDK v2，Hermes 社区强烈呼吁 A2A（29 👍）——协议层标准化是智能体生态的确定性方向。
5. **Agent 自助运维兴起**：agent 自己提 feature request / 报障（OpenClaw #6757、#164799）标志着工具已深度嵌入自身开发流程，开发者应把“agent 可用性”纳入产品设计。
6. **安全边界提级需求**：凭据落盘、审批绕过、工具禁用失效等问题在两个项目同时长期搁置，安全决策流程将成为社区信任的关键变量。

**给开发者的建议**：选型上，重度多通道生产场景优先 OpenClaw（但需规避 Gateway 内存泄漏场景的监控盲区）；桌面端/插件生态偏好则 Hermes Agent 更契合。无论哪条路线，自建时务必配套内存监控、消息投递审计与更新回滚方案。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 · 2026-10-19

## 1. 今日速览

过去 24 小时 Hermes Agent 呈现**高活跃度**状态：Issues 更新 471 条（新开/活跃 411，关闭 60），PR 更新 500 条（待合并 379，已合并/关闭 121），无新版本发布。当前最核心的主线是 **统一网关运行时（#106742，已合并至 main）的合并后修复追踪（#134889）**，正通过打包分片（package）方式推进，评论数高达 185 条，占据社区绝大部分注意力。同时安全类问题（配置写入绕过审批层、凭据环境变量落盘、CVE 依赖锁定）和更新失败的恢复体验问题持续获得讨论。

---

## 2. 版本发布

今日无新版本发布。最新代码主线为 10 月 14 日合并的 `feat/unified-gateway-runtime`（merge commit `eb75627f`），当前处于大规模合并后修复阶段，预计下一个版本将以此为核心。

---

## 3. 项目进展

今日 PR 活动以统一网关修复包与独立 bug fix 为主，合并/关闭 121 条：

- **#139160（已关闭）Gateway 修复包 2**：会话创建、模型选择与凭据相关问题全部修复或确认非回归，@teknium1 已发布总结，是修复追踪线的首个完整落地分片。
- **#125464（已关闭）日志轮转配置修复**：`errors.log` / `gateway.log` / `gui.log` 此前硬编码大小，现统一从 `logging.*` 配置读取。
- **#121786（已关闭）cron 独立投递通道补上证据门**：将 #100908 的正向投递证据校验扩展到 standalone 投递路径，修复消息误报送达的问题。
- **修复追踪包 3（#139161）进行中**：19 项 Ink TUI/Desktop 会话问题中 5 项已在 main 修复（#139483、#139884）。
- **修复追踪包 10（#140719）已关闭**：收集了 10 月 17 日后新报告的 41 项发现，覆盖网关进程、会话列表、消息顺序等 5 条泳道。

**评估**：统一网关修复以“每日一分片、快速关闭”的节奏推进（包 2 已完成、包 3 过半、包 10 已归档），合并后质量收敛速度较快，但总量大（仅包 10 就新增 41 项发现），说明 #106742 引入的回归面较宽。

---

## 4. 社区热点

| 议题 | 评论 | 焦点 |
|---|---|---|
| [#134889 统一网关合并后修复追踪](https://github.com/NousResearch/hermes-agent/issues/134889) | 185 | P0 追踪主帖，所有网关/session 修复的调度中枢 |
| [#131859 贡献者无法通过 API 创建 PR](https://github.com/NousResearch/hermes-agent/issues/131859) | 44 | 特定账户 `CreatePullRequest` 权限报错，标记 blocked，影响外部贡献 |
| [#107402 `hermes update` 永久残留重启警告](https://github.com/NousResearch/hermes-agent/issues/107402) | 26 | 更新器在延迟重启场景下立即校验 fleet 导致 `state: stale` |
| [#514 A2A 协议支持（已关闭）](https://github.com/NousResearch/hermes-agent/issues/514) | 25 评论 / 29 👍 | Agent 互操作性需求强烈，关闭状态值得关注是否已有替代方案 |
| [#7335 开放 Issue 超 1000 的治理讨论](https://github.com/NousResearch/hermes-agent/issues/7335) | 18 | 社区对 Issue 增长失控的担忧 |

**诉求分析**：社区注意力集中在两件事——统一网关合并后的实际可用性，以及贡献通道（#131859）与 Issue 治理（#7335）的流程健康度。

---

## 5. Bug 与稳定性（按严重程度）

**P0**
- [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) 统一网关回归总追踪 —— 修复进行中（#139160 已关闭，#139161 等分片推进中）

**P1**
- [#125437 更新失败留下半安装状态且无恢复路径](https://github.com/NousResearch/hermes-agent/issues/125437) —— Windows 重灾区，本周 15 个 Discord 帖；**已有 fix PR [#135806](https://github.com/NousResearch/hermes-agent/pull/135806)（先解析更新源再 fetch）待合并**

**P2**
- [#59293 `hermes config set` 绕过系统配置写保护（安全）](https://github.com/NousResearch/hermes-agent/issues/59293) —— 无 fix PR，标记 needs-decision
- [#62336 终端环境快照将含凭据的环境变量写入磁盘（安全）](https://github.com/NousResearch/hermes-agent/issues/62336) —— 无 fix PR
- [#137944 edge-tts 7.2.7 因微软 token 轮换全面 403](https://github.com/NousResearch/hermes-agent/issues/137944) —— 上游 7.3.0 已修复，等待解除精确锁定
- [#131375 smart-approval guardian 在事件循环线程崩溃](https://github.com/NousResearch/hermes-agent/issues/131375) —— Desktop 所有标记命令被迫升级人工审批
- [#132817 单次 429 冷却使凭据停摆数天](https://github.com/NousResearch/hermes-agent/issues/132817)
- [#139161 包 3 剩余 14 项 TUI/Desktop 回归](https://github.com/NousResearch/hermes-agent/issues/139161)
- [#137156（PR）网关内存 provider 线程/fd 随缓存 churn 无限增长](https://github.com/NousResearch/hermes-agent/pull/137156)

**P3**
- [#122424 js-yaml/yaml 锁定在 CVE 区间（安全）](https://github.com/NousResearch/hermes-agent/issues/122424)
- [#123926 插件启动时随机静默加载失败](https://github.com/NousResearch/hermes-agent/issues/123926)

---

## 6. 功能请求与路线图信号

- **[#93508（PR）`hermes webapp` 浏览器托管 Desktop 渲染器](https://github.com/NousResearch/hermes-agent/pull/93508)** —— 大型 feature PR 持续活跃，标签覆盖 desktop/dashboard/web，是最可能的下一版本重磅功能。
- **[#67347 子代理模型/供应商引导式选择器](https://github.com/NousResearch/hermes-agent/issues/67347)** —— 配置体验改进，与统一网关的 profile 体系契合，纳入概率较高。
- **[#58414 Desktop 增加 MCP/skill 重载控件](https://github.com/NousResearch/hermes-agent/issues/58414)**、**[#11347 `/detach` 后台运行](https://github.com/NousResearch/hermes-agent/issues/11347)** —— 诉求明确、实现面小，属低垂果实。
- **A2A 协议（#514，已关闭，29 👍）** —— 关闭去向需关注是否转入新追踪或被网关架构吸收。
- 插件生态持续活跃：[#141282 hermes-jetstream 1.2.0](https://github.com/NousResearch/hermes-agent/pull/141282)、[#127194 orquehelx 目录条目](https://github.com/NousResearch/hermes-agent/pull/127194)。

---

## 7. 用户反馈摘要

- **更新是最大痛点**：Windows 用户半安装、`pydantic_core` 缺失、raw error 无恢复路径（#125437），所有修复都是“手打配方”，用户明确要求产品内恢复向导。
- **凭据与限流不透明**：一次 429 让凭据停摆数天且无任何提示（#132817），用户不知道 `hermes auth reset` 的存在。
- **反馈缺失的“假死”体验**：MoA fan-out 期间零 UI 反馈（#71243）、TUI 状态条冻结至回合结束（#18260），用户无法区分慢与挂。
- **安全相关用户困扰**：内容扫描器把安全文档误判为攻击（#84672），惩罚“写得越准的文档”。
- **满意点**：社区修复响应速度（网关包 2 一周内清零）、插件生态与 catalog 机制获认可。

---

## 8. 待处理积压

| 条目 | 状态 | 建议 |
|---|---|---|
| [#131859 API 创建 PR 权限错误](https://github.com/NousResearch/hermes-agent/issues/131859)（10-03 起，blocked） | 44 评论 | 直接阻断外部贡献，需 GitHub 侧或维护者介入 |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293)、[#62336](https://github.com/NousResearch/hermes-agent/issues/62336) 安全问题（7 月起，needs-decision） | 长期未决 | 安全边界决策应提级 |
| [#83047 kanban `blocker_auth` 任务永久卡死](https://github.com/NousResearch/hermes-agent/issues/83047)（8 月起） | needs-decision | 影响任务调度可用性 |
| [#76767 Telegram 会话桌面端回复不送达](https://github.com/NousResearch/hermes-agent/issues/76767)（8 月起） | 归属 #134889 追踪 | 确认是否纳入后续修复包 |
| [#58694 Dashboard 内存回归 ~300-400MB](https://github.com/NousResearch/hermes-agent/issues/58694)（7 月起） | 无 fix PR | 资源受限用户受影响严重，需轻量模式决策 |
| PR [#125464 等已关闭，但 #135806（更新源修复）、#138530（网关重启顺序）等高价值 PR 待合并 | open | 建议优先 review，缓解 P1 更新失败问题 |

**健康度总结**：项目处于“大合并后高强度修复期”，Issue 流量大但关闭机制（分片打包）运转有效；风险点在于安全类决策积压、更新链路可靠性以及 379 条待合并 PR 的 review 吞吐压力。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*