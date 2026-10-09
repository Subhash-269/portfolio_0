'use client';

import Image from 'next/image';
import { useState } from 'react';
import { DOMAINS, projects, hackathons, type Domain } from './data';
import { SkillChip } from './SkillIcon';
import DomainTag from './DomainTag';

type Filter = Domain | 'all';

export default function ProjectsList() {
	const [filter, setFilter] = useState<Filter>('all');
	const used = Array.from(new Set<Domain>([...projects.map((p) => p.domain), ...hackathons.map((h) => h.domain)]));
	const shownProjects = projects.filter((p) => filter === 'all' || p.domain === filter);
	const shownHacks = hackathons.filter((h) => filter === 'all' || h.domain === filter);

	return (
		<>
			<div className="filters" role="group" aria-label="Filter by domain">
				<button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
					all
				</button>
				{used.map((d) => (
					<button key={d} type="button" aria-pressed={filter === d} onClick={() => setFilter(d)} className={`d-${d}`}>
						<i aria-hidden="true" />
						{DOMAINS[d]}
					</button>
				))}
			</div>

			{shownProjects.map((p) => (
				<article className="pj" key={p.slug} id={p.slug}>
					<div>
						<div className="pj-head">
							<h2 className="h3" style={{ fontSize: '1.2rem' }}>{p.dir}</h2>
							<DomainTag domain={p.domain} />
						</div>
						<p className="prose-sm" style={{ color: 'var(--fg)' }}>{p.summary}</p>
						<ul>
							{p.detail.map((d) => (
								<li key={d}>{d}</li>
							))}
						</ul>
						{p.solvers && p.shots && (
							<div className="solve" aria-label="Solvers compared" style={{ margin: '4px 0 12px' }}>
								{p.solvers.map((s) => (
									<span key={s}>{s}</span>
								))}
							</div>
						)}
						<div className="chips" style={{ margin: '4px 0 10px' }}>
							{p.stack.map((t) => (
								<SkillChip key={t} name={t} />
							))}
						</div>
						<div className="meta">
							<span>{p.when}</span>
							{p.links.map((l) => (
								<a key={l.href} href={l.href}>
									{l.label} →
								</a>
							))}
						</div>
					</div>
					{p.shots ? (
						<div className="shots">
							{p.shots.map((s) => (
								<a key={s.src} href={s.src} title={s.alt}>
									<Image src={s.src} alt={s.alt} width={1440} height={900} sizes="(min-width: 860px) 45vw, 100vw" />
								</a>
							))}
							{p.shotsNote && <p className="shots-note">{p.shotsNote}</p>}
						</div>
					) : (
						<div className="solve" aria-label="Solvers compared">
							{p.solvers?.map((s) => (
								<span key={s}>{s}</span>
							))}
						</div>
					)}
				</article>
			))}

			{shownHacks.length > 0 && (
				<>
					<h2 className="sect">hackathons</h2>
					<div className="hk">
						{shownHacks.map((h) => (
							<div key={h.name}>
								<div className="pj-head">
									<h3 className="h3">
										{h.name}
										{h.won && <span className="won">won</span>}
									</h3>
									<DomainTag domain={h.domain} />
								</div>
								<p className="prose-sm" style={{ color: 'var(--fg)' }}>{h.text}</p>
								<p className="prose-sm" style={{ fontFamily: 'var(--mono)', fontSize: '.76rem', marginTop: 6 }}>
									{h.when} · {h.stack} · <a href={h.href}>code →</a>
								</p>
							</div>
						))}
					</div>
				</>
			)}
			{shownProjects.length === 0 && shownHacks.length === 0 && <p className="prose-sm">Nothing in this domain yet.</p>}
		</>
	);
}
