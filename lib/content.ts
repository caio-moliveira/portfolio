import type { Bi, Lang } from "./utils";

/* =========================================================================
   Knowledge base — single source of truth for the site AND the AI agent.
   Every human-facing string is bilingual { pt, en }.
   ========================================================================= */

export const profile = {
  name: "Caio Machado de Oliveira",
  shortName: "Caio Machado",
  role: {
    pt: "Product Owner & AI Engineer",
    en: "Product Owner & AI Engineer",
  } as Bi,
  location: { pt: "Montes Claros, MG, Brasil", en: "Montes Claros, MG, Brazil" } as Bi,
  tagline: {
    pt: "Transformo conhecimento organizacional e desafios operacionais em produtos de IA que geram valor real.",
    en: "I turn organizational knowledge and operational challenges into AI products that create real value.",
  } as Bi,
  headline: {
    pt: "Engenheiro de IA construindo agentes, RAG e produtos que colocam inteligência em operação.",
    en: "AI Engineer building agents, RAG and products that put intelligence into operation.",
  } as Bi,
  homeTitle: {
    pt: "Transformo problemas em soluções de IA",
    en: "I turn problems into AI solutions",
  } as Bi,
  homeSubtitle: {
    pt: "Product Owner e Engenheiro de IA. Uno visão de produto, engenharia de verdade e um olhar humano para entender pessoas e resolver problemas.",
    en: "Product Owner and AI Engineer. I combine product vision, real engineering and a human eye for understanding people and solving problems.",
  } as Bi,
  bio: {
    pt: "Sou Product Owner e Engenheiro de IA, focado em transformar conhecimento e operação em produtos de IA que funcionam de verdade. Projeto e implemento soluções de busca em documentos, análise, automação inteligente e apoio à decisão, sempre unindo visão de produto com engenharia mão na massa. No TCEMG, lidero sistemas de IA para o setor público, incluindo um assistente que pesquisa mais de 500 mil documentos e workflows que fazem a primeira análise de auditorias. Também ensino IA, palestro para desenvolvedores, times, empresas e faculdades, e ajudo organizações a colocarem IA em produção com estratégia e segurança.",
    en: "I'm a Product Owner and AI Engineer focused on turning knowledge and operations into AI products that truly work. I design and implement solutions for document search, analysis, intelligent automation and decision support, always combining product vision with hands-on engineering. At TCEMG I lead AI systems for the public sector, including an assistant that searches more than 500,000 documents and workflows that run first-pass analysis of audits. I also teach AI, speak to developers, teams, companies and colleges, and help organizations put AI into production with strategy and safety.",
  } as Bi,
  photo: "/brand/foto-perfil.png",
  photoPro: "/brand/caio.jpg",
  photoCutout: "/brand/caio-cutout.png",
  logo: "/brand/logo-caio.png",
  logoSquare: "/brand/logo.png",
  heroBg: "/brand/logo.png",
  resume: "/CaioMachado-AI.docx",
};

/* ---------------- About me (personal + professional narrative) ---------------- */
export const manifesto = {
  kicker: { pt: "Como eu penso", en: "How I think" } as Bi,
  headlineLead: {
    pt: "A habilidade mais valiosa de um profissional de IA não é técnica.",
    en: "The most valuable skill of an AI professional isn't technical.",
  } as Bi,
  headlineEmphasis: {
    pt: "É entender pessoas e problemas de verdade.",
    en: "It's truly understanding people and problems.",
  } as Bi,
  body: [
    {
      pt: "Sou movido por curiosidade e por método. Antes de construir qualquer coisa, eu escuto: entendo o contexto, as pessoas envolvidas e o problema real por trás do pedido. É aí que as boas soluções começam.",
      en: "I'm driven by curiosity and by method. Before building anything, I listen. I get to know the context, the people involved and the real problem behind the request. That's where good solutions start.",
    },
    {
      pt: "Gosto de transformar o complexo em algo claro, útil e que funciona em produção. E acredito que dar um passo atrás para estruturar bem os processos, antes de acelerar, é o que constrói resultados que duram e leva o time mais longe.",
      en: "I love turning complexity into something clear, useful and production ready. And I believe that stepping back to structure processes well, before speeding up, is what builds results that last and takes the team further.",
    },
  ] as Bi[],
  signature: {
    pt: "Caio Machado, Product Owner & Engenheiro de IA",
    en: "Caio Machado, Product Owner & AI Engineer",
  } as Bi,
};

