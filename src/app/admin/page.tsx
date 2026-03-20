"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/ui/NavBar";

interface Stats {
  totalCrossings: number;
  totalCheckins: number;
  nightWatchEntries: number;
  chaptersRead: number;
  waitlistCount: number;
  activeThisWeek: number;
}

const statCards: { key: keyof Stats; label: string }[] = [
  { key: "totalCrossings", label: "Total Crossings" },
  { key: "activeThisWeek", label: "Active This Week" },
  { key: "waitlistCount", label: "Waitlist" },
  { key: "totalCheckins", label: "Total Check-ins" },
  { key: "chaptersRead", label: "Chapters Read" },
  { key: "nightWatchEntries", label: "Night Watch Entries" },
];

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => {
        if (res.status === 403) {
          router.push("/");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && !data.error) {
          setStats(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router]);

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-void px-6 pt-28 pb-20">
        <div className="mx-auto max-w-4xl">
          {/* Eyebrow */}
          <p className="font-cinzel text-[9px] font-normal uppercase tracking-[0.3em] text-parchment2">
            Command Center
          </p>

          {/* Heading */}
          <h1 className="mt-3 font-cinzel text-4xl font-semibold text-parchment">
            Admin
          </h1>

          {/* Stats Grid */}
          {loading ? (
            <div className="mt-12 text-center">
              <p className="font-cormorant text-lg italic text-parchment2">
                Loading...
              </p>
            </div>
          ) : stats ? (
            <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
              {statCards.map(({ key, label }) => (
                <div
                  key={key}
                  className="border border-fog/30 bg-stone2 p-6 text-center"
                >
                  <p className="font-cinzel text-3xl font-semibold text-light">
                    {stats[key] ?? "\u2014"}
                  </p>
                  <p className="mt-2 font-cinzel text-[9px] font-normal uppercase tracking-[0.3em] text-parchment2">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center">
              <p className="font-cormorant text-lg italic text-parchment2">
                Unable to load stats.
              </p>
            </div>
          )}

          {/* Footer note */}
          <p className="mt-10 text-center font-cormorant text-sm italic text-fog">
            Data refreshes on page load
          </p>
        </div>
      </main>
    </>
  );
}
