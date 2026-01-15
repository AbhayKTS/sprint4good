# IdeaForge

Human-centric Generative AI helper that turns skills into local, low-capital business ideas for urban and rural India. Built with React + Vite + Tailwind, Firebase Auth/Firestore, and an Express API that speaks to OpenAI-compatible models.

## Quick start

1. **Requirements**: Node 18+ and npm. (A `.nvmrc` is not included; use any Node >= 18.18.)
2. **Install** (monorepo workspaces):
   ```powershell
   npm install
   ```
3. **Environment**:
   - Copy `frontend/.env.example` to `frontend/.env` and fill Firebase + API base URL.
   - Copy `backend/.env.example` to `backend/.env` and set `OPENAI_API_KEY` (or leave empty to use safe fallbacks).
4. **Run dev servers** (separate terminals):
   ```powershell
   npm run dev:backend
   npm run dev:frontend
   ```
   Backend defaults to `http://localhost:4000`, frontend to `http://localhost:5173`.
5. **Build**:
   ```powershell
   npm run build
   ```

## Features

- Landing, input wizard, results, and dashboard pages with a calm, inclusive UI (warm beige background, deep green primary, saffron accent).
- Guest-friendly generation; login only needed to save ideas.
- Firebase Authentication (Google + email/password) and Firestore models for users/ideas/feedback.
- Express API endpoints: `/generate-ideas`, `/generate-plan`, `/save-idea`, `/feedback` with ethical guardrails and offline fallbacks.
- Hindi/English toggle, low-capital bias, clear disclaimer.

## Project structure

```
.
├─ backend/          # Express API
│  ├─ src/index.js
│  └─ .env.example
├─ frontend/         # React + Vite + Tailwind UI
│  ├─ src/ (pages, components, services, store)
│  ├─ tailwind.config.js
│  └─ .env.example
├─ package.json      # npm workspaces
└─ package-lock.json
```

## Notes

- If `OPENAI_API_KEY` is missing, the backend returns curated fallback ideas so the demo always works.
- All AI responses include an implicit disclaimer: “AI-generated suggestions. Please verify before execution.”
- The design avoids heavy assets to stay friendly on slow networks and mobile.
