# AI CLI 工具社区动态日报 2026-10-04

> 生成时间: 2026-10-03 23:01 UTC | 覆盖工具: 7 个

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
**数据窗口：2026-10-04 过去 24 小时**

---

## 1. 生态全景

AI CLI 工具已从单轮对话助手演进为**多智能体编排平台**，各头部产品均在围绕子代理、托管会话（daemon/service）、上下文压缩管理进行深度重构。工程重心明显从“功能新增”转向**可靠性与成本治理**——静默失败、内存泄漏、token 失控、Windows 兼容成为社区反馈的主旋律。MCP 生态的认证、规模上限与生命周期管理是所有工具共同的企业落地瓶颈。开源社区贡献活跃度分化明显：OpenAI Codex、Gemini CLI、Qwen Code 保持高频合入，Claude Code 与 Copilot CLI 则呈现“官方主导、社区观望”的形态。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues（日报选取） | PR 动态 | Release | 迭代节奏 |
|---|---|---|---|---|
| **Claude Code** | 10（多为 stale 批量关闭） | 6（4 个 `/diff` 重构 + 1 安全改动） | 无 | 平稳，issue 治理靠 stale 机制 |
| **OpenAI Codex** | 10（含 44👍 高热） | ~20 合入 | **3 个 alpha**（0.162.0 a9-11） | 最快，密集修复期 |
| **Gemini CLI** | 10（4 个 P1） | 11 | 1 nightly（v0.64.0） | 快速迭代，P1 集中修复 |
| **Copilot CLI** | 10（+批量关闭积压） | 1（无效） | 无 | 平稳偏慢，集中清积压 |
| **Kimi Code CLI** | 0 | 0 | 无 | 无活动 |
| **OpenCode** | 10 | 10（+大量被机器人清理） | 无 | v2 磨合期，问题密集 |
| **Qwen Code** | 10（含 45 评论架构讨论） | 10 | 1 nightly（v0.24.7） | 快速，架构深化期 |

---

## 3. 共同关注的功能方向

**① 子代理/多智能体可靠性**（全生态最大公约数）
- Claude Code：peer socket 不可达（#85497）、子代理通知延迟 30-40 分钟（#87009）、结果误路由（#85515）
- Gemini CLI：通用挂起一小时（#21409）、MAX_TURNS 后误报成功（#22323）
- Qwen Code：≥8 并发 Turn 卡死（#13333）、coordinator 崩溃 wedging（#13327）
- OpenCode：子代理重启恢复逻辑统一（PR #46944）

**② 上下文压缩（Compaction）正确性**
- Claude Code：压缩净增 +167k tokens、压缩后丢失文件读状态（#85483/#85488）
- Codex：compaction 长期缺陷补回归测试（PR #50516）
- Copilot CLI：`/compact` 在 gpt-6.1-sol 上反复失败（#5045）
- OpenCode：压缩无视 `compaction.model` 配置（#44094）

**③ Windows/平台兼容**
- Claude Code、Codex（sandbox 自 4 月未修复 #18620、WSL 问题）、OpenCode（45s 看门狗 #52049）、Copilot CLI（macOS 也可用）

**④ MCP 生态成熟度**
- Copilot CLI：Entra ID OAuth 回调失败（#5040）、工具目录回归（#5044）
- Gemini CLI：>128 工具即 400 错误（#24246）
- OpenCode：断线重连（PR #52943）；Codex：增量工具目录更新（PR #50540）

**⑤ Token 成本失控与护栏**
- Claude Code：审查循环烧掉两个 Max 20 账户（#85496）；Qwen Code：死胡同循环烧 5-14M tokens（#10887）；Qwen 社区更提出“节省必须带成功率门控”（#12333）

**⑥ 静默失败与可观测性缺失** — 五个活跃工具均高频提及，是行业性短板。

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 多智能体编排、插件生态、权限模型收紧（PR #99137） | 重度自动化/长时无人值守用户 | 闭源二进制，Bun 运行时（受社区质疑） |
| **Codex** | 全平台覆盖（Windows/iPad/云）、dot 云电脑、企业合规（GovCloud、Bedrock） | OpenAI 生态 + 企业用户 | Rust 重写，alpha 快速滚动 |
| **Gemini CLI** | 子代理体系、AST 感知代码理解、沙箱安全执行、行为约束层 | 开发者 + 安全敏感场景 | 开源 TypeScript，本地 subagent Sprint |
| **Copilot CLI** | MCP 企业认证、ACP 协议开放（第三方客户端接入）、BYOK 多模型 | GitHub/微软企业生态用户 | 协议标准化路线（ACP 是差异化核心） |
| **OpenCode** | 开源自助、轻量模型路由降本、自定义 agent | 个人开发者/免费层用户 | 开源，v2 client-service 架构磨合 |
| **Qwen Code** | Managed Agent 服务化（daemon + serve）、多端分发（Android/飞书/Web Shell） | 国产模型用户、多端场景 | 双路径架构（Legacy/Managed），评审流程极重 |

---

## 5. 社区热度与成熟度

- **最活跃迭代**：Codex（~20 PR/日 + 3 alpha）、Gemini CLI、Qwen Code — 处于快速演进期，适合尝鲜但需承受回归风险
- **成熟但增长放缓**：Claude Code — 用户基数大（issue 编号已至 8.7 万），但 stale 关闭潮引发“问题被搁置”担忧
- **稳定清理期**：Copilot CLI — 集中关闭积压（BYOK、CJK 等老 issue），新功能节奏慢
- **动荡期**：OpenCode — v2 转型引发 OOM/驱逐/免费层误判等信任危机，且自动化 PR 清理伤害贡献者
- **沉寂**：Kimi Code CLI — 零活动

---

## 6. 值得关注的趋势信号

1. **“无人值守自动化”倒逼稳定性基建**：OOM、通知延迟、烧钱循环集中爆发，说明用户已把 CLI 用于长时自主任务——**成本上限、循环终止、崩溃恢复**将成为下一轮竞争力焦点。
2. **Compaction 是行业性技术债**：四款工具同时暴露压缩缺陷（token 计算、状态丢失、模型配置失效），上下文管理工程化程度将直接决定长会话可用性。
3. **架构向 daemon/服务化收敛**：Codex daemon、Qwen Managed Agent、OpenCode v2 托管服务——CLI 正在演变为**多 Session 可编排的本地服务**，为 IDE/移动端/云端统一入口铺路。
4. **权限与行为约束成为产品能力**：Claude Code 插件权限只紧不松、Gemini 的 hold 指令强制执行（PR #29394）、Qwen 的 workspace-trust——安全语义正从配置项升级为架构层。
5. **协议开放 vs 生态封闭的路线分野**：Copilot CLI 押注 ACP 标准化，Qwen/Gemini 走开源自建——第三方客户端生态的话语权之争值得关注。
6. **对开发者的实操建议**：生产环境优先选择带增量工具目录、配额透明、断线重连机制的工具；升级前检查回归报告（Codex 扩展 10.1 更新、Copilot 1.0.87 均为反面案例）；长任务务必设置 token/成本护栏。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-10-04 | 来源：anthropics/skills**

