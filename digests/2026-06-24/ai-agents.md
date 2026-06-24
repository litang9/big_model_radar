# OpenClaw 生态日报 2026-06-24

> Issues: 195 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-06-24 04:39 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

以下是为您生成的 OpenClaw 开源项目 2026-06-24 日报：

# 📊 OpenClaw 项目动态日报 (2026-06-24)

## 1. 今日速览
OpenClaw 今日保持了极高的社区活跃度与开发节奏，过去 24 小时内处理了 **195 条 Issue 更新**（54 个已关闭）和高达 **500 条 PR 更新**（52 个已合并/关闭）。项目于今日发布了 [v2026.6.10](https://github.com/openclaw/openclaw/releases) 版本，引入了备受期待的对话自动快速模式和更可靠的路由机制。然而，当前社区的核心痛点依然集中在**长会话状态管理、上下文压缩以及多提供商兼容性**上，多关于会话中断和消息丢失的 P1 级别 Bug 正在激烈讨论与修复推进中。

---

## 2. 版本发布
### 💡 [v2026.6.10: openclaw 2026.6.10](https://github.com/openclaw/openclaw/releases)
- **自动快速模式**：OpenClaw 现在可以为简短的对话启用快速模式，并在进行较长时间的运行时自动返回具有有限回退和交付行为的正常模式。
- **模型路由更可靠**：改进了 Zai 模型合成路由的稳定性。
*注：无明显破坏性变更说明，但根据社区反馈，从 6.5.x 升级到 6.x 系列仍需注意状态迁移问题（见下文 Bug 板块）。*

---

## 3. 项目进展
今日项目整体向前迈出了坚实的一步，合并/关闭了 52 个 PR，重点优化了底层任务调度、消息投递可靠性和大文件处理性能：
- **性能突破**：PR [#89040](https://github.com/openclaw/openclaw/pull/89040) 修复了 `embedded_run` 引导阶段同步文件 I/O 阻塞事件循环长达 14-22 秒导致的消息丢失问题，大幅提升长会话稳定性。
- **消息队列健壮性**：PR [#96247](https://github.com/openclaw/openclaw/pull/96247) 修复了批量发送中途失败时的队列状态卡死问题；PR [#80929](https://github.com/openclaw/openclaw/pull/80929) 增加了对确定性投递失败（如路径非法、消息超长）的精准报错。
- **大模型交互优化**：PR [#79655](https://github.com/openclaw/openclaw/pull/79655) 清理了已完成 Codex Responses 的工具重放，减少上下文冗余；PR [#80788](https://github.com/openclaw/openclaw/pull/80788) 修复了 Discord 的 Gzip 响应解析错误。

---

## 4. 社区热点
今日讨论度最高的问题反映了用户在**复杂环境部署**与**底层机制设计**上的诉求：
- 🔥 **[Issue #88838](https://github.com/openclaw/openclaw/issues/88838) (35 评论)**：追踪核心会话 SQLite 迁移。维护者与社区正在深度推进底层文件支持的采用阶段。
- 🔥 **[Issue #96148](https://github.com/openclaw/openclaw/issues/96148) (17 评论)**：追踪 iMessage 源回复延迟。用户提供了大量本地补丁的测试数据，呼吁官方加入更完善的性能插桩。
- 🔥 **[Issue #42840](https://github.com/openclaw/openclaw/issues/42840) (8 评论, 7 👍)**：请求在控制台 UI 中支持 MathJax/LaTeX 渲染。这是科研和学术用户极其强烈的核心诉求。

---

## 5. Bug 与稳定性
今日报告了多个影响严重的稳定性 Bug，主要集中在会话中断和验证失效：

**🔴 P1 高危漏洞**
- **[Issue #94228](https://github.com/openclaw/openclaw/issues/94228) / [Issue #92201](https://github.com/openclaw/openclaw/issues/92201)**：原生 Anthropic 路径重放历史 `thinking` 块时，会触发 `Invalid signature` 400 错误，导致长工具链会话直接永久性损坏。*已有修复 PR 跟进中。*
- **[Issue #48003](https://github.com/openclaw/openclaw/issues/48003)**：`steer` 模式无法在工具执行间隙向主会话注入中途消息，违反了其预期的设计行为。*已有修复 PR 打开。*
- **[Issue #92043](https://github.com/openclaw/openclaw/issues/92043)**：180 秒的压缩超时设置缺乏进度复用机制，导致长历史记录的合法压缩在每一轮都必然失败。

**🟠 P2 回归与其他**
- **[Issue #94939](https://github.com/openclaw/openclaw/issues/94939)**：6.x 状态迁移导致 MS Teams 频道的 SQLite 对话存储变为 0 字节，破坏了主动发送功能。
- **[Issue #85844](https://github.com/openclaw/openclaw/issues/85844)**：自动更新后，网关进程内存中仍引用旧的哈希包导入，导致旧模块崩溃。

---

## 6. 功能请求与路线图信号
基于 Issue 提案和对应的 PR 进展，推测以下方向可能被纳入下一版本规划：
- **MCP 作为压缩提供者**：[Issue #96156](https://github.com/openclaw/openclaw/issues/96156) 提议允许 `compaction.provider` 接受 MCP 服务器引用。这表明 OpenClaw 正在积极探索将 MCP 协议下放至会话生命周期管理中。
- **会话群组管理**：[Issue #90916](https://github.com/openclaw/openclaw/issues/90916) 请求为单个助手提供“主题-会话族”功能，隔离不同话题的上下文。这是个人 AI 助手迈向长期记忆隔离的关键信号。
- **UI 体验提升**：[Issue #93422](https://github.com/openclaw/openclaw/issues/93422) 请求支持 WebChat 中使用 `/label` 或 `/new <name>` 命令重命名会话；[Issue #94529](https://github.com/openclaw/openclaw/issues/94529) 请求侧边栏自动生成会话标题。

---

## 7. 用户反馈摘要
从海量的 Issue 评论中，提炼出用户当前的真实反馈：
- **痛点：工具执行失败缺乏透明度** ([Issue #46548](https://github.com/openclaw/openclaw/issues/46548))：用户抱怨文件编辑等工具失败时，系统只提示“Edit failed”，不给具体原因（是文本不匹配还是权限不足？），导致 Agent 陷入盲目重试的死循环。
- **痛点：误导性中止提示** ([Issue #88870](https://github.com/openclaw/openclaw/issues/88870))：对于耗时较长的深度思考（如 `thinking: max`），系统容易误判为“会话卡死”并强制中止，还会向用户弹出“操作已被用户中止”的误导信息。
- **亮点/诉求：跨后端上下文** ([Issue #79047](https://github.com/openclaw/openclaw/issues/79047))：用户频繁在不同 CLI 后端（如 Claude-cli 到 Openrouter）间切换，迫切需要 OpenClaw 能够在新后端中还原之前的对话状态。

---

## 8. 待处理积压
以下重要 Issue 已经有较长时间未得到根本性解决，建议维护团队优先分配精力：
- **[Issue #38520](https://github.com/openclaw/openclaw/issues/38520) (创建于 3 月 7 日)**：请求在上下文压缩前给 Agent 发出通知，并提供延迟机制。此功能对于执行长状态工作流的 Agent 至关重要，目前仍未实现。
- **[Issue #49931](https://github.com/openclaw/openclaw/issues/49931) (创建于 3 月 18 日)**：Windows 下 `exec` 工具硬编码使用 PowerShell 导致的高级命令（管道、正则等）转义极其痛苦，用户强烈呼吁增加 Shell 可配置选项。

---

## 横向生态对比

作为专注于 AI 智能体与个人 AI 助手生态的技术分析师，基于 2026-06-24 的开源项目动态数据，为您提供以下深度的横向对比分析报告。

---

# 📊 AI 智能体开源生态横向对比分析报告 (2026-06-24)

## 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于**从“单体可用”向“复杂环境高可用”跨越的关键爆发期**。项目核心焦点已从单纯的模型对接，迅速转移至**长会话状态管理、多平台网关稳定性以及 Token/上下文工程的极限压榨**上。生态呈现出明显的“中枢化”趋势，智能体正逐渐脱离简单的对话框，演变为支持多模态调度、跨后端漫游、甚至多智能体协同的底层个人操作系统。

## 2. 各项目活跃度对比
今日两大项目均表现出极高的社区热情，处理能力处于行业顶尖水平，但在版本节奏和 Issue 收敛上各有侧重。

| 项目名称 | Issue 更新 (活跃/关闭) | PR 更新 (合并/待处理) | Release 情况 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 195 条 (141/54) | 500 条 (52/448) | **v2026.6.10** (含路由与模式优化) | **A (稳步迭代)**：发布新版本回应痛点，正集中精力攻坚底层状态存储与长会话中断的 P1 级 Bug。 |
| **Hermes Agent** | 247 条 (214/33) | 500 条 (144/356) | 无 | **A- (高速扩张)**：合入超 140 个 PR，平台兼容与安全修复进展神速，但 Issue 积压与核心架构 RFC 决策稍显滞后。 |

## 3. OpenClaw 在生态中的定位
*   **定位：深度上下文与长程任务的主控引擎。**
*   **技术路线差异**：相比同类项目，OpenClaw 极其执着于**会话生命周期的健壮性**。今日对底层 SQLite 迁移、MCP 作为压缩提供者、以及修复“重放历史 thinking 块签名错误”的投入，表明其致力于打造一个几乎“永不失忆、永不崩溃”的坚固底座。
*   **社区规模与优势**：社区讨论极具深度（如讨论底层文件支持、性能插桩），吸引了大量构建长期工作流和科研型用户（如呼吁 MathJax 渲染）。其优势在于**路由机制的可靠性**与**状态压缩的灵活性**。

## 4. 共同关注的技术方向
多项目不约而同地将资源投入到以下领域，这构成了当前生态的“基建核心”：
1.  **上下文与 Token 极限优化**：
    *   *OpenClaw*：正遭遇 180 秒压缩超时的瓶颈，探索通过 MCP 协议下放压缩能力，并清理已完成工具的重放冗余。
    *   *Hermes Agent*：面临巨大的 Token 固定开销（单次调用 Schema 占用 73%），社区强烈呼吁实现“懒加载工具模式”。
2.  **跨平台网关的异步状态管理**：
    *   *OpenClaw*：正在修复 MS Teams 的 SQLite 存储归零、iMessage 源回复延迟及 Discord Gzip 解析错误。
    *   *Hermes Agent*：正在解决 Telegram 超长字符流式传输死循环、飞书 WebSocket 断连重试冲突。
3.  **凭据安全与防中断机制**：
    *   *Hermes Agent* 修复了密码脱敏导致的模型死循环与路径遍历漏洞；*OpenClaw* 则在着力解决深度思考被系统误判中止的 UX 体验问题。

## 5. 差异化定位分析
| 维度 | OpenClaw | Hermes Agent |
| :--- | :--- | :--- |
| **功能侧重** | **单点深挖**：聚焦长会话压缩、多后端上下文还原（如 CLI 后端切换状态保持）、主题会话族隔离。 | **触角延伸**：侧重多智能体编排（ACP 客户端泛化）、多通讯协议支持（Zulip, Session 去中心化协议）。 |
| **目标用户** | 面向需要**长时间、不间断执行复杂任务**的开发者与重度科研用户。 | 面向希望将 Agent 接入**各种社交/通讯平台**，以及需要将 Agent 作为路由中枢的 Privaté 部署团队。 |
| **架构攻坚** | 底层 I/O 阻塞解决、文件系统（SQLite）直接状态管理。 | 云厂商原生对接（Vertex AI）、桌面端跨架构适配、热更新机制（Pluggable SessionDB）。 |

## 6. 社区热度与成熟度
*   **【质量巩固期】OpenClaw**：处于**收拢与加固**阶段。虽然新版本发布频繁，但当前 6.x 系列的主要精力在于消化历史遗留的状态迁移痛点（多 P1 级别长会话 Bug）。社区互动极其务实，大量围绕本地补丁测试展开。
*   **【高速迭代期】Hermes Agent**：处于**野蛮生长与规范化**过渡期。单日合并 144 个 PR 显示了强大的社区贡献力，安装器、平台适配等外围基建快速完善。但在核心痛点（如 SessionDB 架构重构、Mac Intel 架构支持）上存在决策积压（RFC 沉寂超 1 个月）。

## 7. 值得关注的趋势信号
从今日的社区反馈与 PR 动态中，为 AI 应用开发者提取以下高价值趋势信号：
1.  **MCP 协议正在“吞噬”生命周期管理**：OpenClaw 探索让 MCP Server 充当压缩提供者，这意味着 MCP 将不再局限于工具调用，而是开始接管 Agent 的记忆与存储，开发者应尽快熟悉 MCP 在状态管理中的应用。
2.  **Schema 优化将成为核心性能壁垒**：Hermes Agent 暴露的“工具描述挤占 70%+ 上下文”问题敲响了警钟。未来，**工具的动态按需加载** 将成为各类 Agent 框架的标配，固定全量注入 Prompt 的时代即将结束。
3.  **多智能体互联标准初现**：Hermes 社区呼吁泛化 ACP（智能体通信协议）以支持外部 Agent（如 Claude/Cursor）调度。个人助手正从“执行者”转变为“局域网调度器”，支持委派任务的架构设计将赢得重度用户的青睐。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

以下是为您生成的 Hermes Agent 项目 2026-06-24 动态日报。

---

# 📊 Hermes Agent 项目动态日报 (2026-06-24)

### 1. 今日速览
Hermes Agent 今日维持了极高的活跃度，共有 **247 条 Issue 更新**（214 条活跃/新开，33 条关闭）与 **500 条 PR 更新**（356 条待处理，144 条已合并/关闭）。尽管今日无新版本发布，但开发者社区展现了强大的贡献热情，一天内处理了超过 140 个 PR，项目在平台适配（特别是 iMessage/Photon 和 Windows 安装器）、安全漏洞修复以及 UX 优化方面取得了实质性进展。当前项目的核心痛点集中在 **Token 固定开销过大** 以及 **多平台网关的稳定性** 上。

### 2. 版本发布
**今日无新版本发布。** 鉴于今日有大量涉及核心安全与安装器的 PR 被合并，预计近期可能会酝酿一次修补版本。

### 3. 项目进展
今日共有 144 个 PR 被合并或关闭，项目在以下几个关键领域取得了显著推进：
*   **安全加固**：PR [#40920](https://github.com/NousResearch/hermes-agent/pull/40920) 修复了 `skill_view` 命令中的路径遍历漏洞，防止恶意输入读取 `.env` 等敏感文件，显著提升了系统的安全性。
*   **安装器与 Windows 兼容性**：PR [#51602](https://github.com/NousResearch/hermes-agent/pull/51602) 和 [#50790](https://github.com/NousResearch/hermes-agent/pull/50790) 彻底修复了 Windows 环境下由于硬编码 Python 3.11 导致虚拟环境创建失败的问题。
*   **iMessage (Photon) 集成稳定**：合并了多个 Photon 相关 PR（[#51161](https://github.com/NousResearch/hermes-agent/pull/51161), [#51584](https://github.com/NousResearch/hermes-agent/pull/51584), [#50071](https://github.com/NousResearch/hermes-agent/pull/50071), [#51105](https://github.com/NousResearch/hermes-agent/pull/51105)），升级了底层 Spectrum SDK，并修复了上游流降级时的静默失败问题。
*   **插件规范化**：PR [#51671](https://github.com/NousResearch/hermes-agent/pull/51671) 修复了字典类型工具结果违反标准 Schema 的问题，提升了与 Ollama Cloud 等提供商的兼容性。

### 4. 社区热点
今日讨论最为激烈的问题集中在**性能损耗**与**复杂编排**上：
*   **Token 开销优化亟待落地**：Issue [#6839](https://github.com/NousResearch/hermes-agent/issues/6839)（26 评论）与 Issue [#4379](https://github.com/NousResearch/hermes-agent/issues/4379)（15 评论）深度剖析了每次 API 调用中，工具 Schema 等固定开销占据了 73%（约 13.9K tokens）。社区强烈呼吁实现“懒加载工具模式”以降低成本并提升本地模型表现。
*   **多智能体编排诉求强烈**：Issue [#5257](https://github.com/NousResearch/hermes-agent/issues/5257)（16 👍）提议泛化 ACP 客户端以支持 Claude/Cursor 等外部 Agent；Issue [#9459](https://github.com/NousResearch/hermes-agent/issues/9459)（17 👍）提议支持自定义 Agent 配置文件进行任务委派。这表明重度用户正将 Hermes 视作多智能体网络的中央路由器。

### 5. Bug 与稳定性
今日报告了多个高危（P1）Bug，部分已有关联修复进展：
*   **[P1] 凭证池覆盖 (已有关联修复)**：Issue [#19566](https://github.com/NousResearch/hermes-agent/issues/19566) 指出 OpenAI-Codex 凭证池在轮询时会被旧配置覆盖，导致凭证丢失。今日合并的 PR [#50673](https://github.com/NousResearch/hermes-agent/pull/50673) 修复了相关的 OAuth-only 提供商认证逻辑。
*   **[P1] 密码脱敏导致模型逻辑死循环**：Issue [#43083](https://github.com/NousResearch/hermes-agent/issues/43083) 报告了一个设计缺陷：系统将工具调用参数中的密码替换为 `***`，但模型读取自身历史记录时无法识别，导致第二次工具调用失败。
*   **[P1] Telegram 消息死循环**：Issue [#48648](https://github.com/NousResearch/hermes-agent/issues/48648) 报告在流式传输超过 4096 字符时，Telegram 网关会陷入无限嵌套回复死循环。（目前已有 PR [#51663](https://github.com/NousResearch/hermes-agent/pull/51663) 正在尝试修复该问题）。
*   **[P1] 桌面端构建失败**：Issue [#47917](https://github.com/NousResearch/hermes-agent/issues/47917) 指出更新后 Electron 二进制缓存被删除导致桌面端构建再次失败。

### 6. 功能请求与路线图信号
结合 Issue 需求与当前开放的 PR，以下方向极有可能被纳入下一阶段路线图：
*   **云大厂原生支持**：用户强烈要求原生支持 Google Vertex AI（Issue [#13484](https://github.com/NousResearch/hermes-agent/issues/13484)），而 PR [#8427](https://github.com/NousResearch/hermes-agent/pull/8427) 已经提交了基于服务账户的 Vertex AI 实现代码，合并概率极高。
*   **通讯平台扩展**：PR [#3335](https://github.com/NousResearch/hermes-agent/pull/3335) 正在增加 Zulip 集成，PR [#6948](https://github.com/NousResearch/hermes-agent/pull/6948) 正在增加去中心化协议 Session 的支持。
*   **自托管与反代支持**：Issue [#34390](https://github.com/NousResearch/hermes-agent/issues/34390) 要求为 Web Dashboard 增加 `--allowed-hosts` 标志，以支持 Tailscale 和 Nginx 反向代理访问，反映了项目正被更多团队应用于私有网络环境。

### 7. 用户反馈摘要
从评论和 Issue 描述中，可以提炼出以下真实痛点：
*   **本地/边缘模型体验不佳**：庞大的工具集注入导致上下文被挤占，使得 Hermes 在运行本地模型时显得“笨重”且昂贵。
*   **凭据与状态管理脆弱**：多个 Issue 反映在 Windows 环境下安装困难、路径包含空格即崩溃（Issue [#43334](https://github.com/NousResearch/hermes-agent/issues/43334)），以及并发状态下凭证极易丢失。
*   **网关细节体验欠缺**：诸如 Telegram 输入指示器卡死（Issue [#28004](https://github.com/NousResearch/hermes-agent/issues/28004)）、飞书平台 WebSocket 断连重试冲突（PR [#43318](https://github.com/NousResearch/hermes-agent/pull/43318)）等问题，说明多平台网关在处理长连接和异步状态时仍需打磨。

### 8. 待处理积压
以下重要 Issue/PR 沉寂较久或需要官方核心团队介入决策：
*   **Issue [#23717](https://github.com/NousResearch/hermes-agent/issues/23717) (Pluggable SessionDB)**：提议将状态库从 SQLite 迁移至 PostgreSQL/MySQL 以解决“热更新死亡螺旋”问题，该 RFC 提出已逾 1 个月，亟待官方表态。
*   **Issue [#42199](https://github.com/NousResearch/hermes-agent/issues/42199) (macOS Intel 版本)**：大量 Intel Mac 用户无法运行仅提供 ARM64 的桌面应用，官方尚未明确是否将 x86_64 纳入 CI/CD。
*   **PR [#22648](https://github.com/NousResearch/hermes-agent/pull/22648) (Ollama Cloud 集成)**：此大型功能 PR 由于底层架构重构经历了痛苦的 Rebase，急需维护者进行 Review 以防再次冲突。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*