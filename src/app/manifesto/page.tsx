"use client";

import { motion } from "framer-motion";
import NavBar from "@/components/ui/NavBar";
import PageHero from "@/components/ui/PageHero";
import CovenantBlock from "@/components/ui/CovenantBlock";

const sections = [
  {
    label: "On the Fog",
    title: "You Have Been Drifting",
    paragraphs: [
      "There is a fog that settles over a life. It does not arrive with violence — it arrives with comfort. It arrives with distraction, with ease, with the slow replacement of fire by routine.",
      "You did not choose it. No one does. The Fog is not a punishment — it is the default. It is what happens when purpose is not actively tended, when discipline gives way to convenience, when the sharp edges of a person are smoothed into compliance.",
      "You have felt it. The strange emptiness after achievement. The restlessness that no vacation cures. The nagging sense that the life you are living is not the life you were built for.",
      "That feeling is not weakness. It is the signal. It is the ancient part of you that remembers what it was made to do.",
    ],
    quote: "The Fog does not destroy. It replaces. And what it replaces, you do not notice until it is gone.",
  },
  {
    label: "On the Light",
    title: "There Is a Way Back",
    paragraphs: [
      "The Light is not a metaphor for happiness. It is not positivity, or gratitude journals, or the shallow brightness of a motivational poster.",
      "The Light is clarity. It is the state of seeing what matters and having the discipline to act on it. It is the burning away of everything that does not serve your purpose.",
      "It has always been there. Beneath the noise, beneath the comfort, beneath the fog — the Light waits. It does not chase you. It does not plead. It simply remains, steady and patient, for the moment you choose to return.",
      "Returning is not easy. It was never meant to be. The path back demands honesty that cuts, discipline that holds when motivation evaporates, and service that asks nothing in return.",
    ],
    quote: "The Light does not comfort. It reveals. And what it reveals requires courage to face.",
  },
  {
    label: "On Returning",
    title: "This Is the Act",
    paragraphs: [
      "Returning is not a one-time event. It is not a conversion, a breakthrough, or a peak experience. It is a daily practice — the deliberate choice to turn toward clarity when every instinct says to stay comfortable.",
      "The Returned are not perfect. They are not enlightened. They are builders and thinkers who have made a simple covenant: when they drift, they return. When the fog settles, they light it on fire.",
      "This is not self-improvement. Self-improvement assumes you are broken. You are not broken. You are asleep. And The Crossing is how you wake up.",
      "We do not return alone. The Circle holds us — not with comfort, but with accountability. Not with encouragement, but with truth. One who lets you drift is no companion at all.",
    ],
    quote: "You were not made for comfort. You were made for something that matters.",
  },
];

export default function ManifestoPage() {
  return (
    <>
      <NavBar />

      <PageHero
        eyebrow="The Manifesto"
        title="Why We Return"
        subtitle="A declaration for those who have felt the fog and chosen to burn through it."
      />

      {/* Sections */}
      {sections.map((section, i) => (
        <section key={section.label} className="px-6 py-20">
          <div className="mx-auto max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-8 block font-cinzel text-[9px] font-normal uppercase tracking-[0.4em] text-parchment2"
            >
              {section.label}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-10 font-cinzel text-3xl font-semibold text-parchment md:text-4xl"
            >
              {section.title}
            </motion.h2>

            <div className="space-y-6">
              {section.paragraphs.map((p, j) => (
                <motion.p
                  key={j}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: j * 0.1 }}
                  className="font-cormorant text-lg font-normal italic leading-[1.9] text-parchment"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 border-l-2 border-ember pl-6"
            >
              <p className="font-cormorant text-xl font-semibold leading-relaxed text-parchment">
                {section.quote}
              </p>
            </motion.blockquote>
          </div>

          {/* Divider between sections */}
          {i < sections.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="mx-auto mt-20 h-px w-16 bg-fog"
            />
          )}
        </section>
      ))}

      {/* Covenant Block */}
      <CovenantBlock />

      {/* Closing */}
      <section className="px-6 py-24 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl font-cormorant text-xl font-normal italic leading-relaxed text-parchment"
        >
          The Circle waits. Not with open arms — with open eyes.
          <br />
          If you are ready, begin The Crossing.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <a
            href="/crossing"
            className="inline-block min-h-[44px] border border-light/60 px-8 py-3 font-cinzel text-[11px] font-semibold uppercase tracking-[0.25em] text-light transition-all duration-300 hover:border-light hover:bg-light/10"
          >
            Begin The Crossing
          </a>
        </motion.div>
      </section>
    </>
  );
}