export type AboutHighlight = { icon: string; stat: Bi; label: Bi };
export const aboutHighlights: AboutHighlight[] = [
  {
    icon: "Play",
    stat: { pt: "+50h", en: "50h+" },
    label: { pt: "de conteúdo de IA criado", en: "of AI content created" },
  },
  {
    icon: "Users",
    stat: { pt: "Consultoria", en: "Consulting" },
    label: {
      pt: "para empresas e times de desenvolvimento adotarem ou implementarem IA em projetos e processos",
      en: "helping companies and dev teams adopt or implement AI in projects and processes",
    },
  },
  {
    icon: "Cpu",
    stat: { pt: "2 anos", en: "2 years" },
    label: { pt: "construindo IA em sistemas de produção", en: "building AI in production systems" },
  },
  {
    icon: "Layers",
    stat: { pt: "Product Owner", en: "Product Owner" },
    label: {
      pt: "à frente da arquitetura de projetos full stack com IA",
      en: "leading the architecture of full-stack AI projects",
    },
  },
];

export const socials = {
  email: "moliveiracaio@gmail.com",
  linkedin: "https://linkedin.com/in/caiomoliveira",
  github: "https://github.com/caio-moliveira",
  githubUser: "caio-moliveira",
  youtube: "https://www.youtube.com/@JornadaDeDados",
  calendly: "https://calendly.com/moliveiracaio/30min",
};

export type Metric = { value: string; label: Bi };
export const metrics: Metric[] = [
  { value: "500k+", label: { pt: "documentos pesquisáveis por IA", en: "documents searchable by AI" } },
  { value: "853", label: { pt: "municípios com contas 100% analisadas por IA", en: "municipalities with accounts 100% analyzed by AI" } },
  { value: "7d → 0.5d", label: { pt: "análise fiscal de 300+ documentos", en: "tax analysis of 300+ documents" } },
  { value: "5+ dias → min", label: { pt: "análise de editais de concurso", en: "public-tender review" } },
];

