# AI CLI 工具社区动态日报 2026-09-25

> 生成时间: 2026-09-24 23:11 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告（2026-09-25）

---

## 1. 生态全景

AI CLI 工具已从“单一命令行助手”演进为覆盖 **CLI + 桌面端 + IDE 插件 + SDK + 云端会话（Cowork/Managed Agent）** 的全形态开发平台。头部厂商（Anthropic、OpenAI、Google、GitHub）进入功能深化期，架构级重构成为主旋律（Qwen 弃 Electron 转 Tauri、Codex 密集重构 Windows 沙箱、Gemini CLI 打磨 Subagent 体系）。与此同时，**静默失败、内存泄漏、Windows 平台稳定性**成为跨工具的共性债务，社区信任焦点正从“功能有没有”转向“系统到底做了什么”的可观测性诉求。

---

## 2. 各工具活跃度对比

| 工具 | 今日热点 Issues | 活跃 PR | Release | 迭代特征 |
|------|:---:|:---:|------|------|
| **Claude Code** | 10+（含 2 个 data-loss） | 5 条合入 | v2.1.282 | 稳定期，细节打磨为主（diff/遥测） |
| **OpenAI Codex** | 10+（7/10 与 Windows 相关） | 50+ 活跃 | 6 个 Rust 版本（0.158.0 连发 5 alpha） | 高速迭代，大版本前密集预发布 |
| **Gemini CLI** | 10 | 46 条更新 | v0.62.0 nightly + preview | 稳定性攻坚（P1 PR 密集） |
| **Copilot CLI** | 10（多条高赞） | 1（仅 CI 维护） | 2 个补丁版（v1.0.89-2/3） | 修复靠 release 驱动，PR 透明度低 |
| **Qwen Code** | 10 | 10+ | v0.24.5（CLI + Desktop + TS SDK + Java SDK） | 架构转型期，多端同步发布 |
| **OpenCode** | 10 | 10+ | 无 | V2 迁移期，稳定性反馈集中 |
| **Kimi Code CLI** | 0 | 1（安全依赖升级，已关闭） | 无 | 低活跃，数据量过小暂不纳入深度对比 |

> **活跃度梯队**：Codex / Gemini CLI（第一梯队，40-50+ PR）→ Claude Code / Qwen / OpenCode（第二梯队）→ Copilot CLI（issue 热但 PR 静默）→ Kimi CLI（平静期）。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|------|------|------|
| **静默失败治理** | 全部（Claude Code、Qwen、OpenCode、Copilot 尤甚） | 定时任务不启动（CC #93015）、TUI 无提示崩溃（Qwen #11500）、MCP 权限请求不渲染（OC #51223）、queued 会话永久 wedge（Copilot #4755）——社区共识：“宁可报错，不要假装成功” |
| **长会话内存与压缩可靠性** | Claude Code、Copilot、OpenCode、Gemini CLI | V8 4 GiB 堆 OOM（Copilot #4699）、compaction 失败 crash loop（Copilot #4780、OC #51202）、Auto-Compact 时机（CC #71254）、内存无限增长修复（Gemini #29451） |
| **多会话/并发一致性** | Claude Code、Copilot、Qwen、Gemini | worktree 回收误删（CC #77268）、branch 会话限制（Copilot #4742）、并发文件编辑竞态（Gemini #29494）、MCP 会话标识缺失（CC #41836） |
| **MCP 生态健壮性** | Claude Code、Codex、OpenCode、Qwen | schema 预算（Codex #47936）、启动预热缺失（OC #48743）、多 MCP 并发失败、工具数上限（Gemini #24246） |
| **安全与权限透明度** | Claude Code、Gemini、OpenCode、Qwen | 安全护栏误报不可解释（CC #96118）、沙箱 shell 注入（Gemini #29492）、Auto Memory 密钥脱敏（Gemini #26525）、deny 语义收紧（OC #50429） |
| **沙箱能力（尤以 Windows）** | Codex（最重）、Copilot、Claude Code | 沙箱初始化失败、注册表/策略兼容、企业 AppLocker/WDAC 环境 |
| **配额/计费透明度** | Codex、OpenCode | 简单任务烧配额（Codex #46707）、免费额度重置异常（OC #50091） |
| **小模型决策分流降本** | Gemini、Qwen | Decision Gate（Gemini #29482、Qwen #12589/#12590）——同一思路在两个社区独立出现，是明确的收敛信号 |

---

## 4. 差异化定位分析

| 维度 | Claude Code | Codex | Gemini CLI | Copilot CLI | Qwen Code | OpenCode |
|------|------|------|------|------|------|------|
| **核心侧重** | 云端协作、记忆系统、Hooks 体系 | 沙箱安全、桌面端、多 agent 消息板 | Subagent/AST 感知、token 效率 | 企业/GitHub 生态集成 | 多端架构、Managed Agent | 开源/多模型聚合、Code Mode |
| **目标用户** | 深度长会话开发者、自动化用户 | ChatGPT 生态用户、桌面优先用户 | 性能与成本敏感的开发者 | GitHub 企业用户 | 自托管/成本敏感、企业 Java 集成 | 模型自由度诉求高的社区用户 |
| **技术路线** | TS、Cowork 云端会话、遥测透明化 | Rust 内核、严格沙箱、Responses API | 原生 bash 能力 + 零依赖沙箱探索 | Node/V8（内存瓶颈根源） | TS agent loop + Tauri 壳 + Java SDK | TS、PermissionV2、V2 迁移期 |
| **独特信号** | 遥测/状态可观测性战略 | GPT-5.4 移出默认目录 | AST-aware 工具（36.6k tokens/回合基线） | fail-closed 企业合规取向 | 小模型决策门 + 上下文优先提示词 | Zen 通道/封号治理争议 |

---

## 5. 社区热度与成熟度

- **Codex：热度最高、债务最重**。Issue 讨论量与 👍 数领先（#40968 53 评论），但 Windows 问题集群 + 版本回归频发（“降级即修复”成社区口头禅）反映 QA 流程承压。0.158.0 稳定版是近期关键观察点。
- **Claude Code：最成熟，进入打磨期**。Issue 数量稳定但多为长尾老问题（MCP 会话标识、auto-memory 可见性），PR 集中于体验微调；两个 data-loss 级 bug 是少数需要警惕的例外。
- **Gemini CLI：修复动能最强**。46 条 PR 中 P1 密集且直击挂起/死循环/泄漏/竞态，工程化治理节奏健康。
- **Qwen Code：转型期的进取者**。Tauri 迁移 + Java SDK 表明明确的桌面与企业双线布局，但维护者人力（`ready-for-human` 积压）是瓶颈。
- **OpenCode：信任危机待解**。封号无申诉（#49057）、V2 schema 漂移、计费投诉——开源聚合层的治理成熟度落后于功能迭代。
- **Copilot CLI：单向量发布模式**。Issue 区活跃但 PR 静默，社区无法参与修复过程，与开源同行形成透明度反差。
- **Kimi CLI**：样本不足，暂处观察期。

---

## 6. 值得关注的趋势信号

1. **可观测性成为下一竞争维度**：三个工具（Claude Code、Gemini、OpenCode）社区同时爆发“告诉我系统做了什么”的诉求——记忆加载状态、安全拦截原因、权限询问可见性、压缩触发时机。未来的差异化不在能力上限，而在**失败时的透明度**。

