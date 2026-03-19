# CLAUDE.md — The Returned

<!--
PURPOSE: Single source of truth. Read this first on every context reset.
UPDATE WHEN: New routes, schema changes, new env vars, features ship, gotchas found.
-->

---

## WORKFLOW RULES (Follow These Every Time)

1. **Plan first.** Read relevant files, think through the problem, write a checklist to `tasks/todo.md` before writing any code.
2. **The plan must be a checklist.** Each item is discrete and completable.
3. **Get approval before coding.** Stop and check in after writing the plan.
4. **Work the checklist.** Complete items one at a time. Mark done as you go.
5. **Explain as you go.** Brief summary after each step — what changed and why. No essays.
6. **Simplicity above all.** Touch only the code relevant to the task. Zero side effects.
7. **Review when done.** Add a review section to `tasks/todo.md` covering what changed, what was tested, watch-outs.
8. **Update session-log.md at session end.** What was done, decisions made, discoveries, blockers, next steps. Keep last 5 sessions only.

## CODING PRINCIPLES (Non-Negotiable)

- **DO NOT BE LAZY.** Senior developer standard. Find root causes. No band-aids.
- **SIMPLICITY IS EVERYTHING.** Minimum code that solves the problem. One file over three.
- **DON'T INTRODUCE BUGS.** Understand existing code before touching it.
- **DON'T REFACTOR UNLESS ASKED.** Add the button. Don't reorganize the component.
- **READ BEFORE YOU WRITE.** Always read relevant files before making changes.

---

## What This Project Is

The Returned is a digital home for a covenant community built around the philosophy of returning — to clarity, discipline, and purpose. It is not a wellness app or a productivity tool. It is a sacred-text platform, ritual onboarding flow, and member dashboard for builders and thinkers who have drifted. The aesthetic is monumental and ancient. The tone is never motivational-poster.

## Tech Stack

- **Framework:** Next.js 15 (App Router) with TypeScript
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (email/password, magic link)
- **Styling:** Tailwind CSS + CSS variables (brand tokens in `globals.css`) — NO shadcn/ui (conflicts with custom brand aesthetic)
- **Fonts:** Google Fonts via `next/font` — Cinzel (display/headings), Cormorant Garamond (body/voice)
- **Animations:** Framer Motion — Mark SVG draw animation, page transitions, staggered hero reveals
- **Icons:** Lucide React (used sparingly — brand uses type and the Mark symbol, not icon grids)
- **Deployment:** Vercel
- **URL:** thereturned.com (target domain — not yet deployed)

## Brand Tokens (NEVER deviate from these)

```css
--void:       #0c0b09   /* primary background */
--stone:      #1a1916   /* elevated surface */
--stone2:     #232118   /* card surface */
--fog:        #3a3830   /* muted surface / borders */
--parchment:  #e8e3d8   /* primary text */
--parchment2: #c9bfa8   /* secondary text */
--light:      #c9b97a   /* gold accent — USE SPARINGLY, only for significant moments */
--ember:      #7a6a4f   /* muted accent / borders */
```

## Typography Rules (NEVER deviate)

| Use | Font | Weight | Notes |
|-----|------|--------|-------|
| Display / Heroes | Cinzel | 600 | Hero H1, major headings |
| Section labels | Cinzel | 400 | 8–11px, letter-spacing 0.25–0.4em, ALL CAPS |
| Body prose | Cormorant Garamond | 400 italic | color: var(--parchment). Never 300 at reading sizes. |
| Pull quotes (32px+) | Cormorant Garamond | 300 italic | Large display only — color: var(--parchment) |
| Scripture / covenant lines | Cormorant Garamond | 600 | Bold verse, vows, key declarations |

## Design Rules (NEVER violate)

- No purple gradients or blue SaaS palettes
- No Inter, Roboto, or Arial as primary font
- `--light` gold only for the most significant moments (CTAs, the Mark, covenant lines)
- The Mark is ALWAYS outlined, NEVER filled
- No rounded corners on the Mark — geometric and exact
- Tone is always monumental — never motivational-poster, never hustle-gospel
- Generous vertical padding on every section (breathing room)
- Mobile-first, desktop inherits

## Project Structure

