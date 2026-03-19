"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Mark from "@/components/ui/Mark";
import NavBar from "@/components/ui/NavBar";
import PillarStrip from "@/components/ui/PillarStrip";
import GreetingCard from "@/components/ui/GreetingCard";

export default function Home() {
  return (
    <>
      <NavBar />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Mark size={120} animated strokeWidth={1.2} />
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-10 font-cinzel text-[10px] font-normal uppercase tracking-[0.4em] text-parchment2"
        >
          A Covenant Community
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-6 text-center font-cinzel text-5xl font-semibold leading-tight text-parchment md:text-7xl"
        >
          The Returned
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="mt-8 max-w-lg text-center font-cormorant text-xl font-light italic leading-relaxed text-parchment2 md:text-2xl"
        >
          For builders and thinkers who have drifted.
          <br />
          This is the way back.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 3.2 }}
          className="mt-10 h-px w-24 bg-ember"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.6 }}
          className="mt-10 flex gap-6"
        >
          <Link
            href="/crossing"
            className="border border-light/60 px-8 py-3 font-cinzel text-[11px] font-semibold uppercase tracking-[0.25em] text-light transition-all duration-300 hover:border-light hover:bg-light/10"
          >
            Begin The Crossing
          </Link>
          <Link
            href="/manifesto"
            className="px-8 py-3 font-cinzel text-[11px] font-normal uppercase tracking-[0.25em] text-parchment2 transition-colors duration-300 hover:text-parchment"
          >
            Read the Manifesto
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 4.2 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-parchment2"
          />
        </motion.div>
      </section>

      {/* Pillar Strip */}
      <PillarStrip />

      {/* Pull Quote */}
      <section className="px-6 py-28">
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-cormorant text-2xl font-light italic leading-relaxed text-parchment2 md:text-3xl">
            &ldquo;Do not seek a life without pain.
            <br />
            Seek a life without Drift.&rdquo;
          </p>
        </motion.blockquote>
      </section>

      {/* Greeting Card */}
      <GreetingCard />
    </>
  );
}
