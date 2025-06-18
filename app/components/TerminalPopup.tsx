'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveTerminal from './InteractiveTerminal';

export default function TerminalPopup() {
	const [isOpen, setIsOpen] = useState(false);
	// Keyboard shortcut listener and custom event listener
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Ctrl + ` (backtick) to toggle terminal
			if ((e.ctrlKey || e.metaKey) && e.key === '`') {
				e.preventDefault();
				setIsOpen(!isOpen);
			}
			// Escape to close when terminal is open
			if (e.key === 'Escape' && isOpen) {
				setIsOpen(false);
			}
		};

		const handleToggleTerminal = () => {
			setIsOpen(!isOpen);
		};

		document.addEventListener('keydown', handleKeyDown);
		window.addEventListener('toggleTerminal', handleToggleTerminal);
		
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('toggleTerminal', handleToggleTerminal);
		};
	}, [isOpen]);

	return (
		<>
			{/* Terminal Toggle Button - Fixed position */}
			<motion.button
				onClick={() => setIsOpen(true)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="fixed bottom-4 left-4 z-40 flex items-center gap-2 px-4 py-3 bg-black/80 backdrop-blur-lg text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/10 transition-colors shadow-lg group"
			>
				<div className="flex items-center gap-1">
					<div className="w-2 h-2 rounded-full bg-red-500" />
					<div className="w-2 h-2 rounded-full bg-yellow-500" />
					<div className="w-2 h-2 rounded-full bg-green-500" />
				</div>
				<span className="text-sm font-mono">Terminal</span>
				<span className="text-xs opacity-75 group-hover:opacity-100 transition-opacity">
					[Ctrl+`]
				</span>
			</motion.button>

			{/* Terminal Modal */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
							className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
						/>
						
						{/* Terminal Modal */}
						<motion.div
							initial={{ opacity: 0, scale: 0.9, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 20 }}
							transition={{ type: "spring", damping: 25, stiffness: 300 }}
							className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-20 z-50 flex flex-col bg-black/95 backdrop-blur-lg rounded-lg border border-green-500/30 shadow-2xl overflow-hidden"
						>							{/* Terminal Header */}
							<div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700">
								<div className="flex items-center gap-3">
									<div className="flex items-center gap-2">
										<button
											onClick={() => setIsOpen(false)}
											className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer relative group"
											title="Close terminal"
										>
											{/* Close icon that appears on hover */}
											<span className="absolute inset-0 flex items-center justify-center text-red-900 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
												×
											</span>
										</button>
										<div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" title="Minimize" />
										<div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" title="Maximize" />
									</div>
									<span className="text-sm text-gray-400 font-mono">
										venkat@portfolio:~
									</span>
								</div>
							</div>

							{/* Terminal Content */}
							<div className="flex-1 overflow-hidden">
								<InteractiveTerminal isPopup={true} onClose={() => setIsOpen(false)} />
							</div>						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}

