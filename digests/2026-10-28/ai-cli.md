# AI CLI 工具社区动态日报 2026-10-28

> 生成时间: 2026-10-27 23:44 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告 · 2026-10-28

---

## 1. 生态全景

AI CLI 工具已从单纯的终端编码助手演进为**多形态（CLI/TUI/桌面/Web/移动）、多 Agent 架构**的开发平台，竞争焦点转向企业级能力（SSO/治理/沙箱）与可编程扩展性（插件/ACP 协议/MCP）。头部产品（Claude Code、Codex）迭代速度极快但伴随明显回归风险，追赶者（OpenCode、Qwen Code）通过插件生态和托管 Agent 架构寻求差异化。同时，**MCP 资源泄漏、限额透明度、更新可控性**等工程化问题成为全行业的共性债务。

---

## 2. 各工具活跃度对比

| 工具 | 今日热点 Issues | 重要 PR | Release | 核心动态 |
|---|---|---|---|---|
| **Claude Code** | 10（含 👍64 隐私 Issue） | 3 | v2.1.312 | 企业 OIDC 增强；桌面端投诉集中 |
| **OpenAI Codex** | 10（1 条长期 Issue 关闭） | 10+ 均合入 | rust-v0.165.0 + 0.166.0-alpha.3 | Vertex AI provider、exec-server 架构拆分 |
| **Gemini CLI** | 10（3 条 P1） | 10（多为外部贡献者） | v0.66.0 + v0.67.0-preview.0 | Agent 可观测性修复、CJK/终端渲染 |
| **Copilot CLI** | 10（44 条更新） | 0 | v1.0.104 → 105-1（3 版） | Fusion 模型选择修复；ACP 缺口集中暴露 |
| **OpenCode** | 10 | 10 | v2.2.0 | 桌面插件系统上线 |
| **Qwen Code** | 10（1 条 72 评论提案） | 10 | v0.26.2 + 0.26.3-preview.0 + SDK | Managed Agent 架构、Java 内嵌 |
| **Kimi Code CLI** | 0 | 0 | 无 | 无活动 |

