import { describe, it, expect } from "vitest";
import type { Book, Chapter, Verse, VerseType } from "@/lib/types";

describe("Types", () => {
  it("VerseType accepts narrative and scripture", () => {
    const narrative: VerseType = "narrative";
    const scripture: VerseType = "scripture";
    expect(narrative).toBe("narrative");
    expect(scripture).toBe("scripture");
  });

  it("Verse interface works correctly", () => {
    const verse: Verse = { type: "narrative", text: "Test verse" };
    expect(verse.type).toBe("narrative");
    expect(verse.text).toBe("Test verse");
  });

  it("Chapter interface works correctly", () => {
    const chapter: Chapter = {
      id: "ch-1",
      roman: "I",
      title: "Test Chapter",
      verses: [{ type: "scripture", text: "Test" }],
    };
    expect(chapter.id).toBe("ch-1");
    expect(chapter.verses).toHaveLength(1);
  });

  it("Book interface accepts valid ids", () => {
    const book: Book = {
      id: "one",
      number: 1,
      title: "Test",
      subtitle: "Test Sub",
      chapters: [],
    };
    expect(book.id).toBe("one");
  });
});
