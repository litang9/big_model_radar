# OpenClaw 生态日报 2026-09-25

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-24 23:11 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-09-25

---

## 1. 今日速览

OpenClaw 今日保持极高活跃度：过去 24 小时内 Issues 更新 500 条（新开/活跃 457、关闭 43），PR 更新 500 条（待合并 364、已合并/关闭 136），单日发布 1 个新版本 **v2026.9.6**。不过该版本发布后立即暴露出 macOS 构建启动崩溃、更新回滚等多项 P0 回归问题，社区已紧急开立 **2026.9.7 Fixes Tracker**（#157531）进行集中修复跟踪。整体看，项目迭代速度快、社区反馈密集，但近期版本在更新/升级路径和插件目录管理上稳定性承压，技术债（事件循环阻塞、内存/CPU 燃烧类问题）持续累积。

---

## 2. 版本发布

### v2026.9.6（2026-09-24 重新构建并公证）

- **重要事件**：原 2026.9.6 macOS 构建启动即崩溃（[#156861](https://github.com/openclaw/openclaw/issues/156861)），已于 09:52 UTC 被修复后的重建版本替换（[#156881](https://github.com/openclaw/openclaw/issues/156881)）。
- **迁移注意**：
  - 已安装早期 2026.9.6 macOS 构建的用户需手动下载新 DMG 或从 2026.9.5 应用内更新；
  - 多位用户报告 **2026.9.5 → 2026.9.6 托管更新失败并回滚**（见下文 Bug 部分），建议升级前备份状态目录，必要时用 `npm install -g openclaw@2026.9.6` 直接安装规避。

---

## 3. 项目进展

今日合并/关闭共 136 个 PR，代表性进展：

**性能与稳定性**
- [#157666](https://github.com/openclaw/openclaw/pull/157666) `perf(state): avoid agent database rescans after writer eviction` — 会话写入不再反复等待全量数据库完整性扫描（关联 #157617）。
- [#157584](https://github.com/openclaw/openclaw/pull/157584) `fix(runtime): release retired SQLite worker pressure listeners` — 修复 SQLite worker 生命周期泄漏的内存压力监听器。
- [#157674](https://github.com/openclaw/openclaw/pull/157674) `chore: speed up session recovery tests` — 会话恢复测试提速近 2 分钟。
- [#156121](https://github.com/openclaw/openclaw/pull/156121) `fix(sessions): keep session results current during cold reads` — 防止冷读/归档会话在 Gateway 线程同步注水，直接缓解事件循环阻塞类问题。

**架构与体验**
- [#157555](https://github.com/openclaw/openclaw/pull/157555) `refactor: receive channel webhooks on the Gateway HTTP port` — Telegram/飞书/Teams/Nextcloud Talk 四个渠道统一复用 Gateway HTTP 端口，减少额外端口与重复监听生命周期。
- [#149880](https://github.com/openclaw/openclaw/pull/149880) `feat(gemini): add google-interactions api backend` — 为 Gemini 增加 opt-in 的 Interactions API 后端。
- [#156389](https://github.com/openclaw/openclaw/pull/156389) `fix(ollama): tag native pre-tool narration as commentary` — 修复 Ollama 工具前独白被当作正式消息发出的“双重回复”问题。
- [#151201](https://github.com/openclaw/openclaw/pull/151201) `fix: explain silent tool failures in plain language` — 工具失败通知附带真实错误证据与恢复指引。
- [#156556](https://github.com/openclaw/openclaw/pull/156556) `fix(codex): restore Computer Use after desktop plugin replacement`。

**CI/工程化**
- [#156158](https://github.com/openclaw/openclaw/pull/156158) CI RunsOn 容量多样化；[#157524](https://github.com/openclaw/openclaw/pull/157524) 复用 fs-safe、删除重复文件系统代码（XL 级清理）；[#157535](https://github.com/openclaw/openclaw/pull/157535) 升级完整性诊断捕获。

**评估**：今日 PR 主要围绕 9.6 → 9.7 的性能修复与工程化债务清理，事件循环/SQLite/内存三个长期痛点均有对应 PR 在途，方向明确。

---

## 4. 社区热点

| Issue | 热度 | 主题 |
|---|---|---|
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 30 评论 | stdio MCP server 初始化超时触发子进程清理路径的未处理 rejection，**整 Gateway 崩溃**（P1，no-stale） |
| [#155753](https://github.com/openclaw/openclaw/issues/155753) | 22 评论 | 模型目录过期/重建循环钉死一个 CPU 核 — `readFullModelCatalog()` 每次读取都触发 `refreshExpiredCatalog()` |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | 21 评论 | main 分支 Gateway ready 后 `/health` 全超时、事件循环饥饿（632-agent 舰队，P0） |
| [#112423](https://github.com/openclaw/openclaw/issues/112423) | 20 评论 | 大型 SQLite 转录归档在 Gateway 线程做完整物化/压缩/IO，阻塞事件循环 |
| [#98435](https://github.com/openclaw/openclaw/issues/98435) | 15 评论 | Gateway 重启后 MCP loopback 传输不自动重连，`recovered=1` 有误导性 |
| [#157531](https://github.com/openclaw/openclaw/issues/157531) | 10 评论 | **2026.9.7 Fixes Tracker** — 官方修复账本，覆盖 1,058 个主线提交的回溯审计 |
| [#157107](https://github.com/openclaw/openclaw/issues/157107)（已关闭） | 13 评论 | 9.6 目录 worker 每 ~6s 重建插件代，agent 运行永不被接纳 |

**诉求分析**：讨论焦点高度集中在**性能/资源（目录刷新循环、事件循环阻塞、内存膨胀）**与**升级可靠性**两条主线；"clawsweeper-recovery-stuck"标签频繁出现，说明部分问题长期卡在恢复流程中，用户对修复节奏有明显焦虑。

---

## 5. Bug 与稳定性（按严重程度）

### P0 / ux-release-blocker
1. **托管更新 2026.9.5→9.6 必然回滚** — update-history 调和中 RangeError 栈溢出，`doctor --fix` 无效。[#157011](https://github.com/openclaw/openclaw/issues/157011)（已关闭）⚠️ 暂未见专属 fix PR。
2. **9.6 目录 worker 无限重建插件代**，28-agent 安装所有 run 被拒。[#157107](https://github.com/openclaw/openclaw/issues/157107)（已关闭）。
3. **`openclaw update` 在 global install swap 步骤失败**，直接 npm 安装同版本可成功。[#156112](https://github.com/openclaw/openclaw/issues/156112) — 相关诊断 PR [#156633](https://github.com/openclaw/openclaw/pull/156633)、[#157535](https://github.com/openclaw/openclaw/pull/157535) 在途。
4. **git→stable 更新后服务重校验失败、Gateway 停摆**。[#157227](https://github.com/openclaw/openclaw/issues/157227)；同作者还报告了 [#157234](https://github.com/openclaw/openclaw/issues/157234)（agent DB lease 活跃导致恢复失败）。
5. **更新后服务重校验拒绝外部安装插件迁移**（acpx/codex，容器环境回归）。[#157415](https://github.com/openclaw/openclaw/issues/157415)。
6. **历史遗留**：Gateway ready 但事件循环饥饿 [#149538](https://github.com/openclaw/openclaw/issues/149538)；Desktop app 引发 gateway boot-loop [#115256](https://github.com/openclaw/openclaw/issues/115256)；webchat profile 验证卡死 [#141615](https://github.com/openclaw/openclaw/issues/141615)。

### P1 / 高影响
- **9.6 每次 CLI 调用重新捕获全部插件，~12s 固定开销**。[#157351](https://github.com/openclaw/openclaw/issues/157351)（已关闭）。
- **claude-cli 忽略 `CLAUDE_CONFIG_DIR`**，导致 transcript 丢失与错误 failover。[#145309](https://github.com/openclaw/openclaw/issues/145309)。
- **8 MiB stdout 上限吞掉长 turn 最终回复**（工作完成但结果被丢弃）。[#150132](https://github.com/openclaw/openclaw/issues/150132)。
- 9.6 升级后 Codex 常驻目录每 30s 报 `PLUGIN_STATE_OPEN_FAILED`。[#156930](https://github.com/openclaw/openclaw/issues/156930)。
- agent DB（464 MB）会话回收超 5s busy timeout → `database is locked`。[#148307](https://github.com/openclaw/openclaw/issues/148307)。

### P2 / 值得关注
- Telegram 心跳内部输出泄漏到用户聊天 [#143278](https://github.com/openclaw/openclaw/issues/143278)；Telegram file:// 链接泄漏原始 Markdown [#137705](https://github.com/openclaw/openclaw/issues/137705)（已关闭）；Telegram 贴纸无法被 agent 感知 [#120735](https://github.com/openclaw/openclaw/issues/120735)。
- Anthropic 长会话缓存固定在 46k、每轮全量重写 [#140129](https://github.com/openclaw/openclaw/issues/140129) — 注意 [#157662](https://github.com/openclaw/openclaw/pull/157662)（cache carriers 绑定 replay policy）可能相关。
- 运行时上下文载体注入位置在用户消息之后，引发模型混乱与推理 token 浪费 [#110190](https://github.com/openclaw/openclaw/issues/110190)。

---

## 6. 功能请求与路线图信号

- **Provider 故障分类降级/隔离 auth-broken provider** [#47910](https://github.com/openclaw/openclaw/issues/47910)（已关闭）— 命中当前模型回退链痛点，被纳入闭环，可能进 9.7。
- **会话智能自动命名**（惰性生成、廉价模型、主题感知改名）[#99583](https://github.com/openclaw/openclaw/issues/99583) — 代码库已有 `llm-slug-generator`，实现成本低，社区呼声高（needs-product-decision）。
- **会话标签/昵称** [#55249](https://github.com/openclaw/openclaw/issues/55249) — 与上一条互补，同属会话管理体验。
- **onboarding 支持多 provider/多模型配置** [#81960](https://github.com/openclaw/openclaw/issues/81960)。
- **Linux ARM64 companion 官方构建**（deb + AppImage）[#138279](https://github.com/openclaw/openclaw/issues/138279) — Windows 已有 ARM 版，Linux ARM 桌面用户诉求明确。
- **openat2 ENOSYS 优雅降级**（NAS/旧内核 Docker 场景）[#152839](https://github.com/openclaw/openclaw/issues/152839)。
- **持久化自然语言规则学习 + 多 @ 回复语义** [#41366](https://github.com/openclaw/openclaw/issues/41366) — 多 agent 群聊场景的核心产品诉求。
- **QQ 渠道长期支持计划** [#150743](https://github.com/openclaw/openclaw/issues/150743) / [#145937](https://github.com/openclaw/openclaw/issues/145937) — 第一方 qqbot 停更且继任插件不完整，**需要官方明确生态路线表态**。

结合 [#157531](https://github.com/openclaw/openclaw/issues/157531) 的 9.7 修复账本，短期版本重心显然在**升级路径 + 目录/插件系统性能**，上述功能请求更可能排入 9.7 之后。

---

## 7. 用户反馈摘要

**真实痛点**
- **升级恐惧**：9.6 发布当日即出现多条“更新失败/回滚/服务停摆”报告（#157011、#157227、#157234、#157415），NAS/systemd/容器用户受损最重；有人指出直接 npm 安装可绕过，说明托管更新器是独立薄弱环节。
- **性能焦虑**：ARM/Pi 用户每 turn 100% CPU（#134925）、目录 worker 钉死核心（#155753）、RSS 3 GiB+ 挤占同机负载（#156191）——小内存/边缘设备用户体验持续劣化。
- **消息丢失类最伤信任**：长 turn 回复被 8 MiB cap 丢弃（#150132）、QQ 渠道无可用插件（#145937）、CLI 后端助手消息渲染两次（#123792）。
- **“假恢复”**：`recovered=1` 但 MCP 不重连（#98435）、doctor 修复被 Desktop app 立即回滚（#115256），用户对恢复语义的信任度下降。

**正面信号**
- 社区贡献质量高：多条 issue 附带源码级定位、可复现步骤甚至本地 backport 测试（#155753、#156191）。
- 机器人辅助分类（clawsweeper 标签体系）与修复账本透明度高，维护者响应节奏虽滞后但流程可追踪。
- 多平台真实生产使用（632-agent 舰队、Telegram/飞书/Signal/QQ/Teams 多渠道），说明项目已进入严肃生产采纳期。

---

## 8. 待处理积压（建议维护者优先关注）

| Issue | 状态 | 说明 |
|---|---|---|
| [#149538](https://github.com/openclaw/openclaw/issues/149538) P0 | recovery-stuck，9 天 | main 分支事件循环饥饿、内存耗尽，632-agent 生产舰队受阻 |
| [#115256](https://github.com/openclaw/openclaw/issues/115256) P0 | 9 天 | Desktop app boot-loop，doctor 建议被立即回滚 |
| [#141615](https://github.com/openclaw/openclaw/issues/141615) P0 | 17 天 | webchat profile 验证卡死楔死全部 RPC |
| [#143752](https://github.com/openclaw/openclaw/issues/143752) P0 | 14 天 | 包激活中断可搁浅 canonical CLI，无 package-only replay |
| [#148307](https://github.com/openclaw/openclaw/issues/148307) P0 | 10 天 | database is locked，Windows 大 DB 用户不可用 |
| [#110190](https://github.com/openclaw/openclaw/issues/110190) P1 | 2 个月+ | 上下文载体位置错误造成 token 浪费，影响所有用户的成本 |
| [#112423](https://github.com/openclaw/openclaw/issues/112423) P1 | 2 个月+ | SQLite 转录归档阻塞事件循环（PR #156121 部分相关） |
| [#98435](https://github.com/openclaw/openclaw/issues/98435) P2 | ~3 个月 | MCP loopback 不自动重连，`recovered=1` 语义误导 |
| [#99659](https://github.com/openclaw/openclaw/issues/99659) P2 | ~3 个月 | companion app 连接后 OOM kill，仅 7 评论、needs-info |
| PR [#67820](https://github.com/openclaw/openclaw/pull/67820) | 5 个月+，waiting on author | WhatsApp QR 复用修复，长期悬置 |

**健康度提示**：P0 积压中多条带有 `clawsweeper-recovery-stuck` 标签且超过一周未动，与 9.6 发布日的更新类 P0 叠加，建议在 9.7 修复账本中明确升级路径类问题的 owner 与时间表。

---

*数据来源：GitHub API（Issues/PR/Releases，截至 2026-09-25）。本报告仅覆盖展示样本，不代表全部 500 条动态。*

---

## 横向生态对比

# 开源 AI 智能体生态横向对比分析报告 · 2026-09-25

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**严肃生产采纳期**：头部项目（OpenClaw、Hermes Agent）单日 Issue/PR 动态均触及 500 条量级，且出现 632-agent 舰队、多渠道（Telegram/飞书/Signal/QQ/Teams）部署等大规模真实生产案例。生态共同痛点高度收敛于三条主线：**升级/安装路径可靠性、事件循环与资源（内存/CPU/SQLite）性能、多渠道消息与本地模型体验**。同时，两个项目都不约而同投入基础设施级重构（统一包管理器、Gateway 端口收敛），标志着生态正从功能堆叠期转入工程债务清算期。桌面端（Desktop companion app）与本地模型（Ollama/ARM 边缘设备）成为体验竞争的新前线。

---

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 动态（24h） | 500 条（新开/活跃 457，关闭 43） | 500 条（新开 122，关闭 378） |
| PR 动态（24h） | 500 条（待合并 364，合并/关闭 136） | 500 条（待合并 342，合并/关闭 158） |
| Release | v2026.9.6（发布当日暴露 P0 回归，已重建+公证，9.7 修复账本 #157531 已开立） | v0.21.5 / v2026.9.24（补丁版，汇总 ~460 PR 为稳定 tag） |
| 关闭/新增比 | 43/457 ≈ 0.09（问题净流入） | 378/122 ≈ 3.1（大规模收敛） |
| 健康度评估 | ⚠️ 中警：迭代极快但发布质量承压，P0 积压多条 recovery-stuck 超一周 | ✅ 良好：主动清账期，关闭远超新增，路线图信号清晰 |
| 主要风险 | 升级路径 P0、事件循环饥饿、目录 worker 资源燃烧 | 安全决策积压（#59293）、安装类历史 Bug 长尾 |

**关键对比**：OpenClaw 今日处于“发布事故处置”模式（9.6 → 9.7 紧急修复）；Hermes 处于“消化收敛”模式（460 PR 打 tag + 378 Issue 关闭）。

---

## 3. OpenClaw 在生态中的定位

**优势**：
- **规模与生产验证深度领先**：632-agent 舰队、SQLite 转录归档达 464 MB 级、多渠道（含飞书/QQ 等中文渠道）真实部署，说明其承载的负载规模和渠道覆盖广度在生态内最具代表性。
- **社区诊断能力强**：多条 issue 附源码级定位与本地 backport 测试（#155753、#156191），配合 clawsweeper 机器人分类与 9.7 修复账本（#157531，回溯 1,058 主线提交），透明度极高。

**技术路线差异**：
- OpenClaw 以 **Gateway 为核心的单体运行时 + 插件/目录系统** 架构，多渠道 webhook 正在收敛到 Gateway HTTP 端口（#157555）；代价是事件循环阻塞、SQLite worker 生命周期等技术债集中爆发。
- Hermes 以 **包管理器（pm/）+ Desktop/Cloud 多形态分发** 为重心，基础设施重构（#96458 Windows CI、#102765 统一包管理器）优先于功能扩张。

**社区规模**：两者 GitHub 活动量同处第一梯队（均 500 条/日上限），但 OpenClaw 的 issue 新增速率（457 vs 122）远高，反映用户基数更大或问题暴露面更广；Hermes 的维护吞吐效率（关闭比 3.1 vs 0.09）明显更优。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **安装/更新可靠性** | 两者 | OpenClaw：托管更新必然回滚（#157011）、global install swap 失败（#156112）、git→stable 停摆（#157227）。Hermes：Windows/macOS 更新破坏 Desktop（#44225）、假成功（#44580）、版本分裂（#52339），并以 #102765 统一包管理器系统性应对 |
| **Provider 故障转移/降级链** | 两者 | OpenClaw：#47910 auth-broken provider 隔离（已纳入闭环）。Hermes：#77305 fallback 饿死、#122018 fast-mode 参数 TypeError |
| **本地模型（Ollama）体验** | 两者 | OpenClaw：#156389 工具前独白双重回复。Hermes：#92561 自定义 provider 历史丢失、#121969 本地模型引导 |
| **消息渠道适配长尾** | 两者 | OpenClaw：Telegram 输出泄漏（#143278）、QQ 渠道生态断档（#145937）。Hermes：Signal Note to Self（#121970）、Telegram→Desktop 同步（#42962） |
| **会话管理体验** | 两者 | OpenClaw：智能命名（#99583）、标签（#55249）。Hermes：/new 嵌套错误（#99648）、会话恢复（#121890） |
| **边缘/低资源设备** | 两者 | OpenClaw：ARM/Pi 每 turn 100% CPU（#134925）、RSS 3 GiB（#156191）。Hermes：本地免费跑模型推广（#121969） |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道 Gateway、大舰队多 agent 运行时、插件/目录生态、Computer Use | Desktop 端体验、skills 生态（ACP slash 命令、lint）、本地模型普及、Cloud/托管分发 |
| 目标用户 | 生产级自托管运维者（NAS/systemd/容器/632-agent 舰队）、中文渠道用户 | 个人桌面用户、本地模型玩家（RTX 级硬件）、下游托管部署方（Hermes Cloud、Docker） |
| 技术架构 | Node.js 单 Gateway + SQLite + 插件 worker 代际管理，事件循环为核心瓶颈 | 统一包管理器 + 多运行时（SSH/Modal/Daytona/Vercel 沙箱后端）+ 网关联邦路线（#97681） |
| 治理风格 | 机器人辅助分类 + 官方修复账本，响应滞后但可追踪 | 维护者（Teknium）直接表态路线图，关闭/收敛节奏快 |
| 中期押注 | 9.7 升级路径与目录性能修复；QQ 渠道生态表态 | 网关统一运行时（#106742）→ 联邦协作；Windows 一等公民化 |

---

## 6. 社区热度与成熟度

- **快速迭代 + 质量承压（OpenClaw）**：issue 净流入极高、发布节奏快（单日 1 版本）但 P0 回归频发；多条 P0 带 `clawsweeper-recovery-stuck` 超一周未动（#149538 达 9 天、#141615 达 17 天），处于“规模驱动但稳定性债务累积”阶段。
- **质量巩固/消化期（Hermes Agent）**：378 条关闭对应 122 新开，Windows CI 补齐 1,290 个失败测试节点，安装类历史 Bug 集中清账——典型的主动还债、夯实基座阶段。
- **分层结论**：两者热度同属第一梯队，但成熟度曲线相位不同——OpenClaw 需要从“快”转向“稳”，Hermes 正在从“稳”蓄力下一个功能周期（网关联邦、Group Chat）。

---

## 7. 值得关注的趋势信号

1. **更新器是独立的薄弱环节**：两项目最伤信任的 Bug 均非核心功能，而是升级路径（OpenClaw 托管更新回滚、Hermes Desktop 损坏）。对开发者的启示：**自研更新器的投入应不低于核心功能**，或直接复用成熟包管理方案（Hermes #102765 方向）。
2. **事件循环/单线程运行时成为规模化天花板**：OpenClaw 的 Gateway 饥饿、SQLite 物化阻塞、内存膨胀系列问题表明，**多 agent 高并发场景下运行时架构（worker 化、off-thread IO）比模型能力更是瓶颈**。
3. **本地模型与边缘部署是确定性需求**：Ollama 历史丢失、ARM/Pi 资源燃烧、RTX 用户不知可本地跑模型——**“可发现性 + 资源效率”是本地化落地的两大抓手**。
4. **消息渠道的长尾成本高**：Telegram/Signal/QQ 各自的适配 Bug 持续消耗维护资源，**渠道抽象层与适配器配置灵活性**（而非逐个硬编码）是长期解法。
5. **安全决策积压值得警惕**：Hermes #59293（CLI 绕过审批层）三个月未决、OpenClaw 密钥展开隐患（Hermes #122014 已修）——**agent 权限门控与密钥处理将成为生态下一阶段的信任分水岭**。
6. **多 agent 协作是下一个功能制高点**：OpenClaw 的多 @ 回复语义（#41366）与 Hermes 的网关联邦（#97681）殊途同归，均被官方列为中期路线——**单 agent 助手 → 多 agent 协作网络**的演进方向已在两个头部项目中得到确认。

---

*数据来源：两项目 2026-09-25 GitHub 动态日报；样本上限 500 条/项目，结论基于可见样本。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-09-25）

## 1. 今日速览

Hermes Agent 过去 24 小时保持极高活跃度：Issues 更新 500 条（新开/活跃 122，关闭 378），PR 更新 500 条（待合并 342，已合并/关闭 158），关闭量远超新增，说明维护团队正在进行大规模清理与收敛，项目处于健康的"消化期"。今日发布 **v0.21.5 (v2026.9.24)** 补丁版本，将 v0.21.4 以来约 460 个已合并 PR 打成稳定 tag，供 Docker 镜像与 Hermes Cloud 等下游使用。热点集中在 Desktop 端体验打磨（p3 fix sweep 系列 PR 密集提交）、插件/更新安全性和多网关协作等长期议题上。总体判断：迭代速度快、社区参与度高、维护响应积极。

---

## 2. 版本发布

### v2026.9.24: Hermes Agent v0.21.5
- **类型**：补丁版本（Patch release）
- **内容**：将 v0.21.4 以来约 **460 个已合并 PR** 汇总为稳定 tag，面向下游消费者（Docker 镜像、Hermes Cloud、托管部署）。完整 curated notes 延后发布。
- **破坏性变更**：暂无明确声明；由于汇总窗口巨大，建议下游部署方升级前 diff 配置默认值，并留意 release notes 后续补充。
- **迁移建议**：通过 `hermes update` 升级的 Windows/macOS 用户请确认 Desktop 重建成功（见下文历史 Bug），建议升级后核对应用版本号。
- 链接：https://github.com/NousResearch/hermes-agent/releases（tag v2026.9.24）

---

## 3. 项目进展

今日关闭的重量级 PR/工作：

- **#96458（已关闭）Windows 原生测试套件修复**：修复 227 个失败测试文件、约 1290 个失败节点，并在 CI 中开启完整 Windows 套件。Windows 平台一等公民化的重要里程碑。https://github.com/NousResearch/hermes-agent/pull/96458
- **#102765（已关闭）Bundles & 统一包管理器（`pm/`）**：用单一包管理器与统一发布管线替换原有安装/依赖/更新/发布机制，覆盖 Docker、Nix、Windows。属于基础设施级重构，长期将显著降低安装/更新类 Bug（这类 Bug 占今日关闭 Issue 的相当比例）。https://github.com/NousResearch/hermes-agent/pull/102765

今日新开的重要修复 PR（P0 两项尤其关键）：

- **#122007 [P0] 插件更新保留用户文件**：修复 `hermes plugins update` 在子目录安装（含 67 个 catalog 条目）与 gitignored 数据目录下丢失用户 `config.yaml` 和数据的问题。https://github.com/NousResearch/hermes-agent/pull/122007
- **#122012 [P0] Modal/Daytona/Vercel 上 write_file/patch 清空目标文件**：heredoc stdin 绑定错误导致文件被写空，修复为字节精确写入；挽救了 #94849 的工作。https://github.com/NousResearch/hermes-agent/pull/122012
- **#122018** 修复 Anthropic fast-mode 故障转移到 OpenAI 兼容模型时 `speed` 参数导致 `TypeError`、fallback 链失效的问题（与 Issue #77305 同属容灾链路）。https://github.com/NousResearch/hermes-agent/pull/122018
- **#122014 [P2] Profile 复制不再展开 `${VAR}` 密钥**：修复"New bot"流程将明文密钥写入新 profile 的安全隐患。https://github.com/NousResearch/hermes-agent/pull/122014
- **#122017 (feat)** 将已安装 skills 暴露为 ACP slash 命令，改善第三方客户端可发现性。https://github.com/NousResearch/hermes-agent/pull/122017
- **#121969 (feat)** Desktop 本地模型引导（handoff tour、模型菜单入口、任务后卡片），推动"本地免费跑模型"的普及。https://github.com/NousResearch/hermes-agent/pull/121969

**整体评估**：今日单日即关闭 378 个 Issue、推进 2 个基础设施级 PR（Windows CI、统一包管理器），加上两个 P0 数据安全修复，项目前进幅度显著，稳定性投入明显加码。

---

## 4. 社区热点

1. **#88584（139 评论，OPEN）** — 自动化 Nous 集成因 `cron/jobs.py` 合并冲突被阻塞。持续一个月的高热度讨论，反映社区对上游集成自动化可靠性的高度关注。https://github.com/NousResearch/hermes-agent/issues/88584
2. **#97681（30 评论，OPEN）** — 跨网关 Bot 协作（gateway federation）功能。目前被 #106742（统一网关运行时）阻塞，Teknium 明确 Desktop 连续性推迟至 Group Chat 在 main 稳定后再议——这是路线图的重要信号。https://github.com/NousResearch/hermes-agent/issues/97681
3. **#59293（20 评论，OPEN）** — 安全问题：`hermes config set` 绕过 system-config 写保护，可在无门控下禁用审批层。带 `needs-decision` 标签，等待维护者裁决，安全敏感，建议优先处理。https://github.com/NousResearch/hermes-agent/issues/59293
4. **#7335（16 评论，CLOSED）** — 开放 Issue 增长治理的老话题，今日大量 Issue 关闭（378 条）可视作对该诉求的实际回应。https://github.com/NousResearch/hermes-agent/issues/7335

---

## 5. Bug 与稳定性（按严重程度）

| 严重度 | Issue | 状态 | 说明 | Fix |
|---|---|---|---|---|
| P2/安全 | [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | OPEN | CLI 绕过审批层写保护 | 暂无 |
| P2 | [#121890](https://github.com/NousResearch/hermes-agent/issues/121890) | OPEN | `hermes chat -Q` 收到 SIGTERM 时丢失 session_id，无法恢复会话 | 暂无 |
| P2 | [#92561](https://github.com/NousResearch/hermes-agent/issues/92561) | OPEN | 自定义 OpenAI 兼容 provider 只收到 system prompt + 当前消息，历史与工具结果全丢（影响 Ollama 本地用户） | 待确认，#122018 修复相邻 fallback 问题 |
| P1（已修） | [#83617](https://github.com/NousResearch/hermes-agent/issues/83617) | CLOSED | 重命名对话框空格键失效（dnd-kit KeyboardSensor 残留） | 已关闭 |
| P2（已修） | [#77305](https://github.com/NousResearch/hermes-agent/issues/77305) | CLOSED | 子代理 API 失败消耗迭代预算，饿死 fallback 链 | 相关 PR #122018 |
| P2（已修） | [#118482](https://github.com/NousResearch/hermes-agent/issues/118482) | CLOSED | Desktop 流式输出时 transcript 滚动漂移后回弹 | 已关闭 |
| P2（已修） | [#96024](https://github.com/NousResearch/hermes-agent/issues/96024) | CLOSED | SSH 远程后端启动失败 + 远端僵尸进程堆积 | 已关闭 |
| P2（已修） | [#73271](https://github.com/NousResearch/hermes-agent/issues/73271) | CLOSED | Desktop OAuth token 重启后无法恢复（解析格式错误） | 已关闭 |

今日关闭的存量高优先级 Bug 还包括 Windows 更新破坏 Desktop 可执行文件（#44225）、更新假成功（#44580）、macOS 双版本分裂（#52339）、Windows venv PATH 注入（#22054）等——安装/更新类 Bug 集中清账，配合 #102765 包管理器重构，方向正确。

---

## 6. 功能请求与路线图信号

- **跨网关 Bot 协作**（[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)）：依赖统一网关运行时 #106742，且 Teknium 表示 Group Chat 稳定后约一个月内复查——多端协作是明确的中期方向。
- **Signal 关闭 Note to Self 处理**（[#121970](https://github.com/NousResearch/hermes-agent/issues/121970)，今日新开）：gateway 适配器配置灵活性诉求，改动小，短期内有望纳入。
- **`hermes skills lint`**（[#37352](https://github.com/NousResearch/hermes-agent/issues/37352)）：skill 生态工具化，配合 #122017（ACP 暴露 skills），显示 skills 体系是当前投入重点，lint 有望后续跟进。
- **ACP slash 命令**（[#122017](https://github.com/NousResearch/hermes-agent/pull/122017)）与**本地模型引导**（[#121969](https://github.com/NousResearch/hermes-agent/pull/121969)）已进入 PR 阶段，大概率进入下个 minor 版本。
- **统一包管理器**（#102765 已关闭/收尾）：下一代安装更新体验的基座。

---

## 7. 用户反馈摘要

- **最集中的痛点：安装与更新**。今日关闭的 Issue 中大量为 Windows/macOS 上 `hermes update` 导致 Desktop 损坏、假成功、版本分裂（#44225、#44580、#52339、#46939、#22054）。中国用户（中文 Issue #46939、#44225）反映 Electron 下载被网络阻断加剧了问题；`ELECTRON_MIRROR` 镜像方案被提及但体验仍差。
- **Desktop 多端会话同步**：Telegram 更新后 Desktop 不刷新（#42962）、共享 HERMES_HOME 时中断标记误读（#94778）——多前端用户对实时一致性要求高。
- **本地模型用户体验**：Ollama 用户报告上下文丢失（#92561）让人沮丧；同时本地模型引导 PR（#121969）测试中"RTX Spark/5090 用户没人发现可本地跑模型"的观察说明推广确有必要。
- **满意点**：修复响应速度快（#98524 消息重复渲染、#118482 滚动问题均在数日内处理）；7 👍 的 #70421（移除 3 会话预览上限）关闭，多会话用户满意。

---

## 8. 待处理积压（提醒维护者关注）

1. **#59293（P2/安全，OPEN，7/6 提出，近 3 个月）**：CLI 绕过审批层保护，`needs-decision` 长期未决，安全面风险，建议优先裁决。https://github.com/NousResearch/hermes-agent/issues/59293
2. **#88584（P3，8/17 提出，139 评论）**：cron 自动化集成阻塞一个月，影响下游 Enterkey 部署的 dashboard 更新。https://github.com/NousResearch/hermes-agent/issues/88584
3. **#92561（P3/needs-decision，8/22 提出）**：自定义 OpenAI 兼容 provider 历史丢失，直接打击本地模型核心使用场景。https://github.com/NousResearch/hermes-agent/issues/92561
4. **#37352（P3，6/2 提出）**：skills lint 工具，生态质量诉求，已有充分讨论无维护者表态。https://github.com/NousResearch/hermes-agent/issues/37352
5. **#99648（P3，8/31 提出）**：`/new` 会话在侧栏错误嵌套为分支，影响多会话管理心智模型。https://github.com/NousResearch/hermes-agent/issues/99648
6. **PR #106058（dependabot）**：httpx2 2.7.0 → 2.12.0 升级 pending，注意 rebase 后及时验证合并，避免依赖积压。https://github.com/NousResearch/hermes-agent/pull/106058

---

**健康度小结**：吞吐量极高、关闭/新增比优秀、有明确路线图信号（网关统一、包管理器、skills 生态、本地模型）；主要风险点为安全决策积压（#59293）与安装更新类历史 Bug 的长尾，后者正通过 #102765 系统性解决。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*