/* ---------------- Experience / timeline ---------------- */
export type Experience = {
  id: string;
  company: string;
  logo?: string;
  role: Bi;
  period: Bi;
  current?: boolean;
  education?: boolean;
  location: Bi;
  summary: Bi;
  highlights: Bi[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    id: "tcemg",
    company: "Tribunal de Contas do Estado de Minas Gerais (TCEMG)",
    logo: "/brand/companies/tcemg.png",
    role: { pt: "Product Owner & Engenheiro de IA", en: "Product Owner & AI Engineer" },
    period: { pt: "Desde Jul 2025", en: "Since Jul 2025" },
    current: true,
    location: { pt: "Setor público", en: "Public sector" },
    summary: {
      pt: "Lidero a concepção e a entrega de produtos de IA para o setor público e ensino IA aos servidores, levando capacidade real de IA para o dia a dia da instituição.",
      en: "I lead the design and delivery of AI products for the public sector and teach AI to public servants, bringing real AI capability into the institution's daily work.",
    },
    highlights: [
      { pt: "Concebi e coloquei em produção um assistente RAG (LangChain, LangGraph e LlamaIndex) que pesquisa mais de 500 mil documentos institucionais.", en: "Designed and shipped a RAG assistant (LangChain, LangGraph and LlamaIndex) that searches over 500,000 institutional documents." },
      { pt: "Criei workflows de IA que fazem a primeira análise de documentos de auditoria, elevando a qualidade e a velocidade da revisão.", en: "Built AI workflows that run first-pass analysis of audit documents, raising review quality and speed." },
      { pt: "Ensino Letramento em IA aos servidores, ajudando as pessoas a usarem IA com autonomia e segurança.", en: "I teach AI Literacy to public servants, helping people use AI with autonomy and confidence." },
    ],
    tags: ["Python", "FastAPI", "LangGraph", "LlamaIndex", "Qdrant", "OpenAI", "Docker", "Azure"],
  },
  {
    id: "jornada",
    company: "Jornada de Dados",
    logo: "/brand/companies/jornada.jpg",
    role: { pt: "Professor de Engenharia de IA", en: "AI Engineer Teacher" },
    period: { pt: "Desde Fev 2025", en: "Since Feb 2025" },
    current: true,
    location: { pt: "Educação / EdTech", en: "Education / EdTech" },
    summary: {
      pt: "Crio e ministro cursos, workshops e conteúdo técnico de IA aplicada para desenvolvedores e times.",
      en: "I create and deliver courses, workshops and technical content on applied AI for developers and teams.",
    },
    highlights: [
      { pt: "Conteúdo prático sobre LLMs, RAG, prompt engineering, vector databases e construção de aplicações de IA.", en: "Hands-on content on LLMs, RAG, prompt engineering, vector databases and building AI applications." },
      { pt: "Workshops de Agent Harness e Agentes de IA, do conceito à produção.", en: "Agent Harness and AI Agents workshops, from concept to production." },
      { pt: "Mentoria de profissionais no uso diário de IA e na implementação em projetos reais.", en: "Mentoring professionals on daily AI use and implementation in real projects." },
    ],
    tags: ["Python", "LangChain", "LangGraph", "LlamaIndex", "OpenAI", "Langfuse"],
  },
  {
    id: "quality",
    company: "Quality Engineering",
    logo: "/brand/companies/quality.png",
    role: { pt: "Data & AI Engineer", en: "Data & AI Engineer" },
    period: { pt: "Jul 2024 a Jun 2025", en: "Jul 2024 to Jun 2025" },
    location: { pt: "Produtos de dados", en: "Data products" },
    summary: {
      pt: "Construí pipelines de dados e componentes de API e banco, além de soluções de IA aplicadas ao negócio.",
      en: "I built data pipelines and API and database components, plus AI solutions applied to the business.",
    },
    highlights: [
      { pt: "Desenvolvi um assistente de onboarding com RAG (vector search, embeddings e LangChain) que responde dúvidas a partir da base interna.", en: "Developed an onboarding assistant with RAG (vector search, embeddings and LangChain) that answers questions from the internal knowledge base." },
      { pt: "Automatizei a análise de notas fiscais com OCR e NLP, reduzindo o processamento de mais de 300 documentos de 7 dias para meio dia.", en: "Automated tax-note analysis with OCR and NLP, cutting processing of 300+ documents from 7 days to half a day." },
      { pt: "Pipelines em Python, SQL e Docker para produtos de dados prontos para IA.", en: "Pipelines in Python, SQL and Docker for AI-ready data products." },
    ],
    tags: ["Python", "SQL", "Docker", "OCR", "RAG"],
  },
  {
    id: "cct",
    education: true,
    company: "CCT College Dublin",
    role: { pt: "BSc (Honours) em Computing & IT (NFQ Nível 8)", en: "BSc (Honours) in Computing & IT (NFQ Level 8)" },
    period: { pt: "2020 a 2024", en: "2020 to 2024" },
    location: { pt: "Dublin, Irlanda", en: "Dublin, Ireland" },
    summary: {
      pt: "Formação em Computação e TI com foco em ciência de dados e machine learning.",
      en: "Degree in Computing and IT focused on data science and machine learning.",
    },
    highlights: [
      { pt: "Projeto de conclusão: previsão de criminalidade na Irlanda com modelos de séries temporais.", en: "Capstone: crime-rate forecasting in Ireland with time-series models." },
    ],
    tags: ["Data Science", "Machine Learning", "Dublin"],
  },
];

