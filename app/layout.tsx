import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './contexts/ThemeContext';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Venkat Neelraj',
	description:
		'Welcome to my portfolio! I am a passionate backend developer specializing in building scalable server architectures, robust APIs, and high-performance distributed systems. With expertise in cloud infrastructure and database optimization, I create efficient and reliable backend solutions.',
	keywords: [
		'Backend Developer',
		'Software Engineer',
		// 'System Architecture',
		'API Development',
		'Database Design',
		// 'Cloud Computing',
		'Microservices',
		// 'DevOps',
		'Venkat Neelraj',
		// 'Node.js',
		'Python',
		// 'Java',
		// 'Distributed Systems',
		// 'System Design',
		// 'Backend Architecture',
	],
	authors: [{ name: 'Venkat Neelraj' }],
	creator: 'Venkat Neelraj',
	openGraph: {
		title: 'Venkat Neelraj - Portfolio',
		description: 'Passionate backend developer crafting scalable and efficient server architectures. Explore my projects and technical expertise.',
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
		title: 'Venkat Neelraj - Backend Developer',
		description: 'Passionate backend developer crafting scalable and efficient server architectures. Explore my projects and technical expertise.',
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
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
