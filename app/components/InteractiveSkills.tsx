'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
	name: string;
	category: 'languages' | 'ml-ai' | 'web' | 'cloud-tools' | 'databases';
	proficiency: number; // 0-100
	yearsOfExperience: number;
	icon: string;
	projects?: string[];
	description: string;
}

const skillsData: Skill[] = [
	// Languages
	{
		name: 'Python',
		category: 'languages',
		proficiency: 95,
		yearsOfExperience: 4,
		icon: '🐍',
		projects: ['AI Chatbot', 'Document Processor', 'ML Pipeline'],
		description: 'Primary language for AI/ML development and data science projects'
	},
	// {
	// 	name: 'JavaScript/TypeScript',
	// 	category: 'languages',
	// 	proficiency: 85,
	// 	yearsOfExperience: 3,
	// 	icon: '⚡',
	// 	projects: ['Portfolio Website', 'EV Dashboard'],
	// 	description: 'Full-stack web development and modern React applications'
	// },
	{
		name: 'SQL',
		category: 'languages',
		proficiency: 80,
		yearsOfExperience: 3,
		icon: '🗃️',
		projects: ['Data Analytics', 'Business Intelligence'],
		description: 'Database design, complex queries, and data analysis'
	},
	// {
	// 	name: 'R',
	// 	category: 'languages',
	// 	proficiency: 70,
	// 	yearsOfExperience: 2,
	// 	icon: '📊',
	// 	projects: ['Statistical Analysis', 'Data Visualization'],
	// 	description: 'Statistical computing and advanced data analysis'
	// },

	// ML/AI
	{
		name: 'PyTorch',
		category: 'ml-ai',
		proficiency: 90,
		yearsOfExperience: 3,
		icon: '🔥',
		projects: ['Neural Networks', 'Computer Vision'],
		description: 'Deep learning framework for research and production'
	},
	{
		name: 'TensorFlow',
		category: 'ml-ai',
		proficiency: 75,
		yearsOfExperience: 2,
		icon: '🧠',
		projects: ['Image Classification', 'NLP Models'],
		description: 'Machine learning and neural network development'
	},
	{
		name: 'OpenCV',
		category: 'ml-ai',
		proficiency: 85,
		yearsOfExperience: 2.5,
		icon: '👁️',
		projects: ['Document Processing', 'Computer Vision'],
		description: 'Computer vision and image processing applications'
	},
	{
		name: 'Scikit-learn',
		category: 'ml-ai',
		proficiency: 88,
		yearsOfExperience: 3,
		icon: '🔬',
		projects: ['ML Pipeline', 'Data Analysis'],
		description: 'Classical machine learning algorithms and data preprocessing'
	},

	// Web Technologies
	// {
	// 	name: 'React/Next.js',
	// 	category: 'web',
	// 	proficiency: 82,
	// 	yearsOfExperience: 2,
	// 	icon: '⚛️',
	// 	projects: ['Portfolio', 'Interactive Dashboards'],
	// 	description: 'Modern React development with server-side rendering'
	// },
	{
		name: 'FastAPI',
		category: 'web',
		proficiency: 90,
		yearsOfExperience: 2.5,
		icon: '🚀',
		projects: ['API Development', 'Microservices'],
		description: 'High-performance APIs and backend development'
	},
	// {
	// 	name: 'Node.js',
	// 	category: 'web',
	// 	proficiency: 75,
	// 	yearsOfExperience: 2,
	// 	icon: '💚',
	// 	projects: ['Backend Services', 'Real-time Apps'],
	// 	description: 'Server-side JavaScript and real-time applications'
	// },

	// Cloud & Tools
	// {
	// 	name: 'AWS',
	// 	category: 'cloud-tools',
	// 	proficiency: 75,
	// 	yearsOfExperience: 2,
	// 	icon: '☁️',
	// 	projects: ['Cloud Deployment', 'Data Pipeline'],
	// 	description: 'Cloud infrastructure and scalable applications'
	// },
	{
		name: 'Docker',
		category: 'cloud-tools',
		proficiency: 80,
		yearsOfExperience: 2.5,
		icon: '🐳',
		projects: ['Containerization', 'Microservices'],
		description: 'Containerization and deployment automation'
	},
	{
		name: 'Git/GitHub',
		category: 'cloud-tools',
		proficiency: 90,
		yearsOfExperience: 4,
		icon: '🔀',
		projects: ['All Projects', 'Open Source'],
		description: 'Version control and collaborative development'
	},

	// Databases
	{
		name: 'PostgreSQL',
		category: 'databases',
		proficiency: 78,
		yearsOfExperience: 2,
		icon: '🐘',
		projects: ['Data Analytics', 'Web Applications'],
		description: 'Relational database design and optimization'
	},
	// {
	// 	name: 'MongoDB',
	// 	category: 'databases',
	// 	proficiency: 70,
	// 	yearsOfExperience: 1.5,
	// 	icon: '🍃',
	// 	projects: ['Document Storage', 'APIs'],
	// 	description: 'NoSQL database for flexible data storage'
	// }
];

