import { describe, it, expect } from "vitest";
import { bookOne } from "@/lib/content/book-one";
import { bookTwo } from "@/lib/content/book-two";

describe("Book One", () => {
  it("has 7 chapters", () => {
    expect(bookOne.chapters).toHaveLength(7);
  });

  it("has correct book metadata", () => {
    expect(bookOne.id).toBe("one");
    expect(bookOne.number).toBe(1);
    expect(bookOne.title).toBeTruthy();
  });

  it("every chapter has an id, roman numeral, title, and verses", () => {
    bookOne.chapters.forEach((ch) => {
      expect(ch.id).toMatch(/^ch-\d+$/);
      expect(ch.roman).toBeTruthy();
      expect(ch.title).toBeTruthy();
      expect(ch.verses.length).toBeGreaterThan(0);
    });
  });

  it("every verse has a valid type and non-empty text", () => {
    bookOne.chapters.forEach((ch) => {
      ch.verses.forEach((v) => {
        expect(["narrative", "scripture"]).toContain(v.type);
        expect(v.text.length).toBeGreaterThan(0);
      });
    });
  });

  it("contains no gendered pronouns (he/him/his/man)", () => {
    const gendered = /\b(he |him |his |a man|the man)\b/i;
    bookOne.chapters.forEach((ch) => {
      ch.verses.forEach((v) => {
        expect(v.text).not.toMatch(gendered);
      });
    });
  });
});

describe("Book Two", () => {
  it("has 18 chapters", () => {
    expect(bookTwo.chapters).toHaveLength(18);
  });

  it("has correct book metadata", () => {
    expect(bookTwo.id).toBe("two");
    expect(bookTwo.number).toBe(2);
  });

  it("every chapter has an id, roman numeral, title, and verses", () => {
    bookTwo.chapters.forEach((ch) => {
      expect(ch.id).toMatch(/^ch-\d+$/);
      expect(ch.roman).toBeTruthy();
      expect(ch.title).toBeTruthy();
      expect(ch.verses.length).toBeGreaterThan(0);
    });
  });

  it("every verse has a valid type and non-empty text", () => {
    bookTwo.chapters.forEach((ch) => {
      ch.verses.forEach((v) => {
        expect(["narrative", "scripture"]).toContain(v.type);
        expect(v.text.length).toBeGreaterThan(0);
      });
    });
  });

  it("contains no gendered pronouns", () => {
    const gendered = /\b(he |him |his |a man|the man|brother)\b/i;
    bookTwo.chapters.forEach((ch) => {
      ch.verses.forEach((v) => {
        expect(v.text).not.toMatch(gendered);
      });
    });
  });
});