/* ---------------- Projects (curated: professional / building / consulting) ---------------- */
export type ProjectCategory = "professional" | "building" | "consulting" | "personal";
export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  org?: string;
  logo?: string;
  status?: "delivered" | "in_progress";
  summary: Bi;
  description: Bi;
  tags: string[];
  metric?: Bi;
  url?: string;
  accent?: "blue" | "cyan" | "violet";
};

export const curatedProjects: Project[] = [
  /* ---- TCEMG — professional (delivered) ---- */
  {
    id: "pca",
    name: "PCA (Prestação de Contas Anual)",
    category: "professional",
    org: "TCEMG",
    status: "delivered",
    summary: { pt: "100% das contas dos 853 municípios de MG analisadas por IA.", en: "100% of the accounts of MG's 853 municipalities analyzed by AI." },
    description: {
      pt: "Antes, faltavam auditores para revisar todos os documentos. Hoje a IA processa 100% das prestações e aponta exatamente onde a equipe deve focar. Foi a primeira vez que os 853 municípios tiveram cobertura total.",
      en: "Before, there weren't enough auditors to review every document. Now AI processes 100% of the filings and points exactly where the team should focus. It was the first time all 853 municipalities had full coverage.",
    },
    metric: { pt: "853 municípios · cobertura total", en: "853 municipalities · full coverage" },
    tags: ["Python", "LangGraph", "OpenAI", "Qdrant", "Auditoria"],
    accent: "blue",
  },
  {
    id: "auditoriaia",
    name: "AuditoriaIA",
    category: "professional",
    org: "TCEMG",
    status: "delivered",
    summary: { pt: "Agentes de IA dedicados a tarefas distintas de auditoria.", en: "AI agents dedicated to distinct auditing tasks." },
    description: {
      pt: "Suíte de agentes para análise técnica profunda, compreensão de documentos com prompts personalizados e assistentes conversacionais especializados em auditoria.",
      en: "A suite of agents for deep technical analysis, document understanding with tailored prompts, and conversational assistants specialized in auditing.",
    },
    tags: ["Python", "LangGraph", "Langfuse", "OpenAI", "Multi-agente"],
    accent: "cyan",
  },
  {
    id: "chatuai",
    name: "ChatUAI (Assistente do TCEMG)",
    category: "professional",
    org: "TCEMG",
    status: "delivered",
    summary: { pt: "Chatbot com roteamento automático entre bases de conhecimento.", en: "Chatbot with automatic routing across knowledge bases." },
    description: {
      pt: "Chatbot com roteamento automático: a coleção 'Auto' identifica a intenção e envia cada pergunta para a base certa, seja decisões, jurisprudência ou normas internas, respondendo em linguagem natural sobre mais de 500 mil documentos.",
      en: "Chatbot with automatic routing: the 'Auto' collection detects intent and sends each question to the right base, whether decisions, case law or internal rules, answering in natural language over 500,000+ documents.",
    },
    metric: { pt: "500k+ documentos", en: "500k+ documents" },
    tags: ["Python", "FastAPI", "LlamaIndex", "Qdrant", "React", "OpenAI"],
    accent: "blue",
  },
  {
    id: "ia-ocr",
    name: "IA OCR",
    category: "professional",
    org: "TCEMG",
    status: "delivered",
    summary: { pt: "OCR multimodal on-premise, sem enviar dados sensíveis para fora.", en: "On-premise multimodal OCR, keeping sensitive data in-house." },
    description: {
      pt: "OCR multimodal rodando em cluster NVIDIA L40S on-premise, sem envio de dados sensíveis. Orquestração via Celery + pool de workers vLLM para alto throughput.",
      en: "Multimodal OCR running on an on-premise NVIDIA L40S cluster, with no sensitive data leaving the building. Orchestrated via Celery + a vLLM worker pool for high throughput.",
    },
    tags: ["Python", "Docker", "vLLM", "Celery", "NVIDIA L40S"],
    accent: "violet",
  },
  {
    id: "fiscap-edital",
    name: "Fiscap Edital",
    category: "professional",
    org: "TCEMG",
    status: "delivered",
    summary: { pt: "Análise de editais de concurso: de 5+ dias para minutos.", en: "Public-tender analysis: from 5+ days to minutes." },
    description: {
      pt: "Módulo para auxiliar a análise de editais de concursos públicos, reduzindo um trabalho de 5 dias ou mais para poucos minutos.",
      en: "A module to assist the analysis of public-tender notices, cutting work that took 5+ days down to a few minutes.",
    },
    metric: { pt: "5+ dias → minutos", en: "5+ days → minutes" },
    tags: ["Python", "OpenAI", "LangGraph", "NLP"],
    accent: "cyan",
  },
  {
    id: "onboarding-rag",
    name: "Onboarding Assistant (RAG)",
    category: "professional",
    org: "Quality Engineering",
    status: "delivered",
    summary: { pt: "Assistente que responde dúvidas a partir da base de conhecimento da empresa.", en: "Assistant answering questions from the company knowledge base." },
    description: {
      pt: "Assistente de onboarding com vector search, embeddings OpenAI e LangChain para responder perguntas de funcionários a partir da base interna.",
      en: "Onboarding assistant with vector search, OpenAI embeddings and LangChain to answer employee questions from the internal knowledge base.",
    },
    tags: ["RAG", "LangChain", "Embeddings"],
    accent: "blue",
  },

  /* ---- Building / in development ---- */
  {
    id: "chatuai-2",
    name: "ChatUAI 2.0",
    category: "building",
    org: "TCEMG",
    status: "in_progress",
    summary: { pt: "Nova geração do assistente do TCEMG.", en: "Next generation of the TCEMG assistant." },
    description: {
      pt: "Evolução do ChatUAI com roteamento mais inteligente, melhor experiência conversacional e novas capacidades agênticas.",
      en: "Evolution of ChatUAI with smarter routing, a better conversational experience and new agentic capabilities.",
    },
    tags: ["Python", "LangGraph", "Langfuse", "Qdrant", "React"],
    accent: "cyan",
  },
  {
    id: "pce",
    name: "PCE (Prestação de Contas em Exercício)",
    category: "building",
    org: "TCEMG",
    status: "in_progress",
    summary: { pt: "Análise por IA das contas em exercício.", en: "AI analysis of in-year accounts." },
    description: {
      pt: "Extensão da linha de análise de contas para o acompanhamento das prestações em exercício, com sinalização automática de pontos de atenção.",
      en: "Extends the account-analysis line to in-year accountability tracking, automatically flagging points of attention.",
    },
    tags: ["Python", "LangGraph", "Oracle", "PostgreSQL"],
    accent: "blue",
  },
  {
    id: "ouvidoria-ia",
    name: "Ouvidoria com IA",
    category: "building",
    org: "TCEMG",
    status: "in_progress",
    summary: { pt: "IA aplicada à ouvidoria do setor público.", en: "AI applied to public-sector ombudsman services." },
    description: {
      pt: "Solução de IA para triagem, classificação e apoio às manifestações da ouvidoria, acelerando o atendimento ao cidadão.",
      en: "AI solution for triage, classification and support of ombudsman submissions, speeding up citizen service.",
    },
    tags: ["Python", "OpenAI", "Azure", "PostgreSQL"],
    accent: "violet",
  },

  /* ---- Consulting ---- */
  {
    id: "negoti",
    name: "NEGOTI",
    category: "consulting",
    logo: "/brand/companies/negoti.svg",
    summary: { pt: "Consultoria e apresentação de solução de IA.", en: "AI solution consulting and presentation." },
    description: {
      pt: "Consultoria em IA para a NEGOTI, com desenvolvimento e apresentação de uma solução aplicada ao negócio.",
      en: "AI consulting for NEGOTI, including development and presentation of a business-applied solution.",
    },
    url: "https://negoti-apresentacao.vercel.app/",
    tags: ["Consultoria", "Produto de IA"],
    accent: "cyan",
  },
  {
    id: "inttegra",
    name: "Inttegra",
    category: "consulting",
    logo: "/brand/companies/inttegra.png",
    summary: { pt: "Capacitação do time de dev no uso de ferramentas de IA.", en: "Upskilling a dev team on AI tooling." },
    description: {
      pt: "Consultoria para o time de desenvolvimento da Inttegra sobre o uso de ferramentas de IA no dia a dia da engenharia.",
      en: "Consulting for Inttegra's development team on using AI tools in day-to-day engineering.",
    },
    tags: ["Consultoria", "AI tooling", "Dev productivity"],
    accent: "blue",
  },
  {
    id: "asscontas",
    name: "ASSCONTAS (Letramento em IA)",
    category: "consulting",
    logo: "/brand/companies/asscontas.jpg",
    summary: { pt: "Curso de Letramento em IA que ministro para a equipe.", en: "AI Literacy course I deliver to the team." },
    description: {
      pt: "Formação em Letramento em IA para a ASSCONTAS: capacito a equipe a entender e usar IA no dia a dia com segurança, autonomia e senso crítico.",
      en: "AI Literacy training for ASSCONTAS: I enable the team to understand and use AI day-to-day with confidence, autonomy and critical thinking.",
    },
    tags: ["Letramento em IA", "Treinamento", "Capacitação"],
    accent: "violet",
  },
];

