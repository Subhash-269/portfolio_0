'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HeroSection() {
	const [showUpArrow, setShowUpArrow] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// Show up arrow when user scrolls past the hero section
			const heroHeight = window.innerHeight;
			setShowUpArrow(window.scrollY > heroHeight * 0.8);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const openTerminal = () => {
		// Trigger terminal popup by dispatching a custom event
		window.dispatchEvent(new CustomEvent('toggleTerminal'));
	};

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Top Navigation Bar */}
			<motion.nav
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="absolute top-0 left-0 right-0 z-20 p-6"			>
				<div className="max-w-6xl mx-auto flex justify-between items-center">
					<motion.div
						whileHover={{ scale: 1.05 }}
						className="text-lg sm:text-xl font-bold text-green-400 font-mono cursor-pointer"
						onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					>
						VN.dev
					</motion.div>					<div className="flex items-center gap-2 sm:gap-4 md:gap-8">
						<motion.button
							whileHover={{ scale: 1.05, color: '#10b981' }}
							whileTap={{ scale: 0.95 }}
							onClick={openTerminal}
							className="text-gray-300 hover:text-green-400 transition-colors font-mono text-xs sm:text-sm flex items-center gap-1"
						>
							<span className="hidden sm:inline">Terminal</span>
							<span className="sm:hidden">Term</span>
							<span className="text-xs opacity-60">[`]</span>
						</motion.button>
						
						<motion.button
							whileHover={{ scale: 1.05, color: '#10b981' }}
							whileTap={{ scale: 0.95 }}
							onClick={() => {
								const projectsSection = document.querySelector('[data-section="projects"]');
								projectsSection?.scrollIntoView({ behavior: 'smooth' });
							}}
							className="text-gray-300 hover:text-green-400 transition-colors font-mono text-xs sm:text-sm"
						>
							<span className="hidden sm:inline">Projects & Hackathons</span>
							<span className="sm:hidden">Projects</span>
						</motion.button>
						
						<motion.button
							whileHover={{ scale: 1.05, color: '#10b981' }}
							whileTap={{ scale: 0.95 }}
							onClick={() => {
								const achievementsSection = document.querySelector('[data-section="achievements"]');								achievementsSection?.scrollIntoView({ behavior: 'smooth' });
							}}
							className="text-gray-300 hover:text-green-400 transition-colors font-mono text-xs sm:text-sm"
						>
							<span className="hidden sm:inline">Impact & Achievements</span>
							<span className="sm:hidden">Impact</span>
						</motion.button>
						
						<motion.button
							whileHover={{ scale: 1.05, color: '#10b981' }}
							whileTap={{ scale: 0.95 }}
							onClick={() => {
								const contactSection = document.querySelector('[data-section="contact"]');
								contactSection?.scrollIntoView({ behavior: 'smooth' });
							}}
							className="px-2 sm:px-4 py-2 bg-green-500/10 text-green-400 rounded-lg border border-green-500/20 hover:bg-green-500/20 transition-colors font-mono text-xs sm:text-sm"
						>
							Contact
						</motion.button>
					</div>
				</div>
			</motion.nav>

			<div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 opacity-10" />
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
			</div>			<div className="relative z-10 max-w-4xl w-full mx-4 px-2 sm:px-0">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="bg-black/50 backdrop-blur-lg rounded-lg border border-gray-800 p-4 sm:p-6"
				>
					<div className="flex items-center gap-2 mb-4">
						<div className="w-3 h-3 rounded-full bg-red-500" />
						<div className="w-3 h-3 rounded-full bg-yellow-500" />
						<div className="w-3 h-3 rounded-full bg-green-500" />
					</div>
					<div className="font-mono">
						<p className="text-green-500">$ whoami</p>						<h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mt-2 mb-4">Venkat Neelraj Nitta</h1>
						<p className="text-sm sm:text-base text-gray-400 mb-2">Graduate Student at Northeastern University</p>
						<p className="text-green-500">$ whoami.info</p>
						<p className="text-sm sm:text-base text-gray-400 mb-4">I am a researcher and engineer with a background in software development, data science, and AI, currently pursuing a Master&#39;s in Applied Machine Intelligence at NEU.</p>
						<p className="text-green-500">$ whoami.skills</p>
						<div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
							<span className="px-2 sm:px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-xs sm:text-sm">Python</span>
							<span className="px-2 sm:px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-xs sm:text-sm">PyTorch</span>
							<span className="px-2 sm:px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-xs sm:text-sm">FastAPI</span>
							<span className="px-2 sm:px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-xs sm:text-sm">Docker</span>
							<span className="px-2 sm:px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-xs sm:text-sm">SQL</span>
							<span className="px-2 sm:px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-xs sm:text-sm">Linux</span>
							<span className="px-2 sm:px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-xs sm:text-sm">Generative AI</span>
							<span className="px-2 sm:px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-xs sm:text-sm">OpenCV</span>
							<span className="px-2 sm:px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-xs sm:text-sm">NLP</span>
							<span className="px-2 sm:px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-xs sm:text-sm">Data Engineering</span>
						</div>
					</div>				</motion.div>
			</div>			{/* Down Arrow */}
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 1 }}
				className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
			>
				<motion.button
					onClick={() => {
						const nextSection = document.querySelector('section:nth-of-type(2)');
						nextSection?.scrollIntoView({ behavior: 'smooth' });
					}}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					animate={{ y: [0, 10, 0] }}
					transition={{ 
						y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
						scale: { duration: 0.2 }
					}}
					className="flex flex-col items-center gap-1 sm:gap-2 text-green-400 hover:text-green-300 transition-colors cursor-pointer group"
				>
					<span className="text-xs sm:text-sm font-mono opacity-75 group-hover:opacity-100 transition-opacity">Scroll Down</span>
					<svg 
						className="w-5 h-5 sm:w-6 sm:h-6" 
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path 
							strokeLinecap="round" 
							strokeLinejoin="round" 
							strokeWidth={2} 
							d="M19 14l-7 7m0 0l-7-7m7 7V3" 
						/>
					</svg>				</motion.button>
			</motion.div>

			{/* Up Arrow - Fixed position for global access */}
			{showUpArrow && (
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					transition={{ duration: 0.3 }}
					className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50"
				>
					<motion.button
						onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-full border border-green-500/30 backdrop-blur-lg shadow-lg transition-colors group"
					>
						<svg 
							className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-[-2px] transition-transform" 
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24"
						>
							<path 
								strokeLinecap="round" 
								strokeLinejoin="round" 
								strokeWidth={2} 
								d="M5 10l7-7m0 0l7 7m-7-7v18" 
							/>
						</svg>
					</motion.button>
				</motion.div>
			)}
		</section>
	);
}
