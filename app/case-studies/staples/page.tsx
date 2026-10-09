import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '../../site/Footer';
import OrgLogo from '../../site/OrgLogo';

export const metadata: Metadata = { title: 'Staples case study' };

export default function Staples() {
	return (
		<main className="wrap page-in">
			<div style={{ paddingTop: 48 }}>
				<p className="prompt">
					<Link href="/case-studies">case-studies/</Link>staples
				</p>
				<h1 className="h1" style={{ maxWidth: '24ch' }}>The retrieval and data layers under an agentic e-commerce system</h1>
				<dl className="facts">
					<dt>role</dt>
					<dd><OrgLogo org="staples" size={14} />AI Engineer Intern, Staples, Framingham, MA</dd>
					<dt>when</dt>
					<dd>Jan–Jul 2026</dd>
					<dt>team</dt>
					<dd>Small; sole owner of anything data-related</dd>
					<dt>stack</dt>
					<dd>SQL, Python, PySpark, Databricks, Delta Lake, Vector Search, Neo4j, PyTorch, Ray, LangChain</dd>
				</dl>
			</div>

			<div className="cs">
				<div className="l">Context</div>
				<div className="r">
					<p className="prose">
						A conversational agent had to answer questions like &ldquo;which printer works for a small law office&rdquo;. The catalog had no fields for use case, environment or buyer, so retrieval had nothing to filter on, and answers depended on how well the retrieval layer held up.
					</p>
				</div>

				<div className="l">Where my time went</div>
				<div className="r">
					<p className="prose">
						Most of it on the <b>retrieval layer</b> the agent queried: three Databricks Vector Search indexes split by content type (reviews and FAQ, descriptions and specifications) and a Neo4j product graph. I owned bug fixes and feature work on both, and added the product-to-product relationships (bought-together, compatibility) in the graph.
					</p>
					<p className="prose">
						I also owned the data path that fed it and built the SKU enrichment classifier.
					</p>
				</div>

				<div className="l">The three tag axes</div>
				<div className="r">
					<div className="tblwrap">
						<table className="tbl">
							<thead>
								<tr><th>axis</th><th>question it answers</th><th>example, for a printer</th></tr>
							</thead>
							<tbody>
								<tr><td>use case</td><td>What is it for?</td><td>Document printing vs thermal printing</td></tr>
								<tr><td>environment</td><td>Where will it be used?</td><td>Office, home, or a legal firm</td></tr>
								<tr><td>buyer persona</td><td>Who is buying it?</td><td>Office admin, employee, or student</td></tr>
							</tbody>
						</table>
					</div>
					<p className="prose-sm" style={{ marginTop: 10 }}>The tags land as columns on the Delta table and the agent uses them as retrieval filters. That is how enrichment and retrieval connect.</p>
				</div>

				<div className="l">Daily data path</div>
				<div className="r">
					<ol className="steps">
						<li><span>1</span>SQL consolidates 15+ Snowflake tables into one flattened Delta table in Databricks</li>
						<li><span>2</span>Only changed records refresh: about 5–10K of ~300K SKUs per run</li>
						<li><span>3</span>Validation checks run in both the SQL and the Python layers</li>
						<li><span>4</span>Only changed products are re-tagged, which cut the recurring cost further</li>
						<li><span>5</span>Failures alert, a dashboard tracks each run, and I was on call for it</li>
					</ol>
				</div>

				<div className="l">Decisions</div>
				<div className="r">
					<ol className="steps">
						<li><span>a</span><div><b>Pick the graph store by prototyping.</b> With no graph background, I built small versions in FalkorDB and Neo4j and compared them with Cosmos DB on cost, governance and customization. The team adopted Neo4j.</div></li>
						<li><span>b</span><div><b>Bootstrap the taxonomy with an LLM, then curate it by hand.</b> An LLM proposed tags over a stratified product sample; I added, edited and deleted until the three axes held up.</div></li>
						<li><span>c</span><div><b>Train a small model and keep the LLM for hard cases.</b> A fine-tuned multi-label DeBERTa classifier tags most SKUs; low-confidence ones go to an LLM that picks a tag or proposes a new one.</div></li>
					</ol>
				</div>

				<div className="l">Results</div>
				<div className="r">
					<p className="prose-sm" style={{ marginBottom: 6 }}>Batch tagging time, ~300K products (drawn to scale)</p>
					<div className="bars">
						<div className="bar"><span>before</span><div className="track"><div className="fill" style={{ width: '100%' }} /></div><span className="v">~240 min</span></div>
						<div className="bar"><span>on Ray, 1 GPU node</span><div className="track"><div className="fill after" style={{ width: '37.5%' }} /></div><span className="v">90 min</span></div>
					</div>
					<div className="stats">
						<div><strong>0.8</strong><span>avg tagging accuracy</span></div>
						<div><strong>~0.7</strong><span>on the buyer-persona axis</span></div>
						<div><strong>3</strong><span>vector indexes maintained</span></div>
					</div>
					<p className="prose-sm" style={{ marginTop: 14 }}>
						Measured on labeled sets grounded in the internal taxonomy, with an LLM judge as a second signal. The work aimed to improve search relevance and product discovery.
					</p>
				</div>

				<div className="l">Communicating it</div>
				<div className="r">
					<p className="prose">I presented the pipeline architecture and model outputs to non-technical senior leadership, and proposed business directions from the data, including customer-acquisition channels it surfaced.</p>
				</div>
			</div>
			<Footer />
		</main>
	);
}