/* ---------------- Featured GitHub repos (enriches the live API data) ---------------- */
export type FeaturedRepo = { repo: string; label: Bi; accent?: "blue" | "cyan" | "violet" };
export const featuredRepos: FeaturedRepo[] = [
  { repo: "workshop-ai-agent", label: { pt: "Workshop de Agentes de IA", en: "AI Agents Workshop" }, accent: "blue" },
  { repo: "ai-engineer-roadmap", label: { pt: "Trilha de Engenheiro de IA", en: "AI Engineer Roadmap" }, accent: "cyan" },
  { repo: "rag-project", label: { pt: "Projeto RAG completo", en: "Full RAG project" }, accent: "blue" },
  { repo: "mcp-agents", label: { pt: "Agentes com MCP", en: "Agents with MCP" }, accent: "violet" },
  { repo: "databricks-agent", label: { pt: "Agente no Databricks", en: "Databricks agent" }, accent: "cyan" },
  { repo: "workshop-agent-harness", label: { pt: "Workshop Agent Harness", en: "Agent Harness workshop" }, accent: "blue" },
  { repo: "ai-agent-service", label: { pt: "Agente text-to-SQL", en: "Text-to-SQL agent" }, accent: "cyan" },
  { repo: "langgraph-agent", label: { pt: "Agente com LangGraph", en: "LangGraph agent" }, accent: "violet" },
];

