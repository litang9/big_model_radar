# AI CLI 工具社区动态日报 2026-11-01

> 生成时间: 2026-10-31 23:21 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告

**数据日期：2026-11-01**

---

## 1. 生态全景

AI CLI 工具已从单一“终端助手”演进为覆盖 **CLI/TUI、桌面端、移动端 Remote、Web Shell、ACP 编辑器集成**的全形态 Agent 平台。头部产品（Claude Code、Codex）的重心转向**企业级能力**（团队共享预算、审批链路、安全分类器），而开源产品（Gemini CLI、OpenCode、Qwen Code）则在**Agent 编排架构与多会话工作流**上快速追赶。共性痛点高度收敛：**Windows 平台支持质量、长任务可靠性、计费/配额透明度、配置静默失效**几乎出现在每个社区。安全议题从功能层面（命令审批）扩展到**供应链与 CI 基础设施层面**。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues（条） | 重要 PR（条） | Release | 今日标志性事件 |
|---|---|---|---|---|
| **Claude Code** | 10+（批量 stale 关闭大量历史 issue） | 3（旧 PR 清理，无新合入） | ✅ v2.1.316 | pooled budget 团队共享预算上线；Windows 进程残留为最高热度 |
| **OpenAI Codex** | 10（最高 21 评论） | 4（bot 提交后关闭） | ❌ | macOS 10/30 更新引发回归集中爆发；Windows 问题占过半 |
| **Gemini CLI** | 10 | 10+（含多项合并） | ✅ v0.67.0 nightly | Sub-agent 可靠性 P1 问题集中；出现 CI 安全探测 PoC PR |
| **Copilot CLI** | 10 | 1（社区 CI 修复） | ✅ v1.0.106-1（昨日） | apply_patch 换行符修复；#5205 无说明关闭引发透明度质疑 |
| **OpenCode** | 10（最高 **167 评论**） | 10+（单日 8 个架构级重构） | ❌ | Zen 免费额度危机成全社区最热单一 issue |
| **Qwen Code** | 10（最高 105 评论） | 10 | ❌ | CI 基础设施故障成最大痛点；Managed Agent 体系持续推进 |
| **Kimi Code CLI** | 0 | 0 | ❌ | 过去 24 小时无活动 |

**观察**：Gemini CLI 与 OpenCode 的代码侧产出最活跃；Claude Code/Codex 处于“维护+企业化”节奏；OpenCode 单 issue 167 评论、Qwen CI 帖 105 评论反映服务可靠性问题引发的情绪峰值。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **Windows 一等公民支持** | Claude Code、Codex、Copilot CLI、Qwen Code | 进程残留（#62107）、无效 PowerShell 生成（Copilot #5302，基于 2164 次调用实证）、浏览器工具状态不同步（Codex #54989）、桌面更新文件锁（Qwen #15276）——**Windows 体验普遍落后是全行业欠账** |
| **长任务可靠性** | Codex、Gemini CLI、Copilot CLI、OpenCode | 计划丢失/停滞循环（Codex #52279）、agent 挂起（Gemini #21409）、上下文 rollover 反复失败（Copilot #5312）、会话驱逐（OpenCode） |
| **多会话/子代理编排** | Gemini CLI、OpenCode、Qwen Code、Claude Code | subagent 自主调度率低（Gemini #21968）、sessionID 续接失败（OpenCode #59293）、子会话 TTL 管理（Qwen #14335）、并行 worktree 隔离失效（Claude #88950/#90668） |
| **计费/配额透明度** | Claude Code、Codex、OpenCode、Copilot CLI | 配额加速消耗（Claude #87419）、429 重试耗尽（Codex #55507）、Zen 免费层危机（OpenCode，167 评论）、周配额重置语义（Copilot 关联） |
| **配置静默失效** | Claude Code、Gemini CLI、Copilot CLI | `switchModelsOnFlag:false` 被忽略（Claude #98875）、Browser Agent 无视 settings.json（Gemini #22267）、contextManagement 阈值被丢弃（Gemini #30068） |
| **安全与命令审批** | 全部主要工具 | 破坏性命令未审批执行（OpenCode #46386 数据丢失事故）、安全分类器误判（Claude #90680）、ACP 权限审批回归（Copilot #4537）、commit 归属误判（Qwen #12514） |
| **移动端/Remote** | Codex、Claude Code、Qwen Code | 大任务水合超时 + 10GB 蜂窝流量（Codex #38023/#58310）、远程权限批准（Claude #90589）、Web Shell 移动适配（Qwen） |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 企业治理（pooled budget、spend limits API）、安全分类器、hooks/插件生态 | Max/Team 企业订阅用户 | 闭源、OAuth 网关计费、重 sandbox（worktree isolation，但可靠性存疑） |
| **OpenAI Codex** | 桌面/移动全端体验、Auto-review 审批链路、Guardian 审查 | Pro/Business 用户，多端工作流 | 闭源、ACP+桌面客户端、Cloudflare 边缘分发（Sites） |
| **Gemini CLI** | Agent 框架本身（subagent、AST 感知读取、token 效率）、ACP 集成、headless | 开发者/框架集成方（Zed/JetBrains/VS Code） | 开源、迭代最快、模型原生 POSIX 能力 + OS 沙箱路线（#19873） |
| **Copilot CLI** | 企业（GHES）、ACP/编辑器集成、终端协议（OSC 7501） | GitHub 生态用户、企业 | 开源、深度绑定 GitHub MCP 与 Copilot 订阅 |
| **OpenCode** | 多 provider 聚合（Zen、Copilot、DeepSeek/Kimi）、`@opencode/ai` 架构重构 | 付费意愿低/多模型自由选择用户 | 开源、本地后台服务 + 桌面端、模型无关 |
| **Qwen Code** | Managed Agent（托管后台自动化）、Skills API、Web Shell 嵌入 | 长时运行 daemon/平台集成方 | 开源、serve 架构、外部工作区物化等平台化能力 |
| **Kimi Code CLI** | — | — | 活跃度不足，暂不具备生态竞争力 |

**核心分野**：闭源双雄（Claude/Codex）走“订阅+企业管控”路线；开源阵营分裂为“开发者框架”（Gemini CLI）与“平台化 daemon”（Qwen Code）两条路线；OpenCode 以 provider 中立性卡位价格敏感用户。

---

## 5. 社区热度与成熟度

- **最高热度**：OpenCode（167 评论单帖）与 Qwen Code（105 评论 CI 帖）——但均由**服务/基础设施故障**驱动，属于“危机型活跃”，而非健康信号
- **最健康迭代**：Gemini CLI（10+ PR 含多个架构级修复落地、版本稳定 nightly 输出、issue 有 P1/P2 分级管理），处于**快速迭代成熟期**
- **成熟但响应滞后**：Claude Code、Codex——issue 质量高但依赖批量 stale 关闭，社区对修复速度有明显焦虑（Claude #83063 已升级至欧盟消费者法务层面）
- **企业化稳定期**：Copilot CLI——发布节奏稳定、修复针对性明确，但社区对关闭流程透明度不满（#5312）
- **需观察**：Kimi Code CLI 零活动，生态投入存疑

