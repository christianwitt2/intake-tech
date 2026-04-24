# Intake Tech Express

**AI-powered 24/7 legal intake for Personal Injury law firms.**

## Features

✅ Real-time AI chat intake (GPT-4)
✅ Automatic case qualification (0-100 score)
✅ Case value estimation
✅ Statute of Limitations tracking (all 50 states)
✅ Insurance verification logic
✅ Production-ready Express.js app
✅ Zero build complexity

## Quick Start

```bash
npm install
cp .env.example .env
# Add your OPENAI_API_KEY to .env
npm start
```

Visit: `http://localhost:3000`

## Deployment to Vercel

```bash
git add .
git commit -m "Ready for Vercel"
git push

# Then in Vercel dashboard:
# 1. Import GitHub repo
# 2. Add env var: OPENAI_API_KEY
# 3. Deploy
```

## API Endpoints

- `POST /api/chat` — AI chat intake
- `POST /api/score` — Case qualification score
- `GET /api/health` — Health check

## Environment Variables

```
OPENAI_API_KEY=sk-...
PORT=3000
```

## Why Express?

- ✅ No build step (instant deploy)
- ✅ Lightweight (works on Vercel free tier)
- ✅ Fast startup
- ✅ Production-ready
