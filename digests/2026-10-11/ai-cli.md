# AI CLI 工具社区动态日报 2026-10-11

> 生成时间: 2026-10-10 23:31 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告（2026-10-11）

## 1. 生态全景

AI CLI 工具已从单纯的“终端对话助手”演进为**多 Agent 编排平台**，各家均在向托管会话、子代理、远程控制等重基础设施方向投入。竞争焦点正从模型能力转向**可靠性工程**——今日各社区的热点几乎都是稳定性问题（挂起、静默失败、状态误报），而非功能缺失。同时**长会话记忆管理**（compaction、上下文压缩、工作状态持久化）成为全行业共同瓶颈。平台兼容性仍是短板，Windows 和企业网关/沙箱场景问题集中爆发。

## 2. 各工具活跃度对比

| 工具 | 今日热点 Issues | PR 动态 | Release | 核心焦点 |
|---|---|---|---|---|
| Claude Code | ~13+ | 3 | 无 | Auto mode 误判、security-guidance 静默失败 |
| OpenAI Codex | ~30（Windows 占半数以上） | 17（合并） | rust-v0.163.0-alpha.5 | Windows 稳定性、GPT-6 质量回退 |
| Gemini CLI | 10 | 10 | v0.65.0-nightly | Agent 挂起、状态误报 |
| Copilot CLI | ~21 新增/更新 | 1（疑似垃圾 PR） | **v1.0.96-1 / -2（两连发）** | 沙箱企业摩擦、会话稳定性 |
| Kimi Code CLI | 0 | 1（文档） | 无 | 低活跃期 |
| OpenCode | 10 | 10 | 无 | v2 迁移兼容性、压缩器数据丢失 |
| Qwen Code | 10 | 10 | v0.25.1-preview.2 | Managed Agent 架构、会话恢复 |

**观察**：Codex 与 Copilot CLI 处于高热度期（前者以 Issue 量见长，后者发布节奏密集）；Gemini/Qwen/OpenCode 呈“PR 驱动”的健康迭代模式；Claude Code 热点集中但 Issue 数受数据源限制偏低；Kimi 处于静默期。

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **长会话上下文管理与压缩** | Claude Code、Codex、Gemini、Qwen、OpenCode | Claude #70555（compaction 后"变笨"）；Codex #52937（保留 `retain:true` 标记）；Gemini 任务持久化文件 CRUD；Qwen 动态截断 #2566；OpenCode #54352 压缩器丢数据 |
| **Agent/子代理状态可信度** | Gemini、Qwen、OpenCode、Codex | Gemini #22323（MAX_TURNS 误报成功）；Qwen Harness 重启卡死 #13857；OpenCode 会话删除幽灵问题；Codex code-mode 状态上报 |
| **静默失败显式化** | Claude Code、Copilot CLI、OpenCode | Claude #99840（安全审查失败报"干净"）；Copilot #5097（HydraFusion 静默降级）；OpenCode v2 静默丢弃配置 |
| **沙箱与权限精细化** | Copilot CLI、Codex、Gemini、Claude Code | Copilot macOS 沙箱 × Gradle/git 凭据；Codex Windows 沙箱共享冲突；Gemini OS 级沙箱提案 #19873；Claude Auto mode 分类器误判 |
| **终端状态协议 / TUI 集成** | Codex、OpenCode | 双方均在推进 **OSC 7501** 程序状态上报（idle/working/blocked） |
| **多会话/多终端支持** | Codex、Claude Code | Codex #37552（多终端会话，8 月未解）；Claude #97746（批量回复） |
| **国际化（RTL）** | Claude Code、Qwen | 希伯来语/阿拉伯语渲染问题在两个社区同时出现 |

## 4. 差异化定位分析

- **Claude Code**：企业级安全审查链路（security-guidance）和 Remote Control 远程会话是独有重心；痛点在 Auto mode 权限智能和 OAuth 竞态，目标用户偏重度专业开发者与企业。
- **OpenAI Codex**：唯一深度绑定**桌面端（Windows App / Dots / Computer Use / CUA）**的工具，走“CLI + 桌面代理”融合路线；代价是 Windows 稳定性债务最重。PR 侧 code-mode、TUI 性能推进最快。
- **Gemini CLI**：社区驱动的**架构探索型**仓库——AST 感知工具、零依赖 OS 沙箱、token 效率 EPIC 等前瞻提案活跃，偏研究性与开源协作。
- **Copilot CLI**：**企业策略与沙箱合规**是核心差异化（托管策略、环境密钥检测、BYOK），天然面向 GitHub 企业生态，但插件 hook 与策略的摩擦是新痛点。
- **OpenCode**：**供应商中立**定位（自定义 provider、Ollama、Copilot 回退路由、models.dev），v2 迁移期暴露工程化不成熟，社区贡献流失信号值得警惕。
- **Qwen Code**：路线图最激进，**Managed Agent 多阶段架构（Stage H3-H5）**是全行业中体系化程度最高的多 Agent 交付规划，并快速跟进 Codex 的 code mode 等对手特性（PR #11854 明确“对齐 Codex"）。
- **Kimi Code CLI**：以文档和上手体验为主（AGENTS.md 规范化），当前处于能力追赶阶段。

## 5. 社区热度与成熟度

- **高活跃 + 快速迭代**：**Codex**（17 PR/日、alpha 频发，但 Windows 债务堆积）；**Gemini CLI、Qwen Code**（nightly/preview 节奏稳定，PR- Issue 健康比高）。
- **高热度但响应承压**：**Claude Code**（热点 issue 讨论量高，但 PR 数据源受限、#13843 三月未落地）；**Copilot CLI**（Issue 量大、Release 密集，但 PR 管理松散——垃圾 PR 无人处理）。
- **转型阵痛期**：**OpenCode**（v2 迁移引发用户流失风险 + stale bot 关闭有效贡献）。
- **成熟度分层**：Claude Code / Codex 属第一梯队（功能完备度与生态绑定深），Gemini / Qwen / Copilot 属快速追赶梯队，OpenCode / Kimi 属长尾。

## 6. 值得关注的趋势信号

1. **“可靠性 > 功能”成为分水岭**：今日全行业无一家在讨论“新能力不够”，全是挂起、误报、静默失败。自动化流水线对 agent 退出状态的信任（Gemini #22323、Qwen #13857）将是下一个竞争维度。
2. **静默降级是信任杀手**：安全审查失败报“干净”（Claude #99840）、模型静默降级（Copilot #5097）、压缩器丢数据（OpenCode #54352）——**失败显式化与可观测性**值得工具开发者和企业选型者优先评估。
3. **上下文工程进入深水区**：从“压缩”演进到“工作状态持久化”（Claude #70555、Gemini 文件化 TODO、Codex retain 标记），AST 感知读取（Gemini）指向 token 成本的精细化运营。
4. **OSC 7501 终端状态协议被两家同时实现**（Codex #52725、OpenCode #54402），可能正在形成事实标准，TUI/编辑器集成开发者应关注。
5. **企业环境（网关、BYOK、托管策略、沙箱）是付费用户最大摩擦面**，也是各家修复优先级最高的战场——选型时应重点测试自家网关/沙箱场景。
6. **迁移期的工程治理值得借鉴**：OpenCode v2 静默丢弃配置与 stale bot 误伤贡献者是反面教材；Qwen 明显的“review 债务”（deferred findings 大量拆分）提示大型 PR 拆分策略的重要性。