/* ---------------- Skills ---------------- */
export type SkillGroup = {
  id: string;
  title: Bi;
  icon: string; // lucide icon name
  level: number; // 0..100 for the radial viz
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "agents",
    title: { pt: "Agentes de IA", en: "AI Agents" },
    icon: "Bot",
    level: 95,
    skills: ["LangGraph", "LangChain", "LlamaIndex", "MCP", "Agent Harness", "Multi-agente", "Tool calling", "vLLM"],
  },
  {
    id: "rag",
    title: { pt: "RAG & LLMs", en: "RAG & LLMs" },
    icon: "Brain",
    level: 93,
    skills: ["RAG", "Vector databases", "Embeddings", "Prompt engineering", "Fine-tuning", "OCR + NLP", "Semantic search"],
  },
  {
    id: "languages",
    title: { pt: "Linguagens & Backend", en: "Languages & Backend" },
    icon: "Code2",
    level: 90,
    skills: ["Python", "SQL", "FastAPI", "Celery", "REST APIs", "TypeScript"],
  },
  {
    id: "data",
    title: { pt: "Engenharia de Dados", en: "Data Engineering" },
    icon: "Database",
    level: 85,
    skills: ["Airflow", "dbt", "Snowflake", "Databricks", "Kafka", "DuckDB", "Spark"],
  },
  {
    id: "cloud",
    title: { pt: "Cloud & Infra", en: "Cloud & Infra" },
    icon: "Cloud",
    level: 82,
    skills: ["Docker", "AWS (S3)", "Azure", "NVIDIA GPU (L40S)", "On-premise", "Streamlit", "Vercel"],
  },
  {
    id: "product",
    title: { pt: "Produto & Estratégia", en: "Product & Strategy" },
    icon: "Compass",
    level: 88,
    skills: ["Product Ownership", "Discovery", "Estratégia de IA", "Ensino & mentoria", "Palestras"],
  },
];

