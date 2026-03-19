import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/fast-log/route";
import { NextRequest } from "next/server";

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost:3000/api/fast-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/fast-log", () => {
  it("returns 400 when fields are missing", async () => {
    const res = await POST(makeRequest({ fast_type: "mouth" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when fast_type is invalid", async () => {
    const res = await POST(
      makeRequest({ fast_type: "invalid", date: "2026-03-19", completed: true })
    );
    expect(res.status).toBe(400);
  });

  it("accepts valid fast types", async () => {
    for (const type of ["mouth", "noise", "comfort"]) {
      const res = await POST(
        makeRequest({ fast_type: type, date: "2026-03-19", completed: true })
      );
      // Should be 200 (not 400) — the mock returns success
      expect(res.status).not.toBe(400);
    }
  });
});
