# OpenClaw 生态日报 2026-06-23

> Issues: 232 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-06-23 04:32 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

以下是为您生成的 OpenClaw 项目 2026-06-23 动态日报。

# 🪶 OpenClaw 项目动态日报 (2026-06-23)

## 1. 今日速览
今日 OpenClaw 项目保持了极高的活跃度，过去 24 小时内共处理了 **232 条 Issue 动态**（其中关闭 87 条）和 **500 条 PR 动态**（合并/关闭 63 条）。项目按时推进了 **v2026.6.10-beta.2** 版本的发布，核心改进集中在会话模式的自动快速切换和模型路由的可靠性上。然而，社区当前正面临由于底层存储架构迁移（SQLite）和多模型兼容性引发的一系列状态管理挑战，多个 P1 级别的数据丢失和会话挂起 Bug 正在密集讨论与修复中。

## 2. 版本发布
### 🚀 [v2026.6.10-beta.2](https://github.com/openclaw/openclaw/releases) 
**更新亮点：**
- **会话自动快速模式：** OpenClaw 现在可以在简短的对话轮次中自动启用快速模式，而在长文本运行时返回正常模式，并带有边界回退和交付行为保障。感谢社区贡献者 @alexphc-dev 和 @vincentkoc。
- **更可靠的模型路由：** 针对 Zai 及其他模型的路由稳定性进行了优化。

