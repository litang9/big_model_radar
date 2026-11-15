# OpenClaw 生态日报 2026-11-16

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-15 23:57 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-16

## 1. 今日速览

OpenClaw 过去 24 小时保持了极高的社区活跃度：500 条 Issue 更新（429 新开/活跃，71 关闭）与 500 条 PR 更新（343 待合并，157 合并/关闭），同时发布了新版本 **v2026.11.5-beta.3**。当前项目重心明显集中在**大会长会话（large-session）可靠性与内存压力**上，新版本 Highlights 与多项热门 PR 均围绕 transcript 索引、压缩与 hydration 优化。与此同时，Windows/macOS 平台的 Gateway 生命周期管理（启动、停止、更新交接）仍是 P0 级痛点聚集地，多个发布阻塞级 Bug 长期处于待维护者评审状态。整体来看项目推进速度快、贡献者生态（含 bot 化贡献 roboclaw-bot）健康，但高优 Bug 的维护者响应存在明显积压。

---

## 2. 版本发布

### v2026.11.5-beta.3
- **Highlights — 大会话可靠性**：降低 transcript 索引、裁剪（trimming）与压缩（compaction）过程中的内存压力；hydration 仅流式传输选中的 payload，并遵循可配置的摘要上限。
- 关联 Issue/PR：#194099、#194066、#194536、#196207，感谢 @vincentkoc、@aniruddhaadak80。
- **破坏性变更**：无明确破坏性变更；但注意行为上 hydration 与摘要上限变为可配置，升级后如依赖旧的完整 hydration 行为需检查配置。
- **迁移注意**：受 [#193962](https://github.com/openclaw/openclaw/issues/193962) 影响的用户（2026.10.10 起 SQLite header-probe 超时导致 `openclaw update` 无法到达新版本）需关注该修复路径是否在本 beta 中打通。

---

## 3. 项目进展

今日合并/关闭 157 个 PR，代表性进展包括：

- **UI/模板体验**：#199845（已关闭）为 Template 详情页补上安全审计/版本信息栏；#198823、#198831 修复 Templates 目录图片乱码与 publisher 限定链接预览失败；#199064 修复 setup helper 无法安装 ClawHub Templates。
- **性能与稳定性**：#199840 修复手动压缩期间重复拷贝 transcript 的主线程开销；#199777（已关闭）减少清理 worktree 移除时的停顿；#199836（已关闭）将 CI npm 源检查并行化（FRV 单项耗时从 ~71 分钟压缩）。
- **测试与 CI 健康**：#199846 修复 auto-reply 测试套件在 main 上的失败；#199851 稳定 Gateway 每小时测试 fixture；#185851 复用 Knip 分析（7 次扫描减为 3 次）。
- **Windows/macOS 可靠性**：#199777（steipete）与 #199847 继续修补升级/依赖检查内部路径。

整体节奏：模板/ClawHub 生态、Control UI 打磨、CI 效率三条线均有实质推进，beta.3 的发布将大会话可靠性改进带给用户。

---

## 4. 社区热点

1. **[#160959](https://github.com/openclaw/openclaw/issues/160959)**（82 评论，P0）— Gateway 捕获大型外部插件时阻塞数分钟（2026.9.6 回归）。与 [#174681](https://github.com/openclaw/openclaw/issues/174681)（修复 PR #172750 反而加剧阻塞）同源，是当前讨论最激烈的问题，诉求是**插件加载不得阻塞主线程**。
2. **[#170956](https://github.com/openclaw/openclaw/issues/170956)**（33 评论，P0）— Windows schtasks 安装下启动慢、关停不干净、权限错误导致重启/更新极不可靠。
3. **[#191944](https://github.com/openclaw/openclaw/issues/191944)**（28 评论，P2）— macOS `gateway stop / stop --force` 均报 "Process ancestry could not be fully inspected"。
4. **[#193962](https://github.com/openclaw/openclaw/issues/193962)**（26 评论，已关闭，P0）— 修复 SQLite probe 超时的版本本身无法通过 update 到达，"修复够不着受害者"的经典更新死锁，今日关闭说明已有进展。
5. **[#121661](https://github.com/openclaw/openclaw/issues/121661)**（18 评论，P1）— CLI-backed subagent 唤醒回合无工具可用，模型**伪造工具调用及其输出**，涉及产品决策与安全评审。
6. **[#143017](https://github.com/openclaw/openclaw/issues/143017)**（17 评论）— Prompt 前缀被五种方式重写，实测 21.3M cache-write token 浪费；作者基于生产流量 wire capture 反复补充证据，反映重度用户对**成本可控性**的强烈诉求。

---

## 5. Bug 与稳定性（按严重度）

**P0**
- [#160959](https://github.com/openclaw/openclaw/issues/160959) 大插件捕获阻塞 Gateway 数分钟（crash-loop，release blocker）— 无 fix PR，`needs-maintainer-review`
- [#146860](https://github.com/openclaw/openclaw/issues/146860) Windows InteractiveToken 计划任务下更新交接永远停在 activating → abandoned — 无 fix PR
- [#146791](https://github.com/openclaw/openclaw/issues/146791) iOS App Store 版（2026.9.2）无法发布 APNs relay 注册，推送失效 — 无 fix PR

**P1**
- [#196199](https://github.com/openclaw/openclaw/issues/196199)（2026.10.10 回归）原生 Codex helper 完成后无法恢复父会话，用户被锁在助手外 — `needs-info`
- [#194403](https://github.com/openclaw/openclaw/issues/194403) helper 完成续跑自我撤销执行权限，会话被阻断 — 无 fix PR
- [#181120](https://github.com/openclaw/openclaw/issues/181120) macOS 主线程在关闭 worker MessagePort 时死锁 — 无 fix PR
- [#174681](https://github.com/openclaw/openclaw/issues/174681) 回归：#172750 使插件准备阻塞主线程数分钟（已在 release 分支回退）
- [#142922](https://github.com/openclaw/openclaw/issues/142922) 系统代理委派丢失运行权限（安全相关，`needs-security-review`）
- [#196505](https://github.com/openclaw/openclaw/issues/196505) ~864 MiB 语料 memory index 报 "worker task capacity reached" 不重试
- [#185111](https://github.com/openclaw/openclaw/issues/185111) 大会话 context 读取全量扫描 transcript（19–25s 快照读）— 与 beta.3 主题直接相关

**P2（今日新增/活跃）**
- [#199713](https://github.com/openclaw/openclaw/issues/199713)（11-15 新开，7 评论）Control UI Plugins → Advanced 挂死移动 Chrome 渲染进程
- [#157537](https://github.com/openclaw/openclaw/issues/157537) claude-cli 消息去重失败导致 webchat 重复投递
- [#161158](https://github.com/openclaw/openclaw/issues/161158) `gateway restart` 成功却报失败且 exit 0，60s 就绪预算硬编码

> ⚠️ 显著模式：几乎所有高优 Bug 均带 `clawsweeper:no-new-fix-pr` 标签，修复 PR 供给严重不足。

---

## 6. 功能请求与路线图信号

- **[#197297](https://github.com/openclaw/openclaw/issues/197297)** 多用户 Gateway 的**每用户密钥保险库**（需安全评审）— 多租户场景刚需，进入核心+插件架构讨论。
- **[#166586](https://github.com/openclaw/openclaw/issues/166586)** 消费 MCP Events 并按事件触发 agent run — 与 MCP 生态深化方向一致。
- **[#184803](https://github.com/openclaw/openclaw/issues/184803)** Talk 通话可关闭/替换语音任务回执。
- **[#167341](https://github.com/openclaw/openclaw/issues/167341)** 运维者自定义模型失败文案 — **已有对应实现 PR [#199750](https://github.com/openclaw/openclaw/pull/199750)（英/德文本地化）在途，纳入下一版本概率高**。
- **Cron 弹性调度**：[#197394](https://github.com/openclaw/openclaw/pull/197394) + [#197395](https://github.com/openclaw/openclaw/pull/197395)（按 agent 限额与内存自适应、provider 限流退避）正在推进，方向信号明确。
- **[#156774](https://github.com/openclaw/openclaw/issues/156774)**（已关闭）按 turn 选择模型+推理力度 — 可能以其他形式延续。
- **[#101294](https://github.com/openclaw/openclaw/pull/101294)** WhatsApp 手机号配对登录，长龄大 PR，仍在维护者评审中。

---

## 7. 用户反馈摘要

- **重度/生产用户**（Telegram、WhatsApp 面向 agent 的部署）最痛苦的是**成本与上下文管理**：prompt cache 前缀反复重写（#143017、#159799、#150081）、大会话快照读慢（#185111）直接造成真金白银浪费；beta.3 正面回应了这一群体。
- **Windows 用户**对更新/重启可靠性近乎绝望（"pas na veel proberen"），多问题叠加形成**无法自救**的体验（#170956、#146860）。
- **subagent/委派工作流**用户频繁遇到会话卡死、消息丢失、权限丢失（#196199、#194403、#166964、#162637）——这是 agent 编排核心路径的质量短板。
- **可观测性诉求普遍**：#127195 指出 16 处调用点抛出字节级相同的错误串，生产环境无法定位根因。
- **正面信号**：用户报告质量极高（wire capture、VACUUM INTO 复制库等取证），ClawSweeper 自动分诊体系运转良好，社区与维护者（steipete、RomneyDa 等）互动密集。

---

## 8. 待处理积压（请维护者关注）

| Issue/PR | 状态 | 积压时长 | 说明 |
|---|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) P0 | needs-maintainer-review | 自 09-29 | 82 评论最高热，无 fix PR |
| [#170956](https://github.com/openclaw/openclaw/issues/170956) P0 | needs-info | 自 10-13 | Windows 可靠性三连问题 |
| [#146791](https://github.com/openclaw/openclaw/issues/146791) P0 | needs-maintainer-review | 自 09-13 | iOS 推送注册失效两个月 |
| [#146860](https://github.com/openclaw/openclaw/issues/146860) P0 | needs-info | 自 09-13 | Windows 更新交接卡死 |
| [#121661](https://github.com/openclaw/openclaw/issues/121661) P1 | needs-product-decision + security-review | 自 08-10 | 模型伪造工具调用，安全敏感 |
| [#121558](https://github.com/openclaw/openclaw/issues/121558) P1 | needs-product-decision | 自 08-08 | Cron 叙述文本混入播报消息 |
| [#118793](https://github.com/openclaw/openclaw/issues/118793) P2 (stale) | — | 自 08-03 | 限流错误不触发 fallback 链 |
| [#103067](https://github.com/openclaw/openclaw/issues/103067) P2 | needs-product-decision | 自 07-09 | 会话命名/生命周期架构决策 |
| PR [#101294](https://github.com/openclaw/openclaw/pull/101294) WhatsApp 手机号登录 | ready for maintainer | 自 07-07 | 4 个多月未合并 |

**健康度小结**：吞吐与贡献热度优秀，beta.3 聚焦的方向正确；但 P0 积压（尤其 Windows/iOS 平台与插件加载阻塞）与 `no-new-fix-pr` 标签的普遍存在表明**修复供给落后于问题发现**，建议优先投入 Gateway 生命周期与 subagent 权限交接两条线。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告 — 2026-11-16

> 本期数据源：OpenClaw 与 Hermes Agent 两项目当日社区动态（单日快照，趋势判断仅供参考）。

---

## 1. 生态全景

个人 AI 助手 / 自主智能体开源生态整体处于**功能高速迭代与技术债集中爆发并存的阶段**。两个头部项目单日均维持 300–500 条 Issue/PR 更新，说明社区需求发现速度远超修复供给，`no-new-fix-pr` 类标签与 P0 积压成为普遍现象。**长会话成本（prompt cache、上下文压缩）与多用户安全隔离（RBAC、per-user vault）**正在从边缘诉求上升为生态级核心议题。同时，网关/守护进程生命周期管理（启动、更新、恢复）是所有项目共同的工程深水区，Windows/iOS 等平台的可靠性短板尤为突出。插件/模板生态自增长健康，社区取证式 Bug 报告质量高，反映用户群体正从尝鲜者转向生产部署者。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（新开+活跃 / 关闭） | 500（429 / 71） | 338（288 / 50） |
| PR 更新（待合并 / 合并+关闭） | 500（343 / 157） | 500（396 / 104） |
| Release | v2026.11.5-beta.3（大会话可靠性主题） | v0.23.1 canary（滚动预发布） |
| Issue 关闭/新开比 | ~1:6.0 | ~1:5.8 |
| PR 合并率 | ~31% | ~21% |
| 核心议题 | 大会话内存/压缩、Gateway 生命周期、插件阻塞 | 统一网关回归清理、成本优化、RBAC |
| 健康度评估 | 吞吐优秀；P0 积压严重（4 项 release blocker 级），修复供给不足 | 迭代第一梯队；网关重构回归债 + 安装恢复体验是主要技术债，P1 响应快（当日 fix PR） |

两者均处于“问题发现 >> 修复供给”状态，但 Hermes 当日修复响应更敏捷，OpenClaw 合并吞吐更高。

---

## 3. OpenClaw 在生态中的定位

- **规模与吞吐领先**：单日 500 Issue + 500 PR 更新、157 PR 合并，贡献者生态含自动化 bot（roboclaw-bot、ClawSweeper 自动分诊），工程基础设施成熟度在同类中最高。
- **优势**：
  - 平台覆盖最广（Windows/macOS/iOS/APNs 推送/WhatsApp/Telegram），是面向终端用户的全平台个人助手定位；
  - 模板/ClawHub 分发生态已成型，本周多个模板体验修复显示其“应用商店化”路线；
  - beta.3 直击大会话内存与压缩，技术纵深（transcript 索引、hydration 流式化）领先。
- **短板**：P0 修复积压严重（#160959 插件阻塞 82 评论自 09-29 无 fix PR；Windows/iOS 平台问题 2 个月未解）；高优 Bug 几乎全部带 `clawsweeper:no-new-fix-pr`。
- **技术路线差异**：OpenClaw 走“核心 + ClawHub 插件市场 + 多平台 Gateway”的重平台路线；Hermes 走“统一网关 + 多 profile Kanban 自动化 + 消息平台（Telegram/Discord）多人部署”的 agent 编排路线，且以 stable/canal 双发布通道控制风险。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **Prompt cache / token 成本** | #143017（前缀五种方式重写，21.3M token 浪费） | #122094（cache 保活）、#156081（过期输出落盘）、#6642（费用遥测） | 长会话下 cache 命中率与成本可观测性，重度用户的真金白银问题 |
| **上下文压缩 / 大会话管理** | beta.3 核心（trimming/compaction 内存优化）、#185111、#196505 | #99524、#117886、#20372（非阻塞后台压缩） | 压缩不阻塞主线程、可配置摘要上限 |
| **多用户安全隔离** | #197297（per-user 密钥保险库） | #527（RBAC，16 👍）、#21574（per-user 隔离 RFC）、#141346（smart approval 数据丢失事件） | 从“全有或全无”授权走向分级权限，prompt injection 驱动的安全评审 |
| **更新/安装自恢复** | #193962（修复够不着受害者的更新死锁）、#146860 | #125437（半装状态无恢复路径，一周 15 个 Discord 帖） | in-product recovery，而非命令行自救 |
| **子 agent / 委派可靠性** | #196199、#194403、#121661（模型伪造工具调用） | #145022（worker 批量崩溃） | 委派权限交接与会话恢复是编排核心路径的质量短板 |
| **Cron / 调度弹性** | #197394/#197395（限额自适应、限流退避） | #139825（卫星 cron 投递回归） | 定时任务的限流容错与投递保证 |

其中**成本优化与 RBAC** 是两项目社区热度最高、最可能成为下一版本大特性的共同方向。

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 全平台个人助手（iOS 推送、Talk 语音、WhatsApp、模板市场） | agent 编排自动化（Kanban 工作流、多 profile worker、消息平台多人网关） |
| 目标用户 | 个人终端用户 + 轻运维部署者 | Telegram/Discord 社区运营者、自动化重度用户（Nous 生态） |
| 架构 | 核心 + ClawHub 插件分发，Gateway 管理多平台生命周期 | 统一网关（v0.23 大重构）+ 沙箱 worker + skill 体系 |
| 发布策略 | beta 通道 + 版本化 release | stable + 滚动 canary 双通道 |
| 安全重心 | 密钥保险库、代理权限委派、模型伪造工具调用评审 | smart approval 收紧、skill 跨 profile 隔离、secret 加固 |

---

## 6. 社区热度与成熟度分层

- **快速迭代期（功能扩张 > 质量巩固）**：Hermes Agent — PR 合并率 21%、网关重构后回归集中爆发（#143547 追踪板）、插件目录周增 5+，处于典型的“大重构后收敛期前端”。
- **规模成熟但质量承压期**：OpenClaw — 吞吐与生态规模最大，但 4 项 P0（含 release blocker）长期积压、多项 needs-product-decision 挂起 3–4 个月（#121661 自 08-10），表明规模成熟度已领先而工程响应容量成为瓶颈。
- 两项目共同点：**修复供给落后于问题发现**，需警惕高优积压对生产用户信任的侵蚀（Windows用户已现“无法自救”情绪）。

---

## 7. 值得关注的趋势信号

1. **成本工程成为一等公民**：两项目同日出现 cache 保活/前缀稳定性 PR 与 token 浪费实证报告——AI 智能体开发者应将 prompt cache 命中率纳入核心设计指标，而非事后优化。
2. **多租户安全是下一战场**：RBAC、per-user vault、审批策略收紧（数据丢失事件驱动）三线并发，单人授权模型将被淘汰；安全评审流程（needs-security-review）将成标配。
3. **压缩/hydration 架构分化点**：从全量上下文转向“流式选中 payload + 可配置摘要上限 + 后台非阻塞压缩”，这是长会话 agent 的基础设施级演进。
4. **更新可靠性是被低估的护城河**：两项目的最痛用户反馈均非 AI 能力，而是“更新失败后无法自救”；in-product recovery 将成留存关键。
5. **可信自动化要求行为可审计**：模型伪造工具调用（#121661）、字节级相同错误串（#127195）提醒开发者：工具可用性校验与错误可定位性是 agent 可信度的底线设计。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-16

## 1. 今日速览

Hermes Agent 今日保持高活跃度：过去 24 小时 Issues 更新 338 条（新开/活跃 288，关闭 50），PR 更新 500 条（待合并 396，合并/关闭 104），并发布了 1 个 canary 版本。开发重心集中在**统一网关（unified gateway）稳定性收尾**、**上下文压缩与 prompt 缓存成本优化**，以及**插件生态目录的持续扩充**。Issue 关闭/新开比约 1:5.8，PR 合并率约 20%，表明项目处于功能快速迭代期、积压压力偏大，但核心贡献者（@teknium1 等）响应迅速，大量当日提交的 fix PR 显示交付节奏健康。

---

## 2. 版本发布

**[v0.23.1+canary.20261115T064406Z](https://github.com/NousResearch/hermes-agent/releases)**（2026-11-15）

- Canary 预发布通道版本，附 Hermes Desktop 各平台安装包（macOS Apple Silicon DMG 等）。
- 属于 v0.23.x 线的滚动 canary，未见标注破坏性变更；建议生产用户留在 stable 通道，canary 仅用于验证。
- 值得注意：v0.22.3 曾引入 `gateway/session_local_recovery.py` 导致卫星 cron 投递回归（[#139825](https://github.com/NousResearch/hermes-agent/issues/139825)），升级 canary 前请确认该问题是否已修复。

---

## 3. 项目进展

今日合并/关闭的代表性 PR：

- **[#137788](https://github.com/NousResearch/hermes-agent/pull/137788)**（已关闭）：Desktop Kanban 卡片移至 Done 时改为请求完成摘要，修复空结果报错（Fixes #135650）。
- **[#137479](https://github.com/NousResearch/hermes-agent/pull/137479)**（已关闭）：PM 层面区分“不可读”与“损坏”的安装戳，改善安装诊断体验（Part of #133351）。

当日新开、正在推进的重点 PR：

- **[#122094](https://github.com/NousResearch/hermes-agent/pull/122094)**：长工具运行期间 prompt cache 保活（Nous Portal / OpenRouter / Anthropic），显著降低长会话 token 成本。
- **[#156081](https://github.com/NousResearch/hermes-agent/pull/156081)**：缓存过期后旧工具输出落盘替代全量重发（#136488 的 salvage），与 #122094 构成完整的成本优化组合。
- **[#156250](https://github.com/NousResearch/hermes-agent/pull/156250)**：沙箱 cwd 被删除后终端自动上溯可用目录，修复 exit 126 系列 bug（对应 #107156）。
- **[#128965](https://github.com/NousResearch/hermes-agent/pull/128965)** / **[#111326](https://github.com/NousResearch/hermes-agent/pull/111326)**：清除被替换运行时的 PYTHONPATH 泄漏（#122928）、为 worker 增加 MemorySwapMax 上限。
- 安全类：**[#156289](https://github.com/NousResearch/hermes-agent/pull/156289)**（后台 skill 写入的目标变更校验）、**[#156263](https://github.com/NousResearch/hermes-agent/pull/156263)**（共享 skill 跨 profile 锁隔离）、**[#155063](https://github.com/NousResearch/hermes-agent/pull/155063)**（secret-drop 插件凭证加固）。
- 体验类：**[#156288](https://github.com/NousResearch/hermes-agent/pull/156288)**（修复行内代码吞掉后续回复的渲染）、**[#156295](https://github.com/NousResearch/hermes-agent/pull/156295)**（工具行长 ID 不再四舍五入）。

整体判断：网关/Kanban 稳定性 + 会话成本优化 + 插件目录（token-stats、stoa 0.24.1、Personae 2.0、hermes-ui 1.6.2）三条线并行，迭代速度在同类项目中属第一梯队。

---

## 4. 社区热点

| 议题 | 热度 | 诉求分析 |
|---|---|---|
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 统一网关合并后问题追踪（73 评论） | 🔥 最高 | #106742 合并后 main 分支持续暴露回归，是当前社区最集中的抱怨源 |
| [#141346](https://github.com/NousResearch/hermes-agent/issues/141346)（已关闭，39 评论）Smart approval 自动放行 osascript 致用户数据丢失 | 安全事件级 | 默认 `smart` 审批模式过于激进，用户要求收紧危险命令放行策略 |
| [#527](https://github.com/NousResearch/hermes-agent/issues/527)（21 评论，16 👍）网关 RBAC 权限分级 | 最高 👍 | Telegram/Discord/Slack 多人场景下“全有或全无”授权模型是最大架构短板，与 [#21574](https://github.com/NousResearch/hermes-agent/issues/21574)（per-user 隔离 RFC，受 prompt injection 事件驱动）同源 |
| [#125437](https://github.com/NousResearch/hermes-agent/issues/125437)（20 评论）更新失败半装状态、无产品内恢复 | 痛点聚类 | 一周 15 个 Discord 帖，要求 in-product recovery 而非手打命令 |
| [#129993](https://github.com/NousResearch/hermes-agent/issues/129993) / [#137287](https://github.com/NousResearch/hermes-agent/issues/137287) Desktop 转录重复/乱序/丢消息 | 高频 | Desktop 会话渲染层的状态一致性问题 |

---

## 5. Bug 与稳定性（按严重度）

**P1**
- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022)：网关保存 worker 时停顿导致 Kanban worker 批量崩溃、进行中工作丢失（24 评论）。暂无专门 fix PR。
- [#125437](https://github.com/NousResearch/hermes-agent/issues/125437)：更新失败半装 + 无恢复路径（Windows）。#137479 已合并部分缓解安装诊断。

**P2**
- [#139532](https://github.com/NousResearch/hermes-agent/issues/139532)：网关 mid-turn 重启将会话 fencing 为 unknown，后续消息永久排队、Desktop 无解锁入口。
- [#119070](https://github.com/NousResearch/hermes-agent/issues/119070)：Kanban 卡片因一次限流被永久标记 `blocker_auth`，reviewer 永不触发；与 [#29458](https://github.com/NousResearch/hermes-agent/issues/29458)（active_pr 守卫无运维清除路径）同属 dispatcher 卡死家族。
- [#139825](https://github.com/NousResearch/hermes-agent/issues/139825)：**v0.22.3 回归**——Desktop 本地适配器注册后卫星 Discord cron 投递失败。
- [#148898](https://github.com/NousResearch/hermes-agent/issues/148898)：zstd 压缩导致 Codex 后端偶发 HTTP 400 且被归为不可重试（上游因素）。
- [#89412](https://github.com/NousResearch/hermesResearch/hermes-agent/issues/89412)：MCP OAuth 仅在 401 挑战时触发，Gmail MCP 等不挑战的服务无法登录。
- [#149979](https://github.com/NousResearch/hermes-agent/issues/149979)：远程网关 + Bot Chat 会话媒体下载 "Session not found"。

**P3**
- [#105758](https://github.com/NousResearch/hermes-agent/issues/105758)：终端生命周期守卫误伤 Node CLI —— 已有 [#156250](https://github.com/NousResearch/hermes-agent/pull/156250) 直接回应（cwd 删除场景）。
- [#107156](https://github.com/NousResearch/hermes-agent/issues/107156)（已关闭）：stale cwd brick 终端 —— #156250 修复。

---

## 6. 功能请求与路线图信号

- **RBAC / 多用户隔离**（[#527](https://github.com/NousResearch/hermes-agent/issues/527)、[#21574](https://github.com/NousResearch/hermes-agent/issues/21574)）：16 👍 + 官方参与讨论，`needs-decision` 标签显示正在评审，是最可能的下一版本大特性。
- **后台/非阻塞上下文压缩**（[#99524](https://github.com/NousResearch/hermes-agent/issues/99524)、[#117886](https://github.com/NousResearch/hermes-agent/pull/117886)、[#20372](https://github.com/NousResearch/hermes-agent/issues/20372)）：三个相关 issue + #156081 已在途，压缩体验重构箭在弦上。
- **成本可观测性**（[#6642](https://github.com/NousResearch/hermes-agent/issues/6642)）：telemetry/费用分析，与 #122094、#156294（token-stats 插件）形成呼应，社区插件可能先于核心落地。
- **Desktop 换行输入**（[#52952](https://github.com/NousResearch/hermes-agent/issues/52952)）：低垂果实，长期未修。
- **记忆上限自动扩容**（[#5320](https://github.com/NousResearch/hermes-agent/issues/5320)）：P3，处于 needs-decision。

---

## 7. 用户反馈摘要

- **不满集中在三处**：① 更新/安装失败后无自助恢复路径，用户依赖 Discord 手打配方（#125437）；② Desktop 转录渲染重复/乱序/丢消息，影响信任感（#129993、#137287）；③ 审批放行过宽导致真实数据丢失（#141346），用户对 `smart` 模式安全感下降。
- **高频使用场景**：Telegram/Discord 等消息平台的多人网关部署、多 profile Kanban 自动化工作流、长时间运行的本地 agent 任务——这些恰是问题高发区。
- **正面信号**：成本优化 PR（cache 保活、过期输出落盘）直击用户 token 账单痛点；插件目录提交活跃（token-stats、stoa、Personae、hermes-ui、secret-drop），生态自增长健康；P1 问题当日即有针对性 fix PR，维护者响应速度受社区认可。

---

## 8. 待处理积压（建议维护者关注）

| 议题 | 积压时长 | 说明 |
|---|---|---|
| [#527](https://github.com/NousResearch/hermes-agent/issues/527) | ~8 个月 | RBAC，16 👍，等待架构决策 |
| [#105758](https://github.com/NousResearch/hermes-agent/issues/105758) | ~2 个月，needs-decision | 守卫误报，#156250 或已覆盖，建议关联验证后关闭 |
| [#29458](https://github.com/NousResearch/hermes-agent/issues/29458) | ~6 个月 | Kanban active_pr 守卫无清除路径，与 #119070 应合并治理 |
| [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) | ~3 个月 | MCP OAuth 探测式触发，阻碍 Google 系 MCP 接入 |
| [#52952](https://github.com/NousResearch/hermes-agent/issues/52952) | ~5 个月 | Desktop 换行，简单修复但长期搁置 |
| [#36755](https://github.com/NousResearch/hermes-agent/issues/36755) | ~5 个月 | systemd 诊断误报，影响系统级部署体验 |

**健康度小结**：项目交付活跃、生态繁荣，但统一网关大重构后的回归清理（#143547 追踪板）和安装/恢复体验是当前两大技术债；RBAC 决策落地将是下一阶段最关键的路线图节点。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*