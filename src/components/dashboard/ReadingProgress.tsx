"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ProgressEntry {
  book: string;
  chapter: number;
  completed_at: string;
}

const BOOKS = [
  { id: "one", title: "Book One — The Book of Returning", totalChapters: 7 },
  {
    id: "two",
    title: "Book Two — The Teachings of the Returned",
    totalChapters: 18,
  },
];

export default function ReadingProgress() {
  const [progress, setProgress] = useState<ProgressEntry[]>([]);

  useEffect(() => {
    fetch("/api/reading-progress")
      .then((r) => r.json())
      .then((d) => setProgress(d.data ?? []));
  }, []);

  function completedChapters(bookId: string) {
    return progress.filter((p) => p.book === bookId).map((p) => p.chapter);
  }

  return (
    <div className="border border-fog/30 bg-stone2 p-8">
      <span className="mb-6 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-parchment2">
        Reading Progress
      </span>

      <div className="space-y-6">
        {BOOKS.map((book) => {
          const completed = completedChapters(book.id);
          const pct = Math.round(
            (completed.length / book.totalChapters) * 100
          );

          return (
            <div key={book.id}>
              <div className="mb-2 flex items-center justify-between">
                <Link
                  href={`/books/${book.id}`}
                  className="font-cinzel text-xs font-semibold tracking-[0.1em] text-parchment transition-colors hover:text-light"
                >
                  {book.title}
                </Link>
                <span className="font-cinzel text-[10px] tracking-[0.2em] text-parchment2">
                  {completed.length}/{book.totalChapters}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-3 h-1 bg-fog/30">
                <div
                  className="h-full bg-light transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Chapter dots */}
              <div className="flex gap-1">
                {Array.from({ length: book.totalChapters }, (_, i) => {
                  const ch = i + 1;
                  const isRead = completed.includes(ch);
                  return (
                    <Link
                      key={ch}
                      href={`/books/${book.id}#ch-${ch}`}
                      className={`flex h-6 flex-1 items-center justify-center text-[9px] transition-colors ${
                        isRead
                          ? "bg-light/20 text-light"
                          : "bg-fog/20 text-parchment2 hover:bg-fog/30"
                      }`}
                    >
                      {ch}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
