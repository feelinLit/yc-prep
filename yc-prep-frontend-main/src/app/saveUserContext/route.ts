import { NextRequest, NextResponse } from "next/server";
import { loadUserState, saveUserState } from "@/server/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const state = loadUserState();
  if (body.role !== undefined) state.context.role = String(body.role);
  if (body.location !== undefined) state.context.location = String(body.location);
  saveUserState(state);
  return NextResponse.json({ ok: true });
}
