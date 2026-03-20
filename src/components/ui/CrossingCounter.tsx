"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createSupabaseBrowser } from "@/lib/db/supabase-client";

export default function CrossingCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowser();
    supabase
      .from("crossings")
      .select("id", { count: "exact", head: true })
      .then(({ count: c }) => {
        setCount(c ?? 0);
      });
  }, []);

  if (count === null || count === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-12 text-center"
    >
      <p className="font-cinzel text-[10px] font-normal uppercase tracking-[0.4em] text-parchment2">
        <span className="text-light">{count.toLocaleString()}</span>{" "}
        {count === 1 ? "has" : "have"} Returned
      </p>
    </motion.div>
  );
}
