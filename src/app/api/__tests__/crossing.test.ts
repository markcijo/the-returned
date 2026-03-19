import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/crossing/route";

describe("POST /api/crossing", () => {
  it("returns data on success", async () => {
    const res = await POST();
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.data).toBeDefined();
  });

  it("returns 401 when not authenticated", async () => {
    const { createSupabaseServer } = await import("@/lib/db/supabase-server");
    vi.mocked(createSupabaseServer).mockResolvedValueOnce({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
      from: vi.fn(),
    } as any);

    const res = await POST();
    expect(res.status).toBe(401);
  });
});
