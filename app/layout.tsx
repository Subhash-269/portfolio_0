import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './contexts/ThemeContext';
import MobileOptimizations from './components/MobileOptimizations';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Venkat Neelraj - Software Engineer | AI/ML Engineer',
	description:
		'Welcome to my portfolio! I am a software engineer and AI/ML specialist building production GenAI systems, scalable backend services, and machine learning pipelines. With expertise spanning agentic workflows, RAG, and cloud infrastructure, I build efficient and reliable end-to-end solutions.',
	keywords: [
		'Software Engineer',
		'AI/ML Engineer',
		'Machine Learning Engineer',
		'Data Scientist',
		'Backend Developer',
		'API Development',
		'LLM',
		'RAG',
		'LangChain',
		'Database Design',
		'Microservices',
		'Venkat Neelraj',
		'Python',
	],
	authors: [{ name: 'Venkat Neelraj' }],
	creator: 'Venkat Neelraj',
	viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#000000' }
	],
	openGraph: {
		title: 'Venkat Neelraj - Software Engineer | AI/ML Engineer Portfolio',
		description: 'Software engineer and AI/ML specialist building production GenAI systems and scalable backend services. Explore my projects and technical expertise.',
		url: 'https://your-domain.com',
		siteName: 'Venkat Neelraj - Portfolio',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Venkat Neelraj - Portfolio',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Venkat Neelraj - Software Engineer | AI/ML Engineer',
		description: 'Software engineer and AI/ML specialist building production GenAI systems and scalable backend services. Explore my projects and technical expertise.',
		creator: '@yourusername',
		images: ['/og-image.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider>
					<MobileOptimizations />
					{children}
				</ThemeProvider>
				<SpeedInsights />
			</body>
		</html>
	);
}
