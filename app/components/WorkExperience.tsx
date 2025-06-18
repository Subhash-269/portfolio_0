'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    icon: string;
    color: string;
    description: string;
}

const workExperienceData: WorkExperience[] = [
    {
        id: 1,
        company: 'Cognida.AI',
        position: 'Software Developer',
        // department: 'Applied Machine Intelligence Program',
        duration: 'Feb 2022 - Aug 2024',
        location: 'Hyderabad, India',
        type: 'full-time',
        status: 'completed',
        highlights: [
            'Supporting AI coursework and student mentoring',
            'Assisting with research projects and lab sessions',
            'Grading assignments and providing feedback',
            'Office hours and student consultation'
        ],
        responsibilities: [
            'Assist professors in teaching AI fundamentals',
            'Grade assignments and provide detailed feedback',
            'Conduct lab sessions and tutorials',
            'Mentor students on projects and research',
            'Support course administration and logistics'
        ],
        technologies: ['Python', 'PyTorch', 'TensorFlow', 'Jupyter', 'Git'],
        achievements: [
            'Helped improve student understanding of complex AI concepts',
            'Contributed to course material development',
            'Maintained high student satisfaction ratings'
        ],
        skills: ['Teaching', 'Mentoring', 'Research', 'Communication', 'Python', 'AI/ML'],
        icon: '🎓',
        color: 'from-blue-500 to-purple-600',
        description: 'Supporting the next generation of AI professionals through teaching and mentorship.'
    },
    // Add more work experiences here as you gain them
    // Example template for future experiences:
    /*
    {
        id: 2,
        company: 'Tech Company Name',
        position: 'AI/ML Engineer Intern',
        department: 'Machine Learning Team',
        duration: 'Summer 2025',
        location: 'Boston, MA',
        type: 'internship',
        status: 'completed',
        highlights: [
            'Developed ML models for production systems',
            'Collaborated with cross-functional teams',
            'Implemented data pipelines',
            'Participated in code reviews and team meetings'
        ],
        responsibilities: [
            'Design and implement machine learning models',
            'Optimize model performance and scalability',
            'Collaborate with data scientists and engineers',
            'Write clean, maintainable code',
            'Participate in agile development processes'
        ],
        technologies: ['Python', 'PyTorch', 'AWS', 'Docker', 'Git'],
        achievements: [
            'Improved model accuracy by 15%',
            'Reduced training time by 30%',
            'Successfully deployed models to production'
        ],
        skills: ['Machine Learning', 'Python', 'AWS', 'Team Collaboration', 'Problem Solving'],
        icon: '💼',
        color: 'from-green-500 to-teal-600',
        description: 'Applied machine learning expertise to solve real-world business problems.'
    }
    */
];

export default function WorkExperience() {
    const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'current': return 'text-green-400';
            case 'completed': return 'text-blue-400';
            default: return 'text-gray-400';
        }
    };

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
    };

    return (
        <section ref={sectionRef} className="py-12 sm:py-20 px-4" data-section="experience">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                        Professional Experience
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        My professional journey in AI and technology, building practical experience 
                        while contributing to meaningful projects and learning from industry experts.
                    </p>
                </motion.div>

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
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-400 mb-4">{experience.description}</p>

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
                                                                {experience.technologies.map((tech, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded text-sm"
                                                                    >
                                                                        {tech}
                                                                    </span>
                                                                ))}
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
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                                    <div className="text-3xl font-bold text-green-400 mb-2">
                                        {workExperienceData.filter(exp => exp.status === 'current').length}
                                    </div>
                                    <div className="text-gray-400">Current Roles</div>
                                </div>
                                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                                    <div className="text-3xl font-bold text-blue-400 mb-2">
                                        {workExperienceData.length}
                                    </div>
                                    <div className="text-gray-400">Total Experiences</div>
                                </div>
                                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                                    <div className="text-3xl font-bold text-purple-400 mb-2">
                                        {Array.from(new Set(workExperienceData.flatMap(exp => exp.technologies))).length}
                                    </div>
                                    <div className="text-gray-400">Technologies Used</div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
}
