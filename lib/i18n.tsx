"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./utils";

/* ---------- UI dictionary (chrome / labels only; rich content lives in content.ts) ---------- */
const dict = {
  "nav.about": { pt: "Sobre", en: "About" },
  "nav.experience": { pt: "Experiência", en: "Experience" },
  "nav.projects": { pt: "Projetos", en: "Projects" },
  "nav.teaching": { pt: "Ensino", en: "Teaching" },
  "nav.consulting": { pt: "Consultoria", en: "Consulting" },
  "nav.skills": { pt: "Skills", en: "Skills" },
  "nav.contact": { pt: "Contato", en: "Contact" },

  "cta.chat": { pt: "Converse com minha IA", en: "Chat with my AI" },
  "cta.chatShort": { pt: "Converse com minha IA", en: "Chat with my AI" },
  "cta.book": { pt: "Agende uma conversa", en: "Book a call" },
  "cta.resume": { pt: "Baixar currículo", en: "Download résumé" },
  "cta.viewProjects": { pt: "Ver projetos", en: "View projects" },

  "hero.badge": { pt: "Product Owner & AI Engineer", en: "Product Owner & AI Engineer" },
  "hero.available": { pt: "Disponível para consultoria", en: "Available for consulting" },
  "hero.scroll": { pt: "Role para explorar", en: "Scroll to explore" },

  "about.title": { pt: "Sobre mim", en: "About me" },
  "about.kicker": { pt: "Quem é o Caio", en: "Who is Caio" },

  "exp.title": { pt: "Experiência", en: "Experience" },
  "exp.kicker": { pt: "Experiência profissional", en: "Professional experience" },
  "exp.present": { pt: "Atual", en: "Present" },

  "proj.title": { pt: "Projetos", en: "Projects" },
  "proj.kicker": { pt: "O que eu construo", en: "What I build" },
  "proj.all": { pt: "Todos", en: "All" },
  "proj.personal": { pt: "Pessoais (GitHub)", en: "Personal (GitHub)" },
  "proj.professional": { pt: "Profissionais", en: "Professional" },
  "proj.building": { pt: "Em desenvolvimento", en: "In development" },
  "proj.consulting": { pt: "Consultoria", en: "Consulting" },
  "proj.viewRepo": { pt: "Ver repositório", en: "View repository" },
  "proj.viewLive": { pt: "Ver online", en: "View live" },
  "proj.loading": { pt: "Carregando repositórios…", en: "Loading repositories…" },
  "proj.delivered": { pt: "Entregue", en: "Delivered" },
  "proj.inProgress": { pt: "Em progresso", en: "In progress" },
  "proj.lastCommit": { pt: "Último commit", en: "Last commit" },
  "proj.workingNow": { pt: "Trabalhando agora", en: "Working on now" },
  "proj.workingNowDesc": {
    pt: "Produtos de IA que estou construindo neste momento.",
    en: "AI products I'm building right now.",
  },
  "proj.deliveredTitle": { pt: "Já entregues", en: "Delivered" },
  "proj.deliveredDesc": {
    pt: "Soluções em produção, gerando valor real.",
    en: "Solutions in production, creating real value.",
  },
  "proj.personalTitle": { pt: "Projetos pessoais", en: "Personal projects" },
  "proj.personalDesc": {
    pt: "Experimentos e materiais abertos no meu GitHub.",
    en: "Open experiments and materials on my GitHub.",
  },

  "teach.title": { pt: "Ensino & Conteúdo", en: "Teaching & Content" },
  "teach.kicker": { pt: "Compartilhando conhecimento", en: "Sharing knowledge" },
  "teach.videos": { pt: "Vídeos no YouTube", en: "YouTube videos" },
  "teach.courses": { pt: "Cursos & Trilhas", en: "Courses & Tracks" },
  "teach.watch": { pt: "Assistir", en: "Watch" },
  "teach.access": { pt: "Acessar", en: "Access" },
  "teach.tools": { pt: "Ferramentas do dia a dia", en: "Everyday AI tools" },
  "teach.fundamentals": { pt: "Termos que todo mundo deveria saber", en: "Terms everyone should know" },

  "consult.title": { pt: "Consultoria em IA", en: "AI Consulting" },
  "consult.kicker": { pt: "Para empresas & times", en: "For companies & teams" },
  "consult.how": { pt: "Como eu ajudo", en: "How I help" },
  "consult.clients": { pt: "Clientes & Cases", en: "Clients & Cases" },
  "consult.clientsDesc": {
    pt: "Empresas e equipes que já colocaram IA para trabalhar comigo.",
    en: "Companies and teams that have already put AI to work with me.",
  },

  "skills.title": { pt: "Skills & Stack", en: "Skills & Stack" },
  "skills.kicker": { pt: "Ferramentas do ofício", en: "Tools of the craft" },

  "contact.title": { pt: "Vamos construir algo com IA?", en: "Let's build something with AI?" },
  "contact.subtitle": {
    pt: "Consultoria, palestras, aulas ou uma boa conversa técnica. Estou a um clique.",
    en: "Consulting, talks, teaching or a good technical conversation. I'm one click away.",
  },
  "contact.email": { pt: "E-mail", en: "Email" },

  "chat.title": { pt: "Converse comigo", en: "Chat with me" },
  "chat.subtitle": { pt: "Uma IA que fala por mim", en: "An AI that speaks for me" },
  "chat.placeholder": { pt: "Pergunte qualquer coisa sobre o Caio…", en: "Ask anything about Caio…" },
  "chat.suggestions": { pt: "Sugestões para começar", en: "Try asking" },
  "chat.thinking": { pt: "pensando…", en: "thinking…" },
  "chat.error": {
    pt: "Ops, algo deu errado ao falar com a IA. Tente de novo em instantes.",
    en: "Oops, something went wrong reaching the AI. Try again shortly.",
  },
  "chat.close": { pt: "Fechar", en: "Close" },
  "chat.greeting": {
    pt: "Oi! Sou o Caio, ou melhor, a versão IA dele. 😄 Posso te contar sobre meus projetos, minhas skills, minha experiência no TCEMG e na Jornada de Dados, ou como funciona minha consultoria. O que você quer saber?",
    en: "Hey! I'm Caio, or rather his AI version. 😄 I can tell you about my projects, my skills, my work at TCEMG and Jornada de Dados, or how my consulting works. What would you like to know?",
  },

  "footer.rights": { pt: "Todos os direitos reservados.", en: "All rights reserved." },
  "footer.built": { pt: "Construído com Next.js + IA", en: "Built with Next.js + AI" },
} as const;

export type DictKey = keyof typeof dict;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: DictKey) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved === "pt" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l);
      document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
    }
  };

  const toggle = () => setLang(lang === "pt" ? "en" : "pt");
  const t = (key: DictKey) => dict[key][lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
