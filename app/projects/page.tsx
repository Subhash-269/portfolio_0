import type { Metadata } from 'next';
import Footer from '../site/Footer';
import ProjectsList from '../site/ProjectsList';
import { person } from '../site/data';
import OrgLogo from '../site/OrgLogo';

export const metadata: Metadata = { title: 'Projects' };

export default function Projects() {
	return (
		<main className="wrap page-in">
			<div style={{ paddingTop: 48 }}>
				<p className="prompt">$ ls projects/</p>
				<h1 className="h1">Projects</h1>
				<p className="prose">Things I built outside work to learn a stack end to end. Screenshots are from the running apps, except Chore Scheduler, which shows its mobile UI mockups.</p>
			</div>

			<ProjectsList />

			<p className="legend" style={{ marginTop: 32 }}>
				Coursework and smaller experiments: <a href={person.github}><OrgLogo org="github" size={13} />github.com/Subhash-269</a>
			</p>
			<Footer />
		</main>
	);
}
