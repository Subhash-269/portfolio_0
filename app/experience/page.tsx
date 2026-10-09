import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '../site/Footer';
import { experience, education, skills, certifications } from '../site/data';
import { SkillChip } from '../site/SkillIcon';
import OrgLogo from '../site/OrgLogo';

export const metadata: Metadata = { title: 'Experience' };

export default function Experience() {
	return (
		<main className="wrap page-in">
			<div style={{ paddingTop: 48 }}>
				<p className="prompt">$ cat experience.log</p>
				<h1 className="h1">Experience</h1>
			</div>

			<h2 className="sect" style={{ marginTop: 24 }}>work</h2>
			<div className="rows">
				{experience.map((e) => (
					<div key={e.role}>
						<span className="w">{e.when}</span>
						<div className="r">
							<b>{e.role}</b>
							{e.current && <span className="badge">current</span>}
							<div className="org"><OrgLogo org={e.logo} />{e.org}</div>
							<p className="prose-sm" style={{ color: 'var(--fg)' }}>
								{e.text} {e.link && <Link href={e.link.href}>{e.link.label} →</Link>}
							</p>
						</div>
					</div>
				))}
			</div>

			<h2 className="sect">education</h2>
			<div className="rows">
				{education.map((e) => (
					<div key={e.role}>
						<span className="w">{e.when}</span>
						<div className="r">
							<b>{e.role}</b>
							<div className="org"><OrgLogo org={'logo' in e ? (e.logo as string) : undefined} />{e.org}</div>
							<p className="prose-sm">{e.text}</p>
						</div>
					</div>
				))}
			</div>

			<h2 className="sect">skills</h2>
			<div className="skills">
				{skills.map((s) => (
					<div key={s.group}>
						<h3>{s.group}</h3>
						<div className="chips">
							{s.items.split(', ').map((t) => (
								<SkillChip key={t} name={t} />
							))}
						</div>
					</div>
				))}
			</div>

			<h2 className="sect">certifications</h2>
			<ul className="list">
				{certifications.map((c) => (
					<li key={c.name}>
						<span>{c.when}</span>
						<div>
							<OrgLogo org={c.logo} /><b>{c.name}</b> · {c.by}
						</div>
					</li>
				))}
			</ul>
			<Footer />
		</main>
	);
}
