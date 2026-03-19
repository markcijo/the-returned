import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/waitlist/route";
import { NextRequest } from "next/server";

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost:3000/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/waitlist", () => {
  it("returns 400 when email is missing", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("returns 400 when email is invalid", async () => {
    const res = await POST(makeRequest({ email: "notanemail" }));
    expect(res.status).toBe(400);
  });

  it("accepts a valid email", async () => {
    const res = await POST(makeRequest({ email: "test@example.com" }));
    expect(res.status).not.toBe(400);
  });
});
