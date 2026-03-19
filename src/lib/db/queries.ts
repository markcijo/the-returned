import { SupabaseClient } from "@supabase/supabase-js";

// --- Crossings ---

export async function createCrossing(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  return supabase
    .from("crossings")
    .insert({ user_id: user.id, crossed_at: new Date().toISOString() })
    .select()
    .single();
}

export async function getCrossing(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: null };

  return supabase
    .from("crossings")
    .select("*")
    .eq("user_id", user.id)
    .order("crossed_at", { ascending: false })
    .limit(1)
    .maybeSingle();
}

// --- Check-ins ---

export async function createCheckin(
  supabase: SupabaseClient,
  data: { week_of: string; drift_text: string; return_text: string }
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  return supabase
    .from("checkins")
    .insert({ user_id: user.id, ...data })
    .select()
    .single();
}

export async function getCheckins(supabase: SupabaseClient, limit = 10) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: [], error: null };

  return supabase
    .from("checkins")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);
}

// --- Night Watch ---

export async function createNightWatch(
  supabase: SupabaseClient,
  data: { date: string; drifted: string; repair: string; light_gave: string }
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  return supabase
    .from("night_watch")
    .insert({ user_id: user.id, ...data })
    .select()
    .single();
}

export async function getNightWatch(supabase: SupabaseClient, limit = 10) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: [], error: null };

  return supabase
    .from("night_watch")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .limit(limit);
}

// --- Pillar Logs ---

export async function logPillar(
  supabase: SupabaseClient,
  data: { date: string; pillar: number; rating: number }
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  return supabase
    .from("pillar_logs")
    .upsert(
      { user_id: user.id, ...data },
      { onConflict: "user_id,date,pillar" }
    )
    .select()
    .single();
}

export async function getPillarLogs(
  supabase: SupabaseClient,
  days = 7
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: [], error: null };

  const since = new Date();
  since.setDate(since.getDate() - days);

  return supabase
    .from("pillar_logs")
    .select("*")
    .eq("user_id", user.id)
    .gte("date", since.toISOString().split("T")[0])
    .order("date", { ascending: true });
}

// --- Fast Logs ---

export async function logFast(
  supabase: SupabaseClient,
  data: { fast_type: string; date: string; completed: boolean }
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  return supabase
    .from("fast_logs")
    .upsert(
      { user_id: user.id, ...data },
      { onConflict: "user_id,date,fast_type" }
    )
    .select()
    .single();
}

export async function getFastLogs(supabase: SupabaseClient, limit = 30) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: [], error: null };

  return supabase
    .from("fast_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .limit(limit);
}

// --- Reading Progress ---

export async function markChapterRead(
  supabase: SupabaseClient,
  data: { book: string; chapter: number }
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  return supabase
    .from("reading_progress")
    .upsert(
      {
        user_id: user.id,
        book: data.book,
        chapter: data.chapter,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,book,chapter" }
    )
    .select()
    .single();
}

export async function getReadingProgress(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: [], error: null };

  return supabase
    .from("reading_progress")
    .select("*")
    .eq("user_id", user.id)
    .order("book", { ascending: true })
    .order("chapter", { ascending: true });
}
