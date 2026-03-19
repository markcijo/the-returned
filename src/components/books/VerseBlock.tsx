"use client";

import { useState } from "react";
import { Verse } from "@/lib/types";

interface VerseBlockProps {
  verse: Verse;
}

export default function VerseBlock({ verse }: VerseBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareText = `"${verse.text}"\n\n— The Returned`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
        return;
      } catch {
        // Fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (verse.type === "scripture") {
    return (
      <div className="group relative my-6">
        <p className="font-cormorant text-lg font-semibold leading-[2] text-parchment md:text-xl">
          {verse.text}
        </p>
        <button
          onClick={handleShare}
          className="absolute -right-2 top-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:-right-8"
          aria-label="Share this passage"
        >
          <span className="font-cinzel text-[8px] uppercase tracking-[0.2em] text-ember transition-colors hover:text-light">
            {copied ? "Copied" : "Share"}
          </span>
        </button>
      </div>
    );
  }

  return (
    <p className="my-4 font-cormorant text-lg font-normal italic leading-[1.9] text-parchment md:text-xl">
      {verse.text}
    </p>
  );
}
