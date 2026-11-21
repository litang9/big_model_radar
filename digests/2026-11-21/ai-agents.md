# OpenClaw 生态日报 2026-11-21

> Issues: 331 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-21 01:29 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-21

## 1. 今日速览

- 过去 24 小时项目保持**高活跃度**：Issues 更新 331 条（新开/活跃 244，关闭 87），PR 更新 500 条（待合并 301，已合并/关闭 199），无新版本发布。
- 社区热点集中在两条主线：**2026.11.5 升级链路的可靠性问题**（Doctor 校验失败、package-swap 失败、更新耗时过长）与 **prompt cache 失效导致的成本问题**，是当前用户最强烈的痛点。
- 贡献侧节奏健康：多位核心贡献者（@jalehman、@steipete、@vincentkoc、@daniel-lxs 等）在“小内存机器精简运行”（lean mode）系列、iOS 重构、安全边界增强上持续推进，今日新开多个高质量 PR。
- 整体判断：项目处于**快速迭代期 + 升级稳定性承压期**，Issue 净流入（244 新开 vs 87 关闭）值得关注，但修复管线（199 个 PR 合并/关闭）吞吐充足，健康度良好。

## 2. 版本发布

今日无新版本发布。（注：社区讨论显示 2026.11.5 / 2026.11.6 相关问题密集，下一个 stable 发布前建议关注升级链路回归。）

## 3. 项目进展

今日合并/关闭的重要 PR：

