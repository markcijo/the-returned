"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { bookOne } from "@/lib/content/book-one";
import { bookTwo } from "@/lib/content/book-two";

// Collect all scripture verses from both books
const allScriptures = [
  ...bookOne.chapters.flatMap((ch) =>
    ch.verses
      .filter((v) => v.type === "scripture")
      .map((v) => ({ text: v.text, book: bookOne.title, chapter: ch.title }))
  ),
  ...bookTwo.chapters.flatMap((ch) =>
    ch.verses
      .filter((v) => v.type === "scripture")
      .map((v) => ({ text: v.text, book: bookTwo.title, chapter: ch.title }))
  ),
].filter((v) => v.text.length > 20); // Skip very short ones like "Return."

export default function DailyVerse() {
  const [copied, setCopied] = useState(false);

  // Pick a verse based on the day — changes at midnight
  const verse = useMemo(() => {
    const today = new Date();
    const dayOfYear =
      Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + today.getFullYear() * 366;
    return allScriptures[dayOfYear % allScriptures.length];
  }, []);

  async function handleShare() {
    const shareText = `"${verse.text}"\n\n— ${verse.book}, ${verse.chapter}\n\nThe Returned`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
        return;
      } catch {
        // Fall through
      }
    }

    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="border border-fog/30 bg-stone2 p-5 sm:p-8"
    >
      <span className="mb-6 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-parchment2">
        Today&apos;s Verse
      </span>

      <blockquote className="border-l-2 border-ember pl-5">
        <p className="font-cormorant text-lg font-semibold leading-[2] text-parchment">
          {verse.text}
        </p>
      </blockquote>

      <p className="mt-4 font-cormorant text-xs font-normal italic text-parchment2">
        — {verse.book}, {verse.chapter}
      </p>

      <button
        onClick={handleShare}
        className="mt-4 min-h-[44px] px-4 py-2 font-cinzel text-[9px] uppercase tracking-[0.2em] text-ember transition-colors hover:text-light"
      >
        {copied ? "Copied" : "Share this verse"}
      </button>
    </motion.div>
  );
}
