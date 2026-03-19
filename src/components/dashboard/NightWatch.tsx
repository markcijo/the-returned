"use client";

import { useState, useEffect } from "react";

interface NightWatchEntry {
  id: string;
  date: string;
  drifted: string;
  repair: string;
  light_gave: string;
}

export default function NightWatch() {
  const [drifted, setDrifted] = useState("");
  const [repair, setRepair] = useState("");
  const [lightGave, setLightGave] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<NightWatchEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetch("/api/night-watch")
      .then((r) => r.json())
      .then((d) => setHistory(d.data ?? []));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!drifted.trim() || !repair.trim() || !lightGave.trim()) return;
    setLoading(true);

    const date = new Date().toISOString().split("T")[0];

    const res = await fetch("/api/night-watch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        drifted,
        repair,
        light_gave: lightGave,
      }),
    });

    if (res.ok) {
      const { data } = await res.json();
      setHistory((prev) => [data, ...prev]);
      setDrifted("");
      setRepair("");
      setLightGave("");
    }
    setLoading(false);
  }

  return (
    <div className="border border-fog/30 bg-stone2 p-5 sm:p-8">
      <span className="mb-6 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-parchment2">
        Night Watch
      </span>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block font-cormorant text-base font-semibold text-parchment">
            Where did I drift?
          </label>
          <textarea
            value={drifted}
            onChange={(e) => setDrifted(e.target.value)}
            rows={2}
            className="w-full resize-none border border-fog/50 bg-stone px-4 py-3 font-cormorant text-base text-parchment outline-none placeholder:text-fog focus:border-ember"
          />
        </div>
        <div>
          <label className="mb-2 block font-cormorant text-base font-semibold text-parchment">
            What must I repair?
          </label>
          <textarea
            value={repair}
            onChange={(e) => setRepair(e.target.value)}
            rows={2}
            className="w-full resize-none border border-fog/50 bg-stone px-4 py-3 font-cormorant text-base text-parchment outline-none placeholder:text-fog focus:border-ember"
          />
        </div>
        <div>
          <label className="mb-2 block font-cormorant text-base font-semibold text-parchment">
            What did the Light give me?
          </label>
          <textarea
            value={lightGave}
            onChange={(e) => setLightGave(e.target.value)}
            rows={2}
            className="w-full resize-none border border-fog/50 bg-stone px-4 py-3 font-cormorant text-base text-parchment outline-none placeholder:text-fog focus:border-ember"
          />
        </div>
        <button
          type="submit"
          disabled={
            loading ||
            !drifted.trim() ||
            !repair.trim() ||
            !lightGave.trim()
          }
          className="min-h-[44px] border border-ember/60 px-6 py-2 font-cinzel text-[10px] uppercase tracking-[0.25em] text-parchment2 transition-all hover:border-ember hover:text-parchment disabled:opacity-30"
        >
          {loading ? "..." : "I Return"}
        </button>
      </form>

      {history.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="min-h-[44px] py-2 font-cormorant text-sm font-normal italic text-parchment2 transition-colors hover:text-parchment"
          >
            {showHistory ? "Hide" : "Show"} previous ({history.length})
          </button>
          {showHistory && (
            <div className="mt-4 space-y-4">
              {history.map((entry) => (
                <div key={entry.id} className="border-l-2 border-fog/30 pl-4">
                  <p className="font-cinzel text-[9px] uppercase tracking-[0.3em] text-ember">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="mt-1 font-cormorant text-sm text-parchment2">
                    {entry.drifted}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
