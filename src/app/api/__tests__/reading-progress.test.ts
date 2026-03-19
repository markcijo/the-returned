import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/reading-progress/route";
import { NextRequest } from "next/server";

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost:3000/api/reading-progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/reading-progress", () => {
  it("returns 400 when fields are missing", async () => {
    const res = await POST(makeRequest({ book: "one" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when book is invalid", async () => {
    const res = await POST(makeRequest({ book: "three", chapter: 1 }));
    expect(res.status).toBe(400);
  });

  it("accepts valid book values", async () => {
    for (const book of ["one", "two"]) {
      const res = await POST(makeRequest({ book, chapter: 1 }));
      expect(res.status).not.toBe(400);
    }
  });
});
