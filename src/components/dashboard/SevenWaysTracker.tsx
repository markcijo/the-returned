"use client";

import { useState, useEffect, useCallback } from "react";

const PILLARS = [
  "Truth",
  "Discipline",
  "Service",
  "Stillness",
  "Craft",
  "Word",
  "Returning",
];

interface PillarLog {
  pillar: number;
  date: string;
  rating: number;
}

export default function SevenWaysTracker() {
  const [logs, setLogs] = useState<PillarLog[]>([]);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetch("/api/pillar-log")
      .then((r) => r.json())
      .then((d) => setLogs(d.data ?? []));
  }, []);

  const getRating = useCallback(
    (pillar: number) => {
      const log = logs.find((l) => l.pillar === pillar && l.date === today);
      return log?.rating ?? 0;
    },
    [logs, today]
  );

  async function handleRate(pillar: number, rating: number) {
    const res = await fetch("/api/pillar-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: today, pillar, rating }),
    });

    if (res.ok) {
      setLogs((prev) => {
        const filtered = prev.filter(
          (l) => !(l.pillar === pillar && l.date === today)
        );
        return [...filtered, { pillar, date: today, rating }];
      });
    }
  }

  // Get last 7 days for the strip
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  return (
    <div className="border border-fog/30 bg-stone2 p-8">
      <span className="mb-6 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-parchment2">
        The Seven Ways
      </span>

      <div className="space-y-4">
        {PILLARS.map((name, i) => {
          const pillar = i + 1;
          const currentRating = getRating(pillar);

          return (
            <div key={name}>
              <div className="mb-2 flex items-center justify-between">
                <span className="font-cinzel text-xs font-semibold tracking-[0.1em] text-parchment">
                  {name}
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRate(pillar, r)}
                      className={`h-6 w-6 text-xs transition-colors ${
                        r <= currentRating
                          ? "bg-light/80 text-void"
                          : "bg-fog/30 text-parchment2 hover:bg-fog/50"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* 7-day strip */}
              <div className="flex gap-1">
                {last7Days.map((date) => {
                  const log = logs.find(
                    (l) => l.pillar === pillar && l.date === date
                  );
                  const level = log ? log.rating / 5 : 0;
                  return (
                    <div
                      key={date}
                      className="h-2 flex-1"
                      style={{
                        backgroundColor:
                          level > 0
                            ? `rgba(201, 185, 122, ${level})`
                            : "var(--fog)",
                        opacity: level > 0 ? 0.3 + level * 0.7 : 0.2,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
