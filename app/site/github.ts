// Server-side GitHub data for the dashboard. Fetched at build time and refreshed
// every 6 hours (ISR). Every fetch fails soft: a missing piece hides its panel.

const USER = 'Subhash-269';
const REVALIDATE = 21600;
const UA = { 'User-Agent': 'venkatneelraj-portfolio' };

export type Day = { date: string; level: number; count: number };
export type Achievement = { name: string; img: string; tier: string | null };
export type GitHubData = {
	days: Day[];
	total: number;
	activeDays: number;
	longestStreak: number;
	achievements: Achievement[];
	repos: number | null;
	stars: number | null;
	followers: number | null;
	since: string | null;
	languages: { name: string; count: number }[];
};

async function text(url: string): Promise<string | null> {
	try {
		const r = await fetch(url, { headers: UA, next: { revalidate: REVALIDATE } });
		return r.ok ? await r.text() : null;
	} catch {
		return null;
	}
}

async function json<T>(url: string): Promise<T | null> {
	try {
		const r = await fetch(url, { headers: { ...UA, Accept: 'application/vnd.github+json' }, next: { revalidate: REVALIDATE } });
		return r.ok ? ((await r.json()) as T) : null;
	} catch {
		return null;
	}
}

function parseContributions(html: string): Day[] {
	const counts = new Map<string, number>();
	const tipRe = /<tool-tip[^>]*for="(contribution-day-component-\d+-\d+)"[^>]*>([^<]*)</g;
	for (let m; (m = tipRe.exec(html)); ) {
		const n = /^(\d+) contribution/.exec(m[2].trim());
		counts.set(m[1], n ? Number(n[1]) : 0);
	}
	const days: Day[] = [];
	const cellRe = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="(contribution-day-component-\d+-\d+)"[^>]*data-level="(\d)"/g;
	for (let m; (m = cellRe.exec(html)); ) {
		days.push({ date: m[1], level: Number(m[3]), count: counts.get(m[2]) ?? 0 });
	}
	return days.sort((a, b) => a.date.localeCompare(b.date));
}

function parseAchievements(html: string): Achievement[] {
	const out = new Map<string, Achievement>();
	const imgRe = /<img[^>]*src="(https:\/\/github\.githubassets\.com\/assets\/[^"]+)"[^>]*alt="Achievement: ([^"]+)"/g;
	for (let m; (m = imgRe.exec(html)); ) {
		if (out.has(m[2])) continue;
		const after = html.slice(m.index, m.index + 1500);
		const tier = /achievement-tier-label[^>]*>\s*(x\d+)/.exec(after);
		out.set(m[2], { name: m[2], img: m[1], tier: tier ? tier[1] : null });
	}
	return [...out.values()];
}

export async function getGitHub(): Promise<GitHubData> {
	const [contribHtml, achHtml, user, repos] = await Promise.all([
		text(`https://github.com/users/${USER}/contributions`),
		text(`https://github.com/${USER}?tab=achievements`),
		json<{ public_repos: number; followers: number; created_at: string }>(`https://api.github.com/users/${USER}`),
		json<{ fork: boolean; stargazers_count: number; language: string | null }[]>(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner`),
	]);

	const days = contribHtml ? parseContributions(contribHtml) : [];
	let longest = 0;
	let run = 0;
	for (const d of days) {
		run = d.count > 0 ? run + 1 : 0;
		longest = Math.max(longest, run);
	}
	const own = (repos ?? []).filter((r) => !r.fork);
	const langCount = new Map<string, number>();
	for (const r of own) if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);

	return {
		days,
		total: days.reduce((s, d) => s + d.count, 0),
		activeDays: days.filter((d) => d.count > 0).length,
		longestStreak: longest,
		achievements: achHtml ? parseAchievements(achHtml) : [],
		repos: repos ? own.length : user?.public_repos ?? null,
		stars: repos ? own.reduce((s, r) => s + (r.stargazers_count || 0), 0) : null,
		followers: user?.followers ?? null,
		since: user?.created_at ? user.created_at.slice(0, 4) : null,
		languages: [...langCount.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 6),
	};
}
