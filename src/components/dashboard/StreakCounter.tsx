"use client";

import { useEffect, useState } from "react";

export default function StreakCounter() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetch("/api/night-watch")
      .then((r) => r.json())
      .then((d) => {
        const entries: { date: string }[] = d.data ?? [];
        if (entries.length === 0) {
          setStreak(0);
          return;
        }

        // Sort dates descending
        const dates = entries
          .map((e) => e.date)
          .sort((a, b) => b.localeCompare(a));

        // Count consecutive days from today backward
        const today = new Date();
        let count = 0;

        for (let i = 0; i < 365; i++) {
          const checkDate = new Date(today);
          checkDate.setDate(today.getDate() - i);
          const dateStr = checkDate.toISOString().split("T")[0];

          if (dates.includes(dateStr)) {
            count++;
          } else if (i > 0) {
            // Allow today to be missing (day not over yet)
            break;
          }
        }

        setStreak(count);
      });
  }, []);

  return (
    <div className="border border-fog/30 bg-stone2 p-5 sm:p-8">
      <span className="mb-4 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-parchment2">
        Night Watch Streak
      </span>

      <div className="flex items-baseline gap-3">
        <span className="font-cinzel text-3xl font-semibold text-light">
          {streak}
        </span>
        <span className="font-cormorant text-sm font-normal italic text-parchment2">
          {streak === 1 ? "consecutive night" : "consecutive nights"}
        </span>
      </div>

      {streak === 0 && (
        <p className="mt-3 font-cormorant text-sm font-normal italic text-parchment">
          Complete tonight&apos;s Night Watch to begin your streak.
        </p>
      )}

      {streak >= 7 && (
        <p className="mt-3 font-cormorant text-sm font-normal italic text-parchment">
          The Light holds. Keep returning.
        </p>
      )}
    </div>
  );
}
