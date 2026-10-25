# AI CLI 工具社区动态日报 2026-10-26

> 生成时间: 2026-10-25 22:31 UTC | 覆盖工具: 7 个

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
**日期：2026-10-26 | 数据来源：各项目 GitHub 公开动态**

---

## 一、生态全景

AI CLI 工具已全面进入“多 agent 编排 + 长时自主运行”阶段，各工具的功能重心从单轮问答转向后台任务、子代理、fleet 管理与跨会话协作。与之伴随的是一类新型系统性缺陷的集中暴露：长会话内存泄漏（Copilot CLI 37 GiB）、后台任务被静默 kill（Claude Code exit 144）、子代理挂起与状态误报、compaction 后 token 重复计数。同时，ACP 协议成为编辑器集成的事实标准（Gemini、Copilot、Qwen Code 均在推进），跨平台（Windows/Linux）支持质量成为用户信任的主要分水岭。商业化层面，配额、限流与计费透明度在 Codex 和 OpenCode 社区引发付费用户不满，值得各厂商警惕。

---

## 二、各工具活跃度对比

| 工具 | 今日热点 Issues | 今日活跃 PR | Release | 核心焦点 |
|---|---|---|---|---|
| **Claude Code** | ~20+（多为历史 stale 关闭） | 1（文档修正，已关闭） | 无 | 批量 stale 关闭高价值 bug 引发社区担忧 |
| **OpenAI Codex** | ~15+（26 条更新中高度活跃） | 0 | 无 | Windows 平台问题（60% 热门 issue 带 windows-os 标签）、26.1021 扩展回归 |
| **Gemini CLI** | 10 热点（含 1 新提） | **10+（最活跃）** | v0.67.0-nightly | 子代理稳定性 P1 簇 + Windows 兼容性 PR 密集 |
| **Copilot CLI** | 26 条更新（2 条 P0 级同日新报） | 0 | 无 | 1.0.103 内存暴涨 + 会话锁死、Entra 认证 |
| **Kimi Code CLI** | 0 | 0 | 无 | 无活动 |
| **OpenCode** | 10 热点（10+ 配额故障类涌入） | 10（含批量关闭重整） | 无 | 免费额度系统故障风暴、数据丢失级回滚 bug |
| **Qwen Code** | 10 热点（3 条 P1 发布链路） | 10+（修复响应迅速） | 无 | v0.26.1 发布后遗症 + compaction/hook 修复 |

**要点**：Gemini CLI 与 Qwen Code 的 PR 活跃度显著领先，呈“开源社区驱动”模式；Claude Code/Codex/Copilot 为闭源核心+issue tracker 模式，开发活动不可见；OpenCode 正经历配额系统危机与贡献流程重整的双重压力。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **长会话稳定性与资源管理** | Claude Code、Copilot CLI、OpenCode、Qwen Code | 后台任务 30min SIGKILL、内存泄漏 37 GiB、会话锁超时、compaction 后 token 重复计数——“跑数小时不崩”是共性最强诉求 |
| **子代理可靠性** | Gemini、OpenCode、Claude Code、Codex | 挂起、状态误报（GOAL 成功实为 MAX_TURNS 中断）、父会话收到空结果、agent 可达性退化 |
| **ACP / 编辑器集成** | Gemini、Copilot CLI、Qwen Code | 运行中转向、`usage_update` 事件、rewind identity——Zed/JetBrains/VS Code 用户是推动主力 |
| **上下文/Token 效率** | Copilot CLI、Gemini、Qwen Code | 固定注入 40k token、大文件“灌水”+15k tokens/turn、AST 感知精准读取、handover continuation |
| **Windows/Linux 平台支持** | 全部主流工具 | MSIX 安装损坏、WSL 管理、Wayland 兼容、路径归一化——Windows 是所有工具的共同债务 |
| **配额与计费透明度** | Codex、OpenCode、Copilot CLI | 剩余配额可视化、付费用户被误判/限流、Pro 用户 HTTP 429 |
| **记忆/指令遵循可靠性** | Claude Code、Gemini | 记忆写入但不被读取、自定义 skills 需显式触发 |
| **可验证输出与可观测性** | Codex、Gemini、Qwen Code | 带证据的结构化完成报告（防“幻觉式完工”）、`/bug` 报告缺子代理上下文、MCP stderr 诊断 |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 多 agent 编排、Cowork 协作、记忆系统、安全护栏 | 重度专业开发者、多会话工作流 | 闭源一体化，Desktop+CLI 双形态，功能最广但工程化保障滞后 |
| **OpenAI Codex** | Computer Use、dot 远程连接、Cloud 任务、GitHub 集成 | Pro 付费用户、云端+本地混合场景 | 重云端协同，但 Windows 桌面质量是明显短板 |
| **Gemini CLI** | 子代理体系、AST 感知工具、OS 沙箱、ACP 协议 | 开源社区、编辑器集成用户、安全敏感场景 | 最开放：nightly 日更、外部 PR 活跃、Termux 等长尾平台支持 |
| **Copilot CLI** | 企业集成（Entra/受管策略）、MCP、headless 自动化 | 企业用户、GitHub 生态深度用户 | 企业级合规路线，但认证链路和长会话资源管理是硬伤 |
| **OpenCode** | 免费模型接入、Code Mode 沙箱、插件生态 | 成本敏感用户、多 provider 切换者 | 开源 + 免费额度获客，但配额系统可靠性正在反噬信任 |
| **Qwen Code** | 发布工程、Runtime Broker/K8s 分发、Web Shell、自主修复（takeover） | 自动化 CI/DevOps 场景、国内生态 | 工程化最深的路线（SDK/managed runtime/多语言），供应链复杂度高 |

---

## 五、社区热度与成熟度

- **高热度 + 高成熟度**：**Claude Code / Codex**——issue 讨论量与 👍 数领先（WSL issue 84 条评论、54 👍），但响应节奏存疑（Claude Code 批量 stale 关闭带 repro 的 bug；Codex WSL 问题近两月未修）。
- **最活跃开发迭代**：**Gemini CLI**（唯一日更 nightly，10+ 外部 PR/日）与 **Qwen Code**（P1 修复当天提交 PR，如 #15558）——典型的快速迭代 + 社区共建阶段。
- **危机中的社区**：**OpenCode**——48 小时 10+ 配额故障 issue 涌入且官方无统一回应，付费用户被误判属信任红线。
- **早期/沉寂**：**Kimi Code CLI** 无活动，社区生态尚未起量。
- **共性信任损耗模式**：Codex（更新即破坏）、Copilot CLI（呼吁 Stable 通道）、OpenCode（Desktop 回归需降级）均出现“锁版本使用”的社区应对策略，值得所有厂商反思发布节奏。

---

