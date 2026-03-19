"use client";

import { useEffect, useState, useCallback } from "react";
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

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setProgress(Math.min(scrollPercent, 100));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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

  return (
    <>
      <ProgressBar progress={progress} />
      <div className="mx-auto flex max-w-5xl gap-12 px-6 pt-24 pb-32">
        <div className="w-60 shrink-0">
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