**成熟度排序**（问题解决能力/流程规范）：Copilot CLI ≈ Gemini CLI > Claude Code ≈ Codex > Qwen Code > OpenCode > Kimi CLI

---

## 6. 值得关注的趋势信号

1. **企业化是闭源产品的下一战场**：Claude Code pooled budget、Copilot GHES 改进、Codex 审批链路——团队级管控（预算、权限、审计）正在成为付费转化的核心卖点。自建 CLI 的团队应预期“策略即代码”能力成为标配。

2. **静默降级/静默失效是信任杀手**：Claude 的模型静默切换（#98875）、Gemini/Copilot 的配置静默丢弃、Codex 的自动审查拒绝——**“任何偏离用户显式配置的行为必须有可见提示”**正在从 UX 建议上升为产品红线，甚至法务风险（#83063）。

3. **Agent 编排进入“会话生命周期管理”深水区**：子会话 TTL（Qwen）、会话驱逐策略（OpenCode）、跨后端会话恢复（Codex PR #58457）、AST 感知读取降 token（Gemini #22745）——竞争焦点从“能不能跑”转向“长时运行的成本与状态管理”。

4. **安全重心从功能转向供应链**：Gemini CLI 的 CI runner PoC 探测、Qwen 的 CVE 审计失败与间接依赖升级失效、OpenCode 的破坏性命令事故——**CI 凭证与依赖链是 AI 工具仓库的新攻击面**，维护者应立即审计自托管 runner 与 fork PR 执行策略。

5. **Windows 是全行业最大质量洼地**：四款工具同时集中爆发 Windows 问题。Windows 重度用户在选型时应降低预期或优先考虑 WSL2 路径（但 Copilot #5304 显示 WSL 也有坑）；对厂商则是清晰的差异化机会。

6. **计费透明度直接影响留存**：OpenCode 的 Zen 危机证明，配额/重置/错误提示的任何不透明都会迅速演变为社区信任崩塌。评估任何订阅制 CLI 时，**成本可观测性（配额 API、缓存命中、降级事件）应作为一等评估维度**。

**给技术决策者的行动建议**：生产环境采用需重点验证长任务稳定性与命令审批机制（参考 OpenCode #46386 教训）；多平台团队暂缓 macOS 最新更新（Codex 回归案例）；开源选型优先 Gemini CLI（迭代与治理最平衡），OpenCode 需评估其服务可靠性风险。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-11-01，来源：github.com/anthropics/skills）

## 一、热门 Skills 排行（PR）

由于本期 PR 评论数据缺失，以下按 PR 活跃度（更新时间、跨 Issue 关联度、影响力）综合排序：

1. **mcp-builder 修复：支持 mcp>=2 新 API**（#1742, OPEN）
   适配 `streamable_http_client` 重命名与自定义 HTTP header 配置，关联 Issue #1668。mcp-builder 是社区使用最重的官方 Skill 之一，配套 Issue #1390（评估脚本对真实 MCP 服务器全部打 0 分）显示该 Skill 是痛点最集中区域。
   https://github.com/anthropics/skills/pull/1742

2. **skill-creator 触发评估隔离与 Windows 兼容**（#1298, OPEN）
   修复触发评估误报、Windows select() 失败等核心问题。skill-creator 是 Skill 生态的“元工具”，围绕它的 Issue 密度最高（#556 触发率 0%、#202 最佳实践、#1394 eval-viewer XSS），是社区事实上的第一关注点。
   https://github.com/anthropics/skills/pull/1298

3. **skill-creator YAML frontmatter 解析修复**（#1997, OPEN）
   修复 `parse_skill_md` 手工剥引号导致的元数据与 SKill.md 不一致问题，直接影响评估与描述优化链路。
   https://github.com/anthropics/skills/pull/1997

4. **webapp-testing 安全修复：移除 shell=True**（#1980, OPEN）
   修复命令注入风险（CWE-78），10 月仍在活跃更新；同 Skill 另有 #1976 元素发现修复，webapp-testing 正经历一轮安全+正确性集中治理。
   https://github.com/anthropics/skills/pull/1980

5. **docx 技能修复系列**（#1792 LibreOffice 超时误报成功；Issue #2018 merge_runs 破坏 XML 命名空间）
   文档类 Skill（docx/pptx/pdf/odt）Issue 量最大，docx 是稳定热点。
   https://github.com/anthropics/skills/pull/1792

6. **Pyxel 复古游戏开发 Skill**（#525, OPEN，3 月提交、10 月仍活跃）
   提供游戏创建/调试/无头运行验证框架，存活 8 个月说明维护意愿强。
   https://github.com/anthropics/skills/pull/525

7. **document-typography 排版质量控制**（#514, OPEN）
   解决 AI 生成文档的孤行、孤词、编号错位等通病，切中 AI 输出质量痛点。
   https://github.com/anthropics/skills/pull/514

8. **md2video-audio：Markdown 转 MP4 视频**（#1703, OPEN）
   零成本 Markdown→幻灯片→带配音视频，代表内容创作类需求方向。
   https://github.com/anthropics/skills/pull/1703

## 二、社区需求趋势（Issues 提炼）

- **安全与信任机制**：#492（46 条评论，全库最热）——社区 Skill 冒用 `anthropic/` 命名空间构成信任边界漏洞；#1394 eval-viewer XSS。安全是社区第一诉求。
- **Skill 触发可靠性**：#556（13 条评论）——`claude -p` 下 Skill 触发率为 0%，触发评估体系可信度存疑。
- **组织级分发与共享**：#228（17 条评论）——期望企业内共享 Skill 库/直链分享，替代手动上传。
- **上下文效率**：#1487 —— claude-api Skill 单次注入 ~156k token 打爆上下文；#1329 compact-memory 符号化压缩 agent 状态。轻量化是明确方向。
- **AI 输出质量门禁**：#1385 推理质量管线、#412 agent-governance——社区在探索“让 Claude 自我审查”的元 Skill。
- **Skill 描述规范**：#2064 —— description 应写清“何时触发”而非仅“能做什么”，反映社区对触发机制的认知成熟。

## 三、高潜力待合并 Skills（活跃 OPEN PR）

| PR | 内容 | 落地信号 |
|---|---|---|
| #1742 | mcp-builder 适配 mcp>=2 | 修复明确 Issue #1668，依赖升级属刚需 |
| #1997 | skill-creator YAML 解析修复 | 10 月仍更新，属核心工具链 bug |
| #1980 | webapp-testing 去除 shell=True | 安全修复优先级高，10/25 仍活跃 |
| #1298 | skill-creator 评估隔离修复 | 长期活跃（6→9 月），解决多项评估缺陷 |
| #1245 | Notion 规格转实现 + 简历量化审计 | 6→10 月持续更新，工作流自动化方向 |
| #525 | Pyxel 游戏开发 | 存活 8 个月、10 月仍维护，作者投入度高 |
| #1792 | docx 超时错误上报 | 文档类修复合并历史较好 |