> 说明：本期 PR 评论数据缺失（undefined），以下排名综合 PR 更新活跃度、Issue 关联度与主题热度生成。

---

## 一、热门 Skills / PR 动态

| # | PR | 主题 | 状态 |
|---|---|---|---|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator 触发评估修复**：隔离 per-worker 探测、修复 Windows `select()` 失败、运行时异常不再误判为非触发。与热门 Issue #1383/#556 直接呼应 | OPEN |
| 2 | [#1742](https://github.com/anthropics/skills/pull/1742) | **mcp-builder 适配 mcp>=2**：修复 `streamablehttp_client` 更名与自定义 header 传参，修复 Issue #1668 | OPEN |
| 3 | [#1607](https://github.com/anthropics/skills/pull/1607) | **claude-api 模型清单更新**：标记 4 个退役模型 ID，10 月初仍有更新，社区关注度高 | OPEN |
| 4 | [#1792](https://github.com/anthropics/skills/pull/1792) | **docx 修订验证**：LibreOffice 超时不再误报成功，增加 `w:ins/w:del` 残留检查 | OPEN |
| 5 | [#1703](https://github.com/anthropics/skills/pull/1703) | **md2video-audio**：Markdown → MP4 演示视频 + 逼真配音，零成本方案 | OPEN |
| 6 | [#1776](https://github.com/anthropics/skills/pull/1776) | **blast-radius**：批量/破坏性写操作前的“爆炸半径”检查清单，安全意识强 | OPEN |
| 7 | [#525](https://github.com/anthropics/skills/pull/525) | **Pyxel 复古游戏开发**：由 Pyxel 作者提交，含 headless 运行与帧检查 | OPEN |
| 8 | [#1734](https://github.com/anthropics/skills/pull/1734) | **docx 孤立批注检测** | OPEN |

---

## 二、社区需求趋势（来自 Issues）

1. **信任与安全机制**（[#492](https://github.com/anthropics/skills/issues/492)，43 评论最热）：社区 Skill 冒用 `anthropic/` 命名空间构成信任边界漏洞，官方命名空间治理呼声最高。
2. **组织内 Skill 分发**（[#228](https://github.com/anthropics/skills/issues/228)）：企业用户强烈要求 org 级共享 Skill 库，替代 Slack 传文件的原始方式。
3. **Skill 评估/触发可靠性**（[#556](https://github.com/anthropics/skills/issues/556)、#1383、#1390）：eval 脚本触发率 0%、Windows 兼容、静默失败——skill-creator 与 mcp-builder 的评估工具链是 Bug 重灾区。
4. **Token 效率**（[#1487](https://github.com/anthropics/skills/issues/1487)）：claude-api skill 一次注入 156k token 耗尽上下文，渐进式加载需求迫切。
5. **新方向提案**：compact-memory 紧凑记忆符号（#1329）、agent-governance 治理模式（#412）、推理质量门禁流水线（#1385）——均指向**长会话与输出质量控制**。
6. **运维/基础设施类**：HPC/Slurm 集群操作（PR #1615）、Bedrock 支持（#29）。

---

## 三、高潜力待合并 Skills（活跃且未合并）

- [#1607](https://github.com/anthropics/skills/pull/1607) claude-api 模型退役更新 —— 10/03 仍有活动，修复明确，最可能近期落地
- [#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder mcp>=2 适配 —— 关联待修 Issue #1668
- [#1298](https://github.com/anthropics/skills/pull/1298) skill-creator 评估修复 —— 长期迭代（6 月至今），解决多个高热度 Issue
- [#1792](https://github.com/anthropics/skills/pull/1792) docx 超时修复 —— 小而清晰的 bugfix
- [#1681](https://github.com/anthropics/skills/pull/1681) skill-creator package_skill.py 独立执行修复
- [#1776](https://github.com/anthropics/skills/pull/1776) blast-radius —— 设计精巧的安全检查类 Skill

⚠️ 风险提示：#1771（ProofCore 合约审计）绑定特定 TON 商业协议，有自我推广嫌疑；#1245 双 Skill 混装 PR 结构待重构，合并概率较低。

---

## 四、生态洞察

**当前社区最集中的诉求是“Skill 生态的可信与可用性”——即官方命名空间的安全治理、组织级分发能力，以及 skill-creator/mcp-builder 评估工具链的可靠性修复；相比新增 Skill，社区更迫切要求把现有基础设施做稳。**

---

# Claude Code 社区动态日报 — 2026-10-04

## 1. 今日速览

过去 24 小时无新版本发布。Issue 活动以**批量 stale 关闭**为主：大量 8 月提交的 bug 被标记 stale 后关闭，涉及内存泄漏、网络、权限与多智能体编排等核心领域。PR 方面，@poteat 集中提交了 `/diff` 面板重构系列（4 个 PR）及一个安全默认值收紧的权限模型改动，值得重点关注。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues（精选 10）

1. **[#81704](https://github.com/anthropics/claude-code/issues/81704) — 请求发布 FreeBSD 原生二进制**
   唯一保持 OPEN 的高热度 Issue（9 条评论）。作者论证 Bun 已不再是阻碍，希望官方提供 FreeBSD 原生构建，反映非主流平台用户诉求。

2. **[#84960](https://github.com/anthropics/claude-code/issues/84960) — v2.1.224 内存泄漏致 OOM（14.5GB / 21.3GB anon-rss）**
   8 条评论。同日两次 OOM kill，属严重稳定性问题，虽已 stale 关闭但仍是长时运行会话的典型风险信号。

3. **[#84194](https://github.com/anthropics/claude-code/issues/84194) — 捆绑 Bun HTTP 客户端流式调用 ECONNRESET**
   7 条评论。Node.js/curl 均正常而 Bun 失败、重装无效，直指运行时网络栈的可疑缺陷，与 #81704 呼应，社区对 Bun 运行时信任度存疑。

4. **[#85497](https://github.com/anthropics/claude-code/issues/85497) — 跨会话 peer socket 注册后不可达**
   多智能体 `SendMessage` 通信静默失败、需重启修复，暴露会话间通信可靠性短板。

5. **[#85483](https://github.com/anthropics/claude-code/issues/85483) — 自动压缩反而增大实际上下文（最高 +167k tokens）**
   基于 5,180 个压缩边界的扎实测量：preTokens 分歧时压缩可净增上下文，12.9% 子代理压缩受影响。数据详实，值得关注是否被正式跟进。

6. **[#87009](https://github.com/anthropics/claude-code/issues/87009) — 子代理完成通知延迟 30-40+ 分钟（👍2）**
   小任务也要手动 nudge，直接影响多代理工作流可用性。

7. **[#85515](https://github.com/anthropics/claude-code/issues/85515) — /code-review 编排器挂起约 1 小时**
   子代理结果被误路由到其他会话、父编排器永不被唤醒，多代理消息路由又一案例。

8. **[#85496](https://github.com/anthropics/claude-code/issues/85496) — 自驱对抗式审查循环无严重度下限与消费上限**
   700 行 PR 消耗两个 Max 20 账户，反映自动化长任务的成本失控痛点。

9. **[#85488](https://github.com/anthropics/claude-code/issues/85488) — 自动压缩后丢失文件已读状态**
   压缩后 `Edit/Write` 报 "File has not been read yet"，压缩引发的状态一致性问题的又一实例，与 #85483 同主题。

10. **[#85508](https://github.com/anthropics/claude-code/issues/85508) — 长响应流式输出破坏 iTerm2 回滚缓冲区（👍2）**
    TUI 渲染层的实际体验痛点，中等流覆盖早期输出。

## 4. 重要 PR 进展

> 今日仅 6 个 PR 有更新，全部列出：

1. **[#99118](https://github.com/anthropics/claude-code/pull/99118) — `/diff` 面板打开时允许显示其他插件 toast**
   移除 `holdToasts` 全局抑制，改善多插件并行时的信息可见性。

2. **[#99141](https://github.com/anthropics/claude-code/pull/99141) — `/diff` 在无可绘制内容时保留面板**
   面板先保留、内容就绪即显示，消除闪烁/空窗（基于 #99118）。

3. **[#99206](https://github.com/anthropics/claude-code/pull/99206) — 修复 docked 面板头部多余空行**
   docked `/diff` 从两行空行改为一行，TUI 布局细节打磨。

4. **[#99137](https://github.com/anthropics/claude-code/pull/99137) — 安全默认值：插件只能收紧、不能放宽其上层权限规则**
   重要安全语义变更：插件无法解除 deny/ask 规则或修改 pinned 变量。对插件生态权限模型影响显著。

5. **[#81672](https://github.com/anthropics/claude-code/pull/81672) — hookify 包导入不再依赖安装目录名**
   修复 marketplace 安装场景下 `sys.path` 假设目录名为 `hookify` 的问题（修复 #69665、#81448），社区贡献。

6. **[#77977](https://github.com/anthropics/claude-code/pull/77977)（已关闭）— 文档：marketplace 源的 skipLfs 选项**
   补充 `github`/`git` 源跳过 Git LFS 下载的文档。

## 5. 功能需求趋势

- **多智能体编排可靠性**：peer 通信失败、子代理通知延迟、结果误路由（#85497/#87009/#85515），是当前反馈最密集的方向。
- **上下文压缩质量**：压缩净增 token、读状态丢失（#85483/#85488），社区用大规模数据验证了问题。
- **平台覆盖与运行时**：FreeBSD 原生二进制、Bun HTTP 栈问题（#81704/#84194），对摆脱 Bun 依赖的呼声明确。
- **权限与成本控制**：复合命令审批粒度、自动模式分类器误拦截、消费上限（#85491/#85492/#85496）。
- **Windows 支持质量**：App Execution Alias、MCP hook 不触发、驱动器根目录 `.mcp.json` 发现失败（#85475/#85479/#85525）。

## 6. 开发者关注点

- **长时无人值守会话不稳定**：OOM、通知延迟、审查循环烧钱，反映用户正把 Claude Code 用于长时间自动化，工具的稳定性与成本护栏尚未跟上。
- **静默失败缺少诊断**：peer socket 不可达、`.mcp.json` 不被发现、hook 不触发均无警告——可观测性是高频诉求。
- **压缩机制透明度不足**：多个 issue 显示压缩边界处状态丢失和 token 计算异常，开发者希望有更可预测的上下文管理。
- **Stale 关闭潮的隐忧**：今日多数关闭源于 stale 机制而非修复，部分数据详实的报告（如 #85483）被关闭可能意味着问题被搁置而非解决，社区需关注是否复现于新版本。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-04

## 📌 今日速览

过去24小时，Codex 团队密集合入了约20个修复与改进 PR，并连续发布 0.162.0 的 alpha 9-11 三个预发布版本，节奏明显加快。社区侧，**VS Code 扩展的消息丢失/队列卡死问题**（#49988、#50403 等）成为最大痛点，Windows 平台与 dot 云电脑相关的稳定性问题持续发酵。

---

## 🚀 版本发布

Rust CLI 连发三个 alpha 版本，迭代节奏极快：
- [rust-v0.162.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.9)
- [rust-v0.162.0-alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.10)
- [rust-v0.162.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.11)

Release Note 未附详细变更说明，但结合同期 PR 推测主要覆盖 TUI、MCP 工具目录、Windows sandbox 与 daemon 管理等方向。

---

## 🔥 社区热点 Issues（Top 10）

1. **[#49988](https://github.com/openai/codex/issues/49988) — VS Code 扩展更新后消息丢失** ⭐44👍
   10月1日扩展更新后，按 Enter 常清空输入框但消息未送达、Codex 无响应。44 个 👍 说明影响面极广，是当前 IDE 侧最严重的问题。

2. **[#48324](https://github.com/openai/codex/issues/48324) — Windows 桌面版无法加载组织设置**（39 评论）
   Codex composer 无法加载，用户甚至无法通过 `/` 提交反馈。桌面 Windows 体验的基本可用性问题，已持续一周。

3. **[#49458](https://github.com/openai/codex/issues/49458) — dot 启动的本地任务缺少 Computer Use 工具**（38 评论，16👍）
   普通 Codex 会话正常，但 dot 触发的任务缺少 Computer Use 能力，反映 dot 与本地 Codex 的能力不一致。

4. **[#50403](https://github.com/openai/codex/issues/50403) — VS Code 队列消息静默发送失败**（24 评论）
   "Failed to release queued message send lock" + JSON 解析错误，与 #49988 同属消息队列机制的系统性缺陷。

5. **[#41695](https://github.com/openai/codex/issues/41695) — iPad 远程会话频繁卡死**（16 评论）
   远程 Codex 会话在 iPad 上几乎不可用，长期未解决，移动端体验被忽视的信号。

6. **[#49682](https://github.com/openai/codex/issues/49682) — dot 云电脑文件丢失**（15 评论）
   dot 云电脑上 `/workspace/shared` 下的文件无故消失，数据持久性存疑，与 #50388 属同类问题，直击用户信任。

7. **[#50451](https://github.com/openai/codex/issues/50451) — 10月2日全球额度重置未覆盖付费账户**（5 评论）
   官方宣布"已全量传播"后仍有付费账户未收到重置，配额透明度与沟通问题。

8. **[#50501](https://github.com/openai/codex/issues/50501) — 62,500 促销额度凭空清零**
   有效期至年底的赠送额度突然归零，非显示问题，实际任务已停摆。

9. **[#18620](https://github.com/openai/codex/issues/18620) — Windows sandbox `CreateProcessWithLogonW` 失败**（11 评论）
   自4月开放至今未修复，Windows sandbox 兼容性的长期顽疾。

10. **[#46489](https://github.com/openai/codex/issues/46489) — WebSocket 传输忽略 SSL_CERT_FILE**
    企业 TLS 拦截代理环境下 WebSocket 报 UnknownIssuer，而 HTTP 正常，企业落地的主要障碍之一。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#50555](https://github.com/openai/codex/pull/50555) — Windows 挂载的 WSL home 跳过 daemon 自动启动**
   直接缓解 DrvFS/9p 权限语义导致的启动失败，与 #43628（WSL 项目创建失败）相关。

2. **[#50558](https://github.com/openai/codex/pull/50558) — 解析绝对路径不再读取当前目录**
   修复当前目录被删除后路径解析失败的边界情况。

3. **[#50507](https://github.com/openai/codex/pull/50507) — 记录 Windows sandbox 服务停止诊断**
   持久化生命周期原因与 HRESULT，改善 Windows sandbox 问题（如 #18620、#50009）的可诊断性。

4. **[#50540](https://github.com/openai/codex/pull/50540) — Responses Lite 发送增量工具目录更新**
   初始目录只发一次，后续仅追加变更，减少 token 开销。

5. **[#50562](https://github.com/openai/codex/pull/50562) / [#50536](https://github.com/openai/codex/pull/50536) / [#50546](https://github.com/openai/codex/pull/50546) — Code Mode 工具描述与 MCP 类型稳定性**
   一组 PR 确保 MCP 目录变化时 `exec` 描述和工具前缀保持稳定，避免提示词漂移。

6. **[#50516](https://github.com/openai/codex/pull/50516) — 远程 `/compact` 上下文保留场景测试**
   为持续出问题的 compaction（#38969、#42695）补齐回归测试覆盖。

7. **[#50559](https://github.com/openai/codex/pull/50559) — 区分 daemon 发布标识与可执行内容**
   解决资源变化但二进制相同导致 daemon 不识别更新的问题。

8. **[#50720](https://github.com/openai/codex/pull/50720) — 解码 Windows Terminal 的 Shift+Enter 映射序列**
   小而实用的 TUI 输入修复，Windows Terminal 用户体验提升。

9. **[#50510](https://github.com/openai/codex/pull/50510) — Bedrock 设置后 GovCloud 强制确认**
   合规层面的改进，检测 AWS GovCloud 配置并要求显式确认安全指引。

10. **[#50505](https://github.com/openai/codex/pull/50505) / [#50564](https://github.com/openai/codex/pull/50564) — TUI 交互打磨**
    任务删除后选中项保持相邻、底部弹窗打开时允许选择复制文本等细节优化。

---

## 📈 功能需求趋势

1. **IDE 扩展可靠性（最强呼声）**：VS Code 消息丢失、队列卡死、steering 卡加载（#49988/#50403/#50486/#50705/#50729），10月1日更新后集中爆发。
2. **Windows 平台稳定性**：桌面崩溃、sandbox 失败、WSL 集成问题贯穿本月（#48324/#18620/#43628/#50009/#50667）。
3. **dot 与云电脑的数据持久性**：文件丢失、环境漂移（#49682/#50388），以及 dot 与本地会话能力对齐（#49458/#49566/#50171）。
4. **Compaction 正确性**：压缩失败、指令回退、read_thread 分页回归（#38969/#42695/#50509）。
5. **配额与计费透明度**：额度重置未生效、促销额度消失（#50451/#50501）。

---

## 💡 开发者关注点

- **消息队列机制疑似系统性缺陷**：多条 VS Code issue 指向同一根因（send lock / streaming 状态未复位），建议团队统一排查而非逐个修复。
- **企业网络环境支持不足**：自定义 CA（#46489）、TLS 拦截代理、S3 SigV4 签名问题（#50246）阻碍企业采用。
- **诊断信息获取困难**：多个 issue 反馈崩溃发生在 composer 加载前，用户无法提交 session ID，PR #50507 的方向值得扩展。
- **Compaction 是长周期风险区**：相关 bug 最早可追溯至8月，#50516 补测试是好信号，但根因修复仍待验证。
- **社区对 dot 云电脑信任动摇**：连续的文件丢失报告若不尽快给出持久性承诺，可能影响该功能的推广。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-04）

## 📌 今日速览

今日发布 nightly 版本 v0.64.0，修复了选择列表中 Enter/Spacebar 确认不可靠的问题。社区 PR 方向聚焦**子代理（subagent）多模态响应修复**和**沙箱环境兼容性**（gVisor/runsc、rootless Podman）。Issues 板块子代理可靠性问题持续发酵，多个 P1 级别的 agent 挂起/误报问题仍在等待修复验证。

---

## 🚀 版本发布

**v0.64.0-nightly.20261003.gfb972b2f8**
- fix(cli): 确保 Enter 和 Spacebar 能可靠确认选择列表选项（[PR #29502](https://github.com/google-gemini/gemini-cli/pull/29502)）
- [完整变更日志](https://github.com/google-gemini/gemini-cli/compare/v0.64.0-nightly.20261002.gc9096a847...v0.64.0-nightly.20261003.gfb972b2f8)

---

## 🔥 社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** 子代理命中 MAX_TURNS 后误报 GOAL 成功（P1，13 评论）
   子代理 `codebase_investigator` 达到轮次上限却被报告为成功，掩盖了任务中断。状态上报机制的真实性问题直接影响任务可靠性。

2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** 零依赖 OS 沙箱 + 执行后意图路由（P2，9 评论）
   针对 Gemini 3 模型原生 bash 能力设计的安全执行架构提案，是 agent 执行层的重量级方向讨论。

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** 通用子代理挂起（P1，8 评论，8 👍）
   通用代理挂起最长达一小时，用户只能通过禁止子代理规避。高影响高频问题。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** AST 感知文件读取/搜索/映射评估（P2，7 评论）
   探索 AST 工具（tilth、glyph、ast-grep）能否减少读偏移和 token 噪音，是代码库理解能力的核心升级方向。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** 模型几乎不主动使用 skills 和子代理（P2，7 评论）
   自定义 skills 需显式指令才触发，反映工具选择策略的短板。

6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** Browser Agent 忽略 settings.json 配置（如 maxTurns）（P2，4 评论）
   AgentRegistry 读取了配置但未生效，配置链路存在断点。

7. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** browser 子代理在 Wayland 下失败（P1，4 评论）
   Linux 桌面新显示协议下的兼容性问题，影响面持续扩大。

8. **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)** browser_agent 需要自动会话接管和锁恢复（P2，4 评论）
   当前 fail-fast 策略在浏览器 profile 被锁时直接失败，韧性不足。

9. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** 超过 128 个工具时触发 400 错误（P2，3 评论）
   MCP 生态扩展下工具数量激增，作用域限制机制亟需智能化。

10. **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)** 模型频繁在随机位置创建临时脚本（P2，3 评论）
    工作区污染问题，增加提交前清理成本。

---

## 🔧 重要 PR 进展

1. **[#29590](https://github.com/google-gemini/gemini-cli/pull/29590)** 修复 `stripToolCallIdPrefixes()` 丢弃 `functionResponse.parts`，工具返回的图片（如截图）此前无法到达模型。
2. **[#29621](https://github.com/google-gemini/gemini-cli/pull/29621)** 保留子代理多模态工具响应 parts，图像数据不再被 scheduler 丢弃。与 #29590 同属多模态链路修复。
3. **[#29622](https://github.com/google-gemini/gemini-cli/pull/29622)** 修复 `tildeifyPath` 边界问题，避免共享家目录前缀的兄弟目录被误显示为 `~` 下路径。
4. **[#29597](https://github.com/google-gemini/gemini-cli/pull/29597)**（OPEN）gVisor/runsc 沙箱下允许 stdio IPC 回退，解决 Netstack 隔离导致无法与宿主 loopback 通信的问题。
5. **[#29505](https://github.com/google-gemini/gemini-cli/pull/29505)**（OPEN，P1）支持 rootless Podman + keep-id，正确映射宿主 UID/GID 修复沙箱启动失败。
6. **[#29402](https://github.com/google-gemini/gemini-cli/pull/29402)**（已关闭）PersistentState 原子写入（临时文件 + fsync + rename），防止中断导致 state.json 被截断清空。
7. **[#29397](https://github.com/google-gemini/gemini-cli/pull/29397)**（已关闭）修复中断回合注入合成 assistant 消息导致的**上下文污染和无限循环**——重要稳定性修复。
8. **[#29394](https://github.com/google-gemini/gemini-cli/pull/29394)**（已关闭，P1）在 scheduler 层阻断变更类工具，强制执行用户“先别动手”的 hold 指令，对抗 agent 的动作倾向。
9. **[#29400](https://github.com/google-gemini/gemini-cli/pull/29400)**（已关闭，P1）修复 `gemini -r` 恢复会话时工具响应重复回放的问题。
10. **[#29398](https://github.com/google-gemini/gemini-cli/pull/29398)**（已关闭，P1）MCP 工具发现增加短超时，避免 JSON-RPC id 不匹配时卡满 10 分钟。
11. **[#28669](https://github.com/google-gemini/gemini-cli/pull/28669)**（OPEN）将 TUI 测试指引整合为单一自包含 `tui-tester` skill。

---

## 📈 功能需求趋势

- **子代理（Subagent）体系深化**：本地子代理 Sprint 推进（[#20195](https://github.com/google-gemini/gemini-cli/issues/20195)）、并行协作与共享内存（[#18287](https://github.com/google-gemini/gemini-cli/issues/18287)）、轨迹可视化分享（[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)）、settings.json 发现机制（[#18285](https://github.com/google-gemini/gemini-cli/issues/18285)）
- **AST 感知代码理解**：读/搜索/映射三条线并行调研（#22745/#22746/#22747），目标是减少 token 消耗与读偏移
- **Token 节约型读取**：'Tactful Extraction' 分层代码发现（grep → 精准读取，[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)）
- **沙箱与安全执行**：零依赖 OS 沙箱（#19873）、破坏性行为防护（#22672）、gVisor/Podman 兼容（PR #29597/#29505）
- **任务管理持久化**：用文件 CRUD 替换内存 WriteToDo，对抗上下文腐化（[#18836](https://github.com/google-gemini/gemini-cli/issues/18836)、[#21000](https://github.com/google-gemini/gemini-cli/issues/21000)）
- **终端渲染性能**：resize 无闪烁方案（[#21924](https://github.com/google-gemini/gemini-cli/issues/21924)）

---

## ⚠️ 开发者关注点（痛点总结）

1. **子代理可靠性是最大痛点**：挂起（#21409）、误报成功（#22323）、配置不生效（#22267）、symlink 不识别（#20079）——整条链路问题密集，多数被标记 `need-retesting`。
2. **上下文/会话完整性**：会话恢复重复响应、中断导致上下文污染等核心稳定性问题近期集中修复（PR #29397/#29400），但用户仍需警惕。
3. **MCP 与工具扩展的规模上限**：>128 工具即 400 错误（#24246）、MCP 超时卡死，说明生态扩展已逼近当前架构瓶颈。
4. **多模态数据丢失**：工具返回图片无法到达模型（PR #29590/#29621），影响截图/浏览器自动化类工作流。
5. **行为可控性**：agent 不听 hold 指令、倾向危险 git 操作、随机位置写临时文件——用户对“行为约束层”的呼声强烈（PR #29394、#22672）。

---
*数据来源：github.com/google-gemini/gemini-cli | 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-04 | 数据来源：github.com/github/copilot-cli**

---

## 1. 今日速览

今日无新版本发布。社区焦点集中在 **MCP 生态的认证与工具目录问题**（OAuth/Entra 回调失败、工具目录变更回归 Bug）以及 **ACP 模式的能力缺口**（模型列表暴露、辅助审批、Computer Use 插件不可用）。此外，macOS 更新后 `.mcp-writer.binding` 导致 CLI 不可用的高热度 Bug（6 👍）仍未关闭，持续引发讨论。

---

## 2. 版本发布

过去 24 小时无新 Release。（社区提到的最新版本为 1.0.91 / 1.0.90-3）

---

## 3. 社区热点 Issues（Top 10）

1. **[#4998] macOS 更新/重启后 CLI 完全不可用（`.mcp-writer.binding` 持久化过期设备 ID）** [OPEN]
   🔗 https://github.com/github/copilot-cli/issues/4998
   影响 macOS 全体用户的高严重性 Bug：系统重启后新旧会话均无法处理 prompt。7 条评论、6 👍，是当前社区最活跃的故障报告。

2. **[#5044] 1.0.87 回归：无关工具的 `_meta` 差异导致 MCP 调用报 "MCP tool catalog changed"** [OPEN]
   🔗 https://github.com/github/copilot-cli/issues/5044
   快照预热机制与 `tools/list` 响应不一致时工具调用失败，属于新近引入的回归，值得维护者优先排查。

3. **[#5040] MCP OAuth：Entra ID 拒绝 127.0.0.1 回调（AADSTS50011）** [OPEN]
   🔗 https://github.com/github/copilot-cli/issues/5040
   企业场景痛点：使用 Entra ID 保护的远程 MCP 服务器全部无法认证，缺少 localhost 回调覆盖配置。

4. **[#5047] ACP 模式下暴露辅助审批机制** [OPEN]
   🔗 https://github.com/github/copilot-cli/issues/5047
   功能提案：让 T3 Code 等 ACP 客户端复用 Copilot 内置的安全审批判断，属于 ACP 生态的核心能力诉求。

5. **[#5042] HydraFusion：400 后会话被降级路由到小上下文模型，工具集中途变更** [OPEN]
   🔗 https://github.com/github/copilot-cli/issues/5042
   路由降级策略导致 37 分钟长会话无法加载静态 prompt，影响多模型路由的可用性。

6. **[#5045] `/compact` 在 gpt-6.1-sol 上反复失败（空模型响应）** [OPEN]
   🔗 https://github.com/github/copilot-cli/issues/5045
   上下文压缩是长会话刚需，该问题直接阻断长任务工作流。

7. **[#5049] ACP 模式下 Computer Use 插件不可用（Windows, 1.0.91）** [OPEN]
   🔗 https://github.com/github/copilot-cli/issues/5049
   CLI 中已启用但 ACP 会话无法加载该插件及对应 MCP 服务器，反映 ACP 与 CLI 功能不同步。

8. **[#4880] ACP：将模型列表以 category:model 配置项暴露** [OPEN]
   🔗 https://github.com/github/copilot-cli/issues/4880
   `session/new` 只返回 mode，ACP 客户端无法枚举/选择模型，是 ACP 集成的基础设施缺口。

9. **[#5027] Linux Sandbox 在 systemd-resolved 下 DNS 失效** [OPEN]
   🔗 https://github.com/github/copilot-cli/issues/5027
   沙箱共享宿主机 resolv.conf 时 127.0.0.53 不可达，影响主流 Linux 发行版的沙箱网络。

10. **[#2795] `--agent` 与 `--plugin-dir -p` 组合失效** [CLOSED]
    🔗 https://github.com/github/copilot-cli/issues/2795
    17 👍 的老牌问题今日关闭，非交互模式下 agent 发现机制修复，是插件/自动化用户期待已久的进展。

**其他关闭动态**：BYOK reasoning effort 报错（#4012，23 👍）、Windows 下启动 VS Code 破坏 Git 配置（#4531）、MCP 慢连接阈值配置（#2907）、ask_user 多行输入（#2067）、CJK 字符粘贴乱码（#3369）均于近期关闭，显示维护团队在集中清理积压。

---

## 4. 重要 PR 进展

过去 24 小时仅更新 1 个 PR：

- **[#5046] Initial commit** [OPEN] | @c6r8h48msf-debug
  🔗 https://github.com/github/copilot-cli/pull/5046
  标题为 "Initial commit"、来自疑似调试账号，无实质描述，预计将被关闭。今日无有效代码合入动态。

---

## 5. 功能需求趋势

- **ACP 集成深化**：模型列表暴露（#4880）、辅助审批（#5047）、Computer Use 插件可用性（#5049）——ACP 正成为第三方客户端接入 Copilot CLI 的关键通道，但能力对齐 CLI 仍有明显差距。
- **MCP 企业级认证**：Entra ID 回调兼容（#5040）、有状态服务器 OAuth 探测失败（#5014）、并发 token 刷新误报（#4842）——企业 MCP 部署是当前最集中的问题域（24 条 Issue 中约 1/3 涉及 MCP）。
- **上下文与长会话管理**：`/compact` 失败（#5045）、HydraFusion 路由降级（#5042）、Plan mode 后丢弃规划转录（#5041）——社区对会话上下文生命周期控制提出更精细要求。
- **终端交互体验**：Vim/less 风格键盘翻页器（#5015）、CJK 文本处理（#3369）、自定义复制快捷键兼容（#5043）。
- **可配置性**：任务栏图标开关（#4839，已关闭）、MCP 慢连接阈值（#2907，已关闭）。

---

## 6. 开发者关注点

1. **macOS 稳定性**：#4998 表明系统更新可轻易使 CLI 全面瘫痪，状态文件（`.mcp-writer.binding`）的生命周期管理是迫切的可靠性短板。
2. **MCP 认证是最大痛点**：OAuth 回调、token 刷新、探测请求等多类认证故障叠加，企业用户（Atlassian、ADO、Entra 环境）受影响最重。
3. **新版本回归风险**：1.0.87 引入的 MCP 工具目录校验回归（#5044）与 1.0.90 起的 OAuth 探测问题（#5014）提示升级需谨慎。
4. **BYOK 与多模型**：BYOK 场景的 reasoning effort 支持（#4012，已修复）和多模型路由的降级策略（#5042）表明社区在积极使用非默认模型，边缘场景兼容需求旺盛。
5. **沙箱网络**：Linux 沙箱 DNS（#5027）问题说明权限沙箱与宿主机环境隔离策略仍需打磨。

---
*本报告基于过去 24 小时 GitHub 公开数据自动汇总，供技术决策参考。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-10-04

## 📌 今日速览

今日无新版本发布，社区焦点集中在 **v2 稳定性**上：Windows 下托管服务被 45s 看门狗反复重启（#52049）、TUI 间歇性 OOM（#51761）以及"free tier can only be used from within OpenCode"错误在多个场景下的集中爆发是讨论最多的三大问题。同时，MCP 断线重连修复 PR（#52943）和一批被 automated-pr-cleanup 关闭的历史 PR 引发关注。

---

## 🔥 社区热点 Issues

**1. [BUG] Go 订阅支付成功但工作区显示 "Insufficient balance"**（评论 23，持续升温）
付费用户无法使用已购买的服务，直接影响商业信誉，issue 自 7 月挂起至今仍未解决。
[#37790](https://github.com/anomalyco/opencode/issues/37790)

**2. 免费层 "can only be used from within OpenCode" 错误（已关闭）**
该错误今日至少出现在 4 个不同 issue 中（#52899、#50627、#49723、#52880），已成为免费层最普遍的误伤问题——即使请求来自 OpenCode 内部也被拒绝，且与 policy deny、Bash-less 子代理等配置相关联。
[#52899](https://github.com/anomalyco/opencode/issues/52899) · [#50627](https://github.com/anomalyco/opencode/issues/50627) · [#52880](https://github.com/anomalyco/opencode/issues/52880)

**3. TUI 间歇性 OOM：24-28GB 内存耗尽**（评论 11）
内存以 500MB/s-1GB/s 线性增长、无 GC 锯齿，一分钟内吃满系统内存，无可靠复现路径，是 v2 最严重的资源类 bug。
[#51761](https://github.com/anomalyco/opencode/issues/51761)

**4. 60 分钟空闲 Location 驱逐打断运行中的会话**（评论 7）
挂起在 `question` 上的静默会话不产生持久事件，被驱逐后还会 SIGTERM 存活的后台 shell（关联 #51828、#52597），已形成 issue 簇。
[#51343](https://github.com/anomalyco/opencode/issues/51343)

**5. Compaction 忽略 `agents.compaction.model` 配置**
8 月"shared model request"重构后，v2 beta 压缩始终使用会话当前模型，静默无视用户配置，可能导致高成本模型被意外调用。
[#44094](https://github.com/anomalyco/opencode/issues/44094)

**6. Windows 下 45s 事件流看门狗反复杀死托管服务**
客户端主动杀掉服务导致所有进行中的会话/子代理中止，影响 Windows v2 用户日常使用。
[#52049](https://github.com/anomalyco/opencode/issues/52049)

**7. Code Mode 中 MCP 工具权限请求不在 TUI 显示，执行无限挂起**
不可见的权限询问导致静默阻塞，用户只能中断，属于交互层严重缺陷。
[#51223](https://github.com/anomalyco/opencode/issues/51223)

**8. `edit` 工具数值替换产生重复字符（最高 129 次）**
`640 → 900900` 这类静默数据损坏对代码编辑工具是致命风险，值得所有用户警惕。
[#53011](https://github.com/anomalyco/opencode/issues/53011)

**9. Go 订阅实际为账户级共享额度池，与文档"按模型独立限额"矛盾（已关闭）**
一个模型耗尽额度后所有付费模型（含零使用的）均不可用，涉及计费公平性。
[#52962](https://github.com/anomalyco/opencode/issues/52962)

**10. VS Code v2 扩展固定端口 4096 冲突**
每次窗口重载遗留孤儿服务器进程，下次打开面板即失败，扩展体验硬伤。
[#53020](https://github.com/anomalyco/opencode/issues/53020)

---

## 🔧 重要 PR 进展

**1. fix(mcp): 断线服务器带退避自动重连**（OPEN，今日新提交）
直接修复 #52237（macOS 睡眠唤醒后 MCP 永久 failed），是今日最重要的社区修复。
[#52943](https://github.com/anomalyco/opencode/pull/52943)

**2. fix(cli): 恢复 Linux x64 musl PTY lock 条目**（已关闭）
PTY 0.2.0 升级丢失了 lockfile 解析项，导致 v2 预览 CLI 构建失败，此 PR 快速补齐。
[#53035](https://github.com/anomalyco/opencode/pull/53035)

**3. feat(core): agent 可选用小模型处理轻量任务**
将 `Catalog.model.small()` 接入 session runner，为降低 token 成本提供机制，方向值得关注。
[#46989](https://github.com/anomalyco/opencode/pull/46989)

**4. fix: 恢复 Go 注册提示并停止免费层重试**
将 `FreeUsageLimitError` 视为配额耗尽而非 429，与当前免费层错误风暴直接相关。
[#46994](https://github.com/anomalyco/opencode/pull/46994)

**5. feat: 默认队列化跟进消息，Ctrl+Enter 转向**
修正了强制迁移到 steer 模式的问题，交互默认行为回归合理。
[#47004](https://github.com/anomalyco/opencode/pull/47004)

**6. feat(session-ui): 分组式 Add 菜单（含命令描述）**
输入框 `+` 菜单从平铺 4 项升级为分组结构，TUI 易用性改进。
[#47017](https://github.com/anomalyco/opencode/pull/47017)

**7. fix(core): 子代理任务执行与重启恢复逻辑统一**
消除"正常运行读最新 20 条消息、恢复时扫描全上下文"的定义分叉，降低重启行为偏差。
[#46944](https://github.com/anomalyco/opencode/pull/46944)

**8. fix(core): 通过事件终态化孤儿子执行声明**
修复重启恢复直接 SQL 清理不发布终态事件的问题，提升事件消费一致性。
[#46943](https://github.com/anomalyco/opencode/pull/46943)

**9. fix(core): provider 请求默认 5 分钟超时（响应头 + chunk 间隔）**
防止慢请求无限挂起，超时后走既有重试策略。
[#46917](https://github.com/anomalyco/opencode/pull/46917)

**10. fix: 保持 revert 一致性**
序列化 revert 变更与会话级 prompt 准入，修复多 issue（#37751、#44357）反馈的并发问题。
[#46974](https://github.com/anomalyco/opencode/pull/46974)

> ⚠️ 注：今日大量历史 PR 被 `automated-pr-cleanup` 机器人批量关闭（多为 9 月初的社区贡献），部分有价值的修复（如 #46974、#46989）可能需要重新提交。

---

## 📈 功能需求趋势

- **MCP 可靠性与生命周期**：断线重连（#52943）、按需懒启动 MCP 服务器（#53028）呼声高
- **上下文/额度透明度**：子代理内查看上下文窗口占比（#53024）、修改模型限额（#53005）、上下文消息编辑删除（#7712，👍13）
- **会话管理稳定性**：60m 驱逐机制引发的系列问题（#51343、#51828、#52597）
- **自定义 agent 与轻量模型路由**：customInstructions、小模型 opt-in 等 PR 反映社区对成本控制的需求

---

## ⚠️ 开发者关注点

1. **免费层误判是当前最大信任危机**：同一错误横跨 policy 配置、子代理、第三方路由等场景，建议官方发布统一根因说明
2. **v2 资源管理三宗罪**：OOM（#51761）、resize 监听器泄漏（#44055）、文件监听风暴（#50594）均指向事件/监听器生命周期管理
3. **Windows 支持仍为二等公民**：upgrade 路径、看门狗、端口管理问题密集
4. **`edit` 工具静默数据损坏**（#53011）建议用户在关键路径开启 diff 校验
5. **自动化 PR 清理过激**：有价值贡献被批量关闭，贡献者流程需关注

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-10-04

## 📌 今日速览

今日发布 nightly 版本 **v0.24.7-nightly.20261003**，包含 Code Mode 懒加载工具发现对齐与权限修复。Managed Agent 双路径架构仍是社区最热议题（#12380 讨论达 45 条评论），同时 @wensho 通过新的 e2e 模式集中暴露了一批并发与稳定性缺陷，形成多个 P1/P2 级 issue。

---

## 🚀 版本发布

**v0.24.7-nightly.20261003.2c591ecc08**
- `fix(core)`: Code Mode 文本与懒加载工具发现机制对齐（[PR #12990](https://github.com/QwenLM/qwen-code/pull/12990)，by @tanzhenxin）
- `fix(permissions)`: 修复已批准权限的生效问题

🔗 [Release 链接](https://github.com/QwenLM/qwen-code/releases)

---

## 🔥 社区热点 Issues

1. **[#12380](https://github.com/QwenLM/qwen-code/issues/12380)** — Managed Agent 双路径架构与分阶段交付提案（45 条评论，今日最热）。定义 Session 持久所有权、Workspace 绑定、可恢复工具执行等核心设计，是多 Agent 路线图的基石，仍需讨论。

2. **[#12028](https://github.com/QwenLM/qwen-code/issues/12028)** — 非对话上下文 token 治理追踪（18 条评论）。系统提示、工具 schema、`QWEN.md` 等每次请求都要付费重发，长上下文模型下开销远超对话本身，是 token 性能路线的核心 umbrella。

3. **[#12737](https://github.com/QwenLM/qwen-code/issues/12737)** — ACP 桥 Stage B：Legacy 与 Managed 引擎配对宿主集成（15 条评论），明确了本地 `qwen serve` Managed 执行优先级靠后的调度决策。

4. **[#12333](https://github.com/QwenLM/qwen-code/issues/12333)** — token 优化缺少召回率/任务成功率门控。指出只测“省了多少”不测“损失了什么”，在此之前最大的 token 节省不能负责任地开启，是质量保障的关键缺口。

5. **[#10887](https://github.com/QwenLM/qwen-code/issues/10887)** — **P1**：重复工具错误不提前终止，会话在死胡同循环中烧掉 5-14M token。生产级严重问题，持续跟踪中。

6. **[#13333](https://github.com/QwenLM/qwen-code/issues/13333)** — **P1**：≥8 并发 Turn 在模型应答后卡死（store 路径锁护航）。由新 e2e 分页模式二分定位发现，影响多 Session 服务化场景。

7. **[#13327](https://github.com/QwenLM/qwen-code/issues/13327)** — **P1**：coordinator 单独崩溃会卡住 in-flight Turn，尽管 Harness 存活，可确定性复现。

8. **[#13004](https://github.com/QwenLM/qwen-code/issues/13004)** — 自动记忆提取 no-op 后增加冷却窗口，避免每轮成功对话后都 fork 无效提取器，已 ready-for-human。

9. **[#13249](https://github.com/QwenLM/qwen-code/issues/13249)** — **已关闭**：nightly CodeQL 扫描静默失败问题。曾连续 13 次超时被取消且显示为绿色，现已修复，暴露了 CI 可观测性盲区。

10. **[#13309](https://github.com/QwenLM/qwen-code/issues/13309)** — Markdown 流式分割器把行内 fence 标记误判为代码块，导致渲染错乱，对应的修复 PR（#13329）当天已提交。

---

## 🔧 重要 PR 进展

1. **[#13291](https://github.com/QwenLM/qwen-code/pull/13291)** — **M5b 里程碑**：本地 Runtime 工具结果持久化，调用前即发布最终参数与工具定义，是 Managed 引擎可靠性的关键一步。

2. **[#13168](https://github.com/QwenLM/qwen-code/pull/13168)** — Hosted Turn 获取 Workspace 项目上下文（`QWEN.md`/`AGENTS.md`），Safe mode 保持启用。

3. **[#13314](https://github.com/QwenLM/qwen-code/pull/13314)** — SDK Java Hosted Harness 合并后补齐 11 项 Critical 评审发现，覆盖全部 62 个开放评审线程。

4. **[#13342](https://github.com/QwenLM/qwen-code/pull/13342) / [#13346](https://github.com/QwenLM/qwen-code/pull/13346)** — Web Shell managed session 的 R2 评审跟进：修复 2 项 Critical UI 缺陷 + 补齐 9 处测试缺口。

5. **[#13299](https://github.com/QwenLM/qwen-code/pull/13299)** — models.dev 目录同时以点号/横杠 id 作为 key，修复 qwen/glm/doubao 带点版本号模型匹配不到条目的问题（对应 #13209）。

6. **[#13329](https://github.com/QwenLM/qwen-code/pull/13329)** — Markdown fence 检测锚定行首，修复流式渲染中行内代码被误切分的问题。

7. **[#13337](https://github.com/QwenLM/qwen-code/pull/13337)** — Feishu 入站文件写入失败时保留文本降级发送并清理临时目录（对应 #13334）。

8. **[#13267](https://github.com/QwenLM/qwen-code/pull/13267)** — 路径条件规则被驱逐后在提醒消失时重新注入，保证多文件扫描中 `.qwen/rules` 持续生效。

9. **[#13296](https://github.com/QwenLM/qwen-code/pull/13296)** — 受保护的输出收集候选退避至 24 小时重查，减少无效重试压力。

10. **[#13293](https://github.com/QwenLM/qwen-code/pull/13293)** — 原子替换 settings 文件时保留原 POSIX 权限位，即使 umask 更严格，安全加固。

---

## 📈 功能需求趋势

- **Managed Agent / 多 Session 服务化**（最热）：Session 持久所有权、Workspace 并发排队（#13328）、前台 Shell profile 准入（#13271）、混合版本接管（#13320）——围绕 daemon + `qwen serve` 的托管架构进入密集打磨期。
- **Token / 上下文性能治理**：非对话上下文开销、输出钳制（#13252）、模型目录规范化（#13209/#13238）、探索循环预算（#13321）。
- **Web Shell / Desktop 体验**：键盘快捷键（#13175）、计划审批 Markdown 渲染（#13340）、托管会话 UI 正确性。
- **平台分发扩展**：Android Phase 2 回归覆盖与导出 UX（#13111）、飞书集成修复。
- **安全与信任**：sandbox 设置加固（#12417）、workspace-trust 授权（#13186）、文件权限保留。

---

## ⚠️ 开发者关注点

- **Token 烧钱失控仍是最大痛点**：死胡同循环烧 5-14M token（#10887）尚无终局方案，社区强烈呼吁循环终止机制。
- **并发与稳定性短板集中暴露**：≥8 并发 Turn 锁护航卡死（#13333）、coordinator 崩溃 wedging（#13327），服务化部署前的必修课。
- **静默失败缺乏可观测性**：CodeQL 连续 13 次静默超时（#13249）、混合版本 503 错误不透明（#13320），CI 与运行时告警是共性诉求。
- **评审流程负担重**：大量“5 轮评审后合并、遗留项单开 issue/PR 跟进”的模式（#13275、#13345），说明 Review bot 规则与交付节奏间存在张力。
- **配置继承陷阱**：同 provider 切模型时 `contextWindowSize` 等字段意外继承（#13338），小上下文用户易被 4K 输出下限（#13252）击穿。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*