import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '../../site/Footer';
import OrgLogo from '../../site/OrgLogo';

export const metadata: Metadata = { title: 'Cognida case study' };

export default function Cognida() {
	return (
		<main className="wrap page-in">
			<div style={{ paddingTop: 48 }}>
				<p className="prompt">
					<Link href="/case-studies">case-studies/</Link>cognida
				</p>
				<h1 className="h1" style={{ maxWidth: '24ch' }}>Finding subrogation cases a rule engine missed</h1>
				<dl className="facts">
					<dt>role</dt>
					<dd><OrgLogo org="cognida" size={14} />Software/AI Developer, Cognida.ai, Hyderabad, India</dd>
					<dt>when</dt>
					<dd>Jul 2022 – Aug 2024</dd>
					<dt>stack</dt>
					<dd>Python, PySpark, topic modeling, K-means, SQL</dd>
				</dl>
			</div>

			<div className="cs">
				<div className="l">Context</div>
				<div className="r">
					<p className="prose">
						Subrogation means recovering a claim payment from the party actually responsible for it. The client screened health insurance claims with a rule engine, which caught the obvious cases and missed the rest.
					</p>
				</div>

				<div className="l">Approach</div>
				<div className="r">
					<ol className="steps">
						<li><span>1</span>PySpark feature engineering over millions of claims</li>
						<li><span>2</span>Topic modeling over diagnosis and procedure codes, so related codes group together</li>
						<li><span>3</span>K-means clustering on the combined features</li>
						<li><span>4</span>A distance-based anomaly score: claims far from their cluster are flagged for review</li>
					</ol>
				</div>

				<div className="l">Result</div>
				<div className="r">
					<div className="stats">
						<div><strong>+8%</strong><span>additional new cases flagged for investigation</span></div>
					</div>
					<p className="prose-sm" style={{ marginTop: 12 }}>Shipped to production alongside the existing rule engine.</p>
				</div>

				<div className="l">Other work there</div>
				<div className="r">
					<ul className="steps">
						<li><span>·</span>Retrieval and embedding-based RAG for financial document search, evaluated on retrieval accuracy</li>
						<li><span>·</span>Computer vision and OCR classification models for an AI inspection platform, monitored in production</li>
						<li><span>·</span>Fine-tuned and quantized an LLM for an insurance-company chatbot to lower serving cost</li>
						<li><span>·</span>Compared AWS and Azure for model serving, and helped set up Git, CI/CD and MLOps practices</li>
					</ul>
				</div>
			</div>
			<Footer />
		</main>
	);
}