/* ---------------- Content: YouTube videos ---------------- */
export type Video = { id: string; title: Bi; url: string; kind: "video" | "live" };
export const videos: Video[] = [
  { id: "2wZFq_nhQ9I", title: { pt: "Agent Harness", en: "Agent Harness" }, url: "https://youtu.be/2wZFq_nhQ9I", kind: "video" },
  { id: "_MHHfBxpLxw", title: { pt: "Como se tornar Engenheiro de IA", en: "How to become an AI Engineer" }, url: "https://youtu.be/_MHHfBxpLxw", kind: "video" },
  { id: "ulDlpT2snZE", title: { pt: "RAG na prática", en: "RAG in practice" }, url: "https://youtu.be/ulDlpT2snZE", kind: "video" },
  { id: "_eiZ3cApbYM", title: { pt: "O que é RAG?", en: "What is RAG?" }, url: "https://youtu.be/_eiZ3cApbYM", kind: "video" },
  { id: "bU9SZaBVBu0", title: { pt: "LangGraph do zero", en: "LangGraph from scratch" }, url: "https://youtu.be/bU9SZaBVBu0", kind: "video" },
  { id: "UJvVtVx81ck", title: { pt: "Insights de quem trabalha com IA", en: "Insights from working as an AI Engineer" }, url: "https://youtu.be/UJvVtVx81ck", kind: "video" },
  { id: "9i6r90i17iA", title: { pt: "Projeto completo ao vivo", en: "Complete project, live" }, url: "https://www.youtube.com/live/9i6r90i17iA", kind: "live" },
];

/* ---------------- Content: courses & tracks (Jornada de Dados) ---------------- */
export type Course = { id: string; title: Bi; desc: Bi; url: string; badge: Bi };
export const courses: Course[] = [
  {
    id: "trilha-ia",
    title: { pt: "Trilha de Engenharia de IA", en: "AI Engineering Track" },
    desc: {
      pt: "Formação completa para virar Engenheiro de IA: LLMs, RAG, agentes e projetos reais.",
      en: "A complete path to become an AI Engineer: LLMs, RAG, agents and real projects.",
    },
    url: "https://suajornadadedados.com.br/trilhas/engenharia-de-ia",
    badge: { pt: "Trilha", en: "Track" },
  },
  {
    id: "agent-harness",
    title: { pt: "Workshop de Agent Harness", en: "Agent Harness Workshop" },
    desc: {
      pt: "Construa o 'esqueleto' que sustenta agentes de IA confiáveis em produção.",
      en: "Build the harness that makes AI agents reliable in production.",
    },
    url: "https://lp.suajornadadedados.com.br/agent-harness.html",
    badge: { pt: "Workshop", en: "Workshop" },
  },
  {
    id: "plataforma",
    title: { pt: "Plataforma Jornada de Dados", en: "Jornada de Dados Platform" },
    desc: {
      pt: "Cursos, workshops e comunidade para engenheiros de dados e IA.",
      en: "Courses, workshops and community for data & AI engineers.",
    },
    url: "https://suajornadadedados.com.br/",
    badge: { pt: "Plataforma", en: "Platform" },
  },
];

