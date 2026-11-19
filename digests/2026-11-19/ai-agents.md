# OpenClaw 生态日报 2026-11-19

> Issues: 474 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-19 01:51 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-19

---

## 1. 今日速览

- OpenClaw 今日保持高活跃度：过去 24 小时 Issue 更新 **474 条**（新开/活跃 345，关闭 129），PR 更新 **500 条**（待合并 284，合并/关闭 216），社区吞吐量与响应速度均处于健康水平。
- 项目发布了一个新版本 **v2026.10.33**（gateway-only `extended-stable`，相当于 LTS 渠道），同时主线上 2026.11.x beta 迭代密集，多個 PR 直指 2026.11.5 候选版的升级/Doctor 问题。
- 今日热度集中在三大主题：**升级与 Doctor 可靠性**（WAL 校验、迁移冲突、更新死循环）、**Prompt 缓存失效**（多个独立报告 cache read 归零）以及**多智能体消息丢失/会话状态**类问题。
- 贡献者生态活跃，@daniel-lxs、@steipete、@fuller-stack-dev、@roboclaw-bot 等今日均有高质量 PR 提交；安全相关 PR（Cloudflare Access JWT、设备授权 scope）进入维护者评审阶段。
- 整体判断：项目处于**快速迭代 + 积极修复期**，Issue 关闭量（129）与新增量基本匹配，无明显积压恶化。

---

## 2. 版本发布

### v2026.10.33（extended-stable / 类 LTS 渠道）

- **性质**：gateway-only 稳定通道发布，基于 2026 年 10 月底的 OpenClaw 快照，叠加：
  - 关键安全更新
  - 可靠性与性能修复
  - 新模型支持等特性
- **迁移注意**：该渠道面向追求稳定的生产部署用户；运行 2026.11.x beta 的用户不在本通道覆盖范围内。值得注意的是，社区同期报告了多条 2026.11.x 升级链路问题（见第 5 节），建议 stable 用户升级前先阅读相关 Issue。

🔗 https://github.com/openclaw/openclaw/releases

---

## 3. 项目进展

今日 PR 活动以修复与可靠性为主，多个安全敏感 PR 进入评审：

