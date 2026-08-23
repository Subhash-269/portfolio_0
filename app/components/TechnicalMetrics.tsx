'use client';

import { motion } from 'framer-motion';

export default function TechnicalMetrics() {
	return (		<section className="py-20 px-4 bg-gray-900/50" data-section="achievements">
			<div className="max-w-6xl mx-auto">
				<motion.h2 
					initial={{ opacity: 0 }} 
					whileInView={{ opacity: 1 }} 
					viewport={{ once: true }} 
					className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text-animated"
				>
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
									<li>• improving customer satisfaction by 78% through advanced NLP and machine learning techniques.</li>
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
									<li>• Achieved 100% key data extraction accuracy, reducing processing to 7 seconds per cheque.</li>
									{/* <li>• Implemented efficient indexing strategy</li>
									<li>• Reduced DB load by 45%</li> */}
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
									<li>• Accelerated invoice processing by 90%, achieving 60% cost savings with flawless OCR integration.</li>
									{/* <li>• Implemented auto-scaling for 20+ services</li>
									<li>• Zero-downtime deployments</li> */}
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
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
							>
								<h4 className="text-lg font-semibold text-gray-300">Electric Vehicle Insights</h4>
								<ul className="mt-2 space-y-2 text-gray-400">
									<li>• Delivered visual comparative analysis dashboards enabling informed EV purchasing decisions.</li>
									<li>• Established coding standards</li>
									<li>• Reduced technical debt by 40%</li>
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

					{/* Certifications */}
					<div>
						<h3 className="text-xl font-semibold mb-6 text-green-400">Certifications</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
							>
								<h4 className="text-lg font-semibold text-gray-300">AI Tools Workshop</h4>
								<p className="mt-2 text-gray-400">be10x Academy • August 2026</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
							>
								<h4 className="text-lg font-semibold text-gray-300">AI Agents on Databricks</h4>
								<p className="mt-2 text-gray-400">Databricks Academy • April 2026</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
							>
								<h4 className="text-lg font-semibold text-gray-300">Generative AI with Large Language Models</h4>
								<p className="mt-2 text-gray-400">DeepLearning.AI • May 2024</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
							>
								<h4 className="text-lg font-semibold text-gray-300">Applying AI Technologies to the Workplace</h4>
								<p className="mt-2 text-gray-400">Northeastern University • September 2024</p>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
