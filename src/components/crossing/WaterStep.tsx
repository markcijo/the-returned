"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface WaterStepProps {
  onComplete: () => void;
}

export default function WaterStep({ onComplete }: WaterStepProps) {
  const [text, setText] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center px-6"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mb-12 font-cinzel text-[10px] font-normal uppercase tracking-[0.4em] text-parchment2"
      >
        Step Two — Water
      </motion.span>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mb-4 max-w-md text-center font-cormorant text-2xl font-light italic leading-relaxed text-parchment"
      >
        &ldquo;Truth is like water. It does not ask your comfort.
        <br />
        It asks your courage.&rdquo;
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mb-10 max-w-sm text-center font-cormorant text-base font-normal italic text-parchment2"
      >
        Name what you must release. This is private — it will not be saved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="w-full max-w-md"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full resize-none border border-fog/50 bg-stone px-5 py-4 font-cormorant text-base text-parchment outline-none transition-colors placeholder:text-fog focus:border-ember"
          placeholder="What must you release..."
        />

        <button
          onClick={onComplete}
          disabled={text.trim().length === 0}
          className="mt-6 w-full border border-ember/60 py-3 font-cinzel text-[11px] font-normal uppercase tracking-[0.25em] text-parchment2 transition-all duration-300 hover:border-ember hover:text-parchment disabled:opacity-30 disabled:hover:border-ember/60 disabled:hover:text-parchment2"
        >
          Release and Continue
        </button>
      </motion.div>
    </motion.div>
  );
}
