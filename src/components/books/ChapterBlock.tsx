import { Chapter } from "@/lib/types";
import VerseBlock from "./VerseBlock";

interface ChapterBlockProps {
  chapter: Chapter;
}

export default function ChapterBlock({ chapter }: ChapterBlockProps) {
  return (
    <section id={chapter.id} className="scroll-mt-24 py-16">
      <div className="mb-10">
        <span className="mb-3 block font-cinzel text-[10px] font-normal uppercase tracking-[0.4em] text-ember">
          Chapter {chapter.roman}
        </span>
        <h2 className="font-cinzel text-2xl font-semibold text-parchment md:text-3xl">
          {chapter.title}
        </h2>
      </div>
      <div>
        {chapter.verses.map((verse, i) => (
          <VerseBlock key={i} verse={verse} />
        ))}
      </div>
    </section>
  );
}
