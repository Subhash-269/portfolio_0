'use client';

import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import ExperienceTimeline from './components/ExperienceTimeline';
// import EducationalMilestones from './components/EducationalMilestones';
// import WorkExperience from './components/WorkExperience';
// import InteractiveSkills from './components/InteractiveSkills';
import SystemArchitecture from './components/SystemArchitecture';
// import ProjectDemos from './components/ProjectDemos';
import TechnicalMetrics from './components/TechnicalMetrics';
import ContactSection from './components/ContactSection';
import TerminalPopup from './components/TerminalPopup';
// import ThemeToggle from './components/ThemeToggle';
// import InteractiveBackground from './components/InteractiveBackground';

export default function BackendPortfolio() {
	const [isLoading, setIsLoading] = useState(true);

	const handleLoadingComplete = () => {
		setIsLoading(false);
	};
	return (
		<>
			{isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
			
			{/* Interactive Background Effects */}
			{/* <InteractiveBackground /> */}
			
			{/* Theme Toggle */}
			{/* <ThemeToggle /> */}
			
			<main className="min-h-screen theme-bg-primary theme-text-primary overflow-x-hidden relative z-10">
				<HeroSection />
				<ExperienceTimeline />
				{/* <InteractiveSkills /> */}
				<SystemArchitecture />
				{/* <ProjectDemos />  */}
				<TechnicalMetrics />
				<ContactSection />
				<TerminalPopup />
			</main>
		</>
	);
}
