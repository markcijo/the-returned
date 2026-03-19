import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/db/supabase-server";
import { logPillar, getPillarLogs } from "@/lib/db/queries";

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { date, pillar, rating } = body;

  if (!date || pillar == null || rating == null) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (pillar < 1 || pillar > 7 || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Pillar must be 1-7, rating must be 1-5" },
      { status: 400 }
    );
  }

  const { data, error } = await logPillar(supabase, { date, pillar, rating });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function GET() {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await getPillarLogs(supabase);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
