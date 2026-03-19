"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0 to 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-fog/30">
      <motion.div
        className="h-full bg-light"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}
