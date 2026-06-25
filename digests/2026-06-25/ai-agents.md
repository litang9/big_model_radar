# OpenClaw 生态日报 2026-06-25

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-06-25 04:36 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

作为 AI 智能体与个人 AI 助手领域的开源项目分析师，根据 OpenClaw (github.com/openclaw/openclaw) 过去 24 小时的 GitHub 动态，为您生成 2026-06-25 的项目动态日报。

---

# 📊 OpenClaw 项目动态日报 (2026-06-25)

## 1. 今日速览
OpenClaw 在过去 24 小时内保持了**极高的社区活跃度与工程推进速度**。项目今日处理了高达 500 条的 Issues 更新（437 条新开/活跃，63 条关闭）以及 500 条 PR 更新（434 条待合并，66 条已合并/关闭）。项目于今日发布了最新的 **v2026.6.11-beta.1** 版本，显著增强了多渠道控制能力。底层架构方面，备受关注的“核心会话与对话记录迁移至 SQLite”工作已取得实质性突破，同时针对多智能体通信、内存上下文丢失及网关稳定性等多个关键 P0/P1 级别 Bug 提交了大量修复 PR。

## 2. 版本发布
### 🚀 [v2026.6.11-beta.1](https://github.com/openclaw/openclaw/releases) 
**更新重点：**
- **更强大的渠道控制：** 引入了 Slack relay 模式、原生的 Mattermost `/oc_queue` 支持，以及针对特定 DM（直接消息）的模型覆盖功能，使得渠道运营更易于自动化和精细调整。
*注：感谢开发者 @sjf-oa, @amknight, @xydigit-zt, @thomaszta, 和 @gandalf-at-lerian 的贡献。*

