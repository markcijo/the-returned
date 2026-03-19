import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/pillar-log/route";
import { NextRequest } from "next/server";

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost:3000/api/pillar-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/pillar-log", () => {
  it("returns 400 when fields are missing", async () => {
    const res = await POST(makeRequest({ date: "2026-03-19" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when pillar is out of range", async () => {
    const res = await POST(
      makeRequest({ date: "2026-03-19", pillar: 8, rating: 3 })
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when rating is out of range", async () => {
    const res = await POST(
      makeRequest({ date: "2026-03-19", pillar: 1, rating: 6 })
    );
    expect(res.status).toBe(400);
  });
});
