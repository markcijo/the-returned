"use client";

import Mark from "@/components/ui/Mark";

interface MemberHeaderProps {
  email: string;
  crossingDate: string | null;
}

export default function MemberHeader({
  email,
  crossingDate,
}: MemberHeaderProps) {
  const daysSinceCrossing = crossingDate
    ? Math.floor(
        (Date.now() - new Date(crossingDate).getTime()) / (1000 * 60 * 60 * 24)
      )
    : null;

  const formattedDate = crossingDate
    ? new Date(crossingDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="border-b border-fog/30 pb-8">
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="shrink-0">
          <Mark size={48} />
        </div>
        <div className="min-w-0">
          <p className="truncate font-cinzel text-sm font-semibold tracking-[0.1em] text-parchment sm:text-lg">
            {email}
          </p>
          {formattedDate && (
            <p className="mt-1 font-cormorant text-sm font-normal italic text-parchment2">
              Returned since {formattedDate}
            </p>
          )}
        </div>
      </div>

      {/* Journey stats */}
      {daysSinceCrossing != null && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="border border-fog/20 bg-stone2 px-4 py-5 text-center">
            <p className="font-cinzel text-2xl font-semibold text-light sm:text-3xl">
              {daysSinceCrossing}
            </p>
            <p className="mt-1 font-cinzel text-[8px] uppercase tracking-[0.3em] text-parchment2">
              Days Returned
            </p>
          </div>
          <div className="border border-fog/20 bg-stone2 px-4 py-5 text-center">
            <p className="font-cinzel text-2xl font-semibold text-parchment sm:text-3xl">
              {Math.floor(daysSinceCrossing / 7)}
            </p>
            <p className="mt-1 font-cinzel text-[8px] uppercase tracking-[0.3em] text-parchment2">
              Weeks
            </p>
          </div>
          <div className="border border-fog/20 bg-stone2 px-4 py-5 text-center">
            <p className="font-cinzel text-2xl font-semibold text-light sm:text-3xl">
              {daysSinceCrossing >= 7 ? "Lit" : "—"}
            </p>
            <p className="mt-1 font-cinzel text-[8px] uppercase tracking-[0.3em] text-parchment2">
              {daysSinceCrossing >= 7 ? "The Light Holds" : "Kindling"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
