"use client";

import { Chapter } from "@/lib/types";

interface TableOfContentsProps {
  chapters: Chapter[];
  activeChapterId: string;
}

export default function TableOfContents({
  chapters,
  activeChapterId,
}: TableOfContentsProps) {
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto pr-6 lg:block">
      <span className="mb-6 block font-cinzel text-[9px] font-normal uppercase tracking-[0.4em] text-parchment2">
        Chapters
      </span>
      <ul className="space-y-2">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <button
              onClick={() => handleClick(chapter.id)}
              className={`block w-full text-left font-cormorant text-sm transition-colors duration-200 ${
                activeChapterId === chapter.id
                  ? "font-semibold text-light"
                  : "font-light text-parchment2 hover:text-parchment"
              }`}
            >
              <span className="mr-2 font-cinzel text-[10px] tracking-[0.2em] text-ember">
                {chapter.roman}
              </span>
              {chapter.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
