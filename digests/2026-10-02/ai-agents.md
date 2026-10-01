# OpenClaw 生态日报 2026-10-02

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-01 23:52 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-02

---

## 1. 今日速览

OpenClaw 今日保持**高强度活跃**：过去 24 小时 Issues 更新 500 条（新开/活跃 257，关闭 243），PR 更新 500 条（待合并 310，已合并/关闭 190），新开 PR 密集集中在 10-01 当天，多位核心贡献者（@steipete、@RomneyDa、@vincentkoc 等）持续输出。**无新版本发布**，但从 [#163074](https://github.com/openclaw/openclaw/pull/163074) 可见 `2026.9.8` 发布候选正在筹备，处于发布前修复回填阶段。项目当前的主要健康度压力集中在：**Windows 平台稳定性、SQLite 存储层 I/O 与增长、Gateway 启动/内存性能**三大领域，且存在多个 P0 级 ux-release-blocker 未闭环。

---

## 2. 版本发布

今日无新 Release。注意 [#163074](https://github.com/openclaw/openclaw/pull/163074)（backport release-critical update and session repairs）明确指出 `2026.9.8` RC 缺少已确认的 update/Windows copy/性能/内存修复，说明**下一个补丁版本 imminent**，建议关注。

---

## 3. 项目进展

今日合关 PR 190 条，重点方向：

**发布与更新链路**
- [#163074](https://github.com/openclaw/openclaw/pull/163074) 将 release-critical 的 update 与 session 修复回填到 `2026.9.8` RC（P1，含 telegram-e2e proof，waiting on author）。
- [#162268](https://github.com/openclaw/openclaw/pull/162268) 修复更新所有权检查时不再复制繁忙数据库（P1，ready for review），直击 "SQLite source did not stabilize" 更新失败。
- [#163105](https://github.com/openclaw/openclaw/pull/163105) 在维护阶段启用增量 SQLite 页回收，缓解磁盘只增不减问题。
- [#162146](https://github.com/openclaw/openclaw/pull/162146) 修复截断的 update 报告丢失 Recovery/Verification 信息。

**Windows 与运行时**
- [#163093](https://github.com/openclaw/openclaw/pull/163093) 修复 llama-cpp 托管服务在干净 Windows 安装上的启动失败（P1，ready for review）。
- [#162537](https://github.com/openclaw/openclaw/pull/162537) 修复 Bun 运行时下进程识别与 worker bundle 不完整问题。
- [#162226](https://github.com/openclaw/openclaw/pull/162226)（P1）修复 model-catalog worker 在 scope 增长时丢弃增量加载的插件——直接对应 #159662 内存泄漏的根因之一。

**会话与委派**
- [#163030](https://github.com/openclaw/openclaw/pull/163030)（XL）保证后台写入后 session 详情不丢失，替换 #157854。
- [#163032](https://github.com/openclaw/openclaw/pull/163032)（P1）修复同模型重试后 completion turns 丢失委派工具。
- [#162986](https://github.com/openclaw/openclaw/pull/162986) 允许 guest 通知其拥有的子会话（已关闭）。

**CI/工程效率**
- [#159988](https://github.com/openclaw/openclaw/pull/159988) 425 个测试文件/3573 用例改用原生 Bun 运行；[#163094](https://github.com/openclaw/openclaw/pull/163094)、[#163101](https://github.com/openclaw/openclaw/pull/163101) 继续压缩 CI 时长。

**整体评估**：单日推进量可观，update/Windows/SQLite 三条 P0 问题主线均有对应 PR 在途，项目处于**修复密集期而非功能扩张期**。

---

## 4. 社区热点

1. **[#143524](https://github.com/openclaw/openclaw/issues/143524)** — Agent SQLite WAL 数天内膨胀至 1.4–2.8 GB、阻塞 Gateway 启动（P0，103 条评论，标签仍为 needs-maintainer-review/needs-info）。**全站讨论最多的 Issue**，Windows 用户反复提供数据，但尚无修复 PR，是当前社区情绪的最大燃点。
2. **[#153257](https://github.com/openclaw/openclaw/issues/153257)** — "2026.9.5 把稳定环境变成 8 小时故障恢复会话”（P0 crash，40 条评论），代表了一批 9.x 升级受挫用户的强烈不满。
3. **[#157067](https://github.com/openclaw/openclaw/issues/157067)**（已关闭，21 评论）与 [#161654](https://github.com/openclaw/openclaw/issues/161654)（已关闭）、[#161828](https://github.com/openclaw/openclaw/issues/161828)（已关闭）构成 **Windows env Proxy DataCloneError 系列**——社区在三天内接力定位了从顶层 readExactEntries 到嵌套 input.request.env 的多层泄漏路径，是今日协作修复的最佳范例；#161828 明确指出修复 PR 需要超越 #161654 的范围。
4. **[#6615](https://github.com/openclaw/openclaw/issues/6615)** — exec-approvals denylist 支持功能请求，👍 8，持续有社区讨论，安全策略灵活性的长期诉求。

---

## 5. Bug 与稳定性（按严重度）

**P0 / ux-release-blocker**

| Issue | 问题 | Fix 状态 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | WAL 无限增长阻塞 Gateway 启动 | ❌ 无 fix PR |
| [#160386](https://github.com/openclaw/openclaw/issues/160386) | 2026.9.6 大 session store 下 SQLite I/O 压力 + RPC 超时 | ⚠️ 相关：#163105 |
| [#161953](https://github.com/openclaw/openclaw/issues/161953) | Windows sessions.create 必现失败（win32 路径泄漏，已关闭） | ✅ 有修复 |
| [#161828](https://github.com/openclaw/openclaw/issues/161828) | Windows DataCloneError 嵌套路径（已关闭） | ✅ 修复中 |
| [#162047](https://github.com/openclaw/openclaw/issues/162047) | Windows 升级 Doctor 卡 35+ 分钟（已关闭） | ✅ 有修复 |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | prepared-model-catalog.worker 每小时泄漏 4–5 GB | ⚠️ 疑似 #162226 |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | 632-agent 集群 Gateway ready 后事件循环饥饿 | ❌ 无 fix PR |
| [#158239](https://github.com/openclaw/openclaw/issues/158239) | 旧内核（<5.6）主机 Gateway 无法启动 | ❌ 无 fix PR |
| [#160521](https://github.com/openclaw/openclaw/issues/160521) | 大 session 下 reconcileActive 未处理 rejection 崩溃 | ❌ 无 fix PR |
| [#155859](https://github.com/openclaw/openclaw/issues/155859) | Gateway 启动时间随插件数线性增长 | ❌ 无 fix PR |
| [#115642](https://github.com/openclaw/openclaw/issues/115642) | 订阅计费冷却窗口 (~5h) 长于实际故障 | ❌ 待产品决策 |

**P1 亮点**
- [#148707](https://github.com/openclaw/openclaw/issues/148707)：2026.9.4 回归——并发 turn 顶替导致回复永久丢失（"no active tool authority snapshot"）。
- [#118185](https://github.com/openclaw/openclaw/issues/118185)：同一 turn 被两个 writer 以不同规则写入 transcript 两次（linked PR open）。
- [#65374](https://github.com/openclaw/openclaw/issues/65374)：dreaming 系统跨 agent 污染共享记忆语料，多 agent 用户的核心信任问题。
- [#108395](https://github.com/openclaw/openclaw/issues/108395)：模型伪造 "Human:" 用户消息可自我授权 live actions——**安全类**，值得安全团队尽快复核。
- [#97616](https://github.com/openclaw/openclaw/issues/97616)：hook/tool 子进程僵尸累积（长期存在）。

---

## 6. 功能请求与路线图信号

- **exec denylist**（[#6615](https://github.com/openclaw/openclaw/issues/6615) 👍8、[#71097](https://github.com/openclaw/openclaw/issues/71097)）：需求明确、实现面窄，配合 [#162687](https://github.com/openclaw/openclaw/pull/162687) 正在重构 exec 审批策略迁移，**很可能在下个版本落地**。
- **记忆审计日志**（[#20935](https://github.com/openclaw/openclaw/issues/20935)）：与 memory-core dreaming 系列修复（[#156667](https://github.com/openclaw/openclaw/pull/156667)、#150635、#121232）同属记忆子系统大修，属于中期方向。
- **计费冷却探针式恢复**（[#115642](https://github.com/openclaw/openclaw/issues/115642)）：P0 但卡在 needs-product-decision，需产品侧拍板。
- **Bun 一等运行时**：#159988、#162537、#163101 显示项目正在系统性投资 Bun 兼容与 CI，是清晰的工程路线图信号。

---

## 7. 用户反馈摘要

- **升级信心受挫**：2026.9.4–9.7 连续多个版本引入 Windows 回归，"升级等于赌博"的情绪在 #153257、#161828 等贴中明显；用户呼吁发布前加强 Windows 矩阵测试。
- **大规模部署用户（百 agent 级）被忽视感**：#149538（632-agent）、#160386（大 session store）反映性能测试覆盖不足。
- **正反馈**：Windows DataCloneError 系列三天内从报告到关闭，社区对响应速度认可；Doctor/update 链路的修复 PR（#162268、#162146）被等待升级的用户积极关注。
- **渠道用户（WhatsApp/飞书/Discord）** 诉求集中在投递可靠性（#161976、#77717）与存在状态误报（#160610）。

---

## 8. 待处理积压（维护者关注清单）

| 项 | 状态 | 提醒 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 103 评论，needs-info，9/09 起 | **最热 P0 无任何 fix PR**，与 #163105/#162268 相关，建议归并处理 |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | 7/27 起，dedupe:parent | memory SQLite 无保留策略，将慢性填满磁盘 |
| [#84037](https://github.com/openclaw/openclaw/issues/84037) | 5/19 起 | Codex 稳态 CPU 开销，长期 needs-product-decision |
| [#65374](https://github.com/openclaw/openclaw/issues/65374) | 4/12 起 | 多 agent 记忆污染 + 安全审查，6 个月未决 |
| [#115546](https://github.com/openclaw/openclaw/issues/115546) | 7/29 起 | 大 session 压缩 100% 失败 → wake 死循环 |
| [#6615](https://github.com/openclaw/openclaw/issues/6615) | 2/01 起，👍8 | denylist 功能请求 8 个月未排期 |
| PR [#139260](https://github.com/openclaw/openclaw/pull/139260) | 9/05 起，needs proof | Codex 回答被截断修复停滞近一个月 |

---

**健康度小结**：贡献动能优秀（单日 190 PR 合关），但 P0 缺陷净存量偏高，尤其 Windows + SQLite 主线若不能随 `2026.9.8` 收口，将持续消耗社区信任。建议优先推动 #143524、#159662、#149538 三条主线的 fix PR 落地。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比报告（2026-10-02）

## 1. 生态全景

个人 AI 助手/自主智能体赛道已进入**高活跃度、高分化**阶段：头部项目日均 Issue/PR 更新均达千条量级，社区动能旺盛。生态焦点正从“功能扩张”转向**稳定性、资源效率与多渠道/多智能体架构**——内存泄漏、升级回归、更新链路破坏是各项目共同的口碑杀手。本地运行时工程（Bun、venv 管理、SQLite 存储）成为竞争差异点。安全类问题（密钥泄露、自我授权攻击面）开始进入社区视野，预示成熟期治理需求。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 257，关闭 243） | 500（新开/活跃 342，关闭 158） |
| PR 更新（24h） | 500（待合并 310，合关 190） | 500（待合并 354，合关 146） |
| Release | 无（`2026.9.8` RC 筹备中，imminent） | 无（主干 revert/重落密集变更期） |
| Issue 收敛率 | 关闭/活跃 ≈ 94%（高） | 关闭/活跃 ≈ 46%（低） |
| 核心瓶颈 | Windows 稳定性、SQLite 存储、Gateway 性能 | Desktop 渲染层、安装/更新路径 |
| 健康度评估 | **修复密集期**：P0 净存量偏高，#143524（103 评论）无 fix PR 是最大燃点 | **快速迭代期**：活跃度高但收敛慢，revert-重落循环提示质量门禁不足 |

## 3. OpenClaw 在生态中的定位

**优势**：
- Issue 收敛能力显著更强（243 vs 158 关闭/日），Windows DataCloneError 系列三天从报告到关闭，响应速度获社区认可
- 发布节奏成熟（`2026.9.8` RC 已进入回填修复阶段），版本化治理优于 Hermes 的主干漂移状态
- 工程化投资清晰：Bun 一等运行时（425 测试文件迁移）、CI 压缩、增量 SQLite 页回收

**劣势/风险**：
- P0 净存量高：11 项 P0 中 6 项无 fix PR（#143524、#149538、#158239 等）
- Windows 回归连续 4 个版本（9.4–9.7），“升级等于赌博”情绪损害信任
- 大规模部署（632-agent 集群、大 session store）用户被忽视感明显

**技术路线差异**：OpenClaw 走“平台化 + 多渠道 + 大规模 agent 集群”路线，工程重心在存储层（SQLite WAL）与更新链路；Hermes 更偏“单用户 Desktop/消息平台代理”，重心在渲染体验与插件/网关路由。社区规模上两者同处第一梯队（日均更新量相当），但 OpenClaw 的企业级/规模化用户画像更重。

## 4. 共同关注的技术方向

| 方向 | 项目 | 具体诉求 |
|---|---|---|
| **内存/资源泄漏** | 两者 | OpenClaw #159662（worker 每时泄漏 4–5 GB）、#143524（WAL 2.8 GB）；Hermes #127647（Desktop idle burn）、#46082（Dashboard 涨至 5.2 GB 被 OOM） |
| **更新/安装链路可靠性** | 两者 | OpenClaw：update 复制繁忙数据库、Doctor 卡 35 分钟；Hermes：venv 重建丢弃可选依赖致 cron 静默失败 |
| **远程 Agent / 多 gateway 路由** | 两者 | OpenClaw 委派子会话系列 PR；Hermes #18715（远程 Agent + 本地工具，36 👍）、#97681 跨 gateway 协作 |
| **多 agent 记忆与安全** | 两者 | OpenClaw #65374 记忆污染、#108395 模型自我授权；Hermes #131017 API key 明文泄露改进 |
| **消息渠道投递可靠性** | 两者 | OpenClaw WhatsApp/飞书/Discord；Hermes Telegram/Matrix/QQ 静默失败 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多 agent 编排、Gateway、订阅计费、大规模部署 | Desktop 体验、消息平台集成、Kanban 任务调度 |
| 目标用户 | 进阶/企业级用户（百 agent 集群运维者） | 个人用户、开源社区极客（Nous 生态） |
| 技术架构 | TypeScript + Bun 迁移、SQLite 存储、插件化 model-catalog | Electron Desktop + Python 工具链、gateway 多 profile 路由 |
| 特色能力 | dreaming 记忆系统、exec-approvals 安全策略 | SOUL.md 身份继承、cron/kanban 调度器 |

## 6. 社区热度与成熟度

- **质量巩固阶段：OpenClaw** — 高收敛率、版本化发布、修复密集；社区协作修复范例（DataCloneError 接力定位）体现成熟治理，但 P0 积压与 Windows 矩阵测试缺失是短板
- **快速迭代阶段：Hermes Agent** — 新开 Issue 多（342 vs 257）、合并率低，Desktop/渲染层 bug 簇系统性存在；但回归响应极快（YouTube embed 一天完成 revert→重设计→重落），社区贡献质量高
- 两者共同点：热度均极高，但均存在**“慢性积压”**——最高票 feature 长期悬置（Hermes #18715 五个月、OpenClaw #6615 八个月）

## 7. 值得关注的趋势信号

1. **稳定性即竞争力**：升级回归（OpenClaw 9.x 系列）和 revert 风暴（Hermes #130852）表明，发布前回归测试矩阵（尤其 Windows）和质量门禁是下一阶段生态竞争焦点
2. **资源效率成为硬指标**：idle 资源消耗、内存泄漏、磁盘增长是两项目最热议题——AI 智能体开发者应将资源治理（内存上限、WAL/存储回收）作为一等架构需求
3. **远程/本地混合执行架构是明确方向**：Hermes #18715（36 👍）与 OpenClaw 委派机制均指向“模型远程、工具本地”的部署形态
4. **安全面浮现**：模型自我授权攻击（#108395）、跨 agent 记忆污染（#65374）、密钥泄露——随着 agent 获得行动能力，供应链式安全审计将成为标配
5. **运行时选型博弈**：OpenClaw 全面向 Bun 迁移 vs Hermes 维护 Python venv 路径，更新链路的健壮性直接决定用户留存
6. **多 agent 协作是中期路线图共识**：Kanban swarm、跨 gateway 协作、SOUL.md 身份继承，均指向“agent 群体”而非单一助手的产品形态

**结论**：OpenClaw 处于规模化后的质量攻坚期，若 `2026.9.8` 能收口 Windows/SQLite 主线，其平台化优势将进一步巩固；Hermes 以迭代速度和社区特色功能取胜，但需专项治理 Desktop 渲染层与更新路径。对开发者而言，两者共同揭示的信号是：**个人 agent 项目的下一战场在稳定性、资源治理与安全，而非功能清单**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-02

## 1. 今日速览

Hermes Agent 今日继续保持极高活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 342，关闭 158），PR 更新 500 条（待合并 354，已合并/关闭 146），无新版本发布。项目当前处于快速迭代期，焦点集中在 **Desktop 端稳定性修复**（YouTube embed 回归、右键菜单、会话渲染）和 **Kanban 调度器工程化改进**。核心维护者 @teknium1 今日连续提交多个 Desktop 修复 PR，显示主线上近期一次大批量 revert（#130852）后的功能重落（re-land）正在紧张进行中。

## 2. 版本发布

今日无新版本发布。最新开发动态显示代码处于主干密集变更期（涉及 #127201 的 revert 与重新设计），预计下一次发版将包含 Desktop embed 与 preview tab 的重落方案。

## 3. 项目进展

今日合并/关闭的重要 PR：

- **#130984** [已关闭/重落成功] fix(desktop): YouTube embeds 在打包应用中恢复播放，同时窗口保持 `file://` origin，修复了 #127201 引入的 Origin 校验回归（即 #130277）。这是今日最关键的进展：用新设计（loopback player host）替代了被 revert 的旧方案。([链接](https://github.com/NousResearch/hermes-agent/pull/130984))
- **#131010** [已关闭] fix(tools): vision 图像在 resize 前应用 EXIF orientation，修复手机竖拍照片被横发送给模型的问题。([链接](https://github.com/NousResearch/hermes-agent/pull/131010))
- **#77922** [已关闭] fix(copilot): 为 GPT-5.6 Luna 保留 `reasoning.effort=max`。([链接](https://github.com/NousResearch/hermes-agent/pull/77922))
- **#41891** [已关闭] fix(matrix): 文件缺失时返回 SendResult 而非向主房间发送错误消息。([链接](https://github.com/NousResearch/hermes-agent/pull/41891))

待合并的新提交：

- **#131015**：YouTube embed host 对畸形路径返回 404 而非主进程崩溃（#130984 的 follow-up）。([链接](https://github.com/NousResearch/hermes-agent/pull/131015))
- **#130996**：重新落盘 preview tab 按会话隔离（re-land #128552，修复 #73890）。([链接](https://github.com/NousResearch/hermes-agent/pull/130996))
- **#131017**：auxiliary 自定义端点的 API key 写入 `.env` 而非 `config.yaml`，避免用户贴 bug 报告时泄露明文密钥——安全性改进。([链接](https://github.com/NousResearch/hermes-agent/pull/131017))
- **#131011**：gateway 在 routed profile 中渲染引用附件占位符。([链接](https://github.com/NousResearch/hermes-agent/pull/131011))

整体看，项目在 revert 风暴后一天内完成了核心功能的设计重落和多个安全/质量修复，推进速度较快。

## 4. 社区热点

- **#97681**「Let Bots collaborate across gateways」（30 评论）：跨 gateway 机器人协作功能仍被 #106742（统一 gateway runtime）阻塞；Teknium 曾明确推迟 Desktop continuity，等待 Group Chat 在 main 稳定。这是社区最关注的路线图级需求。([链接](https://github.com/NousResearch/hermes-agent/issues/97681))
- **#127647**「Desktop idle resource burn」跟踪 issue（25 评论）：Desktop 空闲时 renderer CPU/GPU、backend serve CPU 和内存消耗问题正在系统化 triage，已有相关 PR 索引。用户对资源占用的不满持续发酵。([链接](https://github.com/NousResearch/hermes-agent/issues/127647))
- **#97065** Keet gateway setup 崩溃 `TypeError: _n()`（25 评论）：Windows 用户配 Keet 平台插件时的安装阻断问题，长期未解决。([链接](https://github.com/NousResearch/hermes-agent/issues/97065))
- **#18715**「远程 Agent + 本地工具执行」（21 评论，36 👍）：最多点赞的 feature 请求，诉求是模型运行在远程机器、工具执行留在本地工作机。([链接](https://github.com/NousResearch/hermes-agent/issues/18715))
- **#127665** Desktop 回复重复渲染（20 评论）：#127288 修复后又通过另一条 fold 路径复现，说明会话渲染层的状态管理存在系统性问题。([链接](https://github.com/NousResearch/hermes-agent/issues/127665))

## 5. Bug 与稳定性

**P1**

- **#122529** cron 外部 worker 缺少 venv site-packages（`ModuleNotFoundError: ruamel`），影响定时任务可靠性，尚无 fix PR。([链接](https://github.com/NousResearch/hermes-agent/issues/122529))
- **#130277**（已关闭）#127201 引入的 Origin 校验回归导致 Desktop 无法连接远程 gateway——已由 #130984 的新设计解决。([链接](https://github.com/NousResearch/hermes-agent/issues/130277))
- **#70445** Desktop 远程/VPS 会话加载慢、切走即取消、永久 spinner。仍 OPEN。([链接](https://github.com/NousResearch/hermes-agent/issues/70445))

**P2**

- **#127665 / #126091** 消息重复渲染/位置跳动（渲染层 WebSocket 重连后状态调和 bug）——同类症状多路径复现，#130996 可能部分缓解。([链接 1](https://github.com/NousResearch/hermes-agent/issues/127665) / [链接 2](https://github.com/NousResearch/hermes-agent/issues/126091))
- **#127313** 右键 zone menu 劫持 transcript 菜单，Copy 不可用（回归自 ad2d4822e1）——已有修复 PR **#129402** 待合并。([Issue](https://github.com/NousResearch/hermes-agent/issues/127313) / [PR](https://github.com/NousResearch/hermes-agent/pull/129402))
- **#96180 / #69889** `hermes update` 重建 venv 后丢弃可选依赖（python-telegram-bot）和用户 pip 包，导致 cron 投递静默失败。系统性安装/更新问题簇。([链接](https://github.com/NousResearch/hermes-agent/issues/96180))
- **#46082** Dashboard 内存泄漏涨至 5.2GB 被 OOM kill，长期未闭合。([链接](https://github.com/NousResearch/hermes-agent/issues/46082))
- **#99032** TUI 粘贴折叠占位符静默发给模型，无警告。([链接](https://github.com/NousResearch/hermes-agent/issues/99032))

**值得注意**：#125727 显示自动化的 Nous→Enterkey 合并因大量文件冲突被阻塞，提示上游集成分支可能存在维护压力。

## 6. 功能请求与路线图信号

- **#18715** 远程 Agent + 本地工具执行（36 👍）：结合 #131011（routed profile 附件渲染）等 PR 看，gateway 多 profile/远程路由能力正在增强，该需求有望逐步落地。([链接](https://github.com/NousResearch/hermes-agent/issues/18715))
- **#97681** 跨 gateway 机器人协作：明确依赖 #106742 统一 gateway runtime，属中期路线图项。([链接](https://github.com/NousResearch/hermes-agent/issues/97681))
- **#88741** delegate 子代理 opt-in 继承 SOUL.md 身份：PR 仍在活跃更新，与多代理/kanban swarm 方向契合，可能纳入下版本。([链接](https://github.com/NousResearch/hermes-agent/pull/88741))
- **#131012** 新增 Writ MCP server 到插件目录：目录生态持续扩张，审核流程正常运转。([链接](https://github.com/NousResearch/hermes-agent/pull/131012))
- Kanban 调度器系列 PR（@yoyodine-industries 的 #110305/#110340/#110654 等）系统性地解决多 board 预算饥饿、日志可观测性、阻塞语义问题，是当前最集中的工程投入方向，预计随 cron/kanban 主题一起发版。

## 7. 用户反馈摘要

- **Desktop 是体验痛点最集中的组件**：空闲资源消耗、消息重复渲染、远程后端会话加载慢、右键菜单回归，频繁出现在高评论 issue 中。
- **安装/更新路径脆弱是第二痛点**：venv 重建丢依赖、Hindsight 迁移死循环（#124471）、npm 漏洞修复失败（#79021/#94375）、Windows 便携部署缺官方指引（#46199，4 👍）。
- **消息平台用户（Telegram/Matrix/QQ）对投递静默失败敏感**：#96180、#71239 反映"表面在线但消息不投递"这类问题最难排查。
- **正面信号**：社区贡献质量高（如 kanban 系列 PR 均附详细根因分析）；维护者对回归响应迅速（YouTube embed 一天内完成 revert→重设计→重落）；对 a11y（#38072）和密钥安全（#131017）的主动关注体现工程成熟度。

## 8. 待处理积压

- **#18715**（5 月开启，36 👍，needs-decision）：最高票 feature，长期悬而未决，建议维护者给出明确路线图表态。([链接](https://github.com/NousResearch/hermes-agent/issues/18715))
- **#46082**（6 月开启）：Dashboard 内存泄漏至今无修复方案。([链接](https://github.com/NousResearch/hermes-agent/issues/46082))
- **#69889 / #96180**（7-8 月开启）：venv 重建破坏 cron/投递的系统性问题，涉及架构决策（依赖持久化策略）。([链接](https://github.com/NousResearch/hermes-agent/issues/69889))
- **#97065**（8 月底开启，25 评论）：Keet 集成崩溃，影响特定插件用户群的入门体验。([链接](https://github.com/NousResearch/hermes-agent/issues/97065))
- **#78637**：`hermes_cli/auth.py` 9180 行 god-file 分解，符合仓库政策但需排期。([链接](https://github.com/NousResearch/hermes-agent/issues/78637))
- **#79021**（4 👍）：npm 漏洞修复失败持续触发 doctor 告警，用户信任度受损。([链接](https://github.com/NousResearch/hermes-agent/issues/79021))

---
*数据来源：GitHub API 快照（过去 24 小时）。总体健康度：活跃度优秀（日均 1000 条 issue/PR 更新），但 Desktop 渲染层和安装更新路径的 bug 簇需要专项治理；revert-重落循环提示主干质量门禁仍有改进空间。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*