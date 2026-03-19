# tasks/todo.md — The Returned

---

## BACKLOG

### 🔴 Critical — Phase 1: Public Site (2–3 weeks)

- [ ] **Session 1: Project initialization** — ~2 hours, $0
  Files: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `.env.local.example`, `playwright.config.ts`
  Tests: `playwright.config.ts` (config only, no tests yet)
  Dependencies: None
  Notes: Install next@15, framer-motion, @supabase/ssr, @supabase/supabase-js, lucide-react. Set up `next/font` for Cinzel + Cormorant Garamond. Configure Tailwind with custom font families (`cinzel`, `cormorant`). **Do not install shadcn/ui.**

- [ ] **Session 2: Brand tokens + global CSS + font setup** — ~1.5 hours, $0
  Files: `src/styles/globals.css`, `src/app/layout.tsx`
  Tests: None (visual — verify fonts load at localhost:3000)
  Dependencies: Session 1
  Notes: All 8 CSS custom properties in `:root`. Font declarations via `next/font`. Base body styles: `background: var(--void)`, `color: var(--parchment)`. Verify Cinzel loads in title and Cormorant Garamond in body at dev server before continuing.

- [ ] **Session 3: Mark SVG component** — ~2 hours, $0
  Files: `src/components/ui/Mark.tsx`
  Tests: `tests/e2e/mark.spec.ts` — verify Mark renders, animated prop triggers animation
  Dependencies: Session 1
  Notes: `pathLength={1}` animation only — no `getTotalLength()`. Props: `size`, `animated`, `strokeColor`. Circle draws 2s, line draws at 0.8s delay. Default stroke: `var(--light)`. Never fill. This component is the soul of the brand — get it right before any other UI work.

- [ ] **Session 4: NavBar + base layout shell** — ~2 hours, $0
  Files: `src/components/ui/NavBar.tsx`, `src/app/layout.tsx` (update)
  Tests: None (visual — verify responsive at 375px, 768px, 1280px)
  Dependencies: Sessions 2, 3
  Notes: Minimal — small Mark + nav links only. No hamburger menu needed initially (few routes). Links: Manifesto, The Books, The Circle, Enter (→ /crossing). When authenticated: Dashboard replaces Enter. Sticky top, `background: var(--void)`, thin bottom border `var(--fog)`.

- [ ] **Session 5: Home page** — ~3 hours, $0
  Files: `src/app/page.tsx`, `src/components/ui/PageHero.tsx`, `src/components/ui/PillarStrip.tsx`, `src/components/ui/GreetingCard.tsx`
  Tests: `tests/e2e/home.spec.ts` — hero renders, pillar strip shows 7 items, greeting card present
  Dependencies: Sessions 3, 4
  Notes: Section order: Hero → Pillar Strip → Pull Quote → Greeting Card. Hero: Mark animates on mount, text stagger (eyebrow → H1 → sub → divider → CTAs). Scroll indicator fades last. Pull quote: "Do not seek a life without pain. Seek a life without Drift." — Cormorant 300 italic, large. Greeting card: two-panel dark (`var(--stone2)`), "Light over Fog." / "I return."

- [ ] **Session 6: Manifesto page** — ~2.5 hours, $0
  Files: `src/app/manifesto/page.tsx`, `src/components/ui/CovenantBlock.tsx`
  Tests: `tests/e2e/manifesto.spec.ts` — three sections render, covenant block present
  Dependencies: Session 4
  Notes: Three sections with Cinzel 9px section labels (ALL CAPS): ON THE FOG / ON THE LIGHT / ON RETURNING. Each: section label → H2 → body paragraphs → pull quote. CovenantBlock: full-width `var(--stone)` card, Cinzel 18px, line-height 2.2, the 6 return vows. Closing section introduces the Circle.

- [ ] **Session 7: Book content data files** — ~3 hours, $0
  Files: `src/lib/types/index.ts`, `src/lib/content/book-one.ts`, `src/lib/content/book-two.ts`
  Tests: None (TypeScript compilation = verification)
  Dependencies: Session 1
  Notes: Convert Book One Humanized.md (7 chapters) and Book Two Humanized.md (18 chapters) into typed `Book` data. Book content sourced from uploaded humanized versions. Classify each verse as `narrative` or `scripture` (bold/key declarations = scripture, flowing prose = narrative). This is content work — budget time for careful classification. Book Two has 18 chapters in the humanized version (brief says 10 — use the full humanized content as the source of truth).

