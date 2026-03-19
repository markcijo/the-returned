"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Mark from "@/components/ui/Mark";

export default function CrossingComplete() {
  const shareCardRef = useRef<HTMLDivElement>(null);
  const crossingDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const downloadShareCard = useCallback(async () => {
    const card = shareCardRef.current;
    if (!card) return;

    const canvas = document.createElement("canvas");
    const scale = 2;
    canvas.width = card.offsetWidth * scale;
    canvas.height = card.offsetHeight * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(scale, scale);

    // Background
    ctx.fillStyle = "#232118";
    ctx.fillRect(0, 0, card.offsetWidth, card.offsetHeight);

    // Border
    ctx.strokeStyle = "#3a3830";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, card.offsetWidth - 1, card.offsetHeight - 1);

    const cx = card.offsetWidth / 2;

    // The Mark (circle + line)
    ctx.strokeStyle = "#c9b97a";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, 40, 18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, 25);
    ctx.lineTo(cx, 55);
    ctx.stroke();

    // "I return."
    ctx.fillStyle = "#e8e3d8";
    ctx.font = "600 14px Cinzel, serif";
    ctx.textAlign = "center";
    ctx.fillText("I return.", cx, 82);

    // Date
    ctx.fillStyle = "#c9bfa8";
    ctx.font = "400 9px Cinzel, serif";
    ctx.letterSpacing = "2px";
    ctx.fillText(crossingDate.toUpperCase(), cx, 100);

    // Divider
    ctx.strokeStyle = "#7a6a4f";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 24, 116);
    ctx.lineTo(cx + 24, 116);
    ctx.stroke();

    // "The Returned"
    ctx.fillStyle = "#3a3830";
    ctx.font = "400 8px Cinzel, serif";
    ctx.fillText("THE RETURNED", cx, 134);

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "the-returned-crossing.png";
    a.click();
  }, [crossingDate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[100dvh] flex-col items-center justify-center px-6 py-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Mark size={100} animated strokeWidth={1.2} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="mt-10 text-center font-cinzel text-2xl font-semibold text-parchment sm:text-3xl md:text-4xl"
      >
        From this day, you are Returned.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.8 }}
        className="mt-6 font-cinzel text-[10px] font-normal uppercase tracking-[0.3em] text-parchment2"
      >
        Crossed on {crossingDate}
      </motion.p>

      {/* Share Card */}
      <motion.div
        ref={shareCardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.4 }}
        className="mt-16 w-full max-w-xs border border-fog/30 bg-stone2 px-8 py-10 text-center sm:px-12"
      >
        <Mark size={40} />
        <p className="mt-4 font-cinzel text-sm font-semibold tracking-[0.1em] text-parchment">
          I return.
        </p>
        <p className="mt-2 font-cinzel text-[9px] uppercase tracking-[0.3em] text-parchment2">
          {crossingDate}
        </p>
        <div className="mx-auto mt-4 h-px w-12 bg-ember" />
        <p className="mt-4 font-cinzel text-[8px] uppercase tracking-[0.3em] text-fog">
          The Returned
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.8 }}
        onClick={downloadShareCard}
        className="mt-4 min-h-[44px] px-4 py-2 font-cormorant text-sm font-normal italic text-parchment2 transition-colors hover:text-parchment"
      >
        Download share card
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 4 }}
        className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6"
      >
        <Link
          href="/dashboard"
          className="border border-light/60 px-8 py-3 text-center font-cinzel text-[11px] font-semibold uppercase tracking-[0.25em] text-light transition-all duration-300 hover:border-light hover:bg-light/10"
        >
          Enter the Dashboard
        </Link>
        <Link
          href="/books"
          className="px-8 py-3 text-center font-cinzel text-[11px] font-normal uppercase tracking-[0.25em] text-parchment2 transition-colors duration-300 hover:text-parchment"
        >
          Read the Books
        </Link>
      </motion.div>
    </motion.div>
  );
}
