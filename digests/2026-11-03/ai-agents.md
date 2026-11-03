# OpenClaw 生态日报 2026-11-03

> Issues: 429 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-03 02:15 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 — 2026-11-03

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时内 Issues 更新 429 条（新开/活跃 211，关闭 218），PR 更新 500 条（待合并 328，已合并/关闭 172），净处理能力基本与新增持平，社区吞吐健康。无新版本发布，主线仍围绕稳定版 2026.10.x 的稳定性修复与渠道/插件质量打磨。热点集中在 `doctor` 命令挂起、managed update 失败链、会话状态丢失三大主题。Control UI 的生成式设置表单打磨（来自 @vyctorbrzezowski 的系列小 PR）是今日最密集的贡献方向。

## 2. 版本发布

今日无新版本发布，无迁移注意事项。

## 3. 项目进展

今日关闭/推进的重要 PR：

- **[#191587](https://github.com/openclaw/openclaw/pull/191587) fix(auth): cron fallback 使用其他 provider 的 session pin 失败**（已关闭）— 修复 cron 场景跨 provider fallback 被 auth pin 阻断的问题，属于安全敏感（auth-provider / security-boundary）修复，与更早的 [#161811](https://github.com/openclaw/openclaw/pull/161811) 同根。
- **[#191602](https://github.com/openclaw/openclaw/pull/191602) fix(voice-call): 迟到的 caller 转录排在回复之前**（已关闭，取代 #159143）— 语音通话转录顺序修复落地，两代 PR 迭代后终于收口。
- **[#145487](https://github.com/openclaw/openclaw/pull/145487) fix(feishu): 禁用 block streaming 时带字幕媒体投递**（已关闭）— 长期挂起的飞书渠道修复最终关闭。
- **待合并高优先级**：[#191236](https://github.com/openclaw/openclaw/pull/191236)（P1，防止单会话垄断共享 exec I/O，事件驱动的重要并发修复，已 ready for maintainer）；[#191536](https://github.com/openclaw/openclaw/pull/191536)（P1，插件替换失败后恢复回复发布）；[#186097](https://github.com/openclaw/openclaw/pull/186097)（P2，voice-only 会话缺失每日重置）。
- **功能侧**：[#186593](https://github.com/openclaw/openclaw/pull/186593)（XL，manifest 驱动的插件推荐 prompts）已 ready for maintainer，是今日最大功能型 PR。

整体判断：今日进展以渠道修复（飞书、语音通话、iMessage、MS Teams）与并发/发布恢复类稳定性修复为主，功能面推进以插件生态体验为主。

## 4. 社区热点

- **[#177656](https://github.com/openclaw/openclaw/issues/177656)**（25 评论，P1）— 2026.10.5 上 native host exec 报 shared-state integrity-admission 错误，至少 28 次失败，无 fix PR。诉求：stable 版阻断性错误需快速响应。
- **[#120385](https://github.com/openclaw/openclaw/issues/120385)**（24 评论，P2）— Code Mode 在 cron/memory-flush 轮次中 MCP 工具目录构建不完整（"Unknown tool id"）。作者多次修正范围，讨论热烈，反映用户对定时任务可靠性的强需求。
- **[#166634](https://github.com/openclaw/openclaw/issues/166634)**（22 评论，P0）— 崩溃恢复后 reclamation checkpoint 失败导致 agent 永久 UNAVAILABLE。
- **[#178359](https://github.com/openclaw/openclaw/issues/178359)**（21 评论，P1）与 **[#187900](https://github.com/openclaw/openclaw/issues/187900)**（20 评论，P1）— `doctor` 在 macOS/Linux 上挂起/静默闲置，"诊断工具本身不可用"引发大量用户共鸣，两平台均无 fix PR。
- **[#187917](https://github.com/openclaw/openclaw/issues/187917)**（10 评论）— 2026.10.8 更新失败 updater-runtime-retention，今日仍在更新。

## 5. Bug 与稳定性（按严重程度）

**P0（无 fix PR）**
- [#166634](https://github.com/openclaw/openclaw/issues/166634) 崩溃恢复后 agent 永久不可用（release blocker）。
- [#164800](https://github.com/openclaw/openclaw/issues/164800) 2026.9.7→9.8 managed update 后 activation driver 死亡直到重启主机（release blocker）。
- [#142821](https://github.com/openclaw/openclaw/issues/142821) 默认开启的 transcript 脱敏污染重放上下文（数据丢失，linked PR open）。
- [#161800](https://github.com/openclaw/openclaw/issues/161800) iOS Dashboard 每次加载新建设备身份，pairing 循环（安全相关）。
- [#173058](https://github.com/openclaw/openclaw/issues/173058) `tools.fs.workspaceOnly` 未限制文件工具，agent 可访问 OpenClaw 状态根目录（安全）。

**P1**
- [#177656](https://github.com/openclaw/openclaw/issues/177656)、[#178359](https://github.com/openclaw/openclaw/issues/178359)、[#187900](https://github.com/openclaw/openclaw/issues/187900) — 均无 fix PR，均标注 needs-maintainer-review。
- [#182369](https://github.com/openclaw/openclaw/issues/182369) Gateway RSS 以 ~0.1 GiB/h 增长直至重启，监控器不触发。
- [#186684](https://github.com/openclaw/openclaw/issues/186684) claude-cli 工具列表变化导致会话失效且历史重置被拒。

**回归/性能**
- [#154104](https://github.com/openclaw/openclaw/issues/154104) Matrix 4 个 E2EE 账号时空闲 CPU ~50%、写盘 52 MB/min（2026.7.1 无此问题）。
- [#138561](https://github.com/openclaw/openclaw/issues/138561) active-memory 插件 2026.8.2 后停止 recall 且无日志。

## 6. 功能请求与路线图信号

- **[#155633](https://github.com/openclaw/openclaw/issues/155633) Databricks Unity Gateway 官方 provider**（linked PR #155634 已开，待 product decision）— 企业合规流量路由需求，纳入概率较高。
- **[#186593](https://github.com/openclaw/openclaw/pull/186593) 插件推荐 prompts**（XL，ready for maintainer）— 插件生态体验的下一步，可能随下一版本发布。
- **[#112372](https://github.com/openclaw/openclaw/issues/112372) sessions_send 延迟完成 wake-on-reply**、**[#150598](https://github.com/openclaw/openclaw/issues/150598) completion-wake 语义四规则提案** — 重度多会话编排用户的核心诉求，均待 product decision。
- **[#107433](https://github.com/openclaw/openclaw/issues/107433) backup manifest 白名单** — 安全敏感、待 security review，方向清晰。
- **[#138990](https://github.com/openclaw/openclaw/issues/138990) 前台 WebChat 强制 checkpoint** — 长任务可观测性诉求，暂无 PR。

## 7. 用户反馈摘要

- **痛点集中在运维链路**：更新（#187917、#183479、#157812）与 doctor（#178359、#187900）是用户最挫败的两类体验——"修复工具本身挂起"、"更新反复失败且每次弹通知"。
- **重度用户场景多样**：50 个 cron 任务的 Discord 单用户部署（#182369）、14 agent 13 GB 的 codex-home 存储（#150940）、Matrix 多账号家庭服务器（#154104），说明自托管重度使用已成主流形态。
- **信任敏感**：#142821（脱敏污染上下文）、#173058（workspaceOnly 失效）、#147344（静默升级到 Sonnet 烧 $25，已关闭）显示用户对"默认安全/默认省钱"被悄然破坏容忍度极低。
- **满意点**：328 条待合并 PR 中大量社区驱动的小型 UI/测试贡献（#191361/#191366/#191368 系列等），说明贡献门槛低、review 流程（proof: screenshot 机制）运转顺畅。

## 8. 待处理积压（提醒维护者）

- **[#112313](https://github.com/openclaw/openclaw/issues/112313)**（7-21 开启至今）— 死信投递队列永久无法清理，无 fix PR，长期挂起。
- **[#121558](https://github.com/openclaw/openclaw/issues/121558)**（P1，8-10 开启）— cron isolated run 叙述文本混入消息，linked PR open 未推进。
- **[#141172](https://github.com/openclaw/openclaw/issues/141172)** — run 启动即死导致 agent.run.started 永久泄漏，bulk-filed。
- **[#149631](https://github.com/openclaw/openclaw/issues/149631)** — PR preflight 在 121 jobs 时撞 120 上限，直接阻塞 CI gate，影响所有大 diff PR。
- **[#114414](https://github.com/openclaw/openclaw/issues/114414)** — 每日 TODO sweep 显示 10-01 到期的 CI auth 路径修复仍 OVERDUE。
- **多标签 needs-maintainer-review 的 P0/P1**（#177656、#187900、#166634 等）持续无响应，建议维护者优先认领。

---
*数据来源：GitHub API（24 小时窗口）；本报告由自动化分析生成，链接均指向对应 Issue/PR。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告
**数据日期：2026-11-03 | 样本：OpenClaw、Hermes Agent**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**重度生产化使用阶段**：用户不再满足于 demo 级对话，而是部署 50 个 cron 任务、14 个 agent、多账号 Matrix/Telegram/Discord 渠道的自托管重度形态，稳定性与运维体验成为核心竞争力。生态的共性技术主线正在收敛为三件事：**统一网关/多渠道接入、长时任务的可靠性（cron/worker/会话恢复）、以及“默认安全”边界的可信性**。与此同时，两个项目都呈现“高吞吐 + 质量债积压”的典型快速成长期特征——每日数百条 Issue/PR 更新，但 P1/P2 级会话状态类 Bug 消化速度落后于新增速度。插件/协议生态（manifest 驱动推荐、AG-UI 适配器）是下一个竞争焦点。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 429（新开/活跃 211，关闭 218） | 500（新开/活跃 457，关闭 43） |
| PR 更新（24h） | 500（待合并 328，合并/关闭 172） | 500（待合并 279，合并/关闭 221） |
| Issue 净收敛 | ✅ 关闭 > 新开（-7 净收敛） | ⚠️ 新开远超关闭（+414 净增长） |
| Release | 无（稳定版 2026.10.x 打磨期） | v0.22.6（11-02，打包 776 个 PR 的补丁版） |
| 核心矛盾 | P0/P1 无 fix PR + needs-maintainer-review 响应慢 | 统一网关迁移后会话状态回归密集 |
| 健康度评估 | **B+**：吞吐健康、净收敛，但安全类 P0（#173058、#161800）与运维链路（doctor/update）长期未解 | **B**：贡献吞吐更猛、修复落地快，但 Bug 净增、v0.22.6 是“先打包后补 changelog”的激进节奏 |

**关键差异**：OpenClaw 今日处于“消化存量”模式；Hermes 处于“边冲刺边欠债”模式——合并速度更快（221 vs 172），但 Issue 关闭仅 43 条，问题积压斜率明显。

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **渠道覆盖广度领先**：飞书、iMessage、MS Teams、Matrix、Discord、语音通话等渠道修复齐头并进，多平台接入矩阵是同类中最宽的。
- **治理流程成熟**：review 流程（proof: screenshot 机制）运转顺畅，贡献门槛低，328 条待合并 PR 中大量社区小型贡献，贡献者漏斗健康。
- **安全边界意识**：对 auth-provider / security-boundary 类 PR 主动标注与优先处理（#191587），并有 security review 通道（#107433）。

**劣势/风险：**
- **维护者带宽瓶颈**：多个 P0/P1（#166634、#177656、#187900）长期 needs-maintainer-review 无响应，与 Hermes “当日发现问题→当日修复”（#148260 关闭网关停摆缺陷）的响应速度形成对比。
- **运维链路信任受损**：doctor 挂起 + managed update 失败链是用户最挫败的体验，“修复工具本身不可用”直接侵蚀品牌信任。

**技术路线差异**：OpenClaw 走“稳定版打磨 + 渠道/插件生态扩展”路线；Hermes 走“大架构迁移（统一网关）+ 快速迭代”路线，代价是回归密集。

**社区规模**：两者 Issue/PR 日更新量同处一线水平（均触顶 500 条 API 窗口），OpenClaw 待合并 PR 略多（328 vs 279），Hermes Issue 增长动能更强（457 vs 211）。

---

## 4. 共同关注的技术方向

| 技术方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **Cron/长时任务可靠性** | #120385（MCP 工具目录不完整）、#121558、#182369 | #146428（cron 静默卡死）、#145022（worker 丢工作）、#108927 | 定时/后台任务“失败要响亮、可重试”，反对静默失败 |
| **会话状态与恢复** | 会话状态丢失为三大热点之一 | #139818（远端会话不可恢复）、#143547 主追踪帖 | 崩溃/重启/跨端后会话可恢复是自托管核心诉求 |
| **安全边界默认可信** | #173058（workspaceOnly 失效）、#142821（脱敏污染）、#147344（静默烧 $25） | #59293（config set 绕过审批层）、#148252/#148251（SSRF/root 面） | “agent 不应能自己关掉自己的护栏”，默认安全不可悄然破坏 |
| **更新/分发链路可靠性** | #187917、#164800（managed update 失败） | #148192/#148244（macOS Squirrel 更新中止专项） | 升级失败是两项目共同的用户流失点 |
| **插件/UI 生态** | #186593（manifest 驱动插件推荐，XL） | #65845（AG-UI 适配器）、浏览器扩展、fallback 插件 | 标准协议接入 + 插件市场是下一阶段竞争点 |
| **多会话编排语义** | #112372、#150598（completion-wake 四规则） | #143720（Discord completion wake 冲突） | wake-on-reply 语义需要跨项目一致的清晰规范 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| **功能侧重** | 全渠道消息接入 + 企业合规（Databricks Gateway）+ 插件推荐生态 | 统一网关架构 + 桌面/移动端分发（MS Store/APK/Termux）+ 浏览器 UI 协议 |
| **目标用户画像** | 自托管重度用户（多渠道家庭服务器、企业合规流量） | 自动化重度用户（Kanban worker、cron 编排）+ 远程桌面前端用户 |
| **技术架构** | 多 provider auth、共享 exec I/O 并发模型、reclamation checkpoint 崩溃恢复 | 统一网关单点架构（近期大迁移）、systemd watchdog、s6 容器化 |
| **独特卖点** | 渠道矩阵宽度、治理流程成熟度 | **自举（dogfooding）**——agent 自主发现并撰写 issue（附 file:line 与复现测试），成为生态独一份的工程能力展示 |
| **架构风险** | 崩溃恢复链路（#166634 P0） | 网关单点停摆连带 worker 批量崩溃（#145022） |

---

## 6. 社区热度与成熟度

- **快速迭代冲刺层 — Hermes Agent**：昨日打包 776 个 PR 发版、今日合并 221 个 PR、AG-UI/Mistral/Android 多线推进，明确的扩张期；代价是 Issue 净增 +414，处于“以速度换市场”阶段，v0.23.0 前需集中收敛网关回归。
- **质量巩固层 — OpenClaw**：无发版、净收敛、聚焦稳定版修复，处于“打地基”阶段；但巩固速度受维护者 review 带宽制约，多个安全 P0 悬置是成熟度短板。
- **共同成熟度信号**：两者均有 6 个月+ 的长期积压（OpenClaw #112313；Hermes #14024），说明“长尾 Bug 治理”是全生态共同弱项；重度自托管用户（50 cron、13 GB 存储、Matrix 多账号）的存在证明两者都已跨过玩具阶段。

---

## 7. 值得关注的趋势信号

1. **“静默失败零容忍”成为用户共识**：Hermes 的 cron 静默卡死、永久弃卡，OpenClaw 的监控器不触发、脱敏静默污染——社区反馈一致指向“宁可响亮失败”。**对开发者的启示**：agent 系统的可观测性与失败语义（attempt cap、告警、可重试）应作为一等公民设计，而非事后补丁。

2. **Agent 安全边界从“功能”变为“契约”**：agent 绕过审批层、文件访问越界、静默升级模型烧钱，三个项目侧案例共同表明用户将“默认安全/默认省钱不可被悄然破坏”视为信任底线。**启示**：权限变更需要不可绕过的审计与用户确认路径。

3. **Agent 自举（dogfooding）成为工程能力差异化卖点**：Hermes 的 agent 自主写 issue（含精确 file:line）预示“用 agent 维护 agent 项目”将从噱头变为标准实践。**启示**：值得投入 agent 友好的代码库结构与自动复现测试基础设施。

4. **标准化 UI/插件协议是下一个战场**：AG-UI 由协议作者亲自下场、OpenClaw 推 manifest 驱动插件推荐，两者都押注生态扩展性。**启示**：早期接入开放协议（AG-UI、MCP）比自建封闭接口更可能赢得第三方贡献者。

5. **运维链路（update/doctor/分发）是被低估的用户流失点**：两个项目最挫败的用户反馈均非核心功能，而是升级失败与诊断工具挂起。**启示**：为长周期自托管用户投入更新原子性与诊断工具可靠性，ROI 极高。

6. **多会话编排语义（wake-on-reply）等待规范化**：两项目社区同时在不精确地讨论同一语义，存在形成跨项目约定/标准的机会窗口。

---

*结论：OpenClaw 与 Hermes Agent 代表了生态的两条路线——“渠道宽度 + 治理成熟”与“架构统一 + 迭代速度”。短期内 Hermes 的动能更强，但 v0.23.0 前的回归收敛是分水岭；OpenClaw 若不能解决安全 P0 悬置与维护者带宽问题，巩固期优势将被侵蚀。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报

**日期：2026-11-03 | 数据来源：github.com/NousResearch/hermes-agent**

---

## 1. 今日速览

Hermes Agent 今日保持高度活跃：过去 24 小时 Issues 更新 500 条（新开/活跃 457，关闭 43），PR 更新 500 条（待合并 279，已合并/关闭 221），社区参与度处于一线开源 AI Agent 项目水准。昨日发布 **v0.22.6** 补丁版本，将自 v0.22.5 以来约 **776 个 PR** 滚动打包为稳定发布。项目当前重心明显集中在 **统一网关（unified gateway, #106742）合并后的稳定性收尾**——会话状态、消息投递、多平台接入（Telegram/Discord/Slack）相关的回归问题占据热榜主流。整体健康度：贡献吞吐量高，但 P1/P2 级会话状态类 Bug 积压较多，需关注质量收敛节奏。

---

## 2. 版本发布

### v0.22.6（2026-11-02）

- **性质**：补丁版本（Patch release），无破坏性 API 变更声明
- **内容**：将 v0.22.5 以来约 776 个合并 PR 打包为稳定标签，覆盖 CLI 与安装器、Microsoft Store 应用、Docker 及 Hermes Cloud 全部分发渠道
- **注意事项**：完整精选 changelog 将随 **v0.23.0** 发布，建议依赖详细变更日志的团队等 v0.23.0 再做升级评估；升级后建议关注下文统一网关相关的会话恢复问题

🔗 https://github.com/NousResearch/hermes-agent/releases

---

## 3. 项目进展

今日 24 小时内合并/关闭 221 个 PR，节奏迅猛。代表性进展：

**稳定性修复**
- [#148260](https://github.com/NousResearch/hermes-agent/pull/148260)（已关闭）修复 2026-11-03 00:12 UTC 网关停摆暴露的两个缺陷：systemd watchdog 心跳由被监控事件循环本身产生（M1），以及 guardrail 停止的 Kanban worker 阻塞问题——网关可观测性关键加固
- [#147990](https://github.com/NousResearch/hermes-agent/pull/147990)（已关闭）修复长会话 forward 时 owner 的 resume 应答被吞问题，涉及 websockets 1 MiB 默认拨号上限
- [#146719](https://github.com/NousResearch/hermes-agent/pull/146719)（已关闭）将 Anthropic 余额不足的 HTTP 400 正确归类为付费错误而非请求错误，改善 aux 梯队的错误处理

**macOS 更新链路专项修复**（两位贡献者密集提交）
- [#148192](https://github.com/NousResearch/hermes-agent/pull/148192)：pyc 文件权限 0o444 → 0o644，修复 Squirrel.Mac 更新安装中止
- [#148244](https://github.com/NousResearch/hermes-agent/pull/148244)：发布记录阶段拒绝缺少 owner-write 权限的更新 ZIP，从源头拦截

**安全加固**
- [#148252](https://github.com/NousResearch/hermes-agent/pull/148252)：cron `monitor_url` 改走共享 URL 安全策略，封堵 loopback/私网地址及重定向绕过
- [#148251](https://github.com/NousResearch/hermes-agent/pull/148251)：Docker 镜像中 profile 网关移出 root s6 scandir，消除以 root 执行 run/finish 脚本的面

**生态扩展**
- [#65845](https://github.com/NousResearch/hermes-agent/pull/65845)：AG-UI 适配器（AG-UI 联合创始人亲自提交），为本地浏览器 UI（流式、artifacts）提供标准协议接入，是长期开放的大型特性 PR
- [#144842](https://github.com/NousResearch/hermes-agent/pull/144842)、[#147356](https://github.com/NousResearch/hermes-agent/pull/147356)：插件目录新增 model-fallback-heuristic 插件与官方 Hermes 浏览器扩展

**评估**：今日进展在网关健壮性、macOS 分发、安全边界三个方向均有实质推进，约占一个中型版本工作量。

---

## 4. 社区热点

1. **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（41 评论）** — 统一网关（#106742）合并后主分支问题追踪帖，横跨 gateway/cron/Telegram/Discord/auth/sessions 等 13 个组件。诉求核心：10 月 14 日架构大迁移后用户集中报告回归，是当前项目最大痛点集合。
2. **[#139818](https://github.com/NousResearch/hermes-agent/issues/139818)（39 评论）** — 远端后端桌面会话无法从本地桌面恢复（`session.resume` 返回 not_found），直击“远程 host + 桌面前端”部署模式可用性。
3. **[#59293](https://github.com/NousResearch/hermes-agent/issues/59293)（27 评论）** — `hermes config set` 绕过系统配置写保护，可被拥有终端权限的 agent 关闭审批层，安全边界设计争议持续发酵，标签含 needs-decision。
4. **[#20859](https://github.com/NousResearch/hermes-agent/issues/20859)（18 评论 / 35 👍）** — Mistral 作为 LLM 提供商的原生支持，👍 数最高的 feature 请求，呼声明确。
5. **[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)（P1, 17 评论）** — 多 Kanban worker 并发时网关停摆导致 worker 批量崩溃且进行中工作丢失，与 #148260 修复方向呼应，用户期待尽快落地。

---

## 5. Bug 与稳定性（按严重程度）

| 严重度 | 问题 | 状态/修复 |
|---|---|---|
| **P1** | [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban worker 因网关停摆批量崩溃，工作丢失 | 疑似部分由 [#148260](https://github.com/NousResearch/hermes-agent/pull/148260) 覆盖（已关闭，待验证） |
| **P1** | [#112961](https://github.com/NousResearch/hermes-agent/issues/112961) Windows 桌面长 WS 会话中 FAST_FAIL 崩溃（固定偏移 0x5281f15） | awaiting-reporter，无 fix PR |
| **P2** | [#139818](https://github.com/NousResearch/hermes-agent/issues/139818) 远端会话不可恢复 | 开放中 |
| **P2** | [#143720](https://github.com/NousResearch/hermes-agent/issues/143720) Discord 线程 completion wake 每 60s 无限 admission_conflict（单日志 494 次，持续 6 小时+），attempt cap 与 notify-mode=off 均失效 | 开放中 |
| **P2** | [#146428](https://github.com/NousResearch/hermes-agent/issues/146428) 多路复用 profile 下 cron run 因 UnscopedSecretError **永久静默卡死** | 开放中 |
| **P2** | [#123985](https://github.com/NousResearch/hermes-agent/issues/123985) / [#128468](https://github.com/NousResearch/hermes-agent/issues/128468) 桌面端消息重复渲染（压缩后/流式中滚动跳动） | 开放中，同根因家族 |
| **P2** | [#136486](https://github.com/NousResearch/hermes-agent/issues/136486) `reasoning` 别名重复回放致 HTTP 400，字段拒绝学习永不触发、每轮回退 | 开放中 |
| **P2** | [#125695](https://github.com/NousResearch/hermes-agent/issues/125695) 单模型 cooldown 使 vision/标题/smart approvals 全局失效一年 | 开放中 |
| **P2** | [#99270](https://github.com/NousResearch/hermes-agent/issues/99270) MCP 客户端将数组参数逐项包成 `{item:…}`，破坏所有数组类型参数 | 开放中 |
| **P2** | [#110374](https://github.com/NousResearch/hermes-agent/issues/110374)（16 👍）slack-sdk ≥3.44 后 Slack 状态指示静默失效 | 开放中 |
| 安全 | [#133435](https://github.com/NousResearch/hermes-agent/issues/133435) package-lock.json 固定 18 个高危 npm 漏洞，且更新路径会丢弃本地修复 | 开放中 |

**今日新报**：[#148228](https://github.com/NousResearch/hermes-agent/pull/148228)（[SILENT] 标记泄漏到聊天记录，已有 fix PR）、[#148259](https://github.com/NousResearch/hermes-agent/pull/148259)（空模型目录缓存 60s 导致选择器空白，已有 fix PR）。

---

## 6. 功能请求与路线图信号

- **Mistral 提供商支持**（[#20859](https://github.com/NousResearch/hermes-agent/issues/20859)，35 👍）：呼声最高，且语音模型已集成，技术阻力小，**很可能进入 v0.23.x**。
- **AG-UI 适配器**（[#65845](https://github.com/NousResearch/hermes-agent/pull/65845)）：上游协议作者亲自推进，直接回应 #501 浏览器 UI 需求，是路线图上重要的 UI 生态信号。
- **Android/Termux + APK 构建**（[#140850](https://github.com/NousResearch/hermes-agent/pull/140850)、[#148263](https://github.com/NousResearch/hermes-agent/pull/148263)）：社区持续贡献，移动端扩展方向明确。
- **压缩风险时自动新会话交接**（[#20372](https://github.com/NousResearch/hermes-agent/issues/20372)）与 **桌面聊天宽度设置**（[#55287](https://github.com/NousResearch/hermes-agent/issues/55287)）：needs-decision 标签，等待维护者拍板。
- **桌面简化 agent 侧边栏 + 嵌套聊天**（[#148153](https://github.com/NousResearch/hermes-agent/pull/148153)）：opt-in 设计降低合并阻力，观察后续评审。

---

## 7. 用户反馈摘要

- **远程/自托管用户不满**：远端后端 + 桌面前端的核心部署场景（#139818）恢复会话失败，且 macOS 官方安装器仍强制本地 bootstrap（#85422，已关闭），入门体验受损。
- **重度自动化用户（Kanban/cron）痛点最尖锐**：worker 崩溃丢工作（#145022）、静默卡死（#146428）、熔断永久弃卡（#108927）——用户依赖 Hermes 跑长时任务，“失败要响亮、可重试”是普遍诉求。
- **企业/代理网络环境**：SSL_CERT_FILE 被忽略（[#148253](https://github.com/NousResearch/hermes-agent/pull/148253)）表明 TLS 拦截代理场景真实存在。
- **正面信号**：多份 issue 由 Hermes agent 自主发现并撰写（#143918、#146558），附精确 file:line 引用与复现测试，**项目自举（dogfooding）能力成为独特卖点**；插件目录第三方贡献（fallback 启发式、浏览器扩展）显示生态正在成形。
- **成本/性能敏感**：图片附件从不驱逐、全尺寸随每次 LLM 调用中继（#143918），重度图片用户 token 成本显著上升。

---

## 8. 待处理积压（建议维护者优先关注）

| 条目 | 开放时长 | 理由 |
|---|---|---|
| [#14024](https://github.com/NousResearch/hermes-agent/issues/14024) fact_store 连字符查询 FTS5 报错 | 自 2026-04-22（**6 个月+**） | 记忆工具核心功能静默失效 |
| [#68682](https://github.com/NousResearch/hermes-agent/issues/68682) Holographic memory 维度不匹配崩溃、零错误隔离 | 自 2026-07-21 | 单条脏数据拖垮整个检索管线 |
| [#67458](https://github.com/NousResearch/hermes-agent/issues/67458) `-w` worktree 在 one-shot 模式被静默忽略 | 自 2026-07-19 | 静默错误行为，可能致提交落到错误分支 |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) config set 绕过审批层保护 | 自 2026-07-06 | 安全问题 + needs-decision 长期悬置 |
| [#133435](https://github.com/NousResearch/hermes-agent/issues/133435) 18 个高危 npm 漏洞锁定 | 自 2026-10-05 | 供应链安全，需上游 lockfile 刷新 |
| [#65845](https://github.com/NousResearch/hermes-agent/pull/65845) AG-UI 适配器 | 自 2026-07-16 | 高价值大 PR 长期未合并，存在腐化风险 |

**总体判断**：项目吞吐与社区热度优秀，但统一网关迁移后的会话状态回归（P1/P2 密集）是当前最大技术债，建议在 v0.23.0 前集中收敛，避免新功能叠压在未稳定的地基上。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*