> 注：表中 Issues/PR 为日报列入的重点条目数，非全量。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **会话归档/恢复管理** | Claude Code (#67835)、Copilot CLI (#3518)、Qwen Code (PR #15557) | 三家不约而同被要求“取消归档/找回会话”，长周期工作流数据安全是共性痛点 |
| **MCP 进程资源泄漏** | Codex (#40579)、OpenCode (#52965)、Gemini CLI (#24246 工具数上限) | 重度 MCP 集成场景下进程堆积、内存暴涨、API 400，子系统资源管理普遍不成熟 |
| **更新/配置可控性** | Claude Code (#104422 强制重启)、Codex (多版本回归)、Copilot CLI (#1869 配置不持久)、Qwen Code (发布链路中断) | 企业用户要求可控更新时机、配置“看似生效实则失效”的信任问题 |
| **多 Agent / 子 Agent 编排** | Codex (PR #57586 子线程 API)、Gemini CLI (subagent 系列问题)、OpenCode (#52795、并发限制)、Qwen Code (#12380 双路径架构) | 全行业主战场：子 Agent 上下文继承、并发控制、结果上报可靠性 |
| **限额/成本透明度** | Codex (#55348 限额异常)、OpenCode (#52894 重置时间)、Copilot CLI (BYOK 429) | 用户要求 per-run 成本可见、限额计算可解释 |
| **Windows / 跨平台质量** | Codex (6/10 Issues 涉 Windows)、Copilot CLI (WSL2 崩溃)、Gemini CLI (Wayland/Termux) | Windows 一致性地成为各工具的 bug 重灾区 |

---

## 4. 差异化定位分析

- **Claude Code**：功能最全面但重心转向**企业与大厂集成**（OIDC/Entra ID、GitHub/Cowork 云端），桌面端体验是当前短板；隐私合规问题（邮箱注入提示词）对政企用户是采用障碍。
- **OpenAI Codex**：**架构工程化最深**——独立 exec-server、动态工具替换、V2 子线程 API，明显在为宿主嵌入和 subagent 编排打地基；多 provider（GCP）路线开放。但 Windows 质量、限额回归、扩展分发滞后消耗用户信任。
- **Gemini CLI**：**社区贡献最开放**（今日多数修复来自外部贡献者），聚焦终端保真度（CJK、emoji、resize）和 Agent 可靠性；AST 感知工具链提案代表 token 效率的技术探索方向。
- **Copilot CLI**：绑定 **GitHub 生态**（Org Agent、Mobile 同步），Fusion/Auto 模型路由是特色；但 ACP 协议能力长期落后于交互式 CLI，BYOK 灵活性是最大短板（#3709 仅 34 👍 即为最高票，反映基数与诉求错位）。
- **OpenCode**：**开源+插件生态**路线最激进，v2.2.0 桌面 GUI 插件是全行业首创方向；但数据完整性（SQLite/edit 重复写入）问题需警惕。
- **Qwen Code**：唯一深耕**企业集成纵深**（Java/JVM 内嵌、serve 托管模式、多 Agent Team），面向中国生态与私有化部署；CI/发布基础设施债务是当前瓶颈。
- **Kimi Code CLI**：24 小时零活动，生态活跃度显著落后。

---

## 5. 社区热度与成熟度

| 维度 | 判断 |
|---|---|
| **最活跃社区** | Codex（常青 Issue 209 👍、PR 高产）、Qwen Code（单提案 72 评论，路线图讨论参与度极高） |
| **迭代最快** | Copilot CLI（一日 3 版）、Qwen Code（一日 CLI+SDK 多版）、Codex（alpha 快速推进） |
| **最开放协作** | Gemini CLI（外部贡献者贡献今日多数 PR）、Qwen Code（PR 均带社区作者署名） |
| **成熟度最高** | Claude Code（功能覆盖与企业能力领先，但处于“功能多→回归多”的成熟期阵痛） |
| **风险信号** | Claude Code 多个长期 Issue 被 stale 关闭引发社区不满；OpenCode/Kimi 活跃度与头部差距拉大 |

---

## 6. 值得关注的趋势信号

1. **从 CLI 到“可嵌入运行时”**：Codex 的 exec-server 拆分、Qwen Code 的 Java 内嵌、Gemini 的 ACP 改进——AI CLI 正在成为 IDE/宿主应用的**嵌入式 Agent 引擎**，独立终端工具的形态边界正在消解。
2. **安全护栏可靠性成为企业采用门槛**：Copilot CLI preToolUse 钩子被静默绕过、Claude Code PII 注入——**“配置了但不生效”的安全机制比没有更危险**，选型时应实测验证（尤其是并行工具调用场景）。
3. **回归频发 vs 发布节奏**：所有快速迭代的工具都出现“更新引入回归”（Codex 4 个版本、Claude Code sandbox、Copilot 语音）。**开发者应固定版本、保留回退路径**，避免盲跟最新版。
4. **多 Agent 是确定性方向，但可靠性尚未跟上**：三家以上工具的子 Agent 存在挂起、误报成功、上下文不继承问题——生产环境使用多 Agent 编排需自建结果校验层。
5. **限额/成本可观测性是付费用户下一轮诉求焦点**：跨工具集中爆发，预示“agent 用量计量与预算控制”可能成为新的产品差异化能力。

**选型建议速览**：企业 SSO/合规优先 → Claude Code（但需评估隐私 Issue）；架构集成/多 provider → Codex；开源自托管+插件 → OpenCode；Java/私有化生态 → Qwen Code；深度 GitHub 绑定 → Copilot CLI（注意 ACP 与 BYOK 限制）。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截至 2026-10-28）

## 一、热门 Skills 排行（PR）

1. **mcp-builder 兼容性修复**（#1742, OPEN）
   修复 `mcp>=2.0.0` 中 `streamable_http_client` 重命名及自定义 Header 传递方式变更，是 MCP 生态升级的关键适配。
   https://github.com/anthropics/skills/pull/1742

2. **skill-creator 触发评测隔离修复**（#1298, OPEN）
   解决评测误报（Windows select() 失败、worker 竞争、运行时错误被误判为非触发），直指社区最痛的 Skill 触发评测可靠性问题。
   https://github.com/anthropics/skills/pull/1298

3. **md2video-audio**（#1703, OPEN）
   零成本将 Markdown 编译为带真人配音的 MP4 视频，内容创作方向的高关注度新增 Skill。
   https://github.com/anthropics/skills/pull/1703

4. **document-typography**（#514, OPEN）
   解决 AI 生成文档的孤行、寡段、编号错位等排版问题，“用户不会主动要求但影响所有输出”的典型需求。
   https://github.com/anthropics/skills/pull/514

5. **Pyxel 复古游戏开发**（#525, OPEN）
   由 Pyxel 作者本人提交，覆盖游戏实现、无头运行验证与帧检查，挂起半年多仍活跃更新。
   https://github.com/anthropics/skills/pull/525

6. **webapp-testing 安全加固**（#1980, OPEN）
   消除 `shell=True` 导致的命令注入风险（CWE-78），与 #1976 元素识别修复同属 webapp-testing 的持续打磨。
   https://github.com/anthropics/skills/pull/1980

7. **docx 修订处理修复**（#1792, OPEN）
   LibreOffice 超时不再误报成功，并校验输出 DOCX 无残留修订标记，配合 #1734（孤儿批注检测）完善文档技能链。
   https://github.com/anthropics/skills/pull/1792

8. **proofcore-contract-auditor**（#1771, OPEN）
   Solidity/Rust 智能合约静态分析 + TON 链上审计存证，Web3 方向的新尝试。
   https://github.com/anthropics/skills/pull/1771

## 二、社区需求趋势（Issues）

- **信任与分发机制**：#492（46 条评论，最热）指出社区 Skill 冒用 `anthropic/` 命名空间构成信任边界漏洞；#228（17 条评论）呼吁组织内 Skill 共享库。
- **评测与触发可靠性**：#556（13 条评论）反映 `run_eval.py` 触发率为 0%，说明 Skill 触发评测是普遍痛点。
- **Agent 记忆与治理**：#1329（compact-memory 紧凑记忆表示法）、#412（agent-governance）、#1385（三段式推理质量门）——社区正探索 Agent 长时运行状态管理与质量管控。
- **文档处理健壮性**：#189（插件重复安装）、#2018（merge_runs.py 破坏 XML 命名空间）、#1792/#1734 均指向 docx/pdf 文档技能的稳定性需求。
- **上下文效率**：#1487 指出 claude-api Skill 一次性注入 ~156k token 耗尽上下文窗口；#202 批评 skill-creator 文档冗长浪费 token。
- **质量细节**：#1868（渐变色差一错误）、#2064（description 缺少“何时使用”），显示社区对 Skill 元数据规范与实现精度的要求提升。

## 三、高潜力待合并 Skills（活跃 OPEN PR）

| PR | 内容 | 活跃信号 |
|---|---|---|
| #525 Pyxel | 复古游戏开发 | 创建 8 个月、10 月下旬仍在更新 |
| #1298 skill-creator 评测修复 | 触发评测隔离与跨平台 | 对应高热度 Issue #556 |
| #1742 mcp-builder | MCP v2 适配 | 关联 Issue #1668，修复主流生态 |
| #1681 skill-creator | package_skill.py 独立执行修复 | 10 月下旬仍有活动 |
| #1997 skill-creator | YAML frontmatter 解析修复 | 10 月持续讨论 |
| #1245 Notion spec 转实现 | 规格文档 → Notion 任务分解 | 10 月中旬更新，工作流自动化方向 |

## 四、生态洞察

**当前社区最集中的诉求是：建立可信的 Skill 分发与共享机制（命名空间治理、组织级共享），同时系统性修复既有 Skills（尤其 skill-creator 评测链路与文档技能）的可靠性、安全性与 token 效率问题**——即生态已从“数量增长”转入“质量与治理”阶段。

---

# Claude Code 社区动态日报 · 2026-10-28

## 1. 今日速览

Claude Code 发布 **v2.1.312**，新增企业网关 OIDC 用户声明配置（支持 Microsoft Entra ID）及全屏模式下“点击发送”排队消息的交互优化。社区方面，桌面端体验成为投诉焦点：自动更新强制重启并归档活跃会话、GitHub 集成“显示已连接但无法访问仓库”等问题持续发酵。隐私类 Issue（账号邮箱被注入系统提示词）以 64 个 👍 成为呼声最高的未决问题。

---

## 2. 版本发布

### v2.1.312
- **企业 SSO 增强**：网关新增 `oidc.user_id_claim` 配置项，支持通过 `sub` 以外的 id_token 声明（如 Microsoft Entra ID 的 `oid`）识别用户身份。
- **交互优化**：全屏模式下，点击排队消息下方的 "to send now" 提示即可立即发送，与对应快捷键行为一致。

---

## 3. 社区热点 Issues

| # | Issue | 关注度 | 重要性 |
|---|-------|--------|--------|
| 1 | [#102273](https://github.com/anthropics/claude-code/issues/102273) 桌面端 Code 标签页回合结束后的“下一步建议框”干扰正常对话 | 👍51 / 💬24 | UI 打扰性问题，热度第一，用户普遍希望可关闭 |
| 2 | [#81138](https://github.com/anthropics/claude-code/issues/81138) 账号邮箱（PII）未经同意注入系统提示词 | 👍64 / 💬19 | **隐私合规风险**，点赞最多，涉及数据披露问题 |
| 3 | [#84581](https://github.com/anthropics/claude-code/issues/84581) Cowork 云端会话无法访问 GitHub 仓库，git 代理指示调用不存在的 `add_repo` 工具 | 💬13 | 云端工作流核心阻断，且引导 Agent 调用幻觉工具 |
| 4 | [#100164](https://github.com/anthropics/claude-code/issues/100164) GitHub 集成显示全绿但 Cowork 无法访问仓库 | 💬3 | 与 #84581、#98956 同类，说明是系统性问题 |
| 5 | [#103005](https://github.com/anthropics/claude-code/issues/103005) 自动更新重启会归档活跃 Remote Control 会话且不恢复 | 💬3 | 移动端远程控制场景被直接打断，数据“消失”体验差 |
| 6 | [#95455](https://github.com/anthropics/claude-code/issues/95455) sandbox `excludedCommands` glob 修复引入回归，`git -C` 等带前置 flag 的命令被误拦截 | 💬8 / 💬13 | 有复现步骤的回归 Bug，影响 sandbox 用户的 git 工作流 |
| 7 | [#67835](https://github.com/anthropics/claude-code/issues/67835) 会话归档是单向操作，无 unarchive 工具和归档视图 | 💬15 / 💬13 | 归档会话成“孤儿”，长开且持续收到讨论 |
| 8 | [#104422](https://github.com/anthropics/claude-code/issues/104422) 桌面端一天内 4 次自动更新重启，要求用户可控更新时机 | 💬1 | 企业/工作场景强需求，与 #103005 叠加 |
| 9 | [#97368](https://github.com/anthropics/claude-code/issues/97368) macOS 桌面端回合完成通知仅间歇性触发 | 💬4 | 通知可靠性问题，影响异步工作流用户 |
| 10 | [#105252](https://github.com/anthropics/claude-code/issues/105252) 子 Agent 不继承 `~/.claude/AGENTS.md` 上下文 | 💬2 | 新提出，涉及全局规则生效范围，影响多 Agent 一致性 |

---

## 4. 重要 PR 进展

> 今日仅 3 个 PR 有更新，全部列出：

1. **[#105303](https://github.com/anthropics/claude-code/pull/105303)**（已关闭）— `claude-code-plugins` 市场改为从 claude-plugins-official 安装全部插件，统一插件分发源。注意合并顺序依赖上游 PR #6905/#6906。
2. **[#15620](https://github.com/anthropics/claude-code/pull/15620)**（开放）— 修复 plugin-dev 示例中 `tools:` / `allowed-tools:` 使用 JSON 数组导致被当作字面字符串的问题，统一为 YAML 逗号格式，涉及 11 个文件。
3. **[#32753](https://github.com/anthropics/claude-code/pull/32753)**（开放）— 批量修复仓库内过期文档 URL，将 `docs.anthropic.com` / `docs.claude.com` 迁移至 `code.claude.com`（26 处改动）。

---

## 5. 功能需求趋势

- **桌面端可控性与状态保持**（最强烈）：自动更新时机可控（#104422）、重启后会话恢复（#103005）、会话取消归档（#67835）。
- **GitHub / 云端集成可靠性**：多个 Issue 报告“连接状态绿但无法访问”，Cowork 云端会话与企业工作流集成是高频需求。
- **UI 可配置性**：减少打扰性元素（建议框 #102273）、语音听写交互改进（#88355）。
- **终端协议与互操作**：支持 kitty clipboard 协议（OSC 5522）实现 SSH 粘贴图片（#105520）；插件希望接管 AbovePrompt 折叠带（#98986）。
- **企业安全与身份**：多 Google 账号 Connector（#105526）、`apiKeyHelper` 传 token 认证（#89937）——今日 v2.1.312 的 OIDC 配置正好回应了企业身份方向。

---

## 6. 开发者关注点

1. **隐私与合规**：邮箱 PII 注入系统提示词（#81138，👍64）长期未解决，企业用户需重点关注。
2. **自动化工作流被随机打断**：Windows 端 Chrome 扩展工具调用抢占焦点（#89148）、桌面端更新强制重启——后台/自动化场景的稳定性是痛点。
3. **配置漂移**：effortLevel 设置被忽略（#104336）、bypassPermissions 下权限弹窗仍出现（#82662），配置项“看似生效实则失效”的信任问题。
4. **Sandbox 回归风险**：#95455 表明 glob 修复可能破坏合法命令，建议 sandbox 用户升级前验证 git 别名/flag 用法。
5. **可观测性缺失**：Hook 执行失败无诊断信息（#88830）、安全分类器误判无回退（#83245）——错误静默化让排查成本高。
6. **多个长期 Issue 被标记 stale 关闭**，社区对 stale 机制处理积压问题的方式存在隐忧。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-28

## 📌 今日速览

Codex 发布 **rust-v0.165.0** 正式版，新增 Google Cloud Vertex AI 内置 provider 与 GPT-6.1 Terra 模型目录；同时 **0.166.0 已推进至 alpha.3**。社区方面，VS Code 扩展无法启动 UI 的问题（v26.1021.22027）成为今日最热话题，Windows 平台 bug 依旧集中爆发；PR 侧由 copyberry bot 高产合入，涵盖独立 `codex-exec-server`、文献搜索、动态工具替换等多个架构级改进。

---

## 🚀 版本发布

### rust-v0.165.0（正式版）
- **内置 Google Cloud Vertex AI provider**：通过 `model_provider = "gcp"` 直接配置（#56265）
- **GPT-6.1 Terra 加入模型目录**（#57337）
- 会话选择器新增仓库过滤、agent 命令中心新增目录分组，多项目导航体验提升

### 0.166.0 预发布线
- alpha.1 / alpha.2 / alpha.3 连续推进，正式版发布在即

---

## 🔥 社区热点 Issues（Top 10）

1. **[#37458](https://github.com/openai/codex/issues/37458) [CLOSED] Windows 扩展无法加载资源** — 58 条评论、持续近 3 个月的 Windows 头号问题今日关闭，Windows 用户体验痛点得到回应。

2. **[#17827](https://github.com/openai/codex/issues/17827) [OPEN] 可定制状态栏** — 209 👍、55 评论的常青功能请求，社区持续对标 Claude Code 的 shell 脚本状态栏能力，呼声极高。

3. **[#52873](https://github.com/openai/codex/issues/52873) [OPEN] dot 无法读取用户创建的 Codex 线程** — "unsupported placement format version" 后端错误，29 条评论，dot 与 Codex 线程互操作性存在硬伤。

4. **[#39678](https://github.com/openai/codex/issues/39678) [OPEN] Android→macOS Remote "No project" 信任错误** — 21 条评论，Remote 跨端场景的任务信任机制问题仍未解决。

5. **[#56264](https://github.com/openai/codex/issues/56264) [OPEN] Windows 更新后线程无法恢复（缺 SYSTEMROOT）** — 沙箱 MXC 启动器环境变量被裁剪导致，19 条评论，属更新引入的典型回归。

6. **[#54956](https://github.com/openai/codex/issues/54956) [OPEN] Plus 用量效率与低成本模型实验** — 反映订阅用户对限额消耗速度的普遍不满，与 #55348、#56669 共同构成“限额回归”话题集群。

7. **[#55348](https://github.com/openai/codex/issues/55348) [OPEN] GPT-6 Astra High/Fast 一天耗尽周限额** — 限额计费疑似回归，Prolite 用户实测数据详实，值得官方澄清。

8. **[#57032](https://github.com/openai/codex/issues/57032) / [#57344](https://github.com/openai/codex/issues/57344) [OPEN] VS Code 扩展 v26.1021.22027 UI 启动失败** — Linux 与 Windows 均复现，回退到 26.1007.21434 可恢复，今日新报，或与 #37458 同源。

9. **[#40579](https://github.com/openai/codex/issues/40579) [OPEN] Windows MCP 进程堆积** — 5 个 MCP server 下仍复现进程累积与清理不完整，长期资源泄漏问题。

10. **[#35549](https://github.com/openai/codex/issues/35549) [OPEN] Chrome Browser Use 误拦截已授权页面** — 安全检查策略过于保守，影响 Computer Use 实际可用性。

---

## 🔧 重要 PR 进展（Top 10，均已 CLOSED/合入）

1. **[#57589](https://github.com/openai/codex/pull/57589) + [#57590](https://github.com/openai/codex/pull/57590) 独立 `codex-exec-server` 可执行文件** — 抽取执行器为独立二进制并随 CLI/app-server 包分发，架构拆分的重要一步。

2. **[#57586](https://github.com/openai/codex/pull/57586) 宿主保留的 V2 子线程创建 API** — `CodexThread::create_child`，为 subagent/子任务编排打基础。

3. **[#57553](https://github.com/openai/codex/pull/57553) 模型步间替换动态工具** — 无需开启新 turn 即可替换工具目录，增强宿主对工具集的运行时控制。

4. **[#57542](https://github.com/openai/codex/pull/57542) 模型门控的文献搜索** — 在独立 `web.run` 中暴露 `literature_search_query`，按模型能力门控开放。

5. **[#57584](https://github.com/openai/codex/pull/57584) token 截断时保留输出边界** — 截断后仍能精确定位 item 与 UTF-8 边界，长上下文处理的关键改进。

6. **[#57569](https://github.com/openai/codex/pull/57569) 背压下保留进程输出与控制回复** — 修复慢消费者丢失输出/阻塞回复的问题，稳定性提升。

7. **[#57567](https://github.com/openai/codex/pull/57567) 允许覆盖内置 OpenAI provider 的模型目录 URL** — 与 0.165.0 的 GCP provider 呼应，企业自建模型目录成为可能。

8. **[#57568](https://github.com/openai/codex/pull/57568) 内存整合服务等级独立配置** — 后台 memory consolidation 可单独指定 tier（默认 Standard），降低隐性高成本。

9. **[#57585](https://github.com/openai/codex/pull/57585) 替换模型请求中不可用的图片引用** — 图片在 turn 之间失效时自动替换，历史记录保留原始引用。

10. **[#57564](https://github.com/openai/codex/pull/57564) Vim 寄存器保留富文本 composer 内容** — mention、图片路径、折叠粘贴在复制/删除时不丢失，编辑器体验细节打磨。

> 其他值得注意：#57584 输出边界、#57573 免文件系统的 patch 命令拦截分类、#57563 HTTP 响应流内存优化。

---

## 📈 功能需求趋势

1. **用量透明与成本控制**（最强烈）：限额消耗异常（#55348、#56669）、per-run 成本回执（#53113）、Plus 用量效率（#54956）扎堆出现。
2. **TUI/CLI 体验对标 Claude Code**：可定制状态栏（#17827，209 👍）、Kitty 图形终端识别（#57541）。
3. **多 provider / 新模型支持**：GCP provider、GPT-6.1 Terra 已落地，社区期待更多第三方接入。
4. **Computer Use / Browser Use 可靠性**：截图超时（#52754）、策略误拦（#35549、#45990、#54248）。
5. **跨设备 Remote（Android/desktop）稳定性**：#39678、#47148。

---

## ⚠️ 开发者关注点（痛点总结）

- **Windows 是 bug 重灾区**：今日 Top 10 Issues 中 6 条涉及 Windows（沙箱环境变量、任务栏遮挡、MCP 泄漏、扩展启动失败）。
- **扩展分发渠道滞后**：Open VSX 版本长期落后且 Windows 包缺失（#32499、#39476），影响 Cursor/Windsurf 用户。
- **更新引入回归频发**：0.148/26.810/26.930/26.1021 多个版本均有回归报告，升级前建议关注 release notes 与回退路径。
- **MCP 子系统资源管理**：进程堆积、stdio runtime 未释放（#40579、#38247），重度 MCP 用户受影响明显。

---

*数据来源：github.com/openai/codex ｜ 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-28）

## 📌 今日速览

Gemini CLI 今日发布了 **v0.67.0-preview.0** 和 **v0.66.0** 稳定版，修复了配额错误分类和 MCP 权限请求元数据问题。社区 PR 活跃度显著提升，多项由外部贡献者提交的 Unicode/终端渲染修复和 VSCode 扩展修复被合并。Agent 子系统（subagent 挂起、错误成功上报）仍是 Issue 跟踪的重点领域。

---

## 🚀 版本发布

### [v0.66.0](https://github.com/google-gemini/gemini-cli/releases)（稳定版）
- 更新 ROADMAP.md，移除过时的 2025 路线图
- 包含 v0.65.0 系列累积变更

### [v0.67.0-preview.0](https://github.com/google-gemini/gemini-cli/releases)
- v0.66.0 changelog 及版本管理更新

### [v0.67.0-nightly.20261027](https://github.com/google-gemini/gemini-cli/releases)
- **fix(core)**: 将项目消费上限（spending cap）错误归类为终端配额错误
- **fix(acp)**: 权限请求中包含 MCP server 和工具元数据

---

## 🔥 社区热点 Issues（Top 10）

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — Subagent 触达 MAX_TURNS 后误报 `success`/`GOAL` 状态，掩盖了实际中断。**P1 级**，13 条评论，误导性成功状态对可观测性影响重大。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — Generalist agent 无限挂起，简单如创建文件夹的操作也会卡死一小时。**P1 级**，8 👍，是用户呼声最高的稳定性问题。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — 提议利用 Gemini 3 模型的原生 bash 能力，结合零依赖 OS 沙箱和执行后意图路由。大型增强提案，9 条评论，代表 agent 执行架构的演进方向。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — 评估 AST 感知的文件读取/搜索/代码库映射，可减少 token 浪费和误对齐读取。关联 #22746、#22747 形成系列调研。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — 模型几乎不主动使用自定义 skills 和 subagents，需显式指令才触发。反映 agent 调度策略的短板。

6. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — 工具数超过 128 时触发 API 400 错误，agent 缺乏工具范围智能限制。重度 MCP 用户的核心痛点。

7. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** — Browser Agent 完全忽略 `settings.json` 配置覆盖（如 maxTurns），AgentRegistry 读取正确但未生效。

8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — **P1 级**：browser subagent 在 Wayland 下失败，Linux 桌面用户的阻断性问题。

9. **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)** — 模型在随机目录散落临时脚本，污染工作区、增加提交清理成本。

10. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** — **P1 级**：get-shit-done output hook 在输出用户摘要时导致 CLI 崩溃。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#29989](https://github.com/google-gemini/gemini-cli/pull/29989)** — 修复多处错误的 `\n` 转义行为，此前会损坏字符串字面量、正则和代码块中的合法转义序列（对应 Issue #22466）。

2. **[#29904](https://github.com/google-gemini/gemini-cli/pull/29904)** — 终端宽度变化时限制内联历史重渲染的工作量，缓解 resize 卡顿（对应 Issue #21924）。

3. **[#29905](https://github.com/google-gemini/gemini-cli/pull/29905)（已合并）** — 处理将 East Asian Ambiguous 字符渲染为宽字符的终端（macOS Terminal.app、iTerm2、VTE 等），CJK 用户利好。

4. **[#29982](https://github.com/google-gemini/gemini-cli/pull/29982)** — `supportsMultimodalFunctionResponse` 识别带点号的 Gemini 3 模型名（如 `gemini-3-pro-preview`），修复模型能力误判。

5. **[#29980](https://github.com/google-gemini/gemini-cli/pull/29980)** — 新增 `gemini extensions validate <path>` 命令，安装/发布前校验扩展清单（含 context 文件路径安全检查）。

6. **[#29987](https://github.com/google-gemini/gemini-cli/pull/29987)** — 规范化 `@` 文件自动补全中的前导斜杠，支持 `@/src` 根相对路径引用。

7. **[#29993](https://github.com/google-gemini/gemini-cli/pull/29993)** / **[#29965](https://github.com/google-gemini/gemini-cli/pull/29965)（已合并）** — 修复 UTF-16 代理对截断问题，emoji 不再在截断时丢失或渲染异常。

8. **[#29988](https://github.com/google-gemini/gemini-cli/pull/29988)（已合并）** / **[#29994](https://github.com/google-gemini/gemini-cli/pull/29994)** — 修复 VSCode 扩展中因冗余括号导致的 Disposable 泄漏，`gemini.diff.accept` 等命令此前未被正确注册。

9. **[#29973](https://github.com/google-gemini/gemini-cli/pull/29973)** — 取消 `replace`/`write_file` 后仍可能覆写目标文件，现在在写入前重新检查取消状态。

10. **[#29884](https://github.com/google-gemini/gemini-cli/pull/29884)（已合并）** — 允许 Android/Termux 环境下解析系统安装的 ripgrep，`grep_search` 移动端可用性提升。

> ⚠️ 值得注意：[#29984](https://github.com/google-gemini/gemini-cli/pull/29984) 试图通过 `preinstall` 脚本在 CI 日志中打印 `GEMINI_API_KEY` 前缀，疑似密钥泄露探测，建议维护者关注。

---

## 📈 功能需求趋势

- **Agent 子系统强化**（占今日活跃 Issue 的绝大多数）：subagent 可靠性（挂起、误报成功）、skills 主动调度、并行 subagent 协作与共享内存（#18287）
- **AST 感知工具链**：通过 AST-aware 读取/搜索（ast-grep、tilth、glyph）降低 token 消耗（#22745 系列、#19561）
- **任务追踪持久化**：用基于文件的 CRUD 任务追踪替换 in-context 的 WriteToDo，对抗 context rot（#18836、#21000）
- **安全与沙箱**：零依赖 OS 沙箱、破坏性命令防护（#19873、#22672）
- **浏览器自动化**：会话接管、锁恢复、配置覆盖生效（#22232、#22267）
- **多平台兼容**：Wayland、Termux/Android 支持

---

## ⚠️ 开发者关注点

1. **Agent 可观测性缺口**：subagent 中断被误报为成功、`/bug` 报告不含 subagent 上下文（#22323、#21763），排查问题困难
2. **挂起与稳定性**：generalist agent 无限挂起、交互式提示卡死（#21409、#22465）、hook 导致崩溃（#22186）
3. **工具数量上限**：>128 个 MCP 工具直接 400 报错，重度集成场景受阻（#24246）
4. **工作区卫生**：临时脚本散落各处，清理成本高（#23571）
5. **终端渲染细节**：CJK 宽字符、emoji 代理对、resize 闪烁等问题在本轮 PR 中集中修复，说明终端兼容性仍是高频痛点

---

*数据来源：github.com/google-gemini/gemini-cli | 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-28** | 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)

---

## 1. 今日速览

过去 24 小时 Copilot CLI 连发三个版本（v1.0.104 → v1.0.105-1），重点修复 Copilot Fusion 模型选择与后台任务等待逻辑。社区共更新 44 条 Issues，热点集中在**模型选择/BYOK 灵活性**（#3709 获得 34 👍）和 **ACP/非交互模式的协议完整性**问题。GPT-6.1 Sol 导致计划模式死锁的新 Issue（#5270）值得关注。

---

## 2. 版本发布

| 版本 | 更新要点 |
|---|---|
| **v1.0.105-1** | 修复与变更（未公开细节） |
| **v1.0.105-0** | **Fixed**: 修复长上下文会话中 `/model` 无法选择 Copilot Fusion High/Max 的问题 |
| **v1.0.104** | ① Managed model "fusion" 现默认以 Auto 启动会话并应用 fusionTier 设置；② 交互式与 SDK Autopilot 会话改为持续等待后台任务完成，不再因 `COPILOT_TASK_WAIT_TIMEOUT_SECONDS` 超时终止（`-p --autopilot` 仍遵守该超时）；③ 保存的 Auto 偏好（内容截断，待后续版本说明） |

---

## 3. 社区热点 Issues（Top 10）

1. **[#3709](https://github.com/github/copilot-cli/issues/3709)** — `/model` 支持会话内多模型切换（含 BYOK/本地 provider）｜OPEN｜👍 34｜评论 12
   社区呼声最高的功能：BYOK 模式被 `COPILOT_MODEL` 钉死单模型，且 `/model` 列表不显示本地 provider 的模型。反映 BYOK 用户体验的系统性短板。

2. **[#4275](https://github.com/github/copilot-cli/issues/4275)** — ACP 暴露 contextTier 会话配置项｜OPEN｜👍 4
   交互式 CLI 可中途切换上下文窗口档位，但 ACP 客户端只能在 spawn 时设置，协议能力不对等，影响 ACP 生态（如 GitKraken）体验。

3. **[#3518](https://github.com/github/copilot-cli/issues/3518)** — 支持恢复/取消归档项目会话｜OPEN｜👍 11
   误归档长周期编排会话（含大量子会话与 checkpoint）后无法找回，属于数据安全类需求，社区诉求强烈。

4. **[#5270](https://github.com/github/copilot-cli/issues/5270)** — GPT-6.1 Sol 锁死计划模式实现阶段｜OPEN（新）
   选中 Sol（显式或 Auto 路由）后 Plan → Implementation 转换永久挂起，与 v1.0.104 的 Fusion/Auto 改动可能相关，建议官方尽快复现。

5. **[#5197](https://github.com/github/copilot-cli/issues/5197)** — WSL2 语音服务器段错误（signal 11）｜OPEN
   1.0.100 更新语音运行时后 `/voice` 在 WSL2 完全不可用，卡在 "Fetching voice models"，属平台级回归。

6. **[#4994](https://github.com/github/copilot-cli/issues/4994)** — MCP OAuth 回归：每次 ACP 会话重复弹出授权页｜OPEN｜👍 3
   1.0.88 → 1.0.89 回归，有效 token 仍被 401 拒绝，浏览器 SSO 导致静默重授权循环，严重影响非交互自动化流水线。

7. **[#2893](https://github.com/github/copilot-cli/issues/2893)** — 并行工具调用下 preToolUse 钩子被静默绕过｜OPEN
   `timeoutSec` 不真正终止钩子进程，超时后回退为 allow + 串行分发，**安全策略被架空**，对企业用户是高风险问题。

8. **[#3572](https://github.com/github/copilot-cli/issues/3572)** — 无 GitHub 远端仓库时组织级自定义 Agent 不可见｜OPEN｜👍 4
   Org 级 Agent 依赖 cwd 内的 GitHub 仓库才能加载，限制了非 GitHub 托管项目使用组织 Agent。

9. **[#5115](https://github.com/github/copilot-cli/issues/5115)** — ACP `/rename` 假成功｜OPEN
   命令在 ACP 模式下报告成功但不实际改名，与 #5268、#5269（均为今日新报）共同指向 ACP 模式下会话管理命令大面积不可用的系统性缺口。

10. **[#3679](https://github.com/github/copilot-cli/issues/3679)** — BYOK Azure OpenAI 429 退避失效｜OPEN
    5 次重试在 ~0.15s 内耗尽即放弃，无有效退避，且重试参数不可配置。与已关闭的 [#2760](https://github.com/github/copilot-cli/issues/2760)（过度激进重试）同源，网络层重试策略仍需打磨。

---

## 4. 重要 PR 进展

过去 24 小时无 PR 更新，本节省略。

---

## 5. 功能需求趋势

- **模型灵活性与 BYOK 深化**（#3709、#4703、#4936、#4560）：多模型共存切换、per-agent provider、providers.json 凭据命令、Auto 模式 reasoningEffort 配置——社区希望从“钉死单模型”走向“完全可编程的模型路由”。
- **ACP / 非交互模式补齐**（#4275、#4994、#5115、#5268、#5269、#2482）：ACP 作为生态接入层，命令覆盖与配置暴露长期落后于交互式 CLI，是当前最密集的问题域。
- **企业部署与治理**（#5129、#3572、#4989）：系统级 Windows 安装器、无仓库目录时的 Org Agent 加载、企业 allowlist 匹配失效，企业采用摩擦点明确。
- **会话数据管理**（#3518、#4569）：归档恢复、GitHub Mobile 会话状态同步，长周期多会话工作流可靠性。
- **输入体验扩展**（#505 MCP prompts、#4563 计划内联批注、语音输入修复）：与 VS Code 等富客户端的能力对齐。

---

## 6. 开发者关注点（痛点总结）

1. **稳定性优先**：Windows 原生运行时崩溃长期未解（[#4026](https://github.com/github/copilot-cli/issues/4026)，自 2026-05 起），长会话事件投递失败致会话不可用（[#5100](https://github.com/github/copilot-cli/issues/5100)），跨版本 tmux/SSH 剪贴板失效（[#3260](https://github.com/github/copilot-cli/issues/3260)）。
2. **安全钩子可靠性**：preToolUse 静默绕过（#2893）意味着权限护栏在并行调用场景下形同虚设，企业用户应临时规避并行工具调用。
3. **模型设置持久化**：模型选择重启后回退默认（[#1869](https://github.com/github/copilot-cli/issues/1869)）、Auto 模式强制关闭推理力度（#4560），配置记忆仍是高频抱怨。
4. **429/网络重试策略**：两条相关 Issue 说明重试逻辑“激进与无退避”并存，BYOK 用户尤需注意限流场景下的任务失败。

---
*本日报基于 GitHub 公开数据自动汇总，链接均指向原始 Issue/Release。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-10-28

## 📌 今日速览

OpenCode 发布 **v2.2.0**，最大亮点是实验性的 **Desktop 插件系统**（创建、安装与分享 GUI 插件），标志着插件生态从 TUI 向桌面端扩展。CI 方面，团队连续修复 macOS 签名凭据问题，确保新版桌面端顺利分发。社区讨论热点集中在插件能力扩展、SQLite 错误处理和 MCP 进程泄漏等稳定性问题上。

---

## 🚀 版本发布

### v2.2.0
- **Desktop 插件（实验性）**：支持创建、安装和分享桌面端 GUI 插件，相关 PR：[#55246](https://github.com/anomalyco/opencode/pull/55246)、[#59469](https://github.com/anomalyco/opencode/pull/59469)、[#59489](https://github.com/anomalyco/opencode/pull/594)
- 完整文档见 [opencode.ai/v2/docs/build/plugins/gui](https://opencode.ai/v2/docs/build/plugins/gui)

---

## 🔥 社区热点 Issues

1. **显示免费额度精确重置时间**（9 评论 / 6 👍）— 目前只显示 "Free limit reached"，用户希望看到具体重置时刻。长期高热度需求。 [#52894](https://github.com/anomalyco/opencode/issues/52894)

2. **SQLite 磁盘满导致工具卡在 pending 状态**（7 评论，已复现）— DB 写失败后 `tool_use` 缺少 `tool_result`，被 Anthropic API 拒绝，属核心数据完整性问题。 [#52796](https://github.com/anomalyco/opencode/issues/52796)

3. **`api get` 在管道输出时截断 stdout**（7 评论，已复现）— 大响应（~580KB）经 pipe 输出 JSON 无效，破坏 `| jq` 工作流，影响脚本化使用。 [#52925](https://github.com/anomalyco/opencode/issues/52925)

4. **Desktop 文件树/预览显示过期内容**（7 评论，已复现）— agent 编辑文件后 Review 面板不刷新，影响桌面端核心审核体验。 [#52941](https://github.com/anomalyco/opencode/issues/52941)

5. **edit 工具数字替换重复写入**（7 评论，已复现）— 数字替换偶发重复 2x–129x（如 `900` → `900900`），虽低频但对正确性影响严重。 [#53011](https://github.com/anomalyco/opencode/issues/53011)

6. **子代理应向父会话提问而非直接问用户**（5 评论）— 子代理持有 `question` 工具的架构设计讨论，涉及多代理编排语义。 [#52795](https://github.com/anomalyco/opencode/issues/52795)

7. **Web/Desktop 端插件 UI 能力缺失**（5 评论 / 16 👍）— 呼吁将 TUI 丰富的插件 API（keymap、dialog、slot）镜像到桌面/Web 端，与 v2.2.0 插件方向高度呼应。 [#43132](https://github.com/anomalyco/opencode/issues/43132)

8. **MCP 服务器进程累积泄漏**（5 评论）— 单进程累积 5× mcp-reva、共 ~110 进程 / 6.3GB RAM，Windows 上尤为严重。 [#52965](https://github.com/anomalyco/opencode/issues/52965)

9. **快照功能在 Git < 2.45 上失败**（5 评论）— `git add --sparse` 需 Git 2.45+，旧版本用户完全失去 checkpoint/revert 能力。 [#52953](https://github.com/anomalyco/opencode/issues/52953)

10. **插件无法在展示层转换助手文本**（5 评论 / 12 👍）— 插件生态的又一能力缺口，如上下文管理插件需要处理模型输出中的标记。 [#53019](https://github.com/anomalyco/opencode/issues/53019)

---

## 🔧 重要 PR 进展

1. **feat(ui): 图片预览画廊导航** — Web 端支持多图切换浏览，回应 [#58295](https://github.com/anomalyco/opencode/issues/58295)。 [#58292](https://github.com/anomalyco/opencode/pull/58292)

2. **fix(ci): macOS 签名证书导入** — 修复 `p12Password must not be empty`，紧随 [#59760](https://github.com/anomalyco/opencode/pull/59760)（迁移至 release 环境凭据），保障桌面端发布。 [#59768](https://github.com/anomalyco/opencode/pull/59768)

3. **feat(core): `/goal` 命令 + 客户端 done 检查** — 无新增服务端事件的轻量实现，是 #58508 的替代方案。 [#59437](https://github.com/anomalyco/opencode/pull/59437)

4. **feat(core): 子代理并发限制** — 新增 `experimental.subagent_concurrency` 配置，控制并行子代理数量。 [#55983](https://github.com/anomalyco/opencode/pull/55983)

5. **fix(codemode): 不可 settle 的 Promise 快速失败** — 解决 Code Mode 中 `await new Promise(r => r)` 导致会话永久挂起的问题。 [#59463](https://github.com/anomalyco/opencode/pull/59463)

6. **refactor(nix): 从 bun.lock 获取依赖** — 用 bun2nix 离线模式替代手工维护的 node_modules 哈希，关闭 #49063。 [#59403](https://github.com/anomalyco/opencode/pull/59403)

7. **fix(update): 仅在 stable 通道应用最低版本约束** — 修复 dev/beta 构建号重置导致的更新异常。 [#59761](https://github.com/anomalyco/opencode/pull/59761)

8. **feat(tui): `/interrupt` 斜杠命令** — 为现有 `session.interrupt` 提供斜杠别名。 [#59757](https://github.com/anomalyco/opencode/pull/59757)

9. **process-daemon 三连 PR 栈**（#59700 → #59701 → #59702）— 重构停止/所有权路由、就绪等待替代轮询、Windows 25ms 轮询优化。 [#59701](https://github.com/anomalyco/opencode/pull/59701)

10. **feat(plugin): composer pill 自定义弹出内容** — 插件拥有 pill 内部内容渲染权，进一步扩展 GUI 插件能力（虽已关闭，但方向值得关注）。 [#59764](https://github.com/anomalyco/opencode/pull/59764)

---

## 📈 功能需求趋势

- **插件生态扩展**（最强趋势）：桌面/Web 端插件 UI（#43132）、文本转换 Hook（#53019）、历史变更集只读访问（#52870）——v2.2.0 的插件发布只是开始，社区要求全平台对齐 TUI 能力。
- **用量与额度透明化**：额度重置时间（#52894）、响应内嵌用量信息（#53044）。
- **多代理编排**：子代理提问路由（#52795）、并发限制（PR #55983）。
- **性能与成本优化**：vLLM 前缀缓存下的并行工具结果预填充（#52933）、MCP 资源目录缓存（#52852）。
- **IDE/编辑器集成**：ACP + Zed 远程 worktree 兼容性（#52952）。

---

## ⚠️ 开发者关注点

- **稳定性痛点**：SQLite 错误导致工具状态不一致（#52796）、edit 工具数字重复（#53011）、MCP 进程泄漏占用数 GB 内存（#52965）——数据完整性与资源管理是当前最高频投诉。
- **桌面端体验**：文件树/预览不刷新（#52941）、空闲时占满 1 核 CPU（#52927）、UI 无规律崩溃（#52939）。
- **兼容性**：Git < 2.45 快照失效（#52953）、DeepSeek reasoning_content 被错误回传（#56352）、OpenAI 兼容提供商图片归属错乱（#52977）。
- **CI/发布工程**：macOS 签名连续修复（PR #59760/#59768）、nix-eval 只评估不构建的 CI 盲区（#52863）。

---
*数据来源：github.com/anomalyco/opencode · 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-10-28

## 一、今日速览

Qwen Code 迎来密集发版：过去 24 小时内发布了 **v0.26.3-preview.0**、**v0.26.2 正式版**及 **SDK TypeScript v0.1.24**，其中 v0.26.2 包含一项 Breaking Change（简化 Web Shell 控件、移除 cwd 提交）。社区方面，Managed Agent 双路径架构提案（#12380）持续主导讨论（72 条评论），同时 CI/发布流水线稳定性问题集中爆发，多个 P1/P2 级核心 Bug 值得关注。

---

## 二、版本发布

### v0.26.2（正式版）
- ⚠️ **Breaking Change**: 简化 Web Shell 控件并退役 cwd 提交（[#15616](https://github.com/QwenLM/qwen-code/pull/15616)，by @doudouOUC）
- Managed 会话权限规则与自动审批特性（源自 preview.1）

### v0.26.3-preview.0
- `feat(memory)`: 空运行后启用可选的记忆提取节奏控制（[#13571](https://github.com/QwenLM/qwen-code/pull/13571)，by @yiliang114）
- `fix(core)`: 恢复带引号参数的外层 XML 工具调用

### SDK TypeScript v0.1.24
- 捆绑 CLI 版本 0.26.2，与 CLI 同源构建

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#12380](https://github.com/QwenLM/qwen-code/issues/12380) Managed Agent 双路径架构提案 | 社区最核心的路线图讨论（72 评论），定义 serve 模式下的托管 Agent 架构与分阶段交付，Stage F 已验证 |
| 2 | [#15742](https://github.com/QwenLM/qwen-code/issues/15742) Anthropic 原生会话 400 死循环（P1） | 历史 thinking 部分丢失签名后整个会话永久 400，属数据兼容性硬故障，影响真实用户会话 |
| 3 | [#15675](https://github.com/QwenLM/qwen-code/issues/15675) sed 模拟与真实 sed 行为不一致（P1） | 内置 sed 模拟缺 `s`/`u` 标志，`\r` 和 emoji 匹配出错，静默产出错误编辑结果 |
| 4 | [#14724](https://github.com/QwenLM/qwen-code/issues/14724) Main CI Managed Agent gate 失败 | 持续近 10 天的 CI 稳定性问题（68 评论），无测试可识别即失败，阻塞合并流程 |
| 5 | [#13787](https://github.com/QwenLM/qwen-code/issues/13787) XML 恢复前缀扫描性能劣化 | 大量工具调用的响应触发重复前缀扫描，延迟随调用数增长，已有基准复现数据 |
| 6 | [#15499](https://github.com/QwenLM/qwen-code/issues/15499) managed runtime 发布卡在 preflight | v0.26.1 发布流程在 immutable-publication 检查前中断，与 #15672/#15705 共同反映发布链路脆弱 |
| 7 | [#15686](https://github.com/QwenLM/qwen-code/issues/15686) Active Goal 扣留普通用户输入 | Goal 运行期间 Enter 转向消息与粘贴内容被排队，违背快捷键文档承诺的交互行为 |
| 8 | [#15690](https://github.com/QwenLM/qwen-code/issues/15690) Homebrew 安装 0.26.1 dylib 链接错误 | macOS arm64 官方分发渠道安装报错，缺 `-headerpad_max_install_names`，影响升级用户 |
| 9 | [#15738](https://github.com/QwenLM/qwen-code/issues/15738) Team 模式 ACP 下队友消息无法送达 leader | `qwen serve --web` 多 Agent 团队协作实验性功能的核心缺陷，与 multi-agent 路线图直接相关 |
| 10 | [#15645](https://github.com/QwenLM/qwen-code/issues/15645) daemon 配置技能目录缓存不刷新 | Agent 在磁盘创建项目技能后配置端点持续遗漏，管理 UI 显示过期数据 |

---

## 四、重要 PR 进展（Top 10）

1. **[#15718](https://github.com/QwenLM/qwen-code/pull/15718)** 同上下文 Java 内嵌 Managed Agent（opt-in）
   支持 Java 宿主在现有 JVM/Spring 上下文中直接内嵌 Managed Agent，可复用连接池或 DataSource——企业 Java 集成的关键一步。

2. **[#11854](https://github.com/QwenLM/qwen-code/pull/11854)** 混合 code mode
   对齐 Codex 的 `tools.mode` 枚举（`direct`/`code_mode`/`code_mode_only`），暴露隔离的 `exec` JavaScript 工具。

3. **[#14230](https://github.com/QwenLM/qwen-code/pull/14230)** Web Shell `/memory` 面板新增 Auto memory 标签页
   按作用域分组浏览托管自动记忆，支持开关操作。

4. **[#15743](https://github.com/QwenLM/qwen-code/pull/15743)** CLI 沙箱转发 workflow 开关环境变量
   沙箱化 CLI 现在能正确读取操作员的 workflow 策略。

5. **[#12585](https://github.com/QwenLM/qwen-code/pull/12585)** ACP 嵌入式文本资源持久化与回放
   持久化有界的原始 resource 块并按用户输入回放，改进离线转录投影。

6. **[#15557](https://github.com/QwenLM/qwen-code/pull/15557)** 归档会话迁移至 Settings
   落地 #15549 的 Option 3 交互设计，侧边栏更精简。

7. **[#14335](https://github.com/QwenLM/qwen-code/pull/14335)** 完成态子会话 TTL 自动清理
   新增 `serve.subSessionCompletionTtlHours` 配置，daemon 模式下自动回收，默认保持现状。

8. **[#15734](https://github.com/QwenLM/qwen-code/pull/15734)** CI 将 PR 重试固定到触发时 head SHA
   修复重跑测试树与原始提交不一致的验证漏洞，呼应 #15052。

9. **[#13628](https://github.com/QwenLM/qwen-code/pull/13628)** 系统设置环境变量仅信任管理员路径
   增加信任门控，防止用户自建文件冒充系统层配置——安全加固。

10. **[#12513](https://github.com/QwenLM/qwen-code/pull/12513)** 批量工作区会话实时快照
    单次只读请求获取 1–20 个工作区的完整快照，降低多工作区管理开销。

---

## 五、功能需求趋势

1. **多 Agent / Managed Agent 架构**：#12380 双路径提案、#15738 Team 模式、#15718 Java 内嵌——托管 Agent 生态是当前最强主线。
2. **Web Shell 体验打磨**：简单输入模式（#15647 已落地）、会话归档整理（#15549）、快捷键、审批卡片滚动修复，桌面端体验迭代活跃。
3. **Provider 生态扩展**：#13024 请求内置 IO Intelligence（io.net）预设（10 👍），#12072 OpenRouter 头部归因修正。
4. **上下文与记忆管理**：动态工具输出截断（#2566）、自动记忆提取节奏与 UI（PR #14230）。
5. **企业级能力**：会话权限规则、子会话生命周期管理、系统设置安全加固。

---

## 六、开发者关注点

- **CI/发布流水线稳定性是最大痛点**：#14724（Managed Agent gate）、#15697（web-shell E2E flaky）、#15706（SDK Java fault gates）、#15677（darwin-x64 6 中 5 败）、#15499/#15672（发布中断）、#13078（CVE 审计）——工程自动化债务明显，维护者（尤其 @yiliang114）已密集提交针对性修复（#15734、#15705）。
- **分发渠道质量**：Homebrew dylib 链接错误（#15690）表明打包链路需要更强的发布前验证。
- **运行时行为保真度**：sed 模拟（#15675）、XML 恢复性能（#13787）说明内置模拟层与真实工具语义/性能的偏差是隐性风险。
- **会话数据健壮性**：Anthropic thinking 签名丢失导致永久 400（#15742）提示历史数据兼容性校验需加强。
- **配置缓存一致性**：daemon 技能目录过期（#15645）反映文件系统与运行时状态同步机制有待完善。

> 📌 **总体判断**：项目处于快速功能扩张期（Managed Agent / Web Shell / 多 Agent），但 CI 与发布基础设施的稳定性问题正在消耗维护者大量精力，值得作为下阶段工程投入优先级参考。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*