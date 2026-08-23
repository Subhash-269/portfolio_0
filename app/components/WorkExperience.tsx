'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TECH_ICONS } from '../utils/techIcons';

interface WorkExperience {
    id: number;
    company: string;
    position: string;
    department?: string;
    duration: string;
    location: string;
    type: 'full-time' | 'part-time' | 'internship' | 'contract' | 'freelance';
    status: 'current' | 'completed';
    highlights: string[];
    responsibilities: string[];
    technologies: string[];
    achievements: string[];
    skills: string[];
    projects: {
        total: number;
        featured: string[];
    };
    icon: string;
    color: string;
    description: string;
}

const workExperienceData: WorkExperience[] = [
    {
        id: 3,
        company: 'Staples',
        position: 'AI Engineer Intern',
        duration: 'Jan 2026 - Jul 2026',
        location: 'Framingham, MA',
        type: 'internship',
        status: 'completed',
        highlights: [
            'Built agentic e-commerce orchestration system for product tagging & recommendation across ~300K SKUs',
            'Combined LLMs, embeddings, vector search, and RAG pipelines',
            'Independently researched graph database options with no prior background',
            'Presented pipeline architecture and model outputs to senior leadership'
        ],
        responsibilities: [
            'Design and build agentic orchestration pipelines combining LLMs, embeddings, vector search, and RAG for product tagging and recommendation',
            'Develop classification models on Databricks (PySpark + Delta Lake) for SKU tagging and product relationship modeling',
            'Design evaluation datasets and metrics to assess retrieval quality, output accuracy, and reliability',
            'Research and evaluate graph database solutions (Neo4j, Cosmos DB, FalkorDB) for product relationship modeling',
            'Present pipeline architecture and model outputs to non-technical senior leadership'
        ],
        technologies: ['Python', 'Databricks', 'PySpark', 'Delta Lake', 'LLMs', 'RAG', 'Vector Search', 'Embeddings', 'LangChain', 'LangGraph'],
        achievements: [
            'Built agentic orchestration system spanning ~300K SKUs for product tagging and recommendation',
            'Independently evaluated graph database options (Neo4j, Cosmos DB, FalkorDB) with no prior background',
            'Improved search relevance and product discovery through scalable data enrichment pipelines on Databricks',
            'Presented pipeline architecture and data-driven business recommendations to senior leadership, including new customer-acquisition channels identified from the data'
        ],
        skills: ['Agentic AI', 'RAG', 'LLMs', 'Databricks', 'PySpark', 'Graph Databases', 'Stakeholder Communication'],
        projects: {
            total: 1,
            featured: [
                'Agentic E-Commerce Orchestration System (Product Tagging & Recommendation)'
            ]
        },
        icon: '🛒',
        color: 'from-red-500 to-orange-600',
        description: 'AI Engineer Intern role on the Agentic Commerce team: designed and built an agentic orchestration pipeline end-to-end (LLMs, embeddings, vector search, RAG), evaluating retrieval quality and output accuracy for product tagging and recommendation across ~300K SKUs.'
    },
    {
        id: 1,
        company: 'Cognida.AI',
        position: 'Software Developer',
        duration: 'Jul 2022 - Aug 2024',
        location: 'Hyderabad, Telangana, India',
        type: 'full-time',
        status: 'completed',
        highlights: [
            'Engineered enterprise-grade conversational AI chatbot',
            'Created AI-powered document preprocessing system',
            'Directed AI team in cheque processing optimization',
            'Achieved significant performance improvements across all projects'
        ],
        responsibilities: [
            'Develop and optimize NLP-based AI systems',
            'Design computer vision solutions for document processing',
            'Lead AI team training and model optimization',
            'Implement real-time prediction systems with low latency',
            'Create interactive feedback systems for user validation'
        ],
        technologies: ['Python', 'TypeScript', 'NLP', 'Machine Learning', 'Computer Vision', 'Neural Networks', 'AI/ML'],
        achievements: [
            'Reduced query resolution time from 10 days to minutes',
            'Elevated customer satisfaction by 78%',
            'Achieved 100% compliance rate and 90% faster invoice processing',
            '60% cost savings through streamlined workflows',
            '100% key data extraction accuracy in cheque processing',
            'Reduced processing time per cheque to 7 seconds',
            'Optimized document workflow efficiency by 40%'
        ],        skills: ['AI/ML', 'NLP', 'Computer Vision', 'Team Leadership', 'Python', 'Document Processing'],
        projects: {
            total: 3,
            featured: [
                'Enterprise Conversational AI Chatbot',
                'AI-Powered Document Preprocessing System',
                'Automated Cheque Processing Model'
            ]
        },        icon: '🤖',
        color: 'from-green-500 to-blue-600',
        description: 'Full-time software developer role: engineered the backend and model-serving pipeline for an AI-powered inspection platform, building the OCR/computer-vision classification models and shipping them into production.'
    },
    {
        id: 2,
        company: 'Cognida.AI',
        position: 'Software Developer Internship',
        duration: 'Feb 2022 - Jun 2022',
        location: 'Hyderabad, Telangana, India',
        type: 'internship',
        status: 'completed',
        highlights: [
            'Developed NLP-based grammar and spell correction model',
            'Achieved real-time predictions with low latency',
            'Designed interactive feedback system for user validation',
            'Enabled users to validate, override, and refine corrections'
        ],
        responsibilities: [
            'Develop and optimize NLP models for grammar correction',
            'Implement real-time prediction systems',
            'Design user-friendly feedback interfaces',
            'Test and validate model accuracy and performance',
            'Collaborate with team on model improvements'
        ],
        technologies: ['Python', 'TypeScript', 'NLP', 'Machine Learning', 'Real-time Systems', 'UI/UX Design'],
        achievements: [
            'Successfully delivered real-time grammar correction system',
            'Implemented efficient user feedback mechanism',
            'Achieved low-latency performance for real-time use',
            'Created intuitive user interface for corrections'
        ],        skills: ['NLP', 'Python', 'Real-time Systems', 'User Interface Design', 'Model Optimization'],
        projects: {
            total: 1,
            featured: [
                'NLP-based Grammar and Spell Correction System'
            ]
        },        icon: '📝',
        color: 'from-purple-500 to-pink-600',
        description: 'Internship role developing NLP-based grammar correction systems with real-time capabilities.'
    }
];

