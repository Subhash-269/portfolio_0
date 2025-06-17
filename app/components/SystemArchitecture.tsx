'use client';

import { motion } from 'framer-motion';

export default function SystemArchitecture() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center"
                >
                    Projects & Hackatons
                </motion.h2>

                <div className="grid grid-cols-1 gap-8">
                    {[
                        {
                            title: 'Smart Cart App',
                            description: 'Developed SmartCart, an application to automatically identify lowest vendor prices, significantly reducing shopping time.',
                            details: [
                                'Automated vendor comparison and pricing strategies',
                                'Enhanced shopping efficiency and inventory management',
                            ],
                            tech: ['Django', 'PostgreSQL', 'React', 'Google Gemini API', 'Hugging Face'],
                        },
                        {
                            title: 'CIFAR-10 Image Classification Web App',
                            description: 'Built a web app leveraging ResNet-18 for accurate image classification.',
                            details: [
                                'Model quantization to improve inference speed',
                                'Implemented SQLite database for tracking predictions',
                            ],
                            tech: ['Python', 'PyTorch', 'FastAPI', 'Streamlit'],
                        },
                        {
                            title: 'Brain Tumor Detection',
                            description: 'Developed deep learning model achieving 85% precision for brain tumor detection.',
                            details: [
                                'Trained initially on 6,000 medical images',
                                'Expanded classification through transfer learning',
                            ],
                            tech: ['Deep Neural Networks', 'Object Detection', 'Transfer Learning'],
                        },
                    ].map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800"
                        >
                            <h3 className="text-2xl font-bold mb-4">
                                {project.title === 'Smart Cart App' ? (
                                    <a
                                        href="https://github.com/aatmaj28/Innovaite-2025/tree/main"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
                                    >
                                        {project.title}
                                    </a>
                                ) : project.title === 'CIFAR-10 Image Classification Web App' ? (
                                    <a
                                        href="https://cifar-image-classifier.streamlit.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
                                    >
                                        {project.title}
                                    </a>
                                ) : (
                                    project.title
                                )}
                            </h3>
							
                            <p className="text-gray-400 mb-6">{project.description}</p>
                            <div className="mb-6">
                                <ul className="list-disc list-inside space-y-2 text-gray-300">
                                    {project.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-sm px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}