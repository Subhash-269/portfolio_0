'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EducationalMilestones from './EducationalMilestones';
import WorkExperience from './WorkExperience';
import { useMobile } from '../hooks/useMobile';

export default function ExperienceTimeline() {
    const [activeView, setActiveView] = useState<'education' | 'work'>('education');
    const mobile = useMobile();

    const toggleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const contentVariants = {
        hidden: { 
            opacity: 0, 
            x: activeView === 'education' ? -30 : 30,
            scale: 0.95
        },
        visible: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            transition: {
                duration: mobile.isMobile ? 0.3 : 0.5,
                ease: "easeInOut"
            }
        },
        exit: { 
            opacity: 0, 
            x: activeView === 'education' ? 30 : -30,
            scale: 0.95,
            transition: {
                duration: mobile.isMobile ? 0.2 : 0.3
            }
        }
    };

    return (
        <section className="py-20 px-4" data-section="experience">
            <div className="max-w-6xl mx-auto">
                {/* Header with Toggle */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={toggleVariants}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text-animated">
                        My Journey
                    </h2>
                    
                    {/* Toggle Switch */}
                    <div className="relative inline-flex bg-gray-800/50 dark:bg-gray-800/70 rounded-full p-1 border border-gray-700/50 dark:border-gray-600/50 backdrop-blur-sm">
                        {/* Slider Background */}
                        <motion.div
                            layoutId="activeTab"
                            className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            style={{
                                left: activeView === 'education' ? '4px' : '50%',
                                right: activeView === 'education' ? '50%' : '4px',
                            }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 300, 
                                damping: 30 
                            }}
                        />
                        
                        {/* Education Button */}
                        <button
                            onClick={() => setActiveView('education')}
                            className={`relative z-10 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                mobile.isTouchDevice ? 'min-h-[44px]' : ''
                            } ${
                                activeView === 'education'
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-gray-200'
                            }`}
                            style={{
                                WebkitTapHighlightColor: 'transparent',
                                WebkitUserSelect: 'none',
                                userSelect: 'none'
                            }}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-lg">🎓</span>
                                Education
                            </span>
                        </button>
                        
                        {/* Work Experience Button */}
                        <button
                            onClick={() => setActiveView('work')}
                            className={`relative z-10 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                mobile.isTouchDevice ? 'min-h-[44px]' : ''
                            } ${
                                activeView === 'work'
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-gray-200'
                            }`}
                            style={{
                                WebkitTapHighlightColor: 'transparent',
                                WebkitUserSelect: 'none',
                                userSelect: 'none'
                            }}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-lg">💼</span>
                                Work Experience
                            </span>
                        </button>
                    </div>

                    {/* Subtitle */}
                    <motion.p 
                        key={activeView}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 dark:text-gray-300 mt-4 text-lg"
                    >
                        {activeView === 'education' 
                            ? 'Academic achievements and learning milestones' 
                            : 'Professional experience and career highlights'
                        }
                    </motion.p>
                </motion.div>

                {/* Content Area */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        {activeView === 'education' ? (
                            <motion.div
                                key="education"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <EducationalMilestones />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="work"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <WorkExperience />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center mt-8 gap-2"
                >
                    <div 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            activeView === 'education' ? 'bg-blue-500 w-8' : 'bg-gray-600'
                        }`} 
                    />
                    <div 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            activeView === 'work' ? 'bg-purple-500 w-8' : 'bg-gray-600'
                        }`} 
                    />
                </motion.div>
            </div>
        </section>
    );
}
