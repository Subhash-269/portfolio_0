import { person } from './data';

export default function Footer() {
	return (
		<footer className="foot">
			<a className="go" href={person.resume}>
				$ open resume.pdf
			</a>
			<span>{person.email}</span>
			<a href={person.linkedin}>linkedin.com/in/v-neelraj-nitta</a>
			<a href={person.github}>github.com/Subhash-269</a>
		</footer>
	);
}