export default function WorkExperience() {
    const [selectedExperience, setSelectedExperience] = useState<number | null>(null);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'current': return { text: 'Current', bg: 'bg-green-500/20 text-green-400 border-green-500/30' };
            case 'completed': return { text: 'Completed', bg: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
            default: return { text: 'Unknown', bg: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
        }
    };

    const getTypeBadge = (type: string) => {
        const badges = {
            'full-time': { text: 'Full-time', bg: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
            'part-time': { text: 'Part-time', bg: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
            'internship': { text: 'Internship', bg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
            'contract': { text: 'Contract', bg: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
            'freelance': { text: 'Freelance', bg: 'bg-pink-500/20 text-pink-400 border-pink-500/30' }
        };
        return badges[type as keyof typeof badges] || badges['full-time'];
    };    return (
        <div className="max-w-6xl mx-auto">
            {/* Show message if no work experience yet */}
            {workExperienceData.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-6">🚀</div>
                        <h3 className="text-xl font-semibold text-white mb-4">
                            Actively Seeking Opportunities
                        </h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            Currently building my professional experience through academic projects, 
                            research, and seeking internships in AI/ML roles.
                        </p>
                    </motion.div>
                ) : (
                    <>
                        {/* Timeline */}
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-green-500 via-blue-500 to-purple-500" />

                            {/* Experience Cards */}
                            <div className="space-y-12">
                                {workExperienceData.map((experience, index) => (
                                    <motion.div
                                        key={experience.id}
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
                                                className={`w-8 h-8 rounded-full bg-gradient-to-r ${experience.color} flex items-center justify-center text-white font-bold border-4 border-gray-900 shadow-lg`}
                                            >
                                                <span className="text-sm">{experience.icon}</span>
                                            </motion.div>
                                        </div>

                                        {/* Experience Card */}
                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -5 }}
                                            onClick={() => setSelectedExperience(selectedExperience === experience.id ? null : experience.id)}
                                            className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:border-green-500/50 hover:shadow-lg ml-12 sm:ml-0 ${
                                                index % 2 === 0 ? 'sm:mr-1/2 sm:pr-12' : 'sm:ml-1/2 sm:pl-12'
                                            } w-full sm:w-1/2`}
                                        >
                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-1">
                                                        {experience.position}
                                                    </h3>
                                                    <p className="text-green-400 font-semibold mb-1">
                                                        {experience.company}
                                                    </p>
                                                    {experience.department && (
                                                        <p className="text-gray-300 text-sm mb-1">
                                                            {experience.department}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-gray-400">
                                                        {experience.location} • {experience.duration}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusBadge(experience.status).bg}`}>
                                                        {getStatusBadge(experience.status).text}
                                                    </span>
                                                    <span className={`px-3 py-1 rounded-full text-xs border ${getTypeBadge(experience.type).bg}`}>
                                                        {getTypeBadge(experience.type).text}
                                                    </span>
                                                </div>
                                            </div>                                            {/* Description */}
                                            <p className="text-gray-400 mb-4">{experience.description}</p>

                                            {/* Projects Summary */}
                                            <div className="mb-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                                                        <span className="text-blue-400">📋</span>
                                                        Projects Completed
                                                    </h4>
                                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                                                        {experience.projects.total} Project{experience.projects.total !== 1 ? 's' : ''}
                                                    </span>
                                                </div>
                                                <div className="space-y-1">
                                                    {experience.projects.featured.map((project, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                                                            <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                                                            {project}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Quick Highlights */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {experience.highlights.slice(0, 2).map((highlight, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded"
                                                    >
                                                        {highlight}
                                                    </span>
                                                ))}
                                                {experience.highlights.length > 2 && (
                                                    <span className="px-2 py-1 bg-gray-700 text-xs text-gray-400 rounded">
                                                        +{experience.highlights.length - 2} more
                                                    </span>
                                                )}
                                            </div>

                                            {/* Expand Button */}
                                            <button className="text-green-400 text-sm hover:text-green-300 transition-colors flex items-center gap-1">
                                                <span>{selectedExperience === experience.id ? 'Show Less' : 'Show More'}</span>
                                                <motion.span
                                                    animate={{ rotate: selectedExperience === experience.id ? 180 : 0 }}
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
                            {selectedExperience && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                                    onClick={() => setSelectedExperience(null)}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="bg-gray-900/95 backdrop-blur-lg border border-gray-700 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                                    >
                                        {(() => {
                                            const experience = workExperienceData.find(exp => exp.id === selectedExperience);
                                            if (!experience) return null;

                                            return (
                                                <>
                                                    {/* Header */}
                                                    <div className="flex items-start justify-between mb-6">
                                                        <div>
                                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                                {experience.position}
                                                            </h3>
                                                            <p className="text-green-400 text-lg font-semibold">
                                                                {experience.company}
                                                            </p>
                                                            <p className="text-gray-400">
                                                                {experience.location} • {experience.duration}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => setSelectedExperience(null)}
                                                            className="text-gray-400 hover:text-white transition-colors"
                                                        >
                                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    {/* Content Grid */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {/* Responsibilities */}
                                                        <div>
                                                            <h4 className="text-lg font-semibold text-white mb-3">Key Responsibilities</h4>
                                                            <ul className="space-y-2">
                                                                {experience.responsibilities.map((responsibility, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                                                                        <span className="text-green-400 mt-1">•</span>
                                                                        <span>{responsibility}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Achievements */}
                                                        <div>
                                                            <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                                                            <ul className="space-y-2">
                                                                {experience.achievements.map((achievement, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                                                                        <span className="text-blue-400 mt-1">★</span>
                                                                        <span>{achievement}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Technologies */}
                                                        <div>
                                                            <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {experience.technologies.map((tech, idx) => {
                                                                    const techIcon = TECH_ICONS[tech];
                                                                    return (
                                                                        <span
                                                                            key={idx}
                                                                            className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded text-sm"
                                                                        >
                                                                            {techIcon && <techIcon.icon className="w-3.5 h-3.5" style={{ color: techIcon.color }} />}
                                                                            {tech}
                                                                        </span>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>

                                                        {/* Skills */}
                                                        <div>
                                                            <h4 className="text-lg font-semibold text-white mb-3">Skills Developed</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {experience.skills.map((skill, idx) => (
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
                        </AnimatePresence>                        {/* Experience Summary */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="mt-16 text-center"
                        >                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                                    <div className="text-3xl font-bold text-blue-400 mb-2">
                                        {workExperienceData.reduce((total, exp) => total + exp.projects.total, 0)}
                                    </div>
                                    <div className="text-gray-400">Total Projects</div>
                                </div>
                                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                                    <div className="text-3xl font-bold text-green-400 mb-2">
                                        2.5+
                                    </div>
                                    <div className="text-gray-400">Years Experience</div>
                                </div>
                                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                                    <div className="text-3xl font-bold text-purple-400 mb-2">
                                        {workExperienceData.length}
                                    </div>
                                    <div className="text-gray-400">Roles Completed</div>
                                </div>
                            </div>
                        </motion.div>
                    </>                )}
        </div>
    );
}
