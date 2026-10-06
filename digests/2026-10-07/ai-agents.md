# OpenClaw 生态日报 2026-10-07

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-10-06 23:47 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-10-07

## 1. 今日速览

过去 24 小时 OpenClaw 保持极高活跃度：Issues 更新 500 条（新开/活跃 433，关闭 67），PR 更新 500 条（待合并 354，已合并/关闭 146），无新版本发布。社区注意力仍高度集中在 **2026.9.5 引入的 Gateway 启动性能/内存回归**和**自动更新链路（`openclaw update`）大面积失败**两大主题上，多条 P0 级 issue 仍在排队等待维护者决策。与此同时，社区修复贡献管线非常健康，今日出现多个针对最新高优 bug 的高质量 fix PR（含 P1），显示出较强的自愈能力。整体判断：**项目活跃度优秀，但 9.5/9.6 系列的稳定性债务正在累积，版本质量风险偏高**。

## 2. 版本发布

今日无新 Release。值得注意的是，多个 issue 中提到 2026.9.7（c074824）已在用户侧流通，但官方未发布正式版本说明，且 [#166348](https://github.com/openclaw/openclaw/pull/166348) 提到 "2026.9.9 backport" 存在 fixture 回归需要修复，提示近期版本迭代频繁、发布节奏可能承压。

## 3. 项目进展

今日合并/关闭 PR 中值得关注的推进：

- **[#166329](https://github.com/openclaw/openclaw/pull/166329)（已关闭）** `fix(memory-wiki): stop long searches on deadline or turn cancellation` — 为 `wiki_search` 增加 30 秒截止时间并尊重 turn 取消，修复大 vault 扫描卡死 agent turn 的问题（P1）。
- **[#153545](https://github.com/openclaw/openclaw/pull/153545)（已关闭）** `fix: preserve Claude CLI replies after long streamed turns` — 修复长流式 turn 后最终回复丢失（关联高热度 [#150132](https://github.com/openclaw/openclaw/issues/150132)），后续由更完整的 [#166127](https://github.com/openclaw/openclaw/pull/166127) 接棒（待合并，P1）。
- **[#165334](https://github.com/openclaw/openclaw/pull/165334)（已关闭）** 回退 Slack/Discord 的 session return 按钮 — 产品层面的快速纠偏。
- **[#154475](https://github.com/openclaw/openclaw/pull/154475)** CI 增量 typecheck 预热机制持续推进，Linux 端节省 88% 核心类型检查时间，工程效率投资明显。

大型重构仍在评审中：[#164265](https://github.com/openclaw/openclaw/pull/164265)（heartbeat 退化为普通 jobs，XL，涉及几乎全部 channel/app 模块）和 [#161057](https://github.com/openclaw/openclaw/pull/161057)（Skill Workshop 改为直接版本化自学习循环，XL）。整体而言，**单日 146 个 PR 合并/关闭显示主干推进速度快**，但 XL 级安全敏感重构堆积在待评审队列中。

## 4. 社区热点

**最活跃 Issues：**

1. [#44925](https://github.com/openclaw/openclaw/issues/44925)（31 评论，P1，🦞 diamond lobster）— Subagent 完成结果静默丢失，无重试、无通知、超时不自愈。该 issue 自 3 月存活至今，是 Telegram 多 agent 用户的核心痛点，标签显示需要产品决策。
2. [#149538](https://github.com/openclaw/openclaw/issues/149538)（24 评论，P0）— main 分支 632-agent 集群下 Gateway ready 后事件循环饥饿、`/health` 全部超时、RSS 持续上涨直至 OOM。企业/大规模部署场景的可用性警报。
3. [#159662](https://github.com/openclaw/openclaw/issues/159662)（20 评论，P0）— `prepared-model-catalog.worker.js` 无界内存泄漏，4-5 GB/小时，与负载和 provider 无关，冷重启 + provider bisect 已复现。
4. [#97616](https://github.com/openclaw/openclaw/issues/97616)（18 评论，P1）— hook/tool 子进程僵尸堆积导致运行时退化。
5. [#164923](https://github.com/openclaw/openclaw/issues/164923)（14 评论）— 单 workspace 短期记忆提升 0/512 而兄弟 workspace 50-90%，原始对话片段被结构性拒绝，暴露 memory promote 管道的确定性问题。

**诉求分析**：热点集中在三类场景——(a) 长时间自主运行下的资源泄漏与进程治理；(b) subagent/多 agent 编排的可靠性（结果丢失、权限绑定错误）；(c) memory 系统的可解释性。标签 `clawsweeper:no-new-fix-pr` 大量出现，说明自动分诊机器人已标记但人工修复跟不上。

## 5. Bug 与稳定性（按严重程度）

**P0 / 高危：**

| Issue | 问题 | Fix 状态 |
|---|---|---|
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | main 分支 Gateway 事件循环饥饿 + OOM（大规模集群） | 无 fix PR |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | 模型目录 worker 内存泄漏 4-5 GB/h | 无 fix PR |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) | 启动挂起约 17 分钟，模型 runtime 发布超时 | 无 fix PR（`no-new-fix-pr`） |
| [#155859](https://github.com/openclaw/openclaw/issues/155859) | 启动时间随插件数线性放大 | 相关 [#160485](https://github.com/openclaw/openclaw/issues/160485) 在跟踪插件编译热点 |
| [#152965](https://github.com/openclaw/openclaw/issues/152965) | 非渠道插件热重载会销毁全部渠道插件，切断活跃流并丢消息 | 无 fix PR |
| [#152804](https://github.com/openclaw/openclaw/issues/152804) | 2026.9.5 升级后 minimax-portal 模型目录丢失 | 无 fix PR（manual-only） |
| [#156986](https://github.com/openclaw/openclaw/issues/156986) / [#152992](https://github.com/openclaw/openclaw/issues/152992) / [#154114](https://github.com/openclaw/openclaw/issues/154114) / [#153094](https://github.com/openclaw/openclaw/issues/153094) / [#153769](https://github.com/openclaw/openclaw/issues/153769) | `openclaw update` 多种失败模式（挂起、Windows 路径 EINVAL、候选演练失败等），大量用户被锁在旧版本 | 无统一 fix PR |

**P1 / 安全相关：**

- [#157126](https://github.com/openclaw/openclaw/issues/157126)（🦞 diamond lobster，needs-security-review）— claude-cli MCP bridge 继承首次启动时的请求作用域，restart-recovery 后 owner 权限扩散为 operator.admin，**安全敏感**，已有 linked PR。
- [#162119](https://github.com/openclaw/openclaw/issues/162119) — Codex 模型切换后间歇性 403 owner 校验失败。
- [#166137](https://github.com/openclaw/openclaw/issues/166137)（今日新开）— egress proxy 凭据替换间歇性失效，未脱敏凭据可能直连上游 API（401 可见），安全风险，需重点关注。
- [#157989](https://github.com/openclaw/openclaw/issues/157989) — 每次 CLI 命令重写 1.1-1.4 GB、每次 Gateway 启动 6.5 GB 插件源文件，SSD 磨损问题，无 fix PR。
- [#166340](https://github.com/openclaw/openclaw/pull/166340)（今日新 PR，P1）— 修复已完成的会话在 Gateway 重启后复活并发送未经请求的回复，**已待维护者评审**。
- [#166346](https://github.com/openclaw/openclaw/pull/166346)（今日新 PR，P1）— 修复 restart-recovery 通知替代真实回复。

**正面信号**：今日多个高优 bug 当天即出现对应 fix PR（#166340、#166346、#166127、#166331、#166255），且 QNAP/ZFS 的 RENAME_NOREPLACE 问题 [#165617](https://github.com/openclaw/openclaw/issues/165617) 已在一天内由 [#166255](https://github.com/openclaw/openclaw/pull/166255) 跟进。

## 6. 功能请求与路线图信号

- [#56349](https://github.com/openclaw/openclaw/issues/56349)（7 评论）— **不可绕过的出站消息强制校验边界（pre-send guarantee）**，安全主题反复出现（另见 #166137），结合安全敏感 PR 的活跃度，出站策略统一很可能是近期路线图重点。
- [#23451](https://github.com/openclaw/openclaw/issues/23451) — 工具执行前的风险分级确认门控，长期高票需求。
- [#161057](https://github.com/openclaw/openclaw/pull/161057)（XL 重构评审中）— Skill Workshop 自学习循环重做，落地后将成为差异化能力。
- [#164265](https://github.com/openclaw/openclaw/pull/164265) — heartbeat 退化为普通 jobs，已被维护者批准设计，合并后简化 Automations 架构。
- [#153915](https://github.com/openclaw/openclaw/pull/153915) — vercel-ai-gateway 的 DecisionProviderV1 支持，扩展评估模型接入面。
- [#112349](https://github.com/openclaw/openclaw/issues/112349) — memory dreaming 深度提升阶段忽略阈值配置，与 #164923 一起指向 memory promote 管道亟需一次系统性梳理。

## 7. 用户反馈摘要

- **痛点集中在 2026.9.5 升级**：大量用户反馈升级后启动变慢、更新失败、模型目录丢失，被迫滞留在旧版本（#152747、#154114、#156986 等交叉引用密集）。
- **自主长任务的可靠性焦虑**：多个用户描述“agent 干完了所有工作（commit、部署）但最终回复被丢弃”（#150132、#157647），这类“无声失败”对信任伤害最大。
- **NAS/家庭实验室场景受重视**：QNAP/ZFS、WSL2、Windows 长路径等环境的边缘兼容问题持续产生报告，说明个人自托管用户是核心群体。
- **满意度信号**：issue 报告质量普遍很高（带 bisect、profiler 证据），用户投入度高；`clawsweeper` 自动分诊与 issue rating 体系运转良好，被社区接受。
- **不满点**：`no-new-fix-pr` + `needs-maintainer-review` 标签组合大量堆积（如 #44925 挂了近 7 个月），维护者响应带宽是当前最明显的瓶颈。

## 8. 待处理积压（请维护者关注）

1. [#44925](https://github.com/openclaw/openclaw/issues/44925) — 2026-03 开启，31 评论，subagent 结果静默丢失，已标记 needs-product-decision **约半年无实质推进**。
2. [#149538](https://github.com/openclaw/openclaw/issues/149538) / [#159662](https://github.com/openclaw/openclaw/issues/159662) — 两个 P0 main 分支内存/事件循环问题，均无 fix PR，影响大规模部署采用。
3. [#56349](https://github.com/openclaw/openclaw/issues/56349) / [#23451](https://github.com/openclaw/openclaw/issues/23451) — 3 月开启的安全类功能请求，多标签待决策。
4. [#97616](https://github.com/openclaw/openclaw/issues/97616) — 6 月开启的僵尸进程泄漏，P1，`clawsweeper-recovery-stuck` 标签显示已卡住。
5. [#126950](https://github.com/openclaw/openclaw/issues/126950) / [#47002](https://github.com/openclaw/openclaw/issues/47002) — 3 月开启的 Telegram 回调/配置校验问题，虽有 linked PR 但长期未合并。
6. PR 积压：[#86793](https://github.com/openclaw/openclaw/pull/86793)（5 月）、[#84853](https://github.com/openclaw/openclaw/pull/84853)（5 月）、[#87434](https://github.com/openclaw/openclaw/pull/87434)（5 月）均处于 waiting-on-author 状态超过 4 个月，建议批量清理或催办。

---

**健康度总评**：活跃度 ⭐⭐⭐⭐⭐｜修复响应速度 ⭐⭐⭐⭐（当日 bug 当日 PR）｜维护者决策带宽 ⭐⭐｜版本质量（9.5/9.6 系列）⭐⭐。当前最紧迫的事项是解决 `openclaw update` 失败链路，让用户能够升级到包含修复的版本——否则新修复无法触达受影响用户。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**数据日期：2026-10-07 ｜ 对比对象：OpenClaw、Hermes Agent**

---

## 1. 生态全景

个人 AI 助手/自主智能体赛道已进入**高频迭代与稳定性债务并存**的阶段：两个头部项目单日 Issues/PR 更新均触及 500 条上限，工程吞吐极高。共同痛点高度趋同——**安装/更新链路可靠性**成为第一大用户流失风险，**记忆系统**（promote 管道、token 成本、依赖管理）成为第二大战场。自托管/NAS/多平台（Telegram/Discord）重度用户构成核心群体，报告质量（bisect、profiler 证据）显示社区专业度成熟。安全议题（出站凭据泄露、权限扩散）在两个项目中同步升温，可能成为下一轮路线图竞争焦点。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新 | 500（新开/活跃 433，关闭 67） | 500（新开/活跃 165，关闭 335） |
| PR 更新 | 500（待合并 354，合并/关闭 146） | 500（待合并 292，合并/关闭 208） |
| Release | 无（9.7/9.9 已在流通，发布说明缺位） | 无（最近 v0.21.0） |
| P0 问题 | 7+ 个（Gateway OOM、内存泄漏、update 失败链） | 更新半安装状态（P1 为主，P0 修复在途） |
| 修复响应 | ⭐⭐⭐⭐ 当日 bug 当日 PR | ⭐⭐⭐⭐ P0 数据安全修复迅速 |
| 维护决策带宽 | ⭐⭐（P0 无 fix PR、issue 挂 7 个月） | ⭐⭐⭐⭐（关闭数 2 倍于新开，积压消化中） |
| 版本质量 | ⭐⭐（9.5/9.6 系列回归密集） | ⭐⭐⭐（v0.21.0 有上下文窗口回归） |
| **净态势** | **输入 > 输出，债务累积** | **输出 > 输入，健康收敛** |

## 3. OpenClaw 在生态中的定位

- **规模与热度领先**：新开 issue（433 vs 165）和评论热度更高，用户基数与社区能量最大。
- **技术路线更“重”**：面向大规模部署（632-agent 集群、Gateway、多渠道 channel 插件、Automations/heartbeat、Skill Workshop 自学习循环），是唯一覆盖企业级多 agent 编排场景的项目。
- **核心优势**：社区自愈能力强（当日高优 bug 当日出 fix PR）、自动化分诊体系（clawsweeper）、工程效率投资（增量 typecheck 节省 88%）。
- **核心短板**：9.5/9.6 引入的启动性能/内存回归 + `openclaw update` 多模式失败形成**恶性循环**——用户被锁旧版本，新修复无法触达。相比之下 Hermes 的更新问题虽痛，但尚有 Discord 手工恢复路径且修复管线（#128305）在途。

## 4. 共同关注的技术方向

| 方向 | OpenClaw 证据 | Hermes 证据 |
|---|---|---|
| **安装/更新可靠性** | #156986/#152992/#154114 等 update 失败簇；#152981 启动挂起 | #125437 半安装状态（15 个 Discord 线程）；PR #128305 更新器身份标识 |
| **长会话上下文与成本** | #164923 memory promote 0/512；#112349 dreaming 阈值 | PR #133625 压缩器 warm handoff 复用 prompt 缓存；#111205 单轮 98k token 重复注入 |
| **Windows/边缘环境兼容** | WSL2 长路径、QNAP/ZFS（#165617） | #130430 260 字符路径限制 |
| **多渠道（Telegram/Discord）配置语义** | #165334 Slack/Discord 纠偏；#126950 Telegram 回调 | #26058 Discord auto_thread 语义 |
| **安全边界** | #157126 权限扩散、#166137 凭据未脱敏、#56349 出站强制校验 | 免费层合规 butterbar（#134083） |
| **本地模型一等公民** | provider bisect 相关 | LM Studio 管理（#61606）、#99943 云/本地配置边界 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 产品形态 | Gateway 集群 + 多渠道插件 + Subagent 编排 | 桌面端 + TUI + CLI 为主的个人助手 |
| 目标用户 | 自托管极客 → 企业大规模部署（光谱两端） | 桌面端个人用户、免费/付费分层 |
| 架构复杂度 | 高（插件系统、渠道、heartbeat、Skill Workshop） | 中（provider 插件化、沙箱渲染器） |
| 当前战略重心 | 偿还 9.5/9.6 稳定性债务、XL 级重构评审 | 桌面新用户引导（#134209 十余组件）、版本发布准备 |
| 记忆技术 | memory promote/dreaming 管道（自研） | Hindsight/Honcho/mem0 生态集成 |

## 6. 社区热度与成熟度

- **快速迭代期**：OpenClaw——9.5→9.9 一个多月内多个版本流通，回归密集，发布节奏明显承压；Hermes 桌面端新用户体验线密集推进，疑似冲刺下一版本。
- **质量巩固期（局部）**：Hermes 后端/基础设施（CI 加固、积压清理，关闭 335 vs 新开 165）；OpenClaw 的工程效率投资（增量 CI）。
- **风险分层**：OpenClaw 处于“高速增长 + 债务累积”的高风险高回报象限；Hermes 处于“稳定收敛 + 特性扩张”的均衡象限，但 3 个超月度在途 PR（#61151/#61606/#83689）有冲突腐烂风险。

## 7. 值得关注的趋势信号

1. **更新链路即生命线**：两个项目最大痛感均非功能缺失，而是“修复无法触达用户”。对开发者的启示：为 agent 类长驻软件设计**产品内自愈/回滚路径**应视为 P0 基础设施。
2. **长会话 token 经济学成为核心竞争力**：warm handoff、压缩器、memory promote 质量直接决定用户留存；静默降级（如 #99943 上下文 1M→65k）比显式报错更伤信任。
3. **安全从“权限模型”走向“运行时边界”**：出站消息强制校验、凭据脱敏、权限作用域继承——agent 自主性越强，pre-send/pre-exec guarantee 类需求越刚性。
4. **“无声失败”是自主 agent 的信任杀手**：subagent 结果静默丢失（#44925）、流式回复丢失（#150132）证明用户能容忍失败，不能容忍不可观测的失败。可观测性与通知兜底应内建于编排层。
5. **本地/混合模型部署持续升温**：LM Studio、Ollama、per-task provider pinning 需求明确，本地模型一等公民是差异化窗口。
6. **自动分诊机器人（clawsweeper）被社区接受**，但“自动标记 + 人工修复跟不上”暴露了规模化维护的新瓶颈——AI 辅助维护本身也需要闭环设计。

**一句话结论**：OpenClaw 赢在规模与雄心、输在版本质量与决策带宽；Hermes 输在热度、赢在工程纪律。前者最紧迫任务是打通 update 链路让修复触达用户，后者是收敛长尾在途 PR 并修复 v0.21.0 回归。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报 — 2026-10-07

## 1. 今日速览

Hermes Agent 今日保持高度活跃：过去 24 小时内 Issues 更新 500 条（新开/活跃 165，关闭 335），PR 更新 500 条（待合并 292，已合并/关闭 208）。关闭数远超新开数，表明维护团队在持续高效消化积压，社区处于“高输入、高吞吐”的健康状态。今日无新版本发布，但从 PR 动态看，多个面向桌面端新用户体验（首次运行引导、免费层合规提示）和稳定性修复（P0 级 scratch 修剪救援、Windows 长路径）的工作正在密集推进，疑似在为下一个版本做准备。

## 2. 版本发布

今日无新版本发布。最近可考的版本为 v0.21.0（多个 Issue 引用了其中引入的压缩器窗口钳制行为，如 [#99943](https://github.com/NousResearch/hermes-agent/issues/99943)）。

## 3. 项目进展

今日合并/关闭的重要 PR（体现的推进方向）：

**桌面端新用户体验线（活跃开发中）**
- [#134083](https://github.com/NousResearch/hermes-agent/pull/134083)（已关闭/完成）：免费层用户 Terms and Privacy butterbar——首个 butterbar 组件消费者，为免费层合规铺路。
- [#134215](https://github.com/NousResearch/hermes-agent/pull/134215)（已关闭/完成）：免费层条款提示 + 老用户跳过首次引导，与 #134209 堆叠。
- [#134209](https://github.com/NousResearch/hermes-agent/pull/134209)（待合并）：首运行设置对话，桌面端新用户引导的完整重构，横跨 10+ 组件标签，是当前最大的在途特性之一。

**稳定性与安装/更新**
- [#134173](https://github.com/NousResearch/hermes-agent/pull/134173)（P0）：修复 scratch 修剪过程中删除用户正在写入文件的数据丢失级 Bug，删除前二次校验候选列表。
- [#128305](https://github.com/NousResearch/hermes-agent/pull/128305)（P0）：更新器请求携带统一身份标识，缓解 WAF 拦截导致的更新失败。
- [#134165](https://github.com/NousResearch/hermes-agent/pull/134165)（已关闭）：修复测试失败后遗留排水网关进程的问题。
- [#130430](https://github.com/NousResearch/hermes-agent/pull/130430)：Windows 260 字符路径限制下 PM 不再失败。

**性能与体验**
- [#133625](https://github.com/NousResearch/hermes-agent/pull/133625)：压缩器"warm handoff"（off/on/auto），摘要复用主模型 prompt 缓存，有望显著降低长会话 token 成本——值得关注的技术亮点。
- [#134241](https://github.com/NousResearch/hermes-agent/pull/134241)：Gemini 采样与 thinking 参数迁移修正，移除显式 temperature 和 thinkingBudget:0。
- [#134237](https://github.com/NousResearch/hermes-agent/pull/134237)：`hermes_cli.config` 导入不再连带加载 40 个 provider 插件，显著降低启动开销。

整体评估：项目在安装/更新可靠性（Windows、更新器）、桌面新用户体验两条主线上明显加速，单日 200+ PR 关闭/合并显示工程吞吐量很强。

## 4. 社区热点

**评论最多的 Issues：**
- [#125727](https://github.com/NousResearch/hermes-agent/issues/125727)（28 评论）：Nous→Enterkey 自动合并集成被冲突阻塞，涉及 agent 核心十余个文件。自动化上游同步受阻，反映跨仓库集成维护成本高，社区高度关注合并策略。
- [#40239](https://github.com/NousResearch/hermes-agent/issues/40239)（16 评论，已关闭）：桌面端 pt-BR 完整支持。后端/TUI 已有 357+ 行翻译，用户诉求是桌面端对齐——已得到处理，体现 i18n 需求旺盛。
- [#20859](https://github.com/NousResearch/hermes-agent/issues/20859)（16 评论，👍29）：Mistral 作为原生 LLM provider。最高 👍 的 feature 请求之一，用户指出 Mistral 用户基数大于部分已支持 provider 且语音模型已集成，呼声强烈但仍标记 needs-decision。
- [#122609](https://github.com/NousResearch/hermes-agent/issues/122609)（15 评论）：Skills 索引过期（28.1h > 26h 限制），影响 /docs/skills 可用性，自动化 watchdog 报告。
- [#26058](https://github.com/NousResearch/hermes-agent/issues/26058)（13 评论）：Discord `free_response_channels` 中 `auto_thread` 被整体禁用，破坏合法用例，配置语义设计引发讨论。

## 5. Bug 与稳定性（按严重度）

| 严重度 | Issue | 状态/修复进展 |
|---|---|---|
| **P1** | [#125437](https://github.com/NousResearch/hermes-agent/issues/125437) 更新失败留下半安装状态，无产品内恢复路径（本周 15 个 Discord 线程） | OPEN，有相关 PR #128305/#83689 在途 |
| **P1**（已关闭） | [#111761](https://github.com/NousResearch/hermes-agent/issues/111761) DeepSeek reasoning-only 停止时推理内容被提升为可见内容并污染历史 | 已关闭 |
| **P2** | [#58226](https://github.com/NousResearch/hermes-agent/issues/58226) Anthropic OAuth 用量 ≤1% 被错误渲染为 100% 用尽 | OPEN，无 fix PR |
| **P2** | [#99943](https://github.com/NousResearch/hermes-agent/issues/99943) 云端 provider 上下文窗口被 ollama_num_ctx 钳制，1M 静默缩至 65,536（v0.21.0 回归） | OPEN，无 fix PR |
| **P2** | [#118326](https://github.com/NousResearch/hermes-agent/issues/118326) macOS 睡眠/唤醒导致 psutil 指纹漂移，kanban 活 worker claim 被误释放 | OPEN；相关 PR [#133750](https://github.com/NousResearch/hermes-agent/pull/133750) 处理同类 PID 回收问题 |
| **P2** | [#131055](https://github.com/NousResearch/hermes-agent/issues/131055) Linux 桌面二次启动污染沙箱 fallback 标记 → 渲染器 SIGILL 循环 | OPEN |
| **P2** | [#98634](https://github.com/NousResearch/hermes-agent/issues/98634) `file.attach` 返回的 @file: 引用因 allowed_root 与暂存目录不一致始终被拒绝 | OPEN |
| **P2**（已关闭） | [#59113](https://github.com/NousResearch/hermes-agent/issues/59113) Dashboard 在 Docker/反代下认证失效 | 已关闭 |
| **P2**（已关闭） | [#50889](https://github.com/NousResearch/hermes-agent/issues/50889) 反代子路径下 Dashboard 登录 404 | 已关闭 |
| **P0 修复 PR** | [#134173](https://github.com/NousResearch/hermes-agent/pull/134173) scratch 修剪误删用户活跃写入文件 | 修复在途 |

值得注意的模式：**安装/更新（area/install-update）与 area/memory（Hindsight/Honcho/mem0）是 Bug 重灾区**，几乎每条高危 Issue 都落在这两个领域。

## 6. 功能请求与路线图信号

- **Mistral provider**（[#20859](https://github.com/NousResearch/hermes-agent/issues/20859)，👍29）：诉求明确、成本不高，配合 [#133676](https://github.com/NousResearch/hermes-agent/pull/133676)（OpenRouter/Nous 动态模型 fallback）显示 provider 生态仍在扩张期，纳入概率较高。
- **可配置 temperature**（[#17565](https://github.com/NousResearch/hermes-agent/issues/17565)，👍17）：用户因固定温度导致幻觉问题，呼声持续，needs-decision 待解。
- **Telegram 多 bot 群组共享上下文**（PR [#105624](https://github.com/NousResearch/hermes-agent/pull/105624)）：已实现在途，多实例协作是明确方向。
- **delegate_task 按任务 pin provider/model**（PR [#107945](https://github.com/NousResearch/hermes-agent/pull/107945)）：混合本地/云端编排场景，与 LM Studio 本地模型管理（PR [#61606](https://github.com/NousResearch/hermes-agent/pull/61606)）共同指向“本地模型一等公民”路线。
- **压缩器 warm handoff**（PR [#133625](https://github.com/NousResearch/hermes-agent/pull/133625)）：直接回应 #99943 一类上下文/成本痛点，是下一代核心优化。
- **Hindsight 多 bank 路由**（#31776，已关闭）与 **prefetch 超时可配置**（#43891，已关闭）：记忆系统配置化需求正在被逐一消化。

## 7. 用户反馈摘要

- **最大痛点：更新失败后的恢复体验**。#125437 的措辞极具代表性："every fix is a hand-typed recipe"——本周 15 个 Discord 线程全靠手工命令救回半损坏安装。用户要的不是修复个别失败模式，而是产品内自愈路径。
- **记忆系统用户在生产环境承压**：#111205 报告单轮 49 次重复事实注入（约 98k token），是真金白银的成本；Hindsight 依赖冲突（#95855、#122133）使用户“每次更新后记忆功能就坏”。
- **多平台（Discord/Telegram）重度用户**对线程/消息投递配置语义的细粒度控制有强需求（#26058）。
- **自托管/Docker/反代用户**长期受 Dashboard 认证问题困扰（#59113、#50889），但两个 Issue 均已关闭，满意度应在回升。
- **本地模型用户**（LM Studio、Ollama）是活跃且增长中的群体，但 #99943 显示云/本地配置边界处理粗糙，静默降级损害信任。
- 正面信号：i18n（pt-BR #40239）需求得到响应、P0 数据安全修复（#134173）响应迅速。

## 8. 待处理积压

以下高影响 Issue 长期未关闭且缺修复动作，建议维护者优先关注：

1. [#17565](https://github.com/NousResearch/hermes-agent/issues/17565)（4 月提出，👍17）temperature 配置——高呼声、低实现成本。
2. [#20859](https://github.com/NousResearch/hermes-agent/issues/20859)（5 月提出，👍29）Mistral provider。
3. [#26058](https://github.com/NousResearch/hermes-agent/issues/26058)（5 月提出）Discord auto_thread 语义。
4. [#58226](https://github.com/NousResearch/hermes-agent/issues/58226)（7 月提出，P2）用量显示错误，直接影响用户对配额的判断。
5. [#99943](https://github.com/NousResearch/hermes-agent/issues/99943)（9 月提出，P2）v0.21.0 回归，云 provider 上下文窗口静默缩水。
6. [#125727](https://github.com/NousResearch/hermes-agent/issues/125727) 上游自动集成冲突阻塞，持续 10 天以上。
7. [#125437](https://github.com/NousResearch/hermes-agent/issues/125437)（P1）更新恢复体验——社区痛感最强，建议与 #83689（Windows E2E CI）联动推进。
8. 长期在途大 PR：[#61151](https://github.com/NousResearch/hermes-agent/pull/61151)（7 月起，外发抑制模式）、[#61606](https://github.com/NousResearch/hermes-agent/pull/61606)（7 月起，LM Studio 管理）、[#83689](https://github.com/NousResearch/hermes-agent/pull/83689)（8 月起，Windows E2E CI）——均超一个月未合并，存在冲突腐烂风险。

---

**健康度总评**：吞吐量大、响应快、关闭率高，工程纪律良好（P0 修复、CI 加固同步推进）。主要风险集中在安装/更新可靠性、记忆系统依赖管理和大量长尾在途 PR 的收敛。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*