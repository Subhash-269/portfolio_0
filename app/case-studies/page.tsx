import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '../site/Footer';
import DomainTag from '../site/DomainTag';
import type { Domain } from '../site/data';

export const metadata: Metadata = { title: 'Case studies' };

const items = [
	{
		href: '/case-studies/staples',
		tag: 'Staples · AI Engineer Intern · Jan–Jul 2026',
		title: 'The retrieval and data layers under an agentic e-commerce system',
		text: 'Vector Search indexes and a Neo4j product graph the agent queried, the daily Snowflake-to-Delta path feeding them, and the SKU enrichment that made filtering possible.',
		domain: 'retail' as Domain,
		res: '~4 h → 90 min',
		resNote: 'batch tagging on Ray',
	},
	{
		href: '/case-studies/cognida',
		tag: 'Cognida.ai · Software/AI Developer · 2022–2024',
		title: 'Finding subrogation cases a rule engine missed',
		text: 'Unsupervised anomaly detection over millions of health insurance claims, from PySpark features to a distance-based score that went to production.',
		domain: 'insurance' as Domain,
		res: '+8%',
		resNote: 'new cases flagged',
	},
];

export default function CaseStudies() {
	return (
		<main className="wrap page-in">
			<div style={{ paddingTop: 48 }}>
				<p className="prompt">$ ls case-studies/</p>
				<h1 className="h1">Case studies</h1>
				<p className="prose">Longer write-ups of work done in a job: what the system was, which parts I built or maintained, the decisions, and how results were measured.</p>
			</div>
			<div className="cs-index">
				{items.map((i) => (
					<Link key={i.href} href={i.href} className="cs-item">
						<div>
							<p className="prompt" style={{ color: 'var(--muted)', fontSize: '.76rem' }}>{i.tag}</p>
							<div className="pj-head">
								<h2 className="h3" style={{ fontSize: '1.15rem' }}>{i.title}</h2>
								<DomainTag domain={i.domain} />
							</div>
							<p className="prose-sm">{i.text}</p>
						</div>
						<div className="res">
							{i.res}
							<small>{i.resNote}</small>
						</div>
					</Link>
				))}
			</div>
			<Footer />
		</main>
	);
}
