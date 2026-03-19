"use client";

import { motion } from "framer-motion";
import { Chapter } from "@/lib/types";
import VerseBlock from "./VerseBlock";

interface ChapterBlockProps {
  chapter: Chapter;
}

export default function ChapterBlock({ chapter }: ChapterBlockProps) {
  return (
    <section id={chapter.id} className="scroll-mt-24 py-16">
      {/* Chapter intro — breathing room */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2 }}
        className="mb-14"
      >
        <div className="mb-6 h-px w-8 bg-ember" />
        <span className="mb-3 block font-cinzel text-[10px] font-normal uppercase tracking-[0.4em] text-ember">
          Chapter {chapter.roman}
        </span>
        <h2 className="font-cinzel text-2xl font-semibold text-parchment md:text-3xl">
          {chapter.title}
        </h2>
      </motion.div>

      {/* Verses — staggered fade */}
      <div>
        {chapter.verses.map((verse, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3) }}
          >
            <VerseBlock verse={verse} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
