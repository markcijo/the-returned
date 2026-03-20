"use client";

import { useEffect, useState } from "react";

interface SummaryData {
  nightWatchCount: number;
  checkinCount: number;
  pillarAverage: number;
  chaptersRead: number;
  fastsCompleted: number;
}

export default function WeeklySummary() {
  const [data, setData] = useState<SummaryData | null>(null);

  useEffect(() => {
    async function load() {
      const [nw, ci, pl, rp, fl] = await Promise.all([
        fetch("/api/night-watch").then((r) => r.json()),
        fetch("/api/checkin").then((r) => r.json()),
        fetch("/api/pillar-log").then((r) => r.json()),
        fetch("/api/reading-progress").then((r) => r.json()),
        fetch("/api/fast-log").then((r) => r.json()),
      ]);

      // Count items from the last 7 days
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weekAgoStr = weekAgo.toISOString().split("T")[0];

      const nightWatchEntries = (nw.data ?? []).filter(
        (e: { date: string }) => e.date >= weekAgoStr
      );
      const checkinEntries = (ci.data ?? []).filter(
        (e: { created_at: string }) => e.created_at >= weekAgo.toISOString()
      );
      const pillarEntries: { rating: number; date: string }[] = (
        pl.data ?? []
      ).filter((e: { date: string }) => e.date >= weekAgoStr);
      const fastEntries = (fl.data ?? []).filter(
        (e: { date: string; completed: boolean }) =>
          e.date >= weekAgoStr && e.completed
      );

      const pillarAvg =
        pillarEntries.length > 0
          ? pillarEntries.reduce((sum, e) => sum + e.rating, 0) /
            pillarEntries.length
          : 0;

      setData({
        nightWatchCount: nightWatchEntries.length,
        checkinCount: checkinEntries.length,
        pillarAverage: Math.round(pillarAvg * 10) / 10,
        chaptersRead: (rp.data ?? []).length,
        fastsCompleted: fastEntries.length,
      });
    }

    load();
  }, []);

  if (!data) return null;

  const stats = [
    { label: "Nights Watched", value: data.nightWatchCount },
    { label: "Check-ins", value: data.checkinCount },
    { label: "Seven Ways Avg", value: data.pillarAverage || "—" },
    { label: "Fasts Completed", value: data.fastsCompleted },
  ];

  return (
    <div className="border border-fog/30 bg-stone2 p-5 sm:p-8">
      <span className="mb-6 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-parchment2">
        This Week
      </span>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-cinzel text-xl font-semibold text-parchment">
              {stat.value}
            </p>
            <p className="mt-1 font-cinzel text-[8px] uppercase tracking-[0.3em] text-parchment2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {data.chaptersRead > 0 && (
        <p className="mt-5 text-center font-cormorant text-sm font-normal italic text-parchment2">
          {data.chaptersRead} chapter{data.chaptersRead !== 1 ? "s" : ""} read
          total
        </p>
      )}
    </div>
  );
}
