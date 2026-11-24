# OpenClaw 生态日报 2026-11-24

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-24 04:45 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-24

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时 Issue 更新 500 条（新开/活跃 334，关闭 166），PR 更新 500 条（待合并 296，已合并/关闭 204），关闭率约 33%（Issue）与 41%（PR），处理吞吐健康。项目连发两个 beta 版本（2026.11.10-beta.2 / beta.3），主线聚焦**更新可恢复性与后台任务可靠性**，为 2026.11.10 正式版铺路（release notes PR #204158 已在推进）。社区侧，Prompt Cache 复用失效、Gateway 内存泄漏与多 agent 委派失败仍是三大高热度痛点，且多个 P0 级 issue 尚无 fix PR，需引起维护者关注。

## 2. 版本发布

**[v2026.11.10-beta.3](https://github.com/openclaw/openclaw/releases)**（最新）
- **Update recovery**：包与源码更新中断后可恢复，覆盖跨 schema 变更与机器重启场景（#200273 / #200366 / #200460 / #200866 / #200994 / #201600，感谢 @fuller-stack-dev）
- **Reliable delegated work**：改进委派任务（后台任务结果保存）的可靠性

**[v2026.11.10-beta.2](https://github.com/openclaw/openclaw)**
- 包替换被中断时保持 OpenClaw 可运行，崩溃/重启后由下一次更新安全完成（#200273 / #200366 / #200460 / #200550 / #200994）
- 后台任务：保留已完成的结果

**迁移提示**：两个 beta 均为更新链路加固，无明确破坏性变更；但注意 macOS 上 App 版本领先于 npm Gateway 时会出现 schema migration 拒绝（见 #201468），升级前建议保持 App 与 Gateway 版本对齐。

## 3. 项目进展

今日 PR 流以修复与体验打磨为主，暂无大型功能合并数据，但以下方向明显推进：

- **首启体验统一**：[#201296](https://github.com/openclaw/openclaw/pull/201296)（macOS 统一 provider 列表 + 页内登录）与 [#202141](https://github.com/openclaw/openclaw/pull/202141)（Web 首启对齐 Mac 欢迎流程）双双就绪待审，跨平台 onboarding 收敛明显。
- **安全与依赖治理**：[#204383](https://github.com/openclaw/openclaw/pull/204383) 修复 8 个 HIGH 级依赖告警（降至 2 个刻意保留）；[#204384](https://github.com/openclaw/openclaw/pull/204384) 修复 RUSTSEC-2026-0592（url crate）。
- **Agent 能力增强**：[#204301](https://github.com/openclaw/openclaw/pull/204301) 允许 agent 发表经审批的 GitHub 评论（安全敏感，需 review）；[#204379](https://github.com/openclaw/openclaw/pull/204379) 支持 host 管理的 sessions_spawn 附件；[#204133](https://github.com/openclaw/openclaw/pull/204133) 为小上下文本地模型发送紧凑 chat context。
- **Goal 预算修复**：[#203364](https://github.com/openclaw/openclaw/pull/203364) 将已结算 model tokens 计入 Goal 预算，堵住“上下文不增长就绕过预算”的漏洞。
- **发布工程**：[#204158](https://github.com/openclaw/openclaw/pull/204158) 起草 2026.11.10 release notes（亮点：Deep Research、Knowledge 记忆插件、Browser handoff），正式版临近。

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#182891](https://github.com/openclaw/openclaw/issues/182891) Prompt cache 每次请求 `cache read dropped N -> 0`（27 评论，P1） | 🔥🔥🔥 | envelope 重写与 runtimeContextCarrier 变化导致前缀缓存永不复用，直接推高用户 API 成本；与 [#143017](https://github.com/openclaw/openclaw/issues/143017)（实测 21.3M cache-write tokens）、[#186683](https://github.com/openclaw/openclaw/issues/186683) 构成同根问题集群 |
| [#157989](https://github.com/openclaw/openclaw/issues/157989) 插件源捕获每次 CLI 命令重写 1.1–1.4 GB（24 评论） | 🔥🔥 | SSD 磨损担忧，2026.9.5 起回归，无复用机制 |
| [#196199](https://github.com/openclaw/openclaw/issues/196199) Codex helper 完成后父 agent 无法恢复（17 评论，P1） | 🔥🔥 | 多 agent 委派“约每启动一个 helper 失败一次”，goal 暂停、用户被锁在助手外——2026.10.10 回归 |
| [#154812](https://github.com/openclaw/openclaw/issues/154812) / [#182369](https://github.com/openclaw/openclaw/issues/182369) / [#195497](https://github.com/openclaw/openclaw/issues/195497) Gateway 堆外 RSS 失控致 OOM | 🔥🔥 | 自托管重度用户的持续痛点，内部 rss_threshold 监控对堆外内存失明 |
| [#201468](https://github.com/openclaw/openclaw/pull/201468) macOS 启动告警文案误导（P0） | 🔥 | 版本不匹配时给出泛化的凭据恢复步骤，用户按错误指引操作 |

**诉求画像**：重度自托管 + 多渠道（Discord/Matrix/Slack/Telegram）+ 多 agent 用户是反馈主力，他们最在意**成本（cache/token 归属 #130257）、内存、会话可靠性**。

## 5. Bug 与稳定性（按严重度）

**P0（发布阻塞级）**
- [#203869](https://github.com/openclaw/openclaw/issues/203869) 工具执行失败：gRPC code-mode session closed / BrokenPipe，macOS 回归，**标记 beta release blocker**，尚无 fix PR
- [#202518](https://github.com/openclaw/openclaw/issues/202518) claude-cli 长会话 sessions_spawn 后死会话被复用，消息丢失（无 fix PR）
- [#201468](https://github.com/openclaw/openclaw/issues/201468) macOS P0，linked PR open，接近解决

**P1**
- [#204283](https://github.com/openclaw/openclaw/issues/204283) **今日新报**：2026.11.7 升级后 Discord provider 在 `commands.nativeSkills` 启用时永远不初始化，health-monitor 静默重启循环（无 fix PR）
- [#196199](https://github.com/openclaw/openclaw/issues/196199) Codex helper 委派失败（无 fix PR）
- [#182369](https://github.com/openclaw/openclaw/issues/182369) Gateway 堆外 RSS 每小时增长 ~0.1 GiB（无 fix PR）
- [#203442](https://github.com/openclaw/openclaw/issues/203442) 2026.11.4 → beta.1 升级激活时 Doctor 失败（无 fix PR）
- [#196803](https://github.com/openclaw/openclaw/issues/196803) Codex 工具后 finalization 失败（无 fix PR）

**已修复/接近修复**
- [#195279](https://github.com/openclaw/openclaw/issues/195279) 后台 exec 完成唤醒"execution authority"失败 — **已关闭**，可能随 beta.3 的 reliable delegated work 落地
- [#164533](https://github.com/openclaw/openclaw/issues/164533) sessions_send writer claim 冲突 — 有相关 [#204179](https://github.com/openclaw/openclaw/pull/204179)（compaction 状态清理）方向 PR

## 6. 功能请求与路线图信号

- **MCP 生态**：[#116052](https://github.com/openclaw/openclaw/issues/116052) 预注册 OAuth client 支持（含安全 review 标签，已进入维护者流程）；[#166586](https://github.com/openclaw/openclaw/issues/166586) MCP Events 订阅触发 agent run —— MCP 集成明显是路线图重心。
- **上下文管理**：[#6757](https://github.com/openclaw/openclaw/issues/6757) agent 自压缩工具（2 👍，长期需求），与 PR [#204133](https://github.com/openclaw/openclaw/pull/204133)（小窗口紧凑上下文）同向，下一版本落地概率高。
- **可观测性**：[#130257](https://github.com/openclaw/openclaw/issues/130257) 委派 run 的 token/成本归属（fix-shape 已明确）；[#183048](https://github.com/openclaw/openclaw/issues/183048) outbound 队列检查 CLI。
- **Operator 定制**：[#167341](https://github.com/openclaw/openclaw/issues/167341) 自定义模型失败文案；[#136271](https://github.com/openclaw/openclaw/issues/136271) msteams SharePoint 动态解析。
- 结合 2026.11.10 release notes（Deep Research、Knowledge 插件、Browser handoff），**记忆/研究/浏览器**是本周期三大产品主题。

## 7. 用户反馈摘要

**痛点**
- Token 成本失控感强烈：cache 失效（#182891）、委派 run 花费 $14 无法归属（#130257）是付费用户最不满的点。
- “静默失败”模式反复出现：Telegram PDF 不发送且零日志（#187588）、Discord 静默重启循环（#204283）、升级失败 exit 0（#161158）——用户普遍要求可诊断性。
- 升级路径脆弱：Windows SQLite 文件锁（#186326）、npm EIDLETIMEOUT（#200747）、junction 损坏（#201974），Windows/npm 用户升级体验明显差于 Linux。
- 磁盘/内存资源侵蚀：SSD 重写（#157989）、transcript 存 base64 图片（#143973，1.3% 事件占 80% 存储）。

**满意点**
- 新版 update recovery 让“崩溃后下一次更新安全完成”获得好评方向。
- 失败分类文案（billing/rate_limit/auth）较裸 provider 报错是明显进步（#167341 是在其上求扩展而非推翻）。
- Clawsweeper 分诊机器人 + roboclaw/tideclaw 自动化 PR 体现了高质量工程流程，社区 PR（如 #204391、#204381）参与踊跃。

## 8. 待处理积压

- **[#182891](https://github.com/openclaw/openclaw/issues/182891) / [#143017](https://github.com/openclaw/openclaw/issues/143017)（P1/P2，9-10 月起）**：cache 复用集群，3 个关联 issue、60+ 评论，始终 `no-new-fix-pr`，**是当前最值得投入的高价值修复**。
- **[#55792](https://github.com/openclaw/openclaw/issues/55792)（3 月起，P1）**：Gateway 重启后丢失窗口期消息，fix-shape-clear 已明确但 8 个月未动。
- **[#157989](https://github.com/openclaw/openclaw/issues/157989)**：SSD 磨损回归，needs-maintainer-review 状态持续近 2 个月。
- **[#138366](https://github.com/openclaw/openclaw/issues/138366) / [#155039](https://github.com/openclaw/openclaw/issues/155039)**：needs-product-decision 类 feature，等待产品侧拍板，避免长期 stale 后被自动关闭。
- **CI 长红**：[#204389](https://github.com/openclaw/openclaw/pull/204389) 显示 `check-dependencies` 自 #204200 起失败；#204383/#204384 显示依赖审计工作流红了 1 个月+，建议合并今日的修复 PR 尽快灭火。

**健康度小结**：吞吐与社区参与度高，发布节奏稳定（beta 双发），但 **prompt-cache、内存泄漏、多 agent 委派**三大 P1 集群长期无 fix PR，且 2026.11.6–11.7 引入了新的渠道回归，建议在 2026.11.10 正式版前优先收口。

---

## 横向生态对比

# AI 智能体与个人助手开源生态横向对比分析 — 2026-11-24

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入“重运维、重可靠性”的深水区：头部项目均从功能扩张转向**更新可恢复性、内存治理、长期记忆**等工程化议题。多 agent 委派、上下文压缩、MCP 生态集成成为共同的技术主战场，而**成本归属（token/cache 计量）、安全边界（密钥隔离、审批层）、静默失败可诊断性**是用户侧三大集体痛点。项目普遍采用高频 canary/beta 发布节奏 + 自动化分诊机器人（如 OpenClaw 的 Clawsweeper）维持工程效率。生态参与者以重度自托管用户为核心反馈引擎，Desktop/Web 多端收敛是本周期明显的产品化信号。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新/活跃 334，关闭 166） | 500（新/活跃 329，关闭 171） |
| PR 更新（24h） | 500（待合并 296，合并/关闭 204） | 500（待合并 377，合并/关闭 123） |
| Issue 关闭率 | ~33% | ~34% |
| PR 合并/关闭率 | ~41% | ~25% |
| Release | 2 个 beta（2026.11.10-beta.2/.3），正式版临近 | 1 个 canary（v0.23.3+canary），含 macOS DMG |
| 健康度评估 | **吞吐健康，但三大 P1 集群（cache/Gateway 内存/委派失败）长期无 fix PR，P0 blocker 未解** | **净增积压明显（+158 issue），PR 评审带宽承压，但安全与记忆类修复推进积极** |

两者活动量级相当（Issue/PR 上限均触顶 500，说明均为超高频项目），差异在于**OpenClaw 收敛更快、发布更成熟**，Hermes Agent 处于扩张期、待评审 PR 堆积更重。

## 3. OpenClaw 在生态中的定位

- **规模与成熟度领先**：双 beta 加速收口正式版、release notes 起草（Deep Research、Knowledge 记忆插件、Browser handoff 三大产品主题）、依赖安全治理（8 个 HIGH 降至 2 个刻意保留）显示其进入**产品化/稳定化阶段**。
- **技术路线差异**：OpenClaw 走“平台型”路线——Gateway 常驻服务 + 多渠道接入（Discord/Matrix/Slack/Telegram）+ 多 agent 委派 + Goal 预算体系；Hermes Agent 更偏“单机个人 agent + 插件生态”，主线是压缩记忆、Desktop 体验、自定义 provider 兼容。
- **优势**：更新恢复链路（跨 schema/重启）是同类稀缺能力；自动化工程流程（Clawsweeper、roboclaw/tideclaw）高质量。
- **短板**：重度自托管场景的资源侵蚀问题（cache 失效推高成本、堆外 RSS 泄漏、SSD 重写）长期未收口，且升级路径对 Windows/npm 用户明显不友好——这些正是竞品可蚕食的缺口。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **压缩/长期记忆** | #6757 agent 自压缩、Knowledge 记忆插件 | #159471 压缩保留 Open Commitments、#143379 doc-chain RFC（43 评论） | 压缩后不丢承诺/溯源，agent“记得住” |
| **多 agent/后台任务可靠性** | 委派结果保存（beta.3 亮点）、#196199 委派失败 | #136708/#159475 后台结果注入运行中 turn | 子任务与主会话的可靠汇合 |
| **MCP 生态** | OAuth 预注册、MCP Events 触发 run | forever-brain MCP 等目录提交活跃 | MCP 是两者共同的集成重心 |
| **安全与密钥隔离** | 依赖审计、agent 评论审批机制 | #82936 多 profile 密钥泄漏、#159450 插件隔离 | 默认安全的权限/隔离边界 |
| **跨端 onboarding/发布工程** | macOS/Web 首启统一 | stable DMG 别名、Desktop 性能修复 | Desktop 正式化、多端收敛 |
| **本地/自定义模型支持** | #204133 紧凑上下文给小模型 | custom provider id/alias 系列修复 | 自建模型用户是共同高粘性群体 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 产品形态 | Gateway 服务 + 多渠道 IM 接入的“常驻助手平台” | CLI/桌面优先的个人 agent |
| 核心功能 | 多 agent 委派、Goal 预算、Deep Research、Browser handoff | 压缩记忆、SOUL/AGENTS 人格文件、Steer 会话交互 |
| 目标用户 | 自托管 + 多渠道 + 多 agent 的重度运营者 | 个人用户、插件开发者、custom provider/本地模型用户 |
| 架构特点 | Rust 组件 + gRPC session + schema migration，复杂度高 | 更轻量，APFS/SSH 等细节兼容打磨 |
| 风险面 | 内存泄漏、渠道回归、升级链路 | 密钥隔离、隐私默认值、PR 积压 |

值得注意的**交叉信号**：Hermes #17345（读到 openclaw 的 skills 造成跨工具污染），说明两者用户群体高度重叠，且技能/配置的安装级隔离是生态级共同课题。

## 6. 社区热度与成熟度

- **第一梯队（均触顶 500 活跃）**：两项目热度同级，但分层不同——
  - **OpenClaw：质量巩固期**。PR 关闭率 41%、beta 收口正式版、依赖治理——但“巩固”成色受三大 P1 集群拖累（#182891 cache 集群 60+ 评论长期 `no-new-fix-pr`，#55792 八个月未动）。
  - **Hermes Agent：快速迭代期**。同日大量新开 PR、canary 通道高频发布、插件目录扩张，但 377 待合并 PR 与净增 issue 显示治理尚未跟上增长。
- **共同结构性问题**：review 带宽是两边瓶颈；安全类 issue（Hermes #82936、OpenClaw #204283 新渠道回归）提级速度均偏慢。

## 7. 值得关注的趋势信号

1. **“成本可观测性”将成为刚需功能**：OpenClaw 的 cache 复用失效（21.3M cache-write tokens）与 $14 无法归属的委派 run 表明，token/成本计量从运维问题升级为产品竞争力。AI agent 开发者应尽早内建 per-run/per-agent 成本归属。
2. **压缩记忆是下一轮竞争焦点**：两项目同步在压缩保留（承诺、溯源、背景 vs 权威消息）上投入，OpenClaw 的 Knowledge 插件与 Hermes 的 doc-chain RFC 殊途同归——**“压缩后仍可信”** 是 agent 长期可用的分水岭。
3. **静默失败零容忍**：多渠道静默重启、exit 0 升级失败、零日志丢消息——可诊断性（失败分类、健康监控可见性）是用户流失的关键防线。
4. **默认安全成为信任门槛**：审批层绕过、密钥跨 profile 泄漏、日志未脱敏上传等 issue 持续高热，隐私中间件 hook（如 Hermes #57364）预示插件安全 API 标准化趋势。
5. **更新链路可靠性被低估**：OpenClaw 将“更新可恢复”作为 beta 双发主线，说明**自我更新的 agent 系统需要事务化更新语义**——对所有做 agent 自更新的团队是重要参考。
6. **生态互通的边界问题浮现**：skills 跨工具污染暗示，随着用户多 agent 并存，“agent 间配置/技能隔离与互联”（如 Hermes 的 HAMP 提案）将是下一个架构层议题。

**给维护者的优先建议**：OpenClaw 应在 2026.11.10 正式版前收口 cache 集群与 P0 blocker；Hermes 应提级 #82936 安全边界问题并消化 PR 积压。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-24

---

## 1. 今日速览

Hermes Agent 今日保持高度活跃：过去 24 小时内 Issues 更新 500 条（新开/活跃 329，关闭 171），PR 更新 500 条（待合并 377，合并/关闭 123），且发布 1 个 canary 版本 **v0.23.3+canary.20261123T065600Z**（含 macOS Apple Silicon Desktop DMG）。今日 PR 流以大量同日新开的修复/特性为主，聚焦于压缩会话状态保持、gateway 会话交互体验、Desktop 性能与发布基础设施。安全与隐私类 Issue（密钥泄漏、审批层绕过、日志未脱敏上传）持续占据讨论热度前列，值得维护者优先关注。整体健康度良好，关闭率（Issues 约 34%、PR 约 25%）与社区贡献者数量均处于健康区间。

---

## 2. 版本发布

**[canary.20261123T065600Z-v0.23.3](https://github.com/NousResearch/hermes-agent/releases/tag/canary.20261123T065600Z-v0.23.3)**（发布于 2026-11-23）

- 基于 v0.23.3 的 canary 预发布通道，主要为发布流水线验证服务。
- 提供 **Hermes Desktop macOS Apple Silicon (M-series) DMG** 构建下载。
- 值得注意：今日 [#159469](https://github.com/NousResearch/hermes-agent/pull/159469) 指出 stable macOS DMG 别名与下载页在版本提升（promotion）时存在 404，说明桌面端发布基础设施仍在完善中。
- canary 通道，不建议生产环境使用；无破坏性变更公告。

---

## 3. 项目进展

今日合并/关闭 123 条 PR，另有多条高价值修复进入评审：

**压缩与长期记忆（agent 核心可靠性）**
- [#159471](https://github.com/NousResearch/hermes-agent/pull/159471) `fix(agent): keep open commitments owed across compaction` — 压缩摘要新增 "Open Commitments" 段落，未完成的承诺跨压缩保留。直接回应社区对“agent 忘事”的核心痛点。
- [#156929](https://github.com/NousResearch/hermes-agent/pull/156929)（已关闭）`fix(file-tools): fold lookalike filenames the way APFS does` — APFS Unicode 折叠兼容，`--yolo` 下对 AGENTS.md/SOUL.md 等文件的写保护更精确。

**Gateway / 会话交互**
- [#159476](https://github.com/NousResearch/hermes-agent/pull/159476) — 停止的 turn 不再驱动 `/goal` 判定，修复“Stop 后目标循环”问题。
- [#159223](https://github.com/NousResearch/hermes-agent/pull/159223) — 迟到的 steer 通过 `pending_steer` 回传，防止客户端双重回放。
- [#159473](https://github.com/NousResearch/hermes-agent/pull/159473) — Desktop 排队行恢复 Steer/Edit 操作。
- [#159461](https://github.com/NousResearch/hermes-agent/pull/159461) — 仪表盘批量会话删除转发至活跃 gateway owner，在 persistence/sqlite 重构后重实现。

**安全修复**
- [#159450](https://github.com/NousResearch/hermes-agent/pull/159450) — 标记 profile 的插件代码以打开时的名称运行，修复 `.env` 泄漏到 host child 的路径。

**稳定性 / 更新体验**
- [#144602](https://github.com/NousResearch/hermes-agent/pull/144602) — update 自动命名先前 run 遗留的 autostash，避免 stash 冲突后 reset 树。
- [#159457](https://github.com/NousResearch/hermes-agent/pull/159457) — 过滤 SSH ControlMaster fallback 输出行，修复所有解析该输出的调用方。

**生态扩展**：今日新增 3 个目录条目 PR — [#159474](https://github.com/NousResearch/hermes-agent/pull/159474)（forever-brain MCP）、[#159463](https://github.com/NousResearch/hermes-agent/pull/159463)（url-date-slash-restore 插件）、[#159462](https://github.com/NousResearch/hermes-agent/pull/159462)（rtk-rewrite-docker 0.1.2），社区插件生态持续扩张。

---

## 4. 社区热点

| 议题 | 热度 | 主题 |
|---|---|---|
| [#143379](https://github.com/NousResearch/hermes-agent/issues/143379)（43 评论） | 🔥 | RFC：文档链底层的读取/治理/压缩——持久记录如何在压缩后保留溯源、避免用户重复输入。与 #159471 PR 直接呼应，是 memory/compression 方向最重要的架构讨论。 |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293)（30 评论，已关闭） | 🔥 | `hermes config set` 可绕过系统配置写保护、无门禁关闭审批层。安全问题闭环。 |
| [#84834](https://github.com/NousResearch/hermes-agent/issues/84834)（24 评论） | ⚠️ | Webhook 功能包 meta-issue，整面 webhook 表面的修复跟踪。 |
| [#82936](https://github.com/NousResearch/hermes-agent/issues/82936)（16 评论） | ⚠️ | `gateway.multiplex_profiles` 下默认 profile 密钥泄漏到次要 profile 的 terminal 工具与 Kanban worker——多租户隔离缺陷，**仍 OPEN，应高优**。 |
| [#31584](https://github.com/NousResearch/hermes-agent/issues/31584)（14 评论） | — | memory-context 应作为背景而非权威用户消息，防注入面。 |
| [#79021](https://github.com/NousResearch/hermes-agent/issues/79021)（4 👍） | — | `hermes doctor` npm 高危漏洞误报（已关闭）。 |

**诉求画像**：用户高度关注 **agent 长期记忆可靠性**（压缩丢上下文、背景 memory 违规持久化敏感信息）与 **权限/隔离边界**（审批层、多 profile 密钥隔离）。

---

## 5. Bug 与稳定性（按严重度）

**P2（高）**
- [#159458](https://github.com/NousResearch/hermes-agent/pull/159458)（PR）Desktop 群组房间输入卡顿数秒，随历史规模劣化 → **已有 fix PR**。
- [#159472](https://github.com/NousResearch/hermes-agent/pull/159472)（PR）含空格的 custom provider 名导致 `/model` 生成无效 id → **已有 fix PR（fixes #159470）**。
- [#62810](https://github.com/NousResearch/hermes-agent/issues/62810)（OPEN）CLI handler 返回 `True` 导致退出码 1（bool 是 int 子类）。无 fix PR。
- [#17345](https://github.com/NousResearch/hermes-agent/issues/17345)（OPEN）Hermes 读取到 openclaw 的 skills，跨工具污染。无 fix PR。
- [#159460](https://github.com/NousResearch/hermes-agent/pull/159460)（PR）Desktop 听写忽略 `max_recording_seconds: 0` → **已有 fix PR**。

**P3（中）**
- [#109765](https://github.com/NousResearch/hermes-agent/issues/109765)（OPEN）Cron 创建快照丢失 custom provider 身份，回放错误 fallback 到 OpenRouter。无 fix PR。
- [#116788](https://github.com/NousResearch/hermes-agent/issues/116788)（OPEN）后台 memory reviewer 持久化用户明确拒绝保存的敏感信息（无障碍相关隐私）。与 #159471 方向相关但未闭环。
- [#38048](https://github.com/NousResearch/hermes-agent/issues/38048)（OPEN）url_safety 误拦截 DNS64/NAT64 地址。
- [#68001](https://github.com/NousResearch/hermes-agent/issues/68001)（OPEN）显式禁用 x_search 无法覆盖 xAI 凭据自动启用。
- [#61703](https://github.com/NousResearch/hermes-agent/issues/61703)（P4）chrome-debug 活跃 profile 导致备份卡死/不完整。

---

## 6. 功能请求与路线图信号

- **背景结果注入运行中 turn**：[#136708](https://github.com/NousResearch/hermes-agent/pull/136708)（busy_result_mode）+ [#159475](https://github.com/NousResearch/hermes-agent/pull/159475)（后台进程通知标记行）两条 PR 同向推进，很可能进入下一版本——subagent/后台任务与主 turn 的实时汇合是明确路线。
- **压缩保留承诺**：[#159471](https://github.com/NousResearch/hermes-agent/pull/159471) 结合 #143379 RFC，显示 memory/compression 是当前主线。
- **发布基础设施**：[#159469](https://github.com/NousResearch/hermes-agent/pull/159469) stable DMG 别名 + 下载页，Desktop 正式化信号。
- **隐私中间件**：[#57364](https://github.com/NousResearch/hermes-agent/issues/57364) 请求 `pre_llm_message` 官方 hook，配合 #159450 插件隔离改进，插件安全 API 是趋势方向。
- **Agent 互联**：[#38275](https://github.com/NousResearch/hermes-agent/issues/38275) HAMP 提案（agent 地址系统 + 异步消息 + 加密身份），P4 远期探索。

---

## 7. 用户反馈摘要

- **满意点**：插件/MCP 目录提交活跃（今日 3 条），说明扩展机制被社区广泛使用；Desktop 端持续收到功能细化反馈（听写、排队行操作），用户粘性高。
- **痛点 1 — 记忆不可靠**：多个 Issue 反映压缩后丢失上下文、agent 忘记承诺（#159471 PR 描述）、后台 reviewer 违规保存敏感信息（#116788）。多用户日常使用中对"agent 应该记得"期望强烈。
- **痛点 2 — 隐私与安全默认值**：未脱敏日志经 `hermes debug share` 上传公共 paste（#46006，已关闭）；skills 被自动"优化"改写（#41939，8 👍 表明共鸣强烈，已以 opt-in 保护方案关闭）；skills 跨安装污染（#17345）。
- **痛点 3 — custom provider 兼容性**：deepseek 端点（#17199）、model alias（#62494）、custom provider id（#159472）反复出现，自建/本地模型用户是高频受影响群体。
- **痛点 4 — 多平台接入**：WhatsApp JID 解析（#37906）、Discord `/start`（#147861）表明 IM 平台适配仍有长尾问题。

---

## 8. 待处理积压（提醒维护者关注）

1. [#82936](https://github.com/NousResearch/hermes-agent/issues/82936) — 多 profile 密钥泄漏（P3 安全边界，8 月至今，16 评论，**无对应 fix PR 可见**，建议提级）。
2. [#84834](https://github.com/NousResearch/hermes-agent/issues/84834) — Webhook 功能包 meta-issue（8 月至今，24 评论，长期跟踪项）。
3. [#143379](https://github.com/NousResearch/hermes-agent/issues/143379) — doc-chain RFC（43 评论，需要维护者决策以指导 #159471 等实现）。
4. [#62810](https://github.com/NousResearch/hermes-agent/issues/62810) — CLI 退出码兼容性（7 月至今，影响自动化脚本用户）。
5. [#17345](https://github.com/NousResearch/hermes-agent/issues/17345) — skills 污染（4 月至今，无响应）。
6. [#38048](https://github.com/NousResearch/hermes-agent/issues/38048) — DNS64 误拦截（6 月至今，影响 IPv6-only 网络，如部分移动网络用户）。
7. [#61703](https://github.com/NousResearch/hermes-agent/issues/61703) — 备份在活跃 chrome profile 上卡死（7 月至今）。

**积压态势**：329 新活跃 vs 171 关闭，净增明显；377 待合并 PR 对评审带宽构成压力，建议优先消化安全类与 P2 修复类 PR。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*