"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Mark from "@/components/ui/Mark";

const MILESTONES = [1, 7, 14, 30, 60, 90, 100, 180, 365];

interface MilestoneCardProps {
  daysSinceCrossing: number;
  crossingDate: string;
}

export default function MilestoneCard({
  daysSinceCrossing,
  crossingDate,
}: MilestoneCardProps) {
  const [downloading, setDownloading] = useState(false);

  // Find the most recent milestone hit
  const currentMilestone = MILESTONES.filter((m) => daysSinceCrossing >= m).pop();
  const nextMilestone = MILESTONES.find((m) => m > daysSinceCrossing);

  const downloadCard = useCallback(async () => {
    if (!currentMilestone) return;
    setDownloading(true);

    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#0c0b09";
    ctx.fillRect(0, 0, 800, 800);

    // Border
    ctx.strokeStyle = "#3a3830";
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 720, 720);

    const cx = 400;

    // The Mark
    ctx.strokeStyle = "#c9b97a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, 200, 50, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, 160);
    ctx.lineTo(cx, 240);
    ctx.stroke();

    // Day count
    ctx.fillStyle = "#c9b97a";
    ctx.font = "600 72px Cinzel, serif";
    ctx.textAlign = "center";
    ctx.fillText(`Day ${currentMilestone}`, cx, 350);

    // "of Returning"
    ctx.fillStyle = "#e8e3d8";
    ctx.font = "400 18px Cinzel, serif";
    ctx.fillText("OF RETURNING", cx, 390);

    // Divider
    ctx.strokeStyle = "#7a6a4f";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 50, 430);
    ctx.lineTo(cx + 50, 430);
    ctx.stroke();

    // "I return."
    ctx.fillStyle = "#e8e3d8";
    ctx.font = "italic 24px Cormorant Garamond, serif";
    ctx.fillText("I return.", cx, 480);

    // Crossing date
    ctx.fillStyle = "#c9bfa8";
    ctx.font = "400 12px Cinzel, serif";
    const formattedDate = new Date(crossingDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    ctx.fillText(`Returned since ${formattedDate}`, cx, 530);

    // "The Returned"
    ctx.fillStyle = "#3a3830";
    ctx.font = "400 11px Cinzel, serif";
    ctx.fillText("THE RETURNED", cx, 700);

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `returned-day-${currentMilestone}.png`;
    a.click();
    setDownloading(false);
  }, [currentMilestone, crossingDate]);

  if (!currentMilestone) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="border border-light/20 bg-stone2 p-5 sm:p-8"
    >
      <span className="mb-4 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-parchment2">
        Milestone Reached
      </span>

      <div className="flex items-center gap-4">
        <Mark size={32} />
        <div>
          <p className="font-cinzel text-2xl font-semibold text-light">
            Day {currentMilestone}
          </p>
          <p className="font-cormorant text-sm font-normal italic text-parchment2">
            of Returning
          </p>
        </div>
      </div>

      {nextMilestone && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between">
            <span className="font-cinzel text-[9px] tracking-[0.2em] text-fog">
              Day {currentMilestone}
            </span>
            <span className="font-cinzel text-[9px] tracking-[0.2em] text-fog">
              Day {nextMilestone}
            </span>
          </div>
          <div className="h-1 bg-fog/30">
            <div
              className="h-full bg-light/40 transition-all"
              style={{
                width: `${((daysSinceCrossing - currentMilestone) / (nextMilestone - currentMilestone)) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      <button
        onClick={downloadCard}
        disabled={downloading}
        className="mt-5 min-h-[44px] border border-ember/40 px-5 py-2 font-cinzel text-[9px] uppercase tracking-[0.2em] text-parchment2 transition-all hover:border-ember hover:text-parchment disabled:opacity-50"
      >
        {downloading ? "..." : "Download milestone card"}
      </button>
    </motion.div>
  );
}
