# OpenClaw 生态日报 2026-06-18

> Issues: 500 | PRs: 500 | 覆盖项目: 11 个 | 生成时间: 2026-06-18 15:43 UTC

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

# 🐾 OpenClaw 项目动态日报 (2026-06-18)

**数据源**: [OpenClaw GitHub Repository](https://github.com/openclaw/openclaw)
**分析周期**: 过去 24 小时

---

### 1. 今日速览
在过去 24 小时内，OpenClaw 项目维持了极高的社区活跃度，共收到 **500 条 Issue 更新**（其中 482 条为新开或活跃）以及 **500 条 PR 更新**。尽管社区贡献热情高涨（有大量针对特定 Bug 的修复 PR 提交），但关闭的 Issue 仅 18 条，合并的 PR 仅 42 条，表明**项目目前可能处于维护者审核负荷较高、积压较严重的瓶颈期**。今日讨论的焦点高度集中在多智能体环境下的会话状态管理、上下文膨胀导致的 Token 浪费，以及部分底层模型（如 DeepSeek/Claude）的 API 成本失控问题。

### 2. 版本发布
**今日无新版本发布。**
*(注：当前最新主分支仍处理 2026.6.1 版本后的后续修复工作，多项 PR 正在为下一个稳定版做准备。)*

### 3. 项目进展
今日有 42 个 PR 被合并或关闭，同时有大量高价值的修复 PR 正在等待审核。项目在跨平台兼容性、消息推送通道和底层安全方面取得了实质性进展：
*   **底层与跨平台修复**：针对 macOS 用户至关重要的一项修复 [PR #90323](https://github.com/openclaw/openclaw/pull/90323) 替换了 `node:sqlite`，解决了 macOS 上无法加载 `sqlite-vec` 导致向量搜索失效的严重问题。
*   **通道与交互修复**：多个针对第三方通道的修复已就绪，包括 Telegram 消息溢出与 Markdown 链接限制修复 [PR #94128](https://github.com/openclaw/openclaw/pull/94128)、飞书限流配置支持 [PR #94614](https://github.com/openclaw/openclaw/pull/94614)，以及 Matrix 消息解密错误恢复 [PR #94416](https://github.com/openclaw/openclaw/pull/94416)。
*   **安全补丁**：[PR #94574](https://github.com/openclaw/openclaw/pull/94574) 修复了 Slack Bot Token 在 API 请求体中泄露的隐患。
*   **基础设施修复**：社区集中发起 4 个 PR（如 [PR #94607](https://github.com/openclaw/openclaw/pull/94607), [PR #94630](https://github.com/openclaw/openclaw/pull/94630)）修复双栈主机下 SSH 隧道端口探测绑定的 Bug。

### 4. 社区热点
今日讨论最热烈的 Issue 集中在**使用成本**和**企业级多智能体部署**上：
*   💸 **[Issue #91016](https://github.com/openclaw/openclaw/issues/91016)**: 升级 2026.6.1 后 DeepSeek Prompt Cache 完全失效。该 Issue 引起了极大共鸣，用户反映因缓存失效导致一小时烧毁约 $6，严重影响了开源模型在生产环境的性价比。
*   🧠 **[Issue #50090](https://github.com/openclaw/openclaw/issues/50090)**: 关于 Community Skill Development & ClawHub。作为项目生态扩展的核心，社区对当前 Skill 开发到发布的体验落差表示担忧，呼吁完善 Driftnet 等基础设施。
*   💡 **[Issue #73182](https://github.com/openclaw/openclaw/issues/73182)**: Claude 模型的 Reasoning 默认被静默开启。直接导致 Anthropic API 花费翻倍，并且 thinking blocks 会被意外泄露到聊天记录中。

### 5. Bug 与稳定性
按严重程度（P1/P2）及影响范围排列：
*   **[P1] 会话重置与死锁 (系统级阻塞)**: 
    *   [Issue #76038](https://github.com/openclaw/openclaw/issues/76038): Stuck Session Recovery 双重失效，事件循环完全阻塞导致 Gateway 无响应，最终被系统强杀。
    *   [Issue #74484](https://github.com/openclaw/openclaw/issues/74484): CLI 网关授权范围死锁，系统陷入无限循环修复请求的死胡同。
*   **[P1] 上下文与 Token 浪费 (状态侵蚀)**: 
    *   [Issue #67419](https://github.com/openclaw/openclaw/issues/67419): Bootstrap 文件每轮对话都被重新注入，白白浪费 20-30% 的 Token 预算。
    *   [Issue #76042](https://github.com/openclaw/openclaw/issues/76042): 自 2026.5.xx 版本以来，新版本纯净安装出现严重回归，初始化耗时极长。
*   **[P1] 消息丢失与幻觉**: 
    *   [Issue #58450](https://github.com/openclaw/openclaw/issues/58450): Agent 承诺后续跟进，但实际并未触发任何后台动作，造成“伪执行”幻觉。
    *   [Issue #64810](https://github.com/openclaw/openclaw/issues/64810): Telegram 频道中，心跳事件会强行打断并“吞没”正在生成中的用户回复。

### 6. 功能请求与路线图信号
从开放的功能请求中，可以清晰看出 OpenClaw 向**企业级多租户/多智能体架构**演进的趋势：
*   **多智能体独立化**: 用户强烈要求按 Agent 维度进行独立配置，而非共享全局。
    *   独立知识库库请求：[Issue #63829](https://github.com/openclaw/openclaw/issues/63829)
    *   独立做梦/记忆清洗机制：[Issue #67413](https://github.com/openclaw/openclaw/issues/67413)（解决多 Agent 同时做梦导致 OOM 宕机）
    *   多语言 STT/TTS 配置：[Issue #66252](https://github.com/openclaw/openclaw/issues/66252)
*   **安全与合规**: [Issue #64046](https://github.com/openclaw/openclaw/issues/64046) 呼吁在配置文件和日志中对 API Key 进行严格脱敏，企业级安全需求愈发明显。
*   **插件生态**: [Issue #73274](https://github.com/openclaw/openclaw/issues/73274) 希望开放跨会话持久化 API，增强插件的上下文操控能力。目前已有对应 PR [PR #75554](https://github.com/openclaw/openclaw/pull/75554) 提交，有希望被纳入下个版本。

### 7. 用户反馈摘要
*   **痛点 1：API 成本焦虑。** 无论是 DeepSeek Cache 失效，还是 Claude 默认开启推理，都反映出用户对 LLM 调用成本极度敏感。任何导致 Token 消耗增加的 Bug 都会引发社区强烈反弹。
*   **痛点 2：长对话上下文管理羸弱。** 频繁的上下文溢出、粗暴的 Token 截断导致记忆错乱（如 [Issue #66443](https://github.com/openclaw/openclaw/issues/66443) 中的用户消息重复）。
*   **好评：架构潜力与活跃的修复。** 尽管面临诸多稳定性挑战，但用户依然认可 OpenClaw 统一多渠道的能力。社区开发者针对日常痛点提交了大量精确到具体代码行的 PR，体现了深厚的技术底色。

### 8. 待处理积压
维护团队当前面临严重的审核积压，以下高优 Issue 仍处于 `clawsweeper:needs-maintainer-review` 状态，急需响应：
1.  **[Issue #57326](https://github.com/openclaw/openclaw/issues/57326)** [P1]: CLI-backed 助手路径绕过 CLI 调度，导致鉴权与安全隐患。
2.  **[Issue #69208](https://github.com/openclaw/openclaw/issues/69208)** [P1]: 跨频道（MSTeams/Webchat 等）广泛存在的重复转录与上下文组装 Bug 集合追踪。
3.  **[Issue #65624](https://github.com/openclaw/openclaw/issues/65624)** [P1]: Mattermost slash 命令使用明文回调 URL（CVSS 评分高达 8.6），涉及严重的命令 Token 泄露。
4.  **[PR #68936](https://github.com/openclaw/openclaw/pull/68936)** [XL]: 引入基于 Claude Agent SDK 的 PR 审查 Autofix 流水线及 Windows 守护进程。这是一个大型架构更新，由于体积较大（XL）一直处于挂起状态，建议维护团队优先评估拆分或合并事宜。

---

## 横向生态对比

基于您提供的 2026-06-18 各开源项目社区动态摘要，以下是一份面向技术决策者和开发者的横向对比分析报告：

# 📊 个人 AI 助手与智能体开源生态横向分析日报 (2026-06-18)

## 1. 生态全景
当前，个人 AI 助手与自主智能体开源生态正处于**从“单一对话工具”向“企业级多代理协作与底层系统级控制”跃升的拐点**。生态内项目普遍将焦点转向**长上下文压缩与 Token 成本优化**，以应对大模型 API 昂贵带来的规模化商用痛点；同时，随着 Agent 获得直接操作文件系统甚至桌面 UI 的权限，**底层沙箱隔离与端侧安全防御**成为悬在各项目头顶的达摩克利斯之剑。此外，围绕**全渠道通讯接入（企微/飞书/Slack 等）与去中心化隐私网关**的基建竞争正日益白热化。

## 2. 各项目活跃度对比
*注：健康度评估综合考量了吞吐量、Bug 响应速度与社区积压情况。*

| 项目名称 | Issues 动态 (活跃/关闭) | PRs 动态 (待处理/合并) | Release 情况 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 (482/18) | 500 (待处理量大) / 42 | 无 | ⚠️ **负荷过载**。社区极度过热，维护者审核严重积压。 |
| **CoPaw** | 50 (15/35) | 31 (14/17) | `v1.1.12.post1` | 🟢 **优异**。高迭代效率，Bug 闭环极快，处于稳定收敛期。 |
| **IronClaw** | 40 (22/18) | 50 (28/22) | 无 | 🟢 **稳健**。全力打磨 V2 引擎，内部测试与 CI 整顿同步推进。 |
| **Zeroclaw** | 50 (全为高活跃) | 50 (高活跃) / 8 | 筹备 `v0.8.1` | 🟡 **高热迭代**。破坏性修复多，底层重构激进，待合并积压较多。 |
| **NanoBot** | 8 | 33 (16/17) | 无 | 🟢 **健康**。稳扎稳打，聚焦易用性与多实例隔离，响应迅速。 |
| **LobsterAI**| 未详 | 14 合并 | 筹备 `2026.6.18`| 🟡 **激进**。多模态功能狂飙，但暴露出严重安全漏洞待修。 |
| **NanoClaw** | 4 (2/2) | 15 (10/5) | 无 | 🟢 **健康**。PR 精准投向安全与多代理权限控制。 |
| **PicoClaw** | 4 | 7 (4/3) | 无 | 🟢 **上升期**。聚焦前沿模型适配与加密通讯架构。 |
| **EasyClaw** | 0 | 0 | `v1.8.36`, `v1.8.37` | 🔵 **闭源/商用驱动**。无社区互动，内部闭环迭代极快。 |
| **TinyClaw** | 3 (高危安全) | 0 | 无 | 🔴 **高危停滞**。连续曝出 P0 级漏洞且官方零响应。 |
| **ZeptoClaw**| 0 | 0 | 无 | ⚪ **静默**。 |

## 3. OpenClaw 在生态中的定位
作为生态的**绝对头部与核心参照系**，OpenClaw 展现出了极强的社区虹吸效应，但也正遭受“规模反噬”：
*   **优势（生态壁垒）**：拥有最完备的跨渠道接入能力（覆盖 Slack, Telegram, 飞书, Matrix 等）和庞大的插件开发者群体。其用户已将其投入复杂的生产环境，从而暴露出极为深度的多智能体死锁、状态侵蚀等高级架构问题，这是其他项目尚未触及的深水区。
*   **技术路线差异**：相较于 Zeroclaw 或 IronClaw 在底层 Runtime（如 WASM 组件、内存硬限制）的精雕细琢，OpenClaw 当前更侧重于应用层的功能堆叠与企业级多租户配置的解耦。
*   **瓶颈与隐患**：今日 500+ 的 Issue/PR 更新与仅 18/42 的关闭/合并率，暴露出其**严重的维护者审核瓶颈**。若不尽快引入 AI 辅助审查（如其自身待审核的 XL 级 PR #68936）或扩充核心维护团队，大量高质量修复 PR 的积压将引发社区摩擦。

## 4. 共同关注的技术方向
从多项目的交叠需求中，可以清晰勾勒出当前 AI 助手领域的四大核心技术攻坚点：
1.  **上下文膨胀与记忆压缩 (Token 成本战)**
    *   *涉及项目*：OpenClaw, CoPaw, NanoBot, Zeroclaw
    *   *具体诉求*：粗暴的 Token 截断会导致 Agent 人设崩塌（如 CoPaw #5171）和进程冻结（OpenClaw #67419）。社区正积极推动引入 `CompressionDecorator` (Zeroclaw) 或 `Headroom` 可逆压缩层 (CoPaw) 等独立上下文管理架构来大幅降低 API 成本。
2.  **底层安全与沙箱运行时隔离**
    *   *涉及项目*：TinyClaw, LobsterAI, NanoClaw, Zeroclaw, PicoClaw
    *   *具体诉求*：随着 Agent 获得执行 Shell 和读写文件的权限，路径穿越 (NanoClaw CVE-2026-29611)、任意文件读取 (TinyClaw #283, LobsterAI #2176) 成为普遍灾难。引入进程内存硬限制 (Zeroclaw) 与强 RBAC 权限白名单已是刚需。
3.  **企业级多代理与多租户架构**
    *   *涉及项目*：OpenClaw, NanoBot, NanoClaw
    *   *具体诉求*：用户不再满足于单一全局 Agent，强烈要求按 Agent 维度进行知识库、记忆清洗、STT/TTS 的独立隔离配置 (OpenClaw #63829 等)。
4.  **桌面级 Computer Use (GUI 自动化)**
    *   *涉及项目*：LobsterAI, Zeroclaw
    *   *具体诉求*：智能体正在突破终端命令行，向“截屏+鼠标/键盘事件控制”的桌面级自动化演进 (LobsterAI 引入 Windows x64 内置套件，Zeroclaw 发起 RFC #6909)。

## 5. 差异化定位分析
*   **基建狂魔 vs. 极客玩具**：**OpenClaw** 和 **CoPaw** 定位为企业级基建中心，强调全渠道打通；而 **NanoBot** 则更注重“小白友好”和移动端 WebUI 体验。
*   **底层原生 vs. 应用胶水**：**Zeroclaw** 和 **IronClaw** 致力于运行时底层重构（Reborn 架构、WASM 插件宿主、原生 i18n）；相比之下，许多项目仍停留在用 Python/Node.js 写 API 胶水代码的阶段。
*   **极致隐私 vs. 效率至上**：**PicoClaw** 走出了一条差异化的“加密与去中心化”路线，其核心受众是对 E2EE 有极高要求的极客（迁移至 vodozemac，接入 Delta Chat）；而 **EasyClaw** 则是纯粹的 B2B 商业降本增效工具（聚焦客服结案与 BI 面板）。

## 6. 社区热度与成熟度分层
*   **第一梯队（繁荣但臃肿，亟待治理）**：**OpenClaw**。社区贡献力爆棚，但核心团队吞吐量达到极限，处于危险的高负荷运转期。
*   **第二梯队（高速冲刺，质量攻坚）**：**IronClaw** (打磨 Reborn)、**Zeroclaw** (修复 v0.8.0 回归)、**CoPaw**。这几个项目处于发版前夕的密集修复期，Bug 响应极快，工程化程度高。
*   **第三梯队（垂直

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

以下是 NanoBot (github.com/HKUDS/nanobot) 开源项目 2026-06-18 的动态日报：

### 1. 今日速览
NanoBot 项目今日展现了高度活跃且健康的迭代节奏，过去 24 小时内共有 33 个 PR 更新与 8 个 Issue 动态。核心开发团队与社区贡献者聚焦于**提升系统稳定性（内存上下文与沙箱安全）**、**优化移动端 WebUI 体验**以及**降低新用户配置门槛**。今日共有 17 个 PR 被成功合并或关闭，项目在多实例管理、记忆压缩机制以及模型服务商（七牛云、OpenAI图像）接入方面取得了实质性进展。

### 2. 版本发布
**今日无新版本发布。**

### 3. 项目进展
今日共有 17 个 PR 被合并或关闭，项目整体在生态兼容性和代码质量上迈出了稳健的一步：
*   **模型生态扩展**：合并了 [PR #3643](https://github.com/HKUDS/nanobot/pull/3643)，正式加入了对七牛云 AI 作为模型提供商的支持。
*   **飞书渠道深度优化**：合并了 [PR #4391](https://github.com/HKUDS/nanobot/pull/4391)，引入了通过 CLI 扫码登录并自动创建飞书机器人的功能，极大降低了渠道配置成本。
*   **沙箱与安全加固**：合并了 [PR #4053](https://github.com/HKUDS/nanobot/pull/4053)，修复了在受限工作区中，写入工具不当继承媒体目录权限导致的安全漏洞。
*   **CI/CD 效率提升**：合并了 [PR #4400](https://github.com/HKUDS/nanobot/pull/4400)，实现了当 PR 仅有 `docs/` 目录变更时自动跳过 CI 流水线，节省了算力资源。

### 4. 社区热点
今日社区讨论的焦点高度集中在**“系统易用性”**与**“多实例隔离”**上：
*   **“小白友好”的多实例管理**：用户 @bukit-kronik 在 [Issue #4390](https://github.com/HKUDS/nanobot/issues/4390) 和 @chengyongru 在 [Issue #4376](https://github.com/HKUDS/nanobot/issues/4376) 中强烈呼吁提供更直观的 UI 隐藏选项和向导设置。这表明 NanoBot 的受众正从极客开发者向更广泛的普通用户群体扩展。
*   **长期的多租户诉求**：[Issue #936](https://github.com/HKUDS/nanobot/issues/936) 再次活跃，用户 @weibo021 呼吁通过单一网关实例管理多个 Agent，以解决资源消耗过大的问题，反映出 NanoBot 在重度使用场景下的架构瓶颈。

### 5. Bug 与稳定性
今日报告了多个关键 Bug，核心团队已迅速响应并提交了修复 PR：
*   **P0 级 - 上下文与记忆丢失**：[Issue #4307](https://github.com/HKUDS/nanobot/issues/4307) 指出，多轮长对话后合并机制会直接抹除 Agent 的最后一条交付消息，导致用户后续提问失去上下文。目前已有对应修复 [PR #4373](https://github.com/HKUDS/nanobot/pull/4373) 待合并。
*   **P1 级 - 工作区读写不一致**：[Issue #4374](https://github.com/HKUDS/nanobot/issues/4374) 发现，Agent 能从项目读取 `SOUL.md`，但写入时却写到了默认工作区。修复方案见 [PR #4387](https://github.com/HKUDS/nanobot/pull/4387)。
*   **P2 级 - 移动端体验受损**：[Issue #4388](https://github.com/HKUDS/nanobot/issues/4388) 报告了 iOS 26.5 Safari 中点击输入框会导致页面异常放大的交互缺陷。

### 6. 功能请求与路线图信号
从最新的 Issue 和活跃 PR 中，可以清晰捕捉到项目接下来的演进方向：
*   **模型容错与动态上下文**：用户在 [Issue #4389](https://github.com/HKUDS/nanobot/issues/4389) 请求为 Fallback 模型单独设置 `contextWindowTokens`，避免上下文超限截断。这暗示了多模型容灾机制的复杂度正在上升。
*   **精细化记忆控制**：[PR #4392](https://github.com/HKUDS/nanobot/pull/4392) 和 [PR #4402](https://github.com/HKUDS/nanobot/pull/4402) 正在推进使工具结果的微压缩可配置化以及“急切记忆合并”功能，未来用户将能更精细地控制 Agent 的记忆调度策略。
*   **WebUI 深度定制**：为响应多实例需求，[PR #4399](https://github.com/HKUDS/nanobot/pull/4399) 添加了 `hiddenSettingsSections` 配置，允许在部署时屏蔽部分系统设置，打造“傻瓜式”前端。

### 7. 用户反馈摘要
*   **真实痛点 - 沙箱限制过于死板**：用户 @jjmanmanrique 反馈在 [Issue #4375](https://github.com/HKUDS/nanobot/issues/4375) 中，即便在工作区允许的子目录内，执行 Git 相关命令仍会被安全策略拦截。这导致日常的代码提交工作流被强制中断（注：该 Bug 已在今日被关闭修复）。
*   **真实痛点 - 图像处理幻觉**：开发者 @michaelxer 指出，当图片输入报错被剔除时，占位符 `[image: <path>]` 会让模型

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

这是一份基于 2026-06-18 GitHub 数据生成的 Zeroclaw 项目动态日报。

# 📊 Zeroclaw 项目动态日报 (2026-06-18)

## 1. 今日速览
- **整体活跃度极高**：过去 24 小时内项目产生了 100 次有效互动（Issues 与 PR 更新各 50 条），且绝大多数（90% 以上）为新开或活跃状态，显示出社区极强的生命力与高频的开发节奏。
- **正式迈入 v0.8.1 发布周期**：虽然今日无正式 Release 发布，但随着核心成员 [@singlerider] 提交了版本号提升至 0.8.1 的 PR (#7938) 及其对应的 Fluent 本地化更新 (#7939)，项目已进入 v0.8.1 的最终发布倒计时。
- **聚焦于安全加固与底层稳定性**：今日提交的大量 PR 集中在 Shell 子进程内存限制、CLI 终端控制、凭证脱敏等底层安全与运行时边界控制上，同时针对 v0.8.0 引入的严重回归问题（如 Slack 频道失效）进行了集中反思与修复。

## 2. 版本发布
**今日无新版本正式发布。**
*注：项目正处于 v0.8.0 到 v0.8.1 的过渡阶段。v0.8.1 的主要目标似乎是修复 v0.8.0 带来的渠道回归问题、深化本地化支持（i18n），以及强化 Runtime 和 Provider 层的执行安全与稳定性。*

## 3. 项目进展
今日项目在**运行时健壮性**和**开发体验**上迈出了重要一步，合并/关闭了 8 个 PR/Issue，并推进了多个关键修复：
- **Shell 执行与安全增强**：推进了针对 Shell 工具的深度修复，包括引入 `runtime_profiles.*.shell_max_memory_mb` 限制子进程内存 ([PR #7937](https://github.com/zeroclaw-labs/zeroclaw/pull/7937))，以及修复孙子进程继承管道导致的死锁问题 ([PR #7935](https://github.com/zeroclaw-labs/zeroclaw/pull/7935))。
- **TUI 与 Web 稳定性**：关闭了关于 Web UI canvas 在 WS 聊天中失效的严重回归 Bug ([Issue #7563](https://github.com/zeroclaw-labs/zeroclaw/issues/7563))，并修复了 TUI 恢复会话时转录记录为空白的问题 ([Issue #7799](https://github.com/zeroclaw-labs/zeroclaw/issues/7799))。
- **本地化与多语言**：合并了针对 `file_download` 工具的中文、日文、西班牙文和法文的翻译支持，修复了非英语用户回退到英语的体验缺陷 ([PR #7925](https://github.com/zeroclaw-labs/zeroclaw/pull/7925), [PR #7924](https://github.com/zeroclaw-labs/zeroclaw/pull/7924))。

## 4. 社区热点
今日讨论度最高的话题集中在**企业级集成**、**底层架构改造**和**桌面端控制能力**上：
- 🔥 **[最高热度] 将 GitHub 恢复为原生渠道** ([Issue #2079](https://github.com/zeroclaw-labs/zeroclaw/issues/2079), 7 评论)：用户 @mits87 强烈呼吁让 Agent 原生支持监听和处理 GitHub 活动（Issues, PRs, 评论），以摆脱当前繁琐的 Webhook 胶水代码。
- 🔥 **[RFC] 桌面级 Computer-use 支持** ([Issue #6909](https://github.com/zeroclaw-labs/zeroclaw/issues/6909), 6 评论)：用户 @NiuBlibing 提出让 ZeroClaw 具备截屏和发送鼠标/键盘事件的能力，直接对标 OpenAI Codex 和竞品 hermes。
- 🔥 **[RFC] 定时任务路由重构** ([Issue #6954](https://github.com/zeroclaw-labs/zeroclaw/issues/6954), 4 评论)：社区深入讨论了将 Cron 任务接入 Orchestrator 消息管道，以解决当前定时任务脱离系统安全控制和上下文管理的架构弊端。
- 🔥 **[RFC] 原生上下文压缩** ([Issue #7673](https://github.com/zeroclaw-labs/zeroclaw/issues/7673), 3 评论)：引入 `CompressionDecorator`，在 Agent 循环和实际 Provider 之间压缩 `ChatRequest`，以此大幅降低长会话的 Token 成本。

## 5. Bug 与稳定性
今日报告了数个阻断性 Bug，主要影响 v0.8.0 的正常使用，但团队反应迅速，多数已有对应 Fix PR：
- 🚨 **[S1 阻断] 预编译版 v0.8.0 丢失 Slack/Discord 支持** ([Issue #7787](https://github.com/zeroclaw-labs/zeroclaw/issues/7787))：严重回归，导致用户配置无误也无法使用 Slack。降级至 0.7.5 可恢复。
- 🚨 **[S1 阻断] OpenAI/Anthropic 回合中原生/MCP 工具不可用** ([Issue #7756](https://github.com/zeroclaw-labs/zeroclaw/issues/7756))：MCP Server 连接正常，但模型无法收到注册的工具。**状态：已有修复 PR [#7933](https://github.com/zeroclaw-labs/zeroclaw/pull/7933) 追踪工具分发决策。**
- 🚨 **[S1 阻断] Anthropic 提供商报 400 错误** ([Issue #7804](https://github.com/zeroclaw-labs/zeroclaw/issues/7804))：长对话或恢复的 Code 会话会导致发送非交替角色的消息。**状态：已有修复 PR [#7931](https://github.com/zeroclaw-labs/zeroclaw/pull/7931) 进行角色合并修复。**
- ⚠️ **[S2 降级] Windows 环境下 74 个测试失败** ([Issue #7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462))：由于 CI 仅在 Linux 运行，Windows 上的路径语义和控制台编码导致大面积测试失败。

## 6. 功能请求与路线图信号
从 Issue 和 PR 汇聚的信号来看，v0.8.1 及后续版本的路线图极其清晰：
1. **安全与隔离默认化**：CLI 审批读取控制终端 ([Issue #7892](https://github.com/zeroclaw-labs/zeroclaw/issues/7892))、Shell 子进程内存硬限制 ([Issue #6916](https://github.com/zeroclaw-labs/zeroclaw/issues/6916)) 的 PR 已经就绪，安全防御正从“应用层”下沉至“运行时与系统层”。
2. **WASM 插件生态启动**：随着 [@bheatwole] 提交的 [PR #7928](https://github.com/zeroclaw-labs/zeroclaw/pull/7928)（初始 WASM 组件模型插件宿主代码），结合讨论中的生命周期钩子订阅 ([Issue #7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822))，预示着 ZeroClaw 即将全面支持跨

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw 项目动态日报 (2026-06-18)**

### 1. 今日速览
过去 24 小时内，PicoClaw 项目保持高度活跃，共处理了 4 条 Issues 和 7 条 Pull Requests。项目当前重心集中在修复近期架构升级带来的稳定性问题，特别是针对前沿模型（如 Gemini 3.5 Flash）的适配与防御性编程。虽然今日无新版本发布，但社区在引入全新 LLM Provider（NEAR AI Cloud）以及强化本地安全与端到端加密（E2EE）方面取得了实质性进展。总体而言，项目处于健康、快速迭代的上升期。

### 2. 版本发布
*今日无新版本发布。*

### 3. 项目进展
今日项目成功合并/关闭了 3 个重要 PR，在架构兼容性和生态扩展上迈出了坚实的一步：
*   **修复 Gemini 3.5 Flash 适配问题**：[PR #3136](https://github.com/sipeed/picoclaw/pull/3136) 已关闭。该 PR 修复了 Gemini 3.5 Flash 在进行 Agentic reasoning 时因 `thought_signature` 大小写格式不一致导致的 `400 Bad Request` 错误，扫清了最新前沿大模型工具调用的障碍。
*   **引入 NEAR AI Cloud 提供商**：[PR #2917](https://github.com/sipeed/picoclaw/pull/2917) 已关闭。正式将 NEAR AI Cloud 作为一等公民 LLM Provider 纳入生态，支持了 TEE（可信执行环境）相关模型的调用，大幅扩展了平台的安全计算模型选择。
*   **增强网络请求诊断能力**：[PR #3141](https://github.com/sipeed/picoclaw/pull/3141) 已关闭。针对 Brave Search API 返回空结果的“静默失败”问题引入了诊断日志，提升了智能体联网搜索工具的可观测性。

### 4. 社区热点
今日社区焦点主要围绕**底层安全架构的去中心化与加密通讯**展开：
*   **放弃 libolm 转向 vodozemac**：[Issue #3088](https://github.com/sipeed/picoclaw/issues/3088) 获得了 2 个点赞，并被标记为 `priority: high`。用户强烈呼吁使用官方的安全替代库 `vodozemac` 替换已停止维护且不安全的 `libolm`。这反映出 PicoClaw 的核心用户群对隐私和端到端加密有着极高的企业级要求。
*   **去中心化通讯网关需求**：用户对接入 SimpleX、Tox 或 Delta Chat 等去中心化/隐私通讯协议作为智能体网关表现出浓厚兴趣（[Issue #3093](https://github.com/sipeed/picoclaw/issues/3093) 与 [PR #3063](https://github.com/sipeed/picoclaw/pull/3063) 呼应）。

### 5. Bug 与稳定性
今日处理并关闭了 2 个影响智能体工具链的核心 Bug：
*   **[已修复] Gemini 3.5 Flash 工具执行崩溃 (严重度高)**：[Issue #3111](https://github.com/sipeed/picoclaw/issues/3111)。在使用新模型时后端 Schema 不兼容导致工具无法执行。已由 [PR #3136](https://github.com/sipeed/picoclaw/pull/3136) 修复。
*   **[已修复] Brave Search API 静默失败 (严重度中)**：[Issue #3125](https://github.com/sipeed/picoclaw/issues/3125)。架构更新（迁移至 `.security.yml`）后，API 返回非标准错误时被误判为搜索成功但无结果，导致 LLM 幻觉。已通过增加日志诊断修复。
*   **[待合并] SSRF 防护绕过风险 (严重度高)**：[PR #3143](https://github.com/sipeed/picoclaw/pull/3143) 揭示了一个 0-day 防御漏洞，当前系统无法识别内嵌私有 IPv4 的 ISATAP IPv6 地址。该 PR 已提交修复方案，等待合并。
*   **[待合并] 子代理异步消息重复推送 (严重度中)**：[PR #3142](https://github.com/sipeed/picoclaw/pull/3142) 指出 `spawn` 子代理完成时会触发重复推送，正在等待审核。

### 6. 功能请求与路线图信号
结合 Issue 与 PR 数据，可以清晰地识别出 PicoClaw 下一阶段的演进方向：
*   **强化通讯与网关能力**：除了修复 Bug，社区正积极推动 PicoClaw 成为一个多协议的 AI Hub。待合并的 [PR #3063 (feat: add deltachat gateway)](https://github.com/sipeed/picoclaw/pull/3063) 表明项目正在拓展跨平台加密通讯的边界。
*   **底层加密升级**：从 `libolm` 到 `vodozemac` 的迁移（[Issue #3088](https://github.com/sipeed/picoclaw/issues/3088)）极大概率将在下个小版本中被纳入，以符合高优安全路线图。

### 7. 用户反馈摘要
*   **痛点**：架构级别的重构（如安全配置文件迁移）容易引发连带兼容性问题；且 API 响应格式的微调（如 Brave API 异常返回、Gemini 签名格式变更）极易破坏 Agent 后端的解析链路。
*   **

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下是为您生成的 NanoClaw 项目 2026-06-18 动态日报：

# 📊 NanoClaw 项目动态日报 (2026-06-18)

## 1. 今日速览
NanoClaw 在过去 24 小时内保持了极高的社区活跃度，共处理了 **4 条 Issue**（2 开 2 关）和 **15 条 PR**（10 待合并 5 已关闭）。项目今日虽未发布新版本，但在底层安全性强化、运行时解耦以及多代理权限控制方面迎来了密集的代码贡献。尤其值得关注的是，开发者 @sturdy4days 集中提交了多个关键的安全与稳定性修复，极大地提升了项目核心链路的健壮性。

## 2. 版本发布
**今日无新版本发布。**
（注：当前主干版本为 v2.1.18，社区已有针对 v2.1.17 的 CHANGELOG 扩展补充 PR，预示着下一个小版本的筹备中。）

## 3. 项目进展
今日有 5 个 PR 被成功关闭/合并，项目在代码质量、兼容性和多代理协作上迈出了坚实的一步：
*   **多代理权限控制**：合并了 [PR #2793](https://github.com/nanocoai/nanoclaw/pull/2793)，为 agent-to-agent 通信引入了按消息级别的审批策略，大幅增强了企业级场景下的管控力。
*   **环境兼容性优化**：合并了 [PR #2810](https://github.com/nanocoai/nanoclaw/pull/2810)，通过软链接将 `.claude` 配置镜像到 `.agents` 路径，实现了不同 AI 客户端（如 Codex）的无缝接入。
*   **部署体验修复**：合并了 [PR #2805](https://github.com/nanocoai/nanoclaw/pull/2805)，修复了 PTY 终端下自动换行导致 Claude OAuth Token 解析失败的问题，降低了新用户的部署门槛。
*   **代码瘦身与国际化**：移除了 v2 架构中遗留的死代码 `resolveGroupIpcPath` ([PR #2803](https://github.com/nanocoai/nanoclaw/pull/2803))，并合并了韩文版 README ([PR #2806](https://github.com/nanocoai/nanoclaw/pull/2806))。

## 4. 社区热点
*   **🔥 [Issue #957](https://github.com/nanocoai/nanoclaw/issues/957) (👍7, 10 评论)**：关于**支持 Podman 替代 Docker** 的建议。该历史长帖今日正式被关闭。结合今日开放的 [PR #2809](https://github.com/nanocoai/nanoclaw/pull/2809)（支持 Apple Container），反映出社区对“去 Docker 化”及“轻量级/多样化容器运行时”的强烈诉求正在被官方积极落实。
*   **💬 [Issue #29](https://github.com/nanocoai/nanoclaw/issues/29) (👍4, 5 评论)**：关于**集成 Signal 作为消息通道**的请求。Signal 以其极高的隐私性著称，该 Issue 被关闭可能意味着该功能已被纳入主分支或通过其他方式实现。
*   **❓ [Issue #2632](https://github.com/nanocoai/nanoclaw/issues/2632) (2 评论)**：用户询问 v2 版本中 Telegram 多机器人集群身份的迁移状态。这体现了老用户在向 v2 架构迁移时，对破坏性变更感到困惑，急需官方明确的迁移指引。

## 5. Bug 与稳定性
今日迎来了多位开发者的 Bug 反馈与修复，按严重程度排列如下：
*   **[严重 / 安全] 路径穿越漏洞 (CWE-22)**：[PR #2800](https://github.com/nanocoai/nanoclaw/pull/2800) 指出 CLI 命令未校验目录，可能导致恶意路径逃逸。（已提交 Fix）
*   **[严重 / 安全] 敏感文件越权读取 (CVE-2026-29611)**：[PR #2799](https://github.com/nanocoai/nanoclaw/pull/2799) 指出 `send_file` 缺乏根目录限制，被注入的 Agent 可读取系统凭据。（已提交 Fix）
*   **[

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

以下是 IronClaw 项目 2026-06-18 的开源项目动态日报。报告基于过去 24 小时的 GitHub 数据进行深度分析。

---

# 📊 IronClaw 项目动态日报 (2026-06-18)

## 1. 今日速览
今日 IronClaw 项目保持极高的开发与测试活跃度，共有 40 条 Issue 更新（22 活跃 / 18 关闭）和 50 条 PR 更新（28 待合并 / 22 已合并或关闭）。
从数据与内容来看，团队正全力推进 **"Reborn" 架构**（预计为下一代 Engine v2 默认引擎的翻新）的最后打磨，重点发力于**自动化任务、权限审批系统重构以及 CI 基础设施优化**。此外，大量 QA 与本地 "Dogfooding"（内部吃狗粮）测试反馈被提交并迅速解决，表明项目正处于稳定性和用户体验攻坚的紧要关头。

## 2. 版本发布
**今日无新版本发布。** 
项目目前处于高频迭代的主干开发阶段，尚未从 Reborn 分支切割出新的 Stable Release。

## 3. 项目进展
今日共有 22 个 PR 被合并或关闭，项目在底层容错、UI 反馈和 CI 流程上迈出了坚实的一步：
*   **WebUI 反馈与状态同步完善**：合并了 [PR #4984](https://github.com/nearai/ironclaw/pull/4984)，修复了工具调用失败时前端不展示报错卡片的问题（对应 Issue #4942）；合并了 [PR #5067](https://github.com/nearai/ironclaw/pull/5067)，确保在缺少授权 URL 时依然保留 OAuth 验证卡片，避免状态丢失。
*   **CI/CD 流水线大整顿**：团队合并了多个关于 CI 基础设施的 PR。包括引入统一的单点 CI 结果门控检查（[PR #5075](https://github.com/nearai/ironclaw/pull/5075)），以及优化 Rust 编译缓存的预热机制（[PR #5074](https://github.com/nearai/ironclaw/pull/5074)），大幅提升了后续贡献者的代码合并效率。

## 4. 社区热点
今日的讨论焦点集中在**复杂场景下的 Agent 健壮性**以及**本地测试体验**：
*   **Agent 停止响应且无报错反馈**（[Issue #4761](https://github.com/nearai/ironclaw/issues/4761)）：评论数最高（5条）。用户反馈 Agent 在连续遭遇工具调用失败后会直接罢工，而不尝试恢复或提供解释。这反映了社区对 AI Agent 具备“高容错与自我纠错”能力的强烈诉求。
*   **Google OAuth 授权成功反而导致运行崩溃**（[Issue #4907](https://github.com/nearai/ironclaw/issues/4907)）：用户在进行日历授权时，OAuth 流程虽然走通，但主线程却意外中断，暴露出异步流程与上下文恢复上的机制缺陷。
*   **本地部署初体验痛点**（[Issue #4879](https://github.com/nearai/ironclaw/issues/4879)）：核心开发者开启了本周的 Dogfooding 反馈贴，集中收集了 Reborn WebUI 在启动、模型提供商配置及首次运行时的阻塞性问题。

## 5. Bug 与稳定性
今日报告了多个影响“Reborn”稳定性的缺陷，按风险评级排列如下：

*   **[高危] OAuth 凭证无法自动刷新**：[Issue #5071](https://github.com/nearai/ironclaw/issues/5071) 指出 Google Token 过期后，Reborn 不会利用 Refresh Token 主动续期，导致需要每小时重新走一遍人工授权流程，严重破坏自动化体验。目前暂无对应的 fix PR。
*   **[中危] SSO 上下文不匹配导致自动化任务全盘崩溃**：[Issue #4992](https://github.com/nearai/ironclaw/issues/4992) 表明，本地开发的 SSO 上下文在部署到 Railway 后会导致定时任务在创建 Thread 前直接抛出 `No thread attached` 错误。
*   **[中危] 巨型命令导致审批弹窗无法阅读

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

以下是为您生成的 LobsterAI 项目 2026-06-18 动态日报：

# 📈 LobsterAI 项目动态日报 (2026-06-18)

## 1. 今日速览
今日 LobsterAI 项目保持着**极高的研发活跃度**，核心开发团队在 24 小时内集中关闭或合并了多达 14 个 PR。这些代码变更主要围绕“实时语音输入 (ASR) 体验精进”、“Computer Use (电脑控制) 运行时升级”以及“丰富 Artifacts 文件分享能力”展开，为即将推出的 `2026.6.18` 版本完成了主干代码合并。值得注意的是，今日项目收到一条关于本地文件读取的安全漏洞反馈，目前尚在处理中。

## 2. 版本发布
* 过去 24 小时内官方 Releases 页面**无新版本发布**。
* **版本前瞻**：合并分支以发布 2026.6.18 的 PR ([#2179](https://github.com/netease-youdao/LobsterAI/pull/2179)) 已于今日完成合并。预计包含 DOCX/PPTX/PDF 等多格式文档分享、Markdown/Mermaid 分享支持、Cowork 实时语音听写以及 Computer Use MVP 等重磅特性的新版本即将正式发布。

## 3. 项目进展
今日项目取得了突破性进展，尤其在多模态交互和智能体操控方面迈出了一大步：
* **发布分支合并**：PR [#2179](https://github.com/netease-youdao/LobsterAI/pull/2179) 将 `release/2026.6.11` 分支顺利合并至 `main` 主干，标志着本阶段功能开发阶段性收官。
* **Computer Use (MVP) 落地与迭代**：新增了 Windows x64 内置 Computer Use 套件及其 MCP Server 桥接 ([#2143](https://github.com/netease-youdao/LobsterAI/pull/2143))，并紧接着将其运行时升级至 1.0.7，增加了 UIA 面包屑以诊断异常退出问题 ([#2156](https://github.com/netease-youdao/LobsterAI/pull/2156))。
* **语音输入完全转向实时流**：彻底移除了旧版短音频上传识别模式，现在 Cowork 语音输入将**始终启用实时 ASR** ([#2160](https://github.com/netease-youdao/LobsterAI/pull/2160))；同时重构了录音 UI 和 ASR 配额管理 ([#2163](https://github.com/netease-youdao/LobsterAI/pull/2163))，并将用户文案从“听写”统一更正为“语音输入” ([#2177](https://github.com/netease-youdao/LobsterAI/pull/2177))。
* **Artifacts 分享拓展**：新增了对 Markdown 和 Mermaid 文件的分享打包支持，并处理了本地图片资源打包逻辑 ([#2178](https://github.com/netease-youdao/LobsterAI/pull/2178))。

## 4. 社区热点
* **[Security] LobsterAI automatic artifact loading allows message-derived arbitrary local file reads** ([#2176](https://github.com/netease-youdao/LobsterAI/issues/2176))
  **分析**：这是今日社区讨论的焦点。安全研究员指出 LobsterAI 在自动解析 `MEDIA:` 文件引用时，存在路径校验缺陷，可能导致特权执行环境下被读取本地任意文件。随着 AI 客户端能力（尤其是 Artifacts 加载和 Computer Use）的增强，此类跨越渲染层与系统底层的边界安全诉求将成为社区关注的核心。

## 5. Bug 与稳定性
按严重程度排列今日处理的 Bug 及报告：
* **🔴 [严重 / 未修复] 任意本地文件读取漏洞**：Issue [#2176](https://github.com/netease-youdao/LobsterAI/issues/2176) 报告了消息派生导致的本地文件读取风险。目前暂无对应的修复 PR 被合并。
* **🟡 [已修复] macOS 麦克风权限请求失效**：PR [#2113](https://github.com/netease-youdao/LobsterAI/pull/2113) 修复了 macOS 下语音输入无法正确获取系统麦克风信任策略的问题。
* **🟡 [已修复] 实时 ASR 重复启动**：PR [#2155](https://github.com/netease-youdao/LobsterAI/pull/2155) 阻止了 Cowork 组件中因竞态条件导致的重复实时 ASR 启动请求。
* **🟢 [已修复] Expert Suite 控件无法吸顶**：PR [#2150](https://github.com/netease-youdao/LobsterAI/pull/2150) 修复了专家套件搜索和工具栏的粘性布局失效问题。

## 6. 功能请求与路线图信号
从今日的 Issue 和密集合并的 PR 中，可以清晰地洞察到 LobsterAI 下半年的产品路线图：
1. **桌面 Agent 化**：Computer Use 套件的引入及专门的运行时管理器，意味着 LobsterAI 正式入局“桌面自动化操作”，对标系统级智能体。
2. **多模态生产力强化**：不断完善实时流式 ASR 以取代传统听写，并在 Artifacts 面板引入更丰富的文档格式分享，说明产品在往“多模态生产力工具”的方向深扎。

## 7. 用户反馈摘要
* **痛点与场景**：从历史遗留的 Issue [#1422](https://github.com/netease-youdao/LobsterAI/issues/1422) 可以看出，深度用户会接入大量自定义的 MCP 服务，当服务名称过长时，UI 的删除弹框会出现裁切，影响日常配置管理体验。
* **满意度评估**：开发者生态（@btc69m979y-dotcom, @fisherdaddy, @liugang519）在本周疯狂输出，代码迭代极快。但在追求功能狂飙（如 ASR 流式重构）的同时，也暴露出在权限申请 ([#2113](https://github.com/netease-youdao/LobsterAI/pull/2113)) 和并发控制 ([#2155](https://github.com/netease-youdao/LobsterAI/pull/2155)) 上初期考虑欠周，所幸团队响应迅速，均在今日内完成了修复。

## 8. 待处理积压
* ⚠️ **安全修复积压**：强烈建议维护团队优先处理 Issue [#2176](https://github.com/netease-youdao/LobsterAI/issues/2176) 的路径穿越问题，在推出带有 Computer Use 的高权限版本前，必须收紧渲染层对本地文件路径的白名单控制。
* ⚠️ **大版本依赖升级待验证**：PR [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) (由 Dependabot 发起) 提议将 Electron 从 40.x 跨大版本升级至 42.x。这通常涉及底层 API 的破坏性变更，目前

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

以下是为您生成的 TinyClaw (TinyAGI) 项目 2026-06-18 动态日报。

---

# 📊 TinyClaw (TinyAGI) 项目动态日报
**报告日期**: 2026-06-18 | **分析领域**: AI 智能体与个人 AI 助手

### 1. 今日速览
今日 TinyClaw 项目代码提交与版本更新处于静默状态（无 PR 更新、无 Release），但项目面临紧急的安全合规挑战。过去 24 小时内，项目连续收到 3 个由安全研究员提交的高危漏洞报告（Issues #282, #283, #284），均聚焦于未授权 API 调用及本地文件系统安全隔离失效。当前这些安全 Issue 尚无官方回复或修复 PR，项目整体健康度因严重的身鉴权与沙箱隔离缺陷受到威胁，维护团队需立即启动应急响应机制。

### 2. 版本发布
**无**。今日项目未发布任何新版本。

### 3. 项目进展
今日项目**无实质性代码推进**。
过去 24 小时内，项目 Pull Request 活跃度为 0（无新增、无合并、无关闭），且未关闭任何历史 Issue。项目在功能迭代和常规修复方面处于停滞状态，开发资源亟待向今日爆发的安全漏洞倾斜。

### 4. 社区热点
今日社区热点完全被**安全漏洞披露**占据。安全研究员 @YLChen-007 在一天之内集中提交了 3 个关联性极强的安全议题，揭示了 TinyClaw 在设计上对“开箱即用”的妥协导致了致命的攻击面暴露。核心诉求在于：要求项目方立即引入强身份验证机制、修复模型提供商的默认权限校验，并限制 AI 代理对宿主机文件系统的越权访问。
- 🚨 **[Security] 未授权调用大模型 API** ([#284](https://github.com/TinyAGI/tinyagi/issues/284))
- 🚨 **[Security] 本地文件任意泄露** ([#283](https://github.com/TinyAGI/tinyagi/issues/283))
- 🚨 **[Security] 宿主机文件任意附件投递** ([#282](https://github.com/TinyAGI/tinyagi/issues/282))

### 5. Bug 与稳定性
今日报告的均为 **严重级别的安全架构缺陷**，目前均**无对应的 Fix PR**。按对用户的危害程度排列如下：

1. 🔴 **[P0 严重] 未经身份验证的 API 消息可恶意调用 Claude** ([#284](https://github.com/TinyAGI/tinyagi/issues/284))
   - **详情**: 默认禁用提供商权限检查，暴露了未授权的 `POST /api/message` 端点。攻击者可绕过验证，将恶意指令转发至 Anthropic（Claude），可能导致 API Key 被恶意消耗或滥用。
2. 🔴 **[P0 严重] `prompt_file` 任意本地文件泄露** ([#283](https://github.com/TinyAGI/tinyagi/issues/283))
   - **详情**: 代理配置 API 允许未授权用户控制 `prompt_file` 的值，导致宿主机上任意本地文件的内容被读取，并直接泄露给第三方模型提供商。
3. 🔴 **[P0 严重] `[send_file: ...]` 标签导致任意文件投递** ([#282](https://github.com/TinyAGI/tinyagi/issues/282))
   - **详情**: 不安全的响应附件处理机制允许未授权的远程用户干预 AI 的输出结果，利用 `[send_file: ...]` 标签在宿主机上执行任意文件附件投递。

### 6. 功能请求与路线图信号
虽然没有直接的功能需求，但今日的集中安全报告为 TinyClaw 的架构演进释放了强烈的路线图信号：
- **强 Authentication 层的引入**：作为暴露在公网或局域网的 AI 助手，基于 Token/Session 的 API 鉴权中间件必须成为下一阶段的核心“功能”。
- **本地沙箱与文件系统权限控制 (RBAC)**：AI 智能体在读取本地上下文（Prompt 文件）和输出文件时，必须引入路径白名单或沙箱隔离机制，避免 LLM 的幻象或恶意注入引发宿主机安全问题。

### 7. 用户反馈摘要
从今日安全研究员的测试反馈可以看出，TinyClaw 在与本地环境集成（如读取本地文件作为 Prompt、通过 `send_file` 挂载附件）和对接大模型 API 时的体验非常顺滑，但这种“无摩擦”是以牺牲安全为代价的。真实痛点在于：**个人 AI 助手在追求本地化、个性化执行能力的同时，其安全边界（如模型提供商校验、本地 API 拦截）被严重忽视，导致用户的本地隐私数据和 API 资产面临极高暴露风险。**

### 8. 待处理积压
⚠️ **紧急预警**: 今日新开的 3 个安全漏洞 Issue 均处于 `0 评论、0 处理` 的完全未响应状态。
强烈建议 @TinyAGI 维护团队：
1. 立即在相关 Issue 下方进行响应，确认漏洞复现。
2. 评估是否需要发布安全公告（Security Advisory），并暂时限制 `POST /api/message` 的公网访问。
3. 优先开发并合并身份验证及文件系统隔离的安全补丁。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下是 CoPaw (QwenPaw) 项目 2026-06-18 的动态日报。作为 AI 智能体与个人助手领域备受关注的开源项目，今日的数据展示了其高频迭代与深度社区互动。

---

# 📊 CoPaw 项目动态日报 (2026-06-18)

### 1. 今日速览
CoPaw (QwenPaw) 今日保持了极高的开发热度与社区活跃度，共处理 **50 条 Issue**（关闭 35 条，新开 15 条）及 **31 条 PR**（合并/关闭 17 条）。项目于今日发布了 [`v1.1.12.post1`](https://github.com/agentscope-ai/QwenPaw/pull/5288) 版本，主要聚焦于底层稳定性修复与脚本规范化。从合并的 PR 来看，开发团队正在大力推进**上下文管理架构的重构**、**Windows 环境兼容性（SSL/路径）** 以及**多渠道（Discord/飞书等）的响应优化**。整体项目健康度优异，处于快速迭代的收敛期。

### 2. 版本发布
- **[v1.1.12.post1](https://github.com/agentscope-ai/QwenPaw/releases)** 
  - **更新内容**：修正了发布脚本的预发布参数扩展逻辑；将 ChromaDB 的探针集合重命名为 `probe-test`，以避免与实际业务数据发生冲突。
  - **影响评估**：属于基建与维护性补丁。无破坏性变更，建议开发者平滑升级。

### 3. 项目进展
今日共有 17 个 PR 被合并或关闭，标志着以下几个核心模块取得重大突破：
- **上下文管理架构升级**：PR [#5309](https://github.com/agentscope-ai/QwenPaw/pull/5309) 完成了将旧版 `LightContextManager` 到 AgentScope 2.0 原生压缩（`Agent.compress_context()`）的深度迁移，为更稳健的上下文裁剪打下基础。
- **Windows 适配与 SSL 修复**：针对 Windows 环境的痛点，PR [#5291](https://github.com/agentscope-ai/QwenPaw/pull/5291) 显式为钉钉渠道 HTTP 客户端配置 SSL 证书，PR [#5298](https://github.com/agentscope-ai/QwenPaw/pull/5298) 修复了 Windows 构建验证中的 SSL 错误。
- **前端体验优化**：PR [#5293](https://github.com/agentscope-ai/QwenPaw/pull/5293) 将历史聊天列表从抽屉弹窗改为右侧常驻侧边栏；PR [#5306](https://github.com/agentscope-ai/QwenPaw/pull/5306) 和 [#5303](https://github.com/agentscope-ai/QwenPaw/pull/5303) 修复了 Token 上下文使用率显示不准确的问题。
- **集成测试覆盖**：PR [#5270](https://github.com/agentscope-ai/QwenPaw/pull/5270) 引入了涵盖 ACP、插件系统、安全等维度的 64 个集成测试用例，大幅提升项目鲁棒性。

### 4. 社区热点
今日讨论度最高的话题集中在**长对话与上下文记忆管理**：
- **[Issue #5218](https://github.com/agentscope-ai/QwenPaw/issues/5218) (16 评论)**：子 Agent 触发上下文压缩时导致进程冻结。大量用户反馈长对话场景下 AI 容易“断片”或卡死。
- **[Issue #5171](https://github.com/agentscope-ai/QwenPaw/issues/5171) (8 评论)**：人设 Token 超过压缩保留阈值时，导致记忆被完全清空。
- **[Issue #5063](https://github.com/agentscope-ai/QwenPaw/issues/5063) (7 评论)**：用户提议集成 `Headroom` 本地优先的可逆压缩层，以减少 60-95% 的 Token 消耗。**官方已积极响应**，见 PR [#5244](https://github.com/agentscope-ai/QwenPaw/pull/5244)。
- **[Issue #5262](https://github.com/agentscope-ai/QwenPaw/issues/5262) (7 评论)**：用户抱怨每次版本升级后，已手动禁用的内置技能会被强制重置为启用。

### 5. Bug 与稳定性
根据今日反馈，按严重程度排列如下：
- **严重 (P0)**: 
  - **[Issue #5218](https://github.com/agentscope-ai/QwenPaw/issues/5218)**: 上下文压缩引发进程无响应。**状态：已有修复在进行中**，PR [#5287](https://github.com/agentscope-ai/QwenPaw/pull/5287) 修复了摘要超过 schema maxLength 导致压缩崩溃的问题。
  - **[Issue #5264](https://github.com/agentscope-ai/QwenPaw/issues/5264)**: 消息路由错乱，群聊回复被错误发送至用户私聊（存在数据隐私越界风险）。
- **高 (P1)**: 
  - **[Issue #5319](https://github.com/agentscope-ai/QwenPaw/issues/5319)**: Web UI 始终显示“Answers have stopped”，即使后台已正常输出结果。
  - **[Issue #5253](https://github.com/agentscope-ai/QwenPaw/issues/5253)**: 自定义频道保存配置后监听线程 Crash。
- **中 (P2)**: 
  - **[Issue #5140](https://github.com/agentscope-ai/QwenPaw/issues/5140)**: 附件下载报错 404 (仅限 docx/pdf，纯文本正常)。**状态：已关闭修复**。

### 6. 功能请求与路线图信号
结合 Issues 与待合并 PR，以下方向极有可能在 v1.1.13 或 v1.2 纳入：
- **开发级终端模式**：PR [#5304](https://github.com/agentscope-ai/QwenPaw/pull/5304) 引入 `qwenpaw terminal`，允许通过 CLI 交互模式直连守护进程进行代码级操作。
- **高级上下文压缩插件**：PR [#5244](https://github.com/agentscope-ai/QwenPaw/pull/5244) 正在测试 `HeadroomContextManager`，未来将作为可选插件大幅降低 Token 消耗。
- **Linux 沙盒隔离**：PR [#5310](https://github.com/agentscope-ai/QwenPaw/pull/5310) 提议引入 `bubblewrap` 实现 Linux 环境的挂载命名空间隔离，提升本地运行的安全性。
- **Discord 流式输出**：PR [#5314](https://github.com/agentscope-ai/QwenPaw/pull/5314) 为 Discord 带来了打字效果与实时流式编辑响应。

### 7. 用户反馈摘要
- **痛点**：用户对**记忆丢失**感到极其挫败（#5171），特别是在 Agent 带有较长 System Prompt 时，粗暴的截断式压缩直接破坏了 Agent 的人设；另外，**Windows 下的环境配置（如 SSL 证书缺失、uv 安装报错）** 依然是最大的上手门槛（#5237）。
- **场景**：重度用户正在将 CoPaw 作为长期陪伴助手或接入飞书、钉钉的工作流 Agent 使用，因此对**群聊/私聊的上下文精准路由**（#5264）以及**多模态文件权限读取**（#4922）提出了更高要求。
- **满意点**：社区对官方解决基建问题（如 ChromaDB 崩溃、钉钉 SSL）的响应速度表示认可。

### 8. 待处理积压
请维护者 @agentscope-ai 关注以下滞留或需跟进的重要项：
1. **[Issue #5063](https://github.com/agentscope-ai/QwenPaw/issues/5063) / PR [#5244](https://github.com/agentscope-ai/QwenPaw/pull/5244)**：Headroom 集成已挂起数日，需进行代码 Review 推进。
2. **[Issue #5262](https://github.com/agentscope-ai/QwenPaw/issues/5262)**：升级

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

以下是为您生成的 EasyClaw 项目 2026-06-18 动态日报。作为 AI 智能体领域的开源分析师，本报告基于项目过去 24 小时的各项 GitHub 指标进行了深度提取与分析。

---

# 📊 EasyClaw 项目动态日报 (2026-06-18)

**项目仓库**：[github.com/gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw)
**数据统计周期**：过去 24 小时

### 1. 今日速览
过去 24 小时内，EasyClaw 项目呈现出**“重内部研发推进、轻社区互动”**的显著特征。项目在代码托管平台上未收到任何新增的 Issue 或 Pull Request，社区讨论处于静默期。然而，核心研发团队保持了极高的工程交付效率，连续发布了 `v1.8.36` 与 `v1.8.37` 两个新版本。整体项目健康度在工程迭代侧表现强劲，核心看点集中在客服会话机制优化、Token 成本控制以及工作流边界打磨上。

---

### 2. 版本发布
今日项目连续合并代码并发布了 2 个重要迭代版本，无明确的破坏性变更，但在架构机制上进行了重要重构。

**🚀 Release v1.8.37: RivonClaw v1.8.37** ([查看 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.37))
*   **架构优化**：将客服结案指令转变为后端主导控制，并将结案调度路由至 `end-session`（结束会话）工具处理。*（注：此举提升了后端作为 AI Agent 核心控制器的权限，降低了前端或客户端的逻辑耦合）*
*   **业务精进**：改善了联盟营销（affiliate）的产品适配工作流以及示例/产品上下文的解析能力。
*   **体验优化**：新增 BI（商业智能）桌面工具的国际化（i18n）标签，提升了数据看板的清晰度。

**🚀 Release v1.8.36: RivonClaw v1.8.36** ([查看 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.36))
*   **稳定性强化**：硬化了客服会话刷新机制、延迟结案调度、重复快照中止逻辑以及全局错误处理。显著提升了高并发下的鲁棒性。
*   **工作流优化**：细化联盟营销桌面端工作项的边界，优化了任务确认处理和发送消息组件的韧性。
*   **AI 成本控制**：**减少了客服调度中的 Token 消耗**。*（注：这是 AI Agent 项目极为关键的指标优化，直接降低了大模型 API 的运行成本）*

---

### 3. 项目进展
由于今日公开的 PR 合并/关闭记录显示为 0，推测代码合并主要在内部私有分支或通过直接 Push 至主线完成。从连续发布的两个版本可以看出，项目整体**向前迈进了扎实的一步**，正式确立了后端主导的 AI 工具调用范式，并大幅降低了系统在长会话和复杂客服场景下的资源开销。

---

### 4. 社区热点
*   **数据表现**：今日 Issues 与 PRs 活跃度均为 0。
*   **分析**：目前项目可能处于闭源开发阶段，或刚刚转向开源，尚未建立起活跃的外部贡献者生态。另一可能是项目主要面向 B2B 企业级用户，bug 反馈与功能请求发生在私下渠道或邮件中。

---

### 5. Bug 与稳定性
今日无外部用户报告新 Bug。但从 [v1.8.36](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.36) 的更新日志中，逆向提取出研发团队近期**内部修复与防范**的严重缺陷：
*   **[已修复] 重复快照导致系统异常**：此前系统在并发或网络延迟时可能触发重复快照，现已加入中止逻辑，提升了系统防抖/防重放能力。
*   **[已修复] 消息发送组件脆弱性**：增强了 `send-message` 接口的韧性，有效防止了因大模型输出异常导致的客服自动回复中断问题。

---

### 6. 功能请求与路线图信号
虽然没有公开的 Feature Request，但结合今日版本更新，我们可以清晰捕获到 EasyClaw 接下来的**产品路线图信号**：
1.  **成本与性能极致压榨**：Token churn（消耗）的降低是近期重点，预示项目正在为规模化商用或处理超大规模客服数据做成本准备。
2.  **向桌面端/BI 延伸**：版本中多次提及“Desktop tool”（桌面端工具）和“BI tool”，表明 EasyClaw 不仅仅是一个纯后端的 Agent 框架，正在向“提供完整桌面端辅助操作 + 数据可视化”的综合型个人/企业助手演进。
3.  **全球化布局起步**：BI 工具 i18n 标签的加入，暗示项目可能正在准备支持多语言，以拓展非中文区市场。

---

### 7. 用户反馈摘要
基于过去 24 小时的数据，无法从 Issue 评论中提取真实用户痛点反馈。但从更新日志中“结案指令”、“快照”、“消息确认机制”等高频词可以推断，**企业级客服自动化、长对话上下文的稳定性、以及分销商桌面端的协同效率**是开发者正在着力解决的核心用户场景。

---

### 8. 待处理积压
*   **数据表现**：过去 24 小时无新增活跃或停滞的公开 Issue / PR。
*   **分析师建议**：作为维护者，建议在后续版本中补充外部开发者文档或架构说明，吸引外部生态建设者；同时，由于今日有重构性更新（如后端接管结案指令），应密切关注后续几天可能出现的边缘测试用例反馈。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*