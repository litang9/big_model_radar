# AI CLI 工具社区动态日报 2026-11-18

> 生成时间: 2026-11-18 02:24 UTC | 覆盖工具: 7 个

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

# AI CLI 工具社区动态横向对比分析报告
**日期：2026-11-18**

---

## 一、生态全景

AI CLI 工具已进入**多端融合与规模化生产采用**阶段：头部产品（Claude Code、Codex、Copilot CLI）均在从纯终端工具演化为“CLI + 桌面端 + Web/Cloud + 移动端”的全端矩阵，跨端会话一致性成为普遍痛点。同时，**多智能体/Subagent 编排**已在各家成为主线功能（Codex subagent 侧边栏、Gemini subagent Sprint、Qwen Managed Agent、Copilot Fusion），其可靠性与可观测性问题也随之集中爆发。安全与权限模型从“工具层审批”向“文件操作层/沙箱层下沉”的架构重构呼声渐强。此外，**token 成本与缓存效率**（GPT-6.2 instructions 缓存 0 命中、Qwen auto-memory 单次 28k-36k token）正取代功能丰富度，成为付费用户最直接的关注点。

---

## 二、各工具活跃度对比

| 工具 | 热点 Issues | 重要 PR | Release | 今日焦点 |
|---|---|---|---|---|
| **Claude Code** | 10+（含 #27302 长青榜首 👍481/💬312） | 0 | v2.1.327 | 安全加固（MCP stdin 凭据保护）；Auto 模式+hook 回归簇；Bash 旁路权限绕过 |
| **OpenAI Codex** | 10（#49383 💬59 最热） | 10+（密集合入） | v0.169.1 稳定版 + 3 个 alpha（单日 4 发） | Windows Computer Use 截图死锁；Cloud 断连恢复；音频转写铺垫 |
| **Gemini CLI** | 10+（含 4 个 P1） | 10+（多数已合） | 无 | Subagent 假成功/挂起；安全加固 PR 密集；AST 工具链 EPIC |
| **Copilot CLI** | 10+（3 OPEN 高危） | 0 | v1.0.113 / .113-1 / .114-0（单日 3 发） | SDK 改名 `@github→@microsoft` 断裂；企业管控（browserUse 开关） |
| **Qwen Code** | 10+（#14724 💬431 长期热帖） | 10+ | v0.28.0 正式 + v0.28.1-preview + Desktop + SDK | Managed Agent/钉钉适配；Java SDK 8+ 缺陷集中爆发 |
| **OpenCode** | 10 | 10+ | v2.3.1 + v2.3.2（当天问题当天发版） | GPT-6.2 缓存计费修复；CJK 渲染；Code Mode 扩展 |
| **Kimi Code CLI** | 0 | 0 | 无 | 过去 24 小时无活动 |

**观察**：Codex 与 Qwen 呈“高版本节奏 + 高 PR 密度”的快速迭代形态；Claude Code、Copilot CLI 为闭源 issue 驱动，PR 板块天然为零；OpenCode 展现最强响应速度（#64550 缓存问题当天发版修复）；Kimi CLI 活跃度显著落后第一梯队。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **① 多智能体/Subagent 可靠性** | Gemini（#22323 假成功、#21409 挂起）、Codex（subagent 侧边栏 PR 系）、OpenCode（#64558 完成通知丢失）、Qwen（Team mode 消息丢失 #15738）、Copilot（子代理缓存失效 #4829） | 执行结果可信、状态可视化、通知不丢——subagent“能跑”之后“可信”是下一关 |
| **② 权限模型与安全加固** | Claude Code（Bash 旁路绕过 hook/diff 审查 #89251/#85511）、Gemini（未展开变量防绕过 PR #30338、破坏性命令防护）、OpenCode（browser 工具绕过 deny #54044）、Copilot（企业 sandbox 策略、Cortex XDR 冲突） | 权限检查需下沉至文件操作层而非工具层，是全行业性架构诉求 |
| **③ Token 成本与缓存效率** | OpenCode（GPT-6.2 instructions 缓存 0 命中）、Codex（#62109 同源问题 + #56174 配额异常消耗）、Copilot（#4829 子代理复利消耗）、Qwen（#13851 auto-memory 28k-36k token） | 缓存失效 + 长任务循环调用导致账单失控，四家同时出现 |
| **④ 跨端会话一致性** | Codex（Cloud/桌面/Web/iOS 同步，3 条 issue + 2 个修复 PR）、Claude Code（VS Code 会话 ID、目录改名历史丢失）、OpenCode（V1→V2 升级会话丢失 #64494） | 会话作为“项目长期记忆”的持久化与迁移 |
| **⑤ Windows/平台成熟度** | Claude Code（IME、路径转义 5 次复发）、Codex（WGC/D3D 死锁、沙箱注册）、Gemini（PowerShell UI 冻结）、OpenCode（渲染器崩溃）、Copilot（无盘符卷、EDR 冲突） | Windows 是所有工具的共同短板 |
| **⑥ 企业治理与合规** | Claude Code（多 Connector 账户、gateway 计费分组）、Copilot（browserUse 托管设置、Co-authored-by 合规）、Qwen（钉钉/IM 集成） | 多账户、策略管控、commit 归属规范是规模化采用前提 |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 权限审批/hook 生态、企业安全、项目记忆载体 | 专业开发者、企业团队（付费意愿最强） | 闭源 issue 驱动，beta 功能高频（auto 模式、Design canvas），功能激进但回归增多 |
| **OpenAI Codex** | 全端矩阵（桌面/Cloud/iOS）、Computer Use、TUI 打磨 | ChatGPT Pro/Plus 订阅用户 | Rust 内核，稳定版 + 双 alpha 分支并行，开源 PR 活跃，subagent 可视化领先 |
| **Gemini CLI** | Subagent 工作流、AST 感知工具链、OS 沙箱 | 开发者 + Google 生态用户 | 开源、P1/P2 分级管理规范，社区提案权重高（架构方向常由 issue 驱动） |
| **Copilot CLI** | 企业管控、Fusion/HydraFusion 多模型路由、GitHub 原生集成 | 企业 GitHub 用户、IT 管理员 | 多模型编排路线独特；但 SDK 改名断裂暴露沟通流程短板 |
| **Qwen Code** | Managed Agent 托管智能体、IM 集成（钉钉/Webhook）、国际化（RTL/繁中） | 中文/亚太企业市场、IM 驱动工作流 | 开源 + 统一 Agent Loop 架构收敛期，功能广度大但 Java SDK 成熟度不足 |
| **OpenCode** | Provider 无关性、Code Mode（Bun 运行时）、成本透明 | 多模型/自托管用户、成本敏感的付费用户 | 开源、社区响应极快，主打“第三方客户端 + 模型目录动态化” |

---

## 五、社区热度与成熟度

