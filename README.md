# Jelapang Resources — Frontend

Next.js 16 website for **Jelapang Resources Sdn. Bhd.** Consumes the headless WordPress API from the [jelapang-backend](https://github.com/huzairulshazmey/jelapang-backend) repo.

## Structure

```
jelapang-frontend/     ← push contents of this folder to GitHub
├── app/                 # App Router pages
├── components/
├── data/                # Static fallbacks when WordPress is offline
├── lib/                 # WordPress API client
├── public/
├── package.json
└── next.config.ts
```

## Prerequisites

- Node.js 20+
- [jelapang-backend](https://github.com/huzairulshazmey/jelapang-backend) running locally (or a deployed WordPress URL)

## Quick Start

```powershell
git clone <your-frontend-repo-url>
cd jelapang-frontend
npm install
copy .env.local.example .env.local
npm run dev
```

Open **http://localhost:3000**

## Environment Variables

Copy `.env.local.example` to `.env.local`:

```env
WORDPRESS_API_URL=http://localhost:8080/wp-json
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8080/wp-json
```

Point these at your backend URL in production.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | About |
| `/services` | Services overview |
| `/military` | Military & defence |
| `/railway` | Railway engineering |
| `/it` | IT & electronics |
| `/contact` | Contact form |

Content loads from WordPress when the backend is running. Files in `data/` are used as fallback.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (`--webpack` — official Next.js 16 opt-in when Turbopack is unsuitable) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Backend

This repo has **no Docker or WordPress files**. Run the backend separately:

```powershell
cd ../jelapang-backend
.\scripts\setup.ps1
```

## License

Proprietary — Jelapang Resources Sdn. Bhd.