2. **小模型决策分流是架构级趋势**：Gemini 的 Decision Gate 与 Qwen 的 System One 提案思路几乎一致（毫秒级分类 → 短路径跳过大模型唤醒）。延迟与成本敏感场景下，该模式预计一年内成为标配。

3. **桌面端“换壳潮”**：Qwen 弃 Electron 转 Tauri，Codex 深陷 Electron 渲染层内存泄漏（4-7 GB），Claude Code 桌面端与 CLI 功能不一致。桌面壳的选择正直接影响稳定性口碑。

4. **Windows 是共同的第二战场**：Codex Top 10 中 7 条、Claude Code/Copilot 均有集中投诉。谁先系统性解决 Windows 沙箱/终端/企业策略兼容，谁就能收割这一平台迁移红利。

5. **对企业开发者的参考建议**：
   - **生产环境选型**：优先 Gemini CLI / Claude Code（稳定性与修复动能）；Codex 等 0.158.0 稳定版验证后再跟进 Windows 场景。
   - **规避风险**：多会话并行开发下警惕 worktree 回收类 data-loss（CC #77268）；长会话任务做好 OOM 与 compaction 失效的降级预案。
   - **模型策略**：Codex 移除 GPT-5.4 默认目录提示模型生命周期加速，架构上应保持模型可替换性（OpenCode 的多模型聚合思路价值上升）。
   - **贡献机会**：Codex/Gemini/Qwen 的 PR 吞吐窗口开放，是影响路线图的最佳切入点；Kimi CLI 与 Copilot CLI 社区参与通道相对有限。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-09-25 | 来源：anthropics/skills**

> ⚠️ 说明：本期 PR 数据中评论数均为空，排行依据为 PR 存续时长、更新活跃度与议题代表性；Issues 按评论数排序。

---

## 一、热门 Skills 排行（PR）

| # | Skill | 作者 | 状态 | 亮点 |
|---|-------|------|------|------|
| 1 | **skill-creator 触发评估修复**（#1298） | @MartinCajiao | OPEN | 存续 3 个月、持续更新至 9 月。修复触发评估误报、Windows `select()` 失败、运行时错误被误判为非触发等核心问题。与 Issue #556、#1769 共同指向 **skill-creator 评估体系可靠性** 这一社区最大痛点 |
| 2 | **trigger 检测 0% recall 修复**（#1769） | @ChiFungHillmanChan | OPEN | 修复 #1721：所有 skill 均报 `precision=100% recall=0%`，且优化循环基于假证据调参。skill-creator 质量链条的关键补丁 |
| 3 | **mcp-builder 兼容 mcp>=2**（#1742） | @Kuldeeep18 | OPEN | 修复 #1668：`streamablehttp_client` 更名及自定义 header 传递方式变更，9 月仍活跃更新 |
| 4 | **Pyxel 复古游戏开发**（#525） | @kitao | OPEN | 存续近 7 个月、9 月 22 日仍有更新，长尾生命力最强的功能型 PR；覆盖游戏创建、无头运行、帧检查 |
| 5 | **docx 系列修复**（#541 / #1792 / #1790） | @Lubrsy706 / @TINGyu123644 | OPEN | OOXML `w:id` 冲突导致文档损坏、LibreOffice 超时误报成功、`document.xml.rels` 缺失。docx 是被修得最多的官方 skill，反映文档处理是企业刚需 |
| 6 | **document-typography 排版质控**（#514） | @PGTBoos | OPEN | 解决 AI 生成文档的孤行、寡段、编号错位——“用户不会主动要，但每次都受影响”的典型隐性需求 |
| 7 | **AWT AI E2E 测试**（#822） | @ksgisang | OPEN | 视觉 + 浏览器控制的零代码 E2E 测试，3 月提交、9 月仍活跃 |
| 8 | **blast-radius 批量操作安全清单**（#1776） | @kishormol | OPEN | 覆盖“批量删除/发信/回收权限前的爆炸半径评估”，安全治理方向的代表性提交 |

---

## 二、社区需求趋势（Issues 提炼）

1. **信任与安全机制**（43 评论，热度第一）：#492 社区 skill 冒用 `anthropic/` 命名空间，构成信任边界滥用；#1175 关注 SKILL.md 内嵌权限逻辑的安全隐患 → **官方签名/命名空间治理**是最大诉求。
2. **skill-creator 评估链路可信**：#556（0% 触发率）、#202（skill-creator 违反自身最佳实践）→ 社区需要能真实度量 skill 触发质量的工具。
3. **组织级分发与共享**：#228（组织内共享库，16 评论）、#189（插件重复安装）、#62（skill 无故消失）→ 企业用户要的是**可管理的 skill 生命周期**。
4. **上下文经济性**：#1487 claude-api skill 一次注入 156k token 撑爆上下文；#1329 compact-memory 符号化压缩 agent 状态 → 渐进式加载成共识方向。
5. **质量门禁/推理验证类 skill**：#1385 三阶段推理质量管道、#412 agent-governance → “用 skill 约束 agent 自身行为”的元技能兴起。
6. **新场景功能需求**：#16 Skills 暴露为 MCP、#29 Bedrock 支持、#1390 mcp-builder 评估修复。

---

## 三、高潜力待合并 Skills

- **#1742 mcp-builder mcp>=2 兼容修复** — 修复高优先级 Issue #1668，更新至 9/19，合并概率最高
- **#1792 / #1790 docx 修复对** — 9 月新提、问题定位精准（超时误报 / rels 缺失），典型易合并 bugfix
- **#1769 trigger 0% recall 修复** — 直接解决开放 Issue #1721，动机明确
- **#1298 skill-creator 评估隔离** — 存续最久、迭代最勤，若与 #1769 收敛将一并落地
- **#1776 blast-radius** — 议题独特（批量操作安全检查）、与社区安全关切高度契合

---

## 四、生态洞察（一句话）

> **社区最集中的诉求不是“更多 skill”，而是“可信的 skill 生态”**——即 skill-creator 能给出真实的触发评估、社区与官方 skill 有清晰的信任边界、以及 skill 加载不再吞噬上下文窗口。

---

# Claude Code 社区动态日报 — 2026-09-25

## 📌 今日速览

Claude Code 发布 v2.1.282，新增 `maxProbeWidth` 等显示设置并加强遥测变量透明度。社区讨论焦点集中在 Cowork 的数据一致性/静默失败问题（Windows 平台尤其突出）、auto-memory 加载状态不可见，以及 MCP 会话标识缺失等长期悬而未决的高票 Issue。diff 模块修复系列 PR 密集合入，显示官方正集中打磨细节体验。

---

## 🚀 版本发布

### v2.1.282
- 新增 `maxProseWidth` 设置：在宽终端中限制 Claude 正文的显示宽度，但表格和代码块保持全宽显示，改善宽屏阅读体验
- 新增启动提示，并在 `/status` 和 `claude doctor` 中列出项目设置文件中被忽略的遥测变量，提升配置透明度

---

## 🔥 社区热点 Issues（Top 10）