- **热度第一梯队**：Claude Code（单 issue 👍481/💬312 的企业级关注度）、Qwen Code（#14724 💬431 的长周期讨论）、Codex（单 issue 💬59 + 单日 10+ PR 合入）。
- **快速迭代阶段**：Codex（单日 4 个 release）、Copilot CLI（单日 3 个 release）、Qwen（CLI+Desktop+SDK 同步发版）、OpenCode（问题当天闭环）。这四家处于明显的高速演进期。
- **成熟稳定期**：Claude Code 版本号节奏平稳（v2.1.x 小步迭代），重心在安全与企业功能，但**新功能回归频率上升**（Design canvas 上线次日出 bug、auto 模式回归）提示其需放缓 beta 节奏。
- **追赶者**：Gemini CLI 活跃度中等但工程流程规范（P 级标记、ready-for-agent 状态机），社区提案质量高；Kimi Code CLI 当前数据面基本沉寂，与第一梯队差距拉大。

---

## 六、值得关注的趋势信号

1. **“假成功”是 Subagent 时代的核心信任危机**。Gemini #22323（MAX_TURNS 后仍报 success）、OpenCode #64558（完成通知静默丢失）共同指向：agent 自我报告不可信，**可验证的完成状态与留痕**（如 OpenCode #64419 第三方确定性校验提案）将成为下一个基础设施级需求。

2. **权限模型正从工具层向文件/沙箱层下沉**。Claude Code 的 Bash 旁路绕过（用 python/sed 绕过 Write/Edit 审查）与 Gemini 的零依赖 OS 沙箱提案（#19873）说明：当模型具备任意 shell 能力时，**应用层审批形同虚设**，OS 级沙箱 + 执行后审计是唯一可靠路线。

3. **Prompt caching 是隐藏的成本黑洞**。GPT-6.2 顶层 instructions 有意不缓存，同时命中 Codex（#62109）、OpenCode（#64550）、疑似 Codex #56174 配额异常——**模型厂商的计费细节与客户端实现强耦合**，选型时应要求工具方公开缓存策略说明，并对长循环任务做 token 消耗监控。

4. **企业管控能力正成为采购分水岭**。Copilot 的 `features.browserUse` 托管设置、Claude Code 的多 Connector 账户与 MCP 凭据保护、Qwen 的 IM 通道集成——企业级功能的一周进展，比个人体验功能更能预示下一阶段竞争格局。

5. **对开发者的实操建议**：
   - **锁版本**：Claude Code beta 特性（auto 模式/canvas）、Codex 26.1023+（@Browser 全平台失效）均有回归，生产环境避免追新；
   - **Windows 团队谨慎评估** Codex Computer Use 与 Claude Code（IME/路径问题五次复发）；
   - **Java 集成方暂缓** Qwen SDK；
   - **重度 GPT-6.2 用户**优先升级 OpenCode v2.3.2 或验证 Codex 缓存命中情况；
   - 安全敏感团队在 OpenCode 修复 #54044 前避免同时授予 `execute` 与 browser deny 组合。

---
*本报告基于 2026-11-18 各项目 GitHub 公开数据整理，供技术选型与版本管理决策参考。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-11-18，来源：github.com/anthropics/skills）

---

## 一、热门 Skills 排行（PR）

