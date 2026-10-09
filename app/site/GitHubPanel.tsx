import { getGitHub, type Day } from './github';
import { person } from './data';
import OrgLogo from './OrgLogo';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function weeksOf(days: Day[]): (Day | null)[][] {
	if (!days.length) return [];
	const first = new Date(days[0].date + 'T00:00:00Z').getUTCDay();
	const cells: (Day | null)[] = [...Array(first).fill(null), ...days];
	const weeks: (Day | null)[][] = [];
	for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
	return weeks;
}

export default async function GitHubPanel() {
	const gh = await getGitHub();
	if (!gh.days.length && gh.repos === null) return null;
	const weeks = weeksOf(gh.days);

	const stats = [
		{ v: gh.total, l: 'contributions, last 12 months' },
		{ v: gh.activeDays, l: 'active days' },
		{ v: gh.longestStreak, l: 'longest streak (days)' },
		{ v: gh.repos, l: 'original repositories' },
		{ v: gh.stars ? gh.stars : null, l: 'stars on own repos' },
		{ v: gh.since, l: 'on GitHub since' },
	].filter((s) => s.v !== null && s.v !== undefined);

	return (
		<section aria-label="GitHub activity">
			<h2 className="sect"><OrgLogo org="github" size={14} />github · @Subhash-269</h2>
			<div className="gh-stats" style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
				{stats.map((s) => (
					<div key={s.l}>
						<strong className="num">{s.v}</strong>
						<span>{s.l}</span>
					</div>
				))}
			</div>

			{weeks.length > 0 && (
				<div className="gh-cal-wrap">
					<div className="gh-months" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${weeks.length}, 12px)` }}>
						{weeks.map((w, i) => {
							const d = w.find(Boolean);
							const showLabel = d && new Date(d.date + 'T00:00:00Z').getUTCDate() <= 7;
							return <span key={i}>{showLabel ? MONTHS[new Date(d!.date + 'T00:00:00Z').getUTCMonth()] : ''}</span>;
						})}
					</div>
					<div className="gh-cal" role="img" aria-label={`${gh.total} contributions in the last 12 months`} style={{ gridTemplateColumns: `repeat(${weeks.length}, 12px)` }}>
						{weeks.map((w, i) => (
							<div key={i} className="gh-week">
								{w.map((d, j) => (
									<i key={j} className={d ? `l${d.level}` : 'empty'} title={d ? `${d.count} on ${d.date}` : undefined} />
								))}
							</div>
						))}
					</div>
					<div className="gh-legend" aria-hidden="true">
						less <i className="l0" /><i className="l1" /><i className="l2" /><i className="l3" /><i className="l4" /> more
					</div>
				</div>
			)}

			<div className="two" style={{ marginTop: 24 }}>
				{gh.achievements.length > 0 && (
					<div>
						<h3 className="gh-h">achievements</h3>
						<ul className="gh-ach">
							{gh.achievements.map((a) => (
								<li key={a.name}>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={a.img} alt="" width={40} height={40} loading="lazy" />
									<span>
										{a.name}
										{a.tier && <b> {a.tier}</b>}
									</span>
								</li>
							))}
						</ul>
					</div>
				)}
				{gh.languages.length > 0 && (
					<div>
						<h3 className="gh-h">languages across repos</h3>
						<ul className="gh-langs">
							{gh.languages.map((l) => (
								<li key={l.name}>
									<span>{l.name}</span>
									<span className="bar"><span style={{ width: `${(l.count / gh.languages[0].count) * 100}%` }} /></span>
									<span className="num">{l.count}</span>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
			<p className="legend">
				<a href={person.github}><OrgLogo org="github" size={13} />open github profile →</a>
			</p>
		</section>
	);
}
