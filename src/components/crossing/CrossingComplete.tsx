"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Mark from "@/components/ui/Mark";

export default function CrossingComplete() {
  const crossingDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen flex-col items-center justify-center px-6"
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
        className="mt-10 text-center font-cinzel text-3xl font-semibold text-parchment md:text-4xl"
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.4 }}
        className="mt-16 border border-fog/30 bg-stone2 px-12 py-10 text-center"
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 4 }}
        className="mt-12 flex gap-6"
      >
        <Link
          href="/dashboard"
          className="border border-light/60 px-8 py-3 font-cinzel text-[11px] font-semibold uppercase tracking-[0.25em] text-light transition-all duration-300 hover:border-light hover:bg-light/10"
        >
          Enter the Dashboard
        </Link>
        <Link
          href="/books"
          className="px-8 py-3 font-cinzel text-[11px] font-normal uppercase tracking-[0.25em] text-parchment2 transition-colors duration-300 hover:text-parchment"
        >
          Read the Books
        </Link>
      </motion.div>
    </motion.div>
  );
}