| # | PR | Skill | 功能 | 状态 |
|---|----|----|----|----|
| 1 | [#1742](https://github.com/anthropics/skills/pull/1742) | **mcp-builder** | 适配 mcp>=2.0 的 `streamable_http_client` 导入变更与自定义 HTTP 头配置，修复上游 SDK 破坏性升级 | OPEN |
| 2 | [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator** | 隔离触发评估的 worker 探针，修复 Windows `select()` 失败与误报负样本问题 | OPEN |
| 3 | [#1245](https://github.com/anthropics/skills/pull/1245) | **notion-spec-to-implementation + quantitative-resume-auditor** | 将产品/技术 Spec 转为 Notion 可执行任务；量化简历审查 | OPEN |
| 4 | [#1980](https://github.com/anthropics/skills/pull/1980) | **webapp-testing** | 移除 `shell=True`，修复命令注入风险（CWE-78） | OPEN |
| 5 | [#1792](https://github.com/anthropics/skills/pull/1792) | **docx** | LibreOffice 超时正确报错，并校验修订标记真正清除 | OPEN |
| 6 | [#525](https://github.com/anthropics/skills/pull/525) | **pyxel** | Pyxel 复古游戏开发：实现引导、无头输入驱动运行、帧检查（存活 8 个月+，社区持续关注） | OPEN |
| 7 | [#1681](https://github.com/anthropics/skills/pull/1681) / [#1997](https://github.com/anthropics/skills/pull/1997) | **skill-creator** | 修复 `package_skill.py` 独立执行；修复 YAML frontmatter 解析丢失引号 | OPEN |
| 8 | [#1703](https://github.com/anthropics/skills/pull/1703) | **md2video-audio** | Markdown → Marp 幻灯片 → 带真人配音的 MP4 视频，零成本 | OPEN |

**讨论热点**：修复类 PR 明显多于新功能 PR，集中在 **skill-creator 工具链可靠性**、**MCP 兼容性**、**安全加固** 三大主题。

---

## 二、社区需求趋势（Issues 提炼）

1. **信任与安全机制**（最热，46 评论）— [#492](https://github.com/anthropics/skills/issues/492)：社区 Skill 冒用 `anthropic/` 命名空间，用户呼吁官方/社区 Skill 信任边界隔离。
2. **组织级协作**— [#228](https://github.com/anthropics/skills/issues/228)：组织内 Skill 共享库、直接分享链接，替代 Slack 手传 `.skill` 文件。
3. **Skill 触发评估可靠性**— [#556](https://github.com/anthropics/skills/issues/556)（触发率恒为 0）、[#1352](https://github.com/anthropics/skills/issues/1352)（并行 worker 串扰导致假阴性）：skill-creator 的评测工具是最大痛点。
4. **上下文效率**— [#1487](https://github.com/anthropics/skills/issues/1487)：`claude-api` 单次注入 ~156k token 撑爆上下文，呼吁渐进式加载；[#1329](https://github.com/anthropics/skills/issues/1329) 提议 compact-memory 符号化压缩 agent 状态。
5. **AI 输出质量治理**— [#1385](https://github.com/anthropics/skills/issues/1385)：三阶段推理质量门禁流水线（校准→对抗审查→交付验证）。
6. **文档/办公 Skill 深度修复**— docx/xlsx/pptx 系列问题（[#2018](https://github.com/anthropics/skills/issues/2018)、[#1868](https://github.com/anthropics/skills/issues/1868) 等）持续产出。

---

## 三、高潜力待合并 Skills

- **[#1245](https://github.com/anthropics/skills/pull/1245)** Notion Spec→任务转换：多次更新至 10 月，跨工具工作流自动化方向契合社区需求。
- **[#525](https://github.com/anthropics/skills/pull/525)** Pyxel 复古游戏：作者为框架官方维护者，3 月提交持续跟进至 11 月。
- **[#1742](https://github.com/anthropics/skills/pull/1742)** mcp-builder 适配 mcp>=2：修复被引用的 Issue #1668，属阻塞型兼容修复，合并优先级高。
- **[#1792](https://github.com/anthropics/skills/pull/1792)** / **[#1980](https://github.com/anthropics/skills/pull/1980)**：安全与正确性修复（docx 超时校验、命令注入），风险低、易落地。
- **gerardrecinto 批量小修复系列**（[#1975](https://github.com/anthropics/skills/pull/1975)、[#1976](https://github.com/anthropics/skills/pull/1976)、[#1977](https://github.com/anthropics/skills/pull/1977)）：均有对应 Issue，10 月活跃，合并概率大。

---

## 四、生态洞察（一句话）

**社区最集中的诉求是“可信与可靠”**——既要解决官方/社区 Skill 的命名空间信任边界与安全注入问题，也要修复 skill-creator 评测工具、上下文膨胀和文档 Skill 脚本层的可靠性缺陷，让 Skills 从“能用”走向“敢用、可评测”。

---

# Claude Code 社区动态日报
**日期：2026-11-18 | 数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)**

---

## 一、今日速览

Claude Code 发布 **v2.1.327**，重点强化安全细节：GitHub App 安装增加仓库变更确认，`claude mcp add-json` 支持从 stdin 读取配置以避免 token 泄露到命令行。社区方面，**Auto 模式与 PreToolUse hook 的冲突**成为焦点——多个 Issue 报告 hook 使用 `updatedInput` 改写工具调用后遭分类器拒绝（2.1.326+ 回归）。此外，权限绕过类安全问题（Bash 工具规避 diff 审查/hook 管控）持续发酵。

---

## 二、版本发布

### v2.1.327（过去24小时）
- `/install-github-app` 修改仓库前新增**确认步骤**
- 新增 `claude mcp add-json <name> -`：从 stdin 读取 MCP server JSON，**token 不再暴露在命令行**（会话内不可用）
- 恢复会话时对较早上下文增加了提示行

**点评**：本版偏重安全加固与可审计性，MCP 凭据保护对企业用户尤其实用。

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 关注度 | 为什么重要 |
|---|-------|--------|-----------|
| 1 | [#27302](https://github.com/anthropics/claude-code/issues/27302) 多 Connector 账户支持 | 👍481 / 💬312 | **长青榜首**。同一 connector 多账户切换是团队用户最迫切需求，481 赞说明企业多租户场景痛点巨大 |
| 2 | [#89251](https://github.com/anthropics/claude-code/issues/89251) 权限模式系统提示引导绕过 PreToolUse hook | 💬9 | **高危安全设计缺陷**：bypass 模式的系统提示让模型用 Bash 读写文件，绕过 Write/Edit 的 hook 与 diff 审查，属于权限模型的根本性矛盾 |
| 3 | [#85511](https://github.com/anthropics/claude-code/issues/85511) Bash（python/sed）编辑文件绕过逐条 diff 审查 | 💬3 | 与上条同源，共同指向“**Bash 旁路**”这一权限体系最大漏洞方向 |
| 4 | [#110847](https://github.com/anthropics/claude-code/issues/110847) Auto 模式拒绝被 hook `updatedInput` 改写的 Agent 调用（2.1.326+ 回归） | 新报 | 与 [#109300](https://github.com/anthropics/claude-code/issues/109300) 构成同一回归簇：hook 改写导致整批工具调用作废，直接影响 auto 模式可用性 |
| 5 | [#36105](https://github.com/anthropics/claude-code/issues/36105) 用 `Assisted-by` 替代 `Co-authored-by` commit trailer | 👍57 / 💬13 | 涉及 AI 生成代码归属规范，社区对 commit 元数据语义讨论热烈 |
| 6 | [#89690](https://github.com/anthropics/claude-code/issues/89690) modelPicker 中 `opusplan` 行被跳过 | 💬21 | 自定义模型列表与内置 lineup 的去重逻辑缺陷，影响重度自定义用户 |
| 7 | [#110586](https://github.com/anthropics/claude-code/issues/110586) Design canvas 全屏播放失效 | 👍19 / 💬6 | 昨日新功能即出回归，影响设计原型工作流 |
| 8 | [#110849](https://github.com/anthropics/claude-code/issues/110849) 含 heredoc 的 Bash 命令 stdin 悬挂直至超时 | 新报 | 精彩的底层诊断：stdin 从 `/dev/null` 变为未关闭的 Unix socket，任何读 stdin 的命令会卡满超时 |
| 9 | [#96996](https://github.com/anthropics/claude-code/issues/96996) 插件 npx MCP server 被替换导致会话丢失 ~/Documents TCC 访问 | 💬2 | macOS 沙箱 + 插件热更新交织的疑难问题，影响长会话稳定性 |
| 10 | [#86713](https://github.com/anthropics/claude-code/issues/86713) 项目目录改名后会话历史“消失” | 💬4 | 会话发现仅按旧路径索引，与功能请求 [#96018](https://github.com/anthropics/claude-code/issues/96018)（`claude project mv`）呼应，目录迁移是高频痛点 |

---

## 四、重要 PR 进展

过去 24 小时内**无更新的 Pull Request**（0 条）。Claude Code 主仓库以 issue 驱动为主、代码闭源，此结果属正常波动，今日动态以 release 与 issue 为主。

---

## 五、功能需求趋势

从今日活跃 Issues 中可提炼出四大方向：

1. **权限与安全模型重构**（最强烈）：Bash 旁路绕过 diff 审查、hook 改写与 auto 模式分类器冲突，社区呼吁权限检查下沉到文件操作层而非工具层。
2. **多账户 / 企业治理**：多 Connector 账户（#27302）、gateway 会话级计费分组（[#101780](https://github.com/anthropics/claude-code/issues/101780)）——企业采用的关键阻塞点。
3. **项目管理生命周期**：`claude project mv`、目录改名后的会话迁移，反映用户将 Claude Code 视为长期项目记忆载体的诉求。
4. **桌面端体验对齐**：Android 模拟器面板（[#102400](https://github.com/anthropics/claude-code/issues/102400)）、Remote Control 主题渲染（#110848）、VS Code 会话 ID 恢复等 CLI/桌面/扩展的功能对齐。

---

## 六、开发者关注点

- **Hook 生态可靠性**：PreToolUse `updatedInput` 改写在 auto 模式下被拒（#110847、#109300）+ PreCompact 输出无大小限制（#101057），hook 高级用法普遍踩坑。
- **Windows 体验欠账**：中文 IME 间歇失灵（#105839）、`file://` 路径反斜杠转义第五次复发（#109910，前四次被 stale bot 关闭未修）——Windows 用户流失风险值得官方重视。
- **平台边缘场景脆弱**：Chrome 扩展在 Dia 浏览器中失败（#107630）、OSC 7501 探测时序竞态（#105534）。
- **新功能回归频率上升**：Design canvas（上线次日出 bug）、auto 模式（2.1.326+ 回归）、Cowork 云会话缺 effort 控制（#110846），建议对 beta 特性保持版本锁定。

---
*明日关注：#89251 权限绕过问题是否有官方回应；auto 模式 hook 回归簇是否在 v2.1.328 修复。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-11-18

## 1. 今日速览

Codex CLI 端今天发布了 **v0.169.1 稳定版**及三个 alpha 版本（0.170.0-alpha.4.2、0.171.0-alpha.11/12），迭代节奏明显加快。社区方面，**Windows Computer Use 截图超时**相关 Bug（WGC/D3D 锁问题）持续发酵，多个 Issue 高热度讨论中；开发侧则有一批高质量 PR 合入，重点集中在 **TUI 体验优化、Cloud 会话稳定性与 Windows 沙箱修复**。

---

## 2. 版本发布

| 版本 | 说明 |
|---|---|
| [rust-v0.169.1](https://github.com/openai/codex/releases/tag/rust-v0.169.1) | 最新稳定版，从 0.169.0 增量更新 |
| [rust-v0.170.0-alpha.4.2](https://github.com/openai/codex/releases/tag/rust-v0.170.0-alpha.4.2) | Alpha 预发布 |
| [rust-v0.171.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.11) / [alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.12) | 同日连发两个 alpha，0.171 分支活跃开发中 |

---

## 3. 社区热点 Issues（Top 10）

1. **[#49383](https://github.com/openai/codex/issues/49383) Windows Computer Use 截图失败（FrameArrived 超时 + E_INVALIDARG）** — 59 条评论，本周最热。Computer Use 在 Windows 上无法可靠捕获窗口，长期未解，且新增多个重复报告（#59303、#60666、#61157），显示这是当前最严重的平台性缺陷。
2. **[#31925](https://github.com/openai/codex/issues/31925) 恢复 macOS Option+Space 快捷键唤起 Quick Chat** — 54 👍、28 评论。ChatGPT/Codex 桌面端合并后，深受用户喜爱的快捷键被移除，Pro 用户强烈要求恢复。
3. **[#20957](https://github.com/openai/codex/issues/20957) Codex Desktop 增加类似 ChatGPT 的 Read Aloud 朗读功能** — 22 👍。无障碍/可用性高优先诉求，ChatGPT 已全面支持，Codex 桌面端缺席。
4. **[#60799](https://github.com/openai/codex/issues/60799) iOS Remote 冷启动后项目/任务列表为空** — 12 评论、9 👍。疑似冷启动初始化遗漏 `experimentalApi`，退出重登可恢复但严重影响移动端体验。
5. **[#59303](https://github.com/openai/codex/issues/59303) Windows 10 WGC 截图超时：回调持 D3D 锁** — 10 评论。用户已提交独立探针演示可行的回调返回模式，社区诊断深度高，对官方修复有直接参考价值。
6. **[#42664](https://github.com/openai/codex/issues/42664) macOS 重装后底部工具栏与集成终端不可见** — 8 评论。影响核心 UI 可用性且重装无法解决。
7. **[#50238](https://github.com/openai/codex/issues/50238) 模型容量错误时排队而非中断长任务** — 功能请求。请求持久化、可取消的容量队列，避免长时间工作被模型限流打断，反映重度用户的稳定性痛点。
8. **[#59297](https://github.com/openai/codex/issues/59297) Cloud 会话在 Chrome 可见但桌面侧边栏缺失** — 与 #58424 相互印证，跨端（桌面/云/Web）会话同步一致性是普遍问题。
9. **[#56174](https://github.com/openai/codex/issues/56174) Pro $100 配额 20 小时耗尽，token 消耗异常** — 涉及计费透明度，结合 [#62109](https://github.com/openai/codex/issues/62109)（gpt-6.2-sol 顶层 instructions 缓存命中为 0），指向**缓存机制可能失效导致成本飙升**，值得官方排查。
10. **[#62143](https://github.com/openai/codex/issues/62143) CLI @Chrome/@Browser 自 26.1023 起全平台失效** — 今日新报，bundled plugin 升级后 worker 无法获取 browser access host，浏览器自动化工作流受阻。

---

## 4. 重要 PR 进展（Top 10）

1. **[#62142](https://github.com/openai/codex/pull/62142) 后端客户端增加音频转写** — 新增 `Client::transcribe_audio`，支持 WAV/MP3/M4A/WebM/Ogg 上传至 `/transcribe` 端点，为语音输入铺路。
2. **[#62141](https://github.com/openai/codex/pull/62141) 修复 Windows 沙箱 Core 注册缺失/过期** — 缓存凭证导致跳过注册的漏洞修复，直接改善 Windows 沙箱可靠性。
3. **[#62151](https://github.com/openai/codex/pull/62151) + [#62140](https://github.com/openai/codex/pull/62140) Cloud 回复流断连恢复机制** — 限制无限重连循环、断连期间补齐历史，修复 Cloud 会话丢轮次问题（对应 #59297/#58424 类痛点）。
4. **[#62149](https://github.com/openai/codex/pull/62149) / [#62157](https://github.com/openai/codex/pull/62157) / [#62159](https://github.com/openai/codex/pull/62159) TUI 侧边栏展示并打开 Subagent 会话** — 子代理状态可视化系列改进，多智能体工作流体验大幅提升。
5. **[#62144](https://github.com/openai/codex/pull/62144) 线程恢复时保持 web search provider 一致性** — 避免混用 MCP 与原生搜索的 provider 引用导致后续调用失败。
6. **[#62139](https://github.com/openai/codex/pull/62139) 升级 crossterm 修复滚动误输入** — Unix 下滚动事件被误读为按键、向输入框插入杂字符的问题修复。
7. **[#62146](https://github.com/openai/codex/pull/62146) TUI 鼠标滚轮批量处理** — 合并滚轮事件到下一帧渲染，消除逐 tick 同步重绘的性能损耗。
8. **[#62163](https://github.com/openai/codex/pull/62163) app-server socket relay 移入 CLI 主 crate** — 移除独立 `codex-stdio-to-uds` crate，架构精简。
9. **[#62145](https://github.com/openai/codex/issues) account/updated 通知中显式标记 workspace 路由就绪状态** — 解决客户端无法区分登录/登出与路由就绪通知的歧义。
10. **[#62135](https://github.com/openai/codex/pull/62135) / [#62136](https://github.com/openai/codex/pull/62136) Guardian 实时证据检索与订阅收件箱** — Guardian v3 审查器可获取审查开始后到达的证据，内部审查框架持续演进。

---

## 5. 功能需求趋势

- **桌面端体验补齐**：Read Aloud 朗读（#20957）、Quick Chat 快捷键（#31925）、原生权限审批通知（#29008）——用户期望 Codex Desktop 达到 ChatGPT 同等的功能完整度。
- **多智能体协作**：subagent 服务层级自定义（#42665）、只读第二意见 Advisor（#36837）、跨电脑论坛式共享线程（#56801）。
- **跨端会话一致性**：桌面/Web/Cloud/iOS 之间的会话与项目同步是高频抱怨区。
- **稳定性与成本控制**：容量排队（#50238）、配额消耗异常（#56174）、缓存命中率（#62109）。
- **Windows 平台成熟度**：Computer Use 截图、沙箱注册、IDE 代理注入等系统性问题集中。

---

## 6. 开发者关注点

1. **Windows Computer Use 是最大痛点**：至少 4 个活跃 Issue（#49383、#59303、#60666、#61157）指向同一 WGC/D3D 锁死锁模式，社区已给出可复现探针，期待官方在近期版本修复。
2. **Cloud 会话可靠性**：断连丢轮次、侧边栏不显示 Cloud 会话的问题已有对应 PR 合入（#62140/#62151），下个版本值得验证。
3. **成本透明度疑虑**：gpt-6.2-sol 顶层 instructions 缓存 0 命中 + Pro 配额异常快速消耗，可能存在关联，建议官方公开说明缓存策略。
4. **浏览器自动化回归**：CLI @Chrome/@Browser 因 26.1023 插件变更全平台失效（#62143），使用浏览器工作流的团队需暂时规避升级。
5. **版本节奏健康**：稳定版与双 alpha 分支并行，TUI/Cloud/沙箱三条线 PR 密集合入，工程迭代活跃。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-11-18** | 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 一、今日速览

今日无新版本发布，社区活动集中在 **Subagent/Agent 工作流的稳定性与安全加固**上。Issues 板块多条 P1 级 bug 更新（subagent 假成功、agent 挂起、bugreport 缺上下文），PR 板块则涌现多个安全与体验修复（SSH 环境变量破坏、MCP 环境变量解析、Windows UI 冻结）以及大批依赖更新。

---

## 二、版本发布

过去 24 小时无新 Release。

---

## 三、社区热点 Issues

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) · P1 · 13 评论 | **Subagent 达到 MAX_TURNS 后仍报告 "success"**，中断被伪装成 GOAL 完成，直接误导主 agent 决策。可观测性核心缺陷，讨论最热烈。 |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) · P1 · 8 评论 / 8 👍 | **通用 agent 无限挂起**，连建文件夹这种简单操作也卡死，用户需等 1 小时手动取消。社区同感度最高（👍 最多）。 |
| 3 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) · P2 · 9 评论 | 提出利用 Gemini 3 原生 bash 能力，结合**零依赖 OS 沙箱 + 执行后意图路由**，是架构层面的重要方向性提案。 |
| 4 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) · EPIC · 7 评论 | **AST 感知的文件读取/搜索/代码库映射**调研，目标是用一次调用精确读取方法边界、降低 token 噪音，衍生出 #22746、#22747 两个子任务。 |
| 5 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) · P2 · 7 评论 | **Gemini 几乎不主动使用自定义 skills 和 subagents**，仅在明确指令时才用，反映了调度/路由策略的短板。 |
| 6 | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) · P2 · 5 评论 | Browser Agent **完全忽略 settings.json 覆盖**（如 maxTurns），配置虽被读取合并但未生效。 |
| 7 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) · P1 | Browser subagent 在 **Wayland 下失败**，Linux 桌面用户被阻断。 |
| 8 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) · P2 | **超过 128 个工具时触发 400 错误**，需更智能的工具范围裁剪。对重度 MCP/扩展用户影响大。 |
| 9 | [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) · P2 | 安全议题：agent 应**阻止/劝阻破坏性操作**（如滥用 `git reset --force`、直接改 DB）。 |
| 10 | [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) · P1 | get-shit-done **输出 hook 导致 CLI 崩溃**，稳定性问题。 |

**其他值得一看：** [#21763](https://github.com/google-gemini/gemini-cli/issues/21763)（`/bug` 报告缺少 subagent 上下文）、[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)（模型到处乱写临时脚本）、[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)（"Tactful Extraction" 节省 token 的外科手术式代码读取）。

---

## 四、重要 PR 进展

| # | PR | 内容 |
|---|-----|------|
| 1 | [#30335](https://github.com/google-gemini/gemini-cli/pull/30335) | 修复 `getSafeGitEnv()` 将 `core.sshCommand` 置为空字符串，导致所有 SSH git 操作失败的问题。 |
| 2 | [#30331](https://github.com/google-gemini/gemini-cli/pull/30331) | 修复 `gemini mcp add -e` 用 `split('=')` 解析导致含 `=` 的环境变量值被静默截断（如 `TOKEN=abc=def==`）。 |
| 3 | [#30334](https://github.com/google-gemini/gemini-cli/pull/30334) · P2 | **异步解析 PowerShell 命令**，修复 Windows 上 Thinking spinner 多秒冻结的 UI 问题。 |
| 4 | [#30338](https://github.com/google-gemini/gemini-cli/pull/30338) | 含未展开变量（`$VAR`）的 shell 命令保持 `ASK_USER`，防止只读判定被 bash 改写绕过——**安全加固**。 |
| 5 | [#30340](https://github.com/google-gemini/gemini-cli/pull/30340)（已合） | IDE 发现文件改为**每用户 0700 目录 + 原子写入**，修复多用户冲突与安全隐患。 |
| 6 | [#30315](https://github.com/google-gemini/gemini-cli/pull/30315)（已合） | 从 CLI 路径而非 cwd 检测本地 git clone，修复自动更新将源码 checkout 误判为 npm 全局安装。 |
| 7 | [#30219](https://github.com/google-gemini/gemini-cli/pull/30219) | ACP 会话压缩后将 tool call 记录到活跃 chat，**修复会话重载时的 400 错误**。 |
| 8 | [#30289](https://github.com/google-gemini/gemini-cli/pull/30289) · P1（已合） | `gemini extensions link` 披露符号链接真实路径，扩展授权默认改为**拒绝**——安全收紧。 |
| 9 | [#30107](https://github.com/google-gemini/gemini-cli/pull/30107) · P1（已合） | 窄终端下认证 URL 被折行截断导致 Google 登录 400 错误，现使链接可点击。 |
| 10 | [#30344](https://github.com/google-gemini/gemini-cli/pull/30344) / [#30343](https://github.com/google-gemini/gemini-cli/pull/30343) | 大规模依赖更新（npm 62+ 项，含 MCP SDK 1.23→1.32）及 simple-git 安全相关升级。 |

---

## 五、功能需求趋势

1. **Subagent 体系深化**（最主线）：本地 subagent Sprint（#20195）、并行协作与共享内存（#18287）、subagent 轨迹可通过 `/chat share` 查看（#22598）、codebase_investigator 改进（#18282）。
2. **AST 感知工具链**：#22745/#22746/#22747 系列，探索 ast-grep、tilth、glyph 提升读取/搜索精度。
3. **沙箱与安全**：零依赖 OS 沙箱（#19873）、破坏性命令防护（#22672）、per-workspace 策略（#18397）。
4. **Token 效率**：外科手术式读取（#19561）、用原生文件工具维护任务跟踪替代 WriteToDo（#18836/#21000）。
5. **Browser Agent 韧性**：会话接管与锁恢复（#22232）、Wayland 支持（#21983）。

---

## 六、开发者关注点

- **可靠性是最大痛点**：agent 挂起（#21409）、假成功（#22323）、hook 崩溃（#22186）——用户无法信任 subagent 的执行结果。
- **可观测性不足**：`/bug` 不含 subagent 上下文（#21763）、轨迹难查看（#22598），排障成本高。
- **配置与调度失灵**：settings.json 被忽略（#22267）、skills/subagents 不被自动调用（#21968）、symlink agent 不识别（#20079）。
- **Token 成本与上下文膨胀**：大文件读取 "firehose" 上下文（#19561），驱动 AST 工具与文件式任务跟踪的诉求。
- **工具数量上限**：>128 tools 即 400（#24246），重度定制用户首先撞墙。

---
*本报告基于过去 24 小时 GitHub 数据自动整理，供技术决策参考。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-18 | 数据来源：github.com/github/copilot-cli**

---

## 1. 今日速览

过去 24 小时 Copilot CLI 连发三个版本（v1.0.113 / v1.0.113-1 / v1.0.114-0），最受关注的更新是管理员可通过 `features.browserUse` 托管设置禁用内置 Browser Use。但 v1.0.113 也引入了明显的兼容性断裂：扩展 SDK 从 `@github/copilot-sdk` 改名为 `@microsoft/copilot-sdk` 且未提供别名或发布说明，引发社区不满。此外 Fusion/HydraFusion 相关的判断器（judge）缺陷和子代理模型支持问题成为讨论热点。

---

## 2. 版本发布

| 版本 | 要点 |
|---|---|
| **v1.0.114-0** | 修复与变更（常规修复版本） |
| **v1.0.113-1** | **新增**：管理员可通过托管设置 `features.browserUse` 禁用内置 Browser Use，包括正在运行中的会话 |
| **v1.0.113** | 2026-11-17 主版本发布（但 SDK 改名未在发布说明中提及，见 Issue #5492） |

---

## 3. 社区热点 Issues（Top 10）

1. **#5478** [OPEN] Cortex XDR 误杀：Copilot 调用 git 时触发 "parent_process_spoofing" 检测，导致宿主 shell 被杀
   🔥 企业安全软件与 CLI 工具链冲突的典型问题，Windows 企业环境下影响大。
   https://github.com/github/copilot-cli/issues/5478

2. **#5492** [OPEN] v1.0.113 SDK 改名 `@github/copilot-sdk` → `@microsoft/copilot-sdk`，无别名无公告，扩展全部加载失败
   破坏性变更未沟通，扩展生态受直接冲击，属当天最紧急问题。
   https://github.com/github/copilot-cli/issues/5492

3. **#4674** [CLOSED] 恢复会话未还原自定义 agent（#917 回归），mcp-servers 和 tools 白名单均丢失
   会话持久化 + agent 配置的核心回归问题，已修复关闭。
   https://github.com/github/copilot-cli/issues/4674

4. **#5290** [CLOSED] 缺失 `--fusion-tier` 参数，与官方文档不符
   3 个 👍，文档与实现不同步的代表性问题。
   https://github.com/github/copilot-cli/issues/5290

5. **#4576** [CLOSED] `includeCoAuthoredBy: false` 未被子代理继承，commit 仍带 Co-authored-by 尾注
   5 个 👍，合规敏感场景（企业提交规范）痛点，已修复。
   https://github.com/github/copilot-cli/issues/4576

6. **#4773** [OPEN] MCP 重复发现时报 "Found 0 tools"，导致 agent 误判集成不可用并跳过工作流步骤
   MCP 可靠性问题，影响自动化链路稳定性。
   https://github.com/github/copilot-cli/issues/4773

7. **#5040** [OPEN] MCP OAuth：Entra ID 拒绝 127.0.0.1 回调（AADSTS50011），且端口每次变化
   企业 Microsoft 生态集成受阻，无 localhost 覆盖方案。
   https://github.com/github/copilot-cli/issues/5040

8. **#5318** [CLOSED] 内置 grep 的输出压缩破坏文件名与行号，甚至合并不同文件
   搜索结果是 agent 决策依据，数据损坏风险高，已修复。
   https://github.com/github/copilot-cli/issues/5318

9. **#5493 / #5494** [OPEN] Fusion Cascade 判断器缺陷：new_context 中断 solver 阶段、跨会话动作因找不到证据被误拒
   Fusion 新架构的稳健性问题集中爆发，值得持续关注。
   https://github.com/github/copilot-cli/issues/5493 | https://github.com/github/copilot-cli/issues/5494

10. **#4829** [OPEN] 子代理单轮执行数百次工具调用导致 prompt caching 失效、token 消耗复利式增长
    长任务成本问题，直接影响生产可用性与账单。
    https://github.com/github/copilot-cli/issues/4829

---

## 4. 重要 PR 进展

过去 24 小时无更新的 Pull Request（共 0 条），本节省略。

---

## 5. 功能需求趋势

- **企业管控与合规**：`features.browserUse` 托管设置上线、企业级 sandbox 强制策略诉求（#4446）、Co-authored-by 合规（#4576）——企业 IT 管理是明显的产品方向。
- **Fusion / HydraFusion 多模型编排**：判断器行为修正（#5493/#5494）、子代理无法使用 hydrafusion 模型（#5413）、OTel 可观测性需求（#4825）、`--fusion-tier` 参数（#5290），多模型路由是当前最活跃的迭代领域。
- **MCP 生态健壮化**：OAuth/Entra 集成（#5040）、发现可靠性（#4773）、非交互模式 sampling（#2882）。
- **扩展与插件生态**：SDK 改名断裂（#5492）、扩展重载工具名冲突（#5490）、marketplace 全量克隆性能问题（#5491/#2463，sparse checkout 需求）。
- **会话与子代理状态管理**：会话恢复回归（#4674）、agent 热重载（#3106）、孤儿进程清理 `/cleanup` 命令需求（#1790）。

---

## 6. 开发者关注点

1. **兼容性断裂缺乏沟通**：SDK 改名、文档与实现不同步（#5492、#5290、#5489 贡献指南过期），开发者呼吁发布说明透明化。
2. **企业安全软件冲突**：Cortex XDR 杀进程（#5478）反映 CLI 子进程行为需考虑 EDR 兼容。
3. **长任务成本与缓存失效**：子代理 token 复利消耗（#4829）是生产环境高频痛点。
4. **Windows 平台问题密集**：无盘符挂载卷跳过 instruction 文件（#5496）、代理网络 Fake-IP 拒绝公网域名（#5180）。
5. **可观测性不足**：HydraFusion 路由决策、凭据选择（#4804 sandbox 静默使用错误 PAT）等关键行为对用户不透明。
6. **插件/marketplace 资源效率**：全量 clone 浪费磁盘、不可取消、退出残留进程（#5491、#2463）。

---
*本报告基于过去 24 小时 GitHub 公开数据自动生成，仅供技术分析参考。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-18

## 一、今日速览

OpenCode 今日密集发布 **v2.3.1 和 v2.3.2** 两个版本，核心修复 GPT-6.2 提示词缓存计费问题和 shell 命令超时误杀问题。桌面端多个渲染器崩溃（#63944、#62800）已通过 PR #64565 修复关闭。社区持续聚焦 provider 兼容性、CJK 文本渲染和 Code Mode 能力扩展。

---

## 二、版本发布

### v2.3.2（[Release](https://github.com/anomalyco/opencode/releases)）
- **GPT-6.2 Prompt Caching 修复**：GPT-6.2 模型不会缓存 Responses API `instructions` 字段中的系统提示词，导致每步都按未缓存输入重新计费。现在改为以 leading developer message 形式发送，覆盖所有 Responses 路由（OpenAI API key 与 ChatGPT 登录均适用）。对应 Issue [#64550](https://github.com/anomalyco/opencode/issues/64550)。

### v2.3.1（[Release](https://github.com/anomalyco/opencode/releases)）
- **超时 Shell 命令转入后台**：超时后不再被杀掉，长构建/测试可继续运行并回报结果；前台 `timeout: 0` 现表示默认 120 秒。

### v1.19.6（OpenCode 1 维护版）
- 提供向 OpenCode 2.0 的内置升级通道：后台下载、用户自选升级时机，会话/项目/设置保留。

---

## 三、社区热点 Issues

1. **[#64543](https://github.com/anomalyco/opencode/issues/64543)** — 英文 UI 下中文会话标题渲染为错误字形。复制出来文本正确，纯渲染问题。macOS 桌面端，9 条评论，今日最热，与 CJK 系列问题同源。

2. **[#64481](https://github.com/anomalyco/opencode/issues/64481)** — Provider 返回 `response.failed` 时，空参数 tool call 被持久化，导致会话循环报 "Invalid arguments {}"。已关闭，属核心状态机健壮性问题。

3. **[#63944](https://github.com/anomalyco/opencode/issues/63944)** — Windows 桌面端生成期间渲染器崩溃（`Match/exhaustive: absurd`）。已由 PR #64565 修复关闭，连带修复 #62800。

4. **[#64550](https://github.com/anomalyco/opencode/issues/64550)** — OpenAI 官方确认 GPT-6.2 有意将顶层 `instructions` 排除在 prompt caching 之外，直接驱动了 v2.3.2 的发布。计费成本类问题，影响面大。

5. **[#64494](https://github.com/anomalyco/opencode/issues/64494)** — 升级后旧会话不可见：目录→项目解析忽略 V1 导入的项目记录，重复铸造 project ID。升级路径数据迁移的关键 bug。

6. **[#64558](https://github.com/anomalyco/opencode/issues/64558)** — 助手消息跨越执行周期边界时，subagent 完成通知被静默跳过。新报核心问题，影响任务编排可靠性。

7. **[#64416](https://github.com/anomalyco/opencode/issues/64416)** — OVHcloud Qwen3.8-27B 流式返回缺少 `finish_reason` 导致请求循环失败，附可用 workaround。第三方 provider 兼容性代表案例。

8. **[#64538](https://github.com/anomalyco/opencode/issues/64538)** — TUI 文本宽度计算不一致（`string-width.ts` vs 终端渲染器），CJK/emoji 截断错乱。与长期未决的 [#58085](https://github.com/anomalyco/opencode/issues/58085) 同主题。

9. **[#54044](https://github.com/anomalyco/opencode/issues/54044)** — Agent 明确 deny browser 但持有 `execute` 工具时，44 个浏览器工具仍被暴露并放行。权限模型安全隐患，值得持续关注。

10. **[#64500](https://github.com/anomalyco/opencode/issues/64500)** — 自动压缩在工具调用进行中触发时崩溃（`p.content.flatMap is not a function`）。已关闭，与压缩相关的一连串修复之一（另见 #62778）。

---

## 四、重要 PR 进展

1. **[#64515](https://github.com/anomalyco/opencode/pull/64515)** — 根据会话所选模型动态决定工具集及 Code Mode 分配（@jlongster），核心路由逻辑变更。
2. **[#64565](https://github.com/anomalyco/opencode/pull/64565)**（已合并）— 修复两处渲染器致命崩溃，解决 #63944 / #62800。
3. **[#63002](https://github.com/anomalyco/opencode/pull/63002)** — 登录态浏览器面板大件：聊天内链接免登录打开、一键导入各浏览器登录态、agent 安全护栏。
4. **[#64552](https://github.com/anomalyco/opencode/pull/64552)** — 模型生成的聊天标记不再逃逸出消息边界（布局逃逸/XSS 面）。
5. **[#61728](https://github.com/anomalyco/opencode/pull/61728)** — 可配置压缩窗口（token 数），自动压缩可预留空间。
6. **[#64554](https://github.com/anomalyco/opencode/pull/64554)** — 压缩模型不可达时自动回退，避免整个压缩流程挂死。
7. **[#64546](https://github.com/anomalyco/opencode/pull/64546)** — 持久化视频任务，视频生成在服务重启后可存活。
8. **[#64545](https://github.com/anomalyco/opencode/pull/64545)**（已合并）— 时间线代码块长行换行 + 滚动条修复，关闭 #60143。
9. **[#64518](https://github.com/anomalyco/opencode/pull/64518)**（已合并）— Code Mode 新增 `Bun.file/write/Glob` API（`full_codemode` 特性开关）。
10. **[#64407](https://github.com/anomalyco/opencode/pull/64407)**（已合并）— 实验性浏览器式侧边 Tab 分组。

---

## 五、功能需求趋势

- **Provider/模型目录动态化**：#40524（目录与 `/models` 端点对账）、#64489（缓存 6.5 天不刷新）、#64507（Jev 1.13 缺失）——社区强烈要求模型列表实时准确。
- **Code Mode 能力扩展**：Bun 文件 API、Rust 运行时重构（#64559）、视频工具铺垫（#64546），是当前最活跃的开发主线。
- **远程/浏览器工作流**：SSH 远程开发（#54059、#56668）、登录态浏览器面板（#63002、#64498）。
- **上下文与压缩精细化**：可配置压缩窗口（#61728）、压缩模型回退、上下文百分比显示修正（#64488）。
- **可验证 Agent 输出**：#64419 提议第三方确定性校验 agent "done" 状态并留痕。

---

## 六、开发者关注点

- **成本敏感**：GPT-6.2 缓存计费问题当天报告、当天发版修复，说明 token 成本是付费用户最直接的痛点。
- **CJK/国际化渲染**：会话标题字形错误（#64543）、TUI 宽度截断（#64538、#58085）反复出现，中文用户群体反馈集中。
- **升级迁移可靠性**：#64494（旧会话丢失）、#64480（"Database is not empty"）表明 V1→V2 升级路径仍需打磨。
- **崩溃与稳定性**：桌面渲染器崩溃、压缩触发崩溃、subagent 通知丢失——长会话/本地模型场景下的鲁棒性是高频抱怨。
- **权限安全**：browser 工具绕过 deny（#54044）值得安全敏感团队关注，建议在修复前谨慎授予 `execute`。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-11-18）

## 一、今日速览

Qwen Code 今日发布 **v0.28.0 正式版及 v0.28.1-preview.0 预览版**，同步更新了 Desktop v0.28.0 与 TypeScript SDK v0.1.35，核心亮点是 Web Shell 侧边栏工作区过滤与 Managed Agent 钉钉适配器。社区侧，@Afloat16 集中报告了 **8+ 个 Java SDK P2 级缺陷**（进程管理、编码、并发写入等），成为今日最密集的反馈浪潮。wenshao 持续推进 Managed Agent 与 Web Shell 的深度功能，包括守护进程重启恢复收件箱与 PR 监听注入。

---

## 二、版本发布

### v0.28.0（正式版）
- **无已知破坏性变更**
- 新特性：Web Shell 侧边栏工作区过滤（#17244）、Managed Agent 钉钉适配器（DingTalk adapter）
- 测试增强：managed-agent 全栈 E2E 中观察真实的定时 /loop 触发（#17506）

### v0.28.1-preview.0（预览版）
- 含 verify-pr watcher 加固等修复

### 周边发布
- **Desktop v0.28.0**：随 CLI 主版本同步
- **SDK TypeScript v0.1.35**：捆绑 CLI 0.28.0

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#14724](https://github.com/QwenLM/qwen-code/issues/14724) Main CI failed: Managed Agent gate | 长期未关闭的 CI 失败追踪 issue，**431 条评论**，反映 Managed Agent 门禁稳定性仍是最大工程痛点 |
| 2 | [#13851](https://github.com/QwenLM/qwen-code/issues/13851) 非交互模式 result 延迟（P1） | headless/SDK 模式需等 28k–36k token 的 auto-memory 任务完成才返回，延迟 40 秒至 5 分钟，对 SDK 消费方影响严重，已被标记 ready-for-agent |
| 3 | [#15082](https://github.com/QwenLM/qwen-code/issues/15082) Managed Agent 容量与闲置回收模型 | 缺少 Runtime 数量、内存上限与回收策略，是 multi-agent 路线图的关键设计议题，状态 ready-for-human |
| 4 | [#17284](https://github.com/QwenLM/qwen-code/issues/17284) 统一 Agent Loop 遗留项 | 追踪 #17045 统一 agent loop / event-bus 内核的后续，**11-21 冻结节点**前必须收敛，架构意义大 |
| 5 | [#15738](https://github.com/QwenLM/qwen-code/issues/15738) Team mode 在 ACP 模式下消息丢失 | 队友消息永远无法送达 leader，且 team 随 ACP 子进程死亡，Web Shell 多智能体实验的阻塞项 |
| 6 | [#17678](https://github.com/QwenLM/qwen-code/issues/17678) MAS shell Workspace 在 external 绑定上必被 409 拒绝 | 今日新报，三处准入叠加缺陷导致无规避方案，中文社区深度分析 |
| 7 | [#17642](https://github.com/QwenLM/qwen-code/issues/17642) Java SDK 文件读取用路径分隔符拼接行 | Linux 上 `alpha\nbeta` 变成 `alpha/beta/`，直接损坏源码内容，ready-for-agent |
| 8 | [#17600](https://github.com/QwenLM/qwen-code/issues/17600) Java ProcessTransport.close() 死锁 | 静默进程关闭时 reader 锁导致无限阻塞，典型的资源释放缺陷 |
| 9 | [#17674](https://github.com/QwenLM/qwen-code/issues/17674) 缺失 $version 的 settings.json 中 disableAutoUpdate 被忽略 | 配置迁移漏洞导致用户关闭自动更新的意图失效，已有对应修复 PR #17675 当日提交 |
| 10 | [#10932](https://github.com/QwenLM/qwen-code/issues/10932) 语音听写无法使用 Token Plan ASR 模型 | 模型 ID 白名单硬编码旧值，阻塞新版 ASR 模型接入，ready-for-human |

**其他值得注意**：#11945（MCP Apps 1MiB HTML 限制 + 10s 超时拒绝 Amplitude 图表）、#17669（run_shell_command stdout/stderr 归属丢失）、#13738（瞬时 transcript 读错误永久失败化 A2A 任务）。

---

## 四、重要 PR 进展（Top 10）

1. **[#17677](https://github.com/QwenLM/qwen-code/pull/17677)** feat(serve): 守护进程重启恢复收件箱 — 重启后列出未完成 prompt 的会话并批量恢复，不切换对话上下文，显著提升 daemon 可靠性。
2. **[#17665](https://github.com/QwenLM/qwen-code/pull/17665)** feat(managed-agent): PR 监听私有注入 — 绑定 PR 后，CI 变红、merge conflict、head 移动等事件主动注入 Managed Session，向“托管式开发助手”演进。
3. **[#17610](https://github.com/QwenLM/qwen-code/pull/17610)** feat(channels): 通用出站 Webhook 投递 — 为通知渠道增加 send-only Generic Webhook，扩展集成生态。
4. **[#17437](https://github.com/QwenLM/qwen-code/pull/17437)** feat(i18n): 阿拉伯语 + RTL 布局 — CLI 与 Web Shell 完整 RTL 支持，国际化投入加大。
5. **[#17421](https://github.com/QwenLM/qwen-code/pull/17421)** feat(web-shell): 繁体中文独立 locale — zh-TW/zh-HK/zh-MO/zh-Hant 解析到台湾目录。
6. **[#17529](https://github.com/QwenLM/qwen-code/pull/17529)** fix(channels): 钉钉多分片发送不截断 — 保留 #17504 的 30s 分片预算并增加 witness 测试。
7. **[#17533](https://github.com/QwenLM/qwen-code/pull/17533)** feat(web-shell): worktree 元数据携带 + 快照后删除清理 — 推进 Web Shell 与 Codex 的 worktree 对齐（P6）。
8. **[#17477](https://github.com/QwenLM/qwen-code/pull/17477)** fix(core): 后台异步 hook 输出送达模型 — 修复能力清单 L11 缺陷，异步 hook 结果此前无法进入模型上下文。
9. **[#17675](https://github.com/QwenLM/qwen-code/pull/17675)** fix(cli): 无版本号 settings 文件迁移 — 与 #17674 当日配对提交，社区自报自修的典范。
10. **[#16799](https://github.com/QwenLM/qwen-code/pull/16799)** feat(cli): OpenTUI 选区剪贴板 + 右键粘贴 — 终端交互体验的细节打磨。

**其他**：#17661（composer 与 daemon 解耦，为统一聊天表面铺路）、#17231（修复 fork 仓库被误路由到 self-hosted pool 的安全问题）、#17514/#17515（Web Shell UI 打磨）。

---

## 五、功能需求趋势

1. **多智能体 / Managed Agent 架构**：容量模型（#15082）、Team mode（#15738）、A2A 任务可靠性（#13738）、统一 Agent Loop（#17284）—— 这是当前最活跃的 roadmap 主线。
2. **Web Shell 持续演进**：worktree Codex 对齐、SSE 容量展示、会话 Goal 标记、恢复收件箱、触屏适配，多个 PR 并行推进。
3. **通知渠道生态扩展**：钉钉、Aone、Generic Webhook、PR 监听注入，向 IM 驱动的托管智能体方向发展。
4. **SDK 健壮性（尤其 Java）**：今日新增 8+ 个 sdk-java P2 缺陷，社区对进程生命周期、编码正确性、并发安全的要求明显提升。
5. **国际化**：阿拉伯语 RTL、繁体中文，非英语市场投入加码。

---

## 六、开发者关注点

- **性能与延迟**：headless/SDK 模式因 auto-memory 任务阻塞最终结果（#13851，P1）是当前最紧急的用户体验痛点；每次记忆任务消耗 28k–36k token 也引发成本担忧。
- **SDK 可靠性**：Java SDK 的进程泄漏、UTF-8 编码、JSONL 并发写坏、close() 死锁等问题成批出现，建议 Java 集成方暂持观望态度。
- **配置迁移体验**：无 `$version` 的旧配置文件被静默忽略/覆写（#17674），手写配置用户易踩坑。
- **测试稳定性**：CI 失败类 issue 长期占据热榜（#14724 431 条评论），flaky test 与 Managed Agent 门禁是内部工程的主要摩擦点。
- **可观测性**：shell 命令 stdout/stderr 混流无标注（#17669）、错误信息含糊 `Error: (none)`，调试体验有待改进。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*