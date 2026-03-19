"use client";

import { motion } from "framer-motion";
import NavBar from "@/components/ui/NavBar";
import PageHero from "@/components/ui/PageHero";

const roles = [
  {
    number: "I",
    name: "Keeper of Silence",
    description: "Who guards stillness, and restores the mind of the Circle.",
  },
  {
    number: "II",
    name: "Keeper of the Word",
    description: "Who guards truth, and corrects false speech gently.",
  },
  {
    number: "III",
    name: "Keeper of Discipline",
    description: "Who trains the body, and teaches the Path of strength.",
  },
  {
    number: "IV",
    name: "Keeper of Service",
    description: "Who organizes giving, and remembers the weak.",
  },
  {
    number: "V",
    name: "Keeper of Craft",
    description:
      "Who builds what is needed, and turns intention into structure.",
  },
  {
    number: "VI",
    name: "Keeper of the Crossing",
    description:
      "Who prepares the new ones, and leads them through initiation.",
  },
  {
    number: "VII",
    name: "Keeper of Returning",
    description:
      "Who restores the fallen, and calls the drifting back without shame.",
  },
];

export default function CirclePage() {
  return (
    <>
      <NavBar />

      <PageHero
        eyebrow="The Circle"
        title="Not Alone"
        subtitle="A single flame is easily shaken by wind. Many flames together become a fire that steadies itself."
      />

      {/* Seven Roles */}
      <section className="px-6 py-20">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 block text-center font-cinzel text-[9px] font-normal uppercase tracking-[0.4em] text-parchment2"
        >
          The Seven Roles
        </motion.span>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {roles.map((role, i) => (
            <motion.div
              key={role.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border border-fog/30 bg-stone2 p-8"
            >
              <span className="mb-3 block font-cinzel text-[10px] font-normal tracking-[0.3em] text-ember">
                {role.number}
              </span>
              <h3 className="mb-3 font-cinzel text-sm font-semibold tracking-[0.1em] text-parchment">
                {role.name}
              </h3>
              <p className="font-cormorant text-base font-light italic leading-relaxed text-parchment2">
                {role.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Weekly Rhythm */}
      <section className="border-y border-fog/30 bg-stone px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 block font-cinzel text-[9px] font-normal uppercase tracking-[0.4em] text-parchment2"
          >
            The Weekly Rhythm
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 font-cormorant text-xl font-light italic leading-relaxed text-parchment2"
          >
            Once each week, the Circle gathers. Not for performance — for
            reckoning.
          </motion.p>

          <div className="my-12 space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="font-cormorant text-2xl font-semibold leading-relaxed text-parchment">
                &ldquo;Where did you drift?&rdquo;
              </p>
              <p className="mt-2 font-cormorant text-base font-light italic text-parchment2">
                Each answers without excuses.
              </p>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="mx-auto h-px w-12 bg-ember"
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="font-cormorant text-2xl font-semibold leading-relaxed text-parchment">
                &ldquo;Where did you return?&rdquo;
              </p>
              <p className="mt-2 font-cormorant text-base font-light italic text-parchment2">
                Each answers without pride.
              </p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="font-cormorant text-lg font-semibold text-parchment"
          >
            &ldquo;The Circle is not where you are measured.
            <br />
            It is where you are remembered.&rdquo;
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 font-cormorant text-xl font-light italic text-parchment2"
        >
          The Circle waits. Begin with The Crossing.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a
            href="/crossing"
            className="border border-light/60 px-8 py-3 font-cinzel text-[11px] font-semibold uppercase tracking-[0.25em] text-light transition-all duration-300 hover:border-light hover:bg-light/10"
          >
            Begin The Crossing
          </a>
        </motion.div>
      </section>
    </>
  );
}
