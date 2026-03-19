"use client";

import Link from "next/link";
import Mark from "./Mark";

const links = [
  { href: "/manifesto", label: "Manifesto" },
  { href: "/books", label: "The Books" },
  { href: "/circle", label: "The Circle" },
  { href: "/crossing", label: "Enter" },
];

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-fog/40 bg-void/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Mark size={32} />
          <span className="font-cinzel text-sm font-semibold tracking-[0.15em] text-parchment">
            THE RETURNED
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-cinzel text-[10px] font-normal uppercase tracking-[0.3em] text-parchment2 transition-colors duration-300 hover:text-light"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
