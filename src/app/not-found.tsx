"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import NavBar from "@/components/ui/NavBar";
import Mark from "@/components/ui/Mark";

export default function NotFound() {
  return (
    <>
      <NavBar />

      <main className="flex min-h-[100dvh] flex-col items-center justify-center px-4 pt-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Mark size={80} animated strokeWidth={1.2} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-10 font-cinzel text-3xl font-semibold text-parchment md:text-4xl"
        >
          You Have Drifted
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="mt-6 max-w-md text-center font-cormorant text-xl font-light italic leading-relaxed text-parchment2"
        >
          This path does not exist. But the way back always does.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.4 }}
          className="mt-10"
        >
          <Link
            href="/"
            className="inline-block min-h-[44px] border border-light/60 px-8 py-3 font-cinzel text-[11px] font-semibold uppercase tracking-[0.25em] text-light transition-all duration-300 hover:border-light hover:bg-light/10"
          >
            Return Home
          </Link>
        </motion.div>
      </main>
    </>
  );
}
