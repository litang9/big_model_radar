# OpenClaw 生态日报 2026-06-11

> Issues: 500 | PRs: 500 | 覆盖项目: 11 个 | 生成时间: 2026-06-11 03:37 UTC

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

# OpenClaw 项目动态日报 — 2026-06-11

> 数据来源：[github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)  
> 统计窗口：过去 24 小时

---

## 1. 今日速览

OpenClaw 今日维持**高活跃度**运行：Issues 更新 500 条（新开/活跃 469，关闭仅 31），PR 更新 500 条（待合并 396，合并/关闭 104）。关闭率仅约 **6.2%**（Issues）和 **20.8%**（PRs），表明社区反馈涌入速度显著超过维护者消化速度，积压压力持续增大。项目发布了 **v2026.6.6-beta.1**，核心聚焦于全方位收紧安全边界。社区讨论集中在**消息泄漏、子代理编排可靠性、会话状态管理**三大主题，多个 P0/P1 级 Issue 长期未获修复 PR。

---

## 2. 版本发布

### [v2026.6.6-beta.1](https://github.com/openclaw/openclaw/releases) — OpenClaw 2026.6.6-beta.1

**核心主题：安全边界全面加固**

Release Notes 摘要：

| 加固领域 | 说明 |
|---|---|
| Transcripts | 转录隔离边界收紧 |
| Sandbox binds | 沙箱绑定安全性增强 |
| Host environment inheritance | 宿主环境变量继承策略收紧 |
| MCP stdio | MCP 标准输入输出通道安全 |
| Codex HTTP access | Codex HTTP 访问控制 |
| Native search policy | 原生搜索策略加固 |
| Elevated sender checks | 提升发送方校验等级 |
| Deleted-agent ACP bypasses | 已删除代理的 ACP 绕过漏洞修复 |
| Loopback tools | 回环工具安全 |
| Discord moderation | Discord 审核机制 |
| Teams group access | Teams 群组访问控制 |

