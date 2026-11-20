# OpenClaw 生态日报 2026-11-20

> Issues: 474 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-20 01:45 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 · 2026-11-20

---

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时共 474 条 Issue 更新（新开/活跃 341，关闭 133）、500 条 PR 更新（待合并 312，合并/关闭 188），并发布 2 个新版本（v2026.11.10-beta.1 与 v2026.11.6）。社区重心明显集中在**更新器/Doctor 可靠性**与**升级链路稳定性**——多条 P0/P1 热点 Issue 均围绕 SQLite WAL 校验、更新卡死与 Gateway 切换失败。功能侧进展活跃，Agent 模板（ClawHub）、iOS 转录重构、OpenAI 登录流程等大型 PR 持续推进。整体健康度良好，但升级路径的历史遗留问题（多条 issue 跨 9.x–11.x 未解）仍是最大技术债。

---

## 2. 版本发布

### v2026.11.10-beta.1
- **Agent 模板（ClawHub）**：可直接从 ClawHub 包安装 Agent，统一 `CLAW.md` manifest 与捆绑 skill 目录，走原生信任链校验（#195707, #196322, #196348，@steipete 主导）。
- **OpenClaw ID**：节点连接改进（发布说明截断，详见 Release 页）。

### v2026.11.6
- **升级链路加固**：为 2026.11.5 更新器架桥到当前发布路径，并修正 Windows 上暂存插件依赖的校验逻辑（#200662, #200595）——直接回应近期 Windows 更新验证失败问题（见 #199617）。
- **会话韧性提升**：subagent 相关改进（发布说明截断）。

⚠️ **迁移注意**：2026.11.5 beta 对已弃用的 `agents.defaults.heartbeat` 配置存在“升级被拒/移除后副作用回滚”的两难（#200224），从旧版本升级前建议检查该配置项。

---

## 3. 项目进展

今日合并/关闭 188 条 PR，代表性进展：

