# session-log.md — The Returned

<!--
PURPOSE: Rolling session context. Read at the start of every session. Write at the end.
Keep only the last 5 sessions. Older entries get absorbed into CLAUDE.md or deleted.
Format: Most recent session at the top.
-->

---

## Session 0 — [Date: TBD] — Scaffold Generated

**What was done:**
- Full 5-file scaffold generated from project brief and humanized book files
- CLAUDE.md, .cursorrules, tasks/todo.md, research/findings.md, session-log.md created

**Key decisions made:**
- No shadcn/ui — custom CSS only (brand aesthetic incompatible)
- WaterStep confessional text: never persisted to DB (explicitly stated in brief)
- Book Two has 18 chapters in humanized source (brief said 10 — humanized source wins)
- Static TypeScript data for book content — not a CMS
- Magic link + email/password auth only — no OAuth
- Phase 4 Circle community deliberately left undesigned — to be shaped by first 50 members

**Discoveries:**
- Brief says Book Two has 10 chapters. Humanized source has 18 chapters (Chapters IX–XVIII include Day of Returning, Hungry King parable, Rule of Money, Test of Power, Restoration Oath, Law of Love Without Weakness, Marriage Covenant, Raising Children, Broken Sword parable, Final Warning). Use humanized source as canonical.
- Cinzel font only has weights 400, 600, 900 — no 300 or 500. Adjust typography rules accordingly.
- The Mark SVG animation using `pathLength={1}` is the safest approach for SSR compatibility — `getTotalLength()` runs at runtime and breaks in SSR context.

**Blockers:** None

**Next session should:**
1. Run Session 1: `npx create-next-app@latest the-returned --typescript --tailwind --app --no-src-dir` (or with `--src-dir` per preference)
2. Install: `framer-motion @supabase/ssr @supabase/supabase-js lucide-react`
3. Configure `next.config.ts` for font optimization
4. Set up Playwright config
5. Update CLAUDE.md with the actual Supabase project URL once created

---

_(No further sessions yet — project not started)_
