import { NextResponse } from "next/server";
import { loadUserState } from "@/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const state = loadUserState();
  const { energyUpdatedAt, ...profile } = state.profile;
  return NextResponse.json({ ...profile, ...state.progress });
}
