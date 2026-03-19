import { Verse } from "@/lib/types";

interface VerseBlockProps {
  verse: Verse;
}

export default function VerseBlock({ verse }: VerseBlockProps) {
  if (verse.type === "scripture") {
    return (
      <p className="my-6 font-cormorant text-lg font-semibold leading-[2] text-parchment md:text-xl">
        {verse.text}
      </p>
    );
  }

  return (
    <p className="my-4 font-cormorant text-lg font-light italic leading-[1.9] text-parchment2 md:text-xl">
      {verse.text}
    </p>
  );
}
