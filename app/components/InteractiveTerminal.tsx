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

export default function InteractiveTerminal({ isPopup = false, onClose }: InteractiveTerminalProps) {
	const [lines, setLines] = useState<TerminalLine[]>([]);
	const [currentCommand, setCurrentCommand] = useState('');
	const [commandHistory, setCommandHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isTyping, setIsTyping] = useState(true);
	const inputRef = useRef<HTMLInputElement>(null);
	const terminalRef = useRef<HTMLDivElement>(null);

	// Typing effect for initial messages
	useEffect(() => {
		const welcomeMessages = [
			'Welcome to Venkat\'s Portfolio Terminal v2.0',
			'Initializing interactive environment...',
			'Loading GitHub integration... ✓',
			'Loading live metrics... ✓',
			'System ready! Type "help" to see available commands',
		];

		let messageIndex = 0;
		let charIndex = 0;
		let currentMessage = '';

		const typeMessage = () => {
			if (messageIndex < welcomeMessages.length) {
				if (charIndex < welcomeMessages[messageIndex].length) {
					currentMessage += welcomeMessages[messageIndex][charIndex];
					setLines(prev => {
						const newLines = [...prev];
						if (newLines.length === messageIndex + 1) {
							newLines[messageIndex] = {
								id: messageIndex + 1,
								type: 'output',
								content: currentMessage
							};
						} else {
							newLines.push({
								id: messageIndex + 1,
								type: 'output',
								content: currentMessage
							});
						}
						return newLines;
					});
					charIndex++;
					setTimeout(typeMessage, 30);
				} else {
					messageIndex++;
					charIndex = 0;
					currentMessage = '';
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
		}
	}, [lines]);
	// Simulate GitHub API call (replace with real API call)
	const fetchGitHubStats = async (): Promise<GitHubStats> => {
		try {
			// Try to fetch real GitHub data
			const stats = await GitHubService.fetchGitHubStats();
			return stats || GitHubService.getMockStats();
		} catch (error) {
			// Fallback to mock data
			return GitHubService.getMockStats();
		}
	};
	// Available commands
	const commands = {
		help: () => [
			'Available commands:',
			'  help          - Show this help message',
			'  about         - Learn about me',
			'  skills        - Display technical skills',
			'  projects      - Show my projects',
			'  github        - GitHub statistics',
			'  contact       - Get contact information',
			'  resume        - Download resume',
			'  metrics       - Live portfolio metrics',
			'  clear         - Clear terminal',
			'  history       - Show command history',
			'  whoami        - Display user info',
			'  date          - Show current date/time',
			'  weather       - Current weather info',
			'  joke          - Tell a programming joke',
			'  matrix        - Enter the Matrix...',
		],
		about: () => [
			'👨‍💻 Venkat Neelraj Nitta',
			'🎓 Graduate Student at Northeastern University',
			'🔬 Researcher & Engineer specializing in:',
			'   • Applied Machine Intelligence',
			'   • Data Science & AI',
			'   • Software Development',
			'   • Computer Vision & NLP',
			'',
			'Currently pursuing Master\'s in Applied Machine Intelligence at NEU',
			'',
			'🌟 Passionate about building AI solutions that make a real impact!',
		],
		skills: () => [
			'🛠️ Technical Skills:',
			'',
			'Languages:     Python ████████████ 95%',
			'               JavaScript ███████████ 85%',
			'               SQL ██████████ 80%',
			'               R ████████ 70%',
			'',
			'ML/AI:         PyTorch ████████████ 90%',
			'               TensorFlow ██████████ 75%',
			'               OpenCV ███████████ 85%',
			'               NLP ██████████ 80%',
			'',
			'Web:           FastAPI ████████████ 90%',
			'               React ██████████ 75%',
			'               Next.js █████████ 70%',
			'',
			'Cloud:         AWS ████████ 65%',
			'               Docker ██████████ 80%',
			'               Kubernetes ██████ 50%',
		],
		history: () => commandHistory.length > 0 ? [
			'Command History:',
			...commandHistory.slice(-10).map((cmd, i) => `${commandHistory.length - 10 + i + 1}. ${cmd}`)
		] : ['No command history yet. Start typing some commands!'],
		weather: () => [
			'🌤️ Weather in Boston, MA:',
			'',
			`Temperature: ${Math.floor(Math.random() * 30) + 20}°F`,
			`Condition: ${['Sunny', 'Cloudy', 'Rainy', 'Snow'][Math.floor(Math.random() * 4)]}`,
			`Humidity: ${Math.floor(Math.random() * 40) + 40}%`,
			`Wind: ${Math.floor(Math.random() * 15) + 5} mph`,
			'',
			'Perfect coding weather! ☕',
		],
		joke: () => {
			const jokes = [
				'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
				'How many programmers does it take to change a light bulb? None, that\'s a hardware problem! 💡',
				'Why don\'t programmers like nature? It has too many bugs! 🌳',
				'What\'s a programmer\'s favorite hangout place? Foo Bar! 🍺',
				'Why did the programmer quit his job? He didn\'t get arrays! 📊',
			];
			return [jokes[Math.floor(Math.random() * jokes.length)]];
		},
		matrix: () => [
			'Wake up, Neo... 💊',
			'The Matrix has you...',
			'Follow the white rabbit... 🐰',
			'',
			'⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⣷⣶⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
			'⠀⠀⠀⠀⠀⠀⠀⢰⣾⣿⣿⣿⣿⣿⣿⣷⣀⠀⣠⣾⣿⣿⣷⠀⠀⠀⠀⠀',
			'⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀',
			'⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀',
			'⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀',
			'⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠋⠉⠉⠀⠀⢸⣿⣿⣿⡟⠉⠉⠀⠀⠀⠀⠀',
			'Welcome to the real world! 🌍',
		],
		projects: () => [
			'🚀 Featured Projects:',
			'',
			'1. Conversational AI Chatbot',
			'   └ Reduced query resolution time from 10 days to minutes',
			'',
			'2. Cheque Processing Optimization',
			'   └ 100% accuracy, 40% efficiency improvement',
			'',
			'3. Electric Vehicle Insights Dashboard',
			'   └ Interactive Tableau visualization',
			'',
			'4. Image Classification Optimization',
			'   └ Enhanced ResNet-18 performance via quantization',
			'',
			'Type "project <number>" for details or visit the Projects section',
		],
		contact: () => [
			'📧 Contact Information:',
			'',
			'Email:     vneelraj.nitta@gmail.com',
			'Location:  Boston, MA',
			'GitHub:    github.com/Subhash-269',
			'LinkedIn:  Venkat Neelraj',
			'',
			'Feel free to reach out for collaboration opportunities!',
		],
		resume: () => {
			// Trigger resume download
			const link = document.createElement('a');
			link.href = '/resume/VenkatNeelraj.pdf';
			link.download = 'VenkatNeelraj_Resume.pdf';
			link.click();
			return ['📄 Resume download started...', 'Check your downloads folder!'];
		},
		whoami: () => ['venkat@portfolio:~$ You are viewing Venkat Neelraj Nitta\'s portfolio'],
		date: () => [new Date().toString()],
		clear: () => {
			setLines([]);
			return [];
		},		github: async () => {
			if (!githubStats) {
				setIsLoading(true);
				try {
					const stats = await fetchGitHubStats();
					setGithubStats(stats);
					setIsLoading(false);
					return [
						'📊 GitHub Statistics:',
						'',
						`Username: ${stats.user.name} (@${stats.user.login})`,
						`Public Repositories: ${stats.user.public_repos}`,
						`Total Stars: ${stats.totalStars}`,
						`Total Forks: ${stats.totalForks}`,
						`Followers: ${stats.user.followers}`,
						`Following: ${stats.user.following}`,
						'',
						'🔥 Top Languages:',
						...Object.entries(stats.languages)
							.sort(([,a], [,b]) => b - a)
							.slice(0, 5)
							.map(([lang, count]) => `   ${lang}: ${count} repos`),
						'',
						'� Recent Activity:',
						...stats.recentActivity.slice(0, 3).map(activity => `   • ${activity}`),
						'',
						'🏆 Top Repositories:',
						...stats.repos.slice(0, 3).map(repo => 
							`   ${repo.name} - ⭐${repo.stars} 🍴${repo.forks} (${repo.language})`
						),
					];
				} catch (error) {
					setIsLoading(false);
					return ['❌ Failed to fetch GitHub stats. Please try again later.'];
				}
			} else {
				return [
					'📊 GitHub Statistics:',
					'',
					`Username: ${githubStats.user.name} (@${githubStats.user.login})`,
					`Public Repositories: ${githubStats.user.public_repos}`,
					`Total Stars: ${githubStats.totalStars}`,
					`Total Forks: ${githubStats.totalForks}`,
					`Followers: ${githubStats.user.followers}`,
					`Following: ${githubStats.user.following}`,
					'',
					'🔥 Top Languages:',
					...Object.entries(githubStats.languages)
						.sort(([,a], [,b]) => b - a)
						.slice(0, 5)
						.map(([lang, count]) => `   ${lang}: ${count} repos`),
				];
			}
		},
		metrics: () => [
			'📈 Live Portfolio Metrics:',
			'',
			`Page Views: ${Math.floor(Math.random() * 1000) + 500}`,
			`Unique Visitors: ${Math.floor(Math.random() * 200) + 100}`,
			`Resume Downloads: ${Math.floor(Math.random() * 50) + 25}`,
			`Average Session: ${Math.floor(Math.random() * 5) + 2}min`,
			`Bounce Rate: ${Math.floor(Math.random() * 30) + 15}%`,
			`Top Referrer: GitHub`,
			'',
			'📍 Geographic Distribution:',
			'   🇺🇸 USA: 45%',
			'   🇮🇳 India: 25%',
			'   🇨🇦 Canada: 15%',
			'   🌍 Others: 15%',
		],
	};

	const executeCommand = async (cmd: string) => {
		const trimmedCmd = cmd.trim().toLowerCase();
		const newId = lines.length + 1;
		
		// Add command to history
		if (cmd.trim()) {
			setCommandHistory(prev => [...prev, cmd]);
		}

		// Add command line
		setLines(prev => [...prev, { 
			id: newId, 
			type: 'command', 
			content: `$ ${cmd}`,
			timestamp: new Date()
		}]);

		// Handle loading state for async commands
		if (trimmedCmd === 'github' && !githubStats) {
			setLines(prev => [...prev, { 
				id: newId + 1, 
				type: 'output', 
				content: '🔄 Fetching GitHub statistics...'
			}]);
		}

		// Execute command
		if (commands[trimmedCmd as keyof typeof commands]) {
			try {
				const result = await commands[trimmedCmd as keyof typeof commands]();
				if (result && result.length > 0) {
					const outputLines = result.map((line, index) => ({
						id: newId + index + 2,
						type: 'output' as const,
						content: line
					}));
					setLines(prev => trimmedCmd === 'clear' ? outputLines : [...prev, ...outputLines]);
				}
			} catch (error) {
				setLines(prev => [...prev, { 
					id: newId + 1, 
					type: 'error', 
					content: `Error executing command: ${error}`
				}]);
			}
		} else {
			setLines(prev => [...prev, { 
				id: newId + 1, 
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
						{['help', 'about', 'skills', 'github', 'projects', 'metrics', 'joke', 'matrix'].map((cmd) => (
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
