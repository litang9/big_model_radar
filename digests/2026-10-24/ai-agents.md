# OpenClaw 生态日报 2026-10-24

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-23 23:07 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-10-24

## 1. 今日速览

过去 24 小时 OpenClaw 保持**极高活跃度**：Issues 更新 500 条（新开/活跃 392，关闭 108），PR 更新 500 条（待合并 215，已合并/关闭 285），社区吞吐量处于一线开源 AI 助手项目水平。今日无新版本发布，但主线由 @steipete 密集提交了一批性能优化与可观测性 PR（内存导入图收敛、沙箱启动归因、RPC 基准改进），显示团队正系统性排查 Gateway 启动慢与内存占用问题——这与近期多个 P0/P1 启动性能回归 Issue 直接呼应。Windows 平台可靠性与 plugin-captures 磁盘泄漏仍是用户最痛的两大问题，其中 #158390 已标记 `queueable-fix`，修复在途。

---

## 2. 版本发布

**今日无新版本发布。** 上一版本仍为 2026.10.x 系列，但近期多个 Issue（#168955、#170928）指向 2026.10.1/10.2 在 Windows 上存在启动回归，升级需谨慎。

---

## 3. 项目进展

今日 PR 活动集中在**性能、稳定性与代码质量**三条线：

**性能优化（核心维护者 @steipete 主导）**
- [#181939](https://github.com/openclaw/openclaw/pull/181939) `perf(workers)` 收敛 SQLite 与 model catalog 导入图，直接针对 Gateway 稳态内存占用——与 Issue #160959（插件捕获阻塞事件循环）同根
- [#181983](https://github.com/openclaw/openclaw/pull/181983) 关闭更新检查时跳过启动安装探测，修复 #158099，减少启动工作与 macOS CLT 弹窗
- [#182000](https://github.com/openclaw/openclaw/pull/182000) 消除 GitHub publication receipt 冷读 2.75 秒卡顿
- [#181944](https://github.com/openclaw/openclaw/pull/181944)（已关闭）将偏好/Cookie 快照刷新移出主线程
- [#181996](https://github.com/openclaw/openclaw/pull/181996) 沙箱启动慢阶段归因，提升可诊断性

**稳定性修复**
- [#181992](https://github.com/openclaw/openclaw/pull/181992) 释放被杀死 run 的 restart-recovery fence，修复会话永久拒绝新 turn（#181952）
- [#179669](https://github.com/openclaw/openclaw/pull/179669)（cron 子任务继承父会话 workspace/sandbox，堆叠于已合并的 #179062）持续推进 automations 记忆链路

**功能与生态**
- [#180788](https://github.com/openclaw/openclaw/pull/180788) 新增 Requesty 一方内置 provider（第三次尝试，XL 体量）
- [#181990](https://github.com/openclaw/openclaw/pull/181990) 自动回复中止触发词本地化（西/法/印地/阿拉伯语），重提交 #61075
- [#181998](https://github.com/openclaw/openclaw/pull/181998) 俄语文档导航与 250 条术语表补全
- [#181974](https://github.com/openclaw/openclaw/pull/181974) 修复 Docker 中 1Password SecretRef 启动失败

**Web UI**：@vyctorbrzezowski 的 Details/PR 发布进度系列（#181855、#181934、#181915）已关闭，PR 展示体验明显改善。

整体看，主线在**性能债偿还**上迈出扎实一步，多个长期累积的启动/内存问题进入修复管道。

---

## 4. 社区热点

| Issue | 评论 | 热点核心 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) P0 Gateway 捕获大型外部插件阻塞数分钟 | 44 | 2026.9.6 回归，plugin capture 同步阻塞事件循环，启动与 runtime 重发布均受影响；已标记 `source-repro` 但**尚无 fix PR** |
| [#164294](https://github.com/openclaw/openclaw/issues/164294) 状态库 WAL checkpoint 永不完成 | 28 | 进程内 reader 持续 pin 住 WAL（17091 帧未检查点），暗示状态库读取路径有长事务/泄漏 |
| [#42475](https://github.com/openclaw/openclaw/issues/42475) 网关级 per-agent 成本预算 | 28 | 3 月份的功能请求持续活跃，多代理部署的运维刚需 |
| [#180690](https://github.com/openclaw/openclaw/issues/180690)（已关闭）doctor --fix 800 agent 状态 OOM | 20 | 大规模部署迁移体验极差（110 分钟三次 OOM），已处理关闭 |
| [#156112](https://github.com/openclaw/openclaw/issues/156112) P0 `openclaw update` 全局安装交换失败 | 18 | npm 自更新路径确定性失败，属 ux-release-blocker，仅 `manual-only` 标记 |

**诉求分析**：热点高度集中于**大规模多 agent 部署的运行时资源管理**（事件循环阻塞、WAL、堆内存）与**自更新可靠性**，说明用户群体正从个人玩家向重度运维场景迁移。

---

## 5. Bug 与稳定性（按严重度）

**P0 / Release Blocker（均无 fix PR）**
1. [#160959](https://github.com/openclaw/openclaw/issues/160959) 插件捕获阻塞 Gateway 数分钟（2026.9.6 回归）— 🦞 diamond lobster，`source-repro` 已定位但无修复
2. [#158592](https://github.com/openclaw/openclaw/issues/158592) 主机休眠唤醒后 runtime 发布超时，所有入站消息失败直至重启 — 🦞
3. [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 reclamation checkpoint 失败致 agent 永久 UNAVAILABLE — 待复现
4. [#156112](https://github.com/openclaw/openclaw/issues/156112) `openclaw update` npm 全局安装交换失败
5. [#170956](https://github.com/openclaw/openclaw/issues/170956) Windows：慢启动 + 不洁插件关闭 + schtasks 权限错误，重启/更新不可靠
6. [#155563](https://github.com/openclaw/openclaw/issues/155563) 2026.9.5 回归：service-child relay/MCP 组在 turn 完成后未清理

**P1**
- [#168955](https://github.com/openclaw/openclaw/issues/168955) Windows 启动 410s → 1030s，`control-ui-assets` sidecar 阻塞 477s
- [#170928](https://github.com/openclaw/openclaw/issues/170928) Windows 2026.10.2 启动 7-9 分钟且就绪后间歇无响应
- [#167791](https://github.com/openclaw/openclaw/issues/167791) Android/Termux EACCES：SQLite 快照硬链接被拒（Termux 限制，🦞 已 source-repro）
- [#144336](https://github.com/openclaw/openclaw/issues/144336) SIGUSR1 延迟重启失败：service child 清理身份丢失
- [#143274](https://github.com/openclaw/openclaw/issues/143274) maybeRetryTransient 接受完整 Retry-After，禁用 auth-profile 轮换（🦞 已 source-repro，影响 failover 可用性）

**安全相关**
- [#156895](https://github.com/openclaw/openclaw/issues/156895) agent 创建的 automation 20ms 内 fail-closed，`needs-security-review` + 🐚 platinum

**已有明确修复路径**：#158390（plugin-captures 磁盘泄漏，`queueable-fix`）；#181952 → PR #181992；#158099 → PR #181983。

---

## 6. 功能请求与路线图信号

结合讨论热度与 PR 动向，可能的下一版本方向：

- **Cron/automations 记忆与 workspace 继承**：#179062 已关闭合并、#179669 在审——scheduled run 获得父会话记忆与沙箱是明确推进中的路线
- **Provider 扩容**：#180788 Requesty 一方 provider 已进入 needs proof；#166772 Azure Realtime Talk GA 修复在审
- **多语言/本地化**：#181990 中止触发词本地化、#181998 俄语文档——国际化是社区贡献热点
- **Per-agent 成本预算**（#42475，28 评论）：长期呼声最高，但仍在 `needs-product-decision`，无 PR 跟进，短期落地概率低
- **SQLite 转录开放接口**（#79902）：database-first runtime 的配套需求，等待产品决策
- **Per-agent dreaming 配置**（#67413，5 👍）：解决全 workspace 同时 dreaming 的 OOM，与大规模部署主题契合，值得关注

---

## 7. 用户反馈摘要

**痛点（高频主题）**
- **Windows 是重灾区**：慢启动、schtasks 权限、不洁关闭（#170956、#170928、#168955），用户反映“多次重试才能重启成功"
- **磁盘被吃满**：plugin-captures 与 /tmp 再物化目录永不清理（#158390、#158417），是生产环境最直接的故障源
- **大规模部署摩擦**：800+ agent 迁移需 110 分钟且 OOM（#180690）、状态库 WAL 无限增长（#164294）——重度用户撞上规模化天花板
- **更新不可靠**：`openclaw update` 失败但手动 `npm i -g` 成功（#156112），损伤信任
- **消息丢失类**：runtime 发布超时后入站消息全部失败（#158592）、cron 触发时 fallback 模型不生效（#97335）

**满意点**
- Issue 分类体系（P0-P3、impact、clawsweeper 机器人分诊）被社区认可，报告质量高
- memory-core / memory-wiki 的能力受肯定（#105494 希望进一步增加“记忆治疗”交互）
- Codex 集成的 prompt cache 命中率问题（#84110，93%→47%）说明高级用户在深度优化成本

**场景画像**：macOS/Linux 多 agent 生产 Gateway + 微信/飞书/Discord/Signal 多渠道，用户已具备运维视角（systemd、WAL、heap 分析）。

---

## 8. 待处理积压

以下高影响 Issue 长期处于 `needs-maintainer-review` / `needs-product-decision` 且无修复 PR，建议维护者优先分流：

| Issue | 状态 | 关注理由 |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | P0，无 fix PR，44 评论 | 9.6 回归至今近一个月未修 |
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | 3 月开，needs-product-decision | 运维强需求，社区持续活跃 |
| [#158127](https://github.com/openclaw/openclaw/issues/158127) | P1 多 agent 发布失败 + Codex 超时 | 影响 macOS 多 agent 生产 |
| [#97335](https://github.com/openclaw/openclaw/issues/97335) / [#82662](https://github.com/openclaw/openclaw/issues/82662) | stale，cron 可靠性 | cron 路径 fallback 形同虚设 |
| [#105528](https://github.com/openclaw/openclaw/issues/105528) | stale，Windows exec/read 空输出 | 长期无进展的 Windows 回归 |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) | stale，needs-info | 长对话后工具参数静默丢弃，数据完整性风险 |
| [#87544](https://github.com/openclaw/openclaw/issues/87544) | stale | channel 会话转录与投递漂移（Discord 丢消息） |

**健康度小结**：OpenClaw 社区活跃度与贡献质量优秀，维护响应机器（clawsweeper）运转良好；但 **P0 积压（6 项无 fix PR）与 Windows 平台可靠性**是当前最突出的健康度风险，性能修复浪潮若能落地，预计将化解近半数高热度 Issue。

---

## 横向生态对比

# 个人 AI 助手/智能体开源生态横向对比分析报告
**数据日期：2026-10-24 · 覆盖项目：OpenClaw、Hermes Agent**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**规模化生产落地与架构消化并行的阶段**。两个头部项目均呈一线活跃度（日 Issue/PR 更新各 400-500 条），但用户群体正从个人玩家向**重度运维场景**迁移——多 agent 部署、always-on 网关、多渠道消息桥接成为标准使用形态。随之而来的是共性挑战：**网关/运行时的会话状态管理、长时运行下的资源治理（内存/磁盘/WAL）、自动化权限的安全边界**成为两大项目共同的核心痛点。同时，插件生态体系化、记忆治理、跨网关 Agent 协作等下一代架构议题已进入路线图讨论阶段。

---

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 392，关闭 108） | 425（新开/活跃 369，关闭 56） |
| PR 更新（24h） | 500（待合并 215，合并/关闭 285） | 500（待合并 320，合并/关闭 180） |
| Issue 关闭/新开比 | ~28% | ~15% |
| 今日 Release | 无（2026.10.x 系列） | v0.22.5（10-22，收拢 ~81 PR） |
| 当前主线 | 性能债偿还（启动/内存优化） | 统一网关架构收尾修复 |
| 核心风险 | **6 项 P0 无 fix PR**、Windows 可靠性 | 网关迁移回归、外部贡献 PR 创建受阻 |
| 健康度评估 | ★★★☆（活跃优秀，P0 积压偏高） | ★★★★（高活跃，发布纪律好，处于迁移消化期） |

**解读**：OpenClaw 关闭率更高、问题消化更快，但 P0 存量（6 项无修复）是明显健康度负债；Hermes 反馈流入快于消化（关闭比仅 15%），但 v0.22.5 及时打包 81 个 PR 显示发布纪律较强。

---

## 3. OpenClaw 在生态中的定位

**优势**
- **大规模部署深度**：800+ agent 迁移、WAL/heap 级问题报告表明其用户已具备专业运维视角，是多 agent 生产 Gateway 场景的事实标杆
- **维护响应机器成熟**：P0-P3 + impact 分级 + clawsweeper 机器人分诊被社区认可，Issue 报告质量高
- **多渠道覆盖广**：微信/飞书/Discord/Signal 等渠道支持对中文/全球用户均有吸引力

**技术路线差异**
- OpenClaw 走 **Gateway 单进程承载多 agent + SQLite 状态库**路线，当前正集中偿还性能债（内存导入图收敛、启动归因）
- Hermes 刚完成**统一网关架构迁移**（#106742），将 CLI/TUI/桌面/API/Bot 全部会话面收敛到单一网关进程——两者架构方向趋同，但 Hermes 处于迁移后阵痛期，OpenClaw 处于稳态优化期

**社区规模**：两者日活跃量级相当（Issue/PR 更新均在 400-500），OpenClaw 核心维护者（@steipete）主导推进，Hermes 则有更强的外部贡献者生态（但受 PR 创建权限问题困扰，#131859）。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **网关会话仲裁/隔离** | #181992 restart-recovery fence、#155563 service-child 清理 | #143778 通道级 claim-lock、#46303 并发会话污染 | 多会话/多渠道下“谁在应答”的确定性问题，两项目同期爆发 |
| **自更新可靠性** | #156112 `openclaw update` npm 交换失败 | #139091 merge-base 探针超时中断更新 | “更新即坏”损伤信任，双方均为长期未修项 |
| **自动化/定时任务可靠性** | #97335 cron fallback 不生效、#179669 cron 记忆继承 | #83047/#119070 Kanban blocker_auth 死锁 | always-on 场景下定时/看板任务的长期可靠性 |
| **权限/安全边界** | #156895 automation fail-closed 待安全审查 | #141346 smart approval 自动放行致数据丢失、#25083 技能保护 | 自动审批的边界安全性在 Hermes 已出真实事故，是双方高敏区 |
| **记忆子系统治理** | memory-core/memory-wiki、#105494 记忆治疗 | #135039 记忆写入预算 + #143379 doc-chain RFC | 记忆注入的延迟/成本与治理，Hermes 推进更靠前 |
| **Windows 平台** | P0 #170956、P1 #168955/#170928（启动 410s→1030s） | #143326 管理员权限不一致、网关兼容性 | Windows 均为重灾区，OpenClaw 问题更严重 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多 agent 生产 Gateway、运维级可观测性、provider 扩容（Requesty 等） | 桌面端体验、插件 SDK 体系（`ctx.files` 文件门、preview SDK）、Bot 跨网关协作 |
| 目标用户 | 重度运维型用户（systemd/WAL/heap 分析视角）、多渠道生产部署 | 个人桌面用户 + 插件开发者生态，远程 Agent + 本地执行（#18715，42 👍）方向 |
| 架构关键点 | SQLite 状态库 + 沙箱 + cron/automations 记忆链路 | 刚统一的单网关进程 + 桌面/WebSocket 混合通道 + Kanban 任务系统 |
| 生态策略 | Provider 内置化、多语言本地化（俄/西/法/印地/阿拉伯） | 插件生命周期标准化（#64231）、第三方插件目录涌现（Plexus 等） |

**一句话定位**：OpenClaw = “多 agent 生产基础设施”，Hermes = “个人桌面 Agent + 插件平台”。两者在网关架构上正收敛，但在用户面（运维 vs 桌面）上分化明显。

---

## 6. 社区热度与成熟度分层

- **快速迭代阶段**：**Hermes Agent** —— 架构大迁移刚落地（统一网关）、插件 SDK 密集输出、v0.22.5 快节奏发布，Issue 关闭比仅 15% 说明处于“边跑边修”的典型快速迭代态。风险信号：外部贡献通道疑似受阻（#131859）。
- **质量巩固阶段**：**OpenClaw** —— 无架构大动作，主线是系统性偿还性能债（启动、内存、可观测性归因），Issue 分级与分诊机器成熟。但其 P0 积压（#160959 44 评论、回归近月未修）表明巩固期仍有明显欠账。
- **活跃度量级**：两者均属生态头部（日 400-500 条更新），非头部项目难以匹敌此吞吐量。

---

## 7. 值得关注的趋势信号

1. **“网关会话仲裁”成为新一代架构核心问题**：两项目同期暴露会话归属/竞争问题（claim-lock、fence 机制），预示 per-channel claim-lock、会话隔离原语将成为智能体基础设施的标准组件——值得框架开发者提前设计。
2. **自动化权限的“一次事故即失去信任”定律**：Hermes #141346 数据丢失事故 + OpenClaw #156895 fail-closed 审查表明，smart approval 类功能必须配不可变保护与审计，安全边界设计应先于功能上线。
3. **用户群体运维化**：WAL checkpoint、heap 分析、exit 75 诊断等出现在用户报告中——个人 AI 助手的文档与工具链需面向半专业运维用户设计（成本预算 #42475、per-agent dreaming #67413 等诉求同源）。
4. **记忆治理从“存得多”转向“存得准”**：写入预算、验收管线、压缩溯源（Hermes #135039/#143379）是 v0.23 主线信号，记忆子系统的成本感知设计将成为差异化能力。
5. **跨网关/分布式 Agent 是下一个方向性议题**：Hermes #97681（Bot 自治协作）+ #18715（远程 Agent 本地执行，42 👍 最高票）表明互操作性与执行权分离是被压抑的强需求，OpenClaw 的 claim-lock 类基础设施同样可复用于此。
6. **Windows 是被低估的市场与债务**：两项目 Windows 均为重灾区（OpenClaw 启动 7-9 分钟级别回归），Windows 一等公民支持是获取增量用户的明确机会。

**给开发者的行动建议**：优先投资会话状态确定性与资源治理；智能审批默认 fail-closed；自更新路径需专项测试；记忆/成本感知设计纳入架构早期考量。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 · 2026-10-24

## 1. 今日速览

Hermes Agent 今日保持高热度活跃状态：24小时内 Issues 更新 425 条（新开/活跃 369，关闭 56），PR 更新 500 条（待合并 320，已合并/关闭 180），**v0.22.5** 补丁版本于 10 月 22 日发布，一次性收拢了自 v0.22.4 以来合并的约 81 个 PR。当前项目重心明确：10 月 14 日合入的**统一网关架构（#106742）**进入收尾修复期，衍生出多条高优先级跟踪 Issue。Issue 关闭/新开比约 15%，表明社区反馈流入速度仍快于消化速度，桌面端与网关会话管理是当前最大的稳定性痛点来源。

---

## 2. 版本发布

### v0.22.5（2026-10-22）

**性质**：补丁版本（Patch Release），将自 v0.22.4 以来合并的 **~81 个 PR** 打包为稳定标签，覆盖 GitHub Release（CLI 与安装器）、Microsoft Store 应用、Docker 及 Hermes Cloud 四个分发渠道。

**注意事项**：
- 完整的整理版 Release Notes 将随 **v0.23.0** 一并发布，本版本无独立详细变更日志。
- 无明确破坏性变更声明，但鉴于统一网关（#106742）已进入该窗口，**桌面端、TUI、API server 等所有本地会话面现在共用一个网关进程**——升级用户应重点关注会话恢复与权限行为差异（见第 5 节）。

链接：https://github.com/NousResearch/hermes-agent/releases

---

## 3. 项目进展

今日 180 个 PR 合并/关闭中，值得关注的推进包括：

- **桌面插件文件访问门（`ctx.files`）** — [#143688](https://github.com/NousResearch/hermes-agent/pull/143688)（已关闭）：Desktop SDK 首次提供文件能力，插件可在自有数据目录及用户授权目录内读写，且**仅限这些目录**。这为 hermes-plexus 等知识库类插件铺平了道路。
- **图片生成工具修复** — [#143768](https://github.com/NousResearch/hermes-agent/pull/143768)：修复 `image_generate` 在本地后端经 FAL 编辑时本地路径失败的问题；[#143770](https://github.com/NousResearch/hermes-agent/pull/143770)：所有工具目录行完整描述自身能力，避免 `image_generate` 等延迟加载工具被绕过。
- **预览浏览器 JS SDK 门** — [#142021](https://github.com/NousResearch/hermes-agent/pull/142021)：新增 `host.preview.executeJavaScript` SDK 门及页面翻译器消费者，终结了插件从应用 DOM 中抓取 `<webview>` 的 hack 做法。
- **待合并的关键修复方向**（仍在评审）：
  - [#143778](https://github.com/NousResearch/hermes-agent/pull/143778)：网关通道级 claim-lock——每 (platform, channel) 同一时间仅一个活跃会话，每条消息仅一个应答，直击统一网关后的会话竞争问题。
  - [#143782](https://github.com/NousResearch/hermes-agent/pull/143782)：桌面大附件改走一次性 WebSocket，不再阻塞控制通道心跳。
  - [#143780](https://github.com/NousResearch/hermes-agent/pull/143780)：MCP 信任提示 "Allow for this session / Always" 真正按工具生效。
  - [#126440](https://github.com/NousResearch/hermes-agent/pull/126440)：修复 `_set_session_env` 缺失 `session_id` 绑定导致工具子进程会话上下文污染。

**整体判断**：v0.22.5 的发布标志着统一网关架构的第一次规模化落地；插件生态（文件门、预览 SDK、目录管理）正在快速体系化，是本轮迭代第二主线。

---

## 4. 社区热点

1. **[#134889](https://github.com/NousResearch/hermes-agent/issues/134889)（216 评论，已关闭）** — 统一网关 #106742 合入后的修复跟踪 Issue，是全项目讨论焦点。单一网关进程接管所有本地会话（CLI、TUI、桌面、API、消息 Bot、cron、Kanban、Group Chat）后暴露大量边界问题，社区以极高密度参与收尾。
2. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（8 评论，10-23 新开）** — 作为 #134889 的续篇，接续跟踪 main 上统一网关的遗留问题，说明该架构迁移的修复期将延续到 v0.23。
3. **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（48 评论）** — 外部贡献者 @kuehnberger 无法通过 API 创建 PR（`CreatePullRequest` 权限错误），标记为 `blocked / cause/upstream`。**这可能是阻碍外部贡献流入的基础设施问题，建议维护者优先核实**。
4. **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)（40 评论，4 👍）** — Bot 跨网关协作：每个 Bot 由所有者自治（自有模型、工具、记忆、凭据），先跨机器、后跨所有者协作。这是个人 AI Agent 互操作的方向性设计讨论。
5. **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)（29 评论，42 👍）** — 远程 Agent + 本地工具执行，是 👍 最多的 Issue，长期需求强烈，与 #97681 构成"分布式 Agent"路线图的两端。
6. **[#141346](https://github.com/NousResearch/hermes-agent/issues/141346)（36 评论，security）** — Smart approval 自动放行的 osascript 命令关闭了用户未保存的 PowerPoint 并删除导出文件，**造成不可恢复的数据丢失**。智能审批的边界安全性成为社区高度敏感的话题。

---

## 5. Bug 与稳定性

按严重程度排列：

| 级别 | Issue | 说明 | Fix 状态 |
|---|---|---|---|
| P0 | [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) | 统一网关会话归属/消息投递/Windows 兼容性/桌面连接等系列回归（跟踪 Issue，已关闭但修复分散到 #143547 等） | 修复进行中， [#143778](https://github.com/NousResearch/hermes-agent/pull/143778) 为关键方案 |
| P1 | [#139135](https://github.com/NousResearch/hermes-agent/issues/139135) | Discord 异步 delegate 子任务完成但持久化结果永久 pending，父会话不恢复 | 标记 `cause/fallout`，暂无明确 fix PR |
| Security | [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) | Smart approval 自动放行 osascript 导致用户数据丢失 | 待响应；与 [#25083](https://github.com/NousResearch/hermes-agent/issues/25083)（不可变技能保护）同属安全边界议题 |
| P2 | [#143197](https://github.com/NousResearch/hermes-agent/issues/143197) | v0.22.4 `X-Hermes-Session-Key` 被接受但不绑定，每次调用新建 `api-*` 会话 | 新报告，待 fix |
| P2 | [#139818](https://github.com/NousResearch/hermes-agent/issues/139818) | 远程后端桌面会话本地无法恢复（`session.resume` → not_found） | 暂无明确 fix PR |
| P2 | [#138915](https://github.com/NousResearch/hermes-agent/issues/138915) | 网关占用 state.db 时 Dashboard 批量操作一律 409 | 修复中（与统一网关相关） |
| P2 | [#131743](https://github.com/NousResearch/hermes-agent/issues/131743) / [#129993](https://github.com/NousResearch/hermes-agent/issues/129993) / [#131238](https://github.com/NousResearch/hermes-agent/issues/131238) | Codex 长任务首进度停滞 / 桌面回复气泡重复渲染（两 Issue 同源） | 桌面渲染与网关相关，待确认 |
| P2 | [#137838](https://github.com/NousResearch/hermes-agent/issues/137838) | macOS 网关错过活性探针后反复 exit 75（根因未定，原诊断已撤回） | 需要复现 |
| P2 | [#139091](https://github.com/NousResearch/hermes-agent/issues/139091) | `hermes update` stable 通道 merge-base 探针 10s 超时导致更新中断 | 待 fix；相关 [#94259](https://github.com/NousResearch/hermes-agent/pull/94259) 在修 Install/Update E2E |

**模式观察**：近期新增 P2 Bug 高度集中于 `sweeper:risk-session-state` 与 `area/sessions` 标签——统一网关架构迁移是回归的主要来源，与 #143547 跟踪内容吻合。

---

## 6. 功能请求与路线图信号

- **记忆写入治理** — [#135039](https://github.com/NousResearch/hermes-agent/issues/135039)：为 `MEMORY.md`/`USER.md` 增加写入时预算与验收管线（每回合注入 = 每回合延迟/成本）。已有详细设计讨论，配合 [#143379](https://github.com/NousResearch/hermes-agent/issues/143379)（doc-chain 持久层 RFC，含压缩与溯源治理），**记忆/压缩子系统很可能是 v0.23 的主线之一**。
- **跨网关 Bot 协作** — [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) + [#18715](https://github.com/NousResearch/hermes-agent/issues/18715)（42 👍）：远程 Agent + 本地执行的组合诉求强烈，claim-lock（#143778）可视为会话仲裁的第一步地基。
- **插件生命周期标准化** — [#64231](https://github.com/NousResearch/hermes-agent/issues/64231)：定义生命周期事件目录与 hook 分类法，批量处置积压 hook PR。配合本周密集的插件 SDK PR（#143688、#142021），**插件生态治理已在积极落地**。
- **安全加固** — [#25083](https://github.com/NousResearch/hermes-agent/issues/25083)（技能不可变保护）+ [#141346](https://github.com/NousResearch/hermes-agent/issues/141346)：在数据丢失事故推动下，智能审批/技能保护类需求纳入下版本的可能性上升。
- **Email 会话隔离** — [#26277](https://github.com/NousResearch/hermes-agent/issues/26277)：按规范化主题隔离邮件会话，长期挂起，需求小而稳定。

---

## 7. 用户反馈摘要

- **桌面用户体验受损于网关迁移**：升级后出现 Windows 权限不一致（网关以管理员运行、应用非管理员，[#143326](https://github.com/NousResearch/hermes-agent/issues/143326)）、回复气泡重复渲染、模型选择延迟、连接错误——升级用户的负面反馈集中在"升级即坏"的体感。
- **智能审批的信任危机**：macOS 用户因 smart approval 自动放行 osascript 丢失未保存工作（#141346），反映自动化权限模型在真实桌面场景中"一次事故即失去信任"的敏感性。
- **并发会话隔离是老痛点**：[#46303](https://github.com/NousResearch/hermes-agent/issues/46303) 报告并发会话共享记忆注入与 git worktree 导致交叉污染，用户对"多会话并行工作流"的诉求明确。
- **Kanban 自动化可靠性**：`blocker_auth` 守卫使任务永久停摆（[#83047](https://github.com/NousResearch/hermes-agent/issues/83047)、[#119070](https://github.com/NousResearch/hermes-agent/issues/119070)），长期运行/always-on 用户受影响最大。
- **正面信号**：用户在远程后端、消息平台（WhatsApp/Discord/Matrix/Email）、Kanban、桌面插件等广泛场景深度使用，插件生态（如 Plexus、Alan's Way）开始出现第三方持续维护的目录条目，社区黏性高。

---

## 8. 待处理积压

建议维护者关注：

1. **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)** — 外部贡献者无法创建 PR，标记 blocked/upstream，直接影响贡献流入，应优先排查。
2. **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)**（42 👍，5 月至今）— 需求量最大的长期 Issue，尚无 `needs-decision` 之外的实质推进。
3. **[#25083](https://github.com/NousResearch/hermes-agent/issues/25083)**（5 月至今）— 在 #141346 数据丢失事故后，技能/关键文件保护的现实紧迫性显著上升。
4. **[#119070](https://github.com/NousResearch/hermes-agent/issues/119070) / [#83047](https://github.com/NousResearch/hermes-agent/issues/83047)** — Kanban `blocker_auth` 死锁问题双 Issue，8-9 月至今未修，影响自动化用户信任。
5. **[#68128](https://github.com/NousResearch/hermes-agent/issues/68128)**（7 月至今）— Windows no-breakaway job object 下 WhatsApp 桥接 WinError 5，文档承诺的 fallback 缺失。
6. **长龄 PR**：[#75716](https://github.com/NousResearch/hermes-agent/pull/75716)（7 月）、[#118414](https://github.com/NousResearch/hermes-agent/pull/118414)、[#92259](https://github.com/NousResearch/hermes-agent/pull/92259)、[#88886](https://github.com/NousResearch/hermes-agent/pull/88886) 等开放超过一个月，建议结合 #64231 的批量处置流程统一清理。

---

**健康度小结**：项目处于**高活跃、高吞吐、架构迁移消化期**。v0.22.5 及时收拢 81 个 PR 体现了发布纪律；主要风险集中在统一网关的会话状态回归与智能审批安全边界，v0.23.0 的整理版日志与 #143547 的收尾进度将是下期观察重点。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*