"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { createSupabaseBrowser } from "@/lib/db/supabase-client";
import NavBar from "@/components/ui/NavBar";
import Mark from "@/components/ui/Mark";

type Mode = "signin" | "signup" | "magic";

export default function AuthPage() {
  return (
    <Suspense>
      <AuthForm />
    </Suspense>
  );
}

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const supabase = createSupabaseBrowser();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (mode === "magic") {
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
        },
      });
      if (err) {
        setError(err.message);
      } else {
        setMessage("Check your email for the magic link.");
      }
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      const { error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
        },
      });
      if (err) {
        setError(err.message);
      } else {
        setMessage("Check your email to confirm your account.");
      }
      setLoading(false);
      return;
    }

    // Sign in
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (err) {
      setError(err.message);
    } else {
      router.push(redirect);
    }
    setLoading(false);
  }

  return (
    <>
      <NavBar />
      <section className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Mark size={60} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 font-cinzel text-2xl font-semibold text-parchment"
        >
          {mode === "signup" ? "Join The Returned" : "Welcome Back"}
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-sm space-y-5"
        >
          <div>
            <label className="mb-2 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-parchment2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-fog/50 bg-stone px-4 py-3 font-cormorant text-base text-parchment outline-none transition-colors focus:border-ember"
              placeholder="your@email.com"
            />
          </div>

          {mode !== "magic" && (
            <div>
              <label className="mb-2 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-parchment2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border border-fog/50 bg-stone px-4 py-3 font-cormorant text-base text-parchment outline-none transition-colors focus:border-ember"
                placeholder="At least 6 characters"
              />
            </div>
          )}

          {error && (
            <p className="font-cormorant text-sm text-red-400">{error}</p>
          )}
          {message && (
            <p className="font-cormorant text-sm text-light">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[44px] border border-light/60 py-3 font-cinzel text-[11px] font-semibold uppercase tracking-[0.25em] text-light transition-all duration-300 hover:border-light hover:bg-light/10 disabled:opacity-50"
          >
            {loading
              ? "..."
              : mode === "magic"
                ? "Send Magic Link"
                : mode === "signup"
                  ? "Create Account"
                  : "Sign In"}
          </button>
        </motion.form>

        <div className="mt-8 flex flex-col items-center gap-3">
          {mode === "signin" && (
            <>
              <button
                onClick={() => setMode("magic")}
                className="min-h-[44px] py-2 font-cormorant text-sm italic text-parchment2 transition-colors hover:text-parchment"
              >
                Use magic link instead
              </button>
              <button
                onClick={() => setMode("signup")}
                className="min-h-[44px] py-2 font-cormorant text-sm italic text-parchment2 transition-colors hover:text-parchment"
              >
                No account? Sign up
              </button>
            </>
          )}
          {mode === "signup" && (
            <button
              onClick={() => setMode("signin")}
              className="font-cormorant text-sm italic text-parchment2 transition-colors hover:text-parchment"
            >
              Already have an account? Sign in
            </button>
          )}
          {mode === "magic" && (
            <button
              onClick={() => setMode("signin")}
              className="font-cormorant text-sm italic text-parchment2 transition-colors hover:text-parchment"
            >
              Use password instead
            </button>
          )}
        </div>
      </section>
    </>
  );
}