```
the-returned/
├── tasks/
│   └── todo.md                           # Task plan and backlog
├── research/
│   └── findings.md                       # Market context, comparable platforms
├── session-log.md                        # Rolling session context — last 5 sessions
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout — fonts, CSS vars, metadata
│   │   ├── page.tsx                      # Home (Hero, Pillars, Quote, Greeting)
│   │   ├── manifesto/
│   │   │   └── page.tsx                  # Long-form manifesto (3 sections + covenant block)
│   │   ├── books/
│   │   │   ├── page.tsx                  # Book selection landing
│   │   │   └── [book]/
│   │   │       └── page.tsx              # Immersive reader (TOC + reading pane)
│   │   ├── circle/
│   │   │   └── page.tsx                  # Circle page (roles, weekly rhythm)
│   │   ├── crossing/
│   │   │   └── page.tsx                  # Three-step ritual onboarding flow
│   │   ├── dashboard/
│   │   │   └── page.tsx                  # Member dashboard (post-auth)
│   │   └── api/
│   │       ├── crossing/route.ts         # POST — save crossing record
│   │       ├── checkin/route.ts          # POST/GET — weekly check-in
│   │       ├── night-watch/route.ts      # POST/GET — daily night watch log
│   │       ├── pillar-log/route.ts       # POST — pillar tracker entry
│   │       ├── fast-log/route.ts         # POST — fast completion log
│   │       └── reading-progress/route.ts # POST — mark chapter complete
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Mark.tsx                  # The SVG Mark — animatable, never filled
│   │   │   ├── NavBar.tsx                # Minimal nav — logo mark + links
│   │   │   ├── PageHero.tsx              # Reusable hero with eyebrow/H1/sub
│   │   │   ├── CovenantBlock.tsx         # Full-width dark card with covenant lines
│   │   │   ├── PillarStrip.tsx           # 7-column pillars grid
│   │   │   └── GreetingCard.tsx          # Two-panel "Light over Fog / I return" card
│   │   ├── books/
│   │   │   ├── BookReader.tsx            # Container — TOC + reading pane layout
│   │   │   ├── TableOfContents.tsx       # Left panel TOC with active chapter highlight
│   │   │   ├── ChapterBlock.tsx          # Single chapter renderer
│   │   │   ├── VerseBlock.tsx            # Verse renderer (narrative vs scripture types)
│   │   │   └── ProgressBar.tsx           # Fixed top progress bar, gold fill
│   │   ├── crossing/
│   │   │   ├── SilenceStep.tsx           # Step 1 — 60s countdown timer, full dark screen
│   │   │   ├── WaterStep.tsx             # Step 2 — quote + confessional text input
│   │   │   ├── WordStep.tsx              # Step 3 — "Speak your vow" + I RETURN button
│   │   │   └── CrossingComplete.tsx      # Completion — Mark animation + share card
│   │   └── dashboard/
│   │       ├── MemberHeader.tsx          # Mark, name, crossing date, days counter
│   │       ├── WeeklyCheckin.tsx         # Two prompts + history view
│   │       ├── NightWatch.tsx            # Three end-of-day questions + log
│   │       ├── SevenWaysTracker.tsx      # 7 pillars, daily checkbox/rating, weekly strip
│   │       ├── FastLogger.tsx            # Three fasts toggle/log interface
│   │       └── ReadingProgress.tsx       # Book One/Two chapter progress
│   ├── lib/
│   │   ├── content/
│   │   │   ├── book-one.ts               # Book One typed data (Book/Chapter/Verse types)
│   │   │   └── book-two.ts               # Book Two typed data
│   │   ├── db/
│   │   │   ├── supabase-server.ts        # Server-side Supabase client (cookies)
│   │   │   ├── supabase-client.ts        # Client-side Supabase client (singleton)
│   │   │   └── queries.ts                # Typed query functions — crossings, checkins, etc.
│   │   └── types/
│   │       └── index.ts                  # All TypeScript types — Book, Chapter, Verse, User
│   └── styles/
│       └── globals.css                   # CSS variables, base resets, font declarations
├── tests/
│   ├── e2e/
│   │   ├── crossing.spec.ts              # Full crossing flow — all 3 steps + completion
│   │   ├── books.spec.ts                 # Reader — TOC nav, progress bar, chapter scroll
│   │   └── dashboard.spec.ts             # Auth-gated — check-in, night watch, tracker
│   ├── fixtures/
│   │   └── mock-supabase.ts              # Supabase mock responses for tests
│   └── utils/
│       └── test-helpers.ts               # Auth mock, test user creation utils
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql        # All tables + RLS policies
├── .cursorrules                          # Coding standards
├── CLAUDE.md                             # This file
├── playwright.config.ts
├── .env.local.example
├── package.json
└── tsconfig.json
```

