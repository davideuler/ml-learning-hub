# ML Learning Hub

**Project-driven deep learning for Python engineers.**  
PyTorch · Transformers · Reinforcement Learning

---

## What's Inside

| Section | Description |
|---------|-------------|
| `/` | Hero homepage with track cards and stats |
| `/roadmap` | 5-phase learning timeline with links |
| `/courses` | Three tracks: PyTorch Foundations, Transformers, RL |
| `/courses/pytorch-foundations` | 8-module PyTorch course |
| `/courses/transformer-deep-dive` | 10-module Transformer course |
| `/courses/reinforcement-learning` | 11-module RL course, including Tianshou workflow |
| `/projects` | 6 project cards |
| `/projects/cnn-classifier` | Full CNN build guide with starter code |
| `/projects/mini-gpt` | Full GPT build guide with starter code |
| `/projects/bert-finetune` | Full BERT fine-tuning project guide |
| `/projects/dqn-pong` | Full DQN Pong project guide |
| `/projects/ppo-mujoco` | Full PPO MuJoCo project guide |
| `/projects/tianshou-cartpole` | Tianshou-based RL engineering project |
| `/projects/inference-server` | Full FastAPI inference server guide |
| `/math` | Linear algebra, calculus, probability, info theory |
| `/hardware` | GPU guide, cloud providers, AMP, DDP, profiling |

## Tech Stack

- **Next.js 14** (App Router, Server Components)
- **TypeScript** strict mode
- **Tailwind CSS** v3 — dark theme
- **KaTeX** — math rendering
- **next-mdx-remote** — MDX content pipeline
- **rehype-highlight** — syntax highlighting

## Local Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run type-check   # TypeScript strict check
npm run lint
```

> **Optional:** `npm i -D @tailwindcss/typography` then uncomment the plugin  
> in `tailwind.config.ts` for richer prose styling in MDX pages.

## Deploy to Vercel

### One-click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USER/ml-learning-hub)

### Manual

```bash
# 1. Push to GitHub
git add . && git commit -m "init: ml learning hub skeleton"
git remote add origin https://github.com/YOUR_USER/ml-learning-hub.git
git push -u origin main

# 2. Import at vercel.com → New Project → Import Git Repository
# 3. Framework preset: Next.js (auto-detected)
# 4. Click Deploy — takes ~60s
```

### Vercel CLI

```bash
npm i -g vercel
vercel login
vercel          # follow prompts
vercel --prod   # production deploy
```

## Content Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Homepage
│   ├── roadmap/page.tsx
│   ├── courses/
│   │   ├── page.tsx
│   │   ├── pytorch-foundations/page.tsx
│   │   ├── transformer-deep-dive/page.tsx
│   │   └── reinforcement-learning/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   ├── cnn-classifier/page.tsx
│   │   ├── mini-gpt/page.tsx
│   │   └── ...
│   ├── math/page.tsx
│   └── hardware/page.tsx
├── components/
│   └── layout/             # Navbar, Footer
├── content/                # MDX source files (future)
│   ├── courses/*.mdx
│   └── projects/*.mdx
├── lib/
│   ├── content.ts          # MDX file loader
│   └── mdx.ts              # KaTeX + highlight pipeline
└── types/content.ts        # Shared TS types
```

## Roadmap / Gaps

- [ ] **v0.2**: Full MDX rendering for course/project pages (replace static TSX)
- [ ] **v0.2**: KaTeX math in MDX pages (CSS import + `@tailwindcss/typography`)
- [ ] **v0.2**: Add Tianshou code snippets and config files for the RL library project
- [ ] **v0.3**: Search (Algolia DocSearch or Pagefind)
- [ ] **v0.3**: Progress tracking (localStorage)
- [ ] **v0.3**: Code sandbox integration (Stackblitz embeds)
- [ ] **v0.4**: Authentication + user course progress (Clerk or NextAuth)

## License

MIT
