import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import './site/site.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from './site/Header';

const plexMono = IBM_Plex_Mono({
	variable: '--font-plex-mono',
	subsets: ['latin'],
	weight: ['400', '500'],
});

const sourceSerif = Source_Serif_4({
	variable: '--font-source-serif',
	subsets: ['latin'],
	weight: ['400', '600'],
});

const description =
	'AI/ML engineer with 2+ years building ML and LLM systems in Python: retrieval, data pipelines and agents. MS in Applied Machine Intelligence at Northeastern, graduating December 2026.';

export const metadata: Metadata = {
	metadataBase: new URL('https://venkatneelraj.vercel.app'),
	title: {
		default: 'Venkat Neelraj Nitta · AI/ML Engineer',
		template: '%s · Venkat Neelraj Nitta',
	},
	description,
	keywords: ['AI Engineer', 'Machine Learning Engineer', 'Software Engineer', 'LLM', 'RAG', 'LangGraph', 'Databricks', 'PyTorch', 'Venkat Neelraj Nitta'],
	authors: [{ name: 'Venkat Neelraj Nitta' }],
	creator: 'Venkat Neelraj Nitta',
	openGraph: {
		title: 'Venkat Neelraj Nitta · AI/ML Engineer',
		description,
		url: 'https://venkatneelraj.vercel.app',
		siteName: 'Venkat Neelraj Nitta',
		images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Venkat Neelraj Nitta, AI/ML engineer' }],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Venkat Neelraj Nitta · AI/ML Engineer',
		description,
		images: ['/og-image.jpg'],
	},
	robots: { index: true, follow: true },
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#F5F6F3' },
		{ media: '(prefers-color-scheme: dark)', color: '#0E1113' },
	],
};

// Applies a saved light/dark choice before first paint so the page never flashes the wrong theme.
const themeScript = `try{var m=localStorage.getItem('site-theme');if(m==='light'||m==='dark'){document.documentElement.setAttribute('data-site-theme',m)}}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body className={`site ${plexMono.variable} ${sourceSerif.variable}`}>
				<Header />
				{children}
				<SpeedInsights />
			</body>
		</html>
	);
}
