# OpenClaw 生态日报 2026-06-09

> Issues: 500 | PRs: 473 | 覆盖项目: 11 个 | 生成时间: 2026-06-09 02:48 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw 项目深度报告

# 📊 OpenClaw 项目动态日报 (2026-06-09)

## 1. 今日速览
过去 24 小时，OpenClaw 项目维持了**极高的社区活跃度与开发迭代速度**。项目共处理了 500 条 Issues 动态（新增/活跃 435，关闭 65）以及 473 条 PR 动态（待合并 331，合并/关闭 142），并连续发布了两个 Beta 版本。从数据上看，当前项目的重心正在向**多端 UI 适配（iPad/iPhone）、底层会话状态管理（特别是多智能体和子智能体隔离）以及各渠道（QQBot、Telegram、飞书）的媒体流传输稳定性**倾斜。不过，积压的待处理 PR (331条) 和包含大量陈旧标签的 Issues 表明，项目正面临快速迭代带来的维护带宽瓶颈。

---

## 2. 版本发布
今日连续推出了 2 个测试版更新，主要聚焦于 QQBot 渠道与 MCP 工具链的健壮性：
*   **v2026.6.5-beta.5 & v2026.6.5-beta.3**
    *   **核心更新**：修复了 QQBot 渠道在原生投递时意外暴露模型原始 `<thinking>` 标签的问题，大幅提升了终端用户体验（感谢 @openperf）。
    *   **MCP 增强**：MCP 工具返回结果现在能更好地强制转换 `resource_link`、`resource`、`audio` 以及格式错误的图像等数据类型，提升了多模态处理的容错率。

---

