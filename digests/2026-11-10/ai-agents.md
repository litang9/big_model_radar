# OpenClaw 生态日报 2026-11-10

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-11-10 02:43 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-11-10

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时内 Issues 更新 500 条（新开/活跃 287，关闭 213），PR 更新 500 条（待合并 354，已合并/关闭 146），社区参与度处于非常高的水平。今日无新版本发布，但 PR 流水线上有大量处于"ready for maintainer look / waiting on maintainer"状态的修复与功能，表明下一个版本的内容正在密集孵化。社区核心维护者（@steipete、@Patrick-Erichsen 等）与机器人（roboclaw-bot、openclaw-mantis）均在持续产出。整体健康度良好，但 Windows 启动/更新可靠性、SQLite 会话状态和记忆系统（dreaming/memory-core）仍是集中的痛点领域。

## 2. 版本发布

今日无新版本发布。（近期版本线索：2026.11.5-beta.1 已含 SQLite header-probe 修复，但存在升级路径可达性问题，见下文。）

## 3. 项目进展

今日合并数据未细分，但从活跃/关闭的 PR 中可见以下方向取得实质推进：

- **openclaw-id 密钥安全体系**：@jalehman 密集提交三件套 — [PR #196138](https://github.com/openclaw/openclaw/pull/196138)（owner re-bind 仪式设计文档）、[PR #196380](https://github.com/openclaw/openclaw/pull/196380)（密钥丢失时停止静默铸造新密钥）、[PR #196388](https://github.com/openclaw/openclaw/pull/196388)（recovery kit 迁移 claw 到新密钥），安全边界能力显著增强。
- **模板/工作流体验**：[PR #196392](https://github.com/openclaw/openclaw/pull/196392)（模板验证前先建立持久 chat）、[PR #196395](https://github.com/openclaw/openclaw/pull/196395)（模板直接进入可编辑 pending chat），重构了 onboarding 流程。
- **Gateway 稳定性**：[PR #196399](https://github.com/openclaw/openclaw/pull/196399) 减少长会话压缩时的堆内存尖峰（关闭 #195361）；[PR #196401](https://github.com/openclaw/openclaw/pull/196401)（@steipete）修复遗留 exec-approvals 冲突导致的 Gateway 重启循环。
- **UI 性能与可访问性**：[PR #196333](https://github.com/openclaw/openclaw/pull/196333) 加速 Firefox 下 Ask OpenClaw 打开；[PR #196385](https://github.com/openclaw/openclaw/pull/196385) 缩短 warm chat reload 阻塞；[PR #195800](https://github.com/openclaw/openclaw/pull/195800) 修复 iOS VoiceOver 编辑器未命名问题。
- **长期 PR 持续演进**：[#145895](https://github.com/openclaw/openclaw/pull/145895)（CLAUDE_CONFIG_DIR 支持，今日完成上游 main 集成）、[#184206](https://github.com/openclaw/openclaw/pull/184206)（Codex 后台 exec 完成不再重放全部历史）。

整体看，今日进展集中在**安全（密钥/凭据）、内存与稳定性、模板 UX** 三条主线，为下一个版本积累了较多可合并内容。

## 4. 社区热点

- **[#170956](https://github.com/openclaw/openclaw/issues/170956)**（30 条评论，P0）— Windows 下网关启动慢、插件不干净关闭、schtasks 权限错误导致重启/更新极不可靠，直接影响 Windows 用户升级路径，是当前最热 issue。
- **[#150635](https://github.com/openclaw/openclaw/issues/150635)**（27 条评论）— 短期记忆 512 条上限下被回忆条目每晚被驱逐，dreaming deep phase 永远无法晋升，反映记忆子系统设计层面的诉求。
- **[#166634](https://github.com/openclaw/openclaw/issues/166634)**（27 条评论）— 崩溃恢复后 SQLite 会话回收 checkpoint 失败，agent 永久 UNAVAILABLE。
- **[#193962](https://github.com/openclaw/openclaw/issues/193962)**（24 条评论，已关闭）— "修复不可达"的经典死锁：2026.10.10 上 updater 自身 10s probe 超时，无法升级到含修复的 2026.11.5-beta.1。
- **[#164394](https://github.com/openclaw/openclaw/issues/164394)**（15 条评论，已关闭）— WebChat 滚动到历史中段时持续微抖动，UI 细节体验类问题关注度也较高。

## 5. Bug 与稳定性（按严重程度）

**P0 / 关键**

| Issue | 问题 | Fix 状态 |
|---|---|---|
| [#170956](https://github.com/openclaw/openclaw/issues/170956) | Windows 重启/更新不可靠（crash-loop、release blocker） | 无 fix PR，需维护者评审 |
| [#193962](https://github.com/openclaw/openclaw/issues/193962) | 更新器自锁，修复不可达（已关闭） | 修复在 2026.11.5-beta.1 |
| [#167506](https://github.com/openclaw/openclaw/issues/167506)（已关闭） | 已删除临时 handoff 数据库阻塞后续所有更新 | 已处理 |

**P1 / 高**

- [#191841](https://github.com/openclaw/openclaw/issues/191841) — **2026.10.10 回归**：glibc < 2.31（RHEL 8）上所有子进程/exec 失败。fix-shape-clear，暂无 fix PR。
- [#190307](https://github.com/openclaw/openclaw/issues/190307) — Gateway 重启后大量 agent 永久 degraded（admission timeout），35-agent 大规模部署场景。
- [#174895](https://github.com/openclaw/openclaw/issues/174895) — Windows 上短命 CLI 进程误判活 Gateway 锁文件为 stale 并回收，引发伪重启。
- [#144336](https://github.com/openclaw/openclaw/issues/144336) — SIGUSR1 延迟重启时 shutdown 步骤失败。
- [#157255](https://github.com/openclaw/openclaw/issues/157255) — lane 超时后 turn claim 未释放，会话卡死 90+ 分钟（message-loss）。
- [#166641](https://github.com/openclaw/openclaw/issues/166641) — web_fetch 冷回退在主线程同步捕获无关插件，造成 liveness 停顿（有 linked PR）。
- [#192959](https://github.com/openclaw/openclaw/issues/192959)（已关闭）— K8s fsGroup remount 后凭据目录被拒，Gateway 拒绝启动（安全评审中）。

**P2 / 中**

- [#182891](https://github.com/openclaw/openclaw/issues/182891) — 提示词缓存从未复用，成本直接受损，用户 👍 关注。
- [#166133](https://github.com/openclaw/openclaw/issues/166133) — MCP 整数参数被强制转字符串。
- [#176187](https://github.com/openclaw/openclaw/issues/176187) — vec0 稀疏分配导致 memory_search 超 30s deadline。
- [#173839](https://github.com/openclaw/openclaw/issues/173839) — CJK 重负载在压缩前被传输预检拒绝。

## 6. 功能请求与路线图信号

- **记忆系统重构信号强烈**：[#150635](https://github.com/openclaw/openclaw/issues/150635)、[#157827](https://github.com/openclaw/openclaw/issues/157827)、[#151173](https://github.com/openclaw/openclaw/issues/151173)、[#172547](https://github.com/openclaw/openclaw/issues/172547) 均指向 dreaming/短期记忆/晋升机制，多项已挂 linked PR，可能进入下一版本。
- **密钥安全**：openclaw-id 三 PR 系列（#196380/#196388/#196138）是清晰的路线图主线。
- **模板 onboarding**：#196392/#196395 属于同一设计包，明显是维护者主动推进的方向。
- **跨端体验对齐**：[#175826](https://github.com/openclaw/openclaw/issues/175826)（Android 对齐浏览器 in-chat 问答/审批）已有设计验收+后续 PR 规划。
- **运维可观测性**：[#165685](https://github.com/openclaw/openclaw/issues/165685)（机器可读 reason）、[#170562](https://github.com/openclaw/openclaw/issues/170562)（Doctor 定向恢复）反映运维工具链是持续投入方向。

## 7. 用户反馈摘要

- **Windows 用户痛点突出**：启动慢、schtasks 权限、锁文件误回收（#170956、#174895），升级/重启体验是最大不满来源。
- **升级路径焦虑**：多处反映"修复在最新 beta 但升不上去"（#193962、#167506），用户强烈希望更新器具备自愈能力。
- **成本敏感**：缓存不复用（#182891）在自建/兼容 API 用户中引发共鸣；模型 fallback 通知泄漏到外部渠道（#92473）被视为隐私/专业度问题。
- **大规模部署摩擦**：35 agent/多 agent 用户遇到 admission degraded、回收失败、K8s 凭据问题，说明生产化运维场景是重要用户群。
- **正面信号**：Review Markdown 预览（#128090，4 👍）、Android 对齐、可访问性修复等显示社区对产品细节体验有持续正向投入意愿。

## 8. 待处理积压（提醒维护者）

- **高优先级且标注 `needs-maintainer-review` 长期未动**：#170956（P0）、#144336（P1）、#190307（P1）、#191841（P1 回归）。
- **需要产品决策的堆积项**：#150635、#137613、#91931（P1，6 月开至今，bootstrap 误删用户文件/data-loss）、#128090。
- **长期挂起的安全敏感 PR**：[#145895](https://github.com/openclaw/openclaw/pull/145895)（9 月开，兼容性+安全边界双重风险标记，今日已完成集成）、[#184206](https://github.com/openclaw/openclaw/pull/184206)（10 月开，需安全评审）。
- **stale 化风险**：多个 P2/P3 issue（#166133、#137613、#92473）已打 stale 标签，若无人认领可能被自动关闭，建议维护者对数据丢失/消息丢失类问题豁免 stale。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析 — 2026-11-10

*（本报告基于 OpenClaw 与 Hermes Agent 两个项目当日社区动态）*

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**高速扩张后的架构收敛期**：两个头部项目均维持每日 500 条级别的 Issue/PR 更新量，社区参与度达到顶级开源项目水准。共同特征是“统一网关/常驻进程”架构落地后集中暴露会话状态、升级可靠性、审批安全等生产化痛点。插件/模板生态成为新的竞争主战场，第三方开发者参与踊跃。记忆系统（分层记忆、晋升机制）从功能请求上升为明确的路线图主线。总体判断：赛道已从“功能比拼”进入“可靠性 + 安全 + 生态运营”的综合竞争力阶段。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 287，关闭 213） | 500（新开/活跃 425，关闭 75） |
| PR 更新（24h） | 500（待合并 354，合并/关闭 146） | 500（待合并 427，合并/关闭 73） |
| Issue 关闭率 | 42.6% | 15.0% |
| PR 关闭率 | 29.2% | 14.6% |
| Release | 无（2026.11.5-beta.1 孵化中） | v0.23.1（11-09，打包 618 PR） |
| 健康度评估 | **良好偏优**：关闭率高、维护者评审节奏稳定，但 Windows 可靠性与升级自锁是硬伤 | **活跃但承压**：吞吐极高但积压严重（PR/Issue 待处理 425/427），处于统一网关回归收敛期 |

**关键洞察**：OpenClaw 的“关闭/合并”消化能力明显更强，反映更成熟的维护者评审体系；Hermes 以量取胜，迭代速度更快但质量收敛负担重。

## 3. OpenClaw 在生态中的定位

**优势**
- **安全工程深度领先**：openclaw-id 三件套（owner re-bind 仪式、停止静默铸造密钥、recovery kit 迁移）体现体系化的密钥生命周期设计，这在同类项目中罕见。
- **评审消化能力**：29% 的 PR 关闭率 + 核心维护者（@steipete 等）持续产出，形成稳定的版本节奏。
- **企业级运维信号**：35-agent 大规模部署、K8s、Doctor 定向恢复等诉求说明已有生产化用户群。

**技术路线差异**
- OpenClaw：Gateway 常驻 + SQLite 会话状态 + dreaming/memory-core 内建记忆，走**平台化一体化**路线。
- Hermes：统一网关刚合并（#106742），但记忆等能力依赖插件生态（recalllayer、honcho），走**核心轻量 + 插件繁荣**路线。

**社区规模**：两者日活跃量级相当（均触顶日报统计上限 500），但 OpenClaw 单 Issue 讨论深度更高（P0 issue 30 条评论级别），Hermes 的第三方贡献者数量更庞大。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **升级/自更新可靠性** | #193962（updater 自锁、修复不可达）、#170956 | #125437（半套安装无恢复路径） | 两者用户均强烈要求更新器自愈能力，这是生态性共性痛点 |
| **会话状态持久化** | #166634（SQLite checkpoint 失败致 agent UNAVAILABLE） | #143547（网关合并回归）、#139347、#126524 | 常驻进程架构下 SQLite/state.db 的崩溃恢复与一致性 |
| **审批/执行安全** | 密钥体系三 PR、#192959 K8s 凭据 | #141346（smart approval 致数据丢失）、#74078（kill 绕过守卫）、#151019 | 均在收紧 agent 执行权限边界，Hermes 有真实事故驱动 |
| **分层记忆系统** | #150635 等 4 个 issue 指向 dreaming 晋升机制 | recalllayer 插件、honcho 竞态 #47954 | 短期/长期记忆分层与晋升是明确行业共识方向 |
| **Windows 支持** | #170956、#174895 | #97065、#68128 | Windows 均为两项目的第二大痛点平台 |
| **上下文压缩/成本** | #182891（缓存不复用）、#173839 | #78645（6,789 行 compressor 待拆） | 压缩架构与 token 成本优化 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 安全密钥体系、模板 onboarding、跨端对齐（Android）、可观测性 | 多渠道桥接（Telegram/Discord/WhatsApp/Matrix）、Desktop 体验、插件目录 |
| 目标用户 | 开发者/生产部署用户（K8s、多 agent、CI） | 个人终端用户 + 本地模型（Ollama）用户群 |
| 技术架构 | 成熟 Gateway 常驻 + 内建记忆子系统 | 新统一网关 + 插件化 Memory Provider 接口 |
| 生态策略 | 模板/工作流 curated 分发 | 低门槛插件目录（今日 8+ 收录 PR），第三方驱动 |
| 短板 | Windows、updater 自锁、长期挂起安全 PR | 本地模型支持受损（#99943 上下文钳制、#87697 流取消）、安全积压 3.5 个月未修 |

## 6. 社区热度与成熟度

- **快速迭代阶段**：**Hermes Agent** — 新开 Issue 425 vs 关闭 75，PR 427 待合并，v0.23.x 高频发布，插件生态爆发式增长；但积压曲线陡峭，属典型的“速度换质量”阶段。
- **质量巩固阶段**：**OpenClaw** — 关闭率 42.6% 显著健康，今日无 Release 但 PR 流水线密集孵化下一版本，重心在安全加固与回归收敛（P0 仅 1 项无 fix）。
- 分层结论：两者日活相当，但 OpenClaw 工程治理成熟度更高，Hermes 生态动能与创新速度更强。

## 7. 值得关注的趋势信号

1. **“更新器可靠性”成为新的信任门槛**：两项目均有“修复不可达”死锁案例，agent 常驻自更新机制的自愈设计（rollback、双分区、探活超时豁免）将是下一轮基础设施竞争点。
2. **审批安全从配置项上升为产品核心**：Hermes 的数据丢失事故（#141346）表明 smart approval 的白名单粒度和 profile 级持久提权是行业级风险；OpenClaw 的密钥仪式设计预示“可审计的权限生命周期”会成为标配。
3. **记忆分层化是确定性方向**：短期缓冲 + 晋升机制 + Provider 抽象接口在两个独立社区同步涌现，建议 agent 开发者预留 memory provider 抽象层。
4. **插件目录是新的护城河**：Hermes 的爆发式收录（记忆、预算控制、真机操控、视觉回归）显示低门槛分发渠道能显著拉动第三方贡献。
5. **本地模型用户是被忽视的受损群体**：Hermes 的 Ollama 相关问题长期积压，提示面向本地/自托管场景的兼容性工程存在差异化机会。
6. **多渠道桥接（IM 矩阵）+ Desktop 端是个人助手的标准形态**：两端体验一致性与跨 tab 会话隔离是共性 UX 债务。

---

*数据来源：两项目 2026-11-10 社区动态日报；活跃量均触顶统计上限，实际规模可能更大，横向对比应以结构比例而非绝对值为准。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-11-10

---

## 1. 今日速览

项目处于**高活跃、快迭代**状态：过去 24 小时 Issues 更新 500 条（新开/活跃 425、关闭 75），PR 更新 500 条（待合并 427、合并/关闭 73），社区讨论热度与代码吞吐均维持顶级开源项目水准。昨日发布 **v0.23.1** 补丁版本，将 v0.23.0 以来约 618 个 PR 汇总为稳定发布。生态方面，插件目录（plugin-catalog）成为最显著的增量来源，今日新增多个记忆、写作、手机操控类插件收录 PR。焦点风险集中在统一网关（#106742 合并后）引发的会话/会话状态类回归问题。

---

## 2. 版本发布

### v0.23.1（2026-11-09）
- **性质**：补丁版本（Patch release）
- **内容**：将 v0.23.0 以来约 **618 个已合并 PR** 滚动打包为稳定发布，覆盖 GitHub Release（CLI 与安装器）、Microsoft Store 应用、Docker 及 Hermes Cloud。
- **完整 curated 说明**：随 v0.24.0 发布
- **破坏性变更**：无明确说明，补丁版本定位为稳定性汇总；完整变更日志需等 v0.24.0
- **链接**：https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.1

---

## 3. 项目进展

今日 PR 流以**修复类 + 插件生态扩张**为主线：

**核心修复（进行中/已合并）**
- [#151019](https://github.com/NousResearch/hermes-agent/pull/151019)：**安全修复** — 设置 `allow_admin_from` 后，非管理员无法再通过输入 "always" 或点击 Allow 按钮绕过权限回答审批（覆盖 Telegram/Discord/Slack/Matrix/WhatsApp 等全平台），且该绕过原本会写入 profile 级 allowlist 造成持久提权
- [#151797](https://github.com/NousResearch/hermes-agent/pull/151797)：Telegram 媒体上传等待机制重做，修复"文件已送达却报告超时失败"的问题
- [#141949](https://github.com/NousResearch/hermes-agent/pull/141949)：state.db 损坏页新增 sqlite3 `.recover` 最后兜底修复策略
- [#141943](https://github.com/NousResearch/hermes-agent/pull/141943)：config.yaml 未变更时复用严格解析结果，解决工具钩子高频读盘性能问题
- [#152241](https://github.com/NousResearch/hermes-agent/pull/152241)：修复 Desktop 中远程 backend 覆盖本地 session wire 导致图片粘贴报 "session not found"

**功能/生态**
- [#152383](https://github.com/NousResearch/hermes-agent/pull/152383)：Draftroom Markdown 写作伴侣
- [#152381](https://github.com/NousResearch/hermes-agent/pull/152381)：Desktop 内联子代理活动视图与实时 fallback 模型展示
- [#152355](https://github.com/NousResearch/hermes-agent/pull/152355)、[#152379](https://github.com/NousResearch/hermes-agent/pull/152379)：recalllayer 分层记忆 Provider、hermes-phone-use（操控真机 iPhone/Android）等目录收录

整体判断：项目在统一网关架构落地后的**收敛加固期**，安全与状态管理修复优先级明显提升。

---

## 4. 社区热点

| 议题 | 热度 | 诉求分析 |
|---|---|---|
| [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 统一网关合并后问题追踪（60 评论） | 🔥🔥🔥 | #106742 将所有本地会话并入单一网关进程，波及 CLI/Desktop/Telegram/Discord/cron 等全组件，是当前最大的回归集中地，社区持续追加复现案例 |
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) 无法通过 API 创建 PR（60 评论） | 🔥🔥🔥 | 贡献者账户级权限问题，标记 blocked/upstream，影响外部贡献链路 |
| [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) Smart 审批自动放行 osascript 致用户 PowerPoint 数据不可恢复丢失（38 评论） | 🔥🔥 | **安全类高敏**：smart approval 模式自动批准了驱动用户运行中 PowerPoint 的命令并删除导出文件，引发对审批白名单粒度的强烈质疑 |
| [#97065](https://github.com/NousResearch/hermes-agent/issues/97065) Keet 网关 setup 崩溃（27 评论） | 🔥 | Windows 用户安装路径受阻 |
| [#78645](https://github.com/NousResearch/hermes-agent/issues/78645) / [#78642](https://github.com/NousResearch/hermes-agent/issues/78642) god-file 拆分（26/17 评论） | 🔥 | 6,789 行 `context_compressor.py` 与 7,230 行 `mcp_tool.py` 待拆，社区对架构治理的持续关注 |

---

## 5. Bug 与稳定性（按严重度）

**P1 / 高危**
- [#125437](https://github.com/NousResearch/hermes-agent/issues/125437)：更新失败留下半套安装且无产品内恢复路径，一周 15 个 Discord 求助帖，修复全靠手敲命令 — 暂无 fix PR
- [#122529](https://github.com/NousResearch/hermes-agent/issues/122529)：cron 外部 worker 缺 venv site-packages 导致 `ModuleNotFoundError` — 暂无 fix PR
- [#141346](https://github.com/NousResearch/hermes-agent/issues/141346)：安全审批绕过致数据丢失 — 相关守卫改进见 [#151019](https://github.com/NousResearch/hermes-agent/pull/151019)（部分缓解）
- [#74078](https://github.com/NousResearch/hermes-agent/issues/74078)：`kill <PID>` 绕过自终止守卫 + execute_code 前缀匹配绕过 — **安全，仍未修复**

**P2 / 重要**
- [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) 统一网关回归系列 — 追踪中
- [#136486](https://github.com/NousResearch/hermes-agent/issues/136486)：`reasoning` 别名字段重放触发 HTTP 400，字段拒绝学习从不生效，每轮回退
- [#99943](https://github.com/NousResearch/hermes-agent/issues/99943)：云服务商上下文窗口被 `ollama_num_ctx` 钳制，1M 静默降为 65,536
- [#139347](https://github.com/NousResearch/hermes-agent/issues/139347)：托管房间 bounded transcript 驱逐仍被 settlement 引用的用户，触发校验异常
- [#143720](https://github.com/NousResearch/hermes-agent/issues/143720)：Discord 线程完成唤醒 `admission_conflict` 每 60s 无限重试，尝试上限失效
- [#126524](https://github.com/NousResearch/hermes-agent/issues/126524)：Desktop 助手回复渲染两次 + 会话列表双重渲染

**P3 / 一般**
- [#123926](https://github.com/NousResearch/hermes-agent/issues/123926)：启动时随机插件静默加载失败（sys.modules 迭代中变更）
- [#141988](https://github.com/NousResearch/hermes-agent/issues/141988)：`process_manage` 分页 TypeError（**有对应修复方向，暂无关联 PR**）

---

## 6. 功能请求与路线图信号

- **插件目录持续膨胀**：今日 8+ 个 catalog 收录 PR（[recalllayer 记忆](https://github.com/NousResearch/hermes-agent/pull/152355)、[hermes-phone-use](https://github.com/NousResearch/hermes-agent/pull/152379)、[visual-oracle 视觉回归](https://github.com/NousResearch/hermes-agent/pull/151981)、[budget-leash 预算控制](https://github.com/NousResearch/hermes-agent/pull/149268)、[grok-bot-twin](https://github.com/NousResearch/hermes-agent/pull/152223) 等）——生态繁荣是下版本重点方向
- **Desktop 体验深化**：[#152381](https://github.com/NousResearch/hermes-agent/pull/152381) 内联子代理活动视图，与 #126524/#70445 等 Desktop 痛点呼应
- **架构治理**：god-file 拆分（#78645/#78642）与 Webhook Feature Package（[#84834](https://github.com/NousResearch/hermes-agent/issues/84834)）为 graph-gated 长期工程，预计分散在 v0.24.x 落地
- **记忆系统**：honcho 竞态（#47954）+ recalllayer 等记忆插件涌现，Memory Provider 接口层可能成为下版本演进重点

---

## 7. 用户反馈摘要

**不满意（高频痛点）**
1. **升级体验差**：更新失败半套安装 + 无恢复 UI（#125437），macOS 每次更新后 keychain 重复弹窗（[#91115](https://github.com/NousResearch/hermes-agent/issues/91115)）
2. **本地模型支持受损**：Ollama 流 ~1.5s 被客户端取消（#87697）、上下文窗口被错误钳制（#99943）——本地模型用户群体不满集中
3. **会话状态可靠性**：Desktop 双重渲染、跨 tab 会话串扰、远程后端加载缓慢（#126524/#62726/#70445）
4. **审批安全感不足**：#141346 数据丢失事件后，用户对 smart approval 默认策略信任下降

**满意/认可**
- 统一网关架构方向获认可，社区积极提交复现帮助收敛（#143547 60 评论多为建设性）
- 插件目录门槛低、收录快，第三方开发者参与踊跃

---

## 8. 待处理积压（提醒维护者关注）

| Issue | 开放时长 | 风险 | 建议 |
|---|---|---|---|
| [#62726](https://github.com/NousResearch/hermes-agent/issues/62726) Dashboard 跨 tab 会话串扰 + /new 挂死 | ~4 个月 | 会话状态 | 需要专门回归修复 |
| [#70445](https://github.com/NousResearch/hermes-agent/issues/70445) 远程/VPS 会话加载不可靠 | ~3.5 个月 | 用户体验 | 标记 awaiting-reporter 良久，建议主动收敛 |
| [#74078](https://github.com/NousResearch/hermes-agent/issues/74078) 审批守卫绕过（安全） | ~3.5 个月 | **安全** | 应优先处理，与 #151019 同属审批面 |
| [#45983](https://github.com/NousResearch/hermes-agent/issues/45983) 重技能 profile 卡死循环 | ~5 个月 | 稳定性 | 与压缩器重构（#78645）联动 |
| [#68128](https://github.com/NousResearch/hermes-agent/issues/68128) WhatsApp 桥接 WinError 5 | ~4 个月 | Windows 平台 | 文档化的 fallback 未实现 |
| [#131859](https://github.com/NousResearch/hermes-agent/issues/131859) API 无法创建 PR | 1 个月+ | 贡献链路 | blocked/upstream，建议升级至 GitHub 支持 |

**健康度小结**：吞吐与社区参与度优秀，但统一网关后的回归收敛、安装/更新可靠性、审批安全三条线需在 v0.24.0 前重点投入。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*