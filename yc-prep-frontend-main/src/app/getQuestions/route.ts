import { NextRequest, NextResponse } from "next/server";
import { loadUserState, readJson } from "@/server/db";
import { prepareQuestionForUser } from "@/server/questionsLogic";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const state = loadUserState();
  const { profile, progress } = state;

  const roundNum = params.has("round") ? parseInt(params.get("round")!) : progress.round;
  const milestoneNum = params.has("milestone")
    ? parseInt(params.get("milestone")!)
    : progress.milestone;

  if (isNaN(roundNum) || isNaN(milestoneNum)) {
    return NextResponse.json({ error: "round and milestone must be numbers" }, { status: 400 });
  }

  if (profile.plan === "free") {
    const ahead =
      roundNum > progress.round ||
      (roundNum === progress.round && milestoneNum > progress.milestone);
    if (ahead) {
      return NextResponse.json({ error: "Milestone not yet unlocked" }, { status: 403 });
    }
  }

  const all = readJson<any[]>("questions.json");
  const filtered = all.filter(
    (q) => q["Round number"] === roundNum && q.Milestone === milestoneNum
  );

  return NextResponse.json(filtered.map(prepareQuestionForUser));
}
