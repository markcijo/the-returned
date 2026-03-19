import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/db/supabase-server";
import { markChapterRead, getReadingProgress } from "@/lib/db/queries";

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { book, chapter } = body;

  if (!book || chapter == null) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!["one", "two"].includes(book)) {
    return NextResponse.json(
      { error: "book must be 'one' or 'two'" },
      { status: 400 }
    );
  }

  const { data, error } = await markChapterRead(supabase, { book, chapter });
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

  const { data, error } = await getReadingProgress(supabase);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
