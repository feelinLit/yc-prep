import { NextResponse } from "next/server";
import { readJson } from "@/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const rounds = readJson("rounds.json");
  return NextResponse.json({ rounds });
}
