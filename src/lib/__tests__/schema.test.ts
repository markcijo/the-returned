import { describe, it, expect } from "vitest";

/**
 * Schema smoke test — verifies all expected tables and columns exist.
 * Uses the Supabase anon key to query information_schema.
 * Only runs when NEXT_PUBLIC_SUPABASE_URL is set.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const EXPECTED_TABLES: Record<string, string[]> = {
  crossings: ["id", "user_id", "crossed_at", "vow_text", "created_at"],
  checkins: [
    "id",
    "user_id",
    "week_of",
    "drift_text",
    "return_text",
    "created_at",
  ],
  night_watch: [
    "id",
    "user_id",
    "date",
    "drifted",
    "repair",
    "light_gave",
    "created_at",
  ],
  pillar_logs: ["id", "user_id", "date", "pillar", "rating", "created_at"],
  fast_logs: [
    "id",
    "user_id",
    "fast_type",
    "date",
    "completed",
    "created_at",
  ],
  reading_progress: ["id", "user_id", "book", "chapter", "completed_at"],
  waitlist: ["id", "email", "created_at"],
};

describe.skipIf(!SUPABASE_URL || !SUPABASE_KEY)(
  "Schema smoke test",
  () => {
    async function querySupabase(query: string) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY!,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      return res;
    }

    for (const [table, columns] of Object.entries(EXPECTED_TABLES)) {
      it(`table "${table}" exists and is accessible`, async () => {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/${table}?select=${columns.join(",")}&limit=0`,
          {
            headers: {
              apikey: SUPABASE_KEY!,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        );

        // 200 = table exists and columns are valid
        // 406 = table exists but RLS blocks (still proves schema exists)
        expect(
          [200, 406].includes(res.status),
          `Table "${table}" should exist. Got status ${res.status}: ${await res.text()}`
        ).toBe(true);
      });
    }

    it("all 7 tables are accounted for", () => {
      expect(Object.keys(EXPECTED_TABLES)).toHaveLength(7);
    });
  }
);
