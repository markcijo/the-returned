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
    <div className="flex items-center gap-4 border-b border-fog/30 pb-8 sm:gap-6">
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
        {daysSinceCrossing != null && (
          <p className="mt-1 font-cinzel text-[10px] uppercase tracking-[0.3em] text-ember">
            Day {daysSinceCrossing} of Returning
          </p>
        )}
      </div>
    </div>
  );
}
