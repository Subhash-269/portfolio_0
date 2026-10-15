import Link from 'next/link';
import Image from 'next/image';
import Shot from './site/Shot';
import Footer from './site/Footer';
import Photo from './site/Photo';
import { SkillChip } from './site/SkillIcon';
import DomainTag from './site/DomainTag';
import GitHubPanel from './site/GitHubPanel';
import OrgLogo from './site/OrgLogo';

export const revalidate = 21600;
import { person, log, projects, experience, hackathons, certifications } from './site/data';

export default function Home() {
	const featured = projects.filter((p) => p.shots).slice(0, 3);
	return (
		<main className="wrap page-in">
			<section className="hero">
				<div>
					<p className="prompt">$ whoami</p>
					<h1 className="h1">
						Venkat <span className="nick">Neel</span>raj Nitta
					</h1>
					<p className="prose">{person.intro}</p>
					<p className="status">
						<span>
							<span className="dot" aria-hidden="true" />
							<b>Open to</b> {person.openTo}
						</span>
						<span>
							<b>Relocation</b> {person.relocation}
						</span>
						<span>
							<b>Based in</b> {person.location}
						</span>
					</p>
					<div className="chips" aria-label="Core skills">
						{person.chips.core.map((c) => (
							<SkillChip key={c} name={c} strong />
						))}
						{person.chips.more.map((c) => (
							<SkillChip key={c} name={c} />
						))}
					</div>
				</div>
				<div>
					<Photo />
					<div className="log" aria-label="Recent activity">
						{log.map((l) => (
							<div key={l.when + l.text}>
								<span className="t">{l.when}</span>
								{l.text}
								{l.ok && <span className="ok">{l.ok}</span>}
							</div>
						))}
					</div>
				</div>
			</section>

			<h2 className="sect">staples/ · the system I worked on</h2>
			<div className="blk-wrap" aria-label="Staples agentic commerce system">
				<div className="blk-top">
					<span className="blk-title">Jan to Jul 2026</span>
					<span className="blk-key">
						<span><i className="k-own" />I owned</span>
						<span><i className="k-kept" />I maintained</span>
						<span><i className="k-team" />team</span>
					</span>
				</div>
				<div className="stp-grid">
				<figure className="stp-photo">
					<Image src="/staples.jpg" alt="Venkat at the Staples headquarters sign" width={1400} height={782} sizes="(min-width: 860px) 40vw, 100vw" />
					<figcaption>Framingham HQ · 2026</figcaption>
				</figure>
				<ol className="blks">
					<li className="blk src">
						<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="7" ry="2.6" /><path d="M5 5v14c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V5M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" /></svg>
						<b>Snowflake</b><span>15+ tables</span>
					</li>
					<li className="blk own">
						<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11M15 9v11" /></svg>
						<b>Delta table</b><span>daily, changed rows</span>
					</li>
					<li className="blk own">
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12V4h8l10 10-8 8z" /><circle cx="7.5" cy="8" r="1.5" /></svg>
						<b>Product tags</b><span>~0.8 accuracy</span>
					</li>
					<li className="blk own">
						<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="9" height="9" rx="1.5" /><rect x="13" y="2" width="9" height="9" rx="1.5" /><rect x="2" y="13" width="9" height="9" rx="1.5" /><rect x="13" y="13" width="9" height="9" rx="1.5" /><path d="M5 6.5h3M16 6.5h3M5 17.5h3M16 17.5h3" /></svg>
						<b>GPU batch inference</b><span>4 h → 90 min</span>
					</li>
					<li className="blk kept">
						<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m20 20-5.5-5.5" /><circle cx="10" cy="10" r="1.6" /></svg>
						<b>Retrieval</b><span>3 indexes + graph</span>
					</li>
					<li className="blk team">
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" /></svg>
						<b>Shopping agent</b><span>routing, UI</span>
					</li>
				</ol>
				</div>
				<p className="blk-cap">~300K products, tagged and searchable, every day. <Link href="/case-studies/staples">read the case study →</Link></p>
			</div>

			<h2 className="sect">projects</h2>
			<div className="cards">
				{featured.map((p) => (
					<article className="card" key={p.slug}>
						<Shot src={p.shots![0].src} light={p.shots![0].light} alt={p.shots![0].alt} sizes="(min-width: 860px) 33vw, 100vw" />
						<div className="b">
							<div className="pj-head">
								<h3 className="h3">{p.dir}</h3>
								<DomainTag domain={p.domain} />
							</div>
							<p className="prose-sm">{p.summary}</p>
							{p.metric && <span className="m">{p.metric}</span>}
							<div className="chips xp-stack">
								{p.stack.map((s) => <SkillChip key={s} name={s} />)}
							</div>
							<div className="links">
								{p.links.map((l) => (
									<a key={l.href} href={l.href}>
										{l.label === 'github' && <OrgLogo org="github" size={13} />}
										{l.label} →
									</a>
								))}
							</div>
						</div>
					</article>
				))}
			</div>
			<p className="legend">
				<Link href="/projects">all projects and hackathons →</Link>
			</p>

			<GitHubPanel />

			<h2 className="sect">experience</h2>
			<div className="rows">
				{experience.map((e) => (
					<div key={e.role}>
						<span className="w">{e.when}</span>
						<div className="r">
							<b>{e.role}</b>
							{e.current && <span className="badge">current</span>}
							<div className="org"><OrgLogo org={e.logo} />{e.org}</div>
							{'course' in e && e.course && <div className="xp-course">{e.course}</div>}
							{'stack' in e && e.stack && (
								<div className="chips xp-stack" aria-label={`Stack at ${e.org}`}>
									{e.stack.map((s: string) => <SkillChip key={s} name={s} />)}
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			<div className="two" style={{ marginTop: 44 }}>
				<div>
					<h2 className="sect" style={{ marginTop: 0 }}>recognition</h2>
					<ul className="list">
						{hackathons.map((h) => (
							<li key={h.name}>
								<span>{h.when}</span>
								<div>
									<OrgLogo org={h.logo} />
									{h.won ? <b>Workhuman-sponsored hackathon</b> : <b>InnovAIte, Northeastern</b>} · {h.name}
									{h.won && <span className="badge">won</span>}
								</div>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h2 className="sect" style={{ marginTop: 0 }}>certifications</h2>
					<ul className="list">
						{certifications.slice(1, 4).map((c) => (
							<li key={c.name}>
								<span>{c.when}</span>
								<div>
									<OrgLogo org={c.logo} /><b>{c.name}</b> · {c.by}
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>

			<Footer />
		</main>
	);
}
