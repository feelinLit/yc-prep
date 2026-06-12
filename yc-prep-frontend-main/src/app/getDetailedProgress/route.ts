import { NextResponse } from "next/server";
import { loadUserState } from "@/server/db";
import { getDetailedProgress } from "@/server/gameLogic";

export const dynamic = "force-dynamic";

export async function GET() {
  const state = loadUserState();
  return NextResponse.json(getDetailedProgress(state));
}
