import Link from "next/link";
import Mark from "./Mark";

const navLinks = [
  { href: "/manifesto", label: "Manifesto" },
  { href: "/books", label: "The Books" },
  { href: "/circle", label: "The Circle" },
  { href: "/crossing", label: "The Crossing" },
];

export default function Footer() {
  return (
    <footer className="border-t border-fog/30 bg-stone px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
        {/* Mark */}
        <Mark size={32} />

        {/* Tagline */}
        <div className="text-center">
          <p className="font-cormorant text-lg font-light italic text-parchment2">
            Light over Fog.
          </p>
          <p className="mt-1 font-cinzel text-sm font-semibold text-light">
            I return.
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-cinzel text-[9px] uppercase tracking-[0.3em] text-parchment2 transition-colors duration-300 hover:text-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="font-cinzel text-[8px] uppercase tracking-[0.3em] text-fog">
          &copy; 2026 The Returned
        </p>
      </div>
    </footer>
  );
}
