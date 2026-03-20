"use client";

import { useState, useEffect } from "react";

const FASTS = [
  { type: "mouth", label: "Fast of the Mouth", frequency: "Weekly" },
  { type: "noise", label: "Fast of Noise", frequency: "Weekly" },
  { type: "comfort", label: "Fast of Comfort", frequency: "Monthly" },
];

interface FastLog {
  fast_type: string;
  date: string;
  completed: boolean;
}

export default function FastLogger() {
  const [logs, setLogs] = useState<FastLog[]>([]);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetch("/api/fast-log")
      .then((r) => r.json())
      .then((d) => setLogs(d.data ?? []));
  }, []);

  function isCompletedToday(fastType: string) {
    return logs.some(
      (l) => l.fast_type === fastType && l.date === today && l.completed
    );
  }

  async function toggleFast(fastType: string) {
    const currentlyCompleted = isCompletedToday(fastType);

    const res = await fetch("/api/fast-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fast_type: fastType,
        date: today,
        completed: !currentlyCompleted,
      }),
    });

    if (res.ok) {
      setLogs((prev) => {
        const filtered = prev.filter(
          (l) => !(l.fast_type === fastType && l.date === today)
        );
        return [
          ...filtered,
          { fast_type: fastType, date: today, completed: !currentlyCompleted },
        ];
      });
    }
  }

  return (
    <div className="border border-fog/30 bg-stone2 p-5 sm:p-8">
      <span className="mb-6 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-parchment2">
        The Three Fasts
      </span>

      <div className="space-y-4">
        {FASTS.map((fast) => {
          const completed = isCompletedToday(fast.type);
          return (
            <button
              key={fast.type}
              onClick={() => toggleFast(fast.type)}
              className={`flex w-full items-center justify-between border px-5 py-4 transition-all ${
                completed
                  ? "border-light/40 bg-light/5"
                  : "border-fog/30 bg-stone hover:border-fog/50"
              }`}
            >
              <div className="text-left">
                <p className="font-cinzel text-xs font-semibold tracking-[0.1em] text-parchment">
                  {fast.label}
                </p>
                <p className="mt-1 font-cinzel text-[9px] uppercase tracking-[0.3em] text-parchment2">
                  {fast.frequency}
                </p>
              </div>
              <div
                className={`flex h-6 w-6 items-center justify-center border transition-colors ${
                  completed
                    ? "border-light bg-light text-void"
                    : "border-fog/50 text-transparent"
                }`}
              >
                {completed && "✓"}
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-4 font-cormorant text-sm font-normal italic text-parchment2">
        &ldquo;We fast to remain free.&rdquo;
      </p>

      <p className="mt-3 font-cormorant text-xs font-normal text-fog">
        Fasting is a voluntary spiritual practice. If you have a history of
        disordered eating or any health concerns, please consult a healthcare
        professional before participating.
      </p>
    </div>
  );
}
