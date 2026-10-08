# OpenClaw 生态日报 2026-10-08

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-08 00:11 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-08

## 1. 今日速览

OpenClaw 今日保持高强度活跃：过去 24 小时内 Issues 更新 500 条（新开/活跃 445，关闭 55），PR 更新 500 条（待合并 368，已合并/关闭 132），无新版本发布。社区讨论焦点集中在 **Gateway 内存泄漏与资源管理**（多个 P0 级内存/进程泄漏议题持续发酵）以及 **升级/Doctor 迁移链路的反复失败**。PR 侧贡献活跃，多个修复与测试基建 PR 已进入 "ready for maintainer look" 状态，维护者 @steipete、@RomneyDa、@obviyus 推进节奏明显。整体健康度：**中偏承压**——新问题产生速度（445/日）远超关闭速度（55/日），积压风险上升。

## 2. 版本发布

过去 24 小时无新 Release。最近版本线为 2026.9.x（最新提及 2026.9.8，#165686），但 2026.9.4→9.6/9.8 升级路径存在多处已知回归（见第 5 节）。

## 3. 项目进展

今日无明确标注的已合并 PR 数据，但多条活跃 PR 显示进展方向：

- **资源与稳定性修复**
  - [#166613](https://github.com/openclaw/openclaw/pull/166613)：在 dispatch 前强制校验 required worker destinations，阻止冲突的执行选择（XL，含兼容性风险标记）
  - [#166754](https://github.com/openclaw/openclaw/pull/166754)：steering receipts 不确定时保留运行中的工具，避免误取消（ready for review）
  - [#166832](https://github.com/openclaw/openclaw/pull/166832)：父 Stop 时正确排空原生子代理命令
  - [#157739](https://github.com/openclaw/openclaw/pull/157739)：串行化 tsdown 构建以限制峰值内存，缓解 10GB 主机构建 OOM
- **升级与配置修复**
  - [#162134](https://github.com/openclaw/openclaw/pull/162134)：插件条目不可解析时更新快照降级为警告而非失败
  - [#166830](https://github.com/openclaw/openclaw/pull/166830) / [#166831](https://github.com/openclaw/openclaw/pull/166831)：`config get` 不再推荐被写保护拒绝的 `config set` 命令
- **质量基建**：Beta FRV（全量发布验证）相关的 backport 测试密集提交（[#166828](https://github.com/openclaw/openclaw/pull/166828)、[#166825](https://github.com/openclaw/openclaw/pull/166825)、[#166823](https://github.com/openclaw/openclaw/pull/166823)），以及测试瘦身批次 d011（[#166818](https://github.com/openclaw/openclaw/pull/166818)）和 Bun 平台测试补齐（[#166827](https://github.com/openclaw/openclaw/pull/166827)）
- **重要架构演进**：[#161057](https://github.com/openclaw/openclaw/pull/161057) 将 Skill Workshop 重构为直接、版本化的自学习闭环，移除无人审批的提案队列——这是 agent 自主能力方向的重要一步

## 4. 社区热点

1. **[#91588](https://github.com/openclaw/openclaw/issues/91588)（37 评论，P0）Gateway 内存泄漏：RSS 从 350MB 涨至 15.5GB 触发 OOM crash-loop** —— 持续 4 个月未解决，仍是社区最大痛点，标签 `needs-maintainer-review` 但无 fix PR。
2. **[#42475](https://github.com/openclaw/openclaw/issues/42475)（26 评论）Per-agent 成本预算网关级强制** —— 运营者希望在 dispatch 前拦截失控消费，多代理部署场景刚需，尚待产品决策。
3. **[#150635](https://github.com/openclaw/openclaw/issues/150635)（19 评论）短期记忆召回夜间驱逐导致 dreaming deep phase 永不晋升** —— 直指记忆系统核心机制缺陷，影响"AI 长期记忆"这一卖点。
4. **[#97616](https://github.com/openclaw/openclaw/issues/97616)（18 评论，P1）hook/工具子进程未回收，僵尸进程累积** —— 回归问题，与 #91588 同属资源管理类。
5. **[#142585](https://github.com/openclaw/openclaw/issues/142585)（18 评论，P0）2026.9.3 Doctor 拒绝合法 legacy workspace 迁移** —— 升级阻断类，`needs-info` 状态。

**共性诉求**：稳定性与可运营性（内存/进程/成本）压倒新功能；用户对升级路径反复失败感到疲劳。

## 5. Bug 与稳定性（按严重程度）

### P0
| Issue | 问题 | Fix PR |
|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway 内存泄漏 → OOM crash-loop | ❌ 无 |
| [#160548](https://github.com/openclaw/openclaw/issues/160548) | 2026.9.6 prepared-model-catalog worker 每 5 分钟泄漏 ~1GiB，回收时杀死等待中的 turn | ❌ 无（与 #165686 相关） |
| [#158592](https://github.com/openclaw/openclaw/issues/158592) | 主机睡眠唤醒后 model runtime 发布超时，所有入站消息失败直到重启 | ❌ 无 |
| [#156112](https://github.com/openclaw/openclaw/issues/156112) | `openclaw update` 在 global install swap 阶段确定性失败（npm） | ❌ 无（manual-only） |
| [#157812](https://github.com/openclaw/openclaw/issues/157812) | Windows 自动更新三种失败模式循环 | ❌ 无（manual-only） |
| [#89278](https://github.com/openclaw/openclaw/issues/89278) | Codex OAuth 刷新成功但 cron/heartbeat 因 10s 超时失败 | ✅ 已有 linked PR |
| [#137177](https://github.com/openclaw/openclaw/issues/137177) | 内置 wecom 插件无法安装 | ❌ needs-info |
| [#142585](https://github.com/openclaw/openclaw/issues/142585) | Doctor 拒绝合法 legacy 迁移 | ❌ needs-info |

### P1
- [#157989](https://github.com/openclaw/openclaw/issues/157989)：插件源捕获每次 CLI 命令重写 1.1–1.4GB、每次 Gateway 启动 6.5GB —— **严重 SSD 磨损**（9.5 回归）❌
- [#165686](https://github.com/openclaw/openclaw/issues/165686)：2026.9.8 Windows 上 Gateway 持续高 CPU / 事件循环饥饿（Codex catalog churn）❌
- [#134993](https://github.com/openclaw/openclaw/issues/134993)：大 fleet 下文件系统发现 busy-loop 打满单核 ❌
- [#137729](https://github.com/openclaw/openclaw/issues/137729)：transcript replay 中未防护的 `.trim()` 崩溃（代码库内已有修复模式）✅ linked PR
- [#136311](https://github.com/openclaw/openclaw/issues/136311)：memory-core reindex 锁永不释放，累积 19GB 孤儿临时 DB ❌
- [#138272](https://github.com/openclaw/openclaw/issues/138272)：Android Talk 语音在工具调用 turn 上必掉线（跨 3 个版本复现）❌
- [#148789](https://github.com/openclaw/openclaw/issues/148789)：fallback 链把 harness 级故障错归因为模型故障并耗尽所有候选 ❌

### 已关闭（今日解决信号）
- [#159612](https://github.com/openclaw/openclaw/issues/159612)：subagent 结算无限重试（`not-repro-on-main`）
- [#157818](https://github.com/openclaw/openclaw/issues/157818)：npm 更新 300s canary 上限问题
- [#158239](https://github.com/openclaw/openclaw/issues/158239)：旧内核上 Gateway 无法启动

## 6. 功能请求与路线图信号

- **成本管控**：[#42475](https://github.com/openclaw/openclaw/issues/42475) per-agent 预算 —— 数据基础（session-cost-usage.ts）已在，实现路径清晰，采纳概率较高。
- **内置 headless 浏览器**：[#53763](https://github.com/openclaw/openclaw/issues/53763) —— 长期高热度，`needs-product-decision`，无对应 PR。
- **SDK 稳定化**：[#74704](https://github.com/openclaw/openclaw/issues/74704)（maintainer 标签）+ [#79902](https://github.com/openclaw/openclaw/issues/79902) SQLite 侧路 —— 官方有明确意向，配合 Skill Workshop 重构（#161057）显示生态开放是当前主线。
- **可观测性**：[#50291](https://github.com/openclaw/openclaw/issues/50291) plugin hooks 缺 trace context —— 插件生态成熟的前置条件。
- **多代理隔离**：[#59149](https://github.com/openclaw/openclaw/issues/59149) per-agent A2A/可见性作用域、[#96975](https://github.com/openclaw/openclaw/issues/96975) 子代理结果隔离 —— 与 #166613（worker destination 强制）方向一致，可能被逐步吸收。
- **本地化**：[#79223](https://github.com/openclaw/openclaw/issues/79223) Dream Diary 语言可配置 —— 小改动、低成本、呼声明确，适合近期纳入。

## 7. 用户反馈摘要

- **满意点**：功能覆盖广（Telegram/Discord/QQ/iMessage 多渠道、cron、Home Assistant 联动），有家庭+商业长期用户（[#73537](https://github.com/openclaw/openclaw/issues/73537)）；社区 issue 报告质量高，用户愿意提供深度复现。
- **核心痛点**：
  1. **不敢升级**：2026.9.x 连续多个版本的升级回归（Doctor、updater、canary 超时、SSD 磨损）让用户形成"等几个版本再升"的防御心理，甚至要求发布"生产就绪"标签（#73537）。
  2. **长时间运行不稳**：内存泄漏、僵尸进程、CPU busy-loop、睡眠唤醒失败——"7×24 助手"场景的信任基础被侵蚀。
  3. **多代理/子代理边界混乱**：结果注入父上下文、原始 worker 输出直接发给聊天用户（[#90840](https://github.com/openclaw/openclaw/issues/90840)）、并发配置覆盖（[#43367](https://github.com/openclaw/openclaw/issues/43367)）。
  4. **环境兼容性**：Windows、旧内核、Podman 等环境下问题密度明显更高。
- **典型场景信号**：用户在 Mac mini/家庭服务器上跑 launchd/systemd 管理的常驻 Gateway，QQ/Telegram/Discord 为主渠道——这些正是问题集中爆发的组合。

## 8. 待处理积压

- **[#91588](https://github.com/openclaw/openclaw/issues/91588)**：4 个月、37 评论、P0 crash-loop，`needs-maintainer-review` 无 fix PR —— **最高优先级提醒**
- **[#43367](https://github.com/openclaw/openclaw/issues/43367)**：7 个月，多代理编排不稳定（含 data-loss 标签）
- **[#89278](https://github.com/openclaw/openclaw/issues/89278)**：4 个月，P0 OAuth 超时，PR 已挂但未合入
- **[#74586](https://github.com/openclaw/openclaw/openclaw/issues/74586)**：5 个月，active-memory memory_search 误判超时
- **stale 且 needs-product-decision 的功能请求群**：[#79902](https://github.com/openclaw/openclaw/issues/79902)、[#53763](https://github.com/openclaw/openclaw/issues/53763)、[#96975](https://github.com/openclaw/openclaw/issues/96975)、[#73537](https://github.com/openclaw/openclaw/issues/73537) —— 需产品侧一次性批量表态
- **PR 积压**：[#84853](https://github.com/openclaw/openclaw/pull/84853)（4.5 个月）、[#87434](https://github.com/openclaw/openclaw/pull/87434)、[#86793](https://github.com/openclaw/openclaw/pull/86793)（均 waiting on author 超 4 个月），建议维护者批量清理或关闭重开。

---

**总结**：OpenClaw 功能迭代与质量基建投入可观（FRV backport、测试瘦身、Skill Workshop 重构），但 2026.9.4 以来升级链路回归和常驻资源泄漏问题形成负面口碑压力。建议优先收敛内存/进程泄漏类 P0（#91588、#160548、#157989）并稳定 updater，再推进新功能。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析 — 2026-10-08

## 1. 生态全景

个人 AI 助手/自主智能体开源生态当前呈现“功能扩张与可靠性债务赛跑”的典型格局：两大头部项目（OpenClaw、Hermes Agent）日均 Issue/PR 活动均达数百条级别，社区参与度极高，但热点话题高度集中于资源泄漏、升级链路失败和数据丢失等工程可靠性问题。生态正从“能做什么”（多渠道接入、多代理编排）转向“能不能长期稳定地做”（7×24 常驻运行、可运营性、可升级性）。同时，安全边界（审批层、配置写保护）、跨 Agent 互联互通（A2A、跨 gateway 协作）和插件生态扩容成为架构演进的新主线。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 445，关闭 55） | 500（新开/活跃 285，关闭 215） |
| Issue 关闭率 | ~11% | ~43% |
| PR 更新（24h） | 500（待合并 368，合并/关闭 132） | 500（待合并 392，合并/关闭 108） |
| Release | 无（2026.9.8 为最新） | 无 |
| 核心热点 | Gateway 内存泄漏、升级回归 | 更新/安装可靠性、数据丢失修复 |
| 健康度评估 | **中偏承压**：问题增速（445/日）8 倍于关闭速度，P0 积压 4 个月未解 | **活跃且吞吐较好**：关闭率 43%，但 392 个待合并 PR 显示评审带宽紧张 |

**关键判读**：Hermes 的维护吞吐效率（关闭率 43% vs OpenClaw 11%）显著更优；OpenClaw 的活跃更多来自问题侧发酵而非解决侧推进，积压风险正在累积。

## 3. OpenClaw 在生态中的定位

**优势**：
- **渠道覆盖最广**：Telegram/Discord/QQ/iMessage 多渠道 + cron + Home Assistant 联动，已形成家庭与商业长期用户群（#73537），产品化程度高。
- **自主能力前沿**：Skill Workshop 重构为版本化自学习闭环（#161057）、dreaming/长期记忆机制，是“agent 自主性”方向最激进的探索。
- **质量基建自觉**：FRV 全量发布验证、测试瘦身、多平台（Bun）测试补齐，显示对发布质量的制度化投入。

**风险与短板**：
- **运营级稳定性欠账**：#91588（内存泄漏 4 个月未修，RSS 350MB→15.5GB）、#157989（每次 CLI 命令重写 1.4GB 造成 SSD 磨损）等 P0 无 fix PR，直接侵蚀“7×24 助手”的核心卖点。
- **升级链路信任崩塌**：2026.9.4 以来连续回归（Doctor、updater、canary），用户形成“等几个版本再升”的防御心理，甚至要求“生产就绪”标签。
- **Issue 关闭率仅 11%**，维护带宽与社区规模明显失配。

**技术路线差异**：OpenClaw 重“广度+自主性”（多渠道、自学习技能、dreaming 记忆），Hermes 重“架构统一”（统一 gateway 会话架构 #106742、跨 gateway Bot 协作 #97681）与安全治理（approval layer）。社区规模上两者同量级（日均 500 更新），但 OpenClaw 用户问题报告更深度、更生产化。

## 4. 共同关注的技术方向

| 方向 | 具体诉求 | 涉及项目 |
|---|---|---|
| **更新/安装可靠性** | OpenClaw：`update` npm swap 确定性失败、Windows 自动更新循环；Hermes：更新留半成品、macOS hand-off lock 回归、Windows 全新安装失败，Discord 每周 15+ 线程 | **两者均为最大痛点来源** |
| **常驻进程资源管理** | OpenClaw：内存泄漏 OOM、僵尸进程、busy-loop CPU；Hermes：fetch 递归进程树 swap 耗尽、PM venv 写出坏 launchd 服务 | 两者 |
| **数据安全与会话状态** | OpenClaw：多代理 data-loss（#43367）；Hermes：scratch prune 静默删除、Desktop 静默归档对话、会话恢复重复消息 | 两者（Hermes 更紧迫） |
| **安全边界一致性** | OpenClaw：`config get` 推荐被写保护拒绝的命令；Hermes：`config set` 绕过审批层（#59293 security） | 两者——CLI 前门旁路是共性漏洞模式 |
| **多代理/跨 Agent 协作** | OpenClaw：per-agent A2A 作用域、子代理结果隔离、成本预算强制；Hermes：跨 gateway/跨 owner Bot 协作 | 两者，为生态下一阶段核心方向 |
| **插件生态与可观测性** | OpenClaw：plugin hooks trace context；Hermes：Plugin Catalog（ERP connector、记忆 provider）自然生长 | 两者 |
| **Windows 二等公民问题** | 两项目 Windows 专属阻塞问题密度均显著偏高 | 两者 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道消息、自学习 Skill、长期记忆（dreaming）、成本管控诉求 | 统一会话架构、跨 gateway 协作、approval 安全层、本地模型兼容（Ollama） |
| 目标用户 | 家庭/小商业 7×24 常驻部署（Mac mini/家庭服务器 + QQ/TG/Discord） | 技术型个人用户、瘦客户端/远程桌面用户、本地优先部署者 |
| 技术架构 | Gateway + worker/子代理 dispatch 体系，npm 分发，cron/heartbeat 驱动 | Python venv/PM 运行时，CLI/TUI/Desktop/ACP/bots 统一 gateway 会话（重构中） |
| 成熟阶段 | 功能丰富但运营级稳定性未收敛 | 架构收敛期，正在统一多端基础设施 |

## 6. 社区热度与成熟度

- **快速迭代期**：Hermes Agent——43% 关闭率、P0 修复（#134173）响应迅速、插件生态自然扩容，处于“边修边长”的上升期；但评审瓶颈（#134008 贡献者公开批评、392 个待合并 PR）是治理层面最需解决的问题。
- **质量巩固期（承压）**：OpenClaw——功能与测试基建投入可观，但 11% 关闭率 + 多个 4~7 个月 P0 积压（#91588、#43367、#89278）表明已进入“债务偿还”阶段。若不能在下一版本收敛资源泄漏与升级链路，负面口碑（“不敢升级”）将固化。
- **共同信号**：两项目均有高票 feature 长期悬置（OpenClaw #53763/#73537；Hermes #38519），反映产品决策带宽普遍落后于社区需求产生速度。

## 7. 值得关注的趋势信号

1. **“生产就绪”成为新竞争维度**：用户从功能尝鲜转向要求稳定性标签、升级保障、数据安全机制（隔离区/保留标记/回滚）——AI 助手项目正在经历数据库、容器等基础设施软件走过的成熟路径。
2. **成本可观测与强制执行是刚需**：per-agent 预算网关拦截（OpenClaw #42475）在多代理部署场景呼声强烈，且实现路径已清晰——对开发者而言，成本管控原语（预算、trace context、usage 度量）应尽早进入架构设计。
3. **安全旁路是共性软肋**：两项目均出现 CLI 绕过审批/写保护的问题，提示“agent 权限模型必须覆盖所有入口（含编程接口）"，而非仅聊天层。
4. **跨 Agent 互联（A2A）从愿景走向排期**：OpenClaw 的作用域隔离与 Hermes 的跨 gateway Bot 协作同期推进，个人 Agent 互联协议层有望成为下一个生态竞争点。
5. **贡献者体验决定生态上限**：Hermes 的评审循环批评与 OpenClaw 的 4.5 个月僵尸 PR 均说明，评审带宽与分流机制已成为开源 AI 项目比代码质量更稀缺的资源。
6. **对开发者的直接建议**：优先建设发布验证（参考 OpenClaw FRV）、更新失败恢复路径（参考 Hermes #125437 教训）和资源泄漏检测——这三项是当前用户流失的第一动因。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-08

---

## 1. 今日速览

- 项目保持**高度活跃**：过去 24 小时 Issues 更新 500 条（新开/活跃 285，关闭 215），PR 更新 500 条（待合并 392，已合并/关闭 108），Issue 关闭率达 43%，表明维护团队吞吐能力较强。
- **无新版本发布**，主分支仍处于持续集成迭代阶段，核心工作集中在更新/安装可靠性、会话状态管理和跨 gateway 协作三大主题。
- **P0 级问题持续受到关注**：scratch 目录 24h 静默清理销毁多日工作的问题（#132401）已有对应修复 PR（#134173）在推进中，社区讨论热烈。
- 安装/更新链路的兼容性问题仍是最大痛点来源，多个 P1 级问题集中在 `hermes update`、PM 运行时和 Windows/macOS 平台。
- 贡献生态健康：出现多个社区 Plugin Catalog / Connectors 提交（Frihet ERP、hyatlas memory），扩展生态在自然生长。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日无大规模合并，重要 PR 处于评审/推进阶段：

- **[#134173](https://github.com/NousResearch/hermes-agent/pull/134173)（P0，OPEN）** — scratch prune 修复：修剪前对候选列表重新校验，救援修剪期间正在写入的文件。直接针对 #132401 数据丢失问题，是本周最关键的修复之一。
- **[#133748](https://github.com/NousResearch/hermes-agent/pull/133748)（P0，OPEN）** — Desktop regenerate 不再静默归档后续多轮对话，深度回退需显式确认；服务器先记录一个 release 再拒绝，属渐进式破坏性变更保护。
- **[#134828](https://github.com/NousResearch/hermes-agent/pull/134828)** — 修复 Windows 下插件卸载在 gateway 运行时报 `WinError 5]` 并留下半删除插件的问题，是 [#134824](https://github.com/NousResearch/hermes-agent/pull/134824)（revert #134189）的后续正确方案。
- **[#134799](https://github.com/NousResearch/hermes-agent/pull/134799)（P1）** — durable-uid flush guard：防止从持久化行恢复的消息被重新插入，修复会话恢复路径的重复消息风险（与 #127665 的重复渲染症状同根）。
- **[#134823](https://github.com/NousResearch/hermes-agent/pull/134823)（P2）** — Remote primary 场景下所有 "This device" profile 共享一个不被 idle-kill 的本地 backend，修复 "Backend offline" 问题。
- **[#134824](https://github.com/NousResearch/hermes-agent/pull/134824)（CLOSED）**、**[#121757](https://github.com/NousResearch/hermes-agent/pull/121757)（CLOSED）** 等已完成生命周期处理。

**评估**：核心方向明确——数据安全（prune/会话恢复）、更新可靠性、gateway 统一架构（#106742 系列）正在系统性推进，但 392 个待合并 PR 显示评审带宽仍是瓶颈。

---

## 4. 社区热点

**🔥 讨论最多的 Issues：**

1. **[#127665](https://github.com/NousResearch/hermes-agent/issues/127665)（50 评论）** — Desktop 单条回复重复渲染，与 #127288 同症状但经由不同代码路径（overlay fold 豁免了 pending live rows），且在已含 #127282 修复的 build 上复现。用户对"修复后又复发"的不满情绪明显。相关修复线索见 PR #134799。
2. **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)（40 评论，4 👍）** — Bot 跨 gateway 协作（进而跨 owner），是个人 AI Agent 互联互通的架构级 feature，代表项目长期愿景方向。
3. **[#125727](https://github.com/NousResearch/hermes-agent/issues/125727)（31 评论）** — 自动化 Nous 集成合并因大面积文件冲突被阻塞，暴露自动化流水线的维护债务。
4. **[#134107](https://github.com/NousResearch/hermes-agent/issues/134107)（22 评论）** — 剥离版 PM 运行时缺 httpx 导致 bundled solstice provider 加载失败，警告泄漏到 TUI 且刷屏 6 次/更新。
5. **[#59293](https://github.com/NousResearch/hermes-agent/issues/59293)（21 评论，security）** — `hermes config set` 绕过系统配置写保护，agent 可经 CLI 前门无门禁地关闭审批层。**安全问题，needs-decision，值得维护者优先裁定。**
6. **[#134008](https://github.com/NousResearch/hermes-agent/issues/134008)（18 评论）** — 社区贡献者公开批评 review pipeline：高质量 PR 长期卡在评审循环，等到评审通过时代码已过时需重做。**这是治理层面的重要信号。**

---

## 5. Bug 与稳定性

| 严重度 | Issue | 摘要 | Fix 状态 |
|---|---|---|---|
| **P0** | [#132401](https://github.com/NousResearch/hermes-agent/issues/132401) | scratch prune 24h 静默删除多日 agent 工作（无日志/隔离/保留标记） | ✅ PR [#134173](https://github.com/NousResearch/hermes-agent/pull/134173) 推进中 |
| **P0** | PR [#133748](https://github.com/NousResearch/hermes-agent/pull/133748) | Desktop 深度 regenerate/edit 静默归档后续对话轮次 | 修复 PR 本身在评审 |
| **P1** | [#133992](https://github.com/NousResearch/hermes-agent/issues/133992) | macOS Desktop 更新 hand-off 拒绝自己发起的 `hermes update`（lock 冲突），为 #78119/#87514 的**回归** | 暂无 fix PR |
| **P1** | [#125350](https://github.com/NousResearch/hermes-agent/issues/125350)（CLOSED） | Windows 全新安装完全无法完成（bzip2 缺失、ffmpeg pin 404 等） | 已关闭 |
| **P1** | [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) | 更新失败留下半成品安装、原始错误直出、无产品内恢复路径；本周 15 个 Discord 线程 | 暂无集中 fix |
| **P1** | [#125375](https://github.com/NousResearch/hermes-agent/issues/125375) | PM venv 启动的 gateway 写出无法启动的 launchd 服务却打印 "✓ Service started" | 暂无 fix PR |
| **P1** | [#122529](https://github.com/NousResearch/hermes-agent/issues/122529) / [#122425](https://github.com/NousResearch/hermes-agent/issues/122425) | cron worker / managed env 的 venv PYTHONPATH 缺失（`ModuleNotFoundError: ruamel` 等） | #122490（同类）已关闭 |
| **P2** | [#127665](https://github.com/NousResearch/hermes-agent/issues/127665) | Desktop 回复重复渲染（新路径） | 相关 PR #134799 在推进 |
| **P2** | [#124794](https://github.com/NousResearch/hermes-agent/issues/124794) | tree:0 partial clone + git<2.44 下更新 fetch 递归进程树失控，8GB 机器 swap 耗尽 | 暂无 |
| **P3** | [#134107](https://github.com/NousResearch/hermes-agent/issues/134107) | provider 插件加载失败警告刷屏 TUI | 暂无 |
| **自动化** | [#119070](https://github.com/NousResearch/hermes-agent/issues/119070) / [#122609](https://github.com/NousResearch/hermes-agent/issues/122609) | kanban 卡片卡 blocker_auth 死循环 / Skills index 过期 | 暂无 |

**趋势**：会话状态（sweeper:risk-session-state）与兼容性（risk-compatibility）是最高频风险标签，安装/更新（area/install-update）覆盖了今日热点 Issue 的一半以上。

---

## 6. 功能请求与路线图信号

- **跨 gateway Bot 协作**（[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)）：已进入 review queue，是"个人 Agent 互联"的基石，配合 [PR #126341](https://github.com/NousResearch/hermes-agent/pull/126341)（Matrix live session 建线程）显示多端消息基础设施在铺路，**大概率纳入后续版本主线**。
- **统一 gateway 会话架构**（[PR #106742](https://github.com/NousResearch/hermes-agent/pull/106742)，P1）：CLI/TUI/Desktop/ACP/bots/cron 共享同一活跃会话，是架构级重构，正在长期推进。
- **Desktop 仅前端安装**（[#38519](https://github.com/NousResearch/hermes-agent/issues/38519)，18 👍）+ 远程客户端 onboarding（#85422 已关闭）：远程/瘦客户端需求明确且呼声高。
- **非 agentic 定时自动更新**（[PR #56787](https://github.com/NousResearch/hermes-agent/pull/56787)）：复活的长期 PR，直接回应 #125437 描述的更新失败痛点。
- **生态扩展**：[PR #134790](https://github.com/NousResearch/hermes-agent/pull/134790)/[#134792](https://github.com/NousResearch/hermes-agent/pull/134792)（Frihet ERP connector）、[PR #134419](https://github.com/NousResearch/hermes-agent/pull/134419)（hyatlas 本地优先记忆 provider）——Plugin Catalog 生态持续扩容，合并阻力小。
- **放宽 64K context 下限**（[#53347](https://github.com/NousResearch/hermes-agent/issues/53347)，6 👍）：Ollama 轻量部署需求，needs-decision 状态待裁定。

---

## 7. 用户反馈摘要

**痛点：**
- **更新/安装是最大挫败源**：#125437 直接引用"本周 15 个 Discord 线程，每个修复都是手打 recipe"——用户在更新失败后只能靠社区口口相传的命令自救。
- **数据安全感缺失**：scratch prune 静默删除（#132401）让用户对"parked 工作"失去信任，要求日志、隔离区或保留标记。
- **评审流程劝退贡献者**：#134008 反映有才能的贡献者 PR 因评审循环过慢而过时、放弃，"go silent and get forgotten"。
- Windows 用户长期处于二等公民状态（#125350、#58458 均为 Windows 专属阻塞）。

**满意/认可：**
- 用户对 approval layer 等安全机制本身认可，只是要求 CLI 后门也被封住（#59293）。
- MoA 预设编辑（PR #70228）、会话可见性（#50718）等 UX 需求讨论质量高，用户主动给出详细场景。

---

## 8. 待处理积压

- **[#59293](https://github.com/NousResearch/hermes-agent/issues/59293)（security，7 月开，needs-decision）** — 安全类 issue 悬置 3 个月，建议优先裁定。
- **[#132401](https://github.com/NousResearch/hermes-agent/issues/132401)（P0）** — 修复 PR #134173 已开但未合并，P0 数据丢失风险每多一天都有实际损害。
- **[#125437](https://github.com/NousResearch/hermes-agent/issues/125437)（P1）** — 更新失败恢复机制缺失，影响面最大（Discord 高频）。
- **[#119070](https://github.com/NousResearch/hermes-agent/issues/119070)** — kanban dispatcher 死循环 2 周无决策，影响项目自身自动化运维。
- **[#38519](https://github.com/NousResearch/hermes-agent/issues/38519)（18 👍，6 月开）** — 高票 feature 长期未排期。
- **PR 积压**：392 个待合并 PR，其中 [PR #106742](https://github.com/NousResearch/hermes-agent/pull/106742)（9 月 9 日开，P1 架构重构）、[PR #56787](https://github.com/NousResearch/hermes-agent/pull/56787)（7 月开）等长期未合并，与 #134008 反映的评审瓶颈互为印证。**建议维护者增加评审带宽或明确分流机制。**

---

*数据来源：GitHub API，统计窗口 2026-10-07 ~ 2026-10-08。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*