- [ ] **Session 8: Books reader** — ~3.5 hours, $0
  Files: `src/app/books/page.tsx`, `src/app/books/[book]/page.tsx`, `src/components/books/BookReader.tsx`, `src/components/books/TableOfContents.tsx`, `src/components/books/ChapterBlock.tsx`, `src/components/books/VerseBlock.tsx`, `src/components/books/ProgressBar.tsx`
  Tests: `tests/e2e/books.spec.ts` — TOC renders all chapters, clicking TOC navigates, progress bar fills on scroll
  Dependencies: Session 7
  Notes: Layout: fixed header (book tabs) + two-column (TOC 260px left, reading pane flex-1). TOC active chapter via IntersectionObserver. Progress bar: fixed top, gold fill (`var(--light)`), 100% width represents full book. VerseBlock: narrative = Cormorant 300 italic, scripture = Cormorant 600. Chapter dividers between sections.

- [ ] **Session 9: Circle page** — ~2 hours, $0
  Files: `src/app/circle/page.tsx`
  Tests: `tests/e2e/circle.spec.ts` — 7 role cards render, CTA to /crossing present
  Dependencies: Session 4
  Notes: Hero → Seven Roles Grid (7-card responsive, role number + name + description) → Weekly Rhythm section (two questions: "Where did you drift?" / "Where did you return?"). Seven roles content hardcoded — not from DB.

---

### 🟡 High — Phase 2: The Crossing (1 week)

- [ ] **Session 10: Supabase project setup + schema + RLS** — ~2.5 hours, $0
  Files: `supabase/migrations/001_initial_schema.sql`, `src/lib/db/supabase-server.ts`, `src/lib/db/supabase-client.ts`
  Tests: None (verified in Supabase dashboard + manual API route testing)
  Dependencies: Supabase project created (free)
  Notes: Create all 7 tables with RLS. Every table: `user_id = auth.uid()` policy for SELECT/INSERT/UPDATE. `vow_text` column on crossings — nullable, not required. Add Supabase project URL + anon key to `.env.local`.

- [ ] **Session 11: Auth flow** — ~2 hours, $0
  Files: `src/app/auth/page.tsx`, `src/middleware.ts`
  Tests: `tests/e2e/auth.spec.ts` — sign up, sign in, redirect to dashboard post-crossing
  Dependencies: Session 10
  Notes: Magic link + email/password. No OAuth. Middleware: protect /dashboard only — redirect to /crossing if not authenticated. Auth page: minimal, matches brand aesthetic — no social login buttons.

- [ ] **Session 12: DB query layer** — ~1.5 hours, $0
  Files: `src/lib/db/queries.ts`
  Tests: None (tested via API routes in subsequent sessions)
  Dependencies: Session 10
  Notes: All typed query functions here: `createCrossing()`, `getCheckins()`, `createCheckin()`, `createNightWatch()`, `getNightWatch()`, `logPillar()`, `logFast()`, `markChapterRead()`, `getReadingProgress()`. No raw Supabase in components.

- [ ] **Session 13: Crossing flow** — ~4 hours, $0
  Files: `src/app/crossing/page.tsx`, `src/components/crossing/SilenceStep.tsx`, `src/components/crossing/WaterStep.tsx`, `src/components/crossing/WordStep.tsx`, `src/components/crossing/CrossingComplete.tsx`, `src/app/api/crossing/route.ts`
  Tests: `tests/e2e/crossing.spec.ts` — 60s timer completes, all three steps reachable, I RETURN button calls API, completion screen shows
  Dependencies: Sessions 11, 12
  Notes: SilenceStep: full dark screen, 60s countdown (allow skip after 30s for UX — not a hard gate), single instruction line. WaterStep confessional text field: **DO NOT SAVE TO DATABASE.** Only cross-step state (not persisted). WordStep: "I RETURN" button is the largest click target on the site — gold border, Cinzel, full treatment. CrossingComplete: Mark animates (same as home hero), "From this day, you are Returned.", crossing date displayed, optional share card (text + date + "I return." + The Mark).