/* ---------------- Teaching highlight (TCEMG AI Literacy) ---------------- */
export const teaching = {
  title: { pt: "Letramento em IA", en: "AI Literacy" } as Bi,
  desc: {
    pt: "Ministro cursos de Letramento em IA para equipes e instituições, ensinando as pessoas a entender e usar IA no dia a dia com autonomia, segurança e senso crítico. É a tecnologia deixando de ser abstrata e virando ferramenta prática de todo mundo.",
    en: "I deliver AI Literacy courses for teams and institutions, teaching people to understand and use AI day to day with autonomy, safety and critical thinking. It's technology moving from abstract to a practical tool for everyone.",
  } as Bi,
};

/* ---------------- Consulting offer ---------------- */
export const consultingOffer = {
  intro: {
    pt: "Ajudo empresas e times a saírem da teoria e colocarem IA em produção, de agentes e RAG a estratégia e capacitação do time.",
    en: "I help companies and teams move from theory to production AI, from agents and RAG to strategy and team enablement.",
  } as Bi,
  services: [
    {
      title: { pt: "Agentes & Automação", en: "Agents & Automation" },
      desc: { pt: "Agentes de IA que executam tarefas reais e se conectam aos seus sistemas.", en: "AI agents that perform real tasks and connect to your systems." },
      icon: "Bot",
    },
    {
      title: { pt: "RAG & Busca Inteligente", en: "RAG & Smart Search" },
      desc: { pt: "Assistentes que conversam com a sua base de documentos.", en: "Assistants that talk to your document base." },
      icon: "Search",
    },
    {
      title: { pt: "Estratégia & Capacitação", en: "Strategy & Enablement" },
      desc: { pt: "Diagnóstico, roadmap de IA e treinamento do seu time.", en: "Assessment, AI roadmap and training for your team." },
      icon: "Compass",
    },
  ] as { title: Bi; desc: Bi; icon: string }[],
};

/* =========================================================================
   Agent knowledge — compact bilingual context injected into the system prompt.
   ========================================================================= */
export function buildKnowledgeContext(lang: Lang): string {
  const L = <T,>(b: Bi<T>) => b[lang];
  const lines: string[] = [];
  lines.push(`# ${profile.name}, ${L(profile.role)}`);
  lines.push(`${L(profile.location)}`);
  lines.push(`Tagline: ${L(profile.tagline)}`);
  lines.push(`Bio: ${L(profile.bio)}`);
  lines.push(`Contact: email ${socials.email} | LinkedIn ${socials.linkedin} | GitHub ${socials.github} | Booking ${socials.calendly}`);

  lines.push(`\n## Metrics`);
  metrics.forEach((m) => lines.push(`- ${m.value}: ${L(m.label)}`));

  lines.push(`\n## Experience`);
  experience.forEach((e) => {
    lines.push(`- ${e.company}, ${L(e.role)} (${L(e.period)}): ${L(e.summary)}`);
    e.highlights.forEach((h) => lines.push(`  • ${L(h)}`));
  });

  lines.push(`\n## Projects (professional, in-development, consulting)`);
  curatedProjects.forEach((p) => {
    lines.push(`- [${p.category}${p.org ? " · " + p.org : ""}] ${p.name}: ${L(p.description)}${p.metric ? " (" + L(p.metric) + ")" : ""}`);
  });

  lines.push(`\n## Featured personal projects (GitHub @${socials.githubUser})`);
  featuredRepos.forEach((r) => lines.push(`- ${r.repo}: ${L(r.label)}`));

  lines.push(`\n## Skills`);
  skillGroups.forEach((g) => lines.push(`- ${L(g.title)}: ${g.skills.join(", ")}`));

  lines.push(`\n## Teaching & Content`);
  lines.push(`- ${L(teaching.title)}: ${L(teaching.desc)}`);
  lines.push(`- YouTube channel (Jornada de Dados): ${socials.youtube}`);
  courses.forEach((c) => lines.push(`- ${L(c.title)}: ${L(c.desc)} (${c.url})`));

  lines.push(`\n## Consulting`);
  lines.push(L(consultingOffer.intro));
  consultingOffer.services.forEach((s) => lines.push(`- ${L(s.title)}: ${L(s.desc)}`));

  return lines.join("\n");
}
