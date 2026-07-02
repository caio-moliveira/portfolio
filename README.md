# Caio Machado — AI Engineer Portfolio

Portfólio interativo e bilíngue (PT/EN) construído como uma **demo viva de IA**:
um agente conversacional em primeira pessoa que responde sobre o Caio e renderiza
**cards dinâmicos** (projetos, skills, experiência, conteúdo, consultoria) conforme a pergunta.

## ✨ Destaques

- **Chat com agente de IA** em tela cheia (OpenRouter, sem expor a API key no cliente).
- **Cards dinâmicos**: o agente dispara projetos/skills/experiência/conteúdo de acordo com a intenção.
- **Bilíngue PT/EN** com toggle (persistido).
- **Projetos do GitHub ao vivo** (`@caio-moliveira`) + cards curados (profissionais, em desenvolvimento, consultoria).
- **Seção de conteúdo**: vídeos do YouTube (Jornada de Dados) + trilhas/workshops.
- Visual **dark futurista** com o azul da marca CAIO, campo de partículas e animações (respeita `prefers-reduced-motion`).

## 🧱 Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · lucide-react · OpenRouter.

## 🚀 Rodando localmente

```bash
npm install
cp .env.example .env      # e preencha a OPENROUTER_API_KEY (ou API_KEY)
npm run dev               # http://localhost:3000
```

## 🔑 Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `OPENROUTER_API_KEY` (ou `API_KEY`) | Sim (pro chat) | Chave do OpenRouter. |
| `OPENROUTER_MODEL` | Não | Modelo(s) do chat, separados por vírgula (fallback, máx. 3). |
| `GITHUB_TOKEN` | Não | Aumenta o rate limit da API pública do GitHub. |

> Sem a key, o site funciona normalmente e o chat responde com uma mensagem
> amigável + cards (fallback por intenção).

## ☁️ Deploy na Vercel

1. Suba o repositório no GitHub e importe em [vercel.com/new](https://vercel.com/new).
2. Em **Settings → Environment Variables**, adicione `OPENROUTER_API_KEY` (ou `API_KEY`).
3. Deploy. Pronto — o endpoint serverless `/api/chat` mantém a key segura no servidor.

## 🗂️ Estrutura

```
app/
  layout.tsx            # fontes, providers (idioma + chat), metadata
  page.tsx              # composição das seções
  api/chat/route.ts     # agente: OpenRouter + resolução de cards
  api/github/route.ts   # repos ao vivo (cache 1h)
components/
  sections/             # Hero, About, Timeline, Projects, Teaching, Consulting, Skills, Contact
  chat/                 # ChatOverlay, ChatCards, ChatFab, ChatProvider
  nav/ · ui/ · background/
lib/
  content.ts            # 🧠 base de conhecimento bilíngue (fonte única da verdade)
  agent.ts              # system prompt + resolução/intents dos cards
  i18n.tsx · github.ts · utils.ts
```

## ✏️ Editando o conteúdo

Quase tudo (perfil, métricas, experiência, projetos, skills, vídeos, cursos) vive em
**`lib/content.ts`** com campos `{ pt, en }`. Editar lá atualiza **as seções e o agente**
ao mesmo tempo.
