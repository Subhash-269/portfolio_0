'use client';

import { motion } from 'framer-motion';

interface Project {
    title: string;
    description: string;
    impact: string;
    details: string[];
    tech: string[];
    link?: string;
    linkText?: string;
    metrics?: {
        label: string;
        value: string;
        color: string;
    }[];
}

const projects: Project[] = [
    {
        title: 'Lighthouse (Workhuman-Sponsored Hackathon)',
        description: 'Employee onboarding and recognition platform co-built with a 4-person team under a tight deadline for the Workhuman-sponsored hackathon.',
        impact: 'Won the Workhuman-sponsored hackathon',
        details: [
            'Co-built Lighthouse as part of a 4-person team under a tight deadline',
            'Delivered a live demo and Q&A to judges',
            'Presented product and technical decisions to a non-engineering audience'
        ],
        tech: ['Python', 'React', 'LLM', 'FastAPI'],
        metrics: [
            { label: 'Team Size', value: '4 devs', color: 'text-purple-400' },
            { label: 'Result', value: 'Won', color: 'text-green-400' }
        ]
    },
    {
        title: 'Artha AI – Portfolio',
        description: 'Predictive investment model using deep learning to optimize stock allocation by maximizing the Sharpe Ratio, moving beyond static Modern Portfolio Theory by capturing non-linear market patterns and adapting dynamically to changing market regimes.',
        impact: 'Deep learning-based portfolio optimization beyond static Modern Portfolio Theory',
        details: [
            'Predictive model maximizing the Sharpe Ratio for stock allocation',
            'Captures non-linear patterns and adapts dynamically to changing market regimes',
            'React-based front-end presenting optimized portfolio insights through interactive visualizations',
            'Makes allocation logic accessible to non-technical stakeholders'
        ],
        tech: ['Python', 'Deep Learning', 'Neural Networks', 'Time Series Analysis', 'React'],
        link: 'https://github.com/Subhash-269/artha-ai-portfolio',
        linkText: 'View on GitHub'
    },
    {
        title: 'Automobile Insurance Assistance',
        description: 'Multimodal classification system for insurance claim guidance using YOLOv11 and agentic frameworks (LangChain, LangGraph); lets users query policy documents or upload vehicle images for damage detection and claim assistance.',
        impact: 'Agentic RAG assistant combining image-based damage detection with policy document Q&A',
        details: [
            'YOLOv11-based image classification for vehicle damage detection',
            'LangChain/LangGraph agentic framework for policy document Q&A',
            'Django web app supporting real-time vector search and embeddings',
            'Context-aware decision tracking for insurance claims'
        ],
        tech: ['Python', 'LangChain', 'LangGraph', 'YOLOv11', 'RAG', 'Django'],
        link: 'https://github.com/Subhash-269/InsurAsst',
        linkText: 'View on GitHub'
    },
    {
        title: 'Smart Cart App',
        description: 'AI-powered shopping assistant developed for Northeastern hackathon Innovaite 2025. Led a team of 5 to create an intelligent system that searches items based on dish names and automatically identifies lowest vendor prices across multiple platforms.',
        impact: 'Completed in 48 hours with team of 5',
        details: [
            'Led team of 5 developers in 48-hour hackathon environment',
            'Intelligent dish-based search that finds relevant ingredients and products',
            'Automated vendor comparison and lowest price identification across platforms',
            // 'Real-time price tracking and alert system with Google Gemini integration',
            'Enhanced shopping efficiency with AI-powered recommendations',
            // 'Inventory management with predictive analytics using Hugging Face models'
        ],
        tech: ['Django', 'PostgreSQL', 'React', 'Google Gemini API', 'Hugging Face', 'Web Scraping'],
        link: 'https://github.com/aatmaj28/Innovaite-2025/tree/main',
        linkText: 'View on GitHub',
        metrics: [
            { label: 'Time taken', value: '48hrs', color: 'text-green-400' },
            // { label: 'Cost Reduction', value: '25%', color: 'text-blue-400' },
            { label: 'Team Size', value: '5 devs', color: 'text-purple-400' }
        ]
    },
    {
        title: 'CIFAR-10 Image Classification Web App',
        description: 'Production-ready deep learning application using ResNet-18 for real-time image classification.',
        impact: '94% accuracy with sub-100ms inference time',
        details: [
            'Implemented ResNet-18 architecture with custom optimizations',
            'Model quantization for 3x faster inference speed',
            'SQLite database integration for prediction tracking and analytics',
            'Streamlit web interface with real-time image processing'
        ],
        tech: ['Python', 'PyTorch', 'FastAPI', 'Streamlit', 'SQLite', 'Computer Vision'],
        link: 'https://cifar-image-classifier.streamlit.app/',
        linkText: 'Try Live Demo',
        metrics: [
            { label: 'Accuracy', value: '94%', color: 'text-green-400' },
            { label: 'Inference', value: '<100ms', color: 'text-blue-400' },
            { label: 'Model Size', value: '2.3MB', color: 'text-purple-400' }
        ]
    },
    {
        title: 'Medical Brain Tumor Detection',
        description: 'Deep learning system for automated brain tumor detection in MRI scans for healthcare applications.',
        impact: '85% precision on medical imaging dataset',
        details: [
            'Trained on 6,000+ medical brain MRI images',
            'Multi-class tumor classification (glioma, meningioma, pituitary)',
            'Transfer learning optimization for medical domain adaptation',
            'Preprocessing pipeline for medical image standardization'
        ],
        tech: ['Deep Neural Networks', 'Computer Vision', 'Transfer Learning', 'Medical Imaging', 'Data Preprocessing'],
        metrics: [
            { label: 'Precision', value: '85%', color: 'text-green-400' },
            { label: 'Dataset', value: '6K+ images', color: 'text-blue-400' },
            { label: 'Classes', value: '4 types', color: 'text-purple-400' }
        ]
    }
];

