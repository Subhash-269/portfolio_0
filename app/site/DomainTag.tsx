import { DOMAINS, type Domain } from './data';

export default function DomainTag({ domain }: { domain: Domain }) {
	return (
		<span className={`domain d-${domain}`}>
			<i aria-hidden="true" />
			{DOMAINS[domain]}
		</span>
	);
}
