import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '../../site/Footer';
import OrgLogo from '../../site/OrgLogo';
import Shot from '../../site/Shot';

export const metadata: Metadata = { title: 'Chore Scheduler case study' };

const solvers = [
	{ name: 'MILP', how: 'Constraint matrix built by hand as a scipy.sparse matrix, solved with HiGHS. Variables decide who does each slot and which day a flexible chore fires.', why: 'The only one of the six with an optimality guarantee.' },
	{ name: 'Greedy', how: 'One forward pass, ranking people by most rested, then fewest of this chore, then fewest tasks overall.', why: 'Fast baseline, and the starting point for the three search methods.' },
	{ name: 'Simulated annealing', how: 'Swap moves with validity checks; temperature decays from 5.0 to near zero over 8,000 iterations; returns the best schedule seen.', why: 'Escapes local optima the greedy pass gets stuck in.' },
	{ name: 'Tabu search', how: 'Same moves and scoring as annealing, so only the acceptance rule differs. Tenure of 15 iterations, with an aspiration rule for record-beating moves.', why: 'A controlled comparison against annealing.' },
	{ name: 'Genetic algorithm', how: 'Population of 30 over 150 generations: uniform crossover with conflict repair, tournament selection of 4, mutation, and elitism of 2.', why: 'Explores many schedules at once; elitism means the best never regresses.' },
	{ name: 'Daily Hungarian', how: 'Each day becomes a task-by-person cost matrix solved as an exact bipartite matching, modeling the mop-after-sweep link explicitly.', why: 'Better joint picks on busy days than one-at-a-time choices.' },
];

const shots = [
	{ src: '/projects/chore-overview-v2.png', light: '/projects/chore-overview-v2-light.png', alt: 'Today, weekly calendar, household and setup screens', cap: 'Today, the weekly calendar, the household and chore setup' },
	{ src: '/projects/chore-solvers-v2.png', light: '/projects/chore-solvers-v2-light.png', alt: 'Six algorithms running, picking a schedule, fairness breakdown', cap: 'All six solvers run on the same rules; the user picks the result and can see how it was judged' },
	{ src: '/projects/chore-more-v2.png', light: '/projects/chore-more-v2-light.png', alt: 'Welcome, fridge board, notification digest', cap: 'Welcome, a printable fridge board and the notification digest' },
];

export default function ChoreScheduler() {
	return (
		<main className="wrap page-in">
			<div style={{ paddingTop: 48 }}>
				<p className="prompt">
					<Link href="/case-studies">case-studies/</Link>chore-scheduler
				</p>
				<h1 className="h1" style={{ maxWidth: '24ch' }}>One scheduling problem, solved six ways and cross-checked</h1>
				<dl className="facts">
					<dt>type</dt>
					<dd>Personal project, Aug 2026</dd>
					<dt>size</dt>
					<dd>About 2,000 lines of Python across optimizer, scheduler and orchestration</dd>
					<dt>stack</dt>
					<dd>Python, NumPy, SciPy (milp/HiGHS, linear_sum_assignment, sparse), PyYAML</dd>
					<dt>code</dt>
					<dd>
						<a href="https://github.com/Subhash-269/chore-scheduler">
							<OrgLogo org="github" size={13} />
							github.com/Subhash-269/chore-scheduler
						</a>
					</dd>
				</dl>
			</div>

			<div className="cs">
				<div className="l">The problem</div>
				<div className="r">
					<p className="prose">
						Five roommates, four chores on different rhythms: dishes daily, sweeping every 3 days, the stove every 10 days, and mopping on every second sweep day. The hard rules: one chore per person per day, nobody works on a day off, and each chore happens exactly once per window. On top of that sit competing fairness goals (total workload, each chore type, rest between tasks), and the schedule should continue smoothly from last month instead of resetting.
					</p>
					<p className="prose-sm">
						Hard rules plus several competing fairness goals plus state that carries across runs: no single algorithm is obviously right, which made it a good testbed for comparing them.
					</p>
				</div>

				<div className="l">Six solvers</div>
				<div className="r">
					<div className="tblwrap">
						<table className="tbl">
							<thead>
								<tr><th>solver</th><th>how it works here</th><th>why it&apos;s in the mix</th></tr>
							</thead>
							<tbody>
								{solvers.map((s) => (
									<tr key={s.name}>
										<td style={{ whiteSpace: 'nowrap' }}>{s.name}</td>
										<td>{s.how}</td>
										<td>{s.why}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="l">Decisions</div>
				<div className="r">
					<ol className="steps">
						<li><span>a</span><div><b>Two phases instead of one blended objective.</b> The MILP first minimizes how many soft rules have to bend, locks that minimum in, then optimizes fairness among the schedules that achieve it. That avoids weighting rest against fairness on mismatched scales.</div></li>
						<li><span>b</span><div><b>Fix rest without trading away correctness.</b> A beam-search repair layer (width 6, patience 10) runs on every solver&apos;s output and only accepts changes that fix rest gaps without making correctness or fairness worse.</div></li>
						<li><span>c</span><div><b>Rank, don&apos;t average.</b> The winner is chosen lexicographically: structural violations first, then rest violations, then rest balance, then fairness per chore, then overall fairness. The ranking is a recommendation; any of the six can be picked.</div></li>
						<li><span>d</span><div><b>Never trust the solver&apos;s own word.</b> Every winning schedule is re-validated from scratch: frequency windows, cadence, the mop-after-sweep placement, and days off.</div></li>
					</ol>
				</div>

				<div className="l">Month to month</div>
				<div className="r">
					<p className="prose">
						A state file carries three things between runs: rest still owed, where each chore is in its cycle, and cumulative fairness counts, so fairness is judged across the whole history. Rest owed is a soft constraint, so it can never make a schedule impossible. If the MILP does turn infeasible on a continuation run, a diagnostic re-solves with each carry-over isolated and reports which one caused it.
					</p>
				</div>

				<div className="l">The app</div>
				<div className="r">
					<p className="prose-sm" style={{ marginBottom: 10 }}>Mobile UI mockups from the repo&apos;s mobile-app branch. iOS and Android release planned.</p>
					{shots.map((sh) => (
						<figure key={sh.src} className="cs-shot">
							<Shot src={sh.src} light={sh.light} alt={sh.alt} sizes="(min-width: 860px) 60vw, 100vw" />
							<figcaption>{sh.cap}</figcaption>
						</figure>
					))}
				</div>
			</div>
			<Footer />
		</main>
	);
}