| 方向 | PR | 内容 |
|---|---|---|
| Web UI / Skills | [#202160](https://github.com/openclaw/openclaw/pull/202160)（已关闭） | Skills 浏览页像 Plugins 一样分层展示，可打开每个 skill 的说明文档，统一入口体验 |
| iOS | [#200592](https://github.com/openclaw/openclaw/pull/200592) | 按阅读模型重构 iOS 转录视图：修复长会话无法回滚历史、工具卡片过碎问题 |
| Onboarding | [#202042](https://github.com/openclaw/openclaw/pull/202042) | 新 iPhone 用户引导：解释 Gateway 概念与获取方式（P0，待维护者审查） |
| 安全/信任代理 | [#199698](https://github.com/openclaw/openclaw/pull/199698)、[#199699](https://github.com/openclaw/openclaw/pull/199699)、[#199693](https://github.com/openclaw/openclaw/pull/199693) | 设备授权 scope 修正系列 + Cloudflare Access 等 edgeAuth 直连支持（需安全审查） |
| 质量修复 | [#202106](https://github.com/openclaw/openclaw/pull/202106)、[#202145](https://github.com/openclaw/openclaw/pull/202145)、[#202168](https://github.com/openclaw/openclaw/pull/202168) | CI 期望对齐、E2E flake 修复、Crabbox 测试资源加载修复 |
| Docs | [#201913](https://github.com/openclaw/openclaw/pull/201913)、[#202155](https://github.com/openclaw/openclaw/pull/202155) | 恢复 2026.11.5 完整发布说明；新增 Standard Compute OpenAI 兼容网关文档 |

**评估**：功能层面（模板生态、移动端体验、多设备授权）稳步推进，特别是围绕 ClawHub 模板的完整体验链（发布 #202013 → 预览 #202060 → 安装 #202115）已基本成形。

---

## 4. 社区热点

1. **[#197083](https://github.com/openclaw/openclaw/issues/197083)（P0，29 评论）**：11.1→11.3 升级后 Doctor 的 `SQLite WAL commit publication could not be verified` 失败导致更新半途而废，且 `state-migrated-no-rollback` 拒绝回滚。这是本月讨论最多的 issue，反映用户对“升级后无法回退”的深度焦虑。
2. **[#119720](https://github.com/openclaw/openclaw/issues/119720)（P1，29 评论，8 月至今）**：同步持久化与 transcript 维护在规模化场景下阻塞 Gateway 事件循环——部分修复（#140231、#138984）已落地但问题未根治，长会话用户的核心痛点。
3. **[#200606](https://github.com/openclaw/openclaw/issues/200606)（P1，14 评论）**：11.3→11.5 候选 Doctor 以 `changed=[]` 的迁移冲突阻塞更新，与 #197083 同属更新器信任链问题。
4. **[#123792](https://github.com/openclaw/openclaw/issues/123792)（P2，20 评论）**：CLI 后端下助手消息双重渲染（实时块视图 + 聚合记录），影响 WebChat 与 Android。
5. **[#125764](https://github.com/openclaw/openclaw/issues/125764)（P1，15 评论）**：Telegram 适配器网络失败后**仅尝试一次即死信**，高价值消息静默丢失、无重试无告警——消息通道可靠性的代表性诉求。

---

## 5. Bug 与稳定性（按严重度）

### P0
- [#197083](https://github.com/openclaw/openclaw/issues/197083) WAL 校验失败 + 拒绝回滚，更新半完成 — ❌ 无 fix PR
- [#164800](https://github.com/openclaw/openclaw/issues/164800) 托管更新在 Doctor 后、Gateway 停止状态下卡死（11/18 仍复现）— ❌
- [#158277](https://github.com/openclaw/openclaw/issues/158277) Apple Watch Talk 始终报 "Voice changed its remote network address" — ❌
- [#200289](https://github.com/openclaw/openclaw/issues/200289)（已关闭）11.3→11.4 更新耗时数小时 + SQLite 锁死，需 SSH 恢复

### P1
- [#198218](https://github.com/openclaw/openclaw/issues/198218) Doctor/update 在 Gateway 停止时对未变更 DB 无限重哈希（活锁）— ❌
- [#196199](https://github.com/openclaw/openclaw/issues/196199) 10.10 回归：Codex helper 完成后无法恢复父级，暂停 goals、用户被锁在外 — ❌
- [#191847](https://github.com/openclaw/openclaw/issues/191847) 回归：大会话反复触发 SQLite worker OOM（512 MB），"admission is closed" — ❌
- [#201796](https://github.com/openclaw/openclaw/issues/201796)（已关闭）Cron 无限重放已完成的副作用工具调用 — ❌
- [#162914](https://github.com/openclaw/openclaw/issues/162914) Podman 沙箱间歇性 `sandbox_provisioning` 中止 — ❌
- [#169797](https://github.com/openclaw/openclaw/issues/169797) 回归：Gateway 内存 2.5×、启动慢 3–5×（单 CPU 主机）；相关修复方向见 [#202156](https://github.com/openclaw/openclaw/pull/202156)（空闲 worker 堆回收）— ✅ 部分

### P2 亮点
- Prompt cache 失效系列：[#202001](https://github.com/openclaw/openclaw/issues/202001)、[#198373](https://github.com/openclaw/openclaw/issues/198373)、[#155868](https://github.com/openclaw/openclaw/issues/155868)——OpenAI 兼容路由下缓存命中率跌至 1–3%，用户成本直接上升。
- [#199155](https://github.com/openclaw/openclaw/issues/199155)（已关闭）CLI 写入与 Gateway 常驻 actor 的 transcript UNIQUE 冲突。
- [#199617](https://github.com/openclaw/openclaw/issues/199617) Windows Scheduled Task 验证失败 — ✅ 有 [#199651](https://github.com/openclaw/openclaw/pull/199651) 改进诊断分类。

---

## 6. 功能请求与路线图信号

- **群聊选择性参与**：[#159478](https://github.com/openclaw/openclaw/pull/159478)（XL，含 Telegram E2E 证明）让 Agent 在群内按需响应，减少噪音与主模型开销——大概率进入下一版本。
- **聊天内自动化管理卡片**：[#202126](https://github.com/openclaw/openclaw/pull/202126) 在聊天中展示已保存的自动化及控制项。
- **ClawHub 私有草稿登录/预览**：[#202013](https://github.com/openclaw/openclaw/pull/202013)、[#202060](https://github.com/openclaw/openclaw/pull/202060)——模板创作者工作流补全中。
- **内存系统增强**：[#179954](https://github.com/openclaw/openclaw/issues/179954)（可配置逐条 chunking，已有 linked PR）、[#170997](https://github.com/openclaw/openclaw/issues/170997)（CJK bigram 分词器，中文用户强需求，已有 linked PR）——均已 source-repro + linked-pr-open，接近落地。
- **Sign in with ChatGPT 优先**：[#201411](https://github.com/openclaw/openclaw/pull/201411) 简化 OpenAI 首次连接流程。
- **OpenClaw ID 角色统一与成员暂停**：[#201610](https://github.com/openclaw/openclaw/pull/201610)（多 merge-risk 标记，需谨慎合入）。

---

## 7. 用户反馈摘要

- **痛点 1：升级恐惧**。多个版本（9.7→9.8、11.1→11.3、11.3→11.4/11.5）均有用户报告更新卡死/失败，且失败后往往需要 SSH 手工恢复（#200289、#164800）。远程无人值守主机用户受损最重。
- **痛点 2：消息静默丢失**。Telegram 单次尝试死信（#125764）、Slack `unknown_after_send` 无法排查（#183048）、Matrix consumer closed 卡死（#191476）——多通道适配器可靠性参差不齐。
- **痛点 3：成本敏感**。Prompt cache 失效系列问题（#198373 等）使用户的 API 账单显著上升，反馈情绪强烈。
- **痛点 4：小设备/资源受限**。162 MB DB 快照泄漏（#157712）、内存翻倍（#169797）表明树莓派/单 CPU 用户群体庞大且活跃（如 #200692 的 Home Assistant 场景）。
- **满意点**：社区报告质量极高（结构化复现、版本矩阵），维护者机器人（clawsweeper 分诊、roboclaw-bot 修复 PR）工作流运转顺畅；Agent 模板/ClawHub 生态方向获得正向反馈。

---

## 8. 待处理积压（提醒维护者关注）

| Issue | 年龄 | 状态 | 呼吁 |
|---|---|---|---|
| [#119720](https://github.com/openclaw/openclaw/issues/119720) 事件循环阻塞 | ~3.5 月 | P1，needs-maintainer-review | 高影响（message-loss + crash-loop），多轮部分修复后需终局方案 |
| [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram 死信 | ~3 月 | P1，needs-product-decision | 需产品层面确定重试/对账策略 |
| [#164800](https://github.com/openclaw/openclaw/issues/164800) 更新卡死 | ~1.5 月 | **P0**，11/18 仍复现 | 升级链路最高优先级 |
| [#169797](https://github.com/openclaw/openclaw/issues/169797) 内存回归 | ~1.5 月 | P1 无 fix PR | 小设备用户流失风险 |
| [#191476](https://github.com/openclaw/openclaw/issues/191476) Matrix 卡死 | ~3 周 | needs-info | 等待环境信息后应尽快分派 |
| [#173714](https://github.com/openclaw/openclaw/issues/173714) WSL2/NAT 下 provider 请求挂起 | ~1 月 | P1 | 用户已指出 Telegram/WhatsApp 传输层有 keepalive 而模型路径没有，方向明确 |

**结构性提醒**：更新器相关 issue（#197083、#200606、#198218、#194655、#198334、#199617）合计超 80 条评论，建议作为专项集中治理，而非逐个修复。

---

*数据来源：GitHub API 快照（2026-11-20），统计窗口为过去 24 小时。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告
**数据快照：2026-11-20**

> 说明：本期纳入对比的项目为 OpenClaw 与 Hermes Agent 两个头部项目。样本虽少，但两者代表了个人 AI 助手生态的两种典型架构路线，对比结论仍有参考价值。

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**重度使用驱动质量巩固**阶段：核心用户群从尝鲜转向生产化部署（多 worker、数千会话、无人值守主机），倒逼项目将工程重心从功能堆叠转向**可靠性、规模化性能与升级安全**。两大项目日均 Issue/PR 活动量均达 300–500 条级别，社区报告质量高（结构化复现、版本矩阵），自动化分诊/修复机器人工作流已成熟。同时，**商业化基建**（Nous Portal 优惠、ClawHub 模板市场）与**多端能力**（iOS、移动设备传感器、群聊适配器）成为新一轮功能竞争焦点。共性技术债集中在：网关/事件循环阻塞、会话状态管理、消息通道可靠性。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 474（新开/活跃 341，关闭 133） | 340（新开/活跃 304，关闭 36） |
| PR 更新（24h） | 500（待合并 312，合并/关闭 188） | 500（待合并 310，合并/关闭 190） |
| Release | v2026.11.10-beta.1 + v2026.11.6 | v0.23.3（收拢 ~370 PR）+ canary |
| 关闭率（Issue） | ~28% | ~11% |
| P0/P1 未解问题 | P0×3、P1×5+ | P1×3（#145022 已有修复待验证） |
| 最热 Issue | #197083 升级 WAL 校验（29 评论） | #143547 统一网关回归（83 评论） |
| 健康度评估 | **良好偏稳**：升级链路是系统性技术债，社区满意度较高 | **活跃但承压**：迭代极快，统一网关架构回归与规模化性能问题集中爆发，Issue 关闭率偏低 |

两者 PR 吞吐几乎相同，但 OpenClaw 的 Issue 关闭率明显更高，显示其分诊/修复闭环更顺畅。

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **升级链路工程化最深**：Doctor、信任链校验、`state-migrated-no-rollback` 等机制表明其对“可安全升级的自托管部署”有系统性投入——尽管该子系统当前正是最大技术债来源。
- **模板生态先发**：ClawHub + Agent 模板（`CLAW.md` manifest + skill 捆绑 + 原生信任链）已形成发布→预览→安装的完整闭环，对标“智能体的应用商店”。
- **多通道适配器覆盖广**：Telegram/Matrix/Slack/Apple Watch/Android 等，是当前对比中通道最全的项目。
- **小设备/边缘部署心智**：树莓派、Home Assistant、单 CPU 主机用户群体庞大（#200692 等），资源占用问题（#169797、#157712）被高度重视。

**技术路线差异：** OpenClaw 走“分布式 Gateway + 多通道适配 + 模板市场”路线；Hermes 走“单一统一网关进程收拢所有会话 + Desktop/Store/Cloud 多形态分发”路线。后者架构更集中，但正因此承受规模化性能反噬（#146643、#145538）。

**社区规模：** 两项目活动量同级（PR 更新均 500/日），OpenClaw Issue 讨论更聚焦版本升级场景（跨 9.x–11.x 的长尾），Hermes 讨论更集中在架构回归与桌面体验。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **网关/事件循环规模化** | #119720（同步持久化阻塞 Gateway，3.5 月未根治） | #146643、#145538、#41219（全量重读会话、死锁） | 数千会话/多 profile 下必须避免 O(history) 重读与事件循环阻塞 |
| **会话状态与 transcript 一致性** | #123792 双重渲染、#199155 UNIQUE 冲突 | #147839 存储污染、#137287 消息错序丢失 | 转录记录的可靠写入与一致性是两大项目共同长尾 |
| **记忆系统结构化** | #179954 逐条 chunking、#170997 CJK 分词 | #92118 预取观察通道、#155595 生命周期 | 记忆子系统均从“能用”走向“可配置、可管理” |
| **消息通道可靠性** | #125764 Telegram 死信、#191476 Matrix 卡死 | #150617 通知截断致 DM 空回复 | 高价值消息静默丢失引发信任危机，重试/对账策略成共性需求 |
| **移动端/多端接入** | iOS 转录重构、iPhone 引导 | #142277 手机相机/GPS/通知栏 | Agent 正从桌面走向随身设备 |
| **OpenAI 兼容端点** | Prompt cache 失效系列（成本 1–3% 命中率） | #56094 `api_mode` 被忽略 | 兼容层正确性与成本效率是刚需 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 模板生态（ClawHub）、多通道消息、自托管升级工程、群聊选择性参与 | Desktop 体验、Kanban 多 worker 编排、cron 自动化、Nous Portal 商业化 |
| 目标用户 | 自托管/无人值守主机、树莓派/小设备、家庭自动化用户 | 重度桌面用户、多 profile/多 worker 生产部署者、Windows 用户 |
| 架构关键点 | 多 Gateway 切换 + Doctor 信任链 + 插件/skill 分发 | 单一统一网关进程 + Cloud/Store/Docker 多形态分发 |
| 部署形态 | 自托管为主 | CLI + Store + Docker + Hermes Cloud 全覆盖 |
| 生态策略 | 开放模板市场（第三方创作者工作流） | 官方插件目录 + Hackathon 驱动 + 商业闭环 |

**核心区别**：OpenClaw 押注“分发的智能体”（模板 + 通道 + 边缘部署），Hermes 押注“集成的智能体”（单进程 + 桌面 + 商业化订阅）。

---

## 6. 社区热度与成熟度

- **快速迭代阶段：** Hermes Agent——单日合并 190 PR、canary 日更、v0.23.x 补丁快速滚动；但 Issue 关闭率仅 ~11%、多个 6 月遗留问题（#62336 安全、#41219 死锁）未决，呈现“跑得快、欠账多”特征。
- **质量巩固阶段：** OpenClaw——功能方向明确收敛于升级链路加固与模板生态收尾，分诊闭环健康（关闭率 ~28%）；但 P0 升级卡死（#164800 11/18 仍复现）与跨版本技术债（>80 条评论）表明其正在为历史架构买单。
- **成熟度信号对比**：两者都已越过 0→1，处于 1→N 的可靠性攻坚期；Hermes 的风险集中于**单一架构决策的回归面**，OpenClaw 的风险集中于**升级路径的历史遗留**。

---

## 7. 值得关注的趋势信号

1. **“升级安全”成为自托管智能体的第一信任门槛。** OpenClaw 用户对“失败后无法回滚、需 SSH 抢救”的焦虑是本月最强情绪信号。任何面向无人值守部署的智能体产品，都应把原子升级 + 自动回滚作为核心竞争力，而非运维文档。
2. **规模化会话管理是下一轮架构分水岭。** 两个项目的网关性能问题本质相同：会话历史 O(n) 全量操作。增量读取、按需分页、空闲堆回收（OpenClaw #202156）将是标配。
3. **消息通道可靠性从 feature 变成 SLO。** 死信、静默丢失、单次尝试失败——用户已按消息队列标准要求适配器层。重试/死信对账/可观测性是智能体走向生产的前提。
4. **智能体分发形态收敛为“模板/skill 包 + 信任链”。** ClawHub 的 manifest + 捆绑 skill + 原生签名校验路径，预示智能体领域将出现类似 app store 的分发与安全模型，第三方创作者工作流是关键拼图。
5. **成本可观测性直接影响留存。** Prompt cache 命中率跌至 1–3% 引发的账单恐慌表明：兼容层不仅要“能用”，还必须“便宜”，缓存友好性应纳入路由层的验收指标。
6. **多端化加速：** 手机传感器（相机/GPS/通知栏）、Apple Watch、群聊选择性参与——智能体的交互边界正从聊天窗口扩展为“随身环境感知”，移动端能力接入是 2027 年前后的明确方向。

**对开发者的行动建议**：优先投资升级/回滚机制与会话增量读取架构；消息通道设计时内建重试与对账；若做分发，尽早定义签名与信任链；兼容路由层增加缓存命中率监控。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-20

## 1. 今日速览

Hermes Agent 今日保持高活跃度：过去 24 小时 Issues 更新 340 条（新开/活跃 304，关闭 36），PR 更新 500 条（待合并 310，已合并/关闭 190），并发布 2 个新版本（v0.23.3 稳定版 + canary 构建）。项目处于高频迭代周期，v0.23.3 一次性收拢了自 v0.23.2 以来约 370 个合并 PR。社区讨论焦点集中在统一网关架构（#106742 合并后的回归问题）、会话状态管理与多平台性能问题，整体健康度良好，但 P1 级 Bug 数量值得维护者警惕。

## 2. 版本发布

- **v0.23.3**（2026-11-19）：补丁版本，将自 v0.23.2 以来约 370 个合并 PR 汇总为稳定发布，覆盖 GitHub Release（CLI 与安装器）、Microsoft Store 应用、Docker 及 Hermes Cloud。完整精选发布说明将随 v0.24.0 一并发布。无破坏性变更说明，建议关注 v0.24.0 的 curated notes。
- **v0.23.2+canary.20261119T064637Z**（2026-11-19）：日常 canary 构建，含 Hermes Desktop 各平台下载（macOS Apple Silicon DMG 等），供早期验证。

## 3. 项目进展

今日有一批长期 PR 完成合并/关闭，推进显著：

- **Kanban 稳定性**：[#134830](https://github.com/NousResearch/hermes-agent/pull/134830) 将 worker 存活检测与前进进度分离，并按估算为调度器加上可执行的超时预算——直接回应 Kanban worker 崩溃类投诉（如 #145022、#147839）。
- **Windows 体验**：[#88936](https://github.com/NousResearch/hermes-agent/pull/88936) 修复卸载时误删共享任务脚本的数据丢失 Bug；[#88935](https://github.com/NousResearch/hermes-agent/pull/88935) 新增 `--at-boot` 安装选项，补齐 Windows 与 Linux `--system` 的对等能力。
- **视觉/PDF**：[#146651](https://github.com/NousResearch/hermes-agent/pull/146651) 将 `pdf.attach` 改为长边封顶的 JPEG 渲染，在不增加超时的前提下解决大 PDF 渲染失败。
- **邮件平台**：[#89042](https://github.com/NousResearch/hermes-agent/pull/89042) 通过 IMAP APPEND 将已发送回复存入 Sent 文件夹，改善 webmail 用户体验。
- **兼容性**：[#56094](https://github.com/NousResearch/hermes-agent/pull/56094) 修复自定义 OpenAI 兼容端点的 `api_mode` 配置被忽略的问题，使 Responses API 中继端点可用。

## 4. 社区热点

- **[#143547](https://github.com/NousResearch/hermes-agent/issues/143547)（83 评论）**：统一网关 #106742 合并后在 main 分支暴露的后续问题持续发酵。该架构将所有本地会话收归单一网关进程，是近期大量回归问题的共同根源。
- **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)（64 评论）**：单一贡献者账号无法通过 API 创建 PR（标记 blocked/cause/upstream），社区持续跟进 GitHub 侧权限问题。
- **[#145022](https://github.com/NousResearch/hermes-agent/issues/145022)（28 评论，P1）**：网关卡顿时 Kanban worker 批量崩溃且进行中工作丢失，多 worker 用户的核心痛点。
- **[#62336](https://github.com/NousResearch/hermes-agent/issues/62336)（22 评论，安全）**：终端环境快照将含凭据的环境变量写入磁盘，安全问题长期未决。
- **[#146643](https://github.com/NousResearch/hermes-agent/issues/146643)（21 评论）**：网关每次变更全量重读会话历史，数千会话时占用 1.5–2.5 核 CPU 并致 Desktop 超时——统一网关架构下的规模化性能瓶颈信号强烈。

## 5. Bug 与稳定性（按严重度）

**P1**
- [#145022](https://github.com/NousResearch/hermes-agent/issues/145022)：网关卡顿致 Kanban worker 批量崩溃。→ 相关修复 #134830 已合并，待版本验证。
- [#147839](https://github.com/NousResearch/hermes-agent/issues/147839)：单次 20 秒 `worker_receipt_timeout` 污染存储并摧毁整个回合（"No reply"）。暂无明确 fix PR。
- [#145314](https://github.com/NousResearch/hermes-agent/issues/145314)：静默 cron 脚本每次触发遗留永久空会话。暂无 fix PR。

**P2**
- [#146643](https://github.com/NousResearch/hermes-agent/issues/146643)：网关全量重读会话历史，规模化性能退化。
- [#146538](https://github.com/NousResearch/hermes-agent/issues/146538)：66 profile 下网关每秒 3.4万–9.9万文件系统元数据操作，Windows 内核池持续增长。
- [#137287](https://github.com/NousResearch/hermes-agent/issues/137287)：Desktop 会话转录随机重复/错序/丢消息。
- [#41219](https://github.com/NousResearch/hermes-agent/issues/41219)：Windows 上首次崩溃后网关事件循环 30–60 秒内确定性死锁。
- [#147873](https://github.com/NousResearch/hermes-agent/issues/147873)：owed-restart 状态无法清除，CLI 反复打印警告。
- [#150617](https://github.com/NousResearch/hermes-agent/issues/150617)：完成通知截断致 Bot Mode DM 回复为空。

**P3 / 安全**
- [#62336](https://github.com/NousResearch/hermes-agent/issues/62336)：凭据写入磁盘（security，长期 open）。

**今日已修复关闭**：[#148540](https://github.com/NousResearch/hermes-agent/issues/148540)（restore_policy 拒绝自身写入的空 model）、[#135872](https://github.com/NousResearch/hermes-agent/issues/135872)（cua-driver 0.34 元素点击失败）。

## 6. 功能请求与路线图信号

- **移动设备能力接入**：[#142277](https://github.com/NousResearch/hermes-agent/pull/142277) 允许 agent 通过网关调用手机相机/GPS/通知栏——多端 agent 的重要方向信号，PR 仍在推进。
- **商业化基建**：[#158060](https://github.com/NousResearch/hermes-agent/pull/158060) Desktop 内 Nous Portal 应用内优惠弹窗，配合 Portal 侧活动系统，显示商业化推进中。
- **记忆系统结构化**：[#92118](https://github.com/NousResearch/hermes-agent/pull/92118) 记忆预取结构化观察通道；[#155595](https://github.com/NousResearch/hermes-agent/issues/155595) profile 生命周期追踪 issue 显示该子系统的长期规划。
- **Tool Search 白名单**：[#86620](https://github.com/NousResearch/hermes-agent/issues/86620) 请求可配置的 MCP 工具豁免白名单，处于 needs-decision。
- **桌面 UX**：[#55287](https://github.com/NousResearch/hermes-agent/issues/55287)（聊天宽度设置，12 评论/4 👍）社区呼声较高，可能纳入后续版本。
- **插件生态**：Hackathon 相关 PR（[#149353](https://github.com/NousResearch/hermes-agent/pull/149353) 等）持续扩充插件目录。

## 7. 用户反馈摘要

- **多 worker/重度用户**：Kanban + cron 组合的可靠性问题（崩溃、空会话、工作丢失）是最集中的抱怨，影响生产部署信心。
- **规模化痛点**：会话数千条、profile 数十个后，网关 CPU 占用与超时问题显著，说明核心用户群已进入重度使用阶段。
- **平台差异**：Windows 用户遭遇死锁、文件锁、WSL 弹窗等特有问题；Linux AMD 用户抱怨桌面动画占用 50–69% iGPU（[#89732](https://github.com/NousResearch/hermes-agent/issues/89732)）。
- **提供商生态**：MiniMax 用户反馈新模型无法出现在选择器（[#152406](https://github.com/NousResearch/hermes-agent/issues/152406)）、thinking 预算无效（[#143065](https://github.com/NousResearch/hermes-agent/issues/143065)）。
- **正面信号**：v0.23.3 快速收拢 370 PR 的发版节奏、社区持续提交插件与文档 PR（如 [#158057](https://github.com/NousResearch/hermes-agent/pull/158057)），显示生态参与度健康。

## 8. 待处理积压

- **[#62336](https://github.com/NousResearch/hermes-agent/issues/62336)**（2026-07 开启，security）：凭据落盘问题超过 4 个月未决，标记 needs-decision，建议优先处理。
- **[#41219](https://github.com/NousResearch/hermes-agent/issues/41219)**（2026-06 开启）：Windows 网关死锁，确定性复现却长期 open。
- **[#55287](https://github.com/NousResearch/hermes-agent/issues/55287)**（2026-06 开启）：4 👍 的桌面功能请求，长期 needs-decision。
- **[#34372](https://github.com/NousResearch/hermes-agent/issues/34372)**（2026-05 开启）：BlueBubbles iMessage 重复处理，标记 duplicate 但未见收敛。
- **[#131859](https://github.com/NousResearch/hermes-agent/issues/131859)**：blocked/upstream，建议维护者协助向 GitHub 提交上游工单。
- **长期 PR**：[#92118](https://github.com/NousResearch/hermes-agent/pull/92118)（8 月开启）与 [#142277](https://github.com/NousResearch/hermes-agent/pull/142277)（10 月开启）仍 open，建议明确 review 计划避免腐烂。

---
*数据来源：GitHub API 快照（2026-11-20）。整体健康度：活跃度优秀，发版节奏稳定；主要风险在统一网关架构的规模化性能与会话状态回归，以及数个 P1/P2 长尾问题。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*