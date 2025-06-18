'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EducationMilestone {
	id: number;
	institution: string;
	degree: string;
	field: string;
	duration: string;
	location: string;
	status: 'completed' | 'in-progress' | 'upcoming';
	gpa?: string;
	highlights: string[];
	courses: string[];
	projects: string[];
	skills: string[];
	icon: string;
	color: string;
	description: string;
}

const educationData: EducationMilestone[] = [
	{
		id: 1,
		institution: 'Northeastern University',
		degree: 'Master of Professional Studies',
		field: 'Applied Machine Intelligence',
		duration: '2024 - 2026',
		location: 'Boston, MA',
		status: 'in-progress',
		gpa: '4.0/4.0',
		highlights: [
			'Deep dive into AI industry and cutting-edge research',
			'Focus on practical applications of machine learning',
			'Collaborative research projects with industry partners',
			'Advanced coursework in neural networks and computer vision'
		],
		courses: [
			'Fundamentals of Artificial Intelligence',
			'Applications of AI',
			'AI System Technologies (ML Ops)',
			'Healthcare Information Processing',
			'Healthcare/Pharmaceutical Data and Applications',
			'Ethical Leadership'
		],
		projects: [
			'Electric Vehicles in WA: Price, Type, and Range',
			'CIFAR-10 Image Classification Web App',
			'EMS delay and Dashboard',
			// 'NLP Research Project'
		],
		skills: ['PyTorch', 'TensorFlow', 'OpenCV', 'Scikit-learn', 'Python', 'Research Methodology'],
		icon: '🎓',
		color: 'from-blue-500 to-purple-600',
		description: 'Pursuing advanced studies in AI with focus on real-world applications and ethical AI development.'
	},
	{
		id: 2,
		institution: 'Mahindra Ecole Centrale', // Replace with actual
		degree: 'Bachelor of Technology',
		field: 'Electrical and Electronics Engineering',
		duration: '2018 - 2022',
		location: 'Hyderabad, India',
		status: 'completed',
		// gpa: '8.5/10',
		highlights: [
			'Strong foundation in computer science fundamentals',
			'Active participation in coding competitions',
			'Leadership roles in technical clubs',
			'Capstone project in machine learning'
		],
		courses: [
			'Signals and Systems',
			'Data Structures',
			'Numerical Methods',
			'Statistics',
			'Digital Signal Processing',
			'Machine Learning',
            'Natural Language Processing',
            'Advance Data Analytics',
            'Big Data Computing'
		],
		projects: [
			'Academic Research Project: Navigation Aid for Visually Impaired',
			'EEG Epiliptic Seizure Classification',
			// 'Database Design Project',
			// 'Algorithm Optimization Research'
		],
		skills: ['Java', 'Python', 'SQL', 'JavaScript', 'Problem Solving', 'System Design'],
		icon: '🎯',
		color: 'from-green-500 to-teal-600',
		description: 'Built strong technical foundation with focus on software development and early exploration of AI/ML.'
	}
];

