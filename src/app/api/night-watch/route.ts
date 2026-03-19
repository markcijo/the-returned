import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/db/supabase-server";
import { createNightWatch, getNightWatch } from "@/lib/db/queries";

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { date, drifted, repair, light_gave } = body;

  if (!date || !drifted || !repair || !light_gave) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { data, error } = await createNightWatch(supabase, {
    date,
    drifted,
    repair,
    light_gave,
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

  const { data, error } = await getNightWatch(supabase);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
