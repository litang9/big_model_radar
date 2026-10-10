# AI CLI 工具社区动态日报 2026-10-10

> 生成时间: 2026-10-10 00:01 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具生态横向对比分析报告 · 2026-10-10

---

## 一、生态全景

AI CLI 工具已全面进入“企业化 + 平台化”深水区：头部产品（Claude Code、Codex、Copilot CLI）纷纷加码网关管控、合规配置（HIPAA、Entra 认证）与多智能体运行时，竞争重心从单轮编码能力转向**长时任务可靠性、沙箱安全与企业可治理性**。同时，共性痛点高度趋同——Windows 平台质量、子代理/沙箱状态一致性、上下文压缩准确性几乎在每个社区都是高热议题。开源/社区驱动项目（OpenCode、Qwen Code）则在 V2 架构迁移和 Managed Agent 分阶段交付上快速追赶，迭代节奏甚至快于官方产品。

---

## 二、各工具活跃度对比

| 工具 | Issues 动态（24h） | PR 动态 | Release | 今日焦点 |
|---|---|---|---|---|
| **Claude Code** | Top10 中 6 条新增/高热，#91870 达 248 评论 | 7 个（多为安全修复，已关闭为主） | v2.1.296（企业网关策略 + `autoCompactWindow`） | Mods 扩展生态、auto mode 分类器误拦 |
| **OpenAI Codex** | 10+ 条，#51601 达 117 评论 | 10+ 个（密集合入，活跃度最高） | v0.162.1 稳定版 + 0.163.0 多个 alpha | Windows 沙箱 SHARING_VIOLATION 风暴 |
| **Gemini CLI** | 10 条 P1/P2 Issue | 10 个，其中 8 个已合并 | v0.64.0-preview.1（安全误报修复） | 子代理可靠性（挂起/误报成功） |
| **Copilot CLI** | 42 条 Issue 更新（量最大） | 2 个 | v1.0.95 系列 + v1.0.96-0 | 沙箱授权、MCP 粒度控制、OOM |
| **Kimi Code CLI** | 0 | 0 | 无 | 无活动 |
| **OpenCode** | 10 条（V2 迁移问题集中） | 10 个（核心开发者密集提交） | 无 | MCP OAuth/schema 兼容性、数据静默丢失 |
| **Qwen Code** | 10 条 | 10 个 | v0.25.1-preview.1 | Managed Agent Stage D–H 推进 |

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **子代理可靠性与精细化控制** | Claude Code、Gemini CLI、Codex、Qwen Code | Claude 新增 `autoCompactWindow` 但触发压缩抖动（#100932）；Gemini 子代理挂起且 `MAX_TURNS` 误报 success（#22323/#21409）；Codex 为 subagent 上下文继承提供 opt-in（#52659）；Qwen 交付子会话 Workspace 隔离（#13781） |
| **权限/安全模型的正确性** | 全部 6 个活跃工具 | Codex full-access 静默降级（#52251/#49776）、Claude auto mode 分类器误拦（#100730）、Gemini 无害命令误报（已修）、OpenCode 拒绝调用被记为关机（#54180）、Copilot 沙箱对 JVM 盲区（#4516） |
| **会话持久化与可恢复性** | Qwen Code、Codex、OpenCode、Copilot CLI | Qwen 恢复后取消归属不清（#6710）；Codex 消息 UI 消失/云环境文件丢失；OpenCode V2 消息不落库（#51020）；Copilot 事件超时后会话永久不可用（#5100） |
| **Windows 平台支持** | Claude Code、Codex、Copilot CLI、OpenCode | Codex 沙箱 setup 校验自身运行时故障（#51601，117 评论）为今日生态最大单点事故；Claude Bash 8191 字符截断；Copilot 桌面端 git 启动失败 |
| **MCP 集成深度** | Claude Code、Copilot CLI、OpenCode、Gemini CLI | 工具粒度授权失败（Copilot #5101）、elicitation 协议声明与实现不符（OpenCode #51856）、union schema 兼容性（OpenCode）、OAuth RFC 9207 兼容（Gemini） |
| **上下文压缩/Token 效率** | Claude Code、Copilot CLI、Gemini CLI、Qwen Code | 压缩计数按响应而非 token（Claude）、Opus 4.6 被限 200K（Copilot #3355）、单轮 ~36.6k token 基线（Gemini）、Qwen 社区要求 Token 优化加质量门禁（#12333） |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 扩展生态（Mods）、企业网关管控、Cowork 云会话 | Max 订阅用户 + 企业 IT | 闭源，Desktop/CLI/TUI 多端，策略自上而下收紧 |
| **Codex** | Windows 沙箱重构、code mode（V8/gRPC）、Dots 远程任务生态 | Pro 订阅 + ChatGPT 深度用户 | Rust 核心，沙箱安全工程投入最重（MXC/PSEC） |
| **Gemini CLI** | 子代理编排、AST 感知工具链、快速决策门降延迟 | 开发者/开源社区 | 开源 TypeScript，社区 PR 接受度高（Decision Gate 即社区贡献） |
| **Copilot CLI** | 沙箱可配置性、Entra 企业认证、权限审计溯源 | GitHub/微软生态企业用户 | 深度绑定 GitHub（MCP、ACP、Timeline 审计） |
| **OpenCode** | V2 迁移补全、MCP 协议兼容、多模型路由 | 多模型/BYOK 开发者 | 开源，Effect 4.0.1 去稳定化，客户端/服务端分离架构 |
| **Qwen Code** | Managed Agent 平台化（K8s 运行时、Workspace 隔离） | 平台/基础设施团队 | 开源，分阶段交付（Stage D–H），工程纪律严（质量门禁诉求） |
| **Kimi Code CLI** | — | — | 无活动，生态参与度最低 |

---

## 五、社区热度与成熟度

- **热度第一梯队**：Claude Code（单 issue 248 评论）与 Codex（单 issue 117 评论 + PR 最密集）——用户基数大、付费用户投诉强度高，但重 bug 多为平台级遗留问题，处于“成熟但债务重”阶段。
- **迭代速度第一梯队**：Gemini CLI（10 个 PR 中 8 个当日合并）与 Qwen Code（纲领性 #12380 牵引系统性交付）——响应-合入周期最短，处于快速上升期。
- **转型阵痛期**：OpenCode（V2 迁移断崖）与 Copilot CLI（Issue 量最大但 PR 仅 2 个，响应通道偏慢）。
- **掉队**：Kimi Code CLI 连续无活动，社区生态建设明显滞后。

---

## 六、值得关注的趋势信号

