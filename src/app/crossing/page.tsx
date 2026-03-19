"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Mark from "@/components/ui/Mark";
import SilenceStep from "@/components/crossing/SilenceStep";
import WaterStep from "@/components/crossing/WaterStep";
import WordStep from "@/components/crossing/WordStep";
import CrossingComplete from "@/components/crossing/CrossingComplete";
import AmbientAudio from "@/components/crossing/AmbientAudio";

type Step = "intro" | "silence" | "water" | "word" | "complete";

export default function CrossingPage() {
  const [step, setStep] = useState<Step>("intro");

  return (
    <div className="min-h-[100dvh] bg-void">
      {/* Ambient audio toggle — visible during the ritual */}
      {step !== "intro" && step !== "complete" && <AmbientAudio />}

      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[100dvh] flex-col items-center justify-center px-6 py-12"
          >
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
              transition={{ duration: 0.8, delay: 1.8 }}
              className="mt-10 font-cinzel text-[10px] font-normal uppercase tracking-[0.4em] text-parchment2"
            >
              The Crossing
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="mt-6 text-center font-cinzel text-2xl font-semibold text-parchment sm:text-3xl"
            >
              Before You Begin
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.8 }}
              className="mt-10 max-w-md space-y-6 text-center"
            >
              <p className="font-cormorant text-lg font-normal italic leading-relaxed text-parchment">
                The Crossing is a private ritual of return. It has three steps,
                and it takes about two minutes.
              </p>

              <div className="space-y-4 py-4">
                <div className="flex items-start gap-4 text-left">
                  <span className="mt-1 font-cinzel text-[10px] tracking-[0.3em] text-ember">
                    I
                  </span>
                  <div>
                    <p className="font-cinzel text-xs font-semibold tracking-[0.1em] text-parchment">
                      Silence
                    </p>
                    <p className="mt-1 font-cormorant text-sm font-normal italic text-parchment2">
                      60 seconds of stillness. Face what you have been avoiding.
                    </p>
                  </div>
                </div>

                <div className="h-px w-full bg-fog/20" />

                <div className="flex items-start gap-4 text-left">
                  <span className="mt-1 font-cinzel text-[10px] tracking-[0.3em] text-ember">
                    II
                  </span>
                  <div>
                    <p className="font-cinzel text-xs font-semibold tracking-[0.1em] text-parchment">
                      Water
                    </p>
                    <p className="mt-1 font-cormorant text-sm font-normal italic text-parchment2">
                      Name what you must release. This is private — it will not
                      be saved.
                    </p>
                  </div>
                </div>

                <div className="h-px w-full bg-fog/20" />

                <div className="flex items-start gap-4 text-left">
                  <span className="mt-1 font-cinzel text-[10px] tracking-[0.3em] text-ember">
                    III
                  </span>
                  <div>
                    <p className="font-cinzel text-xs font-semibold tracking-[0.1em] text-parchment">
                      Word
                    </p>
                    <p className="mt-1 font-cormorant text-sm font-normal italic text-parchment2">
                      Speak your vow. When you are ready, press I RETURN.
                    </p>
                  </div>
                </div>
              </div>

              <p className="font-cormorant text-sm font-normal italic text-parchment2">
                Find a quiet place. This is between you and the version of
                yourself that has been waiting.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.4 }}
              onClick={() => setStep("silence")}
              className="mt-10 min-h-[44px] border border-light/60 px-10 py-3 font-cinzel text-[11px] font-semibold uppercase tracking-[0.25em] text-light transition-all duration-300 hover:border-light hover:bg-light/10"
            >
              Begin
            </motion.button>
          </motion.div>
        )}

        {step === "silence" && (
          <SilenceStep key="silence" onComplete={() => setStep("water")} />
        )}
        {step === "water" && (
          <WaterStep key="water" onComplete={() => setStep("word")} />
        )}
        {step === "word" && (
          <WordStep key="word" onComplete={() => setStep("complete")} />
        )}
        {step === "complete" && <CrossingComplete key="complete" />}
      </AnimatePresence>
    </div>
  );
}