## 3. 项目进展
今日共有 142 个 PR 被合并或关闭，重点推进了以下领域：
*   **UI 与多端适配 (XL 级别合并)**：
    *   [PR #91557](https://github.com/openclaw/openclaw/pull/91557): 大幅改进了 iPad 和 iPhone 控制面板，引入了真实的侧边栏导航和 Workboard 集成，向 macOS 端体验看齐。
    *   [PR #91543](https://github.com/openclaw/openclaw/pull/91543): Control UI 新增了可折叠的工作区文件栏，优化了横向空间占用。
*   **底层稳定性与状态修复 (L 级别合并)**：
    *   [PR #91566](https://github.com/openclaw/openclaw/pull/91566): 修复了网关重启时孤立主会话的恢复问题，防止启动时的状态死锁。
    *   [PR #90856](https://github.com/openclaw/openclaw/pull/90856) & [PR #91529](https://github.com/openclaw/openclaw/pull/91529): 修复了关键的记忆/图像转录破坏 Bug，防止 base64 图像字节被错误截断。
    *   [PR #91526](https://github.com/openclaw/openclaw/pull/91526): 清理了 SQLite 中未使用的异步 Kysely 驱动死代码。
*   **多模型兼容性**：
    *   [PR #91559](https://github.com/openclaw/openclaw/pull/91559): 修复了 Agent 兼容 OpenAI 格式的 Provider 调用 Gemini 模型时的工具 schema 清理问题。

---

## 4. 社区热点
今日讨论最热烈的问题集中在**多编码文件处理、鉴权安全上下文及新型号兼容性**：
1.  **[Issue #48788](https://github.com/openclaw/openclaw/issues/48788) (18 评论)**：集中讨论建立中心化的文件名编码实用程序，以解决多语言（Shift-JIS, GB18030等）环境下的文件名乱码及数据丢失问题。
2.  **[Issue #32473](https://github.com/openclaw/openclaw/issues/32473) (17 评论)**：使用 Hostinger VPS 和 Docker 部署时，Control UI 强制要求设备身份验证的回归 Bug，引发了运维人员的强烈共鸣。
3.  **[Issue #90083](https://github.com/openclaw/openclaw/issues/90083) (15 评论)**：升级到 2026.6.1 后，OpenAI 最新的 `gpt-5.4` 和 `gpt-5.5` 模型在特定传输层下报 `invalid_provider_content_type` 错误，阻碍了用户跟进最新大模型。
4.  **[Issue #50090](https://github.com/openclaw/openclaw/issues/50090) (15 评论)**：关于社区 Skill 开发生态 的战略性讨论，用户呼吁改善当前碎片化的技能发布与管理体验。

---

## 5. Bug 与稳定性
今日暴露了多个影响核心交互流程的 Bug，部分已有 PR 介入：
*   **P0/P1 关键 Bug (功能性阻断)**：
    *   **模型兼容性崩溃**：[Issue #90083](https://github.com/openclaw/openclaw/issues/90083) - ChatGPT Responses transport 与 GPT-5.x 不兼容。
    *   **会话上下文混乱**：[Issue #32296](https://github.com/openclaw/openclaw/issues/32296) - Agent 回复历史消息而非当前消息。
    *   **安全上下文阻断**：[Issue #51396](https://github.com/openclaw/openclaw/issues/51396) - `clearUnboundScopes()` 错误剥离了非本地 Token 认证客户端的权限。
*   **高影响 Bug (数据丢失/状态泄漏)**：
    *   [Issue #48573](https://github.com/openclaw/openclaw/issues/48573)：子智能体产生僵尸会话状态泄漏。
    *   [Issue #41744](https://github.com/openclaw/openclaw/issues/41744)：飞书渠道发送图像时在最终 payload 前丢失媒体文件。
    *   [Issue #51429](https://github.com/openclaw/openclaw/issues/51429) (滑稽但严重)：开发者的本地硬编码路径 `/Users/wangtao` 被合并进正式版，导致其他用户的工作区被错误创建。
*   **已修复 Bug**：
    *   飞书流式卡片打字机效果异常及截断问题（[Issue #88929](https://github.com/openclaw/openclaw/issues/88929) 已关闭）。
    *   图像转录编辑导致的数据损坏（通过 [PR #91529](https://github.com/openclaw/openclaw/pull/91529) 修复）。

---

## 6. 功能请求与路线图信号
通过近期的高互动 Feature Request，可以洞察项目接下来的演进方向：
*   **细粒度路由与计费**：
    *   [Issue #42475](https://github.com/openclaw/openclaw/issues/42475)：请求在网关层面强制执行按 Agent 划分的每日/每月 Token 消耗预算。
    *   [Issue #43260](https://github.com/openclaw/openclaw/issues/43260)：请求在 `SKILL.md` 元数据中支持 `model` 字段，以便为不同技能单独路由模型（如复杂任务用 GPT-5，简单任务用本地模型）。此需求与 [PR #85104](https://github.com/openclaw/openclaw/pull/85104) (Fast talks auto mode) 的动态路由思路一致，极有可能在近期纳入版本。
*   **安全与生态建设**：
    *   [Issue #45031](https://github.com/openclaw/openclaw/issues/45031)：要求为 `clawhub install` 引入内置的安全扫描机制，防范供应链攻击。
*   **可观测性**：
    *   [Issue #50291](https://github.com/openclaw/openclaw/issues/50291)：请求在 Plugin Hooks 中注入 trace context (messageId, runId)，以满足分布式追踪需求。

---

## 7. 用户反馈摘要
*   **痛点 1：本地部署与内网穿透的鉴权壁垒**。许多未配备正规域名的个人开发者/私有化部署用户，深受 `control ui requires device identity` 错误困扰（[Issue #32473](https://github.com/openclaw/openclaw/issues/32473)），项目对于纯 HTTP 或非标准 localhost 的安全策略过于严苛。
*   **痛点 2：多智能体/子智能体的生命周期管理依然脆弱**。用户频繁遇到“僵尸”进程或错误的状态占用（[Issue #43367](https://github.com/openclaw/openclaw/issues/43367), [Issue #47975](https://github.com/openclaw/openclaw/issues/47975)），并行任务极易导致会话锁死。
*   **痛点 3：记忆管理机制缺乏透明度**。多位用户抱怨底层记忆管理混乱（[Issue #43747](https://github.com/openclaw/openclaw/issues/43747)），不同实例间的向量化存储行为不一致，且 `/new` 指令无法干净利落地 flush 记忆（[Issue #45608](https://github.com/openclaw/openclaw/issues/45608)）。

---

## 8. 待处理积压
项目当前有高达 **331 条待合并 PR**，且部分核心高优 Issue 缺乏及时的代码层面介入，建议维护团队重点关注：
*   **陈旧的高优 Bug**：[Issue #32296](https://github.com/openclaw/openclaw/issues/32296)（会话上下文错乱，P1 级别，3月至今未修复）和 [Issue #44993](https://github.com/openclaw/openclaw/issues/

---

## 横向生态对比

以下为您基于 2026 年 6 月 9 日各大开源 AI 智能体项目动态生成的横向对比与生态分析报告：

---

### 📊 2026开源 AI 智能体生态横向对比分析报告 (2026-06-09)

#### 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于**从“单体对话”向“多端多模态协作网络”演进的关键重构期**。
*   一方面，**多智能体编排、MCP工具链集成与全平台渠道接入（如微信、Telegram、飞书等）已成为头部项目的标配**，但对底层状态管理的考验急剧上升。
*   另一方面，随着智能体权限的扩大，**本地执行沙箱、MCP安全过滤与网络隔离等“安全防御性架构”正在取代单纯的功能堆砌**，成为各项目近期代码合并的核心发力点。
*   整体而言，头部项目在快速迭代中普遍遭遇了**技术债激增（PR积压、僵尸进程）与本地化部署体验劣化**的阵痛，生态正呼吁更精细的架构治理。

#### 2. 各项目活跃度对比
*(注：按综合开发活跃度降序排列)*

| 项目名称 | Issues 动态 (新增/活跃/关闭) | Pull Requests 动态 (开启/合并) | 版本发布情况 | 健康度与状态评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | **~500** (活跃 435, 关闭 65) | **~473** (待合并 331, 合并 142) | 2 个 Beta版 | ⚠️ **高负荷/严重积压**：迭代极快，但待处理 PR(331)积压严重，存在底层状态管理Bug。 |
| **IronClaw** | **~34** (活跃 22, 关闭 12) | **~50** (开启 25, 合并 25) | 无 | 🟢 **高活跃/深度重构**：处于 Reborn 架构深水区，核心API重构推进顺利，社区贡献积极。 |
| **CoPaw** | **~38** (活跃 20, 关闭 18) | **~42** (开启 20, 合并 22) | 无 | 🟢 **健康迭代**：维护团队闭环能力极强，ACP协议落地，正进行底层框架大版本迁移准备。 |
| **Zeroclaw** | **~50** (活跃 48, 关闭 2) | **~50** (开启 39, 合并 11) | 无 | 🟡 **蓄力期**：密集积累 v0.9.0 重构代码，聚焦致命数据丢失修复，Issue 闭环率低需警惕。 |
| **NanoBot** | **7** (关闭 4) | **~36** (开启 20, 合并 16) | 无 | 🟢 **稳步推进**：架构演进健康，成功合入跨实例消息总线，安全修复及时。 |
| **LobsterAI** | **0** (无新增) | **17** (开启 1, 合并 16) | 无 | 🟢 **维护/清理**：集中清理历史遗留 PR，优化桌面端体验，无新 Issue 反馈。 |
| **PicoClaw** | **3** | **19** (开启 10, 合并 9) | v0.2.9-nightly | 🟢 **加固期**：发布 nightly 版，集中进行防御性编程扫除与日志重构，代码质量提升。 |
| **NanoClaw** | **1** (新增) | **3** (开启 1, 合并 2) | 无 | 🟡 **低频/聚焦**：极度聚焦底层安全隔离网络架构，修复严重的WhatsApp多模态挂载Bug。 |
| **TinyClaw** | **0** | **1** (开启 1, 合并 0) | 无 | 🔵 **沉寂/基建**：活跃度极低，仅聚焦于底层 C++ 依赖编译体验的优化。 |
| **ZeptoClaw / EasyClaw**| 0 | 0 | 无 | ⚫ **停滞**：过去 24 小时无任何活动。 |

#### 3. OpenClaw 在生态中的定位
*   **绝对规模的“生态核心”**：OpenClaw 今日处理的 PR 和 Issue 数量（近 1000 条动态）是其他二线头部项目（如 IronClaw、CoPaw）的 10 倍以上，是多渠道适配（QQBot/飞书/TG）、MCP工具链及多端 UI 的事实上的风向标。
*   **技术路线差异（广度 vs 深度）**：不同于 IronClaw 专注底层 OpenAI 兼容协议的深度重构，或 NanoClaw 专注容器级安全隔离，OpenClaw 的技术路线呈现出极强的**应用层全包揽特征**（从 iPad UI 适配一直覆盖到底层数据库驱动清理）。
*   **面临的挑战（大项目病）**：相比于 CoPaw 游刃有余的 Issue 闭环，OpenClaw 正面临严重的维护带宽瓶颈。高达 331 条待合并 PR，以及多智能体“僵尸会话”、本地鉴权壁垒等长期未解决的 P1 级 Issue，表明其架构沉重度已开始反噬开发体验。

#### 4. 共同关注的技术方向
*   **MCP 工具链的安全与容错**：
    *   *涉及项目：Zeroclaw, NanoBot, OpenClaw*
    *   *具体诉求*：随着 MCP 被广泛调用，社区正集中修补其脆弱性。Zeroclaw 曝光了 MCP 过滤机制失效，NanoBot 修复了 MCP HTTP/SSE 的 SSRF 漏洞，OpenClaw 则在强化 MCP 返回数据类型的强制转换容错。
*   **多智能体状态隔离与会话死锁**：
    *   *涉及项目：OpenClaw, NanoBot, CoPaw*
    *   *具体诉求*：并行任务导致上下文混乱成为高频 Bug。OpenClaw 修复了孤儿主会话死锁，CoPaw 遇

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 (2026-06-09)

## 1. 今日速览
过去 24 小时内，NanoBot 项目保持了**极高的开发活跃度与社区关注度**。项目共处理了 36 条 Pull Request（其中 16 条已合并/关闭）和 7 条 Issue（4 条顺利关闭）。从数据可以看出，项目当前正处于**功能快速迭代与安全性/稳定性加固并重**的阶段。核心贡献者重点推进了多智能体协作、全局语音转录架构的重构，以及针对 MCP 和工具执行链路的安全修复。社区方面，用户对多模型动态切换、WebUI 版本感知以及跨平台富文本解析等体验细节提出了明确诉求。

## 2. 版本发布
- **无新版本发布**。今日无新的 Release 或 Tag 生成，项目仍在积累底层特性（如 Agent Collab 和全局 Transcription），预计将在这些核心 PR 全部合入后推出版本更新。

---

## 3. 项目进展
今日共有 16 个 PR 被合并或关闭，项目在以下几个核心维度取得了实质性突破：

- **多智能体架构演进**：备受瞩目的 PR [#3992 feat(agent-collab) - enable cross agent messaging](https://github.com/HKUDS/nanobot/pull/3992) 已关闭。该功能实现了跨实例的消息总线，标志着 NanoBot 从单体助手向多智能体协同网络迈出了关键一步。
- **语音转录系统全局化**：PR [#4232 feat(transcription): add shared voice input support](https://github.com/HKUDS/nanobot/pull/4232) 合并，将语音转录从 Channel 专属能力升级为全局共享能力。同时，多个新的 ASR 提供商支持已合入，包括 [OpenRouter](https://github.com/HKUDS/nanobot/pull/4113)、[小米 MiMo](https://github.com/HKUDS/nanobot/pull/4175) 和 [AssemblyAI](https://github.com/HKUDS/nanobot/pull/4224)。
- **API 兼容性与扩展性**：PR [#4217 feat(providers): add extra_query config for OpenAI-compatible providers](https://github.com/HKUDS/nanobot/pull/4217) 关闭，正式解决了 Azure 等网关需要额外查询参数的痛点。
- **安全与稳定性加固**：
  - 修复了 MCP HTTP/SSE 的 SSRF 校验漏洞 ([#4074](https://github.com/HKUDS/nanobot/issues/4074))。
  - 阻止了通过相对符号链接逃逸工作目录的风险 ([PR #4221](https://github.com/HKUDS/nanobot/pull/4221))。
  - 修复了历史记录裁剪时孤立 tool results 导致的上下文破坏问题 ([PR #4219](https://github.com/HKUDS/nanobot/pull/4219))。
- **前端体验优化**：PR [#4235 feat(webui): show nanobot version in Settings Overview](https://github.com/HKUDS/nanobot/pull/4235) 关闭，WebUI 设置页现已支持版本展示与 PyPI 新版本检测。

---

## 4. 社区热点
- **[OPEN] 按会话粒度覆盖模型配置** ([#4253](https://github.com/HKUDS/nanobot/issues/4253))
  作者 @rombert 提出希望能够根据任务的隐私级别和时间紧迫性，在“云端快速模型”和“本地私有模型”之间动态切换。这反映了高级用户对 AI 路由灵活性的强烈诉求，目前的全局设定已无法满足复杂工作流。
- **[OPEN] WebUI 版本徽章与实时更新通知增强** ([#4255](https://github.com/HKUDS/nanobot/pull/4255))
  在 Issue [#4233](https://github.com/HKUDS/nanobot/issues/4233 提出需求后，社区迅速响应。不仅合入的基础展示功能，贡献者 @JiajunBernoulli 紧接着又提出了更为完善的 Header 实时通知徽章方案，展现了极佳的迭代速度。
- **[OPEN] 邮件通道的自动化后置动作** ([#4170](https://github.com/HKUDS/nanobot/pull/4170))
  贡献者 @flaviovs 为 Agent 邮箱管理场景引入了 IMAP 后置处理（如自动归档/已读）。此 PR 探讨了将 NanoBot 作为全职数字员工的深度集成场景，引发了关于邮箱状态管理的架构讨论。

---

## 5. Bug 与稳定性
1. **[P0/中危] 微信 Channel 死循环导致静默** 
   - **描述**：Session 过期（errcode -14）后，系统休眠 60 分钟但未重载 Token，导致微信频道永久静默。
   - **状态**：已提交修复 PR [#4223](https://github.com/HKUDS/nanobot/pull/4223)，目前待合并。
2. **[P1/功能阻断] Telegram 长消息切断代码块** 
   - **描述**：`split_message` 在处理长文本时，会将 Markdown 围栏代码块（```）切断，导致 Telegram 端渲染出严重的 HTML 乱码。([#4250](https://github.com/HKUDS/nanobot/issues/4250))
   - **状态**：已提交修复 PR [#4257](https://github.com/HKUDS/nanobot/pull/4257)，待合并。
3. **[P2/数据一致性] 记忆游标倒退或冲突**
   - **描述**：在极端压缩或数据损坏情况下，MemoryStore 的 cursor 可能不是单调递增的。
   - **状态**：已提交修复 PR [#4256](https://github.com/HKUDS/nanobot/pull/4256)，通过对比历史记录尾部来强制保持游标单调性。

---

## 6. 功能请求与路线图信号
- **多模态交互（文件/图片上传）**：Issue [#4251](https://github.com/HKUDS/nanobot/issues/4251) 呼吁支持在对话中直接上传 PDF 总结或图片解析。该 Issue 虽已关闭，但释放出强烈信号：**基于多模态大模型的能力（如视觉理解）亟待在 WebUI 和各 Channel 中作为原生功能集成**。
- **上下文微压缩的动态治理**：PR [#4238](https://github.com/HKUDS/nanobot/pull/4238) 提出将微压缩从“固定工具结果计数”改为“基于上下文压力动态触发”。这表明项目正在为未来支持 100K+ 超长上下文模型的精细化管理做底层架构准备。
- **执行沙箱安全边界收紧**：PR [#4053](https://github.com/HKUDS/nanobot/pull/4053) 和合并的 #4221 表明，项目正在严格区分“读/写权限边界”。路线图上，**本地工具执行的沙箱隔离将愈发严苛**。

---

## 7. 用户反馈摘要
- **模型切换体验割裂**：用户反映在隐私优先（如使用本地 llama.cpp）和效率优先（如使用 OpenRouter）的场景下，频繁修改全局配置体验极差，急需“会话级/快捷键级”的模型覆盖方案。
- **版本更新感知弱**：很多用户由于长时间不关注 `/status` 接口，导致错失重要更新，迫切需要在 WebUI 界面拥有类似 WordPress 那样的醒目更新提示。
- **富文本解析的兼容性挑战**：随着 AI 输出内容越来越长且包含大量代码块，推送到 Telegram 等平台时的分割逻辑经常破坏排版格式，严重影响阅读体验。

---

## 8. 待处理积压
- **[PR #4170] 邮件后置动作功能**：自 06-03 提出至今

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下是为您生成的 **Zeroclaw** 项目 2026-06-09 动态日报：

# 📊 Zeroclaw 项目动态日报 (2026-06-09)

## 1. 今日速览
过去 24 小时内，Zeroclaw 项目保持着极高的开发与社区活跃度，共处理了 **50 条 Issue 更新**（新增/活跃 48 条，关闭 2 条）与 **50 条 PR 更新**（待合并 39 条，合并/关闭 11 条）。
项目当前虽无新版本发布，但正处于 v0.9.0 重大架构重构前的密集代码积累期。今日的核心焦点集中在 **Agent 运行时的稳定性修复**（如上下文清空、文件读写失效）、**多渠道（Matrix/WhatsApp）的健壮性提升**，以及围绕 **MCP 工具安全性与权限控制**的深入讨论。

## 2. 版本发布
**无新版本发布。**
结合 PR 与 Issue 中的信号（多项 RFC 瞄准 `v0.9.0`），项目正在酝酿包含底层架构与安全模型升级的下一个重要里程碑。

## 3. 项目进展
今日共有 11 个 PR 被合并或关闭，在核心运行时、渠道接入和网关稳定性上取得了实质性进展：
*   **关键数据丢失修复落地**：PR [#7403](https://github.com/zeroclaw-labs/zeroclaw/pull/7403) 合并，修复了 `trim_history` 在孤儿级联清空所有消息的致命 Bug；PR [#7129](https://github.com/zeroclaw-labs/zeroclaw/pull/7129) 修复了 `file_write` 在临时工作区静默失败的数据丢失问题 (S0 级)。
*   **Matrix 渠道架构重构**：PR [#7388](https://github.com/zeroclaw-labs/zeroclaw/pull/7388) 关闭，彻底解决了多别名实例共享 Session 导致账号串线的严重隐患（需注意包含破坏性变更，需手动迁移 Session）。
*   **容错与硬件生态**：PR [#7402](https://github.com/zeroclaw-labs/zeroclaw/pull/7402) 增强了网关 TLS 的容错；同时，基于 ESP32 的 Smart-room Demo 也通过 PR [#6148](https://github.com/zeroclaw-labs/zeroclaw/pull/6148) 正式合入，标志着项目在 AI 硬件结合方面的拓展。

## 4. 社区热点
今日社区讨论最热烈的问题集中在 MCP 工具调度、桌面端控制和安全架构设计：
*   **MCP 工具过滤机制失效**：Issue [#6699](https://github.com/zeroclaw-labs/zeroclaw/issues/6699)（评论数 7）引发了深度探讨。开发者指出 `tool_filter_groups` 对真实的 MCP 工具完全无效，暴露出前缀检查与延迟加载逻辑中的双重缺陷，这对依赖 MCP 网关的用户影响极大。
*   **Computer-use 桌面控制 RFC**：Issue [#6909](https://github.com

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

这份报告为您基于 2026 年 6 月 9 日的 GitHub Webhook 与事件数据生成，聚焦开源 AI 智能体框架 PicoClaw 的项目动态与健康度。

---

### 📊 PicoClaw 开源项目日报 (2026-06-09)

#### 1. 今日速览
PicoClaw 项目在 2026 年 6 月 9 日保持了**极高的开发活跃度与代码质量把控力度**。过去 24 小时内，项目共处理了 19 个 Pull Requests（其中 9 个已合并/关闭）和 3 个 Issues，并发布了最新的 `v0.2.9-nightly` 自动构建版本。
从 PR 走向来看，项目当前正处于**正式版发布前的代码净化与稳定性加固阶段**：核心贡献者集中清理了大量未校验的类型断言、不规范的错误包装以及日志系统重构。此外，社区在多渠道适配（Telegram、QQ、DeltaChat）和多硬件架构（RISC-V）上的反馈为项目演进提供了明确方向。

#### 2. 版本发布
- **[ nightly ] Nightly Build: `v0.2.9-nightly.20260609.46b29a0a`**
  - **链接**: https://github.com/sipeed/picoclaw/releases/tag/nightly
  - **更新说明**: 基于主分支的最新自动构建版本。
  - **注意事项**: 这是一个用于测试的 Nightly 版本，包含了今日合并的所有结构化日志重构与防御性编程修复。**可能存在不稳定性，不建议在生产环境中部署**。

#### 3. 项目进展
今日共有 9 个 PR 被合并或关闭，项目在底层健壮性和规范化方面取得了实质性进展，显著降低了潜在 Panic 崩溃的风险：
- **日志架构升级**: 合并了 PR [#3050](https://github.com/sipeed/picoclaw/pull/3050)，全面将裸调用的 `log.Printf/fmt.Printf` 替换为结构化日志，大幅提升了生产环境的可观测性。
- **错误处理标准化**: 合并了 PR [#3051](https://github.com/sipeed/picoclaw/pull/3051)，修复了多处 `fmt.Errorf` 使用 `%v` 而非 `%w` 的问题，恢复了标准错误链追踪能力。
- **防御性编程大扫除 (由 @chengzhichao-xydt 集中推动)**: 
  - 合并了 PR [#3018](https://github.com/sipeed/picoclaw/pull/3018)、[#3055](https://github.com/sipeed/picoclaw/pull/3055)、[#3056](https://github.com/sipeed/picoclaw/pull/3056)、[#3057](https://github.com/sipeed/picoclaw/pull/3057)、[#3058](https://github.com/sipeed/picoclaw/pull/3058)。
  - 为 `pkg/tools`、`pkg/channels`、`pkg/agent` 等核心模块中的 `sync.Map`、`context.Value` 等类型断言增加了严格的 `ok` 检查，并处理了 `os.Getwd()` 等静默错误，彻底消除了因配置异常导致程序 Panic 的隐患。

#### 4. 社区热点
- **RISC-V 架构兼容性痛点**: Issue [#2887](https://github.com/sipeed/picoclaw/issues/2887) 引发了较多讨论（9 条评论）。用户报告在 RISC-V 架构的 Debian 上使用 `.deb` 安装包调用 OpenAI 模型时失效。这反映了边缘计算/开发者社区对在轻量级硬件上运行 AI Agent 的强烈诉求。
- **新通讯协议支持提上日程**: 社区开发者 @trufae 提交了 PR [#3063](https://github.com/sipeed/picoclaw/pull/3063) 以增加 DeltaChat 网关支持。这表明 PicoClaw 作为个人 AI 助手，其“全平台多渠道接入”的特性正在吸引更多极客开发者参与贡献。

#### 5. Bug 与稳定性
今日暴露的 Bug 主要集中在**多渠道消息处理**与**Windows 客户端体验**上：

- 🔴 **高严重度**: 
  - **Windows QQ 频道连接超时** ([#3015](https://github.com/sipeed/picoclaw/issues/3015)): 用户反馈在 Windows 环境下运行 `picoclaw gateway` 时，QQ 频道获取 App Access Token 环节会触发超时错误。（*目前尚处 OPEN 状态，等待官方排查*）。
- 🟡 **中严重度**:
  - **Windows GUI 控制台闪屏** (PR [#3061](https://github.com/sipeed/picoclaw/pull/3061)): 开发者指出 PicoClaw 在 Windows 下作为 GUI 运行时，由于未完全隐藏子进程，会导致控制台黑窗闪屏。**已提交 Fix PR，待合并**。
  - **Agent 核心循环并发泄漏** (PR [#2904](https://github.com/sipeed/picoclaw/pull/2904)): 指出 `ReloadProviderAndConfig` 会产生阻塞的游离 Goroutine，该 PR 提供了同步 `defer/recover` 的修复方案，目前正在积极修改中。
- 🟢 **已修复 (CLOSED)**:
  - **Telegram 位置消息无响应** ([#3049](https://github.com/sipeed/picoclaw/issues/3049)): 用户在 Telegram 发送位置 Pin 点时 Agent 无反应。**已通过 PR [#3052](https://github.com/sipeed/picoclaw/pull/3052) 合并修复**，现在位置信息将被转换为 `[User location: lat=x, lng=y]` 文本送入 Agent 推理管线。

#### 6. 功能请求与路线图信号
结合 Issue 与 PR 动态，可以看出项目下一阶段的演进信号：
1. **多模态感知能力**: Telegram Location 的修复表明，社区正致力于让 Agent 能够理解非文本输入

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下是为您生成的 2026 年 6 月 9 日 NanoClaw 项目动态日报。

---

# 📊 NanoClaw 项目动态日报 (2026-06-09)

## 1. 今日速览
今日 NanoClaw 项目整体保持较高的开发专注度，社区贡献主要聚焦于**底层安全架构增强**与**部署配置优化**。过去 24 小时内，项目共处理了 3 个 Pull Requests（其中 2 个已关闭/合并，1 个待审查），并新增了 1 个重要的环境配置缺陷报告。目前项目处于平稳迭代期，主分支无新版本发布，但底层网络隔离与鉴权机制正在得到显著加强。

## 2. 版本发布
*今日无新版本发布。*

## 3. 项目进展
今日共有 2 个 PR 被关闭（视作已合并或终止），1 个 PR 处于开启待合并状态，项目在安全控制粒度上取得了具体进展：
*   **容器网络安全隔离落地 ([PR #2713](https://github.com/nanocoai/nanoclaw/pull/2713))**：由 @omri-maya 提交的 `egress lockdown`（出站流量锁定）功能已关闭。该 PR 实现了可选的（默认关闭）Docker 容器网络隔离，通过将容器置于 `--internal` 网络并仅通过网关代理路由，有效限制了智能体的未经授权网络访问。这为未来需要高安全标准的部署环境提供了基础支持。
*   **贡献流程处理 ([PR #2712](https://github.com/nanocoai/nanoclaw/pull/2712))**：由 @juhojeon86 提交的标准化贡献 PR 已关闭，保障了项目主分支的整洁性。

## 4. 社区热点
由于今日暂无引发大量评论的泛娱乐性话题，社区的核心关注点集中在**安全修复**上：
*   **安全漏洞集中修复方案 ([PR #2714](https://github.com/nanocoai/nanoclaw/pull/2714))**：由 @JorellDacasin 发起的 PR 修复了四个鉴权与安全相关问题（包括将 webhook 默认绑定至 `127.0.0.1` 以防范未授权访问，以及使用 `crypto.randomUUID()` 替换 `Math.random()` 以防范时序预测攻击）。这反映了社区开发者对 AI 智能体作为服务端时的安全脆弱性有着极高的敏感度，且正在积极帮助项目达到企业级安全标准。

## 5. Bug 与稳定性
今日新增 1 个关键稳定性缺陷，主要涉及多模态通讯渠道的文件挂载问题：
*   **[严重程度：高] WhatsApp 多媒体文件挂载路径失效 ([Issue #2715](https://github.com/nanocoai/nanoclaw/issues/2715))**
    *   **现象**：在 v2 环境中，通过 WhatsApp 接收的附件（图片/文档/音频）被下载到了宿主机的 `DATA_DIR/attachments` 目录，但该目录并未挂载到 Agent 容器内部。导致 Agent 尝试读取 `/workspace/attachments/...` 时抛出路径不存在的错误，彻底丧失多模态文件处理能力。
    *   **状态**：由 @jon-ruth 报告，当前已有明确的问题定位。目前**尚无关联的 fix PR**，需要维护者重点关注。

## 6. 功能请求与路线图信号
从近期的 Issues 和 PRs 走势中，可以捕捉到以下产品技术演进信号：
*   **从“能用”向“安全可控”演进**：[PR #2713](https://github.com/nanocoai/nanoclaw/pull/2713) 的网络隔离方案与 [PR #2714](https://github.com/nanocoai/nanoclaw/pull/2714) 的安全修复，标志着 NanoClaw 正在填补 AI 智能体在执行复杂任务时可能引发的“数据外泄”和“权限提升”漏洞。这对于项目未来进军企业级个人助理市场是强烈且必要的信号。

## 7. 用户反馈摘要
从今日 [Issue #2715](https://github.com/nanocoai/nanoclaw/issues/2715) 反映出的真实用户场景提炼：
*   **核心痛点**：用户正在将 NanoClaw 接入真实的即时通讯软件（如 WhatsApp）进行日常助理交互。
*   **实际诉求**：用户期望助手能够无缝处理“发送图片/语音文档 -> Agent 读取并分析”的连贯闭环。目前的 Docker 架构升级（v2）可能导致了卷映射的回归测试遗漏，说明用户对多模态输入的需求非常频繁，这对文件系统挂载的健壮性提出了更高要求。

## 8. 待处理积压
建议项目维护者 (@maintainers) 优先关注以下待处理事项：
1.  **[P0] 处理 WhatsApp 文件挂载问题 ([Issue #2715](https://github.com/nanocoai/nanoclaw/issues/2715))**：此 Bug 直接导致通过 WhatsApp 渠道接入的 AI 智能体变成“瞎子/聋子”，严重影响核心体验，建议尽快确认是否为 v2 架构升级导致的回归缺陷，并提交热修复。
2.  **[P1] 审查安全相关 PR ([PR #2714](https://github.com/nanocoai/nanoclaw/pull/2714))**：涉及加密算法替换和监听地址变更，对底层架构影响较大，建议及时进行 Code Review 并验证其向下兼容性（尤其是 `WEBHOOK_BIND_HOST` 的引入）。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-06-09)

## 1. 今日速览
IronClaw 项目今日保持极高活跃度，过去 24 小时内共更新了 **50 个 Pull Requests**（其中 25 个已顺利合并/关闭）和 **34 个 Issues**（12 个关闭）。从开发轨迹来看，项目目前正处于 **“Reborn” 架构重构的深水区**，核心开发者正全力推进 OpenAI 兼容 API、产品工作流和底层鉴权的生产级就绪。同时，社区贡献非常积极，提交了多个针对 LLM 供应商（如 Codex、DeepSeek、Minimax）及集成渠道（Telegram、Google Calendar）的关键 Bug 修复与诊断。项目整体健康度良好，展现出快速迭代的强劲势头。

## 2. 版本发布
**无新版本发布**。
*注：核心发布追踪 PR [#3708](https://github.com/nearai/ironclaw/pull/3708) 仍在待合并状态，预计下一版本将包含 `ironclaw_skills` 的破坏性更新（0.3.0 -> 0.4.0）。*

## 3. 项目进展
今日合并及关闭了多个重量级 PR，项目在底层架构和多渠道适配上迈出了坚实的一步：
*   **Reborn 子智能体架构升级**：PR [#4572](https://github.com/nearai/ironclaw/pull/4572) 被合并，引入了全新的 `planner` 子智能体类型，替代了原有的 `researcher`，使得 AI 能够输出结构化的计划。
*   **LLM 规范化提供者适配**：PR [#4576](https://github.com/nearai/ironclaw/pull/4576) 被合并，为 `ToolCall` 增加了 `arguments_parse_error` 字段，为后续更健壮的异常处理打下基础。
*   **Google Calendar 工具修复**：PR [#4578](https://github.com/nearai/ironclaw/pull/4578) 修复了倒序排期问题，确保默认返回即将到来的事件而非多年前的事件。
*   **Codex 模型解锁**：PR [#4566](https://github.com/nearai/ironclaw/pull/4566) 合并，修复了硬编码 `client_version` 导致无法使用最新模型（如 gpt-5.5）的问题。
*   **系统状态持久化**：PR [#4528](https://github.com/nearai/ironclaw/pull/4528) 为 Slack 渠道接入了文件系统支持的产品工作流持久化机制。

## 4. 社区热点
今日讨论最热烈的问题集中在 **Reborn 架构下的 OpenAI 兼容 API 迁移** 及 **安全与鉴权合规**：
*   **OpenAI 兼容 API 迁移策略**：Issue [#3283](https://github.com/nearai/ironclaw/issues/3283)（评论数 3）持续引发关注，讨论如何将 Chat 和 Responses API 平滑迁移至 Reborn 模型。正在审核的巨型 PR [#4495](https://github.com/nearai/ironclaw/pull/4495) 和 [#4546](https://github.com/nearai/ironclaw/pull/4546) 均为该议题的落地实现。
*   **生产环境鉴权闭环**：Issue [#4175](https://github.com/nearai/ironclaw/issues/4175)（评论数 3）讨论了生产环境 OAuth PKCE 的高可用安全性及后端对等性问题。
*   **第三方 Hook 安全审计**：Issue [#3957](https://github.com/nearai/ironclaw/issues/3957) 和 [#3959](https://github.com/nearai/ironclaw/issues/3959) 深入探讨了 Hook 激活的加固和安全审计接收器的采用，反映出项目对多租户安全隔离的高度重视。

## 5. Bug 与稳定性
今日报告了多个影响用户体验的 Bug，部分已在积极修复中：
*   **[High] DeepSeek API 400 错误**：Issue [#4548](https://github.com/nearai/ironclaw/issues/4548) 指出，当请求包含 tools 时，序列化会产生重复的顶层 `model` 字段，导致 DeepSeek 报错。目前暂未看到对应的合并修复 PR。
*   **[High] Telegram 升级后会话断裂**：Issue [#4556](https://github.com/nearai/ironclaw/issues/4556) 报告生产环境从 0.28.2 升级到 0.29.1 后，Telegram 消息无法在原有会话中继续，而是创建了新的 WebUI 会话。
*   **[Medium] Minimax 供应商配置失效**：Issue [#4587](https://github.com/nearai/ironclaw/issues/4587) 报告配置 Minimax 供应商时无法读取存储的密钥元数据。
*   **[High] OAuth 登录重定向死循环**：Issue [#4536](https://github.com/nearai/ironclaw/issues/4536) 报告启用 SSO 后，用户登录直接跳转至 `/welcome`

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 (2026-06-09)

## 1. 今日速览
- 过去 24 小时内，LobsterAI 项目展现了极高的代码合入活跃度，共有 **17 个 PR** 产生动态，其中 **16 个已被合并/关闭**，仅 1 个处于开启状态。
- Issues 板块今日无新增或更新，开发者的主要精力集中在现有代码库的合并、新功能的引入以及历史积压 PR 的集中清理。
- 核心贡献者 `@fisherdaddy`、`@liuzhq1986` 及 `@MaoQianTu` 等人推动了桌面端体验的重大升级，涵盖了数据迁移、本地登录授权流优化及 IM 通知机制修复等多个关键领域。

## 2. 版本发布
- **无新版本发布**。

## 3. 项目进展
今日项目迎来了功能迭代与错误修复的高峰，共合并了 16 个 PR，整体在以下三个维度取得了显著进展：

- **数据迁移与备份机制落地**：合并了由 `@fisherdaddy` 提交的系列 PR（[#2125](https://github.com/netease-youdao/LobsterAI/pull/2125)、[#2126](https://github.com/netease-youdao/LobsterAI/pull/2126)、[#2128](https://github.com/netease-youdao/LobsterAI/pull/2128)），正式引入了用户数据备份与恢复服务，并解决了迁移过程中的运行时锁文件保留及网络目录排挤问题。
- **桌面端授权体验大幅优化**：`@liuzhq1986` 贡献的本地回调登录流（[#2122](https://github.com/netease-youdao/LobsterAI/pull/2122)）及相关修复（[#2127](https://github.com/netease-youdao/LobsterAI/pull/2127)、[#2129](https://github.com/netease-youdao/LobsterAI/pull/2129)）被合并，有效规避了浏览器的外部应用确认弹窗，并修复了 Windows 端登录后窗口焦点抢占失败的痛点。
- **历史遗留缺陷全面清理**：多个标记为 `[stale]` 的社区 PR 在今日被集中合并，包括解决 QQ Bot 白名单 UI 缺失（[#1514](https://github.com/netease-youdao/LobsterAI/pull/1514)）、日志导出超时（[#1515](https://github.com/netease-youdao/LobsterAI/pull/1515)）、OpenClaw 虚假网关重启（[#1521](https://github.com/netease-youdao/LobsterAI/pull/1521)）等问题。

## 4. 社区热点
今日并未出现讨论热度极高的单一议题，但维护者对积压 PR 的集中处理引起了开发群落的广泛关注。大量数月前提交的改进被重新审视并合入主分支，特别是：
- **模型动态获取功能**（[#1522](https://github.com/netease-youdao/LobsterAI/pull/1522)）：解决了用户需手动配置新上线模型（如 GLM-5.1）的痛点。
- **连接测试错误提示优化**（[#1524](https://github.com/netease-youdao/LobsterAI/pull/1524)）：完善了 API 连接失败时的反馈细节，极大降低了用户排查网络配置的门槛。

## 5. Bug 与稳定性
今日处理的 PR 中修复了多个影响用户体验的核心 Bug，按严重程度排列如下：
- **P0 - 核心功能受阻**：
  - **QQ Bot 白名单完全不可用**：UI 层缺失输入框导致无法配置群组 ID（[PR #1514](https://github.com/netease-youdao/LobsterAI/pull/1514)，已修复）。
  - **日志导出超时崩溃**：大日志文件压缩耗时过长突破 30 秒限制，导致导出失败（[PR #1515](https://github.com/netease-youdao/LobsterAI/pull/1515)，已修复）。
- **P1 - 状态与逻辑异常**：
  - **Windows 端登录后无响应**：浏览器登录完成后，桌面端无法正常置顶并停止闪烁（[PR #2127](https://github.com/netease-youdao/LobsterAI/pull/2127)，已修复）。
  - **OAuth Token 静默丢失**：设置面板关闭时未能取消 GitHub Copilot 认证轮询（[PR #1517](https://github.com/netease-youdao/LobsterAI/pull/1517)，已修复）。
  - **IM 通知静默发送失败**：定时任务未选择会话即可提交，导致通知发往空地址（[PR #1510](https://github.com/netease-youdao/LobsterAI/pull/1510)，已修复）。

## 6. 功能请求与路线图信号
从近期的合并记录中，可以观察到 LobsterAI 正在向以下产品方向演进：
- **多设备与数据便携性**：用户数据打包与恢复（[#2125](https://github.com/netease-youdao/LobsterAI/pull/2125)）的引入，表明项目正在为多端数据同步和跨设备迁移做底层准备。
- **可视化与自定义增强**：新增会话颜色标注（[#1526](https://github.com/netease-youdao/LobsterAI/pull/1526)），满足用户对多会话并行时的视觉区分诉求。
- **网关调试友好度提升**：在设置中暴露 OpenClaw 网关地址和运行状态（[#2123](https://github.com/netease-youdao/LobsterAI/pull/2123)），为高级用户进行本地集成和排障提供了便利。

## 7. 用户反馈摘要
虽无新增 Issues，但从今日合并的缺陷修复中，可提炼出用户在使用过程中的核心痛点：
- **配置门槛高且反馈差**：用户在对接不同 LLM 供应商时经常遇到网络问题，过于简单的错误提示曾让用户难以定位是 Key 填错还是网络不通。
- **桌面端系统级兼容性瑕疵**：尤其是在 Windows 体系下，登录焦点丢失、大文件异步卡顿等 "Electron 常见病" 曾直接影响用户的第一体验。

## 8. 待处理积压
- **[重要依赖更新]** 由 Dependabot 自动发起的 Electron 大版本升级（[PR #1277](https://github.com/netease-youdao/LobsterAI/pull/1277)）目前仍处于 **OPEN** 状态。该 PR 涉及将 `electron` 从 `v40.2.1` 跨越式升级至 `v42.3.3`，由于底层框架的变更可能引发渲染进程和系统兼容性回归，建议维护团队尽快排期进行深度测试与评估。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

# 📊 TinyClaw 项目动态日报 (2026-06-09)

> 数据源: [TinyAGI/TinyClaw](https://github.com/TinyAGI/tinyclaw) | 分析周期: 过去 24 小时

## 1. 📌 今日速览
今日 TinyClaw 项目整体活跃度呈现低位平稳态势，过去 24 小时内无新增 Issues、无已合并的 PRs 以及无新版本发布。项目当前的核心推进力来自社区贡献者对**开发者体验（DX）与安装流畅度**的优化。唯一的一动来自一个旨在解决原生依赖编译痛点的修复 PR，这表明项目虽然处于低频互动期，但在底层基建稳定性上正在积累微小但重要的改进。

## 2. 🚀 版本发布
**本日无新版本发布。** 
（建议关注后续 `better-sqlite3` 安装优化 PR 合并情况，该基建修复可能会促成一次 Patch 版本更新。）

## 3. 🛠 项目进展
今日**无已合并或关闭的 Pull Requests**，整体代码库无变更。

但项目在安装体验优化上收到了新的社区贡献，正在等待 Maintainer 审查：
*   **[OPEN] PR [#280](https://github.com/TinyAGI/tinyagi/pull/280) `fix(install): add postinstall script to auto-rebuild better-sqlite3`**
    *   **贡献者**: @dsy122
    *   **进展说明**: 该 PR 通过引入 `postinstall` 钩子脚本，致力于解决底层 C++ 插件 `better-sqlite3` 在不同 Node.js 运行环境下的原生编译问题。一旦合并，将大幅降低新手入门的门槛，消除手动执行 `npm rebuild` 的繁琐步骤，是提升项目“开箱即用”体验的重要一环。

## 4. 🔥 社区热点
今日无高频讨论的 Issues 或 PRs。唯一的动态聚焦于 PR [#280](https://github.com/TinyAGI/tinyagi/pull/280)。
*   **背后诉求分析**: `better-sqlite3` 作为高性能 SQLite 绑定，因其 C++ 底层特性，一直是 Node.js 项目在跨平台部署（尤其是 Windows 或低版本 Linux 环境）时的“重灾区”。此 PR 的提出，侧面反映了近期尝试拉取 TinyClaw 代码进行本地部署的用户或开发者，在环境搭建环节遇到了阻碍。自动化的 rebuild 脚本是社区解决此类原生依赖问题的标准最佳实践。

## 5. 🐛 Bug 与稳定性
今日**无以 Issue 形式直接报告的新 Bug**。但通过待审查的 PR 提炼出以下隐性稳定性/部署问题：

*   **[中等] 原生依赖安装失败导致启动崩溃**
    *   **表现**: 在全新安装项目时，由于缺乏预编译的二进制文件，`better-sqlite3` 无法正常加载，导致项目启动抛出原生模块未编译的错误。
    *   **状态**: **已有修复 PR** 👉 [PR #280](https://github.com/TinyAGI/tinyagi/pull/280)（当前状态为 OPEN，等待合并）。

## 6. 🗺 功能请求与路线图信号
今日**无新增功能请求**。
从当前基建修复的动态信号来看，项目近期的主要重心可能在于**打磨 AI 智能体的本地运行环境与部署顺滑度**。预计在依赖安装体验得到完全修复后，项目会迎来下一波功能迭代或大版本更新。

## 7. 💬 用户反馈摘要
今日无直接的用户评论数据，但从 @dsy122 在 [PR #280](https://github.com/TinyAGI/tinyagi/pull/280) 中描述的痛点可以逆向提炼出真实用户反馈：
*   **痛点**: “在执行 `npm install` 后经常遇到报错，需要查阅文档并手动运行构建命令。”
*   **期望**: 用户期望作为个人 AI 助手项目，TinyClaw 应当具备纯 JavaScript 生态般的顺滑安装体验，不希望被底层的 C++ 编译环境（如 node-gyp、Python 环境、C++ 编译工具链等）所拖累。

## 8. 📂 待处理积压
今日项目整体无积压的活跃 Issue，但为了保持项目健康度，**提醒 Maintainer 关注以下待决项**：

*   **等待审查的 PR**: [PR #280 (fix: auto-rebuild better-sqlite3)](https://github.com/TinyAGI/tinyagi/pull/280)
    *   **建议**: 此类修改涉及 npm 生命周期钩子，建议维护者在主流操作系统（macOS, Windows, Ubuntu）下进行兼容性测试，确认 `postinstall` 脚本不会引发意外的权限错误或死循环后，尽快合并以改善主分支的安装体验。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw (QwenPaw) 项目动态日报 (2026-06-09)

## 1. 今日速览
过去 24 小时，CoPaw（底层基于 QwenPaw）项目保持了**极高的社区活跃度与开发迭代速度**。共处理了 38 条 Issue（新开/活跃 20 条，关闭 18 条）和 42 个 Pull Request（待合并 20 个，合并/关闭 22 个），展现出维护团队高效的闭环能力。
今日动态主要围绕**多渠道通道（微信/飞书/钉钉）的稳定性修复、桌面端性能优化、以及后端架构（ACP协议与插件生态）的重大升级**展开。虽然今日无新版本发布，但多个合并的核心 PR 表明项目正在为下一次重大版本更新蓄力。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日共有 22 个 PR 被合并或关闭，项目在**前端基础设施、协议支持和底层健壮性**上取得了显著进展：
*   **前端插件扩展机制落地**：[#4997](https://github.com/agentscope-ai/QwenPaw/pull/4997) 合并，为 Console 引入了统一的菜单/路由/插槽注册机制，为后续丰富的插件 UI 打下基础。
*   **ACP (Agent Client Protocol) 协议增强**：[#4949](https://github.com/agentscope-ai/QwenPaw/pull/4949) 合并，扩展了 ACP 服务端能力，使得终端 UI 客户端能够接收更丰富的元数据（指令、错误、文件链接等）。
*   **国际化与测试覆盖**：控制台会话与定时任务控制的本地化 PR [#4286](https://github.com/agentscope-ai/QwenPaw/pull/4286) 合并；同时，76 个新的 Vitest 单元测试被提交 ([#5012](https://github.com/agentscope-ai/QwenPaw/pull/5012))，引入了覆盖率棘轮机制以防止代码质量退化。
*   **安全与稳定性修复**：修复了钉钉频道不同用户消息合并的严重 Bug ([#4932](https://github.com/agentscope-ai/QwenPaw/pull/4932))，并限制 `mlx-lm` 仅在 Apple Silicon 上安装以防依赖冲突 ([#2771](https://github.com/agentscope-ai/QwenPaw/pull/2771))。

## 4. 社区热点
今日社区讨论最热烈的 Issue 侧重于**架构演进与标杆竞品分析**：
*   **关注竞品“学习循环”机制**：[#5017](https://github.com/agentscope-ai/QwenPaw/issues/5017)（👍 2，评论 7）。用户建议借鉴近期大热的 Hermes Agent，引入“从自身行为中自动创建并迭代技能”的学习循环机制。这反映出用户对 Agent 自动化能力从“被动执行”向“自主进化”的强烈期待。
*   **后端重大重构预告**：[#4727](https://github.com/agentscope-ai/QwenPaw/issues/4727)（👍 2，评论 6）。官方发布了将底层依赖从 AgentScope 1.x 迁移到 2.0 的 Breaking Change 计划，引起了开发者的密切关注与讨论。
*   **微信通道定时任务失败**：[#4477](https://github.com/agentscope-ai/QwenPaw/issues/4477)（评论 15）。该问题引起广泛共鸣，用户反馈微信 iLink 通道在 `context_token` 过期时无重试逻辑，导致定时任务形同虚设。

## 5. Bug 与稳定性
今日报告了多个影响用户体验的 Bug，部分已产生修复 PR：
*   **严重 (High)**：Windows 桌面端性能断崖式下跌。[#5015](https://github.com/agentscope-ai/QwenPaw/issues/5015) 指出执行任务时 CPU 激增、会话切换卡顿；[#5029](https://github.com/agentscope-ai/QwenPaw/issues/5029) 报告 Pet 功能闪退严重。*(暂无 Fix PR)*
*   **严重 (High)**：多智能体无限轮询。[#4873](https://github.com/agentscope-ai/QwenPaw/issues/4873) 报告同时开启两个 subagent 会导致主 Agent 疯狂轮询，且飞书端无法打断。*(暂无 Fix PR)*
*   **严重 (High)**：MCP 进程堆积。[#4834](https://github.com/agentscope-ai/QwenPaw/issues/4834) 报告重启服务时 MCP 子进程未清理导致系统变慢。👉 **已有修复 PR**：[#5014](https://github.com/agentscope-ai/QwenPaw/pull/5014)。
*   **中等**：图像无限压缩死循环。[#4895](https://github.com/agentscope-ai/QwenPaw/issues/4895) 上传图片时触发循环压缩导致 Agent 产生幻觉。*(暂无 Fix PR)*
*   **已修复**：`submit_to_agent` 后台任务路径错误 ([#5025](https://github.com/agentscope-ai/QwenPaw/issues/5025)) 已提交流修 PR [#5026](https://github.com/agentscope-ai/QwenPaw/pull/5026)。

## 6. 功能请求与路线图信号
结合今日的 Issue 与 PR，项目接下来的演进路线清晰指向**多模态增强、生态丰富度与开发者体验**：
*   **视觉模型解耦**：[#4992](https://github.com/agentscope-ai/QwenPaw/issues/4992) 建议支持独立配置视觉模型，以便在主模型为纯文本（如 deepseek-v4-flash）时作为“视觉中转站”。此需求与图像压缩 Bug 结合来看，多模态处理是下个版本的重点。
*   **插件市场上线**：[#5023](https://github.com/agentscope-ai/QwenPaw/pull/5023) 正在集成 AgentScope Platform 的“插件市场”标签页，允许用户一键浏览和安装社区插件。
*   **记忆系统进化**：[#4994](https://github.com/agentscope-ai/QwenPaw/issues/4994) 提出记忆系统“自进化”和分层框架的需求。
*   **轻量化目标模式**：[#4443](https://github.com/agentscope-ai/Q

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*