## 六、值得关注的趋势信号

1. **可靠性正在取代功能成为竞争主轴**：多 agent/长任务功能各家都已上线，但今天的 issue 榜单几乎全是“跑不稳”——内存泄漏、静默 kill、状态误报、agent 不可达。谁先解决长时运行的工程化保障，谁就赢得下一阶段口碑。

2. **ACP 正成为编辑器集成的事实标准**：Gemini（运行中转向已落地）、Copilot CLI（usage_update 缺失）、Qwen Code（rewind identity）均在向 ACP 对齐。构建 agent 工具的团队应优先支持 ACP 而非私有协议。

3. **可验证 agent 输出是下一个功能高地**：Codex #36718（需求→证据映射）、Gemini 子代理状态可信度、Qwen 循环防护失效，共同指向“agent 自称完成 ≠ 完成”。带证据的结构化结果与循环检测将是选型关键指标。

4. **上下文管理进入精细化时代**：AST 感知读取、Tactful Extraction、handover continuation、compaction 去重——token 成本与 context rot 驱动工具从“整文件灌入”转向“按需精准读取”，重度用户的成本差距将显著拉大。

5. **Windows 是全行业的共同债务**：约六成工具的热门 issue 涉及 Windows（MSIX、WSL、路径、Entra）。Windows 优先的团队选型时应重点验证各工具的平台成熟度，macOS 用户当前体验普遍领先。

6. **发布节奏与稳定性的矛盾显性化**：Stable 通道诉求（Copilot CLI）、锁版本策略（社区自保）、发布链路故障（Qwen v0.26.1 连锁问题）表明快速迭代模式的边际成本正在上升，分通道发布可能成为标配。

**给开发者的实操建议**：长时任务做好进程监控与定期重启预案；Windows 环境优先实测再采用；重度 MCP/多 provider 用户关注 token 成本结构；企业用户验证 Entra/受管策略链路后再升级版本。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> **数据说明**：本报告基于 anthropics/skills 仓库截至 2026-10-26 的数据。因本次数据中 PR 评论数均为空值（undefined），PR 排行依据为**更新活跃度、与热门 Issue 的关联度及功能影响力**综合判断；Issue 部分有真实评论数，可信度较高。

---

