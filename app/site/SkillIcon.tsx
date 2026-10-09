import type { IconType } from 'react-icons';
import {
	SiPython, SiPytorch, SiLanggraph, SiLangchain, SiDatabricks, SiRay, SiNeo4J, SiFastapi, SiDjango,
	SiDocker, SiLinux, SiScikitlearn, SiTensorflow, SiHuggingface, SiSnowflake, SiApachespark,
	SiOpenjdk, SiReact, SiVite, SiSupabase, SiPostgresql, SiOllama, SiYolo, SiDvc, SiScipy, SiNumpy, SiGithubactions, SiKubernetes,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';
import { TbSql, TbVector } from 'react-icons/tb';

// Brand colors where they read on both themes; null = follow the text color
// (brands whose mark is black or near-black would vanish on the dark theme).
const ICONS: Record<string, [IconType, string | null]> = {
	Python: [SiPython, '#3776AB'],
	PyTorch: [SiPytorch, '#EE4C2C'],
	LangGraph: [SiLanggraph, null],
	LangChain: [SiLangchain, null],
	Databricks: [SiDatabricks, '#FF3621'],
	Ray: [SiRay, '#028CF0'],
	Neo4j: [SiNeo4J, '#4581C3'],
	FastAPI: [SiFastapi, '#009688'],
	Django: [SiDjango, '#44B78B'],
	'Django REST': [SiDjango, '#44B78B'],
	Docker: [SiDocker, '#2496ED'],
	Linux: [SiLinux, null],
	'scikit-learn': [SiScikitlearn, '#F7931E'],
	TensorFlow: [SiTensorflow, '#FF6F00'],
	'Hugging Face': [SiHuggingface, '#FFB000'],
	Snowflake: [SiSnowflake, '#29B5E8'],
	PySpark: [SiApachespark, '#E25A1C'],
	Java: [SiOpenjdk, null],
	React: [SiReact, '#149ECA'],
	'React 19': [SiReact, '#149ECA'],
	Vite: [SiVite, '#9B6BFF'],
	Supabase: [SiSupabase, '#3ECF8E'],
	PostgreSQL: [SiPostgresql, '#4169E1'],
	Ollama: [SiOllama, null],
	YOLOv11: [SiYolo, null],
	DVC: [SiDvc, '#13ADC7'],
	SciPy: [SiScipy, '#3B82C4'],
	NumPy: [SiNumpy, '#4D77CF'],
	'CI/CD': [SiGithubactions, '#2088FF'],
	Kubernetes: [SiKubernetes, '#326CE5'],
	'Kubernetes (learning)': [SiKubernetes, '#326CE5'],
	AWS: [FaAws, '#FF9900'],
	Azure: [VscAzure, '#0089D6'],
	SQL: [TbSql, null],
	'Vector Search': [TbVector, null],
	'Databricks Vector Search': [SiDatabricks, '#FF3621'],
};

export function SkillIcon({ name }: { name: string }) {
	const hit = ICONS[name];
	if (!hit) return null;
	const [Icon, color] = hit;
	return <Icon aria-hidden="true" className="sk-ic" style={color ? { color } : undefined} />;
}

export function SkillChip({ name, strong = false }: { name: string; strong?: boolean }) {
	return (
		<span className={strong ? 'k' : undefined}>
			<SkillIcon name={name} />
			{name}
		</span>
	);
}
