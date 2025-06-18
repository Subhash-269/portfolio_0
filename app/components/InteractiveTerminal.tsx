'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitHubService, GitHubStats } from '../utils/github';

interface TerminalLine {
	id: number;
	type: 'command' | 'output' | 'error';
	content: string;
	timestamp?: Date;
}

interface InteractiveTerminalProps {
	isPopup?: boolean;
	onClose?: () => void;
}

export default function InteractiveTerminal({ isPopup = false }: InteractiveTerminalProps) {
	const [lines, setLines] = useState<TerminalLine[]>([]);
	const [currentCommand, setCurrentCommand] = useState('');
	const [commandHistory, setCommandHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isTyping, setIsTyping] = useState(true);
	const nextIdRef = useRef(1); // Use ref for immediate access to current ID
	const inputRef = useRef<HTMLInputElement>(null);
	const terminalRef = useRef<HTMLDivElement>(null);

	// Helper function to get next unique ID
	const getNextId = () => {
		const id = nextIdRef.current;
		nextIdRef.current += 1;
		return id;
	};	// Typing effect for initial messages
	useEffect(() => {		const welcomeMessages = [
			'Welcome to Venkat\'s Portfolio Terminal v2.0',
			'Initializing interactive environment...',
			'Loading GitHub integration... Complete',
			'System ready! Type "help" to see available commands',
		];

		let messageIndex = 0;
		let charIndex = 0;
		let currentMessage = '';
		let currentLineId = getNextId(); // Get ID for the current line being typed

		const typeMessage = () => {
			if (messageIndex < welcomeMessages.length) {
				if (charIndex < welcomeMessages[messageIndex].length) {
					currentMessage += welcomeMessages[messageIndex][charIndex];
					setLines(prev => {
						const newLines = [...prev];
						const existingLineIndex = newLines.findIndex(line => line.id === currentLineId);
						
						if (existingLineIndex !== -1) {
							// Update existing line
							newLines[existingLineIndex] = {
								id: currentLineId,
								type: 'output',
								content: currentMessage
							};
						} else {
							// Add new line
							newLines.push({
								id: currentLineId,
								type: 'output',
								content: currentMessage
							});
						}
						return newLines;
					});
					charIndex++;
					setTimeout(typeMessage, 30);
				} else {
					// Move to next message
					messageIndex++;
					charIndex = 0;
					currentMessage = '';
					// Get new ID for next line
					currentLineId = getNextId();
					setTimeout(typeMessage, 500);
				}
			} else {
				setIsTyping(false);
			}
		};

		const timer = setTimeout(typeMessage, 1000);
		return () => clearTimeout(timer);
	}, []);

	// Auto-focus terminal input
	useEffect(() => {
		const handleClick = () => inputRef.current?.focus();
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, []);

	// Scroll to bottom when new lines are added
	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}	}, [lines]);
	
	// Simulate GitHub API call (replace with real API call)
	const fetchGitHubStats = async (): Promise<GitHubStats> => {
		try {
			// Try to fetch real GitHub data
			const stats = await GitHubService.fetchGitHubStats();
			return stats || GitHubService.getMockStats();
		} catch {
			// Fallback to mock data
			return GitHubService.getMockStats();		}
	};

	// Available commands
	const commands = {		help: () => [
			'Available commands:',
			'',
			'  help          - Show this help message',
			'  about         - Learn about me',
			'  skills        - Display technical skills',
			'  experience    - Work experience summary',
			'  projects      - Show my projects',
			'  github        - GitHub statistics',
			'  contact       - Get contact information',
			'  resume        - Download resume',
			'  clear         - Clear terminal',
			'  history       - Show command history',
			'  whoami        - Display user info',
			'  date          - Show current date/time',
			'  weather       - Current weather info',
			'  joke          - Tell a programming joke',
			'',
			'Navigation:',
			'  • Use UP/DOWN arrows for command history',
			'  • Press Ctrl+` or click Terminal button to toggle',
			'  • Press ESC to close terminal',
		],about: () => [
			'[ABOUT] Venkat Neelraj Nitta',
			'',
			'AI/ML Engineer with 2.5+ years at Cognida.AI, now pursuing',
			'Master\'s in Applied Machine Intelligence at Northeastern University.',
			'',
			'Background:',
			'   • Originally from Vizag, India',
			'   • Worked full-time in Hyderabad (2022-2024)',
			'   • Currently based in Boston, MA',
			'',
			'Experience:',
			'   • Full-time Software Developer at Cognida.AI (Jul 2022 - Jul 2024)',
			'   • Internship at Cognida.AI (Feb 2022 - Jun 2022)',
			'   • Built enterprise AI systems, NLP models, document processing',
			'',
			'Education:',
			'   • Master\'s in Applied Machine Intelligence (2024-2026) - NEU',
			'   • B.Tech in Electrical and Electronics Engineering (2018-2022)',
			'',
			'Achievements:',
			'   • 78% improvement in customer satisfaction',
			'   • 60% cost savings through AI automation',
			'   • 100% accuracy in document processing systems',
		],		skills: () => [
			'[TECHNICAL SKILLS]',
			'',
			'Programming Languages:',
			'   Python           ████████████ 95%',
			'   SQL              ██████████   80%',
			'   R                ████████     70%',
			'',
			'AI/ML Technologies:',
			'   PyTorch          ████████████ 90%',
			'   NLP              ██████████   80%',
			'   Computer Vision  ███████████  85%',
			'   TensorFlow       ██████████   75%',
			'',
			'Web & APIs:',
			'   FastAPI          ████████████ 90%',
			'   Django           ██████████   80%',
			'   REST APIs        ███████████  85%',
			'',
			'Cloud & DevOps:',
			'   AWS              ████████     65%',
			'   Docker           ██████████   80%',
			'   Linux            ██████████   75%',
			'',
			'Specializations:',
			'   • Conversational AI Systems',			'   • Document Processing Automation',
			'   • Real-time NLP Applications',
			'   • Computer Vision for Document Analysis',
		],
		experience: () => [
			'[WORK EXPERIENCE]',
			'',
			'Software Developer | Cognida.AI',
			'   Duration: Jul 2022 - Jul 2024 (Full-time)',
			'   Location: Hyderabad, India',
			'   Projects: 3 major AI/ML implementations',
			'',
			'Key Achievements:',
			'   • Developed enterprise conversational AI chatbot',
			'   • Created AI-powered document preprocessing system',
			'   • Led AI team in cheque processing optimization',
			'   • Reduced customer query resolution from 10 days to minutes',
			'   • Achieved 78% improvement in customer satisfaction',
			'   • Delivered 60% cost savings through AI automation',
			'   • Maintained 100% accuracy in document processing',
			'',
			'Software Developer Internship | Cognida.AI',
			'   Duration: Feb 2022 - Jun 2022 (Internship)',
			'   Location: Hyderabad, India',
			'   Project:  NLP-based Grammar and Spell Correction System',
			'',
			'Total Experience: 2.5+ years in AI/ML development',
			'Current Status:   Graduate Student at Northeastern University',
		],
		history: () => commandHistory.length > 0 ? [
			'Command History:',
			...commandHistory.slice(-10).map((cmd, i) => `${commandHistory.length - 10 + i + 1}. ${cmd}`)
		] : ['No command history yet. Start typing some commands!'],		weather: () => [
			'[WEATHER] Boston, MA:',
			'',
			`Temperature: ${Math.floor(Math.random() * 30) + 20}°F`,
			`Condition: ${['Sunny', 'Cloudy', 'Rainy', 'Snow'][Math.floor(Math.random() * 4)]}`,
			`Humidity: ${Math.floor(Math.random() * 40) + 40}%`,
			`Wind: ${Math.floor(Math.random() * 15) + 5} mph`,
			'',
			'Note: Simulated data for demonstration purposes',
		],		joke: () => {
			const jokes = [
				'Why do programmers prefer dark mode? Because light attracts bugs!',
				'How many programmers does it take to change a light bulb? None, that\'s a hardware problem!',
				'Why don\'t programmers like nature? It has too many bugs!',
				'What\'s a programmer\'s favorite hangout place? Foo Bar!',
				'Why did the programmer quit his job? He didn\'t get arrays!',
				'There are only 10 types of people: those who understand binary and those who don\'t.',
				'A SQL query goes into a bar, walks up to two tables and asks: "Can I join you?"',
			];
			return ['[PROGRAMMING JOKE]', '', jokes[Math.floor(Math.random() * jokes.length)]];		},		projects: () => [
			'[FEATURED PROJECTS]',
			'',
			'1. Enterprise Conversational AI Chatbot',
			'   Company: Cognida.AI (2022-2024)',
			'   Impact:  Reduced customer query resolution from 10 days to minutes',
			'   Result:  78% improvement in customer satisfaction',
			'',
			'2. AI-Powered Document Preprocessing System',
			'   Company: Cognida.AI (2022-2024)',
			'   Impact:  Achieved 100% compliance rate, 90% faster processing',
			'   Result:  60% cost savings through workflow optimization',
			'',
			'3. Automated Cheque Processing Model',
			'   Company: Cognida.AI (2022-2024)',
			'   Impact:  100% key data extraction accuracy',
			'   Result:  Processing time reduced to 7 seconds per cheque',
			'',
			'4. Smart Cart App',
			'   Event:   Northeastern Innovaite 2025 (48-hour hackathon)',
			'   Team:    Led team of 5 developers',
			'   Tech:    Django, PostgreSQL, React, Google Gemini API',
			'',
			'5. CIFAR-10 Image Classification Web App',
			'   Tech:    PyTorch, FastAPI, Streamlit',
			'   Result:  94% accuracy with sub-100ms inference',
			'   Live:    Available at cifar-image-classifier.streamlit.app',
			'',
			'Visit the Projects section for more details and live demos.',
		],		contact: () => [
			'[CONTACT INFORMATION]',
			'',
			'Email:     vneelraj.nitta@gmail.com',
			'Location:  Boston, MA (EST Timezone)',
			'GitHub:    github.com/Subhash-269',
			'LinkedIn:  linkedin.com/in/venkat-neelraj-nitta',
			'',
			'Current Status:',
			'   • Graduate Student at Northeastern University',
			'   • Actively seeking Summer 2025 internships',
			'   • Open to AI/ML and Software Engineering roles',
			'',
			'Response Time: Usually within 24 hours',
			'Best Contact: Email for professional inquiries',
		],		resume: () => {
			// Trigger resume download
			const link = document.createElement('a');
			link.href = '/resume/VenkatNeelraj.pdf';
			link.download = 'VenkatNeelraj_Resume.pdf';
			link.click();
			return ['[RESUME DOWNLOAD]', 'Resume download initiated...', 'Check your downloads folder for VenkatNeelraj_Resume.pdf'];		},
		whoami: () => ['venkat@portfolio:~$ You are viewing Venkat Neelraj Nitta\'s portfolio'],
		date: () => [new Date().toString()],
		clear: () => {
			setLines([]);
			return [];
		},
		github: async () => {					if (!githubStats) {
				setIsLoading(true);
				try {
					const stats = await fetchGitHubStats();
					setGithubStats(stats);
					setIsLoading(false);
					return [
						'[GITHUB STATISTICS]',
						'',
						`Username: ${stats.user.name} (@${stats.user.login})`,
						`Public Repositories: ${stats.user.public_repos}`,
						`Total Stars: ${stats.totalStars}`,
						`Total Forks: ${stats.totalForks}`,
						`Followers: ${stats.user.followers}`,
						`Following: ${stats.user.following}`,
						'',
						'Top Languages:',
						...Object.entries(stats.languages)
							.sort(([,a], [,b]) => b - a)
							.slice(0, 5)
							.map(([lang, count]) => `   ${lang}: ${count} repos`),
						'',
						'Recent Activity:',
						...stats.recentActivity.slice(0, 3).map(activity => `   • ${activity}`),
						'',
						'Top Repositories:',
						...stats.repos.slice(0, 3).map(repo => 
							`   ${repo.name} - Stars: ${repo.stars} | Forks: ${repo.forks} (${repo.language})`
						),
					];				} catch {
					setIsLoading(false);
					return ['[ERROR] Failed to fetch GitHub stats. Please try again later.'];
				}
			} else {
				return [
					'[GITHUB STATISTICS]',
					'',
					`Username: ${githubStats.user.name} (@${githubStats.user.login})`,
					`Public Repositories: ${githubStats.user.public_repos}`,
					`Total Stars: ${githubStats.totalStars}`,
					`Total Forks: ${githubStats.totalForks}`,
					`Followers: ${githubStats.user.followers}`,
					`Following: ${githubStats.user.following}`,
					'',
					'Top Languages:',
					...Object.entries(githubStats.languages)
						.sort(([,a], [,b]) => b - a)
						.slice(0, 5)
						.map(([lang, count]) => `   ${lang}: ${count} repos`),
				];
			}
		},
		metrics: () => [
			'Live Portfolio Metrics:',
			'',
			`Page Views: ${Math.floor(Math.random() * 1000) + 500}`,
			`Unique Visitors: ${Math.floor(Math.random() * 200) + 100}`,
			`Resume Downloads: ${Math.floor(Math.random() * 50) + 25}`,
			`Average Session: ${Math.floor(Math.random() * 5) + 2}min`,
			`Bounce Rate: ${Math.floor(Math.random() * 30) + 15}%`,
			`Top Referrer: GitHub`,
			'',
			'Geographic Distribution:',
			'   🇺🇸 USA: 45%',
			'   🇮🇳 India: 25%',
			'   🇨🇦 Canada: 15%',
			'   🌍 Others: 15%',
		],
	};

	const executeCommand = async (cmd: string) => {
		const trimmedCmd = cmd.trim().toLowerCase();
		
		// Add command to history
		if (cmd.trim()) {
			setCommandHistory(prev => [...prev, cmd]);
		}

		// Add command line
		setLines(prev => [...prev, { 
			id: getNextId(), 
			type: 'command', 
			content: `$ ${cmd}`,
			timestamp: new Date()
		}]);

		// Handle loading state for async commands
		if (trimmedCmd === 'github' && !githubStats) {
			setLines(prev => [...prev, { 
				id: getNextId(), 
				type: 'output', 
				content: 'Fetching GitHub statistics...'
			}]);
		}

		// Execute command
		if (commands[trimmedCmd as keyof typeof commands]) {
			try {
				const result = await commands[trimmedCmd as keyof typeof commands]();
				if (result && result.length > 0) {
					const outputLines = result.map((line) => ({
						id: getNextId(),
						type: 'output' as const,
						content: line
					}));
					setLines(prev => trimmedCmd === 'clear' ? outputLines : [...prev, ...outputLines]);
				}
			} catch (error) {
				setLines(prev => [...prev, { 
					id: getNextId(), 
					type: 'error', 
					content: `Error executing command: ${error}`
				}]);
			}
		} else {
			setLines(prev => [...prev, { 
				id: getNextId(), 
				type: 'error', 
				content: `Command not found: ${cmd}. Type "help" for available commands.`
			}]);
		}

		setCurrentCommand('');
		setHistoryIndex(-1);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			executeCommand(currentCommand);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (commandHistory.length > 0) {
				const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
				setHistoryIndex(newIndex);
				setCurrentCommand(commandHistory[newIndex]);
			}
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (historyIndex !== -1) {
				const newIndex = historyIndex === commandHistory.length - 1 ? -1 : historyIndex + 1;
				setHistoryIndex(newIndex);
				setCurrentCommand(newIndex === -1 ? '' : commandHistory[newIndex]);
			}
		}
	};	return (
		<div className={`${isPopup ? 'h-full' : 'py-12 sm:py-20 px-4'}`}>
			<div className={`${isPopup ? 'h-full' : 'max-w-4xl mx-auto'}`}>
				{!isPopup && (
					<motion.h2 
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="text-2xl sm:text-3xl font-bold mb-8 text-center text-green-400"
					>
						Interactive Terminal
					</motion.h2>
				)}
				
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className={`bg-black/90 backdrop-blur-lg rounded-lg border border-gray-800 overflow-hidden ${
						isPopup ? 'h-full flex flex-col' : ''
					}`}
				>
					{!isPopup && (
						<div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
							<div className="w-3 h-3 rounded-full bg-red-500" />
							<div className="w-3 h-3 rounded-full bg-yellow-500" />
							<div className="w-3 h-3 rounded-full bg-green-500" />
							<span className="ml-4 text-sm text-gray-400 font-mono">venkat@portfolio:~</span>
						</div>
					)}

					{/* Terminal Content */}
					<div 
						ref={terminalRef}
						className={`overflow-y-auto p-4 font-mono text-sm ${
							isPopup ? 'flex-1' : 'h-96'
						}`}
						onClick={() => inputRef.current?.focus()}
					>
						<AnimatePresence>
							{lines.map((line) => (
								<motion.div
									key={line.id}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className={`mb-1 ${
										line.type === 'command' 
											? 'text-green-400' 
											: line.type === 'error' 
											? 'text-red-400' 
											: 'text-gray-300'
									}`}
								>
									{line.content}
								</motion.div>
							))}
						</AnimatePresence>

						{/* Loading indicator */}
						{isLoading && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="flex items-center gap-2 text-green-400"
							>
								<div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full" />
								<span>Loading...</span>
							</motion.div>
						)}						{/* Command Input */}
						{!isTyping && (
							<div className="flex items-center gap-2 text-green-400">
								<span>$</span>
								<input
									ref={inputRef}
									type="text"
									value={currentCommand}
									onChange={(e) => setCurrentCommand(e.target.value)}
									onKeyDown={handleKeyDown}
									className="bg-transparent outline-none flex-1 text-green-400 font-mono"
									placeholder="Type a command..."
									autoFocus
								/>
								<div className="w-2 h-4 bg-green-400 animate-pulse" />
							</div>
						)}
						
						{isTyping && (
							<div className="flex items-center gap-2 text-green-400">
								<span>$</span>
								<div className="w-2 h-4 bg-green-400 animate-pulse" />
							</div>
						)}
					</div>
				</motion.div>

				{/* Quick Commands */}				{/* Quick Commands */}
				{!isPopup && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="mt-6 flex flex-wrap gap-2 justify-center"
					>
						{['help', 'about', 'skills', 'experience', 'projects', 'contact', 'resume', 'joke'].map((cmd) => (
							<button
								key={cmd}
								onClick={() => executeCommand(cmd)}
								className="px-3 py-1 bg-green-500/10 text-green-400 rounded border border-green-500/20 hover:bg-green-500/20 transition-colors text-sm font-mono"
							>
								{cmd}
							</button>
						))}
					</motion.div>
				)}
			</div>
		</div>
	);
}
