import Link from 'next/link';
import Shot from './site/Shot';
import Footer from './site/Footer';
import Photo from './site/Photo';
import { SkillChip } from './site/SkillIcon';
import DomainTag from './site/DomainTag';
import GitHubPanel from './site/GitHubPanel';

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
			<pre className="tree" aria-label="Staples agentic commerce system">
				{'staples-agentic-commerce/\n'}
				{'├── '}<span className="o">snowflake_to_delta.sql</span>{'   15+ tables → 1 flattened Delta table, daily, changed rows only\n'}
				{'├── '}<span className="o">enrichment/</span>{'              multi-label DeBERTa · LLM fallback · ~0.8 accuracy\n'}
				{'│   └── '}<span className="o">batch_on_ray.py</span>{'      ~4 h → 90 min on one GPU node\n'}
				{'├── '}<span className="m">retrieval/</span>{'               3 Databricks Vector Search indexes + Neo4j product graph\n'}
				{'│   └── '}<span className="o">relationships</span>{'        bought-together, compatibility edges in Neo4j\n'}
				<span className="c">{'└── router.py                agent'}</span>
			</pre>
			<p className="legend">
				<span><i style={{ background: 'var(--link)' }} />maintained and extended: most of my time</span>
				<span><i style={{ background: 'var(--ok)' }} />built and owned</span>
				<Link href="/case-studies/staples">read the case study →</Link>
			</p>

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
							<div className="links">
								{p.links.map((l) => (
									<a key={l.href} href={l.href}>
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
							<div className="org">{e.org}</div>
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
									<b>{c.name}</b> · {c.by}
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