export default function EducationalMilestones() {
    const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'completed': return { text: 'Completed', bg: 'bg-green-500/20 text-green-400 border-green-500/30' };
			case 'in-progress': return { text: 'In Progress', bg: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
			case 'upcoming': return { text: 'Upcoming', bg: 'bg-orange-500/20 text-orange-400 border-orange-500/30' };
			default: return { text: 'Unknown', bg: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
		}
	};

	return (
		<section ref={sectionRef} className="py-12 sm:py-20 px-4" data-section="education">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
						Educational Milestones
					</h2>
					<p className="text-gray-400 max-w-2xl mx-auto">
						My academic journey from foundational computer science to advanced AI research, 
						building expertise in machine learning and practical applications.
					</p>
				</motion.div>

				{/* Timeline */}
				<div className="relative">
					{/* Timeline Line */}
					<div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-green-500" />

					{/* Education Cards */}
					<div className="space-y-12">
						{educationData.map((milestone, index) => (
							<motion.div
								key={milestone.id}
								initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.2 }}
								className={`relative flex items-center ${
									index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
								} flex-col sm:gap-8`}
							>
								{/* Timeline Node */}
								<div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 -translate-y-1/2 top-1/2">
									<motion.div
										whileHover={{ scale: 1.2 }}
										className={`w-8 h-8 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center text-white font-bold border-4 border-gray-900 shadow-lg`}
									>
										<span className="text-sm">{milestone.icon}</span>
									</motion.div>
								</div>

								{/* Education Card */}
								<motion.div
									whileHover={{ scale: 1.02, y: -5 }}
									onClick={() => setSelectedMilestone(selectedMilestone === milestone.id ? null : milestone.id)}
									className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg ml-12 sm:ml-0 ${
										index % 2 === 0 ? 'sm:mr-1/2 sm:pr-12' : 'sm:ml-1/2 sm:pl-12'
									} w-full sm:w-1/2`}
								>
									{/* Header */}
									<div className="flex items-start justify-between mb-4">
										<div>
											<h3 className="text-xl font-bold text-white mb-1">
												{milestone.degree}
											</h3>
											<p className="text-purple-400 font-semibold mb-1">
												{milestone.field}
											</p>
											<p className="text-gray-300 font-medium">
												{milestone.institution}
											</p>
											<p className="text-sm text-gray-400">
												{milestone.location} • {milestone.duration}
											</p>
										</div>
										<div className="flex flex-col items-end gap-2">
											<span className={`px-3 py-1 rounded-full text-xs border ${getStatusBadge(milestone.status).bg}`}>
												{getStatusBadge(milestone.status).text}
											</span>
											{milestone.gpa && (
												<span className="text-sm text-green-400 font-semibold">
													GPA: {milestone.gpa}
												</span>
											)}
										</div>
									</div>

									{/* Description */}
									<p className="text-gray-400 mb-4">{milestone.description}</p>

									{/* Quick Highlights */}
									<div className="flex flex-wrap gap-2 mb-4">
										{milestone.highlights.slice(0, 2).map((highlight, idx) => (
											<span
												key={idx}
												className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded"
											>
												{highlight}
											</span>
										))}
										{milestone.highlights.length > 2 && (
											<span className="px-2 py-1 bg-gray-700 text-xs text-gray-400 rounded">
												+{milestone.highlights.length - 2} more
											</span>
										)}
									</div>

									{/* Expand Button */}
									<button className="text-purple-400 text-sm hover:text-purple-300 transition-colors flex items-center gap-1">
										<span>{selectedMilestone === milestone.id ? 'Show Less' : 'Show More'}</span>
										<motion.span
											animate={{ rotate: selectedMilestone === milestone.id ? 180 : 0 }}
											transition={{ duration: 0.3 }}
										>
											↓
										</motion.span>
									</button>
								</motion.div>
							</motion.div>
						))}
					</div>
				</div>

				{/* Expanded Details Modal */}
				<AnimatePresence>
					{selectedMilestone && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
							onClick={() => setSelectedMilestone(null)}
						>
							<motion.div
								initial={{ opacity: 0, scale: 0.9, y: 20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.9, y: 20 }}
								onClick={(e) => e.stopPropagation()}
								className="bg-gray-900/95 backdrop-blur-lg border border-gray-700 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
							>
								{(() => {
									const milestone = educationData.find(m => m.id === selectedMilestone);
									if (!milestone) return null;

									return (
										<>
											{/* Header */}
											<div className="flex items-start justify-between mb-6">
												<div>
													<h3 className="text-2xl font-bold text-white mb-2">
														{milestone.degree} - {milestone.field}
													</h3>
													<p className="text-purple-400 text-lg font-semibold">
														{milestone.institution}
													</p>
													<p className="text-gray-400">
														{milestone.location} • {milestone.duration}
													</p>
												</div>
												<button
													onClick={() => setSelectedMilestone(null)}
													className="text-gray-400 hover:text-white transition-colors"
												>
													<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
													</svg>
												</button>
											</div>

											{/* Content Grid */}
											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												{/* Highlights */}
												<div>
													<h4 className="text-lg font-semibold text-white mb-3">Key Highlights</h4>
													<ul className="space-y-2">
														{milestone.highlights.map((highlight, idx) => (
															<li key={idx} className="flex items-start gap-2 text-gray-300">
																<span className="text-green-400 mt-1">•</span>
																<span>{highlight}</span>
															</li>
														))}
													</ul>
												</div>

												{/* Courses */}
												<div>
													<h4 className="text-lg font-semibold text-white mb-3">Key Courses</h4>
													<div className="flex flex-wrap gap-2">
														{milestone.courses.map((course, idx) => (
															<span
																key={idx}
																className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-sm"
															>
																{course}
															</span>
														))}
													</div>
												</div>

												{/* Projects */}
												<div>
													<h4 className="text-lg font-semibold text-white mb-3">Notable Projects</h4>
													<ul className="space-y-2">
														{milestone.projects.map((project, idx) => (
															<li key={idx} className="flex items-start gap-2 text-gray-300">
																<span className="text-purple-400 mt-1">→</span>
																<span>{project}</span>
															</li>
														))}
													</ul>
												</div>

												{/* Skills */}
												<div>
													<h4 className="text-lg font-semibold text-white mb-3">Skills Developed</h4>
													<div className="flex flex-wrap gap-2">
														{milestone.skills.map((skill, idx) => (
															<span
																key={idx}
																className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-sm"
															>
																{skill}
															</span>
														))}
													</div>
												</div>
											</div>
										</>
									);
								})()}
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Education Summary */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4 }}
					className="mt-16 text-center"
				>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
						<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
							<div className="text-3xl font-bold text-purple-400 mb-2">2+</div>
							<div className="text-gray-400">Years in AI/ML</div>
						</div>
						<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
							<div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
							<div className="text-gray-400">Advanced Courses</div>
						</div>
						<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
							<div className="text-3xl font-bold text-green-400 mb-2">5</div>
							<div className="text-gray-400">Academic Projects</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