## 3. 项目进展
今日项目在底层架构和功能完善方面合并/推进了多个重要 PR：
- **模型路由与推断改进：** [PR #91724](https://github.com/openclaw/openclaw/pull/91724) 已关闭/合并，现在系统可以从限定的模型 ID 中自动推断运行时提供商，极大改善了多模型环境下的路由策略。
- **CI 与质量保证提速：** [PR #95944](https://github.com/openclaw/openclaw/pull/95944) 大幅优化了统一 QA 测试套件的执行速度，解决了此前测试流程阻塞 PR 合并的问题。
- **插件接口重构（推进中）：** [PR #59986](https://github.com/openclaw/openclaw/pull/59986) 引入了面向通道的插件接口，正在致力于消除 Telegram/Discord 等不同通讯平台之间的硬编码逻辑，使丰富的交互体验更具可移植性。
- **自动化工具引入：** [PR #68936](https://github.com/openclaw/openclaw/pull/68936) 引入了 PR 审查自动修复流水线及 Windows 后台守护进程，有望大幅减轻维护者的代码审查负担。

## 4. 社区热点
- **[Issue #88838](https://github.com/openclaw/openclaw/issues/88838) (34 评论):** 核心会话/记录 SQLite 迁移追踪。这表明项目正在进行深度的底层存储重构（文件支持的接缝采用阶段），是近期架构变动的核心焦点。
- **[Issue #90370](https://github.com/openclaw/openclaw/issues/90370) (11 评论) & [Issue #84527](https://github.com/openclaw/openclaw/pull/84527) (9 👍):** 社区强烈呼吁支持 **PostgreSQL 替代 SQLite**，以及使用新的 **Antigravity CLI (`agy`) 替代已废弃的 Google Gemini CLI**。这两个请求反映了企业级用户对高并发存储以及外部工具生命周期的刚性诉求。

## 5. Bug 与稳定性
今日报告了多个严重影响用户体验的 Bug，主要集中在会话状态丢失和子代理通信上：
- **🚨 数据丢失与迁移静默失败 (P1):** [Issue #95495](https://github.com/openclaw/openclaw/issues/95495) 报告升级到 2026.6.9 后，内存向量存储位置被静默迁移且无提示，导致用户必须对 1499 个文件进行全量重新嵌入。
- **🚨 回归问题 (P1):** [Issue #88312](https://github.com/openclaw/openclaw/issues/88312) 报告 Codex app-server 在多工具代理轮次中出现完成停滞的回归。
- **🔒 会话锁死与状态污染 (P1):** 
  - [Issue #95833](https://github.com/openclaw/openclaw/issues/95833): 子代理中断结算未能释放 `.jsonl.lock`，导致会话永久阻塞。
  - [Issue #90991](https://github.com/openclaw/openclaw/issues/90991)(已关闭): Cron 定时任务污染全局运行时状态，导致系统范围的瞬时过载。
- **💻 平台兼容性 (P2):** [Issue #94147](https://github.com/openclaw/openclaw/issues/94147) macOS 桌面端 CLLocationManager 每秒重建导致 TCC 权限疯狂请求。

## 6. 功能请求与路线图信号
根据最新 Issues 和 PR，下一版本的重点可能集中在以下方向：
- **内存索引去重：** [Issue #95724](https://github.com/openclaw/openclaw/issues/95724) 提出按源目录而非 Agent 级别进行内存索引，以消除同一工作空间下多代理的重复向量存储。
- **CLI 诊断增强：** [PR #80789](https://github.com/openclaw/openclaw/pull/80789) 提议增加 `openclaw context map` 命令，允许用户直接在终端生成上下文树图，这将极大方便开发者的调试体验。
- **频道精细化控制：** [Issue #53638](https://github.com/openclaw/openclaw/issues/53638) 请求按频道/群组/私信级别覆盖模型配置，目前已有相关 PR 开启，有望近期落地。

## 7. 用户反馈摘要
通过分析评论摘要，提炼出当前用户的几个核心痛点：
1. **第三方模型兼容性差：** 大量用户反馈（如 [Issue #90288](https://github.com/openclaw/openclaw/issues/90288), [Issue #88657](https://github.com/openclaw/openclaw/issues/88657)）在通过 Anthropic 兼容层使用 MiniMax、DeepSeek 等非 Anthropic 模型时，模型经常将 Tool 调用以纯文本输出，导致会话中断或产生“僵尸状态”。
2. **交付通道不可靠：** 许多操作者抱怨（如 [Issue #86034](https://github.com/openclaw/openclaw/issues/86034), [Issue #92460](https://github.com/openclaw/openclaw/issues/92460)）任务（如图片生成或定时报告）实际已成功执行，但系统未能将结果推送到对应频道，导致呈现出虚假的失败状态。
3. **安全与审核机制过于僵化：** 容器化自托管用户指出（[Issue #92516](https://github.com/openclaw/openclaw/issues/92516)），插件解绑后，外部通道插件无法通过受信验证，增加了极大的部署难度。

## 8. 待处理积压
以下高影响力且长期讨论的问题仍处于待办/需产品决策状态，需核心团队关注：
- **[Issue #86538](https://github.com/openclaw/openclaw/issues/86538) (P1, 创建于 05-25):** 会话 JSONL 写入锁超时阻塞子代理交付通道，目前仍需产品决策和现场重现。
- **[Issue #92201](https://github.com/openclaw/openclaw/issues/92201) (P1, 创建于 06-11):** 嵌入式运行器在重播时思考签名间歇性失效（Anthropic），恢复包装器未能触发。
- **[Issue #85822](https://github.com/openclaw/openclaw/issues/85822) (P1, 创建于 05-23):** Discord 本地轮次存在约 48 秒的静默保留期，导致延迟高达 50-65 秒。

---
*本报告由 AI 智能体基于 GitHub 数据自动生成。数据反映了 OpenClaw 在向多通道、多模型复杂代理架构演进过程中的典型阵痛，建议持续关注底层 SQLite 及路由机制的重构进展。*

---

## 横向生态对比

以下是基于 2026-06-23 两个开源项目动态生成的横向对比分析报告：

# 2026-06-23 AI 智能体与个人助手开源生态横向分析报告

## 1. 生态全景
当前，个人 AI 助手与自主智能体开源生态正处于从“单体对话工具”向“多通道、多模型协同的复杂代理架构”跨越的深水区。开源社区高度活跃，项目迭代极快，核心焦点集中在跨平台网关接入（如微信/Telegram/钉钉）、底层模型路由的解耦以及长效记忆与状态管理的稳定性上。同时，随着应用场景的复杂化，底层架构升级（如数据库迁移）带来的阵痛、并发状态锁死以及安全边界挑战，正成为各头部开源项目共同面临的技术瓶颈。

## 2. 各项目活跃度对比
今日两大头部项目均保持了极高的代码与社区吞吐量，展现出强劲的发展势头。

| 项目名称 | Issue 动态 | PR 动态 | Release 情况 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 232 条 (关闭 87) | 500 条 (合并/关闭 63) | **1 个** (v2026.6.10-beta.2) | **中高**。<br>处于底层架构（存储/路由）重构期，社区呼声高，但出现数据丢失及锁死等阻断级 P1 Bug。 |
| **Hermes Agent** | 253 条 (新开/活跃 218) | 500 条 (合并/关闭 151) | **0 个** (酝酿 v0.16.0) | **高**。<br>处于发布前密集代码审查与整合阶段，PR 合并率极高，侧重于多平台适配与安全/性能修复。 |

## 3. OpenClaw 在生态中的定位
相较于 Hermes Agent 侧重于“快速打通各类即时通讯平台与桌面端体验”的前端触达，**OpenClaw 的定位更偏向于构建高扩展性的底层智能体基座与路由枢纽**。
*   **技术路线差异**：OpenClaw 热衷于底层运行时的绝对控制（如自动推断提供商、会话快速/正常模式自动切换、内存向量索引去重）；而 Hermes 更注重网关层面的健壮性与多配置管理。
*   **社区规模对比**：两者的基本盘（Issue/PR 活跃度）处于同一梯队。但 OpenClaw 的社区讨论更具深度，例如直接爆发了 SQLite vs. PostgreSQL 的企业级存储路线之争。
*   **核心优势**：OpenClaw 在多模型兼容（Anthropic 兼容层、Zai模型等）和上下文精细化控制方面走在前面，更适合需要深度定制工作流的重度开发者或企业级部署。

## 4. 共同关注的技术方向
通过提炼两个项目的演进轨迹，以下四大技术方向已成为行业共识：
1.  **去中心化的多模型路由**：摆脱单一网关限制。（*OpenClaw* 优化运行时提供商推断；*Hermes Agent* 社区强烈呼吁原生 Google Vertex AI 支持，以绕开 OpenRouter 的 402 限流）。
2.  **跨平台网关与通道解耦**：统一多通讯平台的交互体验。（*OpenClaw* 正在重构面向通道的插件接口；*Hermes Agent* 在快速接入微信扫码、钉钉主动推送并进行按平台配置化路由）。
3.  **长效记忆与状态存储稳定性**：应对复杂并发下的数据安全。（*OpenClaw* 遭遇 SQLite 迁移导致的静默全量重嵌入危机及 JSONL 写入锁死；*Hermes Agent* 面临 macOS 高负载下 `state.db` 损坏的毁灭性 Bug）。
4.  **多 Agent 协同与编排**：从单核走向多核。（*OpenClaw* 探索子代理通信与内存索引去重；*Hermes Agent* 呼吁支持自定义 Agent 画像与多智能体看板协同工作流）。

## 5. 差异化定位分析
*   **功能侧重**：OpenClaw 钻研**上下文与运行时管理**（如 CLI 诊断、思考签名失效恢复）；Hermes Agent 侧重**多端用户体验与安全隔离**（如引入 TLS 拦截凭据注入防火墙、Intel Mac 与 i18n 支持）。
*   **目标用户**：OpenClaw 正在向**企业级高并发场景**演进（PostgreSQL 诉求、容器化自托管验证）；Hermes Agent 则在极力讨好**C 端与极客玩家**，通过 Web Dashboard、飞书/Discord 细分路由提供极佳的开箱即用体验。
*   **技术架构痛点**：OpenClaw 当前受制于遗留代码的重构（如 CLI 工具更替、文件锁机制）；Hermes Agent 则受制于跨平台客户端的工程包袱（如 Electron 构建失败、Windows GBK 编码兼容、macOS launchd 守护进程冲突）。

## 6. 社区热度与成熟度
*   **快速迭代与扩张期（Hermes Agent）**：以极快的 PR 合并速度（单日 151 个）修复各类长尾体验问题（如 Telegram 消息溢出死循环、配置加载耗时），在功能广度（多平台、多语言）上狂奔，正冲刺 v0.16.0 版本。
*   **质量巩固与重构期**：当前正处于底层架构换代的“阵痛期”。单日处理大量 P1 级别的数据丢失、会话挂起和伪装越权（Hermes Agent 的系统伪装用户漏洞）问题。这标志着项目在向生产级应用靠拢时，必须经历严苛的安全与稳定性洗牌。

## 7. 值得关注的趋势信号
1.  **“中转层”的衰退与原生接入的觉醒**：开发者对 OpenRouter 等第三方 API 代理的限流容忍度已达临界点，支持原厂 API 凭据（如原生 Vertex AI OAuth）将成为下一阶段 AI 助手的基础能力。
2.  **本地向量数据库的“并发诅咒”**：无论是 SQLite 还是 `.jsonl.lock`，在多 Agent 并发读写时均暴露出致命缺陷。企业级用户要求平滑迁移至 PostgreSQL 等成熟关系型数据库的趋势不可逆转。
3.  **长时记忆的“状态感知”成为刚需**：当会话闲置过期或中断重置时，系统被要求必须向用户和 Agent 本身发出警告（如 Hermes 的 Issue #43008），而非静默重置，这标志着 AI 助手正从“无状态工具”向“有状态的数字员工”转化。
4.  **安全沙盒面临反制挑战**：Agent 自主更新技能库带来了权限越权风险（如绕过审查修改自身配置），针对智能体的动态沙盒隔离（如 TLS 拦截防火墙）正在成为开源生态的热门新赛道。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

**Hermes Agent 项目动态日报 (2026-06-23)**

### 1. 今日速览
今日 Hermes Agent 项目维持了极高的社区活跃度，过去 24 小时内共处理了 **253 条 Issue 动态**（新开/活跃 218 条，关闭 35 条）以及高达 **500 条 PR 动态**（合并/关闭 151 条）。项目当前正处于高频迭代与社区反馈爆发期，尤其是在跨平台网关（微信、钉钉、Discord）、多模型路由（原生 Vertex AI 支持）以及桌面端体验（Intel Mac 支持、i18n）方面吸引了大量讨论。尽管今日无新版本发布，但大量针对稳定性、安全性和 Windows 平台兼容性的修复 PR 已被合并，整体代码库健康度稳步提升。

### 2. 版本发布
**今日无新版本发布 (0 个 Release)。**
注：当前项目存在大量针对 v0.16.0 及后续版本的适配与修复 PR，预计项目正处于下一版本发布前的密集代码审查与整合阶段。

### 3. 项目进展
今日共有 **151 个 PR 被合并或关闭**，项目在平台生态扩展、安全边界增强和性能优化方面取得了显著进展：
*   **平台生态与企业级支持**：[PR #12769](https://github.com/NousResearch/hermes-agent/pull/12769) 大幅升级了钉钉平台适配器，引入主动消息推送和媒体管线；[PR #50044](https://github.com/NousResearch/hermes-agent/pull/50044) 实现了基于 Web 的微信扫码接入，使其对齐 Telegram 的接入体验，大幅降低了使用门槛。
*   **安全与沙盒隔离**：核心成员 @teknium1 提交的 [PR #30179](https://github.com/NousResearch/hermes-agent/pull/30179) 引入了针对远程终端沙盒的 TLS 拦截凭据注入防火墙，显著提升了沙盒被攻破时的 API Key 安全性。
*   **性能与开发体验**：[PR #51194](https://github.com/NousResearch/hermes-agent/pull/51194) 修复了 `list_profiles` 的 O(N*M) 扫描问题，执行时间从 6.4 秒骤降至 0.4 秒，解决了桌面端侧边栏加载超时的痛点。
*   **跨语言与国际化**：[PR #38846](https://github.com/NousResearch/hermes-agent/pull/38846) 为桌面端引入了支持 15 种语言的国际化(i18n)系统，目前正与上游原生框架进行对齐整合。

### 4. 社区热点
今日讨论度最高的话题集中在**模型提供商路由限制**与**桌面端架构支持**：
*   **强烈呼唤原生 Google Vertex AI 支持**：[Issue #12639](https://github.com/NousResearch/hermes-agent/issues/12639) (11条评论, 10个点赞) 和 [Issue #13484](https://github.com/NousResearch/hermes-agent/issues/13484) (8条评论, 12个点赞) 反映了用户对绕过 OpenRouter (频繁触发 402 限流限制) 的强烈诉求，用户急需原生的 Vertex AI OAuth 凭据机制。
*   **Intel Mac 用户遭遇冷落**：[Issue #42199](https://github.com/NousResearch/hermes-agent/issues/42199) 和 [Issue #37505](https://github.com/NousResearch/hermes-agent/issues/37505) 引发了广泛共鸣。目前 DMG 安装包仅提供 ARM64 架构，导致 Intel Mac 用户直接遇到 `Bad CPU type` 错误，由于 Rosetta 2 无法反向兼容，这批用户目前完全无法使用桌面端。
*   **自定义多 Agent 编排需求**：[Issue #9459](https://github.com/NousResearch/hermes-agent/issues/9459) 获得了高达 17 个点赞，用户希望 `delegate_task` 能够通过配置文件加载自定义的 Agent 画像，构建类似 Pantheon 的多智能体协同框架。

### 5. Bug 与稳定性
今日报告了多个影响严重的 Bug（P1/P2级别），部分已有对应修复：
*   **[P1 / 安全] Agent 伪装成用户绕过审查**：[Issue #25839](https://github.com/NousResearch/hermes-agent/issues/25839) 指出系统在后台更新技能库时，注入了伪装成 `role: "user"` 的提示词，导致并行的 Agent 实例在未经授权的情况下修改了技能库。（亟待修复）
*   **[P1 / 状态损坏] macOS 高负载下 state.db 损坏**：[Issue #30636](https://github.com/NousResearch/hermes-agent/issues/30636) 指出在 macOS launchd 关闭时发送 SIGTERM 信号会导致 SQLite 数据库 `state.db` 损坏。
*   **[P1 / 构建] 桌面端构建失败**：[Issue #47917](https://github.com/NousResearch/hermes-agent/issues/47917) 报告拉取最新代码后，Electron 缓存失效导致桌面端构建再次失败。
*   **[P2 / 崩溃] 中文 Windows 环境编码报错**：[Issue #48316](https://github.com/NousResearch/hermes-agent/issues/48316) 指出在 GBK 代码页的 Windows 上启动 CLI 会因缺少 `concurrent_log_handler` 或遇到 `UnicodeDecodeError` 而崩溃。已有进展：[PR #51172](https://github.com/NousResearch/hermes-agent/pull/51172) 和 [PR #51177](https://github.com/NousResearch/hermes-agent/pull/51177) 正在统一为 `read_text/write_text` 强制指定 `utf-8` 编码。
*   **[P2 / 无限循环] Telegram 流式消息溢出**：[Issue #48648](https://github.com/NousResearch/hermes-agent/issues/48648) 指出消息超过 4096 字符限制时，网关会陷入无限的嵌套回复死循环。

### 6. 功能请求与路线图信号
从今日的 Issues 和 PR 活动中，可以清晰看出项目下一阶段的演进路线图信号：
*   **平台级解耦与高级路由**：不仅需要原生 Vertex 支持，[Issue #38954](https://github.com/NousResearch/hermes-agent/issues/38954) 还提出了基于角色的自动模型路由，以及 [Issue #14327](https://github.com/NousResearch/hermes-agent/issues/14327) 提出的按平台（如飞书、Discord）配置不同底层模型的诉求。
*   **网关健壮性与状态感知**：[Issue #43008](https://github.com/NousResearch/hermes-agent/issues/43008) 强调了会话因闲置过期重置时，系统应当对用户和 Agent 本身发出上下文丢失的警告信号，而不是静默重置。这表明项目正在向具有高度状态感知力的长时记忆代理演进。
*   **多看板与审查工作流**：[Issue #42896](https://github.com/NousResearch/hermes-agent/issues/42896) 和 [Issue #35986](https://github.com/NousResearch/hermes-agent/issues/35986) 表明社区正试图将 Hermes 应用于更复杂的多 Agent 看板协同和人工干预审查工作流中。

### 7. 用户反馈摘要
*   **痛点 - OpenRouter 成为一道“墙”**：大量重度用户反馈 OpenRouter 的额度限制和 402 错误严重干扰了自动化工作流，直接使用原厂 API Key 的呼声极高。
*   **痛点 - Intel Mac 用户的失落**：多位 2019/2020 款 Mac 用户表示被新版 DMG 抛弃，影响了日常使用。
*   **痛点 - macOS 文件描述符(fd)限制**：重度使用者（多配置+多MCP服务器）在 [Issue #30230](https://github.com/NousResearch/hermes-agent/issues/30230) 反馈 macOS 默认的 256 个 fd 上限极易被网关打满导致 OSError，迫使用户手动修改系统底层 `launchctl` 参数。
*   **满意度 - Web Dashboard 广受欢迎**：Web 控制台的多配置切换功能 ([Issue #10674](https://github.com/NousResearch/hermes-agent/issues/10674)) 和会话选择器 ([Issue #16545](https://github.com/NousResearch/hermes-agent/issues/16545)) 获得了积极反馈，用户认为这极大改善了多线程工作的体验。

### 8. 待处理积压
以下高影响力或高优级别的议题滞留已久，需维护者重点关注：
*   **[P1 安全漏洞] 系统伪装用户身份 ([Issue #25839](https://github.com/NousResearch/hermes-agent/issues/25839))**：创建于 2026-05-14，至今未完全 Close，多 Agent 并发环境下的权限越权风险极高。
*   **[P1 数据稳定性] 数据库损坏 ([Issue #30636](https://github.com/NousResearch/hermes-agent/issues/30636))**：macOS 强杀进程导致数据损坏的问题对用户数据具有毁灭性，需尽快引入更安全的 SQLite 写入或备份机制。
*   **[P2 死循环] launchd 下执行 `/restart` 导致网关彻底宕机 ([Issue #43475](https://github.com/NousResearch/hermes-agent/issues/43475))**：在 macOS 下使用 `/restart` 指令会导致进程退出后无法被 launchd 唤醒，属于阻断级体验问题。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*