1. **[#82056](https://github.com/anthropics/claude-code/issues/82056)** — auto-memory 索引加载状态不可见（55 评论）
   会话内无法得知 auto-memory 是完整加载、被截断还是完全未加载。作为影响所有长会话记忆可靠性的核心问题，讨论量长期居首。

2. **[#41836](https://github.com/anthropics/claude-code/issues/41836)** — MCP 服务器无法区分并发会话（👍 37）
   请求中缺少会话/对话标识，服务端无法维护每会话状态。高赞老问题，对 MCP 生态开发者影响重大。

3. **[#93482](https://github.com/anthropics/claude-code/issues/93482)** — Cowork 静默写入滞后一个 commit（data-loss）
   `device_commit_files` 报告成功但磁盘内容落后一次提交，属静默数据丢失级 bug，Windows Cowork 用户需警惕。

4. **[#77268](https://github.com/anthropics/claude-code/issues/77268)** — Worktree 回收摧毁兄弟会话的活跃工作区（data-loss）
   包括已锁定和未提交的工作也会被破坏，多会话并行开发者的高风险问题。

5. **[#96118](https://github.com/anthropics/claude-code/issues/96118)** — Opus 5.5 安全护栏误报 `reasoning_extraction`
   安全机制拦截消息且 UI 只显示模糊提示，用户要求展示具体触发原因，涉及安全透明度与可解释性。

6. **[#93015](https://github.com/anthropics/claude-code/issues/93015)** — 定时任务标记 lastRunAt 但从不启动会话
   所有计划任务静默停止且无任何错误提示，对依赖自动化 routines 的用户是可用性灾难。

7. **[#94571](https://github.com/anthropics/claude-code/issues/94571) / [#95930](https://github.com/anthropics/claude-code/issues/95930)** — 并发会话文件变更归因错乱
   只读会话显示他人的编辑 diff，切换分支/rebase 的外部变更被渲染为“新编辑”，误导开发者判断变更来源。

8. **[#95833](https://github.com/anthropics/claude-code/issues/95833)** — Desktop "Code" 标签页 PreToolUse hooks 完全不触发
   Bash/PowerShell matcher 均失效，hooks 作为关键安全/流程控制在桌面端形同虚设。

9. **[#92195](https://github.com/anthropics/claude-code/issues/92195)** — 浏览器面板权限提示对非 localhost 源不持久化
   每次操作都重复弹窗，破坏浏览器自动化工作流体验。

10. **[#71254](https://github.com/anthropics/claude-code/issues/71254)** — Auto-Compact 在闲置恢复时过早触发
    压缩恰好在用户重新开始工作时打断，时机感知不佳，社区建议改为真正空闲时压缩。

> 📋 另注：多个 8 月中旬的老 bug 今日批量被标记 stale 关闭（如 #88056 安全分类器误拦、#87274 /schedule 连接失败等），关注者可留意是否已实际修复。

---

## 🔧 重要 PR 进展（共 5 条，均来自 @poteat，已关闭/合入）

1. **[#96364](https://github.com/anthropics/claude-code/pull/96364)** — agents-md：修复嵌套 `AGENTS.md` 自动分页 Read 不再计入“已投递”，导致后续 Read 重复附加的问题。
2. **[#96363](https://github.com/anthropics/claude-code/pull/96363)** — diff：传入 `--no-color`，修复 git 配置 `color.ui=always` 时 ANSI 转义导致 diff 正文为空。
3. **[#96487](https://github.com/anthropics/claude-code/pull/96487)** — telemetry：遥测行携带引擎版本/构建时间（依赖 2.1.281+ 的 `$.session.version()`），外部构建不再缺失版本字段。
4. **[#95423](https://github.com/anthropics/claude-code/pull/95423)** — diff：只读 shell 命令（`ls`、`git status` 等）不再触发 diff 重复拉取，对齐内置面板行为，降低开销。
5. **[#96570](https://github.com/anthropics/claude-code/pull/96570)** — diff：`command.run` hook 以字面量命名命令，修复启动时斜杠命令需等待模块加载的匹配问题。

**观察**：今日 PR 全部围绕 diff 模块和遥测细节打磨，与 v2.1.282 的遥测透明化方向一致，属“体验微调周”。

---

## 📈 功能需求趋势

- **可观测性与透明度**：auto-memory 加载状态（#82056）、安全护栏触发原因（#96118）、遥测变量提示——用户强烈要求知道“系统到底做了什么”
- **Cowork / 云端会话成熟度**：静默写入滞后（#93482）、VM 服务启动失败（#64592）、插件缓存无法强刷（#36700）、授权仓库集限制（#96075），Windows 用户痛点集中
- **并发/多会话一致性**：worktree 回收误删（#77268）、跨会话文件归因错乱（#94571）、MCP 会话标识（#41836）
- **自动化可靠性**：定时任务静默失败（#93015）、/schedule 连接问题
- **终端渲染增强**：保留 ANSI 颜色以支持终端内文本绘图（#92993）

---

## ⚠️ 开发者关注点

1. **静默失败是最大信任杀手**：定时任务不启动、Cowork 写入滞后均无错误提示，社区呼吁“宁可报错，不要假装成功”
2. **数据丢失风险需优先修复**：worktree 误删（#77268）和 Cowork 滞后写入（#93482）都标记了 data-loss
3. **Windows 平台问题密度偏高**：今日热点中 Cowork/hooks/桌面端问题多数来自 Windows
4. **变更归因混乱影响代码审查信任**：外部文件变更被渲染为 Claude 的编辑，可能误导决策
5. **Desktop 与 CLI 功能不一致**：hooks 在桌面 Code 标签页失效，双端行为对齐是高频诉求

---
*数据截至 2026-09-25，来源：github.com/anthropics/claude-code*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报

**日期：2026-09-25** | 数据来源：github.com/openai/codex

---

## 📌 今日速览

Codex 团队今日发布节奏密集，0.158.0 系列连续推出 5 个 alpha 版本（alpha.6 至 alpha.10），显示即将迎来一次较大版本迭代。社区层面，**Windows 桌面端问题持续发酵**——发送按钮失效、沙箱初始化失败、内存泄漏等高热度 Issue 集中在 Windows 平台。开发侧共有 50+ PR 活跃更新，涵盖 MCP 优化、沙箱修复、性能改进等多个方向。

---

## 🚀 版本发布

过去 24 小时内密集发布 **6 个 Rust 版本**：

| 版本 | 说明 |
|------|------|
| `rust-v0.158.0-alpha.10` | 最新预发布版 |
| `rust-v0.158.0-alpha.9/8/7/6` | 同一迭代周期内快速迭代 |
| `rust-v0.157.0-alpha.11.1` | 0.157 分支补丁版 |

📌 0.158.0 单日内连发 5 个 alpha，迭代速度极快，预计近期进入稳定版发布窗口。

---

## 🔥 社区热点 Issues（Top 10）

### 1. Windows 桌面端发送按钮永久转圈，提示无法提交 [#40968](https://github.com/openai/codex/issues/40968)
**评论 53 | 👍 27** — 本日热度第一。Windows 11 上 Codex 桌面版发送按钮无限转圈，用户完全无法交互，且问题持续近一个月未修复，是社区最不满的痛点。

### 2. VS Code 插件无法通过 `New Codex Agent` 打开多窗口 [#15807](https://github.com/openai/codex/issues/15807)
**评论 11 | 👍 15** — 长期存在的 IDE 集成问题（自 3 月报告），多窗口工作流受阻，影响并行开发场景。

### 3. 桌面版 Git Commit/Push 按钮消失（回归） [#47511](https://github.com/openai/codex/issues/47511)
**评论 9 | 👍 26** — 26.917.51856 版本将常用按钮移入省略号菜单，引发大量用户不满，属于 UI 回归，仅一天即获得 26 个 👍。

### 4. Windows ChatGPT 项目预热锁定本地镜像 [#44736](https://github.com/openai/codex/issues/44736)
**评论 18** — 关联 #42215、#34499 的系列问题，桌面启动时覆盖用户 workaround，产品底层问题未解。

### 5. Windows Chrome 集成配置文件未生成 [#42520](https://github.com/openai/codex/issues/42520)
**评论 15** — `chrome-native-hosts-v2.json` 从未创建且更新后残留过期 junction，浏览器集成形同虚设。

### 6. Windows 沙箱初始化失败："requires effective :root read access" [#46114](https://github.com/openai/codex/issues/46114)
**评论 13 | 👍 4** — 最新桌面更新后所有会话（新建/恢复）均立即失败，重装、重置均无效，阻断性严重。

### 7. CLI 0.155.0 Windows 沙箱回归 [#46388](https://github.com/openai/codex/issues/46388)
**评论 13 | 👍 3** — 明确的版本回归：0.154.0 正常，0.155.0 提权沙箱在路径验证时失败，社区已确认临时方案为降级。

### 8. 26.915 版本发送按钮禁用（新会话可用，旧会话失效） [#46986](https://github.com/openai/codex/issues/46986)
**评论 12** — 与 #40968 同族的 composer 状态 bug，跨 Windows/macOS 平台（#46440），workaround：切换到 Settings 页再返回。

### 9. Windows 渲染进程内存泄漏至 4–7 GB 后崩溃 [#46690](https://github.com/openai/codex/issues/46690)
**评论 2** — 26.915.4065.0 轻量任务下即快速内存增长，回滚至 26.903.9818.0 稳定，指向 26.915 版本引入的渲染层缺陷。

### 10. 代理沙箱在命令执行前失败："mountinfo path is not absolute" [#47559](https://github.com/openai/codex/issues/47559)
**评论 3** — Linux (Ubuntu 24.04) VS Code 扩展的沙箱问题，说明沙箱问题并非 Windows 独有。

---

## 🔧 重要 PR 进展（Top 10）

### 1. 工具调用结果纳入 15 MiB 消息预算控制 [#47957](https://github.com/openai/codex/pull/47957)
修剪工具调用记录以避免超出 Responses API 消息预算，防止 Code Mode 单元格数据丢失。

### 2. 图片编辑请求支持文件引用 [#47956](https://github.com/openai/codex/pull/47956)
`ImageEditRequest` 同时接受 `image_url` 和 `file_id`，修复编辑会话内图片失败的缺陷。

### 3. Windows 完全访问模式可通过注册 Core 完成配置 [#47922](https://github.com/openai/codex/pull/47922)
允许 `danger-full-access` 权限配置到达配置服务——直接回应 Windows 沙箱设置失败系列问题。

### 4. MCP 输入 schema 预算可配置化 [#47936](https://github.com/openai/codex/pull/47936)
新增 `tool_input_schema_budget` 配置，解决大型 MCP 工具参数描述被剥离的问题。

### 5. 缓存目录可满足 MCP 启动就绪 [#47935](https://github.com/openai/codex/pull/47935)
`startup_readiness = "catalog"` 允许缓存工具目录先行可用，避免必需 MCP 服务器阻塞启动——性能优化。

### 6. OAuth 回调改用 `127.0.0.1` [#47927](https://github.com/openai/codex/pull/47927)
本地登录回调地址由 `localhost` 改为 `127.0.0.1`，规避 IPv6 解析等环境相关问题。

### 7. 文件 blob 上传对 502/504 重试 [#47926](https://github.com/openai/codex/pull/47926)
将瞬时网关错误纳入重试机制，提升大文件上传可靠性。

### 8. 从捆绑目录移除 GPT-5.4 并保留迁移提示 [#47932](https://github.com/openai/codex/pull/47932)
⚠️ 值得关注：GPT-5.4 被移除出默认目录，暗示模型生命周期管理策略变化。

### 9. 临时会话内存级 agent 消息板 [#47946](https://github.com/openai/codex/pull/47946)
新增 `message_board_in_memory` 设置，让 ephemeral 会话中的 agent 共享讨论而不产生持久化存储。

### 10. 删除未使用的 Windows world-writable 审计代码 [#47943](https://github.com/openai/codex/pull/47943)
Windows 沙箱代码清理，配合 #47922 表明团队正在重构 Windows 沙箱链路。

**其他值得注意**：TUI 成功回合后生成提示建议（[#47929](https://github.com/openai/codex/pull/47929)）、未变模型压缩短路扩展至全部会话源（[#47934](https://github.com/openai/codex/pull/47934)，性能优化）。

---

## 📈 功能需求趋势

1. **Windows 平台稳定性**（最强烈）：今日 Top 10 Issue 中 7 个与 Windows 相关，集中在桌面 UI 状态、沙箱、内存管理。
2. **Git 工作流集成**：Commit/Push 按钮回归（#47511、#47897）反映用户依赖内置 Git 操作。
3. **会话管理增强**：worktree 过滤的 resume 选择器（#47485）、侧边栏会话恢复（#44807）、按回合导出执行轨迹（#41574）。
4. **用量与速率限制透明度**：GitHub code review 误报配额耗尽（#31001）、代理过度工具调用烧配额（#46707）、5 小时限制抱怨（#47928）。
5. **MCP/插件生态**：PR 侧 MCP 相关改动密集（schema 预算、启动就绪、插件身份分离）。

---

## ⚠️ 开发者关注点

- **Windows 是当前最大债务区**：沙箱初始化（#46114、#46388）、发送按钮（#40968、#46986）、内存泄漏（#46690）形成问题集群；好在 PR 侧已有针对性修复（#47922、#47943）落地，建议关注 0.158.0 正式版。
- **版本回归频发**：26.915 桌面版和 CLI 0.155.0 均引入回归，“降级即修复”成为社区常见答案，质量保障流程受质疑。
- **本地开发场景受阻**：localhost 被企业策略拦截（#33580）、Node.js spawn EPERM（#47868）、浏览器缓存策略冲突（#43523）——本地 E2E 测试和前端开发工作流受影响明显。
- **用量经济性**：多份报告指出简单任务消耗大量配额（#46707），代理行为效率与成本控制是 Pro 用户的持续关切。

---
*本报告基于 GitHub 公开数据自动整理，评论数与点赞数统计截至 2026-09-25。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-09-25

> 数据来源：github.com/google-gemini/gemini-cli

---

## 1. 今日速览

Gemini CLI 今日发布 v0.62.0 nightly 与 preview 双通道构建，稳定性修复持续推进。PR 活动异常活跃（46 条更新），集中在**并发安全、认证死循环、内存泄漏**三大核心稳定性问题。Issue 侧 Subagent 可靠性与 Auto Memory 安全性仍是社区讨论焦点。

---

## 2. 版本发布

### v0.62.0-nightly.20260924
- 修复连接恢复期间显示重试进度指示器（#28340）
- VSC 集成测试存在性检查（[PR #29462](https://github.com/google-gemini/gemini-cli/pull/29462)）

### v0.62.0-preview.0
- 修复 a2a-server 任务元数据端点对不支持 store 的早期返回（[PR #29334](https://github.com/google-gemini/gemini-cli/pull/29334)）

### v0.61.0（稳定版）
- 常规版本迭代，含 v0.60/v0.59 changelog 汇总

---

## 3. 社区热点 Issues

| # | Issue | 亮点 |
|---|-------|------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 后仍上报 success | P1，13 条评论。状态上报失真会掩盖真实中断，直接影响可观测性与调试信任 |
| 2 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由 | 9 条评论。发挥 Gemini 3 原生 bash 能力的架构级提案，large effort |
| 3 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist agent 挂起 | P1，8 👍。简单操作（如建目录）也会挂起超 1 小时，用户体验影响大 |
| 4 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知的文件读取/搜索/映射 EPIC | 7 条评论。降低 token 噪音、精确定位方法边界，是 agent 效率的关键方向 |
| 5 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) 模型不主动使用 skills 与 subagents | 用户需显式指令才能触发，暴露了工具调度策略的短板 |
| 6 | [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) Auto Memory 确定性脱敏 | 安全类 P2。当前脱敏发生在内容已进入模型上下文之后，存在密钥泄漏风险 |
| 7 | [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 配置 | 配置合并逻辑存在但未生效（如 maxTurns），配置可信度问题 |
| 8 | [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) Auto Memory 对低信号会话无限重试 | 后台提取循环的资源浪费问题 |
| 9 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 超过 128 个工具触发 400 错误 | 工具数量上限约束，重度 MCP/扩展用户必踩 |
| 10 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) Browser subagent 在 Wayland 下失败 | Linux 桌面用户的核心痛点，P1 |

---

## 4. 重要 PR 进展

| PR | 内容 |
|----|------|
| [#29494](https://github.com/google-gemini/gemini-cli/pull/29494) | **文件工具操作串行化**，防止并发 edit 导致的 lost-update 竞态（subagent/批量调度场景） |
| [#29448](https://github.com/google-gemini/gemini-cli/pull/29448) | **修复无限认证死循环**（#28341），解决 Windows/WSL/headless 环境下的文件争用与 keyring 回退问题，P1 |
| [#29451](https://github.com/google-gemini/gemini-cli/pull/29451) | **限制工具输出体积并优化内存生命周期**，修复长时间 agent 循环的内存无限增长 |
| [#29482](https://github.com/google-gemini/gemini-cli/pull/29482) | 新增可选的**快速 Decision Gate**，毫秒级分类简单消息以走短路径，降低延迟与成本 |
| [#29492](https://github.com/google-gemini/gemini-cli/pull/29492) | **安全修复**：消除沙箱构建和网络设置中的 shell 插值（路径含元字符可致任意命令执行） |
| [#29476](https://github.com/google-gemini/gemini-cli/pull/29476) | 修复 IDE 集成终端中 **Enter 确认无响应挂起**（#23297），P1 |
| [#29446](https://github.com/google-gemini/gemini-cli/pull/29446) | 区分 MCP 配置缺失 vs JSON 格式错误，防止被禁用的 MCP server 被误启用 |
| [#29490](https://github.com/google-gemini/gemini-cli/pull/29490) | 修复会话恢复（`-r`）时工具响应被重复回放的问题 |
| [#29489](https://github.com/google-gemini/gemini-cli/pull/29489) | 防止 Flash-Lite 模型继承 ThinkingLevel.HIGH，避免快模型被高思考预算拖慢 |
| [#29488](https://github.com/google-gemini/gemini-cli/pull/29488) | MCP OAuth 流程按 RFC 9207 处理 `iss` 参数缺失，修复 v0.61.0 引入的 auth 回归 |

其他值得留意：[#29463](https://github.com/google-gemini/gemini-cli/pull/29463)（ACP 会话同分钟文件名冲突）、[#29437](https://github.com/google-gemini/gemini-cli/pull/29437)（后台 shell 临时目录清理）、[#29450](https://github.com/google-gemini/gemini-cli/pull/29450)（a2a-server V1→V2 配置迁移）。

---

## 5. 功能需求趋势

1. **Subagent 体系成熟化**：本地子代理 Sprint（#20195）、轨迹可视化分享（#22598）、bug 报告含子代理上下文（#21763）——社区希望子代理可观测、可控、可复现。
2. **代码理解智能化（AST-aware）**：#22745/#22746 探索 AST 工具做精准读取与代码库映射，配合 #19561 的"Tactful Extraction"（当前每回合基线约 36.6k tokens），反映对 **token 效率**的强烈诉求。
3. **原生 bash 能力 + 沙箱安全**：#19873 与 #22672 共同指向“释放模型 shell 能力的同时保证安全”的平衡点。
4. **Auto Memory 安全与健壮性**：#26525/#26522/#26523 形成一组系统性的内存子系统质量加固。
5. **浏览器自动化**：Wayland 支持、配置覆盖生效、会话锁恢复（#22232）持续迭代。

---

## 6. 开发者关注点

- **稳定性是当前主旋律**：今日 P1 PR 密集修复挂起、死循环、内存泄漏、竞态，长会话/后台任务场景可靠性是首要痛点。
- **挂起与状态失真**：agent 挂起（#21409）叠加“失败上报为成功”（#22323），用户难以信任执行结果。
- **IDE/集成终端体验**：Enter 无响应（#29476）、认证与 VS Code 扩展争用（#29448）表明多工具共存场景摩擦明显。
- **配置一致性**：settings.json 被忽略、MCP 配置解析歧义等削弱配置驱动的信任。
- **安全边界**：沙箱 shell 注入、Auto Memory 密钥脱敏、破坏性命令防护是社区持续关注的风险面。

---
*本报告基于过去 24 小时 GitHub 数据自动汇总，链接均指向原始 issue/PR。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-09-25** | 数据来源：github.com/github/copilot-cli

---

## 一、今日速览

过去 24 小时内 copilot-cli 连发两个补丁版本（v1.0.89-2 / v1.0.89-3），重点修复 MCP OAuth scope 配置、表单自定义答案隔离，并在 Windows 沙箱命令上有所改进。Issue 区热度集中在**长会话稳定性**（OOM、compaction 失败、会话卡死）与**桌面端 Local 会话并发限制**两大方向。PR 活动较少，仅一条 CI 依赖更新。

---

## 二、版本发布

**v1.0.89-3**（修复版）
- 修复 ask-user 表单中自定义 "Other" 答案在不同问题间串用的问题。

**v1.0.89-2**（功能/改进版）
- **Added**：MCP 预注册 OAuth 客户端现遵循配置的 `oauthScopes`；本地会话中，空输入状态下连按两次 Esc 可撤回模型尚未开始响应的 prompt 并将其从对话中移除。
- **Improved**：受支持的 Windows 版本上沙箱命令能力增强（发布说明截断，建议查看完整 changelog）。

---

## 三、社区热点 Issues（Top 10）

1. **[#4742](https://github.com/github/copilot-cli/issues/4742)**（OPEN，11 评论 / 👍5）— Desktop 1.1.15 无法在同一项目已有活跃 Local 会话时创建第二个 branch 会话，报 "This project already has an active Local workspace"。影响多分支并行工作流，社区讨论热烈，是当前最热 issue。

2. **[#4699](https://github.com/github/copilot-cli/issues/4699)**（OPEN，6 评论 / 👍7）— 长时间 `--resume` 会话反复触发 V8 4 GiB 堆 OOM（14 小时内崩溃 3 次），且崩溃 dump 直接写入用户 cwd。高赞说明影响面广。

3. **[#2058](https://github.com/github/copilot-cli/issues/2058)**（CLOSED，10 评论 / 👍10）— 请求 `/fork` 命令在不偏离主任务的情况下处理侧线问题。已关闭，可能已实现或纳入规划，值得关注后续版本。

4. **[#4929](https://github.com/github/copilot-cli/issues/4929)**（OPEN，5 评论）— 长驻进程认证令牌停止刷新，所有 prompt 失败且 `/login` 无法恢复，只能重启。对长会话用户是硬伤。

5. **[#4851](https://github.com/github/copilot-cli/issues/4851)**（OPEN，2 评论 / 👍6）— Azure MCP registry 校验 BrokenPipe，1.0.83 下 Azure API Center MCP 全线不可用，属“隔夜翻车”型回归，企业用户高赞关注。

6. **[#4780](https://github.com/github/copilot-cli/issues/4780)**（OPEN，2 评论 / 👍3）— 上下文压缩触发 OOM 后会话进入不可恢复的 crash loop，`--resume` 无限循环。与 #4663 同属 compaction 可靠性问题。

7. **[#4755](https://github.com/github/copilot-cli/issues/4755)**（OPEN）— 会话在 queued-lane 消息落点不佳时永久 wedge（既非 idle 也非 running），只能杀进程。不崩溃的“静默死”最难排查。

8. **[#4683](https://github.com/github/copilot-cli/issues/4683)**（OPEN）— Windows 企业环境（AppLocker/WDAC ConstrainedLanguage 模式）下每条 shell 命令都报 `$host.SetShouldExit()` 伪错误。企业合规环境兼容性痛点。

9. **[#4522](https://github.com/github/copilot-cli/issues/4522)**（CLOSED，👍7）— 1.0.81 在托管策略未确定时强制启用沙箱，覆盖用户显式的 `sandbox.enabled=false`。已关闭，企业用户可验证新版行为。

10. **[#4905](https://github.com/github/copilot-cli/issues/4905)**（OPEN，4 评论 / 👍4）— 桌面端会话数分钟后死亡："GitHub credential registration is no longer available"，导致 github-mcp-server catalog 失效。桌面端稳定性又一案例。

---

## 四、重要 PR 进展

过去 24 小时内仅 1 条 PR 更新，无功能性 PR：

- **[#4948](https://github.com/github/copilot-cli/pull/4948)**（OPEN）— 将 `actions/github-script` pin 刷新至 v9.0.0，纯 CI 维护性更新，无运行时影响。

> ⚠️ 本期 PR 数据较少，值得关注的修复动向需从 release 节奏（24 小时内连发两版）侧面观察，核心修复仍在快速迭代中。

---

## 五、功能需求趋势

1. **会话分叉与多任务**：`/fork`、branch 会话并发（#2058、#4742），用户希望侧线探索不破坏主线上下文。
2. **长会话可靠性**：compaction 优化、内存管理、崩溃恢复是当前最高频诉求（#4699、#4780、#4663、#4639）。
3. **凭据热刷新**：BYOK 短时 token 免重启刷新（#3682，已关闭）与进程内 auth token 自动续期（#4929）。
4. **企业/合规环境兼容**：AppLocker/WDAC、MDM、托管策略下的沙箱与权限行为（#4522、#4683、#3934）。
5. **插件生态与 MCP**：marketplace 注册失败静默 bail（#4556）、插件 skill 注入缺失（#2753）、sparse checkout 优化安装（#2399）。

---

## 六、开发者关注点（痛点总结）

- **内存与稳定性是头号敌人**：多条高赞 issue 指向 Node/V8 堆 OOM，4 GiB 上限对长会话明显不足，且 compaction 失败重试无 backoff、无计费保护（#4663）。
- **静默失败缺乏可观测性**：插件 marketplace 静默 bail、compaction 重试无用户可见错误，开发者呼吁更透明的错误暴露。
- **副产物污染工作目录**：崩溃 dump 写入 cwd（#4699）、复制文本混入边框字符（#4116）等细节体验问题。
- **企业环境支持不足**：Linux 老版本 glibc 兼容（#3276）、Windows ConstrainedLanguage、托管策略 fail-closed 行为均被反复提及，是企业推广的主要摩擦点。
- **升级与自动更新**：自动更新滞后（#2408）及回归类问题（#4851 "overnight broke"）提示团队需加强发布前回归测试覆盖。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期：2026-09-25 | 数据来源：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)**

---

## 1. 今日速览

今日仓库动态较为平静：无新版本发布，无活跃 Issue 更新。唯一的动态是一条安全相关的依赖升级 PR（#2622）于昨日被关闭，涉及 `asyncssh` 的两个已知安全漏洞修复，值得依赖 pykaos 包的开发者关注。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues

过去 24 小时内无 Issue 更新，今日暂无可报告的社区讨论。

---

## 4. 重要 PR 进展

### PR #2622 [CLOSED] deps: bump asyncssh to 2.23.1 in pykaos（安全修复）
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/2622
- **作者**：@katsugtgz | 创建于 2026-08-28，更新于 2026-09-24
- **内容**：将 `pykaos` workspace 包中的 `asyncssh` 从 2.21.1 升级至 2.23.1，用于修复两个已知安全漏洞：
  - **GHSA-2wxc-x7rj-hg8f**
  - **GHSA-qr67-gv47-xwwh**
- **证据链**：
  - `packages/kaos/pyproject.toml` 此前锁定 `asyncssh==2.21.1`
  - `uv.lock` 中解析版本为 2.21.1
  - OSV 扫描报告确认上述两个 GHSA 漏洞影响该版本
- **状态**：已关闭（CLOSED）。该 PR 于昨日最终更新，推测已合入或以其他方式处理，建议关注后续 Release 是否包含此依赖变更。
- **影响**：使用 pykaos 包且涉及 SSH 连接场景的用户，建议在版本更新后尽快升级以消除潜在安全风险。

> 注：过去 24 小时内仅此 1 条 PR 活动，其余 PR 均无更新。

---

## 5. 功能需求趋势

由于过去 24 小时无 Issue 活动，暂无法提炼新的功能需求趋势。从本周期唯一动态看，**依赖安全治理（自动化漏洞扫描与升级，如 OSV/GHSA 驱动的 dependabot 类流程）** 仍是维护者持续投入的方向。

---

## 6. 开发者关注点

- **依赖安全**：`asyncssh` 作为 SSH 相关的核心依赖，其漏洞修复进程值得使用 pykaos 的开发者跟踪。若你的项目直接或间接依赖 `asyncssh < 2.23.1`，建议自查是否受 GHSA-2wxc-x7rj-hg8f / GHSA-qr67-gv47-xwwh 影响。
- **版本锁定策略**：仓库采用 `pyproject.toml` 精确锁定 + `uv.lock` 解析的依赖管理方式，升级依赖需同步更新两处，社区贡献者提交依赖 PR 时需注意完整性。

---

*本日报基于过去 24 小时的 GitHub 数据自动汇总，今日数据量较少属正常波动。如需追踪 Issue 趋势，建议关注后续数日的数据积累。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-09-25

## 📌 今日速览

今日无新版本发布，社区重心集中在 2.0.16 的稳定性反馈上：Code Mode 权限请求不可见导致执行挂起、TUI 多处崩溃/键盘陷阱成为高频痛点。PR 方面，压缩时机重构（85% 阈值）与自定义 Agent 权限收紧两个核心修复正在推进中。

---

## 🔥 社区热点 Issues

**1. Muse Spark 1.3 Free 被 Zen 通道封锁且无申诉路径**（15 评论）
[#49057](https://github.com/anomalyco/opencode/issues/49057) — 所有会话返回 `[user_blocked]` 上游错误，用户无任何申诉渠道，是本期评论最多的 issue，涉及服务信任问题，需官方正面回应。

**2. [2.0] 官方 config schema 与文档不一致**（6 评论 / 👍9）
[#43748](https://github.com/anomalyco/opencode/issues/43748) — `opencode.ai/config.json` 拒绝 `skills`、`mcp.*`、`permissions` 等 V2 文档字段，导致编辑器校验误报合法配置为非法。高 👍 数反映影响面广，V2 迁移期的文档/schema 同步问题亟需修复。

**3. 官方 MCP 预热/预启动机制缺失**（5 评论）
[#48743](https://github.com/anomalyco/opencode/issues/48743) — 配置 14+ 个本地 stdio MCP 时，会话启动即全部标记 failed，需手动逐个重启。多 MCP 用户的硬性可用性障碍。

**4. 免费额度重置异常，等待时间被拉长**（3 评论 / 👍4）
[#50091](https://github.com/anomalyco/opencode/issues/50091) — 提示"~20h 后重试"，实际未按时重置。叠加 #51219（升级 Go 后额度耗尽无法回退免费版），计费/额度系统近期投诉集中。

**5. Code Mode 内 MCP 权限请求不显示，execute 无限挂起**
[#51223](https://github.com/anomalyco/opencode/issues/51223) — 隐形权限询问阻塞执行直到用户中断，属于静默失败类严重缺陷；配套的 [#51224](https://github.com/anomalyco/opencode/issues/51224)（并行调用同工具时第二个请求被孤儿化）表明 Code Mode 权限管线问题系统性存在。

**6. TUI 渲染列表时无限递归崩溃**
[#51228](https://github.com/anomalyco/opencode/issues/51228) — `applyListRenderable ↔ applyListItemChildren` 无界递归导致 `Maximum call stack size exceeded`，与 #47624（切换 tab 后键盘被锁死）共同指向 TUI 成熟度短板。

**7. 非 English locale 下 TodoWrite 崩溃会话时间线**
[#51087](https://github.com/anomalyco/opencode/issues/51087) — 泰语环境确认，国际化路径存在渲染 TypeError，桌面端 i18n 覆盖不足。

**8. deny shell `*` 策略误伤免费层**
[#50627](https://github.com/anomalyco/opencode/issues/50627) — 自定义 agent 配置 deny 规则后，所有免费模型请求均报"can only be used from within OpenCode"。与 PR #50429（deny 语义修复）直接相关。

**9. V1→V2 迁移后非 git 目录会话“消失"**
[#50551](https://github.com/anomalyco/opencode/issues/50551) — 导入器将非 git 目录的 `project_id` 统一写为 `global`，导致目录级会话选择器为空。V2 迁移完整性的典型缺口。

**10. GPT-6 Luna 压缩报错**
[#51202](https://github.com/anomalyco/opencode/issues/51202) — 未达上下文上限也触发 compaction 失败，与 PR #51235（压缩阈值重构）可能同源。

---

## 🔧 重要 PR 进展

**1. fix(core): 压缩阈值改为输入窗口的 85%** — [#51235](https://github.com/anomalyco/opencode/pull/51235)
修复小上下文模型每步都触发压缩的问题，直接关联 #51202 类压缩错误。

**2. fix(agent): 自定义 agent 权限默认收紧（deny 兜底）** — [#50429](https://github.com/anomalyco/opencode/pull/50429)
未声明的权限现在隐式拒绝，修复 #47819，或可缓解 #50627。

**3. feat(codemode): 解释器支持程序定义的 valueOf/toString** — [#50837](https://github.com/anomalyco/opencode/pull/50837)
覆盖运算符、类型转换、模板字面量等完整链路，提升 Code Mode 沙箱解释器的语义兼容性。

**4. feat(core): Copilot 会话命名改用免费 utility 模型** — [#51237](https://github.com/anomalyco/opencode/pull/51237)
按 GitHub UBB 规范将标题生成从付费小模型迁移到免费 utility 模型，降低隐性计费。

**5. fix(core): GPT verbosity 默认值在请求时应用** — [#51166](https://github.com/anomalyco/opencode/pull/51166)（已关闭）
统一 OpenAI/Azure/Bedrock/网关等多通道的 GPT verbosity 处理。

**6. feat(tui): Subagents 标签页显示子会话模型** — [#51232](https://github.com/anomalyco/opencode/pull/51232)
提升子 agent 运行时的可观测性。

**7. fix(stats): 雷达图修复推送生产** — [#51231](https://github.com/anomalyco/opencode/pull/51231)（已关闭）
修复 Muse Spark Contributor 对比雷达图全零的问题。

**8. fix(ui): diff 词级高亮降噪** — [#51236](https://github.com/anomalyco/opencode/pull/51236)
review diff 更接近 GitHub Desktop 的可读性。

**9. feat(core): v2 恢复 OPENCODE_DISABLE_CLAUDE_CODE** — [#44725](https://github.com/anomalyco/opencode/pull/44725)（已关闭）
v2 分支恢复避免读取 `~/.claude` 的环境开关，隐私相关。

**10. fix(sdk): 宿主启动时门控恢复逻辑** — [#44764](https://github.com/anomalyco/opencode/pull/44764)（已关闭）
确保 Promise 插件先于挂起会话恢复注册，SDK 嵌入场景的稳定性修复。

> 注：今日出现一批 `automated-pr-cleanup` 关闭的陈年 PR（#447xx 系列），为机器人清理行为，非合并。

---

## 📈 功能需求趋势

- **权限与安全管控**：Pre-Execution Tool Hooks / Guardrails 中间件 + 原生 OTel（#51230）、PermissionV2 作用域关闭测试（#51220）——企业级可控性需求上升。
- **TUI 可读性与交互**：可折叠推理气泡/工具输出（#51229）、工具调用耗时显示（#50891）、原生 DBus 通知（#51221）。
- **插件 API 完善**：自定义 provider 图标（#51233）、TUI 事件发布 API（v1 `client.tui.publish` 的 v2 缺口，#50984）、slash 命令 frontmatter 模型变体（#51234）。
- **桌面端体验细节**：系统托盘 + 干净关闭后台 CLI（#50633）、记住缩放级别（#50168）、One Dark Pro 对比度（#50986）。
- **MCP 可靠性**：预热/重连机制（#48743）持续获关注。

---

## ⚠️ 开发者关注点

1. **Code Mode 权限管线是当前最大风险区**：权限询问不渲染、并行请求孤儿化（#51223/#51224），属静默挂起类问题，排查成本高。
2. **额度与计费透明度**：免费额度重置异常（#50091）、升级后无法回退（#51219）、Zen 通道封号无申诉（#49057）——账户层问题缺少用户侧自诊断手段。
3. **V2 迁移完整性**：schema 漂移（#43748）、project_id 丢失（#50551）、2.x 无官方 release notes（#50345），迁移期文档与工具链同步滞后。
4. **多 MCP / 弱网冷启动**：并发启动失败无重试路径（#48743），重度配置用户体验差。
5. **国际化与稳定性长尾**：非英文 locale 崩溃（#51087）、`.jsonc` LSP 诊断缺失（#48786）等老问题仍未闭环。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-09-25）

## 📰 今日速览

v0.24.5 正式版发布，同步推出 Desktop v0.24.5 和 TypeScript SDK v0.1.15。架构层面动态密集：Tauri 桌面壳正式接替 Electron（#12653 改名 PR），Managed Agent 双路径架构提案（#12380）持续升温。性能方向出现创新提案"System One Decision Gate"（#12589/#12590），用小型本地模型分流廉价决策以降低延迟。

---

## 🚀 版本发布

### v0.24.5（主 CLI）
- **feat(channels)**: 将 group-member 访问与 senderPolicy 解耦（[#12475](https://github.com/QwenLM/qwen-code/pull/12475)）
- 无已知 Breaking Changes
- 同步发布 nightly：`v0.24.5-nightly.20260924.ffea2d024e`

### Desktop v0.24.5
- **fix(serve)**: 保留 session 创建失败的诊断信息（#12331）
- **feat(sdk-java)**: 新增 managed runtime 支持

### SDK TypeScript v0.1.15
- 捆绑 CLI 0.24.5，与 CLI 同源同分支构建

### sdk-java（nightly）
- 新增 Hosted Harness private client（#12654，@doudouOUC）

---

## 🔥 社区热点 Issues

1. **[#12380](https://github.com/QwenLM/qwen-code/issues/12380)** — Managed Agent 双路径架构提案（17 评论）
 定义保留 TS agent loop、推理与工具环境解耦、Session 持久化归属的分阶段架构。是本周讨论最激烈的路线图级提案。

2. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500)** — TUI 多后台 agent 完成时静默崩溃（16 评论，P1）
 多个后台 subagent 相继完成时触发 React #185（最大更新深度超限），TUI 无提示退出。与已关闭的 #11756 同源，稳定性核心痛点。

3. **[#11872](https://github.com/QwenLM/qwen-code/issues/11872)** — Web Terminal "PTY not available"（14 评论，P1）
 `@lydell/node-pty` 声明未打包 + macOS 签名拦截本地 prebuilds。相关修复 PR #12649 已提交（见下）。

4. **[#11119](https://github.com/QwenLM/qwen-code/issues/11119)** — serve 会话回收丢后台 shell 输出（10 评论，P1）
 daemon 托管会话中后台任务输出与唤醒通知被静默丢弃，最终卡死会话。daemon 可靠性代表性问题。

5. **[#8596](https://github.com/QwenLM/qwen-code/issues/8596)** — 弃用 Electron 桌面端，Tauri 壳接管 desktop 之名（10 评论）
 对应改名 PR #12653 今日已提交，提案正在落地。

6. **[#12416](https://github.com/QwenLM/qwen-code/issues/12416)** — Remote-SSH 所有 POST /session 报 EPIPE（8 评论，P1）
 Companion 0.24.2 下会话创建全量失败，捆绑 CLI 单独使用正常，回归特征明显。

7. **[#12053](https://github.com/QwenLM/qwen-code/issues/12053)** — 精简 Goal runtime（已关闭，8 评论）
 实测两场 `/goal-draft` 会话在单轮约 100 次工具调用内完成目标，evidence catalog 与 checkpoints 属冗余开销。

8. **[#12381](https://github.com/QwenLM/qwen-code/issues/12381)** — HTTP 网关超时后恢复 session-create 结果（7 评论）
 网关超时后服务端实际建会话成功但客户端拿不到 session ID 的边界问题。

9. **[#11956](https://github.com/QwenLM/qwen-code/issues/11956)** — 无参工具 `parameters` 序列化为 null 被严格网关拒绝（7 评论，P2）
 OpenAI 兼容生态兼容性问题，影响第三方接入。

10. **[#12589](https://github.com/QwenLM/qwen-code/issues/12589)** — System One Decision Gate 提案（5 评论）
 用小模型单次前向分类用户意图（聊天/需工具/上下文可答），跳过大模型唤醒，配套 PR #12590 已开。

---

## 🔧 重要 PR 进展

1. **[#12653](https://github.com/QwenLM/qwen-code/pull/12653)** — `desktop-shell` 改名为 `desktop`，Tauri 正式接管桌面端，全量更新 CI/release/脚本引用。
2. **[#12590](https://github.com/QwenLM/qwen-code/pull/12590)** — 实现 System One Decision Gate（可选 `/superfast`），默认关闭、fail-open，不捆绑模型。
3. **[#12649](https://github.com/QwenLM/qwen-code/pull/12649)** — 修复 linux-arm64 node-pty prebuild 缺失，并在 release 流程加 fatal gate，直击 #11872。
4. **[#12627](https://github.com/QwenLM/qwen-code/pull/12627)** — SDK Java Runtime binding 重启后可恢复，而非 fail-closed 报 `runtime_reconciliation_required`。
5. **[#12580](https://github.com/QwenLM/qwen-code/pull/12580)** — 系统提示词加入“上下文优先回答”策略：先查会话历史再启动调查，减少冗余工具调用。
6. **[#12546](https://github.com/QwenLM/qwen-code/pull/12546)** — 系统提示词第二轮去重压缩，持续降低 prompt 体积。
7. **[#12107](https://github.com/QwenLM/qwen-code/pull/12107)** — 扩展加载循环并行化，优化 daemon `GET /extensions` 冷加载性能。
8. **[#12183](https://github.com/QwenLM/qwen-code/pull/12183)** — 新增 `--managed-extensions <root>`，支持部署方托管扩展目录。
9. **[#12461](https://github.com/QwenLM/qwen-code/pull/12461)** — per-model 并发上限扩展到前台 sub-agent（此前仅限后台）。
10. **[#12665](https://github.com/QwenLM/qwen-code/pull/12665)** — `@`-引用被拒时显式报告而非静默丢弃，呼应长期反馈 #8226。

其他值得留意：#12540（关闭 /context 记账遗留项）、#12666（Linux 剪贴板查询失败通知，配合 #12505）、#12605（shell 模式剔除一次性 system-reminder）。

---

## 📈 功能需求趋势

- **Daemon / serve 稳定性**：#12380、#11119、#12381、#12207、#11795 均指向托管会话生命周期管理，是当前最集中的投入方向。
- **桌面端换血**：Electron → Tauri 迁移进入实操阶段（#8596 + #12653）。
- **性能与延迟**：System One 决策门（#12589）、headless 启动延迟/内存基线（#12405）、扩展加载并行化（#12107）。
- **多 agent 治理**：并发上限（#12461）、bundled-reference 工具策略可见性（#12424）。
- **SDK 生态扩展**：Java SDK Runtime binding 恢复机制、Hosted Harness client，企业集成信号明显。

---

## ⚠️ 开发者关注点

- **静默失败是最大抱怨**：TUI 崩溃无提示（#11500）、剪贴板粘贴无反馈（#12505）、@-引用静默丢弃（#8226）、后台通知静默延迟 12–19 分钟（#12207）——“fail-silent”类问题横跨多个子系统。
- **OpenAI 兼容网关兼容性**：`parameters: null` 序列化（#11956）、免密钥 hosted endpoint 的 modelProviders 归类困惑（#12662），第三方接入摩擦仍存。
- **Windows/MCP 老问题回归测试中**：#9693、#9675、#10056 集中标记 need-retesting/need-information，桌面端 MCP 连接稳定性待验证。
- **权限与安全边界**：permission 队列按 ACP 连接全局阻塞（#11795）、auto-mode 分类器 fail-open 回归（#9639）值得安全敏感用户关注。
- **进程落地节奏**：多个 issue 标注 `status/ready-for-human`（#12664、#12424、#12662），维护者人力是当前合并吞吐的瓶颈。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*