## 四、生态洞察（一句话总结）

**社区最集中的诉求是“让 Skill 体系可信且可控”——即解决安全命名空间、触发可靠性、上下文效率三大基础问题，其次才是新增具体领域 Skill。**

---

# Claude Code 社区动态日报（2026-11-01）

## 1. 今日速览

Claude Code 发布 **v2.1.316**，新增 `CLAUDE_CODE_DISABLE_ULTRATHINK` 环境变量及面向团队场景的网关共享预算（pooled budgets）功能。Issue 活动以**批量 stale 关闭**为主——大量 7-8 月的历史 bug（内存泄漏、配额异常扣减、安全分类器误判）被统一标记 stale 关闭，社区关注度集中在 Windows 平台问题与模型静默降级两大主题。

## 2. 版本发布

### v2.1.316
- 新增 `CLAUDE_CODE_DISABLE_ULTRATHINK` 环境变量，可关闭 `ultrathink` 关键词触发
- Claude apps 网关新增**组内共享预算**：管理员可通过 spend limits API 的 `pooled_budget` 为团队成员设置一个共享的月度预算，叠加于各成员个人限额之上——明显面向企业/团队用户

## 3. 社区热点 Issues

| # | 主题 | 为什么重要 |
|---|------|-----------|
| [#62107](https://github.com/anthropics/claude-code/issues/62107) | Windows 上 Cowork 定时任务完成后 claude.exe 进程残留，导致内存持续累积 | 10 条评论为今日最高；影响长期运行的生产环境 Windows 机器，已 stale 关闭但问题本质未解 |
| [#87419](https://github.com/anthropics/claude-code/issues/87419) | Max 20x 用户周配额自 8/17 重置后消耗速度快 1.7-5 倍，OAuth token 携带错误的 rateLimitTier | 计费/配额准确性直接影响付费用户信任，关联 6 个历史 issue，说明是长期系统性问题 |
| [#90680](https://github.com/anthropics/claude-code/issues/90680) | Fable 5 安全防护误判（[cyber]），拦截用户为**自家安全修复**编写回归测试；恢复 UI 还导致静默模型降级 | 安全分类器误伤合法防御性安全工作的典型代表，与 #87802、#90671、#98875 同属一类 |
| [#98875](https://github.com/anthropics/claude-code/issues/98875) | 安全分类器 fallback 静默将整个会话切到 Opus 4.8，`switchModelsOnFlag:false` 被忽略 | 仍 OPEN；暴露了配置项不生效 + 静默降级的双重问题，涉及授权 IT 运维场景 |
| [#106436](https://github.com/anthropics/claude-code/issues/106436) | claude_install.sh 下载可执行文件后又重复下载全量文件，慢速网络下超时失败 | 今日新报（10-31），has repro，影响弱网环境用户的首次安装体验 |
| [#88950](https://github.com/anthropics/claude-code/issues/88950) | 并行 subagent 共享 worktree isolation pin，导致跨 agent 命令执行 | 沙箱隔离失效是潜在安全隐患，涉及并行 agent 架构的核心设计 |
| [#90668](https://github.com/anthropics/claude-code/issues/90668) | `spawn_task` 后台任务运行在父会话同一工作树中而非隔离 worktree，且 UI 提示与实际不符 | 与 #88950 呼应，反映 worktree 隔离机制的整体可靠性问题 |
| [#90584](https://github.com/anthropics/claude-code/issues/90584) | MCP server 未连接完成时 `tool_reference` 清洗操作使 prompt cache 失效 | 直接影响成本与延迟——缓存失效意味着重复计费，是高频性能痛点 |
| [#80085](https://github.com/anthropics/claude-code/issues/80085) | macOS 多实例并发共享 Keychain OAuth 链导致频繁中途登出 | 多工作区重度用户（13 个并发进程）的代表性问题 |
| [#83063](https://github.com/anthropics/claude-code/issues/83063) | 251+ 次文档化指令遵循失败，欧盟用户依消费者法规请求人工支持 | 涉及欧盟消费者权益与 SLA 诉求，属于产品-法务交叉的特殊案例 |

## 4. 重要 PR 进展

今日仅 3 条 PR 更新（均为 3 月创建的旧 PR 被批量关闭）：

- [#32756](https://github.com/anthropics/claude-code/pull/32756) — `/pattern-sweep` 斜杠命令：基于近期 bug 修复的 git diff，自动搜索代码库中相似模式并批量修复
- [#32755](https://github.com/anthropics/claude-code/pull/32755) — `edit-verifier` 插件：通过 PostToolUse hook 验证 Edit 操作是否真正成功，避免静默编辑失败导致的错误假设
- [#32751](https://github.com/anthropics/claude-code/pull/32751) — 修复 hookify 中 `stop`/`prompt` 事件字段映射错误导致规则永不触发的问题

> 注：三个 PR 均已 CLOSED，且集中在同一作者，属于仓库维护清理而非新功能合入。

## 5. 功能需求趋势

1. **Worktree / Agent 隔离可靠性**：#88950、#90668 等多条 issue 指向并行 agent 的隔离机制不可靠，是当前最受关注的架构级诉求
2. **安全分类器可控性**：[cyber]/[bio] 误判 + 静默模型降级（#90680、#87802、#90671、#98875）形成最大的 issue 集群，用户要求透明的 fallback 行为和可关闭配置
3. **桌面端会话管理 UX**：折叠分组显示活跃会话/计数（#83699、#90682）等 Desktop 侧边栏改进需求
4. **远程/移动端权限授予**：#90589 希望从手机端批准远程会话的权限请求（如 `vercel --prod`）
5. **可访问性与 TUI 细节**：链接悬停下划线提示（#90635）等交互可发现性改进
6. **安装健壮性**：弱网环境安装（#106436）、硬件虚拟化不可用时的挂起（#90651）

## 6. 开发者关注点

- **配额与计费透明度**：配额异常加速消耗（#87419）+ prompt cache 意外失效（#90584）双重打击付费用户，成本可见性是 Max 订阅用户的核心焦虑
- **Windows 平台支持质量**：进程残留（#62107）、PowerShell 沙箱权限（#90676）、npm/claude.cmd 行为不一致（#82447）——Windows 体验明显落后于 macOS/Linux
- **静默降级问题**：模型切换（安全 fallback、远程会话模型 chip 失效 #90670）缺乏用户可见的提示，破坏会话连续性和输出质量预期
- **企业/团队场景成熟中**：本次 v2.1.316 的 pooled budget 显示官方正积极补齐团队管理能力，与社区中多实例、多工作区使用模式的需求相呼应
- **插件/MCP 生态稳定性**：插件无法真正禁用（#90607）、MCP 开关不持久（#90615）等反映集成层的状态管理仍有欠账

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-01 | 数据来源：github.com/openai/codex**

---

## 一、今日速览

过去 24 小时无新版本发布，但社区讨论活跃：Windows 桌面端的浏览器工具误报禁用问题（#54989）持续发酵，评论数达 21 条；macOS 26.1027.30824 更新后集中暴露出俄语听写退化、XLSX 附件卡死、更新源 404 等一系列回归问题。与此同时，4 个由 copyberry[bot] 提交的 PR 均已关闭，涉及 TUI 跨后端会话切换与 Guardian 上下文弹性预算等改进。

---

## 二、版本发布

过去 24 小时无新 Release。

---

## 三、社区热点 Issues

**1. Windows 浏览器工具误报禁用（21 评论）**
[#54989](https://github.com/openai/codex/issues/54989) — Work 设置中 Browser 开关已开启，但 browser-use 工具反复报告“本地浏览器被禁用”，需完全重启应用才能恢复，且高频复发。与今日新增的 #58594（Chrome/Edge 同样报错）疑似同一根因，社区讨论热烈。

**2. Auto-review 跨任务审批拒绝（16 评论）**
[#54685](https://github.com/openai/codex/issues/54685) — 可信上下文省略后，自动审查拒绝跨任务审批，即使原始证据完整。涉及审批链路的信任传递机制，与 #58604 的审查策略可见性诉求相呼应。

**3. Codex Sites 被 Cloudflare 拦截（14 评论）**
[#42950](https://github.com/openai/codex/issues/42950) — 用 Codex Sites 创建的公开站点对外部访客被 Cloudflare 拦截，直接影响 Sites 功能可用性，长期未解。

**4. Android Remote 大任务无法启动回合（14 评论）**
[#38023](https://github.com/openai/codex/issues/38023) — 大型空闲任务的 `turn/start` 请求 30 秒超时，移动端对长任务的会话水合存在缺陷。另见 #58310 报告 Remote 2 小时消耗超 10 GB 蜂窝流量，移动端可靠性堪忧。

**5. macOS 更新检查 404（6 评论）**
[#58551](https://github.com/openai/codex/issues/58551) — macOS 更新检查重定向到不存在的 Sparkle appcast（HTTP 404），影响用户获取更新通道，今日新增。

**6. macOS 俄语听写严重退化（5 评论）**
[#58387](https://github.com/openai/codex/issues/58387) — 10 月 30 日更新后俄语听写准确率大幅下滑，而网页版和系统听写正常，指向本地听写管线回归。

**7. Windows 并发回合工作区路由超时（11 评论）**
[#50923](https://github.com/openai/codex/issues/50923) — 并发聊天时出现工作区路由超时、MCP 发现失败与队列阻塞，附有详细的 30 分钟观测数据，报告质量高。

**8. 429 限流重试耗尽（5 评论，3 👍）**
[#55507](https://github.com/openai/codex/issues/55507) — Business 计划用户频繁遇到 `429 Too Many Requests`，配以 #45619（周配额订阅续费后不重置）反映限额体系透明度不足。

**9. Windows 任务栏无法唤出（13 评论，3 👍）**
[#45369](https://github.com/openai/codex/issues/45369) — 最大化时自动隐藏任务栏无法通过鼠标唤出，典型的窗口管理边界缺陷。

**10. 长任务可靠性严重回归（4 评论）**
[#52279](https://github.com/openai/codex/issues/52279) — 三阶段开发任务 9 天未完成第一阶段，出现丢失计划、停滞、道歉循环等行为退化，代表专业用户对长任务可靠性的核心不满。

---

## 四、重要 PR 进展

过去 24 小时仅 4 个 PR 更新（均已关闭），全部来自 copyberry[bot]：

**1. TUI 跨后端会话切换** — [#58457](https://github.com/openai/codex/pull/58457)
会话选择器可列出多后端会话，现已支持通过所属后端恢复会话并准备目标后端，解决跨后端会话被拒绝的问题。

**2. 失败推理轨迹保留不完整输出** — [#58456](https://github.com/openai/codex/pull/58456)
响应带不完整输出失败时，仅存在于终端 payload 中的工具调用尝试不再丢失，提升调试可观测性。

**3. Guardian 上下文弹性预算** — [#58454](https://github.com/openai/codex/pull/58454)
引入 `ContextBudgeting::Elastic`，取消固定分段请求上限，为后续分配保留消息文本与候选内容——直接回应 Guardian 审查链路（见 #54685、#58604）的相关问题。

**4. Bazel CI 快照与 OTLP 测试清理** — [#58459](https://github.com/openai/codex/pull/58459)
修复快照断言失败重试后残留 `.snap.new` 文件、OTLP loopback collector 未及时停止等 CI 卫生问题。

> 注：今日 PR 数量偏少且均为机器人提交后关闭，推测为批量合并/回滚流程，建议持续观察后续主干提交。

---

## 五、功能需求趋势

1. **会话与工作流管理**：分屏多会话并行（#42291，5 👍）、跨后端会话恢复（PR #58457）是桌面端最强需求。
2. **权限与安全策略可观测性**：全局工具允许列表（#47652）、审查策略可见性与持久化授权（#58604），用户希望对自动化审批有明确控制权。
3. **移动端/Remote 体验**：大任务水合、蜂窝流量控制（#38023、#58310）。
4. **国际化与本地化**：阿拉伯语 RTL 渲染（#34871）、俄语听写（#58387）、中韩语用户的报告增多。
5. **限额与计费透明度**：429 处理（#55507）、周配额重置语义（#45619）。

---

## 六、开发者关注点

- **Windows 桌面端问题密度最高**：50 条 Issue 中过半标注 `windows-os`，集中在浏览器工具状态不同步（#54989/#58594）、MCP 发现、连接性错误（#58599、#57874）。
- **macOS 26.1027.30824 更新引发回归集中爆发**：听写、附件、更新源、启动失败（#58293）在 10 月 30 日更新后 48 小时内密集出现，建议 macOS 用户暂缓更新。
- **长任务可靠性是专业用户核心痛点**：计划丢失、停滞循环（#52279）、审批链路误判（#54685）直接影响付费 Pro/Business 用户的开发工作流。
- **资源与性能异常**：单请求 63 MB 的内联图片负载（#54668）、Remote 超 10 GB 流量（#58310）值得网络层排查。
- **Issue 模板质量高但响应滞后**：多条高质量报告（如 #50923 含完整时间线观测）已开放数周，社区对修复速度存在焦虑情绪。

---
*本报告基于 GitHub 公开数据自动整理，版本号与时间以仓库实际情况为准。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-11-01）

## 📰 今日速览

Gemini CLI 发布 v0.67.0 nightly 版本，修复了 shadow repo 的 gitignore 处理和 SSE 流事件缓冲问题。PR 活动密集，多个重要修复落地：Browser Agent 配置覆盖、ACP 模式工具输出截断、Whisper 模型下载中断处理等。值得注意的是，社区出现多个针对 CI 自托管 runner 的安全探测 PR，值得维护者警惕。

---

## 🚀 版本发布

**v0.67.0-nightly.20261031.g6814e00d6**
- **fix(core)**: shadow repo 现在会正确遵循 `.git/info/exclude` 和 `core.excludesFile` 配置（[PR #30034](https://github.com/google-gemini/gemini-cli/pull/30034)）
- **fix(core)**: CodeAssistServer 在流 EOF 时刷新待处理的 SSE 事件缓冲，避免最后一条事件丢失

---

## 🔥 社区热点 Issues

**1. [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 后误报为成功（P1）**
`codebase_investigator` 在未做任何分析就触及轮次上限时，仍报告 `status: success`，严重掩盖了中断事实。13 条评论，是 Agent 可观测性问题的典型代表。

**2. [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 利用模型 bash 原生能力 + 零依赖 OS 沙箱（P2）**
社区提出充分发挥 Gemini 3 模型对 POSIX 工具链（grep/sed/awk）的原生偏好，同时通过沙箱保证安全。方向性很强的大型 enhancement。

**3. [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist agent 永久挂起（P1，👍8）**
通才 agent 接管后连创建文件夹这类简单操作都会挂起，用户等待一小时无响应。8 个 👍 说明影响面广。

**4. [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知的文件读取/搜索/代码库映射评估（EPIC）**
探索用 AST 工具精确读取方法边界，减少错位读取带来的 token 浪费，配套调查 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) 推荐以 tilth/glyph 为起点。

**5. [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 不主动使用 skills 和 sub-agents（P2）**
用户反馈自定义 skill 几乎从不被自主调用，只有显式指令才触发。这是 Agent 调度策略的核心痛点。

**6. [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 无视 settings.json 配置（P2）**
`maxTurns` 等配置被硬编码默认值覆盖。好消息是对应修复 PR [#30067](https://github.com/google-gemini/gemini-cli/pull/30067) 已提交（见下文）。

**7. [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 工具数 > 128 时触发 400 错误（P2）**
Agent 缺乏工具范围智能限制，对重度 MCP 用户是硬性阻断问题。

**8. [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) Agent 应阻止/抑制破坏性操作（P2）**
模型在复杂 git 操作中偶尔使用 `git reset --force` 等危险命令，社区要求更安全的行为约束。

**9. [#21335](https://github.com/google-gemini/gemini-cli/issues/21335) /compress 压缩结果不持久化（P2）**
会话 resume 后压缩历史丢失，token 节省效果归零，直接影响长会话成本。

**10. [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) get-shit-done output hook 导致崩溃（P1）**
在打印用户总结时稳定触发崩溃，属于稳定性关键缺陷。

---

## 🔧 重要 PR 进展

**1. [#30067](https://github.com/google-gemini/gemini-cli/pull/30067) fix(browser): Browser Agent 遵循 settings.json 覆盖**
工厂函数从硬编码默认值改为使用合并后的定义，修复 #22267。今日新提交。

**2. [#30020](https://github.com/google-gemini/gemini-cli/pull/30020) fix(core): 重试时丢弃失败尝试的流式 tool calls**
中流重试导致前端执行两次工具调用（含副作用命令）的严重问题修复，架构级改动。

**3. [#29901](https://github.com/google-gemini/gemini-cli/pull/29901) feat(acp): 允许客户端在运行中转向（steering）**
ACP 客户端（Zed/JetBrains/VS Code）可在不取消 turn 的情况下插入用户消息，对齐终端端的 `modelSteering` 能力。

**4. [#30051](https://github.com/google-gemini/gemini-cli/pull/30051) fix(cli): headless 中断时终止活动 shell 并持久化工具调用**
修复 `gemini -p --yolo` 被 SIGINT 后 shell 命令残留、退出码异常的问题，headless 场景刚需。

**5. [#29800](https://github.com/google-gemini/gemini-cli/pull/29800) fix(core): Auto 配额耗尽时跨模型层级回退（Pro ↔ Flash）**
修复 Auto 模式在硬配额耗尽后会话直接死掉的问题，改善免费额度用户体验。

**6. [#29799](https://github.com/google-gemini/gemini-cli/pull/29799) fix(cli): 保留配额中断的会话历史**
配额/取消中断时保留最后一条用户 prompt 和已完成的工具轮次，避免可恢复历史被清理。

**7. [#30058](https://github.com/google-gemini/gemini-cli/pull/30058) fix(core): Whisper 模型下载中断不再被误判为已安装**
残留的部分下载文件导致 `isModelInstalled()` 误报，语音功能相关。

**8. [#29778](https://github.com/google-gemini/gemini-cli/pull/29778) fix(acp): 发送给模型前截断工具输出（已合并）**
ACP 模式下大 shell 输出曾完整送达模型，可导致 400 超限错误。

**9. [#30068](https://github.com/google-gemini/gemini-cli/pull/30068) fix(cli): 转发 contextManagement 设置到 core**
配置的 40 万 token 输出遮蔽阈值被静默丢弃、退回 5 万默认值的问题修复。

**10. [#30070](https://github.com/google-gemini/gemini-cli/pull/30070) fix(cli): 保留执行中的 subagent 工具调用状态**
修复无需审批直接执行的 subagent 调用从 UI 状态丢失、任务树无法构建嵌套结构的问题。

⚠️ **安全警示**：[#30066](https://github.com/google-gemini/gemini-cli/pull/30066)、[#30064](https://github.com/google-gemini/gemini-cli/pull/30064)、[#30065](https://github.com/google-gemini/gemini-cli/pull/30065) 为针对 CI Chained E2E 流程的**安全探测 PoC PR**，作者自述为 Google OSS VRP 报告的一部分，演示 fork 分支代码可在自托管 runner 上执行并访问环境变量。维护者应关注供应链安全。

---

## 📈 功能需求趋势

1. **Agent 编排与调度**：sub-agent 自主调用率低、并行协作、共享内存、轨迹可视化（#21968、#18287、#22598）——Agent 框架能力是当前最大需求方向
2. **上下文与 token 效率**：AST 感知读取、surgical reads、持久化任务追踪替代 in-context todo（#22745、#19561、#18836）
3. **安全与沙箱**：OS 级沙箱、破坏性命令抑制、per-workspace 策略（#19873、#22672、#18397）
4. **稳定性与可观测性**：挂起、误报成功、bug report 缺 subagent 上下文（#21409、#22323、#21763）
5. **非交互/ACP 集成**：headless 信号处理、客户端 steering、输出截断（#30051、#29901、#29778）

---

## ⚠️ 开发者关注点

- **Sub-agent 可靠性是最大痛点**：挂起、误报成功、上下文缺失、配置不生效等 P1 问题集中爆发，且多数处于 `need-retesting` 状态
- **配置静默失效**频发：settings.json 覆盖被忽略（Browser Agent）、contextManagement 阈值被丢弃，用户配置不生效且无提示
- **会话持久化薄弱**：/compress 结果、配额中断的历史均不持久化，长会话成本与连续性问题突出
- **工具数量上限**：MCP 重度用户撞上 128 工具限制，需要智能工具筛选机制
- **CI 供应链安全**：多个探测 PR 暴露自托管 runner 的潜在风险，社区贡献流程的安全加固值得关注

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-01 | 数据来源：github.com/github/copilot-cli**

---

## 1. 今日速览

昨日发布 **v1.0.106-1**，修复了 `apply_patch` 混合换行符（LF/CRLF）重写问题，并改进了 GHES 企业实例主机配置。社区方面，Windows 平台问题集中爆发（无效 PowerShell、OpenWith 弹窗、WSL2 keep-alive 失效），同时 #5205（上下文 rollover 失败）被关闭后社区反馈问题在 1.0.105 上复现，新开 #5312 追踪，值得关注。

---

## 2. 版本发布

### [v1.0.106-1](https://github.com/github/copilot-cli/releases)
**Fixed**
- `apply_patch` 现在会保留文件中未修改行的原始换行符（LF/CRLF 混合文件不再被整体重写为首行的换行风格）
- `COPILOT_PROVIDER_GHES_HOST` 现在接受实例的浏览器地址（如 `https://ghes.example.com`），降低企业版配置门槛

---

## 3. 社区热点 Issues

1. **[#2776](https://github.com/github/copilot-cli/issues/2776)** Shift+Enter 直接提交 prompt 而非换行（8 评论）
   最热门开放 issue。多行输入是高频刚需，当前行为导致未完成的 prompt 被意外提交，交互体验痛点明显。

2. **[#4994](https://github.com/github/copilot-cli/issues/4994)** [已关闭] MCP OAuth 回归：每次 ACP 会话都弹出授权页（8 👍）
   1.0.88→1.0.89 引入的回归，有效 token 被回以 401。已关闭，说明团队修复了 ACP 集成中的重要痛点。

3. **[#4097](https://github.com/github/copilot-cli/issues/4097)** [已关闭] apply_patch 将被删除的二进制文件存入会话历史，永久超出 CAPI 5MB 限制（5 评论）
   影响长会话可用性，`/compact` 也无法恢复。关闭意味着补丁工具的内存管理有改进。

4. **[#5312](https://github.com/github/copilot-cli/issues/5312)** [新] #5205 被无说明关闭后 rollover 失败在 1.0.105 复现
   社区对“无关联 PR/commit 即关闭 issue”的流程提出质疑，透明度问题值得维护方重视。

5. **[#5256](https://github.com/github/copilot-cli/issues/5256)** 未登录时 `gh auth token` 无退避地紧密循环重试，CPU 飙高
   BYOK 用户受影响明显，认证探测缺乏 backoff 是稳定性隐患。

6. **[#4537](https://github.com/github/copilot-cli/issues/4537)** [已关闭] ACP 模式自动批准工具调用，不再发送 `session/request_permission`（#845 回归）
   安全敏感问题：客户端失去审批机会。关闭或已修复，ACP 集成方需验证。

7. **[#5112](https://github.com/github/copilot-cli/issues/5112)** 支持 OSC 7501 程序状态协议（3 👍）
   让终端实时显示 agent 状态（working/blocked），终端集成生态方向的有益提案。

8. **[#5302](https://github.com/github/copilot-cli/issues/5302)** Windows 上 Agent 频繁生成无效 PowerShell
   基于 2,164 次真实 shell 调用的日志分析，报告质量高，反映 Windows 平台一等公民支持仍欠缺。

9. **[#5304](https://github.com/github/copilot-cli/issues/5304)** WSL2 中 `/keep-alive` 无法阻止 Windows 宿主机休眠
   `systemd-inhibit` 在 WSL 下不生效，长时间 agent 任务被休眠中断。

10. **[#5301](https://github.com/github/copilot-cli/issues/5301)** 内置 `web_search` 工具近半数调用 504 超时（远程 GitHub MCP 网关 ~120s 超时）
    核心内置工具的可靠性问题，影响日常使用。

---

## 4. 重要 PR 进展

过去 24 小时仅 1 条 PR 更新：

- **[#5310](https://github.com/github/copilot-cli/pull/5310)** Fix container smoke-test workspace permissions（@devm33）
  修复 amd64/arm64 冒烟测试失败：临时工作区 `0700` 权限阻止镜像运行用户（UID 10001）访问，并调整了 root 初始化 Git 的问题。属于社区贡献的 CI 修复。

---

## 5. 功能需求趋势

- **ACP / 非交互集成**：模型列表暴露（#4880）、权限审批回归（#4537）、OAuth（#4994）—— 编辑器/Agent 框架集成是持续热点
- **Windows / WSL 平台支持**：PowerShell 质量（#5302）、OpenWith 弹窗（#5299）、keep-alive（#5304）集中爆发
- **权限与安全控制**：仓库级版本化命令权限（#5297）、路径误报审批（#5311、#4601）、`--available-tools` 空值语义（#5306）
- **会话与上下文管理**：rollover 失败（#5312）、`/rename` 持久化（#2622）及 VS Code 支持（#4244）
- **插件/Hook 生态**：slash-command 调用 hook、异步命令 hook（#5305），对齐 Claude Code 插件能力
- **终端集成**：OSC 7501 状态上报（#5112）
- **企业/新模型**：GHES 配置（本次发布已改）、Fusion 模型别名依赖未文档化 flag（#5298）

---

## 6. 开发者关注点

1. **长会话稳定性**：上下文 rollover / 5MB 限制问题反复出现，agent 长任务可靠性是核心痛点
2. **认证与资源消耗**：无退避的 auth 重试循环（#5256）在 BYOK 场景下造成 CPU 浪费
3. **权限提示过度/误报**：仓库内路径反复要求批准，破坏 flow；同时 autopilot 又自动回复 `ask_user`（#5276），权限模型两端都不理想
4. **issue 关闭流程透明度**：#5205 无说明关闭引发 #5312 质疑，社区期待关联 PR/commit
5. **Windows 体验差距**：从 PowerShell 生成质量到路径含空格的弹窗问题，Windows 用户摩擦明显多于 macOS/Linux

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-11-01

## 一、今日速览

今日无新版本发布，但社区活动非常活跃：Zen 免费额度问题（#59387）评论数飙至 **167 条**，成为最大热点，大量用户反馈 "Free usage exceeded" 及额度重置失效。PR 侧 @rekram1-node 单日提交了 **8+ 个 `@opencode/ai` 架构级重构 PR**，覆盖事件流、传输层、错误处理和会话预热，是今日代码侧最值得关注的主线。

---

## 二、版本发布

过去 24 小时无新 Release。

---

## 三、社区热点 Issues（Top 10）

1. **#59387 [zen] Free tier 问题汇总帖**（OPEN，167 评论）
   免费层所有报错（额度耗尽、重置失效、版本提示）的官方汇总帖，是当前社区情绪的核心出口。👉 [链接](https://github.com/anomalyco/opencode/issues/59387)

2. **#59293 subagent sessionID 续接必失败，ID 被截断为 "ses"**（OPEN）
   无论传入什么 sessionID 都被截断，子代理会话无法续接；同签名问题 #60493 已被复现关闭，修复在途。👉 [链接](https://github.com/anomalyco/opencode/issues/59293)

3. **#60690 Upstream request failed（Go 订阅用户）**（CLOSED）
   付费订阅用户使用 DeepSeek/Kimi K3 持续报上游请求失败，与免费层问题叠加引发信任担忧。👉 [链接](https://github.com/anomalyco/opencode/issues/60690)

4. **#60700 ECONNRESET / "Failed to drain Session"（Desktop 2.2.3 Windows）**（CLOSED）
   代理网络环境下所有模型请求均失败，影响面广。👉 [链接](https://github.com/anomalyco/opencode/issues/60700)

5. **#60684 免费额度限制在数周未用后仍然存在**（CLOSED）
   升级 v2.2.1 后所有免费模型立即提示额度用尽，VPN 也无效——免费层问题又一佐证。👉 [链接](https://github.com/anomalyco/opencode/issues/60684)

6. **#60711 Copilot 模型在共享服务中同步失败**（CLOSED）
   仅 `--standalone` 模式正常，桌面端/TUI 使用的后台服务中模型反复丢失，影响 GitHub Copilot 集成用户。👉 [链接](https://github.com/anomalyco/opencode/issues/60711)

7. **#60735 Desktop 项目选择器无法进入嵌套子目录**（OPEN）
   “添加项目”无法选中子文件夹，阻碍多项目工作流。👉 [链接](https://github.com/anomalyco/opencode/issues/60735)

8. **#37173 问题弹窗遮挡正文，无法阅读**（OPEN，7 月至今未关）
   大字号下 agent 提问模态框遮挡上下文，无障碍性相关，长期未解决。👉 [链接](https://github.com/anomalyco/opencode/issues/37173)

9. **#46386 Agent 未经确认执行 InfluxDB 破坏性命令致数据丢失**（CLOSED）
   安全类严重事故：DROP MEASUREMENT 未触发审批，凸显危险命令防护需求。👉 [链接](https://github.com/anomalyco/opencode/issues/46386)

10. **#60215 TUI 终端光标绘制在剪贴板通知之上**（CLOSED）
    已复现的小型渲染 bug，说明近期对 UI 细节的清理在推进。👉 [链接](https://github.com/anomalyco/opencode/issues/60215)

> 另注：多个 2.0 时代的老 issue（#42960、#42856、#41746、#37239 等）今日集中批量关闭，显示 v2 迁移期积压问题正在清仓。

---

## 四、重要 PR 进展（Top 10）

1. **#60812 fix(ai): 事件流修复** — `ai.loop` 区分 step 完成与流完成、补全 provider-error 事件链路。👉 [链接](https://github.com/anomalyco/opencode/pull/60812)

2. **#60970 feat(ai): 统一 headers/fetch/timeout 到每次请求** — 修复图片、decision 等请求静默忽略超时的问题。👉 [链接](https://github.com/anomalyco/opencode/pull/60970)

3. **#60808 feat(ai): AIError 增加 status/code/isRetryable/retryAfterMs** — 错误处理标准化，利好上层重试逻辑。👉 [链接](https://github.com/anomalyco/opencode/pull/60808)

4. **#60797 fix(ai): 循环可从非法 tool 输入中恢复** — 非法 JSON 参数回传给模型重试而非终止循环，显著提升健壮性。👉 [链接](https://github.com/anomalyco/opencode/pull/60797)

5. **#60025 + #60969 会话预热按 provider/model 配置并按缓存 TTL 自适应** — 避免对本地模型和长缓存模型无谓 ping。👉 [链接](https://github.com/anomalyco/opencode/pull/60025)

6. **#60947 fix(core): 重试被输出上限截断的压缩摘要** — 修复上下文压缩失败的常见根因（#56862）。👉 [链接](https://github.com/anomalyco/opencode/pull/60947)

7. **#60073 fix(core): 运行中的终端不被驱逐** — 防止活跃终端会话被回收。👉 [链接](https://github.com/anomalyco/opencode/pull/60073)

8. **#60974 feat(core): 每个 HTTP 请求与会话轮次独立 trace** — 可观测性大升级（已合并）。👉 [链接](https://github.com/anomalyco/opencode/pull/60974)

9. **#60780 refactor(ai): AWS/Google 认证库改为可选 peer 依赖** — 减小安装体积。👉 [链接](https://github.com/anomalyco/opencode/pull/60780)

10. **#59403 refactor(nix): 依赖从 bun.lock 获取** — 一次性关闭 3 个 Nix 构建相关 issue。👉 [链接](https://github.com/anomalyco/opencode/pull/59403)

> 其他：#60977（空回车误中断会话）、#56088（ACP 关闭清理）等修复已合并；#60726 的 IBKR 交易仪表盘 PR 标记 `needs:compliance`，社区炫技与合规边界值得关注。

---

## 五、功能需求趋势

- **Zen/订阅服务的可靠性与透明度**：免费层、付费上游失败、额度重置是当前最强声量，涉及计费、配额、错误提示全链路。
- **网络与代理环境兼容性**：ECONNRESET、NaiveProxy/VPN 场景问题集中出现，Windows 端尤甚。
- **子代理/多会话编排**：sessionID 续接、会话预热、会话驱逐策略，社区对复杂 agent 工作流需求上升。
- **可观测性**：trace 改造 PR 的密集合入说明官方也在加大投入。
- **本地/自定义模型接入**：OpenAI 兼容 provider 的目录加载、camelCase 序列化等历史问题持续被反馈。
- **桌面端体验**：启动性能、UI 遮挡、项目选择器等 Windows 桌面问题占比高。

---

## 六、开发者关注点

1. **稳定性优先于新功能**：后台服务重启循环、启动挂起、健康检查超时（#59995、#41746）是桌面端最大痛点。
2. **安全防护缺位**：破坏性命令未经审批即执行（#46386），社区需要更严格的命令白名单/审批机制。
3. **中断与长命令控制**：Esc 中断失效、bash 工具无法停止 dev server 类命令，交互控制仍不完善。
4. **错误信息可读性**：schema decode 等模糊报错让排障困难（#60795 已修），社区期待更清晰的失败语义。
5. **v1 → v2 迁移回归**：skills 目录、自定义 provider 等兼容性回归问题批量关闭中，建议 v2 用户保持版本更新并关注 changelog。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-11-01）

## 一、今日速览

今日无新版本发布，社区活动聚焦于 **CI/CD 基础设施稳定性**与 **Managed Agent（托管代理）体系**建设。多条高热 Issue 指向 CI 运行器容量不足、磁盘耗尽和环境配置缺失等问题，其中 Managed Agent gate 失败追踪 Issue（#14724）评论数已达 105 条。同时，Web Shell、Skills 系统和子会话管理等方向持续有高质量 PR 提交。

---

## 二、版本发布

过去 24 小时无新 Release。

---

## 三、社区热点 Issues

1. **[#14724](https://github.com/QwenLM/qwen-code/issues/14724)** Main CI 失败：Managed Agent gate 无明确失败测试（105 评论）
   持续近两周的高热追踪 Issue，反映主分支 CI 长期不稳定，是社区当前最痛的工程问题。

2. **[#13078](https://github.com/QwenLM/qwen-code/issues/13078)** 每日依赖 CVE 审计失败（37 评论）
   定时安全审计持续失败，可能涉及新的高危漏洞或 npm audit 端点不可用，安全风险需关注。

3. **[#15173](https://github.com/QwenLM/qwen-code/issues/15173)** Main CI 失败：E2E Tests 上下文压缩交互测试挂掉（23 评论）
   Docker sandbox 环境 Linux 分片失败，指向 context-compress 交互逻辑的回归。

4. **[#14859](https://github.com/QwenLM/qwen-code/issues/14859)** 追踪 CI Runner 容量与主分支独立验证（11 评论，P2）
   维护者 @yiliang114 系统性梳理 CI 容量问题，此前帖中混合了不完整运行样本的估算数据已被更正，是理解 CI 困境的关键线索。

5. **[#16005](https://github.com/QwenLM/qwen-code/issues/16005)** Runner 池某主机缺少 Node.js 导致 Lint & Static 必过检查误红（5 评论，P2）
   基础设施缺陷直接污染代码质量信号，与代码本身无关的强制检查失败亟需修复。

6. **[#16003](https://github.com/QwenLM/qwen-code/issues/16003)** CI Runner 磁盘耗尽：RocketMQ 拒绝写入、Java lane 无法创建临时目录（2 评论，P2）
   跨三天、跨 Runner 池复发，故障摘要中完全看不到磁盘问题，诊断成本高。

7. **[#12514](https://github.com/QwenLM/qwen-code/issues/12514)** 会话 commit 注册未覆盖所有提交路径，导致误报"非本会话代理产生"（5 评论，P2，安全）
   Shell/Git 范围的安全机制误判，会错误阻断合法的 amend 操作。

8. **[#15276](https://github.com/QwenLM/qwen-code/issues/15276)** Windows 桌面更新失败：node.exe 被捆绑运行时锁定（4 评论，P1）
   直接影响 Windows 桌面用户的应用内升级体验，P1 级用户侧 bug。

9. **[#15919](https://github.com/QwenLM/qwen-code/issues/15919)**（已关闭）捆绑的 fast-uri 3.1.0 存在 CVE 风险（3 评论，P2，安全）
   @modelcontextprotocol/client 预打包依赖导致此前的升级补丁未生效，供应链安全问题已处理关闭。

10. **[#16020](https://github.com/QwenLM/qwen-code/issues/16020)** Web Shell 请求增加 ChatGPT 风格的"待处理活动"视图（2 评论）
    UI 方向的代表性需求：集中呈现需要输入/审批/关注的会话，反映多会话并行工作流的管理诉求。

---

## 四、重要 PR 进展

1. **[#14952](https://github.com/QwenLM/qwen-code/pull/14952)** 文件爬虫改用捆绑的 ripgrep
   `@` 文件爬虫此前裸调 `rg`，仅在 PATH 碰巧含 vendored 二进制时才能工作，此修复消除一大环境兼容坑。

2. **[#15466](https://github.com/QwenLM/qwen-code/pull/15466)** 新增用户级 Skill 激活路由（自动修复接管中）
   新增 `PUT /skills/:name/activation` 单个与批量路由，Skills 体系 API 持续完善。

3. **[#15982](https://github.com/QwenLM/qwen-code/pull/15982)** `/btw` 侧边回答限高可滚动
   长回答不再无限撑大底部控制区，占用至多半个终端，支持滚轮与 Shift+方向键。

4. **[#15286](https://github.com/QwenLM/qwen-code/pull/15286)** SDK Java 解析器簿记与自建 jar 移出主机缓存
   Job 本地 Maven 仓库不再与主机缓存共享可变 inode，直接针对 CI Java lane 的顽疾。

5. **[#14140](https://github.com/QwenLM/qwen-code/pull/14140)** Local Control 接受 RFC 1918/3927 之外的显式地址
   尊重操作者意图，支持使用公网段编号内网的企业环境。

6. **[#14335](https://github.com/QwenLM/qwen-code/pull/14335)** 已完成子会话按 TTL 自动清理
   新增 `serve.subSessionCompletionTtlHours` 设置，默认保留，为长时运行 daemon 减负。

7. **[#15440](https://github.com/QwenLM/qwen-code/pull/15440)** Managed Agent 子会话答案拼接方式与 journal 对齐
   修正父会话接收到的子会话最终答案文本组装逻辑。

8. **[#15684](https://github.com/QwenLM/qwen-code/pull/15684)** 物化惰性外部工作区
   仅操作员可用：将已注册的外部存储别名物化为可发现 Workspace，单事务幂等实现。

9. **[#15318](https://github.com/QwenLM/qwen-code/pull/15318)** 等价模型选择器共享压缩缓存
   显式选择当前模型做压缩时不再失去缓存共享资格，优化 token 成本。

10. **[#15928](https://github.com/QwenLM/qwen-code/pull/15928)** Web Shell 新增宿主挂载入口
    `renderManagedAgentWebShell` 与 `renderWebShellApp` 让非 React 宿主无需手绘 UI 即可嵌入完整 Web Shell。

---

## 五、功能需求趋势

- **会话与工作区管理**（最热）：子会话 TTL 清理、批量工作区快照、绑定会话可发现性、活动视图集中待办——多会话/多工作区并行工作流是核心诉求。
- **Managed Agent / 后台自动化**：Harness 池会话生命周期、外部工作区物化、A3 审批崩溃屏障测试强化，托管化是明确的 roadmap 主线。
- **Skills 生态**：用户级激活路由、磁盘直接创建 Skill 的目录自动同步，正在补齐配置与运行时的一致性。
- **隐私与可控性**：禁止托管安装刷新 models.dev 目录并尊重隐私 opt-out（#16006）。
- **Web Shell 触屏/窄屏体验**：手机键盘误弹出、紧凑布局导航缺失等移动端适配需求上升。

---

## 六、开发者关注点

1. **CI 基础设施是当前最大痛点**：容量不足、磁盘耗尽、Runner 环境不一致（缺 Node.js）、必过检查被基础设施误红——多个 P1/P2 Issue 汇聚于此，且故障信息常被掩盖（#16003 的磁盘问题在摘要中不可见），定位成本高。
2. **供应链与安全**：CVE 审计失败、间接依赖未随直接依赖升级（fast-uri 案例）、commit 归属误判，安全相关 Issue 密度明显偏高。
3. **Windows 支持短板**：桌面更新文件锁、clean 脚本依赖 `rm -rf`、文档站本地预览不可用——多个 PR 集中修复 Windows 兼容性。
4. **无 TTY 场景健壮性**：stdin 非 terminal 时的挂起/静默成功问题被系统性修复（consent 提示、marketplace 选择器、extensions update 退出码），CLI 在脚本/CI 环境下的行为正在全面收紧。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*