**给开发者的建议**：生产环境使用前务必验证长会话压缩行为与失败路径的可观测性；Windows 用户对 Codex 当前版本升级需谨慎；企业网关用户暂避 Claude security-guidance 插件直至 #99840 修复。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-10-11，来源：anthropics/skills）

> **数据说明**：本次 PR 列表的评论数均缺失，热度评估综合了 Issues 中的关联讨论、PR 更新活跃度及涉及的 Skill 重要性。所有列出 PR 状态均为 **OPEN**。

---

## 一、热门 Skills 动态排行（按综合热度）

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **mcp-builder** — [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 `mcp>=2.0` 的 `streamable_http_client` 重命名与自定义 Header 配置。关联 Issue [#1390](https://github.com/anthropics/skills/issues/1390)（eval 对真实 MCP 服务器评分恒为 0），是 MCP 生态升级的关键修复 | OPEN |
| 2 | **skill-creator** — [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 trigger eval 并发竞争、Windows `select()` 失败等导致误判的问题。关联 Issues [#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)、[#1383](https://github.com/anthropics/skills/issues/1383)，是社区反馈最密集的 Skill | OPEN |
| 3 | **skill-creator 安全加固** — [#1961](https://github.com/anthropics/skills/pull/1961) | 修复 eval viewer 的脚本逃逸、DNS rebinding、XSS 等漏洞，响应 Issue [#1394](https://github.com/anthropics/skills/issues/1394) | OPEN |
| 4 | **docx** — [#1792](https://github.com/anthropics/skills/pull/1792) / [#1734](https://github.com/anthropics/skills/pull/1734) | LibreOffice 超时误报成功、孤儿批注检测等文档处理可靠性修复 | OPEN |
| 5 | **md2video-audio** — [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown 一键转带真人配音的 MP4 视频，零成本内容创作方向 | OPEN |
| 6 | **webapp-testing** — [#1980](https://github.com/anthropics/skills/pull/1980) / [#1976](https://github.com/anthropics/skills/pull/1976) | 消除 `shell=True` 命令注入风险、修正元素识别；E2E 测试类 Skill 持续活跃 | OPEN |
| 7 | **AWT (AI Watch Tester)** — [#822](https://github.com/anthropics/skills/pull/822) | 视觉驱动的零代码 E2E 测试，悬置半年仍持续更新 | OPEN |
| 8 | **proofcore-contract-auditor** — [#1771](https://github.com/anthropics/skills/pull/1771) | Solidity/Rust 合约静态分析 + TON 链上审计存证，Web3 场景代表 | OPEN |

---

## 二、社区需求趋势（来自 Issues）

1. **Skill 信任与安全机制**（最热）：Issue [#492](https://github.com/anthropics/skills/issues/492)（43 评论）指出社区 Skill 冒用 `anthropic/` 命名空间构成信任边界滥用，呼吁签名/命名空间治理。
2. **组织级共享与分发**：[#228](https://github.com/anthropics/skills/issues/228)、[#189](https://github.com/anthropics/skills/issues/189) 要求组织内共享库、插件内容去重。
3. **Skill 质量评估基础设施**：skill-creator 的 eval 体系被大量投诉（[#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)、[#1383](https://github.com/anthropics/skills/issues/1383)），社区需要可信的触发率/质量基准工具。
4. **上下文效率**：[#1487](https://github.com/anthropics/skills/issues/1487) 报告 claude-api skill 单次注入 156k token，渐进式加载呼声高；[#1329](https://github.com/anthropics/skills/issues/1329) 提出紧凑 agent 状态符号化存储。
5. **AI 输出治理/质量门禁**：[#412](https://github.com/anthropics/skills/issues/412)、[#1385](https://github.com/anthropics/skills/issues/1385) 提议 agent 治理与推理质量管线。
6. **文档格式扩展与排版质量**：ODT 支持（[#486](https://github.com/anthropics/skills/pull/486)）、排版质控（[#514](https://github.com/anthropics/skills/pull/514)）。

---

## 三、高潜力待合并 Skills（活跃 OPEN PR）

- **[#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder 兼容修复** — 直接解决生态阻塞，10 月仍在更新，合并概率最高
- **[#1298](https://github.com/anthropics/skills/pull/1298) skill-creator eval 隔离** — 响应多个高赞 Issue，社区刚需
- **[#1681](https://github.com/anthropics/skills/pull/1681) package_skill.py 可独立执行** — 低风险易合并的可用性修复
- **[#1961](https://github.com/anthropics/skills/pull/1961) / [#1980](https://github.com/anthropics/skills/pull/1980) 安全加固类** — 与官方安全优先策略契合，近期落地可能大
- **[#538](https://github.com/anthropics/skills/pull/538) PDF 大小写引用修复** — 典型 good-first-fix
- **[#1703](https://github.com/anthropics/skills/pull/1703) md2video-audio** — 内容创作方向代表，功能完整

---

## 四、生态洞察（一句话）

**社区最集中的诉求是"可信"——即 Skill 的安全边界（命名空间信任、XSS/注入加固）与质量评估（eval 可靠性、上下文效率）双支柱，其次才是新场景扩展（E2E 测试、视频生成、HPC/Web3）。**

---

# Claude Code 社区动态日报（2026-10-11）

## 📌 今日速览

今日无新版本发布，社区焦点集中在 **Auto mode 权限分类器误判**（连续拒绝用户已批准的操作）和 **security-guidance 插件安全审查失效**问题——后者在审查失败时静默标记“已审查无漏洞”，存在真实安全隐患。此外，长会话上下文压缩后“变笨”问题（#70555）持续引发讨论，Windows 环境下配置目录被删导致 CPU 空转的新 bug 也值得关注。

---

## 🚀 版本发布

过去 24 小时无新 Release。

---

## 🔥 社区热点 Issues

**1. [OPEN] #13843 — 从 Claude.ai 共享会话上下文到 Claude Code**（👍 122 | 评论 28）
呼声最高的功能需求：允许将 Claude.ai 上的规划/讨论上下文带入 Claude Code 继续工作，打通 Web 与 CLI 工作流。三个月来持续活跃，是社区最期待的跨端集成能力。
🔗 https://github.com/anthropics/claude-code/issues/13843

**2. [OPEN] #70555 — 工作状态连续性：让上下文在 compaction 和 /clear 后存活**（评论 19）
长会话“越用越笨”问题：压缩后重新推导、遗忘进行中的任务、重复工作。这是所有 AI 编码助手的通病，社区对“工作状态快照/恢复机制”的诉求强烈。
🔗 https://github.com/anthropics/claude-code/issues/70555

**3. [OPEN] #99840 — security-guidance：审查失败（如 HTTP 401）被报告为“干净”并标记已审查**（评论 3）
⚠️ 高危问题：安全审查无法触达模型时，插件静默记录"no vulnerabilities found"且不再重审。失败审查与通过审查无法区分，可能导致未审查代码被误信。
🔗 https://github.com/anthropics/claude-code/issues/99840

**4. [OPEN] #99857 — security-guidance：LLM 网关后 model reviews 401，ANTHROPIC_CUSTOM_HEADERS 未被传递**（评论 4）
与 #99840 同属安全审查链路问题：网关鉴权所需的自定义请求头在 security-guidance 调用中丢失，导致企业网关用户安全审查完全失效。
🔗 https://github.com/anthropics/claude-code/issues/99857

**5. [OPEN] #100374 — Auto mode：分类器持续拒绝用户已明确批准的操作，远程会话无批准路径**（评论 2）
Auto mode 权限分类器的连环误判 + Remote Control 会话中用户完全无法批准，双重卡死。Auto mode 相关问题今日集中爆发（另见 #97914、#100974）。
🔗 https://github.com/anthropics/claude-code/issues/100374

**6. [OPEN] #97914 — Auto mode 分类器将无害只读操作误判为破坏性**（评论 1）
如 `cat .prettierrc`、`node --version` 等被标记为"Irreversible Local Destruction"，且一次误判后连锁阻塞后续操作。跨 Windows 双机复现。
🔗 https://github.com/anthropics/claude-code/issues/97914

**7. [OPEN] #100974 — Auto mode 的终端内引导提示阻塞 Remote Control 会话**（评论 1）
"Teach auto mode about your environment?"提示仅显示在终端，远程端只见会话“忙碌”；误触 Enter 会意外打开 /auto-mode-setup。暴露了本地 TUI 与远程控制的状态同步缺陷。
🔗 https://github.com/anthropics/claude-code/issues/100974

**8. [OPEN] #95822 — 短生命周期命令的 OAuth 刷新竞态导致 refresh token 被浪费**（评论 7）
`claude auth status`、`claude --bg` 等命令在 init 时启动 OAuth 刷新但提前退出不保存，token 被消耗却未持久化，最终 profile 失效。2.1.277 仍存在。
🔗 https://github.com/anthropics/claude-code/issues/95822

**9. [OPEN] #98731 — security-guidance 的 git status -uall 遍历全部 submodule，66 个 submodule 仓库每次耗时约 73 秒**（评论 2）
安全插件在每个 UserPromptSubmit/Edit 钩子上执行未加 `--ignore-submodules` 的 git status，性能影响严重。
🔗 https://github.com/anthropics/claude-code/issues/98731

**10. [OPEN] #101027 — Windows：运行中删除 CLAUDE_CONFIG_DIR 导致单核 CPU 持续满载**（评论 1）
配置目录被删后进程从 ~0 飙升至 ~1.1 核且无任何错误日志、无退避恢复。今日新报，已有复现。
🔗 https://github.com/anthropics/claude-code/issues/101027

**其他值得关注：**
- **#100426** — Remote Control 会话的 `--name` 指定名称被 AI 生成标题覆盖：https://github.com/anthropics/claude-code/issues/100426
- **#80202** — [reproduced] 项目位于驱动器根目录（subst 盘 / C:\）时 CLAUDE.md 静默不加载：https://github.com/anthropics/claude-code/issues/80202
- **#97746** — Agent view 批量选中多个会话统一回复的需求：https://github.com/anthropics/claude-code/issues/97746

---

## 🔀 重要 PR 进展

今日仅 3 个 PR 更新（数据源限制，不足以凑满 10 个）：

**1. [CLOSED] #101131 — security-guidance：与 claude-plugins-official 同步（2.0.13）**
由 @mhegazy 提交，修复本仓库 security-guidance 副本版本滞后问题（本地为 2.0.0，marketplace 条目甚至显示 1.0.0 且描述陈旧，安装会得到缺少修复的旧版）。鉴于上文多个 security-guidance 问题，该同步值得跟进官方仓库的最新修复。
🔗 https://github.com/anthropics/claude-code/pull/101131

**2. [OPEN] #6754 — 文档：VS Code 中 Claude CLI 的 RTL（希伯来语/阿拉伯语/波斯语）支持**
新增 `rtl-support.md`，说明 VS Code 集成终端中 RTL 文字反向渲染的解决方案。开放超一年，今日有更新。
🔗 https://github.com/anthropics/claude-code/pull/6754

**3. [OPEN] #41447 — feat: 开源 Claude Code ✨**
社区成员提交的“开源 Claude Code”请求式 PR，关联 #59、#456、#2846、#22002、#41434 等多个开源诉求 issue。
🔗 https://github.com/anthropics/claude-code/pull/41447

---

## 📈 功能需求趋势

1. **跨端上下文与工作流打通**：Claude.ai ↔ Claude Code 上下文共享（#13843）、远程控制体验一致性（#100426、#100974）需求持续升温。
2. **多会话/Agent 编排**：Agent view 批量回复（#97746）、外部进程接管权限提示（#99964）、`claude agents --json` 状态语义规范化（#87883）——多智能体工作流正成为核心场景。
3. **脚本化/无头运行**：预信任目录以支持 `claude --bg` 脚本编排（#98006），headless 场景的权限管理需求明显。
4. **桌面端补齐**：语音听写可配置快捷键（#97929）等桌面端功能打磨需求出现。
5. **安全审查链路修复**：security-guidance 的失败静默、网关鉴权、性能问题集中爆发，是当前最紧迫的修复方向。

---

## 🛠️ 开发者关注点（痛点总结）

- **Auto mode 权限分类器可靠性**是当前最大痛点：误判只读操作、无视用户批准、远程会话无批准路径，三个问题叠加（#100374、#97914、#100974）。
- **security-guidance 插件质量危机**：静默失败标记为通过（#99840）、网关头丢失（#99857）、submodule 性能（#98731），企业用户尤其受影响。
- **长会话记忆退化**（#70555）：compaction 后状态丢失被形容为"goes dumb"，社区期待持久化工作状态机制。
- **OAuth/认证竞态**（#95822）：短命令浪费 refresh token，影响自动化脚本稳定性。
- **Windows 边缘场景**：配置目录删除导致 CPU 空转（#101027）、驱动器根目录 CLAUDE.md 不加载（#80202），Windows 生态适配仍有坑。
- **本地 TUI 与 Remote Control 的状态同步**：终端内提示对远程客户端不可见，多入口交互一致性亟待设计。

---
*数据来源：github.com/anthropics/claude-code | 统计窗口：2026-10-10 ~ 2026-10-11*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报

**日期：2026-10-11** | 数据来源：github.com/openai/codex

---

## 📌 今日速览

Codex 发布 rust-v0.163.0-alpha.5 预览版，持续迭代。过去 24 小时社区讨论焦点集中在 **Windows 桌面端稳定性**（沙箱共享冲突、Computer Use 失效、更新器崩溃）以及 **GPT-6 上线后的模型质量回退反馈**。同时团队合并了 17 个 PR，重点打磨 TUI 体验、code-mode 生命周期和语音会话可靠性。

---

## 🚀 版本发布

- **rust-v0.163.0-alpha.5**（[Release](https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.5)）：alpha 预发布版本，继续向 0.163 稳定版推进。

---

## 🔥 社区热点 Issues

1. **[#49458](https://github.com/openai/codex/issues/49458) — Windows Dots 本地任务缺失 Computer Use 工具**（71 评论 / 25 👍）
   举报最多、关注度最高的 Issue。dot 启动的本地任务无法使用 Computer Use，而普通本地会话正常，涉及 Dots 远程链路，社区持续跟进中。

2. **[#51932](https://github.com/openai/codex/issues/51932) — Windows 沙箱运行时读写校验共享冲突**（29 评论）
   26.1002.7124.0 版本沙箱校验失败，影响面广，是沙箱系列问题的核心反馈帖。

3. **[#52407](https://github.com/openai/codex/issues/52407) — Windows Dots CUA 启动器 HRESULT 0x80070003 失败**（25 评论）
   shell 恢复后 Computer Use 启动器损坏，Dots + CUA 组合在 Windows 上可靠性问题突出。

4. **[#52646](https://github.com/openai/codex/issues/52646) — Windows App 约 100 秒后崩溃（windows-updater.node 空指针）**（3 评论）
   更新器原生模块 0xc0000005 崩溃，属严重稳定性缺陷，值得 Windows 用户关注。

5. **[#52994](https://github.com/openai/codex/issues/52994) / [#52995](https://github.com/openai/codex/issues/52995) — GPT-6 系列质量回退与 server_overloaded**（新提交）
   Pro 用户报告 GPT-6 Astra / GPT-6.1 Sol 推理质量明显下降、reasoning effort High 不生效，叠加服务端过载，是今日模型行为方向的新增热点。

6. **[#51667](https://github.com/openai/codex/issues/51667) / [#52470](https://github.com/openai/codex/issues/52470) / [#52001](https://github.com/openai/codex/issues/52001) — macOS DeviceCheck 失败阻断发消息**
   26.1002.52244 更新后 macOS（尤其 VM 环境）出现 DeviceCheck token 生成失败，发送按钮被禁用或新会话无法创建，多个 Issue 交叉印证。

7. **[#37552](https://github.com/openai/codex/issues/37552) — CLI 无法使用多个终端会话**（17 评论，8 月至今未解）
   Pro 用户长期痛点，多会话并行工作流受阻。

8. **[#26613](https://github.com/openai/codex/issues/26613) — Windows 后台轮询时 PowerShell 窗口闪烁**（14 评论 / 11 👍）
   老问题持续活跃，影响桌面体验的观感与专注度。

9. **[#17541](https://github.com/openai/codex/issues/17541) — Azure 用户切换模型时 "encrypted content could not be decrypted"**（11 评论 / 10 👍）
   4 月至今未修复，Azure 企业用户跨模型对话的核心阻断问题。

10. **[#52996](https://github.com/openai/codex/issues/52996) — Windows Desktop HTTP 432 workspace 路由失败**
    账号/workspace 初始化持续失败，新 Issue，可能与服务端路由相关。

---

## 🔧 重要 PR 进展

1. **[#52990](https://github.com/openai/codex/pull/52990)** — TUI 新增可搜索的 `/config` 偏好设置面板，分组为外观、通知、输入、会话等 Tab。
2. **[#52972](https://github.com/openai/codex/pull/52972)** — 升级 `rmcp` 至 3.5.1，MCP 生命周期测试加固。
3. **[#52967](https://github.com/openai/codex/pull/52967)** — WSL 剪贴板读取复用并预热 PowerShell 进程，修复粘贴挂起。
4. **[#52964](https://github.com/openai/codex/pull/52964)** — 大段原始粘贴时延迟 transcript 重绘，显著优化粘贴性能。
5. **[#52937](https://github.com/openai/codex/pull/52937)** — 压缩（compaction）时保留 `retain: true` 标记的客户端工具输出，避免任务指令丢失。
6. **[#52825](https://github.com/openai/codex/pull/52825) / [#52952](https://github.com/openai/codex/pull/52952)** — code-mode gRPC 运行时重置后主动上报状态丢失，而非静默继续。
7. **[#52748](https://github.com/openai/codex/pull/52748)** — code-mode 的 `exit()` 现在终止整个 cell，防止 catch/finally 中继续执行。
8. **[#52742](https://github.com/openai/codex/pull/52742)** — 新增 opt-in 的输出 token 回放（`output.encrypted_content`），为请求重试/回放铺路。
9. **[#52725](https://github.com/openai/codex/pull/52725)** — 通过 OSC 7501 向任意终端上报程序状态（idle/working/blocked），不再限于 iTerm2。
10. **[#52778](https://github.com/openai/codex/pull/52778)** — 置顶的 transcript 提示词可点击跳转到原始位置；另有 [#52756](https://github.com/openai/codex/pull/52756) 对语音会话失败进行分类与指标记录。

---

## 📈 功能需求趋势

- **Windows 平台质量**：今日 30 条热点 Issue 中超过一半来自 Windows，沙箱、Computer Use、Dots 是三大重灾区。
- **Dots / 远程任务联动**：dot 启动任务的能力缺失、授权拒绝（[#50521](https://github.com/openai/codex/issues/50521)）、云任务沙箱 bug（[#52715](https://github.com/openai/codex/issues/52715)）持续发酵。
- **GPT-6 迁移阵痛**：模型选择器缺失（[#52992](https://github.com/openai/codex/issues/52992)）、推理质量回退成为新话题。
- **跨设备/多端同步**：会话同步陈旧（[#48490](https://github.com/openai/codex/issues/48490)）、多终端会话支持呼声高。
- **权限与授权体验**：社区希望权限审批可复用并明确授权范围（[#17623](https://github.com/openai/codex/issues/17623)）。

---

## ⚠️ 开发者关注点

1. **Windows 用户暂建议谨慎升级**：26.1002.7124.0 存在沙箱共享冲突、嵌入式工具链 DLL 重定位错误（[#51674](https://github.com/openai/codex/issues/51674)）等多个回归。
2. **Azure 用户注意**：会话中途切换模型仍会触发解密失败（#17541），避免跨模型续写。
3. **macOS 26.1002.52244 有 DeviceCheck 风险**，VM/UTM 环境用户尤其受影响。
4. **Hooks 开发者**：Stop hook 在 `/goal` 续跑边界误触发、`/review` 不触发 Stop hook（[#52950](https://github.com/openai/codex/issues/52950) / [#52949](https://github.com/openai/codex/issues/52949)），自动化流水线需留意。
5. **积极信号**：PR 侧 TUI 性能（粘贴、剪贴板）、code-mode 可靠性和 MCP 升级推进迅速，CLI 体验在稳步改善。

---

*本报告基于过去 24 小时 GitHub 公开数据自动整理，评论区情绪与问题状态请以原始链接为准。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-11）

## 📰 今日速览

今日发布 v0.65.0-nightly 版本，包含 JSON 解析错误处理与字符串截断保真两项修复。社区贡献活跃，新增多个高质量 PR，涵盖 ACP 会话回放、ENAMETOOLONG 修复、网页搜索 30 秒超时等关键改进。Issues 方面，agent 挂起、子代理状态误报等稳定性问题仍是社区讨论焦点。

---

## 🚀 版本发布

**v0.65.0-nightly.20261010.g9b6e0265d**
- `fix(cli)`: fetchJson 中处理 JSON 解析与响应流错误 ([#29658](https://github.com/google-gemini/gemini-cli/pull/29658))
- `fix(core)`: truncateString 保留换行符不被破坏 ([#29673](https://github.com/google-gemini/gemini-cli/pull/29673))

---

## 🔥 社区热点 Issues

1. **子代理达到 MAX_TURNS 后误报 GOAL 成功**（P1，13 评论）
   `codebase_investigator` 碰到轮次上限仍报告 "success"，掩盖了实际中断。这直接影响任务可靠性判断，是最受关注的 agent 状态机问题。
   [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)

2. **通用 agent 无限挂起**（P1，8 评论 / 8 👍）
   委派给 generalist agent 后永久挂起，简单如创建文件夹也会卡死 1 小时以上，用户只能手动禁用子代理规避。👍 数高说明影响面广。
   [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)

3. **零依赖 OS 沙箱 + 执行后意图路由**（P2，9 评论）
   利用 Gemini 3 原生 bash 能力链式调用 POSIX 工具，同时不牺牲安全性。这是社区对 agent 架构演进的重要提案。
   [#19873](https://github.com/google-gemini/gemini-cli/issues/19873)

4. **AST 感知文件读取/搜索/代码库映射评估**（P2，7 评论）
   探讨用 AST 工具（tilth、glyph、ast-grep）精确读取方法边界、降低 token 噪声，下辖多个子议题，是 token 效率方向的 EPIC。
   [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)

5. **Gemini 不主动使用 skills 和子代理**（P2，7 评论）
   用户反馈自定义 skill 几乎不会被自主调用，除非显式指示。反映了调度策略的实际痛点。
   [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)

6. **Browser Agent 忽略 settings.json 配置覆盖**（P2，4 评论）
   AgentRegistry 正确读取合并配置，但 Browser Agent 完全忽略 maxTurns 等覆盖项，配置链路存在断裂。
   [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)

7. **Browser 子代理在 Wayland 下失败**（P1，4 评论）
   Linux Wayland 环境下浏览器子代理直接失败，影响 Linux 桌面用户。
   [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)

8. **工具数超 128 触发 400 错误**（P2，3 评论）
   可用工具超过 128 个时 API 报 400，需要 agent 侧智能裁剪工具范围。
   [#24246](https://github.com/google-gemini/gemini-cli/issues/24246)

9. **模型在随机位置创建临时脚本**（P2，3 评论）
   限制 shell 执行后，模型在多个目录散落编辑脚本，污染工作区、增加提交清理成本。
   [#23571](https://github.com/google-gemini/gemini-cli/issues/23571)

10. **浏览器会话接管与锁恢复增强**（P3，4 评论）
    persistent 模式下浏览器 profile 被锁时直接 fail-fast，建议自动接管会话，提升 browser_agent 韧性。
    [#22232](https://github.com/google-gemini/gemini-cli/issues/22232)

---

## 🔧 重要 PR 进展

1. **ACP 会话回放时序修复**（#29708）— `session/load` 在历史回放完成前就返回响应，导致回放的 update 通知混入下一个 prompt，违反 ACP 规范。修复为回放完成后再响应。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29708)

2. **原子写临时文件名超出 NAME_MAX 修复**（#29703）— 文件名 215-255 字节时因 41 字节 `.<uuid>.tmp` 后缀触发 ENAMETOOLONG，修复后保持临时名在限制内。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29703)

3. **网页搜索 30 秒超时**（P1，#29608）— GoogleSearch/WebFetch 底层 LLM 调用未 settle 导致 agent 永久 "Thinking..."（用户报告挂起 30+ 分钟），现强制 30 秒超时。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29608)

4. **Gemini 3 点分版本多模态函数响应支持**（#29611）— 解析模型别名、支持 `gemini-3.8-flash` 等点分版本，避免图像工具输出作为非法 sibling parts 触发 HTTP 400。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29611)

5. **终端宽度变化的防抖 UI 刷新恢复**（P1，#29644）— 恢复 `refreshStatic()` 100ms 防抖，修复横向调整终端时内联渲染模式的闪烁。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29644)

6. **VSCode 扩展 dispose 泄漏修复**（#29709）— `activate()` 中多余括号使注册调用变成逗号表达式，disposables 未入 subscriptions，导致泄漏。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29709)

7. **自定义 Header 解析修复**（#29606）— `GEMINI_CLI_CUSTOM_HEADERS` 中含 JSON 元数据（如 `,"name":`）的 header 值被错误切分，改为仅在合法 RFC 9110 token 前切分。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29606)

8. **时长格式化边界取整**（#29705）— `1000ms` 显示为 `1.0s`、`60.0s` 显示为 `1m`，先取整再选单位，避免边界值显示混乱。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29705)

9. **Rootless Podman keep-id 支持**（P1，已关闭，#29505）— 修复沙箱在 rootless Podman 下因 UID/GID 映射无对应用户而启动失败的问题。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29505)

10. **CI 加固两则**（#29615 / #29607）— chained E2E 仅在上游 workflow 成功时检出代码，防止意外 checkout；nightly eval 无报告时 fail 而非静默 exit 0。
    [#29615](https://github.com/google-gemini/gemini-cli/pull/29615) | [#29607](https://github.com/google-gemini/gemini-cli/pull/29607)

---

## 📈 功能需求趋势

- **Agent 稳定性与状态准确性**：挂起、误报成功、子代理中断被隐藏等问题是当前 P1 密集区，社区对“可信任的执行结果”诉求强烈。
- **Token 效率与 AST 感知工具**：Tactful Extraction（#19561）、AST 感知读取/搜索（#22745/#22746/#22747）形成完整调研矩阵，目标是降低 36.6k/turn 的上下文基线。
- **子代理能力增强**：并行子代理共享内存（#18287）、子代理轨迹可视化（#22598）、本地子代理 Sprint（#20195）持续推进。
- **安全沙箱与破坏性操作防护**：OS 级沙箱方案（#19873）、阻止 `git reset --force` 等危险命令（#22672）。
- **浏览器自动化**：Wayland 支持、配置覆盖生效、会话锁恢复等一批 browser_agent 相关需求涌现。
- **任务管理持久化**：用文件 CRUD 替代上下文内 WriteToDo，对抗 context rot（#18836/#21000）。

---

## ⚠️ 开发者关注点

- **挂起问题最伤体验**：agent 挂起（#21409）与网页搜索挂起（#29608）都是用户等待数十分钟级别的问题，PR #29608 落地后将显著缓解一类场景。
- **状态不可信**：MAX_TURNS 被报告为 GOAL 成功（#22323），使得自动化流水线难以依赖退出状态做决策。
- **Token 成本焦虑**：大文件读取“firehose”式灌入上下文、工具数超限报错，社区持续寻求精细化上下文管理方案。
- **配置一致性**：settings.json 覆盖在 browser agent 上失效（#22267）、symlink 代理不被识别（#20079），配置链路边界情况仍需打磨。
- **容器化环境兼容性**：rootless Podman 修复关闭后，沙箱在非标准容器环境下的兼容性仍是贡献热点。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-10-11）

## 1. 今日速览

今日连发两个修复版本 v1.0.96-1 与 v1.0.96-2，重点改进沙箱交互式安全设置（含环境密钥检测与主机屏蔽）和模型 ID 大小写处理。社区活跃度高，过去 24 小时新增/更新 21 条 Issue，集中在**沙箱/权限**（macOS Gradle、git 凭据、sessionStart hook）和**会话稳定性**（事件投递超时、BYOK 子代理模型混用）两大方向。

---

## 2. 版本发布

### [v1.0.96-2](https://github.com/github/copilot-cli/releases)
**Fixed**
- `/model` 与 `/config` 中的模型 ID 现在不区分大小写，并保存规范化 ID

### [v1.0.96-1](https://github.com/github/copilot-cli/releases)
**Added**
- 交互式沙箱设置可提示潜在的环境密钥，允许在保存前添加掩码主机
**Fixed**
- 企业策略解析期间保持 `/allow-all` 可用

---

## 3. 社区热点 Issues

1. **[#2494](https://github.com/github/copilot-cli/issues/2494) | 认证回归已关闭** — v1.0.16 中 `copilot login` 在系统 Keychain 不可用时自动替用户确认 y/N 提示的回归 bug 今日关闭。社区关注度高（12 条评论），长期回归终于修复。

2. **[#4946](https://github.com/github/copilot-cli/issues/4946) | 后台 shell 通知导致 HTTP 400** — 后台命令跨轮次完成后，通知事件携带 `content[].thinking` 触发 400 错误。涉及会话与模型层交互协议，影响后台任务工作流，7 条评论持续讨论中。

3. **[#5109](https://github.com/github/copilot-cli/issues/5109) | 托管策略刷新失败导致 CLI 完全不可用** — v1.0.95 在企业环境下卡在“Managed account policy could not be refreshed”重试循环，属于可用性阻断级问题，值得关注优先级。

4. **[#5100](https://github.com/github/copilot-cli/issues/5100) | 会话事件投递一次超时即永久失败** — 120s 宿主确认超时后整个会话不可用直到 resume，对长会话交互场景是严重稳定性问题。

5. **[#5103](https://github.com/github/copilot-cli/issues/5103) | BYOK 子代理强制沿用会话 wire API** — 同一会话中混用不同 API 家族的模型（如 GPT-5 + Claude）时子代理报 400，BYOK 多模型用户的核心痛点。

6. **[#5105](https://github.com/github/copilot-cli/issues/5105) | macOS 沙箱阻断 Gradle daemon 本地连接** — 即使允许本地网络，Gradle 客户端仍无法连接 localhost daemon，反映 macOS 沙箱对 JVM 构建工具链的兼容性缺口。

7. **[#5102](https://github.com/github/copilot-cli/issues/5102) | 沙箱 git 无法使用独立凭据（回归）** — 沙箱注入的 `credential.helper` 覆盖使用户无法为 git 提供与登录身份不同的 PAT，企业多身份场景受影响。

8. **[#5111](https://github.com/github/copilot-cli/issues/5111) | 50 图片上限忽略模型能力且破坏 prompt cache** — 图片驱逐逐条改写缓存前缀，长多模态会话成本与延迟显著增加，与已关闭的 [#4831](https://github.com/github/copilot-cli/issues/4831) 同源。

9. **[#5097](https://github.com/github/copilot-cli/issues/5097) | HydraFusion 路由失败静默降级** — 策略 max 下路由返回策略外模型后静默回退到 gpt-5.6-luna，用户为高级模型付费却得到低配体验，透明度问题。

10. **[#5098](https://github.com/github/copilot-cli/issues/5098) | 添加沙箱文件系统路径后 sessionStart hook 停止运行** — 精细化 `userPolicy.filesystem` 配置与插件 hook 生命周期冲突，影响插件生态可靠性。

---

## 4. 重要 PR 进展

过去 24 小时仅 1 条 PR 更新：

- **[#5106](https://github.com/github/copilot-cli/pull/5106) | Create index.html** — 仅附带一个 index.html 文件链接，无实质描述，疑似垃圾/误提交 PR，建议维护者关注并及时处理。

*（本期无实质性功能/修复 PR 更新，修复内容主要通过上述 Release 直接发布。）*

---

## 5. 功能需求趋势

- **沙箱精细化控制**：文件系统路径、网络、git 凭据、hook 交互（#5098、#5102、#5105、#5107），社区对“安全但可用”的沙箱配置诉求强烈
- **多模型 / BYOK 深化**：wire API 按模型自动选择、路由透明度、模型能力上限尊重（#5103、#5097、#5111）
- **会话稳定性与性能**：事件投递恢复、ACP 分页效率、桌面端会话分组管理（#5100、#5108、#5104）
- **MCP 与插件生态**：`copilot mcp` 子命令（#590，已关闭，或已实现）、面向用户的脱敏显示 hook（#5099）
- **可访问性与渲染**：深色主题下 thinking 文本对比度（#3866 已修复）、输入/回复视觉区分（#2746 已关闭）

---

## 6. 开发者关注点

1. **沙箱与企业环境的摩擦最大**：托管策略刷新失败致 CLI 不可用（#5109）、git 凭据被强制覆盖（#5102）、Gradle/macOS 兼容性（#5105）——企业用户是当前最不满的群体。
2. **长会话稳定性**：120s 超时后永久失败（#5100）、后台任务通知触发 400（#4946）表明会话事件机制在异常路径下缺乏韧性。
3. **静默降级损害信任**：HydraFusion 静默回退（#5097）、图片驱逐破坏缓存（#5111），用户希望模型/配额变化有明确告知。
4. **多模态体验待打磨**：图片上限提示误导（#4831）、`view` 工具误报文件过大（#4633），基础工具链的边界判断仍需打磨。
5. **可访问性持续改进中**：深色主题对比度（#3866）已随版本修复，呼应官方对 theming-accessibility 标签的投入。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期：2026-10-11 | 数据来源：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)**

---

## 1. 今日速览

今日社区整体活跃度较低：过去 24 小时无新版本发布、无 Issue 更新，仅有一条文档类 PR 产生动态。其中 [#1718](https://github.com/MoonshotAI/kimi-cli/pull/1718)（AGENTS.md 专题文档）于昨日更新并已关闭，标志着 AGENTS.md 使用规范的官方文档正式落地。

---

## 2. 版本发布

过去 24 小时无新 Release 发布。

---

## 3. 社区热点 Issues

过去 24 小时内无 Issue 更新，本期暂无内容。建议关注 Issue 列表的后续动态。

---

## 4. 重要 PR 进展

### 📄 [#1718](https://github.com/MoonshotAI/kimi-cli/pull/1718) — docs: 新增 AGENTS.md 专题页、安全边界说明和首页导览 ✅ 已合并/关闭

- **作者**：@liwang614（创建于 2026-04-02，2026-10-10 更新）
- **内容**：本 PR 是一项重要的文档增强，新增内容包括：
  - `docs/{zh,en}/customization/agents-md.md`：**AGENTS.md 专题页**（中英双语），系统阐述：
    - AGENTS.md 与 README.md 的区别与定位
    - 加载行为：仅读取工作目录、**大写文件名优先**
    - `/init` 命令的生成流程
    - 推荐写入的内容清单及更新时机指引
  - **安全边界说明**：明确 CLI 的安全行为边界
  - **首页导览**：改善新用户的文档入门体验
- **意义**：AGENTS.md 作为跨工具的 Agent 指令文件标准（类似 CLAUDE.md、.cursorrules），其官方文档化有助于用户更好地定制 Kimi CLI 的行为，是降低上手门槛的关键一步。

> 📌 过去 24 小时仅此一条 PR 动态，其余 PR 可留意仓库 Pull Requests 页面。

---

## 5. 功能需求趋势

由于今日无新增 Issue 数据，以下为基于近期文档方向（如 #1718）的观察：

- **项目上下文定制化**：AGENTS.md、README.md 等上下文文件的加载规则与生成工具（`/init`）是用户关注重点
- **安全与可控性**：官方主动补充"安全边界说明"，反映社区对 CLI 权限与安全边界的关切
- **文档与上手体验**：首页导览、多语言文档持续完善

---

## 6. 开发者关注点

- **配置文件行为透明度**：开发者需要清晰了解 AGENTS.md 的加载优先级与作用范围（本次文档已明确"仅工作目录、大写优先"）
- **安全边界认知**：CLI 在何种权限下执行操作、如何避免越界，是高频疑问点
- **新用户引导**：文档导览与最佳实践指南仍是降低采用门槛的核心需求

---

*💡 提示：今日数据量较少，日报内容以唯一动态 PR #1718 为核心展开。如需追踪更多动态，可订阅仓库的 Releases 与 Issues 通知。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-10-11

## 📰 今日速览

今日无新版本发布。社区焦点集中在 **v2 迁移引发的兼容性问题**（自定义 provider 配置失效、代理失效、遗留配置块被静默丢弃）以及一个严重的**工具结果压缩器数据丢失 Bug**（#54352）。PR 方面，ACP steering 支持、OSC 7501 终端状态协议、会话中断加速等多项社区贡献活跃推进，波斯语 README 翻译多次提交适配 V2 分支。

---

## 🔥 社区热点 Issues

**1. [#54352](https://github.com/anomalyco/opencode/issues/54352) — 压缩器生成无法兑换的 ccr 指针，大型工具结果被破坏性丢弃**
最严重的可靠性问题。execute 工具结果压缩器将大结果替换为 `<<ccr:...>>` 指针，但负载未持久化到任何存储，模型完全丢失内容。7 条评论，已进入 triaging。

**2. [#54109](https://github.com/anomalyco/opencode/issues/54109) — opencode.json 自定义 provider 配置被忽略（本地 Ollama 无法加载）**
v1.18.35 上按官方文档配置 Ollama 失败，`opencode models` 中不出现。直接影响本地模型用户，6 条评论。

**3. [#54370](https://github.com/anomalyco/opencode/issues/54370) — v2 静默丢弃 V1 legacy provider 配置块，导致 Go 凭证失效**
升级 v2 后出现 `Missing API key`，根因是旧格式 `provider.<id>` 块被静默丢弃且无任何警告。暴露了 v2 迁移缺乏失败提示的设计问题。

**4. [#52269](https://github.com/anomalyco/opencode/issues/52269) — OpenAI 上游连接间歇性失败（评论最多的 Issue，13 条）**
跨模型、跨会话的 `Service Unavailable` 上游连接错误，部分请求反复失败并触发自动重试。持续 10 天未解决。

**5. [#54400](https://github.com/anomalyco/opencode/issues/54400) — read 工具丢失缩进、edit 要求字节级匹配，Agent 被迫退回 shell 读写文件**
工具链体验问题：`read` 输出丢失缩进、`edit` 的 `oldString` 需精确字节匹配，导致 Agent 绕过原生工具使用 `cat`/PowerShell。间接影响准确性与可审计性。

**6. [#42538](https://github.com/anomalyco/opencode/issues/42538) — 会话删除慢/挂起、留下幽灵会话、冻结整个应用**
与 [#36670](https://github.com/anomalyco/opencode/issues/36670)（SessionProcessor.cleanup 与 "removing share" 竞争）指向同一根源，是存在两个多月的顽疾。

**7. [#54205](https://github.com/anomalyco/opencode/issues/54205)（已关闭）— 远程 MCP `{env:VAR}` 凭证解析为空：全局配置永久缓存**
后台服务无限 TTL 缓存全局配置，环境变量更新后发送空 token，需重启服务。对安全敏感的 MCP 集成影响大。

**8. [#54269](https://github.com/anomalyco/opencode/issues/54269)（已关闭）— Copilot Opus 5.5 思考占满 32k 输出上限，静默结束无答案**
`finish_reason=length` 且无报错，会话直接空闲。长思考模型的输出预算分配问题。

**9. [#54185](https://github.com/anomalyco/opencode/issues/54185) — Title Agent 生成对话式回复而非会话标题**
V2 隐藏 title agent 角色扮演助手回答用户首条 prompt，甚至编造约束条件。影响会话管理可用性。

**10. [#49879](https://github.com/anomalyco/opencode/issues/49879) — 请求恢复 V1 Plan 模式的持久化计划文件工作流**
功能回退诉求：V1 实验性 Plan 模式可将计划写入 `.opencode/plan` 文件，V2 未继承。

---

## 🔧 重要 PR 进展

| PR | 内容 |
|---|---|
| [#54394](https://github.com/anomalyco/opencode/pull/54394) | **feat(acp): 支持 `_session/steering`**，作为 ACP v2 的过渡方案，从 V1 移植 |
| [#54402](https://github.com/anomalyco/opencode/pull/54402) | **feat(tui): 实现层级化 OSC 7501 程序状态上报**，响应 #54179 需求，含测试 |
| [#54403](https://github.com/anomalyco/opencode/pull/54403) | **fix(core): 加速会话中断、steer 幂等化**，解决服务繁忙时停止缓慢的问题 |
| [#54278](https://github.com/anomalyco/opencode/pull/54278) | **fix(config): 保留以未加引号流程指示符开头的 frontmatter 值**，修复 agent 描述解析 |
| [#54210](https://github.com/anomalyco/opencode/pull/54210) | **fix(core): Copilot 回退路由遵循 models.dev 包定义**，修复 Claude 误走 `/chat/completions` |
| [#54093](https://github.com/anomalyco/opencode/pull/54093) | **fix(core): 跨符号链接根目录重排目录监听事件**，修复 macOS `/tmp` 路径监听失效 |
| [#54090](https://github.com/anomalyco/opencode/pull/54090) | **fix(core): 发布权限请求前剔除 undefined 元数据**，修复 glob/grep 权限挂起时 HTTP 400 |
| [#51482](https://github.com/anomalyco/opencode/pull/51482) | **fix(core): 支持 AI SDK v4 媒体输入**，修复 v4 provider 工具图片序列化为 null |
| [#37902](https://github.com/anomalyco/opencode/pull/37902) | **fix(acp): 子代理会话权限请求不再永久挂起**（已合并关闭） |
| [#54407](https://github.com/anomalyco/opencode/pull/54407) | **docs: 波斯语 README 翻译移植到 V2**（前次 #54405 被关后重新提交，第三度尝试） |

> 注：多个月前的贡献 PR（#48352 `shell_stop`、#48336 会话导入 ID 冲突、#48300 工具调用显示模式等）被自动化 stale 清理批量关闭，社区贡献流失值得关注。

---

## 📈 功能需求趋势

1. **v2 迁移兼容性**：最大主题——配置静默失效（provider、代理、legacy 块），用户强烈要求迁移期错误提示与平滑过渡。
2. **编辑器/ACP 集成**：Zed ACP 集成（#53799）、steering 支持（#54394）持续活跃。
3. **TUI 体验与终端集成**：OSC 7501 状态协议、垂直标签页（#54216）、终端切换按钮回归（#54193）。
4. **长上下文与大结果处理**：压缩器数据丢失（#54352）、TUI 大 MCP 结果渲染损坏（#54199）。
5. **工作流恢复**：Plan 模式持久化计划文件（#49879）。

---

## ⚠️ 开发者关注点

- **数据安全是红线**：#54352 的破坏性压缩直接丢失工具结果，无任何告警——类似“静默失败”模式（配置丢弃、空 token、静默截断）在本期多个 Issue 中反复出现，建议官方加强可观测性与失败显式化。
- **v1 → v2 升级风险高**：涉及自定义 provider、代理、配置格式的用户升级前应备份配置并核对日志。
- **服务生命周期缓存问题**：配置无限 TTL（#54205）、插件双键缓存不刷新（#48514），重启后台服务是常见 workaround。
- **贡献者流失信号**：自动化 stale 清理批量关闭有效贡献 PR，部分作者（如 @pouramin）需三次重提才能落地，维护流程对社区贡献不够友好。

---
*数据来源：GitHub anomalyco/opencode · 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-10-11

## 一、今日速览

Qwen Code 发布 **v0.25.1-preview.2** 预览版，核心修复了远程 Hosts 替换时丢失绑定的问题。社区讨论焦点集中在 **Managed Agent 多阶段架构**（Stage H4 系列持续推进）与**会话稳定性**——今日新增多个 P1 级问题涉及 Harness 重启导致会话卡死、Live Voice 永久挂起等关键缺陷。XML tool-call 恢复系列 bug 的性能与正确性问题仍在收尾。

## 二、版本发布

- **v0.25.1-preview.2** — [Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.25.1-preview.2)
  - `fix(agents)`: 替换选中的远程 Hosts 时不再丢失绑定（PR #13430）
  - 补充核心测试收尾工作
- **v0.25.0-nightly.20261010** — 每日 nightly 构建，包含上述修复

## 三、社区热点 Issues

1. **[#12380](https://github.com/QwenLM/qwen-code/issues/12380) Managed Agent 双路径架构提案**（51 评论）— 本期讨论量最高，定义托管 Agent 的分阶段交付架构：Session 持久所有权、Workspace 绑定、可恢复的工具执行，是当前 roadmap 的核心方向。

2. **[#13857](https://github.com/QwenLM/qwen-code/issues/13857) Harness 重启导致后续所有 Turn 卡死**（P1）— 模型调用进行中若 Harness 重启，Session 进入 `unresolved_after_settle` 且无法自愈，影响托管模式可用性。

3. **[#13820](https://github.com/QwenLM/qwen-code/issues/13820) Live Voice 挂断后永久 "stopping"**（P1）— 挂断时若有未完成转录，语音会话卡死，只能重启 daemon 恢复。

4. **[#10797](https://github.com/QwenLM/qwen-code/issues/10797) 非思考类脚手架标签泄漏到用户输出**（in-review）— tool-result 块、system-reminder 被回显给用户，10-07 验证仍可复现，属输出质量长期痛点。

5. **[#13492](https://github.com/QwenLM/qwen-code/issues/13492) XML tool-call 恢复丢弃含引号标记的外层调用**（in-review）— 部分修复（#13515 已合并），外层调用恢复仍待 #13579 落地。

6. **[#13787](https://github.com/QwenLM/qwen-code/issues/13787) XML 恢复在多调用大响应上重复前缀扫描**（P3）— 与 #13492 同源的延迟问题，大响应时性能显著劣化。

7. **[#13785](https://github.com/QwenLM/qwen-code/issues/13785) Multi-Agent API 公共契约提案**（ready-for-human）— 在既有公开契约上增加 agent 身份维度，使多 Agent 执行可归因、树状、可中断。

8. **[#13709](https://github.com/QwenLM/qwen-code/issues/13709) H4b: 子 Session 准入时统计 PostToolUse 未来挂载**（P1）— H4b 子运行时的挂载检查读取当前状态而非未来状态，可能导致准入竞态。

9. **[#2566](https://github.com/QwenLM/qwen-code/issues/2566) 基于上下文压力的动态工具输出截断**（3 月提出）— PR #13599 持续推进，是 context-performance 方向的长期需求。

10. **[#13837](https://github.com/QwenLM/qwen-code/issues/13837) 聊天视图 RTL/LTR 混排渲染错误** — 希伯来语与英文混排时代码块强制 LTR、无 bidi 隔离，国际化体验缺口。

## 四、重要 PR 进展

1. **[#13773](https://github.com/QwenLM/qwen-code/pull/13773) H4b 修复：准入时统计未来 result-hook 挂载** — 对应 P1 Issue #13709，前后台请求在创建子任务前拒绝并说明原因。

2. **[#13674](https://github.com/QwenLM/qwen-code/pull/13674) 公共前台 Shell 准入（默认关闭）** — 授权的公共 REST/WebShell Workspace 会话可选启用前台 Shell profile，强制审批模式。

3. **[#11854](https://github.com/QwenLM/qwen-code/pull/11854) 混合 code mode** — 对齐 Codex 的 `tools.mode` 枚举（`direct`/`code_mode`/`code_mode_only`），暴露隔离的 `exec` JavaScript 工具。

4. **[#13654](https://github.com/QwenLM/qwen-code/pull/13654) 工具发布异步验证** — 发布回读与流验证移至持久化后台 worker，上传提交后返回 202。

5. **[#13669](https://github.com/QwenLM/qwen-code/pull/13669) OpenTUI 转录窗口化** — 只挂载视口附近条目，修复长会话恢复白屏问题。

6. **[#13436](https://github.com/QwenLM/qwen-code/pull/13436) 会话恢复中保留取消意图** — 用户显式取消不可被恢复继续，基础设施中断仍可恢复。

7. **[#13219](https://github.com/QwenLM/qwen-code/pull/13219) 托管 Agent 重试循环增加终止状态** — 消除永久卡死的投影，所有异步重试循环获得预算与终态。

8. **[#13628](https://github.com/QwenLM/qwen-code/pull/13628) 系统设置环境变量加信任门控** — 防止用户自有文件冒充系统层配置，安全加固。

9. **[#13676](https://github.com/QwenLM/qwen-code/pull/13676) 补齐 thinking 块空签名** — 兼容严格 Anthropic 代理对未签名 thinking 块的校验，改善跨供应商历史回放。

10. **[#13642](https://github.com/QwenLM/qwen-code/pull/13642) Runtime Broker JDBC 历史有界清理** — opt-in 的终端历史清理，独立调度线程执行，保留恢复与发布授权。

## 五、功能需求趋势

- **Managed Agent / 多 Agent 架构**（最热）：#12380、#13785、#13533、#13746 等持续围绕 Stage H3-H5 交付切片展开，是 roadmap 的绝对主线。
- **会话稳定性与可恢复性**：Harness 重启、子 Session 准入、审批重投递（#13857、#13709、#13847）——托管模式的崩溃恢复是最高优先级。
- **上下文性能**：动态工具输出截断（#2566）、token 节省的效果度量门槛（#12333）——社区要求“省 token 不能牺牲任务成功率”。
- **XML tool-call 恢复正确性与性能**：#13492、#13787、#10700 系列，修复接近收尾。
- **国际化与平台覆盖**：RTL 渲染（#13837）、俄语 locale（#13685）、Windows Python SDK（#13861）、Android Phase 2（#13111）。
- **语音交互**：Live Voice 可靠性问题开始浮现（#13820）。

## 六、开发者关注点

1. **托管/daemon 模式的健壮性**是当前最大痛点：崩溃恢复、审批丢失、后台进程观测、backpressure 等问题密集出现，多个 P1 issue 待解。
2. **输出纯净度**长期未根治：脚手架标签泄漏、孤立闭合标签、`</think>` 追加等问题横跨多个版本。
3. **跨供应商/跨语言兼容性**：Anthropic 代理严格校验、RTL 文本、Windows npm shim 等边缘场景请求增多。
4. **审查流程负担重**：大量 issue 是"deferred review findings"（PR 合并后遗留建议），#13599、#13682、#13737 等均拆出后续跟进，反映大 PR 的 review 债务偏高。
5. **CI 主干不稳定**：#12714 主干 CI 失败（146+ 测试）标记 autofix/approved 但仍未闭环。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*