**迁移注意事项：**
- 本次为 **beta** 版本，生产环境部署需谨慎。
- 涉及 host environment inheritance 变更，依赖环境变量透传的 `exec` 工具场景需回归测试（与 [#31583](https://github.com/openclaw/openclaw/issues/31583) 高度相关）。
- Sandbox binds 收紧可能影响 Docker-outside-of-Docker 场景（参考 [#31331](https://github.com/openclaw/openclaw/issues/31331)）。

---

## 3. 项目进展

### 今日合并/关闭的关键 PR（共 104 条合并/关闭）

#### 安全修复

| PR | 标题 | 状态 | 要点 |
|---|---|---|---|
| [#92021](https://github.com/openclaw/openclaw/pull/92021) | fix(agents): drop body/method on cross-origin MCP HTTP redirects | OPEN → 待合并 | 修复 MCP HTTP 传输中跨域 30x 重放 POST body 的 SSRF/凭证泄露向量，设置 `allowCrossOriginUnsafeRedirectReplay: false` |
| [#92023](https://github.com/openclaw/openclaw/pull/92023) | test(secrets,routing): cover sensitive-header, exec-ref, and binding-scope policies | OPEN → 待合并 | 为三个安全敏感策略模块补充单元测试：敏感模型提供商 Header 分类、exec 密钥引用解析门控、路由绑定范围 + 角色匹配 |
| [#90167](https://github.com/openclaw/openclaw/pull/90167) | fix(plugins): resolve config env vars for runtime loads | OPEN → 待合并 | 修复运行时加载插件时 `${ENV_VAR}` 占位符未被解析的问题 |

#### 消息投递与会话可靠性

| PR | 标题 | 状态 | 要点 |
|---|---|---|---|
| [#92073](https://github.com/openclaw/openclaw/pull/92073) | fix: handle explicit silent assistant replies | OPEN → 待合并 | 将显式终端 `NO_REPLY` 文本作为已有的 `silent-empty` 结果处理，修复多渠道消息泄漏 |
| [#91921](https://github.com/openclaw/openclaw/pull/91921) | fix(agents): deliver background exec completion to agent via [OpenClaw exec completion] | OPEN → 待合并 | 修复后台 exec 完成后代理误将心跳轮询当作 exec 结果的问题，改为正确的 `[OpenClaw exec completion]` 占位符 |
| [#91985](https://github.com/openclaw/openclaw/pull/91985) | fix(heartbeat): skip marking commitments as sent when delivery is suppressed | OPEN → 待合并 | 修复承诺在投递被抑制时仍标记为 `sent`，导致消息静默丢失 |
| [#90128](https://github.com/openclaw/openclaw/pull/90128) | fix(sessions): preserve user /model override across daily/idle session rollover | **CLOSED (已合并)** | 修复用户 `/model` 覆盖在每日/空闲会话重置时被静默丢弃 |

#### 模型兼容性

| PR | 标题 | 状态 | 要点 |
|---|---|---|---|
| [#92053](https://github.com/openclaw/openclaw/pull/92053) | fix(thinking): apply Claude profile to anthropic-messages catalog rows | OPEN → 待合并 | 修复自定义 Anthropic 兼容提供商 `--thinking` 被静默钳制为 `off` 的问题 |
| [#90110](https://github.com/openclaw/openclaw/pull/90110) | fix(anthropic): resolve Claude Haiku 4.5 static catalog refs | OPEN → 待合并 | 补充 Claude Haiku 4.5 静态目录映射 |
| [#92072](https://github.com/openclaw/openclaw/pull/92072) | fix(gateway): treat google-gemini-cli Gemini models as image-capable | OPEN → 待合并 | 修复 Gemini CLI 模型被网关拒绝接收图片的问题 |
| [#84938](https://github.com/openclaw/openclaw/pull/84938) | fix: forward reasoning_content from OpenAI-compatible providers | **CLOSED** | 修复 MiMo 等 OpenAI 兼容提供商的推理内容被网关丢弃 |

#### 开发者体验 / CLI

| PR | 标题 | 状态 | 要点 |
|---|---|---|---|
| [#92025](https://github.com/openclaw/openclaw/pull/92025) | feat(skills): add per-section remediation hints to skills check | OPEN → 待合并 | `skills check` 现在为每个问题附加修复提示 |
| [#92028](https://github.com/openclaw/openclaw/pull/92028) | feat(skills): report malformed SKILL.md files via `skills lint` | OPEN → 待合并 | 新增 `openclaw skills lint` 命令报告格式错误的 SKILL.md |
| [#92024](https://github.com/openclaw/openclaw/pull/92024) | feat(onboard): surface gateway port conflicts on unreachable gateway | OPEN → 待合并 | 引导流程增加网关端口冲突检测 |

#### 重大特性推进

| PR | 标题 | 状态 | 要点 |
|---|---|---|---|
| [#92081](https://github.com/openclaw/openclaw/pull/92081) | feat(voice-call): msteams CVI v2 | OPEN → 待合并 | Teams 语音/视频企业级就绪：回声修复、确定性门控、回溯视觉、per-thread 会话（**XL 尺寸**） |
| [#85664](https://github.com/openclaw/openclaw/pull/85664) → [#63919](https://github.com/openclaw/openclaw/pull/63919) | feat(gateway): wire coding tools into /tools/invoke | OPEN → 待合并 | 通过 HTTP `/tools/invoke` 暴露 read/write/edit 编码工具，是直接调用伞形特性的狭窄首降 |
| [#78441](https://github.com/openclaw/openclaw/pull/78441) | feat(subagents): forward toolsAllow from sessions_spawn | OPEN → 待合并 | 子代理支持继承工具白名单 |

**项目整体进展评估：** 今日 PR 活动集中在安全加固和消息投递可靠性两个方向，与 beta 版本主题高度一致。Teams 语音呼叫 CVI v2（XL PR）是今日最大特性推进。待合并 PR 堆积 396 条，合并吞吐量是关键瓶颈。

---

## 4. 社区热点

### 🔥 讨论最活跃的 Issues（按评论数排序）

| # | Issue | 评论 | 👍 | 核心诉求 |
|---|---|---|---|---|
| 1 | [#25592](https://github.com/openclaw/openclaw/issues/25592) Text between tool calls leaks to messaging channels | 31 | 1 | **P1 安全/UX**：Agent 在工具调用间产生的内部文本（错误处理、处理确认、叙述）被路由到 Slack/iMessage 等消息渠道。这是影响所有渠道的全局性问题 |
| 2 | [#44925](https://github.com/openclaw/openclaw/issues/44925) Subagent completion silently lost | 19 | 1 | **P1 消息丢失**：子代理任务编排存在多种静默失败模式——完成通知失败、超时无重试、无自动重启 |
| 3 | [#88838](https://github.com/openclaw/openclaw/issues/88838) Track core session/transcript SQLite migration | 19 | 1 | **P0 维护者发起**：将会话/转录运行时状态迁移到 SQLite，通过分支抽象缝拆分为小 PR，避免高风险大重写 |
| 4 | [#32473](https://github.com/openclaw/openclaw/issues/32473) control ui requires device identity (HTTPS/localhost) | 17 | 4 | **P2 安全回归**：Docker 部署场景下 Control UI 强制要求安全上下文，VPS 用户无法使用 |
| 5 | [#22438](https://github.com/openclaw/openclaw/issues/22438) Tiered bootstrap file loading | 17 | 0 | **P2 功能请求**：大工作区场景下引导文件消耗过多 token，提议分层加载 |
| 6 | [#32296](https://github.com/openclaw/openclaw/issues/32296) Agent replies to previous message | 15 | 1 | **P1 会话状态**：Agent 回复上一条消息而非当前消息，会话上下文混淆 |
| 7 | [#58450](https://github.com/openclaw/openclaw/issues/58450) Agent promises follow-up without action | 15 | 2 | **P2 消息丢失**：Agent 说"我会回来跟进"但实际未启动任何后台动作 |

### 📊 热点趋势分析

1. **消息泄漏/丢失是第一痛点**：排名前 7 的热门 Issue 中有 5 个直接涉及消息投递问题（#25592, #44925, #32296, #58450, #44905）。社区对"Agent 说了但没做"和"不该说的被说了"两大类问题高度敏感。
2. **SQLite 迁移是架构焦点**：#88838 由维护者发起，P0 优先级，表明项目正在推进持久层架构升级。
3. **安全议题持续升温**：#45740（gh-issues skill 注入未清洗的 Issue body 到子代理 prompt）和 #31583（exec 工具不继承 skill 环境变量）均有 12+ 评论。

### 👍 反应最多的 Issues

| Issue | 👍 | 主题 |
|---|---|---|
| [#18160](https://github.com/openclaw/openclaw/issues/18160) Direct Exec Mode for Cron Jobs | 10 | Cron 任务直接执行模式，跳过 LLM 解释 |
| [#39604](https://github.com/openclaw/openclaw/issues/39604) tools.web.fetch.allowPrivateNetwork | 9 | 允许 web_fetch 访问私有网络 |
| [#29387](https://github.com/openclaw/openclaw/issues/29387) Bootstrap files in agentDir silently ignored | 5 | agentDir 中引导文件被静默忽略 |
| [#79077](https://github.com/openclaw/openclaw/issues/79077) Telegram bot-to-bot / guest-bot | 7 | Telegram 2026-05-07 新特性支持 |

---

## 5. Bug 与稳定性

### 🔴 P0 / 严重

| Issue | 描述 | 状态 | Fix PR |
|---|---|---|---|
| [#88838](https://github.com/openclaw/openclaw/issues/88838) | Session/transcript SQLite 迁移追踪 | OPEN | 无（架构追踪 Issue） |
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 工具调用间文本泄漏到消息渠道 | OPEN | 有链接 PR，未合并 |

### 🟠 P1 / 高优先级

| Issue | 描述 | 类型 | Fix PR |
|---|---|---|---|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子代理完成静默丢失 | 消息丢失 | 无 |
| [#32296](https://github.com/openclaw/openclaw/issues/32296) | Agent 回复错误的历史消息 | 会话状态 | 无 |
| [#29387](https://github.com/openclaw/openclaw/issues/29387) | agentDir 中引导文件被静默忽略 | 安全/会话 | 有链接 PR |
| [#31583](https://github.com/openclaw/openclaw/issues/31583) | exec 工具不继承 skills.entries 环境变量 | 安全回归 | 有链接 PR |
| [#44905](https://github.com/openclaw/openclaw/issues/44905) | Discord 泄漏内部工具调用痕迹 | 安全/消息泄漏 | 无 |
| [#40001](https://github.com/openclaw/openclaw/issues/40001) | Write 工具无追加模式，Cron 会话覆盖共享文件 | 数据丢失 | 有链接 PR |
| [#43661](https://github.com/openclaw/openclaw/issues/43661) | Compaction 超时导致会话挂起 + 重复消息发送 | 崩溃循环 | 无 |
| [#83184](https://github.com/openclaw/openclaw/issues/83184) | 心跳驱动回复导致 pendingFinalDelivery 阻塞 | 消息丢失 | 无 |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | google-vertex/gemini-3.1-pro "Cannot convert undefined" | 崩溃回归 | 无 |
| [#31331](https://github.com/openclaw/openclaw/issues/31331) | Docker 安装 + Sandbox 无法访问工作区 | 安全 | 无 |
| [#37634](https://github.com/openclaw/openclaw/issues/37634) | workspaceAccess "none" 沙箱挂载为只读 | 安全 | 无 |

### 🟡 P2 / 中优先级回归

| Issue | 描述 | 类型 |
|---|---|---|
| [#32473](https://github.com/openclaw/openclaw/issues/32473) | Control UI 要求安全上下文 | 安全回归 |
| [#38439](https://github.com/openclaw/openclaw/issues/38439) | Webchat avatar 端点 404 | 回归 |
| [#41201](https://github.com/openclaw/openclaw/issues/41201) | Control UI 头像不显示 | 回归 |
| [#43747](https://github.com/openclaw/openclaw/issues/43747) | 记忆管理混乱（不同用户不同行为） | 回归 |
| [#40540](https://github.com/openclaw/openclaw/issues/40540) | Windows `openclaw update` EBUSY 错误 | 平台 Bug |

**稳定性评估：** P1 级 Bug 积压严重，多个涉及**消息丢失**和**安全边界**的 Issue 存活超过 3 个月仍无 fix PR。#43661（compaction 超时→重复消息）和 #83184（心跳阻塞）尤其值得关注，因为它们在用户无感知的情况下导致重复或丢失消息。

---

## 6. 功能请求与路线图信号

### 高概率纳入下一版本（已有 PR 或维护者参与）

| 功能请求 | Issue | 关联 PR | 信号强度 |
|---|---|---|---|
| **引导文件分层加载** | [#22438](https://github.com/openclaw/openclaw/issues/22438

---

## 横向生态对比

以下是为您整理的 2026 年 6 月 11 日个人 AI 助手与自主智能体开源生态横向对比分析报告：

---

# 📊 AI 智能体开源生态横向对比分析日报 (2026-06-11)

## 1. 生态全景
当前个人 AI 助手与自主智能体开源生态正处于**从基础对话向复杂任务编排与系统级控制跃升的关键重构期**。头部项目普遍面临由长上下文记忆、异步多智能体通信带来的底层架构压力，且在追求功能快速迭代的同时，**安全边界加固与消息投递可靠性**成为了全行业亟需补齐的短板。此外，生态正呈现出明显的“端云融合”与“多协议统一”趋势，开发者对打破单一 LLM 供应商锁定、实现跨平台桌面级操控的诉求达到了前所未有的高度。

## 2. 各项目活跃度对比
*(注：TinyClaw、ZeptoClaw、EasyClaw 过去 24 小时无活动，未列入下表)*

| 项目名称 | Issues 动态 (新开与活跃/关闭) | PRs 动态 (待合并/合并关闭) | 版本发布情况 | 核心事件 / 健康度评估 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500+ (仅31关闭) | 396 待合并 / 104 合并 | `v2026.6.6-beta.1` (安全加固) | **积压严重**：社区反馈涌入远超消化速度，关闭率极低，维护者面临巨大瓶颈。 |
| **IronClaw** | 35 / 15 | 27 / 23 | 无 | **高活跃重构期**：聚焦 WebUI v2 本地测试与 Auth 流程重构，存在供应链卡点问题。 |
| **CoPaw** | 18 / 15 | 19 / 30 | `v1.1.11` 及 beta 版 | **高活跃带病运行**：发版频繁但因 OpenSSL 兼容引发 Windows 严重宕机，正紧急热修。 |
| **Zeroclaw** | 24 / 19 | 40 / 10 | 无 | **架构探讨期**：微内核化 RFC 讨论热烈，集中修复跨平台 (Win/Mac) 兼容性痛点。 |
| **NanoBot** | 4 / 7 | 14 / 19 | 无 | **极度健康**：Issue 响应极快（当天修复合入），专注多智能体、上下文隔离与模型稳定性。 |
| **LobsterAI** | 0 / 0 | 1 / 24 | `2026.6.10` | **工程卓越**：0 Issue，PR 吞吐量极高，引入重磅 Computer Use 与长上下文优化。 |
| **PicoClaw** | 3 / 0 | 未知 / 6 合并 | `v0.2.9-nightly` | **稳健迭代**：专注代码健壮性（防 panic）与 SSRF 安全防御，探索底层通讯协议。 |
| **NanoClaw** | 2 / 0 | 8 / 4 | 无 | **稳步演进**：聚焦底层安全 IPC 隔离与 Skill 开发生态（多运行时抽象）建设。 |

## 3. OpenClaw 在生态中的定位
作为生态的核心参照系，OpenClaw 展现出了**绝对的规模优势与复杂的“大船难掉头”特征**：
* **对比优势与规模**：OpenClaw 的日活 Issue/PR 数量级（500+）远超其他同类项目（通常在 10-50 之间），具有最庞大的社区基数和企业级落地场景。其对 Slack、Teams、Discord 等多元渠道的接入深度（如 Teams CVI v2 语音视频支持）是其他项目短期内难以企及的。
* **技术路线差异**：相比 LobsterAI 专攻桌面端或 NanoBot 专注轻量级多智能体，OpenClaw 在尝试提供**全覆盖的能力**。目前其技术重心正强行转向“全方位收紧安全边界”（v2026.6.6-beta.1），这在其他项目中较少作为单一版本的核心主题。
* **当前隐患**：社区规模的膨胀反而成为了劣势。待合并 PR 堆积近 400 个，Issue 关闭率低至 6.2%，P1 级别的消息泄漏 Bug 长期未决。相比之下，NanoBot 和 LobsterAI 展现出了更高的工程敏捷性和代码质量控制。

## 4. 共同关注的技术方向
从多项目的动态中，可以清晰地看到以下几个共性的技术演进方向：
1. **长上下文与记忆管理机制重构**：
   * *涉及项目*：OpenClaw, NanoBot, LobsterAI
   * *具体诉求*：随着任务变复杂，传统的文件存储已不够。OpenClaw 正推进 SQLite 迁移，NanoBot 重构了 Transcript 为分段 JSONL 防止文件过大，LobsterAI 引入了 OpenClaw 压缩记录后的上下文连续性保持机制。
2. **异步子代理/多智能体通信可靠性**：
   * *涉及项目*：OpenClaw, NanoBot, PicoClaw
   * *具体诉求*：Agent 在调用异步工具或派生子代理后，经常发生“静默丢失”、“心跳混乱”或“重复推送未排版消息”。解决 Agent 编排下的状态同步是目前的高频痛点。
3. **底层安全与隔离防穿透**：
   * *涉及项目*：OpenClaw, PicoClaw, NanoClaw
   * *具体诉求*：防止 Agent 越权是共识。PicoClaw 修复了 SSRF IP 绕过，NanoClaw 落地了独立的 IPC 隔离机制，OpenClaw 则在全方位收紧宿主机环境变量继承和沙箱绑定。
4. **跨平台（特别是 Windows）兼容与体验**：
   * *涉及项目*：CoPaw, LobsterAI, PicoClaw, Zeroclaw
   * *具体诉求*：多项目今日集中爆发了 Windows 端的路径分隔符错误（PicoClaw）、OpenSSL 导致的启动卡死（CoPaw）以及安装包破坏性变更（LobsterAI）。

## 5. 差异化定位分析
* **OpenClaw**：定位为**企业级、全渠道的通信与自动化中枢**。功能大而全，极具复杂度，适合大型团队部署，但当前正经历架构债务阵痛。
* **LobsterAI**：定位为**端侧 AI 操作系统**。差异点在于重仓“Computer Use”（系统级 UI 操控）和桌面客户端体验，目标是将 AI 变成直接操作电脑的数字员工。
* **CoPaw (QwenPaw)**：定位为**集成式 AI 应用平台**。侧重于低门槛接入（零配置 OAuth）与底层 Agent 框架（AgentScope 2.0）的深度融合，更偏向开发者与极客的练兵场。
* **NanoBot / PicoClaw / NanoClaw 阵营**：定位为**轻量、模块化、多模型支持的极客工具**。高度关注容器化隔离、Skill 生态（自定义技能）和去中心化通信协议接入，更适合个人开发者在私有环境轻量部署。

## 6. 社区热度与成熟度
* **规模扩张与瓶颈期**：**OpenClaw** 处于这一阶段。社区热度极高，但消化能力见顶， Bug 积压严重，需要更强的自动化分发机制或扩充维护团队。
* **快速重构与功能冲刺期**：**IronClaw** 和 **CoPaw**。处于底层架构大改（Runtime 2.0 / WebUI v2）的阵痛期，社区讨论热烈，但经常引入阻断性回归 Bug（如依赖锁死、环境不兼容）。
* **高质量稳定与深耕期**：**LobsterAI** 和 **NanoBot**。项目呈现出极高的成熟度，PR 测试充分，合并迅速，Bug 修复往往当天闭环，属于当前生态中工程健康度的标杆。

## 7. 值得关注的趋势信号
1. **“Computer Use” 成为端侧智能体的破局点**：LobsterAI 上线 Computer Use

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

以下是 NanoBot 项目 2026-06-11 的开源项目动态日报：

### 1. 今日速览
过去 24 小时内，NanoBot 项目保持了极高的开发活跃度与社区讨论热情，共处理了 33 条 PR 更新（其中 19 条顺利合并/关闭）和 11 条 Issue 更新（7 条得到解决）。项目当前正处于**多智能体架构与前端交互体验的深度优化期**，核心开发者集中修复了上下文污染、会话记忆截断等记忆系统关键缺陷，并在 WebUI 端引入了文件管理和版本检查等实用功能。从提交质量来看，PR 提交均伴随详尽的测试与场景说明，显示出项目极高的健康度与工程规范性。

### 2. 版本发布
- **无新版本发布**（最近一次版本痕迹为提及的 `v0.2.1` 及 WebUI 相关的 `0.1.5post2` / `0.2.0`）。目前项目处于高频功能迭代与 Bug 修复的积累阶段，预计近期会有包含大量新特性的正式版本发布。

### 3. 项目进展
今日共有 19 个 PR 被合并或关闭，项目在**记忆隔离、Transcript 存储架构、工具链生态**等方面取得了实质性突破：
- **会话与记忆系统重构**：
  - 合并 [PR #4274](https://github.com/HKUDS/nanobot/pull/4274)：为 `history.jsonl` 添加了 `session_key` 元数据，实现了历史记录注入的会话级隔离，彻底解决了跨会话的上下文污染问题。
  - 合并 [PR #4278](https://github.com/HKUDS/nanobot/pull/4278) 与 [PR #4247](https://github.com/HKUDS/nanobot/pull/4247)：重构了 WebUI 的 Transcript 存储，引入了分段 JSONL 机制，解决了长时间聊天导致文件过大、历史记录丢失的痛点。
- **模型调用与稳定性**：
  - 合并 [PR #4272](https://github.com/HKUDS/nanobot/pull/4272)：修复了 LLM 流式输出卡顿（90s stall）无法触发重试和 Fallback 的问题，极大提升了推理稳定性。
  - 合并 [PR #4281](https://github.com/HKUDS/nanobot/pull/4281)：新增了 SiliconFlow 作为语音转写提供商。
- **工具链与基础配置**：
  - 合并 [PR #4273](https://github.com/HKUDS/nanobot/pull/4273)：为 `exec` 工具引入了 `pathPrepend` 配置，赋予了自定义环境路径更高的优先级，解决了环境变量冲突问题。
  - 合并 [PR #4275](https://github.com/HKUDS/nanobot/pull/4275)：增强了配置文件的校验，对无效配置实施 Fail-fast（快速失败），降低了排查难度。
- **WebUI 交互**：
  - 合并 [PR #4255](https://github.com/HKUDS/nanobot/pull/4255)：在设置页面引入了按需检查版本更新的按钮，取代了耗时的后台轮询。

### 4. 社区热点
今日讨论最活跃的 Issues 集中在**复杂工作流的稳定性**与**特定模型 API 的兼容性**上：
- **[Issue #4013](https://github.com/HKUDS/nanobot/issues/4013)（4 评论）**：用户升级至 0.2.0 后遭遇 LLM 流式响应超时卡死（90s stall）。这反映了重度依赖长文本生成用户的核心痛点，该问题已通过 PR #4272 得到根本性修复。
- **[Issue #3934](https://github.com/HKUDS/nanobot/issues/3934)（3 评论）** & **[Issue #4259](https://github.com/HKUDS/nanobot/issues/4259)（2 评论）**：开发者深入讨论了 `exec` 工具在使用 `pip` 安装依赖时的 `$PATH` 优先级错乱问题，以及 `history.jsonl` 跨会话导致的系统提示词污染。这两个讨论直接促成了 #4273 和 #4274 的高质量重构 PR。
- **[Issue #4233](https://github.com/HKUDS/nanobot/issues/4233)（2 评论）**：用户建议在 UI 中直观显示当前版本，反映出用户对自助排查版本兼容性问题的强烈需求。

### 5. Bug 与稳定性
今日报告的新 Bug 主要集中在**多级任务调度**与**高并发 API 响应处理**，按严重程度划分如下：
- **🔥 严重**：
  - [Issue #4290](https://github.com/HKUDS/nanobot/issues/4290)：Cronjob 中生成子智能体后提前结束，导致主流程中断。**已有修复 PR**：[PR #4293](https://github.com/HKUDS/nanobot/pull/4293)。
  - [Issue #4287](https://github.com/HKUDS/nanobot/issues/4287)：DeepSeek V4 等模型在高峰期返回空 `choices` 时，系统未能触发降级 Fallback，导致任务直接失败。**已有修复 PR**：[PR #4288](https://github.com/HKUDS/nanobot/pull/4288)。
- **🟡 中等**：
  - [Issue #4286](https://github.com/HKUDS/nanobot/issues/4286)：在执行长任务时，智能体意外丢失 "sustained goal" 的上下文，导致行为偏离。
  - [Issue #4261](https://github.com/HKUDS/nanobot/issues/4261)：OpenAI 兼容提供者在处理 GPT-5.x 系列模型时，错误使用 `max_tokens` 而非 `max_completion_tokens` 导致调用失败。

### 6. 功能请求与路线图信号
从当前的 Open PRs 和 Issues 来看，NanoBot 的下一步演进路线图非常清晰：
- **多智能体精细化编排**：[Issue #4279](https://github.com/HKUDS/nanobot/issues/4279) 提出聚合子智能体通知以防止 LLM 产生幻觉，以及 [PR #4291](https://github.com/HKUDS/nanobot/pull/4291) 允许子智能体使用独立的模型预设。这表明项目正致力于让子智能体架构支持更复杂的异步协同和资源调度。
- **WebUI 向轻量级控制台演进**：[PR #4282](https://github.com/HKUDS/nanobot/pull/4282) 添加了文件管理功能，[PR #4284](https://github.com/HKUDS/nanobot/pull/4284) 支持通过 `/skill` 快捷激活技能。WebUI 正在从一个单纯的聊天界面转变为全功能的操作面板。
- **通知与渠道体验优化**：[PR #4289](https://github.com/HKUDS/nanobot/pull/4289) 为 Slack 渠道增加了 `groupRequireMention` 过滤，显示出对多渠道企业级部署细节的持续打磨。

### 7. 用户反馈摘要
- **痛点**：模型返回为空或卡死导致整个 Agent 工作流崩盘（特别是使用 DeepSeek 时）；复杂配置（如 bwrap 沙箱环境、Python 隔离环境）对非专业开发者不够友好，容易遇到权限和环境变量污染。
- **满意之处**：用户对 WebUI 体验的更新表示欢迎，认为其在日常使用中更加直观实用；项目对 Issue 的响应速度极快，多个今日报告的 Bug 在同一天就收到了修复 PR。
- **典型场景**：开发者正在频繁使用 NanoBot 执行定时的复杂任务，这要求系统具备极强的上下文维持能力。

### 8. 待处理积压
目前有 14 个 PR 处于待合并状态，其中多个核心修复亟需维护者 Review 并合入主线以提升系统稳定性：
- 🚨 **急需处理的 PR**：
  - [PR #4293](https://github.com/HKUDS/nanobot/pull/4293)：修复 Cronjob 子智能体导致的中断问题，直接影响定时复杂工作流的可用性。
  - [PR #4288](https://github.com/HKUDS/nanobot/pull/4288)：修复 DeepSeek 空响应引发的无降级问题，对国内模型用户的体验至关重要。
  - [PR #4280](https://github.com/HKUDS/nanobot/pull/4280) 与 [PR #4270](https://github.com/HKUDS/nanobot/pull/4270)：解决长期上下文压力下的记忆截断与归档不完整问题。
- 🚨 **长期需关注的 Issue**：
  - [Issue #4286](https://github.com/HKUDS/nanobot/issues/4286)：丢失 "sustained goal" 上下文的问题尚无对应的修复 PR 响应，建议开发组评估其对长文本生成场景的影响。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 (2026-06-11)

## 1. 今日速览
Zeroclaw 项目在过去 24 小时内保持了**高度活跃**的状态，共处理了 43 条 Issues（其中 19 条已关闭）和 50 条 PRs（其中 10 条已合并/关闭，40 条待处理）。项目当前正处于密集的架构讨论与跨平台兼容性打磨阶段：社区正在为核心框架的“微内核化”及插件系统提出深度 RFC，同时维护者与贡献者正集中火力修复 Windows 平台测试大面积失败、TUI (`zerocode`) 默认编辑器报错以及 macOS 快捷键冲突等影响开发者体验的痛点。整体来看，项目健康度良好，社区响应迅速，向 v0.8.0 迈进的意图明显。

## 2. 版本发布
**今日无新版本发布。**

## 3. 项目进展
今日项目推进主要集中在 TUI 交互修复、诊断工具增强及 CI 流程优化上：
*   **TUI (`zerocode`) 体验集中修复**：
    *   修复了容器环境下默认调用 `vi` 导致的报错，回退至 `nano`（[PR #7483](https://github.com/zeroclaw-labs/zeroclaw/pull/7483)）。
    *   修复了 macOS 下 `Cmd-C` (复制) 会错误触发应用退出的严重按键冲突问题（[PR #7484

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

以下是为您生成的 PicoClaw 项目 2026-06-11 动态日报。

---

# 📊 PicoClaw 项目动态日报 (2026-06-11)

## 1. 今日速览
PicoClaw 在过去 24 小时内保持了**高度活跃且健康的迭代节奏**。项目今日合入了 6 个 Pull Requests，解决了包括 SSRF 安全漏洞、Windows 路径兼容性以及 LLM 模型适配等核心问题，并发布了最新的 `v0.2.9-nightly.20260611` 自动构建版本。社区活跃度平稳，新增了 3 个功能/Bug Issues，主要聚焦于异步子代理的消息去重、端侧兼容性（iOS Safari）以及去中心化通讯协议的接入诉求。此外，贡献者今日提交了大量关于“类型断言安全”的修复 PR，显示出项目正在经历一轮严格的内部代码健壮性审查。

## 2. 版本发布
- **[nightly] Nightly Build (v0.2.9-nightly.20260611.d955d5bb)**
  - **发布链接**: 查看完整变更 https://github.com/sipeed/picoclaw/compare/v0.2.9...main
  - **更新说明**: 这是包含今日最新合并代码的自动化构建版本。涵盖了 SSRF 防护增强、Windows 路径修复以及 `claude-opus-4-7` 模型的兼容性修复。
  - ⚠️ **迁移注意事项**: Nightly 版本为自动构建，可能存在不稳定情况，不建议直接用于生产环境，仅供测试和体验新特性。

## 3. 项目进展
今日共有 **6 个 PR 被合并或关闭**，项目在安全性、系统稳定性和模型兼容性上取得了实质性推进：

- **🛡️ 安全防护增强**: 
  - 合并 [PR #3085](https://github.com/sipeed/picoclaw/pull/3085): 屏蔽了 `198.18.0.0/15` (RFC 2544) 特殊 IP 段，修复了 `web_fetch` 工具的 SSRF 限制绕过漏洞。
- **🤖 模型与 API 兼容性**:
  - 合并 [PR #2948](https://github.com/sipeed/picoclaw/pull/2948): 修复了 `claude-opus-4-7` 模型不支持 `temperature` 参数导致 HTTP 400 报错的问题。
  - 合并 [PR #2951](https://github.com/sipeed/picoclaw/pull/2951): 修复了部分 OpenAI API 端点不支持 `web_search_preview` 导致的报错，改用标准的 `function` 类型。
- **🛠️ 底层稳定性与工具链**:
  - 合并 [PR #3089](https://github.com/sipeed/picoclaw/pull/3089): 修复了 Windows 环境下 `os.Root` API 的路径分隔符问题（关联 Issue #2472）。
  - 合并 [PR #3043](https://github.com/sipeed/picoclaw/pull/3043): 增加了 `strconv.Atoi` 和 `json.Unmarshal` 的错误返回检查，避免静默失败。
  - 合并 [PR #2945](https://github.com/sipeed/picoclaw/pull/2945): 引入了独立的调试追踪 UI 工具 `picoclaw-tracer`，极大提升了 LLM 交互的实时可观测性。

## 4. 社区热点
今日社区讨论热度最高的 Issue 主要涉及**跨端体验**与**异步代理行为**：
- **[Bug] 异步子代理消息重复** ([Issue #3094](https://github.com/sipeed/picoclaw/issues/3094)): 用户反馈在使用 `spawn` 工具派发异步任务时，飞书/Telegram 等渠道会收到内容相同的粗糙直接推送和汇总推送。这反映了用户对 PicoClaw 在复杂工作流编排下消息路由机制的精准度有较高要求。
- **[Bug] Windows 路径兼容性** ([Issue #2472](https://github.com/sipeed/picoclaw/issues/2472)): 该历史遗留问题（的反斜杠与 `fs.FS` 冲突）今日引发重新讨论，并在 [PR #3089](https://github.com/sipeed/picoclaw/pull/3089) 中得到修复验证，体现了社区对跨平台支持的持续关注。

## 5. Bug 与稳定性
按严重程度排列，今日报告及处理的 Bug 如下：

- **🔴 高：[Security] SSRF 限制绕过** ([Issue #3077](https://github.com/sipeed/picoclaw/issues/3077))
  - **描述**: `web_fetch` 未拦截 `198.18.0.0/15` 内网/基准测试 IP 段。
  - **状态**: 🔥 **已修复** (通过 [PR #3085](https://github.com/sipeed/picoclaw/pull/3085) 合并)。
- **🟠 中：[Bug] 异步子代理消息重复推送** ([Issue #3094](https://github.com/sipeed/picoclaw/issues/3094))
  - **描述**: 异步任务完成后，推送通道收到未排版的原始结果与排版后的最终结果，造成打扰。
  - **状态**: 🟡 **待修复** (尚未有对应 PR)。
- **🟡 低：[Bug] iOS 16.4 以下 Safari 面板无法使用** ([Issue #3090](https://github.com/sipeed/picoclaw/issues/3090))
  - **描述**: 旧版 iOS Safari 登录 PicoClaw 面板后出现异常。
  - **状态**: 🟡 **待修复** (尚未有对应 PR)。
- **🟢 潜在崩溃风险修复 (防panic)**: 
  - 今日收到多个提升代码健壮性的 PR，主要防止接口类型断言失败导致的宕机，包括 HTTP Transport ([PR #3095](https://github.com/sipeed/picoclaw/pull/3095))、Skill安装 ([PR #3092](https://github.com/sipeed/picoclaw/pull/3092))、文件锁 ([PR #3053](https://github.com/sipeed/picoclaw/pull/3053)) 等。

## 6. 功能请求与路线图信号
从社区需求与开发动态来看，PicoClaw 正在向**更深度的通讯协议集成**和**更完善的架构设计**演进：
- **通讯协议扩展**: 用户请求接入 SimpleX、Wire 或 Tox 等主打隐私的去中心化通讯协议 ([Issue #3093](https://github.com/sipeed/picoclaw/issues/3093))。结合之前 Matrix ID 解析修复的 [PR #3045](https://github.com/sipeed/picoclaw/pull/3045)，说明 PicoClaw 正在努力成为全平台、多协议的 AI 基础设施。
- **多代理协作架构**: [PR #2937](https://github.com/sipeed/picoclaw/pull/2937) 提出了引入 "Agent Collaboration Bus"（代理协作总线）的架构设计，包含邮箱、会话隔离和权限控制。虽然目前标记为 Stale，但这揭示了项目在 Multi-Agent 复杂网络编排上的路线图构想。
- **安全访问控制强化**: [PR #3083](https://github.com/sipeed/picoclaw/pull/3083) 提议增强 Launcher 的访问控制（本地绕过和可信代理 CIDR），这对于将 PicoClaw 部署于生产环境或云服务器上的用户来说是一个强需求。

## 7. 用户反馈摘要
通过近期 Issues 提炼出的真实用户画像与痛点如下：
1. **重度的 API 集成与自动化需求**: 用户在实际生产中频繁使用异步子代理 (`spawn`) 并接入飞书/Telegram 机器人。他们期望消息推送机制更加智能，不要将底层的“原始思考过程”暴露给最终用户。
2. **跨硬件/跨平台的长尾需求**: 有用户在树莓派 上通过 Debian 访问

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

这份报告为您基于 2026 年 6 月 11 日的 GitHub 数据，对 NanoClaw 项目进行的全面日常追踪与分析。

---

# 📊 NanoClaw 项目动态日报 (2026-06-11)

### 1. 今日速览
NanoClaw 项目今日保持高活跃度，社区开发者聚焦于 **Skill 生态扩展、容器化日志管理及底层安全隔离机制**。过去 24 小时内，项目共处理了 12 个 PR（其中 4 个已关闭，8 个待合并）和 2 个 Issue（均处于 Open 状态）。虽然今日无新版本发布，但合并的关键安全与文档 PR 表明项目正在为下一次大版本发布积蓄力量。整体来看，项目正向着多模型支持、精细化权限控制和高度可定制的方向稳步迈进，生态系统健康度良好。

### 2. 版本发布
**无新版本发布。**

### 3. 项目进展
今日共关闭/合并了 **4 个 PR**，显著推进了项目的底层安全性、开发者文档完善度及运维体验：
*   **[核心安全] Secure IPC 隔离机制落地**：[PR #3](https://github.com/nanocoai/nanoclaw/pull/3) 正式合并，为每个容器分配独立的 IPC 目录 (`/data/ipc/{groupFolder}/`)。该 PR 从底层重构了身份验证逻辑（基于目录而非自报数据），有效防止了多租户环境下的权限越级，大幅提升了生产环境的安全性。
*   **[开发者生态] Skills 模型文档规范确立**：[PR #2721](https://github.com/nanocoai/nanoclaw/pull/2721) 合并，引入了 `docs/customizing.md` 等三份核心文档，正式确立了 "Skills-based customization contract"（基于技能的定制化契约），为社区开发者提供了清晰的贡献指南，有望大幅降低第三方 Skill 的开发门槛。
*   **[运维工具] 卸载脚本支持**：[PR #2719](https://github.com/nanocoai/nanoclaw/pull/2719) 引入了带有确认和干跑（dry-run）模式的 `uninstall.sh` 脚本，完善了软件生命周期的最后一环。
*   *注：[PR #2724](https://github.com/nanocoai/nanoclaw/pull/2724) 因误操作向错误的基准仓库提交而被发起者自行关闭。*

### 4. 社区热点
今日讨论热度最高的是关于 **多 Agent 运行时支持** 的提案：
*   🔥 **[Issue #1690](https://github.com/nanocoai/nanoclaw/issues/1690) Multi-runtime agent SDK abstraction (Claude + Codex + local models)**：该 Issue 获得了 **3 次 👍 和 6 条评论**。作者提出了一种多运行时抽象层，允许将 Claude、Codex 甚至本地模型作为模块化 Skill 即插即用。这反映出社区对 **“打破单一 LLM 供应商锁定”** 和 **“多模型混合编排”** 的强烈诉求，具有极高的路线图参考价值。

### 5. Bug 与稳定性
今日报告了数个影响特定部署环境的关键 Bug，部分已有开发者提交了修复 PR：
*   🔴 **严重 (已提 Fix)**：**Egress lockdown 劫持宿主机网络** ([Issue #2731](https://github.com/nanocoai/nanoclaw/issues/2731))。开启 `NANOCLAW_EGRESS_LOCKDOWN=true` 后，内部网络的 Agent 丢失了所有对 `host.docker.internal` 的访问权限（如本地 Ollama 端点）。该问题在 [PR #2730](https://github.com/nanocoai/nanoclaw/pull/2730) 中被精准定位：系统在 `launchd/systemd` 环境下未能正确加载 `.env` 中的环境变量。
*   🟡 **中等 (已提 Fix)**：**Telegram 频道配对逻辑遗漏** ([PR #2728](https://github.com/nanocoai/nanoclaw/pull/2728))。使用 `--intent wire-to:<folder>` 配对时，系统写入了日志但未创建核心的 `messaging_group_agents` 数据行，导致消息路由后续失败。
*   🟢 **低危 (已提 Fix)**：**CLI 审批后上下文丢失** ([PR #2611](https://github.com/nanocoai/nanoclaw/pull/2611))。带有审批门的 `ncl` 命令在重放时丢失了原始调用者上下文，存在轻微的权限逻辑混乱风险。

### 6. 功能请求与路线图信号
今日涌现了大量高质量的 Utility/Feature Skill PR，清晰传递了项目未来在**可观测性**与**安全合规**方面的演进信号：
*   **输入/输出安全围栏**：[PR #2726](https://github.com/nanocoai/nanoclaw/pull/2726) 提交了 `/add-guardrails` Skill，支持通过正则表达式对 Agent 的输入输出进行确定性过滤（防 Prompt 注入、防凭证泄露），标志着 NanoClaw 正在向企业级安全合规靠拢。
*   **无 MCP 的自主网络搜索**：[PR #2725](https://github.com/nanocoai/nanoclaw/pull/2725) 引入了 `web-search-plus`，赋予了容器化 Agent 不依赖外部 MCP 服务的多源网络搜索

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-06-11)

## 1. 今日速览
IronClaw 项目今日保持极高的开发与社区活跃度，过去 24 小时内共有 50 个 Issue 更新（35 个新开/活跃，15 个关闭）和 50 个 PR 更新（27 个待合并，23 个已合并/关闭）。项目当前的重心明显聚焦于 **Reborn WebUI v2 的本地测试、底层架构重构以及 API 兼容性打磨**。大量社区成员和核心开发者正在进行 Reborn 本地部署的端到端验证，密集提交了关于 UX 细节、授权认证流程和稳定性的反馈。目前暂无新版本 Release 发版，但针对下游依赖的严重阻断问题已引起核心团队高度重视。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日共有 23 个 PR 被合并或关闭，多项核心功能取得实质性突破，项目在 WebUI 交互、底层事件分发和认证架构上迈出重要一步：
- **Auth 流程完善**：[PR #4746](https://github.com/nearai/ironclaw/pull/4746) 修复了授权门控恢复机制，确保 OAuth 完成后能准确重新派发原始能力调用，解决日历等扩展返回陈旧数据的问题。
- **自动化架构重构**：[PR #4745](https://github.com/nearai/ironclaw/pull/4745) 重构了 Automations 面板，将其底层读取逻辑与 TriggerRepository 绑定，移除了之前笨重的 capability dispatch，大幅优化了面板读取性能。
- **消息推送与生态集成**：[PR #4730](https://github.com/nearai/ironclaw/pull/4730) 实现了端到端的 Slack DM 事件触发推送；[PR #4739](https://github.com/nearai/ironclaw/pull/4739) 和 [PR #4717](https://github.com/nearai/ironclaw/pull/4717) 分别引入了 QA 环境的 Slack 支持和 WebUI v2 的持久化审批功能。
- **大模型兼容性修复**：[PR #4743](https://github.com/nearai/ironclaw/pull/4743) 和 [PR #4742](https://github.com/nearai/ironclaw/pull/4742) 分别修复了 NEAR 上下文溢出的分类错误和手动 Token 运行时的凭证选择问题。

## 4. 社区热点
- **严重依赖卡点**：[Issue #3259](https://github.com/nearai/ironclaw/issues/3259)（14条评论）。下游项目因 wasmtime 28.x 漏洞受限，目前仍强依赖 `crates.io` 上的 `0.24.0` 版本。虽然 GitHub 已发布 `0.27.0`，但 Rust 库未同步更新，引发了社区对供应链安全的担忧。
- **系统级设计讨论**：[Issue #3036](https://github.com/nearai/ironclaw/issues/3036)（6条评论）。关于“配置即代码”的 Epic 级别需求，旨在解决当前 `.env`、JSON 和系统文件配置散乱、无审计追踪的痛点，是 Reborn 演进为企业级应用的重要信号。
- **Provider 配置存档失效**：[Issue #4703](https://github.com/nearai/ironclaw/issues/4703) 和 [Issue #4673](https://github.com/nearai/ironclaw/issues/4673) 反映了 NEAR AI 提供商配置在本地测试时“连接测试成功但无法保存/使用”的阻断性问题。目前核心开发者已在 [PR #4731](https://github.com/nearai/ironclaw/pull/4731) 中集中修复了这一链条。

## 5. Bug 与稳定性
今日报告了多个影响本地开发和 WebUI 体验的 Bug，其中部分已被认领修复：
1. **[High] 本地构建登录阻断**：[Issue #4729](https://github.com/nearai/ironclaw/issues/4729) - NEAR AI 登录在本地/桌面构建中失效，由于 `frontend_callback` 域名限制导致所有 SSO 登录被拒绝（返回 400）。
2. **[High] LLM 工具调用校验错误**：[Issue #4642](https://github.com/nearai/ironclaw/issues/4642) - Reborn 校验机制不兼容严格模式的 LLM（如将可选参数传 `null`），导致多数一线工具调用被误杀。（暂无直接 Fix PR 关联）。
3. **[Medium] 报错信息难以排查**：[Issue #4741](https://github.com/nearai/ironclaw/issues/4741) - 本地开发密钥文件损坏时，抛出不具操作性的 "Invalid master key" 错误；[Issue #4683](https://github.com/nearai/ironclaw/issues/4683) - 无效模型配置导致 WebUI 显示通用的 "driver unavailable" 错误，用户无法定位问题。
4. **[Low] WebUI 交互缺陷系列**：包括代码块无法换行 [Issue #4748](https://github.com/nearai/ironclaw/issues/4748)、响应链接直接跳转离开当前会话 [Issue #4733](https://github.com/nearai/ironclaw/issues/4733)、无语法高亮 [Issue #4708](https://github.com/nearai/ironclaw/issues/4708) 等。集中记录于 [Issue #4692](https://github.com/nearai/ironclaw/issues/4692)。

## 6. 功能请求与路线图信号
- **首次运行体验重造**：[PR #4607](https://github.com/nearai/ironclaw/pull/4607) 引入了 Reborn 首次运行设置 API 行为，结合 [Issue #4700](https://github.com/nearai/ironclaw/issues/4700) 关于“配置凭证后自动启用 MCP”的需求，表明下一版本将重点优化 New User Onboarding（新手引导）流程。
- **富媒体交互升级**：[PR #4738](https://github.com/nearai/ironclaw/pull/4738) 和 [PR #4670](https://github.com/nearai/ironclaw/pull/4670) 正在为 WebChat v2 补齐文件上传和附件处理的能力，这将是近期落地的重大功能。
- **可观测性增强**：[PR #4559](https://github.com/nearai/ironclaw/pull/4559) 引入了基于邀请链接的 Trace Commons 引导流程，[PR #4588](https://github.com/nearai/ironclaw/pull/4588) 添加了轨迹观察者钩子，表明 IronClaw 正在积极构建 AI Agent 执行链路的监控与诊断能力。

## 7. 用户反馈摘要
- **痛点**：用户在本地部署 Reborn WebUI 时，最痛点集中在** Provider 配置保存失败**以及**极差的错误提示**（如配置错输后只给个 "driver unavailable"）。此外，内置 HTTP 工具的审批流 [Issue #4701](https://github.com/nearai/ironclaw/issues/4701) 缺乏上下文说明，让用户不敢轻易点击 "Approve"。
- **体验细节**：重度聊天用户对前端的易用性提出了明确要求，如未发送的草稿在切换会话时应保留 [Issue #4724](https://github.com/nearai/ironclaw/issues/4724)，以及需要调整过小的页面字体 [Issue #4707](https://github.com/nearai/ironclaw/issues/4707)。这些细节表明项目正经历从“能用”到“好用”的过渡期考验。

## 8. 待处理积压
- **[高优先级/阻断]** [Issue #3259](https://github.com/nearai/ironclaw/issues/3259)：**强烈建议维护者立即关注**。由于下游被锁定在 `0.24.0` 并

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

这里是为您生成的 2026 年 6 月 11 日 LobsterAI 项目动态日报。

---

# 📊 LobsterAI 项目动态日报 (2026-06-11)

## 1. 今日速览
LobsterAI 项目今日在研发端保持高度活跃，**过去 24 小时内处理了高达 25 个 Pull Requests（其中 24 个已合并/关闭）**，并且没有新增或待处理的 Issues。项目于昨日（6 月 10 日）发布了全新的 `LobsterAI 2026.6.10` 版本，标志着项目正处于“功能高速迭代与集中发布”阶段。从合并的代码来看，当前开发重心已向**端侧自动化操作**、**长上下文记忆管理**以及**跨平台体验优化**大幅倾斜。Issue 清零且 PR 吞吐量极高，反映出维护团队当前具备极强的代码审查与整合能力，项目健康度优秀。

## 2. 版本发布
今日生效的最新版本为 **LobsterAI 2026.6.10** (包含此前合并的 `release/2026.6.8` 分支特性)。
*   **发布说明**：[LobsterAI 2026.6.10](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.6.10)
*   **核心更新内容**：
    *   **数据备份与恢复**：引入了完整的用户数据备份与迁移机制 (`@fisherdaddy`)。
    *   **本地鉴权**：新增本地回调登录流程，优化了网络受限环境下的认证体验 (`@liuzhq1986`)。
    *   **任务通知**：新增 Cowork 任务完成后的系统级通知恢复与打通功能。
*   **迁移与破坏性变更提示**：本次更新涉及鉴权回调 URL 的重构（[PR #2144](https://github.com/netease-youdao/LobsterAI/pull/2144)），如果有依托旧版内网域名进行二次开发或本地部署的用户，需注意测试模式与生产模式的 Portal 域名分隔逻辑更新。

## 3. 项目进展
今日合并/关闭的 24 个 PR 极大地推动了项目的前进，主要体现在以下几个重大里程碑：

*   🖥️ **重磅推出 Computer Use MVP**：通过 [PR #2143](https://github.com/netease-youdao/LobsterAI/pull/2143)，LobsterAI 引入了 Windows x64 内置的计算机使用套件。该特性集成了 Marketplace 元数据、技能包管理以及 MCP 服务器桥接（用于列出/启动应用、UI 操作等），标志着 LobsterAI 正式具备了系统级 AI 智能体的操控潜力。
*   🧠 **突破性优化 Agent 长对话上下文**：
    *   [PR #2145](https://github.com/netease-youdao/LobsterAI/pull/2145)：改善了 OpenClaw 压缩聊天记录后的上下文连续性，加入了会话级任务状态和工作区快照，大幅降低 Agent 在压缩后“失忆”的概率。
    *   [PR #1499](https://github.com/netease-youdao/LobsterAI/pull/1499)：引入了 Cowork 会话自动裁剪机制，彻底解决了长时间运行会话因超出 Token 窗口而引发的不可恢复报错问题。
*   🎨 **UI 与渲染层重构**：
    *   [PR #2142](https://github.com/netease-youdao/LobsterAI/pull/2142)：重新设计了引擎加载页面，并修复了 Windows NSIS 安装包的破坏性初始化问题。
    *   [PR #2139](https://github.com/netease-youdao/LobsterAI/pull/2139)：全面打磨了 Markdown 和代码块的渲染样式，引入了 One Dark/Light 语法高亮及虚拟化渲染限制，提升阅读性能。
*   🤖 **社区贡献合并**：今日集中关闭了 4 月份由社区贡献的大量高质量 PR（详见下文 Bug 修复部分），表明项目在进行完近期的代码审查清扫工作。

## 4. 社区热点
由于今日未产生新的 Issue 讨论，热点主要集中于近期被合并的高价值社区贡献。其中最引人注目的是关于**定时任务调度与技能管控**的深度优化：
*   **定时任务的闭环完善**：开发者 [@BucleLiu](https://github.com/netease-youdao/LobsterAI/pull/1486) 提出的 [PR #1486](https://github.com/netease-youdao/LobsterAI/pull/1486) 获得合并，新增了“测试任务”按钮。这直击了用户在创建自动化任务时“无法快速验证指令、调试链路过长”的痛点。
*   **系统集成能力**：社区对于引入 Computer Use ([PR #2143](https://github.com/netease-youdao/LobsterAI/pull/2143)) 的呼声和期待较高，这是 AI 助手向 AI Employee 演进的关键一步。

## 5. Bug 与稳定性
今日虽然没有新报告的 Bug（0 Issue），但合并的 PR 中修复了多个严重影响用户体验的历史遗留缺陷：

*   **严重** - **Windows 应用内更新失效**：[PR #2141](https://github.com/netease-youdao/LobsterAI/pull/2141) 修复了 Windows 平台检测与应用内更新失败的致命问题，保障了发

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw (QwenPaw) 项目动态日报 - 2026年06月11日

> **数据源**：github.com/agentscope-ai/CoPaw (QwenPaw)
> **分析周期**：过去 24 小时
> **分析师**：AI 智能体与个人 AI 助手开源项目分析师

---

## 1. 今日速览

过去 24 小时，CoPaw (QwenPaw) 项目处于**高度活跃**状态，迎来了 `v1.1.11` 正式版及 `v1.1.11-beta.3` 的发布。项目共处理了 33 条 Issue（关闭 15 条）和 49 条 PR（合并/关闭 30 条），整体研发节奏紧凑，尤其在底层架构和模型支持上取得了重要进展。

然而，今日的焦点被**桌面端的严重回归 Bug** 占据——新发布的 `v1.1.11` 因底层依赖 `OpenSSL 3.5.7` 的兼容性问题，导致 Windows 桌面版大面积无法启动，社区反馈强烈。核心开发者已在第一时间提交了修复 PR 并准备发布 `post1` 补丁。此外，社区对即将到来的 **Runtime 2.0 架构重构** 及 **AgentScope 2.0 迁移** 展开了深入讨论。

---

## 2. 版本发布

今日连续发布了两个版本，其中包含重要的新特性和底层演进：

*   **v1.1.11 (Latest Release)**
    *   **核心更新**：引入了**零配置免费模型 OAuth 认证**（Free Model OAuth），大幅降低用户接入门槛；新增**小米 MiMo Token Plan** 作为内置 Provider。
    *   **⚠️ 破坏性变更 / 严重回归**：由于捆绑的 Python 环境升级至 OpenSSL 3.5.7，导致 Windows 证书加载失败，**Windows 桌面客户端启动卡死**（详见 Bug 与稳定性分析）。官方已在着手发布 `v1.1.11.post1` 修复。
*   **v1.1.11-beta.3**
    *   **核心更新**：引入了**自我进化技能创建**流程，增强了 `make-skill` 工具；优化了 CI 流程，移除了冗余的 channel-tests 工作流。

---

## 3. 项目进展

今日合并或关闭的 PR 主要集中在架构重构、打包修复和前端体验优化上，项目整体向更模块化的方向迈进：

*   **架构演进准备**：核心贡献者提出了 **Runtime 2.0 模块化架构** ([PR #5078](https://github.com/agentscope-ai/QwenPaw/pull/5078))，旨在替换当前的单体 Runner，引入 `ToolCoordinator` 以实现更精细的工具调用生命周期控制。
*   **紧急修复与打包**：针对 Windows 启动问题，官方连续提交并合并了多个修复 PR，包括锁定 OpenSSL 版本 ([PR #5096](https://github.com/agentscope-ai/QwenPaw/pull/5096))、回退之前的 Discord 编译检查 ([PR #5092](https://github.com/agentscope-ai/QwenPaw/pull/5092))，并准备了 `v1.1.11.post1` 的发版提交 ([PR #5093](https://github.com/agentscope-ai/QwenPaw/pull/5093))。
*   **前端 UI 优化**：合并了修复安全设置页面 Shield 图标居中问题 ([PR #5094](https://github.com/agentscope-ai/QwenPaw/pull/5094)) 以及环境变量页面滚动条闪烁问题 ([PR #4766](https://github.com/agentscope-ai/QwenPaw/pull/4766)) 的 PR。

---

## 4. 社区热点

今日社区讨论最热烈的话题集中在底层框架升级和定时任务的可靠性上：

1.  **[Breaking Change] AgentScope 2.0 迁移计划** ([Issue #4727](https://github.com/agentscope-ai/QwenPaw/issues/4727))
    *   **热度**：8 条评论 | 2 个 👍
    *   **诉求**：随着 AgentScope 2.0 发布，QwenPaw 计划全面升级其后端依赖。这被视为一次重大的架构蜕变，社区对迁移后的性能提升和新 API 适配高度关注，但也对潜在的兼容性破坏表达了谨慎。
2.  **Agent 生成的定时任务无法触发且无法编辑** ([Issue #5064](https://github.com/agentscope-ai/QwenPaw/issues/5064))
    *   **热度**：6 条评论
    *   **诉求**：用户反馈在对话中让 Agent 创建的 Cron 任务缺乏后续的可控性（不能编辑、不触发）。这暴露出当前 Agent 在处理长效、自动化任务时的状态管理闭环存在缺陷。
3.  **Tool 调用在多次后报参数错误** ([Issue #5052](https://github.com/agentscope-ai/QwenPaw/issues/5052))
    *   **热度**：3 条评论
    *   **诉求**：使用 DeepSeek 等兼容模型时，前几次 Tool 正常，随后全盘崩溃报 `unexpected keyword argument 'arguments'`。这揭示了长上下文对话下 Agent 工具解析机制的稳定性问题。

---

## 5. Bug 与稳定性

今日报告了多个影响使用的 Bug，特别是新版本引入的回归问题：

*   **🔴 P0 严重：Windows 桌面版 v1.1.11 无法启动**
    *   **Issue**：[#5086](https://github.com/agentscope-ai/QwenPaw/issues/5086), [#5095](https://github.com/agentscope-ai/QwenPaw/issues/5095)
    *   **原因**：打包环境 OpenSSL 3.5.7 引入回归 Bug，导致 SSL 证书加载失败。
    *   **状态**：**已有 Fix PR**。开发组已提交 [PR #5096](https://github.com/agentscope-ai/QwenPaw/pull/5096) 将 OpenSSL 强行降级锁定至 3.5.6，并启动了 `v1.1.11.post1` 的发布流程。
*   **🟡 P1 高：前端聊天界面性能瓶颈**
    *   **Issue**：[#5053](https://github.com/agentscope-ai/QwenPaw/issues/5053), [#4917](https://github.com/agentscope-ai/QwenPaw/issues/4917)
    *   **原因**：随着对话历史变长，前端渲染负荷过大，切换 Tab 或会话时出现 10 秒以上的严重卡顿。
    *   **状态**：未修复，等待前端渲染逻辑优化（如虚拟列表或分页）。
*   **🟡 P1 高：视觉模型兼容性问题**
    *   **Issue**：[#4989](https://github.com/agentscope-ai/QwenPaw/issues/4989)
    *   **原因**：本地部署 vLLM + 千问 3.6-27B 时，连接测试成功但对话无响应。
    *   **状态**：已关闭（可能已通过底层调用逻辑修复或确认为用户配置问题）。

---

## 6. 功能请求与路线图信号

从近期的 Feature Requests 和活跃的 PRs 中，可以敏锐地捕捉到项目未来的演进方向：

1.  **统一的 Agent 外部能力驱动层**：[PR #5067](https://github.com/agentscope-ai/QwenPaw/pull/5067) 提出 **Agent OS Driver** 概念。旨在统一 MCP、A2A 和 ACP 协议，为智能体构建标准化的外部工具调用抽象层。**预测**：这是成为全能 AI Agent 框架的关键一步，极可能被纳入下一阶段的 Roadmap。
2.  **独立视觉模型支持**：[Issue #4992](https://github.com/agentscope-ai/QwenPaw/issues/4992) 请求支持 `visual_model` 配置。允许在主模型不具备多模态能力时，自动路由到视觉模型进行转述。
3.  **数据与分析插件**：[PR #4622](https://github.com/agentscope-ai/QwenPaw/pull/4622) 正在引入 `DataPaw` 插件，集成 12 种 BI 技能。
4.  **Token 消耗可视化与压缩**：
    *   追踪 Token 消耗：[PR #4433](https://github.com/agentscope-ai/QwenPaw/pull/4433)。
    *   引入上下文压缩层：[Issue #5063](https://github.com/agentscope-ai/QwenPaw/issues/5063) 提议集成 Headroom 以减少 60-95% 的 Token 消耗。

---

## 7. 用户反馈摘要

从今日的 Issue 互动中，提炼出用户最真实的体验痛点：

*   **最核心痛点**：**非流式输出的“假死”体验**。用户在 [Issue #4865](https://github.com/agentscope-ai/QwenPaw/issues/4865) 强烈吐槽：Agent 在写文件或生成代码时，

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