## 一、热门 Skills 排行（PR）

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder 修复** — [#1742](https://github.com/anthropics/skills/pull/1742) | 修复 `mcp>=2.0` 中 `streamable_http_client` 重命名及自定义 Header 配置问题；关联 Issue [#1390](https://github.com/anthropics/skills/issues/1390)（评估脚本对真实 MCP 服务器得分 0/N）。mcp-builder 是官方最核心的元技能之一，社区修复意愿强烈 | OPEN |
| 2 | **skill-creator 系列修复** — [#1298](https://github.com/anthropics/skills/pull/1298)、[#1997](https://github.com/anthropics/skills/pull/1997)、[#1681](https://github.com/anthropics/skills/pull/1681) | 触发评估在 Windows/多进程下的误报（#1298）、YAML frontmatter 解析丢失引号（#1997）、package_skill.py 独立执行报错（#1681）。关联热门 Issue [#556](https://github.com/anthropics/skills/issues/556)（评估触发率 0%）与 [#202](https://github.com/anthropics/skills/issues/202)。skill-creator 是生态"母技能"，修复需求最集中 | OPEN |
| 3 | **notion-spec-to-implementation + quantitative-resume-auditor** — [#1245](https://github.com/anthropics/skills/pull/1245) | 将产品/技术规格文档转化为 Notion 可执行任务；跨度长（6 月创建、10 月仍活跃），是工作流自动化方向的代表作 | OPEN |
| 4 | **webapp-testing 安全修复** — [#1980](https://github.com/anthropics/skills/pull/1980)、[#1976](https://github.com/anthropics/skills/pull/1976) | 消除 `shell=True` 命令注入风险（CWE-78）、修正元素识别。webapp-testing 脚本层正经历一轮社区安全审计 | OPEN |
| 5 | **md2video-audio** — [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown 一键编译为带真人配音的 MP4 视频（Marp + TTS），零成本内容创作方向 | OPEN |
| 6 | **pyxel 复古游戏开发** — [#525](https://github.com/anthropics/skills/pull/525) | 由 Pyxel 作者本人提交，含无头运行与帧级验证指导；挂起 7 个月仍持续更新，是"上游作者贡献技能"的典型 | OPEN |
| 7 | **document-typography** — [#514](https://github.com/anthropics/skills/pull/514) | 解决 AI 生成文档的孤行、寡段、编号错位等排版问题——切中所有用户但很少被主动要求的痛点 | OPEN |
| 8 | **scnet-hpc** — [#1615](https://github.com/anthropics/skills/pull/1615) | 面向 SCNet 超算集群的 SSH/Slurm 操作技能，代表科研 HPC 垂直方向 | OPEN |

---

## 二、社区需求趋势（Issues）

1. **安全与信任边界**（最高热度）：[#492](https://github.com/anthropics/skills/issues/492)（46 评论）——社区技能冒用 `anthropic/` 命名空间伪装官方，呼吁签名/命名空间治理；配套诉求见 eval-viewer XSS（[#1394](https://github.com/anthropics/skills/issues/1394)）。
2. **组织级技能分发**：[#228](https://github.com/anthropics/skills/issues/228)（17 评论，8 👍）——要求组织内共享技能库，替代当前"下载 .skill 文件走 Slack"的手工流程。
3. **技能评估工具链可靠性**：[#556](https://github.com/anthropics/skills/issues/556)（13 评论，7 👍）——`claude -p` 触发率 0%，评估框架失灵是 skill-creator 相关 PR 扎堆的根因。
4. **Agent 记忆与状态管理**：[#1329](https://github.com/anthropics/skills/issues/1329)——用符号记法压缩长程 agent 记忆，节省上下文。
5. **上下文经济学**：[#1487](https://github.com/anthropics/skills/issues/1487)——claude-api 技能单次注入 ~156k token 挤爆上下文，要求技能按需渐进加载。
6. **元技能/质量门禁**：[#1385](https://github.com/anthropics/skills/issues/1385)、[#412](https://github.com/anthropics/skills/issues/412)——推理质量门禁管道、agent 治理模式，社区自发探索"用 Skill 管 Skill"。

---

## 三、高潜力待合并 Skills（活跃 OPEN PR）

- **[#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder 兼容修复** —— 有明确关联 Issue（#1668/#1390），修复 MCP v2 破坏性变更，落地概率最高。
- **[#1997](https://github.com/anthropics/skills/pull/1997) skill-creator YAML 解析修复** —— 小而关键的 bug fix，由活跃贡献者提交。
- **[#1792](https://github.com/anthropics/skills/pull/1792) docx 超时误报成功修复** —— 关联 docx 系列质量 Issue（如 [#2018](https://github.com/anthropics/skills/issues/2018)），docx 是问题最密集的官方技能之一。
- **[#1980](https://github.com/anthropics/skills/pull/1980) webapp-testing 命令注入修复** —— 安全类修复，与社区安全主线契合，10-25 仍在更新。
- **[#525](https://github.com/anthropics/skills/pull/525) pyxel**、**[#514](https://github.com/anthropics/skills/pull/514) document-typography** —— 长期挂起但持续维护的新功能 PR，一旦官方放开外部贡献通道即有望合并。

---

## 四、生态洞察（一句话总结）

**社区最集中的诉求是"可信与可靠的技能基础设施"**：一方面要求治理命名空间冒用、脚本注入等安全问题（#492 等），另一方面迫切需要修好 skill-creator / mcp-builder / 评估工具链这批"生产技能的技能"，再辅以组织级分发和按需加载能力——生态已从"贡献新技能"阶段转向"治理与工程化"阶段。

---

# Claude Code 社区动态日报 — 2026-10-26

## 一、今日速览

过去 24 小时无新版本发布，仅 1 条 PR 更新（为 3 月提交的文档修正，现已关闭）。社区活动集中在 Issues 区：大批历史 Issue 因 stale 被批量关闭，其中包含多个高价值问题——后台任务被 30 分钟定时器静默 SIGKILL、Windows MSIX 自动更新损坏、UNC 路径导致聊天历史丢失等。新开 Issue 中 Linux/Wayland 平台兼容性问题值得关注。

## 二、版本发布

过去 24 小时无新 Release。

## 三、社区热点 Issues

1. **后台任务被精确 30 分钟定时器 SIGTERM（未文档化的 kill 路径，exit 144）** — [#84981](https://github.com/anthropics/claude-code/issues/84981)
   最受关注（10 条评论）。长会话中 `run_in_background: true` 的任务在精确 1800 秒后被引擎杀死且无 TaskSt 通知，对长时任务编排是致命隐患，属未文档化行为。

2. **Windows MSIX 自动更新损坏包，应用无法启动且修复失败** — [#84851](https://github.com/anthropics/claude-code/issues/84851)
   7 条评论。Windows 桌面端自动更新导致包进入 Modified/NeedsRemediation 状态，Repair 也失败，直接影响用户可用性。

3. **UNC 路径尾部分隔符归一化缺陷导致每日聊天历史丢失** — [#89283](https://github.com/anthropics/claude-code/issues/89283)
   带 data-loss 标签且有 repro。Desktop 为 UNC cwd 创建重复项目目录，历史记录被“分裂”，属数据丢失级严重问题。

4. **自动记忆系统跨会话不可靠生效** — [#75334](https://github.com/anthropics/claude-code/issues/75334)
   记忆被写入但模型不读取/不遵守，用户认为该功能“形同虚设”。与 [#84265](https://github.com/anthropics/claude-code/issues/84265)（单会话三次违反同一记忆规则）共同反映记忆机制是长期痛点。

5. **Cowork 会话中 artifact 三工具从健康 bridge 中选择性消失** — [#89120](https://github.com/anthropics/claude-code/issues/89120)
   2026-08-20 起 `create/update/list_artifacts` 在所有 Cowork 会话中缺失，其余 bridge 工具正常，疑似服务端工具下发问题。

6. **恢复会话时静默覆盖后台 agent 会话标题** — [#81899](https://github.com/anthropics/claude-code/issues/81899)
   Resume/attach 会用其他会话名重写 session title，破坏多会话工作流的可追溯性。

7. **多会话协作中 ListAgents 对等可达性在空闲后退化** — [#89882](https://github.com/anthropics/claude-code/issues/89882)
   长时间 orchestrator + 兄弟会话工作流中，空闲会话无法被可靠发现，影响多 agent 编排稳定性。

8. **Auto 权限分类器仅因 MCP 服务器名含 "production" 即拒绝只读调用** — [#89951](https://github.com/anthropics/claude-code/issues/89951)
   已配置 `--read-only` 的 Supabase MCP 仍被 auto 模式一刀切拒绝，2 个 👍，反映权限分类器过于粗暴。

9. **`/login` 报成功但凭据未持久化（Keychain 超时被误判为瞬态，跳过文件回退）** — [#89801](https://github.com/anthropics/claude-code/issues/89801)
   带 repro，macOS 认证链路中错误分类导致回退逻辑失效。

10. **Linux GNOME Wayland：Quick Entry 快捷键绑定成功但窗口不弹出** — [#104069](https://github.com/anthropics/claude-code/issues/104069)
    唯一 OPEN 的新鲜 Issue。GlobalShortcuts portal 已正确投递事件但 UI 无响应，是 Linux 桌面支持的代表性问题。

## 四、重要 PR 进展

过去 24 小时仅 1 条 PR 更新，无活跃开发 PR：

- **docs(plugin-dev): clarify skill naming in skill-development guide** — [#29757](https://github.com/anthropics/claude-code/pull/29757)
  修正 skill 开发指南中的命名示例（小写连字符），补充 skill 名与目录 kebab-case 标识符一致的元数据说明及 reviewer 检查项。Closes #24556，现已关闭。

## 五、功能需求趋势

- **Agent/Fleet 视图增强**：后台会话显示时间戳与耗时（[#84075](https://github.com/anthropics/claude-code/issues/84075)）、显示各 agent 所用模型（[#82282](https://github.com/anthropics/claude-code/issues/82282)）、PR 状态颜色保持（[#82052](https://github.com/anthropics/claude-code/issues/82052)）、消息跨视图同步（[#82216](https://github.com/anthropics/claude-code/issues/82216)）——多 agent 管理的可观测性是高频诉求。
- **记忆与指令遵循**：自动记忆可靠性、模型忽略用户规则（[#78375](https://github.com/anthropics/claude-code/issues/78375)、[#89950](https://github.com/anthropics/claude-code/issues/89950)）反复出现。
- **Routines/定时任务可观测性**：行内直接运行 routine（[#89958](https://github.com/anthropics/claude-code/issues/89958)）、`lastRunAt` 不记录（[#89942](https://github.com/anthropics/claude-code/issues/89942)）。
- **安全护栏灵活性**：多条要求放宽或定制 guardrails（[#89957](https://github.com/anthropics/claude-code/issues/89957)、[#89949](https://github.com/anthropics/claude-code/issues/89949)、[#89961](https://github.com/anthropics/claude-code/issues/89961)），误报合法调试/分析场景。
- **桌面端 UX 细节**：删除会话快捷键（[#89948](https://github.com/anthropics/claude-code/issues/89948)）、artifact 查看追踪（[#89962](https://github.com/anthropics/claude-code/issues/89962)）、VS Code 文件链接完整路径 tooltip（[#89947](https://github.com/anthropics/claude-code/issues/89947)）。

## 六、开发者关注点

1. **长会话稳定性**是核心痛点：30 分钟后台任务 kill、空闲后 agent 不可达、记忆在长会话中失效，均指向长时间运行场景缺乏工程化保障。
2. **数据丢失类 bug 优先级高**：UNC 路径历史丢失（#89283）、会话标题覆盖（#81899）直接损害用户信任。
3. **Windows/Linux 平台支持落后于 macOS**：MSIX 更新损坏、Wayland 快捷键失效等平台特定问题持续存在。
4. **权限与安全分类器粒度不足**：按服务器名称关键词拒绝、合法运维/调试被安全护栏拦截，用户需要更精细的信任配置能力。
5. **认证与更新链路脆弱**：`/login` 凭据不持久化（#89801）提示错误处理与回退机制需加强。
6. **批量 stale 关闭值得关注**：多数带 repro 的 bug 被以 stale 关闭，社区可能需要重新提交或推动重开，官方响应节奏值得关注。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-10-26 | 数据来源：github.com/openai/codex**

---

## 1. 今日速览

过去 24 小时 Codex 无新版本发布、无活跃 PR，但社区讨论热度不减：Windows 桌面端仍是问题重灾区，WSL 项目管理（#41290，84 条评论）、Computer Use 截图失败（#49383）等老牌 issue 持续发酵。同时 VS Code 扩展 26.1021.22027 引入的新问题（UI 无法启动、Remote SSH webview 超时）在周末快速聚集关注。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#41290](https://github.com/openai/codex/issues/41290) — WSL 切换后项目创建/删除失败 | Windows + WSL 环境管理核心 bug，84 条评论、54 👍，存在近两个月未修复，是当前呼声最高的 issue |
| 2 | [#49383](https://github.com/openai/codex/issues/49383) — Computer Use 截图 FrameArrived 超时 / E_INVALIDARG | 阻断 Windows 上 Computer Use 可用性，37 条评论，涉及窗口检测与截图管线 |
| 3 | [#56691](https://github.com/openai/codex/issues/56691) — Codext 26.1021.22027 在 VS Code 1.143.1 Windows 无法启动 UI | 新版本引入的回归，创建仅 2 天已 29 条评论、14 👍，升级用户大面积受影响 |
| 4 | [#36718](https://github.com/openai/codex/issues/36718) — Agent 任务需证据支撑的完成报告 | 高价值功能提案：要求 Codex 提供需求→证据的结构化映射，减少“幻觉式完工”，27 条评论 |
| 5 | [#50171](https://github.com/openai/codex/issues/50171) — dot 无法继续已连接的 Windows 本地任务（CloudThreadNotFoundError） | Pro 用户 dot 连接 Windows 电脑的核心工作流中断，重启无效 |
| 6 | [#56264](https://github.com/openai/codex/issues/56264) — 更新后 MXC process.env 缺 SYSTEMROOT 导致会话无法恢复 | 沙箱环境变量传递缺陷，阻断已有会话恢复，诊断报告质量高 |
| 7 | [#53132](https://github.com/openai/codex/issues/53132) — MSIX 安装失败 0x80073CF6 / 0x80070005 | Windows 安装/升级链路的顽固问题，残留服务注册导致反复失败 |
| 8 | [#20093](https://github.com/openai/codex/issues/20093) — 非 review 的 @codex GitHub 评论报环境缺失 | GitHub 集成仅非 review 评论路径失效，影响 CI/协作自动化，半年未解 |
| 9 | [#54956](https://github.com/openai/codex/issues/54956) — 提升 Plus 套餐全模型使用效率 | 配额可持续性诉求，与 #54004（Pro 用户 HTTP 429）共同反映限流痛点 |
| 10 | [#56771](https://github.com/openai/codex/issues/56771) — VS Code Remote SSH webview renderer_ready_timeout | Linux ARM64 + Remote SSH 场景扩展完全不可用，与 #56691 同属 26.1021 版本扩展问题 |

其他值得留意：[#50969](https://github.com/openai/codex/issues/50969)（渲染进程单日 4 次崩溃）、[#52012](https://github.com/openai/codex/issues/52012)（EPERM 导致消息重复提交）、[#38247](https://github.com/openai/codex/issues/38247)（已完成 subagent 保留完整 MCP runtime 的资源泄漏）。

---

## 4. 重要 PR 进展

过去 24 小时无活跃 PR 更新。

---

## 5. 功能需求趋势

- **可验证的任务完成报告**（#36718）：社区强烈要求 agent 输出带证据的结构化结果，而非自然语言总结
- **配额透明度与可持续性**（#54956、#56209）：在模型选择器和 Usage 页直接展示剩余配额；Plus/Pro 用户普遍反映限流过紧
- **可脚本化的 Cloud 生命周期管理**（#24777、#56350）：CLI 环境发现、任务分发、监控的完整 API 面；新版 cloud 环境无法被 CLI 发现是当前缺口
- **MCP 运行时健康管理**（#56970、#38247）：会话内 agent 可调用的 MCP 重连/工具重发现；及时释放已完成 subagent 的 MCP runtime
- **数据管理**（#42613）：云端归档会话缺少永久删除入口

---

## 6. 开发者关注点

1. **Windows 平台质量问题突出**：今日 30 条热门 issue 中约 60% 带 `windows-os` 标签，覆盖安装（MSIX）、WSL、渲染进程稳定性、任务栏交互等，Windows 体验是当前最大债务
2. **升级引入回归频发**：26.1021 扩展版本（VS Code UI 启动失败）、桌面更新后会话恢复失败（#56264）、Composer Predictions 失效（#55219）——更新即破坏的模式消耗用户信任
3. **限流与容量**："Selected model is at capacity"（#55443）、HTTP 429（#54004）在 Pro 付费用户中高频出现
4. **诊断能力不足**：多个 issue（如 #55529、#54645）请求原生级错误诊断信息，当前错误信息难以定位根因
5. **远程/连接场景脆弱**：Remote SSH、iPad 远程线程、remote-control daemon 等分布式场景问题集中

**趋势判断**：建议团队优先处理 26.1021 扩展回归与 WSL 环境管理两大热点，同时发布配额可视化改进以缓解付费用户不满。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-26）

## 1. 今日速览

Gemini CLI 昨晚发布 v0.67.0-nightly 每日构建版本。社区讨论焦点集中在**子代理稳定性**上——多个 P1 级 Bug 涉及子代理挂起、误报成功状态及上下文丢失。PR 方面，Windows 兼容性修复集中涌现（路径展开、TortoiseGitPlink 识别、YAML lint），ACP 协议新增运行中转向能力值得关注。

## 2. 版本发布

- **v0.67.0-nightly.20261025.gcd1b45c2d**：例行 nightly 构建，无附带的变更日志说明。
  [Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.67.0-nightly.20261024.gcd1b45c2d...v0.67.0-nightly.20261025.gcd1b45c2d)

## 3. 社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** 子代理达到 MAX_TURNS 后仍报告 GOAL 成功 — P1 级，状态误报掩盖了任务中断，13 条评论显示社区对子代理状态可信度的强烈关注。
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** 通用代理无限挂起 — P1，简单操作（如建目录）也能挂起一小时以上，8 👍 反映影响面广。
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** 零依赖 OS 沙箱 + 执行后意图路由 — 战略性增强提案：让模型发挥原生 bash 能力的同时保证安全，9 条评论讨论热烈。
4. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** 模型不主动使用自定义 skills 和子代理 — 用户普遍反馈需显式指令才能触发，影响工作流自动化效果。
5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** AST 感知的文件读取/搜索/代码映射 EPIC — 潜在的代理解析效率大升级，配套子任务 #22746、#22747 推进中。
6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** Browser Agent 忽略 settings.json 配置覆盖（如 maxTurns）— 配置合并逻辑失效，影响浏览器代理的可控性。
7. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** get-shit-done output hook 导致崩溃 — P1，输出摘要阶段稳定复现崩溃。
8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** 超过 128 工具时遭遇 400 错误 — 工具数量上限问题，对重度扩展用户是硬阻断。
9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** browser 子代理在 Wayland 下失败 — Linux 桌面用户的代表性兼容性问题。
10. **[#29939](https://github.com/google-gemini/gemini-cli/issues/29939)** 新增：交互输入框 Vim 键位支持 — 今日新提，Vim/Neovim 用户核心诉求。

## 4. 重要 PR 进展

1. **[#29901](https://github.com/google-gemini/gemini-cli/pull/29901)** ACP 客户端可在运行中的 turn 追加消息（转向）— Zed/JetBrains/VS Code 集成体验重大提升，不再需要取消重发。
2. **[#29871](https://github.com/google-gemini/gemini-cli/pull/29871)** 循环恢复时保留未发送请求 — 修复工具 functionResponse 丢失导致的 "Response was lost" 问题。
3. **[#29931](https://github.com/google-gemini/gemini-cli/pull/29931)** / **[#29923](https://github.com/google-gemini/gemini-cli/pull/29923)** Windows 展开 `~\` 家目录相对路径 — 修复自定义 policy 路径问题（两 PR 存在重叠，可能合并）。
4. **[#29921](https://github.com/google-gemini/gemini-cli/pull/29921)** / **[#29922](https://github.com/google-gemini/gemini-cli/pull/29922)** 识别 TortoiseGitPlink 为 PuTTY 系 SSH 客户端 — 修复非交互 git-over-SSH 失败（同日两个平行修复）。
5. **[#29935](https://github.com/google-gemini/gemini-cli/pull/29935)** `@file` 引用保留首尾空白 — 修复缩进和末尾换行丢失导致的语义变化。
6. **[#29940](https://github.com/google-gemini/gemini-cli/pull/29940)** Windows 原生运行 YAML lint — 移除 Unix 管道依赖，解决 Windows 贡献者 preflight 失败。
7. **[#29823](https://github.com/google-gemini/gemini-cli/pull/29823)** Android/Termux 回退系统 ripgrep 并信任 Termux 路径 — 修复 ENOENT 崩溃，扩展移动端支持。
8. **[#29718](https://github.com/google-gemini/gemini-cli/pull/29718)** rootless Podman 沙箱加 `--userns=keep-id` — 修复 EACCES 权限错误。
9. **[#29924](https://github.com/google-gemini/gemini-cli/pull/29924)** 会话预览保留 Unicode — 中文/阿拉伯语会话不再显示空白描述。
10. **[#29912](https://github.com/google-gemini/gemini-cli/pull/29912)** web_fetch 剥离尾随标点和未闭合括号 — 修复逗号分隔 URL 列表被污染的问题。

## 5. 功能需求趋势

- **子代理体系成熟化**：并行协作与共享内存（#18287）、本地子代理 Sprint（#20195）、轨迹共享 `/chat share`（#22598）——子代理是当前最大的功能主线。
- **代码理解深度**：AST 感知工具族（#22745/#22746/#22747）、"Tactful Extraction" 节省 token 的精准读取（#19561）——社区追求更高效的上下文利用。
- **安全与沙箱**：零依赖 OS 沙箱（#19873）、破坏性命令防护（#22672）、按工作区隔离的信任策略（#18397）。
- **持久化任务管理**：用文件 CRUD 替代 in-context WriteToDo（#18836、#21000），对抗 context rot。
- **编辑器生态集成**：ACP 协议持续增强（PR #29901），服务 Zed/JetBrains/VS Code。
- **跨平台兼容**：Windows（路径、Plink、文件锁）和 Android/Termux 修复成为 PR 主力方向。

## 6. 开发者关注点

- **子代理可靠性是最大痛点**：挂起（#21409）、状态误报（#22323）、上下文不进 bug 报告（#21763）、不主动调用（#21968）形成系统性问题簇，建议重度用户暂时显式控制子代理调用。
- **可观测性不足**：`/bug` 报告缺少子代理上下文，子代理轨迹难以审查，排障成本高。
- **Windows 体验仍需打磨**：今日至少 5 个 Windows 相关 PR，一等公民支持在路上但未完成。
- **上下文/token 效率**：大文件读取"灌水"上下文（+15k tokens/turn）、工具数量超限（#24246）显示扩展规模化的瓶颈。
- **终端 UX 细节**：resize 闪烁（#21924）、Vim 键位（#29939）、`\n` 转义错误（#22466）——长期使用者的体验诉求。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-26 | 数据来源：github.com/github/copilot-cli**

---

## 📌 今日速览

过去 24 小时无新版本发布，也无 PR 更新，但社区 Issue 活跃（26 条更新）。今日焦点集中在 **1.0.103 版本的稳定性问题**：长会话内存暴涨至 37 GiB（#5254）和会话锁超时导致无响应（#5253）两条高严重度报告同日提交。此外，**ACP（Agent Client Protocol）生态对齐**与**固定上下文开销过大**成为社区讨论热点，Entra 认证在 Windows/macOS 上的双平台故障也值得企业用户警惕。

---

## 🚀 版本发布

过去 24 小时无新 Release。（社区已有呼声要求建立 Stable 发布通道以缓解快速迭代带来的回归问题，见 #5203）

---

## 🔥 社区热点 Issues（Top 10）

**1. [#5254] 主进程内存暴涨至 37 GiB（1.0.103）**
长时并行 Agent 会话中，主进程达 37.3 GiB 物理内存、1.33 亿次 malloc 分配、10.7 GiB 碎片化，系统重度 swap。今日新报，属最高严重度级别，与 #5253 疑似同源。
🔗 https://github.com/github/copilot-cli/issues/5254

**2. [#5253] 会话锁超时导致会话大面积无响应（1.0.103）**
`session lock unavailable` 持续报错，UI 完全卡死但嵌套工具仍在活动。与 #5254 一并指向长会话资源管理缺陷，值得长时任务用户关注。
🔗 https://github.com/github/copilot-cli/issues/5253

**3. [#5109] 企业版 "Managed account policy" 错误导致 CLI 完全不可用**
受管账户策略无法刷新，CLI 卡死在重试循环。企业用户被阻断的 P0 级问题，且自 1.0.94 起持续存在（另见 #5130）。
🔗 https://github.com/github/copilot-cli/issues/5109

**4. [#5203] 请求 Stable 发布通道**
快速发布节奏频繁引入回归，社区建议划分 Stable/Beta 通道。反映用户对稳定性与迭代速度的矛盾情绪，呼声渐涨。
🔗 https://github.com/github/copilot-cli/issues/5203

**5. [#5236] Windows Entra broker 令牌缓存为空，每个新进程都重新弹登录**
MCP 登录后 token 缓存文件 0 字节，认证体验严重劣化。企业 MCP 集成的实际阻断点。
🔗 https://github.com/github/copilot-cli/issues/5236

**6. [#5250] macOS Entra-broker MCP 服务器启动失败：并发登录被拒**
Azure DevOps 等多个 Entra 保护的远程 MCP 同时连接时触发 "sign-in is already in progress"。与 #5236 构成跨平台认证故障对。
🔗 https://github.com/github/copilot-cli/issues/5250

**7. [#5195] 选择自定义 Agent 后，MCP 工具延迟加载从第二次模型调用起失效**
所有 MCP 工具被全量注入上下文，隐性推高 token 消耗、削弱 tool search 收益。对重度 MCP 用户影响显著。
🔗 https://github.com/github/copilot-cli/issues/5195

**8. [#4401] skill 工具无法发现 ~/.agents/skills 中的合法技能（Windows 回归）**
#2230 的修复疑似不完整，Windows 用户技能加载持续失败。
🔗 https://github.com/github/copilot-cli/issues/4401

**9. [#4233] ACP 模式缺少 `usage_update` 事件（👍 4）**
Zed 等 ACP 客户端无法显示上下文窗口和 AI 积分用量，而 CLI 内部已有该数据。社区认可度最高的功能缺口，反映 ACP 生态对齐诉求。
🔗 https://github.com/github/copilot-cli/issues/4233

**10. [#5201] 提示词预算超限错误缺乏机器可识别的错误码**
headless 模式下错误仅返回 `errorType: "query"`，自动化管道无法程序化处理上下文超限。非交互集成的可观测性痛点。
🔗 https://github.com/github/copilot-cli/issues/5201

---

## 🔧 重要 PR 进展

过去 24 小时无 PR 更新。值得注意的是 #5252（减少固定上下文注入的重复提交）今日被关闭并迁移为 #5251 重新打开，疑似维护者调整了处理流程，可关注后续进展。

---

## 📈 功能需求趋势

1. **ACP / 非交互模式对齐**（#4233、#5198、#5201）：社区希望 `--acp` 与 headless JSON-RPC 模式在用量上报、中途转向（mid-turn steering）、错误语义上与交互模式完全对齐，Zed 等编辑器集成用户是主要推动者。
2. **上下文/token 效率**（#5251、#5195）：固定注入约 40k token 的系统提示与工具定义、MCP 延迟加载失效等问题引发对 token 成本优化的强烈诉求。
3. **稳定性与发布节奏**（#5203、#5253、#5254）：长会话内存/锁管理缺陷与快速迭代回归叠加，催生 Stable 通道需求。
4. **企业与 Entra 认证**（#5109、#5130、#5236、#5250）：受管策略刷新与 Entra broker token 缓存是多平台持续性故障区。
5. **新形态交互界面**（#3301、#5226）：本地 Web UI（对标 `opencode web`）和语音转写语言配置等外围体验需求。

---

## ⚠️ 开发者关注点

- **长会话稳定性是当前最大风险**：1.0.103 的内存泄漏 + 会话锁超时（#5253/#5254）建议长时间并行 Agent 任务用户做好定期重启准备。
- **企业环境可用性**：受管策略刷新失败（#5109/#5130）可致 CLI 完全不可用，建议企业用户在升级前验证。
- **认证体验**：Entra broker 令牌缓存在 Windows/macOS 均有问题，多 MCP 服务器场景尤为明显。
- **token 成本不可控**：固定上下文注入 + 自定义 Agent 下 MCP 工具全量加载，重度用户成本显著上升。
- **回归频发**：skill 发现（#4401）等旧问题反复出现，锁版本使用是当前社区常见应对策略。

---
*本报告基于过去 24 小时 GitHub 公开数据自动整理，仅供参考。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-10-26

## 📌 今日速览

今日无新版本发布。社区焦点高度集中于**免费额度限制系统故障**：大量用户报告免费模型配额无法重置、倒计时归零后重启，甚至付费订阅用户也被误判为超额（十余条相关 Issue 涌入）。核心维护者 @thdxr 同日清理了多个失效 CI workflow，多名贡献者的积压 PR 被批量关闭重整。

## 🔥 社区热点 Issues（Top 10）

1. **[#34344](https://github.com/anomalyco/opencode/issues/34344) 免费模型无限用量漏洞（已关闭）** — 56 条评论。限流基于 IP，轮换 VPN 即可绕过，作者已用自动化 VPN 轮换验证。安全隐患严重，影响 Zen 免费模型计费体系。
2. **[#58781](https://github.com/anomalyco/opencode/issues/58781) Desktop 1.19.4 所有免费模型报 "Free Usage Exceeded"** — 13 评论、9 👍，免费模型全面不可用，属当日配额故障风暴的代表性报告。
3. **[#58814](https://github.com/anomalyco/opencode/issues/58814) 免费额度 2 天以上未重置** — 每次会话启动即失败，指向服务端配额重置逻辑缺陷。
4. **[#58831](https://github.com/anomalyco/opencode/issues/58831) 倒计时"锯齿"循环：86400s 归零后立即重置** — 5 评论 2 👍，配额永不恢复，疑似核心 bug，另建议倒计时人性化显示。
5. **[#58773](https://github.com/anomalyco/opencode/issues/58773) 付费 Go 订阅用户仍被判定为免费超额** — 订阅后一条消息都发不出，涉及付费用户权益，优先级应最高。
6. **[#55121](https://github.com/anomalyco/opencode/issues/55121) [已复现/high] UNDO 命令回滚手工修改** — 撤销操作会丢弃用户手动编辑的代码，数据丢失级别问题。
7. **[#54026](https://github.com/anomalyco/opencode/issues/54026) [已复现/high] 回滚消息会还原整个 worktree** — 静默丢弃其他会话的未提交更改，回滚范围未限定在目标文件。
8. **[#59051](https://github.com/anomalyco/opencode/issues/59051) v2.1.4 子代理成功执行但父会话收到空结果** — 子会话有真实 token 消耗和成本，父级却拿到空响应，子代理工作成果丢失。
9. **[#50312](https://github.com/anomalyco/opencode/issues/50312) V2 插件工具目录可见但无法直接调用** — "No tool named …" 错误，与 [#58778](https://github.com/anomalyco/opencode/issues/58778) 相关（后者诊断更新：Code Mode 中 transform 注册的工具不在请求 `tools` 数组中）。
10. **[#58219](https://github.com/anomalyco/opencode/issues/58219) GitHub Copilot OAuth 登录成功但模型静默不同步** — 凭据有效但 `github-copilot/*` 模型始终不出现，影响第三方 provider 接入体验。

## 🔧 重要 PR 进展（Top 10）

1. **[#59074](https://github.com/anomalyco/opencode/pull/59074) grep 工具新增 pcre2 选项** — ripgrep 默认引擎不支持 look-around/反向引用，此 PR 解决正则能力限制（社区重复提交，[#59073](https://github.com/anomalyco/opencode/pull/59073) 为 AI 代理版本，已关闭）。
2. **[#59072](https://github.com/anomalyco/opencode/pull/59072) SDK 实验端点迁移至 `client.experimental.*`** — 核心贡献者 @kitlangton 重构客户端 API，区分实验性与稳定接口。
3. **[#58843](https://github.com/anomalyco/opencode/pull/58843) 接受 finish reason 之后的完整工具调用** — 修复模型在结束原因后输出工具调用被丢弃的问题，#56455 的后续。
4. **[#59076](https://github.com/anomalyco/opencode/issues) / [#59075](https://github.com/anomalyco/opencode/issues) 移除 models-snapshot / stats / containers workflows** — @thdxr 清理被 dev ruleset 阻塞或连续失败 30 天的 CI 流程。
5. **[#51407](https://github.com/anomalyco/opencode/pull/51407) Code Mode 沙箱约束加固（已关闭待重整）** — 限制替换字符串、参数数量、递归深度，修复无界分配导致的挂死。
6. **[#51384](https://github.com/anomalyco/opencode/pull/51384) Code Mode 沙箱多项修复** — `for...in` 继承键枚举、模板对象冻结、Array/Error toString 委托。
7. **[#58201](https://github.com/anomalyco/opencode/pull/58201) 模型 tooltip 自适应宽度** — 修复硬编码 180px 导致长模型名被截断。
8. **[#58498](https://github.com/anomalyco/opencode/pull/58498) 恢复通用工具的输入/输出折叠展示** — 插件与 MCP 工具缺少专用渲染器时详情丢失的问题。
9. **[#51352](https://github.com/anomalyco/opencode/pull/51352) Shell spawn 失败时快速报错而非挂起** — 修复 ready deferred 只在特定异常路径被 settle 导致的无限等待。
10. **[#51281](https://github.com/anomalyco/opencode/pull/51281) Windows worktree 删除被缓存路径阻塞** — 本地 MCP server 缓存 location 导致删除中途失败。

> 注：#51xxx 系列多为被 `automated-pr-cleanup` 批量关闭的积压 PR，可能等待 rebase 后重新提交。

## 📈 功能需求趋势

- **配额与计费透明度**（绝对主导）：人性化倒计时、明确 cooldown 规则、配额状态 API。
- **沙箱安全**：Code Mode 的资源约束与隔离成为持续贡献方向（成系列的 confinement PR）。
- **插件/工具生态**：V2 插件工具调用、TSX 插件运行时（#39986）、本地插件 npm 安装可靠性（#58728）。
- **多会话/worktree 管理**：回滚范围隔离、workspace lock（#58241）。
- **桌面端 UX**：文件树开关（#56057/#59047）、会话标签自定义、拼写检查可关闭。

## ⚠️ 开发者关注点

1. **免费额度系统是当前最大痛点**：过去 48 小时涌入 10+ 条配额相关 Issue（不重置、锯齿循环、16 小时 cooldown、付费用户被误判），官方尚未给出统一回应，多个 issue 处于 pending close 状态。
2. **数据安全风险**：UNDO/消息回滚可能丢失手工修改和其他会话的工作（两条 high 级已复现），建议用户在关键工作区谨慎使用回滚功能。
3. **v2 子代理可靠性**：空结果返回与 "ask" 权限静默失败（#57603）影响多代理工作流信任度。
4. **1.19.4 Desktop 回归**：服务端 499 错误（#58942），降级 1.18.35 可恢复。

---
*数据截至 2026-10-26，来源：github.com/anomalyco/opencode*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-26）

## 1. 今日速览

CLI v0.26.1 发布后的连锁问题成为今日焦点：SDK 0.1.23 发布受阻、managed runtime 发布失败、post-publish fan-out 延迟，三条 P1/P2 发布链路 Issue 集中爆发。核心侧自动压缩（compaction）后的 token 重复计数（P1）和 Anthropic 新模型 forced tool_choice 400 错误（P1）是最需关注的功能性缺陷。社区贡献活跃，Web Shell、Runtime Broker 和 hook/compaction 修复类 PR 密集提交。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues

1. **[#13395](https://github.com/QwenLM/qwen-code/issues/13395) — Kubernetes tool runtime 进度追踪**（23 评论）：跨平台交付的核心 roadmap issue。最新进展：PR #15457 的两项 S1 修复尚未合入，`71569f4` 的 6 项 CI 失败确认为该 PR 引入，新 head 完整 CI 与原生 ACK 待通过。持续高热度讨论。

2. **[#13492](https://github.com/QwenLM/qwen-code/issues/13492) — XML tool-call recovery 丢外层调用**（14 评论，in-review）：PR #13515 已合入，防止带引号的 tool markup 被当作真实调用派发；剩余外层调用恢复部分由 PR #13579 承接，尚未合入。

3. **[#15498](https://github.com/QwenLM/qwen-code/issues/15498) — SDK 0.1.23 发布被集成测试超时阻塞**（11 评论，P1）：v0.26.1 触发的 Release SDK 流水线在 "Run SDK Integration Tests" 卡约 6 小时后被取消，`@qwen-code/sdk@0.1.23` 未发布。发布链路稳定性问题。

4. **[#14724](https://github.com/QwenLM/qwen-code/issues/14724) / [#15173](https://github.com/QwenLM/qwen-code/issues/15173) — Main CI 持续失败**（8/7 评论）：Managed Agent gate 无测试识别 + E2E Linux docker shard 失败（含 context-compress 交互测试），持续影响主干 CI 绿灯。

5. **[#15486](https://github.com/QwenLM/qwen-code/issues/15486) — 压缩后 token 重复计数 + 20K pad**（P1）：自动压缩在 pending tool result 时执行后，下一次请求的大小估算重复计算该 tool result，导致 turn 被中止或以 `max_tokens: 1` 发送。直接影响长任务可用性。

6. **[#15542](https://github.com/QwenLM/qwen-code/issues/15542) — Anthropic 新模型 JSON 侧查询 400**（P1）：Claude Sonnet 5.5 / Opus 5.5 不支持 `tool_choice: {"type": "any"}`，Qwen Code 0.26.1 的 JSON 侧查询直接失败。修复 PR #15558 已提交（见下）。

7. **[#15526](https://github.com/QwenLM/qwen-code/issues/15526) — warn 模式循环提醒只发一次，59 次相同调用无人拦截**（3 评论）：用户在 262k 上下文本地模型上观察到同一 `read_file` 被字节级相同调用 70 次，循环防护形同虚设。衍生出 [#15537](https://github.com/QwenLM/qwen-code/issues/15537)（提醒丢失缺陷）。

8. **[#15499](https://github.com/QwenLM/qwen-code/issues/15499) — managed runtime v0.26.1 发布在 immutable-publication preflight 停摆**（4 评论）：与 #15498 同属 v0.26.1 发布后遗症。

9. **[#15545](https://github.com/QwenLM/qwen-code/issues/15545) — 阈值触发的 handover continuation 提案**（5 评论）：针对 auto-compaction 的“静默质量衰减”问题，提出在上下文填至可配置水位时写 handover 报告并在全新上下文中继续。长自主运行场景的高质量设计讨论。

10. **[#15567](https://github.com/QwenLM/qwen-code/issues/15567) — MCP 启动失败丢失子进程 stderr**（4 评论）：stdio MCP server 因 shebang 解释器缺失退出时，诊断信息只报 "disconnected connection"，未展示可操作的 stderr。

## 4. 重要 PR 进展

1. **[#15558](https://github.com/QwenLM/qwen-code/pull/15558) — 修复 Anthropic 不支持的 forced tool_choice**：Opus/Sonnet 5.5 等模型改用 `auto` + 显式命名工具，仅 schema 响应请求提供 JSON 文本备选。对应 P1 issue #15542，响应迅速。

2. **[#15575](https://github.com/QwenLM/qwen-code/pull/15575) — 压缩后保持 hook 去重**：修复自动压缩后 `UserPromptSubmit` hook 上下文在下一 turn 被重复注入，与 #15486/#15552 同属 compaction 稳定性系列修复。

3. **[#15559](https://github.com/QwenLM/qwen-code/pull/15559) — 在模型接受边界结算循环提醒**：修复 `takeLoopReminder()` 在请求组装阶段就清除 pending 状态、导致提醒丢失的问题（#15537）。

4. **[#15562](https://github.com/QwenLM/qwen-code/pull/15562) — Desktop 端 Web Shell catalog 持久化**：重启后保留已保存的 daemon 连接与 workspace-host catalog，通过 allowlisted IPC 读写。

5. **[#15458](https://github.com/QwenLM/qwen-code/pull/15458) — Linux 新安装遵循 XDG 规范**：全局状态迁至 `~/.config/qwen`，不再污染 home 目录。

6. **[#14237](https://github.com/QwenLM/qwen-code/pull/14237) — Web Shell 跨项目 Todos 页**：聚合所有会话的原生 todo 列表，提供看板/日程/项目三视图。

7. **[#15388](https://github.com/QwenLM/qwen-code/pull/15388) — autofix takeover 支持轮次预算**：`@qwen-code /takeover for N`（N=1–99）限定自动化修复的最大轮数，增强自主 agent 可控性。

8. **[#15286](https://github.com/QwenLM/qwen-code/pull/15286) / [#15274](https://github.com/QwenLM/qwen-code/pull/15274) — CI 优化：sdk-java 锁范围收窄**：job-local Maven 仓库 + 仅 cache write-back 持锁，缓解自托管池竞争（配合 #15546 的 Maven 预装提案）。

9. **[#12585](https://github.com/QwenLM/qwen-code/pull/12585) — ACP 嵌入文本资源持久化与回放**：随 user prompt 持久化有界 `resource` 块并作为类型化 user chunk 回放，daemon UI SDK 同步暴露。

10. **[#15441](https://github.com/QwenLM/qwen-code/pull/15441) — ACP rewind identity 贯穿 daemon 客户端**：已 Ready for review，CI 验证通过。

## 5. 功能需求趋势

- **长任务自主运行的上下文管理**：handover continuation（#15545）、compaction 质量与去重（#15486、#15552、#15575）、循环防护失效（#15526）——社区对“自主跑数小时不崩”的需求最集中。
- **Runtime Broker / 平台分发架构**：HTTP-backed external provisioner（#15247）、external Hosted Workspace phase 2（#15512）、Kubernetes runtime（#13395）持续推进。
- **自动化 CI/PR 修复**：`/autofix-pr` 本地命令（#15056）、takeover 轮次预算（PR #15388）。
- **可观测性与诊断**：headless 模式重试分类透出（#15513）、MCP stderr 诊断（#15567）。
- **Web Shell / Desktop 体验**：Todos 聚合页、catalog 持久化、会话分组、复制格式等 UX 打磨类 PR 密集。
- **新模型兼容**：Anthropic 5.5 系列 forced tool_choice 适配（#15542）。

## 6. 开发者关注点

- **发布链路可靠性是当前最大痛点**：v0.26.1 之后 SDK 发布超时、managed runtime preflight 失败、fan-out 延迟 37–50 分钟（#15465），发布自动化亟待加固。
- **自托管 CI 资源竞争**：`ecs-qwen` 池 Maven 限流、host lock 争用引发多个 flaky/失败（#15546、#15173、#14724）。
- **本地/第三方模型用户体验**：OpenAI-compatible 端点的循环防护、Bailian Token Plan 模型列表不同步且图像/视频生成失败（#8432，已 ready-for-human 但长期未闭环）。
- **hook 与 compaction 的交互回归**：近期多个合并（#14129、#15246）后陆续暴露去重/快照边界缺陷，提示该区域需要更系统的回归测试。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*