'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
	onComplete: () => void;
}

interface MatrixParticle {
	id: number;
	left: number;
	top: number;
	duration: number;
	delay: number;
	text: string;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [isComplete, setIsComplete] = useState(false);
	const [matrixParticles, setMatrixParticles] = useState<MatrixParticle[]>([]);

	// Generate matrix particles on client side only
	useEffect(() => {
		const particles: MatrixParticle[] = Array.from({ length: 20 }, (_, i) => ({
			id: i,
			left: Math.random() * 100,
			top: Math.random() * 100,
			duration: 2 + Math.random() * 2,
			delay: Math.random() * 2,
			text: Math.random() > 0.5 ? '01' : '10',
		}));
		setMatrixParticles(particles);
	}, []);
	const bootSequence = useMemo(() => [
		{ text: 'Initializing Venkat\'s Portfolio System...', delay: 800 },
		// { text: '> Loading core modules...', delay: 600 },
		// { text: '> Connecting to GitHub API...', delay: 700 },
		{ text: '> Loading project data...', delay: 500 },
		// { text: '> Initializing terminal interface...', delay: 600 },
		// { text: '> Loading AI chatbot...', delay: 500 },
		// { text: '> Optimizing animations...', delay: 400 },
		// { text: '> Checking Boston weather...', delay: 300 },
		// { text: '> System ready!', delay: 800 },
		{ text: '> Welcome to Venkat\'s Digital Space 🚀', delay: 1000 }
	], []);
	useEffect(() => {
		if (currentStep < bootSequence.length) {
			const timer = setTimeout(() => {
				setCurrentStep(prev => prev + 1);
			}, bootSequence[currentStep]?.delay || 500);

			return () => clearTimeout(timer);
		} else {
			// Boot sequence complete, wait a moment then fade out
			const timer = setTimeout(() => {
				setIsComplete(true);
				setTimeout(() => {
					onComplete();
				}, 800);
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [currentStep, onComplete, bootSequence]);

	return (
		<AnimatePresence>
			{!isComplete && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.8 }}
					className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden"
				>					{/* Matrix-style background effect */}
					<div className="absolute inset-0 opacity-10">
						<div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent" />
						{matrixParticles.map((particle) => (
							<motion.div
								key={particle.id}
								className="absolute text-green-400 text-xs font-mono opacity-30"
								style={{
									left: `${particle.left}%`,
									top: `${particle.top}%`,
								}}
								animate={{
									y: [0, -20, 0],
									opacity: [0.3, 0.1, 0.3],
								}}
								transition={{
									duration: particle.duration,
									repeat: Infinity,
									delay: particle.delay,
								}}
							>
								{particle.text}
							</motion.div>
						))}
					</div>

					{/* Main loading content */}
					<div className="relative z-10 max-w-2xl mx-auto px-8">
						{/* Logo/Title */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center mb-12"
						>
							<div className="text-6xl mb-4">💻</div>
							<h1 className="text-3xl font-bold text-green-400 font-mono mb-2">
								VENKAT.SYS
							</h1>
							<p className="text-gray-400 text-sm">v2.0.25 - Portfolio</p>
						</motion.div>

						{/* Terminal Window */}
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="bg-black/80 backdrop-blur-lg border border-green-500/30 rounded-lg overflow-hidden"
						>
							{/* Terminal Header */}
							<div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
								<div className="w-3 h-3 rounded-full bg-red-500" />
								<div className="w-3 h-3 rounded-full bg-yellow-500" />
								<div className="w-3 h-3 rounded-full bg-green-500" />
								<span className="ml-4 text-sm text-gray-400 font-mono">system@portfolio</span>
							</div>

							{/* Terminal Content */}
							<div className="p-6 min-h-[300px] font-mono text-sm">
								{bootSequence.slice(0, currentStep).map((step, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3 }}
										className={`mb-2 ${
											index === bootSequence.length - 1 
												? 'text-green-400 font-bold' 
												: index === bootSequence.length - 2
												? 'text-blue-400'
												: 'text-gray-300'
										}`}
									>
										{step.text}
										{index === currentStep - 1 && (
											<motion.span
												animate={{ opacity: [1, 0, 1] }}
												transition={{ duration: 0.8, repeat: Infinity }}
												className="ml-1 text-green-400"
											>
												_
											</motion.span>
										)}
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Progress Bar */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1 }}
							className="mt-8"
						>
							<div className="flex justify-between text-sm text-gray-400 mb-2">
								<span>Loading Progress</span>
								<span>{Math.round((currentStep / bootSequence.length) * 100)}%</span>
							</div>
							<div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
								<motion.div
									className="h-full bg-gradient-to-r from-green-500 to-blue-500"
									initial={{ width: 0 }}
									animate={{ width: `${(currentStep / bootSequence.length) * 100}%` }}
									transition={{ duration: 0.5 }}
								/>
							</div>
						</motion.div>

						{/* Loading dots */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
							className="flex justify-center mt-6 space-x-2"
						>
							{[0, 1, 2].map((i) => (
								<motion.div
									key={i}
									className="w-2 h-2 bg-green-400 rounded-full"
									animate={{
										scale: [1, 1.2, 1],
										opacity: [0.5, 1, 0.5],
									}}
									transition={{
										duration: 1,
										repeat: Infinity,
										delay: i * 0.2,
									}}
								/>
							))}
						</motion.div>
					</div>

					{/* Subtle hint text */}
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 2 }}
						className="absolute bottom-8 text-center text-gray-500 text-xs"
					>
						Tip: Press Ctrl+` to open terminal anywhere on the site
					</motion.p>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
