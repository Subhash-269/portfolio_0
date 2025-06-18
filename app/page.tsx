'use client';

import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import EducationalMilestones from './components/EducationalMilestones';
import WorkExperience from './components/WorkExperience';
import InteractiveSkills from './components/InteractiveSkills';
import SystemArchitecture from './components/SystemArchitecture';
import ProjectDemos from './components/ProjectDemos';
import TechnicalMetrics from './components/TechnicalMetrics';
import ContactSection from './components/ContactSection';
import TerminalPopup from './components/TerminalPopup';

export default function BackendPortfolio() {
	const [isLoading, setIsLoading] = useState(true);

	const handleLoadingComplete = () => {
		setIsLoading(false);
	};

	return (
		<>
			{isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}			<main className="min-h-screen bg-[#1A1A1A] text-white overflow-x-hidden">
				<HeroSection />
				<EducationalMilestones />
				{/* <WorkExperience /> */}
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