## 3. 项目进展
今日项目在底层重构与企业级功能构建上迈出重要一步，多个重量级 PR 进入待合并或审查状态：
- **底层存储架构大重构：** PR [#96625](https://github.com/openclaw/openclaw/pull/96625) 完成了 Path 3 的会话/对话记录向 SQLite 存储的切换。这使得 SQLite 成为运行时的规范存储，彻底改善了旧版 `sessions.json` 和 JSONL 文件管理的痛点。
- **数据防丢与追加写入：** 针对长期困扰多会话并发场景的痛点，PR [#77127](https://github.com/openclaw/openclaw/pull/77127) 为 Agent 的写入工具引入了 `append`（追加）模式，防止定时任务或子智能体覆盖共享文件。
- **安全与信任机制：** PR [#81364](https://github.com/openclaw/openclaw/pull/81364) 引入了下载前的 ClawHub 信任检查机制，有效防止恶意或被封锁的插件版本被安装。
- **多智能体架构演进：** PR [#88504](https://github.com/openclaw/openclaw/pull/88504) 提出了全新的“多插槽内存角色架构”，将事实回忆、自动捕获、压缩等职责解耦，极大增强多智能体协作能力。

## 4. 社区热点
今日社区讨论极其火热，多平台的局限性以及上下文管理成为核心诉求：
- **跨平台支持呼声极高：** Issue [#75](https://github.com/openclaw/openclaw/issues/75)（109 评论，80 👍）社区强烈呼吁提供原生的 Linux 和 Windows Clawdbot 客户端应用，目前这部分市场存在空缺。
- **架构迁移追踪：** Issue [#88838](https://github.com/openclaw/openclaw/issues/88838)（36 评论）深度追踪了 SQLite 迁移的进度，开发者高度关注此举对网关稳定

---

## 横向生态对比

以下是为您生成的 2026-06-25 AI 智能体与个人 AI 助手开源生态横向对比分析报告：

# 📊 AI 智能体开源生态横向对比与分析报告 (2026-06-25)

## 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于**“从功能扩张向底层重构与企业级加固演进”**的关键转型期。随着应用场景复杂化，开发框架正加速抛弃早期的简易文件存储，全面向规范化的关系型数据库迁移。同时，多渠道通信集成与多智能体协同（A2A）成为标配需求。然而，伴随能力爆炸而来的**“Token 消耗焦虑”**与**“安全边界模糊”**，已成为全生态亟待解决的共同痛点。

## 2. 各项目活跃度对比
| 项目名称 | Issues 动态 (关闭) | PRs 动态 (合并/关闭) | 版本发布情况 | 健康度与迭代评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 (63) | 500 (66) | 🚀 v2026.6.11-beta.1 | **极速扩张期**。Issue 与 PR 活跃度极高，有新版本发布，重心在底层架构重构与多渠道控制。 |
| **Hermes Agent** | 267 (83) | 500 (129) | 无 (0 releases) | **质量巩固期**。PR 合并率高，专注于跨平台稳定性修复、安全漏洞修补与企业级云支持积攒。 |

*数据洞察：OpenClaw 的 Issue 开启量远超关闭量，说明其正处于新功能吸纳和社区爆发的阶段；Hermes Agent 的 PR 合并数量是 OpenClaw 的两倍，且无新版本发布，表明其正集中精力清理技术债和进行底层逻辑修复。*

## 3. OpenClaw 在生态中的定位
在当前的竞合关系中，OpenClaw 展现出了**“强通信、重交互”**的生态定位：
* **架构大换血魄力足：** 相比于 Hermes 仍在局部修复上下文和内存断层问题，OpenClaw 直接将运行时规范存储彻底迁移至 SQLite（PR #96625），展现了彻底解决多会话并发痛点的决心。
* **渠道运营精细化：** OpenClaw 今日更新的 Slack relay、Mattermost 支持等，表明其高度聚焦于**将 AI 助手无缝融入现有团队协作工作流**，这是其与 Hermes 侧重于开发与工具编排的重要差异。
* **多智能体内存解耦：** OpenClaw 提出的“多插槽内存角色架构”，使其在多智能体复杂协同的底层设计上走在前列。

## 4. 共同关注的技术方向
通过对两个项目近期动态的挖掘，以下技术诉求正在行业内形成共识：
* **跨平台部署与一致性：** OpenClaw 社区强烈呼吁原生 Windows/Linux 客户端；Hermes Agent 则投入大量精力修复 Windows 路径空格、Docker 挂载与不可变镜像的兼容性问题。
* **会话与上下文持久化：** 两项目都在向更安全的存储演进。OpenClaw 正在完成 SQLite 迁移；Hermes 正在修复模型切换时的上下文丢失（通过会话拆分与重放机制）。
* **安全与信任机制加固：** 面对生产级应用，安全成为刚需。OpenClaw 引入了插件下载信任检查；Hermes 也在修复 API 信息泄露、网关鉴权缺陷及高危工具拦截放行等问题。

## 5. 差异化定位分析
| 维度 | OpenClaw | Hermes Agent |
| :--- | :--- | :--- |
| **核心侧重** | **企业级渠道通信与多智能体协作** | **开发工具编排、多模型路由与本地化部署** |
| **目标用户** | 团队协作、社群运营、多渠道自动化管理者。 | 重度开发者、本地/开源模型用户、CLI 编码重度患者。 |
| **技术架构演进** | 引入 SQLite 规范化存储；实现多插槽内存角色解耦。 | 引入 Vertex AI / Bedrock；探索本地执行与远程大脑的混合沙盒架构。 |
| **痛点聚焦** | 解决并发会话数据互相覆盖、跨平台客户端缺失。 | 解决系统提示词导致的极高 Token 损耗、API 复杂鉴权与凭证丢失。 |

## 6. 社区热度与成熟度
* **快速迭代与扩张期（OpenClaw）：** 每日超 400 条的新开 Issue 显示其正在吸引大量新用户。其目前的核心任务是快速响应新需求（如跨平台客户端），并稳住正在进行的大规模架构重构（SQLite 迁移）。
* **打磨与质量收敛期（Hermes Agent）：** 虽然没有新版本发布，但单日合并 129 个 PR，说明核心团队正在高负荷“还技术债”。其社区讨论极其硬核（如监控 73% 的无效 Token 开销比例、提出 A2A 标准协议），属于面向专业开发者的成熟期调优。

## 7. 值得关注的趋势信号
对于 AI 智能体开发者和决策者，今日的动态释放了以下重要趋势：
1. **“上下文经济学”成为核心指标：** 随着工具链变长（>50个工具），Schema 注入正在吃掉巨量 Token（Hermes 用户反映 3500-5000 Tokens）。**“两阶段工具注入（按需加载）”**和细粒度压缩将成为下一代 AI 助手框架的核心竞争力。
2. **标准化多智能体通信协议（A2A/ACP）崛起：** 单一全知全能的 Agent 正在让步于“专家智能体集群”。Google A2A 协议的讨论升温，预示着未来不同框架（如编码 Agent 与协作 Agent）之间的壁垒将被打破。
3. **混合执行架构（远端大脑 + 本地手脚）：** 开发者对生产环境数据安全的焦虑，正在催生一种新架构：大模型推理与核心逻辑在远端沙盒运行，而涉及敏感的文件读写、终端命令执行则在本地受控环境中进行。这将是企业级 AI 落地的重要方向。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

以下是 2026-06-25 Hermes Agent 项目的 GitHub 动态日报。

### 1. 今日速览
2026-06-25 期间，Hermes Agent 项目保持了极高的开发与社区热度，过去 24 小时内共处理了 **267 条 Issue 动态**（其中关闭 83 条）以及高达 **500 条 PR 动态**（其中合并/关闭 129 条）。尽管今日没有发布新版本，但项目重心明显聚焦于**底层架构重构、跨平台稳定性修复（尤其是 Windows/Docker 环境）以及安全边界强化**。社区方面，关于多智能体协议（A2A/ACP）和高频 Token 消耗的讨论持续升温，反映出用户对复杂编排和本地/低成本模型部署的强烈需求。

### 2. 版本发布
* **今日无新版本发布 (0 releases)。**
*(注：结合当前高频的 Bug 修复与基础架构 PR 合并情况，项目可能正处于下一个大版本发布前的积攒与稳定阶段。)*

### 3. 项目进展
今日共有 129 个 PR 被合并或关闭，大幅推进了项目的健壮性，重点进展包括：
* **安全防护与鉴权加固**：合并了 [PR #52309](https://github.com/NousResearch/hermes-agent/pull/52309)，修复了 API 5xx 错误信息直接暴露后端内部细节的安全漏洞；[PR #52306](https://github.com/NousResearch/hermes-agent/pull/52306) 修复了 Relay 投递事件的鉴权逻辑问题；推进了 [PR #44073](https://github.com/NousResearch/hermes-agent/pull/44073)，落实了网关默认“失败即关闭”的安全策略。
* **Windows 与部署兼容性修复**：合并了 [PR #48157](https://github.com/NousResearch/hermes-agent/pull/48157) 以规范化 Windows 环境下 Docker 挂载的盘符路径问题；同时 [PR #51323](https://github.com/NousResearch/hermes-agent/pull/51323) 修复了不可变 Docker 镜像中懒加载后端依赖失效的问题。
* **核心逻辑修复**：推进了修复上下文压缩时将摘要错误注入为新会话历史的严重 Bug [Issue #20293](https://github.com/NousResearch/hermes-agent/issues/20293)；[PR #52172](https://github.com/NousResearch/hermes-agent/pull/52172) 修复了 API Key 脱敏机制破坏下游代码语法的棘手问题。

### 4. 社区热点
今日讨论最热烈的问题集中在**多智能体协同**与**性能优化/Token 消耗**上：
* **[Issue #6839](https://github.com/NousResearch/hermes-agent/issues/6839) - 延迟工具模式加载**：评论数高达 28 条。用户反映当前超过 50 个工具的 Schema 注入会硬性消耗 3500-5000 Tokens，对本地模型极不友好，呼吁实现两阶段工具注入。
* **[Issue #4379](https://github.com/NousResearch/hermes-agent/issues/4379) - 73% 的 API 调用是固定开销**：提供了详细监控数据，证实了系统提示词和工具定义造成的上下文冗余。
* **[Issue #514](https://github.com/NousResearch/hermes-agent/issues/514) - A2A (Agent-to-Agent) 协议支持**：由核心成员提出，讨论度 22 条。旨在通过 Google 的 A2A 开源标准，解决不同框架构建的智能体之间的通信痛点（即“谁能帮我”的问题）。
* **[Issue #5257](https://github.com/NousResearch/hermes-agent/issues/5257) - 通用 ACP 客户端**：希望实现 Hermes 对 Claude Code、Copilot 等多编码智能体的 CLI 编排。

### 5. Bug 与稳定性
按风险等级排列，今日重点关注的 Bug 及其修复状态如下：
* **[P1] 凭证池丢失与计费逻辑错误**：
  * [Issue #19566](https://github.com/NousResearch/hermes-agent/issues/19566)：OpenAI-Codex 凭证在 `auth.json` 重写时可能会丢失新加入的凭证（存在安全边界风险，待修复）。
  * [Issue #40014](https://github.com/NousResearch/hermes-agent/issues/40014)：Claude Max/Pro 订阅用户通过 OAuth 登录后，请求被错误路由到按量计费的 API 端点，导致额外扣费（待修复）。
* **[P1] 上下文与记忆断层**：切换模型导致会话上下文与记忆丢失（[Issue #17013](https://github.com/NousResearch/hermes-agent/issues/17013)）。**已有修复进展**：[PR #52283](https://github.com/NousResearch/hermes-agent/pull/52283) 提出在切换模型时拆分会话并重放祖先上下文。
* **[P2] Windows / 客户端稳定性**：
  * [Issue #43334](https://github.com/NousResearch/hermes-agent/issues/43334)：Windows 用户路径包含空格（如 `C:\Users\PPT AI`）导致安装器直接崩溃。**已有进展**：[PR #52305](https://github.com/NousResearch/hermes-agent/pull/52305) 正在加固安装器的自动存储逻辑。
  * [Issue #24860](https://github.com/NousResearch/hermes-agent/issues/24860)：Web Dashboard 中 Ctrl+V 粘贴失效且不支持图片粘贴。

### 6. 功能请求与路线图信号
从 Issue 和 PR 趋势来看，下一个版本 likely 会纳入以下新特性：
* **多云与企业级 Provider 支持**：[PR #8427](https://github.com/NousResearch/hermes-agent/pull/8427) 正在添加 Vertex AI 作为 Gemini 的第一-class 提供商；[PR #22648](https://github.com/NousResearch/hermes-agent/pull/22648) 添加了 Ollama Cloud 作为插件；[PR #52312](https://github.com/NousResearch/hermes-agent/pull/52312) 为 Bedrock Claude 强制执行 Guardrails。这表明项目正在积极拓展企业级云端接入能力。
* **桌面端重磅更新**：[PR #49037](https://github.com/NousResearch/hermes-agent/pull/49037) 引入了备受期待的“一等公民项目”功能，包括侧边栏、编码轨道、代码审查面板以及 JS 窗口化 Diff 预览。
* **本地-远程混合执行架构**：社区强烈需求（[Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715)）支持“远端运行 Hermes 大脑，本地执行工具/终端”的沙盒隔离模式。

### 7. 用户反馈摘要
透过今日的 Issues，可以提炼出当前用户的几个核心痛点和应用场景：
* **对 Token 消耗极其敏感**：重度用户（尤其是将 Hermes 接入 Telegram/WhatsApp 并使用本地/第三方 API 的开发者）对 70%+ 的无效 Token 开销感到沮丧，急需更细粒度的压缩和按需注入机制。
* **认证与环境折磨**：由于 Hermes 支持大量的终端工具、网关和提供商，用户在 Windows 权限、Docker 挂载、各种大厂 API 鉴权（OAuth 失效、凭证覆盖等）上踩坑极多。
* **对安全隔离的焦虑**：用户希望将 Hermes 用于生产环境，但发现现有的 Tirith 审批网关仅能拦截终端命令，对 `delete_resource`、`write_file` 等高危内置工具直接放行（[Issue #35357](https://github.com/NousResearch/hermes-agent/issues/35357)），这引发了对数据安全的担忧。

### 8. 待处理积压
以下重要 Issue/PR 需要核心维护者重点关注和 Review：
* **[PR #30861](https://github.com/NousResearch/hermes-agent/pull/30861) - SSH 环境缓存越权漏洞**：修复了在 WebUI 中切换 Profile 时，新会话复用为完全不同 SSH 主机缓存的终端环境的高危 Bug，涉及

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*