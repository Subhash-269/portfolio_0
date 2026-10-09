// Single source for the site's content. Facts come from the owner's knowledge base;
// keep numbers and claims in sync with it rather than editing pages directly.

export const person = {
	name: 'Venkat Neelraj Nitta',
	handle: '~/venkat',
	role: 'AI/ML engineer',
	location: 'Boston, MA',
	email: 'vneelraj.nitta@gmail.com',
	linkedin: 'https://www.linkedin.com/in/v-neelraj-nitta/',
	github: 'https://github.com/Subhash-269',
	resume: '/resume/VenkatNeelraj.pdf',
	intro:
		'AI/ML engineer with 2+ years building ML and LLM systems in Python. At Staples I maintained and extended the retrieval layer of an agentic e-commerce system and owned the data path feeding it. MS in Applied Machine Intelligence at Northeastern, graduating December 2026.',
	openTo: 'full-time AI/ML and software roles',
	relocation: 'yes',
	chips: {
		core: ['Python', 'PyTorch', 'Databricks', 'Vector Search', 'Neo4j', 'Ray'],
		more: ['RAG', 'LangGraph', 'FastAPI', 'Django', 'SQL'],
	},
};

export const log = [
	{ when: '2026-09', text: 'started as Lead TA, AAI 5004' },
	{ when: '2026-07', text: 'wrapped Staples internship' },
	{ when: '2026', text: 'batch tagging on Ray', ok: '~4 h → 90 min' },
	{ when: '2026-06', text: 'shipped QTrack', ok: 'live' },
	{ when: 'now', text: 'adding LangGraph to InsurAsst' },
	{ when: 'now', text: 'learning Kubernetes' },
];

export const DOMAINS = {
	insurance: 'Insurance',
	fintech: 'Fintech',
	retail: 'Retail / E-commerce',
	'hr-tech': 'HR Tech',
	productivity: 'Productivity',
	optimization: 'Optimization',
} as const;
export type Domain = keyof typeof DOMAINS;

export type Project = {
	slug: string;
	domain: Domain;
	name: string;
	dir: string;
	when: string;
	summary: string;
	detail: string[];
	stack: string[];
	metric?: string;
	links: { label: string; href: string }[];
	shots?: { src: string; alt: string }[];
	shotsNote?: string;
	solvers?: string[];
};

export const projects: Project[] = [
	{
		slug: 'insurasst',
		domain: 'insurance',
		name: 'InsurAsst',
		dir: 'insurasst/',
		when: 'Oct 2025',
		summary: 'Local-first RAG over insurance policy documents plus YOLOv11 vehicle-damage segmentation, served from Django.',
		detail: [
			'LangChain loaders for six file formats, recursive chunking, all-MiniLM-L6-v2 embeddings and a FAISS store with per-document filtering.',
			'YOLOv11 segmentation fine-tuned on the CarDD dataset for six damage classes; detection counts ground the LLM damage summary.',
			'Pluggable local LLM (Ollama or a 4-bit quantized Hugging Face model) with a token-streaming endpoint.',
		],
		stack: ['Python', 'Django', 'LangChain', 'FAISS', 'YOLOv11', 'Ollama'],
		metric: '6 damage classes · token streaming',
		links: [{ label: 'github', href: 'https://github.com/Subhash-269/InsurAsst' }],
		shots: [
			{ src: '/projects/insurasst-workspace.png', alt: 'InsurAsst workspace: chat over policy documents' },
			{ src: '/projects/insurasst-estimator.png', alt: 'InsurAsst vehicle damage estimator' },
			{ src: '/projects/insurasst-documents.png', alt: 'InsurAsst policy document library' },
		],
	},
	{
		slug: 'artha',
		domain: 'fintech',
		name: 'Artha AI',
		dir: 'artha-ai/',
		when: 'Dec 2025',
		summary: 'A PyTorch CNN that outputs portfolio weights directly, trained on a Sharpe-based objective over 24 assets.',
		detail: [
			'Convolves along the time axis per asset over 50-day windows with GICS sector encoding, and emits weights through a softmax instead of forecasting prices.',
			'Custom differentiable loss: Sharpe ratio, turnover commission, concentration penalty and an entropy bonus, benchmarked against equal weight.',
			'Served as a Django REST API behind a React dashboard, packaged as one multi-stage Docker image.',
		],
		stack: ['PyTorch', 'Django REST', 'React', 'Docker', 'DVC'],
		metric: '24 assets · equities + commodities',
		links: [{ label: 'github', href: 'https://github.com/Subhash-269/artha-ai-portfolio' }],
		shots: [
			{ src: '/projects/artha-dashboard.png', alt: 'Artha AI dashboard: asset class performance' },
			{ src: '/projects/artha-training.png', alt: 'Artha AI model training in progress' },
			{ src: '/projects/artha-results.png', alt: 'Artha AI portfolio results' },
		],
	},
	{
		slug: 'qtrack',
		domain: 'productivity',
		name: 'QTrack',
		dir: 'qtrack/',
		when: 'Jun 2026',
		summary: 'Study and issue tracker on Supabase with a focus timer that stays correct across devices.',
		detail: [
			'React 19 and Vite on Supabase (Postgres, Auth, Storage, Realtime), with email, GitHub and Google sign-in.',
			'Timer state persists to Postgres and remaining time is recomputed from the stored start time, so a closed tab resumes at the right second.',
			'PDF study reader on pdfjs-dist with per-page highlights linked to notes; a news feed from an Edge Function calling the Anthropic API.',
		],
		stack: ['React 19', 'Vite', 'Supabase', 'PostgreSQL', 'Edge Functions'],
		metric: 'live demo',
		links: [
			{ label: 'live demo', href: 'https://qtrack-steel.vercel.app/demo' },
			{ label: 'github', href: 'https://github.com/Subhash-269/qtrack' },
		],
		shots: [
			{ src: '/projects/qtrack-dashboard.png', alt: 'QTrack dashboard' },
			{ src: '/projects/qtrack-study.png', alt: 'QTrack PDF study reader' },
			{ src: '/projects/qtrack-focus.png', alt: 'QTrack focus timer' },
		],
	},
	{
		slug: 'chore-scheduler',
		domain: 'optimization',
		name: 'Chore Scheduler',
		dir: 'chore-scheduler/',
		when: 'Aug 2026',
		summary: 'The same constrained assignment problem solved six ways, cross-checked, and ranked on violations, rest balance and fairness.',
		detail: [
			'MILP formulated by hand as a scipy.sparse constraint matrix solved with HiGHS.',
			'Two-phase optimization: first minimize how many soft rules bend, then optimize fairness among those schedules.',
			'A safety-gated beam-search repair layer fixes rest-gap violations without making correctness or fairness worse.',
		],
		stack: ['Python', 'SciPy', 'NumPy', 'React'],
		solvers: ['MILP · HiGHS', 'Greedy', 'Sim. annealing', 'Tabu search', 'Genetic', 'Hungarian'],
		shots: [
			{ src: '/projects/chore-overview.png', alt: 'Chore Scheduler mobile UI mockups: today, weekly calendar, household fairness, chore setup' },
			{ src: '/projects/chore-today-fairness.png', alt: 'Chore Scheduler mockups: today view and workload balance' },
			{ src: '/projects/chore-calendars.png', alt: 'Chore Scheduler mockups: two weekly calendar layouts' },
		],
		shotsNote: 'UI mockups from the repo',
		links: [{ label: 'github', href: 'https://github.com/Subhash-269/chore-scheduler' }],
	},
];

