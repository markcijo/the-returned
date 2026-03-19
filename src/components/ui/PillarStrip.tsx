"use client";

import { motion } from "framer-motion";

const pillars = [
  { number: "I", name: "Truth" },
  { number: "II", name: "Discipline" },
  { number: "III", name: "Service" },
  { number: "IV", name: "Stillness" },
  { number: "V", name: "Craft" },
  { number: "VI", name: "Word" },
  { number: "VII", name: "Returning" },
];

export default function PillarStrip() {
  return (
    <section className="border-y border-fog/30 bg-stone px-6 py-20">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12 block text-center font-cinzel text-[9px] font-normal uppercase tracking-[0.4em] text-parchment2"
      >
        The Seven Ways
      </motion.span>
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-7">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex flex-col items-center gap-2 py-4"
          >
            <span className="font-cinzel text-xs font-normal tracking-[0.3em] text-ember">
              {pillar.number}
            </span>
            <span className="font-cinzel text-sm font-semibold tracking-[0.15em] text-parchment">
              {pillar.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