1. **“静默失败”成为信任杀手**：权限静默降级、策略静默丢弃、消息静默不落库在 4+ 工具中被报告。趋势明确：**可观测、可解释的失败**（如 Copilot Timeline 标注权限决策者）正成为下一代标配能力。
2. **安全分类器进入“误伤 tuning”阶段**：Claude（误拦授权任务）与 Gemini（误拦 `ls -ld`）同日出现同类问题——各家的安全前置层均已上线并开始为过严付出可用性代价，安全-效率权衡将是持续战场。
3. **多智能体架构收敛为公共契约**：Qwen 的 #13785（agent 身份进入 API 契约）、Codex 的 gRPC host 隔离、Claude 的子代理配置精细化——多智能体正从“提示词技巧”走向“运行时工程”。
4. **Windows 是全行业短板**：三大闭源工具今日均有 Windows 阻塞性问题，Codex 的沙箱重构 PR 显示这是数月级投入。做平台选型时，Windows 团队应谨慎评估成熟度。
5. **质量门禁意识觉醒**：Qwen 社区“先建尺子再开开关”（#12333）的诉求具有行业参考价值——Token 优化、压缩等模糊性改动需要召回率/成功率基准护航，自建 agent 工具链的团队应提前布局评测。
6. **企业合规通道打开商业化第二曲线**：Claude（网关策略 + HIPAA PR）、Copilot（Entra broker + 凭据注入）动作明确，AI CLI 的采购决策权正向企业 IT/安全部门转移。

---

*报告基于 2026-10-10 各仓库公开动态生成，数据窗口为过去 24 小时。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据说明：当前 PR 列表的评论/点赞字段缺失（undefined/0），本报告基于 PR 摘要、Issue 讨论热度（评论数）及更新时间综合排序。数据截止 2026-10-10，所列 PR 均为 OPEN 状态。

---

## 一、热门 Skills 动态排行（PR）

