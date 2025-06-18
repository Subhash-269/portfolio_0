'use client';

import { motion } from 'framer-motion';

export default function TechnicalMetrics() {	return (
		<section data-section="achievements" className="py-20 px-4 bg-gray-900/50">
			<div className="max-w-6xl mx-auto">
				<motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl font-bold mb-12 text-center">
					Impact & Achievements
				</motion.h2>

				<div className="grid grid-cols-1 gap-12">
					{/* System Performance */}
					<div>
						<h3 className="text-xl font-semibold mb-6 text-green-400">AI & NLP Solutions</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
							>
								<h4 className="text-lg font-semibold text-gray-300">Conversational AI Chatbot</h4>
								<ul className="mt-2 space-y-2 text-gray-400">
									<li>• Reduced customer query resolution time from 10 days to minutes</li>
									<li>• Improved customer satisfaction by 78%.</li>
									{/* <li>• Handles 2M requests/day</li> */}
								</ul>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
							>
								<h4 className="text-lg font-semibold text-gray-300">Cheque Processing Optimization</h4>
								<ul className="mt-2 space-y-2 text-gray-400">
									<li>• Achieved 100% key data extraction accuracy.</li>
									<li>• Reduced cheque processing time to 7s, improving efficiency by 40%.</li>
									{/* <li>• Reduced DB load by 45%</li> */}
								</ul>
							</motion.div>
						</div>
					</div>

					{/* Infrastructure & DevOps */}
					<div>
						<h3 className="text-xl font-semibold mb-6 text-green-400">Computer Vision & Model Deployment</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
							>
								<h4 className="text-lg font-semibold text-gray-300">Document Preprocessing</h4>
								<ul className="mt-2 space-y-2 text-gray-400">
									<li>• Improved invoice processing speed by 90%.</li>
									{/* <li>• Implemented auto-scaling for 20+ services</li> */}
									<li>• Achieved 100% compliance and saved 60% in costs.</li>
								</ul>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
							>
								<h4 className="text-lg font-semibold text-gray-300">Image Classification Optimization</h4>
								<ul className="mt-2 space-y-2 text-gray-400">
									<li>• Improved inference speed via quantization, enhancing real-time performance of ResNet-18 model.</li>
									{/* <li>• Automated testing coverage at 90%</li>
									<li>• Integration tests success rate 99.5%</li> */}
								</ul>
							</motion.div>
						</div>
					</div>

					{/* Development & Leadership */}
					<div>
						<h3 className="text-xl font-semibold mb-6 text-green-400">Data Visualization & Analytics</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
							>
								<a
									href="https://public.tableau.com/app/profile/venkat.neelraj.nitta/viz/Dashboard_17385068358520/Dashboard1?publish=yes"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 text-lg font-semibold text-gray-300 hover:text-green-400 transition-colors"
								>
									Electric Vehicle Insights
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
								</a>
								<ul className="mt-2 space-y-2 text-gray-400">
									<li>• Delivered visual comparative analysis dashboards enabling informed EV purchasing decisions.</li>
									{/* <li>• Established coding standards</li>
									<li>• Reduced technical debt by 40%</li> */}
								</ul>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
							>
								<h4 className="text-lg font-semibold text-gray-300">EMS Delay</h4>
								<ul className="mt-2 space-y-2 text-gray-400">
									<li>• Live Map that tells you the hotspots for EMS based on past data and current weather conditions</li>
									{/* <li>• Created 30+ technical documentation guides</li>
									<li>• Led 3 major system migrations</li> */}
								</ul>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
