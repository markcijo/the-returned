"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/db/supabase-client";
import Mark from "./Mark";

const publicLinks = [
  { href: "/manifesto", label: "Manifesto" },
  { href: "/books", label: "The Books" },
  { href: "/circle", label: "The Circle" },
];

export default function NavBar() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseBrowser();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u ? { email: u.email ?? undefined } : null);
    });
  }, [supabase.auth]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  }

  const authLink = user
    ? { href: "/dashboard", label: "Dashboard" }
    : { href: "/crossing", label: "Enter" };

  const allLinks = [...publicLinks, authLink];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-fog/40 bg-void/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Mark size={32} />
          <span className="font-cinzel text-sm font-semibold tracking-[0.15em] text-parchment">
            THE RETURNED
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-cinzel text-[10px] font-normal uppercase tracking-[0.3em] text-parchment2 transition-colors duration-300 hover:text-light"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <button
              onClick={handleSignOut}
              className="font-cinzel text-[10px] font-normal uppercase tracking-[0.3em] text-parchment2 transition-colors duration-300 hover:text-light"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-5 bg-parchment transition-all duration-300 ${mobileOpen ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-parchment transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-parchment transition-all duration-300 ${mobileOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-fog/20 bg-void px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block min-h-[44px] py-2 font-cinzel text-[11px] font-normal uppercase tracking-[0.3em] text-parchment2 transition-colors duration-300 hover:text-light"
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={handleSignOut}
                className="min-h-[44px] py-2 text-left font-cinzel text-[11px] font-normal uppercase tracking-[0.3em] text-parchment2 transition-colors duration-300 hover:text-light"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