---

### 🟠 Medium — Phase 3: Member Dashboard (2–3 weeks)

- [ ] **Session 14: API routes** — ~2.5 hours, $0
  Files: `src/app/api/checkin/route.ts`, `src/app/api/night-watch/route.ts`, `src/app/api/pillar-log/route.ts`, `src/app/api/fast-log/route.ts`, `src/app/api/reading-progress/route.ts`
  Tests: Covered by dashboard E2E in Session 15
  Dependencies: Session 12
  Notes: All routes: auth check first (401 if no session), input validation, call queries.ts function, return typed response. No raw Supabase in route files.

- [ ] **Session 15: Dashboard shell + MemberHeader** — ~2 hours, $0
  Files: `src/app/dashboard/page.tsx`, `src/components/dashboard/MemberHeader.tsx`
  Tests: `tests/e2e/dashboard.spec.ts` — auth-gated (redirect if no session), member name shows, days since crossing counter increments
  Dependencies: Sessions 11, 13
  Notes: MemberHeader: The Mark (static, not animated), member name, "Returned since [date]", "Day [N] of Returning" counter. Counter computed client-side from crossing date — no DB call needed.

- [ ] **Session 16: Weekly Check-in + Night Watch** — ~3 hours, $0
  Files: `src/components/dashboard/WeeklyCheckin.tsx`, `src/components/dashboard/NightWatch.tsx`
  Tests: Append to `tests/e2e/dashboard.spec.ts`
  Dependencies: Session 14
  Notes: WeeklyCheckin: two text areas ("Where did you drift?" / "Where did you return?"), save button, previous weeks collapsible history. NightWatch: three questions, saves to night_watch table, previous entries as history. Both use Cormorant body text for labels — not Cinzel (too formal for conversational inputs).

- [ ] **Session 17: Seven Ways Tracker + Fast Logger** — ~3 hours, $0
  Files: `src/components/dashboard/SevenWaysTracker.tsx`, `src/components/dashboard/FastLogger.tsx`
  Tests: Append to `tests/e2e/dashboard.spec.ts`
  Dependencies: Session 14
  Notes: SevenWaysTracker: 7 pillars (Truth, Discipline, Service, Stillness, Craft, Word, Returning), daily 1–5 rating, 7-day strip visual per pillar (simple bar, `var(--light)` fill). FastLogger: 3 fasts with frequency labels (Mouth/Noise = weekly, Comfort = monthly), toggle + log interface.

- [ ] **Session 18: Reading Progress** — ~1.5 hours, $0
  Files: `src/components/dashboard/ReadingProgress.tsx`
  Tests: Append to `tests/e2e/dashboard.spec.ts`
  Dependencies: Sessions 14, 8
  Notes: Show Book One (7 chapters) and Book Two (18 chapters) with read/unread status. Clicking a chapter links to `/books/[book]#ch-N`. Progress bar per book (gold fill). Reading progress recorded on chapter completion in the reader.

---

### 🔵 Low — Phase 4: Circle Community

- [ ] **Session 19+: Circle community layer** — Research required before scaffolding
  Notes: Small-group model (8–12 members). Circle creation, shared check-ins within a Circle, Keeper role assignment, Week of Returning view. Do NOT build until community model is validated with first 50 Returned members — their input should shape the feature.

---

## COST SUMMARY

| Category | Estimated | Actual |
|----------|-----------|--------|
| Total development sessions | 19+ | — |
| Total estimated hours | ~45 hours | — |
| External costs before launch | $12/yr | — |
| Monthly costs post-launch (Phase 1–3) | $0–$20/mo | — |

**Pre-launch cost breakdown:**
- Domain (thereturned.com): ~$12/yr
- Supabase: $0 (free tier through launch)
- Vercel: $0 (Hobby tier through launch)
- Total: ~$12

**Monthly post-launch costs:**
- Vercel Hobby: $0 (upgrade to Pro $20/mo when needed)
- Supabase free: $0 (50K MAU limit — safe through first several months)
- Total: ~$0/mo (Phase 1–3)

---

## BLOCKED / WAITING

None currently.

---

## COMPLETED

_(nothing yet — scaffold only)_
