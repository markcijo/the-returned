import { describe, it, expect, vi } from "vitest";
import { POST, GET } from "@/app/api/checkin/route";
import { NextRequest } from "next/server";

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost:3000/api/checkin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/checkin", () => {
  it("returns 400 when fields are missing", async () => {
    const res = await POST(makeRequest({ week_of: "2026-03-17" }));
    expect(res.status).toBe(400);
  });

  it("returns 401 when not authenticated", async () => {
    const { createSupabaseServer } = await import("@/lib/db/supabase-server");
    vi.mocked(createSupabaseServer).mockResolvedValueOnce({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
      from: vi.fn(),
    } as any);

    const res = await POST(
      makeRequest({
        week_of: "2026-03-17",
        drift_text: "Drifted here",
        return_text: "Returned there",
      })
    );
    expect(res.status).toBe(401);
  });
});

describe("GET /api/checkin", () => {
  it("returns 401 when not authenticated", async () => {
    const { createSupabaseServer } = await import("@/lib/db/supabase-server");
    vi.mocked(createSupabaseServer).mockResolvedValueOnce({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
      from: vi.fn(),
    } as any);

    const res = await GET();
    expect(res.status).toBe(401);
  });
});