## Environment Variables (.env.local)

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co          # Supabase → Settings → API
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx                         # Supabase → Settings → API
SUPABASE_SERVICE_ROLE_KEY=xxx                             # NEVER expose to browser

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# No AI API needed for Phase 1–3 — content is static
# No Stripe needed — Phase 1 is free, monetization planned Phase 4+
```

## Architecture

### Data Model

```
User (auth.users — Supabase managed)
  ├── crossings       — id, user_id, crossed_at, vow_text (optional encrypted)
  ├── checkins        — id, user_id, week_of, drift_text, return_text, created_at
  ├── night_watch     — id, user_id, date, drifted, repair, light_gave, created_at
  ├── pillar_logs     — id, user_id, date, pillar (1–7), rating (1–5)
  ├── fast_logs       — id, user_id, fast_type (enum), date, completed (bool)
  └── reading_progress — id, user_id, book (enum: one|two), chapter (1–10), completed_at

RLS: All tables — user can only read/write their own rows (user_id = auth.uid())
vow_text: Considered private confessional content. Optional. If stored, treat as sensitive.
```

### Auth Flow

```
Provider: Supabase Auth
Methods: Email/password + Magic link (no OAuth — matches the covenant aesthetic)
Roles: member (default, post-crossing), admin (future)
Session: Supabase cookie-based sessions via @supabase/ssr
Server Components: createServerClient from src/lib/db/supabase-server.ts
Client Components: createBrowserClient from src/lib/db/supabase-client.ts
API Routes: createServerClient with cookies from next/headers
Middleware: src/middleware.ts — refresh session, redirect unauthenticated from /dashboard
Protected routes: /dashboard only (crossing, books, circle = public)
```

### Key Pipelines

```
Crossing Flow:
1. User lands on /crossing → SilenceStep mounts (60s countdown)
2. Countdown completes → WaterStep renders (confessional input — NOT persisted to DB)
3. User submits → WordStep renders ("Speak your vow" + I RETURN button)
4. User clicks I RETURN → POST /api/crossing → inserts to crossings table → redirect to completion
5. CrossingComplete renders — Mark animation + share card

Book Reader:
1. /books/[book] loads → book-one.ts or book-two.ts imported (static, no DB)
2. BookReader mounts with all chapters
3. TableOfContents tracks scroll position via IntersectionObserver
4. ProgressBar reads scroll % → fills gold left-to-right
5. Chapter completion (reaching end) → POST /api/reading-progress (if authenticated)
```

### Content Data Model (TypeScript)

```typescript
export type VerseType = 'narrative' | 'scripture'

export interface Verse {
  type: VerseType
  text: string
}

export interface Chapter {
  id: string          // e.g. "ch-1", "ch-2"
  roman: string       // e.g. "I", "II"
  title: string
  verses: Verse[]
}

export interface Book {
  id: 'one' | 'two'
  number: number
  title: string
  subtitle: string
  chapters: Chapter[]
}
```

## Key Patterns

### API Route Pattern
See `src/app/api/crossing/route.ts` for the standard:
- Auth check via supabase-server.ts (return 401 if no session)
- Input validation (zod or manual)
- Database insert via queries.ts
- Typed response

### Component Pattern
See `src/components/crossing/SilenceStep.tsx` for the standard:
- 'use client' at top (all crossing components are interactive)
- Props interface defined inline
- Framer Motion for any animated state transitions
- Brand token CSS vars — never hardcoded hex values in JSX

### The Mark Component
- Props: `size: number`, `animated: boolean`, `strokeColor?: string`
- Two SVG elements: `<circle>` + `<line>` (vertical through center)
- Animated: circle draws via `stroke-dashoffset` over 2s, line draws after 0.8s delay
- NEVER filled — always outlined
- Default stroke: `var(--light)` (#c9b97a)

## Key Design Decisions

- **Theme:** Dark void (#0c0b09), warm parchment text, gold accent used sparingly
- **Typography:** Cinzel (display) + Cormorant Garamond (body) — NO system fonts as primary
- **Components:** Custom — no shadcn/ui (it imposes a SaaS aesthetic that conflicts with the brand)
- **Border radius:** 0px for geometric elements (the Mark, covenant blocks), 4px maximum for cards
- **Animations:** Rich — Framer Motion throughout. The Mark animation is a hero feature.
- **Motion philosophy:** Purposeful and slow. Nothing bounces. Everything has gravity.
- **No AI API:** Content is static sacred text. No generation needed through Phase 3.
- **Community (Phase 4):** Circles are small groups (8–12 members). Not public social media.

## Financial Model

```
Phase 1–3: Free (community/mission building)
Phase 4+ (planned):
  - Membership: $12/mo or $99/yr (access to Circle community features)
  - Target: 500 paying members = $6,000/mo MRR
  
