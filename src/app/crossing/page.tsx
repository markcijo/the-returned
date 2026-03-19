"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SilenceStep from "@/components/crossing/SilenceStep";
import WaterStep from "@/components/crossing/WaterStep";
import WordStep from "@/components/crossing/WordStep";
import CrossingComplete from "@/components/crossing/CrossingComplete";

type Step = "silence" | "water" | "word" | "complete";

export default function CrossingPage() {
  const [step, setStep] = useState<Step>("silence");

  return (
    <div className="min-h-[100dvh] bg-void">
      <AnimatePresence mode="wait">
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
