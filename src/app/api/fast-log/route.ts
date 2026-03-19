import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/db/supabase-server";
import { logFast, getFastLogs } from "@/lib/db/queries";

const VALID_FAST_TYPES = ["mouth", "noise", "comfort"];

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { fast_type, date, completed } = body;

  if (!fast_type || !date || completed == null) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!VALID_FAST_TYPES.includes(fast_type)) {
    return NextResponse.json(
      { error: "fast_type must be mouth, noise, or comfort" },
      { status: 400 }
    );
  }

  const { data, error } = await logFast(supabase, {
    fast_type,
    date,
    completed,
  });
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

  const { data, error } = await getFastLogs(supabase);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
