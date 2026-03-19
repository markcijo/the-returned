"use client";

import { motion } from "framer-motion";

export default function GreetingCard() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-3xl gap-0 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center border border-fog/30 bg-stone2 px-10 py-16"
        >
          <p className="font-cormorant text-2xl font-light italic leading-relaxed text-parchment2 md:text-3xl">
            Light over Fog.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center border border-fog/30 bg-stone px-10 py-16"
        >
          <p className="font-cinzel text-xl font-semibold tracking-[0.1em] text-light">
            I return.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