- **[#202478](https://github.com/openclaw/openclaw/pull/202478) — lean mode 下让未使用的 Knowledge worker 休眠**：8 GiB 以下内存设备（普通笔记本/VPS）的内存占用显著下降，小机器友好性系列落地第一步。
- **[#202757](https://github.com/openclaw/openclaw/pull/202757)（closed）— Knowledge vault 编辑后加速项目召回**：消除目录重扫，保住首次发送的 1000ms 召回预算。
- **[#202396](https://github.com/openclaw/openclaw/pull/202396) — session 访问不可恢复时明确提示重启**：错误信息可操作性提升。
- **[#202778](https://github.com/openclaw/openclaw/pull/202778)（closed）— Create Template 文档补全**。
- **[#201560](https://github.com/openclaw/openclaw/pull/201560)（closed）— 修复 macOS Gateway 实际运行的 checkout 与更新不一致**：防止 Web UI 更新后仍 serve 旧版本，直接关联多条升级类 Bug。

整体来看，今日进展集中在**小内存优化（lean mode 三连 PR：#202478、#202495、#202507）、升级可靠性、iOS 代码健康** 三个方向，其中 lean mode 系列已形成"基础 → worker 合并 → 内存预算"的完整推进路径。

## 4. 社区热点

| Issue | 热度 | 核心诉求 |
|---|---|---|
| [#191944](https://github.com/openclaw/openclaw/issues/191944) macOS `gateway stop` 失败（38 评论） | P2 | 进程祖先检查错误导致无法正常停止 Gateway，运维基本操作受阻 |
| [#197083](https://github.com/openclaw/openclaw/issues/197083) 11.3 升级 WAL 校验失败（31 评论） | **P0** | 升级半完成状态：不能回滚（state-migrated）、外部插件遗留问题 |
| [#178359](https://github.com/openclaw/openclaw/issues/178359) doctor 无输出卡 15 分钟+（31 评论） | P1 | 非交互修复模式完全无反馈，影响自动化运维 |
| [#120385](https://github.com/openclaw/openclaw/issues/120385)（closed）cron/memory-flush 轮次 MCP 工具缺失（27 评论） | P2 | 计划任务场景工具目录构建不完整 |
| [#168955](https://github.com/openclaw/openclaw/issues/168955) 2026.10.1 Windows 启动回归 1030s（23 评论） | P1 | `sidecars.control-ui-assets` 阶段阻塞 477s，启动慢 2.5 倍 |
| [#182891](https://github.com/openclaw/openclaw/issues/182891) prompt cache 每请求清零（20 评论） | P2 | 成本敏感用户核心痛点，cache read "dropped N -> 0" |

PR 侧讨论焦点：[#199699](https://github.com/openclaw/openclaw/pull/199699)（受信代理 CLI/TUI 设备接入，安全边界敏感，等待维护者）与 [#201478](https://github.com/openclaw/openclaw/pull/201478)（Claude CLI 文件编辑后保持 memory 信任，兼容性敏感）。

## 5. Bug 与稳定性（按严重度）

**P0 / 发布阻塞**
- [#197083](https://github.com/openclaw/openclaw/issues/197083)：升级后 Doctor WAL 校验失败、更新半完成 — 暂无明确 fix PR，标记 needs-maintainer-review。
- [#158277](https://github.com/openclaw/openclaw/issues/158277)（P0 标签）：Apple Watch Talk 语音连接持续失败 — 无 fix PR。
- 今日新 PR [#202824](https://github.com/openclaw/openclaw/pull/202824)（P0）修复 npx 运行时 onboarding 不可用 — 等待维护者。

**P1 / 关键功能受损**
- [#198218](https://github.com/openclaw/openclaw/issues/198218)：Doctor/update 在 Gateway 停止时无限重哈希 state DB 活锁（跨 10.6 与 11.3 复现）— needs-live-repro。
- [#168955](https://github.com/openclaw/openclaw/issues/168955)：Windows 启动性能回归。
- [#174681](https://github.com/openclaw/openclaw/issues/174681)：#172750 修复反而阻塞主线程数分钟（回归，已在 release 分支 revert）。
- [#192524](https://github.com/openclaw/openclaw/issues/192524)：aws-sdk (Bedrock) 认证下所有计划任务被拒 — linked PR open。
- [#197515](https://github.com/openclaw/openclaw/issues/197515)：已合并修复 #186506 未包含进 2026.11.3 发布。
- [#202246](https://github.com/openclaw/openclaw/issues/202246)（closed）：11.6 Discord 重复提醒消息 — 已快速关闭，疑似已处理。

**P2 / 体验与成本**
- 升级链路三连：[#200606](https://github.com/openclaw/openclaw/issues/200606)（迁移冲突 changed=[]）、[#200756](https://github.com/openclaw/openclaw/issues/200756)（Windows package-swap 失败）、[#201251](https://github.com/openclaw/openclaw/issues/201251)（基线扫描耗时 5409s）。
- Cache 类：[#182891](https://github.com/openclaw/openclaw/issues/182891)、[#198373](https://github.com/openclaw/openclaw/issues/198373)（tool-call id 重写致 cache 崩塌至 ~1%）。
- 今日新增 fix PR：[#202829](https://github.com/openclaw/openclaw/pull/202829)（模板草稿 Unicode 损坏）、[#202815](https://github.com/openclaw/openclaw/pull/202815)（递归 Git shim 耗尽沙箱）、[#202813](https://github.com/openclaw/openclaw/pull/202813)（Discord /codex detach 重启后失效）。

## 6. 功能请求与路线图信号

- **小内存精简运行**：#202495（共享 worker host）、#202507（worker 内存预算）已就绪等待作者/维护者，大概率进入下个版本。
- **ClawHub Skills 分类浏览**：[#202756](https://github.com/openclaw/openclaw/pull/202756) Control UI 按分类浏览 Skills，ready for maintainer look。
- **每用户密钥保险库**：[#197297](https://github.com/openclaw/openclaw/issues/197297) 多用户场景强需求，needs-product-decision + security-review，短期难落地但信号明确。
- **Feishu 进度流式输出**：[#131457](https://github.com/openclaw/openclaw/issues/131457)（closed/stale）与其他 IM 通道对齐诉求持续存在。
- **Memory 按条目分块扩展**：[#179954](https://github.com/openclaw/openclaw/issues/179954) 已有 linked PR open。
- **Session Share 受限连接**：[#202654](https://github.com/openclaw/openclaw/pull/202654) 为远程发布集成铺路，属平台化方向。

## 7. 用户反馈摘要

- **升级焦虑普遍**：多条 11.3→11.5 升级失败报告（#200606、#200756、#201251）反映出用户对“升级即风险”的不满，尤其 Windows 与 npm 管理安装用户，要求更可回滚、更快的更新过程。
- **成本敏感**：prompt cache 失效（#182891、#198373、#155868）被反复报告，OpenAI 兼容第三方路由（DeepSeek/ProxyAPI 等）用户对 token 成本上涨非常敏感。
- **自托管小机器用户群体活跃**：NAS/Docker 用户报告启动 58s 插件扫描（#187350）、603MB DB 五次拷贝（#201251），与 lean mode 系列 PR 形成供需呼应。
- **IM 多通道用户**：Discord/Telegram/Matrix/iMessage 细节问题（重复消息、回声、编辑操作缺失）显示重度多通道用户基数大。
- **正面信号**：新 PR 模板填写质量高、复现路径完整，社区贡献者（如 @vincentkoc 一日内提交 6+ iOS/CI PR）参与度优秀。

## 8. 待处理积压

| 条目 | 状态 | 提醒 |
|---|---|---|
| [#178373](https://github.com/openclaw/openclaw/issues/178373) Agent 循环无 run 级预算、循环检测默认关闭、历史每轮重复计费 | open 自 10-20，needs-product-decision | 成本/安全双重影响，建议优先表态 |
| [#155868](https://github.com/openclaw/openclaw/issues/155868) Agent 间消息致全量 cache miss | open 自 09-22，needs-security-review | 与 cache 痛点集群同源，可合并治理 |
| [#168743](https://github.com/openclaw/openclaw/issues/168743) macOS Control UI 7 天内重连 14,243 次无上限 | open 自 10-10 | 日志噪音与资源浪费，修复成本低收益高 |
| [#163107](https://github.com/openclaw/openclaw/issues/163107) view_image HEIC 失败每次泄漏 250-400MB RSS | open 自 10-01 | 内存泄漏类，建议升级处理优先级 |
| [#130247](https://github.com/openclaw/openclaw/issues/130247) Cron 无结束条件（--until/--max-runs） | open 自 08-26，bulk-filed | P3 但属基础能力缺失 |
| [#199699](https://github.com/openclaw/openclaw/pull/199699) 受信代理设备接入 | waiting on maintainer | 安全敏感，避免长期挂起 |

**维护者建议**：本周期 Issue 净增 157 条，建议集中处理「升级链路」与「prompt cache」两大问题集群，它们是当前负面口碑的主要来源；lean mode 系列 PR 是明确的正向机会，宜尽快合入以巩固小内存自托管用户群。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告 — 2026-11-21

## 1. 生态全景

个人 AI 助手/自主智能体开源生态当前处于**高速迭代与稳定性承压并存**的阶段：两大头部项目日 Issue 活动量均在 300+、PR 活动量达 500 条，社区供给旺盛。共同的负面口碑来源高度一致——**升级链路不可靠**与**长会话/多通道场景下的成本与消息可靠性问题**，说明用户已从“能用”进入“敢托付长任务、敢频繁升级”的信任建设阶段。同时，小内存自托管、memory 安全审批、多 IM 通道接入等方向在多个项目并行涌现，生态需求信号清晰收敛。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（新开/活跃） | 331（244） | 315（296） |
| Issue 关闭 | 87 | 19 |
| Issue 关闭率 | ~26% | ~6% |
| PR 更新（待合并 / 已处理） | 500（301 / 199） | 500（400 / 100） |
| Release | 无 | v0.23.3+canary（11-20） |
| 健康度评估 | 快速迭代期，净增 157 条 Issue 但修复吞吐充足（PR 处理 199/日），**良好** | 活跃度优秀但 PR 积压 400 条、关闭率仅 6%，**评审带宽是瓶颈，偏亚健康** |

**关键差异**：OpenClaw 的“PR 消化能力/日 Issue 更新”约为 Hermes 的 2 倍（199 vs 100），Bug 修复管线更通畅；Hermes 的 9 部分堆叠 PR（serve-to-gateway 系列）虽体现架构雄心，但显著占用评审资源。

## 3. OpenClaw 在生态中的定位

- **优势**：修复吞吐快（今日合入 lean mode 三连、升级链路修复等多个直接对应用户痛点的 PR）；贡献者结构健康（@vincentkoc 单日 6+ iOS/CI PR）；社区报告质量高（复现路径完整），说明用户群偏专业自托管运维者。
- **技术路线差异**：OpenClaw 走“**广度优先**”——多 IM 通道（Discord/Telegram/Matrix/iMessage/Feishu 诉求）、ClawHub Skills 生态、macOS Gateway+iOS/Watch 全端覆盖；Hermes 走“**架构收敛优先**”——统一网关（serve-to-gateway）+ 多 profile 重度部署 + Desktop 优先体验。
- **规模对比**：Issue 编号量级（OpenClaw #19-20 万 vs Hermes #15-16 万）与单 Issue 讨论密度（最高 85 vs 38 评论）相当，OpenClaw 用户基数略大且更分散于小机器自托管场景，Hermes 用户更集中于重度多 profile 桌面场景。

## 4. 共同关注的技术方向

| 方向 | OpenClaw 证据 | Hermes 证据 |
|---|---|---|
| **升级/安装自愈与可回滚** | #197083（P0 半完成升级不可回滚）、#200606/#200756/#201251 升级三连 | #125437（半应用安装无恢复路径，一周 15 个 Discord 线程）、#157430 带 `--restore` 回滚命令 |
| **Memory 安全与可控写入** | #201478（memory 信任保持）、#197297（密钥保险库 security-review） | #158425（Skill Review 逐块 diff 审批）、#92118（结构化 prefetch） |
| **IM 通道流式输出/限流适配** | #131457（Feishu 流式，stale） | #16084（Feishu CardKit 避 50 次/分钟 edit 限流） |
| **长任务可靠性/回执** | #120385（cron 轮次工具缺失）、#130247（cron 无结束条件） | #149248（delegate handback 丢失——“它没回来找我”） |
| **小资源/自托管友好** | lean mode 系列（#202478/#202495/#202507），NAS/Docker 用户活跃 | #146538（66 profiles 文件元数据风暴）重度部署性能诉求 |

**升级可靠性是两个项目共同的头号口碑风险**，且均无成熟的产品级自愈方案，属生态级空白。

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多通道接入广度、Skills 市场、全端（含 Watch）覆盖 | 统一网关架构、Desktop 体验、多 profile 并行 |
| 目标用户 | 小内存自托管者（NAS/VPS/8GiB 笔记本）、成本敏感的多通道用户 | 重度桌面用户、15-66 profiles 高级部署者 |
| 架构关键点 | Gateway 进程模型 + worker 内存预算 + prompt cache 优化 | serve→gateway 统一迁移 + 客户端身份感知 + settlement/outbox 消息可靠性 |
| 突出短板 | 升级链路、prompt cache 失效（第三方路由成本敏感） | Windows 平台问题密度、PR 评审带宽、桌面消息完整性 |

## 6. 社区热度与成熟度

- **OpenClaw — 快速迭代期**：Issue 净流入大（+157）但闭环能力强，属“扩张中可控”；lean mode、Skills 分类浏览等正向机会明确。
- **Hermes Agent — 架构转型期（热度高、成熟度承压）**：统一网关被社区接受，但长尾回归（#143547，85 评论）持续追踪；3 个月以上老问题（#66025、#77253、Kanban 循环对）仍在高热讨论，属**高债高热区**；Windows 需要平台专项治理。
- 分层结论：OpenClaw 处于“功能扩张 + 升级稳定性补课”，Hermes 处于“架构收敛 + 质量巩固”，二者均在向“可托付”成熟度演进。

## 7. 值得关注的趋势信号

1. **升级可靠性成为竞争分水岭**：两个项目用户均以“升级焦虑”为主要负面情绪，带原子回滚的安装器（Hermes #157430 的 `--apply/--restore` 模式）将成为标配预期。AI 智能体开发者应将“安装器自愈 + 版本可回滚”视为一等公民需求。
2. **Token 成本可观测性是隐形刚需**：OpenClaw 的 prompt cache 失效集群（#182891、#198373、#155868）与 Agent 循环无预算（#178373）表明，在第三方模型路由（DeepSeek 等）普及背景下，**cache 命中率与 run 级预算控制**直接决定产品留存。
3. **Memory/技能写入审批是安全新前沿**：双方同期推进逐块 diff 审批与密钥保险库，预示“agent 自主写入”将从黑盒走向可审计。
4. **小资源自托管是被低估的市场**：OpenClaw lean mode 系列与 NAS 用户供需呼应信号强烈，8GiB 以下设备优化是低成本的差异化机会。
5. **多 IM 通道的限流工程化**：Feishu CardKit 流式（避开 50 次/分钟 edit 限流）类需求在两项目同时出现，通道适配层值得抽象为通用组件。

**给开发者的行动建议**：优先投入升级链路测试与回滚机制、cache 友好的 prompt 结构设计、以及 Windows 平台 CI 覆盖——这三项是当前生态中投入产出比最高的补课方向。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目日报 — 2026-11-21

## 1. 今日速览

Hermes Agent 今日保持高活跃度：过去 24 小时 Issues 更新 315 条（新开/活跃 296 条，关闭 19 条），PR 更新 500 条（待合并 400 条，已合并/关闭 100 条），并发布了 1 个 canary 版本。项目重心集中在 **统一网关架构迁移（serve-to-gateway）的收尾阶段**，@unsupportedpastels 连续推进了 9 个堆叠 PR 中的多个部分。问题热点集中在 Windows 平台稳定性、网关多 profile 性能和 Kanban 自动化循环缺陷。关闭率（6%）相对偏低，PR 积压量（400）较大，反映社区贡献速度超过评审消化能力。

## 2. 版本发布

**v0.23.3+canary.20261120T064609Z**（2026-11-20 发布）
- Canary 预发布版本，提供 Hermes Desktop macOS Apple Silicon (M-series) DMG 等多平台下载
- 属于 0.23.x 系列的例行 canary 构建，无破坏性变更说明；生产环境建议继续使用 v0.23.1/v0.23.2 stable，canary 主要供验证近期 gateway 迁移与修复

## 3. 项目进展

**Serve-to-Gateway 迁移系列（最核心的推进线）**，由 @unsupportedpastels 堆叠推进：
- [#157430](https://github.com/NousResearch/hermes-agent/pull/157430)（Part 6/9）：`--backends --apply/--restore/--status` 迁移命令，带回滚、per-home 运行锁和更新标记
- [#157453](https://github.com/NousResearch/hermes-agent/pull/157453)（Part 7/9）：Dashboard 路由和 System 页卡片
- [#157484](https://github.com/NousResearch/hermes-agent/pull/157484)（Part 9/9）：更新后旧 serve/dashboard 后端命名与 Docker/Nix/Windows 手动迁移文档
- 配套跟踪 issue [#145171](https://github.com/NousResearch/hermes-agent/issues/145171)，对应 #106742 统一网关落地后的遗留接入

**其他活跃 PR**：
- [#158407](https://github.com/NousResearch/hermes-agent/pull/158407) + [#158424](https://github.com/NousResearch/hermes-agent/pull/158424)：客户端身份感知与用户活跃状态上报，支撑“人在电脑前时手机通知静默”体验
- [#151994](https://github.com/NousResearch/hermes-agent/pull/151994)：将生成租约和安装锁移出依赖树，修复沙箱策略下 turn 内安装不可写的问题
- [#155681](https://github.com/NousResearch/hermes-agent/pull/155681)：修复 outbox 满后 failure 被永久 pin 住的问题
- [#158425](https://github.com/NousResearch/hermes-agent/pull/158425)：插件目录新增 Skill Review（技能/记忆写入的逐块 diff 审批）
- 今日合并/关闭 100 条 PR，整体推进节奏健康，但主迁移系列的堆叠评审仍是瓶颈。

## 4. 社区热点

1. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)**（85 评论）— 统一网关合并后在 main 上的开放问题跟踪（承接 #134889）。讨论量最大，反映架构切换带来的长尾回归仍被持续追踪，是维护者与社区的焦点枢纽。
2. **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)**（66 评论）— 特定账号通过 API 创建 PR 报权限错误（标记 blocked/upstream）。涉及贡献通道受阻，社区关注度高。
3. **[#125437](https://github.com/NousResearch/hermes-agent/issues/125437)**（21 评论，P1）— 更新失败导致半应用安装且无产品内恢复路径，一周 15 个 Discord 线程，诉求集中在“安装器自愈能力”，#157484 等迁移 PR 部分回应此痛点。
4. **[#137287](https://github.com/NousResearch/hermes-agent/issues/137287)**（19 评论）— Desktop 会话消息重复/乱序/丢失，影响用户对核心聊天体验的信任。
5. **[#77253](https://github.com/NousResearch/hermes-agent/issues/77253)**（15 评论，👍3）— 无语言标签代码块被误判为散文不渲染，长期未修的老问题。

## 5. Bug 与稳定性

| 严重度 | 问题 | 状态 |
|---|---|---|
| P1 | [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) 更新失败留半应用安装、无恢复路径 | 迁移 PR #157484/#157430 部分覆盖，无专门 fix PR |
| P2 | [#153727](https://github.com/NousResearch/hermes-agent/issues/153727) macOS 15 profiles 下 GIL 饥饿，watchdog exit 75、session.resume 30s 超时 | 无 fix PR |
| P2 | [#146538](https://github.com/NousResearch/hermes-agent/issues/146538) Windows 66 profiles 网关每秒 34k–99k 文件元数据操作，内核池增长 | 无 fix PR |
| P2 | [#126622](https://github.com/NousResearch/hermes-agent/issues/126622) Windows `write_file` 因 st_ctime_ns 来源不一致永久拒绝写入 | 无 fix PR |
| P2 | [#144413](https://github.com/NousResearch/hermes-agent/issues/144413) 孤代理字符致 settlement 崩溃，会话卡 paused 不可恢复 | 无 fix PR |
| P2 | [#156504](https://github.com/NousResearch/hermes-agent/issues/156504) Telegram getFile/send_voice 在陈旧连接池上全部超时 | 相关 retry 改进见 #153032 |
| P2 | [#156709](https://github.com/NousResearch/hermes-agent/issues/156709) FooteredReply 破坏 deepcopy | 新报，无 fix |
| P2 | [#156335](https://github.com/NousResearch/hermes-agent/issues/156335) 看板删除可孤儿化在途 SQLite writer | 无 fix PR |
| P3 | [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) API 建 PR 权限错误 | blocked/upstream |

**Windows 平台问题密度显著偏高**（#125437、#146538、#126622、#91097、#146440、#128770），构成一个系统性风险面。今日已关闭 #128770（WSL 提示弹窗），显示部分 Windows 项在收敛。

## 6. 功能请求与路线图信号

- **客户端感知通知静默**（[#158407](https://github.com/NousResearch/hermes-agent/pull/158407)、[#158424](https://github.com/NousResearch/hermes-agent/pull/158424)）：已进入 PR 阶段，大概率随下一版本落地。
- **内存/技能写入审批**（[#158425](https://github.com/NousResearch/hermes-agent/pull/158425)）与**结构化 memory prefetch**（[#92118](https://github.com/NousResearch/hermes-agent/pull/92118)）：memory 安全与可观测性是明确方向。
- **持久化 Python 控制台**（[#156338](https://github.com/NousResearch/hermes-agent/pull/156338)）：已在实现中。
- **长会话内存陈旧问题**（[#66025](https://github.com/NousResearch/hermes-agent/issues/66025)）：长期开放，与 #92118 方向契合，可能被纳入。
- **Feishu CardKit 流式输出**（[#16084](https://github.com/NousResearch/hermes-agent/issues/16084)）：用户诉求明确（避开 ~50 次/分钟的 edit 限流），暂无对应 PR。
- **后台任务可靠回执**（[#149248](https://github.com/NousResearch/hermes-agent/issues/149248)）：delegate/长任务的 handback 丢失是高频痛点，值得进入路线图优先级。

## 7. 用户反馈摘要

- **信任受损类**：“每次让 Hermes 处理长任务并回来找我，它都没回来，我得自己去追”（#149248）——后台任务回执可靠性是 delegate 场景最大痛点。
- **升级焦虑**：更新失败后全靠社区手抄修复配方（#125437），用户对 `hermes update` 缺乏自愈与回滚感到疲惫。
- **桌面体验**：transcript 重复/丢消息（#137287）让用户对会话完整性产生怀疑；代码块渲染问题（#77253）影响技术用户日常使用。
- **多 profile/重度用户**：GIL 饥饿（#153727）和文件系统元数据风暴（#146538）表明高级部署场景（15–66 profiles）未被充分测试。
- **正面信号**：统一网关方向（#106742）整体被社区接受，讨论集中在长尾回归而非架构本身；插件生态（plugin-catalog：skill-review、heartbeat2）持续有第三方供给。

## 8. 待处理积压

- **PR 积压 400 条待合并**，其中 serve-to-gateway 系列（#157430→#157453→#157484，9 部分堆叠）评审链长、rebase 频繁，建议维护者优先集中消化。
- **#131859**（66 评论，blocked/upstream）：贡献者 API 建 PR 受阻，影响外部贡献流，需推动上游解决或提供 workaround。
- **Windows 长期积压**：#126622（9-28 报告）、#91097（8-20 报告）至今无 fix PR，且 Windows 新问题持续涌入，建议组建平台专项。
- **#66025**（7-17 创建）、**#77253**（8-03 创建）、**#75444/#79728**（Kanban 自动分解循环，7 月末/8 月初创建，互为 duplicate）均为 3 个月以上老问题且本周仍在活跃讨论，属高债高热区，应优先排期。
- **#84195 已 CLOSED**（放宽技能描述 57 字符截断），但对应实现需确认是否随下版发布。

**健康度小结**：社区活跃度与功能推进速度优秀（500 PR 更新/日），但 issue 关闭率偏低、Windows 与性能类 P2 问题积压明显，评审带宽是当前最大瓶颈。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*