| # | Skill / PR | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** ([#1742](https://github.com/anthropics/skills/pull/1742)) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 Header 配置，修复高频 Issue #1668；mcp-builder 是生态核心 Skill，其评估脚本另有严重 bug（Issue #1390：真实 MCP 服务器评估全部 0 分） | OPEN，9/8 提交、10/8 仍活跃 |
| 2 | **skill-creator 系列修复** ([#1298](https://github.com/anthropics/skills/pull/1298), [#1681](https://github.com/anthropics/skills/pull/1681), [#1961](https://github.com/anthropics/skills/pull/1961)) | #1298 修复 Windows 下触发评估失效；#1681 修复 package_skill.py 无法独立运行；#1961 加固 eval viewer（XSS、DNS rebinding）。skill-creator 是 Bug 报告最集中的 Skill（Issues #556/#1352/#1383/#1394/#202），是社区事实上的关注焦点 | 均 OPEN |
| 3 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Markdown → Marp 幻灯片 → MP4 视频 + 拟真配音的零成本方案，代表“内容再生产”类需求 | OPEN |
| 4 | **docx 增强系列** ([#1734](https://github.com/anthropics/skills/pull/1734) 孤立批注检测, [#1792](https://github.com/anthropics/skills/pull/1792) LibreOffice 超时误报成功) | 文档处理类 Skill 持续被打磨，#1792 修复“超时却报告成功”的可靠性问题，反映企业文档工作流依赖度上升 | 均 OPEN |
| 5 | **AWT (AI Watch Tester)** ([#822](https://github.com/anthropics/skills/pull/822)) | 零代码 E2E 测试生成，赋予 Claude 视觉与浏览器控制能力；与 Issue 中的测试生成需求高度呼应 | OPEN（3 月提交，9 月仍更新） |
| 6 | **document-typography** ([#514](https://github.com/anthropics/skills/pull/514)) | 解决 AI 生成文档的孤行、寡行、编号错位等排版问题——“用户不主动要求但影响所有输出”的典型质量 Skill | OPEN |
| 7 | **ODT Skill** ([#486](https://github.com/anthropics/skills/pull/486)) | OpenDocument 创建/填充/转 HTML，补齐开源办公格式短板 | OPEN |
| 8 | **notion-spec-to-implementation** ([#1245](https://github.com/anthropics/skills/pull/1245)) | 将产品/技术 Spec 拆解为 Notion 任务（含验收标准与进度跟踪），直连“需求→执行”工作流 | OPEN |

---

## 二、社区需求趋势（Issues 提炼）

1. **信任与安全治理**（最高热度）：[#492](https://github.com/anthropics/skills/issues/492)（43 评论）指出社区 Skill 冒用 `anthropic/` 命名空间造成信任边界滥用；配合 #1980（命令注入）、#1961/#1394（XSS）——安全审计已成第一诉求。
2. **企业/组织级分发能力**：[#228](https://github.com/anthropics/skills/issues/228)（16 评论）要求组织内 Skill 共享库与分享链接，取代手工上传 .skill 文件；[#189](https://github.com/anthropics/skills/issues/189) 要求解决插件间 Skill 重复加载。
3. **Skill 质量评估基础设施**：#556、#1352、#1383、#1390 集中暴露 `run_eval.py` 触发率恒为 0、并行 worker 交叉污染、评估分数失真等问题——社区需要可信的 Skill 触发/质量评测工具链。
4. **上下文窗口经济性**：[#1487](https://github.com/anthropics/skills/issues/1487) 报告 claude-api Skill 一次性注入 ~156k token 耗尽上下文；[#1329](https://github.com/anthropics/skills/issues/1329) 提议 compact-memory 符号化压缩 Agent 状态。
5. **新方向提案**：agent 治理与审计（#412）、推理质量三道门（#1385）、企业内 SharePoint 文档权限处理（#1175）——企业级 Agent 治理是增长中的需求带。

---

## 三、高潜力待合并 Skills（OPEN 但持续活跃）

- [#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder mcp>=2 兼容 — 10/8 仍有更新，对应已确认 Issue，合并概率高
- [#1681](https://github.com/anthropics/skills/pull/1681) package_skill.py 独立运行修复 — 同上作者，近期活跃
- [#1298](https://github.com/anthropics/skills/pull/1298) skill-creator Windows 兼容修复 — 直击多个高赞 Issue
- [#1961](https://github.com/anthropics/skills/pull/1961) eval viewer 安全加固 — 响应 #1394，安全类修复优先级高
- [#1792](https://github.com/anthropics/skills/pull/1792) docx 超时错误上报 — 小而确定的可靠性修复
- [#1730](https://github.com/anthropics/skills/pull/1730) claude-api 死链修复 — 10/4 更新，低风险易合并

---

## 四、生态洞察（一句话）

**社区最集中的诉求是“可信的 Skill 供应链”**——从命名空间冒用的信任边界（#492）、到评估工具链的可靠性（run_eval 系列失效）、再到注入/XSS 等安全加固，用户希望在放量使用 Skill 之前，先解决“谁能发布、如何验证、是否安全、上下文是否可控”这四个基础问题。

---

# Claude Code 社区动态日报 · 2026-10-10

## 📌 今日速览

Claude Code 发布 **v2.1.296**，重点增强企业网关策略控制与子代理的 `autoCompactWindow` 配置能力。社区方面，**Mods 扩展机制**持续引爆讨论（248 条评论），而 **Cowork auto mode 分类器误拦用户自身授权任务**成为今日最活跃的新 bug。Windows 平台问题依然是重灾区。

---

## 🚀 版本发布

### v2.1.296
- **网关策略增强**：`managed.policies[]` 新增 `code` key，与 `cli` 相同的策略设置现已应用于 Claude Desktop 的 Code tab；配合 `desktop` 可开启 Claude Desktop 的网关模式——企业统一管控能力进一步收紧。
- **子代理配置**：subagent frontmatter 与 `--agents` 定义现支持 `autoCompactWindow`，可精细化控制子代理的上下文压缩窗口。

---

## 🔥 社区热点 Issues（Top 10）

1. **[#91870](https://github.com/anthropics/claude-code/issues/91870) — Mods：让 Claude 扩展性提升 10 倍**
   社区最火线程（248 评论 / 131 👍）。官方 10 月 1 日确认 Mods 已上线，正快速消化反馈。这是当前 Claude Code 扩展生态的旗舰特性。

2. **[#100730](https://github.com/anthropics/claude-code/issues/100730) — Auto mode 分类器拦截账户所有者自己的定时任务和文件传输**
   今日新增高危 bug：Max 用户在 Cowork 云会话中被安全分类器误拦自己授权的操作。与 #97613（9 月 23 日以来的回归）呼应，安全分类器误判是一类系统性问题。

3. **[#100932](https://github.com/anthropics/claude-code/issues/100932) — 小 `autoCompactWindow` 导致 Autocompact 抖动、子代理被杀**
   与今日新版本直接相关：压缩计数器按模型响应计算而非 token，报错信息误导性地归咎于文件/工具输出。新配置项上线后此问题值得官方跟进。

4. **[#28304](https://github.com/anthropics/claude-code/issues/28304) — Claude Desktop 1.1.4173 启动崩溃**
   长期遗留问题（41 评论），进程存活但无窗口渲染，影响基本可用性。

5. **[#51828](https://github.com/anthropics/claude-code/issues/51828) — 终端 resize 时 Scrollback 重复渲染（VS Code / macOS）**
   有复现、36 👍，TUI 渲染层的老大难问题，跨多个版本未修复。

6. **[#100936](https://github.com/anthropics/claude-code/issues/100936) — Windows Bash 命令在约 8191 字符处被截断**
   每次会话 SessionStart 注入的环境前缀持续增长最终吃掉命令预算，且双反斜杠被提前减半。长命令用户会静默踩坑。

7. **[#99211](https://github.com/anthropics/claude-code/issues/99211) — Desktop 端任何状态变更重绘所有 mod 渲染点**
   破坏 Buttons 交互并重启 SVG 动画，直接影响 Mods 生态的 UX 质量。

8. **[#95580](https://github.com/anthropics/claude-code/issues/95580) — Windows computer use 导致窗口卡在置顶状态**
   `WS_EX_TOPMOST` 未正确清理，截图重固定与侧栏恢复存在竞态。

9. **[#28271](https://github.com/anthropics/claude-code/issues/28271) — `@formatjs/intl` 未处理 Promise rejection 导致 GUI 崩溃**
   Desktop 渲染进程崩溃的另一根因（17 👍），与 #28304 同期出现。

10. **[#91878](https://github.com/anthropics/claude-code/issues/91878) — 请求 spinner 状态词 i18n 本地化**
    小而美的功能请求，反映非英语用户群体的本地化诉求在增长。

> 另注：今日多个 7-8 月的旧 issue 被批量标记 stale 关闭（如 #80514、#81108、#81151 等），仓库维护节奏在加速。

---

## 🔀 重要 PR 进展

今日仅 7 个 PR 更新（远少于 issue 量），PR 通道并非主开发路径，但仍有值得关注的贡献：

1. **[#41447](https://github.com/anthropics/claude-code/pull/41447) — “开源 Claude Code”（社区发起，长期 OPEN）**
   社区呼声的象征性 PR，今日仍在活跃讨论。

2. **[#100293](https://github.com/anthropics/claude-code/pull/100293) — HIPAA 合规设置示例（已关闭）**
   新增 `settings-hipaa.json`、`managed-mcp-hipaa.json` 与 README，面向有 HIPAA 配置的组织限制会话内容外流。医疗行业合规场景的实用参考。

3. **[#85716](https://github.com/anthropics/claude-code/pull/85716) — hookify 加载祖先 `.claude` 目录规则，防止静默绕过（已关闭）**
   修复规则加载范围过窄导致安全规则被跳过的问题。

4. **[#84747](https://github.com/anthropics/claude-code/pull/84747) — hookify 强制规则评估范围 + 安全文件读取（已关闭）**
   修复 `event=None` 时绕过事件过滤器的逻辑漏洞。

5. **[#84711](https://github.com/anthropics/claude-code/pull/84711) — 修复 yaml 注入与符号链接凭证覆盖（已关闭）**
   防御性检查阻断凭证被恶意覆盖的攻击面。

6. **[#84364](https://github.com/anthropics/claude-code/pull/84364) — hookify 异常时 fail-closed（已关闭）**
   pretooluse 钩子异常时改为 deny 而非放行，安全默认值的关键修正。

7. **[#84365](https://github.com/anthropics/claude-code/pull/84365) — 任何用户的 👎 均可阻止自动关闭（已关闭）**
   与去重机器人承诺行为保持一致，改善 issue 治理公平性。

> 趋势提示：贡献者 @alifakbxr 的系列安全修复集中在 hookify 插件，值得安全敏感团队审计自己的规则配置。

---

## 📈 功能需求趋势

| 方向 | 信号来源 |
|---|---|
| **Mods / 扩展生态** | #91870（248 评论）、#99211 —— 社区最大热情所在，需求从“能用”转向“好用” |
| **企业管控与合规** | v2.1.296 网关策略、HIPAA PR —— 官方明显在加码企业市场 |
| **Cowork 云会话可靠性** | #100730 及关联的 #97613、#97308 —— auto mode 分类器误拦成系列问题 |
| **子代理精细化控制** | 新版 `autoCompactWindow` 与 #100932 —— 配置能力与实现正确性需同步 |
| **Windows 平台支持** | 今日 6+ 条 Windows 相关 issue —— Bash 截断、进程泄漏、窗口置顶等 |
| **i18n / 本地化** | #91878 等 |

---

## ⚠️ 开发者关注点

1. **auto mode 分类器误判**：升级后若发现“明明授权的操作被拦”，先查 #100730 / #97613，非个人配置问题。
2. **Windows 用户长会话风险**：Bash 命令 8191 字符截断（#100936）+ 环境前缀膨胀 + 历史上的孤儿进程问题（#81108、#81130），建议定期重启会话。
3. **子代理用户慎用小 `autoCompactWindow`**：新特性可能触发 #100932 的抖动 bug。
4. **hookify 用户建议同步安全修复**：多个 fail-open 漏洞已修，旧版本存在规则被静默绕过的风险。
5. **Desktop 用户**：启动崩溃（#28304）与渲染崩溃（#28271）仍开放，升级前留意版本反馈。

---
*数据来源：github.com/anthropics/claude-code 过去 24 小时活动 | 由 AI 技术分析师生成*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-10-10 | 数据来源：github.com/openai/codex**

---

## 1. 今日速览

今日 Codex 发布 **v0.162.1 稳定版**，修复了 TUI 多行异步问题导致的崩溃及后台服务器兼容性启动失败，同时放出 0.163.0 多个 alpha 预览版。社区最大焦点是 **Windows 沙箱 "SHARING_VIOLATION / setup refresh had errors" 系列故障**——多个高热度 Issue 指向沙箱校验自身活动运行时文件（如 `node_repl.exe`）时被占用导致命令执行全面失败。PR 方面团队密集合入 exec-server、code-mode 安全加固与 Windows 沙箱重构（split MXC crates）相关改动，明显在正面回应上述 Windows 问题。

---

## 2. 版本发布

### rust-v0.162.1（稳定版）
- 修复多行异步问题导致的 TUI 崩溃，保留换行与完整超链接目标（#51866）
- 修复后台服务器 feature 设置与 CLI 默认值不一致导致的启动失败，新增兼容性检查
- 链接：https://github.com/openai/codex/releases/tag/rust-v0.162.1

### rust-v0.163.0-alpha.4 / alpha.2（预览版）
- 常规预览迭代，未见详细 changelog

---

## 3. 社区热点 Issues

1. **[#51601](https://github.com/openai/codex/issues/51601) Windows app 26.1002.51308 沙箱 setup 校验自身运行时触发 SHARING_VIOLATION**
   今日最热（117 评论 / 30 👍）。升级后所有命令执行失败，疑似本轮 Windows 沙箱故障风暴的源头报告。

2. **[#51882](https://github.com/openai/codex/issues/51882) Windows 上 Dot 发起的任务报 "setup refresh had errors"，本地会话正常**
   Dots 远程任务与本地行为不一致（12 评论），与 #51601 同族，影响 Pro 用户工作流。

3. **[#25826](https://github.com/openai/codex/issues/25826) Windows 桌面版最大化窗口在多显示器上溢出**
   长期未修的老 bug（6 月至今，56 评论），社区对 Windows 桌面质量的不满持续累积。

4. **[#40596](https://github.com/openai/codex/issues/40596) unified exec 失败：`helper_unknown_error: setup refresh had errors`**
   8 月即报告、至今未解决（21 评论），说明沙箱 setup refresh 问题已存在一个多月。

5. **[#52251](https://github.com/openai/codex/issues/52251) Linux：full-access 线程在 goal continuation 边界被静默降级为 workspace**
   权限静默降级 + approval 保持 "never"，属于安全敏感问题，值得关注官方响应。

6. **[#49776](https://github.com/openai/codex/issues/49776) macOS：切换模型时 Full Access 被静默降级为 workspace-write**
   与 #52251 呼应，跨平台存在权限配置漂移问题。

7. **[#52503](https://github.com/openai/codex/issues/52503) Dots/Web：GitHub "Always allow" 后仍反复弹出审批，长时上传结果丢失**
   审批状态不持久化直接阻塞已授权工作流，Dots 体验的关键缺陷。

8. **[#49682](https://github.com/openai/codex/issues/49682) ChatGPT dots 云电脑文件丢失、终端会话消失**
   云环境持久性可靠性问题（28 评论），影响对 dots cloud computer 的信任。

9. **[#51938](https://github.com/openai/codex/issues/51938) 桌面版聊天消息随机消失（session 日志中仍存在）**
   数据未丢但 UI 渲染丢失，属用户信任度高敏感问题。

10. **[#38348](https://github.com/openai/codex/issues/38348) macOS Computer Use 误捕 Stage Manager 缩略图，污染 ScreenCaptureKit 流**
    技术分析深入（负坐标窗口导致 -3811/-3812 错误），影响 macOS Computer Use 稳定性。

---

## 4. 重要 PR 进展

1. **[#52707](https://github.com/openai/codex/pull/52707) Windows MXC 沙箱迁移至拆分的 MXC crates**
   解决过渡版 Windows 构建上 PSEC API 符号存在但 MXC 未启用导致的误判——直指当前 Windows 沙箱故障。

2. **[#52682](https://github.com/openai/codex/pull/52682) 密码修复前校验 Windows 沙箱账户**
   防止凭证不匹配时对两个沙箱账户同时轮换密码，降低沙箱修复的风险。

3. **[#52681](https://github.com/openai/codex/pull/52681) code mode 中拒绝 Serde 保留 JSON 键**
   安全修复：阻止嵌套 `RawValue` 绕过解析器递归限制。

4. **[#52661](https://github.com/openai/codex/pull/52661) 防止代理凭证别名绕过 MITM hooks**
   安全修复：关闭无 hook 别名路径的凭证泄露面。

5. **[#52700](https://github.com/openai/codex/pull/52700) exec-server 稳定兼容基线升级至 0.162.1**
   与今日稳定版发布配套，暗示 exec-server 测试基线将跟进。

6. **[#52725](https://github.com/openai/codex/pull/52725) 通过 OSC 7501 上报终端程序状态**
   将 idle/working/blocked 状态从 iTerm2 扩展到任意终端，改善终端集成体验。

7. **[#52723](https://github.com/openai/codex/pull/52723) code-mode host 新增 opt-in gRPC over stdio**
   共享 HTTP/2 channel 与 host 进程、隔离会话状态，为 code mode 传输层演进铺路。

8. **[#52685](https://github.com/openai/codex/pull/52685) 保留 code mode 取消语义**
   修复 V8 终止期间取消被降级为可捕获 JS 异常、脚本继续执行的 bug。

9. **[#52702](https://github.com/openai/codex/pull/52702) bootstrap GET 失败后经系统代理重试**
   改善受限网络环境下账户发现与云配置拉取的可靠性。

10. **[#52659](https://github.com/openai/codex/pull/52659) subagent 模型上下文默认值 opt-in 特性**
    为 subagent 的 context window 继承策略提供可配置开关，响应多 agent 资源控制需求。

其他值得留意：[#52696](https://github.com/openai/codex/pull/52696)（Windows junction 路径匹配修复）、[#52686](https://github.com/openai/codex/pull/52686) / [#52671](https://github.com/openai/codex/pull/52671)（工具输出保留注解）、[#52721](https://github.com/openai/codex/pull/52721)（服务器关停时会话创建失败的结构化原因）。

---

## 5. 功能需求趋势

- **权限与沙箱透明度**：多平台报告权限被静默降级（#52251、#49776），社区要求权限变更可观测、可解释。
- **Dots 深度集成**：iOS 快捷指令/Action Button 调起 dot（#50385）、@dot 页面评论响应（#50820）、dots 云环境持久性（#49682），Dots 生态是需求最密集的新方向。
- **工作流可续性**：配额状态暴露与优雅停止（#24927）、工具输出保留、审批状态持久化（#52503），反映长时自动任务需求上升。
- **CLI/TUI 体验打磨**：上下文感知的下一步建议（#42587）、远程 SSH 下链接行为可配置（#48886，已关闭）。
- **跨设备会话同步**：iPhone 与桌面/Web 会话 revision 不一致（#48490）。

---

## 6. 开发者关注点（痛点总结）

1. **Windows 沙箱是当前最大痛点**：过去 24 小时高热 Issue 中 8+ 条与 Windows 沙箱 setup/refresh 失败相关，跨越 App、CLI、Dots、浏览器控制多个入口，重启/重装/升级均无法解决。团队 PR 活动（#52707、#52682）显示正在集中修复，建议 Windows 用户关注 0.163 系列版本。
2. **静默权限降级损害信任**：full-access 被降级而 approval 策略不变，可能导致任务中途失败甚至产生安全隐患。
3. **长时任务结果可靠性**：上传结果丢失、审批卡不可用、消息 UI 消失，用户需要更强的会话状态一致性与可恢复性。
4. **跨平台质量不均衡**：macOS 端 Computer Use / 浏览器扩展检测问题较多但热度较低；Windows 端问题量大且修复周期长（部分 Issue 开放 1-4 个月）。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-10）

## 一、今日速览

Gemini CLI 发布了 **v0.64.0-preview.1** 补丁版本，主要修复了安全检测误报问题（PR #29672）。社区讨论焦点集中在 **子代理（subagent）可靠性**上：多个 P1 级 Issue 反映子代理挂起、达到轮次上限却误报成功等问题。此外，多个涉及终端 UI 稳定性和 MCP OAuth 认证的 PR 在今日取得进展。

---

## 二、版本发布

### v0.64.0-preview.1
- 通过 cherry-pick 方式将 commit `2ce1a69` 补丁至 v0.64.0-preview.0，核心内容为 **PR #29672**：修复 shell 命令执行中 `untrustedContextTracker` 导致的安全警告误报（如 `ls -ld`、`grep -rn` 等无害命令被错误拦截确认）。
- 链接：https://github.com/google-gemini/gemini-cli/releases

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | **P1** 子代理达到 `MAX_TURNS` 上限却上报 `status: success`，掩盖了中断事实，直接影响任务可靠性判断。13 条评论，社区讨论热烈 |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | **P1** 通用代理挂起问题：简单如创建文件夹的操作也会永久卡死，8 👍，是用户最痛的体验问题之一 |
| 3 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | **P2 战略性提案**：利用 Gemini 3 的原生 bash 能力，探索零依赖 OS 沙箱 + 执行后意图路由，涉及安全与能力的核心权衡 |
| 4 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | 模型几乎不会自主调用自定义 skills 和子代理，需要显式指令才触发，反映代理编排能力短板 |
| 5 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | **EPIC**：评估 AST 感知的文件读取/搜索/代码库映射，有望显著降低 token 消耗和减少错位读取 |
| 6 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | 工具数量超过限制（128+）时触发 400 错误，影响重度 MCP/子代理配置用户 |
| 7 | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent 完全忽略 `settings.json` 中的 `maxTurns` 等覆盖配置 |
| 8 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | **P1** browser 子代理在 Wayland 下失败，Linux 用户受阻 |
| 9 | [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | 代理应阻止/劝阻 `git reset`、`--force` 等破坏性操作，安全问题持续受关注 |
| 10 | [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | **P1** get-shit-done output hook 导致 CLI 崩溃 |

---

## 四、重要 PR 进展（Top 10）

1. **[#29672](https://github.com/google-gemini/gemini-cli/pull/29672)**（已合并）安全检测误报修复——消除无害 POSIX 命令标志的误拦截，已随 v0.64.0-preview.1 发布
2. **[#29644](https://github.com/google-gemini/gemini-cli/pull/29644)** P1：恢复终端宽度变化时的防抖静态 UI 刷新，修复水平 resize 的渲染问题
3. **[#29476](https://github.com/google-gemini/gemini-cli/pull/29476)**（已合并）P1：修复 IDE 集成终端中 Enter 键确认无响应的挂起问题
4. **[#29582](https://github.com/google-gemini/gemini-cli/pull/29582)**（已合并）P1 性能优化：文件发现与 ignore 过滤引入层级记忆化 + 子树剪枝，解决大仓库数秒阻塞
5. **[#29683](https://github.com/google-gemini/gemini-cli/pull/29683)**（已合并）P1：A2A server 中批量工具调用被拒绝时不再影响整个批次
6. **[#29490](https://github.com/google-gemini/gemini-cli/pull/29490)**（已合并）P1：修复 `-r` 恢复会话时工具响应被重复回放的问题
7. **[#29468](https://github.com/google-gemini/gemini-cli/pull/29468)**（已合并）P1：429/503 等连接错误时正确显示重试进度，告别卡死的 "Thinking..."
8. **[#29488](https://github.com/google-gemini/gemini-cli/pull/29488)**（已合并）P1：MCP OAuth 流程按 RFC 9207 正确处理 `iss` 参数缺失
9. **[#29578](https://github.com/google-gemini/gemini-cli/pull/29578)** MCP OAuth 对 Google 端点请求 offline access 并在刷新时保留 clientSecret，修复 Workspace API 集成
10. **[#29482](https://github.com/google-gemini/gemini-cli/pull/29482)**（已合并）社区贡献的“快速决策门（Decision Gate）"：轻量分类器前置，简单消息走捷径降低延迟

---

## 五、功能需求趋势

1. **子代理体系深化**：最集中的方向——包括本地子代理 Sprint、并行协作/共享内存（#18287）、子代理轨迹可见化（#22598）、bug 报告包含子代理上下文（#21763）
2. **AST 感知工具链**：#22745/#22746/#22747 系列，探索 tilth、glyph、ast-grep 用于精准代码读取与搜索
3. **Token 效率优化**："Tactful Extraction" 手术式读取（#19561）、基于文件的持久化任务追踪替代 WriteToDo（#18836）
4. **Shell/沙箱策略**：零依赖 OS 沙箱（#19873）与破坏性命令防护（#22672），安全与能力并重
5. **浏览器代理健壮性**：会话接管、锁恢复、Wayland 支持（#22232/#21983）

---

## 六、开发者关注点（痛点总结）

- **子代理可信度不足**：挂起、误报成功、不自主调用是最高频抱怨，直接影响生产使用
- **终端 UI 稳定性**：resize 闪烁、Enter 无响应、重试无反馈等多个 P1 修复本周落地，说明 Ink 渲染层是持续痛点
- **配置覆盖失效**：`settings.json` 配置在 Browser Agent 等场景被忽略
- **OAuth/MCP 认证脆弱**：refresh token 丢失、RFC 9207 兼容性问题集中修复中
- **工具数量上限**：重度用户的 400 错误尚待解决方案
- **上下文成本**：单轮 ~36.6k token 基线偏高，社区强烈呼吁精准读取策略

---
*数据来源：github.com/google-gemini/gemini-cli | 统计窗口：2026-10-09 ~ 2026-10-10*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-10-10）

## 📌 今日速览

过去 24 小时内 Copilot CLI 密集发布多个版本（v1.0.95 系列及 v1.0.96-0），重点修复了 `/add-dir` 沙箱授权、新增 Entra 原生认证和沙箱凭据注入配置。社区共更新 42 条 Issue，沙箱权限与 MCP 集成仍是讨论焦点，其中 [`/add-dir` 沙箱问题 #5076](https://github.com/github/copilot-cli/issues/5076) 已随新版本关闭。

---

## 🚀 版本发布

**v1.0.96-0**（最新）
- Git 仓库内交互式会话更快到达输入提示符
- Timeline 现在会标注每条权限决策由谁做出（用户 / Assisted Permissions / 策略 / 无人值守回退）
- **修复**：`/add-dir` 在当前会话中正确授予新增目录的沙箱访问权限

**v1.0.95 系列**
- macOS 可用时采用原生 Microsoft Entra broker 认证，浏览器回退
- `copilot config` 支持 sandbox credential `injectHosts` 键，Bash/Zsh/Fish 均支持键名补全
- `--context` 现在正确应用于新建和恢复的 ACP 会话，不再静默忽略

---

## 🔥 社区热点 Issues（Top 10）

1. **[#4686](https://github.com/github/copilot-cli/issues/4686) Node.js OOM 崩溃 — 37 分钟泄漏 31,965 个 libuv 异步句柄**（OPEN）
   严重稳定性问题：每个会话约 37 分钟后因堆内存耗尽崩溃，且 SEA 忽略 `NODE_OPTIONS`。长时间任务的可靠性核心隐患。

2. **[#5076](https://github.com/github/copilot-cli/issues/5076) `/add-dir` 未将目录加入沙箱白名单**（已关闭，4 评论）
   直接对应 v1.0.96-0 的修复，是“发布响应社区反馈”的典型案例。

3. **[#5098](https://github.com/github/copilot-cli/issues/5098) 添加 `sandbox.userPolicy.filesystem` 路径后 `sessionStart` hook 停止运行**（OPEN，新提交）
   沙箱文件系统策略与 hook 生命周期存在冲突，影响 CI/自动化场景。

4. **[#5094](https://github.com/github/copilot-cli/issues/5094) Windows 桌面端 1.1.27+ 无法启动自带 git（0x80070005）**（OPEN，新提交）
   破坏所有项目注册的阻塞性回归。

5. **[#5100](https://github.com/github/copilot-cli/issues/5100) 一次 120s 事件确认超时导致会话永久不可用**（OPEN，新提交）
   长会话中事件投递失败后无恢复机制，只能 resume，稳定性痛点。

6. **[#5101](https://github.com/github/copilot-cli/issues/5101) `--add-github-mcp-tool issue_write` 导致无任何 MCP 工具可用**（OPEN）
   与 [#3052](https://github.com/github/copilot-cli/issues/3052)（同类工具指向 readonly 端点）一起，暴露 MCP 工具粒度控制的系统性缺陷。

7. **[#4686 之外的性能争议：#3355](https://github.com/github/copilot-cli/issues/3355) Claude Opus 4.6 上下文被限制在 200K（模型原生 1M）**（已关闭，4 👍）
   深度技术会话频繁触发自动压缩，社区对可配置上下文窗口的呼声强烈。

8. **[#5091](https://github.com/github/copilot-cli/issues/5091) 会话提示词全部排队、MCP 已连接却反复重连**（OPEN）
   状态机死循环类 bug，重启/恢复会话均无效。

9. **[#5103](https://github.com/github/copilot-cli/issues/5103) BYOK：子代理强制使用会话级 wire API，跨模型家族返回 400**（OPEN，新提交）
   GPT-5（responses）与 Claude（completions）混排的 BYOK 用户会直接失败。

10. **[#4516](https://github.com/github/copilot-cli/issues/4516) 沙箱 RW 路径授权对 JVM 进程不生效**（OPEN）
    Maven 等 Java 工具链用户报告 "Operation not permitted"，shell 可写但 JVM 不可写，疑似沙箱实现对 JVM 系统调用的覆盖盲区（另见新提交的 [#5105](https://github.com/github/copilot-cli/issues/5105) Gradle daemon 连接被 macOS 沙箱阻断）。

---

## 🔀 重要 PR 进展

> 注：过去 24 小时仅更新 2 个 PR，本期如实呈现：

1. **[#5093](https://github.com/github/copilot-cli/pull/5093) install：校验与实际下载 tarball 匹配的 checksum 条目**
   有价值的供应链安全修复：当前 `sha256sum -c --ignore-missing` 存在“空洞验证”——下载的 tarball 不在 SHA256SUMS 中时仍报成功。建议关注合入进度。

2. **[#5106](https://github.com/github/copilot-cli/pull/5106) Create index.html**
   疑似无关/垃圾 PR（仅附带一个文件链接），预计会被维护者关闭。

---

## 📈 功能需求趋势

- **沙箱可配置性与兼容性**：filesystem 策略、凭据注入（`injectHosts`、`sandbox.auth.git`）、JVM/Gradle/Java 生态兼容是当前最高频主题
- **会话稳定性与生命周期**：内存泄漏、事件投递失败、hook 失效、resume 行为
- **MCP 深度集成**：工具粒度授权、持久化认证（Atlassian 每次都要授权 [#2536](https://github.com/github/copilot-cli/issues/2536)）、大小写容错（[#5050](https://github.com/github/copilot-cli/issues/5050)）
- **上下文与模型能力**：大上下文窗口配置（Opus 4.6 1M）、BYOK 多模型混排
- **可观测性/审计**：权限决策溯源（v1.0.96 的 Timeline 标注正是响应）、消息时间戳、仅展示层 hook（[#5099](https://github.com/github/copilot-cli/issues/5099)）

---

## ⚠️ 开发者关注点（痛点总结）

1. **长会话可靠性**：OOM、事件超时、队列卡死等多个独立 bug 均指向长运行会话的脆弱性
2. **沙箱与构建工具链冲突**：JVM 系（Maven/Gradle）、Ramdisk、非 4KB 页内核（Asahi [#4977](https://github.com/github/copilot-cli/issues/4977)）均受影响
3. **启动性能**：MCP/插件同步加载阻塞输入（[#5090](https://github.com/github/copilot-cli/issues/5090)），大仓库用户诉求强烈
4. **凭据隔离**：沙箱 git 无法使用与 Copilot 登录身份不同的凭据（[#5102](https://github.com/github/copilot-cli/issues/5102)），企业多账号场景受阻
5. **桌面端回归**：Windows 1.1.27+ 自带 git 启动失败为阻塞性问题，升级需谨慎

---
*数据来源：github.com/github/copilot-cli | 统计窗口：2026-10-09 至 2026-10-10*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-10-10

## 📌 今日速览

今日无新版本发布，社区焦点集中在 V2 迁移遗留问题（MCP OAuth 凭据丢失、桌面端数据静默丢失）与 MCP/Gemini schema 兼容性两大主题。核心开发者 @kitlangton 密集提交了 Effect 4.0.1 升级、SDK 插件注册等多条重要 PR，Copilot 回退路由修复也在同日落地。

## 🚀 版本发布

过去 24 小时无新 Release。

## 🔥 社区热点 Issues（Top 10）

1. **[#51856](https://github.com/anomalyco/opencode/issues/51856)** — MCP Client 宣告支持 `elicitation.form` 能力却从不处理 `elicitation/create` 请求，导致工具调用挂起超时。协议声明与实现不匹配，影响所有依赖 elicitation 的 MCP server，10 条评论热度最高。

2. **[#47545](https://github.com/anomalyco/opencode/issues/47545)** — Auto 模式下权限通知反复误报：自动批准发生在客户端，而服务端已先行发出 `permission` 事件。与 #52486、#53525 共同构成 Auto 模式体验的一大痛点簇。

3. **[#53607](https://github.com/anomalyco/opencode/issues/53607)**（已关闭）— V2 升级后不导入 V1 的 `mcp-auth.json` OAuth 凭据，所有受保护远程 MCP server 掉入 `needs_auth` 且无任何提示。典型的 V2 迁移断崖问题。

4. **[#48073](https://github.com/anomalyco/opencode/issues/48073)**（已关闭）— Gemini 会预先校验所有 function 声明，一个含 nullable array schema 的 MCP 工具即可让所有请求 400。与 #34130、#54016、#54033 一起反映出 schema sanitizer 对 union types 的系统性不兼容。

5. **[#51020](https://github.com/anomalyco/opencode/issues/51020)** — V2 桌面端 sidecar 接管后 `message`/`part` 行从未写入 `opencode.db`，会话静默丢失。数据完整性级别的问题，仍开放中。

6. **[#54180](https://github.com/anomalyco/opencode/issues/54180)**（已复现）— 拒绝工具调用被记录为“服务端关机”，重启后被拒的 turn 竟会恢复执行。涉及权限语义与 `SessionExecution.terminal` 默认行为，值得关注。

7. **[#51466](https://github.com/anomalyco/opencode/issues/51466)**（已关闭）— 单响应多个 `reasoning_opaque` 触发警告，根因指向 Copilot 回退路由错误，由今日 PR #54210/#54208 修复。

8. **[#54016](https://github.com/anomalyco/opencode/issues/54016)** — MCP client 直接丢弃 JSON Schema union 类型参数（`type: ["string","null"]`），产生截断 JSON 与 `Unexpected EOF` 错误。与 Gemini 系列问题同源。

9. **[#54205](https://github.com/anomalyco/opencode/issues/54205)** — 后台服务对全局配置无限 TTL 缓存，`{env:VAR}` 凭据在新变量设置后仍解析为空，须重启服务。配置热更新机制缺失。

10. **[#54214](https://github.com/anomalyco/opencode/issues/54214)**（已复现）— `experimental.policies` 中 `"action": "permission"` 语句被配置校验器静默丢弃，与文档声明矛盾，导致无法表达硬拒绝策略。

## 🔧 重要 PR 进展（Top 10）

1. **[#54198](https://github.com/anomalyco/opencode/pull/54198)** — Effect 从 `4.0.0-rc.118` 升级到稳定版 `4.0.1`，含 client 类型 brand 保留与 shutdown 可重入修复。核心依赖去 RC 化，里程碑意义。

2. **[#54219](https://github.com/anomalyco/opencode/pull/54219)** — SDK：在 session 恢复前 seed host 插件，workerd 嵌入场景不再需要重复注册模型插件。

3. **[#54218](https://github.com/anomalyco/opencode/pull/54218)** — Shell 工具无法分析命令时给出可读解释（如命令替换场景），而非裸错误码，提升 agent 自纠错能力。

4. **[#54210](https://github.com/anomalyco/opencode/pull/54210)** — Copilot `/models` 失败时回退路由改为遵循 models.dev 的 package 声明，修复 Claude 被误路由到 `/chat/completions` 的问题（关联 #51466）。

5. **[#54208](https://github.com/anomalyco/opencode/pull/54208)**（已合并/关闭）— Copilot Gemini 回退改走 `/chat/completions`，实测 `/responses` 对当前 Gemini 模型返回 400。

6. **[#53852](https://github.com/anomalyco/opencode/pull/53852)** / **[#53853](https://github.com/anomalyco/opencode/pull/53853)**（已关闭）— 为 `.cppm` 等 C++ module 接口文件补充 Tree-sitter 语法高亮映射，关闭 #53743。

7. **[#53821](https://github.com/anomalyco/opencode/pull/53821)**（已关闭）— `WellKnown` 事件全局广播 + HTTP 超时上限，多项目 Location 场景配置刷新更可靠。

8. **[#53822](https://github.com/anomalyco/opencode/pull/53822)**（已关闭）— 会话保存的模型临时不在目录中时不再静默切换为默认模型，避免用户误用错误模型提交。

9. **[#52900](https://github.com/anomalyco/opencode/pull/52900)** — 修复 Windows Git Bash 下 `/exit` 后终端鼠标捕获未重置的问题，关闭两个长期 issue。

10. **[#49084](https://github.com/anomalyco/opencode/pull/49084)** — VS Code 扩展对齐 V2 CLI 约定并在 shim 中解析 symlink，与今日 #54018（symlink 项目目录不可见）议题呼应。

## 📈 功能需求趋势

- **V1→V2 迁移完整性**：OAuth 凭据、home logo slot、TUI composer API、terminal 切换按钮等 V1 能力在 V2 缺失，是需求最密集的方向（#53607、#51916、#51209、#54193）。
- **MCP 协议兼容性**：elicitation 处理、union type schema、OAuth 导入、配置缓存，MCP 相关 issue 贯穿全榜。
- **桌面端体验**：Windows 托盘图标与后台服务清理（#50633、#54217）、模型能力标注（#50257）、symlink 支持。
- **可观测性**：会话/消息持久化可靠性（#51020）、运行中 subagent 可见性（#53611）、长时进程注册（#53614）。
- **Auto 模式体验**：误报通知、提示音、tab 标记三个相关 issue 显示该模式打磨不足。

## ⚠️ 开发者关注点

1. **schema 兼容性是系统性短板**：Gemini 校验失败（#48073、#34130、#54033）与 MCP 参数丢弃（#54016）指向同一 sanitizer 逻辑，建议统一修复 union/nullable 类型处理。
2. **静默失败令人担忧**：消息不落库（#51020）、策略被静默丢弃（#54214）、凭据不导入无提示（#53607）——缺少显式告警的失败模式损害信任。
3. **权限/中断语义待理顺**：拒绝调用被记为关机后恢复（#54180）、被拒 skill 仍可 @mention 注入（#49891），权限模型存在绕过路径。
4. **Windows 平台摩擦多**：托盘缺失、CLI 无响应（#54213）、鼠标模式、防火墙重启（#54028），Windows 桌面端需专项投入。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-10-10

## 📌 今日速览

今日发布 **v0.25.1-preview.1** 预览版，修复远程 Hosts 替换时丢失绑定的问题。Managed Agent 架构（#12380）持续推进：Stage H4b 子会话运行时暴露多个恢复性问题，H6 自动化运行时与子会话 Workspace 隔离均有新 PR 落地。此外，XML 工具调用恢复、上下文压缩准确性与 Web Shell 会话恢复成为社区讨论焦点。

---

## 🚀 版本发布

**v0.25.1-preview.1**（另有 v0.25.0-nightly.20261009 同步发布）

- **fix(agents)**: 替换选定远程 Hosts 时不再丢失绑定（PR #13430，@yiliang114）
- **test(core)**: 补充 #12693 合并后测试

---

## 🔥 社区热点 Issues

1. **[#12380](https://github.com/QwenLM/qwen-code/issues/12380)** — Managed Agent 双路径架构与分阶段交付提案（51 评论）。整个项目最活跃的纲领性 Issue，定义了 Session 持久所有权、Workspace 绑定、可恢复工具执行与稳定 WebSocket 契约，是本周几乎所有 managed-agent PR 的源头。

2. **[#13395](https://github.com/QwenLM/qwen-code/issues/13395)** — Kubernetes 工具运行时进度追踪（19 评论）。Draft PR #13526 已交付私有有限 CSI Read/Write/Edit，正在推进跨平台交付门禁，是平台化分发路线的关键节点。

3. **[#6710](https://github.com/QwenLM/qwen-code/issues/6710)** — P1 Bug：ACP 恢复后无法区分用户取消与意外中断（15 评论）。10-07 在最新 main 上验证仍可复现，长期未解的稳定性问题。

4. **[#12867](https://github.com/QwenLM/qwen-code/issues/12867)** — Managed Agent Stage D 后续：持久生命周期、Turns、Actions 与 AgentDefinition（19 评论，已关闭，代表 Stage D 主体完成）。

5. **[#13492](https://github.com/QwenLM/qwen-code/issues/13492)** — XML 工具调用恢复丢弃含引号工具标记的外层调用（8 评论）。PR #13515 已合并，外层调用恢复待 #13579，正在分阶段修复。

6. **[#12333](https://github.com/QwenLM/qwen-code/issues/12333)** — Token 优化缺少召回率/任务成功率门禁（8 评论）。社区提出核心质疑：只测“省了多少”，不测“损失了什么”，阻塞了最大 Token 节省项的开启。

7. **[#2596](https://github.com/QwenLM/qwen-code/issues/2596)** — CLI 持续在末尾添加 `</think>` 的老 bug（9 评论），最新验证显示原路径已无法复现，接近关闭。

8. **[#13785](https://github.com/QwenLM/qwen-code/issues/13785)** — Multi-Agent API 提案：在公共契约上增加 agent 身份维度，使多智能体执行可归因、树形化、可中断。新提出的方向性需求，值得关注。

9. **[#13782](https://github.com/QwenLM/qwen-code/issues/13782)** — Web Shell 从磁盘恢复会话后 Branch 按钮消失（load replay 遗漏 branchRecordId）。直接影响用户可感知的会话恢复体验。

10. **[#13432](https://github.com/QwenLM/qwen-code/issues/13432)** — 压缩 Bug：服务端上报的真实上下文上限被解析后丢弃，反应式恢复仍按推断窗口估算，可能导致被拒请求重发完整历史。

---

## 🔧 重要 PR 进展

1. **[#13788](https://github.com/QwenLM/qwen-code/pull/13788)** — 反应式压缩改用服务端上报的上下文上限，直接修复 #13432。
2. **[#13598](https://github.com/QwenLM/qwen-code/pull/13598)** — Managed Agent H6b/H6c 自动化运行时，支持持久化定义的创建/修订/读取/退役全生命周期。
3. **[#13781](https://github.com/QwenLM/qwen-code/pull/13781)** — 子会话 Workspace 能力：子 Workspace 采用父级 Git linked worktree，是子智能体隔离的第一块基石。
4. **[#13779](https://github.com/QwenLM/qwen-code/pull/13779)** — 按名称分类子 Session 运行类型（已关闭），H4c 后续重构。
5. **[#13568](https://github.com/QwenLM/qwen-code/pull/13568)** — LSP 文件查询按扩展名/语言/工作区位置路由到适用的就绪 server。
6. **[#12585](https://github.com/QwenLM/qwen-code/pull/12585)** — 持久化 ACP 内嵌文本资源并在回放中作为用户块呈现，改善离线转录投影。
7. **[#13554](https://github.com/QwenLM/qwen-code/pull/13554)** — 流式捕获工具输出的回收收集，将 Shell 输出纳入 Session 级保留生命周期。
8. **[#13729](https://github.com/QwenLM/qwen-code/pull/13729)** — resume 时保留仍被文件快照持有的 prompt 身份，修复会话回退后的编号错位（R53-2）。
9. **[#13606](https://github.com/QwenLM/qwen-code/pull/13606)** — 托管运行时支持有界图片与 PDF 交付，按能力快照分别处理。
10. **[#13219](https://github.com/QwenLM/qwen-code/pull/13219)** — 为 managed-agent 全栈异步重试循环添加预算与终止状态，消除永久卡死的投影。

---

## 📈 功能需求趋势

- **Managed Agent / 多智能体架构**：绝对主线。#12380 的 Stage D–H 全面铺开，H4b 子会话运行时、H6 自动化运行时、K8s 运行时（#13395）并行推进；新提案 #13785 要求多智能体能力进入公共 API 契约。
- **会话管理与可恢复性**：Session 持久化、检查点、writer fencing、恢复后行为一致性（#6710、#13782、#13708、#13709）是 bug 与需求的高发区。
- **上下文/Token 性能**：基于上下文压力的动态工具输出截断（#2566）、压缩准确性（#13432）、Token 优化的质量门禁（#12333）持续活跃。
- **Web Shell 与 UI 体验**：限流后“可用时继续”按钮（#13784 已关闭）、artifact 卡片命名（#13667）、OpenTUI 短终端对话框溢出（#13758）。
- **记忆系统**：#13721 提出记忆提取前的语义去重检查，新出现的方向。

---

## ⚠️ 开发者关注点

- **可靠性优先于功能**：大量 issue 聚焦“恢复后行为不正确”——取消归属、分支消失、后台进程不可恢复、重试循环无终止状态。托管架构落地后的状态一致性是当前最大痛点。
- **质量门禁缺失**：Token 节省类改动缺乏工具召回率/任务成功率的评测基准（#12333），社区明确要求“先建尺子再开开关”。
- **流式解析性能与正确性**：XML 工具调用恢复存在丢调用（#13492、#10700）、泄漏闭合标签（#2596）、大响应重复前缀扫描导致变慢（#13787）等一系列问题，是长期顽疾。
- **CI/发布工程**：main CI 失败追踪（#12714）、nightly Docker 磁盘回收（#13481）、Hosted verify 超时上调（#13472）显示发布管道压力持续存在。

*数据来源：GitHub QwenLM/qwen-code，统计窗口为过去 24 小时。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*