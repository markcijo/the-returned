"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function WaitlistCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="border-y border-fog/30 bg-stone px-6 py-24">
      <div className="mx-auto max-w-lg text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 block font-cinzel text-[9px] font-normal uppercase tracking-[0.4em] text-parchment2"
        >
          Not Ready to Cross?
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-4 font-cinzel text-xl font-semibold text-parchment sm:text-2xl"
        >
          Receive the First Chapter
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-10 font-cormorant text-base font-normal italic text-parchment"
        >
          Enter your email and we will send you the opening of
          The Book of Returning. No spam. No fog.
        </motion.p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-cormorant text-lg font-semibold text-light">
              The Light is on its way.
            </p>
            <p className="mt-2 font-cormorant text-sm font-normal italic text-parchment2">
              Check your inbox.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="flex-1 border border-fog/50 bg-stone2 px-5 py-3 font-cormorant text-base text-parchment outline-none transition-colors placeholder:text-fog focus:border-ember"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="min-h-[44px] border border-light/60 px-8 py-3 font-cinzel text-[11px] font-semibold uppercase tracking-[0.25em] text-light transition-all duration-300 hover:border-light hover:bg-light/10 disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Send"}
            </button>
          </motion.form>
        )}

        {status === "error" && (
          <p className="mt-4 font-cormorant text-sm text-red-400">
            Something went wrong. Try again.
          </p>
        )}
      </div>
    </section>
  );
}
