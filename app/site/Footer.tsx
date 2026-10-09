import { person } from './data';
import OrgLogo from './OrgLogo';

export default function Footer() {
	return (
		<footer className="foot">
			<a className="go" href={person.resume}>
				$ open resume.pdf
			</a>
			<span className="hi">say hi to <b>Neel</b></span>
			<span>{person.email}</span>
			<a href={person.linkedin}>linkedin.com/in/v-neelraj-nitta</a>
			<a href={person.github}><OrgLogo org="github" size={14} />github.com/Subhash-269</a>
		</footer>
	);
}
