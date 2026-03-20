"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/components/ui/NavBar";
import PageHero from "@/components/ui/PageHero";
import Footer from "@/components/ui/Footer";
import PageTransition from "@/components/ui/PageTransition";

const roles = [
  {
    number: "I",
    name: "Keeper of Silence",
    description: "Who guards stillness, and restores the mind of the Circle.",
    detail:
      "The Keeper of Silence opens and closes each gathering with a period of intentional quiet. They ensure the Circle does not become noise — that every voice is heard, and that reflection precedes reaction. In a world addicted to response, this role holds space for thought.",
    practice:
      "Begin each Circle with 2 minutes of shared silence. End with 1 minute. Between speakers, allow a breath before the next voice rises.",
    quote: "Stillness is not emptiness. It is the room where clarity lives.",
  },
  {
    number: "II",
    name: "Keeper of the Word",
    description: "Who guards truth, and corrects false speech gently.",
    detail:
      "The Keeper of the Word ensures the Circle speaks with integrity. They gently redirect conversation when it drifts into gossip, exaggeration, or deflection. They model clean speech — truth delivered without cruelty, correction offered without pride.",
    practice:
      "If speech becomes careless, the Keeper may say: 'Let us return to what is true.' This is not policing — it is stewardship of the space.",
    quote: "Words are seeds. The Keeper tends the garden.",
  },
  {
    number: "III",
    name: "Keeper of Discipline",
    description: "Who trains the body, and teaches the Path of strength.",
    detail:
      "The Keeper of Discipline organises shared physical practice — movement, endurance, or challenge that reminds the Circle that the body is not separate from the spirit. This is not about performance or competition. It is about showing up.",
    practice:
      "Lead one shared physical practice per week. It can be as simple as a walk in silence, a cold plunge, or a group workout. The point is consistency, not intensity.",
    quote:
      "Discipline is not punishment. It is the shape devotion takes when motivation fades.",
  },
  {
    number: "IV",
    name: "Keeper of Service",
    description: "Who organizes giving, and remembers the weak.",
    detail:
      "The Keeper of Service ensures the Circle does not become self-absorbed. They identify needs — within the group and beyond it — and organize acts of giving. Service is how strength stays clean.",
    practice:
      "Each month, coordinate one act of service as a Circle. It can be small. What matters is that the Circle's energy flows outward, not only inward.",
    quote: "A Circle that only serves itself will shrink. A Circle that serves others will grow.",
  },
  {
    number: "V",
    name: "Keeper of Craft",
    description:
      "Who builds what is needed, and turns intention into structure.",
    detail:
      "The Keeper of Craft ensures that the Circle produces, not just reflects. They encourage members to build — projects, businesses, art, systems — and hold them accountable to their creative commitments. Returning is not just internal. It is expressed through what you make.",
    practice:
      "Each member shares one thing they are building. The Keeper tracks progress across weeks — not to judge, but to witness. Being seen in your craft is its own form of accountability.",
    quote:
      "You were not awakened to sit in stillness forever. You were awakened to build.",
  },
  {
    number: "VI",
    name: "Keeper of the Crossing",
    description:
      "Who prepares the new ones, and welcomes them through the ritual.",
    detail:
      "The Keeper of the Crossing is the first point of contact for those who wish to join. They explain the Way, answer questions honestly, and guide new members through The Crossing when they are ready. There is no pressure and no timeline — only readiness.",
    practice:
      "Meet with each prospective member individually before The Crossing. Answer their questions. Make clear that this is voluntary, that they can leave at any time, and that the community exists to support — never to control.",
    quote:
      "The door is always open. In both directions.",
  },
  {
    number: "VII",
    name: "Keeper of Returning",
    description:
      "Who restores the drifting, and calls them back without shame.",
    detail:
      "The Keeper of Returning watches for members who have gone quiet — who have stopped showing up, stopped checking in, stopped building. They reach out. Not with guilt, but with presence. Their role is the embodiment of the core promise: when you drift, someone notices.",
    practice:
      "If a member misses two gatherings, the Keeper reaches out privately. The message is always the same: 'You are missed. No shame. Return when you are ready.'",
    quote:
      "We do not chase. We do not shame. We simply leave the light on.",
  },
];

interface RoleModalProps {
  role: (typeof roles)[number];
  onClose: () => void;
}

function RoleModal({ role, onClose }: RoleModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-void/90 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto border border-fog/30 bg-stone2 p-6 sm:p-10"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <span className="mb-2 block font-cinzel text-[10px] font-normal tracking-[0.3em] text-ember">
              {role.number}
            </span>
            <h2 className="font-cinzel text-lg font-semibold tracking-[0.1em] text-parchment sm:text-xl">
              {role.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center text-parchment2 transition-colors hover:text-parchment"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="h-px w-full bg-fog/20" />

        <p className="mt-6 font-cormorant text-base font-normal italic leading-relaxed text-parchment">
          {role.detail}
        </p>

        <div className="mt-8">
          <span className="mb-3 block font-cinzel text-[9px] font-normal uppercase tracking-[0.4em] text-parchment2">
            The Practice
          </span>
          <p className="font-cormorant text-base font-normal leading-relaxed text-parchment">
            {role.practice}
          </p>
        </div>

        <div className="mt-8 border-l-2 border-ember pl-5">
          <p className="font-cormorant text-base font-semibold italic leading-relaxed text-parchment">
            &ldquo;{role.quote}&rdquo;
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-8 min-h-[44px] w-full border border-fog/30 py-3 font-cinzel text-[10px] uppercase tracking-[0.25em] text-parchment2 transition-all hover:border-ember hover:text-parchment"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function CirclePage() {
  const [selectedRole, setSelectedRole] = useState<
    (typeof roles)[number] | null
  >(null);

  return (
    <>
      <NavBar />

      <PageTransition>
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
              <motion.button
                key={role.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setSelectedRole(role)}
                className="group border border-fog/30 bg-stone2 p-5 text-left transition-all duration-300 hover:border-ember/60 sm:p-8"
              >
                <span className="mb-3 block font-cinzel text-[10px] font-normal tracking-[0.3em] text-ember">
                  {role.number}
                </span>
                <h3 className="mb-3 font-cinzel text-sm font-semibold tracking-[0.1em] text-parchment transition-colors group-hover:text-light">
                  {role.name}
                </h3>
                <p className="font-cormorant text-base font-normal italic leading-relaxed text-parchment">
                  {role.description}
                </p>
                <span className="mt-4 block font-cinzel text-[8px] uppercase tracking-[0.3em] text-fog transition-colors group-hover:text-parchment2">
                  Tap to learn more
                </span>
              </motion.button>
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
              className="mb-6 font-cormorant text-xl font-normal italic leading-relaxed text-parchment"
            >
              Once each week, the Circle gathers. Not for performance — for
              honest reflection.
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
                <p className="mt-2 font-cormorant text-base font-normal italic text-parchment2">
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
                <p className="mt-2 font-cormorant text-base font-normal italic text-parchment2">
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
            className="mb-10 font-cormorant text-xl font-normal italic text-parchment"
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
              className="inline-block min-h-[44px] border border-light/60 px-8 py-3 font-cinzel text-[11px] font-semibold uppercase tracking-[0.25em] text-light transition-all duration-300 hover:border-light hover:bg-light/10"
            >
              Begin The Crossing
            </a>
          </motion.div>
        </section>

        <Footer />
      </PageTransition>

      {/* Role Detail Modal */}
      <AnimatePresence>
        {selectedRole && (
          <RoleModal
            role={selectedRole}
            onClose={() => setSelectedRole(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
