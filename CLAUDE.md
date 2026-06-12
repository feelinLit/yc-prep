# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

YC Prep — a gamified education platform (Duolingo-style) for solopreneurs and early-stage founders, helping them move from "just vibecoding apps" to building real businesses and raising money. Users progress through funding rounds and milestones by answering quiz questions, manage an energy/score/streak economy, and practice with simulated AI investor calls.

**This is an MVP built to be demoed locally.** The priorities, in order: a polished user experience, ease of shipping the next feature, and enough maintainability to keep moving fast. It is not a production system — don't optimize for scale, security hardening, multi-environment deployment, or edge cases a demo will never hit.

How that translates into decisions:

- Prefer the shortest path that looks good on screen. Hard-coded data, mocked AI responses, and a fake delay are acceptable and already the established pattern (`src/actions/`, `mock-*` branches in `api.ts`). Extend that pattern rather than building real integrations unless the feature demands it.
- Frontend polish (animations, transitions, loading states, empty states) is worth more effort here than backend correctness. When a feature can live entirely in the frontend with mock data, put it there — touching the Firebase backend costs a rebuild cycle and two extra config files (see rewrites below).
- Keep it maintainable, not perfect: follow the existing file conventions, keep components small, don't introduce new libraries or abstractions for one-off needs.
- Don't add tests, CI, monitoring, or deployment work unless explicitly asked.

Single project: `yc-prep-frontend-main/` — Next.js 14 (App Router) + TypeScript + Tailwind. Everything runs in one process.

## Commands (`yc-prep-frontend-main/`)

```bash
npm install       # first time only
npm run dev       # dev server on http://localhost:3000
npm run build
npm run lint
```

There are no tests in this project.

### Local development flow

Just `npm run dev` — no second server needed. To reset user state to a fresh demo (round 1, milestone 1, full energy): delete `data/user-state.json` and reload.

### Adding a new API endpoint

Create `src/app/<endpointName>/route.ts` with a `GET` or `POST` handler. That's it — no rewrite config to update, no separate build step.

## Architecture

### Backend (Next.js route handlers + JSON files)

For new demo features, reach for frontend mocks or Next server actions first; only add a route handler when a feature genuinely needs persisted state.

All HTTP endpoints are Next.js route handlers under `src/app/<name>/route.ts`. Every handler is marked `export const dynamic = "force-dynamic"` to prevent caching.

Data files (`data/` — all checked in except `user-state.json`):
- `questions.json` — quiz questions with fields `"Round number"`, `"Milestone"`, `"Type"`, `"Right answer"`, `"Wrong answer 1..3"`, `"Left/Right part 1..4"`, `score`. Question types: `multiple choice`, `boolean`, `match terms`.
- `rounds.json` — `[{ round, name, milestones }]`.
- `aiQuestions.json` — open-ended questions for the investor-call feature.
- `user-state.json` — mutable; created on first request, deleted to reset demo state (gitignored). Contains `profile` (energy, score, bucks, streak, plan) + `progress` (round, milestone, finished) + `questionsDone`.

Server lib (`src/server/`):
- `db.ts` — `loadUserState()` (lazy-create + energy regen on read), `saveUserState()`, `readJson()`.
- `questionsLogic.ts` — `checkAnswer()` and `prepareQuestionForUser()` (shuffles answers, strips correct-answer fields).
- `gameLogic.ts` — `updateUserProgress()` (milestone → round → finished), `changeUserScore()`, `setQuestionSolved()`, `getDetailedProgress()`.

Game logic: answering a question costs 1 energy when wrong (free plan only), adjusts score by ±`question.score`, and `updateUserProgress` advances milestone → round → finished when all questions in the current milestone are solved correctly, updating the daily streak. Energy (0–5) regenerates lazily on `loadUserState()` — 1 per hour elapsed since last drain, no scheduled tasks. Free-plan users are blocked from fetching questions ahead of their current milestone.

### Frontend

- `src/utils/api.ts` — the single backend client; attaches the access-token cookie as a Bearer header. Contains hard-coded mock branches for `mock-*` question IDs (hackathon scaffolding).
- Auth: fake — the Google button sets `accessToken="demo-token"` and `refreshToken="demo-token"` cookies (names in `src/constants.ts`). `AuthProvider` redirects to `/log-in` when those cookies are missing; no real token validation happens. `src/utils/api.ts` still attaches the cookie as a Bearer header (harmless).
- `src/actions/` — Next server actions for AI features (answer analysis, audio transcription). The real OpenAI calls are **commented out** and replaced with hard-coded mock responses + artificial delay; uncomment and wire `src/utils/openai.ts` to enable them.
- Route groups: `(app)/home/*` (levels/topics map), `questions/[id]` (quiz flow), `investor-call/[id]` (simulated voice call with analysis), `onboarding/*`, `log-in`.
- Free vs. paid plan gates features on both sides (truncated AI analysis on the frontend, energy loss / milestone locks on the backend).
