import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/db/supabase-server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  // Auth check
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== "markcijo@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Use service role if available, otherwise use regular client
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminClient = serviceKey
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey)
    : supabase;

  const [crossings, checkins, nightWatch, readingProgress, waitlist] =
    await Promise.all([
      adminClient.from("crossings").select("id", { count: "exact", head: true }),
      adminClient.from("checkins").select("id", { count: "exact", head: true }),
      adminClient.from("night_watch").select("id", { count: "exact", head: true }),
      adminClient.from("reading_progress").select("id", { count: "exact", head: true }),
      adminClient.from("waitlist").select("id", { count: "exact", head: true }),
    ]);

  // Active this week
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const { count: activeCount } = await adminClient
    .from("night_watch")
    .select("user_id", { count: "exact", head: true })
    .gte("date", weekAgo.toISOString().split("T")[0]);

  return NextResponse.json({
    totalCrossings: crossings.count ?? 0,
    totalCheckins: checkins.count ?? 0,
    nightWatchEntries: nightWatch.count ?? 0,
    chaptersRead: readingProgress.count ?? 0,
    waitlistCount: waitlist.count ?? 0,
    activeThisWeek: activeCount ?? 0,
  });
}
