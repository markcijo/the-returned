"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SilenceStepProps {
  onComplete: () => void;
}

const PROMPTS = [
  "Be still.",
  "Face what you have been avoiding.",
  "Name the drift you have been hiding from.",
  "Let the noise fall away.",
  "What remains when the distractions stop?",
];

export default function SilenceStep({ onComplete }: SilenceStepProps) {
  const [seconds, setSeconds] = useState(60);
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, onComplete]);

  // Rotate prompts every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPromptIndex((i) => (i + 1) % PROMPTS.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

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

      <AnimatePresence mode="wait">
        <motion.p
          key={promptIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 1.5 }}
          className="mb-16 max-w-md text-center font-cormorant text-xl font-normal italic leading-relaxed text-parchment"
        >
          {PROMPTS[promptIndex]}
        </motion.p>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="font-cinzel text-5xl font-semibold tracking-[0.1em] text-parchment tabular-nums"
      >
        {minutes}:{secs.toString().padStart(2, "0")}
      </motion.div>

      {/* Progress ring */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="mt-8"
      >
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="var(--fog)"
            strokeWidth="1"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="var(--ember)"
            strokeWidth="1"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${2 * Math.PI * 20 * (seconds / 60)}`}
            transform="rotate(-90 24 24)"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 4 }}
        className="mt-12 max-w-xs text-center font-cormorant text-sm font-normal italic text-parchment2"
      >
        Stay with it. The silence is the work.
      </motion.p>

      {/* Graceful exit for anyone in distress */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1, delay: 8 }}
        whileHover={{ opacity: 0.7 }}
        onClick={onComplete}
        className="mt-6 min-h-[44px] px-4 py-2 font-cormorant text-xs font-normal italic text-fog transition-colors hover:text-parchment2"
      >
        I need to step away
      </motion.button>
    </motion.div>
  );
}