Monthly costs (Phase 1–3):
  Vercel: $0 (Hobby) → $20/mo (Pro when needed)
  Supabase: $0 (free tier, 500MB, 50K MAU)
  Domain: ~$12/yr
  Total: ~$0–$20/mo

Break-even at $12/mo pricing: 2 paying members (minimal infra costs)
Launch goal: 1,000 members through The Crossing (email captured) → then monetize
```

## What's Built

- [ ] Nothing yet — scaffold only

## What's Not Built Yet

### 🔴 Critical — Phase 1 (Public Site)
1. **Project init** — Next.js 15, TypeScript, Tailwind, Framer Motion, fonts, CSS vars
2. **Home page** — Hero with animated Mark, Pillars strip, pull quote, greeting card
3. **Manifesto page** — Three sections, covenant block
4. **Books reader** — BookReader with TOC, progress bar, typed content data
5. **Circle page** — Seven roles grid, weekly rhythm section
6. **Base layout** — NavBar, page shell, global CSS vars

### 🟡 High — Phase 2 (The Crossing)
7. **Supabase schema + auth** — All tables, RLS, email auth
8. **Crossing flow** — Three steps, I RETURN action, completion screen, share card

### 🟠 Medium — Phase 3 (Dashboard)
9. **Member dashboard** — All six dashboard components
10. **API routes** — crossing, checkin, night-watch, pillar-log, fast-log, reading-progress

### 🔵 Low — Phase 4 (Circle Community)
11. **Circle groups** — Small group creation, shared check-ins, Keeper roles

## Assumption Log

| Assumption | Status | Evidence | Impact if Wrong |
|------------|--------|----------|-----------------|
| Content is static — no AI generation needed | ✅ Confirmed | Brief specifies static book content | No API cost impact |
| Supabase free tier handles launch traffic | ⚠️ Estimated | 500MB DB, 50K MAU limit | Upgrade to Pro ($25/mo) if exceeded |
| No Stripe needed for Phase 1–3 | ✅ Confirmed | Brief specifies free launch phases | — |
| vow_text in crossing is private/not shared | ✅ Confirmed | Brief: "private, not stored" (WaterStep confessional) | Must NOT save WaterStep text to DB |
| Custom CSS components (no shadcn/ui) | ✅ Decided | Brand aesthetic incompatible with shadcn defaults | More build time, full brand control |

## Known Issues / Gotchas

- **WaterStep confessional text must NOT be saved to the database.** The brief explicitly says "private, not stored." Only the crossing event and date are persisted. If there's ever pressure to add analytics or retention tracking, do not touch this data.
- **Cinzel + Cormorant Garamond must load via `next/font`**, not CDN links. CDN links cause font flash on cold load which destroys the austere first impression.
- **Framer Motion + Next.js App Router:** All animated components must be `'use client'`. Server components cannot use Framer Motion.
- **The Mark SVG animation:** Use `stroke-dasharray` + `stroke-dashoffset` with `pathLength={1}`. Do not use `getTotalLength()` — it runs at runtime and breaks SSR.
- **Gold (`--light`) discipline:** Before adding any gold color usage, ask: is this the most significant element on this screen? If it's competing with other gold, one of them is wrong.

## Important Notes

- **vow_text privacy:** Treat like health data — do not log, do not expose in admin views, do not include in analytics.
- **Tone review before shipping any copy:** Every string on the site must pass the "monumental, not motivational-poster" test. If it sounds like a LinkedIn post, rewrite it.
- **Phase 4 community layer:** Research Circle dynamics before building. The brief envisions 8–12 member Circles with Keeper roles. This is a small-group model, not public social. Architecture will differ significantly from typical social features.