export const hackathons = [
	{
		name: 'Lighthouse',
		domain: 'hr-tech' as Domain,
		won: true,
		when: 'May 2026',
		text: 'Employee onboarding and recognition platform, built by a team of four for the Workhuman-sponsored hackathon. I presented the live demo and took questions from the judges.',
		stack: 'Python · React · FastAPI · LLM',
		href: 'https://github.com/Subhash-269/ex-cdi',
	},
	{
		name: 'SmartCart',
		domain: 'retail' as Domain,
		won: false,
		when: 'Feb 2025',
		text: 'Finds the lowest vendor prices across sources to cut grocery shopping time. I led development at InnovAIte, Northeastern.',
		stack: 'Django · PostgreSQL · React · Gemini API',
		href: 'https://github.com/Subhash-269/Innovaite-2025',
	},
];

export const experience = [
	{
		when: 'Sep 2026 – now',
		role: 'Lead Teaching Assistant',
		org: 'Northeastern University · Boston, MA',
		text: 'AAI 5004, Applications of AI for Professionals. Review course material for technical accuracy, guide students through assignments, grade, and draft course announcements.',
		current: true,
	},
	{
		when: 'Jan – Jul 2026',
		role: 'AI Engineer Intern',
		org: 'Staples · Framingham, MA',
		text: 'Maintained and extended the retrieval layer (3 Databricks Vector Search indexes and a Neo4j product graph), owned the Snowflake-to-Delta data path, and built the SKU enrichment classifier.',
		link: { label: 'case study', href: '/case-studies/staples' },
	},
	{
		when: 'Jul 2022 – Aug 2024',
		role: 'Software/AI Developer',
		org: 'Cognida.ai · Hyderabad, India',
		text: 'Unsupervised claims anomaly detection, retrieval for financial document search, OCR and computer-vision models, LLM fine-tuning and quantization, and an AWS vs Azure serving comparison.',
		link: { label: 'case study', href: '/case-studies/cognida' },
	},
];

export const education = [
	{ when: 'Sep 2024 – Dec 2026', role: 'MPS, Applied Machine Intelligence', org: 'Northeastern University', text: 'GPA 3.92. Expected December 2026. Fundamentals of AI, AI System Technologies, Data Management & Big Data.' },
	{ when: 'Aug 2018 – Jun 2022', role: 'B.Tech, Electrical and Electronics Engineering', org: 'Mahindra Ecole Centrale · Hyderabad', text: 'Machine Learning, Data Structures, Big Data Computing.' },
];

export const skills = [
	{ group: 'Languages and backend', items: 'Python, asyncio, SQL, Java, FastAPI, Django, REST APIs, Docker, Linux' },
	{ group: 'ML and deep learning', items: 'PyTorch, scikit-learn, TensorFlow, Hugging Face, DeBERTa fine-tuning, quantization, Ray' },
	{ group: 'LLMs, agents and retrieval', items: 'LangGraph, LangChain, RAG, Databricks Vector Search, FAISS, embeddings, LLM-as-judge evaluation' },
	{ group: 'Data and cloud', items: 'Databricks, Delta Lake, Snowflake, PySpark, Neo4j, AWS, Azure, CI/CD, Kubernetes (learning)' },
];

export const certifications = [
	{ when: 'Aug 2026', name: 'AI Tools Workshop', by: 'be10x Academy' },
	{ when: 'Apr 2026', name: 'AI Agents on Databricks', by: 'Databricks Academy' },
	{ when: 'Sep 2024', name: 'Applying AI Technologies to the Workplace', by: 'Northeastern University' },
	{ when: 'May 2024', name: 'Generative AI with Large Language Models', by: 'DeepLearning.AI' },
	{ when: '2024', name: 'Crash Course on Python', by: 'Google' },
];
