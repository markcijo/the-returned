"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SilenceStepProps {
  onComplete: () => void;
}

export default function SilenceStep({ onComplete }: SilenceStepProps) {
  const [seconds, setSeconds] = useState(60);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);

    if (seconds <= 30) {
      setCanSkip(true);
    }

    return () => clearTimeout(timer);
  }, [seconds, onComplete]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

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
        transition={{ duration: 1.5, delay: 0.5 }}
        className="mb-12 font-cinzel text-[10px] font-normal uppercase tracking-[0.4em] text-parchment2"
      >
        Step One — Silence
      </motion.span>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="mb-16 max-w-md text-center font-cormorant text-xl font-normal italic leading-relaxed text-parchment"
      >
        Be still. Face what you have been avoiding.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="font-cinzel text-5xl font-semibold tracking-[0.1em] text-parchment tabular-nums"
      >
        {minutes}:{secs.toString().padStart(2, "0")}
      </motion.div>

      <AnimatePresence>
        {canSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            onClick={onComplete}
            className="mt-16 min-h-[44px] px-6 py-3 font-cinzel text-[10px] uppercase tracking-[0.3em] text-parchment2 transition-colors hover:text-parchment"
          >
            Continue
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
