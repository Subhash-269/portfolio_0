'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { person } from './data';

const NAV = [
	{ href: '/', label: 'work' },
	{ href: '/case-studies', label: 'case studies' },
	{ href: '/projects', label: 'projects' },
	{ href: '/experience', label: 'experience' },
];

type Mode = 'light' | 'dark' | 'system';

function applyTheme(mode: Mode) {
	const root = document.documentElement;
	if (mode === 'system') root.removeAttribute('data-site-theme');
	else root.setAttribute('data-site-theme', mode);
	try {
		localStorage.setItem('site-theme', mode);
	} catch {
		/* storage blocked: theme still applies for this visit */
	}
}

export default function Header() {
	const path = usePathname();
	const [mode, setMode] = useState<Mode>('system');

	useEffect(() => {
		let saved: Mode = 'system';
		try {
			saved = (localStorage.getItem('site-theme') as Mode) || 'system';
		} catch {
			/* ignore */
		}
		setMode(saved);
	}, []);

	const choose = (m: Mode) => {
		setMode(m);
		applyTheme(m);
	};

	const isOn = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));

	return (
		<header className="hdr">
			<div className="hdr-in">
				<Link href="/" className="hdr-name">
					<b>{person.handle}</b> neelraj nitta
				</Link>
				<nav aria-label="Main">
					<ul>
						{NAV.map((n) => (
							<li key={n.href}>
								<Link href={n.href} aria-current={isOn(n.href) ? 'page' : undefined}>
									{n.label}
								</Link>
							</li>
						))}
						<li>
							<a href={person.resume}>resume.pdf</a>
						</li>
					</ul>
				</nav>
				<div className="hdr-right">
					<div className="theme" role="group" aria-label="Theme">
						{(['light', 'dark', 'system'] as Mode[]).map((m) => (
							<button key={m} type="button" aria-pressed={mode === m} onClick={() => choose(m)}>
								{m}
							</button>
						))}
					</div>
				</div>
			</div>
		</header>
	);
}
