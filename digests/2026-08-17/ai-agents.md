# OpenClaw 生态日报 2026-08-17

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-08-16 20:36 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 · 2026-08-17

---

## 1. 今日速览

OpenClaw 今日保持**极高频活跃**状态：过去 24 小时 Issues 更新 500 条（新开/活跃 460 条，关闭仅 40 条），PR 更新 500 条（待合并 395 条，已合并/关闭 105 条），单日维护者产出密度在同类开源 Agent 项目中属于头部水平。核心维护者 [@steipete](https://github.com/openclaw/openclaw/pull/124772) 今日集中提交了约 15 个 PR，覆盖 Gateway 稳定性、WebSocket 生命周期、Control UI 打磨与边界校验重构，是明显的"清障日"。社区讨论焦点仍高度集中于**消息投递可靠性（silent message loss）**与 **2026.6.x/7.x 升级后的回归问题**。今日发布 1 个 Release，为 Gateway 性能分析工件而非面向用户的版本。整体健康度：产出强劲，但 Issue 关闭率（约 8%）显著低于新增速度，积压压力上升。

---

## 2. 版本发布

**[pr-124528-profiles](https://github.com/openclaw/openclaw/releases)** — PR #124528 Gateway 性能分析证据

- **内容**：来自"三节点、12 并发 turn"受控 Gateway 测试机架的 CPU profiles，包含事件循环热点对比所用的代表性 before profile 与精确 head 的 after profile。
- **性质**：QA/性能回归证据归档，**非用户可见版本，无破坏性变更，无需迁移**。
- **信号**：Gateway 事件循环热点优化（PR #124528）正在走严格的证据化验收流程，性能治理流程成熟度较高。

---

## 3. 项目进展

今日 105 个 PR 合并/关闭，可见的重要推进如下（按主题分组）：

**🔒 安装策略安全链路收官**
- [#120900 feat(ui): review install policy warnings](https://github.com/openclaw/openclaw/pull/120900) 与 [#116489 feat(security): require acknowledgement for install policy warnings](https://github.com/openclaw/openclaw/pull/116489) 均已关闭——插件/技能安装的"警告→管理员确认→继续"安全闭环（CLI + Control UI + macOS 全端）走完评审流程，这是本日最重要的功能性落地。
- [#116612 fix(skills): allow hardlinked SKILL.md files under /nix/store](https://github.com/openclaw/openclaw/pull/116612) 已关闭，修复 NixOS `auto-optimise-store` 硬链接导致技能被静默拒载的问题。

**🌐 Gateway / WebSocket 稳定性（今日主战场）**
- [#124771](https://github.com/openclaw/openclaw/pull/124771)：修复已关闭客户端在异步分发窗口内恢复会话订阅导致的注册表泄漏。
- [#124772](https://github.com/openclaw/openclaw/pull/124772)：修复 Gateway 热更新后旧 Control UI 变"僵尸连接"（WS 4008 拒绝但页面仍可交互）。
- [#124798](https://github.com/openclaw/openclaw/pull/124798)：node 事件扇出投递失败不再静默，补齐运维可观测性。
- [#124659](https://github.com/openclaw/openclaw/pull/124659)：修复托管 Gateway 更新交接时 supervisor 与 detached updater 竞争创建后继进程（源自生产事故）。

**📨 消息投递正确性**
- [#124310](https://github.com/openclaw/openclaw/pull/124310)：`message` 工具"已证实未发出"的失败不再被恢复机制隐形重发，防止重复发送。
- [#124318](https://github.com/openclaw/openclaw/pull/124318)：恢复 Tool Search 模式下模型输出的双层嵌套 `tool_call` 参数。
- [#124793](https://github.com/openclaw/openclaw/pull/124793)：将 `[[reply_to]]`/`[[audio_as_voice]]` 等投递指令在 assistant 写入边界统一持久化，消除多消费端重复解析。

**🧱 架构与工程化**
- [#124820](https://github.com/openclaw/openclaw/pull/124820)（XL）：七处外部数据边界的 `typeof` 手工校验统一收敛为 schema 校验；[#124808](https://github.com/openclaw/openclaw/pull/124808) 配套去除内部重复校验。
- [#123975](https://github.com/openclaw/openclaw/pull/123975)：tsgo 卡死时 typecheck 无限挂起改为快速失败；[#124818](https://github.com/openclaw/openclaw/pull/124818)（实验性，明确不合并）探索 Blacksmith CI 提速。

**🖥 Control UI 密集打磨**：[#124799](https://github.com/openclaw/openclaw/pull/124799)（composer 单主按钮/Enter-steer/Esc-stop）、[#124814](https://github.com/openclaw/openclaw/pull/124814)（浅色主题 diff 可读性）、[#124298](https://github.com/openclaw/openclaw/pull/124298)（队列消息原位编辑）、[#123356](https://github.com/openclaw/openclaw/pull/123356)（斜杠命令参数暂存）等。

**综合评估**：今日推进量约相当于一个中型里程碑——安全链路收口 + Gateway 会话生命周期系统性修复 + 校验层架构重构同时进行，项目处于**高速迭代但纪律良好**的阶段。

---

## 4. 社区热点

| Issue | 评论 | 状态 | 热点诉求 |
|---|---|---|---|
| [#121058 静默回复失败在 #116277 关闭后仍复发](https://github.com/openclaw/openclaw/issues/121058) | **97** | ✅ 已关闭 | 监控 cron 持续捕获复发案例，社区对"关了又犯"的投递类 bug 高度敏感；今日关闭值得跟进验证 |
| [#42475 Gateway 层按 Agent 成本预算](https://github.com/openclaw/openclaw/issues/42475) | **26** | OPEN | 运维方强烈需要在派发模型调用前强制日/月配额，防失控烧钱；已挂 `linked-pr-open` 标签 |
| [#62505 Coding Agent 什么都不完成（2026.4.2 前正常）](https://github.com/openclaw/openclaw/issues/62505) | **14** | OPEN | 长期回归 + `diamond lobster` 最高评级，老用户核心工作流被断 |
| [#113306 SQLite 快照恢复缺乏端到端崩溃/身份保证](https://github.com/openclaw/openclaw/issues/113306) | **13** | OPEN | 数据完整性设计问题，maintainer 参与但无修复 PR |
| [#87561 定义跨渠道可靠的最终兜底投递语义](https://github.com/openclaw/openclaw/issues/87561) | **11** | OPEN | 与 #121058 同根：agent 内部有 fallback 但用户端只见沉默 |
| [#67413 按 Agent 配置 dreaming](https://github.com/openclaw/openclaw/issues/67413) | 9 / 👍5 | OPEN | 全工作区同时做梦触发 OOM，内存子系统资源隔离呼声高 |

**趋势解读**：讨论热度前六中有三个直接指向"消息丢失/静默失败"——这是当前社区最大的信任缺口，也与今日维护者集中修投递/订阅生命周期 PR 形成呼应。

---

## 5. Bug 与稳定性

按严重度排列（🔴 P1 / 🟠 P2，标注是否已有修复 PR）：

**🔴 高严重（多数无修复 PR，标记 recovery-stuck）**
- [#62505](https://github.com/openclaw/openclaw/issues/62505) 回归：Coding Agent 仅输出模糊状态、不产出工作 — ❌ 无 fix PR
- [#115424](https://github.com/openclaw/openclaw/issues/115424) Gateway V8 堆 OOM 后热恢复把一次崩溃放大为 7 次 core dump 循环 — ❌ 无 fix PR
- [#111372](https://github.com/openclaw/openclaw/issues/111372) macOS 上 2026.7.1-2 无限 SIGTERM 重启循环 — ❌ 无 fix PR
- [#100941](https://github.com/openclaw/openclaw/issues/100941) 并行工具扇出下 Gateway 掉 WebSocket（1006）并误报"Gateway crashed" — ❌ 无 fix PR
- [#112259](https://github.com/openclaw/openclaw/issues/112259) 可见入站消息零载荷静默丢弃，无重试/死信 — ❌ 无 fix PR
- [#107244](https://github.com/openclaw/openclaw/issues/107244) WhatsApp 群消息完全进不了 inbound（LID 群疑似）— ❌ 无 fix PR
- [#121058](https://github.com/openclaw/openclaw/issues/121058) 静默回复失败 — ✅ **今日已关闭**（历史上复发过，建议关注监控数据）
- [#86012](https://github.com/openclaw/openclaw/issues/86012) LINE reply token 过期丢消息 — ✅ 已关闭（关联 PR 已开）

**🟠 中严重**
- [#97616](https://github.com/openclaw/openclaw/issues/97616) hook/工具子进程僵尸累积（回归）— ❌ 无 fix PR
- [#97680](https://github.com/openclaw/openclaw/issues/97680) beta 升级后官方插件落在 `latest` 而非 beta tag — ❌ 无 fix PR
- [#115421](https://github.com/openclaw/openclaw/issues/115421) schema 降级恢复隔离/清空状态库（cron 任务丢失）— ❌ 无 fix PR
- [#53540](https://github.com/openclaw/openclaw/issues/53540) 大参数工具调用生成时延超请求超时误报"Network connection lost" — ❌ 无 fix PR
- [#105528](https://github.com/openclaw/openclaw/issues/105528) Windows 上 exec/read 间歇性返回空输出（2026.6.x 回归）— ❌ 无 fix PR
- [#56217](https://github.com/openclaw/openclaw/issues/56217) 1Password 凭据失败引发 crash-loop 打爆限流 — ❌ 无 fix PR
- [#90361](https://github.com/openclaw/openclaw/issues/90361) `memory_search` 间歇性"index metadata is missing"（用户已本地热修）— ❌ 无 fix PR

**稳定性画像**：Bug 大盘集中在**投递可靠性、进程/内存生命周期、升级回归**三类；今日维护者 PR（#124310/#124318/#124746）开始正面切入第一类，但 P1 存量修复缺口仍然明显。

---

## 6. 功能请求与路线图信号

- **成本管控**：[#42475](https://github.com/openclaw/openclaw/issues/42475)（Gateway 级 per-agent 预算）已挂 `linked-pr-open`，**最接近落地**；配合 #95610/#95840 两条 prompt-cache 成本优化线，"省钱"是明确的下一版本主题候选。
- **内存子系统**：[#67413](https://github.com/openclaw/openclaw/issues/67413)（per-agent dreaming 配置，👍5）+ [#117248](https://github.com/openclaw/openclaw/pull/117248)（REM 阶段垃圾主题过滤）+ [#44395](https://github.com/openclaw/openclaw/issues/44395)（标题感知分块），memory-core 是活跃投资方向。
- **交互增强**：[#17840](https://github.com/openclaw/openclaw/issues/17840)（emoji 反应触发 agent turn，投票/确认场景）+ [#124810](https://github.com/openclaw/openclaw/pull/124810)（主动引导 widget 使用，已关闭），UI 交互性持续加强。
- **UI 定制**：[#28300](https://github.com/openclaw/openclaw/issues/28300)（预设主题 + Custom Theme Studio，👍5）社区诉求明确，尚无对应 PR。
- **提供商支持**：[#83954](https://github.com/openclaw/openclaw/issues/83954)（ChatGPT Pro 订阅走 gpt-5.5-pro/退役 Spark 的官方路径）涉及商业协议，属产品决策层面。

---

## 7. 用户反馈摘要

**痛点（按出现频次与情感强度）**
1. **"沉默失败"最伤信任**：WhatsApp/LINE/Telegram/Matrix 多渠道用户反复描述"dashboard 里能看到回复，但用户端永远收不到"（#92186、#87561、#107244），且缺乏任何用户侧错误提示。
2. **升级焦虑**：2026.4.2→6.x→7.1 连续版本引入回归（#62505、#105528、#111372、#113093），多位用户表达"不敢第一时间升级"。
3. **成本不可控**：OpenAI 路径 prompt cache 前缀被动态注入打断（#95610）导致账单意外，运维用户要求内置预算护栏（#42475）。
4. **资源失控**：dreaming 全局并发 OOM（#67413）、僵尸进程累积（#97616）、Windows 下 CLI 进程不退出（#74378）——自托管小内存用户受损最重。
5. **长会话退化**：压缩后预算估算重开全量 JSONL（#111857）、OOM 恢复循环（#115424），重度用户（数十万 token 会话）体验明显劣化。

**满意点**：issue 模板规范、clawsweeper 自动分级（🦞→🧂 评级体系）被社区认可为高效分诊；`source-repro` 标签下的复现质量普遍较高；中文用户社区活跃（#79469 双语提交）。

---

## 8. 待处理积压

以下高价值 Issue 长期处于 `needs-maintainer-review` / `clawsweeper-recovery-stuck` 状态，且**无修复 PR**，建议维护者优先排期：

| Issue | 开启时间 | 评级 | 积压原因提示 |
|---|---|---|---|
| [#42475](https://github.com/openclaw/openclaw/issues/42475) 成本预算 | 2026-03-10 | 🌊 | 等产品决策，但已有 linked PR，可推动闭环 |
| [#62505](https://github.com/openclaw/openclaw/issues/62505) Agent 不干活回归 | 2026-04-07 | 🦞 | 最高评级回归，4 个月未修 |
| [#87561](https://github.com/openclaw/openclaw/issues/87561) 兜底投递语义 | 2026-05-28 | 🦞 | 需要跨渠道设计决策 |
| [#83959](https://github.com/openclaw/openclaw/issues/83959) Codex app-server 重试耗尽 | 2026-05-19 | 🦞 | 无 fix PR |
| [#67413](https://github.com/openclaw/openclaw/issues/67413) per-agent dreaming | 2026-04-15 | 🌊 | 👍5，诉求明确 |
| [#115421](https://github.com/openclaw/openclaw/issues/115421) 降级恢复清库 | 2026-07-28 | 🦞 | 数据丢失类，优先级应上调 |
| [#115424](https://github.com/openclaw/openclaw/issues/115424) OOM→7 次 core dump 循环 | 2026-07-28 | 🦞 | 与 #124659 更新交接修复相关，可联动验证 |
| [#107244](https://github.com/openclaw/openclaw/issues/107244) WhatsApp 群消息不入站 | 2026-07-14 | 🦪 | 跨版本复现，需 provider 侧排查 |

**PR 侧**：[#117712](https://github.com/openclaw/openclaw/pull/117712)（dependabot actions 组更新，8/2 起 rebase 中）、[#117114](https://github.com/openclaw/openclaw/pull/117114)、[#117248](https://github.com/openclaw/openclaw/pull/117248) 等 7 月末 PR 仍挂 `needs proof`/`waiting on author`，社区贡献者回流确认成本偏高。

---

**健康度小结**：🔥 产出极高（日均 100+ PR 合并/关闭）｜ ⚠️ Issue 净流入失衡（460 vs 40）｜ 🎯 战略焦点清晰（投递可靠性 + 成本 + Gateway 稳定性）｜ 建议下一步为 P1 回归类存量专项清理。

---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报

**日期：** 2026-08-17 | **仓库：** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

Hermes Agent 今日保持极高活跃度：过去 24 小时内 Issues 更新 430 条（新开/活跃 281、关闭 149），PR 更新 500 条（合并/关闭 84、待合并 416），合计近千次交互事件，属于该项目的顶级活跃水平。项目发布了补丁版本 **v0.20.2（v2026.8.16）**，将 v0.20.1 以来约 **397 个 PR** 收敛为稳定标签，供 Docker 镜像、托管部署与全新安装使用。架构层面的"god-file 分解"史诗任务（#78647）宣告 20/20 全部完成，是代码质量里程碑。与此同时，社区焦点集中在**令牌成本优化**（#6839 / PR #87303）、**多租户与配置隔离安全**（#82936 / #34352）以及 **Windows 桌面端安装/更新顽疾**（#63717 / #80439）三大主题上。

---

## 2. 版本发布

### v2026.8.16 — Hermes Agent v0.20.2（2026-08-16）

- **性质：** Patch 补丁版本，非功能性大版本
- **核心内容：** 将自 v0.20.1 以来合并的 **~397 个 PR** 打包为稳定标签
- **目标受众：** 下游消费者——Docker 镜像构建方、托管部署运营者、全新安装用户
- **链接：** [Release v2026.8.16](https://github.com/NousResearch/hermes-agent/releases)

**破坏性变更与迁移注意事项：**
- Release 说明未声明显式破坏性变更，属于安全升级路径
- ⚠️ 已知升级陷阱：从 v0.18.2 升级时，旧版 SQLite 3.46.1 创建的 `messages_fts_trigram` FTS5 索引在新版 SQLite 3.53.4 下会被判定为 malformed（[#86027](https://github.com/NousResearch/hermes-agent/issues/86027)，P2，仍开放）。跨大版本升级用户建议先备份 `state.db` 并关注该 Issue 的修复进展
- Windows 用户升级前建议阅读 [#63717](https://github.com/NousResearch/hermes-agent/issues/63717)（更新失败七项关联根因诊断）

---

## 3. 项目进展

### 已关闭的重要 Issue / PR

| 条目 | 类型 | 意义 |
|---|---|---|
| [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) God-file 分解 Epic（79 评论） | 架构重构 | **20/20 全部完成**。仓库级"上帝文件"全部拆分为干净模块，确立"只拆不回退"的长期政策，为后续功能迭代扫清架构债务 |
| [#83683](https://github.com/NousResearch/hermes-agent/issues/83683) Windows 桌面重启杀死网关（P1 回归） | Bug 修复 | WeChat/QQ/Telegram 静默的严重回归已关闭，消息网关生命周期管理得到修复 |
| [#82001](https://github.com/NousResearch/hermes-agent/issues/82001) 压缩后 flush 失败误报"磁盘已满"（P1） | Bug 修复 | 会话身份交接缺口修复，关联 PR [#84236](https://github.com/NousResearch/hermes-agent/pull/84236)（中断回合的结构化 `stop_kind`） |
| [#83569](https://github.com/NousResearch/hermes-agent/issues/83569) Windows 更新自锁 `cryptography._rust.pyd`（P1） | Bug 修复 | 100% 复现的更新阻塞问题关闭 |
| PR [#83360](https://github.com/NousResearch/hermes-agent/pull/83360) Discord 后台工作会话 | 功能 | 非交互 cron 任务通过独立线程交付，含持久化 job/run/session 绑定与 mention 安全机制 |
| PR [#53440](https://github.com/NousResearch/hermes-agent/pull/53440) Discord 频道级推理预算默认值 | 功能 | 运营者可按频道/线程设置 `channel_reasoning_efforts` |
| PR [#87849](https://github.com/NousResearch/hermes-agent/pull/87849) Linux 下携带 GitHub token 时桌面启动失败 | Bug 修复 | electron-builder 隐式发布触发问题修复 |
| PR [#87908](https://github.com/NousResearch/hermes-agent/pull/87908) 网关 worktree 隔离跨上游同步保持 | Bug 修复 | 附带 Signal 已读回执与 Pushover 投递支持 |

### 待合并的高价值 PR（416 个待合并中值得关注）

- **[PR #87303](https://github.com/NousResearch/hermes-agent/pull/87303)** — 重放路径削减 80% 重发内容（工具输出+思考块），单次超大工具结果最高省 120 倍，兼容全部 10 家模型提供商，**直击 #6839 反映的令牌成本痛点**
- **[PR #82305](https://github.com/NousResearch/hermes-agent/pull/82305)** — 修复桌面端 **CVE-2026-70608（GHSA-9f4c-93c8-jc8g，High 7.2）** 沙箱 iframe 弹窗利用路径，建议优先评审
- **[PR #85631](https://github.com/NousResearch/hermes-agent/pull/85631)** — "Freemaxxing" 无鉴权多提供商故障转移池，作为一等公民模型提供商插件
- **[PR #87900](https://github.com/NousResearch/hermes-agent/pull/87900)** — 修复 Ollama `/v1` 端点将 tool calls 泄漏为纯文本的问题，本地模型用户的关键修复
- **[PR #87123](https://github.com/NousResearch/hermes-agent/pull/87123)** — 为 llama.cpp/vLLM 回环端点保留 `reasoning_content`（软重放族）

**整体评估：** 单日关闭 3 个 P1 级 Issue、合并 84 个 PR、完成大型重构 Epic 并发布稳定版，项目在"清偿技术债 + 稳定性收敛"阶段推进显著。

---

## 4. 社区热点

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*