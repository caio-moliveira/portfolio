import {
  siPython,
  siTypescript,
  siJavascript,
  siDocker,
  siLangchain,
  siAnthropic,
  siHuggingface,
  siApacheairflow,
  siSnowflake,
  siDatabricks,
  siApachekafka,
  siApachespark,
  siDuckdb,
  siFastapi,
  siCelery,
  siStreamlit,
  siVercel,
  siPandas,
  siNumpy,
  siPostgresql,
  siNvidia,
  siJupyter,
  siGit,
  siGithub,
  siPytorch,
  siTensorflow,
  siScikitlearn,
  siOllama,
  siNextdotjs,
  siReact,
  siTailwindcss,
  siRedis,
  siMysql,
  siQdrant,
  siLanggraph,
} from "simple-icons";

export type TechIconData = { title: string; hex: string; path: string };

// OpenAI was removed from Simple Icons; ship the official mark ourselves.
const openai: TechIconData = {
  title: "OpenAI",
  hex: "10A37F",
  path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7495-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
};

// Microsoft Azure was also removed from Simple Icons; official "A" mark.
const azure: TechIconData = {
  title: "Microsoft Azure",
  hex: "0078D4",
  path: "M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.108 8.782 0 19.287h5.508v.014L13.23 2.7z",
};

// Normalized tech name -> icon data. Covers the aliases used across the site.
const registry: Record<string, TechIconData> = {
  python: siPython,
  typescript: siTypescript,
  javascript: siJavascript,
  docker: siDocker,
  langchain: siLangchain,
  langgraph: siLanggraph,
  qdrant: siQdrant,
  azure: azure,
  "microsoft azure": azure,
  anthropic: siAnthropic,
  mcp: siAnthropic,
  openai: openai,
  "openai embeddings": openai,
  "hugging face": siHuggingface,
  huggingface: siHuggingface,
  airflow: siApacheairflow,
  "apache airflow": siApacheairflow,
  snowflake: siSnowflake,
  databricks: siDatabricks,
  kafka: siApachekafka,
  "apache kafka": siApachekafka,
  spark: siApachespark,
  "apache spark": siApachespark,
  duckdb: siDuckdb,
  fastapi: siFastapi,
  celery: siCelery,
  streamlit: siStreamlit,
  vercel: siVercel,
  pandas: siPandas,
  numpy: siNumpy,
  postgresql: siPostgresql,
  postgres: siPostgresql,
  nvidia: siNvidia,
  "nvidia l40s": siNvidia,
  "nvidia gpu (l40s)": siNvidia,
  jupyter: siJupyter,
  git: siGit,
  github: siGithub,
  pytorch: siPytorch,
  tensorflow: siTensorflow,
  "scikit-learn": siScikitlearn,
  ollama: siOllama,
  "next.js": siNextdotjs,
  react: siReact,
  "tailwind css": siTailwindcss,
  redis: siRedis,
  mysql: siMysql,
};

export function getTechIcon(name: string): TechIconData | null {
  const key = name.trim().toLowerCase();
  return registry[key] ?? null;
}

/**
 * Brands with no bundled logo (removed from Simple Icons / no official SVG here).
 * Drop a real SVG at /brand/tech/<slug>.svg and it's used automatically; until
 * then a brand-colored dot stands in.
 */
export type FileBrand = { slug: string; hex: string };
const fileBrands: Record<string, FileBrand> = {
  oracle: { slug: "oracle", hex: "C74634" },
  langfuse: { slug: "langfuse", hex: "0EA5E9" },
  llamaindex: { slug: "llamaindex", hex: "8B5CF6" },
};
export function getFileBrand(name: string): FileBrand | null {
  return fileBrands[name.trim().toLowerCase()] ?? null;
}

/** True luminance check so near-black brand marks stay visible on a dark theme. */
export function isDarkHex(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.22;
}

// Curated, recognizable set for the animated marquee (all have real logos).
export const marqueeTech: string[] = [
  "Python",
  "LangChain",
  "LangGraph",
  "OpenAI",
  "Anthropic",
  "Qdrant",
  "React",
  "FastAPI",
  "Docker",
  "Azure",
  "Hugging Face",
  "Apache Airflow",
  "Snowflake",
  "Databricks",
  "Apache Kafka",
  "Apache Spark",
  "DuckDB",
  "Celery",
  "PostgreSQL",
  "NVIDIA",
  "TypeScript",
  "Streamlit",
  "Vercel",
];
