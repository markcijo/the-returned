"use client";

import { useState, useEffect } from "react";

interface CheckinEntry {
  id: string;
  week_of: string;
  drift_text: string;
  return_text: string;
  created_at: string;
}

export default function WeeklyCheckin() {
  const [drift, setDrift] = useState("");
  const [returnText, setReturnText] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<CheckinEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetch("/api/checkin")
      .then((r) => r.json())
      .then((d) => setHistory(d.data ?? []));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!drift.trim() || !returnText.trim()) return;
    setLoading(true);

    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const week_of = weekStart.toISOString().split("T")[0];

    const res = await fetch("/api/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        week_of,
        drift_text: drift,
        return_text: returnText,
      }),
    });

    if (res.ok) {
      const { data } = await res.json();
      setHistory((prev) => [data, ...prev]);
      setDrift("");
      setReturnText("");
    }
    setLoading(false);
  }

  return (
    <div className="border border-fog/30 bg-stone2 p-8">
      <span className="mb-6 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-parchment2">
        Weekly Check-In
      </span>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block font-cormorant text-base font-semibold text-parchment">
            Where did you drift?
          </label>
          <textarea
            value={drift}
            onChange={(e) => setDrift(e.target.value)}
            rows={3}
            className="w-full resize-none border border-fog/50 bg-stone px-4 py-3 font-cormorant text-base text-parchment outline-none placeholder:text-fog focus:border-ember"
            placeholder="Be honest..."
          />
        </div>
        <div>
          <label className="mb-2 block font-cormorant text-base font-semibold text-parchment">
            Where did you return?
          </label>
          <textarea
            value={returnText}
            onChange={(e) => setReturnText(e.target.value)}
            rows={3}
            className="w-full resize-none border border-fog/50 bg-stone px-4 py-3 font-cormorant text-base text-parchment outline-none placeholder:text-fog focus:border-ember"
            placeholder="Name the return..."
          />
        </div>
        <button
          type="submit"
          disabled={loading || !drift.trim() || !returnText.trim()}
          className="border border-ember/60 px-6 py-2 font-cinzel text-[10px] uppercase tracking-[0.25em] text-parchment2 transition-all hover:border-ember hover:text-parchment disabled:opacity-30"
        >
          {loading ? "..." : "Submit"}
        </button>
      </form>

      {history.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="font-cormorant text-sm font-normal italic text-parchment2 transition-colors hover:text-parchment"
          >
            {showHistory ? "Hide" : "Show"} previous ({history.length})
          </button>
          {showHistory && (
            <div className="mt-4 space-y-4">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="border-l-2 border-fog/30 pl-4"
                >
                  <p className="font-cinzel text-[9px] uppercase tracking-[0.3em] text-ember">
                    Week of{" "}
                    {new Date(entry.week_of).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="mt-1 font-cormorant text-sm text-parchment2">
                    <span className="font-semibold text-parchment">Drift:</span>{" "}
                    {entry.drift_text}
                  </p>
                  <p className="font-cormorant text-sm text-parchment2">
                    <span className="font-semibold text-parchment">Return:</span>{" "}
                    {entry.return_text}
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
