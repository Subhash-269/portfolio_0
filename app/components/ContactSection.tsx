'use client';
import { Analytics } from "@vercel/analytics/next"
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ContactForm {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export default function ContactSection() {
	const [formData, setFormData] = useState<ContactForm>({
		name: '',
		email: '',
		subject: '',
		message: ''
	});	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
	const [showCopyMessage, setShowCopyMessage] = useState(false);

	const copyEmailToClipboard = async () => {
		try {
			await navigator.clipboard.writeText('vneelraj.nitta@gmail.com');
			setShowCopyMessage(true);
			setTimeout(() => setShowCopyMessage(false), 2000);
		} catch (err) {
			console.error('Failed to copy email:', err);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		
		try {
			// Create a well-formatted email
			const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');			const body = encodeURIComponent(
				`Hi Venkat,\n\nI&apos;m reaching out from your portfolio website.\n\n` +
				`Name: ${formData.name}\n` +
				`Email: ${formData.email}\n` +
				`Subject: ${formData.subject}\n\n` +
				`Message:\n${formData.message}\n\n` +
				`Best regards,\n${formData.name}`
			);
			
			const mailtoLink = `mailto:vneelraj.nitta@gmail.com?subject=${subject}&body=${body}`;
			
			// Small delay for better UX
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			// Open email client
			window.open(mailtoLink, '_blank');
			
			// Show success message
			setSubmitStatus('success');
			setFormData({ name: '', email: '', subject: '', message: '' });
			
		} catch (error) {
			console.error('Error opening email client:', error);
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
			setTimeout(() => setSubmitStatus('idle'), 5000);
		}
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 }
	};	return (
		<section data-section="contact" className="py-20 px-4">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={containerVariants}
					className="grid lg:grid-cols-2 gap-8"
				>
					{/* Left Column - Contact Info */}
					<motion.div
						variants={itemVariants}
						className="relative p-8 rounded-2xl overflow-hidden backdrop-blur-lg border border-gray-800/50 bg-black/30 hover:bg-black/40 transition-all duration-300"
					>
						<div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/5 to-purple-500/10" />
						<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400" />
						
						<div className="relative z-10">
							{/* Terminal Header */}
							<div className="flex items-center gap-2 mb-6">
								<div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
								<div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
								<div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
								<span className="ml-4 text-gray-400 text-sm font-mono">contact-terminal</span>
							</div>

							<div className="font-mono space-y-6">
								<motion.div variants={itemVariants}>
									<p className="text-green-400 mb-2 typing-effect">$ whoami --contact</p>									<h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text-animated">
										Let&apos;s Connect
									</h2>
									<p className="text-gray-300 leading-relaxed">
										Ready to collaborate on innovative projects or discuss exciting opportunities? 
										I&apos;m always open to new challenges and meaningful conversations.
									</p>
								</motion.div>

								{/* Location */}
								<motion.div variants={itemVariants}>
									<p className="text-green-400 mb-2">$ location --current</p>
									<div className="flex items-center gap-3 text-gray-300 bg-gray-800/30 p-3 rounded-lg border border-gray-700/50">
										<div className="p-2 bg-green-500/20 rounded-lg">
											<svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
											</svg>
										</div>
										<div>
											<p className="font-semibold">Boston, MA</p>
											<p className="text-sm text-gray-400">EST Timezone</p>
										</div>
									</div>
								</motion.div>								{/* Email */}
								<motion.div variants={itemVariants}>
									<p className="text-green-400 mb-2">$ contact --email</p>
									<div className="space-y-3">
										<motion.a
											href="mailto:vneelraj.nitta@gmail.com"
											whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)" }}
											whileTap={{ scale: 0.98 }}
											className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group w-full"
										>
											<div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
												<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
												</svg>
											</div>
											<div>
												<p className="font-semibold">vneelraj.nitta@gmail.com</p>
												<p className="text-sm text-gray-400">Click to compose email</p>
											</div>
										</motion.a>
										
										<motion.button
											onClick={copyEmailToClipboard}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/50 text-gray-300 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group w-full"
										>
											<div className="p-2 bg-gray-700/50 rounded-lg group-hover:bg-gray-600/50 transition-colors">
												<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
												</svg>
											</div>
											<span className="text-sm">Copy Email Address</span>
										</motion.button>
										
										{showCopyMessage && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												className="text-sm text-green-400 px-2"
											>
												✓ Email copied to clipboard!
											</motion.div>
										)}
									</div>
								</motion.div>

								{/* Resume */}
								<motion.div variants={itemVariants}>
									<p className="text-green-400 mb-2">$ cat resume.pdf</p>
									<motion.a
										href="/resume/VenkatNeelraj.pdf"
										download="VenkatNeelraj_Resume.pdf"
										whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
										whileTap={{ scale: 0.98 }}
										className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group"
									>
										<div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
											<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
												<path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
											</svg>
										</div>
										<div>
											<p className="font-semibold">Download Resume</p>
											<p className="text-sm text-gray-400">PDF Format</p>
										</div>
									</motion.a>
								</motion.div>

								{/* Social Links */}
								<motion.div variants={itemVariants}>
									<p className="text-green-400 mb-4">$ ls ./social-networks</p>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<motion.a
											href="https://github.com/Subhash-269"
											whileHover={{ scale: 1.05, y: -5 }}
											whileTap={{ scale: 0.95 }}
											className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 group"
										>
											<div className="p-2 bg-gray-700/50 rounded-lg group-hover:bg-gray-600/50 transition-colors">
												<svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
													<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
												</svg>
											</div>
											<div>
												<p className="font-semibold text-gray-200">GitHub</p>
												<p className="text-sm text-gray-400">@Subhash-269</p>
											</div>
										</motion.a>

										<motion.a
											href="https://www.linkedin.com/in/v-neelraj-n/"
											whileHover={{ scale: 1.05, y: -5 }}
											whileTap={{ scale: 0.95 }}
											className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 group"
										>
											<div className="p-2 bg-gray-700/50 rounded-lg group-hover:bg-gray-600/50 transition-colors">
												<svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
													<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
												</svg>
											</div>
											<div>
												<p className="font-semibold text-gray-200">LinkedIn</p>
												<p className="text-sm text-gray-400">Venkat Neelraj</p>
											</div>
										</motion.a>
									</div>
								</motion.div>
							</div>
						</div>
					</motion.div>

					{/* Right Column - Contact Form */}
					<motion.div
						variants={itemVariants}
						className="relative p-8 rounded-2xl overflow-hidden backdrop-blur-lg border border-gray-800/50 bg-black/30 hover:bg-black/40 transition-all duration-300"
					>
						<div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 via-blue-500/5 to-green-500/10" />
						<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400" />
						
						<div className="relative z-10">
							{/* Form Header */}
							<div className="flex items-center gap-2 mb-6">
								<div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
								<div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
								<div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
								<span className="ml-4 text-gray-400 text-sm font-mono">message-composer</span>
							</div>

							<div className="font-mono">
								<motion.div variants={itemVariants}>
									<p className="text-purple-400 mb-2">$ compose --new-message</p>
									<h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
										Send Message
									</h3>
								</motion.div>

								<form onSubmit={handleSubmit} className="space-y-6">
									<motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm text-gray-400 mb-2">Name *</label>
											<input
												type="text"
												name="name"
												value={formData.name}
												onChange={handleInputChange}
												required
												className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 text-gray-200 placeholder-gray-500"
												placeholder="Your name"
											/>
										</div>
										<div>
											<label className="block text-sm text-gray-400 mb-2">Email *</label>
											<input
												type="email"
												name="email"
												value={formData.email}
												onChange={handleInputChange}
												required
												className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-gray-200 placeholder-gray-500"
												placeholder="your.email@example.com"
											/>
										</div>
									</motion.div>

									<motion.div variants={itemVariants}>
										<label className="block text-sm text-gray-400 mb-2">Subject *</label>
										<input
											type="text"
											name="subject"
											value={formData.subject}
											onChange={handleInputChange}
											required											className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-gray-200 placeholder-gray-500"
											placeholder="What&apos;s this about?"
										/>
									</motion.div>

									<motion.div variants={itemVariants}>
										<label className="block text-sm text-gray-400 mb-2">Message *</label>
										<textarea
											name="message"
											value={formData.message}
											onChange={handleInputChange}
											required
											rows={6}
											className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 text-gray-200 placeholder-gray-500 resize-none"
											placeholder="Tell me about your project, idea, or opportunity..."
										/>
									</motion.div>

									{/* Status Messages */}									{submitStatus === 'success' && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400"
										>
											<div className="flex items-center gap-2">
												<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
												</svg>
												<div>
													<p className="font-semibold">Email client opened successfully!</p>
													<p className="text-sm text-green-300/80">Please send the pre-filled email from your email application.</p>
												</div>
											</div>
										</motion.div>
									)}									{submitStatus === 'error' && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400"
										>
											<div className="flex items-center gap-2">
												<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.046 15.5c-.77.833.192 2.5 1.732 2.5z" />
												</svg>												<div>
													<p className="font-semibold">Couldn&apos;t open email client</p>
													<p className="text-sm text-red-300/80">Please copy the email address above or contact me directly at vneelraj.nitta@gmail.com</p>
												</div>
											</div>
										</motion.div>
									)}

									<motion.div variants={itemVariants}>
										<motion.button
											type="submit"
											disabled={isSubmitting}
											whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)" } : {}}
											whileTap={!isSubmitting ? { scale: 0.98 } : {}}
											className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
										>
											{isSubmitting ? (
												<>
													<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
													<span>Sending...</span>
												</>
											) : (
												<>
													<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
													</svg>
													<span>Send Message</span>
												</>
											)}
										</motion.button>
									</motion.div>
								</form>								<motion.div variants={itemVariants} className="mt-6">
									<p className="text-gray-400 text-sm mb-4">
										💡 <strong>How it works:</strong> The form will open your email client with a pre-filled message. 
										Just hit send from your email app!
									</p>
									<p className="text-gray-400 text-sm text-center">
										Or reach out directly at{' '}
										<a href="mailto:vneelraj.nitta@gmail.com" className="text-green-400 hover:text-green-300 transition-colors">
											vneelraj.nitta@gmail.com
										</a>
									</p>
								</motion.div>
							</div>
						</div>					</motion.div>
				</motion.div>
				<Analytics />
			</div>
		</section>
	);
}
