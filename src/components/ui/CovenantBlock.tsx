"use client";

import { motion } from "framer-motion";

const vows = [
  "I will speak the truth, even when my voice shakes.",
  "I will hold discipline as the shape of devotion.",
  "I will serve without calculation.",
  "I will sit in stillness when the world screams for reaction.",
  "I will sharpen my craft as an act of worship.",
  "I will let my word be unbreakable.",
];

export default function CovenantBlock() {
  return (
    <section className="border-y border-fog/30 bg-stone px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 block font-cinzel text-[9px] font-normal uppercase tracking-[0.4em] text-parchment2"
        >
          The Covenant
        </motion.span>
        <div className="space-y-6">
          {vows.map((vow, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="font-cormorant text-lg font-semibold leading-[2.2] text-parchment md:text-xl"
            >
              {vow}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
