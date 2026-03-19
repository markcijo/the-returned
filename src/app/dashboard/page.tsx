import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/db/supabase-server";
import { getCrossing } from "@/lib/db/queries";
import NavBar from "@/components/ui/NavBar";
import PageTransition from "@/components/ui/PageTransition";
import MemberHeader from "@/components/dashboard/MemberHeader";
import WeeklyCheckin from "@/components/dashboard/WeeklyCheckin";
import NightWatch from "@/components/dashboard/NightWatch";
import SevenWaysTracker from "@/components/dashboard/SevenWaysTracker";
import FastLogger from "@/components/dashboard/FastLogger";
import ReadingProgress from "@/components/dashboard/ReadingProgress";

export default async function DashboardPage() {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth?redirect=/dashboard");
  }

  const { data: crossing } = await getCrossing(supabase);

  return (
    <>
      <NavBar />
      <PageTransition>
        <div className="mx-auto max-w-4xl px-4 pt-24 pb-32 sm:px-6">
          <MemberHeader
            email={user.email ?? "Returned"}
            crossingDate={crossing?.crossed_at ?? null}
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <WeeklyCheckin />
            <NightWatch />
            <SevenWaysTracker />
            <FastLogger />
            <div className="lg:col-span-2">
              <ReadingProgress />
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