export default function SystemArchitecture() {
    return (
        <section data-section="projects" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >                    <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text-animated">
                        Featured Projects & Hackathons
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Real-world AI applications that solve business problems and deliver measurable impact.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-500"
                        >
                            <div className="p-6 sm:p-8">
                                {/* Header Section */}
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-xl sm:text-2xl font-bold text-white">
                                                {project.title}
                                            </h3>
                                            {project.link && (
                                                <motion.a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.05 }}
                                                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all text-sm font-medium"
                                                >
                                                    {project.linkText}
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </motion.a>
                                            )}
                                        </div>
                                        <p className="text-gray-300 mb-3 text-base sm:text-lg leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 text-sm font-medium">
                                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                            {project.impact}
                                        </div>
                                    </div>

                                    {/* Metrics Section */}
                                    {project.metrics && (
                                        <div className="mt-6 lg:mt-0 lg:ml-8">
                                            <div className="grid grid-cols-3 gap-4 lg:gap-6">
                                                {project.metrics.map((metric, idx) => (
                                                    <div key={idx} className="text-center">
                                                        <div className={`text-lg sm:text-xl font-bold ${metric.color}`}>
                                                            {metric.value}
                                                        </div>
                                                        <div className="text-xs sm:text-sm text-gray-400 font-medium">
                                                            {metric.label}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Key Features */}
                                    <div className="lg:col-span-2">
                                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                            Key Features & Implementation
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {project.details.map((detail, idx) => (
                                                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                                                    <span className="text-green-400 mt-0.5 flex-shrink-0">→</span>
                                                    <span className="text-gray-300 text-sm leading-relaxed">{detail}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                            Technology Stack
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-600/50 text-sm font-medium hover:border-purple-500/50 transition-colors"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Projects Teaser */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">More Projects Coming Soon</h3>
                        <p className="text-gray-400 mb-4">
                            Currently working on advanced NLP models and computer vision applications. 
                            Follow my GitHub for the latest updates.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30 text-sm">
                                Healthcare
                            </span>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30 text-sm">
                                Finance
                            </span>
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/30 text-sm">
                                MLOps & Deployment
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}