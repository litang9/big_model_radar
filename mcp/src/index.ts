/**
 * Big Model Radar MCP Server — Cloudflare Worker
 *
 * Exposes Big Model Radar digest data as MCP tools so any MCP-compatible
 * client (Claude Desktop, OpenClaw, etc.) can query the latest AI ecosystem reports.
 *
 * Tools:
 *   list_reports  — list available dates and report types
 *   get_report    — fetch a specific report by date and type
 *   get_latest    — fetch the most recent report of a given type
 *   search        — keyword search across recent reports
 *   fetch_trending_skills — fetch trending skills from GitHub repos
 *   compare_skills       — compare skill trends between repos
 */

const PAGES_URL = "https://gsscsd.github.io/big_model_radar";
const SKILLS_CACHE_TTL = 3600; // 1 hour

const REPORT_LABELS: Record<string, string> = {
  "ai-cli": "AI CLI Tools Digest (ZH)",
  "ai-cli-en": "AI CLI Tools Digest (EN)",
  "ai-agents": "AI Agents Ecosystem (ZH)",
  "ai-agents-en": "AI Agents Ecosystem (EN)",
  "ai-web": "Official AI Content (ZH)",
  "ai-web-en": "Official AI Content (EN)",
  "ai-trending": "GitHub AI Trends (ZH)",
  "ai-trending-en": "GitHub AI Trends (EN)",
  "ai-hn": "Hacker News AI Community (ZH)",
  "ai-hn-en": "Hacker News AI Community (EN)",
  "ai-weekly": "Weekly Rollup (ZH)",
  "ai-weekly-en": "Weekly Rollup (EN)",
  "ai-monthly": "Monthly Rollup (ZH)",
  "ai-monthly-en": "Monthly Rollup (EN)",
};

interface ManifestDate {
  date: string;
  reports: string[];
}

interface Manifest {
  dates: ManifestDate[];
}

interface TrendingSkill {
  name: string;
  repo: string;
  prCount: number;
  issueCount: number;
  updatedAt: string;
}

interface SkillsComparison {
  repo1: string;
  repo2: string;
  commonSkills: TrendingSkill[];
  uniqueToRepo1: TrendingSkill[];
  uniqueToRepo2: TrendingSkill[];
}

// ---------------------------------------------------------------------------
// Data fetchers
// ---------------------------------------------------------------------------

async function fetchManifest(): Promise<Manifest> {
  const res = await fetch(`${PAGES_URL}/manifest.json`, {
    cf: { cacheTtl: 300 },
  } as RequestInit);
  if (!res.ok) throw new Error(`Failed to fetch manifest: HTTP ${res.status}`);
  return res.json() as Promise<Manifest>;
}

async function fetchReport(date: string, type: string): Promise<string> {
  const res = await fetch(`${PAGES_URL}/digests/${date}/${type}.md`, {
    cf: { cacheTtl: 3600 },
  } as RequestInit);
  if (!res.ok) throw new Error(`Report not found: ${date}/${type} (HTTP ${res.status})`);
  return res.text();
}

async function fetchTrendingSkills(repo: string): Promise<TrendingSkill[]> {
  const cacheKey = `skills:${repo}`;
  const cached = (await caches.default?.match(cacheKey))?.json();
  if (cached) return cached;

  const skills = await githubGet<TrendingSkill[]>(
    `https://api.github.com/repos/${repo}/topics`,
    { per_page: 50 }
  );

  const enriched = await Promise.all(skills.map(async skill => {
    const [prs, issues] = await Promise.all([
      githubGet<{total_count: number}>(`https://api.github.com/search/issues?q=repo:${repo}+topic:${skill.name}+is:pr`, { per_page: 1 }),
      githubGet<{total_count: number}>(`https://api.github.com/search/issues?q=repo:${repo}+topic:${skill.name}+is:issue`, { per_page: 1 })
    ]);
    return {
      name: skill.name,
      repo,
      prCount: prs.total_count,
      issueCount: issues.total_count,
      updatedAt: new Date().toISOString()
    };
  }));

  await caches.default?.put(new Request(cacheKey), new Response(JSON.stringify(enriched)));
  return enriched;
}

async function compareSkills(repo1: string, repo2: string): Promise<SkillsComparison> {
  const [skills1, skills2] = await Promise.all([
    fetchTrendingSkills(repo1),
    fetchTrendingSkills(repo2)
  ]);

  const skillMap1 = new Map(skills1.map(s => [s.name, s]));
  const skillMap2 = new Map(skills2.map(s => [s.name, s]));

  const common = Array.from(skillMap1.keys())
    .filter(name => skillMap2.has(name))
    .map(name => ({
      name,
      repo: repo1,
      ...skillMap1.get(name),
      repo2Count: skillMap2.get(name)!.prCount + skillMap2.get(name)!.issueCount
    }));

  return {
    repo1,
    repo2,
    commonSkills: common,
    uniqueToRepo1: Array.from(skillMap1.keys())
      .filter(name => !skillMap2.has(name))
      .map(name => skillMap1.get(name)!),
    uniqueToRepo2: Array.from(skillMap2.keys())
      .filter(name => !skillMap1.has(name))
      .map(name => skillMap2.get(name)!)
  };
}

// ---------------------------------------------------------------------------
// Tool handlers
// ---------------------------------------------------------------------------

async function toolListReports(args: Record<string, unknown>): Promise<string> {
  const days = Math.min(Number(args["days"] ?? 7), 30);
  const { dates } = await fetchManifest();
  const slice = dates.slice(0, days);

  const lines = slice.map(({ date, reports }) => {
    const labels = reports.map((r) => `${r} (${REPORT_LABELS[r] ?? r})`).join(", ");
    return `• ${date}: ${labels}`;
  });

  return `Available reports — last ${slice.length} day(s):\n\n${lines.join("\n")}`;
}

async function toolGetReport(args: Record<string, unknown>): Promise<string> {
  const date = String(args["date"] ?? "").trim();
  const type = String(args["type"] ?? "").trim();
  if (!date || !type) throw new Error("Both 'date' and 'type' are required");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("'date' must be in YYYY-MM-DD format");
  return fetchReport(date, type);
}

async function toolGetLatest(args: Record<string, unknown>): Promise<string> {
  const type = String(args["type"] ?? "ai-cli-en").trim();
  const { dates } = await fetchManifest();
  for (const { date, reports } of dates) {
    if (reports.includes(type)) {
      const content = await fetchReport(date, type);
      return `# ${date} — ${REPORT_LABELS[type] ?? type}\n\n${content}`;
    }
  }
  throw new Error(`No report found for type: ${type}`);
}

async function toolSearch(args: Record<string, unknown>): Promise<string> {
  const query = String(args["query"] ?? "").trim().toLowerCase();
  if (!query) throw new Error("'query' is required");
  const days = Math.min(Number(args["days"] ?? 7), 14);

  const { dates } = await fetchManifest();
  const slice = dates.slice(0, days);

  const results: string[] = [];

  await Promise.all(
    slice.map(async ({ date,