const categoryConfig = {
	'languages': { name: 'Programming Languages', color: 'from-blue-500 to-purple-600', icon: '💻' },
	'ml-ai': { name: 'Machine Learning & AI', color: 'from-green-500 to-teal-600', icon: '🤖' },
	'web': { name: 'Web Technologies', color: 'from-orange-500 to-red-600', icon: '🌐' },
	'cloud-tools': { name: 'Cloud & DevOps', color: 'from-cyan-500 to-blue-600', icon: '⚙️' },
	'databases': { name: 'Databases', color: 'from-purple-500 to-pink-600', icon: '💾' }
};

export default function InteractiveSkills() {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const filteredSkills = selectedCategory 
		? skillsData.filter(skill => skill.category === selectedCategory)
		: skillsData;

	const categories = Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>;

	return (
		<section ref={sectionRef} className="py-12 sm:py-20 px-4" data-section="skills">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
						Technical Arsenal
					</h2>
					<p className="text-gray-400 max-w-2xl mx-auto">
						Interactive showcase of my technical skills, experience levels, and project applications. 
						Hover over skills for detailed insights!
					</p>
				</motion.div>

				{/* Category Filter */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
					className="flex flex-wrap justify-center gap-3 mb-12"
				>
					<button
						onClick={() => setSelectedCategory(null)}
						className={`px-4 py-2 rounded-full transition-all duration-300 ${
							selectedCategory === null
								? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
								: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
						}`}
					>
						All Skills
					</button>
					{categories.map((category) => {
						const config = categoryConfig[category];
						return (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
									selectedCategory === category
										? `bg-gradient-to-r ${config.color} text-white`
										: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
								}`}
							>
								<span>{config.icon}</span>
								<span className="hidden sm:inline">{config.name}</span>
							</button>
						);
					})}
				</motion.div>

				{/* Skills Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<AnimatePresence mode="wait">
						{filteredSkills.map((skill, index) => (
							<motion.div
								key={skill.name}
								layout
								initial={{ opacity: 0, scale: 0.9, y: 20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.9, y: -20 }}
								transition={{ delay: index * 0.05 }}
								onHoverStart={() => setHoveredSkill(skill.name)}
								onHoverEnd={() => setHoveredSkill(null)}
								className="relative group"
							>
								<div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 h-full transition-all duration-300 hover:border-${categoryConfig[skill.category].color.split('-')[1]}-500 hover:shadow-lg hover:scale-105`}>
									{/* Skill Header */}
									<div className="flex items-center gap-3 mb-4">
										<span className="text-2xl">{skill.icon}</span>
										<div>
											<h3 className="font-semibold text-white">{skill.name}</h3>
											<p className="text-sm text-gray-400">{skill.yearsOfExperience} years</p>
										</div>
									</div>

									{/* Proficiency Bar */}
									<div className="mb-4">
										<div className="flex justify-between items-center mb-2">
											<span className="text-sm text-gray-300">Proficiency</span>
											<span className="text-sm font-bold text-green-400">{skill.proficiency}%</span>
										</div>
										<div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
											<motion.div
												className={`h-full bg-gradient-to-r ${categoryConfig[skill.category].color} rounded-full`}
												initial={{ width: 0 }}
												animate={{ width: isVisible ? `${skill.proficiency}%` : 0 }}
												transition={{ duration: 1, delay: index * 0.1 }}
											/>
										</div>
									</div>

									{/* Description */}
									<p className="text-sm text-gray-400 mb-4">{skill.description}</p>

									{/* Projects */}
									{skill.projects && skill.projects.length > 0 && (
										<div>
											<p className="text-xs text-gray-500 mb-2">Used in:</p>
											<div className="flex flex-wrap gap-1">
												{skill.projects.map((project) => (
													<span
														key={project}
														className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded"
													>
														{project}
													</span>
												))}
											</div>
										</div>
									)}
								</div>

								{/* Hover Tooltip */}
								<AnimatePresence>
									{hoveredSkill === skill.name && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 10 }}
											className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white p-3 rounded-lg border border-gray-600 z-10 pointer-events-none"
										>
											<div className="text-center">
												<p className="font-semibold text-green-400">{skill.name}</p>
												<p className="text-sm text-gray-300">{skill.yearsOfExperience} years experience</p>
												<p className="text-sm text-gray-300">{skill.proficiency}% proficiency</p>
											</div>
											<div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90" />
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						))}
					</AnimatePresence>
				</div>

				{/* Skills Summary */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4 }}
					className="mt-12 text-center"
				>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
						<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
							<div className="text-2xl font-bold text-green-400">{skillsData.length}</div>
							<div className="text-sm text-gray-400">Skills Mastered</div>
						</div>
						<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
							<div className="text-2xl font-bold text-blue-400">{Math.round(skillsData.reduce((acc, skill) => acc + skill.yearsOfExperience, 0) / skillsData.length * 10) / 10}</div>
							<div className="text-sm text-gray-400">Avg Experience</div>
						</div>
						<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
							<div className="text-2xl font-bold text-purple-400">{Math.round(skillsData.reduce((acc, skill) => acc + skill.proficiency, 0) / skillsData.length)}</div>
							<div className="text-sm text-gray-400">Avg Proficiency</div>
						</div>
						<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
							<div className="text-2xl font-bold text-orange-400">{categories.length}</div>
							<div className="text-sm text-gray-400">Categories</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
