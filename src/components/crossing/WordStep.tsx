"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface WordStepProps {
  onComplete: () => void;
}

export default function WordStep({ onComplete }: WordStepProps) {
  const [loading, setLoading] = useState(false);

  async function handleReturn() {
    setLoading(true);
    try {
      const res = await fetch("/api/crossing", { method: "POST" });
      if (res.ok) {
        onComplete();
      } else {
        // If not authenticated, still complete locally
        onComplete();
      }
    } catch {
      onComplete();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[100dvh] flex-col items-center justify-center px-6 py-12"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mb-12 font-cinzel text-[10px] font-normal uppercase tracking-[0.4em] text-parchment2"
      >
        Step Three — Word
      </motion.span>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mb-16 max-w-md text-center font-cormorant text-xl font-normal italic leading-relaxed text-parchment"
      >
        Speak your vow. Not as a promise of perfection,
        <br />
        but as a covenant of direction.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleReturn}
        disabled={loading}
        className="border-2 border-light px-10 py-5 font-cinzel text-xl font-semibold tracking-[0.15em] text-light transition-all duration-300 hover:bg-light/10 disabled:opacity-50 sm:px-16 sm:py-6 sm:text-2xl md:text-3xl"
      >
        I RETURN
      </motion.button>
    </motion.div>
  );
}
