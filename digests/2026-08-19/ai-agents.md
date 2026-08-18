# OpenClaw 生态日报 2026-08-19

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-08-18 20:38 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 — 2026-08-19

---

## 1. 今日速览

OpenClaw 今日保持**极高活跃度**：过去 24 小时 Issues 更新 500 条（新开/活跃 461，关闭 39），PR 更新 500 条（待合并 348，已合并/关闭 152），无新版本发布。核心维护者 [@steipete](https://github.com/steipete) 今日密集提交了 7 个新 PR（#125904、#125951、#125968、#125981、#125983、#125986、#125991），聚焦会话状态一致性与 Control UI 打磨；同时安全加固成为主线，日志脱敏、SSRF 防护、插件安装策略确认等安全 PR 推进或落地。需要警惕的是：**Issue 净流入严重失衡（461 新增/活跃 vs 39 关闭）**，且大量高优先级 Bug 带有 `clawsweeper-recovery-stuck`（修复停滞）标签，积压问题正在累积。

---

## 2. 版本发布

今日无新版本发布。值得注意的是 #124788 报告了 **2026.8.1-beta.2** 的网关事件循环周期性阻塞问题（详见第 5 节），正式版发布前建议关注该回归的处理进度。

---

## 3. 项目进展

### 今日关闭/合并的 PR（共 152 个合并/关闭，以下为高关注度项）

| PR | 内容 | 意义 |
|---|---|---|
| [#116489](https://github.com/openclaw/openclaw/pull/116489) | `feat(security)`: 插件安装策略警告需显式确认（XL） | 引入 `security.installPolicy` 的 `warn` 机制，交互式 CLI 与 Control UI 均需操作员确认可疑插件/技能安装 |
| [#120900](https://github.com/openclaw/openclaw/pull/120900) | `feat(ui)`: Control UI 中审查安装策略警告 | 与 #116489 配套，`plugins.install` 新增 `acknowledgeInstallPolicyWarning` 确认参数，附视频验证 |
| [#125939](https://github.com/openclaw/openclaw/pull/125939) | `fix(channels)`: 日志脱敏 + 拒绝未知过滤器（P1） | 修复 `openclaw channels logs` 可能泄露敏感值、未知 `--channel` 参数静默扩大到全部通道的问题 |

### 关键进行中 PR

- **[#125143](https://github.com/openclaw/openclaw/pull/125143)** `fix(cli)`: 多 Agent 队列下直接推理命令的 Agent 选择 — **已武装自动合并（automerge armed）**，预计近日落地。
- **[#123055](https://github.com/openclaw/openclaw/pull/123055)** `fix(agents)`: 嵌入式运行阻塞后解锁会话回合（P1，待维护者审阅）— 直击多个 `session-state` 类死锁 Issue。
- **[#125904](https://github.com/openclaw/openclaw/pull/125904)**（steipete，今日新建）`fix(sessions)`: 重连后保留已提交结果，防止重复创建会话。
- **[#125707](https://github.com/openclaw/openclaw/pull/125707)** `fix(codex)`: 持久化 Codex 原生线程 reasoning effort（P1，待维护者审阅）。
- **[#123848](https://github.com/openclaw/openclaw/pull/123848)** `fix`: Beam 上传的 SSRF 防护（307/308 重定向绕过修复）。

**整体评估**：今日在安全边界、会话状态可靠性两条主线上有实质推进；152 个 PR 合并/关闭显示工程吞吐健康，但 348 个待合并 PR 中相当比例处于 "waiting on author" 状态，评审带宽仍是瓶颈。

---

## 4. 社区热点

### 评论最多的 Issues

1. **[#80319](https://github.com/openclaw/openclaw/issues/80319)**（17 评论）— QA tool-defaults 套件混淆了 Codex 原生工具与 OpenClaw 动态工具对等性。讨论已澄清这是 **QA 测试框架/mock-provider 问题**，而非 Codex 运行时工具调用普遍丢失，体现了社区对测试严谨性的高要求。
2. **[#62505](https://github.com/openclaw/openclaw/issues/62505)**（15 评论）— "Coding Agent 什么都完不成"（2026.4.2 后回归）。作为 P1 回归 + Beta 阻塞候选，长期停留在 `needs-maintainer-review` / `needs-product-decision`，用户 frustration 明显。
3. **[#38327](https://github.com/openclaw/openclaw/issues/38327)**（14 评论）— google-vertex/gemini-3.1-pro-preview 触发 "Cannot convert undefined or null to object"，认证提供商兼容性持续受关注。
4. **[#79902](https://github.com/openclaw/openclaw/issues/79902)**（14 评论）— 请求在 database-first 运行时之上暴露 **SQLite transcript/session 接缝**，高级用户希望不靠抓取不透明 blob 就能构建伴生工具，生态扩展诉求强烈。
5. **[#112423](https://github.com/openclaw/openclaw/issues/112423)**（14 评论）— 大型 SQLite transcript 清理阻塞网关事件循环（P1，已标记 `fix-shape-clear` + `queueable-fix`，修复路径明确）。
6. **[#84516](https://github.com/openclaw/openclaw/issues/84516)**（13 评论）— Codex app-server 长回复在 ~1000-1100 字符处静默截断（`stop=null, aborted=false`），headless 场景可靠性问题。

### 今日新开但升温极快

- **[#125679](https://github.com/openclaw/openclaw/issues/125679)**（今日创建，已 9 评论）— Matrix 通道在新账号/房间上**无限重启循环**，且报告者已 **bisect 定位到 #125302**。这种自带定位的新回归报告处理优先级应极高。

---

## 5. Bug 与稳定性

按严重程度排列（P1 优先，标注 fix PR 状态）：

| 级别 | Issue | 问题 | Fix PR 状态 |
|---|---|---|---|
| **P1 🔴 今日新增** | [#125679](https://github.com/openclaw/openclaw/issues/125679) | Matrix 初始同步无限重启循环（回归，已 bisect 到 #125302） | ❌ 暂无 |
| **P1 🔴 本周新增** | [#124788](https://github.com/openclaw/openclaw/issues/124788) | 2026.8.1-beta.2 网关每 ~10 分钟阻塞事件循环 ~100s，WebSocket/HTTP/cron 全停 | ❌ 暂无 |
| **P1** | [#111372](https://github.com/openclaw/openclaw/issues/111372) | macOS 网关加载配置后无限 SIGTERM 重启循环（2026.6.11→2026.7.1-2 回归） | ❌ 无，`needs-product-decision` |
| **P1** | [#62505](https://github.com/openclaw/openclaw/issues/62505) | Coding Agent 空转不产出（2026.4.2 后回归，4 个月未解） | ❌ `no-new-fix-pr` |
| **P1** | [#84516](https://github.com/openclaw/openclaw/issues/84516) | Codex 长回复静默截断 | ❌ `recovery-stuck` |
| **P1** | [#112423](https://github.com/openclaw/openclaw/issues/112423) | 大 transcript 归档阻塞事件循环 | 🟡 修复路径已明确（queueable-fix） |
| **P1** | [#109478](https://github.com/openclaw/openclaw/issues/109478) | 多行工具调用参数被注入字面 `\n`，跨模型间歇性破坏文件 | 🟡 有关联 PR 开启中 |
| **P1** | [#107244](https://github.com/openclaw/openclaw/issues/107244) | WhatsApp 群组消息完全不进入 inbound 处理（LID 群组） | ❌ 暂无 |
| **P1** | [#108265](https://github.com/openclaw/openclaw/issues/108265) | Feishu 流式渲染"逐字滴出"，2026.7.1 后不可用 | ❌ `needs-product-decision` |
| **P1** | [#86612](https://github.com/openclaw/openclaw/issues/86612) | Docker 网关容器重启循环（Sandbox + WSL 路径） | ❌ 暂无 |
| **P1** | [#106704](https://github.com/openclaw/openclaw/issues/106704) | 子代理首回合 `sessions_yield` 静默空结果完成 | ❌ 暂无 |
| **P2** | [#88657](https://github.com/openclaw/openclaw/issues/88657) | DeepSeek V4 Flash 不完整回合（2026.5.27/28 回归） | ❌ 暂无 |
| **P2** | [#117609](https://github.com/openclaw/openclaw/issues/117609) | 瞬时 LLM/Socket 错误在 embedded-assistant 阶段不重试，长回合整体夭折 | 🟡 有关联 PR 开启中 |
| **P2** | [#75782](https://github.com/openclaw/openclaw/issues/75782) | embedded-run "auth" 阶段固定同步阻塞 10–15s | ❌ 暂无（已确认主线不可复现） |

**模式观察**：`impact:session-state` + `impact:message-loss` 标签组合在 P1 中占比最高；**崩溃/重启循环类问题（#125679、#124788、#111372、#86612）形成集群**，且多与近期版本（2026.7.x / 2026.8.1-beta）相关，稳定性重心应放在网关生命周期与 SQLite 运行时迁移上。

---

## 6. 功能请求与路线图信号

结合需求热度与已有 PR 关联度，判断纳入下一版本的可能性：

**高可能性（已有 PR 直接推进）**：
- **Slash 命令参数暂存**（[#123356](https://github.com/openclaw/openclaw/pull/123356)，XL，composer 阶段已实现）— 对应 #123306 的 UI 侧落地。
- **Activity Feed 自动化分组 + 实时状态 + 深链检查器**（[#125981](https://github.com/openclaw/openclaw/pull/125981)，steipete 今日新建）— 直接来自 #125917 工具栏重构的后续。
- **usage.status 不再阻塞等待 Provider HTTP**（[#121799](https://github.com/openclaw/openclaw/pull/121799)）— 修复全端 Usage 页面空白 3.5s 的问题。
- **Codex 模型认证就绪度可观测**（[#122779](https://github.com/openclaw/openclaw/pull/122779)）— 与 OpenAI 侧贡献者协作的诊断增强。

**中高呼声（讨论热但需产品决策）**：
- **[#79902](https://github.com/openclaw/openclaw/issues/79902)** SQLite transcript/session 开放接缝（14 评论）— 与 database-first 运行时方向天然契合，生态建设关键。
- **[#10687](https://github.com/openclaw/openclaw/issues/10687)** 全动态模型发现（OpenRouter 起步）— 带 `maintainer` 标签，长期高优先诉求。
- **[#60572](https://github.com/openclaw/openclaw/issues/60572)** 多槽位记忆架构（Multi-Slot Memory，有关联 PR 开启中）。

**观察项**：[#66252](https://github.com/openclaw/openclaw/issues/66252) 每代理 TTS/STT 覆盖（多语言）、[#49259](https://github.com/openclaw/openclaw/issues/49259) 孤儿会话清理、[#46058](https://github.com/openclaw/openclaw/issues/46058) Android 聊天优先界面上游化讨论。

---

## 7. 用户反馈摘要

从 Issue 正文与讨论中提炼的真实痛点：

**不满意（高频主题）**：
- **静默失败是最大抱怨**：回复静默截断（#84516）、技能列表静默裁剪（#50677）、FTS5 缺失静默降级（#62328）、消息静默丢失（#92186 WhatsApp 回复仅在 dashboard 可见）— 用户反复强调"没有任何错误提示"加剧了排查成本。
- **升级即坏**：2026.3.2、2026.5.3、2026.5.27、2026.7.1、2026.8.1-beta.2 均被点名引入回归，部分用户被迫本地热修（#90361、#88032 自行 patch 运行时），反映回归防护网存在缺口。
- **长链路代理可靠性**：cron 隔离会话覆写共享文件造成数据丢失（#40001）、单个瞬时网络错误导致整个多小时长回合报废（#117609）— 重度自动化用户的核心场景受损。
- **运维摩擦**：NVM node 警告无法消除（#60612）、PowerShell 环境贡献者命令失效（#44291）。

**满意/认可**：
- 社区对**带完整 bisect、复现与修复建议的报告**接受度高（如 #125679），维护者响应模型（clawsweeper 分诊标签体系）被认为透明。
- Beta 标签升级、Crabbox、Workboard 等新方向的 PR 质量说明详尽（问题、根因、方案三段式），用户参与共建意愿强（#122574、#125951 均为社区驱动）。
- 多 Provider 生态（DeepSeek、Kimi、MiMo、MiniMax、Gemini、Vertex）的用户基数明显，兼容性反馈活跃。

---

## 8. 待处理积压

⚠️ **建议维护者优先关注**：

**长期停滞的高影响 Issue**（均带 `clawsweeper-recovery-stuck`）：
- [#62505](https://github.com/openclaw/openclaw/issues/62505)（2026-04-07 开启，P1）— 4 个月无 fix PR，用户已流失风险高。
- [#84516](https://github.com/openclaw/openclaw/issues/84516)（2026-05-20，P1）— Codex 截断问题停滞 3 个月。
- [#40001](https://github.com/openclaw/openclaw/issues/40001)（2026-03-08，P1 数据丢失）— write 工具 append 模式缺失，涉及产品决策。
- [#10687](https://github.com/openclaw/openclaw/issues/10687)（2026-02-06，维护者标签）— 项目内最老的活跃功能请求之一，近半年无实质进展。
- [#41495](https://github.com/openclaw/openclaw/issues/41495)（2026-03-09）— Gemini 内联按钮输出原始 JSON，需 live repro。

**待维护者审阅的 PR 队列**（状态 👀 ready for maintainer look，评审积压）：
- [#123848](https://github.com/openclaw/openclaw/pull/123848)（SSRF 防护，安全相关，建议优先）
- [#123535](https://github.com/openclaw/openclaw/pull/123535)、[#125707](https://github.com/openclaw/openclaw/pull/125707)、[#123055](https://github.com/openclaw/openclaw/pull/123055)、[#123847](https://github.com/openclaw/openclaw/pull/123847)、[#123975](https://github.com/openclaw/openclaw/pull/123975) 等

**长期悬挂的社区 PR**：
- [#75299](https://github.com/openclaw/openclaw/pull/75299)（2026-04-30，优先级队列防饿死，needs proof 近 4 个月）
- [#90703](https://github.com/openclaw/openclaw/pull/90703)（2026-06-05，thinking xhigh 兼容，needs proof）
- [#109038](https://github.com/openclaw/openclaw/pull/109038)（SQLite CLI 历史恢复，XL，needs proof）

**健康度警示**：今日 Issue 关闭率仅 **8.5%**（39/461+39），`needs-maintainer-review` / `needs-product-decision` 标签的大量堆积表明**分诊吞吐已落后于社区增长**。建议在下一版本周期内集中清理 recovery-stuck 集群，并明确 P1 回归（#62505、#111372、#124788）的负责人与时限。

---

*数据来源：OpenClaw GitHub Issues/PRs（2026-08-18 ~ 2026-08-19）。本报告基于公开仓库活动生成，链接均指向对应条目。*

---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>



</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*