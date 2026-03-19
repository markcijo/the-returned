import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/db/supabase-server";
import { createCrossing } from "@/lib/db/queries";

export async function POST() {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await createCrossing(supabase);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
