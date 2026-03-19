"use client";

import { motion } from "framer-motion";
import NavBar from "@/components/ui/NavBar";
import Mark from "@/components/ui/Mark";

export default function CrossingPage() {
  return (
    <>
      <NavBar />
      <section className="flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Mark size={80} animated strokeWidth={1} />
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10 font-cinzel text-[10px] font-normal uppercase tracking-[0.4em] text-parchment2"
        >
          The Crossing
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-6 text-center font-cinzel text-3xl font-semibold text-parchment md:text-4xl"
        >
          The Ritual Awaits
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.6 }}
          className="mt-8 max-w-md text-center font-cormorant text-xl font-light italic leading-relaxed text-parchment2"
        >
          Silence. Water. Word.
          <br />
          The Crossing is being prepared.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-10 h-px w-24 bg-ember"
        />
      </section>
    </>
  );
}