| PR | 内容 | 状态 |
|---|---|---|
| [#201563](https://github.com/openclaw/openclaw/pull/201563) | 修复一个子任务完成失败导致整批兄弟结果被丢弃的问题（agents，L，security-sensitive） | 开放中 |
| [#201544](https://github.com/openclaw/openclaw/pull/201544) | Gateway 重启中断 subagent 时保留其 outcome（已关闭，可能被后续 PR 接替） | 已关闭 |
| [#200376](https://github.com/openclaw/openclaw/pull/200376) | 新增 Cloudflare Access JWT 验证，修复 trusted-proxy 模式下任意进程可冒充任意邮箱（含 operator.admin）的**安全漏洞** | 等维护者 + 安全评审 |
| [#199698](https://github.com/openclaw/openclaw/pull/199698) / [#199699](https://github.com/openclaw/openclaw/pull/199699) | 设备授权 scope 明确化与受限 scope CLI/TUI 设备接入（配套堆叠 PR） | 等维护者 |
| [#199365](https://github.com/openclaw/openclaw/pull/199365) | CLI `message send` 写入 Gateway 会话导致的 transcript 序列冲突修复 | Ready for review |
| [#201545](https://github.com/openclaw/openclaw/pull/201545) | 允许 agent 数据库忙时启动包更新（解决 `database-schema-preflight` 拒绝） | Ready for review |
| [#201557](https://github.com/openclaw/openclaw/pull/201557) | 修复嵌套 SQLite 页面回收死锁 | 开放中 |
| [#201463](https://github.com/openclaw/openclaw/pull/201463) | Git checkout 更新不再误报 "data at risk" | Ready for review |
| [#201564](https://github.com/openclaw/openclaw/pull/201564) | UI：归档当前会话后自动打开下一个聊天 | 开放中 |
| [#201411](https://github.com/openclaw/openclaw/pull/201411) | OpenAI 接入优先引导 "Sign in with ChatGPT" | 等维护者 |
| [#119052](https://github.com/openclaw/openclaw/pull/119052) | Windows 服务激活防误判（XL，长周期 PR），11/18 发现的回归已在 head 修复 | Waiting on author |

**整体评估**：今日修复覆盖升级链路、SQLite 底层、多智能体编排、安全边界四条线，推进节奏扎实；安全类 PR 密集说明项目对暴露面管控重视。

---

## 4. 社区热点

1. **[#191944](https://github.com/openclaw/openclaw/issues/191944)（37 评论）** — macOS 上 `gateway stop` / `stop --force` 均失败，报 "Process ancestry could not be fully inspected"。诉求：基本的进程管理操作在 macOS 不可用，UX 摩擦大，等待维护者评审。
2. **[#119720](https://github.com/openclaw/openclaw/issues/119720)（28 评论，P1）** — 规模化场景下同步持久化与 transcript 维护阻塞 Gateway 事件循环。已有部分修复落地（#140231、#138984），社区持续追踪重写实现。
3. **[#197083](https://github.com/openclaw/openclaw/issues/197083)（25 评论）** — npm 升级 2026.11.1→11.3 后 Doctor 报 SQLite WAL 提交校验失败，拒绝回滚（`state-migrated-no-rollback`），升级卡在半完成态。
4. **[#123792](https://github.com/openclaw/openclaw/issues/123792)（20 评论）** — claude-cli 后端下助手回合被双重持久化/渲染，Webchat 与 Android 受影响。
5. **[#153426](https://github.com/openclaw/openclaw/issues/153426)（18 评论，**P0**）** — 策划记忆根文件 `MEMORY.md`/`USER.md` 被 provenance ratchet 静默、永久排除出 bootstrap 注入，无诊断无恢复路径。这是当前唯一 P0，涉及安全与产品决策，**强烈建议维护者优先处理**。

---

## 5. Bug 与稳定性（按严重度）

**P0**
- [#153426](https://github.com/openclaw/openclaw/issues/153426) 记忆根文件被静默排除 —— ⚠️ 尚无 fix PR，需安全评审 + 产品决策。

**P1**
- [#196199](https://github.com/openclaw/openclaw/issues/196199) **回归**（2026.10.10 起）：Codex helper 完成后无法唤醒父 agent，锁死用户助手 —— 需补充信息。
- [#194451](https://github.com/openclaw/openclaw/issues/194451)（已关闭）：agent 回合中发送 `/think` 等指令触发 SQLite 冲突杀死回合 —— 已有 linked PR。
- [#152965](https://github.com/openclaw/openclaw/issues/152965) 热重载非 channel 插件时误 dispose 有状态 channel 插件、断流丢消息 —— 无 fix PR。
- [#191476](https://github.com/openclaw/openclaw/issues/191476) Matrix 房间卡死 "consumer is closed" —— ✅ 有 fix PR [#201554](https://github.com/openclaw/openclaw/pull/201554)。
- [#198218](https://github.com/openclaw/openclaw/issues/198218) Doctor/update 在 Gateway 停止时对未变更 state DB 无限重哈希（活锁）—— 相关缓解见 PR [#201545](https://github.com/openclaw/openclaw/pull/201545)。
- [#195192](https://github.com/openclaw/openclaw/issues/195192) Safari 27.3 下 Control UI 聊天输入框消失。

**P2 亮点**
- **Prompt 缓存失效群**：[#182891](https://github.com/openclaw/openclaw/issues/182891)、[#198373](https://github.com/openclaw/openclaw/issues/198373)（回归）、[#155868](https://github.com/openclaw/openclaw/issues/155868)（agent 触发的 run 工具清单不同导致缓存全 miss）——三个独立路径，同一经济性痛点，建议合并排查。
- 升级链路：[#200606](https://github.com/openclaw/openclaw/issues/200606)（2026.11.5 候选 Doctor 阻塞）、[#200224](https://github.com/openclaw/openclaw/issues/200224)（heartbeat 配置迁移两难）。
- 资源泄漏类：[#157712](https://github.com/openclaw/openclaw/issues/157712)（CLI 每次 state 读取泄漏 162 MB 快照，25 分钟 23 GB）、[#170496](https://github.com/openclaw/openclaw/issues/170496)、[#181084](https://github.com/openclaw/openclaw/issues/181084)（超大会话 SQLite 快照秒级读取）。

---

## 6. 功能请求与路线图信号

- **记忆系统深化**：[#179954](https://github.com/openclaw/openclaw/issues/179954)（可配置 per-entry 分块路径，已有 linked PR）与 [#188294](https://github.com/openclaw/openclaw/pull/188294)（工作区排除生成文件）配合，显示 memory-core 是下一阶段重点。
- **多用户/安全**：daniel-lxs 的 trusted-proxy / 设备 scope / ChatGPT 登录 PR 系列表明 **OpenClaw ID + 多人协作安全模型**正在成型，可能进入下个版本。
- **运维可观测性**：[#127195](https://github.com/openclaw/openclaw/issues/127195)（16 处相同错误字符串无 reason code）、[#161158](https://github.com/openclaw/openclaw/issues/161158)（restart 60s 硬编码预算）反映社区要求可配置、可诊断的运维面。
- **渠道公平性**：Telegram requireMention 不拦截裸斜杠命令 [#164065](https://github.com/openclaw/openclaw/issues/164065)、Signal 引用不产生隐式 mention [#161781](https://github.com/openclaw/openclaw/issues/161781) —— 多 bot 群组场景是明确需求。
- **无障碍**：[#154524](https://github.com/openclaw/openclaw/issues/154524) 屏幕阅读器导航，长期开放，属路线图边缘信号。

---

## 7. 用户反馈摘要

- **痛点集中在“升级焦虑”**：多条 Issue 反映用户在 2026.11.x 升级中遭遇 Doctor 校验失败、半完成状态、无法回滚（#197083、#200606），对升级链路信任度下降。
- **长会话/规模化用户受损最重**：13 天 31 万 token 的 WeChat 会话、35k 事件 228 MB 主会话、多 agent 高流量群组用户持续报告内存泄漏、SQLite 争用和事件循环阻塞——重度用户是质量压力的主要来源。
- **成本敏感**：prompt cache 失效类 Issue 的反复出现说明用户对 token 成本高度敏感，缓存命中率是留存关键指标。
- **正面信号**：#192667 报告者确认升级到 2026.11.5 后 macOS Settings 卡顿与暗色主题问题均已解决；多条 Issue 由 OpenClaw agent 自身代为提交且质量规范，用户对 agent 自助报障工作流接受度高。
- **Windows/macOS 边缘平台**体验仍弱于 Linux：Windows 插件 staging 不收敛（#162585）、macOS 进程检查失败（#191944）。

---

## 8. 待处理积压（维护者关注）

| 项 | 说明 | 状态信号 |
|---|---|---|
| [#153426](https://github.com/openclaw/openclaw/issues/153426) | **P0**，记忆根静默失效，无 fix PR | 需安全评审 + 产品决策 |
| [#112638](https://github.com/openclaw/openclaw/issues/112638) | session.maintenance enforce 模式不设上限（7 月至今） | stale，需产品决策 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | P1 事件循环阻塞，部分修复已落地，需收尾确认 | 持续活跃 |
| [#141172](https://github.com/openclaw/openclaw/issues/141172) | run 提前死亡导致 `agent.run.started` 永久泄漏 | stale + bulk-filed |
| [#119052](https://github.com/openclaw/openclaw/pull/119052) | Windows 服务激活 XL PR，8 月至今 | 11/18 回归已修复，等待作者完成验证 |
| [#198918](https://github.com/openclaw/openclaw/pull/198918) | 测试套件去重 XL PR | Waiting on author |
| [#164279](https://github.com/openclaw/openclaw/issues/164279)（已关闭） | 自学习背景审查 0% 完成率——关闭但根因链路值得复盘 | 已关闭 |

**健康度小结**：Issue 关闭率约 27%（129/474），PR 吸收节奏正常；主要风险点为 P0 记忆问题悬置、prompt cache 三重独立失效路径、以及 2026.11.x 升级链路在 beta 用户的信任修复。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比报告
**（数据日期：2026-11-19 | 对比对象：OpenClaw、Hermes Agent）**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**“基础设施化”阶段**：两个头部项目的开发重心均从单机功能转向常驻网关（Gateway）架构、多智能体编排与安全边界建设。共同的技术命题高度趋同——**持久化可靠性（SQLite/状态管理）、升级链路安全性、多渠道消息接入、安全与审批模型**。同时，重度用户（长会话、多 worker、多渠道群组）成为质量压力的主要来源，prompt 缓存命中与 token 成本成为用户留存的关键经济指标。项目分化点在于成熟度：OpenClaw 处于“快速迭代+主动修复”的平衡期，Hermes 则处于大规模架构迁移（网关统一化）的攻坚期。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 474（新开/活跃 345，关闭 129） | 318（新开/活跃 293，关闭 25） |
| PR 更新（24h） | 500（待合并 284，合并/关闭 216） | 500（待合并 386，合并/关闭 114） |
| Release | v2026.10.33（gateway-only extended-stable，类 LTS） | v0.23.2+canary（预发布通道） |
| Issue 关闭率 | **~27%**（收支基本平衡） | **~8%**（积压压力大） |
| P0/P1 状态 | 1 个 P0 无 fix PR，多数 P1 已有 linked PR | 4 个 P1 无 fix PR |
| 健康度评估 | 🟢 良好：吞吐高、响应快、无明显积压恶化 | 🟡 中等：开发节奏极快但关闭率低，会话状态类 bug 积压明显 |

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **发布工程成熟**：唯一提供 extended-stable（类 LTS）渠道的项目，与 beta 通道分离，适合生产部署用户；Hermes 仅提供 canary 预发布。
- **Issue 治理能力**：27% vs 8% 的关闭率差距显著，OpenClaw 的社区反馈消化能力约为 Hermes 的 3 倍以上（相对口径）。
- **安全响应主动**：今日即有 Cloudflare Access JWT 验证（#200376）、设备授权 scope（#199698/99）两条安全 PR 进入维护者评审，安全边界建设前置。
- **社区规模与多样性**：多贡献者高质量 PR 生态、agent 自助报障工作流被用户广泛接受，重度用户（13 天 31 万 token 会话、35k 事件会话）的深度参与反哺质量。

**技术路线差异：**
- OpenClaw 走**多渠道个人助手 + 多人协作安全模型（OpenClaw ID）+ 记忆系统深化（memory-core）**路线；
- Hermes 走 **Kanban 任务调度 + 统一网关架构迁移 + 多 provider（Vertex/xAI/Ollama）** 路线，更偏自主任务编排。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw 证据 | Hermes 证据 | 诉求本质 |
|---|---|---|---|
| **网关常驻架构可靠性** | Gateway 事件循环阻塞（#119720 P1）、subagent 中断 outcome 保留（#201544/#201563） | 统一网关迁移系列（#157387–484）、迁移后回归（#143547，83 评论） | 常驻进程的稳定性与平滑迁移 |
| **会话状态/持久化** | SQLite WAL 校验失败（#197083）、页面回收死锁（#201557）、162 MB 快照泄漏（#157712） | websocket 快照超 1MiB 丢 prompt（#145215）、sqlite settlement 卡死（#144447）、压缩器钳制（#99943） | SQLite/状态层是双项目最大共性痛点 |
| **安全与审批边界** | trusted-proxy 冒充漏洞修复 PR、设备 scope、记忆 provenance ratchet（P0 #153426） | 凭据落盘泄露（#62336，已有 fix PR）、CLI 绕过审批层（#59293） | agent 权限模型与凭据保护是行业性命题 |
| **多智能体编排** | 消息丢失/兄弟结果丢弃、Codex helper 唤醒锁死（#196199） | Kanban worker 批量崩溃（#145022）、receipt timeout 毒化（#147839） | 多 agent 场景的状态一致性尚未成熟 |
| **非主线平台体验** | Windows 服务激活 XL PR（#119052）、macOS 进程管理失败（#191944） | Windows/Termux/iPhone Safari 多条 P1/P2 | Windows/移动端普遍是二等公民 |
| **记忆系统演进** | MEMORY.md/USER.md 注入、per-entry 分块（#179954） | 结构化记忆预取（#92118）、记忆召回提示可配置 | 从文件记忆向结构化/可治理记忆迁移 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 产品形态 | 多渠道个人 AI 助手（Webchat/Telegram/Signal/Matrix/WeChat/Android） | 自主任务智能体 + Desktop + Kanban 任务调度 |
| 核心架构 | Gateway + 多 channel 插件 + memory-core + OpenClaw ID 多用户模型 | 统一网关（迁移中）+ Kanban dispatcher + 多 worker + multi-provider LLM |
| 目标用户 | 追求稳定的自托管生产用户（有 LTS 通道）+ 多 bot 群组场景 | 技术早期采用者（canary 通道）、多 LLM provider 用户、任务自动化场景 |
| 发布策略 | 双通道：extended-stable + 2026.11.x beta | 单一 canary 快速迭代 |
| 治理风格 | 维护者主动响应、关闭率高、积压可控 | 开发主线强（网关迁移）但决策类议题（temperature、Tool Search）长期 needs-decision |

---

## 6. 社区热度与成熟度

- **OpenClaw：质量巩固期 🟢**。Issue 新增/关闭基本匹配，安全 PR 密集进入评审，LTS 通道存在表明已服务生产用户。风险点：P0 记忆静默失效悬置、prompt cache 三重独立失效路径、2026.11.x 升级信任修复。
- **Hermes Agent：快速迭代/架构攻坚期 🟡**。PR 日更新同样达 500，网关统一化 9 部分接近收官，但 Issue 关闭率仅 8%、4 个 P1 无 fix PR、迁移后回归（83 评论）为最大风险点。社区技术氛围健康（报告者主动撤回错误结论、multi-provider 用户带完整证据链报障），但治理带宽不足。

---

## 7. 值得关注的趋势信号

1. **Gateway 化是共识方向**：两项目不约而同将常驻网关作为核心架构（OpenClaw 已稳定运行并发布 gateway-only LTS；Hermes 全力迁移），单进程 CLI 模式正在被淘汰。
2. **SQLite 是行业级瓶颈**：WAL 校验、死锁、快照泄漏、超大会话读取在两个项目独立出现——智能体开发者应尽早考虑状态分层、增量快照与压缩策略。
3. **Prompt cache 命中率 = 留存指标**：OpenClaw 三条独立缓存失效路径引发持续报告，token 成本敏感度已成为用户流失/留存的直接变量。
4. **安全边界从“补丁”走向“产品决策”**：审批层可绕过、凭据落盘、trusted-proxy 冒充等议题表明，agent 的权限/凭据模型需要架构级设计而非逐洞修复。
5. **Agent 自助报障工作流被接受**：OpenClaw 用户对 agent 代提交 Issue 的质量反馈正面，预示“用 agent 治理 agent 项目”将成为社区运营新范式。
6. **重度用户定义质量下限**：长会话、多 worker、多渠道群组场景持续暴露边缘故障，做智能体产品应按重度负载设计测试基线，而非单轮对话。
7. **可观测性成为下一竞争面**：reason code 缺失、60s 硬编码预算等运维议题涌现，可诊断、可配置的运维面将是成熟项目差异化重点。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-19

## 1. 今日速览

项目整体处于**高活跃度**状态：过去 24 小时 Issues 更新 318 条（新开/活跃 293，关闭 25），PR 更新 500 条（待合并 386，已合并/关闭 114），并发布 1 个 canary 版本。开发主线明显集中在**统一网关（unified gateway）架构迁移**的 serve-to-gateway 系列迁移 PR 上（#157387–#157484 共 9 部分中至少 5 部分今日活跃）。同时社区对 **Kanban 调度器稳定性**和**若干安全问题（终端环境快照泄露凭据、CLI 绕过审批层）**的讨论持续升温。关闭率偏低（Issues 关闭仅约 8%），积压压力较大。

## 2. 版本发布

**v0.23.2+canary.20261118T064620Z**（2026-11-18 发布）

- Canary 预发布通道版本，非稳定版
- 提供 Hermes Desktop macOS Apple Silicon (M-series) DMG 下载（及其他平台构建，详见 release 页）
- 无明确破坏性变更说明；canary 用户建议关注统一网关迁移相关的 entry-point 变化（见 #145171）

## 3. 项目进展

今日合并/关闭 PR 共 114 条，重点包括：

- **Kanban 调度器修复推进**（对应长期痼疾）：
  - [#141552](https://github.com/NousResearch/hermes-agent/pull/141552)（已关闭）：修正 completed review 重试 guard 的事件窗口逻辑，识别显式 reopen，与 [#141540](https://github.com/NousResearch/hermes-agent/pull/141540) 一起修复了重复/卡住审查的调度问题——直接回应 #119070、#29458 的社区痛点
- **Vertex AI 提供商六项缺陷修复** [#142612](https://github.com/NousResearch/hermes-agent/pull/142612)（已关闭）：凭证、目录、provider hijack、归一化、容量退避 + 可选 Priority PayGo
- **多模态插件上下文修复** [#71998](https://github.com/NousResearch/hermes-agent/issues/71998)（Issue 已关闭）：`pre_llm_call` 插件上下文在图像轮次中被丢弃的问题
- **serve-to-gateway 迁移系列**持续推进（OPEN，parts 5–9 of 9）：[#157403](https://github.com/NousResearch/hermes-agent/pull/157403)（dry-run 计划）、[#157430](https://github.com/NousResearch/hermes-agent/pull/157430)（--apply/--restore 带回滚与运行锁）、[#157453](https://github.com/NousResearch/hermes-agent/pull/157453)（Dashboard 迁移卡片）、[#157484](https://github.com/NousResearch/hermes-agent/pull/157484)（更新后提示后端迁移）

整体看，项目在**网关统一化**这条主线上接近收官（9 部分已完成大部分评审），Kanban 可靠性短板正在系统补齐。

## 4. 社区热点

| Issue/PR | 热度 | 核心诉求 |
|---|---|---|
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 统一网关合并后问题（评论 83） | 🔥 最高 | 用户集中反馈 #106742 合并后 main 分支上的回归，是当前项目最大风险点 |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) `hermes config set` 绕过系统配置写保护（评论 29） | 安全 | 审批层可被 agent 通过 CLI 前门无门禁关闭，社区呼吁补齐安全边界 |
| [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) Kanban 卡片卡死 `blocker_auth`（评论 28） | 稳定性 | reviewer 永不生成，dispatcher 无限卡住 |
| [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) 终端快照泄露凭据到磁盘（评论 20） | 安全 | 已有对应修复 PR [#148406](https://github.com/NousResearch/hermes-agent/pull/148406) |
| [#79087](https://github.com/NousResearch/hermes-agent/issues/79087) Windows 桌面运行时探测超时误触发重装（评论 19） | Windows 体验 | 报告者公开撤回错误结论，社区协作排查示范良好 |
| [#17565](https://github.com/NousResearch/hermes-agent/issues/17565) 可配置 temperature（👍 18） | 高需求 | 长期高分功能请求，硬编码温度导致幻觉问题 |

## 5. Bug 与稳定性（按严重度）

**P1（严重）**
- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022) Kanban worker 因网关保存卡顿批量崩溃，进行中工作丢失（一例一次杀 4 个 worker）— 无 fix PR
- [#147839](https://github.com/NousResearch/hermes-agent/issues/147839) 单次 20s `worker_receipt_timeout` 毒化存储、整轮销毁（用户只见 "No reply"）— 无 fix PR
- [#145215](https://github.com/NousResearch/hermes-agent/issues/145215) 会话 resume 快照超 1 MiB 时 websocket 默认 `max_size` 丢弃 prompt，消息静默丢失 — 无 fix PR
- [#79087](https://github.com/NousResearch/hermes-agent/issues/79087) Windows 误判健康安装、诱导重装（P1）— 无 fix PR

**P2**
- [#137287](https://github.com/NousResearch/hermes-agent/issues/137287) 桌面 transcript 随机重复/乱序/丢消息 — 无 fix PR
- [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) 压缩器上下文窗口被错误钳制（1M → 65K）— 无 fix PR
- [#98634](https://github.com/NousResearch/hermes-agent/issues/98634) `file.attach` 的 `@file:` 引用被 prompt 展开拒绝 — 无 fix PR
- [#126622](https://github.com/NousResearch/hermes-agent/issues/126622) Windows `write_file` 永久拒绝（`st_ctime_ns` 不匹配）— 无 fix PR
- [#140080](https://github.com/NousResearch/hermes-agent/issues/140080) Android/Termux 无法 `hermes update`（`os.link` 缺失）— 无 fix PR
- [#156709](https://github.com/NousResearch/hermes-agent/issues/156709) `FooteredReply` 破坏 `copy.deepcopy` — 无 fix PR
- [#148538](https://github.com/NousResearch/hermes-agent/issues/148538) iPhone Safari 无法渲染（缺 `requestIdleCallback`）— 无 fix PR

**安全类**
- [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) ✅ 有 fix PR [#148406](https://github.com/NousResearch/hermes-agent/pull/148406)（清洗 secret 形态环境变量）
- [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) ❌ 尚无 fix PR，标记 needs-decision

**今日新修复 PR（OPEN）**：[#157630](https://github.com/NousResearch/hermes-agent/pull/157630)（Kanban 硬删除原子化）、[#157609](https://github.com/NousResearch/hermes-agent/pull/157609)（视觉路由拒用纯文本模型）、[#144447](https://github.com/NousResearch/hermes-agent/pull/144447)（sqlite lone surrogate 导致 settlement 卡死）、[#157631](https://github.com/NousResearch/hermes-agent/pull/157631)（语音文件不再写入共享 /tmp）

## 6. 功能请求与路线图信号

- **Slack 技能 API key 私密弹窗录入** [#156868](https://github.com/NousResearch/hermes-agent/pull/156868)（11-17 新开，活跃）——降低 Slack 用户的 `.env` 编辑门槛，落地概率高
- **Kanban 配额墙任务挂起至窗口重开** [#157624](https://github.com/NousResearch/hermes-agent/pull/157624)（今日新开）——修复 27+ 次 rate_limited 空转，配合已合并的 #141552/#141540，Kanban 调度体系可能成为下一版本重点
- **记忆召回提示可关闭** [#138142](https://github.com/NousResearch/hermes-agent/pull/138142)——display 配置粒度持续细化
- **结构化记忆预取观察通道** [#92118](https://github.com/NousResearch/hermes-agent/pull/92118)——记忆系统向结构化演进信号
- **temperature 可配置** [#17565](https://github.com/NousResearch/hermes-agent/issues/17565)（18 👍）与 **Tool Search 白名单** [#86620](https://github.com/NousResearch/hermes-agent/issues/86620)——高需求但均 needs-decision，维护者尚未表态
- **网关空闲后台压缩** [#97390](https://github.com/NousResearch/hermes-agent/issues/97390)——契合 gateway 统一化主线，可能借迁移系列顺带纳入

## 7. 用户反馈摘要

- **痛点集中区**：多 worker/长会话场景下的**会话状态可靠性**（#145022、#147839、#145215、#137287）是最普遍的抱怨；用户报告“一次卡顿杀死 4 个 worker”“消息静默丢失”
- **Windows / 移动端是二等公民**：#79087、#126622、#140080、#148538 显示非 macOS 平台体验明显落后
- **安全敏感用户**（自托管 + Bitwarden Secrets Manager）对快照落盘凭据（#62336）和审批层可绕过（#59293）表达强烈关切
- **正面信号**：#79087 报告者主动撤回错误结论并配合复现测试，社区技术氛围健康；multi-provider（Vertex、xAI、Ollama、OpenRouter）用户深度参与缺陷定位，如 #142612 的六项 Vertex 缺陷均带完整证据链

## 8. 待处理积压

| 条目 | 积压时长 | 建议 |
|---|---|---|
| [#17565](https://github.com/NousResearch/hermes-agent/issues/17565) temperature 配置（18 👍，2026-04 开） | ~7 个月 | 高需求长期无决策，建议维护者回应 |
| [#29458](https://github.com/NousResearch/hermes-agent/issues/29458) `active_pr` guard 无运维清除路径（2026-05 开） | ~6 个月 | 相关 PR 已合并，需验证是否覆盖并关闭 |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) 安全：CLI 绕过审批层（2026-07 开） | ~4.5 个月 | 安全类不应长期 needs-decision |
| [#62336](https://github.com/NousResearch/hermes-agent/issues/62336) 凭据落盘（2026-07 开） | ~4 个月 | fix PR #148406 已开 2 周多，建议优先评审 |
| [#122760](https://github.com/NousResearch/hermes-agent/pull/122760) / [#103927](https://github.com/NousResearch/hermes-agent/pull/103927) 语音文件路径修复 | ~2 个月 | 已被 #157631 salvage 整合，原 PR 应尽快关闭去重 |

**健康度小结**：开发节奏极快（PR 日更新 500），主线清晰（网关统一化）且接近完成；但 Issue 关闭率低、P1 级会话状态类 bug 与安全议题积压明显，是当前项目健康度的主要风险点。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*