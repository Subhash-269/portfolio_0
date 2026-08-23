import { IconType } from 'react-icons';
import {
	SiPython, SiPytorch, SiHuggingface, SiDjango, SiFastapi,
	SiDatabricks, SiApachespark, SiMlflow, SiNeo4J, SiStreamlit,
	SiLangchain, SiLanggraph, SiReact, SiPostgresql, SiGooglegemini,
	SiSqlite, SiYolo, SiTypescript
} from 'react-icons/si';

interface TechIcon {
	icon: IconType;
	color: string;
}

// Official simple-icons brand hex, except Django (#092E20 is unreadable on our dark background).
export const TECH_ICONS: Record<string, TechIcon> = {
	'Python': { icon: SiPython, color: '#3776AB' },
	'PyTorch': { icon: SiPytorch, color: '#EE4C2C' },
	'Hugging Face': { icon: SiHuggingface, color: '#FFD21E' },
	'Django': { icon: SiDjango, color: '#44B78B' },
	'FastAPI': { icon: SiFastapi, color: '#009688' },
	'Databricks': { icon: SiDatabricks, color: '#FF3621' },
	'PySpark': { icon: SiApachespark, color: '#E25A1C' },
	'MLflow': { icon: SiMlflow, color: '#0194E2' },
	'Neo4j': { icon: SiNeo4J, color: '#4581C3' },
	'Streamlit': { icon: SiStreamlit, color: '#FF4B4B' },
	'LangChain': { icon: SiLangchain, color: '#7FC8FF' },
	'LangGraph': { icon: SiLanggraph, color: '#7FC8FF' },
	'React': { icon: SiReact, color: '#61DAFB' },
	'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
	'Google Gemini API': { icon: SiGooglegemini, color: '#8E75B2' },
	'SQLite': { icon: SiSqlite, color: '#003B57' },
	'YOLOv11': { icon: SiYolo, color: '#111F68' },
	'TypeScript': { icon: SiTypescript, color: '#3178C6' },
};
