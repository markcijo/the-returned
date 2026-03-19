"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Book } from "@/lib/types";
import TableOfContents from "./TableOfContents";
import ChapterBlock from "./ChapterBlock";
import ProgressBar from "./ProgressBar";

interface BookReaderProps {
  book: Book;
}

export default function BookReader({ book }: BookReaderProps) {
  const [activeChapterId, setActiveChapterId] = useState(
    book.chapters[0]?.id ?? ""
  );
  const [progress, setProgress] = useState(0);
  const markedChapters = useRef<Set<string>>(new Set());

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setProgress(Math.min(scrollPercent, 100));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Track active chapter via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    book.chapters.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveChapterId(chapter.id);
            }
          });
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [book.chapters]);

  // Auto-mark chapter as read when user scrolls past the end
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    book.chapters.forEach((chapter, index) => {
      const el = document.getElementById(chapter.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When the chapter section's bottom edge is above the viewport
            // (user scrolled past it), mark as read
            if (
              !entry.isIntersecting &&
              entry.boundingClientRect.top < 0 &&
              !markedChapters.current.has(chapter.id)
            ) {
              markedChapters.current.add(chapter.id);
              const chapterNum = index + 1;
              fetch("/api/reading-progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ book: book.id, chapter: chapterNum }),
              }).catch(() => {
                // Silent fail — user may not be authenticated
              });
            }
          });
        },
        { rootMargin: "0px 0px -100% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [book.chapters, book.id]);

  return (
    <>
      <ProgressBar progress={progress} />
      <div className="mx-auto flex max-w-5xl gap-0 px-4 pt-24 pb-32 sm:px-6 lg:gap-12">
        <div className="hidden w-60 shrink-0 lg:block">
          <TableOfContents
            chapters={book.chapters}
            activeChapterId={activeChapterId}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-12">
            <span className="mb-3 block font-cinzel text-[9px] font-normal uppercase tracking-[0.4em] text-parchment2">
              {book.subtitle}
            </span>
            <h1 className="font-cinzel text-3xl font-semibold text-parchment md:text-4xl">
              {book.title}
            </h1>
          </div>
          <div className="divide-y divide-fog/20">
            {book.chapters.map((chapter) => (
              <ChapterBlock key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
