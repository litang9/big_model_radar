# OpenClaw 生态日报 2026-07-28

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-07-27 21:23 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

这份报告基于 OpenClaw 项目 2026-07-27 的 GitHub 动态数据生成。

### OpenClaw 项目动态日报 (2026-07-28)

#### 1. 今日速览
OpenClaw 项目今日保持了极高的活跃度，Issue 和 PR 更新总数均达到 500 条上限。数据处理显示，今日关闭了 269 个 Issue（新开 231 个），合并/关闭了 218 个 PR（待合并 282 个），**项目处于“净收支尾”的健康状态，表明维护团队正在进行高强度的缺陷修复与代码合并工作**。核心焦点集中在修复网关内存泄漏、多渠道（Telegram/WhatsApp/Teams）状态同步死锁，以及底层沙箱安全边界的增强。今日无新版本发布，但大量 Beta 版本的修复 PR 已进入“等待维护者审核”状态，预示着下一次版本更新将包含重大稳定性提升。

#### 2. 版本发布
**本日无新版本发布 (0 个 Release)**。
项目当前似乎正处于 `2026.7.2-beta.4` 迭代周期的尾声，大量针对 Beta 版本中状态迁移、网关内存和会话死锁的修复 PR 正在密集合并中。

#### 3. 项目进展
今日主仓库共有 218 个 PR 被合并或关闭，主要进展集中在**生命周期管理、架构重构和安全隔离**：
*   **修复生命周期与状态竞争：** 核心贡献者 @steipete 提交并推进了多个关键 PR，包括防止 cron 任务与 Workboard 生命周期竞争的修复方案，以及修复队列任务过期丢失的问题。([PR #114744](https://github.com/openclaw/openclaw/pull/114744), [PR #112877](https://github.com/openclaw/openclaw/pull/112877))
*   **底层架构清理与重构：** 合并了关于统一插件安装流水线、迁移工作区记录的 XL 级重构 PR，减少了核心层的所有权拆分冗余。另外，清理了孤立的内存影子试验功能和过时的配置别名。([PR #114749](https://github.com/openclaw/openclaw/pull/114749), [PR #114709](https://github.com/openclaw/openclaw/pull/114709))
*   **新增沙盒后端支持：** 引入了 `sbx` (Docker Sandboxes) 作为 OpenClaw 沙箱环境的新后端，进一步增强了 Agent 执行代码时的隔离能力。([PR #114168](https://github.com/openclaw/openclaw/pull/114168))
*   **标准化托管与合规：** 推进了标准托管配置文件及验证工具的大型特性 PR，为企业级部署提供基础。([PR #113422](https://github.com/openclaw/openclaw/pull/113422))

#### 4. 社区热点
*   **Linux/Windows 原生客户端需求居高不下：** 请求支持 Linux 和 Windows Clawdbot 桌面应用的 Issue ([#75](https://github.com/openclaw/openclaw/issues/75)) 已累计 115 条评论和 80 个赞。社区对脱离 Web UI 的原生跨平台体验呼声极高。
*   **Agent 安全性与记忆防毒：** 关于“记忆信任分级” ([#7707](https://github.com/openclaw/openclaw/issues/7707)) 和“API Key 掩码防泄漏” ([#10659](https://github.com/openclaw/openclaw/issues/10659)) 的讨论热度攀升。用户深刻意识到 Agent 在读取外部网页或加载第三方技能时可能遭受的提示词注入和记忆污染攻击，迫切需要从系统底层建立零信任机制。
*   **多渠道消息处理的挫折感：** Telegram 消息重复发送的回归 Bug ([#86519](https://github.com/openclaw/openclaw/issues/86519)) 引发大量讨论，这直接破坏了用户在 IM 场景下的日常体验。

#### 5. Bug 与稳定性
今日报告的 Bug 重点集中在网关稳定性与状态机异常，严重程度极高：
*   **[P0 严重] 网关内存泄漏与 OOM 崩溃：** Issue [#91588](https://github.com/openclaw/openclaw/issues/91588) 指出网关常驻内存会在几天内从 350MB 暴增至 15.5GB，导致被系统 OOM Killer 反复终结。另外，macOS 上空闲状态堆内存突破 1073MB 导致 cron 任务静默失败 ([#87109](https://github.com/openclaw/openclaw/issues/87109))。这两个内存问题严重影响 Agent 的 24/7 挂机可用性。
*   **[P0 严重] Beta 状态迁移致命错误：** Issue [#109867](https://github.com/openclaw/openclaw/issues/109867) 报告 `2026.7.2-beta.2` 在 SQLite 迁移时，在添加列之前创建了索引，直接阻断网关启动（已有修复关联）。
*   **[P1 回归] 消息通道阻塞与丢失：** 
    *   WhatsApp 长时间模型调用导致会话挂起，最终消息不投递 ([#84569](https://github.com/openclaw/openclaw/issues/84569))。
    *   Telegram 入站更新被确认但彻底丢失，导致消息永久性无响应 ([#113315](https://github.com/openclaw/openclaw/issues/113315))。
*   **[P1 回归] Codex 会话 RAM 耗尽：** Codex 会话重置复用旧 ID，并且目录/文件扫描会导致网关 RAM 耗尽崩溃 ([#113434](https://github.com/openclaw/openclaw/issues/113434))。

#### 6. 功能请求与路线图信号
结合 Issue 需求与当前推进的 PR，可预测以下方向的演进：
*   **精细化安全与权限控制：** 用户呼吁支持执行审批黑名单 ([#6615](https://github.com/openclaw/openclaw/issues/6615))、标准化的技能权限清单 `skill.yaml` ([#12219](https://github.com/openclaw/openclaw/issues/12219)) 以及文件系统沙箱配置 ([#7722](https://github.com/openclaw/openclaw/issues/7722))。这与今天合并的 `sbx` 沙盒后端、GPT 编码测试框架安全隔离等 PR 高度吻合，说明**“隔离与细粒度授权”是下个大版本的核心路线**。
*   **动态模型发现与成本管控：** 呼吁针对 OpenRouter 等提供商支持完全动态的模型发现 ([#10687](https://github.com/openclaw/openclaw/issues/10687))，以及在超出上下文长度时触发模型回退 ([#9986](https://github.com/openclaw/openclaw/issues/9986))。社区希望 Agent 具备更高的容错与算力调度能力。
*   **远端镜像与企业协同：** 最新推进的将本地编码会话持续镜像到远端 Beam 接收器 ([PR #114735](https://github.com/openclaw/openclaw/pull/114735))，表明项目正在向团队协作和云端监控场景延伸。

#### 7. 用户反馈摘要
从评论和 Issue 内容提炼出真实用户的痛点：
*   **IM 用户体验受损：** IM 平台（Telegram/WhatsApp）对延迟极其敏感，用户反馈“Agent 重复回复”、“卡死需重启”、“静默失败不报错”带来了极大的困惑。
*   **Token 浪费焦虑：** 开发者用户对底层机制不够透明感到不满，例如系统提示词每轮重复注入导致上下文膨胀浪费 30% Token ([#67419](https://github.com/openclaw/openclaw/issues/67419))，以及 OpenAI 路径动态注入导致 Prompt-cache 缓存失效成本增加 ([#95610](https://github.com/openclaw/openclaw/issues/95610))。
*   **高可用性受挫：** 长期运行的个人 AI 助手（24/7 模式）极易遇到内存泄漏、死锁和状态死循环。用户期望有更健壮的自我恢复机制。

#### 8. 待处理积压
以下高影响力 Issue 长期未彻底解决或处于无对应修复 PR 的停滞状态，需提请维护者优先排期：
*   **会话上下文臃肿与 Token 浪费：** [#67419](https://github.com/openclaw/openclaw/issues/67419)。Bootstrap 文件在多轮对话中每轮重复注入，急需优化 Prompt 持久化与差异更新策略。
*   **Codex App-Server 静默卡死：** [#85251](https://github.com/openclaw/openclaw/issues/85251)。等待 360 秒超时强制终止的机制严重伤害了体验，长期处于 Recovery Stuck 状态。
*   **OpenAI 提示词缓存失效：** [#95610](https://github.com/openclaw/openclaw/issues/95610)。导致重度用户使用 GPT-5.5 系列模型的 API 成本激增，尚未有明确的底层修复 PR。

---

## 横向生态对比

以下是基于 2026 年 7 月 28 日 GitHub 开源社区动态，为您生成的 AI 智能体与个人助手生态横向对比分析报告。

---

### 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于**从“功能验证”向“企业级高可用与深度协同”演进的关键拐点**。一方面，智能体接入的通信渠道（WhatsApp, Telegram, Buzz, 邮件）与底层执行环境（沙箱、多操作系统）正在极速膨胀，推动其从“个人工具”向“团队协作节点”进化；另一方面，随着 24/7 挂机和多模型编排成为常态，**底层网关稳定性、上下文工程（Token/缓存优化）以及细粒度安全隔离**已成为决定项目生死的核心战役。

### 2. 各项目活跃度对比 (2026-07-28)
| 项目名称 | Issues 动态 (新开/关闭) | PRs 动态 (处理/待合并) | 版本发布 | 健康度与阶段评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 条 (新开 231 / 关闭 269) | 500 条 (合并关闭 218 / 待合并 282) | 0 (Beta 尾声) | **良好 (质量巩固期)**：Issue 净关闭，聚焦核心 P0 级网关与内存泄漏修复，处于发版前的稳定性收尾阶段。 |
| **Hermes Agent** | 500 条 (96% 为新开/活跃) | 500 条 (合并关闭 103 / 待合并 397) | 0 (蓄力中) | **过载 (快速迭代期)**：新需求爆发，但 PR 审查管道严重阻塞，维护流水线面临极大挑战。 |

### 3. OpenClaw 在生态中的定位
与同类项目相比，**OpenClaw 展现出更强的“基础设施化”与“企业级底座”特征**：
*   **技术路线差异：** 当其他项目还在横向扩展 UI 和对接渠道时，OpenClaw 的核心贡献正在向底层纵深推进，例如引入 `sbx` (Docker Sandboxes) 强化隔离、推进标准化托管配置、以及解决 SQLite 状态迁移等底层致命错误。
*   **社区规模与成熟度对比：** 面对同样高达 500 条/天的社区动态，OpenClaw 维护团队展现了更强的吞吐能力（单日合并关闭 218 个 PR，远超 Hermes 的 103 个）。其 Issue 生命周期管理更健康，进入了“净收支尾”的良性循环。
*   **核心优势：** 在重度使用场景下（如 24/7 挂机、IM 高频同步）的容错与自愈能力正在成为其核心护城河。

### 4. 共同关注的技术方向
通过对双端数据的挖掘，以下技术诉求正在成为全行业的共识：
*   **跨平台消息编排与无缝集成** *(涉及：OpenClaw, Hermes Agent)*：突破单一 IM 限制。OpenClaw 致力于解决 Telegram/WhatsApp 的状态死锁；Hermes 则在引入 Buzz、Signal，并实现基于线程的邮件会话路由，旨在让 Agent 无缝介入人类现有的通讯流。
*   **细粒度沙箱隔离与执行安全** *(涉及：OpenClaw, Hermes Agent)*：智能体执行任意代码的风险被高度关注。OpenClaw 引入 `sbx` 后端并呼吁零信任记忆机制；Hermes 引入 `Tenki` 作为第七种终端沙箱后端。
*   **多模型动态调度与成本管控** *(涉及：OpenClaw, Hermes Agent)*：底层对多 LLM 的适配不再是简单的 API 指向。社区要求具备动态模型发现（OpenRouter）、超出上下文自动回退、以及精准的计费追踪（如解决 Anthropic 缓存计费漏算问题）。

### 5. 差异化定位分析
| 维度 | OpenClaw | Hermes Agent |
| :--- | :--- | :--- |
| **功能侧重** | **高可用网关与企业底座**：专注于状态机健壮性、内存生命周期管理、权限合规与底层隔离。 | **超级控制中心与多端体验**：专注于桌面端 UI/UX 重构、多智能体编排（ACP 客户端）、跨网关协同。 |
| **目标用户** | 面向需要 **7x24 小时不间断运行**的重度个人极客、以及需要标准化部署的**企业团队**。 | 面向重度桌面端使用者、需要频繁对接**异构 LLMs 与多通讯渠道**的集成开发者。 |
| **架构痛点** | 攻坚 OOM、底层迁移错误、上下文重复注入导致的 Token 浪费。 | 攻坚不同操作系统（特别是 Win/Android）的开箱即用兼容性、UI 信息降噪及配置同步。 |

### 6. 社区热度与成熟度
*   **质量巩固阶段：OpenClaw**。目前没有盲目增加新特性，而是进入缺陷清理模式（关闭数大于新开数）。针对 API 缓存失效、OOM、会话静默卡死等高危问题的集中修复，标志着项目正在褪去实验性质，向生产级成熟度迈进。
*   **快速迭代阶段：Hermes Agent**。社区热度极高，大量关于新协议（ACP）、新平台的原生支持需求涌现。但项目正处于成长阵痛期，高达 397 个待合并 PR 表明代码审查机制已出现瓶颈，极易引发合并冲突与核心贡献者流失。

### 7. 值得关注的趋势信号
以下信号对 AI 智能体开发者与技术决策者具有强烈的指引价值：
1.  **“上下文工程”正在取代简单的“提示词工程”：** OpenClaw 暴露的 Bootstrap 文件重复注入、Prompt-cache 失效问题证明，如何精细化管理系统提示词的持久化与差异更新，将直接决定应用 30% 以上的运行成本。
2.  **智能体互操作性（ACP 协议）即将爆发：** Hermes 社区对“通用 ACP 客户端”的强烈呼声，意味着未来的 AI 助手不再是孤岛，而是需要具备“雇佣”和“编排”其他 CLI 代理（如 Claude Code）的能力，多智能体协同将从理论走向本地化落地。
3.  **记忆防毒与零信任架构成为刚需：** 随着智能体读取外部网页或加载第三方技能的频率增加，针对 API Key 的掩码防泄漏、信任分级机制被提上日程（如 OpenClaw 的诉求）。开发者在设计 Agent 架构时，必须从起步阶段引入技能权限清单（`skill.yaml` 等）。
4.  **IM 平台反客为主的挑战：** 将 WhatsApp/Telegram 作为主要交互界面面临严峻的技术挑战（如 24 小时回复窗口、长文本回复导致的会话挂起）。智能体需要具备更智能的异步重试与超时静默处理机制。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

以下是关于 Hermes Agent (github.com/NousResearch/hermes-agent) 截至 2026 年 7 月 28 日的项目动态日报。

### 1. 今日速览
今日 Hermes Agent 项目呈现出极高的社区活跃度与开发强度。过去 24 小时内，项目处理了高达 500 条的 Issue 更新（其中新开和活跃占比极高，达 96%）以及 500 条 PR 更新（目前仍有 397 个 PR 处于待合并状态，当日合并/关闭 103 个）。尽管没有发布新版本（Release），但开发者与社区成员在 Desktop 桌面端 UI/UX 优化、多模型提供商适配（Codex, Anthropic）、跨平台消息集成（Buzz, Signal, Email）以及底层网关稳定性方面进行了密集的讨论与代码贡献。庞大的未合并 PR 积压表明项目正处于功能迭代的高峰期，同时也对维护者的代码审查流水线提出了严峻挑战。

### 2. 版本发布
**本日无新版本发布。** 
（注：根据 Issue 描述，当前代码库版本处于 `v0.19.0` 左右，社区正通过密集的 PR 提交为下一个大版本蓄力。）

### 3. 项目进展
今日虽然没有发版，但通过大量 PR 的提交与合并，项目在以下几个维度取得了实质性进展：
*   **Desktop 端 UI/UX 大幅重构：** 开发者 `@OutThisLife` 提交了多个高质量 PR，优化了桌面端体验。包括折叠连续的工具调用记录以减少界面噪音（[PR #72893](https://github.com/NousResearch/hermes-agent/pull/72893)）、重构侧边栏空白会话收纳为 "Home project"（[PR #72900](https://github.com/NousResearch/hermes-agent/pull/72900)）、修复差异视图颜色漂移及进程退出时的保护机制（[PR #72897](https://github.com/NousResearch/hermes-agent/pull/72897)）。
*   **跨平台消息与调度能力增强：**
    *   Email 平台适配器迎来了基于线程的会话路由功能，解决了同一发件人不同话题上下文污染的问题（[PR #63659](https://github.com/NousResearch/hermes-agent/pull/63659)）。
    *   Signal 平台支持了原生消息编辑、时间戳追踪及远程删除（[PR #34561](https://github.com/NousResearch/hermes-agent/pull/34561)）。
*   **底层执行与隔离环境扩展：** 新增了 `Tenki` 作为第七种终端执行沙箱后端（[PR #64190](https://github.com/NousResearch/hermes-agent/pull/64190)），并修复了原生 Windows OpenSSH 不支持 `ControlMaster` 导致的报错（[PR #50753](https://github.com/NousResearch/hermes-agent/pull/50753)）。

### 4. 社区热点
今日讨论最热烈的 Issue 集中在**多智能体编排**与**前沿协议接入**上，反映了用户将 Hermes 打造为超级控制中心的强烈诉求：
*   **[Issue #5257](https://github.com/NousResearch/hermes-agent/issues/5257) (👍21, 💬18): 通用 ACP 客户端支持。** 社区强烈希望 Hermes 不仅能作为 Agent Client Protocol (ACP) 服务端，还能作为客户端去编排其他 ACP 兼容的 CLI 代理（如 Claude Code 等）。
*   **[Issue #68871](https://github.com/NousResearch/hermes-agent/issues/68871) (👍16, 💬16): 接入 Block 开源的 Buzz 消息平台。** 用户希望 AI 智能体能够加入人机混同的 Buzz 工作区，这标志着 AI 助手正从“个人工具”向“团队协作成员”演进。
*   **[Issue #20859](https://github.com/NousResearch/hermes-agent/issues/20859) (👍23, 💬9): 原生支持 Mistral 模型。** 考虑到 Mistral 庞大的用户基数，社区要求将其纳入默认 LLM Provider 的呼声很高。

### 5. Bug 与稳定性
根据今日反馈，Windows 平台与特定 Provider 适配存在较严重的稳定性问题：
*   **[P1 严重] Windows 桌面端启动循环崩溃**：[Issue #71226](https://github.com/NousResearch/hermes-agent/issues/71226)。Windows 11 更新后，WebSocket 连接成功但客户端瞬间断开，导致渲染器不断重置，用户完全无法启动应用。当前有 [PR #72895](https://github.com/NousResearch/hermes-agent/pull/72895) 正在试图强化 Windows 更新激活流程以修复此问题。
*   **[P2 高危] OpenAI Codex 集成失败**：[Issue #13834](https://github.com/NousResearch/hermes-agent/issues/13834)。在官方 Codex CLI 正常工作的网络上，Hermes Agent 配置 `openai-codex` 频繁失败。已有 [PR #72906](https://github.com/NousResearch/hermes-agent/pull/72906) 尝试改进 Codex OAuth 的恢复流程。
*   **[P2 高危] Anthropic 缓存计费漏算**：[Issue #71242](https://github.com/NousResearch/hermes-agent/issues/71242)。MoA（混合代理）架构下，Anthropic 适配器丢失了 `cache_read` 等计费字段，导致成本被少报约 7 倍，严重影响企业用户的成本监控。
*   **[P2 高危] Docker 绑定挂载极端延迟**：[Issue #72431](https://github.com/NousResearch/hermes-agent/issues/72431)。近期更新 `s6-overlay` 后，Windows 主机进行 Docker 目录绑定挂载时出现数分钟的启动延迟甚至卡死。

### 6. 功能请求与路线图信号
结合 Issue 需求与已提交的 PR，可以看出 Hermes 接下来的路线图重点：
*   **更细粒度的智能体任务委派：** 社区请求在 `delegate_task` 中实现按任务覆盖模型/提供商配置（[Issue #15789](https://github.com/NousResearch/hermes-agent/issues/15789)），这表明用户对降低多模型协作成本有精确需求，相关的 TUI 防中断保护（[PR #65040](https://github.com/NousResearch/hermes-agent/pull/65040)）已处于就绪状态。
*   **突破平台厂商限制：** 如请求支持 WhatsApp Cloud API 消息模板（[Issue #45935](https://github.com/NousResearch/hermes-agent/issues/45935)），以打破 24 小时回复窗口的限制，适用于真实的业务再营销场景。
*   **Cloudflare WAF 兼容性：** [Issue #24293](https://github.com/NousResearch/hermes-agent/issues/24293) 指出 SDK 默认的 User-Agent 会被 Cloudflare WAF 拦截，项目可能需要在底层 HTTP 客户端增加 UA 伪装或自定义配置。

### 7. 用户反馈摘要
从 Issue 评论区提炼出用户的几个核心痛点：
1.  **环境兼容性地狱：** 特别是在 Windows（原生 OpenSSH、Docker 挂载、UI 引导）和 Android (Termux 编译失败，参考 [Issue #31415](https://github.com/NousResearch/hermes-agent/issues/31415)) 上，开箱即用的体验仍然较差。
2.  **配置管理割裂：** CLI 和 Desktop GUI 之间的配置不同步令人困惑（[Issue #71298](https://github.com/NousResearch/hermes-agent/issues/71298)），`providers` 与 `custom_providers` 的双重存储逻辑亟需重构。
3.  **UI 信息过载：** 桌面端用户对于每一个微小的工具调用都占据一整行屏幕空间感到疲惫（开发者已响应并提交了折叠优化 PR）。

### 8. 待处理积压
维护团队需要高度关注以下指标和长期悬而未决的问题：
*   **审查管道阻塞：** 当前有 **397 个 PR** 处于 Open 状态，这极其容易导致合并冲突、社区贡献者流失以及 CI 资源的巨大消耗。急需引入更多 Maintainer 或自动化分级审查机制。
*   **历史遗留 Bug：** [Issue #13834](https://github.com/NousResearch/hermes-agent/issues/13834)（Codex 失效，自 4 月悬置至今）、[Issue #20859](https://github.com/NousResearch/hermes-agent/issues/20859)（Mistral 支持，5 月提出）仍未得到根本解决或合并。
*   **架构设计决策卡点：** 诸如 [Issue #68563](https://github.com/NousResearch/hermes-agent/issues/68563) 指出的网关持久化会话无法在 `SOUL.md` 更新后刷新系统提示词，属于底层架构设计缺陷，标记为 `needs-decision`，需要核心团队介入重构 Session State 管理。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*