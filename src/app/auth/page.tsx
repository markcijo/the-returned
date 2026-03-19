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

  async function handleGoogle() {
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
      },
    });
    if (err) {
      setError(err.message);
      setLoading(false);
    }
  }

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 w-full max-w-sm"
        >
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-fog/30" />
            <span className="font-cinzel text-[9px] uppercase tracking-[0.3em] text-parchment2">
              or
            </span>
            <div className="h-px flex-1 bg-fog/30" />
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="mt-6 flex w-full min-h-[44px] items-center justify-center gap-3 border border-fog/50 bg-stone py-3 font-cinzel text-[11px] font-normal uppercase tracking-[0.2em] text-parchment transition-all duration-300 hover:border-ember hover:bg-stone2 disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </motion.div>

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
