# Rafael Bisso Dias — Portfolio

Portfólio técnico pessoal e laboratório de stack moderna para demonstração de arquitetura self-hosted.

**Live:** [rbd-portfolio-three.vercel.app](https://rbd-portfolio-three.vercel.app)

> **Acesso demo**
> - Email: `recruiter@dev.com`
> - Senha: `contratado!`

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + Vite + TypeScript + Tailwind v4 |
| UI | shadcn/ui (Radix primitives) |
| Auth + DB | Supabase (PostgreSQL + GoTrue) |
| Deploy frontend | Vercel (CI/CD automático via GitHub) |
| Deploy banco | Supabase.io |

## Estrutura

```
portfolio-app/
├── frontend/               # React + Vite + TypeScript
│   ├── src/
│   │   ├── lib/            # supabase.ts, auth.tsx (AuthContext)
│   │   ├── pages/          # Dashboard, Projects, Skills, Contact, Login
│   │   └── components/     # Layout, ProtectedRoute, ui/
│   ├── .env.local          # chaves locais (não commitado)
│   └── vite.config.ts
└── supabase/
    ├── migrations/         # SQL versionado
    ├── seed.sql            # dados do CV
    └── config.toml
```

## Rodar local

**Pré-requisitos:** WSL2 + Docker Engine + Node.js (nvm) + Supabase CLI

```bash
# 1. Subir Supabase local
supabase start

# 2. Configurar variáveis
cp frontend/.env.local.example frontend/.env.local
# editar com as chaves do `supabase status`

# 3. Aplicar schema + dados
supabase db reset

# 4. Rodar frontend
cd frontend && npm install && npm run dev
```

Acessa `http://localhost:5173`.

## Deploy produção

```bash
# Aplicar migrations no Supabase.io
supabase link --project-ref <project-ref>
supabase db push

# Push para main aciona deploy automático no Vercel
git push origin main
```

## Contexto

Este projeto serve dois propósitos:

1. **Portfólio pessoal** — CV interativo com projetos e skills reais
2. **Laboratório de arquitetura** — prova de conceito de stack self-hosted (Docker + Supabase + Vercel) como alternativa ao Lovable para projetos corporativos

---

Feito com React + PostgreSQL.
